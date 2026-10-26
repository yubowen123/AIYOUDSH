function J5o({
  frames: e,
  selectedIndex: t,
  displayPose: n,
  distanceRange: r,
  sourceImage: a,
  isDark: i,
  onSelectIndex: o,
  onUpsertPose: s
}) {
  const l = g.useRef(null),
    d = g.useRef(null),
    u = g.useRef(null),
    h = g.useRef(null),
    p = g.useRef(o),
    m = g.useRef(s);
  return p.current = o, m.current = s, g.useEffect(() => {
    const f = l.current;
    if (!f) return;
    const y = new OD();
    y.background = new so(i ? 1710618 : 15000807);
    const b = () => Math.max(260, f.clientWidth),
      v = new lu(34, b() / mge, .1, 80),
      _ = {
        az: 38,
        el: 28,
        dist: 6.2
      },
      w = () => {
        const he = _.az * Math.PI / 180,
          ue = _.el * Math.PI / 180;
        v.position.set(_.dist * Math.cos(ue) * Math.sin(he), _.dist * Math.sin(ue), _.dist * Math.cos(ue) * Math.cos(he)), v.lookAt(0, 0, 0), v.updateMatrixWorld();
      };
    w();
    const k = new FD({
      antialias: !0,
      alpha: !0
    });
    k.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)), k.setSize(b(), mge), k.outputColorSpace = Nl, f.appendChild(k.domElement), y.add(new ope(16777215, 1.6));
    const A = new pT(16777215, 1.1);
    A.position.set(4, 6, 5), y.add(A);
    const S = new sKn(4, 8, i ? 4144966 : 13948120, i ? 2565930 : 15000807);
    S.position.y = -1.05;
    const C = S.material;
    Array.isArray(C) ? C.forEach(he => {
      he.transparent = !0, he.opacity = .15;
    }) : (C.transparent = !0, C.opacity = .15), y.add(S);
    const I = new di(new xS(cvn, .008, 6, 96), new uu({
      color: i ? Y5o : 10592682,
      transparent: !0,
      opacity: .55
    }));
    I.rotation.x = Math.PI / 2, y.add(I);
    const E = new hc();
    y.add(E);
    const M = new qp(.035, 12, 12),
      T = new uu({
        color: i ? 13948120 : 10592682
      }),
      P = new uu({
        color: pge
      });
    Dxe.forEach(he => {
      const ue = new di(M, T);
      ue.position.set(...XK(he.value, 0, cvn)), ue.userData.azimuth = he.value, E.add(ue);
    });
    const R = new ng({
      color: i ? 4144966 : 13948120,
      side: _y,
      roughness: .7
    });
    h.current = R;
    const j = new di(new W5(1.35, 1.35), R);
    y.add(j);
    const B = new hc(),
      F = new hc(),
      N = new di(new dl(.16, .12, .2), new ng({
        color: pge,
        metalness: .3,
        roughness: .35
      })),
      G = new di(new lm(.045, .055, .1, 12), new ng({
        color: 15000807,
        metalness: .35,
        roughness: .35
      }));
    G.rotation.x = Math.PI / 2, G.position.z = .14;
    const z = new di(new FP(.035, .06, 3), new ng({
      color: 10592682
    }));
    z.position.set(0, -.1, 0), F.add(N, G, z), F.rotation.y = Math.PI, B.add(F), y.add(B);
    const V = new di(new qp(.3, 12, 12), new uu({
      visible: !1,
      depthWrite: !1
    }));
    y.add(V);
    const O = new uu({
      color: pge,
      transparent: !0,
      opacity: .9
    });
    let L = null;
    const D = new hc();
    y.add(D);
    const U = new qp(.05, 12, 12),
      H = new ng({
        color: lvn,
        emissive: lvn,
        emissiveIntensity: .35
      }),
      Y = new ng({
        color: pge,
        emissive: pge,
        emissiveIntensity: .55
      }),
      K = new tJ(),
      W = new Qi(),
      Q = {
        azimuth: 0,
        elevation: 0,
        radius: 1.4
      },
      q = {
        frames: [],
        selected: 0,
        pose: {
          azimuth: 0,
          elevation: 0,
          distance: 1
        },
        distanceRange: {
          min: .1,
          max: 2
        }
      },
      ne = {
        mode: "none",
        x: 0,
        y: 0,
        az: 0,
        el: 0
      },
      de = he => {
        const ue = new dr(...he).project(v),
          ge = k.domElement.getBoundingClientRect();
        return [(ue.x * .5 + .5) * ge.width, (-ue.y * .5 + .5) * ge.height];
      },
      le = he => {
        const ue = (he % 360 + 360) % 360;
        E.children.forEach(ge => {
          const _e = ge,
            ke = Math.abs((_e.userData.azimuth - ue + 180) % 360 - 180) < 12;
          _e.material = ke ? P : T, _e.scale.setScalar(ke ? 1.35 : 1);
        });
      },
      J = (he, ue, ge) => {
        const [_e, ke, ve] = XK(he, ue, ge);
        B.position.set(_e, ke, ve), B.quaternion.setFromEuler(new xp(-ue * Math.PI / 180, he * Math.PI / 180, 0, "YXZ")), V.position.copy(B.position), le(he);
      },
      pe = he => {
        const ue = X5o(he, q.distanceRange);
        L && (y.remove(L), L.geometry.dispose(), L = null);
        const ge = ue.reduce((_e, ke, ve) => ve === 0 ? 0 : _e + ke.distanceTo(ue[ve - 1]), 0);
        if (ue.length >= 2 && ge > .04) {
          const _e = new rDt(ue, !1, "centripetal");
          L = new di(new qYe(_e, Math.max(24, ue.length * 2), .012, 6, !1), O), y.add(L);
        }
        for (; D.children.length > he.length;) {
          const _e = D.children.pop();
          _e == null || _e.removeFromParent();
        }
        he.forEach((_e, ke) => {
          let ve = D.children[ke];
          ve || (ve = new di(U, H), D.add(ve));
          const Te = O3t(_e, q.distanceRange);
          ve.position.copy(Te), ve.userData.index = ke, ve.material = ke === q.selected ? Y : H, ve.scale.setScalar(ke === q.selected ? 1.35 : 1);
        });
      },
      ce = (he, ue, ge, _e) => {
        q.frames = he, q.selected = ue, q.pose = ge, q.distanceRange = _e, pe(he);
      };
    d.current = {
      sync: ce
    };
    let we = 0;
    const X = () => {
      we = requestAnimationFrame(X);
      const he = tie(q.pose.distance, q.distanceRange),
        ue = ne.mode === "camera" ? 1 : .22,
        ge = Math.abs(q.pose.azimuth) >= 360 ? q.pose.azimuth - Q.azimuth : jxe(Q.azimuth, q.pose.azimuth);
      Q.azimuth += ge * ue, Q.elevation += (q.pose.elevation - Q.elevation) * ue, Q.radius += (he - Q.radius) * ue, J(Q.azimuth, Q.elevation, Q.radius), k.render(y, v);
    };
    X();
    const Z = () => {
        const he = b();
        v.aspect = he / mge, v.updateProjectionMatrix(), k.setSize(he, mge);
      },
      re = new ResizeObserver(Z);
    re.observe(f);
    const fe = (he, ue) => {
        const ge = k.domElement.getBoundingClientRect();
        W.x = (he - ge.left) / ge.width * 2 - 1, W.y = -((ue - ge.top) / ge.height) * 2 + 1;
      },
      ye = () => {
        var ge;
        if (K.setFromCamera(W, v), K.intersectObject(V, !1).length > 0) return q.selected;
        const ue = (ge = K.intersectObjects(D.children, !1)[0]) == null ? void 0 : ge.object.userData.index;
        return typeof ue == "number" ? ue : null;
      },
      ie = he => {
        he.stopPropagation(), fe(he.clientX, he.clientY);
        const ue = ye();
        ue != null ? (p.current(ue), q.selected = ue, ne.mode = "camera", ne.x = he.clientX, ne.y = he.clientY) : (ne.mode = "view", ne.x = he.clientX, ne.y = he.clientY, ne.az = _.az, ne.el = _.el), k.domElement.setPointerCapture(he.pointerId), k.domElement.style.cursor = ne.mode === "camera" ? "grabbing" : "move";
      },
      ae = he => {
        if (ne.mode === "none") return;
        const ue = he.clientX - ne.x,
          ge = he.clientY - ne.y;
        if (ne.mode === "view") {
          _.az = ne.az - ue * .35, _.el = Math.max(-80, Math.min(80, ne.el + ge * .28)), w();
          return;
        }
        ne.x = he.clientX, ne.y = he.clientY, v.updateMatrixWorld();
        const _e = tie(q.pose.distance, q.distanceRange),
          ke = fGr(_e, de),
          ve = gGr({
            azimuth: q.pose.azimuth,
            elevation: q.pose.elevation
          }, ke, ue, ge),
          Te = yGr({
            azimuth: q.pose.azimuth,
            elevation: q.pose.elevation,
            radius: _e
          }, ve, {
            min: -90,
            max: 90
          });
        m.current({
          azimuth: Number(Te.azimuth.toFixed(2)),
          elevation: Number(Te.elevation.toFixed(2))
        });
      },
      be = he => {
        ne.mode = "none", k.domElement.style.cursor = "grab";
        try {
          k.domElement.releasePointerCapture(he.pointerId);
        } catch {}
      },
      Ee = he => {
        if (he.preventDefault(), he.stopPropagation(), fe(he.clientX, he.clientY), ye() != null) {
          const ge = he.deltaY > 0 ? .08 : -.08,
            _e = Math.max(q.distanceRange.min, Math.min(Math.max(q.distanceRange.max, 8), q.pose.distance + ge));
          m.current({
            distance: Number(_e.toFixed(2))
          });
          return;
        }
        _.dist = Math.max(3.2, Math.min(16, _.dist + (he.deltaY > 0 ? .28 : -.28))), w();
      },
      xe = k.domElement;
    return xe.style.touchAction = "none", xe.style.cursor = "grab", xe.style.width = "100%", xe.style.height = `${mge}px`, xe.addEventListener("pointerdown", ie), xe.addEventListener("pointermove", ae), xe.addEventListener("pointerup", be), xe.addEventListener("pointercancel", be), xe.addEventListener("wheel", Ee, {
      passive: !1
    }), () => {
      re.disconnect(), cancelAnimationFrame(we), xe.removeEventListener("pointerdown", ie), xe.removeEventListener("pointermove", ae), xe.removeEventListener("pointerup", be), xe.removeEventListener("pointercancel", be), xe.removeEventListener("wheel", Ee), u.current && (u.current.dispose(), u.current = null), h.current = null, L && L.geometry.dispose(), O.dispose(), U.dispose(), H.dispose(), Y.dispose(), j.geometry.dispose(), R.dispose(), N.geometry.dispose(), N.material.dispose(), G.geometry.dispose(), G.material.dispose(), z.geometry.dispose(), z.material.dispose(), V.geometry.dispose(), V.material.dispose(), I.geometry.dispose(), I.material.dispose(), M.dispose(), T.dispose(), P.dispose(), Array.isArray(C) ? C.forEach(he => he.dispose()) : C.dispose(), S.geometry.dispose(), k.dispose(), f.contains(xe) && f.removeChild(xe), d.current = null;
    };
  }, [i]), g.useEffect(() => {
    var f;
    (f = d.current) == null || f.sync(e, t, n, r);
  }, [e, t, n, r]), g.useEffect(() => {
    const f = h.current;
    if (!f) return;
    const y = String(a || "").trim();
    if (!y) {
      u.current && (u.current.dispose(), u.current = null), f.map = null, f.color.set(i ? 4144966 : 13948120), f.needsUpdate = !0;
      return;
    }
    new sD().load(y, v => {
      u.current && u.current.dispose(), u.current = v, v.colorSpace = Nl, f.map = v, f.color.set(16777215), f.needsUpdate = !0;
    }, void 0, () => {
      f.map = null, f.color.set(i ? 4144966 : 13948120), f.needsUpdate = !0;
    });
  }, [a, i]), c.jsx("div", {
    ref: l,
    className: `relative w-full overflow-hidden rounded-xl ${i ? "bg-[#1a1a1a]" : "bg-zinc-200"}`
  });
}

function dvn(e, t, n, r, a) {
  const i = zj(r);
  return a(e, {
    settings: {
      ...t,
      [JK]: i
    }
  }), cl(n, {
    h3MaxFalCameraTrajectory: i
  }), i;
}

function bdt(e) {
  const t = Math.max(0, e),
    n = Math.floor(t / 60),
    r = t - n * 60;
  return `${n}:${r.toFixed(1).padStart(4, "0")}`;
}

const Z5o = {
    0: 2,
    5: 1,
    10: .35
  },
  eIo = {
    Front: "正面",
    "Front R": "右前",
    Right: "右侧",
    "Back R": "右后",
    Back: "背面",
    "Back L": "左后",
    Left: "左侧",
    "Front L": "左前"
  },
  tIo = {
    [-30]: "低角",
    0: "平视",
    30: "抬高",
    60: "俯视",
    90: "顶视"
  };

function nIo(e) {
  const t = Tft(e);
  return t ? t.replace(" turns", " 圈").replace(" turn", " 圈") : null;
}

function rIo({
  value: e,
  isDark: t,
  onChange: n
}) {
  on();
  const r = (e % 360 + 360) % 360,
    [a, i] = n0e(r, 30),
    [o, s] = n0e(0, 30),
    l = r > 180 ? 1 : 0,
    d = t ? "#f4f4f5" : "#52525b",
    u = t ? "rgba(255,255,255,0.18)" : "rgba(24,24,27,0.16)";
  return c.jsxs("div", {
    className: "flex flex-col items-center gap-1",
    children: [c.jsx("button", {
      type: "button",
      className: "relative h-[76px] w-[76px] shrink-0",
      onPointerDown: h => {
        h.stopPropagation();
        const p = h.currentTarget;
        let m = e;
        const f = b => {
            const v = cGr(b.clientX, b.clientY, p.getBoundingClientRect());
            m = Number((m + jxe((m % 360 + 360) % 360, v)).toFixed(2)), n(m);
          },
          y = () => {
            window.removeEventListener("pointermove", f), window.removeEventListener("pointerup", y);
          };
        window.addEventListener("pointermove", f), window.addEventListener("pointerup", y), f(h.nativeEvent);
      },
      children: c.jsxs("svg", {
        viewBox: "0 0 76 76",
        className: "h-full w-full",
        children: [c.jsx("circle", {
          cx: "38",
          cy: "38",
          r: "30",
          fill: "none",
          stroke: u,
          strokeWidth: "2.5"
        }), Dxe.map(h => {
          const [p, m] = n0e(h.value, 25),
            [f, y] = n0e(h.value, 29);
          return c.jsx("line", {
            x1: p,
            y1: m,
            x2: f,
            y2: y,
            stroke: h.value === 0 ? d : u,
            strokeWidth: h.value === 0 ? 2.2 : 1.2
          }, h.value);
        }), r > .5 && c.jsx("path", {
          d: `M ${o} ${s} A 30 30 0 ${l} 1 ${a} ${i}`,
          fill: "none",
          stroke: d,
          strokeWidth: "2.5",
          strokeLinecap: "round"
        }), c.jsx("circle", {
          cx: "38",
          cy: "38",
          r: "3",
          fill: d
        }), c.jsx("circle", {
          cx: a,
          cy: i,
          r: "4",
          fill: t ? "#f4f4f5" : "#3f3f46"
        })]
      })
    }), c.jsx("span", {
      className: "text-[9px] text-zinc-500",
      children: eIo[E9n(e, Dxe, !0).short] || x("正面")
    })]
  });
}

function aIo({
  nodeId: e,
  isDark: t,
  settings: n,
  currentModel: r,
  sourceImage: a,
  activeDropdown: i,
  setActiveDropdown: o,
  updateNode: s
}) {
  var L;
  on();
  const l = U9n(String(n.duration || "5s")),
    d = g.useMemo(() => K8t(n), [n[JK]]),
    u = NGr(d, l),
    h = (i == null ? void 0 : i.nodeId) === e && (i == null ? void 0 : i.type) === "h3-max-fal-camera",
    p = g.useRef(null),
    m = g.useRef(null),
    f = g.useRef(2),
    [y, b] = g.useState(null),
    [v, _] = g.useState(0),
    [w, k] = g.useState(0),
    [A, S] = g.useState(!1),
    [C, I] = g.useState(!1),
    E = g.useRef(null),
    M = g.useRef(0);
  M.current = w;
  const T = q8t(d, f.current);
  f.current = T.max;
  const P = che(l),
    R = g.useMemo(() => TGr(d, w), [d, w]),
    j = Mft(d, w, CS.time),
    B = hGr(CS.azimuth),
    F = nIo(R.azimuth),
    N = j === 0 ? "片头保持到第 1 帧" : j === d.length - 1 ? "末尾保持到结束" : j >= 0 ? `关键帧 ${j + 1}：拖相机改这一帧` : "拖相机可在此刻插入关键帧";
  g.useEffect(() => {
    _(D => Math.max(0, Math.min(d.length - 1, D)));
  }, [d.length]), g.useEffect(() => {
    if (!h) {
      I(!1), S(!1), b(null);
      return;
    }
    const D = Rft(n[JK], l),
      U = n[JK];
    Array.isArray(U) && U.length === D.length && D.every((Y, K) => {
      const W = U[K];
      return W && Math.abs(W.time - Y.time) < 1e-6 && W.azimuth === Y.azimuth && W.elevation === Y.elevation && W.distance === Y.distance;
    }) || dvn(e, n, r, D, s), b(Y => Y ?? D.map(K => ({
      ...K
    })));
  }, [h, l]), g.useEffect(() => {
    if (!A) return;
    const D = performance.now(),
      U = M.current,
      H = Y => {
        const K = Math.min(1, U + (Y - D) / 1e3 / l);
        if (M.current = K, k(K), K >= 1) {
          S(!1);
          return;
        }
        E.current = requestAnimationFrame(H);
      };
    return E.current = requestAnimationFrame(H), () => {
      E.current != null && cancelAnimationFrame(E.current);
    };
  }, [A, l]);
  const G = (D, U = v) => {
      const H = dvn(e, n, r, D, s);
      return _(Math.max(0, Math.min(H.length - 1, U))), H;
    },
    z = D => {
      S(!1);
      const {
        frames: U,
        index: H
      } = RGr(d, w, D, l);
      G(U, H);
    },
    V = D => {
      const U = MGr(D, l, d);
      G(U, 0), k(0), S(!1);
    },
    O = ((L = Xqt.find(D => D.id === u)) == null ? void 0 : L.label) || `${d.length}K`;
  return c.jsxs("div", {
    className: "relative",
    "data-gen-dropdown-type": "h3-max-fal-camera",
    children: [c.jsx("button", {
      ref: p,
      type: "button",
      onClick: D => {
        D.stopPropagation(), o(h ? null : {
          nodeId: e,
          type: "h3-max-fal-camera"
        });
      },
      onMouseDown: D => D.stopPropagation(),
      className: `node-dropdown-button flex items-center gap-1 px-2 py-1 rounded text-[10px] border ${t ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
      title: x("Fal 相机运动：拖相机打关键帧，最后 1 秒保持末帧"),
      children: x("机位: {0}", O)
    }), c.jsxs(Tv, {
      open: h,
      anchorRef: p,
      isDark: t,
      menuWidth: 560,
      maxHeight: 680,
      placement: "auto",
      align: "center",
      className: `p-3 ${t ? "!bg-[#2a2a2a]" : "!bg-zinc-200"}`,
      onWheel: D => D.stopPropagation(),
      children: [c.jsxs("div", {
        className: "mb-2 flex items-center gap-2",
        children: [c.jsx("div", {
          className: `text-[12px] font-medium ${t ? "text-white" : "text-zinc-800"}`,
          children: x("相机运动")
        }), c.jsx("button", {
          type: "button",
          className: `ml-auto rounded-full border px-2 py-0.5 text-[10px] ${t ? "border-white/20 text-zinc-200 hover:bg-white/5" : "border-zinc-400 text-zinc-700 hover:bg-zinc-300"}`,
          onClick: () => {
            const D = Rft(lqe, l);
            G(D, 0), b(D.map(U => ({
              ...U
            }))), k(0), S(!1);
          },
          children: x("重置")
        })]
      }), c.jsx(Ade, {
        isDark: t,
        tone: "gen",
        size: "sm",
        wheel: !0,
        ariaLabel: x("机位预设"),
        className: "mb-2",
        options: Xqt.map(D => ({
          value: D.id,
          label: D.label.replace("一圈", "圈").replace("位右旋", "旋")
        })),
        value: u || "",
        onChange: V
      }), c.jsx(J5o, {
        frames: d,
        selectedIndex: v,
        displayPose: R,
        distanceRange: T,
        sourceImage: a || void 0,
        isDark: t,
        onSelectIndex: D => {
          var U;
          _(D), k(((U = d[D]) == null ? void 0 : U.time) ?? 0), S(!1);
        },
        onUpsertPose: z
      }), c.jsx("p", {
        className: "mt-1.5 text-[9px] text-zinc-500",
        children: x("拖相机改机位 · 滚轮调距离 · 拖背景环视 / 缩放")
      }), c.jsxs("div", {
        className: "mt-2 flex items-center gap-2",
        children: [c.jsx("span", {
          className: `min-w-0 flex-1 truncate text-[10px] ${t ? "text-zinc-400" : "text-zinc-500"}`,
          children: x(N)
        }), c.jsxs("div", {
          className: "relative shrink-0",
          children: [c.jsxs("button", {
            ref: m,
            type: "button",
            "data-gen-dropdown-type": "h3-max-fal-camera-frames",
            className: `node-dropdown-button flex items-center gap-1 px-2 py-1 rounded text-[10px] border ${t ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
            onClick: D => {
              D.stopPropagation(), I(U => !U);
            },
            onMouseDown: D => D.stopPropagation(),
            children: [d.length, x(" 帧")]
          }), c.jsx(Tv, {
            open: C,
            anchorRef: m,
            isDark: t,
            minWidth: 88,
            maxHeight: 256,
            placement: "auto",
            className: t ? "" : "!bg-zinc-200",
            children: Array.from({
              length: L9n - a0e + 1
            }, (D, U) => a0e + U).map(D => c.jsx("button", {
              type: "button",
              onClick: () => {
                const U = PGr(d, D, l);
                G(U, 0), k(0), S(!1), I(!1);
              },
              className: `w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded text-left transition-colors ${t ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-zinc-300 text-zinc-700"} ${D === d.length ? t ? "bg-zinc-800" : "bg-zinc-300" : ""}`,
              children: c.jsxs("span", {
                className: "text-xs font-medium whitespace-nowrap leading-none",
                children: [D, x(" 帧")]
              })
            }, D))
          })]
        }), c.jsx("button", {
          type: "button",
          disabled: d.length <= a0e || htt(v, d.length),
          className: `rounded px-1.5 py-0.5 text-[10px] ${d.length <= a0e || htt(v, d.length) ? "opacity-30" : t ? "text-zinc-300 hover:bg-white/10" : "text-zinc-600 hover:bg-zinc-100"}`,
          onClick: () => {
            const D = d.filter((U, H) => H !== v);
            G(D, Math.max(0, v - 1));
          },
          children: x("删除")
        })]
      }), c.jsxs("div", {
        className: "mt-1.5",
        children: [c.jsxs("div", {
          className: "relative h-10 cursor-pointer",
          onPointerDown: D => {
            const U = D.currentTarget.getBoundingClientRect(),
              H = Math.max(0, Math.min(1, (D.clientX - U.left) / U.width));
            k(H), S(!1);
            const Y = Mft(d, H, CS.time);
            Y >= 0 && _(Y);
          },
          children: [c.jsx("div", {
            className: `absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full ${t ? "bg-white/10" : "bg-zinc-200"}`
          }), c.jsx("div", {
            className: `absolute top-1/2 h-1 -translate-y-1/2 rounded-full ${t ? "bg-white/25" : "bg-zinc-400/70"}`,
            style: {
              left: `${d[0].time * 100}%`,
              width: `${Math.max(0, (d[d.length - 1].time - d[0].time) * 100)}%`
            }
          }), d.map((D, U) => {
            const H = htt(U, d.length);
            return c.jsx("button", {
              type: "button",
              className: `absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rotate-45 ${U === v ? t ? "bg-white" : "bg-zinc-700" : t ? "bg-zinc-500" : "bg-zinc-400"}`,
              style: {
                left: `${D.time * 100}%`
              },
              onPointerDown: Y => {
                if (Y.stopPropagation(), _(U), k(D.time), S(!1), H) return;
                const K = Y.currentTarget.parentElement;
                if (!K) return;
                const W = q => {
                    const ne = K.getBoundingClientRect(),
                      de = (q.clientX - ne.left) / ne.width,
                      le = F8t(CS.time),
                      J = d[U - 1].time + le,
                      pe = d[U + 1].time - le,
                      ce = Number(Math.max(J, Math.min(pe, de)).toFixed(4)),
                      we = d.map((X, Z) => Z === U ? {
                        ...X,
                        time: ce
                      } : X);
                    G(we, U), k(ce);
                  },
                  Q = () => {
                    window.removeEventListener("pointermove", W), window.removeEventListener("pointerup", Q);
                  };
                window.addEventListener("pointermove", W), window.addEventListener("pointerup", Q);
              }
            }, `${D.time}-${U}`);
          }), c.jsx("span", {
            className: `pointer-events-none absolute top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 ${t ? "bg-white" : "bg-zinc-700"}`,
            style: {
              left: `${w * 100}%`
            }
          })]
        }), c.jsxs("div", {
          className: `flex justify-between text-[9px] ${t ? "text-zinc-500" : "text-zinc-400"}`,
          children: [c.jsx("span", {
            children: "0:00"
          }), c.jsx("span", {
            children: bdt(l)
          })]
        })]
      }), c.jsxs("div", {
        className: "mt-1.5 flex items-center gap-2",
        children: [c.jsx("button", {
          type: "button",
          className: `rounded-full px-2.5 py-1 text-[11px] ${t ? "bg-white/10 text-white" : "bg-zinc-100 text-zinc-800"}`,
          onClick: () => {
            w >= 1 && k(0), S(D => !D);
          },
          children: x(A ? "暂停" : "播放")
        }), c.jsxs("span", {
          className: `text-[10px] tabular-nums ${t ? "text-zinc-300" : "text-zinc-600"}`,
          children: [bdt(w * l), " / ", bdt(l)]
        }), c.jsxs("span", {
          className: `ml-auto text-[10px] ${t ? "text-zinc-500" : "text-zinc-400"}`,
          children: [x("可用至 "), P.toFixed(2)]
        })]
      }), c.jsxs("div", {
        className: "mt-2 grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2",
        children: [c.jsx(rIo, {
          value: R.azimuth,
          isDark: t,
          onChange: D => z({
            azimuth: D
          })
        }), c.jsxs("div", {
          className: "space-y-2",
          children: [c.jsxs("label", {
            className: `flex items-center gap-2 text-[10px] ${t ? "text-zinc-300" : "text-zinc-600"}`,
            children: [c.jsx("span", {
              className: "w-10 shrink-0",
              children: x("方位")
            }), c.jsx("input", {
              type: "range",
              min: B.min,
              max: B.max,
              step: B.step,
              value: Math.max(B.min, Math.min(B.max, R.azimuth)),
              className: `min-w-0 flex-1 ${t ? "accent-zinc-200" : "accent-zinc-500"}`,
              onChange: D => z({
                azimuth: Number(D.target.value)
              })
            }), c.jsxs("span", {
              className: "w-12 text-right tabular-nums",
              children: [Math.round(R.azimuth), "°"]
            })]
          }), F && c.jsx("div", {
            className: `-mt-1 text-right text-[9px] ${t ? "text-zinc-400" : "text-zinc-500"}`,
            children: F
          }), c.jsx("div", {
            className: "flex justify-end gap-1 text-[9px] text-zinc-500",
            children: oGr.map(D => c.jsx("button", {
              type: "button",
              className: `rounded px-1 ${t ? "hover:bg-white/10 hover:text-white" : "hover:bg-zinc-300 hover:text-zinc-800"}`,
              onClick: () => z({
                elevation: D.value
              }),
              children: tIo[D.value] || D.short
            }, D.value))
          }), c.jsxs("label", {
            className: `flex items-center gap-2 text-[10px] ${t ? "text-zinc-300" : "text-zinc-600"}`,
            children: [c.jsx("span", {
              className: "w-10 shrink-0",
              children: x("仰角")
            }), c.jsx("input", {
              type: "range",
              min: -90,
              max: 90,
              step: 1,
              value: R.elevation,
              className: `min-w-0 flex-1 ${t ? "accent-zinc-200" : "accent-zinc-500"}`,
              onChange: D => z({
                elevation: Number(D.target.value)
              })
            }), c.jsxs("span", {
              className: "w-12 text-right tabular-nums",
              children: [Math.round(R.elevation), "°"]
            })]
          }), c.jsxs("label", {
            className: `flex items-center gap-2 text-[10px] ${t ? "text-zinc-300" : "text-zinc-600"}`,
            children: [c.jsx("span", {
              className: "w-10 shrink-0",
              children: x("缩放")
            }), c.jsx("input", {
              type: "range",
              min: T.min,
              max: T.max,
              step: T.step,
              value: Math.max(T.min, Math.min(T.max, R.distance)),
              className: `min-w-0 flex-1 ${t ? "accent-zinc-200" : "accent-zinc-500"}`,
              onChange: D => z({
                distance: Number(D.target.value)
              })
            }), c.jsx("span", {
              className: "w-12 text-right tabular-nums",
              children: R.distance.toFixed(2)
            })]
          }), c.jsx("div", {
            className: "flex justify-end gap-1",
            children: sGr.map(D => c.jsx("button", {
              type: "button",
              className: `rounded px-1.5 py-0.5 text-[9px] ${t ? "text-zinc-400 hover:bg-white/10 hover:text-white" : "text-zinc-500 hover:bg-zinc-300 hover:text-zinc-800"}`,
              onClick: () => z({
                distance: Z5o[String(D.value)] ?? 1
              }),
              children: D.short === "Wide" ? x("广") : D.short === "Medium" ? x("中") : x("近")
            }, D.value))
          })]
        })]
      })]
    })]
  });
}

function iIo(e) {
  return {
    isMidjourney: !U5(e) && lIe(e),
    isWan26: Y1(e),
    isKlingOmni: zv(e),
    isKlingV3Omni: E3(e),
    isKlingV25Fal: e === CU,
    isKlingV26Fal: e === f3,
    isKlingV3Fal: e === o_
  };
}

function oIo(e) {
  return ah(e);
}

function sIo(e) {
  return rl(e);
}

function lIo({
  node: e,
  currentModel: t,
  currentModelConfig: n,
  isModelHiddenInList: r,
  globalOssUploadEnabled: a,
  ossConfigured: i,
  mediaHostingProvider: o
}) {
  var P, R;
  const s = iIo(t),
    l = e.type === "gen-image" && (Pf(t) || t === "codex-image"),
    d = oIo(t),
    u = sIo(t),
    h = String(((P = e.settings) == null ? void 0 : P.platformGroup) || "").trim(),
    p = String(((R = e.settings) == null ? void 0 : R.resolution) ?? "Auto"),
    m = Qa.getGlobalBaseUrl(),
    f = (r == null ? void 0 : r(t)) ?? !1,
    y = t !== "codex-image" && !!n && od(n, m) && !f,
    b = e.type === "gen-video" && GS(t),
    v = e.type === "gen-video" && (s.isKlingOmni || eBe(t) || tBe(t) || Jqe(t)),
    _ = b || v,
    w = e.type === "gen-image" && (fce(t) || kh(t) || Hh(t) || Uu(t) || su(t)),
    k = _ || w,
    A = e.type === "gen-image" && (k || l),
    S = e.type === "gen-video",
    C = A || S,
    I = g.useMemo(() => {
      const j = e.settings || {},
        B = [];
      if (t === "codex-image" ? B.push("Codex") : y && B.push(PU(h || "default")), e.type === "gen-image" && (fce(t) || Hh(t) || Uu(t) || su(t))) {
        const F = String(j.gptImageOutputFormat || "png").toLowerCase(),
          N = su(t) ? $ft : Uu(t) ? Uft : Hh(t) ? zft : _v(t) ? xgt : Rm(t) ? wgt : Og(t) ? vgt : Lg(t) ? bgt : Dg(t) ? ygt : _xe;
        B.push(N[F] || "PNG");
      }
      if (j.ossImageBase64 && B.push("B64"), e.type === "gen-image") {
        const F = Number(j.batchSize || 1);
        Number.isFinite(F) && F > 0 && B.push(`${Math.max(1, Math.floor(F))}×`);
      }
      return QRi(B);
    }, [e.type, e.settings, t, y, h]),
    E = g.useMemo(() => e.type !== "gen-image" || !A ? 0 : Zkt({
      paramLabels: ["···"]
    }), [e.type, A]),
    M = g.useMemo(() => e.type !== "gen-video" || !S ? 0 : Zkt({
      paramLabels: ["···"]
    }), [e.type, S]);
  return {
    ...s,
    ratioOptions: d,
    resolutionOptions: u,
    nodePlatformGroup: h,
    uiResolution: p,
    showThirdPartyPlatformUi: y,
    isGenNodeToolbarCompact: C,
    genNodeToolbarReservedPx: E || M,
    paramsFoldSummary: I
  };
}

function uvn({
  node: e,
  isDark: t,
  isGenNodeToolbarCompact: n,
  genUseAliyunOss: r,
  globalOssUploadEnabled: a,
  ossConfigured: i,
  mediaHostingProvider: o,
  getLatestSettings: s,
  onGenUseAliyunOssChange: l,
  updateNode: d
}) {
  if (on(), e.type !== "gen-image" && e.type !== "gen-video" || a || !i) return null;
  const u = $g(o),
    h = Fhr(u, n);
  return c.jsxs("label", {
    className: `sketch-chat-web-chip${t ? " sketch-chat-web-chip--dark" : ""}`,
    onMouseDown: p => p.stopPropagation(),
    title: Jk(o),
    children: [c.jsx("input", {
      type: "checkbox",
      checked: r,
      onChange: p => {
        const m = p.target.checked;
        l(m);
        const f = {
          ...(s() || {})
        };
        d(e.id, {
          settings: {
            ...f,
            genUseAliyunOss: m
          }
        });
      },
      className: "h-3 w-3 cursor-pointer"
    }), c.jsx("span", {
      className: "whitespace-nowrap",
      title: u,
      children: x(h)
    })]
  });
}

function Dwr(e) {
  let t = "";
  return e.childNodes.forEach(n => {
    if (n.nodeType === Node.TEXT_NODE) t += n.textContent || "";else if (n.nodeType === Node.ELEMENT_NODE) {
      const r = n;
      if (r.hasAttribute("data-tag")) {
        const a = r.getAttribute("data-tag-content") || "";
        t += `【${a}】`;
      } else r.tagName === "BR" ? t += `
` : r.tagName === "DIV" ? t += `
` + Dwr(r) : t += r.textContent || "";
    }
  }), t;
}

function vdt(e, t) {
  const n = document.querySelector(`div[contenteditable][data-node-id="${e}"][data-node-type="gen-node"]`);
  return n ? Dwr(n) : t || "";
}

function hvn(e, t) {
  const n = document.querySelector(`div[contenteditable][data-node-id="${e}"][data-node-type="gen-node"]`);
  if (!n) return t.length;
  const r = Kk(n);
  return Math.min(Math.max(0, r), t.length);
}

function cIo(e, t, n) {
  const r = `【${t}】`;
  if (e.includes(r)) return e;
  const a = e.slice(0, n),
    i = e.slice(n),
    o = a.length > 0 && !a.endsWith(" "),
    s = i.length > 0 && !i.startsWith(" ");
  return a + (o ? " " : "") + r + (s ? " " : "") + i;
}

function dIo(e, t) {
  const n = `【${t}】`;
  return e.includes(n) ? e.replace(n, "").replace(/\s+/g, " ").trim() : e;
}

function uIo(e, t, n, r) {
  const a = document.querySelector(`div[contenteditable][data-node-id="${e}"][data-node-type="gen-node"]`);
  if (!a) return;
  const i = r - n;
  a.dataset.cursorPos = String(Math.max(0, t + i));
}

const hIo = {
    pause: d3,
    "move-right": pTn,
    "move-left": hTn,
    "rotate-cw": ox,
    "move-horizontal": uTn,
    user: jY,
    circle: YHe,
    zap: fZ,
    target: _Et,
    "arrow-right": H7,
    "arrow-left": uw,
    "arrow-up": Gc,
    "arrow-down": $ue,
    eye: ul,
    "trending-up": TTn,
    "trending-down": ETn,
    maximize: Gue,
    navigation: fTn,
    "rotate-ccw": vd,
    "refresh-ccw": vEt,
    "fast-forward": QEn,
    rewind: wTn,
    "corner-up-right": HEn,
    "corner-right-down": VEn,
    "refresh-cw": bd,
    box: Hm,
    "maximize-2": Wm,
    "zoom-in": Z$,
    clock: AP,
    "navigation-2": mTn,
    plane: gTn,
    smartphone: CTn,
    "git-branch": hEt,
    cpu: XHe,
    video: Oo
  },
  HPe = {
    cameraId: null,
    lensId: null,
    focalLengthId: null,
    apertureId: null
  },
  wdt = {
    movementId: null,
    directionId: null,
    angleId: null,
    speedId: null,
    styleId: null,
    deviceId: null
  },
  pvn = (e, t) => {
    const n = e[t];
    return n ? typeof n == "string" ? [n] : Array.isArray(n) ? n : [] : [];
  },
  pIo = ({
    node: e,
    isDark: t,
    updateNode: n,
    onGenInlineDirectorUiChange: r,
    onInlineMovementPanelChange: a,
    showMovementControls: i = !1
  }) => {
    var pe, ce, we;
    on();
    const [o, s] = g.useState(null),
      [l, d] = g.useState(HPe),
      u = g.useRef(null),
      h = g.useRef(null),
      p = g.useRef(null),
      m = g.useRef(null),
      f = g.useRef(null),
      y = g.useRef(null),
      b = g.useRef(null),
      v = ((pe = e.settings) == null ? void 0 : pe.cinemaConfig) || HPe,
      _ = ((ce = e.settings) == null ? void 0 : ce.movementConfig) || wdt;
    g.useEffect(() => {
      o === "camera" && d(v);
    }, [o, e.id, (we = e.settings) == null ? void 0 : we.cinemaConfig]), g.useEffect(() => {
      const X = Z => {
        if (!o) return;
        const re = u.current;
        re && !re.contains(Z.target) && s(null);
      };
      return document.addEventListener("pointerdown", X, !0), () => document.removeEventListener("pointerdown", X, !0);
    }, [o]);
    const w = g.useRef(r);
    w.current = r, g.useEffect(() => {
      var Z;
      const X = o !== null;
      return (Z = w.current) == null || Z.call(w, e.id, X), () => {
        var re;
        (re = w.current) == null || re.call(w, e.id, !1);
      };
    }, [o, e.id]), g.useEffect(() => {
      !i && o === "movement" && s(null);
    }, [i, o]);
    const k = g.useRef(a);
    k.current = a, g.useEffect(() => {
      var X, Z;
      if (!i) {
        (X = k.current) == null || X.call(k, !1);
        return;
      }
      return (Z = k.current) == null || Z.call(k, o === "movement"), () => {
        var re;
        return (re = k.current) == null ? void 0 : re.call(k, !1);
      };
    }, [o, i]), g.useEffect(() => {
      if (o !== "movement") return;
      const X = window.setTimeout(() => {
        const Z = document.querySelector(`div[contenteditable][data-node-id="${e.id}"][data-node-type="gen-node"]`);
        if (!Z) return;
        Z.focus();
        const re = vdt(e.id, e.prompt || ""),
          fe = parseInt(Z.dataset.cursorPos || "0", 10),
          ye = Number.isNaN(fe) ? re.length : Math.min(Math.max(0, fe), re.length);
        cy(Z, ye);
      }, 0);
      return () => window.clearTimeout(X);
    }, [o, e.id]);
    const A = g.useCallback(() => {
        n(e.id, {
          settings: {
            ...e.settings,
            cinemaConfig: l
          }
        }), s(null);
      }, [l, e.id, e.settings, n]),
      S = g.useCallback(() => {
        d(HPe), n(e.id, {
          settings: {
            ...e.settings,
            cinemaConfig: HPe
          }
        }), s(null);
      }, [e.id, e.settings, n]),
      C = g.useCallback((X, Z, re, fe) => {
        const ye = `${re}：${fe}`,
          ie = pvn(_, X),
          ae = ie.includes(Z),
          be = ae ? ie.filter(_e => _e !== Z) : [...ie, Z],
          Ee = {
            ..._,
            [X]: be.length > 0 ? be : null
          },
          xe = vdt(e.id, e.prompt || ""),
          he = hvn(e.id, xe);
        let ue = xe;
        ae ? ue = dIo(xe, ye) : ue = cIo(xe, ye, he), n(e.id, {
          prompt: ue,
          settings: {
            ...e.settings,
            movementConfig: Ee
          },
          content: QQ(Ee)
        }), !ae && ue !== xe && uIo(e.id, he, xe.length, ue.length);
        const ge = () => {
          const _e = document.querySelector(`div[contenteditable][data-node-id="${e.id}"][data-node-type="gen-node"]`);
          if (!_e) return;
          _e.focus();
          const ke = vdt(e.id, ue),
            ve = hvn(e.id, ke);
          cy(_e, Math.min(Math.max(0, ve), ke.length));
        };
        requestAnimationFrame(() => requestAnimationFrame(ge));
      }, [_, e.id, e.prompt, e.settings, n]),
      I = (X, Z) => pvn(_, X).includes(Z),
      E = g.useCallback(X => {
        d(Z => {
          const re = Z.cameraId ? w2.findIndex(ye => ye.id === Z.cameraId) : -1,
            fe = re < 0 ? 0 : (re + X + w2.length) % w2.length;
          return {
            ...Z,
            cameraId: w2[fe].id
          };
        });
      }, []),
      M = g.useCallback(X => {
        d(Z => {
          const re = Z.lensId ? x2.findIndex(ye => ye.id === Z.lensId) : -1,
            fe = re < 0 ? 0 : (re + X + x2.length) % x2.length;
          return {
            ...Z,
            lensId: x2[fe].id
          };
        });
      }, []),
      T = g.useCallback(X => {
        d(Z => {
          const re = Z.focalLengthId ? _2.findIndex(ye => ye.id === Z.focalLengthId) : -1,
            fe = re < 0 ? 0 : (re + X + _2.length) % _2.length;
          return {
            ...Z,
            focalLengthId: _2[fe].id
          };
        });
      }, []),
      P = g.useCallback(X => {
        d(Z => {
          const re = Z.apertureId ? k2.findIndex(ye => ye.id === Z.apertureId) : -1,
            fe = re < 0 ? 0 : (re + X + k2.length) % k2.length;
          return {
            ...Z,
            apertureId: k2[fe].id
          };
        });
      }, []);
    g.useLayoutEffect(() => {
      if (o !== "camera") return;
      const X = [{
          el: m.current,
          cycle: E
        }, {
          el: f.current,
          cycle: M
        }, {
          el: y.current,
          cycle: T
        }, {
          el: b.current,
          cycle: P
        }],
        Z = [];
      for (const {
        el: re,
        cycle: fe
      } of X) {
        if (!re) continue;
        const ye = ie => {
          ie.preventDefault(), ie.stopPropagation(), !(Math.abs(ie.deltaY) < .5) && fe(ie.deltaY > 0 ? 1 : -1);
        };
        re.addEventListener("wheel", ye, {
          passive: !1
        }), Z.push(() => re.removeEventListener("wheel", ye));
      }
      return () => Z.forEach(re => re());
    }, [o, E, M, T, P]), g.useLayoutEffect(() => {
      if (o !== "movement") return;
      const X = h.current,
        Z = p.current;
      if (!X || !Z) return;
      const re = fe => {
        if (fe.preventDefault(), fe.stopPropagation(), fe.shiftKey) {
          const ye = fe.target.closest(".gen-inline-movement-row");
          ye && (ye.scrollLeft += fe.deltaY);
          return;
        }
        Z.scrollTop += fe.deltaY;
      };
      return X.addEventListener("wheel", re, {
        passive: !1
      }), () => X.removeEventListener("wheel", re);
    }, [o]);
    const R = l.cameraId ? w2.find(X => X.id === l.cameraId) : null,
      j = l.lensId ? x2.find(X => X.id === l.lensId) : null,
      B = l.focalLengthId ? _2.find(X => X.id === l.focalLengthId) : null,
      F = l.apertureId ? k2.find(X => X.id === l.apertureId) : null,
      N = l.cameraId !== v.cameraId || l.lensId !== v.lensId || l.focalLengthId !== v.focalLengthId || l.apertureId !== v.apertureId,
      G = (X, Z, re) => {
        if (!Z) return null;
        const fe = X.findIndex(ye => ye.id === Z);
        return fe < 0 ? null : X[(fe + re + X.length) % X.length];
      },
      z = G(w2, l.cameraId, -1),
      V = G(w2, l.cameraId, 1),
      O = G(x2, l.lensId, -1),
      L = G(x2, l.lensId, 1),
      D = G(_2, l.focalLengthId, -1),
      U = G(_2, l.focalLengthId, 1),
      H = G(k2, l.apertureId, -1),
      Y = G(k2, l.apertureId, 1),
      K = ({
        columnRef: X,
        title: Z,
        value: re,
        preview: fe,
        previousPreview: ye,
        nextPreview: ie,
        onPrevious: ae,
        onNext: be
      }) => c.jsxs("div", {
        ref: X,
        className: "qiaodoumayi-camera-column",
        children: [c.jsx("div", {
          className: "qiaodoumayi-camera-ghost qiaodoumayi-camera-ghost-previous",
          "aria-hidden": !0,
          children: ye
        }), c.jsxs("div", {
          className: "qiaodoumayi-camera-current",
          children: [c.jsx("button", {
            type: "button",
            className: "qiaodoumayi-camera-step",
            onClick: ae,
            "aria-label": x("上一{0}", Z),
            children: c.jsx(Mf, {
              "aria-hidden": !0
            })
          }), c.jsx("button", {
            type: "button",
            className: "qiaodoumayi-camera-preview",
            onClick: be,
            "aria-label": x("{0}：{1}，点击切换下一项", Z, re || "未选择"),
            children: fe
          }), c.jsx("button", {
            type: "button",
            className: "qiaodoumayi-camera-step",
            onClick: be,
            "aria-label": x("下一{0}", Z),
            children: c.jsx(ss, {
              "aria-hidden": !0
            })
          })]
        }), c.jsx("div", {
          className: "qiaodoumayi-camera-ghost qiaodoumayi-camera-ghost-next",
          "aria-hidden": !0,
          children: ie
        }), c.jsx("span", {
          className: "qiaodoumayi-camera-value",
          title: re,
          children: re || "—"
        })]
      }),
      W = `flex items-center gap-1 px-2 py-1 rounded text-[10px] border whitespace-nowrap shrink-0 transition-colors ${t ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
      Q = t ? "text-[11px] px-4 py-1.5 rounded-lg font-medium transition-colors border border-zinc-500 bg-transparent text-zinc-100 hover:bg-zinc-800/60" : "text-[11px] px-4 py-1.5 rounded-lg font-medium transition-colors bg-black hover:bg-[#1f1f1f] text-white",
      q = (X, Z, re, fe) => {
        const ye = hIo[X.icon] || Oo,
          ie = I(Z, X.id),
          ae = t ? "border-white/50 bg-white/5 ring-1 ring-white/30" : fe === "cyan" ? "border-cyan-500 bg-cyan-500/10 ring-1 ring-cyan-500/40" : fe === "blue" ? "border-blue-500 bg-blue-500/10 ring-1 ring-blue-500/40" : fe === "purple" ? "border-purple-500 bg-purple-500/10 ring-1 ring-purple-500/40" : fe === "green" ? "border-green-500 bg-green-500/10 ring-1 ring-green-500/40" : fe === "amber" ? "border-amber-500 bg-amber-500/10 ring-1 ring-amber-500/40" : "border-rose-500 bg-rose-500/10 ring-1 ring-rose-500/40",
          be = t ? "border-zinc-700/50 bg-zinc-800/50 hover:border-zinc-600" : "border-zinc-300 bg-zinc-100 hover:border-zinc-400";
        return c.jsxs("button", {
          type: "button",
          onMouseDown: Ee => Ee.stopPropagation(),
          onClick: () => C(Z, X.id, re, X.name),
          className: `flex flex-col items-center justify-center p-1.5 rounded-lg border min-w-[52px] ${ie ? ae : be}`,
          title: `${X.name} (${X.nameEn})`,
          children: [c.jsx(ye, {
            size: 16,
            className: t ? "text-zinc-300" : "text-zinc-600"
          }), c.jsx("span", {
            className: `text-[9px] mt-0.5 leading-tight ${t ? "text-zinc-400" : "text-zinc-600"}`,
            children: X.name
          })]
        }, X.id);
      },
      ne = (X, Z, re, fe, ye) => c.jsxs("div", {
        className: "mb-3",
        children: [c.jsxs("div", {
          className: `text-[10px] mb-1.5 flex items-center gap-1 ${t ? "text-zinc-500" : "text-zinc-600"}`,
          children: [c.jsx("span", {
            className: "font-medium",
            children: X
          }), c.jsxs("span", {
            className: "text-[8px] opacity-60",
            children: ["(", Z, ")"]
          })]
        }), c.jsx("div", {
          className: "gen-inline-movement-row flex gap-1 overflow-x-auto pb-2 director-scrollbar",
          children: re.map(ie => q(ie, fe, X, ye))
        })]
      }),
      de = (v.cameraId || v.lensId || v.focalLengthId || v.apertureId) != null,
      le = (l.cameraId || l.lensId || l.focalLengthId || l.apertureId) != null,
      J = ["movementId", "directionId", "angleId", "speedId", "styleId", "deviceId"].reduce((X, Z) => {
        const re = _[Z];
        return re == null ? X : X + (Array.isArray(re) ? re.length : 1);
      }, 0);
    return c.jsxs("div", {
      ref: u,
      "data-gen-inline-director-bar": !0,
      className: "relative flex items-center gap-1 shrink-0 flex-nowrap",
      children: [c.jsxs("button", {
        type: "button",
        onMouseDown: X => X.stopPropagation(),
        onClick: X => {
          X.stopPropagation(), s(Z => Z === "camera" ? null : "camera");
        },
        className: `node-dropdown-button relative ${W} gap-1.5 px-2`,
        title: x("摄影机控制"),
        "aria-label": x("摄影机控制"),
        children: [c.jsx(Kh, {
          size: 16,
          strokeWidth: 1.75,
          className: "shrink-0 opacity-90"
        }), c.jsx("span", {
          className: "qiaodoumayi-gen-camera-label whitespace-nowrap",
          children: x("摄影机控制")
        }), de && c.jsx("span", {
          className: "absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-sky-400",
          "aria-hidden": !0
        })]
      }), i && c.jsxs("button", {
        type: "button",
        onMouseDown: X => X.stopPropagation(),
        onClick: X => {
          X.stopPropagation(), s(Z => Z === "movement" ? null : "movement");
        },
        className: `node-dropdown-button ${W} ${o === "movement" ? t ? "ring-1 ring-white/40 bg-white/5" : "ring-1 ring-zinc-400 bg-zinc-100" : ""}`,
        title: x("镜头运镜"),
        "aria-label": x("运镜"),
        children: [c.jsx(Oo, {
          size: 12,
          className: "opacity-80"
        }), x("运镜"), J > 0 && c.jsx("span", {
          className: `text-[9px] px-1 rounded ${t ? "bg-zinc-700 text-zinc-200" : "bg-zinc-200 text-zinc-700"}`,
          children: J
        })]
      }), o === "camera" && c.jsxs("div", {
        "data-qiaodoumayi-camera-panel": !0,
        "data-theme": t ? "dark" : "light",
        className: "absolute bottom-full left-1/2 mb-1 z-[120]",
        onMouseDown: X => X.stopPropagation(),
        children: [c.jsxs("div", {
          className: "qiaodoumayi-camera-header",
          children: [c.jsx("span", {
            children: x("摄影机控制")
          }), c.jsxs("div", {
            className: "qiaodoumayi-camera-actions",
            children: [c.jsx("button", {
              type: "button",
              className: "qiaodoumayi-camera-clear",
              disabled: !de && !le,
              onClick: S,
              children: x("清除")
            }), c.jsx("button", {
              type: "button",
              className: "qiaodoumayi-camera-save",
              disabled: !N,
              onClick: A,
              children: x("保存")
            })]
          })]
        }), c.jsxs("div", {
          className: "qiaodoumayi-camera-grid",
          children: [K({
            columnRef: m,
            title: "相机",
            value: (R == null ? void 0 : R.name) ?? "",
            onPrevious: () => E(-1),
            onNext: () => E(1),
            preview: R ? c.jsx("img", {
              src: `/cinema/${R.image}`,
              alt: x(R.name),
              className: "qiaodoumayi-camera-image"
            }) : c.jsx(Kh, {
              className: "qiaodoumayi-camera-placeholder",
              "aria-hidden": !0
            }),
            previousPreview: z ? c.jsx("img", {
              src: `/cinema/${z.image}`,
              alt: "",
              className: "qiaodoumayi-camera-image"
            }) : null,
            nextPreview: V ? c.jsx("img", {
              src: `/cinema/${V.image}`,
              alt: "",
              className: "qiaodoumayi-camera-image"
            }) : null
          }), K({
            columnRef: f,
            title: "镜头",
            value: (j == null ? void 0 : j.name) ?? "",
            onPrevious: () => M(-1),
            onNext: () => M(1),
            preview: j ? c.jsx("img", {
              src: `/cinema/${j.image}`,
              alt: j.name,
              className: "qiaodoumayi-camera-image"
            }) : c.jsx(kS, {
              className: "qiaodoumayi-camera-placeholder",
              "aria-hidden": !0
            }),
            previousPreview: O ? c.jsx("img", {
              src: `/cinema/${O.image}`,
              alt: "",
              className: "qiaodoumayi-camera-image"
            }) : null,
            nextPreview: L ? c.jsx("img", {
              src: `/cinema/${L.image}`,
              alt: "",
              className: "qiaodoumayi-camera-image"
            }) : null
          }), K({
            columnRef: y,
            title: "焦距",
            value: B ? `${B.value}mm` : "",
            onPrevious: () => T(-1),
            onNext: () => T(1),
            preview: c.jsx("span", {
              className: "qiaodoumayi-camera-focal",
              children: c.jsx("strong", {
                children: B ? `${B.value}mm` : "—"
              })
            }),
            previousPreview: D ? c.jsx("span", {
              className: "qiaodoumayi-camera-focal",
              children: c.jsxs("strong", {
                children: [D.value, "mm"]
              })
            }) : null,
            nextPreview: U ? c.jsx("span", {
              className: "qiaodoumayi-camera-focal",
              children: c.jsxs("strong", {
                children: [U.value, "mm"]
              })
            }) : null
          }), K({
            columnRef: b,
            title: "光圈",
            value: (F == null ? void 0 : F.value) ?? "",
            onPrevious: () => P(-1),
            onNext: () => P(1),
            preview: F ? c.jsx("img", {
              src: `/cinema/${F.image}`,
              alt: F.value,
              className: "qiaodoumayi-camera-image"
            }) : c.jsx(kS, {
              className: "qiaodoumayi-camera-placeholder",
              "aria-hidden": !0
            }),
            previousPreview: H ? c.jsx("img", {
              src: `/cinema/${H.image}`,
              alt: "",
              className: "qiaodoumayi-camera-image"
            }) : null,
            nextPreview: Y ? c.jsx("img", {
              src: `/cinema/${Y.image}`,
              alt: "",
              className: "qiaodoumayi-camera-image"
            }) : null
          })]
        })]
      }), i && o === "movement" && c.jsxs("div", {
        ref: h,
        className: `absolute bottom-full right-0 mb-1 z-[120] w-[min(92vw,360px)] max-h-[min(70vh,420px)] rounded-2xl border flex flex-col ${t ? "border-zinc-600/80 bg-[#1f1f1f]" : "border-zinc-300 bg-white"}`,
        onMouseDown: X => X.stopPropagation(),
        children: [c.jsxs("div", {
          className: `flex items-center justify-between px-3 py-2 border-b shrink-0 ${t ? "border-zinc-700/80" : "border-zinc-200"}`,
          children: [c.jsx("span", {
            className: `text-sm font-medium ${t ? "text-white" : "text-zinc-900"}`,
            children: x("镜头运镜")
          }), c.jsx("button", {
            type: "button",
            className: `p-1 rounded ${t ? "hover:bg-zinc-800 text-zinc-400" : "hover:bg-zinc-100 text-zinc-500"}`,
            onClick: () => s(null),
            "aria-label": x("关闭"),
            children: c.jsx(Na, {
              size: 16
            })
          })]
        }), c.jsxs("div", {
          ref: p,
          className: `overflow-y-auto minimal-scrollbar p-3 pt-2 ${t ? "text-zinc-300" : "text-zinc-600"}`,
          children: [ne("机位运动", "Movement", Xde, "movementId", "cyan"), ne("运动方向", "Direction", Jde, "directionId", "blue"), ne("机位角度", "Angle", Zde, "angleId", "purple"), ne("速度/幅度", "Speed", eue, "speedId", "green"), ne("经典风格", "Style", tue, "styleId", "amber"), ne("模拟设备", "Device", nue, "deviceId", "rose")]
        }), c.jsxs("div", {
          className: `flex justify-end px-3 py-2 border-t shrink-0 ${t ? "border-zinc-700/80" : "border-zinc-200"}`,
          children: [c.jsx("button", {
            type: "button",
            className: `text-[11px] px-2 py-1 rounded ${t ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-zinc-900"}`,
            onClick: () => {
              n(e.id, {
                settings: {
                  ...e.settings,
                  movementConfig: wdt
                },
                content: QQ(wdt)
              }), s(null);
            },
            children: x("清空运镜")
          }), c.jsx("button", {
            type: "button",
            className: `ml-2 ${Q}`,
            onClick: () => s(null),
            children: x("完成")
          })]
        })]
      })]
    });
  },
  mIo = 320;

function fIo(e) {
  return e instanceof Element ? !!(e.closest("[data-gen-params-fold]") || e.closest("[data-gen-node-portal-dropdown]") || e.closest(".node-dropdown-menu") || e.closest("[data-qiaodoumayi-camera-panel]")) : !1;
}

function gIo(e) {
  return !(e instanceof Element) || !e.closest("button") || e.closest("[data-keep-params-fold]") ? !1 : !!(e.closest(".node-dropdown-menu") || e.closest("[data-gen-node-portal-dropdown]"));
}

function yIo({
  summary: e,
  children: t
}) {
  on();
  const [n, r] = g.useState(!1),
    [a, i] = g.useState(!1),
    o = g.useRef(0);
  return g.useEffect(() => {
    if (n) {
      i(!0);
      return;
    }
    return o.current = window.setTimeout(() => i(!1), mIo), () => window.clearTimeout(o.current);
  }, [n]), g.useEffect(() => {
    if (!n) return;
    const s = d => {
        fIo(d.target) || r(!1);
      },
      l = d => {
        gIo(d.target) && r(!1);
      };
    return document.addEventListener("pointerdown", s, !0), document.addEventListener("click", l, !0), () => {
      document.removeEventListener("pointerdown", s, !0), document.removeEventListener("click", l, !0);
    };
  }, [n]), c.jsxs("div", {
    className: "qiaodoumayi-gen-params-fold",
    "data-gen-params-fold": "true",
    "data-open": n ? "true" : void 0,
    children: [a ? null : c.jsx("button", {
      type: "button",
      className: "node-dropdown-button qiaodoumayi-gen-params-fold-trigger",
      "aria-expanded": !1,
      title: e,
      "aria-label": x("展开参数"),
      onMouseDown: s => s.stopPropagation(),
      onClick: s => {
        s.stopPropagation(), r(!0);
      },
      children: c.jsx(hw, {
        size: 14,
        strokeWidth: 2,
        className: "qiaodoumayi-gen-params-fold-icon",
        "aria-hidden": !0
      })
    }), a ? c.jsx("div", {
      className: "qiaodoumayi-gen-params-fold-tray",
      "data-gen-params-fold-panel": "true",
      "data-state": n ? "open" : "closing",
      onMouseDown: s => s.stopPropagation(),
      children: t
    }) : null]
  });
}

const bIo = g.memo(function ({
    api: t
  }) {
    var ve, Te, Ne, me, Ae, Fe, Me, Re, $e, rt, nt, ze, Le, Ke, Xe, De, Ye, Ce, He, Ve, it, It, Ft, We, Ze, Ge, Oe, st, vt, Ht, nn, pt, lt, gt, Ut;
    on();
    const {
        isDark: n,
        node: r,
        updateNode: a,
        activeDropdown: i,
        availableModels: o,
        currentModel: s,
        currentModelConfig: l,
        durationDropdownButtonRef: d,
        getConnectedImageForInput: u,
        handleStartGenerate: h,
        isGeneratingUi: p,
        showPromptLibraryShortcut: m,
        onOpenPromptLibrary: f,
        isModelDropdownOpen: y,
        isModelOptionSelected: b,
        isModelHiddenInList: v,
        modelDropdownButtonRef: _,
        modelDropdownMenuWidth: w,
        modelDropdownOptionKeys: k,
        selectedChannel: A,
        onSelectChannel: S,
        showHaiyiChannel: C,
        pendingAudioFile: I,
        ratioDropdownButtonRef: E,
        setActiveDropdown: M,
        setPendingAudioFile: T,
        setShowAudioSegmentSelector: P,
        setShowKlingImageUploadPanel: R,
        setShowKlingSubjectSelector: j,
        setShowVideoSegmentSelector: B,
        setWan26AudioError: F,
        showAudioSegmentSelector: N,
        wan26AudioFileInputRef: G,
        genUseAliyunOss: z,
        onGenUseAliyunOssChange: V,
        getLatestNodeSettings: O,
        globalOssUploadEnabled: L,
        ossConfigured: D,
        mediaHostingProvider: U,
        onGenInlineDirectorUiChange: H,
        onInlineMovementPanelChange: Y
      } = t,
      K = g.useCallback(() => {
        M((i == null ? void 0 : i.type) === "model" && (i == null ? void 0 : i.nodeId) === r.id ? null : {
          nodeId: r.id,
          type: "model"
        });
      }, [i, r.id, M]),
      W = g.useCallback(_t => {
        const At = XLn(r.type, r.settings, _t);
        a(r.id, {
          settings: At
        }), BPt(r.type, _t), M(null);
      }, [r.id, r.type, r.settings, a, M]),
      Q = byr(r.id),
      q = C5(r.settings || {}) && ((Q == null ? void 0 : Q.status) === "live" || (Q == null ? void 0 : Q.status) === "connecting"),
      ne = g.useRef(null),
      de = g.useRef(null),
      le = (i == null ? void 0 : i.nodeId) === r.id && (i == null ? void 0 : i.type) === "mjVersion",
      J = (i == null ? void 0 : i.nodeId) === r.id && (i == null ? void 0 : i.type) === "huyaMjVersion",
      pe = g.useCallback((_t, At) => {
        H == null || H(_t, At), At && M(null);
      }, [H, M]),
      {
        isMidjourney: ce,
        isWan26: we,
        isKlingOmni: X,
        isKlingV25Fal: Z,
        isKlingV26Fal: re,
        isKlingV3Fal: fe,
        isKlingV3Omni: ye,
        ratioOptions: ie,
        resolutionOptions: ae,
        nodePlatformGroup: be,
        uiResolution: Ee,
        showThirdPartyPlatformUi: xe,
        isGenNodeToolbarCompact: he,
        genNodeToolbarReservedPx: ue,
        paramsFoldSummary: ge
      } = lIo({
        node: r,
        currentModel: s,
        currentModelConfig: l,
        isModelHiddenInList: v,
        globalOssUploadEnabled: L,
        ossConfigured: D,
        mediaHostingProvider: U
      }),
      _e = g.useMemo(() => {
        var _t;
        return dKe(s, ((_t = r.settings) == null ? void 0 : _t.ratio) || "Auto");
      }, [s, (ve = r.settings) == null ? void 0 : ve.ratio]),
      ke = r.type === "gen-image" && (Pf(s) || s === "codex-image");
    return g.useEffect(() => {
      var Yt;
      if (r.type !== "gen-video" || !pX(s)) return;
      const _t = String(((Yt = r.settings) == null ? void 0 : Yt.ratio) || "").trim();
      if (_t && ie.includes(_t)) return;
      const At = ie[0] || "16:9";
      _t !== At && a(r.id, {
        settings: {
          ...(r.settings || {}),
          ratio: At
        }
      });
    }, [r.type, s, r.id, r.settings, ie, a]), g.useEffect(() => {
      var At;
      if (r.type !== "gen-video" || !C5(r.settings || {})) return;
      const _t = String(((At = r.settings) == null ? void 0 : At.ratio) || "").trim();
      cce.includes(_t) || a(r.id, {
        settings: {
          ...(r.settings || {}),
          ratio: "16:9"
        }
      });
    }, [r.type, r.id, r.settings, a]), g.useEffect(() => {
      if (r.type !== "gen-video" || !Jxe(s)) return;
      const _t = r.settings || {};
      if (!JLn(_t)) return;
      const At = String(_t.duration || ""),
        Yt = String(_t.ratio || "Auto").trim(),
        qe = At !== "自适应" && At !== "-1",
        kt = Yt !== "Auto" && Yt.toLowerCase() !== "auto" && Yt.toLowerCase() !== "adaptive";
      !qe && !kt || a(r.id, {
        settings: {
          ..._t,
          ...(qe ? {
            duration: "自适应"
          } : {}),
          ...(kt ? {
            ratio: "Auto"
          } : {})
        }
      });
    }, [r.type, r.id, s, (Te = r.settings) == null ? void 0 : Te.seedanceMaterials, (Ne = r.settings) == null ? void 0 : Ne.duration, (me = r.settings) == null ? void 0 : me.ratio, a]), g.useEffect(() => {
      var Qt;
      if (r.type !== "gen-video") return;
      const _t = eBe(s) && !Z,
        At = tBe(s);
      if (!_t && !At) return;
      const Yt = !!u(r.id, "veo_start"),
        qe = !!u(r.id, "veo_end"),
        kt = Yt || qe;
      if (!((Qt = r.settings) != null && Qt.veoFramesMode && kt)) return;
      const St = r.settings || {};
      (_t && String(St.klingV25Resolution || "std") !== "pro" || At && String(St.klingV26Resolution || "std") !== "pro") && a(r.id, {
        settings: {
          ...St,
          ...(_t ? {
            klingV25Resolution: "pro"
          } : {}),
          ...(At ? {
            klingV26Resolution: "pro"
          } : {})
        }
      });
    }, [r.type, r.id, s, Z, re, (Ae = r.settings) == null ? void 0 : Ae.veoFramesMode, (Fe = r.settings) == null ? void 0 : Fe.klingV25Resolution, (Me = r.settings) == null ? void 0 : Me.klingV26Resolution, u, a]), g.useEffect(() => {
      var Yt, qe;
      if (!ce || r.type !== "gen-image") return;
      const _t = String(((Yt = r.settings) == null ? void 0 : Yt.mjVersion) || "").trim();
      if (_t && QH.some(kt => kt.value === _t)) return;
      const At = String(((qe = zs(s)) == null ? void 0 : qe.mjVersion) || "").trim();
      !At || !QH.some(kt => kt.value === At) || a(r.id, {
        settings: {
          ...(r.settings || {}),
          mjVersion: At
        }
      });
    }, [ce, s, r.id, r.type, (Re = r.settings) == null ? void 0 : Re.mjVersion, a]), g.useEffect(() => {
      var Yt, qe;
      if (!Iu(s) || r.type !== "gen-image") return;
      const _t = String(((Yt = r.settings) == null ? void 0 : Yt.huyaMjVersion) || "").trim();
      if (_t && sre.some(kt => kt.value === _t)) return;
      const At = String(((qe = zs(s)) == null ? void 0 : qe.huyaMjVersion) || "").trim();
      !At || !sre.some(kt => kt.value === At) || a(r.id, {
        settings: {
          ...(r.settings || {}),
          huyaMjVersion: At
        }
      });
    }, [s, r.id, r.type, ($e = r.settings) == null ? void 0 : $e.huyaMjVersion, a]), g.useEffect(() => {
      var St;
      if (r.type !== "gen-image" && r.type !== "gen-video" || ke) return;
      const _t = String(((St = r.settings) == null ? void 0 : St.ratio) ?? ""),
        Yt = Mtt(r) ? null : TKe(r, _e),
        qe = !!Yt && (Math.abs(((Yt == null ? void 0 : Yt.width) || 0) - r.width) > .5 || Math.abs(((Yt == null ? void 0 : Yt.height) || 0) - r.height) > .5);
      if (_e === _t && !qe) return;
      const kt = {
        ...(r.settings || {}),
        ratio: _e
      };
      qe && (kt.hasCustomSize = void 0, kt.savedNodeWidth = void 0, kt.savedNodeHeight = void 0), a(r.id, {
        ...(qe ? Yt || {} : {}),
        settings: kt
      });
    }, [r.id, r.type, r.x, r.y, r.width, r.height, r.content, r.settings, s, _e, a]), c.jsx(c.Fragment, {
      children: c.jsxs("div", {
        "data-qiaodoumayi-gen-toolbar": "true",
        "data-qiaodoumayi-gen-node-type": r.type,
        className: `qiaodoumayi-gen-toolbar flex items-center justify-start shrink-0 relative min-h-14 w-full min-w-0 p-2 ${he ? "flex-nowrap gap-x-0.5 overflow-visible" : ux(s) ? "flex-wrap gap-x-1 gap-y-1 sm:gap-x-2" : "gap-2 flex-nowrap overflow-visible"}`,
        children: [c.jsx(O5o, {
          kind: r.type === "gen-video" ? "video" : "image",
          isDark: n,
          isGenNodeToolbarCompact: he,
          usesGptStyleSizeUi: ke,
          genNodeToolbarReservedPx: ue,
          currentModel: s,
          currentModelConfig: l,
          availableModels: o,
          isModelHiddenInList: v,
          isModelOptionSelected: b,
          isModelDropdownOpen: y,
          modelDropdownButtonRef: _,
          modelDropdownMenuWidth: w,
          modelDropdownOptionKeys: k,
          selectedChannel: A,
          onSelectChannel: S,
          showHaiyiChannel: C,
          onToggle: K,
          onSelect: W
        }), c.jsxs("div", {
          className: "qiaodoumayi-gen-size-beside-model shrink-0 flex items-center gap-1 overflow-visible",
          children: [c.jsx("span", {
            className: "qiaodoumayi-gen-model-size-divider",
            "aria-hidden": !0
          }), (() => {
            var ln, Pn, rn, Yn, Ct, Cn;
            const _t = (ln = dh(s)) == null ? void 0 : ln.localComfy,
              At = _t ? _t.model || "flux" : void 0,
              Yt = r.type === "gen-image" && At === "flux" || r.type === "gen-video" && At === "h3",
              qe = Yt ? c.jsx(Q5o, {
                model: At,
                settings: r.settings || {},
                isDark: n,
                onChange: un => {
                  a(r.id, {
                    settings: {
                      ...(r.settings || {}),
                      ...un
                    }
                  }), cl(s, un);
                }
              }) : void 0,
              kt = Yt ? K5o(At, r.settings || {}) : void 0,
              St = gDn(r.type, s, {
                grokImageQuality: (Pn = r.settings) == null ? void 0 : Pn.grokImageQuality,
                gptImageQuality: (rn = r.settings) == null ? void 0 : rn.gptImageQuality
              }, OYr(r.type, s) ? zs(s) : void 0),
              hn = un => {
                const Jn = {
                  [St.field]: un
                };
                a(r.id, {
                  settings: {
                    ...(r.settings || {}),
                    ...Jn
                  }
                }), cl(s, Jn);
              },
              Qt = ({
                updates: un,
                geometryChanged: Jn
              }) => {
                Jn && (Xwi(r.id), Da.flushSync(() => {
                  U3i(r.id);
                }), $3i(r.id)), a(r.id, un);
              },
              Ot = un => {
                Qt(D5o(r, Mtt(r), un)), cl(s, {
                  aspectRatio: un
                });
              };
            if (ke) return c.jsx(VJe, {
              variant: "dropdown",
              nodeId: r.id,
              isDark: n,
              currentModel: s,
              settings: r.settings || {},
              activeDropdown: i,
              setActiveDropdown: M,
              qualityOptions: St.options,
              selectedQuality: St.selected,
              onSelectQuality: hn,
              onApply: un => {
                Qt(L5o(r, Mtt(r), un));
              },
              onSaveModelMemory: un => cl(s, un)
            });
            if (r.type === "gen-image") {
              const un = ae.length > 0 && !ce && s !== "wan-2.6-image-official" ? ae : [],
                Jn = ((Yn = r.settings) == null ? void 0 : Yn.resolution) || un[0] || "",
                Kn = un.includes(Jn) ? Jn : un[0];
              return c.jsx(GJe, {
                settingsSlot: qe,
                summaryExtra: kt,
                nodeId: r.id,
                isDark: n,
                dropdownType: "ratio",
                activeDropdown: i,
                setActiveDropdown: M,
                selectedRatio: _e || "Auto",
                ratioOptions: ie,
                onSelectRatio: Ot,
                resolutionOptions: un,
                selectedResolution: Kn,
                onSelectResolution: en => {
                  a(r.id, {
                    settings: {
                      ...(r.settings || {}),
                      resolution: en
                    }
                  }), cl(s, {
                    resolution: en
                  });
                },
                qualityOptions: St.options,
                selectedQuality: St.selected,
                onSelectQuality: hn
              });
            }
            if (r.type === "gen-video") {
              const un = wt => {
                  a(r.id, {
                    settings: wt.settings
                  });
                  for (const jt of wt.memoryUpdates) cl(s, jt);
                },
                Jn = ZLn(s, r.settings || {}),
                Kn = ZC(s),
                en = kp(s),
                Vn = Gp(s),
                Tt = Fm(s),
                Ue = Ap(s),
                et = Kn || en || Vn || Tt || Ue,
                ft = (en || Vn || Ue) && (Jn.grok15WorkflowMode || "t2v") === "t2v",
                ht = tOn(s);
              return c.jsx(W5o, {
                settingsSlot: Cu(s) && t.getMetasoInput ? c.jsx(q5o, {
                  node: r,
                  isDark: n,
                  busy: p,
                  getInput: t.getMetasoInput,
                  updateNode: a
                }) : qe,
                summaryExtra: Cu(s) && ((Ct = r.settings) != null && Ct.metasoFastMode) && !((Cn = r.settings) != null && Cn.metasoRegenerationMode) ? "优先" : kt,
                nodeId: r.id,
                isDark: n,
                dropdownType: "video-settings",
                activeDropdown: i,
                setActiveDropdown: M,
                selectedRatio: Jn.videoEditLocksAdaptive ? "Auto" : _e || "Auto",
                ratioOptions: Jn.videoEditLocksAdaptive ? ["Auto"] : C5(r.settings || {}) ? [...cce] : ie,
                onSelectRatio: wt => {
                  Jn.videoEditLocksAdaptive && wt !== "Auto" || Ot(wt);
                },
                compactWorkflowPanel: en || Vn || Tt,
                framesModeOptions: ft ? [{
                  value: "frames",
                  label: "首尾帧"
                }, {
                  value: "reference",
                  label: "参考"
                }] : [],
                selectedFramesMode: Jn.framesMode ? "frames" : "reference",
                onSelectFramesMode: ft ? wt => {
                  un(nOn(s, r.settings || {}, wt));
                } : void 0,
                modeOptions: ht,
                modeLayout: Jn.modeLayout,
                selectedMode: Cu(s) ? Lea(r.settings || {}) : et ? Jn.grok15WorkflowMode || "t2v" : Yc(s) ? jGr(r.settings || {}) : Jn.framesMode ? "frames" : "reference",
                onSelectMode: wt => {
                  un(rOn(s, r.settings || {}, wt));
                },
                showRatioSection: Jn.showRatioSection,
                showResolutionSection: Jn.showResolutionSection,
                showDurationSection: Jn.showDurationSection,
                ratioHint: Jn.ratioHint,
                durationHint: Jn.durationHint,
                voiceOptions: Jn.voiceOptions,
                selectedVoices: Jn.selectedVoices,
                onToggleVoice: Kn ? wt => {
                  const jt = _Jr(r.settings || {}, wt);
                  a(r.id, {
                    settings: jt
                  });
                } : void 0,
                resolutionOptions: Jn.resolutionOptions,
                selectedResolution: Jn.selectedResolution,
                onSelectResolution: wt => {
                  un(N5o(s, r.settings || {}, wt, Jn.resolutionField));
                },
                durationOptions: Jn.durationOptions,
                selectedDuration: Jn.selectedDuration,
                customDurationSeconds: Jn.customDurationSeconds,
                onSelectDuration: wt => {
                  un(j5o(s, r.settings || {}, wt, Jn.videoEditLocksAdaptive));
                },
                showAudio: Jn.showAudio,
                audioEnabled: Jn.audioEnabled,
                onSelectAudio: wt => {
                  Jn.audioField && (a(r.id, {
                    settings: {
                      ...(r.settings || {}),
                      [Jn.audioField]: wt
                    }
                  }), cl(s, {
                    [Jn.audioField]: wt
                  }));
                },
                showPrimeVersion: Jn.showPrimeVersion,
                primeEnabled: Jn.primeEnabled,
                onSelectPrime: wt => {
                  a(r.id, {
                    settings: {
                      ...(r.settings || {}),
                      wan30Prime: wt,
                      ...(wt ? {} : s === "wan-3.0-prime" ? {
                        model: "wan-3.0"
                      } : {})
                    }
                  }), cl(s === "wan-3.0-prime" ? "wan-3.0" : s, {
                    wan30Prime: wt
                  });
                }
              });
            }
            return null;
          })(), c.jsx("span", {
            className: "qiaodoumayi-gen-model-size-divider",
            "aria-hidden": !0
          })]
        }), m ? c.jsx("button", {
          type: "button",
          className: `flex shrink-0 items-center whitespace-nowrap rounded border px-2 py-1 text-[10px] transition-colors ${n ? "border-white/30 bg-transparent text-white hover:bg-white/5" : "border-gray-300 bg-transparent text-gray-900 hover:bg-black/5"}`,
          onMouseDown: _t => _t.stopPropagation(),
          onClick: _t => {
            _t.stopPropagation(), f();
          },
          title: x("打开词库"),
          children: x("词库")
        }) : null, c.jsx(yIo, {
          summary: ge,
          children: c.jsxs("div", {
            className: "qiaodoumayi-gen-params min-w-0 flex shrink-0 flex-nowrap items-center gap-x-0.5 overflow-visible",
            children: [r.type === "gen-image" || r.type === "gen-video" ? c.jsxs("label", {
              className: "inline-flex shrink-0 items-center",
              onMouseDown: _t => _t.stopPropagation(),
              title: x("图片改用 Base64 发送到 API，视频仍走链接"),
              children: [c.jsx("input", {
                type: "checkbox",
                checked: !!((rt = r.settings) != null && rt.ossImageBase64),
                onChange: _t => {
                  const At = _t.target.checked;
                  a(r.id, {
                    settings: {
                      ...(r.settings || {}),
                      ossImageBase64: At
                    }
                  });
                },
                className: "h-3 w-3 cursor-pointer",
                onMouseDown: _t => _t.stopPropagation()
              }), c.jsx("span", {
                className: "whitespace-nowrap",
                children: "B64"
              })]
            }) : null, r.type === "gen-image" && Iu(s) && c.jsx("button", {
              type: "button",
              onClick: _t => {
                var At;
                _t.stopPropagation(), a(r.id, {
                  settings: {
                    ...(r.settings || {}),
                    huyaMjAdvancedOpen: !((At = r.settings) != null && At.huyaMjAdvancedOpen)
                  }
                });
              },
              onMouseDown: _t => _t.stopPropagation(),
              className: `node-dropdown-button flex items-center gap-1 px-2 py-1 rounded text-[10px] border whitespace-nowrap ${(nt = r.settings) != null && nt.huyaMjAdvancedOpen ? n ? "bg-transparent border-white/50 text-white" : "bg-blue-500/15 border-blue-400 text-blue-700" : n ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
              title: x("高级设置"),
              "aria-label": x("高级设置"),
              children: c.jsx(by, {
                size: 12
              })
            }), r.type === "gen-image" && Iu(s) && c.jsxs("div", {
              className: "relative shrink-0 overflow-visible",
              "data-gen-dropdown-type": "huyaMjVersion",
              children: [c.jsx("button", {
                ref: de,
                onClick: _t => {
                  _t.stopPropagation(), M((i == null ? void 0 : i.type) === "huyaMjVersion" && (i == null ? void 0 : i.nodeId) === r.id ? null : {
                    nodeId: r.id,
                    type: "huyaMjVersion"
                  });
                },
                onMouseDown: _t => _t.stopPropagation(),
                className: `node-dropdown-button flex items-center gap-1 px-2 py-1 rounded text-[10px] transition-colors border whitespace-nowrap ${n ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
                children: c.jsx("span", {
                  className: "truncate",
                  children: ((ze = sre.find(_t => _t.value === US(s, r.settings))) == null ? void 0 : ze.label) || "MJ V7"
                })
              }), c.jsx(Tv, {
                open: J,
                anchorRef: de,
                isDark: n,
                menuWidth: 112,
                maxHeight: 256,
                placement: "above",
                scrollToSelectedKey: US(s, r.settings),
                children: sre.map(_t => {
                  const At = US(s, r.settings) === _t.value;
                  return c.jsxs("button", {
                    ...(At ? {
                      [Md]: "true"
                    } : {}),
                    [qk]: _t.value,
                    onClick: () => {
                      a(r.id, {
                        settings: {
                          ...(r.settings || {}),
                          huyaMjVersion: _t.value
                        }
                      }), cl(s, {
                        huyaMjVersion: _t.value
                      }), M(null);
                    },
                    className: `w-full flex items-center justify-between px-2 py-1.5 rounded text-left transition-colors ${n ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-zinc-100 text-zinc-700"} ${At ? n ? "bg-zinc-800" : "bg-zinc-100" : ""}`,
                    children: [c.jsx("span", {
                      className: "text-xs font-medium",
                      children: x(_t.label)
                    }), At && c.jsx(io, {
                      size: 12,
                      className: "text-green-500"
                    })]
                  }, _t.value);
                })
              })]
            }), r.type === "gen-image" && ce && c.jsx("button", {
              type: "button",
              onClick: _t => {
                var At;
                _t.stopPropagation(), a(r.id, {
                  settings: {
                    ...(r.settings || {}),
                    mjAdvancedOpen: !((At = r.settings) != null && At.mjAdvancedOpen)
                  }
                });
              },
              onMouseDown: _t => _t.stopPropagation(),
              className: `node-dropdown-button flex items-center gap-1 px-2 py-1 rounded text-[10px] border whitespace-nowrap ${(Le = r.settings) != null && Le.mjAdvancedOpen ? n ? "bg-transparent border-white/50 text-white" : "bg-blue-500/15 border-blue-400 text-blue-700" : n ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
              title: x("高级设置"),
              "aria-label": x("高级设置"),
              children: c.jsx(by, {
                size: 12
              })
            }), ce && c.jsxs("div", {
              className: "relative shrink-0 overflow-visible",
              "data-gen-dropdown-type": "mjVersion",
              children: [c.jsx("button", {
                ref: ne,
                onClick: _t => {
                  _t.stopPropagation(), M((i == null ? void 0 : i.type) === "mjVersion" && (i == null ? void 0 : i.nodeId) === r.id ? null : {
                    nodeId: r.id,
                    type: "mjVersion"
                  });
                },
                onMouseDown: _t => _t.stopPropagation(),
                className: `node-dropdown-button flex items-center gap-1 px-2 py-1 rounded text-[10px] transition-colors border whitespace-nowrap ${n ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
                children: c.jsx("span", {
                  className: "truncate",
                  children: ((Ke = QH.find(_t => {
                    var At;
                    return _t.value === ((At = r.settings) == null ? void 0 : At.mjVersion);
                  })) == null ? void 0 : Ke.label) || "MJ V7"
                })
              }), c.jsx(Tv, {
                open: le,
                anchorRef: ne,
                isDark: n,
                menuWidth: 112,
                maxHeight: 256,
                placement: "above",
                scrollToSelectedKey: String(((Xe = r.settings) == null ? void 0 : Xe.mjVersion) || ""),
                children: QH.map(_t => {
                  var Yt;
                  const At = ((Yt = r.settings) == null ? void 0 : Yt.mjVersion) === _t.value;
                  return c.jsxs("button", {
                    ...(At ? {
                      [Md]: "true"
                    } : {}),
                    [qk]: _t.value,
                    onClick: () => {
                      a(r.id, {
                        settings: {
                          ...(r.settings || {}),
                          mjVersion: _t.value
                        }
                      }), cl(s, {
                        mjVersion: _t.value
                      }), M(null);
                    },
                    className: `w-full flex items-center justify-between px-2 py-1.5 rounded text-left transition-colors ${n ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-zinc-100 text-zinc-700"} ${At ? n ? "bg-zinc-800" : "bg-zinc-100" : ""}`,
                    children: [c.jsx("span", {
                      className: "text-xs font-medium",
                      children: x(_t.label)
                    }), At && c.jsx(io, {
                      size: 12,
                      className: "text-green-500"
                    })]
                  }, _t.value);
                })
              })]
            }), xe ? c.jsx(Ku, {
              nodeId: r.id,
              platformGroup: be,
              modelName: (l == null ? void 0 : l.modelName) || s,
              modelId: s,
              modelConfigId: s,
              uiResolution: Ee,
              isDark: n,
              nodeSettings: r.settings,
              updateNode: a,
              compact: he,
              truncateHead3: he,
              buttonVariant: "square",
              menuPlacement: "above"
            }) : null, s === "codex-image" ? c.jsx(B5o, {
              isDark: n
            }) : null, r.type === "gen-image" && (fce(s) || Hh(s) || Uu(s) || su(s)) && c.jsxs("div", {
              className: "relative overflow-visible",
              "data-gen-dropdown-type": "gpt2_fmt",
              children: [c.jsx("button", {
                onClick: _t => {
                  _t.stopPropagation(), M((i == null ? void 0 : i.type) === "gpt2_fmt" && (i == null ? void 0 : i.nodeId) === r.id ? null : {
                    nodeId: r.id,
                    type: "gpt2_fmt"
                  });
                },
                onMouseDown: _t => _t.stopPropagation(),
                className: `node-dropdown-button flex items-center gap-1 px-2 py-1 rounded text-[10px] border ${n ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
                children: (su(s) ? $ft : Uu(s) ? Uft : Hh(s) ? zft : _v(s) ? xgt : Rm(s) ? wgt : Og(s) ? vgt : Lg(s) ? bgt : Dg(s) ? ygt : _xe)[String(((De = r.settings) == null ? void 0 : De.gptImageOutputFormat) || "png").toLowerCase()] || "PNG"
              }), (i == null ? void 0 : i.nodeId) === r.id && (i == null ? void 0 : i.type) === "gpt2_fmt" && c.jsx("div", {
                className: `node-dropdown-menu absolute bottom-full right-0 mb-1 w-24 rounded-lg shadow-xl p-1 z-[100] border ${n ? "bg-[#1f1f1f] border-zinc-700" : "bg-white border-zinc-200"}`,
                onMouseDown: _t => _t.stopPropagation(),
                children: ["png", "jpeg", "webp"].map(_t => {
                  var At;
                  return c.jsx("button", {
                    onClick: () => {
                      a(r.id, {
                        settings: {
                          ...(r.settings || {}),
                          gptImageOutputFormat: _t
                        }
                      }), cl(s, {
                        gptImageOutputFormat: _t
                      }), M(null);
                    },
                    className: `w-full px-2 py-1.5 rounded text-left text-xs transition-colors ${n ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-zinc-100 text-zinc-700"} ${String(((At = r.settings) == null ? void 0 : At.gptImageOutputFormat) || "png") === _t ? n ? "bg-zinc-800" : "bg-zinc-100" : ""}`,
                    children: (su(s) ? $ft : Uu(s) ? Uft : Hh(s) ? zft : _v(s) ? xgt : Rm(s) ? wgt : Og(s) ? vgt : Lg(s) ? bgt : Dg(s) ? ygt : _xe)[_t] || _t.toUpperCase()
                  }, _t);
                })
              })]
            }), r.type === "gen-image" && fce(s) && (() => {
              var qe, kt;
              const _t = aG((qe = r.settings) == null ? void 0 : qe.falSafetyTolerance),
                At = xhe((kt = r.settings) == null ? void 0 : kt.falEnableWebSearch),
                Yt = !Rm(s);
              return c.jsxs(c.Fragment, {
                children: [c.jsxs("div", {
                  className: "relative overflow-visible shrink-0",
                  "data-gen-dropdown-type": "fal_safety_tol",
                  children: [c.jsxs("button", {
                    onClick: St => {
                      St.stopPropagation(), M((i == null ? void 0 : i.type) === "fal_safety_tol" && (i == null ? void 0 : i.nodeId) === r.id ? null : {
                        nodeId: r.id,
                        type: "fal_safety_tol"
                      });
                    },
                    onMouseDown: St => St.stopPropagation(),
                    className: `node-dropdown-button flex items-center gap-1 px-2 py-1 rounded text-[10px] border ${n ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
                    title: x("safety_tolerance：1 最严 → 6 最松"),
                    children: [x("审"), x(BKt[_t])]
                  }), (i == null ? void 0 : i.nodeId) === r.id && (i == null ? void 0 : i.type) === "fal_safety_tol" && c.jsx("div", {
                    className: `node-dropdown-menu absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-28 rounded-lg shadow-xl p-1 z-[100] border ${n ? "bg-[#1f1f1f] border-zinc-700" : "bg-white border-zinc-200"}`,
                    onMouseDown: St => St.stopPropagation(),
                    children: yDn.map(St => c.jsxs("button", {
                      onClick: () => {
                        a(r.id, {
                          settings: {
                            ...(r.settings || {}),
                            falSafetyTolerance: St
                          }
                        }), cl(s, {
                          falSafetyTolerance: St
                        }), M(null);
                      },
                      className: `w-full px-2 py-1.5 rounded text-left text-xs transition-colors ${n ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-zinc-100 text-zinc-700"} ${_t === St ? n ? "bg-zinc-800" : "bg-zinc-100" : ""}`,
                      children: [St, " · ", x(BKt[St])]
                    }, St))
                  })]
                }), Yt ? c.jsxs("label", {
                  className: `sketch-chat-web-chip${n ? " sketch-chat-web-chip--dark" : ""}`,
                  title: x("enable_web_search：允许模型联网检索最新信息辅助生图"),
                  onMouseDown: St => St.stopPropagation(),
                  onClick: St => St.stopPropagation(),
                  children: [c.jsx("input", {
                    type: "checkbox",
                    checked: At,
                    onChange: St => {
                      const hn = St.target.checked;
                      a(r.id, {
                        settings: {
                          ...(r.settings || {}),
                          falEnableWebSearch: hn
                        }
                      }), cl(s, {
                        falEnableWebSearch: hn
                      });
                    },
                    className: "h-3 w-3 cursor-pointer"
                  }), c.jsx("span", {
                    className: "whitespace-nowrap",
                    children: x("联网")
                  })]
                }) : null]
              });
            })(), r.type === "gen-image" && z5(s) && c.jsxs("label", {
              className: `flex items-center gap-1 px-2 py-1 rounded text-[10px] border cursor-pointer whitespace-nowrap shrink-0 ${n ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
              title: x("开启思考模式以提升图像质量（会增加生成时间）"),
              onMouseDown: _t => _t.stopPropagation(),
              onClick: _t => _t.stopPropagation(),
              children: [c.jsx("input", {
                type: "checkbox",
                checked: !!((Ye = r.settings) != null && Ye.wan27ThinkingMode),
                onChange: _t => {
                  a(r.id, {
                    settings: {
                      ...(r.settings || {}),
                      wan27ThinkingMode: _t.target.checked
                    }
                  }), cl(s, {
                    wan27ThinkingMode: _t.target.checked
                  });
                },
                className: "w-3 h-3"
              }), x("思考")]
            }), r.type === "gen-image" && Up(s) && c.jsxs("div", {
              className: "relative shrink-0 overflow-visible",
              "data-gen-dropdown-type": "huya_gpt2_mod",
              children: [c.jsx("button", {
                onClick: _t => {
                  _t.stopPropagation(), M((i == null ? void 0 : i.type) === "huya_gpt2_mod" && (i == null ? void 0 : i.nodeId) === r.id ? null : {
                    nodeId: r.id,
                    type: "huya_gpt2_mod"
                  });
                },
                onMouseDown: _t => _t.stopPropagation(),
                className: `node-dropdown-button flex items-center gap-1 px-2 py-1 rounded text-[10px] border whitespace-nowrap ${n ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
                title: x("内容审核"),
                children: x(Uxe[cX((Ce = r.settings) == null ? void 0 : Ce.gptImageModeration)])
              }), (i == null ? void 0 : i.nodeId) === r.id && (i == null ? void 0 : i.type) === "huya_gpt2_mod" && c.jsx("div", {
                className: `node-dropdown-menu absolute bottom-full left-1/2 -translate-x-1/2 mb-1 rounded-lg shadow-xl p-1 z-[100] border ${n ? "bg-[#1f1f1f] border-zinc-700" : "bg-white border-zinc-200"}`,
                onMouseDown: _t => _t.stopPropagation(),
                children: c.jsx("div", {
                  className: "flex flex-col gap-0.5 min-w-[5rem]",
                  children: J6t.map(_t => {
                    var At;
                    return c.jsx("button", {
                      onClick: () => {
                        a(r.id, {
                          settings: {
                            ...(r.settings || {}),
                            gptImageModeration: _t
                          }
                        }), cl(s, {
                          gptImageModeration: _t
                        }), M(null);
                      },
                      className: `w-full px-2 py-1.5 rounded text-left text-xs transition-colors ${n ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-zinc-100 text-zinc-700"} ${cX((At = r.settings) == null ? void 0 : At.gptImageModeration) === _t ? n ? "bg-zinc-800" : "bg-zinc-100" : ""}`,
                      children: x(Uxe[_t])
                    }, _t);
                  })
                })
              })]
            }), r.type === "gen-image" && pI(s) && c.jsxs("div", {
              className: "relative shrink-0 overflow-visible",
              "data-gen-dropdown-type": "huya_gpt25_bg",
              children: [c.jsx("button", {
                onClick: _t => {
                  _t.stopPropagation(), M((i == null ? void 0 : i.type) === "huya_gpt25_bg" && (i == null ? void 0 : i.nodeId) === r.id ? null : {
                    nodeId: r.id,
                    type: "huya_gpt25_bg"
                  });
                },
                onMouseDown: _t => _t.stopPropagation(),
                className: `node-dropdown-button flex items-center gap-1 px-2 py-1 rounded text-[10px] border whitespace-nowrap ${n ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
                title: x("背景"),
                children: x($xe[dX((He = r.settings) == null ? void 0 : He.gptImageBackground)])
              }), (i == null ? void 0 : i.nodeId) === r.id && (i == null ? void 0 : i.type) === "huya_gpt25_bg" && c.jsx("div", {
                className: `node-dropdown-menu absolute bottom-full left-1/2 -translate-x-1/2 mb-1 rounded-lg shadow-xl p-1 z-[100] border ${n ? "bg-[#1f1f1f] border-zinc-700" : "bg-white border-zinc-200"}`,
                onMouseDown: _t => _t.stopPropagation(),
                children: c.jsx("div", {
                  className: "flex flex-col gap-0.5 min-w-[5rem]",
                  children: eMt.map(_t => {
                    var At;
                    return c.jsx("button", {
                      onClick: () => {
                        a(r.id, {
                          settings: {
                            ...(r.settings || {}),
                            gptImageBackground: _t
                          }
                        }), cl(s, {
                          gptImageBackground: _t
                        }), M(null);
                      },
                      className: `w-full px-2 py-1.5 rounded text-left text-xs transition-colors ${n ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-zinc-100 text-zinc-700"} ${dX((At = r.settings) == null ? void 0 : At.gptImageBackground) === _t ? n ? "bg-zinc-800" : "bg-zinc-100" : ""}`,
                      children: x($xe[_t])
                    }, _t);
                  })
                })
              })]
            }), r.type === "gen-image" && _Z(s) && c.jsxs("div", {
              className: "relative shrink-0 overflow-visible",
              "data-gen-dropdown-type": "huya_seedream_audit_bg",
              children: [c.jsx("button", {
                onClick: _t => {
                  _t.stopPropagation(), M((i == null ? void 0 : i.type) === "huya_seedream_audit_bg" && (i == null ? void 0 : i.nodeId) === r.id ? null : {
                    nodeId: r.id,
                    type: "huya_seedream_audit_bg"
                  });
                },
                onMouseDown: _t => _t.stopPropagation(),
                className: `node-dropdown-button flex items-center gap-1 px-2 py-1 rounded text-[10px] border whitespace-nowrap ${n ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
                title: x("背景（图生图；透明仅支持 1 张参考图）"),
                children: x(Wft[iX((Ve = r.settings) == null ? void 0 : Ve.seedreamBackground)])
              }), (i == null ? void 0 : i.nodeId) === r.id && (i == null ? void 0 : i.type) === "huya_seedream_audit_bg" && c.jsx("div", {
                className: `node-dropdown-menu absolute bottom-full left-1/2 -translate-x-1/2 mb-1 rounded-lg shadow-xl p-1 z-[100] border ${n ? "bg-[#1f1f1f] border-zinc-700" : "bg-white border-zinc-200"}`,
                onMouseDown: _t => _t.stopPropagation(),
                children: c.jsx("div", {
                  className: "flex flex-col gap-0.5 min-w-[5rem]",
                  children: $Nn.map(_t => {
                    var At;
                    return c.jsx("button", {
                      onClick: () => {
                        a(r.id, {
                          settings: {
                            ...(r.settings || {}),
                            seedreamBackground: _t
                          }
                        }), cl(s, {
                          seedreamBackground: _t
                        }), M(null);
                      },
                      className: `w-full px-2 py-1.5 rounded text-left text-xs transition-colors ${n ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-zinc-100 text-zinc-700"} ${iX((At = r.settings) == null ? void 0 : At.seedreamBackground) === _t ? n ? "bg-zinc-800" : "bg-zinc-100" : ""}`,
                      children: x(Wft[_t])
                    }, _t);
                  })
                })
              })]
            }), r.type === "gen-video" && (Ih(s) || R0(s)) && (() => {
              var St, hn, Qt;
              const _t = String(((St = r.settings) == null ? void 0 : St.seedanceOutputFormat) || "mp4").toLowerCase() === "mov" ? "mov" : "mp4",
                At = R0(s),
                Yt = !At && ((hn = r.settings) == null ? void 0 : hn.seedanceVolcIsUploadAsset) !== !1,
                qe = !At && !!((Qt = r.settings) != null && Qt.seedanceVolcMcpWebSearch),
                kt = `sketch-chat-web-chip${n ? " sketch-chat-web-chip--dark" : ""}`;
              return c.jsxs(c.Fragment, {
                children: [c.jsxs("div", {
                  className: "relative overflow-visible",
                  "data-gen-dropdown-type": "huya-seedance25-format",
                  children: [c.jsxs("button", {
                    onClick: Ot => {
                      Ot.stopPropagation(), M((i == null ? void 0 : i.type) === "huya-seedance25-format" && (i == null ? void 0 : i.nodeId) === r.id ? null : {
                        nodeId: r.id,
                        type: "huya-seedance25-format"
                      });
                    },
                    onMouseDown: Ot => Ot.stopPropagation(),
                    className: `node-dropdown-button flex items-center gap-1 px-2 py-1 rounded text-[10px] border ${n ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
                    title: At ? "output_format（mp4 / mov）" : x("output_format（海艺：mp4 / mov）"),
                    children: [c.jsx("span", {
                      children: _t
                    }), c.jsx(Mi, {
                      size: 10,
                      className: "opacity-60"
                    })]
                  }), (i == null ? void 0 : i.nodeId) === r.id && (i == null ? void 0 : i.type) === "huya-seedance25-format" && c.jsx("div", {
                    className: `node-dropdown-menu absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-20 rounded-lg shadow-xl p-1 z-[100] border ${n ? "bg-[#1f1f1f] border-zinc-700" : "bg-white border-zinc-200"}`,
                    onMouseDown: Ot => Ot.stopPropagation(),
                    children: ["mp4", "mov"].map(Ot => c.jsx("button", {
                      type: "button",
                      className: `w-full px-2 py-1.5 rounded text-left text-[10px] transition-colors ${_t === Ot ? n ? "bg-zinc-800 text-white" : "bg-zinc-100 text-gray-900" : n ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"}`,
                      onClick: () => {
                        a(r.id, {
                          settings: {
                            ...(r.settings || {}),
                            seedanceOutputFormat: Ot
                          }
                        }), cl(s, {
                          seedanceOutputFormat: Ot
                        }), M(null);
                      },
                      children: Ot
                    }, Ot))
                  })]
                }), !At && c.jsxs(c.Fragment, {
                  children: [c.jsxs("label", {
                    className: kt,
                    title: x("图生视频含真人脸时建议开启（isUploadAsset:true，走肖像审核）。参考图须 OSS 公网 https URL"),
                    onMouseDown: Ot => Ot.stopPropagation(),
                    onClick: Ot => Ot.stopPropagation(),
                    children: [c.jsx("input", {
                      type: "checkbox",
                      checked: Yt,
                      onChange: Ot => {
                        const ln = Ot.target.checked;
                        a(r.id, {
                          settings: {
                            ...(r.settings || {}),
                            seedanceVolcIsUploadAsset: ln
                          }
                        }), cl(s, {
                          seedanceVolcIsUploadAsset: ln
                        });
                      },
                      className: "h-3 w-3 cursor-pointer"
                    }), c.jsx("span", {
                      className: "whitespace-nowrap",
                      children: x("真人素材")
                    })]
                  }), c.jsxs("label", {
                    className: kt,
                    title: x("mcpList: web_search（海艺 Seedance 2.5 可选联网搜索）"),
                    onMouseDown: Ot => Ot.stopPropagation(),
                    onClick: Ot => Ot.stopPropagation(),
                    children: [c.jsx("input", {
                      type: "checkbox",
                      checked: qe,
                      onChange: Ot => {
                        const ln = Ot.target.checked;
                        a(r.id, {
                          settings: {
                            ...(r.settings || {}),
                            seedanceVolcMcpWebSearch: ln
                          }
                        }), cl(s, {
                          seedanceVolcMcpWebSearch: ln
                        });
                      },
                      className: "h-3 w-3 cursor-pointer"
                    }), c.jsx("span", {
                      className: "whitespace-nowrap",
                      children: x("联网")
                    })]
                  })]
                })]
              });
            })(), r.type === "gen-video" && (Db(s) || Lb(s) || Kv(s)) && (() => {
              var At;
              const _t = String(((At = r.settings) == null ? void 0 : At.seedanceBitrateMode) || "standard").toLowerCase() === "high" ? "high" : "standard";
              return c.jsxs("div", {
                className: "relative overflow-visible",
                "data-gen-dropdown-type": "seedance25-fal-bitrate",
                children: [c.jsxs("button", {
                  onClick: Yt => {
                    Yt.stopPropagation(), M((i == null ? void 0 : i.type) === "seedance25-fal-bitrate" && (i == null ? void 0 : i.nodeId) === r.id ? null : {
                      nodeId: r.id,
                      type: "seedance25-fal-bitrate"
                    });
                  },
                  onMouseDown: Yt => Yt.stopPropagation(),
                  className: `node-dropdown-button flex items-center gap-1 px-2 py-1 rounded text-[10px] border ${n ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
                  title: "bitrate_mode（standard / high）",
                  children: [c.jsx("span", {
                    children: x(_t === "high" ? "高码率" : "标准码率")
                  }), c.jsx(Mi, {
                    size: 10,
                    className: "opacity-60"
                  })]
                }), (i == null ? void 0 : i.nodeId) === r.id && (i == null ? void 0 : i.type) === "seedance25-fal-bitrate" && c.jsx("div", {
                  className: `node-dropdown-menu absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-24 rounded-lg shadow-xl p-1 z-[100] border ${n ? "bg-[#1f1f1f] border-zinc-700" : "bg-white border-zinc-200"}`,
                  onMouseDown: Yt => Yt.stopPropagation(),
                  children: [{
                    value: "standard",
                    label: "标准码率"
                  }, {
                    value: "high",
                    label: "高码率"
                  }].map(Yt => c.jsx("button", {
                    type: "button",
                    className: `w-full px-2 py-1.5 rounded text-left text-[10px] transition-colors ${_t === Yt.value ? n ? "bg-zinc-800 text-white" : "bg-zinc-100 text-gray-900" : n ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"}`,
                    onClick: () => {
                      a(r.id, {
                        settings: {
                          ...(r.settings || {}),
                          seedanceBitrateMode: Yt.value
                        }
                      }), cl(s, {
                        seedanceBitrateMode: Yt.value
                      }), M(null);
                    },
                    children: x(Yt.label)
                  }, Yt.value))
                })]
              });
            })(), (r.type === "gen-video" && I0(s) || r.type === "gen-image" && su(s)) && (() => {
              var Yt, qe;
              const _t = su(s) ? ((Yt = r.settings) == null ? void 0 : Yt.promptExtend) !== !1 : !!((qe = r.settings) != null && qe.promptExtend),
                At = `sketch-chat-web-chip${n ? " sketch-chat-web-chip--dark" : ""}`;
              return c.jsxs("label", {
                className: At,
                title: su(s) || D2(s) ? x("enable_prompt_expansion：关闭可节省时间，但可能降低质量") : x("parameters.promptExtend：开启后由模型扩展提示词"),
                onMouseDown: kt => kt.stopPropagation(),
                onClick: kt => kt.stopPropagation(),
                children: [c.jsx("input", {
                  type: "checkbox",
                  checked: _t,
                  onChange: kt => {
                    const St = kt.target.checked;
                    a(r.id, {
                      settings: {
                        ...(r.settings || {}),
                        promptExtend: St
                      }
                    }), cl(s, {
                      promptExtend: St
                    });
                  },
                  className: "h-3 w-3 cursor-pointer"
                }), c.jsx("span", {
                  className: "whitespace-nowrap",
                  children: x("智能扩写")
                })]
              });
            })(), r.type === "gen-video" && D2(s) && (() => {
              var Yt;
              const _t = !!((Yt = r.settings) != null && Yt.enableThinking),
                At = `sketch-chat-web-chip${n ? " sketch-chat-web-chip--dark" : ""}`;
              return c.jsxs("label", {
                className: At,
                title: x("enable_thinking：生成前增强推理"),
                onMouseDown: qe => qe.stopPropagation(),
                onClick: qe => qe.stopPropagation(),
                children: [c.jsx("input", {
                  type: "checkbox",
                  checked: _t,
                  onChange: qe => {
                    const kt = qe.target.checked;
                    a(r.id, {
                      settings: {
                        ...(r.settings || {}),
                        enableThinking: kt
                      }
                    }), cl(s, {
                      enableThinking: kt
                    });
                  },
                  className: "h-3 w-3 cursor-pointer"
                }), c.jsx("span", {
                  className: "whitespace-nowrap",
                  children: x("思考")
                })]
              });
            })(), r.type === "gen-video" && Yc(s) && pM(r.settings || {}) && c.jsx(aIo, {
              nodeId: r.id,
              isDark: n,
              settings: r.settings || {},
              currentModel: s,
              sourceImage: u(r.id, "default") || u(r.id, "veo_start") || u(r.id, "image"),
              activeDropdown: i,
              setActiveDropdown: M,
              updateNode: a
            }), r.type === "gen-video" && Yc(s) && !C5(r.settings || {}) && !p5(r.settings || {}) && (() => {
              var At;
              const _t = G9n((At = r.settings) == null ? void 0 : At.promptExpansionMode);
              return c.jsxs("div", {
                className: "relative",
                "data-gen-dropdown-type": "h3-max-fal-expansion",
                children: [c.jsx("button", {
                  type: "button",
                  onClick: Yt => {
                    Yt.stopPropagation(), M((i == null ? void 0 : i.type) === "h3-max-fal-expansion" && (i == null ? void 0 : i.nodeId) === r.id ? null : {
                      nodeId: r.id,
                      type: "h3-max-fal-expansion"
                    });
                  },
                  onMouseDown: Yt => Yt.stopPropagation(),
                  className: `node-dropdown-button flex items-center gap-1 px-2 py-1 rounded text-[10px] border ${n ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
                  title: x("prompt_expansion_mode：均衡约 1s 扩写，质量最多约 30s"),
                  children: x(_t === "quality" ? "扩写: 质量" : "扩写: 均衡")
                }), (i == null ? void 0 : i.nodeId) === r.id && (i == null ? void 0 : i.type) === "h3-max-fal-expansion" && c.jsx("div", {
                  className: `node-dropdown-menu absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-24 rounded-lg shadow-xl p-1 z-[100] border ${n ? "bg-[#1f1f1f] border-zinc-700" : "bg-white border-zinc-200"}`,
                  onMouseDown: Yt => Yt.stopPropagation(),
                  children: [{
                    value: "balanced",
                    label: "均衡"
                  }, {
                    value: "quality",
                    label: "质量"
                  }].map(Yt => c.jsx("button", {
                    type: "button",
                    onClick: () => {
                      a(r.id, {
                        settings: {
                          ...(r.settings || {}),
                          promptExpansionMode: Yt.value
                        }
                      }), cl(s, {
                        promptExpansionMode: Yt.value
                      }), M(null);
                    },
                    className: `w-full text-center py-1 text-[10px] rounded ${n ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"} ${_t === Yt.value ? n ? "bg-zinc-800" : "bg-zinc-100" : ""}`,
                    children: x(Yt.label)
                  }, Yt.value))
                })]
              });
            })(), r.type === "gen-video" && Yc(s) && p5(r.settings || {}) && c.jsxs("label", {
              className: `flex items-center gap-1 px-1.5 py-1 rounded text-[10px] cursor-pointer select-none ${n ? "text-zinc-300" : "text-zinc-700"}`,
              title: x("转写音频以引导口型同步；关闭则只跟音频波形对口型"),
              onMouseDown: _t => _t.stopPropagation(),
              children: [c.jsx("input", {
                type: "checkbox",
                checked: O9n(r.settings || {}),
                onChange: _t => {
                  const At = _t.target.checked;
                  a(r.id, {
                    settings: {
                      ...(r.settings || {}),
                      h3MaxFalLipSyncTranscription: At
                    }
                  }), cl(s, {
                    h3MaxFalLipSyncTranscription: At
                  });
                },
                className: "h-3 w-3 cursor-pointer"
              }), c.jsx("span", {
                className: "whitespace-nowrap",
                children: x("转写引导")
              })]
            }), r.type === "gen-video" && q && c.jsx("button", {
              type: "button",
              className: `node-dropdown-button flex items-center gap-1 px-2 py-1 rounded text-[10px] border ${n ? "bg-red-500/15 hover:bg-red-500/25 text-red-200 border-red-400/40" : "bg-red-50 hover:bg-red-100 text-red-700 border-red-300"}`,
              title: x("结束导演会话"),
              onMouseDown: _t => _t.stopPropagation(),
              onClick: _t => {
                _t.stopPropagation(), c0r(r.id).then(() => {
                  a(r.id, {
                    isGenerating: !1,
                    settings: {
                      ...(r.settings || {}),
                      isGenerating: !1,
                      progress: 0
                    }
                  });
                });
              },
              children: x("结束导演")
            }), r.type === "gen-video" && Ip(s) && (() => {
              var kt, St, hn;
              const _t = !!((kt = r.settings) != null && kt.seedanceVolcIsUploadAsset),
                At = !!((St = r.settings) != null && St.seedanceVolcNsfw),
                Yt = !!((hn = r.settings) != null && hn.seedanceVolcMcpWebSearch),
                qe = Y5e(s);
              return c.jsxs(c.Fragment, {
                children: [c.jsxs("label", {
                  className: `sketch-chat-web-chip${n ? " sketch-chat-web-chip--dark" : ""}`,
                  title: x("parameters.nsfw：开启后允许 NSFW 内容（费用增加）"),
                  onMouseDown: Qt => Qt.stopPropagation(),
                  onClick: Qt => Qt.stopPropagation(),
                  children: [c.jsx("input", {
                    type: "checkbox",
                    checked: At,
                    onChange: Qt => {
                      const Ot = Qt.target.checked;
                      a(r.id, {
                        settings: {
                          ...(r.settings || {}),
                          seedanceVolcNsfw: Ot
                        }
                      }), cl(s, {
                        seedanceVolcNsfw: Ot
                      });
                    },
                    className: "h-3 w-3 cursor-pointer"
                  }), c.jsx("span", {
                    className: "whitespace-nowrap",
                    children: "NSFW"
                  })]
                }), c.jsxs("label", {
                  className: `sketch-chat-web-chip${n ? " sketch-chat-web-chip--dark" : ""}`,
                  title: x("图生视频含真人脸时建议开启（isUploadAsset:true，走肖像审核）。参考图仍须 OSS 公网 https URL，审核需额外等待"),
                  onMouseDown: Qt => Qt.stopPropagation(),
                  onClick: Qt => Qt.stopPropagation(),
                  children: [c.jsx("input", {
                    type: "checkbox",
                    checked: _t,
                    onChange: Qt => {
                      const Ot = Qt.target.checked;
                      a(r.id, {
                        settings: {
                          ...(r.settings || {}),
                          seedanceVolcIsUploadAsset: Ot
                        }
                      }), cl(s, {
                        seedanceVolcIsUploadAsset: Ot
                      });
                    },
                    className: "h-3 w-3 cursor-pointer"
                  }), c.jsx("span", {
                    className: "whitespace-nowrap",
                    children: x("真人素材")
                  })]
                }), c.jsxs("label", {
                  className: `sketch-chat-web-chip${n ? " sketch-chat-web-chip--dark" : ""}`,
                  title: x(qe ? "mcpList: web_search（Pro 文生/图生均支持）" : "mcpList: web_search（Fast 仅图生视频生效；文生不发此字段）"),
                  onMouseDown: Qt => Qt.stopPropagation(),
                  onClick: Qt => Qt.stopPropagation(),
                  children: [c.jsx("input", {
                    type: "checkbox",
                    checked: Yt,
                    onChange: Qt => {
                      const Ot = Qt.target.checked;
                      a(r.id, {
                        settings: {
                          ...(r.settings || {}),
                          seedanceVolcMcpWebSearch: Ot
                        }
                      }), cl(s, {
                        seedanceVolcMcpWebSearch: Ot
                      });
                    },
                    className: "h-3 w-3 cursor-pointer"
                  }), c.jsx("span", {
                    className: "whitespace-nowrap",
                    children: x("联网")
                  })]
                })]
              });
            })(), r.type === "gen-video" && CT(s) && (() => {
              var At;
              const _t = !!((At = r.settings) != null && At.seedanceVolcCameraFixed);
              return c.jsxs("div", {
                className: "relative overflow-visible",
                "data-gen-dropdown-type": "huya-seedance1510-camera",
                children: [c.jsx("button", {
                  onClick: Yt => {
                    Yt.stopPropagation(), M((i == null ? void 0 : i.type) === "huya-seedance1510-camera" && (i == null ? void 0 : i.nodeId) === r.id ? null : {
                      nodeId: r.id,
                      type: "huya-seedance1510-camera"
                    });
                  },
                  onMouseDown: Yt => Yt.stopPropagation(),
                  className: `node-dropdown-button flex items-center gap-1 px-2 py-1 rounded text-[10px] border ${n ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
                  title: "camera_fixed",
                  children: x(_t ? "固定镜头" : "自由镜头")
                }), (i == null ? void 0 : i.nodeId) === r.id && (i == null ? void 0 : i.type) === "huya-seedance1510-camera" && c.jsx("div", {
                  className: `node-dropdown-menu absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-24 rounded-lg shadow-xl p-1 z-[100] border ${n ? "bg-[#1f1f1f] border-zinc-700" : "bg-white border-zinc-200"}`,
                  onMouseDown: Yt => Yt.stopPropagation(),
                  children: [{
                    value: !0,
                    label: "固定镜头"
                  }, {
                    value: !1,
                    label: "自由镜头"
                  }].map(Yt => c.jsx("button", {
                    onClick: () => {
                      a(r.id, {
                        settings: {
                          ...(r.settings || {}),
                          seedanceVolcCameraFixed: Yt.value
                        }
                      }), cl(s, {
                        seedanceVolcCameraFixed: Yt.value
                      }), M(null);
                    },
                    className: `w-full text-center py-1 text-[10px] rounded ${n ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"} ${_t === Yt.value ? n ? "bg-zinc-800" : "bg-zinc-100" : ""}`,
                    children: x(Yt.label)
                  }, String(Yt.value)))
                })]
              });
            })(), r.type === "gen-video" && Ejn(s) && (() => {
              var Yt, qe, kt, St;
              const _t = ((Yt = r.settings) == null ? void 0 : Yt.duration) || "10s",
                At = s === ihe || _t === "10s" || _t === "15s";
              return c.jsxs("label", {
                className: `flex items-center gap-1 px-2 py-1 rounded text-[10px] border transition-colors ${At ? "cursor-pointer" : "cursor-not-allowed opacity-50"} ${n ? (qe = r.settings) != null && qe.isHD && At ? "bg-blue-600/30 border-blue-500 text-blue-300" : "bg-transparent hover:bg-white/5 text-white border-white/30" : (kt = r.settings) != null && kt.isHD && At ? "bg-blue-500/30 border-blue-400 text-blue-700" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
                onClick: hn => hn.stopPropagation(),
                title: x(At ? "HD模式" : "HD仅支持10s和15s时长"),
                children: [c.jsx("input", {
                  type: "checkbox",
                  checked: !!((St = r.settings) != null && St.isHD) && At,
                  disabled: !At,
                  onChange: hn => {
                    hn.stopPropagation(), At && a(r.id, {
                      settings: {
                        ...r.settings,
                        isHD: hn.target.checked
                      }
                    });
                  },
                  className: "w-3 h-3 cursor-pointer disabled:cursor-not-allowed",
                  onMouseDown: hn => hn.stopPropagation()
                }), c.jsx("span", {
                  children: "HD"
                })]
              });
            })(), r.type === "gen-video" ? c.jsx("div", {
              className: "shrink-0",
              onMouseDown: _t => _t.stopPropagation(),
              children: c.jsx(uvn, {
                node: r,
                isDark: n,
                isGenNodeToolbarCompact: he,
                genUseAliyunOss: z,
                globalOssUploadEnabled: L,
                ossConfigured: D,
                mediaHostingProvider: U,
                getLatestSettings: O,
                onGenUseAliyunOssChange: V,
                updateNode: a
              })
            }) : null, r.type === "gen-video" && we && (() => {
              var qe, kt;
              const _t = ((qe = r.settings) == null ? void 0 : qe.wan26AudioConfig) || "none",
                At = ((kt = r.settings) == null ? void 0 : kt.wan26AudioFile) || null,
                Yt = async St => {
                  var Qt;
                  const hn = (Qt = St.target.files) == null ? void 0 : Qt[0];
                  if (hn) {
                    console.log("[Wan 2.6] 音频文件选择:", hn.name, hn.size, hn.type);
                    try {
                      T(hn), P(!0), F(""), console.log("[Wan 2.6] 设置状态完成:", {
                        pendingAudioFile: hn.name,
                        showAudioSegmentSelector: !0
                      });
                    } catch (Ot) {
                      console.error("[Wan 2.6] 音频文件处理错误:", Ot), F("无法读取音频文件"), T(null), P(!1), G.current && (G.current.value = "");
                    }
                  }
                };
              return c.jsxs(c.Fragment, {
                children: [c.jsxs("div", {
                  className: "relative overflow-visible",
                  "data-gen-dropdown-type": "wan26-audio",
                  children: [c.jsx("button", {
                    onClick: St => {
                      St.stopPropagation(), M((i == null ? void 0 : i.type) === "wan26-audio" && (i == null ? void 0 : i.nodeId) === r.id ? null : {
                        nodeId: r.id,
                        type: "wan26-audio"
                      });
                    },
                    onMouseDown: St => St.stopPropagation(),
                    className: `node-dropdown-button flex items-center gap-1 px-2 py-1 rounded text-[10px] border ${n ? _t !== "none" ? "bg-purple-600/30 border-purple-500 text-purple-300" : "bg-transparent hover:bg-white/5 text-white border-white/30" : _t !== "none" ? "bg-purple-500/30 border-purple-400 text-purple-700" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
                    title: _t === "none" ? x("无音频") : _t === "auto" ? x("自动配乐") : At ? At.name : x("上传音频"),
                    children: x(_t === "none" ? "无音频" : _t === "auto" ? "自动配乐" : At ? "音频✓" : "音频")
                  }), (i == null ? void 0 : i.nodeId) === r.id && (i == null ? void 0 : i.type) === "wan26-audio" && c.jsx("div", {
                    className: `node-dropdown-menu absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-28 rounded-lg shadow-xl p-1 z-[100] border ${n ? "bg-[#1f1f1f] border-zinc-700" : "bg-white border-zinc-200"}`,
                    onMouseDown: St => St.stopPropagation(),
                    children: [{
                      value: "none",
                      label: "无音频"
                    }, {
                      value: "auto",
                      label: "自动配乐"
                    }, {
                      value: "upload",
                      label: "上传音频"
                    }].map(St => c.jsx("button", {
                      onClick: () => {
                        a(r.id, {
                          settings: {
                            ...r.settings,
                            wan26AudioConfig: St.value,
                            ...(St.value !== "upload" ? {
                              wan26AudioFile: null,
                              wan26AudioSegment: null
                            } : {})
                          }
                        }), M(null), St.value === "upload" && setTimeout(() => {
                          var hn;
                          (hn = G.current) == null || hn.click();
                        }, 100);
                      },
                      className: `w-full text-center py-1 text-[10px] rounded ${n ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"} ${_t === St.value ? n ? "bg-zinc-800" : "bg-zinc-100" : ""}`,
                      children: x(St.label)
                    }, St.value))
                  })]
                }), c.jsx("input", {
                  ref: G,
                  type: "file",
                  accept: "audio/*,.mp3,.wav,.m4a,.aac,.ogg,.flac",
                  onChange: Yt,
                  className: "hidden"
                })]
              });
            })(), r.type === "gen-video" && we && c.jsxs("label", {
              className: `flex items-center gap-1 px-2 py-1 rounded text-[10px] border cursor-pointer transition-colors ${n ? (it = r.settings) != null && it.wan26MultiShot ? "bg-purple-600/30 border-purple-500 text-purple-300" : "bg-transparent hover:bg-white/5 text-white border-white/30" : (It = r.settings) != null && It.wan26MultiShot ? "bg-purple-500/30 border-purple-400 text-purple-700" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
              onClick: _t => _t.stopPropagation(),
              title: x("多镜头叙事：生成包含多个镜头的视频"),
              children: [c.jsx("input", {
                type: "checkbox",
                checked: !!((Ft = r.settings) != null && Ft.wan26MultiShot),
                onChange: _t => {
                  _t.stopPropagation(), a(r.id, {
                    settings: {
                      ...r.settings,
                      wan26MultiShot: _t.target.checked
                    }
                  });
                },
                className: "w-3 h-3 cursor-pointer",
                onMouseDown: _t => _t.stopPropagation()
              }), c.jsx("span", {
                children: x("多镜头")
              })]
            }), r.type === "gen-video" && eBe(s) && !Z && (() => {
              var kt;
              const _t = !!u(r.id, "veo_start"),
                At = !!u(r.id, "veo_end"),
                Yt = _t || At;
              return ((kt = r.settings) == null ? void 0 : kt.veoFramesMode) && Yt ? c.jsx("div", {
                className: "relative",
                children: c.jsx("button", {
                  disabled: !0,
                  className: `flex items-center gap-1 px-2 py-1 rounded text-[10px] border cursor-not-allowed opacity-60 ${n ? "bg-zinc-800/50 text-zinc-400 border-zinc-700/50" : "bg-zinc-100 text-zinc-600 border-zinc-300"}`,
                  title: x("首尾帧模式下强制使用 pro (高表现) 模式"),
                  children: x("pro (高表现)")
                })
              }) : c.jsxs("div", {
                className: "relative overflow-visible",
                "data-gen-dropdown-type": "kling-v25-res",
                children: [c.jsx("button", {
                  onClick: St => {
                    St.stopPropagation(), M((i == null ? void 0 : i.type) === "kling-v25-res" && (i == null ? void 0 : i.nodeId) === r.id ? null : {
                      nodeId: r.id,
                      type: "kling-v25-res"
                    });
                  },
                  onMouseDown: St => St.stopPropagation(),
                  className: `node-dropdown-button flex items-center gap-1 px-2 py-1 rounded text-[10px] border ${n ? "bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 border-zinc-700/50" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600 border-zinc-300"}`,
                  title: x("Kling v2.5 Turbo 分辨率"),
                  children: (() => {
                    var hn;
                    return (((hn = r.settings) == null ? void 0 : hn.klingV25Resolution) || "std") === "std" ? "std (高性能)" : "pro (高表现)";
                  })()
                }), (i == null ? void 0 : i.nodeId) === r.id && (i == null ? void 0 : i.type) === "kling-v25-res" && c.jsx("div", {
                  className: `node-dropdown-menu absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-32 rounded-lg shadow-xl p-1 z-[100] border ${n ? "bg-[#1f1f1f] border-zinc-700" : "bg-white border-zinc-200"}`,
                  onMouseDown: St => St.stopPropagation(),
                  children: [{
                    value: "std",
                    label: "std (高性能)"
                  }, {
                    value: "pro",
                    label: "pro (高表现)"
                  }].map(St => {
                    var hn, Qt;
                    return c.jsx("button", {
                      onClick: () => {
                        a(r.id, {
                          settings: {
                            ...(r.settings || {}),
                            klingV25Resolution: St.value
                          }
                        }), M(null);
                      },
                      className: `w-full text-center py-1 text-[10px] rounded ${n ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"} ${((hn = r.settings) == null ? void 0 : hn.klingV25Resolution) === St.value || !((Qt = r.settings) != null && Qt.klingV25Resolution) && St.value === "std" ? n ? "bg-zinc-800" : "bg-zinc-100" : ""}`,
                      children: x(St.label)
                    }, St.value);
                  })
                })]
              });
            })(), r.type === "gen-video" && tBe(s) && (() => {
              var kt, St, hn, Qt;
              if (re) return c.jsxs("div", {
                className: "relative",
                "data-gen-dropdown-type": "kling-v26-fal-sound",
                children: [c.jsx("button", {
                  type: "button",
                  onClick: Ot => {
                    Ot.stopPropagation(), M((i == null ? void 0 : i.type) === "kling-v26-fal-sound" && (i == null ? void 0 : i.nodeId) === r.id ? null : {
                      nodeId: r.id,
                      type: "kling-v26-fal-sound"
                    });
                  },
                  onMouseDown: Ot => Ot.stopPropagation(),
                  className: `node-dropdown-button flex items-center gap-1 px-2 py-1 rounded text-[10px] border ${n ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
                  title: x("原生音频（Fal generate_audio）"),
                  children: (((kt = r.settings) == null ? void 0 : kt.klingV26Sound) || "off") === "on" ? x("声音 on") : x("声音 off")
                }), (i == null ? void 0 : i.nodeId) === r.id && (i == null ? void 0 : i.type) === "kling-v26-fal-sound" && c.jsx("div", {
                  className: `node-dropdown-menu absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-24 rounded-lg shadow-xl p-1 z-[100] border ${n ? "bg-[#1f1f1f] border-zinc-700" : "bg-white border-zinc-200"}`,
                  onMouseDown: Ot => Ot.stopPropagation(),
                  children: [{
                    value: "on",
                    label: "on"
                  }, {
                    value: "off",
                    label: "off"
                  }].map(Ot => c.jsx("button", {
                    type: "button",
                    onClick: () => {
                      a(r.id, {
                        settings: {
                          ...(r.settings || {}),
                          klingV26Sound: Ot.value
                        }
                      }), M(null);
                    },
                    className: `w-full text-center py-1 text-[10px] rounded ${n ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"}`,
                    children: x(Ot.label)
                  }, Ot.value))
                })]
              });
              const _t = !!u(r.id, "veo_start"),
                At = !!u(r.id, "veo_end"),
                Yt = _t || At,
                qe = ((St = r.settings) == null ? void 0 : St.veoFramesMode) && Yt;
              return c.jsxs(c.Fragment, {
                children: [c.jsx("div", {
                  className: "relative",
                  "data-gen-dropdown-type": "kling-v26-res",
                  children: qe ? c.jsx("button", {
                    disabled: !0,
                    className: `flex items-center gap-1 px-2 py-1 rounded text-[10px] border cursor-not-allowed opacity-60 ${n ? "bg-transparent text-white/50 border-white/20" : "bg-transparent text-gray-500 border-gray-200"}`,
                    title: x("首尾帧模式下强制使用 pro (高表现)"),
                    children: x("pro (高表现)")
                  }) : c.jsxs(c.Fragment, {
                    children: [c.jsx("button", {
                      onClick: Ot => {
                        Ot.stopPropagation(), M((i == null ? void 0 : i.type) === "kling-v26-res" && (i == null ? void 0 : i.nodeId) === r.id ? null : {
                          nodeId: r.id,
                          type: "kling-v26-res"
                        });
                      },
                      onMouseDown: Ot => Ot.stopPropagation(),
                      className: `node-dropdown-button flex items-center gap-1 px-2 py-1 rounded text-[10px] border ${n ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
                      title: x("Kling v2.6 模式"),
                      children: (((hn = r.settings) == null ? void 0 : hn.klingV26Resolution) || "std") === "std" ? x("std (高性能)") : x("pro (高表现)")
                    }), (i == null ? void 0 : i.nodeId) === r.id && (i == null ? void 0 : i.type) === "kling-v26-res" && c.jsx("div", {
                      className: `node-dropdown-menu absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-32 rounded-lg shadow-xl p-1 z-[100] border ${n ? "bg-[#1f1f1f] border-zinc-700" : "bg-white border-zinc-200"}`,
                      onMouseDown: Ot => Ot.stopPropagation(),
                      children: [{
                        value: "std",
                        label: "std (高性能)"
                      }, {
                        value: "pro",
                        label: "pro (高表现)"
                      }].map(Ot => {
                        var ln;
                        return c.jsx("button", {
                          onClick: () => {
                            a(r.id, {
                              settings: {
                                ...(r.settings || {}),
                                klingV26Resolution: Ot.value
                              }
                            }), M(null);
                          },
                          className: `w-full text-center py-1 text-[10px] rounded ${n ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"} ${(((ln = r.settings) == null ? void 0 : ln.klingV26Resolution) || "std") === Ot.value ? n ? "bg-zinc-800" : "bg-zinc-100" : ""}`,
                          children: x(Ot.label)
                        }, Ot.value);
                      })
                    })]
                  })
                }), c.jsxs("div", {
                  className: "relative",
                  "data-gen-dropdown-type": "kling-v26-sound",
                  children: [c.jsx("button", {
                    onClick: Ot => {
                      Ot.stopPropagation(), M((i == null ? void 0 : i.type) === "kling-v26-sound" && (i == null ? void 0 : i.nodeId) === r.id ? null : {
                        nodeId: r.id,
                        type: "kling-v26-sound"
                      });
                    },
                    onMouseDown: Ot => Ot.stopPropagation(),
                    className: `node-dropdown-button flex items-center gap-1 px-2 py-1 rounded text-[10px] border ${n ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
                    title: x("是否生成声音"),
                    children: (((Qt = r.settings) == null ? void 0 : Qt.klingV26Sound) || "off") === "on" ? x("声音 on") : x("声音 off")
                  }), (i == null ? void 0 : i.nodeId) === r.id && (i == null ? void 0 : i.type) === "kling-v26-sound" && c.jsx("div", {
                    className: `node-dropdown-menu absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-24 rounded-lg shadow-xl p-1 z-[100] border ${n ? "bg-[#1f1f1f] border-zinc-700" : "bg-white border-zinc-200"}`,
                    onMouseDown: Ot => Ot.stopPropagation(),
                    children: [{
                      value: "on",
                      label: "on"
                    }, {
                      value: "off",
                      label: "off"
                    }].map(Ot => {
                      var ln;
                      return c.jsx("button", {
                        onClick: () => {
                          a(r.id, {
                            settings: {
                              ...(r.settings || {}),
                              klingV26Sound: Ot.value
                            }
                          }), M(null);
                        },
                        className: `w-full text-center py-1 text-[10px] rounded ${n ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"} ${(((ln = r.settings) == null ? void 0 : ln.klingV26Sound) || "off") === Ot.value ? n ? "bg-zinc-800" : "bg-zinc-100" : ""}`,
                        children: x(Ot.label)
                      }, Ot.value);
                    })
                  })]
                })]
              });
            })(), r.type === "gen-video" && Jqe(s) && (() => {
              var At;
              const _t = fe ? "kling-v3-fal-sound" : "kling-v3-sound";
              return c.jsx(c.Fragment, {
                children: c.jsxs("div", {
                  className: "relative",
                  "data-gen-dropdown-type": _t,
                  children: [c.jsx("button", {
                    type: "button",
                    onClick: Yt => {
                      Yt.stopPropagation(), M((i == null ? void 0 : i.type) === _t && (i == null ? void 0 : i.nodeId) === r.id ? null : {
                        nodeId: r.id,
                        type: _t
                      });
                    },
                    onMouseDown: Yt => Yt.stopPropagation(),
                    className: `node-dropdown-button flex items-center gap-1 px-2 py-1 rounded text-[10px] border ${n ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
                    title: x(fe ? "原生音频（Fal generate_audio）" : "音画同步（默认开声音）"),
                    children: (((At = r.settings) == null ? void 0 : At.klingV3Sound) ?? "on") === "on" ? x("声音 on") : x("声音 off")
                  }), (i == null ? void 0 : i.nodeId) === r.id && (i == null ? void 0 : i.type) === _t && c.jsx("div", {
                    className: `node-dropdown-menu absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-24 rounded-lg shadow-xl p-1 z-[100] border ${n ? "bg-[#1f1f1f] border-zinc-700" : "bg-white border-zinc-200"}`,
                    onMouseDown: Yt => Yt.stopPropagation(),
                    children: [{
                      value: "on",
                      label: "on"
                    }, {
                      value: "off",
                      label: "off"
                    }].map(Yt => {
                      var qe;
                      return c.jsx("button", {
                        onClick: () => {
                          a(r.id, {
                            settings: {
                              ...(r.settings || {}),
                              klingV3Sound: Yt.value
                            }
                          }), M(null);
                        },
                        className: `w-full text-center py-1 text-[10px] rounded ${n ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"} ${(((qe = r.settings) == null ? void 0 : qe.klingV3Sound) ?? "on") === Yt.value ? n ? "bg-zinc-800" : "bg-zinc-100" : ""}`,
                        children: x(Yt.label)
                      }, Yt.value);
                    })
                  })]
                })
              });
            })(), r.type === "gen-video" && ye && (() => {
              var Yt, qe, kt;
              const _t = !!((Yt = r.settings) != null && Yt.klingVideoUrl || (qe = r.settings) != null && qe.klingVideoFile),
                At = _t ? "off" : ((kt = r.settings) == null ? void 0 : kt.klingV3Sound) ?? "on";
              return c.jsx(c.Fragment, {
                children: c.jsxs("div", {
                  className: "relative",
                  "data-gen-dropdown-type": "kling-v3-omni-sound",
                  children: [c.jsx("button", {
                    type: "button",
                    disabled: _t,
                    onClick: St => {
                      _t || (St.stopPropagation(), M((i == null ? void 0 : i.type) === "kling-v3-omni-sound" && (i == null ? void 0 : i.nodeId) === r.id ? null : {
                        nodeId: r.id,
                        type: "kling-v3-omni-sound"
                      }));
                    },
                    onMouseDown: St => St.stopPropagation(),
                    className: `node-dropdown-button flex items-center gap-1 px-2 py-1 rounded text-[10px] border ${_t ? "cursor-not-allowed opacity-60 " : ""}${n ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
                    title: x(_t ? "有参考视频时 sound 只能为 off" : "是否生成声音"),
                    children: x(At === "on" ? "声音 on" : "声音 off")
                  }), !_t && (i == null ? void 0 : i.nodeId) === r.id && (i == null ? void 0 : i.type) === "kling-v3-omni-sound" && c.jsx("div", {
                    className: `node-dropdown-menu absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-24 rounded-lg shadow-xl p-1 z-[100] border ${n ? "bg-[#1f1f1f] border-zinc-700" : "bg-white border-zinc-200"}`,
                    onMouseDown: St => St.stopPropagation(),
                    children: [{
                      value: "on",
                      label: "on"
                    }, {
                      value: "off",
                      label: "off"
                    }].map(St => {
                      var hn;
                      return c.jsx("button", {
                        onClick: () => {
                          a(r.id, {
                            settings: {
                              ...(r.settings || {}),
                              klingV3Sound: St.value
                            }
                          }), M(null);
                        },
                        className: `w-full text-center py-1 text-[10px] rounded ${n ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"} ${(((hn = r.settings) == null ? void 0 : hn.klingV3Sound) ?? "on") === St.value ? n ? "bg-zinc-800" : "bg-zinc-100" : ""}`,
                        children: x(St.label)
                      }, St.value);
                    })
                  })]
                })
              });
            })(), r.type === "gen-video" && Gp(s) && (() => {
              var Qt;
              const _t = HY(r.settings || {}),
                At = QHr(_t),
                Yt = KHr(_t, s);
              if (!At && !Yt) return null;
              const qe = At ? OOe : LOe,
                kt = At,
                St = String(((Qt = r.settings) == null ? void 0 : Qt[qe]) || "") || (kt ? "on" : "off"),
                hn = At ? "kling-native-4k-keep-audio" : "kling-native-4k-sound";
              return c.jsxs("div", {
                className: "relative",
                "data-gen-dropdown-type": hn,
                children: [c.jsx("button", {
                  type: "button",
                  onClick: Ot => {
                    Ot.stopPropagation(), M((i == null ? void 0 : i.type) === hn && (i == null ? void 0 : i.nodeId) === r.id ? null : {
                      nodeId: r.id,
                      type: hn
                    });
                  },
                  onMouseDown: Ot => Ot.stopPropagation(),
                  className: `node-dropdown-button flex items-center gap-1 px-2 py-1 rounded text-[10px] border ${n ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
                  title: x(At ? "是否保留参考视频原声" : "是否生成原生音频"),
                  children: x(At ? St === "on" ? "保留原声" : "去掉原声" : St === "on" ? "声音 on" : "声音 off")
                }), (i == null ? void 0 : i.nodeId) === r.id && (i == null ? void 0 : i.type) === hn && c.jsx("div", {
                  className: `node-dropdown-menu absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-24 rounded-lg shadow-xl p-1 z-[100] border ${n ? "bg-[#1f1f1f] border-zinc-700" : "bg-white border-zinc-200"}`,
                  onMouseDown: Ot => Ot.stopPropagation(),
                  children: [{
                    value: "on",
                    label: "on"
                  }, {
                    value: "off",
                    label: "off"
                  }].map(Ot => c.jsx("button", {
                    onClick: () => {
                      a(r.id, {
                        settings: {
                          ...(r.settings || {}),
                          [qe]: Ot.value
                        }
                      }), M(null);
                    },
                    className: `w-full text-center py-1 text-[10px] rounded ${n ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"} ${St === Ot.value ? n ? "bg-zinc-800" : "bg-zinc-100" : ""}`,
                    children: x(Ot.label)
                  }, Ot.value))
                })]
              });
            })(), r.type === "gen-video" && Fm(s) && (() => {
              var qe;
              const _t = Fxe(r.settings || {});
              if (!gWr(_t)) return null;
              const At = String(((qe = r.settings) == null ? void 0 : qe[Bxe]) || "") || "auto",
                Yt = "happy-horse-audio";
              return c.jsxs("div", {
                className: "relative",
                "data-gen-dropdown-type": Yt,
                children: [c.jsx("button", {
                  type: "button",
                  onClick: kt => {
                    kt.stopPropagation(), M((i == null ? void 0 : i.type) === Yt && (i == null ? void 0 : i.nodeId) === r.id ? null : {
                      nodeId: r.id,
                      type: Yt
                    });
                  },
                  onMouseDown: kt => kt.stopPropagation(),
                  className: `node-dropdown-button flex items-center gap-1 px-2 py-1 rounded text-[10px] border ${n ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
                  title: x("音频处理：智能配音由模型决定是否重配；保留原声沿用源视频音轨"),
                  children: x(At === "origin" ? "保留原声" : "智能配音")
                }), (i == null ? void 0 : i.nodeId) === r.id && (i == null ? void 0 : i.type) === Yt && c.jsx("div", {
                  className: `node-dropdown-menu absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-28 rounded-lg shadow-xl p-1 z-[100] border ${n ? "bg-[#1f1f1f] border-zinc-700" : "bg-white border-zinc-200"}`,
                  onMouseDown: kt => kt.stopPropagation(),
                  children: [{
                    value: "auto",
                    label: "智能配音"
                  }, {
                    value: "origin",
                    label: "保留原声"
                  }].map(kt => c.jsx("button", {
                    onClick: () => {
                      a(r.id, {
                        settings: {
                          ...(r.settings || {}),
                          [Bxe]: kt.value
                        }
                      }), M(null);
                    },
                    className: `w-full text-center py-1 text-[10px] rounded ${n ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"} ${At === kt.value ? n ? "bg-zinc-800" : "bg-zinc-100" : ""}`,
                    children: x(kt.label)
                  }, kt.value))
                })]
              });
            })(), r.type === "gen-video" && Pjn(s) && c.jsxs("label", {
              className: `sketch-chat-web-chip${n ? " sketch-chat-web-chip--dark" : ""}`,
              title: (We = r.settings) != null && We.klingV3MultiShot ? x("智能分镜已开启：AI 将按描述自动拆多镜头（再点关闭）") : x("开启智能分镜：AI 将根据提示词自动生成多镜头"),
              onMouseDown: _t => _t.stopPropagation(),
              onClick: _t => _t.stopPropagation(),
              children: [c.jsx("input", {
                type: "checkbox",
                checked: !!((Ze = r.settings) != null && Ze.klingV3MultiShot),
                onChange: _t => {
                  var Yt;
                  const At = _t.target.checked;
                  a(r.id, {
                    settings: {
                      ...(r.settings || {}),
                      klingV3MultiShot: At,
                      klingV3ShotType: ((Yt = r.settings) == null ? void 0 : Yt.klingV3ShotType) || "intelligence"
                    }
                  });
                },
                className: "h-3 w-3 cursor-pointer"
              }), c.jsx("span", {
                className: "whitespace-nowrap",
                children: x("智能分镜")
              })]
            }), r.type === "gen-video" && sIe(s) && c.jsxs("button", {
              onClick: _t => {
                _t.stopPropagation(), j(!0);
              },
              className: `flex items-center gap-1 px-2 py-1 rounded text-[10px] border transition-colors ${(((Ge = r.settings) == null ? void 0 : Ge.klingSubjects) || []).length > 0 ? n ? "bg-transparent border-white/50 text-white" : "bg-cyan-500/30 border-cyan-400 text-cyan-700" : n ? "bg-transparent border-white/30 hover:bg-white/5 text-white" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600 border-zinc-300"}`,
              title: (((Oe = r.settings) == null ? void 0 : Oe.klingSubjects) || []).length > 0 ? x("已选择 {0} 个主体", (((st = r.settings) == null ? void 0 : st.klingSubjects) || []).length) : x("参考主体列表"),
              children: [c.jsx(Kh, {
                size: 12
              }), c.jsx("span", {
                children: (((vt = r.settings) == null ? void 0 : vt.klingSubjects) || []).length > 0 ? `${(((Ht = r.settings) == null ? void 0 : Ht.klingSubjects) || []).length}` : x("主体")
              })]
            }), r.type === "gen-video" && (X || L2(s)) && (() => {
              var At;
              const _t = ((At = r.settings) == null ? void 0 : At.klingVideoFile) || null;
              return c.jsxs("button", {
                onClick: Yt => {
                  Yt.stopPropagation(), B(!0);
                },
                className: `flex items-center gap-1 px-2 py-1 rounded text-[10px] border transition-colors ${_t ? n ? "bg-transparent border-white/50 text-white" : "bg-emerald-500/30 border-emerald-400 text-emerald-700" : n ? "bg-transparent border-white/30 hover:bg-white/5 text-white" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600 border-zinc-300"}`,
                title: _t ? _t.name : x("上传视频"),
                children: [c.jsx(Oo, {
                  size: 12
                }), c.jsx("span", {
                  children: x(_t ? "视频✓" : "视频")
                })]
              });
            })(), r.type === "gen-video" && (X || L2(s)) && c.jsxs("button", {
              onClick: _t => {
                _t.stopPropagation(), R(!0);
              },
              className: `flex items-center gap-1 px-2 py-1 rounded text-[10px] border transition-colors ${(((nn = r.settings) == null ? void 0 : nn.klingImages) || []).length > 0 ? n ? "bg-transparent border-white/50 text-white" : "bg-blue-500/30 border-blue-400 text-blue-700" : n ? "bg-transparent border-white/30 hover:bg-white/5 text-white" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600 border-zinc-300"}`,
              title: (((pt = r.settings) == null ? void 0 : pt.klingImages) || []).length > 0 ? x("已上传 {0} 张图片", (((lt = r.settings) == null ? void 0 : lt.klingImages) || []).length) : x("上传图片"),
              children: [c.jsx(mu, {
                size: 12
              }), c.jsx("span", {
                children: (((gt = r.settings) == null ? void 0 : gt.klingImages) || []).length > 0 ? x("图片({0})", (((Ut = r.settings) == null ? void 0 : Ut.klingImages) || []).length) : x("图片")
              })]
            }), r.type === "gen-image" && (() => {
              var hn, Qt;
              const _t = ["nano-banana", jPt, "nano-banana-2", "gemini-3.1-flash-image-preview", "gemini-nano-banana-2.1", hKe, "gemini-3.1-flash-lite-image", pKe, EPt, uKe, hhe, qY, JY, eX, nX, "gpt-image", "gpt-image-1.5", "gpt-image-2", "gpt-image-2.5-sunburst", "gpt-image-2.5-flare", "gpt-image-2-all", O5e, Xue, Jue, "nano-banana-huya", "nano-banana-pro-huya", "gemini-3.1-flash-image-preview-huya", "gpt-image-1.5-huya", "gpt-image-2-huya", "gpt-image-2.5-flare-huya", "gpt-image-2.5-sunburst-huya", "flux-kontext", "z-image-official", "z-image-turbo-fal", hX, hce, pce, YY],
                At = ((hn = r.settings) == null ? void 0 : hn.model) || "",
                Yt = _t.includes(At) || vhe(At),
                qe = At === hce || At === pce || At === YY || At === qY || At === JY || At === eX || At === nX ? [{
                  value: 1,
                  label: "1×"
                }, {
                  value: 2,
                  label: "2×"
                }, {
                  value: 4,
                  label: "4×"
                }] : [{
                  value: 1,
                  label: "1×"
                }, {
                  value: 2,
                  label: "2×"
                }, {
                  value: 4,
                  label: "4×"
                }, {
                  value: 9,
                  label: "9×"
                }],
                kt = Number(((Qt = r.settings) == null ? void 0 : Qt.batchSize) || 1),
                St = qe.some(Ot => Ot.value === kt) ? kt : 1;
              return Yt ? c.jsxs("div", {
                className: "relative shrink-0 overflow-visible",
                "data-gen-dropdown-type": "batchSize",
                children: [c.jsxs("button", {
                  onClick: Ot => {
                    Ot.stopPropagation(), M((i == null ? void 0 : i.type) === "batchSize" && (i == null ? void 0 : i.nodeId) === r.id ? null : {
                      nodeId: r.id,
                      type: "batchSize"
                    });
                  },
                  onMouseDown: Ot => Ot.stopPropagation(),
                  className: `node-dropdown-button flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap ${n ? "bg-transparent hover:bg-white/10 text-white" : "bg-transparent hover:bg-black/5 text-gray-900"}`,
                  title: x("从当前节点发送的 AP 任务窗口数"),
                  children: [St, "×"]
                }), (i == null ? void 0 : i.nodeId) === r.id && (i == null ? void 0 : i.type) === "batchSize" && c.jsx("div", {
                  className: `node-dropdown-menu absolute bottom-full left-1/2 -translate-x-1/2 mb-1 min-w-[44px] rounded-2xl shadow-xl px-1.5 py-1.5 z-[100] border ${n ? "bg-[#1f1f1f] border-zinc-700" : "bg-white border-zinc-200"}`,
                  onMouseDown: Ot => Ot.stopPropagation(),
                  children: c.jsx("div", {
                    className: "flex flex-col items-stretch gap-0.5",
                    children: qe.map(({
                      value: Ot,
                      label: ln
                    }) => c.jsx("button", {
                      onClick: () => {
                        a(r.id, {
                          settings: {
                            ...(r.settings || {}),
                            batchSize: Ot,
                            batchCount: Ot
                          }
                        }), cl(At, {
                          imageCount: Ot
                        }), M(null);
                      },
                      className: `px-2.5 py-1 rounded-full text-[10px] transition-colors whitespace-nowrap ${n ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-zinc-100 text-zinc-700"} ${St === Ot ? n ? "bg-zinc-800" : "bg-zinc-100" : ""}`,
                      children: ln
                    }, Ot))
                  })
                })]
              }) : null;
            })(), r.type === "gen-image" && c.jsx(pIo, {
              node: r,
              isDark: n,
              updateNode: a,
              onGenInlineDirectorUiChange: pe,
              onInlineMovementPanelChange: Y,
              showMovementControls: !1
            }), r.type === "gen-image" ? c.jsx("div", {
              className: "shrink-0",
              onMouseDown: _t => _t.stopPropagation(),
              children: c.jsx(uvn, {
                node: r,
                isDark: n,
                isGenNodeToolbarCompact: he,
                genUseAliyunOss: z,
                globalOssUploadEnabled: L,
                ossConfigured: D,
                mediaHostingProvider: U,
                getLatestSettings: O,
                onGenUseAliyunOssChange: V,
                updateNode: a
              })
            }) : null, !1]
          })
        }), c.jsx(XIe, {
          className: "ml-0.5",
          kind: r.type === "gen-video" ? "video" : "image",
          value: r.prompt || "",
          onChange: _t => {
            _t !== (r.prompt || "") && a(r.id, {
              prompt: _t
            });
          },
          isDark: n,
          scopeId: r.id,
          mediaCount: ["default", "start", "end", "image", "first_frame", "last_frame"].filter(_t => u(r.id, _t)).length,
          disabled: p
        }), c.jsx(JIe, {
          className: "ml-0.5",
          nodeId: r.id,
          value: r.prompt || "",
          onChange: _t => {
            _t !== (r.prompt || "") && a(r.id, {
              prompt: _t
            });
          },
          isDark: n,
          disabled: p
        }), c.jsx(u1r, {
          nodeId: r.id,
          isDark: n,
          isGeneratingUi: p,
          directorActive: q,
          directorConnecting: (Q == null ? void 0 : Q.status) === "connecting",
          onGenerate: h
        })]
      })
    });
  }),
  vIo = Object.freeze(Object.defineProperty({
    __proto__: null,
    GenFullBottomToolbar: bIo
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  N8 = 9;

function wIo({
  size: e = 14,
  className: t
}) {
  on();
  const n = [3.5, 12, 20.5];
  return c.jsx("svg", {
    width: e,
    height: e,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": !0,
    className: t,
    children: n.flatMap(r => n.map(a => c.jsx("circle", {
      cx: a,
      cy: r,
      r: 2.15
    }, `${a}-${r}`)))
  });
}

function mvn(e) {
  return Math.max(1, Math.min(N8, e));
}

function Lwr({
  isDark: e,
  active: t = !1,
  onSplit: n,
  onRequestClose: r
}) {
  on();
  const a = g.useRef(null),
    i = g.useRef(null),
    o = g.useRef(null),
    s = g.useRef(null),
    l = g.useRef({
      rows: 2,
      columns: 2
    }),
    [d, u] = g.useState(!1),
    [h, p] = g.useState({
      rows: 2,
      columns: 2
    }),
    m = g.useCallback(I => {
      const E = l.current;
      E.rows === I.rows && E.columns === I.columns || (l.current = I, p(I));
    }, []),
    f = g.useCallback(() => {
      s.current != null && (window.clearTimeout(s.current), s.current = null);
    }, []),
    y = g.useCallback(() => {
      f(), u(!0);
    }, [f]),
    b = g.useCallback(() => {
      f(), s.current = window.setTimeout(() => u(!1), 140);
    }, [f]);
  g.useEffect(() => f, [f]), g.useLayoutEffect(() => {
    if (!d) return;
    const I = () => {
      const M = a.current,
        T = i.current;
      if (!M || !T) return;
      const P = M.getBoundingClientRect(),
        R = T.getBoundingClientRect(),
        j = 8,
        B = 8,
        N = P.right + B + R.width <= window.innerWidth - j ? P.right + B : Math.max(j, P.left - B - R.width),
        G = Math.min(Math.max(j, P.top), Math.max(j, window.innerHeight - R.height - j));
      T.style.left = `${N}px`, T.style.top = `${G}px`;
    };
    I();
    let E = requestAnimationFrame(function M() {
      I(), E = requestAnimationFrame(M);
    });
    return () => cancelAnimationFrame(E);
  }, [d]);
  const v = g.useCallback((I, E) => {
      const M = o.current;
      if (!M) return;
      const T = M.getBoundingClientRect();
      if (T.width <= 0 || T.height <= 0) return;
      const P = Math.min(Math.max(I - T.left, 0), T.width - .001),
        R = Math.min(Math.max(E - T.top, 0), T.height - .001),
        j = mvn(Math.floor(P / T.width * N8) + 1),
        B = mvn(Math.floor(R / T.height * N8) + 1);
      m({
        rows: B,
        columns: j
      });
    }, [m]),
    _ = g.useCallback(I => {
      v(I.clientX, I.clientY);
    }, [v]),
    w = g.useCallback(() => {
      const {
        rows: I,
        columns: E
      } = l.current;
      (async () => (u(!1), r == null || r(), await n(I, E)))();
    }, [r, n]),
    k = t || d ? e ? "bg-white/10 text-white" : "bg-zinc-100 text-zinc-900" : e ? "text-zinc-100 hover:bg-white/10" : "text-zinc-800 hover:bg-zinc-100",
    A = e ? "border-white/[0.06] bg-[#3a3a3a]" : "border-zinc-200 bg-zinc-100",
    S = e ? "border-white/40 bg-white/[0.16]" : "border-zinc-500 bg-zinc-300/70",
    C = d && typeof document < "u" ? Da.createPortal(c.jsxs("div", {
      ref: i,
      "data-quick-grid-split-picker": !0,
      className: `node-dropdown-menu fixed z-[10220] w-[224px] rounded-2xl border p-3 shadow-2xl ${e ? "border-zinc-700 bg-[#262626] text-zinc-100" : "border-zinc-200 bg-white text-zinc-900"}`,
      onMouseEnter: f,
      onMouseLeave: b,
      onClick: I => I.stopPropagation(),
      onPointerDown: I => I.stopPropagation(),
      onMouseDown: I => I.stopPropagation(),
      children: [c.jsx("div", {
        ref: o,
        className: "grid cursor-default gap-[3px]",
        style: {
          gridTemplateColumns: `repeat(${N8}, minmax(0, 1fr))`
        },
        role: "grid",
        "aria-label": x("选择快速切分行列"),
        "aria-rowcount": N8,
        "aria-colcount": N8,
        onPointerEnter: _,
        onPointerMove: _,
        onClick: w,
        children: Array.from({
          length: N8 * N8
        }, (I, E) => {
          const M = Math.floor(E / N8) + 1,
            T = E % N8 + 1,
            P = M <= h.rows && T <= h.columns;
          return c.jsx("div", {
            role: "gridcell",
            "aria-selected": P,
            "aria-label": x("{0} 行 {1} 列", M, T),
            className: `pointer-events-none aspect-square rounded-[4px] border ${P ? S : A}`
          }, `${M}-${T}`);
        })
      }), c.jsxs("div", {
        className: "mt-3 text-center text-sm font-medium tabular-nums",
        children: [h.rows, "×", h.columns]
      })]
    }), document.body) : null;
  return c.jsxs("div", {
    ref: a,
    className: `flex w-full items-center px-3 py-1.5 text-xs transition-colors ${k}`,
    onMouseEnter: y,
    onMouseLeave: b,
    children: [c.jsxs("button", {
      type: "button",
      className: "flex min-w-0 flex-1 cursor-default items-center gap-2 py-0.5 text-left",
      onClick: () => u(I => !I),
      children: [c.jsx(wIo, {
        size: 14,
        className: "shrink-0"
      }), c.jsx("span", {
        className: "whitespace-nowrap",
        children: x("快速切分")
      })]
    }), c.jsx(ss, {
      size: 13,
      className: "ml-1 shrink-0 opacity-60"
    }), C]
  });
}

function Owr({
  active: e = !1,
  processing: t = !1,
  onCustom: n,
  menuItemClass: r
}) {
  return on(), c.jsxs("button", {
    type: "button",
    disabled: t,
    className: r(e),
    onClick: a => {
      a.stopPropagation(), !t && n();
    },
    children: [t ? c.jsx(Ua, {
      size: 14,
      className: "shrink-0 animate-spin"
    }) : c.jsx(Y2, {
      size: 14,
      className: "shrink-0"
    }), c.jsx("span", {
      className: "flex-1",
      children: x(t ? "图层分解中…" : e ? "关闭图层分解" : "图层分解")
    })]
  });
}

const B3t = "qiaodoumayi-node-tools-order-changed",
  Bwr = [{
    key: "canvas",
    label: "创建画板节点"
  }, {
    key: "marker",
    label: "标记模式"
  }, {
    key: "highlight",
    label: "高亮显示"
  }, {
    key: "videoDepth",
    label: "深度提取（视频）"
  }, {
    key: "imageDepth",
    label: "深度提取"
  }, {
    key: "videoAspectCrop",
    label: "画幅裁切"
  }, {
    key: "videoTrim",
    label: "时长裁切"
  }, {
    key: "videoReverse",
    label: "时序倒置"
  }, {
    key: "videoExtractAudio",
    label: "提取音频"
  }, {
    key: "videoCompress",
    label: "视频压缩"
  }, {
    key: "videoToGif",
    label: "动图导出"
  }, {
    key: "eraser",
    label: "橡皮擦"
  }, {
    key: "annotation",
    label: "标注工具"
  }, {
    key: "smartEdit",
    label: "智能改图"
  }, {
    key: "relight",
    label: "重打光"
  }, {
    key: "portraitTexture",
    label: "人像质感调节"
  }, {
    key: "faceRetouch",
    label: "人像精修"
  }, {
    key: "moodAdjust",
    label: "情绪调节"
  }, {
    key: "colorAdjust",
    label: "调色编辑"
  }, {
    key: "lut",
    label: "LUT 调色"
  }, {
    key: "panorama",
    label: "360 全景"
  }, {
    key: "gridSplit",
    label: "宫格切分"
  }, {
    key: "freeSplit",
    label: "自由裁切"
  }, {
    key: "layerSplit",
    label: "图层分解"
  }, {
    key: "expand",
    label: "智能扩图"
  }, {
    key: "imageCutout",
    label: "智能抠图"
  }, {
    key: "xianyiRembg",
    label: "智能抠图（鲜艺）"
  }, {
    key: "textEdit",
    label: "文字编辑"
  }, {
    key: "moveObject",
    label: "移动对象"
  }, {
    key: "imageInfoJson",
    label: "转成 JSON"
  }, {
    key: "quickSplit",
    label: "快速切分"
  }, {
    key: "rembg",
    label: "去除背景"
  }],
  AEe = Bwr.map(e => e.key),
  xIo = new Set(AEe);

function _Io(e) {
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

function hue(e) {
  const t = new Set(),
    n = [];
  for (const r of e ?? []) xIo.has(r) && !t.has(r) && (t.add(r), n.push(r));
  for (const r of AEe) t.has(r) || (t.add(r), n.push(r));
  return n;
}

function kIo(e, t) {
  const n = e.filter(o => o.show !== !1),
    r = new Map(n.map(o => [o.key, o])),
    a = [],
    i = new Set();
  for (const o of hue(t)) {
    const s = r.get(o);
    s && (a.push(s), i.add(o));
  }
  for (const o of AEe) !i.has(o) && r.has(o) && (a.push(r.get(o)), i.add(o));
  for (const o of n) i.has(o.key) || a.push(o);
  return a;
}

function AIo() {
  try {
    const e = localStorage.getItem(Zi.NODE_TOOLS_ORDER);
    return hue(_Io(e));
  } catch {
    return hue([...AEe]);
  }
}

async function SIo() {
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
    t = await e.loadNodeToolsOrder();
  return (n = t == null ? void 0 : t.itemKeys) != null && n.length ? hue(t.itemKeys) : null;
}

async function IIo(e) {
  const t = hue(e),
    n = {
      version: 1,
      itemKeys: t,
      updatedAt: new Date().toISOString()
    };
  try {
    localStorage.setItem(Zi.NODE_TOOLS_ORDER, JSON.stringify(n, null, 0));
  } catch (a) {
    console.warn("[nodeToolsOrder] localStorage save failed", a);
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
  return await r.saveNodeToolsOrder(n), window.dispatchEvent(new CustomEvent(B3t, {
    detail: {
      itemKeys: t
    }
  })), t;
}

function Fwr() {
  const [e, t] = g.useState(() => AIo()),
    [n, r] = g.useState(!1);
  return g.useEffect(() => {
    const a = async () => {
      const s = await SIo();
      s && t(s);
    };
    a();
    const i = () => void a(),
      o = s => {
        var d;
        const l = s.detail;
        (d = l == null ? void 0 : l.itemKeys) != null && d.length && t(l.itemKeys);
      };
    return window.addEventListener(Tf, i), window.addEventListener(B3t, o), () => {
      window.removeEventListener(Tf, i), window.removeEventListener(B3t, o);
    };
  }, []), {
    itemKeys: e,
    setItemKeys: t,
    orderModalOpen: n,
    setOrderModalOpen: r
  };
}

const CIo = new Map(Bwr.map(e => [e.key, e.label])),
  zwr = ({
    isOpen: e,
    onClose: t,
    isDark: n,
    itemKeys: r,
    onSaved: a
  }) => {
    on();
    const [i, o] = g.useState([]),
      s = g.useCallback(() => {
        o(hue(r));
      }, [r]);
    g.useEffect(() => {
      e && s();
    }, [e, s]);
    const l = (m, f, y) => {
        const b = [...m],
          v = f + y;
        return v < 0 || v >= b.length ? m : ([b[f], b[v]] = [b[v], b[f]], b);
      },
      d = (m, f) => {
        if (f <= 0) return m;
        const y = [...m],
          [b] = y.splice(f, 1);
        return y.unshift(b), y;
      },
      u = async () => {
        const m = await IIo(i);
        a(m), t();
      };
    if (!e) return null;
    const h = m => `flex items-center gap-2 rounded-lg px-2 py-1.5 ${m ? "hover:bg-zinc-800/80" : "hover:bg-zinc-100"}`,
      p = m => `p-1 rounded disabled:opacity-30 ${m ? "hover:bg-zinc-700" : "hover:bg-zinc-200"}`;
    return c.jsx(Y6, {
      isOpen: e,
      onClose: t,
      title: x("工具排列顺序"),
      theme: n ? "dark" : "light",
      panelWidthClass: "w-[420px]",
      children: c.jsxs("div", {
        className: `px-5 py-4 space-y-4 ${n ? "text-zinc-200" : "text-zinc-800"}`,
        children: [c.jsx("p", {
          className: `text-xs ${n ? "text-zinc-400" : "text-zinc-600"}`,
          children: x("调整节点「…工具」菜单里的排列顺序。设置会保存到本地和资源缓存目录。")
        }), c.jsx("div", {
          className: "flex flex-wrap items-center gap-2 text-xs",
          children: c.jsx("button", {
            type: "button",
            onClick: () => o([...AEe]),
            className: `rounded px-2 py-0.5 border text-xs ${n ? "border-zinc-600 text-zinc-300 hover:bg-zinc-800" : "border-zinc-300 text-zinc-700 hover:bg-zinc-100"}`,
            children: x("恢复默认")
          })
        }), c.jsx("ul", {
          className: `space-y-1 max-h-[min(52vh,28rem)] overflow-y-auto custom-scrollbar p-0.5 text-sm ${n ? "text-zinc-200" : "text-zinc-800"}`,
          children: i.map((m, f) => c.jsxs("li", {
            className: h(n),
            children: [c.jsx("span", {
              className: "flex-1 min-w-0 truncate",
              children: CIo.get(m) ?? m
            }), c.jsxs("div", {
              className: "flex shrink-0 items-center gap-0.5",
              children: [c.jsx("button", {
                type: "button",
                "aria-label": x("置顶"),
                title: x("置顶"),
                disabled: f === 0,
                onClick: () => o(y => d(y, f)),
                className: p(n),
                children: c.jsx(mmt, {
                  size: 16,
                  strokeWidth: 2
                })
              }), c.jsx("button", {
                type: "button",
                "aria-label": x("上移"),
                disabled: f === 0,
                onClick: () => o(y => l(y, f, -1)),
                className: p(n),
                children: c.jsx(j2, {
                  size: 16,
                  strokeWidth: 2
                })
              }), c.jsx("button", {
                type: "button",
                "aria-label": x("下移"),
                disabled: f === i.length - 1,
                onClick: () => o(y => l(y, f, 1)),
                className: p(n),
                children: c.jsx(Mi, {
                  size: 16,
                  strokeWidth: 2
                })
              })]
            })]
          }, m))
        }), c.jsxs("div", {
          className: `flex justify-end gap-2 pt-2 border-t ${n ? "border-zinc-800" : "border-zinc-200"}`,
          children: [c.jsx("button", {
            type: "button",
            onClick: t,
            className: `px-3 py-1.5 text-sm rounded-lg border ${n ? "border-zinc-600 text-zinc-200 hover:bg-zinc-800" : "border-zinc-300 text-zinc-800 hover:bg-zinc-100"}`,
            children: x("取消")
          }), c.jsx("button", {
            type: "button",
            onClick: () => void u(),
            className: "px-3 py-1.5 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-500",
            children: x("保存")
          })]
        })]
      })
    });
  },
  EIo = 52,
  TIo = [{
    id: "canvas",
    label: "创建画板节点",
    icon: c.jsx(Vue, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !1
  }, {
    id: "marker",
    label: "标记模式",
    icon: c.jsx(sxe, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !1
  }, {
    id: "highlight",
    label: "高亮显示",
    icon: c.jsx(pEt, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !0
  }, {
    id: "videoDepth",
    label: "深度提取",
    icon: c.jsx(kS, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !0
  }, {
    id: "imageDepth",
    label: "深度提取",
    icon: c.jsx(kS, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !1
  }, {
    id: "videoAspectCrop",
    label: "画幅裁切",
    icon: c.jsx(WEn, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !0
  }, {
    id: "videoTrim",
    label: "时长裁切",
    icon: c.jsx(cxe, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !0
  }, {
    id: "videoReverse",
    label: "时序倒置",
    icon: c.jsx(d_, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !0
  }, {
    id: "videoExtractAudio",
    label: "提取音频",
    icon: c.jsx(Q2, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !0
  }, {
    id: "videoCompress",
    label: "视频压缩",
    icon: c.jsx(fZ, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !0
  }, {
    id: "videoToGif",
    label: "动图导出",
    icon: c.jsx(FM, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !0
  }, {
    id: "eraser",
    label: "橡皮擦",
    icon: c.jsx(uI, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !1
  }, {
    id: "annotation",
    label: "标注工具",
    icon: c.jsx(KHe, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !1
  }, {
    id: "smartEdit",
    label: "智能改图",
    icon: c.jsx(SP, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !1
  }, {
    id: "relight",
    label: "重打光",
    icon: c.jsx(PY, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !1
  }, {
    id: "portraitTexture",
    label: "人像质感调节",
    icon: c.jsx(wEt, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !1
  }, {
    id: "faceRetouch",
    label: "人像精修",
    icon: c.jsx(ac, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !1
  }, {
    id: "moodAdjust",
    label: "情绪调节",
    icon: c.jsx(xEt, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !1
  }, {
    id: "colorAdjust",
    label: "调色编辑",
    icon: c.jsx(by, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !1
  }, {
    id: "lut",
    label: "LUT 调色",
    icon: c.jsx(wb, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !0
  }, {
    id: "panorama",
    label: "360 全景",
    icon: c.jsx(cEt, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !1
  }, {
    id: "gridSplit",
    label: "宫格切分",
    icon: c.jsx(Bv, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !1
  }, {
    id: "freeSplit",
    label: "自由裁切",
    icon: c.jsx(Sf, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !1
  }, {
    id: "layerSplit",
    label: "图层分解",
    icon: c.jsx(Y2, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !1
  }, {
    id: "expand",
    label: "智能扩图",
    icon: c.jsx(Od, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !1
  }, {
    id: "imageCutout",
    label: "智能抠图",
    icon: c.jsx(GK, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !1
  }, {
    id: "xianyiRembg",
    label: "智能抠图（鲜艺）",
    icon: c.jsx(GK, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !1
  }, {
    id: "textEdit",
    label: "文字编辑",
    icon: c.jsx(SP, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !1
  }, {
    id: "moveObject",
    label: "移动对象",
    icon: c.jsx(RY, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !1
  }, {
    id: "imageInfoJson",
    label: "转成 JSON",
    icon: c.jsx(aEt, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !1
  }, {
    id: "quickSplit",
    label: "快速切分",
    icon: c.jsx(Bv, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !1
  }, {
    id: "rembg",
    label: "去除背景",
    icon: c.jsx(GK, {
      size: 14,
      className: "shrink-0"
    }),
    videoSupported: !1
  }];

function MIo({
  isSelected: e,
  isDark: t,
  canvasZoomMediaOpacity: n,
  showImageTools: r = !1,
  isVideoNode: a = !1,
  isAnglePanelOpen: i = !1,
  onToggleAngle: o,
  isCropSelectMode: s = !1,
  onToggleCrop: l,
  onToolSelect: d,
  onQuickGridSplit: u,
  hasCanvasNode: h = !1,
  isMarkerMode: p = !1,
  isAnnotationOpen: m = !1,
  isHighlighted: f = !1,
  isEraserToolOpen: y = !1,
  isLightPanelOpen: b = !1,
  isPortraitTexturePanelOpen: v = !1,
  isFaceRetouchOpen: _ = !1,
  isMoodAdjustPanelOpen: w = !1,
  isColorAdjustPanelOpen: k = !1,
  isLutColorPanelOpen: A = !1,
  isVideoDepthDialogOpen: S = !1,
  isImageDepthProcessing: C = !1,
  isImageCutoutOpen: I = !1,
  isVideoAspectCropOpen: E = !1,
  isVideoTrimOpen: M = !1,
  isVideoReverseOpen: T = !1,
  isVideoExtractAudioOpen: P = !1,
  isVideoCompressOpen: R = !1,
  isVideoToGifOpen: j = !1,
  isPanoramaPanelOpen: B = !1,
  isGridSplitModalOpen: F = !1,
  isFreeSplitModalOpen: N = !1,
  isLayerSplitOpen: G = !1,
  isLayerSplitProcessing: z = !1,
  onLayerSplitCustom: V,
  onLayerSplitExit: O,
  isExpandModalOpen: L = !1,
  isXianyiRembgProcessing: D = !1,
  isTextEditPanelOpen: U = !1,
  isMoveObjectPanelOpen: H = !1,
  hasSelfTextEditData: Y = !1,
  hasSelfMoveObjectData: K = !1,
  hasMarkers: W = !1,
  isExtractingFrames: Q = !1,
  onExtractFirstLastFrames: q,
  onExtractCurrentFrame: ne,
  onExtractFirstFrame: de,
  onExtractLastFrame: le,
  onHdUpscale: J,
  onDownload: pe,
  onFullscreen: ce,
  node: we
}) {
  on();
  const [X, Z] = g.useState(!1),
    [re, fe] = g.useState(!1),
    ye = g.useRef(null),
    ie = g.useRef(null),
    ae = g.useRef(null),
    {
      itemKeys: be,
      setItemKeys: Ee,
      orderModalOpen: xe,
      setOrderModalOpen: he
    } = Fwr();
  Qp(ae, "50% 100%", !0);
  const ue = g.useMemo(() => kIo(TIo.filter(me => !(a && !me.videoSupported || !a && (me.id === "videoDepth" || me.id === "videoTrim" || me.id === "videoReverse" || me.id === "videoExtractAudio" || me.id === "videoCompress" || me.id === "videoToGif") || me.id === "smartEdit" && r || me.id === "quickSplit" && !u || me.id === "layerSplit" && !V)).map(me => ({
      ...me,
      key: me.id
    })), be), [a, r, u, V, be]),
    ge = ue.length > 0;
  g.useEffect(() => {
    !e && X && Z(!1), !e && re && fe(!1);
  }, [e, X, re]), g.useEffect(() => {
    if (!X) return;
    const me = Ae => {
      const Fe = Ae.target;
      if (Fe instanceof Element && Fe.closest("[data-gen-media-tools-menu], [data-layer-split-submenu], [data-one-click-layer-panel], .node-dropdown-menu")) return;
      const Me = ye.current;
      Me && !Me.contains(Fe) && Z(!1);
    };
    return document.addEventListener("pointerdown", me), () => document.removeEventListener("pointerdown", me);
  }, [X]), g.useEffect(() => {
    if (!re) return;
    const me = Ae => {
      const Fe = Ae.target;
      if (Fe instanceof Element && Fe.closest("[data-gen-media-video-frame-menu], .node-dropdown-menu")) return;
      const Me = ie.current;
      Me && !Me.contains(Fe) && fe(!1);
    };
    return document.addEventListener("pointerdown", me), () => document.removeEventListener("pointerdown", me);
  }, [re]);
  const _e = (me = !1) => $P(t, me),
    ke = c.jsx("div", {
      "data-toolbar-divider": "",
      className: fpe(t)
    }),
    ve = (me = !1) => `flex w-full items-center gap-2 whitespace-nowrap px-3.5 py-2 text-left text-xs transition-colors ${me ? t ? "bg-white/10 text-white" : "bg-zinc-100 text-zinc-900" : t ? "text-zinc-100 hover:bg-white/10" : "text-zinc-800 hover:bg-zinc-100"}`,
    Te = me => me.id === "canvas" ? h ? "打开画板节点" : "创建画板节点" : me.id === "marker" ? p ? "退出标记模式" : "标记模式" : me.id === "annotation" ? m ? "退出标注工具" : "标注工具" : me.id === "smartEdit" ? "智能改图" : me.id === "highlight" ? f ? "取消高亮" : "高亮显示" : me.id === "eraser" ? y ? "关闭橡皮擦" : "橡皮擦" : me.id === "relight" ? b ? "关闭重打光" : "重打光" : me.id === "portraitTexture" ? v ? "关闭人像质感调节" : "人像质感调节" : me.id === "faceRetouch" ? _ ? "关闭人像精修" : "人像精修" : me.id === "moodAdjust" ? w ? "关闭情绪调节" : "情绪调节" : me.id === "colorAdjust" ? k ? "关闭调色编辑" : "调色编辑" : me.id === "lut" ? A ? "关闭 LUT 调色" : "LUT 调色" : me.id === "videoDepth" ? S ? "关闭深度提取" : "深度提取" : me.id === "imageDepth" ? C ? "深度提取中…" : "深度提取" : me.id === "imageCutout" ? I ? "关闭智能抠图" : "智能抠图" : me.id === "videoAspectCrop" ? E ? "关闭画幅裁切" : "画幅裁切" : me.id === "videoTrim" ? M ? "关闭时长裁切" : "时长裁切" : me.id === "videoReverse" ? T ? "关闭时序倒置" : "时序倒置" : me.id === "videoExtractAudio" ? P ? "关闭提取音频" : "提取音频" : me.id === "videoCompress" ? R ? "关闭视频压缩" : "视频压缩" : me.id === "videoToGif" ? j ? "关闭动图导出" : "动图导出" : me.id === "panorama" ? B ? "关闭 360 全景" : "360 全景" : me.id === "gridSplit" ? F ? "关闭宫格切分" : "宫格切分" : me.id === "freeSplit" ? N ? "关闭自由裁切" : "自由裁切" : me.id === "layerSplit" ? z ? "图层分解中…" : G ? "关闭图层分解" : "图层分解" : me.id === "expand" ? L ? "关闭智能扩图" : "智能扩图" : me.id === "xianyiRembg" ? D ? "抠图中…" : "智能抠图（鲜艺）" : me.id === "textEdit" ? U ? "关闭文字编辑" : "文字编辑" : me.id === "moveObject" ? H ? "关闭移动对象" : "移动对象" : me.id === "rembg" ? "去除背景" : me.label,
    Ne = me => me === "canvas" ? h : me === "marker" ? p : me === "annotation" ? m : me === "highlight" ? f : me === "eraser" ? y : me === "relight" ? b : me === "portraitTexture" ? v : me === "faceRetouch" ? _ : me === "moodAdjust" ? w : me === "colorAdjust" ? k : me === "lut" ? A : me === "videoDepth" ? S : me === "imageDepth" ? C : me === "imageCutout" ? I : me === "videoAspectCrop" ? E : me === "videoTrim" ? M : me === "videoReverse" ? T : me === "videoExtractAudio" ? P : me === "videoCompress" ? R : me === "videoToGif" ? j : me === "panorama" ? B : me === "gridSplit" ? F : me === "freeSplit" ? N : me === "layerSplit" ? G || z : me === "expand" ? L : me === "xianyiRembg" ? D : me === "textEdit" ? U : me === "moveObject" ? H : !1;
  return c.jsxs("div", {
    className: "absolute left-1/2 bottom-full z-[120] -translate-x-1/2 transition-opacity duration-200 ease-out",
    "data-gen-media-toolbar": !0,
    onDoubleClick: me => {
      me.preventDefault(), me.stopPropagation();
    },
    style: {
      marginBottom: qdr(EIo),
      opacity: n,
      pointerEvents: e ? "auto" : "none"
    },
    children: [c.jsx("div", {
      ref: ae,
      style: {
        transition: "none",
        willChange: "transform"
      },
      children: c.jsx("div", {
        className: e ? "canvas-top-toolbar-enter" : "canvas-top-toolbar-exit pointer-events-none",
        onClick: me => me.stopPropagation(),
        onPointerDown: me => me.stopPropagation(),
        onMouseDown: me => me.stopPropagation(),
        children: c.jsx("div", {
          "data-canvas-pin-toolbar": "",
          "data-canvas-float-toolbar": "",
          className: UP(t),
          children: c.jsxs("div", {
            className: "flex items-center",
            children: [r && c.jsxs(c.Fragment, {
              children: [c.jsx("button", {
                type: "button",
                className: _e(i),
                "data-toolbar-active": i ? "true" : "false",
                onClick: me => {
                  me.stopPropagation(), Z(!1), fe(!1), o == null || o();
                },
                "data-tip": x(i ? "关闭角度面板" : "角度调整"),
                children: c.jsx(A$t, {
                  size: 16
                })
              }), c.jsx("button", {
                type: "button",
                className: _e(s),
                "data-toolbar-active": s ? "true" : "false",
                onClick: me => {
                  me.stopPropagation(), Z(!1), fe(!1), l == null || l();
                },
                "data-tip": x(s ? "退出框选" : "框选裁剪区域"),
                children: c.jsx(Sf, {
                  size: 16
                })
              }), c.jsx("button", {
                type: "button",
                className: _e(!1),
                "data-toolbar-active": "false",
                onClick: me => {
                  me.stopPropagation(), Z(!1), fe(!1), d == null || d("smartEdit");
                },
                "data-tip": x("智能改图"),
                children: c.jsx(SP, {
                  size: 16
                })
              })]
            }), a && (ne || de || le || q) ? c.jsxs("div", {
              className: "relative flex items-center",
              children: [c.jsx("button", {
                ref: ie,
                type: "button",
                className: _e(re || Q),
                "data-toolbar-active": re || Q ? "true" : "false",
                disabled: Q,
                onClick: me => {
                  me.stopPropagation(), !Q && (Z(!1), fe(Ae => !Ae));
                },
                "data-tip": x(Q ? "提取中…" : "截取画面"),
                children: Q ? c.jsx(Ua, {
                  size: 16,
                  className: "animate-spin"
                }) : c.jsx(wb, {
                  size: 16
                })
              }), c.jsxs(yg, {
                open: re && !Q,
                anchorRef: ie,
                isDark: t,
                placement: "below",
                align: "center",
                gap: 6,
                dataPortalAttr: "data-gen-media-video-frame-menu",
                minWidth: 136,
                className: "inline-flex w-max flex-col py-1.5",
                zIndex: 10200,
                children: [ne ? c.jsx("button", {
                  type: "button",
                  className: ve(!1),
                  onClick: me => {
                    me.stopPropagation(), fe(!1), ne();
                  },
                  children: x("截取当前帧")
                }) : null, de ? c.jsx("button", {
                  type: "button",
                  className: ve(!1),
                  onClick: me => {
                    me.stopPropagation(), fe(!1), de();
                  },
                  children: x("截取首帧")
                }) : null, le ? c.jsx("button", {
                  type: "button",
                  className: ve(!1),
                  onClick: me => {
                    me.stopPropagation(), fe(!1), le();
                  },
                  children: x("截取末帧")
                }) : null, q ? c.jsx("button", {
                  type: "button",
                  className: ve(!1),
                  onClick: me => {
                    me.stopPropagation(), fe(!1), q();
                  },
                  children: x("截取首尾帧")
                }) : null]
              })]
            }) : null, c.jsxs("div", {
              className: "flex items-center",
              children: [ge && c.jsxs("div", {
                className: `relative flex items-center${a ? " order-2" : ""}`,
                children: [c.jsx("button", {
                  ref: ye,
                  type: "button",
                  className: `relative ${_e(X)}`,
                  "data-toolbar-active": X ? "true" : "false",
                  onClick: me => {
                    me.stopPropagation(), fe(!1), Z(Ae => !Ae);
                  },
                  "data-tip": x("工具"),
                  children: c.jsx(hw, {
                    size: 16
                  })
                }), c.jsxs(yg, {
                  open: X,
                  anchorRef: ye,
                  isDark: t,
                  placement: "below",
                  align: "center",
                  gap: 6,
                  dataPortalAttr: "data-gen-media-tools-menu",
                  minWidth: 136,
                  className: "inline-flex max-h-[min(22rem,70vh)] w-max flex-col overflow-y-auto py-1.5 minimal-scrollbar",
                  zIndex: 10200,
                  children: [ue.map(me => c.jsx(Ia.Fragment, {
                    children: me.id === "quickSplit" && u ? c.jsx(Lwr, {
                      isDark: t,
                      onRequestClose: () => Z(!1),
                      onSplit: u
                    }) : me.id === "layerSplit" && V ? c.jsx(Owr, {
                      isDark: t,
                      active: G,
                      processing: z,
                      menuItemClass: ve,
                      onCustom: () => {
                        Z(!1), G ? O == null || O() : V();
                      }
                    }) : c.jsxs("button", {
                      type: "button",
                      disabled: me.id === "xianyiRembg" && D || me.id === "imageDepth" && C,
                      className: `${ve(Ne(me.id))} disabled:opacity-60`,
                      onClick: Ae => {
                        Ae.stopPropagation(), Z(!1), d == null || d(me.id);
                      },
                      children: [me.id === "xianyiRembg" && D || me.id === "imageDepth" && C ? c.jsx(Ua, {
                        size: 14,
                        className: "shrink-0 animate-spin"
                      }) : me.icon, c.jsxs("span", {
                        className: "flex items-center gap-1.5",
                        children: [Te(me), me.id === "marker" && W ? c.jsx("span", {
                          className: `h-1.5 w-1.5 rounded-full ${t ? "bg-blue-400" : "bg-blue-500"}`,
                          "aria-hidden": !0
                        }) : null, me.id === "textEdit" && Y ? c.jsx("span", {
                          className: `h-1.5 w-1.5 rounded-full ${t ? "bg-blue-400" : "bg-blue-500"}`,
                          "aria-hidden": !0
                        }) : null, me.id === "moveObject" && K ? c.jsx("span", {
                          className: `h-1.5 w-1.5 rounded-full ${t ? "bg-blue-400" : "bg-blue-500"}`,
                          "aria-hidden": !0
                        }) : null]
                      })]
                    })
                  }, me.id)), c.jsxs("button", {
                    type: "button",
                    className: ve(xe),
                    onClick: me => {
                      me.stopPropagation(), Z(!1), he(!0);
                    },
                    children: [c.jsx(gEt, {
                      size: 14,
                      className: "shrink-0"
                    }), c.jsx("span", {
                      children: x("排列顺序")
                    })]
                  })]
                })]
              }), c.jsx("div", {
                className: a ? "order-1" : void 0,
                children: c.jsx("button", {
                  type: "button",
                  className: _e(),
                  onClick: me => {
                    me.stopPropagation(), Z(!1), J();
                  },
                  "data-tip": x("高清放大"),
                  children: c.jsx("span", {
                    className: "text-xs font-semibold",
                    children: "HD"
                  })
                })
              })]
            }), ke, we && UD(we) && c.jsx($D, {
              nodeIds: [we.id],
              pins: Zg(we),
              isDark: t,
              size: "compact"
            }), c.jsx("button", {
              type: "button",
              className: _e(),
              onClick: me => {
                me.stopPropagation(), Z(!1), pe(me);
              },
              "data-tip": x("下载"),
              children: c.jsx(ws, {
                size: 16
              })
            }), c.jsx("button", {
              type: "button",
              "data-gen-media-open-lightbox": !0,
              className: _e(),
              onClick: me => {
                me.stopPropagation(), Z(!1), ce(me);
              },
              "data-tip": x("全屏"),
              children: c.jsx(kT, {
                size: 16
              })
            })]
          })
        })
      })
    }), c.jsx(zwr, {
      isOpen: xe,
      onClose: () => he(!1),
      isDark: t,
      itemKeys: be,
      onSaved: Ee
    })]
  });
}

const PIo = Object.freeze(Object.defineProperty({
    __proto__: null,
    GenMediaTopToolbar: MIo
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  RIo = [{
    name: "琥珀金",
    value: "#ffbe0b"
  }, {
    name: "烈焰橙",
    value: "#fb5607"
  }, {
    name: "霓虹粉",
    value: "#ff006e"
  }, {
    name: "红色",
    value: "#ff0000"
  }, {
    name: "蓝紫色",
    value: "#8338ec"
  }, {
    name: "天蓝色",
    value: "#3a86ff"
  }, {
    name: "白色",
    value: "#ffffff"
  }],
  NIo = "#ff0000",
  jIo = 4;

function DIo(e, t) {
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

function fvn(e, t) {
  e.save(), e.lineCap = "round", e.lineJoin = "round";
  for (const n of t) {
    if (e.strokeStyle = n.color, e.fillStyle = n.color, n.type === "stroke") {
      e.setLineDash([]), e.lineWidth = Math.max(.5, n.width), DIo(e, n.points);
      continue;
    }
    if (n.type === "rectangle") {
      e.lineWidth = Math.max(.5, n.strokeWidth), e.setLineDash([n.dash, n.dash]), e.strokeRect(n.x, n.y, n.width, n.height);
      continue;
    }
    e.setLineDash([]), e.font = `${Math.max(8, n.fontSize)}px Inter, "PingFang SC", "Microsoft YaHei", sans-serif`, e.textBaseline = "middle";
    const r = n.fontSize * 1.2;
    n.text.split(`
`).forEach((a, i) => {
      e.fillText(a, n.x, n.y + i * r);
    });
  }
  e.restore();
}

function fge(e, t, n) {
  const r = n.x - t.x,
    a = n.y - t.y;
  if (r === 0 && a === 0) return Math.hypot(e.x - t.x, e.y - t.y);
  const i = Math.max(0, Math.min(1, ((e.x - t.x) * r + (e.y - t.y) * a) / (r * r + a * a)));
  return Math.hypot(e.x - (t.x + i * r), e.y - (t.y + i * a));
}

function Uwr(e, t, n) {
  if (e.type === "stroke") {
    const o = n + e.width / 2;
    if (e.points.length === 1) return Math.hypot(t.x - e.points[0].x, t.y - e.points[0].y) <= o;
    for (let s = 1; s < e.points.length; s += 1) if (fge(t, e.points[s - 1], e.points[s]) <= o) return !0;
    return !1;
  }
  if (e.type === "rectangle") {
    const o = e.x + e.width,
      s = e.y + e.height,
      l = n + e.strokeWidth / 2,
      d = fge(t, {
        x: e.x,
        y: e.y
      }, {
        x: o,
        y: e.y
      }),
      u = fge(t, {
        x: o,
        y: e.y
      }, {
        x: o,
        y: s
      }),
      h = fge(t, {
        x: o,
        y: s
      }, {
        x: e.x,
        y: s
      }),
      p = fge(t, {
        x: e.x,
        y: s
      }, {
        x: e.x,
        y: e.y
      });
    return Math.min(d, u, h, p) <= l;
  }
  const r = e.text.split(`
`),
    a = Math.max(e.fontSize * .7, ...r.map(o => o.length * e.fontSize * .62)),
    i = e.y + (r.length - 1) * e.fontSize * 1.2 + e.fontSize / 2;
  return t.x >= e.x - n && t.x <= e.x + a + n && t.y >= e.y - e.fontSize / 2 - n && t.y <= i + n;
}

function LIo(e, t, n) {
  return e.filter(r => !Uwr(r, t, n));
}

function xdt(e, t) {
  return e === t ? !0 : e.length !== t.length ? !1 : JSON.stringify(e) === JSON.stringify(t);
}

const _dt = () => `annotation-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

function WPe(e, t) {
  if (!t) return e;
  const n = t.element.text,
    r = e.findIndex(i => i.id === t.element.id);
  if (!n.trim()) return r < 0 ? e : e.filter(i => i.id !== t.element.id);
  if (r < 0) return [...e, t.element];
  const a = [...e];
  return a[r] = t.element, a;
}

function kdt(e, t, n) {
  for (let r = e.length - 1; r >= 0; r -= 1) {
    const a = e[r];
    if (a.type === "text" && Uwr(a, t, n)) return a;
  }
  return null;
}

function OIo(e, t) {
  const n = e.text.split(`
`),
    r = e.fontSize * 1.2,
    a = Math.max(0, Math.min(n.length - 1, Math.round((t.y - e.y) / r))),
    i = n.slice(0, a).reduce((h, p) => h + p.length + 1, 0),
    o = n[a] ?? "",
    l = document.createElement("canvas").getContext("2d");
  if (!l) return i + o.length;
  l.font = `${Math.max(8, e.fontSize)}px Inter, "PingFang SC", "Microsoft YaHei", sans-serif`;
  const d = Math.max(0, t.x - e.x);
  let u = 0;
  for (let h = 1; h <= o.length; h += 1) {
    const p = l.measureText(o.slice(0, h)).width;
    if (d < (u + p) / 2) return i + h - 1;
    u = p;
  }
  return i + o.length;
}

function gvn(e, t, n) {
  const r = n.width / Math.max(1, t.width),
    a = n.height / Math.max(1, t.height),
    i = Math.min(r, a),
    o = Math.max(8, e.fontSize * i),
    s = e.text.split(`
`),
    d = document.createElement("canvas").getContext("2d");
  d && (d.font = `${o}px Inter, "PingFang SC", "Microsoft YaHei", sans-serif`);
  const u = Math.max(...s.map(h => (d == null ? void 0 : d.measureText(h || " ").width) ?? o * .62));
  return {
    left: e.x * r,
    top: e.y * a - o / 2,
    width: Math.max(32, Math.ceil(u + 4)),
    height: Math.max(o * 1.2, s.length * o * 1.2),
    fontSize: o
  };
}

function BIo(e) {
  const t = Math.max(8, e.fontSize),
    n = e.text.split(`
`),
    a = document.createElement("canvas").getContext("2d");
  a && (a.font = `${t}px Inter, "PingFang SC", "Microsoft YaHei", sans-serif`);
  const i = Math.max(...n.map(s => (a == null ? void 0 : a.measureText(s || " ").width) ?? t * .62), t),
    o = Math.max(t * 1.2, n.length * t * 1.2);
  return {
    width: i,
    height: o,
    fontSize: t
  };
}

function FIo(e, t, n, r, a) {
  const i = t.x,
    o = t.y - n / 2;
  return e === "nw" ? {
    x: i + r,
    y: o + a
  } : e === "ne" ? {
    x: i,
    y: o + a
  } : e === "sw" ? {
    x: i + r,
    y: o
  } : {
    x: i,
    y: o
  };
}

function zIo(e, t, n, r, a) {
  const i = t.x,
    o = t.y - n / 2;
  return e === "nw" ? {
    x: i,
    y: o
  } : e === "ne" ? {
    x: i + r,
    y: o
  } : e === "sw" ? {
    x: i,
    y: o + a
  } : {
    x: i + r,
    y: o + a
  };
}

const UIo = [{
  corner: "nw",
  className: "-left-1 -top-1",
  cursor: "nwse-resize"
}, {
  corner: "ne",
  className: "-right-1 -top-1",
  cursor: "nesw-resize"
}, {
  corner: "sw",
  className: "-left-1 -bottom-1",
  cursor: "nesw-resize"
}, {
  corner: "se",
  className: "-right-1 -bottom-1",
  cursor: "nwse-resize"
}];

function $Io(e) {
  return e === "brush" ? "画笔" : e === "rectangle" ? "矩形标注" : e === "eraser" ? "橡皮擦" : "文字";
}

function GIo({
  imageUrl: e,
  imageName: t = "图片",
  initialDocument: n,
  onCancel: r,
  onSave: a,
  isDark: i = !0
}) {
  on();
  const o = g.useRef(null),
    s = g.useRef(null),
    l = g.useRef(null),
    d = g.useRef(null),
    u = g.useRef(null),
    h = g.useRef(null),
    [p, m] = g.useState(e),
    [f, y] = g.useState({
      width: 1,
      height: 1
    }),
    [b, v] = g.useState({
      width: 1,
      height: 1
    }),
    [_, w] = g.useState("brush"),
    [k, A] = g.useState(NIo),
    [S, C] = g.useState(jIo),
    [I, E] = g.useState(!1),
    [M, T] = g.useState((n == null ? void 0 : n.elements) ?? []),
    [P, R] = g.useState([]),
    [j, B] = g.useState([]),
    [F, N] = g.useState(null),
    [G, z] = g.useState(null),
    [V, O] = g.useState(null),
    [L, D] = g.useState(null),
    [U, H] = g.useState(!1);
  g.useEffect(() => {
    let me = !1;
    return m(e), (async () => {
      try {
        const Ae = await fetch(e, {
          cache: "no-store"
        });
        if (!Ae.ok) return;
        const Fe = await Ae.blob();
        if (me || !Fe.size) return;
        const Me = URL.createObjectURL(Fe);
        h.current && URL.revokeObjectURL(h.current), h.current = Me, m(Me);
      } catch {}
    })(), () => {
      me = !0, h.current && (URL.revokeObjectURL(h.current), h.current = null);
    };
  }, [e]), g.useLayoutEffect(() => {
    const me = o.current;
    if (!me) return;
    const Ae = () => {
      const Me = me.getBoundingClientRect();
      v({
        width: Math.max(1, Me.width),
        height: Math.max(1, Me.height)
      });
    };
    Ae();
    const Fe = new ResizeObserver(Ae);
    return Fe.observe(me), () => Fe.disconnect();
  }, [p]);
  const Y = g.useCallback(() => {
    const me = s.current;
    if (!me) return;
    const Ae = Math.max(1, Math.round(f.width)),
      Fe = Math.max(1, Math.round(f.height));
    (me.width !== Ae || me.height !== Fe) && (me.width = Ae, me.height = Fe);
    const Me = me.getContext("2d");
    if (!Me) return;
    Me.clearRect(0, 0, Ae, Fe);
    const Re = G ? M.filter($e => $e.id !== G.element.id) : M;
    fvn(Me, F ? [...Re, F] : Re);
  }, [F, M, f.height, f.width, G]);
  g.useLayoutEffect(Y, [Y, b.width, b.height]);
  const K = g.useCallback(me => {
      T(Ae => xdt(Ae, me) ? Ae : (R(Fe => [...Fe, Ae]), B([]), me));
    }, []),
    W = g.useCallback(me => {
      u.current = me, z(me);
    }, []),
    Q = g.useCallback(() => {
      const me = u.current;
      me && (O(me.element.text.trim() ? me.element.id : null), T(Ae => {
        const Fe = WPe(Ae, me);
        return xdt(Ae, Fe) ? Ae : (R(Me => [...Me, Ae]), B([]), Fe);
      }), W(null));
    }, [W]),
    q = g.useCallback(() => {
      var Ae;
      const me = u.current;
      O(((Ae = me == null ? void 0 : me.original) == null ? void 0 : Ae.id) ?? null), W(null);
    }, [W]),
    ne = g.useCallback(me => {
      const Ae = u.current;
      Ae && W({
        ...Ae,
        element: {
          ...Ae.element,
          ...me
        }
      });
    }, [W]),
    de = g.useCallback((me, Ae, Fe) => {
      W({
        element: me,
        original: Ae
      }), requestAnimationFrame(() => {
        const Re = l.current;
        Re && (Re.focus({
          preventScroll: !0
        }), Fe === "all" ? Re.select() : Re.setSelectionRange(Fe, Fe));
      });
    }, [W]),
    le = g.useCallback(me => {
      me !== "text" && Q(), E(!1), w(me), me !== "text" && (O(null), D(null));
    }, [Q]),
    J = g.useCallback(me => {
      const Ae = me.currentTarget.getBoundingClientRect();
      return {
        x: (me.clientX - Ae.left) / Math.max(1, Ae.width) * f.width,
        y: (me.clientY - Ae.top) / Math.max(1, Ae.height) * f.height
      };
    }, [f.height, f.width]),
    pe = g.useCallback((me, Ae) => {
      const Fe = s.current;
      if (!Fe) return {
        x: 0,
        y: 0
      };
      const Me = Fe.getBoundingClientRect();
      return {
        x: (me - Me.left) / Math.max(1, Me.width) * f.width,
        y: (Ae - Me.top) / Math.max(1, Me.height) * f.height
      };
    }, [f.height, f.width]),
    ce = g.useMemo(() => Math.max(1, S * (f.width / Math.max(1, b.width))), [S, b.width, f.width]),
    we = g.useCallback(me => {
      Q();
      const Ae = {
        id: _dt(),
        type: "text",
        x: me.x,
        y: me.y,
        text: "我的文本",
        color: k,
        fontSize: Math.max(ce * 7, f.width * .03)
      };
      O(Ae.id), D(Ae.id), T(Fe => {
        const Me = [...Fe, Ae];
        return R(Re => [...Re, Fe]), B([]), Me;
      });
    }, [k, Q, ce, f.width]),
    X = g.useCallback(() => {
      le("text");
      const me = WPe(M, u.current).filter(Fe => Fe.type === "text").length,
        Ae = Math.max(f.width * .045, 28);
      we({
        x: f.width * .42 + me % 5 * Ae,
        y: f.height * .36 + Math.floor(me / 5) * Ae
      });
    }, [we, M, le, f.height, f.width]),
    Z = g.useMemo(() => G ? gvn(G.element, f, b) : null, [b.height, b.width, f.height, f.width, G]),
    re = g.useMemo(() => {
      const me = M.find(Ae => Ae.id === V);
      return (me == null ? void 0 : me.type) === "text" ? me : null;
    }, [M, V]),
    fe = g.useMemo(() => re ? gvn(re, f, b) : null, [b, re, f]),
    ye = g.useCallback(me => {
      const Ae = Math.max(ce * 1.8, f.width * .012);
      T(Fe => LIo(Fe, me, Ae));
    }, [ce, f.width]),
    ie = me => {
      if (me.button !== 0 || U) return;
      me.preventDefault(), me.stopPropagation();
      const Ae = J(me);
      if (_ === "text") {
        const Me = WPe(M, u.current);
        u.current && Q();
        const Re = Math.max(ce * 1.5, f.width / Math.max(1, b.width) * 6),
          $e = kdt(Me, Ae, Re);
        $e ? (O($e.id), D($e.id), me.currentTarget.setPointerCapture(me.pointerId), d.current = {
          type: "moveText",
          pointerId: me.pointerId,
          id: $e.id,
          start: Ae,
          origin: {
            x: $e.x,
            y: $e.y
          },
          before: Me,
          moved: !1
        }) : (O(null), D(null));
        return;
      }
      if (Q(), me.currentTarget.setPointerCapture(me.pointerId), _ === "eraser") {
        d.current = {
          type: "erase",
          pointerId: me.pointerId,
          before: M
        }, ye(Ae);
        return;
      }
      if (_ === "rectangle") {
        d.current = {
          type: "rectangle",
          pointerId: me.pointerId,
          start: Ae
        }, N({
          id: _dt(),
          type: "rectangle",
          x: Ae.x,
          y: Ae.y,
          width: 0,
          height: 0,
          color: k,
          strokeWidth: ce,
          dash: Math.max(ce * 1.4, f.width * .004)
        });
        return;
      }
      const Fe = [Ae];
      d.current = {
        type: "stroke",
        pointerId: me.pointerId,
        points: Fe
      }, N({
        id: _dt(),
        type: "stroke",
        points: Fe,
        color: k,
        width: ce
      });
    },
    ae = g.useCallback((me, Ae) => {
      const Fe = zIo(me.corner, me.origin, me.startFontSize, me.startWidth, me.startHeight),
        Me = FIo(me.corner, me.origin, me.startFontSize, me.startWidth, me.startHeight),
        Re = Math.max(1, Math.hypot(Fe.x - Me.x, Fe.y - Me.y)),
        $e = Math.hypot(Ae.x - Me.x, Ae.y - Me.y),
        rt = Math.max(.12, $e / Re),
        nt = Math.max(8, Math.min(f.width * .65, me.startFontSize * rt));
      if (Math.abs(nt - me.startFontSize) < .4 && !me.scaled) return;
      me.scaled = !0;
      const ze = nt / me.startFontSize,
        Le = me.startWidth * ze,
        Ke = me.startHeight * ze;
      let Xe = me.origin.x,
        De = me.origin.y - me.startFontSize / 2;
      me.corner === "nw" ? (Xe = Me.x - Le, De = Me.y - Ke) : me.corner === "ne" ? (Xe = Me.x, De = Me.y - Ke) : me.corner === "sw" ? (Xe = Me.x - Le, De = Me.y) : (Xe = Me.x, De = Me.y);
      const Ye = Xe,
        Ce = De + nt / 2;
      T(Ve => Ve.map(it => it.id === me.id && it.type === "text" ? {
        ...it,
        x: Ye,
        y: Ce,
        fontSize: nt
      } : it));
      const He = nt / 7 / (f.width / Math.max(1, b.width));
      C(Math.max(1, Math.min(100, He)));
    }, [b.width, f.width]),
    be = me => {
      var Me;
      const Ae = d.current;
      if (!Ae) {
        if (_ === "text") {
          const Re = J(me),
            $e = Math.max(ce * 1.5, f.width / Math.max(1, b.width) * 6);
          D(((Me = kdt(M, Re, $e)) == null ? void 0 : Me.id) ?? null);
        }
        return;
      }
      if (Ae.pointerId !== me.pointerId) return;
      me.preventDefault();
      const Fe = J(me);
      if (Ae.type === "moveText") {
        const Re = Fe.x - Ae.start.x,
          $e = Fe.y - Ae.start.y,
          rt = f.width / Math.max(1, b.width) * 2;
        if (!Ae.moved && Math.hypot(Re, $e) < rt) return;
        Ae.moved = !0, T(nt => nt.map(ze => ze.id === Ae.id && ze.type === "text" ? {
          ...ze,
          x: Ae.origin.x + Re,
          y: Ae.origin.y + $e
        } : ze));
        return;
      }
      if (Ae.type === "scaleText") {
        ae(Ae, Fe);
        return;
      }
      if (Ae.type === "erase") {
        ye(Fe);
        return;
      }
      if (Ae.type === "rectangle") {
        const Re = Math.min(Ae.start.x, Fe.x),
          $e = Math.min(Ae.start.y, Fe.y);
        N(rt => (rt == null ? void 0 : rt.type) === "rectangle" ? {
          ...rt,
          x: Re,
          y: $e,
          width: Math.abs(Fe.x - Ae.start.x),
          height: Math.abs(Fe.y - Ae.start.y)
        } : rt);
        return;
      }
      Ae.points.push(Fe), N(Re => (Re == null ? void 0 : Re.type) === "stroke" ? {
        ...Re,
        points: [...Ae.points]
      } : Re);
    },
    Ee = me => {
      const Ae = d.current;
      if (!(!Ae || Ae.pointerId !== me.pointerId)) {
        me.preventDefault(), d.current = null;
        try {
          me.currentTarget.releasePointerCapture(me.pointerId);
        } catch {}
        if (Ae.type === "erase") {
          T(Fe => (xdt(Ae.before, Fe) || (R(Me => [...Me, Ae.before]), B([])), Fe));
          return;
        }
        if (Ae.type === "moveText" || Ae.type === "scaleText") {
          (Ae.type === "moveText" && Ae.moved || Ae.type === "scaleText" && Ae.scaled) && (R(Fe => [...Fe, Ae.before]), B([]));
          return;
        }
        F && K([...M, F]), N(null);
      }
    },
    xe = me => {
      if (_ !== "text" || U) return;
      me.preventDefault(), me.stopPropagation();
      const Ae = me.currentTarget.getBoundingClientRect(),
        Fe = {
          x: (me.clientX - Ae.left) / Math.max(1, Ae.width) * f.width,
          y: (me.clientY - Ae.top) / Math.max(1, Ae.height) * f.height
        },
        Me = Math.max(ce * 1.5, f.width / Math.max(1, b.width) * 6),
        Re = kdt(M, Fe, Me);
      Re && (O(Re.id), de(Re, Re, OIo(Re, Fe)));
    },
    he = (me, Ae) => {
      if (!re || U) return;
      me.preventDefault(), me.stopPropagation();
      const Fe = BIo(re);
      me.currentTarget.setPointerCapture(me.pointerId), d.current = {
        type: "scaleText",
        pointerId: me.pointerId,
        id: re.id,
        corner: Ae,
        origin: {
          x: re.x,
          y: re.y
        },
        startFontSize: re.fontSize,
        startWidth: Fe.width,
        startHeight: Fe.height,
        before: M,
        scaled: !1
      };
    },
    ue = me => {
      const Ae = d.current;
      !Ae || Ae.type !== "scaleText" || Ae.pointerId !== me.pointerId || (me.preventDefault(), ae(Ae, pe(me.clientX, me.clientY)));
    },
    ge = me => {
      const Ae = d.current;
      if (!(!Ae || Ae.type !== "scaleText" || Ae.pointerId !== me.pointerId)) {
        me.preventDefault(), d.current = null;
        try {
          me.currentTarget.releasePointerCapture(me.pointerId);
        } catch {}
        Ae.scaled && (R(Fe => [...Fe, Ae.before]), B([]));
      }
    },
    _e = g.useCallback(() => {
      R(me => {
        const Ae = me[me.length - 1];
        return Ae ? (T(Fe => (B(Me => [...Me, Fe]), Ae)), me.slice(0, -1)) : me;
      });
    }, []),
    ke = g.useCallback(() => {
      B(me => {
        const Ae = me[me.length - 1];
        return Ae ? (T(Fe => (R(Me => [...Me, Fe]), Ae)), me.slice(0, -1)) : me;
      });
    }, []),
    ve = g.useCallback(() => {
      const me = u.current,
        Ae = (me == null ? void 0 : me.element.id) ?? V;
      return Ae ? (W(null), O(null), D(null), T(Fe => {
        const Me = Fe.filter(Re => Re.id !== Ae);
        return Me.length === Fe.length ? Fe : (R(Re => [...Re, Fe]), B([]), Me);
      }), !0) : !1;
    }, [V, W]);
  g.useEffect(() => {
    const me = Ae => {
      if (Ae.key === "Delete" || Ae.key === "Del" || Ae.code === "Delete" || Ae.key === "Backspace" || Ae.code === "Backspace") {
        const $e = Ae.target;
        if ($e instanceof HTMLInputElement || $e instanceof HTMLTextAreaElement || $e instanceof HTMLElement && $e.isContentEditable) {
          Ae.stopPropagation();
          return;
        }
        Ae.preventDefault(), Ae.stopPropagation(), Ae.stopImmediatePropagation(), ve();
        return;
      }
      const Me = Ae.target;
      Me instanceof HTMLInputElement || Me instanceof HTMLTextAreaElement || Me instanceof HTMLElement && Me.isContentEditable || !(Ae.ctrlKey || Ae.metaKey) || Ae.key.toLowerCase() !== "z" || (Ae.preventDefault(), Ae.shiftKey ? ke() : _e());
    };
    return window.addEventListener("keydown", me, !0), () => window.removeEventListener("keydown", me, !0);
  }, [ve, ke, _e]);
  const Te = g.useCallback(async () => {
      if (U) return;
      const me = o.current;
      if (!me || me.naturalWidth <= 0 || me.naturalHeight <= 0) return;
      const Ae = WPe(M, u.current);
      u.current && Q(), H(!0);
      try {
        const Fe = document.createElement("canvas");
        Fe.width = me.naturalWidth, Fe.height = me.naturalHeight;
        const Me = Fe.getContext("2d");
        if (!Me) throw new Error("无法创建标注画布");
        Me.drawImage(me, 0, 0, Fe.width, Fe.height);
        const Re = Fe.width / Math.max(1, f.width),
          $e = Fe.height / Math.max(1, f.height);
        Me.save(), Me.scale(Re, $e), fvn(Me, Ae), Me.restore();
        const rt = await new Promise((nt, ze) => {
          Fe.toBlob(Le => Le ? nt(Le) : ze(new Error("标注图片导出失败")), "image/png");
        });
        await a(rt, {
          version: 1,
          sourceWidth: f.width,
          sourceHeight: f.height,
          elements: Ae
        });
      } catch (Fe) {
        alert(Fe instanceof Error ? x(Fe.message) : x("标注图片导出失败"));
      } finally {
        H(!1);
      }
    }, [Q, M, U, a, f.height, f.width]),
    Ne = me => `flex h-8 w-8 items-center justify-center rounded-full transition-colors ${_ === me ? i ? "bg-white/16 text-white" : "bg-[#18181b] text-white" : i ? "text-zinc-200 hover:bg-white/10 hover:text-white" : "text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900"}`;
  return Da.createPortal(c.jsx("div", {
    className: `fixed inset-0 z-[10050] overflow-hidden backdrop-blur-[1px] ${i ? "bg-black/55" : "bg-zinc-300/45"}`,
    "data-image-annotation-editor": !0,
    onContextMenu: me => me.preventDefault(),
    children: c.jsx("div", {
      className: "pointer-events-none absolute inset-0 flex items-center justify-center px-16 pb-10 pt-28",
      children: c.jsxs("div", {
        className: "pointer-events-auto relative max-h-full max-w-full",
        children: [c.jsxs("div", {
          className: `absolute bottom-full left-1/2 z-20 mb-4 flex -translate-x-1/2 items-center gap-1 rounded-full border p-2 ${i ? "border-white/10 bg-[#262626]/95 text-zinc-100 backdrop-blur-xl" : "border-black/10 bg-white text-zinc-800"}`,
          children: [c.jsx("button", {
            type: "button",
            className: `flex h-8 w-8 items-center justify-center rounded-full transition-colors ${i ? "text-zinc-400 hover:bg-white/10 hover:text-white" : "text-zinc-400 hover:bg-zinc-200 hover:text-zinc-900"}`,
            "aria-label": x("退出标注"),
            title: x("退出标注"),
            onClick: r,
            children: c.jsx(Na, {
              size: 18
            })
          }), c.jsx("div", {
            className: `mx-1 h-6 w-px ${i ? "bg-white/10" : "bg-black/10"}`
          }), c.jsxs("div", {
            className: `flex items-center gap-1 rounded-full p-1 ${i ? "bg-black/25" : "bg-zinc-100"}`,
            children: [c.jsx("button", {
              type: "button",
              className: Ne("brush"),
              "aria-label": x("画笔"),
              title: x("画笔"),
              onClick: () => le("brush"),
              children: c.jsx(KHe, {
                size: 18
              })
            }), c.jsx("button", {
              type: "button",
              className: Ne("rectangle"),
              "aria-label": x("矩形标注"),
              title: x("矩形标注"),
              onClick: () => le("rectangle"),
              children: c.jsx(A5e, {
                size: 18
              })
            }), c.jsx("button", {
              type: "button",
              className: Ne("eraser"),
              "aria-label": x("橡皮擦"),
              title: x("橡皮擦"),
              onClick: () => le("eraser"),
              children: c.jsx(uI, {
                size: 18
              })
            })]
          }), c.jsx("button", {
            type: "button",
            className: Ne("text"),
            "aria-label": x("文字"),
            title: x("点击创建文字"),
            onClick: X,
            children: c.jsx(_U, {
              size: 18
            })
          }), c.jsx("div", {
            className: `mx-1 h-6 w-px ${i ? "bg-white/10" : "bg-black/10"}`
          }), c.jsxs("div", {
            className: "relative flex items-center px-1",
            children: [c.jsx("button", {
              type: "button",
              "data-preserve-text-edit": !0,
              className: `h-5 w-5 rounded-full border ${i ? "border-white/35" : "border-black/20"}`,
              style: {
                backgroundColor: k
              },
              "aria-label": x("标注颜色"),
              title: x("标注颜色"),
              onClick: () => E(me => !me)
            }), I ? c.jsx("div", {
              className: `absolute left-1/2 top-full mt-4 flex -translate-x-1/2 flex-col gap-2 rounded-full border p-2 ${i ? "border-white/10 bg-[#262626]/95" : "border-black/10 bg-white"}`,
              children: RIo.map(me => c.jsx("button", {
                type: "button",
                "data-preserve-text-edit": !0,
                className: `h-6 w-6 rounded-full border transition-transform hover:scale-110 ${k === me.value ? i ? "border-white ring-2 ring-white/30" : "border-zinc-900 ring-2 ring-zinc-900/20" : i ? "border-white/20" : "border-black/15"}`,
                style: {
                  backgroundColor: me.value
                },
                "aria-label": x(me.name),
                title: x(me.name),
                onClick: () => {
                  A(me.value), ne({
                    color: me.value
                  }), E(!1), requestAnimationFrame(() => {
                    var Ae;
                    (Ae = l.current) == null || Ae.focus({
                      preventScroll: !0
                    });
                  });
                }
              }, me.value))
            }) : null]
          }), c.jsxs("div", {
            className: "flex h-8 w-24 items-center gap-2 px-1",
            children: [c.jsx("span", {
              className: "text-xs text-zinc-400",
              children: "〰"
            }), c.jsx("input", {
              type: "range",
              "data-preserve-text-edit": !0,
              min: 1,
              max: 100,
              value: S,
              "aria-label": x(_ === "text" ? "文字大小" : "画笔粗细"),
              className: `annotation-range min-w-0 flex-1 ${i ? "accent-white" : "accent-zinc-800"}`,
              onChange: me => {
                const Ae = Number(me.currentTarget.value);
                C(Ae), _ === "text" && ne({
                  fontSize: Math.max(Ae * 7 * (f.width / Math.max(1, b.width)), f.width * .03)
                });
              },
              onPointerUp: () => {
                u.current && requestAnimationFrame(() => {
                  var me;
                  (me = l.current) == null || me.focus({
                    preventScroll: !0
                  });
                });
              }
            })]
          }), c.jsx("div", {
            className: `mx-1 h-6 w-px ${i ? "bg-white/10" : "bg-black/10"}`
          }), c.jsx("button", {
            type: "button",
            className: `flex h-8 w-8 items-center justify-center rounded-full ${i ? "text-zinc-200 hover:bg-white/10 disabled:text-zinc-600" : "text-zinc-600 hover:bg-zinc-200 disabled:text-zinc-300"}`,
            "aria-label": x("撤销"),
            title: x("撤销 Ctrl+Z"),
            disabled: P.length === 0,
            onClick: _e,
            children: c.jsx(d_, {
              size: 18
            })
          }), c.jsx("button", {
            type: "button",
            className: `flex h-8 w-8 items-center justify-center rounded-full ${i ? "text-zinc-200 hover:bg-white/10 disabled:text-zinc-600" : "text-zinc-600 hover:bg-zinc-200 disabled:text-zinc-300"}`,
            "aria-label": x("重做"),
            title: x("重做 Ctrl+Shift+Z"),
            disabled: j.length === 0,
            onClick: ke,
            children: c.jsx(J$, {
              size: 18
            })
          }), c.jsx("button", {
            type: "button",
            className: `ml-1 flex h-8 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-4 text-xs font-medium transition-colors disabled:cursor-wait disabled:opacity-60 ${i ? "bg-white text-zinc-900 hover:bg-zinc-200" : "bg-[#18181b] text-white hover:bg-black"}`,
            disabled: U,
            onClick: () => void Te(),
            children: x(U ? "保存中" : "保存")
          })]
        }), c.jsxs("div", {
          className: `relative max-h-[72vh] max-w-[78vw] overflow-hidden rounded-[30px] border border-cyan-500/45 ${i ? "bg-zinc-900" : "bg-white"}`,
          children: [c.jsx("img", {
            ref: o,
            src: p,
            alt: t,
            draggable: !1,
            crossOrigin: p.startsWith("http") ? "anonymous" : void 0,
            className: "block max-h-[72vh] max-w-[78vw] select-none object-contain",
            onLoad: me => {
              const Ae = me.currentTarget;
              y({
                width: Math.max(1, (n == null ? void 0 : n.sourceWidth) || Ae.naturalWidth),
                height: Math.max(1, (n == null ? void 0 : n.sourceHeight) || Ae.naturalHeight)
              });
            }
          }), c.jsx("canvas", {
            ref: s,
            tabIndex: -1,
            className: "absolute inset-0 h-full w-full touch-none select-none",
            style: {
              cursor: _ === "text" ? L || V ? "move" : "default" : _ === "eraser" ? "cell" : "crosshair"
            },
            "aria-label": x("{0}标注画布", $Io(_)),
            onPointerDown: ie,
            onPointerMove: be,
            onPointerUp: Ee,
            onPointerCancel: Ee,
            onPointerLeave: () => {
              d.current || D(null);
            },
            onDoubleClick: xe
          }), _ === "text" && re && fe && !G ? c.jsxs("div", {
            "data-annotation-text-selection": !0,
            className: "pointer-events-none absolute z-[5] border border-[#9fc5e8]",
            style: {
              left: fe.left - 4,
              top: fe.top - 3,
              width: fe.width + 8,
              height: fe.height + 6
            },
            children: [c.jsx("div", {
              className: "absolute bottom-full left-1/2 h-7 w-px -translate-x-1/2 bg-[#9fc5e8]"
            }), c.jsx("div", {
              className: "absolute bottom-[calc(100%+25px)] left-1/2 h-2 w-2 -translate-x-1/2 rounded-[1px] border border-[#9fc5e8] bg-[#f4e58f]"
            }), [["left-1/2 -translate-x-1/2", "-top-1"], ["-left-1", "top-1/2 -translate-y-1/2"], ["-right-1", "top-1/2 -translate-y-1/2"], ["left-1/2 -translate-x-1/2", "-bottom-1"]].map(([me, Ae], Fe) => c.jsx("div", {
              className: `absolute h-2 w-2 rounded-[1px] border border-[#9fc5e8] bg-[#f4e58f] ${me} ${Ae}`
            }, Fe)), UIo.map(({
              corner: me,
              className: Ae,
              cursor: Fe
            }) => c.jsx("button", {
              type: "button",
              "aria-label": x("拖动四角放大文字"),
              title: x("拖动四角放大文字"),
              className: `pointer-events-auto absolute h-3 w-3 appearance-none p-0 rounded-[1px] border border-[#9fc5e8] bg-[#f4e58f] touch-none ${Ae}`,
              style: {
                cursor: Fe
              },
              onPointerDown: Me => he(Me, me),
              onPointerMove: ue,
              onPointerUp: ge,
              onPointerCancel: ge,
              onDoubleClick: Me => Me.stopPropagation()
            }, me))]
          }) : null, G && Z ? c.jsx("textarea", {
            ref: l,
            value: G.element.text,
            "aria-label": x("编辑标注文字"),
            spellCheck: !1,
            rows: Math.max(1, G.element.text.split(`
`).length),
            className: "absolute z-10 m-0 resize-none overflow-hidden border-0 bg-transparent p-0 font-sans font-normal text-left outline-none selection:bg-blue-500/35",
            style: {
              left: Z.left,
              top: Z.top,
              width: Z.width,
              height: Z.height,
              color: G.element.color,
              caretColor: G.element.color,
              fontSize: Z.fontSize,
              lineHeight: 1.2,
              whiteSpace: "pre"
            },
            onChange: me => ne({
              text: me.currentTarget.value
            }),
            onBlur: me => {
              const Ae = me.relatedTarget;
              Ae instanceof Element && Ae.closest("[data-preserve-text-edit]") || Q();
            },
            onPointerDown: me => me.stopPropagation(),
            onClick: me => me.stopPropagation(),
            onKeyDown: me => {
              var Ae, Fe;
              if (me.stopPropagation(), me.key === "Escape") {
                me.preventDefault(), q(), (Ae = s.current) == null || Ae.focus({
                  preventScroll: !0
                });
                return;
              }
              me.key === "Enter" && (me.ctrlKey || me.metaKey) && (me.preventDefault(), Q(), (Fe = s.current) == null || Fe.focus({
                preventScroll: !0
              }));
            }
          }) : null]
        })]
      })
    })
  }), document.body);
}

const VIo = Object.freeze(Object.defineProperty({
    __proto__: null,
    ImageAnnotationEditor: GIo
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  yvn = ({
    imageUrl: e,
    imageName: t = "图片",
    selection: n,
    onSelectionChange: r,
    onClose: a,
    onConfirmDownstreamInpaintCrop: i,
    isDark: o = !0
  }) => {
    on();
    const s = g.useRef(null),
      l = g.useRef(null),
      [d, u] = g.useState({
        width: 0,
        height: 0
      }),
      [h, p] = g.useState({
        width: 0,
        height: 0
      }),
      m = String(e || "").trim(),
      f = !!n && n.width >= 8 && n.height >= 8 && typeof i == "function",
      y = g.useCallback(() => {
        const v = l.current;
        if (!v) return;
        const _ = v.getBoundingClientRect(),
          w = Math.round(_.width),
          k = Math.round(_.height);
        w > 0 && k > 0 && p({
          width: w,
          height: k
        });
      }, []);
    g.useLayoutEffect(() => {
      y();
      const v = l.current;
      if (!v) return;
      const _ = new ResizeObserver(() => y());
      return _.observe(v), window.addEventListener("resize", y), () => {
        _.disconnect(), window.removeEventListener("resize", y);
      };
    }, [y, m]), g.useEffect(() => {
      const v = _ => {
        _.key === "Escape" && (_.preventDefault(), _.stopPropagation(), a());
      };
      return window.addEventListener("keydown", v, !0), () => window.removeEventListener("keydown", v, !0);
    }, [a]);
    const b = g.useCallback(() => {
      f && (i == null || i());
    }, [f, i]);
    return m ? Da.createPortal(c.jsx("div", {
      className: `fixed inset-0 z-[10050] overflow-hidden backdrop-blur-[1px] ${o ? "bg-black/55" : "bg-zinc-300/45"}`,
      "data-crop-select-fullscreen-editor": !0,
      onContextMenu: v => v.preventDefault(),
      onMouseDown: v => v.stopPropagation(),
      onPointerDown: v => v.stopPropagation(),
      children: c.jsx("div", {
        className: "pointer-events-none absolute inset-0 flex items-center justify-center px-16 pb-10 pt-28",
        children: c.jsxs("div", {
          className: "pointer-events-auto relative max-h-full max-w-full",
          children: [c.jsxs("div", {
            className: `absolute bottom-full left-1/2 z-20 mb-4 flex -translate-x-1/2 items-center gap-1 rounded-full border p-2 ${o ? "border-white/10 bg-[#262626]/95 text-zinc-100 backdrop-blur-xl" : "border-black/10 bg-white text-zinc-800"}`,
            children: [c.jsx("button", {
              type: "button",
              className: `flex h-8 w-8 items-center justify-center rounded-full transition-colors ${o ? "text-zinc-400 hover:bg-white/10 hover:text-white" : "text-zinc-400 hover:bg-zinc-200 hover:text-zinc-900"}`,
              "aria-label": x("退出框选"),
              title: x("退出框选"),
              onClick: a,
              children: c.jsx(Na, {
                size: 18
              })
            }), c.jsx("div", {
              className: `mx-1 h-6 w-px ${o ? "bg-white/10" : "bg-black/10"}`
            }), c.jsx("span", {
              className: `px-2 text-xs font-medium whitespace-nowrap ${o ? "text-zinc-200" : "text-zinc-700"}`,
              children: x("框选裁剪区域")
            }), c.jsx("div", {
              className: `mx-1 h-6 w-px ${o ? "bg-white/10" : "bg-black/10"}`
            }), c.jsxs("button", {
              type: "button",
              className: `ml-1 flex h-8 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${o ? "bg-white text-zinc-900 hover:bg-zinc-200" : "bg-[#18181b] text-white hover:bg-black"}`,
              disabled: !f,
              title: x(f ? "确认并创建下游裁剪局部重绘节点" : "请先框选有效区域（≥8×8 像素）"),
              onClick: b,
              children: [c.jsx(io, {
                size: 14,
                strokeWidth: 2.5
              }), x("确认")]
            })]
          }), c.jsxs("div", {
            ref: s,
            className: `relative inline-block max-h-[72vh] max-w-[78vw] overflow-hidden rounded-[30px] border border-cyan-500/45 ${o ? "bg-zinc-900" : "bg-white"}`,
            children: [c.jsx("img", {
              ref: l,
              src: m,
              alt: t,
              draggable: !1,
              crossOrigin: m.startsWith("http") ? "anonymous" : void 0,
              className: "block max-h-[72vh] max-w-[78vw] select-none object-contain",
              onLoad: v => {
                const _ = v.currentTarget;
                u({
                  width: Math.max(1, _.naturalWidth),
                  height: Math.max(1, _.naturalHeight)
                }), requestAnimationFrame(y);
              }
            }), d.width > 0 && d.height > 0 && h.width > 0 && h.height > 0 && c.jsx(rGe, {
              containerRef: s,
              imageAreaRef: l,
              imgNaturalWidth: d.width,
              imgNaturalHeight: d.height,
              containerWidth: h.width,
              containerHeight: h.height,
              objectFit: "cover",
              selection: n,
              onSelectionChange: r,
              isDark: o,
              onConfirmDownstreamInpaintCrop: i ? () => {
                i();
              } : void 0
            })]
          })]
        })
      })
    }), document.body) : null;
  },
  HIo = Object.freeze(Object.defineProperty({
    __proto__: null,
    CropSelectFullscreenEditor: yvn,
    default: yvn
  }, Symbol.toStringTag, {
    value: "Module"
  }));

function $wr({
  configs: e,
  selectedId: t,
  isDark: n,
  variant: r,
  label: a,
  onSelect: i
}) {
  return on(), e.length === 0 ? c.jsx("div", {
    className: `px-2 py-3 text-center text-[11px] ${n ? "text-zinc-500" : "text-zinc-400"}`,
    children: x("当前渠道下没有模型")
  }) : c.jsx(c.Fragment, {
    children: e.map(o => c.jsx("button", {
      type: "button",
      ...(t === o.id ? {
        [Md]: "true"
      } : {}),
      [qk]: o.id,
      onClick: s => {
        s.stopPropagation(), i(o.id);
      },
      className: `w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded text-left ${r === "eraser" ? "text-xs " : ""}transition-colors ${n ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-zinc-100 text-zinc-700"} ${t === o.id ? n ? "bg-zinc-800" : "bg-zinc-100" : ""}`,
      children: c.jsxs("span", {
        className: "flex min-w-0 items-center gap-1.5 leading-none",
        children: [c.jsx(Mp, {
          modelId: o.id,
          kind: "image",
          isDark: n,
          config: o,
          size: 13,
          fallback: c.jsx(lo, {
            size: 13,
            className: "shrink-0 block",
            "aria-hidden": !0
          })
        }), c.jsx("span", {
          className: r === "edit" ? "text-xs font-medium whitespace-nowrap leading-none self-center" : "font-medium truncate leading-none self-center",
          children: a(o)
        })]
      })
    }, o.id))
  });
}

const bvn = ["#d5d2ca", "#f2efe8"];

function Adt(e, t = !1) {
  return `node-dropdown-button flex items-center gap-1.5 h-7 px-2.5 rounded-[9px] text-[11px] font-medium border whitespace-nowrap transition-colors ${t ? e ? "bg-white/12 text-white border-white/45" : "bg-black/10 text-zinc-950 border-zinc-400" : e ? "bg-transparent hover:bg-white/5 text-white border-white/30 hover:border-white/45" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`;
}

function WIo(e, t, n) {
  if (t.length) {
    if (e.beginPath(), t.length === 1) {
      e.arc(t[0].x, t[0].y, n / 2, 0, Math.PI * 2), e.fill();
      return;
    }
    e.moveTo(t[0].x, t[0].y);
    for (let r = 1; r < t.length; r += 1) e.lineTo(t[r].x, t[r].y);
    e.lineWidth = n, e.stroke();
  }
}

function vvn(e, t) {
  const n = e.getContext("2d");
  n && (n.clearRect(0, 0, e.width, e.height), n.lineCap = "round", n.lineJoin = "round", t.forEach(r => {
    if (n.globalCompositeOperation = r.action === "subtract" ? "destination-out" : "source-over", n.fillStyle = "#fff", n.strokeStyle = "#fff", r.kind === "stroke") {
      WIo(n, r.points, r.width);
      return;
    }
    const a = Math.min(r.start.x, r.end.x),
      i = Math.min(r.start.y, r.end.y),
      o = Math.abs(r.end.x - r.start.x),
      s = Math.abs(r.end.y - r.start.y);
    n.fillRect(a, i, o, s);
  }), n.globalCompositeOperation = "source-over");
}

function qIo(e) {
  const t = document.createElement("canvas");
  t.width = 48, t.height = 48;
  const n = t.getContext("2d", {
    willReadFrequently: !0
  });
  if (!n) return !1;
  n.drawImage(e, 0, 0, t.width, t.height);
  const r = n.getImageData(0, 0, t.width, t.height).data;
  for (let a = 3; a < r.length; a += 4) if (r[a] > 4) return !0;
  return !1;
}

function wvn(e, t, n) {
  const r = e.getBoundingClientRect();
  return {
    x: (t - r.left) / Math.max(r.width, 1) * e.width,
    y: (n - r.top) / Math.max(r.height, 1) * e.height
  };
}

function KIo(e, t, n, r) {
  const a = e.getBoundingClientRect(),
    i = e.clientWidth || a.width,
    o = e.clientHeight || a.height;
  return {
    x: (t - a.left) / Math.max(a.width, 1) * i,
    y: (n - a.top) / Math.max(a.height, 1) * o,
    diameter: Math.max(6, r * i / Math.max(e.width, 1))
  };
}

function QIo({
  api: e
}) {
  on();
  const {
      imageUrl: t,
      isDark: n,
      node: r,
      updateNode: a,
      setActiveDropdown: i,
      suppressDropdownCloseBriefly: o,
      setIsEraserToolOpen: s,
      setIsEraserPainting: l,
      setEraserMaskBlob: d,
      eraserActiveNodeId: u,
      eraserImageConfigList: h,
      eraserModelBtnRef: p,
      eraserModelConfig: m,
      isEraserModelDropdownOpen: f,
      eraserModelId: y,
      applyEraserModelSelection: b,
      getEraserModelDisplayName: v,
      eraserModelMenuRef: _,
      eraserModelDropdownMenuWidth: w,
      eraserGlobalOssEnabled: k,
      eraserOssConfigured: A,
      eraserMediaHostingProvider: S,
      eraserGenUseAliyunOss: C,
      setEraserGenUseAliyunOss: I,
      nodeSettingsRef: E,
      showEraserThirdPartyPlatformUi: M,
      eraserPlatformGroup: T,
      eraserResolution: P,
      setEraserResolution: R,
      eraserResolutionOptions: j,
      eraserResolutionBtnRef: B,
      isEraserResolutionDropdownOpen: F,
      eraserResolutionMenuRef: N,
      eraserBrushWidth: G,
      setEraserBrushWidth: z,
      eraseError: V,
      eraserMaskBlob: O,
      isErasing: L,
      handleEraseUse: D
    } = e,
    {
      visibleModels: U,
      selectedChannel: H,
      onSelectChannel: Y,
      menuWidth: K,
      showHaiyiChannel: W
    } = zZ(h),
    Q = m ? JU(m) : "Model",
    q = g.useRef(null),
    ne = g.useRef(null),
    de = g.useRef(0),
    [le, J] = g.useState({
      width: 0,
      height: 0
    }),
    [pe, ce] = g.useState(null),
    [we, X] = g.useState("brush"),
    [Z, re] = g.useState([]),
    [fe, ye] = g.useState([]),
    [ie, ae] = g.useState(null),
    [be, Ee] = g.useState(null),
    xe = g.useCallback(() => {
      de.current += 1, i == null || i(Fe => (Fe == null ? void 0 : Fe.nodeId) === `${r.id}-eraser` ? null : Fe), d(null), l(!1), s(!1);
    }, [r.id, i, d, l, s]);
  g.useEffect(() => {
    ne.current = null, J({
      width: 0,
      height: 0
    }), ce(null);
    const Fe = new Image();
    return Fe.crossOrigin = "anonymous", Fe.onload = () => {
      ne.current = Fe, J({
        width: Fe.naturalWidth,
        height: Fe.naturalHeight
      });
    }, Fe.onerror = () => ce("擦除画布加载失败，请重新打开工具"), Fe.src = t, () => {
      Fe.onload = null, Fe.onerror = null;
    };
  }, [t]);
  const he = g.useMemo(() => ie ? [...Z, ie] : Z, [ie, Z]);
  g.useEffect(() => {
    const Fe = q.current,
      Me = ne.current;
    if (!Fe || !Me || !le.width || !le.height) return;
    (Fe.width !== le.width || Fe.height !== le.height) && (Fe.width = le.width, Fe.height = le.height);
    const Re = Fe.getContext("2d");
    if (!Re || (Re.clearRect(0, 0, Fe.width, Fe.height), Re.drawImage(Me, 0, 0, Fe.width, Fe.height), !he.length)) return;
    const $e = document.createElement("canvas");
    $e.width = Fe.width, $e.height = Fe.height, vvn($e, he);
    const rt = document.createElement("canvas");
    rt.width = Fe.width, rt.height = Fe.height;
    const nt = rt.getContext("2d");
    if (!nt) return;
    const ze = Math.max(5, Math.round(Fe.width / 64)),
      Le = document.createElement("canvas");
    Le.width = ze * 2, Le.height = ze * 2;
    const Ke = Le.getContext("2d");
    if (!Ke) return;
    Ke.fillStyle = bvn[0], Ke.fillRect(0, 0, Le.width, Le.height), Ke.fillStyle = bvn[1], Ke.fillRect(0, 0, ze, ze), Ke.fillRect(ze, ze, ze, ze);
    const Xe = nt.createPattern(Le, "repeat");
    Xe && (nt.fillStyle = Xe, nt.fillRect(0, 0, rt.width, rt.height), nt.globalCompositeOperation = "destination-in", nt.drawImage($e, 0, 0), nt.globalCompositeOperation = "source-over", Re.globalAlpha = .88, Re.drawImage(rt, 0, 0), Re.globalAlpha = 1);
  }, [le, he]), g.useEffect(() => {
    const Fe = ne.current;
    if (!Fe || !le.width || !le.height) return;
    const Me = ++de.current;
    if (!Z.length) {
      d(null);
      return;
    }
    const Re = document.createElement("canvas");
    if (Re.width = le.width, Re.height = le.height, vvn(Re, Z), !qIo(Re)) {
      d(null);
      return;
    }
    const $e = document.createElement("canvas");
    $e.width = le.width, $e.height = le.height;
    const rt = $e.getContext("2d");
    if (!rt) return;
    rt.drawImage(Fe, 0, 0, $e.width, $e.height);
    const nt = document.createElement("canvas");
    nt.width = $e.width, nt.height = $e.height;
    const ze = nt.getContext("2d");
    ze && (ze.fillStyle = "rgba(255, 0, 0, 0.92)", ze.fillRect(0, 0, nt.width, nt.height), ze.globalCompositeOperation = "destination-in", ze.drawImage(Re, 0, 0), rt.drawImage(nt, 0, 0), $e.toBlob(Le => {
      Me === de.current && d(Le);
    }, "image/png"));
  }, [le, Z, d]);
  const ue = g.useCallback(() => {
      ae(Fe => (Fe && (Fe.kind === "stroke" ? Fe.points.length > 0 : Math.abs(Fe.end.x - Fe.start.x) > 2 && Math.abs(Fe.end.y - Fe.start.y) > 2) && (re(Re => [...Re, Fe]), ye([])), null));
    }, []),
    ge = g.useCallback(Fe => {
      if (Fe.button !== 0 || !le.width || L) return;
      Fe.preventDefault(), Fe.stopPropagation(), Fe.currentTarget.setPointerCapture(Fe.pointerId);
      const Me = wvn(Fe.currentTarget, Fe.clientX, Fe.clientY);
      if (we === "rectangle") {
        ae({
          kind: "rectangle",
          action: "add",
          start: Me,
          end: Me
        });
        return;
      }
      ae({
        kind: "stroke",
        action: we === "erase" ? "subtract" : "add",
        points: [Me],
        width: G
      });
    }, [G, le.width, L, we]),
    _e = g.useCallback(Fe => {
      if (we === "rectangle") {
        Ee(null);
        return;
      }
      Ee(KIo(Fe.currentTarget, Fe.clientX, Fe.clientY, G));
    }, [G, we]),
    ke = g.useCallback(Fe => {
      _e(Fe), Fe.preventDefault();
      const Me = wvn(Fe.currentTarget, Fe.clientX, Fe.clientY);
      ae(Re => {
        if (!Re) return null;
        if (Re.kind === "rectangle") return {
          ...Re,
          end: Me
        };
        const $e = Re.points[Re.points.length - 1];
        return $e && Math.hypot(Me.x - $e.x, Me.y - $e.y) < .8 ? Re : {
          ...Re,
          points: [...Re.points, Me]
        };
      });
    }, [_e]),
    ve = g.useCallback(Fe => {
      Fe.preventDefault(), Fe.stopPropagation(), Fe.currentTarget.hasPointerCapture(Fe.pointerId) && Fe.currentTarget.releasePointerCapture(Fe.pointerId), ue();
    }, [ue]),
    Te = g.useCallback(() => {
      re(Fe => {
        if (!Fe.length) return Fe;
        const Me = Fe[Fe.length - 1];
        return ye(Re => [...Re, Me]), Fe.slice(0, -1);
      });
    }, []),
    Ne = g.useCallback(() => {
      ye(Fe => {
        if (!Fe.length) return Fe;
        const Me = Fe[Fe.length - 1];
        return re(Re => [...Re, Me]), Fe.slice(0, -1);
      });
    }, []);
  g.useEffect(() => {
    const Fe = Me => {
      const Re = Me.target;
      if (!(Re != null && Re.closest("input, select, textarea"))) {
        if (Me.key === "Escape") {
          Me.preventDefault(), xe();
          return;
        }
        !(Me.ctrlKey || Me.metaKey) || Me.key.toLowerCase() !== "z" || (Me.preventDefault(), Me.shiftKey ? Ne() : Te());
      }
    };
    return window.addEventListener("keydown", Fe, !0), () => window.removeEventListener("keydown", Fe, !0);
  }, [xe, Ne, Te]);
  const me = g.useCallback(Fe => {
      i && i(Me => {
        const Re = (Me == null ? void 0 : Me.nodeId) === u && (Me == null ? void 0 : Me.type) === Fe;
        return Re || o(), Re ? null : {
          nodeId: u,
          type: Fe
        };
      });
    }, [u, i, o]),
    Ae = {
      onClick: Fe => Fe.stopPropagation(),
      onMouseDown: Fe => Fe.stopPropagation(),
      onPointerDown: Fe => Fe.stopPropagation()
    };
  return c.jsxs("div", {
    className: "pointer-events-none absolute inset-0 z-[95] overflow-visible",
    "data-eraser-tool-panel": !0,
    "data-qiaodoumayi-eraser-workspace": !0,
    children: [c.jsxs("div", {
      "data-eraser-preview": !0,
      className: "pointer-events-auto absolute inset-0 overflow-hidden rounded-2xl bg-zinc-950",
      children: [c.jsx("canvas", {
        ref: q,
        className: `block h-full w-full touch-none select-none ${we === "rectangle" ? "cursor-crosshair" : "cursor-none"}`,
        onPointerDown: ge,
        onPointerMove: ke,
        onPointerUp: ve,
        onPointerCancel: ve,
        onPointerLeave: Fe => {
          Ee(null), ie && !Fe.currentTarget.hasPointerCapture(Fe.pointerId) && ue();
        },
        onContextMenu: Fe => Fe.preventDefault()
      }), !le.width && !pe ? c.jsx("div", {
        className: "absolute inset-0 flex items-center justify-center bg-zinc-950/70 text-zinc-400",
        children: c.jsx(Ua, {
          size: 22,
          className: "animate-spin"
        })
      }) : null, pe ? c.jsx("div", {
        className: "absolute inset-0 flex items-center justify-center bg-zinc-950/80 px-5 text-center text-xs text-red-300",
        children: pe
      }) : null, be && we !== "rectangle" ? c.jsx("span", {
        className: "pointer-events-none absolute rounded-full border border-white/90 bg-black/10 shadow-[0_0_0_1px_rgba(0,0,0,0.45)]",
        style: {
          width: be.diameter,
          height: be.diameter,
          left: be.x - be.diameter / 2,
          top: be.y - be.diameter / 2
        }
      }) : null]
    }), c.jsxs("div", {
      "data-eraser-brush-toolbar": !0,
      className: `pointer-events-auto absolute bottom-[calc(100%+40px)] left-1/2 flex h-[58px] -translate-x-1/2 items-center gap-1 rounded-full border p-2 ${n ? "border-white/10 bg-[#1c1c1c] text-zinc-100" : "border-black/10 bg-white text-zinc-900"}`,
      ...Ae,
      children: [c.jsx("button", {
        type: "button",
        "aria-label": x("退出擦除"),
        title: x("退出擦除 (Esc)"),
        onClick: xe,
        className: `flex h-8 w-8 items-center justify-center rounded-full transition ${n ? "text-zinc-500 hover:bg-white/10 hover:text-zinc-100" : "text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900"}`,
        children: c.jsx(Na, {
          size: 18
        })
      }), c.jsx("span", {
        className: `mx-1 h-6 w-px ${n ? "bg-white/10" : "bg-black/10"}`
      }), c.jsx("div", {
        className: `flex items-center gap-1 rounded-full p-1 ${n ? "bg-white/[0.06]" : "bg-zinc-100"}`,
        children: [["brush", "画笔", KHe], ["rectangle", "矩形选区", A5e], ["erase", "擦除蒙版", uI]].map(([Fe, Me, Re]) => c.jsx("button", {
          type: "button",
          "aria-label": Me,
          title: Me,
          "aria-pressed": we === Fe,
          onClick: () => X(Fe),
          className: `flex h-8 w-8 items-center justify-center rounded-full transition ${we === Fe ? n ? "bg-white/20 text-white" : "bg-zinc-900 text-white" : n ? "text-zinc-400 hover:bg-white/10 hover:text-white" : "text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900"}`,
          children: c.jsx(Re, {
            size: 17
          })
        }, Fe))
      }), c.jsx("span", {
        className: `mx-1 h-6 w-px ${n ? "bg-white/10" : "bg-black/10"}`
      }), c.jsxs("div", {
        className: "flex h-8 items-center gap-2 px-1",
        children: [c.jsx("span", {
          className: "flex h-6 w-6 rotate-90 items-center justify-center",
          "aria-hidden": !0,
          children: c.jsx("svg", {
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            fill: "none",
            children: c.jsx("path", {
              d: "M4 12 C8 6, 14 20, 20 12",
              stroke: "currentColor",
              strokeWidth: Math.max(2, Math.min(5, G / 12)),
              strokeLinecap: "round"
            })
          })
        }), c.jsx("input", {
          "aria-label": x("笔刷大小"),
          title: x("笔刷大小 {0}", G),
          type: "range",
          min: 8,
          max: 120,
          step: 1,
          value: G,
          onChange: Fe => z(Number(Fe.target.value)),
          className: "qiaodoumayi-eraser-range h-1.5 w-24 cursor-pointer accent-white"
        })]
      }), c.jsx("span", {
        className: `mx-1 h-6 w-px ${n ? "bg-white/10" : "bg-black/10"}`
      }), c.jsx("button", {
        type: "button",
        "aria-label": x("撤销"),
        title: x("撤销 (Ctrl+Z)"),
        disabled: !Z.length,
        onClick: Te,
        className: `flex h-8 w-8 items-center justify-center rounded-full transition disabled:cursor-not-allowed disabled:opacity-25 ${n ? "text-zinc-400 hover:bg-white/10 hover:text-white" : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"}`,
        children: c.jsx(vd, {
          size: 16
        })
      }), c.jsx("button", {
        type: "button",
        "aria-label": x("重做"),
        title: x("重做 (Ctrl+Shift+Z)"),
        disabled: !fe.length,
        onClick: Ne,
        className: `flex h-8 w-8 items-center justify-center rounded-full transition disabled:cursor-not-allowed disabled:opacity-25 ${n ? "text-zinc-400 hover:bg-white/10 hover:text-white" : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"}`,
        children: c.jsx(ox, {
          size: 16
        })
      })]
    }), c.jsxs("div", {
      "data-eraser-composer": !0,
      className: `pointer-events-auto absolute left-1/2 top-[calc(100%+8px)] flex min-h-[44px] w-max min-w-full max-w-[min(720px,calc(100vw-24px))] -translate-x-1/2 items-center gap-1.5 rounded-full border px-2.5 py-2 text-zinc-100 shadow-[0_10px_35px_rgba(0,0,0,0.4)] backdrop-blur-xl ${n ? "border-white/10 bg-[#151515]/95" : "border-zinc-200 bg-white/95 text-zinc-800"}`,
      "data-model-select-area": !0,
      ...Ae,
      children: [c.jsx("span", {
        className: `min-w-24 flex-1 truncate pr-1 text-xs ${n ? "text-zinc-500" : "text-zinc-400"}`,
        children: x("绘制蒙版以擦除")
      }), c.jsxs("div", {
        className: "eraser-toolbar-params flex shrink-0 flex-nowrap items-center gap-1.5 overflow-visible",
        children: [!k && A ? c.jsx("button", {
          type: "button",
          "aria-label": $g(S),
          title: Jk(S),
          "aria-pressed": C,
          onClick: () => {
            const Fe = !C;
            I(Fe), a(r.id, {
              settings: {
                ...(E.current || {}),
                genUseAliyunOss: Fe
              }
            });
          },
          className: `${Adt(n, C)} ${C ? n ? "!border-sky-300/40 !bg-sky-400/15 !text-sky-200" : "!border-sky-400/50 !bg-sky-50 !text-sky-700" : ""}`,
          children: c.jsx(Wp, {
            size: 13
          })
        }) : null, M ? c.jsx("div", {
          className: "shrink-0",
          children: c.jsx(Ku, {
            platformGroup: T,
            modelName: (m == null ? void 0 : m.modelName) || y,
            modelId: y,
            modelConfigId: y,
            uiResolution: P,
            isDark: n,
            nodeSettings: r.settings,
            updateNode: a,
            onGroupChange: Fe => {
              a(r.id, {
                settings: {
                  ...(r.settings || {}),
                  eraserPlatformGroup: Fe
                }
              });
            },
            compact: !0,
            buttonVariant: "square",
            menuPlacement: "above"
          })
        }) : null, h.length ? c.jsxs("div", {
          className: "relative max-w-[10rem] shrink-0 overflow-visible",
          children: [c.jsxs("button", {
            ref: p,
            type: "button",
            title: m ? Q : x("擦除模型"),
            "aria-label": x("擦除模型"),
            "data-qiaodoumayi-gen-model": "true",
            onPointerDown: Fe => {
              Fe.button === 0 && (Fe.preventDefault(), Fe.stopPropagation(), me("eraser-model"));
            },
            onMouseDown: Fe => Fe.stopPropagation(),
            className: Adt(n, f),
            children: [c.jsx(Mp, {
              modelId: y,
              kind: "image",
              isDark: n,
              config: m,
              size: 13,
              fallback: c.jsx(lo, {
                size: 13,
                className: "shrink-0 block",
                "aria-hidden": !0
              })
            }), c.jsx("span", {
              className: "min-w-0 max-w-[7rem] truncate font-semibold leading-none",
              children: x(Q)
            }), c.jsx(Mi, {
              size: 12,
              className: `shrink-0 opacity-70 transition-transform ${f ? "rotate-180" : ""}`
            })]
          }), c.jsx(AAe, {
            open: !!(i && f),
            anchorRef: p,
            isDark: n,
            placement: "above",
            menuMinWidth: Math.max(w, K),
            dataPortalAttr: "data-eraser-tool-panel",
            className: "max-h-[360px] p-1 rh-scroll-minimal custom-scrollbar",
            header: c.jsx(m9, {
              isDark: n,
              selected: H,
              onSelect: Y,
              showHaiyi: W
            }),
            children: c.jsx("div", {
              ref: _,
              children: c.jsx($wr, {
                configs: U,
                selectedId: y,
                isDark: n,
                variant: "eraser",
                label: Fe => JU(Fe) || v(Fe),
                onSelect: Fe => {
                  b(Fe), i == null || i(null);
                }
              })
            })
          })]
        }) : null, j.length ? c.jsxs("div", {
          className: "relative shrink-0 overflow-visible",
          children: [c.jsxs("button", {
            ref: B,
            type: "button",
            "aria-label": x("输出分辨率"),
            title: x("输出分辨率"),
            onPointerDown: Fe => {
              Fe.button === 0 && (Fe.preventDefault(), Fe.stopPropagation(), me("eraser-resolution"));
            },
            onMouseDown: Fe => Fe.stopPropagation(),
            className: Adt(n, F),
            children: [c.jsx("span", {
              children: P || j[0] || "Auto"
            }), c.jsx(Mi, {
              size: 12,
              className: `shrink-0 opacity-70 transition-transform ${F ? "rotate-180" : ""}`
            })]
          }), c.jsx(AAe, {
            open: !!(i && F),
            anchorRef: B,
            isDark: n,
            placement: "above",
            align: "center",
            menuMinWidth: 44,
            dataPortalAttr: "data-eraser-tool-panel",
            className: "w-max max-h-64 overflow-y-auto p-1 rh-scroll-minimal custom-scrollbar",
            children: c.jsx("div", {
              ref: N,
              className: "w-full",
              children: j.map(Fe => c.jsx("button", {
                type: "button",
                ...(P === Fe ? {
                  [Md]: "true"
                } : {}),
                onClick: Me => {
                  Me.stopPropagation(), R(Fe), cl(y, {
                    resolution: Fe,
                    aspectRatio: "Auto"
                  }), i == null || i(null);
                },
                className: `w-full flex items-center justify-center px-2 py-1.5 rounded text-center text-xs transition-colors ${n ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-zinc-100 text-zinc-700"} ${P === Fe ? n ? "bg-zinc-800" : "bg-zinc-100" : ""}`,
                children: Fe || "Auto"
              }, Fe))
            })
          })]
        }) : null]
      }), c.jsx("button", {
        type: "button",
        "aria-label": x("开始擦除"),
        title: x(O ? "开始擦除" : "请先绘制擦除区域"),
        disabled: !O || L || !le.width,
        onClick: () => void D(),
        className: `ml-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-35 ${n ? "bg-white text-black hover:bg-zinc-200" : "bg-zinc-900 text-white hover:bg-black"}`,
        children: L ? c.jsx(Ua, {
          size: 16,
          className: "animate-spin"
        }) : c.jsx(Gc, {
          size: 17
        })
      }), V ? c.jsx("div", {
        className: "absolute left-2 right-2 top-[calc(100%+6px)] rounded-lg border border-red-400/20 bg-red-950/90 px-3 py-2 text-xs text-red-200 shadow-xl",
        children: V
      }) : null]
    })]
  });
}

const YIo = Object.freeze(Object.defineProperty({
  __proto__: null,
  InputImageEraserToolPanel: QIo
}, Symbol.toStringTag, {
  value: "Module"
}));

function Sdt({
  options: e,
  value: t,
  disabled: n,
  onChange: r
}) {
  on();
  const a = g.useRef(null),
    i = g.useRef(null),
    [o, s] = g.useState(null),
    l = Math.max(0, e.indexOf(t)),
    d = o ?? l,
    u = Math.round(Math.min(e.length - 1, Math.max(0, d))),
    h = o != null,
    p = m => {
      const f = i.current;
      if (!f || m.pointerId !== f.pointerId) return;
      const y = a.current,
        b = f.moved ? Math.round(Math.min(e.length - 1, Math.max(0, f.origin + (m.clientX - f.startX) / f.segW))) : Math.min(e.length - 1, Math.max(0, Math.floor((m.clientX - ((y == null ? void 0 : y.getBoundingClientRect().left) ?? 0) - 3) / f.segW)));
      i.current = null, s(null), n || r(e[b]), y == null || y.addEventListener("click", v => {
        v.preventDefault(), v.stopPropagation();
      }, {
        capture: !0,
        once: !0
      });
    };
  return c.jsxs("div", {
    ref: a,
    className: `relative flex min-w-0 flex-1 touch-none select-none items-center rounded-full bg-black/40 p-[3px] ${n ? "pointer-events-none opacity-50" : h ? "cursor-grabbing" : "cursor-grab"}`,
    onPointerDown: m => {
      if (n) return;
      const f = a.current;
      f && (i.current = {
        pointerId: m.pointerId,
        startX: m.clientX,
        origin: l,
        segW: (f.clientWidth - 6) / e.length,
        moved: !1
      }, f.setPointerCapture(m.pointerId));
    },
    onPointerMove: m => {
      const f = i.current;
      if (!f || m.pointerId !== f.pointerId) return;
      const y = m.clientX - f.startX;
      !f.moved && Math.abs(y) < 5 || (f.moved = !0, s(Math.min(e.length - 1, Math.max(0, f.origin + y / f.segW))));
    },
    onPointerUp: p,
    onPointerCancel: p,
    children: [c.jsx("div", {
      className: "pointer-events-none absolute bottom-[3px] left-[3px] top-[3px] rounded-full bg-white/90 shadow-[0_1px_4px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-[8px]",
      style: {
        width: `calc((100% - 6px) / ${e.length})`,
        transform: `translateX(${d * 100}%)`,
        transition: h ? "none" : "transform 320ms cubic-bezier(0.32, 0.72, 0, 1)"
      }
    }), e.map((m, f) => c.jsx("button", {
      type: "button",
      className: `relative z-10 flex h-7 flex-1 items-center justify-center whitespace-nowrap rounded-full px-1 text-[11px] font-medium leading-none transition-colors duration-200 ${f === u ? "text-zinc-900" : "text-white/50 hover:text-white/80"}`,
      onClick: () => !n && r(m),
      children: m
    }, m))]
  });
}

function gge({
  label: e,
  children: t
}) {
  return on(), c.jsxs("div", {
    className: "flex items-center gap-3",
    children: [c.jsx("div", {
      className: "w-[4.25rem] shrink-0 text-[11px] text-white/45",
      children: e
    }), t]
  });
}

function XIo({
  open: e,
  videoUrl: t,
  sourceNode: n,
  nodes: r,
  generateId: a,
  setNodes: i,
  setSelectedNodeId: o,
  onClose: s
}) {
  var N;
  on();
  const l = g.useRef(null),
    [d, u] = g.useState({
      width: 0,
      height: 0,
      duration: 0
    }),
    [h, p] = g.useState("source"),
    [m, f] = g.useState(!1),
    [y, b] = g.useState(!0),
    [v, _] = g.useState(!1),
    [w, k] = g.useState(0),
    [A, S] = g.useState(""),
    [C, I] = g.useState(""),
    [E, M] = g.useState(!1),
    T = d.width && d.height ? Math.min(d.width, d.height) : 0,
    P = g.useMemo(() => iae.filter(G => !lmo(G, T)).map(G => G.label), [T]),
    R = ((N = iae.find(G => G.key === h)) == null ? void 0 : N.label) || iae[0].label;
  g.useEffect(() => {
    e && (p("source"), f(!1), b(!0), _(!1), k(0), S(""), I(""), u({
      width: 0,
      height: 0,
      duration: 0
    }), pmo().then(M));
  }, [e, t]), g.useEffect(() => {
    if (!e || !t) return;
    const G = document.createElement("video");
    G.muted = !0, G.playsInline = !0, G.preload = "metadata", G.crossOrigin = t.startsWith("http") ? "anonymous" : null;
    const z = () => {
      u({
        width: G.videoWidth || 0,
        height: G.videoHeight || 0,
        duration: Number.isFinite(G.duration) ? G.duration : 0
      });
    };
    return G.onloadedmetadata = z, G.onerror = () => u({
      width: 0,
      height: 0,
      duration: 0
    }), G.src = t, () => {
      G.removeAttribute("src"), G.load(), G.remove();
    };
  }, [e, t]);
  const j = typeof navigator < "u" && !!navigator.gpu,
    B = C === "webgpu" ? "WebGPU 硬件加速" : C === "wasm" ? "CPU 推理（较慢）" : j ? "WebGPU 可用" : "CPU 推理",
    F = async () => {
      var z;
      if (v) {
        (z = l.current) == null || z.abort();
        return;
      }
      if (!t || !a || !i) {
        Ai("error", a && i ? "无法解析视频地址" : "无法创建节点");
        return;
      }
      const G = new AbortController();
      l.current = G, _(!0), k(0), S("正在准备...");
      try {
        const V = await ymo({
            videoUrl: t,
            sourceNode: n,
            preset: h,
            invert: m,
            smooth: y,
            signal: G.signal,
            onBackend: I,
            onProgress: ({
              percent: L,
              text: D
            }) => {
              k(L), S(D);
            }
          }),
          O = await Ope(V.blob, {
            sourceNodeId: n.id,
            width: V.width,
            height: V.height,
            fileName: V.fileName
          });
        await Bpe({
          sourceNode: n,
          persisted: O,
          width: V.width,
          height: V.height,
          nodes: r,
          generateId: a,
          setNodes: i,
          setSelectedNodeId: o
        }), M(!0), Ai("success", "深度提取成功，已添加为新节点"), s();
      } catch (V) {
        const O = !!(V != null && V.cancelled),
          L = O ? "已取消深度提取" : V instanceof Error ? V.message : "深度提取失败";
        Ai(O ? "info" : "error", L);
      } finally {
        l.current = null, _(!1);
      }
    };
  return e ? c.jsx(OT, {
    title: x("深度提取"),
    testId: "video-depth-panel",
    dataAttr: "data-video-depth-panel",
    width: 436,
    generatePlacement: "footer",
    bodyClassName: "px-4 pb-3",
    onClose: v ? void 0 : s,
    onGenerate: () => void F(),
    generateTitle: v ? "停止转换" : "开始转换",
    footer: v ? c.jsxs("div", {
      className: "flex min-w-0 flex-1 items-center gap-2",
      children: [c.jsxs("div", {
        className: "min-w-0 flex-1",
        children: [c.jsx("div", {
          className: "truncate text-[11px] text-white/45",
          children: A || x("正在准备...")
        }), c.jsx("div", {
          className: "mt-1 h-1 overflow-hidden rounded-full bg-white/10",
          children: c.jsx("div", {
            className: "h-full rounded-full bg-white/80 transition-[width] duration-300",
            style: {
              width: `${w}%`
            }
          })
        })]
      }), c.jsxs("span", {
        className: "tabular-nums text-[11px] text-white/55",
        children: [w, "%"]
      })]
    }) : c.jsx("div", {
      className: "truncate text-center text-[11px] text-white/30",
      children: x(E ? "模型已就绪，可直接转换" : "本地逐帧推理，首次约需下载 26MB 模型")
    }),
    children: c.jsxs("div", {
      className: "flex flex-col gap-2",
      children: [c.jsx(gge, {
        label: x("源视频"),
        children: c.jsxs("div", {
          className: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5 text-[11px] text-white/70",
          children: [c.jsx("span", {
            className: "tabular-nums",
            children: d.width ? `${d.width} × ${d.height}` : x("读取中…")
          }), d.duration > 0 ? c.jsxs("span", {
            className: "rounded-full bg-white/10 px-1.5 py-0.5 text-white/45",
            children: [d.duration.toFixed(1), "s"]
          }) : null, d.duration > omo ? c.jsx("span", {
            className: "rounded-full bg-amber-400/15 px-1.5 py-0.5 text-amber-200/90",
            children: x("较长")
          }) : null]
        })
      }), c.jsx(gge, {
        label: x("输出分辨率"),
        children: c.jsx(Sdt, {
          options: P,
          value: P.includes(R) ? R : P[0],
          disabled: v,
          onChange: G => {
            const z = iae.find(V => V.label === G);
            z && p(z.key);
          }
        })
      }), c.jsx(gge, {
        label: x("深度映射"),
        children: c.jsx(Sdt, {
          options: ["近白远黑", "近黑远白"],
          value: m ? "近黑远白" : "近白远黑",
          disabled: v,
          onChange: G => f(G === "近黑远白")
        })
      }), c.jsx(gge, {
        label: x("时域平滑"),
        children: c.jsx(Sdt, {
          options: ["开启", "关闭"],
          value: y ? "开启" : "关闭",
          disabled: v,
          onChange: G => b(G === "开启")
        })
      }), c.jsx(gge, {
        label: x("推理引擎"),
        children: c.jsx("div", {
          className: "min-w-0 flex-1 text-[11px] text-white/50",
          children: x(B)
        })
      })]
    })
  }) : null;
}

const JIo = Object.freeze(Object.defineProperty({
  __proto__: null,
  VideoDepthDialog: XIo
}, Symbol.toStringTag, {
  value: "Module"
}));

async function ZIo(e) {
  try {
    const t = await fetch(e);
    if (!t.ok) throw new Error(`HTTP ${t.status}`);
    return await createImageBitmap(await t.blob());
  } catch {
    const t = new Image();
    t.crossOrigin = e.startsWith("http") ? "anonymous" : null, await new Promise((a, i) => {
      t.onload = () => a(), t.onerror = () => i(new Error("无法读取源图片")), t.src = e;
    });
    const n = document.createElement("canvas");
    n.width = t.naturalWidth || t.width, n.height = t.naturalHeight || t.height;
    const r = n.getContext("2d");
    if (!r) throw new Error("无法创建画布");
    return r.drawImage(t, 0, 0), createImageBitmap(n);
  }
}

async function eCo(e, t, n, r, a) {
  const i = document.createElement("canvas");
  i.width = r, i.height = a;
  const o = i.getContext("2d");
  if (!o) throw new Error("无法创建深度画布");
  o.putImageData(new ImageData(e, r, a), 0, 0);
  const s = document.createElement("canvas");
  s.width = t, s.height = n;
  const l = s.getContext("2d");
  if (!l) throw new Error("无法创建输出画布");
  l.imageSmoothingEnabled = !0, l.imageSmoothingQuality = "high", l.drawImage(i, 0, 0, t, n);
  const d = await new Promise(m => {
    if (typeof s.toBlob == "function") {
      s.toBlob(f => m(f), "image/png");
      return;
    }
    m(null);
  });
  if (d != null && d.size) return d;
  const u = s.toDataURL("image/png"),
    p = await (await fetch(u)).blob();
  if (!p.size) throw new Error("深度图导出失败");
  return p;
}

function Qte(e) {
  if (e != null && e.aborted) {
    const t = new Error("已取消深度转换");
    throw t.cancelled = !0, t;
  }
}

async function tCo(e) {
  var r, a, i, o, s, l, d;
  const {
    resolveInputImageNodeContentForCrop: t
  } = await Ie(async () => {
    const {
      resolveInputImageNodeContentForCrop: u
    } = await Promise.resolve().then(() => ii);
    return {
      resolveInputImageNodeContentForCrop: u
    };
  }, void 0, import.meta.url);
  (r = e.onProgress) == null || r.call(e, {
    percent: 4,
    text: "正在准备深度模型..."
  });
  const n = (await t(e.sourceNode)).trim();
  if (!n) throw new Error("无法解析图片地址");
  Qte(e.signal);
  try {
    const u = await ZUt(),
      h = O$e() ? void 0 : {
        bytes: (await obr(u, e.onProgress, e.signal)).slice(),
        backend: u
      };
    Qte(e.signal), (a = e.onProgress) == null || a.call(e, {
      percent: 28,
      text: O$e() ? "复用已加载的深度模型" : "正在初始化推理引擎..."
    }), await rbr({
      invert: !1,
      smooth: !1
    }, void 0, h), Qte(e.signal), (i = e.onProgress) == null || i.call(e, {
      percent: 40,
      text: "正在读取源图片..."
    });
    const p = await ZIo(n),
      m = p.width,
      f = p.height;
    Qte(e.signal), (o = e.onProgress) == null || o.call(e, {
      percent: 62,
      text: "正在深度推理..."
    });
    const y = await abr(p),
      b = m || y.width,
      v = f || y.height;
    Qte(e.signal), (s = e.onProgress) == null || s.call(e, {
      percent: 82,
      text: "正在导出深度图..."
    });
    const _ = await eCo(y.rgba, b, v, y.width, y.height);
    Qte(e.signal), (l = e.onProgress) == null || l.call(e, {
      percent: 90,
      text: "正在保存深度图..."
    });
    const w = await JS(_, "depth", {
      sourceNodeId: e.sourceNode.id
    });
    w.settings = {
      ...w.settings,
      mediaType: "image",
      source: "image_depth",
      imageSize: `${b}×${v}`
    };
    const k = e.sourceNode.width ?? 300,
      A = e.sourceNode.height ?? 200,
      S = kc(b, v),
      C = e.generateId(),
      I = Ki(C, "input-image", (e.sourceNode.x ?? 0) + k + 24, e.sourceNode.y ?? 0, "深度图", w.settings, e.nodes || []);
    return e.setNodes(E => [...E, {
      ...I,
      content: w.content,
      width: S.width || k,
      height: S.height || A,
      settings: {
        ...I.settings,
        ...w.settings,
        mediaType: "image"
      }
    }]), (d = e.setSelectedNodeId) == null || d.call(e, C), C;
  } finally {
    ibr().catch(() => {});
  }
}

function nCo({
  open: e,
  sourceNode: t,
  nodes: n,
  generateId: r,
  setNodes: a,
  setSelectedNodeId: i,
  onClose: o
}) {
  on();
  const s = g.useRef(null),
    [l, d] = g.useState(0),
    [u, h] = g.useState("正在准备...");
  return g.useEffect(() => {
    if (!e || !r || !a) return;
    const p = new AbortController();
    return s.current = p, d(2), h("正在准备..."), tCo({
      sourceNode: t,
      nodes: n,
      generateId: r,
      setNodes: a,
      setSelectedNodeId: i,
      signal: p.signal,
      onProgress: ({
        percent: m,
        text: f
      }) => {
        d(m), h(f);
      }
    }).then(() => {
      p.signal.aborted || (Ai("success", "深度图已添加为新节点"), o());
    }).catch(m => {
      !!(m != null && m.cancelled) || p.signal.aborted ? Ai("info", "已取消深度转换") : Ai("error", m instanceof Error ? m.message : "深度提取失败"), o();
    }).finally(() => {
      s.current === p && (s.current = null);
    }), () => {
      p.abort(), s.current === p && (s.current = null);
    };
  }, [e]), e ? c.jsx(OT, {
    title: x("深度提取"),
    testId: "image-depth-panel",
    dataAttr: "data-image-depth-panel",
    width: 360,
    generatePlacement: "footer",
    bodyClassName: "px-4 pb-2",
    onClose: () => {
      var p;
      (p = s.current) == null || p.abort(), o();
    },
    onGenerate: () => {
      var p;
      return (p = s.current) == null ? void 0 : p.abort();
    },
    generateTitle: "停止转换",
    footer: c.jsxs("div", {
      className: "flex min-w-0 flex-1 items-center gap-2",
      children: [c.jsxs("div", {
        className: "min-w-0 flex-1",
        children: [c.jsx("div", {
          className: "truncate text-[11px] text-white/45",
          children: u || x("正在准备...")
        }), c.jsx("div", {
          className: "mt-1 h-1 overflow-hidden rounded-full bg-white/10",
          children: c.jsx("div", {
            className: "h-full rounded-full bg-white/80 transition-[width] duration-300",
            style: {
              width: `${l}%`
            }
          })
        })]
      }), c.jsxs("span", {
        className: "tabular-nums text-[11px] text-white/55",
        children: [l, "%"]
      })]
    }),
    children: c.jsx("div", {
      className: "text-[11px] text-white/40",
      children: x("正在把当前图片转为深度图")
    })
  }) : null;
}

const rCo = Object.freeze(Object.defineProperty({
  __proto__: null,
  ImageDepthProgressPanel: nCo
}, Symbol.toStringTag, {
  value: "Module"
}));

function Idt({
  label: e,
  isDark: t,
  children: n
}) {
  return on(), c.jsxs("div", {
    className: "flex items-center gap-3",
    children: [c.jsx("div", {
      className: `w-[4.25rem] shrink-0 text-[11px] ${t ? "text-white/45" : "text-zinc-500"}`,
      children: e
    }), n]
  });
}

function xvn() {
  try {
    return c3o(localStorage.getItem(lwr));
  } catch {
    return d3o();
  }
}

function aCo(e) {
  try {
    localStorage.setItem(lwr, JSON.stringify(e));
  } catch {}
}

function iCo({
  open: e,
  sourceNode: t,
  nodes: n,
  generateId: r,
  setNodes: a,
  setSelectedNodeId: i,
  onClose: o,
  isDark: s = !0
}) {
  var I;
  on();
  const l = g.useRef(null),
    [d, u] = g.useState(xvn),
    [h, p] = g.useState(!1),
    [m, f] = g.useState(0),
    [y, b] = g.useState(""),
    [v, _] = g.useState(""),
    [w, k] = g.useState(!1);
  g.useEffect(() => {
    e && (p(!1), f(0), b(""), u(xvn()), R$t().then(_), y3o().then(k));
  }, [e]), g.useEffect(() => () => {
    var E;
    return (E = l.current) == null ? void 0 : E.abort();
  }, []);
  const A = ((I = xEe.find(E => E.key === cwr(d))) == null ? void 0 : I.shortLabel) || Lbn[0],
    S = E => {
      u(E), aCo(E);
    },
    C = async () => {
      var M;
      if (h) {
        (M = l.current) == null || M.abort();
        return;
      }
      if (!r || !a) {
        Ai("error", "当前画布无法添加抠图节点");
        return;
      }
      const E = new AbortController();
      l.current = E, p(!0), f(2), b("正在准备...");
      try {
        if (await x3o({
          sourceNode: t,
          nodes: n,
          generateId: r,
          setNodes: a,
          setSelectedNodeId: i,
          settings: d,
          signal: E.signal,
          onDevice: _,
          onProgress: ({
            percent: T,
            text: P
          }) => {
            f(T), b(P), P.startsWith("加载模型:") && P.includes("100%") && k(!0);
          }
        }), E.signal.aborted) return;
        k(!0), Ai("success", "抠图完成，已添加为新节点"), o();
      } catch (T) {
        const P = !!(T != null && T.cancelled) || E.signal.aborted;
        Ai(P ? "info" : "error", P ? "已取消抠图" : T instanceof Error ? T.message : "智能抠图失败");
      } finally {
        l.current === E && (l.current = null), p(!1);
      }
    };
  return e ? c.jsx(OT, {
    title: x("智能抠图"),
    testId: "image-cutout-panel",
    dataAttr: "data-image-cutout-panel",
    isDark: s,
    width: 436,
    generatePlacement: "footer",
    bodyClassName: "px-4 pb-3",
    onClose: h ? void 0 : o,
    onGenerate: () => void C(),
    generateTitle: h ? "停止抠图" : "开始抠图",
    footer: h ? c.jsxs("div", {
      className: "flex min-w-0 flex-1 items-center gap-2",
      children: [c.jsxs("div", {
        className: "min-w-0 flex-1",
        children: [c.jsx("div", {
          className: `truncate text-[11px] ${s ? "text-white/45" : "text-zinc-500"}`,
          children: y || x("正在准备...")
        }), c.jsx("div", {
          className: `mt-1 h-1 overflow-hidden rounded-full ${s ? "bg-white/10" : "bg-black/8"}`,
          children: c.jsx("div", {
            className: `h-full rounded-full transition-[width] duration-300 ${s ? "bg-white/80" : "bg-zinc-900"}`,
            style: {
              width: `${m}%`
            }
          })
        })]
      }), c.jsxs("span", {
        className: `tabular-nums text-[11px] ${s ? "text-white/55" : "text-zinc-500"}`,
        children: [m, "%"]
      })]
    }) : c.jsx("div", {
      className: `truncate text-center text-[11px] ${s ? "text-white/30" : "text-zinc-400"}`,
      children: x(w ? "模型已就绪，可直接抠图" : v === "gpu" ? "本地 GPU 抠图，首次约需下载 95MB 模型" : "本地抠图，无 GPU 时回退 CPU，首次约需下载 95MB 模型")
    }),
    children: c.jsxs("div", {
      className: `flex flex-col gap-2 ${h ? "pointer-events-none opacity-60" : ""}`,
      children: [c.jsx(Idt, {
        label: x("抠图预设"),
        isDark: s,
        children: c.jsx(Ade, {
          isDark: s,
          options: Lbn,
          value: A,
          disabled: h,
          onChange: E => S(s3o(d, E))
        })
      }), c.jsx(Idt, {
        label: x("边缘精修"),
        isDark: s,
        children: c.jsx(Ade, {
          isDark: s,
          options: ["开启", "关闭"],
          value: d.enabled ? "开启" : "关闭",
          disabled: h,
          onChange: E => S({
            ...d,
            enabled: E === "开启"
          })
        })
      }), c.jsx(Idt, {
        label: x("推理引擎"),
        isDark: s,
        children: c.jsx("div", {
          className: `min-w-0 flex-1 text-[11px] ${s ? "text-white/50" : "text-zinc-500"}`,
          children: v === "gpu" ? "WebGPU · ISNet" : v === "cpu" ? "CPU · ISNet" : x("检测中…")
        })
      }), c.jsx("div", {
        className: `pl-[4.25rem] text-[11px] leading-relaxed ${s ? "text-white/35" : "text-zinc-400"}`,
        children: d.enabled ? l3o(d) : x("关闭后只出原始模型结果，不再做去色边和收边")
      })]
    })
  }) : null;
}

const oCo = Object.freeze(Object.defineProperty({
    __proto__: null,
    ImageCutoutHost: iCo
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  F3t = .08,
  l7 = .8,
  sCo = 1920,
  lCo = ["nw", "n", "ne", "e", "se", "s", "sw", "w"],
  QL = [{
    key: "free",
    label: "自由",
    ratio: null,
    width: 0,
    height: 0
  }, {
    key: "1:1",
    label: "1:1",
    ratio: 1,
    width: 1080,
    height: 1080
  }, {
    key: "4:3",
    label: "4:3",
    ratio: 4 / 3,
    width: 1440,
    height: 1080
  }, {
    key: "3:4",
    label: "3:4",
    ratio: 3 / 4,
    width: 1080,
    height: 1440
  }, {
    key: "16:9",
    label: "16:9",
    ratio: 16 / 9,
    width: 1920,
    height: 1080
  }, {
    key: "9:16",
    label: "9:16",
    ratio: 9 / 16,
    width: 1080,
    height: 1920
  }, {
    key: "21:9",
    label: "21:9",
    ratio: 21 / 9,
    width: 2520,
    height: 1080
  }, {
    key: "2:3",
    label: "2:3",
    ratio: 2 / 3,
    width: 1080,
    height: 1620
  }],
  cCo = ["自由", "1:1", "16:9"],
  dCo = ["9:16", "3:4", "2:3"],
  uCo = ["4:3", "21:9", "重置"];

function xV(e, t, n, r) {
  return {
    id: `${e}-${t}`,
    group: e,
    label: t,
    icon: [n, r],
    ratio: n / r,
    width: 0,
    height: 0
  };
}

function Zx(e, t, n, r) {
  return {
    id: `${e}-${t}-${n}x${r}`,
    group: e,
    label: t,
    description: `${n}×${r}`,
    icon: [n, r],
    ratio: n / r,
    width: n,
    height: r
  };
}

const Gwr = [{
  name: "General",
  label: "通用",
  options: [xV("General", "1:1", 1, 1), xV("General", "3:4", 3, 4), xV("General", "2:3", 2, 3), xV("General", "9:16", 9, 16), xV("General", "4:3", 4, 3), xV("General", "3:2", 3, 2), xV("General", "16:9", 16, 9)]
}, {
  name: "Instagram",
  label: "Instagram",
  options: [Zx("Instagram", "正方形", 1080, 1080), Zx("Instagram", "快拍", 1080, 1920), Zx("Instagram", "竖版", 1080, 1350), Zx("Instagram", "横版", 1080, 566), Zx("Instagram", "头像", 320, 320)]
}, {
  name: "Facebook",
  label: "Facebook",
  options: [Zx("Facebook", "快拍", 1080, 1920), Zx("Facebook", "帖子", 1200, 630), Zx("Facebook", "头像", 170, 170)]
}, {
  name: "TikTok",
  label: "TikTok",
  options: [Zx("TikTok", "视频", 1080, 1920)]
}, {
  name: "YouTube",
  label: "YouTube",
  options: [Zx("YouTube", "缩略图", 1280, 720)]
}, {
  name: "LinkedIn",
  label: "LinkedIn",
  options: [Zx("LinkedIn", "帖子", 1200, 627), Zx("LinkedIn", "头像", 400, 400)]
}, {
  name: "Twitter",
  label: "Twitter",
  options: [Zx("Twitter", "封面", 1500, 500), Zx("Twitter", "横版", 1024, 512), Zx("Twitter", "头像", 400, 400)]
}];

function hCo(e) {
  return {
    key: e.id,
    label: e.label,
    ratio: e.ratio,
    width: e.width,
    height: e.height
  };
}

function sGe(e, t) {
  const n = e / (t || 1);
  if (n >= 1) {
    const r = 1 / n;
    return {
      x: 0,
      y: (1 - r) / 2,
      width: 1,
      height: r
    };
  }
  return {
    x: (1 - n) / 2,
    y: 0,
    width: n,
    height: 1
  };
}

function Vwr(e, t, n, r, a) {
  if (!n || !r || e < 1 || t < 1) return {
    x: .1,
    y: .1,
    width: l7,
    height: l7
  };
  if (e > n || t > r) return sGe(e / t, n / r);
  const i = py(e / n, F3t, 1),
    o = py(t / r, F3t, 1),
    s = (a == null ? void 0 : a.x) ?? .5,
    l = (a == null ? void 0 : a.y) ?? .5;
  return {
    x: py(s - i / 2, 0, 1 - i),
    y: py(l - o / 2, 0, 1 - o),
    width: i,
    height: o
  };
}

function pCo(e, t, n) {
  return e.width > 0 && e.height > 0 ? Vwr(e.width, e.height, t, n) : sGe(e.ratio, t / (n || 1));
}

function py(e, t, n) {
  return Math.max(t, Math.min(n, e));
}

function qPe(e) {
  return Math.max(2, Math.floor(e / 2) * 2);
}

function KPe(e, t) {
  const n = e == null ? void 0 : e.ratio;
  if (!n) return {
    x: .1,
    y: .1,
    width: l7,
    height: l7
  };
  const r = n / (t || 16 / 9);
  let a = l7,
    i = a / r;
  return i > l7 && (i = l7, a = i * r), {
    x: (1 - a) / 2,
    y: (1 - i) / 2,
    width: a,
    height: i
  };
}

function mCo(e, t, n) {
  if (e >= n.x && e <= n.x + n.width && t >= n.y && t <= n.y + n.height) return null;
  const a = Math.min(l7, n.width),
    i = Math.min(l7, n.height);
  return {
    x: py(e - a / 2, 0, 1 - a),
    y: py(t - i / 2, 0, 1 - i),
    width: a,
    height: i
  };
}

function fCo(e, t, n) {
  return {
    ...e,
    x: py(e.x + t, 0, 1 - e.width),
    y: py(e.y + n, 0, 1 - e.height)
  };
}

function gCo(e, t, n, r, a, i) {
  const o = F3t,
    s = a ? a / (i || 1) : null;
  let l = e.x,
    d = e.y,
    u = e.x + e.width,
    h = e.y + e.height;
  if (!s) return t.includes("w") && (l += n), t.includes("e") && (u += n), t.includes("n") && (d += r), t.includes("s") && (h += r), u - l < o && (t.includes("w") ? l = u - o : u = l + o), h - d < o && (t.includes("n") ? d = h - o : h = d + o), l = py(l, 0, 1 - o), d = py(d, 0, 1 - o), u = py(u, l + o, 1), h = py(h, d + o, 1), {
    x: l,
    y: d,
    width: u - l,
    height: h - d
  };
  const p = e.x + e.width / 2,
    m = e.y + e.height / 2,
    f = t.includes("w"),
    y = t.includes("e"),
    b = t.includes("n"),
    v = t.includes("s");
  if ((f || y) && (b || v)) {
    const C = f ? e.x + e.width : e.x,
      I = b ? e.y + e.height : e.y,
      E = f ? e.x + n : e.x + e.width + n,
      M = b ? e.y + r : e.y + e.height + r,
      T = Math.max(o, Math.abs(E - C)),
      P = Math.max(o, Math.abs(M - I)),
      R = {
        width: T,
        height: T / s
      },
      j = {
        width: P * s,
        height: P
      },
      B = R.height <= P ? R : j;
    f ? (l = C - B.width, u = C) : (l = C, u = C + B.width), b ? (d = I - B.height, h = I) : (d = I, h = I + B.height);
  } else if (f || y) {
    f && (l = e.x + n), y && (u = e.x + e.width + n);
    let C = Math.max(o, u - l),
      I = C / s;
    I < o && (I = o, C = I * s), d = m - I / 2, h = m + I / 2, f && (l = u - C), y && (u = l + C);
  } else if (b || v) {
    b && (d = e.y + r), v && (h = e.y + e.height + r);
    let C = Math.max(o, h - d),
      I = C * s;
    I < o && (I = o, C = I / s), l = p - I / 2, u = p + I / 2, b && (d = h - C), v && (h = d + C);
  }
  let _ = u - l,
    w = h - d;
  const k = Math.min(1, f ? e.x + e.width : 1 - e.x),
    A = Math.min(1, b ? e.y + e.height : 1 - e.y),
    S = Math.max(o, Math.min(k, A * s));
  if (_ = Math.min(Math.max(o, _), S), w = _ / s, (f || y) && (b || v)) {
    const C = f ? e.x + e.width : e.x,
      I = b ? e.y + e.height : e.y;
    f ? (l = C - _, u = C) : (l = C, u = C + _), b ? (d = I - w, h = I) : (d = I, h = I + w);
  } else {
    const C = py((l + u) / 2, _ / 2, 1 - _ / 2),
      I = py((d + h) / 2, w / 2, 1 - w / 2);
    l = C - _ / 2, u = C + _ / 2, d = I - w / 2, h = I + w / 2;
  }
  return l = py(l, 0, 1 - _), d = py(d, 0, 1 - w), {
    x: l,
    y: d,
    width: _,
    height: w
  };
}

function yCo(e, t, n, r) {
  const a = t.width,
    i = t.height;
  if (!a || !i) throw new Error("视频信息无效，无法执行裁剪");
  let o = qPe(Math.round(e.width * a)),
    s = qPe(Math.round(e.height * i)),
    l = Math.round(e.x * a);
  r && (l = a - l - o), l = py(l, 0, Math.max(0, a - o));
  const d = py(Math.round(e.y * i), 0, Math.max(0, i - s)),
    u = (n == null ? void 0 : n.ratio) || null;
  let h = u ? Math.round((n == null ? void 0 : n.width) || o) : o,
    p = u ? Math.round((n == null ? void 0 : n.height) || s) : s;
  const m = Math.min(1, sCo / Math.max(h, p));
  return h = qPe(Math.floor(h * m / 2) * 2), p = qPe(Math.floor(p * m / 2) * 2), {
    cropX: l,
    cropY: d,
    cropW: o,
    cropH: s,
    outW: h,
    outH: p,
    stretch: h !== o || p !== s
  };
}

function Hwr(e, t, n) {
  const r = t.width,
    a = t.height;
  if (!r || !a) throw new Error("图片信息无效，无法执行裁剪");
  let i = Math.max(1, Math.round(e.width * r)),
    o = Math.max(1, Math.round(e.height * a)),
    s = Math.round(e.x * r);
  n && (s = r - s - i), s = py(s, 0, Math.max(0, r - i));
  const l = py(Math.round(e.y * a), 0, Math.max(0, a - o));
  return i = Math.min(i, r - s), o = Math.min(o, a - l), {
    cropX: s,
    cropY: l,
    cropW: i,
    cropH: o,
    outW: i,
    outH: o,
    stretch: !1
  };
}

function bCo(e, t, n, r) {
  if (!e || !t || !n || !r) return {
    left: 0,
    top: 0,
    width: e,
    height: t
  };
  const a = e / t,
    i = n / r;
  if (a > i) {
    const l = t,
      d = l * i;
    return {
      left: (e - d) / 2,
      top: 0,
      width: d,
      height: l
    };
  }
  const o = e,
    s = o / i;
  return {
    left: 0,
    top: (t - s) / 2,
    width: o,
    height: s
  };
}

function vwe(e) {
  if (e != null && e.aborted) {
    const t = new Error("已取消画幅裁切");
    throw t.cancelled = !0, t;
  }
}

function _vn(e) {
  return new Promise(t => {
    window.setTimeout(t, e);
  });
}

function vCo() {
  if (typeof window > "u") return !1;
  const e = window;
  return !!(e.__TAURI__ || e.__TAURI_INTERNALS__);
}

function kvn(e, t) {
  const n = e.includes("\\") ? "\\" : "/";
  return `${e.replace(/[\\/]+$/, "")}${n}${t}`;
}

function wCo() {
  const e = ["video/mp4;codecs=avc1.42E01E", "video/mp4"],
    t = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"];
  for (const n of e) if (typeof MediaRecorder < "u" && MediaRecorder.isTypeSupported(n)) return {
    mime: n,
    ext: "mp4"
  };
  for (const n of t) if (typeof MediaRecorder < "u" && MediaRecorder.isTypeSupported(n)) return {
    mime: n,
    ext: "webm"
  };
  return {
    mime: "",
    ext: "webm"
  };
}

function xCo(e, t) {
  return new Promise((n, r) => {
    const a = Number.isFinite(e.duration) ? Math.max(0, Math.min(t, Math.max(0, e.duration - .001))) : Math.max(0, t),
      i = () => {
        e.removeEventListener("seeked", i), e.removeEventListener("error", o), n();
      },
      o = () => {
        var s;
        e.removeEventListener("seeked", i), e.removeEventListener("error", o), r(new Error(((s = e.error) == null ? void 0 : s.message) || "视频解码失败"));
      };
    if (e.addEventListener("seeked", i), e.addEventListener("error", o), Math.abs(e.currentTime - a) < 8e-4) {
      e.removeEventListener("seeked", i), e.removeEventListener("error", o), n();
      return;
    }
    e.currentTime = a;
  });
}

async function _Co(e) {
  const t = document.createElement("video");
  return t.muted = !0, t.playsInline = !0, t.preload = "auto", t.crossOrigin = e.startsWith("http") ? "anonymous" : null, await new Promise((n, r) => {
    const a = () => {
      if (!t.videoWidth) {
        r(new Error("当前浏览器无法解码该视频画面（可能是 HEVC 编码），无法裁剪"));
        return;
      }
      n();
    };
    t.onloadedmetadata = a, t.onerror = () => {
      r(new Error("当前浏览器无法解码该视频画面（可能是 HEVC 编码），无法裁剪"));
    }, t.src = e;
  }), t;
}

async function kCo(e) {
  if (!e) return null;
  const t = e.settings || {},
    n = typeof t._localCacheAssetId == "string" && t._localCacheAssetId.trim() || typeof t._contentAssetId == "string" && t._contentAssetId.trim() || typeof t._assetId == "string" && t._assetId.trim() || "";
  if (!n) return null;
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
    return await r.ensureRestored(), (await r.getAssetSourcePath(n)) || null;
  } catch {
    return null;
  }
}

async function ACo(e) {
  var t, n, r, a;
  if (!vCo()) return null;
  try {
    const {
        invoke: i
      } = await Ie(async () => {
        const {
          invoke: f
        } = await Promise.resolve().then(() => sd);
        return {
          invoke: f
        };
      }, void 0, import.meta.url),
      {
        readFileAsBlob: o,
        writeBlobToFile: s
      } = await Ie(async () => {
        const {
          readFileAsBlob: f,
          writeBlobToFile: y
        } = await Promise.resolve().then(() => hg);
        return {
          readFileAsBlob: f,
          writeBlobToFile: y
        };
      }, void 0, import.meta.url);
    (t = e.onProgress) == null || t.call(e, {
      percent: 10,
      text: "正在准备按原时长裁剪..."
    });
    const l = await kCo(e.sourceNode),
      d = await i("get_export_temp_dir"),
      u = kvn(d, `aspect_cropped_${Date.now()}.mp4`);
    let h = l || "",
      p = !1;
    if (!h) if (/^file:/i.test(e.url) || /^[A-Za-z]:[\\/]/.test(e.url) || e.url.startsWith("\\\\")) h = e.url;else {
      (n = e.onProgress) == null || n.call(e, {
        percent: 16,
        text: "正在下载源视频..."
      });
      const y = await fetch(e.url);
      if (!y.ok) throw new Error(`源视频下载失败 (${y.status})`);
      const b = await y.blob();
      vwe(e.signal), h = kvn(d, `aspect_crop_src_${Date.now()}.mp4`), await s(h, b), p = !0;
    }
    vwe(e.signal), (r = e.onProgress) == null || r.call(e, {
      percent: 28,
      text: "正在按原时长裁剪..."
    }), await i("ffmpeg_crop_video", {
      args: {
        input: h,
        outputPath: u,
        cropX: e.plan.cropX,
        cropY: e.plan.cropY,
        cropW: e.plan.cropW,
        cropH: e.plan.cropH,
        outW: e.plan.outW,
        outH: e.plan.outH,
        mirror: e.mirror
      }
    }), vwe(e.signal), (a = e.onProgress) == null || a.call(e, {
      percent: 88,
      text: "正在读取裁剪结果..."
    });
    const m = await o(u);
    if (p) try {
      const {
        remove: f
      } = await Ie(async () => {
        const {
          remove: y
        } = await Promise.resolve().then(() => oc);
        return {
          remove: y
        };
      }, void 0, import.meta.url);
      await f(h);
    } catch {}
    try {
      const {
        remove: f
      } = await Ie(async () => {
        const {
          remove: y
        } = await Promise.resolve().then(() => oc);
        return {
          remove: y
        };
      }, void 0, import.meta.url);
      await f(u);
    } catch {}
    return m.size ? {
      blob: m,
      fileName: "aspect_cropped_video.mp4"
    } : null;
  } catch (i) {
    return console.warn("[videoAspectCrop] FFmpeg 裁剪不可用，回退浏览器编码:", i), null;
  }
}

async function SCo(e) {
  var n, r;
  const t = await _Co(e.url);
  try {
    vwe(e.signal);
    const a = Number.isFinite(t.duration) ? t.duration : 0,
      i = 24,
      o = Math.max(1, Math.round((a || 1 / i) * i)),
      {
        mime: s,
        ext: l
      } = wCo(),
      d = document.createElement("canvas");
    d.width = e.plan.outW, d.height = e.plan.outH;
    const u = d.getContext("2d");
    if (!u) throw new Error("无法创建画布");
    u.imageSmoothingEnabled = !0, u.imageSmoothingQuality = "high";
    const h = d.captureStream(i),
      p = h.getVideoTracks()[0],
      m = [],
      f = typeof MediaRecorder < "u" && s ? new MediaRecorder(h, {
        mimeType: s,
        videoBitsPerSecond: 6e6
      }) : null;
    if (!f) throw new Error("当前浏览器无法编码裁剪视频");
    f.ondataavailable = k => {
      var A;
      (A = k.data) != null && A.size && m.push(k.data);
    };
    const y = new Promise((k, A) => {
      f.onstop = () => k(), f.onerror = () => A(new Error("画幅裁切编码失败"));
    });
    f.start();
    const b = performance.now(),
      v = Math.max(1e3 / i, (a || o / i) * 1e3);
    for (let k = 0; k < o; k++) {
      vwe(e.signal);
      const A = o <= 1 ? 0 : k / Math.max(1, o - 1) * Math.max(0, a - .001);
      await xCo(t, A), u.setTransform(1, 0, 0, 1, 0, 0), u.clearRect(0, 0, e.plan.outW, e.plan.outH), e.mirror && u.setTransform(-1, 0, 0, 1, e.plan.outW, 0), u.drawImage(t, e.plan.cropX, e.plan.cropY, e.plan.cropW, e.plan.cropH, 0, 0, e.plan.outW, e.plan.outH), (n = p == null ? void 0 : p.requestFrame) == null || n.call(p);
      const C = b + (k + 1) / o * v - performance.now();
      C > 1 && (await _vn(C)), (r = e.onProgress) == null || r.call(e, {
        percent: Math.round(12 + (k + 1) / o * 78),
        text: `正在裁剪视频... ${k + 1}/${o}`
      });
    }
    const _ = b + v - performance.now();
    _ > 1 && (await _vn(_)), f.stop(), await y;
    const w = new Blob(m, {
      type: f.mimeType || s || "video/webm"
    });
    if (!w.size) throw new Error("裁剪结果为空");
    return {
      blob: w,
      fileName: `aspect_cropped_video.${l}`
    };
  } finally {
    t.removeAttribute("src"), t.load(), t.remove();
  }
}

async function ICo(e) {
  var a, i;
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
    const s = (await ACo({
      url: n,
      sourceNode: e.sourceNode,
      plan: e.plan,
      mirror: e.mirror,
      signal: e.signal,
      onProgress: e.onProgress
    })) || (await SCo({
      url: n,
      plan: e.plan,
      mirror: e.mirror,
      signal: e.signal,
      onProgress: e.onProgress
    }));
    return (i = e.onProgress) == null || i.call(e, {
      percent: 94,
      text: "正在保存裁剪视频..."
    }), {
      blob: s.blob,
      width: e.plan.outW,
      height: e.plan.outH,
      fileName: s.fileName
    };
  } finally {
    r == null || r();
  }
}

async function CCo(e) {
  const t = await Ope(e.blob, {
    sourceNodeId: e.sourceNode.id,
    width: e.width,
    height: e.height,
    fileName: e.fileName,
    source: "video_aspect_crop",
    assetPrefix: "video_aspect_crop",
    extraSettings: {
      videoAspectCropConfig: {
        preset: e.preset,
        cropRect: e.cropRect,
        mirrorHorizontal: e.mirrorHorizontal
      },
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
    nodeName: "画幅裁切视频"
  });
}

function QPe(e) {
  if (e != null && e.aborted) {
    const t = new Error("已取消画幅裁切");
    throw t.cancelled = !0, t;
  }
}

async function ECo(e) {
  try {
    const n = await fetch(e);
    if (n.ok) {
      const r = await n.blob();
      if (r.size) {
        const a = await createImageBitmap(r),
          i = {
            width: a.width,
            height: a.height
          };
        if (a.close(), i.width > 0 && i.height > 0) return i;
      }
    }
  } catch {}
  const t = new Image();
  if (t.crossOrigin = e.startsWith("http") ? "anonymous" : null, await new Promise((n, r) => {
    t.onload = () => n(), t.onerror = () => r(new Error("图片加载失败")), t.src = e;
  }), !t.naturalWidth || !t.naturalHeight) throw new Error("图片尺寸无效");
  return {
    width: t.naturalWidth,
    height: t.naturalHeight
  };
}

async function TCo(e) {
  const t = await createImageBitmap(e),
    n = document.createElement("canvas");
  n.width = t.width, n.height = t.height;
  const r = n.getContext("2d");
  if (!r) throw t.close(), new Error("无法创建画布");
  r.setTransform(-1, 0, 0, 1, n.width, 0), r.drawImage(t, 0, 0), t.close();
  const a = await new Promise(i => {
    n.toBlob(o => i(o), "image/png");
  });
  if (!(a != null && a.size)) throw new Error("镜像导出失败");
  return a;
}

async function MCo(e) {
  var s, l, d, u;
  const {
    resolveInputImageNodeContentForCrop: t
  } = await Ie(async () => {
    const {
      resolveInputImageNodeContentForCrop: h
    } = await Promise.resolve().then(() => ii);
    return {
      resolveInputImageNodeContentForCrop: h
    };
  }, void 0, import.meta.url);
  (s = e.onProgress) == null || s.call(e, {
    percent: 8,
    text: "正在准备原图..."
  });
  const n = (await t(e.sourceNode)).trim();
  if (!n) throw new Error("无法解析图片地址");
  QPe(e.signal), (l = e.onProgress) == null || l.call(e, {
    percent: 22,
    text: "正在读取图片尺寸..."
  });
  const r = await ECo(n),
    a = Hwr(e.cropRect, r, e.mirror);
  QPe(e.signal), (d = e.onProgress) == null || d.call(e, {
    percent: 48,
    text: "正在裁剪图片..."
  });
  const i = await VCn(n, {
    x: a.cropX,
    y: a.cropY,
    w: a.cropW,
    h: a.cropH
  });
  QPe(e.signal);
  let o;
  try {
    const h = await fetch(i.url);
    if (!h.ok) throw new Error(`无法读取裁剪结果（HTTP ${h.status}）`);
    o = await h.blob();
  } finally {
    i.url.startsWith("blob:") && URL.revokeObjectURL(i.url);
  }
  if (!(o != null && o.size)) throw new Error("裁剪结果为空");
  return e.mirror && ((u = e.onProgress) == null || u.call(e, {
    percent: 72,
    text: "正在水平镜像..."
  }), o = await TCo(o), QPe(e.signal)), {
    blob: o,
    width: a.outW,
    height: a.outH,
    fileName: `aspect_cropped_${Date.now()}.png`,
    plan: a
  };
}

async function PCo(e) {
  var s;
  const t = await JS(e.blob, "aspect_crop", {
    sourceNodeId: e.sourceNode.id
  });
  t.settings = {
    ...t.settings,
    mediaType: "image",
    source: "image_aspect_crop",
    imageAspectCropConfig: {
      preset: e.preset,
      cropRect: e.cropRect,
      mirrorHorizontal: e.mirrorHorizontal
    },
    sourceNodeId: e.sourceNode.id
  };
  const n = kc(e.width, e.height),
    r = e.sourceNode.width ?? 300,
    a = e.sourceNode.height ?? 200,
    i = e.generateId(),
    o = Ki(i, "input-image", (e.sourceNode.x ?? 0) + r + 24, e.sourceNode.y ?? 0, "画幅裁切", t.settings, e.nodes || []);
  return e.setNodes(l => [...l, {
    ...o,
    content: t.content,
    width: n.width || r,
    height: n.height || a,
    settings: {
      ...o.settings,
      ...t.settings,
      mediaType: "image"
    }
  }]), (s = e.setSelectedNodeId) == null || s.call(e, i), i;
}

function Avn({
  label: e,
  value: t,
  disabled: n,
  isDark: r = !0,
  onCommit: a
}) {
  on();
  const [i, o] = g.useState(String(t || ""));
  g.useEffect(() => {
    o(t > 0 ? String(t) : "");
  }, [t]);
  const s = () => {
    const l = Math.round(Number(i));
    if (!Number.isFinite(l) || l < 1) {
      o(t > 0 ? String(t) : "");
      return;
    }
    a(l);
  };
  return c.jsxs("label", {
    className: `flex h-9 min-w-0 flex-1 items-center gap-1.5 rounded-xl px-3 ${r ? "bg-black/40" : "bg-zinc-100"}`,
    children: [c.jsx("span", {
      className: `text-[11px] ${r ? "text-white/35" : "text-zinc-400"}`,
      children: e
    }), c.jsx("input", {
      className: `w-full bg-transparent text-[13px] tabular-nums outline-none ${r ? "text-white" : "text-zinc-900"}`,
      value: i,
      inputMode: "numeric",
      disabled: n,
      onChange: l => o(l.target.value.replace(/[^\d]/g, "")),
      onBlur: s,
      onKeyDown: l => {
        l.key === "Enter" && (l.preventDefault(), l.currentTarget.blur());
      }
    })]
  });
}

const Svn = Gwr.filter(e => e.name !== "General"),
  RCo = [["Instagram", "Facebook", "TikTok"], ["YouTube", "LinkedIn", "Twitter"]];

function Yte({
  options: e,
  value: t,
  disabled: n,
  isDark: r = !0,
  onChange: a
}) {
  on();
  const i = g.useRef(null),
    o = g.useRef(null),
    [s, l] = g.useState(null),
    d = e.indexOf(t),
    u = d >= 0,
    h = s ?? Math.max(0, d),
    p = u || s != null ? Math.round(Math.min(e.length - 1, Math.max(0, h))) : -1,
    m = s != null,
    f = y => {
      const b = o.current;
      if (!b || y.pointerId !== b.pointerId) return;
      const v = i.current,
        _ = b.moved ? Math.round(Math.min(e.length - 1, Math.max(0, b.origin + (y.clientX - b.startX) / b.segW))) : Math.min(e.length - 1, Math.max(0, Math.floor((y.clientX - ((v == null ? void 0 : v.getBoundingClientRect().left) ?? 0) - 3) / b.segW)));
      o.current = null, l(null), n || a(e[_]), v == null || v.addEventListener("click", w => {
        w.preventDefault(), w.stopPropagation();
      }, {
        capture: !0,
        once: !0
      });
    };
  return c.jsxs("div", {
    ref: i,
    className: `relative flex min-w-0 flex-1 touch-none select-none items-center rounded-full p-[3px] ${r ? "bg-black/40" : "bg-zinc-200/90"} ${n ? "pointer-events-none opacity-50" : m ? "cursor-grabbing" : "cursor-grab"}`,
    onPointerDown: y => {
      if (n) return;
      const b = i.current;
      b && (o.current = {
        pointerId: y.pointerId,
        startX: y.clientX,
        origin: Math.max(0, d),
        segW: (b.clientWidth - 6) / e.length,
        moved: !1
      }, b.setPointerCapture(y.pointerId));
    },
    onPointerMove: y => {
      const b = o.current;
      if (!b || y.pointerId !== b.pointerId) return;
      const v = y.clientX - b.startX;
      !b.moved && Math.abs(v) < 5 || (b.moved = !0, l(Math.min(e.length - 1, Math.max(0, b.origin + v / b.segW))));
    },
    onPointerUp: f,
    onPointerCancel: f,
    children: [p >= 0 ? c.jsx("div", {
      className: `pointer-events-none absolute bottom-[3px] left-[3px] top-[3px] rounded-full ${r ? "bg-white/90" : "bg-white"}`,
      style: {
        width: `calc((100% - 6px) / ${e.length})`,
        transform: `translateX(${h * 100}%)`,
        transition: m ? "none" : "transform 320ms cubic-bezier(0.32, 0.72, 0, 1)"
      }
    }) : null, e.map((y, b) => c.jsx("button", {
      type: "button",
      className: `relative z-10 flex h-7 flex-1 items-center justify-center whitespace-nowrap rounded-full px-1 text-[11px] font-medium leading-none transition-colors duration-200 ${b === p ? "text-zinc-900" : r ? "text-white/50 hover:text-white/80" : "text-zinc-500 hover:text-zinc-800"}`,
      onClick: () => !n && a(y),
      children: y
    }, y))]
  });
}

function _V({
  label: e,
  isDark: t = !0,
  children: n
}) {
  return on(), c.jsxs("div", {
    className: "flex items-center gap-3",
    children: [c.jsx("div", {
      className: `w-[4.25rem] shrink-0 text-[11px] ${t ? "text-white/45" : "text-zinc-500"}`,
      children: e
    }), n]
  });
}

const Wwr = {
  n: "ns-resize",
  s: "ns-resize",
  e: "ew-resize",
  w: "ew-resize",
  nw: "nwse-resize",
  se: "nwse-resize",
  ne: "nesw-resize",
  sw: "nesw-resize"
};

function NCo(e) {
  const t = {
    position: "absolute",
    width: 12,
    height: 12,
    margin: -6,
    borderRadius: 999,
    background: "#fff",
    border: "2px solid rgba(0,0,0,0.55)",
    zIndex: 3,
    cursor: Wwr[e],
    touchAction: "none"
  };
  return e.includes("n") && (t.top = 0), e.includes("s") && (t.bottom = 0), e.includes("w") && (t.left = 0), e.includes("e") && (t.right = 0), (e === "n" || e === "s") && (t.left = "50%"), (e === "e" || e === "w") && (t.top = "50%"), t;
}

function jCo({
  open: e,
  videoUrl: t,
  imageUrl: n,
  sourceNode: r,
  nodes: a,
  generateId: i,
  setNodes: o,
  setSelectedNodeId: s,
  onClose: l,
  isDark: d = !0
}) {
  var we;
  on();
  const u = n !== void 0,
    h = (n || t || "").trim(),
    p = g.useRef(null),
    m = g.useRef(null),
    f = g.useRef(null),
    y = g.useRef(() => {}),
    b = g.useRef(null),
    [v, _] = g.useState({
      width: 0,
      height: 0,
      duration: 0
    }),
    [w, k] = g.useState(QL[0]),
    [A, S] = g.useState(!1),
    [C, I] = g.useState(null),
    [E, M] = g.useState(null),
    [T, P] = g.useState(!1),
    [R, j] = g.useState({
      x: .1,
      y: .1,
      width: .8,
      height: .8
    }),
    [B, F] = g.useState({
      left: 0,
      top: 0,
      width: 0,
      height: 0
    }),
    [N, G] = g.useState(!1),
    [z, V] = g.useState(0),
    [O, L] = g.useState(""),
    D = v.width && v.height ? v.width / v.height : 16 / 9,
    U = {
      width: v.width ? Math.max(1, Math.round(R.width * v.width)) : 0,
      height: v.height ? Math.max(1, Math.round(R.height * v.height)) : 0
    },
    H = A ? w.ratio || (U.height ? U.width / U.height : null) : null,
    Y = !A || w.key === "free" ? "自由" : w.label === "1:1" || w.label === "16:9" ? w.label : "",
    K = w.label === "9:16" || w.label === "3:4" || w.label === "2:3" ? w.label : "",
    W = w.label === "4:3" || w.label === "21:9" ? w.label : "",
    Q = Svn.find(X => X.name === E),
    q = g.useMemo(() => {
      if (!v.width || !v.height) return null;
      try {
        return u ? Hwr(R, v, T) : yCo(R, v, w, T);
      } catch {
        return null;
      }
    }, [u, R, v, w, T]);
  g.useEffect(() => {
    e && (k(QL[0]), S(!1), I(null), M(null), P(!1), G(!1), V(0), L(""), _({
      width: 0,
      height: 0,
      duration: 0
    }), j({
      x: .1,
      y: .1,
      width: .8,
      height: .8
    }));
  }, [e, h]), g.useEffect(() => {
    if (!e || !h) return;
    if (u) {
      let re = !1;
      const fe = new Image();
      return fe.crossOrigin = h.startsWith("http") ? "anonymous" : null, fe.onload = () => {
        if (re) return;
        const ye = fe.naturalWidth || 0,
          ie = fe.naturalHeight || 0;
        _({
          width: ye,
          height: ie,
          duration: 0
        }), j(KPe(QL[0], ye && ie ? ye / ie : 16 / 9));
      }, fe.onerror = () => {
        re || _({
          width: 0,
          height: 0,
          duration: 0
        });
      }, fe.src = h, () => {
        re = !0, fe.src = "";
      };
    }
    const X = document.createElement("video");
    X.muted = !0, X.playsInline = !0, X.preload = "metadata", X.crossOrigin = h.startsWith("http") ? "anonymous" : null;
    const Z = () => {
      const re = X.videoWidth || 0,
        fe = X.videoHeight || 0;
      _({
        width: re,
        height: fe,
        duration: Number.isFinite(X.duration) ? X.duration : 0
      }), j(KPe(QL[0], re && fe ? re / fe : 16 / 9));
    };
    return X.onloadedmetadata = Z, X.onerror = () => _({
      width: 0,
      height: 0,
      duration: 0
    }), X.src = h, () => {
      X.removeAttribute("src"), X.load(), X.remove();
    };
  }, [e, h, u]), g.useLayoutEffect(() => {
    if (!e) return;
    const X = p.current;
    if (!X) return;
    const Z = () => {
      const ie = X.parentElement;
      if (!ie) return;
      const ae = X.getBoundingClientRect(),
        be = ie.querySelector("video, img");
      if (!be || ae.width < 2 || ae.height < 2) {
        F({
          left: 0,
          top: 0,
          width: X.clientWidth,
          height: X.clientHeight
        });
        return;
      }
      const Ee = be.getBoundingClientRect(),
        xe = X.clientWidth / ae.width,
        he = bCo(be.clientWidth, be.clientHeight, "videoWidth" in be ? be.videoWidth || v.width : be.naturalWidth || v.width, "videoHeight" in be ? be.videoHeight || v.height : be.naturalHeight || v.height);
      F({
        left: (Ee.left - ae.left) * xe + he.left,
        top: (Ee.top - ae.top) * xe + he.top,
        width: he.width,
        height: he.height
      });
    };
    Z();
    const re = new ResizeObserver(Z);
    re.observe(X);
    const fe = X.parentElement;
    fe && re.observe(fe);
    const ye = fe == null ? void 0 : fe.querySelector("video, img");
    return ye && re.observe(ye), () => re.disconnect();
  }, [e, v.width, v.height, h]), g.useEffect(() => {
    var fe;
    if (!e) return;
    const X = (fe = p.current) == null ? void 0 : fe.parentElement,
      Z = X == null ? void 0 : X.querySelector("video, img");
    if (!Z) return;
    const re = Z.style.transform;
    return Z.style.transform = T ? "scaleX(-1)" : "", () => {
      Z.style.transform = re;
    };
  }, [e, T, h]);
  const ne = X => {
      I(X.id), S(!0), k(hCo(X)), M(X.group === "General" ? null : X.group), j(pCo(X, v.width, v.height));
    },
    de = X => {
      if (X === "自由") {
        M(null), I(null), S(!1), k(QL[0]), j(KPe(QL[0], D));
        return;
      }
      if (X === "重置") {
        j(w.ratio ? sGe(w.ratio, D) : KPe(QL[0], D));
        return;
      }
      const Z = Gwr[0].options.find(fe => fe.label === X);
      if (Z) {
        ne(Z);
        return;
      }
      const re = QL.find(fe => fe.label === X);
      re != null && re.ratio && (M(null), I(null), S(!0), k(re), j(sGe(re.ratio, D)));
    },
    le = (X, Z) => {
      if (!v.width || !v.height) return;
      let re = Math.max(1, X),
        fe = Math.max(1, Z);
      const ye = H;
      ye && (fe = Math.max(1, Math.round(re / ye)));
      const ie = {
        x: R.x + R.width / 2,
        y: R.y + R.height / 2
      };
      j(Vwr(re, fe, v.width, v.height, ie)), I(null), M(null), k({
        key: "custom",
        label: "自定义",
        ratio: ye || (fe ? re / fe : null),
        width: 0,
        height: 0
      });
    },
    J = () => {
      if (A) {
        S(!1), k({
          ...w,
          ratio: null
        });
        return;
      }
      const X = U.height ? U.width / U.height : 1;
      S(!0), k({
        key: w.key === "free" ? "custom" : w.key,
        label: w.label === "自由" ? "自定义" : w.label,
        ratio: X,
        width: w.width,
        height: w.height
      });
    },
    pe = (X, Z, re) => {
      if (N) return;
      re.preventDefault(), re.stopPropagation(), b.current = {
        mode: X,
        handle: Z,
        startX: re.clientX,
        startY: re.clientY,
        initialRect: {
          ...R
        }
      };
      const fe = H,
        ye = ae => {
          const be = b.current,
            Ee = m.current;
          if (!be || !Ee) return;
          const xe = Ee.getBoundingClientRect();
          if (!xe.width || !xe.height) return;
          const he = (ae.clientX - be.startX) / xe.width,
            ue = (ae.clientY - be.startY) / xe.height;
          j(be.mode === "move" ? fCo(be.initialRect, he, ue) : gCo(be.initialRect, be.handle, he, ue, fe, D));
        },
        ie = () => {
          b.current = null, window.removeEventListener("pointermove", ye), window.removeEventListener("pointerup", ie);
        };
      window.addEventListener("pointermove", ye), window.addEventListener("pointerup", ie);
    },
    ce = async () => {
      var Z;
      if (N) {
        (Z = f.current) == null || Z.abort();
        return;
      }
      if (!h || !i || !o || !q) {
        Ai("error", i && o ? `无法解析${u ? "图片" : "视频"}地址` : "无法创建节点");
        return;
      }
      const X = new AbortController();
      f.current = X, G(!0), V(0), L("正在准备...");
      try {
        if (u) {
          const re = await MCo({
            sourceNode: r,
            cropRect: R,
            mirror: T,
            signal: X.signal,
            onProgress: ({
              percent: fe,
              text: ye
            }) => {
              V(ie => Math.max(ie, fe)), L(ye);
            }
          });
          await PCo({
            blob: re.blob,
            width: re.width,
            height: re.height,
            sourceNode: r,
            preset: w,
            cropRect: R,
            mirrorHorizontal: T,
            nodes: a,
            generateId: i,
            setNodes: o,
            setSelectedNodeId: s
          });
        } else {
          const re = await ICo({
            videoUrl: h,
            sourceNode: r,
            plan: q,
            mirror: T,
            signal: X.signal,
            onProgress: ({
              percent: fe,
              text: ye
            }) => {
              V(ie => Math.max(ie, fe)), L(ye);
            }
          });
          await CCo({
            blob: re.blob,
            fileName: re.fileName,
            width: re.width,
            height: re.height,
            sourceNode: r,
            preset: w,
            cropRect: R,
            mirrorHorizontal: T,
            nodes: a,
            generateId: i,
            setNodes: o,
            setSelectedNodeId: s
          });
        }
        Ai("success", "画幅裁切成功，已添加为新节点"), l();
      } catch (re) {
        const fe = !!(re != null && re.cancelled);
        Ai(fe ? "info" : "error", fe ? "已取消画幅裁切" : re instanceof Error ? re.message : "画幅裁切失败");
      } finally {
        f.current = null, G(!1);
      }
    };
  return y.current = () => {
    ce();
  }, g.useEffect(() => {
    if (!e) return;
    const X = Z => {
      if (Z.key === "Escape") {
        if (N) return;
        Z.preventDefault(), l();
        return;
      }
      if (Z.key !== "Enter" || N) return;
      const re = Z.target;
      re && (re.tagName === "INPUT" || re.tagName === "TEXTAREA" || re.isContentEditable) || (Z.preventDefault(), y.current());
    };
    return document.addEventListener("keydown", X, !0), () => document.removeEventListener("keydown", X, !0);
  }, [e, N, l]), e ? c.jsxs(c.Fragment, {
    children: [c.jsx("div", {
      ref: p,
      className: "pointer-events-none absolute inset-0 z-40 overflow-hidden",
      children: c.jsx("div", {
        ref: m,
        className: `absolute overflow-hidden ${N ? "pointer-events-none" : "pointer-events-auto"}`,
        style: {
          left: B.left,
          top: B.top,
          width: B.width || "100%",
          height: B.height || "100%"
        },
        onPointerDown: X => {
          if (N || X.target !== X.currentTarget) return;
          const Z = X.currentTarget.getBoundingClientRect(),
            re = mCo((X.clientX - Z.left) / Z.width, (X.clientY - Z.top) / Z.height, R);
          re && j(re);
        },
        children: c.jsxs("div", {
          className: "absolute",
          style: {
            left: `${R.x * 100}%`,
            top: `${R.y * 100}%`,
            width: `${R.width * 100}%`,
            height: `${R.height * 100}%`,
            border: "2px solid rgba(255,255,255,0.92)",
            boxShadow: "0 0 0 9999px rgba(0,0,0,0.42)",
            cursor: N ? "default" : "move"
          },
          onPointerDown: X => pe("move", "", X),
          children: [c.jsxs("div", {
            className: "pointer-events-none absolute inset-0",
            children: [c.jsx("div", {
              className: "absolute bottom-0 top-0 w-px bg-white/35",
              style: {
                left: "33.333%"
              }
            }), c.jsx("div", {
              className: "absolute bottom-0 top-0 w-px bg-white/35",
              style: {
                left: "66.666%"
              }
            }), c.jsx("div", {
              className: "absolute left-0 right-0 h-px bg-white/35",
              style: {
                top: "33.333%"
              }
            }), c.jsx("div", {
              className: "absolute left-0 right-0 h-px bg-white/35",
              style: {
                top: "66.666%"
              }
            }), c.jsx("div", {
              className: "absolute bottom-0 top-0 w-px bg-white/55",
              style: {
                left: "50%"
              }
            }), c.jsx("div", {
              className: "absolute left-0 right-0 h-px bg-white/55",
              style: {
                top: "50%"
              }
            }), c.jsx("div", {
              className: "absolute h-1.5 w-1.5 rounded-full bg-white/90",
              style: {
                left: "50%",
                top: "50%",
                margin: -3
              }
            })]
          }), ["n", "e", "s", "w"].map(X => c.jsx("div", {
            className: "absolute",
            style: {
              zIndex: 2,
              cursor: Wwr[X],
              ...(X === "n" || X === "s" ? {
                left: 12,
                right: 12,
                height: 14,
                [X === "n" ? "top" : "bottom"]: -7
              } : {
                top: 12,
                bottom: 12,
                width: 14,
                [X === "e" ? "right" : "left"]: -7
              })
            },
            onPointerDown: Z => pe("resize", X, Z)
          }, X)), lCo.map(X => c.jsx("div", {
            style: NCo(X),
            onPointerDown: Z => pe("resize", X, Z)
          }, X))]
        })
      })
    }), c.jsx("div", {
      className: "absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2",
      style: {
        pointerEvents: "auto"
      },
      onClick: X => X.stopPropagation(),
      onPointerDown: X => X.stopPropagation(),
      children: c.jsx(OT, {
        title: x("画幅裁切"),
        testId: "video-aspect-crop-panel",
        dataAttr: u ? "data-image-aspect-crop-panel" : "data-video-aspect-crop-panel",
        isDark: d,
        width: 436,
        generatePlacement: "footer",
        bodyClassName: "px-4 pb-3",
        onClose: N ? void 0 : l,
        onGenerate: () => void ce(),
        generateTitle: N ? "停止裁剪" : "确认裁剪",
        footer: N ? c.jsxs("div", {
          className: "flex min-w-0 flex-1 items-center gap-2",
          children: [c.jsxs("div", {
            className: "min-w-0 flex-1",
            children: [c.jsx("div", {
              className: `truncate text-[11px] ${d ? "text-white/45" : "text-zinc-500"}`,
              children: O || x("正在准备...")
            }), c.jsx("div", {
              className: `mt-1 h-1 overflow-hidden rounded-full ${d ? "bg-white/10" : "bg-zinc-200"}`,
              children: c.jsx("div", {
                className: `h-full rounded-full transition-[width] duration-300 ${d ? "bg-white/80" : "bg-zinc-800"}`,
                style: {
                  width: `${z}%`
                }
              })
            })]
          }), c.jsxs("span", {
            className: `tabular-nums text-[11px] ${d ? "text-white/55" : "text-zinc-500"}`,
            children: [z, "%"]
          })]
        }) : c.jsx("div", {
          className: `truncate text-center text-[11px] ${d ? "text-white/30" : "text-zinc-400"}`,
          children: q ? `${q.cropW} × ${q.cropH} → ${q.outW} × ${q.outH}` : x("拖拽画面框选区域，四角与四边可缩放")
        }),
        children: c.jsxs("div", {
          className: "flex flex-col gap-2",
          children: [c.jsx(_V, {
            label: x(u ? "源图片" : "源视频"),
            isDark: d,
            children: c.jsxs("div", {
              className: `flex min-w-0 flex-1 flex-wrap items-center gap-1.5 text-[11px] ${d ? "text-white/70" : "text-zinc-600"}`,
              children: [c.jsx("span", {
                className: "tabular-nums",
                children: v.width ? `${v.width} × ${v.height}` : x("读取中…")
              }), v.duration > 0 ? c.jsxs("span", {
                className: `rounded-full px-1.5 py-0.5 ${d ? "bg-white/10 text-white/45" : "bg-zinc-100 text-zinc-500"}`,
                children: [v.duration.toFixed(1), "s"]
              }) : null]
            })
          }), c.jsxs("div", {
            className: "flex items-center gap-2",
            children: [c.jsx(Avn, {
              label: "W",
              value: U.width,
              disabled: N || !v.width,
              isDark: d,
              onCommit: X => le(X, U.height)
            }), c.jsx("button", {
              type: "button",
              "aria-label": x(A ? "解锁比例" : "锁定比例"),
              title: x(A ? "解锁比例" : "锁定比例"),
              className: `flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${d ? A ? "bg-white/15 text-white" : "bg-black/40 text-white/40 hover:text-white/70" : A ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-400 hover:text-zinc-700"}`,
              disabled: N,
              onClick: J,
              children: A ? c.jsx(wz, {
                size: 15
              }) : c.jsx(jNr, {
                size: 15
              })
            }), c.jsx(Avn, {
              label: "H",
              value: U.height,
              disabled: N || !v.height,
              isDark: d,
              onCommit: X => {
                if (!(!v.width || !v.height)) {
                  if (H) {
                    le(Math.max(1, Math.round(X * H)), X);
                    return;
                  }
                  le(U.width, X);
                }
              }
            })]
          }), c.jsx(_V, {
            label: x("常用比例"),
            isDark: d,
            children: c.jsx(Yte, {
              options: cCo,
              value: Y,
              disabled: N,
              isDark: d,
              onChange: de
            })
          }), c.jsx(_V, {
            label: x("竖版"),
            isDark: d,
            children: c.jsx(Yte, {
              options: dCo,
              value: K,
              disabled: N,
              isDark: d,
              onChange: de
            })
          }), c.jsx(_V, {
            label: x("横版"),
            isDark: d,
            children: c.jsx(Yte, {
              options: uCo,
              value: W,
              disabled: N,
              isDark: d,
              onChange: de
            })
          }), c.jsx(_V, {
            label: x("平台"),
            isDark: d,
            children: c.jsx("div", {
              className: "flex min-w-0 flex-1 flex-col gap-1.5",
              children: RCo.map(X => c.jsx(Yte, {
                options: X,
                value: Q && X.includes(Q.label) ? Q.label : "",
                disabled: N || !v.width,
                isDark: d,
                onChange: Z => {
                  const re = Svn.find(ye => ye.label === Z),
                    fe = re == null ? void 0 : re.options[0];
                  fe && ne(fe);
                }
              }, X.join("-")))
            })
          }), Q && Q.options.length > 1 ? c.jsx(_V, {
            label: x("尺寸"),
            isDark: d,
            children: c.jsx(Yte, {
              options: Q.options.map(X => X.label),
              value: ((we = Q.options.find(X => X.id === C)) == null ? void 0 : we.label) || "",
              disabled: N,
              isDark: d,
              onChange: X => {
                const Z = Q.options.find(re => re.label === X);
                Z && ne(Z);
              }
            })
          }) : null, c.jsx(_V, {
            label: x("水平镜像"),
            isDark: d,
            children: c.jsx(Yte, {
              options: ["关闭", "开启"],
              value: T ? "开启" : "关闭",
              disabled: N,
              isDark: d,
              onChange: X => P(X === "开启")
            })
          })]
        })
      })
    })]
  }) : null;
}

const DCo = Object.freeze(Object.defineProperty({
  __proto__: null,
  VideoAspectCropHost: jCo
}, Symbol.toStringTag, {
  value: "Module"
}));

function wwe(e) {
  if (e != null && e.aborted) {
    const t = new Error("已取消时长裁切");
    throw t.cancelled = !0, t;
  }
}

function Ivn(e) {
  return new Promise(t => {
    window.setTimeout(t, e);
  });
}

function LCo() {
  if (typeof window > "u") return !1;
  const e = window;
  return !!(e.__TAURI__ || e.__TAURI_INTERNALS__);
}

function Cvn(e, t) {
  const n = e.includes("\\") ? "\\" : "/";
  return `${e.replace(/[\\/]+$/, "")}${n}${t}`;
}

function OCo() {
  const e = ["video/mp4;codecs=avc1.42E01E", "video/mp4"],
    t = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"];
  for (const n of e) if (typeof MediaRecorder < "u" && MediaRecorder.isTypeSupported(n)) return {
    mime: n,
    ext: "mp4"
  };
  for (const n of t) if (typeof MediaRecorder < "u" && MediaRecorder.isTypeSupported(n)) return {
    mime: n,
    ext: "webm"
  };
  return {
    mime: "",
    ext: "webm"
  };
}

function BCo(e, t) {
  return new Promise((n, r) => {
    const a = Number.isFinite(e.duration) ? Math.max(0, Math.min(t, Math.max(0, e.duration - .001))) : Math.max(0, t),
      i = () => {
        e.removeEventListener("seeked", i), e.removeEventListener("error", o), n();
      },
      o = () => {
        var s;
        e.removeEventListener("seeked", i), e.removeEventListener("error", o), r(new Error(((s = e.error) == null ? void 0 : s.message) || "视频解码失败"));
      };
    if (e.addEventListener("seeked", i), e.addEventListener("error", o), Math.abs(e.currentTime - a) < 8e-4) {
      e.removeEventListener("seeked", i), e.removeEventListener("error", o), n();
      return;
    }
    e.currentTime = a;
  });
}

async function FCo(e) {
  const t = document.createElement("video");
  return t.muted = !0, t.playsInline = !0, t.preload = "auto", t.crossOrigin = e.startsWith("http") ? "anonymous" : null, await new Promise((n, r) => {
    const a = () => {
      if (!t.videoWidth) {
        r(new Error("当前浏览器无法解码该视频画面（可能是 HEVC 编码），无法裁剪"));
        return;
      }
      n();
    };
    t.onloadedmetadata = a, t.onerror = () => {
      r(new Error("当前浏览器无法解码该视频画面（可能是 HEVC 编码），无法裁剪"));
    }, t.src = e;
  }), t;
}

async function zCo(e) {
  if (!e) return null;
  const t = e.settings || {},
    n = typeof t._localCacheAssetId == "string" && t._localCacheAssetId.trim() || typeof t._contentAssetId == "string" && t._contentAssetId.trim() || typeof t._assetId == "string" && t._assetId.trim() || "";
  if (!n) return null;
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
    return await r.ensureRestored(), (await r.getAssetSourcePath(n)) || null;
  } catch {
    return null;
  }
}

async function UCo(e) {
  var t, n, r, a;
  if (!LCo()) return null;
  try {
    const {
        invoke: i
      } = await Ie(async () => {
        const {
          invoke: f
        } = await Promise.resolve().then(() => sd);
        return {
          invoke: f
        };
      }, void 0, import.meta.url),
      {
        readFileAsBlob: o,
        writeBlobToFile: s
      } = await Ie(async () => {
        const {
          readFileAsBlob: f,
          writeBlobToFile: y
        } = await Promise.resolve().then(() => hg);
        return {
          readFileAsBlob: f,
          writeBlobToFile: y
        };
      }, void 0, import.meta.url);
    (t = e.onProgress) == null || t.call(e, {
      percent: 10,
      text: "正在准备时长裁切..."
    });
    const l = await zCo(e.sourceNode),
      d = await i("get_export_temp_dir"),
      u = Cvn(d, `trimmed_${Date.now()}.mp4`);
    let h = l || "",
      p = !1;
    if (!h) if (/^file:/i.test(e.url) || /^[A-Za-z]:[\\/]/.test(e.url) || e.url.startsWith("\\\\")) h = e.url;else {
      (n = e.onProgress) == null || n.call(e, {
        percent: 16,
        text: "正在下载源视频..."
      });
      const y = await fetch(e.url);
      if (!y.ok) throw new Error(`源视频下载失败 (${y.status})`);
      const b = await y.blob();
      wwe(e.signal), h = Cvn(d, `trim_src_${Date.now()}.mp4`), await s(h, b), p = !0;
    }
    wwe(e.signal), (r = e.onProgress) == null || r.call(e, {
      percent: 28,
      text: "正在时长裁切..."
    }), await i("ffmpeg_trim_video", {
      args: {
        input: h,
        outputPath: u,
        start: e.start,
        end: e.end
      }
    }), wwe(e.signal), (a = e.onProgress) == null || a.call(e, {
      percent: 88,
      text: "正在读取裁剪结果..."
    });
    const m = await o(u);
    if (p) try {
      const {
        remove: f
      } = await Ie(async () => {
        const {
          remove: y
        } = await Promise.resolve().then(() => oc);
        return {
          remove: y
        };
      }, void 0, import.meta.url);
      await f(h);
    } catch {}
    try {
      const {
        remove: f
      } = await Ie(async () => {
        const {
          remove: y
        } = await Promise.resolve().then(() => oc);
        return {
          remove: y
        };
      }, void 0, import.meta.url);
      await f(u);
    } catch {}
    return m.size ? {
      blob: m,
      fileName: "trimmed_video.mp4"
    } : null;
  } catch (i) {
    return console.warn("[videoTrim] FFmpeg 裁剪不可用，回退浏览器编码:", i), null;
  }
}

async function $Co(e) {
  var a, i;
  const t = await FCo(e.url);
  let n = null,
    r = null;
  try {
    wwe(e.signal);
    const o = Number.isFinite(t.duration) ? t.duration : 0,
      s = Math.max(0, Math.min(e.start, Math.max(0, o - .02))),
      l = Math.max(s + .02, Math.min(e.end, o || e.end)),
      d = Math.max(.02, l - s),
      u = 24,
      h = Math.max(1, Math.round(d * u)),
      {
        mime: p,
        ext: m
      } = OCo(),
      f = t.videoWidth,
      y = t.videoHeight,
      b = document.createElement("canvas");
    b.width = f, b.height = y;
    const v = b.getContext("2d");
    if (!v) throw new Error("无法创建画布");
    v.imageSmoothingEnabled = !0, v.imageSmoothingQuality = "high";
    const _ = b.captureStream(u);
    r = _;
    const w = _.getVideoTracks()[0],
      k = [],
      A = typeof MediaRecorder < "u" && p ? new MediaRecorder(_, {
        mimeType: p,
        videoBitsPerSecond: 6e6
      }) : null;
    if (!A) throw new Error("当前浏览器无法编码裁剪视频");
    n = A, A.ondataavailable = T => {
      var P;
      (P = T.data) != null && P.size && k.push(T.data);
    };
    const S = new Promise((T, P) => {
      A.onstop = () => T(), A.onerror = () => P(new Error("时长裁切编码失败"));
    });
    A.start();
    const C = performance.now(),
      I = Math.max(1e3 / u, d * 1e3);
    for (let T = 0; T < h; T++) {
      wwe(e.signal);
      const P = h <= 1 ? s : s + T / Math.max(1, h - 1) * Math.max(0, d - .001);
      await BCo(t, P), v.drawImage(t, 0, 0, f, y), (a = w == null ? void 0 : w.requestFrame) == null || a.call(w);
      const j = C + (T + 1) / h * I - performance.now();
      j > 1 && (await Ivn(j)), (i = e.onProgress) == null || i.call(e, {
        percent: Math.round(12 + (T + 1) / h * 78),
        text: `正在裁剪视频... ${T + 1}/${h}`
      });
    }
    const E = C + I - performance.now();
    E > 1 && (await Ivn(E)), A.stop(), await S;
    const M = new Blob(k, {
      type: A.mimeType || p || "video/webm"
    });
    if (!M.size) throw new Error("裁剪结果为空");
    return {
      blob: M,
      fileName: `trimmed_video.${m}`,
      width: f,
      height: y
    };
  } finally {
    (n == null ? void 0 : n.state) === "recording" && n.stop(), r == null || r.getTracks().forEach(o => o.stop()), t.removeAttribute("src"), t.load(), t.remove();
  }
}

async function qwr(e) {
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
    const s = await UCo({
      url: n,
      sourceNode: e.sourceNode,
      start: e.start,
      end: e.end,
      signal: e.signal,
      onProgress: e.onProgress
    });
    if (s) return (i = e.onProgress) == null || i.call(e, {
      percent: 94,
      text: "正在保存裁剪视频..."
    }), {
      blob: s.blob,
      width: e.width || 0,
      height: e.height || 0,
      fileName: s.fileName
    };
    if (e.requireAudio) throw new Error("保留原声需要桌面 FFmpeg 裁剪，请检查 FFmpeg，或取消“保留原声”后重试。");
    const l = await $Co({
      url: n,
      start: e.start,
      end: e.end,
      signal: e.signal,
      onProgress: e.onProgress
    });
    return (o = e.onProgress) == null || o.call(e, {
      percent: 94,
      text: "正在保存裁剪视频..."
    }), l;
  } finally {
    r == null || r();
  }
}

async function GCo(e) {
  const t = await Ope(e.blob, {
    sourceNodeId: e.sourceNode.id,
    width: e.width,
    height: e.height,
    fileName: e.fileName,
    source: "video_crop",
    assetPrefix: "video_crop",
    extraSettings: {
      videoTrimConfig: {
        startTime: e.startTime,
        endTime: e.endTime,
        duration: e.endTime - e.startTime
      },
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
    nodeName: "裁剪视频"
  });
}

const V$t = 1 / 30,
  zpe = 1,
  H$t = .1,
  VCo = 6,
  EZe = 4,
  z3t = 56,
  HCo = 8,
  WCo = 24;

function Upe(e, t, n) {
  return Math.max(t, Math.min(n, e));
}

const kDe = e => String(e).padStart(2, "0");

function Om(e) {
  let t = e;
  (!Number.isFinite(t) || t < 0) && (t = 0);
  const n = Math.floor(t + 1e-6),
    r = Upe(Math.floor((t - n) * 100 + 1e-4), 0, 99),
    a = Math.floor(n / 3600),
    i = Math.floor(n % 3600 / 60),
    o = n % 60,
    s = `${kDe(i)}:${kDe(o)}.${kDe(r)}`;
  return a > 0 ? `${a}:${s}` : s;
}

function qCo(e, t) {
  const n = Math.floor(e / 60),
    r = e - n * 60;
  return t ? `${n}:${r.toFixed(1).padStart(4, "0")}` : `${n}:${kDe(Math.floor(r))}`;
}

function W$t(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.round(e * 10) / 10;
  return `${Number.isInteger(t) ? t : t.toFixed(1)} 秒`;
}

function A$(e) {
  if (!e) return 0;
  const t = e.duration;
  if (Number.isFinite(t) && t > 0) return t;
  if (e.seekable && e.seekable.length > 0) {
    const n = e.seekable.end(e.seekable.length - 1);
    if (Number.isFinite(n) && n > 0) return n;
  }
  return 0;
}

function q$t(e, t) {
  const n = [.1, .2, .5, 1, 2, 5, 10, 15, 30, 60, 120, 300];
  if (!(e > 0) || !(t > 0)) return [];
  const r = t / e,
    a = n.find(u => u * r >= 64) || n[n.length - 1],
    i = a / 4,
    o = i * r >= 8,
    s = o ? i : a,
    l = Math.floor(e / s + 1e-6),
    d = [];
  for (let u = 0; u <= l; u++) {
    const h = u * s;
    if (h > e + 1e-6) break;
    const p = Math.abs(h / a - Math.round(h / a)) < 1e-6;
    if (!p && !o) continue;
    const m = h / e;
    d.push({
      key: u,
      left: m * 100,
      major: p,
      label: p && m <= .95 ? qCo(h, a < 1) : "",
      seconds: h
    });
  }
  return d;
}

function Q5(e, t) {
  return t > 0 ? Upe(e / t * 100, 0, 100) : 0;
}

function S$(e, t) {
  const n = Upe(e, 0, Math.max(0, t.end - t.minDuration));
  let r = t.end;
  return r - n > t.maxDuration && (r = n + t.maxDuration), {
    start: n,
    end: r
  };
}

function I$(e, t) {
  let n = Upe(e, Math.min(t.start + t.minDuration, t.total), t.total),
    r = t.start;
  return n - r > t.maxDuration && (r = n - t.maxDuration), {
    start: r,
    end: n
  };
}

function TZe(e, t) {
  const n = Math.min(t.maxDuration, t.total),
    r = Upe(e, Math.min(t.minDuration, n), n);
  let a = t.start,
    i = a + r;
  return i > t.total && (i = t.total, a = Math.max(0, i - r)), {
    start: a,
    end: i
  };
}

function K$t(e) {
  return {
    start: 0,
    end: Math.min(Math.min(e.maxDuration, e.total), e.total)
  };
}

function Q$t(e) {
  const t = Math.min(e.maxDuration, e.total);
  return {
    start: Math.max(0, e.total - t),
    end: e.total
  };
}

function bG(e) {
  return Math.max(0, e.end - e.start);
}

function MZe(e, t, n) {
  return e >= t - .001 && e <= n + .001;
}

function Y$t(e, t) {
  return e < t.start - .001 || e > t.end + .001;
}

function PZe(e, t, n, r, a, i = VCo) {
  if (a || !(n > 0)) return e;
  const o = t / n;
  for (const s of r) if (Math.abs(s - e) * o <= i) return s;
  return e;
}

function RZe(e, t, n) {
  return t > 0 ? e / t * n : 0;
}

function NZe(e, t) {
  const n = e || 720,
    r = t || 16 / 9;
  return Upe(Math.round(n / (z3t * r)), HCo, WCo);
}

function jZe(e, t) {
  const n = z3t * 2 / t;
  return {
    width: Math.max(1, Math.round(e * n)),
    height: z3t * 2
  };
}

function DZe(e, t) {
  const n = [];
  for (let r = 0; r < e; r++) n.push((r + .5) / e * t);
  return n;
}

const KCo = ["开头", "全片", "末尾"],
  QCo = ["5秒", "15秒", "全部"],
  YCo = ["逐帧", "微调", "粗调"],
  Evn = .1;

function Cdt({
  options: e,
  value: t,
  disabled: n,
  onChange: r
}) {
  on();
  const a = g.useRef(null),
    i = g.useRef(null),
    [o, s] = g.useState(null),
    l = e.indexOf(t),
    d = l >= 0,
    u = o ?? Math.max(0, l),
    h = d || o != null ? Math.round(Math.min(e.length - 1, Math.max(0, u))) : -1,
    p = o != null,
    m = f => {
      const y = i.current;
      if (!y || f.pointerId !== y.pointerId) return;
      const b = a.current,
        v = y.moved ? Math.round(Math.min(e.length - 1, Math.max(0, y.origin + (f.clientX - y.startX) / y.segW))) : Math.min(e.length - 1, Math.max(0, Math.floor((f.clientX - ((b == null ? void 0 : b.getBoundingClientRect().left) ?? 0) - 3) / y.segW)));
      i.current = null, s(null), n || r(e[v]), b == null || b.addEventListener("click", _ => {
        _.preventDefault(), _.stopPropagation();
      }, {
        capture: !0,
        once: !0
      });
    };
  return c.jsxs("div", {
    ref: a,
    className: `relative flex min-w-0 flex-1 touch-none select-none items-center rounded-full bg-black/40 p-[3px] ${n ? "pointer-events-none opacity-50" : p ? "cursor-grabbing" : "cursor-grab"}`,
    onPointerDown: f => {
      if (n) return;
      const y = a.current;
      y && (i.current = {
        pointerId: f.pointerId,
        startX: f.clientX,
        origin: Math.max(0, l),
        segW: (y.clientWidth - 6) / e.length,
        moved: !1
      }, y.setPointerCapture(f.pointerId));
    },
    onPointerMove: f => {
      const y = i.current;
      if (!y || f.pointerId !== y.pointerId) return;
      const b = f.clientX - y.startX;
      !y.moved && Math.abs(b) < 5 || (y.moved = !0, s(Math.min(e.length - 1, Math.max(0, y.origin + b / y.segW))));
    },
    onPointerUp: m,
    onPointerCancel: m,
    children: [h >= 0 ? c.jsx("div", {
      className: "pointer-events-none absolute bottom-[3px] left-[3px] top-[3px] rounded-full bg-white/90 shadow-[0_1px_4px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-[8px]",
      style: {
        width: `calc((100% - 6px) / ${e.length})`,
        transform: `translateX(${u * 100}%)`,
        transition: p ? "none" : "transform 320ms cubic-bezier(0.32, 0.72, 0, 1)"
      }
    }) : null, e.map((f, y) => c.jsx("button", {
      type: "button",
      className: `relative z-10 flex h-7 flex-1 items-center justify-center whitespace-nowrap rounded-full px-1 text-[11px] font-medium leading-none transition-colors duration-200 ${y === h ? "text-zinc-900" : "text-white/50 hover:text-white/80"}`,
      onClick: () => !n && r(f),
      children: f
    }, f))]
  });
}

function Edt({
  label: e,
  children: t
}) {
  return on(), c.jsxs("div", {
    className: "flex items-center gap-3",
    children: [c.jsx("div", {
      className: "w-[4.25rem] shrink-0 text-[11px] text-white/45",
      children: e
    }), t]
  });
}

function FW(e, t, n = .08) {
  return Math.abs(e - t) <= n;
}

function Tvn(e, t) {
  const n = bG(e);
  return t > 0 && FW(n, t, .05) ? "全部" : FW(n, 5) ? "5秒" : FW(n, 15) ? "15秒" : "";
}

function XCo(e, t) {
  return t > 0 ? FW(e.start, 0) && FW(e.end, t, .05) ? "全片" : FW(e.start, 0) ? "开头" : FW(e.end, t, .05) ? "末尾" : "" : "";
}

function JCo(e) {
  return e === "粗调" ? zpe : e === "微调" ? H$t : V$t;
}

function ZCo({
  open: e,
  videoUrl: t,
  sourceNode: n,
  nodes: r,
  generateId: a,
  setNodes: i,
  setSelectedNodeId: o,
  onClose: s
}) {
  on();
  const l = g.useRef(null),
    d = g.useRef(null),
    u = g.useRef(null),
    h = g.useRef(null),
    p = g.useRef(0),
    m = g.useRef(0),
    f = g.useRef({
      start: 0,
      end: 0
    }),
    y = g.useRef(0),
    b = g.useRef(null),
    [v, _] = g.useState({
      width: 0,
      height: 0,
      duration: 0
    }),
    [w, k] = g.useState({
      start: 0,
      end: 0
    }),
    [A, S] = g.useState(0),
    [C, I] = g.useState(!1),
    [E, M] = g.useState([]),
    [T, P] = g.useState(0),
    [R, j] = g.useState(null),
    [B, F] = g.useState(""),
    [N, G] = g.useState("逐帧"),
    [z, V] = g.useState(!1),
    [O, L] = g.useState(0),
    [D, U] = g.useState(""),
    H = v.duration,
    Y = Math.min(Evn, H || Evn),
    K = H > 0 ? H : 60,
    W = g.useMemo(() => ({
      ...w,
      total: H,
      minDuration: Y,
      maxDuration: K
    }), [w, H, Y, K]),
    Q = bG(w),
    q = g.useMemo(() => {
      const ge = Tvn(w, H);
      return ge === "5秒" ? Math.min(5, H || 5) : ge === "15秒" ? Math.min(15, H || 15) : ge === "全部" ? H || K : Q > 0 ? Q : H || K;
    }, [w, H, K, Q]),
    ne = H > 0 && MZe(Q, Y, K),
    de = Y$t(A, w),
    le = Q5(w.start, H),
    J = Q5(w.end, H),
    pe = Q5(A, H),
    ce = g.useMemo(() => q$t(H, T), [H, T]);
  f.current = w, y.current = A;
  const we = () => d.current,
    X = () => {
      const ge = we();
      ge == null || ge.pause(), I(!1), m.current && (cancelAnimationFrame(m.current), m.current = 0);
    },
    Z = ge => {
      const _e = we(),
        ke = Math.max(0, Math.min(ge, Math.max(0, (H || (_e == null ? void 0 : _e.duration) || 0) - .001)));
      S(ke), _e && Number.isFinite(ke) && (_e.currentTime = ke);
    },
    re = ge => {
      k({
        start: Math.max(0, ge.start),
        end: Math.max(ge.start, ge.end)
      });
    };
  g.useEffect(() => {
    e && (k({
      start: 0,
      end: 0
    }), S(0), I(!1), M([]), V(!1), L(0), U(""), _({
      width: 0,
      height: 0,
      duration: 0
    }), G("逐帧"));
  }, [e, t]), g.useEffect(() => {
    var _e;
    if (!e) return;
    const ge = (_e = l.current) == null ? void 0 : _e.parentElement;
    ge == null || ge.querySelectorAll("video").forEach(ke => {
      ke !== d.current && ke.pause();
    });
  }, [e]), g.useLayoutEffect(() => {
    const ge = u.current;
    if (!ge) return;
    const _e = () => P(ge.getBoundingClientRect().width);
    _e();
    const ke = new ResizeObserver(_e);
    return ke.observe(ge), () => ke.disconnect();
  }, [e]), g.useEffect(() => {
    if (!e || !t || !(H > 0) || !(T > 0) || !v.width || !v.height) return;
    const ge = ++p.current,
      _e = document.createElement("video");
    _e.muted = !0, _e.playsInline = !0, _e.preload = "auto", _e.crossOrigin = t.startsWith("http") ? "anonymous" : null, _e.src = t;
    let ke = !1;
    return (async () => {
      try {
        if (await new Promise((Me, Re) => {
          const $e = window.setTimeout(() => Re(new Error("timeout")), 8e3);
          _e.onloadedmetadata = () => {
            window.clearTimeout($e), Me();
          }, _e.onerror = () => {
            window.clearTimeout($e), Re(new Error("load error"));
          };
        }), ke || ge !== p.current) return;
        const Te = NZe(T, v.width / v.height),
          Ne = jZe(v.width, v.height),
          me = document.createElement("canvas");
        me.width = Ne.width, me.height = Ne.height;
        const Ae = me.getContext("2d");
        if (!Ae) return;
        const Fe = DZe(Te, H);
        for (let Me = 0; Me < Fe.length; Me++) {
          if (ke || ge !== p.current || (await new Promise(($e, rt) => {
            const nt = window.setTimeout(() => rt(new Error("seek timeout")), 3e3);
            _e.onseeked = () => {
              window.clearTimeout(nt), $e();
            }, _e.onerror = () => {
              window.clearTimeout(nt), rt(new Error("seek error"));
            }, _e.currentTime = Fe[Me];
          }), ke || ge !== p.current)) return;
          Ae.drawImage(_e, 0, 0, me.width, me.height);
          const Re = me.toDataURL("image/jpeg", .6);
          M($e => Me === 0 ? [Re] : [...$e, Re]);
        }
      } catch {
        ge === p.current && M([]);
      } finally {
        _e.removeAttribute("src"), _e.load(), _e.remove();
      }
    })(), () => {
      ke = !0, p.current += 1;
    };
  }, [e, t, H, T, v.width, v.height]);
  const fe = () => {
      m.current && (cancelAnimationFrame(m.current), m.current = 0);
    },
    ye = () => {
      fe();
      const ge = () => {
        const _e = we();
        if (!_e || _e.paused) {
          I(!1), m.current = 0;
          return;
        }
        const ke = _e.currentTime,
          ve = f.current;
        S(ke), ke >= ve.end - .01 && (_e.currentTime = ve.start, S(ve.start)), m.current = requestAnimationFrame(ge);
      };
      m.current = requestAnimationFrame(ge);
    },
    ie = () => {
      const ge = we();
      if (!ge || z) return;
      if (!ge.paused) {
        X();
        return;
      }
      const _e = f.current,
        ke = y.current;
      (A$(ge) || H) > 0 && (ke < _e.start || ke >= _e.end - .01) && (ge.currentTime = _e.start, S(_e.start)), ge.muted = !0, ge.playsInline = !0, ge.play().then(() => {
        I(!0), ye();
      }).catch(() => {
        ge.muted = !0, ge.play().then(() => {
          I(!0), ye();
        }).catch(() => {
          I(!1);
        });
      });
    };
  g.useEffect(() => () => fe(), []), g.useEffect(() => {
    if (!e) return;
    const ge = _e => {
      const ke = _e.target;
      if (ke && (ke.tagName === "INPUT" || ke.tagName === "TEXTAREA" || ke.isContentEditable)) {
        _e.key === "Escape" && ke.blur();
        return;
      }
      if (_e.metaKey || _e.ctrlKey || _e.altKey) return;
      let ve = !0;
      const Te = _e.shiftKey ? zpe : JCo(N),
        Ne = f.current,
        me = y.current,
        Ae = {
          ...W,
          ...Ne
        };
      switch (_e.code) {
        case "Space":
          ie();
          break;
        case "ArrowLeft":
        case "Comma":
          Z(me - Te);
          break;
        case "ArrowRight":
        case "Period":
          Z(me + Te);
          break;
        case "BracketLeft":
        case "KeyI":
          re(S$(me, Ae));
          break;
        case "BracketRight":
        case "KeyO":
          re(I$(me, Ae));
          break;
        case "Home":
          Z(Ne.start);
          break;
        case "End":
          Z(Ne.end);
          break;
        case "Escape":
          z || s();
          break;
        case "Enter":
          !_e.isComposing && ne && !z && xe();
          break;
        default:
          ve = !1;
      }
      ve && (_e.preventDefault(), _e.stopPropagation());
    };
    return document.addEventListener("keydown", ge, !0), () => document.removeEventListener("keydown", ge, !0);
  }, [e, W.total, W.minDuration, W.maxDuration, N, ne, z]);
  const ae = (ge, _e) => {
      if (z || _e.button !== 0 || !(H > 0)) return;
      _e.preventDefault(), _e.stopPropagation(), b.current = {
        mode: ge,
        startX: _e.clientX,
        originStart: w.start,
        originEnd: w.end,
        activated: ge !== "move"
      }, F(ge), ge !== "move" && X();
      const ke = Te => {
          const Ne = b.current,
            me = u.current;
          if (!Ne || !me) return;
          const Ae = me.getBoundingClientRect();
          if (Ne.mode === "move" && !Ne.activated) {
            if (Math.abs(Te.clientX - Ne.startX) < EZe) return;
            Ne.activated = !0, X();
          }
          if (Ne.mode === "scrub" || Ne.mode === "start" || Ne.mode === "end") {
            let $e = (Te.clientX - Ae.left) / Ae.width * H;
            Ne.mode !== "scrub" && ($e = PZe($e, Ae.width, H, [A, 0, H], Te.altKey)), Ne.mode === "scrub" ? Z($e) : Ne.mode === "start" ? re(S$($e, {
              ...W,
              start: Ne.originStart,
              end: Ne.originEnd
            })) : re(I$($e, {
              ...W,
              start: Ne.originStart,
              end: Ne.originEnd
            }));
            return;
          }
          const Fe = Ne.originEnd - Ne.originStart,
            Me = RZe(Te.clientX - Ne.startX, Ae.width, H),
            Re = Math.max(0, Math.min(Ne.originStart + Me, H - Fe));
          re({
            start: Re,
            end: Re + Fe
          });
        },
        ve = Te => {
          const Ne = b.current,
            me = u.current;
          if ((Ne == null ? void 0 : Ne.mode) === "move" && !Ne.activated && me) {
            const Ae = me.getBoundingClientRect();
            Z((Ne.startX - Ae.left) / Ae.width * H);
          }
          b.current = null, F(""), window.removeEventListener("pointermove", ke), window.removeEventListener("pointerup", ve), window.removeEventListener("pointercancel", ve);
        };
      window.addEventListener("pointermove", ke), window.addEventListener("pointerup", ve), window.addEventListener("pointercancel", ve);
    },
    be = ge => {
      if (!(H > 0)) return;
      const _e = {
        ...W,
        maxDuration: q || H
      };
      re(ge === "开头" ? K$t(_e) : ge === "末尾" ? Q$t(_e) : {
        start: 0,
        end: H
      }), Z(ge === "末尾" ? Math.max(0, H - (q || H)) : 0);
    },
    Ee = ge => {
      if (H > 0) {
        if (ge === "全部") {
          re({
            start: 0,
            end: H
          });
          return;
        }
        re(TZe(ge === "5秒" ? 5 : 15, W));
      }
    },
    xe = async () => {
      var _e;
      if (z) {
        (_e = h.current) == null || _e.abort();
        return;
      }
      if (!t || !a || !i || !ne) {
        Ai("error", a && i ? "请先框出有效区间" : "无法创建节点");
        return;
      }
      X();
      const ge = new AbortController();
      h.current = ge, V(!0), L(0), U("正在准备...");
      try {
        const ke = f.current,
          ve = await qwr({
            videoUrl: t,
            sourceNode: n,
            start: ke.start,
            end: ke.end,
            width: v.width,
            height: v.height,
            signal: ge.signal,
            onProgress: ({
              percent: Te,
              text: Ne
            }) => {
              L(me => Math.max(me, Te)), U(Ne);
            }
          });
        await GCo({
          blob: ve.blob,
          fileName: ve.fileName,
          width: ve.width || v.width,
          height: ve.height || v.height,
          sourceNode: n,
          startTime: ke.start,
          endTime: ke.end,
          nodes: r,
          generateId: a,
          setNodes: i,
          setSelectedNodeId: o
        }), Ai("success", "时长裁切成功，已添加为新节点"), s();
      } catch (ke) {
        const ve = !!(ke != null && ke.cancelled);
        Ai(ve ? "info" : "error", ve ? "已取消时长裁切" : ke instanceof Error ? ke.message : "时长裁切失败");
      } finally {
        h.current = null, V(!1);
      }
    };
  if (!e) return null;
  const he = R == null || !(H > 0) ? "" : Om(R / 100 * H),
    ue = B === "start" ? Om(w.start) : B === "end" ? Om(w.end) : "";
  return c.jsxs(c.Fragment, {
    children: [c.jsxs("div", {
      ref: l,
      className: "nodrag nowheel pointer-events-auto absolute inset-0 z-40 overflow-hidden rounded-2xl",
      onPointerDown: ge => ge.stopPropagation(),
      onMouseDown: ge => ge.stopPropagation(),
      onClick: ge => {
        ge.stopPropagation(), z || ie();
      },
      children: [c.jsx("video", {
        ref: d,
        src: t,
        muted: !0,
        playsInline: !0,
        preload: "auto",
        crossOrigin: t.startsWith("http") ? "anonymous" : void 0,
        className: "pointer-events-none absolute inset-0 h-full w-full object-contain",
        onLoadedMetadata: ge => {
          const _e = ge.currentTarget,
            ke = A$(_e);
          _({
            width: _e.videoWidth || 0,
            height: _e.videoHeight || 0,
            duration: ke
          }), k(ve => ve.end > .02 ? ve : {
            start: 0,
            end: ke
          });
        },
        onPlay: () => {
          I(!0), ye();
        },
        onPause: () => {
          I(!1), fe();
        }
      }), c.jsxs("div", {
        className: "pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-1 rounded-md bg-black/55 px-1.5 py-0.5 text-[10px] tabular-nums text-white/90",
        children: [c.jsx("span", {
          children: Om(A)
        }), de ? c.jsx("span", {
          className: "text-white/45",
          children: x("区间外")
        }) : null]
      }), !C && !z ? c.jsx("span", {
        className: "pointer-events-none absolute inset-0 flex items-center justify-center",
        children: c.jsx("span", {
          className: "flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#111] shadow-[0_8px_24px_rgba(0,0,0,0.35)]",
          children: c.jsx("svg", {
            viewBox: "0 0 24 24",
            width: "22",
            height: "22",
            fill: "currentColor",
            children: c.jsx("path", {
              d: "M8 5v14l11-7z"
            })
          })
        })
      }) : null]
    }), c.jsx("div", {
      className: "absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2",
      style: {
        pointerEvents: "auto"
      },
      onClick: ge => ge.stopPropagation(),
      onPointerDown: ge => ge.stopPropagation(),
      children: c.jsxs(OT, {
        title: x("时长裁切"),
        testId: "video-trim-panel",
        dataAttr: "data-video-trim-panel",
        width: 436,
        generatePlacement: "footer",
        bodyClassName: "px-4 pb-3",
        onClose: z ? void 0 : s,
        onGenerate: () => void xe(),
        generateTitle: z ? "停止裁剪" : "确认裁剪",
        footer: z ? c.jsxs("div", {
          className: "flex min-w-0 flex-1 items-center gap-2",
          children: [c.jsxs("div", {
            className: "min-w-0 flex-1",
            children: [c.jsx("div", {
              className: "truncate text-[11px] text-white/45",
              children: D || x("正在准备...")
            }), c.jsx("div", {
              className: "mt-1 h-1 overflow-hidden rounded-full bg-white/10",
              children: c.jsx("div", {
                className: "h-full rounded-full bg-white/80 transition-[width] duration-300",
                style: {
                  width: `${O}%`
                }
              })
            })]
          }), c.jsxs("span", {
            className: "tabular-nums text-[11px] text-white/55",
            children: [O, "%"]
          })]
        }) : c.jsx("div", {
          className: "truncate text-center text-[11px] tabular-nums text-white/30",
          children: H > 0 ? `${Om(w.start)} → ${Om(w.end)} · ${W$t(Q)}` : x("拖动入点 / 出点确定保留区间")
        }),
        children: [c.jsxs("div", {
          className: `mb-3 ${z ? "pointer-events-none opacity-60" : ""}`,
          children: [c.jsx("div", {
            className: "relative mb-1 h-3.5",
            children: ce.map(ge => c.jsx("span", {
              className: "absolute bottom-0 w-px bg-white/25",
              style: {
                left: `${ge.left}%`,
                height: ge.major ? 7 : 4,
                background: ge.major ? "rgba(255,255,255,0.4)" : void 0
              },
              children: ge.label ? c.jsx("span", {
                className: "absolute bottom-2 left-0.5 whitespace-nowrap text-[9px] tabular-nums text-white/45",
                children: x(ge.label)
              }) : null
            }, ge.key))
          }), c.jsxs("div", {
            ref: u,
            className: `relative h-14 overflow-hidden rounded-[10px] bg-black/35 ${B ? "cursor-ew-resize" : "cursor-crosshair"}`,
            onPointerDown: ge => {
              ge.target.closest("[data-trim-handle], [data-trim-selection], [data-trim-playhead]") || ae("scrub", ge);
            },
            onPointerMove: ge => {
              var ke;
              const _e = (ke = u.current) == null ? void 0 : ke.getBoundingClientRect();
              !_e || B || j((ge.clientX - _e.left) / _e.width * 100);
            },
            onPointerLeave: () => j(null),
            children: [c.jsx("div", {
              className: "pointer-events-none absolute inset-0 flex overflow-hidden",
              children: E.length ? E.map((ge, _e) => c.jsx("img", {
                src: ge,
                alt: "",
                className: "h-full min-w-0 flex-1 object-cover"
              }, `${ge}-${_e}`)) : c.jsx("div", {
                className: "h-full w-full bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.06)_0_12px,rgba(255,255,255,0.02)_12px_24px)]"
              })
            }), c.jsx("div", {
              className: "pointer-events-none absolute inset-y-0 left-0 bg-black/55",
              style: {
                width: `${le}%`
              }
            }), c.jsx("div", {
              className: "pointer-events-none absolute inset-y-0 right-0 bg-black/55",
              style: {
                width: `${100 - J}%`
              }
            }), c.jsxs("div", {
              "data-trim-selection": "",
              className: `absolute inset-y-0 z-[2] ${B === "move" ? "cursor-grabbing" : "cursor-grab"}`,
              style: {
                left: `${le}%`,
                width: `${Math.max(0, J - le)}%`,
                boxShadow: ne ? "inset 0 2px #fff, inset 0 -2px #fff" : "inset 0 2px 0 rgba(248,113,113,0.85), inset 0 -2px 0 rgba(248,113,113,0.85)"
              },
              onPointerDown: ge => ae("move", ge),
              children: [c.jsx("div", {
                "data-trim-handle": "start",
                className: "absolute bottom-0 top-0 z-10 flex w-3.5 -translate-x-1/2 items-center justify-center rounded-l-[7px] bg-white",
                style: {
                  left: 0
                },
                onPointerDown: ge => ae("start", ge),
                children: c.jsx("span", {
                  className: "h-4 w-0.5 rounded-sm bg-black/35"
                })
              }), c.jsx("div", {
                "data-trim-handle": "end",
                className: "absolute bottom-0 top-0 z-10 flex w-3.5 translate-x-1/2 items-center justify-center rounded-r-[7px] bg-white",
                style: {
                  right: 0
                },
                onPointerDown: ge => ae("end", ge),
                children: c.jsx("span", {
                  className: "h-4 w-0.5 rounded-sm bg-black/35"
                })
              })]
            }), R != null && !B ? c.jsx("div", {
              className: "pointer-events-none absolute inset-y-0 z-[8] w-px bg-white/45",
              style: {
                left: `${R}%`
              },
              children: c.jsx("span", {
                className: "absolute -top-5 left-1/2 -translate-x-1/2 rounded bg-black/85 px-1.5 py-0.5 text-[10px] tabular-nums text-white",
                children: he
              })
            }) : null, ue ? c.jsx("div", {
              className: "pointer-events-none absolute -top-5 z-20 -translate-x-1/2 rounded bg-black/85 px-1.5 py-0.5 text-[10px] tabular-nums text-white",
              style: {
                left: `${B === "start" ? le : J}%`
              },
              children: ue
            }) : null, c.jsx("div", {
              "data-trim-playhead": "",
              className: "pointer-events-none absolute bottom-0 top-[-10px] z-20 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_4px_rgba(0,0,0,0.4)]",
              style: {
                left: `${pe}%`
              },
              children: c.jsx("div", {
                className: "pointer-events-auto absolute -top-0.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-[3px] bg-white",
                style: {
                  cursor: "ew-resize"
                },
                onPointerDown: ge => ae("scrub", ge)
              })
            })]
          })]
        }), c.jsxs("div", {
          className: "flex flex-col gap-2",
          children: [c.jsx(Edt, {
            label: x("快捷定位"),
            children: c.jsx(Cdt, {
              options: KCo,
              value: XCo(w, H),
              disabled: z || !(H > 0),
              onChange: be
            })
          }), c.jsx(Edt, {
            label: x("保留时长"),
            children: c.jsx(Cdt, {
              options: QCo,
              value: Tvn(w, H),
              disabled: z || !(H > 0),
              onChange: Ee
            })
          }), c.jsx(Edt, {
            label: x("步进精度"),
            children: c.jsx(Cdt, {
              options: YCo,
              value: N,
              disabled: z,
              onChange: ge => G(ge)
            })
          })]
        })]
      })
    })]
  });
}

const eEo = Object.freeze(Object.defineProperty({
    __proto__: null,
    VideoTrimHost: ZCo
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  tEo = "reversed_video.mp4",
  nEo = "video_reverse",
  rEo = "时序倒置",
  aEo = "源视频地址为空",
  iEo = "无法创建节点",
  Kwr = "视频倒序处理失败",
  Qwr = "正在倒序处理视频...",
  Mvn = "正在保存倒序视频...",
  oEo = "视频倒序处理成功，已添加为新节点",
  Ywr = "已取消视频倒序";

function Xwr(e, t, n) {
  const r = Number.isFinite(n) && n > 0 ? n : 0;
  if (!(r > 0)) {
    const o = Math.max(0, Number.isFinite(e) ? e : 0),
      s = Math.max(o + .02, Number.isFinite(t) ? t : o + .02);
    return {
      start: o,
      end: s
    };
  }
  const a = Math.max(0, Math.min(Number.isFinite(e) ? e : 0, Math.max(0, r - .02))),
    i = Math.max(a + .02, Math.min(Number.isFinite(t) ? t : r, r));
  return {
    start: a,
    end: i
  };
}

function sEo(e, t, n, r) {
  const a = Xwr(n, r, Math.max(r, n + .02)),
    i = Math.max(.02, a.end - a.start);
  return t <= 1 ? a.end - .001 : a.end - e / Math.max(1, t - 1) * Math.max(0, i - .001);
}

function lEo(e, t = Kwr) {
  return e && typeof e == "object" && e.cancelled ? Ywr : (e instanceof Error ? e.message : typeof e == "string" ? e : "") || t;
}

function xwe(e) {
  if (e != null && e.aborted) {
    const t = new Error("已取消视频倒序");
    throw t.cancelled = !0, t;
  }
}

function Pvn(e) {
  return new Promise(t => {
    window.setTimeout(t, e);
  });
}

function cEo() {
  if (typeof window > "u") return !1;
  const e = window;
  return !!(e.__TAURI__ || e.__TAURI_INTERNALS__);
}

function Rvn(e, t) {
  const n = e.includes("\\") ? "\\" : "/";
  return `${e.replace(/[\\/]+$/, "")}${n}${t}`;
}

function dEo() {
  const e = ["video/mp4;codecs=avc1.42E01E", "video/mp4"],
    t = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"];
  for (const n of e) if (typeof MediaRecorder < "u" && MediaRecorder.isTypeSupported(n)) return {
    mime: n,
    ext: "mp4"
  };
  for (const n of t) if (typeof MediaRecorder < "u" && MediaRecorder.isTypeSupported(n)) return {
    mime: n,
    ext: "webm"
  };
  return {
    mime: "",
    ext: "webm"
  };
}

function uEo(e, t) {
  return new Promise((n, r) => {
    const a = Number.isFinite(e.duration) ? Math.max(0, Math.min(t, Math.max(0, e.duration - .001))) : Math.max(0, t),
      i = () => {
        e.removeEventListener("seeked", i), e.removeEventListener("error", o), n();
      },
      o = () => {
        var s;
        e.removeEventListener("seeked", i), e.removeEventListener("error", o), r(new Error(((s = e.error) == null ? void 0 : s.message) || "视频解码失败"));
      };
    if (e.addEventListener("seeked", i), e.addEventListener("error", o), Math.abs(e.currentTime - a) < 8e-4) {
      e.removeEventListener("seeked", i), e.removeEventListener("error", o), n();
      return;
    }
    e.currentTime = a;
  });
}

async function hEo(e) {
  const t = document.createElement("video");
  return t.muted = !0, t.playsInline = !0, t.preload = "auto", t.crossOrigin = e.startsWith("http") ? "anonymous" : null, await new Promise((n, r) => {
    const a = () => {
      if (!t.videoWidth) {
        r(new Error("当前浏览器无法解码该视频画面（可能是 HEVC 编码），无法倒序"));
        return;
      }
      n();
    };
    t.onloadedmetadata = a, t.onerror = () => {
      r(new Error("当前浏览器无法解码该视频画面（可能是 HEVC 编码），无法倒序"));
    }, t.src = e;
  }), t;
}

async function pEo(e) {
  if (!e) return null;
  const t = e.settings || {},
    n = typeof t._localCacheAssetId == "string" && t._localCacheAssetId.trim() || typeof t._contentAssetId == "string" && t._contentAssetId.trim() || typeof t._assetId == "string" && t._assetId.trim() || "";
  if (!n) return null;
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
    return await r.ensureRestored(), (await r.getAssetSourcePath(n)) || null;
  } catch {
    return null;
  }
}

async function mEo(e) {
  var t, n, r, a;
  if (!cEo()) return null;
  try {
    const {
        invoke: i
      } = await Ie(async () => {
        const {
          invoke: f
        } = await Promise.resolve().then(() => sd);
        return {
          invoke: f
        };
      }, void 0, import.meta.url),
      {
        readFileAsBlob: o,
        writeBlobToFile: s
      } = await Ie(async () => {
        const {
          readFileAsBlob: f,
          writeBlobToFile: y
        } = await Promise.resolve().then(() => hg);
        return {
          readFileAsBlob: f,
          writeBlobToFile: y
        };
      }, void 0, import.meta.url);
    (t = e.onProgress) == null || t.call(e, {
      percent: 10,
      text: "正在准备视频倒序..."
    });
    const l = await pEo(e.sourceNode),
      d = await i("get_export_temp_dir"),
      u = Rvn(d, `reversed_${Date.now()}.mp4`);
    let h = l || "",
      p = !1;
    if (!h) if (/^file:/i.test(e.url) || /^[A-Za-z]:[\\/]/.test(e.url) || e.url.startsWith("\\\\")) h = e.url;else {
      (n = e.onProgress) == null || n.call(e, {
        percent: 16,
        text: "正在下载源视频..."
      });
      const y = await fetch(e.url);
      if (!y.ok) throw new Error(`源视频下载失败 (${y.status})`);
      const b = await y.blob();
      xwe(e.signal), h = Rvn(d, `reverse_src_${Date.now()}.mp4`), await s(h, b), p = !0;
    }
    xwe(e.signal), (r = e.onProgress) == null || r.call(e, {
      percent: 28,
      text: Qwr
    }), await i("ffmpeg_reverse_video", {
      args: {
        input: h,
        outputPath: u,
        start: e.start,
        end: e.end
      }
    }), xwe(e.signal), (a = e.onProgress) == null || a.call(e, {
      percent: 88,
      text: "正在读取倒序结果..."
    });
    const m = await o(u);
    if (p) try {
      const {
        remove: f
      } = await Ie(async () => {
        const {
          remove: y
        } = await Promise.resolve().then(() => oc);
        return {
          remove: y
        };
      }, void 0, import.meta.url);
      await f(h);
    } catch {}
    try {
      const {
        remove: f
      } = await Ie(async () => {
        const {
          remove: y
        } = await Promise.resolve().then(() => oc);
        return {
          remove: y
        };
      }, void 0, import.meta.url);
      await f(u);
    } catch {}
    return m.size ? {
      blob: m,
      fileName: tEo
    } : null;
  } catch (i) {
    if (i != null && i.cancelled) throw i;
    return console.warn("[videoReverse] FFmpeg 倒序不可用，回退浏览器编码:", i), null;
  }
}

async function fEo(e) {
  var n, r;
  const t = await hEo(e.url);
  try {
    xwe(e.signal);
    const a = Number.isFinite(t.duration) ? t.duration : 0,
      i = Xwr(e.start, e.end, a || e.end),
      o = Math.max(.02, i.end - i.start),
      s = 24,
      l = Math.max(1, Math.round(o * s)),
      {
        mime: d,
        ext: u
      } = dEo(),
      h = t.videoWidth,
      p = t.videoHeight,
      m = document.createElement("canvas");
    m.width = h, m.height = p;
    const f = m.getContext("2d");
    if (!f) throw new Error("无法创建画布");
    f.imageSmoothingEnabled = !0, f.imageSmoothingQuality = "high";
    const y = m.captureStream(s),
      b = y.getVideoTracks()[0],
      v = [],
      _ = typeof MediaRecorder < "u" && d ? new MediaRecorder(y, {
        mimeType: d,
        videoBitsPerSecond: 6e6
      }) : null;
    if (!_) throw new Error("当前浏览器无法编码倒序视频");
    _.ondataavailable = I => {
      var E;
      (E = I.data) != null && E.size && v.push(I.data);
    };
    const w = new Promise((I, E) => {
      _.onstop = () => I(), _.onerror = () => E(new Error(Kwr));
    });
    _.start();
    const k = performance.now(),
      A = Math.max(1e3 / s, o * 1e3);
    for (let I = 0; I < l; I++) {
      xwe(e.signal), await uEo(t, sEo(I, l, i.start, i.end)), f.drawImage(t, 0, 0, h, p), (n = b == null ? void 0 : b.requestFrame) == null || n.call(b);
      const M = k + (I + 1) / l * A - performance.now();
      M > 1 && (await Pvn(M)), (r = e.onProgress) == null || r.call(e, {
        percent: Math.round(12 + (I + 1) / l * 78),
        text: `${Qwr} ${I + 1}/${l}`
      });
    }
    const S = k + A - performance.now();
    S > 1 && (await Pvn(S)), _.stop(), await w;
    const C = new Blob(v, {
      type: _.mimeType || d || "video/webm"
    });
    if (!C.size) throw new Error("倒序结果为空");
    return {
      blob: C,
      fileName: `reversed_video.${u}`,
      width: h,
      height: p
    };
  } finally {
    t.removeAttribute("src"), t.load(), t.remove();
  }
}

async function gEo(e) {
  var i, o, s;
  const t = String(e.videoUrl || "").trim();
  if (!t) throw new Error(aEo);
  const n = await yG(e.sourceNode, t),
    {
      url: r,
      revoke: a
    } = n.url ? n : await Yk(t);
  try {
    (i = e.onProgress) == null || i.call(e, {
      percent: 8,
      text: "正在读取源视频..."
    });
    const l = await mEo({
      url: r,
      sourceNode: e.sourceNode,
      start: e.start,
      end: e.end,
      signal: e.signal,
      onProgress: e.onProgress
    });
    if (l) return (o = e.onProgress) == null || o.call(e, {
      percent: 94,
      text: Mvn
    }), {
      blob: l.blob,
      width: e.width || 0,
      height: e.height || 0,
      fileName: l.fileName
    };
    const d = await fEo({
      url: r,
      start: e.start,
      end: e.end,
      signal: e.signal,
      onProgress: e.onProgress
    });
    return (s = e.onProgress) == null || s.call(e, {
      percent: 94,
      text: Mvn
    }), d;
  } catch (l) {
    throw l != null && l.cancelled ? l : new Error(lEo(l));
  } finally {
    a == null || a();
  }
}

async function yEo(e) {
  if (!e.generateId || !e.setNodes) throw new Error(iEo);
  const t = await Ope(e.blob, {
    sourceNodeId: e.sourceNode.id,
    width: e.width,
    height: e.height,
    fileName: e.fileName,
    source: nEo,
    assetPrefix: "video_reverse",
    extraSettings: {
      videoReverseConfig: {
        startTime: e.startTime,
        endTime: e.endTime,
        duration: e.endTime - e.startTime
      },
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
    nodeName: rEo
  });
}

const bEo = ["开头", "全片", "末尾"],
  vEo = ["5秒", "15秒", "全部"],
  wEo = ["逐帧", "微调", "粗调"],
  Nvn = .1;

function Tdt({
  options: e,
  value: t,
  disabled: n,
  onChange: r
}) {
  on();
  const a = g.useRef(null),
    i = g.useRef(null),
    [o, s] = g.useState(null),
    l = e.indexOf(t),
    d = l >= 0,
    u = o ?? Math.max(0, l),
    h = d || o != null ? Math.round(Math.min(e.length - 1, Math.max(0, u))) : -1,
    p = o != null,
    m = f => {
      const y = i.current;
      if (!y || f.pointerId !== y.pointerId) return;
      const b = a.current,
        v = y.moved ? Math.round(Math.min(e.length - 1, Math.max(0, y.origin + (f.clientX - y.startX) / y.segW))) : Math.min(e.length - 1, Math.max(0, Math.floor((f.clientX - ((b == null ? void 0 : b.getBoundingClientRect().left) ?? 0) - 3) / y.segW)));
      i.current = null, s(null), n || r(e[v]), b == null || b.addEventListener("click", _ => {
        _.preventDefault(), _.stopPropagation();
      }, {
        capture: !0,
        once: !0
      });
    };
  return c.jsxs("div", {
    ref: a,
    className: `relative flex min-w-0 flex-1 touch-none select-none items-center rounded-full bg-black/40 p-[3px] ${n ? "pointer-events-none opacity-50" : p ? "cursor-grabbing" : "cursor-grab"}`,
    onPointerDown: f => {
      if (n) return;
      const y = a.current;
      y && (i.current = {
        pointerId: f.pointerId,
        startX: f.clientX,
        origin: Math.max(0, l),
        segW: (y.clientWidth - 6) / e.length,
        moved: !1
      }, y.setPointerCapture(f.pointerId));
    },
    onPointerMove: f => {
      const y = i.current;
      if (!y || f.pointerId !== y.pointerId) return;
      const b = f.clientX - y.startX;
      !y.moved && Math.abs(b) < 5 || (y.moved = !0, s(Math.min(e.length - 1, Math.max(0, y.origin + b / y.segW))));
    },
    onPointerUp: m,
    onPointerCancel: m,
    children: [h >= 0 ? c.jsx("div", {
      className: "pointer-events-none absolute bottom-[3px] left-[3px] top-[3px] rounded-full bg-white/90 shadow-[0_1px_4px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-[8px]",
      style: {
        width: `calc((100% - 6px) / ${e.length})`,
        transform: `translateX(${u * 100}%)`,
        transition: p ? "none" : "transform 320ms cubic-bezier(0.32, 0.72, 0, 1)"
      }
    }) : null, e.map((f, y) => c.jsx("button", {
      type: "button",
      className: `relative z-10 flex h-7 flex-1 items-center justify-center whitespace-nowrap rounded-full px-1 text-[11px] font-medium leading-none transition-colors duration-200 ${y === h ? "text-zinc-900" : "text-white/50 hover:text-white/80"}`,
      onClick: () => !n && r(f),
      children: f
    }, f))]
  });
}

function Mdt({
  label: e,
  children: t
}) {
  return on(), c.jsxs("div", {
    className: "flex items-center gap-3",
    children: [c.jsx("div", {
      className: "w-[4.25rem] shrink-0 text-[11px] text-white/45",
      children: e
    }), t]
  });
}

function zW(e, t, n = .08) {
  return Math.abs(e - t) <= n;
}

function jvn(e, t) {
  const n = bG(e);
  return t > 0 && zW(n, t, .05) ? "全部" : zW(n, 5) ? "5秒" : zW(n, 15) ? "15秒" : "";
}

function xEo(e, t) {
  return t > 0 ? zW(e.start, 0) && zW(e.end, t, .05) ? "全片" : zW(e.start, 0) ? "开头" : zW(e.end, t, .05) ? "末尾" : "" : "";
}

function _Eo(e) {
  return e === "粗调" ? zpe : e === "微调" ? H$t : V$t;
}

function kEo({
  open: e,
  videoUrl: t,
  sourceNode: n,
  nodes: r,
  generateId: a,
  setNodes: i,
  setSelectedNodeId: o,
  onClose: s
}) {
  on();
  const l = g.useRef(null),
    d = g.useRef(null),
    u = g.useRef(null),
    h = g.useRef(null),
    p = g.useRef(0),
    m = g.useRef(0),
    f = g.useRef({
      start: 0,
      end: 0
    }),
    y = g.useRef(0),
    b = g.useRef(null),
    [v, _] = g.useState({
      width: 0,
      height: 0,
      duration: 0
    }),
    [w, k] = g.useState({
      start: 0,
      end: 0
    }),
    [A, S] = g.useState(0),
    [C, I] = g.useState(!1),
    [E, M] = g.useState([]),
    [T, P] = g.useState(0),
    [R, j] = g.useState(null),
    [B, F] = g.useState(""),
    [N, G] = g.useState("逐帧"),
    [z, V] = g.useState(!1),
    [O, L] = g.useState(0),
    [D, U] = g.useState(""),
    H = v.duration,
    Y = Math.min(Nvn, H || Nvn),
    K = H > 0 ? H : 60,
    W = g.useMemo(() => ({
      ...w,
      total: H,
      minDuration: Y,
      maxDuration: K
    }), [w, H, Y, K]),
    Q = bG(w),
    q = g.useMemo(() => {
      const ge = jvn(w, H);
      return ge === "5秒" ? Math.min(5, H || 5) : ge === "15秒" ? Math.min(15, H || 15) : ge === "全部" ? H || K : Q > 0 ? Q : H || K;
    }, [w, H, K, Q]),
    ne = H > 0 && MZe(Q, Y, K),
    de = Y$t(A, w),
    le = Q5(w.start, H),
    J = Q5(w.end, H),
    pe = Q5(A, H),
    ce = g.useMemo(() => q$t(H, T), [H, T]);
  f.current = w, y.current = A;
  const we = () => d.current,
    X = () => {
      const ge = we();
      ge == null || ge.pause(), I(!1), m.current && (cancelAnimationFrame(m.current), m.current = 0);
    },
    Z = ge => {
      const _e = we(),
        ke = Math.max(0, Math.min(ge, Math.max(0, (H || (_e == null ? void 0 : _e.duration) || 0) - .001)));
      S(ke), _e && Number.isFinite(ke) && (_e.currentTime = ke);
    },
    re = ge => {
      k({
        start: Math.max(0, ge.start),
        end: Math.max(ge.start, ge.end)
      });
    };
  g.useEffect(() => {
    e && (k({
      start: 0,
      end: 0
    }), S(0), I(!1), M([]), V(!1), L(0), U(""), _({
      width: 0,
      height: 0,
      duration: 0
    }), G("逐帧"));
  }, [e, t]), g.useEffect(() => {
    var _e;
    if (!e) return;
    const ge = (_e = l.current) == null ? void 0 : _e.parentElement;
    ge == null || ge.querySelectorAll("video").forEach(ke => {
      ke !== d.current && ke.pause();
    });
  }, [e]), g.useLayoutEffect(() => {
    const ge = u.current;
    if (!ge) return;
    const _e = () => P(ge.getBoundingClientRect().width);
    _e();
    const ke = new ResizeObserver(_e);
    return ke.observe(ge), () => ke.disconnect();
  }, [e]), g.useEffect(() => {
    if (!e || !t || !(H > 0) || !(T > 0) || !v.width || !v.height) return;
    const ge = ++p.current,
      _e = document.createElement("video");
    _e.muted = !0, _e.playsInline = !0, _e.preload = "auto", _e.crossOrigin = t.startsWith("http") ? "anonymous" : null, _e.src = t;
    let ke = !1;
    return (async () => {
      try {
        if (await new Promise((Me, Re) => {
          const $e = window.setTimeout(() => Re(new Error("timeout")), 8e3);
          _e.onloadedmetadata = () => {
            window.clearTimeout($e), Me();
          }, _e.onerror = () => {
            window.clearTimeout($e), Re(new Error("load error"));
          };
        }), ke || ge !== p.current) return;
        const Te = NZe(T, v.width / v.height),
          Ne = jZe(v.width, v.height),
          me = document.createElement("canvas");
        me.width = Ne.width, me.height = Ne.height;
        const Ae = me.getContext("2d");
        if (!Ae) return;
        const Fe = DZe(Te, H);
        for (let Me = 0; Me < Fe.length; Me++) {
          if (ke || ge !== p.current || (await new Promise(($e, rt) => {
            const nt = window.setTimeout(() => rt(new Error("seek timeout")), 3e3);
            _e.onseeked = () => {
              window.clearTimeout(nt), $e();
            }, _e.onerror = () => {
              window.clearTimeout(nt), rt(new Error("seek error"));
            }, _e.currentTime = Fe[Me];
          }), ke || ge !== p.current)) return;
          Ae.drawImage(_e, 0, 0, me.width, me.height);
          const Re = me.toDataURL("image/jpeg", .6);
          M($e => Me === 0 ? [Re] : [...$e, Re]);
        }
      } catch {
        ge === p.current && M([]);
      } finally {
        _e.removeAttribute("src"), _e.load(), _e.remove();
      }
    })(), () => {
      ke = !0, p.current += 1;
    };
  }, [e, t, H, T, v.width, v.height]);
  const fe = () => {
      m.current && (cancelAnimationFrame(m.current), m.current = 0);
    },
    ye = () => {
      fe();
      const ge = () => {
        const _e = we();
        if (!_e || _e.paused) {
          I(!1), m.current = 0;
          return;
        }
        const ke = _e.currentTime,
          ve = f.current;
        S(ke), ke >= ve.end - .01 && (_e.currentTime = ve.start, S(ve.start)), m.current = requestAnimationFrame(ge);
      };
      m.current = requestAnimationFrame(ge);
    },
    ie = () => {
      const ge = we();
      if (!ge || z) return;
      if (!ge.paused) {
        X();
        return;
      }
      const _e = f.current,
        ke = y.current;
      (A$(ge) || H) > 0 && (ke < _e.start || ke >= _e.end - .01) && (ge.currentTime = _e.start, S(_e.start)), ge.muted = !0, ge.playsInline = !0, ge.play().then(() => {
        I(!0), ye();
      }).catch(() => {
        ge.muted = !0, ge.play().then(() => {
          I(!0), ye();
        }).catch(() => {
          I(!1);
        });
      });
    };
  g.useEffect(() => () => fe(), []), g.useEffect(() => {
    if (!e) return;
    const ge = _e => {
      const ke = _e.target;
      if (ke && (ke.tagName === "INPUT" || ke.tagName === "TEXTAREA" || ke.isContentEditable)) {
        _e.key === "Escape" && ke.blur();
        return;
      }
      if (_e.metaKey || _e.ctrlKey || _e.altKey) return;
      let ve = !0;
      const Te = _e.shiftKey ? zpe : _Eo(N),
        Ne = f.current,
        me = y.current,
        Ae = {
          ...W,
          ...Ne
        };
      switch (_e.code) {
        case "Space":
          ie();
          break;
        case "ArrowLeft":
        case "Comma":
          Z(me - Te);
          break;
        case "ArrowRight":
        case "Period":
          Z(me + Te);
          break;
        case "BracketLeft":
        case "KeyI":
          re(S$(me, Ae));
          break;
        case "BracketRight":
        case "KeyO":
          re(I$(me, Ae));
          break;
        case "Home":
          Z(Ne.start);
          break;
        case "End":
          Z(Ne.end);
          break;
        case "Escape":
          z || s();
          break;
        case "Enter":
          !_e.isComposing && ne && !z && xe();
          break;
        default:
          ve = !1;
      }
      ve && (_e.preventDefault(), _e.stopPropagation());
    };
    return document.addEventListener("keydown", ge, !0), () => document.removeEventListener("keydown", ge, !0);
  }, [e, W.total, W.minDuration, W.maxDuration, N, ne, z]);
  const ae = (ge, _e) => {
      if (z || _e.button !== 0 || !(H > 0)) return;
      _e.preventDefault(), _e.stopPropagation(), b.current = {
        mode: ge,
        startX: _e.clientX,
        originStart: w.start,
        originEnd: w.end,
        activated: ge !== "move"
      }, F(ge), ge !== "move" && X();
      const ke = Te => {
          const Ne = b.current,
            me = u.current;
          if (!Ne || !me) return;
          const Ae = me.getBoundingClientRect();
          if (Ne.mode === "move" && !Ne.activated) {
            if (Math.abs(Te.clientX - Ne.startX) < EZe) return;
            Ne.activated = !0, X();
          }
          if (Ne.mode === "scrub" || Ne.mode === "start" || Ne.mode === "end") {
            let $e = (Te.clientX - Ae.left) / Ae.width * H;
            Ne.mode !== "scrub" && ($e = PZe($e, Ae.width, H, [A, 0, H], Te.altKey)), Ne.mode === "scrub" ? Z($e) : Ne.mode === "start" ? re(S$($e, {
              ...W,
              start: Ne.originStart,
              end: Ne.originEnd
            })) : re(I$($e, {
              ...W,
              start: Ne.originStart,
              end: Ne.originEnd
            }));
            return;
          }
          const Fe = Ne.originEnd - Ne.originStart,
            Me = RZe(Te.clientX - Ne.startX, Ae.width, H),
            Re = Math.max(0, Math.min(Ne.originStart + Me, H - Fe));
          re({
            start: Re,
            end: Re + Fe
          });
        },
        ve = Te => {
          const Ne = b.current,
            me = u.current;
          if ((Ne == null ? void 0 : Ne.mode) === "move" && !Ne.activated && me) {
            const Ae = me.getBoundingClientRect();
            Z((Ne.startX - Ae.left) / Ae.width * H);
          }
          b.current = null, F(""), window.removeEventListener("pointermove", ke), window.removeEventListener("pointerup", ve), window.removeEventListener("pointercancel", ve);
        };
      window.addEventListener("pointermove", ke), window.addEventListener("pointerup", ve), window.addEventListener("pointercancel", ve);
    },
    be = ge => {
      if (!(H > 0)) return;
      const _e = {
        ...W,
        maxDuration: q || H
      };
      re(ge === "开头" ? K$t(_e) : ge === "末尾" ? Q$t(_e) : {
        start: 0,
        end: H
      }), Z(ge === "末尾" ? Math.max(0, H - (q || H)) : 0);
    },
    Ee = ge => {
      if (H > 0) {
        if (ge === "全部") {
          re({
            start: 0,
            end: H
          });
          return;
        }
        re(TZe(ge === "5秒" ? 5 : 15, W));
      }
    },
    xe = async () => {
      var _e;
      if (z) {
        (_e = h.current) == null || _e.abort();
        return;
      }
      if (!t || !a || !i || !ne) {
        Ai("error", a && i ? "请先框出有效区间" : "无法创建节点");
        return;
      }
      X();
      const ge = new AbortController();
      h.current = ge, V(!0), L(0), U("正在准备...");
      try {
        const ke = f.current,
          ve = await gEo({
            videoUrl: t,
            sourceNode: n,
            start: ke.start,
            end: ke.end,
            width: v.width,
            height: v.height,
            signal: ge.signal,
            onProgress: ({
              percent: Te,
              text: Ne
            }) => {
              L(me => Math.max(me, Te)), U(Ne);
            }
          });
        await yEo({
          blob: ve.blob,
          fileName: ve.fileName,
          width: ve.width || v.width,
          height: ve.height || v.height,
          sourceNode: n,
          startTime: ke.start,
          endTime: ke.end,
          nodes: r,
          generateId: a,
          setNodes: i,
          setSelectedNodeId: o
        }), Ai("success", oEo), s();
      } catch (ke) {
        const ve = !!(ke != null && ke.cancelled);
        Ai(ve ? "info" : "error", ve ? Ywr : ke instanceof Error ? ke.message : "视频倒序处理失败");
      } finally {
        h.current = null, V(!1);
      }
    };
  if (!e) return null;
  const he = R == null || !(H > 0) ? "" : Om(R / 100 * H),
    ue = B === "start" ? Om(w.start) : B === "end" ? Om(w.end) : "";
  return c.jsxs(c.Fragment, {
    children: [c.jsxs("div", {
      ref: l,
      className: "nodrag nowheel pointer-events-auto absolute inset-0 z-40 overflow-hidden rounded-2xl",
      onPointerDown: ge => ge.stopPropagation(),
      onMouseDown: ge => ge.stopPropagation(),
      onClick: ge => {
        ge.stopPropagation(), z || ie();
      },
      children: [c.jsx("video", {
        ref: d,
        src: t,
        muted: !0,
        playsInline: !0,
        preload: "auto",
        crossOrigin: t.startsWith("http") ? "anonymous" : void 0,
        className: "pointer-events-none absolute inset-0 h-full w-full object-contain",
        onLoadedMetadata: ge => {
          const _e = ge.currentTarget,
            ke = A$(_e);
          _({
            width: _e.videoWidth || 0,
            height: _e.videoHeight || 0,
            duration: ke
          }), k(ve => ve.end > .02 ? ve : {
            start: 0,
            end: ke
          });
        },
        onPlay: () => {
          I(!0), ye();
        },
        onPause: () => {
          I(!1), fe();
        }
      }), c.jsxs("div", {
        className: "pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-1 rounded-md bg-black/55 px-1.5 py-0.5 text-[10px] tabular-nums text-white/90",
        children: [c.jsx("span", {
          children: Om(A)
        }), de ? c.jsx("span", {
          className: "text-white/45",
          children: x("区间外")
        }) : null]
      }), !C && !z ? c.jsx("span", {
        className: "pointer-events-none absolute inset-0 flex items-center justify-center",
        children: c.jsx("span", {
          className: "flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#111] shadow-[0_8px_24px_rgba(0,0,0,0.35)]",
          children: c.jsx("svg", {
            viewBox: "0 0 24 24",
            width: "22",
            height: "22",
            fill: "currentColor",
            children: c.jsx("path", {
              d: "M8 5v14l11-7z"
            })
          })
        })
      }) : null]
    }), c.jsx("div", {
      className: "absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2",
      style: {
        pointerEvents: "auto"
      },
      onClick: ge => ge.stopPropagation(),
      onPointerDown: ge => ge.stopPropagation(),
      children: c.jsxs(OT, {
        title: x("时序倒置"),
        testId: "video-reverse-panel",
        dataAttr: "data-video-reverse-panel",
        width: 436,
        generatePlacement: "footer",
        bodyClassName: "px-4 pb-3",
        onClose: z ? void 0 : s,
        onGenerate: () => void xe(),
        generateTitle: z ? "停止时序倒置" : "确认时序倒置",
        footer: z ? c.jsxs("div", {
          className: "flex min-w-0 flex-1 items-center gap-2",
          children: [c.jsxs("div", {
            className: "min-w-0 flex-1",
            children: [c.jsx("div", {
              className: "truncate text-[11px] text-white/45",
              children: D || x("正在准备...")
            }), c.jsx("div", {
              className: "mt-1 h-1 overflow-hidden rounded-full bg-white/10",
              children: c.jsx("div", {
                className: "h-full rounded-full bg-white/80 transition-[width] duration-300",
                style: {
                  width: `${O}%`
                }
              })
            })]
          }), c.jsxs("span", {
            className: "tabular-nums text-[11px] text-white/55",
            children: [O, "%"]
          })]
        }) : c.jsx("div", {
          className: "truncate text-center text-[11px] tabular-nums text-white/30",
          children: H > 0 ? x("{0} → {1} · {2} · 倒放", Om(w.start), Om(w.end), W$t(Q)) : x("拖动入点 / 出点确定倒序区间")
        }),
        children: [c.jsxs("div", {
          className: `mb-3 ${z ? "pointer-events-none opacity-60" : ""}`,
          children: [c.jsx("div", {
            className: "relative mb-1 h-3.5",
            children: ce.map(ge => c.jsx("span", {
              className: "absolute bottom-0 w-px bg-white/25",
              style: {
                left: `${ge.left}%`,
                height: ge.major ? 7 : 4,
                background: ge.major ? "rgba(255,255,255,0.4)" : void 0
              },
              children: ge.label ? c.jsx("span", {
                className: "absolute bottom-2 left-0.5 whitespace-nowrap text-[9px] tabular-nums text-white/45",
                children: x(ge.label)
              }) : null
            }, ge.key))
          }), c.jsxs("div", {
            ref: u,
            className: `relative h-14 overflow-hidden rounded-[10px] bg-black/35 ${B ? "cursor-ew-resize" : "cursor-crosshair"}`,
            onPointerDown: ge => {
              ge.target.closest("[data-trim-handle], [data-trim-selection], [data-trim-playhead]") || ae("scrub", ge);
            },
            onPointerMove: ge => {
              var ke;
              const _e = (ke = u.current) == null ? void 0 : ke.getBoundingClientRect();
              !_e || B || j((ge.clientX - _e.left) / _e.width * 100);
            },
            onPointerLeave: () => j(null),
            children: [c.jsx("div", {
              className: "pointer-events-none absolute inset-0 flex overflow-hidden",
              children: E.length ? E.map((ge, _e) => c.jsx("img", {
                src: ge,
                alt: "",
                className: "h-full min-w-0 flex-1 object-cover"
              }, `${ge}-${_e}`)) : c.jsx("div", {
                className: "h-full w-full bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.06)_0_12px,rgba(255,255,255,0.02)_12px_24px)]"
              })
            }), c.jsx("div", {
              className: "pointer-events-none absolute inset-y-0 left-0 bg-black/55",
              style: {
                width: `${le}%`
              }
            }), c.jsx("div", {
              className: "pointer-events-none absolute inset-y-0 right-0 bg-black/55",
              style: {
                width: `${100 - J}%`
              }
            }), c.jsxs("div", {
              "data-trim-selection": "",
              className: `absolute inset-y-0 z-[2] ${B === "move" ? "cursor-grabbing" : "cursor-grab"}`,
              style: {
                left: `${le}%`,
                width: `${Math.max(0, J - le)}%`,
                boxShadow: ne ? "inset 0 2px #fff, inset 0 -2px #fff" : "inset 0 2px 0 rgba(248,113,113,0.85), inset 0 -2px 0 rgba(248,113,113,0.85)"
              },
              onPointerDown: ge => ae("move", ge),
              children: [c.jsx("div", {
                "data-trim-handle": "start",
                className: "absolute bottom-0 top-0 z-10 flex w-3.5 -translate-x-1/2 items-center justify-center rounded-l-[7px] bg-white",
                style: {
                  left: 0
                },
                onPointerDown: ge => ae("start", ge),
                children: c.jsx("span", {
                  className: "h-4 w-0.5 rounded-sm bg-black/35"
                })
              }), c.jsx("div", {
                "data-trim-handle": "end",
                className: "absolute bottom-0 top-0 z-10 flex w-3.5 translate-x-1/2 items-center justify-center rounded-r-[7px] bg-white",
                style: {
                  right: 0
                },
                onPointerDown: ge => ae("end", ge),
                children: c.jsx("span", {
                  className: "h-4 w-0.5 rounded-sm bg-black/35"
                })
              })]
            }), R != null && !B ? c.jsx("div", {
              className: "pointer-events-none absolute inset-y-0 z-[8] w-px bg-white/45",
              style: {
                left: `${R}%`
              },
              children: c.jsx("span", {
                className: "absolute -top-5 left-1/2 -translate-x-1/2 rounded bg-black/85 px-1.5 py-0.5 text-[10px] tabular-nums text-white",
                children: he
              })
            }) : null, ue ? c.jsx("div", {
              className: "pointer-events-none absolute -top-5 z-20 -translate-x-1/2 rounded bg-black/85 px-1.5 py-0.5 text-[10px] tabular-nums text-white",
              style: {
                left: `${B === "start" ? le : J}%`
              },
              children: ue
            }) : null, c.jsx("div", {
              "data-trim-playhead": "",
              className: "pointer-events-none absolute bottom-0 top-[-10px] z-20 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_4px_rgba(0,0,0,0.4)]",
              style: {
                left: `${pe}%`
              },
              children: c.jsx("div", {
                className: "pointer-events-auto absolute -top-0.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-[3px] bg-white",
                style: {
                  cursor: "ew-resize"
                },
                onPointerDown: ge => ae("scrub", ge)
              })
            })]
          })]
        }), c.jsxs("div", {
          className: "flex flex-col gap-2",
          children: [c.jsx(Mdt, {
            label: x("快捷定位"),
            children: c.jsx(Tdt, {
              options: bEo,
              value: xEo(w, H),
              disabled: z || !(H > 0),
              onChange: be
            })
          }), c.jsx(Mdt, {
            label: x("保留时长"),
            children: c.jsx(Tdt, {
              options: vEo,
              value: jvn(w, H),
              disabled: z || !(H > 0),
              onChange: Ee
            })
          }), c.jsx(Mdt, {
            label: x("步进精度"),
            children: c.jsx(Tdt, {
              options: wEo,
              value: N,
              disabled: z,
              onChange: ge => G(ge)
            })
          })]
        })]
      })
    })]
  });
}

const AEo = Object.freeze(Object.defineProperty({
    __proto__: null,
    VideoReverseHost: kEo
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  SEo = "extracted_audio",
  IEo = "mp3",
  CEo = "pcm-s16",
  EEo = 192e3,
  TEo = 192,
  RAe = "该视频没有音频轨道",
  MEo = "源视频地址为空",
  PEo = "无法创建节点",
  REo = "音频上传失败",
  Jwr = "提取音频失败",
  Zwr = "正在提取音频...",
  NEo = "正在保存音频...",
  jEo = "音频提取成功，已添加为新节点",
  Dvn = "video_extract_audio",
  Lvn = {
    width: 444,
    height: 250
  },
  Ovn = Object.freeze([Object.freeze({
    codec: IEo,
    ext: "mp3",
    mime: "audio/mpeg",
    bitrate: EEo
  }), Object.freeze({
    codec: CEo,
    ext: "wav",
    mime: "audio/wav",
    bitrate: null
  })]);

function NAe(e) {
  return e ? Ovn[0] : Ovn[1];
}

function exr(e, t = SEo) {
  const n = typeof e == "string" ? e : e.ext;
  return `${t}.${n}`;
}

function DEo(e, t, n) {
  const r = Number.isFinite(n) && n > 0 ? n : 0;
  if (!(r > 0)) {
    const o = Math.max(0, Number.isFinite(e) ? e : 0),
      s = Math.max(o + .02, Number.isFinite(t) ? t : o + .02);
    return {
      start: o,
      end: s
    };
  }
  const a = Math.max(0, Math.min(Number.isFinite(e) ? e : 0, Math.max(0, r - .02))),
    i = Math.max(a + .02, Math.min(Number.isFinite(t) ? t : r, r));
  return {
    start: a,
    end: i
  };
}

function LEo(e, t = "", n = Jwr) {
  if (e && typeof e == "object" && e.cancelled) return "已取消提取音频";
  const r = e instanceof Error ? e.message : typeof e == "string" ? e : "";
  if (r.includes(RAe) || r.includes("Audio:")) return RAe;
  if (!r) return n;
  const a = (() => {
      try {
        return t ? new URL(t).host : "";
      } catch {
        return "";
      }
    })(),
    i = a ? `（来源：${a}）` : "",
    o = e instanceof Error ? e.name : "",
    s = typeof (e == null ? void 0 : e.status) == "number" ? e.status : 0;
  if (o === "AbortError" || r.includes("timeout") || r.includes("超时")) return `源视频下载超时：网络长时间无响应，请重试${i}`;
  if (s > 0) return `源视频下载失败：服务器返回 ${s}，素材可能已失效或无访问权限${i}`;
  const l = o === "TypeError" || /network|fetch|cors|跨域|failed to fetch/i.test(r);
  return l && /^http:\/\//i.test(t) && typeof location < "u" && location.protocol === "https:" ? `源视频下载失败：素材地址是 http，被浏览器按不安全内容拦截${i}` : l && typeof navigator < "u" && navigator.onLine === !1 ? `源视频下载失败：网络已断开，请恢复网络后重试${i}` : l ? `源视频下载失败：网络中断或请求被跨域策略/拦截插件阻止，请重试或更换网络${i}` : r || n;
}

function _we(e) {
  if (e != null && e.aborted) {
    const t = new Error("已取消提取音频");
    throw t.cancelled = !0, t;
  }
}

function OEo() {
  if (typeof window > "u") return !1;
  const e = window;
  return !!(e.__TAURI__ || e.__TAURI_INTERNALS__);
}

function Bvn(e, t) {
  const n = e.includes("\\") ? "\\" : "/";
  return `${e.replace(/[\\/]+$/, "")}${n}${t}`;
}

async function BEo(e) {
  if (!e) return null;
  const t = e.settings || {},
    n = typeof t._localCacheAssetId == "string" && t._localCacheAssetId.trim() || typeof t._contentAssetId == "string" && t._contentAssetId.trim() || typeof t._assetId == "string" && t._assetId.trim() || "";
  if (!n) return null;
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
    return await r.ensureRestored(), (await r.getAssetSourcePath(n)) || null;
  } catch {
    return null;
  }
}

function Fvn(e) {
  const t = new Int16Array(e.length);
  for (let n = 0; n < e.length; n++) {
    const r = Math.max(-1, Math.min(1, e[n]));
    t[n] = r < 0 ? r * 32768 : r * 32767;
  }
  return t;
}

function FEo(e) {
  const t = Math.max(1, e.numberOfChannels),
    n = e.sampleRate,
    r = e.length,
    a = 16,
    i = t * (a / 8),
    o = r * i,
    s = 44,
    l = new ArrayBuffer(s + o),
    d = new DataView(l),
    u = (f, y) => {
      for (let b = 0; b < y.length; b++) d.setUint8(f + b, y.charCodeAt(b));
    };
  u(0, "RIFF"), d.setUint32(4, 36 + o, !0), u(8, "WAVE"), u(12, "fmt "), d.setUint32(16, 16, !0), d.setUint16(20, 1, !0), d.setUint16(22, t, !0), d.setUint32(24, n, !0), d.setUint32(28, n * i, !0), d.setUint16(32, i, !0), d.setUint16(34, a, !0), u(36, "data"), d.setUint32(40, o, !0);
  const h = new Int16Array(l, s),
    p = e.getChannelData(0),
    m = t > 1 ? e.getChannelData(1) : p;
  for (let f = 0; f < r; f++) {
    const y = Math.max(-1, Math.min(1, p[f] || 0));
    if (h[f * t] = y < 0 ? y * 32768 : y * 32767, t > 1) {
      const b = Math.max(-1, Math.min(1, m[f] || 0));
      h[f * t + 1] = b < 0 ? b * 32768 : b * 32767;
    }
  }
  return new Blob([l], {
    type: "audio/wav"
  });
}

async function zEo(e) {
  try {
    const t = await Ie(() => Promise.resolve().then(() => Bmr), void 0, import.meta.url),
      r = (t.default ?? t).Mp3Encoder;
    if (!r) return null;
    const a = Math.min(2, Math.max(1, e.numberOfChannels)),
      i = new r(a, e.sampleRate, TEo),
      o = Fvn(e.getChannelData(0)),
      s = a > 1 ? Fvn(e.getChannelData(1)) : o,
      l = 1152,
      d = [];
    for (let f = 0; f < o.length; f += l) {
      const y = i.encodeBuffer(o.subarray(f, f + l), s.subarray(f, f + l));
      y.length && d.push(y);
    }
    const u = i.flush();
    u.length && d.push(u);
    const h = d.reduce((f, y) => f + y.length, 0);
    if (!h) return null;
    const p = new Uint8Array(h);
    let m = 0;
    for (const f of d) p.set(f, m), m += f.length;
    return new Blob([p], {
      type: "audio/mpeg"
    });
  } catch {
    return null;
  }
}

function UEo(e, t, n) {
  const r = DEo(t, n, e.duration),
    a = e.sampleRate,
    i = Math.max(0, Math.min(e.length, Math.floor(r.start * a))),
    o = Math.max(i + 1, Math.min(e.length, Math.ceil(r.end * a))),
    s = Math.max(1, o - i),
    l = new AudioBuffer({
      length: s,
      numberOfChannels: e.numberOfChannels,
      sampleRate: a
    });
  for (let d = 0; d < e.numberOfChannels; d++) l.copyToChannel(e.getChannelData(d).subarray(i, i + s), d);
  return l;
}

async function $Eo(e) {
  const t = await fetch(e);
  if (!t.ok) {
    const a = new Error(`源视频下载失败 (${t.status})`);
    throw a.status = t.status, a;
  }
  const n = await t.blob(),
    r = new (window.AudioContext || window.webkitAudioContext)();
  try {
    return await r.decodeAudioData(await n.arrayBuffer());
  } finally {
    r.close();
  }
}

function GEo(e, t) {
  return e.type.includes("mpeg") || e.type.includes("mp3") ? NAe(!0) : e.type.includes("wav") ? NAe(!1) : t;
}

async function VEo(e) {
  var t, n, r, a;
  if (!OEo()) return null;
  try {
    const {
        invoke: i
      } = await Ie(async () => {
        const {
          invoke: b
        } = await Promise.resolve().then(() => sd);
        return {
          invoke: b
        };
      }, void 0, import.meta.url),
      {
        readFileAsBlob: o,
        writeBlobToFile: s
      } = await Ie(async () => {
        const {
          readFileAsBlob: b,
          writeBlobToFile: v
        } = await Promise.resolve().then(() => hg);
        return {
          readFileAsBlob: b,
          writeBlobToFile: v
        };
      }, void 0, import.meta.url);
    (t = e.onProgress) == null || t.call(e, {
      percent: 12,
      text: "正在准备提取音频..."
    });
    const l = await BEo(e.sourceNode),
      d = await i("get_export_temp_dir"),
      u = NAe(!0),
      h = Bvn(d, `${Date.now()}_${exr(u)}`);
    let p = l || "",
      m = !1;
    if (!p) if (/^file:/i.test(e.url) || /^[A-Za-z]:[\\/]/.test(e.url) || e.url.startsWith("\\\\")) p = e.url;else {
      (n = e.onProgress) == null || n.call(e, {
        percent: 18,
        text: "正在下载源视频..."
      });
      const v = await fetch(e.url);
      if (!v.ok) {
        const w = new Error(`源视频下载失败 (${v.status})`);
        throw w.status = v.status, w;
      }
      const _ = await v.blob();
      _we(e.signal), p = Bvn(d, `extract_audio_src_${Date.now()}.mp4`), await s(p, _), m = !0;
    }
    _we(e.signal), (r = e.onProgress) == null || r.call(e, {
      percent: 36,
      text: Zwr
    });
    const f = await i("ffmpeg_extract_audio", {
      args: {
        input: p,
        outputPath: h,
        start: e.start,
        end: e.end
      }
    });
    _we(e.signal), (a = e.onProgress) == null || a.call(e, {
      percent: 86,
      text: "正在读取音频..."
    });
    const y = await o(f || h);
    if (m) try {
      const {
        remove: b
      } = await Ie(async () => {
        const {
          remove: v
        } = await Promise.resolve().then(() => oc);
        return {
          remove: v
        };
      }, void 0, import.meta.url);
      await b(p);
    } catch {}
    try {
      const {
        remove: b
      } = await Ie(async () => {
        const {
          remove: v
        } = await Promise.resolve().then(() => oc);
        return {
          remove: v
        };
      }, void 0, import.meta.url);
      await b(f || h);
    } catch {}
    return y.size ? {
      blob: y,
      spec: GEo(y, u)
    } : null;
  } catch (i) {
    if (i != null && i.cancelled) throw i;
    if ((i instanceof Error ? i.message : String(i || "")).includes(RAe)) throw new Error(RAe);
    return console.warn("[videoExtractAudio] FFmpeg 提取不可用，回退浏览器编码:", i), null;
  }
}

async function HEo(e) {
  var i, o, s;
  (i = e.onProgress) == null || i.call(e, {
    percent: 20,
    text: "正在解码音轨..."
  });
  const t = await $Eo(e.url);
  if (_we(e.signal), !(t.duration > 0) || t.length < 32) throw new Error(RAe);
  (o = e.onProgress) == null || o.call(e, {
    percent: 48,
    text: Zwr
  });
  const n = UEo(t, e.start, e.end),
    r = await zEo(n);
  if (_we(e.signal), r && r.size > 0) return {
    blob: r,
    spec: NAe(!0)
  };
  (s = e.onProgress) == null || s.call(e, {
    percent: 72,
    text: "正在回退为 WAV..."
  });
  const a = FEo(n);
  if (!a.size) throw new Error(Jwr);
  return {
    blob: a,
    spec: NAe(!1)
  };
}

async function WEo(e) {
  var i, o;
  const t = String(e.videoUrl || "").trim();
  if (!t) throw new Error(MEo);
  const n = await yG(e.sourceNode, t),
    {
      url: r,
      revoke: a
    } = n.url ? n : await Yk(t);
  try {
    (i = e.onProgress) == null || i.call(e, {
      percent: 8,
      text: "正在读取源视频..."
    });
    const l = (await VEo({
      url: r,
      sourceNode: e.sourceNode,
      start: e.start,
      end: e.end,
      signal: e.signal,
      onProgress: e.onProgress
    })) || (await HEo({
      url: r,
      start: e.start,
      end: e.end,
      signal: e.signal,
      onProgress: e.onProgress
    }));
    return (o = e.onProgress) == null || o.call(e, {
      percent: 94,
      text: NEo
    }), {
      blob: l.blob,
      spec: l.spec,
      fileName: exr(l.spec)
    };
  } catch (s) {
    throw s != null && s.cancelled ? s : new Error(LEo(s, r));
  } finally {
    a == null || a();
  }
}

async function qEo(e, t) {
  const n = new File([e], t.fileName, {
      type: e.type || t.spec.mime
    }),
    {
      isGlobalOssUploadEnabled: r,
      uploadGlobalMaterialAudio: a,
      buildUrlOnlyNodePatch: i
    } = await Ie(async () => {
      const {
        isGlobalOssUploadEnabled: h,
        uploadGlobalMaterialAudio: p,
        buildUrlOnlyNodePatch: m
      } = await Promise.resolve().then(() => ii);
      return {
        isGlobalOssUploadEnabled: h,
        uploadGlobalMaterialAudio: p,
        buildUrlOnlyNodePatch: m
      };
    }, void 0, import.meta.url);
  if (r()) try {
    const h = await a(n),
      p = i(h, {
        mediaType: "audio",
        source: Dvn,
        musicTitle: "提取音频",
        ...(t.extraSettings || {})
      });
    return {
      content: String(p.content || h.displayUrl),
      settings: p.settings || {}
    };
  } catch (h) {
    console.warn("[videoExtractAudio] OSS 上传失败，回退本地:", h);
  }
  const s = `video_extract_audio_${String(t.sourceNodeId || "audio").replace(/[^\w.-]+/g, "_").slice(0, 48)}_${Date.now()}`,
    {
      assetStore: l
    } = await Ie(async () => {
      const {
        assetStore: h
      } = await Promise.resolve().then(() => Ri);
      return {
        assetStore: h
      };
    }, void 0, import.meta.url);
  await l.init(), await l.saveBlobAsset(s, e, `file://video_extract_audio/${t.fileName}`, "local");
  try {
    const {
        localCacheManager: h,
        ensureCacheRootReadyForWrite: p
      } = await Ie(async () => {
        const {
          localCacheManager: f,
          ensureCacheRootReadyForWrite: y
        } = await Promise.resolve().then(() => Ha);
        return {
          localCacheManager: f,
          ensureCacheRootReadyForWrite: y
        };
      }, void 0, import.meta.url),
      {
        isCanvasLocalCacheMode: m
      } = await Ie(async () => {
        const {
          isCanvasLocalCacheMode: f
        } = await Promise.resolve().then(() => So);
        return {
          isCanvasLocalCacheMode: f
        };
      }, void 0, import.meta.url);
    m() && (await p(), h.isAvailable() && (await h.saveAsset(s, e, e.type || t.spec.mime, `file://video_extract_audio/${t.fileName}`)));
  } catch {}
  const d = await l.getAssetUrl(s);
  if (!d) throw new Error(REo);
  const {
    mergeInputImageLocalCacheAssetSettings: u
  } = await Ie(async () => {
    const {
      mergeInputImageLocalCacheAssetSettings: h
    } = await Promise.resolve().then(() => o5e);
    return {
      mergeInputImageLocalCacheAssetSettings: h
    };
  }, void 0, import.meta.url);
  return {
    content: d,
    settings: {
      ...u({
        mediaType: "audio"
      }, s),
      mediaType: "audio",
      source: Dvn,
      musicTitle: "提取音频",
      ...(t.extraSettings || {})
    }
  };
}

async function KEo(e) {
  var i;
  if (!e.generateId || !e.setNodes) throw new Error(PEo);
  const t = await qEo(e.blob, {
      sourceNodeId: e.sourceNode.id,
      fileName: e.fileName,
      spec: e.spec,
      extraSettings: {
        videoExtractAudioConfig: {
          startTime: e.startTime,
          endTime: e.endTime,
          duration: e.endTime - e.startTime,
          format: e.spec.ext
        },
        sourceNodeId: e.sourceNode.id
      }
    }),
    n = e.sourceNode.width ?? 300,
    r = e.generateId(),
    a = Ki(r, "input-image", (e.sourceNode.x ?? 0) + n + 24, e.sourceNode.y ?? 0, "提取音频", t.settings, e.nodes || []);
  return e.setNodes(o => [...o, {
    ...a,
    content: t.content,
    width: Lvn.width,
    height: Lvn.height,
    settings: {
      ...a.settings,
      ...t.settings,
      mediaType: "audio"
    }
  }]), (i = e.setSelectedNodeId) == null || i.call(e, r), r;
}

const QEo = ["开头", "全片", "末尾"],
  YEo = ["5秒", "15秒", "全部"],
  XEo = ["逐帧", "微调", "粗调"],
  zvn = .1;

function Pdt({
  options: e,
  value: t,
  disabled: n,
  onChange: r
}) {
  on();
  const a = g.useRef(null),
    i = g.useRef(null),
    [o, s] = g.useState(null),
    l = e.indexOf(t),
    d = l >= 0,
    u = o ?? Math.max(0, l),
    h = d || o != null ? Math.round(Math.min(e.length - 1, Math.max(0, u))) : -1,
    p = o != null,
    m = f => {
      const y = i.current;
      if (!y || f.pointerId !== y.pointerId) return;
      const b = a.current,
        v = y.moved ? Math.round(Math.min(e.length - 1, Math.max(0, y.origin + (f.clientX - y.startX) / y.segW))) : Math.min(e.length - 1, Math.max(0, Math.floor((f.clientX - ((b == null ? void 0 : b.getBoundingClientRect().left) ?? 0) - 3) / y.segW)));
      i.current = null, s(null), n || r(e[v]), b == null || b.addEventListener("click", _ => {
        _.preventDefault(), _.stopPropagation();
      }, {
        capture: !0,
        once: !0
      });
    };
  return c.jsxs("div", {
    ref: a,
    className: `relative flex min-w-0 flex-1 touch-none select-none items-center rounded-full bg-black/40 p-[3px] ${n ? "pointer-events-none opacity-50" : p ? "cursor-grabbing" : "cursor-grab"}`,
    onPointerDown: f => {
      if (n) return;
      const y = a.current;
      y && (i.current = {
        pointerId: f.pointerId,
        startX: f.clientX,
        origin: Math.max(0, l),
        segW: (y.clientWidth - 6) / e.length,
        moved: !1
      }, y.setPointerCapture(f.pointerId));
    },
    onPointerMove: f => {
      const y = i.current;
      if (!y || f.pointerId !== y.pointerId) return;
      const b = f.clientX - y.startX;
      !y.moved && Math.abs(b) < 5 || (y.moved = !0, s(Math.min(e.length - 1, Math.max(0, y.origin + b / y.segW))));
    },
    onPointerUp: m,
    onPointerCancel: m,
    children: [h >= 0 ? c.jsx("div", {
      className: "pointer-events-none absolute bottom-[3px] left-[3px] top-[3px] rounded-full bg-white/90 shadow-[0_1px_4px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-[8px]",
      style: {
        width: `calc((100% - 6px) / ${e.length})`,
        transform: `translateX(${u * 100}%)`,
        transition: p ? "none" : "transform 320ms cubic-bezier(0.32, 0.72, 0, 1)"
      }
    }) : null, e.map((f, y) => c.jsx("button", {
      type: "button",
      className: `relative z-10 flex h-7 flex-1 items-center justify-center whitespace-nowrap rounded-full px-1 text-[11px] font-medium leading-none transition-colors duration-200 ${y === h ? "text-zinc-900" : "text-white/50 hover:text-white/80"}`,
      onClick: () => !n && r(f),
      children: f
    }, f))]
  });
}

function Rdt({
  label: e,
  children: t
}) {
  return on(), c.jsxs("div", {
    className: "flex items-center gap-3",
    children: [c.jsx("div", {
      className: "w-[4.25rem] shrink-0 text-[11px] text-white/45",
      children: e
    }), t]
  });
}

function UW(e, t, n = .08) {
  return Math.abs(e - t) <= n;
}

function Uvn(e, t) {
  const n = bG(e);
  return t > 0 && UW(n, t, .05) ? "全部" : UW(n, 5) ? "5秒" : UW(n, 15) ? "15秒" : "";
}

function JEo(e, t) {
  return t > 0 ? UW(e.start, 0) && UW(e.end, t, .05) ? "全片" : UW(e.start, 0) ? "开头" : UW(e.end, t, .05) ? "末尾" : "" : "";
}

function ZEo(e) {
  return e === "粗调" ? zpe : e === "微调" ? H$t : V$t;
}

function eTo({
  open: e,
  videoUrl: t,
  sourceNode: n,
  nodes: r,
  generateId: a,
  setNodes: i,
  setSelectedNodeId: o,
  onClose: s
}) {
  on();
  const l = g.useRef(null),
    d = g.useRef(null),
    u = g.useRef(null),
    h = g.useRef(null),
    p = g.useRef(0),
    m = g.useRef(0),
    f = g.useRef({
      start: 0,
      end: 0
    }),
    y = g.useRef(0),
    b = g.useRef(null),
    [v, _] = g.useState({
      width: 0,
      height: 0,
      duration: 0
    }),
    [w, k] = g.useState({
      start: 0,
      end: 0
    }),
    [A, S] = g.useState(0),
    [C, I] = g.useState(!1),
    [E, M] = g.useState([]),
    [T, P] = g.useState(0),
    [R, j] = g.useState(null),
    [B, F] = g.useState(""),
    [N, G] = g.useState("逐帧"),
    [z, V] = g.useState(!1),
    [O, L] = g.useState(0),
    [D, U] = g.useState(""),
    H = v.duration,
    Y = Math.min(zvn, H || zvn),
    K = H > 0 ? H : 60,
    W = g.useMemo(() => ({
      ...w,
      total: H,
      minDuration: Y,
      maxDuration: K
    }), [w, H, Y, K]),
    Q = bG(w),
    q = g.useMemo(() => {
      const ge = Uvn(w, H);
      return ge === "5秒" ? Math.min(5, H || 5) : ge === "15秒" ? Math.min(15, H || 15) : ge === "全部" ? H || K : Q > 0 ? Q : H || K;
    }, [w, H, K, Q]),
    ne = H > 0 && MZe(Q, Y, K),
    de = Y$t(A, w),
    le = Q5(w.start, H),
    J = Q5(w.end, H),
    pe = Q5(A, H),
    ce = g.useMemo(() => q$t(H, T), [H, T]);
  f.current = w, y.current = A;
  const we = () => d.current,
    X = () => {
      const ge = we();
      ge == null || ge.pause(), I(!1), m.current && (cancelAnimationFrame(m.current), m.current = 0);
    },
    Z = ge => {
      const _e = we(),
        ke = Math.max(0, Math.min(ge, Math.max(0, (H || (_e == null ? void 0 : _e.duration) || 0) - .001)));
      S(ke), _e && Number.isFinite(ke) && (_e.currentTime = ke);
    },
    re = ge => {
      k({
        start: Math.max(0, ge.start),
        end: Math.max(ge.start, ge.end)
      });
    };
  g.useEffect(() => {
    e && (k({
      start: 0,
      end: 0
    }), S(0), I(!1), M([]), V(!1), L(0), U(""), _({
      width: 0,
      height: 0,
      duration: 0
    }), G("逐帧"));
  }, [e, t]), g.useEffect(() => {
    var _e;
    if (!e) return;
    const ge = (_e = l.current) == null ? void 0 : _e.parentElement;
    ge == null || ge.querySelectorAll("video").forEach(ke => {
      ke !== d.current && ke.pause();
    });
  }, [e]), g.useLayoutEffect(() => {
    const ge = u.current;
    if (!ge) return;
    const _e = () => P(ge.getBoundingClientRect().width);
    _e();
    const ke = new ResizeObserver(_e);
    return ke.observe(ge), () => ke.disconnect();
  }, [e]), g.useEffect(() => {
    if (!e || !t || !(H > 0) || !(T > 0) || !v.width || !v.height) return;
    const ge = ++p.current,
      _e = document.createElement("video");
    _e.muted = !0, _e.playsInline = !0, _e.preload = "auto", _e.crossOrigin = t.startsWith("http") ? "anonymous" : null, _e.src = t;
    let ke = !1;
    return (async () => {
      try {
        if (await new Promise((Me, Re) => {
          const $e = window.setTimeout(() => Re(new Error("timeout")), 8e3);
          _e.onloadedmetadata = () => {
            window.clearTimeout($e), Me();
          }, _e.onerror = () => {
            window.clearTimeout($e), Re(new Error("load error"));
          };
        }), ke || ge !== p.current) return;
        const Te = NZe(T, v.width / v.height),
          Ne = jZe(v.width, v.height),
          me = document.createElement("canvas");
        me.width = Ne.width, me.height = Ne.height;
        const Ae = me.getContext("2d");
        if (!Ae) return;
        const Fe = DZe(Te, H);
        for (let Me = 0; Me < Fe.length; Me++) {
          if (ke || ge !== p.current || (await new Promise(($e, rt) => {
            const nt = window.setTimeout(() => rt(new Error("seek timeout")), 3e3);
            _e.onseeked = () => {
              window.clearTimeout(nt), $e();
            }, _e.onerror = () => {
              window.clearTimeout(nt), rt(new Error("seek error"));
            }, _e.currentTime = Fe[Me];
          }), ke || ge !== p.current)) return;
          Ae.drawImage(_e, 0, 0, me.width, me.height);
          const Re = me.toDataURL("image/jpeg", .6);
          M($e => Me === 0 ? [Re] : [...$e, Re]);
        }
      } catch {
        ge === p.current && M([]);
      } finally {
        _e.removeAttribute("src"), _e.load(), _e.remove();
      }
    })(), () => {
      ke = !0, p.current += 1;
    };
  }, [e, t, H, T, v.width, v.height]);
  const fe = () => {
      m.current && (cancelAnimationFrame(m.current), m.current = 0);
    },
    ye = () => {
      fe();
      const ge = () => {
        const _e = we();
        if (!_e || _e.paused) {
          I(!1), m.current = 0;
          return;
        }
        const ke = _e.currentTime,
          ve = f.current;
        S(ke), ke >= ve.end - .01 && (_e.currentTime = ve.start, S(ve.start)), m.current = requestAnimationFrame(ge);
      };
      m.current = requestAnimationFrame(ge);
    },
    ie = () => {
      const ge = we();
      if (!ge || z) return;
      if (!ge.paused) {
        X();
        return;
      }
      const _e = f.current,
        ke = y.current;
      (A$(ge) || H) > 0 && (ke < _e.start || ke >= _e.end - .01) && (ge.currentTime = _e.start, S(_e.start)), ge.muted = !1, ge.volume = 1, ge.playsInline = !0, ge.play().then(() => {
        I(!0), ye();
      }).catch(() => {
        ge.muted = !1, ge.play().then(() => {
          I(!0), ye();
        }).catch(() => {
          I(!1);
        });
      });
    };
  g.useEffect(() => () => fe(), []), g.useEffect(() => {
    if (!e) return;
    const ge = _e => {
      const ke = _e.target;
      if (ke && (ke.tagName === "INPUT" || ke.tagName === "TEXTAREA" || ke.isContentEditable)) {
        _e.key === "Escape" && ke.blur();
        return;
      }
      if (_e.metaKey || _e.ctrlKey || _e.altKey) return;
      let ve = !0;
      const Te = _e.shiftKey ? zpe : ZEo(N),
        Ne = f.current,
        me = y.current,
        Ae = {
          ...W,
          ...Ne
        };
      switch (_e.code) {
        case "Space":
          ie();
          break;
        case "ArrowLeft":
        case "Comma":
          Z(me - Te);
          break;
        case "ArrowRight":
        case "Period":
          Z(me + Te);
          break;
        case "BracketLeft":
        case "KeyI":
          re(S$(me, Ae));
          break;
        case "BracketRight":
        case "KeyO":
          re(I$(me, Ae));
          break;
        case "Home":
          Z(Ne.start);
          break;
        case "End":
          Z(Ne.end);
          break;
        case "Escape":
          z || s();
          break;
        case "Enter":
          !_e.isComposing && ne && !z && xe();
          break;
        default:
          ve = !1;
      }
      ve && (_e.preventDefault(), _e.stopPropagation());
    };
    return document.addEventListener("keydown", ge, !0), () => document.removeEventListener("keydown", ge, !0);
  }, [e, W.total, W.minDuration, W.maxDuration, N, ne, z]);
  const ae = (ge, _e) => {
      if (z || _e.button !== 0 || !(H > 0)) return;
      _e.preventDefault(), _e.stopPropagation(), b.current = {
        mode: ge,
        startX: _e.clientX,
        originStart: w.start,
        originEnd: w.end,
        activated: ge !== "move"
      }, F(ge), ge !== "move" && X();
      const ke = Te => {
          const Ne = b.current,
            me = u.current;
          if (!Ne || !me) return;
          const Ae = me.getBoundingClientRect();
          if (Ne.mode === "move" && !Ne.activated) {
            if (Math.abs(Te.clientX - Ne.startX) < EZe) return;
            Ne.activated = !0, X();
          }
          if (Ne.mode === "scrub" || Ne.mode === "start" || Ne.mode === "end") {
            let $e = (Te.clientX - Ae.left) / Ae.width * H;
            Ne.mode !== "scrub" && ($e = PZe($e, Ae.width, H, [A, 0, H], Te.altKey)), Ne.mode === "scrub" ? Z($e) : Ne.mode === "start" ? re(S$($e, {
              ...W,
              start: Ne.originStart,
              end: Ne.originEnd
            })) : re(I$($e, {
              ...W,
              start: Ne.originStart,
              end: Ne.originEnd
            }));
            return;
          }
          const Fe = Ne.originEnd - Ne.originStart,
            Me = RZe(Te.clientX - Ne.startX, Ae.width, H),
            Re = Math.max(0, Math.min(Ne.originStart + Me, H - Fe));
          re({
            start: Re,
            end: Re + Fe
          });
        },
        ve = Te => {
          const Ne = b.current,
            me = u.current;
          if ((Ne == null ? void 0 : Ne.mode) === "move" && !Ne.activated && me) {
            const Ae = me.getBoundingClientRect();
            Z((Ne.startX - Ae.left) / Ae.width * H);
          }
          b.current = null, F(""), window.removeEventListener("pointermove", ke), window.removeEventListener("pointerup", ve), window.removeEventListener("pointercancel", ve);
        };
      window.addEventListener("pointermove", ke), window.addEventListener("pointerup", ve), window.addEventListener("pointercancel", ve);
    },
    be = ge => {
      if (!(H > 0)) return;
      const _e = {
        ...W,
        maxDuration: q || H
      };
      re(ge === "开头" ? K$t(_e) : ge === "末尾" ? Q$t(_e) : {
        start: 0,
        end: H
      }), Z(ge === "末尾" ? Math.max(0, H - (q || H)) : 0);
    },
    Ee = ge => {
      if (H > 0) {
        if (ge === "全部") {
          re({
            start: 0,
            end: H
          });
          return;
        }
        re(TZe(ge === "5秒" ? 5 : 15, W));
      }
    },
    xe = async () => {
      var _e;
      if (z) {
        (_e = h.current) == null || _e.abort();
        return;
      }
      if (!t || !a || !i || !ne) {
        Ai("error", a && i ? "请先框出有效区间" : "无法创建节点");
        return;
      }
      X();
      const ge = new AbortController();
      h.current = ge, V(!0), L(0), U("正在准备...");
      try {
        const ke = f.current,
          ve = await WEo({
            videoUrl: t,
            sourceNode: n,
            start: ke.start,
            end: ke.end,
            signal: ge.signal,
            onProgress: ({
              percent: Te,
              text: Ne
            }) => {
              L(me => Math.max(me, Te)), U(Ne);
            }
          });
        await KEo({
          blob: ve.blob,
          spec: ve.spec,
          fileName: ve.fileName,
          sourceNode: n,
          startTime: ke.start,
          endTime: ke.end,
          nodes: r,
          generateId: a,
          setNodes: i,
          setSelectedNodeId: o
        }), Ai("success", jEo), s();
      } catch (ke) {
        const ve = !!(ke != null && ke.cancelled);
        Ai(ve ? "info" : "error", ve ? "已取消提取音频" : ke instanceof Error ? ke.message : "提取音频失败");
      } finally {
        h.current = null, V(!1);
      }
    };
  if (!e) return null;
  const he = R == null || !(H > 0) ? "" : Om(R / 100 * H),
    ue = B === "start" ? Om(w.start) : B === "end" ? Om(w.end) : "";
  return c.jsxs(c.Fragment, {
    children: [c.jsxs("div", {
      ref: l,
      className: "nodrag nowheel pointer-events-auto absolute inset-0 z-40 overflow-hidden rounded-2xl",
      onPointerDown: ge => ge.stopPropagation(),
      onMouseDown: ge => ge.stopPropagation(),
      onClick: ge => {
        ge.stopPropagation(), z || ie();
      },
      children: [c.jsx("video", {
        ref: d,
        src: t,
        playsInline: !0,
        preload: "auto",
        crossOrigin: t.startsWith("http") ? "anonymous" : void 0,
        className: "pointer-events-none absolute inset-0 h-full w-full object-contain",
        onLoadedMetadata: ge => {
          const _e = ge.currentTarget,
            ke = A$(_e);
          _({
            width: _e.videoWidth || 0,
            height: _e.videoHeight || 0,
            duration: ke
          }), k(ve => ve.end > .02 ? ve : {
            start: 0,
            end: ke
          });
        },
        onPlay: () => {
          I(!0), ye();
        },
        onPause: () => {
          I(!1), fe();
        }
      }), c.jsxs("div", {
        className: "pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-1 rounded-md bg-black/55 px-1.5 py-0.5 text-[10px] tabular-nums text-white/90",
        children: [c.jsx("span", {
          children: Om(A)
        }), de ? c.jsx("span", {
          className: "text-white/45",
          children: x("区间外")
        }) : null]
      }), !C && !z ? c.jsx("span", {
        className: "pointer-events-none absolute inset-0 flex items-center justify-center",
        children: c.jsx("span", {
          className: "flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#111] shadow-[0_8px_24px_rgba(0,0,0,0.35)]",
          children: c.jsx("svg", {
            viewBox: "0 0 24 24",
            width: "22",
            height: "22",
            fill: "currentColor",
            children: c.jsx("path", {
              d: "M8 5v14l11-7z"
            })
          })
        })
      }) : null]
    }), c.jsx("div", {
      className: "absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2",
      style: {
        pointerEvents: "auto"
      },
      onClick: ge => ge.stopPropagation(),
      onPointerDown: ge => ge.stopPropagation(),
      children: c.jsxs(OT, {
        title: x("提取音频"),
        testId: "video-extract-audio-panel",
        dataAttr: "data-video-extract-audio-panel",
        width: 436,
        generatePlacement: "footer",
        bodyClassName: "px-4 pb-3",
        onClose: z ? void 0 : s,
        onGenerate: () => void xe(),
        generateTitle: z ? "停止提取" : "确认提取",
        footer: z ? c.jsxs("div", {
          className: "flex min-w-0 flex-1 items-center gap-2",
          children: [c.jsxs("div", {
            className: "min-w-0 flex-1",
            children: [c.jsx("div", {
              className: "truncate text-[11px] text-white/45",
              children: D || x("正在准备...")
            }), c.jsx("div", {
              className: "mt-1 h-1 overflow-hidden rounded-full bg-white/10",
              children: c.jsx("div", {
                className: "h-full rounded-full bg-white/80 transition-[width] duration-300",
                style: {
                  width: `${O}%`
                }
              })
            })]
          }), c.jsxs("span", {
            className: "tabular-nums text-[11px] text-white/55",
            children: [O, "%"]
          })]
        }) : c.jsx("div", {
          className: "truncate text-center text-[11px] tabular-nums text-white/30",
          children: H > 0 ? `${Om(w.start)} → ${Om(w.end)} · ${W$t(Q)}` : x("拖动入点 / 出点确定提取区间")
        }),
        children: [c.jsxs("div", {
          className: `mb-3 ${z ? "pointer-events-none opacity-60" : ""}`,
          children: [c.jsx("div", {
            className: "relative mb-1 h-3.5",
            children: ce.map(ge => c.jsx("span", {
              className: "absolute bottom-0 w-px bg-white/25",
              style: {
                left: `${ge.left}%`,
                height: ge.major ? 7 : 4,
                background: ge.major ? "rgba(255,255,255,0.4)" : void 0
              },
              children: ge.label ? c.jsx("span", {
                className: "absolute bottom-2 left-0.5 whitespace-nowrap text-[9px] tabular-nums text-white/45",
                children: x(ge.label)
              }) : null
            }, ge.key))
          }), c.jsxs("div", {
            ref: u,
            className: `relative h-14 overflow-hidden rounded-[10px] bg-black/35 ${B ? "cursor-ew-resize" : "cursor-crosshair"}`,
            onPointerDown: ge => {
              ge.target.closest("[data-trim-handle], [data-trim-selection], [data-trim-playhead]") || ae("scrub", ge);
            },
            onPointerMove: ge => {
              var ke;
              const _e = (ke = u.current) == null ? void 0 : ke.getBoundingClientRect();
              !_e || B || j((ge.clientX - _e.left) / _e.width * 100);
            },
            onPointerLeave: () => j(null),
            children: [c.jsx("div", {
              className: "pointer-events-none absolute inset-0 flex overflow-hidden",
              children: E.length ? E.map((ge, _e) => c.jsx("img", {
                src: ge,
                alt: "",
                className: "h-full min-w-0 flex-1 object-cover"
              }, `${ge}-${_e}`)) : c.jsx("div", {
                className: "h-full w-full bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.06)_0_12px,rgba(255,255,255,0.02)_12px_24px)]"
              })
            }), c.jsx("div", {
              className: "pointer-events-none absolute inset-y-0 left-0 bg-black/55",
              style: {
                width: `${le}%`
              }
            }), c.jsx("div", {
              className: "pointer-events-none absolute inset-y-0 right-0 bg-black/55",
              style: {
                width: `${100 - J}%`
              }
            }), c.jsxs("div", {
              "data-trim-selection": "",
              className: `absolute inset-y-0 z-[2] ${B === "move" ? "cursor-grabbing" : "cursor-grab"}`,
              style: {
                left: `${le}%`,
                width: `${Math.max(0, J - le)}%`,
                boxShadow: ne ? "inset 0 2px #fff, inset 0 -2px #fff" : "inset 0 2px 0 rgba(248,113,113,0.85), inset 0 -2px 0 rgba(248,113,113,0.85)"
              },
              onPointerDown: ge => ae("move", ge),
              children: [c.jsx("div", {
                "data-trim-handle": "start",
                className: "absolute bottom-0 top-0 z-10 flex w-3.5 -translate-x-1/2 items-center justify-center rounded-l-[7px] bg-white",
                style: {
                  left: 0
                },
                onPointerDown: ge => ae("start", ge),
                children: c.jsx("span", {
                  className: "h-4 w-0.5 rounded-sm bg-black/35"
                })
              }), c.jsx("div", {
                "data-trim-handle": "end",
                className: "absolute bottom-0 top-0 z-10 flex w-3.5 translate-x-1/2 items-center justify-center rounded-r-[7px] bg-white",
                style: {
                  right: 0
                },
                onPointerDown: ge => ae("end", ge),
                children: c.jsx("span", {
                  className: "h-4 w-0.5 rounded-sm bg-black/35"
                })
              })]
            }), R != null && !B ? c.jsx("div", {
              className: "pointer-events-none absolute inset-y-0 z-[8] w-px bg-white/45",
              style: {
                left: `${R}%`
              },
              children: c.jsx("span", {
                className: "absolute -top-5 left-1/2 -translate-x-1/2 rounded bg-black/85 px-1.5 py-0.5 text-[10px] tabular-nums text-white",
                children: he
              })
            }) : null, ue ? c.jsx("div", {
              className: "pointer-events-none absolute -top-5 z-20 -translate-x-1/2 rounded bg-black/85 px-1.5 py-0.5 text-[10px] tabular-nums text-white",
              style: {
                left: `${B === "start" ? le : J}%`
              },
              children: ue
            }) : null, c.jsx("div", {
              "data-trim-playhead": "",
              className: "pointer-events-none absolute bottom-0 top-[-10px] z-20 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_4px_rgba(0,0,0,0.4)]",
              style: {
                left: `${pe}%`
              },
              children: c.jsx("div", {
                className: "pointer-events-auto absolute -top-0.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-[3px] bg-white",
                style: {
                  cursor: "ew-resize"
                },
                onPointerDown: ge => ae("scrub", ge)
              })
            })]
          })]
        }), c.jsxs("div", {
          className: "flex flex-col gap-2",
          children: [c.jsx(Rdt, {
            label: x("快捷定位"),
            children: c.jsx(Pdt, {
              options: QEo,
              value: JEo(w, H),
              disabled: z || !(H > 0),
              onChange: be
            })
          }), c.jsx(Rdt, {
            label: x("保留时长"),
            children: c.jsx(Pdt, {
              options: YEo,
              value: Uvn(w, H),
              disabled: z || !(H > 0),
              onChange: Ee
            })
          }), c.jsx(Rdt, {
            label: x("步进精度"),
            children: c.jsx(Pdt, {
              options: XEo,
              value: N,
              disabled: z,
              onChange: ge => G(ge)
            })
          })]
        })]
      })
    })]
  });
}

const tTo = Object.freeze(Object.defineProperty({
  __proto__: null,
  VideoExtractAudioHost: eTo
}, Symbol.toStringTag, {
  value: "Module"
}));

function kwe(e) {
  if (e != null && e.aborted) {
    const t = new Error("已取消视频压缩");
    throw t.cancelled = !0, t;
  }
}

function $vn(e) {
  return new Promise(t => {
    window.setTimeout(t, e);
  });
}

function nTo() {
  if (typeof window > "u") return !1;
  const e = window;
  return !!(e.__TAURI__ || e.__TAURI_INTERNALS__);
}

function Gvn(e, t) {
  const n = e.includes("\\") ? "\\" : "/";
  return `${e.replace(/[\\/]+$/, "")}${n}${t}`;
}

function rTo() {
  const e = ["video/mp4;codecs=avc1.42E01E", "video/mp4"],
    t = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"];
  for (const n of e) if (typeof MediaRecorder < "u" && MediaRecorder.isTypeSupported(n)) return {
    mime: n,
    ext: "mp4"
  };
  for (const n of t) if (typeof MediaRecorder < "u" && MediaRecorder.isTypeSupported(n)) return {
    mime: n,
    ext: "webm"
  };
  return {
    mime: "",
    ext: "webm"
  };
}

function aTo(e, t) {
  return new Promise((n, r) => {
    const a = Number.isFinite(e.duration) ? Math.max(0, Math.min(t, Math.max(0, e.duration - .001))) : Math.max(0, t),
      i = () => {
        e.removeEventListener("seeked", i), e.removeEventListener("error", o), n();
      },
      o = () => {
        var s;
        e.removeEventListener("seeked", i), e.removeEventListener("error", o), r(new Error(((s = e.error) == null ? void 0 : s.message) || "视频解码失败"));
      };
    if (e.addEventListener("seeked", i), e.addEventListener("error", o), Math.abs(e.currentTime - a) < 8e-4) {
      e.removeEventListener("seeked", i), e.removeEventListener("error", o), n();
      return;
    }
    e.currentTime = a;
  });
}

async function iTo(e) {
  const t = document.createElement("video");
  return t.muted = !0, t.playsInline = !0, t.preload = "auto", t.crossOrigin = e.startsWith("http") ? "anonymous" : null, await new Promise((n, r) => {
    const a = () => {
      if (!t.videoWidth) {
        r(new Error("当前浏览器无法解码该视频画面（可能是 HEVC 编码），无法压缩"));
        return;
      }
      n();
    };
    t.onloadedmetadata = a, t.onerror = () => {
      r(new Error("当前浏览器无法解码该视频画面（可能是 HEVC 编码），无法压缩"));
    }, t.src = e;
  }), t;
}

async function oTo(e) {
  if (!e) return null;
  const t = e.settings || {},
    n = typeof t._localCacheAssetId == "string" && t._localCacheAssetId.trim() || typeof t._contentAssetId == "string" && t._contentAssetId.trim() || typeof t._assetId == "string" && t._assetId.trim() || "";
  if (!n) return null;
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
    return await r.ensureRestored(), (await r.getAssetSourcePath(n)) || null;
  } catch {
    return null;
  }
}

async function sTo(e) {
  var t, n, r, a;
  if (!nTo()) return null;
  try {
    const {
        invoke: i
      } = await Ie(async () => {
        const {
          invoke: f
        } = await Promise.resolve().then(() => sd);
        return {
          invoke: f
        };
      }, void 0, import.meta.url),
      {
        readFileAsBlob: o,
        writeBlobToFile: s
      } = await Ie(async () => {
        const {
          readFileAsBlob: f,
          writeBlobToFile: y
        } = await Promise.resolve().then(() => hg);
        return {
          readFileAsBlob: f,
          writeBlobToFile: y
        };
      }, void 0, import.meta.url);
    (t = e.onProgress) == null || t.call(e, {
      percent: 10,
      text: "正在准备视频压缩..."
    });
    const l = await oTo(e.sourceNode),
      d = await i("get_export_temp_dir"),
      u = Gvn(d, `compressed_${Date.now()}.mp4`);
    let h = l || "",
      p = !1;
    if (!h) if (/^file:/i.test(e.url) || /^[A-Za-z]:[\\/]/.test(e.url) || e.url.startsWith("\\\\")) h = e.url;else {
      (n = e.onProgress) == null || n.call(e, {
        percent: 16,
        text: "正在下载源视频..."
      });
      const y = await fetch(e.url);
      if (!y.ok) throw new Error(`源视频下载失败 (${y.status})`);
      const b = await y.blob();
      kwe(e.signal), h = Gvn(d, `compress_src_${Date.now()}.mp4`), await s(h, b), p = !0;
    }
    kwe(e.signal), (r = e.onProgress) == null || r.call(e, {
      percent: 28,
      text: "正在压缩视频..."
    }), await i("ffmpeg_compress_video", {
      args: {
        input: h,
        outputPath: u,
        width: e.width,
        height: e.height,
        fps: e.fps ?? void 0
      }
    }), kwe(e.signal), (a = e.onProgress) == null || a.call(e, {
      percent: 88,
      text: "正在读取压缩结果..."
    });
    const m = await o(u);
    if (p) try {
      const {
        remove: f
      } = await Ie(async () => {
        const {
          remove: y
        } = await Promise.resolve().then(() => oc);
        return {
          remove: y
        };
      }, void 0, import.meta.url);
      await f(h);
    } catch {}
    try {
      const {
        remove: f
      } = await Ie(async () => {
        const {
          remove: y
        } = await Promise.resolve().then(() => oc);
        return {
          remove: y
        };
      }, void 0, import.meta.url);
      await f(u);
    } catch {}
    return m.size ? {
      blob: m,
      fileName: "compressed_video.mp4"
    } : null;
  } catch (i) {
    return console.warn("[videoCompress] FFmpeg 压缩不可用，回退浏览器编码:", i), null;
  }
}

async function lTo(e) {
  var n, r;
  const t = await iTo(e.url);
  try {
    kwe(e.signal);
    const a = Number.isFinite(t.duration) ? t.duration : 0,
      i = e.fps && e.fps > 0 ? e.fps : 24,
      o = Math.max(1, Math.round(Math.max(.02, a) * i)),
      {
        mime: s,
        ext: l
      } = rTo(),
      d = e.width,
      u = e.height,
      h = document.createElement("canvas");
    h.width = d, h.height = u;
    const p = h.getContext("2d");
    if (!p) throw new Error("无法创建画布");
    p.imageSmoothingEnabled = !0, p.imageSmoothingQuality = "high";
    const m = h.captureStream(i),
      f = m.getVideoTracks()[0],
      y = [],
      b = typeof MediaRecorder < "u" && s ? new MediaRecorder(m, {
        mimeType: s,
        videoBitsPerSecond: 25e5
      }) : null;
    if (!b) throw new Error("当前浏览器无法编码压缩视频");
    b.ondataavailable = S => {
      var C;
      (C = S.data) != null && C.size && y.push(S.data);
    };
    const v = new Promise((S, C) => {
      b.onstop = () => S(), b.onerror = () => C(new Error("视频压缩编码失败"));
    });
    b.start();
    const _ = performance.now(),
      w = Math.max(1e3 / i, a * 1e3);
    for (let S = 0; S < o; S++) {
      kwe(e.signal);
      const C = o <= 1 ? 0 : S / Math.max(1, o - 1) * Math.max(0, a - .001);
      await aTo(t, C), p.drawImage(t, 0, 0, d, u), (n = f == null ? void 0 : f.requestFrame) == null || n.call(f);
      const E = _ + (S + 1) / o * w - performance.now();
      E > 1 && (await $vn(E)), (r = e.onProgress) == null || r.call(e, {
        percent: Math.round(12 + (S + 1) / o * 78),
        text: `正在压缩视频... ${S + 1}/${o}`
      });
    }
    const k = _ + w - performance.now();
    k > 1 && (await $vn(k)), b.stop(), await v;
    const A = new Blob(y, {
      type: b.mimeType || s || "video/webm"
    });
    if (!A.size) throw new Error("压缩结果为空");
    return {
      blob: A,
      fileName: `compressed_video.${l}`,
      width: d,
      height: u
    };
  } finally {
    t.removeAttribute("src"), t.load(), t.remove();
  }
}

async function cTo(e) {
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
    const s = await sTo({
      url: n,
      sourceNode: e.sourceNode,
      width: e.width,
      height: e.height,
      fps: e.fps,
      signal: e.signal,
      onProgress: e.onProgress
    });
    if (s) return (i = e.onProgress) == null || i.call(e, {
      percent: 94,
      text: "正在保存压缩视频..."
    }), {
      blob: s.blob,
      width: e.width,
      height: e.height,
      fileName: s.fileName
    };
    const l = await lTo({
      url: n,
      width: e.width,
      height: e.height,
      fps: e.fps,
      signal: e.signal,
      onProgress: e.onProgress
    });
    return (o = e.onProgress) == null || o.call(e, {
      percent: 94,
      text: "正在保存压缩视频..."
    }), l;
  } finally {
    r == null || r();
  }
}

async function dTo(e) {
  const t = await Ope(e.blob, {
    sourceNodeId: e.sourceNode.id,
    width: e.width,
    height: e.height,
    fileName: e.fileName,
    source: "video_compress",
    assetPrefix: "video_compress",
    extraSettings: {
      videoCompressConfig: {
        preset: e.presetKey,
        width: e.width,
        height: e.height,
        fps: e.fps
      },
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
    nodeName: `压缩 ${e.width}×${e.height}`
  });
}

const lGe = 2086876,
  Ndt = "fit",
  ADe = "keep",
  uTo = .05,
  hTo = 1.02,
  txr = [{
    key: "fit",
    label: "智能适配",
    recommended: !0
  }, {
    key: "1080",
    label: "1080P",
    short: 1080
  }, {
    key: "720",
    label: "720P",
    short: 720
  }, {
    key: "540",
    label: "540P",
    short: 540,
    minPixels: 409600
  }, {
    key: "480",
    label: "480P",
    short: 480
  }, {
    key: "360",
    label: "360P",
    short: 360
  }],
  nxr = [{
    key: "keep",
    label: "原帧率"
  }, {
    key: "30",
    fps: 30,
    label: "30fps"
  }, {
    key: "24",
    fps: 24,
    label: "24fps"
  }, {
    key: "15",
    fps: 15,
    label: "15fps"
  }],
  Vvn = ["智能适配", "1080P", "720P"],
  Hvn = ["540P", "480P", "360P"],
  Wvn = ["原帧率", "30fps", "24fps", "15fps"];

function lae(e) {
  return Math.max(2, Math.floor(e / 2) * 2);
}

function pTo(e, t) {
  if (e * t <= lGe) return {
    width: lae(e),
    height: lae(t)
  };
  const n = Math.sqrt(lGe / (e * t));
  return {
    width: lae(e * n),
    height: lae(t * n)
  };
}

function mTo(e, t) {
  const n = t.width,
    r = t.height;
  if (!n || !r) return null;
  let a = n,
    i = r;
  if (e != null && e.short) {
    let d = Math.min(e.short / Math.min(n, r), 1);
    if (e.minPixels) {
      const u = Math.sqrt(e.minPixels / (n * r)) * hTo;
      d = Math.min(Math.max(d, u), 1);
    }
    a = n * d, i = r * d;
  }
  const o = pTo(a, i),
    s = o.width * o.height,
    l = Math.max(1, Math.round(s / (n * r) * 100));
  return {
    width: o.width,
    height: o.height,
    pixels: s,
    percent: l
  };
}

function U3t(e, t) {
  return t ? e != null && e.recommended ? !1 : ((e == null ? void 0 : e.short) ?? 0) >= t : !0;
}

function $3t(e, t) {
  return !(e != null && e.fps) || !t ? !1 : e.fps >= t - uTo;
}

function fTo(e, t) {
  const n = nxr.find(r => r.key === e);
  return !n || !n.fps || $3t(n, t) ? null : n.fps;
}

function gTo(e) {
  return Math.round(e * 100) / 100;
}

function yTo(e) {
  return e ? `${(e / 1e4).toFixed(0)} 万像素` : "0 像素";
}

function rxr(e) {
  return Number.isInteger(e) ? String(e) : e.toFixed(2);
}

function axr(e) {
  return e > lGe;
}

function YPe(e) {
  return txr.find(t => t.label === e);
}

function jdt(e) {
  var t;
  return ((t = nxr.find(n => n.label === e)) == null ? void 0 : t.key) || ADe;
}

function bTo(e, t) {
  if (!t || !e.width || !e.height) return "";
  const n = e.width * e.height;
  return axr(n) && t.width * t.height <= lGe ? "超出像素上限，将自动收缩" : t.width === lae(e.width) && t.height === lae(e.height) ? "源视频已是该分辨率" : "已压缩至上限内";
}

function vTo(e) {
  const {
      source: t,
      sourceFps: n,
      presetKey: r,
      fpsKey: a
    } = e,
    i = t.width * t.height,
    o = t.width && t.height ? Math.min(t.width, t.height) : 0,
    s = txr.find(h => h.key === r) || null,
    l = s ? U3t(s, o) : !0,
    d = s && !l ? mTo(s, t) : null,
    u = fTo(a, n);
  return {
    sourcePixels: i,
    sourceMinSide: o,
    sourcePixelsLabel: yTo(i),
    sourceFpsLabel: n ? `${rxr(n)} fps` : "",
    exceedsLimit: axr(i),
    preset: s,
    presetDisabled: l,
    plan: d,
    fps: u,
    canConfirm: !!d,
    chip: bTo(t, d)
  };
}

function Ddt({
  options: e,
  value: t,
  disabled: n,
  disabledOf: r,
  onChange: a
}) {
  on();
  const i = g.useRef(null),
    o = g.useRef(null),
    [s, l] = g.useState(null),
    d = e.indexOf(t),
    u = d >= 0,
    h = s ?? Math.max(0, d),
    p = u || s != null ? Math.round(Math.min(e.length - 1, Math.max(0, h))) : -1,
    m = s != null,
    f = b => {
      n || r != null && r(b) || a(b);
    },
    y = b => {
      const v = o.current;
      if (!v || b.pointerId !== v.pointerId) return;
      const _ = i.current,
        w = v.moved ? Math.round(Math.min(e.length - 1, Math.max(0, v.origin + (b.clientX - v.startX) / v.segW))) : Math.min(e.length - 1, Math.max(0, Math.floor((b.clientX - ((_ == null ? void 0 : _.getBoundingClientRect().left) ?? 0) - 3) / v.segW)));
      o.current = null, l(null), f(e[w]), _ == null || _.addEventListener("click", k => {
        k.preventDefault(), k.stopPropagation();
      }, {
        capture: !0,
        once: !0
      });
    };
  return c.jsxs("div", {
    ref: i,
    className: `relative flex min-w-0 flex-1 touch-none select-none items-center rounded-full bg-black/40 p-[3px] ${n ? "pointer-events-none opacity-50" : m ? "cursor-grabbing" : "cursor-grab"}`,
    onPointerDown: b => {
      if (n) return;
      const v = i.current;
      v && (o.current = {
        pointerId: b.pointerId,
        startX: b.clientX,
        origin: Math.max(0, d),
        segW: (v.clientWidth - 6) / e.length,
        moved: !1
      }, v.setPointerCapture(b.pointerId));
    },
    onPointerMove: b => {
      const v = o.current;
      if (!v || b.pointerId !== v.pointerId) return;
      const _ = b.clientX - v.startX;
      !v.moved && Math.abs(_) < 5 || (v.moved = !0, l(Math.min(e.length - 1, Math.max(0, v.origin + _ / v.segW))));
    },
    onPointerUp: y,
    onPointerCancel: y,
    children: [p >= 0 ? c.jsx("div", {
      className: "pointer-events-none absolute bottom-[3px] left-[3px] top-[3px] rounded-full bg-white/90 shadow-[0_1px_4px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-[8px]",
      style: {
        width: `calc((100% - 6px) / ${e.length})`,
        transform: `translateX(${h * 100}%)`,
        transition: m ? "none" : "transform 320ms cubic-bezier(0.32, 0.72, 0, 1)"
      }
    }) : null, e.map((b, v) => {
      const _ = !!(r != null && r(b));
      return c.jsx("button", {
        type: "button",
        disabled: _,
        className: `relative z-10 flex h-7 flex-1 items-center justify-center whitespace-nowrap rounded-full px-1 text-[11px] font-medium leading-none transition-colors duration-200 ${v === p ? "text-zinc-900" : _ ? "text-white/20" : "text-white/50 hover:text-white/80"}`,
        onClick: () => f(b),
        children: b
      }, b);
    })]
  });
}

function Ldt({
  label: e,
  children: t
}) {
  return on(), c.jsxs("div", {
    className: "flex items-center gap-3",
    children: [c.jsx("div", {
      className: "w-[4.25rem] shrink-0 text-[11px] text-white/45",
      children: e
    }), t]
  });
}

async function wTo(e) {
  var n;
  const t = (n = e.requestVideoFrameCallback) == null ? void 0 : n.bind(e);
  return t ? new Promise(r => {
    const a = [];
    let i = !1;
    const o = () => {
        if (i) return;
        if (i = !0, a.length < 3) {
          r(0);
          return;
        }
        const l = [];
        for (let d = 1; d < a.length; d++) {
          const u = a[d] - a[d - 1];
          u > .001 && l.push(u);
        }
        if (!l.length) {
          r(0);
          return;
        }
        l.sort((d, u) => d - u), r(gTo(1 / l[Math.floor(l.length / 2)]));
      },
      s = (l, d) => {
        if (a.push(d.mediaTime), a.length >= 12 || a[a.length - 1] - a[0] > .5) {
          o();
          return;
        }
        t(s);
      };
    t(s), window.setTimeout(o, 900);
  }) : 0;
}

function xTo({
  open: e,
  videoUrl: t,
  sourceNode: n,
  nodes: r,
  generateId: a,
  setNodes: i,
  setSelectedNodeId: o,
  onClose: s
}) {
  var N, G, z, V;
  on();
  const l = g.useRef(null),
    d = g.useRef(null),
    u = g.useRef(!1),
    [h, p] = g.useState(!1),
    [m, f] = g.useState(!1),
    [y, b] = g.useState(0),
    [v, _] = g.useState(""),
    [w, k] = g.useState(Ndt),
    [A, S] = g.useState(ADe),
    [C, I] = g.useState({
      width: 0,
      height: 0
    }),
    [E, M] = g.useState(0),
    T = g.useMemo(() => vTo({
      source: C,
      sourceFps: E,
      presetKey: w,
      fpsKey: A
    }), [C, E, w, A]);
  g.useEffect(() => {
    var O;
    e || ((O = d.current) == null || O.abort(), d.current = null, f(!1), p(!1), b(0), _(""), k(Ndt), S(ADe), I({
      width: 0,
      height: 0
    }), M(0));
  }, [e]), g.useEffect(() => {
    if (!e) return;
    const O = l.current;
    O && (O.pause(), p(!1));
  }, [e, t]), g.useEffect(() => {
    T.presetDisabled && k(Ndt);
  }, [T.presetDisabled, w]), g.useEffect(() => {
    const O = {
      fps: A === "keep" ? void 0 : Number(A)
    };
    $3t(O, E) && S(ADe);
  }, [A, E]);
  const P = () => {
      const O = l.current;
      !O || m || (O.paused ? O.play() : O.pause());
    },
    R = async () => {
      var L, D;
      if (m) {
        (L = d.current) == null || L.abort();
        return;
      }
      if (!T.plan || !a || !i) {
        Ai("error", T.plan ? "无法创建节点" : "请选择有效的压缩分辨率");
        return;
      }
      (D = l.current) == null || D.pause();
      const O = new AbortController();
      d.current = O, f(!0), b(0), _("正在准备...");
      try {
        const U = await cTo({
          videoUrl: t,
          sourceNode: n,
          width: T.plan.width,
          height: T.plan.height,
          fps: T.fps,
          signal: O.signal,
          onProgress: ({
            percent: H,
            text: Y
          }) => {
            b(K => Math.max(K, H)), _(Y);
          }
        });
        await dTo({
          blob: U.blob,
          fileName: U.fileName,
          width: U.width || T.plan.width,
          height: U.height || T.plan.height,
          sourceNode: n,
          presetKey: w,
          fps: T.fps,
          nodes: r,
          generateId: a,
          setNodes: i,
          setSelectedNodeId: o
        }), Ai("success", "视频压缩成功，已添加为新节点"), s();
      } catch (U) {
        const H = !!(U != null && U.cancelled);
        Ai(H ? "info" : "error", H ? "已取消视频压缩" : U instanceof Error ? U.message : "视频压缩失败");
      } finally {
        d.current = null, f(!1);
      }
    };
  if (!e) return null;
  const j = Vvn.includes((N = T.preset) == null ? void 0 : N.label) ? (G = T.preset) == null ? void 0 : G.label : "",
    B = Hvn.includes((z = T.preset) == null ? void 0 : z.label) ? (V = T.preset) == null ? void 0 : V.label : "",
    F = Wvn.find(O => jdt(O) === A) || "原帧率";
  return c.jsxs(c.Fragment, {
    children: [c.jsxs("div", {
      className: "nodrag nowheel pointer-events-auto absolute inset-0 z-40 overflow-hidden rounded-2xl",
      onPointerDown: O => O.stopPropagation(),
      onMouseDown: O => O.stopPropagation(),
      onClick: O => {
        O.stopPropagation(), m || P();
      },
      children: [c.jsx("video", {
        ref: l,
        src: t,
        muted: !0,
        playsInline: !0,
        preload: "auto",
        crossOrigin: t.startsWith("http") ? "anonymous" : void 0,
        className: "pointer-events-none absolute inset-0 h-full w-full object-contain",
        onLoadedMetadata: O => {
          const L = O.currentTarget;
          I({
            width: L.videoWidth || 0,
            height: L.videoHeight || 0
          }), (async () => {
            u.current = !0;
            try {
              await L.play();
              const D = await wTo(L);
              L.pause(), D && M(D);
            } catch {
              L.pause();
            } finally {
              u.current = !1, p(!1);
            }
          })();
        },
        onPlay: () => {
          u.current || p(!0);
        },
        onPause: () => {
          u.current || p(!1);
        }
      }), C.width > 0 ? c.jsxs("div", {
        className: "pointer-events-none absolute left-3 top-3 z-10 rounded-md bg-black/55 px-1.5 py-0.5 text-[10px] tabular-nums text-white/90",
        children: [C.width, "×", C.height, E ? ` · ${rxr(E)} fps` : ""]
      }) : null, !h && !m ? c.jsx("span", {
        className: "pointer-events-none absolute inset-0 flex items-center justify-center",
        children: c.jsx("span", {
          className: "flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#111] shadow-[0_8px_24px_rgba(0,0,0,0.35)]",
          children: c.jsx("svg", {
            viewBox: "0 0 24 24",
            width: "22",
            height: "22",
            fill: "currentColor",
            children: c.jsx("path", {
              d: "M8 5v14l11-7z"
            })
          })
        })
      }) : null]
    }), c.jsx("div", {
      className: "absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2",
      style: {
        pointerEvents: "auto"
      },
      onClick: O => O.stopPropagation(),
      onPointerDown: O => O.stopPropagation(),
      children: c.jsx(OT, {
        title: x("视频压缩"),
        testId: "video-compress-panel",
        dataAttr: "data-video-compress-panel",
        width: 436,
        generatePlacement: "footer",
        bodyClassName: "px-4 pb-3",
        onClose: m ? void 0 : s,
        onGenerate: () => void R(),
        generateTitle: m ? "停止压缩" : "确认压缩",
        footer: m ? c.jsxs("div", {
          className: "flex min-w-0 flex-1 items-center gap-2",
          children: [c.jsxs("div", {
            className: "min-w-0 flex-1",
            children: [c.jsx("div", {
              className: "truncate text-[11px] text-white/45",
              children: v || x("正在准备...")
            }), c.jsx("div", {
              className: "mt-1 h-1 overflow-hidden rounded-full bg-white/10",
              children: c.jsx("div", {
                className: "h-full rounded-full bg-white/80 transition-[width] duration-300",
                style: {
                  width: `${y}%`
                }
              })
            })]
          }), c.jsxs("span", {
            className: "tabular-nums text-[11px] text-white/55",
            children: [y, "%"]
          })]
        }) : c.jsxs("div", {
          className: "min-w-0",
          children: [c.jsx("div", {
            className: "truncate text-[11px] tabular-nums text-white/55",
            children: T.plan ? `${T.plan.width}×${T.plan.height} · ${T.plan.percent}%` : x("正在解析视频…")
          }), T.chip ? c.jsx("div", {
            className: `mt-0.5 truncate text-[10px] ${T.exceedsLimit ? "text-[#ffb4a8]" : "text-[#7be3a0]"}`,
            children: T.chip
          }) : null]
        }),
        children: c.jsxs("div", {
          className: `flex flex-col gap-2 ${m ? "pointer-events-none opacity-60" : ""}`,
          children: [c.jsx(Ldt, {
            label: x("目标分辨率"),
            children: c.jsx(Ddt, {
              options: Vvn,
              value: j,
              disabled: m || !C.width,
              disabledOf: O => {
                const L = YPe(O);
                return L ? U3t(L, T.sourceMinSide) : !0;
              },
              onChange: O => {
                const L = YPe(O);
                L && k(L.key);
              }
            })
          }), c.jsx(Ldt, {
            label: x("标清档"),
            children: c.jsx(Ddt, {
              options: Hvn,
              value: B,
              disabled: m || !C.width,
              disabledOf: O => {
                const L = YPe(O);
                return L ? U3t(L, T.sourceMinSide) : !0;
              },
              onChange: O => {
                const L = YPe(O);
                L && k(L.key);
              }
            })
          }), c.jsx(Ldt, {
            label: x("目标帧率"),
            children: c.jsx(Ddt, {
              options: Wvn,
              value: F,
              disabled: m,
              disabledOf: O => {
                const L = jdt(O),
                  D = {
                    fps: L === "keep" ? void 0 : Number(L)
                  };
                return $3t(D, E);
              },
              onChange: O => S(jdt(O))
            })
          })]
        })
      })
    })]
  });
}

const _To = Object.freeze(Object.defineProperty({
    __proto__: null,
    VideoCompressHost: xTo
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  qvn = .1,
  ixr = 300,
  kTo = 5,
  G3t = 480,
  ATo = 80,
  Kvn = [{
    value: "gif",
    label: "GIF（.gif）",
    short: "GIF",
    ext: "gif",
    mime: "image/gif"
  }, {
    value: "webp",
    label: "WebP（.webp · 体积更小）",
    short: "WebP",
    ext: "webp",
    mime: "image/webp"
  }],
  Odt = [8, 10, 15],
  STo = [320, 480, 720];

function ITo(e) {
  return e >= 256 ? .92 : e >= 128 ? .8 : .65;
}

function oxr(e, t, n) {
  const r = Math.floor((t - e) * n);
  return Math.min(ixr, Math.max(1, r || 0));
}

function sxr(e, t, n) {
  return !n || !t ? 0 : Math.round(e * n / t);
}

function CTo(e) {
  return Math.round(e || 0);
}

function lxr(e, t, n, r, a) {
  return e > 0 && t > 0 && r > n && a >= ATo;
}

function ETo(e) {
  return Math.round(1e3 / e);
}

function TTo(e, t, n, r) {
  const a = [];
  for (let i = 0; i < n; i++) {
    const o = e + i / t;
    a.push(Math.min(o, (r || 0) - .001));
  }
  return a;
}

function MTo(e, t = Date.now()) {
  return `动图_${t}.${e.ext}`;
}

function PTo(e, t = 5e3) {
  return new Promise((n, r) => {
    const a = () => {
        window.clearTimeout(i), e.oncanplaythrough = null, e.onerror = null, n();
      },
      i = window.setTimeout(a, t);
    e.oncanplaythrough = a, e.onerror = () => {
      window.clearTimeout(i), r(new Error("视频加载失败"));
    }, e.addEventListener("canplaythrough", () => window.clearTimeout(i), {
      once: !0
    }), e.load();
  });
}

function Qvn(e, t, n = 1500) {
  return new Promise(r => {
    const a = () => requestAnimationFrame(() => requestAnimationFrame(() => r())),
      i = window.setTimeout(a, n);
    e.onseeked = () => {
      window.clearTimeout(i), e.readyState >= 2 ? a() : e.addEventListener("canplay", a, {
        once: !0
      });
    }, e.currentTime = t;
  });
}

function RTo(e, t) {
  return new Promise((n, r) => {
    e.toBlob(async a => {
      if (!a || a.type !== "image/webp") {
        r(new Error("当前浏览器不支持 WebP 编码"));
        return;
      }
      n(new Uint8Array(await a.arrayBuffer()));
    }, "image/webp", t);
  });
}

function NTo(e) {
  return [e & 255, e >>> 8 & 255];
}

function kV(e) {
  return [e & 255, e >>> 8 & 255, e >>> 16 & 255];
}

function V3t(e) {
  return [e & 255, e >>> 8 & 255, e >>> 16 & 255, e >>> 24 & 255];
}

function SDe(e) {
  return [e.charCodeAt(0), e.charCodeAt(1), e.charCodeAt(2), e.charCodeAt(3)];
}

function jTo(e) {
  let t = 0;
  for (const a of e) t += a.length;
  const n = new Uint8Array(t);
  let r = 0;
  for (const a of e) n.set(a, r), r += a.length;
  return n;
}

function Yvn(e, t) {
  const n = Array.from(t),
    r = [...SDe(e), ...V3t(n.length), ...n];
  return n.length & 1 && r.push(0), r;
}

function DTo(e) {
  let t = 12;
  const n = [];
  let r = 0,
    a = !1;
  for (; t + 8 <= e.length;) {
    const i = String.fromCharCode(e[t], e[t + 1], e[t + 2], e[t + 3]),
      o = e[t + 4] | e[t + 5] << 8 | e[t + 6] << 16 | e[t + 7] << 24,
      s = t + 8 + o + (o & 1);
    if (i === "ALPH" || i === "VP8 " || i === "VP8L") {
      const l = e.subarray(t, Math.min(s, e.length));
      n.push(l), r += l.length, (i === "ALPH" || i === "VP8L") && (a = !0);
    }
    t = s;
  }
  return {
    segments: n,
    total: r,
    hasAlpha: a
  };
}

function LTo(e, t, n, r, a = 0) {
  const i = [];
  let o = !1;
  for (const h of e) {
    const {
      segments: p,
      total: m,
      hasAlpha: f
    } = DTo(h);
    f && (o = !0);
    const y = [...kV(0), ...kV(0), ...kV(t - 1), ...kV(n - 1), ...kV(r), 0],
      b = y.length + m;
    i.push(new Uint8Array([...SDe("ANMF"), ...V3t(b), ...y]));
    for (const v of p) i.push(v);
    b & 1 && i.push(new Uint8Array([0]));
  }
  const s = Yvn("VP8X", [2 | (o ? 16 : 0), 0, 0, 0, ...kV(t - 1), ...kV(n - 1)]),
    l = Yvn("ANIM", [0, 0, 0, 0, ...NTo(a)]);
  let d = 4 + s.length + l.length;
  for (const h of i) d += h.length;
  const u = [...SDe("RIFF"), ...V3t(d), ...SDe("WEBP"), ...s, ...l];
  return jTo([new Uint8Array(u), ...i]);
}

function X$t(e) {
  return Kvn.find(t => t.value === e) || Kvn[0];
}

function OTo(e, t, n, r, a) {
  const i = r >= ixr ? "（已截断）" : "";
  return `${e.short} · ${t}×${n} · 约 ${r} 帧 · ${a}fps${i}`;
}

function XPe(e) {
  if (e != null && e.aborted) {
    const t = new Error("已取消动图导出");
    throw t.cancelled = !0, t;
  }
}

async function BTo() {
  return Ie(() => Promise.resolve().then(() => _Ro), void 0, import.meta.url);
}

async function FTo(e) {
  var i, o, s, l, d, u, h;
  const t = X$t(e.format),
    {
      url: n,
      revoke: r
    } = await yG(e.sourceNode, e.videoUrl),
    a = document.createElement("video");
  a.muted = !0, a.playsInline = !0, a.preload = "auto", a.crossOrigin = n.startsWith("http") ? "anonymous" : null;
  try {
    (i = e.onProgress) == null || i.call(e, {
      percent: 0,
      text: "准备中…"
    }), a.src = n, await PTo(a), XPe(e.signal);
    const p = a.videoWidth || 0,
      m = a.videoHeight || 0,
      f = Number.isFinite(a.duration) ? a.duration : 0,
      y = CTo(e.width),
      b = sxr(y, p, m);
    if (!lxr(f, p, e.start, e.end, y) || !b) throw new Error("当前浏览器无法解码该视频画面（可能是 HEVC 编码），无法转换动图");
    const v = oxr(e.start, e.end, e.fps),
      _ = TTo(e.start, e.fps, v, f),
      w = ETo(e.fps),
      k = document.createElement("canvas");
    k.width = y, k.height = b;
    const A = k.getContext("2d", {
      willReadFrequently: !0
    });
    if (!A) throw new Error("无法创建画布");
    A.imageSmoothingEnabled = !0, A.imageSmoothingQuality = "high";
    let S;
    if (t.value === "gif") {
      (o = e.onProgress) == null || o.call(e, {
        percent: 4,
        text: "正在加载 GIF 编码器…"
      });
      const {
        GIFEncoder: I,
        quantize: E,
        applyPalette: M
      } = await BTo();
      XPe(e.signal);
      const T = I();
      for (let P = 0; P < _.length; P++) {
        XPe(e.signal), await Qvn(a, _[P]), A.drawImage(a, 0, 0, y, b);
        const {
            data: R
          } = A.getImageData(0, 0, y, b),
          j = E(R, e.colors);
        T.writeFrame(M(R, j), y, b, {
          palette: j,
          delay: w
        }), (s = e.onProgress) == null || s.call(e, {
          percent: Math.round((P + 1) / v * 90),
          text: `采集帧 ${P + 1}/${v}…`
        });
      }
      (l = e.onProgress) == null || l.call(e, {
        percent: 92,
        text: "正在编码 GIF…"
      }), T.finish(), S = T.bytes();
    } else {
      const I = ITo(e.colors),
        E = [];
      for (let M = 0; M < _.length; M++) XPe(e.signal), await Qvn(a, _[M]), A.drawImage(a, 0, 0, y, b), E.push(await RTo(k, I)), (d = e.onProgress) == null || d.call(e, {
        percent: Math.round((M + 1) / v * 90),
        text: `采集帧 ${M + 1}/${v}…`
      });
      (u = e.onProgress) == null || u.call(e, {
        percent: 92,
        text: "正在编码 WebP…"
      }), S = LTo(E, y, b, w);
    }
    const C = new Blob([S], {
      type: t.mime
    });
    if (!C.size) throw new Error(`转换${t.short}失败`);
    return (h = e.onProgress) == null || h.call(e, {
      percent: 100,
      text: ""
    }), {
      blob: C,
      width: y,
      height: b,
      frames: v,
      fileName: MTo(t)
    };
  } catch (p) {
    throw p != null && p.cancelled || p instanceof Error ? p : new Error(`转换${t.short}失败`);
  } finally {
    a.removeAttribute("src"), a.load(), a.remove(), r == null || r();
  }
}

async function zTo(e) {
  var d;
  const t = X$t(e.format),
    n = await JS(e.blob, t.ext, {
      sourceNodeId: e.sourceNode.id
    }),
    r = {
      source: "video_to_gif",
      animatedImage: !0,
      imageSize: `${e.width}×${e.height}`,
      videoToGifConfig: {
        format: t.value,
        fps: e.fps,
        colors: e.colors,
        width: e.width,
        height: e.height,
        startTime: e.start,
        endTime: e.end,
        frames: e.frames
      },
      sourceNodeId: e.sourceNode.id
    },
    a = e.sourceNode.width ?? 300,
    i = e.sourceNode.height ?? 200,
    o = kc(e.width, e.height),
    s = e.generateId(),
    l = Ki(s, "input-image", (e.sourceNode.x ?? 0) + a + 24, e.sourceNode.y ?? 0, t.short, {
      ...n.settings,
      ...r
    }, e.nodes || []);
  return e.setNodes(u => [...u, {
    ...l,
    content: n.content,
    width: o.width || a,
    height: o.height || i,
    settings: {
      ...l.settings,
      ...n.settings,
      ...r,
      mediaType: "image"
    }
  }]), (d = e.setSelectedNodeId) == null || d.call(e, s), s;
}

const UTo = ["GIF", "WebP"],
  $To = ["8fps", "10fps", "15fps"],
  GTo = ["流畅", "标准", "高清"],
  VTo = ["320", "480", "720"],
  HTo = ["5秒", "15秒", "全部"];

function yge({
  options: e,
  value: t,
  disabled: n,
  onChange: r
}) {
  on();
  const a = g.useRef(null),
    i = g.useRef(null),
    [o, s] = g.useState(null),
    l = e.indexOf(t),
    d = l >= 0,
    u = o ?? Math.max(0, l),
    h = d || o != null ? Math.round(Math.min(e.length - 1, Math.max(0, u))) : -1,
    p = o != null,
    m = f => {
      const y = i.current;
      if (!y || f.pointerId !== y.pointerId) return;
      const b = a.current,
        v = y.moved ? Math.round(Math.min(e.length - 1, Math.max(0, y.origin + (f.clientX - y.startX) / y.segW))) : Math.min(e.length - 1, Math.max(0, Math.floor((f.clientX - ((b == null ? void 0 : b.getBoundingClientRect().left) ?? 0) - 3) / y.segW)));
      i.current = null, s(null), n || r(e[v]), b == null || b.addEventListener("click", _ => {
        _.preventDefault(), _.stopPropagation();
      }, {
        capture: !0,
        once: !0
      });
    };
  return c.jsxs("div", {
    ref: a,
    className: `relative flex min-w-0 flex-1 touch-none select-none items-center rounded-full bg-black/40 p-[3px] ${n ? "pointer-events-none opacity-50" : p ? "cursor-grabbing" : "cursor-grab"}`,
    onPointerDown: f => {
      if (n) return;
      const y = a.current;
      y && (i.current = {
        pointerId: f.pointerId,
        startX: f.clientX,
        origin: Math.max(0, l),
        segW: (y.clientWidth - 6) / e.length,
        moved: !1
      }, y.setPointerCapture(f.pointerId));
    },
    onPointerMove: f => {
      const y = i.current;
      if (!y || f.pointerId !== y.pointerId) return;
      const b = f.clientX - y.startX;
      !y.moved && Math.abs(b) < 5 || (y.moved = !0, s(Math.min(e.length - 1, Math.max(0, y.origin + b / y.segW))));
    },
    onPointerUp: m,
    onPointerCancel: m,
    children: [h >= 0 ? c.jsx("div", {
      className: "pointer-events-none absolute bottom-[3px] left-[3px] top-[3px] rounded-full bg-white/90 shadow-[0_1px_4px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-[8px]",
      style: {
        width: `calc((100% - 6px) / ${e.length})`,
        transform: `translateX(${u * 100}%)`,
        transition: p ? "none" : "transform 320ms cubic-bezier(0.32, 0.72, 0, 1)"
      }
    }) : null, e.map((f, y) => c.jsx("button", {
      type: "button",
      className: `relative z-10 flex h-7 flex-1 items-center justify-center whitespace-nowrap rounded-full px-1 text-[11px] font-medium leading-none transition-colors duration-200 ${y === h ? "text-zinc-900" : "text-white/50 hover:text-white/80"}`,
      onClick: () => !n && r(f),
      children: f
    }, f))]
  });
}

function bge({
  label: e,
  children: t
}) {
  return on(), c.jsxs("div", {
    className: "flex items-center gap-3",
    children: [c.jsx("div", {
      className: "w-[4.25rem] shrink-0 text-[11px] text-white/45",
      children: e
    }), t]
  });
}

function Bdt(e, t, n = .08) {
  return Math.abs(e - t) <= n;
}

function WTo(e, t) {
  const n = bG(e);
  return t > 0 && Bdt(n, t, .05) ? "全部" : Bdt(n, 5) ? "5秒" : Bdt(n, 15) ? "15秒" : "";
}

function qTo(e) {
  return e === "8fps" ? Odt[0] : e === "15fps" ? Odt[2] : Odt[1];
}

function KTo(e) {
  return e <= 8 ? "8fps" : e >= 15 ? "15fps" : "10fps";
}

function QTo(e) {
  return e === "高清" ? 256 : e === "流畅" ? 64 : 128;
}

function YTo(e) {
  return e >= 256 ? "高清" : e <= 64 ? "流畅" : "标准";
}

function XTo(e) {
  const t = Number(e);
  return STo.includes(t) ? t : G3t;
}

function JTo(e) {
  return e <= 320 ? "320" : e >= 720 ? "720" : "480";
}

function ZTo({
  open: e,
  videoUrl: t,
  sourceNode: n,
  nodes: r,
  generateId: a,
  setNodes: i,
  setSelectedNodeId: o,
  onClose: s
}) {
  on();
  const l = g.useRef(null),
    d = g.useRef(null),
    u = g.useRef(null),
    h = g.useRef(null),
    p = g.useRef(0),
    m = g.useRef(0),
    f = g.useRef({
      start: 0,
      end: 0
    }),
    y = g.useRef(0),
    b = g.useRef(null),
    [v, _] = g.useState({
      width: 0,
      height: 0,
      duration: 0
    }),
    [w, k] = g.useState({
      start: 0,
      end: 0
    }),
    [A, S] = g.useState(0),
    [C, I] = g.useState(!1),
    [E, M] = g.useState([]),
    [T, P] = g.useState(0),
    [R, j] = g.useState(null),
    [B, F] = g.useState(""),
    [N, G] = g.useState(!1),
    [z, V] = g.useState(0),
    [O, L] = g.useState(""),
    [D, U] = g.useState("gif"),
    [H, Y] = g.useState(10),
    [K, W] = g.useState(128),
    [Q, q] = g.useState(G3t),
    ne = v.duration,
    de = Math.min(qvn, ne || qvn),
    le = ne > 0 ? ne : 60,
    J = g.useMemo(() => ({
      ...w,
      total: ne,
      minDuration: de,
      maxDuration: le
    }), [w, ne, de, le]),
    pe = bG(w),
    ce = ne > 0 && MZe(pe, de, le),
    we = Q5(w.start, ne),
    X = Q5(w.end, ne),
    Z = Q5(A, ne),
    re = sxr(Q, v.width, v.height),
    fe = oxr(w.start, w.end, H),
    ye = X$t(D),
    ie = lxr(ne, v.width, w.start, w.end, Q);
  f.current = w, y.current = A;
  const ae = () => d.current,
    be = () => {
      const me = ae();
      me == null || me.pause(), I(!1), m.current && (cancelAnimationFrame(m.current), m.current = 0);
    },
    Ee = me => {
      const Ae = ae(),
        Fe = Math.max(0, Math.min(me, Math.max(0, (ne || (Ae == null ? void 0 : Ae.duration) || 0) - .001)));
      S(Fe), Ae && Number.isFinite(Fe) && (Ae.currentTime = Fe);
    },
    xe = me => {
      k({
        start: Math.max(0, me.start),
        end: Math.max(me.start, me.end)
      });
    };
  g.useEffect(() => {
    e && (k({
      start: 0,
      end: 0
    }), S(0), I(!1), M([]), G(!1), V(0), L(""), _({
      width: 0,
      height: 0,
      duration: 0
    }), U("gif"), Y(10), W(128), q(G3t));
  }, [e, t]), g.useEffect(() => {
    var Ae;
    if (!e) return;
    const me = (Ae = l.current) == null ? void 0 : Ae.parentElement;
    me == null || me.querySelectorAll("video").forEach(Fe => {
      Fe !== d.current && Fe.pause();
    });
  }, [e]), g.useLayoutEffect(() => {
    const me = u.current;
    if (!me) return;
    const Ae = () => P(me.getBoundingClientRect().width);
    Ae();
    const Fe = new ResizeObserver(Ae);
    return Fe.observe(me), () => Fe.disconnect();
  }, [e]), g.useEffect(() => {
    if (!e || !t || !(ne > 0) || !(T > 0) || !v.width || !v.height) return;
    const me = ++p.current,
      Ae = document.createElement("video");
    Ae.muted = !0, Ae.playsInline = !0, Ae.preload = "auto", Ae.crossOrigin = t.startsWith("http") ? "anonymous" : null, Ae.src = t;
    let Fe = !1;
    return (async () => {
      try {
        if (await new Promise((Le, Ke) => {
          const Xe = window.setTimeout(() => Ke(new Error("timeout")), 8e3);
          Ae.onloadedmetadata = () => {
            window.clearTimeout(Xe), Le();
          }, Ae.onerror = () => {
            window.clearTimeout(Xe), Ke(new Error("load error"));
          };
        }), Fe || me !== p.current) return;
        const Re = NZe(T, v.width / v.height),
          $e = jZe(v.width, v.height),
          rt = document.createElement("canvas");
        rt.width = $e.width, rt.height = $e.height;
        const nt = rt.getContext("2d");
        if (!nt) return;
        const ze = DZe(Re, ne);
        for (let Le = 0; Le < ze.length; Le++) {
          if (Fe || me !== p.current || (await new Promise((Xe, De) => {
            const Ye = window.setTimeout(() => De(new Error("seek timeout")), 3e3);
            Ae.onseeked = () => {
              window.clearTimeout(Ye), Xe();
            }, Ae.onerror = () => {
              window.clearTimeout(Ye), De(new Error("seek error"));
            }, Ae.currentTime = ze[Le];
          }), Fe || me !== p.current)) return;
          nt.drawImage(Ae, 0, 0, rt.width, rt.height);
          const Ke = rt.toDataURL("image/jpeg", .6);
          M(Xe => Le === 0 ? [Ke] : [...Xe, Ke]);
        }
      } catch {
        me === p.current && M([]);
      } finally {
        Ae.removeAttribute("src"), Ae.load(), Ae.remove();
      }
    })(), () => {
      Fe = !0, p.current += 1;
    };
  }, [e, t, ne, T, v.width, v.height]);
  const he = () => {
      m.current && (cancelAnimationFrame(m.current), m.current = 0);
    },
    ue = () => {
      he();
      const me = () => {
        const Ae = ae();
        if (!Ae || Ae.paused) {
          I(!1), m.current = 0;
          return;
        }
        const Fe = Ae.currentTime,
          Me = f.current;
        S(Fe), Fe >= Me.end - .01 && (Ae.currentTime = Me.start, S(Me.start)), m.current = requestAnimationFrame(me);
      };
      m.current = requestAnimationFrame(me);
    },
    ge = () => {
      const me = ae();
      if (!me || N) return;
      if (!me.paused) {
        be();
        return;
      }
      const Ae = f.current,
        Fe = y.current;
      (A$(me) || ne) > 0 && (Fe < Ae.start || Fe >= Ae.end - .01) && (me.currentTime = Ae.start, S(Ae.start)), me.muted = !0, me.playsInline = !0, me.play().then(() => {
        I(!0), ue();
      }).catch(() => {
        me.muted = !0, me.play().then(() => {
          I(!0), ue();
        }).catch(() => {
          I(!1);
        });
      });
    };
  g.useEffect(() => () => he(), []);
  const _e = (me, Ae) => {
      if (N || Ae.button !== 0 || !(ne > 0)) return;
      Ae.preventDefault(), Ae.stopPropagation(), b.current = {
        mode: me,
        startX: Ae.clientX,
        originStart: w.start,
        originEnd: w.end,
        activated: me !== "move"
      }, F(me), me !== "move" && be();
      const Fe = Re => {
          const $e = b.current,
            rt = u.current;
          if (!$e || !rt) return;
          const nt = rt.getBoundingClientRect();
          if ($e.mode === "move" && !$e.activated) {
            if (Math.abs(Re.clientX - $e.startX) < EZe) return;
            $e.activated = !0, be();
          }
          if ($e.mode === "scrub" || $e.mode === "start" || $e.mode === "end") {
            let Xe = (Re.clientX - nt.left) / nt.width * ne;
            $e.mode !== "scrub" && (Xe = PZe(Xe, nt.width, ne, [A, 0, ne], Re.altKey)), $e.mode === "scrub" ? Ee(Xe) : $e.mode === "start" ? xe(S$(Xe, {
              ...J,
              start: $e.originStart,
              end: $e.originEnd
            })) : xe(I$(Xe, {
              ...J,
              start: $e.originStart,
              end: $e.originEnd
            }));
            return;
          }
          const ze = $e.originEnd - $e.originStart,
            Le = RZe(Re.clientX - $e.startX, nt.width, ne),
            Ke = Math.max(0, Math.min($e.originStart + Le, ne - ze));
          xe({
            start: Ke,
            end: Ke + ze
          });
        },
        Me = Re => {
          const $e = b.current,
            rt = u.current;
          if (($e == null ? void 0 : $e.mode) === "move" && !$e.activated && rt) {
            const nt = rt.getBoundingClientRect();
            Ee(($e.startX - nt.left) / nt.width * ne);
          }
          b.current = null, F(""), window.removeEventListener("pointermove", Fe), window.removeEventListener("pointerup", Me), window.removeEventListener("pointercancel", Me);
        };
      window.addEventListener("pointermove", Fe), window.addEventListener("pointerup", Me), window.addEventListener("pointercancel", Me);
    },
    ke = me => {
      if (ne > 0) {
        if (me === "全部") {
          xe({
            start: 0,
            end: ne
          });
          return;
        }
        xe(TZe(me === "5秒" ? 5 : 15, J));
      }
    },
    ve = async () => {
      var Ae;
      if (N) {
        (Ae = h.current) == null || Ae.abort();
        return;
      }
      if (!t || !a || !i || !ie || !ce) {
        Ai("error", a && i ? "请先框出有效区间" : "无法创建节点");
        return;
      }
      be();
      const me = new AbortController();
      h.current = me, G(!0), V(0), L("准备中…");
      try {
        const Fe = f.current,
          Me = await FTo({
            videoUrl: t,
            sourceNode: n,
            start: Fe.start,
            end: Fe.end,
            fps: H,
            width: Q,
            colors: K,
            format: D,
            signal: me.signal,
            onProgress: ({
              percent: Re,
              text: $e
            }) => {
              V(rt => Math.max(rt, Re)), L($e);
            }
          });
        await zTo({
          blob: Me.blob,
          fileName: Me.fileName,
          width: Me.width,
          height: Me.height,
          frames: Me.frames,
          format: D,
          fps: H,
          colors: K,
          start: Fe.start,
          end: Fe.end,
          sourceNode: n,
          nodes: r,
          generateId: a,
          setNodes: i,
          setSelectedNodeId: o
        }), Ai("success", `${ye.short} 已添加为新节点`), s();
      } catch (Fe) {
        const Me = !!(Fe != null && Fe.cancelled);
        Ai(Me ? "info" : "error", Me ? "已取消动图导出" : Fe instanceof Error ? Fe.message : "动图导出失败");
      } finally {
        h.current = null, G(!1);
      }
    };
  if (g.useEffect(() => {
    if (!e) return;
    const me = Ae => {
      const Fe = Ae.target;
      if (Fe && (Fe.tagName === "INPUT" || Fe.tagName === "TEXTAREA" || Fe.isContentEditable)) {
        Ae.key === "Escape" && Fe.blur();
        return;
      }
      if (!(Ae.metaKey || Ae.ctrlKey || Ae.altKey)) {
        if (Ae.code === "Space") {
          Ae.preventDefault(), Ae.stopPropagation(), ge();
          return;
        }
        if (Ae.code === "Escape" && !N) {
          Ae.preventDefault(), Ae.stopPropagation(), s();
          return;
        }
        Ae.code === "Enter" && !Ae.isComposing && ie && !N && (Ae.preventDefault(), Ae.stopPropagation(), ve());
      }
    };
    return document.addEventListener("keydown", me, !0), () => document.removeEventListener("keydown", me, !0);
  }, [e, ie, N]), !e) return null;
  const Te = R == null || !(ne > 0) ? "" : Om(R / 100 * ne),
    Ne = B === "start" ? Om(w.start) : B === "end" ? Om(w.end) : "";
  return c.jsxs(c.Fragment, {
    children: [c.jsxs("div", {
      ref: l,
      className: "nodrag nowheel pointer-events-auto absolute inset-0 z-40 overflow-hidden rounded-2xl",
      onPointerDown: me => me.stopPropagation(),
      onMouseDown: me => me.stopPropagation(),
      onClick: me => {
        me.stopPropagation(), N || ge();
      },
      children: [c.jsx("video", {
        ref: d,
        src: t,
        muted: !0,
        playsInline: !0,
        preload: "auto",
        crossOrigin: t.startsWith("http") ? "anonymous" : void 0,
        className: "pointer-events-none absolute inset-0 h-full w-full object-contain",
        onLoadedMetadata: me => {
          const Ae = me.currentTarget,
            Fe = A$(Ae);
          _({
            width: Ae.videoWidth || 0,
            height: Ae.videoHeight || 0,
            duration: Fe
          }), k(Me => Me.end > .02 ? Me : {
            start: 0,
            end: Math.min(Fe, kTo)
          });
        },
        onPlay: () => {
          I(!0), ue();
        },
        onPause: () => {
          I(!1), he();
        }
      }), c.jsxs("div", {
        className: "pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-1 rounded-md bg-black/55 px-1.5 py-0.5 text-[10px] tabular-nums text-white/90",
        children: [c.jsx("span", {
          children: Om(A)
        }), c.jsx("span", {
          className: "text-white/45",
          children: ye.short
        })]
      }), !C && !N ? c.jsx("span", {
        className: "pointer-events-none absolute inset-0 flex items-center justify-center",
        children: c.jsx("span", {
          className: "flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#111] shadow-[0_8px_24px_rgba(0,0,0,0.35)]",
          children: c.jsx("svg", {
            viewBox: "0 0 24 24",
            width: "22",
            height: "22",
            fill: "currentColor",
            children: c.jsx("path", {
              d: "M8 5v14l11-7z"
            })
          })
        })
      }) : null]
    }), c.jsx("div", {
      className: "absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2",
      style: {
        pointerEvents: "auto"
      },
      onClick: me => me.stopPropagation(),
      onPointerDown: me => me.stopPropagation(),
      children: c.jsx(OT, {
        title: x("动图导出"),
        testId: "video-to-gif-panel",
        dataAttr: "data-video-to-gif-panel",
        width: 436,
        generatePlacement: "footer",
        bodyClassName: "px-4 pb-3",
        onClose: N ? void 0 : s,
        onGenerate: () => void ve(),
        generateTitle: N ? "停止转换" : `转换为 ${ye.short}`,
        footer: N ? c.jsxs("div", {
          className: "flex min-w-0 flex-1 items-center gap-2",
          children: [c.jsxs("div", {
            className: "min-w-0 flex-1",
            children: [c.jsx("div", {
              className: "truncate text-[11px] text-white/45",
              children: O || x("准备中…")
            }), c.jsx("div", {
              className: "mt-1 h-1 overflow-hidden rounded-full bg-white/10",
              children: c.jsx("div", {
                className: "h-full rounded-full bg-white/80 transition-[width] duration-300",
                style: {
                  width: `${z}%`
                }
              })
            })]
          }), c.jsxs("span", {
            className: "tabular-nums text-[11px] text-white/55",
            children: [z, "%"]
          })]
        }) : c.jsx("div", {
          className: "truncate text-center text-[11px] tabular-nums text-white/30",
          children: ne > 0 ? OTo(ye, Q, re || 0, fe, H) : x("拖动入点 / 出点确定动图区间")
        }),
        children: c.jsxs("div", {
          className: "flex flex-col gap-2",
          children: [c.jsxs("div", {
            className: `relative pt-1 ${N ? "pointer-events-none opacity-50" : ""}`,
            children: [c.jsxs("div", {
              className: "mb-1.5 flex items-center justify-between text-[10px] tabular-nums text-white/35",
              children: [c.jsx("span", {
                children: Om(w.start)
              }), c.jsx("span", {
                children: Om(w.end)
              })]
            }), c.jsxs("div", {
              ref: u,
              className: `relative h-12 overflow-visible rounded-[10px] bg-black/35 ${B ? "cursor-ew-resize" : "cursor-crosshair"}`,
              onPointerDown: me => {
                me.target.closest("[data-gif-handle], [data-gif-selection], [data-gif-playhead]") || _e("scrub", me);
              },
              onPointerMove: me => {
                var Fe;
                const Ae = (Fe = u.current) == null ? void 0 : Fe.getBoundingClientRect();
                !Ae || B || j((me.clientX - Ae.left) / Ae.width * 100);
              },
              onPointerLeave: () => j(null),
              children: [c.jsxs("div", {
                className: "pointer-events-none absolute inset-0 overflow-hidden rounded-[10px]",
                children: [c.jsx("div", {
                  className: "flex h-full w-full",
                  children: E.length ? E.map((me, Ae) => c.jsx("img", {
                    src: me,
                    alt: "",
                    className: "h-full min-w-0 flex-1 object-cover"
                  }, `${me}-${Ae}`)) : c.jsx("div", {
                    className: "h-full w-full bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.06)_0_12px,rgba(255,255,255,0.02)_12px_24px)]"
                  })
                }), c.jsx("div", {
                  className: "absolute inset-y-0 left-0 bg-black/55",
                  style: {
                    width: `${we}%`
                  }
                }), c.jsx("div", {
                  className: "absolute inset-y-0 right-0 bg-black/55",
                  style: {
                    width: `${100 - X}%`
                  }
                })]
              }), c.jsxs("div", {
                "data-gif-selection": "",
                className: `absolute inset-y-0 z-[2] ${B === "move" ? "cursor-grabbing" : "cursor-grab"}`,
                style: {
                  left: `${we}%`,
                  width: `${Math.max(0, X - we)}%`,
                  boxShadow: ce ? "inset 0 2px #fff, inset 0 -2px #fff" : "inset 0 2px 0 rgba(248,113,113,0.85), inset 0 -2px 0 rgba(248,113,113,0.85)"
                },
                onPointerDown: me => _e("move", me),
                children: [c.jsx("div", {
                  "data-gif-handle": "start",
                  className: "absolute bottom-0 top-0 z-10 flex w-3.5 -translate-x-1/2 items-center justify-center rounded-l-[7px] bg-white",
                  style: {
                    left: 0
                  },
                  onPointerDown: me => _e("start", me),
                  children: c.jsx("span", {
                    className: "h-4 w-0.5 rounded-sm bg-black/35"
                  })
                }), c.jsx("div", {
                  "data-gif-handle": "end",
                  className: "absolute bottom-0 top-0 z-10 flex w-3.5 translate-x-1/2 items-center justify-center rounded-r-[7px] bg-white",
                  style: {
                    right: 0
                  },
                  onPointerDown: me => _e("end", me),
                  children: c.jsx("span", {
                    className: "h-4 w-0.5 rounded-sm bg-black/35"
                  })
                })]
              }), R != null && !B ? c.jsx("div", {
                className: "pointer-events-none absolute inset-y-0 z-[8] w-px bg-white/45",
                style: {
                  left: `${R}%`
                },
                children: c.jsx("span", {
                  className: "absolute -top-5 left-1/2 -translate-x-1/2 rounded bg-black/85 px-1.5 py-0.5 text-[10px] tabular-nums text-white",
                  children: Te
                })
              }) : null, Ne ? c.jsx("div", {
                className: "pointer-events-none absolute -top-5 z-20 -translate-x-1/2 rounded bg-black/85 px-1.5 py-0.5 text-[10px] tabular-nums text-white",
                style: {
                  left: `${B === "start" ? we : X}%`
                },
                children: Ne
              }) : null, c.jsx("div", {
                "data-gif-playhead": "",
                className: "pointer-events-none absolute bottom-0 top-[-10px] z-20 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_4px_rgba(0,0,0,0.4)]",
                style: {
                  left: `${Z}%`
                },
                children: c.jsx("div", {
                  className: "pointer-events-auto absolute -top-0.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-[3px] bg-white",
                  style: {
                    cursor: "ew-resize"
                  },
                  onPointerDown: me => _e("scrub", me)
                })
              })]
            })]
          }), c.jsx(bge, {
            label: x("格式"),
            children: c.jsx(yge, {
              options: UTo,
              value: D === "webp" ? "WebP" : "GIF",
              disabled: N,
              onChange: me => U(me === "WebP" ? "webp" : "gif")
            })
          }), c.jsx(bge, {
            label: x("帧率"),
            children: c.jsx(yge, {
              options: $To,
              value: KTo(H),
              disabled: N,
              onChange: me => Y(qTo(me))
            })
          }), c.jsx(bge, {
            label: x("画质"),
            children: c.jsx(yge, {
              options: GTo,
              value: YTo(K),
              disabled: N,
              onChange: me => W(QTo(me))
            })
          }), c.jsx(bge, {
            label: x("宽度"),
            children: c.jsx(yge, {
              options: VTo,
              value: JTo(Q),
              disabled: N,
              onChange: me => q(XTo(me))
            })
          }), c.jsx(bge, {
            label: x("选区"),
            children: c.jsx(yge, {
              options: HTo,
              value: WTo(w, ne),
              disabled: N || !(ne > 0),
              onChange: ke
            })
          })]
        })
      })
    })]
  });
}

const e8o = Object.freeze(Object.defineProperty({
  __proto__: null,
  VideoToGifHost: ZTo
}, Symbol.toStringTag, {
  value: "Module"
}));

function Xvn(e) {
  return c.jsx(K1r, {
    ...e
  });
}

const t8o = Object.freeze(Object.defineProperty({
  __proto__: null,
  InputImageNodeFullEntry: Xvn,
  default: Xvn
}, Symbol.toStringTag, {
  value: "Module"
}));

class n8o {
  constructor() {
    On(this, "directoryHandle", null);
    On(this, "fileMappings", new Map());
    On(this, "downloadingNodes", new Set());
    On(this, "blobUrlCache", new Map());
  }
  setDirectoryHandle(t) {
    this.directoryHandle = t, console.log("[AutoDownloadManager] Directory handle set:", (t == null ? void 0 : t.name) || "null");
  }
  getFileMapping(t) {
    return this.fileMappings.get(t);
  }
  detectAssetType(t, n) {
    if (n === "gen-video" || n === "video-input") return "video";
    if (n === "gen-music") return "audio";
    if (n === "gen-image" || n === "input-image") return "image";
    const r = t.toLowerCase();
    return r.includes(".mp4") || r.includes(".webm") || r.includes(".mov") || r.includes("video") ? "video" : r.includes(".mp3") || r.includes(".wav") || r.includes(".ogg") || r.includes("audio") ? "audio" : "image";
  }
  extractExtension(t, n) {
    try {
      const i = new URL(t).pathname.match(/\.([a-zA-Z0-9]+)$/);
      if (i) return i[1].toLowerCase();
    } catch {}
    return n === "video" ? "mp4" : n === "audio" ? "mp3" : "png";
  }
  generateFileName(t, n, r) {
    var s;
    const a = this.extractExtension(n, r),
      i = t.id.substring(0, 8);
    let o = ((s = t.nodeName) == null ? void 0 : s.trim()) || t.type.replace(/-/g, "_");
    return o = o.replace(/[<>:"/\\|?*\x00-\x1f]/g, "").replace(/\s+/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, ""), `${o}_${i}.${a}`;
  }
  async createBlobUrlFromFile(t, n) {
    if (!this.directoryHandle) return null;
    try {
      const [r, a] = t.split("/"),
        s = await (await (await this.directoryHandle.getDirectoryHandle(r)).getFileHandle(a)).getFile(),
        l = URL.createObjectURL(s);
      return this.blobUrlCache.set(t, l), l;
    } catch (r) {
      return console.error("[AutoDownloadManager] Failed to create blob URL from file:", t, r), null;
    }
  }
  updateNodeAndHistoryUrl(t, n, r, a) {
    console.log("[AutoDownloadManager] Triggering updateNodeUrl event:", {
      nodeId: t,
      originalUrl: n.substring(0, 50),
      localBlobUrl: r.substring(0, 50),
      localFilePath: a
    }), window.dispatchEvent(new CustomEvent("updateNodeUrl", {
      detail: {
        nodeId: t,
        originalUrl: n,
        localBlobUrl: r,
        localFilePath: a
      }
    }));
  }
  updateFileMappingOnLoad(t, n, r, a) {
    this.fileMappings.set(t, {
      nodeId: t,
      url: "",
      filePath: r,
      type: a,
      lastModified: Date.now(),
      localBlobUrl: n,
      _localFilePath: r
    });
  }
  async downloadAsset(t, n, r) {
    if (!this.directoryHandle) {
      console.warn("[AutoDownloadManager] No directory handle");
      return;
    }
    if (this.downloadingNodes.has(t.id)) {
      console.log("[AutoDownloadManager] Already downloading:", t.id);
      return;
    }
    const a = this.fileMappings.get(t.id);
    if (a && a.url === n) {
      console.log("[AutoDownloadManager] Already downloaded:", t.id);
      return;
    }
    this.downloadingNodes.add(t.id);
    try {
      const i = this.generateFileName(t, n, r),
        o = r === "image" ? "images" : r === "video" ? "videos" : "audios",
        s = `${o}/${i}`;
      console.log("[AutoDownloadManager] Downloading:", {
        nodeId: t.id,
        url: n,
        filePath: s
      });
      const l = await this.directoryHandle.getDirectoryHandle(o, {
        create: !0
      });
      try {
        await l.getFileHandle(i), console.log("[AutoDownloadManager] File already exists, skipping:", i);
        const f = await this.createBlobUrlFromFile(s, r);
        f && this.updateNodeAndHistoryUrl(t.id, n, f, s), this.fileMappings.set(t.id, {
          nodeId: t.id,
          url: n,
          filePath: s,
          type: r,
          lastModified: Date.now(),
          localBlobUrl: f || void 0,
          _localFilePath: s
        });
        return;
      } catch {}
      const d = await fetch(n);
      if (!d.ok) throw new Error(`HTTP ${d.status}`);
      const u = await d.blob(),
        p = await (await l.getFileHandle(i, {
          create: !0
        })).createWritable();
      await p.write(u), await p.close(), console.log("[AutoDownloadManager] ✅ Downloaded:", s);
      const m = URL.createObjectURL(u);
      this.blobUrlCache.set(s, m), this.updateNodeAndHistoryUrl(t.id, n, m, s), this.fileMappings.set(t.id, {
        nodeId: t.id,
        url: n,
        filePath: s,
        type: r,
        lastModified: Date.now(),
        localBlobUrl: m,
        _localFilePath: s
      });
    } catch (i) {
      console.error("[AutoDownloadManager] Download failed:", i);
    } finally {
      this.downloadingNodes.delete(t.id);
    }
  }
  async renameFile(t, n, r) {
    if (!this.directoryHandle) return null;
    try {
      const [a, i] = t.split("/"),
        o = await this.directoryHandle.getDirectoryHandle(a),
        d = await (await (await o.getFileHandle(i)).getFile()).arrayBuffer(),
        u = await o.getFileHandle(n, {
          create: !0
        }),
        h = await u.createWritable();
      await h.write(d), await h.close(), await o.removeEntry(i);
      const p = `${a}/${n}`;
      console.log("[AutoDownloadManager] ✅ Renamed:", t, "->", p);
      const m = await u.getFile(),
        f = URL.createObjectURL(m);
      return this.blobUrlCache.set(p, f), p;
    } catch (a) {
      return console.error("[AutoDownloadManager] Rename failed:", a), null;
    }
  }
  async handleNodeUpdate(t, n) {
    if (!this.directoryHandle) return;
    const r = t.content,
      a = n == null ? void 0 : n.content;
    if (r && typeof r == "string" && (r.startsWith("http://") || r.startsWith("https://")) && r !== a) {
      const i = this.detectAssetType(r, t.type);
      await this.downloadAsset(t, r, i);
    }
    if (n && t.nodeName !== n.nodeName) {
      const i = this.fileMappings.get(t.id);
      if (i) {
        const o = i.type,
          s = i.url,
          l = this.generateFileName(t, s, o),
          d = await this.renameFile(i.filePath, l, o);
        if (d) {
          const u = this.blobUrlCache.get(d);
          this.fileMappings.set(t.id, {
            ...i,
            filePath: d,
            localBlobUrl: u,
            _localFilePath: d,
            lastModified: Date.now()
          }), u && this.updateNodeAndHistoryUrl(t.id, s, u, d);
        }
      }
    }
  }
  async handleNodesUpdate(t, n) {
    if (!this.directoryHandle) return;
    const r = new Map(n.map(i => [i.id, i])),
      a = 5;
    for (let i = 0; i < t.length; i += a) {
      const o = t.slice(i, i + a);
      await Promise.allSettled(o.map(s => {
        const l = r.get(s.id);
        return this.handleNodeUpdate(s, l);
      }));
    }
  }
  clearNodeMapping(t) {
    const n = this.fileMappings.get(t);
    n != null && n.localBlobUrl && URL.revokeObjectURL(n.localBlobUrl), this.fileMappings.delete(t);
  }
  getMemoryProbe() {
    return {
      fileMappings: this.fileMappings.size,
      blobUrlCache: this.blobUrlCache.size,
      downloadingNodes: this.downloadingNodes.size
    };
  }
  clearBlobUrlCache() {
    this.blobUrlCache.forEach(t => {
      try {
        t.startsWith("blob:") && URL.revokeObjectURL(t);
      } catch {}
    }), this.blobUrlCache.clear(), this.fileMappings.forEach(t => {
      var n;
      if ((n = t.localBlobUrl) != null && n.startsWith("blob:")) {
        try {
          URL.revokeObjectURL(t.localBlobUrl);
        } catch {}
        t.localBlobUrl = void 0;
      }
    });
  }
}

const r8o = new n8o(),
  a8o = Object.freeze(Object.defineProperty({
    __proto__: null,
    autoDownloadManager: r8o
  }, Symbol.toStringTag, {
    value: "Module"
  }));

function i8o({
  nodeId: e,
  isDark: t,
  activeDropdown: n,
  setActiveDropdown: r,
  officialSize: a,
  modelId: i,
  settings: o,
  ratio: s,
  resolution: l,
  ratios: d,
  resolutions: u,
  onPatch: h,
  onRemember: p
}) {
  return c.jsxs("div", {
    className: "qiaodoumayi-gen-size-beside-model shrink-0 flex items-center gap-1 overflow-visible",
    children: [c.jsx("span", {
      className: "qiaodoumayi-gen-model-size-divider",
      "aria-hidden": !0
    }), r ? a ? c.jsx(VJe, {
      variant: "dropdown",
      nodeId: e,
      isDark: t,
      currentModel: i,
      settings: o,
      activeDropdown: n,
      setActiveDropdown: r,
      onApply: m => {
        h(m), m.gptImage2Resolution !== "custom" && r(null);
      },
      onSaveModelMemory: p
    }) : c.jsx(GJe, {
      nodeId: e,
      isDark: t,
      dropdownType: "edit-ratio",
      activeDropdown: n,
      setActiveDropdown: r,
      selectedRatio: s || "Auto",
      ratioOptions: d,
      resolutionOptions: u,
      selectedResolution: l,
      onSelectRatio: m => {
        h({
          ratio: m
        }), p({
          aspectRatio: m
        });
      },
      onSelectResolution: m => {
        h({
          resolution: m
        }), p({
          resolution: m
        });
      }
    }) : null]
  });
}

function o8o({
  value: e,
  open: t,
  disabled: n,
  isDark: r,
  onToggle: a,
  onSelect: i
}) {
  return c.jsxs("div", {
    className: "relative shrink-0 overflow-visible",
    children: [c.jsx("button", {
      type: "button",
      disabled: n,
      onPointerDown: o => {
        o.button === 0 && (o.preventDefault(), o.stopPropagation(), a());
      },
      onMouseDown: o => o.stopPropagation(),
      className: `node-dropdown-button flex items-center gap-1 px-2 py-1 rounded text-[10px] border whitespace-nowrap ${r ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
      children: _xe[String(e || "png").toLowerCase()] || "PNG"
    }), t ? c.jsx("div", {
      className: `node-dropdown-menu absolute bottom-full right-0 mb-1 w-24 rounded-lg shadow-xl p-1 z-[100] border ${r ? "bg-[#1f1f1f] border-zinc-700" : "bg-white border-zinc-200"}`,
      onMouseDown: o => o.stopPropagation(),
      children: ["png", "jpeg", "webp"].map(o => c.jsx("button", {
        type: "button",
        onClick: () => {
          i(o);
        },
        className: `w-full px-2 py-1.5 rounded text-left text-xs transition-colors ${r ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-zinc-100 text-zinc-700"} ${String(e || "png") === o ? r ? "bg-zinc-800" : "bg-zinc-100" : ""}`,
        children: _xe[o] || o.toUpperCase()
      }, o))
    }) : null]
  });
}

const s8o = [],
  l8o = [],
  c8o = ({
    scopeNodeId: e,
    nodeSettings: t,
    isDark: n,
    connections: r = s8o,
    nodes: a = l8o,
    getConnectedInputImages: i,
    getConnectedInputItems: o,
    setConnections: s,
    updateNode: l,
    settingsReferenceImagesKey: d = "editImageReferenceImages",
    settingsOrderKey: u = "editImageInputImageOrder",
    maxCount: h = 5,
    className: p = "",
    leadingSlot: m,
    trailingSlot: f,
    showPlusSlot: y = !1,
    plusSlotContent: b,
    onPlusClick: v,
    plusSlotTitle: _ = "可以继续连接更多图片节点，或点击上传参考图",
    onInsertAtReference: w,
    showHoverPreview: k = !0
  }) => {
    on();
    const [A, S] = g.useState(null),
      [C, I] = g.useState(null);
    g.useEffect(() => {
      if (!C) return;
      const ce = () => I(null);
      return window.addEventListener("scroll", ce, !0), window.addEventListener("wheel", ce, !0), () => {
        window.removeEventListener("scroll", ce, !0), window.removeEventListener("wheel", ce, !0);
      };
    }, [C]), g.useEffect(() => {
      if (A == null) return;
      const ce = () => S(null);
      return window.addEventListener("dragend", ce, !0), window.addEventListener("drop", ce, !0), () => {
        window.removeEventListener("dragend", ce, !0), window.removeEventListener("drop", ce, !0);
      };
    }, [A]);
    const E = g.useMemo(() => ((i == null ? void 0 : i(e)) || []).filter(Boolean), [i, e, r, a]),
      M = g.useMemo(() => ((t == null ? void 0 : t[d]) || []).filter(ce => String(ce).trim()), [t, d]),
      T = g.useMemo(() => Nue({
        fromConnections: E,
        fromSettings: M,
        order: (t == null ? void 0 : t[u]) || void 0
      }).slice(0, h), [E, M, t, u, h]),
      P = g.useMemo(() => ((o == null ? void 0 : o(e)) ?? []).filter(ce => (ce == null ? void 0 : ce.type) === "image" || (ce == null ? void 0 : ce.type) === "video" || (ce == null ? void 0 : ce.type) === "audio"), [o, e, r, a]),
      R = g.useCallback((ce, we) => {
        var Z;
        const X = String(we || "").trim();
        return (Z = P.find(re => String(re.url || "").trim() === X)) == null ? void 0 : Z.assetId;
      }, [P]),
      j = g.useMemo(() => kY(r, a, e), [r, a, e]),
      B = g.useCallback(ce => E.includes(ce), [E]),
      [F, N] = g.useState(() => new Map()),
      [G, z] = g.useState(() => new Set()),
      V = g.useRef(new Map());
    g.useEffect(() => {
      V.current = F;
    }, [F]), g.useEffect(() => {
      let ce = !1;
      const we = new Set(T.map(re => String(re).trim()).filter(Boolean)),
        X = re => {
          z(fe => {
            const ye = new Set(fe);
            for (const ie of re) ye.delete(ie);
            return ye;
          });
        };
      return (async () => {
        const re = [];
        if (T.forEach((fe, ye) => {
          if (vP(fe)) return;
          const ie = yy(fe, R(ye, fe));
          SE(fe, ie) && (!ie && !Er.isContentRef(fe) || V.current.has(fe) || re.push({
            rawUrl: fe,
            assetId: ie || ""
          }));
        }), ce || (N(fe => {
          const ye = new Map();
          for (const [ie, ae] of fe) we.has(ie) && ye.set(ie, ae);
          return ye;
        }), z(fe => {
          const ye = new Set();
          for (const ie of fe) we.has(ie) && ye.add(ie);
          for (const ie of re) ye.add(ie.rawUrl);
          return ye;
        })), re.length !== 0) for (const {
          rawUrl: fe,
          assetId: ye
        } of re) {
          if (ce) break;
          try {
            const ie = await dHe(fe, ye);
            if (ce) break;
            ie && N(ae => {
              const be = new Map(ae);
              return be.set(fe, ie), be;
            });
          } catch {} finally {
            ce || X([fe]);
          }
        }
      })(), () => {
        ce = !0;
      };
    }, [T, R]);
    const [O, L] = g.useState(() => new Map()),
      D = g.useRef(new Map()),
      U = g.useRef(new Set()),
      H = g.useRef(new Set());
    g.useEffect(() => {
      D.current = O;
    }, [O]), g.useEffect(() => {
      let ce = !1;
      const we = new Set(T);
      return L(Z => OUt(Z, we, H.current)), (async () => {
        const Z = [];
        for (let re = 0; re < T.length; re++) {
          const fe = T[re];
          if (!/^https?:\/\//i.test(fe) || DS(fe)) continue;
          const ye = yy(fe, R(re, fe));
          if (!SE(fe, ye)) {
            if (ce) return;
            if (!D.current.has(fe) && !U.current.has(fe)) {
              U.current.add(fe);
              try {
                await ni.init();
                const ie = await ni.getAssetBlobByRemoteUrl(fe);
                if (!ie) continue;
                const ae = URL.createObjectURL(ie);
                if (H.current.add(ae), ce || !we.has(fe)) {
                  fj(ae, H.current);
                  continue;
                }
                Z.push([fe, ae]);
              } catch {} finally {
                U.current.delete(fe);
              }
            }
          }
        }
        if (ce) {
          for (const [, re] of Z) fj(re, H.current);
          return;
        }
        Z.length !== 0 && L(re => {
          const fe = new Map(re);
          return Z.forEach(([ye, ie]) => {
            we.has(ye) ? fe.set(ye, ie) : fj(ie, H.current);
          }), fe;
        });
      })(), () => {
        ce = !0;
      };
    }, [T, R]), g.useEffect(() => () => {
      H.current.forEach(ce => {
        try {
          URL.revokeObjectURL(ce);
        } catch {}
      }), H.current.clear(), U.current.clear();
    }, []);
    const Y = g.useMemo(() => T.map((ce, we) => {
        const X = yy(ce, R(we, ce)),
          Z = SE(ce, X),
          re = F.get(ce),
          fe = pU(ce, {
            scopeNodeId: e,
            connections: r,
            nodes: a,
            imageSourceMap: j
          }),
          ye = fe ? a.find(ue => ue.id === fe) : void 0,
          ie = wk(ce, ye),
          ae = vP(ce),
          be = Z && !ae && !re && !ie && G.has(ce),
          Ee = pHe({
            syncDisplay: ie,
            localPreferredUrl: re,
            resolvedThumbUrl: O.get(ce),
            rawUrl: ce,
            preferLocalRef: Z
          }),
          xe = mHe(ce, we, P),
          he = xe ?? mU(ce, xe, ye);
        return {
          imgSrc: ce,
          refAssetId: X,
          referenceThumbSrc: Ee,
          isResolvingLocalRef: be,
          isLinked: B(ce),
          mediaType: he,
          sourceNode: ye
        };
      }), [T, R, F, G, O, B, e, r, a, j, E, P]),
      [K, W] = g.useState({}),
      Q = g.useRef(new Set()),
      q = g.useRef(new Set()),
      ne = g.useRef(new Set());
    g.useEffect(() => {
      const ce = new Set();
      for (const we of Y) we.referenceThumbSrc && ce.add(we.referenceThumbSrc), we.imgSrc && ce.add(we.imgSrc);
      ne.current = ce, W(we => BUt(we, ce)), oue(q.current, ce), oue(Q.current, ce);
      for (const we of Y) {
        const X = we.referenceThumbSrc;
        if (!X || we.isResolvingLocalRef || we.mediaType === "video" || we.mediaType === "audio" || q.current.has(X) || Q.current.has(X) || !(X.startsWith("blob:") || X.startsWith("data:image") && X.length > 1e5)) continue;
        Q.current.add(X);
        const re = X;
        Ix(re, 256).then(({
          url: fe
        }) => {
          Q.current.delete(re), ne.current.has(re) && (q.current.add(re), W(ye => !ne.current.has(re) || ye[re] ? ye : {
            ...ye,
            [re]: fe
          }));
        }).catch(() => {
          Q.current.delete(re);
        });
      }
      return () => {
        ne.current = new Set();
      };
    }, [Y]);
    const de = g.useCallback(ce => {
        const we = ((t == null ? void 0 : t[u]) || []).filter(Boolean);
        we.includes(ce) && l(e, {
          settings: {
            ...t,
            [u]: we.filter(X => X !== ce)
          }
        });
      }, [e, t, u, l]),
      le = g.useCallback((ce, we) => {
        we.preventDefault(), we.stopPropagation();
        const X = String(ce || "").trim(),
          Z = E.findIndex(ye => String(ye).trim() === X),
          re = pU(X, {
            scopeNodeId: e,
            connections: r,
            nodes: a,
            imageSourceMap: j,
            connectionIndex: Z >= 0 ? Z : void 0
          });
        if (re && s) {
          s(ie => ie.flatMap(ae => {
            var be;
            if (ae.to !== e) return [ae];
            if ((be = ae.fromGroupNodeIds) != null && be.includes(re)) {
              const Ee = ae.fromGroupNodeIds.filter(xe => xe !== re);
              return Ee.length === 0 ? [] : [{
                ...ae,
                from: Ee[0],
                fromGroupNodeIds: Ee
              }];
            }
            return ae.from === re ? [] : [ae];
          })), de(X);
          const ye = ((t == null ? void 0 : t[d]) || []).filter(Boolean);
          ye.includes(X) && l(e, {
            settings: {
              ...t,
              [d]: ye.filter(ie => ie !== X)
            }
          });
          return;
        }
        const fe = ((t == null ? void 0 : t[d]) || []).filter(Boolean);
        fe.includes(X) && (l(e, {
          settings: {
            ...t,
            [d]: fe.filter(ye => ye !== X)
          }
        }), de(X));
      }, [j, E, e, t, d, r, a, s, l, de]),
      J = g.useCallback((ce, we) => {
        const X = _be(T, ce, we);
        X && (l(e, {
          settings: {
            ...t,
            [u]: X
          }
        }), S(null));
      }, [T, e, t, u, l]);
    if (T.length === 0 && !m && !f && !y && !b) return null;
    const pe = b || (y ? c.jsx("div", {
      role: v ? "button" : void 0,
      tabIndex: v ? 0 : void 0,
      className: `relative shrink-0 w-9 h-9 rounded border border-dashed flex items-center justify-center transition-colors ${v ? "cursor-pointer" : ""} ${n ? "border-zinc-700 bg-[#1f1f1f]/30 hover:border-zinc-600 hover:bg-zinc-800/50" : "border-zinc-300 bg-zinc-50 hover:border-zinc-400 hover:bg-zinc-100"}`,
      title: _,
      onClick: v ? ce => {
        ce.stopPropagation(), v();
      } : void 0,
      onKeyDown: v ? ce => {
        (ce.key === "Enter" || ce.key === " ") && (ce.preventDefault(), ce.stopPropagation(), v());
      } : void 0,
      children: c.jsx("svg", {
        width: "16",
        height: "16",
        viewBox: "0 0 20 20",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        "aria-hidden": !0,
        children: c.jsx("path", {
          d: "M10 5V15M5 10H15",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          className: n ? "text-zinc-600" : "text-zinc-400"
        })
      })
    }) : null);
    return c.jsxs("div", {
      className: `flex w-full items-start ${p}`,
      onDragOver: ce => {
        ce.preventDefault(), ce.stopPropagation(), ce.dataTransfer.dropEffect = "move";
      },
      onMouseDown: ce => ce.stopPropagation(),
      children: [k && C && A == null ? c.jsx(Syr, {
        anchorRect: C.rect,
        previewSrc: C.src,
        mediaType: C.mediaType,
        isDark: n,
        title: C.title
      }) : null, c.jsxs("div", {
        className: `flex flex-1 flex-wrap items-center gap-1.5 overflow-visible ${m || y || b ? "pt-2.5 pl-2.5 pr-1" : "px-2 pt-2"}`,
        children: [m, Y.map((ce, we) => {
          var X;
          return c.jsx("div", {
            "data-image-reorder-thumb": !0,
            className: `relative shrink-0 cursor-grab active:cursor-grabbing touch-none select-none ${A === we ? n ? "scale-[0.97] ring-2 ring-white/40" : "scale-[0.97] ring-2 ring-zinc-400/70" : ""}`,
            title: ce.isLinked ? x("画布连线参考图，长按拖拽可调换顺序") : x("上传的参考图，长按拖拽可调换顺序"),
            draggable: !0,
            onMouseEnter: Z => {
              var ye, ie;
              if (!k || A != null) return;
              const re = K[ce.referenceThumbSrc] || ce.referenceThumbSrc || ce.imgSrc,
                fe = Ayr(Z.currentTarget, re);
              ce.mediaType !== "audio" && !fe || I({
                src: fe,
                rect: Z.currentTarget.getBoundingClientRect(),
                mediaType: ce.mediaType,
                title: ((ie = (ye = ce.sourceNode) == null ? void 0 : ye.nodeName) == null ? void 0 : ie.trim()) || (ce.mediaType === "video" ? "视频" : ce.mediaType === "audio" ? "音频" : "图片")
              });
            },
            onMouseLeave: () => {
              I(null);
            },
            onDragStart: Z => {
              if (Z.target.closest("button")) {
                Z.preventDefault();
                return;
              }
              Z.dataTransfer.setData("text/plain", String(we)), Z.dataTransfer.effectAllowed = "move", Z.stopPropagation(), S(we), I(null);
              const re = Z.currentTarget;
              requestAnimationFrame(() => {
                re.style.opacity = "1";
              });
            },
            onDragEnd: Z => {
              Z.stopPropagation(), Z.currentTarget.style.opacity = "", S(null);
            },
            onDragOver: Z => {
              Z.preventDefault(), Z.stopPropagation(), Z.dataTransfer.dropEffect = "move";
            },
            onDrop: Z => {
              Z.preventDefault(), Z.stopPropagation(), S(null);
              const re = Number(Z.dataTransfer.getData("text/plain"));
              !Number.isNaN(re) && re !== we && J(re, we);
            },
            children: c.jsxs("div", {
              className: "group/frame relative h-9 w-9 shrink-0",
              children: [c.jsx("span", {
                className: `pointer-events-none absolute left-0 top-0 z-[3] flex h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-[8px] font-semibold leading-none shadow-sm ${n ? "border-zinc-500/80 bg-[#1f1f1f] text-white" : "border-zinc-300 bg-zinc-100 text-zinc-800"}`,
                children: we + 1
              }), c.jsx("button", {
                type: "button",
                onMouseDown: Z => {
                  Z.preventDefault(), Z.stopPropagation();
                },
                onClick: Z => le(ce.imgSrc, Z),
                className: "absolute -right-1 -top-1 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-black opacity-0 transition-opacity group-hover/frame:opacity-100",
                title: x("移除参考图"),
                children: c.jsx(Na, {
                  className: "h-3 w-3 text-white",
                  strokeWidth: 2,
                  "aria-hidden": !0
                })
              }), c.jsx("div", {
                className: `relative h-9 w-9 overflow-hidden rounded border ${w ? "cursor-pointer" : ""} ${n ? "border-zinc-700 bg-[#1f1f1f]" : "border-zinc-300 bg-zinc-100"}`,
                title: w ? x("点击插入 {0} 标签", gKe(ce.mediaType, we + 1)) : void 0,
                onClick: w ? Z => {
                  Z.stopPropagation(), w(we);
                } : void 0,
                children: c.jsx(ZQ, {
                  rawUrl: ce.imgSrc,
                  displaySrc: K[ce.referenceThumbSrc] || ce.referenceThumbSrc || ce.imgSrc,
                  mediaType: ce.mediaType,
                  sourceNode: ce.sourceNode,
                  className: "h-full w-full object-cover",
                  alt: x("参考{0} {1}", ce.mediaType === "video" ? "视频" : ce.mediaType === "audio" ? "音频" : "图", we + 1),
                  isDark: n,
                  isLoading: ce.isResolvingLocalRef,
                  blobRecoveryAssetIds: ce.refAssetId ? [ce.refAssetId] : void 0
                })
              })]
            })
          }, Eae({
            idx: we,
            sourceNodeId: (X = ce.sourceNode) == null ? void 0 : X.id,
            assetId: ce.refAssetId
          }));
        }), pe]
      }), f ? c.jsx("div", {
        className: "ml-auto shrink-0 self-center pt-2 pr-1",
        children: f
      }) : null]
    });
  },
  d8o = ({
    nodeId: e,
    inputRef: t,
    value: n,
    onChange: r,
    isDark: a,
    isEditingImage: i,
    editImageModelId: o,
    onSubmit: s,
    promptExpanded: l,
    onPromptExpandedChange: d,
    expandControlOnReferenceStrip: u = !1,
    onExpandControlChange: h,
    alwaysShowExpandControl: p = !1,
    showSubmitButton: m = !0,
    assetItems: f,
    assetCategories: y,
    onSelectAsset: b,
    referenceItems: v,
    onPasteReferenceUrl: _
  }) => {
    on();
    const w = i || !o;
    return c.jsxs("div", {
      className: "flex w-full min-w-0 flex-col",
      children: [c.jsx(cEe, {
        nodeId: `edit-image-${e}`,
        nodeType: "gen-image",
        value: n,
        onChange: r,
        placeholder: x("输入提示词..."),
        isDark: a,
        assetAtMentionItems: f,
        assetAtMentionCategories: y,
        onSelectAssetAtMention: b,
        promptExpanded: l,
        onPromptExpandedChange: d,
        compactFloatingPromptPanel: !0,
        expandControlOnReferenceStrip: u,
        onExpandControlChange: h,
        alwaysShowExpandControl: p,
        promptReferenceItems: v,
        onCmdEnterSubmit: s,
        editorRef: t,
        disabled: i,
        onPasteReferenceUrl: _
      }), m ? c.jsx("div", {
        className: "mt-1 flex w-full shrink-0 items-center justify-end",
        children: c.jsx("button", {
          type: "button",
          className: `shrink-0 rounded-md border p-1.5 transition-all active:scale-95 ${w ? a ? "cursor-not-allowed border-white/15 text-zinc-500" : "cursor-not-allowed border-zinc-200 text-zinc-400" : a ? "border-white/30 bg-transparent text-white hover:bg-white/5" : "border-gray-300 bg-transparent text-gray-900 hover:bg-black/5"}`,
          disabled: w,
          onMouseDown: k => k.stopPropagation(),
          onClick: k => {
            k.stopPropagation(), w || s();
          },
          title: x(i ? "改图生成中" : "开始改图（Ctrl+Enter）"),
          children: i ? c.jsx(Ua, {
            size: 12,
            className: "animate-spin"
          }) : c.jsx(Gc, {
            size: 12
          })
        })
      }) : null]
    });
  };

function u8o({
  api: e,
  embedded: t = !1
}) {
  var Yt, qe, kt;
  on();
  const {
      editImageBottomAnchorRef: n,
      editImageToolsAnchorRef: r,
      isDark: a,
      node: i,
      updateNode: o,
      connections: s,
      nodes: l,
      setConnections: d,
      getConnectedInputImages: u,
      getConnectedInputItems: h,
      activeDropdown: p,
      setActiveDropdown: m,
      suppressDropdownCloseBriefly: f,
      closeEditImageTool: y,
      editLayersCanUndo: b,
      editLayersCanRedo: v,
      undoEditImageLayers: _,
      redoEditImageLayers: w,
      editImageCanvasWorkspace: k,
      editImageMode: A,
      setEditImageMode: S,
      editImageRegionConfirmed: C,
      setEditImageRegionConfirmed: I,
      isEditImageEraserPainting: E,
      setIsEditImageEraserPainting: M,
      setIsEraserPainting: T,
      isEditImageLayerMoveMode: P,
      setIsEditImageLayerMoveMode: R,
      editImageExtraLayers: j,
      editImageError: B,
      setEditImageError: F,
      eraserBrushWidth: N,
      editImageEraserOpacity: G,
      editImageEraserFeather: z,
      setEraserBrushWidth: V,
      setEditImageEraserOpacity: O,
      setEditImageEraserFeather: L,
      setEditImageLayerEraserBlob: D,
      setEditImageEraserResetKey: U,
      setEraserModelId: H,
      setEditImageEraserReadyLayerKey: Y,
      editImageModelId: K,
      setEditImageModelId: W,
      editImageConfigList: Q,
      isEditImageToolbarCompact: q,
      editImageGpt2CustomToolbarReservedPx: ne,
      editImageModelBtnRef: de,
      editImageModelConfig: le,
      isEditingImage: J,
      isEditImageModelDropdownOpen: pe,
      editImageActiveNodeId: ce,
      editImageModelDropdownMenuWidth: we,
      editImageModelMenuRef: X,
      getEraserModelDisplayName: Z,
      setEditImageResolution: re,
      setEditImageRatio: fe,
      editImageGlobalOssEnabled: ye,
      editImageOssConfigured: ie,
      editImageMediaHostingProvider: ae,
      editImageGenUseAliyunOss: be,
      setEditImageGenUseAliyunOss: Ee,
      nodeSettingsRef: xe,
      showEditImageThirdPartyPlatformUi: he,
      editImagePlatformGroup: ue,
      isEditImageGpt2SizeToolbar: ge,
      editImageRatio: _e,
      editImageRatioOptions: ke,
      editImageResolution: ve,
      editImageResolutionOptions: Te,
      isEditImageGpt2FmtDropdownOpen: Ne,
      insertEditImageAtReference: me,
      editImageSourceLeadingSlot: Ae,
      editImagePromptExpandControl: Fe,
      setEditImagePromptExpandControl: Me,
      editImagePromptRef: Re,
      editImagePrompt: $e,
      setEditImagePrompt: rt,
      handleEditImageUse: nt,
      editImageSourcePreviewSrc: ze,
      editImageAllRefs: Le,
      editImagePromptReferenceItems: Ke,
      editImageMergedAtMentionItems: Xe,
      editImageAssetAtMentionCategories: De,
      handleEditImageSelectAssetAtMention: Ye,
      handleEditImageRefPaste: Ce,
      appendEditImageUploadedRefs: He,
      onStartCanvasReferencePick: Ve,
      canvasPickActive: it = !1
    } = e,
    It = g.useRef(null),
    {
      visibleModels: Ft,
      selectedChannel: We,
      onSelectChannel: Ze,
      menuWidth: Ge,
      showHaiyiChannel: Oe
    } = zZ(Q),
    st = g.useMemo(() => Ft.map(St => St.id), [Ft]),
    vt = le ? JU(le) : "Model",
    Ht = J || !K,
    nn = Le.length < w5,
    pt = !E && !P && (A === "whole" || C),
    lt = E ? "在当前图层上涂抹要移除的区域" : P ? "按住图片中的当前图层拖动位置" : A === "region" && !C ? "在图片上拖拽框选需要修改的区域" : "",
    gt = async St => {
      if (!(St != null && St.length)) return;
      const hn = [];
      for (const Qt of Array.from(St)) if (Qt.type.startsWith("image/")) try {
        const Ot = await new Promise((ln, Pn) => {
          const rn = new FileReader();
          rn.onload = () => ln(String(rn.result || "")), rn.onerror = () => Pn(rn.error), rn.readAsDataURL(Qt);
        });
        hn.push(await Er.storeImageUrlAsRef(Ot));
      } catch {
        F("参考图上传失败");
      }
      hn.length && (F(null), await He(hn));
    },
    Ut = St => `flex h-8 items-center justify-center gap-1 rounded-xl text-xs transition-colors ${k ? "w-8 px-0" : "px-2"} ${St ? a ? "bg-white/12 text-white" : "bg-[#1f1f1f] text-white" : a ? "text-zinc-300 hover:bg-white/10" : "text-zinc-600 hover:bg-zinc-100"}`,
    _t = c.jsxs("div", {
      className: `flex min-h-11 items-center gap-1 px-2 py-1 overflow-x-auto rh-scroll-minimal ${k ? `w-max max-w-[calc(100vw-24px)] rounded-full border ${a ? "border-zinc-800 bg-[#1f1f1f]" : "border-[rgba(0,0,0,0.18)] bg-white"}` : `${pt || E ? "border-b" : ""} ${a ? "border-white/[0.08] bg-black/10" : "border-zinc-200 bg-zinc-50"}`}`,
      children: [!k || !pt ? c.jsx("button", {
        type: "button",
        className: `flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm transition-colors ${a ? "hover:bg-white/10 text-zinc-300" : "hover:bg-zinc-100 text-zinc-500"}`,
        onClick: () => void y(),
        title: x("关闭改图"),
        children: "×"
      }) : null, k ? c.jsxs(c.Fragment, {
        children: [c.jsx("button", {
          type: "button",
          disabled: !b,
          className: `flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors ${b ? a ? "text-zinc-200 hover:bg-white/10" : "text-zinc-700 hover:bg-zinc-100" : "cursor-not-allowed opacity-30"}`,
          title: x("撤销图层操作"),
          onClick: _,
          children: c.jsx(d_, {
            size: 14
          })
        }), c.jsx("button", {
          type: "button",
          disabled: !v,
          className: `flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors ${v ? a ? "text-zinc-200 hover:bg-white/10" : "text-zinc-700 hover:bg-zinc-100" : "cursor-not-allowed opacity-30"}`,
          title: x("重做图层操作"),
          onClick: w,
          children: c.jsx(J$, {
            size: 14
          })
        })]
      }) : null, c.jsx("div", {
        className: `mr-1 h-6 w-px ${a ? "bg-white/10" : "bg-zinc-200"}`
      }), c.jsxs("button", {
        type: "button",
        className: Ut(A === "whole" && !E && !P),
        onClick: () => {
          M(!1), R(!1), S("whole");
        },
        title: x("整图改图"),
        children: [c.jsx(lo, {
          size: 14
        }), c.jsx("span", {
          className: k ? "sr-only" : "",
          children: x("整图")
        })]
      }), c.jsxs("button", {
        type: "button",
        className: Ut(A === "region"),
        onClick: () => {
          if (A === "region") S("whole"), I(!1);else {
            S("region"), I(!1);
            const St = {
              ...(i.settings || {})
            };
            delete St.editImageSelection, o(i.id, {
              settings: St
            });
          }
        },
        title: x(A === "region" ? "退出局部框选（切回整图）" : "局部框选改图：在图片上拖出选区"),
        children: [c.jsx(Sf, {
          size: 14
        }), c.jsx("span", {
          className: k ? "sr-only" : "",
          children: x("局部")
        })]
      }), c.jsxs("button", {
        type: "button",
        className: `flex h-8 items-center justify-center gap-1 rounded-xl text-xs ${k ? "w-8 px-0" : "px-2"} ${a ? "text-zinc-400 hover:bg-white/10" : "text-zinc-500 hover:bg-zinc-100"}`,
        onClick: () => S("region"),
        title: x("画笔蒙版后续接入；当前会切到局部选区"),
        children: [c.jsx(Vue, {
          size: 14
        }), c.jsx("span", {
          className: k ? "sr-only" : "",
          children: x("画笔")
        })]
      }), c.jsxs("button", {
        type: "button",
        className: Ut(E),
        title: j.length ? x("在选中的改图图层上涂抹并补缺") : x("请先生成改图结果图层"),
        disabled: !j.length,
        onClick: () => {
          if (!j.length) {
            F("请先生成改图结果图层后再使用橡皮");
            return;
          }
          F(null), T(!1), R(!1), K && H(K), Y(null), M(St => !St);
        },
        children: [c.jsx(uI, {
          size: 14
        }), c.jsx("span", {
          className: k ? "sr-only" : "",
          children: x("橡皮")
        })]
      }), c.jsxs("button", {
        type: "button",
        className: Ut(P),
        title: j.length ? x("在图片区域内拖动移动当前选中图层") : x("请先生成改图结果图层"),
        disabled: !j.length,
        onClick: () => {
          if (!j.length) {
            F("请先生成改图结果图层后再使用移动");
            return;
          }
          F(null), M(!1), R(St => !St);
        },
        children: [c.jsx(RY, {
          size: 14
        }), c.jsx("span", {
          className: k ? "sr-only" : "",
          children: x("移动")
        })]
      }), k ? null : c.jsx("div", {
        className: `mx-1 h-6 w-px ${a ? "bg-white/10" : "bg-zinc-200"}`
      }), c.jsx("span", {
        className: `${k ? "sr-only" : ""} whitespace-nowrap text-[11px] ${a ? "text-zinc-500" : "text-zinc-400"}`,
        children: lt || x("生成结果输出为新节点，不覆盖原图")
      }), k ? c.jsxs(c.Fragment, {
        children: [c.jsx("div", {
          className: `mx-1 h-6 w-px shrink-0 ${a ? "bg-white/10" : "bg-zinc-200"}`
        }), c.jsx(ufn, {
          isDark: a,
          compact: !0,
          brushWidth: N,
          brushOpacity: G,
          brushFeather: z,
          onBrushWidth: V,
          onBrushOpacity: O,
          onBrushFeather: L,
          onClear: () => {
            D(null), U(St => St + 1);
          }
        })]
      }) : null]
    }),
    At = B ? c.jsx("div", {
      className: `mx-auto mt-2 max-w-[560px] rounded-lg px-3 py-1.5 text-xs shadow-lg ${a ? "bg-red-950/95 text-red-200 border border-red-500/30" : "bg-red-50 text-red-700 border border-red-200"}`,
      children: B
    }) : null;
  return c.jsxs(c.Fragment, {
    children: [k ? c.jsxs(AAe, {
      open: !0,
      anchorRef: r,
      isDark: a,
      placement: "below",
      align: "center",
      gap: 8,
      matchAnchorWidth: !1,
      unstyled: !0,
      dataPortalAttr: "data-edit-image-tools-toolbar",
      className: "w-fit max-w-[calc(100vw-24px)]",
      children: [_t, pt ? null : At]
    }) : null, pt || !t && !k || t && B ? c.jsxs(AAe, {
      inline: t,
      open: !0,
      anchorRef: n,
      isDark: a,
      placement: "below",
      align: "center",
      gap: t ? 16 : k ? 8 : 28,
      matchAnchorWidth: k && pt,
      unstyled: !0,
      dataPortalAttr: "data-edit-image-bottom-panel",
      className: pt ? k ? "w-[min(860px,calc(100vw-48px))]" : "w-[min(860px,94vw)]" : "w-[min(650px,calc(100vw-32px))] max-w-[calc(100vw-32px)]",
      children: [c.jsxs("div", {
        "data-edit-image-composer": !0,
        "data-prompt-expanded": !!((Yt = i.settings) != null && Yt.editImagePromptExpanded),
        className: `${L0r(a)} relative`,
        children: [c.jsx("input", {
          ref: It,
          type: "file",
          accept: "image/*",
          multiple: !0,
          className: "hidden",
          onChange: St => {
            gt(St.target.files), St.target.value = "";
          }
        }), pt && !t ? c.jsx("div", {
          className: "px-2 pt-2",
          children: c.jsx(c8o, {
            scopeNodeId: i.id,
            nodeSettings: i.settings || {},
            isDark: a,
            connections: s,
            nodes: l,
            getConnectedInputImages: u,
            getConnectedInputItems: h,
            setConnections: d,
            updateNode: o,
            settingsReferenceImagesKey: "editImageReferenceImages",
            settingsOrderKey: "editImageInputImageOrder",
            maxCount: w5,
            onInsertAtReference: me,
            leadingSlot: Ae,
            trailingSlot: Fe,
            showPlusSlot: nn,
            plusSlotContent: nn ? c.jsx(pZe, {
              isDark: a,
              active: it,
              title: x("从画布选择可连接的参考节点"),
              onClick: () => {
                var St;
                if (Ve) {
                  Ve();
                  return;
                }
                (St = It.current) == null || St.click();
              }
            }) : void 0,
            className: "overflow-visible",
            showHoverPreview: !1
          })
        }) : null, !k && !t ? _t : null, E && !k && c.jsx("div", {
          className: "px-3 pb-2",
          children: c.jsx(ufn, {
            isDark: a,
            brushWidth: N,
            brushOpacity: G,
            brushFeather: z,
            onBrushWidth: V,
            onBrushOpacity: O,
            onBrushFeather: L,
            onClear: () => {
              D(null), U(St => St + 1);
            }
          })
        }), pt ? c.jsxs("div", {
          className: "flex min-h-0 w-full min-w-0 flex-col px-2 pb-2.5 pt-0",
          children: [c.jsx("div", {
            "data-edit-image-prompt": !0,
            className: "group/prompt relative mb-1 min-w-0 w-full shrink-0 overflow-hidden px-0.5",
            onMouseDown: St => St.stopPropagation(),
            onWheel: St => St.stopPropagation(),
            children: c.jsx(d8o, {
              nodeId: i.id,
              inputRef: Re,
              value: $e,
              onChange: rt,
              isDark: a,
              isEditingImage: J,
              editImageModelId: K,
              onSubmit: () => void nt(),
              promptExpanded: !!((qe = i.settings) != null && qe.editImagePromptExpanded),
              onPromptExpandedChange: St => {
                o(i.id, {
                  settings: {
                    ...i.settings,
                    editImagePromptExpanded: St
                  }
                });
              },
              expandControlOnReferenceStrip: !!ze || Le.length > 0,
              onExpandControlChange: Me,
              alwaysShowExpandControl: k,
              showSubmitButton: !1,
              assetItems: Xe,
              assetCategories: De,
              onSelectAsset: Ye,
              referenceItems: Ke,
              onPasteReferenceUrl: St => void Ce(St)
            })
          }), c.jsxs("div", {
            "data-qiaodoumayi-gen-toolbar": "true",
            className: "qiaodoumayi-gen-toolbar flex items-center justify-start shrink-0 relative min-h-[34px] w-full min-w-0 overflow-visible px-0.5 gap-2 rounded-b-[18px]",
            children: [k ? c.jsx("button", {
              type: "button",
              className: `flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm transition-colors ${a ? "hover:bg-white/10 text-zinc-300" : "hover:bg-zinc-100 text-zinc-500"}`,
              onClick: () => void y(),
              title: x("关闭改图"),
              children: "×"
            }) : null, Q.length > 0 ? c.jsxs("div", {
              className: "relative overflow-visible shrink-0",
              "data-model-select-area": !0,
              children: [c.jsxs("button", {
                ref: de,
                type: "button",
                "data-qiaodoumayi-gen-model": "true",
                disabled: J,
                title: le ? vt : void 0,
                onPointerDown: St => {
                  St.button === 0 && (St.preventDefault(), St.stopPropagation(), !(!m || J) && (pe || f(), m(hn => (hn == null ? void 0 : hn.nodeId) === ce && (hn == null ? void 0 : hn.type) === "edit-image-model" ? null : {
                    nodeId: ce,
                    type: "edit-image-model"
                  })));
                },
                onMouseDown: St => {
                  St.preventDefault(), St.stopPropagation();
                },
                className: `node-dropdown-button flex items-center gap-1 pl-1 py-1 rounded text-[10px] transition-colors border w-full max-w-full pr-1 ${a ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
                children: [c.jsx(Mp, {
                  modelId: K,
                  kind: "image",
                  isDark: a,
                  config: le,
                  size: 13,
                  fallback: c.jsx(lo, {
                    size: 13,
                    className: "shrink-0 block",
                    "aria-hidden": !0
                  })
                }), c.jsx("span", {
                  className: "min-w-0 flex-1 truncate font-semibold leading-none self-center",
                  children: x(vt)
                })]
              }), c.jsx(Tv, {
                open: !!(m && pe),
                anchorRef: de,
                isDark: a,
                menuWidth: Math.max(we, Ge),
                maxHeight: 360,
                placement: "above",
                scrollToSelectedKey: K,
                scrollFamilyIds: gVn,
                orderedOptionKeys: st,
                header: c.jsx(m9, {
                  isDark: a,
                  selected: We,
                  onSelect: Ze,
                  showHaiyi: Oe
                }),
                children: c.jsx("div", {
                  ref: X,
                  children: c.jsx($wr, {
                    configs: Ft,
                    selectedId: K,
                    isDark: a,
                    variant: "edit",
                    label: St => JU(St) || Z(St),
                    onSelect: St => {
                      const hn = T$t(St, i.settings || {}, !0);
                      o(i.id, {
                        settings: hn
                      }), W(St), re(GE(St, String(hn.gptImage2Resolution || hn.resolution || ""))), fe(IUt(St, String(hn.gptImage2AspectRatio || hn.ratio || _e))), ulo(St), m == null || m(null);
                    }
                  })
                })
              })]
            }) : null, c.jsx(i8o, {
              nodeId: ce,
              isDark: a,
              activeDropdown: p ?? null,
              setActiveDropdown: m,
              officialSize: ge,
              modelId: K,
              settings: i.settings || {},
              ratio: _e,
              resolution: ve,
              ratios: ke,
              resolutions: Te,
              onPatch: St => {
                o(i.id, {
                  settings: {
                    ...(i.settings || {}),
                    ...St
                  }
                });
                const hn = St.gptImage2AspectRatio ?? St.ratio,
                  Qt = St.gptImage2Resolution ?? St.resolution;
                hn != null && fe(String(hn)), Qt != null && re(String(Qt));
              },
              onRemember: St => cl(K, St)
            }), c.jsxs("div", {
              className: "qiaodoumayi-gen-params min-w-0 flex shrink-0 flex-nowrap items-center gap-x-0.5 overflow-visible",
              children: [!ye && ie ? c.jsxs("label", {
                className: `${q ? "px-1.5" : "px-2"} py-1 text-[10px] rounded border transition-colors flex items-center gap-1 cursor-pointer shrink-0 whitespace-nowrap ${a ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
                onMouseDown: St => St.stopPropagation(),
                title: Jk(ae),
                children: [c.jsx("input", {
                  type: "checkbox",
                  checked: be,
                  disabled: J,
                  onChange: St => {
                    const hn = St.target.checked;
                    Ee(hn);
                    const Qt = {
                      ...xe.current
                    };
                    o(i.id, {
                      settings: {
                        ...Qt,
                        genUseAliyunOss: hn
                      }
                    });
                  },
                  className: "h-3 w-3 cursor-pointer shrink-0"
                }), c.jsx("span", {
                  className: "whitespace-nowrap",
                  title: $g(ae),
                  children: Fhr($g(ae), q)
                })]
              }) : null, he ? c.jsx("div", {
                className: "shrink-0",
                onMouseDown: St => St.stopPropagation(),
                children: c.jsx(Ku, {
                  nodeId: i.id,
                  platformGroup: ue,
                  modelName: (le == null ? void 0 : le.modelName) || K,
                  modelId: K,
                  modelConfigId: K,
                  uiResolution: ve,
                  isDark: a,
                  nodeSettings: i.settings,
                  updateNode: o,
                  compact: !1,
                  truncateHead3: !1,
                  plainTextButtonLabel: !0,
                  buttonVariant: "square",
                  menuPlacement: "above",
                  className: "!max-w-none"
                })
              }) : null, pk(K) ? c.jsx(o8o, {
                value: String(((kt = i.settings) == null ? void 0 : kt.gptImageOutputFormat) || "png"),
                open: Ne,
                disabled: J,
                isDark: a,
                onToggle: () => {
                  m && (Ne || f(), m(St => (St == null ? void 0 : St.nodeId) === ce && St.type === "edit-gpt2_fmt" ? null : {
                    nodeId: ce,
                    type: "edit-gpt2_fmt"
                  }));
                },
                onSelect: St => {
                  o(i.id, {
                    settings: {
                      ...(i.settings || {}),
                      gptImageOutputFormat: St
                    }
                  }), cl(K, {
                    gptImageOutputFormat: St
                  }), m == null || m(null);
                }
              }) : null]
            }), c.jsx("span", {
              className: "qiaodoumayi-gen-submit-wrap inline-flex items-center shrink-0 ml-auto",
              children: c.jsx("button", {
                type: "button",
                "aria-label": x("开始改图"),
                className: "qiaodoumayi-gen-submit shrink-0 active:scale-95",
                disabled: Ht,
                onMouseDown: St => St.stopPropagation(),
                onClick: St => {
                  St.stopPropagation(), Ht || nt();
                },
                title: x(J ? "改图生成中" : "开始改图（Ctrl+Enter）"),
                children: J ? c.jsx(Ua, {
                  size: 16,
                  className: "animate-spin",
                  "aria-hidden": !0
                }) : c.jsx(Gc, {
                  size: 16,
                  strokeWidth: 2.5,
                  "aria-hidden": !0
                })
              })
            })]
          })]
        }) : null]
      }), At]
    }) : null]
  });
}

const h8o = Object.freeze(Object.defineProperty({
    __proto__: null,
    InputImageEditBottomPanel: u8o
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  p8o = 52;

function m8o({
  api: e
}) {
  var ln, Pn;
  on();
  const t = g.useRef(null);
  Qp(t, "50% 100%", !0);
  const {
      isToolbarHoveredRef: n,
      syncSuppressHoverUi: r,
      isSelected: a,
      isDark: i,
      canvasZoomMediaOpacity: o,
      isAnglePanelOpen: s,
      setIsAnglePanelOpen: l,
      isCropSelectMode: d,
      setIsCropSelectMode: u,
      isImage: h,
      isVideo: p,
      setNodes: m,
      setConnections: f,
      generateIdProp: y,
      isExtractingFrames: b,
      videoFrameExtractMenuRef: v,
      isVideoFrameExtractOpen: _,
      setIsVideoFrameExtractOpen: w,
      setIsToolsMenuOpen: k,
      handleExtractFirstLastFrames: A,
      handleExtractCurrentFrame: S,
      toolsMenuRef: C,
      isToolsMenuOpen: I,
      hasCanvasNode: E,
      isMarkerMode: M,
      setIsMarkerMode: T,
      isAnnotationOpen: P,
      setIsAnnotationOpen: R,
      isEraserToolOpen: j,
      setIsEraserToolOpen: B,
      setEraseError: F,
      setEraserMaskBlob: N,
      setEraserSaveMeta: G,
      setIsEraserPainting: z,
      isLightPanelOpen: V,
      setIsLightPanelOpen: O,
      isPortraitTexturePanelOpen: L,
      setIsPortraitTexturePanelOpen: D,
      isFaceRetouchOpen: U,
      setIsFaceRetouchOpen: H,
      isMoodAdjustPanelOpen: Y,
      setIsMoodAdjustPanelOpen: K,
      isColorAdjustPanelOpen: W,
      setIsColorAdjustPanelOpen: Q,
      setColorAdjustPreviewParams: q,
      isLutColorPanelOpen: ne,
      setIsLutColorPanelOpen: de,
      isVideoDepthDialogOpen: le,
      setIsVideoDepthDialogOpen: J,
      isImageDepthProcessing: pe,
      handleImageDepth: ce,
      isImageCutoutOpen: we,
      setIsImageCutoutOpen: X,
      isVideoAspectCropOpen: Z,
      setIsVideoAspectCropOpen: re,
      isVideoTrimOpen: fe,
      setIsVideoTrimOpen: ye,
      isVideoReverseOpen: ie,
      setIsVideoReverseOpen: ae,
      isVideoExtractAudioOpen: be,
      setIsVideoExtractAudioOpen: Ee,
      isVideoCompressOpen: xe,
      setIsVideoCompressOpen: he,
      isVideoToGifOpen: ue,
      setIsVideoToGifOpen: ge,
      isPanoramaPanelOpen: _e,
      setIsPanoramaPanelOpen: ke,
      isGridSplitModalOpen: ve,
      setIsGridSplitModalOpen: Te,
      setGridSplitSourceUrl: Ne,
      handleOpenGridSplit: me,
      handleQuickGridSplit: Ae,
      isFreeSplitModalOpen: Fe,
      setIsFreeSplitModalOpen: Me,
      setFreeSplitSourceUrl: Re,
      handleOpenFreeSplit: $e,
      isLayerSplitOpen: rt,
      isLayerSplitProcessing: nt,
      onLayerSplitCustom: ze,
      onLayerSplitExit: Le,
      expandModalOpen: Ke,
      showExpandTool: Xe,
      handleOpenExpand: De,
      isXianyiRembgProcessing: Ye,
      handleRemoveBackgroundXianyi: Ce,
      isTextEditPanelOpen: He,
      setIsTextEditPanelOpen: Ve,
      clearTextEditSaved: it,
      node: It,
      isMoveObjectPanelOpen: Ft,
      setIsMoveObjectPanelOpen: We,
      ensureRembgLinked: Ze,
      ensureImageInfoJsonLinked: Ge,
      isHighlighted: Oe,
      handleToggleHighlight: st,
      handleOpenCanvas: vt,
      ensureHdUpscaleLinked: Ht,
      handleChangeImage: nn,
      displayContent: pt,
      videoPlaybackSrc: lt,
      handleInputImageDownload: gt,
      handleDoubleClick: Ut
    } = e,
    {
      itemKeys: _t,
      setItemKeys: At,
      orderModalOpen: Yt,
      setOrderModalOpen: qe
    } = Fwr(),
    kt = (rn = !1, Yn = "") => $P(i, rn, Yn),
    St = (rn = !1) => `flex w-full items-center gap-2 whitespace-nowrap px-3.5 py-2 text-left text-xs transition-colors ${rn ? i ? "bg-white/10 text-white" : "bg-zinc-100 text-zinc-900" : i ? "text-zinc-100 hover:bg-white/10" : "text-zinc-800 hover:bg-zinc-100"}`,
    hn = I || Oe || le || Z || fe || ie || be || xe || ue || ne || h && (M || P || E || j || V || L || U || Y || W || ne || _e || ve || Fe || rt || nt || Ke || He || Ft || Ye || pe || we),
    Qt = () => {
      l(!1), O(!1), K(!1), T(!1), Ve(!1), We(!1), B(!1), J(!1), re(!1), ye(!1), ae(!1), Ee(!1), he(!1), ge(!1), X(!1), H(!1), Le();
    },
    Ot = rn => {
      const Yn = _t.indexOf(rn);
      return {
        order: Yn < 0 ? 999 : Yn
      };
    };
  return c.jsxs("div", {
    className: "absolute left-1/2 bottom-full z-[120] -translate-x-1/2 transition-opacity duration-200 ease-out",
    "data-input-image-toolbar": !0,
    onMouseEnter: () => {
      n.current = !0, r();
    },
    onMouseLeave: () => {
      n.current = !1, r();
    },
    onDoubleClick: rn => {
      rn.preventDefault(), rn.stopPropagation();
    },
    style: {
      marginBottom: `${p8o}px`,
      opacity: o,
      pointerEvents: a ? "auto" : "none"
    },
    children: [c.jsx("div", {
      ref: t,
      style: {
        transition: "none",
        willChange: "transform"
      },
      children: c.jsx("div", {
        className: a ? "canvas-top-toolbar-enter" : "canvas-top-toolbar-exit pointer-events-none",
        onClick: rn => rn.stopPropagation(),
        onPointerDown: rn => rn.stopPropagation(),
        onMouseDown: rn => rn.stopPropagation(),
        children: c.jsx("div", {
          "data-canvas-pin-toolbar": "",
          "data-canvas-float-toolbar": "",
          className: UP(i),
          children: c.jsxs("div", {
            className: "flex items-center",
            children: [h ? c.jsx("button", {
              type: "button",
              className: kt(s),
              "data-toolbar-active": s ? "true" : "false",
              onClick: rn => {
                rn.stopPropagation(), k(!1), w(!1), l(!s), s || (O(!1), K(!1), T(!1), Ve(!1), We(!1), B(!1));
              },
              "data-tip": x(s ? "关闭角度面板" : "角度调整"),
              children: c.jsx(A$t, {
                size: 16
              })
            }) : null, h ? c.jsx("button", {
              type: "button",
              className: kt(d),
              "data-toolbar-active": d ? "true" : "false",
              onClick: rn => {
                rn.stopPropagation(), k(!1), w(!1), u(!d), d || Qt();
              },
              "data-tip": x(d ? "退出框选" : "框选裁剪区域"),
              children: c.jsx(Sf, {
                size: 16
              })
            }) : null, h ? c.jsx("button", {
              type: "button",
              className: kt(!1),
              "data-toolbar-active": "false",
              onClick: rn => {
                rn.stopPropagation(), k(!1), w(!1), r$e(It);
              },
              "data-tip": x("智能改图"),
              children: c.jsx(SP, {
                size: 16
              })
            }) : null, p && m && f && y && c.jsxs("div", {
              className: "relative flex items-center",
              children: [c.jsx("button", {
                ref: v,
                type: "button",
                className: kt(_ || b, b ? i ? "!text-zinc-500 !cursor-wait" : "!text-zinc-400 !cursor-wait" : ""),
                disabled: b,
                onClick: rn => {
                  rn.stopPropagation(), !b && (k(!1), w(Yn => !Yn));
                },
                "data-tip": x(b ? "提取中…" : "提取视频帧"),
                children: b ? c.jsx(Ua, {
                  size: 16,
                  className: "animate-spin"
                }) : c.jsx(wb, {
                  size: 16
                })
              }), c.jsxs(yg, {
                open: _ && !b,
                anchorRef: v,
                isDark: i,
                placement: "below",
                align: "center",
                gap: 6,
                dataPortalAttr: "data-input-image-video-frame-menu",
                minWidth: 136,
                className: "inline-flex w-max flex-col py-1.5",
                zIndex: 10200,
                children: [c.jsx("button", {
                  type: "button",
                  className: St(!1),
                  onClick: () => {
                    w(!1), A();
                  },
                  children: x("提取首尾帧")
                }), c.jsx("button", {
                  type: "button",
                  className: St(!1),
                  onClick: () => {
                    w(!1), S();
                  },
                  children: x("提取当前帧")
                })]
              })]
            }), c.jsxs("div", {
              className: "flex items-center",
              children: [c.jsxs("div", {
                className: `relative flex items-center${p ? " order-2" : ""}`,
                children: [c.jsx("button", {
                  ref: C,
                  type: "button",
                  className: `relative ${kt(hn, hn ? "!text-white" : "")}`,
                  "data-toolbar-active": hn ? "true" : "false",
                  onClick: rn => {
                    rn.stopPropagation(), w(!1), k(Yn => !Yn);
                  },
                  "data-tip": x("工具"),
                  children: c.jsx(hw, {
                    size: 16
                  })
                }), c.jsxs(yg, {
                  open: I,
                  anchorRef: C,
                  isDark: i,
                  placement: "below",
                  align: "center",
                  gap: 6,
                  dataPortalAttr: "data-input-image-tools-menu",
                  minWidth: 136,
                  className: "inline-flex max-h-[min(22rem,70vh)] w-max flex-col overflow-y-auto py-1.5 minimal-scrollbar",
                  zIndex: 10200,
                  children: [h ? c.jsxs("button", {
                    type: "button",
                    style: Ot("canvas"),
                    className: St(E),
                    onClick: () => {
                      k(!1), vt();
                    },
                    children: [c.jsx(Vue, {
                      size: 14,
                      className: "shrink-0"
                    }), c.jsx("span", {
                      children: x(E ? "打开画板节点" : "创建画板节点")
                    })]
                  }) : null, h ? c.jsxs("button", {
                    type: "button",
                    style: Ot("marker"),
                    className: St(M),
                    onClick: () => {
                      k(!1);
                      const rn = !M;
                      T(rn), rn && (l(!1), O(!1), Ve(!1), We(!1), B(!1), R(!1));
                    },
                    children: [c.jsx(sxe, {
                      size: 14,
                      className: "shrink-0"
                    }), c.jsxs("span", {
                      className: "flex items-center gap-1.5",
                      children: [x(M ? "退出标记模式" : "标记模式"), It.markers && It.markers.length > 0 ? c.jsx("span", {
                        className: `h-1.5 w-1.5 rounded-full ${i ? "bg-blue-400" : "bg-blue-500"}`,
                        "aria-hidden": !0
                      }) : null]
                    })]
                  }) : null, c.jsxs("button", {
                    type: "button",
                    style: Ot("highlight"),
                    className: St(Oe),
                    onClick: () => {
                      k(!1), st();
                    },
                    children: [c.jsx(pEt, {
                      size: 14,
                      className: "shrink-0"
                    }), c.jsx("span", {
                      children: x(Oe ? "取消高亮" : "高亮显示")
                    })]
                  }), p ? c.jsxs("button", {
                    type: "button",
                    style: Ot("videoDepth"),
                    className: St(le),
                    onClick: () => {
                      if (k(!1), le) {
                        J(!1);
                        return;
                      }
                      Qt(), J(!0);
                    },
                    children: [c.jsx(kS, {
                      size: 14,
                      className: "shrink-0"
                    }), c.jsx("span", {
                      children: x(le ? "关闭深度提取" : "深度提取")
                    })]
                  }) : null, h ? c.jsxs("button", {
                    type: "button",
                    disabled: pe,
                    style: Ot("imageDepth"),
                    className: St(pe),
                    onClick: () => {
                      pe || (k(!1), X(!1), ce());
                    },
                    children: [pe ? c.jsx(Ua, {
                      size: 14,
                      className: "shrink-0 animate-spin"
                    }) : c.jsx(kS, {
                      size: 14,
                      className: "shrink-0"
                    }), c.jsx("span", {
                      children: x(pe ? "深度提取中…" : "深度提取")
                    })]
                  }) : null, h || p ? c.jsxs("button", {
                    type: "button",
                    style: Ot("videoAspectCrop"),
                    className: St(Z),
                    onClick: () => {
                      if (k(!1), Z) {
                        re(!1);
                        return;
                      }
                      u(!1), Qt(), re(!0);
                    },
                    children: [c.jsx(WEn, {
                      size: 14,
                      className: "shrink-0"
                    }), c.jsx("span", {
                      children: x(Z ? "关闭画幅裁切" : "画幅裁切")
                    })]
                  }) : null, p ? c.jsxs("button", {
                    type: "button",
                    style: Ot("videoTrim"),
                    className: St(fe),
                    onClick: () => {
                      if (k(!1), fe) {
                        ye(!1);
                        return;
                      }
                      Qt(), ye(!0);
                    },
                    children: [c.jsx(cxe, {
                      size: 14,
                      className: "shrink-0"
                    }), c.jsx("span", {
                      children: x(fe ? "关闭时长裁切" : "时长裁切")
                    })]
                  }) : null, p ? c.jsxs("button", {
                    type: "button",
                    style: Ot("videoReverse"),
                    className: St(ie),
                    onClick: () => {
                      if (k(!1), ie) {
                        ae(!1);
                        return;
                      }
                      Qt(), ae(!0);
                    },
                    children: [c.jsx(d_, {
                      size: 14,
                      className: "shrink-0"
                    }), c.jsx("span", {
                      children: x(ie ? "关闭时序倒置" : "时序倒置")
                    })]
                  }) : null, p ? c.jsxs("button", {
                    type: "button",
                    style: Ot("videoExtractAudio"),
                    className: St(be),
                    onClick: () => {
                      if (k(!1), be) {
                        Ee(!1);
                        return;
                      }
                      Qt(), Ee(!0);
                    },
                    children: [c.jsx(Q2, {
                      size: 14,
                      className: "shrink-0"
                    }), c.jsx("span", {
                      children: x(be ? "关闭提取音频" : "提取音频")
                    })]
                  }) : null, p ? c.jsxs("button", {
                    type: "button",
                    style: Ot("videoCompress"),
                    className: St(xe),
                    onClick: () => {
                      if (k(!1), xe) {
                        he(!1);
                        return;
                      }
                      Qt(), he(!0);
                    },
                    children: [c.jsx(fZ, {
                      size: 14,
                      className: "shrink-0"
                    }), c.jsx("span", {
                      children: x(xe ? "关闭视频压缩" : "视频压缩")
                    })]
                  }) : null, p ? c.jsxs("button", {
                    type: "button",
                    style: Ot("videoToGif"),
                    className: St(ue),
                    onClick: () => {
                      if (k(!1), ue) {
                        ge(!1);
                        return;
                      }
                      Qt(), ge(!0);
                    },
                    children: [c.jsx(FM, {
                      size: 14,
                      className: "shrink-0"
                    }), c.jsx("span", {
                      children: x(ue ? "关闭动图导出" : "动图导出")
                    })]
                  }) : null, h ? c.jsxs("button", {
                    type: "button",
                    style: Ot("eraser"),
                    className: St(j),
                    onClick: () => {
                      k(!1);
                      const rn = !j;
                      B(rn), rn ? (We(!1), R(!1), F(null), N(null), G({
                        ...z7
                      })) : z(!1);
                    },
                    children: [c.jsx(uI, {
                      size: 14,
                      className: "shrink-0"
                    }), c.jsx("span", {
                      children: x(j ? "关闭橡皮擦" : "橡皮擦")
                    })]
                  }) : null, h ? c.jsxs("button", {
                    type: "button",
                    style: Ot("annotation"),
                    className: St(P),
                    onClick: () => {
                      k(!1);
                      const rn = !P;
                      R(rn), rn && (l(!1), O(!1), T(!1), Ve(!1), We(!1), B(!1), Q(!1), de(!1), ke(!1), Te(!1), Me(!1));
                    },
                    children: [c.jsx(KHe, {
                      size: 14,
                      className: "shrink-0"
                    }), c.jsx("span", {
                      children: x(P ? "退出标注工具" : "标注工具")
                    })]
                  }) : null, h ? c.jsxs("button", {
                    type: "button",
                    style: Ot("relight"),
                    className: St(V),
                    onClick: () => {
                      k(!1), O(!V), V || (l(!1), K(!1), T(!1), Ve(!1), We(!1), B(!1), R(!1));
                    },
                    children: [c.jsx(PY, {
                      size: 14,
                      className: "shrink-0"
                    }), c.jsx("span", {
                      children: x(V ? "关闭重打光" : "重打光")
                    })]
                  }) : null, h ? c.jsxs("button", {
                    type: "button",
                    style: Ot("portraitTexture"),
                    className: St(L),
                    onClick: () => {
                      k(!1);
                      const rn = !L;
                      D(rn), rn && (l(!1), O(!1), K(!1), T(!1), Ve(!1), We(!1), B(!1), R(!1), Q(!1), de(!1), ke(!1), Te(!1));
                    },
                    children: [c.jsx(wEt, {
                      size: 14,
                      className: "shrink-0"
                    }), c.jsx("span", {
                      children: x(L ? "关闭人像质感调节" : "人像质感调节")
                    })]
                  }) : null, h ? c.jsxs("button", {
                    type: "button",
                    style: Ot("faceRetouch"),
                    className: St(U),
                    onClick: () => {
                      k(!1);
                      const rn = !U;
                      H(rn), rn && (l(!1), O(!1), D(!1), K(!1), T(!1), Ve(!1), We(!1), B(!1), R(!1), Q(!1), de(!1), ke(!1), Te(!1));
                    },
                    children: [c.jsx(ac, {
                      size: 14,
                      className: "shrink-0"
                    }), c.jsx("span", {
                      children: x(U ? "关闭人像精修" : "人像精修")
                    })]
                  }) : null, h ? c.jsxs("button", {
                    type: "button",
                    style: Ot("moodAdjust"),
                    className: St(Y),
                    onClick: () => {
                      k(!1);
                      const rn = !Y;
                      K(rn), rn && (l(!1), O(!1), T(!1), Ve(!1), We(!1), B(!1), R(!1), Q(!1), de(!1), ke(!1), Te(!1));
                    },
                    children: [c.jsx(xEt, {
                      size: 14,
                      className: "shrink-0"
                    }), c.jsx("span", {
                      children: x(Y ? "关闭情绪调节" : "情绪调节")
                    })]
                  }) : null, h ? c.jsxs("button", {
                    type: "button",
                    style: Ot("colorAdjust"),
                    className: St(W),
                    onClick: () => {
                      k(!1), Q(!W), W ? q(null) : (l(!1), O(!1), K(!1), T(!1), Ve(!1), We(!1), B(!1), de(!1), ke(!1), Te(!1));
                    },
                    children: [c.jsx(by, {
                      size: 14,
                      className: "shrink-0"
                    }), c.jsx("span", {
                      children: x(W ? "关闭调色编辑" : "调色编辑")
                    })]
                  }) : null, h || p ? c.jsxs("button", {
                    type: "button",
                    style: Ot("lut"),
                    className: St(ne),
                    onClick: () => {
                      k(!1), de(!ne), ne || (l(!1), O(!1), K(!1), T(!1), Ve(!1), We(!1), B(!1), Q(!1), ke(!1), Te(!1), q(null), J(!1), re(!1), ye(!1), ae(!1), Ee(!1), he(!1), ge(!1));
                    },
                    children: [c.jsx(wb, {
                      size: 14,
                      className: "shrink-0"
                    }), c.jsx("span", {
                      children: x(ne ? "关闭 LUT 调色" : "LUT 调色")
                    })]
                  }) : null, h ? c.jsxs("button", {
                    type: "button",
                    style: Ot("panorama"),
                    className: St(_e),
                    onClick: () => {
                      k(!1), ke(!_e), _e || (l(!1), O(!1), K(!1), T(!1), Ve(!1), We(!1), B(!1), Q(!1), de(!1), q(null), Te(!1));
                    },
                    children: [c.jsx(cEt, {
                      size: 14,
                      className: "shrink-0"
                    }), c.jsx("span", {
                      children: x(_e ? "关闭 360 全景" : "360 全景")
                    })]
                  }) : null, h ? c.jsxs("button", {
                    type: "button",
                    style: Ot("gridSplit"),
                    className: St(ve),
                    onClick: () => {
                      ve ? (Te(!1), Ne("")) : me();
                    },
                    children: [c.jsx(Bv, {
                      size: 14,
                      className: "shrink-0"
                    }), c.jsx("span", {
                      children: x(ve ? "关闭宫格切分" : "宫格切分")
                    })]
                  }) : null, h ? c.jsxs("button", {
                    type: "button",
                    style: Ot("freeSplit"),
                    className: St(Fe),
                    onClick: () => {
                      Fe ? (Me(!1), Re("")) : $e();
                    },
                    children: [c.jsx(Sf, {
                      size: 14,
                      className: "shrink-0"
                    }), c.jsx("span", {
                      children: x(Fe ? "关闭自由裁切" : "自由裁切")
                    })]
                  }) : null, h ? c.jsx("div", {
                    style: Ot("layerSplit"),
                    children: c.jsx(Owr, {
                      isDark: i,
                      active: rt,
                      processing: nt,
                      menuItemClass: St,
                      onCustom: () => {
                        k(!1), rt ? Le() : ze();
                      }
                    })
                  }) : null, Xe ? c.jsxs("button", {
                    type: "button",
                    style: Ot("expand"),
                    className: St(Ke),
                    onClick: () => {
                      k(!1), De();
                    },
                    children: [c.jsx(Od, {
                      size: 14,
                      className: "shrink-0"
                    }), c.jsx("span", {
                      children: x("智能扩图")
                    })]
                  }) : null, h ? c.jsxs("button", {
                    type: "button",
                    style: Ot("imageCutout"),
                    className: St(we),
                    onClick: () => {
                      if (k(!1), we) {
                        X(!1);
                        return;
                      }
                      Qt(), X(!0);
                    },
                    children: [c.jsx(GK, {
                      size: 14,
                      className: "shrink-0"
                    }), c.jsx("span", {
                      children: x(we ? "关闭智能抠图" : "智能抠图")
                    })]
                  }) : null, h ? c.jsxs("button", {
                    type: "button",
                    disabled: Ye,
                    style: Ot("xianyiRembg"),
                    className: St(Ye),
                    onClick: () => {
                      k(!1), Ce();
                    },
                    children: [Ye ? c.jsx(Ua, {
                      size: 14,
                      className: "shrink-0 animate-spin"
                    }) : c.jsx(GK, {
                      size: 14,
                      className: "shrink-0"
                    }), c.jsx("span", {
                      children: x(Ye ? "智能抠图中…" : "智能抠图（鲜艺）")
                    })]
                  }) : null, h ? c.jsxs("button", {
                    type: "button",
                    style: Ot("textEdit"),
                    className: St(He),
                    onClick: () => {
                      k(!1), He ? it() : (l(!1), O(!1), T(!1), We(!1), B(!1), Ve(!0));
                    },
                    children: [c.jsx(SP, {
                      size: 14,
                      className: "shrink-0"
                    }), c.jsxs("span", {
                      className: "flex items-center gap-1.5",
                      children: [x(He ? "关闭文字编辑" : "文字编辑"), (ln = It.settings) != null && ln.textEditData ? c.jsx("span", {
                        className: `h-1.5 w-1.5 rounded-full ${i ? "bg-orange-400" : "bg-orange-500"}`,
                        "aria-hidden": !0
                      }) : null]
                    })]
                  }) : null, h ? c.jsxs("button", {
                    type: "button",
                    style: Ot("moveObject"),
                    className: St(Ft),
                    onClick: () => {
                      k(!1), We(!Ft);
                    },
                    children: [c.jsx(RY, {
                      size: 14,
                      className: "shrink-0"
                    }), c.jsxs("span", {
                      className: "flex items-center gap-1.5",
                      children: [x(Ft ? "关闭移动对象" : "移动对象"), (Pn = It.settings) != null && Pn.moveObjectData ? c.jsx("span", {
                        className: `h-1.5 w-1.5 rounded-full ${i ? "bg-violet-400" : "bg-violet-600"}`,
                        "aria-hidden": !0
                      }) : null]
                    })]
                  }) : null, h ? c.jsxs("button", {
                    type: "button",
                    style: Ot("imageInfoJson"),
                    className: St(!1),
                    onClick: () => {
                      k(!1), Ge();
                    },
                    children: [c.jsx(aEt, {
                      size: 14,
                      className: "shrink-0"
                    }), c.jsx("span", {
                      children: x("转成 JSON")
                    })]
                  }) : null, h ? c.jsx("div", {
                    style: Ot("quickSplit"),
                    children: c.jsx(Lwr, {
                      isDark: i,
                      onRequestClose: () => k(!1),
                      onSplit: Ae
                    })
                  }) : null, h ? c.jsxs("button", {
                    type: "button",
                    style: Ot("rembg"),
                    className: St(!1),
                    onClick: () => {
                      k(!1), Ze();
                    },
                    children: [c.jsx(GK, {
                      size: 14,
                      className: "shrink-0"
                    }), c.jsx("span", {
                      children: x("去除背景")
                    })]
                  }) : null, c.jsxs("button", {
                    type: "button",
                    style: {
                      order: 1e3
                    },
                    className: St(Yt),
                    onClick: () => {
                      k(!1), qe(!0);
                    },
                    children: [c.jsx(gEt, {
                      size: 14,
                      className: "shrink-0"
                    }), c.jsx("span", {
                      children: x("排列顺序")
                    })]
                  })]
                })]
              }), (h || p) && m && f && y && c.jsx("div", {
                className: p ? "order-1" : void 0,
                children: c.jsx("button", {
                  type: "button",
                  className: kt(),
                  onClick: rn => {
                    rn.stopPropagation(), w(!1), k(!1), Ht(p ? "video" : "image");
                  },
                  "data-tip": x("高清放大"),
                  children: c.jsx("span", {
                    className: "text-xs font-semibold",
                    children: "HD"
                  })
                })
              })]
            }), c.jsx("div", {
              "data-toolbar-divider": "",
              className: fpe(i)
            }), UD(It) && c.jsx($D, {
              nodeIds: [It.id],
              pins: Zg(It),
              isDark: i,
              size: "compact"
            }), c.jsx("button", {
              type: "button",
              className: kt(),
              onClick: rn => {
                rn.stopPropagation(), k(!1), w(!1), nn();
              },
              "data-tip": x("替换"),
              children: c.jsx(mu, {
                size: 16
              })
            }), (h || p) && (pt || lt) && c.jsxs(c.Fragment, {
              children: [c.jsx("button", {
                type: "button",
                className: kt(),
                onClick: rn => {
                  rn.stopPropagation(), k(!1), w(!1), gt(rn);
                },
                "data-tip": x("下载"),
                children: c.jsx(ws, {
                  size: 16
                })
              }), c.jsx("button", {
                type: "button",
                "data-input-image-open-lightbox": !0,
                className: kt(),
                onClick: rn => {
                  rn.stopPropagation(), k(!1), w(!1), Ut(rn);
                },
                "data-tip": x("全屏"),
                children: c.jsx(kT, {
                  size: 16
                })
              })]
            })]
          })
        })
      })
    }), c.jsx(zwr, {
      isOpen: Yt,
      onClose: () => qe(!1),
      isDark: i,
      itemKeys: _t,
      onSaved: At
    })]
  });
}

const f8o = Object.freeze(Object.defineProperty({
  __proto__: null,
  InputImageTopToolbar: m8o
}, Symbol.toStringTag, {
  value: "Module"
}));

function g8o({
  title: e,
  kind: t,
  history: n,
  getCanvasNodes: r,
  onClose: a,
  onUpload: i,
  onPick: o
}) {
  on();
  const [s, l] = g.useState("history"),
    [d, u] = g.useState([]),
    [h] = g.useState(() => t === "all" ? [...xDe(r(), "image"), ...xDe(r(), "video")] : xDe(r(), t)),
    [p, m] = g.useState(""),
    [f, y] = g.useState(40),
    [b, v] = g.useState(!0),
    [_, w] = g.useState(""),
    [k, A] = g.useState(""),
    S = g.useRef(!0),
    C = g.useRef(!1);
  g.useEffect(() => (S.current = !0, c9(t === "all" ? {} : {
    mediaType: t
  }).then(T => {
    S.current && u(T.items);
  }).catch(() => {
    S.current && A("较早的历史读取失败，可以选择当前历史或画布素材。");
  }).finally(() => {
    S.current && v(!1);
  }), () => {
    S.current = !1;
  }), [t]);
  const I = g.useMemo(() => {
      const T = new Map(d.map(P => [P.id, P]));
      return n.forEach(P => T.set(P.id, P)), G1([...T.values()]).filter(P => (t === "all" ? P.type === "image" || P.type === "video" : P.type === t) && P.status !== "failed" && P.status !== "generating").sort((P, R) => (R.timestamp || 0) - (P.timestamp || 0)).map(due);
    }, [d, n, t]),
    E = (s === "canvas" ? h : I).filter(T => T.name.toLowerCase().includes(p.trim().toLowerCase())),
    M = async T => {
      if (!C.current) {
        C.current = !0, w(T.id), A("");
        try {
          const P = await UJ(T);
          S.current && o(P);
        } catch (P) {
          S.current && A(P instanceof Error ? P.message : "素材读取失败。");
        } finally {
          C.current = !1, S.current && w("");
        }
      }
    };
  return c.jsx("div", {
    className: "motion-upload-backdrop",
    onClick: T => {
      T.target === T.currentTarget && a();
    },
    onKeyDown: T => {
      T.key === "Escape" && (T.stopPropagation(), a());
    },
    children: c.jsxs("section", {
      className: "motion-asset-picker",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": e || x(t === "all" ? "选择参考素材" : t === "image" ? "选择角色图" : "选择动作视频"),
      children: [c.jsxs("header", {
        children: [c.jsx("strong", {
          children: e || x(t === "all" ? "选择参考素材" : t === "image" ? "选择角色图" : "选择动作视频")
        }), c.jsx("button", {
          className: "motion-icon",
          onClick: a,
          "aria-label": x("关闭素材选择"),
          children: c.jsx(Na, {
            size: 17
          })
        })]
      }), c.jsxs("div", {
        className: "motion-asset-sources",
        children: [c.jsxs("button", {
          onClick: i,
          children: [c.jsx(ml, {
            size: 15
          }), x("本地上传")]
        }), c.jsxs("div", {
          role: "tablist",
          "aria-label": x("素材来源"),
          children: [c.jsx("button", {
            role: "tab",
            "aria-selected": s === "history",
            onClick: () => {
              l("history"), y(40);
            },
            children: x("生成历史")
          }), c.jsx("button", {
            role: "tab",
            "aria-selected": s === "canvas",
            onClick: () => {
              l("canvas"), y(40);
            },
            children: x("当前画布")
          })]
        })]
      }), c.jsxs("label", {
        className: "motion-asset-search",
        children: [c.jsx(mc, {
          size: 15
        }), c.jsx("input", {
          autoFocus: !0,
          "aria-label": x("搜索素材"),
          value: p,
          placeholder: x("搜索素材名称或提示词"),
          onChange: T => {
            m(T.target.value), y(40);
          }
        })]
      }), c.jsx("p", {
        className: "motion-asset-hint",
        children: x(s === "canvas" ? "读取当前画布素材，选中后仅用于本工具。" : "与素材管理共用生成历史，点击选择参考素材。")
      }), k && c.jsx("p", {
        role: "alert",
        className: "motion-notice",
        children: k
      }), c.jsxs("div", {
        className: "motion-asset-scroll",
        children: [c.jsx("div", {
          className: "motion-asset-grid",
          children: E.slice(0, f).map(T => c.jsxs("button", {
            disabled: !!_,
            onClick: () => void M(T),
            title: T.name,
            "aria-label": x("选择素材：{0}", T.name),
            children: [c.jsxs("div", {
              className: "motion-asset-thumb",
              children: [T.kind === "image" ? c.jsx(Qg, {
                entry: {
                  id: T.id,
                  createdAt: 0,
                  mediaType: "image",
                  content: T.thumbnail || "",
                  originalUrl: T.thumbnail || "",
                  thumbnailUrl: T.thumbnail || "",
                  assetId: T.assetId,
                  generatedImages: []
                }
              }) : T.thumbnail ? c.jsx("img", {
                src: T.thumbnail,
                alt: "",
                loading: "lazy"
              }) : c.jsx(Oo, {
                size: 28
              }), _ === T.id && c.jsx(Ua, {
                className: "motion-spin",
                size: 22
              })]
            }), c.jsx("span", {
              children: T.name
            })]
          }, T.id))
        }), !E.length && c.jsx("div", {
          className: "motion-asset-empty",
          children: b && s === "history" ? x("正在读取历史…") : p ? x("没有匹配的素材") : t === "image" ? c.jsxs(c.Fragment, {
            children: [c.jsx(mu, {
              size: 24
            }), x("暂无可用图片")]
          }) : c.jsxs(c.Fragment, {
            children: [c.jsx(Oo, {
              size: 24
            }), x("暂无可用视频")]
          })
        }), E.length > f && c.jsx("button", {
          className: "motion-asset-more",
          onClick: () => y(T => T + 40),
          children: x("显示更多")
        })]
      })]
    })
  });
}

const J$t = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: g8o
}, Symbol.toStringTag, {
  value: "Module"
}));

function y8o({
  file: e,
  duration: t,
  keepSound: n,
  onClose: r,
  onConfirm: a
}) {
  on();
  const [i, o] = g.useState(""),
    [s, l] = g.useState({
      start: 0,
      end: 10
    }),
    [d, u] = g.useState(n),
    [h, p] = g.useState(!1),
    [m, f] = g.useState(""),
    [y, b] = g.useState(""),
    v = g.useRef(null),
    _ = g.useRef();
  g.useEffect(() => {
    const A = URL.createObjectURL(e);
    return o(A), () => {
      var S;
      (S = _.current) == null || S.abort(), URL.revokeObjectURL(A);
    };
  }, [e]);
  const w = (A, S) => {
      if (!Number.isFinite(S)) return;
      const C = {
          ...s,
          total: t,
          minDuration: 3,
          maxDuration: 10
        },
        I = A === "start" ? S$(S, C) : I$(S, C);
      l(I), v.current && (v.current.pause(), v.current.currentTime = I.start);
    },
    k = async () => {
      var S;
      if (h || !i) return;
      const A = new AbortController();
      _.current = A, p(!0), b(""), (S = v.current) == null || S.pause();
      try {
        const C = await qwr({
          videoUrl: i,
          start: s.start,
          end: s.end,
          requireAudio: d,
          signal: A.signal,
          onProgress: E => {
            A.signal.aborted || f(`${E.text} ${E.percent}%`);
          }
        });
        if (A.signal.aborted) return;
        const I = new File([C.blob], `${e.name.replace(/\.[^.]+$/, "")}-片段.${C.fileName.endsWith(".webm") ? "webm" : "mp4"}`, {
          type: C.blob.type || "video/mp4"
        });
        await s$t(I), A.signal.aborted || a(I, d);
      } catch (C) {
        A.signal.aborted || b(C instanceof Error ? C.message : "裁剪失败，请重试。");
      } finally {
        A.signal.aborted || (p(!1), f(""));
      }
    };
  return c.jsx("div", {
    className: "motion-upload-backdrop",
    onKeyDown: A => {
      A.key === "Escape" && (A.stopPropagation(), r());
    },
    children: c.jsxs("section", {
      className: "motion-trim",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": x("裁剪动作视频"),
      children: [c.jsxs("header", {
        children: [c.jsxs("strong", {
          children: [c.jsx(Sf, {
            size: 16
          }), x("裁剪动作视频")]
        }), c.jsx("button", {
          className: "motion-icon",
          "aria-label": x("关闭视频裁剪"),
          onClick: r,
          children: c.jsx(Na, {
            size: 17
          })
        })]
      }), c.jsxs("p", {
        children: [x("原片 "), Om(t), x("，选取 3–10 秒的动作片段。")]
      }), i && c.jsx("video", {
        ref: v,
        src: i,
        controls: !0,
        playsInline: !0,
        preload: "metadata",
        onPlay: () => {
          v.current && (v.current.currentTime < s.start || v.current.currentTime >= s.end) && (v.current.currentTime = s.start);
        },
        onTimeUpdate: () => {
          v.current && v.current.currentTime >= s.end && v.current.pause();
        }
      }), c.jsxs("fieldset", {
        disabled: h,
        children: [c.jsxs("label", {
          children: [x("开始"), c.jsx("input", {
            "aria-label": x("片段开始时间"),
            type: "range",
            min: 0,
            max: t - 3,
            step: .1,
            value: s.start,
            onChange: A => w("start", Number(A.target.value))
          }), c.jsx("input", {
            "aria-label": x("开始秒数"),
            type: "number",
            min: 0,
            max: t - 3,
            step: .1,
            value: s.start.toFixed(1),
            onChange: A => w("start", Number(A.target.value))
          })]
        }), c.jsxs("label", {
          children: [x("结束"), c.jsx("input", {
            "aria-label": x("片段结束时间"),
            type: "range",
            min: 3,
            max: t,
            step: .1,
            value: s.end,
            onChange: A => w("end", Number(A.target.value))
          }), c.jsx("input", {
            "aria-label": x("结束秒数"),
            type: "number",
            min: 3,
            max: t,
            step: .1,
            value: s.end.toFixed(1),
            onChange: A => w("end", Number(A.target.value))
          })]
        }), c.jsxs("label", {
          className: "motion-trim-sound",
          children: [c.jsx("input", {
            type: "checkbox",
            checked: d,
            onChange: A => u(A.target.checked)
          }), x("保留原声")]
        })]
      }), c.jsx("div", {
        className: "motion-trim-status",
        role: "status",
        children: y || m || x("已选 {0} 秒", (s.end - s.start).toFixed(1))
      }), c.jsxs("footer", {
        children: [c.jsx("button", {
          onClick: r,
          children: x("取消")
        }), c.jsx("button", {
          className: "motion-trim-confirm",
          disabled: h || !i,
          onClick: () => void k(),
          children: x(h ? "正在裁剪…" : "使用此片段")
        })]
      })]
    })
  });
}

const b8o = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: y8o
}, Symbol.toStringTag, {
  value: "Module"
}));

/*!
 * ONNX Runtime Web v1.21.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */var Z$t = Object.defineProperty,
  v8o = Object.getOwnPropertyDescriptor,
  w8o = Object.getOwnPropertyNames,
  x8o = Object.prototype.hasOwnProperty,
  _8o = (e => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, {
    get: (t, n) => (typeof require < "u" ? require : t)[n]
  }) : e)(function (e) {
    if (typeof require < "u") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + e + '" is not supported');
  }),
  Hi = (e, t) => () => (e && (t = e(e = 0)), t),
  SEe = (e, t) => {
    for (var n in t) Z$t(e, n, {
      get: t[n],
      enumerable: !0
    });
  },
  k8o = (e, t, n, r) => {
    if (t && typeof t == "object" || typeof t == "function") for (let a of w8o(t)) !x8o.call(e, a) && a !== n && Z$t(e, a, {
      get: () => t[a],
      enumerable: !(r = v8o(t, a)) || r.enumerable
    });
    return e;
  },
  cGe = e => k8o(Z$t({}, "__esModule", {
    value: !0
  }), e),
  vge,
  YL,
  $W,
  Jvn,
  cxr,
  dxr = Hi(() => {
    vge = new Map(), YL = [], $W = (e, t, n) => {
      if (t && typeof t.init == "function" && typeof t.createInferenceSessionHandler == "function") {
        let r = vge.get(e);
        if (r === void 0) vge.set(e, {
          backend: t,
          priority: n
        });else {
          if (r.priority > n) return;
          if (r.priority === n && r.backend !== t) throw new Error(`cannot register backend "${e}" using priority ${n}`);
        }
        if (n >= 0) {
          let a = YL.indexOf(e);
          a !== -1 && YL.splice(a, 1);
          for (let i = 0; i < YL.length; i++) if (vge.get(YL[i]).priority <= n) {
            YL.splice(i, 0, e);
            return;
          }
          YL.push(e);
        }
        return;
      }
      throw new TypeError("not a valid backend");
    }, Jvn = async e => {
      let t = vge.get(e);
      if (!t) return "backend not found.";
      if (t.initialized) return t.backend;
      if (t.aborted) return t.error;
      {
        let n = !!t.initPromise;
        try {
          return n || (t.initPromise = t.backend.init(e)), await t.initPromise, t.initialized = !0, t.backend;
        } catch (r) {
          return n || (t.error = `${r}`, t.aborted = !0), t.error;
        } finally {
          delete t.initPromise;
        }
      }
    }, cxr = async e => {
      let t = e.executionProviders || [],
        n = t.map(l => typeof l == "string" ? l : l.name),
        r = n.length === 0 ? YL : n,
        a,
        i = [],
        o = new Set();
      for (let l of r) {
        let d = await Jvn(l);
        typeof d == "string" ? i.push({
          name: l,
          err: d
        }) : (a || (a = d), a === d && o.add(l));
      }
      if (!a) throw new Error(`no available backend found. ERR: ${i.map(l => `[${l.name}] ${l.err}`).join(", ")}`);
      for (let {
        name: l,
        err: d
      } of i) n.includes(l) && console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${d}`);
      let s = t.filter(l => o.has(typeof l == "string" ? l : l.name));
      return [a, new Proxy(e, {
        get: (l, d) => d === "executionProviders" ? s : Reflect.get(l, d)
      })];
    };
  }),
  A8o = Hi(() => {
    dxr();
  }),
  uxr,
  S8o = Hi(() => {
    uxr = "1.21.0";
  }),
  Fdt,
  x4,
  hxr = Hi(() => {
    S8o(), Fdt = "warning", x4 = {
      wasm: {},
      webgl: {},
      webgpu: {},
      versions: {
        common: uxr
      },
      set logLevel(e) {
        if (e !== void 0) {
          if (typeof e != "string" || ["verbose", "info", "warning", "error", "fatal"].indexOf(e) === -1) throw new Error(`Unsupported logging level: ${e}`);
          Fdt = e;
        }
      },
      get logLevel() {
        return Fdt;
      }
    }, Object.defineProperty(x4, "logLevel", {
      enumerable: !0
    });
  }),
  dm,
  I8o = Hi(() => {
    hxr(), dm = x4;
  }),
  pxr,
  mxr,
  C8o = Hi(() => {
    pxr = (e, t) => {
      let n = typeof document < "u" ? document.createElement("canvas") : new OffscreenCanvas(1, 1);
      n.width = e.dims[3], n.height = e.dims[2];
      let r = n.getContext("2d");
      if (r != null) {
        let a, i;
        (t == null ? void 0 : t.tensorLayout) !== void 0 && t.tensorLayout === "NHWC" ? (a = e.dims[2], i = e.dims[3]) : (a = e.dims[3], i = e.dims[2]);
        let o = (t == null ? void 0 : t.format) !== void 0 ? t.format : "RGB",
          s = t == null ? void 0 : t.norm,
          l,
          d;
        s === void 0 || s.mean === void 0 ? l = [255, 255, 255, 255] : typeof s.mean == "number" ? l = [s.mean, s.mean, s.mean, s.mean] : (l = [s.mean[0], s.mean[1], s.mean[2], 0], s.mean[3] !== void 0 && (l[3] = s.mean[3])), s === void 0 || s.bias === void 0 ? d = [0, 0, 0, 0] : typeof s.bias == "number" ? d = [s.bias, s.bias, s.bias, s.bias] : (d = [s.bias[0], s.bias[1], s.bias[2], 0], s.bias[3] !== void 0 && (d[3] = s.bias[3]));
        let u = i * a,
          h = 0,
          p = u,
          m = u * 2,
          f = -1;
        o === "RGBA" ? (h = 0, p = u, m = u * 2, f = u * 3) : o === "RGB" ? (h = 0, p = u, m = u * 2) : o === "RBG" && (h = 0, m = u, p = u * 2);
        for (let y = 0; y < i; y++) for (let b = 0; b < a; b++) {
          let v = (e.data[h++] - d[0]) * l[0],
            _ = (e.data[p++] - d[1]) * l[1],
            w = (e.data[m++] - d[2]) * l[2],
            k = f === -1 ? 255 : (e.data[f++] - d[3]) * l[3];
          r.fillStyle = "rgba(" + v + "," + _ + "," + w + "," + k + ")", r.fillRect(b, y, 1, 1);
        }
        if ("toDataURL" in n) return n.toDataURL();
        throw new Error("toDataURL is not supported");
      } else throw new Error("Can not access image data");
    }, mxr = (e, t) => {
      let n = typeof document < "u" ? document.createElement("canvas").getContext("2d") : new OffscreenCanvas(1, 1).getContext("2d"),
        r;
      if (n != null) {
        let a, i, o;
        (t == null ? void 0 : t.tensorLayout) !== void 0 && t.tensorLayout === "NHWC" ? (a = e.dims[2], i = e.dims[1], o = e.dims[3]) : (a = e.dims[3], i = e.dims[2], o = e.dims[1]);
        let s = t !== void 0 && t.format !== void 0 ? t.format : "RGB",
          l = t == null ? void 0 : t.norm,
          d,
          u;
        l === void 0 || l.mean === void 0 ? d = [255, 255, 255, 255] : typeof l.mean == "number" ? d = [l.mean, l.mean, l.mean, l.mean] : (d = [l.mean[0], l.mean[1], l.mean[2], 255], l.mean[3] !== void 0 && (d[3] = l.mean[3])), l === void 0 || l.bias === void 0 ? u = [0, 0, 0, 0] : typeof l.bias == "number" ? u = [l.bias, l.bias, l.bias, l.bias] : (u = [l.bias[0], l.bias[1], l.bias[2], 0], l.bias[3] !== void 0 && (u[3] = l.bias[3]));
        let h = i * a;
        if (t !== void 0 && (t.format !== void 0 && o === 4 && t.format !== "RGBA" || o === 3 && t.format !== "RGB" && t.format !== "BGR")) throw new Error("Tensor format doesn't match input tensor dims");
        let p = 4,
          m = 0,
          f = 1,
          y = 2,
          b = 3,
          v = 0,
          _ = h,
          w = h * 2,
          k = -1;
        s === "RGBA" ? (v = 0, _ = h, w = h * 2, k = h * 3) : s === "RGB" ? (v = 0, _ = h, w = h * 2) : s === "RBG" && (v = 0, w = h, _ = h * 2), r = n.createImageData(a, i);
        for (let A = 0; A < i * a; m += p, f += p, y += p, b += p, A++) r.data[m] = (e.data[v++] - u[0]) * d[0], r.data[f] = (e.data[_++] - u[1]) * d[1], r.data[y] = (e.data[w++] - u[2]) * d[2], r.data[b] = k === -1 ? 255 : (e.data[k++] - u[3]) * d[3];
      } else throw new Error("Can not access image data");
      return r;
    };
  }),
  JPe,
  fxr,
  gxr,
  yxr,
  bxr,
  vxr,
  E8o = Hi(() => {
    eGt(), JPe = (e, t) => {
      if (e === void 0) throw new Error("Image buffer must be defined");
      if (t.height === void 0 || t.width === void 0) throw new Error("Image height and width must be defined");
      if (t.tensorLayout === "NHWC") throw new Error("NHWC Tensor layout is not supported yet");
      let {
          height: n,
          width: r
        } = t,
        a = t.norm ?? {
          mean: 255,
          bias: 0
        },
        i,
        o;
      typeof a.mean == "number" ? i = [a.mean, a.mean, a.mean, a.mean] : i = [a.mean[0], a.mean[1], a.mean[2], a.mean[3] ?? 255], typeof a.bias == "number" ? o = [a.bias, a.bias, a.bias, a.bias] : o = [a.bias[0], a.bias[1], a.bias[2], a.bias[3] ?? 0];
      let s = t.format !== void 0 ? t.format : "RGBA",
        l = t.tensorFormat !== void 0 && t.tensorFormat !== void 0 ? t.tensorFormat : "RGB",
        d = n * r,
        u = l === "RGBA" ? new Float32Array(d * 4) : new Float32Array(d * 3),
        h = 4,
        p = 0,
        m = 1,
        f = 2,
        y = 3,
        b = 0,
        v = d,
        _ = d * 2,
        w = -1;
      s === "RGB" && (h = 3, p = 0, m = 1, f = 2, y = -1), l === "RGBA" ? w = d * 3 : l === "RBG" ? (b = 0, _ = d, v = d * 2) : l === "BGR" && (_ = 0, v = d, b = d * 2);
      for (let k = 0; k < d; k++, p += h, f += h, m += h, y += h) u[b++] = (e[p] + o[0]) / i[0], u[v++] = (e[m] + o[1]) / i[1], u[_++] = (e[f] + o[2]) / i[2], w !== -1 && y !== -1 && (u[w++] = (e[y] + o[3]) / i[3]);
      return l === "RGBA" ? new yS("float32", u, [1, 4, n, r]) : new yS("float32", u, [1, 3, n, r]);
    }, fxr = async (e, t) => {
      let n = typeof HTMLImageElement < "u" && e instanceof HTMLImageElement,
        r = typeof ImageData < "u" && e instanceof ImageData,
        a = typeof ImageBitmap < "u" && e instanceof ImageBitmap,
        i = typeof e == "string",
        o,
        s = t ?? {},
        l = () => {
          if (typeof document < "u") return document.createElement("canvas");
          if (typeof OffscreenCanvas < "u") return new OffscreenCanvas(1, 1);
          throw new Error("Canvas is not supported");
        },
        d = u => typeof HTMLCanvasElement < "u" && u instanceof HTMLCanvasElement || u instanceof OffscreenCanvas ? u.getContext("2d") : null;
      if (n) {
        let u = l();
        u.width = e.width, u.height = e.height;
        let h = d(u);
        if (h != null) {
          let p = e.height,
            m = e.width;
          if (t !== void 0 && t.resizedHeight !== void 0 && t.resizedWidth !== void 0 && (p = t.resizedHeight, m = t.resizedWidth), t !== void 0) {
            if (s = t, t.tensorFormat !== void 0) throw new Error("Image input config format must be RGBA for HTMLImageElement");
            s.tensorFormat = "RGBA", s.height = p, s.width = m;
          } else s.tensorFormat = "RGBA", s.height = p, s.width = m;
          h.drawImage(e, 0, 0), o = h.getImageData(0, 0, m, p).data;
        } else throw new Error("Can not access image data");
      } else if (r) {
        let u, h;
        if (t !== void 0 && t.resizedWidth !== void 0 && t.resizedHeight !== void 0 ? (u = t.resizedHeight, h = t.resizedWidth) : (u = e.height, h = e.width), t !== void 0 && (s = t), s.format = "RGBA", s.height = u, s.width = h, t !== void 0) {
          let p = l();
          p.width = h, p.height = u;
          let m = d(p);
          if (m != null) m.putImageData(e, 0, 0), o = m.getImageData(0, 0, h, u).data;else throw new Error("Can not access image data");
        } else o = e.data;
      } else if (a) {
        if (t === void 0) throw new Error("Please provide image config with format for Imagebitmap");
        let u = l();
        u.width = e.width, u.height = e.height;
        let h = d(u);
        if (h != null) {
          let p = e.height,
            m = e.width;
          return h.drawImage(e, 0, 0, m, p), o = h.getImageData(0, 0, m, p).data, s.height = p, s.width = m, JPe(o, s);
        } else throw new Error("Can not access image data");
      } else {
        if (i) return new Promise((u, h) => {
          let p = l(),
            m = d(p);
          if (!e || !m) return h();
          let f = new Image();
          f.crossOrigin = "Anonymous", f.src = e, f.onload = () => {
            p.width = f.width, p.height = f.height, m.drawImage(f, 0, 0, p.width, p.height);
            let y = m.getImageData(0, 0, p.width, p.height);
            s.height = p.height, s.width = p.width, u(JPe(y.data, s));
          };
        });
        throw new Error("Input data provided is not supported - aborted tensor creation");
      }
      if (o !== void 0) return JPe(o, s);
      throw new Error("Input data provided is not supported - aborted tensor creation");
    }, gxr = (e, t) => {
      let {
          width: n,
          height: r,
          download: a,
          dispose: i
        } = t,
        o = [1, r, n, 4];
      return new yS({
        location: "texture",
        type: "float32",
        texture: e,
        dims: o,
        download: a,
        dispose: i
      });
    }, yxr = (e, t) => {
      let {
        dataType: n,
        dims: r,
        download: a,
        dispose: i
      } = t;
      return new yS({
        location: "gpu-buffer",
        type: n ?? "float32",
        gpuBuffer: e,
        dims: r,
        download: a,
        dispose: i
      });
    }, bxr = (e, t) => {
      let {
        dataType: n,
        dims: r,
        download: a,
        dispose: i
      } = t;
      return new yS({
        location: "ml-tensor",
        type: n ?? "float32",
        mlTensor: e,
        dims: r,
        download: a,
        dispose: i
      });
    }, vxr = (e, t, n) => new yS({
      location: "cpu-pinned",
      type: e,
      data: t,
      dims: n ?? [t.length]
    });
  }),
  EH,
  rbe,
  zdt,
  wxr,
  T8o = Hi(() => {
    EH = new Map([["float32", Float32Array], ["uint8", Uint8Array], ["int8", Int8Array], ["uint16", Uint16Array], ["int16", Int16Array], ["int32", Int32Array], ["bool", Uint8Array], ["float64", Float64Array], ["uint32", Uint32Array], ["int4", Uint8Array], ["uint4", Uint8Array]]), rbe = new Map([[Float32Array, "float32"], [Uint8Array, "uint8"], [Int8Array, "int8"], [Uint16Array, "uint16"], [Int16Array, "int16"], [Int32Array, "int32"], [Float64Array, "float64"], [Uint32Array, "uint32"]]), zdt = !1, wxr = () => {
      if (!zdt) {
        zdt = !0;
        let e = typeof BigInt64Array < "u" && BigInt64Array.from,
          t = typeof BigUint64Array < "u" && BigUint64Array.from,
          n = globalThis.Float16Array,
          r = typeof n < "u" && n.from;
        e && (EH.set("int64", BigInt64Array), rbe.set(BigInt64Array, "int64")), t && (EH.set("uint64", BigUint64Array), rbe.set(BigUint64Array, "uint64")), r ? (EH.set("float16", n), rbe.set(n, "float16")) : EH.set("float16", Uint16Array);
      }
    };
  }),
  xxr,
  _xr,
  M8o = Hi(() => {
    eGt(), xxr = e => {
      let t = 1;
      for (let n = 0; n < e.length; n++) {
        let r = e[n];
        if (typeof r != "number" || !Number.isSafeInteger(r)) throw new TypeError(`dims[${n}] must be an integer, got: ${r}`);
        if (r < 0) throw new RangeError(`dims[${n}] must be a non-negative integer, got: ${r}`);
        t *= r;
      }
      return t;
    }, _xr = (e, t) => {
      switch (e.location) {
        case "cpu":
          return new yS(e.type, e.data, t);
        case "cpu-pinned":
          return new yS({
            location: "cpu-pinned",
            data: e.data,
            type: e.type,
            dims: t
          });
        case "texture":
          return new yS({
            location: "texture",
            texture: e.texture,
            type: e.type,
            dims: t
          });
        case "gpu-buffer":
          return new yS({
            location: "gpu-buffer",
            gpuBuffer: e.gpuBuffer,
            type: e.type,
            dims: t
          });
        case "ml-tensor":
          return new yS({
            location: "ml-tensor",
            mlTensor: e.mlTensor,
            type: e.type,
            dims: t
          });
        default:
          throw new Error(`tensorReshape: tensor location ${e.location} is not supported`);
      }
    };
  }),
  yS,
  eGt = Hi(() => {
    C8o(), E8o(), T8o(), M8o(), yS = class {
      constructor(e, t, n) {
        wxr();
        let r, a;
        if (typeof e == "object" && "location" in e) switch (this.dataLocation = e.location, r = e.type, a = e.dims, e.location) {
          case "cpu-pinned":
            {
              let o = EH.get(r);
              if (!o) throw new TypeError(`unsupported type "${r}" to create tensor from pinned buffer`);
              if (!(e.data instanceof o)) throw new TypeError(`buffer should be of type ${o.name}`);
              this.cpuData = e.data;
              break;
            }
          case "texture":
            {
              if (r !== "float32") throw new TypeError(`unsupported type "${r}" to create tensor from texture`);
              this.gpuTextureData = e.texture, this.downloader = e.download, this.disposer = e.dispose;
              break;
            }
          case "gpu-buffer":
            {
              if (r !== "float32" && r !== "float16" && r !== "int32" && r !== "int64" && r !== "uint32" && r !== "uint8" && r !== "bool" && r !== "uint4" && r !== "int4") throw new TypeError(`unsupported type "${r}" to create tensor from gpu buffer`);
              this.gpuBufferData = e.gpuBuffer, this.downloader = e.download, this.disposer = e.dispose;
              break;
            }
          case "ml-tensor":
            {
              if (r !== "float32" && r !== "float16" && r !== "int32" && r !== "int64" && r !== "uint32" && r !== "uint64" && r !== "int8" && r !== "uint8" && r !== "bool" && r !== "uint4" && r !== "int4") throw new TypeError(`unsupported type "${r}" to create tensor from MLTensor`);
              this.mlTensorData = e.mlTensor, this.downloader = e.download, this.disposer = e.dispose;
              break;
            }
          default:
            throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`);
        } else {
          let o, s;
          if (typeof e == "string") {
            if (r = e, s = n, e === "string") {
              if (!Array.isArray(t)) throw new TypeError("A string tensor's data must be a string array.");
              o = t;
            } else {
              let l = EH.get(e);
              if (l === void 0) throw new TypeError(`Unsupported tensor type: ${e}.`);
              if (Array.isArray(t)) {
                if (e === "float16" && l === Uint16Array || e === "uint4" || e === "int4") throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);
                e === "uint64" || e === "int64" ? o = l.from(t, BigInt) : o = l.from(t);
              } else if (t instanceof l) o = t;else if (t instanceof Uint8ClampedArray) {
                if (e === "uint8") o = Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");
              } else if (e === "float16" && t instanceof Uint16Array && l !== Uint16Array) o = new globalThis.Float16Array(t.buffer, t.byteOffset, t.length);else throw new TypeError(`A ${r} tensor's data must be type of ${l}`);
            }
          } else if (s = t, Array.isArray(e)) {
            if (e.length === 0) throw new TypeError("Tensor type cannot be inferred from an empty array.");
            let l = typeof e[0];
            if (l === "string") r = "string", o = e;else if (l === "boolean") r = "bool", o = Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`);
          } else if (e instanceof Uint8ClampedArray) r = "uint8", o = Uint8Array.from(e);else {
            let l = rbe.get(e.constructor);
            if (l === void 0) throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);
            r = l, o = e;
          }
          if (s === void 0) s = [o.length];else if (!Array.isArray(s)) throw new TypeError("A tensor's dims must be a number array");
          a = s, this.cpuData = o, this.dataLocation = "cpu";
        }
        let i = xxr(a);
        if (this.cpuData && i !== this.cpuData.length && !((r === "uint4" || r === "int4") && Math.ceil(i / 2) === this.cpuData.length)) throw new Error(`Tensor's size(${i}) does not match data length(${this.cpuData.length}).`);
        this.type = r, this.dims = a, this.size = i;
      }
      static async fromImage(e, t) {
        return fxr(e, t);
      }
      static fromTexture(e, t) {
        return gxr(e, t);
      }
      static fromGpuBuffer(e, t) {
        return yxr(e, t);
      }
      static fromMLTensor(e, t) {
        return bxr(e, t);
      }
      static fromPinnedBuffer(e, t, n) {
        return vxr(e, t, n);
      }
      toDataURL(e) {
        return pxr(this, e);
      }
      toImageData(e) {
        return mxr(this, e);
      }
      get data() {
        if (this.ensureValid(), !this.cpuData) throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");
        return this.cpuData;
      }
      get location() {
        return this.dataLocation;
      }
      get texture() {
        if (this.ensureValid(), !this.gpuTextureData) throw new Error("The data is not stored as a WebGL texture.");
        return this.gpuTextureData;
      }
      get gpuBuffer() {
        if (this.ensureValid(), !this.gpuBufferData) throw new Error("The data is not stored as a WebGPU buffer.");
        return this.gpuBufferData;
      }
      get mlTensor() {
        if (this.ensureValid(), !this.mlTensorData) throw new Error("The data is not stored as a WebNN MLTensor.");
        return this.mlTensorData;
      }
      async getData(e) {
        switch (this.ensureValid(), this.dataLocation) {
          case "cpu":
          case "cpu-pinned":
            return this.data;
          case "texture":
          case "gpu-buffer":
          case "ml-tensor":
            {
              if (!this.downloader) throw new Error("The current tensor is not created with a specified data downloader.");
              if (this.isDownloading) throw new Error("The current tensor is being downloaded.");
              try {
                this.isDownloading = !0;
                let t = await this.downloader();
                return this.downloader = void 0, this.dataLocation = "cpu", this.cpuData = t, e && this.disposer && (this.disposer(), this.disposer = void 0), t;
              } finally {
                this.isDownloading = !1;
              }
            }
          default:
            throw new Error(`cannot get data from location: ${this.dataLocation}`);
        }
      }
      dispose() {
        if (this.isDownloading) throw new Error("The current tensor is being downloaded.");
        this.disposer && (this.disposer(), this.disposer = void 0), this.cpuData = void 0, this.gpuTextureData = void 0, this.gpuBufferData = void 0, this.mlTensorData = void 0, this.downloader = void 0, this.isDownloading = void 0, this.dataLocation = "none";
      }
      ensureValid() {
        if (this.dataLocation === "none") throw new Error("The tensor is disposed.");
      }
      reshape(e) {
        if (this.ensureValid(), this.downloader || this.disposer) throw new Error("Cannot reshape a tensor that owns GPU resource.");
        return _xr(this, e);
      }
    };
  }),
  aE,
  kxr = Hi(() => {
    eGt(), aE = yS;
  }),
  jAe,
  Udt,
  yT,
  Y5,
  Axr = Hi(() => {
    hxr(), jAe = (e, t) => {
      (typeof x4.trace > "u" ? !x4.wasm.trace : !x4.trace) || console.timeStamp(`${e}::ORT::${t}`);
    }, Udt = (e, t) => {
      var a;
      let n = ((a = new Error().stack) == null ? void 0 : a.split(/\r\n|\r|\n/g)) || [],
        r = !1;
      for (let i = 0; i < n.length; i++) {
        if (r && !n[i].includes("TRACE_FUNC")) {
          let o = `FUNC_${e}::${n[i].trim().split(" ")[1]}`;
          t && (o += `::${t}`), jAe("CPU", o);
          return;
        }
        n[i].includes("TRACE_FUNC") && (r = !0);
      }
    }, yT = e => {
      (typeof x4.trace > "u" ? !x4.wasm.trace : !x4.trace) || Udt("BEGIN", e);
    }, Y5 = e => {
      (typeof x4.trace > "u" ? !x4.wasm.trace : !x4.trace) || Udt("END", e);
    };
  }),
  Sxr,
  P8o = Hi(() => {
    dxr(), kxr(), Axr(), Sxr = class Ixr {
      constructor(t) {
        this.handler = t;
      }
      async run(t, n, r) {
        yT();
        let a = {},
          i = {};
        if (typeof t != "object" || t === null || t instanceof aE || Array.isArray(t)) throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");
        let o = !0;
        if (typeof n == "object") {
          if (n === null) throw new TypeError("Unexpected argument[1]: cannot be null.");
          if (n instanceof aE) throw new TypeError("'fetches' cannot be a Tensor");
          if (Array.isArray(n)) {
            if (n.length === 0) throw new TypeError("'fetches' cannot be an empty array.");
            o = !1;
            for (let d of n) {
              if (typeof d != "string") throw new TypeError("'fetches' must be a string array or an object.");
              if (this.outputNames.indexOf(d) === -1) throw new RangeError(`'fetches' contains invalid output name: ${d}.`);
              a[d] = null;
            }
            if (typeof r == "object" && r !== null) i = r;else if (typeof r < "u") throw new TypeError("'options' must be an object.");
          } else {
            let d = !1,
              u = Object.getOwnPropertyNames(n);
            for (let h of this.outputNames) if (u.indexOf(h) !== -1) {
              let p = n[h];
              (p === null || p instanceof aE) && (d = !0, o = !1, a[h] = p);
            }
            if (d) {
              if (typeof r == "object" && r !== null) i = r;else if (typeof r < "u") throw new TypeError("'options' must be an object.");
            } else i = n;
          }
        } else if (typeof n < "u") throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");
        for (let d of this.inputNames) if (typeof t[d] > "u") throw new Error(`input '${d}' is missing in 'feeds'.`);
        if (o) for (let d of this.outputNames) a[d] = null;
        let s = await this.handler.run(t, a, i),
          l = {};
        for (let d in s) if (Object.hasOwnProperty.call(s, d)) {
          let u = s[d];
          u instanceof aE ? l[d] = u : l[d] = new aE(u.type, u.data, u.dims);
        }
        return Y5(), l;
      }
      async release() {
        return this.handler.dispose();
      }
      static async create(t, n, r, a) {
        yT();
        let i,
          o = {};
        if (typeof t == "string") {
          if (i = t, typeof n == "object" && n !== null) o = n;else if (typeof n < "u") throw new TypeError("'options' must be an object.");
        } else if (t instanceof Uint8Array) {
          if (i = t, typeof n == "object" && n !== null) o = n;else if (typeof n < "u") throw new TypeError("'options' must be an object.");
        } else if (t instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && t instanceof SharedArrayBuffer) {
          let u = t,
            h = 0,
            p = t.byteLength;
          if (typeof n == "object" && n !== null) o = n;else if (typeof n == "number") {
            if (h = n, !Number.isSafeInteger(h)) throw new RangeError("'byteOffset' must be an integer.");
            if (h < 0 || h >= u.byteLength) throw new RangeError(`'byteOffset' is out of range [0, ${u.byteLength}).`);
            if (p = t.byteLength - h, typeof r == "number") {
              if (p = r, !Number.isSafeInteger(p)) throw new RangeError("'byteLength' must be an integer.");
              if (p <= 0 || h + p > u.byteLength) throw new RangeError(`'byteLength' is out of range (0, ${u.byteLength - h}].`);
              if (typeof a == "object" && a !== null) o = a;else if (typeof a < "u") throw new TypeError("'options' must be an object.");
            } else if (typeof r < "u") throw new TypeError("'byteLength' must be a number.");
          } else if (typeof n < "u") throw new TypeError("'options' must be an object.");
          i = new Uint8Array(u, h, p);
        } else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");
        let [s, l] = await cxr(o),
          d = await s.createInferenceSessionHandler(i, l);
        return Y5(), new Ixr(d);
      }
      startProfiling() {
        this.handler.startProfiling();
      }
      endProfiling() {
        this.handler.endProfiling();
      }
      get inputNames() {
        return this.handler.inputNames;
      }
      get outputNames() {
        return this.handler.outputNames;
      }
    };
  }),
  tGt,
  R8o = Hi(() => {
    P8o(), tGt = Sxr;
  }),
  N8o = Hi(() => {}),
  j8o = Hi(() => {}),
  D8o = Hi(() => {}),
  L8o = Hi(() => {}),
  Cxr = {};

SEe(Cxr, {
  InferenceSession: () => tGt,
  TRACE: () => jAe,
  TRACE_FUNC_BEGIN: () => yT,
  TRACE_FUNC_END: () => Y5,
  Tensor: () => aE,
  env: () => dm,
  registerBackend: () => $W
});

var BT = Hi(() => {
    A8o(), I8o(), R8o(), kxr(), N8o(), j8o(), Axr(), D8o(), L8o();
  }),
  nGt = Hi(() => {}),
  Exr = {};

SEe(Exr, {
  default: () => Txr
});

var $dt,
  Gdt,
  Txr,
  O8o = Hi(() => {
    var e;
    Rkr(), ree(), rGt(), $dt = "ort-wasm-proxy-worker", Gdt = ((e = globalThis.self) == null ? void 0 : e.name) === $dt, Gdt && (self.onmessage = t => {
      let {
        type: n,
        in: r
      } = t.data;
      try {
        switch (n) {
          case "init-wasm":
            aGt(r.wasm).then(() => {
              _Gt(r).then(() => {
                postMessage({
                  type: n
                });
              }, a => {
                postMessage({
                  type: n,
                  err: a
                });
              });
            }, a => {
              postMessage({
                type: n,
                err: a
              });
            });
            break;
          case "init-ep":
            {
              let {
                epName: a,
                env: i
              } = r;
              kGt(i, a).then(() => {
                postMessage({
                  type: n
                });
              }, o => {
                postMessage({
                  type: n,
                  err: o
                });
              });
              break;
            }
          case "copy-from":
            {
              let {
                  buffer: a
                } = r,
                i = fGe(a);
              postMessage({
                type: n,
                out: i
              });
              break;
            }
          case "create":
            {
              let {
                model: a,
                options: i
              } = r;
              AGt(a, i).then(o => {
                postMessage({
                  type: n,
                  out: o
                });
              }, o => {
                postMessage({
                  type: n,
                  err: o
                });
              });
              break;
            }
          case "release":
            SGt(r), postMessage({
              type: n
            });
            break;
          case "run":
            {
              let {
                sessionId: a,
                inputIndices: i,
                inputs: o,
                outputIndices: s,
                options: l
              } = r;
              IGt(a, i, o, s, new Array(s.length).fill(null), l).then(d => {
                d.some(u => u[3] !== "cpu") ? postMessage({
                  type: n,
                  err: "Proxy does not support non-cpu tensor location."
                }) : postMessage({
                  type: n,
                  out: d
                }, EGt([...o, ...d]));
              }, d => {
                postMessage({
                  type: n,
                  err: d
                });
              });
              break;
            }
          case "end-profiling":
            CGt(r), postMessage({
              type: n
            });
            break;
          default:
        }
      } catch (a) {
        postMessage({
          type: n,
          err: a
        });
      }
    }), Txr = Gdt ? null : t => new Worker(t ?? PA, {
      type: "module",
      name: $dt
    });
  }),
  Mxr = {};

SEe(Mxr, {
  default: () => Pxr
});

