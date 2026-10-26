const Ivo = ({
    nodeId: e,
    fallbackProgress: t,
    isDark: n
  }) => {
    on();
    const r = E5e(e),
      a = r.status === "generating" ? r.progress : t;
    return c.jsxs("div", {
      className: "mb-2",
      children: [c.jsx("div", {
        className: "text-[10px] mb-1 text-zinc-500",
        children: x("正在生成图片...")
      }), c.jsx("div", {
        className: `w-full h-1.5 rounded-full overflow-hidden ${n ? "bg-zinc-800" : "bg-zinc-200"}`,
        children: c.jsx("div", {
          className: "h-full bg-blue-500 transition-all duration-300",
          style: {
            width: `${a}%`
          }
        })
      }), c.jsxs("div", {
        className: "text-[10px] text-zinc-500 mt-1",
        children: [a, x("% 完成")]
      })]
    });
  },
  Cvo = ["nano-banana", "nano-banana-2", "gemini-nano-banana-2.1", "gemini-nano-banana-2.1-fal", "gpt-image", "gpt-image-1.5", "gpt-image-2", "gpt-image-2.5-sunburst", "gpt-image-2.5-flare", "gpt-image-2.5-sunburst-fal", "gpt-image-2.5-flare-fal", "gpt-image-2-all", "flux-kontext", "z-image-official", "z-image-turbo-fal"],
  Evo = ({
    node: e,
    nodes: t,
    connections: n,
    isDark: r,
    updateNode: a,
    setNodes: i,
    setHistory: o,
    apiConfigs: s,
    globalApiKey: l,
    connectingSource: d,
    connectingTarget: u,
    connectingInputType: h,
    setConnectingSource: p,
    setConnectingTarget: m,
    setConnectingInputType: f,
    setConnections: y,
    setMousePos: b,
    canvasRef: v,
    view: _,
    getConnectedImageForInput: w,
    generate: k,
    generateId: A
  }) => {
    var q, ne, de, le, J, pe, ce, we, X, Z, re, fe, ye, ie, ae, be, Ee, xe;
    on();
    const S = e.type === "generate-character-image",
      C = S ? "生成角色图片" : "生成场景图片",
      E = o9(e.id) || !!((q = e.settings) != null && q.isGenerating),
      M = Ia.useRef(null);
    g.useEffect(() => {
      const he = M.current;
      if (!he) return;
      const ue = ge => {
        ge.stopPropagation(), ge.preventDefault(), he.scrollTop += ge.deltaY;
      };
      return he.addEventListener("wheel", ue, {
        passive: !1,
        capture: !0
      }), () => he.removeEventListener("wheel", ue, {
        capture: !0
      });
    }, []);
    const T = g.useMemo(() => {
        if (!n || !t) return [];
        const he = n.reduce((ke, ve) => {
            if (ve.to === e.id && (!ve.inputType || ve.inputType === "default")) {
              const Te = ve.to;
              ke.has(Te) || ke.set(Te, []), ke.get(Te).push(ve);
            }
            return ke;
          }, new Map()),
          ue = new Map(t.map(ke => [ke.id, ke])),
          ge = [],
          _e = he.get(e.id) || [];
        for (const ke of _e) {
          const ve = ue.get(ke.from);
          (ve == null ? void 0 : ve.type) === "text-node" && ge.push(ve);
        }
        return ge;
      }, [e.id, n, t]),
      P = g.useMemo(() => {
        if (!n || !t) return [];
        const he = n.reduce((ke, ve) => {
            if (ve.to === e.id && (!ve.inputType || ve.inputType === "default")) {
              const Te = ve.to;
              ke.has(Te) || ke.set(Te, []), ke.get(Te).push(ve);
            }
            return ke;
          }, new Map()),
          ue = new Map(t.map(ke => [ke.id, ke])),
          ge = [],
          _e = he.get(e.id) || [];
        for (const ke of _e) {
          const ve = ue.get(ke.from);
          (ve == null ? void 0 : ve.type) === "custom-agent" && ge.push(ve);
        }
        return ge;
      }, [e.id, n, t]),
      R = g.useMemo(() => {
        var ge, _e;
        const he = new Map(t.map(ke => [ke.id, ke])),
          ue = [];
        if (T.length > 0) for (const ke of T) {
          const ve = he.get(ke.id) || ke,
            Te = ((ge = ve.settings) == null ? void 0 : ge.text) || "",
            Ne = ve.prompt || "",
            me = (Te || Ne).trim();
          me.length > 0 && ue.push(me);
        }
        if (P.length > 0) for (const ke of P) {
          const Te = (((_e = (he.get(ke.id) || ke).settings) == null ? void 0 : _e.outputContent) || "").trim();
          Te.length > 0 && ue.push(Te);
        }
        return ue.join(`

`);
      }, [T, P, t]),
      [j, B] = g.useState(!1),
      F = R.trim(),
      N = T.length > 0 || P.length > 0,
      G = j && !!F,
      z = (((ne = e.settings) == null ? void 0 : ne.prompt) || "").trim(),
      O = G ? F : N && !z ? "" : ((de = e.settings) == null ? void 0 : de.prompt) || "";
    g.useEffect(() => {
      F || B(!1);
    }, [F]);
    const L = (he, ue) => {
        var _e;
        he.stopPropagation(), he.preventDefault();
        const ge = (_e = v.current) == null ? void 0 : _e.getBoundingClientRect();
        if (ge) {
          const ke = (he.clientX - ge.left - _.x) / _.zoom,
            ve = (he.clientY - ge.top - _.y) / _.zoom;
          b(hD(ke, ve, _.zoom));
        }
        m(e.id), f(ue);
      },
      D = (he, ue) => {
        he.stopPropagation(), d && d !== e.id && (n.some(_e => _e.from === d && _e.to === e.id && _e.inputType === ue) || (y(_e => _e.filter(ke => !(ke.to === e.id && ke.inputType === ue))), y(_e => [..._e, {
          id: ue === "oref" || ue === "sref" ? A() : `conn-${Date.now()}`,
          from: d,
          to: e.id,
          inputType: ue
        }])), p(null));
      },
      U = ((le = e.settings) == null ? void 0 : le.model) || "qwen-image-edit";
    s.find(he => he.id === U);
    const H = U.includes("mj-") || U.toLowerCase().includes("midjourney"),
      Y = H ? w(e.id, "oref") : null,
      K = H ? w(e.id, "sref") : null,
      W = ((J = e.settings) == null ? void 0 : J.imageUrls) || ((pe = e.settings) != null && pe.imageUrl || e.content ? [((ce = e.settings) == null ? void 0 : ce.imageUrl) || e.content] : []),
      Q = ((we = e.settings) == null ? void 0 : we.selectedImageIndex) ?? null;
    return c.jsx("div", {
      className: `relative w-full h-full flex flex-col transition-colors pointer-events-auto overflow-hidden ${r ? "bg-[#1f1f1f]/80" : "bg-zinc-100"}`,
      children: c.jsxs(c.Fragment, {
        children: [c.jsxs("div", {
          className: `flex items-center gap-1.5 px-3 py-2 border-b text-xs font-semibold shrink-0 ${r ? "text-zinc-300 border-zinc-800" : "text-zinc-700 border-zinc-200"}`,
          children: [c.jsx(Hd, {
            size: 12,
            className: "text-blue-500"
          }), c.jsx("span", {
            children: x(C)
          })]
        }), c.jsxs("div", {
          className: "flex-1 flex flex-col gap-3 p-3 overflow-y-auto min-h-0",
          children: [c.jsxs("div", {
            children: [c.jsx("label", {
              className: "text-[10px] block mb-1 text-zinc-500",
              children: x(S ? "大模型选择（用于提示词过滤）" : "大模型选择（用于过滤人物、字符描述）")
            }), c.jsxs("select", {
              value: ((X = e.settings) == null ? void 0 : X.chatModel) || "",
              onChange: he => a(e.id, {
                settings: {
                  ...e.settings,
                  chatModel: he.target.value
                }
              }),
              className: `w-full px-2 py-1 rounded text-xs border ${r ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"}`,
              onMouseDown: he => he.stopPropagation(),
              children: [c.jsx("option", {
                value: "",
                children: x("选择大模型（可选）")
              }), s.filter(he => he.type === "Chat").map(he => c.jsx("option", {
                value: he.id,
                children: Yh(he.provider)
              }, he.id))]
            })]
          }), c.jsxs("div", {
            children: [c.jsx("label", {
              className: "text-[10px] block mb-1 text-zinc-500",
              children: x("选择模型")
            }), c.jsxs("select", {
              value: ((Z = e.settings) == null ? void 0 : Z.model) || "qwen-image-edit",
              onChange: he => a(e.id, {
                settings: {
                  ...e.settings,
                  model: he.target.value
                }
              }),
              className: `w-full px-2 py-1 rounded text-xs border ${r ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"}`,
              onMouseDown: he => he.stopPropagation(),
              children: [c.jsx("option", {
                value: "",
                children: x("选择模型")
              }), s.filter(he => he.type === "Image").map(he => c.jsx("option", {
                value: he.id,
                children: Yh(he.provider)
              }, he.id))]
            })]
          }), (((re = e.settings) == null ? void 0 : re.referenceImages) ?? []).length > 0 ? c.jsxs("div", {
            className: `flex items-center gap-1.5 px-2 py-1 rounded text-[10px] ${r ? "bg-green-900/30 border border-green-700" : "bg-green-50 border border-green-200"}`,
            children: [c.jsx("span", {
              className: "text-green-500",
              children: "✅"
            }), c.jsxs("span", {
              className: r ? "text-green-400" : "text-green-700",
              children: [x("引用图片成功 ("), String((((fe = e.settings) == null ? void 0 : fe.referenceImages) ?? []).length), x("张)")]
            })]
          }) : null, N ? c.jsx(m$t, {
            isDark: r,
            textNodeCount: T.length,
            agentNodeCount: P.length,
            showPreview: j,
            onTogglePreview: () => B(he => !he),
            icon: "emoji"
          }) : null, c.jsxs("div", {
            className: "space-y-3",
            children: [c.jsxs("div", {
              children: [c.jsx("label", {
                className: "text-[10px] block mb-1 text-zinc-500",
                children: x("比例")
              }), c.jsxs("select", {
                value: Avo(e.settings),
                onChange: he => a(e.id, {
                  settings: {
                    ...(e.settings || {}),
                    ratio: he.target.value
                  }
                }),
                className: `w-full px-2 py-1 rounded text-xs border ${r ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"}`,
                onMouseDown: he => he.stopPropagation(),
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
            }), Cvo.includes(String(((ye = e.settings) == null ? void 0 : ye.model) ?? "")) ? c.jsxs("div", {
              children: [c.jsx("label", {
                className: "text-[10px] block mb-1 text-zinc-500",
                children: x("AP 任务窗口")
              }), c.jsxs("select", {
                value: Svo(e.settings),
                onChange: he => a(e.id, {
                  settings: {
                    ...(e.settings || {}),
                    batchSize: parseInt(he.target.value)
                  }
                }),
                className: `w-full px-2 py-1 rounded text-xs border ${r ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"}`,
                onMouseDown: he => he.stopPropagation(),
                children: [c.jsx("option", {
                  value: 1,
                  children: x("1× (默认)")
                }), c.jsx("option", {
                  value: 2,
                  children: "2×"
                }), c.jsx("option", {
                  value: 4,
                  children: "4×"
                }), c.jsx("option", {
                  value: 9,
                  children: "9×"
                })]
              })]
            }) : null]
          }), H && c.jsxs(c.Fragment, {
            children: [c.jsxs("div", {
              children: [c.jsx("label", {
                className: "text-[10px] block mb-1 text-zinc-500",
                children: x("MJ 版本")
              }), c.jsx("select", {
                value: ((ie = e.settings) == null ? void 0 : ie.mjVersion) || "--v 7",
                onChange: he => {
                  var ge;
                  const ue = he.target.value;
                  a(e.id, {
                    settings: {
                      ...e.settings,
                      mjVersion: ue
                    }
                  }), cl(String(((ge = e.settings) == null ? void 0 : ge.model) || "mj-v6"), {
                    mjVersion: ue
                  });
                },
                className: `w-full px-2 py-1 rounded text-xs border ${r ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"}`,
                onMouseDown: he => he.stopPropagation(),
                children: QH.map(he => c.jsx("option", {
                  value: he.value,
                  children: x(he.label)
                }, he.value))
              })]
            }), c.jsxs("div", {
              className: "flex flex-col gap-1.5 overflow-visible pl-2",
              children: [c.jsxs("div", {
                className: "relative flex items-center gap-1.5",
                children: [c.jsx("div", {
                  className: `w-2 h-2 rounded-full cursor-crosshair transition-all ${u === e.id && h === "oref" ? "bg-blue-500 ring-2 ring-blue-400" : r ? "bg-zinc-600 hover:bg-zinc-500" : "bg-zinc-400 hover:bg-zinc-500"}`,
                  style: {
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 20
                  },
                  title: x("oref输入 - 点击开始连接"),
                  "data-input-type": "oref",
                  onMouseDown: he => L(he, "oref"),
                  onMouseUp: he => D(he, "oref")
                }), c.jsxs("div", {
                  className: "flex items-center gap-1.5 flex-1 ml-2 min-w-0",
                  children: [c.jsx("span", {
                    className: `text-[10px] font-medium ${r ? "text-zinc-400" : "text-zinc-600"}`,
                    children: "oref"
                  }), Y && c.jsx("div", {
                    className: "w-1.5 h-1.5 rounded-full bg-green-500"
                  })]
                }), c.jsxs("div", {
                  className: "flex items-center gap-1.5 shrink-0 ml-auto",
                  children: [c.jsx("span", {
                    className: `text-[10px] font-medium ${r ? "text-zinc-400" : "text-zinc-600"}`,
                    children: "ow"
                  }), ((ae = e.settings) == null ? void 0 : ae.mjOw) > 0 && c.jsx("div", {
                    className: "w-1.5 h-1.5 rounded-full bg-green-500"
                  }), c.jsx("input", {
                    type: "number",
                    min: "1",
                    max: "1000",
                    placeholder: "1-1000",
                    value: ((be = e.settings) == null ? void 0 : be.mjOw) || "",
                    onChange: he => {
                      const ue = parseInt(he.target.value, 10);
                      isNaN(ue) || ue < 1 ? a(e.id, {
                        settings: {
                          ...e.settings,
                          mjOw: void 0
                        }
                      }) : ue > 1e3 ? a(e.id, {
                        settings: {
                          ...e.settings,
                          mjOw: 1e3
                        }
                      }) : a(e.id, {
                        settings: {
                          ...e.settings,
                          mjOw: ue
                        }
                      });
                    },
                    onMouseDown: he => he.stopPropagation(),
                    className: `w-16 px-2 py-1 rounded text-[10px] border outline-none focus:border-blue-500/50 text-right tabular-nums [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${r ? "bg-[#1f1f1f]/50 border-zinc-700 text-zinc-300 placeholder-zinc-600" : "bg-white border-zinc-300 text-zinc-800 placeholder-zinc-400"}`
                  })]
                })]
              }), c.jsxs("div", {
                className: "relative flex items-center gap-1.5",
                children: [c.jsx("div", {
                  className: `w-2 h-2 rounded-full cursor-crosshair transition-all ${u === e.id && h === "sref" ? "bg-blue-500 ring-2 ring-blue-400" : r ? "bg-zinc-600 hover:bg-zinc-500" : "bg-zinc-400 hover:bg-zinc-500"}`,
                  style: {
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 20
                  },
                  title: x("sref输入 - 点击开始连接"),
                  "data-input-type": "sref",
                  onMouseDown: he => L(he, "sref"),
                  onMouseUp: he => D(he, "sref")
                }), c.jsxs("div", {
                  className: "flex items-center gap-1.5 flex-1 ml-2",
                  children: [c.jsx("span", {
                    className: `text-[10px] font-medium ${r ? "text-zinc-400" : "text-zinc-600"}`,
                    children: "sref"
                  }), K && c.jsx("div", {
                    className: "w-1.5 h-1.5 rounded-full bg-green-500"
                  })]
                })]
              })]
            })]
          }), c.jsxs("div", {
            children: [c.jsx("label", {
              className: "text-[10px] block mb-1 text-zinc-500",
              children: x("提示词")
            }), c.jsx("textarea", {
              ref: M,
              "data-node-id": e.id,
              "data-scrollable": "true",
              value: O,
              readOnly: G,
              onChange: he => {
                if (G) return;
                const ue = he.target.value;
                a(e.id, {
                  settings: {
                    ...e.settings,
                    prompt: ue
                  }
                });
              },
              placeholder: x(N ? "提示词由上游节点提供" : "输入提示词..."),
              className: `w-full h-20 resize-none outline-none text-base p-3 rounded overflow-y-auto scrollbar-hide ${r ? "bg-[#1f1f1f]/50 text-zinc-200 placeholder-zinc-600" : "bg-transparent text-zinc-800 placeholder-zinc-400"}`,
              onMouseDown: he => he.stopPropagation()
            })]
          }), W.length > 0 ? c.jsxs("div", {
            className: "relative w-full",
            children: [W.length > 1 ? c.jsx("div", {
              className: "grid grid-cols-2 gap-2",
              children: W.map((he, ue) => c.jsxs("div", {
                className: `relative aspect-square bg-black rounded-lg overflow-hidden cursor-pointer transition-all ${Q === ue ? "ring-2 ring-blue-500 ring-offset-2" : "hover:ring-1 hover:ring-zinc-400"}`,
                onClick: ge => {
                  ge.stopPropagation();
                  const _e = Q === ue ? null : ue;
                  a(e.id, {
                    settings: {
                      ...e.settings,
                      selectedImageIndex: _e
                    }
                  });
                },
                onContextMenu: async ge => {
                  ge.preventDefault(), ge.stopPropagation();
                  const {
                      buildGenNodeInputImageDrop: _e
                    } = await Ie(async () => {
                      const {
                        buildGenNodeInputImageDrop: Ne
                      } = await Promise.resolve().then(() => sw);
                      return {
                        buildGenNodeInputImageDrop: Ne
                      };
                    }, void 0, import.meta.url),
                    ke = await _e(e, he);
                  if (!ke) return;
                  const Te = {
                    id: `node-${Date.now()}`,
                    type: "input-image",
                    x: e.x + e.width + 50,
                    y: e.y,
                    width: 400,
                    height: 300,
                    content: ke.content,
                    prompt: "",
                    settings: ke.settings
                  };
                  i(Ne => [...Ne, Te]);
                },
                onMouseDown: ge => ge.stopPropagation(),
                children: [c.jsx("img", {
                  src: he,
                  alt: `Generated ${ue + 1}`,
                  className: "w-full h-full object-contain"
                }), c.jsxs("div", {
                  className: "absolute top-1 left-1 bg-black/50 text-white text-[10px] px-1 py-0.5 rounded",
                  children: [ue + 1, "/", W.length]
                }), Q === ue && c.jsx("div", {
                  className: "absolute top-1 right-1 bg-blue-500 text-white text-[10px] px-1 py-0.5 rounded",
                  children: x("✓ 已选中")
                })]
              }, ue))
            }) : c.jsx("div", {
              className: "relative w-full aspect-video bg-black rounded-lg overflow-hidden cursor-pointer",
              onContextMenu: async he => {
                he.preventDefault(), he.stopPropagation();
                const {
                    buildGenNodeInputImageDrop: ue
                  } = await Ie(async () => {
                    const {
                      buildGenNodeInputImageDrop: ve
                    } = await Promise.resolve().then(() => sw);
                    return {
                      buildGenNodeInputImageDrop: ve
                    };
                  }, void 0, import.meta.url),
                  ge = await ue(e, W[0]);
                if (!ge) return;
                const ke = {
                  id: `node-${Date.now()}`,
                  type: "input-image",
                  x: e.x + e.width + 50,
                  y: e.y,
                  width: 400,
                  height: 300,
                  content: ge.content,
                  prompt: "",
                  settings: ge.settings
                };
                i(ve => [...ve, ke]);
              },
              onMouseDown: he => he.stopPropagation(),
              children: c.jsx("img", {
                src: W[0],
                alt: "Generated",
                className: "w-full h-full object-contain"
              })
            }), W.length > 1 && c.jsx("div", {
              className: `mt-2 px-2 py-1 rounded text-[10px] ${r ? "bg-zinc-800/50 border border-zinc-700" : "bg-zinc-100 border border-zinc-300"}`,
              children: c.jsx("span", {
                className: r ? "text-zinc-400" : "text-zinc-600",
                children: x("💡 右键图片可发送到画布")
              })
            })]
          }) : c.jsx("div", {
            className: `w-full aspect-video rounded border-2 border-dashed flex items-center justify-center ${r ? "border-zinc-700" : "border-zinc-300"}`,
            children: c.jsx("span", {
              className: `text-sm ${r ? "text-zinc-400" : "text-zinc-500"}`,
              children: x('点击"生成"按钮开始生成')
            })
          }), E && c.jsx(Ivo, {
            nodeId: e.id,
            fallbackProgress: ((Ee = e.settings) == null ? void 0 : Ee.progress) || 0,
            isDark: r
          }), ((xe = e.settings) == null ? void 0 : xe.error) && c.jsx("div", {
            className: "text-[10px] text-red-500",
            children: e.settings.error
          })]
        }), c.jsx("div", {
          className: `px-3 py-2 border-t shrink-0 ${r ? "border-zinc-800" : "border-zinc-200"}`,
          children: c.jsx("button", {
            className: `w-full py-2 rounded text-xs font-medium transition-colors ${E ? "bg-zinc-400 cursor-not-allowed text-white" : "bg-blue-600 hover:bg-blue-500 text-white"}`,
            disabled: E,
            onMouseDown: he => he.stopPropagation(),
            onClick: async () => {
              var me, Ae, Fe, Me, Re, $e, rt, nt, ze;
              const he = ((me = e.settings) == null ? void 0 : me.prompt) || "",
                ue = ((Ae = e.settings) == null ? void 0 : Ae.model) || "qwen-image-edit",
                ge = ((Fe = e.settings) == null ? void 0 : Fe.ratio) || "16:9",
                _e = ((Me = e.settings) == null ? void 0 : Me.referenceImages) || [],
                ke = e.type === "generate-scene-image";
              let ve = "";
              if (he.trim() && R.trim() ? ve = `${he.trim()}

${R.trim()}` : he.trim() ? ve = he.trim() : R.trim() && (ve = R.trim()), !ve.trim()) {
                alert(x("请先输入提示词或连接上游文字节点/Agent节点"));
                return;
              }
              const Te = s.find(Le => Le.id === ue);
              if (!Te) {
                alert(x("请先选择模型"));
                return;
              }
              if (!(Te.key || l)) {
                alert(x("请先配置API Key"));
                return;
              }
              a(e.id, {
                settings: {
                  ...e.settings,
                  isGenerating: !0,
                  error: null
                }
              });
              try {
                console.log(`[生成${ke ? "场景" : "角色"}图片] 开始生成，模型:`, ue, "比例:", ge), console.log(`[生成${ke ? "场景" : "角色"}图片] 合并后的提示词:`, ve.substring(0, 100) + "...");
                let Le = ve;
                const Ke = ((Re = e.settings) == null ? void 0 : Re.chatModel) || "",
                  Xe = Ke ? s.find(De => De.id === Ke) : s.find(De => De.type === "Chat");
                if (Xe) {
                  const De = Xe.key || l;
                  if (De) try {
                    const Ye = (Xe.url || "https://ai.comfly.org").replace(/\/+$/, "");
                    let Ce;
                    H ? Ce = ke ? "你是一个 Midjourney 提示词专家。请将以下中文场景描述转换为简洁的英文 Midjourney 提示词。只保留关键的场景、环境、建筑、背景特征，去除所有人物、角色、对话和动作描述。输出格式：简洁的英文关键词，用逗号分隔，不要有多余的解释。" : '你是一个 Midjourney 提示词专家。请将以下中文角色描述转换为简洁的英文 Midjourney 提示词。只保留关键的人物外貌、服装、姿态特征，去除所有剧情、动作、对话和背景信息。输出格式：简洁的英文关键词，用逗号分隔，必须包含 "white background"，不要有多余的解释。' : Ce = ke ? "你是一个场景描述优化专家。请分析以下提示词，只保留关于场景、环境、建筑、背景等场景特征的描述，去除所有人物、角色、字符、对话和动作描述。输出应简洁，只包含场景特征描述，不能包含任何人物或角色。" : '你是一个提示词优化专家。请分析以下提示词，只保留关于人物外貌、服装、姿态等角色特征的描述，去除所有剧情、动作、对话和背景信息。输出应简洁，只包含角色特征描述，格式为"全身视角，[人物特征描述]，站在纯白色背景前"。必须确保背景始终是纯白色，不能有任何场景描述。';
                    const He = await fetch(`${Ye}/v1/chat/completions`, {
                      method: "POST",
                      headers: {
                        Authorization: `Bearer ${De}`,
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                        model: Xe.modelName || Xe.id || "gpt-5.5",
                        messages: [{
                          role: "system",
                          content: Ce
                        }, {
                          role: "user",
                          content: ve
                        }],
                        temperature: .3
                      })
                    });
                    if (He.ok) {
                      const it = (ze = (nt = (rt = ($e = (await He.json()).choices) == null ? void 0 : $e[0]) == null ? void 0 : rt.message) == null ? void 0 : nt.content) == null ? void 0 : ze.trim();
                      it && (Le = it, console.log(`[生成${ke ? "场景" : "角色"}图片] ${H ? "转换为英文" : "过滤后"}的提示词:`, Le));
                    }
                  } catch (Ye) {
                    console.warn("提示词处理失败，使用原始提示词:", Ye);
                  }
                }
                !ke && !H && !Le.includes("白色背景") && !Le.includes("纯白色背景") && !Le.includes("white background") && (Le = Le + "，纯白色背景"), a(e.id, {
                  prompt: Le,
                  settings: {
                    ...e.settings,
                    model: ue,
                    ratio: ge,
                    prompt: Le,
                    ...(_e.length > 0 ? {
                      referenceImages: _e
                    } : {})
                  }
                }), setTimeout(() => {
                  k({
                    ...e,
                    prompt: Le,
                    settings: {
                      ...e.settings,
                      model: ue,
                      ratio: ge,
                      prompt: Le,
                      ...(_e.length > 0 ? {
                        referenceImages: _e
                      } : {})
                    }
                  });
                }, 0);
              } catch (Le) {
                console.error(`[生成${e.type === "generate-scene-image" ? "场景" : "角色"}图片] 失败:`, Le);
                const Ke = Le instanceof Error ? Le.message : "生成失败";
                a(e.id, {
                  settings: {
                    ...e.settings,
                    isGenerating: !1,
                    progress: 0,
                    error: Ke
                  }
                }), alert(x(SU(Ke)));
              }
            },
            children: x(E ? "生成中..." : S ? "生成角色图片" : "生成场景图片")
          })
        })]
      })
    });
  },
  Tvo = ({
    node: e,
    nodes: t,
    connections: n,
    isDark: r,
    updateNode: a,
    setHistory: i,
    apiConfigs: o,
    globalApiKey: s,
    characterLibrary: l,
    getDurationsForModel: d,
    getDefaultDurationForModel: u,
    isGrokVideoModel: h,
    isVeoModel: p,
    isHailuoModel: m,
    supportsStartEndFrames: f,
    GROK_VIDEO_RATIOS: y,
    connectingSource: b,
    connectingTarget: v,
    connectingInputType: _,
    setConnectingTarget: w,
    setConnectingInputType: k,
    setMousePos: A,
    canvasRef: S,
    view: C,
    getConnectedImageForInput: I,
    generate: E
  }) => {
    var q, ne, de, le, J, pe, ce, we, X, Z, re, fe, ye, ie, ae, be;
    on();
    const M = e.type === "generate-character-video",
      T = M ? "生成角色视频" : "生成场景视频",
      R = o9(e.id) || !!e.isGenerating,
      j = g.useRef(null);
    g.useEffect(() => {
      const Ee = j.current;
      if (!Ee) return;
      const xe = he => {
        he.stopPropagation(), he.preventDefault(), Ee.scrollTop += he.deltaY;
      };
      return Ee.addEventListener("wheel", xe, {
        passive: !1,
        capture: !0
      }), () => Ee.removeEventListener("wheel", xe, {
        capture: !0
      });
    }, []);
    const B = g.useMemo(() => new Map(t.map(Ee => [Ee.id, Ee])), [t]),
      F = g.useMemo(() => n.filter(Ee => Ee.to === e.id).map(Ee => B.get(Ee.from)).find(Ee => (Ee == null ? void 0 : Ee.type) === (M ? "character-description" : "scene-description")), [e.id, n, B]),
      N = ((q = e.settings) == null ? void 0 : q.videoPrompt) || "",
      G = (((ne = F == null ? void 0 : F.settings) == null ? void 0 : ne.prompt) || "").trim(),
      z = g.useMemo(() => {
        if (!n || !t) return [];
        const Ee = n.reduce((ue, ge) => {
            if (ge.to === e.id && (!ge.inputType || ge.inputType === "default")) {
              const _e = ge.to;
              ue.has(_e) || ue.set(_e, []), ue.get(_e).push(ge);
            }
            return ue;
          }, new Map()),
          xe = [],
          he = Ee.get(e.id) || [];
        for (const ue of he) {
          const ge = B.get(ue.from);
          (ge == null ? void 0 : ge.type) === "text-node" && xe.push(ge);
        }
        return xe;
      }, [e.id, n, t, B]),
      V = g.useMemo(() => {
        if (!n || !t) return [];
        const Ee = n.reduce((ue, ge) => {
            if (ge.to === e.id && (!ge.inputType || ge.inputType === "default")) {
              const _e = ge.to;
              ue.has(_e) || ue.set(_e, []), ue.get(_e).push(ge);
            }
            return ue;
          }, new Map()),
          xe = [],
          he = Ee.get(e.id) || [];
        for (const ue of he) {
          const ge = B.get(ue.from);
          (ge == null ? void 0 : ge.type) === "custom-agent" && xe.push(ge);
        }
        return xe;
      }, [e.id, n, t, B]),
      O = g.useMemo(() => {
        var xe, he;
        const Ee = [];
        if (z.length > 0) for (const ue of z) {
          const ge = B.get(ue.id) || ue,
            _e = ((xe = ge.settings) == null ? void 0 : xe.text) || "",
            ke = ge.prompt || "",
            ve = (_e || ke).trim();
          ve.length > 0 && Ee.push(ve);
        }
        if (V.length > 0) for (const ue of V) {
          const _e = (((he = (B.get(ue.id) || ue).settings) == null ? void 0 : he.outputContent) || "").trim();
          _e.length > 0 && Ee.push(_e);
        }
        return Ee.join(`

`);
      }, [z, V, B]),
      [L, D] = g.useState(!1),
      U = O.trim(),
      H = z.length > 0 || V.length > 0,
      Y = L && !!U;
    g.useEffect(() => {
      U || D(!1);
    }, [U]);
    const K = Y ? U : H && !N.trim() ? "" : N,
      W = n.filter(Ee => Ee.to === e.id && (!Ee.inputType || Ee.inputType === "default")),
      Q = [];
    if (W.forEach(Ee => {
      const xe = B.get(Ee.from);
      xe != null && xe.content && Q.push(xe.content);
    }), Q.length === 0) {
      const Ee = ((de = e.settings) == null ? void 0 : de.referenceImages) || ((le = F == null ? void 0 : F.settings) == null ? void 0 : le.referenceImages) || [];
      Q.push(...Ee);
    }
    return c.jsx("div", {
      className: `relative w-full h-full flex flex-col transition-colors pointer-events-auto ${r ? "bg-[#1f1f1f]/80" : "bg-zinc-100"}`,
      children: c.jsxs(c.Fragment, {
        children: [c.jsxs("div", {
          className: `flex items-center gap-1.5 px-3 py-2 border-b text-xs font-semibold shrink-0 ${r ? "text-zinc-300 border-zinc-800" : "text-zinc-700 border-zinc-200"}`,
          children: [c.jsx(Oo, {
            size: 12,
            className: "text-green-500"
          }), c.jsx("span", {
            children: x(T)
          })]
        }), c.jsxs("div", {
          className: "flex-1 flex flex-col gap-3 p-3 overflow-y-auto min-h-0 rh-scroll-minimal",
          children: [Q.length > 0 && c.jsxs("div", {
            className: `flex flex-col gap-2 px-2 py-2 rounded text-[10px] ${r ? "bg-green-900/30 border border-green-700" : "bg-green-50 border border-green-200"}`,
            children: [c.jsxs("div", {
              className: "flex items-center gap-1.5",
              children: [c.jsx("span", {
                className: "text-green-500",
                children: "✅"
              }), c.jsxs("span", {
                className: r ? "text-green-400" : "text-green-700",
                children: [x("引用图片成功 ("), Q.length, x("张)")]
              })]
            }), c.jsx("div", {
              className: "flex gap-2 overflow-x-auto",
              children: Q.slice(0, 4).map((Ee, xe) => c.jsx("div", {
                className: "relative w-16 h-16 flex-shrink-0 rounded overflow-hidden border border-green-500",
                children: c.jsx("img", {
                  src: Ee,
                  alt: `Reference ${xe + 1}`,
                  className: "w-full h-full object-cover",
                  onMouseDown: he => he.stopPropagation()
                })
              }, xe))
            })]
          }), H ? c.jsx(m$t, {
            isDark: r,
            textNodeCount: z.length,
            agentNodeCount: V.length,
            showPreview: L,
            onTogglePreview: () => D(Ee => !Ee),
            icon: "emoji"
          }) : null, c.jsxs("div", {
            children: [c.jsx("label", {
              className: "text-[10px] block mb-1 text-zinc-500",
              children: x("选择模型")
            }), c.jsx("select", {
              value: String(((J = e.settings) == null ? void 0 : J.model) ?? "sora-2"),
              onChange: Ee => a(e.id, {
                settings: {
                  ...e.settings,
                  model: Ee.target.value
                }
              }),
              className: `w-full px-2 py-1 rounded text-xs border ${r ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"}`,
              onMouseDown: Ee => Ee.stopPropagation(),
              children: o.filter(Ee => Ee.type === "Video").map(Ee => c.jsx("option", {
                value: Ee.id,
                children: Yh(Ee.provider)
              }, Ee.id))
            })]
          }), (() => {
            var ue, ge;
            const Ee = ((ue = e.settings) == null ? void 0 : ue.model) || "sora-2",
              xe = d(Ee),
              he = u(Ee);
            return c.jsxs("div", {
              children: [c.jsx("label", {
                className: "text-[10px] block mb-1 text-zinc-500",
                children: x("时长")
              }), c.jsx("select", {
                value: ((ge = e.settings) == null ? void 0 : ge.duration) || he,
                onChange: _e => a(e.id, {
                  settings: {
                    ...e.settings,
                    duration: _e.target.value
                  }
                }),
                className: `w-full px-2 py-1 rounded text-xs border ${r ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"}`,
                onMouseDown: _e => _e.stopPropagation(),
                children: xe.map(_e => c.jsx("option", {
                  value: _e,
                  children: _e.replace("s", "秒")
                }, _e))
              })]
            });
          })(), (() => {
            var he, ue;
            const Ee = ((he = e.settings) == null ? void 0 : he.model) || "sora-2",
              xe = ah(Ee);
            return c.jsxs("div", {
              children: [c.jsx("label", {
                className: "text-[10px] block mb-1 text-zinc-500",
                children: x("比例")
              }), c.jsx("select", {
                value: ((ue = e.settings) == null ? void 0 : ue.ratio) || xe[0],
                onChange: ge => a(e.id, {
                  settings: {
                    ...e.settings,
                    ratio: ge.target.value
                  }
                }),
                className: `w-full px-2 py-1 rounded text-xs border ${r ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"}`,
                onMouseDown: ge => ge.stopPropagation(),
                children: xe.map(ge => c.jsx("option", {
                  value: ge,
                  children: ge
                }, ge))
              })]
            });
          })(), f(((pe = e.settings) == null ? void 0 : pe.model) || "") && ((ce = e.settings) == null ? void 0 : ce.veoFramesMode) && (() => {
            var ke;
            const Ee = I(e.id, "veo_start"),
              xe = I(e.id, "veo_end"),
              he = ((ke = e.settings) == null ? void 0 : ke.model) || "";
            let ue = "Veo 3 首尾帧";
            m(he) ? ue = "Hailuo 2.0 首尾帧" : he.includes("kling-v2-5-turbo") ? ue = "Kling v2.5 Turbo 首尾帧" : he.includes("kling-v3") && (ue = "Kling v3 首尾帧");
            const ge = he.includes("kling-v2-5-turbo"),
              _e = Ee || xe;
            return c.jsxs("div", {
              className: `p-3 rounded-lg border space-y-2 ${r ? "bg-[#1f1f1f]/40 border-emerald-500/20" : "bg-emerald-50 border-emerald-200"}`,
              onMouseDown: ve => ve.stopPropagation(),
              children: [c.jsx("div", {
                className: `text-[11px] font-semibold ${r ? "text-zinc-200" : "text-zinc-700"}`,
                children: x(ue)
              }), c.jsx("div", {
                className: "text-[10px] text-zinc-500",
                children: x("第一张为首帧，第二张为尾帧（最多 2 张）")
              }), ge && _e && c.jsxs("div", {
                className: `text-[10px] px-2 py-1 rounded ${r ? "bg-blue-900/30 text-blue-300 border border-blue-700/50" : "bg-blue-50 text-blue-700 border border-blue-200"}`,
                children: [x("⚡ 使用首尾帧时将自动切换到 "), c.jsx("span", {
                  className: "font-semibold",
                  children: "pro"
                }), x(" 模式")]
              }), c.jsxs("div", {
                className: "relative flex items-center gap-2",
                children: [c.jsx("div", {
                  className: "absolute left-[-4px] top-1/2 -translate-y-1/2 w-12 h-12 -m-4 flex items-center justify-center cursor-pointer z-20",
                  style: {
                    zIndex: 20
                  },
                  title: x("首帧输入 - 点击开始连接"),
                  "data-input-type": "veo_start",
                  onMouseDown: ve => {
                    var Ne;
                    ve.stopPropagation(), ve.preventDefault();
                    const Te = (Ne = S.current) == null ? void 0 : Ne.getBoundingClientRect();
                    if (Te) {
                      const me = (ve.clientX - Te.left - C.x) / C.zoom,
                        Ae = (ve.clientY - Te.top - C.y) / C.zoom;
                      A(hD(me, Ae, C.zoom));
                    }
                    w(e.id), k("veo_start");
                  },
                  onMouseUp: ve => {
                    ve.stopPropagation(), ve.preventDefault();
                  },
                  children: c.jsx("div", {
                    className: `w-2 h-2 rounded-full transition-all pointer-events-none ${v === e.id && _ === "veo_start" ? "bg-emerald-500 ring-2 ring-emerald-400 scale-150" : b && b !== e.id ? "scale-150 bg-blue-500 ring-2 ring-blue-400 z-50" : Ee ? "bg-green-500" : r ? "bg-zinc-600 hover:bg-zinc-500" : "bg-zinc-400 hover:bg-zinc-500"}`
                  })
                }), c.jsxs("div", {
                  className: "flex items-center justify-between flex-1 ml-2",
                  children: [c.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [c.jsx("span", {
                      className: `text-[10px] font-medium ${r ? "text-zinc-400" : "text-zinc-600"}`,
                      children: x("● 首帧")
                    }), Ee && c.jsx("div", {
                      className: "w-1.5 h-1.5 rounded-full bg-green-500"
                    })]
                  }), Ee ? c.jsx("div", {
                    className: "w-8 h-8 rounded overflow-hidden border border-zinc-700/40",
                    children: c.jsx("img", {
                      src: Ee,
                      className: "w-full h-full object-cover",
                      alt: x("首帧")
                    })
                  }) : c.jsx("span", {
                    className: `text-[10px] ${r ? "text-zinc-600" : "text-zinc-400"}`,
                    children: x("未连接")
                  })]
                })]
              }), c.jsxs("div", {
                className: "relative flex items-center gap-2",
                children: [c.jsx("div", {
                  className: "absolute left-[-4px] top-1/2 -translate-y-1/2 w-12 h-12 -m-4 flex items-center justify-center cursor-pointer z-20",
                  style: {
                    zIndex: 20
                  },
                  title: x("尾帧输入 - 点击开始连接"),
                  "data-input-type": "veo_end",
                  onMouseDown: ve => {
                    var Ne;
                    ve.stopPropagation(), ve.preventDefault();
                    const Te = (Ne = S.current) == null ? void 0 : Ne.getBoundingClientRect();
                    if (Te) {
                      const me = (ve.clientX - Te.left - C.x) / C.zoom,
                        Ae = (ve.clientY - Te.top - C.y) / C.zoom;
                      A(hD(me, Ae, C.zoom));
                    }
                    w(e.id), k("veo_end");
                  },
                  onMouseUp: ve => {
                    ve.stopPropagation(), ve.preventDefault();
                  },
                  children: c.jsx("div", {
                    className: `w-2 h-2 rounded-full transition-all pointer-events-none ${v === e.id && _ === "veo_end" ? "bg-emerald-500 ring-2 ring-emerald-400 scale-150" : b && b !== e.id ? "scale-150 bg-blue-500 ring-2 ring-blue-400 z-50" : xe ? "bg-green-500" : r ? "bg-zinc-600 hover:bg-zinc-500" : "bg-zinc-400 hover:bg-zinc-500"}`
                  })
                }), c.jsxs("div", {
                  className: "flex items-center justify-between flex-1 ml-2",
                  children: [c.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [c.jsx("span", {
                      className: `text-[10px] font-medium ${r ? "text-zinc-400" : "text-zinc-600"}`,
                      children: x("● 尾帧")
                    }), xe && c.jsx("div", {
                      className: "w-1.5 h-1.5 rounded-full bg-green-500"
                    })]
                  }), xe ? c.jsx("div", {
                    className: "w-8 h-8 rounded overflow-hidden border border-zinc-700/40",
                    children: c.jsx("img", {
                      src: xe,
                      className: "w-full h-full object-cover",
                      alt: x("尾帧")
                    })
                  }) : c.jsx("span", {
                    className: `text-[10px] ${r ? "text-zinc-600" : "text-zinc-400"}`,
                    children: x("未连接")
                  })]
                })]
              })]
            });
          })(), p(((we = e.settings) == null ? void 0 : we.model) || "") && c.jsxs("div", {
            className: "flex items-center justify-between",
            children: [c.jsx("span", {
              className: `text-[10px] ${r ? "text-zinc-400" : "text-zinc-600"}`,
              children: x("启用首尾帧")
            }), c.jsx("button", {
              className: `w-8 h-4 rounded-full transition-colors ${(X = e.settings) != null && X.veoFramesMode ? "bg-emerald-500" : r ? "bg-zinc-700" : "bg-zinc-300"}`,
              onClick: Ee => {
                var xe;
                Ee.stopPropagation(), a(e.id, {
                  settings: {
                    ...e.settings,
                    veoFramesMode: !((xe = e.settings) != null && xe.veoFramesMode)
                  }
                });
              },
              onMouseDown: Ee => Ee.stopPropagation(),
              children: c.jsx("div", {
                className: `w-3 h-3 rounded-full bg-white transition-transform ${(Z = e.settings) != null && Z.veoFramesMode ? "translate-x-4" : "translate-x-0.5"}`
              })
            })]
          }), f(((re = e.settings) == null ? void 0 : re.model) || "") && !p(((fe = e.settings) == null ? void 0 : fe.model) || "") && c.jsxs("div", {
            className: "flex items-center justify-between",
            children: [c.jsx("span", {
              className: `text-[10px] ${r ? "text-zinc-400" : "text-zinc-600"}`,
              children: x("启用首尾帧")
            }), c.jsx("button", {
              className: `w-8 h-4 rounded-full transition-colors ${(ye = e.settings) != null && ye.veoFramesMode ? "bg-emerald-500" : r ? "bg-zinc-700" : "bg-zinc-300"}`,
              onClick: Ee => {
                var xe;
                Ee.stopPropagation(), a(e.id, {
                  settings: {
                    ...e.settings,
                    veoFramesMode: !((xe = e.settings) != null && xe.veoFramesMode)
                  }
                });
              },
              onMouseDown: Ee => Ee.stopPropagation(),
              children: c.jsx("div", {
                className: `w-3 h-3 rounded-full bg-white transition-transform ${(ie = e.settings) != null && ie.veoFramesMode ? "translate-x-4" : "translate-x-0.5"}`
              })
            })]
          }), c.jsx("div", {
            children: c.jsx("textarea", {
              ref: j,
              "data-node-id": e.id,
              "data-scrollable": "true",
              value: K,
              readOnly: Y,
              onChange: Ee => {
                Y || a(e.id, {
                  settings: {
                    ...e.settings,
                    videoPrompt: Ee.target.value
                  }
                });
              },
              placeholder: H ? x("提示词由上游节点提供") : G ? x("提示词由描述节点提供（当前：{0}{1}）", G.slice(0, 24), G.length > 24 ? "…" : "") : x("输入提示词..."),
              className: `w-full h-20 resize-none outline-none text-base p-3 rounded overflow-y-auto scrollbar-hide ${r ? "bg-[#1f1f1f]/50 text-zinc-200 placeholder-zinc-600" : "bg-transparent text-zinc-800 placeholder-zinc-400"}`,
              onMouseDown: Ee => Ee.stopPropagation()
            })
          }), e.content || (ae = e.settings) != null && ae.videoUrl ? c.jsx("div", {
            className: "relative w-full aspect-video bg-black rounded-lg overflow-hidden",
            children: c.jsx("video", {
              src: e.content || ((be = e.settings) == null ? void 0 : be.videoUrl),
              controls: !0,
              className: "w-full h-full object-contain",
              onMouseDown: Ee => Ee.stopPropagation(),
              onPlay: Ee => {
                const xe = Ee.currentTarget;
                xe.setAttribute("data-user-controlled", "true"), xe.setAttribute("data-user-playing", "true");
              },
              onPause: Ee => {
                const xe = Ee.currentTarget;
                xe.setAttribute("data-user-controlled", "true"), xe.setAttribute("data-user-playing", "false");
              }
            })
          }) : c.jsx("div", {
            className: `w-full aspect-video rounded border-2 border-dashed flex items-center justify-center ${r ? "border-zinc-700" : "border-zinc-300"}`,
            children: c.jsx("span", {
              className: `text-sm ${r ? "text-zinc-400" : "text-zinc-500"}`,
              children: x('点击"生成"按钮开始生成')
            })
          }), e.errorMsg && c.jsx("div", {
            className: "text-[10px] text-red-500",
            children: String(e.errorMsg)
          })]
        }), c.jsx("div", {
          className: `px-3 py-2 border-t shrink-0 ${r ? "border-zinc-800" : "border-zinc-200"}`,
          children: c.jsx("button", {
            className: `w-full py-2 rounded text-xs font-medium transition-colors ${R ? "bg-zinc-400 cursor-not-allowed text-white" : "bg-green-600 hover:bg-green-500 text-white"}`,
            disabled: R,
            onMouseDown: Ee => Ee.stopPropagation(),
            onClick: () => {
              var ke, ve, Te;
              const Ee = N.trim() || G;
              if (!Ee.trim() && !O.trim()) {
                alert(x("请输入视频提示词或连接上游文字节点/Agent节点"));
                return;
              }
              const xe = ((ke = e.settings) == null ? void 0 : ke.model) || "sora-2",
                he = o.find(Ne => Ne.id === xe);
              if (!he) {
                alert(x("请选择视频模型"));
                return;
              }
              if (!(he.key || s)) {
                alert(x("请配置API Key"));
                return;
              }
              console.log("[GenerateVideoNode] 使用的提示词:", Ee.substring(0, 100) + "...");
              const ge = ((ve = e.settings) == null ? void 0 : ve.duration) || u(xe),
                _e = ((Te = e.settings) == null ? void 0 : Te.ratio) || (h(xe) ? y[0] : "16:9");
              a(e.id, {
                prompt: Ee,
                settings: {
                  ...e.settings,
                  model: xe,
                  duration: ge,
                  ratio: _e,
                  videoPrompt: Ee,
                  ...(Q.length > 0 ? {
                    referenceImages: Q
                  } : {})
                }
              }), setTimeout(() => {
                E({
                  ...e,
                  prompt: Ee,
                  settings: {
                    ...e.settings,
                    model: xe,
                    duration: ge,
                    ratio: _e,
                    videoPrompt: Ee,
                    ...(Q.length > 0 ? {
                      referenceImages: Q
                    } : {})
                  }
                });
              }, 0);
            },
            children: x(R ? "生成中..." : "生成视频")
          })
        })]
      })
    });
  },
  Mvo = ({
    node: e,
    nodes: t,
    connections: n,
    isDark: r,
    updateNode: a,
    apiConfigs: i,
    globalApiKey: o,
    setCharacterLibrary: s
  }) => {
    var b, v, _, w, k, A, S, C, I, E;
    on();
    const l = e.type === "create-character",
      d = l ? "创建角色" : "创建场景",
      u = ((b = e.settings) == null ? void 0 : b.startSecond) ?? 1,
      h = ((v = e.settings) == null ? void 0 : v.endSecond) ?? 3,
      p = new Map(t.map(M => [M.id, M])),
      m = n.filter(M => M.to === e.id).map(M => p.get(M.from)).find(M => (M == null ? void 0 : M.type) === "generate-character-video" || (M == null ? void 0 : M.type) === "generate-scene-video"),
      f = ((_ = m == null ? void 0 : m.settings) == null ? void 0 : _.videoUrl) || (m == null ? void 0 : m.content) || "",
      y = async () => {
        var T;
        const M = ((T = e.settings) == null ? void 0 : T.name) || "";
        if (!M || M.trim().length === 0) {
          alert(x("请填写{0}名称", l ? "角色" : "场景"));
          return;
        }
        if (l) {
          const P = LYn(i, "auto"),
            R = (P == null ? void 0 : P.isFal) ?? !1;
          if (!R && (h - u < 1 || h - u > 3)) {
            alert(x("时间范围必须在 1-3 秒之间"));
            return;
          }
          if (!f) {
            alert(x("找不到关联的视频节点或视频URL"));
            return;
          }
          if (!P) {
            alert(x("未找到 Sora 模型配置，请先在设置中配置 Sora 2 / Fal 渠道"));
            return;
          }
          const {
              config: j
            } = P,
            B = j.key || o;
          if (!B) {
            alert(x("请先配置 API Key"));
            return;
          }
          const F = String(f).trim();
          if (!F.startsWith("http") || F.startsWith("blob:")) {
            alert(x("请提供可公网访问的 MP4 视频 URL"));
            return;
          }
          a(e.id, {
            settings: {
              ...e.settings,
              isCreating: !0,
              createProgress: 10,
              createError: null
            }
          });
          try {
            const N = (j.url || "https://ai.comfly.org").replace(/\/+$/, ""),
              G = OYn(N, R),
              z = R ? {
                video_url: F,
                name: M.trim()
              } : {
                url: F,
                timestamps: `${u},${h}`
              };
            a(e.id, {
              settings: {
                ...e.settings,
                isCreating: !0,
                createProgress: 50
              }
            });
            const V = await fetch(G, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${B}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify(z)
            });
            if (a(e.id, {
              settings: {
                ...e.settings,
                isCreating: !0,
                createProgress: 90
              }
            }), !V.ok) {
              const D = await V.text();
              throw new Error(`API错误 (${V.status}): ${D || V.statusText}`);
            }
            const O = await V.json();
            console.log("[Create Character Node] Success:", O), a(e.id, {
              settings: {
                ...e.settings,
                isCreating: !0,
                createProgress: 100
              }
            });
            const L = BYn(O);
            if (L) {
              const D = async Y => {
                if (!Y || Y.startsWith("data:")) return Y;
                try {
                  const W = await (await fetch(Y)).blob();
                  return new Promise(Q => {
                    const q = new FileReader();
                    q.onloadend = () => Q(q.result), q.onerror = () => Q(Y), q.readAsDataURL(W);
                  });
                } catch {
                  return Y;
                }
              };
              let U = L.imageUrl || "";
              if (U && U.startsWith("http")) try {
                U = await D(U), console.log("[角色库] 图片已转为本地DataURL");
              } catch (Y) {
                console.warn("[角色库] 图片转换失败，使用原URL:", Y);
              }
              const H = {
                id: L.id,
                name: L.name,
                imageUrl: U,
                description: String(O.permalink || "")
              };
              s(Y => {
                const K = [...Y, H];
                try {
                  localStorage.setItem("qiaodoumayi_characters", JSON.stringify(K));
                } catch (W) {
                  console.error("保存角色库失败:", W);
                }
                return K;
              }), setTimeout(() => {
                a(e.id, {
                  settings: {
                    ...e.settings,
                    isCreating: !1,
                    createProgress: 0,
                    createError: null
                  }
                }), alert(x('角色 "{0}" 创建成功！已添加到 Sora 角色库', L.name));
              }, 500);
            } else throw new Error("返回数据缺少 id 或角色名");
          } catch (N) {
            console.error("[Create Character Node] Failed:", N);
            const G = N.message || "创建失败";
            a(e.id, {
              settings: {
                ...e.settings,
                isCreating: !1,
                createProgress: 0,
                createError: G
              }
            }), alert(x("创建角色失败: {0}", G));
          }
        } else console.log("创建场景", {
          name: M,
          startSecond: u,
          endSecond: h
        }), alert(x("场景创建功能待实现"));
      };
    return c.jsxs("div", {
      className: `relative w-full h-full flex flex-col transition-colors pointer-events-auto ${r ? "bg-[#1f1f1f]/80" : "bg-zinc-100"}`,
      children: [c.jsxs("div", {
        className: `flex items-center gap-1.5 px-3 py-2 border-b text-xs font-semibold shrink-0 ${r ? "text-zinc-300 border-zinc-800" : "text-zinc-700 border-zinc-200"}`,
        children: [c.jsx(jY, {
          size: 12,
          className: l ? "text-blue-500" : "text-green-500"
        }), c.jsx("span", {
          children: x(d)
        })]
      }), c.jsxs("div", {
        className: "flex-1 flex flex-col gap-3 p-3 overflow-y-auto min-h-0",
        children: [c.jsxs("div", {
          children: [c.jsx("label", {
            className: "text-[10px] block mb-1 text-zinc-500",
            children: x(l ? "角色名称" : "场景名称")
          }), c.jsx("input", {
            type: "text",
            value: ((w = e.settings) == null ? void 0 : w.name) || "",
            onChange: M => a(e.id, {
              settings: {
                ...e.settings,
                name: M.target.value
              }
            }),
            placeholder: x(l ? "输入角色名称..." : "输入场景名称..."),
            className: `w-full px-2 py-1 rounded text-xs border ${r ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"}`,
            onMouseDown: M => M.stopPropagation()
          })]
        }), c.jsxs("div", {
          children: [c.jsx("label", {
            className: "text-[10px] block mb-1 text-zinc-500",
            children: x("时间范围（秒，间隔需在 1-3 秒之间）")
          }), c.jsxs("div", {
            className: "flex gap-2 items-center flex-wrap",
            children: [c.jsx("input", {
              type: "number",
              min: "0",
              step: "0.1",
              value: u,
              onChange: M => a(e.id, {
                settings: {
                  ...e.settings,
                  startSecond: parseFloat(M.target.value) || 0
                }
              }),
              className: `w-20 px-2 py-1 rounded text-xs border ${r ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"}`,
              onMouseDown: M => M.stopPropagation()
            }), c.jsx("span", {
              className: `text-xs ${r ? "text-zinc-400" : "text-zinc-500"}`,
              children: x("到")
            }), c.jsx("input", {
              type: "number",
              min: "0",
              step: "0.1",
              value: h,
              onChange: M => a(e.id, {
                settings: {
                  ...e.settings,
                  endSecond: parseFloat(M.target.value) || 0
                }
              }),
              className: `w-20 px-2 py-1 rounded text-xs border ${r ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"}`,
              onMouseDown: M => M.stopPropagation()
            }), c.jsxs("span", {
              className: `text-xs ${r ? "text-zinc-400" : "text-zinc-500"}`,
              children: [x("秒（间隔: "), (h - u).toFixed(1), "s）"]
            })]
          })]
        }), f ? c.jsx("div", {
          className: "relative w-full aspect-video bg-black rounded-lg overflow-hidden",
          children: c.jsx("video", {
            src: f,
            controls: !0,
            className: "w-full h-full object-contain",
            preload: "metadata",
            onMouseDown: M => M.stopPropagation()
          })
        }) : c.jsx("div", {
          className: `w-full aspect-video rounded border-2 border-dashed flex items-center justify-center ${r ? "border-zinc-700" : "border-zinc-300"}`,
          children: c.jsx("span", {
            className: `text-sm ${r ? "text-zinc-400" : "text-zinc-500"}`,
            children: x("请先在视频节点生成视频")
          })
        })]
      }), !!((k = e.settings) != null && k.isCreating) && c.jsxs("div", {
        className: `px-3 py-2 border-t shrink-0 ${r ? "border-zinc-800" : "border-zinc-200"}`,
        children: [c.jsx("div", {
          className: "flex items-center gap-2 mb-2",
          children: c.jsxs("div", {
            className: "flex-1",
            children: [c.jsxs("div", {
              className: "flex items-center justify-between mb-1",
              children: [c.jsxs("span", {
                className: "text-[10px] text-zinc-500",
                children: [x(d), x("中...")]
              }), c.jsx("span", {
                className: "text-[10px] text-zinc-500",
                children: `${Number(((A = e.settings) == null ? void 0 : A.createProgress) ?? 0)}%`
              })]
            }), c.jsx("div", {
              className: `w-full h-1.5 rounded-full overflow-hidden ${r ? "bg-zinc-800" : "bg-zinc-200"}`,
              children: c.jsx("div", {
                className: "h-full bg-blue-500 transition-all duration-300",
                style: {
                  width: `${((S = e.settings) == null ? void 0 : S.createProgress) || 0}%`
                }
              })
            })]
          })
        }), typeof ((C = e.settings) == null ? void 0 : C.createError) == "string" && e.settings.createError && c.jsx("div", {
          className: "text-[10px] text-red-500 mt-1",
          children: e.settings.createError
        })]
      }), c.jsx("div", {
        className: `px-3 py-2 border-t shrink-0 ${r ? "border-zinc-800" : "border-zinc-200"}`,
        children: c.jsxs("button", {
          className: `w-full py-2 rounded text-xs font-medium transition-colors ${(I = e.settings) != null && I.isCreating ? "bg-zinc-400 cursor-not-allowed text-white" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white"}`,
          disabled: !!((E = e.settings) != null && E.isCreating),
          onMouseDown: M => M.stopPropagation(),
          onClick: y,
          children: [x("创建"), x(l ? "角色" : "场景")]
        })
      })]
    });
  };

function Pvo({
  props: e,
  contentServices: t,
  displayQuality: n
}) {
  const {
      node: r
    } = e,
    {
      presentation: a
    } = gEe(t);
  switch (r.type) {
    case "novel-input":
      return c.jsx(xvo, {
        node: r,
        isDark: a.isDark,
        updateNode: e.updateNode,
        setNodes: e.setNodes,
        setConnections: e.setConnections,
        apiConfigs: e.apiConfigs
      });
    case "extract-characters-scenes":
      return c.jsx(_vo, {
        node: r,
        isDark: a.isDark,
        updateNode: e.updateNode,
        setNodes: e.setNodes,
        setConnections: e.setConnections,
        apiConfigs: e.apiConfigs,
        globalApiKey: e.globalApiKey
      });
    case "character-description":
    case "scene-description":
      return c.jsx(kvo, {
        node: r,
        isDark: a.isDark,
        updateNode: e.updateNode,
        setNodes: e.setNodes,
        setConnections: e.setConnections,
        apiConfigs: e.apiConfigs,
        globalApiKey: e.globalApiKey
      });
    case "generate-character-image":
    case "generate-scene-image":
      return c.jsx(Evo, {
        node: r,
        nodes: e.nodes,
        connections: e.connections,
        isDark: a.isDark,
        updateNode: e.updateNode,
        setNodes: e.setNodes,
        setHistory: e.setHistory,
        apiConfigs: e.apiConfigs,
        globalApiKey: e.globalApiKey,
        connectingSource: e.connectingSource,
        connectingTarget: e.connectingTarget,
        connectingInputType: e.connectingInputType,
        setConnectingSource: e.setConnectingSource,
        setConnectingTarget: e.setConnectingTarget,
        setConnectingInputType: e.setConnectingInputType,
        setConnections: e.setConnections,
        setMousePos: e.setMousePos,
        canvasRef: e.canvasRef,
        view: a.view,
        getConnectedImageForInput: e.getConnectedImageForInput,
        generate: e.generate,
        generateId: e.generateId
      });
    case "generate-character-video":
    case "generate-scene-video":
      return c.jsx(Tvo, {
        node: r,
        nodes: e.nodes,
        connections: e.connections,
        isDark: a.isDark,
        updateNode: e.updateNode,
        setHistory: e.setHistory,
        apiConfigs: e.apiConfigs,
        globalApiKey: e.globalApiKey,
        characterLibrary: e.characterLibrary,
        getDurationsForModel: ih,
        getDefaultDurationForModel: Gj,
        isGrokVideoModel: PE,
        isVeoModel: Ex,
        isHailuoModel: bx,
        supportsStartEndFrames: J2,
        GROK_VIDEO_RATIOS: KMt,
        connectingSource: e.connectingSource,
        connectingTarget: e.connectingTarget,
        connectingInputType: e.connectingInputType,
        setConnectingTarget: e.setConnectingTarget,
        setConnectingInputType: e.setConnectingInputType,
        setMousePos: e.setMousePos,
        canvasRef: e.canvasRef,
        view: a.view,
        getConnectedImageForInput: e.getConnectedImageForInput,
        generate: e.generate
      });
    case "create-character":
    case "create-scene":
      return c.jsx(Mvo, {
        node: r,
        nodes: e.nodes,
        connections: e.connections,
        isDark: a.isDark,
        updateNode: e.updateNode,
        apiConfigs: e.apiConfigs,
        globalApiKey: e.globalApiKey,
        setCharacterLibrary: e.setCharacterLibrary
      });
    default:
      return null;
  }
}

const Rvo = Object.freeze(Object.defineProperty({
  __proto__: null,
  LegacyGenNodesGroup: Pvo
}, Symbol.toStringTag, {
  value: "Module"
}));

async function lue(e, t, n, r = !1, a = !1) {
  let i, o;
  if (a) i = t, o = n;else {
    const f = e.aspectRatio.split(":").map(Number),
      y = f.length === 2 ? f[0] / f[1] : 1,
      b = 1024;
    y >= 1 ? (i = b, o = Math.round(b / y)) : (o = b, i = Math.round(b * y));
  }
  const s = document.createElement("canvas");
  s.width = i, s.height = o;
  const l = s.getContext("2d");
  if (!l) return "";
  let d, u, h, p, m;
  if (a) d = 1, p = t, m = n, u = 0, h = 0;else {
    const f = i / t,
      y = o / n;
    d = Math.min(f, y), p = t * d, m = n * d, u = (i - p) / 2, h = (o - m) / 2;
  }
  if (r) return l.fillStyle = "black", l.fillRect(0, 0, i, o), e.maskStrokes && e.maskStrokes.forEach(f => {
    l.beginPath(), l.strokeStyle = "white", l.lineWidth = f.width * d, l.lineCap = "round", l.lineJoin = "round", f.points.forEach((y, b) => {
      const v = (f.x + y.x) * d + u,
        _ = (f.y + y.y) * d + h;
      b === 0 ? l.moveTo(v, _) : l.lineTo(v, _);
    }), l.stroke();
  }), s.toDataURL("image/png");
  {
    l.fillStyle = e.backgroundColor === "transparent" ? "#171717" : e.backgroundColor || "#171717", l.fillRect(0, 0, i, o);
    const f = e.layers || [],
      y = new Map(f.map(_ => [_.id, _])),
      b = [];
    e.images.forEach(_ => {
      const w = _.layerId ? y.get(_.layerId) : null;
      (!_.layerId || (w == null ? void 0 : w.visible) !== !1) && b.push({
        type: "image",
        data: _,
        layerId: _.layerId,
        zIndex: (w == null ? void 0 : w.zIndex) ?? 0
      });
    }), e.strokes.forEach(_ => {
      const w = _.layerId ? y.get(_.layerId) : null;
      (!_.layerId || (w == null ? void 0 : w.visible) !== !1) && b.push({
        type: "stroke",
        data: _,
        layerId: _.layerId,
        zIndex: (w == null ? void 0 : w.zIndex) ?? 0
      });
    }), e.textElements.forEach(_ => {
      const w = _.layerId ? y.get(_.layerId) : null;
      (!_.layerId || (w == null ? void 0 : w.visible) !== !1) && b.push({
        type: "text",
        data: _,
        layerId: _.layerId,
        zIndex: (w == null ? void 0 : w.zIndex) ?? 0
      });
    }), (e.shapes || []).forEach(_ => {
      const w = _.layerId ? y.get(_.layerId) : null;
      (!_.layerId || (w == null ? void 0 : w.visible) !== !1) && b.push({
        type: "shape",
        data: _,
        layerId: _.layerId,
        zIndex: (w == null ? void 0 : w.zIndex) ?? 0
      });
    }), (e.stickFigures || []).forEach(_ => {
      const w = _.layerId ? y.get(_.layerId) : null;
      (!_.layerId || (w == null ? void 0 : w.visible) !== !1) && b.push({
        type: "stickFigure",
        data: _,
        layerId: _.layerId,
        zIndex: (w == null ? void 0 : w.zIndex) ?? 0
      });
    }), b.sort((_, w) => _.zIndex - w.zIndex);
    const v = e.images.length > 0;
    for (const _ of b) switch (_.type) {
      case "image":
        {
          const w = _.data,
            k = new Image();
          if (k.crossOrigin = "anonymous", await new Promise(A => {
            k.onload = A, k.onerror = A, k.src = w.src;
          }), k.complete && k.naturalWidth > 0) {
            l.save(), l.globalAlpha = w.opacity;
            const A = w.x * d + u,
              S = w.y * d + h,
              C = w.width * d,
              I = w.height * d,
              E = w.contentX ?? 0,
              M = w.contentY ?? 0,
              T = w.contentWidth !== void 0 && w.contentHeight !== void 0 && (w.contentWidth > w.width * 1.1 || w.contentHeight > w.height * 1.1);
            let P, R;
            T ? (P = (w.contentWidth ?? k.naturalWidth) * (k.naturalWidth / (w.contentWidth ?? w.width)), R = (w.contentHeight ?? k.naturalHeight) * (k.naturalHeight / (w.contentHeight ?? w.height)), P = Math.min(P, k.naturalWidth), R = Math.min(R, k.naturalHeight)) : (P = k.naturalWidth, R = k.naturalHeight);
            const j = (w.rotation ?? 0) * (Math.PI / 180),
              B = w.flipHorizontal === !0,
              F = w.flipVertical === !0,
              N = A + C / 2,
              G = S + I / 2;
            l.translate(N, G), j !== 0 && l.rotate(j), (B || F) && l.scale(B ? -1 : 1, F ? -1 : 1), l.translate(-C / 2, -I / 2), l.drawImage(k, E, M, P, R, 0, 0, C, I), l.restore();
          }
          break;
        }
      case "stroke":
        {
          const w = _.data;
          l.beginPath(), l.strokeStyle = w.color, l.lineWidth = w.width * d, l.lineCap = "round", l.lineJoin = "round";
          const k = v ? w.opacity * .6 : w.opacity;
          l.globalAlpha = k, w.points.forEach((A, S) => {
            const C = (w.x + A.x) * d + u,
              I = (w.y + A.y) * d + h;
            S === 0 ? l.moveTo(C, I) : l.lineTo(C, I);
          }), l.stroke();
          break;
        }
      case "text":
        {
          const w = _.data;
          l.globalAlpha = w.opacity, l.fillStyle = w.color;
          let k;
          switch (w.fontSize) {
            case "XL":
              k = 36;
              break;
            case "L":
              k = 24;
              break;
            case "S":
              k = 14;
              break;
            case "M":
            default:
              k = 16;
              break;
          }
          const A = w.scale ?? 1,
            S = k * A * d;
          l.font = `${S}px ${w.fontFamily === "mono" ? "monospace" : w.fontFamily === "serif" ? "serif" : w.fontFamily === "script" ? "cursive" : "sans-serif"}`, l.textAlign = w.align, l.fillText(w.content, w.x * d + u, w.y * d + h);
          break;
        }
      case "shape":
        {
          const w = _.data;
          l.save(), l.globalAlpha = w.opacity;
          const k = w.x * d + u,
            A = w.y * d + h,
            S = w.width * d,
            C = w.height * d;
          switch (l.translate(k + S / 2, A + C / 2), l.rotate(w.rotation * Math.PI / 180), l.translate(-(k + S / 2), -(A + C / 2)), w.fillMode === "fill" ? l.fillStyle = w.color : (l.strokeStyle = w.color, l.lineWidth = w.strokeWidth * d), w.type) {
            case "rectangle":
              w.fillMode === "fill" ? l.fillRect(k, A, S, C) : l.strokeRect(k, A, S, C);
              break;
            case "circle":
              l.beginPath(), l.ellipse(k + S / 2, A + C / 2, S / 2, C / 2, 0, 0, 2 * Math.PI), w.fillMode === "fill" ? l.fill() : l.stroke();
              break;
            case "triangle":
              l.beginPath(), l.moveTo(k + S / 2, A), l.lineTo(k + S, A + C), l.lineTo(k, A + C), l.closePath(), w.fillMode === "fill" ? l.fill() : l.stroke();
              break;
            case "line":
              l.beginPath(), l.moveTo(k, A), l.lineTo(k + S, A + C), l.stroke();
              break;
          }
          l.restore();
          break;
        }
      case "stickFigure":
        {
          const w = _.data;
          l.save(), l.globalAlpha = w.opacity, l.strokeStyle = w.color, l.lineWidth = w.strokeWidth * d, l.lineCap = "round";
          const k = w.x * d + u,
            A = w.y * d + h,
            S = w.scale * d;
          l.beginPath(), l.arc(k + w.joints.head.x * S, A + w.joints.head.y * S, 10 * S, 0, 2 * Math.PI), l.stroke();
          const C = (I, E) => {
            l.beginPath(), l.moveTo(k + w.joints[I].x * S, A + w.joints[I].y * S), l.lineTo(k + w.joints[E].x * S, A + w.joints[E].y * S), l.stroke();
          };
          C("neck", "waist"), C("neck", "leftShoulder"), C("leftShoulder", "leftElbow"), C("leftElbow", "leftHand"), C("neck", "rightShoulder"), C("rightShoulder", "rightElbow"), C("rightElbow", "rightHand"), C("waist", "leftHip"), C("leftHip", "leftKnee"), C("leftKnee", "leftFoot"), C("waist", "rightHip"), C("rightHip", "rightKnee"), C("rightKnee", "rightFoot"), l.restore();
          break;
        }
    }
    return s.toDataURL("image/png");
  }
}

async function Nvo(e) {
  return await (await fetch(e)).blob();
}

async function Mvr(e, t, n, r, a, i) {
  const o = Math.max(1, r.width),
    s = Math.max(1, r.height),
    l = Math.max(1, Math.round(a)),
    d = Math.max(1, Math.round(i)),
    u = await lue(e, Math.max(1, Math.round(t)), Math.max(1, Math.round(n)), !1, !0);
  return u ? new Promise(h => {
    const p = new Image();
    p.onload = () => {
      const m = Math.max(0, Math.min(p.width - 1, Math.round(r.x))),
        f = Math.max(0, Math.min(p.height - 1, Math.round(r.y))),
        y = Math.max(1, Math.min(p.width - m, Math.round(o))),
        b = Math.max(1, Math.min(p.height - f, Math.round(s))),
        v = document.createElement("canvas");
      v.width = l, v.height = d;
      const _ = v.getContext("2d");
      if (!_) {
        h(null);
        return;
      }
      _.drawImage(p, m, f, y, b, 0, 0, l, d), v.toBlob(w => h(w), "image/png");
    }, p.onerror = () => h(null), p.src = u;
  }) : null;
}

function Pvr(e, t) {
  const n = (t ? e.find(r => r.id === t) : void 0) || e.find(r => /^imported-.+-\d+$/.test(r.id)) || e[0];
  return !n || !(n.width > 0) || !(n.height > 0) ? null : {
    x: n.x,
    y: n.y,
    width: n.width,
    height: n.height
  };
}

const O0n = Object.freeze(Object.defineProperty({
    __proto__: null,
    drawCanvasRegionToBlob: Mvr,
    drawCanvasToImage: lue,
    getBlobFromDataURL: Nvo,
    pickCanvasExportImageRegion: Pvr
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  jvo = .1,
  Rvr = 50;

function Nvr(e) {
  return Number.isFinite(e) ? Math.min(100, Math.max(0, e)) : Rvr;
}

function jvr(e) {
  return Math.round(Nvr(e) * 10) / 10;
}

function B0n(e) {
  const t = e == null ? void 0 : e.comparePos;
  return typeof t == "number" ? Nvr(t) : Rvr;
}

function Dvr(e, t, n) {
  if (t.width <= 0) return null;
  const r = Math.min(t.width, Math.max(0, e - t.left)),
    a = jvr(r / t.width * 100);
  return Math.abs(a - n) < jvo ? null : a;
}

function W$e(e, t) {
  return jvr(e + t);
}

function Dvo(e, t) {
  const n = e[0],
    r = e[1],
    a = !!r,
    i = Math.max(0, e.length - 2);
  return {
    left: t && a ? r : n,
    right: a ? t ? n : r : n,
    hasSecond: a,
    extraCount: i
  };
}

function Lvo(e, t) {
  return e.filter(n => n.to === t && (!n.inputType || n.inputType === "default")).length;
}

function Ovo(e, t) {
  return t <= 0 && !String(e || "").trim();
}

function Bvo(e, t) {
  return t > 0 && !String(e || "").trim();
}

const Fvo = ["slider", "sideBySide", "overlay", "tap"];

function zvo(e) {
  const t = e == null ? void 0 : e.compareMode;
  return t === "difference" ? "tap" : Fvo.includes(t) ? t : "slider";
}

function Uvo(e) {
  return e === "slider" || e === "overlay";
}

function $vo(e, t, n) {
  return e > 0 && t > 0 && n > 0 && Number.isFinite(n) ? e / t > n ? {
    width: t * n,
    height: t
  } : {
    width: e,
    height: e / n
  } : {
    width: Math.max(0, e),
    height: Math.max(0, t)
  };
}

const Gvo = 52,
  Vvo = [{
    id: "slider",
    label: "滑动对比",
    icon: c.jsx(kf, {
      size: 16
    })
  }, {
    id: "sideBySide",
    label: "并排对比",
    icon: c.jsx($En, {
      size: 16
    })
  }, {
    id: "overlay",
    label: "叠加对比",
    icon: c.jsx(ul, {
      size: 16
    })
  }, {
    id: "tap",
    label: "点按",
    icon: c.jsx(ac, {
      size: 16
    })
  }];

function Hvo({
  isSelected: e,
  isDark: t,
  canvasZoomMediaOpacity: n,
  mode: r,
  onModeChange: a,
  onFullscreen: i
}) {
  on();
  const o = g.useRef(null);
  Qp(o, "50% 100%", !0);
  const s = $P(t);
  return c.jsx("div", {
    className: "pointer-events-auto absolute left-1/2 bottom-full z-[120] -translate-x-1/2 transition-opacity duration-200 ease-out",
    "data-image-compare-toolbar": !0,
    onClick: l => l.stopPropagation(),
    onPointerDown: l => l.stopPropagation(),
    onMouseDown: l => l.stopPropagation(),
    onDoubleClick: l => {
      l.preventDefault(), l.stopPropagation();
    },
    style: {
      marginBottom: `${Gvo}px`,
      opacity: n,
      pointerEvents: e ? "auto" : "none"
    },
    children: c.jsx("div", {
      ref: o,
      style: {
        transition: "none",
        willChange: "transform"
      },
      children: c.jsx("div", {
        className: `transition-all duration-150 ${e ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-1 scale-[0.98] pointer-events-none"}`,
        onClick: l => l.stopPropagation(),
        onPointerDown: l => l.stopPropagation(),
        onMouseDown: l => l.stopPropagation(),
        children: c.jsxs("div", {
          "data-canvas-float-toolbar": "",
          className: UP(t),
          children: [Vvo.map(l => c.jsx("button", {
            type: "button",
            className: s,
            "data-tip": l.label,
            "data-toolbar-active": r === l.id ? "true" : "false",
            "aria-label": l.label,
            "aria-pressed": r === l.id,
            onClick: () => a(l.id),
            children: l.icon
          }, l.id)), c.jsx("button", {
            type: "button",
            className: s,
            "data-tip": x("全屏"),
            "aria-label": x("全屏"),
            onClick: i,
            children: c.jsx(kT, {
              size: 16
            })
          })]
        })
      })
    })
  });
}

const q$e = "canvas-node:",
  K$e = "@asset:";

function TPe(e) {
  return !e || !e.startsWith(q$e) ? null : e.slice(q$e.length);
}

function MPe(e) {
  return !e || !e.startsWith(K$e) ? null : e.slice(K$e.length);
}

function sge(e) {
  const t = String(e || "").trim();
  return t ? nr(t) || /^https?:\/\//i.test(t) ? !1 : t.startsWith(q$e) || t.startsWith(K$e) || t.startsWith(Ld) || !!AE(t) : !0;
}

function nbe(e) {
  return !e || e.startsWith(q$e) || e.startsWith(K$e) || e.startsWith(Ld) ? e : e.startsWith("data:image") || e.startsWith("data:") && e.includes("image/") ? NS(e) : e;
}

function Kct(e, t, n) {
  const r = nbe(t);
  if (n.startsWith("data:") && r.startsWith("blob:") && (e.current.push(r), e.current.length > 40)) {
    const a = e.current.shift();
    a && a.startsWith("blob:") && x0(a);
  }
  return r;
}

const Wvo = ({
    node: e,
    updateNode: t,
    getConnectedInputImages: n,
    nodes: r,
    connections: a = [],
    dataVersion: i = 0,
    nodeDirtyVersion: o = 0,
    isDark: s,
    isCompactMode: l = !1,
    onCompactModeImageClick: d,
    isSelected: u = !1,
    viewZoom: h = 1
  }) => {
    var We, Ze;
    on();
    const p = g.useRef(r);
    p.current = r;
    const m = g.useRef(null),
      f = g.useRef(null),
      y = g.useRef(null),
      [b, v] = g.useState(!1),
      _ = g.useRef(!1);
    _.current = b;
    const w = g.useRef(e.settings);
    w.current = e.settings;
    const k = g.useMemo(() => Lvo(a, e.id), [a, e.id]),
      A = g.useMemo(() => n(e.id), [n, e.id, i, o, k]),
      S = !!((We = e.settings) != null && We.compareSwapped),
      {
        left: C,
        right: I,
        hasSecond: E,
        extraCount: M
      } = g.useMemo(() => Dvo(A, S), [A, S]),
      T = Bvo(C, k),
      {
        content: P,
        isLoading: R
      } = Kp(C, {
        shouldLoadContent: !!C,
        nodeType: "input-image",
        useOriginal: !1,
        preferConstantDisplay: !0,
        allowDirectOssUrl: !0,
        canvasNodeId: e.id,
        ossMapPriority: "high"
      }),
      {
        content: j,
        isLoading: B
      } = Kp(E ? I : C, {
        shouldLoadContent: !!(E ? I : C),
        nodeType: "input-image",
        useOriginal: !1,
        preferConstantDisplay: !0,
        allowDirectOssUrl: !0,
        canvasNodeId: e.id,
        ossMapPriority: "high"
      }),
      F = P !== void 0 ? P : C && Er.isContentRef(C) ? "" : C,
      N = E ? j !== void 0 ? j : I && Er.isContentRef(I) ? "" : I : F,
      G = !!F && (TPe(F) !== null || N && TPe(N) !== null),
      z = !!F && (MPe(F) !== null || N && MPe(N) !== null),
      V = !!F && (!!Pk(F) || !!AE(F) || !!(N && Pk(N)) || !!(N && AE(N)) || ei() && (!!yy(F, void 0) || !!(N && yy(N, void 0)))),
      [O, L] = g.useState(""),
      [D, U] = g.useState(""),
      [H, Y] = g.useState(!1),
      [K, W] = g.useState(!1),
      [Q, q] = g.useState(!1),
      [ne, de] = g.useState(null),
      [le, J] = g.useState(null),
      [pe, ce] = g.useState(null),
      we = g.useRef([]),
      X = g.useRef(0),
      Z = (Ge = new Set()) => {
        const Oe = [];
        we.current.forEach(st => {
          if (Ge.has(st)) {
            Oe.push(st);
            return;
          }
          x0(st);
        }), we.current = Oe;
      };
    g.useEffect(() => () => Z(), []);
    const re = G ? i : -1;
    g.useEffect(() => {
      if (!C) {
        if (T) {
          Y(!0);
          return;
        }
        Z(), L(""), U(""), Y(!1);
        return;
      }
      if (F === "" || N === "" && F !== N) return;
      const Ge = ++X.current,
        Oe = async lt => {
          var Yt;
          const gt = TPe(lt);
          if (!gt) return nbe(lt);
          const _t = p.current.find(qe => qe.id === gt && qe.type === "canvas-node"),
            At = (Yt = _t == null ? void 0 : _t.settings) == null ? void 0 : Yt.canvasData;
          if (!_t || !At) return lt;
          try {
            const qe = await lue(At, _t.width, _t.height, !1, !0);
            if (!qe) return lt;
            const kt = nbe(qe);
            return qe.startsWith("data:") && kt.startsWith("blob:") && we.current.push(kt), kt;
          } catch {
            return lt;
          }
        },
        st = async lt => {
          const gt = MPe(lt);
          if (!gt) return nbe(lt);
          try {
            return (await ni.getAssetUrl(gt)) || lt;
          } catch {
            return lt;
          }
        },
        vt = async lt => {
          const gt = yy(lt, void 0);
          if (!gt) return nbe(lt);
          try {
            await Ur.ensureRestored();
            const Ut = Ur.getCachedAssetUrlSync(gt) || Ur.getCachedAssetUrlSync(`preview_${gt}`) || "",
              {
                readLocalOriginalAssetAsUrl: _t,
                resolveLocalCachedDisplayUrls: At
              } = await Ie(async () => {
                const {
                  readLocalOriginalAssetAsUrl: St,
                  resolveLocalCachedDisplayUrls: hn
                } = await Promise.resolve().then(() => Ui);
                return {
                  readLocalOriginalAssetAsUrl: St,
                  resolveLocalCachedDisplayUrls: hn
                };
              }, void 0, import.meta.url),
              Yt = await _t(gt);
            if (Yt && !sge(Yt)) {
              if (Yt.startsWith("blob:")) try {
                const {
                  registerDisplayUrlAssetId: St
                } = await Ie(async () => {
                  const {
                    registerDisplayUrlAssetId: hn
                  } = await Promise.resolve().then(() => No);
                  return {
                    registerDisplayUrlAssetId: hn
                  };
                }, void 0, import.meta.url);
                St(Yt, gt);
              } catch {}
              return Yt;
            }
            const qe = await At(gt, {
                allowOriginalAsDisplay: !0
              }),
              kt = (qe == null ? void 0 : qe.originalUrl) || (qe == null ? void 0 : qe.displayUrl) || Ut || "";
            if (kt && kt.startsWith("blob:")) try {
              const {
                registerDisplayUrlAssetId: St
              } = await Ie(async () => {
                const {
                  registerDisplayUrlAssetId: hn
                } = await Promise.resolve().then(() => No);
                return {
                  registerDisplayUrlAssetId: hn
                };
              }, void 0, import.meta.url);
              St(kt, gt);
            } catch {}
            return kt || "";
          } catch {
            return "";
          }
        },
        Ht = async lt => TPe(lt) ? Oe(lt) : MPe(lt) ? st(lt) : Pk(lt) || AE(lt) || ei() && yy(lt, void 0) ? vt(lt) : Kct(we, lt, lt);
      if (!(G || z || V)) {
        const lt = Kct(we, F, F),
          gt = N && N !== F ? Kct(we, N, N) : lt;
        Z(new Set([lt, gt].filter(Ut => Ut.startsWith("blob:")))), L(lt), U(gt), Y(!1);
        return;
      }
      if (V) {
        const lt = _t => {
            const At = yy(_t, void 0);
            return At && (Ur.getCachedAssetUrlSync(At) || Ur.getCachedAssetUrlSync(`preview_${At}`)) || "";
          },
          gt = lt(F),
          Ut = N && N !== F ? lt(N) : gt;
        gt && L(_t => _t && !sge(_t) ? _t : gt), Ut && U(_t => _t && !sge(_t) ? _t : Ut);
      }
      Y(!0);
      const pt = window.setTimeout(() => {
        Ge === X.current && (V || Z(), (async () => {
          try {
            const [lt, gt] = await Promise.all([Ht(F), Ht(N || F)]);
            if (Ge !== X.current) return;
            lt && L(lt), (gt || lt) && U(gt || lt);
          } finally {
            Ge === X.current && Y(!1);
          }
        })());
      }, V ? 0 : 200);
      return () => {
        clearTimeout(pt);
      };
    }, [C, F, N, G, z, V, re, T]), g.useEffect(() => {
      W(!1);
    }, [O]), g.useEffect(() => {
      q(!1);
    }, [D]);
    const fe = Ge => Oe => {
        const st = Oe.currentTarget;
        if (st.naturalWidth > 0 && st.naturalHeight > 0) {
          const vt = st.naturalWidth / st.naturalHeight;
          Ge === 1 ? de(vt) : J(vt);
        }
      },
      ye = zvo(e.settings),
      ie = !!((Ze = e.settings) != null && Ze.compareTapShowB),
      ae = Uvo(ye);
    g.useEffect(() => {
      const Ge = y.current;
      if (!Ge) return;
      const Oe = (vt, Ht) => {
        if (ye === "sideBySide") {
          ce({
            width: vt,
            height: Ht
          });
          return;
        }
        const nn = ye === "tap" && ie ? le ?? ne : ne;
        ce(nn ? $vo(vt, Ht, nn) : {
          width: vt,
          height: Ht
        });
      };
      Oe(Ge.clientWidth, Ge.clientHeight);
      const st = new ResizeObserver(vt => {
        var nn;
        const Ht = (nn = vt[0]) == null ? void 0 : nn.contentRect;
        Oe((Ht == null ? void 0 : Ht.width) || Ge.clientWidth, (Ht == null ? void 0 : Ht.height) || Ge.clientHeight);
      });
      return st.observe(Ge), () => st.disconnect();
    }, [ne, le, ye, ie, C]);
    const be = y9(h),
      Ee = g.useCallback(Ge => {
        t(e.id, {
          settings: {
            ...w.current,
            compareMode: Ge
          }
        });
      }, [e.id, t]),
      xe = B0n(e.settings),
      [he, ue] = g.useState(null),
      [ge, _e] = g.useState(!1),
      ke = he ?? xe,
      ve = g.useRef(null),
      Te = g.useRef(null),
      Ne = g.useRef(null),
      me = g.useRef(ke);
    me.current = ke;
    const Ae = g.useCallback(Ge => {
        Math.abs(Ge - B0n(w.current)) < .1 || t(e.id, {
          settings: {
            ...w.current,
            comparePos: Ge
          }
        });
      }, [e.id, t]),
      Fe = g.useCallback(() => {
        Ne.current = null, Te.current != null && (ve.current = Te.current, ue(Te.current));
      }, []),
      Me = g.useCallback(Ge => {
        const Oe = _.current ? f.current : m.current;
        return Oe ? Dvr(Ge, Oe.getBoundingClientRect(), me.current) : null;
      }, []),
      Re = g.useCallback(Ge => {
        const Oe = Me(Ge);
        Oe == null || Te.current === Oe || (Te.current = Oe, Ne.current == null && (Ne.current = requestAnimationFrame(Fe)));
      }, [Me, Fe]),
      $e = g.useCallback(() => {
        _e(!1), Ne.current != null && (cancelAnimationFrame(Ne.current), Ne.current = null);
        const Ge = Te.current ?? ve.current;
        Te.current = null, ve.current = null, ue(null), Ge != null && Ae(Ge);
      }, [Ae]),
      rt = g.useCallback(Ge => {
        const Oe = Me(Ge) ?? me.current;
        Te.current = Oe, ve.current = Oe, ue(Oe), _e(!0);
      }, [Me]);
    g.useEffect(() => {
      if (!ge) return;
      const Ge = vt => Re(vt.clientX),
        Oe = vt => {
          const Ht = vt.touches[0];
          Ht && (vt.cancelable && vt.preventDefault(), Re(Ht.clientX));
        },
        st = () => $e();
      return window.addEventListener("mousemove", Ge), window.addEventListener("mouseup", st, !0), window.addEventListener("touchmove", Oe, {
        passive: !1
      }), window.addEventListener("touchend", st, !0), window.addEventListener("touchcancel", st, !0), () => {
        window.removeEventListener("mousemove", Ge), window.removeEventListener("mouseup", st, !0), window.removeEventListener("touchmove", Oe), window.removeEventListener("touchend", st, !0), window.removeEventListener("touchcancel", st, !0);
      };
    }, [ge, Re, $e]), g.useEffect(() => () => {
      Ne.current != null && cancelAnimationFrame(Ne.current);
    }, []), g.useEffect(() => {
      if (!b) return;
      const Ge = Oe => {
        Oe.key === "Escape" && v(!1);
      };
      return window.addEventListener("keydown", Ge), () => window.removeEventListener("keydown", Ge);
    }, [b]);
    const nt = (R || B) && (Er.isContentRef(C) || I && Er.isContentRef(I)),
      ze = Ge => {
        Ge.button === 0 && (Ge.stopPropagation(), Ge.preventDefault(), rt(Ge.clientX));
      },
      Le = Ge => {
        var st;
        const Oe = (st = Ge.touches) == null ? void 0 : st[0];
        Oe && (Ge.stopPropagation(), rt(Oe.clientX));
      },
      Ke = Ge => {
        const Oe = Ge.shiftKey ? 10 : 1;
        let st = null;
        if (Ge.key === "ArrowLeft") st = W$e(ke, -Oe);else if (Ge.key === "ArrowRight") st = W$e(ke, Oe);else if (Ge.key === "Home") st = 0;else if (Ge.key === "End") st = 100;else return;
        Ge.preventDefault(), Ge.stopPropagation(), Ae(st);
      },
      Xe = Ge => {
        Ge.stopPropagation(), Ge.preventDefault(), t(e.id, {
          settings: {
            ...w.current,
            compareSwapped: !S
          }
        });
      },
      De = Ge => {
        Ge.stopPropagation(), Ge.preventDefault(), t(e.id, {
          settings: {
            ...w.current,
            compareTapShowB: !ie
          }
        });
      };
    if (Ovo(C, k)) return c.jsxs("div", {
      className: "w-full h-full flex flex-col items-center justify-center text-zinc-500 bg-[#1f1f1f]/50 rounded-lg border border-zinc-800 border-dashed pointer-events-none",
      children: [c.jsx(CNr, {
        size: 24,
        className: "mb-2 opacity-50"
      }), c.jsx("span", {
        className: "text-xs font-medium",
        children: x("连接图片以对比")
      })]
    });
    const Ye = !!O && !sge(O) && !K,
      Ce = !!D && !sge(D) && !Q,
      He = K && !Ye || Q && !Ce,
      Ve = () => {
        if (ye === "tap") {
          const Ge = ie && Ce,
            Oe = Ge ? D : O,
            st = Ge ? Ce : Ye;
          return c.jsxs(c.Fragment, {
            children: [st && c.jsx("img", {
              src: Oe,
              decoding: "async",
              className: "absolute inset-0 h-full w-full object-contain pointer-events-none",
              draggable: !1,
              alt: "",
              onLoad: fe(Ge ? 2 : 1),
              onError: () => Ge ? q(!0) : W(!0)
            }), c.jsx("button", {
              type: "button",
              className: "absolute inset-0 z-20 cursor-pointer bg-transparent border-0 p-0",
              "aria-label": x("点按切换对比图"),
              onClick: De,
              onMouseDown: vt => vt.stopPropagation()
            })]
          });
        }
        return ye === "sideBySide" ? c.jsxs("div", {
          className: "absolute inset-0 flex items-center justify-center gap-0 pointer-events-none",
          children: [c.jsx("div", {
            className: "relative flex h-full min-w-0 flex-1 items-center justify-center overflow-hidden",
            children: Ye && c.jsx("img", {
              src: O,
              decoding: "async",
              className: "block max-h-full max-w-full object-contain",
              draggable: !1,
              alt: "",
              onLoad: fe(1),
              onError: () => W(!0)
            })
          }), c.jsx("div", {
            className: "relative flex h-full min-w-0 flex-1 items-center justify-center overflow-hidden",
            children: Ce && c.jsx("img", {
              src: D,
              decoding: "async",
              className: "block max-h-full max-w-full object-contain",
              draggable: !1,
              alt: "",
              onLoad: fe(2),
              onError: () => q(!0)
            })
          })]
        }) : c.jsxs(c.Fragment, {
          children: [Ye && c.jsx("div", {
            className: "absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none",
            style: ye === "slider" ? {
              clipPath: `inset(0 ${100 - ke}% 0 0)`
            } : void 0,
            children: c.jsx("img", {
              src: O,
              decoding: "async",
              className: "absolute inset-0 w-full h-full object-cover",
              draggable: !1,
              alt: "",
              onLoad: fe(1),
              onError: () => W(!0)
            })
          }), Ce && c.jsx("div", {
            className: "absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none",
            style: ye === "slider" ? {
              clipPath: `inset(0 0 0 ${ke}%)`
            } : ye === "overlay" ? {
              opacity: ke / 100
            } : void 0,
            children: c.jsx("img", {
              src: D,
              decoding: "async",
              className: "absolute inset-0 w-full h-full object-cover",
              draggable: !1,
              alt: "",
              onLoad: fe(2),
              onError: () => q(!0)
            })
          })]
        });
      },
      it = () => ae ? c.jsxs(c.Fragment, {
        children: [c.jsxs("div", {
          className: "absolute bottom-0 top-0 z-10 pointer-events-none",
          style: {
            left: `${ke}%`
          },
          children: [c.jsx("div", {
            className: "absolute bottom-0 top-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.55)]",
            style: {
              left: "-1px"
            }
          }), c.jsx("div", {
            className: "absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/85 bg-black/40 shadow-xl backdrop-blur-sm transition-transform group-hover:scale-105",
            children: c.jsxs("div", {
              className: "flex items-center gap-0.5 text-[10px] font-bold text-white",
              children: [c.jsx("span", {
                children: "<"
              }), c.jsx("span", {
                children: ">"
              })]
            })
          })]
        }), c.jsx("button", {
          type: "button",
          "data-image-compare-slider": "1",
          role: "slider",
          tabIndex: 0,
          "aria-label": x(ye === "overlay" ? "叠加不透明度" : "对比分割位置"),
          "aria-valuemin": 0,
          "aria-valuemax": 100,
          "aria-valuenow": Math.round(ke),
          className: "absolute bottom-0 top-0 z-20 w-8 -translate-x-1/2 cursor-ew-resize touch-none bg-transparent border-0 p-0 pointer-events-auto",
          style: {
            left: `${ke}%`
          },
          onMouseDown: ze,
          onTouchStart: Le,
          onKeyDown: Ke,
          onClick: Ge => Ge.stopPropagation()
        })]
      }) : null,
      It = () => c.jsxs(c.Fragment, {
        children: [ye !== "tap" && c.jsx("div", {
          className: "absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-medium px-2 py-0.5 rounded border border-white/10 pointer-events-none",
          children: x("原始")
        }), ye === "tap" ? c.jsx("button", {
          type: "button",
          title: x(ie ? "当前：生成（点按切换）" : "当前：原始（点按切换）"),
          className: "nodrag absolute bottom-2 right-2 z-30 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white pointer-events-auto",
          onClick: De,
          onMouseDown: Ge => Ge.stopPropagation(),
          children: c.jsx(ul, {
            size: 14
          })
        }) : c.jsx("div", {
          className: `absolute bottom-2 right-2 text-white text-[10px] font-medium px-2 py-0.5 rounded border border-white/10 pointer-events-none ${E ? "bg-blue-600/80" : "bg-amber-600/80"}`,
          children: E ? ye === "overlay" ? `${Math.round(ke)}%` : x("生成") : x("需要第 2 路")
        })]
      }),
      Ft = () => c.jsxs(c.Fragment, {
        children: [c.jsx("div", {
          className: "absolute inset-0 opacity-20 pointer-events-none",
          style: {
            backgroundImage: "conic-gradient(#333 90deg, transparent 90deg), conic-gradient(transparent 90deg, #333 90deg)",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 10px 10px"
          }
        }), (H || nt || T) && (!Ye || !Ce) && c.jsx("div", {
          className: "absolute inset-0 flex items-center justify-center z-10 bg-black/30 pointer-events-none",
          children: c.jsx("span", {
            className: "text-[10px] text-zinc-400",
            children: x(V ? "正在加载本地图片…" : T ? "正在同步连线图片…" : H ? "正在生成画板预览…" : "正在加载原图…")
          })
        }), He && c.jsx("div", {
          className: "absolute inset-0 flex items-center justify-center z-10 bg-black/30 pointer-events-none",
          children: c.jsx("span", {
            className: "text-[10px] text-zinc-400",
            children: x("该输入不是图片")
          })
        })]
      });
    return c.jsxs("div", {
      className: `relative w-full h-full overflow-visible group rounded-lg select-none ${ge ? "cursor-ew-resize" : ""}`,
      onClick: Ge => {
        l && !Ge.ctrlKey && !Ge.metaKey && (d == null || d(e.id), Ge.stopPropagation());
      },
      children: [u && c.jsx(Hvo, {
        isSelected: u,
        isDark: s,
        canvasZoomMediaOpacity: be,
        mode: ye,
        onModeChange: Ee,
        onFullscreen: Ge => {
          Ge.stopPropagation(), v(!0);
        }
      }), c.jsxs("div", {
        className: "relative h-full w-full min-h-0 min-w-0 overflow-hidden rounded-2xl border border-zinc-800 bg-[#09090b] pointer-events-auto",
        children: [c.jsx("div", {
          ref: y,
          className: "absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none",
          children: c.jsxs("div", {
            ref: m,
            className: "relative max-h-full max-w-full overflow-hidden",
            style: pe && pe.width > 0 && pe.height > 0 ? {
              width: pe.width,
              height: pe.height
            } : {
              width: "100%",
              height: "100%"
            },
            children: [Ft(), Ve(), it(), It()]
          })
        }), !E && k < 2 && c.jsx("div", {
          className: "absolute top-2 left-1/2 z-30 -translate-x-1/2 rounded bg-black/70 px-2 py-0.5 text-[10px] font-medium text-zinc-300 border border-white/10 pointer-events-none",
          children: x("再连接一张图片开始对比")
        }), E && c.jsx("button", {
          type: "button",
          title: x("交换左右"),
          className: "nodrag absolute top-2 right-2 z-30 flex h-6 w-6 items-center justify-center rounded-md border border-white/15 bg-black/55 text-white/90 pointer-events-auto hover:bg-black/75",
          onClick: Xe,
          onMouseDown: Ge => Ge.stopPropagation(),
          children: c.jsx(nEt, {
            size: 12
          })
        }), M > 0 && c.jsxs("div", {
          className: "absolute top-2 left-2 z-30 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-zinc-300 border border-white/10 pointer-events-none",
          children: ["+", M]
        })]
      }), b && typeof document < "u" && Da.createPortal(c.jsxs("div", {
        className: "fixed inset-0 z-[400] bg-black/92",
        onMouseDown: Ge => {
          Ge.target === Ge.currentTarget && v(!1);
        },
        onKeyDown: Ge => {
          Ge.key === "Escape" && v(!1);
        },
        children: [c.jsx("button", {
          type: "button",
          className: "absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20",
          "aria-label": x("关闭全屏"),
          onClick: () => v(!1),
          children: c.jsx(Na, {
            size: 18
          })
        }), c.jsx("div", {
          className: "absolute inset-10 overflow-hidden rounded-xl border border-white/10 bg-[#09090b]",
          children: c.jsxs("div", {
            ref: f,
            className: "relative h-full w-full overflow-hidden",
            children: [Ft(), Ve(), it(), It()]
          })
        })]
      }), document.body)]
    });
  },
  qvo = 52;

function Kvo({
  isSelected: e,
  isDark: t,
  canvasZoomMediaOpacity: n,
  canExport: r,
  onDownload: a,
  onFullscreen: i
}) {
  on();
  const o = g.useRef(null);
  Qp(o, "50% 100%", !0);
  const s = $P(t);
  return c.jsx("div", {
    className: "pointer-events-auto absolute left-1/2 bottom-full z-[120] -translate-x-1/2 transition-opacity duration-200 ease-out",
    "data-image-tile-toolbar": !0,
    onClick: l => l.stopPropagation(),
    onPointerDown: l => l.stopPropagation(),
    onMouseDown: l => l.stopPropagation(),
    onDoubleClick: l => {
      l.preventDefault(), l.stopPropagation();
    },
    style: {
      marginBottom: `${qvo}px`,
      opacity: n,
      pointerEvents: e ? "auto" : "none"
    },
    children: c.jsx("div", {
      ref: o,
      style: {
        transition: "none",
        willChange: "transform"
      },
      children: c.jsx("div", {
        className: `transition-all duration-150 ${e ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-1 scale-[0.98] pointer-events-none"}`,
        children: c.jsxs("div", {
          "data-canvas-float-toolbar": "",
          className: UP(t),
          children: [c.jsx("button", {
            type: "button",
            className: s,
            "data-tip": x("下载当前视窗"),
            "data-download-button": "1",
            "aria-label": x("下载当前视窗"),
            disabled: !r,
            onClick: a,
            children: c.jsx(ws, {
              size: 16
            })
          }), c.jsx("button", {
            type: "button",
            className: s,
            "data-tip": x("全屏查看"),
            "aria-label": x("全屏查看"),
            disabled: !r,
            onClick: i,
            children: c.jsx(kT, {
              size: 16
            })
          })]
        })
      })
    })
  });
}

function Qvo(e) {
  return e ? e.startsWith("data:image") || e.startsWith("data:") && e.includes("image/") ? NS(e) : e : "";
}

function Lvr({
  title: e,
  scenes: t,
  sceneIndex: n,
  displayUrl: r,
  onClose: a,
  onSelectScene: i,
  onDownload: o
}) {
  on();
  const [s, l] = g.useState(1),
    [d, u] = g.useState({
      x: 0,
      y: 0
    }),
    [h, p] = g.useState(!1),
    m = g.useRef(null),
    f = g.useRef(null),
    y = g.useRef(null),
    b = HQ(n, t.length),
    v = t[b] || null,
    _ = (v == null ? void 0 : v.thumbnailUrl) || (v == null ? void 0 : v.url) || "",
    {
      content: w
    } = Kp(_, {
      shouldLoadContent: !!_,
      nodeType: "input-image",
      useOriginal: !0,
      preferConstantDisplay: !0
    }),
    k = r || (w !== void 0 ? w : _ && Er.isContentRef(_) ? "" : _),
    A = k && !k.startsWith("canvas-node:") && !k.startsWith("@asset:") && !k.startsWith("content_ref:") && !Er.isContentRef(k) ? Qvo(k) : "",
    S = IJe(v, OUe, Tdr, OUe),
    C = Math.round(S.width * s),
    I = Math.round(S.height * s);
  g.useEffect(() => {
    l(1), u({
      x: 0,
      y: 0
    }), f.current = null;
  }, [b]), g.useEffect(() => {
    const T = P => {
      P.key === "Escape" && a();
    };
    return window.addEventListener("keydown", T), () => window.removeEventListener("keydown", T);
  }, [a]), g.useEffect(() => {
    const T = m.current;
    if (!T) return;
    const P = R => {
      R.preventDefault(), R.stopPropagation(), v && l(j => Rdr(j, R.deltaY));
    };
    return T.addEventListener("wheel", P, {
      passive: !1
    }), () => T.removeEventListener("wheel", P);
  }, [v]);
  const E = T => {
      var R, j, B, F;
      f.current = null;
      const P = y.current;
      if (P) {
        try {
          (j = (R = P.target).releasePointerCapture) == null || j.call(R, P.pointerId);
        } catch {}
        y.current = null;
      } else if (T) try {
        (F = (B = T.currentTarget).releasePointerCapture) == null || F.call(B, T.pointerId);
      } catch {}
    },
    M = T => {
      T.stopPropagation();
    };
  return Da.createPortal(c.jsxs("div", {
    className: "fixed inset-0 z-[400] overflow-hidden bg-[#09090b] text-zinc-100",
    onPointerDown: M,
    onPointerMove: M,
    onPointerUp: M,
    onPointerCancel: M,
    onMouseDown: M,
    onMouseMove: M,
    onClick: M,
    onDoubleClick: M,
    onWheel: M,
    children: [c.jsx("div", {
      ref: m,
      className: `absolute inset-0 touch-none ${v ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`,
      onPointerDown: T => {
        if (T.stopPropagation(), !(!v || T.button !== 0)) {
          f.current = {
            x: T.clientX,
            y: T.clientY,
            ox: d.x,
            oy: d.y
          };
          try {
            T.currentTarget.setPointerCapture(T.pointerId), y.current = {
              pointerId: T.pointerId,
              target: T.currentTarget
            };
          } catch {}
        }
      },
      onPointerMove: T => {
        T.stopPropagation();
        const P = f.current;
        P && u({
          x: P.ox + (T.clientX - P.x),
          y: P.oy + (T.clientY - P.y)
        });
      },
      onPointerUp: T => {
        T.stopPropagation(), E(T);
      },
      onPointerCancel: T => {
        T.stopPropagation(), E(T);
      },
      onLostPointerCapture: () => E(),
      children: v && A ? c.jsxs(c.Fragment, {
        children: [c.jsx("div", {
          className: "absolute inset-0",
          style: {
            backgroundImage: wFt(A),
            backgroundRepeat: "repeat",
            backgroundPosition: `${d.x}px ${d.y}px`,
            backgroundSize: `${C}px ${I}px`
          }
        }), c.jsx("div", {
          className: "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,rgba(6,6,8,0.08)_36%,rgba(0,0,0,0.46)_100%)]"
        })]
      }) : v ? c.jsx("div", {
        className: "flex h-full w-full items-center justify-center text-sm text-zinc-500",
        children: x("等待贴图加载…")
      }) : c.jsx("div", {
        className: "flex h-full w-full items-center justify-center text-sm text-zinc-500",
        children: x("暂无贴图内容")
      })
    }), c.jsxs("div", {
      className: "pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between px-5 py-4",
      children: [c.jsxs("div", {
        className: "min-w-0",
        children: [c.jsx("h2", {
          className: "truncate text-sm font-medium text-zinc-100",
          children: e
        }), c.jsx("p", {
          className: "mt-1 text-xs text-zinc-500",
          children: x("拖动可平移贴图，滚轮可缩放预览")
        })]
      }), c.jsxs("div", {
        className: "pointer-events-auto flex items-center gap-2",
        children: [c.jsx("button", {
          type: "button",
          className: "rounded-lg p-2 text-zinc-400 hover:bg-white/10 hover:text-white",
          title: x("下载当前视窗"),
          disabled: !(v != null && v.url),
          onClick: () => {
            v != null && v.url && o({
              width: window.innerWidth,
              height: window.innerHeight,
              tileW: C,
              tileH: I,
              origin: d
            });
          },
          children: c.jsx(ws, {
            size: 18
          })
        }), c.jsx("button", {
          type: "button",
          className: "rounded-lg p-2 text-zinc-400 hover:bg-red-500/20 hover:text-red-400",
          title: x("关闭"),
          onClick: a,
          children: c.jsx(Na, {
            size: 18
          })
        })]
      })]
    }), t.length > 1 && c.jsxs("div", {
      className: `absolute inset-x-4 bottom-4 z-20 rounded-2xl border border-white/10 bg-black/70 px-2 py-2 backdrop-blur-md transition-opacity md:inset-x-6 md:bottom-6 ${h ? "opacity-[0.88]" : "opacity-[0.42]"}`,
      onMouseEnter: () => p(!0),
      onMouseLeave: () => p(!1),
      children: [c.jsxs("div", {
        className: "mb-1 flex items-center justify-between px-1 text-[10px] text-zinc-500",
        children: [c.jsx("span", {
          children: x("贴图切换")
        }), c.jsxs("span", {
          children: [b + 1, " / ", t.length]
        })]
      }), c.jsx("div", {
        className: "flex items-center gap-2 overflow-x-auto",
        children: t.map((T, P) => c.jsx("button", {
          type: "button",
          title: x(T.label),
          className: `shrink-0 rounded-full border px-3 py-1 text-xs transition ${P === b ? "border-white/30 bg-white/10 text-zinc-100" : "border-white/10 bg-black/40 text-zinc-400 hover:border-white/20 hover:text-zinc-200"}`,
          onClick: () => i(P),
          children: x(T.label)
        }, T.id))
      })]
    })]
  }), document.body);
}

function Yvo(e) {
  return e ? e.startsWith("data:image") || e.startsWith("data:") && e.includes("image/") ? NS(e) : e : "";
}

function Xvo(e) {
  const t = String(e || "").trim();
  return t ? t.startsWith("canvas-node:") || t.startsWith("@asset:") || t.startsWith("content_ref:") || Er.isContentRef(t) : !0;
}

function Jvo({
  displayUrl: e,
  tileSize: t
}) {
  return on(), c.jsxs(c.Fragment, {
    children: [c.jsx("div", {
      className: "absolute inset-0",
      style: {
        backgroundImage: wFt(e),
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
        backgroundSize: `${t.width}px ${t.height}px`
      }
    }), c.jsx("div", {
      className: "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(8,8,12,0.04)_45%,rgba(8,8,12,0.22)_100%)]"
    })]
  });
}

const Zvo = ({
    node: e,
    nodes: t,
    connections: n,
    isDark: r,
    updateNode: a,
    isSelected: i = !1,
    viewZoom: o = 1,
    dataVersion: s = 0,
    onDownloadSelected: l
  }) => {
    var z;
    on();
    const d = g.useRef(e.settings);
    d.current = e.settings;
    const u = g.useRef(e.content);
    u.current = e.content;
    const {
        scenes: h,
        incomingCount: p
      } = g.useMemo(() => fki(e.id, t, n), [e.id, t, n, s]),
      m = g.useMemo(() => ost(h), [h]),
      [f, y] = g.useState(() => {
        var V, O;
        return Array.isArray((V = e.settings) == null ? void 0 : V.tileScenes) ? (O = e.settings) == null ? void 0 : O.tileScenes : h;
      }),
      [b, v] = g.useState(!1),
      _ = g.useRef(null);
    g.useEffect(() => {
      let V = !1;
      if (h.length === 0) {
        y(O => O.length === 0 ? O : []);
        return;
      }
      return Promise.all(h.map(async O => {
        try {
          const L = await new Promise((D, U) => {
            const H = new Image();
            H.onload = () => D(H), H.onerror = () => U(new Error("tile measure failed")), H.src = O.thumbnailUrl || O.url;
          });
          return {
            ...O,
            width: L.naturalWidth,
            height: L.naturalHeight
          };
        } catch {
          return O;
        }
      })).then(O => {
        V || y(L => ost(L) === ost(O) ? L : O);
      }), () => {
        V = !0;
      };
    }, [h, m]);
    const w = HQ((z = e.settings) == null ? void 0 : z.tileSceneIndex, f.length),
      k = f[w] || null,
      A = (k == null ? void 0 : k.url) || "",
      {
        content: S,
        isLoading: C
      } = Kp(A, {
        shouldLoadContent: !!A,
        nodeType: "input-image",
        useOriginal: !0,
        preferConstantDisplay: !0
      }),
      I = S !== void 0 ? S : A && Er.isContentRef(A) ? "" : A,
      E = I && !Xvo(I) ? Yvo(I) : "";
    g.useEffect(() => {
      if (!E || !k) return;
      let V = !1;
      const O = new Image();
      return O.onload = () => {
        if (V) return;
        const L = O.naturalWidth,
          D = O.naturalHeight;
        y(U => {
          const H = HQ(w, U.length),
            Y = U[H];
          if (!Y || Y.width === L && Y.height === D) return U;
          const K = U.slice();
          return K[H] = {
            ...Y,
            width: L,
            height: D
          }, K;
        });
      }, O.src = E, () => {
        V = !0;
      };
    }, [k, w, E]), g.useEffect(() => {
      const V = ski(f, w),
        O = vFt(d.current, u.current);
      lki(O, V) || a(e.id, {
        content: V.imageUrl || void 0,
        settings: {
          ...d.current,
          ...V
        }
      });
    }, [w, e.id, f, a]);
    const M = V => {
        const O = HQ(V, f.length);
        O !== w && a(e.id, {
          settings: {
            ...d.current,
            tileSceneIndex: O
          }
        });
      },
      T = IJe(k),
      P = !k && p > 0,
      R = !!((E || A) && k),
      j = y9(o),
      B = () => {
        var L, D;
        const V = Math.max(1, ((L = _.current) == null ? void 0 : L.clientWidth) || e.width || 360),
          O = Math.max(1, ((D = _.current) == null ? void 0 : D.clientHeight) || e.height || 280);
        return {
          width: V,
          height: O,
          tileW: T.width,
          tileH: T.height,
          origin: jdr(V, O, T.width, T.height)
        };
      },
      F = V => {
        R && (yki(V), l == null || l([e.id]));
      },
      N = V => {
        V.stopPropagation(), F(B());
      },
      G = f.length > 1 && c.jsxs("div", {
        className: "pointer-events-none absolute inset-x-2 bottom-2 z-[2] flex items-center gap-2 overflow-x-auto",
        children: [c.jsx("span", {
          className: "shrink-0 rounded bg-black/50 px-1.5 py-0.5 text-[9px] text-zinc-400",
          children: x("贴图切换")
        }), f.map((V, O) => c.jsx("button", {
          type: "button",
          title: x(V.label),
          className: `nodrag nopan pointer-events-auto shrink-0 rounded-full border px-3 py-1 text-[10px] transition ${O === w ? "border-white/30 bg-white/10 text-zinc-100" : "border-white/10 bg-black/45 text-zinc-400 hover:border-white/25 hover:text-zinc-200"}`,
          onPointerDown: L => {
            L.stopPropagation(), L.preventDefault();
          },
          onClick: L => {
            L.stopPropagation(), M(O);
          },
          children: x(V.label)
        }, V.id))]
      });
    return c.jsxs("div", {
      className: "relative h-full w-full overflow-visible rounded-lg select-none",
      children: [i && c.jsx(Kvo, {
        isSelected: i,
        isDark: r,
        canvasZoomMediaOpacity: j,
        canExport: R,
        onDownload: N,
        onFullscreen: V => {
          V.stopPropagation(), R && v(!0);
        }
      }), !k && !P ? c.jsxs("div", {
        className: "flex h-full w-full flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-[#1f1f1f]/50 text-zinc-500 pointer-events-none",
        children: [c.jsx(Bv, {
          size: 24,
          className: "mb-2 opacity-50"
        }), c.jsx("span", {
          className: "text-xs font-medium",
          children: x("连接图片查看平铺效果")
        }), c.jsx("span", {
          className: "mt-1 text-[10px] text-zinc-600",
          children: x("支持多张贴图切换预览")
        })]
      }) : c.jsxs("div", {
        ref: _,
        className: "relative h-full w-full min-h-0 overflow-hidden rounded-2xl border border-zinc-800 bg-[#09090b]",
        children: [k && E ? c.jsx(Jvo, {
          displayUrl: E,
          tileSize: T
        }) : P || C ? c.jsxs("div", {
          className: "flex h-full w-full flex-col items-center justify-center gap-1 text-zinc-500",
          children: [c.jsx(Bv, {
            size: 24,
            className: "animate-pulse opacity-50"
          }), c.jsx("span", {
            className: "text-xs font-medium",
            children: x("等待贴图加载…")
          }), c.jsxs("span", {
            className: "text-[10px] text-zinc-600",
            children: [x("已连接 "), p, x(" 个上游，但图片还没就绪")]
          })]
        }) : c.jsxs("div", {
          className: "flex h-full w-full flex-col items-center justify-center gap-1 text-zinc-500",
          children: [c.jsx(Bv, {
            size: 24,
            className: "opacity-50"
          }), c.jsx("span", {
            className: "text-xs font-medium",
            children: x("该输入不是图片")
          })]
        }), G]
      }), b && c.jsx(Lvr, {
        title: e.nodeName || x("图片平铺"),
        scenes: f,
        sceneIndex: w,
        displayUrl: E,
        onClose: () => v(!1),
        onSelectScene: M,
        onDownload: V => F(V)
      })]
    });
  },
  F0n = {
    cursor: "url('/选择首尾帧时.ico') 4 4, crosshair"
  },
  z0n = [Math.PI / 4, 3 * Math.PI / 4, 5 * Math.PI / 4, 7 * Math.PI / 4];

function U0n(e) {
  return e && (e.startsWith("data:image") || e.startsWith("data:") && e.includes("image/") ? NS(e) : e);
}

const e1o = ({
  node: e,
  nodes: t = [],
  connections: n = [],
  isDark: r,
  getConnectedInputImages: a,
  getConnectedInputItems: i,
  dataVersion: o = 0,
  compactRefCanvasPickTargetId: s = null,
  onStartCompactRefCanvasPick: l,
  onDismissCompactRefCanvasPick: d,
  setNodes: u,
  generateId: h,
  notifyCanvas: p
}) => {
  on();
  const m = g.useRef(null),
    f = g.useRef(null),
    y = g.useRef(!1),
    b = g.useMemo(() => {
      if (!t.length || !n.length) return null;
      const q = n.filter(de => de.to === e.id);
      if (!q.length) return null;
      const ne = q.find(de => !de.inputType || de.inputType === "default") ?? q[0];
      return t.find(de => de.id === ne.from) ?? null;
    }, [t, n, e.id]),
    v = g.useMemo(() => {
      var ne;
      if (b) {
        const de = igi(b);
        if (de != null && de.trim()) return de.trim();
      }
      return ((ne = a(e.id)[0]) == null ? void 0 : ne.trim()) || "";
    }, [b, a, e.id, o]),
    _ = g.useMemo(() => {
      var de;
      if (!i) return;
      const q = i(e.id).find(le => le.type === "image");
      return ((de = q == null ? void 0 : q.assetId) == null ? void 0 : de.trim()) || void 0;
    }, [i, e.id, o]),
    w = s === e.id,
    {
      content: k,
      hasError: A
    } = Kp(v, {
      shouldLoadContent: !!v,
      nodeType: "input-image",
      useOriginal: !0,
      preferConstantDisplay: !0,
      blobRecoveryAssetIds: _ ? [_] : void 0
    }),
    S = g.useMemo(() => v ? Er.isContentRef(v) ? k !== void 0 ? k : "" : U0n(k !== void 0 ? k : v) : "", [v, k]),
    [C, I] = g.useState(!0),
    [E, M] = g.useState("");
  g.useEffect(() => {
    if (!v) {
      M(""), I(!0);
      return;
    }
    if (Er.isContentRef(v)) {
      M(""), I(!0);
      return;
    }
    const q = v && nr(v) && !/\/thumbnails\//i.test(v) || (_ ? bY(_) : !1);
    if (!_ || q) {
      M(""), I(!0);
      return;
    }
    I(!1), M("");
    let ne = !1;
    return (async () => {
      try {
        await ni.init();
        const de = await ni.getAssetUrl(_, v);
        if (ne) return;
        M((de || "").trim());
      } finally {
        ne || I(!0);
      }
    })(), () => {
      ne = !0;
    };
  }, [v, _, o]);
  const T = g.useMemo(() => {
      if (!v) return "";
      if (Er.isContentRef(v)) return S;
      if (!C) return "";
      const q = (E || S).trim();
      return q ? q.startsWith("data:") ? U0n(q) : q : "";
    }, [v, S, E, C]),
    [P, R] = g.useState(!1),
    [j, B] = g.useState(!1),
    [F, N] = g.useState(!1);
  g.useEffect(() => {
    R(!1), B(!1);
  }, [T]), g.useEffect(() => {
    const q = m.current;
    if (!q || !T) {
      f.current = null;
      return;
    }
    const ne = Math.max(1, q.clientWidth),
      de = Math.max(1, q.clientHeight),
      le = new OD(),
      J = new lu(72, ne / de, .1, 2e3);
    J.position.set(0, 0, .01);
    const pe = new FD({
      antialias: !0,
      alpha: !1,
      preserveDrawingBuffer: !0
    });
    pe.setPixelRatio(1), pe.setSize(ne, de), pe.outputColorSpace = Nl, q.appendChild(pe.domElement);
    const ce = new qp(500, 64, 32);
    ce.scale(-1, 1, 1);
    const we = new uu({
        color: 2236962,
        side: uT
      }),
      X = new di(ce, we);
    le.add(X);
    const Z = new zve(J, pe.domElement);
    Z.target.set(0, 0, 0), Z.enablePan = !1, Z.enableDamping = !0, Z.dampingFactor = .08, Z.rotateSpeed = -.5, Z.minDistance = .01, Z.maxDistance = .01, Z.minPolarAngle = .05, Z.maxPolarAngle = Math.PI - .05;
    const re = me => {
      me.preventDefault(), me.stopPropagation(), J.fov = Mo.clamp(J.fov + me.deltaY * .018, 38, 88), J.updateProjectionMatrix();
    };
    pe.domElement.addEventListener("wheel", re, {
      passive: !1
    });
    const fe = new dr(),
      ye = new hl(),
      ie = new dr();
    let ae = J.fov;
    const be = new xp(0, 0, 0, "YXZ");
    f.current = {
      capturePngDataUrl: () => {
        try {
          return y.current || Z.update(), pe.render(le, J), pe.domElement.toDataURL("image/png");
        } catch {
          return null;
        }
      },
      getImagePixelSize: () => ({
        w: pe.domElement.width,
        h: pe.domElement.height
      }),
      saveView: () => {
        fe.copy(J.position), ye.copy(J.quaternion), ie.copy(Z.target), ae = J.fov;
      },
      restoreView: () => {
        J.position.copy(fe), J.quaternion.copy(ye), Z.target.copy(ie), J.fov = ae, J.updateProjectionMatrix(), Z.enabled = !0, Z.update();
      },
      setCornerOrientation: (me, Ae) => {
        Z.enabled = !1, J.position.set(0, 0, .01), be.set(Ae, me, 0, "YXZ"), J.rotation.copy(be), J.updateProjectionMatrix(), pe.render(le, J);
      },
      setCaptureMode: me => {
        y.current = me;
      }
    };
    const Ee = new sD();
    Ee.setCrossOrigin("anonymous");
    let xe = !1,
      he = null;
    Ee.load(T, me => {
      if (xe) {
        me.dispose();
        return;
      }
      he = me, he.colorSpace = Nl, he.needsUpdate = !0, we.map = he, we.color.setHex(16777215), we.needsUpdate = !0, R(!1), B(!0);
    }, void 0, () => {
      xe || (R(!0), B(!1));
    });
    const ue = new ResizeObserver(() => {
      if (!m.current) return;
      const me = Math.max(1, m.current.clientWidth),
        Ae = Math.max(1, m.current.clientHeight);
      J.aspect = me / Ae, J.updateProjectionMatrix(), pe.setPixelRatio(1), pe.setSize(me, Ae);
    });
    ue.observe(q);
    let ge = 0,
      _e = !0;
    const ke = () => !document.hidden && _e,
      ve = () => {
        ke() ? ge = requestAnimationFrame(ve) : ge = 0, y.current || Z.update(), pe.render(le, J);
      },
      Te = new IntersectionObserver(me => {
        for (const Ae of me) _e = Ae.isIntersecting;
        _e && ge === 0 && !xe && !document.hidden && (ge = requestAnimationFrame(ve));
      }, {
        threshold: 0
      });
    Te.observe(q);
    const Ne = () => {
      xe || (document.hidden ? (ge && cancelAnimationFrame(ge), ge = 0) : _e && ge === 0 && (ge = requestAnimationFrame(ve)));
    };
    return document.addEventListener("visibilitychange", Ne), ve(), () => {
      var me;
      xe = !0, f.current = null, y.current = !1, ge && cancelAnimationFrame(ge), ge = 0, Te.disconnect(), document.removeEventListener("visibilitychange", Ne), ue.disconnect(), pe.domElement.removeEventListener("wheel", re), Z.dispose(), he && he.dispose(), ce.dispose(), we.dispose(), (me = pe.forceContextLoss) == null || me.call(pe), pe.dispose(), pe.domElement.parentNode === q && q.removeChild(pe.domElement), B(!1);
    };
  }, [T]);
  const G = g.useCallback(async (q, ne, de, le, J, pe, ce = []) => {
      const we = await (await fetch(q)).blob(),
        X = we.type.startsWith("image/") ? we : new Blob([we], {
          type: "image/png"
        }),
        Z = `gp-${e.id}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      if (!(await ni.saveBlobAsset(Z, X, `global-perspective:${e.id}/${le}`, "local"))) throw new Error("写入资源缓存失败");
      const fe = await ni.getAssetUrl(Z);
      if (!fe) throw new Error("无法生成展示 URL");
      const ye = ne / Math.max(1, de),
        ie = 360,
        ae = 300;
      let be = ye >= 1 ? Math.min(ie, ne) : Math.min(ie * ye, ne),
        Ee = ye >= 1 ? Math.min(ae / ye, de) : Math.min(ae, de);
      be = Math.max(120, Math.round(be)), Ee = Math.max(90, Math.round(Ee));
      const xe = h(),
        he = Ki(xe, "input-image", J, pe, le, void 0, ce);
      return he.width = be, he.height = Ee, he.content = fe, he.settings = {
        ...(he.settings || {}),
        mediaType: "image",
        _contentAssetId: Z,
        hasCustomSize: !0,
        imageSize: `${ne}×${de}`
      }, he;
    }, [h, e.id]),
    z = g.useCallback(async () => {
      const q = f.current;
      if (!(!q || F)) {
        N(!0);
        try {
          const ne = q.capturePngDataUrl();
          if (!ne) throw new Error("截图失败（可能为跨域纹理导致画布被污染，请使用本地或 blob 图）");
          const {
              w: de,
              h: le
            } = q.getImagePixelSize(),
            pe = e.x + e.width + 20,
            ce = e.y,
            we = await G(ne, de, le, "全景截图", pe, ce, []);
          u(X => [...X, we]), p == null || p("已拍照并创建图片节点（已写入资源缓存）", "success");
        } catch (ne) {
          p == null || p((ne == null ? void 0 : ne.message) || "拍照失败", "error");
        } finally {
          N(!1);
        }
      }
    }, [G, F, e.width, e.x, e.y, p, u]),
    V = g.useCallback(async () => {
      var ne, de;
      const q = f.current;
      if (!(!q || F)) {
        N(!0);
        try {
          q.setCaptureMode(!0), q.saveView();
          const {
              w: le,
              h: J
            } = q.getImagePixelSize(),
            pe = ["全景·角1", "全景·角2", "全景·角3", "全景·角4"],
            ce = e.x + e.width + 20;
          let we = e.y;
          const X = [];
          for (let Z = 0; Z < z0n.length; Z++) {
            q.setCornerOrientation(z0n[Z], 0);
            const re = q.capturePngDataUrl();
            if (!re) throw new Error("导出失败（可能为跨域纹理导致画布被污染）");
            const fe = await G(re, le, J, pe[Z], ce, we, []);
            X.push(fe), we += fe.height + 16;
          }
          q.restoreView(), q.setCaptureMode(!1), u(Z => [...Z, ...X]), p == null || p("已生成 4 张角落视角并创建图片节点（已写入资源缓存）", "success");
        } catch (le) {
          (ne = f.current) == null || ne.restoreView(), (de = f.current) == null || de.setCaptureMode(!1), p == null || p((le == null ? void 0 : le.message) || "四角导出失败", "error");
        } finally {
          N(!1);
        }
      }
    }, [G, F, e.height, e.width, e.x, e.y, p, u]),
    O = q => {
      q.stopPropagation();
    },
    L = () => {
      l && l(e.id, "default");
    },
    D = r ? "border-zinc-700 bg-zinc-950" : "border-zinc-200 bg-white",
    U = r ? "border-zinc-700 bg-[#1f1f1f]/80" : "border-zinc-200 bg-zinc-50",
    H = "inline-flex w-auto max-w-full shrink-0 items-center justify-center gap-1.5 rounded-md border px-3 py-1.5 text-[11px] font-medium transition-colors",
    Y = r ? "border-zinc-600 bg-zinc-800/80 text-zinc-100 hover:bg-zinc-800" : "border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100",
    K = v && T && j && !P,
    W = "pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border shadow-sm backdrop-blur-sm transition-colors",
    Q = r ? "border-white/20 bg-black/35 text-zinc-100 hover:bg-black/50" : "border-zinc-300/80 bg-white/75 text-zinc-800 hover:bg-white/95";
  return c.jsxs("div", {
    className: `flex h-full w-full min-h-[200px] flex-col overflow-hidden rounded-md border ${D}`,
    children: [c.jsxs("div", {
      ref: m,
      "data-global-perspective-viewer": "",
      className: "relative min-h-[220px] flex-1 touch-none cursor-grab active:cursor-grabbing",
      onMouseDown: O,
      onPointerDown: O,
      children: [v && !P && !A && !T && c.jsx("div", {
        className: `pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-xs ${r ? "bg-[#1f1f1f]/90 text-zinc-400" : "bg-white/90 text-zinc-500"}`,
        children: x("加载全景图…")
      }), v && A && Er.isContentRef(v) && c.jsx("div", {
        className: `pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-2 text-center text-xs ${r ? "bg-[#1f1f1f]/90 text-amber-200" : "bg-white/90 text-amber-800"}`,
        children: x("无法从本地读取原图引用，请重新拖入图片或检查存储。")
      }), v && P && c.jsx("div", {
        className: `pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-2 text-center text-xs ${r ? "bg-red-950/80 text-red-200" : "bg-red-50 text-red-700"}`,
        children: x("无法加载为纹理（跨域或格式不支持）。请换成本地 / blob 图或允许 CORS 的链接。")
      }), K && c.jsxs("div", {
        className: "pointer-events-none absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2",
        "aria-hidden": F,
        children: [c.jsx("button", {
          type: "button",
          title: x("当前画面拍照到画布"),
          disabled: F,
          onClick: q => {
            q.stopPropagation(), z();
          },
          onPointerDown: q => q.stopPropagation(),
          className: `${W} ${Q} disabled:opacity-40`,
          children: c.jsx(Kh, {
            className: "h-4 w-4"
          })
        }), c.jsx("button", {
          type: "button",
          title: x("一键生成四角视角（4 张图）"),
          disabled: F,
          onClick: q => {
            q.stopPropagation(), V();
          },
          onPointerDown: q => q.stopPropagation(),
          className: `${W} ${Q} disabled:opacity-40`,
          children: c.jsx(Od, {
            className: "h-4 w-4"
          })
        })]
      }), F && K && c.jsx("div", {
        className: `pointer-events-none absolute inset-0 z-[19] flex items-center justify-center bg-black/20 text-xs ${r ? "text-zinc-200" : "text-zinc-800"}`,
        children: x("导出中…")
      })]
    }), c.jsx("div", {
      className: `shrink-0 space-y-1.5 border-t px-2 py-2 ${U}`,
      style: w ? F0n : void 0,
      children: w ? c.jsxs(c.Fragment, {
        children: [c.jsx("p", {
          className: "text-center text-[11px] text-amber-600 dark:text-amber-400",
          children: x("点击画布上的图片类节点完成选择（Esc 取消）")
        }), c.jsx("div", {
          className: "flex gap-2",
          children: c.jsx("button", {
            type: "button",
            onClick: q => {
              q.stopPropagation(), d == null || d();
            },
            onPointerDown: q => q.stopPropagation(),
            className: `flex-1 rounded border px-2 py-1.5 text-[11px] ${r ? "border-zinc-600 text-zinc-300 hover:bg-zinc-800" : "border-zinc-300 text-zinc-700 hover:bg-zinc-100"}`,
            style: F0n,
            children: x("取消选择")
          })
        })]
      }) : c.jsx("div", {
        className: "flex justify-center px-1",
        children: c.jsxs("button", {
          type: "button",
          onClick: q => {
            q.stopPropagation(), L();
          },
          onPointerDown: q => q.stopPropagation(),
          className: `${H} ${Y}`,
          children: [c.jsx(yEt, {
            className: "h-3.5 w-3.5 shrink-0 opacity-80"
          }), x("从画布选择图片")]
        })
      })
    })]
  });
};

function t1o(e, t, n) {
  var a;
  const r = n.filter(i => i.from === e && (!i.inputType || i.inputType === "default"));
  for (const i of r) {
    const o = t.find(s => s.id === i.to);
    if (o && (o.type === "gen-image" || o.type === "generate-character-image" || o.type === "generate-scene-image")) return ((a = o.settings) == null ? void 0 : a.model) || void 0;
  }
  try {
    const i = WCe("Image");
    return i == null ? void 0 : i.model;
  } catch {
    return;
  }
}

const n1o = ({
  node: e,
  nodes: t,
  connections: n,
  isDark: r,
  updateNode: a,
  getConnectedInputImages: i,
  setNodes: o,
  setConnections: s,
  generateId: l
}) => {
  var de, le, J, pe, ce, we, X, Z, re;
  on();
  const [d, u] = g.useState(!1),
    [h, p] = g.useState(!1),
    [m, f] = g.useState(null),
    [y, b] = g.useState(null),
    [v, _] = g.useState(0),
    w = g.useRef(!1),
    k = g.useRef(!1),
    A = n.find(fe => fe.to === e.id && (!fe.inputType || fe.inputType === "default")),
    S = A ? t.find(fe => fe.id === A.from) : null,
    C = (S == null ? void 0 : S.type) === "input-image" ? (de = S.settings) == null ? void 0 : de.cropSelection : void 0,
    I = ((le = e.settings) == null ? void 0 : le.cropX) ?? (C == null ? void 0 : C.x) ?? 0,
    E = ((J = e.settings) == null ? void 0 : J.cropY) ?? (C == null ? void 0 : C.y) ?? 0,
    M = ((pe = e.settings) == null ? void 0 : pe.cropWidth) ?? (C == null ? void 0 : C.width) ?? 256,
    T = ((ce = e.settings) == null ? void 0 : ce.cropHeight) ?? (C == null ? void 0 : C.height) ?? 256,
    P = ((we = e.settings) == null ? void 0 : we.contextPixels) ?? 32,
    R = ((X = e.settings) == null ? void 0 : X.cropTargetRatio) || void 0,
    B = i(e.id)[0] || null,
    F = g.useMemo(() => t1o(e.id, t, n), [e.id, t, n]),
    N = g.useMemo(() => ah(F), [F]),
    G = $X(M),
    z = $X(T);
  g.useEffect(() => {
    var ie, ae;
    const fe = qce((ie = S == null ? void 0 : S.settings) == null ? void 0 : ie.imageSize);
    if (fe) {
      b(fe);
      return;
    }
    const ye = (ae = e.settings) == null ? void 0 : ae._cropStitcher;
    ye != null && ye.sourceWidth && (ye != null && ye.sourceHeight) && b({
      w: ye.sourceWidth,
      h: ye.sourceHeight
    });
  }, [(Z = S == null ? void 0 : S.settings) == null ? void 0 : Z.imageSize, (re = e.settings) == null ? void 0 : re._cropStitcher]), g.useEffect(() => {
    if (!B) return;
    let fe = !1;
    return (async () => {
      try {
        let ye = B;
        if (B.startsWith("content_ref:")) {
          await Er.init();
          const be = Er.extractId(B),
            Ee = await Er.get(be);
          if (!Ee) return;
          ye = Ee;
        }
        const ie = await Ns(ye, {
            compressForApi: !1
          }),
          ae = await createImageBitmap(ie);
        fe || b({
          w: ae.width,
          h: ae.height
        }), ae.close();
      } catch {}
    })(), () => {
      fe = !0;
    };
  }, [B]);
  const V = g.useMemo(() => {
      const fe = (y == null ? void 0 : y.w) ?? 0,
        ye = (y == null ? void 0 : y.h) ?? 0;
      return qNt(I, E, M, T, N, fe, ye, R);
    }, [I, E, M, T, N, y, R]),
    O = R || (V == null ? void 0 : V.nearestRatio),
    L = g.useMemo(() => {
      if (!V) return [];
      const fe = V.standard,
        ye = V.minimal,
        ie = fe.x === ye.x && fe.y === ye.y && fe.w === ye.w && fe.h === ye.h,
        ae = [{
          key: "standard",
          label: `标准 ${V.nearestRatio}`,
          x: fe.x,
          y: fe.y,
          w: fe.w,
          h: fe.h,
          reason: ie ? "已对齐标准比例 + 8 倍数，可直接应用" : "严格标准比例 + 8 倍数，拼回最稳"
        }];
      return ie || ae.push({
        key: "minimal",
        label: `微调 ${V.nearestRatio}`,
        x: ye.x,
        y: ye.y,
        w: ye.w,
        h: ye.h,
        reason: "尽量贴近原框，仍为标准比例"
      }), ae;
    }, [V]),
    D = g.useRef(R);
  g.useEffect(() => {
    if (w.current) {
      w.current = !1, D.current = R;
      return;
    }
    if (k.current) {
      k.current = !1, _(0), D.current = R;
      return;
    }
    const fe = D.current !== R;
    if (D.current = R, fe) {
      _(0);
      return;
    }
    _(0);
  }, [I, E, M, T, R]);
  const U = g.useCallback(fe => {
      w.current = !0, a(e.id, {
        settings: {
          ...e.settings,
          cropX: fe.x,
          cropY: fe.y,
          cropWidth: fe.w,
          cropHeight: fe.h,
          cropTargetRatio: O
        }
      });
    }, [e.id, e.settings, a, O]),
    H = g.useCallback((fe, ye) => {
      _(fe), U(ye);
    }, [U]),
    Y = g.useCallback(async () => {
      if (!B) throw new Error("请先连接一张图片");
      let fe = B;
      if (B.startsWith("content_ref:")) {
        await Er.init();
        const Ne = Er.extractId(B),
          me = await Er.get(Ne);
        if (!me) throw new Error("无法解析图片引用");
        fe = me;
      }
      const ye = await Ns(fe, {
          compressForApi: !1
        }),
        ie = await createImageBitmap(ye),
        ae = ie.width,
        be = ie.height,
        Ee = HNt({
          x: I,
          y: E,
          w: M,
          h: T,
          contextPixels: P,
          sourceWidth: ae,
          sourceHeight: be,
          targetRatio: O,
          snapToRatio: !0
        }),
        {
          x0: xe,
          y0: he,
          outWidth: ue,
          outHeight: ge
        } = Ee,
        _e = document.createElement("canvas");
      _e.width = ue, _e.height = ge;
      const ke = _e.getContext("2d");
      if (!ke) throw new Error("无法创建 Canvas");
      ke.drawImage(ie, xe, he, ue, ge, 0, 0, ue, ge);
      try {
        ie.close();
      } catch {}
      const ve = _e.toDataURL("image/png"),
        Te = await new Promise((Ne, me) => {
          _e.toBlob(Ae => Ae ? Ne(Ae) : me(new Error("裁剪图导出失败")), "image/png");
        });
      return {
        dataUrl: ve,
        blob: Te,
        exportMeta: Ee
      };
    }, [B, I, E, M, T, P, O]),
    K = g.useCallback(async () => {
      f(null), u(!0);
      try {
        const {
            dataUrl: fe,
            exportMeta: ye
          } = await Y(),
          {
            cropX: ie,
            cropY: ae,
            cropWidth: be,
            cropHeight: Ee
          } = ye,
          xe = ye;
        if (a(e.id, {
          content: fe,
          settings: {
            ...e.settings,
            cropX: ie,
            cropY: ae,
            cropWidth: be,
            cropHeight: Ee,
            _cropStitcher: xe,
            _originalNodeId: null,
            cropTargetRatio: O
          }
        }), o) {
          const he = n.filter(ue => ue.from === e.id && (!ue.inputType || ue.inputType === "default")).map(ue => ue.to);
          he.length > 0 && o(ue => ue.map(ge => {
            var ke, ve;
            if (!he.includes(ge.id)) return ge;
            if (ge.type === "gen-image" || ge.type === "generate-character-image" || ge.type === "generate-scene-image") {
              const Te = {
                ...ge.settings
              };
              O && (Te.ratio = O);
              const Ne = (ke = ge.settings) == null ? void 0 : ke.inputImageOrder;
              return Ne != null && Ne.length && (Te.inputImageOrder = void 0), {
                ...ge,
                settings: Te
              };
            }
            if (ge.type !== "gen-video") return ge;
            const _e = (ve = ge.settings) == null ? void 0 : ve.inputImageOrder;
            return _e != null && _e.length ? {
              ...ge,
              settings: {
                ...ge.settings,
                inputImageOrder: void 0
              }
            } : ge;
          }));
        }
        if (o && s && l) {
          const he = e.id,
            ue = e.x,
            ge = e.y,
            _e = e.width ?? 320,
            ve = n.filter(me => me.from === he).map(me => me.to);
          if (!t.filter(me => ve.includes(me.id)).some(me => me.type === "gen-image" || me.type === "generate-character-image" || me.type === "generate-scene-image")) {
            let me = {};
            try {
              const Me = WCe("Image");
              Me && (me = {
                ...Me
              });
            } catch (Me) {
              console.warn("Failed to load model defaults:", Me);
            }
            O && (me.ratio = O);
            const Ae = l(),
              Fe = l();
            setTimeout(() => {
              o(Me => {
                const Re = Ki(Ae, "gen-image", ue + _e + 80, ge, void 0, me, Me);
                return [...Me, Re];
              }), s(Me => [...Me, {
                id: Fe,
                from: he,
                to: Ae
              }]);
            }, 0);
          }
        }
      } catch (fe) {
        f(fe instanceof Error ? fe.message : "裁剪失败");
      } finally {
        u(!1);
      }
    }, [Y, e.id, e.settings, e.width, e.x, e.y, a, t, n, o, s, l, O]),
    W = g.useCallback(async () => {
      if (!o || !l) {
        f("无法创建图片输入节点");
        return;
      }
      f(null), p(!0);
      try {
        const {
            blob: fe,
            exportMeta: ye
          } = await Y(),
          ie = ye.outWidth,
          ae = ye.outHeight,
          {
            calcInputImageNodeDisplaySize: be
          } = await Ie(async () => {
            const {
              calcInputImageNodeDisplaySize: me
            } = await Promise.resolve().then(() => Rue);
            return {
              calcInputImageNodeDisplaySize: me
            };
          }, void 0, import.meta.url),
          {
            buildDoodleInputImageBaseSettings: Ee,
            persistDoodleBlobToInputImageNode: xe
          } = await Ie(async () => {
            const {
              buildDoodleInputImageBaseSettings: me,
              persistDoodleBlobToInputImageNode: Ae
            } = await Promise.resolve().then(() => IAe);
            return {
              buildDoodleInputImageBaseSettings: me,
              persistDoodleBlobToInputImageNode: Ae
            };
          }, void 0, import.meta.url),
          {
            OSS_UPLOADING_SETTING_KEY: he
          } = await Ie(async () => {
            const {
              OSS_UPLOADING_SETTING_KEY: me
            } = await Promise.resolve().then(() => ii);
            return {
              OSS_UPLOADING_SETTING_KEY: me
            };
          }, void 0, import.meta.url),
          {
            isGlobalOssUploadEnabled: ue
          } = await Ie(async () => {
            const {
              isGlobalOssUploadEnabled: me
            } = await Promise.resolve().then(() => Ah);
            return {
              isGlobalOssUploadEnabled: me
            };
          }, void 0, import.meta.url),
          ge = be(ie, ae),
          _e = {
            ...Ee(fe, ie, ae),
            ...(O ? {
              ratio: O
            } : {}),
            imageSize: `${ie}×${ae}`,
            _fromInpaintCrop: e.id
          },
          ke = l(),
          Te = e.x + (e.width ?? 340) + 80,
          Ne = e.y;
        o(me => {
          const Ae = Ki(ke, "input-image", Te, Ne, void 0, void 0, me);
          return Ae.width = ge.width, Ae.height = ge.height, Ae.settings = ue() ? {
            ..._e,
            [he]: !0
          } : _e, [...me, Ae];
        }), await xe({
          blob: fe,
          nodeId: ke,
          wPx: ie,
          hPx: ae,
          setNodes: o,
          baseSettings: _e,
          assetId: `inpaint_crop_${ke}`,
          ossFileName: `inpaint_crop_${ke}.png`,
          sourceLabel: "file://inpaint-crop-export"
        });
      } catch (fe) {
        f(fe instanceof Error ? fe.message : "导出裁剪图失败");
      } finally {
        p(!1);
      }
    }, [Y, o, l, O, e.id, e.x, e.y, e.width]),
    Q = g.useCallback((fe, ye) => {
      (fe === "cropX" || fe === "cropY" || fe === "cropWidth" || fe === "cropHeight") && (k.current = !0), a(e.id, {
        settings: {
          ...e.settings,
          [fe]: ye
        }
      });
    }, [e.id, e.settings, a]),
    q = `w-full h-full flex flex-col rounded-2xl p-3 overflow-y-auto min-h-0 inpaint-crop-scroll ${r ? "bg-transparent" : "bg-white border border-zinc-200"}`,
    ne = `w-full h-full flex flex-col items-center justify-center rounded-2xl p-4 min-h-0 ${r ? "bg-[#1f1f1f]/50 border border-zinc-800" : "bg-zinc-100 border border-zinc-300"}`;
  return B ? c.jsxs("div", {
    className: q,
    "data-inpaint-crop-panel": !0,
    children: [C && c.jsx("div", {
      className: `text-[10px] mb-2 ${r ? "text-green-500/90" : "text-green-600"}`,
      children: x("已从图片输入节点框选")
    }), c.jsxs("div", {
      className: `text-[10px] space-y-1.5 mb-2 ${r ? "text-zinc-400" : "text-zinc-600"}`,
      children: [c.jsxs("div", {
        className: "grid grid-cols-4 gap-1",
        children: [c.jsx("label", {
          children: "X"
        }), c.jsx("input", {
          type: "number",
          min: 0,
          value: I,
          onChange: fe => Q("cropX", Math.max(0, parseInt(fe.target.value, 10) || 0)),
          className: `col-span-3 w-full px-1.5 py-0.5 rounded text-[10px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${r ? "bg-zinc-800 border-zinc-600 text-zinc-200" : "bg-white border-zinc-300"} border`
        })]
      }), c.jsxs("div", {
        className: "grid grid-cols-4 gap-1",
        children: [c.jsx("label", {
          children: "Y"
        }), c.jsx("input", {
          type: "number",
          min: 0,
          value: E,
          onChange: fe => Q("cropY", Math.max(0, parseInt(fe.target.value, 10) || 0)),
          className: `col-span-3 w-full px-1.5 py-0.5 rounded text-[10px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${r ? "bg-zinc-800 border-zinc-600 text-zinc-200" : "bg-white border-zinc-300"} border`
        })]
      }), c.jsxs("div", {
        className: "grid grid-cols-4 gap-1",
        children: [c.jsx("label", {
          children: "W"
        }), c.jsx("input", {
          type: "number",
          min: 8,
          value: M,
          onChange: fe => Q("cropWidth", Math.max(8, parseInt(fe.target.value, 10) || 8)),
          className: `col-span-3 w-full px-1.5 py-0.5 rounded text-[10px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${r ? "bg-zinc-800 border-zinc-600 text-zinc-200" : "bg-white border-zinc-300"} border`
        }), c.jsxs("span", {
          className: "col-span-4 text-[9px] opacity-70",
          children: ["→ ", G, x(" (8倍数)")]
        })]
      }), c.jsxs("div", {
        className: "grid grid-cols-4 gap-1",
        children: [c.jsx("label", {
          children: "H"
        }), c.jsx("input", {
          type: "number",
          min: 8,
          value: T,
          onChange: fe => Q("cropHeight", Math.max(8, parseInt(fe.target.value, 10) || 8)),
          className: `col-span-3 w-full px-1.5 py-0.5 rounded text-[10px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${r ? "bg-zinc-800 border-zinc-600 text-zinc-200" : "bg-white border-zinc-300"} border`
        }), c.jsxs("span", {
          className: "col-span-4 text-[9px] opacity-70",
          children: ["→ ", z, x(" (8倍数)")]
        })]
      }), c.jsxs("div", {
        className: "grid grid-cols-4 gap-1",
        children: [c.jsx("label", {
          children: x("上下文")
        }), c.jsx("input", {
          type: "number",
          min: 0,
          value: P,
          onChange: fe => Q("contextPixels", Math.max(0, parseInt(fe.target.value, 10) || 0)),
          className: `col-span-3 w-full px-1.5 py-0.5 rounded text-[10px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${r ? "bg-zinc-800 border-zinc-600 text-zinc-200" : "bg-white border-zinc-300"} border`
        }), c.jsx("span", {
          className: "col-span-4 text-[9px] opacity-70",
          children: x("px 扩展")
        })]
      })]
    }), V && c.jsxs("div", {
      className: `mb-2 rounded-lg p-2 space-y-1.5 ${r ? "bg-zinc-800/60 border border-zinc-700" : "bg-zinc-50 border border-zinc-200"}`,
      children: [c.jsx("div", {
        className: "text-[10px] font-medium",
        children: x("标准比例推荐")
      }), c.jsx(UJe, {
        isDark: r,
        layout: "dropdown",
        selectedRatio: O,
        filterRatios: N,
        onSelect: fe => {
          fe !== "Auto" && Q("cropTargetRatio", fe);
        }
      }), c.jsx("div", {
        className: "space-y-1 max-h-28 overflow-y-auto inpaint-crop-scroll",
        children: L.map((fe, ye) => c.jsxs("button", {
          type: "button",
          onClick: () => H(ye, fe),
          className: `w-full text-left rounded px-1.5 py-1 text-[9px] border transition-colors ${v === ye ? r ? "border-amber-500/60 bg-amber-500/10" : "border-amber-500 bg-amber-50" : r ? "border-zinc-700 hover:bg-zinc-700/50" : "border-zinc-200 hover:bg-zinc-100"}`,
          children: [c.jsx("div", {
            className: `font-medium ${v === ye ? r ? "text-amber-200" : "text-amber-900" : ""}`,
            children: x(fe.label)
          }), c.jsxs("div", {
            className: "opacity-80 tabular-nums",
            children: ["X ", fe.x, " · Y ", fe.y, " · W ", fe.w, " · H ", fe.h]
          }), fe.reason && c.jsx("div", {
            className: "opacity-60 mt-0.5 leading-snug",
            children: fe.reason
          })]
        }, fe.key))
      })]
    }), m && c.jsxs("div", {
      className: "flex items-center gap-1.5 mb-2 text-red-500 text-[10px]",
      children: [c.jsx(c3, {
        size: 12
      }), m]
    }), c.jsxs("div", {
      className: "flex items-stretch gap-1.5",
      children: [c.jsxs("button", {
        type: "button",
        onClick: K,
        disabled: d || h,
        className: `flex-1 py-1.5 rounded text-xs font-medium flex items-center justify-center gap-1.5 ${r ? "bg-zinc-700 hover:bg-zinc-600 text-zinc-100 disabled:opacity-50" : "bg-zinc-200 hover:bg-zinc-300 text-zinc-800 disabled:opacity-50"}`,
        children: [d ? c.jsx(Ua, {
          size: 14,
          className: "animate-spin"
        }) : c.jsx(Sf, {
          size: 14
        }), x("应用裁剪")]
      }), c.jsxs("button", {
        type: "button",
        onClick: W,
        disabled: d || h || !o || !l,
        title: x("将当前裁剪区域导出到右侧图片输入节点"),
        className: `shrink-0 px-2.5 py-1.5 rounded text-xs font-medium flex items-center justify-center gap-1 ${r ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-600 disabled:opacity-50" : "bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-300 disabled:opacity-50"}`,
        children: [h ? c.jsx(Ua, {
          size: 14,
          className: "animate-spin"
        }) : c.jsx(mu, {
          size: 14
        }), x("导出裁剪")]
      })]
    }), e.content && c.jsx("div", {
      className: "mt-2 text-[10px] text-zinc-500 truncate shrink-0",
      children: x("裁剪局部重绘、图片输入-原图")
    })]
  }) : c.jsxs("div", {
    className: ne,
    children: [c.jsx(Sf, {
      size: 28,
      className: "mb-2 text-zinc-500"
    }), c.jsx("span", {
      className: "text-xs text-zinc-500 text-center",
      children: x("连接图片输入节点")
    }), c.jsx("span", {
      className: "text-[10px] text-zinc-500 text-center mt-1",
      children: x("在图片上点击 ✂️ 框选裁剪区域")
    })]
  });
};

function r1o(e, t, n) {
  const {
      x0: r,
      y0: a,
      outWidth: i,
      outHeight: o,
      cropX: s = r,
      cropY: l = a,
      cropWidth: d = i,
      cropHeight: u = o
    } = n,
    h = (_, w) => Math.abs(_ - w) <= 2;
  if (h(e, i) && h(t, o)) return {
    destX: r,
    destY: a,
    destW: i,
    destH: o,
    srcX: 0,
    srcY: 0,
    srcW: e,
    srcH: t,
    mode: "full-patch"
  };
  if (h(e, d) && h(t, u)) return {
    destX: s,
    destY: l,
    destW: d,
    destH: u,
    srcX: 0,
    srcY: 0,
    srcW: e,
    srcH: t,
    mode: "inner"
  };
  const p = d / Math.max(1, u),
    m = e / Math.max(1, t);
  let f = 0,
    y = 0,
    b = e,
    v = t;
  return Math.abs(m - p) > .008 && (m > p ? (b = t * p, f = (e - b) / 2) : (v = e / p, y = (t - v) / 2)), {
    destX: s,
    destY: l,
    destW: d,
    destH: u,
    srcX: Math.round(f),
    srcY: Math.round(y),
    srcW: Math.round(b),
    srcH: Math.round(v),
    mode: "inner-crop"
  };
}

function $0n(e) {
  var t;
  if (e.type === "preview") {
    const n = e.previewMjImages,
      r = e._previewMjAssetIds,
      a = e.selectedPreviewImage;
    if (a && (n != null && n.length)) {
      const i = n.findIndex(s => s === a),
        o = i >= 0 && (r != null && r[i]) ? r[i] : e._contentAssetId;
      return {
        url: a,
        assetId: o ?? e._contentAssetId ?? null
      };
    }
    if (n != null && n.length) {
      const i = n.length - 1,
        o = n[i],
        s = (r == null ? void 0 : r[i]) ?? e._contentAssetId;
      return {
        url: o,
        assetId: s ?? null
      };
    }
    return {
      url: e.content ?? null,
      assetId: e._contentAssetId ?? null
    };
  }
  if (e.type === "rh-app" || e.type === "rh-comfy" || e.type === "gen-image") {
    const n = (t = e.settings) == null ? void 0 : t.generatedImages;
    if (n != null && n.length) {
      const r = n[0];
      return {
        url: r.fullUrl,
        assetId: r.assetId ?? null
      };
    }
    return {
      url: e.content ?? null,
      assetId: e._contentAssetId ?? null
    };
  }
  return e.type === "input-image" ? {
    url: e.content ?? null,
    assetId: e._contentAssetId ?? null
  } : {
    url: e.content ?? null,
    assetId: e._contentAssetId ?? null
  };
}

async function G0n(e, t) {
  if (!e && !t) return null;
  if (t) try {
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
    if (n.isAvailable() && n.hasAsset(t)) {
      const i = await n.readAsset(t);
      if (i != null && i.blob && i.blob.size > 0) return i.blob;
    }
    const {
        assetStore: r
      } = await Ie(async () => {
        const {
          assetStore: i
        } = await Promise.resolve().then(() => Ri);
        return {
          assetStore: i
        };
      }, void 0, import.meta.url),
      a = await r.getAssetBlob(t);
    if (a && a.size > 0) return a;
  } catch (n) {
    console.warn("[InpaintStitch] 从 assetId 读取失败，降级为 URL:", n);
  }
  if (e) {
    if (e.startsWith("content_ref:")) {
      await Er.init();
      const n = Er.extractId(e),
        r = await Er.get(n);
      if (r) return await Ns(r, {
        compressForApi: !1
      });
    }
    return await Ns(e, {
      compressForApi: !1
    });
  }
  return null;
}

const a1o = ({
    node: e,
    nodes: t,
    connections: n,
    isDark: r,
    updateNode: a,
    getConnectedInputImages: i,
    setPreviewContextMenu: o
  }) => {
    var I, E;
    on();
    const [s, l] = g.useState(!1),
      [d, u] = g.useState(null),
      h = n.filter(M => M.to === e.id && (!M.inputType || M.inputType === "default")),
      p = h.find(M => {
        const T = t.find(P => P.id === M.from);
        return (T == null ? void 0 : T.type) === "inpaint-crop";
      }),
      m = h.find(M => {
        const T = t.find(P => P.id === M.from);
        return (T == null ? void 0 : T.type) === "gen-image" || (T == null ? void 0 : T.type) === "rh-app" || (T == null ? void 0 : T.type) === "rh-comfy";
      }) ?? h.find(M => {
        const T = t.find(P => P.id === M.from);
        return (T == null ? void 0 : T.type) === "preview";
      }),
      f = p ? t.find(M => M.id === p.from) : null,
      y = m ? t.find(M => M.id === m.from) : null,
      b = (I = f == null ? void 0 : f.settings) == null ? void 0 : I._cropStitcher,
      v = h.find(M => {
        const T = t.find(P => P.id === M.from);
        return (T == null ? void 0 : T.type) === "input-image" || (T == null ? void 0 : T.type) === "preview" && T !== y;
      }),
      _ = v ? {
        from: v.from,
        to: e.id
      } : f ? n.find(M => M.to === f.id && (!M.inputType || M.inputType === "default")) : null,
      w = _ ? t.find(M => M.id === _.from) : null,
      k = w ? $0n(w) : {
        url: null,
        assetId: null
      },
      A = y ? $0n(y) : {
        url: null,
        assetId: null
      },
      S = g.useCallback(async () => {
        if (!b) {
          u("请连接 Inpaint Crop 节点");
          return;
        }
        if (!k.url && !k.assetId) {
          u("请确保 Crop 节点已连接原图");
          return;
        }
        if (!A.url && !A.assetId) {
          u("请连接重绘结果（gen-image / 预览 / RH 应用）");
          return;
        }
        const M = !!k.url && k.url === A.url,
          T = !!k.assetId && k.assetId === A.assetId;
        if (M || T) {
          u("重绘结果不能与原图相同，请连接生成图片/重绘结果节点");
          return;
        }
        u(null), l(!0);
        try {
          const [P, R] = await Promise.all([G0n(k.url, k.assetId), G0n(A.url, A.assetId)]);
          if (!P || P.size === 0) throw new Error("无法加载原图，请检查本地缓存或连接");
          if (!R || R.size === 0) throw new Error("无法加载重绘图，请检查预览节点的图片是否已缓存");
          const [j, B] = await Promise.all([createImageBitmap(P), createImageBitmap(R)]);
          if (j.width === 0 || j.height === 0) throw new Error("原图加载异常，尺寸为 0");
          if (B.width === 0 || B.height === 0) throw new Error("重绘图加载异常，尺寸为 0");
          if (j.width === B.width && j.height === B.height && P.size === R.size) throw new Error("检测到原图与重绘结果可能为同一张图，请确认「重绘结果」连接的是生成图（如 1248×832 生成图片），而非原图或预览中的原图");
          const {
              sourceWidth: F,
              sourceHeight: N
            } = b,
            G = r1o(B.width, B.height, b),
            z = Math.floor(Math.max(0, G.destX)),
            V = Math.floor(Math.max(0, G.destY)),
            O = Math.min(Math.max(1, Math.round(G.destW)), Math.max(0, F - z)),
            L = Math.min(Math.max(1, Math.round(G.destH)), Math.max(0, N - V));
          if ((j.width !== F || j.height !== N) && console.warn("[InpaintStitch] 原图尺寸与 Crop 时不一致:", `${j.width}x${j.height} vs ${F}x${N}`), O <= 0 || L <= 0) throw new Error("重绘区域尺寸异常或超出原图边界，请检查 Crop 节点");
          const D = document.createElement("canvas");
          D.width = F, D.height = N;
          const U = D.getContext("2d");
          if (!U) throw new Error("无法创建 Canvas");
          U.drawImage(j, 0, 0), U.imageSmoothingEnabled = !0, U.imageSmoothingQuality = "high";
          const H = Math.min(O, L);
          let K = Math.max(B.width / O, B.height / L) > 1.5 ? Math.min(80, Math.floor(H * .14)) : Math.min(64, Math.floor(H * .1));
          if (K = Math.min(K + 4, Math.floor(H / 2)), K >= 6 && O > K * 3 && L > K * 3) {
            const de = document.createElement("canvas");
            de.width = O, de.height = L;
            const le = de.getContext("2d");
            if (le) {
              le.imageSmoothingEnabled = !0, le.imageSmoothingQuality = "high", le.drawImage(B, G.srcX, G.srcY, G.srcW, G.srcH, 0, 0, O, L);
              const J = document.createElement("canvas");
              J.width = O, J.height = L;
              const pe = J.getContext("2d", {
                alpha: !0
              });
              if (pe) {
                const ce = K,
                  we = K,
                  X = O - K,
                  Z = L - K,
                  re = Math.max(1, X - ce),
                  fe = Math.max(1, Z - we);
                pe.fillStyle = "rgba(255,255,255,1)", pe.fillRect(ce, we, re, fe);
                const ye = (ie, ae, be, Ee, xe) => {
                  const he = pe.createLinearGradient(ie, ae, be, Ee);
                  he.addColorStop(0, "rgba(255,255,255,0)"), he.addColorStop(.4, "rgba(255,255,255,0.25)"), he.addColorStop(.7, "rgba(255,255,255,0.65)"), he.addColorStop(1, "rgba(255,255,255,1)"), pe.fillStyle = he, pe.fillRect(xe.x, xe.y, xe.width, xe.height);
                };
                ye(0, 0, 0, K, {
                  x: 0,
                  y: 0,
                  width: O,
                  height: K
                }), ye(0, L, 0, L - K, {
                  x: 0,
                  y: L - K,
                  width: O,
                  height: K
                }), ye(0, 0, K, 0, {
                  x: 0,
                  y: 0,
                  width: K,
                  height: L
                }), ye(O, 0, O - K, 0, {
                  x: O - K,
                  y: 0,
                  width: K,
                  height: L
                }), le.globalCompositeOperation = "destination-in", le.drawImage(J, 0, 0), le.globalCompositeOperation = "source-over", U.drawImage(de, 0, 0, O, L, z, V, O, L);
              } else U.drawImage(B, G.srcX, G.srcY, G.srcW, G.srcH, z, V, O, L);
            } else U.drawImage(B, G.srcX, G.srcY, G.srcW, G.srcH, z, V, O, L);
          } else U.drawImage(B, G.srcX, G.srcY, G.srcW, G.srcH, z, V, O, L);
          const Q = D.toDataURL("image/png");
          if (!Q || Q.length < 100) throw new Error("拼回结果生成失败");
          const q = 400;
          let ne = Q;
          if (F > q || N > q) {
            const de = Math.min(q / F, q / N),
              le = Math.round(F * de),
              J = Math.round(N * de),
              pe = document.createElement("canvas");
            pe.width = le, pe.height = J;
            const ce = pe.getContext("2d");
            ce && (ce.drawImage(D, 0, 0, F, N, 0, 0, le, J), ne = pe.toDataURL("image/png"));
          }
          a(e.id, {
            content: Q,
            settings: {
              ...(e.settings || {}),
              _stitchPreviewUrl: ne
            }
          });
        } catch (P) {
          u(P instanceof Error ? P.message : "拼回失败");
        } finally {
          l(!1);
        }
      }, [b, k.url, k.assetId, A.url, A.assetId, e.id, e.settings, a]),
      C = !!b && (!!k.url || !!k.assetId) && (!!A.url || !!A.assetId);
    return c.jsxs("div", {
      className: `w-full h-full flex flex-col rounded-2xl p-3 overflow-hidden min-h-0 ${r ? "bg-transparent" : "bg-white border border-zinc-200"}`,
      children: [c.jsxs("div", {
        className: "flex items-center gap-2 mb-2",
        children: [c.jsx(bWt, {
          size: 18,
          className: "text-zinc-500 shrink-0"
        }), c.jsx("span", {
          className: "text-xs font-medium truncate",
          children: x("无缝拼回")
        })]
      }), c.jsxs("div", {
        className: `text-[10px] space-y-1 mb-3 ${r ? "text-zinc-400" : "text-zinc-600"}`,
        children: [c.jsx("div", {
          className: f ? "text-green-600" : "text-zinc-500",
          children: x(f ? "✓ 裁剪局部重绘" : "○ 连接裁剪局部重绘")
        }), c.jsx("div", {
          className: w ? "text-green-600" : "text-zinc-500",
          children: x(w ? "✓ 图片输入-原图" : "○ 连接图片输入-原图")
        }), c.jsx("div", {
          className: y ? "text-green-600" : "text-zinc-500",
          children: x(y ? "✓ 重绘结果" : "○ 连接重绘结果")
        })]
      }), d && c.jsxs("div", {
        className: "flex items-center gap-1.5 mb-2 text-red-500 text-[10px]",
        children: [c.jsx(c3, {
          size: 12
        }), d]
      }), c.jsxs("button", {
        onClick: S,
        disabled: s || !C,
        className: `w-full py-1.5 rounded text-xs font-medium flex items-center justify-center gap-1.5 ${r ? "bg-zinc-700 hover:bg-zinc-600 text-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed" : "bg-zinc-200 hover:bg-zinc-300 text-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"}`,
        children: [s ? c.jsx(Ua, {
          size: 14,
          className: "animate-spin"
        }) : c.jsx(bWt, {
          size: 14
        }), x("拼回原图")]
      }), e.content && c.jsx("div", {
        className: "mt-2 flex-1 min-h-[160] rounded overflow-hidden flex items-center justify-center bg-zinc-100 dark:bg-zinc-800/50",
        onContextMenu: M => {
          o && (M.preventDefault(), M.stopPropagation(), o({
            visible: !0,
            x: M.clientX,
            y: M.clientY,
            item: {
              url: e.content,
              type: "image",
              sourceNode: e
            }
          }));
        },
        children: c.jsx("img", {
          src: ((E = e.settings) == null ? void 0 : E._stitchPreviewUrl) || e.content,
          alt: x("拼回结果"),
          className: "w-full h-full object-contain"
        }, typeof e.content == "string" ? `stitch-${e.content.length}` : "stitch-empty")
      })]
    });
  },
  $te = window.__AIYOUPLUS_LOCAL_CONFIG__?.receiverBaseUrl || "http://127.0.0.1:9528",
  i1o = () => {
    try {
      return typeof window < "u" && ("__TAURI_INTERNALS__" in window || "__TAURI__" in window || window.location.protocol === "tauri:");
    } catch {
      return !1;
    }
  },
  f$t = "qiaodoumayi_saved_folder_history",
  V0n = 10,
  pwe = () => {
    try {
      const e = localStorage.getItem(f$t);
      return e ? JSON.parse(e) : [];
    } catch {
      return [];
    }
  },
  o1o = e => {
    if (e.trim()) try {
      let t = pwe();
      t = t.filter(n => n !== e), t.unshift(e), t.length > V0n && (t = t.slice(0, V0n)), localStorage.setItem(f$t, JSON.stringify(t));
    } catch (t) {
      console.error("保存文件夹历史失败:", t);
    }
  },
  s1o = e => {
    try {
      let t = pwe();
      t = t.filter(n => n !== e), localStorage.setItem(f$t, JSON.stringify(t));
    } catch (t) {
      console.error("删除文件夹历史失败:", t);
    }
  },
  l1o = ({
    node: e,
    isDark: t,
    updateNode: n,
    getConnectedInputImages: r,
    getConnectedInputItems: a,
    hasMultiImageSource: i
  }) => {
    var j, B, F, N, G, z, V, O, L, D, U, H, Y, K, W, Q, q, ne, de, le, J, pe, ce, we, X, Z;
    on();
    const o = g.useMemo(() => a ? a(e.id) : r(e.id).map(fe => {
        let ye = "image";
        if (!fe) return {
          url: fe,
          type: ye
        };
        const ie = fe.toLowerCase();
        return fe.startsWith("data:") ? fe.startsWith("data:video/") ? ye = "video" : fe.startsWith("data:audio/") && (ye = "audio") : ie.includes(".mp4") || ie.includes(".webm") || ie.includes(".mov") || ie.includes("/v1/videos/") ? ye = "video" : (ie.includes(".mp3") || ie.includes(".wav") || ie.includes(".m4a") || ie.includes(".aac") || ie.includes(".ogg") || ie.includes(".flac") || ie.includes("audio/") || ie.includes("/v1/audio/")) && (ye = "audio"), {
          url: fe,
          type: ye
        };
      }), [a, r, e.id]),
      s = g.useMemo(() => o.map(re => re.url), [o]),
      l = i(e.id),
      d = g.useRef([]),
      u = g.useRef(!!((j = e.settings) != null && j.autoSave)),
      [h, p] = g.useState(pwe()),
      m = g.useRef(new Map()),
      [f, y] = g.useState(new Map()),
      b = re => {
        if (!re) return !1;
        if (re.startsWith("data:video/")) return !0;
        if (re.startsWith("data:image/") || re.startsWith("data:audio/")) return !1;
        const fe = re.toLowerCase();
        return fe.includes(".mp4") || fe.includes(".webm") || fe.includes(".mov") || fe.includes("/v1/videos/");
      },
      [v, _] = g.useState(new Set()),
      w = "VIDEO_PLACEHOLDER",
      k = g.useCallback(re => {
        if (m.current.has(re)) return;
        m.current.set(re, w);
        const fe = document.createElement("video");
        fe.crossOrigin = "anonymous", fe.muted = !0, fe.preload = "metadata", fe.onloadedmetadata = () => {
          fe.currentTime = .1;
        }, fe.onseeked = () => {
          try {
            const ye = document.createElement("canvas");
            ye.width = 64, ye.height = 64;
            const ie = ye.getContext("2d");
            if (ie && fe.videoWidth && fe.videoHeight) {
              const ae = Math.min(fe.videoWidth, fe.videoHeight),
                be = (fe.videoWidth - ae) / 2,
                Ee = (fe.videoHeight - ae) / 2;
              ie.drawImage(fe, be, Ee, ae, ae, 0, 0, 64, 64);
              const xe = ye.toDataURL("image/jpeg", .7);
              m.current.set(re, xe), y(new Map(m.current));
            }
          } catch {}
        }, fe.onerror = () => {}, fe.src = re;
      }, []);
    g.useEffect(() => {
      s.forEach(re => {
        b(re) && !m.current.has(re) && k(re);
      });
    }, [s, k]), g.useEffect(() => {
      const re = new Set(s);
      _(fe => {
        const ye = new Set(fe);
        return ye.forEach(ie => {
          re.has(ie) || ye.delete(ie);
        }), ye.size === fe.size ? fe : ye;
      });
    }, [s]);
    const A = i1o(),
      S = ((B = e.settings) == null ? void 0 : B.serverUrl) || $te,
      C = g.useCallback(async re => {
        const fe = async ae => {
          var Ee;
          let be = ((Ee = e.settings) == null ? void 0 : Ee.convertPngToJpg) ?? !0;
          try {
            const xe = await fetch(`${re}/config`, {
              method: "GET"
            });
            xe.ok && (be = (await xe.json()).convert_png_to_jpg === !0);
          } catch {
            typeof ae.convert_png_to_jpg == "boolean" && (be = ae.convert_png_to_jpg);
          }
          return {
            savePath: String(ae.save_path || ""),
            convertPngToJpg: be,
            builtin: ae.receiver === "tauri-builtin"
          };
        };
        if (A) try {
          await Fr("ensure_builtin_local_receiver");
          const ae = await Fr("ping_local_server", {
            port: window.__AIYOUPLUS_LOCAL_CONFIG__?.receiverPort || 9528
          });
          if ((ae == null ? void 0 : ae.status) === "running") return fe(ae);
        } catch {}
        const ye = await fetch(`${re}/ping`, {
          method: "GET"
        });
        if (!ye.ok) return null;
        const ie = await ye.json();
        return fe(ie);
      }, [A, (F = e.settings) == null ? void 0 : F.convertPngToJpg]),
      I = g.useCallback(re => {
        n(e.id, {
          settings: {
            ...e.settings,
            serverStatus: "connected",
            serverUrl: $te,
            savePath: re.savePath,
            convertPngToJpg: re.convertPngToJpg
          }
        });
      }, [e.id, e.settings, n]);
    g.useEffect(() => {
      var ae;
      if (((ae = e.settings) == null ? void 0 : ae.serverStatus) === "connected") return;
      n(e.id, {
        settings: {
          ...e.settings,
          serverStatus: "checking"
        }
      });
      let re = !1,
        fe = 0;
      const ye = A ? 30 : 3,
        ie = async () => {
          if (!re) {
            try {
              const be = await C(S);
              if (be && !re) {
                I(be);
                return;
              }
            } catch {}
            fe += 1, !re && fe < ye ? setTimeout(ie, A ? 400 : 1200) : re || n(e.id, {
              settings: {
                ...e.settings,
                serverStatus: "error"
              }
            });
          }
        };
      return ie(), () => {
        re = !0;
      };
    }, []);
    const E = re => {
        n(e.id, {
          settings: {
            ...e.settings,
            subfolder: re
          }
        });
      },
      M = (re, fe) => {
        fe.stopPropagation(), s1o(re), p(pwe());
      },
      T = async () => {
        n(e.id, {
          settings: {
            ...e.settings,
            serverStatus: "checking"
          }
        });
        try {
          const re = await C(S);
          re ? I(re) : n(e.id, {
            settings: {
              ...e.settings,
              serverStatus: "error"
            }
          });
        } catch {
          n(e.id, {
            settings: {
              ...e.settings,
              serverStatus: "error"
            }
          });
        }
      },
      P = g.useCallback(async (re = !1) => {
        var Ee, xe, he, ue, ge, _e;
        if (((Ee = e.settings) == null ? void 0 : Ee.serverStatus) !== "connected") {
          re || alert(x(A ? "本地保存服务尚未就绪，请稍候再试。" : `请先连接本地服务器！

运行 "启动本地接收器.bat" 启动服务。`));
          return;
        }
        if (s.length === 0) {
          re || alert(x("没有可保存的图片。请将图片节点连接到此节点。"));
          return;
        }
        const fe = ((xe = e.settings) == null ? void 0 : xe.serverUrl) || $te,
          ye = ((he = e.settings) == null ? void 0 : he.subfolder) || "",
          ie = ((ue = e.settings) == null ? void 0 : ue.convertPngToJpg) ?? !0;
        try {
          const ke = await fetch(`${fe}/config`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              convert_png_to_jpg: ie
            })
          });
          if (!ke.ok) console.warn(`[保存] 更新服务器配置失败，状态码: ${ke.status}，将使用当前配置`);else {
            const ve = await ke.json();
            console.log(`[保存] 服务器配置已更新: convert_png_to_jpg=${((ge = ve.config) == null ? void 0 : ge.convert_png_to_jpg) ?? ve.convert_png_to_jpg}`);
          }
        } catch (ke) {
          console.warn("[保存] 更新服务器配置失败:", ke);
        }
        const ae = [],
          be = ke => new Promise((ve, Te) => {
            const Ne = new FileReader();
            Ne.onloadend = () => ve(Ne.result), Ne.onerror = () => Te(new Error("FileReader failed")), Ne.readAsDataURL(ke);
          });
        for (let ke = 0; ke < o.length; ke++) {
          const {
              url: ve,
              type: Te,
              assetId: Ne
            } = o[ke],
            me = Te === "video",
            Ae = Te === "audio";
          try {
            let Fe = ve,
              Me = ".png";
            const Re = async () => {
              if (!Ne) return null;
              try {
                const rt = await Ur.readAsset(Ne);
                return rt ? rt.blob : (await ni.getAssetBlob(Ne)) || null;
              } catch {
                return null;
              }
            };
            if (me) {
              if (Me = ".mp4", !ve.startsWith("data:")) try {
                const rt = await Re();
                if (rt) Fe = await be(rt);else {
                  const nt = await fetch(ve, {
                    mode: "cors"
                  });
                  if (!nt.ok) throw new Error("Fetch failed");
                  const ze = await nt.blob();
                  Fe = await be(ze);
                }
              } catch {
                Fe = ve;
              }
            } else if (Ae) {
              if (ve.toLowerCase().includes(".mp3") ? Me = ".mp3" : ve.toLowerCase().includes(".wav") ? Me = ".wav" : ve.toLowerCase().includes(".m4a") ? Me = ".m4a" : ve.toLowerCase().includes(".aac") ? Me = ".aac" : ve.toLowerCase().includes(".ogg") ? Me = ".ogg" : ve.toLowerCase().includes(".flac") ? Me = ".flac" : Me = ".mp3", ve.startsWith("data:")) {
                if (ve.includes("data:audio/")) {
                  const rt = ve.match(/data:audio\/(\w+)/);
                  rt && (Me = {
                    mpeg: ".mp3",
                    wav: ".wav",
                    mp4: ".m4a",
                    aac: ".aac",
                    ogg: ".ogg",
                    flac: ".flac"
                  }[rt[1]] || Me);
                }
              } else try {
                const rt = await Re();
                let nt;
                rt ? nt = rt : nt = await (await fetch(ve)).blob(), nt.type.startsWith("audio/") && (Me = {
                  "audio/mpeg": ".mp3",
                  "audio/wav": ".wav",
                  "audio/x-wav": ".wav",
                  "audio/mp4": ".m4a",
                  "audio/aac": ".aac",
                  "audio/ogg": ".ogg",
                  "audio/flac": ".flac"
                }[nt.type] || Me), Fe = await be(nt);
              } catch {
                Fe = ve;
              }
            } else if (ve.startsWith("data:")) ve.includes("data:image/jpeg") || ve.includes("data:image/jpg") ? Me = ".jpg" : ve.includes("data:image/png") ? Me = ".png" : ve.includes("data:image/webp") && (Me = ".webp");else try {
              const rt = await Re();
              let nt;
              rt ? nt = rt : nt = await (await fetch(ve)).blob(), Fe = await be(nt), nt.type === "image/jpeg" || ve.toLowerCase().includes(".jpg") || ve.toLowerCase().includes(".jpeg") ? Me = ".jpg" : nt.type === "image/png" || ve.toLowerCase().includes(".png") ? Me = ".png" : (nt.type === "image/webp" || ve.toLowerCase().includes(".webp")) && (Me = ".webp");
            } catch {
              Fe = ve;
            }
            const $e = Date.now();
            ae.push({
              filename: `AIYOUPLUS_${$e}_${ke}${Me}`,
              content: Fe
            });
          } catch (Fe) {
            console.error("处理文件失败:", Fe);
          }
        }
        if (ae.length === 0) {
          alert(x("没有可保存的文件"));
          return;
        }
        try {
          const ve = await (await fetch(`${fe}/save-batch`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              files: ae,
              subfolder: ye
            })
          })).json();
          if (ve.success) {
            const Te = ((_e = e.settings) == null ? void 0 : _e.subfolder) || "";
            Te && (o1o(Te), p(pwe())), n(e.id, {
              settings: {
                ...e.settings,
                lastSaved: new Date().toISOString(),
                savedFiles: ve.results || [],
                lastSavedUrls: [...s]
              }
            }), re && console.log("[自动保存] 保存成功:", ve.message);
          } else re ? console.error("[自动保存] 保存失败:", ve.error) : alert(x("保存失败: {0}", ve.error || "未知错误"));
        } catch (ke) {
          console.error("保存请求失败:", ke), re || alert(x("保存失败: 无法连接到本地服务器")), n(e.id, {
            settings: {
              ...e.settings,
              serverStatus: "error"
            }
          });
        }
      }, [e.id, e.settings, s, n]),
      R = JSON.stringify(s);
    return g.useEffect(() => {
      var xe, he, ue;
      const re = !!((xe = e.settings) != null && xe.autoSave),
        fe = re && !u.current;
      if (u.current = re, !re || ((he = e.settings) == null ? void 0 : he.serverStatus) !== "connected" || s.length === 0 || l) return;
      const ye = R,
        ie = JSON.stringify(d.current),
        ae = JSON.stringify(((ue = e.settings) == null ? void 0 : ue.lastSavedUrls) || []);
      if (!(fe || ye !== ie && ye !== ae)) return;
      d.current = [...s], console.log("[自动保存] 触发保存，文件数:", s.length);
      const Ee = setTimeout(() => {
        P(!0);
      }, 1e3);
      return () => clearTimeout(Ee);
    }, [R, (N = e.settings) == null ? void 0 : N.autoSave, (G = e.settings) == null ? void 0 : G.serverStatus, l]), c.jsxs("div", {
      className: "flex flex-col h-full pointer-events-auto",
      children: [c.jsxs("div", {
        className: "flex-1 flex flex-col p-3 gap-2 overflow-auto rh-scroll-minimal",
        children: [A ? c.jsxs("div", {
          className: "space-y-1",
          children: [c.jsxs("div", {
            className: "flex items-center justify-between gap-2",
            children: [c.jsx("label", {
              className: `text-[10px] font-medium ${t ? "text-white/80" : "text-zinc-600"}`,
              children: x("本地保存")
            }), c.jsxs("span", {
              className: `flex items-center gap-1 text-[10px] font-medium ${((z = e.settings) == null ? void 0 : z.serverStatus) === "connected" ? t ? "text-white/80" : "text-green-600" : ((V = e.settings) == null ? void 0 : V.serverStatus) === "error" ? t ? "text-red-400" : "text-red-600" : t ? "text-white/60" : "text-zinc-500"}`,
              children: [c.jsx("span", {
                className: `w-1 h-1 rounded-full flex-shrink-0 ${((O = e.settings) == null ? void 0 : O.serverStatus) === "connected" ? t ? "bg-white/80" : "bg-green-500" : ((L = e.settings) == null ? void 0 : L.serverStatus) === "error" ? "bg-red-400" : t ? "bg-white/50" : "bg-zinc-400"}`
              }), ((D = e.settings) == null ? void 0 : D.serverStatus) === "connected" ? x("已就绪") : ((U = e.settings) == null ? void 0 : U.serverStatus) === "error" ? x("未就绪") : x("启动中")]
            })]
          }), c.jsx("div", {
            className: `text-[9px] ${t ? "text-white/50" : "text-zinc-500"}`,
            children: x("已内置在应用中，无需单独运行本地接收器")
          }), ((H = e.settings) == null ? void 0 : H.serverStatus) === "error" && c.jsx("button", {
            type: "button",
            className: `text-[9px] underline ${t ? "text-white/70 hover:text-white" : "text-blue-600 hover:text-blue-700"}`,
            onMouseDown: re => re.stopPropagation(),
            onClick: re => {
              re.stopPropagation(), T();
            },
            children: x("重新检测")
          })]
        }) : c.jsxs("div", {
          className: "space-y-1",
          children: [c.jsxs("div", {
            className: "flex items-center justify-between gap-2",
            children: [c.jsx("label", {
              className: `text-[10px] font-medium ${t ? "text-white/80" : "text-zinc-600"}`,
              children: x("服务器地址")
            }), c.jsxs("span", {
              className: `flex items-center gap-1 text-[10px] font-medium ${((Y = e.settings) == null ? void 0 : Y.serverStatus) === "connected" ? t ? "text-white/80" : "text-green-600" : ((K = e.settings) == null ? void 0 : K.serverStatus) === "error" ? t ? "text-red-400" : "text-red-600" : t ? "text-white/60" : "text-zinc-500"}`,
              children: [c.jsx("span", {
                className: `w-1 h-1 rounded-full flex-shrink-0 ${((W = e.settings) == null ? void 0 : W.serverStatus) === "connected" ? t ? "bg-white/80" : "bg-green-500" : ((Q = e.settings) == null ? void 0 : Q.serverStatus) === "error" ? "bg-red-400" : t ? "bg-white/50" : "bg-zinc-400"}`
              }), ((q = e.settings) == null ? void 0 : q.serverStatus) === "connected" ? x("已连接") : ((ne = e.settings) == null ? void 0 : ne.serverStatus) === "error" ? x("未连接") : x("检测中")]
            })]
          }), c.jsxs("div", {
            className: "flex gap-1",
            children: [c.jsx("input", {
              type: "text",
              value: ((de = e.settings) == null ? void 0 : de.serverUrl) || $te,
              onChange: re => n(e.id, {
                settings: {
                  ...e.settings,
                  serverUrl: re.target.value
                }
              }),
              placeholder: $te,
              className: `flex-1 px-2 py-1.5 text-xs rounded border outline-none ${t ? "bg-transparent border-white/30 text-white placeholder:text-white/40" : "bg-white border-zinc-300 text-zinc-800"}`,
              onMouseDown: re => re.stopPropagation()
            }), c.jsx("button", {
              className: `px-2 py-1 text-xs rounded border transition-colors ${t ? "border-white/30 text-white/80 hover:bg-white/5" : "border-zinc-300 text-zinc-700 hover:bg-zinc-100"}`,
              onMouseDown: re => re.stopPropagation(),
              onClick: re => {
                re.stopPropagation(), re.preventDefault(), T();
              },
              children: x("测试")
            })]
          })]
        }), c.jsxs("div", {
          className: "space-y-1",
          children: [c.jsx("label", {
            className: `text-[10px] font-medium ${t ? "text-white/80" : "text-zinc-600"}`,
            children: x("子文件夹（可选）")
          }), c.jsx("input", {
            type: "text",
            value: ((le = e.settings) == null ? void 0 : le.subfolder) || "",
            onChange: re => n(e.id, {
              settings: {
                ...e.settings,
                subfolder: re.target.value
              }
            }),
            placeholder: x("例如: project1/images"),
            className: `w-full px-2 py-1.5 text-xs rounded border outline-none ${t ? "bg-transparent border-white/30 text-white placeholder:text-white/40" : "bg-white border-zinc-300 text-zinc-800"}`,
            onMouseDown: re => re.stopPropagation()
          }), h.length > 0 ? c.jsx("div", {
            className: "flex flex-wrap gap-1 mt-1.5",
            children: h.slice(0, 5).map((re, fe) => {
              var ye;
              return c.jsx("button", {
                className: `px-1.5 py-0.5 text-[9px] rounded border transition-colors ${t ? "bg-transparent border-white/30 text-white/80 hover:bg-white/5" : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300 border-transparent"} ${((ye = e.settings) == null ? void 0 : ye.subfolder) === re ? t ? "ring-1 ring-white/50" : "ring-1 ring-green-500" : ""}`,
                onMouseDown: ie => ie.stopPropagation(),
                onClick: () => E(re),
                onContextMenu: ie => {
                  ie.preventDefault(), ie.stopPropagation(), M(re, ie);
                },
                title: x(`{0}
右键删除`, re),
                children: re.length > 12 ? re.slice(0, 12) + "..." : re
              }, fe);
            })
          }) : null]
        }), c.jsxs("div", {
          className: "flex items-center gap-2",
          children: [c.jsx("input", {
            type: "checkbox",
            id: `auto-save-${e.id}`,
            checked: !!((J = e.settings) != null && J.autoSave),
            onChange: re => n(e.id, {
              settings: {
                ...e.settings,
                autoSave: re.target.checked
              }
            }),
            className: "w-3.5 h-3.5 rounded",
            onMouseDown: re => re.stopPropagation()
          }), c.jsx("label", {
            htmlFor: `auto-save-${e.id}`,
            className: `text-[10px] ${t ? "text-white/80" : "text-zinc-600"}`,
            children: x("有新输入时自动保存")
          })]
        }), c.jsxs("div", {
          className: "flex items-center gap-2",
          children: [c.jsx("input", {
            type: "checkbox",
            id: `convert-png-${e.id}`,
            checked: !!(((pe = e.settings) == null ? void 0 : pe.convertPngToJpg) ?? !0),
            onChange: async re => {
              var ie;
              const fe = re.target.checked;
              n(e.id, {
                settings: {
                  ...e.settings,
                  convertPngToJpg: fe
                }
              });
              const ye = ((ie = e.settings) == null ? void 0 : ie.serverUrl) || $te;
              try {
                (await fetch(`${ye}/config`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    convert_png_to_jpg: fe
                  })
                })).ok || console.warn("更新服务器配置失败");
              } catch (ae) {
                console.warn("更新服务器配置失败:", ae);
              }
            },
            className: "w-3.5 h-3.5 rounded",
            onMouseDown: re => re.stopPropagation()
          }), c.jsx("label", {
            htmlFor: `convert-png-${e.id}`,
            className: `text-[10px] ${t ? "text-white/80" : "text-zinc-600"}`,
            children: x("PNG图片压缩为JPG")
          })]
        }), ((ce = e.settings) == null ? void 0 : ce.savePath) && c.jsxs("div", {
          className: `text-[10px] p-2 rounded border ${t ? "bg-transparent border-white/30 text-white/70" : "bg-zinc-100 text-zinc-600 border-transparent"}`,
          children: [x("保存路径: "), String(e.settings.savePath)]
        }), o.length > 0 && c.jsxs("div", {
          className: `p-2 rounded border ${t ? "bg-transparent border-white/30" : "bg-zinc-50 border-zinc-200"}`,
          children: [c.jsxs("div", {
            className: `text-[10px] font-medium mb-1.5 ${t ? "text-white/80" : "text-zinc-700"}`,
            children: [x("待保存文件 ("), o.length, ")"]
          }), c.jsxs("div", {
            className: "flex flex-wrap gap-1",
            children: [o.slice(0, 6).map((re, fe) => {
              const {
                  url: ye,
                  type: ie
                } = re,
                ae = ie === "video",
                be = ie === "audio",
                Ee = f.get(ye),
                xe = Ee && Ee !== "VIDEO_PLACEHOLDER" && Ee.startsWith("data:");
              if (ae) return xe ? c.jsxs("div", {
                className: "relative w-8 h-8 rounded overflow-hidden",
                children: [c.jsx("img", {
                  src: Ee,
                  className: "w-full h-full object-cover",
                  alt: x("视频 {0}", fe + 1)
                }), c.jsx("div", {
                  className: "absolute inset-0 flex items-center justify-center bg-black/30",
                  children: c.jsx(Ol, {
                    size: 10,
                    className: "text-white",
                    fill: "white"
                  })
                })]
              }, fe) : c.jsx("div", {
                className: `w-8 h-8 rounded border flex items-center justify-center ${t ? "bg-transparent border-white/30" : "bg-zinc-300 border-transparent"}`,
                children: c.jsx(Oo, {
                  size: 14,
                  className: t ? "text-white/60" : "text-blue-400"
                })
              }, fe);
              if (be) return c.jsx("div", {
                className: `w-8 h-8 rounded border flex items-center justify-center ${t ? "bg-transparent border-white/30" : "bg-zinc-300 border-transparent"}`,
                children: c.jsx(Qh, {
                  size: 14,
                  className: t ? "text-white/60" : "text-amber-400"
                })
              }, fe);
              const he = v.has(ye);
              return c.jsxs("div", {
                className: `relative w-8 h-8 rounded overflow-hidden border ${t ? "bg-transparent border-white/30" : "bg-zinc-200 border-transparent"}`,
                children: [!he && c.jsx("img", {
                  src: ye,
                  className: "w-full h-full object-cover",
                  alt: x("待保存 {0}", fe + 1),
                  onError: () => _(ue => new Set(ue).add(ye))
                }), he && c.jsx("div", {
                  className: "absolute inset-0 flex items-center justify-center",
                  children: c.jsx(lo, {
                    size: 14,
                    className: t ? "text-white/50" : "text-zinc-400"
                  })
                })]
              }, fe);
            }), o.length > 6 && c.jsxs("div", {
              className: `w-8 h-8 rounded border flex items-center justify-center text-[10px] ${t ? "bg-transparent border-white/30 text-white/60" : "bg-zinc-200 text-zinc-600 border-transparent"}`,
              children: ["+", o.length - 6]
            })]
          })]
        }), ((we = e.settings) == null ? void 0 : we.lastSaved) && c.jsxs("div", {
          className: `text-[10px] ${t ? "text-white/70" : "text-green-600"}`,
          children: [x("✓ 上次保存: "), new Date(String(e.settings.lastSaved)).toLocaleTimeString()]
        })]
      }), c.jsx("div", {
        className: `px-3 py-2 border-t ${t ? "border-white/30" : "border-zinc-200"}`,
        children: c.jsxs("button", {
          className: `w-full px-3 py-2 rounded border text-xs font-medium transition-colors flex items-center justify-center gap-1.5 ${((X = e.settings) == null ? void 0 : X.serverStatus) === "connected" ? t ? "bg-transparent border-white/30 hover:bg-white/5 text-white" : "bg-green-500 hover:bg-green-600 text-white border-transparent" : t ? "bg-transparent border-white/20 text-white/50 cursor-not-allowed" : "bg-zinc-200 text-zinc-500 cursor-not-allowed border-transparent"}`,
          disabled: ((Z = e.settings) == null ? void 0 : Z.serverStatus) !== "connected",
          onMouseDown: re => re.stopPropagation(),
          onClick: () => P(!1),
          children: [c.jsx(O5, {
            size: 14
          }), x("保存到本地")]
        })
      })]
    });
  },
  c1o = 52;

function g$t({
  node: e,
  isSelected: t,
  isDark: n,
  canvasZoomMediaOpacity: r,
  onDownload: a,
  onFullscreen: i
}) {
  on();
  const o = g.useRef(null);
  Qp(o, "50% 100%", !0);
  const s = $P(n);
  return c.jsx("div", {
    className: "absolute left-1/2 bottom-full z-[120] -translate-x-1/2 transition-opacity duration-200 ease-out",
    "data-compact-media-toolbar": !0,
    onDoubleClick: l => {
      l.preventDefault(), l.stopPropagation();
    },
    style: {
      marginBottom: `${c1o}px`,
      opacity: r,
      pointerEvents: t ? "auto" : "none"
    },
    children: c.jsx("div", {
      ref: o,
      style: {
        transition: "none",
        willChange: "transform"
      },
      children: c.jsx("div", {
        className: `transition-all duration-150 ${t ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-1 scale-[0.98] pointer-events-none"}`,
        onClick: l => l.stopPropagation(),
        onPointerDown: l => l.stopPropagation(),
        onMouseDown: l => l.stopPropagation(),
        children: c.jsx("div", {
          "data-canvas-pin-toolbar": "",
          "data-canvas-float-toolbar": "",
          className: UP(n),
          children: c.jsxs("div", {
            className: "flex items-center",
            children: [UD(e) && c.jsx($D, {
              nodeIds: [e.id],
              pins: Zg(e),
              isDark: n,
              size: "compact"
            }), c.jsx("button", {
              type: "button",
              className: s,
              onClick: a,
              "data-tip": x("下载"),
              children: c.jsx(ws, {
                size: 16
              })
            }), c.jsx("button", {
              type: "button",
              className: s,
              onClick: i,
              "data-tip": x("全屏"),
              children: c.jsx(kT, {
                size: 16
              })
            })]
          })
        })
      })
    })
  });
}

function y$t({
  isDark: e,
  onRetry: t
}) {
  return on(), c.jsxs("div", {
    className: `absolute inset-0 z-[80] flex flex-col items-center justify-center gap-2 rounded-2xl p-4 text-center pointer-events-auto ${e ? "bg-[#1f1f1f]/80" : "bg-white/80"}`,
    "data-compact-media-preview-fail": !0,
    onPointerDown: n => n.stopPropagation(),
    onClick: n => n.stopPropagation(),
    children: [c.jsx(iTn, {
      size: 48,
      className: e ? "text-zinc-400" : "text-zinc-500",
      strokeWidth: 1.25
    }), c.jsx("p", {
      className: `text-sm font-medium ${e ? "text-zinc-100" : "text-zinc-800"}`,
      children: x("预览加载失败")
    }), c.jsx("p", {
      className: `max-w-[200px] text-xs ${e ? "text-zinc-400" : "text-zinc-500"}`,
      children: x("图片无法显示，可重试加载")
    }), c.jsxs("button", {
      type: "button",
      className: `nodrag nopan mt-2 inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs ${e ? "border-white/15 text-zinc-100 hover:bg-white/10" : "border-zinc-300 text-zinc-800 hover:bg-zinc-100"}`,
      onClick: n => {
        n.stopPropagation(), t();
      },
      children: [c.jsx(ox, {
        size: 14
      }), x("重试")]
    })]
  });
}

function b$t(e, t) {
  return t ? "配置并生成" : e === "video" ? "请先连接视频源" : "请先连接图片源";
}

function yEe({
  node: e,
  resultUrl: t,
  mediaType: n,
  onDownloadSelected: r,
  setLightboxItem: a,
  setLightboxOpen: i
}) {
  const [o, s] = g.useState(!1),
    [l, d] = g.useState(0);
  g.useEffect(() => {
    s(!1), d(0);
  }, [t]);
  const u = g.useCallback(p => {
      if (p.stopPropagation(), !r) {
        Ai("error", "下载功能暂不可用");
        return;
      }
      r([e.id]);
    }, [r, e.id]),
    h = g.useCallback(p => {
      p.stopPropagation(), !(!a || !i || !t) && (n === "image" && Vhe(e.id), a({
        id: e.id,
        url: t,
        type: n,
        prompt: e.prompt || "",
        title: e.nodeName
      }), i(!0));
    }, [a, i, t, n, e.id, e.prompt, e.nodeName]);
  return {
    previewFailed: o,
    previewNonce: l,
    markPreviewFailed: () => s(!0),
    retryPreview: () => {
      s(!1), d(p => p + 1);
    },
    handleDownload: u,
    handleFullscreen: h
  };
}

async function Q$e(e) {
  return await new Promise((t, n) => {
    const r = new FileReader();
    r.onload = () => t(String(r.result || "")), r.onerror = () => n(new Error("本地资源转 Base64 失败")), r.readAsDataURL(e);
  });
}

async function H0n(e) {
  const t = z4t(e);
  if (t) return Q$e(t);
  const n = await fetch(e).then(r => {
    if (!r.ok) throw new Error("无法读取本地 blob 资源");
    return r.blob();
  });
  return Q$e(n);
}

function d1o(e, t, n) {
  var i;
  const r = t.find(o => o.to === e && (!o.inputType || o.inputType === "default")),
    a = r ? n.find(o => o.id === r.from) : void 0;
  if (a) return r9(a) || a._contentAssetId || ((i = a.settings) == null ? void 0 : i._contentAssetId);
}

function W0n(e, t) {
  return `${Math.round(e)}×${Math.round(t)}`;
}

const q0n = "jimeng_i2i_seed3_tilesr_cvtob",
  K0n = 400,
  u1o = [{
    value: "4k",
    label: "4K"
  }, {
    value: "8k",
    label: "8K"
  }],
  h1o = ({
    node: e,
    nodes: t,
    connections: n,
    isDark: r,
    updateNode: a,
    setNodes: i,
    getConnectedInputImages: o,
    jimengSuperResUrl: s = "",
    jimengSuperResApiKey: l = "",
    globalApiKey: d = "",
    generateId: u,
    setHistory: h,
    setConnections: p,
    selectedNodeId: m = null,
    setSelectedNodeId: f,
    setSelectedNodeIds: y,
    onGenPromptPanelUiChange: b,
    enableGenerationNodeAnimation: v = !0,
    setLightboxItem: _,
    setLightboxOpen: w,
    onDownloadSelected: k
  }) => {
    var Le, Ke, Xe;
    on();
    const [A, S] = g.useState(() => !!e.isGenerating),
      [C, I] = g.useState(!1),
      E = g.useRef(null),
      M = g.useRef(null),
      T = g.useRef(!!e.isGenerating),
      P = A || !!e.isGenerating || C;
    g.useEffect(() => {
      const De = A || !!e.isGenerating;
      T.current && !De && I(!0), T.current = De;
    }, [A, e.isGenerating]);
    const [R, j] = g.useState(null),
      [B, F] = g.useState(null),
      [N, G] = g.useState(null),
      [z, V] = g.useState(!1),
      [O, L] = g.useState(() => Cd().zoom || 1),
      [D, U] = g.useState(() => {
        var De;
        return !!((De = e.settings) != null && De.genUseAliyunOss);
      }),
      [H, Y] = g.useState(() => ua()),
      [K, W] = g.useState(() => Ph()),
      [Q, q] = g.useState(() => mo()),
      ne = g.useRef(e.settings);
    g.useEffect(() => {
      ne.current = e.settings;
    }, [e.settings]);
    const de = g.useRef(null),
      le = g.useRef(null),
      J = g.useRef(null),
      pe = g.useRef(!1);
    pe.current = z;
    const ce = ((Le = e.settings) == null ? void 0 : Le.resolution) || "4k",
      we = ((Ke = e.settings) == null ? void 0 : Ke.scale) ?? 50;
    g.useEffect(() => {
      var De;
      U(!!((De = e.settings) != null && De.genUseAliyunOss));
    }, [e.id, (Xe = e.settings) == null ? void 0 : Xe.genUseAliyunOss]), g.useEffect(() => {
      const De = () => {
        Y(ua()), W(Ph()), q(mo());
      };
      return De(), window.addEventListener(go, De), () => window.removeEventListener(go, De);
    }, []), g.useEffect(() => {
      if (K || H || !D) return;
      U(!1);
      const De = {
        ...ne.current
      };
      De.genUseAliyunOss && a(e.id, {
        settings: {
          ...De,
          genUseAliyunOss: !1
        }
      });
    }, [K, H, D, e.id, a]);
    const Z = o(e.id)[0] || null,
      re = g.useMemo(() => d1o(e.id, n, t), [e.id, n, t]),
      fe = m === e.id,
      ye = typeof e.content == "string" ? e.content.trim() : "";
    g.useEffect(() => {
      if (!Z) {
        F(null);
        return;
      }
      let De = !1,
        Ye = null;
      return (async () => {
        try {
          const {
              resolveConnectedInputOriginalUrlAsync: Ce
            } = await Ie(async () => {
              const {
                resolveConnectedInputOriginalUrlAsync: Ve
              } = await Promise.resolve().then(() => ii);
              return {
                resolveConnectedInputOriginalUrlAsync: Ve
              };
            }, void 0, import.meta.url),
            He = await Ce(e.id, Z, n, t, {
              assetId: re,
              mediaType: "image"
            });
          if (De) {
            He.startsWith("blob:") && He !== Z && M9e(He);
            return;
          }
          He.startsWith("blob:") && He !== Z && (Ye = He), F(He || null);
        } catch (Ce) {
          console.error("[JimengSuperRes] 输入原图解析失败:", Ce), De || F(Z);
        }
      })(), () => {
        De = !0, M9e(Ye);
      };
    }, [Z, e.id, n, t, re]), g.useEffect(() => {
      if (!ye) {
        G(null);
        return;
      }
      let De = !1;
      return (async () => {
        let Ye = ye;
        try {
          if (Ye.startsWith("content_ref:")) {
            await Er.init();
            const Ce = await Er.get(Er.extractId(Ye));
            Ce && (Ye = Ce);
          }
        } catch {}
        De || G(Ye);
      })(), () => {
        De = !0;
      };
    }, [ye]);
    const ie = g.useCallback(() => {
        zb(e.id, f, y, 500, {
          forceSingle: !0
        }), Dd(e.id, !0), b == null || b(e.id, !0), V(!0);
      }, [e.id, b, f, y]),
      ae = g.useCallback(() => {
        V(!1), Dd(e.id, !1), b == null || b(e.id, !1);
      }, [e.id, b]),
      be = g.useRef(!1);
    g.useEffect(() => {
      fe && !be.current ? ie() : !fe && pe.current && ae(), be.current = fe;
    }, [fe]), g.useEffect(() => () => {
      Dd(e.id, !1), b == null || b(e.id, !1);
    }, [e.id, b]), g.useEffect(() => (L(Cd().zoom || 1), dw(De => {
      L(De.zoom || 1);
    })), []), g.useEffect(() => {
      if (!z) return;
      const De = Ye => {
        var He, Ve;
        const Ce = Ye.target;
        Ce && ((He = de.current) != null && He.contains(Ce) || (Ve = le.current) != null && Ve.contains(Ce) || ae());
      };
      return window.addEventListener("mousedown", De, !0), () => window.removeEventListener("mousedown", De, !0);
    }, [z, ae]);
    const Ee = yI({
      hostRef: le,
      open: z,
      zoom: O,
      remeasureKey: `${z}`,
      stabilizeNodeId: e.id
    });
    Qp(J, "50% 0%", z);
    const xe = g.useCallback((De, Ye) => {
        !(De > 0) || !(Ye > 0) || l5({
          nodeId: e.id,
          mw: De,
          mh: Ye,
          setNodes: i,
          currentWidth: e.width,
          currentHeight: e.height,
          hasCustomSize: !1,
          actualSizeLabel: {
            w: De,
            h: Ye
          }
        });
      }, [e.height, e.id, e.width, i]),
      he = y9(O),
      {
        previewFailed: ue,
        previewNonce: ge,
        markPreviewFailed: _e,
        retryPreview: ke,
        handleDownload: ve,
        handleFullscreen: Te
      } = yEe({
        node: e,
        resultUrl: N,
        mediaType: "image",
        onDownloadSelected: k,
        setLightboxItem: _,
        setLightboxOpen: w
      }),
      Ne = lTt(s || ""),
      me = (l || d || "").trim(),
      Ae = (De, Ye, Ce) => {
        const He = dTt(Ye, De);
        if (He) return He;
        const Ve = typeof Ye.message == "string" && Ye.message || typeof Ye.error == "string" && Ye.error || "";
        return De === 400 && Ve ? Ve : Ve || Ce || "提交失败";
      },
      Fe = g.useCallback(async () => {
        var Ve, it, It, Ft, We;
        if (!Ne) {
          j("请在「模型接口配置」- 工具 中填写即梦智能超清的 BASE URL");
          return;
        }
        if (!me) {
          j("请在「模型接口配置」→ 工具 → 即梦智能超清（或全局 API Key）填写火山访问控制的 AK:SK，格式 AccessKeyId:SecretAccessKey");
          return;
        }
        const De = cTt(me);
        if (De) {
          j(De);
          return;
        }
        if (!Z) {
          j("请先连接一张图片（图片输入或预览节点）");
          return;
        }
        j(null), I(!1), S(!0), a(e.id, {
          isGenerating: !0,
          errorMsg: ""
        });
        const Ye = Date.now(),
          Ce = h ? u() : "";
        if (h) {
          const Ze = {
              id: Ce,
              url: "",
              type: "image",
              prompt: `即梦智能超清 ${ce}`,
              time: new Date().toLocaleTimeString(),
              status: "generating",
              progress: 5,
              modelName: "即梦智能超清",
              sourceNodeId: e.id,
              startTime: Ye
            },
            Ge = !!((Ve = e.settings) != null && Ve.genUseAliyunOss) || ua();
          h(Oe => [Ze, ...(Ge ? Oe : Oe.slice(0, 99))]);
        }
        let He = null;
        try {
          if (!(await uTt())) throw new Error("内置即梦智能超清代理启动失败");
          const {
              resolveConnectedInputOriginalUrlAsync: Ze
            } = await Ie(async () => {
              const {
                resolveConnectedInputOriginalUrlAsync: Jn
              } = await Promise.resolve().then(() => ii);
              return {
                resolveConnectedInputOriginalUrlAsync: Jn
              };
            }, void 0, import.meta.url),
            Ge = !!((it = e.settings) != null && it.genUseAliyunOss) || ua(),
            Oe = !ua(),
            st = n.find(Jn => Jn.to === e.id && (!Jn.inputType || Jn.inputType === "default")),
            vt = st ? t.find(Jn => Jn.id === st.from) : void 0,
            Ht = re,
            nn = typeof ((It = vt == null ? void 0 : vt.settings) == null ? void 0 : It._localOriginalUrlHint) == "string" ? String(vt.settings._localOriginalUrlHint).trim() : void 0;
          let pt = await Ze(e.id, Z, n, t, {
            assetId: Ht,
            mediaType: "image"
          });
          if (!pt) throw new Error("无法解析输入原图");
          let lt = pt;
          if (Oe) {
            let Jn = null;
            if (Ht) try {
              const {
                  readLocalOriginalAssetBlob: Kn
                } = await Ie(async () => {
                  const {
                    readLocalOriginalAssetBlob: Vn
                  } = await Promise.resolve().then(() => Ui);
                  return {
                    readLocalOriginalAssetBlob: Vn
                  };
                }, void 0, import.meta.url),
                en = await Kn(Ht, nn, {
                  allowPreviewFallback: !1
                });
              en && en.size > 0 && (Jn = await Q$e(en));
            } catch (Kn) {
              console.warn("[JimengSuperRes] assetId 直读原图失败，回退 URL 链:", Kn);
            }
            if (!Jn && (pt.startsWith("blob:") || vs(pt))) try {
              Jn = await H0n(pt);
            } catch {
              const {
                  recoverDeadBlobUrl: Kn
                } = await Ie(async () => {
                  const {
                    recoverDeadBlobUrl: Tt
                  } = await Promise.resolve().then(() => No);
                  return {
                    recoverDeadBlobUrl: Tt
                  };
                }, void 0, import.meta.url),
                en = await Kn(pt, [Ht]);
              if (!en) throw new Error("无法读取本地原图，请重新连接图片来源");
              const Vn = z4t(en);
              Vn ? Jn = await Q$e(Vn) : (Jn = await H0n(en), en.startsWith("blob:") && en !== Z && (He = en));
            }
            if (!Jn && pt.startsWith("data:") && (Jn = pt), !Jn) throw new Error("无法读取本地原图，请重新连接图片来源");
            lt = Jn;
          }
          const gt = await t5n(lt, 4.5 * 1024 * 1024, 4096, Jn => console.log(`[智能超清] ${Jn}`)),
            Ut = `${Ne}/jimeng/visual/super-resolution/submit`,
            _t = {
              req_key: q0n,
              binary_data_base64: [gt],
              resolution: ce === "8k" ? "8k" : "4k",
              scale: Math.max(0, Math.min(100, we))
            },
            At = await fetch(Ut, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                ...(me ? {
                  Authorization: `Bearer ${me}`
                } : {})
              },
              body: JSON.stringify(_t)
            }),
            Yt = await At.json().catch(() => ({}));
          if (Yt.code !== 1e4 || !((Ft = Yt.data) != null && Ft.task_id)) {
            const Jn = Ae(At.status, Yt, At.statusText);
            j(Jn), S(!1), a(e.id, {
              isGenerating: !1,
              errorMsg: Jn
            });
            return;
          }
          const qe = Yt.data.task_id,
            kt = `${Ne}/jimeng/visual/super-resolution/result`,
            St = {
              req_key: q0n,
              task_id: qe,
              req_json: JSON.stringify({
                return_url: !0
              })
            },
            hn = async Jn => {
              var Tt, Ue, et;
              const en = await (await fetch(kt, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  ...(me ? {
                    Authorization: `Bearer ${me}`
                  } : {})
                },
                body: JSON.stringify(St)
              })).json();
              if (en.code !== 1e4) throw new Error(en.message || "查询失败");
              const Vn = (((Tt = en.data) == null ? void 0 : Tt.status) || "").toLowerCase();
              if (Vn === "done") {
                const ft = (Ue = en.data) == null ? void 0 : Ue.image_urls;
                if (ft && ft.length > 0) return ft[0];
                const ht = (et = en.data) == null ? void 0 : et.binary_data_base64;
                if (ht && ht.length > 0) return `data:image/jpeg;base64,${ht[0]}`;
                throw new Error("结果中无图片");
              }
              if (Vn === "not_found" || Vn === "expired") throw new Error(Vn === "expired" ? "任务已过期" : "任务未找到");
              return await new Promise(ft => setTimeout(ft, 2e3)), hn(Jn + 1);
            },
            Qt = await hn(0),
            Ot = Ce || `jimeng_sr_${u()}`,
            ln = await PCt([Qt], Ot, {
              nodeId: e.id,
              model: "jimeng-super-resolution"
            });
          let Pn = ln.primaryDisplayUrl;
          const rn = ln.usedOss && ln.ossPack ? _T(ln.ossPack, {
            type: "image"
          }) : {};
          let Yn;
          if (!ln.usedOss && ln.contentAssetId) try {
            const {
                persistGenResultPreviewThumbnail: Jn
              } = await Ie(async () => {
                const {
                  persistGenResultPreviewThumbnail: Vn
                } = await Promise.resolve().then(() => ii);
                return {
                  persistGenResultPreviewThumbnail: Vn
                };
              }, void 0, import.meta.url),
              Kn = String(ln.remoteUrls[0] || Qt || "").trim(),
              en = await Jn(Kn || Pn, `preview_${ln.contentAssetId}`, ln.contentAssetId);
            en && (Pn = en), Yn = `preview_${ln.contentAssetId}`;
          } catch {}
          a(e.id, {
            content: Pn,
            _contentAssetId: ln.contentAssetId,
            isGenerating: !1,
            errorMsg: "",
            settings: {
              ...(e.settings || {}),
              ...(((We = ln.ossPack) == null ? void 0 : We.ossSettings) || {}),
              generatedImages: ln.generatedImages,
              ...(!ln.usedOss && ln.contentAssetId ? {
                _contentAssetId: ln.contentAssetId,
                _localCacheAssetId: ln.contentAssetId,
                ...(Yn ? {
                  _thumbnailAssetId: Yn
                } : {})
              } : {})
            }
          });
          const Ct = Jn => {
              const Kn = {
                ...Jn,
                content: Pn,
                previewType: "image",
                _contentAssetId: ln.usedOss ? void 0 : ln.contentAssetId
              };
              if (ln.usedOss && ln.ossPack) Kn.settings = {
                ...(Jn.settings || {}),
                ...(ln.ossPack.ossSettings || {}),
                previewOssRemoteUrl: ln.remoteUrls[0],
                generatedImages: ln.generatedImages,
                disableThumbnailCreationOnImport: !0
              };else {
                const en = String(ln.remoteUrls[0] || Qt || "").trim();
                Kn.settings = {
                  ...(Jn.settings || {}),
                  ...(ln.contentAssetId ? {
                    _contentAssetId: ln.contentAssetId
                  } : {}),
                  ...(ln.contentAssetId ? {
                    _localCacheAssetId: ln.contentAssetId
                  } : {}),
                  ...(Yn ? {
                    _thumbnailAssetId: Yn
                  } : {}),
                  ...(en ? {
                    originalResultUrl: en
                  } : {}),
                  generatedImages: ln.generatedImages
                };
              }
              return Kn;
            },
            un = n.filter(Jn => Jn.from === e.id).map(Jn => t.find(Kn => Kn.id === Jn.to)).filter(Jn => Jn != null && Jn.type === "preview").map(Jn => Jn.id);
          un.length > 0 && i(Jn => Jn.map(Kn => un.includes(Kn.id) ? Ct(Kn) : Kn)), h && Ce && h(Jn => Jn.map(Kn => Kn.id === Ce ? {
            ...Kn,
            url: ln.remoteUrls[0] || Qt,
            status: "completed",
            progress: 100,
            durationMs: Math.max(0, Date.now() - Ye),
            generationTime: `${((Date.now() - Ye) / 1e3).toFixed(1)}s`,
            errorMsg: "",
            _assetId: ln.contentAssetId,
            ...rn
          } : Kn)), Ge && !ln.usedOss && Ce && ln.contentAssetId && Ie(async () => {
            const {
              scheduleHistoryOssAutoUpload: Jn
            } = await Promise.resolve().then(() => qh);
            return {
              scheduleHistoryOssAutoUpload: Jn
            };
          }, void 0, import.meta.url).then(({
            scheduleHistoryOssAutoUpload: Jn
          }) => Jn(Ce, [ln.contentAssetId])).catch(() => {});
        } catch (Ze) {
          const Ge = Ze instanceof Error ? Ze.message : "生成失败";
          j(Ge), a(e.id, {
            isGenerating: !1,
            errorMsg: Ge
          }), h && Ce && h(Oe => Oe.map(st => st.id === Ce ? {
            ...st,
            status: "failed",
            progress: 0,
            errorMsg: Ge
          } : st));
        } finally {
          M9e(He), S(!1);
        }
      }, [Z, ce, we, Ne, me, e.id, e.settings, n, t, a, i, h, u, re]),
      Me = `text-xs shrink-0 w-[4.5rem] ${r ? "text-white/70" : "text-zinc-500"}`,
      Re = r ? "bg-white text-black border-white" : "bg-zinc-900 text-white border-zinc-900",
      $e = r ? "border-white/20 text-white/90 hover:bg-white/5" : "border-zinc-300 text-zinc-800 hover:bg-zinc-50",
      rt = !!Z && !A,
      nt = g.useCallback(() => {
        if (H || !K) return null;
        const De = $g(Q);
        return c.jsxs("label", {
          className: `sketch-chat-web-chip${r ? " sketch-chat-web-chip--dark" : ""}`,
          onMouseDown: Ye => Ye.stopPropagation(),
          title: Jk(Q),
          children: [c.jsx("input", {
            type: "checkbox",
            checked: D,
            onChange: Ye => {
              const Ce = Ye.target.checked;
              U(Ce);
              const He = {
                ...ne.current
              };
              a(e.id, {
                settings: {
                  ...He,
                  genUseAliyunOss: Ce
                }
              });
            },
            className: "h-3 w-3 cursor-pointer"
          }), c.jsx("span", {
            className: "whitespace-nowrap",
            title: x(De),
            children: x(De)
          })]
        });
      }, [H, K, Q, D, r, e.id, a]),
      ze = De => {
        if (De.button !== 0 || De.ctrlKey || De.metaKey) return;
        const Ye = De.clientX,
          Ce = De.clientY;
        let He = !0;
        const Ve = It => {
            Math.hypot(It.clientX - Ye, It.clientY - Ce) > 8 && (He = !1);
          },
          it = It => {
            window.removeEventListener("pointermove", Ve), window.removeEventListener("pointerup", it), window.removeEventListener("pointercancel", it), He && (Math.hypot(It.clientX - Ye, It.clientY - Ce) > 8 || ie());
          };
        window.addEventListener("pointermove", Ve), window.addEventListener("pointerup", it), window.addEventListener("pointercancel", it);
      };
    return c.jsxs("div", {
      ref: de,
      className: "relative w-full h-full overflow-visible",
      children: [fe && N ? c.jsx(g$t, {
        node: e,
        isSelected: fe,
        isDark: r,
        canvasZoomMediaOpacity: he,
        onDownload: ve,
        onFullscreen: Te
      }) : null, c.jsxs("div", {
        "data-jimeng-super-res-preview": !0,
        className: `relative w-full h-full rounded-2xl overflow-hidden cursor-pointer border-0 ${Sp(r)}`,
        onPointerDown: ze,
        children: [N ? c.jsx("div", {
          className: "flex h-full w-full min-h-0 min-w-0 items-center justify-center overflow-hidden rounded-2xl",
          children: c.jsx("img", {
            src: N,
            alt: x("超清结果"),
            className: "h-full w-full min-h-0 min-w-0 object-contain",
            draggable: !1,
            ...Yg(!1),
            onError: _e,
            onLoad: De => {
              var Ft;
              const Ye = De.currentTarget,
                Ce = vU(Ye.src),
                He = (Ce == null ? void 0 : Ce.width) || Ye.naturalWidth,
                Ve = (Ce == null ? void 0 : Ce.height) || Ye.naturalHeight;
              if (!(He > 0 && Ve > 0)) return;
              const it = !Ce && nl(He, Ve);
              if (xe(He, Ve), it) return;
              const It = Hs((Ft = e.settings) == null ? void 0 : Ft.previewActualSize);
              It && !nl(It.w, It.h) || a(e.id, {
                settings: {
                  ...(e.settings || {}),
                  previewActualSize: W0n(He, Ve),
                  previewSize: W0n(He, Ve),
                  hasCustomSize: void 0
                }
              });
            }
          }, `${N}:${ge}`)
        }) : c.jsxs("div", {
          className: `absolute inset-0 flex flex-col items-center justify-center gap-2 px-3 text-center text-xs ${r ? "text-white/55" : "text-zinc-500"}`,
          children: [c.jsx(lo, {
            size: 22,
            className: "opacity-70"
          }), c.jsx("span", {
            children: b$t("image", !!Z)
          })]
        }), P && c.jsx("div", {
          "data-compact-gen-progress-layer": !0,
          className: `absolute inset-0 z-[60] overflow-hidden pointer-events-none transition-opacity duration-400 ease-out ${C && !A && !e.isGenerating ? "opacity-0" : "opacity-100"}`,
          onTransitionEnd: De => {
            De.propertyName === "opacity" && C && !A && !e.isGenerating && I(!1);
          },
          "aria-hidden": !0,
          children: c.jsx(Yv, {
            seed: e.id,
            progressFillRef: E,
            progressThinBarRef: M,
            isDark: r
          })
        }), ue && N ? c.jsx(y$t, {
          isDark: r,
          onRetry: ke
        }) : null, R ? c.jsx("div", {
          className: "absolute bottom-2 left-2 right-2 z-20 rounded-lg bg-black/55 px-2 py-1 text-[11px] text-red-300",
          children: R
        }) : null]
      }), c.jsx("div", {
        ref: le,
        "data-gen-prompt-panel": "true",
        className: z ? wD : "hidden",
        style: {
          width: `min(${K0n}px, 90vw)`,
          maxWidth: `min(${K0n}px, 90vw)`,
          boxSizing: "border-box",
          ...Ee.style
        },
        onMouseDown: De => {
          De.stopPropagation(), zb(e.id, f, y, 500, {
            forceSingle: !0
          });
        },
        children: c.jsxs("div", {
          ref: J,
          className: `rounded-2xl border p-3 ${r ? "border-white/15 bg-[#1f1f1f] text-white" : "border-zinc-200 bg-white text-zinc-900"}`,
          style: {
            transition: "none",
            width: "100%"
          },
          children: [c.jsxs("div", {
            className: "mb-3 flex items-center gap-2",
            children: [c.jsx("span", {
              className: `inline-flex h-8 items-center rounded-md border px-3 text-xs font-medium ${r ? "border-white/20 bg-[#121212] text-white" : "border-zinc-300 bg-white text-zinc-900"}`,
              children: x("智能超清")
            }), c.jsx("div", {
              className: `h-8 w-8 shrink-0 overflow-hidden rounded-md border ${r ? "border-white/15 bg-black/30" : "border-zinc-200 bg-zinc-50"}`,
              children: B ? c.jsx("img", {
                src: B,
                alt: x("输入"),
                className: "h-full w-full object-cover",
                draggable: !1
              }) : c.jsx("div", {
                className: "flex h-full w-full items-center justify-center opacity-40",
                children: c.jsx(lo, {
                  size: 12
                })
              })
            })]
          }), c.jsxs("div", {
            className: "space-y-2.5",
            children: [c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx("span", {
                className: Me,
                children: x("模型选择")
              }), c.jsxs("div", {
                className: `h-9 flex-1 rounded-lg border px-3 flex items-center justify-between text-sm ${r ? "border-white/20 bg-[#1f1f1f]" : "border-zinc-300 bg-white"}`,
                children: [c.jsx("span", {
                  children: x("即梦 AI")
                }), c.jsx(Mi, {
                  size: 14,
                  className: "opacity-40"
                })]
              })]
            }), c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx("span", {
                className: Me,
                children: x("输出分辨率")
              }), c.jsx("div", {
                className: "flex flex-1 gap-2",
                children: u1o.map(De => c.jsx("button", {
                  type: "button",
                  className: `flex-1 h-8 rounded-lg text-sm border transition-colors ${ce === De.value ? Re : $e}`,
                  onClick: () => a(e.id, {
                    settings: {
                      ...e.settings,
                      resolution: De.value
                    }
                  }),
                  children: x(De.label)
                }, De.value))
              })]
            }), c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx("span", {
                className: Me,
                children: x("细节增强")
              }), c.jsxs("div", {
                className: `h-9 flex-1 rounded-lg border px-3 flex items-center gap-2 ${r ? "border-white/20 bg-[#1f1f1f]" : "border-zinc-300 bg-white"}`,
                children: [c.jsx("input", {
                  type: "range",
                  min: 0,
                  max: 100,
                  value: we,
                  onChange: De => a(e.id, {
                    settings: {
                      ...e.settings,
                      scale: Number(De.target.value)
                    }
                  }),
                  className: `flex-1 min-w-0 ${r ? "h-0.5 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-0 [&::-moz-range-track]:bg-white/20 [&::-moz-range-track]:rounded-full [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-2.5 [&::-moz-range-thumb]:h-2.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer" : "h-1.5 accent-amber-500"}`
                }), c.jsx("span", {
                  className: `text-sm tabular-nums w-8 text-right shrink-0 ${r ? "text-white/80" : "text-zinc-600"}`,
                  children: we
                })]
              })]
            })]
          }), R ? c.jsx("div", {
            className: "mt-2 text-[11px] text-red-400",
            children: R
          }) : null, c.jsxs("div", {
            className: "mt-3 flex items-center justify-end gap-2",
            children: [nt(), c.jsx("button", {
              type: "button",
              disabled: !rt,
              title: x("开始智能超清"),
              "aria-label": x("开始智能超清"),
              onClick: De => {
                De.stopPropagation(), Fe();
              },
              className: `flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-opacity active:scale-95 ${rt ? "bg-white text-black hover:opacity-90" : r ? "cursor-not-allowed bg-white/25 text-black/40" : "cursor-not-allowed bg-zinc-300 text-zinc-500"}`,
              children: A ? c.jsx(Ua, {
                size: 16,
                className: "animate-spin",
                strokeWidth: 2.5
              }) : c.jsx(Gc, {
                size: 16,
                strokeWidth: 2.5
              })
            })]
          })]
        })
      })]
    });
  };

function Y$e(e) {
  return String(e || "").trim().replace(/^Bearer\s+/i, "");
}

function p1o(e) {
  let n = (e.type || "").trim(),
    r = "mp4";
  return (!n || n === "application/octet-stream") && (n = "video/mp4"), n.includes("quicktime") || n.includes("mov") ? r = "mov" : n.includes("webm") ? r = "webm" : r = "mp4", new File([e], `huya-enhance-video-${Date.now()}.${r}`, {
    type: n
  });
}

function m1o(e = "") {
  const t = Sz,
    n = Qa.getResolvedModelBaseUrl(t),
    r = Qa.getEffectiveApiKey(t),
    a = tKe({
      modelId: t,
      configKey: r,
      globalApiKey: e,
      baseUrl: n
    }) || eKe(t) || Y$e(e),
    i = Mqe(n || Eqe),
    o = b3(i) || "https://art.huya.info/openapi/v1";
  return {
    apiKey: Y$e(a),
    submitUrl: i,
    openApiRoot: o
  };
}

async function f1o(e, t, n, r) {
  let a = String(e || "").trim();
  if (!a) throw new Error("输入视频为空");
  if (a.startsWith("content_ref:")) {
    await Er.init();
    const u = Er.extractId(a),
      h = await Er.get(u);
    if (!h) throw new Error("无法读取输入视频");
    a = h;
  }
  const i = String(t).trim().replace(/\/+$/, ""),
    o = fhe(i),
    s = Array.from(new Set([o, ...kZ(i)].filter(Boolean)));
  let l = null;
  if (r != null && r.assetId) try {
    const {
      assetStore: u
    } = await Ie(async () => {
      const {
        assetStore: h
      } = await Promise.resolve().then(() => Ri);
      return {
        assetStore: h
      };
    }, void 0, import.meta.url);
    l = await u.getAssetBlob(r.assetId);
  } catch {
    l = null;
  }
  if ((!l || l.size === 0) && a.startsWith(Ld)) {
    const u = (r == null ? void 0 : r.assetId) || a.slice(Ld.length);
    if (u) try {
      const {
        assetStore: h
      } = await Ie(async () => {
        const {
          assetStore: p
        } = await Promise.resolve().then(() => Ri);
        return {
          assetStore: p
        };
      }, void 0, import.meta.url);
      l = await h.getAssetBlob(u);
    } catch {
      l = null;
    }
  }
  if ((!l || l.size === 0) && (l = await Ns(a)), !l || l.size === 0) throw new Error("无法读取输入视频以上传海艺");
  const d = p1o(l);
  return XP(d, i, n, {
    uploadCandidates: s
  });
}

async function g1o(e) {
  var l;
  const t = Y$e(e.apiKey);
  if (!q7(t)) throw new Error("请先配置虎牙海艺 OpenAPI Token（AI-xxx）：模型接口配置 → 视频 → 虎牙视频放大，或任意虎牙模型 Key");
  const n = a7n(e.resolutionUi),
    r = {
      skill: "enhance-video",
      video_url: e.videoUrl,
      enhance_version: "professional",
      resolution: n
    },
    a = await $i(e.submitUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${t}`
      },
      body: JSON.stringify(r)
    }),
    i = await a.text();
  let o = {};
  try {
    o = i ? JSON.parse(i) : {};
  } catch {
    o = {};
  }
  if (!a.ok) {
    const d = hd(o, "") || String(o.error || o.message || i.slice(0, 160) || `HTTP ${a.status}`);
    throw new Error(`虎牙视频放大提交失败：${d}`);
  }
  const s = String(o.task_id || o.taskId || ((l = o.data) == null ? void 0 : l.task_id) || "").trim();
  if (!s) throw new Error("虎牙视频放大未返回 task_id");
  return s;
}

async function y1o(e) {
  var r;
  const t = Y$e(e.apiKey),
    n = gk(e.openApiRoot, e.taskId);
  for (let a = 0; a < i7n; a++) {
    if ((r = e.signal) != null && r.aborted) throw new Error("已取消");
    a > 0 && (await new Promise(u => setTimeout(u, ES)));
    const o = await (await $i(n, {
      headers: {
        Authorization: `Bearer ${t}`
      }
    })).text();
    let s = {};
    try {
      s = o ? JSON.parse(o) : {};
    } catch {
      s = {};
    }
    const l = cE(s);
    if (E1(s, l)) throw new Error(hd(s, "虎牙视频放大失败"));
    const {
      urls: d
    } = fv(s, !0);
    if (d[0]) return d[0];
    V9t(l);
  }
  throw new Error("虎牙视频放大超时（约 30 分钟），请稍后在历史或虎牙后台查看");
}

const b1o = "topaz/upscale/video/precision",
  v1o = "topaz/upscale/video/generative",
  w1o = "topaz/upscale/video/creative",
  x1o = "topaz/denoise/video",
  Ovr = "Astra 2",
  Bvr = "Proteus",
  mwe = "Starlight Precise 2.6",
  wZe = [{
    api: "Proteus",
    label: "普罗透斯（Proteus）",
    family: "precision"
  }, {
    api: "Proteus Natural",
    label: "普罗透斯自然（Proteus Natural）",
    family: "precision"
  }, {
    api: "Iris",
    label: "艾里斯人脸（Iris）",
    family: "precision"
  }, {
    api: "Iris Low Quality",
    label: "艾里斯低质量（Iris Low Quality）",
    family: "precision"
  }, {
    api: "Dione DV",
    label: "狄俄涅 DV（Dione DV）",
    family: "precision"
  }, {
    api: "Dione TV",
    label: "狄俄涅 TV（Dione TV）",
    family: "precision"
  }, {
    api: "Dione Robust",
    label: "狄俄涅 Robust（Dione Robust）",
    family: "precision"
  }, {
    api: "Dione Dehalo",
    label: "狄俄涅去光晕（Dione Dehalo）",
    family: "precision"
  }, {
    api: "Dione Robust Dehalo",
    label: "狄俄涅 Robust 去光晕（Dione Robust Dehalo）",
    family: "precision"
  }, {
    api: "Artemis High Quality",
    label: "阿耳忒弥斯高质量（Artemis High Quality）",
    family: "precision"
  }, {
    api: "Artemis Medium Quality",
    label: "阿耳忒弥斯中质量（Artemis Medium Quality）",
    family: "precision"
  }, {
    api: "Artemis Low Quality",
    label: "阿耳忒弥斯低质量（Artemis Low Quality）",
    family: "precision"
  }, {
    api: "Artemis Strong Halo",
    label: "阿耳忒弥斯强光晕（Artemis Strong Halo）",
    family: "precision"
  }, {
    api: "Artemis Medium Halo",
    label: "阿耳忒弥斯中光晕（Artemis Medium Halo）",
    family: "precision"
  }, {
    api: "Artemis Aliasing & Moire",
    label: "阿耳忒弥斯抗锯齿（Artemis Aliasing & Moire）",
    family: "precision"
  }, {
    api: "Gaia HQ",
    label: "盖亚 HQ（Gaia HQ）",
    family: "precision"
  }, {
    api: "Gaia CG",
    label: "盖亚 CG（Gaia CG）",
    family: "precision"
  }, {
    api: "Gaia 2",
    label: "盖亚 2（Gaia 2）",
    family: "precision"
  }, {
    api: "Rhea",
    label: "瑞亚（Rhea）",
    family: "precision"
  }, {
    api: "Theia Fine Tune Detail",
    label: "忒伊亚细节（Theia Fine Tune Detail）",
    family: "precision"
  }, {
    api: "Theia Fine Tune Fidelity",
    label: "忒伊亚保真（Theia Fine Tune Fidelity）",
    family: "precision"
  }, {
    api: "Starlight Precise 2.6",
    label: "星光 Precise 2.6（Starlight Precise 2.6）",
    family: "generative"
  }, {
    api: "Starlight HQ",
    label: "星光 HQ（Starlight HQ）",
    family: "generative"
  }, {
    api: "Starlight Mini",
    label: "星光 Mini（Starlight Mini）",
    family: "generative"
  }, {
    api: "Starlight Sharp",
    label: "星光 Sharp（Starlight Sharp）",
    family: "generative"
  }, {
    api: "Starlight Fast 2",
    label: "星光 Fast 2（Starlight Fast 2）",
    family: "generative"
  }, {
    api: Ovr,
    label: "阿斯特拉 2（Astra 2）",
    family: "creative"
  }, {
    api: "Nyx",
    label: "尼克斯（Nyx）",
    family: "denoise"
  }, {
    api: "Nyx Fast",
    label: "尼克斯 Fast（Nyx Fast）",
    family: "denoise"
  }, {
    api: "Nyx XL",
    label: "尼克斯 XL（Nyx XL）",
    family: "denoise"
  }, {
    api: "Nyx HF",
    label: "尼克斯 HF（Nyx HF）",
    family: "denoise"
  }],
  _1o = [{
    id: "precision",
    label: "精度",
    hint: "忠实原片，适合实拍 / CG 清洁放大"
  }, {
    id: "generative",
    label: "生成",
    hint: "Starlight 重建缺失细节，适合压缩 / AI 片源"
  }, {
    id: "creative",
    label: "创意",
    hint: "Astra 2 重塑纹理，电影感冲击力"
  }, {
    id: "denoise",
    label: "降噪",
    hint: "Nyx 降噪，不走放大端点"
  }],
  Q0n = _1o,
  k1o = .5,
  o3t = .5,
  Fvr = 1,
  zvr = 5,
  A1o = new Set(wZe.map(e => e.api)),
  S1o = new Map(wZe.map(e => [e.api, e.family])),
  I1o = {
    "Artemis HQ": "Artemis High Quality",
    "Artemis MQ": "Artemis Medium Quality",
    "Artemis LQ": "Artemis Low Quality",
    "Starlight Precise 1": mwe,
    "Starlight Precise 2": mwe,
    "Starlight Precise 2.5": mwe,
    "Starlight Fast 1": "Starlight Fast 2"
  };

function Gte(e) {
  const t = Number(e);
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : null;
}

function C1o(e) {
  const t = Number(e);
  return Number.isFinite(t) ? Math.min(4, Math.max(1, t)) : 2;
}

function v$t(e) {
  const t = String(e || "").trim();
  return A1o.has(t) ? t : I1o[t] || Bvr;
}

function w$t(e) {
  return S1o.get(v$t(e)) || "precision";
}

function E1o(e) {
  switch (w$t(e)) {
    case "generative":
      return v1o;
    case "creative":
      return w1o;
    case "denoise":
      return x1o;
    default:
      return b1o;
  }
}

function Y0n(e) {
  return wZe.filter(t => t.family === e);
}

function T1o(e) {
  return e === "generative" ? mwe : e === "creative" ? Ovr : e === "denoise" ? "Nyx" : Bvr;
}

function M1o(e, t) {
  return e === "precision" || e === "generative" || e === "creative" || e === "denoise" ? e : w$t(t);
}

function P1o(e) {
  return wZe.find(t => t.api === e);
}

function Uvr(e) {
  const t = Number(e);
  return Number.isFinite(t) ? Math.round(Math.min(1, Math.max(0, t)) * 100) / 100 : k1o;
}

function X$e(e, t = null) {
  const n = Number(e);
  return Number.isFinite(n) ? Math.round(Math.min(1, Math.max(0, n)) * 100) / 100 : t;
}

function $vr(e) {
  const t = Number(e);
  return Number.isFinite(t) ? Math.round(Math.min(zvr, Math.max(Fvr, t)) * 10) / 10 : null;
}

const X0n = Uvr;

function J0n(e) {
  return X$e(e, o3t) ?? o3t;
}

function Z0n(e) {
  return X$e(e);
}

const eyn = $vr;

function R1o(e) {
  const t = v$t(e.model),
    n = w$t(t),
    r = {
      video_url: e.videoUrl,
      upscale_factor: C1o(e.upscaleFactor),
      H264_output: !0
    },
    a = Number(e.targetFps);
  if (Number.isFinite(a) && (r.target_fps = Math.max(16, Math.min(60, Math.round(a)))), n === "creative") {
    r.creativity = Uvr(e.astraCreativity);
    const u = String(e.astraPrompt || "").trim();
    u && (r.prompt = u);
    const h = X$e(e.astraRealism);
    h !== null && (r.realism = h);
    const p = X$e(e.astraSharp);
    return p !== null && (r.sharp = p), r;
  }
  if (r.model = t, n === "denoise") {
    const u = Gte(e.noise);
    return u !== null && (r.noise = u), r;
  }
  if (n === "generative") {
    if (t === mwe) {
      const u = $vr(e.softness);
      u !== null && (r.softness = u);
    }
    return r;
  }
  const i = Gte(e.compression),
    o = Gte(e.noise),
    s = Gte(e.halo),
    l = Gte(e.grain),
    d = Gte(e.recoverDetail);
  return i !== null && (r.compression = i), o !== null && (r.noise = o), s !== null && (r.halo = s), l !== null && (r.grain = Math.min(.1, l)), d !== null && (r.recover_detail = d), r;
}

const N1o = "topaz/upscale/image/precision",
  j1o = "topaz/upscale/image/generative",
  D1o = "topaz/upscale/image/creative",
  L1o = "topaz/upscale/image/transparent",
  fwe = [{
    value: "Standard V2",
    label: "通用（Standard V2）",
    family: "precision"
  }, {
    value: "High Fidelity V3",
    label: "高保真 V3（High Fidelity V3）",
    family: "precision"
  }, {
    value: "High Fidelity V2",
    label: "高保真（High Fidelity V2）",
    family: "precision"
  }, {
    value: "Low Resolution V2",
    label: "低分辨率（Low Resolution V2）",
    family: "precision"
  }, {
    value: "CGI",
    label: "3D动画（CGI）",
    family: "precision"
  }, {
    value: "Text Refine",
    label: "文本优化（Text Refine）",
    family: "precision"
  }, {
    value: "Wonder 3.5",
    label: "Wonder 3.5",
    family: "generative"
  }, {
    value: "Wonder 3",
    label: "Wonder 3",
    family: "generative"
  }, {
    value: "Wonder 2",
    label: "Wonder 2",
    family: "generative"
  }, {
    value: "Wonder",
    label: "创意增强（Wonder）",
    family: "generative"
  }, {
    value: "Recover 3",
    label: "恢复 3（Recover 3）",
    family: "generative"
  }, {
    value: "Recovery V2",
    label: "恢复增强（Recovery V2）",
    family: "generative"
  }, {
    value: "Recovery",
    label: "恢复（Recovery）",
    family: "generative"
  }, {
    value: "Standard MAX",
    label: "标准MAX（Standard MAX）",
    family: "generative"
  }, {
    value: "Redefine",
    label: "重定义（Redefine）",
    family: "generative"
  }, {
    value: "Bloom 2",
    label: "Bloom 2",
    family: "creative"
  }, {
    value: "Bloom",
    label: "Bloom",
    family: "creative"
  }, {
    value: "Bloom Realism",
    label: "Bloom 写实（Bloom Realism）",
    family: "creative"
  }, {
    value: "Transparent",
    label: "透明图 4× PNG",
    family: "transparent"
  }],
  O1o = [{
    id: "precision",
    label: "精度放大"
  }, {
    id: "generative",
    label: "生成重建"
  }, {
    id: "creative",
    label: "创意增强"
  }, {
    id: "transparent",
    label: "透明通道"
  }],
  B1o = [2, 4],
  F1o = ["low", "medium", "high"],
  z1o = new Set(fwe.map(e => e.value)),
  U1o = new Map(fwe.map(e => [e.value, e.family])),
  $1o = new Set(["Wonder 3", "Recovery", "Recovery V2"]),
  G1o = new Set(["Wonder 3", "Wonder 3.5"]);

function x$t(e) {
  const t = String(e || "").trim();
  return z1o.has(t) ? t : "Standard V2";
}

function _$t(e) {
  return U1o.get(x$t(e)) || "precision";
}

function V1o(e) {
  switch (_$t(e)) {
    case "generative":
      return j1o;
    case "creative":
      return D1o;
    case "transparent":
      return L1o;
    default:
      return N1o;
  }
}

function H1o(e) {
  const t = Number(e);
  return Number.isFinite(t) ? Math.min(4, Math.max(1, t)) : 2;
}

function s3t(e) {
  const t = Number(e);
  return Number.isFinite(t) ? Math.min(9, Math.max(1, Math.round(t))) : 5;
}

function Gvr(e) {
  const t = String(e || "").trim().toLowerCase();
  if (t === "low" || t === "medium" || t === "high") return t;
}

function W1o(e, t) {
  return t === "transparent" || String(e).trim().toLowerCase() === "png" ? "png" : "jpeg";
}

function q1o(e) {
  const t = x$t(e.model),
    n = _$t(t),
    r = W1o(e.outputFormat, n);
  if (n === "transparent") return {
    image_url: e.imageUrl,
    output_format: "png"
  };
  const a = {
    image_url: e.imageUrl,
    model: t,
    upscale_factor: H1o(e.upscaleFactor),
    output_format: r
  };
  if (n === "creative") return t === "Bloom 2" && (a.creativity = s3t(e.bloomCreativity), e.colorPreservation === !0 && (a.color_preservation = !0), e.colorPreservation === !1 && (a.color_preservation = !1)), a;
  if (a.face_enhancement = e.faceEnhancement !== !1, a.face_enhancement && (a.face_enhancement_strength = .8), (n === "precision" || $1o.has(t)) && (a.subject_detection = "All"), n === "generative" && G1o.has(t)) {
    const i = Gvr(e.enhancementStrength);
    i && (a.enhancement_strength = i);
  }
  if (t === "Redefine") {
    const i = String(e.redefinePrompt || "").trim();
    i && (a.prompt = i.slice(0, 1024));
  }
  return a;
}

const tyn = 400;

function v8(e, t) {
  return `${Math.round(e)}×${Math.round(t)}`;
}

function K1o(e) {
  const t = String(e || "").trim();
  return t ? (Cp(t) || t).replace(/\/thumbnails\//i, "/images/") : "";
}

async function gV(e, t) {
  const n = new Set();
  let r = null;
  for (const a of e) {
    const i = String(a || "").trim();
    if (!i || n.has(i)) continue;
    n.add(i);
    const o = [K1o(i), i].filter(Boolean);
    for (const s of o) if (!(n.has(`probe:${s}`) && s !== i)) {
      n.add(`probe:${s}`);
      try {
        if (t === "image") {
          const d = vU(s);
          if (d && d.width > 0 && d.height > 0 && !nl(d.width, d.height)) return {
            w: d.width,
            h: d.height
          };
        }
        if (t === "video") {
          const d = _c(s) || s,
            u = await new Promise(h => {
              const p = document.createElement("video");
              p.preload = "metadata", p.muted = !0;
              const m = f => {
                p.onloadedmetadata = null, p.onerror = null, p.removeAttribute("src");
                try {
                  p.load();
                } catch {}
                h(f);
              };
              p.onloadedmetadata = () => {
                p.videoWidth > 0 && p.videoHeight > 0 ? m({
                  w: p.videoWidth,
                  h: p.videoHeight
                }) : m(null);
              }, p.onerror = () => m(null), p.src = d;
            });
          if (u && !nl(u.w, u.h)) return u;
          u && !r && (r = u);
          continue;
        }
        if (/^https?:\/\//i.test(s)) {
          const d = await Z5(s);
          if (d && d.width > 0 && d.height > 0) {
            if (!nl(d.width, d.height)) return {
              w: d.width,
              h: d.height
            };
            r || (r = {
              w: d.width,
              h: d.height
            });
          }
        }
        const l = await new Promise(d => {
          const u = new Image();
          u.onload = () => {
            u.naturalWidth > 0 && u.naturalHeight > 0 ? d({
              w: u.naturalWidth,
              h: u.naturalHeight
            }) : d(null);
          }, u.onerror = () => d(null), u.src = s;
        });
        if (l && !nl(l.w, l.h)) return l;
        l && !r && (r = l);
      } catch {}
    }
  }
  return r ? {
    ...r,
    fromThumb: !0
  } : null;
}

function Qct(e, t, n, r) {
  var m;
  const a = t.find(f => f.to === e && (!f.inputType || f.inputType === "default")),
    i = a ? n.find(f => f.id === a.from) : void 0;
  if (!i) return {
    url: r
  };
  const o = (m = i.settings) == null ? void 0 : m.mediaType,
    s = i.type === "gen-video" || i.type === "video-input" || i.type === "preview" && i.previewType === "video" || i.type === "input-image" && o === "video",
    l = i.settings;
  let d = r9(i) || i._contentAssetId || (l == null ? void 0 : l._contentAssetId) || (l == null ? void 0 : l._localCacheAssetId);
  const u = String(r || "").trim();
  if (!s && !Ey(u) && !u.startsWith(Ld)) return {
    url: u,
    assetId: d
  };
  const h = V$(i, "video") || (i.type === "input-image" ? G$(i) : void 0) || (i.type === "gen-video" || i.type === "gen-image" ? Zo(i) : void 0);
  if (h && (lQ(h) || Ey(h))) return {
    url: h,
    assetId: d
  };
  const p = String(d || "").trim();
  return u.startsWith(Ld) ? {
    url: u,
    assetId: p || u.slice(Ld.length)
  } : p ? {
    url: `${Ld}${p}`,
    assetId: p
  } : {
    url: u,
    assetId: d
  };
}

const nyn = [{
    value: "none",
    label: "不补帧"
  }, {
    value: "hq",
    label: "高画质补帧"
  }],
  Q1o = "https://ai.comfly.org";

function ryn(e, t = "") {
  const n = e === "video" ? Xxe : wce,
    r = Qa.getResolvedModelBaseUrl(n);
  return {
    configId: n,
    baseUrl: r,
    apiKey: Qa.getEffectiveApiKey(n) || t,
    falPrefix: k$t(r)
  };
}

function Y1o(e = "") {
  const t = Qa.getEffectiveApiKey(mce),
    n = Qa.getEffectiveApiKey(Xxe),
    r = t || n || e,
    a = t ? mce : Xxe,
    i = Qa.getResolvedModelBaseUrl(a);
  return {
    configId: a,
    baseUrl: i,
    apiKey: r,
    falPrefix: k$t(i)
  };
}

function X1o(e = "") {
  const t = Qa.getEffectiveApiKey(aX),
    n = Qa.getEffectiveApiKey(wce),
    r = t || n || e,
    a = t ? aX : wce,
    i = Qa.getResolvedModelBaseUrl(a);
  return {
    configId: a,
    baseUrl: i,
    apiKey: r,
    falPrefix: k$t(i)
  };
}

function J1o(e) {
  return String(e || "").trim().replace(/\/+$/, "") || Q1o;
}

function k$t(e) {
  const t = J1o(e);
  return t.endsWith("/fal") ? t : `${t}/fal`;
}

function Z1o(e, t) {
  return String(e || "").replace(/^https?:\/\/queue\.fal\.run/i, t);
}

function ayn(e, t) {
  const n = String(e || "").trim();
  return n ? /^https?:\/\//i.test(n) ? Z1o(n, t) : n.startsWith("/") ? `${t}${n}` : `${t}/${n}` : "";
}

async function ewo(e) {
  const t = await fetch(e).then(n => {
    if (!n.ok) throw new Error("无法读取本地 blob 资源");
    return n.blob();
  });
  return await new Promise((n, r) => {
    const a = new FileReader();
    a.onload = () => n(String(a.result || "")), a.onerror = () => r(new Error("本地资源转 Base64 失败")), a.readAsDataURL(t);
  });
}

const Vvr = ({
  node: e,
  nodes: t,
  connections: n,
  isDark: r,
  updateNode: a,
  setNodes: i,
  setConnections: o,
  getConnectedInputImages: s,
  generateId: l,
  globalApiKey: d = "",
  setHistory: u,
  selectedNodeId: h = null,
  setSelectedNodeId: p,
  setSelectedNodeIds: m,
  onGenPromptPanelUiChange: f,
  enableGenerationNodeAnimation: y = !0,
  embedded: b = !1,
  showHuyaModels: v = !1,
  setLightboxItem: _,
  setLightboxOpen: w,
  onDownloadSelected: k
}) => {
  var Pa, fa, Ca, $n, yr, Ir, Gr, Zr, La, sa, Ea, ba, ga, _a, $a, Ya, ta, ki, Wn, wr, jn, _n, ar, Vt, vn, An, ur, zr, Dr, Wr, gr, jr, ea, pa, Br;
  on();
  const [A, S] = g.useState(() => !!e.isGenerating),
    [C, I] = g.useState(!1),
    E = g.useRef(null),
    M = g.useRef(null),
    T = g.useRef(!!e.isGenerating),
    P = A || !!e.isGenerating || C;
  g.useEffect(() => {
    const tn = A || !!e.isGenerating;
    T.current && !tn && I(!0), T.current = tn;
  }, [A, e.isGenerating]);
  const [R, j] = g.useState(null),
    [B, F] = g.useState(!1),
    [N, G] = g.useState(!1),
    [z, V] = g.useState(!1),
    [O, L] = g.useState(!1),
    [D, U] = g.useState(!1),
    [H, Y] = g.useState(null),
    [K, W] = g.useState(!1),
    [Q, q] = g.useState(() => Cd().zoom || 1),
    [ne, de] = g.useState(null),
    [le, J] = g.useState(null),
    pe = g.useRef(null),
    ce = g.useRef(null),
    we = g.useRef(null),
    X = g.useRef(!1);
  X.current = K;
  const [Z, re] = g.useState(() => {
      var tn;
      return !!((tn = e.settings) != null && tn.genUseAliyunOss);
    }),
    [fe, ye] = g.useState(() => ua()),
    [ie, ae] = g.useState(() => Ph()),
    [be, Ee] = g.useState(() => mo()),
    xe = g.useRef(e.settings);
  g.useEffect(() => {
    xe.current = e.settings;
  }, [e.settings]);
  const he = Ia.useRef(null),
    ue = Ia.useRef(null),
    ge = Ia.useRef(null),
    _e = Ia.useRef(null),
    ke = Ia.useRef(null),
    ve = Ia.useRef(null),
    Te = Ia.useRef(null),
    Ne = Ia.useRef(null),
    me = x$t((Pa = e.settings) == null ? void 0 : Pa.topazModel),
    Ae = Number((fa = e.settings) == null ? void 0 : fa.topazFactor) === 4 ? 4 : 2,
    Fe = ((Ca = e.settings) == null ? void 0 : Ca.topazFormat) || "jpeg",
    Me = _$t(me),
    Re = s3t(($n = e.settings) == null ? void 0 : $n.topazBloomCreativity),
    $e = !!((yr = e.settings) != null && yr.topazColorPreservation),
    rt = String(((Ir = e.settings) == null ? void 0 : Ir.topazRedefinePrompt) || ""),
    nt = Gvr((Gr = e.settings) == null ? void 0 : Gr.topazEnhancementStrength),
    ze = String(((Zr = e.settings) == null ? void 0 : Zr.imageEnhanceProvider) || ((La = e.settings) == null ? void 0 : La.topazProvider) || "topaz"),
    Le = ze === "jimeng-cli" ? "jimeng-cli" : ze === "seedvr2" || ze === "SeedVR2" ? "seedvr2" : "topaz",
    Ke = _St.find(tn => {
      var Lr;
      return tn === String(((Lr = e.settings) == null ? void 0 : Lr.jimengUpscaleResolution) || "").toUpperCase();
    }) || "4K";
  g.useEffect(() => {
    Le === "jimeng-cli" && (S(!!e.isGenerating), j(e.errorMsg || null));
  }, [Le, e.isGenerating, e.errorMsg]);
  const Xe = DNn((sa = e.settings) == null ? void 0 : sa.seedvrUpscaleMode),
    De = LNn(((Ea = e.settings) == null ? void 0 : Ea.seedvrUpscaleFactor) ?? ((ba = e.settings) == null ? void 0 : ba.topazFactor) ?? 2),
    Ye = ONn((ga = e.settings) == null ? void 0 : ga.seedvrTargetResolution),
    Ce = Hft((_a = e.settings) == null ? void 0 : _a.seedvrNoiseScale),
    He = BNn((($a = e.settings) == null ? void 0 : $a.seedvrOutputFormat) ?? ((Ya = e.settings) == null ? void 0 : Ya.topazFormat)),
    Ve = (ta = e.settings) == null ? void 0 : ta.seedvrSeed,
    it = Ve === "" || Ve == null ? "" : String(Ve),
    It = s(e.id)[0] || null,
    Ft = g.useMemo(() => {
      if (!It) return {
        url: null,
        assetId: void 0
      };
      const tn = Qct(e.id, n, t, It);
      return {
        url: tn.url,
        assetId: tn.assetId
      };
    }, [It, e.id, n, t]);
  g.useEffect(() => {
    var tn;
    re(!!((tn = e.settings) != null && tn.genUseAliyunOss));
  }, [e.id, (ki = e.settings) == null ? void 0 : ki.genUseAliyunOss]), g.useEffect(() => {
    const tn = () => {
      ye(ua()), ae(Ph()), Ee(mo());
    };
    return tn(), window.addEventListener(go, tn), () => window.removeEventListener(go, tn);
  }, []), g.useEffect(() => {
    if (ie || fe || !Z) return;
    re(!1);
    const tn = {
      ...xe.current
    };
    tn.genUseAliyunOss && a(e.id, {
      settings: {
        ...tn,
        genUseAliyunOss: !1
      }
    });
  }, [ie, fe, Z, e.id, a]);
  const We = ((Wn = e.settings) == null ? void 0 : Wn.superResMode) || "image",
    Ze = ((wr = e.settings) == null ? void 0 : wr.videoResolution) || "1080P",
    Ge = String(((jn = e.settings) == null ? void 0 : jn.videoEnhanceProvider) || "topaz"),
    Oe = We === "video" && Ge === "flux" ? "flux" : v && We === "video" && Ge === "huya" ? "huya" : "topaz",
    st = bRe.includes(Ze) ? Ze : "1080P",
    vt = ((_n = e.settings) == null ? void 0 : _n.frameInterpolationMode) || "none",
    Ht = Math.max(16, Math.min(60, Number(((ar = e.settings) == null ? void 0 : ar.targetFps) ?? 30))),
    nn = ((Vt = e.settings) == null ? void 0 : Vt.slowMotionFactor) || "1x",
    pt = v$t(((vn = e.settings) == null ? void 0 : vn.topazVideoModel) || "Proteus"),
    lt = M1o(String(((An = e.settings) == null ? void 0 : An.topazVideoLine) || ""), pt),
    gt = Y0n(lt),
    Ut = e.settings || {},
    _t = String(Ut.topazCreativePrompt || Ut.topazAstraPrompt || ""),
    At = X0n(Ut.topazCreativity ?? Ut.topazAstraCreativity),
    Yt = Z0n(Ut.topazRealism ?? Ut.topazAstraRealism),
    qe = J0n(Ut.topazSharp ?? Ut.topazAstraSharp),
    kt = eyn(Ut.topazSoftness),
    St = String(((ur = e.settings) == null ? void 0 : ur.fluxVideoModel) || "FLUX 3"),
    hn = fTe.some(tn => tn.api === St) ? St : "FLUX 3",
    Qt = uKr((zr = e.settings) == null ? void 0 : zr.fluxCreativity),
    Ot = String(((Dr = e.settings) == null ? void 0 : Dr.fluxUpscalePrompt) || ""),
    ln = PNn((Wr = e.settings) == null ? void 0 : Wr.fluxSafetyTolerance),
    Pn = MNn(Ze),
    rn = g.useCallback(tn => {
      var Jr;
      const Lr = String(((Jr = e.settings) == null ? void 0 : Jr.videoResolution) || ""),
        br = hKt.includes(Lr);
      a(e.id, {
        settings: {
          ...e.settings,
          videoEnhanceProvider: tn,
          ...(tn === "huya" && !bRe.includes(Lr) ? {
            videoResolution: "1080P"
          } : {}),
          ...(tn !== "huya" && !br ? {
            videoResolution: "1080P"
          } : {})
        }
      }), U(!1), V(!1), L(!1);
    }, [e.id, e.settings, a]);
  g.useEffect(() => {
    if (!It) {
      Y(null);
      return;
    }
    if (b) {
      Y(It);
      return;
    }
    let tn = !1,
      Lr = null;
    return (async () => {
      try {
        const {
            resolveConnectedInputOriginalUrlAsync: br
          } = await Ie(async () => {
            const {
              resolveConnectedInputOriginalUrlAsync: Kr
            } = await Promise.resolve().then(() => ii);
            return {
              resolveConnectedInputOriginalUrlAsync: Kr
            };
          }, void 0, import.meta.url),
          Jr = await br(e.id, It, n, t, {
            mediaType: We === "video" ? "video" : "image"
          });
        if (tn) {
          Jr.startsWith("blob:") && Jr !== It && URL.revokeObjectURL(Jr);
          return;
        }
        Jr.startsWith("blob:") && Jr !== It && (Lr = Jr), Y(Jr || null);
      } catch {
        tn || Y(It);
      }
    })(), () => {
      tn = !0, Lr && URL.revokeObjectURL(Lr);
    };
  }, [b, It, e.id, n, t, We]), g.useEffect(() => {
    const tn = We === "video" ? "视频增强" : "图片增强";
    e.nodeName !== tn && a(e.id, {
      nodeName: tn
    });
  }, [We, e.id, e.nodeName, a]);
  const Yn = h === e.id,
    Ct = typeof e.content == "string" ? e.content.trim() : "",
    Cn = g.useMemo(() => {
      if (We !== "video") return "";
      const tn = e.settings || {};
      for (const Lr of [e.videoPosterUrl, tn.videoPosterUrl, tn[Pi], tn._canvasDisplayPreviewUrl, Ct]) {
        const br = String(Lr || "").trim();
        if (br && tl(br) && !$o(br)) return br;
      }
      return "";
    }, [We, e, Ct]),
    un = g.useMemo(() => {
      if (We !== "video") return "";
      const tn = e.settings || {},
        Lr = Array.isArray(tn.generatedImages) ? tn.generatedImages[0] : void 0;
      for (const br of [tn._localVideoPlaybackUrl, tn._ossRemoteUrl, Lr == null ? void 0 : Lr.fullUrl, Lr == null ? void 0 : Lr.url, e.selectedPreviewVideo, Ct]) {
        const Jr = String(br || "").trim();
        if (Jr) {
          if ($o(Jr) || Ey(Jr) || lQ(Jr)) return _c(Jr) || Jr;
          if (vs(Jr) && /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(Jr)) return Jr;
        }
      }
      return "";
    }, [We, e, Ct]),
    Jn = We === "video" ? un || ne || Cn || "" : ne || "",
    Kn = !!(ne || Cn || un),
    en = y9(Q),
    {
      previewFailed: Vn,
      previewNonce: Tt,
      markPreviewFailed: Ue,
      retryPreview: et,
      handleDownload: ft,
      handleFullscreen: ht
    } = yEe({
      node: e,
      resultUrl: Jn,
      mediaType: We === "video" ? "video" : "image",
      onDownloadSelected: k,
      setLightboxItem: _,
      setLightboxOpen: w
    }),
    wt = g.useCallback(() => {
      b || (zb(e.id, p, m, 500, {
        forceSingle: !0
      }), Dd(e.id, !0), f == null || f(e.id, !0)), W(!0);
    }, [b, e.id, f, p, m]),
    jt = g.useCallback(() => {
      W(!1), b || (Dd(e.id, !1), f == null || f(e.id, !1)), F(!1), G(!1), V(!1), L(!1);
    }, [b, e.id, f]),
    bt = g.useRef(!1);
  g.useEffect(() => {
    Yn && !bt.current ? wt() : !Yn && X.current && jt(), bt.current = Yn;
  }, [Yn]), g.useEffect(() => () => {
    b || (Dd(e.id, !1), f == null || f(e.id, !1));
  }, [b, e.id, f]), g.useEffect(() => {
    if (!b) return q(Cd().zoom || 1), dw(tn => {
      q(tn.zoom || 1);
    });
  }, [b]), g.useEffect(() => {
    if (!K || b) return;
    const tn = Lr => {
      var Jr, Kr;
      const br = Lr.target;
      br && ((Jr = pe.current) != null && Jr.contains(br) || (Kr = ce.current) != null && Kr.contains(br) || jt());
    };
    return window.addEventListener("mousedown", tn, !0), () => window.removeEventListener("mousedown", tn, !0);
  }, [b, K, jt]);
  const Bt = yI({
    hostRef: ce,
    open: K && !b,
    zoom: Q,
    remeasureKey: `${K}:${We}:${Oe}:${Le}:${Xe}:${lt}:${pt}`,
    stabilizeNodeId: e.id
  });
  Qp(we, "50% 0%", K && !b);
  const wn = g.useCallback((tn, Lr) => {
    !(tn > 0) || !(Lr > 0) || (J({
      w: tn,
      h: Lr
    }), l5({
      nodeId: e.id,
      mw: tn,
      mh: Lr,
      setNodes: i,
      currentWidth: e.width,
      currentHeight: e.height,
      hasCustomSize: !1,
      actualSizeLabel: {
        w: tn,
        h: Lr
      }
    }));
  }, [e.height, e.id, e.width, i]);
  g.useEffect(() => {
    if (!Ct) {
      de(null), J(null);
      return;
    }
    let tn = !1;
    return (async () => {
      let Lr = Ct;
      try {
        if (Lr.startsWith("content_ref:")) {
          await Er.init();
          const ha = await Er.get(Er.extractId(Lr));
          ha && (Lr = ha);
        }
      } catch {}
      if (tn) return;
      de(Lr);
      const br = e.settings || {},
        Jr = Hs(br.previewActualSize);
      if (Jr && !nl(Jr.w, Jr.h)) {
        wn(Jr.w, Jr.h);
        return;
      }
      const Kr = Array.isArray(br.generatedImages) ? br.generatedImages[0] : void 0,
        ir = [br._ossRemoteUrl, br.previewOssRemoteUrl, Kr == null ? void 0 : Kr.fullUrl, Zo(e), V$(e, We === "video" ? "video" : "image"), Lr],
        Hr = await gV(ir.map(ha => typeof ha == "string" ? ha : ""), We === "video" ? "video" : "image");
      if (!(tn || !Hr)) if (wn(Hr.w, Hr.h), Hr.fromThumb) Jr && nl(Jr.w, Jr.h) && a(e.id, {
        settings: {
          ...br,
          previewActualSize: void 0,
          previewSize: void 0
        }
      });else {
        const ha = v8(Hr.w, Hr.h);
        String(br.previewActualSize || "") !== ha && a(e.id, {
          settings: {
            ...br,
            previewActualSize: ha,
            previewSize: ha,
            hasCustomSize: void 0
          }
        });
      }
    })(), () => {
      tn = !0;
    };
  }, [wn, e.id, e.settings, Ct, We, a]), g.useEffect(() => {
    if (!B) return;
    const tn = () => F(!1);
    return window.addEventListener("mousedown", tn), () => window.removeEventListener("mousedown", tn);
  }, [B]), g.useEffect(() => {
    if (!N) return;
    const tn = Lr => {
      const br = ue.current;
      br && !br.contains(Lr.target) && G(!1);
    };
    return window.addEventListener("mousedown", tn), () => window.removeEventListener("mousedown", tn);
  }, [N]), g.useEffect(() => {
    if (!z) return;
    const tn = Lr => {
      const br = ge.current;
      br && !br.contains(Lr.target) && V(!1);
    };
    return window.addEventListener("mousedown", tn), () => window.removeEventListener("mousedown", tn);
  }, [z]), g.useEffect(() => {
    if (!O) return;
    const tn = Lr => {
      const br = ke.current;
      br && !br.contains(Lr.target) && L(!1);
    };
    return window.addEventListener("mousedown", tn), () => window.removeEventListener("mousedown", tn);
  }, [O]), g.useEffect(() => {
    if (!D) return;
    const tn = Lr => {
      const br = Te.current;
      br && !br.contains(Lr.target) && U(!1);
    };
    return window.addEventListener("mousedown", tn), () => window.removeEventListener("mousedown", tn);
  }, [D]), g.useEffect(() => {
    if (!B || !he.current) return;
    const tn = he.current,
      Lr = br => {
        br.preventDefault(), br.stopPropagation(), tn.scrollTop += br.deltaY;
      };
    return tn.addEventListener("wheel", Lr, {
      passive: !1
    }), () => {
      tn.removeEventListener("wheel", Lr);
    };
  }, [B]), g.useEffect(() => {
    if (!z || !_e.current) return;
    const tn = _e.current,
      Lr = br => {
        br.preventDefault(), br.stopPropagation(), tn.scrollTop += br.deltaY;
      };
    return tn.addEventListener("wheel", Lr, {
      passive: !1
    }), () => {
      tn.removeEventListener("wheel", Lr);
    };
  }, [z]), g.useEffect(() => {
    if (!O || !ve.current) return;
    const tn = ve.current,
      Lr = br => {
        br.preventDefault(), br.stopPropagation(), tn.scrollTop += br.deltaY;
      };
    return tn.addEventListener("wheel", Lr, {
      passive: !1
    }), () => {
      tn.removeEventListener("wheel", Lr);
    };
  }, [O]), g.useEffect(() => {
    if (!D || !Ne.current) return;
    const tn = Ne.current,
      Lr = br => {
        br.preventDefault(), br.stopPropagation(), tn.scrollTop += br.deltaY;
      };
    return tn.addEventListener("wheel", Lr, {
      passive: !1
    }), () => {
      tn.removeEventListener("wheel", Lr);
    };
  }, [D]);
  const at = g.useCallback(() => {
      if (fe || !ie) return null;
      const tn = $g(be);
      return c.jsxs("label", {
        className: `sketch-chat-web-chip${r ? " sketch-chat-web-chip--dark" : ""}`,
        onMouseDown: Lr => Lr.stopPropagation(),
        title: Jk(be),
        children: [c.jsx("input", {
          type: "checkbox",
          checked: Z,
          onChange: Lr => {
            const br = Lr.target.checked;
            re(br);
            const Jr = {
              ...xe.current
            };
            a(e.id, {
              settings: {
                ...Jr,
                genUseAliyunOss: br
              }
            });
          },
          className: "h-3 w-3 cursor-pointer"
        }), c.jsx("span", {
          className: "whitespace-nowrap",
          title: x(tn),
          children: x(tn)
        })]
      });
    }, [fe, ie, be, Z, r, e.id, a]),
    Pt = g.useCallback(async () => {
      var Ga, Za, va;
      if (!It) {
        j("请先连接输入图片");
        return;
      }
      const tn = Le === "seedvr2",
        Lr = Le === "jimeng-cli",
        {
          apiKey: br,
          falPrefix: Jr
        } = Lr ? {
          apiKey: "",
          falPrefix: ""
        } : tn ? X1o(d) : ryn("image", d);
      if (!Lr && !br) {
        j(tn ? "请先在「模型接口配置」→ 图像 中为 Topaz图像放大 或 SeedVR2图像放大 填写 API Key" : "请先在「模型接口配置」→ 图像 中为 Topaz图像放大 填写 API Key");
        return;
      }
      j(null), I(!1), S(!0), a(e.id, {
        isGenerating: !0,
        errorMsg: "",
        settings: {
          ...xe.current,
          jimengSubmitId: void 0,
          jimengPending: !1
        }
      });
      const Kr = Date.now(),
        ir = u ? l() : "",
        Hr = ((Ga = fwe.find(Kt => Kt.value === me)) == null ? void 0 : Ga.label) || me,
        ha = Xe === "target" ? `SeedVR2 高清放大 ${Ye}` : `SeedVR2 高清放大 ${De}x`;
      if (u) {
        const Kt = {
          id: ir,
          url: "",
          type: "image",
          prompt: Lr ? `即梦智能超清 ${Ke}` : tn ? ha : `Topaz 高清放大 ${Ae}x`,
          time: new Date().toLocaleTimeString(),
          status: "generating",
          progress: 5,
          modelName: Lr ? "即梦智能超清（CLI）" : tn ? "SeedVR2" : `Topazlabs / ${Hr}`,
          ...(Lr ? {
            apiConfig: {
              modelId: "jimeng-cli-upscale",
              baseUrl: IT,
              apiKey: "jimeng-cli"
            },
            jimengStatus: {
              message: "正在准备超清原图"
            }
          } : {}),
          sourceNodeId: e.id,
          startTime: Kr
        };
        u(Pr => [Kt, ...(ua() ? Pr : Pr.slice(0, 99))]);
      }
      try {
        const Kt = !!((Za = e.settings) != null && Za.genUseAliyunOss) || ua(),
          {
            resolveConnectedInputOriginalUrlAsync: Pr
          } = await Ie(async () => {
            const {
              resolveConnectedInputOriginalUrlAsync: bn
            } = await Promise.resolve().then(() => ii);
            return {
              resolveConnectedInputOriginalUrlAsync: bn
            };
          }, void 0, import.meta.url);
        let kr = await Pr(e.id, It, n, t, {
          assetId: Ft.assetId,
          mediaType: "image"
        });
        if (!kr) throw new Error("无法读取输入原图");
        let Mr;
        if (Lr) Mr = await Aao({
          image: kr,
          assetId: Ft.assetId,
          resolution: Ke,
          onSubmitted: bn => {
            const Rt = {
              ...xe.current,
              jimengSubmitId: bn,
              jimengKind: "image",
              jimengPending: !0
            };
            xe.current = Rt, a(e.id, {
              settings: Rt
            }), u == null || u(fn => fn.map(Zt => Zt.id === ir ? {
              ...Zt,
              remoteTaskId: bn
            } : Zt));
          },
          onProgress: bn => {
            u == null || u(Rt => Rt.map(fn => fn.id === ir ? {
              ...fn,
              jimengStatus: {
                message: bn,
                checkedAt: Date.now()
              }
            } : fn)), a(e.id, {
              settings: {
                ...xe.current,
                progressMessage: bn
              }
            });
          }
        });else {
          if (Kt) {
            const {
              resolveGenReferenceUrlsForApi: tt
            } = await Ie(async () => {
              const {
                resolveGenReferenceUrlsForApi: zt
              } = await Promise.resolve().then(() => Mc);
              return {
                resolveGenReferenceUrlsForApi: zt
              };
            }, void 0, import.meta.url);
            [kr] = await tt([kr], {
              useOss: !0,
              metaByIndex: [{
                type: "image",
                assetId: Ft.assetId
              }]
            });
          } else if (!kr.startsWith("data:image/") && !R2(kr)) if (kr.startsWith("blob:") || vs(kr)) kr = await ewo(kr);else {
            const {
              resolveImageUrlForFalApi: tt
            } = await Ie(async () => {
              const {
                resolveImageUrlForFalApi: zt
              } = await Promise.resolve().then(() => jFr);
              return {
                resolveImageUrlForFalApi: zt
              };
            }, void 0, import.meta.url);
            kr = await tt(kr);
          }
          const bn = tn ? mKr : V1o(me),
            Rt = `${Jr}/${bn}`,
            fn = tn ? AKr({
              imageUrl: kr,
              upscaleMode: Xe,
              upscaleFactor: De,
              targetResolution: Ye,
              noiseScale: Ce,
              outputFormat: He,
              seed: FNn(it)
            }) : q1o({
              imageUrl: kr,
              model: me,
              upscaleFactor: Ae,
              outputFormat: Fe,
              bloomCreativity: Re,
              colorPreservation: $e,
              redefinePrompt: rt,
              enhancementStrength: nt
            }),
            Zt = await $i(Rt, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${br}`
              },
              body: JSON.stringify(fn)
            }),
            Ln = await Zt.json();
          if (!Zt.ok) throw new Error(String((Ln == null ? void 0 : Ln.error) || (Ln == null ? void 0 : Ln.message) || "提交失败"));
          Mr = await GM({
            falPrefix: Jr,
            apiKey: br,
            modelPath: bn,
            submitData: Ln
          });
        }
        const Hn = String(Mr[0] || "");
        if (!Hn) throw new Error("未获取到高清结果");
        const $t = ir || `topaz_img_${l()}`,
          {
            tryResolveGenResultForGlobalOss: je,
            buildHistoryItemPatchFromGlobalOss: Qe
          } = await Ie(async () => {
            const {
              tryResolveGenResultForGlobalOss: bn,
              buildHistoryItemPatchFromGlobalOss: Rt
            } = await Promise.resolve().then(() => ii);
            return {
              tryResolveGenResultForGlobalOss: bn,
              buildHistoryItemPatchFromGlobalOss: Rt
            };
          }, void 0, import.meta.url),
          Mt = await je([Hn], $t, !1);
        let cn = `topaz_img_${l()}`,
          Qn = Hn,
          Lt = {};
        Mt ? (Qn = Mt.displayUrls[0] || Mt.remoteUrls[0] || Hn, Lt = Qe(Mt, {
          type: "image"
        })) : Qn = await sk(Hn, cn, void 0, {
          usePreviewQuality: !0
        });
        const ct = await gV([Qn, Hn, (va = Mt == null ? void 0 : Mt.remoteUrls) == null ? void 0 : va[0]], "image"),
          Dt = ct && !ct.fromThumb ? v8(ct.w, ct.h) : void 0;
        a(e.id, {
          content: Qn,
          _contentAssetId: Mt ? void 0 : cn,
          isGenerating: !1,
          errorMsg: "",
          settings: {
            ...xe.current,
            jimengPending: !1,
            ...((Mt == null ? void 0 : Mt.ossSettings) || {}),
            ...(Dt ? {
              previewActualSize: Dt,
              previewSize: Dt,
              hasCustomSize: void 0
            } : {}),
            ...(Mt ? {
              generatedImages: [{
                id: $t,
                thumbUrl: Qn,
                fullUrl: Mt.remoteUrls[0] || Qn,
                createdAt: Date.now()
              }]
            } : {})
          }
        }), ct && wn(ct.w, ct.h), u && u(bn => bn.map(Rt => Rt.id === ir ? {
          ...Rt,
          url: Hn,
          status: "completed",
          progress: 100,
          durationMs: Math.max(0, Date.now() - Kr),
          generationTime: `${((Date.now() - Kr) / 1e3).toFixed(1)}s`,
          errorMsg: "",
          _assetId: Mt ? Rt._assetId : cn,
          ...Lt
        } : Rt)), !Mt && ir && Ie(async () => {
          const {
            scheduleHistoryOssAutoUpload: bn
          } = await Promise.resolve().then(() => qh);
          return {
            scheduleHistoryOssAutoUpload: bn
          };
        }, void 0, import.meta.url).then(({
          scheduleHistoryOssAutoUpload: bn
        }) => bn(ir, [cn])).catch(() => {});
      } catch (Kt) {
        const Pr = Kt instanceof Error ? Kt.message : "高清放大失败";
        if (j(Pr), Kt instanceof Qz) {
          a(e.id, {
            isGenerating: !1,
            errorMsg: Pr,
            settings: {
              ...xe.current,
              jimengSubmitId: Kt.submitId,
              jimengPending: !0
            }
          }), u == null || u(kr => kr.map(Mr => Mr.id === ir ? {
            ...Mr,
            status: "generating",
            remoteTaskId: Kt.submitId,
            errorMsg: Pr,
            jimengStatus: {
              message: Pr,
              checkedAt: Date.now()
            }
          } : Mr));
          return;
        }
        a(e.id, {
          isGenerating: !1,
          errorMsg: Pr,
          ...(Lr ? {
            settings: {
              ...xe.current,
              jimengPending: !1
            }
          } : {})
        }), u && ir && u(kr => kr.map(Mr => Mr.id === ir ? {
          ...Mr,
          status: "failed",
          progress: 0,
          errorMsg: Pr
        } : Mr));
      } finally {
        S(!1);
      }
    }, [wn, Le, Ke, It, d, Re, $e, rt, nt, Ae, me, Fe, Ce, He, it, Ye, De, Xe, a, e.id, e.width, e.settings, t, i, l, u, Ft.assetId, n]),
    dt = tn => {
      var Lr, br, Jr, Kr, ir;
      return String(((Lr = tn == null ? void 0 : tn.video) == null ? void 0 : Lr.url) || ((Jr = (br = tn == null ? void 0 : tn.output) == null ? void 0 : br.video) == null ? void 0 : Jr.url) || ((ir = (Kr = tn == null ? void 0 : tn.data) == null ? void 0 : Kr.video) == null ? void 0 : ir.url) || (tn == null ? void 0 : tn.video_url) || (tn == null ? void 0 : tn.url) || "");
    },
    xt = g.useCallback(async () => {
      var Hr, ha, Ga, Za, va;
      if (!It) {
        j("请先连接输入视频");
        return;
      }
      const tn = Oe === "flux",
        {
          apiKey: Lr,
          falPrefix: br,
          baseUrl: Jr
        } = tn ? Y1o(d) : ryn("video", d);
      if (!Lr) {
        j(tn ? "请先在「模型接口配置」→ 视频 中为 Topaz视频放大 或 FLUX 超分 填写 API Key" : "请先在「模型接口配置」→ 视频 中为 Topaz视频放大 填写 API Key");
        return;
      }
      j(null), I(!1), S(!0), a(e.id, {
        isGenerating: !0,
        errorMsg: ""
      });
      const Kr = Date.now(),
        ir = u ? l() : "";
      if (u) {
        const Kt = {
          id: ir,
          url: "",
          type: "video",
          prompt: tn ? `FLUX 超分 ${Pn}` : `Topaz 视频高清 ${Ze}`,
          time: new Date().toLocaleTimeString(),
          status: "generating",
          progress: 5,
          modelName: tn ? `FLUX 超分 / ${hn}` : `Topazlabs / ${pt}`,
          sourceNodeId: e.id,
          startTime: Kr
        };
        u(Pr => [Kt, ...(ua() ? Pr : Pr.slice(0, 99))]);
      }
      try {
        const Kt = !!((Hr = e.settings) != null && Hr.genUseAliyunOss) || ua(),
          {
            url: Pr,
            assetId: kr
          } = Qct(e.id, n, t, It);
        let Mr = Pr;
        if (Mr.startsWith("content_ref:")) {
          await Er.init();
          const tr = Er.extractId(Mr),
            kn = await Er.get(tr);
          if (!kn) throw new Error("无法读取输入视频");
          Mr = kn;
        }
        if (Kt) {
          const {
            resolveGenReferenceUrlsForApi: tr
          } = await Ie(async () => {
            const {
              resolveGenReferenceUrlsForApi: kn
            } = await Promise.resolve().then(() => Mc);
            return {
              resolveGenReferenceUrlsForApi: kn
            };
          }, void 0, import.meta.url);
          [Mr] = await tr([Mr], {
            useOss: !0,
            metaByIndex: [{
              type: "video",
              assetId: kr
            }]
          });
        } else if (Mr && !R2(Mr)) {
          const {
            resolveChatReferenceVideoUrlForApi: tr
          } = await Ie(async () => {
            const {
              resolveChatReferenceVideoUrlForApi: kn
            } = await Promise.resolve().then(() => Mc);
            return {
              resolveChatReferenceVideoUrlForApi: kn
            };
          }, void 0, import.meta.url);
          Mr = await tr(Mr, {
            useOss: !1,
            apiKey: Lr,
            baseUrl: Jr,
            assetId: kr
          });
        }
        if (!(Ey(Mr) || lQ(Mr) || R2(Mr) && !/\/thumbnails\//i.test(Mr) && !/\.(png|jpe?g|webp|gif|bmp)(\?|$)/i.test(Mr))) throw new Error("请先连接有效视频素材（当前连线可能是图片或视频封面）");
        const je = {
            "720P": 1,
            "1080P": 1,
            "2K": 2,
            "4K": 4
          }[Ze] ?? 1,
          Mt = {
            "1x": 1,
            "2x": 2,
            "3x": 3,
            "5x": 5
          }[nn] ?? 1,
          cn = Math.max(16, Math.min(60, Math.round(Ht * Mt)));
        let Qn,
          Lt = nKr;
        if (tn) {
          const tr = await gV([Mr, H], "video");
          Qn = pKr({
            videoUrl: Mr,
            upscaleFactor: hKr(Pn, tr == null ? void 0 : tr.w, tr == null ? void 0 : tr.h),
            creativity: Qt,
            prompt: Ot,
            safetyTolerance: ln
          });
        } else Qn = R1o({
          videoUrl: Mr,
          model: pt,
          upscaleFactor: je,
          targetFps: vt !== "none" ? cn : void 0,
          astraCreativity: At,
          astraPrompt: _t,
          astraRealism: Ut.topazRealism ?? Ut.topazAstraRealism,
          astraSharp: Ut.topazSharp ?? Ut.topazAstraSharp ?? o3t,
          softness: kt,
          compression: Ut.compression,
          noise: Ut.noise,
          halo: Ut.halo,
          grain: Ut.grain,
          recoverDetail: Ut.recoverDetail
        }), Lt = E1o(pt);
        const ct = `${br}/${Lt}`,
          Dt = await $i(ct, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Lr}`
            },
            body: JSON.stringify(Qn)
          }),
          bn = await Dt.json();
        if (!Dt.ok) throw new Error(String((bn == null ? void 0 : bn.error) || (bn == null ? void 0 : bn.message) || "提交失败"));
        let Rt = dt(bn);
        if (tn) Rt = await NWe({
          falPrefix: br,
          apiKey: Lr,
          modelPath: Lt,
          submitData: bn
        });else {
          const tr = String((bn == null ? void 0 : bn.request_id) || (bn == null ? void 0 : bn.requestId) || ""),
            kn = ayn(String((bn == null ? void 0 : bn.response_url) || ((ha = bn == null ? void 0 : bn.data) == null ? void 0 : ha.response_url) || ""), br);
          let xn = ayn(String((bn == null ? void 0 : bn.status_url) || ""), br);
          if (!xn && kn && (xn = `${kn}/status`), !xn && tr && (xn = `${br}/${Lt}/requests/${encodeURIComponent(tr)}/status`), !Rt && xn) {
            const Fn = Date.now();
            for (; !Rt;) {
              if (Date.now() - Fn > 1200 * 1e3) throw new Error("视频高清超时，请稍后重试");
              const vr = await (await $i(xn, {
                  headers: {
                    Authorization: `Bearer ${Lr}`
                  }
                })).json(),
                Wt = String((vr == null ? void 0 : vr.status) || (vr == null ? void 0 : vr.state) || "").toUpperCase();
              if (Rt = dt(vr), Wt === "COMPLETED" && Rt || Rt) break;
              if (Wt === "FAILED" || Wt === "ERROR" || Wt === "CANCELED") throw new Error(String((vr == null ? void 0 : vr.error) || (vr == null ? void 0 : vr.message) || "任务失败"));
              if (Wt === "COMPLETED" && !Rt && kn) {
                const Nn = await (await $i(kn, {
                  headers: {
                    Authorization: `Bearer ${Lr}`
                  }
                })).json();
                Rt = dt(Nn);
              }
              await new Promise(Jt => setTimeout(Jt, 1500));
            }
          }
        }
        if (!Rt) throw new Error(tn ? "未获取到 FLUX 超分视频" : "未获取到高清视频");
        const fn = ir || `topaz_video_${l()}`,
          {
            tryResolveGenResultForGlobalOss: Zt,
            buildHistoryItemPatchFromGlobalOss: Ln,
            pickGenVideoPlaybackUrl: tt,
            pickOssVideoImagePosterUrl: zt
          } = await Ie(async () => {
            const {
              tryResolveGenResultForGlobalOss: tr,
              buildHistoryItemPatchFromGlobalOss: kn,
              pickGenVideoPlaybackUrl: xn,
              pickOssVideoImagePosterUrl: Fn
            } = await Promise.resolve().then(() => ii);
            return {
              tryResolveGenResultForGlobalOss: tr,
              buildHistoryItemPatchFromGlobalOss: kn,
              pickGenVideoPlaybackUrl: xn,
              pickOssVideoImagePosterUrl: Fn
            };
          }, void 0, import.meta.url),
          an = await Zt([Rt], fn, !0),
          Rn = an ? Ln(an, {
            type: "video"
          }) : {};
        let Un = "",
          er = Rt,
          Cr;
        if (an) {
          const tr = tt(an, Rt, null),
            kn = zt(String(((Ga = an.displayUrls) == null ? void 0 : Ga[0]) || "").trim()) || "";
          Un = kn, er = tr;
          const xn = await gV([Rt, (Za = an.remoteUrls) == null ? void 0 : Za[0], tr, kn], "video"),
            Fn = xn && !xn.fromThumb ? v8(xn.w, xn.h) : typeof an.imageWidth == "number" && typeof an.imageHeight == "number" && an.imageWidth > 0 && an.imageHeight > 0 && !nl(an.imageWidth, an.imageHeight) ? v8(an.imageWidth, an.imageHeight) : void 0;
          if (a(e.id, {
            content: kn || "",
            previewType: "video",
            selectedPreviewVideo: tr,
            videoPosterUrl: kn || void 0,
            _contentAssetId: void 0,
            isGenerating: !1,
            errorMsg: "",
            settings: {
              ...(e.settings || {}),
              ...(tn ? {
                videoEnhanceProvider: "flux"
              } : {}),
              ...(an.ossSettings || {}),
              ...((va = an.generatedImages) != null && va.length ? {
                generatedImages: an.generatedImages
              } : {}),
              ...(kn ? {
                videoPosterUrl: kn
              } : {}),
              ...(Fn ? {
                previewActualSize: Fn,
                previewSize: Fn,
                hasCustomSize: void 0
              } : {})
            }
          }), xn) wn(xn.w, xn.h);else if (Fn) {
            const cr = Hs(Fn);
            cr && wn(cr.w, cr.h);
          }
        } else {
          const tr = fn;
          Cr = tr;
          try {
            await Xu(Rt, tr, `topaz_video_${tr}.mp4`);
          } catch (Wt) {
            console.error("[TopazVideo] 本地视频落盘失败:", Wt);
          }
          let kn = "",
            xn = null;
          try {
            const {
                ensureHistoryVideoPreviewThumbnailForAssetId: Wt
              } = await Ie(async () => {
                const {
                  ensureHistoryVideoPreviewThumbnailForAssetId: En
                } = await Promise.resolve().then(() => qh);
                return {
                  ensureHistoryVideoPreviewThumbnailForAssetId: En
                };
              }, void 0, import.meta.url),
              Jt = await Wt(tr);
            Jt != null && Jt.width && (Jt != null && Jt.height) && (xn = {
              w: Jt.width,
              h: Jt.height
            });
            const {
              readHistoryHybridListThumbnail: Nn
            } = await Ie(async () => {
              const {
                readHistoryHybridListThumbnail: En
              } = await Promise.resolve().then(() => ii);
              return {
                readHistoryHybridListThumbnail: En
              };
            }, void 0, import.meta.url);
            if (kn = (await Nn({
              id: tr,
              _assetId: tr
            })) || "", !kn) {
              const {
                ensureLocalPreviewDisplayUrl: En
              } = await Ie(async () => {
                const {
                  ensureLocalPreviewDisplayUrl: Zn
                } = await Promise.resolve().then(() => Ui);
                return {
                  ensureLocalPreviewDisplayUrl: Zn
                };
              }, void 0, import.meta.url);
              kn = (await En(tr, {
                maxDim: 512,
                allowVideoOriginal: !1
              })) || "";
            }
          } catch (Wt) {
            console.warn("[TopazVideo] 本地封面生成失败（不影响按需播放）:", Wt);
          }
          let Fn = "";
          try {
            const {
              localCacheManager: Wt
            } = await Ie(async () => {
              const {
                localCacheManager: Jt
              } = await Promise.resolve().then(() => Ha);
              return {
                localCacheManager: Jt
              };
            }, void 0, import.meta.url);
            await Wt.ensureRestored(), Fn = (await Wt.getConvertFileSrcForAsset(tr)) || "";
          } catch {}
          Fn || (Fn = _c(Rt) || Rt), Un = kn, er = Fn;
          const cr = await gV([Fn, Rt, kn], "video");
          cr && !cr.fromThumb && (xn = {
            w: cr.w,
            h: cr.h
          });
          const vr = xn && !nl(xn.w, xn.h) ? v8(xn.w, xn.h) : void 0;
          a(e.id, {
            content: kn || "",
            previewType: "video",
            selectedPreviewVideo: Fn,
            videoPosterUrl: kn || void 0,
            _contentAssetId: tr,
            isGenerating: !1,
            errorMsg: "",
            settings: {
              ...(e.settings || {}),
              ...(tn ? {
                videoEnhanceProvider: "flux"
              } : {}),
              _assetId: tr,
              _localCacheAssetId: tr,
              _contentAssetId: tr,
              ...(Fn ? {
                _localVideoPlaybackUrl: Fn
              } : {}),
              ...(kn ? {
                videoPosterUrl: kn,
                _canvasDisplayPreviewUrl: kn,
                _useCanvasPreviewDisplay: !0
              } : {}),
              generatedImages: [{
                id: `${tr}_v0`,
                fullUrl: Fn,
                url: kn || Fn,
                thumbUrl: kn || Fn,
                createdAt: Date.now()
              }],
              ...(vr ? {
                previewActualSize: vr,
                previewSize: vr,
                hasCustomSize: void 0
              } : {})
            }
          }), xn && wn(xn.w, xn.h);
        }
        if (u && ir) {
          const tr = Un || "";
          u(kn => kn.map(xn => xn.id === ir ? {
            ...xn,
            status: "completed",
            progress: 100,
            durationMs: Math.max(0, Date.now() - Kr),
            generationTime: `${((Date.now() - Kr) / 1e3).toFixed(1)}s`,
            errorMsg: "",
            ...(an ? {
              ...Rn,
              ...(tr ? {
                thumbnailUrl: tr,
                videoPosterUrl: tr
              } : {})
            } : {
              url: tr || xn.url,
              originalUrl: er || Rt,
              _assetId: Cr || fn,
              ...(tr ? {
                thumbnailUrl: tr,
                videoPosterUrl: tr
              } : {})
            })
          } : xn));
        }
        !an && ir && Ie(async () => {
          const {
            scheduleHistoryOssAutoUpload: tr
          } = await Promise.resolve().then(() => qh);
          return {
            scheduleHistoryOssAutoUpload: tr
          };
        }, void 0, import.meta.url).then(({
          scheduleHistoryOssAutoUpload: tr
        }) => tr(ir, [fn])).catch(() => {});
      } catch (Kt) {
        const Pr = Kt instanceof Error ? Kt.message : tn ? "FLUX 超分失败" : "视频高清失败";
        j(Pr), a(e.id, {
          isGenerating: !1,
          errorMsg: Pr
        }), u && ir && u(kr => kr.map(Mr => Mr.id === ir ? {
          ...Mr,
          status: "failed",
          progress: 0,
          errorMsg: Pr
        } : Mr));
      } finally {
        S(!1);
      }
    }, [wn, H, Qt, ln, Ot, hn, Pn, It, d, Oe, Ze, vt, Ht, nn, pt, lt, _t, At, Yt, qe, kt, Ut, a, e.id, e.width, e.settings, t, i, l, u, n, Ft.assetId]),
    yn = g.useCallback(async () => {
      var ir, Hr, ha;
      if (!It) {
        j("请先连接输入视频");
        return;
      }
      const {
        apiKey: tn,
        submitUrl: Lr,
        openApiRoot: br
      } = m1o(d);
      if (!tn) {
        j("请先配置虎牙海艺 OpenAPI Token（模型接口配置 → 视频 → 虎牙视频放大，或任意虎牙模型 Key）");
        return;
      }
      j(null), I(!1), S(!0), a(e.id, {
        isGenerating: !0,
        errorMsg: ""
      });
      const Jr = Date.now(),
        Kr = u ? l() : "";
      if (u) {
        const Ga = {
          id: Kr,
          url: "",
          type: "video",
          prompt: `海艺视频放大（专业版） ${st}`,
          time: new Date().toLocaleTimeString(),
          status: "generating",
          progress: 5,
          modelName: "海艺视频放大",
          sourceNodeId: e.id,
          startTime: Jr,
          apiConfig: {
            modelId: Sz,
            baseUrl: Lr,
            apiKey: tn
          }
        };
        u(Za => [Ga, ...(ua() ? Za : Za.slice(0, 99))]);
      }
      try {
        const {
          url: Ga,
          assetId: Za
        } = Qct(e.id, n, t, It);
        let va = Ga;
        if (va.startsWith("content_ref:")) {
          await Er.init();
          const Dt = Er.extractId(va),
            bn = await Er.get(Dt);
          if (!bn) throw new Error("无法读取输入视频");
          va = bn;
        }
        if (va = await f1o(va, br, tn, {
          assetId: Za || Ft.assetId
        }), !(Ey(va) || lQ(va) || R2(va) && !/\/thumbnails\//i.test(va) && !/\.(png|jpe?g|webp|gif|bmp)(\?|$)/i.test(va))) throw new Error("请先连接有效视频素材（当前连线可能是图片或视频封面）");
        const Pr = await g1o({
          videoUrl: va,
          resolutionUi: st,
          apiKey: tn,
          submitUrl: Lr
        });
        u && Kr && Pr && u(Dt => Dt.map(bn => bn.id === Kr ? {
          ...bn,
          remoteTaskId: Pr,
          status: "generating",
          progress: Math.max(bn.progress ?? 0, 8),
          apiConfig: {
            modelId: Sz,
            baseUrl: Lr,
            apiKey: tn
          }
        } : bn)), a(e.id, {
          settings: {
            ...(e.settings || {}),
            videoEnhanceProvider: "huya",
            _remoteTaskId: Pr
          }
        });
        const kr = await y1o({
          taskId: Pr,
          openApiRoot: br,
          apiKey: tn
        });
        if (!kr) throw new Error("未获取到虎牙增强视频");
        const Mr = Kr || `huya_enhance_${l()}`,
          {
            tryResolveGenResultForGlobalOss: Hn,
            buildHistoryItemPatchFromGlobalOss: $t,
            pickGenVideoPlaybackUrl: je,
            pickOssVideoImagePosterUrl: Qe
          } = await Ie(async () => {
            const {
              tryResolveGenResultForGlobalOss: Dt,
              buildHistoryItemPatchFromGlobalOss: bn,
              pickGenVideoPlaybackUrl: Rt,
              pickOssVideoImagePosterUrl: fn
            } = await Promise.resolve().then(() => ii);
            return {
              tryResolveGenResultForGlobalOss: Dt,
              buildHistoryItemPatchFromGlobalOss: bn,
              pickGenVideoPlaybackUrl: Rt,
              pickOssVideoImagePosterUrl: fn
            };
          }, void 0, import.meta.url),
          Mt = await Hn([kr], Mr, !0),
          cn = Mt ? $t(Mt, {
            type: "video"
          }) : {};
        let Qn = "",
          Lt = kr,
          ct;
        if (Mt) {
          const Dt = je(Mt, kr, null),
            bn = Qe(String(((ir = Mt.displayUrls) == null ? void 0 : ir[0]) || "").trim()) || "";
          Qn = bn, Lt = Dt;
          const Rt = await gV([kr, (Hr = Mt.remoteUrls) == null ? void 0 : Hr[0], Dt, bn], "video"),
            fn = Rt && !Rt.fromThumb ? v8(Rt.w, Rt.h) : typeof Mt.imageWidth == "number" && typeof Mt.imageHeight == "number" && Mt.imageWidth > 0 && Mt.imageHeight > 0 && !nl(Mt.imageWidth, Mt.imageHeight) ? v8(Mt.imageWidth, Mt.imageHeight) : void 0;
          if (a(e.id, {
            content: bn || "",
            previewType: "video",
            selectedPreviewVideo: Dt,
            videoPosterUrl: bn || void 0,
            _contentAssetId: void 0,
            isGenerating: !1,
            errorMsg: "",
            settings: {
              ...(e.settings || {}),
              videoEnhanceProvider: "huya",
              ...(Mt.ossSettings || {}),
              ...((ha = Mt.generatedImages) != null && ha.length ? {
                generatedImages: Mt.generatedImages
              } : {}),
              ...(bn ? {
                videoPosterUrl: bn
              } : {}),
              ...(fn ? {
                previewActualSize: fn,
                previewSize: fn,
                hasCustomSize: void 0
              } : {})
            }
          }), Rt) wn(Rt.w, Rt.h);else if (fn) {
            const Zt = Hs(fn);
            Zt && wn(Zt.w, Zt.h);
          }
        } else {
          const Dt = Mr;
          ct = Dt;
          try {
            await Xu(kr, Dt, `huya_enhance_${Dt}.mp4`);
          } catch (tt) {
            console.error("[HuyaEnhance] 本地视频落盘失败:", tt);
          }
          let bn = "",
            Rt = null;
          try {
            const {
                ensureHistoryVideoPreviewThumbnailForAssetId: tt
              } = await Ie(async () => {
                const {
                  ensureHistoryVideoPreviewThumbnailForAssetId: Rn
                } = await Promise.resolve().then(() => qh);
                return {
                  ensureHistoryVideoPreviewThumbnailForAssetId: Rn
                };
              }, void 0, import.meta.url),
              zt = await tt(Dt);
            zt != null && zt.width && (zt != null && zt.height) && (Rt = {
              w: zt.width,
              h: zt.height
            });
            const {
              readHistoryHybridListThumbnail: an
            } = await Ie(async () => {
              const {
                readHistoryHybridListThumbnail: Rn
              } = await Promise.resolve().then(() => ii);
              return {
                readHistoryHybridListThumbnail: Rn
              };
            }, void 0, import.meta.url);
            if (bn = (await an({
              id: Dt,
              _assetId: Dt
            })) || "", !bn) {
              const {
                ensureLocalPreviewDisplayUrl: Rn
              } = await Ie(async () => {
                const {
                  ensureLocalPreviewDisplayUrl: Un
                } = await Promise.resolve().then(() => Ui);
                return {
                  ensureLocalPreviewDisplayUrl: Un
                };
              }, void 0, import.meta.url);
              bn = (await Rn(Dt, {
                maxDim: 512,
                allowVideoOriginal: !1
              })) || "";
            }
          } catch (tt) {
            console.warn("[HuyaEnhance] 本地封面生成失败（不影响按需播放）:", tt);
          }
          let fn = "";
          try {
            const {
              localCacheManager: tt
            } = await Ie(async () => {
              const {
                localCacheManager: zt
              } = await Promise.resolve().then(() => Ha);
              return {
                localCacheManager: zt
              };
            }, void 0, import.meta.url);
            await tt.ensureRestored(), fn = (await tt.getConvertFileSrcForAsset(Dt)) || "";
          } catch {}
          fn || (fn = _c(kr) || kr), Qn = bn, Lt = fn;
          const Zt = await gV([fn, kr, bn], "video");
          Zt && !Zt.fromThumb && (Rt = {
            w: Zt.w,
            h: Zt.h
          });
          const Ln = Rt ? v8(Rt.w, Rt.h) : void 0;
          a(e.id, {
            content: bn || "",
            previewType: "video",
            selectedPreviewVideo: fn,
            videoPosterUrl: bn || void 0,
            _contentAssetId: Dt,
            isGenerating: !1,
            errorMsg: "",
            settings: {
              ...(e.settings || {}),
              videoEnhanceProvider: "huya",
              _localCacheAssetId: Dt,
              _localVideoPlaybackUrl: fn,
              ...(bn ? {
                videoPosterUrl: bn
              } : {}),
              generatedImages: [{
                id: `${Dt}_v0`,
                thumbUrl: bn || fn,
                fullUrl: fn,
                url: bn || fn,
                createdAt: Date.now(),
                type: "video"
              }],
              ...(Ln ? {
                previewActualSize: Ln,
                previewSize: Ln,
                hasCustomSize: void 0
              } : {})
            }
          }), Rt && wn(Rt.w, Rt.h);
        }
        if (u && Kr) {
          const Dt = Qn || "";
          u(bn => bn.map(Rt => Rt.id === Kr ? {
            ...Rt,
            status: "completed",
            progress: 100,
            durationMs: Math.max(0, Date.now() - Jr),
            generationTime: `${((Date.now() - Jr) / 1e3).toFixed(1)}s`,
            errorMsg: "",
            remoteTaskId: Rt.remoteTaskId || Pr,
            modelName: Rt.modelName || "海艺视频放大",
            apiConfig: Rt.apiConfig || {
              modelId: Sz,
              baseUrl: Lr,
              apiKey: tn
            },
            ...(Mt ? {
              ...cn,
              ...(Dt ? {
                thumbnailUrl: Dt,
                videoPosterUrl: Dt
              } : {})
            } : {
              url: Dt || Rt.url,
              originalUrl: Lt || kr,
              _assetId: ct || Mr,
              ...(Dt ? {
                thumbnailUrl: Dt,
                videoPosterUrl: Dt
              } : {})
            })
          } : Rt));
        }
        !Mt && Kr && Ie(async () => {
          const {
            scheduleHistoryOssAutoUpload: Dt
          } = await Promise.resolve().then(() => qh);
          return {
            scheduleHistoryOssAutoUpload: Dt
          };
        }, void 0, import.meta.url).then(({
          scheduleHistoryOssAutoUpload: Dt
        }) => Dt(Kr, [Mr])).catch(() => {});
      } catch (Ga) {
        const Za = Ga instanceof Error ? Ga.message : "海艺视频放大失败";
        j(Za), a(e.id, {
          isGenerating: !1,
          errorMsg: Za
        }), u && Kr && u(va => va.map(Kt => Kt.id === Kr ? {
          ...Kt,
          status: "failed",
          progress: 0,
          errorMsg: Za,
          remoteTaskId: Kt.remoteTaskId,
          apiConfig: Kt.apiConfig
        } : Kt));
      } finally {
        S(!1);
      }
    }, [wn, Ft.assetId, n, l, d, st, It, e.id, e.settings, t, u, a]),
    gn = g.useCallback(async () => We === "video" ? Oe === "huya" ? yn() : xt() : Pt(), [We, Oe, yn, xt, Pt]),
    mt = r ? "bg-[#1f1f1f] border-white/20 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.28)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/25 hover:[&::-webkit-scrollbar-thumb]:bg-white/35" : "bg-white border-zinc-200 [scrollbar-width:thin] [scrollbar-color:rgba(113,113,122,0.35)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-zinc-500/35 hover:[&::-webkit-scrollbar-thumb]:bg-zinc-500/50",
    Xt = `h-9 w-full rounded-lg border px-3 text-sm flex items-center justify-between gap-2 ${r ? "border-white/20 bg-[#1f1f1f] text-white" : "border-zinc-300 bg-white text-zinc-900"}`,
    Gn = `text-xs shrink-0 w-[4.5rem] ${r ? "text-white/70" : "text-zinc-500"}`,
    rr = r ? "bg-white text-black border-white" : "bg-zinc-900 text-white border-zinc-900",
    qn = r ? "border-white/20 text-white/90 hover:bg-white/5" : "border-zinc-300 text-zinc-800 hover:bg-zinc-50",
    Dn = b$t(We === "video" ? "video" : "image", !!It),
    Ar = !!It && !A,
    _r = tn => {
      if (tn.button !== 0 || tn.ctrlKey || tn.metaKey || tn.target.closest("[data-simple-video-controls]")) return;
      const br = tn.clientX,
        Jr = tn.clientY;
      let Kr = !0;
      const ir = ha => {
          Math.hypot(ha.clientX - br, ha.clientY - Jr) > 8 && (Kr = !1);
        },
        Hr = ha => {
          window.removeEventListener("pointermove", ir), window.removeEventListener("pointerup", Hr), window.removeEventListener("pointercancel", Hr), Kr && (Math.hypot(ha.clientX - br, ha.clientY - Jr) > 8 || wt());
        };
      window.addEventListener("pointermove", ir), window.addEventListener("pointerup", Hr), window.addEventListener("pointercancel", Hr);
    };
  return c.jsxs("div", {
    ref: pe,
    className: "relative w-full h-full overflow-visible",
    children: [Yn && Kn ? c.jsx(g$t, {
      node: e,
      isSelected: Yn,
      isDark: r,
      canvasZoomMediaOpacity: en,
      onDownload: ft,
      onFullscreen: ht
    }) : null, c.jsxs("div", {
      "data-topaz-preview": !0,
      className: `relative w-full h-full rounded-2xl overflow-hidden border cursor-pointer ${Sp(r)}`,
      onPointerDown: _r,
      children: [ne || Cn || un ? c.jsx("div", {
        className: "flex h-full w-full min-h-0 min-w-0 items-center justify-center overflow-hidden",
        children: We === "video" ? (() => {
          const tn = le && le.h > le.w ? "h-full max-h-full w-auto max-w-full min-h-0 min-w-0" : "h-auto max-h-full w-full max-w-full min-h-0 min-w-0",
            Lr = le ? {
              aspectRatio: `${le.w} / ${le.h}`
            } : {
              width: "100%",
              height: "100%"
            };
          return c.jsx("div", {
            className: tn,
            style: Lr,
            children: Cn ? c.jsx("img", {
              src: Cn,
              alt: "",
              draggable: !1,
              className: "h-full w-full object-contain pointer-events-none select-none rounded-2xl",
              ...Yg(!1)
            }) : c.jsx("div", {
              className: `flex h-full w-full items-center justify-center rounded-2xl border ${Sp(r)}`,
              children: c.jsx(Oo, {
                size: 44,
                className: r ? "text-zinc-600" : "text-zinc-400"
              })
            })
          });
        })() : c.jsx("img", {
          src: ne || "",
          alt: x("增强结果"),
          className: "max-h-full max-w-full object-contain",
          draggable: !1,
          onError: Ue,
          onLoad: tn => {
            var ha;
            const Lr = tn.currentTarget,
              br = vU(Lr.src),
              Jr = (br == null ? void 0 : br.width) || Lr.naturalWidth,
              Kr = (br == null ? void 0 : br.height) || Lr.naturalHeight;
            if (!(Jr > 0 && Kr > 0)) return;
            const ir = !br && nl(Jr, Kr);
            if (wn(Jr, Kr), ir) return;
            const Hr = Hs((ha = e.settings) == null ? void 0 : ha.previewActualSize);
            Hr && !nl(Hr.w, Hr.h) || a(e.id, {
              settings: {
                ...(e.settings || {}),
                previewActualSize: v8(Jr, Kr),
                previewSize: v8(Jr, Kr),
                hasCustomSize: void 0
              }
            });
          }
        }, `${ne || ""}:${Tt}`)
      }) : b && We === "image" && H ? c.jsx("img", {
        src: H,
        alt: x("超清原图"),
        draggable: !1,
        className: "h-full w-full object-contain"
      }) : c.jsxs("div", {
        className: `absolute inset-0 flex flex-col items-center justify-center gap-2 px-3 text-center text-xs ${r ? "text-white/55" : "text-zinc-500"}`,
        children: [We === "video" ? c.jsx(Oo, {
          size: 22,
          className: "opacity-70"
        }) : c.jsx(lo, {
          size: 22,
          className: "opacity-70"
        }), c.jsx("span", {
          children: Dn
        })]
      }), P && c.jsx("div", {
        "data-compact-gen-progress-layer": !0,
        className: `absolute inset-0 z-[60] overflow-hidden pointer-events-none transition-opacity duration-400 ease-out ${C && !A && !e.isGenerating ? "opacity-0" : "opacity-100"}`,
        onTransitionEnd: tn => {
          tn.propertyName === "opacity" && C && !A && !e.isGenerating && I(!1);
        },
        "aria-hidden": !0,
        children: c.jsx(Yv, {
          seed: e.id,
          progressFillRef: E,
          progressThinBarRef: M,
          isDark: r
        })
      }), Vn && Kn ? c.jsx(y$t, {
        isDark: r,
        onRetry: et
      }) : null, R ? c.jsx("div", {
        className: "absolute bottom-2 left-2 right-2 z-20 rounded-lg bg-black/55 px-2 py-1 text-[11px] text-red-300",
        children: R
      }) : null]
    }), c.jsx("div", {
      ref: ce,
      "data-gen-prompt-panel": "true",
      className: b ? "relative mt-4 w-full" : K ? wD : "hidden",
      style: {
        width: `min(${tyn}px, 90vw)`,
        maxWidth: `min(${tyn}px, 90vw)`,
        boxSizing: "border-box",
        ...(b ? {
          width: "100%",
          maxWidth: "100%"
        } : Bt.style)
      },
      onMouseDown: tn => {
        tn.stopPropagation(), b || zb(e.id, p, m, 500, {
          forceSingle: !0
        });
      },
      children: c.jsxs("div", {
        ref: we,
        "data-upscale-settings": !0,
        className: `rounded-2xl border p-3 ${r ? "border-white/15 bg-[#1f1f1f] text-white" : "border-zinc-200 bg-white text-zinc-900"}`,
        style: {
          transition: "none",
          width: "100%"
        },
        children: [!b && c.jsxs("div", {
          className: "mb-3 flex items-center gap-2",
          children: [We === "video" ? c.jsx(c.Fragment, {
            children: [{
              id: "topaz",
              label: "高清放大",
              visible: !0
            }, {
              id: "flux",
              label: "FLUX 超分",
              visible: !0
            }, {
              id: "huya",
              label: "海艺放大",
              visible: !!v
            }].filter(tn => tn.visible).map(tn => c.jsx("button", {
              type: "button",
              className: `inline-flex h-8 items-center rounded-md border px-3 text-xs font-medium transition-colors ${Oe === tn.id ? r ? "border-white/20 bg-[#121212] text-white" : "border-zinc-300 bg-white text-zinc-900" : r ? "border-white/10 bg-transparent text-white/45 hover:text-white/70" : "border-zinc-200 bg-transparent text-zinc-400 hover:text-zinc-600"}`,
              onClick: Lr => {
                Lr.stopPropagation(), rn(tn.id);
              },
              children: x(tn.label)
            }, tn.id))
          }) : c.jsx("span", {
            className: `inline-flex h-8 items-center rounded-md border px-3 text-xs font-medium ${r ? "border-white/20 bg-[#121212] text-white" : "border-zinc-300 bg-white text-zinc-900"}`,
            children: x("高清放大")
          }), c.jsx("div", {
            className: `h-8 w-8 shrink-0 overflow-hidden rounded-md border ${r ? "border-white/15 bg-black/30" : "border-zinc-200 bg-zinc-50"}`,
            children: H && (We !== "video" || tl(H) && !$o(H)) ? c.jsx("img", {
              src: H,
              alt: x("输入"),
              className: "h-full w-full object-cover",
              draggable: !1
            }) : c.jsx("div", {
              className: "flex h-full w-full items-center justify-center opacity-40",
              children: We === "video" ? c.jsx(Oo, {
                size: 12
              }) : c.jsx(lo, {
                size: 12
              })
            })
          })]
        }), We === "image" ? c.jsxs("div", {
          "data-upscale-parameters": Le,
          className: "space-y-2.5",
          children: [c.jsxs("div", {
            className: "flex items-center gap-2",
            children: [c.jsx("span", {
              className: Gn,
              children: x("模型选择")
            }), c.jsxs("div", {
              className: "relative flex-1 min-w-0",
              ref: ue,
              children: [c.jsxs("button", {
                type: "button",
                "aria-label": x("超清模型"),
                className: Xt,
                onClick: tn => {
                  tn.stopPropagation(), G(Lr => !Lr), F(!1), V(!1), L(!1);
                },
                children: [c.jsx("span", {
                  className: "truncate text-left",
                  children: Le === "jimeng-cli" ? x("即梦智能超清（CLI）") : Le === "seedvr2" ? "SeedVR2" : "Topazlabs"
                }), c.jsx(Mi, {
                  size: 14,
                  className: `shrink-0 transition-transform ${N ? "rotate-180" : ""}`
                })]
              }), N && c.jsx("div", {
                className: `absolute z-40 left-0 right-0 ${b ? "bottom-full mb-1 min-w-[220px]" : "top-full mt-1"} overflow-y-auto rounded-lg border p-1 ${mt}`,
                onMouseDown: tn => tn.stopPropagation(),
                children: [{
                  id: "topaz",
                  label: "Topazlabs"
                }, {
                  id: "seedvr2",
                  label: "SeedVR2"
                }, {
                  id: "jimeng-cli",
                  label: "即梦智能超清（CLI）"
                }].map(tn => c.jsx("button", {
                  type: "button",
                  className: `w-full text-left px-2 py-1.5 text-sm rounded ${Le === tn.id ? r ? "bg-white/15" : "bg-zinc-100" : ""} ${r ? "text-zinc-100 hover:bg-white/10" : "text-zinc-800 hover:bg-zinc-100"}`,
                  onClick: () => {
                    a(e.id, {
                      settings: {
                        ...e.settings,
                        imageEnhanceProvider: tn.id,
                        topazProvider: tn.label
                      }
                    }), G(!1);
                  },
                  children: x(tn.label)
                }, tn.id))
              })]
            })]
          }), Le === "jimeng-cli" ? c.jsxs("div", {
            className: "flex items-center gap-2",
            children: [c.jsx("span", {
              className: Gn,
              children: x("目标画质")
            }), c.jsx("div", {
              className: "flex flex-1 gap-2",
              children: _St.map(tn => c.jsx("button", {
                disabled: A,
                type: "button",
                "aria-pressed": Ke === tn,
                className: `flex-1 h-8 rounded-lg text-xs border transition-colors ${Ke === tn ? rr : qn}`,
                onClick: () => a(e.id, {
                  settings: {
                    ...e.settings,
                    jimengUpscaleResolution: tn
                  }
                }),
                children: tn
              }, tn))
            })]
          }) : Le === "seedvr2" ? c.jsxs(c.Fragment, {
            children: [c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx("span", {
                className: Gn,
                children: x("放大模式")
              }), c.jsx("div", {
                className: "flex flex-1 gap-2",
                children: [{
                  id: "factor",
                  label: "倍数"
                }, {
                  id: "target",
                  label: "目标分辨率"
                }].map(tn => c.jsx("button", {
                  type: "button",
                  className: `flex-1 h-8 rounded-lg text-xs border transition-colors ${Xe === tn.id ? rr : qn}`,
                  title: tn.id === "factor" ? x("按倍率放大（upscale_mode=factor）") : x("按目标分辨率放大（upscale_mode=target）"),
                  onClick: () => a(e.id, {
                    settings: {
                      ...e.settings,
                      imageEnhanceProvider: "seedvr2",
                      seedvrUpscaleMode: tn.id
                    }
                  }),
                  children: x(tn.label)
                }, tn.id))
              })]
            }), Xe === "target" ? c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx("span", {
                className: Gn,
                children: x("目标分辨率")
              }), c.jsx("div", {
                className: "grid flex-1 grid-cols-4 gap-1.5",
                children: gKr.map(tn => c.jsx("button", {
                  type: "button",
                  className: `h-8 rounded-lg text-[11px] border transition-colors ${Ye === tn ? rr : qn}`,
                  onClick: () => a(e.id, {
                    settings: {
                      ...e.settings,
                      imageEnhanceProvider: "seedvr2",
                      seedvrTargetResolution: tn
                    }
                  }),
                  children: tn
                }, tn))
              })]
            }) : c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx("span", {
                className: Gn,
                children: x("放大倍数")
              }), c.jsx("div", {
                className: "grid flex-1 grid-cols-4 gap-1.5",
                children: bKr.map(tn => c.jsxs("button", {
                  type: "button",
                  className: `h-8 rounded-lg text-xs border transition-colors ${De === tn ? rr : qn}`,
                  onClick: () => a(e.id, {
                    settings: {
                      ...e.settings,
                      imageEnhanceProvider: "seedvr2",
                      seedvrUpscaleFactor: tn
                    }
                  }),
                  children: [tn, "x"]
                }, tn))
              })]
            }), c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx("span", {
                className: Gn,
                children: x("噪声强度")
              }), c.jsxs("div", {
                className: "flex min-w-0 flex-1 items-center gap-2",
                children: [c.jsx("input", {
                  type: "range",
                  min: NNn,
                  max: jNn,
                  step: Vft,
                  value: Ce,
                  className: `h-1.5 min-w-0 flex-1 ${r ? "accent-white" : "accent-zinc-800"}`,
                  onMouseDown: tn => tn.stopPropagation(),
                  onPointerDown: tn => tn.stopPropagation(),
                  onChange: tn => a(e.id, {
                    settings: {
                      ...e.settings,
                      imageEnhanceProvider: "seedvr2",
                      seedvrNoiseScale: Hft(tn.target.value)
                    }
                  })
                }), c.jsx("span", {
                  className: `w-10 shrink-0 text-right text-[11px] tabular-nums ${r ? "text-white/70" : "text-zinc-500"}`,
                  children: Ce.toFixed(3)
                })]
              })]
            }), c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx("span", {
                className: Gn,
                children: x("输出格式")
              }), c.jsx("div", {
                className: "flex flex-1 gap-2",
                children: yKr.map(tn => c.jsx("button", {
                  type: "button",
                  className: `flex-1 h-8 rounded-lg text-xs border transition-colors ${He === tn ? rr : qn}`,
                  onClick: () => a(e.id, {
                    settings: {
                      ...e.settings,
                      imageEnhanceProvider: "seedvr2",
                      seedvrOutputFormat: tn
                    }
                  }),
                  children: tn
                }, tn))
              })]
            }), c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx("span", {
                className: Gn,
                children: x("随机种子")
              }), c.jsx("input", {
                type: "number",
                inputMode: "numeric",
                placeholder: x("可选"),
                value: it,
                className: `h-9 min-w-0 flex-1 rounded-lg border px-3 text-sm ${r ? "border-white/20 bg-[#1f1f1f] text-white placeholder:text-white/35" : "border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-400"}`,
                onMouseDown: tn => tn.stopPropagation(),
                onPointerDown: tn => tn.stopPropagation(),
                onClick: tn => tn.stopPropagation(),
                onChange: tn => a(e.id, {
                  settings: {
                    ...e.settings,
                    imageEnhanceProvider: "seedvr2",
                    seedvrSeed: tn.target.value
                  }
                })
              })]
            })]
          }) : c.jsxs(c.Fragment, {
            children: [c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx("span", {
                className: Gn,
                children: x("放大风格")
              }), c.jsxs("div", {
                className: "relative flex-1 min-w-0",
                children: [c.jsxs("button", {
                  type: "button",
                  className: Xt,
                  onClick: tn => {
                    tn.stopPropagation(), F(Lr => !Lr), G(!1), V(!1), L(!1);
                  },
                  children: [c.jsx("span", {
                    className: "truncate text-left",
                    children: ((gr = fwe.find(tn => tn.value === me)) == null ? void 0 : gr.label) || x("通用")
                  }), c.jsx(Mi, {
                    size: 14,
                    className: `shrink-0 transition-transform ${B ? "rotate-180" : ""}`
                  })]
                }), B && c.jsx("div", {
                  ref: he,
                  className: `absolute z-40 left-0 right-0 top-full mt-1 max-h-64 overflow-y-auto rounded-lg border p-1 ${mt}`,
                  onMouseDown: tn => tn.stopPropagation(),
                  children: O1o.map(tn => c.jsxs("div", {
                    children: [c.jsx("div", {
                      className: `px-2 py-1 text-[10px] ${r ? "text-white/35" : "text-zinc-400"}`,
                      children: x(tn.label)
                    }), fwe.filter(Lr => Lr.family === tn.id).map(Lr => c.jsx("button", {
                      type: "button",
                      className: `w-full text-left px-2 py-1.5 text-sm rounded ${me === Lr.value ? r ? "bg-white/15" : "bg-zinc-100" : ""} ${r ? "text-zinc-100 hover:bg-white/10" : "text-zinc-800 hover:bg-zinc-100"}`,
                      onClick: () => {
                        a(e.id, {
                          settings: {
                            ...e.settings,
                            topazModel: Lr.value,
                            ...(Lr.family === "transparent" ? {
                              topazFormat: "png",
                              topazFactor: 4
                            } : {})
                          }
                        }), F(!1);
                      },
                      children: x(Lr.label)
                    }, Lr.value))]
                  }, tn.id))
                })]
              })]
            }), Me === "transparent" ? c.jsx("p", {
              className: `text-[11px] leading-relaxed ${r ? "text-white/45" : "text-zinc-500"}`,
              children: x("固定 4× PNG，保留透明通道")
            }) : c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx("span", {
                className: Gn,
                children: x("放大倍数")
              }), c.jsx("div", {
                className: "flex flex-1 gap-2",
                children: B1o.map(tn => c.jsxs("button", {
                  type: "button",
                  className: `flex-1 h-8 rounded-lg text-sm border transition-colors ${Ae === tn ? rr : qn}`,
                  onClick: () => a(e.id, {
                    settings: {
                      ...e.settings,
                      topazFactor: tn
                    }
                  }),
                  children: [tn, "x"]
                }, tn))
              })]
            }), me === "Bloom 2" ? c.jsxs(c.Fragment, {
              children: [c.jsxs("div", {
                className: "flex items-center gap-2",
                children: [c.jsx("span", {
                  className: Gn,
                  children: x("创意度")
                }), c.jsxs("div", {
                  className: "flex min-w-0 flex-1 items-center gap-2",
                  children: [c.jsx("input", {
                    type: "range",
                    min: 1,
                    max: 9,
                    step: 1,
                    value: Re,
                    className: `h-1.5 min-w-0 flex-1 ${r ? "accent-white" : "accent-zinc-800"}`,
                    onMouseDown: tn => tn.stopPropagation(),
                    onPointerDown: tn => tn.stopPropagation(),
                    onChange: tn => a(e.id, {
                      settings: {
                        ...e.settings,
                        topazBloomCreativity: s3t(tn.target.value)
                      }
                    })
                  }), c.jsx("span", {
                    className: `w-6 shrink-0 text-right text-[11px] tabular-nums ${r ? "text-white/70" : "text-zinc-500"}`,
                    children: Re
                  })]
                })]
              }), c.jsxs("label", {
                className: `flex items-center gap-2 text-xs ${r ? "text-white/70" : "text-zinc-600"}`,
                onMouseDown: tn => tn.stopPropagation(),
                children: [c.jsx("input", {
                  type: "checkbox",
                  className: "h-3 w-3 cursor-pointer",
                  checked: $e,
                  onChange: tn => a(e.id, {
                    settings: {
                      ...e.settings,
                      topazColorPreservation: tn.target.checked
                    }
                  })
                }), x("保留原图颜色")]
              })]
            }) : null, me === "Wonder 3" || me === "Wonder 3.5" ? c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx("span", {
                className: Gn,
                children: x("增强强度")
              }), c.jsx("div", {
                className: "flex flex-1 gap-2",
                children: F1o.map(tn => c.jsx("button", {
                  type: "button",
                  className: `flex-1 h-8 rounded-lg text-xs border transition-colors ${nt === tn ? rr : qn}`,
                  onClick: () => a(e.id, {
                    settings: {
                      ...e.settings,
                      topazEnhancementStrength: tn
                    }
                  }),
                  children: x(tn === "low" ? "低" : tn === "medium" ? "中" : "高")
                }, tn))
              })]
            }) : null, me === "Redefine" ? c.jsxs("div", {
              className: "flex items-start gap-2",
              children: [c.jsx("span", {
                className: `${Gn} pt-2`,
                children: x("提示词")
              }), c.jsx("textarea", {
                value: rt,
                rows: 2,
                placeholder: x("可选，引导 Redefine 重建细节"),
                className: `min-h-[2.5rem] flex-1 resize-none rounded-lg border px-3 py-2 text-sm leading-snug ${r ? "border-white/20 bg-[#1f1f1f] text-white placeholder:text-white/35" : "border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-400"}`,
                onClick: tn => tn.stopPropagation(),
                onChange: tn => a(e.id, {
                  settings: {
                    ...e.settings,
                    topazRedefinePrompt: tn.target.value
                  }
                })
              })]
            }) : null]
          })]
        }) : Oe === "huya" ? c.jsxs("div", {
          className: "space-y-2.5",
          children: [c.jsx("p", {
            className: `text-[11px] leading-relaxed ${r ? "text-white/45" : "text-zinc-500"}`,
            children: x("极致画质增强，支持4K，速度慢")
          }), c.jsxs("div", {
            className: "flex items-center gap-2",
            children: [c.jsx("span", {
              className: Gn,
              children: x("输出分辨率")
            }), c.jsxs("div", {
              className: "relative flex-1 min-w-0",
              ref: Te,
              children: [c.jsxs("button", {
                type: "button",
                className: Xt,
                onClick: tn => {
                  tn.stopPropagation(), U(Lr => !Lr), V(!1), L(!1), F(!1);
                },
                children: [c.jsx("span", {
                  className: "truncate text-left",
                  children: st
                }), c.jsx(Mi, {
                  size: 14,
                  className: `shrink-0 transition-transform ${D ? "rotate-180" : ""}`
                })]
              }), D && c.jsx("div", {
                ref: Ne,
                className: `absolute z-40 left-0 right-0 top-full mt-1 max-h-48 overflow-y-auto rounded-lg border p-1 ${mt}`,
                onMouseDown: tn => tn.stopPropagation(),
                children: bRe.map(tn => c.jsxs("button", {
                  type: "button",
                  className: `w-full text-left px-2 py-1.5 text-sm rounded flex items-center justify-between ${st === tn ? r ? "bg-white/15" : "bg-zinc-100" : ""} ${r ? "text-zinc-100 hover:bg-white/10" : "text-zinc-800 hover:bg-zinc-100"}`,
                  onClick: () => {
                    a(e.id, {
                      settings: {
                        ...e.settings,
                        videoResolution: tn,
                        videoEnhanceProvider: "huya"
                      }
                    }), U(!1);
                  },
                  children: [c.jsx("span", {
                    children: tn
                  }), st === tn ? c.jsx("span", {
                    className: "text-xs opacity-80",
                    children: "✓"
                  }) : null]
                }, tn))
              })]
            })]
          })]
        }) : Oe === "flux" ? c.jsxs("div", {
          className: "space-y-2.5",
          children: [c.jsx("p", {
            className: `text-[11px] leading-relaxed ${r ? "text-white/45" : "text-zinc-500"}`,
            children: x("FLUX 3 超分，最长约 20 秒 / 50MB，提升至 1080p、2K 或 4K")
          }), c.jsxs("div", {
            className: "flex items-center gap-2",
            children: [c.jsx("span", {
              className: Gn,
              children: x("模型选择")
            }), c.jsxs("div", {
              className: "relative flex-1 min-w-0",
              ref: ge,
              children: [c.jsxs("button", {
                type: "button",
                className: Xt,
                onClick: tn => {
                  tn.stopPropagation(), V(Lr => !Lr), F(!1), L(!1), U(!1);
                },
                children: [c.jsx("span", {
                  className: "truncate text-left",
                  children: ((jr = fTe.find(tn => tn.api === hn)) == null ? void 0 : jr.label) ?? hn
                }), c.jsx(Mi, {
                  size: 14,
                  className: `shrink-0 transition-transform ${z ? "rotate-180" : ""}`
                })]
              }), z && c.jsx("div", {
                ref: _e,
                className: `absolute z-40 left-0 right-0 top-full mt-1 max-h-48 overflow-y-auto rounded-lg border p-1 ${mt}`,
                onMouseDown: tn => tn.stopPropagation(),
                children: fTe.map(tn => c.jsx("button", {
                  type: "button",
                  className: `w-full text-left px-2 py-1.5 text-sm rounded truncate ${hn === tn.api ? r ? "bg-white/15" : "bg-zinc-100" : ""} ${r ? "text-zinc-100 hover:bg-white/10" : "text-zinc-800 hover:bg-zinc-100"}`,
                  onClick: () => {
                    a(e.id, {
                      settings: {
                        ...e.settings,
                        videoEnhanceProvider: "flux",
                        fluxVideoModel: tn.api
                      }
                    }), V(!1);
                  },
                  children: x(tn.label)
                }, tn.api))
              })]
            })]
          }), c.jsxs("div", {
            className: "flex items-center gap-2",
            children: [c.jsx("span", {
              className: Gn,
              children: x("分辨率")
            }), c.jsx("div", {
              className: "flex flex-1 gap-2",
              children: hKt.map(tn => c.jsx("button", {
                type: "button",
                className: `flex-1 h-8 rounded-lg text-xs border transition-colors ${Pn === tn ? rr : qn}`,
                onClick: () => a(e.id, {
                  settings: {
                    ...e.settings,
                    videoEnhanceProvider: "flux",
                    videoResolution: tn
                  }
                }),
                children: tn
              }, tn))
            })]
          }), c.jsxs("div", {
            className: "flex items-center gap-2",
            children: [c.jsx("span", {
              className: Gn,
              children: x("超分模式")
            }), c.jsx("div", {
              className: "flex flex-1 gap-2",
              children: aKr.map(tn => c.jsx("button", {
                type: "button",
                className: `flex-1 h-8 rounded-lg text-xs border transition-colors ${Qt === tn.value ? rr : qn}`,
                title: tn.value === 0 ? x("忠实原片（creativity=0）") : x("创意增强细节（creativity=1）"),
                onClick: () => a(e.id, {
                  settings: {
                    ...e.settings,
                    videoEnhanceProvider: "flux",
                    fluxCreativity: tn.value
                  }
                }),
                children: x(tn.label)
              }, tn.value))
            })]
          }), c.jsxs("div", {
            className: "flex items-start gap-2",
            children: [c.jsx("span", {
              className: `${Gn} pt-2`,
              children: x("提示词")
            }), c.jsx("textarea", {
              value: Ot,
              rows: 2,
              placeholder: x("可选，用于引导创意增强细节"),
              className: `min-h-[2.5rem] flex-1 resize-none rounded-lg border px-3 py-2 text-sm leading-snug ${r ? "border-white/20 bg-[#1f1f1f] text-white placeholder:text-white/35" : "border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-400"}`,
              onClick: tn => tn.stopPropagation(),
              onChange: tn => a(e.id, {
                settings: {
                  ...e.settings,
                  videoEnhanceProvider: "flux",
                  fluxUpscalePrompt: tn.target.value
                }
              })
            })]
          }), c.jsxs("div", {
            className: "flex items-center gap-2",
            children: [c.jsx("span", {
              className: Gn,
              children: x("安全等级")
            }), c.jsx("div", {
              className: "flex flex-1 gap-1",
              children: Array.from({
                length: TNn - Gft + 1
              }, (tn, Lr) => Gft + Lr).map(tn => c.jsx("button", {
                type: "button",
                className: `flex-1 h-8 rounded-lg text-xs border transition-colors ${ln === tn ? rr : qn}`,
                title: x("safety_tolerance={0}，越低越严格", tn),
                onClick: () => a(e.id, {
                  settings: {
                    ...e.settings,
                    videoEnhanceProvider: "flux",
                    fluxSafetyTolerance: tn
                  }
                }),
                children: tn
              }, tn))
            })]
          }), c.jsx("p", {
            className: `text-[10px] ${r ? "text-white/35" : "text-zinc-400"}`,
            children: x("安全等级越低越严格，默认 2")
          })]
        }) : c.jsxs("div", {
          className: "space-y-2.5",
          children: [c.jsxs("div", {
            className: "flex items-center gap-2",
            children: [c.jsx("span", {
              className: Gn,
              children: x("产品线")
            }), c.jsx("div", {
              className: "flex flex-1 gap-1.5",
              children: Q0n.map(tn => c.jsx("button", {
                type: "button",
                title: tn.hint,
                className: `flex-1 h-8 rounded-lg text-xs border transition-colors ${lt === tn.id ? rr : qn}`,
                onClick: () => {
                  const Lr = Y0n(tn.id).some(br => br.api === pt) ? pt : T1o(tn.id);
                  a(e.id, {
                    settings: {
                      ...e.settings,
                      topazVideoLine: tn.id,
                      topazVideoModel: Lr
                    }
                  });
                },
                children: x(tn.label)
              }, tn.id))
            })]
          }), c.jsx("p", {
            className: `text-[11px] leading-relaxed ${r ? "text-white/45" : "text-zinc-500"}`,
            children: (ea = Q0n.find(tn => tn.id === lt)) == null ? void 0 : ea.hint
          }), c.jsxs("div", {
            className: "flex items-center gap-2",
            children: [c.jsx("span", {
              className: Gn,
              children: x("模型选择")
            }), c.jsxs("div", {
              className: "relative flex-1 min-w-0",
              ref: ge,
              children: [c.jsxs("button", {
                type: "button",
                className: Xt,
                onClick: tn => {
                  tn.stopPropagation(), V(Lr => !Lr), F(!1), L(!1), U(!1);
                },
                children: [c.jsx("span", {
                  className: "truncate text-left",
                  children: ((pa = P1o(pt)) == null ? void 0 : pa.label) ?? pt
                }), c.jsx(Mi, {
                  size: 14,
                  className: `shrink-0 transition-transform ${z ? "rotate-180" : ""}`
                })]
              }), z && c.jsxs("div", {
                ref: _e,
                className: `absolute z-40 left-0 right-0 top-full mt-1 max-h-48 overflow-y-auto rounded-lg border p-1 ${mt}`,
                onMouseDown: tn => tn.stopPropagation(),
                children: [fTe.map(tn => c.jsx("button", {
                  type: "button",
                  className: `w-full text-left px-2 py-1.5 text-sm rounded truncate ${r ? "text-zinc-100 hover:bg-white/10" : "text-zinc-800 hover:bg-zinc-100"}`,
                  title: x("切换到 FLUX 超分（blackforestlabs/flux-video-upscale）"),
                  onClick: () => {
                    a(e.id, {
                      settings: {
                        ...e.settings,
                        videoEnhanceProvider: "flux",
                        fluxVideoModel: tn.api
                      }
                    }), V(!1);
                  },
                  children: x(tn.label)
                }, tn.api)), c.jsx("div", {
                  className: `my-1 h-px ${r ? "bg-white/10" : "bg-zinc-200"}`,
                  "aria-hidden": !0
                }), gt.map(tn => c.jsx("button", {
                  type: "button",
                  className: `w-full text-left px-2 py-1.5 text-sm rounded truncate ${pt === tn.api ? r ? "bg-white/15" : "bg-zinc-100" : ""} ${r ? "text-zinc-100 hover:bg-white/10" : "text-zinc-800 hover:bg-zinc-100"}`,
                  title: tn.api,
                  onClick: () => {
                    a(e.id, {
                      settings: {
                        ...e.settings,
                        topazVideoLine: lt,
                        topazVideoModel: tn.api
                      }
                    }), V(!1);
                  },
                  children: x(tn.label)
                }, tn.api))]
              })]
            })]
          }), lt === "creative" ? c.jsxs(c.Fragment, {
            children: [c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx("span", {
                className: Gn,
                children: x("创意度")
              }), c.jsxs("div", {
                className: "flex min-w-0 flex-1 items-center gap-2",
                children: [c.jsx("input", {
                  type: "range",
                  min: 0,
                  max: 1,
                  step: .05,
                  value: At,
                  className: `h-1.5 min-w-0 flex-1 ${r ? "accent-white" : "accent-zinc-800"}`,
                  onMouseDown: tn => tn.stopPropagation(),
                  onPointerDown: tn => tn.stopPropagation(),
                  onChange: tn => a(e.id, {
                    settings: {
                      ...e.settings,
                      topazCreativity: X0n(tn.target.value)
                    }
                  })
                }), c.jsx("span", {
                  className: `w-8 shrink-0 text-right text-[11px] tabular-nums ${r ? "text-white/70" : "text-zinc-500"}`,
                  children: At.toFixed(2)
                })]
              })]
            }), c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx("span", {
                className: Gn,
                children: x("真实感")
              }), c.jsxs("div", {
                className: "flex min-w-0 flex-1 items-center gap-2",
                children: [c.jsx("input", {
                  type: "range",
                  min: 0,
                  max: 1,
                  step: .05,
                  value: Yt ?? .5,
                  className: `h-1.5 min-w-0 flex-1 ${r ? "accent-white" : "accent-zinc-800"}`,
                  onMouseDown: tn => tn.stopPropagation(),
                  onPointerDown: tn => tn.stopPropagation(),
                  onChange: tn => a(e.id, {
                    settings: {
                      ...e.settings,
                      topazRealism: Z0n(tn.target.value)
                    }
                  })
                }), c.jsx("span", {
                  className: `w-8 shrink-0 text-right text-[11px] tabular-nums ${r ? "text-white/70" : "text-zinc-500"}`,
                  children: (Yt ?? .5).toFixed(2)
                })]
              })]
            }), c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx("span", {
                className: Gn,
                children: x("锐度")
              }), c.jsxs("div", {
                className: "flex min-w-0 flex-1 items-center gap-2",
                children: [c.jsx("input", {
                  type: "range",
                  min: 0,
                  max: 1,
                  step: .05,
                  value: qe,
                  className: `h-1.5 min-w-0 flex-1 ${r ? "accent-white" : "accent-zinc-800"}`,
                  onMouseDown: tn => tn.stopPropagation(),
                  onPointerDown: tn => tn.stopPropagation(),
                  onChange: tn => a(e.id, {
                    settings: {
                      ...e.settings,
                      topazSharp: J0n(tn.target.value)
                    }
                  })
                }), c.jsx("span", {
                  className: `w-8 shrink-0 text-right text-[11px] tabular-nums ${r ? "text-white/70" : "text-zinc-500"}`,
                  children: qe.toFixed(2)
                })]
              })]
            }), c.jsxs("div", {
              className: "flex items-start gap-2",
              children: [c.jsx("span", {
                className: `${Gn} pt-2`,
                children: x("提示词")
              }), c.jsx("textarea", {
                value: _t,
                rows: 2,
                placeholder: x("可选，引导 Astra 2 生成细节"),
                className: `min-h-[2.5rem] flex-1 resize-none rounded-lg border px-3 py-2 text-sm leading-snug ${r ? "border-white/20 bg-[#1f1f1f] text-white placeholder:text-white/35" : "border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-400"}`,
                onClick: tn => tn.stopPropagation(),
                onChange: tn => a(e.id, {
                  settings: {
                    ...e.settings,
                    topazCreativePrompt: tn.target.value
                  }
                })
              })]
            })]
          }) : null, lt === "generative" && pt === "Starlight Precise 2.6" ? c.jsxs("div", {
            className: "flex items-center gap-2",
            children: [c.jsx("span", {
              className: Gn,
              children: x("柔化")
            }), c.jsxs("div", {
              className: "flex min-w-0 flex-1 items-center gap-2",
              children: [c.jsx("input", {
                type: "range",
                min: Fvr,
                max: zvr,
                step: .5,
                value: kt ?? 3,
                className: `h-1.5 min-w-0 flex-1 ${r ? "accent-white" : "accent-zinc-800"}`,
                onMouseDown: tn => tn.stopPropagation(),
                onPointerDown: tn => tn.stopPropagation(),
                onChange: tn => a(e.id, {
                  settings: {
                    ...e.settings,
                    topazSoftness: eyn(tn.target.value)
                  }
                })
              }), c.jsx("span", {
                className: `w-8 shrink-0 text-right text-[11px] tabular-nums ${r ? "text-white/70" : "text-zinc-500"}`,
                children: (kt ?? 3).toFixed(1)
              })]
            })]
          }) : null, c.jsxs("div", {
            className: "flex items-center gap-2",
            children: [c.jsx("span", {
              className: Gn,
              children: x("分辨率")
            }), c.jsx("div", {
              className: "flex flex-1 gap-2",
              children: ["1080P", "2K", "4K"].map(tn => c.jsx("button", {
                type: "button",
                className: `flex-1 h-8 rounded-lg text-xs border transition-colors ${Ze === tn || tn === "1080P" && Ze === "720P" ? rr : qn}`,
                onClick: () => a(e.id, {
                  settings: {
                    ...e.settings,
                    videoResolution: tn
                  }
                }),
                children: tn
              }, tn))
            })]
          }), c.jsxs("div", {
            className: "flex items-center gap-2",
            children: [c.jsx("span", {
              className: Gn,
              children: x("补帧模式")
            }), c.jsxs("div", {
              className: "relative flex-1 min-w-0",
              ref: ke,
              children: [c.jsxs("button", {
                type: "button",
                className: Xt,
                onClick: tn => {
                  tn.stopPropagation(), L(Lr => !Lr), F(!1), V(!1);
                },
                children: [c.jsx("span", {
                  className: "truncate text-left",
                  children: ((Br = nyn.find(tn => tn.value === vt)) == null ? void 0 : Br.label) ?? x("不补帧")
                }), c.jsx(Mi, {
                  size: 14,
                  className: `shrink-0 transition-transform ${O ? "rotate-180" : ""}`
                })]
              }), O && c.jsx("div", {
                ref: ve,
                className: `absolute z-40 left-0 right-0 top-full mt-1 max-h-48 overflow-y-auto rounded-lg border p-1 ${mt}`,
                onMouseDown: tn => tn.stopPropagation(),
                children: nyn.map(tn => c.jsx("button", {
                  type: "button",
                  className: `w-full text-left px-2 py-1.5 text-sm rounded truncate ${vt === tn.value ? r ? "bg-white/15" : "bg-zinc-100" : ""} ${r ? "text-zinc-100 hover:bg-white/10" : "text-zinc-800 hover:bg-zinc-100"}`,
                  onClick: () => {
                    a(e.id, {
                      settings: {
                        ...e.settings,
                        frameInterpolationMode: tn.value
                      }
                    }), L(!1);
                  },
                  children: x(tn.label)
                }, tn.value))
              })]
            })]
          }), vt !== "none" && c.jsxs(c.Fragment, {
            children: [c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx("span", {
                className: Gn,
                children: x("帧率")
              }), c.jsx("select", {
                value: String(Ht),
                onChange: tn => a(e.id, {
                  settings: {
                    ...e.settings,
                    targetFps: Number(tn.target.value)
                  }
                }),
                className: `h-9 flex-1 rounded-lg border px-2 text-sm ${r ? "border-white/20 bg-[#1f1f1f] text-white" : "border-zinc-300 bg-white text-zinc-900"}`,
                children: [24, 30, 48, 60].map(tn => c.jsxs("option", {
                  value: tn,
                  children: [tn, "fps"]
                }, tn))
              })]
            }), c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx("span", {
                className: Gn,
                children: x("减速强度")
              }), c.jsx("select", {
                value: nn,
                onChange: tn => a(e.id, {
                  settings: {
                    ...e.settings,
                    slowMotionFactor: tn.target.value
                  }
                }),
                className: `h-9 flex-1 rounded-lg border px-2 text-sm ${r ? "border-white/20 bg-[#1f1f1f] text-white" : "border-zinc-300 bg-white text-zinc-900"}`,
                children: ["1x", "2x", "3x", "5x"].map(tn => c.jsx("option", {
                  value: tn,
                  children: tn
                }, tn))
              })]
            })]
          })]
        }), R ? c.jsx("div", {
          className: "mt-2 text-[11px] text-red-400",
          children: R
        }) : null, c.jsxs("div", {
          "data-upscale-actions": !0,
          className: "mt-3 flex items-center justify-end gap-2",
          children: [b && c.jsx("span", {
            className: "mr-auto text-xs text-zinc-500",
            children: x("生成后作为新作品保存在对话中")
          }), at(), c.jsxs("button", {
            type: "button",
            disabled: !Ar,
            title: x(We === "video" ? Oe === "huya" ? "开始海艺视频放大" : Oe === "flux" ? "开始 FLUX 超分" : "开始视频高清" : Le === "jimeng-cli" ? "开始即梦智能超清" : Le === "seedvr2" ? "开始 SeedVR2 放大" : "开始高清放大"),
            "aria-label": x(We === "video" ? Oe === "huya" ? "开始海艺视频放大" : Oe === "flux" ? "开始 FLUX 超分" : "开始视频高清" : Le === "jimeng-cli" ? "开始即梦智能超清" : Le === "seedvr2" ? "开始 SeedVR2 放大" : "开始高清放大"),
            onClick: tn => {
              tn.stopPropagation(), gn();
            },
            className: `flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-opacity active:scale-95 ${Ar ? "bg-white text-black hover:opacity-90" : r ? "cursor-not-allowed bg-white/25 text-black/40" : "cursor-not-allowed bg-zinc-300 text-zinc-500"}`,
            children: [b && c.jsx("span", {
              children: x(A ? "生成中" : "生成")
            }), A ? c.jsx(Ua, {
              size: 16,
              className: "animate-spin",
              strokeWidth: 2.5
            }) : c.jsx(Gc, {
              size: 16,
              strokeWidth: 2.5
            })]
          })]
        })]
      })
    })]
  });
};

function two(e, t, n, r) {
  if (e <= 0 || t <= 0 || n <= 0 || r <= 0) return {
    width: 0,
    height: 0
  };
  const a = Math.min(e / n, t / r);
  return {
    width: Math.round(n * a),
    height: Math.round(r * a)
  };
}

function nwo(e) {
  if (!e) return;
  const t = Math.abs(e) / 100;
  return {
    background: e > 0 ? `radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,${.35 + t * .55}) 100%)` : `radial-gradient(ellipse at center, rgba(255,255,255,${.12 + t * .28}) 0%, transparent 65%)`,
    pointerEvents: "none"
  };
}

const bEe = ({
    originalImage: e,
    adjustedImage: t,
    adjustedFilter: n,
    curves: r,
    vignette: a = 0,
    blurBackground: i = !0,
    objectFit: o = "contain",
    initialPosition: s = 50,
    showLabels: l = !0,
    className: d = ""
  }) => {
    on();
    const [u, h] = g.useState(s),
      [p, m] = g.useState(!1),
      f = g.useRef(null),
      y = g.useRef(null),
      b = g.useRef(null),
      [v, _] = g.useState(null),
      [w, k] = g.useState({
        width: 0,
        height: 0
      }),
      A = g.useCallback(() => {
        const R = f.current;
        !R || !v || k(two(R.clientWidth, R.clientHeight, v.w, v.h));
      }, [v]);
    g.useLayoutEffect(() => {
      A();
      const R = f.current;
      if (!R) return;
      const j = new ResizeObserver(() => A());
      return j.observe(R), () => j.disconnect();
    }, [A]);
    const S = g.useCallback(R => {
        const j = R.currentTarget;
        j.naturalWidth > 0 && j.naturalHeight > 0 && _({
          w: j.naturalWidth,
          h: j.naturalHeight
        });
      }, []),
      C = g.useRef(u);
    C.current = u;
    const I = g.useCallback(R => {
        const j = y.current;
        return j ? Dvr(R, j.getBoundingClientRect(), C.current) ?? C.current : C.current;
      }, []),
      E = R => {
        if ("button" in R && R.button !== 0) return;
        R.preventDefault(), R.stopPropagation(), m(!0);
        const j = "touches" in R ? R.touches[0].clientX : R.clientX;
        h(I(j));
      };
    g.useEffect(() => {
      if (!p) return;
      const R = B => {
          const F = "touches" in B ? B.touches[0].clientX : B.clientX;
          "touches" in B && B.cancelable && B.preventDefault(), h(I(F));
        },
        j = () => m(!1);
      return window.addEventListener("mousemove", R), window.addEventListener("mouseup", j, !0), window.addEventListener("touchmove", R, {
        passive: !1
      }), window.addEventListener("touchend", j, !0), window.addEventListener("touchcancel", j, !0), () => {
        window.removeEventListener("mousemove", R), window.removeEventListener("mouseup", j, !0), window.removeEventListener("touchmove", R), window.removeEventListener("touchend", j, !0), window.removeEventListener("touchcancel", j, !0);
      };
    }, [p, I]);
    const M = R => {
      const j = R.shiftKey ? 10 : 1;
      let B = null;
      if (R.key === "ArrowLeft") B = W$e(u, -j);else if (R.key === "ArrowRight") B = W$e(u, j);else if (R.key === "Home") B = 0;else if (R.key === "End") B = 100;else return;
      R.preventDefault(), R.stopPropagation(), h(B);
    };
    g.useEffect(() => {
      if (!r || !Object.values(r).some(F => F && F.length > 0) || !b.current || !t || w.width <= 0) return;
      const R = b.current,
        j = R.getContext("2d");
      if (!j) return;
      R.width = w.width, R.height = w.height;
      const B = new Image();
      B.src = t, B.onload = () => {
        j.drawImage(B, 0, 0, R.width, R.height);
        const F = j.getImageData(0, 0, R.width, R.height),
          N = F.data,
          G = U7(r.c),
          z = r.c ? null : U7(r.r),
          V = r.c ? null : U7(r.g),
          O = r.c ? null : U7(r.b);
        if (G || z || V || O) {
          for (let L = 0; L < N.length; L += 4) G ? (N[L] = G[N[L]], N[L + 1] = G[N[L + 1]], N[L + 2] = G[N[L + 2]]) : (z && (N[L] = z[N[L]]), V && (N[L + 1] = V[N[L + 1]]), O && (N[L + 2] = O[N[L + 2]]));
          j.putImageData(F, 0, 0);
        }
      };
    }, [r, t, w]);
    const T = {
        objectFit: o,
        width: "100%",
        height: "100%",
        display: "block"
      },
      P = nwo(a);
    return c.jsxs("div", {
      ref: f,
      className: `relative h-full w-full select-none ${d}`,
      children: [i && e && c.jsxs("div", {
        className: "pointer-events-none absolute inset-0 overflow-hidden",
        "aria-hidden": !0,
        children: [c.jsx("img", {
          src: e,
          alt: "",
          className: "absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-[42px] brightness-[0.55] saturate-125",
          draggable: !1
        }), c.jsx("div", {
          className: "absolute inset-0 bg-[#0a0a0c]/35 backdrop-blur-[6px]"
        })]
      }), c.jsx("img", {
        src: e,
        alt: "",
        className: "pointer-events-none absolute h-0 w-0 opacity-0",
        onLoad: S,
        draggable: !1
      }), c.jsx("div", {
        className: "absolute inset-0 flex items-center justify-center",
        children: c.jsxs("div", {
          ref: y,
          className: "relative overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.45)]",
          style: {
            width: w.width || void 0,
            height: w.height || void 0,
            maxWidth: "100%",
            maxHeight: "100%",
            cursor: p ? "ew-resize" : "default"
          },
          children: [c.jsx("div", {
            className: "absolute inset-0",
            children: c.jsx("img", {
              src: e,
              alt: x("原图"),
              style: T,
              draggable: !1
            })
          }), c.jsxs("div", {
            className: "absolute inset-0",
            style: {
              clipPath: `inset(0 0 0 ${u}%)`
            },
            children: [c.jsx("img", {
              src: t,
              alt: x("调整后"),
              style: {
                ...T,
                filter: n
              },
              draggable: !1
            }), r && Object.values(r).some(R => R && R.length > 0) && c.jsx("canvas", {
              ref: b,
              className: "absolute inset-0",
              style: {
                width: w.width,
                height: w.height
              }
            }), P && c.jsx("div", {
              className: "absolute inset-0",
              style: P
            })]
          }), c.jsxs("div", {
            className: "absolute bottom-0 top-0 z-10 pointer-events-none",
            style: {
              left: `${u}%`
            },
            children: [c.jsx("div", {
              className: "absolute bottom-0 top-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.55)]",
              style: {
                left: "-1px"
              }
            }), c.jsx("div", {
              className: "absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/85 bg-black/40 shadow-xl backdrop-blur-sm transition-transform hover:scale-105",
              children: c.jsxs("div", {
                className: "flex items-center gap-0.5 text-[10px] font-bold text-white",
                children: [c.jsx("span", {
                  children: "<"
                }), c.jsx("span", {
                  children: ">"
                })]
              })
            })]
          }), c.jsx("button", {
            type: "button",
            role: "slider",
            tabIndex: 0,
            "aria-label": x("对比分割位置"),
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            "aria-valuenow": Math.round(u),
            className: "absolute bottom-0 top-0 z-20 w-8 -translate-x-1/2 cursor-ew-resize touch-none bg-transparent border-0 p-0",
            style: {
              left: `${u}%`
            },
            onMouseDown: E,
            onTouchStart: E,
            onKeyDown: M,
            onClick: R => R.stopPropagation()
          }), l && c.jsxs(c.Fragment, {
            children: [c.jsx("div", {
              className: "pointer-events-none absolute left-3 top-3 z-20 rounded-full bg-black/55 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm transition-opacity",
              style: {
                opacity: u > 12 ? 1 : 0
              },
              children: x("原图")
            }), c.jsx("div", {
              className: "pointer-events-none absolute right-3 top-3 z-20 rounded-full bg-black/55 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm transition-opacity",
              style: {
                opacity: u < 88 ? 1 : 0
              },
              children: x("调整后")
            })]
          })]
        })
      })]
    });
  },
  vEe = [{
    value: "natural",
    label: "柔和"
  }, {
    value: "default",
    label: "均衡"
  }, {
    value: "cinematic",
    label: "浓郁"
  }],
  Hvr = "qiaodoumayi_image_wash_settings",
  l3t = {
    id: "atelier-image-wash",
    provider: "本地图片增强",
    modelName: "质感增强",
    type: "Image",
    key: "",
    url: "http://127.0.0.1",
    localComfy: {
      providerId: "atelier-image-wash",
      model: "image-wash"
    }
  };

async function Wvr(e, t, n) {
  var s;
  let r = !1,
    a = !0;
  const i = async () => {
      if (!r) {
        r = !0;
        try {
          n() && (await $p("image_wash_install_cancel"));
          const l = await $p("image_wash_install_status");
          a && !n() && t(l);
        } catch {} finally {
          r = !1;
        }
      }
    },
    o = setInterval(() => void i(), 400);
  try {
    if (n()) throw new Error("已停止组件安装");
    const l = await $p("image_wash_install", {
      providerId: (s = e.localComfy) == null ? void 0 : s.providerId
    });
    if (n()) throw new Error("已停止组件安装");
    return {
      ...e,
      localComfy: {
        providerId: l,
        model: "image-wash"
      }
    };
  } finally {
    a = !1, clearInterval(o);
  }
}

function rwo() {
  try {
    const e = JSON.parse(localStorage.getItem(Hvr) || "null");
    if (vEe.some(t => t.value === (e == null ? void 0 : e.style)) && Number.isFinite(e == null ? void 0 : e.intensity) && e.intensity >= 0 && e.intensity <= 1) return e;
  } catch {}
  return {
    style: "natural",
    intensity: .5
  };
}

function c3t(e) {
  return e ? e.imageWashMissingFiles === void 0 ? "当前桌面程序尚未包含图片增强，请使用更新后的桌面版本。" : e.imageWashError ? e.imageWashError : e.root ? e.imageWashMissingFiles.length ? `图片增强组件不完整：${e.imageWashMissingFiles.join("、")}` : "" : "首次处理会自动安装本地增强组件，安装完成后继续处理。" : "正在检查本地增强组件…";
}

function qvr(e) {
  try {
    const t = JSON.parse(e),
      n = t == null ? void 0 : t.item;
    return (t == null ? void 0 : t.type) !== "history-item" || !n || n.type !== "image" || typeof n.id != "string" || !n.id || n.status === "failed" || n.status === "generating" || ![n.url, n.originalUrl, n._assetId].some(r => typeof r == "string" && r.length > 0) ? null : n;
  } catch {
    return null;
  }
}

async function cue(e) {
  const t = await createImageBitmap(e);
  try {
    return {
      width: t.width,
      height: t.height
    };
  } finally {
    t.close();
  }
}

async function Kvr(e, t, n, r) {
  var s, l;
  if (!e.localComfy) throw new Error("请先关联本地模型目录");
  if (!["image/png", "image/jpeg", "image/webp"].includes(t.type)) throw new Error("请选择 PNG、JPEG 或 WebP 图片");
  if (!t.size || t.size > 36 * 1024 * 1024) throw new Error("单张图片需大于 0 且不超过 36 MiB");
  const o = (l = (s = (await (await AH({
    ...e,
    localComfy: {
      ...e.localComfy,
      model: "image-wash"
    }
  }, {
    prompt: "",
    images: [await Fu(t)],
    imageEnhancement: n
  }, r)).json()).data) == null ? void 0 : s[0]) == null ? void 0 : l.url;
  if (!o || !o.startsWith("data:image/")) throw new Error("本地增强未返回有效图片");
  return Ns(o, {
    compressForApi: !1
  });
}

async function Qvr(e, t, n, r, a) {
  const i = crypto.randomUUID(),
    o = vEe.find(d => d.value === r.style).label,
    s = {
      id: i,
      type: "image",
      url: "",
      prompt: `${t} · ${o} ${Math.round(r.intensity * 100)}%`,
      modelName: "质感增强 · 本地增强",
      studioTool: "image-wash",
      status: "completed",
      progress: 100,
      ...ky(Date.now()),
      width: n.width,
      height: n.height,
      durationMs: a
    };
  if (ua()) {
    const d = URL.createObjectURL(e);
    try {
      const u = await Uk(d, `质感增强-${i}.png`);
      if (!(u != null && u.remoteUrl)) throw new Error("图床保存失败，可重试保存当前结果");
      return {
        ...s,
        url: u.displayUrl || u.remoteUrl,
        originalUrl: u.remoteUrl,
        thumbnailUrl: u.displayUrl,
        _globalOssUrlOnly: !0,
        ossUploaded: !0,
        _ossRemoteUrl: u.remoteUrl,
        _ossThumbnailUrl: u.displayUrl
      };
    } finally {
      URL.revokeObjectURL(d);
    }
  }
  await ni.init(), await ni.saveBlobAsset(i, e, "file://image-wash-local");
  const l = await ni.getAssetUrl(i);
  if (!l) throw new Error("本地缓存保存失败，可重试保存当前结果");
  return {
    ...s,
    url: l,
    _assetId: i
  };
}

function xDe(e, t) {
  const n = new Map(e.map(r => [r.id, r]));
  return Tvr(e.filter(r => {
    var a;
    return ((a = r.settings) == null ? void 0 : a.mediaType) !== "audio" && r.previewType !== "audio";
  }), "").filter(r => r.kind === t).map(r => {
    const a = n.get(r.nodeId);
    return {
      id: a.id,
      name: r.name,
      kind: t,
      thumbnail: r.posterUrl,
      assetId: (t === "video" ? a._selectedVideoAssetId : void 0) || cHe(a),
      node: a
    };
  });
}

function due(e) {
  return {
    id: e.id,
    name: e.prompt || "未命名素材",
    kind: e.type === "video" ? "video" : "image",
    thumbnail: e.type === "video" ? e.videoPosterUrl || e.thumbnailUrl : e.thumbnailUrl || e.url,
    assetId: sM(e),
    history: e
  };
}

async function UJ(e) {
  var d;
  const t = e.history,
    n = e.node;
  let r = t ? Bd(t) || t.originalUrl || ((d = t.mjImages) == null ? void 0 : d[t.selectedMjImageIndex || 0]) || t.url || "" : B6r(n) || "";
  n && e.kind === "video" && (r = iZ(n.selectedPreviewVideo || r, r, n));
  const a = await Vm(r, e.assetId);
  if (!a && !r) throw new Error("原始素材不可用，请检查本地缓存或重新上传。");
  const [i] = a ? [r] : await BF([r]),
    o = a || (await Nhe(i || r));
  if (!o.size) throw new Error("原始素材为空，请检查存储位置。");
  const s = e.kind === "video" ? o.type.includes("quicktime") ? "mov" : o.type.includes("webm") ? "webm" : "mp4" : o.type.includes("jpeg") ? "jpg" : o.type.includes("webp") ? "webp" : o.type.includes("svg") ? "svg" : "png",
    l = o.type && o.type !== "application/octet-stream" ? o.type : e.kind === "video" ? "video/mp4" : "image/png";
  return new File([o], `${e.name.slice(0, 60).replace(/[\\/:*?"<>|\r\n]/g, "_")}.${s}`, {
    type: l
  });
}

function awo(e) {
  var r;
  const t = e == null ? void 0 : e.washStyle,
    n = e == null ? void 0 : e.washIntensity;
  return {
    style: ((r = vEe.find(a => a.value === t)) == null ? void 0 : r.value) || "natural",
    intensity: typeof n == "number" && Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : .5
  };
}

async function iwo({
  node: e,
  nodes: t,
  connections: n,
  input: r,
  options: a,
  config: i = l3t,
  documentSession: o,
  setNodes: s,
  setHistory: l
}) {
  var y;
  if (al.getNodeSnapshot(e.id).status === "generating") return;
  const d = {
      id: crypto.randomUUID(),
      sourceNodeId: e.id,
      type: "image",
      url: "",
      prompt: "质感增强",
      modelName: "质感增强 · 本地增强",
      status: "generating",
      timestamp: Date.now(),
      time: "",
      progress: 0
    },
    u = o == null ? void 0 : o.lease();
  let h = !1;
  const p = () => !h && (!u || u.isCurrent()),
    m = () => {
      if (!p()) throw new Error("已停止处理，保留上次结果");
    },
    f = b => {
      const v = b.detail;
      ((v == null ? void 0 : v.taskId) === d.id || (v == null ? void 0 : v.nodeId) === e.id) && (h = !0);
    };
  window.addEventListener("cancelPolling", f), QBt(e.id), al.syncHistoryItem(d), hu(e.id, !0);
  try {
    if (m(), jb()) throw new Error("存储位置正在变更，请稍后再处理");
    const b = await VIn(e.id, r.url, n, t, {
        assetId: r.assetId,
        mediaType: "image"
      }),
      v = await UJ({
        id: e.id,
        name: "质感增强原图",
        kind: "image",
        assetId: r.assetId,
        history: {
          ...d,
          url: b,
          status: "completed"
        }
      }),
      _ = await cue(v);
    m();
    let w = await $p("local_models_status", {
      providerId: (y = i.localComfy) == null ? void 0 : y.providerId
    });
    w.imageWashMissingFiles !== void 0 && (!w.root || w.imageWashMissingFiles.length) && (i = await Wvr(i, () => {}, () => !p()), w = await $p("local_models_status", {
      providerId: i.localComfy.providerId
    })), m();
    const k = c3t(w);
    if (k) throw new Error(k);
    const A = await Kvr(i, v, a, {
      taskId: d.id,
      nodeId: e.id,
      isCurrent: p,
      onProgress: M => al.setProgress(d.id, Math.min(99, M))
    });
    m();
    const S = await cue(A);
    if (S.width !== _.width || S.height !== _.height) throw new Error("增强结果尺寸与原图不一致，请重试");
    const C = `wash_original_${crypto.randomUUID()}`;
    await ni.init(), await ni.saveBlobAsset(C, v, "file://image-wash-original");
    const I = await ni.getAssetUrl(C);
    if (!I) throw new Error("原图保存失败，请重试");
    const E = {
      ...(await Qvr(A, e.nodeName || "质感增强", _, a, Date.now() - d.timestamp)),
      sourceNodeId: e.id
    };
    m(), await l9(), await NP([E], {
      force: !0
    }), m(), l(M => [E, ...M]), LT(E.id, E.url, l), s(M => p() ? M.map(T => T.id !== e.id ? T : {
      ...T,
      content: E.originalUrl || E.url,
      _contentAssetId: E._assetId,
      previewType: "image",
      settings: {
        ...T.settings,
        _assetId: E._assetId,
        _contentAssetId: E._assetId,
        washOriginalUrl: I,
        washOriginalAssetId: C,
        previewActualSize: `${_.width}×${_.height}`,
        previewSize: `${_.width}×${_.height}`
      }
    }) : M), al.syncHistoryItem({
      ...d,
      url: E.url,
      status: "completed",
      progress: 100
    });
  } catch (b) {
    al.syncHistoryItem({
      ...d,
      status: "failed",
      errorMsg: b instanceof Error ? b.message : String(b)
    });
  } finally {
    window.removeEventListener("cancelPolling", f), hu(e.id, !1);
  }
}

function owo(e) {
  var L, D, U;
  on();
  const {
      node: t,
      isDark: n,
      setNodes: r,
      updateNode: a,
      setHistory: i,
      selectedNodeId: o,
      onGenPromptPanelUiChange: s
    } = e,
    l = E5e(t.id),
    d = l.status === "generating",
    u = awo(t.settings),
    h = (((L = e.getConnectedInputItems) == null ? void 0 : L.call(e, t.id)) || []).filter(H => H.type === "image"),
    p = h[0],
    [m, f] = g.useState(!1),
    [y, b] = g.useState("compare"),
    [v, _] = g.useState(() => Cd().zoom || 1),
    w = g.useRef(null),
    k = g.useRef(null),
    A = g.useRef(null),
    S = o === t.id,
    C = g.useMemo(() => p != null && p.assetId ? [p.assetId] : [], [p == null ? void 0 : p.assetId]),
    I = g.useMemo(() => t._contentAssetId ? [t._contentAssetId] : [], [t._contentAssetId]),
    E = g.useMemo(() => {
      var H;
      return (H = t.settings) != null && H.washOriginalAssetId ? [String(t.settings.washOriginalAssetId)] : [];
    }, [(D = t.settings) == null ? void 0 : D.washOriginalAssetId]),
    {
      content: M
    } = Kp(p == null ? void 0 : p.url, {
      nodeType: "input-image",
      allowDirectOssUrl: !0,
      blobRecoveryAssetIds: C
    }),
    {
      content: T
    } = Kp(t.content, {
      nodeType: "input-image",
      allowDirectOssUrl: !0,
      blobRecoveryAssetIds: I
    }),
    {
      content: P
    } = Kp((U = t.settings) == null ? void 0 : U.washOriginalUrl, {
      nodeType: "input-image",
      allowDirectOssUrl: !0,
      blobRecoveryAssetIds: E
    }),
    R = yEe({
      node: t,
      resultUrl: T || null,
      mediaType: "image",
      onDownloadSelected: e.onDownloadSelected,
      setLightboxItem: e.setLightboxItem,
      setLightboxOpen: e.setLightboxOpen
    });
  g.useEffect(() => f(S), [S]), g.useEffect(() => dw(H => _(H.zoom || 1)), []), g.useEffect(() => (Dd(t.id, m), s == null || s(t.id, m), () => {
    Dd(t.id, !1), s == null || s(t.id, !1);
  }), [t.id, m, s]), g.useEffect(() => {
    if (!m) return;
    const H = K => {
        var W;
        (W = w.current) != null && W.contains(K.target) || f(!1);
      },
      Y = K => {
        K.key === "Escape" && f(!1);
      };
    return window.addEventListener("mousedown", H, !0), window.addEventListener("keydown", Y), () => {
      window.removeEventListener("mousedown", H, !0), window.removeEventListener("keydown", Y);
    };
  }, [m]);
  const j = yI({
    hostRef: k,
    open: m,
    zoom: v,
    remeasureKey: `${m}:${l.status}`,
    stabilizeNodeId: t.id
  });
  Qp(A, "50% 0%", m);
  const B = () => zb(t.id, e.setSelectedNodeId, e.setSelectedNodeIds, 500, {
      forceSingle: !0
    }),
    F = H => a(t.id, {
      settings: {
        ...t.settings,
        ...H
      }
    }),
    N = () => {
      var H;
      !p || h.length !== 1 || d || !i || (b("compare"), iwo({
        node: t,
        nodes: e.nodes,
        connections: e.connections,
        input: p,
        options: u,
        setNodes: r,
        setHistory: i,
        documentSession: e.documentSession,
        config: (H = e.apiConfigs) == null ? void 0 : H.find(Y => {
          var K;
          return Y.enabled !== !1 && ((K = Y.localComfy) == null ? void 0 : K.model) === "image-wash";
        })
      }));
    },
    G = n ? "text-zinc-400" : "text-zinc-500",
    z = n ? "border-white/15" : "border-zinc-200",
    V = n ? "bg-white text-zinc-950 border-white" : "bg-zinc-900 text-white border-zinc-900",
    O = n ? "bg-transparent text-zinc-300 border-white/15 hover:bg-white/5" : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50";
  return c.jsxs("div", {
    ref: w,
    className: "relative h-full w-full",
    "data-image-wash-node": !0,
    children: [c.jsxs("div", {
      className: `relative h-full w-full overflow-hidden rounded-2xl border ${Sp(n)}`,
      onClick: () => {
        B(), f(!0);
      },
      children: [T && P && y === "compare" ? c.jsx("div", {
        className: "h-full w-full",
        onPointerDown: H => {
          H.stopPropagation(), B();
        },
        onClick: H => {
          H.stopPropagation(), f(!0);
        },
        children: c.jsx(bEe, {
          originalImage: P,
          adjustedImage: T,
          blurBackground: !1
        }, T)
      }) : (y === "original" && T ? P : T || M) ? c.jsx("img", {
        src: (y === "original" && T ? P : T || M) || "",
        alt: x(y === "original" ? "原图" : "质感增强预览"),
        draggable: !1,
        className: "h-full w-full object-contain"
      }) : c.jsxs("div", {
        className: `flex h-full flex-col items-center justify-center gap-3 text-xs ${G}`,
        children: [c.jsx(mu, {
          size: 25,
          strokeWidth: 1.4
        }), c.jsx("span", {
          children: x("连接图片，增强质感")
        })]
      }), d && c.jsxs("div", {
        role: "status",
        className: "absolute inset-x-3 bottom-3 rounded-xl bg-black/70 p-3 text-white backdrop-blur-sm",
        children: [c.jsxs("div", {
          className: "mb-2 flex items-center gap-2 text-xs",
          children: [c.jsx(Ua, {
            size: 13,
            className: "animate-spin"
          }), x(l.progress ? "正在增强质感" : "正在准备本地增强组件"), c.jsxs("span", {
            className: "ml-auto",
            children: [Math.round(l.progress), "%"]
          })]
        }), c.jsx("div", {
          className: "h-0.5 overflow-hidden rounded bg-white/20",
          children: c.jsx("div", {
            className: "h-full bg-white transition-all",
            style: {
              width: `${l.progress}%`
            }
          })
        })]
      })]
    }), c.jsx("div", {
      ref: k,
      "data-gen-prompt-panel": "true",
      className: m ? wD : "hidden",
      style: {
        width: "min(400px, 90vw)",
        maxWidth: "min(400px, 90vw)",
        boxSizing: "border-box",
        ...j.style
      },
      onPointerDown: H => H.stopPropagation(),
      onMouseDown: H => {
        H.stopPropagation(), B();
      },
      onKeyDown: H => {
        H.stopPropagation(), H.key === "Escape" && f(!1);
      },
      children: c.jsxs("div", {
        ref: A,
        className: `rounded-2xl border p-4 shadow-sm ${z} ${n ? "bg-[#1f1f1f] text-white" : "bg-white text-zinc-900"}`,
        children: [c.jsxs("div", {
          className: "mb-5 flex items-center gap-2.5",
          children: [c.jsxs("span", {
            className: `inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-sm ${z}`,
            children: [c.jsx(ac, {
              size: 15
            }), x("质感增强")]
          }), M && c.jsx("img", {
            src: M,
            alt: x("输入图片"),
            draggable: !1,
            className: `h-9 w-9 rounded-lg border object-cover ${z}`
          }), c.jsx("span", {
            className: `ml-auto text-[11px] ${G}`,
            children: x("原尺寸输出")
          }), c.jsx("button", {
            type: "button",
            "aria-label": x("收起参数"),
            className: `rounded-md p-1 ${G}`,
            onClick: () => f(!1),
            children: c.jsx(Na, {
              size: 14
            })
          })]
        }), c.jsxs("div", {
          className: "mb-4 flex items-center gap-4",
          children: [c.jsx("span", {
            className: `w-16 shrink-0 text-xs ${G}`,
            children: x("质感风格")
          }), c.jsx("div", {
            role: "group",
            "aria-label": x("质感风格"),
            className: "flex flex-1 gap-2",
            children: vEe.map(H => c.jsx("button", {
              type: "button",
              "aria-pressed": u.style === H.value,
              disabled: d,
              className: `h-9 min-w-0 flex-1 rounded-lg border text-xs transition-colors disabled:opacity-60 ${u.style === H.value ? V : O}`,
              onClick: () => F({
                washStyle: H.value
              }),
              children: x(H.label)
            }, H.value))
          })]
        }), c.jsxs("label", {
          className: "mb-4 flex items-center gap-4",
          children: [c.jsx("span", {
            className: `w-16 shrink-0 text-xs ${G}`,
            children: x("增强强度")
          }), c.jsx("input", {
            "aria-label": x("增强强度"),
            type: "range",
            min: "0",
            max: "100",
            step: "1",
            value: Math.round(u.intensity * 100),
            disabled: d,
            className: `h-1 min-w-0 flex-1 cursor-pointer ${n ? "accent-white" : "accent-zinc-900"}`,
            onChange: H => F({
              washIntensity: Number(H.target.value) / 100
            })
          }), c.jsxs("span", {
            className: "w-9 text-right text-xs tabular-nums",
            children: [Math.round(u.intensity * 100), "%"]
          })]
        }), T && c.jsxs("div", {
          className: `mb-3 flex items-center gap-1 border-t pt-3 ${z}`,
          children: [["original", "compare", "result"].map((H, Y) => c.jsx("button", {
            type: "button",
            disabled: H !== "result" && !P,
            "aria-pressed": y === H,
            className: `rounded-md px-2.5 py-1.5 text-xs disabled:opacity-40 ${y === H ? n ? "bg-white/10" : "bg-zinc-100" : G}`,
            onClick: () => b(H),
            children: x(["原图", "对比", "结果"][Y])
          }, H)), c.jsx("button", {
            type: "button",
            className: `ml-auto rounded-md p-2 ${G}`,
            "aria-label": x("下载结果"),
            onClick: R.handleDownload,
            children: c.jsx(ws, {
              size: 15
            })
          }), c.jsx("button", {
            type: "button",
            className: `rounded-md p-2 ${G}`,
            "aria-label": x("放大查看结果"),
            onClick: R.handleFullscreen,
            children: c.jsx(Wm, {
              size: 15
            })
          })]
        }), l.status === "failed" && c.jsx("p", {
          role: "alert",
          className: "mb-3 break-words text-xs leading-relaxed text-red-500",
          children: l.errorMsg
        }), c.jsxs("div", {
          className: "flex items-center justify-between gap-3",
          children: [c.jsx("span", {
            className: `text-[11px] ${G}`,
            children: x(h.length > 1 ? "请只连接一张图片" : p ? T ? "拖动对比线查看前后效果" : "本地处理 · 保留画面细节" : "从图片节点连线接入")
          }), c.jsx("button", {
            type: "button",
            disabled: !d && (!p || h.length !== 1),
            "aria-label": x(d ? "停止处理" : "开始质感增强"),
            title: x(d ? "停止处理" : "开始质感增强"),
            className: `flex h-9 w-9 shrink-0 items-center justify-center rounded-full border disabled:opacity-30 ${V}`,
            onClick: () => d ? window.dispatchEvent(new CustomEvent("cancelPolling", {
              detail: {
                taskId: l.taskId,
                nodeId: t.id
              }
            })) : N(),
            children: d ? c.jsx(kf, {
              size: 13,
              fill: "currentColor"
            }) : c.jsx(Gc, {
              size: 19
            })
          })]
        })]
      })
    })]
  });
}

const Yvr = 2048,
  Xvr = 2 * 1024 * 1024,
  swo = 1536,
  lwo = 1024 * 1024;

function J$e(e) {
  return String(e || "").trim().replace(/^Bearer\s+/i, "");
}

function Jvr(e) {
  return /CVProcess|Read timed out|read timeout\s*=\s*\d+/i.test(String(e || ""));
}

function iyn(e) {
  const t = String(e || "").trim();
  return Jvr(t) ? "火山主体分割超时（海艺侧调用火山 CV 超过约 30 秒）。已尽量压缩重试仍失败，请换更小尺寸图片或稍后再试。" : t || "火山主体分割失败";
}

function cwo(e = "") {
  const t = Q5e,
    n = Qa.getResolvedModelBaseUrl(t),
    r = Qa.getEffectiveApiKey(t),
    a = tKe({
      modelId: t,
      configKey: r,
      globalApiKey: e,
      baseUrl: n
    }) || eKe(t) || J$e(e),
    i = lMt(n || Tqe),
    o = cMt(i) || "https://art.huya.info/openapi/v1";
  return {
    apiKey: J$e(a),
    submitUrl: i,
    openApiRoot: o
  };
}

async function dwo(e, t) {
  let n = String(e || "").trim();
  if (!n) throw new Error("输入图片为空");
  if (n.startsWith("content_ref:")) {
    await Er.init();
    const a = Er.extractId(n),
      i = await Er.get(a);
    if (!i) throw new Error("无法读取输入图片");
    n = i;
  }
  let r = null;
  if (t != null && t.assetId) try {
    const {
      assetStore: a
    } = await Ie(async () => {
      const {
        assetStore: i
      } = await Promise.resolve().then(() => Ri);
      return {
        assetStore: i
      };
    }, void 0, import.meta.url);
    r = await a.getAssetBlob(t.assetId);
  } catch {
    r = null;
  }
  if ((!r || r.size === 0) && n.startsWith(Ld)) {
    const a = (t == null ? void 0 : t.assetId) || n.slice(Ld.length);
    if (a) try {
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
      r = await i.getAssetBlob(a);
    } catch {
      r = null;
    }
  }
  if ((!r || r.size === 0) && (r = await Ns(n)), !r || r.size === 0) throw new Error("无法读取输入图片以上传海艺");
  return r;
}

async function uwo(e, t, n, r) {
  const a = (r == null ? void 0 : r.maxLongEdge) ?? Yvr,
    i = (r == null ? void 0 : r.maxBytes) ?? Xvr,
    o = String(t || "").trim().replace(/\/+$/, ""),
    s = fhe(o),
    l = Array.from(new Set([s, ...kZ(o)].filter(Boolean))),
    d = await dwo(e, {
      assetId: r == null ? void 0 : r.assetId
    });
  let u = "",
    h = d;
  try {
    u = URL.createObjectURL(d);
    let y = d.size > i;
    try {
      const b = await Tue(u);
      (b.w > a || b.h > a) && (y = !0);
    } catch {}
    if (y) {
      const b = await G7(u, Math.min(i, Math.floor(i * .85)), i, a);
      h = await (await fetch(b)).blob();
    }
  } finally {
    u && URL.revokeObjectURL(u);
  }
  const p = (h.type || "image/jpeg").trim() || "image/jpeg",
    m = p.includes("png") ? "png" : p.includes("webp") ? "webp" : "jpg",
    f = new File([h], `huya-subject-seg-${Date.now()}.${m}`, {
      type: p
    });
  return XP(f, o, n, {
    uploadCandidates: l
  });
}

async function hwo(e) {
  var l;
  const t = J$e(e.apiKey);
  if (!q7(t)) throw new Error("请先配置虎牙海艺 OpenAPI Token（AI-xxx）：模型接口配置 → 图像 → 虎牙火山主体分割，或任意虎牙模型 Key");
  const n = e.method || oMt,
    r = {
      skill: n7n,
      image_url: e.imageUrl,
      method: n
    },
    a = await $i(e.submitUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${t}`
      },
      body: JSON.stringify(r)
    }),
    i = await a.text();
  let o = {};
  try {
    o = i ? JSON.parse(i) : {};
  } catch {
    o = {};
  }
  if (!a.ok) {
    const d = hd(o, "") || String(o.error || o.message || i.slice(0, 160) || `HTTP ${a.status}`);
    throw new Error(`火山主体分割提交失败：${d}`);
  }
  const s = String(o.task_id || o.taskId || ((l = o.data) == null ? void 0 : l.task_id) || "").trim();
  if (!s) throw new Error("火山主体分割未返回 task_id");
  return s;
}

async function pwo(e) {
  var r;
  const t = J$e(e.apiKey),
    n = gk(e.openApiRoot, e.taskId);
  for (let a = 0; a < r7n; a++) {
    if ((r = e.signal) != null && r.aborted) throw new Error("已取消");
    a > 0 && (await new Promise(u => setTimeout(u, ES)));
    const o = await (await $i(n, {
      headers: {
        Authorization: `Bearer ${t}`
      }
    })).text();
    let s = {};
    try {
      s = o ? JSON.parse(o) : {};
    } catch {
      s = {};
    }
    const l = cE(s);
    if (E1(s, l)) throw new Error(hd(s, "火山主体分割失败"));
    const {
      urls: d
    } = fv(s, !0);
    if (d[0]) return d[0];
    V9t(l);
  }
  throw new Error("火山主体分割超时（约 5 分钟），请稍后在历史或虎牙后台查看");
}

async function oyn(e) {
  var r, a, i;
  (r = e.onProgress) == null || r.call(e, 8);
  const t = await uwo(e.imageUrl, e.openApiRoot, e.apiKey, {
    assetId: e.assetId,
    maxLongEdge: e.maxLongEdge,
    maxBytes: e.maxBytes
  });
  (a = e.onProgress) == null || a.call(e, 20);
  const n = await hwo({
    imageUrl: t,
    apiKey: e.apiKey,
    submitUrl: e.submitUrl,
    method: oMt
  });
  return (i = e.onProgress) == null || i.call(e, 35), pwo({
    taskId: n,
    openApiRoot: e.openApiRoot,
    apiKey: e.apiKey,
    signal: e.signal
  });
}

async function mwo(e) {
  var i, o, s, l;
  const {
      apiKey: t,
      submitUrl: n,
      openApiRoot: r
    } = cwo(e.globalApiKeyFallback || ""),
    a = {
      imageUrl: e.imageUrl,
      apiKey: t,
      submitUrl: n,
      openApiRoot: r,
      assetId: e.assetId,
      signal: e.signal,
      onProgress: e.onProgress
    };
  try {
    const d = await oyn({
      ...a,
      maxLongEdge: Yvr,
      maxBytes: Xvr
    });
    return (i = e.onProgress) == null || i.call(e, 95), d;
  } catch (d) {
    const u = d instanceof Error ? d.message : String(d);
    if ((o = e.signal) != null && o.aborted || !Jvr(u)) throw new Error(iyn(u));
    console.warn("[huyaRemoveBackground] 火山 CVProcess 超时，缩小图片后重试", u.slice(0, 160)), (s = e.onProgress) == null || s.call(e, 12);
    try {
      const h = await oyn({
        ...a,
        maxLongEdge: swo,
        maxBytes: lwo
      });
      return (l = e.onProgress) == null || l.call(e, 95), h;
    } catch (h) {
      const p = h instanceof Error ? h.message : String(h);
      throw new Error(iyn(p));
    }
  }
}

const Zvr = [{
  id: "fal",
  label: "Fal Rembg"
}, {
  id: "huya-volc",
  label: "火山主体分割"
}];

function syn(e) {
  const t = String(e || "").trim();
  return t === "huya-volc" || t === "火山主体分割" || /volcengine_cvprocess|huya.*rembg|subject.?seg/i.test(t) ? "huya-volc" : "fal";
}

function fwo(e) {
  var t;
  return ((t = Zvr.find(n => n.id === e)) == null ? void 0 : t.label) || e;
}

function gwo(e) {
  return e === "huya-volc" ? "火山主体分割" : "去除背景";
}

const lyn = 400,
  ywo = [{
    value: !1,
    label: "保留画幅"
  }, {
    value: !0,
    label: "裁切主体"
  }];

function Yct(e, t) {
  return `${Math.round(e)}×${Math.round(t)}`;
}

function bwo(e, t, n) {
  var i;
  const r = t.find(o => o.to === e && (!o.inputType || o.inputType === "default")),
    a = r ? n.find(o => o.id === r.from) : void 0;
  if (a) return r9(a) || a._contentAssetId || ((i = a.settings) == null ? void 0 : i._contentAssetId);
}

async function vwo(e) {
  const t = await fetch(e).then(n => {
    if (!n.ok) throw new Error("无法读取本地 blob 资源");
    return n.blob();
  });
  return await new Promise((n, r) => {
    const a = new FileReader();
    a.onload = () => n(String(a.result || "")), a.onerror = () => r(new Error("本地资源转 Base64 失败")), a.readAsDataURL(t);
  });
}

const wwo = ({
    node: e,
    nodes: t,
    connections: n,
    isDark: r,
    updateNode: a,
    setNodes: i,
    getConnectedInputImages: o,
    generateId: s,
    globalApiKey: l = "",
    setHistory: d,
    selectedNodeId: u = null,
    setSelectedNodeId: h,
    setSelectedNodeIds: p,
    onGenPromptPanelUiChange: m,
    enableGenerationNodeAnimation: f = !0,
    showHuyaModels: y = !1,
    setLightboxItem: b,
    setLightboxOpen: v,
    onDownloadSelected: _
  }) => {
    var Ke, Xe, De;
    on();
    const [w, k] = g.useState(() => !!e.isGenerating),
      [A, S] = g.useState(!1),
      C = g.useRef(null),
      I = g.useRef(null),
      E = g.useRef(!!e.isGenerating),
      M = w || A;
    g.useEffect(() => {
      w && hu(e.id, !0);
    }, [w, e.id]), g.useLayoutEffect(() => {
      w || al.getNodeSnapshot(e.id).status !== "generating" && Px(e.id) && hu(e.id, !1);
    }, [w, e.id]), g.useEffect(() => {
      E.current && !w && S(!0), E.current = w;
    }, [w]), g.useEffect(() => {
      if (!A) return;
      const Ye = window.setTimeout(() => S(!1), 450);
      return () => window.clearTimeout(Ye);
    }, [A]);
    const [T, P] = g.useState(null),
      [R, j] = g.useState(null),
      [B, F] = g.useState(null),
      [N, G] = g.useState(!1),
      [z, V] = g.useState(!1),
      [O, L] = g.useState(() => Cd().zoom || 1),
      [D, U] = g.useState(() => {
        var Ye;
        return !!((Ye = e.settings) != null && Ye.genUseAliyunOss);
      }),
      [H, Y] = g.useState(() => ua()),
      [K, W] = g.useState(() => Ph()),
      [Q, q] = g.useState(() => mo()),
      ne = g.useRef(e.settings);
    g.useEffect(() => {
      ne.current = e.settings;
    }, [e.settings]);
    const de = g.useRef(null),
      le = g.useRef(null),
      J = g.useRef(null),
      pe = g.useRef(!1);
    pe.current = N;
    const ce = syn((Ke = e.settings) == null ? void 0 : Ke.rembgProvider),
      we = ce === "huya-volc" && !y ? "fal" : ce,
      X = we === "huya-volc",
      Z = !!((Xe = e.settings) != null && Xe.rembgCropToBbox) && !X,
      re = g.useMemo(() => Zvr.filter(Ye => Ye.id !== "huya-volc" || y), [y]);
    g.useEffect(() => {
      if (y || ce !== "huya-volc") return;
      const Ye = {
        ...ne.current
      };
      a(e.id, {
        nodeName: "去除背景",
        settings: {
          ...Ye,
          rembgProvider: "fal"
        }
      });
    }, [y, ce, e.id, a]), g.useEffect(() => {
      var Ye;
      U(!!((Ye = e.settings) != null && Ye.genUseAliyunOss));
    }, [e.id, (De = e.settings) == null ? void 0 : De.genUseAliyunOss]), g.useEffect(() => {
      const Ye = () => {
        Y(ua()), W(Ph()), q(mo());
      };
      return Ye(), window.addEventListener(go, Ye), () => window.removeEventListener(go, Ye);
    }, []), g.useEffect(() => {
      if (K || H || !D) return;
      U(!1);
      const Ye = {
        ...ne.current
      };
      Ye.genUseAliyunOss && a(e.id, {
        settings: {
          ...Ye,
          genUseAliyunOss: !1
        }
      });
    }, [K, H, D, e.id, a]);
    const ye = o(e.id)[0] || null,
      ie = g.useMemo(() => bwo(e.id, n, t), [e.id, n, t]),
      ae = u === e.id,
      be = typeof e.content == "string" ? e.content.trim() : "";
    g.useEffect(() => {
      if (!ye) {
        j(null);
        return;
      }
      let Ye = !1,
        Ce = null;
      return (async () => {
        try {
          const {
              resolveConnectedInputOriginalUrlAsync: He
            } = await Ie(async () => {
              const {
                resolveConnectedInputOriginalUrlAsync: it
              } = await Promise.resolve().then(() => ii);
              return {
                resolveConnectedInputOriginalUrlAsync: it
              };
            }, void 0, import.meta.url),
            Ve = await He(e.id, ye, n, t, {
              assetId: ie,
              mediaType: "image"
            });
          if (Ye) {
            Ve.startsWith("blob:") && Ve !== ye && URL.revokeObjectURL(Ve);
            return;
          }
          Ve.startsWith("blob:") && Ve !== ye && (Ce = Ve), j(Ve || null);
        } catch {
          Ye || j(ye);
        }
      })(), () => {
        Ye = !0, Ce && URL.revokeObjectURL(Ce);
      };
    }, [ye, e.id, n, t, ie]), g.useEffect(() => {
      if (!be) {
        F(null);
        return;
      }
      let Ye = !1;
      return (async () => {
        let Ce = be;
        try {
          if (Ce.startsWith("content_ref:")) {
            await Er.init();
            const He = await Er.get(Er.extractId(Ce));
            He && (Ce = He);
          }
        } catch {}
        Ye || F(Ce);
      })(), () => {
        Ye = !0;
      };
    }, [be]);
    const Ee = g.useCallback(() => {
        zb(e.id, h, p, 500, {
          forceSingle: !0
        }), Dd(e.id, !0), m == null || m(e.id, !0), G(!0);
      }, [e.id, m, h, p]),
      xe = g.useCallback(() => {
        G(!1), Dd(e.id, !1), m == null || m(e.id, !1);
      }, [e.id, m]),
      he = g.useRef(!1);
    g.useEffect(() => {
      ae && !he.current ? Ee() : !ae && pe.current && xe(), he.current = ae;
    }, [ae]), g.useEffect(() => () => {
      Dd(e.id, !1), m == null || m(e.id, !1);
    }, [e.id, m]), g.useEffect(() => (L(Cd().zoom || 1), dw(Ye => {
      L(Ye.zoom || 1);
    })), []), g.useEffect(() => {
      if (!N) return;
      const Ye = Ce => {
        var Ve, it;
        const He = Ce.target;
        He && ((Ve = de.current) != null && Ve.contains(He) || (it = le.current) != null && it.contains(He) || xe());
      };
      return window.addEventListener("mousedown", Ye, !0), () => window.removeEventListener("mousedown", Ye, !0);
    }, [N, xe]);
    const ue = yI({
      hostRef: le,
      open: N,
      zoom: O,
      remeasureKey: `${N}`,
      stabilizeNodeId: e.id
    });
    Qp(J, "50% 0%", N);
    const ge = g.useCallback((Ye, Ce) => {
        !(Ye > 0) || !(Ce > 0) || l5({
          nodeId: e.id,
          mw: Ye,
          mh: Ce,
          setNodes: i,
          currentWidth: e.width,
          currentHeight: e.height,
          hasCustomSize: !1,
          actualSizeLabel: {
            w: Ye,
            h: Ce
          }
        });
      }, [e.height, e.id, e.width, i]),
      _e = y9(O),
      {
        previewFailed: ke,
        previewNonce: ve,
        markPreviewFailed: Te,
        retryPreview: Ne,
        handleDownload: me,
        handleFullscreen: Ae
      } = yEe({
        node: e,
        resultUrl: B,
        mediaType: "image",
        onDownloadSelected: _,
        setLightboxItem: b,
        setLightboxOpen: v
      }),
      Fe = g.useCallback(Ye => {
        if (Ye === "huya-volc" && !y) return;
        const Ce = {
          ...ne.current
        };
        a(e.id, {
          nodeName: "去除背景",
          settings: {
            ...Ce,
            rembgProvider: Ye,
            ...(Ye === "huya-volc" ? {
              rembgCropToBbox: !1
            } : {})
          }
        }), V(!1);
      }, [e.id, y, a]),
      Me = g.useCallback(async () => {
        var Ze, Ge;
        if (!ye) {
          P("请先连接一张图片");
          return;
        }
        const Ye = syn((Ze = ne.current) == null ? void 0 : Ze.rembgProvider),
          Ce = Ye === "huya-volc" && !y ? "fal" : Ye,
          He = Ce === "huya-volc",
          Ve = String(l || "").trim();
        if (!He && !Ve) {
          P("请先在 API 设置中填写 Key");
          return;
        }
        P(null), S(!1), k(!0), a(e.id, {
          isGenerating: !0,
          errorMsg: ""
        });
        const it = Date.now(),
          It = d ? s() : "",
          Ft = He ? "火山主体分割" : Z ? "去除背景（裁切到主体）" : "去除背景",
          We = He ? "海艺 / 火山主体分割" : "Fal / imageutils/rembg";
        if (d && It) {
          const Oe = {
            id: It,
            url: "",
            type: "image",
            prompt: Ft,
            time: new Date().toLocaleTimeString(),
            status: "generating",
            progress: 5,
            modelName: We,
            sourceNodeId: e.id,
            startTime: it
          };
          d(st => [Oe, ...(ua() ? st : st.slice(0, 99))]);
        }
        try {
          const Oe = !!((Ge = e.settings) != null && Ge.genUseAliyunOss) || ua(),
            {
              resolveConnectedInputOriginalUrlAsync: st
            } = await Ie(async () => {
              const {
                resolveConnectedInputOriginalUrlAsync: Yt
              } = await Promise.resolve().then(() => ii);
              return {
                resolveConnectedInputOriginalUrlAsync: Yt
              };
            }, void 0, import.meta.url);
          let vt = await st(e.id, ye, n, t, {
            assetId: ie,
            mediaType: "image"
          });
          if (!vt) throw new Error("无法读取输入原图");
          if (Oe) {
            const {
              resolveGenReferenceUrlsForApi: Yt
            } = await Ie(async () => {
              const {
                resolveGenReferenceUrlsForApi: qe
              } = await Promise.resolve().then(() => Mc);
              return {
                resolveGenReferenceUrlsForApi: qe
              };
            }, void 0, import.meta.url);
            [vt] = await Yt([vt], {
              useOss: !0,
              metaByIndex: [{
                type: "image",
                assetId: ie
              }]
            });
          } else !He && !vt.startsWith("data:image/") && !R2(vt) && (vt.startsWith("blob:") || vs(vt)) && (vt = await vwo(vt));
          const Ht = Yt => {
              d && It && d(qe => qe.map(kt => kt.id === It ? {
                ...kt,
                progress: Yt
              } : kt));
            },
            nn = He ? await mwo({
              imageUrl: vt,
              globalApiKeyFallback: Ve,
              assetId: R2(vt) ? void 0 : ie,
              onProgress: Ht
            }) : await lMn({
              falPrefix: Po(vZ(localStorage.getItem(B5e) || Zue)),
              apiKey: Ve,
              imageUrl: vt,
              syncMode: !1,
              cropToBbox: Z,
              onProgress: Ht
            }),
            pt = It || `rembg_${s()}`,
            lt = await xT([nn], pt, !1);
          let gt = `rembg_${s()}`,
            Ut = nn,
            _t = {};
          lt ? (Ut = lt.displayUrls[0] || lt.remoteUrls[0] || nn, _t = _T(lt, {
            type: "image"
          })) : Ut = await sk(nn, gt, void 0, {
            usePreviewQuality: !0
          });
          let At;
          try {
            const Yt = await new Promise(qe => {
              const kt = new Image();
              kt.onload = () => {
                kt.naturalWidth > 0 && kt.naturalHeight > 0 ? qe({
                  w: kt.naturalWidth,
                  h: kt.naturalHeight
                }) : qe(null);
              }, kt.onerror = () => qe(null), kt.src = nn;
            });
            Yt && !nl(Yt.w, Yt.h) ? (At = Yct(Yt.w, Yt.h), ge(Yt.w, Yt.h)) : Yt && ge(Yt.w, Yt.h);
          } catch {}
          if (a(e.id, {
            content: Ut,
            _contentAssetId: lt ? void 0 : gt,
            isGenerating: !1,
            errorMsg: "",
            settings: {
              ...(e.settings || {}),
              rembgProvider: Ce,
              rembgCropToBbox: He ? !1 : Z,
              rembgModelName: We,
              ...((lt == null ? void 0 : lt.ossSettings) || {}),
              ...(At ? {
                previewActualSize: At,
                previewSize: At,
                hasCustomSize: void 0
              } : {}),
              ...(lt ? {
                generatedImages: [{
                  id: pt,
                  thumbUrl: Ut,
                  fullUrl: lt.remoteUrls[0] || Ut,
                  createdAt: Date.now()
                }]
              } : {})
            }
          }), d && It) {
            const Yt = Date.now();
            d(qe => qe.map(kt => kt.id === It ? {
              ...kt,
              url: nn,
              prompt: Ft,
              status: "completed",
              progress: 100,
              durationMs: Math.max(0, Yt - it),
              generationTime: `${((Yt - it) / 1e3).toFixed(1)}s`,
              errorMsg: "",
              _assetId: lt ? kt._assetId : gt,
              ..._t
            } : kt));
          }
          !lt && It && Ie(async () => {
            const {
              scheduleHistoryOssAutoUpload: Yt
            } = await Promise.resolve().then(() => qh);
            return {
              scheduleHistoryOssAutoUpload: Yt
            };
          }, void 0, import.meta.url).then(({
            scheduleHistoryOssAutoUpload: Yt
          }) => Yt(It, [gt])).catch(() => {});
        } catch (Oe) {
          const st = Oe instanceof Error ? Oe.message : "去除背景失败";
          P(st), a(e.id, {
            isGenerating: !1,
            errorMsg: st
          }), d && It && d(vt => vt.map(Ht => Ht.id === It ? {
            ...Ht,
            status: "failed",
            progress: 0,
            errorMsg: st
          } : Ht));
        } finally {
          k(!1), hu(e.id, !1);
        }
      }, [ge, ie, n, Z, s, l, ye, e.id, e.settings, t, d, y, a]),
      Re = `text-xs shrink-0 w-[4.5rem] ${r ? "text-white/70" : "text-zinc-500"}`,
      $e = r ? "bg-white text-black border-white" : "bg-zinc-900 text-white border-zinc-900",
      rt = r ? "border-white/20 text-white/90 hover:bg-white/5" : "border-zinc-300 text-zinc-800 hover:bg-zinc-50",
      nt = !!ye && !w,
      ze = g.useCallback(() => {
        if (H || !K) return null;
        const Ye = $g(Q);
        return c.jsxs("label", {
          className: `sketch-chat-web-chip${r ? " sketch-chat-web-chip--dark" : ""}`,
          onMouseDown: Ce => Ce.stopPropagation(),
          title: Jk(Q),
          children: [c.jsx("input", {
            type: "checkbox",
            checked: D,
            onChange: Ce => {
              const He = Ce.target.checked;
              U(He);
              const Ve = {
                ...ne.current
              };
              a(e.id, {
                settings: {
                  ...Ve,
                  genUseAliyunOss: He
                }
              });
            },
            className: "h-3 w-3 cursor-pointer"
          }), c.jsx("span", {
            className: "whitespace-nowrap",
            title: x(Ye),
            children: x(Ye)
          })]
        });
      }, [H, K, Q, D, r, e.id, a]),
      Le = Ye => {
        if (Ye.button !== 0 || Ye.ctrlKey || Ye.metaKey) return;
        const Ce = Ye.clientX,
          He = Ye.clientY;
        let Ve = !0;
        const it = Ft => {
            Math.hypot(Ft.clientX - Ce, Ft.clientY - He) > 8 && (Ve = !1);
          },
          It = Ft => {
            window.removeEventListener("pointermove", it), window.removeEventListener("pointerup", It), window.removeEventListener("pointercancel", It), Ve && (Math.hypot(Ft.clientX - Ce, Ft.clientY - He) > 8 || Ee());
          };
        window.addEventListener("pointermove", it), window.addEventListener("pointerup", It), window.addEventListener("pointercancel", It);
      };
    return c.jsxs("div", {
      ref: de,
      className: "relative w-full h-full overflow-visible",
      children: [ae && B ? c.jsx(g$t, {
        node: e,
        isSelected: ae,
        isDark: r,
        canvasZoomMediaOpacity: _e,
        onDownload: me,
        onFullscreen: Ae
      }) : null, c.jsxs("div", {
        "data-fal-rembg-preview": !0,
        className: `relative w-full h-full rounded-2xl overflow-hidden border cursor-pointer ${Sp(r)}`,
        onPointerDown: Le,
        children: [B ? c.jsx("div", {
          className: "flex h-full w-full min-h-0 min-w-0 items-center justify-center overflow-hidden",
          children: c.jsx("img", {
            src: B,
            alt: x("去除背景结果"),
            className: "max-h-full max-w-full object-contain",
            draggable: !1,
            ...Yg(!1),
            onError: Te,
            onLoad: Ye => {
              var We;
              const Ce = Ye.currentTarget,
                He = vU(Ce.src),
                Ve = (He == null ? void 0 : He.width) || Ce.naturalWidth,
                it = (He == null ? void 0 : He.height) || Ce.naturalHeight;
              if (!(Ve > 0 && it > 0)) return;
              const It = !He && nl(Ve, it);
              if (ge(Ve, it), It) return;
              const Ft = Hs((We = e.settings) == null ? void 0 : We.previewActualSize);
              Ft && !nl(Ft.w, Ft.h) || a(e.id, {
                settings: {
                  ...(e.settings || {}),
                  previewActualSize: Yct(Ve, it),
                  previewSize: Yct(Ve, it),
                  hasCustomSize: void 0
                }
              });
            }
          }, `${B}:${ve}`)
        }) : c.jsxs("div", {
          className: `absolute inset-0 flex flex-col items-center justify-center gap-2 px-3 text-center text-xs ${r ? "text-white/55" : "text-zinc-500"}`,
          children: [c.jsx(lo, {
            size: 22,
            className: "opacity-70"
          }), c.jsx("span", {
            children: b$t("image", !!ye)
          })]
        }), M && c.jsx("div", {
          "data-compact-gen-progress-layer": !0,
          className: `absolute inset-0 z-[60] overflow-hidden pointer-events-none transition-opacity duration-400 ease-out ${A && !w ? "opacity-0" : "opacity-100"}`,
          onTransitionEnd: Ye => {
            Ye.propertyName === "opacity" && Ye.target === Ye.currentTarget && A && !w && S(!1);
          },
          "aria-hidden": !0,
          children: c.jsx(Yv, {
            seed: e.id,
            progressFillRef: C,
            progressThinBarRef: I,
            isDark: r
          })
        }), ke && B ? c.jsx(y$t, {
          isDark: r,
          onRetry: Ne
        }) : null, T ? c.jsx("div", {
          className: "absolute bottom-2 left-2 right-2 z-20 rounded-lg bg-black/55 px-2 py-1 text-[11px] text-red-300",
          children: T
        }) : null]
      }), c.jsx("div", {
        ref: le,
        "data-gen-prompt-panel": "true",
        className: N ? wD : "hidden",
        style: {
          width: `min(${lyn}px, 90vw)`,
          maxWidth: `min(${lyn}px, 90vw)`,
          boxSizing: "border-box",
          ...ue.style
        },
        onMouseDown: Ye => {
          Ye.stopPropagation(), zb(e.id, h, p, 500, {
            forceSingle: !0
          });
        },
        children: c.jsxs("div", {
          ref: J,
          className: `rounded-2xl border p-3 ${r ? "border-white/15 bg-[#1f1f1f] text-white" : "border-zinc-200 bg-white text-zinc-900"}`,
          style: {
            transition: "none",
            width: "100%"
          },
          children: [c.jsxs("div", {
            className: "mb-3 flex items-center gap-2",
            children: [c.jsx("span", {
              className: `inline-flex h-8 items-center rounded-md border px-3 text-xs font-medium ${r ? "border-white/20 bg-[#121212] text-white" : "border-zinc-300 bg-white text-zinc-900"}`,
              children: gwo(we)
            }), c.jsx("div", {
              className: `h-8 w-8 shrink-0 overflow-hidden rounded-md border ${r ? "border-white/15 bg-black/30" : "border-zinc-200 bg-zinc-50"}`,
              children: R ? c.jsx("img", {
                src: R,
                alt: x("输入"),
                className: "h-full w-full object-cover",
                draggable: !1
              }) : c.jsx("div", {
                className: "flex h-full w-full items-center justify-center opacity-40",
                children: c.jsx(lo, {
                  size: 12
                })
              })
            })]
          }), c.jsxs("div", {
            className: "space-y-2.5",
            children: [c.jsxs("div", {
              className: "relative flex items-center gap-2",
              children: [c.jsx("span", {
                className: Re,
                children: x("模型选择")
              }), c.jsxs("button", {
                type: "button",
                className: `h-9 flex-1 rounded-lg border px-3 flex items-center justify-between text-sm ${r ? "border-white/20 bg-[#1f1f1f]" : "border-zinc-300 bg-white"}`,
                onClick: Ye => {
                  Ye.stopPropagation(), V(Ce => !Ce);
                },
                children: [c.jsx("span", {
                  children: fwo(we)
                }), c.jsx(Mi, {
                  size: 14,
                  className: "opacity-40"
                })]
              }), z ? c.jsx("div", {
                className: `absolute left-[4.5rem] right-0 top-[calc(100%+4px)] z-20 overflow-hidden rounded-lg border py-1 shadow-lg ${r ? "border-white/15 bg-[#1f1f1f] text-white" : "border-zinc-200 bg-white text-zinc-900"}`,
                onMouseDown: Ye => Ye.stopPropagation(),
                children: re.map(Ye => c.jsx("button", {
                  type: "button",
                  className: `flex w-full items-center px-3 py-2 text-left text-sm transition-colors ${we === Ye.id ? r ? "bg-white/10" : "bg-zinc-100" : r ? "hover:bg-white/5" : "hover:bg-zinc-50"}`,
                  onClick: () => Fe(Ye.id),
                  children: x(Ye.label)
                }, Ye.id))
              }) : null]
            }), X ? null : c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx("span", {
                className: Re,
                children: x("输出方式")
              }), c.jsx("div", {
                className: "flex flex-1 gap-2",
                children: ywo.map(Ye => c.jsx("button", {
                  type: "button",
                  className: `flex-1 h-8 rounded-lg text-sm border transition-colors ${Z === Ye.value ? $e : rt}`,
                  onClick: () => a(e.id, {
                    settings: {
                      ...e.settings,
                      rembgCropToBbox: Ye.value
                    }
                  }),
                  children: x(Ye.label)
                }, String(Ye.value)))
              })]
            })]
          }), T ? c.jsx("div", {
            className: "mt-2 text-[11px] text-red-400",
            children: T
          }) : null, c.jsxs("div", {
            className: "mt-3 flex items-center justify-end gap-2",
            children: [ze(), c.jsx("button", {
              type: "button",
              disabled: !nt,
              title: x(X ? "开始火山主体分割" : "开始去除背景"),
              "aria-label": x(X ? "开始火山主体分割" : "开始去除背景"),
              onClick: Ye => {
                Ye.stopPropagation(), Me();
              },
              className: `flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-opacity active:scale-95 ${nt ? "bg-white text-black hover:opacity-90" : r ? "cursor-not-allowed bg-white/25 text-black/40" : "cursor-not-allowed bg-zinc-300 text-zinc-500"}`,
              children: w ? c.jsx(Ua, {
                size: 16,
                className: "animate-spin",
                strokeWidth: 2.5
              }) : c.jsx(Gc, {
                size: 16,
                strokeWidth: 2.5
              })
            })]
          })]
        })
      })]
    });
  },
  A$t = ({
    size: e = 18,
    className: t,
    strokeWidth: n = 1.75
  }) => c.jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: e,
    height: e,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: n,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: t,
    "aria-hidden": !0,
    children: [c.jsx("path", {
      d: "M4.5 9.5 12 5.5l7.5 4v8L12 21.5l-7.5-4v-8Z"
    }), c.jsx("path", {
      d: "M4.5 9.5 12 13.5 19.5 9.5"
    }), c.jsx("path", {
      d: "M12 13.5V21.5"
    }), c.jsx("path", {
      d: "M13.8 3.6c1.7.15 3.2 1.15 3.95 2.7"
    }), c.jsx("path", {
      d: "m16.55 4.55 1.35 2.05-2.2.55"
    })]
  }),
  xwo = 52;

function _wo({
  node: e,
  isSelected: t,
  isDark: n,
  canvasZoomMediaOpacity: r,
  isAnglePanelOpen: a,
  onToggleAngle: i,
  isCropSelectMode: o,
  onToggleCrop: s,
  onEditImage: l,
  onHdUpscale: d,
  onReplace: u,
  onDownload: h,
  onFullscreen: p,
  onSmartEdit: m,
  onRembg: f,
  isHighlighted: y,
  onToggleHighlight: b
}) {
  on();
  const v = g.useRef(null),
    _ = g.useRef(null),
    [w, k] = g.useState(!1);
  Qp(v, "50% 100%", !0);
  const A = (I = !1, E = "") => $P(n, I, E),
    S = (I = !1) => `flex w-full items-center gap-2 whitespace-nowrap px-3.5 py-2 text-left text-xs transition-colors ${I ? n ? "bg-white/10 text-white" : "bg-zinc-100 text-zinc-900" : n ? "text-zinc-100 hover:bg-white/10" : "text-zinc-800 hover:bg-zinc-100"}`,
    C = w || y;
  return c.jsx("div", {
    className: "absolute left-1/2 bottom-full z-[120] -translate-x-1/2 transition-opacity duration-200 ease-out",
    "data-image-result-toolbar": "",
    "data-input-image-toolbar": "",
    onDoubleClick: I => {
      I.preventDefault(), I.stopPropagation();
    },
    style: {
      marginBottom: `${xwo}px`,
      opacity: r,
      pointerEvents: t ? "auto" : "none"
    },
    children: c.jsx("div", {
      ref: v,
      style: {
        transition: "none",
        willChange: "transform"
      },
      children: c.jsx("div", {
        className: `transition-all duration-150 ${t ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-1 scale-[0.98] pointer-events-none"}`,
        onClick: I => I.stopPropagation(),
        onPointerDown: I => I.stopPropagation(),
        onMouseDown: I => I.stopPropagation(),
        children: c.jsx("div", {
          "data-canvas-pin-toolbar": "",
          "data-canvas-float-toolbar": "",
          className: UP(n),
          children: c.jsxs("div", {
            className: "flex items-center",
            children: [c.jsx("button", {
              type: "button",
              className: A(a),
              "data-toolbar-active": a ? "true" : "false",
              onClick: I => {
                I.stopPropagation(), k(!1), i();
              },
              "data-tip": x(a ? "关闭角度面板" : "角度调整"),
              children: c.jsx(A$t, {
                size: 16
              })
            }), c.jsx("button", {
              type: "button",
              className: A(o),
              "data-toolbar-active": o ? "true" : "false",
              onClick: I => {
                I.stopPropagation(), k(!1), s();
              },
              "data-tip": x(o ? "退出框选" : "框选裁剪区域"),
              children: c.jsx(Sf, {
                size: 16
              })
            }), c.jsx("button", {
              type: "button",
              className: A(),
              onClick: I => {
                I.stopPropagation(), k(!1), l();
              },
              "data-tip": x("改图"),
              children: c.jsx(EP, {
                size: 16
              })
            }), c.jsxs("div", {
              className: "relative flex items-center",
              children: [c.jsx("button", {
                ref: _,
                type: "button",
                className: `relative ${A(C, C ? "!text-white" : "")}`,
                "data-toolbar-active": C ? "true" : "false",
                onClick: I => {
                  I.stopPropagation(), k(E => !E);
                },
                "data-tip": x("工具"),
                children: c.jsx(hw, {
                  size: 16
                })
              }), c.jsxs(yg, {
                open: w,
                anchorRef: _,
                isDark: n,
                placement: "below",
                align: "center",
                gap: 6,
                dataPortalAttr: "data-image-result-tools-menu",
                minWidth: 136,
                className: "inline-flex w-max flex-col py-1.5",
                zIndex: 10200,
                children: [c.jsxs("button", {
                  type: "button",
                  className: S(!1),
                  onClick: () => {
                    k(!1), m();
                  },
                  children: [c.jsx(SP, {
                    size: 14,
                    className: "shrink-0"
                  }), c.jsx("span", {
                    children: x("智能改图")
                  })]
                }), c.jsxs("button", {
                  type: "button",
                  className: S(!1),
                  onClick: () => {
                    k(!1), f();
                  },
                  children: [c.jsx(GK, {
                    size: 14,
                    className: "shrink-0"
                  }), c.jsx("span", {
                    children: x("去除背景")
                  })]
                }), c.jsxs("button", {
                  type: "button",
                  className: S(y),
                  onClick: () => {
                    k(!1), b();
                  },
                  children: [c.jsx(pEt, {
                    size: 14,
                    className: "shrink-0"
                  }), c.jsx("span", {
                    children: x(y ? "取消高亮" : "高亮显示")
                  })]
                })]
              })]
            }), c.jsx("button", {
              type: "button",
              className: A(),
              onClick: I => {
                I.stopPropagation(), k(!1), d();
              },
              "data-tip": x("高清放大"),
              children: c.jsx("span", {
                className: "text-xs font-semibold",
                children: "HD"
              })
            }), c.jsx("div", {
              "data-toolbar-divider": "",
              className: fpe(n)
            }), UD(e) && c.jsx($D, {
              nodeIds: [e.id],
              pins: Zg(e),
              isDark: n,
              size: "compact"
            }), c.jsx("button", {
              type: "button",
              className: A(),
              onClick: I => {
                I.stopPropagation(), k(!1), u();
              },
              "data-tip": x("替换"),
              children: c.jsx(mu, {
                size: 16
              })
            }), c.jsx("button", {
              type: "button",
              className: A(),
              onClick: I => {
                I.stopPropagation(), k(!1), h(I);
              },
              "data-tip": x("下载"),
              children: c.jsx(ws, {
                size: 16
              })
            }), c.jsx("button", {
              type: "button",
              className: A(),
              onClick: I => {
                I.stopPropagation(), k(!1), p(I);
              },
              "data-tip": x("全屏"),
              children: c.jsx(kT, {
                size: 16
              })
            })]
          })
        })
      })
    })
  });
}

const cyn = 440;

async function kwo(e) {
  const t = await fetch(e).then(n => {
    if (!n.ok) throw new Error("无法读取本地图片");
    return n.blob();
  });
  return await new Promise((n, r) => {
    const a = new FileReader();
    a.onload = () => n(String(a.result || "")), a.onerror = () => r(new Error("本地图片转 Base64 失败")), a.readAsDataURL(t);
  });
}

function dyn(e) {
  return new Promise((t, n) => {
    const r = new FileReader();
    r.onload = () => t(String(r.result || "")), r.onerror = () => n(new Error("图片读取失败")), r.readAsDataURL(e);
  });
}

function Awo(e, t, n) {
  const r = new Map(n.map(i => [i.id, i])),
    a = [];
  for (const i of t.filter(o => o.to === e)) {
    const o = r.get(i.from),
      s = o == null ? void 0 : o.content;
    if (!(typeof s != "string" || !s.trim())) {
      if ((o == null ? void 0 : o.type) === "input-image") {
        if ($o(s)) continue;
        a.push(s);
        continue;
      }
      if ((o == null ? void 0 : o.type) === "preview" && o.previewType === "image") {
        a.push(s);
        continue;
      }
      ((o == null ? void 0 : o.type) === "gen-image" || (o == null ? void 0 : o.type) === "fal-rembg" || (o == null ? void 0 : o.type) === "topaz-upscale" || (o == null ? void 0 : o.type) === "jimeng-super-resolution" || (o == null ? void 0 : o.type) === "virtual-try-on") && a.push(s);
    }
  }
  return a;
}

const Swo = {
    rotation: rue.yaw,
    tilt: rue.pitch,
    scale: 1,
    isActive: !1,
    viewMode: "subject",
    angleProtocol: "wavespeed-v1"
  },
  Iwo = ({
    node: e,
    nodes: t,
    connections: n,
    isDark: r,
    updateNode: a,
    setNodes: i,
    setConnections: o,
    generateId: s,
    globalApiKey: l = "",
    setHistory: d,
    selectedNodeId: u = null,
    setSelectedNodeId: h,
    setSelectedNodeIds: p,
    onGenPromptPanelUiChange: m,
    enableGenerationNodeAnimation: f = !0,
    setLightboxItem: y,
    setLightboxOpen: b,
    onDownloadSelected: v
  }) => {
    var ln, Pn, rn, Yn, Ct, Cn, un, Jn, Kn, en, Vn;
    on();
    const [_, w] = g.useState(() => !!e.isGenerating),
      [k, A] = g.useState(!1),
      S = g.useRef(null),
      C = g.useRef(null),
      I = g.useRef(!!e.isGenerating),
      E = _ || k,
      [M, T] = g.useState(null),
      [P, R] = g.useState(!1),
      [j, B] = g.useState(!1),
      [F, N] = g.useState(() => Cd().zoom || 1),
      [G, z] = g.useState(() => {
        var Tt;
        return !!((Tt = e.settings) != null && Tt.genUseAliyunOss);
      }),
      [V, O] = g.useState(() => ua()),
      [L, D] = g.useState(() => Ph()),
      [U, H] = g.useState(() => mo()),
      Y = g.useRef(e.settings),
      K = g.useRef(null),
      W = g.useRef(null),
      Q = g.useRef(null),
      q = g.useRef(0),
      [ne, de] = g.useState(!1),
      [le, J] = g.useState(!1);
    g.useEffect(() => {
      Y.current = e.settings;
    }, [e.settings]), g.useEffect(() => {
      _ && hu(e.id, !0);
    }, [_, e.id]), g.useEffect(() => {
      _ || al.getNodeSnapshot(e.id).status !== "generating" && Px(e.id) && hu(e.id, !1);
    }, [_, e.id]), g.useEffect(() => {
      I.current && !_ && A(!0), I.current = _;
    }, [_]), g.useEffect(() => {
      if (!k) return;
      const Tt = window.setTimeout(() => A(!1), 450);
      return () => window.clearTimeout(Tt);
    }, [k]), g.useEffect(() => {
      var Tt;
      z(!!((Tt = e.settings) != null && Tt.genUseAliyunOss));
    }, [e.id, (ln = e.settings) == null ? void 0 : ln.genUseAliyunOss]), g.useEffect(() => {
      const Tt = () => {
        O(ua()), D(Ph()), H(mo());
      };
      return Tt(), window.addEventListener(go, Tt), () => window.removeEventListener(go, Tt);
    }, []), g.useEffect(() => {
      if (L || V || !G) return;
      z(!1);
      const Tt = {
        ...Y.current
      };
      Tt.genUseAliyunOss && a(e.id, {
        settings: {
          ...Tt,
          genUseAliyunOss: !1
        }
      });
    }, [L, V, G, e.id, a]);
    const pe = String(((Pn = e.settings) == null ? void 0 : Pn.virtualTryOnPersonImageUrl) || "").trim(),
      ce = NU((rn = e.settings) == null ? void 0 : rn.virtualTryOnGarmentImageUrls, gM),
      we = String(((Yn = e.settings) == null ? void 0 : Yn.virtualTryOnProductImageUrl) || "").trim(),
      X = yIe((Ct = e.settings) == null ? void 0 : Ct.virtualTryOnMode),
      Z = wKe(X),
      re = xKe(X),
      fe = qPt(String(((Cn = e.settings) == null ? void 0 : Cn.model) || "")),
      ye = mIe(fe),
      ie = Z || re || ye,
      ae = X === "try-on",
      be = kKe((un = e.settings) == null ? void 0 : un.virtualTryOnNumImages),
      Ee = String(((Jn = e.settings) == null ? void 0 : Jn.virtualTryOnAspectRatio) || "Auto"),
      xe = wX((Kn = e.settings) == null ? void 0 : Kn.virtualTryOnSeed),
      he = g.useMemo(() => Awo(e.id, n, t), [e.id, n, t]),
      ue = pe || he[0] || "",
      ge = he.filter(Tt => Tt !== ue),
      _e = g.useMemo(() => {
        const Ue = [...(ce.length ? ce : we ? [we] : [])];
        for (const et of ge) if (!Ue.includes(et) && (Ue.push(et), Ue.length >= gM)) break;
        return Ue.slice(0, ie ? gM : 1);
      }, [we, ge, ie, ce]),
      ke = _e[0] || "",
      ve = [ue, ..._e].filter(Boolean),
      me = !_ && (Z ? ve.length >= 1 : !!ue && !!ke),
      Ae = typeof e.content == "string" ? e.content.trim() : "",
      [Fe, Me] = g.useState(null),
      Re = u === e.id;
    g.useEffect(() => {
      if (!Ae) {
        Me(null);
        return;
      }
      let Tt = !1;
      return (async () => {
        let Ue = Ae;
        try {
          if (Ue.startsWith("content_ref:")) {
            await Er.init();
            const et = await Er.get(Er.extractId(Ue));
            et && (Ue = et);
          }
        } catch {}
        Tt || Me(Ue);
      })(), () => {
        Tt = !0;
      };
    }, [Ae]);
    const $e = g.useRef(null),
      rt = g.useRef(null),
      nt = g.useRef(null),
      ze = g.useRef(!1);
    ze.current = P;
    const Le = g.useCallback(() => {
        zb(e.id, h, p, 500, {
          forceSingle: !0
        }), Dd(e.id, !0), m == null || m(e.id, !0), R(!0);
      }, [e.id, m, h, p]),
      Ke = g.useCallback(() => {
        R(!1), Dd(e.id, !1), m == null || m(e.id, !1);
      }, [e.id, m]),
      Xe = g.useRef(!1);
    g.useEffect(() => {
      Re && !Xe.current ? Le() : !Re && ze.current && Ke(), Xe.current = Re;
    }, [Re]), g.useEffect(() => () => {
      Dd(e.id, !1), m == null || m(e.id, !1);
    }, [e.id, m]), g.useEffect(() => (N(Cd().zoom || 1), dw(Tt => {
      N(Tt.zoom || 1);
    })), []), g.useEffect(() => {
      if (!P) return;
      const Tt = Ue => {
        var ft, ht;
        const et = Ue.target;
        et && ((ft = $e.current) != null && ft.contains(et) || (ht = rt.current) != null && ht.contains(et) || Ke());
      };
      return window.addEventListener("mousedown", Tt, !0), () => window.removeEventListener("mousedown", Tt, !0);
    }, [P, Ke]);
    const De = yI({
      hostRef: rt,
      open: P,
      zoom: F,
      remeasureKey: `${P}`,
      stabilizeNodeId: e.id
    });
    Qp(nt, "50% 0%", P);
    const Ye = g.useCallback((Tt, Ue) => {
        !(Tt > 0) || !(Ue > 0) || l5({
          nodeId: e.id,
          mw: Tt,
          mh: Ue,
          setNodes: i,
          currentWidth: e.width,
          currentHeight: e.height,
          hasCustomSize: !1,
          actualSizeLabel: {
            w: Tt,
            h: Ue
          }
        });
      }, [e.height, e.id, e.width, i]),
      Ce = Tt => {
        a(e.id, {
          settings: {
            ...(Y.current || {}),
            ...Tt
          }
        });
      },
      He = y9(F),
      {
        handleDownload: Ve,
        handleFullscreen: it
      } = yEe({
        node: e,
        resultUrl: Fe,
        mediaType: "image",
        onDownloadSelected: v,
        setLightboxItem: y,
        setLightboxOpen: b
      }),
      It = g.useMemo(() => {
        var Tt;
        return aEe(((Tt = e.settings) == null ? void 0 : Tt.multiAngle) || Swo);
      }, [e.settings]),
      Ft = !!((en = e.settings) != null && en.highlighted),
      We = g.useCallback(Tt => {
        Tt !== "angle" && de(!1), Tt !== "crop" && J(!1);
      }, []),
      Ze = g.useCallback(() => {
        de(Tt => {
          const Ue = !Tt;
          return Ue && (We("angle"), Ke()), Ue;
        });
      }, [Ke, We]),
      Ge = g.useCallback(() => {
        J(Tt => {
          const Ue = !Tt;
          return Ue && (We("crop"), Ke()), Ue;
        });
      }, [Ke, We]),
      Oe = g.useCallback(Tt => {
        if (!o) return;
        const Ue = s(),
          et = s(),
          ft = n.filter(jt => jt.from === e.id && (!jt.inputType || jt.inputType === "default")).length,
          ht = e.x + e.width + 80,
          wt = e.y + ft * 48;
        i(jt => {
          const bt = Ki(Ue, "gen-image", ht, wt, void 0, void 0, jt);
          return [...jt, {
            ...bt,
            settings: i7(bt.settings, {
              multiAngle: {
                ...Tt,
                isActive: !0
              }
            })
          }];
        }), o(jt => [...jt, {
          id: et,
          from: e.id,
          to: Ue
        }]), v5(Ue), h == null || h(Ue);
      }, [n, s, e.id, e.width, e.x, e.y, o, i, h]),
      st = g.useCallback(Tt => {
        const Ue = {
          ...Tt,
          isActive: !1
        };
        a(e.id, {
          settings: {
            ...(Y.current || {}),
            multiAngle: Ue
          }
        }), window.dispatchEvent(new CustomEvent("multiAngleUpdated", {
          detail: {
            nodeId: e.id,
            config: Ue
          }
        })), de(!1), queueMicrotask(() => Oe({
          ...Tt,
          isActive: !0
        }));
      }, [Oe, e.id, a]),
      vt = g.useCallback(() => {
        var ht;
        if (!o) return;
        const Tt = (ht = e.settings) == null ? void 0 : ht.cropSelection;
        if (!Tt || Tt.width < 8 || Tt.height < 8) return;
        const Ue = s(),
          et = s(),
          ft = {
            cropX: Math.round(Tt.x),
            cropY: Math.round(Tt.y),
            cropWidth: Math.round(Tt.width),
            cropHeight: Math.round(Tt.height)
          };
        i(wt => [...wt, Ki(Ue, "inpaint-crop", e.x + e.width + 80, e.y, void 0, ft, wt)]), o(wt => [...wt, {
          id: et,
          from: e.id,
          to: Ue
        }]), h == null || h(Ue), J(!1);
      }, [s, e.id, e.settings, e.width, e.x, e.y, o, i, h]),
      Ht = g.useCallback((Tt, Ue, et) => {
        if (!o) return;
        const ft = bt => !bt.inputType || bt.inputType === "default",
          ht = n.find(bt => {
            var Bt;
            return bt.from === e.id && ft(bt) && ((Bt = t.find(wn => wn.id === bt.to)) == null ? void 0 : Bt.type) === Tt;
          });
        if (ht) {
          const bt = t.find(wn => wn.id === ht.to),
            Bt = !!String((bt == null ? void 0 : bt.content) || "").trim();
          a(ht.to, {
            nodeName: Ue,
            settings: {
              ...((bt == null ? void 0 : bt.settings) || {}),
              ...et
            },
            ...(Bt ? {} : {
              width: 250,
              height: 250
            })
          }), p == null || p(new Set([ht.to])), h == null || h(ht.to);
          return;
        }
        const wt = s(),
          jt = Ki(wt, Tt, e.x + (e.width || 300) + 88, e.y, Ue, et, t);
        jt.width = 250, jt.height = 250, i(bt => [...bt, jt]), o(bt => [...bt, {
          id: s(),
          from: e.id,
          to: wt
        }]), p == null || p(new Set([wt])), h == null || h(wt);
      }, [n, s, e.id, e.width, e.x, e.y, t, o, i, h, p, a]),
      nn = g.useCallback(() => {
        Ht("topaz-upscale", "图片增强", {
          superResMode: "image",
          topazProvider: "Topazlabs",
          topazModel: "Standard V2",
          topazFactor: 2,
          topazFormat: "jpeg"
        });
      }, [Ht]),
      pt = g.useCallback(() => {
        Ht("fal-rembg", "去除背景", {
          rembgProvider: "fal",
          rembgCropToBbox: !1
        });
      }, [Ht]),
      lt = g.useCallback(() => {
        Ce({
          highlighted: !Ft
        });
      }, [Ft]),
      gt = g.useCallback(() => {
        var Tt;
        (Tt = Q.current) == null || Tt.click();
      }, []),
      Ut = async Tt => {
        if (!(!Tt || !Tt.type.startsWith("image/"))) try {
          const Ue = await dyn(Tt);
          a(e.id, {
            content: Ue
          }), Me(Ue), T(null);
        } catch (Ue) {
          T(Ue.message || "图片读取失败");
        }
      },
      _t = async (Tt, Ue) => {
        if (!(!Ue || !Ue.type.startsWith("image/"))) try {
          const et = await dyn(Ue);
          if (Tt === "person") Ce({
            virtualTryOnPersonImageUrl: et
          });else {
            const ft = [..._e];
            ft[Tt] = et;
            const ht = NU(ft, gM);
            Ce({
              virtualTryOnGarmentImageUrls: ht,
              virtualTryOnProductImageUrl: ht[0] || ""
            });
          }
          T(null);
        } catch (et) {
          T(et.message || "图片读取失败");
        }
      },
      At = async Tt => {
        var ht;
        const {
          resolveConnectedInputOriginalUrlAsync: Ue
        } = await Ie(async () => {
          const {
            resolveConnectedInputOriginalUrlAsync: wt
          } = await Promise.resolve().then(() => ii);
          return {
            resolveConnectedInputOriginalUrlAsync: wt
          };
        }, void 0, import.meta.url);
        let et = await Ue(e.id, Tt, n, t, {
          mediaType: "image"
        });
        if (!et) throw new Error("无法读取输入原图");
        if (!!((ht = Y.current) != null && ht.genUseAliyunOss) || ua()) {
          const {
            resolveGenReferenceUrlsForApi: wt
          } = await Ie(async () => {
            const {
              resolveGenReferenceUrlsForApi: jt
            } = await Promise.resolve().then(() => Mc);
            return {
              resolveGenReferenceUrlsForApi: jt
            };
          }, void 0, import.meta.url);
          [et] = await wt([et], {
            useOss: !0,
            metaByIndex: [{
              type: "image"
            }]
          });
        } else !et.startsWith("data:image/") && !R2(et) && (et.startsWith("blob:") || vs(et)) && (et = await kwo(et));
        return et;
      },
      Yt = g.useCallback(async () => {
        var wt;
        if (Z ? ve.length === 0 : !ue || _e.length === 0) {
          T(Z ? "请先提供至少 1 张参考图" : re ? "请先提供人物图和至少 1 张产品图" : ye ? "请先提供人物图和至少 1 张服装图" : "请先提供人物图和服装图");
          return;
        }
        const Tt = String(l || "").trim();
        if (!Tt) {
          T("请先在 API 设置中填写 Fal 渠道 Key");
          return;
        }
        T(null), A(!1), w(!0), a(e.id, {
          isGenerating: !0,
          errorMsg: ""
        });
        const Ue = Date.now(),
          et = d ? s() : "",
          ft = ((wt = e.prompt) == null ? void 0 : wt.trim()) || (Z ? "多图编辑" : re ? "手持产品" : "虚拟试穿"),
          ht = `Fal / ${_Ke(fe, X)}`;
        if (d && et) {
          const jt = {
            id: et,
            url: "",
            type: "image",
            prompt: ft,
            time: new Date().toLocaleTimeString(),
            status: "generating",
            progress: 5,
            modelName: ht,
            sourceNodeId: e.id,
            startTime: Ue
          };
          d(bt => [jt, ...(ua() ? bt : bt.slice(0, 99))]);
        }
        try {
          const jt = Z ? ve : [ue, ..._e],
            [bt, ...Bt] = await Promise.all(jt.map(Xt => At(Xt))),
            wn = await kTt({
              falPrefix: Po(vZ(localStorage.getItem(B5e) || Zue)),
              apiKey: Tt,
              modelId: fe,
              mode: X,
              personImageUrl: bt,
              garmentImageUrls: Bt,
              numImages: be,
              instruction: e.prompt,
              aspectRatio: Ee,
              seed: xe,
              onProgress: Xt => {
                d && et && d(Gn => Gn.map(rr => rr.id === et ? {
                  ...rr,
                  progress: Xt
                } : rr));
              }
            }),
            at = wn[0],
            Pt = et || `tryon_${s()}`,
            dt = await xT(wn, Pt, !1);
          let xt = `tryon_${s()}`,
            yn = at,
            gn = {};
          dt ? (yn = dt.displayUrls[0] || dt.remoteUrls[0] || at, gn = _T(dt, {
            type: "image"
          })) : yn = await sk(at, xt, void 0, {
            usePreviewQuality: !0
          });
          try {
            const Xt = await new Promise(Gn => {
              const rr = new Image();
              rr.onload = () => {
                rr.naturalWidth > 0 && rr.naturalHeight > 0 ? Gn({
                  w: rr.naturalWidth,
                  h: rr.naturalHeight
                }) : Gn(null);
              }, rr.onerror = () => Gn(null), rr.src = at;
            });
            (Xt && !nl(Xt.w, Xt.h) || Xt) && Ye(Xt.w, Xt.h);
          } catch {}
          const mt = wn.map((Xt, Gn) => ({
            id: `${Pt}_${Gn}`,
            thumbUrl: (dt == null ? void 0 : dt.displayUrls[Gn]) || Xt,
            fullUrl: (dt == null ? void 0 : dt.remoteUrls[Gn]) || Xt,
            createdAt: Date.now()
          }));
          if (a(e.id, {
            content: yn,
            _contentAssetId: dt ? void 0 : xt,
            isGenerating: !1,
            errorMsg: "",
            settings: {
              ...(e.settings || {}),
              model: fe,
              virtualTryOnMode: X,
              virtualTryOnNumImages: be,
              virtualTryOnGarmentImageUrls: _e,
              virtualTryOnAspectRatio: Ee,
              virtualTryOnSeed: xe,
              virtualTryOnModelName: ht,
              previewType: "image",
              ...((dt == null ? void 0 : dt.ossSettings) || {}),
              generatedImages: mt
            }
          }), d && et) {
            const Xt = Date.now();
            d(Gn => Gn.map(rr => rr.id === et ? {
              ...rr,
              url: at,
              prompt: ft,
              status: "completed",
              progress: 100,
              durationMs: Math.max(0, Xt - Ue),
              generationTime: `${((Xt - Ue) / 1e3).toFixed(1)}s`,
              errorMsg: "",
              _assetId: dt ? rr._assetId : xt,
              ...gn
            } : rr));
          }
          !dt && et && Ie(async () => {
            const {
              scheduleHistoryOssAutoUpload: Xt
            } = await Promise.resolve().then(() => qh);
            return {
              scheduleHistoryOssAutoUpload: Xt
            };
          }, void 0, import.meta.url).then(({
            scheduleHistoryOssAutoUpload: Xt
          }) => Xt(et, [xt])).catch(() => {});
        } catch (jt) {
          const bt = jt.message || (Z ? "多图编辑失败" : re ? "手持产品失败" : "虚拟试穿失败");
          T(bt), a(e.id, {
            isGenerating: !1,
            errorMsg: bt
          }), d && et && d(Bt => Bt.map(wn => wn.id === et ? {
            ...wn,
            status: "failed",
            progress: 100,
            errorMsg: bt
          } : wn));
        } finally {
          w(!1);
        }
      }, [Ye, Ee, n, X, fe, _e, s, l, ye, Z, re, e, t, be, ue, ve, xe, d, a]),
      qe = Tt => {
        if (Tt.button !== 0 || Tt.ctrlKey || Tt.metaKey) return;
        const Ue = Tt.clientX,
          et = Tt.clientY;
        let ft = !0;
        const ht = jt => {
            Math.hypot(jt.clientX - Ue, jt.clientY - et) > 8 && (ft = !1);
          },
          wt = jt => {
            window.removeEventListener("pointermove", ht), window.removeEventListener("pointerup", wt), window.removeEventListener("pointercancel", wt), ft && (Math.hypot(jt.clientX - Ue, jt.clientY - et) > 8 || Le());
          };
        window.addEventListener("pointermove", ht), window.addEventListener("pointerup", wt), window.addEventListener("pointercancel", wt);
      },
      kt = r ? "bg-white text-black border-white" : "bg-zinc-900 text-white border-zinc-900",
      St = r ? "border-white/20 text-white/90 hover:bg-white/5" : "border-zinc-300 text-zinc-800 hover:bg-zinc-50",
      hn = Tt => {
        var Ue;
        q.current = Tt, (Ue = W.current) == null || Ue.click();
      },
      Qt = (Tt, Ue, et, ft) => {
        const ht = !!Ue;
        return c.jsxs("button", {
          type: "button",
          onClick: wt => {
            var jt;
            wt.preventDefault(), wt.stopPropagation(), Tt === "person" ? (jt = K.current) == null || jt.click() : hn(Tt);
          },
          className: `rounded-xl border p-2.5 min-h-[96px] flex flex-col text-left transition-colors ${ht ? r ? "border-white/25 bg-white/[0.04] hover:bg-white/[0.07]" : "border-zinc-300 bg-zinc-50 hover:bg-zinc-100" : r ? "border-dashed border-white/20 bg-black/20 hover:bg-white/[0.04]" : "border-dashed border-zinc-300 bg-zinc-50/80 hover:bg-zinc-100"}`,
          children: [c.jsx("div", {
            className: `text-[10px] font-medium mb-1.5 ${r ? "text-white/55" : "text-zinc-500"}`,
            children: et
          }), ht ? c.jsx("img", {
            src: Ue,
            alt: et,
            className: "w-full h-14 object-cover rounded-lg pointer-events-none",
            draggable: !1
          }) : c.jsxs("div", {
            className: `flex-1 flex flex-col items-center justify-center gap-1 text-[11px] text-center px-1 ${r ? "text-white/40" : "text-zinc-400"}`,
            children: [Tt === "person" ? c.jsx(lo, {
              size: 18,
              className: "opacity-70"
            }) : c.jsx(VK, {
              size: 18,
              className: "opacity-70"
            }), c.jsx("span", {
              children: ft
            })]
          })]
        });
      },
      Ot = () => {
        if (V || !L) return null;
        const Tt = $g(U);
        return c.jsxs("label", {
          className: `sketch-chat-web-chip${r ? " sketch-chat-web-chip--dark" : ""}`,
          onMouseDown: Ue => Ue.stopPropagation(),
          title: Jk(U),
          children: [c.jsx("input", {
            type: "checkbox",
            checked: G,
            onChange: Ue => {
              const et = Ue.target.checked;
              z(et), Ce({
                genUseAliyunOss: et
              });
            },
            className: "h-3 w-3 cursor-pointer"
          }), c.jsx("span", {
            className: "whitespace-nowrap",
            title: x(Tt),
            children: x(Tt)
          })]
        });
      };
    return c.jsxs("div", {
      ref: $e,
      className: "relative w-full h-full overflow-visible",
      children: [c.jsx("input", {
        ref: K,
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange: Tt => {
          var et;
          const Ue = (et = Tt.target.files) == null ? void 0 : et[0];
          Tt.target.value = "", _t("person", Ue);
        }
      }), c.jsx("input", {
        ref: W,
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange: Tt => {
          var et;
          const Ue = (et = Tt.target.files) == null ? void 0 : et[0];
          Tt.target.value = "", _t(q.current, Ue);
        }
      }), c.jsx("input", {
        ref: Q,
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange: Tt => {
          var et;
          const Ue = (et = Tt.target.files) == null ? void 0 : et[0];
          Tt.target.value = "", Ut(Ue);
        }
      }), Re && Fe ? c.jsx(_wo, {
        node: e,
        isSelected: Re,
        isDark: r,
        canvasZoomMediaOpacity: He,
        isAnglePanelOpen: ne,
        onToggleAngle: Ze,
        isCropSelectMode: le,
        onToggleCrop: Ge,
        onEditImage: () => r$e(e),
        onHdUpscale: nn,
        onReplace: gt,
        onDownload: Ve,
        onFullscreen: it,
        onSmartEdit: () => r$e(e),
        onRembg: pt,
        isHighlighted: Ft,
        onToggleHighlight: lt
      }) : null, ne && Fe ? c.jsx("div", {
        "data-multi-angle-panel": !0,
        className: "nodrag nowheel pointer-events-auto absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2",
        onClick: Tt => Tt.stopPropagation(),
        onMouseDown: Tt => Tt.stopPropagation(),
        onPointerDown: Tt => Tt.stopPropagation(),
        children: c.jsx(Myr, {
          config: It,
          onConfigChange: Tt => Ce({
            multiAngle: Tt
          }),
          onConfirm: st,
          isDark: r,
          isVisible: Re,
          isOpen: ne,
          onClose: () => de(!1),
          previewImageUrl: Fe
        })
      }) : null, le && Fe ? c.jsx(zUt, {
        imageUrl: Fe,
        imageName: e.nodeName || "商品合图",
        selection: ((Vn = e.settings) == null ? void 0 : Vn.cropSelection) ?? null,
        onSelectionChange: Tt => Ce({
          cropSelection: Tt
        }),
        onClose: () => {
          const Tt = {
            ...(Y.current || {})
          };
          delete Tt.cropSelection, a(e.id, {
            settings: Tt
          }), J(!1);
        },
        onConfirmDownstreamInpaintCrop: vt,
        isDark: r
      }) : null, c.jsxs("div", {
        "data-virtual-try-on-preview": !0,
        className: `relative w-full h-full rounded-2xl overflow-hidden border cursor-pointer ${Sp(r)}`,
        onPointerDown: qe,
        children: [Fe ? c.jsx("div", {
          className: "flex h-full w-full min-h-0 min-w-0 items-center justify-center overflow-hidden",
          children: c.jsx("img", {
            src: Fe,
            alt: x("商品合图结果"),
            className: "max-h-full max-w-full object-contain",
            draggable: !1
          })
        }) : c.jsxs("div", {
          className: `absolute inset-0 flex flex-col items-center justify-center gap-2 px-3 text-center text-xs ${r ? "text-white/55" : "text-zinc-500"}`,
          children: [c.jsx(VK, {
            size: 22,
            className: "opacity-70"
          }), c.jsx("span", {
            children: x(Z ? "配置参数生成多图编辑图片" : re ? "配置参数生成手持产品图片" : "配置参数生成虚拟试穿图片")
          })]
        }), E && f && c.jsx("div", {
          "data-compact-gen-progress-layer": !0,
          className: `absolute inset-0 z-[60] overflow-hidden pointer-events-none transition-opacity duration-400 ease-out ${k && !_ ? "opacity-0" : "opacity-100"}`,
          onTransitionEnd: Tt => {
            Tt.propertyName === "opacity" && k && !_ && A(!1);
          },
          "aria-hidden": !0,
          children: c.jsx(Yv, {
            seed: e.id,
            progressFillRef: S,
            progressThinBarRef: C,
            isDark: r
          })
        }), e.errorMsg || M ? c.jsx("div", {
          className: "absolute bottom-2 left-2 right-2 z-20 rounded-lg bg-black/55 px-2 py-1 text-[11px] text-red-300",
          children: e.errorMsg || M
        }) : null]
      }), c.jsx("div", {
        ref: rt,
        "data-gen-prompt-panel": "true",
        className: P ? wD : "hidden",
        style: {
          width: `min(${cyn}px, 90vw)`,
          maxWidth: `min(${cyn}px, 90vw)`,
          boxSizing: "border-box",
          ...De.style
        },
        onMouseDown: Tt => {
          Tt.stopPropagation(), zb(e.id, h, p, 500, {
            forceSingle: !0
          });
        },
        children: c.jsxs("div", {
          ref: nt,
          className: `rounded-2xl border p-3 ${r ? "border-white/15 bg-[#1f1f1f] text-white" : "border-zinc-200 bg-white text-zinc-900"}`,
          style: {
            transition: "none",
            width: "100%"
          },
          children: [c.jsx("div", {
            className: "mb-3 flex items-start justify-between gap-2",
            children: c.jsxs("div", {
              className: "min-w-0",
              children: [c.jsx("div", {
                className: "flex flex-wrap items-center gap-1.5",
                children: WPt.map(Tt => c.jsx("button", {
                  type: "button",
                  title: x(Tt.title),
                  onClick: () => Ce({
                    virtualTryOnMode: Tt.id
                  }),
                  className: `inline-flex h-7 items-center rounded-md border px-2.5 text-xs font-medium transition-colors ${X === Tt.id ? kt : St}`,
                  children: x(Tt.label)
                }, Tt.id))
              }), c.jsx("p", {
                className: `mt-1.5 text-[11px] leading-relaxed ${r ? "text-white/45" : "text-zinc-500"}`,
                children: x(Z ? "用 1–4 张参考图，按自然语言做组合编辑" : re ? "把 1–3 件产品放到人物手里或身上" : ye ? "把 1–3 件服装或配饰，试穿到人物图上" : "把服装图，试穿到人物图上")
              })]
            })
          }), c.jsxs("div", {
            className: "grid grid-cols-2 gap-2",
            children: [Qt("person", ue, Z ? "① 参考图 1" : "① 人物图", "从左侧连入或点击上传"), Qt(0, _e[0] || "", Z ? "② 参考图 2" : re ? "② 产品 1" : ye ? "② 服装 1" : "② 服装图", Z ? "可选，点击上传或从左侧连入" : "点击上传或从左侧连入")]
          }), ie ? c.jsxs("div", {
            className: "mt-2 grid grid-cols-2 gap-2",
            children: [Qt(1, _e[1] || "", Z ? "③ 参考图 3" : re ? "③ 产品 2" : "③ 服装 2", "可选，点击上传"), Qt(2, _e[2] || "", Z ? "④ 参考图 4" : re ? "④ 产品 3" : "④ 服装 3", "可选，点击上传")]
          }) : null, c.jsx("textarea", {
            "data-scrollable": "true",
            value: e.prompt || "",
            onChange: Tt => a(e.id, {
              prompt: Tt.target.value
            }),
            placeholder: x(Z ? "编辑说明，例如：把图2的外套换到图1人物上，背景换成图3" : re ? "可选说明，例如：右手拿着罐子，logo 朝向镜头" : ye ? "可选说明，例如：外套叠穿在白 T 上，裤子替换牛仔裤，鞋子保持不变" : "可选说明"),
            className: `mt-2.5 w-full h-14 text-[10px] p-2.5 rounded-xl border outline-none resize-none overflow-y-auto rh-scroll-minimal custom-scrollbar placeholder:text-[9px] ${r ? "bg-black/20 border-white/15 text-white placeholder:text-white/20" : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400"}`,
            onMouseDown: Tt => Tt.stopPropagation()
          }), ae ? c.jsxs("div", {
            className: "mt-2.5 flex items-center gap-1.5",
            children: [c.jsx("div", {
              className: "flex gap-1 shrink-0",
              children: gLn.map(Tt => c.jsx("button", {
                type: "button",
                title: Tt.title,
                onClick: () => Ce({
                  model: Tt.id
                }),
                className: `h-7 px-2.5 rounded-md text-[11px] border transition-colors ${fe === Tt.id ? kt : St}`,
                children: x(Tt.label)
              }, Tt.id))
            }), ye ? null : c.jsxs(c.Fragment, {
              children: [c.jsx("div", {
                className: `w-px h-4 shrink-0 ${r ? "bg-white/15" : "bg-zinc-200"}`,
                "aria-hidden": !0
              }), c.jsx("div", {
                className: "flex flex-1 gap-1 min-w-0",
                children: pLn.map(Tt => c.jsxs("button", {
                  type: "button",
                  onClick: () => Ce({
                    virtualTryOnNumImages: Tt
                  }),
                  className: `flex-1 h-7 rounded-md text-[11px] border transition-colors ${be === Tt ? kt : St}`,
                  title: x("生成 {0} 张", Tt),
                  children: [Tt, x("张")]
                }, Tt))
              })]
            })]
          }) : null, Z || re || ye ? c.jsxs(c.Fragment, {
            children: [c.jsxs("button", {
              type: "button",
              onClick: () => B(Tt => !Tt),
              className: `mt-2.5 w-full flex items-center justify-between h-8 px-2 rounded-lg text-[11px] ${r ? "text-white/50 hover:bg-white/5 hover:text-white/70" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700"}`,
              children: [c.jsx("span", {
                children: x("更多设置")
              }), c.jsx(Mi, {
                size: 14,
                className: `transition-transform ${j ? "rotate-180" : ""}`
              })]
            }), j ? c.jsxs("div", {
              className: `mt-1 space-y-2 rounded-xl border border-dashed p-2.5 ${r ? "border-white/15" : "border-zinc-200"}`,
              children: [c.jsxs("div", {
                children: [c.jsxs("div", {
                  className: `mb-1.5 text-[11px] ${r ? "text-white/55" : "text-zinc-500"}`,
                  children: [x("比例（默认跟随"), x(Z ? "第一张参考图" : "人物图"), "）"]
                }), c.jsx("div", {
                  className: "flex flex-wrap gap-1",
                  children: pIe.map(Tt => c.jsx("button", {
                    type: "button",
                    onClick: () => Ce({
                      virtualTryOnAspectRatio: Tt
                    }),
                    className: `h-7 px-2 rounded-md text-[11px] border transition-colors ${Ee === Tt ? kt : St}`,
                    children: Tt
                  }, Tt))
                })]
              }), c.jsxs("label", {
                className: `flex items-center gap-2 text-[11px] ${r ? "text-white/70" : "text-zinc-600"}`,
                children: [c.jsx("span", {
                  className: "shrink-0 w-10",
                  children: "Seed"
                }), c.jsx("input", {
                  type: "number",
                  min: 0,
                  value: xe,
                  onChange: Tt => Ce({
                    virtualTryOnSeed: wX(Tt.target.value)
                  }),
                  className: `flex-1 h-7 rounded-md border px-2 text-[11px] outline-none ${r ? "bg-black/20 border-white/15 text-white" : "bg-white border-zinc-200 text-zinc-900"}`,
                  onMouseDown: Tt => Tt.stopPropagation()
                })]
              })]
            }) : null]
          }) : null, e.errorMsg || M ? c.jsx("div", {
            className: "mt-2 text-[11px] text-red-400",
            children: e.errorMsg || M
          }) : null, c.jsxs("div", {
            className: "mt-3 flex items-center justify-end gap-2",
            children: [Ot(), c.jsx("button", {
              type: "button",
              disabled: !me,
              title: x(Z ? "开始多图编辑" : re ? "开始手持产品" : "开始虚拟试穿"),
              "aria-label": x(Z ? "开始多图编辑" : re ? "开始手持产品" : "开始虚拟试穿"),
              onClick: Tt => {
                Tt.stopPropagation(), Yt();
              },
              className: `flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-opacity active:scale-95 ${me ? "bg-white text-black hover:opacity-90" : r ? "cursor-not-allowed bg-white/25 text-black/40" : "cursor-not-allowed bg-zinc-300 text-zinc-500"}`,
              children: _ ? c.jsx(Ua, {
                size: 16,
                className: "animate-spin",
                strokeWidth: 2.5
              }) : c.jsx(Gc, {
                size: 16,
                strokeWidth: 2.5
              })
            })]
          })]
        })
      })]
    });
  };

function Cwo({
  props: e,
  contentServices: t,
  displayQuality: n
}) {
  var s, l;
  const {
      node: r
    } = e,
    {
      presentation: a,
      interaction: i
    } = gEe(t),
    {
      document: o
    } = t;
  switch (r.type) {
    case "image-compare":
      return c.jsx(Wvo, {
        node: r,
        isDark: a.isDark,
        updateNode: o.updateNode,
        getConnectedInputImages: e.getConnectedInputImages,
        nodes: o.nodes,
        connections: o.connections,
        dataVersion: o.dataVersion,
        nodeDirtyVersion: e.nodeDirtyVersion,
        isCompactMode: e.isCompactMode,
        onCompactModeImageClick: e.onCompactModeImageClick,
        isSelected: i.selectedNodeId === r.id,
        viewZoom: ((s = a.view) == null ? void 0 : s.zoom) ?? 1
      });
    case "image-tile":
      return c.jsx(Zvo, {
        node: r,
        nodes: o.nodes,
        connections: o.connections,
        isDark: a.isDark,
        updateNode: o.updateNode,
        isSelected: i.selectedNodeId === r.id,
        viewZoom: ((l = a.view) == null ? void 0 : l.zoom) ?? 1,
        dataVersion: o.dataVersion,
        onDownloadSelected: e.onDownloadSelected
      });
    case "global-perspective":
      return c.jsx(e1o, {
        node: r,
        nodes: o.nodes,
        connections: o.connections,
        isDark: a.isDark,
        getConnectedInputImages: e.getConnectedInputImages,
        getConnectedInputItems: e.getConnectedInputItems,
        dataVersion: o.dataVersion,
        compactRefCanvasPickTargetId: e.compactRefCanvasPickTargetId ?? null,
        onStartCompactRefCanvasPick: e.onStartCompactRefCanvasPick,
        onDismissCompactRefCanvasPick: e.onDismissCompactRefCanvasPick,
        setNodes: o.setNodes,
        generateId: o.generateId,
        notifyCanvas: e.notifyCanvas
      });
    case "inpaint-crop":
      return c.jsx(n1o, {
        node: r,
        nodes: o.nodes,
        connections: o.connections,
        isDark: a.isDark,
        updateNode: o.updateNode,
        getConnectedInputImages: e.getConnectedInputImages,
        setNodes: o.setNodes,
        setConnections: o.setConnections,
        generateId: o.generateId
      });
    case "inpaint-stitch":
      return c.jsx(a1o, {
        node: r,
        nodes: o.nodes,
        connections: o.connections,
        isDark: a.isDark,
        updateNode: o.updateNode,
        getConnectedInputImages: e.getConnectedInputImages,
        setPreviewContextMenu: e.setPreviewContextMenu
      });
    case "jimeng-super-resolution":
      return TM(n, r, i.selectedNodeId, e.boxSelectLightShell, e.focusEditActiveSourceNodeId, {
        selectedNodeIds: i.selectedNodeIds,
        genPromptPanelOpen: N7(r.id)
      }) ? c.jsx(az, {
        node: r,
        isDark: a.isDark,
        setNodes: o.setNodes,
        boxSelectLightShell: e.boxSelectLightShell,
        enableGenerationNodeAnimation: e.enableGenerationNodeAnimation
      }) : c.jsx(h1o, {
        node: r,
        nodes: o.nodes,
        connections: o.connections,
        isDark: a.isDark,
        updateNode: o.updateNode,
        setNodes: o.setNodes,
        setConnections: o.setConnections,
        getConnectedInputImages: e.getConnectedInputImages,
        jimengSuperResUrl: e.jimengSuperResUrl,
        jimengSuperResApiKey: e.jimengSuperResApiKey,
        globalApiKey: e.globalApiKey,
        generateId: o.generateId,
        setHistory: o.setHistory,
        selectedNodeId: i.selectedNodeId,
        setSelectedNodeId: e.setSelectedNodeId,
        setSelectedNodeIds: e.setSelectedNodeIds,
        onGenPromptPanelUiChange: e.onGenPromptPanelUiChange,
        enableGenerationNodeAnimation: e.enableGenerationNodeAnimation,
        setLightboxItem: e.setLightboxItem,
        setLightboxOpen: e.setLightboxOpen,
        onDownloadSelected: e.onDownloadSelected
      });
    case "topaz-upscale":
      return TM(n, r, i.selectedNodeId, e.boxSelectLightShell, e.focusEditActiveSourceNodeId, {
        selectedNodeIds: i.selectedNodeIds,
        genPromptPanelOpen: N7(r.id)
      }) ? c.jsx(az, {
        node: r,
        isDark: a.isDark,
        setNodes: o.setNodes,
        boxSelectLightShell: e.boxSelectLightShell,
        enableGenerationNodeAnimation: e.enableGenerationNodeAnimation
      }) : c.jsx(Vvr, {
        node: r,
        nodes: o.nodes,
        connections: o.connections,
        isDark: a.isDark,
        updateNode: o.updateNode,
        setNodes: o.setNodes,
        setConnections: o.setConnections,
        getConnectedInputImages: e.getConnectedInputImages,
        generateId: o.generateId,
        globalApiKey: e.globalApiKey,
        setHistory: o.setHistory,
        selectedNodeId: i.selectedNodeId,
        setSelectedNodeId: e.setSelectedNodeId,
        setSelectedNodeIds: e.setSelectedNodeIds,
        onGenPromptPanelUiChange: e.onGenPromptPanelUiChange,
        enableGenerationNodeAnimation: e.enableGenerationNodeAnimation,
        showHuyaModels: e.showHuyaModels,
        setLightboxItem: e.setLightboxItem,
        setLightboxOpen: e.setLightboxOpen,
        onDownloadSelected: e.onDownloadSelected
      });
    case "image-wash":
      return c.jsx(owo, {
        ...e,
        node: r,
        isDark: a.isDark,
        setNodes: o.setNodes,
        updateNode: o.updateNode,
        setHistory: o.setHistory,
        documentSession: o.documentSession,
        selectedNodeId: i.selectedNodeId
      });
    case "fal-rembg":
      return TM(n, r, i.selectedNodeId, e.boxSelectLightShell, e.focusEditActiveSourceNodeId, {
        selectedNodeIds: i.selectedNodeIds,
        genPromptPanelOpen: N7(r.id)
      }) ? c.jsx(az, {
        node: r,
        isDark: a.isDark,
        setNodes: o.setNodes,
        boxSelectLightShell: e.boxSelectLightShell,
        enableGenerationNodeAnimation: e.enableGenerationNodeAnimation
      }) : c.jsx(wwo, {
        node: r,
        nodes: o.nodes,
        connections: o.connections,
        isDark: a.isDark,
        updateNode: o.updateNode,
        setNodes: o.setNodes,
        setConnections: o.setConnections,
        getConnectedInputImages: e.getConnectedInputImages,
        generateId: o.generateId,
        globalApiKey: e.globalApiKey,
        setHistory: o.setHistory,
        selectedNodeId: i.selectedNodeId,
        setSelectedNodeId: e.setSelectedNodeId,
        setSelectedNodeIds: e.setSelectedNodeIds,
        onGenPromptPanelUiChange: e.onGenPromptPanelUiChange,
        enableGenerationNodeAnimation: e.enableGenerationNodeAnimation,
        showHuyaModels: e.showHuyaModels,
        setLightboxItem: e.setLightboxItem,
        setLightboxOpen: e.setLightboxOpen,
        onDownloadSelected: e.onDownloadSelected
      });
    case "virtual-try-on":
      return TM(n, r, i.selectedNodeId, e.boxSelectLightShell, e.focusEditActiveSourceNodeId, {
        selectedNodeIds: i.selectedNodeIds,
        genPromptPanelOpen: N7(r.id)
      }) ? c.jsx(az, {
        node: r,
        isDark: a.isDark,
        setNodes: o.setNodes,
        boxSelectLightShell: e.boxSelectLightShell,
        enableGenerationNodeAnimation: e.enableGenerationNodeAnimation
      }) : c.jsx(Iwo, {
        node: r,
        nodes: o.nodes,
        connections: o.connections,
        isDark: a.isDark,
        updateNode: o.updateNode,
        setNodes: o.setNodes,
        setConnections: o.setConnections,
        generateId: o.generateId,
        globalApiKey: e.globalApiKey,
        setHistory: o.setHistory,
        selectedNodeId: i.selectedNodeId,
        setSelectedNodeId: e.setSelectedNodeId,
        setSelectedNodeIds: e.setSelectedNodeIds,
        onGenPromptPanelUiChange: e.onGenPromptPanelUiChange,
        enableGenerationNodeAnimation: e.enableGenerationNodeAnimation,
        setLightboxItem: e.setLightboxItem,
        setLightboxOpen: e.setLightboxOpen,
        onDownloadSelected: e.onDownloadSelected
      });
    case "local-save":
      return c.jsx(l1o, {
        node: r,
        isDark: a.isDark,
        updateNode: o.updateNode,
        getConnectedInputImages: e.getConnectedInputImages,
        getConnectedInputItems: e.getConnectedInputItems,
        hasMultiImageSource: e.hasMultiImageSource
      });
    default:
      return null;
  }
}

const Ewo = Object.freeze(Object.defineProperty({
    __proto__: null,
    MediaEditNodesGroup: Cwo
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  uyn = 440,
  Two = ({
    node: e,
    nodes: t,
    connections: n,
    view: r,
    isDark: a,
    updateNode: i,
    generate: o,
    generateId: s,
    setNodes: l,
    setConnections: d,
    apiConfigs: u,
    globalApiKey: h,
    selectedNodeId: p = null,
    setSelectedNodeId: m,
    setSelectedNodeIds: f,
    onGenPromptPanelUiChange: y,
    enableGenerationNodeAnimation: b = !0,
    documentSession: v
  }) => {
    var it, It, Ft, We, Ze, Ge, Oe, st, vt, Ht;
    on();
    const _ = g.useRef(null),
      w = g.useRef(null),
      k = g.useRef(null),
      A = g.useRef(!1),
      [S, C] = g.useState(null),
      I = g.useRef(null),
      E = g.useRef(null),
      M = g.useRef(null),
      T = g.useRef(null),
      P = g.useRef(!!e.isGenerating),
      [R, j] = g.useState(!1),
      [B, F] = g.useState(() => Cd().zoom || 1),
      [N, G] = g.useState(!1),
      [z, V] = g.useState(!1),
      [O, L] = g.useState(!1),
      D = !!e.isGenerating,
      U = D || N;
    g.useEffect(() => {
      P.current && !D && G(!0), P.current = D;
    }, [D]), A.current = R;
    const H = ((it = e.settings) == null ? void 0 : it.model) || "kling-video-v2-6",
      Y = u.find(nn => nn.id === H),
      K = B8t(H),
      W = (Y == null ? void 0 : Y.url) || "https://ai.comfly.org",
      Q = (Y == null ? void 0 : Y.key) || h,
      q = g.useMemo(() => (K === "fal" ? _9n : x9n).map(pt => u.find(lt => lt.id === pt) || {
        id: pt,
        provider: pt,
        type: "Video"
      }), [u, K]),
      ne = K === "fal" ? [{
        value: "std",
        label: "STD"
      }, {
        value: "pro",
        label: "PRO"
      }] : [{
        value: "std",
        label: "STD"
      }, {
        value: "pro",
        label: "PRO"
      }, {
        value: "4k",
        label: "4K"
      }],
      de = ((It = e.settings) == null ? void 0 : It.klingImages) || [],
      le = ((Ft = e.settings) == null ? void 0 : Ft.klingVideoUrl) || "",
      J = ((We = e.settings) == null ? void 0 : We.klingVideoKeepSound) || "yes",
      pe = ((Ze = e.settings) == null ? void 0 : Ze.klingMotionControlMode) || "std",
      ce = ((Ge = e.settings) == null ? void 0 : Ge.klingMotionControlCharacterOrientation) || "image",
      we = ((Oe = e.settings) == null ? void 0 : Oe.klingMotionControlWatermarkEnabled) ?? !1,
      [X, Z] = g.useState(() => {
        var nn;
        return !!((nn = e.settings) != null && nn.genUseAliyunOss);
      }),
      [re, fe] = g.useState(() => ua()),
      [ye, ie] = g.useState(() => Ph()),
      [ae, be] = g.useState(() => mo()),
      Ee = g.useRef(e.settings);
    g.useEffect(() => {
      Ee.current = e.settings;
    }, [e.settings]), g.useEffect(() => {
      var nn;
      Z(!!((nn = e.settings) != null && nn.genUseAliyunOss));
    }, [e.id, (st = e.settings) == null ? void 0 : st.genUseAliyunOss]), g.useEffect(() => {
      const nn = () => {
        fe(ua()), ie(Ph()), be(mo());
      };
      return nn(), window.addEventListener(go, nn), () => window.removeEventListener(go, nn);
    }, []), g.useEffect(() => {
      if (ye || re || !X) return;
      Z(!1);
      const nn = {
        ...Ee.current
      };
      nn.genUseAliyunOss && i(e.id, {
        settings: {
          ...nn,
          genUseAliyunOss: !1
        }
      });
    }, [ye, re, X, e.id, i]);
    const xe = g.useMemo(() => Yzt(t, n, e.id), [t, n, e.id]),
      he = xe.imageUrl || ((vt = de[0]) == null ? void 0 : vt.url),
      ue = le || xe.videoUrl,
      ge = le || xe.videoPreviewUrl || ue,
      _e = !!he,
      ke = !!(ge || ue),
      ve = typeof e.content == "string" ? e.content.trim() : "",
      Te = ve ? $o(ve) || Zpn(ve) : !1,
      Ne = p === e.id,
      me = g.useCallback(() => {
        zb(e.id, m, f, 500, {
          forceSingle: !0
        }), Dd(e.id, !0), y == null || y(e.id, !0), j(!0);
      }, [e.id, y, m, f]),
      Ae = g.useCallback(() => {
        j(!1), Dd(e.id, !1), y == null || y(e.id, !1), V(!1);
      }, [e.id, y]),
      Fe = g.useRef(!1);
    g.useEffect(() => {
      Ne && !Fe.current ? me() : !Ne && A.current && Ae(), Fe.current = Ne;
    }, [Ne]), g.useEffect(() => () => {
      Dd(e.id, !1), y == null || y(e.id, !1);
    }, [e.id, y]), g.useEffect(() => (F(Cd().zoom || 1), dw(nn => {
      F(nn.zoom || 1);
    })), []), g.useEffect(() => {
      if (!R) return;
      const nn = pt => {
        var gt, Ut, _t;
        const lt = pt.target;
        lt && ((gt = _.current) != null && gt.contains(lt) || (Ut = w.current) != null && Ut.contains(lt) || (_t = E.current) != null && _t.contains(lt) || Ae());
      };
      return window.addEventListener("mousedown", nn, !0), () => window.removeEventListener("mousedown", nn, !0);
    }, [R, Ae]);
    const Me = yI({
      hostRef: w,
      open: R,
      zoom: B,
      remeasureKey: `${R}`,
      stabilizeNodeId: e.id
    });
    Qp(k, "50% 0%", R);
    const Re = nn => {
        i(e.id, {
          settings: {
            ...(e.settings || {}),
            model: nn
          }
        });
      },
      $e = nn => {
        if (nn === K) return;
        const pt = k9n(H, nn),
          lt = {
            ...(e.settings || {}),
            model: pt
          };
        nn === "fal" && pe === "4k" && (lt.klingMotionControlMode = "pro"), i(e.id, {
          settings: lt
        });
      },
      rt = () => {
        var pt;
        const nn = (pt = _.current) == null ? void 0 : pt.getBoundingClientRect();
        return nn ? {
          top: nn.top,
          left: nn.right + 12
        } : null;
      },
      nt = () => {
        const nn = rt();
        nn && C(nn), V(!0);
      },
      ze = nn => S ? Da.createPortal(c.jsx("div", {
        ref: E,
        style: {
          position: "fixed",
          top: S.top,
          left: S.left,
          zIndex: 1002,
          transformOrigin: "top left",
          transform: `scale(${r.zoom})`,
          width: 480
        },
        children: nn
      }), document.body) : null,
      Le = g.useCallback(() => {
        const pt = n.filter(At => At.from === e.id).map(At => {
          const Yt = t.find(qe => qe.id === At.to);
          return (Yt == null ? void 0 : Yt.type) === "preview" ? Yt.id : null;
        }).filter(At => At !== null);
        if (pt.length > 0) return pt[pt.length - 1];
        const lt = s(),
          gt = e.nodeName || "动作迁移",
          Ut = Ki(lt, "preview", e.x + (e.width ?? 250) + 80, e.y, gt, void 0, t);
        Ut.width = 400, Ut.height = 400, l(At => [...At, Ut]);
        const _t = {
          id: s(),
          from: e.id,
          to: lt
        };
        return d(At => [...At, _t]), i(e.id, {
          settings: {
            ...(e.settings || {}),
            selectedPreviewId: lt
          }
        }), lt;
      }, [e, t, n, s, l, d, i]);
    g.useEffect(() => {
      if (!z) {
        I.current = null, C(null);
        return;
      }
      let nn = 0,
        pt = !1;
      const lt = () => {
        const gt = rt();
        if (gt) if (!pt) I.current = gt, C(gt), pt = !0;else {
          const Ut = I.current;
          if (!Ut || Math.abs(Ut.top - gt.top) > .15 || Math.abs(Ut.left - gt.left) > .15) {
            I.current = gt;
            const _t = E.current;
            _t && (_t.style.top = `${gt.top}px`, _t.style.left = `${gt.left}px`);
          }
        }
        nn = requestAnimationFrame(lt);
      };
      return nn = requestAnimationFrame(lt), () => cancelAnimationFrame(nn);
    }, [z, r.zoom]);
    const Ke = !D && _e && !!ue,
      Xe = () => {
        const nn = v == null ? void 0 : v.lease(),
          pt = Le(),
          lt = {
            ...(e.settings || {}),
            _autoCreatedPreviewId: pt || void 0
          };
        i(e.id, {
          settings: lt
        }), pt && requestAnimationFrame(() => {
          Wke(nn, pt, "previewGenerationStarted");
        }), o({
          ...e,
          settings: lt
        });
      },
      De = `text-xs shrink-0 w-[4.5rem] ${a ? "text-white/70" : "text-zinc-500"}`,
      Ye = a ? "bg-white text-black border-white" : "bg-zinc-900 text-white border-zinc-900",
      Ce = a ? "border-white/20 text-white/90 hover:bg-white/5" : "border-zinc-300 text-zinc-800 hover:bg-zinc-50",
      He = nn => {
        if (nn.button !== 0 || nn.ctrlKey || nn.metaKey) return;
        const pt = nn.clientX,
          lt = nn.clientY;
        let gt = !0;
        const Ut = At => {
            Math.hypot(At.clientX - pt, At.clientY - lt) > 8 && (gt = !1);
          },
          _t = At => {
            window.removeEventListener("pointermove", Ut), window.removeEventListener("pointerup", _t), window.removeEventListener("pointercancel", _t), gt && (Math.hypot(At.clientX - pt, At.clientY - lt) > 8 || me());
          };
        window.addEventListener("pointermove", Ut), window.addEventListener("pointerup", _t), window.addEventListener("pointercancel", _t);
      },
      Ve = () => {
        if (re || !ye) return null;
        const nn = $g(ae);
        return c.jsxs("label", {
          className: `sketch-chat-web-chip${a ? " sketch-chat-web-chip--dark" : ""}`,
          onMouseDown: pt => pt.stopPropagation(),
          title: Jk(ae),
          children: [c.jsx("input", {
            type: "checkbox",
            checked: X,
            onChange: pt => {
              const lt = pt.target.checked;
              Z(lt);
              const gt = {
                ...Ee.current
              };
              i(e.id, {
                settings: {
                  ...gt,
                  genUseAliyunOss: lt
                }
              });
            },
            className: "h-3 w-3 cursor-pointer"
          }), c.jsx("span", {
            className: "whitespace-nowrap",
            title: x(nn),
            children: x(nn)
          })]
        });
      };
    return c.jsxs("div", {
      ref: _,
      className: "relative w-full h-full",
      children: [c.jsxs("div", {
        "data-motion-control-preview": !0,
        className: `relative w-full h-full rounded-2xl overflow-hidden border cursor-pointer ${Sp(a)}`,
        onPointerDown: He,
        children: [ve ? c.jsx("div", {
          className: "flex h-full w-full min-h-0 min-w-0 items-center justify-center overflow-hidden",
          children: Te ? c.jsx("video", {
            src: _c(ve) || ve,
            muted: !0,
            playsInline: !0,
            preload: "metadata",
            className: "max-h-full max-w-full object-contain"
          }) : c.jsx("img", {
            src: ve,
            alt: x("动作迁移结果"),
            className: "max-h-full max-w-full object-contain",
            draggable: !1
          })
        }) : c.jsxs("div", {
          className: `absolute inset-0 flex flex-col items-center justify-center gap-2 px-3 text-center text-xs ${a ? "text-white/55" : "text-zinc-500"}`,
          children: [c.jsx(Oo, {
            size: 22,
            className: "opacity-70"
          }), c.jsx("span", {
            children: x("配置参数生成动作迁移视频")
          })]
        }), U && c.jsx("div", {
          "data-compact-gen-progress-layer": !0,
          className: `absolute inset-0 z-[60] overflow-hidden pointer-events-none transition-opacity duration-400 ease-out ${N && !D ? "opacity-0" : "opacity-100"}`,
          onTransitionEnd: nn => {
            nn.propertyName === "opacity" && N && !D && G(!1);
          },
          "aria-hidden": !0,
          children: c.jsx(Yv, {
            seed: e.id,
            progressFillRef: M,
            progressThinBarRef: T,
            isDark: a
          })
        }), e.errorMsg ? c.jsx("div", {
          className: "absolute bottom-2 left-2 right-2 z-20 rounded-lg bg-black/55 px-2 py-1 text-[11px] text-red-300",
          children: e.errorMsg
        }) : null]
      }), c.jsx("div", {
        ref: w,
        "data-gen-prompt-panel": "true",
        className: R ? wD : "hidden",
        style: {
          width: `min(${uyn}px, 90vw)`,
          maxWidth: `min(${uyn}px, 90vw)`,
          boxSizing: "border-box",
          ...Me.style
        },
        onMouseDown: nn => {
          nn.stopPropagation(), zb(e.id, m, f, 500, {
            forceSingle: !0
          });
        },
        children: c.jsxs("div", {
          ref: k,
          className: `rounded-2xl border p-3 ${a ? "border-white/15 bg-[#1f1f1f] text-white" : "border-zinc-200 bg-white text-zinc-900"}`,
          style: {
            transition: "none",
            width: "100%"
          },
          children: [c.jsx("div", {
            className: "mb-3 flex items-start justify-between gap-2",
            children: c.jsxs("div", {
              className: "min-w-0",
              children: [c.jsx("div", {
                className: "flex items-center gap-2",
                children: c.jsx("span", {
                  className: `inline-flex h-7 items-center rounded-md border px-2.5 text-xs font-medium ${a ? "border-white/20 bg-[#121212] text-white" : "border-zinc-300 bg-white text-zinc-900"}`,
                  children: x("动作迁移")
                })
              }), c.jsx("p", {
                className: `mt-1.5 text-[11px] leading-relaxed ${a ? "text-white/45" : "text-zinc-500"}`,
                children: x("把视频里的动作，迁移到角色图上")
              })]
            })
          }), c.jsxs("div", {
            className: "grid grid-cols-2 gap-2",
            children: [c.jsxs("div", {
              className: `rounded-xl border p-2.5 min-h-[96px] flex flex-col ${_e ? a ? "border-white/25 bg-white/[0.04]" : "border-zinc-300 bg-zinc-50" : a ? "border-dashed border-white/20 bg-black/20" : "border-dashed border-zinc-300 bg-zinc-50/80"}`,
              children: [c.jsx("div", {
                className: `text-[10px] font-medium mb-1.5 ${a ? "text-white/55" : "text-zinc-500"}`,
                children: x("① 角色图")
              }), _e ? c.jsx("img", {
                src: he,
                alt: x("角色图"),
                className: "w-full h-14 object-cover rounded-lg",
                draggable: !1
              }) : c.jsxs("div", {
                className: `flex-1 flex flex-col items-center justify-center gap-1 text-[11px] text-center px-1 ${a ? "text-white/40" : "text-zinc-400"}`,
                children: [c.jsx(lo, {
                  size: 18,
                  className: "opacity-70"
                }), c.jsx("span", {
                  children: x("从左侧连入图片")
                })]
              })]
            }), c.jsxs("button", {
              type: "button",
              onClick: nn => {
                nn.preventDefault(), nn.stopPropagation(), nt();
              },
              className: `rounded-xl border p-2.5 min-h-[96px] flex flex-col text-left transition-colors ${ke ? a ? "border-white/25 bg-white/[0.04] hover:bg-white/[0.07]" : "border-zinc-300 bg-zinc-50 hover:bg-zinc-100" : a ? "border-dashed border-white/20 bg-black/20 hover:bg-white/[0.04]" : "border-dashed border-zinc-300 bg-zinc-50/80 hover:bg-zinc-100"}`,
              children: [c.jsx("div", {
                className: `text-[10px] font-medium mb-1.5 ${a ? "text-white/55" : "text-zinc-500"}`,
                children: x("② 动作视频")
              }), ke ? Zpn(ge) ? c.jsx("video", {
                src: _c(ge) || ge,
                muted: !0,
                playsInline: !0,
                preload: "metadata",
                className: "w-full h-14 object-cover rounded-lg pointer-events-none"
              }) : c.jsx("img", {
                src: ge,
                alt: x("动作视频"),
                className: "w-full h-14 object-cover rounded-lg pointer-events-none",
                draggable: !1
              }) : c.jsxs("div", {
                className: `flex-1 flex flex-col items-center justify-center gap-1 text-[11px] text-center px-1 ${a ? "text-white/40" : "text-zinc-400"}`,
                children: [c.jsx(Oo, {
                  size: 18,
                  className: "opacity-70"
                }), c.jsx("span", {
                  children: x("点击上传或从左侧连入")
                })]
              })]
            })]
          }), c.jsx("textarea", {
            "data-scrollable": "true",
            value: e.prompt || "",
            onChange: nn => i(e.id, {
              prompt: nn.target.value
            }),
            placeholder: x("可选说明"),
            className: `mt-2.5 w-full h-14 text-[10px] p-2.5 rounded-xl border outline-none resize-none overflow-y-auto rh-scroll-minimal custom-scrollbar placeholder:text-[9px] ${a ? "bg-black/20 border-white/15 text-white placeholder:text-white/20" : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400"}`,
            onMouseDown: nn => nn.stopPropagation()
          }), c.jsxs("div", {
            className: "mt-2.5 flex items-center gap-1.5",
            children: [c.jsx("span", {
              className: De,
              children: x("渠道")
            }), c.jsx("div", {
              className: "flex flex-1 gap-1.5",
              children: [{
                value: "platform",
                label: "API"
              }, {
                value: "fal",
                label: "Fal"
              }].map(({
                value: nn,
                label: pt
              }) => c.jsx("button", {
                type: "button",
                onClick: () => $e(nn),
                className: `flex-1 h-7 rounded-md text-[11px] border transition-colors ${K === nn ? Ye : Ce}`,
                children: pt
              }, nn))
            })]
          }), c.jsxs("div", {
            className: "mt-1.5 flex items-center gap-1.5",
            children: [c.jsx("div", {
              className: "flex flex-1 gap-1 min-w-0",
              children: q.map(nn => {
                var pt;
                return c.jsx("button", {
                  type: "button",
                  onClick: () => Re(nn.id),
                  className: `flex-1 h-7 rounded-md text-[11px] border transition-colors truncate px-1 ${nn.id === H ? Ye : Ce}`,
                  title: nn.provider,
                  children: sVn(((pt = nn.provider) == null ? void 0 : pt.replace(/^Kling\s*/i, "")) || nn.provider, K)
                }, nn.id);
              })
            }), c.jsx("div", {
              className: `w-px h-4 shrink-0 ${a ? "bg-white/15" : "bg-zinc-200"}`,
              "aria-hidden": !0
            }), c.jsx("div", {
              className: "flex gap-1 shrink-0",
              children: ne.map(({
                value: nn,
                label: pt
              }) => c.jsx("button", {
                type: "button",
                onClick: () => i(e.id, {
                  settings: {
                    ...(e.settings || {}),
                    klingMotionControlMode: nn
                  }
                }),
                className: `h-7 px-2 rounded-md text-[11px] border transition-colors ${pe === nn ? Ye : Ce}`,
                children: pt
              }, nn))
            })]
          }), c.jsxs("button", {
            type: "button",
            onClick: () => L(nn => !nn),
            className: `mt-2.5 w-full flex items-center justify-between h-8 px-2 rounded-lg text-[11px] ${a ? "text-white/50 hover:bg-white/5 hover:text-white/70" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700"}`,
            children: [c.jsx("span", {
              children: x("更多设置")
            }), c.jsx(Mi, {
              size: 14,
              className: `transition-transform ${O ? "rotate-180" : ""}`
            })]
          }), O ? c.jsxs("div", {
            className: `mt-1 space-y-2 rounded-xl border border-dashed p-2.5 ${a ? "border-white/15" : "border-zinc-200"}`,
            children: [c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx("span", {
                className: De,
                children: x("保留原声")
              }), c.jsx("div", {
                className: "flex flex-1 gap-1.5",
                children: ["yes", "no"].map(nn => c.jsx("button", {
                  type: "button",
                  onClick: () => i(e.id, {
                    settings: {
                      ...(e.settings || {}),
                      klingVideoKeepSound: nn
                    }
                  }),
                  className: `flex-1 h-7 rounded-md text-[11px] border transition-colors ${J === nn ? Ye : Ce}`,
                  children: x(nn === "yes" ? "开" : "关")
                }, nn))
              })]
            }), c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx("span", {
                className: De,
                children: x("朝向跟随")
              }), c.jsx("div", {
                className: "flex flex-1 gap-1.5",
                children: ["image", "video"].map(nn => c.jsx("button", {
                  type: "button",
                  onClick: () => i(e.id, {
                    settings: {
                      ...(e.settings || {}),
                      klingMotionControlCharacterOrientation: nn
                    }
                  }),
                  className: `flex-1 h-7 rounded-md text-[11px] border transition-colors ${ce === nn ? Ye : Ce}`,
                  children: x(nn === "image" ? "角色图" : "动作视频")
                }, nn))
              })]
            }), K === "platform" ? c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx("span", {
                className: De,
                children: x("水印")
              }), c.jsxs("div", {
                className: "flex flex-1 gap-1.5",
                children: [c.jsx("button", {
                  type: "button",
                  onClick: () => i(e.id, {
                    settings: {
                      ...(e.settings || {}),
                      klingMotionControlWatermarkEnabled: !0
                    }
                  }),
                  className: `flex-1 h-7 rounded-md text-[11px] border transition-colors ${we ? Ye : Ce}`,
                  children: x("开")
                }), c.jsx("button", {
                  type: "button",
                  onClick: () => i(e.id, {
                    settings: {
                      ...(e.settings || {}),
                      klingMotionControlWatermarkEnabled: !1
                    }
                  }),
                  className: `flex-1 h-7 rounded-md text-[11px] border transition-colors ${we ? Ce : Ye}`,
                  children: x("关")
                })]
              })]
            }) : null]
          }) : null, e.errorMsg ? c.jsx("div", {
            className: "mt-2 text-[11px] text-red-400",
            children: e.errorMsg
          }) : null, c.jsxs("div", {
            className: "mt-3 flex items-center justify-end gap-2",
            children: [Ve(), c.jsx("button", {
              type: "button",
              disabled: !Ke,
              title: x("开始动作迁移"),
              "aria-label": x("开始动作迁移"),
              onClick: nn => {
                nn.stopPropagation(), Xe();
              },
              className: `flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-opacity active:scale-95 ${Ke ? "bg-white text-black hover:opacity-90" : a ? "cursor-not-allowed bg-white/25 text-black/40" : "cursor-not-allowed bg-zinc-300 text-zinc-500"}`,
              children: D ? c.jsx(Ua, {
                size: 16,
                className: "animate-spin",
                strokeWidth: 2.5
              }) : c.jsx(Gc, {
                size: 16,
                strokeWidth: 2.5
              })
            })]
          })]
        })
      }), z && ze(c.jsx(l$t, {
        isOpen: z,
        isDark: a,
        maxDuration: 10,
        currentVideoFile: ((Ht = e.settings) == null ? void 0 : Ht.klingVideoFile) || null,
        apiKey: Q,
        baseUrl: W,
        useOssForUpload: X || re,
        attachMode: "inline",
        onClose: () => V(!1),
        onConfirm: (nn, pt, lt, gt, Ut, _t) => {
          i(e.id, {
            settings: {
              ...(e.settings || {}),
              klingVideoFile: nn,
              klingVideoUrl: gt || "",
              klingVideoKeepSound: _t || "yes"
            }
          }), V(!1);
        }
      }))]
    });
  },
  hyn = 440;

async function Mwo(e) {
  const t = await fetch(e).then(n => {
    if (!n.ok) throw new Error("无法读取本地素材");
    return n.blob();
  });
  return await new Promise((n, r) => {
    const a = new FileReader();
    a.onload = () => n(String(a.result || "")), a.onerror = () => r(new Error("本地素材转 Base64 失败")), a.readAsDataURL(t);
  });
}

function Pwo(e) {
  return new Promise((t, n) => {
    const r = new FileReader();
    r.onload = () => t(String(r.result || "")), r.onerror = () => n(new Error("文件读取失败")), r.readAsDataURL(e);
  });
}

function Rwo(e, t, n) {
  const r = new Map(n.map(d => [d.id, d]));
  let a = "",
    i = "",
    o = "",
    s = 0,
    l = 0;
  for (const d of t.filter(u => u.to === e)) {
    const u = r.get(d.from);
    if (!u) continue;
    const h = TZ(u);
    if (h === "image" && !a) {
      a = f2e(u);
      continue;
    }
    h === "video" && !i && !o && (i = String(Zo(u) || "").trim() || bIe(u), !i && String(u.content || "").startsWith("blob:") && (i = String(u.content).trim()), o = YPt(u) || i, s = ALn(u), l = SLn(u));
  }
  return {
    imageUrl: a,
    videoPlaybackUrl: i,
    videoPreviewUrl: o,
    videoDurationSec: s,
    videoDurationFallbackSec: l
  };
}

async function pyn(e, t = 0) {
  if (t > 0) return t;
  const n = String(e || "").trim();
  if (!n) return 0;
  try {
    const {
        getVideoMetadata: r
      } = await Ie(async () => {
        const {
          getVideoMetadata: i
        } = await Promise.resolve().then(() => pg);
        return {
          getVideoMetadata: i
        };
      }, void 0, import.meta.url),
      a = await r(n);
    return a.duration > 0 && Number.isFinite(a.duration) ? a.duration : 0;
  } catch {
    return 0;
  }
}

const Nwo = ({
    node: e,
    nodes: t,
    connections: n,
    isDark: r,
    updateNode: a,
    setNodes: i,
    generateId: o,
    globalApiKey: s = "",
    setHistory: l,
    selectedNodeId: d = null,
    setSelectedNodeId: u,
    setSelectedNodeIds: h,
    onGenPromptPanelUiChange: p,
    enableGenerationNodeAnimation: m = !0
  }) => {
    var Ce, He;
    on();
    const [f, y] = g.useState(() => !!e.isGenerating),
      [b, v] = g.useState(!1),
      _ = g.useRef(null),
      w = g.useRef(null),
      k = g.useRef(!!e.isGenerating),
      A = f || b,
      [S, C] = g.useState(null),
      [I, E] = g.useState(!1),
      [M, T] = g.useState(!1),
      [P, R] = g.useState(() => Cd().zoom || 1),
      [j, B] = g.useState(() => {
        var Ve;
        return !!((Ve = e.settings) != null && Ve.genUseAliyunOss);
      }),
      [F, N] = g.useState(() => ua()),
      [G, z] = g.useState(() => Ph()),
      [V, O] = g.useState(() => mo()),
      L = g.useRef(e.settings),
      D = g.useRef(null),
      U = g.useRef(null);
    g.useEffect(() => {
      L.current = e.settings;
    }, [e.settings]), g.useEffect(() => {
      f && hu(e.id, !0);
    }, [f, e.id]), g.useEffect(() => {
      f || al.getNodeSnapshot(e.id).status !== "generating" && Px(e.id) && hu(e.id, !1);
    }, [f, e.id]), g.useEffect(() => {
      k.current && !f && v(!0), k.current = f;
    }, [f]), g.useEffect(() => {
      if (!b) return;
      const Ve = window.setTimeout(() => v(!1), 450);
      return () => window.clearTimeout(Ve);
    }, [b]), g.useEffect(() => {
      var Ve;
      B(!!((Ve = e.settings) != null && Ve.genUseAliyunOss));
    }, [e.id, (Ce = e.settings) == null ? void 0 : Ce.genUseAliyunOss]), g.useEffect(() => {
      const Ve = () => {
        N(ua()), z(Ph()), O(mo());
      };
      return Ve(), window.addEventListener(go, Ve), () => window.removeEventListener(go, Ve);
    }, []), g.useEffect(() => {
      if (G || F || !j) return;
      B(!1);
      const Ve = {
        ...L.current
      };
      Ve.genUseAliyunOss && a(e.id, {
        settings: {
          ...Ve,
          genUseAliyunOss: !1
        }
      });
    }, [G, F, j, e.id, a]);
    const H = e.settings || {},
      Y = IKe(H.idV2vMode),
      K = CKe(H.idV2vResolution),
      W = rQ(H.idV2vNumFrames),
      Q = u2e(H.idV2vNumInferenceSteps),
      q = h2e(H.idV2vGuidanceScale),
      ne = p2e(H.idV2vVaceScale),
      de = String(H.idV2vSegmentationPrompt || "person"),
      le = H.idV2vSeed,
      J = String(H.idV2vImageUrl || "").trim(),
      pe = String(H.idV2vVideoUrl || "").trim(),
      ce = g.useMemo(() => Rwo(e.id, n, t), [e.id, n, t]),
      we = J || ce.imageUrl,
      X = pe || ce.videoPlaybackUrl,
      Z = pe || ce.videoPreviewUrl || X,
      re = ce.videoDurationSec,
      fe = ce.videoDurationFallbackSec,
      ye = !!we,
      ie = !!X,
      ae = !!(Z || X),
      be = !f && ye && ie && (Y === "relight" || !!((He = e.prompt) != null && He.trim())),
      Ee = typeof e.content == "string" ? e.content.trim() : "",
      [xe, he] = g.useState(null),
      ue = d === e.id;
    g.useEffect(() => {
      if (!Ee) {
        he(null);
        return;
      }
      let Ve = !1;
      return (async () => {
        let it = Ee;
        try {
          if (it.startsWith("content_ref:")) {
            await Er.init();
            const It = await Er.get(Er.extractId(it));
            It && (it = It);
          }
        } catch {}
        Ve || he(it);
      })(), () => {
        Ve = !0;
      };
    }, [Ee]);
    const ge = g.useRef(null),
      _e = g.useRef(null),
      ke = g.useRef(null),
      ve = g.useRef(!1);
    ve.current = I;
    const Te = g.useCallback(() => {
        zb(e.id, u, h, 500, {
          forceSingle: !0
        }), Dd(e.id, !0), p == null || p(e.id, !0), E(!0);
      }, [e.id, p, u, h]),
      Ne = g.useCallback(() => {
        E(!1), Dd(e.id, !1), p == null || p(e.id, !1);
      }, [e.id, p]),
      me = g.useRef(!1);
    g.useEffect(() => {
      ue && !me.current ? Te() : !ue && ve.current && Ne(), me.current = ue;
    }, [ue]), g.useEffect(() => () => {
      Dd(e.id, !1), p == null || p(e.id, !1);
    }, [e.id, p]), g.useEffect(() => (R(Cd().zoom || 1), dw(Ve => {
      R(Ve.zoom || 1);
    })), []), g.useEffect(() => {
      if (!I) return;
      const Ve = it => {
        var Ft, We;
        const It = it.target;
        It && ((Ft = ge.current) != null && Ft.contains(It) || (We = _e.current) != null && We.contains(It) || Ne());
      };
      return window.addEventListener("mousedown", Ve, !0), () => window.removeEventListener("mousedown", Ve, !0);
    }, [I, Ne]);
    const Ae = yI({
      hostRef: _e,
      open: I,
      zoom: P,
      remeasureKey: `${I}`,
      stabilizeNodeId: e.id
    });
    Qp(ke, "50% 0%", I);
    const Fe = g.useCallback((Ve, it) => {
        !(Ve > 0) || !(it > 0) || l5({
          nodeId: e.id,
          mw: Ve,
          mh: it,
          setNodes: i,
          currentWidth: e.width,
          currentHeight: e.height,
          hasCustomSize: !1,
          actualSizeLabel: {
            w: Ve,
            h: it
          }
        });
      }, [e.height, e.id, e.width, i]),
      Me = Ve => {
        a(e.id, {
          settings: {
            ...(L.current || {}),
            ...Ve
          }
        });
      };
    g.useEffect(() => {
      if (!X) return;
      let Ve = !1;
      return (async () => {
        const it = (await pyn(X, re)) || fe;
        if (Ve || !(it > 0)) return;
        const It = L.current || {};
        if (It.idV2vNumFramesUserSet && It.idV2vNumFramesSource === X) return;
        const Ft = mBe(it);
        It.idV2vNumFrames === Ft && It.idV2vNumFramesSource === X || a(e.id, {
          settings: {
            ...It,
            idV2vNumFrames: Ft,
            idV2vNumFramesSource: X,
            idV2vNumFramesUserSet: !1
          }
        });
      })(), () => {
        Ve = !0;
      };
    }, [fe, re, e.id, a, X]);
    const Re = async Ve => {
        if (!(!Ve || !Ve.type.startsWith("image/"))) try {
          Me({
            idV2vImageUrl: await Pwo(Ve)
          }), C(null);
        } catch (it) {
          C(it.message || "图片读取失败");
        }
      },
      $e = async Ve => {
        if (!(!Ve || !Ve.type.startsWith("video/"))) try {
          Me({
            idV2vVideoUrl: URL.createObjectURL(Ve)
          }), C(null);
        } catch (it) {
          C(it.message || "视频读取失败");
        }
      },
      rt = async (Ve, it) => {
        var Ze;
        let It = String(Ve || "").trim();
        const Ft = kLn(e.id, n, t, it);
        if (it === "video") {
          if (Ft && (It = String(Zo(Ft) || "").trim() || bIe(Ft) || It, !It && String(Ft.content || "").startsWith("blob:") && (It = String(Ft.content).trim())), It = QPt(It) || It, !It) throw new Error("无法读取源视频");
          if (m2e(It)) throw new Error("源视频读到的是封面图，请重新连接视频节点");
        } else if (Ft) if (Ft.type === "gen-image") {
          const {
            resolveGenNodeOriginalUrlForCropExpand: Ge
          } = await Ie(async () => {
            const {
              resolveGenNodeOriginalUrlForCropExpand: st
            } = await Promise.resolve().then(() => LM);
            return {
              resolveGenNodeOriginalUrlForCropExpand: st
            };
          }, void 0, import.meta.url);
          It = (await Ge(Ft, It)) || f2e(Ft) || It;
        } else It = f2e(Ft) || It;
        if (!It) throw new Error(it === "image" ? "无法读取参考图" : "无法读取源视频");
        if (!!((Ze = L.current) != null && Ze.genUseAliyunOss) || ua()) {
          const {
            resolveGenReferenceUrlsForApi: Ge
          } = await Ie(async () => {
            const {
              resolveGenReferenceUrlsForApi: Oe
            } = await Promise.resolve().then(() => Mc);
            return {
              resolveGenReferenceUrlsForApi: Oe
            };
          }, void 0, import.meta.url);
          [It] = await Ge([It], {
            useOss: !0,
            metaByIndex: [{
              type: it
            }]
          });
        } else !It.startsWith(`data:${it}/`) && !R2(It) && (It.startsWith("blob:") || vs(It)) && (It = await Mwo(It));
        if (it === "video" && m2e(It)) throw new Error("源视频读到的是封面图，请重新连接视频节点");
        return It;
      },
      nt = g.useCallback(async () => {
        var Ze;
        if (!we || !X) {
          C("请先提供参考图和源视频");
          return;
        }
        const Ve = String(s || "").trim();
        if (!Ve) {
          C("请先在 API 设置中填写 Fal 渠道 Key");
          return;
        }
        C(null), v(!1), y(!0), a(e.id, {
          isGenerating: !0,
          errorMsg: ""
        });
        const it = Date.now(),
          It = l ? o() : "",
          Ft = ((Ze = e.prompt) == null ? void 0 : Ze.trim()) || (Y === "relight" ? "光照重置" : "风格重绘"),
          We = `Fal / ${wLn}${Y === "relight" ? "/relight" : ""}`;
        if (l && It) {
          const Ge = {
            id: It,
            url: "",
            type: "video",
            prompt: Ft,
            time: new Date().toLocaleTimeString(),
            status: "generating",
            progress: 5,
            modelName: We,
            sourceNodeId: e.id,
            startTime: it
          };
          l(Oe => [Ge, ...(ua() ? Oe : Oe.slice(0, 99))]);
        }
        try {
          const [Ge, Oe] = await Promise.all([rt(we, "image"), rt(X, "video")]),
            st = L.current || {};
          let vt = rQ(st.idV2vNumFrames ?? W);
          if (!st.idV2vNumFramesUserSet) {
            const At = (await pyn(X, re)) || fe;
            At > 0 && (vt = mBe(At));
          }
          const Ht = await ATt({
              falPrefix: Po(vZ(localStorage.getItem(B5e) || Zue)),
              apiKey: Ve,
              mode: Y,
              prompt: e.prompt,
              videoUrl: Oe,
              imageUrl: Ge,
              resolution: K,
              numFrames: vt,
              segmentationPrompt: de,
              numInferenceSteps: Q,
              guidanceScale: q,
              vaceScale: ne,
              seed: le,
              onProgress: At => {
                l && It && l(Yt => Yt.map(qe => qe.id === It ? {
                  ...qe,
                  progress: At
                } : qe));
              }
            }),
            nn = It || `idv2v_${o()}`,
            pt = await xT([Ht], nn, !0);
          let lt = `idv2v_${o()}`,
            gt = Ht,
            Ut = {},
            _t = "";
          if (pt) gt = pt.remoteUrls[0] || Ht, _t = pt.displayUrls[0] || "", Ut = _T(pt, {
            type: "video"
          });else {
            const At = await Jwe(Ht, {
              nodeId: e.id,
              taskId: lt,
              model: "id-v2v"
            });
            gt = At.displayUrl || Ht, lt = At.assetId;
          }
          try {
            const At = await new Promise(Yt => {
              const qe = document.createElement("video");
              qe.preload = "metadata", qe.onloadedmetadata = () => {
                qe.videoWidth > 0 && qe.videoHeight > 0 ? Yt({
                  w: qe.videoWidth,
                  h: qe.videoHeight
                }) : Yt(null);
              }, qe.onerror = () => Yt(null), qe.src = Ht;
            });
            At && Fe(At.w, At.h);
          } catch {}
          if (a(e.id, {
            content: gt,
            previewType: "video",
            _contentAssetId: pt ? void 0 : lt,
            isGenerating: !1,
            errorMsg: "",
            videoPosterUrl: _t || void 0,
            settings: {
              ...(e.settings || {}),
              previewType: "video",
              videoPosterUrl: _t || void 0,
              ...((pt == null ? void 0 : pt.ossSettings) || {})
            }
          }), l && It) {
            const At = Date.now();
            l(Yt => Yt.map(qe => qe.id === It ? {
              ...qe,
              url: Ht,
              prompt: Ft,
              status: "completed",
              progress: 100,
              durationMs: Math.max(0, At - it),
              generationTime: `${((At - it) / 1e3).toFixed(1)}s`,
              errorMsg: "",
              _assetId: pt ? qe._assetId : lt,
              ...Ut
            } : qe));
          }
        } catch (Ge) {
          const Oe = Ge.message || "光照重置失败";
          C(Oe), a(e.id, {
            isGenerating: !1,
            errorMsg: Oe
          }), l && It && l(st => st.map(vt => vt.id === It ? {
            ...vt,
            status: "failed",
            progress: 100,
            errorMsg: Oe
          } : vt));
        } finally {
          y(!1);
        }
      }, [Fe, fe, re, n, o, s, q, we, Q, Y, e, t, W, K, le, de, l, a, ne, X]),
      ze = Ve => {
        if (Ve.button !== 0 || Ve.ctrlKey || Ve.metaKey) return;
        const it = Ve.clientX,
          It = Ve.clientY;
        let Ft = !0;
        const We = Ge => {
            Math.hypot(Ge.clientX - it, Ge.clientY - It) > 8 && (Ft = !1);
          },
          Ze = Ge => {
            window.removeEventListener("pointermove", We), window.removeEventListener("pointerup", Ze), window.removeEventListener("pointercancel", Ze), Ft && (Math.hypot(Ge.clientX - it, Ge.clientY - It) > 8 || Te());
          };
        window.addEventListener("pointermove", We), window.addEventListener("pointerup", Ze), window.addEventListener("pointercancel", Ze);
      },
      Le = r ? "bg-white text-black border-white" : "bg-zinc-900 text-white border-zinc-900",
      Ke = r ? "border-white/20 text-white/90 hover:bg-white/5" : "border-zinc-300 text-zinc-800 hover:bg-zinc-50",
      Xe = `text-xs shrink-0 w-[4.5rem] ${r ? "text-white/70" : "text-zinc-500"}`,
      De = () => {
        if (F || !G) return null;
        const Ve = $g(V);
        return c.jsxs("label", {
          className: `sketch-chat-web-chip${r ? " sketch-chat-web-chip--dark" : ""}`,
          onMouseDown: it => it.stopPropagation(),
          title: Jk(V),
          children: [c.jsx("input", {
            type: "checkbox",
            checked: j,
            onChange: it => {
              const It = it.target.checked;
              B(It), Me({
                genUseAliyunOss: It
              });
            },
            className: "h-3 w-3 cursor-pointer"
          }), c.jsx("span", {
            className: "whitespace-nowrap",
            title: x(Ve),
            children: x(Ve)
          })]
        });
      },
      Ye = xe ? _c(xe) || xe : "";
    return c.jsxs("div", {
      ref: ge,
      className: "relative w-full h-full",
      children: [c.jsx("input", {
        ref: D,
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange: Ve => {
          var It;
          const it = (It = Ve.target.files) == null ? void 0 : It[0];
          Ve.target.value = "", Re(it);
        }
      }), c.jsx("input", {
        ref: U,
        type: "file",
        accept: "video/*",
        className: "hidden",
        onChange: Ve => {
          var It;
          const it = (It = Ve.target.files) == null ? void 0 : It[0];
          Ve.target.value = "", $e(it);
        }
      }), c.jsxs("div", {
        "data-video-relight-preview": !0,
        className: `relative w-full h-full rounded-2xl overflow-hidden border cursor-pointer ${Sp(r)}`,
        onPointerDown: ze,
        children: [Ye ? c.jsx("div", {
          className: "flex h-full w-full min-h-0 min-w-0 items-center justify-center overflow-hidden",
          children: c.jsx("video", {
            src: Ye,
            muted: !0,
            playsInline: !0,
            preload: "metadata",
            className: "max-h-full max-w-full object-contain"
          })
        }) : c.jsxs("div", {
          className: `absolute inset-0 flex flex-col items-center justify-center gap-2 px-3 text-center text-xs ${r ? "text-white/55" : "text-zinc-500"}`,
          children: [c.jsx(AD, {
            size: 22,
            className: "opacity-70"
          }), c.jsx("span", {
            children: x("配置参数生成光照重置视频")
          })]
        }), A && m && c.jsx("div", {
          "data-compact-gen-progress-layer": !0,
          className: `absolute inset-0 z-[60] overflow-hidden pointer-events-none transition-opacity duration-400 ease-out ${b && !f ? "opacity-0" : "opacity-100"}`,
          onTransitionEnd: Ve => {
            Ve.propertyName === "opacity" && b && !f && v(!1);
          },
          "aria-hidden": !0,
          children: c.jsx(Yv, {
            seed: e.id,
            progressFillRef: _,
            progressThinBarRef: w,
            isDark: r
          })
        }), e.errorMsg || S ? c.jsx("div", {
          className: "absolute bottom-2 left-2 right-2 z-20 rounded-lg bg-black/55 px-2 py-1 text-[11px] text-red-300",
          children: e.errorMsg || S
        }) : null]
      }), c.jsx("div", {
        ref: _e,
        "data-gen-prompt-panel": "true",
        className: I ? wD : "hidden",
        style: {
          width: `min(${hyn}px, 90vw)`,
          maxWidth: `min(${hyn}px, 90vw)`,
          boxSizing: "border-box",
          ...Ae.style
        },
        onMouseDown: Ve => {
          Ve.stopPropagation(), zb(e.id, u, h, 500, {
            forceSingle: !0
          });
        },
        children: c.jsxs("div", {
          ref: ke,
          className: `rounded-2xl border p-3 ${r ? "border-white/15 bg-[#1f1f1f] text-white" : "border-zinc-200 bg-white text-zinc-900"}`,
          style: {
            transition: "none",
            width: "100%"
          },
          children: [c.jsx("div", {
            className: "mb-3 flex items-start justify-between gap-2",
            children: c.jsxs("div", {
              className: "min-w-0",
              children: [c.jsx("div", {
                className: "flex items-center gap-2",
                children: c.jsx("span", {
                  className: `inline-flex h-7 items-center rounded-md border px-2.5 text-xs font-medium ${r ? "border-white/20 bg-[#121212] text-white" : "border-zinc-300 bg-white text-zinc-900"}`,
                  children: x("光照重置")
                })
              }), c.jsx("p", {
                className: `mt-1.5 text-[11px] leading-relaxed ${r ? "text-white/45" : "text-zinc-500"}`,
                children: x(Y === "relight" ? "用参考图的光照重新打光，保留人物身份与动作" : "用参考图改场景、光影与风格，保留人物身份与动作")
              })]
            })
          }), c.jsxs("div", {
            className: "grid grid-cols-2 gap-2",
            children: [c.jsxs("button", {
              type: "button",
              onClick: Ve => {
                var it;
                Ve.preventDefault(), Ve.stopPropagation(), (it = D.current) == null || it.click();
              },
              className: `rounded-xl border p-2.5 min-h-[96px] flex flex-col text-left transition-colors ${ye ? r ? "border-white/25 bg-white/[0.04] hover:bg-white/[0.07]" : "border-zinc-300 bg-zinc-50 hover:bg-zinc-100" : r ? "border-dashed border-white/20 bg-black/20 hover:bg-white/[0.04]" : "border-dashed border-zinc-300 bg-zinc-50/80 hover:bg-zinc-100"}`,
              children: [c.jsx("div", {
                className: `text-[10px] font-medium mb-1.5 ${r ? "text-white/55" : "text-zinc-500"}`,
                children: x("① 参考图")
              }), ye ? c.jsx("img", {
                src: we,
                alt: x("参考图"),
                className: "w-full h-14 object-cover rounded-lg pointer-events-none",
                draggable: !1
              }) : c.jsxs("div", {
                className: `flex-1 flex flex-col items-center justify-center gap-1 text-[11px] text-center px-1 ${r ? "text-white/40" : "text-zinc-400"}`,
                children: [c.jsx(lo, {
                  size: 18,
                  className: "opacity-70"
                }), c.jsx("span", {
                  children: x("从左侧连入或点击上传")
                })]
              })]
            }), c.jsxs("button", {
              type: "button",
              onClick: Ve => {
                var it;
                Ve.preventDefault(), Ve.stopPropagation(), (it = U.current) == null || it.click();
              },
              className: `rounded-xl border p-2.5 min-h-[96px] flex flex-col text-left transition-colors ${ae ? r ? "border-white/25 bg-white/[0.04] hover:bg-white/[0.07]" : "border-zinc-300 bg-zinc-50 hover:bg-zinc-100" : r ? "border-dashed border-white/20 bg-black/20 hover:bg-white/[0.04]" : "border-dashed border-zinc-300 bg-zinc-50/80 hover:bg-zinc-100"}`,
              children: [c.jsx("div", {
                className: `text-[10px] font-medium mb-1.5 ${r ? "text-white/55" : "text-zinc-500"}`,
                children: x("② 源视频")
              }), ae ? QM(Z) ? c.jsx("video", {
                src: _c(Z) || Z,
                muted: !0,
                playsInline: !0,
                preload: "metadata",
                className: "w-full h-14 object-cover rounded-lg pointer-events-none"
              }) : c.jsx("img", {
                src: Z,
                alt: x("源视频"),
                className: "w-full h-14 object-cover rounded-lg pointer-events-none",
                draggable: !1
              }) : c.jsxs("div", {
                className: `flex-1 flex flex-col items-center justify-center gap-1 text-[11px] text-center px-1 ${r ? "text-white/40" : "text-zinc-400"}`,
                children: [c.jsx(Oo, {
                  size: 18,
                  className: "opacity-70"
                }), c.jsx("span", {
                  children: x("点击上传或从左侧连入")
                })]
              })]
            })]
          }), c.jsx("textarea", {
            "data-scrollable": "true",
            value: e.prompt || "",
            onChange: Ve => a(e.id, {
              prompt: Ve.target.value
            }),
            placeholder: x(Y === "relight" ? "可选：描述目标光照，例如金色夕阳光从左侧打来" : "描述重绘后的场景、光影与风格"),
            className: `mt-2.5 w-full h-14 text-[10px] p-2.5 rounded-xl border outline-none resize-none overflow-y-auto rh-scroll-minimal custom-scrollbar placeholder:text-[9px] ${r ? "bg-black/20 border-white/15 text-white placeholder:text-white/20" : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400"}`,
            onMouseDown: Ve => Ve.stopPropagation()
          }), c.jsxs("div", {
            className: "mt-2.5 flex items-center gap-1.5",
            children: [c.jsx("div", {
              className: "flex flex-1 gap-1 min-w-0",
              children: [{
                value: "restyle",
                label: "风格重绘"
              }, {
                value: "relight",
                label: "光照重置"
              }].map(({
                value: Ve,
                label: it
              }) => c.jsx("button", {
                type: "button",
                onClick: () => Me({
                  idV2vMode: Ve
                }),
                className: `flex-1 h-7 rounded-md text-[11px] border transition-colors ${Y === Ve ? Le : Ke}`,
                children: it
              }, Ve))
            }), c.jsx("div", {
              className: `w-px h-4 shrink-0 ${r ? "bg-white/15" : "bg-zinc-200"}`,
              "aria-hidden": !0
            }), c.jsx("div", {
              className: "flex gap-1 shrink-0",
              children: xLn.map(Ve => c.jsx("button", {
                type: "button",
                onClick: () => Me({
                  idV2vResolution: Ve
                }),
                className: `h-7 px-2 rounded-md text-[11px] border transition-colors ${K === Ve ? Le : Ke}`,
                children: Ve.toUpperCase()
              }, Ve))
            })]
          }), c.jsxs("button", {
            type: "button",
            onClick: () => T(Ve => !Ve),
            className: `mt-2.5 w-full flex items-center justify-between h-8 px-2 rounded-lg text-[11px] ${r ? "text-white/50 hover:bg-white/5 hover:text-white/70" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700"}`,
            children: [c.jsx("span", {
              children: x("更多设置")
            }), c.jsx(Mi, {
              size: 14,
              className: `transition-transform ${M ? "rotate-180" : ""}`
            })]
          }), M ? c.jsxs("div", {
            className: `mt-1 space-y-2 rounded-xl border border-dashed p-2.5 ${r ? "border-white/15" : "border-zinc-200"}`,
            children: [Y === "restyle" ? c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx("span", {
                className: Xe,
                children: x("分割主体")
              }), c.jsx("input", {
                type: "text",
                value: de,
                onChange: Ve => Me({
                  idV2vSegmentationPrompt: Ve.target.value
                }),
                className: `flex-1 h-7 rounded-md border px-2 text-[11px] outline-none ${r ? "bg-black/20 border-white/15 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"}`,
                onMouseDown: Ve => Ve.stopPropagation()
              })]
            }) : null, c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx("span", {
                className: Xe,
                children: x("输出帧数")
              }), c.jsx("input", {
                type: "number",
                min: 17,
                max: 241,
                value: W,
                onChange: Ve => Me({
                  idV2vNumFrames: rQ(Ve.target.value),
                  idV2vNumFramesUserSet: !0,
                  idV2vNumFramesSource: X
                }),
                className: `flex-1 h-7 rounded-md border px-2 text-[11px] outline-none ${r ? "bg-black/20 border-white/15 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"}`,
                onMouseDown: Ve => Ve.stopPropagation()
              })]
            }), c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx("span", {
                className: Xe,
                children: x("采样步数")
              }), c.jsx("input", {
                type: "number",
                min: 2,
                max: 40,
                value: Q,
                onChange: Ve => Me({
                  idV2vNumInferenceSteps: u2e(Ve.target.value)
                }),
                className: `flex-1 h-7 rounded-md border px-2 text-[11px] outline-none ${r ? "bg-black/20 border-white/15 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"}`,
                onMouseDown: Ve => Ve.stopPropagation()
              })]
            }), c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx("span", {
                className: Xe,
                children: x("引导强度")
              }), c.jsx("input", {
                type: "number",
                min: 1,
                max: 10,
                step: .5,
                value: q,
                onChange: Ve => Me({
                  idV2vGuidanceScale: h2e(Ve.target.value)
                }),
                className: `flex-1 h-7 rounded-md border px-2 text-[11px] outline-none ${r ? "bg-black/20 border-white/15 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"}`,
                onMouseDown: Ve => Ve.stopPropagation()
              })]
            }), c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx("span", {
                className: Xe,
                children: x("结构约束")
              }), c.jsx("input", {
                type: "number",
                min: 0,
                max: 2,
                step: .1,
                value: ne,
                onChange: Ve => Me({
                  idV2vVaceScale: p2e(Ve.target.value)
                }),
                className: `flex-1 h-7 rounded-md border px-2 text-[11px] outline-none ${r ? "bg-black/20 border-white/15 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"}`,
                onMouseDown: Ve => Ve.stopPropagation()
              })]
            }), c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx("span", {
                className: Xe,
                children: x("随机种子")
              }), c.jsx("input", {
                type: "number",
                value: le == null || le === "" ? "" : Number(le),
                placeholder: x("可选"),
                onChange: Ve => {
                  const it = Ve.target.value.trim();
                  Me({
                    idV2vSeed: it === "" ? void 0 : Number(it)
                  });
                },
                className: `flex-1 h-7 rounded-md border px-2 text-[11px] outline-none ${r ? "bg-black/20 border-white/15 text-white placeholder:text-white/20" : "bg-zinc-50 border-zinc-200 text-zinc-900"}`,
                onMouseDown: Ve => Ve.stopPropagation()
              })]
            })]
          }) : null, e.errorMsg || S ? c.jsx("div", {
            className: "mt-2 text-[11px] text-red-400",
            children: e.errorMsg || S
          }) : null, c.jsxs("div", {
            className: "mt-3 flex items-center justify-end gap-2",
            children: [De(), c.jsx("button", {
              type: "button",
              disabled: !be,
              title: x("开始光照重置"),
              "aria-label": x("开始光照重置"),
              onClick: Ve => {
                Ve.stopPropagation(), nt();
              },
              className: `flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-opacity active:scale-95 ${be ? "bg-white text-black hover:opacity-90" : r ? "cursor-not-allowed bg-white/25 text-black/40" : "cursor-not-allowed bg-zinc-300 text-zinc-500"}`,
              children: f ? c.jsx(Ua, {
                size: 16,
                className: "animate-spin",
                strokeWidth: 2.5
              }) : c.jsx(Gc, {
                size: 16,
                strokeWidth: 2.5
              })
            })]
          })]
        })
      })]
    });
  },
  jwo = {
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
    "fast-forward": QEn,
    rewind: wTn,
    "corner-up-right": HEn,
    "corner-right-down": VEn,
    "refresh-cw": bd,
    box: Hm,
    "maximize-2": Wm,
    "zoom-in": Z$,
    "refresh-ccw": vEt,
    clock: AP,
    "navigation-2": mTn,
    plane: gTn,
    smartphone: CTn,
    "git-branch": hEt,
    cpu: XHe,
    video: Oo
  },
  Dwo = ({
    node: e,
    nodes: t,
    connections: n,
    isDark: r,
    updateNode: a
  }) => {
    var v;
    on();
    const i = () => {
        const _ = n.find(k => k.from === e.id);
        if (!_) return null;
        const w = t.find(k => k.id === _.to);
        return w && (w.type === "gen-image" || w.type === "gen-video") ? w : null;
      },
      o = _ => {
        const w = i();
        if (w) {
          const k = document.querySelector(`div[contenteditable][data-node-id="${w.id}"]`);
          let A = "";
          if (k) {
            const C = I => {
              let E = "";
              return I.childNodes.forEach(M => {
                if (M.nodeType === Node.TEXT_NODE) E += M.textContent || "";else if (M.nodeType === Node.ELEMENT_NODE) {
                  const T = M;
                  if (T.hasAttribute("data-tag")) {
                    const P = T.getAttribute("data-tag-content") || "";
                    E += `【${P}】`;
                  } else T.tagName === "BR" ? E += `
` : T.tagName === "DIV" ? E += `
` + C(T) : E += T.textContent || "";
                }
              }), E;
            };
            A = C(k);
          } else A = w.prompt || "";
          const S = `【${_}】`;
          if (!A.includes(S)) {
            let C,
              I = A.length;
            if (k && k.dataset.cursorPos) {
              const R = parseInt(k.dataset.cursorPos, 10);
              !isNaN(R) && R >= 0 && R <= A.length && (I = R);
            } else if (k && document.activeElement === k) try {
              const R = window.getSelection();
              if (R && R.rangeCount > 0) {
                const j = R.getRangeAt(0),
                  B = j.cloneRange();
                B.selectNodeContents(k), B.setEnd(j.endContainer, j.endOffset), I = B.toString().length;
              }
            } catch (R) {
              console.warn("[CameraMovement] 获取光标位置失败:", R);
            }
            const E = A.slice(0, I),
              M = A.slice(I),
              T = E.length > 0 && !E.endsWith(" "),
              P = M.length > 0 && !M.startsWith(" ");
            if (C = E + (T ? " " : "") + S + (P ? " " : "") + M, a(w.id, {
              prompt: C
            }), k) {
              const R = I + S.length + (T ? 1 : 0) + (P ? 1 : 0);
              k.dataset.cursorPos = String(R);
            }
          }
        }
      },
      s = _ => {
        const w = i();
        if (w) {
          const k = w.prompt || "",
            A = `【${_}】`;
          if (k.includes(A)) {
            let S = k.replace(A, "");
            S = S.replace(/\s+/g, " ").trim(), a(w.id, {
              prompt: S
            });
          }
        }
      },
      l = ((v = e.settings) == null ? void 0 : v.movementConfig) || {
        movementId: null,
        directionId: null,
        angleId: null,
        speedId: null,
        styleId: null,
        deviceId: null
      },
      d = _ => {
        const w = l[_];
        return w ? typeof w == "string" ? [w] : Array.isArray(w) ? w : [] : [];
      },
      u = (_, w) => d(_).includes(w),
      h = i(),
      p = (h == null ? void 0 : h.prompt) || "";
    g.useEffect(() => {
      if (!h) return;
      const _ = p,
        w = [{
          key: "movementId",
          items: Xde,
          title: "机位运动"
        }, {
          key: "directionId",
          items: Jde,
          title: "运动方向"
        }, {
          key: "angleId",
          items: Zde,
          title: "机位角度"
        }, {
          key: "speedId",
          items: eue,
          title: "速度/幅度"
        }, {
          key: "styleId",
          items: tue,
          title: "经典风格"
        }, {
          key: "deviceId",
          items: nue,
          title: "模拟设备"
        }];
      let k = !1;
      const A = {
        ...l
      };
      for (const {
        key: S,
        items: C,
        title: I
      } of w) {
        const E = d(S);
        if (E.length > 0) {
          const M = E.filter(T => {
            const P = C.find(R => R.id === T);
            if (P) {
              const R = `【${I}：${P.name}】`;
              return _.includes(R);
            }
            return !1;
          });
          M.length !== E.length && (A[S] = M.length > 0 ? M : null, k = !0);
        }
      }
      k && a(e.id, {
        settings: {
          ...e.settings,
          movementConfig: A
        },
        content: QQ(A)
      });
    }, [p, l, e.id, e.settings, a]);
    const m = (_, w, k) => {
        if (!w || !k) return;
        const A = d(_),
          S = A.includes(w);
        let C;
        S ? (C = A.filter(E => E !== w), s(k)) : (C = [...A, w], o(k));
        const I = {
          ...l,
          [_]: C.length > 0 ? C : null
        };
        a(e.id, {
          settings: {
            ...e.settings,
            movementConfig: I
          },
          content: QQ(I)
        });
      },
      f = (_, w, k, A) => {
        const S = jwo[_.icon] || Oo,
          C = u(w, _.id),
          I = C && r ? "border-white/50 bg-white/5 ring-1 ring-white/30" : C ? `border-${A}-500 bg-${A}-500/20 ring-1 ring-${A}-500/50` : r ? "border-zinc-700/50 bg-zinc-800/50 hover:border-zinc-600 hover:bg-zinc-700/50" : "border-zinc-300 bg-zinc-100 hover:border-zinc-400 hover:bg-zinc-200",
          E = C && r ? "text-white/80" : C ? `text-${A}-400` : r ? "text-zinc-400" : "text-zinc-600",
          M = C && r ? "text-white/80" : C ? `text-${A}-400` : r ? "text-zinc-500" : "text-zinc-600";
        return c.jsxs("button", {
          onMouseDown: T => T.stopPropagation(),
          onClick: () => k(_.id),
          className: `flex flex-col items-center justify-center p-1.5 rounded-lg border min-w-[52px] ${I}`,
          title: `${_.name} (${_.nameEn})`,
          children: [c.jsx(S, {
            size: 16,
            className: E
          }), c.jsx("span", {
            className: `text-[9px] mt-0.5 leading-tight ${M}`,
            children: _.name
          })]
        }, _.id);
      },
      y = (_, w, k, A, S) => c.jsxs("div", {
        className: "mb-3",
        children: [c.jsxs("div", {
          className: `text-[10px] mb-1.5 flex items-center gap-1 ${r ? "text-zinc-500" : "text-zinc-600"}`,
          children: [c.jsx("span", {
            className: "font-medium",
            children: _
          }), c.jsxs("span", {
            className: "text-[8px] opacity-60",
            children: ["(", w, ")"]
          })]
        }), c.jsx("div", {
          className: "flex gap-1 overflow-x-auto pb-2 director-scrollbar",
          children: k.map(C => f(C, A, I => m(A, I, `${_}：${C.name}`), S))
        })]
      });
    gao(l);
    const b = QQ(l);
    return c.jsxs("div", {
      className: `h-full flex flex-col ${r ? "bg-[#1f1f1f]" : "bg-white"}`,
      children: [c.jsxs("div", {
        className: "flex-1 overflow-y-auto p-2 space-y-1 hide-scrollbar",
        children: [y("机位运动", "Movement", Xde, "movementId", "cyan"), y("运动方向", "Direction", Jde, "directionId", "blue"), y("机位角度", "Angle", Zde, "angleId", "purple"), y("速度/幅度", "Speed", eue, "speedId", "green"), y("经典风格", "Style", tue, "styleId", "amber"), y("模拟设备", "Device", nue, "deviceId", "rose")]
      }), b && c.jsxs("div", {
        className: `px-2 py-1.5 border-t ${r ? "border-zinc-800 bg-zinc-800/50" : "border-zinc-200 bg-zinc-50"}`,
        children: [c.jsx("div", {
          className: `text-[9px] mb-0.5 ${r ? "text-zinc-500" : "text-zinc-600"}`,
          children: x("生成的运镜提示词:")
        }), c.jsx("div", {
          className: "text-[10px] text-cyan-400 font-mono leading-relaxed break-all",
          children: b
        })]
      })]
    });
  },
  Lwo = Dwo,
  Owo = e => {
    const t = [],
      n = w2.find(o => o.id === e.cameraId),
      r = x2.find(o => o.id === e.lensId),
      a = _2.find(o => o.id === e.focalLengthId),
      i = k2.find(o => o.id === e.apertureId);
    return n && t.push(`[${n.name}]`), r && t.push(`[${r.name}]`), a && t.push(`[${a.value}mm]`), i && t.push(`[${i.value}]`), t.join(" + ");
  },
  Bwo = ({
    node: e,
    isDark: t,
    updateNode: n
  }) => {
    var d;
    on();
    const r = ((d = e.settings) == null ? void 0 : d.cinemaConfig) || {
        cameraId: null,
        lensId: null,
        focalLengthId: null,
        apertureId: null
      },
      a = u => {
        n(e.id, {
          settings: {
            ...e.settings,
            cinemaConfig: u
          },
          content: yAe(u)
        });
      },
      i = u => {
        a({
          ...r,
          cameraId: r.cameraId === u ? null : u
        });
      },
      o = u => {
        a({
          ...r,
          lensId: r.lensId === u ? null : u
        });
      },
      s = u => {
        a({
          ...r,
          focalLengthId: r.focalLengthId === u ? null : u
        });
      },
      l = u => {
        a({
          ...r,
          apertureId: r.apertureId === u ? null : u
        });
      };
    return w2.find(u => u.id === r.cameraId), x2.find(u => u.id === r.lensId), _2.find(u => u.id === r.focalLengthId), k2.find(u => u.id === r.apertureId), Owo(r), yAe(r), c.jsx("div", {
      className: `h-full flex flex-col ${t ? "bg-[#1f1f1f]" : "bg-white"}`,
      children: c.jsxs("div", {
        className: "flex-1 overflow-y-auto p-2 space-y-3 hide-scrollbar",
        children: [c.jsxs("div", {
          children: [c.jsxs("div", {
            className: `text-[10px] mb-1.5 flex items-center gap-1 ${t ? "text-zinc-500" : "text-zinc-600"}`,
            children: [c.jsx(Kh, {
              size: 10,
              className: t ? "text-white/60" : "text-blue-400"
            }), c.jsx("span", {
              className: "font-medium",
              children: x("摄像机")
            }), c.jsxs("span", {
              className: "text-[8px] opacity-60",
              children: ["(", w2.length, x("款)")]
            })]
          }), c.jsx("div", {
            className: "flex gap-1.5 overflow-x-auto pb-2 director-scrollbar",
            children: w2.map(u => c.jsxs("div", {
              onMouseDown: h => h.stopPropagation(),
              onClick: () => i(u.id),
              className: `flex-shrink-0 w-16 cursor-pointer rounded-lg overflow-hidden border ${r.cameraId === u.id ? t ? "border-white/50 ring-1 ring-white/30" : "border-blue-500 ring-1 ring-blue-500/30" : t ? "border-zinc-700/50 hover:border-zinc-600" : "border-zinc-300 hover:border-zinc-400"}`,
              children: [c.jsx("div", {
                className: `w-16 h-16 flex items-center justify-center overflow-hidden ${r.cameraId === u.id && t ? "bg-white/5" : t ? "bg-zinc-800" : "bg-zinc-100"}`,
                children: c.jsx("img", {
                  src: `/cinema/${u.image}`,
                  alt: x(u.name),
                  className: "w-full h-full object-cover",
                  onError: h => {
                    h.target.style.display = "none";
                  }
                })
              }), c.jsx("div", {
                className: `p-1 text-center ${r.cameraId === u.id && t ? "bg-white/5" : t ? "bg-zinc-800/80" : "bg-zinc-100"}`,
                children: c.jsx("span", {
                  className: `text-[9px] font-medium ${t ? "text-white" : "text-zinc-900"}`,
                  children: x(u.name)
                })
              })]
            }, u.id))
          })]
        }), c.jsxs("div", {
          children: [c.jsxs("div", {
            className: `text-[10px] mb-1.5 flex items-center gap-1 ${t ? "text-zinc-500" : "text-zinc-600"}`,
            children: [c.jsx(kS, {
              size: 10,
              className: t ? "text-white/60" : "text-purple-400"
            }), c.jsx("span", {
              className: "font-medium",
              children: x("镜头")
            }), c.jsxs("span", {
              className: "text-[8px] opacity-60",
              children: ["(", x2.length, x("款)")]
            })]
          }), c.jsx("div", {
            className: "flex gap-1.5 overflow-x-auto pb-2 director-scrollbar",
            children: x2.map(u => c.jsxs("div", {
              onMouseDown: h => h.stopPropagation(),
              onClick: () => o(u.id),
              className: `flex-shrink-0 w-14 cursor-pointer rounded-lg overflow-hidden border ${r.lensId === u.id ? t ? "border-white/50 ring-1 ring-white/30" : "border-purple-500 ring-1 ring-purple-500/30" : t ? "border-zinc-700/50 hover:border-zinc-600" : "border-zinc-300 hover:border-zinc-400"}`,
              children: [c.jsx("div", {
                className: `w-14 h-14 flex items-center justify-center overflow-hidden ${r.lensId === u.id && t ? "bg-white/5" : t ? "bg-zinc-800" : "bg-zinc-100"}`,
                children: c.jsx("img", {
                  src: `/cinema/${u.image}`,
                  alt: u.name,
                  className: "w-full h-full object-cover",
                  onError: h => {
                    h.target.style.display = "none";
                  }
                })
              }), c.jsx("div", {
                className: `p-0.5 text-center ${r.lensId === u.id && t ? "bg-white/5" : t ? "bg-zinc-800/80" : "bg-zinc-100"}`,
                children: c.jsx("span", {
                  className: `text-[8px] font-medium block leading-tight ${t ? "text-white" : "text-zinc-900"}`,
                  children: u.name
                })
              })]
            }, u.id))
          })]
        }), c.jsxs("div", {
          children: [c.jsxs("div", {
            className: `text-[10px] mb-1.5 flex items-center gap-1 ${t ? "text-zinc-500" : "text-zinc-600"}`,
            children: [c.jsx(Xle, {
              size: 10,
              className: t ? "text-white/60" : "text-green-400"
            }), c.jsx("span", {
              className: "font-medium",
              children: x("焦段")
            }), c.jsxs("span", {
              className: "text-[8px] opacity-60",
              children: ["(", _2.length, x("个)")]
            })]
          }), c.jsx("div", {
            className: "flex gap-1.5 flex-wrap",
            children: _2.map(u => c.jsxs("div", {
              onMouseDown: h => h.stopPropagation(),
              onClick: () => s(u.id),
              className: `w-12 h-12 cursor-pointer rounded-lg border flex flex-col items-center justify-center ${r.focalLengthId === u.id ? t ? "border-white/50 ring-1 ring-white/30 bg-white/5" : "border-green-500 ring-1 ring-green-500/30 bg-green-500/10" : t ? "border-zinc-700/50 hover:border-zinc-600 bg-zinc-800/50" : "border-zinc-300 hover:border-zinc-400 bg-zinc-100"}`,
              children: [c.jsx("span", {
                className: `text-base font-bold ${r.focalLengthId === u.id ? t ? "text-white/90" : "text-green-400" : t ? "text-white" : "text-zinc-900"}`,
                children: u.value
              }), c.jsx("span", {
                className: `text-[8px] ${t ? "text-zinc-500" : "text-zinc-600"}`,
                children: "mm"
              })]
            }, u.id))
          })]
        }), c.jsxs("div", {
          children: [c.jsxs("div", {
            className: `text-[10px] mb-1.5 flex items-center gap-1 ${t ? "text-zinc-500" : "text-zinc-600"}`,
            children: [c.jsx(kS, {
              size: 10,
              className: t ? "text-white/60" : "text-orange-400"
            }), c.jsx("span", {
              className: "font-medium",
              children: x("光圈")
            }), c.jsxs("span", {
              className: "text-[8px] opacity-60",
              children: ["(", k2.length, x("个)")]
            })]
          }), c.jsx("div", {
            className: "flex gap-1.5 overflow-x-auto pb-2 director-scrollbar",
            children: k2.map(u => c.jsxs("div", {
              onMouseDown: h => h.stopPropagation(),
              onClick: () => l(u.id),
              className: `flex-shrink-0 w-16 cursor-pointer rounded-lg overflow-hidden border ${r.apertureId === u.id ? t ? "border-white/50 ring-1 ring-white/30" : "border-orange-500 ring-1 ring-orange-500/30" : t ? "border-zinc-700/50 hover:border-zinc-600" : "border-zinc-300 hover:border-zinc-400"}`,
              children: [c.jsx("div", {
                className: `w-16 h-16 flex items-center justify-center overflow-hidden ${r.apertureId === u.id && t ? "bg-white/5" : t ? "bg-zinc-800" : "bg-zinc-100"}`,
                children: c.jsx("img", {
                  src: `/cinema/${u.image}`,
                  alt: u.value,
                  className: "w-full h-full object-cover",
                  onError: h => {
                    h.target.style.display = "none";
                  }
                })
              }), c.jsx("div", {
                className: `p-1 text-center ${r.apertureId === u.id && t ? "bg-white/5" : t ? "bg-zinc-800/80" : "bg-zinc-100"}`,
                children: c.jsx("span", {
                  className: `text-[9px] font-medium ${t ? "text-white" : "text-zinc-900"}`,
                  children: u.value
                })
              })]
            }, u.id))
          })]
        })]
      })
    });
  },
  Fwo = g.memo(Bwo),
  e1r = ({
    wrapperClass: e,
    wrapperStyle: t,
    scrollContainerRef: n,
    showExpandButton: r,
    expandButton: a,
    isOverflowing: i = !1,
    children: o,
    onWheel: s,
    onTransitionEnd: l
  }) => c.jsxs("div", {
    className: e,
    style: t,
    onTransitionEnd: l,
    children: [r ? c.jsx("div", {
      className: "flex h-7 shrink-0 items-center justify-end pr-0.5",
      children: a
    }) : null, c.jsx("div", {
      ref: n,
      "data-scrollable": "true",
      "data-has-overflow": i ? "true" : "false",
      className: cZe,
      style: {
        overscrollBehavior: "contain"
      },
      onWheel: s,
      children: o
    })]
  }),
  Z$e = ({
    open: e,
    anchorRef: t,
    isDark: n,
    menuWidth: r = 280,
    maxHeight: a = 320,
    scrollKey: i,
    header: o,
    children: s
  }) => {
    const l = g.useRef(null),
      d = o != null,
      u = g.useCallback(() => {
        const p = t.current,
          m = l.current;
        if (!p || !m || !e || typeof window > "u") return;
        const f = p.getBoundingClientRect(),
          y = 4,
          v = f.top - y - 8;
        m.style.position = "fixed", m.style.left = `${f.left}px`, m.style.width = `${r}px`, m.style.minWidth = `${r}px`, m.style.maxWidth = `${r}px`, m.style.zIndex = "10050", m.style.top = "", m.style.bottom = `${window.innerHeight - f.top + y}px`;
        const _ = Math.min(Math.max(v, 120), a);
        m.style.maxHeight = `${_}px`, m.style.height = d ? `${_}px` : "";
      }, [t, d, a, r, e]);
    if (g.useLayoutEffect(() => {
      if (!e) return;
      u();
      let p = 0;
      const m = () => {
        u(), p = requestAnimationFrame(m);
      };
      return p = requestAnimationFrame(m), () => cancelAnimationFrame(p);
    }, [e, u]), g.useLayoutEffect(() => {
      e && P3(l.current);
    }, [e, i]), !e || typeof document > "u") return null;
    const h = o != null;
    return Da.createPortal(c.jsxs("div", {
      ref: l,
      "data-gen-node-portal-dropdown": "true",
      className: `node-dropdown-menu rounded-2xl shadow-xl p-1 border overscroll-contain scrollbar-hide ${h ? "flex min-h-0 flex-col overflow-hidden" : "overflow-y-auto"} ${n ? "bg-[#1f1f1f] border-zinc-700" : "bg-white border-zinc-200"}`,
      onPointerDown: p => p.stopPropagation(),
      onMouseDown: p => p.stopPropagation(),
      onWheel: p => p.stopPropagation(),
      children: [h ? c.jsx("div", {
        className: "shrink-0",
        children: o
      }) : null, h ? c.jsx("div", {
        "data-dropdown-list-scroll": !0,
        "data-scrollable": "true",
        className: "min-h-0 flex-1 overflow-y-auto overscroll-contain scrollbar-hide",
        children: s
      }) : s]
    }), document.body);
  },
  zwo = {
    speech: Q2,
    music: Qh,
    sfx: B5
  };

function Uwo(e, t) {
  return `flex w-full items-center gap-2 rounded-[12px] p-2 text-left transition-colors ${e ? `hover:bg-white/5 text-white ${t ? "bg-white/10" : ""}` : `hover:bg-zinc-100 text-zinc-900 ${t ? "bg-zinc-100" : ""}`}`;
}

function $wo(e, t) {
  return `flex w-full items-center gap-2 rounded-[12px] p-2 text-left text-xs transition-colors ${e ? `hover:bg-zinc-800 text-zinc-300 ${t ? "bg-zinc-800 text-white" : ""}` : `hover:bg-zinc-100 text-zinc-700 ${t ? "bg-zinc-100 text-zinc-900" : ""}`}`;
}

const t1r = ({
  node: e,
  isDark: t,
  apiConfigs: n,
  updateNode: r,
  disabled: a = !1,
  activeDropdown: i,
  setActiveDropdown: o,
  dropdownBtnClass: s
}) => {
  var I;
  on();
  const l = g.useRef(null),
    d = g.useRef(null),
    u = g.useMemo(() => ZDn(n), [n]),
    h = g.useMemo(() => u.map(E => {
      const M = n.find(T => T.id === E.id);
      return {
        ...E,
        provider: M == null ? void 0 : M.provider,
        url: M == null ? void 0 : M.url
      };
    }), [n, u]),
    {
      visibleModels: p,
      selectedChannel: m,
      onSelectChannel: f,
      menuWidth: y,
      showHaiyiChannel: b
    } = lpa(h),
    v = JDn(e),
    _ = Ttt.find(E => E.id === v) || Ttt[1],
    w = String(((I = e.settings) == null ? void 0 : I.model) || ""),
    k = CXr(w, u) || u.find(E => E.scene === v) || u[0],
    A = (i == null ? void 0 : i.nodeId) === e.id && i.type === "audio-model",
    S = (i == null ? void 0 : i.nodeId) === e.id && i.type === "audio-scene",
    C = E => {
      r(e.id, E), o(null);
    };
  return c.jsxs(c.Fragment, {
    children: [c.jsxs("div", {
      className: "relative shrink-0 max-w-[5.5rem] min-w-[4.5rem]",
      "data-model-select-area": !0,
      children: [c.jsxs("button", {
        ref: l,
        type: "button",
        "data-qiaodoumayi-aux-model": "true",
        title: (k == null ? void 0 : k.label) || x("选择模型"),
        disabled: a,
        onClick: E => {
          E.preventDefault(), E.stopPropagation(), !a && o(A ? null : {
            nodeId: e.id,
            type: "audio-model"
          });
        },
        onMouseDown: E => {
          E.preventDefault(), E.stopPropagation();
        },
        className: `${s} node-dropdown-button flex h-8 w-full items-center gap-1 rounded border py-1 pl-1.5 pr-1 text-[10px] transition-colors`,
        children: [c.jsx(Mp, {
          modelId: k == null ? void 0 : k.id,
          kind: (k == null ? void 0 : k.logoKind) || "music",
          isDark: t,
          config: n.find(E => E.id === (k == null ? void 0 : k.id)),
          size: 12,
          fallback: v === "music" ? c.jsx(Qh, {
            size: 12,
            className: "shrink-0 block"
          }) : c.jsx(Q2, {
            size: 12,
            className: "shrink-0 block"
          })
        }), c.jsx("span", {
          className: "truncate font-semibold leading-none self-center",
          children: (k == null ? void 0 : k.shortLabel) || x("模型")
        })]
      }), c.jsx(Z$e, {
        open: A,
        anchorRef: l,
        isDark: t,
        menuWidth: y,
        maxHeight: 420,
        scrollKey: k == null ? void 0 : k.id,
        header: c.jsx(m9, {
          isDark: t,
          selected: m,
          onSelect: f,
          channels: wha,
          showHaiyi: b
        }),
        children: p.length === 0 ? c.jsx("div", {
          className: `px-2 py-3 text-center text-[11px] ${t ? "text-zinc-500" : "text-zinc-400"}`,
          children: x("当前渠道下没有模型")
        }) : p.map(E => {
          const M = (k == null ? void 0 : k.id) === E.id;
          return c.jsx("button", {
            type: "button",
            ...(M ? {
              [Md]: "true"
            } : {}),
            onClick: T => {
              T.stopPropagation(), C(TXr(e, E.id, n));
            },
            className: $wo(t, M),
            children: c.jsxs("div", {
              className: "flex min-w-0 flex-1 items-center gap-1.5",
              children: [c.jsx(Mp, {
                modelId: E.id,
                kind: E.logoKind,
                isDark: t,
                config: n.find(T => T.id === E.id),
                size: 12,
                fallback: E.scene === "music" ? c.jsx(Qh, {
                  size: 12
                }) : c.jsx(Q2, {
                  size: 12
                })
              }), c.jsx("span", {
                className: "truncate font-medium leading-none",
                children: cT(E.label, m)
              })]
            })
          }, E.id);
        })
      })]
    }), c.jsx("div", {
      className: `h-4 w-px shrink-0 ${t ? "bg-white/15" : "bg-zinc-300"}`
    }), c.jsxs("div", {
      className: "relative shrink-0",
      "data-model-select-area": !0,
      children: [c.jsxs("button", {
        ref: d,
        type: "button",
        title: x(_.label),
        disabled: a,
        onClick: E => {
          E.stopPropagation(), !a && o(S ? null : {
            nodeId: e.id,
            type: "audio-scene"
          });
        },
        onMouseDown: E => E.stopPropagation(),
        className: `${s} flex h-8 items-center gap-1 rounded border px-2 text-[10px]`,
        children: [v === "speech" ? c.jsx(Q2, {
          size: 12,
          className: "shrink-0"
        }) : v === "sfx" ? c.jsx(B5, {
          size: 12,
          className: "shrink-0"
        }) : c.jsx(Qh, {
          size: 12,
          className: "shrink-0"
        }), c.jsx("span", {
          className: "max-w-[72px] truncate",
          children: x(_.label)
        })]
      }), c.jsx(Z$e, {
        open: S,
        anchorRef: d,
        isDark: t,
        menuWidth: 260,
        children: Ttt.map(E => {
          const M = E.id === v;
          if (!u.some(P => P.scene === E.id)) return null;
          const T = zwo[E.id];
          return c.jsxs("button", {
            type: "button",
            onClick: P => {
              P.stopPropagation(), C(eLn(e, E.id, n));
            },
            className: Uwo(t, M),
            children: [c.jsx("span", {
              className: `mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${M ? t ? "bg-[#2A2A2A]" : "bg-zinc-200" : t ? "bg-white/5" : "bg-zinc-100"}`,
              children: c.jsx(T, {
                size: 18,
                className: t ? "text-white" : "text-zinc-800"
              })
            }), c.jsxs("span", {
              className: "min-w-0 flex-1",
              children: [c.jsx("div", {
                className: "text-[14px] font-medium leading-tight",
                children: x(E.label)
              }), c.jsx("div", {
                className: `mt-1 text-[12px] leading-tight ${t ? "text-white/50" : "text-zinc-500"}`,
                children: E.desc
              })]
            })]
          }, E.id);
        })
      })]
    })]
  });
};

function Gwo({
  options: e,
  value: t,
  onChange: n,
  disabled: r = !1,
  isDark: a
}) {
  const i = e.findIndex(s => s.value === t),
    o = e.length;
  return c.jsxs("div", {
    className: `relative grid rounded-lg p-0.5 ${a ? "bg-white/10" : "bg-zinc-200/80"} ${r ? "pointer-events-none opacity-50" : ""}`,
    style: {
      gridTemplateColumns: `repeat(${o}, minmax(0, 1fr))`
    },
    children: [i >= 0 ? c.jsx("div", {
      className: `pointer-events-none absolute top-0.5 bottom-0.5 rounded-md transition-all duration-200 ${a ? "bg-white/10" : "bg-white"}`,
      style: {
        left: `calc(${i / o * 100}% + 2px)`,
        width: `calc(${100 / o}% - 4px)`
      }
    }) : null, e.map(s => {
      const l = s.value === t;
      return c.jsx("button", {
        type: "button",
        disabled: r,
        onClick: d => {
          d.stopPropagation(), n(s.value);
        },
        className: `relative z-10 whitespace-nowrap rounded-md px-2 py-1.5 text-center text-sm transition-colors duration-200 ${l ? a ? "text-white" : "text-zinc-900" : a ? "text-white/50 hover:text-white" : "text-zinc-500 hover:text-zinc-800"}`,
        children: s.label
      }, String(s.label));
    })]
  });
}

const Vwo = {
    auto: c.jsx(ac, {
      size: 14,
      className: "shrink-0"
    }),
    custom: c.jsx(Hd, {
      size: 14,
      className: "shrink-0"
    }),
    instrumental: c.jsx(sne, {
      size: 14,
      className: "shrink-0"
    })
  },
  Hwo = ({
    nodeId: e,
    lyricMode: t,
    isDark: n,
    disabled: r = !1,
    dropdownBtnClass: a,
    activeDropdown: i,
    setActiveDropdown: o,
    onChange: s,
    modes: l
  }) => {
    on();
    const d = g.useRef(null),
      u = (i == null ? void 0 : i.nodeId) === e && i.type === "music-lyric-mode",
      h = Cgt.filter(m => !l || l.includes(m.id)),
      p = h.find(m => m.id === t) || h[0] || Cgt[0];
    return c.jsxs("div", {
      className: "relative shrink-0",
      "data-model-select-area": !0,
      children: [c.jsxs("button", {
        ref: d,
        type: "button",
        title: x("歌词模式"),
        disabled: r,
        onClick: m => {
          m.stopPropagation(), !r && o(u ? null : {
            nodeId: e,
            type: "music-lyric-mode"
          });
        },
        onMouseDown: m => m.stopPropagation(),
        className: `${a} flex h-8 items-center gap-1.5 rounded border px-2 text-[10px]`,
        children: [Vwo[t], c.jsx("span", {
          className: "max-w-[72px] truncate",
          children: x(p.label)
        })]
      }), c.jsx(Z$e, {
        open: u,
        anchorRef: d,
        isDark: n,
        menuWidth: 340,
        maxHeight: 220,
        children: c.jsxs("div", {
          className: "flex flex-col gap-1.5 p-2",
          children: [c.jsx("div", {
            className: `px-1 text-xs font-medium ${n ? "text-white/55" : "text-zinc-500"}`,
            children: x("歌词")
          }), c.jsx(Gwo, {
            isDark: n,
            disabled: r,
            value: t,
            options: h.map(m => ({
              value: m.id,
              label: m.label
            })),
            onChange: m => {
              s(m), o(null);
            }
          })]
        })
      })]
    });
  },
  Wwo = ({
    nodeId: e,
    valueSec: t,
    isDark: n,
    disabled: r = !1,
    dropdownBtnClass: a,
    activeDropdown: i,
    setActiveDropdown: o,
    onChange: s,
    minSec: l = 1,
    maxSec: d = Egt
  }) => {
    on();
    const u = g.useRef(null),
      h = g.useRef(null),
      p = (i == null ? void 0 : i.nodeId) === e && i.type === "music-duration",
      m = WKt.some(C => C === t),
      f = typeof t == "number" && !m,
      [y, b] = g.useState(f ? String(t) : ""),
      [v, _] = g.useState(!1);
    g.useEffect(() => {
      v || b(f && t ? String(t) : "");
    }, [v, f, t]);
    const w = C => {
        const I = Number.parseInt(C, 10);
        if (!Number.isFinite(I) || I <= 0) {
          b(""), s(void 0);
          return;
        }
        const E = Math.min(d, Math.max(l, I));
        b(String(E)), s(E);
      },
      k = [{
        value: void 0,
        label: "自动"
      }, ...WKt.map(C => ({
        value: C,
        label: `${C}s`
      }))],
      A = v || f ? k.length : k.findIndex(C => C.value === t),
      S = k.length + 1;
    return c.jsxs("div", {
      className: "relative shrink-0",
      "data-model-select-area": !0,
      children: [c.jsxs("button", {
        ref: u,
        type: "button",
        title: x("时长"),
        disabled: r,
        onClick: C => {
          C.stopPropagation(), !r && o(p ? null : {
            nodeId: e,
            type: "music-duration"
          });
        },
        onMouseDown: C => C.stopPropagation(),
        className: `${a} flex h-8 items-center gap-1.5 rounded border px-2 text-[10px]`,
        children: [c.jsx(AP, {
          size: 14,
          className: "shrink-0"
        }), c.jsx("span", {
          children: MXr(t)
        })]
      }), c.jsx(Z$e, {
        open: p,
        anchorRef: u,
        isDark: n,
        menuWidth: 360,
        maxHeight: 220,
        children: c.jsxs("div", {
          className: "flex flex-col gap-1.5 p-2",
          children: [c.jsx("div", {
            className: `px-1 text-xs font-medium ${n ? "text-white/55" : "text-zinc-500"}`,
            children: x("时长")
          }), c.jsxs("div", {
            className: `relative grid rounded-lg p-0.5 ${n ? "bg-white/10" : "bg-zinc-200/80"} ${r ? "pointer-events-none opacity-50" : ""}`,
            style: {
              gridTemplateColumns: `repeat(${S}, minmax(0, 1fr))`
            },
            children: [A >= 0 ? c.jsx("div", {
              className: `pointer-events-none absolute top-0.5 bottom-0.5 rounded-md transition-all duration-200 ${n ? "bg-white/10" : "bg-white"}`,
              style: {
                left: `calc(${A / S * 100}% + 2px)`,
                width: `calc(${100 / S}% - 4px)`
              }
            }) : null, k.map(C => {
              const I = !f && !v && C.value === t;
              return c.jsx("button", {
                type: "button",
                disabled: r,
                onClick: E => {
                  E.stopPropagation(), b(""), s(C.value), o(null);
                },
                className: `relative z-10 whitespace-nowrap rounded-md px-2 py-1.5 text-center text-sm transition-colors ${I ? n ? "text-white" : "text-zinc-900" : n ? "text-white/50 hover:text-white" : "text-zinc-500 hover:text-zinc-800"}`,
                children: x(C.label)
              }, x(C.label));
            }), c.jsx("input", {
              ref: h,
              type: "number",
              min: l,
              max: d,
              value: y,
              placeholder: x("自定义"),
              disabled: r,
              onChange: C => b(C.target.value),
              onFocus: () => _(!0),
              onBlur: C => {
                _(!1), w(C.target.value);
              },
              onKeyDown: C => {
                C.key === "Enter" && (w(C.target.value), C.target.blur(), o(null));
              },
              onMouseDown: C => C.stopPropagation(),
              className: `relative z-10 w-full bg-transparent px-1 py-1.5 text-center text-sm outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${f || v ? n ? "text-white" : "text-zinc-900" : n ? "text-white/50" : "text-zinc-500"}`
            })]
          })]
        })
      })]
    });
  };

function qwo(e, t) {
  const n = t.scrollTop;
  e.style.height = "0px", e.style.height = `${e.scrollHeight}px`;
  const r = Math.max(0, t.scrollHeight - t.clientHeight);
  t.scrollTop = Math.min(n, r);
}

const Kwo = "height 300ms cubic-bezier(0.4, 0, 0.2, 1), min-height 300ms cubic-bezier(0.4, 0, 0.2, 1), max-height 300ms cubic-bezier(0.4, 0, 0.2, 1)";

function n1r({
  textareaRef: e,
  value: t,
  expanded: n,
  collapsedHeightPx: r = 120,
  expandedMinPx: a = 200,
  expandedMaxVh: i = .5,
  resizeReservePx: o = 96,
  remeasureKey: s
}) {
  const l = g.useRef(null),
    [d, u] = g.useState(!1),
    [h, p] = g.useState(360),
    m = I0r(),
    [f, y] = g.useState("none"),
    b = n ? k0r : _Ut,
    v = cZe,
    _ = g.useCallback(() => {
      if (m) {
        y("none");
        return;
      }
      Da.flushSync(() => {
        y(Kwo);
      });
    }, [m]);
  g.useEffect(() => {
    m && y("none");
  }, [m]);
  const w = g.useCallback(() => {
    const S = l.current;
    if (!S) return;
    const C = S.getBoundingClientRect(),
      I = window.innerHeight || 720,
      E = I - C.top - o;
    p(Math.min(Math.floor(I * i), Math.max(a, Math.floor(E))));
  }, [a, i, o]);
  g.useLayoutEffect(() => {
    const S = l.current,
      C = e.current;
    if (!S || !C) return;
    const I = () => {
      qwo(C, S);
      const R = S.clientHeight;
      if (!Number.isFinite(R) || R <= 1) {
        u(!1);
        return;
      }
      u(S.scrollHeight > R + 2);
    };
    I();
    const E = window.requestAnimationFrame(() => I()),
      M = window.setTimeout(() => I(), 32),
      T = typeof ResizeObserver < "u" ? new ResizeObserver(() => {
        window.requestAnimationFrame(() => I());
      }) : null;
    T && (T.observe(C), T.observe(S));
    const P = () => {
      window.requestAnimationFrame(() => I());
    };
    return C.addEventListener("input", P), () => {
      window.cancelAnimationFrame(E), window.clearTimeout(M), T && T.disconnect(), C.removeEventListener("input", P);
    };
  }, [n, e, s]), g.useLayoutEffect(() => {
    if (!n || m) return;
    w();
    const S = () => w();
    window.addEventListener("resize", S);
    const C = window.requestAnimationFrame(() => w());
    return () => {
      window.removeEventListener("resize", S), window.cancelAnimationFrame(C);
    };
  }, [n, w, m]), g.useEffect(() => {
    const S = l.current;
    if (!S) return;
    const C = I => {
      I.stopPropagation(), I.preventDefault();
      const E = S.scrollHeight - S.clientHeight;
      E > 0 && (S.scrollTop = Math.max(0, Math.min(E, S.scrollTop + I.deltaY)));
    };
    return S.addEventListener("wheel", C, {
      passive: !1,
      capture: !0
    }), () => {
      S.removeEventListener("wheel", C, {
        capture: !0
      });
    };
  }, [s, n]);
  const k = {
      overscrollBehavior: "contain",
      transition: f,
      ...(n ? {
        height: h,
        minHeight: a,
        maxHeight: h
      } : {
        height: r,
        minHeight: r,
        maxHeight: r
      })
    },
    A = g.useCallback(S => {
      S.propertyName !== "height" && S.propertyName !== "min-height" && S.propertyName !== "max-height" || y("none");
    }, []);
  return {
    scrollContainerRef: l,
    wrapperClass: b,
    wrapperStyle: k,
    onShellTransitionEnd: A,
    armHeightTransition: _,
    innerShellClass: v,
    isOverflowing: d,
    showExpandControl: d || n,
    textareaScrollClass: "overflow-x-hidden overflow-y-hidden",
    measureExpandedMaxHeight: w
  };
}

function myn(e) {
  const t = String(e || "").trim();
  if (!t) return "参考音频上传失败";
  const n = t.toLowerCase();
  return n.includes("matches an existing recording") || n.includes("existing recording in our catalog") || n.includes("copyright") || n.includes("catalog") ? `参考音频被判定为曲库已有录音（版权指纹命中），无法用于续写/翻唱。
请换一首非商业发行、未入库的自有录音再试（例如自己录的片段或未发行 demo）。` : t;
}

function Qwo(e) {
  const t = String(e || "").split(/\r?\n/).map(n => n.trim()).find(n => n && !/^\[[^\]]+\]$/.test(n));
  return t ? t.slice(0, 80) : "";
}

const S$t = [{
    value: "Pop",
    label: "流行（Pop）"
  }, {
    value: "Rock",
    label: "摇滚（Rock）"
  }, {
    value: "Electronic",
    label: "电子（Electronic）"
  }, {
    value: "Cinematic",
    label: "电影（Cinematic）"
  }, {
    value: "Jazz",
    label: "爵士（Jazz）"
  }, {
    value: "Classical",
    label: "古典（Classical）"
  }, {
    value: "Hip-Hop",
    label: "嘻哈（Hip-Hop）"
  }, {
    value: "Country",
    label: "乡村（Country）"
  }, {
    value: "R&B",
    label: "节奏蓝调（R&B）"
  }, {
    value: "Folk",
    label: "民谣（Folk）"
  }],
  Ywo = S$t.map(e => e.value);

function Xwo(e) {
  var t;
  return ((t = S$t.find(n => n.value === e)) == null ? void 0 : t.label) ?? e;
}

const fyn = H4e,
  Jwo = 132,
  gyn = 8;

function Xct(e, t) {
  return `w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded text-left transition-colors ${e ? `hover:bg-zinc-800 text-white ${t ? "bg-zinc-800" : ""}` : `hover:bg-zinc-100 text-zinc-900 ${t ? "bg-zinc-100" : ""}`}`;
}

const Zwo = ({
    open: e,
    anchorRef: t,
    isDark: n,
    menuWidth: r = 240,
    maxHeight: a = 280,
    scrollKey: i,
    children: o
  }) => {
    on();
    const s = g.useRef(null),
      l = g.useCallback(() => {
        const d = t.current,
          u = s.current;
        if (!d || !u || !e || typeof window > "u") return;
        const h = d.getBoundingClientRect(),
          p = 4,
          f = h.top - p - 8;
        u.style.position = "fixed", u.style.left = `${h.left}px`, u.style.width = `${r}px`, u.style.minWidth = `${r}px`, u.style.maxWidth = `${r}px`, u.style.zIndex = "10050", u.style.top = "", u.style.bottom = `${window.innerHeight - h.top + p}px`, u.style.maxHeight = `${Math.min(Math.max(f, 120), a)}px`;
      }, [t, a, r, e]);
    return g.useLayoutEffect(() => {
      if (!e) return;
      l();
      let d = 0;
      const u = () => {
        l(), d = requestAnimationFrame(u);
      };
      return d = requestAnimationFrame(u), () => cancelAnimationFrame(d);
    }, [e, l]), g.useLayoutEffect(() => {
      e && P3(s.current);
    }, [e, i]), !e || typeof document > "u" ? null : Da.createPortal(c.jsx("div", {
      ref: s,
      "data-gen-node-portal-dropdown": "true",
      className: `node-dropdown-menu rounded-lg shadow-xl p-1 border overflow-y-auto overscroll-contain scrollbar-hide ${n ? "bg-[#1f1f1f] border-zinc-700" : "bg-white border-zinc-200"}`,
      onPointerDown: d => d.stopPropagation(),
      onMouseDown: d => d.stopPropagation(),
      onWheel: d => d.stopPropagation(),
      children: o
    }), document.body);
  },
  exo = ({
    node: e,
    isDark: t,
    view: n = {
      x: 0,
      y: 0,
      zoom: 1
    },
    updateNode: r,
    setHistory: a,
    apiConfigs: i,
    globalApiKey: o,
    generateId: s,
    generate: l,
    connections: d = [],
    nodes: u = [],
    setSelectedNodeId: h,
    setSelectedNodeIds: p,
    enableGenerationNodeAnimation: m = !0,
    onStartCompactRefCanvasPick: f,
    compactRefCanvasPickTargetId: y = null
  }) => {
    var gr, jr, ea, pa, Br, tn, Lr, br, Jr, Kr, ir, Hr, ha, Ga, Za, va, Kt, Pr, kr, Mr, Hn, $t, je, Qe, Mt, cn, Qn, Lt, ct, Dt, bn, Rt, fn, Zt, Ln;
    on();
    const b = y === e.id,
      v = g.useCallback(() => {
        f == null || f(e.id, "default");
      }, [e.id, f]),
      _ = g.useRef(null),
      w = g.useRef(null),
      k = g.useRef(null),
      A = g.useRef({
        prompt: null,
        lyrics: null
      }),
      S = g.useRef({
        prompt: !1,
        lyrics: !1
      }),
      [C, I] = g.useState(((gr = e.settings) == null ? void 0 : gr.mode) || "inspiration"),
      [E, M] = g.useState(e.prompt || ""),
      [T, P] = g.useState(((jr = e.settings) == null ? void 0 : jr.lyrics) || ""),
      [R, j] = g.useState(((ea = e.settings) == null ? void 0 : ea.instrumentalDescription) || ""),
      [B, F] = g.useState(((pa = e.settings) == null ? void 0 : pa.tags) || ""),
      [N, G] = g.useState(((Br = e.settings) == null ? void 0 : Br.title) || ""),
      [z, V] = g.useState(d2e(((tn = e.settings) == null ? void 0 : tn.model) || Yxe)),
      O = Vk(z),
      L = F5(z),
      D = C3(z),
      U = O || L || D && gXr(z),
      H = D ? fXr(z) : void 0,
      [Y, K] = g.useState(null),
      [W, Q] = g.useState(() => {
        var zt;
        const tt = (((zt = e.settings) == null ? void 0 : zt.tags) || "").trim();
        return tt ? Ywo.includes(tt) ? "preset" : "custom" : "none";
      }),
      q = g.useRef(null),
      ne = g.useRef(null),
      de = g.useRef(null),
      le = g.useRef(null),
      J = g.useRef(null),
      pe = g.useRef(null),
      ce = g.useRef(null),
      [we, X] = g.useState(() => {
        var tt;
        return !!((tt = e.settings) != null && tt.musicComposerOpen);
      }),
      Z = !!((Lr = e.settings) != null && Lr.musicPromptExpanded),
      [re, fe] = g.useState(((br = e.settings) == null ? void 0 : br.isInstrumental) || !1),
      [ye, ie] = g.useState(() => {
        var an, Rn;
        const tt = (an = e.settings) == null ? void 0 : an.musicCustomInputKind;
        return tt === "description" || tt === "lyrics" ? tt : (((Rn = e.settings) == null ? void 0 : Rn.lyrics) || "").trim() ? "lyrics" : "description";
      }),
      [ae, be] = g.useState(((Jr = e.settings) == null ? void 0 : Jr.extendTime) || 0),
      [Ee, xe] = g.useState(!1),
      [he, ue] = g.useState(!1),
      [ge, _e] = g.useState(((Kr = e.settings) == null ? void 0 : Kr.refAudioUsage) || "extend"),
      ke = tLn({
        mode: C,
        isInstrumental: re
      }),
      ve = O && ke === "custom" ? "auto" : H && !H.includes(ke) ? H[0] : ke,
      Te = VPt(e.settings, O ? wOe : void 0),
      Ne = O || !U && tQ(z) === "V5_5" && ve !== "auto",
      me = !!((ir = e.settings) != null && ir.musicAdvancedOpen),
      [Ae, Fe] = g.useState(!1),
      [Me, Re] = g.useState(!1),
      [$e, rt] = g.useState(!1),
      [nt, ze] = g.useState(!1),
      [Le, Ke] = g.useState(!1),
      [Xe, De] = g.useState(!1),
      [Ye, Ce] = g.useState(0),
      [He, Ve] = g.useState(""),
      it = g.useRef(null),
      It = g.useRef(null);
    g.useEffect(() => {
      var zt;
      const tt = ((zt = e.settings) == null ? void 0 : zt.refAudioUsage) || "extend";
      _e(an => an === tt ? an : tt);
    }, [(Hr = e.settings) == null ? void 0 : Hr.refAudioUsage]), g.useEffect(() => {
      var zt;
      const tt = d2e(((zt = e.settings) == null ? void 0 : zt.model) || Yxe);
      V(an => an === tt ? an : tt);
    }, [(ha = e.settings) == null ? void 0 : ha.model]), g.useEffect(() => {
      var tt;
      X(!!((tt = e.settings) != null && tt.musicComposerOpen));
    }, [(Ga = e.settings) == null ? void 0 : Ga.musicComposerOpen]);
    const Ft = dEe(n, we),
      We = Number(Ft.zoom || 1),
      Ze = eZ(We),
      Ge = g.useRef(null),
      Oe = yI({
        hostRef: Ge,
        open: we && !y,
        zoom: Ft.zoom,
        remeasureKey: `${Math.round(Ft.x)}:${Math.round(Ft.y)}`
      }),
      st = g.useRef(null),
      vt = g.useMemo(() => ({
        transition: "none"
      }), []);
    Qp(st, "50% 0%", we);
    const Ht = g.useCallback(tt => {
        tt.stopPropagation();
        const zt = tt.currentTarget.querySelector('[data-scrollable="true"]');
        if (!zt) return;
        const an = zt.scrollHeight - zt.clientHeight;
        an <= 0 || (tt.preventDefault(), zt.scrollTop = Math.max(0, Math.min(an, zt.scrollTop + tt.deltaY)));
      }, []),
      nn = g.useCallback(() => {
        const tt = ce.current;
        tt && (window.removeEventListener("mousemove", tt.move), window.removeEventListener("mouseup", tt.up), ce.current = null, pe.current = null);
      }, []),
      pt = g.useCallback(tt => {
        r(e.id, {
          settings: tt
        });
      }, [e.id, r]),
      lt = g.useCallback(tt => {
        X(tt), Dd(e.id, tt), pt({
          musicComposerOpen: tt
        }), tt || K(zt => (zt == null ? void 0 : zt.nodeId) === e.id ? null : zt);
      }, [e.id, pt]),
      gt = g.useRef(!1),
      Ut = g.useCallback(tt => {
        const zt = GPt(tt);
        tt === "auto" ? (I("inspiration"), fe(!1)) : tt === "instrumental" ? (I("custom"), fe(!0), !R.trim() && E.trim() && (j(E), zt.instrumentalDescription = E)) : (I("custom"), fe(!1), ie("lyrics")), pt(zt), K(null), tt === "custom" && (gt.current = !0, lt(!0));
      }, [R, pt, E, lt]);
    g.useEffect(() => {
      !H || H.includes(ke) || Ut(H[0]);
    }, [Ut, H, ke]);
    const [_t, At] = g.useState(!1);
    g.useEffect(() => {
      if (!we) {
        At(!1);
        return;
      }
      let tt = !1;
      return Id().then(() => {
        tt || At(!0);
      }), () => {
        tt = !0;
      };
    }, [we]), g.useEffect(() => () => {
      Dd(e.id, !1);
    }, [e.id]);
    const Yt = g.useCallback((tt = !1) => {
        zb(e.id, h, p, 500, {
          forceSingle: tt
        });
      }, [e.id, h, p]),
      qe = g.useCallback(() => {
        Yt(!0), lt(!0), gt.current = !0;
      }, [Yt, lt]),
      kt = g.useCallback(tt => {
        tt.focus({
          preventScroll: !0
        });
        const zt = tt.value.length;
        try {
          tt.setSelectionRange(zt, zt);
        } catch {}
      }, []);
    g.useLayoutEffect(() => {
      if (!we || !gt.current) return;
      let tt = !1,
        zt = 0;
      const an = () => {
        if (tt) return;
        const Rn = ve === "custom" ? w.current : ve === "instrumental" ? k.current : _.current;
        if (!Rn) {
          zt++ < 8 && requestAnimationFrame(an);
          return;
        }
        gt.current = !1, kt(Rn);
      };
      return an(), () => {
        tt = !0;
      };
    }, [we, ve, kt]), g.useEffect(() => {
      var zt;
      const tt = (zt = e.settings) == null ? void 0 : zt.musicCustomInputKind;
      (tt === "description" || tt === "lyrics") && ie(tt);
    }, [(Za = e.settings) == null ? void 0 : Za.musicCustomInputKind]), g.useEffect(() => {
      if (!we) return;
      const tt = zt => {
        var Rn;
        const an = zt.target;
        an && (b || (Rn = ne.current) != null && Rn.contains(an) || an.closest(".node-dropdown-menu") || an.closest(".node-dropdown-button") || an.closest("[data-model-select-area]") || an.closest("[data-gen-node-portal-dropdown]") || an.closest("[data-gen-music-external-composer]") || (lt(!1), (Y == null ? void 0 : Y.nodeId) === e.id && K(null)));
      };
      return window.addEventListener("pointerdown", tt, !0), () => window.removeEventListener("pointerdown", tt, !0);
    }, [we, Y == null ? void 0 : Y.nodeId, e.id, lt, b]), g.useEffect(() => () => nn(), [nn]);
    const St = (Y == null ? void 0 : Y.nodeId) === e.id && Y.type === "audio-model",
      hn = (Y == null ? void 0 : Y.nodeId) === e.id && Y.type === "audio-scene",
      Qt = (Y == null ? void 0 : Y.nodeId) === e.id && Y.type === "music-lyric-mode",
      Ot = (Y == null ? void 0 : Y.nodeId) === e.id && Y.type === "music-duration",
      ln = (Y == null ? void 0 : Y.nodeId) === e.id && Y.type === "music-style",
      Pn = (Y == null ? void 0 : Y.nodeId) === e.id && Y.type === "music-settings";
    g.useEffect(() => {
      if (!St && !hn && !Qt && !Ot && !ln && !Pn) return;
      const tt = zt => {
        const an = zt.target;
        an && (an.closest(".node-dropdown-menu") || an.closest(".node-dropdown-button") || an.closest("[data-model-select-area]") || an.closest("[data-gen-node-portal-dropdown]") || an.closest("[data-gen-music-external-composer]") || K(null));
      };
      return window.addEventListener("pointerdown", tt, !0), () => window.removeEventListener("pointerdown", tt, !0);
    }, [St, hn, Qt, Ot, ln, Pn]);
    const rn = tt => /\.(mp3|wav|ogg|m4a|aac|flac)(\?|$)/i.test((tt || "").split("?")[0]) || (tt || "").startsWith("data:audio"),
      Yn = tt => rn(tt) || (tt || "").startsWith("blob:") && (tt || "").length > 10,
      Ct = (() => {
        var zt, an, Rn;
        if (!(d != null && d.length) || !(u != null && u.length)) return "";
        const tt = d.filter(Un => Un.to === e.id && (!Un.inputType || Un.inputType === "default"));
        for (const Un of tt) {
          const er = u.find(tr => tr.id === Un.from);
          if (!er) continue;
          let Cr = "";
          if (er.type === "gen-music") Cr = ((zt = er.settings) == null ? void 0 : zt.audioUrl) || "";else if (er.type === "rh-comfy" || er.type === "rh-app") {
            const tr = er.content || "";
            tr && rn(tr) && (Cr = tr);
          } else if (er.type === "preview") {
            const tr = er.previewType || ((an = er.settings) == null ? void 0 : an.previewType),
              kn = er.content || "";
            (tr === "audio" && kn || kn && Yn(kn)) && (Cr = kn);
          } else if (er.type === "input-image") {
            const tr = er.content || "",
              kn = ((Rn = er.settings) == null ? void 0 : Rn.mediaType) === "audio" || er.previewType === "audio";
            tr && (rn(tr) || kn && (tr || "").startsWith("blob:")) && (Cr = tr);
          }
          if (!Cr && er.content && typeof er.content == "string") {
            const tr = er.content;
            Yn(tr) && (Cr = tr);
          }
          if (Cr) return Cr;
        }
        return "";
      })();
    g.useEffect(() => {
      if (S.current.prompt) {
        S.current.prompt = !1;
        return;
      }
      const tt = e.prompt || "";
      _.current && _.current.value !== tt && (_.current.value = tt, M(tt));
    }, [e.prompt]), g.useEffect(() => {
      var zt;
      if (S.current.lyrics) {
        S.current.lyrics = !1;
        return;
      }
      const tt = ((zt = e.settings) == null ? void 0 : zt.lyrics) || "";
      P(an => an === tt ? an : tt), w.current && w.current.value !== tt && (w.current.value = tt);
    }, [(va = e.settings) == null ? void 0 : va.lyrics]), g.useEffect(() => () => {
      var an;
      Object.values(A.current).forEach(Rn => {
        Rn && clearTimeout(Rn);
      });
      const tt = {};
      let zt = !1;
      if (_.current) {
        const Rn = _.current.value,
          Un = e.prompt || "";
        Rn !== Un && (tt.prompt = Rn, zt = !0);
      }
      if (w.current) {
        const Rn = w.current.value,
          Un = ((an = e.settings) == null ? void 0 : an.lyrics) || "";
        Rn !== Un && Rn.trim() && (tt.settings || (tt.settings = {}), tt.settings.lyrics = Rn, zt = !0);
      }
      zt && r(e.id, tt);
    }, [e.id, e.prompt, e.settings, r]);
    const un = o9(e.id) || !!(e.isGenerating || (Kt = e.settings) != null && Kt.isGenerating),
      Jn = un,
      Kn = ((Pr = e.settings) == null ? void 0 : Pr.audioUrl) || "",
      en = ((kr = e.settings) == null ? void 0 : kr.clipId) || "",
      Vn = ((Mr = e.settings) == null ? void 0 : Mr.generatedLyrics) || "",
      Tt = ((Hn = e.settings) == null ? void 0 : Hn.musicTitle) || "",
      Ue = g.useMemo(() => {
        var zt;
        const tt = (zt = e.settings) == null ? void 0 : zt.duration;
        if (typeof tt == "number" && Number.isFinite(tt) && tt > 0) return tt;
        if (typeof tt == "string") {
          const an = parseFloat(String(tt).replace(/[^\d.]/g, ""));
          if (Number.isFinite(an) && an > 0) return an;
        }
      }, [($t = e.settings) == null ? void 0 : $t.duration]),
      et = en || (typeof ((je = e.settings) == null ? void 0 : je._audioAssetId) == "string" ? e.settings._audioAssetId : ""),
      ft = typeof ((Qe = e.settings) == null ? void 0 : Qe._ossRemoteUrl) == "string" ? String(e.settings._ossRemoteUrl).trim() : "",
      ht = !!((Mt = e.settings) != null && Mt._globalOssUrlOnly || (cn = e.settings) != null && cn._ossUrlOnlyMode),
      wt = !!(ft.startsWith("http://") || ft.startsWith("https://") || Kn.startsWith("http://") || Kn.startsWith("https://") || ht),
      [jt, bt] = g.useState(() => ft || Kn),
      Bt = g.useMemo(() => {
        if (Kn.startsWith("http://") || Kn.startsWith("https://")) return Kn;
        if (ft.startsWith("http://") || ft.startsWith("https://")) return ft;
        const tt = jt || "";
        return tt.startsWith("http://") || tt.startsWith("https://") ? tt : "";
      }, [Kn, ft, jt]),
      wn = g.useMemo(() => {
        const tt = Kn.startsWith("http://") || Kn.startsWith("https://") ? Kn : "",
          zt = jt.startsWith("http://") || jt.startsWith("https://") ? jt : "",
          an = ft.startsWith("http://") || ft.startsWith("https://") ? ft : "";
        return tt || zt || an || jt || Kn;
      }, [ft, Kn, jt]);
    g.useEffect(() => {
      let tt = !1;
      return (async () => {
        if (!Kn && !ft) {
          bt("");
          return;
        }
        const {
            pickGenAudioPlaybackUrl: an
          } = await Ie(async () => {
            const {
              pickGenAudioPlaybackUrl: Un
            } = await Promise.resolve().then(() => ii);
            return {
              pickGenAudioPlaybackUrl: Un
            };
          }, void 0, import.meta.url),
          Rn = an(ft, Kn, null);
        if (Rn.startsWith("http://") || Rn.startsWith("https://")) {
          tt || bt(Rn);
          return;
        }
        if (ht) {
          tt || bt(Rn || ft || Kn);
          return;
        }
        if (Kn.startsWith("blob:") || Kn.startsWith("data:")) {
          bt(Kn);
          return;
        }
        if (et) try {
          const {
            assetStore: Un
          } = await Ie(async () => {
            const {
              assetStore: tr
            } = await Promise.resolve().then(() => Ri);
            return {
              assetStore: tr
            };
          }, void 0, import.meta.url);
          await Un.init();
          const er = await Un.getAssetUrl(et);
          if (!tt && er && !er.startsWith("blob:")) {
            bt(er);
            return;
          }
          const {
            localCacheManager: Cr
          } = await Ie(async () => {
            const {
              localCacheManager: tr
            } = await Promise.resolve().then(() => Ha);
            return {
              localCacheManager: tr
            };
          }, void 0, import.meta.url);
          if (await Cr.ensureRestored(), Cr.hasAsset(et)) {
            const tr = await Cr.readAssetAsUrl(et);
            if (!tt && tr && !tr.startsWith("blob:")) {
              bt(tr);
              return;
            }
          }
        } catch {}
        tt || bt(Kn || ft);
      })(), () => {
        tt = !0;
      };
    }, [Kn, et, ft, ht]), g.useEffect(() => {
      if (!et || wt) return;
      let tt;
      return Ie(async () => {
        const {
          assetStore: zt
        } = await Promise.resolve().then(() => Ri);
        return {
          assetStore: zt
        };
      }, void 0, import.meta.url).then(({
        assetStore: zt
      }) => {
        tt = zt.addListener(an => {
          an === et && zt.getAssetUrl(an).then(Rn => {
            if (Rn) {
              if (Rn.startsWith("blob:")) {
                const Un = Ypt(ft, Kn, null);
                if (Un.startsWith("http://") || Un.startsWith("https://")) return;
              }
              bt(Rn);
            }
          });
        });
      }), () => {
        tt == null || tt();
      };
    }, [et, ft, Kn]);
    const at = !!((Qn = e.settings) != null && Qn.musicAudioCropMode);
    g.useEffect(() => {
      if (at) return;
      const tt = Bt || wn;
      if (!/^https?:\/\//i.test(tt)) return;
      let zt = !1;
      return gQe(tt).then(an => {
        if (!zt && an && an > 0) {
          if (Ue && Math.abs(an - Ue) < .5 || Ue && an + .5 < Ue && Sk(tt)) return;
          pt({
            duration: an
          });
        }
      }), () => {
        zt = !0;
      };
    }, [Ue, at, Bt, wn, pt]);
    const Pt = typeof ((Lt = e.settings) == null ? void 0 : Lt.musicAudioPlaybackRate) == "number" ? e.settings.musicAudioPlaybackRate : 1,
      dt = ((ct = e.settings) == null ? void 0 : ct.uploadedAudioUrl) || "",
      xt = ((Dt = e.settings) == null ? void 0 : Dt.uploadedFileName) || "",
      yn = Ct || dt || He;
    g.useEffect(() => {
      !Vn.trim() || T.trim() || (S.current.lyrics = !0, ie("lyrics"), P(Vn), C === "inspiration" && I("custom"));
    }, [Vn, T, C]), g.useEffect(() => {
      if (!Kn || at || un) return;
      const tt = (Kn.startsWith("http://") || Kn.startsWith("https://") ? Kn : "") || Ypt(ft, Kn, null) || Kn;
      if (tt.startsWith("blob:")) return;
      const zt = fQe(e.width || aT.width),
        an = DIe(zt);
      (e.height ?? 280) <= an + 8 && Math.abs((e.width ?? zt) - zt) <= 8 || r(e.id, fie(e, {
        isGenerating: !1,
        content: tt,
        settings: {
          ...(e.settings || {}),
          audioUrl: tt.startsWith("http") ? tt : Kn
        }
      }));
    }, [Kn, ft, at, un, e.id, e.width, e.height, r]), g.useEffect(() => {
      const tt = zt => {
        var Rn;
        const an = zt.target;
        an && ((Rn = ne.current) != null && Rn.contains(an) || ue(!1));
      };
      return document.addEventListener("mousedown", tt), () => document.removeEventListener("mousedown", tt);
    }, []);
    const gn = g.useCallback(async () => {
        if (!Kn) return;
        const tt = dM(e, Kn, {
            mediaType: "audio"
          }),
          zt = await p9(e, 0, void 0, "mp3", tt);
        (await VLt(tt, zt)) ? Ai("success", "音频已开始下载（MP3）", 5e3) : Ai("error", "音频下载失败，请重试");
      }, [Kn, e]),
      mt = g.useCallback((tt, zt) => {
        const an = URL.createObjectURL(tt);
        r(e.id, {
          content: an,
          settings: {
            musicAudioFormat: zt,
            audioUrl: an
          }
        }), Ai("success", `已转换为 ${zt}`);
      }, [e.id, r]),
      Xt = g.useCallback(tt => {
        const zt = URL.createObjectURL(tt);
        pt({
          musicAudioCropMode: !1,
          audioUrl: zt
        }), r(e.id, {
          content: zt,
          settings: {
            musicAudioCropMode: !1,
            audioUrl: zt
          }
        });
      }, [e.id, pt, r]),
      Gn = g.useCallback(tt => {
        if (tt.button !== 0 || Jn) return;
        Yt(), Kn && ue(!0);
        const zt = tt.target;
        if (zt.closest("[data-audio-strip-interactive]") || zt.closest("[data-input-image-audio-toolbar]") || zt.closest("[data-gen-node-portal-dropdown]") || zt.closest("[data-gen-music-external-composer]")) return;
        nn(), pe.current = {
          x: tt.clientX,
          y: tt.clientY
        };
        const an = Un => {
            const er = pe.current;
            er && Math.hypot(Un.clientX - er.x, Un.clientY - er.y) > gyn && (pe.current = null);
          },
          Rn = Un => {
            const er = pe.current;
            nn(), er && (Math.hypot(Un.clientX - er.x, Un.clientY - er.y) > gyn || qe());
          };
        ce.current = {
          move: an,
          up: Rn
        }, window.addEventListener("mousemove", an), window.addEventListener("mouseup", Rn);
      }, [Kn, nn, Jn, qe, Yt]),
      rr = g.useMemo(() => T.trim() || Vn.trim(), [T, Vn]),
      qn = g.useMemo(() => Jn ? !1 : D ? ve === "instrumental" ? !!(R.trim() || E.trim()) : ve === "custom" ? !!(rr || E.trim()) : !!E.trim() : O || L ? ve === "instrumental" ? !!(R.trim() || E.trim()) : L && ve === "custom" ? !!(E.trim() && rr) : !!E.trim() : ve === "auto" ? !!E.trim() : C === "extend" ? !0 : ve === "instrumental" ? !!(B.trim() || R.trim() || E.trim()) : !!(rr || E.trim()), [Jn, D, O, L, ve, C, E, R, rr, B]),
      Dn = g.useMemo(() => Jn ? "生成中…" : qn ? "" : ve === "auto" ? "请先填写音乐描述" : ve === "instrumental" ? "请填写风格或音乐描述" : "请先填写歌词", [Jn, qn, ve]),
      Ar = g.useCallback(() => {
        var tt;
        r(e.id, {
          prompt: ve === "instrumental" ? e.prompt || "" : E,
          settings: {
            mode: C,
            lyrics: ve === "custom" ? T : ((tt = e.settings) == null ? void 0 : tt.lyrics) || "",
            musicCustomInputKind: ye,
            instrumentalDescription: R,
            tags: B,
            title: N,
            model: z,
            isInstrumental: re,
            extendTime: ae,
            refAudioUsage: ge,
            musicLengthSec: Te
          }
        });
      }, [e.id, e.prompt, e.settings, ve, C, E, T, ye, R, B, N, z, re, ae, ge, Te, r]),
      _r = g.useCallback(() => {
        Ve(""), It.current = null, C === "extend" && (I("inspiration"), xe(!1)), pt({
          uploadedAudioUrl: "",
          uploadedFileName: "",
          uploadedAudioId: "",
          continueClipId: "",
          continueAudioPublicUrl: "",
          ...(C === "extend" ? {
            mode: "inspiration"
          } : {})
        });
      }, [C, pt]),
      Pa = g.useCallback(() => {
        var Cr, tr, kn, xn, Fn, cr, vr;
        const tt = C === "custom" || C === "extend";
        if (!U && ge === "cover" && !!!(String(((Cr = e.settings) == null ? void 0 : Cr.continueClipId) || "").trim() || /^https:\/\//i.test(String(((tr = e.settings) == null ? void 0 : tr.continueAudioPublicUrl) || "").trim()))) {
          alert(x("翻唱复刻请先上传或连接参考音频"));
          return;
        }
        let zt = N.trim();
        if (!U && tt && !zt) {
          const Wt = re ? "" : Qwo(T || Vn || E),
            Jt = (re ? R : E).trim().slice(0, 40);
          zt = Wt || Jt || "未命名音乐", G(zt);
        }
        const an = (ve === "instrumental" && R || E).trim();
        if (D) {
          const Wt = vXr(z, {
            prompt: E,
            lyrics: T.trim() || Vn.trim(),
            tags: B,
            title: zt,
            instrumentalDescription: R,
            lyricMode: ve
          });
          if (Wt) {
            alert(x(Wt));
            return;
          }
        } else if (O) {
          if (!an) {
            alert(x("请输入音乐描述"));
            return;
          }
        } else if (L) {
          if (!an) {
            alert(x("请输入音乐描述"));
            return;
          }
          if (an.length < _ft) {
            alert(x("风格描述至少 {0} 个字符", _ft));
            return;
          }
          if (an.length > Wbe) {
            alert(x("风格描述最多 {0} 个字符", Wbe));
            return;
          }
          if (ve === "custom") {
            const Wt = T.trim() || Vn.trim();
            if (!Wt) {
              alert(x("请输入歌词"));
              return;
            }
            if (Wt.length > sRe) {
              alert(x("歌词最多 {0} 字符（当前 {1}）", sRe, Wt.length));
              return;
            }
          }
        } else if (tt) {
          if (re) {
            const Wt = [B, R || E].map(Jt => String(Jt || "").trim()).filter(Boolean).join(", ");
            if (!Wt) {
              alert(x("自定义纯音乐请填写风格或音乐描述"));
              return;
            }
            if (Wt.length > XH()) {
              alert(x("风格最多 {0} 字符", XH()));
              return;
            }
            if (zt.length > JH()) {
              alert(x("标题最多 {0} 字符", JH()));
              return;
            }
          } else {
            const Wt = T.trim() || Vn.trim() || E.trim();
            if (!Wt) {
              alert(x("请输入歌词"));
              return;
            }
            if (!B.trim()) {
              alert(x("请先选择或填写风格（工具栏「请选择风格」）"));
              return;
            }
            const Jt = aie(z, !0);
            if (Wt.length > Jt) {
              alert(x("自定义歌词最多 {0} 字符（当前 {1}）", Jt, Wt.length));
              return;
            }
            if (B.trim().length > XH()) {
              alert(x("风格最多 {0} 字符", XH()));
              return;
            }
            if (zt.length > JH()) {
              alert(x("标题最多 {0} 字符", JH()));
              return;
            }
          }
        } else {
          if (!E.trim()) {
            alert(x("请输入音乐描述"));
            return;
          }
          const Wt = aie(z, !1);
          if (E.trim().length > Wt) {
            alert(x("灵感描述最多 {0} 字符", Wt));
            return;
          }
        }
        if (!l) {
          console.error("[GenMusic] generate function is not available"), alert(x("生成功能未初始化，请刷新页面重试"));
          return;
        }
        hu(e.id, !0);
        const Un = f5(e) ? $6(e) : null,
          er = {
            ...((Un == null ? void 0 : Un.settings) ?? e.settings),
            mode: C,
            lyrics: L ? ve === "custom" ? T.trim() || Vn.trim() : "" : C === "custom" && !re ? T.trim() || Vn.trim() || E.trim() : ((kn = e.settings) == null ? void 0 : kn.lyrics) || "",
            musicCustomInputKind: ye,
            instrumentalDescription: re ? R.trim() || E.trim() : R,
            tags: B,
            title: zt,
            model: z,
            isInstrumental: re,
            extendTime: ae,
            musicLengthSec: Te,
            ...(C === "extend" && en ? {
              continueClipId: en,
              continueAt: 0
            } : {}),
            ...(ge === "cover" ? {
              refAudioUsage: "cover",
              ...(String(((xn = e.settings) == null ? void 0 : xn.continueClipId) || "").trim() ? {
                continueClipId: String((Fn = e.settings) == null ? void 0 : Fn.continueClipId).trim()
              } : {}),
              ...(String(((cr = e.settings) == null ? void 0 : cr.continueAudioPublicUrl) || "").trim() ? {
                continueAudioPublicUrl: String((vr = e.settings) == null ? void 0 : vr.continueAudioPublicUrl).trim()
              } : {})
            } : {
              refAudioUsage: ge
            }),
            isGenerating: !0,
            progress: 0,
            error: null
          };
        r(e.id, {
          ...(Un ? {
            content: Un.content,
            errorMsg: Un.errorMsg
          } : {}),
          prompt: U ? an : C === "inspiration" || C === "custom" && !re && ye === "description" ? E : e.prompt || "",
          isGenerating: !0,
          errorMsg: void 0,
          settings: er
        });
        try {
          l({
            ...e,
            ...(Un ? {
              content: Un.content,
              errorMsg: Un.errorMsg
            } : {}),
            prompt: U ? an : ve === "instrumental" ? e.prompt || "" : E,
            isGenerating: !0,
            settings: er
          });
        } catch (Wt) {
          console.error("[GenMusic] Generate error:", Wt), hu(e.id, !1), r(e.id, {
            isGenerating: !1,
            errorMsg: Wt.message || "生成失败，请检查控制台"
          }), alert(x(Wt.message || "生成失败，请检查控制台"));
        }
      }, [C, E, T, Vn, R, re, ye, B, N, z, en, ge, ae, Te, ve, D, O, L, U, e, l, r]);
    g.useCallback(async () => {
      if (!Kn || !en) {
        alert(x("请先生成音乐"));
        return;
      }
      xe(!0);
    }, [Kn, en]), g.useCallback(async () => {
      var tt;
      if (!en || ae < 0) {
        alert(x("请输入有效的续写时间（秒）"));
        return;
      }
      Fe(!0), xe(!1);
      try {
        const zt = i.find(tr => tr.id === z || tr.id.includes("suno")),
          an = (zt == null ? void 0 : zt.key) || o,
          Rn = ((zt == null ? void 0 : zt.url) || "https://ai.comfly.org").replace(/\/+$/, "");
        if (!an) {
          alert(x("请先配置 API Key")), Fe(!1);
          return;
        }
        _1.updateConfig(Rn, an, i);
        const Un = [B, re ? R : ""].map(tr => String(tr || "").trim()).filter(Boolean).join(", ");
        if (!N.trim()) {
          alert(x("续写请填写标题")), Fe(!1);
          return;
        }
        if (!Un) {
          alert(x("续写请填写风格")), Fe(!1);
          return;
        }
        if (!re && !(T || E).trim()) {
          alert(x("续写请填写歌词或描述")), Fe(!1);
          return;
        }
        const er = await _1.extendMusic({
          prompt: re ? "" : T || E || "",
          title: N.trim(),
          tags: Un,
          continue_at: ae,
          continue_clip_id: en,
          make_instrumental: re,
          model: z,
          defaultParamFlag: !0
        });
        if (!er.success || !((tt = er.data) != null && tt.task_id)) throw new Error(er.error || "续写失败");
        const Cr = f5(e) ? $6(e) : null;
        if (r(e.id, {
          ...(Cr ? {
            content: Cr.content,
            errorMsg: Cr.errorMsg
          } : {}),
          isGenerating: !0,
          errorMsg: void 0,
          settings: {
            ...((Cr == null ? void 0 : Cr.settings) ?? e.settings),
            mode: "extend",
            continueClipId: en,
            continueAt: ae,
            remoteTaskId: er.data.task_id
          }
        }), l) {
          const tr = {
            ...e,
            ...(Cr ? {
              content: Cr.content,
              errorMsg: Cr.errorMsg
            } : {}),
            isGenerating: !0,
            settings: {
              ...((Cr == null ? void 0 : Cr.settings) ?? e.settings),
              mode: "extend",
              continueClipId: en,
              continueAt: ae,
              remoteTaskId: er.data.task_id
            }
          };
          l(tr);
        }
      } catch (zt) {
        console.error("[Extend Music] Error:", zt), alert(x(zt.message || "续写失败"));
      } finally {
        Fe(!1);
      }
    }, [en, ae, T, E, N, B, R, re, z, i, o, e, l, r]), g.useCallback(async () => {
      if (!Kn || !en) {
        alert(x("请先生成音乐"));
        return;
      }
      Re(!0);
      try {
        await new Promise(tt => setTimeout(tt, 2e3)), alert(x("MV 生成功能开发中"));
      } catch (tt) {
        console.error("[Generate MV] Error:", tt);
      } finally {
        Re(!1);
      }
    }, [Kn, en]), g.useCallback(async () => {
      if (!Kn || !en) {
        alert(x("请先生成音乐"));
        return;
      }
      rt(!0);
      try {
        await new Promise(tt => setTimeout(tt, 2e3)), alert(x("MIDI 下载功能开发中"));
      } catch (tt) {
        console.error("[Get MIDI] Error:", tt);
      } finally {
        rt(!1);
      }
    }, [Kn, en]), g.useCallback(async () => {
      if (!en) {
        alert(x("请先生成音乐"));
        return;
      }
      Ke(!0);
      try {
        const tt = i.find(kn => kn.id === z || kn.id.includes("suno")),
          zt = (tt == null ? void 0 : tt.key) || o,
          an = ((tt == null ? void 0 : tt.url) || "https://ai.comfly.org").replace(/\/+$/, "");
        if (!zt) {
          alert(x("请先配置 API Key")), Ke(!1);
          return;
        }
        _1.updateConfig(an, zt, i);
        const Rn = await _1.getMusicTiming(en, z);
        if (!Rn.success || !Rn.data) throw new Error(Rn.error || "获取节奏分析失败");
        r(e.id, {
          settings: {
            ...e.settings,
            timingData: Rn.data
          }
        });
        const Un = JSON.stringify(Rn.data, null, 2),
          er = new Blob([Un], {
            type: "application/json"
          }),
          Cr = URL.createObjectURL(er),
          tr = document.createElement("a");
        tr.href = Cr, tr.download = `timing_${en}.json`, tr.click(), URL.revokeObjectURL(Cr), alert(x("节奏分析数据已保存并导出为 JSON 文件"));
      } catch (tt) {
        console.error("[Get Timing] Error:", tt), alert(x(tt.message || "获取节奏分析失败"));
      } finally {
        Ke(!1);
      }
    }, [en, z, i, o, e, r]);
    const fa = g.useCallback(async tt => {
        const zt = i.find(Et => Et.id === z || Et.id.includes("suno")),
          an = (zt == null ? void 0 : zt.key) || o,
          Rn = ((zt == null ? void 0 : zt.url) || "https://ai.comfly.org").replace(/\/+$/, ""),
          Un = ge || "extend",
          er = YH(Rn);
        if (!an) {
          alert(x("请先配置 API Key"));
          return;
        }
        _1.updateConfig(Rn, an, i);
        const Cr = URL.createObjectURL(tt);
        if (Ve(Cr), er && Un === "cover") {
          const {
            isGlobalOssUploadEnabled: Et,
            uploadFileToGlobalMaterialMusicOss: zn
          } = await Ie(async () => {
            const {
              isGlobalOssUploadEnabled: mr,
              uploadFileToGlobalMaterialMusicOss: Yr
            } = await Promise.resolve().then(() => Ah);
            return {
              isGlobalOssUploadEnabled: mr,
              uploadFileToGlobalMaterialMusicOss: Yr
            };
          }, void 0, import.meta.url);
          if (!Et()) throw new Error("官方翻唱需要公网 HTTPS 音频。请开启全局 OSS 后重新上传，或连接可访问的 https 音频链接。");
          Ce(10);
          const Mn = await zn(tt);
          if (Ce(100), !Mn || !/^https:\/\//i.test(Mn)) throw new Error("OSS 上传未返回可用的 https 地址");
          const or = C === "extend" ? "inspiration" : C;
          r(e.id, {
            settings: {
              ...e.settings,
              continueAudioPublicUrl: Mn,
              uploadedAudioUrl: Cr,
              uploadedFileName: tt.name,
              refAudioUsage: "cover",
              mode: or
            }
          }), C === "extend" && I(or), xe(!1), alert(x("参考音频已就绪（翻唱复刻）。请填写描述/风格后点击生成。"));
          return;
        }
        const tr = tt.name.split(".").pop() || "mp3",
          kn = await _1.getAudioUploadSignature(tr, z);
        if (!kn.success || !kn.data) throw new Error(kn.error || "获取上传签名失败");
        const {
          id: xn,
          url: Fn,
          fields: cr
        } = kn.data;
        if (Ce(0), !(await _1.uploadAudioToS3(Fn, cr, tt, Et => {
          Ce(Et);
        }))) throw new Error("上传文件到 S3 失败");
        Ce(100);
        const Wt = await _1.reportUploadFinish(xn, tt.name, z);
        if (!Wt.success) throw new Error(Wt.error || "报告上传完毕失败");
        const Jt = Et => {
            const zn = String(Et || "").trim().toLowerCase();
            return zn === "completed" || zn === "complete" || zn === "success" || zn === "ready" || zn === "done";
          },
          Nn = Et => {
            const zn = String(Et || "").trim().toLowerCase();
            return zn === "failed" || zn === "error" || zn === "fail";
          };
        let En = "processing",
          Zn = 0;
        const Sr = 40;
        let Bn = "";
        for (; !Jt(En) && Zn < Sr;) {
          await new Promise(zn => setTimeout(zn, 2500));
          const Et = await _1.getUploadStatus(xn, z);
          if (!Et.success || !Et.data) {
            Bn = Et.error || "查询上传状态失败", console.warn("[Upload Audio] status poll failed:", Bn), Zn++;
            continue;
          }
          if (En = Et.data.status || "", console.log("[Upload Audio] status:", En, Et.data), Et.data.error_message) throw new Error(myn(String(Et.data.error_message)));
          if (Nn(En)) throw new Error(myn(`上传处理失败（status=${En}）`));
          if (Jt(En)) {
            const zn = await _1.initializeAudioClip(xn, z);
            if (!zn.success || !zn.data) throw new Error(zn.error || "初始化音频文件失败");
            const Mn = zn.data.clip_id;
            if (Un === "cover") {
              const or = C === "extend" ? "inspiration" : C;
              r(e.id, {
                settings: {
                  ...e.settings,
                  continueClipId: Mn,
                  uploadedAudioId: xn,
                  uploadedAudioUrl: Cr,
                  uploadedFileName: tt.name,
                  refAudioUsage: "cover",
                  mode: or
                }
              }), C === "extend" && I(or), xe(!1), alert(x("参考音频已就绪（翻唱复刻）。请填写描述/风格后点击生成。"));
            } else r(e.id, {
              settings: {
                ...e.settings,
                continueClipId: Mn,
                uploadedAudioId: xn,
                uploadedAudioUrl: Cr,
                uploadedFileName: tt.name,
                refAudioUsage: "extend",
                mode: "extend"
              }
            }), I("extend"), xe(!0), alert(x('上传成功！音频已显示在节点上，请设置续写参数后点击"续写音乐"按钮'));
            return;
          }
          Zn++;
        }
        if (!Jt(En)) throw new Error(`上传处理超时（最后状态: ${En || "未知"}${Bn ? `，${Bn}` : ""}）。文件已传到 100%，但服务端未返回 completed。`);
      }, [z, i, o, e, r, ge, C]),
      Ca = g.useCallback(async () => {
        var tt;
        (tt = it.current) == null || tt.click();
      }, []),
      $n = g.useCallback(async tt => {
        var an;
        const zt = (an = tt.target.files) == null ? void 0 : an[0];
        if (zt) {
          if (!zt.type.startsWith("audio/") && !zt.name.match(/\.(mp3|wav|ogg|m4a|aac|flac)$/i)) {
            alert(x("请选择音频文件（mp3, wav, ogg, m4a, aac, flac）"));
            return;
          }
          De(!0);
          try {
            await fa(zt);
          } catch (Rn) {
            console.error("[Upload Audio] Error:", Rn), alert(x(Rn.message || "音频上传失败")), Ve("");
          } finally {
            De(!1), Ce(0), it.current && (it.current.value = "");
          }
        }
      }, [fa]);
    g.useEffect(() => {
      if (!Ct) {
        It.current = null;
        return;
      }
      if (It.current === Ct) return;
      It.current = Ct;
      const tt = i.find(an => an.id === z || an.id.includes("suno")),
        zt = ((tt == null ? void 0 : tt.url) || "https://ai.comfly.org").replace(/\/+$/, "");
      if (ge === "cover" && YH(zt) && /^https:\/\//i.test(Ct)) {
        r(e.id, {
          settings: {
            ...e.settings,
            continueAudioPublicUrl: Ct,
            uploadedAudioUrl: Ct,
            refAudioUsage: "cover",
            mode: C === "extend" ? "inspiration" : C
          }
        }), C === "extend" && I("inspiration"), Ve(Ct);
        return;
      }
      De(!0), (async () => {
        try {
          const an = await fetch(Ct);
          if (!an.ok) throw new Error("获取连线音频失败");
          const Rn = await an.blob(),
            er = ((Ct.split("?")[0] || "").split(".").pop() || "mp3").toLowerCase(),
            Cr = /^(mp3|wav|ogg|m4a|aac|flac)$/i.test(er) ? er : "mp3",
            tr = new File([Rn], `reference.${Cr}`, {
              type: Rn.type || "audio/mpeg"
            });
          await fa(tr);
        } catch (an) {
          console.error("[Connected audio upload]", an), It.current = null, alert(x((an == null ? void 0 : an.message) || "连线音频上传失败"));
        } finally {
          De(!1), Ce(0);
        }
      })();
    }, [Ct, fa, ge, i, z, e, r, C]), g.useCallback(async () => {
      var tt, zt;
      if (en) {
        ze(!0);
        try {
          const an = i.find(Cr => Cr.id === z || Cr.id.includes("suno")),
            Rn = (an == null ? void 0 : an.key) || o,
            Un = ((an == null ? void 0 : an.url) || "https://ai.comfly.org").replace(/\/+$/, "");
          _1.updateConfig(Un, Rn, i);
          const er = await _1.getMusicTaskStatus(en, z);
          if (er.success && ((tt = er.data) != null && tt.data) && Array.isArray(er.data.data) && er.data.data.length > 0) {
            const tr = ((zt = er.data.data[0].metadata) == null ? void 0 : zt.prompt) || "";
            tr && r(e.id, {
              settings: {
                ...e.settings,
                generatedLyrics: tr
              }
            });
          }
        } catch (an) {
          console.error("[Load Lyrics] Error:", an);
        } finally {
          ze(!1);
        }
      }
    }, [en, z, i, o, e.id, e.settings, r]);
    const yr = (() => {
        const tt = B.trim();
        return W === "preset" && tt ? Xwo(tt) : W === "custom" ? "自定义" : "请选择风格";
      })(),
      Ir = t ? "text-zinc-400" : "text-zinc-500",
      Gr = t ? "node-dropdown-button bg-transparent hover:bg-white/5 text-white border-white/30" : "node-dropdown-button bg-transparent hover:bg-black/5 text-gray-900 border-gray-300",
      Zr = Z,
      La = ve === "instrumental" ? R : E,
      sa = D ? YDn(z, ve) : L ? ve === "custom" ? sRe : Wbe : O ? 0 : aie(z, ve !== "auto"),
      Ea = ve === "custom" ? (T.trim() || Vn.trim() || E).length : La.length,
      {
        scrollContainerRef: ba,
        wrapperClass: ga,
        wrapperStyle: _a,
        onShellTransitionEnd: $a,
        armHeightTransition: Ya,
        showExpandControl: ta,
        textareaScrollClass: ki,
        isOverflowing: Wn,
        measureExpandedMaxHeight: wr
      } = n1r({
        textareaRef: k,
        value: La,
        expanded: Zr,
        collapsedHeightPx: fyn,
        expandedMinPx: 200,
        remeasureKey: `${Math.round(Ft.x)}:${Math.round(Ft.y)}:${Ft.zoom}:${Ze}:${ve}-${La.length}-${we}-${un}`
      }),
      jn = `relative block w-full min-w-0 min-h-full resize-none bg-transparent p-2 text-sm leading-6 outline-none whitespace-pre-wrap break-words ${ki} ${t ? "text-zinc-100 placeholder-zinc-500" : "text-zinc-900 placeholder-zinc-400"}`,
      _n = ta ? c.jsx(kUt, {
        expanded: Zr,
        isDark: t,
        onToggle: () => {
          const tt = !Z;
          Ya(), pt({
            musicPromptExpanded: tt
          }), tt && window.requestAnimationFrame(() => {
            window.requestAnimationFrame(wr);
          });
        }
      }) : null,
      ar = g.useCallback(tt => {
        _.current = tt, k.current = tt;
      }, []),
      Vt = g.useCallback(tt => {
        w.current = tt;
      }, []),
      vn = g.useCallback(tt => {
        k.current = tt;
      }, []),
      An = ve === "instrumental" ? "描述你想要的纯音乐，例如：轻快的夏日城市流行乐" : ve === "custom" ? L ? "描述曲风、情绪与场景（必填）" : "描述曲风、情绪与场景（可选；未填歌词时将作为歌词发送）" : "描述你想要的音乐",
      ur = () => ve === "instrumental" ? c.jsx("textarea", {
        ref: vn,
        "data-prompt-editor-area": "true",
        value: R,
        onChange: tt => {
          const zt = tt.target.value;
          j(zt), r(e.id, {
            settings: {
              ...e.settings,
              instrumentalDescription: zt
            }
          });
        },
        onMouseDown: tt => tt.stopPropagation(),
        onPointerDown: tt => tt.stopPropagation(),
        placeholder: x(An),
        className: jn
      }) : c.jsx("textarea", {
        ref: ar,
        "data-node-type": "gen-music",
        "data-node-id": e.id,
        "data-prompt-editor-area": "true",
        value: E,
        onChange: tt => {
          const zt = tt.target.value;
          M(zt), S.current.prompt = !0, A.current.prompt && clearTimeout(A.current.prompt), A.current.prompt = setTimeout(() => {
            r(e.id, {
              prompt: zt
            });
          }, 50);
        },
        onBlur: tt => {
          const zt = tt.target.value;
          A.current.prompt && clearTimeout(A.current.prompt), r(e.id, {
            prompt: zt
          });
        },
        onMouseDown: tt => tt.stopPropagation(),
        onPointerDown: tt => tt.stopPropagation(),
        placeholder: x(An),
        className: jn
      }),
      zr = `relative block w-full min-h-[120px] max-h-[220px] resize-none bg-transparent px-2 py-1.5 text-sm leading-6 outline-none whitespace-pre-wrap break-words overflow-y-auto rh-scroll-minimal ${t ? "text-zinc-100 placeholder-zinc-500" : "text-zinc-900 placeholder-zinc-400"}`,
      Dr = Ct ? "已连接" : xt || ((bn = e.settings) == null ? void 0 : bn.uploadedFileName) || ((Rt = e.settings) == null ? void 0 : Rt.continueClipId) || "参考音频",
      Wr = !!yn || Xe || !!((fn = e.settings) != null && fn.continueClipId || (Zt = e.settings) != null && Zt.continueAudioPublicUrl);
    return c.jsxs("div", {
      ref: ne,
      className: "relative h-full w-full overflow-visible pointer-events-none bg-transparent text-zinc-100",
      children: [c.jsx("input", {
        ref: it,
        type: "file",
        accept: "audio/*,.mp3,.wav,.ogg,.m4a,.aac,.flac",
        onChange: $n,
        className: "hidden"
      }), Kn && he && !Jn ? c.jsx("div", {
        className: "pointer-events-auto absolute left-1/2 z-[120] -translate-x-1/2",
        "data-gen-music-audio-toolbar-wrap": !0,
        style: {
          top: `-${mQe}px`
        },
        onMouseDown: tt => tt.stopPropagation(),
        children: c.jsx(eOt, {
          isDark: t,
          node: e,
          audioUrl: Kn,
          playbackRate: Pt,
          onPlaybackRateChange: tt => pt({
            musicAudioPlaybackRate: tt
          }),
          onCropClick: () => pt({
            musicAudioCropMode: !0
          }),
          onFormatConverted: mt,
          onDownload: () => {
            gn();
          }
        })
      }) : null, c.jsxs("div", {
        ref: de,
        "data-aux-gen-preview": !0,
        className: `pointer-events-auto relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl ${Kn ? "p-0" : "p-3"}`,
        onMouseDown: Kn ? Gn : void 0,
        children: [Jn ? c.jsx("div", {
          "data-aux-gen-progress-layer": !0,
          className: "absolute inset-0 z-30 overflow-hidden pointer-events-auto rounded-2xl",
          onDoubleClick: tt => {
            tt.stopPropagation(), tt.preventDefault(), qe();
          },
          children: c.jsx(Yv, {
            seed: e.id,
            isDark: t,
            label: x(C === "extend" ? "续写中…" : "生成中…")
          })
        }) : null, c.jsxs("div", {
          className: "relative flex flex-1 min-h-0 w-full flex-col",
          children: [c.jsx("div", {
            className: `relative flex flex-1 min-h-0 w-full flex-col ${Jn || !Kn ? "items-center justify-center" : "items-stretch"} ${!Kn && !Jn ? "pointer-events-none select-none" : ""}`,
            children: Jn ? null : e.errorMsg && !Kn ? c.jsxs("div", {
              className: "px-3 text-center pointer-events-auto",
              children: [c.jsx("div", {
                className: "mb-1 text-xs font-medium text-red-400",
                children: x("生成失败")
              }), c.jsx("div", {
                className: "text-[11px] leading-relaxed text-red-400/90 line-clamp-6 break-words",
                children: e.errorMsg
              })]
            }) : Kn ? c.jsx("div", {
              className: "flex h-full w-full min-h-0 items-stretch",
              children: at ? c.jsx(tOt, {
                audioUrl: Kn,
                isDark: t,
                onCancel: () => pt({
                  musicAudioCropMode: !1
                }),
                onConfirm: Xt
              }) : c.jsx(CXe, {
                playbackId: e.id,
                audioUrl: wn,
                waveformSourceUrl: Bt || void 0,
                isDark: t,
                className: "h-full w-full min-h-[72px]",
                playbackRate: Pt,
                initialDuration: Ue,
                onDurationResolved: tt => {
                  if (!Ue || Ue <= 0) {
                    pt({
                      duration: tt
                    });
                    return;
                  }
                  Math.abs(tt - Ue) < .5 || tt + .5 < Ue && Sk(wn) || pt({
                    duration: tt
                  });
                },
                cornerLabel: Tt.trim() || void 0,
                formatLabel: yQe(wn, void 0, (Ln = e.settings) == null ? void 0 : Ln.musicAudioFormat)
              })
            }) : c.jsx("div", {
              className: "flex items-end gap-0.5 h-6 opacity-30 pointer-events-none",
              children: [4, 7, 5, 9, 6, 8, 4, 7, 5].map((tt, zt) => c.jsx("div", {
                className: `w-0.5 rounded-full ${t ? "bg-white/50" : "bg-zinc-500"}`,
                style: {
                  height: `${tt * 3}px`
                }
              }, zt))
            })
          }), !Jn && !at ? c.jsx("div", {
            "data-gen-music-preview-overlay": !0,
            className: `absolute inset-0 z-10 ${Kn ? "pointer-events-none" : "pointer-events-auto cursor-grab active:cursor-grabbing"}`,
            onMouseDown: Kn ? void 0 : Gn,
            onDoubleClick: tt => {
              tt.stopPropagation(), tt.preventDefault(), nn(), qe();
            }
          }) : null]
        })]
      }), we ? c.jsx("div", {
        ref: Ge,
        "data-gen-prompt-panel-host": !0,
        "data-gen-prompt-panel": "true",
        "data-floating-placement": Oe.offset.placement,
        "data-gen-music-external-composer": !0,
        className: `${M5t}${y ? " hidden" : ""}`,
        style: {
          ...zVe,
          ...Oe.style
        },
        onMouseDown: tt => {
          Yt(), tt.stopPropagation();
        },
        onWheel: Ht,
        children: c.jsx("div", {
          "data-qiaodoumayi-aux-composer": "music",
          "data-gen-prompt-panel": "true",
          ref: st,
          className: `qiaodoumayi-aux-gen-composer gen-prompt-panel-enter ${P5t} overflow-hidden ${t ? `${W4e} text-zinc-100` : `${q4e} text-zinc-900`}`,
          style: vt,
          children: _t ? c.jsxs(c.Fragment, {
            children: [U ? null : c.jsxs("div", {
              className: "mb-2 flex min-h-9 items-center gap-1.5",
              children: [c.jsx(pZe, {
                isDark: t,
                active: b,
                title: x("从画布选择参考音频节点"),
                onClick: v
              }), c.jsx("button", {
                type: "button",
                title: x("上传参考音频"),
                disabled: Xe,
                onClick: tt => {
                  tt.stopPropagation(), Ca();
                },
                onMouseDown: tt => tt.stopPropagation(),
                className: `flex h-9 w-9 shrink-0 items-center justify-center rounded-md border ${Gr} ${Xe ? "opacity-50" : ""}`,
                children: Xe ? c.jsx(Ua, {
                  size: 14,
                  className: "animate-spin"
                }) : c.jsx(GRr, {
                  size: 14
                })
              }), Wr ? c.jsxs("div", {
                className: `flex min-w-0 flex-1 items-center gap-1 rounded-md border px-2 py-1 ${t ? "border-white/15 bg-white/[0.04]" : "border-zinc-200 bg-zinc-50"}`,
                children: [c.jsx("span", {
                  className: `min-w-0 truncate text-[11px] ${t ? "text-zinc-200" : "text-zinc-700"}`,
                  children: Xe ? Ye >= 100 ? x("处理中…") : x("上传中 {0}%", Ye) : String(Dr)
                }), !Ct && !Xe ? c.jsx("button", {
                  type: "button",
                  title: x("移除参考音频"),
                  onClick: tt => {
                    tt.stopPropagation(), _r();
                  },
                  onMouseDown: tt => tt.stopPropagation(),
                  className: `ml-auto shrink-0 rounded p-0.5 ${Ir} hover:opacity-80`,
                  children: c.jsx(Na, {
                    size: 12
                  })
                }) : null]
              }) : c.jsx("span", {
                className: `min-w-0 flex-1 truncate text-[11px] ${Ir}`,
                children: x("参考音频（可选）")
              }), Wr ? c.jsx("div", {
                className: `flex shrink-0 overflow-hidden rounded-md border ${t ? "border-white/15" : "border-zinc-200"}`,
                children: [{
                  id: "extend",
                  label: "续写"
                }, {
                  id: "cover",
                  label: "翻唱"
                }].map(tt => c.jsx("button", {
                  type: "button",
                  onClick: zt => {
                    zt.stopPropagation(), _e(tt.id), pt({
                      refAudioUsage: tt.id
                    });
                  },
                  onMouseDown: zt => zt.stopPropagation(),
                  className: `px-2 py-1 text-[10px] ${ge === tt.id ? t ? "bg-white/15 text-white" : "bg-zinc-200 text-zinc-900" : Ir}`,
                  children: x(tt.label)
                }, tt.id))
              }) : null, _n ? c.jsx("div", {
                className: "ml-auto shrink-0 self-center",
                children: _n
              }) : null]
            }), c.jsx("div", {
              className: `qiaodoumayi-aux-prompt-group ${R5t}`,
              children: c.jsx("div", {
                className: `qiaodoumayi-aux-prompt-inner ${N5t}`,
                children: c.jsx(e1r, {
                  wrapperClass: ga,
                  wrapperStyle: _a,
                  onTransitionEnd: $a,
                  scrollContainerRef: ba,
                  showExpandButton: !1,
                  isOverflowing: Wn,
                  expandButton: _n,
                  children: ur()
                })
              })
            }), c.jsx("div", {
              className: `grid transition-[grid-template-rows] duration-300 ${ve === "custom" ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`,
              children: c.jsx("div", {
                className: "min-h-0 overflow-hidden",
                children: c.jsxs("div", {
                  className: `mx-1 mt-1 border-t pt-2 ${t ? "border-[#323232]" : "border-zinc-200"}`,
                  children: [c.jsx("div", {
                    className: "mb-1 px-1",
                    children: c.jsx("span", {
                      className: `text-[11px] font-medium ${Ir}`,
                      children: x("歌词")
                    })
                  }), c.jsx("textarea", {
                    ref: Vt,
                    "data-node-type": "gen-music-lyrics",
                    "data-node-id": e.id,
                    "data-prompt-editor-area": "true",
                    value: T,
                    onChange: tt => {
                      const zt = tt.target.value;
                      P(zt), S.current.lyrics = !0, A.current.lyrics && clearTimeout(A.current.lyrics), A.current.lyrics = setTimeout(() => Ar(), 50);
                    },
                    onBlur: () => {
                      A.current.lyrics && clearTimeout(A.current.lyrics), Ar();
                    },
                    onMouseDown: tt => tt.stopPropagation(),
                    onPointerDown: tt => tt.stopPropagation(),
                    placeholder: x("输入歌词内容..."),
                    className: zr,
                    style: {
                      minHeight: Jwo
                    }
                  })]
                })
              })
            }), C === "extend" && c.jsx("div", {
              className: `mt-2 rounded border px-2 py-1 text-[10px] ${t ? "border-white/30 text-zinc-300" : "border-gray-300 text-zinc-600"}`,
              children: x("正在基于上个片段扩展…")
            }), c.jsxs("div", {
              "data-node-header-toolbar": !0,
              className: "qiaodoumayi-aux-gen-toolbar mt-2 flex h-14 min-w-0 items-center justify-between gap-2",
              children: [c.jsxs("div", {
                className: "qiaodoumayi-aux-gen-params flex min-w-0 flex-1 items-center gap-1 overflow-x-auto overflow-y-visible overscroll-contain rh-scroll-minimal [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
                children: [c.jsx(t1r, {
                  node: e,
                  isDark: t,
                  apiConfigs: i,
                  updateNode: r,
                  disabled: Jn,
                  activeDropdown: Y,
                  setActiveDropdown: K,
                  dropdownBtnClass: Gr
                }), c.jsx("div", {
                  className: `h-4 w-px shrink-0 ${t ? "bg-white/15" : "bg-zinc-300"}`
                }), c.jsx(Hwo, {
                  nodeId: e.id,
                  lyricMode: ve,
                  isDark: t,
                  disabled: Jn,
                  dropdownBtnClass: Gr,
                  activeDropdown: Y,
                  setActiveDropdown: K,
                  onChange: Ut,
                  modes: H || (O ? ["auto", "instrumental"] : void 0)
                }), !U && ve !== "auto" ? c.jsxs(c.Fragment, {
                  children: [c.jsx("div", {
                    className: `h-4 w-px shrink-0 ${t ? "bg-white/15" : "bg-zinc-300"}`
                  }), c.jsxs("div", {
                    className: "relative max-w-[5.5rem] min-w-[4rem] shrink-0",
                    "data-model-select-area": !0,
                    children: [c.jsx("button", {
                      ref: le,
                      type: "button",
                      onClick: tt => {
                        tt.stopPropagation(), K(ln ? null : {
                          nodeId: e.id,
                          type: "music-style"
                        });
                      },
                      onMouseDown: tt => tt.stopPropagation(),
                      className: `${Gr} flex h-8 w-full items-center gap-1 rounded border px-1.5 text-[10px]`,
                      children: c.jsx("span", {
                        className: "truncate",
                        children: yr
                      })
                    }), c.jsxs(Zwo, {
                      open: ln,
                      anchorRef: le,
                      isDark: t,
                      menuWidth: 220,
                      maxHeight: 320,
                      scrollKey: B || W,
                      children: [c.jsx("button", {
                        type: "button",
                        onClick: tt => {
                          tt.stopPropagation(), Q("none"), F(""), Ar(), K(null);
                        },
                        className: Xct(t, W === "none"),
                        children: c.jsx("span", {
                          className: "text-xs",
                          children: x("请选择风格")
                        })
                      }), S$t.map(tt => c.jsx("button", {
                        type: "button",
                        onClick: zt => {
                          zt.stopPropagation(), Q("preset"), F(tt.value), Ar(), K(null);
                        },
                        className: Xct(t, W === "preset" && B === tt.value),
                        children: c.jsx("span", {
                          className: "text-xs",
                          children: x(tt.label)
                        })
                      }, tt.value)), c.jsx("button", {
                        type: "button",
                        onClick: tt => {
                          tt.stopPropagation(), Q("custom"), K(null), requestAnimationFrame(() => {
                            var zt;
                            return (zt = q.current) == null ? void 0 : zt.focus();
                          });
                        },
                        className: Xct(t, W === "custom"),
                        children: c.jsx("span", {
                          className: "text-xs",
                          children: x("自定义")
                        })
                      })]
                    })]
                  })]
                }) : null, Ne ? c.jsxs(c.Fragment, {
                  children: [c.jsx("div", {
                    className: `h-4 w-px shrink-0 ${t ? "bg-white/15" : "bg-zinc-300"}`
                  }), c.jsx(Wwo, {
                    nodeId: e.id,
                    valueSec: Te,
                    isDark: t,
                    disabled: Jn,
                    dropdownBtnClass: Gr,
                    activeDropdown: Y,
                    setActiveDropdown: K,
                    onChange: tt => pt({
                      musicLengthSec: tt
                    }),
                    minSec: O ? GMn : 1,
                    maxSec: O ? wOe : void 0
                  })]
                }) : null, U ? null : c.jsxs(c.Fragment, {
                  children: [c.jsx("div", {
                    className: `h-4 w-px shrink-0 ${t ? "bg-white/15" : "bg-zinc-300"}`
                  }), c.jsx("button", {
                    ref: J,
                    type: "button",
                    title: x("高级设置"),
                    onClick: tt => {
                      tt.stopPropagation(), pt({
                        musicAdvancedOpen: !me
                      });
                    },
                    onMouseDown: tt => tt.stopPropagation(),
                    className: `${Gr} h-8 w-8 shrink-0 rounded border p-0 ${me ? t ? "bg-white/10" : "bg-zinc-100" : ""}`,
                    children: c.jsx(by, {
                      size: 14,
                      className: "mx-auto"
                    })
                  })]
                })]
              }), c.jsxs("div", {
                className: "flex shrink-0 items-center gap-1.5",
                children: [sa > 0 && Ea >= sa * .9 ? c.jsxs("span", {
                  className: `whitespace-nowrap text-xs ${Ea > sa ? "font-semibold text-red-400" : Ir}`,
                  children: [Ea, "/", sa]
                }) : null, c.jsx("button", {
                  type: "button",
                  disabled: !qn,
                  onClick: tt => {
                    tt.stopPropagation(), Pa();
                  },
                  onMouseDown: tt => tt.stopPropagation(),
                  className: `qiaodoumayi-aux-submit ml-0.5 shrink-0 rounded-md border p-1.5 transition-all active:scale-95 ${qn ? t ? "border-white/30 text-white hover:bg-white/5" : "border-gray-300 text-gray-900 hover:bg-black/5" : t ? "cursor-not-allowed border-white/15 text-white/40" : "cursor-not-allowed border-zinc-200 text-zinc-400"}`,
                  title: Dn || (U ? x("运行") : C === "extend" ? x("续写音乐") : !B.trim() && ve !== "auto" ? x("运行（请先选择风格）") : x("运行")),
                  children: Jn ? c.jsx(Ua, {
                    size: 12,
                    className: "animate-spin"
                  }) : c.jsx(Gc, {
                    size: 16,
                    strokeWidth: 2.4
                  })
                })]
              })]
            }), U ? null : c.jsx("div", {
              className: `overflow-hidden transition-[max-height] duration-300 ${me ? "max-h-96" : "max-h-0"}`,
              children: c.jsxs("div", {
                className: `space-y-3 p-4 text-xs ${t ? "bg-white/5" : "bg-zinc-50"}`,
                children: [c.jsxs("label", {
                  className: "block",
                  children: [c.jsxs("span", {
                    className: `${Ir} mb-1 block`,
                    children: [x("标题"), x(ve !== "auto" ? "（必填，未填将自动补全）" : "（可选）")]
                  }), c.jsx("input", {
                    type: "text",
                    value: N,
                    onChange: tt => {
                      G(tt.target.value), Ar();
                    },
                    placeholder: x("音乐标题"),
                    className: `w-full rounded border px-2 py-1.5 text-xs outline-none ${t ? "border-white/30 bg-transparent text-white" : "border-gray-300 text-gray-900"}`,
                    onMouseDown: tt => tt.stopPropagation()
                  })]
                }), W === "custom" && c.jsxs("label", {
                  className: "block",
                  children: [c.jsx("span", {
                    className: `${Ir} mb-1 block`,
                    children: x("自定义风格")
                  }), c.jsx("input", {
                    ref: q,
                    type: "text",
                    value: B,
                    onChange: tt => {
                      F(tt.target.value), Ar();
                    },
                    placeholder: x("例如：pop, electronic, rock"),
                    className: `w-full rounded border px-2 py-1.5 text-xs outline-none ${t ? "border-white/30 bg-transparent text-white" : "border-gray-300 text-gray-900"}`,
                    onMouseDown: tt => tt.stopPropagation()
                  })]
                })]
              })
            })]
          }) : c.jsx("div", {
            className: "w-full",
            style: {
              minHeight: fyn
            },
            "aria-hidden": !0
          })
        })
      }) : null]
    });
  },
  yyn = H4e,
  PPe = 8;

function txo(e, t, n) {
  return `flex w-full items-start gap-2.5 rounded px-2 py-2 text-left transition-colors ${e ? `hover:bg-zinc-800 text-white ${t ? "bg-zinc-800" : ""}` : `hover:bg-zinc-100 text-zinc-900 ${t ? "bg-zinc-100" : ""}`}`;
}

function Vte(e, t) {
  return `w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded text-left transition-colors ${e ? `hover:bg-zinc-800 text-white ${t ? "bg-zinc-800" : ""}` : `hover:bg-zinc-100 text-zinc-900 ${t ? "bg-zinc-100" : ""}`}`;
}

const byn = [{
    id: "tts",
    label: "文字转语音",
    desc: "生成具有情感控制的语音",
    icon: c.jsx(Q2, {
      size: 16,
      className: "text-white"
    })
  }, {
    id: "voice-clone",
    label: "音色复刻",
    desc: "上传音频克隆音色并试听",
    icon: c.jsx(lTn, {
      size: 16,
      className: "text-white"
    })
  }],
  nxo = {
    id: "voice-design",
    label: "音色设计",
    desc: "用文字描述生成全新音色并试听",
    icon: c.jsx(EP, {
      size: 16,
      className: "text-white"
    })
  };

function rxo(e, t = !1) {
  const n = t ? n8t : xOe;
  return n.find(r => r.id === e) || (t && e ? {
    id: e,
    name: "复刻音色",
    gradient: "from-emerald-600 to-teal-800"
  } : n[0]);
}

const m1 = ({
  open: e,
  anchorRef: t,
  isDark: n,
  menuWidth: r = 240,
  maxHeight: a = 280,
  scrollKey: i,
  children: o
}) => {
  on();
  const s = g.useRef(null),
    l = g.useCallback(() => {
      const d = t.current,
        u = s.current;
      if (!d || !u || !e || typeof window > "u") return;
      const h = d.getBoundingClientRect(),
        p = 4,
        f = h.top - p - 8;
      u.style.position = "fixed", u.style.left = `${h.left}px`, u.style.width = `${r}px`, u.style.minWidth = `${r}px`, u.style.maxWidth = `${r}px`, u.style.zIndex = "10050", u.style.top = "", u.style.bottom = `${window.innerHeight - h.top + p}px`, u.style.maxHeight = `${Math.min(Math.max(f, 120), a)}px`;
    }, [t, a, r, e]);
  return g.useLayoutEffect(() => {
    if (!e) return;
    l();
    let d = 0;
    const u = () => {
      l(), d = requestAnimationFrame(u);
    };
    return d = requestAnimationFrame(u), () => cancelAnimationFrame(d);
  }, [e, l]), g.useLayoutEffect(() => {
    e && P3(s.current);
  }, [e, i]), !e || typeof document > "u" ? null : Da.createPortal(c.jsx("div", {
    ref: s,
    "data-gen-node-portal-dropdown": "true",
    className: `node-dropdown-menu rounded-2xl shadow-xl p-1 border overflow-y-auto overscroll-contain scrollbar-hide ${n ? "bg-[#1f1f1f] border-zinc-700" : "bg-white border-zinc-200"}`,
    onPointerDown: d => d.stopPropagation(),
    onMouseDown: d => d.stopPropagation(),
    onWheel: d => d.stopPropagation(),
    children: o
  }), document.body);
};

function axo(e, t) {
  return `flex w-full items-center gap-2 rounded-[12px] p-2 text-left text-xs transition-colors ${e ? `hover:bg-zinc-800 text-zinc-300 ${t ? "bg-zinc-800 text-white" : ""}` : `hover:bg-zinc-100 text-zinc-700 ${t ? "bg-zinc-100 text-zinc-900" : ""}`}`;
}

