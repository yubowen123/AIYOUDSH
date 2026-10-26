function $D({
  nodeIds: e,
  pins: t,
  toggleStates: n,
  isDark: r,
  size: a = "toolbar",
  className: i = "",
  placement: o = "top"
}) {
  on();
  const s = g.useId(),
    [l, d] = g.useState(!1),
    u = g.useRef(null),
    h = g.useMemo(() => n ? Fk.map(S => S.id).filter(S => n[S] === "all") : gpe(t), [t, n]),
    p = g.useMemo(() => {
      const S = Object.fromEntries(Fk.map(C => [C.id, "none"]));
      if (n) {
        for (const C of Fk) S[C.id] = n[C.id] ?? "none";
        return S;
      }
      for (const C of h) S[C] = "all";
      return S;
    }, [h, n]),
    m = mUa(h),
    f = yUa({
      open: l,
      onOpen: () => d(!0),
      onClose: () => d(!1)
    }),
    y = Gza(h),
    b = h.length > 0,
    v = !!i,
    _ = a === "toolbar" ? "w-11 h-11" : "w-10 h-10",
    w = Dza(h.length),
    k = a === "compact" ? 40 : 44,
    A = o === "bottom";
  return e.length ? c.jsxs(c.Fragment, {
    children: [c.jsx("button", {
      ref: u,
      type: "button",
      className: `group/pin-trigger relative inline-flex shrink-0 items-center justify-center rounded-full ${v ? "" : `${_} ${l ? r ? "text-white" : "text-zinc-900" : r ? "text-zinc-200" : "text-zinc-700"}`} ${i}`,
      style: {
        width: Math.max(v ? 40 : k, w + 8),
        minWidth: v ? 40 : k
      },
      "data-canvas-pin-ui": "trigger",
      "data-pin-popover-open": String(l),
      "data-tip": y,
      "aria-label": y,
      "aria-expanded": l,
      "aria-controls": s,
      onClick: S => {
        S.stopPropagation(), f.onTriggerClick(S.detail === 0 ? "keyboard" : "pointer");
      },
      onMouseDown: CR,
      onPointerDown: CR,
      children: c.jsxs("span", {
        className: "relative flex h-6 min-w-6 items-center justify-center",
        "data-canvas-tag-trigger-visual-slot": "",
        style: {
          width: w
        },
        children: [c.jsx("span", {
          "aria-hidden": !0,
          className: `absolute inset-0 flex items-center justify-center transition-opacity duration-150 ${b ? "opacity-0" : "opacity-100"} ${r ? "text-zinc-200" : "text-zinc-700"}`,
          "data-canvas-tag-trigger-glyph": "",
          children: c.jsx(pUa, {})
        }), m.items.length ? c.jsx("span", {
          className: "absolute top-1/2 flex -translate-y-1/2 items-center justify-end",
          "data-canvas-tag-trigger-dots": "",
          style: {
            right: 5
          },
          children: c.jsx(fUa, {
            items: m.items,
            width: m.width,
            onTransitionSettled: m.onTransitionSettled
          })
        }) : null]
      })
    }), l && typeof document < "u" ? Da.createPortal(c.jsx(_Ua, {
      isDark: r,
      selectorId: s,
      triggerRef: u,
      toggleStates: p,
      autoFocusOnOpen: f.autoFocusOnOpen,
      preferBelow: A,
      onToggle: S => Zza(e, S),
      onClear: () => eUa(e),
      onClose: () => d(!1)
    }), document.body) : null]
  }) : null;
}

const Ait = [.5, .75, 1, 1.25, 1.5, 2],
  kUa = ["MP3", "WAV"];

function N6e({
  isDark: e,
  active: t,
  onClick: n,
  children: r,
  title: a
}) {
  return on(), c.jsx("button", {
    type: "button",
    title: a,
    "data-tip": a,
    "data-toolbar-active": t ? "true" : void 0,
    onClick: n,
    onMouseDown: i => i.stopPropagation(),
    className: $P(e, !!t, "shrink-0"),
    children: r
  });
}

const eOt = ({
    isDark: e,
    audioUrl: t,
    playbackRate: n,
    onPlaybackRateChange: r,
    onCropClick: a,
    onFormatConverted: i,
    onDownload: o,
    node: s
  }) => {
    on();
    const [l, d] = g.useState(!1),
      [u, h] = g.useState(null),
      p = g.useRef(null);
    g.useEffect(() => {
      const b = v => {
        var _;
        (_ = p.current) != null && _.contains(v.target) || d(!1);
      };
      return window.addEventListener("mousedown", b), () => window.removeEventListener("mousedown", b);
    }, []);
    const m = b => {
        b.stopPropagation();
        const v = Ait.indexOf(n),
          _ = Ait[(v + 1) % Ait.length];
        r(_);
      },
      f = async b => {
        d(!1), h("format");
        try {
          if (b === "MP3") {
            const v = await Qer(t);
            if (!v) {
              Ai("error", "转换为 MP3 失败，请检查音频是否可播放");
              return;
            }
            i(v, "MP3"), Ai("success", "已转换为 MP3");
          } else {
            const _ = await (await fetch(t)).blob();
            i(_, "WAV"), Ai("success", "已转换为 WAV");
          }
        } catch {
          Ai("error", "格式转换失败");
        } finally {
          h(null);
        }
      },
      y = n === 1 ? "1x" : `${n % 1 === 0 ? n : n.toFixed(2).replace(/\.?0+$/, "")}x`;
    return c.jsx("div", {
      ref: p,
      onMouseDown: b => b.stopPropagation(),
      onClick: b => b.stopPropagation(),
      children: c.jsxs("div", {
        className: UP(e),
        "data-input-image-audio-toolbar": !0,
        "data-canvas-pin-toolbar": "",
        "data-canvas-float-toolbar": "",
        children: [c.jsx(N6e, {
          isDark: e,
          title: x("播放速度 {0}（点击切换）", y),
          onClick: m,
          children: c.jsx("span", {
            className: "text-[11px] font-semibold tabular-nums",
            children: y
          })
        }), c.jsx(N6e, {
          isDark: e,
          title: x("音频裁剪"),
          onClick: b => {
            b.stopPropagation(), a();
          },
          children: c.jsx(Sf, {
            size: 16
          })
        }), c.jsxs("div", {
          className: "relative flex items-center",
          children: [c.jsx(N6e, {
            isDark: e,
            active: l,
            title: x("格式转换"),
            onClick: b => {
              b.stopPropagation(), d(v => !v);
            },
            children: u === "format" ? c.jsx(Ua, {
              size: 16,
              className: "animate-spin"
            }) : c.jsx(nEt, {
              size: 16
            })
          }), l ? c.jsx("div", {
            className: `absolute left-1/2 top-full z-[130] mt-1 min-w-[64px] -translate-x-1/2 rounded-lg border py-1 shadow-xl ${e ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"}`,
            children: kUa.map(b => c.jsx("button", {
              type: "button",
              title: x("转为 {0}", b),
              className: `block w-full px-3 py-1.5 text-center text-[10px] font-semibold tracking-wide ${e ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-50"}`,
              onClick: v => {
                v.stopPropagation(), f(b);
              },
              children: b
            }, b))
          }) : null]
        }), c.jsx(N6e, {
          isDark: e,
          title: x("下载 MP3"),
          onClick: b => {
            b.stopPropagation(), o();
          },
          children: c.jsx(ws, {
            size: 16
          })
        }), s && UD(s) ? c.jsxs(c.Fragment, {
          children: [c.jsx("div", {
            "data-toolbar-divider": "",
            className: fpe(e)
          }), c.jsx($D, {
            nodeIds: [s.id],
            pins: Zg(s),
            isDark: e,
            size: "compact"
          })]
        }) : null]
      })
    });
  },
  j6e = 96;

function D6e(e) {
  const t = Math.floor(e / 60),
    n = Math.floor(e % 60);
  return `${t.toString().padStart(2, "0")}:${n.toString().padStart(2, "0")}`;
}

const tOt = ({
    audioUrl: e,
    isDark: t,
    minDuration: n = .5,
    onCancel: r,
    onConfirm: a
  }) => {
    on();
    const i = g.useRef(null),
      o = g.useRef(null),
      s = g.useRef({
        active: !1,
        moved: !1,
        x: 0,
        y: 0
      }),
      [l, d] = g.useState(null),
      [u, h] = g.useState(0),
      [p, m] = g.useState(0),
      [f, y] = g.useState(!1),
      [b, v] = g.useState(0),
      [_, w] = g.useState(0),
      [k, A] = g.useState(!1),
      [S, C] = g.useState(() => Array.from({
        length: j6e
      }, (D, U) => .15 + Math.abs(Math.sin(U * .37)) * .7));
    g.useEffect(() => {
      const D = new Audio(e);
      D.preload = "auto";
      const U = H => {
        !Number.isFinite(H) || H <= 0 || (h(H), w(H), v(0));
      };
      return D.addEventListener("loadedmetadata", () => U(D.duration)), D.addEventListener("durationchange", () => U(D.duration)), i.current = D, D.load(), () => {
        D.pause(), D.src = "", i.current = null;
      };
    }, [e]), g.useEffect(() => {
      let D = !1;
      const U = jze(e, j6e);
      if (U) {
        C(xW(U));
        return;
      }
      return UFa(e, j6e).then(H => {
        !D && (H != null && H.length) && C(xW(H));
      }), () => {
        D = !0;
      };
    }, [e]), g.useEffect(() => {
      const D = i.current;
      if (!D) return;
      const U = () => m(D.currentTime);
      return D.addEventListener("timeupdate", U), () => D.removeEventListener("timeupdate", U);
    }, [u]), g.useEffect(() => {
      const D = i.current;
      !D || !f || D.currentTime >= _ - .02 && (D.pause(), y(!1), D.currentTime = b, m(b));
    }, [f, _, b, p]);
    const I = D => u > 0 ? D / u * 100 : 0,
      E = g.useCallback(D => {
        var Y;
        const U = (Y = o.current) == null ? void 0 : Y.getBoundingClientRect();
        return !(U != null && U.width) || !u ? 0 : Math.max(0, Math.min(1, (D - U.left) / U.width)) * u;
      }, [u]),
      M = g.useCallback(D => {
        const U = i.current;
        if (!U || !u) return;
        const H = Math.max(0, Math.min(u, D));
        U.currentTime = H, m(H);
      }, [u]);
    g.useEffect(() => {
      if (!l) return;
      const D = H => {
          const Y = E(H.clientX);
          l === "start" ? v(Math.max(0, Math.min(Y, _ - n))) : w(Math.min(u, Math.max(Y, b + n)));
        },
        U = () => d(null);
      return window.addEventListener("pointermove", D), window.addEventListener("pointerup", U), () => {
        window.removeEventListener("pointermove", D), window.removeEventListener("pointerup", U);
      };
    }, [l, u, _, b, n, E]);
    const T = (D, U) => {
        U.stopPropagation(), U.preventDefault(), d(D);
      },
      P = g.useCallback(D => {
        M(E(D));
      }, [M, E]),
      R = D => {
        D.target.closest("[data-crop-handle]") || (D.stopPropagation(), s.current = {
          active: !0,
          moved: !1,
          x: D.clientX,
          y: D.clientY
        });
      },
      j = D => {
        const U = s.current;
        if (!U.active || U.moved) return;
        const H = D.clientX - U.x,
          Y = D.clientY - U.y;
        H * H + Y * Y > 16 && (U.moved = !0);
      },
      B = D => {
        const U = s.current;
        U.active && !U.moved && !l && (D.stopPropagation(), P(D.clientX)), s.current.active = !1;
      },
      F = D => {
        l || s.current.moved || (D.stopPropagation(), P(D.clientX));
      },
      N = D => {
        D.stopPropagation();
        const U = i.current;
        !U || !u || _ - b < n || (f ? (U.pause(), y(!1)) : ((U.currentTime < b || U.currentTime >= _) && (U.currentTime = b, m(b)), U.play(), y(!0)));
      },
      G = async D => {
        if (D.stopPropagation(), !(_ - b < n)) {
          A(!0);
          try {
            const H = await (await fetch(e)).blob(),
              Y = new File([H], "audio-crop.wav", {
                type: H.type || "audio/wav"
              }),
              K = await Y9t(Y, b, _);
            a(K, {
              startTime: b,
              endTime: _
            });
          } catch {} finally {
            A(!1);
          }
        }
      },
      z = t ? "bg-violet-500/25" : "bg-violet-400/20",
      V = t ? "bg-[#1a1a1e] border-zinc-700/80" : "bg-zinc-100 border-zinc-300",
      O = t ? "bg-violet-400" : "bg-violet-600",
      L = t ? "bg-violet-300" : "bg-violet-700";
    return c.jsxs("div", {
      "data-node-edge-chrome": "true",
      className: `flex h-full min-h-0 w-full flex-col overflow-hidden rounded-xl border ${V}`,
      "data-audio-strip-interactive": "crop",
      onMouseDown: D => D.stopPropagation(),
      onClick: D => D.stopPropagation(),
      children: [c.jsxs("div", {
        className: `grid shrink-0 grid-cols-3 items-center border-b px-2 py-1 ${t ? "border-zinc-700/80" : "border-zinc-300"}`,
        children: [c.jsx("span", {
          className: `text-[10px] font-medium ${t ? "text-zinc-300" : "text-zinc-700"}`,
          children: x("裁剪")
        }), c.jsx("div", {
          className: "flex justify-center",
          children: c.jsx("button", {
            type: "button",
            "data-audio-strip-interactive": "crop-play",
            disabled: u <= 0 || _ - b < n,
            onClick: N,
            onMouseDown: D => D.stopPropagation(),
            title: x("预览裁剪区间"),
            className: `flex h-7 w-7 items-center justify-center rounded-full border transition-colors ${t ? "border-zinc-600 bg-zinc-800 text-zinc-100 hover:bg-zinc-700" : "border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-50"}`,
            children: f ? c.jsx(d3, {
              size: 12,
              fill: "currentColor"
            }) : c.jsx(Ol, {
              size: 12,
              className: "ml-0.5",
              fill: "currentColor"
            })
          })
        }), c.jsxs("div", {
          className: "flex items-center justify-end gap-1",
          children: [c.jsx("button", {
            type: "button",
            className: `rounded p-1 ${t ? "hover:bg-zinc-800 text-zinc-400" : "hover:bg-zinc-200 text-zinc-600"}`,
            onClick: D => {
              D.stopPropagation(), r();
            },
            title: x("取消"),
            children: c.jsx(Na, {
              size: 12
            })
          }), c.jsx("button", {
            type: "button",
            disabled: k || u <= 0,
            className: `rounded p-1 ${t ? "hover:bg-violet-900/50 text-violet-300" : "hover:bg-violet-100 text-violet-700"}`,
            onClick: G,
            title: x("应用"),
            children: c.jsx(io, {
              size: 12
            })
          })]
        })]
      }), c.jsxs("div", {
        ref: o,
        "data-audio-strip-waveform": !0,
        className: `relative mx-2 mt-2 mb-1 flex h-14 min-h-[48px] max-h-[56px] flex-1 cursor-pointer touch-none items-end gap-[2px] overflow-visible rounded-lg px-1 ${t ? "bg-zinc-900" : "bg-zinc-200/80"}`,
        onClick: F,
        onPointerDown: R,
        onPointerMove: j,
        onPointerUp: B,
        onPointerCancel: B,
        children: [c.jsx("div", {
          className: "pointer-events-none absolute inset-0 flex items-end gap-[2px] px-1",
          children: S.map((D, U) => {
            const H = U / j6e * 100,
              Y = H >= I(b) && H <= I(_),
              K = u > 0 && H <= I(p);
            return c.jsx("div", {
              className: `min-w-0 flex-1 self-end rounded-[1px] ${Y ? K ? t ? "bg-violet-300/95" : "bg-violet-500/95" : t ? "bg-violet-400/90" : "bg-violet-600/90" : t ? "bg-zinc-600" : "bg-zinc-400"}`,
              style: {
                height: `${$Fa(D, 56, 2)}px`,
                minHeight: 2
              }
            }, U);
          })
        }), c.jsx("div", {
          className: `pointer-events-none absolute bottom-0 top-0 ${z}`,
          style: {
            left: `${I(b)}%`,
            width: `${Math.max(0, I(_) - I(b))}%`
          }
        }), c.jsx("div", {
          className: `pointer-events-none absolute bottom-0 top-0 z-10 w-px ${L} shadow-[0_0_6px_rgba(139,92,246,0.5)]`,
          style: {
            left: `calc(${I(p)}% - 0.5px)`
          }
        }), c.jsx("div", {
          "data-crop-handle": "start",
          role: "slider",
          "aria-label": x("起点"),
          className: `absolute top-0 bottom-0 z-20 w-3 cursor-ew-resize touch-none ${O} opacity-90`,
          style: {
            left: `calc(${I(b)}% - 6px)`
          },
          onPointerDown: D => T("start", D)
        }), c.jsx("div", {
          "data-crop-handle": "end",
          role: "slider",
          "aria-label": x("终点"),
          className: `absolute top-0 bottom-0 z-20 w-3 cursor-ew-resize touch-none ${O} opacity-90`,
          style: {
            left: `calc(${I(_)}% - 6px)`
          },
          onPointerDown: D => T("end", D)
        })]
      }), c.jsx("div", {
        className: `flex shrink-0 items-center justify-center px-2 pb-2 pt-0.5 ${t ? "text-zinc-400" : "text-zinc-600"}`,
        children: c.jsxs("span", {
          className: "font-mono text-[10px] tabular-nums",
          children: [D6e(b), " – ", D6e(_), c.jsx("span", {
            className: `mx-1.5 ${t ? "text-zinc-600" : "text-zinc-400"}`,
            children: "·"
          }), D6e(p), " / ", D6e(u)]
        })
      })]
    });
  },
  AUa = ["创建节点", "拖动画布", "缩放"],
  $an = "AIYOUPLUS",
  SUa = "为守护设计师的肝和钱包而生";

function Gan({
  text: e,
  className: t,
  from: n = 0
}) {
  return c.jsx("p", {
    className: t,
    "aria-label": e,
    children: Array.from(e).map((r, a) => c.jsx("span", {
      className: "canvas-empty-char",
      style: {
        animationDelay: `${(n + a) * 70}ms`
      },
      "aria-hidden": !0,
      children: r === " " ? " " : r
    }, `${r}-${a}`))
  });
}

function IUa({
  isDark: e
}) {
  return c.jsx("span", {
    className: `canvas-empty-pin${e ? " is-dark" : ""}`,
    "aria-hidden": !0,
    children: c.jsx("svg", {
      viewBox: "0 0 24 24",
      width: "22",
      height: "22",
      children: c.jsx("path", {
        d: "M12 2.4c-3.6 0-6.5 2.9-6.5 6.5 0 5.1 6.5 12.7 6.5 12.7s6.5-7.6 6.5-12.7c0-3.6-2.9-6.5-6.5-6.5zm0 8.8a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6z",
        fill: "currentColor"
      })
    })
  });
}

const CUa = ({
    isDark: e
  }) => {
    on();
    const t = g.useMemo(() => AUa.map(n => RTn.find(r => r.label === n)).filter(n => !!n), []);
    return c.jsx("div", {
      className: "absolute inset-0 z-10 flex items-center justify-center pointer-events-none",
      children: c.jsxs("div", {
        className: "pointer-events-none flex flex-col items-center gap-7 select-none",
        children: [c.jsxs("div", {
          className: "canvas-empty-brand",
          children: [c.jsx(IUa, {
            isDark: e
          }), c.jsx(Gan, {
            className: `canvas-empty-title${e ? " is-dark" : ""}`,
            text: $an
          }), c.jsx(Gan, {
            className: `canvas-empty-theme${e ? " is-dark" : ""}`,
            text: SUa,
            from: $an.length
          })]
        }), c.jsx("p", {
          className: `canvas-empty-hints${e ? " is-dark" : ""}`,
          children: t.map(n => c.jsxs("span", {
            className: "canvas-empty-hint",
            children: [c.jsx("kbd", {
              className: "canvas-empty-key",
              children: x(n.keys)
            }), c.jsx("span", {
              children: x(n.label)
            })]
          }, n.label))
        })]
      })
    });
  },
  EUa = 1800,
  TUa = 300,
  otr = "data-canvas-booting";

function Ewt() {
  document.documentElement.removeAttribute(otr);
}

typeof document < "u" && Ewt();

const MUa = ({
    isDark: e
  }) => {
    on();
    const [t, n] = g.useState(!1),
      [r, a] = g.useState(!1);
    return g.useEffect(() => {
      if (r) {
        Ewt();
        return;
      }
      document.documentElement.setAttribute(otr, "");
      const i = window.setTimeout(() => n(!0), EUa);
      return () => {
        window.clearTimeout(i), Ewt();
      };
    }, [r]), g.useEffect(() => {
      if (!t) return;
      const i = window.setTimeout(() => a(!0), TUa);
      return () => window.clearTimeout(i);
    }, [t]), r ? null : c.jsx("div", {
      className: `canvas-boot-splash${e ? " is-dark" : ""}${t ? " is-leaving" : ""}`,
      role: "status",
      "aria-label": x("画布加载中"),
      children: c.jsxs("div", {
        className: "canvas-boot-splash__inner",
        children: [c.jsxs("div", {
          className: "canvas-boot-mascot-anchor",
          children: [c.jsxs("div", {
            className: "canvas-boot-dot-field",
            "aria-hidden": !0,
            children: [c.jsx("div", {
              className: "canvas-boot-dot-layer canvas-boot-dot-layer-base"
            }), c.jsx("div", {
              className: "canvas-boot-dot-layer canvas-boot-dot-layer-wave"
            })]
          }), c.jsx("div", {
            className: "canvas-boot-mascot",
            "aria-hidden": !0,
            children: c.jsx("div", {
              className: "canvas-boot-mascot-frame",
              children: c.jsx("img", {
                className: "canvas-boot-mascot-logo",
                src: e ? YHn : QHn,
                alt: "",
                draggable: !1
              })
            })
          })]
        }), c.jsx("p", {
          className: "canvas-boot-title",
          children: x("AIYOUPLUS")
        })]
      })
    });
  },
  PUa = [{
    mode: "align-left",
    label: "左对齐",
    icon: c.jsx(DEn, {
      className: "w-3.5 h-3.5"
    })
  }, {
    mode: "align-center-x",
    label: "水平居中",
    icon: c.jsx(PEn, {
      className: "w-3.5 h-3.5"
    })
  }, {
    mode: "align-right",
    label: "右对齐",
    icon: c.jsx(NEn, {
      className: "w-3.5 h-3.5"
    })
  }, {
    mode: "align-top",
    label: "顶对齐",
    icon: c.jsx(jEn, {
      className: "w-3.5 h-3.5"
    })
  }, {
    mode: "align-center-y",
    label: "垂直居中",
    icon: c.jsx(MEn, {
      className: "w-3.5 h-3.5"
    })
  }, {
    mode: "align-bottom",
    label: "底对齐",
    icon: c.jsx(REn, {
      className: "w-3.5 h-3.5"
    })
  }],
  RUa = [{
    mode: "distribute-horizontal",
    label: "水平等间距",
    icon: c.jsx(wWt, {
      className: "w-3.5 h-3.5"
    })
  }, {
    mode: "distribute-vertical",
    label: "垂直等间距",
    icon: c.jsx(wWt, {
      className: "w-3.5 h-3.5 rotate-90"
    })
  }, {
    mode: "distribute-horizontal-top",
    label: "水平分布+顶对齐",
    icon: c.jsx(jEn, {
      className: "w-3.5 h-3.5"
    })
  }, {
    mode: "distribute-horizontal-center-y",
    label: "水平分布+垂直居中",
    icon: c.jsx(MEn, {
      className: "w-3.5 h-3.5"
    })
  }, {
    mode: "distribute-horizontal-bottom",
    label: "水平分布+底对齐",
    icon: c.jsx(REn, {
      className: "w-3.5 h-3.5"
    })
  }, {
    mode: "distribute-vertical-left",
    label: "垂直分布+左对齐",
    icon: c.jsx(DEn, {
      className: "w-3.5 h-3.5"
    })
  }, {
    mode: "distribute-vertical-center-x",
    label: "垂直分布+水平居中",
    icon: c.jsx(PEn, {
      className: "w-3.5 h-3.5"
    })
  }, {
    mode: "distribute-vertical-right",
    label: "垂直分布+右对齐",
    icon: c.jsx(NEn, {
      className: "w-3.5 h-3.5"
    })
  }],
  NUa = ({
    isDark: e,
    onAlign: t,
    visible: n,
    onVisibleChange: r
  }) => {
    on();
    const [a, i] = g.useState(!1),
      o = n !== void 0 && r !== void 0,
      s = o ? n : a,
      l = o ? r : i;
    if (g.useEffect(() => {
      const h = p => {
        if (p.key !== "`" && p.key !== "~") return;
        const m = p.target;
        m instanceof HTMLInputElement || m instanceof HTMLTextAreaElement || m instanceof HTMLSelectElement || m instanceof HTMLElement && m.isContentEditable || (p.preventDefault(), o && r ? r(!n) : i(f => !f));
      };
      return window.addEventListener("keydown", h), () => window.removeEventListener("keydown", h);
    }, [o, r, n]), !s) return null;
    const d = e ? "bg-zinc-900/95 border-zinc-700 text-zinc-200" : "bg-white/95 border-zinc-200 text-zinc-800",
      u = e ? "hover:bg-zinc-700 border-zinc-700" : "hover:bg-zinc-100 border-zinc-200";
    return c.jsxs("div", {
      className: `fixed top-20 right-8 z-[9998] rounded-2xl border backdrop-blur-md w-80 ${d}`,
      children: [c.jsxs("div", {
        className: `flex items-center justify-between px-3 py-2 border-b ${e ? "border-zinc-700/50" : "border-zinc-200"}`,
        children: [c.jsx("span", {
          className: "text-xs font-medium opacity-80 tracking-wide",
          children: x("节点对齐")
        }), c.jsx("button", {
          type: "button",
          onClick: () => l(!1),
          className: "p-1 rounded hover:opacity-70",
          "aria-label": x("关闭"),
          children: c.jsx(Na, {
            className: "w-4 h-4"
          })
        })]
      }), c.jsxs("div", {
        className: "p-3 space-y-3 text-[11px]",
        children: [c.jsxs("div", {
          className: "space-y-1.5",
          children: [c.jsx("div", {
            className: "flex items-center justify-between",
            children: c.jsx("span", {
              className: e ? "text-zinc-400" : "text-zinc-500",
              children: x("基础对齐")
            })
          }), c.jsx("div", {
            className: "grid grid-cols-3 gap-1.5",
            children: PUa.map(({
              mode: h,
              label: p,
              icon: m
            }) => c.jsxs("button", {
              type: "button",
              onClick: () => t(h),
              className: `flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg border text-[11px] ${u}`,
              title: p,
              children: [m, c.jsx("span", {
                className: "truncate",
                children: p
              })]
            }, h))
          })]
        }), c.jsxs("div", {
          className: "space-y-1.5",
          children: [c.jsx("div", {
            className: "flex items-center justify-between",
            children: c.jsx("span", {
              className: e ? "text-zinc-400" : "text-zinc-500",
              children: x("分布对齐")
            })
          }), c.jsx("div", {
            className: `grid grid-cols-2 gap-1.5 pt-1 border-t ${e ? "border-zinc-700/50" : "border-zinc-200"}`,
            children: RUa.map(({
              mode: h,
              label: p,
              icon: m
            }) => c.jsxs("button", {
              type: "button",
              onClick: () => t(h),
              className: `flex items-center justify-start gap-1.5 px-2 py-1.5 rounded-lg border text-[11px] ${u}`,
              title: p,
              children: [m, c.jsx("span", {
                className: "truncate",
                children: p
              })]
            }, h))
          })]
        })]
      }), c.jsx("div", {
        className: "px-3 pb-2 text-[10px] opacity-60",
        children: x("Ctrl+拖动框选 ≥2 个节点后可对齐 · 按 ` 或 ~ 关闭")
      })]
    });
  },
  str = ({
    isOpen: e,
    isDark: t,
    klingSubjectLibrary: n,
    selectedSubjects: r,
    onClose: a,
    onConfirm: i,
    onChange: o,
    onCreateSubject: s,
    attachMode: l = "floating"
  }) => {
    on();
    const [d, u] = g.useState(r),
      [h, p] = g.useState(null);
    if (!e) return null;
    const m = b => {
        let v;
        if (d.includes(b)) v = d.filter(_ => _ !== b);else if (d.length < 16) v = [...d, b];else return;
        u(v), o && o(v);
      },
      f = () => {
        i(d), a();
      },
      y = l === "inline";
    return c.jsxs(c.Fragment, {
      children: [!y && c.jsx("div", {
        className: "fixed inset-0 z-[100]",
        "data-kling-overlay-backdrop": !0,
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.3)"
        },
        onPointerDown: b => b.stopPropagation(),
        onClick: a
      }), c.jsxs("div", {
        "data-gen-model-overlay-panel": !0,
        className: `rounded-lg shadow-2xl border ${y ? "w-full" : "absolute top-0 left-full ml-4"} ${t ? "bg-zinc-900 border-white/30" : "bg-white border-zinc-200"}`,
        style: {
          width: "480px",
          maxHeight: "90vh",
          zIndex: 1e3,
          pointerEvents: "auto"
        },
        onMouseDown: b => b.stopPropagation(),
        onPointerDown: b => b.stopPropagation(),
        children: [c.jsx("div", {
          className: "p-3 pt-4 overflow-y-auto minimal-scrollbar",
          style: {
            maxHeight: "calc(90vh - 100px)"
          },
          children: n.length === 0 ? c.jsxs("div", {
            className: `text-center py-8 ${t ? "text-zinc-500" : "text-zinc-400"}`,
            children: [c.jsx("p", {
              className: "text-sm mb-3",
              children: x("暂无主体")
            }), c.jsx("button", {
              onClick: s,
              className: `px-4 py-2 rounded text-sm transition-colors border ${t ? "bg-transparent border-white/30 hover:bg-white/5 text-white" : "bg-blue-500 hover:bg-blue-600 text-white border-transparent"}`,
              children: x("创建第一个主体")
            })]
          }) : c.jsx("div", {
            className: "grid grid-cols-4 gap-3",
            children: n.map(b => {
              const v = d.includes(b.id);
              return c.jsxs("div", {
                onClick: () => m(b.id),
                onMouseEnter: () => p(b),
                onMouseLeave: () => p(null),
                className: `relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${v ? "border-blue-500 ring-2 ring-blue-500/30" : t ? "border-zinc-700 hover:border-blue-500/50" : "border-zinc-200 hover:border-blue-500/50"}`,
                children: [c.jsxs("div", {
                  className: "aspect-square bg-zinc-800 relative",
                  children: [b.mainImage ? c.jsx("img", {
                    src: b.mainImage,
                    alt: b.name,
                    className: "w-full h-full object-cover"
                  }) : c.jsx("div", {
                    className: "w-full h-full flex items-center justify-center text-zinc-500",
                    children: c.jsx(lo, {
                      size: 24
                    })
                  }), v && c.jsx("div", {
                    className: "absolute top-1 right-1 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center",
                    children: c.jsx(io, {
                      size: 14,
                      className: "text-white"
                    })
                  }), b.type && c.jsx("div", {
                    className: "absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[9px] bg-black/60 text-white",
                    children: b.type
                  })]
                }), c.jsx("div", {
                  className: `p-1.5 text-center ${t ? "bg-zinc-900" : "bg-zinc-50"}`,
                  children: c.jsx("p", {
                    className: `text-[10px] truncate font-medium ${t ? "text-zinc-300" : "text-zinc-700"}`,
                    children: b.name
                  })
                })]
              }, b.id);
            })
          })
        }), c.jsxs("div", {
          className: `flex justify-between items-center gap-2 p-3 border-t ${t ? "border-white/30" : "border-zinc-200"}`,
          children: [c.jsx("button", {
            onClick: s,
            className: `px-3 py-1.5 rounded text-xs transition-colors border ${t ? "bg-transparent border-white/30 hover:bg-white/5 text-white" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-transparent"}`,
            children: x("新建")
          }), c.jsxs("div", {
            className: "flex gap-2",
            children: [c.jsx("button", {
              onClick: a,
              className: `px-3 py-1.5 rounded text-xs transition-colors border ${t ? "bg-transparent border-white/30 hover:bg-white/5 text-white" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-transparent"}`,
              children: x("取消")
            }), c.jsxs("button", {
              onClick: f,
              className: `px-4 py-1.5 rounded text-xs transition-colors border ${t ? "bg-transparent border-white/30 hover:bg-white/5 text-white" : "bg-blue-600 hover:bg-blue-500 text-white border-transparent"}`,
              children: [x("确认"), d.length > 0 ? ` (${d.length})` : ""]
            })]
          })]
        }), h && c.jsxs("div", {
          className: `absolute left-full ml-2 top-0 w-64 p-3 rounded-lg shadow-xl border ${t ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200"}`,
          style: {
            zIndex: 2001
          },
          children: [c.jsxs("div", {
            className: "flex items-center gap-2 mb-2",
            children: [c.jsx(Kh, {
              size: 14,
              className: t ? "text-blue-400" : "text-blue-600"
            }), c.jsx("h4", {
              className: `text-sm font-semibold ${t ? "text-zinc-200" : "text-zinc-800"}`,
              children: h.name
            })]
          }), c.jsxs("p", {
            className: `text-xs mb-2 ${t ? "text-zinc-400" : "text-zinc-600"}`,
            children: [x("类型: "), h.type]
          }), h.description && c.jsx("p", {
            className: "text-xs text-zinc-500",
            children: h.description
          }), h.auxiliaryImages && h.auxiliaryImages.length > 0 && c.jsxs("div", {
            className: "mt-2",
            children: [c.jsxs("p", {
              className: `text-[10px] mb-1 ${t ? "text-zinc-500" : "text-zinc-400"}`,
              children: [x("辅助图 ("), h.auxiliaryImages.length, ")"]
            }), c.jsx("div", {
              className: "grid grid-cols-3 gap-1",
              children: h.auxiliaryImages.slice(0, 3).map((b, v) => c.jsx("img", {
                src: b,
                alt: x("辅助图 {0}", v + 1),
                className: "w-full h-12 object-cover rounded border"
              }, v))
            })]
          })]
        })]
      })]
    });
  },
  jUa = Object.freeze(Object.defineProperty({
    __proto__: null,
    KlingSubjectSelector: str
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  ltr = ({
    audioFile: e,
    isOpen: t,
    onClose: n,
    onConfirm: r,
    isDark: a = !1,
    minDuration: i = 3,
    maxDuration: o = 15
  }) => {
    on();
    const [s, l] = g.useState(0),
      [d, u] = g.useState(0),
      [h, p] = g.useState(!1),
      [m, f] = g.useState(0),
      [y, b] = g.useState(0),
      [v, _] = g.useState(null),
      w = g.useRef(null),
      k = g.useRef(null),
      A = g.useRef(null);
    g.useEffect(() => {
      if (!e || !t) return;
      const j = new Audio(),
        B = URL.createObjectURL(e);
      return j.src = B, j.preload = "metadata", j.onloadedmetadata = () => {
        const F = j.duration;
        l(F);
        const N = Math.min(F, o);
        f(0), b(N);
      }, w.current = j, () => {
        URL.revokeObjectURL(B), w.current && (w.current.pause(), w.current = null);
      };
    }, [e, t, o]), g.useEffect(() => {
      if (!w.current) return;
      const j = w.current,
        B = () => {
          const F = j.currentTime;
          u(F), F >= y && (j.pause(), p(!1), j.currentTime = m, u(m));
        };
      if (h) {
        j.currentTime = Math.max(m, d), j.play();
        const F = setInterval(B, 50);
        return () => clearInterval(F);
      } else j.pause();
    }, [h, m, y]);
    const S = () => {
        w.current && (h ? w.current.pause() : ((d < m || d >= y) && (w.current.currentTime = m, u(m)), w.current.play()), p(!h));
      },
      C = j => {
        const B = Math.floor(j / 60),
          F = Math.floor(j % 60);
        return `${B.toString().padStart(2, "0")}:${F.toString().padStart(2, "0")}`;
      },
      I = j => s ? j / s * 100 : 0,
      E = j => s ? j / 100 * s : 0,
      M = j => {
        if (!k.current || !s) return;
        const B = k.current.getBoundingClientRect(),
          N = (j.clientX - B.left) / B.width * 100,
          G = E(N),
          z = Math.abs(G - m),
          V = Math.abs(G - y);
        if (z < V) {
          const O = Math.max(0, Math.min(G, y - i));
          f(O);
        } else {
          const O = Math.min(s, Math.max(G, m + i));
          b(O);
        }
      },
      T = (j, B) => {
        B.preventDefault(), B.stopPropagation(), _(j);
      };
    g.useEffect(() => {
      if (!v || !k.current || !s) return;
      const j = F => {
          const N = k.current.getBoundingClientRect(),
            G = F.clientX - N.left,
            z = Math.max(0, Math.min(100, G / N.width * 100)),
            V = E(z);
          if (v === "start") {
            const O = Math.max(0, Math.min(V, y - i));
            f(O), w.current && !h && (w.current.currentTime = O, u(O));
          } else {
            const O = Math.min(s, Math.max(V, m + i));
            b(O);
          }
        },
        B = () => {
          _(null);
        };
      return window.addEventListener("mousemove", j), window.addEventListener("mouseup", B), () => {
        window.removeEventListener("mousemove", j), window.removeEventListener("mouseup", B);
      };
    }, [v, s, m, y, i, h]);
    const P = () => {
      const j = y - m;
      if (j < i || j > o) {
        alert(x("选择的音频片段时长必须在 {0}-{1}秒之间", i, o));
        return;
      }
      r(m, y), n();
    };
    if (!t) return null;
    const R = y - m;
    return c.jsxs(c.Fragment, {
      children: [c.jsx("div", {
        className: "fixed inset-0 z-[100]",
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.3)"
        },
        onClick: n
      }), c.jsxs("div", {
        ref: A,
        className: `absolute top-0 left-full ml-4 z-[101] w-[420px] rounded-lg shadow-2xl border ${a ? "bg-[#18181b] border-zinc-700" : "bg-white border-zinc-200"}`,
        style: {
          pointerEvents: "auto"
        },
        onClick: j => j.stopPropagation(),
        children: [c.jsxs("div", {
          className: `flex items-center justify-between px-3 py-2 border-b ${a ? "border-zinc-700" : "border-zinc-200"}`,
          children: [c.jsx("h3", {
            className: `text-sm font-semibold ${a ? "text-zinc-200" : "text-zinc-800"}`,
            children: x("选择片段")
          }), c.jsx("button", {
            onClick: n,
            className: `p-1 rounded hover:bg-zinc-800 transition-colors ${a ? "text-zinc-400 hover:text-zinc-200" : "text-zinc-600 hover:text-zinc-800"}`,
            children: c.jsx(Na, {
              size: 16
            })
          })]
        }), c.jsxs("div", {
          className: "p-3",
          children: [c.jsxs("p", {
            className: `text-xs mb-2 ${a ? "text-zinc-400" : "text-zinc-600"}`,
            children: [x("请选取 "), i, "s - ", o, x("s 内的音频内容。")]
          }), c.jsxs("div", {
            className: "flex items-center gap-2 mb-2",
            children: [c.jsx("button", {
              onClick: S,
              className: `p-1.5 rounded-full transition-colors ${a ? "bg-purple-600 hover:bg-purple-500 text-white" : "bg-purple-500 hover:bg-purple-600 text-white"}`,
              children: h ? c.jsx(d3, {
                size: 12
              }) : c.jsx(Ol, {
                size: 12,
                className: "ml-0.5"
              })
            }), c.jsxs("div", {
              className: "flex-1",
              children: [c.jsxs("div", {
                className: `text-xs font-mono ${a ? "text-zinc-300" : "text-zinc-700"}`,
                children: [C(d), " / ", C(s)]
              }), c.jsxs("div", {
                className: `text-xs ${a ? "text-zinc-400" : "text-zinc-600"}`,
                children: [x("已选: "), R.toFixed(1), "s", R >= i && R <= o ? c.jsx("span", {
                  className: "text-green-500 ml-1",
                  children: "✓"
                }) : c.jsx("span", {
                  className: "text-red-500 ml-1",
                  children: "✗"
                })]
              })]
            })]
          }), c.jsxs("div", {
            ref: k,
            className: `relative h-20 rounded-lg mb-2 cursor-pointer overflow-hidden ${a ? "bg-zinc-900" : "bg-zinc-100"}`,
            onClick: M,
            children: [c.jsx("div", {
              className: "absolute inset-0 flex items-center px-1",
              children: c.jsx("svg", {
                width: "100%",
                height: "100%",
                className: "absolute inset-0",
                children: Array.from({
                  length: 120
                }).map((j, B) => {
                  const F = B / 120 * 100,
                    N = Math.random() * 50 + 10,
                    G = F >= I(m) && F <= I(y);
                  return c.jsx("rect", {
                    x: `${F}%`,
                    y: `${50 - N / 2}%`,
                    width: "0.7%",
                    height: `${N}%`,
                    fill: G ? a ? "#a855f7" : "#9333ea" : a ? "#52525b" : "#a1a1aa",
                    opacity: G ? .8 : .3
                  }, B);
                })
              })
            }), c.jsx("div", {
              className: "absolute top-0 bottom-0 bg-purple-500/10 pointer-events-none",
              style: {
                left: `${I(m)}%`,
                width: `${I(y) - I(m)}%`
              }
            }), d >= m && d <= y && c.jsx("div", {
              className: `absolute top-0 bottom-0 w-0.5 shadow-lg pointer-events-none z-20 ${h ? "bg-white" : "bg-yellow-400"}`,
              style: {
                left: `${I(d)}%`
              },
              children: c.jsx("div", {
                className: `absolute -top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full shadow-lg ${h ? "bg-white" : "bg-yellow-400"}`
              })
            }), c.jsxs("div", {
              className: `absolute top-0 bottom-0 w-0.5 cursor-ew-resize z-30 group ${a ? "bg-purple-400" : "bg-purple-500"}`,
              style: {
                left: `${I(m)}%`
              },
              onMouseDown: j => T("start", j),
              children: [c.jsx("div", {
                className: `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-6 rounded ${a ? "bg-purple-400" : "bg-purple-500"} group-hover:scale-110 transition-transform shadow-lg`,
                children: c.jsx("div", {
                  className: "absolute inset-0 flex items-center justify-center",
                  children: c.jsx("div", {
                    className: "w-0.5 h-3 bg-white/80 rounded"
                  })
                })
              }), c.jsx("div", {
                className: `absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-mono whitespace-nowrap ${a ? "text-purple-300" : "text-purple-600"}`,
                children: C(m)
              })]
            }), c.jsxs("div", {
              className: `absolute top-0 bottom-0 w-0.5 cursor-ew-resize z-30 group ${a ? "bg-purple-400" : "bg-purple-500"}`,
              style: {
                left: `${I(y)}%`
              },
              onMouseDown: j => T("end", j),
              children: [c.jsx("div", {
                className: `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-6 rounded ${a ? "bg-purple-400" : "bg-purple-500"} group-hover:scale-110 transition-transform shadow-lg`,
                children: c.jsx("div", {
                  className: "absolute inset-0 flex items-center justify-center",
                  children: c.jsx("div", {
                    className: "w-0.5 h-3 bg-white/80 rounded"
                  })
                })
              }), c.jsx("div", {
                className: `absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-mono whitespace-nowrap ${a ? "text-purple-300" : "text-purple-600"}`,
                children: C(y)
              })]
            })]
          }), c.jsxs("div", {
            className: `text-xs text-center mb-2 ${a ? "text-zinc-400" : "text-zinc-600"}`,
            children: [x("开始: "), C(m), x(" | 结束: "), C(y), x(" | 时长: "), R.toFixed(1), "s"]
          })]
        }), c.jsxs("div", {
          className: `flex justify-end gap-2 px-3 py-2 border-t ${a ? "border-zinc-700" : "border-zinc-200"}`,
          children: [c.jsx("button", {
            onClick: n,
            className: `px-3 py-1 rounded text-xs transition-colors ${a ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"}`,
            children: x("取消")
          }), c.jsx("button", {
            onClick: P,
            disabled: R < i || R > o,
            className: `px-3 py-1 rounded text-xs transition-colors ${R >= i && R <= o ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-zinc-400 text-zinc-200 cursor-not-allowed"}`,
            children: x("确认")
          })]
        })]
      })]
    });
  },
  DUa = Object.freeze(Object.defineProperty({
    __proto__: null,
    AudioSegmentSelector: ltr
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  ctr = 96 * 1024,
  _W = new Map(),
  WV = [],
  LUa = 64;

function OUa(e) {
  const t = e.length;
  if (t <= 256) return e;
  let n = 2166136261;
  const r = Math.max(1, Math.ceil(t / 2048));
  for (let a = 0; a < t; a += r) n ^= e.charCodeAt(a), n = Math.imul(n, 16777619);
  return `du:${t}:${(n >>> 0).toString(16)}:${e.slice(0, 24)}:${e.slice(-16)}`;
}

function Van(e, t) {
  if (_W.has(e)) {
    _W.set(e, t);
    const n = WV.indexOf(e);
    n >= 0 && WV.splice(n, 1), WV.push(e);
    return;
  }
  for (_W.set(e, t), WV.push(e); WV.length > LUa;) {
    const n = WV.shift();
    if (!n) break;
    _W.delete(n);
  }
}

function lx(e) {
  const t = String(e || "");
  return t.startsWith("data:") ? t.startsWith("data:application/json") || t.startsWith("data:video/") || t.startsWith("data:audio/") || t.startsWith("data:text/") ? !0 : t.length > ctr : !1;
}

function rS(e) {
  if (!e) return e;
  if (!lx(e)) return e;
}

async function fCe(e) {
  if (!e || !lx(e)) return e;
  if (!e.startsWith("data:")) return;
  const t = OUa(e),
    n = _W.get(t);
  if (n) return n;
  try {
    const a = await (await fetch(e)).blob();
    if (!a || a.size <= 0) return;
    const i = URL.createObjectURL(a);
    return Van(t, i), i;
  } catch {
    try {
      const r = U4t(e);
      if (r.startsWith("blob:")) return Van(t, r), r;
    } catch {}
    return;
  }
}

function dtr() {
  _W.clear(), WV.length = 0;
}

function BUa() {
  return {
    entries: _W.size
  };
}

const FUa = Object.freeze(Object.defineProperty({
    __proto__: null,
    LAZY_INLINE_MEDIA_MAX_CHARS: ctr,
    clearInternedLazyDisplayUrls: dtr,
    getInternedLazyDisplayAudit: BUa,
    internLazyDisplayUrl: fCe,
    isOversizedLazyInlineString: lx,
    rejectOversizedLazyInline: rS
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  zUa = e => 1500,
  UUa = e => e === "text-node" || e === "preview" || e === "input-image" ? "high" : e === "video-input" || e === "gen-video" || e === "motion-control" ? "low" : "medium",
  yfe = e => e === "input-image" || e === "preview" || e === "video-input" || e === "gen-image" || e === "gen-video";

function lS(e) {
  return e ?? void 0;
}

function utr(e) {
  const t = String(e || "").trim();
  if (!/^https?:\/\//i.test(t)) return !1;
  const n = t.split(/[?#]/, 1)[0] || "";
  return /\/videos\//i.test(n) || /\.(mp4|webm|mov|m4v)$/i.test(n);
}

const Twt = new Set();

let Han = !1;

function Lze() {
  return Yi();
}

function $Ua() {
  if (Han) return;
  Han = !0;
  const e = () => {
    Yi() || Twt.forEach(t => {
      try {
        t();
      } catch (n) {
        console.error("[useLazyContent] canvas lazy resume listener error:", n);
      }
    });
  };
  $v(t => {
    t || e();
  });
}

function htr(e) {
  return $Ua(), Twt.add(e), () => {
    Twt.delete(e);
  };
}

const GUa = typeof navigator < "u" && (navigator.platform.toLowerCase().includes("mac") || navigator.userAgent.toLowerCase().includes("mac"));

function VUa() {
  const e = a9();
  let t = e.lazyContentCacheMaxBytes,
    n = e.lazyContentCacheMaxItems;
  return GUa && (t = Math.min(t, 32 * 1024 * 1024), n = Math.min(n, 128)), {
    maxBytes: t,
    maxItems: n
  };
}

const ptr = VUa();

let Sit = ptr.maxBytes,
  HUa = ptr.maxItems;

const xh = new Map();

let ax = 0;

const v2 = [];

let Wan = 0;

function TXe(e) {
  Wan += 1, typeof window < "u" && window.dispatchEvent(new CustomEvent("lazyContentMemoryRelease", {
    detail: {
      epoch: Wan,
      deferRestore: (e == null ? void 0 : e.deferRestore) === !0
    }
  }));
}

function WUa() {
  const e = v2.shift();
  if (!e) return !1;
  if (!xh.has(e)) return !0;
  const t = xh.get(e);
  return t && (ax -= t.length * 2, t.startsWith("blob:") && x0(t)), xh.delete(e), !0;
}

function mtr(e, t) {
  if (!t || lx(t)) return;
  const n = t.length * 2;
  if (!(n > Sit / 2)) {
    if (xh.has(e)) {
      const r = xh.get(e);
      if (r === t) {
        const i = v2.indexOf(e);
        i > -1 && v2.splice(i, 1), v2.push(e);
        return;
      }
      ax -= r ? r.length * 2 : 0, xh.delete(e);
      const a = v2.indexOf(e);
      a > -1 && v2.splice(a, 1), r != null && r.startsWith("blob:") && r !== t && x0(r);
    }
    for (; (ax + n > Sit || xh.size >= HUa) && v2.length > 0 && WUa(););
    ax = Math.max(0, ax), !(ax + n > Sit) && (xh.set(e, t), v2.push(e), ax += n);
  }
}

async function r7e(e, t) {
  const n = await fCe(t);
  if (!(!n || lx(n))) return mtr(e, n), n;
}

function qUa(e, t) {
  mtr(e, t);
}

async function o5(e, t) {
  if (Ur.isAvailable() && Ur.hasThumbnail(e, t)) {
    const n = await Ur.readThumbnail(e, t);
    if (n) return n;
  }
  return t === "thumb" ? Wd.getThumbnail(e) : Wd.getPreview(e);
}

function Kp(e, t = {}) {
  const n = B$(e) ?? (typeof e == "string" ? e : void 0),
    {
      enabled: r = !0,
      placeholder: a,
      useThumbnail: i = !1,
      usePreview: o = !1,
      useOriginal: s = !1,
      renderQuality: l = "high",
      distanceToViewportCenter: d = 0,
      shouldLoadContent: u = !0,
      nodeType: h = "unknown",
      totalNodeCount: p = 0,
      preferConstantDisplay: m = !1,
      disableThumbnailStoreWrites: f = !1,
      blobRecoveryAssetIds: y,
      onBlobUrlRecovered: b,
      allowSessionBlob: v = !1,
      allowDirectOssUrl: _ = !1,
      canvasNodeId: w,
      ossMapPriority: k
    } = t,
    A = (w == null ? void 0 : w.trim()) || `${h}:${(n == null ? void 0 : n.substring(0, 48)) ?? ""}`,
    S = k ?? (l === "low" ? "low" : l === "high" ? "high" : "medium"),
    C = g.useRef(b);
  C.current = b;
  const I = g.useMemo(() => ((y == null ? void 0 : y.filter(Boolean)) ?? []).join("\0"), [y]),
    E = g.useMemo(() => n ? Er.isContentRef(n) : !1, [n]),
    M = s ? "" : o ? "_preview" : i ? "_thumb" : "_preview",
    T = g.useMemo(() => {
      if (E && n) {
        const K = Er.extractId(n),
          W = K + M || K;
        return rS(xh.get(W));
      }
    }, [E, n, M]),
    [P, R] = g.useState(() => {
      if (T) return T;
      if (E && n) {
        const K = Er.extractId(n),
          W = rS(Er.getFromCacheSync(K) ?? void 0);
        if (W) return W;
        if (!s) {
          const Q = K + "_thumb",
            q = rS(xh.get(Q));
          if (q) return q;
          const ne = K + "_preview",
            de = rS(xh.get(ne));
          if (de) return de;
        }
      }
      if (!E) return typeof n == "string" && (n.startsWith("blob:") || n.startsWith("data:")) ? rS(n) : n;
    }),
    [j, B] = g.useState(() => !E && typeof n == "string" && $le(n) ? !0 : !(!E || T || n && Er.getFromCacheSync(Er.extractId(n)))),
    [F, N] = g.useState(!1),
    [G, z] = g.useState(() => !!T || !!(E && n && Er.getFromCacheSync(Er.extractId(n)))),
    V = g.useRef(!1),
    O = g.useRef(void 0),
    L = g.useRef(!0),
    D = g.useRef(!1),
    U = g.useRef(void 0);
  g.useEffect(() => {
    U.current = P;
  }, [P]);
  const [H, Y] = g.useState(0);
  return g.useEffect(() => {
    if (!m) return htr(() => {
      L.current && Y(K => K + 1);
    });
  }, [m]), g.useEffect(() => (L.current = !0, () => {
    L.current = !1;
    const K = U.current;
    K && K.startsWith("blob:") && x0(K);
  }), []), g.useEffect(() => {
    const K = Q => {
        var le;
        if (!(E && !!n || typeof n == "string" && (n.startsWith("data:") || n.startsWith("blob:")))) return;
        const ne = U.current;
        ne && ne.startsWith("blob:") && x0(ne), D.current = !0, R(void 0), B(!1), N(!1), O.current = void 0, !(((le = Q.detail) == null ? void 0 : le.deferRestore) === !0) && L.current && (y != null && y.length || E) && (D.current = !1, Y(J => J + 1));
      },
      W = () => {
        !D.current || !L.current || (D.current = !1, Y(Q => Q + 1));
      };
    return window.addEventListener("lazyContentMemoryRelease", K), window.addEventListener("canvasActivity", W), () => {
      window.removeEventListener("lazyContentMemoryRelease", K), window.removeEventListener("canvasActivity", W);
    };
  }, [E, n, I, y]), g.useEffect(() => {
    if (!(y != null && y.length)) return;
    const K = n;
    if (!(K != null && K.startsWith("blob:"))) return;
    let W = !1;
    return (async () => {
      var le;
      let q = !1;
      if (!Nd(K)) q = !0;else try {
        (await fetch(K, {
          cache: "no-store"
        })).ok || (q = !0);
      } catch {
        q = !0;
      }
      if (!q || W || !L.current) return;
      const {
          recoverDeadBlobUrl: ne
        } = await Ie(async () => {
          const {
            recoverDeadBlobUrl: J
          } = await Promise.resolve().then(() => No);
          return {
            recoverDeadBlobUrl: J
          };
        }, void 0, import.meta.url),
        de = await ne(K, y);
      !de || W || !L.current || (R(de), N(!1), z(!1), (le = C.current) == null || le.call(C, de));
    })(), () => {
      W = !0;
    };
  }, [n, I]), g.useEffect(() => {
    const K = `${n ?? ""}\0${I}`,
      W = O.current === K;
    let Q = !1;
    if (T && W) {
      R(T), B(!1), z(!0), N(!1);
      return;
    }
    if (W && E && n) {
      const J = Er.extractId(n),
        pe = J + M || J,
        ce = rS(xh.get(pe) ?? (s ? Er.getFromCacheSync(J) : void 0) ?? void 0);
      if (ce) {
        R(ce), B(!1), z(!0), N(!1);
        return;
      }
      if (!s && !P) {
        const we = J + "_thumb",
          X = rS(xh.get(we));
        if (X) {
          R(X), B(!1), z(!0), N(!1);
          return;
        }
        const Z = J + "_preview",
          re = rS(xh.get(Z));
        if (re) {
          R(re), B(!1), z(!0), N(!1);
          return;
        }
      }
    }
    if (W && P && !j) if (lx(P)) R(void 0);else return;
    if (!n || !Er.isContentRef(n)) {
      const J = Tu(n),
        pe = typeof n == "string" && n.startsWith("blob:") && !Nd(n) && !(y != null && y.length) && !v,
        ce = typeof n == "string" && (n.startsWith("blob:") || n.startsWith("data:")),
        we = E0() && !ce && typeof n == "string" && ($le(n) || nr(n));
      if (ei() && typeof n == "string" && nr(n) && r && u && !J) {
        B(!0), N(!1), z(!1), O.current = K;
        let re = !1;
        return (async () => {
          try {
            const fe = await tHe(n, y);
            if (!L.current || re) return;
            R(fe ?? void 0), N(!fe), z(!!(fe != null && fe.startsWith("blob:"))), O.current = K;
          } finally {
            L.current && !re && B(!1);
          }
        })(), () => {
          re = !0;
        };
      }
      if (we && r && u && !J) {
        if (s && /\/thumbnails\//i.test(n)) {
          R(void 0), B(!1), N(!1), z(!1), O.current = K;
          return;
        }
        if (_ || (!s || utr(n)) && E0() || CNt()) {
          (async () => {
            const {
                normalizeOssPublicHttpUrl: fe
              } = await Ie(async () => {
                const {
                  normalizeOssPublicHttpUrl: ie
                } = await Promise.resolve().then(() => ii);
                return {
                  normalizeOssPublicHttpUrl: ie
                };
              }, void 0, import.meta.url),
              ye = fe(n) || n;
            L.current && (R(ye), N(!1), z(!1), B(!1), O.current = K);
          })();
          return;
        }
        B(!0), N(!1), z(!1), O.current = K;
        let re = !1;
        return (async () => {
          try {
            const {
                normalizeOssPublicHttpUrl: fe
              } = await Ie(async () => {
                const {
                  normalizeOssPublicHttpUrl: ae
                } = await Promise.resolve().then(() => ii);
                return {
                  normalizeOssPublicHttpUrl: ae
                };
              }, void 0, import.meta.url),
              ye = await WQe(n, A, S, y == null ? void 0 : y[0], s);
            if (!L.current || re) return;
            const ie = ye || fe(n) || n;
            R(ie), N(!1), z(ie.startsWith("blob:") || ie.startsWith("data:")), O.current = K;
          } catch {
            if (L.current && !re) {
              const {
                normalizeOssPublicHttpUrl: fe
              } = await Ie(async () => {
                const {
                  normalizeOssPublicHttpUrl: ye
                } = await Promise.resolve().then(() => ii);
                return {
                  normalizeOssPublicHttpUrl: ye
                };
              }, void 0, import.meta.url);
              R(fe(n) || n), N(!1);
            }
          } finally {
            L.current && !re && B(!1);
          }
        })(), () => {
          re = !0;
        };
      }
      if (typeof n == "string" && n.startsWith("blob:") && (y != null && y.length) && u && r && !J) {
        B(!0), N(!1), z(!1), O.current = K;
        let re = !1;
        return (async () => {
          var fe;
          try {
            let ye = !1;
            try {
              ye = (await fetch(n, {
                cache: "no-store"
              })).ok;
            } catch {
              ye = !1;
            }
            if (ye && !re && L.current) {
              R(n), N(!1), z(!1);
              return;
            }
            const {
                recoverDeadBlobUrl: ie
              } = await Ie(async () => {
                const {
                  recoverDeadBlobUrl: Ee
                } = await Promise.resolve().then(() => No);
                return {
                  recoverDeadBlobUrl: Ee
                };
              }, void 0, import.meta.url),
              ae = await ie(n, y);
            if (ae && !re && L.current) {
              R(ae), N(!1), z(!1), (fe = C.current) == null || fe.call(C, ae);
              return;
            }
            const {
              resolveLocalCachedDisplayUrls: be
            } = await Ie(async () => {
              const {
                resolveLocalCachedDisplayUrls: Ee
              } = await Promise.resolve().then(() => Ui);
              return {
                resolveLocalCachedDisplayUrls: Ee
              };
            }, void 0, import.meta.url);
            for (const Ee of y) {
              const xe = await be(Ee);
              if (xe != null && xe.displayUrl && !re && L.current) {
                R(xe.displayUrl), N(!1), z(xe.displayUrl.startsWith("blob:"));
                return;
              }
            }
            !re && L.current && (R(void 0), N(!0));
          } finally {
            !re && L.current && B(!1);
          }
        })(), () => {
          re = !0;
        };
      }
      const X = ei() && typeof n == "string" && nr(n),
        Z = J || pe || X ? void 0 : n;
      if (Z && lx(Z)) return O.current = K, B(!0), N(!1), fCe(Z).then(re => {
        !L.current || Q || (R(re), B(!1), N(!re), z(!!(re != null && re.startsWith("blob:"))));
      }), () => {
        Q = !0;
      };
      R(Z), B(!1), N(J || pe || X), z(!1), O.current = K;
      return;
    }
    const q = UUa(h),
      ne = zUa();
    if (!u || q === "low" && l === "low" && d > ne * .6 || q === "medium" && l === "low" && d > ne || (q === "high" ? !1 : l === "low" && d > ne * 1.5)) {
      (m || yfe(h)) && !!P && !lx(P) || R(a), B(!1), z(!0), N(!1), O.current = K;
      return;
    }
    if (!r) {
      (m || yfe(h)) && !!P && !lx(P) || R(a), B(!1), z(!0), O.current = K;
      return;
    }
    if (V.current) return;
    if (W && E && n) {
      const J = Er.extractId(n),
        pe = J + M || J,
        ce = rS(xh.get(pe) ?? (s ? Er.getFromCacheSync(J) : void 0) ?? void 0);
      if (ce) {
        R(ce), B(!1), z(!0);
        return;
      }
    }
    return !m && Lze() ? void 0 : ((async () => {
      if (V.current = !0, B(!0), N(!1), !m && Lze()) {
        V.current = !1, B(!1);
        return;
      }
      try {
        await Er.init();
        const J = Er.extractId(n);
        let pe;
        if (i || o) {
          if (pe = lS(await o5(J, o ? "preview" : "thumb")), !pe && (pe = lS(await Er.get(J)), !f && pe && pe.startsWith("data:image"))) {
            await Wd.storeWithThumbnails(J, pe);
            const ce = await o5(J, o ? "preview" : "thumb");
            ce && (pe = ce);
          }
        } else if (s) pe = lS(await Er.get(J));else if (pe = lS(await o5(J, "preview")), !pe && (pe = lS(await Er.get(J)), !f && pe && pe.startsWith("data:image"))) {
          const ce = J;
          Wd.storeWithThumbnails(ce, pe).catch(() => {});
          const we = await o5(ce, "preview");
          we && (pe = we);
        }
        if (!L.current || Q) return;
        if (pe && Tu(pe) && (pe = void 0), pe) {
          const ce = J + M || J,
            we = await r7e(ce, pe);
          if (!L.current || Q) return;
          R(we), z(!0), N(!we), O.current = K;
        } else {
          for (let ce = 0; ce < 3 && L.current && !Q && !pe; ce++) if (await new Promise(we => setTimeout(we, 200 + ce * 200)), pe = lS(await Er.get(J)), pe && (i || o)) {
            const we = await o5(J, o ? "preview" : "thumb");
            we && (pe = we);
          }
          if (pe && L.current && !Q) {
            const ce = J + M || J,
              we = await r7e(ce, pe);
            if (!L.current || Q) return;
            R(we), z(!0), N(!we), O.current = K;
          } else if (y != null && y.length && L.current && !Q) {
            try {
              const {
                resolveLocalCachedDisplayUrls: ce
              } = await Ie(async () => {
                const {
                  resolveLocalCachedDisplayUrls: we
                } = await Promise.resolve().then(() => Ui);
                return {
                  resolveLocalCachedDisplayUrls: we
                };
              }, void 0, import.meta.url);
              for (const we of y) {
                const X = await o5(we, o ? "preview" : "thumb");
                if (X) {
                  pe = X;
                  break;
                }
                const Z = await ce(we);
                if (Z != null && Z.displayUrl) {
                  pe = Z.displayUrl;
                  break;
                }
              }
            } catch {}
            if (pe && L.current && !Q) {
              const ce = J + M || J,
                we = await r7e(ce, pe);
              if (!L.current || Q) return;
              R(we), z(!0), N(!we), O.current = K;
            } else Q || (console.warn("[useLazyContent] Content not found in IndexedDB:", J), m || yfe(h) || R(void 0), N(!0), O.current = K);
          } else Q || (console.warn("[useLazyContent] Content not found in IndexedDB:", J), m || yfe(h) || R(void 0), N(!0), O.current = K);
        }
      } catch (J) {
        console.error("[useLazyContent] Failed to load content:", J), L.current && !Q && (m || yfe(h) || R(void 0), N(!0), O.current = K);
      } finally {
        L.current && !Q && B(!1), V.current = !1;
      }
    })(), () => {
      Q = !0;
    });
  }, [n, I, r, a, T, i, o, s, M, H, l, d, u, m, f, y, _, v, A, S]), {
    content: P,
    isLoading: j,
    hasError: F,
    isFromStore: G
  };
}

async function KUa(e, t, n) {
  const {
      useOriginal: r = !1,
      preferConstantDisplay: a = !1,
      allowDirectOssUrl: i = !1,
      allowSessionBlob: o = !1,
      blobRecoveryAssetIds: s,
      ossQueueNodeId: l,
      ossMapPriority: d,
      enabled: u = !0,
      shouldLoadContent: h = !0,
      placeholder: p,
      canvasNodeId: m,
      nodeType: f = "unknown"
    } = t,
    y = (l == null ? void 0 : l.trim()) || (m == null ? void 0 : m.trim()) || `${f}:${e.substring(0, 48)}`;
  if (Tu(e)) return {
    content: a ? n : p,
    isLoading: !1,
    hasError: !0,
    isFromStore: !1
  };
  const v = e.startsWith("blob:") || e.startsWith("data:"),
    _ = E0() && !v && ($le(e) || nr(e));
  if (ei() && nr(e) && u && h) {
    const S = await tHe(e, s);
    return {
      content: S ?? void 0,
      isLoading: !1,
      hasError: !S,
      isFromStore: !!(S != null && S.startsWith("blob:"))
    };
  }
  if (_ && u && h) {
    if (r && /\/thumbnails\//i.test(e)) return {
      content: void 0,
      isLoading: !1,
      hasError: !1,
      isFromStore: !1
    };
    if (i || (!r || utr(e)) && E0() || CNt()) {
      const {
        normalizeOssPublicHttpUrl: S
      } = await Ie(async () => {
        const {
          normalizeOssPublicHttpUrl: I
        } = await Promise.resolve().then(() => ii);
        return {
          normalizeOssPublicHttpUrl: I
        };
      }, void 0, import.meta.url);
      return {
        content: S(e) || e,
        isLoading: !1,
        hasError: !1,
        isFromStore: !1
      };
    }
    try {
      const {
          normalizeOssPublicHttpUrl: S
        } = await Ie(async () => {
          const {
            normalizeOssPublicHttpUrl: E
          } = await Promise.resolve().then(() => ii);
          return {
            normalizeOssPublicHttpUrl: E
          };
        }, void 0, import.meta.url),
        I = (await WQe(e, y, d, s == null ? void 0 : s[0], r)) || S(e) || e;
      return {
        content: I,
        isLoading: !1,
        hasError: !1,
        isFromStore: I.startsWith("blob:") || I.startsWith("data:")
      };
    } catch {
      const {
        normalizeOssPublicHttpUrl: S
      } = await Ie(async () => {
        const {
          normalizeOssPublicHttpUrl: C
        } = await Promise.resolve().then(() => ii);
        return {
          normalizeOssPublicHttpUrl: C
        };
      }, void 0, import.meta.url);
      return {
        content: S(e) || e,
        isLoading: !1,
        hasError: !1,
        isFromStore: !1
      };
    }
  }
  if (e.startsWith("blob:") && (s != null && s.length) && h && u) try {
    let S = !1;
    try {
      S = (await fetch(e, {
        cache: "no-store"
      })).ok;
    } catch {
      S = !1;
    }
    if (S) return {
      content: e,
      isLoading: !1,
      hasError: !1,
      isFromStore: !1
    };
    const {
        recoverDeadBlobUrl: C
      } = await Ie(async () => {
        const {
          recoverDeadBlobUrl: M
        } = await Promise.resolve().then(() => No);
        return {
          recoverDeadBlobUrl: M
        };
      }, void 0, import.meta.url),
      I = await C(e, s);
    if (I) return {
      content: I,
      isLoading: !1,
      hasError: !1,
      isFromStore: !1
    };
    const {
      resolveLocalCachedDisplayUrls: E
    } = await Ie(async () => {
      const {
        resolveLocalCachedDisplayUrls: M
      } = await Promise.resolve().then(() => Ui);
      return {
        resolveLocalCachedDisplayUrls: M
      };
    }, void 0, import.meta.url);
    for (const M of s) {
      const T = await E(M);
      if (T != null && T.displayUrl) return {
        content: T.displayUrl,
        isLoading: !1,
        hasError: !1,
        isFromStore: T.displayUrl.startsWith("blob:")
      };
    }
  } catch {}
  if (e.startsWith("blob:") && !Nd(e) && !(s != null && s.length) && !o) return {
    content: a ? n : void 0,
    isLoading: !1,
    hasError: !0,
    isFromStore: !1
  };
  const k = ei() && nr(e);
  let A = k ? a ? n : void 0 : e;
  return A && lx(A) && (A = await fCe(A)), {
    content: A,
    isLoading: !1,
    hasError: k || !A,
    isFromStore: !!(A != null && A.startsWith("blob:"))
  };
}

function j1(e, t = {}) {
  const {
      useThumbnail: n = !1,
      usePreview: r = !1,
      useOriginal: a = !1,
      preferConstantDisplay: i = !1,
      disableThumbnailStoreWrites: o = !1,
      loadOnlyIndices: s,
      allowDirectOssUrl: l = !1,
      blobRecoveryAssetIdsPerIndex: d
    } = t,
    u = s != null && s.length ? s.join(",") : "",
    h = (d == null ? void 0 : d.map(S => (S == null ? void 0 : S.join(",")) || "").join("|")) || "",
    p = g.useMemo(() => e.map(S => {
      if (!S) return "empty";
      if (typeof S != "string") try {
        return JSON.stringify(S).substring(0, 100);
      } catch {
        return "object";
      }
      return Er.isContentRef(S) ? S : S.substring(0, 100);
    }).join("|") + `\0${h}`, [e, h]),
    m = g.useMemo(() => e.map(S => {
      if (!S) return {
        content: S,
        isLoading: !1,
        hasError: !1,
        isFromStore: !1
      };
      if (typeof S != "string") return {
        content: S,
        isLoading: !1,
        hasError: !1,
        isFromStore: !1
      };
      if (!Er.isContentRef(S)) {
        const P = Tu(S),
          R = ei() && nr(S),
          j = P || R ? void 0 : S;
        return {
          content: rS(j),
          isLoading: !!(j && lx(j)),
          hasError: P || R,
          isFromStore: !1
        };
      }
      const I = Er.extractId(S),
        M = I + (a ? "" : r ? "_preview" : n ? "_thumb" : "_preview"),
        T = rS(xh.get(M) ?? (a ? Er.getFromCacheSync(I) : void 0) ?? void 0);
      return T ? {
        content: T,
        isLoading: !1,
        hasError: !1,
        isFromStore: !0
      } : {
        content: void 0,
        isLoading: !0,
        hasError: !1,
        isFromStore: !1
      };
    }), [p, n, r, a]),
    [f, y] = g.useState(m),
    b = g.useRef([]),
    v = g.useCallback((S, C) => {
      const I = new Map();
      return C.forEach((E, M) => {
        if (!E || typeof E != "string") return;
        const T = S[M];
        T != null && T.content && I.set(E, T);
      }), I;
    }, []);
  g.useEffect(() => {
    y(S => {
      if (!i) return b.current = e.slice(), m;
      const C = v(S, b.current),
        I = m.map((E, M) => {
          const T = e[M];
          if (!E.content && typeof T == "string" && T) {
            const P = C.get(T);
            if (P != null && P.content && !lx(P.content)) return {
              ...E,
              content: P.content,
              isLoading: E.isLoading,
              hasError: !1,
              isFromStore: P.isFromStore
            };
          }
          return E;
        });
      return b.current = e.slice(), I.length === S.length && I.every((E, M) => {
        const T = S[M];
        return E.content === T.content && E.isLoading === T.isLoading && E.hasError === T.hasError && E.isFromStore === T.isFromStore;
      }) ? S : I;
    });
  }, [m, i, e, v]);
  const _ = g.useRef(!0),
    w = g.useRef(!1);
  g.useEffect(() => (_.current = !0, () => {
    _.current = !1;
  }), []);
  const [k, A] = g.useState(0);
  return g.useEffect(() => {
    if (!i) return htr(() => {
      _.current && A(S => S + 1);
    });
  }, [i]), g.useEffect(() => {
    const S = I => {
        var M;
        w.current = !0, y(T => T.map(P => {
          if (!P.content) return P;
          const R = P.content;
          return P.isFromStore || typeof R == "string" && (R.startsWith("data:") || R.startsWith("blob:")) ? {
            ...P,
            content: void 0,
            isLoading: !1,
            hasError: !1
          } : P;
        })), !(((M = I.detail) == null ? void 0 : M.deferRestore) === !0) && _.current && (w.current = !1, A(T => T + 1));
      },
      C = () => {
        !w.current || !_.current || (w.current = !1, A(I => I + 1));
      };
    return window.addEventListener("lazyContentMemoryRelease", S), window.addEventListener("canvasActivity", C), () => {
      window.removeEventListener("lazyContentMemoryRelease", S), window.removeEventListener("canvasActivity", C);
    };
  }, []), g.useEffect(() => {
    let S = !1;
    if (!i && Lze()) return;
    const C = async () => {
      if (await Er.init(), !i && Lze()) return;
      const E = v(f, b.current),
        M = await Promise.all(e.map(async (T, P) => {
          var z, V, O, L;
          const R = d == null ? void 0 : d[P];
          if (s && s.length > 0 && !s.includes(P)) {
            const D = (z = f[P]) == null ? void 0 : z.content;
            if (D) return {
              content: D,
              isLoading: !1,
              hasError: !1,
              isFromStore: ((V = f[P]) == null ? void 0 : V.isFromStore) ?? !1
            };
            if (!T || typeof T != "string") return {
              content: T,
              isLoading: !1,
              hasError: !1,
              isFromStore: !1
            };
            if (!Er.isContentRef(T)) {
              const U = Tu(T),
                H = U ? void 0 : T,
                Y = H && lx(H) ? await fCe(H) : H;
              return {
                content: Y,
                isLoading: !1,
                hasError: U || !Y,
                isFromStore: !!(Y != null && Y.startsWith("blob:"))
              };
            }
            return {
              content: void 0,
              isLoading: !1,
              hasError: !1,
              isFromStore: !1
            };
          }
          const j = typeof T == "string" && T ? (O = E.get(T)) == null ? void 0 : O.content : void 0;
          if (!T || typeof T != "string" || !Er.isContentRef(T)) return !T || typeof T != "string" ? {
            content: T,
            isLoading: !1,
            hasError: !1,
            isFromStore: !1
          } : KUa(T, {
            ...t,
            blobRecoveryAssetIds: R ?? t.blobRecoveryAssetIds
          }, i ? j : void 0);
          if (t.enabled === !1) return {
            content: i ? j ?? t.placeholder : t.placeholder,
            isLoading: !1,
            hasError: !1,
            isFromStore: !0
          };
          const B = Er.extractId(T),
            N = B + (a ? "" : r ? "_preview" : n ? "_thumb" : "_preview"),
            G = rS(xh.get(N) ?? (a ? Er.getFromCacheSync(B) : void 0) ?? void 0);
          if (G) return {
            content: G,
            isLoading: !1,
            hasError: !1,
            isFromStore: !0
          };
          try {
            let D;
            if (a) D = lS(await Er.get(B));else if (n || r) {
              if (D = lS(await o5(B, r ? "preview" : "thumb")), !D && (D = lS(await Er.get(B)), !o && D && D.startsWith("data:image"))) {
                await Wd.storeWithThumbnails(B, D);
                const U = await o5(B, r ? "preview" : "thumb");
                U && (D = U);
              }
            } else if (D = lS(await o5(B, "preview")), !D && (D = lS(await Er.get(B)), !o && D && D.startsWith("data:image"))) {
              Wd.storeWithThumbnails(B, D).catch(() => {});
              const U = await o5(B, "preview");
              U && (D = U);
            }
            if (D || (await new Promise(U => setTimeout(U, 200)), D = lS(a ? await Er.get(B) : (await o5(B, n ? "thumb" : "preview")) || (await Er.get(B)))), !D && (R != null && R.length)) try {
              const {
                resolveLocalCachedDisplayUrls: U
              } = await Ie(async () => {
                const {
                  resolveLocalCachedDisplayUrls: H
                } = await Promise.resolve().then(() => Ui);
                return {
                  resolveLocalCachedDisplayUrls: H
                };
              }, void 0, import.meta.url);
              for (const H of R) if (D = (await o5(H, r ? "preview" : "thumb")) || void 0, D || (D = (L = await U(H)) == null ? void 0 : L.displayUrl), D) break;
            } catch {}
            if (D && Tu(D) && (D = void 0), D) {
              const U = await r7e(N, D);
              return {
                content: U,
                isLoading: !1,
                hasError: !U,
                isFromStore: !0
              };
            } else return console.warn("[useLazyContents] Content not found:", B), {
              content: i && j && !lx(j) ? j : void 0,
              isLoading: !1,
              hasError: !0,
              isFromStore: !0
            };
          } catch (D) {
            return console.error("[useLazyContents] Failed to load content:", D), {
              content: i ? j ?? t.placeholder : t.placeholder,
              isLoading: !1,
              hasError: !0,
              isFromStore: !0
            };
          }
        }));
      _.current && !S && (y(M), b.current = e.slice());
    };
    return e.some((E, M) => !E || typeof E != "string" || s && s.length > 0 && !s.includes(M) ? !1 : Er.isContentRef(E) || lx(E)) && C(), () => {
      S = !0;
    };
  }, [p, t.enabled, t.placeholder, n, r, a, k, i, o, u]), f;
}

function Cde() {
  for (const e of xh.values()) e.startsWith("blob:") && x0(e);
  xh.clear(), v2.length = 0, ax = 0, dtr();
}

function ftr() {
  let e = 0;
  for (const [t, n] of [...xh.entries()]) {
    if (!lx(n)) continue;
    ax -= n.length * 2, xh.delete(t);
    const r = v2.indexOf(t);
    r > -1 && v2.splice(r, 1), e += 1;
  }
  return ax = Math.max(0, ax), e;
}

function gtr(e = .5) {
  const t = Math.min(1, Math.max(0, e)),
    n = Math.ceil(xh.size * t);
  let r = 0;
  for (; xh.size > n && v2.length > 0;) {
    const a = v2.shift();
    if (!a || !xh.has(a)) continue;
    const i = xh.get(a);
    i && (ax -= i.length * 2, i.startsWith("blob:") && x0(i)), xh.delete(a), r += 1;
  }
  return ax = Math.max(0, ax), r;
}

function ype(e) {
  if (!e || !Er.isContentRef(e)) return;
  const t = Er.extractId(e),
    n = [t, `${t}_thumb`, `${t}_preview`];
  for (const r of n) {
    if (!xh.has(r)) continue;
    const a = xh.get(r);
    a && (ax -= a.length * 2, a.startsWith("blob:") && x0(a)), xh.delete(r);
    const i = v2.indexOf(r);
    i > -1 && v2.splice(i, 1);
  }
}

function QUa() {
  return {
    count: xh.size,
    totalSize: ax
  };
}

const MXe = Object.freeze(Object.defineProperty({
  __proto__: null,
  clearContentCache: Cde,
  getContentCacheStats: QUa,
  invalidateLazyContentCacheForRef: ype,
  releaseLazyContentMemory: TXe,
  trimContentCache: gtr,
  trimOversizedContentCache: ftr,
  useLazyContent: Kp,
  useLazyContents: j1,
  warmContentCacheForPaste: qUa
}, Symbol.toStringTag, {
  value: "Module"
}));

function YUa(e) {
  const [t, n] = g.useState({
    mainUrlDownloaded: !1,
    audioUrlDownloaded: !1,
    mjImagesDownloaded: [],
    allDownloaded: !1,
    isChecking: !0
  });
  return g.useEffect(() => {
    let r = !1;
    const a = async () => {
      try {
        let o = !1;
        e.url && (e.url.startsWith("data:") || e.url.startsWith("blob:") ? o = !0 : (e.url.startsWith("http://") || e.url.startsWith("https://")) && (o = await ni.hasAsset(e.id)));
        let s = !1;
        e.audioUrl && e.audioUrl !== e.url ? e.audioUrl.startsWith("data:") || e.audioUrl.startsWith("blob:") ? s = !0 : (e.audioUrl.startsWith("http://") || e.audioUrl.startsWith("https://")) && (s = await ni.hasAsset(`${e.id}_audio`)) : s = !0;
        const l = e.mjImages || [],
          d = [];
        for (let p = 0; p < l.length; p++) {
          const m = l[p];
          if (!m) {
            d.push(!1);
            continue;
          }
          if (m.startsWith("data:") || m.startsWith("blob:")) d.push(!0);else if (m.startsWith("http://") || m.startsWith("https://")) {
            const f = await ni.hasAsset(`${e.id}_mj_${p}`);
            d.push(f);
          } else d.push(!1);
        }
        const u = d.length === 0 || d.every(p => p);
        r || n({
          mainUrlDownloaded: o,
          audioUrlDownloaded: s,
          mjImagesDownloaded: d,
          allDownloaded: o && s && u,
          isChecking: !1
        });
      } catch (o) {
        console.error("[useAssetDownloadStatus] Error checking status:", o), r || n(s => ({
          ...s,
          isChecking: !1
        }));
      }
    };
    a();
    const i = ni.addListener(o => {
      (o === e.id || o === `${e.id}_audio` || o.startsWith(`${e.id}_mj_`)) && a();
    });
    return () => {
      r = !0, i();
    };
  }, [e.id, e.url, e.audioUrl, e.mjImages]), t;
}

const XUa = [{
    id: "character",
    name: "角色"
  }, {
    id: "storyboard",
    name: "分镜"
  }, {
    id: "view",
    name: "视角"
  }, {
    id: "product",
    name: "产品"
  }, {
    id: "lighting",
    name: "光影"
  }, {
    id: "common",
    name: "常用"
  }],
  JUa = [{
    id: "builtin_md_1",
    name: "多机位九宫格",
    category: "character",
    icon: "grid3x3",
    scene: "同一主体/场景，9个不同机位/角度同时呈现，用于角色多角度参考、产品展示、空间勘测",
    positive: "A multi-camera angle reference sheet in 3x3 grid layout, showing [主体] from 9 different perspectives simultaneously: top-left front view, top-center 3/4 front view, top-right side profile, middle-left low angle, middle-center eye-level straight-on, middle-right high angle, bottom-left back view, bottom-center 3/4 back view, bottom-right top-down overhead view. [主体详细描述]. Consistent lighting across all 9 frames, uniform light warm gray background color F0EDE8, subjects softly blending with background with natural edge transition, no hard edges no white halo no light bleed, professional studio photography, clean grid layout with thin white dividers between frames, character consistency maintained across all angles, absolutely no visible numbers text labels frame counters corner marks or annotations anywhere on the image",
    negative: "numbers, text, letters, labels, frame numbers, corner marks, annotations, captions, watermarks, signatures, logos, readable text, font, typography, grid numbers, sequence markers, page numbers, index, hard edge, glowing edge, white halo, light bleed, overexposed edge, cutout look, pasted on background, floating subject, disconnected shadow, pure white background, stark white, cold gray, bad anatomy, distorted face, extra fingers, deformed hands, inconsistent character design, lighting mismatch between frames, blurry, low quality, cropped, out of frame"
  }, {
    id: "builtin_md_2",
    name: "多机位九宫格4K",
    category: "storyboard",
    icon: "grid3x3-hd",
    scene: "高分辨率版本的多机位九宫格，用于印刷级输出、大屏展示、精细材质参考",
    positive: "Ultra high resolution multi-camera angle reference sheet in 3x3 grid layout, 4K quality, showing [主体] from 9 different perspectives simultaneously: top-left front view, top-center 3/4 front view, top-right side profile, middle-left low angle, middle-center eye-level straight-on, middle-right high angle, bottom-left back view, bottom-center 3/4 back view, bottom-right top-down overhead view. [主体详细描述]. Consistent cinematic lighting across all 9 frames, uniform light warm gray background color F0EDE8, subjects softly blending with background with natural edge transition, no hard edges no white halo no light bleed, professional studio photography with medium format film aesthetic, clean grid layout with thin white dividers between frames, character consistency maintained across all angles, fine organic film grain, zero digital sharpening, absolutely no visible numbers text labels frame counters corner marks or annotations anywhere on the image",
    negative: "numbers, text, letters, labels, frame numbers, corner marks, annotations, captions, watermarks, signatures, logos, readable text, font, typography, grid numbers, sequence markers, page numbers, index, hard edge, glowing edge, white halo, light bleed, overexposed edge, cutout look, pasted on background, floating subject, disconnected shadow, pure white background, stark white, cold gray, bad anatomy, distorted face, extra fingers, deformed hands, inconsistent character design, lighting mismatch between frames, blurry, low quality, cropped, out of frame, digital sharpening, oversharpened, plastic skin, over-smoothing"
  }, {
    id: "builtin_md_3",
    name: "剧情推演四宫格",
    category: "storyboard",
    icon: "layout-grid",
    scene: "同一事件的4个连续阶段/情绪递进，用于故事板预览、情绪弧线设计、叙事节奏测试",
    positive: "A 4-panel storyboard sequence in 2x2 grid, showing narrative progression of [事件/场景]: top-left [阶段1描述], top-right [阶段2描述], bottom-left [阶段3描述], bottom-right [阶段4描述]. Consistent character design across all panels, coherent lighting and color palette, uniform light warm gray background color F0EDE8, subjects softly blending with background with natural edge transition, no hard edges no white halo no light bleed, cinematic composition, emotional arc from [情绪A] to [情绪B], film grain texture, clean thin white grid dividers, absolutely no visible numbers text labels frame counters corner marks or annotations anywhere on the image",
    negative: "numbers, text, letters, labels, frame numbers, corner marks, annotations, captions, watermarks, signatures, logos, readable text, font, typography, grid numbers, sequence markers, page numbers, index, hard edge, glowing edge, white halo, light bleed, overexposed edge, cutout look, pasted on background, floating subject, disconnected shadow, pure white background, stark white, cold gray, bad anatomy, distorted face, extra fingers, deformed hands, inconsistent character design, lighting mismatch between frames, discontinuous action, jump cut feel, blurry, low quality, cropped, out of frame"
  }, {
    id: "builtin_md_4",
    name: "角色脸部三视图",
    category: "character",
    icon: "scan-face",
    scene: "角色面部正面/侧面/四分之三侧面的设定参考，用于Actor ID锁定、表情一致性控制",
    positive: "Character face reference sheet, three views side by side in single row: left panel front view straight-on, center panel 3/4 angle view, right panel side profile view. [角色面部详细描述]. Consistent lighting from 45-degree top-side across all three views, light warm gray background color F0EDE8, subjects softly blending with background with natural edge transition, no hard edges no white halo no light bleed, neutral clean backdrop, professional character design sheet, clean linework, subtle skin texture, identical facial features maintained across all angles, absolutely no visible numbers text labels frame counters corner marks or annotations anywhere on the image",
    negative: "numbers, text, letters, labels, frame numbers, corner marks, annotations, captions, watermarks, signatures, logos, readable text, font, typography, grid numbers, sequence markers, page numbers, index, hard edge, glowing edge, white halo, light bleed, overexposed edge, cutout look, pasted on background, floating subject, disconnected shadow, pure white background, stark white, cold gray, bad anatomy, distorted face, asymmetrical eyes, crossed eyes, extra fingers, deformed hands, inconsistent facial features between panels, lighting mismatch, blurry, low quality, cropped, out of frame"
  }, {
    id: "builtin_md_5",
    name: "产品三视图",
    category: "product",
    icon: "package",
    scene: "产品设计的正面/侧面/顶面展示，用于工业设计、电商详情、技术文档",
    positive: "Product design reference sheet, three orthographic views in single row: front view, side view, top view. [产品详细描述]. Light warm gray background color F0EDE8, products softly blending with background with natural edge transition, no hard edges no white halo no light bleed, studio lighting with soft shadows, technical drawing aesthetic, precise proportions, material texture visible, no perspective distortion, professional product photography, absolutely no visible numbers text labels frame counters corner marks or annotations anywhere on the image",
    negative: "numbers, text, letters, labels, frame numbers, corner marks, annotations, captions, watermarks, signatures, logos, readable text, font, typography, grid numbers, sequence markers, page numbers, index, hard edge, glowing edge, white halo, light bleed, overexposed edge, cutout look, pasted on background, floating subject, disconnected shadow, pure white background, stark white, cold gray, distorted proportions, perspective distortion, blurry, low quality, cropped, out of frame, cluttered background, random objects, inconsistent material texture between views"
  }, {
    id: "builtin_md_6",
    name: "25宫格连贯分镜",
    category: "storyboard",
    icon: "film",
    scene: "完整场景/动作的25帧连续分镜，5×5网格承载9个叙事节拍，用于电影分镜预览、动作连贯性测试、Seedance分段参考",
    positive: "A 5x5 cinematic storyboard grid, 25 sequential frames showing continuous narrative flow of [主体/场景/动作], naturally divided into 9 story beats progressing through beginning, development, escalation, twist, climax, and resolution. Scene transitions conveyed purely through visual continuity and character motion, absolutely no visible numbers, text, labels, frame counters, corner marks, or annotations anywhere on the image. Consistent character and environment across all 25 frames, smooth motion continuity between adjacent frames, uniform cinematic lighting and color palette, light warm gray background color F0EDE8, subjects softly blending with background with natural edge transition, no hard edges no white halo no light bleed, varied shot progression from wide to close-up, professional film storyboard aesthetic, subtle film grain, clean thin white grid dividers",
    negative: "numbers, text, letters, labels, frame numbers, corner marks, annotations, captions, watermarks, signatures, logos, readable text, font, typography, grid numbers, sequence markers, page numbers, index, hard edge, glowing edge, white halo, light bleed, overexposed edge, cutout look, pasted on background, floating subject, disconnected shadow, pure white background, stark white, cold gray, bad anatomy, distorted face, extra fingers, deformed hands, inconsistent character design, lighting mismatch between frames, discontinuous action, jump cut feel, blurry, low quality, cropped, out of frame, different hairstyle between frames, different clothing between frames"
  }, {
    id: "builtin_md_7",
    name: "电影级光影校正",
    category: "lighting",
    icon: "sun",
    scene: "同一场景在不同光影条件下的对比展示，用于灯光方案测试、色调选择、情绪对照",
    positive: "Cinematic lighting comparison sheet, 6 panels showing the same [主体/场景] under different lighting conditions: top-left golden hour warm backlight, top-center overcast soft diffused light, top-right neon night city light, bottom-left harsh midday direct sun, bottom-center Rembrandt 45-degree side light with triangle shadow, bottom-right dramatic low-key chiaroscuro. Consistent composition and subject across all panels, only lighting changes, light warm gray background color F0EDE8, subjects softly blending with background with natural edge transition, no hard edges no white halo no light bleed, professional cinematography reference, absolutely no visible numbers text labels frame counters corner marks or annotations anywhere on the image",
    negative: "numbers, text, letters, labels, frame numbers, corner marks, annotations, captions, watermarks, signatures, logos, readable text, font, typography, grid numbers, sequence markers, page numbers, index, hard edge, glowing edge, white halo, light bleed, overexposed edge, cutout look, pasted on background, floating subject, disconnected shadow, pure white background, stark white, cold gray, inconsistent subject between panels, different pose between panels, different costume between panels, cluttered background, blurry, low quality, cropped, out of frame"
  }, {
    id: "builtin_md_8",
    name: "角色设定参考表",
    category: "character",
    icon: "users",
    scene: "角色一致性设定参考：左侧1/3脸部大特写锚定面部，右侧2/3三格横排全身三视图（正/侧/背）锚定服装与身形，用于Actor ID锁定、服装一致性控制、Seedance Canvas故事板",
    positive: "Character reference sheet, left-right split layout: left one-third area is chest-up close-up front view portrait (shoulder-up framing, extreme facial detail clarity, gentle natural expression, bright eyes looking straight at camera, realistic skin texture with visible pores and subtle imperfections, refined classical makeup); right two-thirds area is three full-body views in horizontal row, from left to right: full-body front standing pose (arms hanging naturally, feet together, complete front costume and body proportions), full-body side profile view (weight slightly shifted, waist-hip curve and silhouette visible, complete side costume and footwear), full-body back view (complete back neckline, hairstyle from behind, back costume details). Consistent front-top-side lighting across all panels, soft diffused light quality, light warm gray background color F0EDE8, subjects softly blending with background with natural edge transition, no hard edges no white halo no light bleed, identical character design, costume, hairstyle and accessories across all panels, professional character design sheet style, clean edges, accurate proportions, material texture visible from all angles, absolutely no visible numbers, text, labels, frame counters, corner marks or annotations anywhere on the image",
    negative: "numbers, text, letters, labels, frame numbers, corner marks, annotations, captions, watermarks, signatures, logos, readable text, font, typography, grid numbers, sequence markers, page numbers, index, hard edge, glowing edge, white halo, light bleed, overexposed edge, cutout look, pasted on background, floating subject, disconnected shadow, pure white background, stark white, cold gray, dividing line labels, panel markers, bad anatomy, distorted face, extra fingers, deformed hands, inconsistent character design, lighting mismatch between frames, different hairstyle between panels, different clothing between panels, blurry, low quality, cropped, out of frame, asymmetrical eyes, crossed eyes, plastic skin, over-smoothing, textureless skin, uniform skin tone, digital sharpening, filter look, CG look, retouched, airbrushed, multiple heads, mutated limbs, floating limbs, disconnected limbs, uneven panel sizes, broken layout"
  }, {
    id: "builtin_md_9",
    name: "6种基础表情胸像",
    category: "character",
    icon: "smile",
    scene: "同一角色六种基础表情同时呈现，用于表情一致性控制、情绪基准设定、Seedance Talk to Edit表情参考",
    positive: "Character expression reference sheet in 2x3 grid layout, six basic expressions of the same character: top row from left to right: calm neutral expression (relaxed face, eyes looking straight ahead, lips naturally closed), gentle smile (corners of mouth slightly raised, eyes with smile lines, warm and approachable), joyful laugh (eyebrows and eyes curved upward, mouth open showing teeth, exuberant happiness); bottom row from left to right: sad tearful expression (slight furrow between brows, downturned outer eye corners, tears welling in eyes about to fall), angry stern expression (brows tightly locked, sharp piercing eyes with pressure, jaw slightly set), surprised astonished expression (eyes wide open, eyebrows raised high, mouth slightly open in O shape). All six expressions are chest-up close-up portraits of the same character, shoulder-up framing, extreme facial detail clarity, realistic skin texture preserved, no additional light source, light warm gray background color F0EDE8, subjects softly blending with background with natural edge transition, no hard edges no white halo no light bleed, identical character styling, hairstyle, makeup and accessories across all six panels, only facial expression changes, professional character expression sheet style, clean edges, absolutely no visible numbers, text, labels, frame counters, corner marks or annotations anywhere on the image",
    negative: "numbers, text, letters, labels, frame numbers, corner marks, annotations, captions, watermarks, signatures, logos, readable text, font, typography, grid numbers, sequence markers, page numbers, index, expression name labels, emotion text, hard edge, glowing edge, white halo, light bleed, overexposed edge, cutout look, pasted on background, floating subject, disconnected shadow, pure white background, stark white, cold gray, bad anatomy, distorted face, extra fingers, deformed hands, inconsistent character design, different hairstyle between panels, different clothing between panels, lighting mismatch between panels, blurry, low quality, cropped, out of frame, asymmetrical eyes, crossed eyes, plastic skin, over-smoothing, textureless skin, uniform skin tone, digital sharpening, filter look, CG look, retouched, airbrushed, multiple heads, mutated limbs, floating limbs, disconnected limbs, uneven panel sizes, broken layout, extra rows, extra columns, missing panel, shadows on face, directional light, dramatic lighting, colored light"
  }, {
    id: "builtin_md_10",
    name: "360全景图",
    category: "view",
    icon: "globe",
    scene: "用于生成360全景、VR全景、可左右循环拼接的空间视角图，适合室内空间、展厅、场景漫游、环境概念设计；封闭场景需要具备合理出入口。",
    positive: "生成一个720度的全景VR图，左右边缘100%像素级无缝衔接，可无限循环拼接；上下极点(南北极)自然过渡，无明显断层或拉伸，场景一致性，以及场景的逻辑性，封闭场景需要有门",
    negative: "seam, visible seam, hard seam, broken panorama, discontinuous edge, mismatched left and right edges, distorted poles, stretched ceiling, stretched floor, warped horizon, inconsistent scene logic, impossible space, no exit in closed room, text, letters, labels, watermark, logo, blurry, low quality"
  }];

Object.fromEntries(XUa.map(e => [e.id, e.name]));

function ZUa(e) {
  const t = String(e.positive || "").trim(),
    n = String(e.negative || "").trim();
  return n ? `${t}

Negative prompt:
${n}` : t;
}

function e$a(e) {
  return {
    id: e.id,
    name: e.name,
    prompt: ZUa(e)
  };
}

const t$a = JUa.map(e$a),
  Iit = [...t$a, ...lma];

function Mwt() {
  try {
    const e = localStorage.getItem(Zi.HISTORY);
    let t = e ? JSON.parse(e) : [];
    const n = new Set(),
      r = Z2(t.filter(a => n.has(a.id) ? (console.warn(`[initializeHistory] 发现重复的历史记录ID: ${a.id}，已过滤`), !1) : (n.add(a.id), !0)).map(a => _Ct(a)));
    if (r.length !== t.length) {
      console.log(`[initializeHistory] 已过滤 ${t.length - r.length} 个重复的历史记录`);
      try {
        localStorage.setItem(Zi.HISTORY, JSON.stringify(r));
      } catch (a) {
        console.error("[initializeHistory] 更新localStorage失败:", a);
      }
    }
    return r;
  } catch {
    return [];
  }
}

const qan = "qiaodoumayi_agent_prompt_library";

function n$a() {
  try {
    let e = [];
    const t = localStorage.getItem(HX);
    if (t) e = JSON.parse(t);else {
      const i = localStorage.getItem(qan);
      if (i) {
        e = JSON.parse(i);
        try {
          localStorage.setItem(HX, JSON.stringify(e)), localStorage.removeItem(qan);
        } catch {}
      }
    }
    const n = new Set(e.map(i => i.id)),
      r = new Map(Iit.map(i => [i.id, i])),
      a = e.filter(i => {
        const o = fFe(i.name);
        return !Lpa.has(i.id) && !Opa.has(o);
      }).map(i => {
        const o = r.get(i.id);
        return o ? {
          ...i,
          name: o.name
        } : {
          ...i,
          name: fFe(i.name)
        };
      });
    return Iit.forEach(i => {
      n.has(i.id) || a.unshift(i);
    }), a;
  } catch {
    return Iit;
  }
}

function r$a() {
  try {
    const e = localStorage.getItem(Zi.CHARACTERS), parsed = e ? JSON.parse(e) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function a$a() {
  const [e, t] = g.useState(() => zk()),
    [n, r] = g.useState(!1),
    [a, i] = g.useState(""),
    [o, s] = g.useState(0),
    [l, d] = g.useState(!1),
    [u, h] = g.useState(0),
    [p, m] = g.useState(void 0);
  g.useEffect(() => {
    const v = () => {
      t(zk());
    };
    return window.addEventListener(Zne, v), () => {
      window.removeEventListener(Zne, v);
    };
  }, []), g.useEffect(() => {
    const v = () => {
      try {
        n9(), d(!0);
      } catch {
        d(!1);
      }
    };
    return v(), window.addEventListener(Zne, v), window.addEventListener(go, v), () => {
      window.removeEventListener(Zne, v), window.removeEventListener(go, v);
    };
  }, []), g.useEffect(() => X3n((_, w) => {
    h(_), m(w);
  }), []);
  const f = g.useCallback(v => {
      t(_ => {
        const w = {
          ..._,
          ...v
        };
        return z3n(w), w;
      });
    }, []),
    y = g.useCallback(async () => {
      if (!n) {
        r(!0), s(0), i("准备上传...");
        try {
          await n4n(v => {
            s(v.percent), i(v.message);
          });
        } catch (v) {
          const _ = v instanceof Error ? v.message : String(v);
          i(`备份失败: ${_}`), s(0);
        } finally {
          r(!1);
        }
      }
    }, [n]),
    b = g.useCallback(async () => {
      if (!n) {
        r(!0), s(0), i("准备拉取...");
        try {
          await r4n(v => {
            s(v.percent), i(v.message);
          });
        } catch (v) {
          const _ = v instanceof Error ? v.message : String(v);
          i(`拉取失败: ${_}`), s(0);
        } finally {
          r(!1);
        }
      }
    }, [n]);
  return {
    settings: e,
    updateSettings: f,
    ossBusy: n,
    ossMessage: a,
    ossProgress: o,
    ossAvailable: l,
    uploadToCloud: y,
    downloadFromCloud: b,
    pendingQueueCount: u,
    activeQueueTaskId: p
  };
}

const i$a = {
    thumbnail: null,
    url: null,
    mjThumbnails: null,
    mjUrls: null,
    audioUrl: null,
    isCachedLocally: !1,
    localCheckComplete: !1
  },
  e7 = new Map(),
  o$a = 200;

function ytr(e, t) {
  for (e7.delete(e), e7.set(e, t); e7.size > o$a;) {
    const n = e7.keys().next().value;
    if (n === void 0) break;
    e7.delete(n);
  }
}

function btr(e) {
  return !e || uM(e) ? null : eh(e) ?? null;
}

function s$a(e) {
  if (!(e != null && e.length)) return e ?? null;
  const t = e.map(n => btr(n) || "");
  return t.some(Boolean) ? t : null;
}

function qV(e) {
  const t = String(e),
    n = e7.get(t);
  return n && ytr(t, n), n;
}

function a7e(e, t) {
  const n = String(e),
    a = {
      ...(e7.get(n) ?? {
        ...i$a
      }),
      ...t
    };
  "thumbnail" in t && (a.thumbnail = btr(t.thumbnail)), "mjThumbnails" in t && (a.mjThumbnails = s$a(t.mjThumbnails)), "mjUrls" in t && (a.mjUrls = null), "url" in t && t.url && uM(t.url) && String(t.url).startsWith("data:") && String(t.url).length > 96 * 1024 && (a.url = null), ytr(n, a);
}

function l$a(e) {
  if (e != null) {
    e7.delete(String(e));
    return;
  }
  e7.clear();
}

const vtr = Object.freeze(Object.defineProperty({
  __proto__: null,
  clearHistoryListResolvedCache: l$a,
  getHistoryListResolvedCache: qV,
  patchHistoryListResolvedCache: a7e
}, Symbol.toStringTag, {
  value: "Module"
}));

function wtr(e) {
  return !!e && /^https?:\/\//i.test(e) && /aliyuncs\.com/i.test(e);
}

function bfe(e) {
  const t = String(e || "").trim();
  return !!t && nr(t) && !Ko(t) && !!eh(t);
}

function L6e(e) {
  if (!e) return !1;
  if (e.startsWith("data:image") || e.startsWith("blob:")) return !0;
  const t = e.toLowerCase();
  return t.startsWith("data:video/") ? !1 : /\.(jpe?g|png|webp|gif|bmp)(\?|$)/i.test(t) || t.includes("/thumbnails/");
}

function Ene(e) {
  return e ? e.startsWith("blob:") || e.startsWith("data:") || !nr(e) && !wtr(e) : !1;
}

function c$a(e, t) {
  if (!e) return u3(t);
  const n = {
      ...t,
      ...e
    },
    r = e.status === "completed" || e.status === "failed",
    a = t.status === "generating";
  return r && a ? (n.status = e.status, n.progress = e.progress ?? (e.status === "completed" ? 100 : 0), e.url && (n.url = e.url), e.errorMsg && (n.errorMsg = e.errorMsg), e.durationMs != null && (n.durationMs = e.durationMs), e.generationTime && (n.generationTime = e.generationTime)) : e.status === "generating" && t.status === "generating" && (e.progress ?? 0) > (t.progress ?? 0) && (n.progress = e.progress), u3(n);
}

function Rw(e) {
  const t = String(e || "").trim();
  if (t && !Ko(t) && !(nr(t) && Nb(t))) return eh(t);
}

function YG(e, t) {
  var p, m;
  e = H4(e) || e._globalOssUrlOnly || e.ossUploaded ? Cj(e) : e;
  const n = t.mjIndex ?? e.selectedMjImageIndex ?? 0,
    r = H4(e),
    a = e._mjAssetIds,
    i = (a == null ? void 0 : a[n]) || e._assetId || e.id,
    o = (e.mjImages && e.mjImages.length > 1 ? M0(e, n) : null) || Sj(e) || void 0,
    s = o && Wh(o) || o || void 0,
    l = [t.localResolvedUrl || void 0, t.loadedOriginalUrl];
  e.mjImages && e.mjImages.length > 1 && l.unshift((p = t.displayMjOriginals) == null ? void 0 : p[n], (m = t.localResolvedMjUrls) == null ? void 0 : m[n], M0(e, n) || void 0);
  let d;
  r ? d = s : e.mjImages && e.mjImages.length > 1 && (a != null && a[n]) && i ? d = `local-asset://${encodeURIComponent(i)}` : (d = l.find(f => f && Ene(f) && !f.startsWith("local-asset://")), d || (d = s), !d && i && (d = `local-asset://${encodeURIComponent(i)}`)), e.type === "video" && d && (d = _c(d) || d);
  const u = r ? s || "" : d || e.url || "",
    h = (() => {
      var y;
      if (!(e.mjImages && e.mjImages.length > 1)) return [];
      const f = (y = t.displayMjOriginals) == null ? void 0 : y.filter(b => b && !b.startsWith("local-asset://"));
      return f && f.length === e.mjImages.length ? f : e.mjImages.map((b, v) => {
        const _ = M0(e, v) || b || "";
        if (!_ || _.startsWith("local-asset://")) return "";
        if (r && nr(_)) {
          const w = Wh(_) || Go(_) || "";
          return w && !/\/thumbnails\//i.test(w) && !/-list\.webp(?:$|\?)/i.test(w) ? w : !/\/thumbnails\//i.test(_) && !/-list\.webp(?:$|\?)/i.test(_) && !Qc(_) ? _ : "";
        }
        return _;
      });
    })();
  return {
    ...e,
    url: u,
    originalUrl: r ? s || u : d || u,
    _ossRemoteUrl: s || e._ossRemoteUrl,
    _ossThumbnailUrl: e.mjImages && e.mjImages.length > 1 && OM(e, n) || e._ossThumbnailUrl,
    _globalOssUrlOnly: r ? !0 : e._globalOssUrlOnly,
    ossUploaded: e.ossUploaded,
    _assetId: r ? void 0 : i,
    ...(r && s && nr(s) && !/\/thumbnails\//i.test(s) && !Qc(s) ? {
      preferDisplayUrls: !0
    } : {}),
    ...(e.mjImages && e.mjImages.length > 1 ? {
      mjImages: r || h.filter(Boolean).length > 0 ? h : e.mjImages,
      selectedMjImageIndex: n,
      _mjAssetIds: r ? void 0 : a
    } : {})
  };
}

function Cit(e, t) {
  var d, u;
  if (e.type !== "image") return e;
  const n = t instanceof HTMLImageElement ? t : t.querySelector("img"),
    r = (n == null ? void 0 : n.currentSrc) || (n == null ? void 0 : n.getAttribute("src")) || void 0,
    a = n == null ? void 0 : n.getBoundingClientRect(),
    i = e.selectedMjImageIndex ?? 0;
  Vhe(e.id, r && a && a.width > 2 && a.height > 2 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? {
    nodeId: `history-preview-${e.id}-${i}`,
    src: r,
    rect: {
      left: a.left,
      top: a.top,
      width: a.width,
      height: a.height
    }
  } : null);
  const o = (((d = e.mjImages) == null ? void 0 : d.length) || 0) > 1,
    s = r || (o ? (u = e.mjThumbnails) == null ? void 0 : u[i] : e.thumbnailUrl),
    l = o && r ? [...(e.mjThumbnails || [])] : e.mjThumbnails;
  return o && r && l && (l[i] = r), {
    ...e,
    thumbnailUrl: s,
    mjThumbnails: l
  };
}

function Kan(e) {
  if (!e.mjImages || e.mjImages.length <= 1) return {
    thumbs: [],
    originals: []
  };
  const t = e.mjImages.map((r, a) => {
      var s;
      const i = (s = e.mjThumbnails) == null ? void 0 : s[a];
      if (i) return Rw(ya(i) || i) || "";
      const o = OM(e, a);
      return Rw(o) || Rw(jR(o)) || "";
    }),
    n = e.mjImages.map((r, a) => M0(e, a) || e.mjImages[a] || "");
  return {
    thumbs: t,
    originals: n
  };
}

function Qan(e, t) {
  var k, A, S, C;
  const {
      item: n,
      dragIndex: r
    } = t,
    a = n._globalOssUrlOnly || Nk(n),
    i = r ?? n.selectedMjImageIndex ?? 0,
    o = M0(n, i),
    s = o || n._ossRemoteUrl || n.originalUrl || Bd(n) || "";
  let l = a && s || t.displayOriginalUrl;
  n.type === "audio" && (l = t.displayAudioUrl || n.audioUrl || n.url || l);
  let d = !Q$(n) && !a && !!t.localResolvedUrl;
  n.mjImages && n.mjImages.length > 1 && (l = a ? s || l : t.displayMjOriginals[i] || ((k = t.localResolvedMjUrls) == null ? void 0 : k[i]) || t.loadedMjOriginals[i] || M0(n, i) || n.mjImages[i] || t.displayOriginalUrl, !a && (t.displayMjOriginals[i] || (A = t.localResolvedMjUrls) != null && A[i]) && (d = !0));
  const u = l || "";
  e.dataTransfer.effectAllowed = "copy";
  const h = [o || void 0, n.url, n.originalUrl, n._ossRemoteUrl].find(I => typeof I == "string" && /^https?:\/\//i.test(I) && !/\/thumbnails\//i.test(I)),
    p = n._mjAssetIds,
    m = !a && n.mjImages && p && p.length > 0 ? p[Math.min(i, p.length - 1)] || p[0] : a ? void 0 : n._assetId || n.id,
    f = ((S = n.mjImages) == null ? void 0 : S.map((I, E) => M0(n, E) || I || "")) || [],
    y = e.currentTarget instanceof Element ? e.currentTarget.querySelector("img") : null,
    b = y && y.naturalWidth > 0 ? y.naturalWidth : 0,
    v = y && y.naturalHeight > 0 ? y.naturalHeight : 0,
    _ = Number(n.width) > 0 ? n.width : b || void 0,
    w = Number(n.height) > 0 ? n.height : v || void 0;
  e.dataTransfer.setData("application/json", JSON.stringify({
    type: "history-item",
    item: {
      id: n.id,
      url: u,
      type: n.type,
      prompt: n.prompt,
      width: _,
      height: w,
      ratio: n.ratio,
      videoPosterUrl: n.videoPosterUrl,
      modelName: n.modelName,
      ...(n.type === "audio" ? {
        audioUrl: t.displayAudioUrl || n.audioUrl || u,
        musicTitle: n.musicTitle
      } : {}),
      ...(n.type === "3d" ? {
        url: n.url || u,
        originalUrl: n.originalUrl || n.url || u,
        thumbnailUrl: n._ossThumbnailUrl || n.thumbnailUrl,
        threeDFormat: n.threeDFormat,
        threeDFiles: n.threeDFiles
      } : {}),
      originalUrl: d ? void 0 : o || n.originalUrl,
      thumbnailUrl: OM(n, i) || n.thumbnailUrl,
      ossUploaded: d ? !1 : n.ossUploaded,
      _globalOssUrlOnly: d ? !1 : n._globalOssUrlOnly,
      _ossRemoteUrl: d ? void 0 : o || n._ossRemoteUrl,
      _ossThumbnailUrl: d ? void 0 : OM(n, i) || n._ossThumbnailUrl,
      _preferLocalCache: d,
      _localOriginalUrlHint: d ? h : void 0,
      _historySelectedOriginalUrl: o || void 0,
      _historySelectedThumbUrl: OM(n, i) || void 0,
      mjImages: (((C = n.mjImages) == null ? void 0 : C.length) ?? 0) > 1 ? a ? f : t.displayMjOriginals.some(Boolean) ? t.displayMjOriginals.map((I, E) => I || f[E] || "") : f : n.mjImages ?? [],
      mjThumbnails: n.mjThumbnails,
      mjImageInfo: n.mjImageInfo,
      selectedMjImageIndex: i,
      _assetId: m,
      _mjAssetIds: a ? void 0 : p
    }
  })), y && y.naturalWidth > 0 && e.dataTransfer.setDragImage(y, Math.min(40, Math.round(y.clientWidth / 2) || 40), Math.min(40, Math.round(y.clientHeight / 2) || 40));
}

const xtr = 200,
  d$a = 216,
  yte = 8,
  u$a = 150,
  O6e = 1;

function Yan(e) {
  return String(e.modelName || "").toLowerCase().includes("codex") ? d$a : xtr;
}

const _tr = g.memo(({
  history: e,
  isDark: t,
  emptyLabel: n = "暂无生成历史",
  mediaLoadEnabled: r = !0,
  thumbnailsRefreshTrigger: a,
  hasMoreHistory: i = !1,
  onLoadMoreHistory: o,
  onSetLightboxItem: s,
  onSetLightboxOpen: l,
  onSetHistory: d,
  onHistoryContextMenu: u,
  onRefreshVideo: h,
  onRefreshAudio: p,
  onRefresh3d: m,
  onRefreshFalImage: f,
  onRefreshMjImage: y,
  onRefreshComfyTask: b,
  onRefreshNanoBanana: v
}) => {
  on();
  const _ = g.useRef(null),
    [w, k] = g.useState(0),
    [A, S] = g.useState(500),
    [C, I] = g.useState(300),
    E = g.useRef(0),
    M = g.useRef(null);
  g.useEffect(() => {
    const D = _.current;
    if (!D) return;
    const U = () => {
      S(D.clientHeight), I(D.clientWidth);
    };
    U();
    const H = new ResizeObserver(U);
    return H.observe(D), () => H.disconnect();
  }, []);
  const T = Math.max(1, Math.floor((C - 12) / (u$a + yte))),
    P = T > 1 ? (C - 12 - yte * (T - 1)) / T : C - 24,
    {
      rowHeights: R,
      rowOffsets: j,
      totalHeight: B,
      rows: F
    } = g.useMemo(() => {
      const D = Math.ceil(e.length / T) || 0,
        U = [];
      for (let K = 0; K < D; K++) {
        let W = 0;
        for (let Q = 0; Q < T; Q++) {
          const q = K * T + Q;
          if (q >= e.length) break;
          W = Math.max(W, Yan(e[q]));
        }
        U.push(W);
      }
      const H = [];
      let Y = yte;
      for (const K of U) H.push(Y), Y += K + yte;
      return {
        rowHeights: U,
        rowOffsets: H,
        totalHeight: Y,
        rows: D
      };
    }, [e, T]);
  g.useEffect(() => {
    const D = Y => {
        const K = e.findIndex(ne => String(ne.id) === String(Y)),
          W = _.current;
        if (K < 0 || !W) return;
        const Q = Math.floor(K / T),
          q = Math.max(0, (j[Q] ?? 0) - W.clientHeight * .28);
        W.scrollTo({
          top: q,
          behavior: "smooth"
        }), E.current = q, k(q);
        try {
          sessionStorage.removeItem("projectMemoryHistoryFocus");
        } catch {}
        window.setTimeout(() => {
          const ne = document.querySelector(`[data-history-item-id="${String(Y).replace(/["\\]/g, "\\$&")}"]`);
          ne == null || ne.animate([{
            boxShadow: "0 0 0 1px rgba(249,115,22,.85)"
          }, {
            boxShadow: "0 0 0 9px rgba(249,115,22,0)"
          }], {
            duration: 950,
            easing: "ease-out"
          });
        }, 180);
      },
      U = Y => {
        var W;
        const K = String(((W = Y.detail) == null ? void 0 : W.historyId) || "").trim();
        K && D(K);
      };
    window.addEventListener("projectMemoryHistoryFocusRequested", U);
    let H = "";
    try {
      H = sessionStorage.getItem("projectMemoryHistoryFocus") || "";
    } catch {}
    return H && window.setTimeout(() => D(H), 0), () => window.removeEventListener("projectMemoryHistoryFocusRequested", U);
  }, [T, e, j]);
  const {
      visibleStartRow: N,
      visibleEndRow: G
    } = g.useMemo(() => {
      if (F === 0) return {
        visibleStartRow: 0,
        visibleEndRow: 0
      };
      const D = w,
        U = w + A;
      let H = 0;
      for (let K = 0; K < F; K++) {
        if (j[K] + R[K] >= D) {
          H = Math.max(0, K - O6e);
          break;
        }
        K === F - 1 && (H = Math.max(0, F - 1 - O6e));
      }
      let Y = F - 1;
      for (let K = H; K < F; K++) {
        if (j[K] > U) {
          Y = Math.min(F - 1, K + O6e);
          break;
        }
        Y = Math.min(F - 1, K + O6e);
      }
      return {
        visibleStartRow: H,
        visibleEndRow: Y
      };
    }, [w, A, j, R, F]),
    z = N * T,
    V = Math.min(e.length - 1, (G + 1) * T - 1),
    O = g.useCallback(D => {
      const U = D.currentTarget,
        H = U.scrollTop;
      E.current = H, i && o && !Yi() && U.scrollHeight - U.scrollTop - U.clientHeight < 480 && o(), M.current && cancelAnimationFrame(M.current), M.current = requestAnimationFrame(() => {
        k(E.current), M.current = null;
      });
    }, [i, o]);
  if (g.useEffect(() => () => {
    M.current && cancelAnimationFrame(M.current);
  }, []), e.length === 0) return c.jsx("div", {
    className: "flex-1 flex items-center justify-center",
    children: c.jsx("div", {
      className: `text-center py-8 text-xs ${t ? "text-zinc-500" : "text-zinc-400"}`,
      children: x(n)
    })
  });
  const L = [];
  for (let D = z; D <= V && D < e.length; D++) L.push({
    item: e[D],
    index: D
  });
  return c.jsx("div", {
    ref: _,
    className: "flex-1 overflow-y-auto custom-scrollbar",
    onScroll: O,
    children: c.jsx("div", {
      className: "relative p-1.5",
      style: {
        height: B + 12
      },
      children: L.map(({
        item: D,
        index: U
      }) => {
        const H = Math.floor(U / T),
          Y = U % T;
        return c.jsx(Atr, {
          item: D,
          index: U,
          isDark: t,
          itemHeight: Yan(D),
          gridLayout: {
            row: H,
            col: Y,
            cols: T,
            cardWidth: P,
            rowHeight: R[H] ?? xtr,
            rowOffset: j[H] ?? yte,
            gap: yte
          },
          scrollRootRef: _,
          shouldLoadMedia: r,
          thumbnailsRefreshTrigger: a,
          onSetLightboxItem: s,
          onSetLightboxOpen: l,
          onSetHistory: d,
          onHistoryContextMenu: u,
          onRefreshVideo: h,
          onRefreshAudio: p,
          onRefresh3d: m,
          onRefreshFalImage: f,
          onRefreshMjImage: y,
          onRefreshComfyTask: b,
          onRefreshNanoBanana: v
        }, D.id);
      })
    })
  });
});

_tr.displayName = "HistoryVirtualList";

const Tne = e => {
    if (e == null) return "";
    if (typeof e == "string") return e;
    if (typeof e == "number" || typeof e == "boolean") return String(e);
    if (typeof e == "object") {
      if ("message" in e && typeof e.message == "string") return e.message;
      try {
        return JSON.stringify(e);
      } catch {
        return "[Object]";
      }
    }
    return String(e);
  },
  ktr = e => {
    var n;
    const t = g9n((n = e.apiConfig) == null ? void 0 : n.modelId);
    return t || Tne(e.modelName);
  },
  h$a = e => {
    var t;
    return String(e.modelName || "").toLowerCase().includes("codex") || ((t = e.apiConfig) == null ? void 0 : t.modelId) === "codex-image";
  },
  Pwt = [{
    id: "all",
    label: "全部"
  }, {
    id: "image",
    label: "图片"
  }, {
    id: "video",
    label: "视频"
  }, {
    id: "audio",
    label: "音频"
  }, {
    id: "3d",
    label: "3D"
  }],
  p$a = Pwt.map(e => e.label);

function m$a(e, t) {
  const n = t.trim().toLowerCase();
  if (!n) return !0;
  const r = String(e.prompt || e.positivePrompt || "").toLowerCase(),
    a = ktr(e).toLowerCase(),
    i = String(e.musicTitle || "").toLowerCase(),
    o = String(e.time || "").toLowerCase(),
    s = String(e.id || "").toLowerCase(),
    l = String(e.remoteTaskId || "").toLowerCase(),
    d = String(e.type || "").toLowerCase();
  return r.includes(n) || a.includes(n) || i.includes(n) || o.includes(n) || s.includes(n) || l.includes(n) || d.includes(n);
}

const f$a = (e, t) => {
    var o, s, l, d, u, h;
    const n = e.item,
      r = t.item,
      a = e.gridLayout,
      i = t.gridLayout;
    return n.id === r.id && n.type === r.type && n.status === r.status && n.progress === r.progress && n.remoteTaskId === r.remoteTaskId && n.jimengStatus === r.jimengStatus && n.errorMsg === r.errorMsg && n.url === r.url && n.thumbnailUrl === r.thumbnailUrl && n.originalUrl === r.originalUrl && n.localCacheUrl === r.localCacheUrl && n._assetId === r._assetId && n._thumbnailAssetId === r._thumbnailAssetId && n._localCacheReady === r._localCacheReady && n.ossUploaded === r.ossUploaded && n.generationTime === r.generationTime && n.modelName === r.modelName && n.prompt === r.prompt && n.musicTitle === r.musicTitle && ((o = n.apiConfig) == null ? void 0 : o.modelId) === ((s = r.apiConfig) == null ? void 0 : s.modelId) && n.selectedMjImageIndex === r.selectedMjImageIndex && (((l = n.mjImages) == null ? void 0 : l.length) ?? 0) === (((d = r.mjImages) == null ? void 0 : d.length) ?? 0) && (((u = n.mjThumbnails) == null ? void 0 : u.length) ?? 0) === (((h = r.mjThumbnails) == null ? void 0 : h.length) ?? 0) && e.isDark === t.isDark && e.shouldLoadMedia === t.shouldLoadMedia && e.thumbnailsRefreshTrigger === t.thumbnailsRefreshTrigger && (a == null ? void 0 : a.cardWidth) === (i == null ? void 0 : i.cardWidth) && (a == null ? void 0 : a.rowOffset) === (i == null ? void 0 : i.rowOffset) && (a == null ? void 0 : a.rowHeight) === (i == null ? void 0 : i.rowHeight);
  },
  Atr = g.memo(({
    item: e,
    index: t,
    isDark: n,
    itemHeight: r,
    gridLayout: a,
    shouldLoadMedia: i = !0,
    scrollRootRef: o,
    thumbnailsRefreshTrigger: s,
    onSetLightboxItem: l,
    onSetLightboxOpen: d,
    onSetHistory: u,
    onHistoryContextMenu: h,
    onRefreshVideo: p,
    onRefreshAudio: m,
    onRefresh3d: f,
    onRefreshFalImage: y,
    onRefreshMjImage: b,
    onRefreshComfyTask: v,
    onRefreshNanoBanana: _
  }) => {
    var ln, Pn, rn, Yn, Ct, Cn, un, Jn, Kn, en, Vn, Tt, Ue, et, ft, ht, wt, jt, bt, Bt, wn, at, Pt, dt, xt, yn, gn, mt, Xt, Gn, rr;
    on();
    const w = g.useRef(null),
      [k, A] = g.useState(!1),
      S = e.status === "generating" && nce(e) ? "completed" : e.status,
      C = i && k && S !== "generating",
      I = !ua(),
      E = !I && (e._globalOssUrlOnly || vv(e) && !!sZ(e)),
      M = qV(e.id),
      T = !!(M != null && M.localCheckComplete) && !!(M.thumbnail || (ln = M.mjThumbnails) != null && ln.length || e.type === "audio" && (M.audioUrl || M.url));
    g.useEffect(() => {
      if (!i) {
        A(!1);
        return;
      }
      const qn = w.current;
      if (!qn) return;
      const Dn = new IntersectionObserver(Ar => {
        Ar.some(_r => _r.isIntersecting) && (A(!0), Dn.disconnect());
      }, {
        root: (o == null ? void 0 : o.current) ?? null,
        rootMargin: "50px 0px",
        threshold: .1
      });
      return Dn.observe(qn), () => Dn.disconnect();
    }, [i, o, e.id]);
    const [P, R] = g.useState(e.status),
      [j, B] = g.useState(e.progress),
      F = l8n(String(e.id)),
      N = (F == null ? void 0 : F.status) ?? P,
      G = (F == null ? void 0 : F.progress) ?? j,
      [z, V] = g.useState(() => {
        const qn = qV(e.id);
        return qn != null && qn.durationLabel ? qn.durationLabel : e.status === "completed" && (e.generationTime || TE(e.durationMs)) || null;
      }),
      O = g.useRef(z),
      L = g.useRef(!!((Pn = qV(e.id)) != null && Pn.durationLabel)),
      D = g.useRef(null),
      [U, H] = g.useState(() => e.selectedMjImageIndex ?? 0);
    g.useEffect(() => {
      H(e.selectedMjImageIndex ?? 0);
    }, [e.id, e.selectedMjImageIndex]);
    const Y = g.useRef(null);
    g.useEffect(() => {
      Y.current !== null && Y.current !== e.id && (O.current = null, V(null), L.current = !1), Y.current = e.id;
    }, [e.id]), g.useEffect(() => {
      const qn = u3(e),
        Dn = qn.status ?? e.status;
      if (R(Dn), Dn !== "generating") {
        if (B(qn.progress ?? e.progress ?? (Dn === "completed" ? 100 : 0)), Dn === "completed" && !L.current) {
          L.current = !0;
          const Ar = qn.generationTime || e.generationTime || TE(qn.durationMs ?? e.durationMs) || null;
          O.current = Ar, V(Ar), a7e(e.id, {
            durationLabel: Ar
          });
        }
      } else O.current;
      Dn === "generating" && B(Ar => {
        const _r = e.progress ?? Ar ?? 0;
        return Ar != null && _r < Ar ? Ar : _r;
      }), nce(e) && D.current !== String(e.id) && (D.current = String(e.id), u(Ar => Ar.map(_r => String(_r.id) === String(e.id) ? u3(_r) : _r)));
    }, [e, u]);
    const K = g.useCallback((qn, Dn, Ar) => {
      if (String(qn) === String(e.id) && (R(Dn), B(Ar ?? (Dn === "completed" ? 100 : 0)), Dn === "completed" && !L.current)) {
        L.current = !0;
        const _r = e.generationTime || TE(e.durationMs) || O.current;
        O.current = _r, V(_r), a7e(e.id, {
          durationLabel: _r
        });
      }
    }, [e.id, e.generationTime, e.durationMs]);
    g.useEffect(() => {
      if (!i || N !== "generating" && e.status !== "generating") return;
      const qn = Ar => {
          const {
            taskId: _r
          } = Ar.detail;
          String(_r) === String(e.id) && window.setTimeout(() => {
            K(_r, "completed", 100), u(Pa => Pa.map(fa => String(fa.id) === String(_r) ? {
              ...fa,
              status: "completed",
              progress: 100
            } : fa));
          }, 0);
        },
        Dn = Ar => {
          const {
            taskId: _r,
            status: Pa,
            progress: fa
          } = Ar.detail;
          window.setTimeout(() => {
            K(_r, Pa, fa);
          }, 0);
        };
      return window.addEventListener("klingO1VideoComplete", qn), window.addEventListener("genHistoryTaskTerminal", Dn), () => {
        window.removeEventListener("klingO1VideoComplete", qn), window.removeEventListener("genHistoryTaskTerminal", Dn);
      };
    }, [e.id, e.status, N, i, u, K]);
    const W = e._mjAssetIds,
      Q = vEr(e),
      q = !!(e._assetId || W != null && W.length || Q),
      ne = qV(e.id),
      [de, le] = g.useState((ne == null ? void 0 : ne.isCachedLocally) ?? !1),
      [J, pe] = g.useState((ne == null ? void 0 : ne.thumbnail) ?? null),
      [ce, we] = g.useState(e.type === "audio" ? (ne == null ? void 0 : ne.url) ?? null : null),
      [X, Z] = g.useState((ne == null ? void 0 : ne.mjThumbnails) ?? null),
      [re, fe] = g.useState(null),
      [ye, ie] = g.useState((ne == null ? void 0 : ne.audioUrl) ?? null),
      [ae, be] = g.useState(0);
    g.useEffect(() => Zhe(() => {
      pe(null), we(null), Z(null), fe(null), ie(null), ke(!1), le(!1), Ee.current = {
        complete: !1,
        thumbnail: null,
        url: null
      }, be(qn => qn + 1);
    }), []);
    const Ee = g.useRef({
        complete: (ne == null ? void 0 : ne.localCheckComplete) ?? !1,
        thumbnail: (ne == null ? void 0 : ne.thumbnail) ?? null,
        url: e.type === "audio" ? (ne == null ? void 0 : ne.url) ?? null : null
      }),
      xe = g.useRef(null),
      he = g.useRef([]),
      ue = g.useRef(new Set()),
      ge = g.useRef(new Set()),
      [_e, ke] = g.useState((ne == null ? void 0 : ne.localCheckComplete) ?? !q),
      ve = e.type === "video",
      Te = ve && (Rw(e.thumbnailUrl) || Rw(e.videoPosterUrl) || Rw(e._ossThumbnailUrl) || jg(e)) || void 0,
      Ne = C && !E && !T && _e && !de && !SR(J),
      me = jR(e.url),
      Ae = I ? void 0 : Rw(e.thumbnailUrl) || Rw(e._ossThumbnailUrl) || jg(e) || me,
      {
        content: Fe,
        isLoading: Me
      } = Kp(Ne ? ve ? Te : Ae : void 0, {
        useThumbnail: !1,
        enabled: Ne && (ve ? !!Te : !!Ae)
      }),
      Re = C && !I || C && e.audioUrl && !nr(e.audioUrl) ? e.audioUrl : void 0,
      {
        content: $e
      } = Kp(Re, {
        enabled: !!Re && _e
      }),
      nt = (e.mjImages || []).map((qn, Dn) => {
        var Pa;
        const Ar = (Pa = e.mjThumbnails) == null ? void 0 : Pa[Dn];
        if (Ar) return eh(Ar) || Ar;
        const _r = OM(e, Dn);
        return eh(_r) || jR(_r) || "";
      }),
      ze = e.type === "video",
      Le = ((X == null ? void 0 : X.filter(qn => qn && SR(qn)).length) ?? 0) > 0,
      Ke = j1(Ne && !Le ? nt : [], {
        useThumbnail: !1,
        enabled: Ne && !Le
      }),
      Xe = Ke.map(qn => qn.content || ""),
      De = !ze && Ke.some(qn => qn.isLoading),
      Ye = [];
    YUa(e), g.useEffect(() => {
      if (!i || !C || T && SR((M == null ? void 0 : M.thumbnail) || J)) return;
      const Dn = e.type === "video" && e.url && (e.url.includes("prod-ss-vidu") || e.url.includes("prod-sa-vidu") || e.url.includes("amazonaws") && e.url.includes("vidu")) && e.url ? `${e.id}_vidu_${(e.url.split("/").pop() || e.url).replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 36) || Date.now()}` : null,
        Ar = new Set([e._assetId, Dn, ...(e.type !== "audio" ? [e.id] : []), ...(W || []), Q].filter(Boolean));
      if (Ar.size === 0) return;
      let _r = null;
      return Ie(async () => {
        const {
          assetStore: Pa
        } = await Promise.resolve().then(() => Ri);
        return {
          assetStore: Pa
        };
      }, void 0, import.meta.url).then(({
        assetStore: Pa
      }) => {
        _r = Pa.addListener(fa => {
          if (!Ar.has(fa)) return;
          const Ca = Ee.current;
          Ca.complete && SR(Ca.thumbnail) || (xe.current && clearTimeout(xe.current), xe.current = setTimeout(() => {
            xe.current = null, be($n => $n + 1);
          }, 400));
        });
      }), () => {
        xe.current && clearTimeout(xe.current), _r == null || _r();
      };
    }, [i, C, T, e._assetId, e.id, e.url, W == null ? void 0 : W.length, Q, J]), g.useEffect(() => {
      Ee.current = {
        complete: _e,
        thumbnail: J,
        url: ce
      };
    }, [_e, J, ce]), g.useEffect(() => {
      const qn = !!(e._assetId || W != null && W.length || Q),
        Dn = qV(e.id),
        Ar = String((Dn == null ? void 0 : Dn.thumbnail) || "").trim(),
        _r = /asset\.localhost/i.test(Ar) || /^asset:/i.test(Ar) || /^https?:\/\/asset\./i.test(Ar);
      if (Dn && !_r) {
        pe(Dn.thumbnail), we(e.type === "audio" && W4(Dn.url) || null), Z(Dn.mjThumbnails), fe(null), ie(W4(Dn.audioUrl) || null), le(Dn.isCachedLocally), ke(Dn.localCheckComplete);
        return;
      }
      pe(null), we(null), Z(null), fe(null), ie(null), le(!1), ke(!qn);
    }, [e.id, e._assetId, e.url, W == null ? void 0 : W.length, Q]);
    const Ce = g.useCallback(qn => {
      a7e(e.id, qn);
    }, [e.id]);
    g.useEffect(() => {
      !_e && !J && !ce && !ye && !(X != null && X.length) && !(re != null && re.length) || Ce({
        thumbnail: J,
        url: e.type === "audio" ? ce : null,
        mjThumbnails: X,
        mjUrls: null,
        audioUrl: ye,
        isCachedLocally: de,
        localCheckComplete: _e,
        durationLabel: z
      });
    }, [J, ce, X, re, ye, de, _e, z, e.type, Ce]), g.useEffect(() => {
      var $n;
      if (!C) return;
      const qn = qV(e.id),
        Dn = String((qn == null ? void 0 : qn.thumbnail) || "").trim(),
        Ar = /asset\.localhost/i.test(Dn) || /^asset:/i.test(Dn) || /^https?:\/\/asset\./i.test(Dn);
      if ((s === void 0 || s === 0) && (qn != null && qn.localCheckComplete) && (qn.thumbnail || qn.audioUrl || ($n = qn.mjThumbnails) != null && $n.length) && !Ar) return;
      if (e.type === "audio" && !Q && Rbe(e) && (s === void 0 || s === 0)) {
        _e || ke(!0);
        return;
      }
      let _r = !1,
        Pa = !1,
        fa = !1,
        Ca = null;
      return s !== void 0 && s > 0 && !E && (pe(null), Z(null), ge.current.delete(e.id), qpt(e.id)), (async () => {
        try {
          const yr = [e._ossRemoteUrl, e.originalUrl, e.url, e.thumbnailUrl, e._ossThumbnailUrl].some(ba => Ko(ba));
          if (!I && (e._globalOssUrlOnly || Nk(e) || vv(e) || yr)) {
            await Ur.ensureRestored();
            let ba = e;
            if (C && !ue.current.has(`rehost:${e.id}`) && (yr || e.type !== "video" && vv(e) && !jg(e)) && !jg(e)) {
              ue.current.add(`rehost:${e.id}`);
              try {
                let ki = await fLe(e);
                if ((!ki || !jg({
                  ...e,
                  ...ki
                })) && (await new Promise(Wn => window.setTimeout(Wn, 900)), !_r)) {
                  const Wn = await fLe(ki ? {
                    ...e,
                    ...ki
                  } : e);
                  Wn && (ki = {
                    ...(ki || {}),
                    ...Wn
                  });
                }
                ki && !_r && (ba = {
                  ...e,
                  ...ki
                }, u(Wn => Wn.map(wr => wr.id === e.id ? {
                  ...wr,
                  ...ki
                } : wr)));
              } catch (ki) {
                console.warn("[HistoryPanel] 海艺外链转存用户桶失败:", e.id, ki);
              }
            }
            let ga = await hf(ba);
            const _a = [ba._ossThumbnailUrl, ba.thumbnailUrl, ba.url, ba.originalUrl, e._ossThumbnailUrl, e.thumbnailUrl, e.url, e.originalUrl].find(ki => Ko(ki)),
              $a = jg(ba) || (bfe(ba._ossThumbnailUrl) ? ba._ossThumbnailUrl : null) || (bfe(ba.thumbnailUrl) ? ba.thumbnailUrl : null) || jR(ba.url) || _a || null;
            if (e.type === "video" && C && !ge.current.has(e.id)) {
              ge.current.add(e.id);
              const ki = await jae(ba);
              ki && !_r && (ga = ki);
            } else !ga && C && $a && nr($a) && !Nb($a) && !ue.current.has(e.id) && (ue.current.add(e.id), (await h5e(e.id, $a)) && !_r && (ga = await hf(ba)));
            const Ya = [ba._assetId, ...(ba.type !== "audio" ? [ba.id] : [])].filter(Boolean),
              ta = Ur.isAvailable() && Ya.some(ki => Ur.hasAsset(ki));
            if (!_r) {
              if (pe(Rw(hLe(ba, ga) || jg(ba) || (bfe($a) ? $a : null)) ?? null), we(null), ba.mjImages && ba.mjImages.length > 1) {
                const {
                  thumbs: ki
                } = Kan(ba);
                ki.length > 0 && Z(ki.map(Wn => eh(Wn) || "").filter(Boolean));
              }
              le(ta), ke(!0);
            }
            return;
          }
          if (!I && vv(e)) {
            await Ur.ensureRestored();
            let ba = await hf(e);
            if (e.type === "video" && C && !ge.current.has(e.id)) {
              ge.current.add(e.id);
              const Ya = await jae(e);
              Ya && !_r && (ba = Ya);
            }
            const ga = Rw(hLe(e, ba) || jg(e) || (bfe(e._ossThumbnailUrl) ? e._ossThumbnailUrl : null) || (bfe(e.thumbnailUrl) ? e.thumbnailUrl : null) || jR(e.url)),
              _a = [e._assetId, ...(e.type !== "audio" ? [e.id] : [])].filter(Boolean),
              $a = Ur.isAvailable() && _a.some(Ya => Ur.hasAsset(Ya));
            if (!_r) {
              if (ga && pe(ga), we(null), e.mjImages && e.mjImages.length > 1) {
                const {
                  thumbs: Ya
                } = Kan(e);
                Ya.length > 0 && Z(Ya.map(ta => eh(ta) || "").filter(Boolean));
              }
              le($a), ke(!0);
            }
            return;
          }
          await Ur.ensureRestored();
          const {
              getViduVideoAssetId: Ir
            } = await Ie(async () => {
              const {
                getViduVideoAssetId: ba
              } = await Promise.resolve().then(() => bjt);
              return {
                getViduVideoAssetId: ba
              };
            }, void 0, import.meta.url),
            Gr = async ba => {
              if (!(Ur.isAvailable() && Ur.hasThumbnail(ba, "preview"))) return null;
              const ga = await Ur.readThumbnail(ba, "preview");
              return eh(ga) ?? null;
            },
            Zr = e.type === "video" && e.url && (e.url.includes("prod-ss-vidu") || e.url.includes("prod-sa-vidu") || e.url.includes("amazonaws") && e.url.includes("vidu")),
            La = Zr && e.url ? Ir(e.id, e.url) : null,
            sa = [e._assetId, La].filter(Boolean);
          !Zr && e.type !== "audio" && sa.push(e.id);
          for (const ba of sa) {
            if (_r) return;
            const ga = await Gr(ba);
            if (ga && !_r && (Ca = ga, pe(ga), Pa = !0), ga) break;
          }
          if (!Pa && e.type !== "audio" && e.type !== "video") try {
            const {
              ensureLocalPreviewDisplayUrl: ba
            } = await Ie(async () => {
              const {
                ensureLocalPreviewDisplayUrl: ga
              } = await Promise.resolve().then(() => Ui);
              return {
                ensureLocalPreviewDisplayUrl: ga
              };
            }, void 0, import.meta.url);
            for (const ga of sa) {
              if (_r) return;
              const _a = eh(await ba(ga, {
                maxDim: 256
              }));
              if (_a && !_r) {
                Ca = _a, pe(_a), Pa = !0;
                break;
              }
            }
          } catch {}
          if (W && W.length > 0) {
            const {
                ensureLocalPreviewDisplayUrl: ba
              } = await Ie(async () => {
                const {
                  ensureLocalPreviewDisplayUrl: _a
                } = await Promise.resolve().then(() => Ui);
                return {
                  ensureLocalPreviewDisplayUrl: _a
                };
              }, void 0, import.meta.url),
              ga = await Promise.all(W.map(async _a => {
                const $a = await Gr(_a);
                if ($a) return $a;
                try {
                  return eh(await ba(_a, {
                    maxDim: 256
                  })) ?? null;
                } catch {
                  return null;
                }
              }));
            !_r && ga.some(_a => !!_a) && (Z(ga.map(_a => _a || "")), Pa = !0);
          }
          if (Q && !_r) {
            let ba = null;
            if (JCn(e.type)) try {
              await Ur.ensureRestored(), Ur.isAvailable() && Ur.hasAsset(Q) && (ba = await Ur.getConvertFileSrcForAsset(Q));
            } catch {
              ba = null;
            }
            const ga = W4(ba);
            ga && !_r && (ie(ga), fa = !0);
          }
          const Ea = Pa || fa;
          if (!_r) {
            let ba = Ea;
            try {
              Ur.isAvailable() ? (ba = [e._assetId, ...(e.type !== "audio" ? [e.id] : []), ...(W || []), Q].filter(Boolean).some(ta => Ur.hasAsset(ta)) || Ea, le(ba)) : le(Ea);
            } catch {
              le(Ea);
            }
            const ga = Ca,
              _a = String(e.thumbnailUrl || "").trim();
            ga && _a && ga !== _a && (/asset\.localhost/i.test(_a) || /^asset:/i.test(_a) || /^https?:\/\/asset\./i.test(_a)) && u($a => $a.map(Ya => Ya.id === e.id ? {
              ...Ya,
              thumbnailUrl: ga,
              url: Ya.url || ga,
              _thumbnailAssetId: Ya._thumbnailAssetId || (Ya._assetId ? `preview_${Ya._assetId}` : void 0)
            } : Ya)), ba && (Ca || J) && Zw(e.id), ke(!0);
          }
        } catch {
          ke(!0);
        }
      })(), () => {
        _r = !0;
      };
    }, [e._assetId, e.id, e.url, W == null ? void 0 : W.length, Q, ae, s, C, E, I]), g.useEffect(() => () => {
      he.current.forEach(qn => URL.revokeObjectURL(qn)), he.current = [];
    }, [e.id]), g.useEffect(() => {
      if (!C || I || e._globalOssUrlOnly || e.type !== "audio" || !e.ossUploaded || !_e || Rbe(e) || W4(ye) || !(!ce || FH(ce)) && J && !FH(J)) return;
      let Dn = !1;
      return (async () => {
        const Ar = await FVe(e, {
          localMainUrl: ce,
          localPosterUrl: J
        });
        if (Dn) {
          Ar.blobUrls.forEach(_r => URL.revokeObjectURL(_r));
          return;
        }
        if (Ar.blobUrls.forEach(_r => he.current.push(_r)), Ar.mainUrl) {
          const _r = W4(Ar.mainUrl);
          _r ? ie(_r) : we(Ar.mainUrl);
        }
        Ar.posterUrl && pe(Ar.posterUrl);
      })(), () => {
        Dn = !0;
      };
    }, [e.ossUploaded, _e, J, ce, ye, e.id, e._assetId, e.type, e.url, e.audioUrl, e._ossRemoteUrl, C, I]), g.useEffect(() => {
      if (!C || e.type !== "video" || !_e) return;
      if (SR(J)) {
        ge.current.add(e.id);
        return;
      }
      if (ge.current.has(e.id)) return;
      ge.current.add(e.id);
      let qn = !1;
      return (async () => {
        const Dn = eh(await jae(e, {
          localVideoPlayUrl: ce || void 0
        }));
        !qn && Dn ? pe(Dn) : !qn && !Dn && ge.current.delete(e.id);
      })(), () => {
        qn = !0;
      };
    }, [C, e.type, e.id, e.thumbnailUrl, e.videoPosterUrl, e._ossThumbnailUrl, _e, ce, J, s]), g.useEffect(() => {
      if (!C || e.type === "video" || e.type === "audio" || !_e) return;
      if (e._globalOssUrlOnly || vv(e)) {
        Zw(e.id);
        return;
      }
      if (SR(J)) {
        Zw(e.id);
        return;
      }
      const qn = !vv(e) && !e._globalOssUrlOnly && !Nk(e),
        Dn = !!J || !!(X != null && X.some(_r => _r && Ene(_r)));
      if (RHe(e.id)) {
        if (!qn || Dn) return;
        qpt(e.id);
      }
      if (de && (!qn || J)) {
        Zw(e.id);
        return;
      }
      if (ce && Ene(ce) && (!qn || J)) {
        Zw(e.id);
        return;
      }
      if (e.mjImages && e.mjImages.length > 1) {
        const _r = Math.min(4, e.mjImages.length);
        if (((X == null ? void 0 : X.filter(fa => fa && SR(fa)).length) ?? 0) >= _r || ((X == null ? void 0 : X.filter(fa => fa && Ene(fa)).length) ?? 0) >= _r || ((re == null ? void 0 : re.filter(fa => fa && Ene(fa)).length) ?? 0) >= _r) {
          Zw(e.id);
          return;
        }
      } else if (J && Ene(J)) {
        Zw(e.id);
        return;
      }
      if (!ZIn(e.id)) return;
      let Ar = !1;
      return (async () => {
        var _r;
        if (e.mjImages && e.mjImages.length > 1) {
          const Pa = [];
          for (let fa = 0; fa < Math.min(4, e.mjImages.length); fa++) {
            if (Ar) return;
            const Ca = eh(await Dae(e, {
              mjIndex: fa,
              localImageUrl: (re == null ? void 0 : re[fa]) || ((_r = e.mjImages) == null ? void 0 : _r[fa])
            }));
            Ca && (Pa[fa] = Ca);
          }
          !Ar && Pa.some(Boolean) && Z(fa => {
            const Ca = fa != null && fa.length ? [...fa] : [];
            return Pa.forEach(($n, yr) => {
              $n && (Ca[yr] = $n);
            }), Ca;
          });
        } else {
          const Pa = eh(await Dae(e, {
            localImageUrl: ce || J || void 0
          }));
          !Ar && Pa && pe(Pa);
        }
      })(), () => {
        Ar = !0;
      };
    }, [C, e.type, e.id, e.thumbnailUrl, e._ossThumbnailUrl, (rn = e.mjImages) == null ? void 0 : rn.length, _e, ce, J, X, re, de, s]);
    const He = Rw(vv(e) ? jg(e) || e._ossThumbnailUrl || e.thumbnailUrl || jR(e.url) : void 0),
      Ve = (...qn) => {
        if (vv(e)) {
          for (const Ar of qn) {
            const _r = Rw(Ar);
            if (_r && !nr(_r) && L6e(_r)) return _r;
          }
          for (const Ar of qn) {
            const _r = Rw(Ar);
            if (_r && nr(_r)) return _r;
          }
          for (const Ar of qn) {
            const _r = Rw(Ar);
            if (_r && L6e(_r)) return _r;
          }
          for (const Ar of qn) {
            const _r = Rw(Ar);
            if (_r) return _r;
          }
          return;
        }
        for (const Ar of qn) if (Ar && !wtr(Ar)) {
          const _r = eh(Ar) || (Ar.startsWith("blob:") ? void 0 : Ar);
          if (_r) return _r;
        }
      },
      it = e.type === "video" ? cCt(J, _e && L6e(Fe ?? void 0) ? Fe ?? void 0 : void 0, He, e.thumbnailUrl, e.videoPosterUrl, e._ossThumbnailUrl) : void 0,
      It = e.type === "video" ? it : Ve(He, J, _e ? Fe : void 0, I && (/asset\.localhost/i.test(String(e.thumbnailUrl || "")) || /^asset:/i.test(String(e.thumbnailUrl || "")) || /^https?:\/\/asset\./i.test(String(e.thumbnailUrl || ""))) ? void 0 : e.thumbnailUrl, jR(e.url)),
      Ft = i && !!(J || ce || ye || X != null && X.length),
      We = C || Ft,
      Ze = e.type === "video" && it && We ? nr(it) ? ya(it) : it : void 0,
      Ge = Rw(J || He || It || (e.type !== "video" ? ((Yn = e.mjThumbnails) == null ? void 0 : Yn[0]) || e.mjOriginalUrl || ((Ct = e.mjImages) == null ? void 0 : Ct[0]) : void 0)) || (e.type === "3d" ? vLe(e._ossThumbnailUrl || e.thumbnailUrl || e.url) : void 0),
      Oe = We && Ge ? nr(Ge) ? ya(Ge) : Ge : void 0,
      st = CCt(e, {
        isCachedLocally: de,
        localResolvedUrl: ce,
        localResolvedThumbnail: J
      }),
      vt = !I && ICt(e),
      Ht = e._globalOssUrlOnly || Nk(e) ? Bd(e) || (e._ossRemoteUrl && !Ad(e._ossRemoteUrl) ? e._ossRemoteUrl : void 0) || (e.originalUrl && !Ad(e.originalUrl) ? e.originalUrl : void 0) || (e.url && !Ad(e.url) ? e.url : void 0) : e._ossRemoteUrl || e.originalUrl || Bd(e) || e.url,
      nn = (() => {
        const qn = Rbe(e);
        if (qn && !(I && nr(qn))) return qn;
      })(),
      pt = $e && (!I || !nr($e)) ? W4($e) || (I ? void 0 : $e) : void 0,
      lt = W4(ye) || pt || nn || "",
      gt = e.mjImages && e.mjImages.length > 1 ? e.mjImages.map((qn, Dn) => M0(e, Dn) || e.mjImages[Dn] || "") : [],
      Ut = Xe.some(Boolean) ? Xe : nt,
      _t = (X && X.length > 0 ? X : null) || (W != null && W.length && !_e ? [] : Ut),
      At = gt,
      Yt = We && (e.type === "video" ? !!Ze : e.type === "audio" ? !!lt : It || e.mjImages && e.mjImages.length > 1 && _t.length > 0),
      qe = i && !Yt && (!_e || C && (Me || e.type !== "video" && De)),
      kt = qn => {
        qn.stopPropagation(), (async () => {
          try {
            const Dn = await lDn(e);
            Dn && (await navigator.clipboard.writeText(Dn));
          } catch (Dn) {
            if (console.warn("[HistoryPanel] 复制提示词失败:", Dn), e.prompt && typeof e.prompt == "string" && !lg(e.prompt)) try {
              await navigator.clipboard.writeText(e.prompt);
            } catch {}
          }
        })();
      },
      St = a ?? {
        col: 0,
        cols: 1,
        cardWidth: 0,
        rowOffset: t * (r + 4) + 4,
        gap: 4
      },
      hn = St.rowOffset,
      Qt = St.cols > 1 ? St.col * (St.cardWidth + St.gap) + St.gap / 2 : St.gap,
      Ot = St.cols > 1 ? St.cardWidth : void 0;
    return c.jsxs("div", {
      ref: w,
      "data-history-item-id": e.id,
      className: `absolute rounded-lg overflow-hidden cursor-pointer transition-colors ${n ? "bg-zinc-900 hover:bg-zinc-800/80" : "bg-white hover:bg-zinc-50"}`,
      style: {
        top: hn,
        left: Qt,
        right: St.cols > 1 ? void 0 : St.gap,
        width: St.cols > 1 ? Ot : void 0,
        height: r - 4
      },
      onContextMenu: qn => h(qn, {
        ...e,
        selectedMjImageIndex: U,
        thumbnailUrl: (e.type === "video" ? it : Oe) || e.thumbnailUrl,
        _assetId: e._assetId || e.id
      }),
      draggable: !(e.type === "video" && e.mjImages && e.mjImages.length > 1),
      onDragStart: qn => {
        if (e.type === "video" && e.mjImages && e.mjImages.length > 1) {
          qn.preventDefault();
          return;
        }
        Qan(qn, {
          item: e,
          displayOriginalUrl: Ht,
          displayAudioUrl: lt,
          displayMjOriginals: At,
          localResolvedMjUrls: re,
          loadedMjOriginals: Ye,
          localResolvedUrl: ce
        });
      },
      onDragEnd: qn => {},
      children: [N === "generating" ? c.jsxs("div", {
        className: "h-[120px] bg-zinc-800 flex flex-col items-center justify-center relative gap-2",
        children: [c.jsx(MFa, {
          progress: G || 0,
          size: 48,
          strokeWidth: 3,
          isDark: n,
          showPercentage: !0
        }), ((un = (Cn = e.apiConfig) == null ? void 0 : Cn.modelId) == null ? void 0 : un.startsWith("jimeng-cli-")) && c.jsx("span", {
          role: "status",
          className: `text-[10px] text-center w-full px-2 truncate ${n ? "text-zinc-400" : "text-zinc-500"}`,
          title: x(`{0}{1}
进度环为预计进度，完成状态以即梦返回结果为准`, ((Jn = e.jimengStatus) == null ? void 0 : Jn.message) || "正在准备生成任务", (Kn = e.jimengStatus) != null && Kn.checkedAt ? `
最近查询：${new Date(e.jimengStatus.checkedAt).toLocaleTimeString(ew(), {
            hour12: !1
          })}` : ""),
          children: ((en = e.jimengStatus) == null ? void 0 : en.message) || (e.remoteTaskId ? x("已提交云端，正在查询任务") : x("正在准备生成任务"))
        }), e.modelName === "RH ComfyUI" && e.id && c.jsxs("span", {
          className: `text-[10px] ${n ? "text-zinc-500" : "text-zinc-400"}`,
          title: e.id,
          children: ["taskid: ", e.id.length > 16 ? e.id.slice(0, 16) + "…" : e.id]
        })]
      }) : N === "failed" ? c.jsxs("div", {
        className: "h-[120px] bg-zinc-800 flex flex-col items-center justify-center p-2 gap-1",
        children: [c.jsx("span", {
          className: "text-red-400 text-xs font-medium",
          children: x("生成失败")
        }), e.errorMsg && c.jsx("span", {
          className: `text-[10px] text-center w-full px-2 line-clamp-3 overflow-hidden ${n ? "text-zinc-400" : "text-zinc-500"}`,
          title: Tne(e.errorMsg),
          children: Tne(e.errorMsg).length > 150 ? Tne(e.errorMsg).substring(0, 150) + "..." : Tne(e.errorMsg)
        }), e.modelName === "RH ComfyUI" && e.id && c.jsxs("span", {
          className: `text-[9px] ${n ? "text-zinc-600" : "text-zinc-400"}`,
          title: e.id,
          children: ["taskid: ", e.id.length > 16 ? e.id.slice(0, 16) + "…" : e.id]
        }), e.type === "3d" && f || yan(e) && y ? c.jsxs("button", {
          type: "button",
          onClick: qn => {
            qn.stopPropagation(), e.type === "3d" ? f == null || f(e) : y == null || y(e);
          },
          className: `mt-1 inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] ${n ? "bg-zinc-700 text-zinc-200 hover:bg-zinc-600" : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"}`,
          children: [c.jsx(ox, {
            size: 10
          }), x("刷新任务")]
        }) : null]
      }) : e.type === "video" && e.mjImages && e.mjImages.length > 1 ? c.jsxs("div", {
        className: "h-[120px] bg-zinc-800 grid grid-cols-2 grid-rows-2 gap-0 p-0.5 relative",
        children: [De && c.jsx("div", {
          className: "absolute inset-0 flex items-center justify-center bg-black/30 z-10",
          children: c.jsx(Ua, {
            className: "w-6 h-6 animate-spin text-blue-500"
          })
        }), Array.from({
          length: 4
        }, (qn, Dn) => {
          var fa;
          const Ar = C ? _t[Dn] : void 0,
            _r = U === Dn;
          At[Dn] || Ye[Dn] || ((fa = e.mjImages) == null || fa[Dn]);
          const Pa = e.type === "video";
          return c.jsxs("div", {
            className: `mj-grid-quadrant relative w-full h-full cursor-pointer border-2 transition-all overflow-hidden ${_r ? "border-blue-500 scale-95" : "border-transparent hover:border-blue-500/50"}`,
            draggable: C && !Pa,
            onClick: Ca => {
              Ca.stopPropagation(), H(Dn), u($n => $n.map(yr => yr.id === e.id ? {
                ...yr,
                selectedMjImageIndex: Dn
              } : yr));
            },
            onDragStart: Ca => {
              Ca.stopPropagation(), H(Dn), u($n => $n.map(yr => yr.id === e.id ? {
                ...yr,
                selectedMjImageIndex: Dn
              } : yr)), Qan(Ca, {
                item: {
                  ...e,
                  selectedMjImageIndex: Dn
                },
                displayOriginalUrl: Ht,
                displayAudioUrl: lt,
                displayMjOriginals: At,
                localResolvedMjUrls: re,
                loadedMjOriginals: Ye,
                localResolvedUrl: ce,
                dragIndex: Dn
              });
            },
            onContextMenu: Ca => {
              var Ir, Gr;
              Ca.stopPropagation(), H(Dn), u(Zr => Zr.map(La => La.id === e.id ? {
                ...La,
                selectedMjImageIndex: Dn
              } : La));
              const $n = (X == null ? void 0 : X[Dn]) || ((Ir = e.mjThumbnails) == null ? void 0 : Ir[Dn]) || Oe || e.thumbnailUrl,
                yr = ((Gr = e._mjAssetIds) == null ? void 0 : Gr[Dn]) || e._assetId || e.id;
              h(Ca, {
                ...e,
                selectedMjImageIndex: Dn,
                thumbnailUrl: $n,
                _assetId: yr
              });
            },
            onDoubleClick: Ca => {
              var yr;
              Ca.stopPropagation();
              const $n = M0(e, Dn) || At[Dn] || Ye[Dn] || ((yr = e.mjImages) == null ? void 0 : yr[Dn]);
              l(Cit(YG(e, {
                localResolvedUrl: $n ?? ce,
                localResolvedMjUrls: re,
                displayMjOriginals: At,
                mjIndex: Dn
              }), Ca.currentTarget)), d(!0);
            },
            children: [Pa ? (() => {
              const Ca = (Ar && L6e(Ar) ? Ar : void 0) || Ze;
              return Ca ? c.jsx(UO, {
                src: Ca,
                enabled: C,
                assetId: `${e.id}_${Dn}`,
                className: "w-full h-full object-cover"
              }) : c.jsx("div", {
                className: "w-full h-full bg-zinc-800/80"
              });
            })() : Ar ? c.jsx(UO, {
              src: Ar,
              enabled: C,
              assetId: `${e.id}_${Dn}`,
              className: "w-full h-full object-cover",
              alt: x("生成图 {0}", Dn + 1)
            }) : c.jsx("div", {
              className: "w-full h-full bg-zinc-800/80"
            }), _r && c.jsx("div", {
              className: "absolute top-1 right-1 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center z-10",
              children: c.jsx(io, {
                size: 8,
                className: "text-white"
              })
            })]
          }, Dn);
        }), st && c.jsxs("div", {
          className: "absolute bottom-1 left-1 z-20 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-600/80 text-white text-[8px] font-medium backdrop-blur-sm shadow-sm",
          children: [c.jsx(axe, {
            size: 8
          }), x("本地缓存")]
        }), vt && c.jsxs("div", {
          className: `absolute bottom-1 z-20 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-blue-600/80 text-white text-[8px] font-medium backdrop-blur-sm shadow-sm ${st ? "left-[72px]" : "left-1"}`,
          children: [c.jsx(Wp, {
            size: 8
          }), x("云端备份")]
        })]
      }) : It || e.type === "video" || e.type === "audio" || e.type === "3d" || N === "completed" ? c.jsxs("div", {
        className: "relative group h-[120px] bg-zinc-800",
        children: [qe && e.type !== "audio" && c.jsx("div", {
          className: "absolute inset-0 flex items-center justify-center bg-black/30 z-10",
          children: c.jsx(Ua, {
            className: "w-6 h-6 animate-spin text-blue-500"
          })
        }), e.type === "video" ? c.jsxs(c.Fragment, {
          children: [Ze ? c.jsx(UO, {
            src: Ze,
            enabled: C,
            assetId: e.id,
            className: "w-full h-full object-cover",
            onDoubleClick: qn => {
              qn.stopPropagation(), l(YG(e, {
                localResolvedUrl: ce,
                localResolvedMjUrls: re,
                displayMjOriginals: At
              })), d(!0);
            }
          }) : c.jsx("div", {
            className: "w-full h-full flex items-center justify-center bg-zinc-800/80",
            onDoubleClick: qn => {
              qn.stopPropagation(), l(YG(e, {
                localResolvedUrl: ce,
                localResolvedMjUrls: re,
                displayMjOriginals: At
              })), d(!0);
            },
            title: x("封面未就绪，双击播放视频"),
            children: c.jsx(Ol, {
              size: 24,
              className: "text-zinc-500"
            })
          }), c.jsx("div", {
            className: "absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors pointer-events-none",
            children: c.jsx("div", {
              className: "w-12 h-12 rounded-full bg-black/60 flex items-center justify-center group-hover:scale-110 transition-transform",
              children: c.jsx(Ol, {
                size: 20,
                className: "text-white ml-1",
                fill: "white"
              })
            })
          })]
        }) : e.type === "3d" ? c.jsxs("div", {
          className: "relative h-full w-full cursor-pointer",
          onDoubleClick: qn => {
            qn.stopPropagation(), XBa(e) || (l(YG(e, {
              localResolvedUrl: Oe || ce,
              localResolvedMjUrls: re,
              displayMjOriginals: At
            })), d(!0));
          },
          title: e.url || e.thumbnailUrl ? x("双击预览 3D 模型") : x("3D 模型"),
          children: [Oe ? c.jsx(UO, {
            src: Oe,
            enabled: C,
            assetId: e.id,
            className: "w-full h-full object-cover"
          }) : c.jsxs("div", {
            className: "w-full h-full flex flex-col items-center justify-center bg-zinc-800/80 gap-1",
            children: [c.jsx(Hm, {
              size: 24,
              className: "text-zinc-400"
            }), c.jsx("span", {
              className: "text-[10px] text-zinc-500",
              children: x("3D 模型")
            })]
          }), c.jsxs("div", {
            className: "absolute bottom-1 right-1 z-20 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-black/60 text-white text-[8px] font-medium backdrop-blur-sm",
            children: [c.jsx(Hm, {
              size: 8
            }), "3D"]
          }), vt || e.ossUploaded || e._globalOssUrlOnly ? c.jsxs("div", {
            className: "absolute bottom-1 left-1 z-20 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-blue-600/80 text-white text-[8px] font-medium backdrop-blur-sm shadow-sm",
            children: [c.jsx(Wp, {
              size: 8
            }), "OSS"]
          }) : null]
        }) : e.type === "audio" ? c.jsx("div", {
          className: "flex h-full w-full items-stretch overflow-hidden",
          onDoubleClick: qn => {
            qn.stopPropagation(), l(YG(e, {
              localResolvedUrl: lt || ce,
              loadedOriginalUrl: $e
            })), d(!0);
          },
          children: lt ? c.jsx(mze, {
            audioUrl: lt,
            isDark: n,
            className: "h-full w-full",
            variant: "card",
            initialDuration: e.duration,
            onDurationResolved: qn => {
              (!e.duration || e.duration <= 0) && u(Dn => Dn.map(Ar => Ar.id === e.id ? {
                ...Ar,
                duration: qn
              } : Ar));
            }
          }) : c.jsx("div", {
            className: "flex h-full w-full items-center justify-center",
            children: c.jsx(Ua, {
              className: "w-4 h-4 animate-spin text-blue-500"
            })
          })
        }) : c.jsx(c.Fragment, {
          children: Oe ? c.jsx(UO, {
            src: Oe,
            enabled: C,
            assetId: e.id,
            className: "w-full h-full object-cover",
            onDoubleClick: qn => {
              qn.stopPropagation(), l(Cit(YG(e, {
                localResolvedUrl: ce,
                localResolvedMjUrls: re,
                displayMjOriginals: At
              }), qn.currentTarget)), d(!0);
            }
          }) : c.jsx("div", {
            className: "w-full h-full flex flex-col items-center justify-center bg-zinc-800/80 cursor-pointer gap-1",
            onDoubleClick: qn => {
              qn.stopPropagation(), l(Cit(YG(e, {
                localResolvedUrl: ce,
                localResolvedMjUrls: re,
                displayMjOriginals: At
              }), qn.currentTarget)), d(!0);
            },
            title: x("缩略图未就绪，双击查看原图"),
            children: vv(e) && Bd(e) ? c.jsx(Ua, {
              size: 22,
              className: "text-zinc-500 animate-spin"
            }) : e.type === "3d" ? c.jsx(Hm, {
              size: 24,
              className: "text-zinc-500"
            }) : c.jsx(Od, {
              size: 24,
              className: "text-zinc-500"
            })
          })
        }), st && c.jsxs("div", {
          className: "absolute bottom-1 left-1 z-20 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-600/80 text-white text-[8px] font-medium backdrop-blur-sm shadow-sm",
          children: [c.jsx(axe, {
            size: 8
          }), x("本地缓存")]
        }), vt && c.jsxs("div", {
          className: `absolute bottom-1 z-20 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-blue-600/80 text-white text-[8px] font-medium backdrop-blur-sm shadow-sm ${st ? "left-[72px]" : "left-1"}`,
          children: [c.jsx(Wp, {
            size: 8
          }), x("云端备份")]
        })]
      }) : null, c.jsxs("div", {
        className: `px-2 ${e.type === "audio" ? "py-0.5" : "py-1"} flex items-center gap-1 border-b ${n ? "border-zinc-800" : "border-zinc-100"}`,
        children: [c.jsx("p", {
          className: `flex-1 min-w-0 text-[11px] truncate font-medium leading-4 ${n ? "text-zinc-300" : "text-zinc-700"}`,
          children: (() => {
            const qn = Tne(e.prompt);
            return qn ? `${qn.slice(0, 30)}${qn.length > 30 ? "..." : ""}` : "无提示词";
          })()
        }), c.jsxs("div", {
          className: "flex items-center gap-0.5 shrink-0",
          children: [c.jsx("button", {
            onClick: qn => {
              qn.stopPropagation();
              const Dn = String(e.id);
              if (e.remoteTaskId || e.status === "generating") try {
                window.dispatchEvent(new CustomEvent("cancelPolling", {
                  detail: {
                    taskId: e.id
                  }
                }));
              } catch (Ar) {
                console.warn("[HistoryPanel] cancelPolling dispatch failed:", Ar);
              }
              u(Ar => Ar.filter(_r => String(_r.id) !== Dn)), VQn(e, Ar => {
                console.warn("[HistoryPanel] 删除本地缓存失败:", Ar);
              });
            },
            className: `p-1 rounded transition-colors ${n ? "hover:bg-zinc-700 text-zinc-500 hover:text-red-400" : "hover:bg-zinc-200 text-zinc-400 hover:text-red-500"}`,
            title: x("删除（含本地缓存的缩略图与原图/视频/音频）"),
            children: c.jsx(Qo, {
              size: 11
            })
          }), c.jsx("button", {
            onClick: kt,
            className: `p-1 rounded transition-colors ${n ? "hover:bg-zinc-700 text-zinc-500 hover:text-zinc-200" : "hover:bg-zinc-200 text-zinc-400 hover:text-zinc-700"}`,
            title: x("复制提示词"),
            children: c.jsx(Cx, {
              size: 11
            })
          }), e.status === "generating" && c.jsx("button", {
            onClick: qn => {
              qn.stopPropagation();
              try {
                window.dispatchEvent(new CustomEvent("cancelPolling", {
                  detail: {
                    taskId: e.id
                  }
                }));
              } catch (Dn) {
                console.warn("[HistoryPanel] cancelPolling dispatch failed:", Dn);
              }
              u(Dn => Dn.map(Ar => Ar.id === e.id ? {
                ...Ar,
                status: "failed",
                progress: 0,
                errorMsg: "已取消轮询（任务可能仍在后台执行）"
              } : Ar));
            },
            className: `p-1 rounded transition-colors ${n ? "hover:bg-zinc-700 text-zinc-500 hover:text-red-400" : "hover:bg-zinc-200 text-zinc-400 hover:text-red-500"}`,
            title: x("取消轮询（仅停止前端轮询）"),
            children: c.jsx(Na, {
              size: 11
            })
          }), e.type === "video" && e.remoteTaskId && p && c.jsx("button", {
            onClick: qn => {
              qn.stopPropagation(), p(e);
            },
            className: `p-1 rounded transition-colors ${n ? "hover:bg-zinc-700 text-zinc-500 hover:text-green-400" : "hover:bg-zinc-200 text-zinc-400 hover:text-green-600"}`,
            title: (Tt = (Vn = e.apiConfig) == null ? void 0 : Vn.modelId) != null && Tt.startsWith("jimeng-cli-") ? x("查询即梦任务进度与结果") : x("刷新视频状态"),
            children: c.jsx(ox, {
              size: 11
            })
          }), e.modelName === "RH ComfyUI" && v && c.jsx("button", {
            onClick: qn => {
              qn.stopPropagation(), v(e);
            },
            className: `p-1 rounded transition-colors ${n ? "hover:bg-zinc-700 text-zinc-500 hover:text-blue-400" : "hover:bg-zinc-200 text-zinc-400 hover:text-blue-600"}`,
            title: x("重新获取任务状态"),
            children: c.jsx(bd, {
              size: 11
            })
          }), e.type === "audio" && m && c.jsx("button", {
            onClick: qn => {
              qn.stopPropagation(), m(e);
            },
            className: `p-1 rounded transition-colors ${n ? "hover:bg-zinc-700 text-zinc-500 hover:text-green-400" : "hover:bg-zinc-200 text-zinc-400 hover:text-green-600"}`,
            title: x("刷新音频状态"),
            children: c.jsx(ox, {
              size: 11
            })
          }), e.type === "3d" && f && c.jsx("button", {
            onClick: qn => {
              qn.stopPropagation(), f(e);
            },
            className: `p-1 rounded transition-colors ${n ? "hover:bg-zinc-700 text-zinc-500 hover:text-green-400" : "hover:bg-zinc-200 text-zinc-400 hover:text-green-600"}`,
            title: x("刷新 3D 任务，轮询完整结果"),
            children: c.jsx(ox, {
              size: 11
            })
          }), yan(e) && y && c.jsx("button", {
            onClick: qn => {
              qn.stopPropagation(), y(e);
            },
            className: `p-1 rounded transition-colors ${n ? "hover:bg-zinc-700 text-zinc-500 hover:text-green-400" : "hover:bg-zinc-200 text-zinc-400 hover:text-green-600"}`,
            title: x("刷新 Fal 图片任务，轮询完整结果"),
            children: c.jsx(ox, {
              size: 11
            })
          }), e.type === "image" && (((et = (Ue = e.apiConfig) == null ? void 0 : Ue.modelId) == null ? void 0 : et.startsWith("jimeng-cli-")) && e.remoteTaskId || (e.url || e.mjOriginalUrl) && (e.mjImages && Array.isArray(e.mjImages) && e.mjImages.length > 0 || e.mjNeedsSplit || e.modelName && (e.modelName.toLowerCase().includes("midjourney") || e.modelName.toLowerCase().includes("mj") || e.modelName.toLowerCase().includes("jimeng")))) && b && c.jsx("button", {
            onClick: qn => {
              qn.stopPropagation(), b(e);
            },
            className: `p-1 rounded transition-colors ${n ? "hover:bg-zinc-700 text-zinc-500 hover:text-blue-400" : "hover:bg-zinc-200 text-zinc-400 hover:text-blue-600"}`,
            title: (ht = (ft = e.apiConfig) == null ? void 0 : ft.modelId) != null && ht.startsWith("jimeng-cli-") ? x("查询即梦任务进度与结果") : e.modelName && (e.modelName.toLowerCase().includes("midjourney") || e.modelName.toLowerCase().includes("mj")) ? x("重新裁切MJ图片") : x("重新裁切多图"),
            children: c.jsx(bd, {
              size: 11
            })
          }), e.type === "image" && e.remoteTaskId && _ && e.modelName && (!!((jt = (wt = e.apiConfig) == null ? void 0 : wt.customProtocol) != null && jt.poll) || e.modelName.toLowerCase().includes("nano banana") || e.modelName.toLowerCase().includes("nano-banana") || ((Bt = (bt = e.apiConfig) == null ? void 0 : bt.modelId) == null ? void 0 : Bt.includes("nano-banana")) || ((at = (wn = e.apiConfig) == null ? void 0 : wn.modelId) == null ? void 0 : at.includes("gemini-3.1-flash-image-preview")) || ((dt = (Pt = e.apiConfig) == null ? void 0 : Pt.modelId) == null ? void 0 : dt.includes("gemini-3.1-flash-lite-image")) || qM((xt = e.apiConfig) == null ? void 0 : xt.modelId) || e.modelName.toLowerCase().includes("grok 4.1 image") || e.modelName.toLowerCase().includes("grok 4.2 image") || e.modelName.toLowerCase().includes("grok-imagine") || e.modelName.toLowerCase().includes("grok-quality") || e.modelName.toLowerCase().includes("grok imagine") || e.modelName.toLowerCase().includes("grok quality") || ((gn = (yn = e.apiConfig) == null ? void 0 : yn.modelId) == null ? void 0 : gn.includes("gpt-image")) || e.modelName.toLowerCase().includes("gpt image") || e.modelName.toLowerCase().includes("gpt-4o") || ((Xt = (mt = e.apiConfig) == null ? void 0 : mt.modelId) == null ? void 0 : Xt.includes("qwen-image-edit")) || e.modelName.toLowerCase().includes("qwen image") || ((rr = (Gn = e.apiConfig) == null ? void 0 : Gn.modelId) == null ? void 0 : rr.includes("flux-kontext")) || e.modelName.toLowerCase().includes("flux")) && c.jsx("button", {
            onClick: qn => {
              qn.stopPropagation(), _(e);
            },
            className: `p-1 rounded transition-colors ${n ? "hover:bg-zinc-700 text-zinc-500 hover:text-green-400" : "hover:bg-zinc-200 text-zinc-400 hover:text-green-600"}`,
            title: x("刷新任务状态，获取图片链接"),
            children: c.jsx(bd, {
              size: 11
            })
          })]
        })]
      }), N === "generating" && c.jsx("div", {
        className: `px-2 py-1 text-[10px] ${n ? "text-blue-400" : "text-blue-600"}`,
        children: x("生成中...")
      }), c.jsx("div", {
        className: `px-2 ${e.type === "audio" ? "py-0.5" : "py-1"}`,
        children: c.jsxs("div", {
          className: `flex items-center justify-between gap-2 text-[10px] ${n ? "text-zinc-500" : "text-zinc-400"}`,
          children: [c.jsxs("div", {
            className: "flex items-center gap-1.5 min-w-0",
            children: [c.jsx("span", {
              children: bEr(e)
            }), c.jsx("span", {
              children: "·"
            }), c.jsx("span", {
              className: "truncate",
              children: ktr(e)
            }), (() => {
              const qn = e.type === "audio" ? wEr(e.musicTitle) : null;
              return qn ? c.jsxs(c.Fragment, {
                children: [c.jsx("span", {
                  children: "·"
                }), c.jsx("span", {
                  className: "truncate max-w-[4rem]",
                  children: qn
                })]
              }) : null;
            })()]
          }), N === "completed" && (() => {
            const qn = z || null;
            return qn ? c.jsx("span", {
              className: `shrink-0 ${n ? "text-green-400" : "text-green-600"}`,
              children: qn
            }) : null;
          })()]
        })
      }), h$a(e) ? (() => {
        const qn = String(e.remoteTaskId || e.id || "").trim();
        if (!qn) return null;
        const Dn = qn.length > 22 ? `${qn.slice(0, 10)}…${qn.slice(-8)}` : qn;
        return c.jsxs("button", {
          type: "button",
          title: x("Codex 任务 ID：{0}（点击复制）", qn),
          onClick: Ar => {
            Ar.stopPropagation(), navigator.clipboard.writeText(qn);
          },
          className: `mx-2 mb-1 flex max-w-[calc(100%-1rem)] items-center gap-1 text-[9px] leading-none ${n ? "text-zinc-500 hover:text-zinc-300" : "text-zinc-400 hover:text-zinc-600"}`,
          children: [c.jsx("span", {
            className: "shrink-0",
            children: x("任务 ID")
          }), c.jsx("span", {
            className: "truncate font-mono",
            children: Dn
          }), c.jsx(Cx, {
            size: 9,
            className: "shrink-0"
          })]
        });
      })() : null]
    });
  }, f$a);

Atr.displayName = "HistoryItemCard";

const Str = ({
    isOpen: e,
    onClose: t,
    isDark: n,
    history: r,
    localCacheServerConnected: a,
    localCacheSettingsOpen: i,
    localServerConfig: o,
    onSetLocalCacheSettingsOpen: s,
    onSetLocalServerConfig: l,
    onSetHistory: d,
    onReplaceHistory: u,
    onSetLightboxItem: h,
    onSetLightboxOpen: p,
    onSetBatchManageOpen: m,
    onHistoryContextMenu: f,
    onRefreshVideo: y,
    onRefreshAudio: b,
    onRefresh3d: v,
    onRefreshFalImage: _,
    onRefreshMjImage: w,
    onRefreshComfyTask: k,
    onRefreshNanoBanana: A,
    hasMoreHistory: S = !1,
    onLoadMoreHistory: C
  }) => {
    var ie;
    on();
    const [I, E] = g.useState(!1);
    g.useEffect(() => {
      if (!e) {
        E(!1);
        return;
      }
      let ae = !1;
      return Id().then(() => {
        ae || E(!0);
      }), () => {
        ae = !0;
      };
    }, [e]);
    const M = e && I,
      [T] = g.useState(0),
      [P, R] = g.useState(() => ua());
    g.useEffect(() => {
      const ae = () => R(ua());
      return window.addEventListener(go, ae), () => window.removeEventListener(go, ae);
    }, []);
    const j = g.useCallback(async () => {
        try {
          const {
              loadAllHistoryPages: ae
            } = await Ie(async () => {
              const {
                loadAllHistoryPages: he
              } = await Promise.resolve().then(() => Gu);
              return {
                loadAllHistoryPages: he
              };
            }, void 0, import.meta.url),
            {
              sanitizeHistoryItemOnLoad: be
            } = await Ie(async () => {
              const {
                sanitizeHistoryItemOnLoad: he
              } = await Promise.resolve().then(() => ii);
              return {
                sanitizeHistoryItemOnLoad: he
              };
            }, void 0, import.meta.url);
          let xe = (await ae({
            pageSize: 500
          })).items.map(he => be(he));
          xe.length === 0 && r.length === 0 && (xe = Mwt()), xe.length > 0 && (u || d)(xe);
        } catch (ae) {
          console.warn("[HistoryPanel] 重新加载生成历史失败:", ae);
        }
      }, [r.length, d, u]),
      {
        settings: B,
        updateSettings: F,
        ossBusy: N,
        ossMessage: G,
        ossProgress: z,
        ossAvailable: V,
        uploadToCloud: O,
        downloadFromCloud: L,
        pendingQueueCount: D
      } = a$a(),
      {
        getEnableLabel: U,
        configHint: H
      } = dXe(),
      [Y, K] = g.useState(!1),
      [W, Q] = g.useState(!1),
      [q, ne] = g.useState("all"),
      [de, le] = g.useState(""),
      J = g.useCallback(async () => {
        if (!W) {
          Q(!0);
          try {
            const {
                deleteFailedHistoryByStorageMode: ae,
                addDeletedHistoryIds: be,
                addDeletedHistoryUrls: Ee,
                persistHistoryToStorage: xe
              } = await Ie(async () => {
                const {
                  deleteFailedHistoryByStorageMode: ke,
                  addDeletedHistoryIds: ve,
                  addDeletedHistoryUrls: Te,
                  persistHistoryToStorage: Ne
                } = await Promise.resolve().then(() => Gu);
                return {
                  deleteFailedHistoryByStorageMode: ke,
                  addDeletedHistoryIds: ve,
                  addDeletedHistoryUrls: Te,
                  persistHistoryToStorage: Ne
                };
              }, void 0, import.meta.url),
              he = await ae(),
              ue = G1(r).filter(ke => ke.status === "failed" || !!(ke.errorMsg && String(ke.errorMsg).trim())),
              ge = new Set([...he.map(String), ...ue.map(ke => String(ke.id))]);
            if (ge.size === 0) return;
            const _e = r.filter(ke => ge.has(String(ke.id)));
            be(ge), _e.length > 0 && Ee(_e), Ie(async () => {
              const {
                removeHistoryItemsFromOssManifest: ke
              } = await Promise.resolve().then(() => qh);
              return {
                removeHistoryItemsFromOssManifest: ke
              };
            }, void 0, import.meta.url).then(({
              removeHistoryItemsFromOssManifest: ke
            }) => ke([...ge])), d(ke => {
              const ve = ke.filter(Te => !ge.has(String(Te.id)));
              return xe(ve), ve;
            }), _e.length > 0 && Ie(async () => {
              const {
                deleteCachesForHistoryItems: ke
              } = await Promise.resolve().then(() => O8a);
              return {
                deleteCachesForHistoryItems: ke
              };
            }, void 0, import.meta.url).then(({
              deleteCachesForHistoryItems: ke
            }) => ke(_e).catch(ve => {
              console.warn("[HistoryPanel] 删除失败项缓存失败:", ve);
            }));
          } finally {
            Q(!1);
          }
        }
      }, [W, r, d]);
    g.useEffect(() => {
      const ae = be => {
        var ue, ge;
        const Ee = be,
          xe = (ue = Ee.detail) == null ? void 0 : ue.taskId,
          he = (ge = Ee.detail) == null ? void 0 : ge.ossUploaded;
        xe ? (async () => {
          const {
            patchHistoryItemOssUrlFields: _e
          } = await Ie(async () => {
            const {
              patchHistoryItemOssUrlFields: ke
            } = await Promise.resolve().then(() => qh);
            return {
              patchHistoryItemOssUrlFields: ke
            };
          }, void 0, import.meta.url);
          d(ke => ke.map(ve => String(ve.id) !== String(xe) ? ve : he === !1 ? {
            ...ve,
            ossUploaded: !1
          } : ve._globalOssUrlOnly ? {
            ...ve,
            ossUploaded: !0
          } : {
            ...ve,
            ossUploaded: !0,
            ..._e(ve)
          }));
        })() : (async () => {
          const {
              loadHistoryFromAllSources: _e,
              filterDeletedHistoryItems: ke,
              persistHistoryToStorage: ve
            } = await Ie(async () => {
              const {
                loadHistoryFromAllSources: me,
                filterDeletedHistoryItems: Ae,
                persistHistoryToStorage: Fe
              } = await Promise.resolve().then(() => Gu);
              return {
                loadHistoryFromAllSources: me,
                filterDeletedHistoryItems: Ae,
                persistHistoryToStorage: Fe
              };
            }, void 0, import.meta.url),
            {
              isTeachingVisible: Te
            } = await Ie(async () => {
              const {
                isTeachingVisible: me
              } = await Promise.resolve().then(() => VIr);
              return {
                isTeachingVisible: me
              };
            }, void 0, import.meta.url),
            Ne = (await _e()).filter(Te);
          d(me => {
            const Ae = new Map();
            for (const Me of me) Ae.set(String(Me.id), Me);
            for (const Me of Ne) {
              const Re = String(Me.id);
              Ae.set(Re, c$a(Ae.get(Re), Me));
            }
            const Fe = Iv(ke([...Ae.values()]));
            return ve(Fe), Fe;
          });
        })();
      };
      return window.addEventListener(iU, ae), () => {
        window.removeEventListener(iU, ae);
      };
    }, [d]);
    const pe = g.useRef(!1);
    g.useEffect(() => {
      if (e) return Q5t();
    }, [e]), g.useEffect(() => {
      if (!e) {
        pe.current = !1;
        return;
      }
      const ae = !pe.current;
      if (pe.current = !0, !ae) return;
      const be = setTimeout(() => {
        r.length === 0 && j();
      }, 100);
      return () => clearTimeout(be);
    }, [e, j, r.length]);
    const ce = g.useRef("");
    g.useEffect(() => {
      if (!e || !I) return;
      const ae = `${P ? "oss" : "local"}`;
      if (ce.current === ae) return;
      if (G1(r).length > 0) {
        ce.current = ae;
        return;
      }
      ce.current = ae;
      const Ee = window.setTimeout(() => {
        j();
      }, 120);
      return () => window.clearTimeout(Ee);
    }, [e, I, P, j, r]);
    const we = g.useMemo(() => {
        const ae = new Set();
        return r.filter(Ee => ae.has(Ee.id) ? (console.warn("[HistoryPanel] Duplicate history item detected:", Ee.id), !1) : (ae.add(Ee.id), !0));
      }, [r]),
      X = g.useMemo(() => Iv(G1(we)), [we, P]),
      Z = g.useMemo(() => {
        const ae = q === "all" ? X : X.filter(be => be.type === q);
        return de.trim() ? ae.filter(be => m$a(be, de)) : ae;
      }, [X, q, de]),
      re = (() => {
        if (Z.length === 0 && X.length > 0) {
          if (de.trim()) return "无匹配的生成历史";
          if (q === "image") return "暂无图片生成历史";
          if (q === "video") return "暂无视频生成历史";
          if (q === "audio") return "暂无音频生成历史";
          if (q === "3d") return "暂无 3D 生成历史";
        }
        return P ? "暂无云端生成历史" : "暂无本地生成历史";
      })(),
      fe = `side-panel-shell sketch-history-panel sketch-history-enter z-40 flex flex-col rounded-2xl overflow-hidden ${n ? "bg-[#121214] border border-zinc-800 shadow-none" : "bg-zinc-50 border border-[rgba(0,0,0,0.18)] shadow-none"}`,
      ye = c.jsxs(c.Fragment, {
        children: [c.jsx("div", {
          className: "p-3 flex justify-end items-center select-none",
          children: c.jsxs("div", {
            className: "flex items-center gap-1.5 min-w-0",
            children: [D > 0 && !Y && c.jsx("span", {
              className: "text-blue-500 animate-pulse flex items-center justify-center p-1.5",
              title: x("正在后台自动上传新生成的历史资源... 剩余 {0} 项", D),
              children: c.jsx(Wp, {
                size: 14,
                className: "animate-bounce"
              })
            }), c.jsx("button", {
              onClick: () => K(!Y),
              className: `p-1.5 rounded transition-colors ${Y ? n ? "text-blue-400 bg-zinc-800" : "text-blue-600 bg-zinc-200" : n ? "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800" : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200"}`,
              title: x("生成历史 OSS 备份设置"),
              children: c.jsx(IP, {
                size: 14
              })
            }), c.jsx("button", {
              type: "button",
              onClick: () => void J(),
              disabled: W,
              className: `p-1.5 rounded transition-colors disabled:opacity-40 ${n ? "text-zinc-400 hover:text-red-400 hover:bg-zinc-800" : "text-zinc-500 hover:text-red-600 hover:bg-zinc-200"}`,
              title: x("删除失败任务"),
              "aria-label": x("删除失败任务"),
              children: W ? c.jsx(Ua, {
                size: 14,
                className: "animate-spin"
              }) : c.jsx(Qo, {
                size: 14
              })
            }), c.jsx("button", {
              onClick: t,
              title: x("关闭"),
              children: c.jsx(Na, {
                size: 12,
                className: n ? "text-zinc-500" : "text-zinc-400"
              })
            })]
          })
        }), c.jsxs("div", {
          className: "px-3 pb-2 shrink-0 space-y-2",
          children: [c.jsx(Ade, {
            options: p$a,
            value: ((ie = Pwt.find(ae => ae.id === q)) == null ? void 0 : ie.label) ?? "全部",
            isDark: n,
            ariaLabel: x("生成历史类型"),
            onChange: ae => {
              const be = Pwt.find(Ee => Ee.label === ae);
              be && ne(be.id);
            }
          }), c.jsxs("div", {
            className: `h-6 rounded-full border px-2 flex items-center gap-1.5 ${n ? "border-zinc-700 bg-zinc-800/80 text-zinc-300" : "border-zinc-300 bg-zinc-100 text-zinc-500"}`,
            children: [c.jsx(mc, {
              size: 11,
              className: "shrink-0 opacity-70"
            }), c.jsx("input", {
              value: de,
              onChange: ae => le(ae.target.value),
              placeholder: x("搜索历史"),
              className: `w-full bg-transparent text-[11px] leading-none outline-none placeholder:opacity-60 ${n ? "text-zinc-200 placeholder:text-zinc-500" : "text-zinc-700 placeholder:text-zinc-400"}`
            })]
          })]
        }), I ? c.jsxs(c.Fragment, {
          children: [Y && c.jsxs("div", {
            className: `px-3.5 py-3 border-b text-xs space-y-3 shrink-0 ${n ? "border-zinc-800 bg-zinc-900/40 text-zinc-300" : "border-zinc-200 bg-zinc-50 text-zinc-700"}`,
            children: [c.jsxs("div", {
              className: "flex items-center justify-between",
              children: [c.jsxs("label", {
                className: "flex items-center gap-2 cursor-pointer font-medium",
                children: [c.jsx("input", {
                  type: "checkbox",
                  checked: B.enabled,
                  onChange: ae => F({
                    enabled: ae.target.checked
                  }),
                  className: "rounded accent-blue-600"
                }), c.jsx(Wp, {
                  size: 14,
                  className: "text-blue-500"
                }), U("生成历史 ")]
              }), D > 0 && c.jsxs("span", {
                className: "text-[10px] text-blue-500 font-medium animate-pulse flex items-center gap-1",
                children: [c.jsx(Ua, {
                  className: "w-3 h-3 animate-spin"
                }), x("后台同步中... ("), D, ")"]
              })]
            }), !V && B.enabled && c.jsxs("div", {
              className: `flex items-start gap-1.5 p-2 rounded text-[10px] ${n ? "bg-amber-950/20 text-amber-400" : "bg-amber-50 text-amber-800"}`,
              children: [c.jsx(c3, {
                size: 12,
                className: "shrink-0 mt-0.5"
              }), c.jsx("p", {
                children: H
              })]
            }), B.enabled && V && c.jsxs("div", {
              className: "pt-1 flex gap-2",
              children: [c.jsx("button", {
                type: "button",
                disabled: N,
                onClick: O,
                className: `flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded text-xs font-medium transition-colors ${n ? "bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50" : "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"}`,
                children: N && G.includes("上传") ? c.jsxs(c.Fragment, {
                  children: [c.jsx(Ua, {
                    size: 13,
                    className: "animate-spin animate-spin-fast"
                  }), c.jsxs("span", {
                    children: [z, "%"]
                  })]
                }) : c.jsx("span", {
                  children: x("备份到云端")
                })
              }), c.jsx("button", {
                type: "button",
                disabled: N,
                onClick: L,
                className: `flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded text-xs font-medium border transition-colors ${n ? "border-zinc-700 hover:bg-zinc-800 text-zinc-200 disabled:opacity-50" : "border-zinc-300 hover:bg-zinc-100 text-zinc-700 disabled:opacity-50"}`,
                children: N && G.includes("拉取") ? c.jsxs(c.Fragment, {
                  children: [c.jsx(Ua, {
                    size: 13,
                    className: "animate-spin animate-spin-fast"
                  }), c.jsxs("span", {
                    children: [z, "%"]
                  })]
                }) : c.jsx("span", {
                  children: x("从云端恢复")
                })
              })]
            }), G && c.jsx("div", {
              className: `text-[10px] px-1.5 py-1 rounded font-mono break-all ${G.includes("失败") ? n ? "bg-red-950/20 text-red-400" : "bg-red-50 text-red-600" : G.includes("成功") ? n ? "bg-green-950/20 text-green-400" : "bg-green-50 text-green-600" : n ? "bg-zinc-800 text-zinc-400" : "bg-zinc-100 text-zinc-600"}`,
              children: G
            })]
          }), M ? c.jsx(_tr, {
            history: Z,
            isDark: n,
            emptyLabel: re,
            mediaLoadEnabled: e,
            thumbnailsRefreshTrigger: T,
            hasMoreHistory: S,
            onLoadMoreHistory: C,
            onSetLightboxItem: h,
            onSetLightboxOpen: p,
            onSetHistory: d,
            onHistoryContextMenu: f,
            onRefreshVideo: y,
            onRefreshAudio: b,
            onRefresh3d: v,
            onRefreshFalImage: _,
            onRefreshMjImage: w,
            onRefreshComfyTask: k,
            onRefreshNanoBanana: A
          }) : c.jsx("div", {
            className: "flex-1"
          })]
        }) : c.jsx("div", {
          className: "flex-1 min-h-0",
          "aria-hidden": !0
        })]
      });
    return c.jsx("div", {
      className: `absolute left-0 top-2 bottom-2 w-[240px] ${fe}`,
      style: {
        display: e ? void 0 : "none",
        pointerEvents: e ? "auto" : "none"
      },
      children: c.jsx("div", {
        className: "flex flex-col flex-1 min-h-0 overflow-hidden rounded-[inherit]",
        children: ye
      })
    });
  },
  g$a = g.memo(Str),
  y$a = Object.freeze(Object.defineProperty({
    __proto__: null,
    HistoryPanel: Str,
    default: g$a
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  nOt = "qiaodoumayi_material_oss_backup",
  Bre = "qiaodoumayi-material-oss-backup-changed",
  Itr = "qiaodoumayi-material-restored",
  gJ = "Material Category Management";

function Xan() {
  return {
    enabled: !1,
    folderName: gJ
  };
}

function $ie() {
  try {
    const e = localStorage.getItem(nOt);
    if (!e) return Xan();
    const t = JSON.parse(e);
    return {
      enabled: !!t.enabled,
      folderName: String(t.folderName ?? gJ).trim() || gJ
    };
  } catch {
    return Xan();
  }
}

function Ctr(e) {
  const t = {
    enabled: !!e.enabled,
    folderName: String(e.folderName ?? gJ).trim() || gJ
  };
  localStorage.setItem(nOt, JSON.stringify(t)), window.dispatchEvent(new CustomEvent(Bre));
}

function rOt(e, t) {
  const n = (t || gJ).trim().replace(/^\/+/, "").replace(/\/+$/, "");
  return n === "" ? "" : `${n}/`;
}

function RQ(e, t) {
  const n = e.replace(/^\/+/, "").replace(/\/+$/, ""),
    r = t.replace(/^\/+/, "").replace(/\\/g, "/");
  return `${n}/assets/${r}`.replace(/\/+/g, "/");
}

function aOt(e) {
  return `${e.replace(/^\/+/, "").replace(/\/+$/, "")}/material_library_manifest.json`.replace(/\/+/g, "/");
}

function Etr(e) {
  if (typeof e == "string" && e.trim()) return e;
  if (e && typeof e == "object") {
    const n = e.message;
    if (n && String(n).trim()) return String(n);
  }
  return String(e ?? "").trim() || "读取云端失败";
}

function iOt() {
  return n9();
}

async function Ttr(e, t) {
  const n = iOt(),
    r = $ie(),
    a = rOt(n, r.folderName),
    i = t ?? lCe();
  if (!i) throw new Error("本地素材库根目录未选择，请先在下方点击“更换”选择素材库");
  e == null || e({
    percent: 5,
    message: "正在扫描本地素材库目录树..."
  });
  const o = await cCe(i);
  if (!o) throw new Error("扫描本地素材库失败，目录可能不存在或已损坏。");
  const s = [],
    l = [],
    d = _ => {
      const w = _.path.substring(i.length).replace(/\\/g, "/").replace(/^\/+/, "");
      w && l.push(w), s.push(..._.assets);
      for (const k of _.children) d(k);
    };
  d(o), e == null || e({
    percent: 15,
    message: `收集完成，共 ${s.length} 个文件，正在创建云端清单...`
  });
  const u = s.map(_ => {
      const w = _.path.substring(i.length).replace(/\\/g, "/").replace(/^\/+/, ""),
        k = RQ(a, w),
        A = DK(n, k);
      return {
        name: _.name,
        relativePath: w,
        size: _.size,
        kind: _.kind,
        ossUrl: A
      };
    }),
    h = aOt(a);
  let p = [];
  try {
    const _ = await Hp(h, n),
      w = new TextDecoder().decode(_),
      k = JSON.parse(w);
    k != null && k.assets && (p = k.assets, console.log("[materialOssBackup] 读取到云端现有清单，包含", p.length, "个文件"));
  } catch {}
  const m = new Map();
  for (const _ of u) m.set(_.relativePath, _);
  for (const _ of p) m.has(_.relativePath) || (m.set(_.relativePath, _), console.log("[materialOssBackup] 合并云端多余文件到清单:", _.relativePath));
  const f = {
      version: 1,
      assets: Array.from(m.values()),
      folders: l
    },
    y = new TextEncoder().encode(JSON.stringify(f, null, 2));
  e == null || e({
    percent: 20,
    message: `正在上传完整清单（合并后共 ${f.assets.length} 个文件）到 OSS...`
  }), await Pv(h, y, "application/json", n);
  const b = 78;
  for (let _ = 0; _ < s.length; _++) {
    const w = s[_],
      k = w.path.substring(i.length).replace(/\\/g, "/").replace(/^\/+/, ""),
      A = RQ(a, k),
      S = 20 + Math.round((_ + 1) / s.length * b);
    e == null || e({
      percent: Math.min(98, S),
      message: `上传文件 ${_ + 1}/${s.length}: ${k}`
    });
    try {
      const C = await Au(w.path),
        I = C instanceof Uint8Array ? C : new Uint8Array(C);
      await Pv(A, I, "application/octet-stream", n), YIt(w.path, DK(n, A));
    } catch (C) {
      console.warn(`[materialOssBackup] 备份单个素材失败: ${k}, 错误:`, C);
    }
  }
  const v = {};
  for (const _ of f.assets) {
    const w = await Vu(i, _.relativePath),
      k = _.ossUrl || DK(n, RQ(a, _.relativePath));
    v[w] = k;
  }
  XIt(v), e == null || e({
    percent: 100,
    message: "素材库文件备份完成"
  });
}

async function Mtr(e, t) {
  const n = iOt(),
    r = $ie(),
    a = rOt(n, r.folderName),
    i = t ?? lCe();
  if (!i) throw new Error("本地素材库根目录未选择，请先在下方点击“更换”选择素材库");
  e == null || e({
    percent: 5,
    message: "正在从 OSS 云端获取素材清单..."
  });
  const o = aOt(a);
  let s;
  try {
    s = await Hp(o, n);
  } catch (A) {
    throw new Error(`获取素材清单失败，云端可能没有备份记录：${Etr(A)}`);
  }
  const l = new TextDecoder().decode(s);
  let d;
  try {
    if (d = JSON.parse(l), !d || !Array.isArray(d.assets) || !Array.isArray(d.folders)) throw new Error("素材清单数据结构非法");
  } catch (A) {
    throw new Error("解析素材清单失败：" + (A instanceof Error ? A.message : String(A)));
  }
  e == null || e({
    percent: 10,
    message: "正在在本地重建分类文件夹..."
  });
  for (const A of d.folders) {
    const S = await Vu(i, A);
    try {
      await qc(S, {
        recursive: !0
      });
    } catch (C) {
      console.warn(`[materialOssBackup] 创建分类目录失败: ${A}, 错误:`, C);
    }
  }
  e == null || e({
    percent: 15,
    message: "正在扫描本地文件以避开已有的重复文件..."
  });
  const u = 60;
  let h = 0,
    p = 0;
  const m = new Set();
  for (let A = 0; A < d.assets.length; A++) {
    const S = d.assets[A];
    m.add(S.relativePath);
    const C = await Vu(i, S.relativePath),
      I = RQ(a, S.relativePath),
      E = 15 + Math.round((A + 1) / d.assets.length * u);
    e == null || e({
      percent: Math.min(74, E),
      message: `核对/下载 ${A + 1}/${d.assets.length}: ${S.relativePath}`
    });
    let M = !0;
    try {
      const P = await oY(C);
      typeof P.size == "number" && P.size === S.size && (M = !1, p += 1);
    } catch {}
    const T = S.ossUrl || DK(n, I);
    if (YIt(C, T), M) try {
      const P = await Hp(I, n),
        R = C.replace(/\\/g, "/").lastIndexOf("/");
      if (R > 0) {
        const j = C.substring(0, R);
        await qc(j, {
          recursive: !0
        });
      }
      await wE(C, P), h += 1;
    } catch (P) {
      console.warn(`[materialOssBackup] 恢复单个素材失败: ${S.relativePath}, 错误:`, P);
    }
  }
  const f = {};
  for (const A of d.assets) {
    const S = await Vu(i, A.relativePath),
      C = RQ(a, A.relativePath);
    f[S] = A.ossUrl || DK(n, C);
  }
  XIt(f), console.log("[materialOssBackup] 由于 OSS List API 不可用，使用 manifest 清单进行同步"), console.log("[materialOssBackup] 云端文件数量(manifest):", m.size), console.log("[materialOssBackup] 云端文件列表(manifest):", [...m]);
  const y = ["角色/history-7677254-86-sxwufctwp-1779203895492.png"];
  for (const A of y) m.add(A);
  const b = await cCe(i),
    v = new Set(),
    _ = A => {
      for (const S of A.assets) {
        const C = i.replace(/\\/g, "/").replace(/\/+$/, "");
        let E = S.path.replace(/\\/g, "/").substring(C.length).replace(/^\/+/, "");
        v.add(E);
      }
      for (const S of A.children) _(S);
    };
  b && _(b), console.log("[materialOssBackup] 本地文件数量:", v.size), console.log("[materialOssBackup] 本地文件列表:", [...v]);
  let w = 0,
    k = [];
  for (const A of m) {
    const S = A.replace(/\\/g, "/");
    v.has(S) || k.push(S);
  }
  console.log("[materialOssBackup] 准备删除的云端文件:", k);
  for (const A of k) {
    console.log(`[materialOssBackup] 发现云端多余文件，准备删除: ${A}`);
    const S = RQ(a, A);
    try {
      await aU(S, n), w += 1, console.log(`[materialOssBackup] 已删除云端多余文件: ${A}`);
    } catch (C) {
      console.warn(`[materialOssBackup] 删除云端文件失败: ${A}, 错误:`, C);
    }
  }
  console.log(`[materialOssBackup] 同步删除完成，共删除 ${w} 个文件`), window.dispatchEvent(new CustomEvent(Itr)), e == null || e({
    percent: 100,
    message: `同步完成！新增/覆盖下载 ${h} 个，跳过已有 ${p} 个，删除云端多余 ${w} 个。`
  });
}

const b$a = Object.freeze(Object.defineProperty({
    __proto__: null,
    DEFAULT_MATERIAL_OSS_FOLDER_NAME: gJ,
    MATERIAL_OSS_BACKUP_CHANGED_EVENT: Bre,
    MATERIAL_OSS_BACKUP_STORAGE_KEY: nOt,
    MATERIAL_OSS_RESTORED_EVENT: Itr,
    assertMaterialOssCredentialsReady: iOt,
    buildMaterialManifestObjectKey: aOt,
    buildMaterialOssObjectKey: RQ,
    buildMaterialOssRootPrefix: rOt,
    downloadMaterialFromOss: Mtr,
    formatMaterialOssInvokeError: Etr,
    loadMaterialOssBackupSettings: $ie,
    saveMaterialOssBackupSettings: Ctr,
    uploadMaterialToOss: Ttr
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  Eit = () => ({
    percent: 0,
    message: "",
    kind: null
  });

function v$a() {
  const [e, t] = g.useState(() => $ie()),
    [n, r] = g.useState(!1),
    [a, i] = g.useState(""),
    [o, s] = g.useState(Eit),
    [l, d] = g.useState(() => H2());
  g.useEffect(() => {
    const y = () => d(H2());
    return y(), window.addEventListener(Bre, y), window.addEventListener(go, y), () => {
      window.removeEventListener(Bre, y), window.removeEventListener(go, y);
    };
  }, []);
  const u = l && e.enabled,
    h = g.useCallback(() => {
      t($ie());
    }, []);
  g.useEffect(() => (window.addEventListener(Bre, h), window.addEventListener(go, h), () => {
    window.removeEventListener(Bre, h), window.removeEventListener(go, h);
  }), [h]);
  const p = g.useCallback(y => {
      const b = {
        ...$ie(),
        ...y
      };
      Ctr(b), t(b);
    }, []),
    m = g.useCallback(async y => {
      r(!0), s({
        percent: 0,
        message: "准备备份素材库...",
        kind: "upload"
      }), i("");
      try {
        await Ttr(b => {
          s({
            percent: b.percent,
            message: b.message,
            kind: "upload"
          }), i(b.message);
        }, y), i("备份成功");
      } catch (b) {
        const v = b instanceof Error ? b.message : String(b);
        throw i(`备份失败: ${v}`), b;
      } finally {
        r(!1), setTimeout(() => s(Eit()), 1500);
      }
    }, []),
    f = g.useCallback(async y => {
      r(!0), s({
        percent: 0,
        message: "准备从云端恢复素材库...",
        kind: "download"
      }), i("");
      try {
        await Mtr(b => {
          s({
            percent: b.percent,
            message: b.message,
            kind: "download"
          }), i(b.message);
        }, y), i("恢复成功");
      } catch (b) {
        const v = b instanceof Error ? b.message : String(b);
        throw i(`恢复失败: ${v}`), b;
      } finally {
        r(!1), setTimeout(() => s(Eit()), 1500);
      }
    }, []);
  return {
    settings: e,
    updateSettings: p,
    ossBusy: n,
    ossMessage: a,
    ossProgress: o,
    ossAvailable: u,
    uploadToCloud: m,
    downloadFromCloud: f
  };
}

const w$a = 12,
  x$a = () => ({
    drillPath: null,
    previewAsset: null
  });

function _$a(e, t) {
  switch (t.type) {
    case "openFolder":
      return {
        drillPath: t.path,
        previewAsset: null
      };
    case "goToPath":
      return {
        drillPath: t.path,
        previewAsset: null
      };
    case "backToParent":
      return {
        drillPath: t.parentPath,
        previewAsset: null
      };
    case "backToFolders":
      return {
        drillPath: null,
        previewAsset: null
      };
    case "selectAsset":
      return {
        ...e,
        previewAsset: t.asset
      };
    case "closePreview":
      return {
        ...e,
        previewAsset: null
      };
    default:
      return e;
  }
}

function k$a(e, t) {
  switch (e.type) {
    case "openFolder":
      t.selectFolder(e.path);
      break;
    case "goToPath":
      t.selectFolder(e.path);
      break;
    case "backToParent":
      t.selectFolder(e.parentPath);
      break;
    case "backToFolders":
      t.selectFolder(null);
      break;
  }
}

function A$a(e) {
  return e.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
}

function Ptr(e, t) {
  if (t.length === 0) return !0;
  const n = e.name.toLocaleLowerCase();
  return t.every(r => n.includes(r));
}

function S$a(e, t) {
  if (t.length === 0) return !0;
  const n = e.name.toLocaleLowerCase();
  return t.every(r => n.includes(r));
}

function Oze(e, t, n) {
  const r = a => Ptr(a, t) && (n === "all" || a.kind === n);
  return e.assets.some(r) || t.length > 0 && S$a(e, t) ? !0 : e.children.some(a => Oze(a, t, n));
}

function Rwt(e) {
  const t = e.trim().toLowerCase();
  return t === "收藏" || t === "favorites";
}

function I$a(e, t) {
  if (!t || t === e.path) return {
    folder: e,
    parent: null
  };
  const n = (r, a) => {
    if (r.path === t) return {
      folder: r,
      parent: a
    };
    for (const i of r.children) {
      const o = n(i, r);
      if (o) return o;
    }
    return null;
  };
  return n(e, null) ?? {
    folder: e,
    parent: null
  };
}

function C$a(e, t) {
  const n = [],
    r = a => {
      if (a.path === t) return a.path !== e.path && n.push({
        name: a.name,
        path: a.path
      }), !0;
      for (const i of a.children) if (r(i)) return a.path !== e.path && n.unshift({
        name: a.name,
        path: a.path
      }), !0;
      return !1;
    };
  return r(e), n;
}

function Tit(e) {
  const t = [],
    n = r => {
      for (const a of r.assets) t.push({
        asset: a,
        parentPath: r.path
      });
      for (const a of r.children) n(a);
    };
  return n(e), t;
}

function E$a(e, t, n) {
  const r = new Set(),
    a = [];
  for (const i of e.assets) r.add(i.path), a.push({
    asset: i,
    parentPath: e.path
  });
  for (const i of n) !t.has(i.asset.path) || r.has(i.asset.path) || (r.add(i.asset.path), a.push(i));
  return a;
}

function Rtr(e, t, n) {
  const r = [];
  for (const a of e) Oze(a, t, n) ? r.push(a) : r.push(...Rtr(a.children, t, n));
  return r;
}

function T$a(e) {
  const {
      tree: t,
      drillPath: n,
      searchTerms: r,
      kindFilter: a,
      favoritePaths: i
    } = e,
    o = r.length > 0,
    s = I$a(t, n),
    l = s.folder,
    d = l.path !== t.path,
    u = s.parent,
    h = d ? C$a(t, l.path) : [],
    p = f => Ptr(f, r) && (a === "all" || f.kind === a);
  if (o) return {
    isDrillDown: d,
    isSearching: o,
    currentFolder: l,
    parentFolder: u,
    crumbs: h,
    folders: Rtr(t.children, r, a),
    assets: Tit(t).filter(({
      asset: f
    }) => p(f))
  };
  if (!d) {
    const f = a === "all" ? t.children : t.children.filter(y => Oze(y, [], a) ? !0 : !Rwt(y.name) || i.size === 0 ? !1 : Tit(t).some(({
      asset: b
    }) => i.has(b.path) && b.kind === a));
    return {
      isDrillDown: d,
      isSearching: o,
      currentFolder: t,
      parentFolder: null,
      crumbs: h,
      folders: f,
      assets: t.assets.filter(p).map(y => ({
        asset: y,
        parentPath: t.path
      }))
    };
  }
  let m = l.assets.map(f => ({
    asset: f,
    parentPath: l.path
  }));
  return Rwt(l.name) && (m = E$a(l, i, Tit(t))), {
    isDrillDown: d,
    isSearching: o,
    currentFolder: l,
    parentFolder: u,
    crumbs: h,
    folders: a === "all" ? l.children : l.children.filter(f => Oze(f, [], a)),
    assets: m.filter(({
      asset: f
    }) => p(f))
  };
}

function bte(e, t, n, r = !1) {
  const a = l => l.replace(/\\/g, "/").replace(/\/$/, "").toLowerCase(),
    i = a(t);
  let o = !1;
  const s = new Set();
  for (const l of e) {
    const d = a(l);
    d === i || r && d.startsWith(`${i}/`) ? (o = !0, n && s.add(n.replace(/[/\\]$/, "") + l.slice(i.length))) : s.add(l);
  }
  return o ? s : e;
}

async function M$a(e, t) {
  const n = await t(e);
  if (!n) return !1;
  const r = document.createElement("a");
  return r.href = n, r.download = e.name, r.rel = "noopener", document.body.appendChild(r), r.click(), r.remove(), !0;
}

function P$a(e) {
  if (e == null || !Number.isFinite(e) || e <= 0) return "未知";
  const t = Math.floor(e),
    n = Math.floor(t / 3600),
    r = Math.floor(t % 3600 / 60),
    a = t % 60;
  return n > 0 ? `${n}:${String(r).padStart(2, "0")}:${String(a).padStart(2, "0")}` : `${r}:${String(a).padStart(2, "0")}`;
}

const oOt = new Set();

function ij(e) {
  e.startsWith("blob:") && oOt.add(e);
}

function R$a(e) {
  oOt.delete(e);
}

function N$a(e) {
  return oOt.has(e);
}

function Ntr(e) {
  return /^https?:\/\//i.test(String(e || "").trim());
}

async function jtr(e, t) {
  const n = String(t || "").trim();
  if (!n) return !0;
  const r = await gCe(e);
  return !!(r && Ntr(n) || !r && n.startsWith("blob:"));
}

async function gCe(e) {
  const t = String(e || "").trim();
  if (!t) return !1;
  try {
    return await Fp(t);
  } catch {
    return !1;
  }
}

const i7e = 256,
  Dtr = .72;

async function j$a(e) {
  const n = await (await fetch(e)).blob();
  return URL.createObjectURL(n);
}

async function Ltr(e) {
  const t = await Wd.getImageDimensions(e);
  if (t.width > 0 && t.height > 0 && t.width <= i7e && t.height <= i7e) return ij(e), e;
  const n = await Wd.generateThumbnail(e, i7e, Dtr);
  if (!n || n === e) return ij(e), e;
  let r;
  try {
    r = await j$a(n);
  } catch {
    r = n;
  }
  if (e.startsWith("blob:") && r !== e) try {
    URL.revokeObjectURL(e);
  } catch {}
  return r.startsWith("blob:") && ij(r), r;
}

async function Otr(e) {
  if (!(await gCe(e.path))) return null;
  let t;
  try {
    t = await lD(e);
  } catch {
    return null;
  }
  try {
    return await Ltr(t);
  } catch {
    return ij(t), t;
  }
}

async function sOt(e) {
  if (!(await gCe(e.path))) return null;
  let t;
  try {
    t = await lD(e);
  } catch {
    return null;
  }
  try {
    const n = await Wd.getImageDimensions(t);
    return n.width > 0 && n.height > 0 ? {
      w: n.width,
      h: n.height
    } : null;
  } finally {
    if (t.startsWith("blob:")) try {
      URL.revokeObjectURL(t);
    } catch {}
  }
}

const Btr = Object.freeze(Object.defineProperty({
  __proto__: null,
  MATERIAL_LIBRARY_CANVAS_DISPLAY_MAX_PX: i7e,
  MATERIAL_LIBRARY_CANVAS_DISPLAY_QUALITY: Dtr,
  createMaterialImageDisplayBlobUrl: Otr,
  downscaleBlobUrlForCanvasDisplay: Ltr,
  isRemoteMaterialPreviewUrl: Ntr,
  materialAssetExistsOnDisk: gCe,
  readMaterialImageNaturalDimensions: sOt,
  shouldInvalidateMaterialPreviewCache: jtr
}, Symbol.toStringTag, {
  value: "Module"
}));

function Ftr(e, t, n, r, a) {
  const [i, o] = g.useState(null),
    [s, l] = g.useState("loading"),
    [d, u] = g.useState(0),
    h = g.useRef(!1);
  return g.useEffect(() => {
    let m = !1;
    if (o(null), l("loading"), h.current = !1, !(!t || e.kind === "file")) return Promise.resolve().then(() => n(e)).catch(() => null).then(f => {
      if (m) return;
      const y = f ? null : r == null ? void 0 : r(e.path);
      h.current = !!y, o(f || y || null), !f && !y && l("error");
    }), () => {
      m = !0;
    };
  }, [e.path, e.kind, t, n, r, d]), {
    url: i,
    state: s,
    onError: () => {
      const m = r == null ? void 0 : r(e.path);
      !h.current && m && m !== i ? (h.current = !0, l("loading"), o(m)) : (o(null), l("error"));
    },
    onLoad: () => l("ready"),
    retry: () => {
      a == null || a(e.path), u(m => m + 1);
    }
  };
}

const D$a = ({
    asset: e,
    isDark: t,
    getPreviewUrl: n,
    getPreviewFallbackUrl: r,
    onInvalidateAssetPreview: a,
    onClose: i,
    onApplyToCanvas: o,
    onPrevious: s,
    onNext: l,
    position: d,
    favorited: u,
    onToggleFavorite: h,
    onDownload: p
  }) => {
    on();
    const m = Ftr(e, !0, n, r, a),
      [f, y] = g.useState(null),
      [b, v] = g.useState(null),
      [_, w] = g.useState(null),
      k = g.useRef(!1),
      A = g.useRef(null),
      S = g.useRef(null);
    g.useEffect(() => {
      var M;
      const E = document.activeElement;
      return (M = S.current) == null || M.focus(), () => {
        E instanceof HTMLElement && E.isConnected && E.focus({
          preventScroll: !0
        });
      };
    }, []), g.useEffect(() => {
      let E = !1;
      return y(null), v(null), e.kind === "image" && sOt(e).then(M => {
        !E && M && y(M);
      }).catch(() => {}), () => {
        E = !0;
      };
    }, [e.path, e.kind]);
    const C = async (E, M) => {
        if (!(!M || k.current)) {
          k.current = !0, w(E);
          try {
            await M(e);
          } catch (T) {
            qi(T instanceof Error ? T.message : "操作失败，请重试");
          } finally {
            k.current = !1, w(null);
          }
        }
      },
      I = !!o && e.kind !== "file";
    return c.jsxs("div", {
      ref: A,
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "素材预览：" + e.name,
      className: "absolute inset-x-2 bottom-12 top-12 z-50 flex flex-col overflow-hidden rounded-2xl border shadow-xl " + (t ? "border-white/10 bg-[#1a1a1a] text-zinc-100" : "border-zinc-200 bg-white text-zinc-900"),
      onMouseDown: E => E.stopPropagation(),
      onKeyDown: E => {
        var M;
        if (E.stopPropagation(), E.key === "Escape" && (E.preventDefault(), i()), E.key === "ArrowLeft" && E.target.tagName !== "VIDEO" && E.target.tagName !== "AUDIO" && (E.preventDefault(), s == null || s()), E.key === "ArrowRight" && E.target.tagName !== "VIDEO" && E.target.tagName !== "AUDIO" && (E.preventDefault(), l == null || l()), E.key === "Tab") {
          const T = Array.from(((M = A.current) == null ? void 0 : M.querySelectorAll("button:not(:disabled), audio[controls], video[controls]")) ?? []),
            P = T[0],
            R = T[T.length - 1];
          E.shiftKey && document.activeElement === P ? (E.preventDefault(), R == null || R.focus()) : !E.shiftKey && document.activeElement === R && (E.preventDefault(), P == null || P.focus());
        }
      },
      children: [c.jsxs("div", {
        className: "flex h-11 shrink-0 items-center justify-between px-3",
        children: [c.jsx("span", {
          className: "text-xs opacity-60",
          children: x("素材预览")
        }), c.jsxs("div", {
          className: "flex items-center gap-2",
          children: [c.jsx("button", {
            type: "button",
            title: x("上一个素材"),
            "aria-label": x("上一个素材"),
            disabled: !s,
            onClick: s,
            className: "rounded-full p-1 disabled:opacity-20",
            children: c.jsx(Mf, {
              size: 16
            })
          }), c.jsx("span", {
            className: "text-[11px] tabular-nums opacity-60",
            children: d
          }), c.jsx("button", {
            type: "button",
            title: x("下一个素材"),
            "aria-label": x("下一个素材"),
            disabled: !l,
            onClick: l,
            className: "rounded-full p-1 disabled:opacity-20",
            children: c.jsx(ss, {
              size: 16
            })
          }), c.jsx("button", {
            ref: S,
            type: "button",
            "aria-label": x("关闭预览"),
            className: "ml-1 rounded-full p-1.5 hover:bg-zinc-500/20",
            onClick: i,
            children: c.jsx(Na, {
              size: 15
            })
          })]
        })]
      }), c.jsxs("div", {
        className: "relative flex min-h-0 flex-1 items-center justify-center " + (t ? "bg-black/30" : "bg-zinc-100"),
        children: [m.url && e.kind === "image" && c.jsx("img", {
          src: m.url,
          alt: e.name,
          className: "h-full w-full object-contain",
          onLoad: E => {
            m.onLoad();
            const M = E.currentTarget;
            y(T => T ?? {
              w: M.naturalWidth,
              h: M.naturalHeight
            });
          },
          onError: m.onError
        }, m.url), m.url && e.kind === "video" && c.jsx("video", {
          src: m.url,
          className: "h-full w-full object-contain",
          controls: !0,
          playsInline: !0,
          preload: "metadata",
          onLoadedMetadata: E => {
            m.onLoad(), y({
              w: E.currentTarget.videoWidth,
              h: E.currentTarget.videoHeight
            }), v(E.currentTarget.duration);
          },
          onError: m.onError
        }, m.url), e.kind === "audio" && c.jsxs("div", {
          className: "flex w-full flex-col items-center gap-6 px-4",
          children: [c.jsx(dEt, {
            size: 52,
            className: "opacity-30"
          }), m.url && c.jsx("audio", {
            src: m.url,
            controls: !0,
            preload: "metadata",
            className: "w-full",
            onLoadedMetadata: E => {
              m.onLoad(), v(E.currentTarget.duration);
            },
            onError: m.onError
          }, m.url)]
        }), e.kind === "file" && c.jsxs("div", {
          className: "text-center text-xs opacity-60",
          children: [c.jsx(lo, {
            className: "mx-auto mb-3",
            size: 40
          }), x("此文件暂不支持预览，可下载后查看")]
        }), e.kind !== "file" && m.state === "loading" && c.jsxs("div", {
          role: "status",
          className: "pointer-events-none absolute inset-0 flex items-center justify-center",
          children: [c.jsx(Ua, {
            size: 24,
            className: "animate-spin text-zinc-400"
          }), c.jsx("span", {
            className: "sr-only",
            children: x("加载预览中")
          })]
        }), m.state === "error" && c.jsxs("div", {
          role: "alert",
          className: "absolute inset-0 flex flex-col items-center justify-center gap-3 text-xs",
          children: [c.jsx("span", {
            className: "opacity-60",
            children: x("暂时无法读取素材")
          }), c.jsx("button", {
            type: "button",
            className: "rounded-full border border-zinc-500/30 px-4 py-1.5",
            onClick: m.retry,
            children: x("重新加载")
          })]
        })]
      }), c.jsxs("div", {
        className: "shrink-0 space-y-3 p-3",
        children: [c.jsxs("div", {
          className: "flex items-center gap-2",
          children: [c.jsx("div", {
            title: e.name,
            className: "min-w-0 flex-1 truncate text-sm font-semibold",
            children: e.name
          }), h && c.jsx("button", {
            type: "button",
            title: x(u ? "取消收藏" : "收藏"),
            "aria-label": x(u ? "取消收藏" : "收藏"),
            "aria-pressed": u,
            className: "rounded-full p-1.5 hover:bg-zinc-500/20",
            onClick: () => h(e),
            children: c.jsx(CP, {
              size: 16,
              fill: u ? "currentColor" : "none",
              className: u ? "text-[#FBBC05]" : "opacity-60"
            })
          }), p && c.jsx("button", {
            type: "button",
            "aria-label": x("下载素材"),
            title: x("下载素材"),
            disabled: !!_,
            "aria-busy": _ === "download",
            className: "rounded-full p-1.5 hover:bg-zinc-500/20 disabled:cursor-wait",
            onClick: () => void C("download", p),
            children: _ === "download" ? c.jsx(Ua, {
              size: 16,
              className: "animate-spin"
            }) : c.jsx(ws, {
              size: 16
            })
          })]
        }), c.jsxs("div", {
          className: "flex flex-wrap gap-x-3 gap-y-1 text-[11px] opacity-50",
          children: [e.kind !== "audio" && e.kind !== "file" && c.jsx("span", {
            children: f ? f.w + " × " + f.h : x("分辨率未知")
          }), (e.kind === "video" || e.kind === "audio") && c.jsxs("span", {
            children: [x("时长 "), P$a(b)]
          }), e.size != null && c.jsxs("span", {
            children: [(e.size / 1024 / 1024).toFixed(2), " MB"]
          })]
        }), I && c.jsx("button", {
          type: "button",
          disabled: !!_,
          "aria-busy": _ === "apply",
          className: "flex h-9 w-full items-center justify-center rounded-full bg-[#ededed] text-xs font-semibold text-zinc-900 transition-colors hover:bg-white active:bg-zinc-300 disabled:cursor-wait disabled:opacity-60",
          onClick: () => void C("apply", o),
          children: _ === "apply" ? c.jsxs(c.Fragment, {
            children: [c.jsx(Ua, {
              size: 14,
              className: "mr-1.5 animate-spin"
            }), x("正在应用")]
          }) : x("应用到画布")
        })]
      })]
    });
  },
  L$a = (e, t, n, r, a, i, o) => {
    e.dataTransfer.effectAllowed = "copyMove", e.dataTransfer.setData("application/x-material-library-asset", "1");
    const s = JSON.stringify({
      type: "material-library-asset",
      assetPath: t.path,
      assetName: t.name,
      parentPath: n
    });
    e.dataTransfer.setData("application/json", s), e.dataTransfer.setData("text/plain", s), e.currentTarget.addEventListener("dragend", i, {
      once: !0
    });
    const l = 84,
      d = 84,
      u = document.createElement("div");
    u.dataset.mtlDragGhost = "1", u.style.cssText = ["position:fixed", "left:-99999px", "top:0", `width:${l}px`, `height:${d}px`, "padding:6px", "box-sizing:border-box", a ? "background:rgba(24,24,27,0.96)" : "background:rgba(255,255,255,0.98)", "border-radius:14px", "box-shadow:0 14px 36px rgba(0,0,0,0.32)", "pointer-events:none", "z-index:2147483646"].join(";"), o.current = u, document.body.appendChild(u);
    const h = Math.floor(l / 2),
      p = Math.floor(d / 2),
      m = () => {
        try {
          e.dataTransfer.setDragImage(u, h, p);
        } catch {}
      };
    if (r && (t.kind === "image" || t.kind === "video")) {
      const f = document.createElement("img");
      f.alt = "", f.draggable = !1, f.src = r, f.style.cssText = "width:72px;height:72px;object-fit:cover;border-radius:10px;display:block;", u.appendChild(f), f.complete && f.naturalWidth > 0 ? (m(), requestAnimationFrame(m)) : (f.onload = () => {
        m(), requestAnimationFrame(m);
      }, f.onerror = () => {
        u.textContent = t.kind === "video" ? "视频" : "图片", u.style.display = "flex", u.style.alignItems = "center", u.style.justifyContent = "center", u.style.fontSize = "13px", u.style.color = a ? "#a1a1aa" : "#52525b", m();
      }, m());
      return;
    }
    u.style.display = "flex", u.style.alignItems = "center", u.style.justifyContent = "center", u.style.fontSize = "11px", u.style.lineHeight = "1.25", u.style.textAlign = "center", u.style.color = a ? "#e4e4e7" : "#27272a", u.style.padding = "8px", u.textContent = t.name.length > 20 ? `${t.name.slice(0, 18)}…` : t.name, m(), requestAnimationFrame(m);
  },
  O$a = g.memo(function ({
    asset: t,
    parentPath: n,
    isDark: r,
    highlight: a,
    favorited: i,
    renameRequestPath: o,
    onRenameRequestConsumed: s,
    getPreviewUrl: l,
    getPreviewFallbackUrl: d,
    onInvalidateAssetPreview: u,
    onRenameAsset: h,
    onOpenAsset: p,
    onToggleFavorite: m,
    onApplyToCanvas: f,
    onDownload: y,
    onOpenAssetMenu: b,
    shouldLoadMedia: v = !0,
    scrollRootRef: _
  }) {
    on();
    const w = g.useRef(null),
      k = g.useRef(null),
      [A, S] = g.useState(!1),
      [C, I] = g.useState(!1),
      [E, M] = g.useState(t.name.replace(/\.[^/.]+$/, "")),
      [T, P] = g.useState(!1),
      R = v && A,
      j = Ftr(t, R && t.kind !== "audio", l, d, u),
      B = j.url,
      F = g.useRef(!1),
      N = g.useRef(!1),
      [G, z] = g.useState(!1);
    g.useEffect(() => {
      if (!v) {
        S(!1);
        return;
      }
      const D = w.current;
      if (!D) return;
      const U = new IntersectionObserver(H => S(H.some(Y => Y.isIntersecting)), {
        root: (_ == null ? void 0 : _.current) ?? null,
        rootMargin: "80px 0px",
        threshold: .01
      });
      return U.observe(D), () => U.disconnect();
    }, [v, _, t.path]);
    const V = g.useCallback(() => {
      var D;
      (D = k.current) == null || D.remove(), k.current = null;
    }, []);
    g.useEffect(() => V, [V]), g.useEffect(() => {
      o === t.path && (F.current = !0, I(!0), s());
    }, [t.path, s, o]), g.useEffect(() => {
      C || M(t.name.replace(/\.[^/.]+$/, ""));
    }, [t.name, C]);
    const O = async () => {
        var K;
        if (!F.current) return;
        F.current = !1;
        const D = E.trim();
        if (I(!1), !D) return;
        const U = /\.[^./\\]+$/.test(D),
          H = ((K = t.name.match(/(\.[^./\\]+)$/)) == null ? void 0 : K[1]) || "",
          Y = U ? D : `${D}${H}`;
        if (Y !== t.name) try {
          await h(t.path, n, Y);
        } catch (W) {
          qi(W instanceof Error ? W.message : "重命名失败");
        }
      },
      L = !!f && (t.kind === "image" || t.kind === "video" || t.kind === "audio");
    return c.jsxs("div", {
      ref: w,
      role: "group",
      "aria-label": t.name,
      "data-material-asset-path": t.path,
      "data-highlighted": a || void 0,
      draggable: !C,
      onDragStart: D => L$a(D, t, n, B, r, V, k),
      onDragEnd: V,
      onContextMenu: D => b(t, n, D),
      className: "material-library-card group/item min-w-0",
      children: [c.jsxs("div", {
        className: `material-library-card-thumbnail relative isolate overflow-hidden rounded-xl border transition-colors duration-200 ${a ? r ? "border-white/40 bg-white/[0.08]" : "border-zinc-500 bg-zinc-200" : r ? "border-white/[0.08] bg-white/[0.04] hover:border-white/25" : "border-zinc-200 bg-zinc-100 hover:border-zinc-400"}`,
        children: [t.kind === "video" && B ? c.jsxs(c.Fragment, {
          children: [c.jsx("video", {
            src: B,
            className: "material-library-card-media h-full w-full object-contain",
            muted: !0,
            playsInline: !0,
            preload: "metadata",
            draggable: !1,
            onLoadedData: j.onLoad,
            onError: j.onError
          }), c.jsx("div", {
            className: "pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25",
            "aria-hidden": !0,
            children: c.jsx(Ol, {
              size: 18,
              className: "text-white drop-shadow",
              fill: "currentColor"
            })
          })]
        }) : t.kind === "image" && B ? c.jsx("img", {
          src: B,
          alt: "",
          className: "material-library-card-media h-full w-full object-contain",
          loading: "lazy",
          draggable: !1,
          onLoad: j.onLoad,
          onError: j.onError
        }) : c.jsx("div", {
          className: "flex h-full w-full items-center justify-center",
          children: t.kind === "audio" ? c.jsx(dEt, {
            size: 28,
            className: r ? "text-white/35" : "text-zinc-400"
          }) : t.kind === "video" ? c.jsx(JEn, {
            size: 28,
            className: r ? "text-white/35" : "text-zinc-400"
          }) : c.jsx("span", {
            className: r ? "text-white/25" : "text-zinc-300",
            children: "◼"
          })
        }), c.jsx("button", {
          type: "button",
          className: "absolute inset-0 rounded-xl",
          "aria-label": x("预览 {0}", t.name),
          onClick: () => p(t)
        }), R && (t.kind === "image" || t.kind === "video") && j.state === "loading" && c.jsx("div", {
          role: "status",
          "aria-label": x("正在加载缩略图"),
          className: "pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10",
          children: c.jsx(Ua, {
            size: 18,
            className: "animate-spin text-zinc-400"
          })
        }), j.state === "error" && c.jsxs("button", {
          type: "button",
          title: x("重新加载缩略图"),
          onClick: j.retry,
          className: "absolute inset-x-1 bottom-2 flex items-center justify-center gap-1 rounded-lg bg-black/60 py-1 text-[10px] text-white",
          children: [c.jsx(bd, {
            size: 11
          }), x(" 加载失败，重试")]
        }), i && c.jsx(CP, {
          size: 12,
          fill: "currentColor",
          className: "pointer-events-none absolute bottom-2 right-2 text-[#FBBC05] drop-shadow"
        })]
      }), c.jsxs("div", {
        className: "material-library-actions absolute left-1 top-1 z-[2] flex items-center rounded-[10px] bg-black/60 p-0.5",
        onDragStart: D => {
          D.preventDefault(), D.stopPropagation();
        },
        children: [c.jsx("button", {
          type: "button",
          title: x(i ? "取消收藏" : "收藏"),
          "aria-label": x(i ? "取消收藏" : "收藏"),
          "aria-pressed": i,
          className: `flex h-6 w-6 items-center justify-center rounded-md ${i ? "text-[#FBBC05]" : "text-white/85 hover:text-white"}`,
          onClick: D => {
            D.stopPropagation(), m(t);
          },
          children: c.jsx(CP, {
            size: 13,
            fill: i ? "currentColor" : "none"
          })
        }), L && c.jsx("button", {
          type: "button",
          title: x("应用到画布"),
          disabled: T,
          "aria-label": x("应用到画布"),
          "aria-busy": T,
          className: "flex h-6 w-6 items-center justify-center rounded-md text-white/85 hover:text-white disabled:opacity-60",
          onClick: async D => {
            if (D.stopPropagation(), !(!f || N.current)) {
              N.current = !0, P(!0);
              try {
                await f(t);
              } catch (U) {
                qi(U instanceof Error ? U.message : "应用失败");
              } finally {
                N.current = !1, P(!1);
              }
            }
          },
          children: T ? c.jsx(Ua, {
            size: 13,
            className: "animate-spin"
          }) : c.jsx(EP, {
            size: 13
          })
        }), c.jsx("button", {
          type: "button",
          title: x("下载"),
          "aria-label": x("下载"),
          disabled: G,
          "aria-busy": G,
          className: "flex h-6 w-6 items-center justify-center rounded-md text-white/85 hover:text-white",
          onClick: async D => {
            if (D.stopPropagation(), !N.current) {
              N.current = !0, z(!0);
              try {
                await y(t);
              } catch (U) {
                qi(U instanceof Error ? U.message : "下载失败");
              } finally {
                N.current = !1, z(!1);
              }
            }
          },
          children: G ? c.jsx(Ua, {
            size: 13,
            className: "animate-spin"
          }) : c.jsx(ws, {
            size: 13
          })
        }), c.jsx("button", {
          type: "button",
          title: x("更多"),
          "aria-label": x("更多"),
          className: "flex h-6 w-5 items-center justify-center rounded-md text-white/85 hover:text-white",
          onClick: D => {
            D.stopPropagation(), b(t, n, D);
          },
          children: c.jsx(hw, {
            size: 13
          })
        })]
      }), c.jsxs("div", {
        className: "material-library-card-caption min-w-0 px-0.5",
        children: [C ? c.jsx("input", {
          autoFocus: !0,
          "aria-label": x("素材名称"),
          onFocus: D => D.currentTarget.select(),
          value: E,
          onClick: D => D.stopPropagation(),
          onChange: D => M(D.target.value),
          onBlur: () => void O(),
          onKeyDown: D => {
            D.stopPropagation(), D.key === "Enter" && O(), D.key === "Escape" && (F.current = !1, I(!1));
          },
          className: `w-full rounded px-1 text-[11px] outline-none ${r ? "bg-white/10 text-white" : "bg-zinc-200 text-zinc-900"}`
        }) : c.jsx("div", {
          title: t.name,
          onDoubleClick: () => {
            F.current = !0, I(!0);
          },
          className: `truncate text-[11px] ${r ? "text-white/55" : "text-zinc-500"}`,
          children: t.name
        }), c.jsx("span", {
          className: "material-library-card-kind",
          children: x({
            image: "图片",
            video: "视频",
            audio: "音频",
            file: "文件"
          }[t.kind])
        })]
      })]
    });
  }),
  B$a = e => `material-library-folder-more flex h-7 w-7 shrink-0 items-center justify-center rounded-lg opacity-0 transition-opacity pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 ${e ? "text-white/40 hover:bg-white/10 hover:text-white" : "text-zinc-400 hover:bg-zinc-200 hover:text-zinc-900"}`,
  NL = 40,
  Jan = 8,
  F$a = ({
    folder: e,
    favoritePaths: t,
    isDark: n,
    isSelected: r,
    folderRenameRequestPath: a,
    onFolderRenameRequestConsumed: i,
    onOpenFolder: o,
    onRenameFolder: s,
    onMoveAsset: l,
    onOpenFolderMenu: d
  }) => {
    on();
    const [u, h] = g.useState(!1),
      p = g.useRef(!1),
      [m, f] = g.useState(e.name),
      [y, b] = g.useState(!1),
      v = g.useRef(null),
      _ = Rwt(e.name) ? new Set([...e.assets.map(A => A.path), ...t]).size + e.children.length : e.assets.length + e.children.length;
    g.useEffect(() => {
      a === e.path && (p.current = !0, h(!0), i());
    }, [e.path, a, i]), g.useEffect(() => {
      u || f(e.name);
    }, [e.name, u]);
    const w = async () => {
        if (!p.current) return;
        p.current = !1;
        const A = m.trim();
        if (h(!1), !(!A || A === e.name)) try {
          await s(e.path, A);
        } catch (S) {
          qi(S instanceof Error ? S.message : "重命名失败");
        }
      },
      k = A => {
        try {
          return Array.from(A.dataTransfer.types).includes("application/x-material-library-asset");
        } catch {
          return !1;
        }
      };
    return c.jsx("div", {
      ref: v,
      className: `h-10 rounded-xl ${y ? n ? "bg-emerald-950/40 ring-1 ring-emerald-600/50" : "bg-emerald-50 ring-1 ring-emerald-400/70" : ""}`,
      onDragEnter: A => {
        k(A) && (A.preventDefault(), A.stopPropagation(), b(!0));
      },
      onDragLeave: A => {
        var C;
        const S = A.relatedTarget;
        S && ((C = v.current) != null && C.contains(S)) || b(!1);
      },
      onDragOver: A => {
        k(A) && (A.preventDefault(), A.stopPropagation(), A.dataTransfer.dropEffect = "move");
      },
      onDrop: async A => {
        b(!1), A.preventDefault(), A.stopPropagation();
        const S = A.dataTransfer.getData("application/json");
        if (S) try {
          const C = JSON.parse(S);
          if ((C == null ? void 0 : C.type) !== "material-library-asset" || typeof C.assetPath != "string" || typeof C.assetName != "string" || C.parentPath === e.path) return;
          await l(C.assetPath, e.path, C.assetName);
        } catch (C) {
          qi(C instanceof Error ? C.message : "移动素材失败");
        }
      },
      children: c.jsxs("div", {
        className: `material-library-folder group flex h-full items-center gap-2 rounded-xl px-2.5 transition-colors ${r ? n ? "bg-white/10 text-white" : "bg-zinc-300 text-zinc-900" : n ? "text-white/80 hover:bg-white/[0.06]" : "text-zinc-700 hover:bg-zinc-200"}`,
        onContextMenu: A => d(e, A),
        onClick: A => {
          A.target.closest("button, input") || o(e.path);
        },
        children: [c.jsx(_h, {
          size: 15,
          className: n ? "text-white/45" : "text-zinc-500"
        }), u ? c.jsx("input", {
          autoFocus: !0,
          "aria-label": x("文件夹名称"),
          onFocus: A => A.currentTarget.select(),
          value: m,
          onClick: A => A.stopPropagation(),
          onChange: A => f(A.target.value),
          onBlur: () => void w(),
          onKeyDown: A => {
            A.key === "Enter" && w(), A.stopPropagation(), A.key === "Escape" && (p.current = !1, h(!1));
          },
          className: `min-w-0 flex-1 rounded border px-1 text-xs outline-none ${n ? "border-white/10 bg-black/40 text-white" : "border-zinc-300 bg-white text-zinc-900"}`
        }) : c.jsx("button", {
          type: "button",
          title: e.name,
          onClick: () => o(e.path),
          className: "h-full min-w-0 flex-1 truncate text-left text-[13px]",
          children: LDt(e.name, 12)
        }), c.jsx("span", {
          className: `text-[11px] ${n ? "text-white/30" : "text-zinc-400"}`,
          children: _
        }), c.jsx("button", {
          type: "button",
          "aria-label": x("{0}的更多操作", e.name),
          onClick: A => d(e, A),
          className: B$a(n),
          children: c.jsx(KEn, {
            size: 15
          })
        })]
      })
    });
  },
  z$a = ({
    isDark: e,
    creatingName: t,
    setCreatingName: n,
    onCommitCreateFolder: r,
    onCancelCreateFolder: a,
    onFocus: i,
    onBlur: o
  }) => (on(), c.jsxs("div", {
    className: "flex h-10 items-center gap-2 px-2.5",
    children: [c.jsx(_h, {
      size: 15,
      className: e ? "text-white/35" : "text-zinc-400"
    }), c.jsx("input", {
      autoFocus: !0,
      value: t,
      onChange: s => n(s.target.value),
      onFocus: i,
      onBlur: o ?? (() => void r()),
      onKeyDown: s => {
        s.stopPropagation(), s.key === "Enter" && r(), s.key === "Escape" && a();
      },
      placeholder: x("新文件夹名称"),
      className: `min-w-0 flex-1 rounded border px-1 text-xs outline-none ${e ? "border-white/10 bg-black/40 text-white" : "border-zinc-300 bg-white text-zinc-900"}`
    })]
  })),
  U$a = (e, t) => c.jsx(F$a, {
    folder: e,
    favoritePaths: t.favoritePaths,
    isDark: t.isDark,
    isSelected: e.path === t.selectedFolderPath,
    folderRenameRequestPath: t.folderRenameRequestPath,
    onFolderRenameRequestConsumed: t.onFolderRenameRequestConsumed,
    onOpenFolder: t.onOpenFolder,
    onRenameFolder: t.onRenameFolder,
    onMoveAsset: t.onMoveAsset,
    onOpenFolderMenu: t.onOpenFolderMenu
  }),
  Nwt = g.memo(function (t) {
    on();
    const {
        folders: n,
        assets: r,
        isDark: a,
        layoutMode: i = "grid",
        thumbSize: o = 144,
        mediaLoadEnabled: s = !0,
        showCreateFolder: l,
        creatingName: d,
        setCreatingName: u,
        onCommitCreateFolder: h,
        onCancelCreateFolder: p,
        onRootCreateFocus: m,
        onRootCreateBlur: f,
        renameRequestPath: y,
        onRenameRequestConsumed: b,
        assetHighlightPath: v,
        favoritePaths: _,
        getPreviewUrl: w,
        getPreviewFallbackUrl: k,
        onInvalidateAssetPreview: A,
        onRenameAsset: S,
        onOpenAsset: C,
        onToggleFavorite: I,
        onApplyToCanvas: E,
        onDownloadAsset: M,
        onOpenAssetMenu: T,
        emptyState: P
      } = t,
      R = g.useRef(null),
      [j, B] = g.useState(0),
      [F, N] = g.useState({
        width: 320,
        height: 400
      }),
      [G, z] = g.useState(null),
      V = g.useRef(0),
      O = g.useRef(null),
      L = r.length === 0,
      D = g.useRef(new Map()),
      U = g.useRef(null),
      [H, Y] = g.useState(0),
      K = g.useCallback(Z => {
        var be;
        const re = Z.target,
          fe = re instanceof HTMLImageElement ? re.naturalWidth : re instanceof HTMLVideoElement ? re.videoWidth : 0,
          ye = re instanceof HTMLImageElement ? re.naturalHeight : re instanceof HTMLVideoElement ? re.videoHeight : 0;
        if (!fe || !ye) return;
        const ie = (be = re.closest("[data-material-asset-path]")) == null ? void 0 : be.dataset.materialAssetPath,
          ae = fe / ye;
        !ie || D.current.get(ie) === ae || (D.current.set(ie, ae), !(i !== "grid" || U.current !== null) && (U.current = requestAnimationFrame(() => {
          U.current = null, Y(Ee => Ee + 1);
        })));
      }, [i]);
    g.useEffect(() => {
      R.current && (R.current.scrollTop = 0), V.current = 0, B(0);
    }, [t.viewKey, i]), g.useEffect(() => {
      const Z = R.current;
      if (!Z) return;
      const re = () => N(ye => {
        const ie = Z.clientWidth,
          ae = Z.clientHeight;
        return ye.width === ie && ye.height === ae ? ye : {
          width: ie,
          height: ae
        };
      });
      re();
      const fe = new ResizeObserver(re);
      return fe.observe(Z), () => fe.disconnect();
    }, []);
    const W = g.useCallback(Z => {
      const re = Z.currentTarget.scrollTop;
      V.current = re, O.current && cancelAnimationFrame(O.current), O.current = requestAnimationFrame(() => {
        B(V.current), O.current = null;
      });
    }, []);
    g.useEffect(() => () => {
      O.current && cancelAnimationFrame(O.current), U.current !== null && cancelAnimationFrame(U.current);
    }, []);
    const Q = g.useMemo(() => {
        const Z = [];
        l && Z.push({
          key: "c:new",
          create: !0
        });
        for (const re of n) Z.push({
          key: `f:${re.path}`,
          folder: re
        });
        return Z;
      }, [n, l]),
      q = Math.max(1, F.width - 20),
      ne = Q.length * NL + (Q.length && !L ? 8 : 0),
      de = g.useMemo(() => {
        if (i === "grid") return xua(r.map(({
          asset: ye
        }) => ({
          type: ye.kind === "video" ? "video" : "image",
          width: D.current.get(ye.path),
          height: 1
        })), q, o);
        const Z = i === "list" ? 1 : Math.max(1, Math.floor((q + 8) / (o + 8))),
          re = (q - (Z - 1) * 8) / Z,
          fe = i === "list" ? Math.max(80, o / 2 + 12) : re / (i === "landscape" ? 1.6 : .75) + 32;
        return {
          cols: Z,
          height: Math.max(0, Math.ceil(r.length / Z) * (fe + 8) - 8),
          tiles: r.map((ye, ie) => ({
            left: ie % Z * (re + 8),
            top: Math.floor(ie / Z) * (fe + 8),
            width: re,
            height: fe
          }))
        };
      }, [r, q, i, o, H]),
      le = ne + de.height,
      J = Math.max(0, Math.floor(j / NL) - Jan),
      pe = Math.min(Q.length, Math.ceil((j + F.height) / NL) + Jan),
      ce = de.tiles.flatMap((Z, re) => Z.top + Z.height + ne >= j - 300 && Z.top + ne <= j + F.height + 300 ? [re] : []),
      we = g.useCallback((Z, re) => {
        const fe = R.current;
        fe && (Z < fe.scrollTop || re > fe.clientHeight ? fe.scrollTop = Z : Z + re > fe.scrollTop + fe.clientHeight && (fe.scrollTop = Z + re - fe.clientHeight), V.current = fe.scrollTop, B(fe.scrollTop));
      }, []);
    g.useEffect(() => {
      const Z = y || v,
        re = Z ? r.findIndex(({
          asset: ye
        }) => ye.path === Z) : -1,
        fe = de.tiles[re];
      fe && we(ne + fe.top, fe.height);
    }, [y, v, r, ne, q, i, o, we]), g.useEffect(() => {
      const Z = t.folderRenameRequestPath ? Q.findIndex(re => {
        var fe;
        return ((fe = re.folder) == null ? void 0 : fe.path) === t.folderRenameRequestPath;
      }) : -1;
      Z >= 0 ? we(Z * NL, NL) : l && we(0, NL);
    }, [t.folderRenameRequestPath, l, Q, we]), g.useEffect(() => {
      var fe;
      if (!G) return;
      const Z = Array.from(((fe = R.current) == null ? void 0 : fe.querySelectorAll("[data-material-asset-path]")) ?? []).find(ye => ye.dataset.materialAssetPath === G),
        re = Z == null ? void 0 : Z.querySelector('button[aria-label^="预览 "]');
      re && (re.focus({
        preventScroll: !0
      }), z(null));
    }, [G, j, de]);
    const X = Z => {
      var xe;
      const re = Z.target;
      if (!re.matches('button[aria-label^="预览 "]') || Z.altKey || Z.ctrlKey || Z.metaKey) return;
      const ye = {
        ArrowLeft: -1,
        ArrowRight: 1,
        ArrowUp: -de.cols,
        ArrowDown: de.cols
      }[Z.key];
      if (ye == null) return;
      const ie = (xe = re.closest("[data-material-asset-path]")) == null ? void 0 : xe.dataset.materialAssetPath,
        ae = r.findIndex(({
          asset: he
        }) => he.path === ie);
      if (ae < 0) return;
      const be = Math.max(0, Math.min(r.length - 1, ae + ye));
      Z.preventDefault();
      const Ee = de.tiles[be];
      we(ne + Ee.top, Ee.height), z(r[be].asset.path);
    };
    return c.jsxs("div", {
      ref: R,
      className: "material-library-scroll material-library-virtual-list min-h-0 flex-1 overflow-y-auto px-2.5 py-2",
      "data-layout": i,
      onScroll: W,
      onKeyDown: X,
      onLoadCapture: K,
      onLoadedMetadataCapture: K,
      children: [c.jsxs("div", {
        className: "relative",
        style: {
          height: le
        },
        children: [Q.slice(J, pe).map((Z, re) => c.jsx("div", {
          className: "absolute left-0 right-0",
          style: {
            top: (J + re) * NL,
            height: NL
          },
          children: Z.create ? c.jsx(z$a, {
            isDark: a,
            creatingName: d,
            setCreatingName: u,
            onCommitCreateFolder: h,
            onCancelCreateFolder: p,
            onFocus: m,
            onBlur: f
          }) : Z.folder ? U$a(Z.folder, t) : null
        }, Z.key)), ce.map(Z => {
          const {
              asset: re,
              parentPath: fe
            } = r[Z],
            ye = de.tiles[Z];
          return c.jsx("div", {
            className: "material-library-asset-tile",
            style: {
              ...ye,
              top: ne + ye.top
            },
            children: c.jsx(O$a, {
              asset: re,
              parentPath: fe,
              isDark: a,
              highlight: v === re.path,
              favorited: _.has(re.path),
              renameRequestPath: y,
              onRenameRequestConsumed: b,
              getPreviewUrl: w,
              getPreviewFallbackUrl: k,
              onInvalidateAssetPreview: A,
              onRenameAsset: S,
              onOpenAsset: C,
              onToggleFavorite: I,
              onApplyToCanvas: E,
              onDownload: M,
              onOpenAssetMenu: T,
              shouldLoadMedia: s,
              scrollRootRef: R
            }, re.path)
          }, re.path);
        })]
      }), L && Q.length === 0 && P]
    });
  });

Nwt.displayName = "MaterialLibraryVirtualList";

function Zan({
  x: e,
  y: t,
  isDark: n,
  busy: r,
  children: a,
  onClose: i
}) {
  on();
  const o = g.useRef(null);
  return g.useLayoutEffect(() => {
    const s = () => {
      const d = o.current;
      d && (d.style.left = `${Math.max(8, Math.min(e, window.innerWidth - d.offsetWidth - 8))}px`, d.style.top = `${Math.max(8, Math.min(t, window.innerHeight - d.offsetHeight - 8))}px`);
    };
    s();
    const l = new ResizeObserver(s);
    return o.current && l.observe(o.current), window.addEventListener("resize", s), () => {
      l.disconnect(), window.removeEventListener("resize", s);
    };
  }, [e, t]), g.useEffect(() => {
    var l, d;
    const s = document.activeElement;
    return (d = (l = o.current) == null ? void 0 : l.querySelector("button")) == null || d.focus(), () => {
      s instanceof HTMLElement && s.isConnected && s.focus({
        preventScroll: !0
      });
    };
  }, []), Da.createPortal(c.jsx("div", {
    ref: o,
    role: "dialog",
    "aria-label": x("素材库操作"),
    "aria-busy": r,
    className: `material-library-sidebar fixed z-[100000] w-48 max-h-[calc(100vh-16px)] overflow-y-auto rounded-xl border p-1 shadow-xl ${n ? "border-zinc-700 bg-zinc-900 text-zinc-200" : "border-zinc-200 bg-white text-zinc-800"}`,
    style: {
      left: e,
      top: t
    },
    onMouseDown: s => s.stopPropagation(),
    onKeyDown: s => {
      var l, d;
      if (s.stopPropagation(), s.key === "Escape" && (s.preventDefault(), i()), s.key === "ArrowDown" || s.key === "ArrowUp") {
        s.preventDefault();
        const u = Array.from(((l = o.current) == null ? void 0 : l.querySelectorAll("button:not(:disabled)")) ?? []),
          h = u.indexOf(document.activeElement);
        (d = u[(h + (s.key === "ArrowDown" ? 1 : -1) + u.length) % u.length]) == null || d.focus();
      }
    },
    children: c.jsx("fieldset", {
      disabled: r,
      className: "min-w-0 disabled:cursor-wait disabled:opacity-50",
      children: a
    })
  }), document.body);
}

const ein = ({
    open: e = !0,
    loading: t = !1,
    error: n,
    isDark: r,
    rootPath: a,
    tree: i,
    selectedFolderPath: o,
    allFolders: s,
    onClose: l,
    onSelectFolder: d,
    onChooseRoot: u,
    onRefresh: h,
    onCreateFolder: p,
    onRenameFolder: m,
    onMoveFolder: f,
    onDuplicateFolder: y,
    onDeleteFolder: b,
    onRenameAsset: v,
    onMoveAsset: _,
    onDuplicateAsset: w,
    onDeleteAsset: k,
    getPreviewUrl: A,
    getPreviewFallbackUrl: S,
    onInvalidateAssetPreview: C,
    onImportFiles: I,
    onInsertAsset: E,
    onInsertAssets: M,
    onOpenAiRoleLibrary: T
  }) => {
    var Yn, Ct, Cn;
    on();
    const [P, R] = g.useReducer(_$a, void 0, x$a),
      [j, B] = g.useState(new Set()),
      [F, N] = g.useState(""),
      G = g.useDeferredValue(F),
      [z, V] = g.useState("grid"),
      [O, L] = g.useState(144),
      [D, U] = g.useState(!1),
      H = g.useRef(null),
      Y = g.useRef(null),
      [K, W] = g.useState("all"),
      [Q, q] = g.useState(null),
      [ne, de] = g.useState(!1),
      [le, J] = g.useState(null),
      [pe, ce] = g.useState(!1),
      [we, X] = g.useState(null),
      [Z, re] = g.useState(null),
      [fe, ye] = g.useState(null),
      [ie, ae] = g.useState(!1),
      [be, Ee] = g.useState(!1),
      xe = g.useRef(!1),
      [he, ue] = g.useState(null),
      [ge, _e] = g.useState(!1),
      {
        settings: ke,
        updateSettings: ve,
        ossBusy: Te,
        ossProgress: Ne,
        ossAvailable: me,
        uploadToCloud: Ae,
        downloadFromCloud: Fe
      } = v$a();
    g.useEffect(() => {
      const un = () => {
        h();
      };
      return window.addEventListener("qiaodoumayi-material-restored", un), () => {
        window.removeEventListener("qiaodoumayi-material-restored", un);
      };
    }, [h]);
    const [Me, Re] = g.useState("我的文件夹"),
      $e = g.useRef(!1),
      rt = g.useRef(null),
      nt = g.useRef(!1),
      ze = g.useCallback(async (un, Jn) => {
        if (!xe.current) {
          xe.current = !0, Ee(!0);
          try {
            const Kn = await Jn();
            return un && Kn !== null && Vs(un), Kn;
          } catch (Kn) {
            qi(Kn instanceof Error ? Kn.message : "操作失败，请重试");
            return;
          } finally {
            xe.current = !1, Ee(!1);
          }
        }
      }, []),
      Le = g.useCallback(un => {
        N(""), ae(!1), ue(null), R(un), k$a(un, {
          selectFolder: Jn => d(Jn ?? (i == null ? void 0 : i.path) ?? a ?? "")
        });
      }, [d, a, i == null ? void 0 : i.path]);
    g.useEffect(() => {
      if (e) return;
      const un = rt.current;
      if (!un) return;
      const Jn = document.activeElement;
      Jn instanceof HTMLElement && un.contains(Jn) && Jn.blur();
    }, [e]);
    const Ke = g.useCallback(() => {
      R({
        type: "closePreview"
      }), q(null), J(null), de(!1), ce(!1), ae(!1), $e.current = !0, ye(null), l();
    }, [l]);
    g.useEffect(() => {
      var Kn;
      if (!e) return;
      const un = document.activeElement;
      (Kn = Y.current) == null || Kn.focus({
        preventScroll: !0
      });
      const Jn = () => {
        H.current != null && cancelAnimationFrame(H.current), U(!1);
      };
      return window.addEventListener("drop", Jn, !0), window.addEventListener("dragend", Jn, !0), () => {
        H.current != null && cancelAnimationFrame(H.current), window.removeEventListener("drop", Jn, !0), window.removeEventListener("dragend", Jn, !0), un instanceof HTMLElement && un.isConnected && un.focus({
          preventScroll: !0
        });
      };
    }, [e]), g.useEffect(() => {
      e || (R({
        type: "closePreview"
      }), q(null), J(null), de(!1), ce(!1));
    }, [e]), g.useEffect(() => {
      if (!a) return;
      nt.current = !1;
      let un = !1;
      return (async () => {
        var Vn;
        const Kn = await Ur.loadMaterialLibrarySidebarState();
        if (un) return;
        const en = (Vn = Kn == null ? void 0 : Kn.roots) == null ? void 0 : Vn[a];
        B(new Set((en == null ? void 0 : en.favoritePaths) || [])), en != null && en.drillPath ? (R({
          type: "goToPath",
          path: en.drillPath
        }), d(en.drillPath)) : R({
          type: "backToFolders"
        }), nt.current = !0;
      })().catch(() => {
        un || (nt.current = !0);
      }), () => {
        un = !0;
      };
    }, [d, a]), g.useEffect(() => {
      if (!a || !nt.current) return;
      const un = window.setTimeout(async () => {
        const Jn = (await Ur.loadMaterialLibrarySidebarState()) || {
            version: 1,
            roots: {}
          },
          Kn = Jn.roots[a] || {};
        Jn.roots[a] = {
          ...Kn,
          favoritePaths: Array.from(j),
          drillPath: P.drillPath,
          updatedAt: new Date().toISOString()
        }, Jn.updatedAt = new Date().toISOString(), await Ur.saveMaterialLibrarySidebarState(Jn);
      }, 250);
      return () => window.clearTimeout(un);
    }, [P.drillPath, j, a]), g.useEffect(() => {
      const un = () => {
        q(null), J(null), de(!1), ce(!1), ae(!1);
      };
      return window.addEventListener("mousedown", un), () => window.removeEventListener("mousedown", un);
    }, []);
    const Xe = g.useMemo(() => A$a(G), [G]),
      De = g.useMemo(() => i ? T$a({
        tree: i,
        drillPath: P.drillPath,
        searchTerms: Xe,
        kindFilter: K,
        favoritePaths: j
      }) : null, [P.drillPath, j, K, Xe, i]),
      Ye = g.useMemo(() => a ? (i == null ? void 0 : i.path) ?? a : null, [a, i == null ? void 0 : i.path]),
      Ce = De != null && De.isDrillDown ? De.currentFolder.path : Ye,
      He = !!(fe && Ce && fe === Ce),
      Ve = (De == null ? void 0 : De.isDrillDown) && !De.isSearching && De.folders.length === 0,
      it = (Ve ? (Yn = De.parentFolder) == null ? void 0 : Yn.children : De == null ? void 0 : De.folders) ?? [],
      It = Ve ? De.parentFolder : De == null ? void 0 : De.currentFolder,
      Ft = un => {
        ae(!1), un !== Ce && Le({
          type: "goToPath",
          path: un
        }), $e.current = !1, ye(un), Re("我的文件夹");
      },
      We = async () => {
        if (!fe || $e.current) return;
        $e.current = !0, (await ze("已新建文件夹", () => p(fe, Me.trim() || "我的文件夹"))) ? (ye(null), Re("我的文件夹")) : $e.current = !1;
      },
      Ze = g.useCallback((un, Jn) => {
        Jn.preventDefault(), Jn.stopPropagation(), de(!1), q({
          folder: un,
          x: Jn.clientX,
          y: Jn.clientY
        });
      }, []),
      Ge = g.useCallback((un, Jn, Kn) => {
        Kn.preventDefault(), Kn.stopPropagation(), ce(!1), J({
          asset: un,
          parentPath: Jn,
          x: Kn.clientX,
          y: Kn.clientY
        });
      }, []),
      Oe = !!(Q && (i != null && i.children.some(un => un.path === Q.folder.path))),
      st = Q ? s.filter(un => !(un.path === Q.folder.path || un.path.startsWith(`${Q.folder.path}\\`) || un.path.startsWith(`${Q.folder.path}/`))) : [],
      vt = le ? s.filter(un => un.path !== le.parentPath) : [],
      Ht = g.useCallback(un => {
        B(Jn => {
          const Kn = new Set(Jn);
          return Kn.has(un.path) ? Kn.delete(un.path) : Kn.add(un.path), Kn;
        });
      }, []),
      nn = g.useCallback(async (un, Jn, Kn) => {
        const en = await ze("已重命名素材", () => v(un, Jn, Kn));
        return en ? (B(Vn => bte(Vn, un, en)), ue(en), en) : un;
      }, [v, ze]),
      pt = g.useCallback(async (un, Jn, Kn) => {
        const en = await ze("已移动素材", () => _(un, Jn, Kn));
        return en ? (B(Vn => bte(Vn, un, en)), Le({
          type: "goToPath",
          path: Jn
        }), ue(en), en) : un;
      }, [_, ze, Le]),
      lt = g.useCallback(async (un, Jn) => {
        window.confirm(x("将从磁盘永久删除该素材，是否继续？")) && (await ze("已删除素材", async () => {
          var Kn;
          await k(un, Jn), B(en => bte(en, un, null)), ((Kn = P.previewAsset) == null ? void 0 : Kn.path) === un && R({
            type: "closePreview"
          });
        }));
      }, [(Ct = P.previewAsset) == null ? void 0 : Ct.path, k, ze]),
      gt = g.useCallback(async un => {
        await ze("", async () => {
          if (!(await M$a(un, A))) throw new Error("无法读取素材，请重新加载后重试");
        });
      }, [A, ze]),
      Ut = g.useMemo(() => ((De == null ? void 0 : De.assets) ?? []).map(un => un.asset).filter(un => un.kind === "image" || un.kind === "video" || un.kind === "audio"), [De]),
      _t = g.useCallback(async () => {
        Ut.length === 0 || xe.current || Ut.length > w$a && !window.confirm(x("将该文件夹内全部 {0} 个素材应用到画布，是否继续？", Ut.length)) || (await ze("", async () => {
          if (M) await M(Ut);else for (const un of Ut) await (E == null ? void 0 : E(un));
        }));
      }, [Ut, E, M, ze]),
      At = g.useCallback(un => ze("", async () => {
        E ? await E(un) : await (M == null ? void 0 : M([un]));
      }), [E, M, ze]),
      Yt = E || M ? At : void 0,
      qe = g.useCallback(async (un, Jn) => {
        const Kn = await ze("已重命名文件夹", () => m(un, Jn));
        return Kn ? (B(en => bte(en, un, Kn, !0)), Kn) : un;
      }, [m, ze]),
      kt = async un => {
        ae(!1);
        const Jn = await ze("", () => I(un));
        Jn && (Vs(`已导入 ${Jn} 个素材`), Le({
          type: "goToPath",
          path: un
        }));
      },
      St = (De == null ? void 0 : De.assets.findIndex(({
        asset: un
      }) => {
        var Jn;
        return un.path === ((Jn = P.previewAsset) == null ? void 0 : Jn.path);
      })) ?? -1,
      hn = un => {
        const Jn = De == null ? void 0 : De.assets[St + un];
        Jn && R({
          type: "selectAsset",
          asset: Jn.asset
        });
      },
      Qt = g.useCallback(un => Le({
        type: "openFolder",
        path: un
      }), [Le]),
      Ot = g.useCallback(un => R({
        type: "selectAsset",
        asset: un
      }), []),
      ln = g.useCallback(() => re(null), []),
      Pn = g.useCallback(() => X(null), []),
      rn = {
        isDark: r,
        favoritePaths: j,
        selectedFolderPath: o,
        folderRenameRequestPath: Z,
        renameRequestPath: we,
        creatingName: Me,
        setCreatingName: Re,
        getPreviewUrl: A,
        getPreviewFallbackUrl: S,
        onInvalidateAssetPreview: C,
        onCommitCreateFolder: We,
        onCancelCreateFolder: () => {
          $e.current = !0, ye(null);
        },
        onFolderRenameRequestConsumed: ln,
        onRenameRequestConsumed: Pn,
        onOpenFolder: Qt,
        onRenameFolder: qe,
        onMoveAsset: pt,
        onOpenFolderMenu: Ze,
        onRenameAsset: nn,
        onOpenAsset: Ot,
        onToggleFavorite: Ht,
        onApplyToCanvas: Yt,
        onDownloadAsset: gt,
        onOpenAssetMenu: Ge
      };
    return e ? c.jsx("div", {
      className: `material-library-overlay material-library-sidebar pose-wall-overlay ${r ? "pose-wall-dark" : "pose-wall-light"}${D ? " is-dragging" : ""}`,
      onMouseDown: un => {
        un.target === un.currentTarget && Ke();
      },
      onDragStart: un => {
        un.target.closest("[data-material-asset-path]") && (H.current = requestAnimationFrame(() => U(!0)));
      },
      onKeyDown: un => {
        var Jn;
        if (un.stopPropagation(), un.key === "Escape" && (un.preventDefault(), ie ? ae(!1) : ge ? _e(!1) : F ? N("") : Ke()), un.key === "Tab" && !P.previewAsset && !Q && !le) {
          const Kn = [...(((Jn = rt.current) == null ? void 0 : Jn.querySelectorAll('button:not(:disabled), input:not(:disabled), select:not(:disabled), [tabindex="0"]')) ?? [])].filter(Tt => Tt.getClientRects().length),
            en = Kn[0],
            Vn = Kn[Kn.length - 1];
          un.shiftKey && document.activeElement === en ? (un.preventDefault(), Vn == null || Vn.focus()) : !un.shiftKey && document.activeElement === Vn && (un.preventDefault(), en == null || en.focus());
        }
      },
      children: c.jsxs("div", {
        ref: rt,
        className: "pose-wall-dialog material-library-dialog",
        role: "dialog",
        "aria-modal": "true",
        "aria-label": x("素材库"),
        children: [c.jsxs("div", {
          ...(P.previewAsset ? {
            inert: ""
          } : {}),
          className: "material-library-dialog-body",
          children: [c.jsxs("header", {
            className: "pose-wall-header material-library-header",
            children: [c.jsx("div", {
              className: "pose-wall-heading",
              children: c.jsxs("div", {
                children: [c.jsx("h2", {
                  children: x("素材库")
                }), c.jsx("p", {
                  children: x("整理图片、视频与音频，随时应用到画布")
                })]
              })
            }), c.jsxs("div", {
              className: "material-library-header-actions",
              children: [c.jsxs("div", {
                className: "material-library-add-menu",
                children: [c.jsx("button", {
                  type: "button",
                  className: "pose-wall-icon",
                  title: x("添加素材或文件夹"),
                  "aria-label": x("添加素材或文件夹"),
                  "aria-expanded": ie,
                  onMouseDown: un => {
                    un.preventDefault(), un.stopPropagation();
                  },
                  onClick: () => {
                    Ce ? ae(un => !un) : u();
                  },
                  children: c.jsx(eo, {
                    size: 18
                  })
                }), ie && Ce && c.jsxs("div", {
                  className: "material-library-add-options",
                  onMouseDown: un => un.stopPropagation(),
                  children: [I && c.jsxs("button", {
                    type: "button",
                    disabled: be,
                    onClick: () => void kt(Ce),
                    children: [c.jsx(ml, {
                      size: 14
                    }), x("导入素材")]
                  }), c.jsxs("button", {
                    type: "button",
                    disabled: be,
                    onClick: () => Ft(Ce),
                    children: [c.jsx(Jle, {
                      size: 14
                    }), x("新建文件夹")]
                  })]
                })]
              }), c.jsx("button", {
                type: "button",
                className: "pose-wall-icon",
                title: x("从本机重新扫描"),
                "aria-label": x("从本机重新扫描"),
                disabled: t || be,
                "aria-busy": t,
                onClick: () => {
                  a ? ze("", h) : u();
                },
                children: c.jsx(bd, {
                  size: 16,
                  className: t ? "animate-spin" : ""
                })
              }), c.jsx("button", {
                type: "button",
                className: "pose-wall-icon",
                title: x("素材库云端备份设置"),
                "aria-label": x("素材库云端备份设置"),
                "aria-pressed": ge,
                onClick: () => _e(!ge),
                children: c.jsx(IP, {
                  size: 16
                })
              }), c.jsx("button", {
                type: "button",
                className: "pose-wall-icon",
                "aria-label": x("关闭素材库"),
                title: x("关闭 · Esc"),
                onClick: Ke,
                children: c.jsx(Na, {
                  size: 19
                })
              })]
            })]
          }), ge && c.jsxs("div", {
            className: `material-library-backup px-4 py-3 border text-xs space-y-3 ${r ? "border-white/[0.06] bg-white/[0.03] text-zinc-300" : "border-zinc-200 bg-zinc-50 text-zinc-700"}`,
            children: [c.jsxs("label", {
              className: "flex items-center gap-2 cursor-pointer font-medium",
              children: [c.jsx("input", {
                type: "checkbox",
                checked: ke.enabled,
                onChange: un => ve({
                  enabled: un.target.checked
                }),
                className: "rounded accent-zinc-500"
              }), c.jsx(Wp, {
                size: 14,
                className: "text-zinc-400"
              }), x("启用素材库 OSS 备份")]
            }), !me && ke.enabled && c.jsxs("div", {
              className: `flex items-start gap-1.5 p-2 rounded text-[10px] ${r ? "bg-amber-950/20 text-amber-400" : "bg-amber-50 text-amber-800"}`,
              children: [c.jsx(c3, {
                size: 12,
                className: "shrink-0 mt-0.5"
              }), c.jsx("p", {
                children: x("仅限 Tauri 桌面端且须选择素材库。请先在「设置 → 画布功能 → 图床」中配置好阿里云 OSS 凭证。")
              })]
            }), ke.enabled && me && c.jsxs("div", {
              className: "pt-1 flex gap-2",
              children: [c.jsxs("button", {
                type: "button",
                disabled: Te,
                onClick: async () => {
                  try {
                    await Ae(a ?? void 0);
                  } catch (un) {
                    alert(x("备份失败：{0}", un instanceof Error ? un.message : String(un)));
                  }
                },
                className: "flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded text-xs font-medium bg-zinc-200 text-zinc-900 hover:bg-white disabled:opacity-50",
                children: [c.jsx(ml, {
                  size: 13
                }), x("备份到云端")]
              }), c.jsxs("button", {
                type: "button",
                disabled: Te,
                onClick: async () => {
                  try {
                    await Fe(a ?? void 0);
                  } catch (un) {
                    alert(x("恢复失败：{0}", un instanceof Error ? un.message : String(un)));
                  }
                },
                className: `flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded text-xs font-medium border ${r ? "bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700 disabled:opacity-50" : "bg-white border-zinc-300 text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"}`,
                children: [c.jsx(ws, {
                  size: 13
                }), x("从云端恢复")]
              })]
            }), Te && Ne.percent > 0 && c.jsxs("div", {
              className: "space-y-1",
              children: [c.jsxs("div", {
                className: "flex justify-between items-center",
                children: [c.jsxs("span", {
                  className: `text-[10px] ${r ? "text-zinc-500" : "text-zinc-400"}`,
                  children: [Ne.message || (Ne.kind === "upload" ? x("正在备份") : x("正在恢复")), "..."]
                }), c.jsxs("span", {
                  className: `text-[10px] font-mono ${r ? "text-zinc-500" : "text-zinc-400"}`,
                  children: [Ne.percent, "%"]
                })]
              }), c.jsx("div", {
                className: `h-1 rounded-full overflow-hidden ${r ? "bg-zinc-800" : "bg-zinc-200"}`,
                children: c.jsx("div", {
                  className: "h-full rounded-full bg-zinc-400 transition-all duration-300",
                  style: {
                    width: `${Ne.percent}%`
                  }
                })
              })]
            })]
          }), c.jsxs("div", {
            className: "pose-wall-body",
            children: [c.jsxs("aside", {
              className: "pose-wall-sidebar material-library-navigation",
              "aria-label": x("素材目录"),
              children: [c.jsxs("button", {
                type: "button",
                className: "pose-wall-nav-item",
                "aria-current": De != null && De.isDrillDown ? void 0 : "page",
                onClick: () => Le({
                  type: "backToFolders"
                }),
                children: [c.jsx(Sc, {
                  size: 16
                }), c.jsx("span", {
                  children: x("全部文件夹")
                })]
              }), c.jsxs("div", {
                className: "material-library-folder-heading",
                children: [c.jsx("span", {
                  title: It == null ? void 0 : It.path,
                  children: It && It.path !== (i == null ? void 0 : i.path) ? It.name : x("文件夹")
                }), c.jsx("button", {
                  type: "button",
                  className: "pose-wall-icon",
                  title: x("新建文件夹"),
                  "aria-label": x("新建文件夹"),
                  disabled: !Ce || be,
                  onClick: () => Ce && Ft(Ce),
                  children: c.jsx(Jle, {
                    size: 15
                  })
                })]
              }), i && De ? c.jsx(Nwt, {
                ...rn,
                viewKey: `folders|${a}|${P.drillPath}|${G}|${K}`,
                folders: it,
                assets: [],
                mediaLoadEnabled: !1,
                showCreateFolder: He,
                assetHighlightPath: null,
                emptyState: c.jsx("p", {
                  className: "pose-wall-directory-empty",
                  children: x(a ? "此目录没有子文件夹" : "选择目录，开始整理素材。")
                })
              }) : c.jsx("div", {
                className: "pose-wall-folders",
                children: c.jsx("p", {
                  className: "pose-wall-directory-empty",
                  children: x("选择素材库目录，浏览和管理你的素材。")
                })
              }), c.jsxs("div", {
                className: "material-library-root",
                title: a || void 0,
                children: [c.jsx(Sc, {
                  size: 13
                }), c.jsx("span", {
                  children: a || x("未选择目录")
                })]
              }), T && c.jsxs("button", {
                type: "button",
                className: "pose-wall-add material-library-resource",
                title: x("资源库"),
                onClick: () => {
                  Ke(), T();
                },
                children: [c.jsx(lo, {
                  size: 15
                }), x("资源库")]
              }), c.jsxs("button", {
                type: "button",
                className: "pose-wall-add",
                disabled: be,
                onClick: () => void u(),
                children: [c.jsx(Sc, {
                  size: 15
                }), x(a ? "更换目录" : "选择素材库根目录")]
              })]
            }), c.jsxs("main", {
              className: "pose-wall-main material-library-content",
              "aria-busy": t || F !== G,
              children: [c.jsxs("div", {
                className: "pose-wall-toolbar",
                children: [c.jsxs("label", {
                  className: "pose-wall-search",
                  children: [c.jsx(mc, {
                    size: 16
                  }), c.jsx("input", {
                    ref: Y,
                    value: F,
                    onChange: un => N(un.target.value),
                    placeholder: x("搜索全部素材"),
                    "aria-label": x("搜索素材")
                  }), F && c.jsx("button", {
                    type: "button",
                    "aria-label": x("清空搜索"),
                    title: x("清空搜索"),
                    onClick: () => N(""),
                    children: c.jsx(Na, {
                      size: 14
                    })
                  })]
                }), c.jsxs("div", {
                  className: "pose-wall-view-tools",
                  children: [c.jsxs("div", {
                    className: "pose-wall-layout-switch",
                    role: "group",
                    "aria-label": x("浏览方式"),
                    children: [c.jsx("button", {
                      type: "button",
                      className: "pose-wall-icon",
                      "aria-label": x("自适应浏览"),
                      title: x("自适应浏览 · 原图比例"),
                      "aria-pressed": z === "grid",
                      onClick: () => V("grid"),
                      children: c.jsx(Od, {
                        size: 15
                      })
                    }), c.jsx("button", {
                      type: "button",
                      className: "pose-wall-icon",
                      "aria-label": x("横向浏览"),
                      title: x("横向浏览"),
                      "aria-pressed": z === "landscape",
                      onClick: () => V("landscape"),
                      children: c.jsx(A5e, {
                        size: 16
                      })
                    }), c.jsx("button", {
                      type: "button",
                      className: "pose-wall-icon",
                      "aria-label": x("竖向浏览"),
                      title: x("竖向浏览"),
                      "aria-pressed": z === "portrait",
                      onClick: () => V("portrait"),
                      children: c.jsx(bTn, {
                        size: 16
                      })
                    }), c.jsx("button", {
                      type: "button",
                      className: "pose-wall-icon",
                      "aria-label": x("列表浏览"),
                      title: x("列表浏览"),
                      "aria-pressed": z === "list",
                      onClick: () => V("list"),
                      children: c.jsx(X$, {
                        size: 16
                      })
                    })]
                  }), c.jsxs("label", {
                    className: "pose-wall-size",
                    title: x("缩略图大小"),
                    children: [c.jsx(lo, {
                      size: 14
                    }), c.jsx("input", {
                      "aria-label": x("缩略图大小"),
                      type: "range",
                      min: 80,
                      max: 240,
                      step: 8,
                      value: O,
                      onChange: un => L(Number(un.target.value))
                    }), c.jsx("span", {
                      children: O
                    })]
                  })]
                })]
              }), c.jsxs("div", {
                className: "material-library-filter-row",
                children: [c.jsx("div", {
                  className: "material-library-kinds",
                  role: "group",
                  "aria-label": x("素材类型"),
                  children: [{
                    id: "all",
                    label: "全部"
                  }, {
                    id: "image",
                    label: "图片"
                  }, {
                    id: "video",
                    label: "视频"
                  }, {
                    id: "audio",
                    label: "音频"
                  }].map(({
                    id: un,
                    label: Jn
                  }) => c.jsx("button", {
                    type: "button",
                    "aria-pressed": K === un,
                    onClick: () => {
                      W(un), R({
                        type: "closePreview"
                      });
                    },
                    children: Jn
                  }, un))
                }), (De == null ? void 0 : De.isDrillDown) && !Xe.length && Ut.length > 0 && (E || M) && c.jsx("button", {
                  type: "button",
                  className: "material-library-apply-all",
                  onClick: () => void _t(),
                  disabled: be,
                  "aria-busy": be,
                  children: x(be ? "处理中…" : "全部应用")
                })]
              }), c.jsxs("nav", {
                className: "pose-wall-location material-library-breadcrumb",
                "aria-label": x("当前位置"),
                children: [c.jsx(Sc, {
                  size: 14
                }), c.jsx("button", {
                  type: "button",
                  onClick: () => Le({
                    type: "backToFolders"
                  }),
                  children: x("素材库")
                }), De == null ? void 0 : De.crumbs.map(un => c.jsxs(Ia.Fragment, {
                  children: [c.jsx("span", {
                    children: "/"
                  }), c.jsx("button", {
                    type: "button",
                    title: un.path,
                    onClick: () => Le({
                      type: "goToPath",
                      path: un.path
                    }),
                    children: un.name
                  })]
                }, un.path)), Xe.length > 0 && c.jsx("span", {
                  children: x("/ 搜索结果")
                }), c.jsxs("small", {
                  children: [(De == null ? void 0 : De.assets.length) ?? 0, x(" 项")]
                })]
              }), n && c.jsxs("div", {
                role: "alert",
                className: "pose-wall-error material-library-error",
                children: [c.jsx(c3, {
                  size: 14
                }), c.jsx("span", {
                  children: n
                }), c.jsx("button", {
                  disabled: t,
                  onClick: () => void ze("", h),
                  children: x("重试")
                })]
              }), t && !i ? c.jsxs("div", {
                role: "status",
                className: "pose-wall-empty",
                children: [c.jsx(bd, {
                  size: 28,
                  className: "animate-spin"
                }), c.jsx("p", {
                  children: x("正在加载素材库…")
                })]
              }) : i && De ? c.jsx(Nwt, {
                ...rn,
                viewKey: [a, P.drillPath, G, K].join("|"),
                folders: [],
                assets: De.assets,
                layoutMode: z,
                thumbSize: O,
                mediaLoadEnabled: e,
                showCreateFolder: !1,
                assetHighlightPath: ((Cn = P.previewAsset) == null ? void 0 : Cn.path) ?? (le == null ? void 0 : le.asset.path) ?? he,
                emptyState: c.jsxs("div", {
                  className: "pose-wall-empty",
                  children: [De.isSearching ? c.jsx(mc, {
                    size: 40
                  }) : c.jsx(lo, {
                    size: 42
                  }), c.jsx("h3", {
                    children: De.isSearching ? x("没有找到匹配的素材") : K !== "all" ? x("当前类型下没有素材") : De.folders.length ? x("选择文件夹，开始浏览素材") : x("这里还没有素材")
                  }), c.jsx("p", {
                    children: De.isSearching || K !== "all" ? x("换个关键词，或查看全部类型。") : x("支持图片、视频与音频，点击预览或拖入画布。")
                  }), De.isSearching || K !== "all" ? c.jsx("button", {
                    type: "button",
                    onClick: () => {
                      N(""), W("all");
                    },
                    children: x("清除筛选")
                  }) : I && Ce ? c.jsx("button", {
                    type: "button",
                    disabled: be,
                    onClick: () => void kt(Ce),
                    children: x("导入素材")
                  }) : null]
                })
              }) : c.jsxs("div", {
                className: "pose-wall-empty material-library-no-root",
                children: [c.jsx(lo, {
                  size: 42
                }), c.jsx("h3", {
                  children: x("将素材整理到你的创作库")
                }), c.jsx("p", {
                  children: x("选择目录后，在这里浏览图片、视频与音频。")
                }), c.jsx("button", {
                  type: "button",
                  onClick: () => void u(),
                  children: x("选择素材库目录")
                })]
              }), c.jsxs("footer", {
                className: "pose-wall-footer",
                children: [c.jsxs("span", {
                  children: [(De == null ? void 0 : De.assets.length) ?? 0, x(" 项素材")]
                }), c.jsx("span", {
                  children: x("点击预览 · 拖入画布 · 右键管理")
                })]
              })]
            })]
          })]
        }), e && P.previewAsset && c.jsx(D$a, {
          asset: P.previewAsset,
          position: St >= 0 ? String(St + 1) + " / " + (De == null ? void 0 : De.assets.length) : void 0,
          onPrevious: St > 0 ? () => hn(-1) : void 0,
          onNext: St >= 0 && St < ((De == null ? void 0 : De.assets.length) ?? 0) - 1 ? () => hn(1) : void 0,
          favorited: j.has(P.previewAsset.path),
          onToggleFavorite: Ht,
          onDownload: gt,
          isDark: r,
          getPreviewUrl: A,
          getPreviewFallbackUrl: S,
          onInvalidateAssetPreview: C,
          onClose: () => R({
            type: "closePreview"
          }),
          onApplyToCanvas: Yt
        }, P.previewAsset.path), e && Q && c.jsx(Zan, {
          x: Q.x,
          y: Q.y,
          isDark: r,
          busy: be,
          onClose: () => q(null),
          children: ne ? c.jsxs(c.Fragment, {
            children: [c.jsx("button", {
              type: "button",
              className: "w-full text-left text-xs rounded-lg px-2 py-1.5 hover:bg-zinc-200/40 dark:hover:bg-zinc-800",
              onClick: () => de(!1),
              children: x("返回")
            }), st.length === 0 && c.jsx("p", {
              className: "p-3 text-xs opacity-50",
              children: x("没有可移动到的文件夹")
            }), st.map(un => c.jsx("button", {
              type: "button",
              onClick: async () => {
                const Jn = await ze("已移动文件夹", () => f(Q.folder.path, un.path));
                Jn && (B(Kn => bte(Kn, Q.folder.path, Jn, !0)), Le({
                  type: "goToPath",
                  path: un.path
                })), q(null);
              },
              title: un.path,
              className: "w-full text-left text-xs rounded-lg px-2 py-1.5 hover:bg-zinc-200/40 dark:hover:bg-zinc-800",
              children: un.name
            }, un.path))]
          }) : c.jsxs(c.Fragment, {
            children: [I && c.jsx("button", {
              type: "button",
              className: "w-full text-left text-xs rounded-lg px-2 py-1.5 hover:bg-zinc-200/40 dark:hover:bg-zinc-800",
              onClick: () => {
                (async () => (await kt(Q.folder.path), q(null)))();
              },
              children: x("导入文件…")
            }), c.jsx("button", {
              type: "button",
              className: "w-full text-left text-xs rounded-lg px-2 py-1.5 hover:bg-zinc-200/40 dark:hover:bg-zinc-800",
              onClick: () => {
                Ft(Q.folder.path), q(null);
              },
              children: x("新建文件夹")
            }), c.jsx("button", {
              type: "button",
              className: "w-full text-left text-xs rounded-lg px-2 py-1.5 hover:bg-zinc-200/40 dark:hover:bg-zinc-800",
              onClick: () => {
                re(Q.folder.path), q(null);
              },
              children: x("重命名")
            }), c.jsx("button", {
              type: "button",
              className: "w-full text-left text-xs rounded-lg px-2 py-1.5 hover:bg-zinc-200/40 dark:hover:bg-zinc-800",
              onClick: () => de(!0),
              children: x("移动到...")
            }), !Oe && c.jsx("button", {
              type: "button",
              className: "w-full text-left text-xs rounded-lg px-2 py-1.5 hover:bg-zinc-200/40 dark:hover:bg-zinc-800",
              onClick: async () => {
                await ze("已创建文件夹副本", () => y(Q.folder.path)), q(null);
              },
              children: x("创建副本")
            }), c.jsx("button", {
              type: "button",
              className: "w-full text-left text-xs rounded-lg px-2 py-1.5 hover:bg-zinc-200/40 dark:hover:bg-zinc-800",
              onClick: async () => {
                window.confirm(x("将永久删除「{0}」及其中所有文件，是否继续？", Q.folder.name)) && (await ze("已删除文件夹", async () => {
                  await b(Q.folder.path), B(un => bte(un, Q.folder.path, null, !0));
                }), q(null));
              },
              children: x("删除")
            })]
          })
        }), e && le && c.jsx(Zan, {
          x: le.x,
          y: le.y,
          isDark: r,
          busy: be,
          onClose: () => J(null),
          children: pe ? c.jsxs(c.Fragment, {
            children: [c.jsx("button", {
              type: "button",
              className: "w-full text-left text-xs rounded-lg px-2 py-1.5 hover:bg-zinc-200/40 dark:hover:bg-zinc-800",
              onClick: () => ce(!1),
              children: x("返回")
            }), vt.length === 0 && c.jsx("p", {
              className: "p-3 text-xs opacity-50",
              children: x("没有可移动到的文件夹")
            }), vt.map(un => c.jsx("button", {
              type: "button",
              onClick: async () => {
                await pt(le.asset.path, un.path, le.asset.name), J(null);
              },
              title: un.path,
              className: "w-full text-left text-xs rounded-lg px-2 py-1.5 hover:bg-zinc-200/40 dark:hover:bg-zinc-800",
              children: un.name
            }, un.path))]
          }) : c.jsxs(c.Fragment, {
            children: [Yt && (le.asset.kind === "image" || le.asset.kind === "video" || le.asset.kind === "audio") && c.jsx("button", {
              type: "button",
              className: "w-full text-left text-xs rounded-lg px-2 py-1.5 hover:bg-zinc-200/40 dark:hover:bg-zinc-800",
              onClick: () => {
                Promise.resolve(Yt(le.asset)), J(null);
              },
              children: x("应用到画布")
            }), c.jsx("button", {
              type: "button",
              className: "w-full text-left text-xs rounded-lg px-2 py-1.5 hover:bg-zinc-200/40 dark:hover:bg-zinc-800",
              onClick: () => {
                Ht(le.asset), J(null);
              },
              children: j.has(le.asset.path) ? x("取消收藏") : x("收藏")
            }), c.jsx("button", {
              type: "button",
              className: "w-full text-left text-xs rounded-lg px-2 py-1.5 hover:bg-zinc-200/40 dark:hover:bg-zinc-800",
              onClick: () => {
                gt(le.asset), J(null);
              },
              children: x("下载")
            }), c.jsx("button", {
              type: "button",
              className: "w-full text-left text-xs rounded-lg px-2 py-1.5 hover:bg-zinc-200/40 dark:hover:bg-zinc-800",
              onClick: () => {
                X(le.asset.path), J(null);
              },
              children: x("重命名")
            }), c.jsx("button", {
              type: "button",
              className: "w-full text-left text-xs rounded-lg px-2 py-1.5 hover:bg-zinc-200/40 dark:hover:bg-zinc-800",
              onClick: () => ce(!0),
              children: x("移动到...")
            }), c.jsx("button", {
              type: "button",
              className: "w-full text-left text-xs rounded-lg px-2 py-1.5 hover:bg-zinc-200/40 dark:hover:bg-zinc-800",
              onClick: async () => {
                const un = await ze("已创建素材副本", () => w(le.asset.path, le.parentPath, le.asset.name));
                un && ue(un), J(null);
              },
              children: x("创建副本")
            }), c.jsx("button", {
              type: "button",
              className: "w-full text-left text-xs rounded-lg px-2 py-1.5 hover:bg-zinc-200/40 dark:hover:bg-zinc-800",
              onClick: async () => {
                await lt(le.asset.path, le.parentPath), J(null);
              },
              children: x("删除")
            })]
          })
        })]
      })
    }) : null;
  },
  $$a = Object.freeze(Object.defineProperty({
    __proto__: null,
    MaterialLibrarySidebar: ein,
    default: ein
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  G$a = ({
    isOpen: e,
    isDark: t,
    characterLibrary: n,
    onClose: r,
    onCreateCharacter: a,
    onDeleteCharacter: i
  }) => (on(), c.jsxs("div", {
    className: `side-panel-shell absolute left-0 top-2 bottom-2 w-[240px] z-40 flex flex-col transition-all duration-300 ease-in-out rounded-2xl ${e ? "translate-x-0" : "-translate-x-full"} ${t ? "bg-[#121214] border border-zinc-800 shadow-none" : "bg-zinc-50 border border-[rgba(0,0,0,0.18)] shadow-none"}`,
    style: {
      pointerEvents: e ? "auto" : "none"
    },
    children: [c.jsxs("div", {
      className: `p-3 border-b flex justify-between items-center ${t ? "border-zinc-800" : "border-zinc-200"}`,
      children: [c.jsx("h3", {
        className: `font-bold text-xs ${t ? "text-zinc-300" : "text-zinc-700"}`,
        children: x("Sora 角色库")
      }), c.jsxs("div", {
        className: "flex items-center gap-2",
        children: [c.jsx("button", {
          type: "button",
          onClick: a,
          className: `px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-colors ${t ? "cursor-pointer bg-transparent text-zinc-100 border-zinc-500 hover:bg-zinc-800/60" : "cursor-pointer bg-zinc-900 text-white border-zinc-900 hover:bg-black"}`,
          children: x("新建角色")
        }), c.jsx("button", {
          type: "button",
          "aria-label": x("关闭角色库"),
          onClick: r,
          children: c.jsx(Na, {
            size: 12,
            className: t ? "text-zinc-500" : "text-zinc-400"
          })
        })]
      })]
    }), c.jsx("div", {
      className: "flex-1 overflow-y-auto custom-scrollbar p-3",
      children: n.length === 0 ? c.jsx("div", {
        className: `text-center py-8 text-sm ${t ? "text-zinc-500" : "text-zinc-400"}`,
        children: x('暂无角色，点击"新建角色"开始创建')
      }) : c.jsx("div", {
        className: "grid grid-cols-2 gap-3",
        children: n.map(o => c.jsxs("div", {
          className: `group rounded-lg overflow-hidden border cursor-pointer transition-colors ${t ? "bg-zinc-900 border-zinc-800 hover:border-zinc-500" : "bg-white border-zinc-200 hover:border-zinc-400"}`,
          children: [c.jsxs("div", {
            className: "aspect-square bg-zinc-800 relative",
            children: [o.imageUrl ? c.jsx("img", {
              src: o.imageUrl,
              alt: o.name,
              className: "w-full h-full object-cover"
            }) : c.jsx("div", {
              className: "w-full h-full flex items-center justify-center text-zinc-500",
              children: c.jsx(jY, {
                size: 24
              })
            }), c.jsx("button", {
              onClick: s => {
                s.stopPropagation(), confirm(x('确定要删除角色 "{0}" 吗？', o.name)) && i(o.id);
              },
              className: "absolute top-1 right-1 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10",
              title: x("删除角色"),
              children: c.jsx(Qo, {
                size: 12
              })
            })]
          }), c.jsx("div", {
            className: "p-2",
            children: c.jsx("p", {
              className: `text-xs truncate ${t ? "text-zinc-300" : "text-zinc-700"}`,
              children: o.name
            })
          })]
        }, o.id))
      })
    })]
  })),
  tin = g.memo(G$a),
  V$a = Object.freeze(Object.defineProperty({
    __proto__: null,
    CharactersSidebar: tin,
    default: tin
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  H$a = 41595,
  I7 = `http://127.0.0.1:${H$a}`,
  W$a = 41596;

function lOt() {
  if (typeof window > "u") return !1;
  const e = window;
  return !!(e.__TAURI_INTERNALS__ || e.__TAURI__);
}

function cOt() {
  return lOt() && !0;
}

const yCe = `http://127.0.0.1:${W$a}`,
  q$a = "http://127.0.0.1:41600/proxy";

async function oke(e, t, n) {
  await O4e();
  const r = await fetch(q$a, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url: e,
        method: t.toUpperCase(),
        headers: n ? {
          "Content-Type": "application/json"
        } : {},
        body: n ?? void 0
      })
    }),
    a = await r.text();
  if (!r.ok) throw new Error(a || `Proxy failed: ${r.status}`);
  return a;
}

let yJ = yCe,
  oj = !1;

function ztr() {
  oj = !1, yJ = yCe;
}

async function Utr(e) {
  const t = `/api/eagle-proxy${e}`;
  if (cOt()) {
    const r = oj ? I7 : yJ;
    try {
      return await oke(`${r}${e}`, "GET");
    } catch (a) {
      if (!oj && r === yCe) return oj = !0, yJ = I7, await oke(`${I7}${e}`, "GET");
      throw a;
    }
  }
  const n = `${I7}${e}`;
  if (lOt()) {
    const {
      invoke: r
    } = await Ie(async () => {
      const {
        invoke: a
      } = await Promise.resolve().then(() => sd);
      return {
        invoke: a
      };
    }, void 0, import.meta.url);
    return await r("proxy_fetch", {
      url: n,
      method: "GET",
      headers: {},
      body: void 0,
      timeoutSecs: 30
    });
  }
  try {
    return (await fetch(t, {
      method: "GET"
    })).text();
  } catch {
    return (await fetch(n, {
      method: "GET"
    })).text();
  }
}

async function K$a(e, t) {
  const n = `/api/eagle-proxy${e}`,
    r = {
      "Content-Type": "application/json"
    };
  if (cOt()) {
    const i = oj ? I7 : yJ;
    try {
      return await oke(`${i}${e}`, "POST", t);
    } catch (o) {
      if (!oj && i === yCe) return oj = !0, yJ = I7, await oke(`${I7}${e}`, "POST", t);
      throw o;
    }
  }
  const a = `${I7}${e}`;
  if (lOt()) {
    const {
      invoke: i
    } = await Ie(async () => {
      const {
        invoke: o
      } = await Promise.resolve().then(() => sd);
      return {
        invoke: o
      };
    }, void 0, import.meta.url);
    return await i("proxy_fetch", {
      url: a,
      method: "POST",
      headers: r,
      body: t,
      timeoutSecs: 120
    });
  }
  try {
    return (await fetch(n, {
      method: "POST",
      headers: r,
      body: t
    })).text();
  } catch {
    return (await fetch(a, {
      method: "POST",
      headers: r,
      body: t
    })).text();
  }
}

async function bCe(e) {
  const t = await Utr(e),
    n = JSON.parse(t);
  if (n.status !== "success") throw new Error("Eagle API 返回失败");
  return n.data;
}

async function vCe() {
  if (cOt()) {
    const e = async t => {
      const n = await oke(t, "GET");
      return JSON.parse(n).status === "success";
    };
    if (!oj) try {
      if (await e(`${yCe}/api/folder/list`)) return !0;
    } catch {
      oj = !0, yJ = I7;
    }
    try {
      if (await e(`${yJ}/api/folder/list`)) return !0;
    } catch {}
    return !1;
  }
  try {
    const e = await Utr("/api/folder/list");
    return JSON.parse(e).status === "success";
  } catch {
    return !1;
  }
}

async function $tr() {
  const e = await bCe("/api/folder/list");
  return Array.isArray(e) ? e : [];
}

async function ske() {
  return bCe("/api/library/info");
}

function dOt(e, t) {
  var n;
  for (const r of e) {
    if (r.id === t) return r;
    if ((n = r.children) != null && n.length) {
      const a = dOt(r.children, t);
      if (a) return a;
    }
  }
}

async function Gtr(e) {
  const t = new URLSearchParams();
  e != null && e.folders && t.set("folders", e.folders), t.set("limit", String(e.limit)), (e == null ? void 0 : e.offset) != null && t.set("offset", String(e.offset)), e != null && e.orderBy && t.set("orderBy", e.orderBy), e != null && e.keyword && t.set("keyword", e.keyword);
  const n = t.toString(),
    r = await bCe(`/api/item/list${n ? `?${n}` : ""}`);
  return Array.isArray(r) ? r : [];
}

async function jwt(e) {
  try {
    const t = await bCe(`/api/item/thumbnail?id=${encodeURIComponent(e)}`);
    return typeof t == "string" ? t : null;
  } catch {
    return null;
  }
}

async function lke(e) {
  const t = await bCe(`/api/item/info?id=${encodeURIComponent(e)}`);
  if (t.filePath || t.path) return t.filePath || t.path || null;
  const n = await ske();
  return uOt(n.library.path, t);
}

function uOt(e, t) {
  if (!e || !t.id || !t.name || !t.ext || [t.id, t.name, t.ext].some(n => /[/\\]/.test(n) || n === "..")) throw new Error("Eagle 文件路径无效");
  return `${e.replace(/[/\\]+$/, "")}/images/${t.id}.info/${t.name}.${t.ext}`;
}

function Q$a(e) {
  var i, o, s;
  const t = (o = (i = e.match(/^data:([^;,]+)/i)) == null ? void 0 : i[1]) == null ? void 0 : o.toLowerCase();
  if (t) return t === "image/jpeg" || t === "image/jpg" ? "jpg" : t === "image/png" ? "png" : t === "image/webp" ? "webp" : t === "image/gif" ? "gif" : t === "image/bmp" ? "bmp" : t.startsWith("video/") ? t.includes("webm") ? "webm" : t.includes("quicktime") ? "mov" : "mp4" : t.startsWith("audio/") ? t.includes("mpeg") || t.includes("mp3") ? "mp3" : t.includes("wav") ? "wav" : "mp3" : ((s = t.split("/")[1]) == null ? void 0 : s.replace(/[^a-z0-9]+/gi, "")) || null;
  const r = (e.split("?")[0] || "").match(/\.([a-z0-9]{2,5})$/i);
  if (!r) return null;
  const a = r[1].toLowerCase();
  return a === "jpeg" ? "jpg" : a;
}

function Y$a(e, t) {
  const n = Q$a(t);
  return n ? `${(String(e || "Generated").trim() || "Generated").replace(/(?:\.(?:png|jpe?g|webp|gif|bmp|mp4|webm|mov|mp3|wav|m4a))+$/i, "") || "Generated"}.${n}` : e;
}

async function PXe(e, t) {
  const r = {
    items: e.map(s => ({
      ...s,
      name: Y$a(s.name, s.url)
    }))
  };
  t && (r.folderId = t);
  const a = JSON.stringify(r),
    i = await K$a("/api/item/addFromURLs", a);
  if (JSON.parse(i).status !== "success") throw new Error("Eagle 添加失败");
}

const Dwt = Object.freeze(Object.defineProperty({
  __proto__: null,
  addItemsToEagle: PXe,
  buildEagleFilePath: uOt,
  checkEagleAvailable: vCe,
  findEagleFolderById: dOt,
  getEagleFolders: $tr,
  getEagleItemFilePath: lke,
  getEagleItemThumbnailPath: jwt,
  getEagleItems: Gtr,
  getEagleLibraryInfo: ske,
  resetEaglePackagedFallback: ztr
}, Symbol.toStringTag, {
  value: "Module"
}));

function o7e(e, t, n) {
  return Math.max(t, Math.min(n, e));
}

function Vtr(e) {
  if (!Number.isFinite(e) || e < 0) return "0:00";
  const t = Math.floor(e),
    n = Math.floor(t / 60),
    r = t % 60;
  return `${n}:${String(r).padStart(2, "0")}`;
}

function X$a(e) {
  return e > 0 ? Vtr(e) : "--:--";
}

function Mit(e, t) {
  return `${Vtr(e)} / ${X$a(t)}`;
}

function J$a(e, t) {
  const n = t ? 0 : Math.round(o7e(e, 0, 1) * 100);
  return {
    background: `linear-gradient(to right, rgba(255,255,255,.95) ${n}%, rgba(255,255,255,.28) ${n}%)`
  };
}

const RXe = g.forwardRef(function ({
  src: t,
  poster: n,
  className: r,
  videoClassName: a,
  defaultMuted: i = !0,
  defaultControlsVisible: o = !1,
  preload: s = "metadata",
  autoPlay: l = !1,
  canvasHoverPlayback: d = !1,
  loop: u = !1,
  releaseOnUnmount: h = !1,
  playsInline: p = !0,
  onMouseDown: m,
  onClick: f,
  onDoubleClick: y,
  onPlay: b,
  onPause: v,
  onLoadedData: _,
  onLoadedMetadata: w,
  onCanPlay: k,
  onError: A,
  onExtractCurrentFrame: S,
  isExtractingCurrentFrame: C = !1,
  trailingControls: I,
  clipStartSec: E,
  clipEndSec: M,
  keyboardActive: T = !1,
  showCenterPlayButton: P = !1,
  selected: R = !1,
  hovered: j = !1,
  pointerPassthrough: B = !1
}, F) {
  on();
  const N = g.useRef(null),
    G = g.useRef(null);
  g.useImperativeHandle(F, () => G.current, []);
  const z = g.useMemo(() => {
      const Re = Number.isFinite(E) ? Math.max(0, Number(E)) : 0,
        $e = Number.isFinite(M) && Number(M) > Re + .05 ? Number(M) : null;
      return {
        start: Re,
        end: $e,
        active: Re > .02 || $e != null
      };
    }, [E, M]),
    [V, O] = g.useState(0),
    [L, D] = g.useState(0),
    [U, H] = g.useState(!1),
    [Y, K] = g.useState(i),
    [W, Q] = g.useState(1),
    [q, ne] = g.useState(!1),
    [de, le] = g.useState(!1),
    [J, pe] = g.useState(!1),
    ce = g.useRef(null),
    we = g.useRef(null),
    X = g.useRef(R);
  X.current = R;
  const Z = G.current && Number.isFinite(G.current.currentTime) ? G.current.currentTime : L,
    re = z.end != null ? Math.max(.001, z.end - z.start) : Math.max(.001, V - z.start),
    fe = z.active ? Math.max(0, Z - z.start) : Z,
    ye = z.active ? re : V,
    ie = g.useCallback((Re, $e) => {
      const rt = z.active ? z.start : 0,
        nt = z.end != null ? z.end : $e,
        ze = Math.max(.001, nt - rt),
        Le = z.active ? Math.max(0, Re - z.start) : Re,
        Ke = z.active ? ze : $e,
        Xe = Ke > 0 ? o7e(Le / Ke * 100, 0, 100) : 0,
        De = N.current;
      De && (De.classList.contains("is-controls-visible") || De.classList.contains("is-playing")) && (ce.current && (ce.current.style.width = `${Xe}%`), we.current && (we.current.textContent = Mit(Le, Ke)));
    }, [z]),
    ae = g.useCallback(Re => {
      if (z.active) {
        if (Re.currentTime < z.start) {
          Re.currentTime = z.start;
          return;
        }
        if (z.end != null && Re.currentTime >= z.end - .04) {
          if (u) {
            Re.currentTime = z.start;
            return;
          }
          Re.pause(), Re.currentTime = z.end;
        }
      }
    }, [z, u]);
  g.useEffect(() => {
    const Re = G.current;
    Re && (Re.muted = i, K(i));
  }, [i, t]), g.useEffect(() => {
    const Re = G.current;
    if (!Re) return;
    if (!l) {
      if (!d && !Re.paused && X.current) return;
      Re.paused || Re.pause();
      return;
    }
    Re.muted = !0;
    let $e = !1,
      rt = 0,
      nt = !1;
    const ze = () => {
        var Xe;
        $e || !l || Re.dataset.userControlled === "true" && Re.dataset.userPlaying === "false" || (Xe = N.current) != null && Xe.closest(".node-wrapper") && Yi() || (Re.muted = !0, Re.play().catch(() => {}));
      },
      Le = () => {
        if (!($e || !l)) {
          if (z.active && (Re.currentTime < z.start - .02 || z.end != null && Re.currentTime >= z.end - .05 || Re.currentTime < z.start)) {
            if (nt) return;
            nt = !0;
            const De = () => {
              Re.removeEventListener("seeked", De), ze();
            };
            Re.addEventListener("seeked", De);
            try {
              Re.currentTime = z.start;
            } catch {
              ze();
              return;
            }
            rt = window.setTimeout(() => {
              Re.removeEventListener("seeked", De), ze();
            }, 450);
            return;
          }
          ze();
        }
      },
      Ke = () => ae(Re);
    return Re.readyState >= 1 && Le(), Re.addEventListener("loadedmetadata", Le), Re.addEventListener("canplay", Le), Re.addEventListener("playing", Ke), () => {
      $e = !0, rt && window.clearTimeout(rt), Re.removeEventListener("loadedmetadata", Le), Re.removeEventListener("canplay", Le), Re.removeEventListener("playing", Ke);
    };
  }, [l, d, t, z.active, z.start, z.end, ae]), g.useEffect(() => {
    if (R) return;
    const Re = G.current;
    !Re || l || q || Re.paused || Re.pause();
  }, [R, l, q]), g.useEffect(() => {
    if (!h) return;
    const Re = G.current;
    return () => {
      if (Re) try {
        Re.pause(), Re.removeAttribute("src"), Re.load();
      } catch {}
    };
  }, [h]), g.useEffect(() => {
    ne(!1), le(!1), pe(!1);
  }, [t]), g.useEffect(() => {
    (j || l) && ne(!0);
  }, [j, l]), g.useEffect(() => {
    const Re = N.current;
    Re != null && Re.matches(":hover") && ne(!0);
  }, [t, j, l]);
  const be = g.useCallback(Re => {
      const $e = Number.isFinite(Re.duration) ? Re.duration : 0,
        rt = Number.isFinite(Re.currentTime) ? Re.currentTime : 0;
      O($e), D(rt), K(!!Re.muted), H(!Re.paused), ie(rt, $e);
    }, [ie]),
    Ee = g.useCallback(Re => {
      ae(Re);
      const $e = Re.currentTime;
      Number.isFinite($e) && (D($e), ie($e, Number.isFinite(Re.duration) ? Re.duration : V));
    }, [ae, ie, V]),
    xe = g.useCallback(Re => {
      ae(Re), Number.isFinite(Re.currentTime) && ie(Re.currentTime, Number.isFinite(Re.duration) ? Re.duration : V);
    }, [ae, ie, V]);
  g.useLayoutEffect(() => {
    const Re = G.current;
    Re && xe(Re);
  }), g.useEffect(() => {
    const Re = G.current;
    !Re || !z.active || Re.paused && (Re.currentTime < z.start || z.end != null && Re.currentTime >= z.end) && (Re.currentTime = z.start, D(z.start), ie(z.start, Number.isFinite(Re.duration) ? Re.duration : V));
  }, [z.active, z.start, z.end, ie, V]);
  const he = g.useCallback(Re => {
      const $e = G.current;
      if (!$e || !Number.isFinite($e.duration) || $e.duration <= 0) return;
      const rt = z.active ? z.start : 0,
        nt = z.end != null ? z.end : $e.duration,
        ze = Math.min(nt, Math.max(rt, $e.currentTime + Re));
      $e.currentTime = ze, D(ze), ie(ze, $e.duration);
    }, [z, ie]),
    ue = g.useCallback(async () => {
      const Re = G.current;
      if (Re) try {
        Re.paused ? (Re.dataset.userControlled = "true", Re.dataset.userPlaying = "true", z.active && (Re.currentTime < z.start || z.end != null && Re.currentTime >= z.end - .05) && (Re.currentTime = z.start, D(z.start)), await Re.play()) : (Re.dataset.userControlled = "true", Re.dataset.userPlaying = "false", Re.pause());
      } catch {}
    }, [z]);
  g.useEffect(() => {
    if (!T) return;
    const Re = $e => {
      const rt = $e.target;
      if (!(rt && (rt.closest('input, textarea, select, [contenteditable="true"]') || rt.isContentEditable))) {
        if ($e.key === " " || $e.code === "Space") {
          $e.preventDefault(), ue();
          return;
        }
        if ($e.key === "ArrowLeft") {
          $e.preventDefault(), he(-5);
          return;
        }
        $e.key === "ArrowRight" && ($e.preventDefault(), he(5));
      }
    };
    return window.addEventListener("keydown", Re), () => window.removeEventListener("keydown", Re);
  }, [T, ue, he]);
  const ge = g.useCallback(() => {
      const Re = G.current;
      Re && (Re.muted = !Re.muted, !Re.muted && Re.volume <= 0 && (Re.volume = W > 0 ? W : 1, Q(Re.volume)), K(!!Re.muted));
    }, [W]),
    _e = g.useCallback(Re => {
      const $e = G.current,
        rt = o7e(Number(Re) / 100, 0, 1),
        nt = rt === 0;
      Q(rt), K(nt), $e && ($e.volume = rt, $e.muted = nt);
    }, []),
    ke = g.useRef(!1),
    ve = g.useRef(null),
    Te = g.useCallback(Re => {
      const $e = G.current,
        rt = ve.current;
      if (!$e || !rt || !Number.isFinite($e.duration) || $e.duration <= 0) return;
      const nt = rt.getBoundingClientRect();
      if (!nt.width) return;
      const ze = o7e((Re - nt.left) / nt.width, 0, 1),
        Le = z.active ? z.start : 0,
        Ke = z.end != null ? z.end : $e.duration,
        Xe = Le + ze * Math.max(.001, Ke - Le);
      $e.currentTime = Xe, D(Xe), ie(Xe, $e.duration);
    }, [z, ie]);
  g.useEffect(() => {
    const Re = rt => {
        ke.current && (rt.preventDefault(), Te(rt.clientX));
      },
      $e = rt => {
        ke.current && (rt.preventDefault(), ke.current = !1);
      };
    return window.addEventListener("pointermove", Re, {
      passive: !1
    }), window.addEventListener("pointerup", $e, {
      passive: !1
    }), window.addEventListener("pointercancel", $e, {
      passive: !1
    }), () => {
      window.removeEventListener("pointermove", Re), window.removeEventListener("pointerup", $e), window.removeEventListener("pointercancel", $e);
    };
  }, [Te]);
  const Ne = g.useCallback(Re => {
      if (Re.preventDefault(), Re.stopPropagation(), !(Re.button !== 0 && Re.pointerType === "mouse")) {
        ke.current = !0, ve.current = Re.currentTarget;
        try {
          Re.currentTarget.setPointerCapture(Re.pointerId);
        } catch {}
        Te(Re.clientX);
      }
    }, [Te]),
    me = g.useCallback(async () => {
      const Re = G.current;
      Re && S && (await S(Re));
    }, [S]),
    Ae = g.useCallback(Re => {
      Re.pointerType !== "touch" && ne(!0);
    }, []),
    Fe = g.useCallback(Re => {
      Re.pointerType !== "touch" && (Re.currentTarget.matches(":hover") || (ne(!1), le(!1)));
    }, []),
    Me = o || q || j || U || l;
  return c.jsxs("div", {
    ref: N,
    className: `simple-video-player group bg-transparent${U ? " is-playing" : ""}${Me ? " is-controls-visible" : ""}${B ? " is-pointer-passthrough" : ""} ${r || ""}`,
    onPointerEnter: Ae,
    onPointerLeave: Fe,
    onMouseEnter: () => ne(!0),
    onMouseLeave: Re => {
      Re.currentTarget.matches(":hover") || (ne(!1), le(!1));
    },
    onFocusCapture: () => ne(!0),
    onBlurCapture: Re => {
      Re.currentTarget.contains(Re.relatedTarget) || ne(!1);
    },
    onPointerDown: Re => {
      var rt;
      const $e = Re.target;
      (rt = $e == null ? void 0 : $e.closest) != null && rt.call($e, "[data-simple-video-controls]") && Re.stopPropagation();
    },
    onMouseDown: Re => {
      Re.target.closest("[data-simple-video-controls]") && Re.stopPropagation();
    },
    children: [P && !U ? c.jsx("button", {
      type: "button",
      className: "absolute inset-0 z-[6] flex items-center justify-center bg-transparent",
      "aria-label": "play",
      onPointerDown: Re => Re.stopPropagation(),
      onMouseDown: Re => Re.stopPropagation(),
      onClick: Re => {
        Re.preventDefault(), Re.stopPropagation(), ue();
      },
      children: c.jsx(Ol, {
        size: 56,
        className: "text-neutral-100 drop-shadow-md",
        fill: "currentColor"
      })
    }) : null, c.jsx("video", {
      ref: G,
      "data-canvas-hover-playback": d || void 0,
      src: t,
      poster: n,
      className: `h-full w-full cursor-grab object-contain ${a || ""}`,
      draggable: !1,
      playsInline: p,
      controls: !1,
      controlsList: "nodownload nofullscreen noremoteplayback noplaybackrate",
      disablePictureInPicture: !0,
      preload: s,
      autoPlay: l && !z.active && !d,
      loop: u && !z.active,
      muted: i,
      onLoadedData: Re => {
        be(Re.currentTarget), _ == null || _(Re);
      },
      onLoadedMetadata: Re => {
        z.active && (Re.currentTarget.currentTime = z.start), be(Re.currentTarget), w == null || w(Re);
      },
      onCanPlay: Re => {
        be(Re.currentTarget), k == null || k(Re);
      },
      onTimeUpdate: Re => xe(Re.currentTarget),
      onPlay: Re => {
        const $e = Re.currentTarget;
        z.active && $e.currentTime < z.start - .02 && ($e.currentTime = z.start), ae($e), H(!0), b == null || b(Re);
      },
      onPause: Re => {
        Ee(Re.currentTarget), H(!1), v == null || v(Re);
      },
      onVolumeChange: Re => {
        const $e = Re.currentTarget;
        K(!!$e.muted), Number.isFinite($e.volume) && Q($e.volume);
      },
      onMouseDown: m,
      onClick: f,
      onDoubleClick: y,
      onError: A
    }), c.jsxs("div", {
      "data-simple-video-controls": !0,
      className: "video-hover-controls nodrag",
      role: "group",
      "aria-label": x("视频播放控制"),
      style: {
        display: Me ? "flex" : "none"
      },
      onPointerDown: Re => Re.stopPropagation(),
      onMouseDown: Re => Re.stopPropagation(),
      onClick: Re => Re.stopPropagation(),
      onDoubleClick: Re => Re.stopPropagation(),
      children: [c.jsx("button", {
        type: "button",
        className: "video-hover-action",
        title: x(U ? "暂停" : "播放"),
        "aria-label": x(U ? "暂停" : "播放"),
        onClick: Re => {
          Re.preventDefault(), Re.stopPropagation(), ue();
        },
        children: U ? c.jsx(d3, {
          size: 16
        }) : c.jsx(Ol, {
          size: 16
        })
      }), c.jsx("div", {
        ref: ve,
        role: "slider",
        "aria-label": x("播放进度"),
        "aria-valuemin": 0,
        "aria-valuemax": ye || 0,
        "aria-valuenow": fe,
        "aria-valuetext": Mit(fe, ye),
        className: "video-progress-track nodrag",
        onPointerDown: Ne,
        onClick: Re => Re.stopPropagation(),
        onMouseDown: Re => Re.stopPropagation(),
        children: c.jsx("div", {
          ref: ce,
          className: "video-progress-fill"
        })
      }), c.jsx("span", {
        ref: we,
        className: "video-hover-time",
        children: Mit(fe, ye)
      }), c.jsxs("div", {
        className: "video-volume-wrap",
        onMouseEnter: () => le(!0),
        onMouseLeave: () => {
          J || le(!1);
        },
        children: [de || J ? c.jsx("div", {
          className: "video-volume-popup",
          children: c.jsx("div", {
            className: "video-volume-popup-inner nodrag",
            children: c.jsx("input", {
              type: "range",
              className: "video-volume-slider nodrag",
              min: 0,
              max: 100,
              step: 1,
              value: Y ? 0 : Math.round(W * 100),
              style: J$a(W, Y),
              "aria-label": x("音量"),
              onPointerDown: Re => {
                Re.stopPropagation(), pe(!0);
              },
              onPointerUp: () => pe(!1),
              onPointerCancel: () => pe(!1),
              onClick: Re => Re.stopPropagation(),
              onMouseDown: Re => Re.stopPropagation(),
              onChange: Re => _e(Number(Re.target.value))
            })
          })
        }) : null, c.jsx("button", {
          type: "button",
          className: "video-hover-action",
          title: x(Y ? "取消静音" : "静音"),
          "aria-label": x(Y ? "取消静音" : "静音"),
          onClick: Re => {
            Re.preventDefault(), Re.stopPropagation(), ge();
          },
          children: Y || W <= 0 ? c.jsx(DY, {
            size: 16
          }) : c.jsx(B5, {
            size: 16
          })
        })]
      }), S ? c.jsx("button", {
        type: "button",
        disabled: C,
        className: "video-hover-action video-hover-text-btn",
        title: x("截取当前帧"),
        onClick: Re => {
          Re.preventDefault(), Re.stopPropagation(), me();
        },
        children: C ? c.jsx(Ua, {
          size: 12,
          className: "animate-spin"
        }) : x("截取当前帧")
      }) : null, I]
    })]
  });
});

function Z$a(e, t, n, r) {
  const a = e,
    i = Math.max(0, Number(r ?? e.selectedMjImageIndex ?? 0)),
    o = a.mjImages && a.mjImages.length > 1 ? M0(a, i) || a.mjImages[i] : void 0,
    s = Wh(o) || Wh(n) || Wh(t) || Wh(e._ossRemoteUrl) || Wh(e.originalUrl) || Wh(e.url) || Go(e._ossRemoteUrl) || Go(e.originalUrl) || Go(e.url);
  return s || n || t || e.originalUrl || e.url || "";
}

function C7(e, t) {
  return !e || kk(e) ? !1 : e.startsWith("blob:") || e.startsWith("data:") ? !0 : t === "video" ? EE(e) : vs(e) ? !0 : !nr(e) && !/^https?:\/\//i.test(e);
}

function eGa(e, t) {
  return !e || kk(e) ? !1 : e.startsWith("blob:") || e.startsWith("data:") || C7(e, t) ? !0 : Mk(e) && !nr(e);
}

function V0e(e, t) {
  return !e || !nr(e) || Ko(e) || /\/thumbnails\//i.test(e) || Iy(e) || Qc(e) ? !1 : t === "video" ? ($o(e) || /\/videos\//i.test(e)) && !tl(e) : !0;
}

function jL(e) {
  return e ? C7(e, "video") ? !0 : !nr(e) || /\/thumbnails\//i.test(e) ? !1 : ($o(e) || /\/videos\//i.test(e)) && !tl(e) : !1;
}

function tGa(e) {
  if (!e || kk(e.url)) return;
  const t = e.type === "video";
  if (e.preferDisplayUrls) {
    for (const o of [e.url, e.originalUrl, e._ossRemoteUrl]) if (!(!o || kk(o)) && !(nr(o) && /\/thumbnails\//i.test(o)) && !(nr(o) && Iy(o))) {
      if (nr(o) && Qc(o)) {
        const s = Wh(o);
        if (s && (!t || jL(s))) return s;
        continue;
      }
      if (!(t && !jL(o))) return nr(o) && (Wh(o) || ya(o)) || o;
    }
    if (!t) {
      for (const o of [e.url, e.originalUrl, e._ossRemoteUrl, e._ossThumbnailUrl, e.thumbnailUrl]) {
        const s = Go(o);
        if (s && !/\/thumbnails\//i.test(s) && !Iy(s)) return ya(s) || s;
      }
      for (const o of [e._ossThumbnailUrl, e.thumbnailUrl, e.url, e.originalUrl]) if (!(!o || !nr(o))) {
        if (/\/thumbnails\//i.test(o)) return ya(o) || o;
        if (Iy(o) && /\/images\//i.test(o)) {
          const s = o.replace(/\/images\//i, "/thumbnails/");
          return ya(s) || s;
        }
      }
    }
    return;
  }
  const n = e,
    r = H4(n);
  if (r) {
    if (!t && Array.isArray(n.mjImages) && n.mjImages.length > 1) {
      const s = M0(n, n.selectedMjImageIndex ?? 0) || n.mjImages[n.selectedMjImageIndex ?? 0],
        l = Wh(s) || Go(s) || "";
      if (l && V0e(l, e.type)) return ya(l) || l;
    }
    const o = Sj(n);
    if (o && (!t || jL(o)) && !/\/thumbnails\//i.test(o) && !/-list\.webp(?:$|\?)/i.test(o)) return ya(o) || o;
    for (const s of [e._ossRemoteUrl, e.originalUrl, e.url]) if (!(!s || !nr(s)) && !(/\/thumbnails\//i.test(s) || /-list\.webp(?:$|\?)/i.test(s)) && !(e._globalOssUrlOnly && Ad(s)) && !(t && !jL(s))) return ya(s) || s;
    if (!t) for (const s of [e._ossRemoteUrl, e.originalUrl, e.url, e._ossThumbnailUrl, e.thumbnailUrl]) {
      if (!s || !nr(s) || e._globalOssUrlOnly && Ad(s)) continue;
      const l = Go(s);
      if (l) return ya(l) || l;
    }
  }
  if (!r && !e._globalOssUrlOnly) {
    for (const o of [e.url, e.originalUrl]) if (C7(o, e.type)) return o;
  }
  for (const o of [e._ossRemoteUrl, e.originalUrl, e.url]) if (!(!o || !nr(o)) && !(e._globalOssUrlOnly && Ad(o)) && !/\/thumbnails\//i.test(o)) {
    if (t) {
      if (jL(o)) return ya(o) || o;
      continue;
    }
    if (/\/images\//i.test(o) || /\/videos\//i.test(o) || /\/Music\//i.test(o)) return ya(o) || o;
  }
  if (r || e._globalOssUrlOnly || Nk(n)) {
    if (!t) for (const o of [e._ossRemoteUrl, e.originalUrl, e.url, e._ossThumbnailUrl, e.thumbnailUrl]) {
      if (e._globalOssUrlOnly && o && Ad(o)) continue;
      const s = Go(o);
      if (s) return s;
    }
    for (const o of [e._ossRemoteUrl, e.originalUrl, e.url]) if (!(!o || !nr(o)) && !/\/thumbnails\//i.test(o) && !(e._globalOssUrlOnly && Ad(o)) && !(t && !jL(o))) return ya(o) || o;
    return;
  }
  const a = [e.url, e.originalUrl];
  for (const o of a) if (o && !(t && !jL(o) && !C7(o, "video")) && (o.startsWith("blob:") || o.startsWith("data:") || !nr(o))) return o;
  const i = e._ossRemoteUrl || e.url || e.originalUrl;
  if (!(t && !jL(i) && !C7(i, "video"))) return i && ya(i);
}

const nGa = .0022,
  Pit = .1,
  Rit = 8,
  Ew = 15;

function H0e(e) {
  const t = Math.max(72, e.height * .14),
    n = Math.max(72, e.height * .14),
    r = Math.max(32, e.width * .06),
    a = Math.max(32, e.width * .06);
  return {
    width: Math.max(64, e.width - r - a),
    height: Math.max(64, e.height - t - n)
  };
}

function nin(e) {
  const t = H0e(new DOMRect(0, 0, window.innerWidth, window.innerHeight)),
    n = e.rect.width / Math.max(e.rect.height, 1),
    r = Math.min(t.height, t.width / n),
    a = r * n;
  return {
    left: (window.innerWidth - a) / 2,
    top: (window.innerHeight - r) / 2,
    width: a,
    height: r
  };
}

function rGa(e) {
  return e.length >= 8 && e[0] === 137 && e[1] === 80 && e[2] === 78 && e[3] === 71 ? "image/png" : e.length >= 3 && e[0] === 255 && e[1] === 216 && e[2] === 255 ? "image/jpeg" : e.length >= 6 && e[0] === 71 && e[1] === 73 && e[2] === 70 && e[3] === 56 ? "image/gif" : e.length >= 12 && e[0] === 82 && e[1] === 73 && e[2] === 70 && e[3] === 70 && e[8] === 87 && e[9] === 69 && e[10] === 66 && e[11] === 80 ? "image/webp" : null;
}

async function aGa(e) {
  if (!e.startsWith("blob:") && !e.startsWith("data:")) return null;
  try {
    const n = await (await fetch(e)).blob();
    if (n.type.startsWith("image/")) return null;
    const r = await n.arrayBuffer(),
      a = rGa(new Uint8Array(r));
    return a ? URL.createObjectURL(new Blob([r], {
      type: a
    })) : null;
  } catch {
    return null;
  }
}

function iGa(e) {
  if (e.length >= 4 && e[0] === 26 && e[1] === 69 && e[2] === 223 && e[3] === 163) return "video/webm";
  for (let t = 0; t <= e.length - 4; t++) if (e[t] === 102 && e[t + 1] === 116 && e[t + 2] === 121 && e[t + 3] === 112) return "video/mp4";
  return null;
}

async function oGa(e) {
  if (!e.startsWith("blob:") && !e.startsWith("data:")) return null;
  try {
    const n = await (await fetch(e)).blob();
    if ((n.type || "").toLowerCase().startsWith("video/")) return null;
    const a = await n.arrayBuffer(),
      i = Math.min(a.byteLength, 256),
      o = new Uint8Array(a.slice(0, i));
    let s = iGa(o);
    return !s && a.byteLength > 32 * 1024 && (s = "video/mp4"), s ? URL.createObjectURL(new Blob([a], {
      type: s
    })) : null;
  } catch {
    return null;
  }
}

const sGa = {
    transition: "none",
    willChange: "auto",
    imageRendering: "auto",
    backfaceVisibility: "visible",
    WebkitBackfaceVisibility: "visible",
    transformStyle: "flat",
    WebkitTransformStyle: "flat",
    transformOrigin: "center center"
  },
  lGa = 16;

function B6e(e, t, n, r, a) {
  if (!e) return;
  const i = lGa / Math.max(n, .05);
  e.style.transform = `translate(${r.x}px, ${r.y}px) rotate(${a}deg) scale(${n})`, e.style.borderRadius = `${i}px`, t && (t.style.borderRadius = `${i}px`, t.style.clipPath = `inset(0 round ${i}px)`);
}

function cGa(e, t) {
  var i, o, s, l;
  if ((i = e.title) != null && i.trim()) return e.title.trim();
  const n = String(e._assetId || "").trim();
  if (n) {
    const d = (s = (o = Ur.getAssetManifestMeta(n)) == null ? void 0 : o.fileName) == null ? void 0 : s.trim();
    if (d) return d.replace(/\\/g, "/").split("/").pop() || d;
  }
  const r = ((l = e.prompt) == null ? void 0 : l.trim()) || "";
  if (r && /\.[a-z0-9]{2,5}$/i.test(r) && !/^blob:/i.test(r)) return r.length > 64 ? `${r.slice(0, 64)}…` : r;
  const a = t || e.url || e.originalUrl || "";
  if (a.startsWith("blob:") || a.startsWith("data:") || a.startsWith("local-asset://")) {
    if (n) {
      const u = (n.includes("/") || n.includes("\\") ? n.replace(/^.*[/\\]/, "") : n).replace(/\.[a-z0-9]{1,8}$/i, "");
      if (u) return `${u}.${e.type === "video" ? "mp4" : "jpg"}`;
    }
    return r ? r.length > 48 ? `${r.slice(0, 48)}…` : r : e.type === "video" ? "本地视频" : "本地图片";
  }
  if (a) try {
    const u = decodeURIComponent(a).replace(/\s+_?[a-z0-9]+\.[a-z0-9]+$/i, "").replace(/\\/g, "/").split("/");
    let h = u[u.length - 1] || "";
    if (h = h.split("?")[0], h = h.replace(/\s+_?[a-z0-9]+\.[a-z0-9]+$/i, "").trim(), h && !/^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(h)) return h;
    const m = new URL(a, "http://local").pathname.split("/").pop();
    if (m) {
      const f = decodeURIComponent(m.split("?")[0]).replace(/\s+_?[a-z0-9]+\.[a-z0-9]+$/i, "").trim();
      if (f && !/^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(f)) return f;
    }
  } catch {
    const d = a.split("/").pop();
    if (d) {
      const u = d.split("?")[0].replace(/\s+_?[a-z0-9]+\.[a-z0-9]+$/i, "").trim();
      if (u && !/^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(u)) return u;
    }
  }
  return r ? r.length > 48 ? `${r.slice(0, 48)}…` : r : "未命名";
}

function dGa(e) {
  return e == null || !Number.isFinite(e) || e <= 0 ? "—" : e < 1024 ? `${e} B` : e < 1024 * 1024 ? `${(e / 1024).toFixed(1)} KB` : `${(e / (1024 * 1024)).toFixed(2)} MB`;
}

function uGa(e) {
  const t = document.querySelector(`[data-node-id="${CSS.escape(e)}"]`);
  return t instanceof HTMLElement ? t.offsetWidth : 0;
}

function hGa({
  src: e,
  nodeId: t,
  origin: n,
  dest: r,
  expanded: a,
  durationMs: i,
  animate: o
}) {
  on();
  const s = rca(a, n.width, r.width, uGa(t)),
    l = o ? `${i}ms ${cW}` : "none";
  return c.jsx("div", {
    className: "absolute z-30",
    onClick: d => d.stopPropagation(),
    style: {
      left: r.left,
      top: r.top,
      width: r.width,
      height: r.height,
      transformOrigin: "top left",
      transform: a ? "none" : gGn(fGn(n, r)),
      transition: o ? `transform ${l}` : "none"
    },
    children: c.jsx("div", {
      style: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: s,
        clipPath: `inset(0 round ${s}px)`,
        transition: o ? `border-radius ${l}, clip-path ${l}` : "none"
      },
      children: c.jsx("img", {
        src: e,
        alt: "",
        draggable: !1,
        className: "block h-full w-full object-cover"
      })
    })
  });
}

function c4({
  label: e,
  onClick: t,
  children: n
}) {
  on();
  const [r, a] = g.useState(!1);
  return c.jsxs("button", {
    type: "button",
    className: "sketch-lightbox-icon-btn",
    onClick: t,
    onMouseEnter: () => a(!0),
    onMouseLeave: () => a(!1),
    "aria-label": e,
    children: [n, r ? c.jsx("span", {
      className: "sketch-lightbox-tooltip",
      children: e
    }) : null]
  });
}

function pGa(e, t) {
  const n = e.width || (t == null ? void 0 : t.width),
    r = e.height || (t == null ? void 0 : t.height);
  return n && r ? `${n} × ${r}` : "";
}

function Nit(e) {
  if (!e || typeof e != "string") return !1;
  const t = e.toLowerCase();
  return (t.includes("prod-ss-vidu") || t.includes("s3") && t.includes("amazonaws")) && (t.includes(".mp4") || t.includes("/video"));
}

function mGa(e) {
  const t = String(e || "").trim();
  return nr(t) && /aliyuncs\.com/i.test(t);
}

function jit(e, t) {
  const n = e == null ? void 0 : e.mjMediaTypes;
  if (n && n.length > 0) {
    const r = n[Math.max(0, Math.min(t, n.length - 1))];
    if (r === "image" || r === "video" || r === "audio") return r;
  }
  return (e == null ? void 0 : e.type) || "image";
}

function fGa({
  item: e,
  onClose: t,
  onNavigate: n,
  onSendToCanvas: r,
  showPromptCopy: a = !0,
  openingMotion: i,
  quickOpen: o = !1,
  skipOpeningAnimation: s = !1,
  isCanvasFullscreen: l = !1,
  canvasContainerRef: d,
  toastLoading: u,
  toastSuccess: h,
  toastError: p,
  removeToast: m
}) {
  var ha, Ga, Za, va, Kt, Pr, kr, Mr;
  on();
  const f = g.useRef(e),
    [y, b] = g.useState("single"),
    [v, _] = g.useState((e == null ? void 0 : e.selectedMjImageIndex) ?? 0),
    w = g.useRef(v),
    k = jit(e, v),
    A = Array.isArray(e == null ? void 0 : e.mjMediaTypes) && (((ha = e == null ? void 0 : e.mjMediaTypes) == null ? void 0 : ha.length) || 0) > 0,
    S = g.useRef(v);
  S.current = v;
  const C = g.useRef(0),
    [I, E] = g.useState([]),
    [M, T] = g.useState(null);
  g.useRef(0);
  const P = g.useRef(null),
    [R, j] = g.useState(null),
    [B, F] = g.useState(1),
    [N, G] = g.useState({
      x: 0,
      y: 0
    }),
    [z, V] = g.useState(!1),
    [O, L] = g.useState(null),
    [D, U] = g.useState(1),
    [H, Y] = g.useState(!1),
    [K, W] = g.useState(null),
    [Q, q] = g.useState(null),
    [ne, de] = g.useState(),
    le = g.useRef(!1),
    J = g.useRef(null),
    [pe, ce] = g.useState(!1),
    [we, X] = g.useState(0),
    [Z, re] = g.useState(null),
    [fe, ye] = g.useState(!1),
    [ie, ae] = g.useState(!1),
    [be, Ee] = g.useState(Wht),
    xe = g.useRef(0),
    he = g.useRef({
      x: 0,
      y: 0,
      translateX: 0,
      translateY: 0
    }),
    ue = g.useRef(!1),
    ge = g.useRef({
      x: 0,
      y: 0
    }),
    _e = g.useRef(null),
    ke = g.useRef(null),
    ve = g.useRef(null),
    Te = g.useRef(null),
    [Ne] = g.useState(() => (e == null ? void 0 : e.type) === "image" || (e == null ? void 0 : e.type) === "video" ? i ?? kyt(e == null ? void 0 : e.id) : null),
    me = g.useRef(Ne),
    Ae = (Ne == null ? void 0 : Ne.backdropBlur) === !1 ? {
      backdropFilter: "none",
      WebkitBackdropFilter: "none",
      background: "rgba(0, 0, 0, 0.72)"
    } : void 0,
    Fe = g.useRef(t);
  Fe.current = t;
  const [Me, Re] = g.useState(me.current && !s ? "enter" : "show"),
    [$e, rt] = g.useState(() => Ne ? nin(Ne) : null),
    [nt, ze] = g.useState(s),
    Le = o ? 160 : dNe,
    Ke = g.useRef(!1),
    Xe = g.useRef(null),
    De = g.useRef(null),
    Ye = g.useRef(1),
    Ce = g.useRef({
      x: 0,
      y: 0
    }),
    He = g.useRef(null),
    Ve = g.useRef(null),
    it = g.useRef({
      scale: 1,
      x: 0,
      y: 0
    }),
    It = g.useRef(null),
    Ft = g.useRef(null),
    We = g.useRef(null),
    Ze = g.useMemo(() => {
      const Hn = [e == null ? void 0 : e._assetId, ...((e == null ? void 0 : e._mjAssetIds) || [])].filter(Boolean);
      return [...new Set(Hn)];
    }, [e == null ? void 0 : e._assetId, e == null ? void 0 : e._mjAssetIds]),
    Ge = tGa(e),
    Oe = fu(Ge) ? Ge : void 0,
    st = g.useMemo(() => {
      if (e) {
        if (e.preferDisplayUrls) for (const Hn of [e.url, e.originalUrl, e._ossRemoteUrl]) {
          const $t = Wh(Hn) || Hn;
          if (V0e($t, e.type) || C7($t, e.type)) return $t;
        }
        if (!e._globalOssUrlOnly && !kk(e.url)) {
          if (e.type === "image" && e._assetId) {
            for (const Hn of [e.url, e.originalUrl]) if (Fwe(Hn, e._assetId)) return Hn;
            return;
          }
          for (const Hn of [e.url, e.originalUrl]) if (C7(Hn, e.type)) return Hn;
        }
      }
    }, [e == null ? void 0 : e.type, e == null ? void 0 : e.url, e == null ? void 0 : e.originalUrl, e == null ? void 0 : e._globalOssUrlOnly, e == null ? void 0 : e._assetId, e == null ? void 0 : e.preferDisplayUrls, e == null ? void 0 : e._ossRemoteUrl]),
    vt = !!(e != null && e._globalOssUrlOnly || H4(e) || e != null && e._ossRemoteUrl && !(e != null && e._assetId) || e && !e._assetId && Nk(e)),
    [Ht, nn] = g.useState(),
    [pt, lt] = g.useState(!1),
    [gt, Ut] = g.useState(!1),
    [_t, At] = g.useState(),
    [Yt, qe] = g.useState(),
    [kt, St] = g.useState(!1),
    [hn, Qt] = g.useState(),
    [Ot, ln] = g.useState();
  g.useEffect(() => {
    if (At(void 0), qe(void 0), !e || e.type !== "image" && e.type !== "video" || !e._assetId || e._globalOssUrlOnly || H4(e) || e.type === "image" && e.preferDisplayUrls || st) {
      St(!1);
      return;
    }
    const Hn = [e.url, e.originalUrl].find(je => Fwe(je, e._assetId));
    if (Hn) {
      At(Hn), qe(e._assetId), St(!1), Qt(e._assetId);
      return;
    }
    St(!0);
    let $t = !1;
    return (async () => {
      var je;
      try {
        const {
            readLocalCacheManifestAssetAsUrl: Qe,
            readLocalOriginalAssetBlob: Mt,
            readLocalOriginalAssetAsUrl: cn,
            readPreviewWindowAssetOriginalUrl: Qn,
            resolveInputImageNodeLightboxUrl: Lt
          } = await Ie(async () => {
            const {
              readLocalCacheManifestAssetAsUrl: fn,
              readLocalOriginalAssetBlob: Zt,
              readLocalOriginalAssetAsUrl: Ln,
              readPreviewWindowAssetOriginalUrl: tt,
              resolveInputImageNodeLightboxUrl: zt
            } = await Promise.resolve().then(() => Ui);
            return {
              readLocalCacheManifestAssetAsUrl: fn,
              readLocalOriginalAssetBlob: Zt,
              readLocalOriginalAssetAsUrl: Ln,
              readPreviewWindowAssetOriginalUrl: tt,
              resolveInputImageNodeLightboxUrl: zt
            };
          }, void 0, import.meta.url),
          ct = e.originalUrl && !kk(e.originalUrl) && !e.originalUrl.startsWith("blob:") ? e.originalUrl : void 0,
          Dt = e.type === "image" ? await Mt(e._assetId, ct) : null,
          bn = await Qe(e._assetId);
        let Rt = (Dt != null && Dt.size ? URL.createObjectURL(Dt) : null) || (e.type === "image" && zg(bn) ? null : bn) || (e.type === "video" ? await cn(e._assetId, ct) : null);
        if (!Rt && e.type === "image") {
          const fn = (await Lt(e._assetId, e.url && !kk(e.url) ? e.url : void 0)) || (await cn(e._assetId, ct));
          fn && !zg(fn) && (Rt = fn);
        }
        if (!Rt && e.type === "image") {
          const fn = (await Qn(e._assetId, e.url)) ?? null;
          fn && !zg(fn) && (Rt = fn);
        }
        if (!Rt && e.type === "image" && !((je = e.mjImages) != null && je.length) && e.id && e.id !== e._assetId) {
          const fn = await Mt(e.id, ct);
          fn != null && fn.size && (Rt = URL.createObjectURL(fn));
        }
        !$t && Rt && (At(Rt), qe(e._assetId));
      } catch {} finally {
        $t || (St(!1), Qt(e._assetId));
      }
    })(), () => {
      $t = !0;
    };
  }, [e == null ? void 0 : e.id, e == null ? void 0 : e.type, e == null ? void 0 : e._assetId, e == null ? void 0 : e.url, e == null ? void 0 : e.originalUrl, e == null ? void 0 : e._globalOssUrlOnly, e == null ? void 0 : e.preferDisplayUrls, st]), g.useEffect(() => {
    ln(void 0);
    const Hn = (e == null ? void 0 : e._mjAssetIds) || [];
    if (!e || e.type !== "image" || !Hn.some(Boolean) || e._globalOssUrlOnly || e.preferDisplayUrls || H4(e)) return;
    let $t = !1;
    return (async () => {
      try {
        const {
            readLocalOriginalAssetBlob: je,
            readLocalOriginalAssetAsUrl: Qe,
            resolveInputImageNodeLightboxUrl: Mt
          } = await Ie(async () => {
            const {
              readLocalOriginalAssetBlob: Lt,
              readLocalOriginalAssetAsUrl: ct,
              resolveInputImageNodeLightboxUrl: Dt
            } = await Promise.resolve().then(() => Ui);
            return {
              readLocalOriginalAssetBlob: Lt,
              readLocalOriginalAssetAsUrl: ct,
              resolveInputImageNodeLightboxUrl: Dt
            };
          }, void 0, import.meta.url),
          cn = (e == null ? void 0 : e.mjImages) || [],
          Qn = await Promise.all(Hn.map(async (Lt, ct) => {
            if (!Lt) return "";
            try {
              const Dt = await je(Lt);
              if (Dt != null && Dt.size) return URL.createObjectURL(Dt);
              const bn = await Mt(Lt, cn[ct]);
              if (bn && !zg(bn)) return bn;
              const Rt = await Qe(Lt);
              return Rt && !zg(Rt) ? Rt : "";
            } catch {
              return "";
            }
          }));
        $t || ln(Qn);
      } catch {
        $t || ln(void 0);
      }
    })(), () => {
      $t = !0;
    };
  }, [e == null ? void 0 : e.id, e == null ? void 0 : e.type, e == null ? void 0 : e._mjAssetIds, e == null ? void 0 : e._globalOssUrlOnly, e == null ? void 0 : e.preferDisplayUrls]), g.useEffect(() => {
    const Hn = Ot;
    return () => {
      Hn == null || Hn.forEach($t => {
        $t != null && $t.startsWith("blob:") && Ie(async () => {
          const {
            isManagedLocalObjectUrl: je
          } = await Promise.resolve().then(() => eU);
          return {
            isManagedLocalObjectUrl: je
          };
        }, void 0, import.meta.url).then(({
          isManagedLocalObjectUrl: je
        }) => {
          je($t) || URL.revokeObjectURL($t);
        });
      });
    };
  }, [Ot]), g.useEffect(() => {
    if (nn(void 0), lt(!1), Ut(!1), !e || e.type !== "image" && e.type !== "video" && e.type !== "audio") return;
    const Hn = Oe,
      $t = e;
    if (!Hn || !nr(Hn)) {
      Ut(!0);
      return;
    }
    let je = !1;
    const Qe = e.type === "video" ? 3e5 : e.type === "audio" ? 12e4 : void 0,
      Mt = !!Hn && V0e(Hn, e.type) && (e.preferDisplayUrls === !0 || e._globalOssUrlOnly === !0 || H4($t) || Nk($t)),
      cn = !Mt && (H4($t) || e._globalOssUrlOnly || Nk($t) || !!(e._ossRemoteUrl && nr(e._ossRemoteUrl) && !/\/thumbnails\//i.test(e._ossRemoteUrl)) || Hn && /\/(images|videos|Music)\//i.test(Hn) && !/\/thumbnails\//i.test(Hn));
    if (Mt) {
      Ut(!0);
      return;
    }
    return cn ? (lt(!0), (async () => {
      try {
        const {
            resolveOssPublicUrlForDisplay: Qn
          } = await Ie(async () => {
            const {
              resolveOssPublicUrlForDisplay: Dt
            } = await Promise.resolve().then(() => l3);
            return {
              resolveOssPublicUrlForDisplay: Dt
            };
          }, void 0, import.meta.url),
          Lt = e._globalOssUrlOnly || H4($t),
          ct = await Qn(Hn, {
            assetId: Lt ? void 0 : e.id,
            downloadTimeoutMs: Qe,
            skipPersist: Lt
          });
        !je && ct && (ct.startsWith("blob:") || ct.startsWith("data:")) && nn(ct);
      } catch (Qn) {
        console.warn("[Lightbox] 全局 OSS 媒体映射失败:", Qn);
      } finally {
        je || (lt(!1), Ut(!0));
      }
    })(), () => {
      je = !0;
    }) : ((async () => {
      try {
        const {
          assetStore: Qn
        } = await Ie(async () => {
          const {
            assetStore: Lt
          } = await Promise.resolve().then(() => Ri);
          return {
            assetStore: Lt
          };
        }, void 0, import.meta.url);
        await Qn.init();
        for (const Lt of Ze) {
          const ct = await Qn.getAssetUrl(Lt);
          if (ct && !nr(ct) && !je) {
            nn(ct);
            return;
          }
        }
        if (e.ossUploaded && us() && !e._globalOssUrlOnly) {
          const Lt = await FVe(e, {});
          Lt.mainUrl && !je && nn(Lt.mainUrl);
        }
      } catch (Qn) {
        console.warn("[Lightbox] OSS/本地回落失败:", Qn);
      }
    })(), () => {
      je = !0;
    });
  }, [e == null ? void 0 : e.id, e == null ? void 0 : e.type, e == null ? void 0 : e.ossUploaded, Oe, Ze, e == null ? void 0 : e._globalOssUrlOnly, e == null ? void 0 : e._ossRemoteUrl]), g.useEffect(() => {
    const Hn = Ht;
    return () => {
      Hn != null && Hn.startsWith("blob:") && Ie(async () => {
        const {
          releaseOssDisplayUrl: $t
        } = await Promise.resolve().then(() => l3);
        return {
          releaseOssDisplayUrl: $t
        };
      }, void 0, import.meta.url).then(({
        releaseOssDisplayUrl: $t
      }) => {
        $t(Hn);
      });
    };
  }, [Ht]), g.useEffect(() => {
    const Hn = _t;
    return () => {
      Hn != null && Hn.startsWith("blob:") && Ie(async () => {
        const {
          isManagedLocalObjectUrl: $t
        } = await Promise.resolve().then(() => eU);
        return {
          isManagedLocalObjectUrl: $t
        };
      }, void 0, import.meta.url).then(({
        isManagedLocalObjectUrl: $t
      }) => {
        $t(Hn) || URL.revokeObjectURL(Hn);
      });
    };
  }, [_t]);
  const Pn = Yt === (e == null ? void 0 : e._assetId) ? _t : void 0,
    rn = !!(e != null && e._assetId) && hn === (e == null ? void 0 : e._assetId) && !Pn,
    Yn = !!(e != null && e._assetId && ((e == null ? void 0 : e.type) === "image" || (e == null ? void 0 : e.type) === "video") && !e._globalOssUrlOnly && !H4(e) && !(e.type === "image" && e.preferDisplayUrls) && kk(e.url) && !rn),
    Ct = !Yn || !!(e != null && e._assetId) && Yt === (e == null ? void 0 : e._assetId) && !!Pn,
    Cn = Yn && !Ct && hn !== (e == null ? void 0 : e._assetId),
    un = vt && !Ht && gt && Oe && nr(Oe) && !/\/thumbnails\//i.test(Oe) ? Oe : void 0,
    Jn = rn && e != null && e.originalUrl && e.originalUrl !== e.url ? e.originalUrl : void 0,
    Kn = (e == null ? void 0 : e.preferDisplayUrls) === !0 || vt && !!Oe && V0e(Oe, e == null ? void 0 : e.type),
    en = Pn || (Kn ? void 0 : st) || Jn || (Yn || Cn || kt ? void 0 : vt ? Kn ? Oe || Ht || un : Ht || un || Oe : Ht || Oe),
    Vn = !!(en && nr(en) && !en.startsWith("blob:") && !en.startsWith("data:") && (vt || e != null && e.preferDisplayUrls || /\/thumbnails\//i.test(en))),
    Tt = st || (e != null && e._assetId && (en != null && en.startsWith("blob:")) && !e._globalOssUrlOnly && !e.preferDisplayUrls ? en : void 0),
    Ue = st ? void 0 : en,
    {
      content: et,
      isLoading: ft,
      hasError: ht
    } = Kp(Ue, {
      useOriginal: !0,
      allowSessionBlob: !!(Ue != null && Ue.startsWith("blob:")),
      blobRecoveryAssetIds: st || vt ? void 0 : Ze,
      allowDirectOssUrl: Vn
    }),
    wt = g.useMemo(() => {
      var je;
      const Hn = (e == null ? void 0 : e.mjImages) || [];
      if (vt || e != null && e.preferDisplayUrls || e != null && e._globalOssUrlOnly) return Hn;
      const $t = (e == null ? void 0 : e.type) === "image" && !(e != null && e._globalOssUrlOnly) && !(e != null && e.preferDisplayUrls) && ((je = e == null ? void 0 : e._mjAssetIds) == null ? void 0 : je.some(Boolean));
      return $t && !Ot ? Hn.map(() => "") : Ot != null && Ot.length ? $t ? Hn.map((Qe, Mt) => Ot[Mt] || "") : Hn.map((Qe, Mt) => Ot[Mt] || Qe) : Hn;
    }, [e == null ? void 0 : e.mjImages, e == null ? void 0 : e.preferDisplayUrls, e == null ? void 0 : e._globalOssUrlOnly, e == null ? void 0 : e._mjAssetIds, Ot, vt]),
    jt = g.useMemo(() => {
      if (wt.length <= 1) return;
      const Hn = wt.length,
        $t = new Set();
      for (let je = -1; je <= 1; je++) $t.add((v + je + Hn) % Hn);
      return [...$t].sort((je, Qe) => je - Qe);
    }, [wt.length, v]),
    bt = j1(wt, {
      useOriginal: !0,
      allowSessionBlob: !0,
      allowDirectOssUrl: vt || (e == null ? void 0 : e.preferDisplayUrls) || (e == null ? void 0 : e._globalOssUrlOnly) === !0,
      blobRecoveryAssetIds: vt ? void 0 : Ze,
      loadOnlyIndices: jt
    }),
    Bt = g.useMemo(() => bt.map(Hn => Hn.content && String(Hn.content).trim() || ""), [bt]),
    wn = A ? !!((Ga = bt[v]) != null && Ga.isLoading) : bt.some(Hn => Hn.isLoading),
    at = g.useMemo(() => {
      var ct;
      if (!e) return;
      if (Array.isArray(e.mjMediaTypes) && e.mjMediaTypes.length > 0) {
        const Dt = String(Bt[v] || "").trim() || String(((ct = e.mjImages) == null ? void 0 : ct[v]) || "").trim();
        if (Dt) return Dt;
      }
      const Hn = e,
        $t = Array.isArray(e.mjImages) && e.mjImages.length > 1,
        je = Dt => {
          const bn = String(Dt || "").trim();
          if (!bn) return "";
          const fn = Wh(bn) || Go(bn) || "" || bn;
          return V0e(fn, e.type) ? fn : "";
        },
        Qe = (() => {
          var bn;
          if (!$t) return "";
          if (!(e.preferDisplayUrls || e._globalOssUrlOnly || vt)) {
            const Rt = je(Ot == null ? void 0 : Ot[v]);
            if (Rt) return Rt;
          }
          const Dt = je(M0(Hn, v)) || je((bn = e.mjImages) == null ? void 0 : bn[v]);
          return Dt || "";
        })();
      if (e.preferDisplayUrls || e._globalOssUrlOnly || vt) {
        if (Qe) return Qe;
        if ($t) {
          const Dt = je(e._ossRemoteUrl),
            bn = je(e.originalUrl),
            Rt = je(e.url);
          return Dt && bn && Rt && Dt === bn && Dt === Rt ? Dt : void 0;
        }
        for (const Dt of [e.url, e.originalUrl, e._ossRemoteUrl, Oe]) {
          const bn = je(Dt);
          if (bn) return bn;
        }
        if (e.preferDisplayUrls && !e._globalOssUrlOnly && !vt) {
          for (const Dt of [st, ne, Pn, Tt, et, Oe, e.url, e.originalUrl]) if (eGa(Dt, e.type)) return Dt;
        }
        return;
      }
      const Mt = String((Ot == null ? void 0 : Ot[v]) || "").trim(),
        cn = String(Bt[v] || "").trim(),
        Qn = ne || Mt || Qe || Pn || Tt || et || cn || void 0;
      return Qn || st || (Oe && nr(Oe) ? Oe : void 0) || (e.url && nr(e.url) ? e.url : void 0) || (e.originalUrl && nr(e.originalUrl) ? e.originalUrl : void 0);
    }, [e, ne, Bt, v, Ot, Pn, Tt, et, st, Oe, vt]),
    [Pt, dt] = g.useState(null),
    xt = g.useRef(null);
  g.useEffect(() => {
    let Hn = !1;
    const $t = () => {
      if (xt.current) {
        try {
          URL.revokeObjectURL(xt.current);
        } catch {}
        xt.current = null;
      }
    };
    if (!at || k !== "image" && k !== "video" || !at.startsWith("blob:") && !at.startsWith("data:")) {
      $t(), dt(null);
      return;
    }
    return (async () => {
      const je = k === "video" ? await oGa(at) : await aGa(at);
      if (Hn) {
        je && URL.revokeObjectURL(je);
        return;
      }
      $t(), je ? (xt.current = je, dt({
        source: at,
        url: je
      })) : dt(null);
    })(), () => {
      Hn = !0, $t(), dt(null);
    };
  }, [at, k]), g.useEffect(() => {
    const Hn = at;
    if (re(null), !Hn || k !== "image" && k !== "video") return;
    let $t = !1;
    return (async () => {
      var je, Qe;
      try {
        const Mt = String((e == null ? void 0 : e._assetId) || "").trim();
        if (Mt) {
          const Lt = (je = Ur.getAssetManifestMeta(Mt)) == null ? void 0 : je.size;
          if (typeof Lt == "number" && Lt > 0) {
            $t || re(Lt);
            return;
          }
        }
        if (k === "image" && Mt) {
          const {
            assetStore: Lt
          } = await Ie(async () => {
            const {
              assetStore: Dt
            } = await Promise.resolve().then(() => Ri);
            return {
              assetStore: Dt
            };
          }, void 0, import.meta.url);
          await Lt.init();
          const ct = await Lt.getAssetBlob(Mt);
          if (!$t && (ct != null && ct.size)) {
            re(ct.size);
            return;
          }
        }
        if (Hn.startsWith("blob:") || Hn.startsWith("data:")) {
          if (k === "video") try {
            const bn = (await fetch(Hn, {
                headers: {
                  Range: "bytes=0-0"
                }
              })).headers.get("content-range"),
              Rt = (Qe = bn == null ? void 0 : bn.match(/\/(\d+)\s*$/)) == null ? void 0 : Qe[1];
            if (Rt && !$t) {
              re(Number(Rt));
              return;
            }
          } catch {}
          const ct = await (await fetch(Hn)).blob();
          $t || re(ct.size);
          return;
        }
        if (/^https?:\/\//i.test(Hn) && /\/mj\/image\//i.test(Hn)) {
          $t || re(null);
          return;
        }
        if (/^https?:\/\//i.test(Hn) && /(?:\?|&)imageView2\//i.test(Hn)) {
          $t || re(null);
          return;
        }
        if (k === "video" && !/^https?:\/\//i.test(Hn)) {
          $t || re(null);
          return;
        }
        try {
          if (!N$(Hn)) {
            const Lt = await fetch(Hn, {
                method: "HEAD"
              }),
              ct = Number(Lt.headers.get("content-length"));
            if (Lt.ok && Number.isFinite(ct) && ct > 0) {
              $t || re(ct);
              return;
            }
          }
        } catch {}
        if (k === "video") {
          $t || re(null);
          return;
        }
        const cn = await fetch(Hn);
        if (!cn.ok) return;
        const Qn = await cn.blob();
        $t || re(Qn.size);
      } catch {
        $t || re(null);
      }
    })(), () => {
      $t = !0;
    };
  }, [at, k, e == null ? void 0 : e.id, e == null ? void 0 : e._assetId]), g.useEffect(() => {
    f.current = e;
  }, [e]), g.useEffect(() => () => {
    P.current && clearTimeout(P.current);
  }, []), g.useEffect(() => {
    Y(!1), L(null), W(null), q(null), U(1), de(void 0), le.current = !1;
  }, [e == null ? void 0 : e.id, e == null ? void 0 : e._assetId, e == null ? void 0 : e.url]);
  const yn = g.useCallback(() => {
    Y(!1), L(null), Ye.current = 1, Ce.current = {
      x: 0,
      y: 0
    }, it.current = {
      scale: 1,
      x: 0,
      y: 0
    };
    const Hn = ke.current;
    Hn && (Hn.style.opacity = "0", Hn.style.width = "0px", Hn.style.height = "0px"), B6e(Hn, ve.current, 1, {
      x: 0,
      y: 0
    }, 0);
  }, []);
  g.useEffect(() => {
    e != null && e.mjImages && e.mjImages.length > 1 ? (b("single"), _(e.selectedMjImageIndex ?? 0), E([]), T(null)) : (b("single"), _(0), E([]), T(null)), F(1), G({
      x: 0,
      y: 0
    }), L(null), W(null), U(1), Y(!1);
  }, [e == null ? void 0 : e.id, e == null ? void 0 : e._assetId, (Za = e == null ? void 0 : e.mjImages) == null ? void 0 : Za.length, e == null ? void 0 : e.initialViewMode]), g.useEffect(() => {
    if (!(e != null && e.mjImages) || e.mjImages.length <= 1) return;
    const Hn = Math.max(0, Math.min(e.selectedMjImageIndex ?? 0, e.mjImages.length - 1));
    _(Hn);
  }, [e == null ? void 0 : e.selectedMjImageIndex, (va = e == null ? void 0 : e.mjImages) == null ? void 0 : va.length]), g.useLayoutEffect(() => {
    F(1), G({
      x: 0,
      y: 0
    }), yn();
  }, [e == null ? void 0 : e.id, e == null ? void 0 : e._assetId, e == null ? void 0 : e.url, y, yn]);
  const gn = g.useCallback(() => {
    ce(!0), He.current && clearTimeout(He.current), He.current = setTimeout(() => {
      He.current = null, ce(!1);
    }, 900);
  }, []);
  g.useEffect(() => {
    X(0), xe.current = 0, ye(!1);
  }, [e == null ? void 0 : e.id, e == null ? void 0 : e.url, e == null ? void 0 : e._assetId]), g.useEffect(() => {
    const Hn = () => Ee(Wht());
    return window.addEventListener(ODe, Hn), () => window.removeEventListener(ODe, Hn);
  }, []);
  const mt = g.useCallback((Hn, $t, je) => {
      Ye.current = Hn, Ce.current = $t;
      const Qe = je ?? xe.current;
      B6e(ke.current, ve.current, Hn, $t, Qe);
    }, []),
    Xt = g.useCallback((Hn, $t) => {
      F(Hn), G($t);
    }, []),
    Gn = g.useCallback((Hn, $t) => {
      var Lt;
      const je = (Lt = _e.current) == null ? void 0 : Lt.getBoundingClientRect();
      if (!je || Hn <= 0 || $t <= 0) return 1;
      const Qe = xe.current % 180 !== 0,
        Mt = Qe ? $t : Hn,
        cn = Qe ? Hn : $t,
        Qn = H0e(je);
      return Math.min(Qn.width / Mt, Qn.height / cn);
    }, []),
    rr = g.useCallback(Hn => {
      var Qn, Lt;
      const $t = e,
        je = jit(e, Hn),
        Mt = ($t && vt ? M0($t, Hn) || String(((Qn = $t.mjImages) == null ? void 0 : Qn[Hn]) || "").trim() : "") || Bt[Hn] || String(((Lt = e == null ? void 0 : e.mjImages) == null ? void 0 : Lt[Hn]) || "").trim();
      if (!Mt) return;
      if (je !== "image") {
        We.current = null, Y(!1), W(null), q(null), _(Hn), n && n(Hn);
        return;
      }
      const cn = new Image();
      cn.decoding = "async", cn.onload = () => {
        const ct = {
            width: cn.naturalWidth || 0,
            height: cn.naturalHeight || 0
          },
          Dt = Gn(ct.width, ct.height);
        We.current = {
          scale: Dt,
          width: ct.width,
          height: ct.height
        }, Y(!1), Ye.current = Dt, Ce.current = {
          x: 0,
          y: 0
        }, it.current = {
          scale: Dt,
          x: 0,
          y: 0
        }, L(ct), U(Dt), Xt(Dt, {
          x: 0,
          y: 0
        }), _(Hn), n && n(Hn);
      }, cn.onerror = () => {
        We.current = null;
      }, cn.src = Mt;
    }, [Gn, e, Bt, n, vt, Xt]),
    qn = g.useCallback(Hn => {
      var Mt;
      const $t = Math.max(Bt.length, ((Mt = e == null ? void 0 : e.mjImages) == null ? void 0 : Mt.length) || 0);
      if ($t <= 1) return;
      const Qe = (S.current + Hn + $t) % $t;
      rr(Qe);
    }, [(Kt = e == null ? void 0 : e.mjImages) == null ? void 0 : Kt.length, Bt.length, rr]),
    Dn = g.useCallback(() => {
      mt(D, {
        x: 0,
        y: 0
      }), Xt(D, {
        x: 0,
        y: 0
      }), gn();
    }, [mt, D, gn, Xt]),
    Ar = g.useCallback((Hn, $t, je) => {
      const Qe = _e.current;
      if (!Qe) return;
      const Mt = Qe.getBoundingClientRect(),
        cn = Hn - Mt.left - Mt.width / 2,
        Qn = $t - Mt.top - Mt.height / 2,
        Lt = Ye.current,
        ct = Ce.current;
      if (Lt <= 0) return;
      const Dt = je / Lt,
        bn = {
          x: cn - (cn - ct.x) * Dt,
          y: Qn - (Qn - ct.y) * Dt
        };
      mt(je, bn), gn();
    }, [mt, gn]),
    _r = g.useCallback(Hn => {
      const $t = _e.current;
      if (!$t) return;
      const je = $t.getBoundingClientRect();
      Ar(je.left + je.width / 2, je.top + je.height / 2, Hn), Xt(Ye.current, Ce.current);
    }, [Xt, Ar]),
    Pa = g.useCallback(Hn => {
      const $t = Math.min(Rit, Math.max(Pit, Ye.current * Hn));
      _r($t);
    }, [_r]),
    fa = g.useCallback(Hn => {
      const $t = (xe.current + Hn + 360) % 360;
      xe.current = $t, X($t), mt(Ye.current, {
        x: 0,
        y: 0
      }, $t), Xt(Ye.current, {
        x: 0,
        y: 0
      }), gn();
    }, [mt, gn, Xt]),
    Ca = g.useCallback(() => {
      var Hn;
      if (k === "video") {
        const $t = (Q == null ? void 0 : Q.width) || 0,
          je = (Q == null ? void 0 : Q.height) || 0;
        if ($t > 0 && je > 0) {
          const Qe = ((Hn = _e.current) == null ? void 0 : Hn.getBoundingClientRect()) || new DOMRect(0, 0, window.innerWidth, window.innerHeight),
            Mt = H0e(Qe),
            cn = Math.min(Mt.width / $t, Mt.height / je);
          W({
            width: Math.max(120, Math.round($t * cn)),
            height: Math.max(120, Math.round(je * cn))
          });
        }
        return;
      }
      xe.current = 0, X(0), Dn();
    }, [k, Dn, Q]);
  g.useLayoutEffect(() => {
    const Hn = ke.current;
    if (!Hn) return;
    const $t = Ye.current,
      je = Ce.current,
      Qe = it.current;
    Qe.scale === $t && Qe.x === je.x && Qe.y === je.y || (it.current = {
      scale: $t,
      x: je.x,
      y: je.y
    }, B6e(Hn, ve.current, $t, je, xe.current));
  });
  const [$n, yr] = g.useState(null),
    [Ir, Gr] = g.useState(!1),
    Zr = g.useRef(null);
  g.useEffect(() => {
    const Hn = k === "video" ? Bt.length > 0 ? Bt[v] : et : null;
    if (!Hn || !Nit(Hn)) {
      Zr.current && (URL.revokeObjectURL(Zr.current), Zr.current = null), yr(null), Gr(!1);
      return;
    }
    return yr(Hn), Gr(!1), Zr.current = Hn, () => {
      Zr.current = null, yr(null), Gr(!1);
    };
  }, [k, e == null ? void 0 : e.id, et, Bt.length, v, Bt]), g.useEffect(() => {
    const Hn = () => j(null);
    if (R) return window.addEventListener("click", Hn), () => window.removeEventListener("click", Hn);
  }, [R]), g.useEffect(() => {
    if (!z) return;
    const Hn = je => {
        const Qe = je.clientX - he.current.x,
          Mt = je.clientY - he.current.y,
          cn = {
            x: he.current.translateX + Qe,
            y: he.current.translateY + Mt
          };
        ge.current = cn, mt(Ye.current, cn);
      },
      $t = () => {
        Xt(Ye.current, ge.current), V(!1);
      };
    return window.addEventListener("mousemove", Hn, {
      passive: !0
    }), window.addEventListener("mouseup", $t, {
      passive: !0
    }), () => {
      window.removeEventListener("mousemove", Hn), window.removeEventListener("mouseup", $t);
    };
  }, [mt, z, Xt]);
  const La = g.useCallback(async Hn => {
    var $t, je;
    try {
      if (typeof navigator > "u") return;
      const Qe = f.current;
      if (!Qe || Qe.type !== "image") return;
      const Mt = Math.min(Math.max(Qe.selectedMjImageIndex ?? 0, 0), Math.max(((($t = Qe._mjAssetIds) == null ? void 0 : $t.length) ?? 1) - 1, 0)),
        cn = Qe._mjAssetIds;
      if (cn && cn.length > 0 && cn[Mt]) {
        await pXt(cn[Mt]);
        return;
      }
      if (Qe._assetId) {
        await pXt(Qe._assetId);
        return;
      }
      await gua(Hn, "image.png");
    } catch (Qe) {
      console.warn("[Lightbox] Failed to copy image to clipboard:", Qe);
      try {
        await ((je = navigator.clipboard) == null ? void 0 : je.writeText(Hn));
      } catch {}
    }
  }, []);
  g.useLayoutEffect(() => {
    const Hn = me.current;
    !Hn || (e == null ? void 0 : e.type) === "image" || rt(KYt(Hn.rect.width / Math.max(Hn.rect.height, 1)));
  }, []), g.useLayoutEffect(() => {
    const Hn = me.current;
    if (!Hn) return;
    const $t = document.querySelector(`[data-node-id="${CSS.escape(Hn.nodeId)}"]`),
      je = ($t == null ? void 0 : $t.querySelector("[data-canvas-persistent-media-layer]")) || ($t == null ? void 0 : $t.querySelector("[data-compact-gen-preview], [data-input-image-media], [data-dense-media-micro-thumb]")),
      Qe = je instanceof HTMLElement ? je : $t instanceof HTMLElement ? $t : null;
    if (!Qe) return;
    const Mt = Qe.style.visibility;
    return Qe.style.visibility = "hidden", () => {
      Qe.style.visibility = Mt;
    };
  }, []), g.useLayoutEffect(() => {
    if ((e == null ? void 0 : e.type) !== "image" || Me !== "enter" || !me.current) return;
    const Hn = me.current,
      $t = nin(Hn);
    let je = 0,
      Qe = 0;
    const Mt = requestAnimationFrame(() => {
      rt($t), ze(!1), je = requestAnimationFrame(() => {
        ze(!0), Qe = window.setTimeout(() => Re("show"), Le);
      });
    });
    return () => {
      cancelAnimationFrame(Mt), cancelAnimationFrame(je), window.clearTimeout(Qe);
    };
  }, [Me, e == null ? void 0 : e.type, Le]), g.useEffect(() => {
    var bn;
    if ((e == null ? void 0 : e.type) !== "video" || Me !== "enter" || !me.current) return;
    const Hn = me.current,
      $t = Hn.rect.width / Math.max(Hn.rect.height, 1),
      je = ((bn = _e.current) == null ? void 0 : bn.getBoundingClientRect()) || new DOMRect(0, 0, window.innerWidth, window.innerHeight),
      Qe = H0e(je),
      Mt = Math.min(Qe.width / $t, Qe.height),
      cn = Math.max(120, Math.round($t * Mt)),
      Qn = Math.max(120, Math.round(Mt));
    W({
      width: cn,
      height: Qn
    }), rt({
      left: je.left + (je.width - cn) / 2,
      top: je.top + (je.height - Qn) / 2,
      width: cn,
      height: Qn
    }), ze(!1);
    let Lt = 0;
    const ct = requestAnimationFrame(() => {
        Lt = requestAnimationFrame(() => ze(!0));
      }),
      Dt = window.setTimeout(() => Re("show"), Le);
    return () => {
      cancelAnimationFrame(ct), cancelAnimationFrame(Lt), window.clearTimeout(Dt);
    };
  }, [Me, e == null ? void 0 : e.type, Le]), g.useEffect(() => {
    if (Me !== "exit") return;
    if (me.current) {
      const $t = requestAnimationFrame(() => {
          requestAnimationFrame(() => ze(!1));
        }),
        je = window.setTimeout(() => Fe.current(), Q6 + 48);
      return () => {
        cancelAnimationFrame($t), window.clearTimeout(je);
      };
    }
    const Hn = window.setTimeout(() => Fe.current(), 220);
    return () => window.clearTimeout(Hn);
  }, [Me]), t = () => {
    var je;
    if (Ke.current || Me === "exit") {
      Fe.current();
      return;
    }
    !me.current && ((e == null ? void 0 : e.type) === "image" || (e == null ? void 0 : e.type) === "video") && (me.current = kyt(e.id));
    const Hn = me.current;
    if (Ke.current = !0, !Hn) {
      Re("exit");
      return;
    }
    Xe.current = Hn.rect;
    const $t = k === "image" && H ? (je = Te.current) == null ? void 0 : je.getBoundingClientRect() : null;
    $t && $t.width > 0 && $t.height > 0 ? rt({
      left: $t.left,
      top: $t.top,
      width: $t.width,
      height: $t.height
    }) : $e || rt(KYt(Hn.rect.width / Math.max(Hn.rect.height, 1))), ze(!0), Re("exit");
  }, g.useEffect(() => {
    if (!e) return;
    const Hn = je => {
      if (!f.current) return;
      const Mt = je.target;
      if (!(Mt.tagName === "INPUT" || Mt.tagName === "TEXTAREA")) {
        if (je.key === "Escape") {
          je.preventDefault(), je.stopPropagation(), t();
          return;
        }
        y === "single" && Bt.length > 1 && (je.key === "ArrowLeft" || je.key === "Left" || je.key === "ArrowUp" || je.key === "Up" ? (je.preventDefault(), je.stopPropagation(), qn(-1)) : (je.key === "ArrowRight" || je.key === "Right" || je.key === "ArrowDown" || je.key === "Down") && (je.preventDefault(), je.stopPropagation(), qn(1)));
      }
    };
    window.addEventListener("keydown", Hn);
    const $t = async je => {
      var Lt;
      if (!(je.ctrlKey || je.metaKey) || ((Lt = je.key) == null ? void 0 : Lt.toLowerCase()) !== "c") return;
      const Qe = je.target;
      if (!!Qe && (Qe.tagName === "INPUT" || Qe.tagName === "TEXTAREA" || Qe.isContentEditable)) return;
      const cn = f.current;
      if (!cn || jit(cn, v) !== "image") return;
      const Qn = Bt.length > 0 && Bt[v] || et;
      Qn && (je.preventDefault(), je.stopPropagation(), je.stopImmediatePropagation(), await La(Qn));
    };
    return window.addEventListener("keydown", $t, !0), () => {
      window.removeEventListener("keydown", Hn), window.removeEventListener("keydown", $t, !0);
    };
  }, [e, n, Bt, y, v, t, et, La, rr, qn]), g.useEffect(() => {
    var je;
    const Hn = Math.max(Bt.length, ((je = e == null ? void 0 : e.mjImages) == null ? void 0 : je.length) || 0);
    if (!e || y !== "single" || Hn <= 1) return;
    const $t = Qe => {
      const Mt = Qe.target;
      if (Mt != null && Mt.closest('input, textarea, [contenteditable="true"]') || !A && (Mt != null && Mt.closest(".sketch-lightbox-zoom-surface")) || Math.abs(Qe.deltaY) < 8 && Math.abs(Qe.deltaX) < 8) return;
      const cn = Date.now();
      if (cn - C.current < 280) {
        Qe.preventDefault(), Qe.stopPropagation();
        return;
      }
      C.current = cn, Qe.preventDefault(), Qe.stopPropagation();
      const Qn = (Math.abs(Qe.deltaY) >= Math.abs(Qe.deltaX) ? Qe.deltaY : Qe.deltaX) > 0 ? 1 : -1;
      qn(Qn);
    };
    return window.addEventListener("wheel", $t, {
      passive: !1,
      capture: !0
    }), () => window.removeEventListener("wheel", $t, !0);
  }, [e, y, Bt.length, (Pr = e == null ? void 0 : e.mjImages) == null ? void 0 : Pr.length, qn, A]);
  const sa = g.useCallback(Hn => {
    const $t = _e.current;
    if (_e.current = Hn, Ve.current && (clearTimeout(Ve.current), Ve.current = null), It.current != null && (cancelAnimationFrame(It.current), It.current = null), Ft.current = null, $t && De.current && ($t.removeEventListener("wheel", De.current), De.current = null), Hn) {
      const je = () => {
          It.current = null;
          const Mt = Ft.current;
          if (Ft.current = null, !Mt) return;
          const cn = Math.exp(-Mt.deltaY * nGa),
            Qn = Math.min(Rit, Math.max(Pit, Ye.current * cn));
          Ar(Mt.clientX, Mt.clientY, Qn), Ve.current && clearTimeout(Ve.current), Ve.current = setTimeout(() => {
            Ve.current = null, Xt(Ye.current, Ce.current);
          }, 120);
        },
        Qe = Mt => {
          Mt.preventDefault(), Mt.stopPropagation();
          const cn = Ft.current;
          Ft.current = {
            clientX: Mt.clientX,
            clientY: Mt.clientY,
            deltaY: ((cn == null ? void 0 : cn.deltaY) ?? 0) + Mt.deltaY
          }, It.current == null && (It.current = requestAnimationFrame(je));
        };
      De.current = Qe, Hn.addEventListener("wheel", Qe, {
        passive: !1
      });
    }
  }, [Xt, Ar]);
  if (g.useEffect(() => {
    if (!l || !(d != null && d.current)) return;
    const Hn = d.current,
      $t = Hn.style.visibility,
      je = Hn.style.pointerEvents,
      Qe = Hn.style.contain;
    return Hn.style.visibility = "hidden", Hn.style.pointerEvents = "none", Hn.style.contain = "strict", () => {
      Hn.style.visibility = $t, Hn.style.pointerEvents = je, Hn.style.contain = Qe;
    };
  }, [d, l]), !e) return null;
  const Ea = Pt,
    ba = (k === "image" || k === "video") && Ea && Ea.source === at ? Ea.url : void 0,
    ga = Yn && !Ct ? void 0 : ba || at;
  g.useLayoutEffect(() => {
    if (k !== "image" || y !== "single") return;
    const Hn = We.current,
      $t = ke.current,
      je = Te.current;
    !Hn || !$t || ($t.style.width = `${Hn.width}px`, $t.style.height = `${Hn.height}px`, B6e($t, ve.current, Hn.scale, {
      x: 0,
      y: 0
    }, xe.current), Ye.current = Hn.scale, Ce.current = {
      x: 0,
      y: 0
    }, it.current = {
      scale: Hn.scale,
      x: 0,
      y: 0
    }, je && je.complete && je.naturalWidth > 0 && (We.current = null, $t.style.opacity = "1", Y(!0)));
  }, [ga, k, y]);
  const _a = e,
    $a = _a.mjImages && _a.mjImages.length > 1 && (M0(_a, v) || _a.mjImages[v]) || "",
    Ya = $a && (Wh($a) || Go($a) || $a) || Sj(_a) || Bd(_a) || Go(e == null ? void 0 : e._ossRemoteUrl) || Go(e == null ? void 0 : e.originalUrl) || Go(e == null ? void 0 : e.url) || (e == null ? void 0 : e._ossRemoteUrl) || (e == null ? void 0 : e.originalUrl) || (et && nr(et) && !/\/thumbnails\//i.test(et) ? et : "") || (ga && nr(ga) && !/\/thumbnails\//i.test(ga) ? ga : "") || "",
    ta = ((e == null ? void 0 : e._globalOssUrlOnly) || (e == null ? void 0 : e.ossUploaded) || Q$(_a)) && !!(Ya && nr(Ya) && !/\/thumbnails\//i.test(Ya)),
    ki = !!(st || C7(Oe, e == null ? void 0 : e.type) || C7(e == null ? void 0 : e.url, e == null ? void 0 : e.type)),
    Wn = A ? !at && (wn || ft) : !st && kt || !st && Cn || Yn && !Ct || rn && !!Jn && ft || pt || !ki && vt && (e.type === "image" || e.type === "video" || e.type === "audio") && !!Oe && !Ht && !gt || !st && ft || wn,
    wr = me.current && $e && (Me !== "show" || !s && k === "image" && v === w.current && !H) ? c.jsx(hGa, {
      src: me.current.src,
      nodeId: me.current.nodeId,
      origin: Me === "exit" ? Xe.current ?? me.current.rect : me.current.rect,
      dest: $e,
      expanded: nt,
      durationMs: Me === "exit" ? Q6 : Le,
      animate: !(Me === "exit" && nt)
    }) : null,
    jn = k === "image" ? (v === w.current ? Ne == null ? void 0 : Ne.src : void 0) || (e.mjImages && e.mjImages.length > 1 ? (kr = e.mjThumbnails) == null ? void 0 : kr[v] : e.thumbnailUrl || e._ossThumbnailUrl) : void 0,
    _n = jn && !H ? c.jsx("img", {
      src: jn,
      alt: x("正在加载原图"),
      draggable: !1,
      className: "absolute z-30",
      onClick: Hn => Hn.stopPropagation(),
      style: {
        width: "calc(100% - max(64px, 12%))",
        height: "calc(100% - max(144px, 28%))",
        objectFit: "contain"
      }
    }) : null,
    ar = me.current && Me !== "show" ? c.jsx("div", {
      className: "absolute inset-0 z-0",
      style: {
        background: (Ae == null ? void 0 : Ae.background) || "rgba(0, 0, 0, 0.55)",
        backdropFilter: (Ae == null ? void 0 : Ae.backdropFilter) || "blur(20px) saturate(1.1)",
        WebkitBackdropFilter: (Ae == null ? void 0 : Ae.WebkitBackdropFilter) || "blur(20px) saturate(1.1)",
        opacity: Me === "exit" ? 0 : nt ? 1 : 0,
        transition: `opacity ${Me === "exit" ? Q6 : Le}ms ${cW}`
      },
      "aria-hidden": !0
    }) : null,
    Vt = me.current && Me !== "show" ? {
      background: "transparent",
      backdropFilter: "none",
      WebkitBackdropFilter: "none"
    } : Ae;
  if ((e == null ? void 0 : e.status) === "failed") {
    const Hn = String(e.errorMsg || "").trim() || "生成失败";
    return c.jsxs("div", {
      className: "sketch-lightbox sketch-lightbox-overlay fixed inset-0 z-[200] flex flex-col items-center justify-center gap-4",
      onClick: t,
      children: [c.jsxs("div", {
        className: "max-w-md px-6 text-center",
        style: {
          color: "rgba(255, 255, 255, 0.72)"
        },
        children: [c.jsx("div", {
          className: "mb-2 text-base font-medium text-red-400",
          children: x("生成失败")
        }), c.jsx("div", {
          className: "text-sm whitespace-pre-wrap break-words",
          style: {
            color: "rgba(255, 255, 255, 0.72)"
          },
          children: Hn
        })]
      }), c.jsx("button", {
        type: "button",
        onClick: t,
        className: "sketch-lightbox-action",
        children: x("关闭")
      })]
    });
  }
  if (Wn || e._ossLightboxPending || e.url === "pending-oss://resolving") return c.jsxs("div", {
    className: "sketch-lightbox sketch-lightbox-overlay fixed inset-0 z-[200] flex items-center justify-center",
    style: Vt,
    onClick: t,
    children: [ar, wr || _n || c.jsx(Ua, {
      className: "w-10 h-10 animate-spin sketch-lightbox-loading"
    })]
  });
  if (typeof (e == null ? void 0 : e.url) == "string" && e.url === "pending-oss://failed") return c.jsxs("div", {
    className: "sketch-lightbox sketch-lightbox-overlay fixed inset-0 z-[200] flex flex-col items-center justify-center gap-4",
    onClick: t,
    children: [c.jsxs("div", {
      className: "text-center",
      style: {
        color: "rgba(255, 255, 255, 0.72)"
      },
      children: [c.jsx("div", {
        className: "text-base mb-2",
        children: x("图片加载失败")
      }), c.jsx("div", {
        className: "text-sm",
        style: {
          color: "rgba(255, 255, 255, 0.45)"
        },
        children: x("未找到 OSS 公网原图链接（画布节点或历史记录中已丢失）")
      })]
    }), c.jsx("button", {
      type: "button",
      onClick: t,
      className: "sketch-lightbox-action",
      children: x("关闭")
    })]
  });
  const vn = ht && !Bt.some(Boolean) && !!Ue && ga === Ue;
  if (!ga || vn) {
    const Hn = `${e.id}|${e.url || ""}|${ht ? 1 : 0}`;
    if (J.current !== Hn) {
      J.current = Hn;
      try {
        console.warn("[Lightbox] 加载失败", {
          itemId: e.id,
          itemType: e.type,
          preferDisplayUrls: e.preferDisplayUrls,
          _assetId: e._assetId,
          itemUrlHead: (Mr = e.url) == null ? void 0 : Mr.slice(0, 160),
          initialLoadUrlHead: Oe == null ? void 0 : Oe.slice(0, 160),
          rawDisplayUrlHead: at == null ? void 0 : at.slice(0, 160),
          loadedUrlHead: et == null ? void 0 : et.slice(0, 160),
          urlHasError: ht
        });
      } catch {}
    }
    return c.jsxs("div", {
      className: "sketch-lightbox sketch-lightbox-overlay fixed inset-0 z-[200] flex flex-col items-center justify-center gap-4",
      onClick: t,
      children: [c.jsxs("div", {
        className: "text-center",
        style: {
          color: "rgba(255, 255, 255, 0.72)"
        },
        children: [c.jsxs("div", {
          className: "text-base mb-2",
          children: [x(k === "video" ? "视频" : k === "audio" ? "音频" : "图片"), x("加载失败")]
        }), c.jsx("div", {
          className: "text-sm",
          style: {
            color: "rgba(255, 255, 255, 0.45)"
          },
          children: x("可能是网络问题或文件已过期")
        })]
      }), c.jsx("button", {
        type: "button",
        onClick: t,
        className: "sketch-lightbox-action",
        children: x("关闭")
      })]
    });
  }
  if (!ga) return null;
  const An = Hn => {
      var je;
      if (ue.current = ((je = ke.current) == null ? void 0 : je.contains(Hn.target)) ?? !1, !ue.current || Hn.button !== 0 && Hn.button !== 1) return;
      Hn.preventDefault();
      const $t = Ce.current;
      he.current = {
        x: Hn.clientX,
        y: Hn.clientY,
        translateX: $t.x,
        translateY: $t.y
      }, ge.current = {
        x: $t.x,
        y: $t.y
      }, V(!0);
    },
    ur = Hn => {
      Hn.button === 1 && Hn.preventDefault();
    },
    zr = cGa(k === e.type ? e : {
      ...e,
      type: k
    }, ga),
    Dr = pGa(e, k === "video" ? Q : O),
    Wr = () => {
      var Hn, $t;
      return c.jsx("div", {
        className: "sketch-lightbox-stage pointer-events-auto",
        onClick: je => {
          je.target === je.currentTarget && t(), je.stopPropagation();
        },
        children: c.jsx("div", {
          className: "sketch-lightbox-image-area",
          onClick: je => {
            je.target === je.currentTarget && t();
          },
          children: k === "image" ? c.jsx("div", {
            ref: sa,
            className: "sketch-lightbox-zoom-surface",
            style: {
              cursor: "default"
            },
            onMouseDown: An,
            onAuxClick: ur,
            onClick: je => {
              je.button === 0 && je.target === je.currentTarget && !ue.current && t();
            },
            onDoubleClick: je => {
              var Qe;
              if (!(!H || !((Qe = ke.current) != null && Qe.contains(je.target)))) {
                if (je.preventDefault(), je.stopPropagation(), Math.abs(Ye.current - D) < .005) {
                  Ar(je.clientX, je.clientY, 1), Ve.current && clearTimeout(Ve.current), Ve.current = setTimeout(() => {
                    Ve.current = null, Xt(Ye.current, Ce.current);
                  }, 60);
                  return;
                }
                Dn();
              }
            },
            children: c.jsx("div", {
              ref: ke,
              className: "sketch-lightbox-img-frame",
              style: {
                ...sGa,
                cursor: z ? "grabbing" : "grab",
                width: O ? `${O.width}px` : void 0,
                height: O ? `${O.height}px` : void 0,
                opacity: H && Me === "show" ? 1 : 0
              },
              children: c.jsx("div", {
                ref: ve,
                className: "sketch-lightbox-img-clip",
                children: c.jsx("img", {
                  ref: Te,
                  "data-native-context-menu": "media",
                  src: ga,
                  alt: e.prompt,
                  decoding: "async",
                  ...Yg(!0),
                  className: "block h-full w-full select-none",
                  draggable: !1,
                  onLoad: je => {
                    const Qe = je.target;
                    if (Te.current === Qe) {
                      const Mt = {
                          width: Qe.naturalWidth || 0,
                          height: Qe.naturalHeight || 0
                        },
                        cn = ke.current;
                      cn && (cn.style.width = `${Mt.width}px`, cn.style.height = `${Mt.height}px`);
                      const Qn = We.current,
                        Lt = Qn && Qn.width === Mt.width && Qn.height === Mt.height ? Qn.scale : Gn(Mt.width, Mt.height);
                      We.current = null, mt(Lt, {
                        x: 0,
                        y: 0
                      }), Qe.decode().catch(() => {}).finally(() => {
                        Te.current === Qe && (L(Mt), U(Lt), Xt(Lt, {
                          x: 0,
                          y: 0
                        }), Y(!0), gn());
                      });
                    }
                  },
                  onError: () => {
                    le.current || !(e != null && e._assetId) || (le.current = !0, (async () => {
                      try {
                        const {
                            resolveInputImageNodeLightboxUrl: je
                          } = await Ie(async () => {
                            const {
                              resolveInputImageNodeLightboxUrl: Mt
                            } = await Promise.resolve().then(() => Ui);
                            return {
                              resolveInputImageNodeLightboxUrl: Mt
                            };
                          }, void 0, import.meta.url),
                          Qe = await je(e._assetId, ga);
                        Qe && de(Qe);
                      } catch {}
                    })());
                  }
                }, `${e.id || "lb"}:${e._assetId || ""}:${ga || ""}`)
              })
            })
          }) : k === "video" ? c.jsxs(c.Fragment, {
            children: [Nit(ga) && Ir && c.jsxs("div", {
              className: "absolute inset-0 flex items-center justify-center z-10",
              style: {
                background: "rgba(9, 10, 12, 0.72)",
                opacity: me.current && Me !== "show" ? 0 : 1
              },
              children: [c.jsx(Ua, {
                className: "w-8 h-8 animate-spin sketch-lightbox-loading"
              }), c.jsx("span", {
                className: "ml-3 text-sm sketch-lightbox-grid-hint",
                children: x("加载视频…")
              })]
            }), c.jsx("div", {
              className: "sketch-lightbox-video-frame",
              "data-native-context-menu": "media",
              style: {
                ...(K ? {
                  width: K.width,
                  height: K.height
                } : {
                  width: "min(72vw, 720px)",
                  height: "min(78vh, 1280px)",
                  maxWidth: "90vw",
                  maxHeight: "85vh"
                }),
                opacity: me.current && Me !== "show" ? 0 : 1
              },
              onClick: je => je.stopPropagation(),
              children: c.jsx(RXe, {
                src: ga.startsWith("blob:") || ga.startsWith("data:") ? ga : Nit(ga) ? $n ?? ga ?? "" : mGa(ga) && Ht ? Ht : _c(ga) || ga || "",
                poster: ((Hn = e.videoPosterUrl) != null && Hn.trim() && !/\.(mp4|webm|mov)(\?|#|$)/i.test(e.videoPosterUrl) ? e.videoPosterUrl.trim() : void 0) || (($t = e.thumbnailUrl) != null && $t.trim() && !/\.(mp4|webm|mov)(\?|#|$)/i.test(e.thumbnailUrl) ? e.thumbnailUrl.trim() : void 0),
                className: "h-full w-full overflow-hidden bg-black",
                videoClassName: "!h-full !w-full !object-contain",
                clipStartSec: e.clipStartSec,
                clipEndSec: e.clipEndSec,
                autoPlay: !0,
                defaultControlsVisible: !0,
                preload: "auto",
                onLoadedMetadata: je => {
                  var Lt;
                  const Qe = je.currentTarget,
                    Mt = Qe.videoWidth || 0,
                    cn = Qe.videoHeight || 0;
                  if (Mt > 0 && cn > 0) {
                    q({
                      width: Mt,
                      height: cn
                    });
                    const ct = ((Lt = _e.current) == null ? void 0 : Lt.getBoundingClientRect()) || new DOMRect(0, 0, window.innerWidth, window.innerHeight),
                      Dt = H0e(ct),
                      bn = Math.min(Dt.width / Mt, Dt.height / cn);
                    W({
                      width: Math.max(120, Math.round(Mt * bn)),
                      height: Math.max(120, Math.round(cn * bn))
                    }), Y(!0);
                  }
                  const Qn = () => {
                    Qe.muted = !0, Qe.play().catch(() => {});
                  };
                  Qe.play().catch(Qn);
                }
              }, `demo-video-${e.id || ""}:${v}:${ga || ""}`)
            })]
          }) : k === "audio" ? c.jsxs("div", {
            className: "flex flex-col items-center gap-3 w-full max-w-2xl px-6",
            children: [c.jsx("audio", {
              src: ga,
              controls: !0,
              autoPlay: !0,
              className: "w-full",
              onError: je => {
                console.error("[Lightbox] Audio load error:", ga);
              }
            }), c.jsxs("button", {
              type: "button",
              onClick: je => {
                je.stopPropagation(), ga && Xer(ga, `audio-${Date.now()}.mp3`);
              },
              className: "sketch-lightbox-action",
              title: x("转换为 MP3 并下载"),
              children: [c.jsx(ws, {
                size: 14
              }), x("转为 MP3 并下载")]
            })]
          }) : null
        })
      });
    },
    gr = (e.prompt || e.title || zr).trim() || "未命名",
    jr = Bt.length > 1 ? Bt.length : 0,
    ea = Math.round(B * 100),
    pa = Math.round(Pit * 100),
    Br = Math.round(Rit * 100),
    tn = async Hn => {
      var Qe, Mt;
      Hn.stopPropagation();
      const $t = ga;
      if (!$t || ie) return;
      ae(!0);
      let je;
      try {
        je = u == null ? void 0 : u("正在下载…");
        const {
            generateLightboxDownloadFileName: cn
          } = await Ie(async () => {
            const {
              generateLightboxDownloadFileName: Dt
            } = await Promise.resolve().then(() => rYe);
            return {
              generateLightboxDownloadFileName: Dt
            };
          }, void 0, import.meta.url),
          {
            downloadLightboxToUserFolder: Qn
          } = await Ie(async () => {
            const {
              downloadLightboxToUserFolder: Dt
            } = await Promise.resolve().then(() => Cpe);
            return {
              downloadLightboxToUserFolder: Dt
            };
          }, void 0, import.meta.url),
          Lt = await cn({
            ...e,
            type: k,
            originalUrl: jr > 1 ? ((Qe = e.mjImages) == null ? void 0 : Qe[v]) || $t : e.originalUrl,
            _assetId: ((Mt = e._mjAssetIds) == null ? void 0 : Mt[v]) || e._assetId
          }, zr, $t),
          ct = await Qn($t, Lt, k, {
            assetId: e._assetId || e.id
          });
        je && (m == null || m(je)), ct.ok ? h == null || h(`下载成功：${ct.filename}
${ct.hint}`, 5e3) : p == null || p(ct.error || "下载失败，请稍后重试");
      } catch (cn) {
        je && (m == null || m(je)), p == null || p((cn == null ? void 0 : cn.message) || "下载失败，请稍后重试");
      } finally {
        ae(!1);
      }
    },
    Lr = () => {
      if (k !== "image" && k !== "video" || k === "image" && !H) return null;
      const Hn = k === "video" ? "视频信息" : "图片信息";
      return c.jsx("div", {
        className: "sketch-lightbox-top-left",
        onClick: $t => $t.stopPropagation(),
        children: c.jsxs("div", {
          className: "sketch-lightbox-pill",
          children: [c.jsxs("div", {
            className: "sketch-lightbox-info-wrap",
            children: [c.jsx(c4, {
              label: x(Hn),
              onClick: $t => {
                $t.stopPropagation(), ye(je => !je);
              },
              children: c.jsx(JHe, {
                size: Ew,
                strokeWidth: 1.5
              })
            }), fe ? c.jsxs("div", {
              className: "sketch-lightbox-info-popover",
              onClick: $t => $t.stopPropagation(),
              children: [c.jsxs("div", {
                className: "sketch-lightbox-info-row",
                children: [c.jsx("span", {
                  children: x("分辨率")
                }), c.jsx("span", {
                  children: Dr || "—"
                })]
              }), c.jsxs("div", {
                className: "sketch-lightbox-info-row",
                children: [c.jsx("span", {
                  children: x("大小")
                }), c.jsx("span", {
                  children: dGa(Z)
                })]
              }), zr ? c.jsxs("div", {
                className: "sketch-lightbox-info-row",
                children: [c.jsx("span", {
                  children: x("文件名")
                }), c.jsx("span", {
                  className: "truncate max-w-[120px]",
                  title: zr,
                  children: zr
                })]
              }) : null]
            }) : null]
          }), c.jsx("span", {
            className: "sketch-lightbox-pill-divider",
            "aria-hidden": !0
          }), c.jsx(c4, {
            label: x(k === "video" ? "适应窗口" : "重置视图"),
            onClick: $t => {
              $t.stopPropagation(), Ca();
            },
            children: c.jsx(bd, {
              size: Ew,
              strokeWidth: 1.5
            })
          })]
        })
      });
    },
    br = () => c.jsxs("div", {
      className: "sketch-lightbox-top",
      onClick: Hn => Hn.stopPropagation(),
      children: [c.jsxs("div", {
        className: "sketch-lightbox-pill",
        children: [c.jsx(c4, {
          label: x("逆时针旋转"),
          onClick: Hn => {
            Hn.stopPropagation(), fa(-90);
          },
          children: c.jsx(vd, {
            size: Ew,
            strokeWidth: 1.5
          })
        }), c.jsx("span", {
          className: "sketch-lightbox-pill-divider",
          "aria-hidden": !0
        }), c.jsx(c4, {
          label: x("顺时针旋转"),
          onClick: Hn => {
            Hn.stopPropagation(), fa(90);
          },
          children: c.jsx(ox, {
            size: Ew,
            strokeWidth: 1.5
          })
        })]
      }), c.jsxs("div", {
        className: "sketch-lightbox-pill",
        children: [c.jsx(c4, {
          label: x("缩小"),
          onClick: Hn => {
            Hn.stopPropagation(), Pa(.85);
          },
          children: c.jsx(Wue, {
            size: Ew,
            strokeWidth: 1.5
          })
        }), c.jsxs("span", {
          className: "sketch-lightbox-zoom-label",
          children: [ea, "%"]
        }), c.jsx("input", {
          type: "range",
          className: "sketch-lightbox-zoom-slider",
          min: pa,
          max: Br,
          value: Math.min(Br, Math.max(pa, ea)),
          onChange: Hn => {
            Hn.stopPropagation(), _r(Number(Hn.target.value) / 100);
          },
          "aria-label": x("缩放")
        }), c.jsx(c4, {
          label: x("放大"),
          onClick: Hn => {
            Hn.stopPropagation(), Pa(1.18);
          },
          children: c.jsx(Z$, {
            size: Ew,
            strokeWidth: 1.5
          })
        }), c.jsx("span", {
          className: "sketch-lightbox-pill-divider",
          "aria-hidden": !0
        }), c.jsx(c4, {
          label: x("适应窗口"),
          onClick: Hn => {
            Hn.stopPropagation(), Ca();
          },
          children: c.jsx(kT, {
            size: Ew,
            strokeWidth: 1.5
          })
        }), c.jsx(c4, {
          label: x("原始尺寸"),
          onClick: Hn => {
            Hn.stopPropagation(), _r(1);
          },
          children: c.jsx(hZ, {
            size: Ew,
            strokeWidth: 1.5
          })
        })]
      }), c.jsxs("div", {
        className: "sketch-lightbox-pill",
        children: [c.jsx(c4, {
          label: x("下载"),
          onClick: tn,
          children: c.jsx(ws, {
            size: Ew,
            strokeWidth: 1.5
          })
        }), c.jsx("span", {
          className: "sketch-lightbox-pill-divider",
          "aria-hidden": !0
        }), c.jsx(c4, {
          label: x("关闭 (Esc)"),
          onClick: Hn => {
            Hn.stopPropagation(), t();
          },
          children: c.jsx(Na, {
            size: Ew,
            strokeWidth: 1.5
          })
        })]
      })]
    }),
    Jr = () => c.jsx("div", {
      className: "sketch-lightbox-top",
      onClick: Hn => Hn.stopPropagation(),
      children: c.jsxs("div", {
        className: "sketch-lightbox-pill",
        children: [(k === "image" || k === "video") && c.jsxs(c.Fragment, {
          children: [c.jsx(c4, {
            label: x("下载"),
            onClick: tn,
            children: c.jsx(ws, {
              size: Ew,
              strokeWidth: 1.5
            })
          }), c.jsx("span", {
            className: "sketch-lightbox-pill-divider",
            "aria-hidden": !0
          })]
        }), c.jsx(c4, {
          label: x("关闭 (Esc)"),
          onClick: Hn => {
            Hn.stopPropagation(), t();
          },
          children: c.jsx(Na, {
            size: Ew,
            strokeWidth: 1.5
          })
        })]
      })
    }),
    Kr = () => jr <= 1 ? null : c.jsxs("div", {
      className: `sketch-lightbox-bottom-bar transition-all duration-150 ${y === "single" && Me !== "enter" && (k !== "image" || H) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`,
      style: {
        opacity: Me === "exit" ? 0 : void 0,
        transition: `opacity ${Q6}ms ${cW}`,
        pointerEvents: Me === "exit" ? "none" : void 0
      },
      onClick: Hn => Hn.stopPropagation(),
      children: [c.jsxs("span", {
        className: "sketch-lightbox-page-text",
        children: [v + 1, " / ", jr]
      }), c.jsx("div", {
        className: "sketch-lightbox-dots",
        children: Bt.map((Hn, $t) => c.jsx("button", {
          type: "button",
          className: `sketch-lightbox-dot ${$t === v ? "sketch-lightbox-dot--active" : ""}`,
          onClick: je => {
            je.stopPropagation(), rr($t);
          },
          "aria-label": x("第 {0} 项", $t + 1)
        }, $t))
      })]
    }),
    ir = Me !== "enter",
    Hr = {
      opacity: Me === "exit" ? 0 : 1,
      transition: `opacity ${Q6}ms ${cW}`,
      pointerEvents: Me === "exit" ? "none" : void 0
    };
  return c.jsxs("div", {
    className: `sketch-lightbox sketch-lightbox-overlay ${l ? "absolute inset-0 z-[100]" : "fixed inset-0 z-[200]"} flex flex-col items-center justify-center`,
    style: {
      ...Ae,
      ...(me.current && Me !== "show" ? {
        background: "transparent",
        backdropFilter: "none",
        WebkitBackdropFilter: "none"
      } : void 0),
      ...(!me.current && Me === "exit" ? {
        opacity: 0,
        transition: `opacity 220ms ${cW}`
      } : void 0)
    },
    onClick: () => {
      ye(!1), t();
    },
    children: [ar, wr || _n, c.jsx("div", {
      className: "absolute inset-0 z-0",
      "aria-hidden": !0
    }), y === "single" && ir && (k === "image" && H || k === "video") ? c.jsx("div", {
      style: Hr,
      children: Lr()
    }) : null, y === "single" && ir && k === "image" && H ? c.jsx("div", {
      style: Hr,
      children: br()
    }) : ir ? c.jsx("div", {
      style: Hr,
      children: Jr()
    }) : null, c.jsx("div", {
      className: "w-full h-full relative overflow-visible flex flex-col items-center justify-center pointer-events-none z-10",
      children: c.jsx("div", {
        className: `absolute inset-0 w-full h-full flex flex-col items-center justify-center transition-opacity duration-150 pointer-events-auto ${y === "single" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`,
        onClick: Hn => {
          Hn.target === Hn.currentTarget && (ye(!1), t());
        },
        children: Wr()
      })
    }), Kr(), c.jsx("div", {
      className: `sketch-lightbox-bottom transition-all duration-150 ${y === "single" && ir && (k !== "image" || H) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`,
      style: ir ? Hr : void 0,
      onClick: Hn => Hn.stopPropagation(),
      children: c.jsxs("div", {
        className: "sketch-lightbox-actions",
        children: [c.jsxs("span", {
          className: "sketch-lightbox-action-title",
          title: gr,
          children: [c.jsx(YEn, {
            size: Ew,
            strokeWidth: 1.5,
            className: "shrink-0 opacity-70"
          }), c.jsx("span", {
            className: "truncate",
            children: gr
          })]
        }), ta && Ya && !be ? c.jsxs(c.Fragment, {
          children: [c.jsx("span", {
            className: "sketch-lightbox-action-divider",
            "aria-hidden": !0
          }), c.jsx("span", {
            className: "sketch-lightbox-oss-url truncate max-w-[min(42vw,280px)]",
            title: Ya,
            children: Ya.replace(/^https?:\/\//i, "")
          })]
        }) : null, ta && Ya && !be ? c.jsxs(c.Fragment, {
          children: [c.jsx("span", {
            className: "sketch-lightbox-action-divider",
            "aria-hidden": !0
          }), c.jsxs("button", {
            type: "button",
            onClick: Hn => {
              Hn.stopPropagation(), navigator.clipboard.writeText(Ya).then(() => {
                console.log("[Lightbox] OSS URL copied");
              }).catch($t => {
                console.error("[Lightbox] 复制地址失败:", $t);
              });
            },
            className: "sketch-lightbox-action",
            title: Ya,
            children: [c.jsx(wz, {
              size: Ew,
              strokeWidth: 1.5
            }), x("复制地址")]
          })]
        }) : null, r && k === "image" && ga ? c.jsxs(c.Fragment, {
          children: [c.jsx("span", {
            className: "sketch-lightbox-action-divider",
            "aria-hidden": !0
          }), c.jsxs("button", {
            type: "button",
            onClick: Hn => {
              Hn.stopPropagation();
              const $t = Z$a(e, ga, Ya, v);
              $t && r([$t]), t();
            },
            className: "sketch-lightbox-action",
            title: x("将当前预览图发送到画布（新建图片节点）"),
            children: [c.jsx(zu, {
              size: Ew,
              strokeWidth: 1.5
            }), x("发送到画布")]
          })]
        }) : null, a && c.jsxs(c.Fragment, {
          children: [c.jsx("span", {
            className: "sketch-lightbox-action-divider",
            "aria-hidden": !0
          }), c.jsxs("button", {
            type: "button",
            onClick: Hn => {
              Hn.stopPropagation(), (async () => {
                try {
                  const {
                      resolveHistoryItemPrompt: $t
                    } = await Ie(async () => {
                      const {
                        resolveHistoryItemPrompt: Qe
                      } = await Promise.resolve().then(() => Gu);
                      return {
                        resolveHistoryItemPrompt: Qe
                      };
                    }, void 0, import.meta.url),
                    je = await $t(e);
                  if (!je) return;
                  await navigator.clipboard.writeText(je), console.log("提示词已复制");
                } catch ($t) {
                  console.error("复制失败:", $t);
                }
              })();
            },
            className: "sketch-lightbox-action",
            title: x("复制提示词"),
            children: [c.jsx(Cx, {
              size: Ew,
              strokeWidth: 1.5
            }), x("复制")]
          })]
        })]
      })
    }), R && c.jsx("div", {
      className: "sketch-lightbox-context-menu fixed py-1 min-w-[180px] z-[300]",
      style: {
        left: R.x,
        top: R.y
      },
      onClick: Hn => Hn.stopPropagation(),
      children: c.jsxs("button", {
        type: "button",
        className: "w-full px-4 py-2 text-left text-sm transition-colors flex items-center gap-2",
        onClick: Hn => {
          Hn.stopPropagation();
          const $t = [...I].sort((je, Qe) => je - Qe).map(je => Bt[je]).filter(Boolean);
          $t.length > 0 && r && (r($t), t()), j(null);
        },
        children: [c.jsx(Bv, {
          size: 14,
          strokeWidth: 1.5
        }), x("发送到画布 ("), I.length, x("张)")]
      })
    })]
  });
}

function gGa(e, t) {
  if (e.item !== t.item) {
    if (!e.item || !t.item || e.item.type !== t.item.type || e.item.url !== t.item.url || e.item.originalUrl !== t.item.originalUrl || e.item.thumbnailUrl !== t.item.thumbnailUrl || e.item._ossThumbnailUrl !== t.item._ossThumbnailUrl || e.item._ossLightboxPending !== t.item._ossLightboxPending || e.item._ossRemoteUrl !== t.item._ossRemoteUrl || e.item._globalOssUrlOnly !== t.item._globalOssUrlOnly || e.item.ossUploaded !== t.item.ossUploaded || e.item.id !== t.item.id) return !1;
    const n = (e.item.mjImages ?? []).join("\0"),
      r = (t.item.mjImages ?? []).join("\0");
    if (n !== r || (e.item.mjThumbnails ?? []).join("\0") !== (t.item.mjThumbnails ?? []).join("\0") || e.item.selectedMjImageIndex !== t.item.selectedMjImageIndex || e.item.preferDisplayUrls !== t.item.preferDisplayUrls) return !1;
    const a = (e.item.mjMediaTypes ?? []).join("\0"),
      i = (t.item.mjMediaTypes ?? []).join("\0");
    if (a !== i) return !1;
  }
  return e.onClose === t.onClose && e.onNavigate === t.onNavigate && e.onSendToCanvas === t.onSendToCanvas && e.showPromptCopy === t.showPromptCopy && e.openingMotion === t.openingMotion && e.quickOpen === t.quickOpen && e.skipOpeningAnimation === t.skipOpeningAnimation && e.isCanvasFullscreen === t.isCanvasFullscreen && e.canvasContainerRef === t.canvasContainerRef && e.toastLoading === t.toastLoading && e.toastSuccess === t.toastSuccess && e.toastError === t.toastError && e.removeToast === t.removeToast;
}

const Lwt = Ia.memo(fGa, gGa),
  yGa = Object.freeze(Object.defineProperty({
    __proto__: null,
    Lightbox: Lwt,
    default: Lwt
  }, Symbol.toStringTag, {
    value: "Module"
  }));

function bGa({
  item: e,
  getContentUrl: t,
  getPreviewUrl: n,
  onReveal: r,
  onClose: a,
  onInsert: i
}) {
  var b, v;
  on();
  const o = g.useRef(null),
    [s, l] = g.useState(""),
    [d, u] = g.useState(""),
    [h, p] = g.useState(e.kind !== "file"),
    [m, f] = g.useState("");
  g.useEffect(() => {
    var k, A;
    let _ = !1;
    const w = document.activeElement;
    return (A = (k = o.current) == null ? void 0 : k.querySelector("button")) == null || A.focus(), n == null || n(e).then(S => {
      _ || u(S || "");
    }).catch(() => {}), e.kind !== "file" && Promise.resolve(t == null ? void 0 : t(e)).then(S => {
      _ || (S ? l(S) : f(x("无法读取原文件")));
    }).catch(() => {
      _ || f(x("无法读取原文件"));
    }).finally(() => {
      _ || p(!1);
    }), () => {
      _ = !0, w != null && w.isConnected && w.focus();
    };
  }, [e, t, n]);
  const y = async () => {
    try {
      await (r == null ? void 0 : r(e));
    } catch {
      f(x("打开文件夹失败"));
    }
  };
  return c.jsx("div", {
    className: "pose-wall-file-overlay",
    onMouseDown: _ => {
      _.target === _.currentTarget && a();
    },
    children: c.jsxs("div", {
      ref: o,
      className: "pose-wall-file-preview",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": x("素材预览"),
      onKeyDown: _ => {
        var k, A, S;
        if (_.key === "Escape" && (_.stopPropagation(), a()), _.key !== "Tab") return;
        const w = [...(((k = o.current) == null ? void 0 : k.querySelectorAll("button:not(:disabled), video, audio")) || [])];
        _.shiftKey && document.activeElement === w[0] ? (_.preventDefault(), (A = w[w.length - 1]) == null || A.focus()) : !_.shiftKey && document.activeElement === w[w.length - 1] && (_.preventDefault(), (S = w[0]) == null || S.focus());
      },
      children: [c.jsxs("header", {
        children: [c.jsx("strong", {
          title: e.title,
          children: e.title
        }), c.jsx("button", {
          className: "pose-wall-icon",
          "aria-label": x("关闭素材预览"),
          onClick: a,
          children: c.jsx(Na, {
            size: 20
          })
        })]
      }), c.jsx("div", {
        className: "pose-wall-file-content",
        children: h ? c.jsx(Ua, {
          className: "animate-spin",
          size: 28
        }) : m ? c.jsx("p", {
          role: "alert",
          children: m
        }) : e.kind === "video" && s ? c.jsx("video", {
          controls: !0,
          playsInline: !0,
          preload: "metadata",
          src: s,
          poster: d || void 0,
          onError: () => f(x("当前视频编码无法播放，请打开原文件"))
        }) : e.kind === "audio" && s ? c.jsxs(c.Fragment, {
          children: [c.jsx(Qh, {
            size: 52
          }), c.jsx("audio", {
            controls: !0,
            preload: "metadata",
            src: s,
            onError: () => f(x("当前音频编码无法播放，请打开原文件"))
          })]
        }) : d ? c.jsx("img", {
          src: d,
          alt: e.title
        }) : c.jsx(ZEn, {
          size: 52
        })
      }), c.jsxs("div", {
        className: "pose-wall-file-details",
        children: [c.jsxs("span", {
          children: [((b = e.ext) == null ? void 0 : b.toUpperCase()) || x("文件"), e.size != null ? ` · ${(e.size / 1024 / 1024).toFixed(2)} MB` : "", e.width && e.height ? ` · ${e.width} × ${e.height}` : ""]
        }), !!((v = e.tags) != null && v.length) && c.jsx("p", {
          children: e.tags.join(" · ")
        }), e.annotation && c.jsx("p", {
          children: e.annotation
        }), e.kind === "file" && c.jsx("p", {
          children: x("此格式显示 Eagle 缩略图，可打开所在文件夹查看原文件。")
        })]
      }), c.jsxs("footer", {
        children: [r && c.jsxs("button", {
          onClick: () => void y(),
          children: [c.jsx(Sc, {
            size: 15
          }), x("打开所在文件夹")]
        }), e.kind !== "file" && c.jsxs("button", {
          onClick: i,
          children: [c.jsx(eo, {
            size: 15
          }), x("插入画布")]
        })]
      })]
    })
  });
}

const rin = {
    red: "#ef5350",
    orange: "#f5a623",
    yellow: "#d5bd36",
    green: "#36bd62",
    blue: "#4a9eff",
    purple: "#ac7ee1",
    gray: "#96999e"
  },
  Htr = ({
    folder: e,
    currentId: t,
    onSelect: n,
    disabled: r
  }) => {
    var l, d;
    on();
    const [a, i] = g.useState(!!e.isExpand),
      o = !!((l = e.children) != null && l.length),
      s = a ? e.imageCount : e.descendantImageCount ?? e.imageCount;
    return c.jsxs(c.Fragment, {
      children: [c.jsxs("div", {
        className: "pose-wall-folder-row",
        "data-selected": e.id === t,
        children: [o ? c.jsx("button", {
          type: "button",
          className: "pose-wall-chevron",
          "aria-label": `${a ? "折叠" : "展开"} ${e.name}`,
          "aria-expanded": a,
          onClick: () => i(!a),
          children: a ? c.jsx(Mi, {
            size: 13
          }) : c.jsx(ss, {
            size: 13
          })
        }) : c.jsx("span", {
          className: "pose-wall-chevron"
        }), c.jsxs("button", {
          type: "button",
          className: "pose-wall-nav-item",
          "aria-label": e.name,
          "aria-current": e.id === t ? "page" : void 0,
          disabled: r,
          onClick: () => n == null ? void 0 : n(e.id),
          title: e.name,
          children: [a ? c.jsx(Sc, {
            size: 16,
            style: {
              color: rin[e.iconColor || ""]
            }
          }) : c.jsx(_h, {
            size: 16,
            style: {
              color: rin[e.iconColor || ""]
            }
          }), c.jsx("span", {
            children: e.name
          }), s != null && c.jsx("small", {
            children: s.toLocaleString()
          })]
        })]
      }), a && c.jsx("div", {
        className: "pose-wall-folder-children",
        children: (d = e.children) == null ? void 0 : d.map(u => c.jsx(Htr, {
          folder: u,
          currentId: t,
          onSelect: n,
          disabled: r
        }, u.id))
      })]
    });
  };

function Wtr(e, t) {
  const [n, r] = g.useState(e.imageUrl),
    [a, i] = g.useState(!1),
    [o, s] = g.useState(0);
  return g.useEffect(() => {
    let l = !1;
    return r(e.imageUrl), i(!1), e.imageUrl || Promise.resolve().then(() => t == null ? void 0 : t(e)).catch(() => null).then(d => {
      l || (r(d || ""), i(!d));
    }), () => {
      l = !0;
    };
  }, [e, t, o]), {
    url: n,
    failed: a,
    fail: () => i(!0),
    retry: () => s(l => l + 1)
  };
}

const vGa = g.memo(function ({
  item: t,
  getPreviewUrl: n,
  favorite: r,
  showNames: a,
  enlarge: i,
  onFavorite: o,
  onInsert: s,
  onPreview: l,
  onDrag: d
}) {
  var f, y, b;
  on();
  const u = Wtr(t, n),
    h = t.kind !== "file",
    p = t.kind === "video" ? wb : t.kind === "audio" ? Qh : t.kind === "file" ? ZEn : lo,
    m = g.useRef(null);
  return g.useEffect(() => () => {
    m.current != null && cancelAnimationFrame(m.current);
  }, []), c.jsxs("div", {
    className: "pose-wall-card",
    "data-pose-id": t.id,
    draggable: h,
    onDragStart: v => {
      if (!h) {
        v.preventDefault();
        return;
      }
      v.dataTransfer.setData("application/json", JSON.stringify({
        type: "pose-reference",
        itemId: t.id,
        title: t.title,
        filePath: t.filePath,
        imageUrl: t.imageUrl || void 0,
        mediaType: t.kind
      })), v.dataTransfer.effectAllowed = "copy", m.current = requestAnimationFrame(() => d(!0));
    },
    onDragEnd: () => {
      m.current != null && cancelAnimationFrame(m.current), d(!1);
    },
    children: [c.jsx("button", {
      type: "button",
      draggable: h,
      className: "pose-wall-image",
      "aria-label": x("预览 {0}", t.title),
      title: [t.title, (f = t.ext) == null ? void 0 : f.toUpperCase(), (y = t.tags) == null ? void 0 : y.join(" · "), t.annotation].filter(Boolean).join(`
`),
      onClick: () => l(t),
      children: u.url && !u.failed ? c.jsx("img", {
        src: u.url,
        alt: t.title,
        draggable: h,
        decoding: "async",
        style: {
          objectFit: i ? "contain" : "scale-down"
        },
        onError: u.fail
      }) : c.jsxs("span", {
        className: "pose-wall-placeholder",
        children: [c.jsx(p, {
          size: 28
        }), c.jsx("span", {
          children: ((b = t.ext) == null ? void 0 : b.toUpperCase()) || (u.failed ? x("预览暂不可用") : x("加载中…"))
        })]
      })
    }), u.failed && !t.noThumbnail && c.jsxs("button", {
      type: "button",
      className: "pose-wall-retry",
      "aria-label": x("重试 {0}", t.title),
      onClick: u.retry,
      children: [c.jsx(bd, {
        size: 13
      }), x("重试")]
    }), t.ext && c.jsxs("span", {
      className: "pose-wall-file-type",
      children: [c.jsx(p, {
        size: 11
      }), t.ext.toUpperCase()]
    }), c.jsx("button", {
      type: "button",
      className: "pose-wall-card-action pose-wall-favorite",
      "data-active": r,
      "aria-label": `${r ? "取消收藏" : "收藏"} ${t.title}`,
      title: x(r ? "取消收藏" : "收藏"),
      "aria-pressed": r,
      onClick: () => o(t.id),
      children: c.jsx(CP, {
        size: 14,
        fill: r ? "currentColor" : "none"
      })
    }), h && c.jsx("button", {
      type: "button",
      className: "pose-wall-card-action pose-wall-insert",
      "aria-label": x("插入画布 {0}", t.title),
      title: x("插入画布"),
      onClick: () => void s(t),
      children: c.jsx(eo, {
        size: 16
      })
    }), a && c.jsxs("div", {
      className: "pose-wall-caption",
      children: [c.jsx("span", {
        title: t.title,
        children: t.title
      }), c.jsx("small", {
        title: t.category,
        children: t.category || x("未分类")
      })]
    })]
  });
});

function wGa({
  item: e,
  getPreviewUrl: t,
  onClose: n,
  onInsert: r
}) {
  on();
  const a = Wtr(e, t);
  return !a.url || a.failed ? c.jsxs("div", {
    className: "pose-wall-preview-status",
    role: "dialog",
    "aria-label": x("图片预览"),
    children: [c.jsx("button", {
      type: "button",
      "aria-label": x("关闭图片预览"),
      onClick: n,
      children: c.jsx(Na, {
        size: 20
      })
    }), c.jsx(lo, {
      size: 36
    }), c.jsx("p", {
      children: a.failed ? x("暂时无法加载预览") : x("正在加载预览…")
    }), a.failed && c.jsx("button", {
      type: "button",
      onClick: a.retry,
      children: x("重试")
    })]
  }) : c.jsx(Lwt, {
    item: {
      id: e.id,
      type: "image",
      url: a.url,
      title: e.title,
      preferDisplayUrls: !0
    },
    onClose: n,
    onSendToCanvas: r,
    showPromptCopy: !1
  });
}

const xGa = ({
    isOpen: e,
    isDark: t,
    items: n,
    loading: r,
    error: a,
    folderPath: i,
    folderPaths: o,
    isTauri: s,
    favoritedIds: l,
    dataSource: d = "local",
    eagleFolders: u = [],
    currentEagleFolderId: h = null,
    onClose: p,
    onChooseFolder: m,
    onSwitchFolder: f,
    onRemoveCurrentFolder: y,
    onClearFolder: b,
    onSelectFiles: v,
    onInsertPose: _,
    onToggleFavorite: w,
    onConnectEagle: k,
    onSwitchEagleFolder: A,
    onSwitchToLocal: S,
    getPreviewUrl: C,
    getContentUrl: I,
    onRevealFile: E,
    eagleTotalCount: M,
    eagleLoadCount: T,
    onShowAllEagle: P
  }) => {
    var ke;
    on();
    const [R, j] = g.useState(""),
      B = g.useDeferredValue(R),
      [F, N] = g.useState("all"),
      [G, z] = g.useState("grid"),
      [V, O] = g.useState(null),
      [L, D] = g.useState(144),
      [U, H] = g.useState(!0),
      [Y, K] = g.useState(!0),
      [W, Q] = g.useState("original"),
      [q, ne] = g.useState(null),
      [de, le] = g.useState(!1),
      [J, pe] = g.useState({
        width: 900,
        height: 600
      }),
      ce = g.useRef(null),
      we = g.useRef(null),
      X = g.useRef(null),
      Z = g.useRef(null),
      re = g.useRef(q);
    re.current = q, g.useLayoutEffect(() => {
      if (!e || !we.current) return;
      const ve = we.current,
        Te = () => pe({
          width: ve.clientWidth,
          height: ve.clientHeight
        });
      Te();
      const Ne = new ResizeObserver(Te);
      return Ne.observe(ve), () => Ne.disconnect();
    }, [e]), g.useEffect(() => {
      O(null), ne(null);
    }, [i, h, d]), g.useEffect(() => {
      var Ne;
      if (!e) return;
      const ve = document.activeElement;
      (Ne = Z.current) == null || Ne.focus();
      const Te = me => {
        var $e, rt;
        if (!(($e = ce.current) != null && $e.getClientRects().length) || (me.key === "Escape" && !document.querySelector(".sketch-lightbox-overlay") && (me.preventDefault(), me.stopImmediatePropagation(), re.current ? ne(null) : p()), me.key !== "Tab" || re.current)) return;
        const Ae = (rt = ce.current) == null ? void 0 : rt.querySelectorAll('button:not(:disabled), input:not(:disabled), select:not(:disabled), [tabindex="0"]'),
          Fe = Ae ? [...Ae].filter(nt => nt.getClientRects().length) : [],
          Me = Fe[0],
          Re = Fe[Fe.length - 1];
        me.shiftKey && document.activeElement === Me ? (me.preventDefault(), Re == null || Re.focus()) : !me.shiftKey && document.activeElement === Re && (me.preventDefault(), Me == null || Me.focus());
      };
      return document.addEventListener("keydown", Te, !0), () => {
        document.removeEventListener("keydown", Te, !0), ve != null && ve.isConnected && ve.focus();
      };
    }, [e, p]), g.useEffect(() => {
      if (!de) return;
      const ve = () => le(!1);
      return window.addEventListener("dragend", ve), window.addEventListener("drop", ve), () => {
        window.removeEventListener("dragend", ve), window.removeEventListener("drop", ve);
      };
    }, [de]);
    const fe = g.useMemo(() => {
        const ve = new Map();
        return n.forEach(Te => {
          const Ne = Te.category || "未分类";
          ve.set(Ne, (ve.get(Ne) || 0) + 1);
        }), [...ve];
      }, [n]),
      ye = g.useMemo(() => n.reduce((ve, Te) => ve + Number(l.has(Te.id)), 0), [n, l]),
      ie = g.useMemo(() => {
        const ve = B.trim().toLowerCase(),
          Te = n.filter(Ne => {
            var me;
            return (F !== "favorites" || l.has(Ne.id)) && (!V || (Ne.category || "未分类") === V) && (!ve || `${Ne.title} ${Ne.category} ${Ne.ext || ""} ${((me = Ne.tags) == null ? void 0 : me.join(" ")) || ""} ${Ne.annotation || ""}`.toLowerCase().includes(ve));
          });
        return W !== "original" && Te.sort((Ne, me) => Ne.title.localeCompare(me.title, "zh-CN", {
          numeric: !0
        }) * (W === "asc" ? 1 : -1)), Te;
      }, [n, B, F, V, l, W]),
      ae = G === "list",
      be = ae ? 1 : Math.max(1, Math.floor((J.width + 12) / (L + 12))),
      Ee = Math.max(1, (J.width - (be - 1) * 12) / be),
      he = (ae ? Math.max(64, L / 2) : Ee / (G === "landscape" ? 1.6 : G === "portrait" ? .75 : 1)) + (!ae && U ? 44 : 0) + 12,
      ue = g.useMemo(() => Array.from({
        length: Math.ceil(ie.length / be)
      }, (ve, Te) => ({
        id: ie[Te * be].id,
        items: ie.slice(Te * be, (Te + 1) * be)
      })), [ie, be]),
      ge = d === "eagle" ? ((ke = dOt(u, h || "")) == null ? void 0 : ke.name) || "Eagle 素材库" : (i == null ? void 0 : i.split(/[/\\]/).filter(Boolean).pop()) || "本地图片",
      _e = [d, i, h, V, B, F, G, W, be, L, U].join("|");
    return e ? c.jsxs("div", {
      className: `pose-wall-overlay ${t ? "pose-wall-dark" : "pose-wall-light"}${de ? " is-dragging" : ""}`,
      onMouseDown: ve => {
        ve.target === ve.currentTarget && p();
      },
      children: [c.jsxs("div", {
        ref: ce,
        className: "pose-wall-dialog",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "pose-wall-title",
        onKeyDown: ve => {
          q || ve.stopPropagation();
        },
        onWheel: ve => ve.stopPropagation(),
        onDragOver: ve => ve.stopPropagation(),
        onDrop: ve => ve.stopPropagation(),
        children: [c.jsxs("header", {
          className: "pose-wall-header",
          children: [c.jsx("div", {
            className: "pose-wall-heading",
            children: c.jsxs("div", {
              children: [c.jsx("h2", {
                id: "pose-wall-title",
                children: x("本地素材库")
              }), c.jsx("p", {
                children: x("浏览、收藏，将灵感放入画布")
              })]
            })
          }), c.jsx("button", {
            type: "button",
            className: "pose-wall-icon pose-wall-close",
            "aria-label": x("关闭本地素材库"),
            title: x("关闭 · Esc"),
            onClick: p,
            children: c.jsx(Na, {
              size: 19
            })
          })]
        }), c.jsxs("div", {
          className: "pose-wall-body",
          children: [c.jsxs("aside", {
            className: "pose-wall-sidebar",
            "data-source": d,
            "aria-label": x("素材目录"),
            children: [c.jsxs("div", {
              className: "pose-wall-nav-top",
              children: [c.jsxs("button", {
                type: "button",
                className: "pose-wall-nav-item",
                "aria-current": F === "all" && !V && (d !== "eagle" || !h) ? "page" : void 0,
                onClick: () => {
                  N("all"), O(null), d === "eagle" && (P == null || P());
                },
                children: [c.jsx(lo, {
                  size: 16
                }), c.jsx("span", {
                  children: x("全部素材")
                }), c.jsx("small", {
                  children: d === "eagle" ? M ?? n.length : n.length
                })]
              }), c.jsxs("button", {
                type: "button",
                className: "pose-wall-nav-item",
                "aria-current": F === "favorites" ? "page" : void 0,
                onClick: () => {
                  N("favorites"), O(null), d === "eagle" && (P == null || P());
                },
                children: [c.jsx(CP, {
                  size: 16
                }), c.jsx("span", {
                  children: x("收藏")
                }), c.jsx("small", {
                  children: ye
                })]
              })]
            }), d !== "eagle" && c.jsxs("div", {
              className: "pose-wall-directory-title",
              children: [c.jsx("span", {
                children: x("文件夹")
              }), c.jsx("button", {
                type: "button",
                className: "pose-wall-icon",
                "aria-label": x(s ? "添加文件夹" : "选择图片"),
                title: x(s ? "添加文件夹" : "选择图片"),
                disabled: r,
                onClick: s ? m : () => {
                  var ve;
                  return (ve = X.current) == null ? void 0 : ve.click();
                },
                children: c.jsx(eo, {
                  size: 16
                })
              })]
            }), c.jsx("nav", {
              className: "pose-wall-folders custom-scrollbar",
              children: d === "eagle" ? u.map(ve => c.jsx(Htr, {
                folder: ve,
                currentId: h,
                onSelect: Te => {
                  N("all"), O(null), A == null || A(Te);
                },
                disabled: r
              }, ve.id)) : c.jsxs(c.Fragment, {
                children: [o.map(ve => c.jsxs("button", {
                  type: "button",
                  className: "pose-wall-nav-item",
                  "aria-current": ve === i ? "page" : void 0,
                  disabled: r,
                  title: ve,
                  onClick: () => f(ve),
                  children: [c.jsx(Sc, {
                    size: 15
                  }), c.jsx("span", {
                    children: ve.split(/[/\\]/).filter(Boolean).pop() || ve
                  })]
                }, ve)), fe.length > 0 && c.jsxs("div", {
                  className: "pose-wall-categories",
                  children: [c.jsx("div", {
                    className: "pose-wall-section-label",
                    children: x("当前目录分类")
                  }), fe.map(([ve, Te]) => c.jsxs("button", {
                    type: "button",
                    className: "pose-wall-nav-item",
                    "aria-current": V === ve ? "page" : void 0,
                    onClick: () => {
                      O(ve), N("all");
                    },
                    title: ve,
                    children: [c.jsx(_h, {
                      size: 14
                    }), c.jsx("span", {
                      children: ve
                    }), c.jsx("small", {
                      children: Te
                    })]
                  }, ve))]
                }), !o.length && !n.length && c.jsx("p", {
                  className: "pose-wall-directory-empty",
                  children: x("添加文件夹，开始浏览本地图片。")
                })]
              })
            }), c.jsxs("div", {
              className: "pose-wall-sidebar-bottom",
              children: [c.jsxs("div", {
                className: "pose-wall-source",
                "aria-label": x("素材来源"),
                children: [c.jsx("button", {
                  type: "button",
                  "aria-label": x("本地文件夹"),
                  title: x("本地文件夹"),
                  "aria-pressed": d === "local",
                  onClick: S,
                  disabled: r && d === "local",
                  children: x("本地")
                }), s && k && c.jsx("button", {
                  type: "button",
                  "aria-label": x("Eagle 素材库"),
                  title: x("Eagle 素材库"),
                  "aria-pressed": d === "eagle",
                  onClick: () => {
                    d !== "eagle" && k(!1);
                  },
                  disabled: r,
                  children: "Eagle"
                })]
              }), c.jsxs("button", {
                type: "button",
                className: "pose-wall-add",
                disabled: r,
                onClick: d === "eagle" ? () => k == null ? void 0 : k() : s ? m : () => {
                  var ve;
                  return (ve = X.current) == null ? void 0 : ve.click();
                },
                children: [r ? c.jsx(Ua, {
                  size: 15,
                  className: "animate-spin"
                }) : d === "eagle" ? c.jsx(bd, {
                  size: 15
                }) : s ? c.jsx(Sc, {
                  size: 15
                }) : c.jsx(ml, {
                  size: 15
                }), x(d === "eagle" ? "刷新 Eagle" : s ? "添加文件夹" : "选择图片")]
              }), d === "local" && o.length > 0 && c.jsxs("div", {
                className: "pose-wall-folder-actions",
                children: [c.jsxs("button", {
                  type: "button",
                  disabled: r,
                  title: x("从列表移除当前文件夹，原文件不受影响"),
                  onClick: y,
                  children: [c.jsx(Qo, {
                    size: 12
                  }), x("移除当前")]
                }), c.jsx("button", {
                  type: "button",
                  disabled: r,
                  title: x("清除文件夹列表，原文件不受影响"),
                  onClick: b,
                  children: x("清除列表")
                })]
              })]
            })]
          }), c.jsxs("main", {
            className: "pose-wall-main",
            children: [c.jsxs("div", {
              className: "pose-wall-toolbar",
              children: [c.jsxs("label", {
                className: "pose-wall-search",
                children: [c.jsx(mc, {
                  size: 16
                }), c.jsx("input", {
                  ref: Z,
                  "aria-label": x("搜索素材"),
                  placeholder: x("搜索名称或分类…"),
                  value: R,
                  onChange: ve => j(ve.target.value)
                }), R && c.jsx("button", {
                  type: "button",
                  "aria-label": x("清除搜索"),
                  onClick: () => j(""),
                  children: c.jsx(Na, {
                    size: 14
                  })
                })]
              }), c.jsxs("div", {
                className: "pose-wall-view-tools",
                children: [c.jsxs("div", {
                  className: "pose-wall-layout-switch",
                  role: "group",
                  "aria-label": x("浏览方式"),
                  children: [c.jsx("button", {
                    type: "button",
                    className: "pose-wall-icon",
                    "aria-label": x("方格浏览"),
                    title: x("方格浏览"),
                    "aria-pressed": G === "grid",
                    onClick: () => z("grid"),
                    children: c.jsx(Od, {
                      size: 15
                    })
                  }), c.jsx("button", {
                    type: "button",
                    className: "pose-wall-icon",
                    "aria-label": x("横向浏览"),
                    title: x("横向浏览"),
                    "aria-pressed": G === "landscape",
                    onClick: () => z("landscape"),
                    children: c.jsx(A5e, {
                      size: 16
                    })
                  }), c.jsx("button", {
                    type: "button",
                    className: "pose-wall-icon",
                    "aria-label": x("竖向浏览"),
                    title: x("竖向浏览"),
                    "aria-pressed": G === "portrait",
                    onClick: () => z("portrait"),
                    children: c.jsx(bTn, {
                      size: 16
                    })
                  }), c.jsx("button", {
                    type: "button",
                    className: "pose-wall-icon",
                    "aria-label": x("列表浏览"),
                    title: x("列表浏览"),
                    "aria-pressed": ae,
                    onClick: () => z("list"),
                    children: c.jsx(X$, {
                      size: 16
                    })
                  })]
                }), c.jsxs("label", {
                  className: "pose-wall-size",
                  title: x("缩略图大小"),
                  children: [c.jsx(lo, {
                    size: 14
                  }), c.jsx("input", {
                    "aria-label": x("缩略图大小"),
                    type: "range",
                    min: 80,
                    max: 240,
                    step: 8,
                    value: L,
                    onChange: ve => D(Number(ve.target.value))
                  }), c.jsx("span", {
                    children: L
                  })]
                }), c.jsx("button", {
                  type: "button",
                  className: "pose-wall-icon",
                  "aria-label": x("显示文件名"),
                  title: x(ae ? "列表始终显示文件名" : U ? "隐藏文件名" : "显示文件名"),
                  "aria-pressed": U || ae,
                  disabled: ae,
                  onClick: () => H(!U),
                  children: U || ae ? c.jsx(ul, {
                    size: 16
                  }) : c.jsx($d, {
                    size: 16
                  })
                }), c.jsx("button", {
                  type: "button",
                  className: "pose-wall-icon",
                  "aria-label": x("允许放大小图"),
                  title: x("允许放大小图"),
                  "aria-pressed": Y,
                  onClick: () => K(!Y),
                  children: c.jsx(kT, {
                    size: 16
                  })
                }), c.jsxs("label", {
                  className: "pose-wall-sort",
                  children: [W === "desc" ? c.jsx(xRr, {
                    size: 15
                  }) : c.jsx(bRr, {
                    size: 15
                  }), c.jsxs("select", {
                    "aria-label": x("素材排序"),
                    value: W,
                    onChange: ve => Q(ve.target.value),
                    children: [c.jsx("option", {
                      value: "original",
                      children: x("默认排序")
                    }), c.jsx("option", {
                      value: "asc",
                      children: x("名称正序")
                    }), c.jsx("option", {
                      value: "desc",
                      children: x("名称倒序")
                    })]
                  })]
                })]
              })]
            }), c.jsxs("div", {
              className: "pose-wall-location",
              children: [c.jsx(Sc, {
                size: 14
              }), c.jsxs("span", {
                title: i || ge,
                children: [ge, V ? ` / ${V}` : F === "favorites" ? x(" / 收藏") : ""]
              }), c.jsxs("small", {
                children: [ie.length, x(d === "eagle" ? " 项" : " 张")]
              })]
            }), a && c.jsx("div", {
              className: "pose-wall-error",
              role: "alert",
              children: a
            }), c.jsx("div", {
              ref: we,
              className: "pose-wall-list-host",
              "data-source": d,
              "data-layout": G,
              "aria-busy": r || R !== B,
              children: r ? c.jsxs("div", {
                className: "pose-wall-empty",
                role: "status",
                children: [c.jsx(Ua, {
                  size: 28,
                  className: "animate-spin"
                }), c.jsxs("p", {
                  children: [x("正在加载素材…"), d === "eagle" && T ? ` ${T.toLocaleString()}` : ""]
                })]
              }) : ie.length ? c.jsx(CFa, {
                items: ue,
                itemHeight: he,
                containerHeight: J.height,
                overscan: 2,
                className: "pose-wall-scroll custom-scrollbar",
                renderItem: ve => c.jsx("div", {
                  className: "pose-wall-row",
                  style: {
                    gridTemplateColumns: `repeat(${be}, minmax(0, 1fr))`,
                    height: he - 12
                  },
                  children: ve.items.map(Te => c.jsx(vGa, {
                    item: Te,
                    getPreviewUrl: C,
                    favorite: l.has(Te.id),
                    showNames: U || ae,
                    enlarge: Y,
                    onFavorite: w,
                    onInsert: _,
                    onPreview: ne,
                    onDrag: le
                  }, Te.id))
                })
              }, _e) : c.jsxs("div", {
                className: "pose-wall-empty",
                children: [c.jsx(lo, {
                  size: 42
                }), c.jsx("h3", {
                  children: n.length ? x("没有找到匹配的素材") : x("把本地图片放进你的灵感库")
                }), c.jsx("p", {
                  children: n.length ? x("换个关键词，或查看全部素材。") : x(d === "eagle" ? "连接 Eagle 后，在左侧选择文件夹。" : "选择文件夹后，就可以在这里上下浏览、预览和插入画布。")
                }), n.length ? c.jsx("button", {
                  type: "button",
                  onClick: () => {
                    j(""), O(null), N("all");
                  },
                  children: x("查看全部素材")
                }) : c.jsx("button", {
                  type: "button",
                  onClick: d === "eagle" ? () => k == null ? void 0 : k() : s ? m : () => {
                    var ve;
                    return (ve = X.current) == null ? void 0 : ve.click();
                  },
                  children: x(d === "eagle" ? "连接 Eagle" : s ? "添加文件夹" : "选择图片")
                })]
              })
            }), c.jsxs("footer", {
              className: "pose-wall-footer",
              children: [c.jsxs("span", {
                children: [x("显示 "), ie.length, " / ", n.length, x(d === "eagle" ? " 项" : " 张")]
              }), c.jsx("span", {
                children: x("点击预览 · ＋ 插入 · 拖入画布")
              })]
            })]
          })]
        }), c.jsx("input", {
          ref: X,
          type: "file",
          accept: "image/png,image/jpeg,image/gif,image/webp,image/bmp",
          multiple: !0,
          hidden: !0,
          onChange: ve => {
            var Te;
            (Te = ve.target.files) != null && Te.length && (v == null || v(Array.from(ve.target.files))), ve.target.value = "";
          }
        })]
      }), q && Da.createPortal(c.jsx("div", {
        className: `pose-wall-preview ${t ? "pose-wall-dark" : "pose-wall-light"}`,
        children: q.kind && q.kind !== "image" ? c.jsx(bGa, {
          item: q,
          getContentUrl: I,
          getPreviewUrl: C,
          onReveal: E,
          onClose: () => ne(null),
          onInsert: () => void _(q)
        }, q.id) : c.jsx(wGa, {
          item: q,
          getPreviewUrl: q.id.startsWith("eagle:") && I ? I : C,
          onClose: () => ne(null),
          onInsert: () => void _(q)
        }, q.id)
      }), document.body)]
    }) : null;
  },
  ain = g.memo(xGa),
  _Ga = Object.freeze(Object.defineProperty({
    __proto__: null,
    PoseReferenceSidebar: ain,
    default: ain
  }, Symbol.toStringTag, {
    value: "Module"
  }));

function kGa(e) {
  const t = new Date(e),
    n = new Date();
  return t.toDateString() === n.toDateString() ? t.toLocaleTimeString(ew(), {
    hour: "2-digit",
    minute: "2-digit"
  }) : t.toLocaleDateString(ew(), {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

const AGa = ({
    isOpen: e,
    isDark: t,
    projects: n,
    currentProjectId: r,
    currentProjectName: a,
    isSaving: i,
    isLoading: o,
    progress: s = {
      percent: 0,
      message: ""
    },
    onClose: l,
    onRefreshList: d,
    onSaveCurrent: u,
    onSaveAs: h,
    onOpen: p,
    onInsert: m,
    onDelete: f,
    projectName: y = "",
    ossSettings: b,
    onOssSettingsChange: v,
    listTab: _,
    onListTabChange: w,
    cloudProjects: k,
    ossBusy: A,
    ossMessage: S,
    ossProgress: C,
    ossAvailable: I,
    onRefreshCloudList: E,
    onUploadToCloud: M,
    onDownloadFromCloud: T,
    onDeleteFromCloud: P,
    onOpenFromCloud: R,
    isBackedUpOnOss: j,
    cloudListFetched: B = !1
  }) => {
    on();
    const F = PT(),
      N = IYe((zX() || _ === "local") ? n : []),
      [G, z] = g.useState(null),
      [V, O] = g.useState(""),
      [L, D] = g.useState(!1),
      [U, H] = g.useState(!1),
      [Y, K] = g.useState(!1),
      {
        getEnableLabel: W,
        configHint: Q,
        providerName: q
      } = dXe();
    g.useEffect(() => {
      if (e) {
        if (zX() && _ !== "local" && typeof w === "function") w("local");
        d();
      }
    }, [e, d, _, w]), g.useEffect(() => {
      if (!e) return;
      const pe = () => H(Ur.isAvailable());
      return pe(), window.addEventListener("focus", pe), () => window.removeEventListener("focus", pe);
    }, [e]);
    const ne = async () => {
        const pe = (V || y || "未命名项目").trim();
        if (pe) try {
          if ((await h(pe, "workflow+assets")) === !1) return;
          D(!1), O("");
        } catch (ce) {
          console.error("[ProjectPanel] Save as failed:", ce);
        }
      },
      de = async pe => {
        try {
          if ((await f(pe)) === !1) return;
          G === pe && z(null);
        } catch (ce) {
          console.error("[ProjectPanel] Delete failed:", ce);
        }
      },
      le = async pe => {
        if (P) try {
          if ((await P(pe)) === !1) return;
          G === pe && z(null);
        } catch (ce) {
          console.error("[ProjectPanel] Delete from cloud failed:", ce);
        }
      },
      J = (zX() || _ === "local") ? n.map(pe => ({
        ...pe,
        source: "local",
        hasLocal: !0
      })) : k;
    return e ? c.jsxs("div", {
      className: `side-panel-shell absolute left-0 top-2 bottom-2 w-[240px] z-40 flex flex-col rounded-2xl ${t ? "bg-[#121214] border border-zinc-800 shadow-none" : "bg-zinc-50 border border-[rgba(0,0,0,0.18)] shadow-none"}`,
      style: {
        pointerEvents: "auto"
      },
      children: [c.jsxs("div", {
        className: `p-3 border-b flex justify-between items-center gap-1 ${t ? "border-zinc-800" : "border-zinc-200"}`,
        children: [c.jsxs("h3", {
          className: `font-bold text-xs flex items-center gap-2 min-w-0 ${t ? "text-zinc-300" : "text-zinc-700"}`,
          children: [c.jsx(Sc, {
            size: 16,
            className: `shrink-0 ${t ? "text-zinc-400" : "text-zinc-900"}`
          }), c.jsx("span", {
            className: "truncate",
            children: x("项目管理")
          })]
        }), c.jsxs("div", {
          className: "flex items-center gap-0.5 shrink-0",
          children: [!zX() && c.jsx("button", {
            type: "button",
            onClick: () => K(pe => !pe),
            className: `p-1 rounded ${Y ? t ? "bg-zinc-700 text-zinc-100" : "bg-zinc-200 text-zinc-900" : t ? "text-zinc-500 hover:text-zinc-300" : "text-zinc-400 hover:text-zinc-600"}`,
            title: x("{0} 云端备份设置", q),
            children: c.jsx(IP, {
              size: 14
            })
          }), c.jsx("button", {
            "aria-label": x("关闭项目管理"),
            onClick: l,
            className: t ? "text-zinc-500 hover:text-zinc-300 p-1" : "text-zinc-400 hover:text-zinc-600 p-1",
            children: c.jsx(Na, {
              size: 12
            })
          })]
        })]
      }), !zX() && Y && c.jsxs("div", {
        className: `px-3 py-2 border-b text-[10px] space-y-2 ${t ? "border-zinc-800 bg-zinc-900/50" : "border-zinc-200 bg-zinc-100/80"}`,
        children: [c.jsxs("label", {
          className: `flex items-center gap-2 cursor-pointer ${t ? "text-zinc-300" : "text-zinc-700"}`,
          children: [c.jsx("input", {
            type: "checkbox",
            checked: b.enabled,
            onChange: pe => v({
              enabled: pe.target.checked
            }),
            className: "rounded"
          }), c.jsx(Wp, {
            size: 12
          }), W("")]
        }), !I && b.enabled && c.jsx("p", {
          className: t ? "text-amber-400" : "text-amber-700",
          children: Q
        })]
      }), (i || o) && c.jsxs("div", {
        className: `px-3 py-3 border-b space-y-2 ${t ? "border-zinc-800 bg-zinc-900/50" : "border-zinc-200 bg-zinc-100/30"}`,
        children: [c.jsxs("div", {
          className: "flex justify-between items-center",
          children: [c.jsxs("span", {
            className: `text-[11px] font-medium flex items-center gap-1.5 ${t ? "text-zinc-300" : "text-zinc-700"}`,
            children: [c.jsx(Ua, {
              size: 12,
              className: "animate-spin"
            }), x(i ? "保存中" : "加载中")]
          }), c.jsxs("span", {
            className: `text-[11px] font-semibold tabular-nums ${t ? "text-zinc-400" : "text-zinc-600"}`,
            children: [Math.round(s.percent), "%"]
          })]
        }), c.jsx("div", {
          className: `h-2 rounded-full overflow-hidden ${t ? "bg-zinc-800" : "bg-zinc-200"}`,
          children: c.jsx("div", {
            className: `h-full rounded-full transition-all duration-300 ${t ? "bg-gradient-to-r from-blue-500 to-cyan-400" : "bg-gradient-to-r from-blue-600 to-cyan-500"}`,
            style: {
              width: `${Math.min(100, Math.max(0, s.percent))}%`
            }
          })
        }), s.message && c.jsx("p", {
          className: `text-[10px] truncate leading-relaxed ${t ? "text-zinc-400" : "text-zinc-500"}`,
          title: s.message,
          children: s.message
        }), c.jsx("div", {
          className: `text-[9px] flex justify-between ${t ? "text-zinc-500" : "text-zinc-400"}`,
          children: c.jsx("span", {
            children: i ? s.percent < 30 ? x("准备数据中...") : s.percent < 60 ? x("转换素材中...") : s.percent < 90 ? x("保存到磁盘...") : x("完成") : s.percent < 20 ? x("加载项目文件...") : s.percent < 40 ? x("处理资源引用...") : s.percent < 65 ? x("恢复画布素材...") : s.percent < 80 ? x("同步元数据...") : x("应用到画布...")
          })
        })]
      }), !zX() && b.enabled && I && c.jsxs("div", {
        className: `px-2 py-1.5 border-b flex gap-1 items-center ${t ? "border-zinc-800" : "border-zinc-200"}`,
        children: [c.jsxs("button", {
          type: "button",
          onClick: () => w("local"),
          className: `flex-1 flex items-center justify-center gap-1 py-1 rounded text-[10px] font-medium ${(zX() || _ === "local") ? t ? "bg-zinc-700 text-zinc-100" : "bg-zinc-900 text-white" : t ? "text-zinc-500 hover:bg-zinc-800" : "text-zinc-500 hover:bg-zinc-200"}`,
          children: [c.jsx(axe, {
            size: 11
          }), x("本地")]
        }), c.jsxs("button", {
          type: "button",
          onClick: () => w("cloud"),
          className: `flex-1 flex items-center justify-center gap-1 py-1 rounded text-[10px] font-medium ${(!zX() && _ === "cloud") ? t ? "bg-zinc-700 text-zinc-100" : "bg-zinc-900 text-white" : t ? "text-zinc-500 hover:bg-zinc-800" : "text-zinc-500 hover:bg-zinc-200"}`,
          children: [c.jsx(Wp, {
            size: 11
          }), x("云端")]
        }), (!zX() && _ === "cloud") && c.jsx("button", {
          type: "button",
          onClick: () => void E(),
          disabled: A,
          className: `p-1 rounded ${t ? "text-zinc-400 hover:bg-zinc-800" : "text-zinc-500 hover:bg-zinc-200"}`,
          title: x("刷新云端列表"),
          children: c.jsx(bd, {
            size: 12,
            className: A ? "animate-spin" : ""
          })
        })]
      }), c.jsxs("div", {
        className: `p-2 flex flex-col gap-1.5 border-b ${t ? "border-zinc-800" : "border-zinc-200"}`,
        children: [!U && c.jsxs("div", {
          className: `flex items-start gap-2 p-2 rounded-lg text-[10px] leading-relaxed ${t ? "bg-zinc-800/90 text-zinc-200 border border-zinc-600" : "bg-zinc-100 text-zinc-800 border border-zinc-300"}`,
          children: [c.jsx(eRe, {
            size: 14,
            className: "shrink-0 mt-0.5"
          }), c.jsxs("span", {
            children: [x("请先在「本地存储管理」中启用"), c.jsx("strong", {
              className: "font-semibold",
              children: x("资源缓存目录")
            }), x("。项目将保存到该目录下的"), " ", c.jsx("span", {
              className: "font-mono",
              children: "project management"
            }), x(" 文件夹。")]
          })]
        }), (zX() || _ === "local") && c.jsxs(c.Fragment, {
          children: [c.jsxs("button", {
            onClick: () => u("workflow+assets"),
            disabled: i || !r || !U,
            className: `flex items-center justify-center gap-1.5 py-2 px-4 rounded-lg text-xs font-medium transition-colors border ${i || !r || !U ? t ? "bg-zinc-800 text-zinc-500 border-zinc-800 cursor-not-allowed" : "bg-zinc-200 text-zinc-400 border-zinc-200 cursor-not-allowed" : t ? "cursor-pointer bg-transparent text-zinc-100 border-zinc-500 hover:bg-zinc-800/60" : "cursor-pointer bg-zinc-900 text-white border-zinc-900 hover:bg-black"}`,
            children: [i ? c.jsx(Ua, {
              size: 14,
              className: "animate-spin"
            }) : c.jsx(O5, {
              size: 14
            }), x("保存当前")]
          }), L ? c.jsxs("div", {
            className: "flex flex-col gap-1",
            children: [c.jsx("input", {
              type: F ? "password" : "text",
              value: V,
              onChange: pe => O(pe.target.value),
              placeholder: wp(y || "未命名项目", F),
              className: `w-full px-2 py-1.5 text-xs rounded border ${t ? "bg-zinc-800 border-zinc-600 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"}`,
              onKeyDown: pe => {
                pe.key === "Enter" && ne(), pe.key === "Escape" && D(!1);
              },
              autoFocus: !0
            }), c.jsxs("div", {
              className: "flex gap-1",
              children: [c.jsx("button", {
                onClick: ne,
                className: `flex-1 py-1.5 text-xs rounded-lg font-medium border ${t ? "text-zinc-100 border-zinc-500" : "bg-zinc-900 text-white border-zinc-900"}`,
                children: x("保存")
              }), c.jsx("button", {
                onClick: () => {
                  D(!1), O("");
                },
                className: `flex-1 py-1 text-xs rounded ${t ? "bg-zinc-700 text-zinc-300" : "bg-zinc-200 text-zinc-600"}`,
                children: x("取消")
              })]
            })]
          }) : c.jsxs("button", {
            onClick: () => D(!0),
            disabled: i || !U,
            className: `flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium ${i || !U ? t ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" : "bg-zinc-200 text-zinc-400 cursor-not-allowed" : t ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700" : "bg-zinc-200 text-zinc-600 hover:bg-zinc-300"}`,
            children: [c.jsx(Jle, {
              size: 14
            }), x("另存为")]
          })]
        })]
      }), c.jsxs("div", {
        className: `flex-1 overflow-y-auto p-2 ${t ? "rh-scroll-minimal" : ""}`,
        children: [(zX() || _ === "local") && a && c.jsxs("p", {
          className: `text-[10px] mb-2 ${t ? "text-zinc-500" : "text-zinc-400"}`,
          children: [x("当前："), wp(a, F)]
        }), (!zX() && _ === "cloud") && !B && (S ? c.jsx("p", {
          className: `text-[10px] mb-2 ${t ? "text-red-400/90" : "text-red-600"}`,
          children: S
        }) : null), J.length === 0 ? c.jsx("div", {
          className: `text-center py-8 text-xs ${t ? "text-zinc-500" : "text-zinc-400"}`,
          children: (zX() || _ === "local") ? c.jsxs(c.Fragment, {
            children: [x("暂无已保存项目"), c.jsx("br", {}), x("点击「另存为」保存当前工作流")]
          }) : B ? c.jsx(c.Fragment, {
            children: x("云端暂无项目，请先在本地保存并上传")
          }) : c.jsxs(c.Fragment, {
            children: [x("点击右上角刷新，从 "), q, x(" 拉取云端项目列表")]
          })
        }) : c.jsx("ul", {
          className: "space-y-1.5",
          children: J.map(pe => {
            var Z, re;
            const ce = (zX() || _ === "local") && j(pe.id),
              we = (!zX() && _ === "cloud"),
              X = we ? pe : null;
            return c.jsxs("li", {
              className: `rounded-lg border transition-colors ${G === pe.id ? t ? "border-zinc-400 bg-zinc-700/45" : "border-zinc-900 bg-zinc-100" : t ? "border-zinc-800 hover:border-zinc-600" : "border-zinc-200 hover:border-zinc-300"}`,
              children: [c.jsxs("div", {
                className: "p-2 cursor-pointer",
                onClick: () => z(G === pe.id ? null : pe.id),
                children: [c.jsxs("div", {
                  className: "flex items-center gap-1.5 min-w-0",
                  children: [c.jsx(bWn, {
                    url: F || we ? null : (Z = N[pe.id]) == null ? void 0 : Z.url,
                    name: wp(pe.name, F),
                    isVideo: (re = N[pe.id]) == null ? void 0 : re.isVideo,
                    fallback: F ? "◇" : pe.name.slice(0, 1) || "画",
                    onForceRetry: F || we ? void 0 : () => V7t(pe.id, pe.updatedAt, {
                      force: !0
                    })
                  }), c.jsx("p", {
                    className: `text-xs font-medium truncate flex-1 ${t ? "text-zinc-200" : "text-zinc-800"}`,
                    title: wp(pe.name, F),
                    children: wp(pe.name, F)
                  }), !zX() && ce && b.enabled && c.jsx("span", {
                    className: `shrink-0 text-[9px] px-1 rounded ${t ? "bg-emerald-900/40 text-emerald-400" : "bg-emerald-100 text-emerald-700"}`,
                    children: x("已备份")
                  }), we && c.jsx("span", {
                    className: `shrink-0 text-[9px] px-1 rounded ${X != null && X.hasLocal ? t ? "bg-blue-900/40 text-blue-300" : "bg-blue-100 text-blue-700" : t ? "bg-zinc-700 text-zinc-400" : "bg-zinc-200 text-zinc-600"}`,
                    children: X != null && X.hasLocal ? x("本地+云") : x("仅云端")
                  })]
                }), c.jsxs("p", {
                  className: `text-[10px] mt-0.5 ${t ? "text-zinc-500" : "text-zinc-400"}`,
                  children: [kGa(pe.updatedAt), " · ", pe.nodeCount, x(" 节点")]
                })]
              }), G === pe.id && A && C.projectId === pe.id && (C.kind === "upload" || C.kind === "download" || C.kind === "delete") && c.jsxs("div", {
                className: `px-2 py-1.5 border-t ${t ? "border-zinc-800 bg-zinc-800/40" : "border-zinc-200 bg-sky-50/80"}`,
                children: [c.jsxs("div", {
                  className: "flex justify-between items-center mb-0.5",
                  children: [c.jsx("span", {
                    className: `text-[9px] ${t ? "text-sky-300" : "text-sky-700"}`,
                    children: C.kind === "upload" ? x("上传中") : C.kind === "delete" ? x("删除云端") : x("同步中")
                  }), c.jsxs("span", {
                    className: "text-[9px] text-zinc-500",
                    children: [Math.round(C.percent), "%"]
                  })]
                }), c.jsx("div", {
                  className: `h-1 rounded-full overflow-hidden ${t ? "bg-zinc-700" : "bg-zinc-200"}`,
                  children: c.jsx("div", {
                    className: `h-full rounded-full transition-all ${t ? "bg-sky-400" : "bg-sky-500"}`,
                    style: {
                      width: `${Math.min(100, Math.max(0, C.percent))}%`
                    }
                  })
                }), C.message && c.jsx("p", {
                  className: "mt-0.5 text-[9px] truncate text-zinc-500",
                  title: C.message,
                  children: C.message
                })]
              }), G === pe.id && c.jsxs("div", {
                className: `flex flex-wrap border-t ${t ? "border-zinc-800" : "border-zinc-200"}`,
                children: [(zX() || _ === "local") && c.jsxs(c.Fragment, {
                  children: [c.jsxs("button", {
                    onClick: () => p(pe.id, pe.name),
                    disabled: o || A,
                    className: `flex-1 flex items-center justify-center gap-1 py-1.5 text-[10px] min-w-[33%] ${t ? "hover:bg-zinc-700 text-zinc-300" : "hover:bg-zinc-100 text-zinc-600"}`,
                    children: [c.jsx(Sc, {
                      size: 10
                    }), x("打开")]
                  }), m && c.jsxs("button", {
                    onClick: () => m(pe.id),
                    disabled: o || A,
                    className: `flex-1 flex items-center justify-center gap-1 py-1.5 text-[10px] min-w-[33%] ${t ? "hover:bg-zinc-700 text-zinc-300" : "hover:bg-zinc-100 text-zinc-600"}`,
                    children: [c.jsx(eo, {
                      size: 10
                    }), x("插入")]
                  }), !zX() && b.enabled && I && c.jsxs("button", {
                    onClick: () => void M(pe.id),
                    disabled: A || i,
                    className: `flex-1 flex items-center justify-center gap-1 py-1.5 text-[10px] min-w-[33%] ${t ? "hover:bg-zinc-700 text-sky-400" : "hover:bg-sky-50 text-sky-600"}`,
                    title: x("上传到 {0}", q),
                    children: [A && C.projectId === pe.id && C.kind === "upload" ? c.jsx(Ua, {
                      size: 10,
                      className: "animate-spin"
                    }) : c.jsx(ml, {
                      size: 10
                    }), x("上传")]
                  }), c.jsxs("button", {
                    onClick: () => de(pe.id),
                    className: `flex-1 flex items-center justify-center gap-1 py-1.5 text-[10px] min-w-[33%] ${t ? "hover:bg-red-900/30 text-red-400" : "hover:bg-red-50 text-red-600"}`,
                    title: zX() ? x("删除本地项目副本") : x("仅删除本地 project management 中的副本，不删除 {0} 云端", q),
                    children: [c.jsx(Qo, {
                      size: 10
                    }), x("删本地")]
                  })]
                }), (!zX() && _ === "cloud") && c.jsxs(c.Fragment, {
                  children: [X != null && X.hasLocal ? c.jsxs("button", {
                    onClick: () => void p(pe.id, pe.name),
                    disabled: o || A,
                    className: `flex-1 flex items-center justify-center gap-1 py-1.5 text-[10px] min-w-[50%] ${t ? "hover:bg-zinc-700 text-zinc-300" : "hover:bg-zinc-100 text-zinc-600"}`,
                    title: x("使用本地 project management 目录中的副本打开"),
                    children: [o ? c.jsx(Ua, {
                      size: 10,
                      className: "animate-spin"
                    }) : c.jsx(Sc, {
                      size: 10
                    }), x("本地打开")]
                  }) : R && c.jsxs("button", {
                    onClick: () => void R(pe.id, pe.name),
                    disabled: o || A,
                    className: `flex-1 flex items-center justify-center gap-1 py-1.5 text-[10px] min-w-[50%] ${t ? "hover:bg-zinc-700 text-sky-400" : "hover:bg-sky-50 text-sky-600"}`,
                    title: x("从 {0} 下载到本地并打开；完成后将显示「本地打开」", q),
                    children: [A && C.projectId === pe.id && C.kind === "download" ? c.jsx(Ua, {
                      size: 10,
                      className: "animate-spin"
                    }) : c.jsx(UEn, {
                      size: 10
                    }), x("云端打开")]
                  }), (X == null ? void 0 : X.hasLocal) && I && c.jsxs("button", {
                    onClick: () => void M(pe.id),
                    disabled: A,
                    className: `flex-1 flex items-center justify-center gap-1 py-1.5 text-[10px] min-w-[25%] ${t ? "hover:bg-zinc-700 text-sky-400" : "hover:bg-sky-50 text-sky-600"}`,
                    title: x("将本地项目重新上传到云端"),
                    children: [A && C.projectId === pe.id && C.kind === "upload" ? c.jsx(Ua, {
                      size: 10,
                      className: "animate-spin"
                    }) : c.jsx(ml, {
                      size: 10
                    }), x("上传")]
                  }), I && b.enabled && P && c.jsxs("button", {
                    onClick: () => void le(pe.id),
                    disabled: A || i,
                    className: `flex-1 flex items-center justify-center gap-1 py-1.5 text-[10px] min-w-[25%] ${t ? "hover:bg-red-900/30 text-red-400" : "hover:bg-red-50 text-red-600"}`,
                    title: x("永久删除 {0} 上该项目文件夹内的全部文件（真删，非仅改索引）", q),
                    children: [A && C.projectId === pe.id && C.kind === "delete" ? c.jsx(Ua, {
                      size: 10,
                      className: "animate-spin"
                    }) : c.jsx(Qo, {
                      size: 10
                    }), x("删云端")]
                  })]
                })]
              })]
            }, `${_}-${pe.id}`);
          })
        })]
      })]
    }) : null;
  },
  iin = g.memo(AGa),
  SGa = Object.freeze(Object.defineProperty({
    __proto__: null,
    ProjectPanel: iin,
    default: iin
  }, Symbol.toStringTag, {
    value: "Module"
  }));

function oin(e, t) {
  return `flex-1 py-1.5 rounded-lg text-[11px] font-medium border transition-colors flex items-center justify-center gap-1 ${t ? e ? "bg-transparent text-zinc-100 border-zinc-500 hover:bg-zinc-800/60" : "bg-zinc-900 text-white border-zinc-900 hover:bg-black" : e ? "bg-zinc-800 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:border-zinc-700" : "bg-zinc-200 text-zinc-600 border-zinc-200 hover:text-zinc-800 hover:border-zinc-300"}`;
}

const IGa = ({
    isOpen: e,
    isDark: t,
    rhAppLibrary: n,
    onClose: r,
    onDeleteItem: a,
    onUpdateItem: i,
    onFillToNode: o
  }) => {
    on();
    const [s, l] = g.useState(null),
      [d, u] = g.useState(""),
      [h, p] = g.useState("workflow"),
      m = w => {
        l(w.id), u(w.customName || w.webappName);
      },
      f = w => {
        d.trim() && i(w, {
          customName: d.trim()
        }), l(null);
      },
      y = n.filter(w => (w.type || "app") === "workflow"),
      b = n.filter(w => (w.type || "app") === "app"),
      v = h === "workflow" ? y : b;
    if (!e) return null;
    const _ = `side-panel-shell z-40 flex flex-col rounded-2xl shadow-none ${t ? "bg-[#121214] border border-zinc-800" : "bg-zinc-50 border border-[rgba(0,0,0,0.18)]"}`;
    return c.jsxs("div", {
      className: `rh-app-library-panel absolute left-0 top-2 bottom-2 w-[240px] ${_}`,
      style: {
        pointerEvents: "auto"
      },
      children: [c.jsxs("div", {
        className: `px-3 py-2 border-b flex items-center justify-between select-none ${t ? "border-zinc-800" : "border-zinc-200"}`,
        children: [c.jsxs("div", {
          className: "flex items-center gap-2 min-w-0",
          children: [c.jsx("div", {
            className: `w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${t ? "bg-zinc-800 border border-zinc-700" : "bg-zinc-200 border border-zinc-300"}`,
            children: c.jsx(Wp, {
              size: 14,
              className: t ? "text-zinc-300" : "text-zinc-800"
            })
          }), c.jsxs("div", {
            className: "flex flex-col min-w-0",
            children: [c.jsx("span", {
              className: `text-xs font-semibold truncate ${t ? "text-zinc-200" : "text-zinc-800"}`,
              children: x("RH AI 应用库")
            }), c.jsx("span", {
              className: `text-[10px] truncate ${t ? "text-zinc-500" : "text-zinc-400"}`,
              children: x("点击填充到 RH 节点")
            })]
          })]
        }), c.jsx("button", {
          type: "button",
          "aria-label": x("关闭 RH 应用库"),
          onClick: r,
          title: x("关闭"),
          children: c.jsx(Na, {
            size: 12,
            className: t ? "text-zinc-500" : "text-zinc-400"
          })
        })]
      }), c.jsx("div", {
        className: `px-3 py-2 border-b ${t ? "border-zinc-800" : "border-zinc-200"}`,
        children: c.jsxs("div", {
          className: "flex gap-1",
          children: [c.jsxs("button", {
            type: "button",
            onClick: () => p("workflow"),
            className: oin(t, h === "workflow"),
            children: [c.jsx(mZ, {
              size: 12
            }), x("工作流"), y.length > 0 ? ` ${y.length}` : ""]
          }), c.jsxs("button", {
            type: "button",
            onClick: () => p("app"),
            className: oin(t, h === "app"),
            children: [c.jsx(Y2, {
              size: 12
            }), x("AI 应用"), b.length > 0 ? ` ${b.length}` : ""]
          })]
        })
      }), c.jsx("div", {
        className: "flex-1 overflow-y-auto custom-scrollbar px-3 py-2 min-h-0",
        children: v.length === 0 ? c.jsx("div", {
          className: `mt-6 text-center text-xs ${t ? "text-zinc-500" : "text-zinc-400"}`,
          children: x(h === "workflow" ? "暂无工作流。在 RH Comfy 节点获取工作流后，点击「保存到应用库」。" : "暂无应用。在 RH 节点输入 ID 并点击「获取应用信息」后会自动保存。")
        }) : c.jsx("div", {
          className: "flex flex-col gap-2",
          children: v.map(w => {
            var k;
            return c.jsxs("div", {
              className: `rounded-lg overflow-hidden border transition-colors ${t ? "bg-zinc-900 border-zinc-700 hover:border-zinc-500" : "bg-white border-zinc-200 hover:border-zinc-400"}`,
              children: [c.jsx("div", {
                onClick: () => o == null ? void 0 : o(w),
                className: `p-2 ${o ? "cursor-pointer" : ""} ${o ? t ? "hover:bg-zinc-800/80" : "hover:bg-zinc-100" : ""}`,
                title: o ? x("点击填充到选中的 RH 节点") : "",
                children: c.jsxs("div", {
                  className: "flex gap-2",
                  children: [c.jsx("div", {
                    className: "w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-800/50",
                    children: (k = w.covers) != null && k[0] ? c.jsx("img", {
                      src: w.covers[0].thumbnailUri || w.covers[0].url,
                      alt: "",
                      className: "w-full h-full object-cover"
                    }) : c.jsx("div", {
                      className: "w-full h-full flex items-center justify-center text-zinc-500",
                      children: c.jsx(Wp, {
                        size: 18
                      })
                    })
                  }), c.jsxs("div", {
                    className: "flex-1 min-w-0",
                    children: [s === w.id ? c.jsx("input", {
                      type: "text",
                      value: d,
                      onChange: A => u(A.target.value),
                      onClick: A => A.stopPropagation(),
                      onBlur: () => f(w.id),
                      onKeyDown: A => {
                        A.key === "Enter" && f(w.id), A.key === "Escape" && l(null);
                      },
                      autoFocus: !0,
                      className: `w-full px-1.5 py-0.5 text-xs rounded-lg border outline-none ${t ? "bg-zinc-800 border-zinc-600 text-zinc-100" : "bg-white border-zinc-300 text-zinc-800"}`
                    }) : c.jsx("p", {
                      className: `text-xs font-medium truncate ${t ? "text-zinc-200" : "text-zinc-700"}`,
                      title: w.customName || w.webappName,
                      children: w.customName || w.webappName
                    }), c.jsxs("p", {
                      className: `text-[10px] truncate mt-0.5 ${t ? "text-zinc-500" : "text-zinc-400"}`,
                      children: [(w.type || "app") === "workflow" ? "Workflow ID: " : "ID: ", w.webappId]
                    })]
                  })]
                })
              }), c.jsxs("div", {
                className: `flex gap-1 px-2 pb-2 ${t ? "text-zinc-400" : "text-zinc-500"}`,
                children: [c.jsxs("button", {
                  type: "button",
                  onClick: A => {
                    A.stopPropagation(), m(w);
                  },
                  className: `flex-1 flex items-center justify-center gap-1 py-1 rounded-lg text-[10px] font-medium border transition-colors ${t ? "border-zinc-700 hover:bg-zinc-800 hover:text-zinc-200" : "border-zinc-200 hover:bg-zinc-100 hover:text-zinc-800"}`,
                  title: x("修改名称"),
                  children: [c.jsx(nw, {
                    size: 10
                  }), x("重命名")]
                }), o && c.jsxs("button", {
                  type: "button",
                  onClick: A => {
                    A.stopPropagation(), o(w);
                  },
                  className: `flex-1 flex items-center justify-center gap-1 py-1 rounded-lg text-[10px] font-medium border transition-colors ${t ? "text-zinc-100 border-zinc-500 hover:bg-zinc-800/60" : "text-zinc-900 border-zinc-900 hover:bg-zinc-100"}`,
                  title: x("填充到 RH 节点"),
                  children: [c.jsx(zu, {
                    size: 10
                  }), x("填充")]
                }), c.jsx("button", {
                  type: "button",
                  onClick: A => {
                    A.stopPropagation(), confirm(x("确定删除此应用？")) && a(w.id);
                  },
                  className: `flex items-center justify-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium border transition-colors ${t ? "border-zinc-700 text-red-400 hover:bg-red-950/40" : "border-zinc-200 text-red-600 hover:bg-red-50"}`,
                  title: x("删除"),
                  children: c.jsx(Qo, {
                    size: 10
                  })
                })]
              })]
            }, w.id);
          })
        })
      })]
    });
  },
  sin = g.memo(IGa),
  CGa = Object.freeze(Object.defineProperty({
    __proto__: null,
    RhAppLibrarySidebar: sin,
    default: sin
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  EGa = ({
    isOpen: e,
    isDark: t,
    klingSubjectLibrary: n,
    onClose: r,
    onCreateSubject: a,
    onDeleteSubject: i,
    onSendToNode: o
  }) => {
    on();
    const [s, l] = g.useState(null);
    return e ? c.jsxs("div", {
      className: `side-panel-shell absolute left-0 top-2 bottom-2 w-[240px] z-40 flex flex-col transition-all duration-300 ease-in-out rounded-2xl ${e ? "translate-x-0" : "-translate-x-full"} ${t ? "bg-[#121214] border border-zinc-800 shadow-none" : "bg-zinc-50 border border-[rgba(0,0,0,0.18)] shadow-none"}`,
      style: {
        pointerEvents: e ? "auto" : "none"
      },
      children: [c.jsxs("div", {
        className: `p-3 border-b flex justify-between items-center ${t ? "border-zinc-800" : "border-zinc-200"}`,
        children: [c.jsx("h3", {
          className: `font-bold text-xs ${t ? "text-zinc-300" : "text-zinc-700"}`,
          children: x("可灵主体库")
        }), c.jsxs("div", {
          className: "flex items-center gap-2",
          children: [c.jsx("button", {
            type: "button",
            onClick: a,
            className: `px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-colors ${t ? "cursor-pointer bg-transparent text-zinc-100 border-zinc-500 hover:bg-zinc-800/60" : "cursor-pointer bg-zinc-900 text-white border-zinc-900 hover:bg-black"}`,
            children: x("新建主体")
          }), c.jsx("button", {
            type: "button",
            "aria-label": x("关闭可灵主体库"),
            onClick: r,
            children: c.jsx(Na, {
              size: 12,
              className: t ? "text-zinc-500" : "text-zinc-400"
            })
          })]
        })]
      }), c.jsx("div", {
        className: "flex-1 overflow-y-auto custom-scrollbar p-3",
        children: n.length === 0 ? c.jsx("div", {
          className: `text-center py-8 text-sm ${t ? "text-zinc-500" : "text-zinc-400"}`,
          children: x('暂无主体，点击"新建主体"开始创建')
        }) : c.jsx("div", {
          className: "grid grid-cols-2 gap-3",
          children: n.map(d => c.jsxs("div", {
            onClick: () => l(d),
            className: `group rounded-lg overflow-hidden border cursor-pointer transition-all ${(s == null ? void 0 : s.id) === d.id ? t ? "border-zinc-400 ring-2 ring-zinc-500/25" : "border-zinc-900 ring-2 ring-zinc-900/20" : t ? "bg-zinc-900 border-zinc-800 hover:border-zinc-500" : "bg-white border-zinc-200 hover:border-zinc-400"}`,
            title: x("点击查看详情"),
            children: [c.jsxs("div", {
              className: "aspect-square bg-zinc-800 relative",
              children: [d.mainImage ? c.jsx("img", {
                src: d.mainImage,
                alt: d.name,
                className: "w-full h-full object-cover"
              }) : c.jsx("div", {
                className: "w-full h-full flex items-center justify-center text-zinc-500",
                children: c.jsx(lo, {
                  size: 24
                })
              }), c.jsx("button", {
                onClick: u => {
                  u.stopPropagation(), confirm(x('确定要删除主体 "{0}" 吗？', d.name)) && i(d.id);
                },
                className: "absolute top-1 right-1 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10",
                title: x("删除主体"),
                children: c.jsx(Qo, {
                  size: 12
                })
              }), d.type && c.jsx("div", {
                className: "absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[10px] bg-black/60 text-white",
                children: d.type
              })]
            }), c.jsxs("div", {
              className: "p-2",
              children: [c.jsx("p", {
                className: `text-xs truncate font-medium ${t ? "text-zinc-300" : "text-zinc-700"}`,
                children: d.name
              }), d.description && c.jsx("p", {
                className: `text-[10px] truncate mt-0.5 ${t ? "text-zinc-500" : "text-zinc-400"}`,
                children: d.description
              })]
            })]
          }, d.id))
        })
      }), s && c.jsxs("div", {
        className: `border-t p-3 ${t ? "border-zinc-800 bg-zinc-900/50" : "border-zinc-200 bg-white"}`,
        children: [c.jsxs("div", {
          className: "flex items-start justify-between mb-2",
          children: [c.jsxs("div", {
            className: "flex items-center gap-2",
            children: [c.jsx(JHe, {
              size: 14,
              className: t ? "text-zinc-400" : "text-zinc-600"
            }), c.jsx("h4", {
              className: `text-xs font-bold ${t ? "text-zinc-300" : "text-zinc-700"}`,
              children: x("主体详情")
            })]
          }), c.jsx("button", {
            onClick: () => l(null),
            className: `p-0.5 rounded transition-colors ${t ? "hover:bg-zinc-800 text-zinc-500" : "hover:bg-zinc-100 text-zinc-400"}`,
            children: c.jsx(Na, {
              size: 12
            })
          })]
        }), c.jsxs("div", {
          className: "space-y-2",
          children: [c.jsxs("div", {
            children: [c.jsx("p", {
              className: `text-[10px] mb-1 ${t ? "text-zinc-500" : "text-zinc-400"}`,
              children: x("主图")
            }), c.jsx("img", {
              src: s.mainImage,
              alt: s.name,
              className: "w-full h-24 object-cover rounded border"
            })]
          }), s.auxiliaryImages && s.auxiliaryImages.length > 0 && c.jsxs("div", {
            children: [c.jsxs("p", {
              className: `text-[10px] mb-1 ${t ? "text-zinc-500" : "text-zinc-400"}`,
              children: [x("辅助图 ("), s.auxiliaryImages.length, ")"]
            }), c.jsx("div", {
              className: "grid grid-cols-3 gap-1",
              children: s.auxiliaryImages.map((d, u) => c.jsx("img", {
                src: d,
                alt: x("辅助图 {0}", u + 1),
                className: "w-full h-16 object-cover rounded border"
              }, u))
            })]
          }), c.jsxs("div", {
            children: [c.jsx("p", {
              className: `text-[10px] mb-0.5 ${t ? "text-zinc-500" : "text-zinc-400"}`,
              children: x("名称")
            }), c.jsx("p", {
              className: `text-xs ${t ? "text-zinc-300" : "text-zinc-700"}`,
              children: s.name
            })]
          }), c.jsxs("div", {
            children: [c.jsx("p", {
              className: `text-[10px] mb-0.5 ${t ? "text-zinc-500" : "text-zinc-400"}`,
              children: x("类型")
            }), c.jsx("p", {
              className: `text-xs ${t ? "text-zinc-300" : "text-zinc-700"}`,
              children: s.type
            })]
          }), s.description && c.jsxs("div", {
            children: [c.jsx("p", {
              className: `text-[10px] mb-0.5 ${t ? "text-zinc-500" : "text-zinc-400"}`,
              children: x("描述")
            }), c.jsx("p", {
              className: `text-xs ${t ? "text-zinc-300" : "text-zinc-700"}`,
              children: s.description
            })]
          }), o && c.jsxs("button", {
            onClick: () => {
              o(s.id), l(null);
            },
            className: `w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${t ? "cursor-pointer bg-transparent text-zinc-100 border-zinc-500 hover:bg-zinc-800/60" : "cursor-pointer bg-zinc-100 text-zinc-900 border-zinc-300 hover:bg-zinc-200"}`,
            children: [c.jsx(zu, {
              size: 14
            }), c.jsx("span", {
              children: x("发送到 Kling O1 节点")
            })]
          })]
        })]
      })]
    }) : null;
  },
  lin = g.memo(EGa),
  TGa = Object.freeze(Object.defineProperty({
    __proto__: null,
    KlingSubjectsSidebar: lin,
    default: lin
  }, Symbol.toStringTag, {
    value: "Module"
  }));

function MGa(e, t, n) {
  const r = e.ext.toLowerCase();
  return {
    id: `eagle:${e.id}`,
    title: e.name,
    imageUrl: "",
    category: e.folders.map(a => n.get(a)).filter(Boolean).join(" / ") || "未分类",
    kind: ["avif", "apng", "ico"].includes(r) ? "image" : DDt(`file.${r}`),
    filePath: uOt(t, e),
    ext: r,
    size: e.size,
    width: e.width,
    height: e.height,
    duration: e.duration,
    tags: e.tags,
    annotation: e.annotation,
    folders: e.folders,
    noThumbnail: e.noThumbnail,
    modificationTime: e.modificationTime
  };
}

function qtr(e, t, n) {
  return e.map(r => {
    const a = qtr(r.children || [], t, n),
      i = t.get(r.id) || 0;
    return {
      ...r,
      children: a,
      imageCount: i,
      descendantImageCount: n.get(r.id) || 0
    };
  });
}

async function PGa(e, t) {
  const [n, r] = await Promise.all([$tr(), ske()]),
    a = new Map(),
    i = new Map(),
    o = (p, m) => p.forEach(f => {
      a.set(f.id, f.name), i.set(f.id, m), o(f.children || [], f.id);
    });
  o(n);
  const s = [],
    l = new Set(),
    d = new Map(),
    u = new Map(),
    h = 1e3;
  for (let p = 0; t(); p++) {
    const m = await Gtr({
      limit: h,
      offset: p,
      orderBy: "CREATEDATE"
    });
    if (!t()) return null;
    let f = 0;
    for (const y of m) {
      if (l.has(y.id) || (l.add(y.id), f++, y.isDeleted)) continue;
      s.push(MGa(y, r.library.path, a));
      const b = new Set();
      for (const v of new Set(y.folders)) {
        d.set(v, (d.get(v) || 0) + 1);
        for (let _ = v; _ && !b.has(_); _ = i.get(_)) b.add(_);
      }
      for (const v of b) u.set(v, (u.get(v) || 0) + 1);
    }
    if (e(s.length), m.length < h) {
      const y = await ske();
      if (!t()) return null;
      if (y.library.path !== r.library.path) throw new Error("Eagle 已切换资源库，请刷新后重试");
      return {
        items: s,
        folders: qtr(n, d, u),
        libraryPath: r.library.path
      };
    }
    if (!f) throw new Error("Eagle 分页未推进，请刷新后重试");
  }
  return null;
}

const hOt = "pose_reference_folders",
  Bze = "pose_reference_current",
  RGa = /\.(png|jpe?g|gif|webp|bmp)$/i;

function cin(e) {
  return RGa.test(e);
}

function din(e) {
  return e.replace(/\.[^.]+$/, "").trim() || e;
}

function Ktr() {
  if (typeof window > "u") return !1;
  const e = window;
  return !!(e.__TAURI_INTERNALS__ || e.__TAURI__);
}

async function Qtr(e) {
  const t = [],
    n = await i3(e);
  for (const r of n) if (r.isFile && cin(r.name)) {
    const a = await Vu(e, r.name);
    t.push({
      id: a,
      title: din(r.name),
      category: "未分类",
      imageUrl: "",
      filePath: a
    });
  } else if (r.isDirectory) {
    const a = await Vu(e, r.name),
      i = await i3(a),
      o = r.name;
    for (const s of i) if (s.isFile && cin(s.name)) {
      const l = await Vu(a, s.name);
      t.push({
        id: l,
        title: din(s.name),
        category: o,
        imageUrl: "",
        filePath: l
      });
    }
  }
  return t;
}

function NGa(e) {
  try {
    return decodeURIComponent(e);
  } catch {
    return e;
  }
}

async function cke(e, t = !0) {
  const n = t ? NGa(e) : e,
    r = await Au(n),
    a = (n.split(".").pop() || "").toLowerCase(),
    i = a === "avif" ? "image/avif" : a === "apng" ? "image/apng" : a === "ico" ? "image/x-icon" : sCe(n);
  return new Blob([r], {
    type: i
  });
}

async function dke(e, t = !0) {
  return URL.createObjectURL(await cke(e, t));
}

async function Ytr() {
  const e = await WE({
    directory: !0,
    multiple: !1,
    title: "选择姿势参考图片所在文件夹"
  });
  if (!e) return null;
  const t = Array.isArray(e) ? e[0] : e,
    n = await Qtr(t);
  return {
    folderPath: t,
    items: n
  };
}

async function Xtr(e) {
  return Qtr(e);
}

async function Jtr() {
  if (typeof localStorage > "u") return {
    folderPaths: [],
    currentPath: null
  };
  try {
    const e = localStorage.getItem(hOt),
      t = localStorage.getItem(Bze);
    let n = [];
    if (e) {
      const a = JSON.parse(e);
      n = Array.isArray(a) ? a : [];
    }
    if (n.length === 0) {
      const a = localStorage.getItem("pose_reference_folder");
      a && (n = [a], localStorage.removeItem("pose_reference_folder"));
    }
    let r = null;
    if (t !== null) try {
      const a = parseInt(t, 10);
      !Number.isNaN(a) && a >= 0 && a < n.length ? r = n[a] : r = t;
    } catch {
      r = t;
    }
    return !r && n.length > 0 && (r = n[0]), r && !n.includes(r) && (r = n[0] ?? null), {
      folderPaths: n,
      currentPath: r
    };
  } catch (e) {
    return console.warn("[PoseReference] loadFromStoredPath failed:", e), {
      folderPaths: [],
      currentPath: null
    };
  }
}

function W0e(e, t) {
  typeof localStorage > "u" || (localStorage.setItem(hOt, JSON.stringify(e)), t !== null ? localStorage.setItem(Bze, t) : localStorage.removeItem(Bze));
}

function Owt() {
  typeof localStorage < "u" && (localStorage.removeItem(hOt), localStorage.removeItem(Bze));
}

const F6e = "eagle:";

async function jGa(e, t) {
  if ((t == null ? void 0 : t.mediaType) === "video" || (t == null ? void 0 : t.mediaType) === "audio") {
    if (!e.startsWith(F6e)) return null;
    const {
      getEagleItemFilePath: r
    } = await Ie(async () => {
      const {
        getEagleItemFilePath: a
      } = await Promise.resolve().then(() => Dwt);
      return {
        getEagleItemFilePath: a
      };
    }, void 0, import.meta.url);
    return r(e.slice(F6e.length));
  }
  if (t != null && t.imageUrl) return t.imageUrl;
  if (e.startsWith(F6e)) {
    const {
        getEagleItemFilePath: r,
        getEagleItemThumbnailPath: a
      } = await Ie(async () => {
        const {
          getEagleItemFilePath: l,
          getEagleItemThumbnailPath: d
        } = await Promise.resolve().then(() => Dwt);
        return {
          getEagleItemFilePath: l,
          getEagleItemThumbnailPath: d
        };
      }, void 0, import.meta.url),
      i = e.slice(F6e.length),
      o = await r(i),
      s = [o, await a(i)].filter((l, d, u) => typeof l == "string" && l.trim().length > 0 && u.indexOf(l) === d);
    for (const l of s) try {
      return await dke(l, l !== o);
    } catch {}
    return null;
  }
  const n = (t == null ? void 0 : t.filePath) ?? e;
  if (!n || n.startsWith("pose-file-")) return null;
  try {
    return await dke(n);
  } catch {
    return null;
  }
}

const DGa = Object.freeze(Object.defineProperty({
  __proto__: null,
  choosePoseFolderTauri: Ytr,
  clearPoseLibraryFolder: Owt,
  isTauriEnv: Ktr,
  loadPoseLibraryByPath: Xtr,
  loadPoseLibraryFromStoredPath: Jtr,
  readLocalFileAsBlob: cke,
  readLocalFileAsBlobUrl: dke,
  resolvePoseReferenceInsertUrl: jGa,
  savePoseLibraryFolders: W0e
}, Symbol.toStringTag, {
  value: "Module"
}));

function LGa(e) {
  return e.replace(/\.[^.]+$/, "").trim() || e;
}

const Ztr = "pose_reference_favorites";

function OGa() {
  try {
    const e = localStorage.getItem(Ztr);
    if (e) {
      const t = JSON.parse(e);
      return new Set(Array.isArray(t) ? t : []);
    }
  } catch {}
  return new Set();
}

function BGa(e) {
  try {
    localStorage.setItem(Ztr, JSON.stringify([...e]));
  } catch {}
}

const y4 = new Map(),
  uin = 20;

function hin() {
  if (y4.size <= uin) return;
  const e = [...y4.keys()];
  for (let t = 0; t < e.length - uin; t++) y4.delete(e[t]);
}

const DL = "eagle:";

function FGa(e) {
  const t = (e == null ? void 0 : e.enabled) !== !1,
    [n, r] = g.useState("local"),
    [a, i] = g.useState([]),
    [o, s] = g.useState(null),
    [l, d] = g.useState([]),
    [u, h] = g.useState(!1),
    [p, m] = g.useState(null),
    [f, y] = g.useState(OGa),
    [b, v] = g.useState(!1),
    [_, w] = g.useState([]),
    [k, A] = g.useState(0),
    S = g.useRef(0),
    C = g.useRef("");
  g.useEffect(() => () => {
    S.current++;
  }, [t]);
  const [I, E] = g.useState([]),
    [M, T] = g.useState(null);
  g.useEffect(() => {
    BGa(f);
  }, [f]);
  const P = g.useCallback(W => {
      y(Q => {
        const q = new Set(Q);
        return q.has(W) ? q.delete(W) : q.add(W), q;
      });
    }, []),
    R = Ktr(),
    j = g.useCallback(async W => {
      const Q = y4.get(W);
      if (Q) return Q;
      const q = await Xtr(W);
      return y4.set(W, q), hin(), q;
    }, []),
    B = g.useCallback(async () => {
      if (R) {
        h(!0), m(null);
        try {
          const {
            folderPaths: W,
            currentPath: Q
          } = await Jtr();
          if (i(W), s(Q), Q) {
            const q = await j(Q);
            d(q);
          } else d([]);
        } catch (W) {
          m(W.message || "加载失败"), d([]);
        } finally {
          h(!1);
        }
      }
    }, [R, j]);
  g.useEffect(() => {
    t && B();
  }, [t, B]);
  const F = g.useCallback(async () => {
      if (R) {
        h(!0), m(null);
        try {
          const W = await Ytr();
          if (!W) return;
          const {
              folderPath: Q,
              items: q
            } = W,
            ne = a.includes(Q) ? a : [...a, Q];
          y4.set(Q, q), hin(), i(ne), s(Q), d(q), W0e(ne, Q);
        } catch (W) {
          m(W.message || "选择文件夹失败");
        } finally {
          h(!1);
        }
      }
    }, [R, a]),
    N = g.useCallback(async W => {
      if (W === o || !a.includes(W)) return;
      s(W), m(null);
      const Q = y4.get(W);
      if (Q) {
        d(Q), W0e(a, W);
        return;
      }
      h(!0);
      try {
        const q = await j(W);
        d(q), W0e(a, W);
      } catch (q) {
        m(q.message || "加载失败"), d([]);
      } finally {
        h(!1);
      }
    }, [o, a, j]),
    G = g.useCallback(() => {
      if (!o) return;
      const W = a.indexOf(o),
        Q = a.filter(de => de !== o);
      if (y4.delete(o), i(Q), Q.length === 0) {
        s(null), d([]), Owt();
        return;
      }
      const q = Q[Math.min(W, Q.length - 1)];
      s(q), W0e(Q, q);
      const ne = y4.get(q);
      ne ? d(ne) : (h(!0), j(q).then(de => {
        d(de), y4.set(q, de);
      }).catch(() => d([])).finally(() => h(!1)));
    }, [o, a, j]),
    z = g.useCallback(W => {
      const Q = W.map((q, ne) => ({
        id: `pose-file-${ne}-${Date.now()}`,
        title: LGa(q.name),
        category: "本地",
        imageUrl: URL.createObjectURL(q),
        file: q
      }));
      d(Q), s(null), m(null);
    }, []),
    V = g.useCallback(() => {
      Owt(), y4.clear(), i([]), s(null), d([]), m(null);
    }, []),
    O = g.useCallback(async (W = !0) => {
      if (!R) return;
      const Q = ++S.current,
        q = () => S.current === Q;
      h(!0), A(0), m(null), ztr();
      try {
        if (!(await vCe())) throw new Error("请先打开 Eagle 应用");
        if (!q()) return;
        if (r("eagle"), !W && b) {
          const de = await ske();
          if (!q() || de.library.path === C.current) return;
        }
        const ne = await PGa(de => {
          q() && A(de);
        }, q);
        if (!ne || !q()) return;
        v(!0), E(ne.folders), w(ne.items), C.current = ne.libraryPath, T(null);
      } catch (ne) {
        if (!q()) return;
        m(ne.message || "连接 Eagle 失败"), v(!1);
      } finally {
        q() && h(!1);
      }
    }, [R, b]),
    L = g.useCallback(W => T(W), []),
    D = g.useCallback(() => T(null), []),
    U = g.useCallback(() => {
      if (S.current++, h(!1), r("local"), d([]), T(null), m(null), o) {
        const W = y4.get(o);
        W ? d(W) : j(o).then(d).catch(() => d([]));
      } else B();
    }, [o, j, B]),
    H = o,
    Y = g.useCallback(async W => {
      if (W.noThumbnail && W.kind !== "image") return null;
      if (W.imageUrl && !W.filePath && !W.id.startsWith(DL)) return W.imageUrl;
      try {
        const Q = W.id.startsWith(DL) ? `pose-preview:${W.id}:${W.filePath || ""}:${W.modificationTime || 0}` : `pose-preview:${W.id}`;
        return await Ele(Q, async () => {
          const q = W.id.startsWith(DL) ? await jwt(W.id.slice(DL.length)) : W.filePath;
          return W.id.startsWith(DL) && q && !/\.(png|jpe?g|gif|webp|bmp|svg|avif|apng|ico)$/i.test(q) ? null : q ? cke(q) : null;
        });
      } catch {
        return null;
      }
    }, []),
    K = g.useCallback(async W => {
      if (W.kind === "file") return null;
      if (W.kind === "video" || W.kind === "audio") return W.filePath || lke(W.id.slice(DL.length));
      let Q = W.filePath;
      if (W.id.startsWith(DL)) {
        const q = W.id.slice(DL.length),
          ne = W.filePath || (await lke(q)),
          de = await jwt(q),
          le = [ne, de].filter((J, pe, ce) => typeof J == "string" && J.trim().length > 0 && ce.indexOf(J) === pe);
        for (const J of le) try {
          return await dke(J, J !== ne);
        } catch (pe) {
          console.warn("[usePoseReferenceLibrary] Eagle 图片路径读取失败，尝试下一个候选:", J, pe);
        }
        return null;
      }
      if (Q) try {
        return await dke(Q);
      } catch (q) {
        return console.warn("[usePoseReferenceLibrary] readLocalFileAsBlobUrl failed:", q), null;
      }
      return W.file ? URL.createObjectURL(W.file) : W.imageUrl ? W.imageUrl : null;
    }, []);
  return {
    isTauri: R,
    dataSource: n,
    eagleAvailable: b,
    eagleLoadCount: k,
    eagleTotalCount: _.length,
    showAllEagle: D,
    eagleFolders: I,
    currentEagleFolderId: M,
    setDataSource: r,
    connectEagle: O,
    switchEagleFolder: L,
    switchToLocal: U,
    folderPath: H,
    folderPaths: a,
    currentPath: o,
    items: n === "eagle" ? M ? _.filter(W => {
      var Q;
      return (Q = W.folders) == null ? void 0 : Q.includes(M);
    }) : _ : l,
    loading: u,
    error: p,
    favoritedIds: f,
    toggleFavorite: P,
    chooseFolder: F,
    switchFolder: N,
    removeCurrentFolder: G,
    loadStored: B,
    setItemsFromFiles: z,
    clearFolder: V,
    getPreviewUrl: Y,
    getInsertUrl: K
  };
}

async function enr(e) {
  const t = e.filePath || (await lke(e.id.replace(/^eagle:/, "")));
  if (!t) throw new Error("无法读取 Eagle 原文件");
  return t;
}

async function zGa(e) {
  const t = await enr(e);
  if (!e.kind || e.kind === "image") {
    const n = await Ele(`eagle-original:${t}:${e.modificationTime || 0}`, async () => {
      try {
        return await cke(t, !1);
      } catch (r) {
        const a = await lke(e.id.replace(/^eagle:/, ""));
        if (!a || a === t) throw r;
        return cke(a, !1);
      }
    });
    if (!n) throw new Error("无法读取 Eagle 原图");
    return n;
  }
  return await Fr("allow_asset_protocol_directory", {
    path: t.replace(/[/\\][^/\\]+$/, "")
  }), SSn(t);
}

async function UGa(e) {
  const t = await enr(e);
  await Fr("open_folder_in_explorer", {
    path: t.replace(/[/\\][^/\\]+$/, "")
  });
}

function $Ga({
  isOpen: e,
  isDark: t,
  onClose: n,
  onInsertPose: r,
  toastSuccess: a,
  toastError: i
}) {
  const o = FGa({
    enabled: e
  });
  return e ? c.jsx(Zf, {
    show: e,
    children: c.jsx(lOr, {
      isOpen: !0,
      isDark: t,
      items: o.items,
      loading: o.loading,
      error: o.error,
      folderPath: o.folderPath,
      folderPaths: o.folderPaths,
      isTauri: o.isTauri,
      favoritedIds: o.favoritedIds,
      dataSource: o.dataSource,
      eagleFolders: o.eagleFolders,
      currentEagleFolderId: o.currentEagleFolderId,
      eagleTotalCount: o.eagleTotalCount,
      eagleLoadCount: o.eagleLoadCount,
      onShowAllEagle: o.showAllEagle,
      onClose: n,
      onChooseFolder: o.chooseFolder,
      onSwitchFolder: o.switchFolder,
      onRemoveCurrentFolder: o.removeCurrentFolder,
      onClearFolder: o.clearFolder,
      onSelectFiles: o.isTauri ? void 0 : o.setItemsFromFiles,
      onConnectEagle: o.isTauri ? o.connectEagle : void 0,
      onSwitchEagleFolder: o.switchEagleFolder,
      onSwitchToLocal: o.switchToLocal,
      getPreviewUrl: o.getPreviewUrl,
      getContentUrl: zGa,
      onRevealFile: UGa,
      onToggleFavorite: o.toggleFavorite,
      onInsertPose: async s => {
        try {
          const l = await o.getInsertUrl(s);
          l ? (await r(l, s.title, s.kind === "video" || s.kind === "audio" ? s.kind : void 0), a(`已将「${s.title}」插入到画布`)) : i("无法读取该素材");
        } catch (l) {
          i(l.message || "素材插入失败");
        }
      }
    })
  }) : null;
}

const GGa = Object.freeze(Object.defineProperty({
    __proto__: null,
    PoseReferenceHost: $Ga
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  tnr = "qiaodoumayi_api_asset_transport_mode",
  VGa = new Set(["auto", "direct-file", "temporary-oss", "base64"]);

function nnr(e) {
  return typeof e == "string" && VGa.has(e);
}

function pOt() {
  try {
    const e = localStorage.getItem(tnr);
    if (nnr(e)) return e;
  } catch {}
  return "auto";
}

function rnr(e, t) {
  const n = e && e !== "auto" ? e : pOt();
  if (n !== "auto") return n;
  const r = t == null ? void 0 : t.inputType;
  return (t == null ? void 0 : t.requiresPublicUrl) === !0 || r === "url" ? "temporary-oss" : r === "multipart" ? "direct-file" : r === "base64" ? "base64" : r === "file-id" || ZVe() === "oss" ? "temporary-oss" : "direct-file";
}

const bpe = 12 * 1024 * 1024;

class uke extends Error {
  constructor(n, r, a = bpe) {
    super(`素材过大无法内联 Base64（${pin(n)} > ${pin(a)}，mime=${r || "unknown"}）。请改用 multipart 或临时公网 URL。`);
    On(this, "byteSize");
    On(this, "limit");
    On(this, "mimeType");
    this.name = "InlineBase64TooLargeError", this.byteSize = n, this.limit = a, this.mimeType = r;
  }
}

function pin(e) {
  return e < 1024 ? `${e}B` : e < 1024 * 1024 ? `${(e / 1024).toFixed(1)}KB` : `${(e / (1024 * 1024)).toFixed(1)}MB`;
}

function anr(e = bpe) {
  return Math.floor(e * 1.37) + 64;
}

function Fze(e, t, n = bpe) {
  const r = String(t || "").toLowerCase();
  if (r.startsWith("video/")) throw new uke(e, r, 0);
  if (e > n) throw new uke(e, r, n);
}

function hke(e, t = bpe) {
  const n = String(e || ""),
    r = anr(t);
  if (n.length > r) {
    const a = /^data:([^;]+)/i.exec(n);
    throw new uke(n.length, (a == null ? void 0 : a[1]) || "data-url", r);
  }
  if (/^data:video\//i.test(n)) throw new uke(n.length, "video/*", 0);
}

function HGa(e) {
  const t = String(e || "").trim();
  if (!t.startsWith("local-asset://")) return null;
  const n = t.replace(/^local-asset:\/\//, "").trim();
  if (!n) return null;
  try {
    return decodeURIComponent(n) || n;
  } catch {
    return n;
  }
}

function WGa(e) {
  const t = String(e || "").trim();
  return !t || t.includes("://") || t.startsWith("blob:") || t.startsWith("data:") || /^https?:\/\//i.test(t) || vs(t) ? !1 : /^[A-Za-z0-9_.:-]+$/.test(t) && t.length >= 4;
}

async function vte(e) {
  const t = String(e || "").trim();
  if (!t) return null;
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
      }, void 0, import.meta.url),
      r = await n.getAssetSourcePath(t);
    if (!r) return null;
    const a = n.getAssetManifestMeta(t);
    try {
      const {
        exists: i
      } = await Ie(async () => {
        const {
          exists: o
        } = await Promise.resolve().then(() => oc);
        return {
          exists: o
        };
      }, void 0, import.meta.url);
      if (!(await i(r))) return null;
    } catch {}
    return {
      type: "local-file",
      assetId: t,
      absolutePath: r,
      mimeType: (a == null ? void 0 : a.mimeType) || "application/octet-stream",
      size: (a == null ? void 0 : a.size) ?? 0
    };
  } catch {
    return null;
  }
}

function qGa(e) {
  const t = /^data:([^;,]+)/i.exec(String(e || ""));
  return (t == null ? void 0 : t[1]) || "application/octet-stream";
}

function Dit(e, t) {
  const n = String(e || "").toLowerCase();
  return n.includes("png") ? `${t}.png` : n.includes("webp") ? `${t}.webp` : n.includes("jpeg") || n.includes("jpg") ? `${t}.jpg` : n.includes("mp4") ? `${t}.mp4` : n.includes("webm") ? `${t}.webm` : t;
}

async function NXe(e, t) {
  if (e.type === "blob") return e.blob;
  if (e.type === "base64") {
    hke(e.dataUrl);
    const n = await fetch(e.dataUrl);
    if (!n.ok) throw new Error("data URL 读取失败");
    return n.blob();
  }
  if (e.type === "url") {
    if (vs(e.url)) throw new Error("asset.localhost URL 请先经 local-file / 磁盘路径物化，禁止当作远程下载");
    const {
        getBlobFromUrl: n
      } = await Ie(async () => {
        const {
          getBlobFromUrl: a
        } = await Promise.resolve().then(() => The);
        return {
          getBlobFromUrl: a
        };
      }, void 0, import.meta.url),
      r = await n(e.url);
    if (r.type.startsWith("video/") && !(t != null && t.allowReadVideoBlob)) throw new Error("本地/远程视频不得为传输前检查自动读入 JS Blob");
    return r;
  }
  if (e.type === "local-file") {
    if (e.mimeType.startsWith("video/") && !(t != null && t.allowReadVideoBlob)) throw new Error("本地视频不得为传输前检查自动读入 JS Blob；请使用 direct-file 或临时上传适配器显式读盘");
    const {
      readFileAsBlob: n
    } = await Ie(async () => {
      const {
        readFileAsBlob: r
      } = await Promise.resolve().then(() => hg);
      return {
        readFileAsBlob: r
      };
    }, void 0, import.meta.url);
    return n(e.absolutePath);
  }
  throw new Error(`无法物化 file-id 为 Blob: ${e.fileId}`);
}

async function inr(e) {
  const t = String(e.assetRef || "").trim();
  if (!t) throw new Error("assetRef 为空");
  const n = String(e.modelId || "").trim(),
    r = _Ie(n),
    a = e.requestedTransportMode || pOt(),
    i = rnr(a, r),
    o = e.purpose || "image-reference",
    s = e.allowReadVideoBlob === !0,
    l = String(e.assetId || "").trim(),
    d = HGa(t),
    u = t.startsWith("blob:") ? vm(t) : null;
  if (t.startsWith("blob:") || t.startsWith("data:")) {
    if (t.startsWith("data:")) {
      const v = qGa(t);
      if (v.startsWith("video/") && !s) throw new Error("不允许将大型视频 data URL 作为内联素材；请改用临时 OSS 或 multipart 文件");
      if (i === "base64" || (r == null ? void 0 : r.inputType) === "base64") return hke(t), {
        type: "base64",
        dataUrl: t,
        mimeType: v
      };
      const _ = await fetch(t);
      if (!_.ok) throw new Error("data URL 读取失败");
      const w = await _.blob();
      return Fze(w.size, v), {
        type: "blob",
        blob: w,
        fileName: Dit(v, "inline"),
        mimeType: v,
        liveDisplayBlob: !0
      };
    }
    if (i === "base64" && l) {
      const v = await vte(l);
      if (v) return v;
    }
    let y = null;
    try {
      const v = await fetch(t);
      if (v.ok) {
        const _ = await v.blob();
        _.size > 0 && (y = _);
      }
    } catch {}
    if (y) {
      if (y.type.startsWith("video/") && !s) {
        if (u) {
          const v = await vte(u);
          if (v) return v;
        }
        throw new Error("视频 blob 不应在 prepare 阶段整包持有；请提供 assetId / local-file");
      }
      if (u && o !== "video-reference") {
        const v = await vte(u);
        if (v && i === "direct-file" || v && (i === "temporary-oss" || i === "base64")) return v;
      }
      return {
        type: "blob",
        blob: y,
        fileName: Dit(y.type, "live"),
        mimeType: y.type || "application/octet-stream",
        liveDisplayBlob: !0,
        assetId: u || void 0
      };
    }
    const b = [u, l, ...(e.assetIdHints || [])].map(v => String(v || "").trim()).filter(Boolean);
    for (const v of b) {
      const _ = await vte(v);
      if (_) return _;
    }
    throw new Error("参考图 Blob URL 已失效且无法从本地缓存恢复");
  }
  const h = l || d || (WGa(t) ? t : "");
  if (h) {
    const y = await vte(h);
    if (y) {
      if (y.mimeType.startsWith("video/") && i === "base64") throw new Error("不允许大型视频转 Base64");
      return y;
    }
    if (o === "video-reference" && !s) throw new Error(`本地视频未落盘或路径不可用: ${h}`);
  }
  if (vs(t)) {
    for (const y of [l, ...(e.assetIdHints || [])].map(b => String(b || "").trim()).filter(Boolean)) {
      const b = await vte(y);
      if (b) return b;
    }
    throw new Error("asset.localhost 无法反查磁盘路径：请传入 assetId");
  }
  if (/^https?:\/\//i.test(t)) return nr(t) || i === "temporary-oss" || r != null && r.requiresPublicUrl ? {
    type: "url",
    assetId: l || void 0,
    url: t,
    temporary: !1
  } : {
    type: "url",
    assetId: l || void 0,
    url: t,
    temporary: !1
  };
  if (o === "video-reference" && !s) throw new Error(`无法解析视频素材引用（禁止自动读 Blob）: ${t.slice(0, 80)}`);
  const p = h && !t.startsWith("blob:") && !t.startsWith("data:") && !/^https?:\/\//i.test(t) ? t.startsWith("local-asset://") ? t : `local-asset://${h}` : t,
    {
      resolveOriginalImageBlobForGenApi: m
    } = await Ie(async () => {
      const {
        resolveOriginalImageBlobForGenApi: y
      } = await Promise.resolve().then(() => Mc);
      return {
        resolveOriginalImageBlobForGenApi: y
      };
    }, void 0, import.meta.url),
    f = await m(p, {
      assetId: l || h || void 0,
      assetIdHints: e.assetIdHints,
      sourceNode: e.sourceNode,
      nodes: e.nodes
    });
  return {
    type: "blob",
    blob: f,
    fileName: Dit(f.type, "resolved"),
    mimeType: f.type || "image/png",
    liveDisplayBlob: t.startsWith("blob:"),
    assetId: l || h || u || void 0
  };
}

const onr = 1440 * 60 * 1e3;

function q0e(e, t) {
  const n = String(e || "").trim();
  if (!/^https?:\/\//i.test(n)) throw new Error("临时 OSS 结果必须是 http(s) URL");
  const r = (t == null ? void 0 : t.expiresAt) ?? Date.now() + (typeof (t == null ? void 0 : t.ttlMs) == "number" ? t.ttlMs : onr);
  let a;
  return t && Object.prototype.hasOwnProperty.call(t, "cleanupToken") ? a = t.cleanupToken || void 0 : t != null && t.objectKey ? a = String(t.objectKey) : a = n, {
    url: n,
    temporary: !0,
    objectKey: t != null && t.objectKey ? String(t.objectKey) : void 0,
    expiresAt: r,
    cleanupToken: a
  };
}

function KGa(e, t, n) {
  return typeof File < "u" && e instanceof File ? e : new File([e], t, {
    type: n
  });
}

async function mOt(e) {
  const t = e.prepared,
    n = t.type === "local-file",
    r = await NXe(t, {
      allowReadVideoBlob: e.allowReadVideoBlob
    });
  if (!r || r.size <= 0) {
    const s = t.type === "local-file" ? t.absolutePath : t.type === "url" ? t.url.slice(0, 96) : t.type;
    throw new Error(`multipart 素材为空（0 bytes）：${s}`);
  }
  const a = t.type === "local-file" && t.mimeType || t.type === "blob" && t.mimeType || r.type || "application/octet-stream",
    i = e.fileName || (t.type === "blob" ? t.fileName : void 0) || (t.type === "local-file" ? t.absolutePath.split(/[/\\]/).pop() || `upload_${Date.now()}` : `upload_${Date.now()}`),
    o = KGa(r, i, a);
  return {
    file: o,
    mimeType: o.type || a,
    size: o.size,
    fromLocalFile: n
  };
}

async function snr(e, t) {
  const n = await mOt(t),
    r = t.fieldName || "image";
  return e.append(r, n.file, n.file.name), n;
}

function QGa(e, t) {
  const n = e.type || "image/jpeg";
  let r = "jpg";
  n.includes("png") ? r = "png" : n.includes("webp") ? r = "webp" : n.includes("gif") ? r = "gif" : n.includes("mp4") ? r = "mp4" : n.includes("webm") && (r = "webm");
  const a = t.includes(".") ? t : `${t}.${r}`;
  return new File([e], a, {
    type: n
  });
}

async function lnr(e) {
  const t = e.prepared;
  if (t.type === "url" && /^https?:\/\//i.test(t.url)) {
    if (t.temporary) return q0e(t.url, {
      objectKey: t.objectKey,
      expiresAt: t.expiresAt,
      cleanupToken: t.cleanupToken,
      ttlMs: e.ttlMs
    });
    if (e.passThroughPublicHttps !== !1 && !e.forceOpenApiFileUpload) return q0e(t.url, {
      ttlMs: e.ttlMs ?? 10080 * 60 * 1e3,
      cleanupToken: void 0
    });
  }
  if (t.type === "file-id") throw new Error("file-id 类型请使用 fileIdTransport，不能直接换临时 URL");
  const n = await NXe(t, {
      allowReadVideoBlob: e.allowReadVideoBlob
    }),
    r = e.fileName || (t.type === "blob" ? t.fileName : void 0) || `temp-upload-${Date.now()}`,
    a = QGa(n, r);
  if (e.useMediaHosting) {
    const {
        uploadFileToHuyaSeedanceAliyunOss: d
      } = await Ie(async () => {
        const {
          uploadFileToHuyaSeedanceAliyunOss: h
        } = await Promise.resolve().then(() => Ah);
        return {
          uploadFileToHuyaSeedanceAliyunOss: h
        };
      }, void 0, import.meta.url),
      u = await d(a);
    return q0e(u, {
      ttlMs: e.ttlMs,
      cleanupToken: u
    });
  }
  const i = String(e.openApiRoot || "").trim(),
    o = String(e.bearerToken || "").trim();
  if (!i || !o) throw new Error("临时 URL 上传需要 openApiRoot + bearerToken，或开启 useMediaHosting");
  const {
      uploadHuyaArtOpenApiFileToPublicUrl: s
    } = await Ie(async () => {
      const {
        uploadHuyaArtOpenApiFileToPublicUrl: d
      } = await Promise.resolve().then(() => Q1e);
      return {
        uploadHuyaArtOpenApiFileToPublicUrl: d
      };
    }, void 0, import.meta.url),
    l = await s(a, i, o, {
      uploadCandidates: e.uploadCandidates
    });
  return q0e(l, {
    ttlMs: e.ttlMs,
    cleanupToken: l
  });
}

async function YGa(e) {
  return (await lnr(e)).url;
}

async function XGa(e) {
  return Y4t(() => new Promise((t, n) => {
    const r = new FileReader();
    r.onload = () => t(String(r.result || "")), r.onerror = () => n(r.error || new Error("FileReader failed")), r.readAsDataURL(e);
  }));
}

async function cnr(e) {
  const t = e.prepared,
    n = e.maxByteSize ?? bpe;
  if (t.type === "base64") {
    hke(t.dataUrl, n);
    const s = t.dataUrl.indexOf(","),
      l = s >= 0 ? t.dataUrl.slice(s + 1) : t.dataUrl.replace(/^data:[^,]*,/, "");
    return {
      dataUrl: t.dataUrl,
      pureBase64: l,
      mimeType: t.mimeType,
      byteSize: Math.floor(l.length * 3 / 4)
    };
  }
  t.type === "local-file" && t.size > n && Fze(t.size, t.mimeType, n);
  const r = await NXe(t, {
    allowReadVideoBlob: e.allowReadVideoBlob
  });
  Fze(r.size, r.type || "application/octet-stream", n);
  const a = await XGa(r);
  hke(a, n);
  const i = a.indexOf(","),
    o = i >= 0 ? a.slice(i + 1) : "";
  return {
    dataUrl: a,
    pureBase64: o,
    mimeType: r.type || "application/octet-stream",
    byteSize: r.size
  };
}

async function JGa(e) {
  const t = await cnr(e);
  return e.pureBase64 ? t.pureBase64 : t.dataUrl;
}

async function ZGa(e, t, n) {
  const r = n.fieldName || "image",
    a = n.fileNamePrefix || "ref";
  for (let i = 0; i < t.length; i++) {
    const o = t[i],
      s = n.resolveHints(o),
      l = await inr({
        assetRef: o,
        modelId: n.modelId,
        purpose: "image-reference",
        requestedTransportMode: "direct-file",
        assetId: s.assetId,
        assetIdHints: s.assetIdHints,
        sourceNode: s.sourceNode,
        nodes: s.nodes
      });
    if (n.transformBlob) {
      const d = await mOt({
          prepared: l,
          fileName: `${a}_${i}.png`
        }),
        u = await n.transformBlob(d.file, i),
        h = u.type || d.mimeType || "image/png",
        p = typeof File < "u" ? new File([u], `${a}_${i}.png`, {
          type: h
        }) : u;
      e.append(r, p, `${a}_${i}.png`);
    } else await snr(e, {
      prepared: l,
      fieldName: r,
      fileName: `${a}_${i}.png`
    });
  }
}

const up = Object.freeze(Object.defineProperty({
  __proto__: null,
  API_ASSET_TRANSPORT_MODE_STORAGE_KEY: tnr,
  DEFAULT_TEMPORARY_OSS_TTL_MS: onr,
  InlineBase64TooLargeError: uke,
  MAX_INLINE_BASE64_SIZE: bpe,
  appendPreparedAssetToFormData: snr,
  appendReferenceImagesViaPrepare: ZGa,
  assertInlineBase64Allowed: Fze,
  assertInlineBase64DataUrlAllowed: hke,
  createTemporaryOssUploadResult: q0e,
  dataUrlCharLimitForByteSize: anr,
  getApiAssetTransportMode: pOt,
  isApiAssetTransportMode: nnr,
  lookupModelAssetCapability: _Ie,
  materializePreparedAssetBlob: NXe,
  prepareAssetForModel: inr,
  resolveEffectiveApiAssetTransportMode: rnr,
  toBase64Payload: cnr,
  toBase64String: JGa,
  toMultipartFile: mOt,
  toTemporaryPublicUrl: lnr,
  toTemporaryPublicUrlString: YGa
}, Symbol.toStringTag, {
  value: "Module"
}));

function z6e(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var Lit = {
  exports: {}
};

/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/var min;

function eVa() {
  return min || (min = 1, (function (e, t) {
    (function (n) {
      e.exports = n();
    })(function () {
      return (function n(r, a, i) {
        function o(d, u) {
          if (!a[d]) {
            if (!r[d]) {
              var h = typeof z6e == "function" && z6e;
              if (!u && h) return h(d, !0);
              if (s) return s(d, !0);
              var p = new Error("Cannot find module '" + d + "'");
              throw p.code = "MODULE_NOT_FOUND", p;
            }
            var m = a[d] = {
              exports: {}
            };
            r[d][0].call(m.exports, function (f) {
              var y = r[d][1][f];
              return o(y || f);
            }, m, m.exports, n, r, a, i);
          }
          return a[d].exports;
        }
        for (var s = typeof z6e == "function" && z6e, l = 0; l < i.length; l++) o(i[l]);
        return o;
      })({
        1: [function (n, r, a) {
          var i = n("./utils"),
            o = n("./support"),
            s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
          a.encode = function (l) {
            for (var d, u, h, p, m, f, y, b = [], v = 0, _ = l.length, w = _, k = i.getTypeOf(l) !== "string"; v < l.length;) w = _ - v, h = k ? (d = l[v++], u = v < _ ? l[v++] : 0, v < _ ? l[v++] : 0) : (d = l.charCodeAt(v++), u = v < _ ? l.charCodeAt(v++) : 0, v < _ ? l.charCodeAt(v++) : 0), p = d >> 2, m = (3 & d) << 4 | u >> 4, f = 1 < w ? (15 & u) << 2 | h >> 6 : 64, y = 2 < w ? 63 & h : 64, b.push(s.charAt(p) + s.charAt(m) + s.charAt(f) + s.charAt(y));
            return b.join("");
          }, a.decode = function (l) {
            var d,
              u,
              h,
              p,
              m,
              f,
              y = 0,
              b = 0,
              v = "data:";
            if (l.substr(0, v.length) === v) throw new Error("Invalid base64 input, it looks like a data url.");
            var _,
              w = 3 * (l = l.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
            if (l.charAt(l.length - 1) === s.charAt(64) && w--, l.charAt(l.length - 2) === s.charAt(64) && w--, w % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
            for (_ = o.uint8array ? new Uint8Array(0 | w) : new Array(0 | w); y < l.length;) d = s.indexOf(l.charAt(y++)) << 2 | (p = s.indexOf(l.charAt(y++))) >> 4, u = (15 & p) << 4 | (m = s.indexOf(l.charAt(y++))) >> 2, h = (3 & m) << 6 | (f = s.indexOf(l.charAt(y++))), _[b++] = d, m !== 64 && (_[b++] = u), f !== 64 && (_[b++] = h);
            return _;
          };
        }, {
          "./support": 30,
          "./utils": 32
        }],
        2: [function (n, r, a) {
          var i = n("./external"),
            o = n("./stream/DataWorker"),
            s = n("./stream/Crc32Probe"),
            l = n("./stream/DataLengthProbe");
          function d(u, h, p, m, f) {
            this.compressedSize = u, this.uncompressedSize = h, this.crc32 = p, this.compression = m, this.compressedContent = f;
          }
          d.prototype = {
            getContentWorker: function () {
              var u = new o(i.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new l("data_length")),
                h = this;
              return u.on("end", function () {
                if (this.streamInfo.data_length !== h.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
              }), u;
            },
            getCompressedWorker: function () {
              return new o(i.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
            }
          }, d.createWorkerFrom = function (u, h, p) {
            return u.pipe(new s()).pipe(new l("uncompressedSize")).pipe(h.compressWorker(p)).pipe(new l("compressedSize")).withStreamInfo("compression", h);
          }, r.exports = d;
        }, {
          "./external": 6,
          "./stream/Crc32Probe": 25,
          "./stream/DataLengthProbe": 26,
          "./stream/DataWorker": 27
        }],
        3: [function (n, r, a) {
          var i = n("./stream/GenericWorker");
          a.STORE = {
            magic: "\0\0",
            compressWorker: function () {
              return new i("STORE compression");
            },
            uncompressWorker: function () {
              return new i("STORE decompression");
            }
          }, a.DEFLATE = n("./flate");
        }, {
          "./flate": 7,
          "./stream/GenericWorker": 28
        }],
        4: [function (n, r, a) {
          var i = n("./utils"),
            o = (function () {
              for (var s, l = [], d = 0; d < 256; d++) {
                s = d;
                for (var u = 0; u < 8; u++) s = 1 & s ? 3988292384 ^ s >>> 1 : s >>> 1;
                l[d] = s;
              }
              return l;
            })();
          r.exports = function (s, l) {
            return s !== void 0 && s.length ? i.getTypeOf(s) !== "string" ? (function (d, u, h, p) {
              var m = o,
                f = p + h;
              d ^= -1;
              for (var y = p; y < f; y++) d = d >>> 8 ^ m[255 & (d ^ u[y])];
              return -1 ^ d;
            })(0 | l, s, s.length, 0) : (function (d, u, h, p) {
              var m = o,
                f = p + h;
              d ^= -1;
              for (var y = p; y < f; y++) d = d >>> 8 ^ m[255 & (d ^ u.charCodeAt(y))];
              return -1 ^ d;
            })(0 | l, s, s.length, 0) : 0;
          };
        }, {
          "./utils": 32
        }],
        5: [function (n, r, a) {
          a.base64 = !1, a.binary = !1, a.dir = !1, a.createFolders = !0, a.date = null, a.compression = null, a.compressionOptions = null, a.comment = null, a.unixPermissions = null, a.dosPermissions = null;
        }, {}],
        6: [function (n, r, a) {
          var i = null;
          i = typeof Promise < "u" ? Promise : n("lie"), r.exports = {
            Promise: i
          };
        }, {
          lie: 37
        }],
        7: [function (n, r, a) {
          var i = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u",
            o = n("pako"),
            s = n("./utils"),
            l = n("./stream/GenericWorker"),
            d = i ? "uint8array" : "array";
          function u(h, p) {
            l.call(this, "FlateWorker/" + h), this._pako = null, this._pakoAction = h, this._pakoOptions = p, this.meta = {};
          }
          a.magic = "\b\0", s.inherits(u, l), u.prototype.processChunk = function (h) {
            this.meta = h.meta, this._pako === null && this._createPako(), this._pako.push(s.transformTo(d, h.data), !1);
          }, u.prototype.flush = function () {
            l.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
          }, u.prototype.cleanUp = function () {
            l.prototype.cleanUp.call(this), this._pako = null;
          }, u.prototype._createPako = function () {
            this._pako = new o[this._pakoAction]({
              raw: !0,
              level: this._pakoOptions.level || -1
            });
            var h = this;
            this._pako.onData = function (p) {
              h.push({
                data: p,
                meta: h.meta
              });
            };
          }, a.compressWorker = function (h) {
            return new u("Deflate", h);
          }, a.uncompressWorker = function () {
            return new u("Inflate", {});
          };
        }, {
          "./stream/GenericWorker": 28,
          "./utils": 32,
          pako: 38
        }],
        8: [function (n, r, a) {
          function i(m, f) {
            var y,
              b = "";
            for (y = 0; y < f; y++) b += String.fromCharCode(255 & m), m >>>= 8;
            return b;
          }
          function o(m, f, y, b, v, _) {
            var w,
              k,
              A = m.file,
              S = m.compression,
              C = _ !== d.utf8encode,
              I = s.transformTo("string", _(A.name)),
              E = s.transformTo("string", d.utf8encode(A.name)),
              M = A.comment,
              T = s.transformTo("string", _(M)),
              P = s.transformTo("string", d.utf8encode(M)),
              R = E.length !== A.name.length,
              j = P.length !== M.length,
              B = "",
              F = "",
              N = "",
              G = A.dir,
              z = A.date,
              V = {
                crc32: 0,
                compressedSize: 0,
                uncompressedSize: 0
              };
            f && !y || (V.crc32 = m.crc32, V.compressedSize = m.compressedSize, V.uncompressedSize = m.uncompressedSize);
            var O = 0;
            f && (O |= 8), C || !R && !j || (O |= 2048);
            var L = 0,
              D = 0;
            G && (L |= 16), v === "UNIX" ? (D = 798, L |= (function (H, Y) {
              var K = H;
              return H || (K = Y ? 16893 : 33204), (65535 & K) << 16;
            })(A.unixPermissions, G)) : (D = 20, L |= (function (H) {
              return 63 & (H || 0);
            })(A.dosPermissions)), w = z.getUTCHours(), w <<= 6, w |= z.getUTCMinutes(), w <<= 5, w |= z.getUTCSeconds() / 2, k = z.getUTCFullYear() - 1980, k <<= 4, k |= z.getUTCMonth() + 1, k <<= 5, k |= z.getUTCDate(), R && (F = i(1, 1) + i(u(I), 4) + E, B += "up" + i(F.length, 2) + F), j && (N = i(1, 1) + i(u(T), 4) + P, B += "uc" + i(N.length, 2) + N);
            var U = "";
            return U += `
\0`, U += i(O, 2), U += S.magic, U += i(w, 2), U += i(k, 2), U += i(V.crc32, 4), U += i(V.compressedSize, 4), U += i(V.uncompressedSize, 4), U += i(I.length, 2), U += i(B.length, 2), {
              fileRecord: h.LOCAL_FILE_HEADER + U + I + B,
              dirRecord: h.CENTRAL_FILE_HEADER + i(D, 2) + U + i(T.length, 2) + "\0\0\0\0" + i(L, 4) + i(b, 4) + I + B + T
            };
          }
          var s = n("../utils"),
            l = n("../stream/GenericWorker"),
            d = n("../utf8"),
            u = n("../crc32"),
            h = n("../signature");
          function p(m, f, y, b) {
            l.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = f, this.zipPlatform = y, this.encodeFileName = b, this.streamFiles = m, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
          }
          s.inherits(p, l), p.prototype.push = function (m) {
            var f = m.meta.percent || 0,
              y = this.entriesCount,
              b = this._sources.length;
            this.accumulate ? this.contentBuffer.push(m) : (this.bytesWritten += m.data.length, l.prototype.push.call(this, {
              data: m.data,
              meta: {
                currentFile: this.currentFile,
                percent: y ? (f + 100 * (y - b - 1)) / y : 100
              }
            }));
          }, p.prototype.openedSource = function (m) {
            this.currentSourceOffset = this.bytesWritten, this.currentFile = m.file.name;
            var f = this.streamFiles && !m.file.dir;
            if (f) {
              var y = o(m, f, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
              this.push({
                data: y.fileRecord,
                meta: {
                  percent: 0
                }
              });
            } else this.accumulate = !0;
          }, p.prototype.closedSource = function (m) {
            this.accumulate = !1;
            var f = this.streamFiles && !m.file.dir,
              y = o(m, f, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
            if (this.dirRecords.push(y.dirRecord), f) this.push({
              data: (function (b) {
                return h.DATA_DESCRIPTOR + i(b.crc32, 4) + i(b.compressedSize, 4) + i(b.uncompressedSize, 4);
              })(m),
              meta: {
                percent: 100
              }
            });else for (this.push({
              data: y.fileRecord,
              meta: {
                percent: 0
              }
            }); this.contentBuffer.length;) this.push(this.contentBuffer.shift());
            this.currentFile = null;
          }, p.prototype.flush = function () {
            for (var m = this.bytesWritten, f = 0; f < this.dirRecords.length; f++) this.push({
              data: this.dirRecords[f],
              meta: {
                percent: 100
              }
            });
            var y = this.bytesWritten - m,
              b = (function (v, _, w, k, A) {
                var S = s.transformTo("string", A(k));
                return h.CENTRAL_DIRECTORY_END + "\0\0\0\0" + i(v, 2) + i(v, 2) + i(_, 4) + i(w, 4) + i(S.length, 2) + S;
              })(this.dirRecords.length, y, m, this.zipComment, this.encodeFileName);
            this.push({
              data: b,
              meta: {
                percent: 100
              }
            });
          }, p.prototype.prepareNextSource = function () {
            this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
          }, p.prototype.registerPrevious = function (m) {
            this._sources.push(m);
            var f = this;
            return m.on("data", function (y) {
              f.processChunk(y);
            }), m.on("end", function () {
              f.closedSource(f.previous.streamInfo), f._sources.length ? f.prepareNextSource() : f.end();
            }), m.on("error", function (y) {
              f.error(y);
            }), this;
          }, p.prototype.resume = function () {
            return !!l.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
          }, p.prototype.error = function (m) {
            var f = this._sources;
            if (!l.prototype.error.call(this, m)) return !1;
            for (var y = 0; y < f.length; y++) try {
              f[y].error(m);
            } catch {}
            return !0;
          }, p.prototype.lock = function () {
            l.prototype.lock.call(this);
            for (var m = this._sources, f = 0; f < m.length; f++) m[f].lock();
          }, r.exports = p;
        }, {
          "../crc32": 4,
          "../signature": 23,
          "../stream/GenericWorker": 28,
          "../utf8": 31,
          "../utils": 32
        }],
        9: [function (n, r, a) {
          var i = n("../compressions"),
            o = n("./ZipFileWorker");
          a.generateWorker = function (s, l, d) {
            var u = new o(l.streamFiles, d, l.platform, l.encodeFileName),
              h = 0;
            try {
              s.forEach(function (p, m) {
                h++;
                var f = (function (_, w) {
                    var k = _ || w,
                      A = i[k];
                    if (!A) throw new Error(k + " is not a valid compression method !");
                    return A;
                  })(m.options.compression, l.compression),
                  y = m.options.compressionOptions || l.compressionOptions || {},
                  b = m.dir,
                  v = m.date;
                m._compressWorker(f, y).withStreamInfo("file", {
                  name: p,
                  dir: b,
                  date: v,
                  comment: m.comment || "",
                  unixPermissions: m.unixPermissions,
                  dosPermissions: m.dosPermissions
                }).pipe(u);
              }), u.entriesCount = h;
            } catch (p) {
              u.error(p);
            }
            return u;
          };
        }, {
          "../compressions": 3,
          "./ZipFileWorker": 8
        }],
        10: [function (n, r, a) {
          function i() {
            if (!(this instanceof i)) return new i();
            if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
            this.files = Object.create(null), this.comment = null, this.root = "", this.clone = function () {
              var o = new i();
              for (var s in this) typeof this[s] != "function" && (o[s] = this[s]);
              return o;
            };
          }
          (i.prototype = n("./object")).loadAsync = n("./load"), i.support = n("./support"), i.defaults = n("./defaults"), i.version = "3.10.1", i.loadAsync = function (o, s) {
            return new i().loadAsync(o, s);
          }, i.external = n("./external"), r.exports = i;
        }, {
          "./defaults": 5,
          "./external": 6,
          "./load": 11,
          "./object": 15,
          "./support": 30
        }],
        11: [function (n, r, a) {
          var i = n("./utils"),
            o = n("./external"),
            s = n("./utf8"),
            l = n("./zipEntries"),
            d = n("./stream/Crc32Probe"),
            u = n("./nodejsUtils");
          function h(p) {
            return new o.Promise(function (m, f) {
              var y = p.decompressed.getContentWorker().pipe(new d());
              y.on("error", function (b) {
                f(b);
              }).on("end", function () {
                y.streamInfo.crc32 !== p.decompressed.crc32 ? f(new Error("Corrupted zip : CRC32 mismatch")) : m();
              }).resume();
            });
          }
          r.exports = function (p, m) {
            var f = this;
            return m = i.extend(m || {}, {
              base64: !1,
              checkCRC32: !1,
              optimizedBinaryString: !1,
              createFolders: !1,
              decodeFileName: s.utf8decode
            }), u.isNode && u.isStream(p) ? o.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : i.prepareContent("the loaded zip file", p, !0, m.optimizedBinaryString, m.base64).then(function (y) {
              var b = new l(m);
              return b.load(y), b;
            }).then(function (y) {
              var b = [o.Promise.resolve(y)],
                v = y.files;
              if (m.checkCRC32) for (var _ = 0; _ < v.length; _++) b.push(h(v[_]));
              return o.Promise.all(b);
            }).then(function (y) {
              for (var b = y.shift(), v = b.files, _ = 0; _ < v.length; _++) {
                var w = v[_],
                  k = w.fileNameStr,
                  A = i.resolve(w.fileNameStr);
                f.file(A, w.decompressed, {
                  binary: !0,
                  optimizedBinaryString: !0,
                  date: w.date,
                  dir: w.dir,
                  comment: w.fileCommentStr.length ? w.fileCommentStr : null,
                  unixPermissions: w.unixPermissions,
                  dosPermissions: w.dosPermissions,
                  createFolders: m.createFolders
                }), w.dir || (f.file(A).unsafeOriginalName = k);
              }
              return b.zipComment.length && (f.comment = b.zipComment), f;
            });
          };
        }, {
          "./external": 6,
          "./nodejsUtils": 14,
          "./stream/Crc32Probe": 25,
          "./utf8": 31,
          "./utils": 32,
          "./zipEntries": 33
        }],
        12: [function (n, r, a) {
          var i = n("../utils"),
            o = n("../stream/GenericWorker");
          function s(l, d) {
            o.call(this, "Nodejs stream input adapter for " + l), this._upstreamEnded = !1, this._bindStream(d);
          }
          i.inherits(s, o), s.prototype._bindStream = function (l) {
            var d = this;
            (this._stream = l).pause(), l.on("data", function (u) {
              d.push({
                data: u,
                meta: {
                  percent: 0
                }
              });
            }).on("error", function (u) {
              d.isPaused ? this.generatedError = u : d.error(u);
            }).on("end", function () {
              d.isPaused ? d._upstreamEnded = !0 : d.end();
            });
          }, s.prototype.pause = function () {
            return !!o.prototype.pause.call(this) && (this._stream.pause(), !0);
          }, s.prototype.resume = function () {
            return !!o.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0);
          }, r.exports = s;
        }, {
          "../stream/GenericWorker": 28,
          "../utils": 32
        }],
        13: [function (n, r, a) {
          var i = n("readable-stream").Readable;
          function o(s, l, d) {
            i.call(this, l), this._helper = s;
            var u = this;
            s.on("data", function (h, p) {
              u.push(h) || u._helper.pause(), d && d(p);
            }).on("error", function (h) {
              u.emit("error", h);
            }).on("end", function () {
              u.push(null);
            });
          }
          n("../utils").inherits(o, i), o.prototype._read = function () {
            this._helper.resume();
          }, r.exports = o;
        }, {
          "../utils": 32,
          "readable-stream": 16
        }],
        14: [function (n, r, a) {
          r.exports = {
            isNode: typeof Buffer < "u",
            newBufferFrom: function (i, o) {
              if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(i, o);
              if (typeof i == "number") throw new Error('The "data" argument must not be a number');
              return new Buffer(i, o);
            },
            allocBuffer: function (i) {
              if (Buffer.alloc) return Buffer.alloc(i);
              var o = new Buffer(i);
              return o.fill(0), o;
            },
            isBuffer: function (i) {
              return Buffer.isBuffer(i);
            },
            isStream: function (i) {
              return i && typeof i.on == "function" && typeof i.pause == "function" && typeof i.resume == "function";
            }
          };
        }, {}],
        15: [function (n, r, a) {
          function i(A, S, C) {
            var I,
              E = s.getTypeOf(S),
              M = s.extend(C || {}, u);
            M.date = M.date || new Date(), M.compression !== null && (M.compression = M.compression.toUpperCase()), typeof M.unixPermissions == "string" && (M.unixPermissions = parseInt(M.unixPermissions, 8)), M.unixPermissions && 16384 & M.unixPermissions && (M.dir = !0), M.dosPermissions && 16 & M.dosPermissions && (M.dir = !0), M.dir && (A = v(A)), M.createFolders && (I = b(A)) && _.call(this, I, !0);
            var T = E === "string" && M.binary === !1 && M.base64 === !1;
            C && C.binary !== void 0 || (M.binary = !T), (S instanceof h && S.uncompressedSize === 0 || M.dir || !S || S.length === 0) && (M.base64 = !1, M.binary = !0, S = "", M.compression = "STORE", E = "string");
            var P = null;
            P = S instanceof h || S instanceof l ? S : f.isNode && f.isStream(S) ? new y(A, S) : s.prepareContent(A, S, M.binary, M.optimizedBinaryString, M.base64);
            var R = new p(A, P, M);
            this.files[A] = R;
          }
          var o = n("./utf8"),
            s = n("./utils"),
            l = n("./stream/GenericWorker"),
            d = n("./stream/StreamHelper"),
            u = n("./defaults"),
            h = n("./compressedObject"),
            p = n("./zipObject"),
            m = n("./generate"),
            f = n("./nodejsUtils"),
            y = n("./nodejs/NodejsStreamInputAdapter"),
            b = function (A) {
              A.slice(-1) === "/" && (A = A.substring(0, A.length - 1));
              var S = A.lastIndexOf("/");
              return 0 < S ? A.substring(0, S) : "";
            },
            v = function (A) {
              return A.slice(-1) !== "/" && (A += "/"), A;
            },
            _ = function (A, S) {
              return S = S !== void 0 ? S : u.createFolders, A = v(A), this.files[A] || i.call(this, A, null, {
                dir: !0,
                createFolders: S
              }), this.files[A];
            };
          function w(A) {
            return Object.prototype.toString.call(A) === "[object RegExp]";
          }
          var k = {
            load: function () {
              throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
            },
            forEach: function (A) {
              var S, C, I;
              for (S in this.files) I = this.files[S], (C = S.slice(this.root.length, S.length)) && S.slice(0, this.root.length) === this.root && A(C, I);
            },
            filter: function (A) {
              var S = [];
              return this.forEach(function (C, I) {
                A(C, I) && S.push(I);
              }), S;
            },
            file: function (A, S, C) {
              if (arguments.length !== 1) return A = this.root + A, i.call(this, A, S, C), this;
              if (w(A)) {
                var I = A;
                return this.filter(function (M, T) {
                  return !T.dir && I.test(M);
                });
              }
              var E = this.files[this.root + A];
              return E && !E.dir ? E : null;
            },
            folder: function (A) {
              if (!A) return this;
              if (w(A)) return this.filter(function (E, M) {
                return M.dir && A.test(E);
              });
              var S = this.root + A,
                C = _.call(this, S),
                I = this.clone();
              return I.root = C.name, I;
            },
            remove: function (A) {
              A = this.root + A;
              var S = this.files[A];
              if (S || (A.slice(-1) !== "/" && (A += "/"), S = this.files[A]), S && !S.dir) delete this.files[A];else for (var C = this.filter(function (E, M) {
                  return M.name.slice(0, A.length) === A;
                }), I = 0; I < C.length; I++) delete this.files[C[I].name];
              return this;
            },
            generate: function () {
              throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
            },
            generateInternalStream: function (A) {
              var S,
                C = {};
              try {
                if ((C = s.extend(A || {}, {
                  streamFiles: !1,
                  compression: "STORE",
                  compressionOptions: null,
                  type: "",
                  platform: "DOS",
                  comment: null,
                  mimeType: "application/zip",
                  encodeFileName: o.utf8encode
                })).type = C.type.toLowerCase(), C.compression = C.compression.toUpperCase(), C.type === "binarystring" && (C.type = "string"), !C.type) throw new Error("No output type specified.");
                s.checkSupport(C.type), C.platform !== "darwin" && C.platform !== "freebsd" && C.platform !== "linux" && C.platform !== "sunos" || (C.platform = "UNIX"), C.platform === "win32" && (C.platform = "DOS");
                var I = C.comment || this.comment || "";
                S = m.generateWorker(this, C, I);
              } catch (E) {
                (S = new l("error")).error(E);
              }
              return new d(S, C.type || "string", C.mimeType);
            },
            generateAsync: function (A, S) {
              return this.generateInternalStream(A).accumulate(S);
            },
            generateNodeStream: function (A, S) {
              return (A = A || {}).type || (A.type = "nodebuffer"), this.generateInternalStream(A).toNodejsStream(S);
            }
          };
          r.exports = k;
        }, {
          "./compressedObject": 2,
          "./defaults": 5,
          "./generate": 9,
          "./nodejs/NodejsStreamInputAdapter": 12,
          "./nodejsUtils": 14,
          "./stream/GenericWorker": 28,
          "./stream/StreamHelper": 29,
          "./utf8": 31,
          "./utils": 32,
          "./zipObject": 35
        }],
        16: [function (n, r, a) {
          r.exports = n("stream");
        }, {
          stream: void 0
        }],
        17: [function (n, r, a) {
          var i = n("./DataReader");
          function o(s) {
            i.call(this, s);
            for (var l = 0; l < this.data.length; l++) s[l] = 255 & s[l];
          }
          n("../utils").inherits(o, i), o.prototype.byteAt = function (s) {
            return this.data[this.zero + s];
          }, o.prototype.lastIndexOfSignature = function (s) {
            for (var l = s.charCodeAt(0), d = s.charCodeAt(1), u = s.charCodeAt(2), h = s.charCodeAt(3), p = this.length - 4; 0 <= p; --p) if (this.data[p] === l && this.data[p + 1] === d && this.data[p + 2] === u && this.data[p + 3] === h) return p - this.zero;
            return -1;
          }, o.prototype.readAndCheckSignature = function (s) {
            var l = s.charCodeAt(0),
              d = s.charCodeAt(1),
              u = s.charCodeAt(2),
              h = s.charCodeAt(3),
              p = this.readData(4);
            return l === p[0] && d === p[1] && u === p[2] && h === p[3];
          }, o.prototype.readData = function (s) {
            if (this.checkOffset(s), s === 0) return [];
            var l = this.data.slice(this.zero + this.index, this.zero + this.index + s);
            return this.index += s, l;
          }, r.exports = o;
        }, {
          "../utils": 32,
          "./DataReader": 18
        }],
        18: [function (n, r, a) {
          var i = n("../utils");
          function o(s) {
            this.data = s, this.length = s.length, this.index = 0, this.zero = 0;
          }
          o.prototype = {
            checkOffset: function (s) {
              this.checkIndex(this.index + s);
            },
            checkIndex: function (s) {
              if (this.length < this.zero + s || s < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + s + "). Corrupted zip ?");
            },
            setIndex: function (s) {
              this.checkIndex(s), this.index = s;
            },
            skip: function (s) {
              this.setIndex(this.index + s);
            },
            byteAt: function () {},
            readInt: function (s) {
              var l,
                d = 0;
              for (this.checkOffset(s), l = this.index + s - 1; l >= this.index; l--) d = (d << 8) + this.byteAt(l);
              return this.index += s, d;
            },
            readString: function (s) {
              return i.transformTo("string", this.readData(s));
            },
            readData: function () {},
            lastIndexOfSignature: function () {},
            readAndCheckSignature: function () {},
            readDate: function () {
              var s = this.readInt(4);
              return new Date(Date.UTC(1980 + (s >> 25 & 127), (s >> 21 & 15) - 1, s >> 16 & 31, s >> 11 & 31, s >> 5 & 63, (31 & s) << 1));
            }
          }, r.exports = o;
        }, {
          "../utils": 32
        }],
        19: [function (n, r, a) {
          var i = n("./Uint8ArrayReader");
          function o(s) {
            i.call(this, s);
          }
          n("../utils").inherits(o, i), o.prototype.readData = function (s) {
            this.checkOffset(s);
            var l = this.data.slice(this.zero + this.index, this.zero + this.index + s);
            return this.index += s, l;
          }, r.exports = o;
        }, {
          "../utils": 32,
          "./Uint8ArrayReader": 21
        }],
        20: [function (n, r, a) {
          var i = n("./DataReader");
          function o(s) {
            i.call(this, s);
          }
          n("../utils").inherits(o, i), o.prototype.byteAt = function (s) {
            return this.data.charCodeAt(this.zero + s);
          }, o.prototype.lastIndexOfSignature = function (s) {
            return this.data.lastIndexOf(s) - this.zero;
          }, o.prototype.readAndCheckSignature = function (s) {
            return s === this.readData(4);
          }, o.prototype.readData = function (s) {
            this.checkOffset(s);
            var l = this.data.slice(this.zero + this.index, this.zero + this.index + s);
            return this.index += s, l;
          }, r.exports = o;
        }, {
          "../utils": 32,
          "./DataReader": 18
        }],
        21: [function (n, r, a) {
          var i = n("./ArrayReader");
          function o(s) {
            i.call(this, s);
          }
          n("../utils").inherits(o, i), o.prototype.readData = function (s) {
            if (this.checkOffset(s), s === 0) return new Uint8Array(0);
            var l = this.data.subarray(this.zero + this.index, this.zero + this.index + s);
            return this.index += s, l;
          }, r.exports = o;
        }, {
          "../utils": 32,
          "./ArrayReader": 17
        }],
        22: [function (n, r, a) {
          var i = n("../utils"),
            o = n("../support"),
            s = n("./ArrayReader"),
            l = n("./StringReader"),
            d = n("./NodeBufferReader"),
            u = n("./Uint8ArrayReader");
          r.exports = function (h) {
            var p = i.getTypeOf(h);
            return i.checkSupport(p), p !== "string" || o.uint8array ? p === "nodebuffer" ? new d(h) : o.uint8array ? new u(i.transformTo("uint8array", h)) : new s(i.transformTo("array", h)) : new l(h);
          };
        }, {
          "../support": 30,
          "../utils": 32,
          "./ArrayReader": 17,
          "./NodeBufferReader": 19,
          "./StringReader": 20,
          "./Uint8ArrayReader": 21
        }],
        23: [function (n, r, a) {
          a.LOCAL_FILE_HEADER = "PK", a.CENTRAL_FILE_HEADER = "PK", a.CENTRAL_DIRECTORY_END = "PK", a.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", a.ZIP64_CENTRAL_DIRECTORY_END = "PK", a.DATA_DESCRIPTOR = "PK\x07\b";
        }, {}],
        24: [function (n, r, a) {
          var i = n("./GenericWorker"),
            o = n("../utils");
          function s(l) {
            i.call(this, "ConvertWorker to " + l), this.destType = l;
          }
          o.inherits(s, i), s.prototype.processChunk = function (l) {
            this.push({
              data: o.transformTo(this.destType, l.data),
              meta: l.meta
            });
          }, r.exports = s;
        }, {
          "../utils": 32,
          "./GenericWorker": 28
        }],
        25: [function (n, r, a) {
          var i = n("./GenericWorker"),
            o = n("../crc32");
          function s() {
            i.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
          }
          n("../utils").inherits(s, i), s.prototype.processChunk = function (l) {
            this.streamInfo.crc32 = o(l.data, this.streamInfo.crc32 || 0), this.push(l);
          }, r.exports = s;
        }, {
          "../crc32": 4,
          "../utils": 32,
          "./GenericWorker": 28
        }],
        26: [function (n, r, a) {
          var i = n("../utils"),
            o = n("./GenericWorker");
          function s(l) {
            o.call(this, "DataLengthProbe for " + l), this.propName = l, this.withStreamInfo(l, 0);
          }
          i.inherits(s, o), s.prototype.processChunk = function (l) {
            if (l) {
              var d = this.streamInfo[this.propName] || 0;
              this.streamInfo[this.propName] = d + l.data.length;
            }
            o.prototype.processChunk.call(this, l);
          }, r.exports = s;
        }, {
          "../utils": 32,
          "./GenericWorker": 28
        }],
        27: [function (n, r, a) {
          var i = n("../utils"),
            o = n("./GenericWorker");
          function s(l) {
            o.call(this, "DataWorker");
            var d = this;
            this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, l.then(function (u) {
              d.dataIsReady = !0, d.data = u, d.max = u && u.length || 0, d.type = i.getTypeOf(u), d.isPaused || d._tickAndRepeat();
            }, function (u) {
              d.error(u);
            });
          }
          i.inherits(s, o), s.prototype.cleanUp = function () {
            o.prototype.cleanUp.call(this), this.data = null;
          }, s.prototype.resume = function () {
            return !!o.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, i.delay(this._tickAndRepeat, [], this)), !0);
          }, s.prototype._tickAndRepeat = function () {
            this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (i.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
          }, s.prototype._tick = function () {
            if (this.isPaused || this.isFinished) return !1;
            var l = null,
              d = Math.min(this.max, this.index + 16384);
            if (this.index >= this.max) return this.end();
            switch (this.type) {
              case "string":
                l = this.data.substring(this.index, d);
                break;
              case "uint8array":
                l = this.data.subarray(this.index, d);
                break;
              case "array":
              case "nodebuffer":
                l = this.data.slice(this.index, d);
            }
            return this.index = d, this.push({
              data: l,
              meta: {
                percent: this.max ? this.index / this.max * 100 : 0
              }
            });
          }, r.exports = s;
        }, {
          "../utils": 32,
          "./GenericWorker": 28
        }],
        28: [function (n, r, a) {
          function i(o) {
            this.name = o || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = {
              data: [],
              end: [],
              error: []
            }, this.previous = null;
          }
          i.prototype = {
            push: function (o) {
              this.emit("data", o);
            },
            end: function () {
              if (this.isFinished) return !1;
              this.flush();
              try {
                this.emit("end"), this.cleanUp(), this.isFinished = !0;
              } catch (o) {
                this.emit("error", o);
              }
              return !0;
            },
            error: function (o) {
              return !this.isFinished && (this.isPaused ? this.generatedError = o : (this.isFinished = !0, this.emit("error", o), this.previous && this.previous.error(o), this.cleanUp()), !0);
            },
            on: function (o, s) {
              return this._listeners[o].push(s), this;
            },
            cleanUp: function () {
              this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
            },
            emit: function (o, s) {
              if (this._listeners[o]) for (var l = 0; l < this._listeners[o].length; l++) this._listeners[o][l].call(this, s);
            },
            pipe: function (o) {
              return o.registerPrevious(this);
            },
            registerPrevious: function (o) {
              if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
              this.streamInfo = o.streamInfo, this.mergeStreamInfo(), this.previous = o;
              var s = this;
              return o.on("data", function (l) {
                s.processChunk(l);
              }), o.on("end", function () {
                s.end();
              }), o.on("error", function (l) {
                s.error(l);
              }), this;
            },
            pause: function () {
              return !this.isPaused && !this.isFinished && (this.isPaused = !0, this.previous && this.previous.pause(), !0);
            },
            resume: function () {
              if (!this.isPaused || this.isFinished) return !1;
              var o = this.isPaused = !1;
              return this.generatedError && (this.error(this.generatedError), o = !0), this.previous && this.previous.resume(), !o;
            },
            flush: function () {},
            processChunk: function (o) {
              this.push(o);
            },
            withStreamInfo: function (o, s) {
              return this.extraStreamInfo[o] = s, this.mergeStreamInfo(), this;
            },
            mergeStreamInfo: function () {
              for (var o in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, o) && (this.streamInfo[o] = this.extraStreamInfo[o]);
            },
            lock: function () {
              if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
              this.isLocked = !0, this.previous && this.previous.lock();
            },
            toString: function () {
              var o = "Worker " + this.name;
              return this.previous ? this.previous + " -> " + o : o;
            }
          }, r.exports = i;
        }, {}],
        29: [function (n, r, a) {
          var i = n("../utils"),
            o = n("./ConvertWorker"),
            s = n("./GenericWorker"),
            l = n("../base64"),
            d = n("../support"),
            u = n("../external"),
            h = null;
          if (d.nodestream) try {
            h = n("../nodejs/NodejsStreamOutputAdapter");
          } catch {}
          function p(f, y) {
            return new u.Promise(function (b, v) {
              var _ = [],
                w = f._internalType,
                k = f._outputType,
                A = f._mimeType;
              f.on("data", function (S, C) {
                _.push(S), y && y(C);
              }).on("error", function (S) {
                _ = [], v(S);
              }).on("end", function () {
                try {
                  var S = (function (C, I, E) {
                    switch (C) {
                      case "blob":
                        return i.newBlob(i.transformTo("arraybuffer", I), E);
                      case "base64":
                        return l.encode(I);
                      default:
                        return i.transformTo(C, I);
                    }
                  })(k, (function (C, I) {
                    var E,
                      M = 0,
                      T = null,
                      P = 0;
                    for (E = 0; E < I.length; E++) P += I[E].length;
                    switch (C) {
                      case "string":
                        return I.join("");
                      case "array":
                        return Array.prototype.concat.apply([], I);
                      case "uint8array":
                        for (T = new Uint8Array(P), E = 0; E < I.length; E++) T.set(I[E], M), M += I[E].length;
                        return T;
                      case "nodebuffer":
                        return Buffer.concat(I);
                      default:
                        throw new Error("concat : unsupported type '" + C + "'");
                    }
                  })(w, _), A);
                  b(S);
                } catch (C) {
                  v(C);
                }
                _ = [];
              }).resume();
            });
          }
          function m(f, y, b) {
            var v = y;
            switch (y) {
              case "blob":
              case "arraybuffer":
                v = "uint8array";
                break;
              case "base64":
                v = "string";
            }
            try {
              this._internalType = v, this._outputType = y, this._mimeType = b, i.checkSupport(v), this._worker = f.pipe(new o(v)), f.lock();
            } catch (_) {
              this._worker = new s("error"), this._worker.error(_);
            }
          }
          m.prototype = {
            accumulate: function (f) {
              return p(this, f);
            },
            on: function (f, y) {
              var b = this;
              return f === "data" ? this._worker.on(f, function (v) {
                y.call(b, v.data, v.meta);
              }) : this._worker.on(f, function () {
                i.delay(y, arguments, b);
              }), this;
            },
            resume: function () {
              return i.delay(this._worker.resume, [], this._worker), this;
            },
            pause: function () {
              return this._worker.pause(), this;
            },
            toNodejsStream: function (f) {
              if (i.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw new Error(this._outputType + " is not supported by this method");
              return new h(this, {
                objectMode: this._outputType !== "nodebuffer"
              }, f);
            }
          }, r.exports = m;
        }, {
          "../base64": 1,
          "../external": 6,
          "../nodejs/NodejsStreamOutputAdapter": 13,
          "../support": 30,
          "../utils": 32,
          "./ConvertWorker": 24,
          "./GenericWorker": 28
        }],
        30: [function (n, r, a) {
          if (a.base64 = !0, a.array = !0, a.string = !0, a.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", a.nodebuffer = typeof Buffer < "u", a.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") a.blob = !1;else {
            var i = new ArrayBuffer(0);
            try {
              a.blob = new Blob([i], {
                type: "application/zip"
              }).size === 0;
            } catch {
              try {
                var o = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
                o.append(i), a.blob = o.getBlob("application/zip").size === 0;
              } catch {
                a.blob = !1;
              }
            }
          }
          try {
            a.nodestream = !!n("readable-stream").Readable;
          } catch {
            a.nodestream = !1;
          }
        }, {
          "readable-stream": 16
        }],
        31: [function (n, r, a) {
          for (var i = n("./utils"), o = n("./support"), s = n("./nodejsUtils"), l = n("./stream/GenericWorker"), d = new Array(256), u = 0; u < 256; u++) d[u] = 252 <= u ? 6 : 248 <= u ? 5 : 240 <= u ? 4 : 224 <= u ? 3 : 192 <= u ? 2 : 1;
          d[254] = d[254] = 1;
          function h() {
            l.call(this, "utf-8 decode"), this.leftOver = null;
          }
          function p() {
            l.call(this, "utf-8 encode");
          }
          a.utf8encode = function (m) {
            return o.nodebuffer ? s.newBufferFrom(m, "utf-8") : (function (f) {
              var y,
                b,
                v,
                _,
                w,
                k = f.length,
                A = 0;
              for (_ = 0; _ < k; _++) (64512 & (b = f.charCodeAt(_))) == 55296 && _ + 1 < k && (64512 & (v = f.charCodeAt(_ + 1))) == 56320 && (b = 65536 + (b - 55296 << 10) + (v - 56320), _++), A += b < 128 ? 1 : b < 2048 ? 2 : b < 65536 ? 3 : 4;
              for (y = o.uint8array ? new Uint8Array(A) : new Array(A), _ = w = 0; w < A; _++) (64512 & (b = f.charCodeAt(_))) == 55296 && _ + 1 < k && (64512 & (v = f.charCodeAt(_ + 1))) == 56320 && (b = 65536 + (b - 55296 << 10) + (v - 56320), _++), b < 128 ? y[w++] = b : (b < 2048 ? y[w++] = 192 | b >>> 6 : (b < 65536 ? y[w++] = 224 | b >>> 12 : (y[w++] = 240 | b >>> 18, y[w++] = 128 | b >>> 12 & 63), y[w++] = 128 | b >>> 6 & 63), y[w++] = 128 | 63 & b);
              return y;
            })(m);
          }, a.utf8decode = function (m) {
            return o.nodebuffer ? i.transformTo("nodebuffer", m).toString("utf-8") : (function (f) {
              var y,
                b,
                v,
                _,
                w = f.length,
                k = new Array(2 * w);
              for (y = b = 0; y < w;) if ((v = f[y++]) < 128) k[b++] = v;else if (4 < (_ = d[v])) k[b++] = 65533, y += _ - 1;else {
                for (v &= _ === 2 ? 31 : _ === 3 ? 15 : 7; 1 < _ && y < w;) v = v << 6 | 63 & f[y++], _--;
                1 < _ ? k[b++] = 65533 : v < 65536 ? k[b++] = v : (v -= 65536, k[b++] = 55296 | v >> 10 & 1023, k[b++] = 56320 | 1023 & v);
              }
              return k.length !== b && (k.subarray ? k = k.subarray(0, b) : k.length = b), i.applyFromCharCode(k);
            })(m = i.transformTo(o.uint8array ? "uint8array" : "array", m));
          }, i.inherits(h, l), h.prototype.processChunk = function (m) {
            var f = i.transformTo(o.uint8array ? "uint8array" : "array", m.data);
            if (this.leftOver && this.leftOver.length) {
              if (o.uint8array) {
                var y = f;
                (f = new Uint8Array(y.length + this.leftOver.length)).set(this.leftOver, 0), f.set(y, this.leftOver.length);
              } else f = this.leftOver.concat(f);
              this.leftOver = null;
            }
            var b = (function (_, w) {
                var k;
                for ((w = w || _.length) > _.length && (w = _.length), k = w - 1; 0 <= k && (192 & _[k]) == 128;) k--;
                return k < 0 || k === 0 ? w : k + d[_[k]] > w ? k : w;
              })(f),
              v = f;
            b !== f.length && (o.uint8array ? (v = f.subarray(0, b), this.leftOver = f.subarray(b, f.length)) : (v = f.slice(0, b), this.leftOver = f.slice(b, f.length))), this.push({
              data: a.utf8decode(v),
              meta: m.meta
            });
          }, h.prototype.flush = function () {
            this.leftOver && this.leftOver.length && (this.push({
              data: a.utf8decode(this.leftOver),
              meta: {}
            }), this.leftOver = null);
          }, a.Utf8DecodeWorker = h, i.inherits(p, l), p.prototype.processChunk = function (m) {
            this.push({
              data: a.utf8encode(m.data),
              meta: m.meta
            });
          }, a.Utf8EncodeWorker = p;
        }, {
          "./nodejsUtils": 14,
          "./stream/GenericWorker": 28,
          "./support": 30,
          "./utils": 32
        }],
        32: [function (n, r, a) {
          var i = n("./support"),
            o = n("./base64"),
            s = n("./nodejsUtils"),
            l = n("./external");
          function d(y) {
            return y;
          }
          function u(y, b) {
            for (var v = 0; v < y.length; ++v) b[v] = 255 & y.charCodeAt(v);
            return b;
          }
          n("setimmediate"), a.newBlob = function (y, b) {
            a.checkSupport("blob");
            try {
              return new Blob([y], {
                type: b
              });
            } catch {
              try {
                var v = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
                return v.append(y), v.getBlob(b);
              } catch {
                throw new Error("Bug : can't construct the Blob.");
              }
            }
          };
          var h = {
            stringifyByChunk: function (y, b, v) {
              var _ = [],
                w = 0,
                k = y.length;
              if (k <= v) return String.fromCharCode.apply(null, y);
              for (; w < k;) b === "array" || b === "nodebuffer" ? _.push(String.fromCharCode.apply(null, y.slice(w, Math.min(w + v, k)))) : _.push(String.fromCharCode.apply(null, y.subarray(w, Math.min(w + v, k)))), w += v;
              return _.join("");
            },
            stringifyByChar: function (y) {
              for (var b = "", v = 0; v < y.length; v++) b += String.fromCharCode(y[v]);
              return b;
            },
            applyCanBeUsed: {
              uint8array: (function () {
                try {
                  return i.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
                } catch {
                  return !1;
                }
              })(),
              nodebuffer: (function () {
                try {
                  return i.nodebuffer && String.fromCharCode.apply(null, s.allocBuffer(1)).length === 1;
                } catch {
                  return !1;
                }
              })()
            }
          };
          function p(y) {
            var b = 65536,
              v = a.getTypeOf(y),
              _ = !0;
            if (v === "uint8array" ? _ = h.applyCanBeUsed.uint8array : v === "nodebuffer" && (_ = h.applyCanBeUsed.nodebuffer), _) for (; 1 < b;) try {
              return h.stringifyByChunk(y, v, b);
            } catch {
              b = Math.floor(b / 2);
            }
            return h.stringifyByChar(y);
          }
          function m(y, b) {
            for (var v = 0; v < y.length; v++) b[v] = y[v];
            return b;
          }
          a.applyFromCharCode = p;
          var f = {};
          f.string = {
            string: d,
            array: function (y) {
              return u(y, new Array(y.length));
            },
            arraybuffer: function (y) {
              return f.string.uint8array(y).buffer;
            },
            uint8array: function (y) {
              return u(y, new Uint8Array(y.length));
            },
            nodebuffer: function (y) {
              return u(y, s.allocBuffer(y.length));
            }
          }, f.array = {
            string: p,
            array: d,
            arraybuffer: function (y) {
              return new Uint8Array(y).buffer;
            },
            uint8array: function (y) {
              return new Uint8Array(y);
            },
            nodebuffer: function (y) {
              return s.newBufferFrom(y);
            }
          }, f.arraybuffer = {
            string: function (y) {
              return p(new Uint8Array(y));
            },
            array: function (y) {
              return m(new Uint8Array(y), new Array(y.byteLength));
            },
            arraybuffer: d,
            uint8array: function (y) {
              return new Uint8Array(y);
            },
            nodebuffer: function (y) {
              return s.newBufferFrom(new Uint8Array(y));
            }
          }, f.uint8array = {
            string: p,
            array: function (y) {
              return m(y, new Array(y.length));
            },
            arraybuffer: function (y) {
              return y.buffer;
            },
            uint8array: d,
            nodebuffer: function (y) {
              return s.newBufferFrom(y);
            }
          }, f.nodebuffer = {
            string: p,
            array: function (y) {
              return m(y, new Array(y.length));
            },
            arraybuffer: function (y) {
              return f.nodebuffer.uint8array(y).buffer;
            },
            uint8array: function (y) {
              return m(y, new Uint8Array(y.length));
            },
            nodebuffer: d
          }, a.transformTo = function (y, b) {
            if (b = b || "", !y) return b;
            a.checkSupport(y);
            var v = a.getTypeOf(b);
            return f[v][y](b);
          }, a.resolve = function (y) {
            for (var b = y.split("/"), v = [], _ = 0; _ < b.length; _++) {
              var w = b[_];
              w === "." || w === "" && _ !== 0 && _ !== b.length - 1 || (w === ".." ? v.pop() : v.push(w));
            }
            return v.join("/");
          }, a.getTypeOf = function (y) {
            return typeof y == "string" ? "string" : Object.prototype.toString.call(y) === "[object Array]" ? "array" : i.nodebuffer && s.isBuffer(y) ? "nodebuffer" : i.uint8array && y instanceof Uint8Array ? "uint8array" : i.arraybuffer && y instanceof ArrayBuffer ? "arraybuffer" : void 0;
          }, a.checkSupport = function (y) {
            if (!i[y.toLowerCase()]) throw new Error(y + " is not supported by this platform");
          }, a.MAX_VALUE_16BITS = 65535, a.MAX_VALUE_32BITS = -1, a.pretty = function (y) {
            var b,
              v,
              _ = "";
            for (v = 0; v < (y || "").length; v++) _ += "\\x" + ((b = y.charCodeAt(v)) < 16 ? "0" : "") + b.toString(16).toUpperCase();
            return _;
          }, a.delay = function (y, b, v) {
            setImmediate(function () {
              y.apply(v || null, b || []);
            });
          }, a.inherits = function (y, b) {
            function v() {}
            v.prototype = b.prototype, y.prototype = new v();
          }, a.extend = function () {
            var y,
              b,
              v = {};
            for (y = 0; y < arguments.length; y++) for (b in arguments[y]) Object.prototype.hasOwnProperty.call(arguments[y], b) && v[b] === void 0 && (v[b] = arguments[y][b]);
            return v;
          }, a.prepareContent = function (y, b, v, _, w) {
            return l.Promise.resolve(b).then(function (k) {
              return i.blob && (k instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(k)) !== -1) && typeof FileReader < "u" ? new l.Promise(function (A, S) {
                var C = new FileReader();
                C.onload = function (I) {
                  A(I.target.result);
                }, C.onerror = function (I) {
                  S(I.target.error);
                }, C.readAsArrayBuffer(k);
              }) : k;
            }).then(function (k) {
              var A = a.getTypeOf(k);
              return A ? (A === "arraybuffer" ? k = a.transformTo("uint8array", k) : A === "string" && (w ? k = o.decode(k) : v && _ !== !0 && (k = (function (S) {
                return u(S, i.uint8array ? new Uint8Array(S.length) : new Array(S.length));
              })(k))), k) : l.Promise.reject(new Error("Can't read the data of '" + y + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
            });
          };
        }, {
          "./base64": 1,
          "./external": 6,
          "./nodejsUtils": 14,
          "./support": 30,
          setimmediate: 54
        }],
        33: [function (n, r, a) {
          var i = n("./reader/readerFor"),
            o = n("./utils"),
            s = n("./signature"),
            l = n("./zipEntry"),
            d = n("./support");
          function u(h) {
            this.files = [], this.loadOptions = h;
          }
          u.prototype = {
            checkSignature: function (h) {
              if (!this.reader.readAndCheckSignature(h)) {
                this.reader.index -= 4;
                var p = this.reader.readString(4);
                throw new Error("Corrupted zip or bug: unexpected signature (" + o.pretty(p) + ", expected " + o.pretty(h) + ")");
              }
            },
            isSignature: function (h, p) {
              var m = this.reader.index;
              this.reader.setIndex(h);
              var f = this.reader.readString(4) === p;
              return this.reader.setIndex(m), f;
            },
            readBlockEndOfCentral: function () {
              this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
              var h = this.reader.readData(this.zipCommentLength),
                p = d.uint8array ? "uint8array" : "array",
                m = o.transformTo(p, h);
              this.zipComment = this.loadOptions.decodeFileName(m);
            },
            readBlockZip64EndOfCentral: function () {
              this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
              for (var h, p, m, f = this.zip64EndOfCentralSize - 44; 0 < f;) h = this.reader.readInt(2), p = this.reader.readInt(4), m = this.reader.readData(p), this.zip64ExtensibleData[h] = {
                id: h,
                length: p,
                value: m
              };
            },
            readBlockZip64EndOfCentralLocator: function () {
              if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
            },
            readLocalFiles: function () {
              var h, p;
              for (h = 0; h < this.files.length; h++) p = this.files[h], this.reader.setIndex(p.localHeaderOffset), this.checkSignature(s.LOCAL_FILE_HEADER), p.readLocalPart(this.reader), p.handleUTF8(), p.processAttributes();
            },
            readCentralDir: function () {
              var h;
              for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);) (h = new l({
                zip64: this.zip64
              }, this.loadOptions)).readCentralPart(this.reader), this.files.push(h);
              if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
            },
            readEndOfCentral: function () {
              var h = this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);
              if (h < 0) throw this.isSignature(0, s.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
              this.reader.setIndex(h);
              var p = h;
              if (this.checkSignature(s.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === o.MAX_VALUE_16BITS || this.diskWithCentralDirStart === o.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === o.MAX_VALUE_16BITS || this.centralDirRecords === o.MAX_VALUE_16BITS || this.centralDirSize === o.MAX_VALUE_32BITS || this.centralDirOffset === o.MAX_VALUE_32BITS) {
                if (this.zip64 = !0, (h = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
                if (this.reader.setIndex(h), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, s.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
                this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
              }
              var m = this.centralDirOffset + this.centralDirSize;
              this.zip64 && (m += 20, m += 12 + this.zip64EndOfCentralSize);
              var f = p - m;
              if (0 < f) this.isSignature(p, s.CENTRAL_FILE_HEADER) || (this.reader.zero = f);else if (f < 0) throw new Error("Corrupted zip: missing " + Math.abs(f) + " bytes.");
            },
            prepareReader: function (h) {
              this.reader = i(h);
            },
            load: function (h) {
              this.prepareReader(h), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
            }
          }, r.exports = u;
        }, {
          "./reader/readerFor": 22,
          "./signature": 23,
          "./support": 30,
          "./utils": 32,
          "./zipEntry": 34
        }],
        34: [function (n, r, a) {
          var i = n("./reader/readerFor"),
            o = n("./utils"),
            s = n("./compressedObject"),
            l = n("./crc32"),
            d = n("./utf8"),
            u = n("./compressions"),
            h = n("./support");
          function p(m, f) {
            this.options = m, this.loadOptions = f;
          }
          p.prototype = {
            isEncrypted: function () {
              return (1 & this.bitFlag) == 1;
            },
            useUTF8: function () {
              return (2048 & this.bitFlag) == 2048;
            },
            readLocalPart: function (m) {
              var f, y;
              if (m.skip(22), this.fileNameLength = m.readInt(2), y = m.readInt(2), this.fileName = m.readData(this.fileNameLength), m.skip(y), this.compressedSize === -1 || this.uncompressedSize === -1) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
              if ((f = (function (b) {
                for (var v in u) if (Object.prototype.hasOwnProperty.call(u, v) && u[v].magic === b) return u[v];
                return null;
              })(this.compressionMethod)) === null) throw new Error("Corrupted zip : compression " + o.pretty(this.compressionMethod) + " unknown (inner file : " + o.transformTo("string", this.fileName) + ")");
              this.decompressed = new s(this.compressedSize, this.uncompressedSize, this.crc32, f, m.readData(this.compressedSize));
            },
            readCentralPart: function (m) {
              this.versionMadeBy = m.readInt(2), m.skip(2), this.bitFlag = m.readInt(2), this.compressionMethod = m.readString(2), this.date = m.readDate(), this.crc32 = m.readInt(4), this.compressedSize = m.readInt(4), this.uncompressedSize = m.readInt(4);
              var f = m.readInt(2);
              if (this.extraFieldsLength = m.readInt(2), this.fileCommentLength = m.readInt(2), this.diskNumberStart = m.readInt(2), this.internalFileAttributes = m.readInt(2), this.externalFileAttributes = m.readInt(4), this.localHeaderOffset = m.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
              m.skip(f), this.readExtraFields(m), this.parseZIP64ExtraField(m), this.fileComment = m.readData(this.fileCommentLength);
            },
            processAttributes: function () {
              this.unixPermissions = null, this.dosPermissions = null;
              var m = this.versionMadeBy >> 8;
              this.dir = !!(16 & this.externalFileAttributes), m == 0 && (this.dosPermissions = 63 & this.externalFileAttributes), m == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = !0);
            },
            parseZIP64ExtraField: function () {
              if (this.extraFields[1]) {
                var m = i(this.extraFields[1].value);
                this.uncompressedSize === o.MAX_VALUE_32BITS && (this.uncompressedSize = m.readInt(8)), this.compressedSize === o.MAX_VALUE_32BITS && (this.compressedSize = m.readInt(8)), this.localHeaderOffset === o.MAX_VALUE_32BITS && (this.localHeaderOffset = m.readInt(8)), this.diskNumberStart === o.MAX_VALUE_32BITS && (this.diskNumberStart = m.readInt(4));
              }
            },
            readExtraFields: function (m) {
              var f,
                y,
                b,
                v = m.index + this.extraFieldsLength;
              for (this.extraFields || (this.extraFields = {}); m.index + 4 < v;) f = m.readInt(2), y = m.readInt(2), b = m.readData(y), this.extraFields[f] = {
                id: f,
                length: y,
                value: b
              };
              m.setIndex(v);
            },
            handleUTF8: function () {
              var m = h.uint8array ? "uint8array" : "array";
              if (this.useUTF8()) this.fileNameStr = d.utf8decode(this.fileName), this.fileCommentStr = d.utf8decode(this.fileComment);else {
                var f = this.findExtraFieldUnicodePath();
                if (f !== null) this.fileNameStr = f;else {
                  var y = o.transformTo(m, this.fileName);
                  this.fileNameStr = this.loadOptions.decodeFileName(y);
                }
                var b = this.findExtraFieldUnicodeComment();
                if (b !== null) this.fileCommentStr = b;else {
                  var v = o.transformTo(m, this.fileComment);
                  this.fileCommentStr = this.loadOptions.decodeFileName(v);
                }
              }
            },
            findExtraFieldUnicodePath: function () {
              var m = this.extraFields[28789];
              if (m) {
                var f = i(m.value);
                return f.readInt(1) !== 1 || l(this.fileName) !== f.readInt(4) ? null : d.utf8decode(f.readData(m.length - 5));
              }
              return null;
            },
            findExtraFieldUnicodeComment: function () {
              var m = this.extraFields[25461];
              if (m) {
                var f = i(m.value);
                return f.readInt(1) !== 1 || l(this.fileComment) !== f.readInt(4) ? null : d.utf8decode(f.readData(m.length - 5));
              }
              return null;
            }
          }, r.exports = p;
        }, {
          "./compressedObject": 2,
          "./compressions": 3,
          "./crc32": 4,
          "./reader/readerFor": 22,
          "./support": 30,
          "./utf8": 31,
          "./utils": 32
        }],
        35: [function (n, r, a) {
          function i(f, y, b) {
            this.name = f, this.dir = b.dir, this.date = b.date, this.comment = b.comment, this.unixPermissions = b.unixPermissions, this.dosPermissions = b.dosPermissions, this._data = y, this._dataBinary = b.binary, this.options = {
              compression: b.compression,
              compressionOptions: b.compressionOptions
            };
          }
          var o = n("./stream/StreamHelper"),
            s = n("./stream/DataWorker"),
            l = n("./utf8"),
            d = n("./compressedObject"),
            u = n("./stream/GenericWorker");
          i.prototype = {
            internalStream: function (f) {
              var y = null,
                b = "string";
              try {
                if (!f) throw new Error("No output type specified.");
                var v = (b = f.toLowerCase()) === "string" || b === "text";
                b !== "binarystring" && b !== "text" || (b = "string"), y = this._decompressWorker();
                var _ = !this._dataBinary;
                _ && !v && (y = y.pipe(new l.Utf8EncodeWorker())), !_ && v && (y = y.pipe(new l.Utf8DecodeWorker()));
              } catch (w) {
                (y = new u("error")).error(w);
              }
              return new o(y, b, "");
            },
            async: function (f, y) {
              return this.internalStream(f).accumulate(y);
            },
            nodeStream: function (f, y) {
              return this.internalStream(f || "nodebuffer").toNodejsStream(y);
            },
            _compressWorker: function (f, y) {
              if (this._data instanceof d && this._data.compression.magic === f.magic) return this._data.getCompressedWorker();
              var b = this._decompressWorker();
              return this._dataBinary || (b = b.pipe(new l.Utf8EncodeWorker())), d.createWorkerFrom(b, f, y);
            },
            _decompressWorker: function () {
              return this._data instanceof d ? this._data.getContentWorker() : this._data instanceof u ? this._data : new s(this._data);
            }
          };
          for (var h = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], p = function () {
              throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
            }, m = 0; m < h.length; m++) i.prototype[h[m]] = p;
          r.exports = i;
        }, {
          "./compressedObject": 2,
          "./stream/DataWorker": 27,
          "./stream/GenericWorker": 28,
          "./stream/StreamHelper": 29,
          "./utf8": 31
        }],
        36: [function (n, r, a) {
          (function (i) {
            var o,
              s,
              l = i.MutationObserver || i.WebKitMutationObserver;
            if (l) {
              var d = 0,
                u = new l(f),
                h = i.document.createTextNode("");
              u.observe(h, {
                characterData: !0
              }), o = function () {
                h.data = d = ++d % 2;
              };
            } else if (i.setImmediate || i.MessageChannel === void 0) o = "document" in i && "onreadystatechange" in i.document.createElement("script") ? function () {
              var y = i.document.createElement("script");
              y.onreadystatechange = function () {
                f(), y.onreadystatechange = null, y.parentNode.removeChild(y), y = null;
              }, i.document.documentElement.appendChild(y);
            } : function () {
              setTimeout(f, 0);
            };else {
              var p = new i.MessageChannel();
              p.port1.onmessage = f, o = function () {
                p.port2.postMessage(0);
              };
            }
            var m = [];
            function f() {
              var y, b;
              s = !0;
              for (var v = m.length; v;) {
                for (b = m, m = [], y = -1; ++y < v;) b[y]();
                v = m.length;
              }
              s = !1;
            }
            r.exports = function (y) {
              m.push(y) !== 1 || s || o();
            };
          }).call(this, typeof MEe < "u" ? MEe : typeof self < "u" ? self : typeof window < "u" ? window : {});
        }, {}],
        37: [function (n, r, a) {
          var i = n("immediate");
          function o() {}
          var s = {},
            l = ["REJECTED"],
            d = ["FULFILLED"],
            u = ["PENDING"];
          function h(v) {
            if (typeof v != "function") throw new TypeError("resolver must be a function");
            this.state = u, this.queue = [], this.outcome = void 0, v !== o && y(this, v);
          }
          function p(v, _, w) {
            this.promise = v, typeof _ == "function" && (this.onFulfilled = _, this.callFulfilled = this.otherCallFulfilled), typeof w == "function" && (this.onRejected = w, this.callRejected = this.otherCallRejected);
          }
          function m(v, _, w) {
            i(function () {
              var k;
              try {
                k = _(w);
              } catch (A) {
                return s.reject(v, A);
              }
              k === v ? s.reject(v, new TypeError("Cannot resolve promise with itself")) : s.resolve(v, k);
            });
          }
          function f(v) {
            var _ = v && v.then;
            if (v && (typeof v == "object" || typeof v == "function") && typeof _ == "function") return function () {
              _.apply(v, arguments);
            };
          }
          function y(v, _) {
            var w = !1;
            function k(C) {
              w || (w = !0, s.reject(v, C));
            }
            function A(C) {
              w || (w = !0, s.resolve(v, C));
            }
            var S = b(function () {
              _(A, k);
            });
            S.status === "error" && k(S.value);
          }
          function b(v, _) {
            var w = {};
            try {
              w.value = v(_), w.status = "success";
            } catch (k) {
              w.status = "error", w.value = k;
            }
            return w;
          }
          (r.exports = h).prototype.finally = function (v) {
            if (typeof v != "function") return this;
            var _ = this.constructor;
            return this.then(function (w) {
              return _.resolve(v()).then(function () {
                return w;
              });
            }, function (w) {
              return _.resolve(v()).then(function () {
                throw w;
              });
            });
          }, h.prototype.catch = function (v) {
            return this.then(null, v);
          }, h.prototype.then = function (v, _) {
            if (typeof v != "function" && this.state === d || typeof _ != "function" && this.state === l) return this;
            var w = new this.constructor(o);
            return this.state !== u ? m(w, this.state === d ? v : _, this.outcome) : this.queue.push(new p(w, v, _)), w;
          }, p.prototype.callFulfilled = function (v) {
            s.resolve(this.promise, v);
          }, p.prototype.otherCallFulfilled = function (v) {
            m(this.promise, this.onFulfilled, v);
          }, p.prototype.callRejected = function (v) {
            s.reject(this.promise, v);
          }, p.prototype.otherCallRejected = function (v) {
            m(this.promise, this.onRejected, v);
          }, s.resolve = function (v, _) {
            var w = b(f, _);
            if (w.status === "error") return s.reject(v, w.value);
            var k = w.value;
            if (k) y(v, k);else {
              v.state = d, v.outcome = _;
              for (var A = -1, S = v.queue.length; ++A < S;) v.queue[A].callFulfilled(_);
            }
            return v;
          }, s.reject = function (v, _) {
            v.state = l, v.outcome = _;
            for (var w = -1, k = v.queue.length; ++w < k;) v.queue[w].callRejected(_);
            return v;
          }, h.resolve = function (v) {
            return v instanceof this ? v : s.resolve(new this(o), v);
          }, h.reject = function (v) {
            var _ = new this(o);
            return s.reject(_, v);
          }, h.all = function (v) {
            var _ = this;
            if (Object.prototype.toString.call(v) !== "[object Array]") return this.reject(new TypeError("must be an array"));
            var w = v.length,
              k = !1;
            if (!w) return this.resolve([]);
            for (var A = new Array(w), S = 0, C = -1, I = new this(o); ++C < w;) E(v[C], C);
            return I;
            function E(M, T) {
              _.resolve(M).then(function (P) {
                A[T] = P, ++S !== w || k || (k = !0, s.resolve(I, A));
              }, function (P) {
                k || (k = !0, s.reject(I, P));
              });
            }
          }, h.race = function (v) {
            var _ = this;
            if (Object.prototype.toString.call(v) !== "[object Array]") return this.reject(new TypeError("must be an array"));
            var w = v.length,
              k = !1;
            if (!w) return this.resolve([]);
            for (var A = -1, S = new this(o); ++A < w;) C = v[A], _.resolve(C).then(function (I) {
              k || (k = !0, s.resolve(S, I));
            }, function (I) {
              k || (k = !0, s.reject(S, I));
            });
            var C;
            return S;
          };
        }, {
          immediate: 36
        }],
        38: [function (n, r, a) {
          var i = {};
          (0, n("./lib/utils/common").assign)(i, n("./lib/deflate"), n("./lib/inflate"), n("./lib/zlib/constants")), r.exports = i;
        }, {
          "./lib/deflate": 39,
          "./lib/inflate": 40,
          "./lib/utils/common": 41,
          "./lib/zlib/constants": 44
        }],
        39: [function (n, r, a) {
          var i = n("./zlib/deflate"),
            o = n("./utils/common"),
            s = n("./utils/strings"),
            l = n("./zlib/messages"),
            d = n("./zlib/zstream"),
            u = Object.prototype.toString,
            h = 0,
            p = -1,
            m = 0,
            f = 8;
          function y(v) {
            if (!(this instanceof y)) return new y(v);
            this.options = o.assign({
              level: p,
              method: f,
              chunkSize: 16384,
              windowBits: 15,
              memLevel: 8,
              strategy: m,
              to: ""
            }, v || {});
            var _ = this.options;
            _.raw && 0 < _.windowBits ? _.windowBits = -_.windowBits : _.gzip && 0 < _.windowBits && _.windowBits < 16 && (_.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new d(), this.strm.avail_out = 0;
            var w = i.deflateInit2(this.strm, _.level, _.method, _.windowBits, _.memLevel, _.strategy);
            if (w !== h) throw new Error(l[w]);
            if (_.header && i.deflateSetHeader(this.strm, _.header), _.dictionary) {
              var k;
              if (k = typeof _.dictionary == "string" ? s.string2buf(_.dictionary) : u.call(_.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(_.dictionary) : _.dictionary, (w = i.deflateSetDictionary(this.strm, k)) !== h) throw new Error(l[w]);
              this._dict_set = !0;
            }
          }
          function b(v, _) {
            var w = new y(_);
            if (w.push(v, !0), w.err) throw w.msg || l[w.err];
            return w.result;
          }
          y.prototype.push = function (v, _) {
            var w,
              k,
              A = this.strm,
              S = this.options.chunkSize;
            if (this.ended) return !1;
            k = _ === ~~_ ? _ : _ === !0 ? 4 : 0, typeof v == "string" ? A.input = s.string2buf(v) : u.call(v) === "[object ArrayBuffer]" ? A.input = new Uint8Array(v) : A.input = v, A.next_in = 0, A.avail_in = A.input.length;
            do {
              if (A.avail_out === 0 && (A.output = new o.Buf8(S), A.next_out = 0, A.avail_out = S), (w = i.deflate(A, k)) !== 1 && w !== h) return this.onEnd(w), !(this.ended = !0);
              A.avail_out !== 0 && (A.avail_in !== 0 || k !== 4 && k !== 2) || (this.options.to === "string" ? this.onData(s.buf2binstring(o.shrinkBuf(A.output, A.next_out))) : this.onData(o.shrinkBuf(A.output, A.next_out)));
            } while ((0 < A.avail_in || A.avail_out === 0) && w !== 1);
            return k === 4 ? (w = i.deflateEnd(this.strm), this.onEnd(w), this.ended = !0, w === h) : k !== 2 || (this.onEnd(h), !(A.avail_out = 0));
          }, y.prototype.onData = function (v) {
            this.chunks.push(v);
          }, y.prototype.onEnd = function (v) {
            v === h && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = o.flattenChunks(this.chunks)), this.chunks = [], this.err = v, this.msg = this.strm.msg;
          }, a.Deflate = y, a.deflate = b, a.deflateRaw = function (v, _) {
            return (_ = _ || {}).raw = !0, b(v, _);
          }, a.gzip = function (v, _) {
            return (_ = _ || {}).gzip = !0, b(v, _);
          };
        }, {
          "./utils/common": 41,
          "./utils/strings": 42,
          "./zlib/deflate": 46,
          "./zlib/messages": 51,
          "./zlib/zstream": 53
        }],
        40: [function (n, r, a) {
          var i = n("./zlib/inflate"),
            o = n("./utils/common"),
            s = n("./utils/strings"),
            l = n("./zlib/constants"),
            d = n("./zlib/messages"),
            u = n("./zlib/zstream"),
            h = n("./zlib/gzheader"),
            p = Object.prototype.toString;
          function m(y) {
            if (!(this instanceof m)) return new m(y);
            this.options = o.assign({
              chunkSize: 16384,
              windowBits: 0,
              to: ""
            }, y || {});
            var b = this.options;
            b.raw && 0 <= b.windowBits && b.windowBits < 16 && (b.windowBits = -b.windowBits, b.windowBits === 0 && (b.windowBits = -15)), !(0 <= b.windowBits && b.windowBits < 16) || y && y.windowBits || (b.windowBits += 32), 15 < b.windowBits && b.windowBits < 48 && (15 & b.windowBits) == 0 && (b.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new u(), this.strm.avail_out = 0;
            var v = i.inflateInit2(this.strm, b.windowBits);
            if (v !== l.Z_OK) throw new Error(d[v]);
            this.header = new h(), i.inflateGetHeader(this.strm, this.header);
          }
          function f(y, b) {
            var v = new m(b);
            if (v.push(y, !0), v.err) throw v.msg || d[v.err];
            return v.result;
          }
          m.prototype.push = function (y, b) {
            var v,
              _,
              w,
              k,
              A,
              S,
              C = this.strm,
              I = this.options.chunkSize,
              E = this.options.dictionary,
              M = !1;
            if (this.ended) return !1;
            _ = b === ~~b ? b : b === !0 ? l.Z_FINISH : l.Z_NO_FLUSH, typeof y == "string" ? C.input = s.binstring2buf(y) : p.call(y) === "[object ArrayBuffer]" ? C.input = new Uint8Array(y) : C.input = y, C.next_in = 0, C.avail_in = C.input.length;
            do {
              if (C.avail_out === 0 && (C.output = new o.Buf8(I), C.next_out = 0, C.avail_out = I), (v = i.inflate(C, l.Z_NO_FLUSH)) === l.Z_NEED_DICT && E && (S = typeof E == "string" ? s.string2buf(E) : p.call(E) === "[object ArrayBuffer]" ? new Uint8Array(E) : E, v = i.inflateSetDictionary(this.strm, S)), v === l.Z_BUF_ERROR && M === !0 && (v = l.Z_OK, M = !1), v !== l.Z_STREAM_END && v !== l.Z_OK) return this.onEnd(v), !(this.ended = !0);
              C.next_out && (C.avail_out !== 0 && v !== l.Z_STREAM_END && (C.avail_in !== 0 || _ !== l.Z_FINISH && _ !== l.Z_SYNC_FLUSH) || (this.options.to === "string" ? (w = s.utf8border(C.output, C.next_out), k = C.next_out - w, A = s.buf2string(C.output, w), C.next_out = k, C.avail_out = I - k, k && o.arraySet(C.output, C.output, w, k, 0), this.onData(A)) : this.onData(o.shrinkBuf(C.output, C.next_out)))), C.avail_in === 0 && C.avail_out === 0 && (M = !0);
            } while ((0 < C.avail_in || C.avail_out === 0) && v !== l.Z_STREAM_END);
            return v === l.Z_STREAM_END && (_ = l.Z_FINISH), _ === l.Z_FINISH ? (v = i.inflateEnd(this.strm), this.onEnd(v), this.ended = !0, v === l.Z_OK) : _ !== l.Z_SYNC_FLUSH || (this.onEnd(l.Z_OK), !(C.avail_out = 0));
          }, m.prototype.onData = function (y) {
            this.chunks.push(y);
          }, m.prototype.onEnd = function (y) {
            y === l.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = o.flattenChunks(this.chunks)), this.chunks = [], this.err = y, this.msg = this.strm.msg;
          }, a.Inflate = m, a.inflate = f, a.inflateRaw = function (y, b) {
            return (b = b || {}).raw = !0, f(y, b);
          }, a.ungzip = f;
        }, {
          "./utils/common": 41,
          "./utils/strings": 42,
          "./zlib/constants": 44,
          "./zlib/gzheader": 47,
          "./zlib/inflate": 49,
          "./zlib/messages": 51,
          "./zlib/zstream": 53
        }],
        41: [function (n, r, a) {
          var i = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
          a.assign = function (l) {
            for (var d = Array.prototype.slice.call(arguments, 1); d.length;) {
              var u = d.shift();
              if (u) {
                if (typeof u != "object") throw new TypeError(u + "must be non-object");
                for (var h in u) u.hasOwnProperty(h) && (l[h] = u[h]);
              }
            }
            return l;
          }, a.shrinkBuf = function (l, d) {
            return l.length === d ? l : l.subarray ? l.subarray(0, d) : (l.length = d, l);
          };
          var o = {
              arraySet: function (l, d, u, h, p) {
                if (d.subarray && l.subarray) l.set(d.subarray(u, u + h), p);else for (var m = 0; m < h; m++) l[p + m] = d[u + m];
              },
              flattenChunks: function (l) {
                var d, u, h, p, m, f;
                for (d = h = 0, u = l.length; d < u; d++) h += l[d].length;
                for (f = new Uint8Array(h), d = p = 0, u = l.length; d < u; d++) m = l[d], f.set(m, p), p += m.length;
                return f;
              }
            },
            s = {
              arraySet: function (l, d, u, h, p) {
                for (var m = 0; m < h; m++) l[p + m] = d[u + m];
              },
              flattenChunks: function (l) {
                return [].concat.apply([], l);
              }
            };
          a.setTyped = function (l) {
            l ? (a.Buf8 = Uint8Array, a.Buf16 = Uint16Array, a.Buf32 = Int32Array, a.assign(a, o)) : (a.Buf8 = Array, a.Buf16 = Array, a.Buf32 = Array, a.assign(a, s));
          }, a.setTyped(i);
        }, {}],
        42: [function (n, r, a) {
          var i = n("./common"),
            o = !0,
            s = !0;
          try {
            String.fromCharCode.apply(null, [0]);
          } catch {
            o = !1;
          }
          try {
            String.fromCharCode.apply(null, new Uint8Array(1));
          } catch {
            s = !1;
          }
          for (var l = new i.Buf8(256), d = 0; d < 256; d++) l[d] = 252 <= d ? 6 : 248 <= d ? 5 : 240 <= d ? 4 : 224 <= d ? 3 : 192 <= d ? 2 : 1;
          function u(h, p) {
            if (p < 65537 && (h.subarray && s || !h.subarray && o)) return String.fromCharCode.apply(null, i.shrinkBuf(h, p));
            for (var m = "", f = 0; f < p; f++) m += String.fromCharCode(h[f]);
            return m;
          }
          l[254] = l[254] = 1, a.string2buf = function (h) {
            var p,
              m,
              f,
              y,
              b,
              v = h.length,
              _ = 0;
            for (y = 0; y < v; y++) (64512 & (m = h.charCodeAt(y))) == 55296 && y + 1 < v && (64512 & (f = h.charCodeAt(y + 1))) == 56320 && (m = 65536 + (m - 55296 << 10) + (f - 56320), y++), _ += m < 128 ? 1 : m < 2048 ? 2 : m < 65536 ? 3 : 4;
            for (p = new i.Buf8(_), y = b = 0; b < _; y++) (64512 & (m = h.charCodeAt(y))) == 55296 && y + 1 < v && (64512 & (f = h.charCodeAt(y + 1))) == 56320 && (m = 65536 + (m - 55296 << 10) + (f - 56320), y++), m < 128 ? p[b++] = m : (m < 2048 ? p[b++] = 192 | m >>> 6 : (m < 65536 ? p[b++] = 224 | m >>> 12 : (p[b++] = 240 | m >>> 18, p[b++] = 128 | m >>> 12 & 63), p[b++] = 128 | m >>> 6 & 63), p[b++] = 128 | 63 & m);
            return p;
          }, a.buf2binstring = function (h) {
            return u(h, h.length);
          }, a.binstring2buf = function (h) {
            for (var p = new i.Buf8(h.length), m = 0, f = p.length; m < f; m++) p[m] = h.charCodeAt(m);
            return p;
          }, a.buf2string = function (h, p) {
            var m,
              f,
              y,
              b,
              v = p || h.length,
              _ = new Array(2 * v);
            for (m = f = 0; m < v;) if ((y = h[m++]) < 128) _[f++] = y;else if (4 < (b = l[y])) _[f++] = 65533, m += b - 1;else {
              for (y &= b === 2 ? 31 : b === 3 ? 15 : 7; 1 < b && m < v;) y = y << 6 | 63 & h[m++], b--;
              1 < b ? _[f++] = 65533 : y < 65536 ? _[f++] = y : (y -= 65536, _[f++] = 55296 | y >> 10 & 1023, _[f++] = 56320 | 1023 & y);
            }
            return u(_, f);
          }, a.utf8border = function (h, p) {
            var m;
            for ((p = p || h.length) > h.length && (p = h.length), m = p - 1; 0 <= m && (192 & h[m]) == 128;) m--;
            return m < 0 || m === 0 ? p : m + l[h[m]] > p ? m : p;
          };
        }, {
          "./common": 41
        }],
        43: [function (n, r, a) {
          r.exports = function (i, o, s, l) {
            for (var d = 65535 & i | 0, u = i >>> 16 & 65535 | 0, h = 0; s !== 0;) {
              for (s -= h = 2e3 < s ? 2e3 : s; u = u + (d = d + o[l++] | 0) | 0, --h;);
              d %= 65521, u %= 65521;
            }
            return d | u << 16 | 0;
          };
        }, {}],
        44: [function (n, r, a) {
          r.exports = {
            Z_NO_FLUSH: 0,
            Z_PARTIAL_FLUSH: 1,
            Z_SYNC_FLUSH: 2,
            Z_FULL_FLUSH: 3,
            Z_FINISH: 4,
            Z_BLOCK: 5,
            Z_TREES: 6,
            Z_OK: 0,
            Z_STREAM_END: 1,
            Z_NEED_DICT: 2,
            Z_ERRNO: -1,
            Z_STREAM_ERROR: -2,
            Z_DATA_ERROR: -3,
            Z_BUF_ERROR: -5,
            Z_NO_COMPRESSION: 0,
            Z_BEST_SPEED: 1,
            Z_BEST_COMPRESSION: 9,
            Z_DEFAULT_COMPRESSION: -1,
            Z_FILTERED: 1,
            Z_HUFFMAN_ONLY: 2,
            Z_RLE: 3,
            Z_FIXED: 4,
            Z_DEFAULT_STRATEGY: 0,
            Z_BINARY: 0,
            Z_TEXT: 1,
            Z_UNKNOWN: 2,
            Z_DEFLATED: 8
          };
        }, {}],
        45: [function (n, r, a) {
          var i = (function () {
            for (var o, s = [], l = 0; l < 256; l++) {
              o = l;
              for (var d = 0; d < 8; d++) o = 1 & o ? 3988292384 ^ o >>> 1 : o >>> 1;
              s[l] = o;
            }
            return s;
          })();
          r.exports = function (o, s, l, d) {
            var u = i,
              h = d + l;
            o ^= -1;
            for (var p = d; p < h; p++) o = o >>> 8 ^ u[255 & (o ^ s[p])];
            return -1 ^ o;
          };
        }, {}],
        46: [function (n, r, a) {
          var i,
            o = n("../utils/common"),
            s = n("./trees"),
            l = n("./adler32"),
            d = n("./crc32"),
            u = n("./messages"),
            h = 0,
            p = 4,
            m = 0,
            f = -2,
            y = -1,
            b = 4,
            v = 2,
            _ = 8,
            w = 9,
            k = 286,
            A = 30,
            S = 19,
            C = 2 * k + 1,
            I = 15,
            E = 3,
            M = 258,
            T = M + E + 1,
            P = 42,
            R = 113,
            j = 1,
            B = 2,
            F = 3,
            N = 4;
          function G(J, pe) {
            return J.msg = u[pe], pe;
          }
          function z(J) {
            return (J << 1) - (4 < J ? 9 : 0);
          }
          function V(J) {
            for (var pe = J.length; 0 <= --pe;) J[pe] = 0;
          }
          function O(J) {
            var pe = J.state,
              ce = pe.pending;
            ce > J.avail_out && (ce = J.avail_out), ce !== 0 && (o.arraySet(J.output, pe.pending_buf, pe.pending_out, ce, J.next_out), J.next_out += ce, pe.pending_out += ce, J.total_out += ce, J.avail_out -= ce, pe.pending -= ce, pe.pending === 0 && (pe.pending_out = 0));
          }
          function L(J, pe) {
            s._tr_flush_block(J, 0 <= J.block_start ? J.block_start : -1, J.strstart - J.block_start, pe), J.block_start = J.strstart, O(J.strm);
          }
          function D(J, pe) {
            J.pending_buf[J.pending++] = pe;
          }
          function U(J, pe) {
            J.pending_buf[J.pending++] = pe >>> 8 & 255, J.pending_buf[J.pending++] = 255 & pe;
          }
          function H(J, pe) {
            var ce,
              we,
              X = J.max_chain_length,
              Z = J.strstart,
              re = J.prev_length,
              fe = J.nice_match,
              ye = J.strstart > J.w_size - T ? J.strstart - (J.w_size - T) : 0,
              ie = J.window,
              ae = J.w_mask,
              be = J.prev,
              Ee = J.strstart + M,
              xe = ie[Z + re - 1],
              he = ie[Z + re];
            J.prev_length >= J.good_match && (X >>= 2), fe > J.lookahead && (fe = J.lookahead);
            do if (ie[(ce = pe) + re] === he && ie[ce + re - 1] === xe && ie[ce] === ie[Z] && ie[++ce] === ie[Z + 1]) {
              Z += 2, ce++;
              do ; while (ie[++Z] === ie[++ce] && ie[++Z] === ie[++ce] && ie[++Z] === ie[++ce] && ie[++Z] === ie[++ce] && ie[++Z] === ie[++ce] && ie[++Z] === ie[++ce] && ie[++Z] === ie[++ce] && ie[++Z] === ie[++ce] && Z < Ee);
              if (we = M - (Ee - Z), Z = Ee - M, re < we) {
                if (J.match_start = pe, fe <= (re = we)) break;
                xe = ie[Z + re - 1], he = ie[Z + re];
              }
            } while ((pe = be[pe & ae]) > ye && --X != 0);
            return re <= J.lookahead ? re : J.lookahead;
          }
          function Y(J) {
            var pe,
              ce,
              we,
              X,
              Z,
              re,
              fe,
              ye,
              ie,
              ae,
              be = J.w_size;
            do {
              if (X = J.window_size - J.lookahead - J.strstart, J.strstart >= be + (be - T)) {
                for (o.arraySet(J.window, J.window, be, be, 0), J.match_start -= be, J.strstart -= be, J.block_start -= be, pe = ce = J.hash_size; we = J.head[--pe], J.head[pe] = be <= we ? we - be : 0, --ce;);
                for (pe = ce = be; we = J.prev[--pe], J.prev[pe] = be <= we ? we - be : 0, --ce;);
                X += be;
              }
              if (J.strm.avail_in === 0) break;
              if (re = J.strm, fe = J.window, ye = J.strstart + J.lookahead, ie = X, ae = void 0, ae = re.avail_in, ie < ae && (ae = ie), ce = ae === 0 ? 0 : (re.avail_in -= ae, o.arraySet(fe, re.input, re.next_in, ae, ye), re.state.wrap === 1 ? re.adler = l(re.adler, fe, ae, ye) : re.state.wrap === 2 && (re.adler = d(re.adler, fe, ae, ye)), re.next_in += ae, re.total_in += ae, ae), J.lookahead += ce, J.lookahead + J.insert >= E) for (Z = J.strstart - J.insert, J.ins_h = J.window[Z], J.ins_h = (J.ins_h << J.hash_shift ^ J.window[Z + 1]) & J.hash_mask; J.insert && (J.ins_h = (J.ins_h << J.hash_shift ^ J.window[Z + E - 1]) & J.hash_mask, J.prev[Z & J.w_mask] = J.head[J.ins_h], J.head[J.ins_h] = Z, Z++, J.insert--, !(J.lookahead + J.insert < E)););
            } while (J.lookahead < T && J.strm.avail_in !== 0);
          }
          function K(J, pe) {
            for (var ce, we;;) {
              if (J.lookahead < T) {
                if (Y(J), J.lookahead < T && pe === h) return j;
                if (J.lookahead === 0) break;
              }
              if (ce = 0, J.lookahead >= E && (J.ins_h = (J.ins_h << J.hash_shift ^ J.window[J.strstart + E - 1]) & J.hash_mask, ce = J.prev[J.strstart & J.w_mask] = J.head[J.ins_h], J.head[J.ins_h] = J.strstart), ce !== 0 && J.strstart - ce <= J.w_size - T && (J.match_length = H(J, ce)), J.match_length >= E) {
                if (we = s._tr_tally(J, J.strstart - J.match_start, J.match_length - E), J.lookahead -= J.match_length, J.match_length <= J.max_lazy_match && J.lookahead >= E) {
                  for (J.match_length--; J.strstart++, J.ins_h = (J.ins_h << J.hash_shift ^ J.window[J.strstart + E - 1]) & J.hash_mask, ce = J.prev[J.strstart & J.w_mask] = J.head[J.ins_h], J.head[J.ins_h] = J.strstart, --J.match_length != 0;);
                  J.strstart++;
                } else J.strstart += J.match_length, J.match_length = 0, J.ins_h = J.window[J.strstart], J.ins_h = (J.ins_h << J.hash_shift ^ J.window[J.strstart + 1]) & J.hash_mask;
              } else we = s._tr_tally(J, 0, J.window[J.strstart]), J.lookahead--, J.strstart++;
              if (we && (L(J, !1), J.strm.avail_out === 0)) return j;
            }
            return J.insert = J.strstart < E - 1 ? J.strstart : E - 1, pe === p ? (L(J, !0), J.strm.avail_out === 0 ? F : N) : J.last_lit && (L(J, !1), J.strm.avail_out === 0) ? j : B;
          }
          function W(J, pe) {
            for (var ce, we, X;;) {
              if (J.lookahead < T) {
                if (Y(J), J.lookahead < T && pe === h) return j;
                if (J.lookahead === 0) break;
              }
              if (ce = 0, J.lookahead >= E && (J.ins_h = (J.ins_h << J.hash_shift ^ J.window[J.strstart + E - 1]) & J.hash_mask, ce = J.prev[J.strstart & J.w_mask] = J.head[J.ins_h], J.head[J.ins_h] = J.strstart), J.prev_length = J.match_length, J.prev_match = J.match_start, J.match_length = E - 1, ce !== 0 && J.prev_length < J.max_lazy_match && J.strstart - ce <= J.w_size - T && (J.match_length = H(J, ce), J.match_length <= 5 && (J.strategy === 1 || J.match_length === E && 4096 < J.strstart - J.match_start) && (J.match_length = E - 1)), J.prev_length >= E && J.match_length <= J.prev_length) {
                for (X = J.strstart + J.lookahead - E, we = s._tr_tally(J, J.strstart - 1 - J.prev_match, J.prev_length - E), J.lookahead -= J.prev_length - 1, J.prev_length -= 2; ++J.strstart <= X && (J.ins_h = (J.ins_h << J.hash_shift ^ J.window[J.strstart + E - 1]) & J.hash_mask, ce = J.prev[J.strstart & J.w_mask] = J.head[J.ins_h], J.head[J.ins_h] = J.strstart), --J.prev_length != 0;);
                if (J.match_available = 0, J.match_length = E - 1, J.strstart++, we && (L(J, !1), J.strm.avail_out === 0)) return j;
              } else if (J.match_available) {
                if ((we = s._tr_tally(J, 0, J.window[J.strstart - 1])) && L(J, !1), J.strstart++, J.lookahead--, J.strm.avail_out === 0) return j;
              } else J.match_available = 1, J.strstart++, J.lookahead--;
            }
            return J.match_available && (we = s._tr_tally(J, 0, J.window[J.strstart - 1]), J.match_available = 0), J.insert = J.strstart < E - 1 ? J.strstart : E - 1, pe === p ? (L(J, !0), J.strm.avail_out === 0 ? F : N) : J.last_lit && (L(J, !1), J.strm.avail_out === 0) ? j : B;
          }
          function Q(J, pe, ce, we, X) {
            this.good_length = J, this.max_lazy = pe, this.nice_length = ce, this.max_chain = we, this.func = X;
          }
          function q() {
            this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = _, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new o.Buf16(2 * C), this.dyn_dtree = new o.Buf16(2 * (2 * A + 1)), this.bl_tree = new o.Buf16(2 * (2 * S + 1)), V(this.dyn_ltree), V(this.dyn_dtree), V(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new o.Buf16(I + 1), this.heap = new o.Buf16(2 * k + 1), V(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new o.Buf16(2 * k + 1), V(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
          }
          function ne(J) {
            var pe;
            return J && J.state ? (J.total_in = J.total_out = 0, J.data_type = v, (pe = J.state).pending = 0, pe.pending_out = 0, pe.wrap < 0 && (pe.wrap = -pe.wrap), pe.status = pe.wrap ? P : R, J.adler = pe.wrap === 2 ? 0 : 1, pe.last_flush = h, s._tr_init(pe), m) : G(J, f);
          }
          function de(J) {
            var pe = ne(J);
            return pe === m && (function (ce) {
              ce.window_size = 2 * ce.w_size, V(ce.head), ce.max_lazy_match = i[ce.level].max_lazy, ce.good_match = i[ce.level].good_length, ce.nice_match = i[ce.level].nice_length, ce.max_chain_length = i[ce.level].max_chain, ce.strstart = 0, ce.block_start = 0, ce.lookahead = 0, ce.insert = 0, ce.match_length = ce.prev_length = E - 1, ce.match_available = 0, ce.ins_h = 0;
            })(J.state), pe;
          }
          function le(J, pe, ce, we, X, Z) {
            if (!J) return f;
            var re = 1;
            if (pe === y && (pe = 6), we < 0 ? (re = 0, we = -we) : 15 < we && (re = 2, we -= 16), X < 1 || w < X || ce !== _ || we < 8 || 15 < we || pe < 0 || 9 < pe || Z < 0 || b < Z) return G(J, f);
            we === 8 && (we = 9);
            var fe = new q();
            return (J.state = fe).strm = J, fe.wrap = re, fe.gzhead = null, fe.w_bits = we, fe.w_size = 1 << fe.w_bits, fe.w_mask = fe.w_size - 1, fe.hash_bits = X + 7, fe.hash_size = 1 << fe.hash_bits, fe.hash_mask = fe.hash_size - 1, fe.hash_shift = ~~((fe.hash_bits + E - 1) / E), fe.window = new o.Buf8(2 * fe.w_size), fe.head = new o.Buf16(fe.hash_size), fe.prev = new o.Buf16(fe.w_size), fe.lit_bufsize = 1 << X + 6, fe.pending_buf_size = 4 * fe.lit_bufsize, fe.pending_buf = new o.Buf8(fe.pending_buf_size), fe.d_buf = 1 * fe.lit_bufsize, fe.l_buf = 3 * fe.lit_bufsize, fe.level = pe, fe.strategy = Z, fe.method = ce, de(J);
          }
          i = [new Q(0, 0, 0, 0, function (J, pe) {
            var ce = 65535;
            for (ce > J.pending_buf_size - 5 && (ce = J.pending_buf_size - 5);;) {
              if (J.lookahead <= 1) {
                if (Y(J), J.lookahead === 0 && pe === h) return j;
                if (J.lookahead === 0) break;
              }
              J.strstart += J.lookahead, J.lookahead = 0;
              var we = J.block_start + ce;
              if ((J.strstart === 0 || J.strstart >= we) && (J.lookahead = J.strstart - we, J.strstart = we, L(J, !1), J.strm.avail_out === 0) || J.strstart - J.block_start >= J.w_size - T && (L(J, !1), J.strm.avail_out === 0)) return j;
            }
            return J.insert = 0, pe === p ? (L(J, !0), J.strm.avail_out === 0 ? F : N) : (J.strstart > J.block_start && (L(J, !1), J.strm.avail_out), j);
          }), new Q(4, 4, 8, 4, K), new Q(4, 5, 16, 8, K), new Q(4, 6, 32, 32, K), new Q(4, 4, 16, 16, W), new Q(8, 16, 32, 32, W), new Q(8, 16, 128, 128, W), new Q(8, 32, 128, 256, W), new Q(32, 128, 258, 1024, W), new Q(32, 258, 258, 4096, W)], a.deflateInit = function (J, pe) {
            return le(J, pe, _, 15, 8, 0);
          }, a.deflateInit2 = le, a.deflateReset = de, a.deflateResetKeep = ne, a.deflateSetHeader = function (J, pe) {
            return J && J.state ? J.state.wrap !== 2 ? f : (J.state.gzhead = pe, m) : f;
          }, a.deflate = function (J, pe) {
            var ce, we, X, Z;
            if (!J || !J.state || 5 < pe || pe < 0) return J ? G(J, f) : f;
            if (we = J.state, !J.output || !J.input && J.avail_in !== 0 || we.status === 666 && pe !== p) return G(J, J.avail_out === 0 ? -5 : f);
            if (we.strm = J, ce = we.last_flush, we.last_flush = pe, we.status === P) if (we.wrap === 2) J.adler = 0, D(we, 31), D(we, 139), D(we, 8), we.gzhead ? (D(we, (we.gzhead.text ? 1 : 0) + (we.gzhead.hcrc ? 2 : 0) + (we.gzhead.extra ? 4 : 0) + (we.gzhead.name ? 8 : 0) + (we.gzhead.comment ? 16 : 0)), D(we, 255 & we.gzhead.time), D(we, we.gzhead.time >> 8 & 255), D(we, we.gzhead.time >> 16 & 255), D(we, we.gzhead.time >> 24 & 255), D(we, we.level === 9 ? 2 : 2 <= we.strategy || we.level < 2 ? 4 : 0), D(we, 255 & we.gzhead.os), we.gzhead.extra && we.gzhead.extra.length && (D(we, 255 & we.gzhead.extra.length), D(we, we.gzhead.extra.length >> 8 & 255)), we.gzhead.hcrc && (J.adler = d(J.adler, we.pending_buf, we.pending, 0)), we.gzindex = 0, we.status = 69) : (D(we, 0), D(we, 0), D(we, 0), D(we, 0), D(we, 0), D(we, we.level === 9 ? 2 : 2 <= we.strategy || we.level < 2 ? 4 : 0), D(we, 3), we.status = R);else {
              var re = _ + (we.w_bits - 8 << 4) << 8;
              re |= (2 <= we.strategy || we.level < 2 ? 0 : we.level < 6 ? 1 : we.level === 6 ? 2 : 3) << 6, we.strstart !== 0 && (re |= 32), re += 31 - re % 31, we.status = R, U(we, re), we.strstart !== 0 && (U(we, J.adler >>> 16), U(we, 65535 & J.adler)), J.adler = 1;
            }
            if (we.status === 69) if (we.gzhead.extra) {
              for (X = we.pending; we.gzindex < (65535 & we.gzhead.extra.length) && (we.pending !== we.pending_buf_size || (we.gzhead.hcrc && we.pending > X && (J.adler = d(J.adler, we.pending_buf, we.pending - X, X)), O(J), X = we.pending, we.pending !== we.pending_buf_size));) D(we, 255 & we.gzhead.extra[we.gzindex]), we.gzindex++;
              we.gzhead.hcrc && we.pending > X && (J.adler = d(J.adler, we.pending_buf, we.pending - X, X)), we.gzindex === we.gzhead.extra.length && (we.gzindex = 0, we.status = 73);
            } else we.status = 73;
            if (we.status === 73) if (we.gzhead.name) {
              X = we.pending;
              do {
                if (we.pending === we.pending_buf_size && (we.gzhead.hcrc && we.pending > X && (J.adler = d(J.adler, we.pending_buf, we.pending - X, X)), O(J), X = we.pending, we.pending === we.pending_buf_size)) {
                  Z = 1;
                  break;
                }
                Z = we.gzindex < we.gzhead.name.length ? 255 & we.gzhead.name.charCodeAt(we.gzindex++) : 0, D(we, Z);
              } while (Z !== 0);
              we.gzhead.hcrc && we.pending > X && (J.adler = d(J.adler, we.pending_buf, we.pending - X, X)), Z === 0 && (we.gzindex = 0, we.status = 91);
            } else we.status = 91;
            if (we.status === 91) if (we.gzhead.comment) {
              X = we.pending;
              do {
                if (we.pending === we.pending_buf_size && (we.gzhead.hcrc && we.pending > X && (J.adler = d(J.adler, we.pending_buf, we.pending - X, X)), O(J), X = we.pending, we.pending === we.pending_buf_size)) {
                  Z = 1;
                  break;
                }
                Z = we.gzindex < we.gzhead.comment.length ? 255 & we.gzhead.comment.charCodeAt(we.gzindex++) : 0, D(we, Z);
              } while (Z !== 0);
              we.gzhead.hcrc && we.pending > X && (J.adler = d(J.adler, we.pending_buf, we.pending - X, X)), Z === 0 && (we.status = 103);
            } else we.status = 103;
            if (we.status === 103 && (we.gzhead.hcrc ? (we.pending + 2 > we.pending_buf_size && O(J), we.pending + 2 <= we.pending_buf_size && (D(we, 255 & J.adler), D(we, J.adler >> 8 & 255), J.adler = 0, we.status = R)) : we.status = R), we.pending !== 0) {
              if (O(J), J.avail_out === 0) return we.last_flush = -1, m;
            } else if (J.avail_in === 0 && z(pe) <= z(ce) && pe !== p) return G(J, -5);
            if (we.status === 666 && J.avail_in !== 0) return G(J, -5);
            if (J.avail_in !== 0 || we.lookahead !== 0 || pe !== h && we.status !== 666) {
              var fe = we.strategy === 2 ? (function (ye, ie) {
                for (var ae;;) {
                  if (ye.lookahead === 0 && (Y(ye), ye.lookahead === 0)) {
                    if (ie === h) return j;
                    break;
                  }
                  if (ye.match_length = 0, ae = s._tr_tally(ye, 0, ye.window[ye.strstart]), ye.lookahead--, ye.strstart++, ae && (L(ye, !1), ye.strm.avail_out === 0)) return j;
                }
                return ye.insert = 0, ie === p ? (L(ye, !0), ye.strm.avail_out === 0 ? F : N) : ye.last_lit && (L(ye, !1), ye.strm.avail_out === 0) ? j : B;
              })(we, pe) : we.strategy === 3 ? (function (ye, ie) {
                for (var ae, be, Ee, xe, he = ye.window;;) {
                  if (ye.lookahead <= M) {
                    if (Y(ye), ye.lookahead <= M && ie === h) return j;
                    if (ye.lookahead === 0) break;
                  }
                  if (ye.match_length = 0, ye.lookahead >= E && 0 < ye.strstart && (be = he[Ee = ye.strstart - 1]) === he[++Ee] && be === he[++Ee] && be === he[++Ee]) {
                    xe = ye.strstart + M;
                    do ; while (be === he[++Ee] && be === he[++Ee] && be === he[++Ee] && be === he[++Ee] && be === he[++Ee] && be === he[++Ee] && be === he[++Ee] && be === he[++Ee] && Ee < xe);
                    ye.match_length = M - (xe - Ee), ye.match_length > ye.lookahead && (ye.match_length = ye.lookahead);
                  }
                  if (ye.match_length >= E ? (ae = s._tr_tally(ye, 1, ye.match_length - E), ye.lookahead -= ye.match_length, ye.strstart += ye.match_length, ye.match_length = 0) : (ae = s._tr_tally(ye, 0, ye.window[ye.strstart]), ye.lookahead--, ye.strstart++), ae && (L(ye, !1), ye.strm.avail_out === 0)) return j;
                }
                return ye.insert = 0, ie === p ? (L(ye, !0), ye.strm.avail_out === 0 ? F : N) : ye.last_lit && (L(ye, !1), ye.strm.avail_out === 0) ? j : B;
              })(we, pe) : i[we.level].func(we, pe);
              if (fe !== F && fe !== N || (we.status = 666), fe === j || fe === F) return J.avail_out === 0 && (we.last_flush = -1), m;
              if (fe === B && (pe === 1 ? s._tr_align(we) : pe !== 5 && (s._tr_stored_block(we, 0, 0, !1), pe === 3 && (V(we.head), we.lookahead === 0 && (we.strstart = 0, we.block_start = 0, we.insert = 0))), O(J), J.avail_out === 0)) return we.last_flush = -1, m;
            }
            return pe !== p ? m : we.wrap <= 0 ? 1 : (we.wrap === 2 ? (D(we, 255 & J.adler), D(we, J.adler >> 8 & 255), D(we, J.adler >> 16 & 255), D(we, J.adler >> 24 & 255), D(we, 255 & J.total_in), D(we, J.total_in >> 8 & 255), D(we, J.total_in >> 16 & 255), D(we, J.total_in >> 24 & 255)) : (U(we, J.adler >>> 16), U(we, 65535 & J.adler)), O(J), 0 < we.wrap && (we.wrap = -we.wrap), we.pending !== 0 ? m : 1);
          }, a.deflateEnd = function (J) {
            var pe;
            return J && J.state ? (pe = J.state.status) !== P && pe !== 69 && pe !== 73 && pe !== 91 && pe !== 103 && pe !== R && pe !== 666 ? G(J, f) : (J.state = null, pe === R ? G(J, -3) : m) : f;
          }, a.deflateSetDictionary = function (J, pe) {
            var ce,
              we,
              X,
              Z,
              re,
              fe,
              ye,
              ie,
              ae = pe.length;
            if (!J || !J.state || (Z = (ce = J.state).wrap) === 2 || Z === 1 && ce.status !== P || ce.lookahead) return f;
            for (Z === 1 && (J.adler = l(J.adler, pe, ae, 0)), ce.wrap = 0, ae >= ce.w_size && (Z === 0 && (V(ce.head), ce.strstart = 0, ce.block_start = 0, ce.insert = 0), ie = new o.Buf8(ce.w_size), o.arraySet(ie, pe, ae - ce.w_size, ce.w_size, 0), pe = ie, ae = ce.w_size), re = J.avail_in, fe = J.next_in, ye = J.input, J.avail_in = ae, J.next_in = 0, J.input = pe, Y(ce); ce.lookahead >= E;) {
              for (we = ce.strstart, X = ce.lookahead - (E - 1); ce.ins_h = (ce.ins_h << ce.hash_shift ^ ce.window[we + E - 1]) & ce.hash_mask, ce.prev[we & ce.w_mask] = ce.head[ce.ins_h], ce.head[ce.ins_h] = we, we++, --X;);
              ce.strstart = we, ce.lookahead = E - 1, Y(ce);
            }
            return ce.strstart += ce.lookahead, ce.block_start = ce.strstart, ce.insert = ce.lookahead, ce.lookahead = 0, ce.match_length = ce.prev_length = E - 1, ce.match_available = 0, J.next_in = fe, J.input = ye, J.avail_in = re, ce.wrap = Z, m;
          }, a.deflateInfo = "pako deflate (from Nodeca project)";
        }, {
          "../utils/common": 41,
          "./adler32": 43,
          "./crc32": 45,
          "./messages": 51,
          "./trees": 52
        }],
        47: [function (n, r, a) {
          r.exports = function () {
            this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
          };
        }, {}],
        48: [function (n, r, a) {
          r.exports = function (i, o) {
            var s, l, d, u, h, p, m, f, y, b, v, _, w, k, A, S, C, I, E, M, T, P, R, j, B;
            s = i.state, l = i.next_in, j = i.input, d = l + (i.avail_in - 5), u = i.next_out, B = i.output, h = u - (o - i.avail_out), p = u + (i.avail_out - 257), m = s.dmax, f = s.wsize, y = s.whave, b = s.wnext, v = s.window, _ = s.hold, w = s.bits, k = s.lencode, A = s.distcode, S = (1 << s.lenbits) - 1, C = (1 << s.distbits) - 1;
            e: do {
              w < 15 && (_ += j[l++] << w, w += 8, _ += j[l++] << w, w += 8), I = k[_ & S];
              t: for (;;) {
                if (_ >>>= E = I >>> 24, w -= E, (E = I >>> 16 & 255) === 0) B[u++] = 65535 & I;else {
                  if (!(16 & E)) {
                    if ((64 & E) == 0) {
                      I = k[(65535 & I) + (_ & (1 << E) - 1)];
                      continue t;
                    }
                    if (32 & E) {
                      s.mode = 12;
                      break e;
                    }
                    i.msg = "invalid literal/length code", s.mode = 30;
                    break e;
                  }
                  M = 65535 & I, (E &= 15) && (w < E && (_ += j[l++] << w, w += 8), M += _ & (1 << E) - 1, _ >>>= E, w -= E), w < 15 && (_ += j[l++] << w, w += 8, _ += j[l++] << w, w += 8), I = A[_ & C];
                  n: for (;;) {
                    if (_ >>>= E = I >>> 24, w -= E, !(16 & (E = I >>> 16 & 255))) {
                      if ((64 & E) == 0) {
                        I = A[(65535 & I) + (_ & (1 << E) - 1)];
                        continue n;
                      }
                      i.msg = "invalid distance code", s.mode = 30;
                      break e;
                    }
                    if (T = 65535 & I, w < (E &= 15) && (_ += j[l++] << w, (w += 8) < E && (_ += j[l++] << w, w += 8)), m < (T += _ & (1 << E) - 1)) {
                      i.msg = "invalid distance too far back", s.mode = 30;
                      break e;
                    }
                    if (_ >>>= E, w -= E, (E = u - h) < T) {
                      if (y < (E = T - E) && s.sane) {
                        i.msg = "invalid distance too far back", s.mode = 30;
                        break e;
                      }
                      if (R = v, (P = 0) === b) {
                        if (P += f - E, E < M) {
                          for (M -= E; B[u++] = v[P++], --E;);
                          P = u - T, R = B;
                        }
                      } else if (b < E) {
                        if (P += f + b - E, (E -= b) < M) {
                          for (M -= E; B[u++] = v[P++], --E;);
                          if (P = 0, b < M) {
                            for (M -= E = b; B[u++] = v[P++], --E;);
                            P = u - T, R = B;
                          }
                        }
                      } else if (P += b - E, E < M) {
                        for (M -= E; B[u++] = v[P++], --E;);
                        P = u - T, R = B;
                      }
                      for (; 2 < M;) B[u++] = R[P++], B[u++] = R[P++], B[u++] = R[P++], M -= 3;
                      M && (B[u++] = R[P++], 1 < M && (B[u++] = R[P++]));
                    } else {
                      for (P = u - T; B[u++] = B[P++], B[u++] = B[P++], B[u++] = B[P++], 2 < (M -= 3););
                      M && (B[u++] = B[P++], 1 < M && (B[u++] = B[P++]));
                    }
                    break;
                  }
                }
                break;
              }
            } while (l < d && u < p);
            l -= M = w >> 3, _ &= (1 << (w -= M << 3)) - 1, i.next_in = l, i.next_out = u, i.avail_in = l < d ? d - l + 5 : 5 - (l - d), i.avail_out = u < p ? p - u + 257 : 257 - (u - p), s.hold = _, s.bits = w;
          };
        }, {}],
        49: [function (n, r, a) {
          var i = n("../utils/common"),
            o = n("./adler32"),
            s = n("./crc32"),
            l = n("./inffast"),
            d = n("./inftrees"),
            u = 1,
            h = 2,
            p = 0,
            m = -2,
            f = 1,
            y = 852,
            b = 592;
          function v(P) {
            return (P >>> 24 & 255) + (P >>> 8 & 65280) + ((65280 & P) << 8) + ((255 & P) << 24);
          }
          function _() {
            this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new i.Buf16(320), this.work = new i.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
          }
          function w(P) {
            var R;
            return P && P.state ? (R = P.state, P.total_in = P.total_out = R.total = 0, P.msg = "", R.wrap && (P.adler = 1 & R.wrap), R.mode = f, R.last = 0, R.havedict = 0, R.dmax = 32768, R.head = null, R.hold = 0, R.bits = 0, R.lencode = R.lendyn = new i.Buf32(y), R.distcode = R.distdyn = new i.Buf32(b), R.sane = 1, R.back = -1, p) : m;
          }
          function k(P) {
            var R;
            return P && P.state ? ((R = P.state).wsize = 0, R.whave = 0, R.wnext = 0, w(P)) : m;
          }
          function A(P, R) {
            var j, B;
            return P && P.state ? (B = P.state, R < 0 ? (j = 0, R = -R) : (j = 1 + (R >> 4), R < 48 && (R &= 15)), R && (R < 8 || 15 < R) ? m : (B.window !== null && B.wbits !== R && (B.window = null), B.wrap = j, B.wbits = R, k(P))) : m;
          }
          function S(P, R) {
            var j, B;
            return P ? (B = new _(), (P.state = B).window = null, (j = A(P, R)) !== p && (P.state = null), j) : m;
          }
          var C,
            I,
            E = !0;
          function M(P) {
            if (E) {
              var R;
              for (C = new i.Buf32(512), I = new i.Buf32(32), R = 0; R < 144;) P.lens[R++] = 8;
              for (; R < 256;) P.lens[R++] = 9;
              for (; R < 280;) P.lens[R++] = 7;
              for (; R < 288;) P.lens[R++] = 8;
              for (d(u, P.lens, 0, 288, C, 0, P.work, {
                bits: 9
              }), R = 0; R < 32;) P.lens[R++] = 5;
              d(h, P.lens, 0, 32, I, 0, P.work, {
                bits: 5
              }), E = !1;
            }
            P.lencode = C, P.lenbits = 9, P.distcode = I, P.distbits = 5;
          }
          function T(P, R, j, B) {
            var F,
              N = P.state;
            return N.window === null && (N.wsize = 1 << N.wbits, N.wnext = 0, N.whave = 0, N.window = new i.Buf8(N.wsize)), B >= N.wsize ? (i.arraySet(N.window, R, j - N.wsize, N.wsize, 0), N.wnext = 0, N.whave = N.wsize) : (B < (F = N.wsize - N.wnext) && (F = B), i.arraySet(N.window, R, j - B, F, N.wnext), (B -= F) ? (i.arraySet(N.window, R, j - B, B, 0), N.wnext = B, N.whave = N.wsize) : (N.wnext += F, N.wnext === N.wsize && (N.wnext = 0), N.whave < N.wsize && (N.whave += F))), 0;
          }
          a.inflateReset = k, a.inflateReset2 = A, a.inflateResetKeep = w, a.inflateInit = function (P) {
            return S(P, 15);
          }, a.inflateInit2 = S, a.inflate = function (P, R) {
            var j,
              B,
              F,
              N,
              G,
              z,
              V,
              O,
              L,
              D,
              U,
              H,
              Y,
              K,
              W,
              Q,
              q,
              ne,
              de,
              le,
              J,
              pe,
              ce,
              we,
              X = 0,
              Z = new i.Buf8(4),
              re = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
            if (!P || !P.state || !P.output || !P.input && P.avail_in !== 0) return m;
            (j = P.state).mode === 12 && (j.mode = 13), G = P.next_out, F = P.output, V = P.avail_out, N = P.next_in, B = P.input, z = P.avail_in, O = j.hold, L = j.bits, D = z, U = V, pe = p;
            e: for (;;) switch (j.mode) {
              case f:
                if (j.wrap === 0) {
                  j.mode = 13;
                  break;
                }
                for (; L < 16;) {
                  if (z === 0) break e;
                  z--, O += B[N++] << L, L += 8;
                }
                if (2 & j.wrap && O === 35615) {
                  Z[j.check = 0] = 255 & O, Z[1] = O >>> 8 & 255, j.check = s(j.check, Z, 2, 0), L = O = 0, j.mode = 2;
                  break;
                }
                if (j.flags = 0, j.head && (j.head.done = !1), !(1 & j.wrap) || (((255 & O) << 8) + (O >> 8)) % 31) {
                  P.msg = "incorrect header check", j.mode = 30;
                  break;
                }
                if ((15 & O) != 8) {
                  P.msg = "unknown compression method", j.mode = 30;
                  break;
                }
                if (L -= 4, J = 8 + (15 & (O >>>= 4)), j.wbits === 0) j.wbits = J;else if (J > j.wbits) {
                  P.msg = "invalid window size", j.mode = 30;
                  break;
                }
                j.dmax = 1 << J, P.adler = j.check = 1, j.mode = 512 & O ? 10 : 12, L = O = 0;
                break;
              case 2:
                for (; L < 16;) {
                  if (z === 0) break e;
                  z--, O += B[N++] << L, L += 8;
                }
                if (j.flags = O, (255 & j.flags) != 8) {
                  P.msg = "unknown compression method", j.mode = 30;
                  break;
                }
                if (57344 & j.flags) {
                  P.msg = "unknown header flags set", j.mode = 30;
                  break;
                }
                j.head && (j.head.text = O >> 8 & 1), 512 & j.flags && (Z[0] = 255 & O, Z[1] = O >>> 8 & 255, j.check = s(j.check, Z, 2, 0)), L = O = 0, j.mode = 3;
              case 3:
                for (; L < 32;) {
                  if (z === 0) break e;
                  z--, O += B[N++] << L, L += 8;
                }
                j.head && (j.head.time = O), 512 & j.flags && (Z[0] = 255 & O, Z[1] = O >>> 8 & 255, Z[2] = O >>> 16 & 255, Z[3] = O >>> 24 & 255, j.check = s(j.check, Z, 4, 0)), L = O = 0, j.mode = 4;
              case 4:
                for (; L < 16;) {
                  if (z === 0) break e;
                  z--, O += B[N++] << L, L += 8;
                }
                j.head && (j.head.xflags = 255 & O, j.head.os = O >> 8), 512 & j.flags && (Z[0] = 255 & O, Z[1] = O >>> 8 & 255, j.check = s(j.check, Z, 2, 0)), L = O = 0, j.mode = 5;
              case 5:
                if (1024 & j.flags) {
                  for (; L < 16;) {
                    if (z === 0) break e;
                    z--, O += B[N++] << L, L += 8;
                  }
                  j.length = O, j.head && (j.head.extra_len = O), 512 & j.flags && (Z[0] = 255 & O, Z[1] = O >>> 8 & 255, j.check = s(j.check, Z, 2, 0)), L = O = 0;
                } else j.head && (j.head.extra = null);
                j.mode = 6;
              case 6:
                if (1024 & j.flags && (z < (H = j.length) && (H = z), H && (j.head && (J = j.head.extra_len - j.length, j.head.extra || (j.head.extra = new Array(j.head.extra_len)), i.arraySet(j.head.extra, B, N, H, J)), 512 & j.flags && (j.check = s(j.check, B, H, N)), z -= H, N += H, j.length -= H), j.length)) break e;
                j.length = 0, j.mode = 7;
              case 7:
                if (2048 & j.flags) {
                  if (z === 0) break e;
                  for (H = 0; J = B[N + H++], j.head && J && j.length < 65536 && (j.head.name += String.fromCharCode(J)), J && H < z;);
                  if (512 & j.flags && (j.check = s(j.check, B, H, N)), z -= H, N += H, J) break e;
                } else j.head && (j.head.name = null);
                j.length = 0, j.mode = 8;
              case 8:
                if (4096 & j.flags) {
                  if (z === 0) break e;
                  for (H = 0; J = B[N + H++], j.head && J && j.length < 65536 && (j.head.comment += String.fromCharCode(J)), J && H < z;);
                  if (512 & j.flags && (j.check = s(j.check, B, H, N)), z -= H, N += H, J) break e;
                } else j.head && (j.head.comment = null);
                j.mode = 9;
              case 9:
                if (512 & j.flags) {
                  for (; L < 16;) {
                    if (z === 0) break e;
                    z--, O += B[N++] << L, L += 8;
                  }
                  if (O !== (65535 & j.check)) {
                    P.msg = "header crc mismatch", j.mode = 30;
                    break;
                  }
                  L = O = 0;
                }
                j.head && (j.head.hcrc = j.flags >> 9 & 1, j.head.done = !0), P.adler = j.check = 0, j.mode = 12;
                break;
              case 10:
                for (; L < 32;) {
                  if (z === 0) break e;
                  z--, O += B[N++] << L, L += 8;
                }
                P.adler = j.check = v(O), L = O = 0, j.mode = 11;
              case 11:
                if (j.havedict === 0) return P.next_out = G, P.avail_out = V, P.next_in = N, P.avail_in = z, j.hold = O, j.bits = L, 2;
                P.adler = j.check = 1, j.mode = 12;
              case 12:
                if (R === 5 || R === 6) break e;
              case 13:
                if (j.last) {
                  O >>>= 7 & L, L -= 7 & L, j.mode = 27;
                  break;
                }
                for (; L < 3;) {
                  if (z === 0) break e;
                  z--, O += B[N++] << L, L += 8;
                }
                switch (j.last = 1 & O, L -= 1, 3 & (O >>>= 1)) {
                  case 0:
                    j.mode = 14;
                    break;
                  case 1:
                    if (M(j), j.mode = 20, R !== 6) break;
                    O >>>= 2, L -= 2;
                    break e;
                  case 2:
                    j.mode = 17;
                    break;
                  case 3:
                    P.msg = "invalid block type", j.mode = 30;
                }
                O >>>= 2, L -= 2;
                break;
              case 14:
                for (O >>>= 7 & L, L -= 7 & L; L < 32;) {
                  if (z === 0) break e;
                  z--, O += B[N++] << L, L += 8;
                }
                if ((65535 & O) != (O >>> 16 ^ 65535)) {
                  P.msg = "invalid stored block lengths", j.mode = 30;
                  break;
                }
                if (j.length = 65535 & O, L = O = 0, j.mode = 15, R === 6) break e;
              case 15:
                j.mode = 16;
              case 16:
                if (H = j.length) {
                  if (z < H && (H = z), V < H && (H = V), H === 0) break e;
                  i.arraySet(F, B, N, H, G), z -= H, N += H, V -= H, G += H, j.length -= H;
                  break;
                }
                j.mode = 12;
                break;
              case 17:
                for (; L < 14;) {
                  if (z === 0) break e;
                  z--, O += B[N++] << L, L += 8;
                }
                if (j.nlen = 257 + (31 & O), O >>>= 5, L -= 5, j.ndist = 1 + (31 & O), O >>>= 5, L -= 5, j.ncode = 4 + (15 & O), O >>>= 4, L -= 4, 286 < j.nlen || 30 < j.ndist) {
                  P.msg = "too many length or distance symbols", j.mode = 30;
                  break;
                }
                j.have = 0, j.mode = 18;
              case 18:
                for (; j.have < j.ncode;) {
                  for (; L < 3;) {
                    if (z === 0) break e;
                    z--, O += B[N++] << L, L += 8;
                  }
                  j.lens[re[j.have++]] = 7 & O, O >>>= 3, L -= 3;
                }
                for (; j.have < 19;) j.lens[re[j.have++]] = 0;
                if (j.lencode = j.lendyn, j.lenbits = 7, ce = {
                  bits: j.lenbits
                }, pe = d(0, j.lens, 0, 19, j.lencode, 0, j.work, ce), j.lenbits = ce.bits, pe) {
                  P.msg = "invalid code lengths set", j.mode = 30;
                  break;
                }
                j.have = 0, j.mode = 19;
              case 19:
                for (; j.have < j.nlen + j.ndist;) {
                  for (; Q = (X = j.lencode[O & (1 << j.lenbits) - 1]) >>> 16 & 255, q = 65535 & X, !((W = X >>> 24) <= L);) {
                    if (z === 0) break e;
                    z--, O += B[N++] << L, L += 8;
                  }
                  if (q < 16) O >>>= W, L -= W, j.lens[j.have++] = q;else {
                    if (q === 16) {
                      for (we = W + 2; L < we;) {
                        if (z === 0) break e;
                        z--, O += B[N++] << L, L += 8;
                      }
                      if (O >>>= W, L -= W, j.have === 0) {
                        P.msg = "invalid bit length repeat", j.mode = 30;
                        break;
                      }
                      J = j.lens[j.have - 1], H = 3 + (3 & O), O >>>= 2, L -= 2;
                    } else if (q === 17) {
                      for (we = W + 3; L < we;) {
                        if (z === 0) break e;
                        z--, O += B[N++] << L, L += 8;
                      }
                      L -= W, J = 0, H = 3 + (7 & (O >>>= W)), O >>>= 3, L -= 3;
                    } else {
                      for (we = W + 7; L < we;) {
                        if (z === 0) break e;
                        z--, O += B[N++] << L, L += 8;
                      }
                      L -= W, J = 0, H = 11 + (127 & (O >>>= W)), O >>>= 7, L -= 7;
                    }
                    if (j.have + H > j.nlen + j.ndist) {
                      P.msg = "invalid bit length repeat", j.mode = 30;
                      break;
                    }
                    for (; H--;) j.lens[j.have++] = J;
                  }
                }
                if (j.mode === 30) break;
                if (j.lens[256] === 0) {
                  P.msg = "invalid code -- missing end-of-block", j.mode = 30;
                  break;
                }
                if (j.lenbits = 9, ce = {
                  bits: j.lenbits
                }, pe = d(u, j.lens, 0, j.nlen, j.lencode, 0, j.work, ce), j.lenbits = ce.bits, pe) {
                  P.msg = "invalid literal/lengths set", j.mode = 30;
                  break;
                }
                if (j.distbits = 6, j.distcode = j.distdyn, ce = {
                  bits: j.distbits
                }, pe = d(h, j.lens, j.nlen, j.ndist, j.distcode, 0, j.work, ce), j.distbits = ce.bits, pe) {
                  P.msg = "invalid distances set", j.mode = 30;
                  break;
                }
                if (j.mode = 20, R === 6) break e;
              case 20:
                j.mode = 21;
              case 21:
                if (6 <= z && 258 <= V) {
                  P.next_out = G, P.avail_out = V, P.next_in = N, P.avail_in = z, j.hold = O, j.bits = L, l(P, U), G = P.next_out, F = P.output, V = P.avail_out, N = P.next_in, B = P.input, z = P.avail_in, O = j.hold, L = j.bits, j.mode === 12 && (j.back = -1);
                  break;
                }
                for (j.back = 0; Q = (X = j.lencode[O & (1 << j.lenbits) - 1]) >>> 16 & 255, q = 65535 & X, !((W = X >>> 24) <= L);) {
                  if (z === 0) break e;
                  z--, O += B[N++] << L, L += 8;
                }
                if (Q && (240 & Q) == 0) {
                  for (ne = W, de = Q, le = q; Q = (X = j.lencode[le + ((O & (1 << ne + de) - 1) >> ne)]) >>> 16 & 255, q = 65535 & X, !(ne + (W = X >>> 24) <= L);) {
                    if (z === 0) break e;
                    z--, O += B[N++] << L, L += 8;
                  }
                  O >>>= ne, L -= ne, j.back += ne;
                }
                if (O >>>= W, L -= W, j.back += W, j.length = q, Q === 0) {
                  j.mode = 26;
                  break;
                }
                if (32 & Q) {
                  j.back = -1, j.mode = 12;
                  break;
                }
                if (64 & Q) {
                  P.msg = "invalid literal/length code", j.mode = 30;
                  break;
                }
                j.extra = 15 & Q, j.mode = 22;
              case 22:
                if (j.extra) {
                  for (we = j.extra; L < we;) {
                    if (z === 0) break e;
                    z--, O += B[N++] << L, L += 8;
                  }
                  j.length += O & (1 << j.extra) - 1, O >>>= j.extra, L -= j.extra, j.back += j.extra;
                }
                j.was = j.length, j.mode = 23;
              case 23:
                for (; Q = (X = j.distcode[O & (1 << j.distbits) - 1]) >>> 16 & 255, q = 65535 & X, !((W = X >>> 24) <= L);) {
                  if (z === 0) break e;
                  z--, O += B[N++] << L, L += 8;
                }
                if ((240 & Q) == 0) {
                  for (ne = W, de = Q, le = q; Q = (X = j.distcode[le + ((O & (1 << ne + de) - 1) >> ne)]) >>> 16 & 255, q = 65535 & X, !(ne + (W = X >>> 24) <= L);) {
                    if (z === 0) break e;
                    z--, O += B[N++] << L, L += 8;
                  }
                  O >>>= ne, L -= ne, j.back += ne;
                }
                if (O >>>= W, L -= W, j.back += W, 64 & Q) {
                  P.msg = "invalid distance code", j.mode = 30;
                  break;
                }
                j.offset = q, j.extra = 15 & Q, j.mode = 24;
              case 24:
                if (j.extra) {
                  for (we = j.extra; L < we;) {
                    if (z === 0) break e;
                    z--, O += B[N++] << L, L += 8;
                  }
                  j.offset += O & (1 << j.extra) - 1, O >>>= j.extra, L -= j.extra, j.back += j.extra;
                }
                if (j.offset > j.dmax) {
                  P.msg = "invalid distance too far back", j.mode = 30;
                  break;
                }
                j.mode = 25;
              case 25:
                if (V === 0) break e;
                if (H = U - V, j.offset > H) {
                  if ((H = j.offset - H) > j.whave && j.sane) {
                    P.msg = "invalid distance too far back", j.mode = 30;
                    break;
                  }
                  Y = H > j.wnext ? (H -= j.wnext, j.wsize - H) : j.wnext - H, H > j.length && (H = j.length), K = j.window;
                } else K = F, Y = G - j.offset, H = j.length;
                for (V < H && (H = V), V -= H, j.length -= H; F[G++] = K[Y++], --H;);
                j.length === 0 && (j.mode = 21);
                break;
              case 26:
                if (V === 0) break e;
                F[G++] = j.length, V--, j.mode = 21;
                break;
              case 27:
                if (j.wrap) {
                  for (; L < 32;) {
                    if (z === 0) break e;
                    z--, O |= B[N++] << L, L += 8;
                  }
                  if (U -= V, P.total_out += U, j.total += U, U && (P.adler = j.check = j.flags ? s(j.check, F, U, G - U) : o(j.check, F, U, G - U)), U = V, (j.flags ? O : v(O)) !== j.check) {
                    P.msg = "incorrect data check", j.mode = 30;
                    break;
                  }
                  L = O = 0;
                }
                j.mode = 28;
              case 28:
                if (j.wrap && j.flags) {
                  for (; L < 32;) {
                    if (z === 0) break e;
                    z--, O += B[N++] << L, L += 8;
                  }
                  if (O !== (4294967295 & j.total)) {
                    P.msg = "incorrect length check", j.mode = 30;
                    break;
                  }
                  L = O = 0;
                }
                j.mode = 29;
              case 29:
                pe = 1;
                break e;
              case 30:
                pe = -3;
                break e;
              case 31:
                return -4;
              case 32:
              default:
                return m;
            }
            return P.next_out = G, P.avail_out = V, P.next_in = N, P.avail_in = z, j.hold = O, j.bits = L, (j.wsize || U !== P.avail_out && j.mode < 30 && (j.mode < 27 || R !== 4)) && T(P, P.output, P.next_out, U - P.avail_out) ? (j.mode = 31, -4) : (D -= P.avail_in, U -= P.avail_out, P.total_in += D, P.total_out += U, j.total += U, j.wrap && U && (P.adler = j.check = j.flags ? s(j.check, F, U, P.next_out - U) : o(j.check, F, U, P.next_out - U)), P.data_type = j.bits + (j.last ? 64 : 0) + (j.mode === 12 ? 128 : 0) + (j.mode === 20 || j.mode === 15 ? 256 : 0), (D == 0 && U === 0 || R === 4) && pe === p && (pe = -5), pe);
          }, a.inflateEnd = function (P) {
            if (!P || !P.state) return m;
            var R = P.state;
            return R.window && (R.window = null), P.state = null, p;
          }, a.inflateGetHeader = function (P, R) {
            var j;
            return P && P.state ? (2 & (j = P.state).wrap) == 0 ? m : ((j.head = R).done = !1, p) : m;
          }, a.inflateSetDictionary = function (P, R) {
            var j,
              B = R.length;
            return P && P.state ? (j = P.state).wrap !== 0 && j.mode !== 11 ? m : j.mode === 11 && o(1, R, B, 0) !== j.check ? -3 : T(P, R, B, B) ? (j.mode = 31, -4) : (j.havedict = 1, p) : m;
          }, a.inflateInfo = "pako inflate (from Nodeca project)";
        }, {
          "../utils/common": 41,
          "./adler32": 43,
          "./crc32": 45,
          "./inffast": 48,
          "./inftrees": 50
        }],
        50: [function (n, r, a) {
          var i = n("../utils/common"),
            o = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
            s = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
            l = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
            d = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
          r.exports = function (u, h, p, m, f, y, b, v) {
            var _,
              w,
              k,
              A,
              S,
              C,
              I,
              E,
              M,
              T = v.bits,
              P = 0,
              R = 0,
              j = 0,
              B = 0,
              F = 0,
              N = 0,
              G = 0,
              z = 0,
              V = 0,
              O = 0,
              L = null,
              D = 0,
              U = new i.Buf16(16),
              H = new i.Buf16(16),
              Y = null,
              K = 0;
            for (P = 0; P <= 15; P++) U[P] = 0;
            for (R = 0; R < m; R++) U[h[p + R]]++;
            for (F = T, B = 15; 1 <= B && U[B] === 0; B--);
            if (B < F && (F = B), B === 0) return f[y++] = 20971520, f[y++] = 20971520, v.bits = 1, 0;
            for (j = 1; j < B && U[j] === 0; j++);
            for (F < j && (F = j), P = z = 1; P <= 15; P++) if (z <<= 1, (z -= U[P]) < 0) return -1;
            if (0 < z && (u === 0 || B !== 1)) return -1;
            for (H[1] = 0, P = 1; P < 15; P++) H[P + 1] = H[P] + U[P];
            for (R = 0; R < m; R++) h[p + R] !== 0 && (b[H[h[p + R]]++] = R);
            if (C = u === 0 ? (L = Y = b, 19) : u === 1 ? (L = o, D -= 257, Y = s, K -= 257, 256) : (L = l, Y = d, -1), P = j, S = y, G = R = O = 0, k = -1, A = (V = 1 << (N = F)) - 1, u === 1 && 852 < V || u === 2 && 592 < V) return 1;
            for (;;) {
              for (I = P - G, M = b[R] < C ? (E = 0, b[R]) : b[R] > C ? (E = Y[K + b[R]], L[D + b[R]]) : (E = 96, 0), _ = 1 << P - G, j = w = 1 << N; f[S + (O >> G) + (w -= _)] = I << 24 | E << 16 | M | 0, w !== 0;);
              for (_ = 1 << P - 1; O & _;) _ >>= 1;
              if (_ !== 0 ? (O &= _ - 1, O += _) : O = 0, R++, --U[P] == 0) {
                if (P === B) break;
                P = h[p + b[R]];
              }
              if (F < P && (O & A) !== k) {
                for (G === 0 && (G = F), S += j, z = 1 << (N = P - G); N + G < B && !((z -= U[N + G]) <= 0);) N++, z <<= 1;
                if (V += 1 << N, u === 1 && 852 < V || u === 2 && 592 < V) return 1;
                f[k = O & A] = F << 24 | N << 16 | S - y | 0;
              }
            }
            return O !== 0 && (f[S + O] = P - G << 24 | 64 << 16 | 0), v.bits = F, 0;
          };
        }, {
          "../utils/common": 41
        }],
        51: [function (n, r, a) {
          r.exports = {
            2: "need dictionary",
            1: "stream end",
            0: "",
            "-1": "file error",
            "-2": "stream error",
            "-3": "data error",
            "-4": "insufficient memory",
            "-5": "buffer error",
            "-6": "incompatible version"
          };
        }, {}],
        52: [function (n, r, a) {
          var i = n("../utils/common"),
            o = 0,
            s = 1;
          function l(X) {
            for (var Z = X.length; 0 <= --Z;) X[Z] = 0;
          }
          var d = 0,
            u = 29,
            h = 256,
            p = h + 1 + u,
            m = 30,
            f = 19,
            y = 2 * p + 1,
            b = 15,
            v = 16,
            _ = 7,
            w = 256,
            k = 16,
            A = 17,
            S = 18,
            C = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
            I = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
            E = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
            M = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
            T = new Array(2 * (p + 2));
          l(T);
          var P = new Array(2 * m);
          l(P);
          var R = new Array(512);
          l(R);
          var j = new Array(256);
          l(j);
          var B = new Array(u);
          l(B);
          var F,
            N,
            G,
            z = new Array(m);
          function V(X, Z, re, fe, ye) {
            this.static_tree = X, this.extra_bits = Z, this.extra_base = re, this.elems = fe, this.max_length = ye, this.has_stree = X && X.length;
          }
          function O(X, Z) {
            this.dyn_tree = X, this.max_code = 0, this.stat_desc = Z;
          }
          function L(X) {
            return X < 256 ? R[X] : R[256 + (X >>> 7)];
          }
          function D(X, Z) {
            X.pending_buf[X.pending++] = 255 & Z, X.pending_buf[X.pending++] = Z >>> 8 & 255;
          }
          function U(X, Z, re) {
            X.bi_valid > v - re ? (X.bi_buf |= Z << X.bi_valid & 65535, D(X, X.bi_buf), X.bi_buf = Z >> v - X.bi_valid, X.bi_valid += re - v) : (X.bi_buf |= Z << X.bi_valid & 65535, X.bi_valid += re);
          }
          function H(X, Z, re) {
            U(X, re[2 * Z], re[2 * Z + 1]);
          }
          function Y(X, Z) {
            for (var re = 0; re |= 1 & X, X >>>= 1, re <<= 1, 0 < --Z;);
            return re >>> 1;
          }
          function K(X, Z, re) {
            var fe,
              ye,
              ie = new Array(b + 1),
              ae = 0;
            for (fe = 1; fe <= b; fe++) ie[fe] = ae = ae + re[fe - 1] << 1;
            for (ye = 0; ye <= Z; ye++) {
              var be = X[2 * ye + 1];
              be !== 0 && (X[2 * ye] = Y(ie[be]++, be));
            }
          }
          function W(X) {
            var Z;
            for (Z = 0; Z < p; Z++) X.dyn_ltree[2 * Z] = 0;
            for (Z = 0; Z < m; Z++) X.dyn_dtree[2 * Z] = 0;
            for (Z = 0; Z < f; Z++) X.bl_tree[2 * Z] = 0;
            X.dyn_ltree[2 * w] = 1, X.opt_len = X.static_len = 0, X.last_lit = X.matches = 0;
          }
          function Q(X) {
            8 < X.bi_valid ? D(X, X.bi_buf) : 0 < X.bi_valid && (X.pending_buf[X.pending++] = X.bi_buf), X.bi_buf = 0, X.bi_valid = 0;
          }
          function q(X, Z, re, fe) {
            var ye = 2 * Z,
              ie = 2 * re;
            return X[ye] < X[ie] || X[ye] === X[ie] && fe[Z] <= fe[re];
          }
          function ne(X, Z, re) {
            for (var fe = X.heap[re], ye = re << 1; ye <= X.heap_len && (ye < X.heap_len && q(Z, X.heap[ye + 1], X.heap[ye], X.depth) && ye++, !q(Z, fe, X.heap[ye], X.depth));) X.heap[re] = X.heap[ye], re = ye, ye <<= 1;
            X.heap[re] = fe;
          }
          function de(X, Z, re) {
            var fe,
              ye,
              ie,
              ae,
              be = 0;
            if (X.last_lit !== 0) for (; fe = X.pending_buf[X.d_buf + 2 * be] << 8 | X.pending_buf[X.d_buf + 2 * be + 1], ye = X.pending_buf[X.l_buf + be], be++, fe === 0 ? H(X, ye, Z) : (H(X, (ie = j[ye]) + h + 1, Z), (ae = C[ie]) !== 0 && U(X, ye -= B[ie], ae), H(X, ie = L(--fe), re), (ae = I[ie]) !== 0 && U(X, fe -= z[ie], ae)), be < X.last_lit;);
            H(X, w, Z);
          }
          function le(X, Z) {
            var re,
              fe,
              ye,
              ie = Z.dyn_tree,
              ae = Z.stat_desc.static_tree,
              be = Z.stat_desc.has_stree,
              Ee = Z.stat_desc.elems,
              xe = -1;
            for (X.heap_len = 0, X.heap_max = y, re = 0; re < Ee; re++) ie[2 * re] !== 0 ? (X.heap[++X.heap_len] = xe = re, X.depth[re] = 0) : ie[2 * re + 1] = 0;
            for (; X.heap_len < 2;) ie[2 * (ye = X.heap[++X.heap_len] = xe < 2 ? ++xe : 0)] = 1, X.depth[ye] = 0, X.opt_len--, be && (X.static_len -= ae[2 * ye + 1]);
            for (Z.max_code = xe, re = X.heap_len >> 1; 1 <= re; re--) ne(X, ie, re);
            for (ye = Ee; re = X.heap[1], X.heap[1] = X.heap[X.heap_len--], ne(X, ie, 1), fe = X.heap[1], X.heap[--X.heap_max] = re, X.heap[--X.heap_max] = fe, ie[2 * ye] = ie[2 * re] + ie[2 * fe], X.depth[ye] = (X.depth[re] >= X.depth[fe] ? X.depth[re] : X.depth[fe]) + 1, ie[2 * re + 1] = ie[2 * fe + 1] = ye, X.heap[1] = ye++, ne(X, ie, 1), 2 <= X.heap_len;);
            X.heap[--X.heap_max] = X.heap[1], (function (he, ue) {
              var ge,
                _e,
                ke,
                ve,
                Te,
                Ne,
                me = ue.dyn_tree,
                Ae = ue.max_code,
                Fe = ue.stat_desc.static_tree,
                Me = ue.stat_desc.has_stree,
                Re = ue.stat_desc.extra_bits,
                $e = ue.stat_desc.extra_base,
                rt = ue.stat_desc.max_length,
                nt = 0;
              for (ve = 0; ve <= b; ve++) he.bl_count[ve] = 0;
              for (me[2 * he.heap[he.heap_max] + 1] = 0, ge = he.heap_max + 1; ge < y; ge++) rt < (ve = me[2 * me[2 * (_e = he.heap[ge]) + 1] + 1] + 1) && (ve = rt, nt++), me[2 * _e + 1] = ve, Ae < _e || (he.bl_count[ve]++, Te = 0, $e <= _e && (Te = Re[_e - $e]), Ne = me[2 * _e], he.opt_len += Ne * (ve + Te), Me && (he.static_len += Ne * (Fe[2 * _e + 1] + Te)));
              if (nt !== 0) {
                do {
                  for (ve = rt - 1; he.bl_count[ve] === 0;) ve--;
                  he.bl_count[ve]--, he.bl_count[ve + 1] += 2, he.bl_count[rt]--, nt -= 2;
                } while (0 < nt);
                for (ve = rt; ve !== 0; ve--) for (_e = he.bl_count[ve]; _e !== 0;) Ae < (ke = he.heap[--ge]) || (me[2 * ke + 1] !== ve && (he.opt_len += (ve - me[2 * ke + 1]) * me[2 * ke], me[2 * ke + 1] = ve), _e--);
              }
            })(X, Z), K(ie, xe, X.bl_count);
          }
          function J(X, Z, re) {
            var fe,
              ye,
              ie = -1,
              ae = Z[1],
              be = 0,
              Ee = 7,
              xe = 4;
            for (ae === 0 && (Ee = 138, xe = 3), Z[2 * (re + 1) + 1] = 65535, fe = 0; fe <= re; fe++) ye = ae, ae = Z[2 * (fe + 1) + 1], ++be < Ee && ye === ae || (be < xe ? X.bl_tree[2 * ye] += be : ye !== 0 ? (ye !== ie && X.bl_tree[2 * ye]++, X.bl_tree[2 * k]++) : be <= 10 ? X.bl_tree[2 * A]++ : X.bl_tree[2 * S]++, ie = ye, xe = (be = 0) === ae ? (Ee = 138, 3) : ye === ae ? (Ee = 6, 3) : (Ee = 7, 4));
          }
          function pe(X, Z, re) {
            var fe,
              ye,
              ie = -1,
              ae = Z[1],
              be = 0,
              Ee = 7,
              xe = 4;
            for (ae === 0 && (Ee = 138, xe = 3), fe = 0; fe <= re; fe++) if (ye = ae, ae = Z[2 * (fe + 1) + 1], !(++be < Ee && ye === ae)) {
              if (be < xe) for (; H(X, ye, X.bl_tree), --be != 0;);else ye !== 0 ? (ye !== ie && (H(X, ye, X.bl_tree), be--), H(X, k, X.bl_tree), U(X, be - 3, 2)) : be <= 10 ? (H(X, A, X.bl_tree), U(X, be - 3, 3)) : (H(X, S, X.bl_tree), U(X, be - 11, 7));
              ie = ye, xe = (be = 0) === ae ? (Ee = 138, 3) : ye === ae ? (Ee = 6, 3) : (Ee = 7, 4);
            }
          }
          l(z);
          var ce = !1;
          function we(X, Z, re, fe) {
            U(X, (d << 1) + (fe ? 1 : 0), 3), (function (ye, ie, ae, be) {
              Q(ye), D(ye, ae), D(ye, ~ae), i.arraySet(ye.pending_buf, ye.window, ie, ae, ye.pending), ye.pending += ae;
            })(X, Z, re);
          }
          a._tr_init = function (X) {
            ce || ((function () {
              var Z,
                re,
                fe,
                ye,
                ie,
                ae = new Array(b + 1);
              for (ye = fe = 0; ye < u - 1; ye++) for (B[ye] = fe, Z = 0; Z < 1 << C[ye]; Z++) j[fe++] = ye;
              for (j[fe - 1] = ye, ye = ie = 0; ye < 16; ye++) for (z[ye] = ie, Z = 0; Z < 1 << I[ye]; Z++) R[ie++] = ye;
              for (ie >>= 7; ye < m; ye++) for (z[ye] = ie << 7, Z = 0; Z < 1 << I[ye] - 7; Z++) R[256 + ie++] = ye;
              for (re = 0; re <= b; re++) ae[re] = 0;
              for (Z = 0; Z <= 143;) T[2 * Z + 1] = 8, Z++, ae[8]++;
              for (; Z <= 255;) T[2 * Z + 1] = 9, Z++, ae[9]++;
              for (; Z <= 279;) T[2 * Z + 1] = 7, Z++, ae[7]++;
              for (; Z <= 287;) T[2 * Z + 1] = 8, Z++, ae[8]++;
              for (K(T, p + 1, ae), Z = 0; Z < m; Z++) P[2 * Z + 1] = 5, P[2 * Z] = Y(Z, 5);
              F = new V(T, C, h + 1, p, b), N = new V(P, I, 0, m, b), G = new V(new Array(0), E, 0, f, _);
            })(), ce = !0), X.l_desc = new O(X.dyn_ltree, F), X.d_desc = new O(X.dyn_dtree, N), X.bl_desc = new O(X.bl_tree, G), X.bi_buf = 0, X.bi_valid = 0, W(X);
          }, a._tr_stored_block = we, a._tr_flush_block = function (X, Z, re, fe) {
            var ye,
              ie,
              ae = 0;
            0 < X.level ? (X.strm.data_type === 2 && (X.strm.data_type = (function (be) {
              var Ee,
                xe = 4093624447;
              for (Ee = 0; Ee <= 31; Ee++, xe >>>= 1) if (1 & xe && be.dyn_ltree[2 * Ee] !== 0) return o;
              if (be.dyn_ltree[18] !== 0 || be.dyn_ltree[20] !== 0 || be.dyn_ltree[26] !== 0) return s;
              for (Ee = 32; Ee < h; Ee++) if (be.dyn_ltree[2 * Ee] !== 0) return s;
              return o;
            })(X)), le(X, X.l_desc), le(X, X.d_desc), ae = (function (be) {
              var Ee;
              for (J(be, be.dyn_ltree, be.l_desc.max_code), J(be, be.dyn_dtree, be.d_desc.max_code), le(be, be.bl_desc), Ee = f - 1; 3 <= Ee && be.bl_tree[2 * M[Ee] + 1] === 0; Ee--);
              return be.opt_len += 3 * (Ee + 1) + 5 + 5 + 4, Ee;
            })(X), ye = X.opt_len + 3 + 7 >>> 3, (ie = X.static_len + 3 + 7 >>> 3) <= ye && (ye = ie)) : ye = ie = re + 5, re + 4 <= ye && Z !== -1 ? we(X, Z, re, fe) : X.strategy === 4 || ie === ye ? (U(X, 2 + (fe ? 1 : 0), 3), de(X, T, P)) : (U(X, 4 + (fe ? 1 : 0), 3), (function (be, Ee, xe, he) {
              var ue;
              for (U(be, Ee - 257, 5), U(be, xe - 1, 5), U(be, he - 4, 4), ue = 0; ue < he; ue++) U(be, be.bl_tree[2 * M[ue] + 1], 3);
              pe(be, be.dyn_ltree, Ee - 1), pe(be, be.dyn_dtree, xe - 1);
            })(X, X.l_desc.max_code + 1, X.d_desc.max_code + 1, ae + 1), de(X, X.dyn_ltree, X.dyn_dtree)), W(X), fe && Q(X);
          }, a._tr_tally = function (X, Z, re) {
            return X.pending_buf[X.d_buf + 2 * X.last_lit] = Z >>> 8 & 255, X.pending_buf[X.d_buf + 2 * X.last_lit + 1] = 255 & Z, X.pending_buf[X.l_buf + X.last_lit] = 255 & re, X.last_lit++, Z === 0 ? X.dyn_ltree[2 * re]++ : (X.matches++, Z--, X.dyn_ltree[2 * (j[re] + h + 1)]++, X.dyn_dtree[2 * L(Z)]++), X.last_lit === X.lit_bufsize - 1;
          }, a._tr_align = function (X) {
            U(X, 2, 3), H(X, w, T), (function (Z) {
              Z.bi_valid === 16 ? (D(Z, Z.bi_buf), Z.bi_buf = 0, Z.bi_valid = 0) : 8 <= Z.bi_valid && (Z.pending_buf[Z.pending++] = 255 & Z.bi_buf, Z.bi_buf >>= 8, Z.bi_valid -= 8);
            })(X);
          };
        }, {
          "../utils/common": 41
        }],
        53: [function (n, r, a) {
          r.exports = function () {
            this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
          };
        }, {}],
        54: [function (n, r, a) {
          (function (i) {
            (function (o, s) {
              if (!o.setImmediate) {
                var l,
                  d,
                  u,
                  h,
                  p = 1,
                  m = {},
                  f = !1,
                  y = o.document,
                  b = Object.getPrototypeOf && Object.getPrototypeOf(o);
                b = b && b.setTimeout ? b : o, l = {}.toString.call(o.process) === "[object process]" ? function (k) {
                  process.nextTick(function () {
                    _(k);
                  });
                } : (function () {
                  if (o.postMessage && !o.importScripts) {
                    var k = !0,
                      A = o.onmessage;
                    return o.onmessage = function () {
                      k = !1;
                    }, o.postMessage("", "*"), o.onmessage = A, k;
                  }
                })() ? (h = "setImmediate$" + Math.random() + "$", o.addEventListener ? o.addEventListener("message", w, !1) : o.attachEvent("onmessage", w), function (k) {
                  o.postMessage(h + k, "*");
                }) : o.MessageChannel ? ((u = new MessageChannel()).port1.onmessage = function (k) {
                  _(k.data);
                }, function (k) {
                  u.port2.postMessage(k);
                }) : y && "onreadystatechange" in y.createElement("script") ? (d = y.documentElement, function (k) {
                  var A = y.createElement("script");
                  A.onreadystatechange = function () {
                    _(k), A.onreadystatechange = null, d.removeChild(A), A = null;
                  }, d.appendChild(A);
                }) : function (k) {
                  setTimeout(_, 0, k);
                }, b.setImmediate = function (k) {
                  typeof k != "function" && (k = new Function("" + k));
                  for (var A = new Array(arguments.length - 1), S = 0; S < A.length; S++) A[S] = arguments[S + 1];
                  var C = {
                    callback: k,
                    args: A
                  };
                  return m[p] = C, l(p), p++;
                }, b.clearImmediate = v;
              }
              function v(k) {
                delete m[k];
              }
              function _(k) {
                if (f) setTimeout(_, 0, k);else {
                  var A = m[k];
                  if (A) {
                    f = !0;
                    try {
                      (function (S) {
                        var C = S.callback,
                          I = S.args;
                        switch (I.length) {
                          case 0:
                            C();
                            break;
                          case 1:
                            C(I[0]);
                            break;
                          case 2:
                            C(I[0], I[1]);
                            break;
                          case 3:
                            C(I[0], I[1], I[2]);
                            break;
                          default:
                            C.apply(s, I);
                        }
                      })(A);
                    } finally {
                      v(k), f = !1;
                    }
                  }
                }
              }
              function w(k) {
                k.source === o && typeof k.data == "string" && k.data.indexOf(h) === 0 && _(+k.data.slice(h.length));
              }
            })(typeof self > "u" ? i === void 0 ? this : i : self);
          }).call(this, typeof MEe < "u" ? MEe : typeof self < "u" ? self : typeof window < "u" ? window : {});
        }, {}]
      }, {}, [10])(10);
    });
  })(Lit)), Lit.exports;
}

var tVa = eVa();

const fOt = j4e(tVa),
  wCe = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: fOt
  }, Symbol.toStringTag, {
    value: "Module"
  }));

/*! xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */var pke = {};

pke.version = "0.20.3";

var mb = 1200,
  bJ = 1252,
  Rc,
  nVa = [874, 932, 936, 949, 950, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1e4],
  gOt = {
    0: 1252,
    1: 65001,
    2: 65001,
    77: 1e4,
    128: 932,
    129: 949,
    130: 1361,
    134: 936,
    136: 950,
    161: 1253,
    162: 1254,
    163: 1258,
    177: 1255,
    178: 1256,
    186: 1257,
    204: 1251,
    222: 874,
    238: 1250,
    255: 1252,
    69: 6969
  },
  jXe = function (e) {
    nVa.indexOf(e) != -1 && (bJ = gOt[0] = e);
  };

function rVa() {
  jXe(1252);
}

var N5 = function (e) {
  mb = e, jXe(e);
};

function DXe() {
  N5(1200), rVa();
}

function zze(e) {
  for (var t = [], n = 0, r = e.length; n < r; ++n) t[n] = e.charCodeAt(n);
  return t;
}

function dnr(e) {
  for (var t = [], n = 0; n < e.length >> 1; ++n) t[n] = String.fromCharCode(e.charCodeAt(2 * n) + (e.charCodeAt(2 * n + 1) << 8));
  return t.join("");
}

function aVa(e) {
  for (var t = [], n = 0; n < e.length >> 1; ++n) t[n] = String.fromCharCode(e[2 * n] + (e[2 * n + 1] << 8));
  return t.join("");
}

function unr(e) {
  for (var t = [], n = 0; n < e.length >> 1; ++n) t[n] = String.fromCharCode(e.charCodeAt(2 * n + 1) + (e.charCodeAt(2 * n) << 8));
  return t.join("");
}

var Fre = function (e) {
    var t = e.charCodeAt(0),
      n = e.charCodeAt(1);
    return t == 255 && n == 254 ? dnr(e.slice(2)) : t == 254 && n == 255 ? unr(e.slice(2)) : t == 65279 ? e.slice(1) : e;
  },
  K0e = function (t) {
    return String.fromCharCode(t);
  },
  Bwt = function (t) {
    return String.fromCharCode(t);
  };

function hnr(e) {
  Rc = e, N5 = function (t) {
    mb = t, jXe(t);
  }, Fre = function (t) {
    return t.charCodeAt(0) === 255 && t.charCodeAt(1) === 254 ? Rc.utils.decode(1200, zze(t.slice(2))) : t;
  }, K0e = function (n) {
    return mb === 1200 ? String.fromCharCode(n) : Rc.utils.decode(mb, [n & 255, n >> 8])[0];
  }, Bwt = function (n) {
    return Rc.utils.decode(bJ, [n])[0];
  }, znr();
}

var iVa = null,
  fx = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function Uze(e) {
  for (var t = "", n = 0, r = 0, a = 0, i = 0, o = 0, s = 0, l = 0, d = 0; d < e.length;) n = e.charCodeAt(d++), i = n >> 2, r = e.charCodeAt(d++), o = (n & 3) << 4 | r >> 4, a = e.charCodeAt(d++), s = (r & 15) << 2 | a >> 6, l = a & 63, isNaN(r) ? s = l = 64 : isNaN(a) && (l = 64), t += fx.charAt(i) + fx.charAt(o) + fx.charAt(s) + fx.charAt(l);
  return t;
}

function oVa(e) {
  for (var t = "", n = 0, r = 0, a = 0, i = 0, o = 0, s = 0, l = 0, d = 0; d < e.length;) n = e.charCodeAt(d++), n > 255 && (n = 95), i = n >> 2, r = e.charCodeAt(d++), r > 255 && (r = 95), o = (n & 3) << 4 | r >> 4, a = e.charCodeAt(d++), a > 255 && (a = 95), s = (r & 15) << 2 | a >> 6, l = a & 63, isNaN(r) ? s = l = 64 : isNaN(a) && (l = 64), t += fx.charAt(i) + fx.charAt(o) + fx.charAt(s) + fx.charAt(l);
  return t;
}

function sVa(e) {
  for (var t = "", n = 0, r = 0, a = 0, i = 0, o = 0, s = 0, l = 0, d = 0; d < e.length;) n = e[d++], i = n >> 2, r = e[d++], o = (n & 3) << 4 | r >> 4, a = e[d++], s = (r & 15) << 2 | a >> 6, l = a & 63, isNaN(r) ? s = l = 64 : isNaN(a) && (l = 64), t += fx.charAt(i) + fx.charAt(o) + fx.charAt(s) + fx.charAt(l);
  return t;
}

function _3(e) {
  var t = "",
    n = 0,
    r = 0,
    a = 0,
    i = 0,
    o = 0,
    s = 0,
    l = 0;
  if (e.slice(0, 5) == "data:") {
    var d = e.slice(0, 1024).indexOf(";base64,");
    d > -1 && (e = e.slice(d + 8));
  }
  e = e.replace(/[^\w\+\/\=]/g, "");
  for (var d = 0; d < e.length;) i = fx.indexOf(e.charAt(d++)), o = fx.indexOf(e.charAt(d++)), n = i << 2 | o >> 4, t += String.fromCharCode(n), s = fx.indexOf(e.charAt(d++)), r = (o & 15) << 4 | s >> 2, s !== 64 && (t += String.fromCharCode(r)), l = fx.indexOf(e.charAt(d++)), a = (s & 3) << 6 | l, l !== 64 && (t += String.fromCharCode(a));
  return t;
}

var Uc = (function () {
    return typeof Buffer < "u" && typeof process < "u" && typeof process.versions < "u" && !!process.versions.node;
  })(),
  g9 = (function () {
    if (typeof Buffer < "u") {
      var e = !Buffer.from;
      if (!e) try {
        Buffer.from("foo", "utf8");
      } catch {
        e = !0;
      }
      return e ? function (t, n) {
        return n ? new Buffer(t, n) : new Buffer(t);
      } : Buffer.from.bind(Buffer);
    }
    return function () {};
  })(),
  mke = (function () {
    if (typeof Buffer > "u") return !1;
    var e = g9([65, 0]);
    if (!e) return !1;
    var t = e.toString("utf16le");
    return t.length == 1;
  })();

function s$(e) {
  return Uc ? Buffer.alloc ? Buffer.alloc(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}

function fin(e) {
  return Uc ? Buffer.allocUnsafe ? Buffer.allocUnsafe(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}

var I2 = function (t) {
  return Uc ? g9(t, "binary") : t.split("").map(function (n) {
    return n.charCodeAt(0) & 255;
  });
};

function xCe(e) {
  if (typeof ArrayBuffer > "u") return I2(e);
  for (var t = new ArrayBuffer(e.length), n = new Uint8Array(t), r = 0; r != e.length; ++r) n[r] = e.charCodeAt(r) & 255;
  return t;
}

function GP(e) {
  if (Array.isArray(e)) return e.map(function (r) {
    return String.fromCharCode(r);
  }).join("");
  for (var t = [], n = 0; n < e.length; ++n) t[n] = String.fromCharCode(e[n]);
  return t.join("");
}

function lVa(e) {
  if (typeof Uint8Array > "u") throw new Error("Unsupported");
  return new Uint8Array(e);
}

function yOt(e) {
  if (typeof ArrayBuffer > "u") throw new Error("Unsupported");
  if (e instanceof ArrayBuffer) return yOt(new Uint8Array(e));
  for (var t = new Array(e.length), n = 0; n < e.length; ++n) t[n] = e[n];
  return t;
}

var k0 = Uc ? function (e) {
  return Buffer.concat(e.map(function (t) {
    return Buffer.isBuffer(t) ? t : g9(t);
  }));
} : function (e) {
  if (typeof Uint8Array < "u") {
    var t = 0,
      n = 0;
    for (t = 0; t < e.length; ++t) n += e[t].length;
    var r = new Uint8Array(n),
      a = 0;
    for (t = 0, n = 0; t < e.length; n += a, ++t) a = e[t].length, e[t] instanceof Uint8Array ? r.set(e[t], n) : typeof e[t] == "string" ? r.set(new Uint8Array(I2(e[t])), n) : r.set(new Uint8Array(e[t]), n);
    return r;
  }
  return [].concat.apply([], e.map(function (i) {
    return Array.isArray(i) ? i : [].slice.call(i);
  }));
};

function cVa(e) {
  for (var t = [], n = 0, r = e.length + 250, a = s$(e.length + 255), i = 0; i < e.length; ++i) {
    var o = e.charCodeAt(i);
    if (o < 128) a[n++] = o;else if (o < 2048) a[n++] = 192 | o >> 6 & 31, a[n++] = 128 | o & 63;else if (o >= 55296 && o < 57344) {
      o = (o & 1023) + 64;
      var s = e.charCodeAt(++i) & 1023;
      a[n++] = 240 | o >> 8 & 7, a[n++] = 128 | o >> 2 & 63, a[n++] = 128 | s >> 6 & 15 | (o & 3) << 4, a[n++] = 128 | s & 63;
    } else a[n++] = 224 | o >> 12 & 15, a[n++] = 128 | o >> 6 & 63, a[n++] = 128 | o & 63;
    n > r && (t.push(a.slice(0, n)), n = 0, a = s$(65535), r = 65530);
  }
  return t.push(a.slice(0, n)), k0(t);
}

var n_ = /\u0000/g,
  Q0e = /[\u0001-\u0006]/g;

function Gie(e) {
  for (var t = "", n = e.length - 1; n >= 0;) t += e.charAt(n--);
  return t;
}

function gE(e, t) {
  var n = "" + e;
  return n.length >= t ? n : Gd("0", t - n.length) + n;
}

function bOt(e, t) {
  var n = "" + e;
  return n.length >= t ? n : Gd(" ", t - n.length) + n;
}

function $ze(e, t) {
  var n = "" + e;
  return n.length >= t ? n : n + Gd(" ", t - n.length);
}

function dVa(e, t) {
  var n = "" + Math.round(e);
  return n.length >= t ? n : Gd("0", t - n.length) + n;
}

function uVa(e, t) {
  var n = "" + e;
  return n.length >= t ? n : Gd("0", t - n.length) + n;
}

var gin = Math.pow(2, 32);

function wte(e, t) {
  if (e > gin || e < -gin) return dVa(e, t);
  var n = Math.round(e);
  return uVa(n, t);
}

function Gze(e, t) {
  return t = t || 0, e.length >= 7 + t && (e.charCodeAt(t) | 32) === 103 && (e.charCodeAt(t + 1) | 32) === 101 && (e.charCodeAt(t + 2) | 32) === 110 && (e.charCodeAt(t + 3) | 32) === 101 && (e.charCodeAt(t + 4) | 32) === 114 && (e.charCodeAt(t + 5) | 32) === 97 && (e.charCodeAt(t + 6) | 32) === 108;
}

var yin = [["Sun", "Sunday"], ["Mon", "Monday"], ["Tue", "Tuesday"], ["Wed", "Wednesday"], ["Thu", "Thursday"], ["Fri", "Friday"], ["Sat", "Saturday"]],
  Oit = [["J", "Jan", "January"], ["F", "Feb", "February"], ["M", "Mar", "March"], ["A", "Apr", "April"], ["M", "May", "May"], ["J", "Jun", "June"], ["J", "Jul", "July"], ["A", "Aug", "August"], ["S", "Sep", "September"], ["O", "Oct", "October"], ["N", "Nov", "November"], ["D", "Dec", "December"]];

function hVa(e) {
  return e || (e = {}), e[0] = "General", e[1] = "0", e[2] = "0.00", e[3] = "#,##0", e[4] = "#,##0.00", e[9] = "0%", e[10] = "0.00%", e[11] = "0.00E+00", e[12] = "# ?/?", e[13] = "# ??/??", e[14] = "m/d/yy", e[15] = "d-mmm-yy", e[16] = "d-mmm", e[17] = "mmm-yy", e[18] = "h:mm AM/PM", e[19] = "h:mm:ss AM/PM", e[20] = "h:mm", e[21] = "h:mm:ss", e[22] = "m/d/yy h:mm", e[37] = "#,##0 ;(#,##0)", e[38] = "#,##0 ;[Red](#,##0)", e[39] = "#,##0.00;(#,##0.00)", e[40] = "#,##0.00;[Red](#,##0.00)", e[45] = "mm:ss", e[46] = "[h]:mm:ss", e[47] = "mmss.0", e[48] = "##0.0E+0", e[49] = "@", e[56] = '"上午/下午 "hh"時"mm"分"ss"秒 "', e;
}

var Cs = {
    0: "General",
    1: "0",
    2: "0.00",
    3: "#,##0",
    4: "#,##0.00",
    9: "0%",
    10: "0.00%",
    11: "0.00E+00",
    12: "# ?/?",
    13: "# ??/??",
    14: "m/d/yy",
    15: "d-mmm-yy",
    16: "d-mmm",
    17: "mmm-yy",
    18: "h:mm AM/PM",
    19: "h:mm:ss AM/PM",
    20: "h:mm",
    21: "h:mm:ss",
    22: "m/d/yy h:mm",
    37: "#,##0 ;(#,##0)",
    38: "#,##0 ;[Red](#,##0)",
    39: "#,##0.00;(#,##0.00)",
    40: "#,##0.00;[Red](#,##0.00)",
    45: "mm:ss",
    46: "[h]:mm:ss",
    47: "mmss.0",
    48: "##0.0E+0",
    49: "@",
    56: '"上午/下午 "hh"時"mm"分"ss"秒 "'
  },
  bin = {
    5: 37,
    6: 38,
    7: 39,
    8: 40,
    23: 0,
    24: 0,
    25: 0,
    26: 0,
    27: 14,
    28: 14,
    29: 14,
    30: 14,
    31: 14,
    50: 14,
    51: 14,
    52: 14,
    53: 14,
    54: 14,
    55: 14,
    56: 14,
    57: 14,
    58: 14,
    59: 1,
    60: 2,
    61: 3,
    62: 4,
    67: 9,
    68: 10,
    69: 12,
    70: 13,
    71: 14,
    72: 14,
    73: 15,
    74: 16,
    75: 17,
    76: 20,
    77: 21,
    78: 22,
    79: 45,
    80: 46,
    81: 47,
    82: 0
  },
  pVa = {
    5: '"$"#,##0_);\\("$"#,##0\\)',
    63: '"$"#,##0_);\\("$"#,##0\\)',
    6: '"$"#,##0_);[Red]\\("$"#,##0\\)',
    64: '"$"#,##0_);[Red]\\("$"#,##0\\)',
    7: '"$"#,##0.00_);\\("$"#,##0.00\\)',
    65: '"$"#,##0.00_);\\("$"#,##0.00\\)',
    8: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
    66: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
    41: '_(* #,##0_);_(* \\(#,##0\\);_(* "-"_);_(@_)',
    42: '_("$"* #,##0_);_("$"* \\(#,##0\\);_("$"* "-"_);_(@_)',
    43: '_(* #,##0.00_);_(* \\(#,##0.00\\);_(* "-"??_);_(@_)',
    44: '_("$"* #,##0.00_);_("$"* \\(#,##0.00\\);_("$"* "-"??_);_(@_)'
  };

function Vze(e, t, n) {
  for (var r = e < 0 ? -1 : 1, a = e * r, i = 0, o = 1, s = 0, l = 1, d = 0, u = 0, h = Math.floor(a); d < t && (h = Math.floor(a), s = h * o + i, u = h * d + l, !(a - h < 5e-8));) a = 1 / (a - h), i = o, o = s, l = d, d = u;
  if (u > t && (d > t ? (u = l, s = i) : (u = d, s = o)), !n) return [0, r * s, u];
  var p = Math.floor(r * s / u);
  return [p, r * s - p * u, u];
}

function mVa(e) {
  var t = e.toPrecision(16);
  if (t.indexOf("e") > -1) {
    var n = t.slice(0, t.indexOf("e"));
    return n = n.indexOf(".") > -1 ? n.slice(0, n.slice(0, 2) == "0." ? 17 : 16) : n.slice(0, 15) + Gd("0", n.length - 15), n + t.slice(t.indexOf("e"));
  }
  var r = t.indexOf(".") > -1 ? t.slice(0, t.slice(0, 2) == "0." ? 17 : 16) : t.slice(0, 15) + Gd("0", t.length - 15);
  return Number(r);
}

function E6(e, t, n) {
  if (e > 2958465 || e < 0) return null;
  e = mVa(e);
  var r = e | 0,
    a = Math.floor(86400 * (e - r)),
    i = 0,
    o = [],
    s = {
      D: r,
      T: a,
      u: 86400 * (e - r) - a,
      y: 0,
      m: 0,
      d: 0,
      H: 0,
      M: 0,
      S: 0,
      q: 0
    };
  if (Math.abs(s.u) < 1e-6 && (s.u = 0), t && t.date1904 && (r += 1462), s.u > .9999 && (s.u = 0, ++a == 86400 && (s.T = a = 0, ++r, ++s.D)), r === 60) o = n ? [1317, 10, 29] : [1900, 2, 29], i = 3;else if (r === 0) o = n ? [1317, 8, 29] : [1900, 1, 0], i = 6;else {
    r > 60 && --r;
    var l = new Date(1900, 0, 1);
    l.setDate(l.getDate() + r - 1), o = [l.getFullYear(), l.getMonth() + 1, l.getDate()], i = l.getDay(), r < 60 && (i = (i + 6) % 7), n && (i = bVa(l, o));
  }
  return s.y = o[0], s.m = o[1], s.d = o[2], s.S = a % 60, a = Math.floor(a / 60), s.M = a % 60, a = Math.floor(a / 60), s.H = a, s.q = i, s;
}

function vOt(e) {
  return e.indexOf(".") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)$/, "$1");
}

function fVa(e) {
  return e.indexOf("E") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)[Ee]/, "$1E").replace(/(E[+-])(\d)$/, "$10$2");
}

function gVa(e) {
  var t = e < 0 ? 12 : 11,
    n = vOt(e.toFixed(12));
  return n.length <= t || (n = e.toPrecision(10), n.length <= t) ? n : e.toExponential(5);
}

function yVa(e) {
  var t = vOt(e.toFixed(11));
  return t.length > (e < 0 ? 12 : 11) || t === "0" || t === "-0" ? e.toPrecision(6) : t;
}

function fke(e) {
  if (!isFinite(e)) return isNaN(e) ? "#NUM!" : "#DIV/0!";
  var t = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E),
    n;
  return t >= -4 && t <= -1 ? n = e.toPrecision(10 + t) : Math.abs(t) <= 9 ? n = gVa(e) : t === 10 ? n = e.toFixed(10).substr(0, 12) : n = yVa(e), vOt(fVa(n.toUpperCase()));
}

function vJ(e, t) {
  switch (typeof e) {
    case "string":
      return e;
    case "boolean":
      return e ? "TRUE" : "FALSE";
    case "number":
      return (e | 0) === e ? e.toString(10) : fke(e);
    case "undefined":
      return "";
    case "object":
      if (e == null) return "";
      if (e instanceof Date) return Qk(14, bg(e, t && t.date1904), t);
  }
  throw new Error("unsupported value in General format: " + e);
}

function bVa(e, t) {
  t[0] -= 581;
  var n = e.getDay();
  return e < 60 && (n = (n + 6) % 7), n;
}

function vVa(e, t, n, r) {
  var a = "",
    i = 0,
    o = 0,
    s = n.y,
    l,
    d = 0;
  switch (e) {
    case 98:
      s = n.y + 543;
    case 121:
      switch (t.length) {
        case 1:
        case 2:
          l = s % 100, d = 2;
          break;
        default:
          l = s % 1e4, d = 4;
          break;
      }
      break;
    case 109:
      switch (t.length) {
        case 1:
        case 2:
          l = n.m, d = t.length;
          break;
        case 3:
          return Oit[n.m - 1][1];
        case 5:
          return Oit[n.m - 1][0];
        default:
          return Oit[n.m - 1][2];
      }
      break;
    case 100:
      switch (t.length) {
        case 1:
        case 2:
          l = n.d, d = t.length;
          break;
        case 3:
          return yin[n.q][0];
        default:
          return yin[n.q][1];
      }
      break;
    case 104:
      switch (t.length) {
        case 1:
        case 2:
          l = 1 + (n.H + 11) % 12, d = t.length;
          break;
        default:
          throw "bad hour format: " + t;
      }
      break;
    case 72:
      switch (t.length) {
        case 1:
        case 2:
          l = n.H, d = t.length;
          break;
        default:
          throw "bad hour format: " + t;
      }
      break;
    case 77:
      switch (t.length) {
        case 1:
        case 2:
          l = n.M, d = t.length;
          break;
        default:
          throw "bad minute format: " + t;
      }
      break;
    case 115:
      if (t != "s" && t != "ss" && t != ".0" && t != ".00" && t != ".000") throw "bad second format: " + t;
      return n.u === 0 && (t == "s" || t == "ss") ? gE(n.S, t.length) : (r >= 2 ? o = r === 3 ? 1e3 : 100 : o = r === 1 ? 10 : 1, i = Math.round(o * (n.S + n.u)), i >= 60 * o && (i = 0), t === "s" ? i === 0 ? "0" : "" + i / o : (a = gE(i, 2 + r), t === "ss" ? a.substr(0, 2) : "." + a.substr(2, t.length - 1)));
    case 90:
      switch (t) {
        case "[h]":
        case "[hh]":
          l = n.D * 24 + n.H;
          break;
        case "[m]":
        case "[mm]":
          l = (n.D * 24 + n.H) * 60 + n.M;
          break;
        case "[s]":
        case "[ss]":
          l = ((n.D * 24 + n.H) * 60 + n.M) * 60 + (r == 0 ? Math.round(n.S + n.u) : n.S);
          break;
        default:
          throw "bad abstime format: " + t;
      }
      d = t.length === 3 ? 1 : 2;
      break;
    case 101:
      l = s, d = 1;
      break;
  }
  var u = d > 0 ? gE(l, d) : "";
  return u;
}

function E7(e) {
  var t = 3;
  if (e.length <= t) return e;
  for (var n = e.length % t, r = e.substr(0, n); n != e.length; n += t) r += (r.length > 0 ? "," : "") + e.substr(n, t);
  return r;
}

var pnr = /%/g;

function wVa(e, t, n) {
  var r = t.replace(pnr, ""),
    a = t.length - r.length;
  return sj(e, r, n * Math.pow(10, 2 * a)) + Gd("%", a);
}

function xVa(e, t, n) {
  for (var r = t.length - 1; t.charCodeAt(r - 1) === 44;) --r;
  return sj(e, t.substr(0, r), n / Math.pow(10, 3 * (t.length - r)));
}

function mnr(e, t) {
  var n,
    r = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0) return "0.0E+0";
    if (t < 0) return "-" + mnr(e, -t);
    var a = e.indexOf(".");
    a === -1 && (a = e.indexOf("E"));
    var i = Math.floor(Math.log(t) * Math.LOG10E) % a;
    if (i < 0 && (i += a), n = (t / Math.pow(10, i)).toPrecision(r + 1 + (a + i) % a), n.indexOf("e") === -1) {
      var o = Math.floor(Math.log(t) * Math.LOG10E);
      for (n.indexOf(".") === -1 ? n = n.charAt(0) + "." + n.substr(1) + "E+" + (o - n.length + i) : n += "E+" + (o - i); n.substr(0, 2) === "0.";) n = n.charAt(0) + n.substr(2, a) + "." + n.substr(2 + a), n = n.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.");
      n = n.replace(/\+-/, "-");
    }
    n = n.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function (s, l, d, u) {
      return l + d + u.substr(0, (a + i) % a) + "." + u.substr(i) + "E";
    });
  } else n = t.toExponential(r);
  return e.match(/E\+00$/) && n.match(/e[+-]\d$/) && (n = n.substr(0, n.length - 1) + "0" + n.charAt(n.length - 1)), e.match(/E\-/) && n.match(/e\+/) && (n = n.replace(/e\+/, "e")), n.replace("e", "E");
}

var fnr = /# (\?+)( ?)\/( ?)(\d+)/;

function _Va(e, t, n) {
  var r = parseInt(e[4], 10),
    a = Math.round(t * r),
    i = Math.floor(a / r),
    o = a - i * r,
    s = r;
  return n + (i === 0 ? "" : "" + i) + " " + (o === 0 ? Gd(" ", e[1].length + 1 + e[4].length) : bOt(o, e[1].length) + e[2] + "/" + e[3] + gE(s, e[4].length));
}

function kVa(e, t, n) {
  return n + (t === 0 ? "" : "" + t) + Gd(" ", e[1].length + 2 + e[4].length);
}

var gnr = /^#*0*\.([0#]+)/,
  ynr = /\)[^)]*[0#]/,
  bnr = /\(###\) ###\\?-####/;

function g2(e) {
  for (var t = "", n, r = 0; r != e.length; ++r) switch (n = e.charCodeAt(r)) {
    case 35:
      break;
    case 63:
      t += " ";
      break;
    case 48:
      t += "0";
      break;
    default:
      t += String.fromCharCode(n);
  }
  return t;
}

function vin(e, t) {
  var n = Math.pow(10, t);
  return "" + Math.round(e * n) / n;
}

function win(e, t) {
  var n = e - Math.floor(e),
    r = Math.pow(10, t);
  return t < ("" + Math.round(n * r)).length ? 0 : Math.round(n * r);
}

function AVa(e, t) {
  return t < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, t))).length ? 1 : 0;
}

function SVa(e) {
  return e < 2147483647 && e > -2147483648 ? "" + (e >= 0 ? e | 0 : e - 1 | 0) : "" + Math.floor(e);
}

function m4(e, t, n) {
  if (e.charCodeAt(0) === 40 && !t.match(ynr)) {
    var r = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return n >= 0 ? m4("n", r, n) : "(" + m4("n", r, -n) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44) return xVa(e, t, n);
  if (t.indexOf("%") !== -1) return wVa(e, t, n);
  if (t.indexOf("E") !== -1) return mnr(t, n);
  if (t.charCodeAt(0) === 36) return "$" + m4(e, t.substr(t.charAt(1) == " " ? 2 : 1), n);
  var a,
    i,
    o,
    s,
    l = Math.abs(n),
    d = n < 0 ? "-" : "";
  if (t.match(/^00+$/)) return d + wte(l, t.length);
  if (t.match(/^[#?]+$/)) return a = wte(n, 0), a === "0" && (a = ""), a.length > t.length ? a : g2(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(fnr)) return _Va(i, l, d);
  if (t.match(/^#+0+$/)) return d + wte(l, t.length - t.indexOf("0"));
  if (i = t.match(gnr)) return a = vin(n, i[1].length).replace(/^([^\.]+)$/, "$1." + g2(i[1])).replace(/\.$/, "." + g2(i[1])).replace(/\.(\d*)$/, function (f, y) {
    return "." + y + Gd("0", g2(i[1]).length - y.length);
  }), t.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), i = t.match(/^(0*)\.(#*)$/)) return d + vin(l, i[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = t.match(/^#{1,3},##0(\.?)$/)) return d + E7(wte(l, 0));
  if (i = t.match(/^#,##0\.([#0]*0)$/)) return n < 0 ? "-" + m4(e, t, -n) : E7("" + (Math.floor(n) + AVa(n, i[1].length))) + "." + gE(win(n, i[1].length), i[1].length);
  if (i = t.match(/^#,#*,#0/)) return m4(e, t.replace(/^#,#*,/, ""), n);
  if (i = t.match(/^([0#]+)(\\?-([0#]+))+$/)) return a = Gie(m4(e, t.replace(/[\\-]/g, ""), n)), o = 0, Gie(Gie(t.replace(/\\/g, "")).replace(/[0#]/g, function (f) {
    return o < a.length ? a.charAt(o++) : f === "0" ? "0" : "";
  }));
  if (t.match(bnr)) return a = m4(e, "##########", n), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var u = "";
  if (i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)) return o = Math.min(i[4].length, 7), s = Vze(l, Math.pow(10, o) - 1, !1), a = "" + d, u = sj("n", i[1], s[1]), u.charAt(u.length - 1) == " " && (u = u.substr(0, u.length - 1) + "0"), a += u + i[2] + "/" + i[3], u = $ze(s[2], o), u.length < i[4].length && (u = g2(i[4].substr(i[4].length - u.length)) + u), a += u, a;
  if (i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)) return o = Math.min(Math.max(i[1].length, i[4].length), 7), s = Vze(l, Math.pow(10, o) - 1, !0), d + (s[0] || (s[1] ? "" : "0")) + " " + (s[1] ? bOt(s[1], o) + i[2] + "/" + i[3] + $ze(s[2], o) : Gd(" ", 2 * o + 1 + i[2].length + i[3].length));
  if (i = t.match(/^[#0?]+$/)) return a = wte(n, 0), t.length <= a.length ? a : g2(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(/^([#0?]+)\.([#0]+)$/)) {
    a = "" + n.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), o = a.indexOf(".");
    var h = t.indexOf(".") - o,
      p = t.length - a.length - h;
    return g2(t.substr(0, h) + a + t.substr(t.length - p));
  }
  if (i = t.match(/^00,000\.([#0]*0)$/)) return o = win(n, i[1].length), n < 0 ? "-" + m4(e, t, -n) : E7(SVa(n)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function (f) {
    return "00," + (f.length < 3 ? gE(0, 3 - f.length) : "") + f;
  }) + "." + gE(o, i[1].length);
  switch (t) {
    case "###,##0.00":
      return m4(e, "#,##0.00", n);
    case "###,###":
    case "##,###":
    case "#,###":
      var m = E7(wte(l, 0));
      return m !== "0" ? d + m : "";
    case "###,###.00":
      return m4(e, "###,##0.00", n).replace(/^0\./, ".");
    case "#,###.00":
      return m4(e, "#,##0.00", n).replace(/^0\./, ".");
  }
  throw new Error("unsupported format |" + t + "|");
}

function IVa(e, t, n) {
  for (var r = t.length - 1; t.charCodeAt(r - 1) === 44;) --r;
  return sj(e, t.substr(0, r), n / Math.pow(10, 3 * (t.length - r)));
}

function CVa(e, t, n) {
  var r = t.replace(pnr, ""),
    a = t.length - r.length;
  return sj(e, r, n * Math.pow(10, 2 * a)) + Gd("%", a);
}

function vnr(e, t) {
  var n,
    r = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0) return "0.0E+0";
    if (t < 0) return "-" + vnr(e, -t);
    var a = e.indexOf(".");
    a === -1 && (a = e.indexOf("E"));
    var i = Math.floor(Math.log(t) * Math.LOG10E) % a;
    if (i < 0 && (i += a), n = (t / Math.pow(10, i)).toPrecision(r + 1 + (a + i) % a), !n.match(/[Ee]/)) {
      var o = Math.floor(Math.log(t) * Math.LOG10E);
      n.indexOf(".") === -1 ? n = n.charAt(0) + "." + n.substr(1) + "E+" + (o - n.length + i) : n += "E+" + (o - i), n = n.replace(/\+-/, "-");
    }
    n = n.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function (s, l, d, u) {
      return l + d + u.substr(0, (a + i) % a) + "." + u.substr(i) + "E";
    });
  } else n = t.toExponential(r);
  return e.match(/E\+00$/) && n.match(/e[+-]\d$/) && (n = n.substr(0, n.length - 1) + "0" + n.charAt(n.length - 1)), e.match(/E\-/) && n.match(/e\+/) && (n = n.replace(/e\+/, "e")), n.replace("e", "E");
}

function T8(e, t, n) {
  if (e.charCodeAt(0) === 40 && !t.match(ynr)) {
    var r = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return n >= 0 ? T8("n", r, n) : "(" + T8("n", r, -n) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44) return IVa(e, t, n);
  if (t.indexOf("%") !== -1) return CVa(e, t, n);
  if (t.indexOf("E") !== -1) return vnr(t, n);
  if (t.charCodeAt(0) === 36) return "$" + T8(e, t.substr(t.charAt(1) == " " ? 2 : 1), n);
  var a,
    i,
    o,
    s,
    l = Math.abs(n),
    d = n < 0 ? "-" : "";
  if (t.match(/^00+$/)) return d + gE(l, t.length);
  if (t.match(/^[#?]+$/)) return a = "" + n, n === 0 && (a = ""), a.length > t.length ? a : g2(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(fnr)) return kVa(i, l, d);
  if (t.match(/^#+0+$/)) return d + gE(l, t.length - t.indexOf("0"));
  if (i = t.match(gnr)) return a = ("" + n).replace(/^([^\.]+)$/, "$1." + g2(i[1])).replace(/\.$/, "." + g2(i[1])), a = a.replace(/\.(\d*)$/, function (f, y) {
    return "." + y + Gd("0", g2(i[1]).length - y.length);
  }), t.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), i = t.match(/^(0*)\.(#*)$/)) return d + ("" + l).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = t.match(/^#{1,3},##0(\.?)$/)) return d + E7("" + l);
  if (i = t.match(/^#,##0\.([#0]*0)$/)) return n < 0 ? "-" + T8(e, t, -n) : E7("" + n) + "." + Gd("0", i[1].length);
  if (i = t.match(/^#,#*,#0/)) return T8(e, t.replace(/^#,#*,/, ""), n);
  if (i = t.match(/^([0#]+)(\\?-([0#]+))+$/)) return a = Gie(T8(e, t.replace(/[\\-]/g, ""), n)), o = 0, Gie(Gie(t.replace(/\\/g, "")).replace(/[0#]/g, function (f) {
    return o < a.length ? a.charAt(o++) : f === "0" ? "0" : "";
  }));
  if (t.match(bnr)) return a = T8(e, "##########", n), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var u = "";
  if (i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)) return o = Math.min(i[4].length, 7), s = Vze(l, Math.pow(10, o) - 1, !1), a = "" + d, u = sj("n", i[1], s[1]), u.charAt(u.length - 1) == " " && (u = u.substr(0, u.length - 1) + "0"), a += u + i[2] + "/" + i[3], u = $ze(s[2], o), u.length < i[4].length && (u = g2(i[4].substr(i[4].length - u.length)) + u), a += u, a;
  if (i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)) return o = Math.min(Math.max(i[1].length, i[4].length), 7), s = Vze(l, Math.pow(10, o) - 1, !0), d + (s[0] || (s[1] ? "" : "0")) + " " + (s[1] ? bOt(s[1], o) + i[2] + "/" + i[3] + $ze(s[2], o) : Gd(" ", 2 * o + 1 + i[2].length + i[3].length));
  if (i = t.match(/^[#0?]+$/)) return a = "" + n, t.length <= a.length ? a : g2(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(/^([#0]+)\.([#0]+)$/)) {
    a = "" + n.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), o = a.indexOf(".");
    var h = t.indexOf(".") - o,
      p = t.length - a.length - h;
    return g2(t.substr(0, h) + a + t.substr(t.length - p));
  }
  if (i = t.match(/^00,000\.([#0]*0)$/)) return n < 0 ? "-" + T8(e, t, -n) : E7("" + n).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function (f) {
    return "00," + (f.length < 3 ? gE(0, 3 - f.length) : "") + f;
  }) + "." + gE(0, i[1].length);
  switch (t) {
    case "###,###":
    case "##,###":
    case "#,###":
      var m = E7("" + l);
      return m !== "0" ? d + m : "";
    default:
      if (t.match(/\.[0#?]*$/)) return T8(e, t.slice(0, t.lastIndexOf(".")), n) + g2(t.slice(t.lastIndexOf(".")));
  }
  throw new Error("unsupported format |" + t + "|");
}

function sj(e, t, n) {
  return (n | 0) === n ? T8(e, t, n) : m4(e, t, n);
}

function EVa(e) {
  for (var t = [], n = !1, r = 0, a = 0; r < e.length; ++r) switch (e.charCodeAt(r)) {
    case 34:
      n = !n;
      break;
    case 95:
    case 42:
    case 92:
      ++r;
      break;
    case 59:
      t[t.length] = e.substr(a, r - a), a = r + 1;
  }
  if (t[t.length] = e.substr(a), n === !0) throw new Error("Format |" + e + "| unterminated string ");
  return t;
}

var wnr = /\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;

function k3(e) {
  for (var t = 0, n = "", r = ""; t < e.length;) switch (n = e.charAt(t)) {
    case "G":
      Gze(e, t) && (t += 6), t++;
      break;
    case '"':
      for (; e.charCodeAt(++t) !== 34 && t < e.length;);
      ++t;
      break;
    case "\\":
      t += 2;
      break;
    case "_":
      t += 2;
      break;
    case "@":
      ++t;
      break;
    case "B":
    case "b":
      if (e.charAt(t + 1) === "1" || e.charAt(t + 1) === "2") return !0;
    case "M":
    case "D":
    case "Y":
    case "H":
    case "S":
    case "E":
    case "m":
    case "d":
    case "y":
    case "h":
    case "s":
    case "e":
    case "g":
      return !0;
    case "A":
    case "a":
    case "上":
      if (e.substr(t, 3).toUpperCase() === "A/P" || e.substr(t, 5).toUpperCase() === "AM/PM" || e.substr(t, 5).toUpperCase() === "上午/下午") return !0;
      ++t;
      break;
    case "[":
      for (r = n; e.charAt(t++) !== "]" && t < e.length;) r += e.charAt(t);
      if (r.match(wnr)) return !0;
      break;
    case ".":
    case "0":
    case "#":
      for (; t < e.length && ("0#?.,E+-%".indexOf(n = e.charAt(++t)) > -1 || n == "\\" && e.charAt(t + 1) == "-" && "0#".indexOf(e.charAt(t + 2)) > -1););
      break;
    case "?":
      for (; e.charAt(++t) === n;);
      break;
    case "*":
      ++t, (e.charAt(t) == " " || e.charAt(t) == "*") && ++t;
      break;
    case "(":
    case ")":
      ++t;
      break;
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      for (; t < e.length && "0123456789".indexOf(e.charAt(++t)) > -1;);
      break;
    case " ":
      ++t;
      break;
    default:
      ++t;
      break;
  }
  return !1;
}

function TVa(e, t, n, r) {
  for (var a = [], i = "", o = 0, s = "", l = "t", d, u, h, p = "H"; o < e.length;) switch (s = e.charAt(o)) {
    case "G":
      if (!Gze(e, o)) throw new Error("unrecognized character " + s + " in " + e);
      a[a.length] = {
        t: "G",
        v: "General"
      }, o += 7;
      break;
    case '"':
      for (i = ""; (h = e.charCodeAt(++o)) !== 34 && o < e.length;) i += String.fromCharCode(h);
      a[a.length] = {
        t: "t",
        v: i
      }, ++o;
      break;
    case "\\":
      var m = e.charAt(++o),
        f = m === "(" || m === ")" ? m : "t";
      a[a.length] = {
        t: f,
        v: m
      }, ++o;
      break;
    case "_":
      a[a.length] = {
        t: "t",
        v: " "
      }, o += 2;
      break;
    case "@":
      a[a.length] = {
        t: "T",
        v: t
      }, ++o;
      break;
    case "B":
    case "b":
      if (e.charAt(o + 1) === "1" || e.charAt(o + 1) === "2") {
        if (d == null && (d = E6(t, n, e.charAt(o + 1) === "2"), d == null)) return "";
        a[a.length] = {
          t: "X",
          v: e.substr(o, 2)
        }, l = s, o += 2;
        break;
      }
    case "M":
    case "D":
    case "Y":
    case "H":
    case "S":
    case "E":
      s = s.toLowerCase();
    case "m":
    case "d":
    case "y":
    case "h":
    case "s":
    case "e":
    case "g":
      if (t < 0 || d == null && (d = E6(t, n), d == null)) return "";
      for (i = s; ++o < e.length && e.charAt(o).toLowerCase() === s;) i += s;
      s === "m" && l.toLowerCase() === "h" && (s = "M"), s === "h" && (s = p), a[a.length] = {
        t: s,
        v: i
      }, l = s;
      break;
    case "A":
    case "a":
    case "上":
      var y = {
        t: s,
        v: s
      };
      if (d == null && (d = E6(t, n)), e.substr(o, 3).toUpperCase() === "A/P" ? (d != null && (y.v = d.H >= 12 ? e.charAt(o + 2) : s), y.t = "T", p = "h", o += 3) : e.substr(o, 5).toUpperCase() === "AM/PM" ? (d != null && (y.v = d.H >= 12 ? "PM" : "AM"), y.t = "T", o += 5, p = "h") : e.substr(o, 5).toUpperCase() === "上午/下午" ? (d != null && (y.v = d.H >= 12 ? "下午" : "上午"), y.t = "T", o += 5, p = "h") : (y.t = "t", ++o), d == null && y.t === "T") return "";
      a[a.length] = y, l = s;
      break;
    case "[":
      for (i = s; e.charAt(o++) !== "]" && o < e.length;) i += e.charAt(o);
      if (i.slice(-1) !== "]") throw 'unterminated "[" block: |' + i + "|";
      if (i.match(wnr)) {
        if (d == null && (d = E6(t, n), d == null)) return "";
        a[a.length] = {
          t: "Z",
          v: i.toLowerCase()
        }, l = i.charAt(1);
      } else i.indexOf("$") > -1 && (i = (i.match(/\$([^-\[\]]*)/) || [])[1] || "$", k3(e) || (a[a.length] = {
        t: "t",
        v: i
      }));
      break;
    case ".":
      if (d != null) {
        for (i = s; ++o < e.length && (s = e.charAt(o)) === "0";) i += s;
        a[a.length] = {
          t: "s",
          v: i
        };
        break;
      }
    case "0":
    case "#":
      for (i = s; ++o < e.length && "0#?.,E+-%".indexOf(s = e.charAt(o)) > -1;) i += s;
      a[a.length] = {
        t: "n",
        v: i
      };
      break;
    case "?":
      for (i = s; e.charAt(++o) === s;) i += s;
      a[a.length] = {
        t: s,
        v: i
      }, l = s;
      break;
    case "*":
      ++o, (e.charAt(o) == " " || e.charAt(o) == "*") && ++o;
      break;
    case "(":
    case ")":
      a[a.length] = {
        t: r === 1 ? "t" : s,
        v: s
      }, ++o;
      break;
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      for (i = s; o < e.length && "0123456789".indexOf(e.charAt(++o)) > -1;) i += e.charAt(o);
      a[a.length] = {
        t: "D",
        v: i
      };
      break;
    case " ":
      a[a.length] = {
        t: s,
        v: s
      }, ++o;
      break;
    case "$":
      a[a.length] = {
        t: "t",
        v: "$"
      }, ++o;
      break;
    default:
      if (",$-+/():!^&'~{}<>=€acfijklopqrtuvwxzP".indexOf(s) === -1) throw new Error("unrecognized character " + s + " in " + e);
      a[a.length] = {
        t: "t",
        v: s
      }, ++o;
      break;
  }
  var b = 0,
    v = 0,
    _;
  for (o = a.length - 1, l = "t"; o >= 0; --o) switch (a[o].t) {
    case "h":
    case "H":
      a[o].t = p, l = "h", b < 1 && (b = 1);
      break;
    case "s":
      (_ = a[o].v.match(/\.0+$/)) && (v = Math.max(v, _[0].length - 1), b = 4), b < 3 && (b = 3);
    case "d":
    case "y":
    case "e":
      l = a[o].t;
      break;
    case "M":
      l = a[o].t, b < 2 && (b = 2);
      break;
    case "m":
      l === "s" && (a[o].t = "M", b < 2 && (b = 2));
      break;
    case "X":
      break;
    case "Z":
      b < 1 && a[o].v.match(/[Hh]/) && (b = 1), b < 2 && a[o].v.match(/[Mm]/) && (b = 2), b < 3 && a[o].v.match(/[Ss]/) && (b = 3);
  }
  var w;
  switch (b) {
    case 0:
      break;
    case 1:
    case 2:
    case 3:
      d.u >= .5 && (d.u = 0, ++d.S), d.S >= 60 && (d.S = 0, ++d.M), d.M >= 60 && (d.M = 0, ++d.H), d.H >= 24 && (d.H = 0, ++d.D, w = E6(d.D), w.u = d.u, w.S = d.S, w.M = d.M, w.H = d.H, d = w);
      break;
    case 4:
      switch (v) {
        case 1:
          d.u = Math.round(d.u * 10) / 10;
          break;
        case 2:
          d.u = Math.round(d.u * 100) / 100;
          break;
        case 3:
          d.u = Math.round(d.u * 1e3) / 1e3;
          break;
      }
      d.u >= 1 && (d.u = 0, ++d.S), d.S >= 60 && (d.S = 0, ++d.M), d.M >= 60 && (d.M = 0, ++d.H), d.H >= 24 && (d.H = 0, ++d.D, w = E6(d.D), w.u = d.u, w.S = d.S, w.M = d.M, w.H = d.H, d = w);
      break;
  }
  var k = "",
    A;
  for (o = 0; o < a.length; ++o) switch (a[o].t) {
    case "t":
    case "T":
    case " ":
    case "D":
      break;
    case "X":
      a[o].v = "", a[o].t = ";";
      break;
    case "d":
    case "m":
    case "y":
    case "h":
    case "H":
    case "M":
    case "s":
    case "e":
    case "b":
    case "Z":
      a[o].v = vVa(a[o].t.charCodeAt(0), a[o].v, d, v), a[o].t = "t";
      break;
    case "n":
    case "?":
      for (A = o + 1; a[A] != null && ((s = a[A].t) === "?" || s === "D" || (s === " " || s === "t") && a[A + 1] != null && (a[A + 1].t === "?" || a[A + 1].t === "t" && a[A + 1].v === "/") || a[o].t === "(" && (s === " " || s === "n" || s === ")") || s === "t" && (a[A].v === "/" || a[A].v === " " && a[A + 1] != null && a[A + 1].t == "?"));) a[o].v += a[A].v, a[A] = {
        v: "",
        t: ";"
      }, ++A;
      k += a[o].v, o = A - 1;
      break;
    case "G":
      a[o].t = "t", a[o].v = vJ(t, n);
      break;
  }
  var S = "",
    C,
    I;
  if (k.length > 0) {
    k.charCodeAt(0) == 40 ? (C = t < 0 && k.charCodeAt(0) === 45 ? -t : t, I = sj("n", k, C)) : (C = t < 0 && r > 1 ? -t : t, I = sj("n", k, C), C < 0 && a[0] && a[0].t == "t" && (I = I.substr(1), a[0].v = "-" + a[0].v)), A = I.length - 1;
    var E = a.length;
    for (o = 0; o < a.length; ++o) if (a[o] != null && a[o].t != "t" && a[o].v.indexOf(".") > -1) {
      E = o;
      break;
    }
    var M = a.length;
    if (E === a.length && I.indexOf("E") === -1) {
      for (o = a.length - 1; o >= 0; --o) a[o] == null || "n?".indexOf(a[o].t) === -1 || (A >= a[o].v.length - 1 ? (A -= a[o].v.length, a[o].v = I.substr(A + 1, a[o].v.length)) : A < 0 ? a[o].v = "" : (a[o].v = I.substr(0, A + 1), A = -1), a[o].t = "t", M = o);
      A >= 0 && M < a.length && (a[M].v = I.substr(0, A + 1) + a[M].v);
    } else if (E !== a.length && I.indexOf("E") === -1) {
      for (A = I.indexOf(".") - 1, o = E; o >= 0; --o) if (!(a[o] == null || "n?".indexOf(a[o].t) === -1)) {
        for (u = a[o].v.indexOf(".") > -1 && o === E ? a[o].v.indexOf(".") - 1 : a[o].v.length - 1, S = a[o].v.substr(u + 1); u >= 0; --u) A >= 0 && (a[o].v.charAt(u) === "0" || a[o].v.charAt(u) === "#") && (S = I.charAt(A--) + S);
        a[o].v = S, a[o].t = "t", M = o;
      }
      for (A >= 0 && M < a.length && (a[M].v = I.substr(0, A + 1) + a[M].v), A = I.indexOf(".") + 1, o = E; o < a.length; ++o) if (!(a[o] == null || "n?(".indexOf(a[o].t) === -1 && o !== E)) {
        for (u = a[o].v.indexOf(".") > -1 && o === E ? a[o].v.indexOf(".") + 1 : 0, S = a[o].v.substr(0, u); u < a[o].v.length; ++u) A < I.length && (S += I.charAt(A++));
        a[o].v = S, a[o].t = "t", M = o;
      }
    }
  }
  for (o = 0; o < a.length; ++o) a[o] != null && "n?".indexOf(a[o].t) > -1 && (C = r > 1 && t < 0 && o > 0 && a[o - 1].v === "-" ? -t : t, a[o].v = sj(a[o].t, a[o].v, C), a[o].t = "t");
  var T = "";
  for (o = 0; o !== a.length; ++o) a[o] != null && (T += a[o].v);
  return T;
}

var xin = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;

function _in(e, t) {
  if (t == null) return !1;
  var n = parseFloat(t[2]);
  switch (t[1]) {
    case "=":
      if (e == n) return !0;
      break;
    case ">":
      if (e > n) return !0;
      break;
    case "<":
      if (e < n) return !0;
      break;
    case "<>":
      if (e != n) return !0;
      break;
    case ">=":
      if (e >= n) return !0;
      break;
    case "<=":
      if (e <= n) return !0;
      break;
  }
  return !1;
}

function MVa(e, t) {
  var n = EVa(e),
    r = n.length,
    a = n[r - 1].indexOf("@");
  if (r < 4 && a > -1 && --r, n.length > 4) throw new Error("cannot find right format for |" + n.join("|") + "|");
  if (typeof t != "number") return [4, n.length === 4 || a > -1 ? n[n.length - 1] : "@"];
  switch (typeof t == "number" && !isFinite(t) && (t = 0), n.length) {
    case 1:
      n = a > -1 ? ["General", "General", "General", n[0]] : [n[0], n[0], n[0], "@"];
      break;
    case 2:
      n = a > -1 ? [n[0], n[0], n[0], n[1]] : [n[0], n[1], n[0], "@"];
      break;
    case 3:
      n = a > -1 ? [n[0], n[1], n[0], n[2]] : [n[0], n[1], n[2], "@"];
      break;
  }
  var i = t > 0 ? n[0] : t < 0 ? n[1] : n[2];
  if (n[0].indexOf("[") === -1 && n[1].indexOf("[") === -1) return [r, i];
  if (n[0].match(/\[[=<>]/) != null || n[1].match(/\[[=<>]/) != null) {
    var o = n[0].match(xin),
      s = n[1].match(xin);
    return _in(t, o) ? [r, n[0]] : _in(t, s) ? [r, n[1]] : [r, n[o != null && s != null ? 2 : 1]];
  }
  return [r, i];
}

function Qk(e, t, n) {
  n == null && (n = {});
  var r = "";
  switch (typeof e) {
    case "string":
      e == "m/d/yy" && n.dateNF ? r = n.dateNF : r = e;
      break;
    case "number":
      e == 14 && n.dateNF ? r = n.dateNF : r = (n.table != null ? n.table : Cs)[e], r == null && (r = n.table && n.table[bin[e]] || Cs[bin[e]]), r == null && (r = pVa[e] || "General");
      break;
  }
  if (Gze(r, 0)) return vJ(t, n);
  t instanceof Date && (t = bg(t, n.date1904));
  var a = MVa(r, t);
  if (Gze(a[1])) return vJ(t, n);
  if (t === !0) t = "TRUE";else if (t === !1) t = "FALSE";else {
    if (t === "" || t == null) return "";
    if (isNaN(t) && a[1].indexOf("0") > -1) return "#NUM!";
    if (!isFinite(t) && a[1].indexOf("0") > -1) return "#DIV/0!";
  }
  return TVa(a[1], t, n, a[0]);
}

function wOt(e, t) {
  if (typeof t != "number") {
    t = +t || -1;
    for (var n = 0; n < 392; ++n) {
      if (Cs[n] == null) {
        t < 0 && (t = n);
        continue;
      }
      if (Cs[n] == e) {
        t = n;
        break;
      }
    }
    t < 0 && (t = 391);
  }
  return Cs[t] = e, t;
}

function vpe(e) {
  for (var t = 0; t != 392; ++t) e[t] !== void 0 && wOt(e[t], t);
}

function VZ() {
  Cs = hVa();
}

var xOt = {
    format: Qk,
    load: wOt,
    _table: Cs,
    load_table: vpe,
    parse_date_code: E6,
    is_date: k3,
    get_table: function () {
      return xOt._table = Cs;
    }
  },
  PVa = {
    5: '"$"#,##0_);\\("$"#,##0\\)',
    6: '"$"#,##0_);[Red]\\("$"#,##0\\)',
    7: '"$"#,##0.00_);\\("$"#,##0.00\\)',
    8: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
    23: "General",
    24: "General",
    25: "General",
    26: "General",
    27: "m/d/yy",
    28: "m/d/yy",
    29: "m/d/yy",
    30: "m/d/yy",
    31: "m/d/yy",
    32: "h:mm:ss",
    33: "h:mm:ss",
    34: "h:mm:ss",
    35: "h:mm:ss",
    36: "m/d/yy",
    41: '_(* #,##0_);_(* (#,##0);_(* "-"_);_(@_)',
    42: '_("$"* #,##0_);_("$"* (#,##0);_("$"* "-"_);_(@_)',
    43: '_(* #,##0.00_);_(* (#,##0.00);_(* "-"??_);_(@_)',
    44: '_("$"* #,##0.00_);_("$"* (#,##0.00);_("$"* "-"??_);_(@_)',
    50: "m/d/yy",
    51: "m/d/yy",
    52: "m/d/yy",
    53: "m/d/yy",
    54: "m/d/yy",
    55: "m/d/yy",
    56: "m/d/yy",
    57: "m/d/yy",
    58: "m/d/yy",
    59: "0",
    60: "0.00",
    61: "#,##0",
    62: "#,##0.00",
    63: '"$"#,##0_);\\("$"#,##0\\)',
    64: '"$"#,##0_);[Red]\\("$"#,##0\\)',
    65: '"$"#,##0.00_);\\("$"#,##0.00\\)',
    66: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
    67: "0%",
    68: "0.00%",
    69: "# ?/?",
    70: "# ??/??",
    71: "m/d/yy",
    72: "m/d/yy",
    73: "d-mmm-yy",
    74: "d-mmm",
    75: "mmm-yy",
    76: "h:mm",
    77: "h:mm:ss",
    78: "m/d/yy h:mm",
    79: "mm:ss",
    80: "[h]:mm:ss",
    81: "mmss.0"
  },
  Hze = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;

function RVa(e) {
  var t = typeof e == "number" ? Cs[e] : e;
  return t = t.replace(Hze, "(\\d+)"), Hze.lastIndex = 0, new RegExp("^" + t + "$");
}

function NVa(e, t, n) {
  var r = -1,
    a = -1,
    i = -1,
    o = -1,
    s = -1,
    l = -1;
  (t.match(Hze) || []).forEach(function (h, p) {
    var m = parseInt(n[p + 1], 10);
    switch (h.toLowerCase().charAt(0)) {
      case "y":
        r = m;
        break;
      case "d":
        i = m;
        break;
      case "h":
        o = m;
        break;
      case "s":
        l = m;
        break;
      case "m":
        o >= 0 ? s = m : a = m;
        break;
    }
  }), Hze.lastIndex = 0, l >= 0 && s == -1 && a >= 0 && (s = a, a = -1);
  var d = ("" + (r >= 0 ? r : new Date().getFullYear())).slice(-4) + "-" + ("00" + (a >= 1 ? a : 1)).slice(-2) + "-" + ("00" + (i >= 1 ? i : 1)).slice(-2);
  d.length == 7 && (d = "0" + d), d.length == 8 && (d = "20" + d);
  var u = ("00" + (o >= 0 ? o : 0)).slice(-2) + ":" + ("00" + (s >= 0 ? s : 0)).slice(-2) + ":" + ("00" + (l >= 0 ? l : 0)).slice(-2);
  return o == -1 && s == -1 && l == -1 ? d : r == -1 && a == -1 && i == -1 ? u : d + "T" + u;
}

var jVa = {
  "d.m": "d\\.m"
};

function Fz(e, t) {
  return wOt(jVa[e] || e, t);
}

