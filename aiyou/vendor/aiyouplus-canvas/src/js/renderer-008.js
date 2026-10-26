const bl = ({
    children: e
  }) => (on(), c.jsx("span", {
    className: "inline-flex min-w-[22px] items-center justify-center rounded-[5px] border border-white/10 bg-[#323232] px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase leading-none text-zinc-100 shadow-[inset_0_-1px_0_rgba(0,0,0,0.35)]",
    children: e
  })),
  Ou = ({
    keys: e,
    label: t
  }) => (on(), c.jsxs("div", {
    className: "flex min-h-[28px] items-center justify-between gap-3",
    children: [c.jsx("span", {
      className: "flex flex-wrap items-center gap-1",
      children: e
    }), c.jsx("span", {
      className: "shrink-0 text-[11px] text-zinc-400",
      children: t
    })]
  })),
  Ame = ({
    title: e,
    children: t
  }) => (on(), c.jsxs("section", {
    className: "min-w-0",
    children: [c.jsx("h3", {
      className: "mb-2.5 text-[13px] font-semibold tracking-wide text-zinc-100",
      children: e
    }), c.jsx("div", {
      className: "space-y-1",
      children: t
    })]
  })),
  zva = ({
    open: e,
    onClose: t
  }) => (on(), g.useEffect(() => {
    if (!e) return;
    const n = r => {
      r.key === "Escape" && (r.preventDefault(), r.stopPropagation(), t());
    };
    return window.addEventListener("keydown", n, !0), () => window.removeEventListener("keydown", n, !0);
  }, [e, t]), e ? c.jsx("div", {
    className: "fixed inset-0 z-[12000] flex items-center justify-center bg-black/55 p-4",
    onPointerDown: t,
    children: c.jsxs("div", {
      className: "relative w-full max-w-[720px] rounded-2xl border border-white/10 bg-[#1a1a1a] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.55)]",
      onPointerDown: n => n.stopPropagation(),
      children: [c.jsxs("div", {
        className: "mb-4 flex items-center justify-between",
        children: [c.jsx("h2", {
          className: "text-[15px] font-semibold text-zinc-50",
          children: x("操作方式")
        }), c.jsx("button", {
          type: "button",
          onClick: t,
          className: "grid h-7 w-7 place-items-center rounded-md text-zinc-500 hover:bg-white/[0.06] hover:text-zinc-100",
          title: x("关闭"),
          children: c.jsx(Na, {
            size: 15
          })
        })]
      }), c.jsxs("div", {
        className: "grid grid-cols-1 gap-8 sm:grid-cols-2",
        children: [c.jsxs("div", {
          className: "space-y-6",
          children: [c.jsxs(Ame, {
            title: x("移动与视角"),
            children: [c.jsx(Ou, {
              keys: c.jsxs(c.Fragment, {
                children: [c.jsx(bl, {
                  children: "W"
                }), c.jsx(bl, {
                  children: "A"
                }), c.jsx(bl, {
                  children: "S"
                }), c.jsx(bl, {
                  children: "D"
                })]
              }),
              label: x("水平移动视角")
            }), c.jsx(Ou, {
              keys: c.jsxs(c.Fragment, {
                children: [c.jsx(bl, {
                  children: "Q"
                }), c.jsx(bl, {
                  children: "E"
                })]
              }),
              label: x("上升 / 下降视角")
            }), c.jsx(Ou, {
              keys: c.jsx(bl, {
                children: "F"
              }),
              label: x("聚焦选中物体")
            }), c.jsx(Ou, {
              keys: c.jsx(bl, {
                children: "Home"
              }),
              label: x("框住全部")
            }), c.jsx(Ou, {
              keys: c.jsxs(c.Fragment, {
                children: [c.jsx(bl, {
                  children: "Alt"
                }), c.jsx("span", {
                  className: "text-[9px] text-zinc-500",
                  children: "+"
                }), c.jsx("span", {
                  className: "text-[10px] text-zinc-300",
                  children: x("点击")
                })]
              }),
              label: x("设旋转中心")
            })]
          }), c.jsxs(Ame, {
            title: x("角色操控"),
            children: [c.jsx(Ou, {
              keys: c.jsx(bl, {
                children: "C"
              }),
              label: x("开关操控（或点底栏手柄图标）")
            }), c.jsx(Ou, {
              keys: c.jsxs(c.Fragment, {
                children: [c.jsx(bl, {
                  children: "W"
                }), c.jsx(bl, {
                  children: "A"
                }), c.jsx(bl, {
                  children: "S"
                }), c.jsx(bl, {
                  children: "D"
                })]
              }),
              label: x("地面行走")
            }), c.jsx(Ou, {
              keys: c.jsxs(c.Fragment, {
                children: [c.jsx(bl, {
                  children: "Shift"
                }), c.jsx("span", {
                  className: "text-[9px] text-zinc-500",
                  children: "+"
                }), c.jsx(bl, {
                  children: "W"
                }), c.jsx(bl, {
                  children: "A"
                }), c.jsx(bl, {
                  children: "S"
                }), c.jsx(bl, {
                  children: "D"
                })]
              }),
              label: x("奔跑")
            }), c.jsx(Ou, {
              keys: c.jsx(bl, {
                children: "Ctrl"
              }),
              label: x("蹲下 / 蹲走")
            }), c.jsx(Ou, {
              keys: c.jsx(bl, {
                children: "Space"
              }),
              label: x("跳跃（操控中；带方向为跳远）")
            }), c.jsx(Ou, {
              keys: c.jsxs(c.Fragment, {
                children: [c.jsx(bl, {
                  children: "Q"
                }), c.jsx(bl, {
                  children: "E"
                })]
              }),
              label: x("上升 / 下降")
            }), c.jsx(Ou, {
              keys: c.jsx("span", {
                className: "text-[10px] text-zinc-300",
                children: x("开自动K")
              }),
              label: x("走 / 跑 / 蹲记入姿势通道，时间轴随操控前进")
            })]
          }), c.jsxs(Ame, {
            title: x("对象操作"),
            children: [c.jsx(Ou, {
              keys: c.jsx("span", {
                className: "text-[10px] text-zinc-300",
                children: x("单击物体")
              }),
              label: x("选中并显示坐标轴")
            }), c.jsx(Ou, {
              keys: c.jsx("span", {
                className: "text-[10px] text-zinc-300",
                children: x("拖拽坐标轴")
              }),
              label: x("移动 / 旋转 / 缩放")
            }), c.jsx(Ou, {
              keys: c.jsx(bl, {
                children: "H"
              }),
              label: x("隐藏选中")
            }), c.jsx(Ou, {
              keys: c.jsxs(c.Fragment, {
                children: [c.jsx(bl, {
                  children: "Shift"
                }), c.jsx("span", {
                  className: "text-[9px] text-zinc-500",
                  children: "+"
                }), c.jsx(bl, {
                  children: "H"
                })]
              }),
              label: x("隔离选中")
            }), c.jsx(Ou, {
              keys: c.jsxs(c.Fragment, {
                children: [c.jsx(bl, {
                  children: "Alt"
                }), c.jsx("span", {
                  className: "text-[9px] text-zinc-500",
                  children: "+"
                }), c.jsx(bl, {
                  children: "H"
                })]
              }),
              label: x("退出隔离")
            }), c.jsx(Ou, {
              keys: c.jsxs(c.Fragment, {
                children: [c.jsx(bl, {
                  children: "Delete"
                }), c.jsx("span", {
                  className: "text-[9px] text-zinc-600",
                  children: x("或")
                }), c.jsx(bl, {
                  children: "Backspace"
                })]
              }),
              label: x("删除选中")
            }), c.jsx(Ou, {
              keys: c.jsxs(c.Fragment, {
                children: [c.jsx(bl, {
                  children: "Ctrl"
                }), c.jsx("span", {
                  className: "text-[9px] text-zinc-500",
                  children: "+"
                }), c.jsx(bl, {
                  children: "Shift"
                }), c.jsx("span", {
                  className: "text-[9px] text-zinc-500",
                  children: "+"
                }), c.jsx(bl, {
                  children: "D"
                })]
              }),
              label: x("分割图层；选中或压在动画片段上时只剪切该动画")
            })]
          })]
        }), c.jsxs("div", {
          className: "space-y-6",
          children: [c.jsxs(Ame, {
            title: x("视角导航"),
            children: [c.jsx(Ou, {
              keys: c.jsx("span", {
                className: "text-[10px] text-zinc-300",
                children: x("左键拖拽")
              }),
              label: x("旋转视角")
            }), c.jsx(Ou, {
              keys: c.jsx("span", {
                className: "text-[10px] text-zinc-300",
                children: x("右键拖拽")
              }),
              label: x("平移视角")
            }), c.jsx(Ou, {
              keys: c.jsx("span", {
                className: "text-[10px] text-zinc-300",
                children: x("滚轮")
              }),
              label: x("缩放距离")
            })]
          }), c.jsxs(Ame, {
            title: x("编辑与时间轴"),
            children: [c.jsx(Ou, {
              keys: c.jsx(bl, {
                children: "Space"
              }),
              label: x("播放 / 暂停（操控时为跳跃）")
            }), c.jsx(Ou, {
              keys: c.jsx(bl, {
                children: "K"
              }),
              label: x("打关键帧")
            }), c.jsx(Ou, {
              keys: c.jsxs(c.Fragment, {
                children: [c.jsx(bl, {
                  children: ","
                }), c.jsx("span", {
                  className: "text-[9px] text-zinc-600",
                  children: "/"
                }), c.jsx(bl, {
                  children: "."
                })]
              }),
              label: x("上一 / 下一关键帧")
            }), c.jsx(Ou, {
              keys: c.jsx(bl, {
                children: "V"
              }),
              label: x("选择工具")
            }), c.jsx(Ou, {
              keys: c.jsx(bl, {
                children: "B"
              }),
              label: x("摆姿工具")
            }), c.jsx(Ou, {
              keys: c.jsxs(c.Fragment, {
                children: [c.jsx(bl, {
                  children: "Shift"
                }), c.jsx("span", {
                  className: "text-[9px] text-zinc-500",
                  children: "+"
                }), c.jsx(bl, {
                  children: "V"
                })]
              }),
              label: x("隐藏界面边框")
            }), c.jsx(Ou, {
              keys: c.jsxs(c.Fragment, {
                children: [c.jsx(bl, {
                  children: "Ctrl"
                }), c.jsx("span", {
                  className: "text-[9px] text-zinc-500",
                  children: "+"
                }), c.jsx(bl, {
                  children: "Z"
                })]
              }),
              label: x("撤销")
            }), c.jsx(Ou, {
              keys: c.jsxs(c.Fragment, {
                children: [c.jsx(bl, {
                  children: "Ctrl"
                }), c.jsx("span", {
                  className: "text-[9px] text-zinc-500",
                  children: "+"
                }), c.jsx(bl, {
                  children: "Shift"
                }), c.jsx("span", {
                  className: "text-[9px] text-zinc-500",
                  children: "+"
                }), c.jsx(bl, {
                  children: "Z"
                })]
              }),
              label: x("重做")
            }), c.jsx(Ou, {
              keys: c.jsxs(c.Fragment, {
                children: [c.jsx(bl, {
                  children: "Ctrl"
                }), c.jsx("span", {
                  className: "text-[9px] text-zinc-500",
                  children: "+"
                }), c.jsx(bl, {
                  children: "C"
                }), c.jsx("span", {
                  className: "text-[9px] text-zinc-600",
                  children: "/"
                }), c.jsx(bl, {
                  children: "V"
                })]
              }),
              label: x("复制 / 粘贴关键帧")
            }), c.jsx(Ou, {
              keys: c.jsx(bl, {
                children: "Esc"
              }),
              label: x("关闭本面板")
            })]
          })]
        })]
      })]
    })
  }) : null),
  Uva = [{
    id: "upload",
    label: "本地上传",
    tone: "#202226",
    kind: "upload"
  }, {
    id: "male",
    label: "标准男性",
    tone: "#3f82db",
    patch: {
      color: "#4d91ed"
    }
  }, {
    id: "female",
    label: "标准女性",
    tone: "#b15ec9",
    patch: {
      color: "#b76fd3",
      scale: [.94, .96, .94]
    }
  }, {
    id: "strong",
    label: "健硕",
    tone: "#c57945",
    patch: {
      color: "#d18b58",
      scale: [1.16, 1.05, 1.08]
    }
  }, {
    id: "slim",
    label: "纤细",
    tone: "#4da29a",
    patch: {
      color: "#64b9af",
      scale: [.84, 1.05, .84]
    }
  }, {
    id: "teen",
    label: "少年",
    tone: "#6484d4",
    patch: {
      color: "#7899e8",
      scale: [.82, .86, .82]
    }
  }, {
    id: "child",
    label: "儿童",
    tone: "#d29d45",
    patch: {
      color: "#e3ad55",
      scale: [.7, .68, .7]
    }
  }, {
    id: "broad",
    label: "宽厚",
    tone: "#8c7163",
    patch: {
      color: "#9f8070",
      scale: [1.28, 1, 1.15]
    }
  }, {
    id: "chibi",
    label: "二头身",
    tone: "#d85c73",
    patch: {
      color: "#e76d84",
      scale: [.82, .52, .82]
    }
  }, {
    id: "crowd",
    label: "群众 (3x3)",
    tone: "#4f7762",
    kind: "crowd"
  }, {
    id: "geometry",
    label: "几何模型",
    tone: "#595d66",
    kind: "geometry"
  }],
  $va = [{
    id: "current",
    label: "当前视角",
    patch: {}
  }, {
    id: "front-medium",
    label: "正面中景",
    patch: {
      position: [0, 1.8, 4.8],
      lookAt: [0, 1.15, 0],
      fov: 44
    }
  }, {
    id: "front-close",
    label: "正面特写",
    patch: {
      position: [0, 1.75, 2.4],
      lookAt: [0, 1.45, 0],
      fov: 38
    }
  }, {
    id: "front-wide",
    label: "正面全景",
    patch: {
      position: [0, 2.2, 7.8],
      lookAt: [0, 1, 0],
      fov: 52
    }
  }, {
    id: "side-track",
    label: "侧面跟拍",
    patch: {
      position: [5.4, 1.6, .4],
      lookAt: [0, 1.15, 0],
      fov: 46
    }
  }, {
    id: "side-close",
    label: "侧面近景",
    patch: {
      position: [2.7, 1.7, .2],
      lookAt: [0, 1.4, 0],
      fov: 40
    }
  }, {
    id: "back-medium",
    label: "背面中景",
    patch: {
      position: [0, 1.8, -4.8],
      lookAt: [0, 1.15, 0],
      fov: 44
    }
  }, {
    id: "top-wide",
    label: "俯拍全景",
    patch: {
      position: [0, 8.5, 4.2],
      lookAt: [0, .4, 0],
      fov: 55
    }
  }, {
    id: "top-45",
    label: "45° 俯拍",
    patch: {
      position: [4.8, 5.4, 5.2],
      lookAt: [0, .8, 0],
      fov: 48
    }
  }, {
    id: "low",
    label: "低角度仰拍",
    patch: {
      position: [0, .35, 3.5],
      lookAt: [0, 1.55, 0],
      fov: 44
    }
  }, {
    id: "low-wide",
    label: "低角度广角",
    patch: {
      position: [0, .28, 3.1],
      lookAt: [0, 1.35, 0],
      fov: 68
    }
  }, {
    id: "ots-left",
    label: "过肩镜头",
    patch: {
      position: [-1.25, 1.65, 2.4],
      lookAt: [.4, 1.35, 0],
      fov: 42
    }
  }, {
    id: "ots-right",
    label: "过肩镜头（右）",
    patch: {
      position: [1.25, 1.65, 2.4],
      lookAt: [-.4, 1.35, 0],
      fov: 42
    }
  }, {
    id: "bird",
    label: "鸟瞰",
    patch: {
      position: [0, 10, .01],
      lookAt: [0, 0, 0],
      fov: 58
    }
  }, {
    id: "dutch",
    label: "荷兰角",
    patch: {
      position: [3.6, 2.2, 4.8],
      lookAt: [0, 1.1, 0],
      rotation: [0, 0, -18],
      fov: 48
    }
  }],
  Cbt = [{
    kind: "chair",
    label: "椅子",
    color: "#8b7b68"
  }, {
    kind: "table",
    label: "桌子",
    color: "#7c6a58"
  }, {
    kind: "sofa",
    label: "沙发",
    color: "#5f6c7b"
  }, {
    kind: "arch",
    label: "拱门",
    color: "#cbb08a"
  }, {
    kind: "stairs",
    label: "楼梯",
    color: "#a8987e"
  }, {
    kind: "door",
    label: "门",
    color: "#8a7358"
  }, {
    kind: "window",
    label: "窗",
    color: "#b7ccd8"
  }, {
    kind: "tree",
    label: "树",
    color: "#4f7d46"
  }, {
    kind: "car",
    label: "车辆",
    color: "#7a8a9a"
  }, {
    kind: "plant",
    label: "植物",
    color: "#6f9d5a"
  }, {
    kind: "building",
    label: "建筑",
    color: "#9a8f7e"
  }, {
    kind: "road",
    label: "道路",
    color: "#6b7280"
  }],
  Gva = [{
    value: "auto",
    label: "自适应"
  }, {
    value: "2.39:1",
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
  Vva = [{
    kind: "dolly_in",
    label: "推近",
    hint: "沿视线靠近主体"
  }, {
    kind: "dolly_out",
    label: "拉远",
    hint: "沿视线远离主体"
  }, {
    kind: "crane_up",
    label: "上升",
    hint: "升高机位俯看"
  }, {
    kind: "crane_down",
    label: "下降",
    hint: "降低机位靠近主体高度"
  }, {
    kind: "arc",
    label: "半弧",
    hint: "绕注视点扫半圈"
  }],
  Ijt = (e, t) => [e[0] - t[0], e[1] - t[1], e[2] - t[2]],
  C0e = (e, t) => [e[0] + t[0], e[1] + t[1], e[2] + t[2]],
  INe = (e, t) => [e[0] * t, e[1] * t, e[2] * t],
  Cjt = e => Math.hypot(e[0], e[1], e[2]),
  $Jt = e => {
    const t = Cjt(e);
    return t < 1e-6 ? [0, 0, 1] : [e[0] / t, e[1] / t, e[2] / t];
  },
  Hva = (e, t, n) => C0e(e, INe(Ijt(t, e), n)),
  GJt = (e, t) => {
    const n = Math.cos(t),
      r = Math.sin(t);
    return [e[0] * n + e[2] * r, e[1], -e[0] * r + e[2] * n];
  },
  Vnt = e => {
    const t = Math.max(0, e.lastFrame),
      n = Math.max(0, Math.min(t, e.workAreaStart)),
      r = Math.max(n, Math.min(t, e.workAreaEnd));
    if (n <= 0 && r >= t) {
      const i = Math.max(0, Math.min(t, Math.round(e.playhead))),
        o = Math.max(i + 1, Math.min(t, i + Math.max(2, Math.round(e.fps * 2))));
      return {
        start: i,
        end: o
      };
    }
    return {
      start: n,
      end: Math.max(n + 1, r)
    };
  },
  Wva = e => e === "arc" ? 9 : 2,
  qva = e => {
    const {
        kind: t,
        position: n,
        lookAt: r
      } = e,
      a = e.direction,
      i = Ijt(n, r),
      o = Math.max(.35, Cjt(i)),
      s = $Jt(i),
      l = $Jt(GJt([s[0], 0, s[2]], Math.PI / 2)),
      d = Wva(t);
    if (t === "dolly_in" || t === "dolly_out") {
      let m = C0e(r, INe(s, o * (t === "dolly_in" ? .45 : 1.8)));
      return a === "left" && (m = C0e(m, INe(l, -.8))), a === "right" && (m = C0e(m, INe(l, .8))), a === "up" && (m = [m[0], m[1] + .6, m[2]]), a === "down" && (m = [m[0], Math.max(.2, m[1] - .6), m[2]]), [{
        position: n,
        lookAt: r
      }, {
        position: m,
        lookAt: r
      }];
    }
    if (t === "crane_up" || t === "crane_down") {
      const p = t === "crane_up" ? 2.4 : -2.4,
        m = Math.max(.25, n[1] + p),
        f = a !== "up" && a !== "down" ? r[1] : Math.max(.2, r[1] + p * .35);
      return [{
        position: n,
        lookAt: r
      }, {
        position: [n[0], m, n[2]],
        lookAt: [r[0], f, r[2]]
      }];
    }
    const h = (a !== "counterclockwise" ? -1 : 1) * Math.PI;
    return Array.from({
      length: d
    }, (p, m) => {
      const f = d === 1 ? 1 : m / (d - 1);
      return {
        position: C0e(r, GJt(i, h * f)),
        lookAt: r
      };
    });
  },
  dqn = e => {
    const t = qva({
        kind: e.kind,
        direction: e.direction,
        position: e.camera.position,
        lookAt: e.lookAt
      }),
      n = Math.max(0, Math.round(e.startFrame)),
      r = Math.max(n + 1, Math.round(e.endFrame)),
      a = t.length - 1;
    return t.map((i, o) => {
      var d;
      const s = a <= 0 ? 1 : o / a,
        l = Math.round(n + (r - n) * s);
      return {
        id: ((d = e.makeId) == null ? void 0 : d.call(e)) ?? `kf-move-${e.camera.id}-${l}-${o}`,
        frame: l,
        cameraId: e.camera.id,
        position: i.position,
        lookAt: i.lookAt,
        fov: e.camera.fov,
        channels: ["position", "lookAt"]
      };
    });
  },
  Kva = (e, t, n, r, a) => {
    const i = Math.min(n, r),
      o = Math.max(n, r);
    return [...e.filter(l => l.cameraId !== t || l.frame < i || l.frame > o), ...a].sort((l, d) => l.frame - d.frame || l.id.localeCompare(d.id));
  },
  Ebt = (e, t) => {
    if (e.length === 0) return [0, 0, 0];
    if (e.length === 1 || t <= 0) return e[0];
    if (t >= 1) return e[e.length - 1];
    const n = [0];
    for (let i = 1; i < e.length; i += 1) n.push(n[i - 1] + Math.max(1e-4, Cjt(Ijt(e[i], e[i - 1]))));
    const a = n[n.length - 1] * t;
    for (let i = 1; i < e.length; i += 1) if (a <= n[i]) {
      const o = n[i] - n[i - 1],
        s = o < 1e-6 ? 1 : (a - n[i - 1]) / o;
      return Hva(e[i - 1], e[i], s);
    }
    return e[e.length - 1];
  },
  uqn = e => {
    const t = Math.max(0, Math.round(e.startFrame)),
      n = Math.max(t + 1, Math.round(e.endFrame)),
      r = Math.max(2, Math.min(24, n - t + 1)),
      a = e.cameraPoints.length ? e.cameraPoints : [e.fallbackPosition],
      i = e.targetPoints.length ? e.targetPoints : [e.fallbackLookAt];
    return Array.from({
      length: r
    }, (o, s) => {
      var u;
      const l = r === 1 ? 1 : s / (r - 1),
        d = Math.round(t + (n - t) * l);
      return {
        id: ((u = e.makeId) == null ? void 0 : u.call(e)) ?? `kf-path-${e.cameraId}-${d}-${s}`,
        frame: d,
        cameraId: e.cameraId,
        position: Ebt(a, l),
        lookAt: Ebt(i, l),
        fov: e.fov,
        channels: ["position", "lookAt"]
      };
    });
  },
  Qva = (e, t, n, r, a) => {
    const i = Math.min(n, r),
      o = Math.max(n, r);
    return [...e.filter(l => l.objectId !== t || l.frame < i || l.frame > o), ...a].sort((l, d) => l.frame - d.frame || l.id.localeCompare(d.id));
  },
  Yva = e => {
    const t = Math.max(0, Math.round(e.startFrame)),
      n = Math.max(t + 1, Math.round(e.endFrame)),
      r = Math.max(e.points.length, Math.min(24, n - t + 1)),
      a = e.points.length ? e.points : [[0, 0, 0]];
    return Array.from({
      length: r
    }, (i, o) => {
      var d;
      const s = r === 1 ? 1 : o / (r - 1),
        l = Math.round(t + (n - t) * s);
      return {
        id: ((d = e.makeId) == null ? void 0 : d.call(e)) ?? `kf-opath-${e.objectId}-${l}-${o}`,
        frame: l,
        objectId: e.objectId,
        position: Ebt(a, s),
        rotation: e.rotation,
        scale: e.scale,
        channels: ["position"]
      };
    });
  },
  Xva = "/models/director3d/props",
  BYe = [{
    id: "chair",
    kind: "chair",
    label: "椅子",
    file: "furniture/chair.glb",
    targetHeight: .92
  }, {
    id: "chair-cushion",
    kind: "chair",
    label: "靠垫椅",
    file: "furniture/chairCushion.glb",
    targetHeight: .92
  }, {
    id: "chair-desk",
    kind: "chair",
    label: "书桌椅",
    file: "furniture/chairDesk.glb",
    targetHeight: .92
  }, {
    id: "chair-modern",
    kind: "chair",
    label: "现代椅",
    file: "furniture/chairModernCushion.glb",
    targetHeight: .9
  }, {
    id: "chair-modern-frame",
    kind: "chair",
    label: "现代框椅",
    file: "furniture/chairModernFrameCushion.glb",
    targetHeight: .9
  }, {
    id: "chair-rounded",
    kind: "chair",
    label: "圆椅",
    file: "furniture/chairRounded.glb",
    targetHeight: .88
  }, {
    id: "lounge-chair",
    kind: "chair",
    label: "躺椅",
    file: "furniture/loungeChair.glb",
    targetHeight: .95
  }, {
    id: "lounge-chair-relax",
    kind: "chair",
    label: "休闲躺椅",
    file: "furniture/loungeChairRelax.glb",
    targetHeight: .9
  }, {
    id: "design-chair",
    kind: "chair",
    label: "设计椅",
    file: "furniture/loungeDesignChair.glb",
    targetHeight: .92
  }, {
    id: "stool-bar",
    kind: "chair",
    label: "吧凳",
    file: "furniture/stoolBar.glb",
    targetHeight: .78
  }, {
    id: "stool-bar-square",
    kind: "chair",
    label: "方吧凳",
    file: "furniture/stoolBarSquare.glb",
    targetHeight: .78
  }, {
    id: "bench",
    kind: "chair",
    label: "长椅",
    file: "furniture/bench.glb",
    targetHeight: .55
  }, {
    id: "bench-cushion",
    kind: "chair",
    label: "靠垫长椅",
    file: "furniture/benchCushion.glb",
    targetHeight: .58
  }, {
    id: "bench-cushion-low",
    kind: "chair",
    label: "矮长椅",
    file: "furniture/benchCushionLow.glb",
    targetHeight: .48
  }, {
    id: "table",
    kind: "table",
    label: "桌子",
    file: "furniture/table.glb",
    targetHeight: .76
  }, {
    id: "table-cloth",
    kind: "table",
    label: "桌布桌",
    file: "furniture/tableCloth.glb",
    targetHeight: .76
  }, {
    id: "table-round",
    kind: "table",
    label: "圆桌",
    file: "furniture/tableRound.glb",
    targetHeight: .76
  }, {
    id: "table-glass",
    kind: "table",
    label: "玻璃桌",
    file: "furniture/tableGlass.glb",
    targetHeight: .76
  }, {
    id: "table-cross",
    kind: "table",
    label: "十字桌",
    file: "furniture/tableCross.glb",
    targetHeight: .76
  }, {
    id: "table-cross-cloth",
    kind: "table",
    label: "十字桌布桌",
    file: "furniture/tableCrossCloth.glb",
    targetHeight: .76
  }, {
    id: "table-coffee",
    kind: "table",
    label: "茶几",
    file: "furniture/tableCoffee.glb",
    targetHeight: .42
  }, {
    id: "table-coffee-square",
    kind: "table",
    label: "方茶几",
    file: "furniture/tableCoffeeSquare.glb",
    targetHeight: .42
  }, {
    id: "table-coffee-glass",
    kind: "table",
    label: "玻璃茶几",
    file: "furniture/tableCoffeeGlass.glb",
    targetHeight: .42
  }, {
    id: "table-coffee-glass-square",
    kind: "table",
    label: "方玻璃茶几",
    file: "furniture/tableCoffeeGlassSquare.glb",
    targetHeight: .42
  }, {
    id: "desk",
    kind: "table",
    label: "书桌",
    file: "furniture/desk.glb",
    targetHeight: .76
  }, {
    id: "desk-corner",
    kind: "table",
    label: "转角书桌",
    file: "furniture/deskCorner.glb",
    targetHeight: .76
  }, {
    id: "kitchen-bar",
    kind: "table",
    label: "吧台",
    file: "furniture/kitchenBar.glb",
    targetHeight: 1.05
  }, {
    id: "kitchen-bar-end",
    kind: "table",
    label: "吧台端",
    file: "furniture/kitchenBarEnd.glb",
    targetHeight: 1.05
  }, {
    id: "sofa",
    kind: "sofa",
    label: "沙发",
    file: "furniture/loungeSofa.glb",
    targetHeight: .88
  }, {
    id: "sofa-long",
    kind: "sofa",
    label: "长沙发",
    file: "furniture/loungeSofaLong.glb",
    targetHeight: .88
  }, {
    id: "sofa-corner",
    kind: "sofa",
    label: "转角沙发",
    file: "furniture/loungeSofaCorner.glb",
    targetHeight: .88
  }, {
    id: "sofa-ottoman",
    kind: "sofa",
    label: "脚凳",
    file: "furniture/loungeSofaOttoman.glb",
    targetHeight: .42
  }, {
    id: "design-sofa",
    kind: "sofa",
    label: "设计沙发",
    file: "furniture/loungeDesignSofa.glb",
    targetHeight: .86
  }, {
    id: "design-sofa-corner",
    kind: "sofa",
    label: "设计转角沙发",
    file: "furniture/loungeDesignSofaCorner.glb",
    targetHeight: .86
  }, {
    id: "tower-arch",
    kind: "arch",
    label: "方塔拱门",
    file: "medieval/tower-square-arch.glb",
    targetHeight: 2.6
  }, {
    id: "gate",
    kind: "arch",
    label: "城门",
    file: "medieval/gate.glb",
    targetHeight: 2.8
  }, {
    id: "metal-gate",
    kind: "arch",
    label: "铁门",
    file: "medieval/metal-gate.glb",
    targetHeight: 2.4
  }, {
    id: "wall-narrow-gate",
    kind: "arch",
    label: "窄门洞",
    file: "medieval/wall-narrow-gate.glb",
    targetHeight: 2.5
  }, {
    id: "wall-doorway",
    kind: "arch",
    label: "墙门洞",
    file: "medieval/wall-doorway.glb",
    targetHeight: 2.5
  }, {
    id: "stairs-stone",
    kind: "stairs",
    label: "石阶",
    file: "medieval/stairs-stone.glb",
    targetHeight: 1.6
  }, {
    id: "stairs-stone-square",
    kind: "stairs",
    label: "方石阶",
    file: "medieval/stairs-stone-square.glb",
    targetHeight: 1.5
  }, {
    id: "wall-narrow-stairs",
    kind: "stairs",
    label: "窄墙阶",
    file: "medieval/wall-narrow-stairs.glb",
    targetHeight: 2.2
  }, {
    id: "wall-narrow-stairs-rail",
    kind: "stairs",
    label: "带栏杆窄阶",
    file: "medieval/wall-narrow-stairs-rail.glb",
    targetHeight: 2.2
  }, {
    id: "door",
    kind: "door",
    label: "木门",
    file: "medieval/door.glb",
    targetHeight: 2.1
  }, {
    id: "door-wall",
    kind: "door",
    label: "门洞墙",
    file: "medieval/wall-doorway.glb",
    targetHeight: 2.5
  }, {
    id: "door-gate",
    kind: "door",
    label: "大门",
    file: "medieval/gate.glb",
    targetHeight: 2.8
  }, {
    id: "door-metal",
    kind: "door",
    label: "铁栅门",
    file: "medieval/metal-gate.glb",
    targetHeight: 2.4
  }, {
    id: "tower-windows",
    kind: "window",
    label: "塔窗墙",
    file: "medieval/tower-square-mid-windows.glb",
    targetHeight: 2.2
  }, {
    id: "tower-high-windows",
    kind: "window",
    label: "高窗屋顶",
    file: "medieval/tower-square-top-roof-high-windows.glb",
    targetHeight: 2.4
  }, {
    id: "tree-default",
    kind: "tree",
    label: "树",
    file: "nature/tree_default.glb",
    targetHeight: 3.4
  }, {
    id: "tree-oak",
    kind: "tree",
    label: "橡树",
    file: "nature/tree_oak.glb",
    targetHeight: 3.6
  }, {
    id: "tree-detailed",
    kind: "tree",
    label: "细树冠",
    file: "nature/tree_detailed.glb",
    targetHeight: 3.5
  }, {
    id: "tree-simple",
    kind: "tree",
    label: "简树",
    file: "nature/tree_simple.glb",
    targetHeight: 3.2
  }, {
    id: "tree-tall",
    kind: "tree",
    label: "高树",
    file: "nature/tree_tall.glb",
    targetHeight: 4.2
  }, {
    id: "tree-small",
    kind: "tree",
    label: "小树",
    file: "nature/tree_small.glb",
    targetHeight: 2.2
  }, {
    id: "tree-fat",
    kind: "tree",
    label: "阔树",
    file: "nature/tree_fat.glb",
    targetHeight: 3.2
  }, {
    id: "tree-thin",
    kind: "tree",
    label: "细树",
    file: "nature/tree_thin.glb",
    targetHeight: 3.4
  }, {
    id: "tree-cone",
    kind: "tree",
    label: "锥形树",
    file: "nature/tree_cone.glb",
    targetHeight: 3.6
  }, {
    id: "tree-pine",
    kind: "tree",
    label: "松树",
    file: "nature/tree_pineTallA.glb",
    targetHeight: 4.4
  }, {
    id: "tree-pine-round",
    kind: "tree",
    label: "圆松",
    file: "nature/tree_pineRoundA.glb",
    targetHeight: 3.2
  }, {
    id: "tree-palm",
    kind: "tree",
    label: "棕榈",
    file: "nature/tree_palm.glb",
    targetHeight: 4
  }, {
    id: "tree-palm-tall",
    kind: "tree",
    label: "高棕榈",
    file: "nature/tree_palmTall.glb",
    targetHeight: 4.6
  }, {
    id: "tree-palm-short",
    kind: "tree",
    label: "矮棕榈",
    file: "nature/tree_palmShort.glb",
    targetHeight: 2.8
  }, {
    id: "tree-house-large",
    kind: "tree",
    label: "宅院大树",
    file: "house/tree-large.glb",
    targetHeight: 3.8
  }, {
    id: "tree-house-small",
    kind: "tree",
    label: "宅院小树",
    file: "house/tree-small.glb",
    targetHeight: 2.4
  }, {
    id: "sedan",
    kind: "car",
    label: "轿车",
    file: "vehicle/sedan.glb",
    targetHeight: 1.48
  }, {
    id: "sedan-sports",
    kind: "car",
    label: "运动轿车",
    file: "vehicle/sedan-sports.glb",
    targetHeight: 1.38
  }, {
    id: "suv",
    kind: "car",
    label: "SUV",
    file: "vehicle/suv.glb",
    targetHeight: 1.72
  }, {
    id: "suv-luxury",
    kind: "car",
    label: "豪华 SUV",
    file: "vehicle/suv-luxury.glb",
    targetHeight: 1.78
  }, {
    id: "taxi",
    kind: "car",
    label: "出租车",
    file: "vehicle/taxi.glb",
    targetHeight: 1.5
  }, {
    id: "police",
    kind: "car",
    label: "警车",
    file: "vehicle/police.glb",
    targetHeight: 1.52
  }, {
    id: "hatchback-sports",
    kind: "car",
    label: "两厢运动车",
    file: "vehicle/hatchback-sports.glb",
    targetHeight: 1.4
  }, {
    id: "van",
    kind: "car",
    label: "面包车",
    file: "vehicle/van.glb",
    targetHeight: 1.85
  }, {
    id: "truck",
    kind: "car",
    label: "卡车",
    file: "vehicle/truck.glb",
    targetHeight: 2.1
  }, {
    id: "truck-flat",
    kind: "car",
    label: "平板卡车",
    file: "vehicle/truck-flat.glb",
    targetHeight: 2
  }, {
    id: "delivery",
    kind: "car",
    label: "厢式货车",
    file: "vehicle/delivery.glb",
    targetHeight: 2
  }, {
    id: "delivery-flat",
    kind: "car",
    label: "平板货车",
    file: "vehicle/delivery-flat.glb",
    targetHeight: 1.9
  }, {
    id: "ambulance",
    kind: "car",
    label: "救护车",
    file: "vehicle/ambulance.glb",
    targetHeight: 2.15
  }, {
    id: "firetruck",
    kind: "car",
    label: "消防车",
    file: "vehicle/firetruck.glb",
    targetHeight: 2.4
  }, {
    id: "garbage-truck",
    kind: "car",
    label: "垃圾车",
    file: "vehicle/garbage-truck.glb",
    targetHeight: 2.3
  }, {
    id: "race",
    kind: "car",
    label: "赛车",
    file: "vehicle/race.glb",
    targetHeight: 1.2
  }, {
    id: "race-future",
    kind: "car",
    label: "未来赛车",
    file: "vehicle/race-future.glb",
    targetHeight: 1.15
  }, {
    id: "tractor",
    kind: "car",
    label: "拖拉机",
    file: "vehicle/tractor.glb",
    targetHeight: 1.7
  }, {
    id: "tractor-shovel",
    kind: "car",
    label: "铲车",
    file: "vehicle/tractor-shovel.glb",
    targetHeight: 1.75
  }, {
    id: "tractor-police",
    kind: "car",
    label: "警用拖拉机",
    file: "vehicle/tractor-police.glb",
    targetHeight: 1.7
  }, {
    id: "potted-plant",
    kind: "plant",
    label: "盆栽",
    file: "furniture/pottedPlant.glb",
    targetHeight: .85
  }, {
    id: "plant-small-1",
    kind: "plant",
    label: "小盆栽 1",
    file: "furniture/plantSmall1.glb",
    targetHeight: .45
  }, {
    id: "plant-small-2",
    kind: "plant",
    label: "小盆栽 2",
    file: "furniture/plantSmall2.glb",
    targetHeight: .45
  }, {
    id: "plant-small-3",
    kind: "plant",
    label: "小盆栽 3",
    file: "furniture/plantSmall3.glb",
    targetHeight: .45
  }, {
    id: "plant-bush",
    kind: "plant",
    label: "灌木",
    file: "nature/plant_bush.glb",
    targetHeight: .9
  }, {
    id: "plant-bush-large",
    kind: "plant",
    label: "大灌木",
    file: "nature/plant_bushLarge.glb",
    targetHeight: 1.3
  }, {
    id: "plant-bush-small",
    kind: "plant",
    label: "小灌木",
    file: "nature/plant_bushSmall.glb",
    targetHeight: .7
  }, {
    id: "plant-bush-detailed",
    kind: "plant",
    label: "细灌木",
    file: "nature/plant_bushDetailed.glb",
    targetHeight: 1
  }, {
    id: "flower-red",
    kind: "plant",
    label: "红花",
    file: "nature/flower_redA.glb",
    targetHeight: .35
  }, {
    id: "flower-yellow",
    kind: "plant",
    label: "黄花",
    file: "nature/flower_yellowA.glb",
    targetHeight: .35
  }, {
    id: "flower-purple",
    kind: "plant",
    label: "紫花",
    file: "nature/flower_purpleA.glb",
    targetHeight: .35
  }, {
    id: "cactus-short",
    kind: "plant",
    label: "矮仙人掌",
    file: "nature/cactus_short.glb",
    targetHeight: .55
  }, {
    id: "cactus-tall",
    kind: "plant",
    label: "高仙人掌",
    file: "nature/cactus_tall.glb",
    targetHeight: 1.15
  }, {
    id: "grass",
    kind: "plant",
    label: "草丛",
    file: "nature/grass.glb",
    targetHeight: .28
  }, {
    id: "grass-large",
    kind: "plant",
    label: "大草丛",
    file: "nature/grass_large.glb",
    targetHeight: .4
  }, {
    id: "pot-large",
    kind: "plant",
    label: "大花盆",
    file: "nature/pot_large.glb",
    targetHeight: .45
  }, {
    id: "pot-small",
    kind: "plant",
    label: "小花盆",
    file: "nature/pot_small.glb",
    targetHeight: .28
  }, {
    id: "building-a",
    kind: "building",
    label: "商业楼 A",
    file: "building/building-a.glb",
    targetHeight: 8
  }, {
    id: "building-b",
    kind: "building",
    label: "商业楼 B",
    file: "building/building-b.glb",
    targetHeight: 8
  }, {
    id: "building-c",
    kind: "building",
    label: "商业楼 C",
    file: "building/building-c.glb",
    targetHeight: 8
  }, {
    id: "building-d",
    kind: "building",
    label: "商业楼 D",
    file: "building/building-d.glb",
    targetHeight: 8
  }, {
    id: "building-e",
    kind: "building",
    label: "商业楼 E",
    file: "building/building-e.glb",
    targetHeight: 8
  }, {
    id: "building-f",
    kind: "building",
    label: "商业楼 F",
    file: "building/building-f.glb",
    targetHeight: 8
  }, {
    id: "building-g",
    kind: "building",
    label: "商业楼 G",
    file: "building/building-g.glb",
    targetHeight: 8
  }, {
    id: "building-h",
    kind: "building",
    label: "商业楼 H",
    file: "building/building-h.glb",
    targetHeight: 8
  }, {
    id: "building-i",
    kind: "building",
    label: "商业楼 I",
    file: "building/building-i.glb",
    targetHeight: 8
  }, {
    id: "building-j",
    kind: "building",
    label: "商业楼 J",
    file: "building/building-j.glb",
    targetHeight: 8
  }, {
    id: "building-k",
    kind: "building",
    label: "商业楼 K",
    file: "building/building-k.glb",
    targetHeight: 8
  }, {
    id: "building-l",
    kind: "building",
    label: "商业楼 L",
    file: "building/building-l.glb",
    targetHeight: 8
  }, {
    id: "building-m",
    kind: "building",
    label: "商业楼 M",
    file: "building/building-m.glb",
    targetHeight: 8
  }, {
    id: "building-n",
    kind: "building",
    label: "商业楼 N",
    file: "building/building-n.glb",
    targetHeight: 8
  }, {
    id: "skyscraper-a",
    kind: "building",
    label: "摩天楼 A",
    file: "building/building-skyscraper-a.glb",
    targetHeight: 18
  }, {
    id: "skyscraper-b",
    kind: "building",
    label: "摩天楼 B",
    file: "building/building-skyscraper-b.glb",
    targetHeight: 18
  }, {
    id: "skyscraper-c",
    kind: "building",
    label: "摩天楼 C",
    file: "building/building-skyscraper-c.glb",
    targetHeight: 18
  }, {
    id: "skyscraper-d",
    kind: "building",
    label: "摩天楼 D",
    file: "building/building-skyscraper-d.glb",
    targetHeight: 18
  }, {
    id: "skyscraper-e",
    kind: "building",
    label: "摩天楼 E",
    file: "building/building-skyscraper-e.glb",
    targetHeight: 18
  }, {
    id: "house-a",
    kind: "building",
    label: "住宅 A",
    file: "house/building-type-a.glb",
    targetHeight: 5
  }, {
    id: "house-b",
    kind: "building",
    label: "住宅 B",
    file: "house/building-type-b.glb",
    targetHeight: 5
  }, {
    id: "house-c",
    kind: "building",
    label: "住宅 C",
    file: "house/building-type-c.glb",
    targetHeight: 5
  }, {
    id: "house-d",
    kind: "building",
    label: "住宅 D",
    file: "house/building-type-d.glb",
    targetHeight: 5
  }, {
    id: "house-e",
    kind: "building",
    label: "住宅 E",
    file: "house/building-type-e.glb",
    targetHeight: 5
  }, {
    id: "house-f",
    kind: "building",
    label: "住宅 F",
    file: "house/building-type-f.glb",
    targetHeight: 5
  }, {
    id: "house-g",
    kind: "building",
    label: "住宅 G",
    file: "house/building-type-g.glb",
    targetHeight: 5
  }, {
    id: "house-h",
    kind: "building",
    label: "住宅 H",
    file: "house/building-type-h.glb",
    targetHeight: 5
  }, {
    id: "house-i",
    kind: "building",
    label: "住宅 I",
    file: "house/building-type-i.glb",
    targetHeight: 5
  }, {
    id: "house-j",
    kind: "building",
    label: "住宅 J",
    file: "house/building-type-j.glb",
    targetHeight: 5
  }, {
    id: "house-k",
    kind: "building",
    label: "住宅 K",
    file: "house/building-type-k.glb",
    targetHeight: 5
  }, {
    id: "house-l",
    kind: "building",
    label: "住宅 L",
    file: "house/building-type-l.glb",
    targetHeight: 5
  }, {
    id: "house-m",
    kind: "building",
    label: "住宅 M",
    file: "house/building-type-m.glb",
    targetHeight: 5
  }, {
    id: "house-n",
    kind: "building",
    label: "住宅 N",
    file: "house/building-type-n.glb",
    targetHeight: 5
  }, {
    id: "house-o",
    kind: "building",
    label: "住宅 O",
    file: "house/building-type-o.glb",
    targetHeight: 5
  }, {
    id: "house-p",
    kind: "building",
    label: "住宅 P",
    file: "house/building-type-p.glb",
    targetHeight: 5
  }, {
    id: "house-q",
    kind: "building",
    label: "住宅 Q",
    file: "house/building-type-q.glb",
    targetHeight: 5
  }, {
    id: "house-r",
    kind: "building",
    label: "住宅 R",
    file: "house/building-type-r.glb",
    targetHeight: 5
  }, {
    id: "house-s",
    kind: "building",
    label: "住宅 S",
    file: "house/building-type-s.glb",
    targetHeight: 5
  }, {
    id: "house-t",
    kind: "building",
    label: "住宅 T",
    file: "house/building-type-t.glb",
    targetHeight: 5
  }, {
    id: "house-u",
    kind: "building",
    label: "住宅 U",
    file: "house/building-type-u.glb",
    targetHeight: 5
  }, {
    id: "fence",
    kind: "building",
    label: "栅栏",
    file: "house/fence.glb",
    targetHeight: 1.2
  }, {
    id: "fence-low",
    kind: "building",
    label: "矮栅栏",
    file: "house/fence-low.glb",
    targetHeight: .7
  }, {
    id: "driveway-long",
    kind: "building",
    label: "长车道",
    file: "house/driveway-long.glb",
    targetHeight: .15,
    targetWidth: 6
  }, {
    id: "driveway-short",
    kind: "building",
    label: "短车道",
    file: "house/driveway-short.glb",
    targetHeight: .15,
    targetWidth: 4
  }, {
    id: "road-straight",
    kind: "road",
    label: "直路",
    file: "road/road-straight.glb",
    targetHeight: .2,
    targetWidth: 8
  }, {
    id: "road-straight-half",
    kind: "road",
    label: "半段直路",
    file: "road/road-straight-half.glb",
    targetHeight: .2,
    targetWidth: 8
  }, {
    id: "road-bend",
    kind: "road",
    label: "弯道",
    file: "road/road-bend.glb",
    targetHeight: .2,
    targetWidth: 8
  }, {
    id: "road-bend-sidewalk",
    kind: "road",
    label: "人行道弯道",
    file: "road/road-bend-sidewalk.glb",
    targetHeight: .25,
    targetWidth: 8
  }, {
    id: "road-bend-square",
    kind: "road",
    label: "广场弯道",
    file: "road/road-bend-square.glb",
    targetHeight: .2,
    targetWidth: 8
  }, {
    id: "road-curve",
    kind: "road",
    label: "弧线弯道",
    file: "road/road-curve.glb",
    targetHeight: .2,
    targetWidth: 8
  }, {
    id: "road-curve-pavement",
    kind: "road",
    label: "铺装弯道",
    file: "road/road-curve-pavement.glb",
    targetHeight: .25,
    targetWidth: 8
  }, {
    id: "road-curve-intersection",
    kind: "road",
    label: "弯道路口",
    file: "road/road-curve-intersection.glb",
    targetHeight: .2,
    targetWidth: 8
  }, {
    id: "road-crossroad",
    kind: "road",
    label: "十字路口",
    file: "road/road-crossroad.glb",
    targetHeight: .2,
    targetWidth: 8
  }, {
    id: "road-crossroad-line",
    kind: "road",
    label: "标线十字路口",
    file: "road/road-crossroad-line.glb",
    targetHeight: .2,
    targetWidth: 8
  }, {
    id: "road-crossroad-path",
    kind: "road",
    label: "小径十字路口",
    file: "road/road-crossroad-path.glb",
    targetHeight: .2,
    targetWidth: 8
  }, {
    id: "road-intersection",
    kind: "road",
    label: "丁字路口",
    file: "road/road-intersection.glb",
    targetHeight: .2,
    targetWidth: 8
  }, {
    id: "road-intersection-line",
    kind: "road",
    label: "标线丁字路口",
    file: "road/road-intersection-line.glb",
    targetHeight: .2,
    targetWidth: 8
  }, {
    id: "road-intersection-path",
    kind: "road",
    label: "小径丁字路口",
    file: "road/road-intersection-path.glb",
    targetHeight: .2,
    targetWidth: 8
  }, {
    id: "road-end",
    kind: "road",
    label: "路尽头",
    file: "road/road-end.glb",
    targetHeight: .2,
    targetWidth: 8
  }, {
    id: "road-end-round",
    kind: "road",
    label: "圆头路尽头",
    file: "road/road-end-round.glb",
    targetHeight: .2,
    targetWidth: 8
  }, {
    id: "road-square",
    kind: "road",
    label: "道路广场",
    file: "road/road-square.glb",
    targetHeight: .2,
    targetWidth: 8
  }, {
    id: "road-slant",
    kind: "road",
    label: "斜坡路",
    file: "road/road-slant.glb",
    targetHeight: 1.2,
    targetWidth: 8
  }, {
    id: "road-slant-high",
    kind: "road",
    label: "高斜坡路",
    file: "road/road-slant-high.glb",
    targetHeight: 2,
    targetWidth: 8
  }, {
    id: "road-slant-flat",
    kind: "road",
    label: "平斜坡",
    file: "road/road-slant-flat.glb",
    targetHeight: .8,
    targetWidth: 8
  }, {
    id: "road-slant-flat-high",
    kind: "road",
    label: "高平斜坡",
    file: "road/road-slant-flat-high.glb",
    targetHeight: 1.6,
    targetWidth: 8
  }, {
    id: "road-slant-curve",
    kind: "road",
    label: "斜坡弯道",
    file: "road/road-slant-curve.glb",
    targetHeight: 1.2,
    targetWidth: 8
  }, {
    id: "road-slant-flat-curve",
    kind: "road",
    label: "平斜坡弯道",
    file: "road/road-slant-flat-curve.glb",
    targetHeight: .8,
    targetWidth: 8
  }, {
    id: "bridge-pillar",
    kind: "road",
    label: "桥墩",
    file: "road/bridge-pillar.glb",
    targetHeight: 3.5
  }, {
    id: "bridge-pillar-wide",
    kind: "road",
    label: "宽桥墩",
    file: "road/bridge-pillar-wide.glb",
    targetHeight: 3.5
  }],
  Jva = new Map(BYe.map(e => [e.id, e])),
  Ejt = e => e ? Jva.get(e) : void 0,
  VJt = e => BYe.filter(t => t.kind === e),
  Zva = e => `${Xva}/${e}`,
  k_e = e => e.visible !== !1,
  FYe = e => Math.max(0, e.inFrame ?? 0),
  zYe = (e, t) => {
    const n = Math.max(1, t),
      r = e.outFrame;
    return typeof r != "number" || !Number.isFinite(r) ? n : Math.max(FYe(e) + 1, Math.min(n, Math.round(r)));
  },
  Tjt = (e, t) => {
    var n;
    return (n = e.clips) != null && n.length ? e.clips.map(r => {
      const a = Math.max(0, Math.round(r.inFrame));
      return {
        id: r.id,
        inFrame: a,
        outFrame: Math.max(a + 1, Math.min(t, Math.round(r.outFrame)))
      };
    }).sort((r, a) => r.inFrame - a.inFrame) : [{
      id: `${e.id}-clip`,
      inFrame: FYe(e),
      outFrame: zYe(e, t)
    }];
  },
  Tbt = (e, t, n) => Tjt(e, n).some(r => t >= r.inFrame && t < r.outFrame),
  XTe = (e, t, n) => {
    const r = e.filter(o => o.kind === "camera" && o.visible !== !1),
      a = r.find(o => Tbt(o, t, n));
    if (a) return a;
    let i = null;
    for (const o of r) zYe(o, n) <= t && (i = o);
    return i;
  },
  JTe = (e, t) => {
    if (!k_e(e)) return !1;
    if (e.kind === "character" && e.parentCrowdId) {
      const n = t.get(e.parentCrowdId);
      if (n && !k_e(n)) return !1;
    }
    return !0;
  },
  HJt = (e, t, n) => {
    if (!t || e.id === t || e.kind === "character" && e.parentCrowdId === t) return !0;
    const r = n.get(t);
    return !!((r == null ? void 0 : r.kind) === "crowd" && r.childrenIds.includes(e.id));
  },
  e1a = ({
    object: e
  }) => (on(), e.kind === "camera" ? c.jsx(Kh, {
    size: 13
  }) : e.kind === "crowd" ? c.jsx(bmt, {
    size: 13
  }) : e.kind === "geometry" ? c.jsx(Hm, {
    size: 13
  }) : e.kind === "light" ? c.jsx(PY, {
    size: 13
  }) : c.jsx(kU, {
    size: 13
  })),
  hqn = g.memo(({
    objects: e,
    selectedId: t,
    onSelect: n,
    onRename: r,
    onToggleVisible: a,
    onToggleLocked: i,
    onDuplicate: o,
    onDelete: s,
    onIsolate: l
  }) => {
    on();
    const [d, u] = g.useState(""),
      [h, p] = g.useState(null),
      [m, f] = g.useState(""),
      [y, b] = g.useState(null);
    g.useEffect(() => {
      if (!y) return;
      const w = () => b(null);
      return window.addEventListener("pointerdown", w), window.addEventListener("blur", w), () => {
        window.removeEventListener("pointerdown", w), window.removeEventListener("blur", w);
      };
    }, [y]);
    const v = g.useMemo(() => {
        const w = d.trim().toLocaleLowerCase();
        return w ? e.filter(k => `${k.name} ${k.kind}`.toLocaleLowerCase().includes(w)) : e;
      }, [e, d]),
      _ = w => {
        const k = m.trim();
        k && r(w, k), p(null);
      };
    return c.jsxs("div", {
      className: "flex min-h-0 flex-1 flex-col",
      children: [c.jsx("div", {
        className: "px-3 pb-2 pt-3 text-[12px] font-semibold text-zinc-100",
        children: x("场景")
      }), c.jsxs("label", {
        className: "mx-3 flex h-8 items-center gap-2 rounded-md bg-[#292929] px-2.5 text-zinc-500 ring-1 ring-inset ring-white/[0.04] focus-within:ring-cyan-500/30",
        children: [c.jsx("input", {
          value: d,
          onChange: w => u(w.target.value),
          placeholder: x("请输入搜索内容"),
          className: "min-w-0 flex-1 bg-transparent text-[11px] text-zinc-200 outline-none placeholder:text-zinc-500"
        }), c.jsx(mc, {
          size: 13
        })]
      }), c.jsxs("div", {
        className: "mt-2 min-h-0 flex-1 space-y-0.5 overflow-y-auto px-2 pb-3 [scrollbar-color:#454545_transparent] [scrollbar-width:thin]",
        children: [v.map(w => {
          const k = w.id === t,
            A = k_e(w);
          return c.jsxs("div", {
            role: "button",
            tabIndex: 0,
            onClick: () => n(w.id),
            onContextMenu: S => {
              S.preventDefault(), n(w.id), b({
                id: w.id,
                x: S.clientX,
                y: S.clientY
              });
            },
            onKeyDown: S => S.key === "Enter" && n(w.id),
            className: `group flex h-8 items-center gap-2 rounded-md px-2 text-[11px] transition-colors ${k ? "bg-[#303236] text-white" : "text-zinc-300 hover:bg-white/[0.045]"} ${A ? "" : "opacity-45"}`,
            children: [c.jsx("span", {
              className: k ? "text-cyan-300" : "text-zinc-500",
              children: c.jsx(e1a, {
                object: w
              })
            }), h === w.id ? c.jsx("input", {
              autoFocus: !0,
              value: m,
              onChange: S => f(S.target.value),
              onClick: S => S.stopPropagation(),
              onBlur: () => _(w.id),
              onKeyDown: S => {
                S.stopPropagation(), S.key === "Enter" && _(w.id), S.key === "Escape" && p(null);
              },
              className: "min-w-0 flex-1 rounded bg-[#171717] px-1.5 py-0.5 text-zinc-100 outline-none ring-1 ring-cyan-500/50"
            }) : c.jsx("button", {
              className: "min-w-0 flex-1 truncate text-left",
              onDoubleClick: S => {
                S.stopPropagation(), p(w.id), f(w.name);
              },
              title: x("双击重命名"),
              children: w.name
            }), c.jsx("button", {
              className: `rounded p-1 transition hover:bg-white/10 ${A ? "text-zinc-500 opacity-0 group-hover:opacity-100" : "text-zinc-300"}`,
              onClick: S => {
                S.stopPropagation(), a(w.id);
              },
              title: x(A ? "隐藏" : "显示"),
              children: A ? c.jsx(ul, {
                size: 12
              }) : c.jsx($d, {
                size: 12
              })
            }), c.jsx("button", {
              className: `rounded p-1 transition hover:bg-white/10 ${w.locked ? "text-zinc-200" : "text-zinc-500 opacity-0 group-hover:opacity-100"}`,
              onClick: S => {
                S.stopPropagation(), i(w.id);
              },
              title: w.locked ? x("解锁") : x("锁定"),
              children: w.locked ? c.jsx(ece, {
                size: 12
              }) : c.jsx(oxe, {
                size: 12
              })
            })]
          }, w.id);
        }), v.length === 0 && c.jsx("div", {
          className: "px-3 py-8 text-center text-[11px] text-zinc-600",
          children: x("没有匹配的场景对象")
        })]
      }), y && (() => {
        const w = e.find(S => S.id === y.id);
        if (!w) return null;
        const k = k_e(w),
          A = "flex h-9 w-full items-center gap-2.5 px-3 text-left text-[11px] text-zinc-200 hover:bg-white/[0.07]";
        return c.jsxs("div", {
          className: "fixed z-[10050] w-36 overflow-hidden rounded-xl border border-white/10 bg-[#252525] py-1.5 shadow-2xl",
          style: {
            left: Math.min(y.x, window.innerWidth - 150),
            top: Math.min(y.y, window.innerHeight - 220)
          },
          onPointerDown: S => S.stopPropagation(),
          children: [c.jsxs("button", {
            className: `${A} cursor-not-allowed text-zinc-600`,
            disabled: !0,
            children: [c.jsx(Jle, {
              size: 13
            }), x("打组")]
          }), c.jsxs("button", {
            className: A,
            onClick: () => {
              l == null || l(w.id), b(null);
            },
            children: [c.jsx(hZ, {
              size: 13
            }), x("隔离显示")]
          }), c.jsxs("button", {
            className: A,
            onClick: () => {
              a(w.id), b(null);
            },
            children: [k ? c.jsx(ul, {
              size: 13
            }) : c.jsx($d, {
              size: 13
            }), x(k ? "显示/隐藏" : "恢复显示")]
          }), c.jsxs("button", {
            className: A,
            onClick: () => {
              i(w.id), b(null);
            },
            children: [w.locked ? c.jsx(oxe, {
              size: 13
            }) : c.jsx(ece, {
              size: 13
            }), (w.locked, x("锁定/解锁"))]
          }), c.jsxs("button", {
            className: A,
            onClick: () => {
              o(w.id), b(null);
            },
            children: [c.jsx(Cx, {
              size: 13
            }), x("创建副本")]
          }), c.jsxs("button", {
            className: `${A} text-red-300`,
            onClick: () => {
              s(w.id), b(null);
            },
            children: [c.jsx(Qo, {
              size: 13
            }), x("删除")]
          })]
        });
      })()]
    });
  });

hqn.displayName = "SceneTree";

const t1a = {
    scene: "场景",
    character: "添加角色",
    camera: "添加机位",
    move: "运镜",
    panorama: "全景图",
    aspect: "选择画幅比例",
    prop: "场景道具",
    light: "灯光"
  },
  WJt = {
    chair: pmt,
    table: jLe,
    sofa: ANr,
    arch: rNr,
    stairs: Y2,
    door: URr,
    window: LEn,
    tree: RNr,
    car: CRr,
    plant: WRr,
    building: SRr,
    road: _Nr
  },
  dL = e => `director-rail-button${e ? " is-active" : ""}`,
  pqn = g.memo(e => {
    on();
    const [t, n] = g.useState("scene"),
      [r, a] = g.useState(!0),
      i = g.useRef(null),
      o = g.useRef(null),
      [s, l] = g.useState(!1),
      [d, u] = g.useState(!1),
      [h, p] = g.useState(3),
      [m, f] = g.useState(3),
      [y, b] = g.useState(1.2),
      [v, _] = g.useState(null),
      [w, k] = g.useState("clockwise"),
      A = I => {
        n(I), a(!1), I !== "prop" && _(null);
      },
      S = I => {
        if (!I) return;
        const E = new FileReader();
        E.onload = () => e.onPanoramaChange(typeof E.result == "string" ? E.result : void 0), E.readAsDataURL(I);
      },
      C = () => {
        if (t === "scene") return c.jsx(hqn, {
          objects: e.objects,
          selectedId: e.selectedId,
          onSelect: e.onSelect,
          onRename: e.onRename,
          onToggleVisible: e.onToggleVisible,
          onToggleLocked: e.onToggleLocked,
          onDuplicate: e.onDuplicate,
          onDelete: e.onDelete,
          onIsolate: e.onIsolate
        });
        if (t === "character") {
          const I = Uva.filter(M => M.kind !== "geometry"),
            E = [{
              kind: "box",
              label: "立方体"
            }, {
              kind: "sphere",
              label: "球体"
            }, {
              kind: "cylinder",
              label: "圆柱体"
            }, {
              kind: "ring",
              label: "环状体"
            }, {
              kind: "cone",
              label: "圆锥"
            }, {
              kind: "prism",
              label: "棱锥"
            }];
          return c.jsxs("div", {
            className: "min-h-0 flex-1 overflow-y-auto py-3 [scrollbar-width:thin]",
            children: [c.jsx("div", {
              className: "px-4 pb-2 text-[12px] font-semibold text-zinc-100",
              children: x("添加角色")
            }), c.jsxs("div", {
              className: "space-y-0.5 px-2",
              children: [I.map(M => c.jsxs("button", {
                onClick: () => {
                  var T;
                  if (M.kind === "upload") {
                    (T = o.current) == null || T.click();
                    return;
                  }
                  M.kind === "crowd" ? u(!0) : e.onAddCharacter(M.patch);
                },
                className: "flex h-8 w-full items-center gap-2 rounded-md px-3 text-left text-[11px] text-zinc-200 hover:bg-white/[0.055]",
                children: [M.kind === "upload" ? c.jsx(ml, {
                  size: 13
                }) : M.kind === "crowd" ? c.jsx(Y2, {
                  size: 13
                }) : c.jsx(_Wt, {
                  size: 13
                }), c.jsx("span", {
                  className: "flex-1",
                  children: x(M.label)
                }), M.kind === "crowd" && c.jsx(ss, {
                  size: 12,
                  className: "text-zinc-600"
                })]
              }, M.id)), c.jsx("div", {
                className: "my-1 h-px bg-white/[0.05]"
              }), c.jsxs("button", {
                onClick: () => l(M => !M),
                className: "flex h-8 w-full items-center gap-2 rounded-md bg-white/[0.055] px-3 text-left text-[11px] font-medium text-zinc-100 hover:bg-white/[0.08]",
                children: [c.jsx(Hm, {
                  size: 13
                }), x("几何模型"), s ? c.jsx(Mi, {
                  size: 12,
                  className: "ml-auto text-zinc-400"
                }) : c.jsx(ss, {
                  size: 12,
                  className: "ml-auto text-zinc-500"
                })]
              }), s && c.jsx("div", {
                className: "ml-3 border-l border-white/[0.06] pl-1",
                children: E.map(M => c.jsxs("button", {
                  onClick: () => e.onAddGeometry(M.kind),
                  className: "flex h-8 w-full items-center gap-2 rounded-md px-3 text-left text-[11px] text-zinc-200 hover:bg-white/[0.055]",
                  children: [c.jsx(Y2, {
                    size: 13
                  }), x(M.label)]
                }, M.kind))
              })]
            })]
          });
        }
        if (t === "camera") return c.jsxs("div", {
          className: "min-h-0 flex-1 overflow-y-auto p-3 [scrollbar-width:thin]",
          children: [c.jsx("div", {
            className: "mb-3 text-[12px] font-semibold text-zinc-100",
            children: x("添加机位")
          }), c.jsx("div", {
            className: "grid grid-cols-2 gap-2",
            children: $va.map(I => c.jsxs("button", {
              type: "button",
              onClick: () => e.onAddCamera({
                name: `机位 ${e.objects.filter(E => E.kind === "camera").length + 1}`,
                ...I.patch
              }),
              className: "group flex h-[72px] flex-col items-center justify-center gap-1.5 rounded-xl border border-white/[0.09] bg-[#1c1c1c] text-center transition hover:border-cyan-400/40 hover:bg-[#252525]",
              children: [c.jsx(Kh, {
                size: 19,
                className: "text-zinc-200 transition group-hover:text-cyan-300",
                strokeWidth: 1.7
              }), c.jsx("span", {
                className: "block truncate px-2 text-[10px] font-medium text-zinc-100",
                children: x(I.label)
              })]
            }, I.id))
          })]
        });
        if (t === "move") {
          const I = [{
              id: "clockwise",
              label: "顺时针"
            }, {
              id: "counterclockwise",
              label: "逆时针"
            }, {
              id: "left",
              label: "向左"
            }, {
              id: "right",
              label: "向右"
            }],
            E = [{
              id: "free",
              label: "自由运镜",
              hint: "先画注视点，再画机位"
            }, {
              id: "fixed_camera",
              label: "固定机位",
              hint: "机位不动，注视点沿路径"
            }, {
              id: "fixed_target",
              label: "固定注视点",
              hint: "注视点不动，机位沿路径"
            }];
          return c.jsxs("div", {
            className: "min-h-0 flex-1 overflow-y-auto p-3 [scrollbar-width:thin]",
            children: [c.jsx("div", {
              className: "mb-3 text-[12px] font-semibold text-zinc-100",
              children: x("运镜预设")
            }), c.jsx("div", {
              className: "mb-3 flex flex-wrap gap-1",
              children: I.map(M => c.jsx("button", {
                type: "button",
                onClick: () => k(M.id),
                className: `h-6 rounded-md px-2 text-[10px] ${w === M.id ? "bg-cyan-400/15 text-cyan-200" : "bg-white/[0.05] text-zinc-400 hover:text-zinc-100"}`,
                children: x(M.label)
              }, M.id))
            }), c.jsx("div", {
              className: "grid grid-cols-2 gap-2",
              children: Vva.map(M => c.jsxs("button", {
                type: "button",
                onClick: () => {
                  var T;
                  return (T = e.onApplyCameraMove) == null ? void 0 : T.call(e, M.kind, w);
                },
                className: "flex h-[72px] flex-col items-center justify-center gap-1 rounded-xl border border-white/[0.09] bg-[#1c1c1c] text-center transition hover:border-cyan-400/40 hover:bg-[#252525]",
                children: [c.jsx(xWt, {
                  size: 17,
                  className: "text-zinc-300"
                }), c.jsx("span", {
                  className: "text-[10px] font-medium text-zinc-100",
                  children: x(M.label)
                }), c.jsx("span", {
                  className: "px-2 text-[9px] text-zinc-500",
                  children: M.hint
                })]
              }, M.kind))
            }), c.jsx("div", {
              className: "mt-4 mb-2 text-[12px] font-semibold text-zinc-100",
              children: x("自定义运镜")
            }), c.jsx("div", {
              className: "space-y-1.5",
              children: E.map(M => c.jsxs("button", {
                type: "button",
                onClick: () => {
                  var T;
                  return (T = e.onStartCustomPath) == null ? void 0 : T.call(e, M.id);
                },
                className: "flex w-full flex-col items-start rounded-lg border border-white/[0.07] bg-[#1c1c1c] px-3 py-2 text-left hover:border-cyan-400/35",
                children: [c.jsx("span", {
                  className: "text-[11px] text-zinc-100",
                  children: x(M.label)
                }), c.jsx("span", {
                  className: "text-[9px] text-zinc-500",
                  children: M.hint
                })]
              }, M.id))
            })]
          });
        }
        if (t === "panorama") return c.jsxs("div", {
          className: "p-3",
          children: [c.jsx("div", {
            className: "mb-3 text-[12px] font-semibold text-zinc-100",
            children: x("全景图")
          }), c.jsx("div", {
            className: "mb-3 grid grid-cols-2 gap-1.5",
            children: [["本地上传", ml], ["历史记录", FM]].map(([I, E]) => c.jsxs("button", {
              onClick: () => {
                var M;
                return I === "本地上传" ? (M = i.current) == null ? void 0 : M.click() : void 0;
              },
              className: "flex h-16 flex-col items-center justify-center gap-1.5 rounded-md border border-white/[0.055] bg-[#242424] text-[9px] text-zinc-400 transition hover:border-cyan-400/30 hover:text-zinc-100",
              children: [c.jsx(E, {
                size: 17
              }), String(I)]
            }, String(I)))
          }), c.jsx("button", {
            onClick: () => {
              var I;
              return (I = i.current) == null ? void 0 : I.click();
            },
            className: "grid h-28 w-full place-items-center overflow-hidden rounded-lg border border-dashed border-white/10 bg-[#181818] text-[10px] text-zinc-500 hover:border-cyan-400/30",
            style: e.panoramaImageUrl ? {
              backgroundImage: `url(${e.panoramaImageUrl})`,
              backgroundPosition: "center",
              backgroundSize: "cover"
            } : void 0,
            children: e.panoramaImageUrl ? c.jsx("span", {
              className: "rounded bg-black/65 px-2 py-1 text-zinc-200",
              children: x("更换全景图")
            }) : x("点击上传 2:1 全景图")
          }), e.panoramaImageUrl && c.jsx("button", {
            onClick: () => e.onPanoramaChange(void 0),
            className: "mt-2 w-full rounded-md bg-white/[0.055] py-1.5 text-[10px] text-zinc-400 hover:text-zinc-100",
            children: x("移除全景图")
          })]
        });
        if (t === "light") {
          const I = [{
            kind: "directional",
            label: "方向光",
            hint: "平行主光"
          }, {
            kind: "point",
            label: "点光",
            hint: "向四周照射"
          }, {
            kind: "spot",
            label: "聚光灯",
            hint: "锥形照射"
          }];
          return c.jsxs("div", {
            className: "min-h-0 flex-1 overflow-y-auto p-3 [scrollbar-width:thin]",
            children: [c.jsx("div", {
              className: "mb-3 text-[12px] font-semibold text-zinc-100",
              children: x("添加灯光")
            }), c.jsx("div", {
              className: "grid grid-cols-1 gap-2",
              children: I.map(E => c.jsxs("button", {
                type: "button",
                onClick: () => e.onAddLight(E.kind),
                className: "flex h-16 flex-col items-start justify-center gap-0.5 rounded-xl border border-white/[0.09] bg-[#1c1c1c] px-3 text-left transition hover:border-cyan-400/40 hover:bg-[#252525]",
                children: [c.jsxs("span", {
                  className: "flex items-center gap-2 text-[11px] font-medium text-zinc-100",
                  children: [c.jsx(PY, {
                    size: 15,
                    className: "text-[#ffd27f]"
                  }), x(E.label)]
                }), c.jsx("span", {
                  className: "text-[9px] text-zinc-500",
                  children: E.hint
                })]
              }, E.kind))
            })]
          });
        }
        if (t === "prop") {
          const I = v ? Cbt.find(T => T.kind === v) : null,
            E = v ? VJt(v) : [],
            M = I ? WJt[I.kind] : pmt;
          return c.jsx("div", {
            className: "min-h-0 flex-1 overflow-y-auto p-3 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.18)_transparent] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20 hover:[&::-webkit-scrollbar-thumb]:bg-white/35",
            children: I ? c.jsxs(c.Fragment, {
              children: [c.jsxs("button", {
                type: "button",
                onClick: () => _(null),
                className: "mb-3 flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-100",
                children: [c.jsx(Mf, {
                  size: 14
                }), x("返回分类")]
              }), c.jsxs("div", {
                className: "mb-2 flex items-center gap-2 text-[12px] font-semibold text-zinc-100",
                children: [c.jsx(M, {
                  size: 14,
                  className: "text-zinc-400"
                }), x(I.label), c.jsxs("span", {
                  className: "font-normal text-zinc-500",
                  children: [E.length, x(" 个白模")]
                })]
              }), c.jsxs("div", {
                className: "space-y-0.5",
                children: [c.jsxs("button", {
                  type: "button",
                  onClick: () => e.onAddProp(I.kind),
                  className: "flex h-8 w-full items-center gap-2 rounded-md px-3 text-left text-[11px] text-zinc-300 hover:bg-white/[0.055] hover:text-zinc-100",
                  children: [c.jsx(Hm, {
                    size: 13,
                    className: "text-zinc-500"
                  }), x("简易"), x(I.label)]
                }), E.map(T => c.jsxs("button", {
                  type: "button",
                  onClick: () => e.onAddProp(I.kind, T.id),
                  className: "flex h-8 w-full items-center gap-2 rounded-md px-3 text-left text-[11px] text-zinc-200 hover:bg-white/[0.055]",
                  children: [c.jsx(M, {
                    size: 13,
                    className: "text-zinc-500"
                  }), c.jsx("span", {
                    className: "flex-1 truncate",
                    children: T.label
                  })]
                }, T.id))]
              })]
            }) : c.jsxs(c.Fragment, {
              children: [c.jsx("div", {
                className: "mb-3 text-[12px] font-semibold text-zinc-100",
                children: x("场景道具")
              }), c.jsx("div", {
                className: "grid grid-cols-2 gap-2",
                children: Cbt.map(T => {
                  const P = WJt[T.kind],
                    R = VJt(T.kind).length;
                  return c.jsxs("button", {
                    type: "button",
                    onClick: () => _(T.kind),
                    className: "flex h-16 flex-col items-center justify-center gap-1.5 rounded-md border border-white/[0.055] bg-[#242424] text-[10px] text-zinc-300 transition hover:border-cyan-400/30 hover:text-zinc-100",
                    children: [c.jsx(P, {
                      size: 18,
                      className: "text-zinc-400"
                    }), x(T.label), c.jsxs("span", {
                      className: "text-[9px] text-zinc-500",
                      children: [R, x(" 个白模")]
                    })]
                  }, T.kind);
                })
              })]
            })
          });
        }
        return c.jsxs("div", {
          className: "p-3",
          children: [c.jsx("div", {
            className: "mb-3 text-[12px] font-semibold text-zinc-100",
            children: x("选择画幅比例")
          }), c.jsx("div", {
            className: "grid grid-cols-2 gap-2",
            children: Gva.map(I => {
              const E = e.aspectRatio === I.value;
              return c.jsxs("button", {
                onClick: () => e.onAspectRatioChange(I.value),
                className: `flex h-16 flex-col items-center justify-center gap-1.5 rounded-md border text-[10px] transition ${E ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-200" : "border-white/[0.055] bg-[#242424] text-zinc-400 hover:border-white/15 hover:text-zinc-100"}`,
                children: [c.jsx("span", {
                  className: "grid h-7 w-11 place-items-center",
                  children: c.jsx("span", {
                    className: "block border border-current",
                    style: {
                      aspectRatio: I.value === "auto" ? "16 / 10" : I.value.replace(":", " / "),
                      width: I.value === "9:16" ? 16 : I.value === "3:4" ? 22 : 38,
                      maxHeight: 26
                    }
                  })
                }), x(I.label)]
              }, I.value);
            })
          })]
        });
      };
    return c.jsxs("aside", {
      "data-director-sidebar": "left",
      "data-collapsed": r,
      className: `director-sidebar relative z-30 flex h-full shrink-0 border-r border-white/[0.055] bg-[#191919] text-zinc-300 ${r ? "w-11" : "w-[264px]"}`,
      children: [c.jsx("input", {
        ref: i,
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange: I => {
          var E;
          S((E = I.target.files) == null ? void 0 : E[0]), I.currentTarget.value = "";
        }
      }), c.jsx("input", {
        ref: o,
        type: "file",
        accept: ".fbx,model/fbx",
        className: "hidden",
        onChange: I => {
          var M;
          const E = (M = I.target.files) == null ? void 0 : M[0];
          E && e.onImportCharacterFbx(E), I.currentTarget.value = "";
        }
      }), c.jsxs("div", {
        className: `director-rail ${r ? "" : "border-r border-white/[0.05]"}`,
        children: [c.jsx("div", {
          className: "director-rail-header",
          children: c.jsx("button", {
            type: "button",
            className: "director-rail-button",
            onClick: () => a(I => !I),
            "aria-expanded": !r,
            title: x(r ? "展开" : "收起"),
            children: r ? c.jsx(ss, {
              size: 14
            }) : c.jsx(Mf, {
              size: 14
            })
          })
        }), c.jsxs("nav", {
          className: "director-rail-nav",
          children: [c.jsx("button", {
            className: dL(t === "scene"),
            onClick: () => A("scene"),
            title: x("场景"),
            children: c.jsx(Y2, {
              size: 17
            })
          }), c.jsx("button", {
            className: dL(t === "character"),
            onClick: () => A("character"),
            title: x("添加角色"),
            children: c.jsx(_Wt, {
              size: 17
            })
          }), c.jsx("button", {
            className: dL(t === "camera"),
            onClick: () => A("camera"),
            title: x("添加机位"),
            children: c.jsx(Kh, {
              size: 17
            })
          }), c.jsx("button", {
            className: dL(t === "move"),
            onClick: () => A("move"),
            title: x("运镜"),
            children: c.jsx(xWt, {
              size: 17
            })
          }), c.jsx("button", {
            className: dL(t === "panorama"),
            onClick: () => A("panorama"),
            title: x("全景图"),
            children: c.jsx(lo, {
              size: 17
            })
          }), c.jsx("button", {
            className: dL(t === "aspect"),
            onClick: () => A("aspect"),
            title: x("选择画幅比例"),
            children: c.jsx(kS, {
              size: 17
            })
          }), c.jsx("button", {
            className: dL(t === "prop"),
            onClick: () => A("prop"),
            title: x("场景道具"),
            children: c.jsx(pmt, {
              size: 17
            })
          }), c.jsx("button", {
            className: dL(t === "light"),
            onClick: () => A("light"),
            title: x("灯光"),
            children: c.jsx(PY, {
              size: 17
            })
          })]
        })]
      }), !r && c.jsxs("div", {
        className: "flex min-w-0 flex-1 flex-col",
        children: [c.jsx("div", {
          className: "director-panel-header",
          children: c.jsx("span", {
            children: x("3D导演台")
          })
        }), c.jsx("div", {
          className: "flex min-h-0 flex-1 flex-col",
          "aria-label": x(t1a[t]),
          children: C()
        })]
      }), d && c.jsx("div", {
        className: "fixed inset-0 z-[10050] bg-black/20",
        onPointerDown: () => u(!1),
        children: c.jsxs("div", {
          className: "absolute left-[248px] top-[52%] w-[220px] -translate-y-1/2 rounded-xl border border-white/10 bg-[#242424] p-3 shadow-2xl",
          onPointerDown: I => I.stopPropagation(),
          children: [c.jsxs("div", {
            className: "mb-3 flex items-center justify-between text-[12px] font-semibold text-zinc-100",
            children: [c.jsx("span", {
              children: x("添加群众阵列")
            }), c.jsxs("span", {
              className: "font-normal text-zinc-500",
              children: [x("共"), h * m, x("人")]
            })]
          }), c.jsxs("div", {
            className: "grid grid-cols-2 gap-2",
            children: [c.jsxs("label", {
              className: "text-[10px] text-zinc-500",
              children: [x("行数"), c.jsx("input", {
                type: "number",
                min: 1,
                max: 10,
                value: h,
                onChange: I => p(Math.max(1, Math.min(10, Number(I.target.value) || 1))),
                className: "mt-1 h-8 w-full rounded-md border border-white/[0.08] bg-[#363636] px-2 text-[11px] text-zinc-100 outline-none"
              })]
            }), c.jsxs("label", {
              className: "text-[10px] text-zinc-500",
              children: [x("列数"), c.jsx("input", {
                type: "number",
                min: 1,
                max: 10,
                value: m,
                onChange: I => f(Math.max(1, Math.min(10, Number(I.target.value) || 1))),
                className: "mt-1 h-8 w-full rounded-md border border-white/[0.08] bg-[#363636] px-2 text-[11px] text-zinc-100 outline-none"
              })]
            })]
          }), c.jsxs("label", {
            className: "mt-2 block text-[10px] text-zinc-500",
            children: [x("间距"), c.jsx("input", {
              type: "number",
              min: .4,
              max: 5,
              step: .1,
              value: y,
              onChange: I => b(Math.max(.4, Math.min(5, Number(I.target.value) || 1.2))),
              className: "mt-1 h-8 w-full rounded-md border border-white/[0.08] bg-[#363636] px-2 text-[11px] text-zinc-100 outline-none"
            })]
          }), c.jsxs("div", {
            className: "mt-3 flex justify-end gap-2",
            children: [c.jsx("button", {
              onClick: () => u(!1),
              className: "h-8 rounded-md px-3 text-[10px] text-zinc-400 hover:bg-white/[0.05]",
              children: x("取消")
            }), c.jsxs("button", {
              onClick: () => {
                e.onAddCrowd(h, m, y), u(!1);
              },
              className: "flex h-8 items-center gap-1 rounded-md bg-zinc-100 px-3 text-[10px] font-medium text-zinc-900",
              children: [c.jsx(io, {
                size: 12
              }), x("添加")]
            })]
          })]
        })
      })]
    });
  });

pqn.displayName = "DirectorLeftSidebar";

const n1a = [{
    key: "showGrid",
    label: "网格",
    defaultOn: !0
  }, {
    key: "showGround",
    label: "地面",
    defaultOn: !0
  }, {
    key: "showMotionPaths",
    label: "运动路径",
    defaultOn: !0
  }, {
    key: "showHeightLines",
    label: "高度参考线",
    defaultOn: !1
  }, {
    key: "showLabels",
    label: "对象名称",
    defaultOn: !0
  }, {
    key: "showCanvasMask",
    label: "机位画幅遮罩",
    defaultOn: !0
  }],
  r1a = (e, t, n) => {
    const r = e[t];
    return typeof r == "boolean" ? r : n;
  },
  mqn = g.memo(({
    settings: e,
    onChange: t,
    children: n
  }) => (on(), c.jsxs("div", {
    className: "w-52 rounded-xl border border-white/[0.08] bg-[#191919] p-2 shadow-[0_12px_32px_rgba(0,0,0,0.38)]",
    children: [c.jsx("div", {
      className: "px-2 pb-1.5 pt-1 text-[10px] font-semibold text-zinc-200",
      children: x("视图设置")
    }), c.jsx("div", {
      className: "space-y-0.5",
      children: n1a.map(r => {
        const a = r1a(e, r.key, r.defaultOn);
        return c.jsxs("button", {
          type: "button",
          onClick: () => t({
            [r.key]: !a
          }),
          className: "flex h-8 w-full items-center justify-between rounded-md px-2 text-left text-[11px] text-zinc-300 hover:bg-white/[0.06]",
          children: [c.jsx("span", {
            children: x(r.label)
          }), c.jsx("span", {
            className: `h-3.5 w-3.5 rounded-sm border ${a ? "border-cyan-300 bg-cyan-300" : "border-white/25 bg-transparent"}`
          })]
        }, r.key);
      })
    }), n]
  })));

mqn.displayName = "ViewSettingsPopover";

const a1a = [{
    id: "director",
    label: "导演视角"
  }, {
    id: "camera",
    label: "机位视角"
  }, {
    id: "top",
    label: "俯视视角"
  }],
  uL = (e = !1) => `h-7 rounded-md px-2.5 text-[11px] transition ${e ? "bg-white/[0.1] text-white" : "text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-100"}`,
  fqn = g.memo(({
    chrome: e,
    viewMode: t,
    splitPreview: n,
    saveState: r,
    settings: a,
    onChromeChange: i,
    onViewModeChange: o,
    onToggleSplit: s,
    onSettingsChange: l,
    onHelp: d,
    onClose: u,
    onSmartBuild: h,
    planViewControls: p
  }) => {
    on();
    const [m, f] = g.useState(!1),
      y = g.useRef(null);
    return g.useEffect(() => {
      if (!m) return;
      const b = _ => {
          var w;
          (w = y.current) != null && w.contains(_.target) || f(!1);
        },
        v = _ => {
          var w, k;
          _.key === "Escape" && (_.stopPropagation(), f(!1), (k = (w = y.current) == null ? void 0 : w.querySelector("button")) == null || k.focus());
        };
      return document.addEventListener("pointerdown", b, !0), window.addEventListener("keydown", v, !0), () => {
        document.removeEventListener("pointerdown", b, !0), window.removeEventListener("keydown", v, !0);
      };
    }, [m]), c.jsxs("header", {
      className: "relative z-50 flex h-12 shrink-0 items-center justify-between border-b border-white/[0.055] bg-[#191919] px-3",
      children: [c.jsxs("div", {
        className: "relative z-10 flex items-center gap-2",
        children: [c.jsxs("button", {
          type: "button",
          onClick: u,
          className: `${uL()} flex items-center gap-1`,
          title: x("返回画布"),
          children: [c.jsx(Mf, {
            size: 14
          }), x("返回")]
        }), c.jsxs("div", {
          className: "ml-1 flex items-center rounded-lg bg-white/[0.04] p-0.5",
          children: [c.jsx("button", {
            type: "button",
            title: x("展开时间轴，改关键帧和图层"),
            onClick: () => i("compose"),
            className: uL(e === "compose"),
            children: x("编辑")
          }), c.jsx("button", {
            type: "button",
            title: x("收起时间轴，全屏看画面"),
            onClick: () => i("preview"),
            className: uL(e === "preview"),
            children: x("预览")
          })]
        }), c.jsx("span", {
          className: "ml-2 text-[10px] text-zinc-500",
          children: x(r === "saving" ? "保存中" : "已保存")
        })]
      }), c.jsx("div", {
        className: "pointer-events-none absolute inset-0 flex items-center justify-center",
        children: c.jsx("div", {
          className: "pointer-events-auto flex items-center rounded-lg bg-white/[0.04] p-0.5",
          children: a1a.map(b => c.jsx("button", {
            type: "button",
            onClick: () => o(b.id),
            className: uL(t === b.id),
            children: x(b.label)
          }, b.id))
        })
      }), c.jsxs("div", {
        className: "relative z-10 flex items-center gap-1.5",
        children: [h && c.jsxs("button", {
          type: "button",
          onClick: h,
          className: `${uL()} flex items-center gap-1.5`,
          children: [c.jsx(ac, {
            size: 13
          }), x("智能搭建")]
        }), c.jsxs("button", {
          type: "button",
          onClick: s,
          className: `${uL(n)} flex items-center gap-1.5`,
          children: [c.jsx($En, {
            size: 13
          }), x("分屏预览")]
        }), c.jsxs("div", {
          ref: y,
          className: "relative",
          children: [c.jsxs("button", {
            type: "button",
            "aria-expanded": m,
            onClick: () => f(b => !b),
            className: `${uL(m)} flex items-center gap-1.5`,
            children: [c.jsx(ul, {
              size: 13
            }), x("视图")]
          }), m && c.jsx("div", {
            className: "absolute right-0 top-9 z-50",
            children: c.jsx(mqn, {
              settings: a,
              onChange: l,
              children: p
            })
          })]
        }), c.jsxs("button", {
          type: "button",
          onClick: d,
          className: `${uL()} flex items-center gap-1.5`,
          title: x("帮助"),
          children: [c.jsx(QHe, {
            size: 13
          }), x("帮助")]
        })]
      })]
    });
  });

fqn.displayName = "DirectorWorkspaceHeader";

const Mjt = {
    stand: "站立",
    t: "T型",
    walk: "行走",
    run: "跑步",
    sit: "坐姿",
    squat: "蹲下",
    "single-knee": "单膝跪",
    "double-knee": "双膝跪",
    akimbo: "叉腰",
    think: "思考",
    wave: "招手",
    reach: "伸手"
  },
  Pjt = Object.keys(Mjt),
  Aie = e => e === "walk" || e === "run" || e === "squat",
  Si = (e = 0, t = 0, n = 0) => [e * Math.PI / 180, t * Math.PI / 180, n * Math.PI / 180],
  i1a = {
    stand: {
      leftArm: Si(8, 0, 12),
      rightArm: Si(8, 0, -12),
      leftForearm: Si(),
      rightForearm: Si(),
      leftLeg: Si(),
      rightLeg: Si(),
      leftShin: Si(),
      rightShin: Si(),
      body: Si(),
      head: Si()
    },
    t: {
      leftArm: Si(0, 0, 86),
      rightArm: Si(0, 0, -86),
      leftForearm: Si(),
      rightForearm: Si(),
      leftLeg: Si(),
      rightLeg: Si(),
      leftShin: Si(),
      rightShin: Si(),
      body: Si(),
      head: Si()
    },
    walk: {
      leftArm: Si(-32, 0, 10),
      rightArm: Si(34, 0, -10),
      leftForearm: Si(18),
      rightForearm: Si(8),
      leftLeg: Si(28),
      rightLeg: Si(-22),
      leftShin: Si(-18),
      rightShin: Si(24),
      body: Si(4),
      head: Si(-3)
    },
    run: {
      leftArm: Si(-58, 0, 18),
      rightArm: Si(55, 0, -18),
      leftForearm: Si(72),
      rightForearm: Si(68),
      leftLeg: Si(46),
      rightLeg: Si(-42),
      leftShin: Si(-34),
      rightShin: Si(58),
      body: Si(10),
      head: Si(-7)
    },
    sit: {
      leftArm: Si(10, 0, 14),
      rightArm: Si(10, 0, -14),
      leftForearm: Si(8),
      rightForearm: Si(8),
      leftLeg: Si(76),
      rightLeg: Si(76),
      leftShin: Si(-72),
      rightShin: Si(-72),
      body: Si(-6),
      head: Si()
    },
    squat: {
      leftArm: Si(28, 0, 18),
      rightArm: Si(28, 0, -18),
      leftForearm: Si(20),
      rightForearm: Si(20),
      leftLeg: Si(66),
      rightLeg: Si(66),
      leftShin: Si(-92),
      rightShin: Si(-92),
      body: Si(18),
      head: Si(-10)
    },
    "single-knee": {
      leftArm: Si(16, 0, 14),
      rightArm: Si(16, 0, -14),
      leftForearm: Si(24),
      rightForearm: Si(24),
      leftLeg: Si(75),
      rightLeg: Si(25),
      leftShin: Si(-105),
      rightShin: Si(-30),
      body: Si(7),
      head: Si(-5)
    },
    "double-knee": {
      leftArm: Si(16, 0, 12),
      rightArm: Si(16, 0, -12),
      leftForearm: Si(18),
      rightForearm: Si(18),
      leftLeg: Si(82),
      rightLeg: Si(82),
      leftShin: Si(-112),
      rightShin: Si(-112),
      body: Si(4),
      head: Si(-4)
    },
    akimbo: {
      leftArm: Si(8, 0, 48),
      rightArm: Si(8, 0, -48),
      leftForearm: Si(0, 0, -62),
      rightForearm: Si(0, 0, 62),
      leftLeg: Si(),
      rightLeg: Si(),
      leftShin: Si(),
      rightShin: Si(),
      body: Si(),
      head: Si()
    },
    think: {
      leftArm: Si(8, 0, 16),
      rightArm: Si(-42, 0, -28),
      leftForearm: Si(98, 0, 8),
      rightForearm: Si(118, 0, 18),
      leftLeg: Si(),
      rightLeg: Si(),
      leftShin: Si(),
      rightShin: Si(),
      body: Si(0, -8),
      head: Si(8, -12)
    },
    wave: {
      leftArm: Si(12, 0, 12),
      rightArm: Si(-110, 0, -62),
      leftForearm: Si(5),
      rightForearm: Si(92, 0, 18),
      leftLeg: Si(),
      rightLeg: Si(),
      leftShin: Si(),
      rightShin: Si(),
      body: Si(),
      head: Si(0, -8)
    },
    reach: {
      leftArm: Si(8, 0, 12),
      rightArm: Si(-82, 0, -34),
      leftForearm: Si(5),
      rightForearm: Si(10),
      leftLeg: Si(8),
      rightLeg: Si(-6),
      leftShin: Si(),
      rightShin: Si(),
      body: Si(0, -8),
      head: Si(0, -8)
    }
  },
  o1a = () => ({
    body: [0, 0, 0],
    torso: [0, 0, 0],
    head: [0, 0, 0],
    leftArm: [0, 0, 0],
    rightArm: [0, 0, 0],
    leftForearm: [0, 0, 0],
    rightForearm: [0, 0, 0],
    leftLeg: [0, 0, 0],
    rightLeg: [0, 0, 0],
    leftShin: [0, 0, 0],
    rightShin: [0, 0, 0]
  }),
  ZTe = e => o1a(),
  s1a = ({
    camera: e,
    onDelete: t,
    onSendToCanvas: n
  }) => {
    on();
    const [r, a] = g.useState(null),
      i = async (l, d, u) => {
        if (!(!n || r)) {
          a(l);
          try {
            await n(d, u);
          } finally {
            a(null);
          }
        }
      },
      o = (e == null ? void 0 : e.screenshots) ?? [],
      s = (e == null ? void 0 : e.name) ?? "主机位";
    return c.jsxs("div", {
      className: "space-y-2",
      children: [c.jsxs("div", {
        className: "flex items-center gap-2 text-[11px] font-medium text-zinc-400",
        children: [c.jsx(lo, {
          size: 13
        }), x("截图记录 · "), s]
      }), o.length === 0 ? c.jsx("div", {
        className: "rounded-lg border border-dashed border-white/[0.08] bg-white/[0.02] p-4 text-center text-[10px] text-zinc-600",
        children: x("暂无截图，使用底部相机按钮拍摄")
      }) : c.jsx("div", {
        className: "space-y-2",
        children: o.map(l => c.jsxs("div", {
          className: "overflow-hidden rounded-lg border border-white/[0.07] bg-[#242424]",
          children: [c.jsxs("div", {
            className: "relative",
            children: [c.jsx("img", {
              src: l.dataUrl,
              alt: l.cameraName,
              className: "aspect-video w-full object-cover"
            }), c.jsx("button", {
              type: "button",
              className: "absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-md border border-white/10 bg-black/70 text-zinc-400 shadow-sm transition hover:border-red-400/30 hover:text-red-300",
              onClick: () => e && t(e.id, l.id),
              title: x("删除截图"),
              children: c.jsx(Qo, {
                size: 13
              })
            })]
          }), n && c.jsxs("button", {
            type: "button",
            className: "flex w-full items-center justify-center gap-1.5 border-t border-white/[0.06] bg-white/[0.025] px-2 py-2 text-[10px] text-zinc-400 transition hover:bg-white/[0.05] hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-50",
            disabled: r === l.id,
            onClick: () => void i(l.id, l.dataUrl, l.cameraName),
            children: [c.jsx(zu, {
              size: 12
            }), r === l.id ? x("发送中…") : x("发送到画布")]
          })]
        }, l.id))
      })]
    });
  },
  Hnt = (e, t) => {
    const n = 10 ** t;
    return Math.round(e * n) / n;
  },
  A_e = ({
    value: e,
    suffix: t = "",
    step: n = .05,
    digits: r = 1,
    className: a = "",
    onLive: i,
    onCommit: o
  }) => {
    on();
    const s = g.useRef(null),
      [l, d] = g.useState(!1),
      [u, h] = g.useState(""),
      p = g.useRef(null);
    g.useEffect(() => {
      var y, b;
      l && ((y = p.current) == null || y.focus(), (b = p.current) == null || b.select());
    }, [l]);
    const m = y => {
        if (y) {
          const b = Number(u);
          Number.isFinite(b) && o(Hnt(b, r));
        }
        d(!1);
      },
      f = y => {
        if (!s.current) return e;
        const b = y.shiftKey ? n * .2 : n,
          v = y.clientX - s.current.x,
          _ = s.current.y - y.clientY;
        return Hnt(s.current.value + (v + _) * b, 2);
      };
    return l ? c.jsx("input", {
      ref: p,
      value: u,
      className: `h-4 w-12 rounded bg-[#111] px-0.5 text-right text-[10px] tabular-nums text-[#7ec8ff] outline-none ring-1 ring-cyan-400/40 ${a}`,
      onChange: y => h(y.target.value),
      onPointerDown: y => y.stopPropagation(),
      onClick: y => y.stopPropagation(),
      onBlur: () => m(!0),
      onKeyDown: y => {
        y.key === "Enter" && m(!0), y.key === "Escape" && m(!1);
      }
    }) : c.jsxs("span", {
      className: `inline-block cursor-ew-resize select-none rounded px-0.5 hover:bg-white/[0.08] ${a}`,
      title: x("拖动调整 · 双击输入"),
      onPointerDown: y => {
        y.button === 0 && (y.preventDefault(), y.stopPropagation(), s.current = {
          x: y.clientX,
          y: y.clientY,
          value: e,
          moved: !1
        }, y.currentTarget.setPointerCapture(y.pointerId));
      },
      onPointerMove: y => {
        s.current && (Math.abs(y.clientX - s.current.x) + Math.abs(y.clientY - s.current.y) > 2 && (s.current.moved = !0), s.current.moved && i(f(y)));
      },
      onPointerUp: y => {
        s.current && (s.current.moved && o(f(y)), s.current = null);
      },
      onDoubleClick: y => {
        y.preventDefault(), y.stopPropagation(), s.current = null, h(Number.isFinite(e) ? String(Hnt(e, r)) : "0"), d(!0);
      },
      children: [Number.isFinite(e) ? e.toFixed(r) : "0.0", t]
    });
  },
  l1a = ({
    value: e,
    onLive: t,
    onCommit: n,
    step: r,
    digits: a,
    uniform: i = !1
  }) => {
    on();
    const o = g.useRef(e);
    o.current = e;
    const s = (l, d, u) => {
      const h = i ? [d, d, d] : [...o.current];
      i || (h[l] = d), o.current = h, u ? n(h) : t(h);
    };
    return c.jsx("span", {
      className: "min-w-0 truncate text-right text-[10px] tabular-nums text-[#7ec8ff]",
      children: [0, 1, 2].map(l => c.jsxs(Ia.Fragment, {
        children: [l > 0 && c.jsx("span", {
          className: "text-zinc-600",
          children: ", "
        }), c.jsx(A_e, {
          value: o.current[l],
          step: r,
          digits: a,
          onLive: d => s(l, d, !1),
          onCommit: d => s(l, d, !0)
        })]
      }, l))
    });
  };

function e8e(e) {
  return Math.round(e);
}

const Tv = ({
    open: e,
    anchorRef: t,
    isDark: n,
    className: r = "",
    minWidth: a = 192,
    menuWidth: i,
    maxHeight: o = 256,
    placement: s = "above",
    align: l = "left",
    scrollToSelectedKey: d,
    scrollInline: u,
    scrollFamilyIds: h,
    orderedOptionKeys: p,
    onWheel: m,
    header: f,
    children: y
  }) => {
    const b = g.useRef(null),
      v = f != null,
      _ = g.useRef("above"),
      w = g.useRef(""),
      k = g.useRef(!1),
      A = g.useRef(0),
      S = g.useRef(!1),
      C = g.useRef({
        scrollToSelectedKey: d,
        scrollInline: u,
        scrollFamilyIds: h,
        orderedOptionKeys: p
      });
    C.current = {
      scrollToSelectedKey: d,
      scrollInline: u,
      scrollFamilyIds: h,
      orderedOptionKeys: p
    };
    const I = g.useCallback(() => {
        const T = t.current;
        if (!T || typeof window > "u") return;
        const P = T.getBoundingClientRect(),
          R = (r || "").includes("qiaodoumayi-gen-video-settings-panel") ? 14 : 4,
          j = 8,
          B = window.innerHeight - P.bottom - R - j,
          F = P.top - R - j;
        s === "above" ? _.current = "above" : _.current = F >= o || F >= B ? "above" : "below";
      }, [t, r, o, s]),
      E = g.useCallback(() => {
        const T = t.current,
          P = b.current;
        if (!T || !P || !e || typeof window > "u" || k.current) return;
        const R = T.getBoundingClientRect(),
          j = (r || "").includes("qiaodoumayi-gen-video-settings-panel") ? 14 : 4,
          B = 8,
          F = window.innerHeight - R.bottom - j - B,
          N = R.top - j - B,
          G = _.current === "above",
          z = e8e(Math.min(Math.max(G ? N : F, 120), o)),
          V = document.documentElement.clientWidth,
          O = Math.max(0, V - B * 2),
          L = i == null ? "" : `${Math.min(i, O)}px`,
          D = L || `${Math.min(Math.max(R.width, a), O)}px`,
          U = L || `${O}px`;
        P.style.position !== "fixed" && (P.style.position = "fixed"), P.style.width !== L && (P.style.width = L), P.style.minWidth !== D && (P.style.minWidth = D), P.style.maxWidth !== U && (P.style.maxWidth = U);
        const H = P.getBoundingClientRect().width,
          Y = l === "center" ? H / 2 : 0,
          K = l === "center" ? R.left + R.width / 2 : R.left,
          W = e8e(Math.max(B + Y, Math.min(K, V - B - H + Y))),
          Q = e8e(G ? window.innerHeight - R.top + j : R.bottom + j),
          q = [W, Q, z, i ?? e8e(Math.max(R.width, a)), G ? "a" : "b", l, H].join("|");
        w.current !== q && (w.current = q, l === "center" ? (P.style.left = `${W}px`, P.style.transform = "translateX(-50%)") : (P.style.left = `${W}px`, P.style.transform = ""), P.style.zIndex = "10200", P.style.maxHeight = `${z}px`, P.style.height = v ? `${z}px` : "", G ? (P.style.top = "", P.style.bottom = `${Q}px`) : (P.style.bottom = "", P.style.top = `${Q}px`));
      }, [l, t, r, v, o, i, a, e]);
    if (g.useLayoutEffect(() => {
      if (!e) {
        w.current = "", S.current = !1, k.current = !1;
        return;
      }
      if (I(), w.current = "", E(), !S.current) {
        const R = C.current;
        P3(b.current, {
          selectedKey: R.scrollToSelectedKey != null ? String(R.scrollToSelectedKey) : void 0,
          familyIds: R.scrollFamilyIds,
          orderedOptionKeys: R.orderedOptionKeys,
          scrollInline: R.scrollInline
        }), S.current = !0;
      }
      let T = 0;
      const P = () => {
        E(), T = requestAnimationFrame(P);
      };
      return T = requestAnimationFrame(P), () => cancelAnimationFrame(T);
    }, [e, I, E]), g.useEffect(() => {
      if (!e) return;
      const T = b.current;
      if (!T) return;
      const P = () => {
          k.current = !0, window.clearTimeout(A.current), A.current = window.setTimeout(() => {
            k.current = !1;
          }, 160);
        },
        R = B => {
          P();
          const F = B.target;
          F instanceof Element && F.closest(".qiaodoumayi-gen-video-duration-pills, .qiaodoumayi-gen-sliding-wheel") || B.stopPropagation();
        },
        j = T.querySelector("[data-dropdown-list-scroll]") ?? T;
      return T.addEventListener("wheel", R, {
        capture: !0,
        passive: !0
      }), j.addEventListener("scroll", P, {
        passive: !0
      }), () => {
        T.removeEventListener("wheel", R, !0), j.removeEventListener("scroll", P), window.clearTimeout(A.current);
      };
    }, [e]), !e || typeof document > "u") return null;
    const M = f != null;
    return Da.createPortal(c.jsxs("div", {
      ref: b,
      "data-gen-node-portal-dropdown": "true",
      "data-scrollable": M ? void 0 : "true",
      className: `node-dropdown-menu rounded-lg shadow-xl p-1 border overscroll-contain scrollbar-hide ${M ? "flex min-h-0 flex-col overflow-hidden" : "overflow-y-auto"} ${n ? "bg-[#1f1f1f] border-zinc-700" : "bg-white border-zinc-200"} ${r}`,
      style: {
        overscrollBehavior: "contain"
      },
      onPointerDown: T => T.stopPropagation(),
      onMouseDown: T => T.stopPropagation(),
      onWheel: T => {
        T.stopPropagation(), m == null || m(T);
      },
      children: [M ? c.jsx("div", {
        className: "shrink-0",
        children: f
      }) : null, M ? c.jsx("div", {
        "data-dropdown-list-scroll": !0,
        "data-scrollable": "true",
        className: "min-h-0 flex-1 overflow-y-auto overscroll-contain scrollbar-hide",
        style: {
          overscrollBehavior: "contain"
        },
        children: y
      }) : y]
    }), document.body);
  },
  Rjt = "h-7 min-w-0 rounded-md border border-white/[0.055] bg-white/[0.04] px-2 text-[10px] tabular-nums text-zinc-200 outline-none transition focus:border-cyan-400/35",
  Wnt = e => /^#[0-9a-fA-F]{6}$/.test(e),
  Njt = ({
    value: e,
    onLive: t,
    onCommit: n
  }) => {
    on();
    const [r, a] = g.useState(e),
      i = g.useRef(0),
      o = g.useRef(null);
    g.useEffect(() => a(e), [e]);
    const s = l => {
      o.current = l, !i.current && (i.current = requestAnimationFrame(() => {
        i.current = 0;
        const d = o.current;
        d && t(d);
      }));
    };
    return g.useEffect(() => () => {
      i.current && cancelAnimationFrame(i.current);
    }, []), c.jsxs("label", {
      className: "block",
      children: [c.jsx("span", {
        className: "mb-1.5 block text-[10px] text-zinc-500",
        children: x("颜色")
      }), c.jsxs("span", {
        className: "flex gap-2",
        children: [c.jsx("input", {
          type: "color",
          value: Wnt(e) ? e : "#f7f7f7",
          onInput: l => s(l.currentTarget.value),
          onChange: l => n(l.currentTarget.value),
          className: "h-7 w-8 cursor-pointer bg-transparent"
        }), c.jsx("input", {
          value: r,
          onChange: l => {
            const d = l.target.value;
            a(d), Wnt(d) && s(d);
          },
          onBlur: () => {
            Wnt(r) ? n(r) : a(e);
          },
          className: `${Rjt} flex-1`
        })]
      })]
    });
  },
  qnt = e => e === "character" ? c.jsx(kU, {
    size: 13,
    className: "shrink-0",
    "aria-hidden": !0
  }) : e === "camera" ? c.jsx(Kh, {
    size: 13,
    className: "shrink-0",
    "aria-hidden": !0
  }) : e === "light" ? c.jsx(PY, {
    size: 13,
    className: "shrink-0",
    "aria-hidden": !0
  }) : c.jsx(Hm, {
    size: 13,
    className: "shrink-0",
    "aria-hidden": !0
  }),
  Knt = ({
    label: e,
    title: t,
    value: n,
    options: r,
    onChange: a
  }) => {
    on();
    const [i, o] = g.useState(!1),
      s = g.useRef(null),
      l = g.useRef(null),
      d = r.find(u => u.value === n) ?? r[0];
    return g.useEffect(() => o(!1), [n]), g.useEffect(() => {
      if (!i) return;
      const u = p => {
          var f;
          const m = p.target;
          (f = l.current) != null && f.contains(m) || m != null && m.closest('[data-gen-node-portal-dropdown="true"]') || o(!1);
        },
        h = p => {
          p.key === "Escape" && o(!1);
        };
      return document.addEventListener("mousedown", u), window.addEventListener("keydown", h), () => {
        document.removeEventListener("mousedown", u), window.removeEventListener("keydown", h);
      };
    }, [i]), c.jsxs("div", {
      className: "block",
      ref: l,
      children: [c.jsx("span", {
        className: "mb-1.5 block text-[10px] text-zinc-500",
        title: t,
        children: e
      }), c.jsxs("button", {
        ref: s,
        type: "button",
        title: t,
        onClick: () => o(u => !u),
        className: `${Rjt} flex w-full items-center gap-1.5 text-left`,
        children: [d == null ? void 0 : d.icon, c.jsx("span", {
          className: "min-w-0 flex-1 truncate",
          children: (d == null ? void 0 : d.label) ?? ""
        }), c.jsx(Mi, {
          size: 11,
          className: `shrink-0 text-zinc-500 transition-transform ${i ? "rotate-180" : ""}`
        })]
      }), c.jsx(Tv, {
        open: i,
        anchorRef: s,
        isDark: !0,
        minWidth: 192,
        maxHeight: 280,
        placement: "auto",
        scrollToSelectedKey: n,
        children: r.map(u => {
          const h = u.value === n;
          return c.jsxs("button", {
            type: "button",
            ...(h ? {
              [Md]: "true"
            } : {}),
            [qk]: u.value,
            onClick: () => {
              a(u.value), o(!1);
            },
            className: `w-full flex items-center gap-1.5 px-2 py-1.5 rounded text-left text-xs font-medium transition-colors hover:bg-zinc-800 text-zinc-300 ${h ? "bg-zinc-800" : ""}`,
            children: [u.icon, c.jsx("span", {
              className: "min-w-0 truncate",
              children: x(u.label)
            })]
          }, u.value);
        })
      })]
    });
  },
  gR = ({
    title: e,
    children: t,
    defaultOpen: n = !0
  }) => {
    on();
    const [r, a] = g.useState(n);
    return c.jsxs("section", {
      className: "border-b border-white/[0.055]",
      children: [c.jsxs("button", {
        className: "flex h-9 w-full items-center justify-between px-3 text-left text-[11px] font-medium text-zinc-300",
        onClick: () => a(i => !i),
        children: [e, r ? c.jsx(Mi, {
          size: 13,
          className: "text-zinc-600"
        }) : c.jsx(ss, {
          size: 13,
          className: "text-zinc-600"
        })]
      }), r && c.jsx("div", {
        className: "space-y-3 px-3 pb-3",
        children: t
      })]
    });
  },
  S_e = ({
    label: e,
    value: t,
    onChange: n,
    step: r = .1
  }) => (on(), c.jsxs("div", {
    children: [c.jsx("div", {
      className: "mb-1.5 text-[10px] text-zinc-500",
      children: e
    }), c.jsx("div", {
      className: "grid grid-cols-3 gap-1.5",
      children: ["X", "Y", "Z"].map((a, i) => c.jsxs("label", {
        className: "flex items-center rounded-md bg-white/[0.04] px-1.5 ring-1 ring-inset ring-white/[0.055] focus-within:ring-cyan-400/30",
        children: [c.jsx("span", {
          className: "mr-1 text-[9px] text-zinc-500",
          children: a
        }), c.jsx(A_e, {
          value: Number.isFinite(t[i]) ? t[i] : 0,
          step: r,
          digits: r >= 1 ? 1 : 2,
          className: "min-w-0 flex-1 text-zinc-200",
          onLive: o => {
            const s = [...t];
            s[i] = o, n(s, !0);
          },
          onCommit: o => {
            const s = [...t];
            s[i] = o, n(s, !1);
          }
        })]
      }, a))
    })]
  })),
  gqn = ({
    value: e,
    uniform: t = !0,
    step: n = .05,
    onChange: r,
    onUniformChange: a
  }) => {
    on();
    const i = (o, s, l) => {
      if (t) {
        r([s, s, s]);
        return;
      }
      const d = [...e];
      d[o] = s, r(d);
    };
    return c.jsxs("div", {
      children: [c.jsxs("div", {
        className: "mb-1.5 flex items-center justify-between gap-2",
        children: [c.jsx("span", {
          className: "text-[10px] text-zinc-500",
          children: x("缩放")
        }), c.jsxs("button", {
          type: "button",
          title: x(t ? "等比缩放（开）" : "等比缩放（关）"),
          onClick: () => {
            const o = !t;
            if (a(o), o) {
              const s = Number(((e[0] + e[1] + e[2]) / 3 || 1).toFixed(2));
              r([s, s, s]);
            }
          },
          className: `flex h-5 items-center gap-1 rounded px-1.5 text-[9px] transition ${t ? "bg-cyan-400/15 text-cyan-200" : "bg-white/[0.04] text-zinc-500 hover:text-zinc-300"}`,
          children: [c.jsx(wz, {
            size: 11,
            className: t ? "" : "opacity-50"
          }), x("等比")]
        })]
      }), c.jsx("div", {
        className: "grid grid-cols-3 gap-1.5",
        children: ["X", "Y", "Z"].map((o, s) => c.jsxs("label", {
          className: "flex items-center rounded-md bg-[#383838] px-1.5 ring-1 ring-inset ring-white/[0.035] focus-within:ring-cyan-400/30",
          children: [c.jsx("span", {
            className: "mr-1 text-[9px] text-zinc-500",
            children: o
          }), c.jsx(A_e, {
            value: Number.isFinite(e[s]) ? e[s] : 0,
            step: n,
            digits: 2,
            className: "min-w-0 flex-1 text-zinc-200",
            onLive: l => i(s, l),
            onCommit: l => i(s, l)
          })]
        }, o))
      })]
    });
  },
  pv = ({
    label: e,
    value: t,
    min: n,
    max: r,
    step: a,
    display: i,
    onChange: o,
    onLive: s
  }) => (on(), c.jsxs("label", {
    className: "block",
    children: [c.jsx("span", {
      className: "mb-1.5 block text-[10px] text-zinc-500",
      children: e
    }), c.jsxs("span", {
      className: "grid grid-cols-[1fr_58px] items-center gap-2",
      children: [c.jsx("input", {
        type: "range",
        value: t,
        min: n,
        max: r,
        step: a,
        onInput: l => (s ?? o)(Number(l.currentTarget.value)),
        onPointerUp: l => o(Number(l.currentTarget.value)),
        className: "h-1 w-full accent-cyan-400"
      }), c.jsx("span", {
        className: "grid h-7 place-items-center rounded-md bg-[#383838] text-[10px] tabular-nums text-zinc-200",
        children: i ?? t
      })]
    })]
  })),
  dC = ({
    label: e,
    checked: t,
    onChange: n
  }) => (on(), c.jsxs("button", {
    className: "flex h-10 w-full items-center justify-between overflow-hidden text-[11px] font-medium text-zinc-200",
    onClick: () => n(!t),
    children: [e, c.jsx("span", {
      className: `flex h-4 w-7 shrink-0 items-center rounded-full p-0.5 transition-colors ${t ? "justify-end bg-zinc-100" : "justify-start bg-zinc-600"}`,
      children: c.jsx("span", {
        className: `block h-3 w-3 shrink-0 rounded-full ${t ? "bg-[#282828]" : "bg-zinc-400"}`
      })
    })]
  })),
  c1a = [18, 24, 35, 50, 85, 120],
  qJt = e => Math.round(2 * Math.atan(36 / (2 * e)) * (180 / Math.PI) * 10) / 10,
  yqn = "director3d-custom-poses",
  d1a = () => {
    try {
      const e = localStorage.getItem(yqn),
        t = e ? JSON.parse(e) : [];
      return Array.isArray(t) ? t : [];
    } catch {
      return [];
    }
  },
  KJt = e => {
    try {
      localStorage.setItem(yqn, JSON.stringify(e));
    } catch {}
  },
  u1a = () => `cp-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
  h1a = ({
    shots: e,
    activeShotId: t,
    objects: n,
    onAdd: r,
    onDuplicate: a,
    onRename: i,
    onDelete: o,
    onSelect: s,
    onFocus: l
  }) => (on(), c.jsxs("div", {
    className: "space-y-2",
    children: [c.jsx("button", {
      onClick: r,
      className: "flex h-8 w-full items-center justify-center gap-1 rounded-md bg-zinc-100 text-[10px] font-medium text-zinc-900",
      children: x("＋ 新建机位")
    }), e.map(d => {
      var p;
      const u = d.id === t,
        h = ((p = n.find(m => m.id === d.cameraId)) == null ? void 0 : p.name) ?? d.name;
      return c.jsxs("div", {
        className: `rounded-md border p-2 ${u ? "border-cyan-400/40 bg-cyan-400/[0.06]" : "border-white/[0.06] bg-[#2a2a2a]"}`,
        children: [c.jsxs("div", {
          className: "flex items-center gap-1.5",
          children: [u && c.jsx("span", {
            className: "shrink-0 rounded bg-cyan-300 px-1 py-0.5 text-[7px] font-bold text-black",
            children: "ACTIVE"
          }), c.jsx("input", {
            value: h,
            onChange: m => i(d.id, m.target.value),
            className: "min-w-0 flex-1 bg-transparent text-[11px] text-zinc-100 outline-none"
          }), c.jsx("button", {
            onClick: () => a(d.id),
            className: "shrink-0 text-[9px] text-zinc-500 hover:text-zinc-100",
            title: x("复制机位"),
            children: "⧉"
          }), e.length > 1 && c.jsx("button", {
            onClick: () => o(d.id),
            className: "shrink-0 text-[9px] text-zinc-500 hover:text-red-300",
            title: x("删除机位"),
            children: "✕"
          })]
        }), c.jsxs("div", {
          className: "mt-1 flex items-center gap-1.5",
          children: [c.jsx("button", {
            onClick: () => s(d.id),
            disabled: u,
            className: "flex h-6 flex-1 items-center justify-center rounded bg-white/[0.06] text-[9px] text-zinc-300 disabled:opacity-0",
            children: x("切换")
          }), c.jsx("button", {
            onClick: () => l(d.cameraId),
            className: "flex h-6 flex-1 items-center justify-center rounded bg-white/[0.06] text-[9px] text-zinc-400 hover:text-zinc-100",
            children: x("聚焦")
          })]
        })]
      }, d.id);
    })]
  })),
  p1a = ({
    pose: e,
    poseAdjust: t,
    onApply: n
  }) => {
    on();
    const [r, a] = g.useState(d1a),
      [i, o] = g.useState(""),
      s = () => {
        const u = [{
          id: u1a(),
          name: i.trim() || `姿势${r.length + 1}`,
          pose: e,
          poseAdjust: JSON.parse(JSON.stringify(t))
        }, ...r].slice(0, 30);
        KJt(u), a(u), o("");
      },
      l = u => n(u.pose, u.poseAdjust),
      d = u => {
        const h = r.filter(p => p.id !== u);
        KJt(h), a(h);
      };
    return c.jsxs("div", {
      className: "space-y-2",
      children: [c.jsxs("div", {
        className: "flex gap-1.5",
        children: [c.jsx("input", {
          value: i,
          onChange: u => o(u.target.value),
          placeholder: x("姿势名称"),
          className: "h-7 min-w-0 flex-1 rounded-md border border-white/[0.06] bg-[#383838] px-2 text-[10px] text-zinc-200 outline-none focus:border-cyan-400/35"
        }), c.jsxs("button", {
          onClick: s,
          className: "flex h-7 shrink-0 items-center gap-1 rounded-md bg-zinc-100 px-2 text-[10px] font-medium text-zinc-900",
          title: x("保存当前姿势"),
          children: [c.jsx(eTn, {
            size: 11
          }), x("保存")]
        })]
      }), r.length === 0 ? c.jsx("div", {
        className: "rounded-md border border-dashed border-white/[0.07] bg-white/[0.02] px-3 py-2 text-[9px] text-zinc-600",
        children: x("暂无自定义姿势")
      }) : r.map(u => c.jsxs("div", {
        className: "flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-[#2a2a2a] px-2 py-1.5",
        children: [c.jsx("button", {
          onClick: () => l(u),
          className: "min-w-0 flex-1 truncate text-left text-[10px] text-zinc-200 hover:text-cyan-300",
          children: u.name
        }), c.jsx("button", {
          onClick: () => d(u.id),
          className: "shrink-0 text-[9px] text-zinc-500 hover:text-red-300",
          title: x("删除"),
          children: "✕"
        })]
      }, u.id))]
    });
  },
  UYe = ({
    object: e,
    onUpdate: t,
    onStartObjectPath: n
  }) => (on(), c.jsxs(c.Fragment, {
    children: [c.jsxs("label", {
      className: "block",
      children: [c.jsx("span", {
        className: "mb-1.5 block text-[10px] text-zinc-500",
        children: x("名称")
      }), c.jsx("input", {
        value: e.name,
        onChange: r => t({
          name: r.target.value
        }),
        className: `${Rjt} w-full`
      })]
    }), c.jsx(S_e, {
      label: x("位置"),
      value: e.position,
      onChange: (r, a) => t({
        position: r
      }, a)
    }), c.jsx(S_e, {
      label: x("旋转"),
      value: e.rotation,
      step: 1,
      onChange: (r, a) => t({
        rotation: r
      }, a)
    }), n && e.kind !== "camera" && e.kind !== "crowd" && c.jsx("button", {
      type: "button",
      onClick: () => n(e.id),
      className: "h-7 w-full rounded-md bg-white/[0.06] text-[10px] text-zinc-300 hover:bg-white/[0.1] hover:text-zinc-100",
      children: x("绘制移动路径")
    })]
  })),
  bqn = ({
    tabs: e,
    active: t,
    onChange: n
  }) => (on(), c.jsx("div", {
    className: "flex h-10 items-center gap-1 border-b border-white/[0.06] px-3",
    children: e.map(r => c.jsxs("button", {
      onClick: () => n(r.id),
      className: `relative rounded-md px-3 py-1.5 text-[11px] ${t === r.id ? "bg-white/[0.07] font-medium text-white" : "text-zinc-500 hover:text-zinc-200"}`,
      children: [x(r.label), r.badge && c.jsx("span", {
        className: "absolute -right-2 -top-2 rounded bg-cyan-300 px-1 text-[7px] font-bold text-black",
        children: r.badge
      })]
    }, r.id))
  })),
  m1a = ({
    camera: e,
    objects: t,
    aspectRatio: n,
    activeTab: r,
    onTab: a,
    onUpdate: i,
    onSelectObject: o,
    onCapture: s,
    cameraPreviewCanvasRef: l,
    onDeleteScreenshot: d,
    onClearScreenshots: u,
    onSendScreenshotToCanvas: h,
    onFocusObject: p,
    onAlignCameraToSelected: m
  }) => {
    on();
    const f = t.filter(v => v.kind === "camera"),
      y = t.filter(v => v.kind === "character" || v.kind === "geometry"),
      b = e.lookAtMode === "target" ? e.lookAtTargetId ?? "" : e.lookAtMode ?? "coordinate";
    return c.jsxs(c.Fragment, {
      children: [c.jsx(bqn, {
        active: r,
        onChange: a,
        tabs: [{
          id: "property",
          label: "属性"
        }, {
          id: "shot",
          label: "截图"
        }]
      }), r === "property" && c.jsxs("div", {
        className: "space-y-4 p-4",
        children: [c.jsxs("div", {
          className: "relative aspect-video overflow-hidden rounded-xl border border-white/[0.08] bg-[linear-gradient(#050509_52%,#11151d_52%)]",
          children: [c.jsx("canvas", {
            ref: l,
            className: "h-full w-full object-cover"
          }), c.jsxs("span", {
            className: "absolute left-3 top-3 rounded bg-black/55 px-1.5 py-1 text-[11px] font-semibold text-zinc-200",
            children: ["FOV ", e.fov, "°"]
          }), c.jsx("button", {
            onClick: s,
            className: "absolute bottom-2 right-2 rounded-lg bg-black/65 px-2 py-1 text-[9px] text-zinc-100 ring-1 ring-white/10",
            children: x("拍摄")
          })]
        }), c.jsxs("div", {
          className: "space-y-2",
          children: [c.jsx("div", {
            className: "text-[10px] text-zinc-500",
            children: x("常用焦距")
          }), c.jsx("div", {
            className: "grid grid-cols-6 gap-1.5",
            children: c1a.map(v => c.jsxs("button", {
              onClick: () => i({
                fov: qJt(v)
              }),
              className: `h-7 rounded-md text-[9px] ${Math.abs(e.fov - qJt(v)) < .5 ? "bg-cyan-300 text-black" : "bg-[#393939] text-zinc-200 hover:bg-[#464646]"}`,
              children: [v, "mm"]
            }, v))
          }), c.jsxs("div", {
            className: "flex gap-1.5",
            children: [c.jsxs("button", {
              onClick: () => p(e.id),
              className: "flex h-7 flex-1 items-center justify-center gap-1 rounded-md bg-white/[0.06] text-[10px] text-zinc-300 hover:text-zinc-100",
              children: [c.jsx(Xle, {
                size: 11
              }), x("聚焦")]
            }), c.jsxs("button", {
              onClick: m,
              className: "flex h-7 flex-1 items-center justify-center gap-1 rounded-md bg-white/[0.06] text-[10px] text-zinc-300 hover:text-zinc-100",
              children: [c.jsx(mu, {
                size: 11
              }), x("对准")]
            })]
          })]
        }), c.jsx(UYe, {
          object: e,
          onUpdate: i
        }), c.jsx(Knt, {
          label: x("切换机位"),
          value: e.id,
          options: f.map(v => ({
            value: v.id,
            label: v.name,
            icon: qnt("camera")
          })),
          onChange: o
        }), c.jsx(Knt, {
          label: x("跟随目标"),
          title: x("播放时相机相对该对象保持构图，环绕运镜会跟着角色走"),
          value: e.followTargetId ?? "",
          options: [{
            value: "",
            label: "不跟随",
            icon: c.jsx(DRr, {
              size: 13,
              className: "shrink-0",
              "aria-hidden": !0
            })
          }, ...y.map(v => ({
            value: v.id,
            label: v.name,
            icon: qnt(v.kind)
          }))],
          onChange: v => i({
            followTargetId: v || null
          })
        }), c.jsx(Knt, {
          label: x("注视目标"),
          title: x("注视点跟随目标，保留当前构图高度（脚/脸）"),
          value: b,
          options: [{
            value: "coordinate",
            label: "手动坐标",
            icon: c.jsx(lEt, {
              size: 13,
              className: "shrink-0",
              "aria-hidden": !0
            })
          }, {
            value: "rotation",
            label: "手动旋转",
            icon: c.jsx(vd, {
              size: 13,
              className: "shrink-0",
              "aria-hidden": !0
            })
          }, ...y.map(v => ({
            value: v.id,
            label: v.name,
            icon: qnt(v.kind)
          }))],
          onChange: v => {
            i(v === "coordinate" || v === "rotation" ? {
              lookAtMode: v,
              lookAtTargetId: null
            } : {
              lookAtMode: "target",
              lookAtTargetId: v
            });
          }
        }), c.jsx(S_e, {
          label: x("注视坐标"),
          value: e.lookAt,
          onChange: (v, _) => i({
            lookAt: v
          }, _)
        }), c.jsx(pv, {
          label: x("视野角度 (FOV)"),
          value: e.fov,
          min: 10,
          max: 120,
          step: 1,
          display: e.fov.toFixed(1),
          onLive: v => i({
            fov: v
          }, !0),
          onChange: v => i({
            fov: v
          }, !1)
        }), c.jsxs("div", {
          className: "text-[10px] text-zinc-600",
          children: [x("当前画幅 "), n]
        })]
      }), r === "shot" && c.jsxs("div", {
        className: "space-y-3 p-4",
        children: [c.jsx("div", {
          className: "flex justify-end",
          children: c.jsx("button", {
            disabled: !e.screenshots.length,
            onClick: () => u(e.id),
            className: "text-[10px] text-zinc-500 hover:text-red-300 disabled:opacity-30",
            children: x("全部清空")
          })
        }), c.jsx(s1a, {
          camera: e,
          onDelete: d,
          onSendToCanvas: h
        })]
      })]
    });
  },
  f1a = ({
    label: e,
    value: t,
    onChange: n
  }) => (on(), c.jsx(pv, {
    label: e,
    value: t,
    min: -180,
    max: 180,
    step: 1,
    onChange: n
  })),
  BI = ({
    title: e,
    value: t,
    labels: n,
    onChange: r
  }) => (on(), c.jsxs("div", {
    className: "space-y-2",
    children: [c.jsx("div", {
      className: "pt-1 text-[10px] font-semibold text-zinc-400",
      children: e
    }), n.map((a, i) => c.jsx(f1a, {
      label: a,
      value: t[i],
      onChange: o => {
        const s = [...t];
        s[i] = o, r(s);
      }
    }, a))]
  })),
  g1a = ({
    character: e,
    activeTab: t,
    onTab: n,
    onUpdate: r,
    settings: a,
    onUpdateSettings: i,
    onStartObjectPath: o
  }) => {
    on();
    const s = e.poseAdjust ?? ZTe(),
      l = (d, u) => r({
        poseAdjust: {
          ...s,
          [d]: u
        }
      });
    return c.jsxs(c.Fragment, {
      children: [c.jsx(bqn, {
        active: t,
        onChange: n,
        tabs: [{
          id: "property",
          label: "属性"
        }, {
          id: "pose",
          label: "姿势"
        }]
      }), t === "property" && c.jsxs("div", {
        className: "space-y-4 p-4",
        children: [c.jsx(UYe, {
          object: e,
          onUpdate: r,
          onStartObjectPath: o
        }), c.jsx(gqn, {
          value: e.scale,
          uniform: e.uniformScale !== !1,
          step: .05,
          onChange: d => r({
            scale: d
          }),
          onUniformChange: d => r({
            uniformScale: d
          })
        }), c.jsx(Njt, {
          value: e.color,
          onLive: d => r({
            color: d
          }, !0),
          onCommit: d => r({
            color: d
          }, !1)
        }), e.fbxUrl && c.jsx("button", {
          type: "button",
          onClick: () => r({
            fbxUrl: void 0
          }),
          className: "h-7 w-full rounded-md bg-white/[0.06] text-[10px] text-zinc-400 hover:text-red-300",
          children: x("移除导入的 FBX")
        })]
      }), t === "pose" && c.jsxs("div", {
        className: "space-y-4 p-4",
        children: [c.jsxs("div", {
          children: [c.jsx("div", {
            className: "mb-2 text-[10px] text-zinc-500",
            children: x("姿势预设")
          }), c.jsx("div", {
            className: "grid grid-cols-4 gap-1.5",
            children: Pjt.map(d => c.jsx("button", {
              onClick: () => r({
                pose: d,
                poseAdjust: ZTe()
              }),
              className: `h-7 rounded-md text-[9px] ${e.pose === d ? "bg-cyan-300 text-black" : "bg-[#393939] text-zinc-200 hover:bg-[#464646]"}`,
              children: x(Mjt[d])
            }, d))
          })]
        }), c.jsxs("button", {
          onClick: () => r({
            pose: "stand",
            poseAdjust: ZTe(),
            bonePoses: void 0,
            poseRevision: (e.poseRevision ?? 0) + 1
          }),
          className: "mt-1 flex h-8 w-full items-center justify-center gap-1.5 rounded-md bg-white/[0.06] text-[10px] text-zinc-300 hover:bg-white/[0.09] hover:text-zinc-100",
          children: [c.jsx(vd, {
            size: 12
          }), x("恢复默认动作")]
        }), c.jsx("div", {
          className: "h-px bg-white/[0.06]"
        }), c.jsx("div", {
          className: "text-[11px] font-semibold text-zinc-200",
          children: x("姿势调节")
        }), c.jsx(BI, {
          title: x("身体"),
          value: s.body,
          labels: ["前倾", "转身", "侧倾"],
          onChange: d => l("body", d)
        }), c.jsx(BI, {
          title: x("躯干"),
          value: s.torso ?? [0, 0, 0],
          labels: ["前倾", "扭转", "侧倾"],
          onChange: d => l("torso", d)
        }), c.jsx(BI, {
          title: x("头部"),
          value: s.head,
          labels: ["点头", "转头", "歪头"],
          onChange: d => l("head", d)
        }), c.jsx(BI, {
          title: x("手臂—肩 左"),
          value: s.leftArm,
          labels: ["前举", "外展", "扭转"],
          onChange: d => l("leftArm", d)
        }), c.jsx(BI, {
          title: x("手臂—肩 右"),
          value: s.rightArm,
          labels: ["前举", "外展", "扭转"],
          onChange: d => l("rightArm", d)
        }), c.jsx(BI, {
          title: x("肘部 左"),
          value: s.leftForearm,
          labels: ["弯曲", "外翻", "扭转"],
          onChange: d => l("leftForearm", d)
        }), c.jsx(BI, {
          title: x("肘部 右"),
          value: s.rightForearm,
          labels: ["弯曲", "外翻", "扭转"],
          onChange: d => l("rightForearm", d)
        }), c.jsx(BI, {
          title: x("腿部—髋 左"),
          value: s.leftLeg,
          labels: ["前抬", "外展", "扭转"],
          onChange: d => l("leftLeg", d)
        }), c.jsx(BI, {
          title: x("腿部—髋 右"),
          value: s.rightLeg,
          labels: ["前抬", "外展", "扭转"],
          onChange: d => l("rightLeg", d)
        }), c.jsx(BI, {
          title: x("膝部 左"),
          value: s.leftShin,
          labels: ["弯曲", "外翻", "扭转"],
          onChange: d => l("leftShin", d)
        }), c.jsx(BI, {
          title: x("膝部 右"),
          value: s.rightShin,
          labels: ["弯曲", "外翻", "扭转"],
          onChange: d => l("rightShin", d)
        }), c.jsx(dC, {
          label: x("脚底锁定 (IK)"),
          checked: a.footLock ?? !1,
          onChange: d => i({
            footLock: d
          })
        }), c.jsx(dC, {
          label: x("网格"),
          checked: a.showGrid !== !1,
          onChange: d => i({
            showGrid: d
          })
        }), c.jsx("div", {
          className: "h-px bg-white/[0.06]"
        }), c.jsx("div", {
          className: "text-[11px] font-semibold text-zinc-200",
          children: x("自定义姿势")
        }), c.jsx(p1a, {
          pose: e.pose,
          poseAdjust: e.poseAdjust ?? ZTe(),
          onApply: (d, u) => r({
            pose: d,
            poseAdjust: u
          })
        })]
      })]
    });
  },
  y1a = ({
    light: e,
    onUpdate: t,
    onStartObjectPath: n
  }) => {
    on();
    const r = [{
      id: "directional",
      label: "方向光"
    }, {
      id: "point",
      label: "点光"
    }, {
      id: "spot",
      label: "聚光灯"
    }];
    return c.jsxs(gR, {
      title: x("灯光"),
      children: [c.jsx(UYe, {
        object: e,
        onUpdate: t,
        onStartObjectPath: n
      }), c.jsx("div", {
        className: "flex gap-1",
        children: r.map(a => c.jsx("button", {
          type: "button",
          onClick: () => t({
            light: a.id
          }),
          className: `h-7 flex-1 rounded-md text-[9px] ${e.light === a.id ? "bg-cyan-300 text-black" : "bg-[#393939] text-zinc-200 hover:bg-[#464646]"}`,
          children: x(a.label)
        }, a.id))
      }), c.jsx(pv, {
        label: x("强度"),
        value: e.intensity,
        min: 0,
        max: 8,
        step: .05,
        display: e.intensity.toFixed(2),
        onChange: a => t({
          intensity: a
        })
      }), c.jsx(Njt, {
        value: e.color,
        onLive: a => t({
          color: a
        }, !0),
        onCommit: a => t({
          color: a
        }, !1)
      }), e.light !== "directional" && c.jsx(pv, {
        label: x("距离"),
        value: e.distance ?? 14,
        min: 1,
        max: 40,
        step: .5,
        display: (e.distance ?? 14).toFixed(1),
        onChange: a => t({
          distance: a
        })
      }), e.light === "spot" && c.jsxs(c.Fragment, {
        children: [c.jsx(pv, {
          label: x("锥角"),
          value: e.angle ?? 35,
          min: 5,
          max: 80,
          step: 1,
          display: `${Math.round(e.angle ?? 35)}°`,
          onChange: a => t({
            angle: a
          })
        }), c.jsx(pv, {
          label: x("边缘柔和"),
          value: e.penumbra ?? .25,
          min: 0,
          max: 1,
          step: .05,
          display: (e.penumbra ?? .25).toFixed(2),
          onChange: a => t({
            penumbra: a
          })
        })]
      })]
    });
  },
  vqn = g.memo(({
    selectedObject: e,
    objects: t,
    settings: n,
    aspectRatio: r,
    shots: a,
    activeShotId: i,
    onSelectObject: o,
    onUpdateObject: s,
    onUpdateSettings: l,
    onAddShot: d,
    onDuplicateShot: u,
    onRenameShot: h,
    onDeleteShot: p,
    onSelectShot: m,
    activeShot: f,
    onUpdateShotReference: y,
    onDeleteScreenshot: b,
    onClearScreenshots: v,
    onCaptureScreenshot: _,
    cameraPreviewCanvasRef: w,
    onFocusObject: k,
    onAlignCameraToSelected: A,
    onSendScreenshotToCanvas: S,
    onStartObjectPath: C
  }) => {
    on();
    const [I, E] = g.useState("property"),
      [M, T] = g.useState(!0);
    g.useEffect(() => E("property"), [e == null ? void 0 : e.id]);
    const P = (G, z = !1) => e && s(e.id, G, z),
      R = Math.round(n.scale * 100),
      j = g.useRef(null),
      B = G => {
        if (!G) return;
        const z = new FileReader();
        z.onload = () => N({
          referenceImageUrl: typeof z.result == "string" ? z.result : void 0
        }), z.readAsDataURL(G);
      },
      F = (f == null ? void 0 : f.referenceImageUrl) ?? n.referenceImageUrl,
      N = G => {
        f ? y(f.id, G) : l(G);
      };
    return c.jsxs("aside", {
      "data-director-sidebar": "right",
      "data-collapsed": M,
      className: `director-sidebar relative z-30 flex h-full shrink-0 flex-col overflow-hidden border-l border-white/[0.055] bg-[#191919] text-zinc-300 ${M ? "w-11" : "w-[288px]"}`,
      children: [M && c.jsxs("div", {
        className: "director-rail",
        children: [c.jsx("div", {
          className: "director-rail-header",
          children: c.jsx("button", {
            type: "button",
            title: x("展开属性栏"),
            "aria-expanded": !1,
            onClick: () => T(!1),
            className: "director-rail-button",
            children: c.jsx(Mf, {
              size: 14
            })
          })
        }), c.jsxs("nav", {
          className: "director-rail-nav",
          children: [c.jsx("button", {
            type: "button",
            title: (e == null ? void 0 : e.kind) === "camera" ? x("摄像机") : e ? e.name : x("3D场景"),
            onClick: () => T(!1),
            className: "director-rail-button is-active",
            children: (e == null ? void 0 : e.kind) === "camera" ? c.jsx(Kh, {
              size: 17
            }) : e ? c.jsx(kU, {
              size: 17
            }) : c.jsx(by, {
              size: 17
            })
          }), (e == null ? void 0 : e.kind) === "camera" && c.jsx("button", {
            type: "button",
            title: x("截图"),
            onClick: () => {
              E("shot"), T(!1);
            },
            className: "director-rail-button",
            children: c.jsx(mu, {
              size: 17
            })
          })]
        })]
      }), !M && c.jsxs(c.Fragment, {
        children: [c.jsxs("div", {
          className: "director-panel-header",
          children: [c.jsxs("span", {
            className: "flex min-w-0 items-center gap-2 truncate",
            children: [(e == null ? void 0 : e.kind) === "camera" ? c.jsx(Kh, {
              size: 14
            }) : e ? c.jsx(kU, {
              size: 14
            }) : c.jsx(by, {
              size: 14
            }), e ? e.kind === "camera" ? x("摄像机") : e.name : x("3D场景")]
          }), c.jsx("button", {
            type: "button",
            title: x("收起"),
            "aria-expanded": !0,
            onClick: () => T(!0),
            className: "director-rail-button",
            children: c.jsx(ss, {
              size: 14
            })
          })]
        }), c.jsx("div", {
          className: "min-h-0 flex-1 overflow-y-auto [scrollbar-color:#464646_transparent] [scrollbar-width:thin]",
          children: (e == null ? void 0 : e.kind) === "camera" ? c.jsx(m1a, {
            camera: e,
            objects: t,
            aspectRatio: r,
            activeTab: I,
            onTab: E,
            onUpdate: P,
            onSelectObject: o,
            onCapture: _,
            cameraPreviewCanvasRef: w,
            onDeleteScreenshot: b,
            onClearScreenshots: v,
            onSendScreenshotToCanvas: S,
            onFocusObject: k,
            onAlignCameraToSelected: A
          }) : (e == null ? void 0 : e.kind) === "character" ? c.jsx(g1a, {
            character: e,
            activeTab: I,
            onTab: E,
            onUpdate: P,
            settings: n,
            onUpdateSettings: l,
            onStartObjectPath: C
          }) : (e == null ? void 0 : e.kind) === "light" ? c.jsx(y1a, {
            light: e,
            onUpdate: P,
            onStartObjectPath: C
          }) : e ? c.jsx(c.Fragment, {
            children: c.jsxs(gR, {
              title: e.kind === "geometry" ? x("几何模型") : e.kind === "prop" ? x("场景道具") : x("群众属性"),
              children: [c.jsx(UYe, {
                object: e,
                onUpdate: P,
                onStartObjectPath: C
              }), (e.kind === "geometry" || e.kind === "prop") && c.jsx(gqn, {
                value: e.scale,
                uniform: e.uniformScale !== !1,
                onChange: G => P({
                  scale: G
                }),
                onUniformChange: G => P({
                  uniformScale: G
                })
              }), c.jsx(Njt, {
                value: e.color,
                onLive: G => P({
                  color: G
                }, !0),
                onCommit: G => P({
                  color: G
                }, !1)
              })]
            })
          }) : c.jsxs(c.Fragment, {
            children: [c.jsxs(gR, {
              title: x("3D场景"),
              children: [c.jsx(pv, {
                label: x("场景缩放"),
                value: R,
                min: 25,
                max: 400,
                step: 5,
                display: `${R}%`,
                onChange: G => l({
                  scale: G / 100
                })
              }), c.jsx(S_e, {
                label: x("场景平移"),
                value: n.position,
                onChange: G => l({
                  position: G
                })
              }), c.jsx(S_e, {
                label: x("场景旋转"),
                value: n.rotation,
                step: 1,
                onChange: G => l({
                  rotation: G
                })
              })]
            }), c.jsx(gR, {
              title: x("机位列表"),
              children: c.jsx(h1a, {
                shots: a,
                activeShotId: i,
                objects: t,
                onAdd: d,
                onDuplicate: u,
                onRename: h,
                onDelete: p,
                onSelect: m,
                onFocus: G => k(G)
              })
            }), c.jsxs(gR, {
              title: x("灯光 / 曝光"),
              children: [c.jsx(pv, {
                label: x("环境光强度"),
                value: n.ambientIntensity ?? .58,
                min: 0,
                max: 3,
                step: .05,
                display: (n.ambientIntensity ?? .58).toFixed(2),
                onChange: G => l({
                  ambientIntensity: G
                })
              }), c.jsx(pv, {
                label: x("主光强度"),
                value: n.keyIntensity ?? 1.4,
                min: 0,
                max: 4,
                step: .05,
                display: (n.keyIntensity ?? 1.4).toFixed(2),
                onChange: G => l({
                  keyIntensity: G
                })
              }), c.jsx(pv, {
                label: x("补光强度"),
                value: n.fillIntensity ?? .5,
                min: 0,
                max: 3,
                step: .05,
                display: (n.fillIntensity ?? .5).toFixed(2),
                onChange: G => l({
                  fillIntensity: G
                })
              }), c.jsx(pv, {
                label: x("曝光"),
                value: n.exposure ?? 1,
                min: .2,
                max: 3,
                step: .05,
                display: (n.exposure ?? 1).toFixed(2),
                onChange: G => l({
                  exposure: G
                })
              }), c.jsxs("label", {
                className: "block",
                children: [c.jsx("span", {
                  className: "mb-1.5 block text-[10px] text-zinc-500",
                  children: x("主光颜色")
                }), c.jsx("input", {
                  type: "color",
                  value: n.keyColor ?? "#ffffff",
                  onChange: G => l({
                    keyColor: G.target.value
                  })
                })]
              })]
            }), c.jsxs(gR, {
              title: x("参考图叠层"),
              children: [c.jsxs("div", {
                className: "flex gap-2",
                children: [c.jsx("button", {
                  onClick: () => {
                    var G;
                    return (G = j.current) == null ? void 0 : G.click();
                  },
                  className: "flex h-8 flex-1 items-center justify-center gap-1 rounded-md bg-white/[0.06] text-[10px] text-zinc-300 hover:text-zinc-100",
                  children: x("上传 / 更换")
                }), F && c.jsx("button", {
                  onClick: () => N({
                    referenceImageUrl: void 0
                  }),
                  className: "h-8 rounded-md bg-white/[0.06] px-2 text-[10px] text-zinc-400 hover:text-red-300",
                  children: x("移除")
                })]
              }), F && c.jsx("div", {
                className: "h-24 rounded-md border border-white/[0.07] bg-[#111] bg-cover bg-center",
                style: {
                  backgroundImage: "url()"
                }
              }), c.jsx(pv, {
                label: x("透明度"),
                value: (f == null ? void 0 : f.referenceOpacity) ?? n.referenceOpacity ?? .5 ?? .5,
                min: 0,
                max: 1,
                step: .05,
                display: ((f == null ? void 0 : f.referenceOpacity) ?? n.referenceOpacity ?? .5 ?? .5).toFixed(2),
                onChange: G => N({
                  referenceOpacity: G
                })
              }), c.jsx(pv, {
                label: x("大小"),
                value: (f == null ? void 0 : f.referenceScale) ?? n.referenceScale ?? 3 ?? 3,
                min: 1,
                max: 10,
                step: .1,
                display: ((f == null ? void 0 : f.referenceScale) ?? n.referenceScale ?? 3 ?? 3).toFixed(1),
                onChange: G => N({
                  referenceScale: G
                })
              }), c.jsx(pv, {
                label: x("旋转"),
                value: (f == null ? void 0 : f.referenceRotation) ?? n.referenceRotation ?? 0 ?? 0,
                min: -90,
                max: 90,
                step: 1,
                onChange: G => N({
                  referenceRotation: G
                })
              }), c.jsx(dC, {
                label: x("进入导出"),
                checked: (f == null ? void 0 : f.referenceInExport) ?? n.referenceInExport ?? !1 ?? !1,
                onChange: G => N({
                  referenceInExport: G
                })
              })]
            }), c.jsxs(gR, {
              title: x("全景背景"),
              children: [c.jsx("div", {
                className: "rounded-md border border-dashed border-white/[0.08] bg-white/[0.025] px-3 py-2 text-[9px] text-zinc-600",
                children: x("请从左侧全景图入口连接图源")
              }), c.jsxs("label", {
                className: "block",
                children: [c.jsx("span", {
                  className: "mb-1.5 block text-[10px] text-zinc-500",
                  children: x("天空颜色")
                }), c.jsx("input", {
                  type: "color",
                  value: n.skyColor,
                  onChange: G => l({
                    skyColor: G.target.value
                  })
                })]
              })]
            }), c.jsxs(gR, {
              title: x("全景球"),
              children: [c.jsx(pv, {
                label: x("水平旋转"),
                value: n.panoramaRotation,
                min: -180,
                max: 180,
                step: 1,
                onChange: G => l({
                  panoramaRotation: G
                })
              }), c.jsx(pv, {
                label: x("球形半径"),
                value: n.panoramaRadius,
                min: 10,
                max: 100,
                step: 1,
                onChange: G => l({
                  panoramaRadius: G
                })
              })]
            }), c.jsxs("div", {
              className: "divide-y divide-white/[0.055] border-b border-white/[0.055] px-4",
              children: [c.jsx(dC, {
                label: x("角色标签"),
                checked: n.showLabels,
                onChange: G => l({
                  showLabels: G
                })
              }), c.jsx(dC, {
                label: x("构图辅助线"),
                checked: (n.compositionGuides ?? "off") !== "off",
                onChange: G => l({
                  compositionGuides: G ? "thirds" : "off"
                })
              }), c.jsx(dC, {
                label: x("机位锁定编辑"),
                checked: n.lockCameraToView ?? !1,
                onChange: G => l({
                  lockCameraToView: G
                })
              }), c.jsx(dC, {
                label: x("网格吸附"),
                checked: n.gridSnap,
                onChange: G => l({
                  gridSnap: G
                })
              }), c.jsx(dC, {
                label: x("网格"),
                checked: n.showGrid !== !1,
                onChange: G => l({
                  showGrid: G
                })
              }), c.jsx(dC, {
                label: x("高斯地面吸附"),
                checked: n.gaussianGroundSnap,
                onChange: G => l({
                  gaussianGroundSnap: G
                })
              }), c.jsx(dC, {
                label: x("地面"),
                checked: n.showGround,
                onChange: G => l({
                  showGround: G
                })
              }), c.jsx(dC, {
                label: x("精简人体"),
                checked: n.exportAbstractCharacters === !0,
                onChange: G => l({
                  exportAbstractCharacters: G
                })
              })]
            }), c.jsxs(gR, {
              title: x("地面"),
              children: [c.jsx(pv, {
                label: x("透明度"),
                value: n.opacity,
                min: 0,
                max: 1,
                step: .05,
                display: n.opacity.toFixed(2),
                onChange: G => l({
                  opacity: G
                })
              }), c.jsx(pv, {
                label: x("高度"),
                value: n.groundHeight,
                min: -5,
                max: 5,
                step: .1,
                display: n.groundHeight.toFixed(1),
                onChange: G => l({
                  groundHeight: G
                })
              })]
            })]
          })
        }), e && c.jsxs("button", {
          onClick: () => s(e.id, {
            rotation: [0, 0, 0]
          }),
          className: "m-3 flex h-8 items-center justify-center gap-1.5 rounded-md border border-white/[0.07] bg-white/[0.035] text-[10px] text-zinc-500 hover:text-zinc-200",
          children: [c.jsx(vd, {
            size: 12
          }), x(" 重置对象旋转")]
        }), c.jsx("input", {
          ref: j,
          type: "file",
          accept: "image/*",
          className: "hidden",
          onChange: G => {
            var z;
            B((z = G.target.files) == null ? void 0 : z[0]), G.currentTarget.value = "";
          }
        })]
      })]
    });
  });

vqn.displayName = "PropertiesPanel";

const df = {
    color: {
      markerCore: "rgba(8,10,12,0.78)",
      active: "#EFD77A"
    },
    kindFallback: {
      camera: "#B7A66A",
      person: "#66B8A6",
      object: "#D8B45F",
      light: "#C7A35A"
    },
    marker: {
      visualScale: 1.55,
      direction: {
        y: -17,
        size: 5.8
      },
      camera: {
        glyphScale: .68,
        fovShortRadius: 48,
        fovEditRadius: 260,
        handleDistance: 66,
        handleWidth: 17,
        handleHeight: 7,
        hitWidth: 30,
        hitHeight: 24
      }
    },
    shadow: {
      marker: "drop-shadow(0 2px 5px rgba(0,0,0,0.48))",
      selected: "drop-shadow(0 2px 6px rgba(0,0,0,0.42))"
    }
  },
  QJt = "M 5 -4.9 L 13.2 -9 A 1.8 1.8 0 0 1 15.8 -7.4 V 7.4 A 1.8 1.8 0 0 1 13.2 9 L 5 4.9 Z",
  YJt = "M -10 -8 H 3 A 3 3 0 0 1 6 -5 V 5 A 3 3 0 0 1 3 8 H -10 A 3 3 0 0 1 -13 5 V -5 A 3 3 0 0 1 -10 -8 Z",
  b1a = (e, t) => {
    const n = e * Math.PI / 360,
      r = {
        x: -Math.sin(n) * t,
        y: -Math.cos(n) * t
      },
      a = {
        x: Math.sin(n) * t,
        y: -Math.cos(n) * t
      },
      i = e > 180 ? 1 : 0;
    return {
      left: r,
      right: a,
      path: `M 0 0 L ${r.x} ${r.y} A ${t} ${t} 0 ${i} 1 ${a.x} ${a.y} Z`
    };
  },
  XJt = (e, t) => {
    const n = Math.hypot(e.x, e.y),
      r = n > 1e-4 ? t / n : 0;
    return {
      x: e.x * r,
      y: e.y * r,
      angle: Math.atan2(e.y, e.x) * (180 / Math.PI)
    };
  },
  v1a = e => {
    let t = 20;
    for (const n of e) t += /[\u4e00-\u9fff]/.test(n) ? 11 : 6.5;
    return Math.max(56, Math.min(168, Math.ceil(t)));
  },
  w1a = ({
    color: e,
    selected: t,
    interactive: n,
    onPointerDown: r
  }) => {
    on();
    const a = df.marker.direction.size,
      i = df.marker.direction.y,
      o = a + 1.45;
    return c.jsxs("g", {
      className: "plan-view-marker-rotator",
      opacity: t ? 1 : .34,
      style: {
        cursor: n ? "grab" : void 0
      },
      onPointerDown: n ? r : void 0,
      children: [c.jsx("path", {
        d: `M 0 ${i - o - 6} L ${-o - 8} ${i + 8} L ${o + 8} ${i + 8} Z`,
        fill: "transparent",
        pointerEvents: n ? "auto" : "none"
      }), c.jsx("path", {
        d: `M 0 ${i - o} L ${-o} ${i} L ${o} ${i} Z`,
        fill: df.color.active,
        opacity: t ? 1 : 0
      }), c.jsx("path", {
        d: `M 0 ${i - a} L ${-a} ${i} L ${a} ${i} Z`,
        fill: e
      })]
    });
  },
  JJt = ({
    color: e,
    geometry: t,
    onPointerDown: n
  }) => {
    on();
    const {
      handleWidth: r,
      handleHeight: a,
      hitWidth: i,
      hitHeight: o
    } = df.marker.camera;
    return c.jsxs("g", {
      transform: `translate(${t.x} ${t.y}) rotate(${t.angle})`,
      style: {
        cursor: "ew-resize"
      },
      onPointerDown: n,
      children: [c.jsx("rect", {
        x: -i / 2,
        y: -o / 2,
        width: i,
        height: o,
        rx: o / 2,
        fill: "transparent"
      }), c.jsx("rect", {
        x: -r / 2,
        y: -a / 2,
        width: r,
        height: a,
        rx: a / 2,
        fill: e,
        stroke: "rgba(8,10,12,0.78)",
        strokeWidth: 1,
        style: {
          filter: df.shadow.marker
        }
      }), c.jsx("line", {
        x1: -r / 2 + 4,
        y1: 0,
        x2: r / 2 - 4,
        y2: 0,
        stroke: "rgba(8,10,12,0.78)",
        strokeWidth: 1.2,
        strokeLinecap: "round"
      })]
    });
  },
  x1a = ({
    marker: e,
    liveFov: t,
    onSelect: n,
    onMove: r,
    onRotate: a,
    onFov: i
  }) => {
    on();
    const o = t ?? e.fov ?? 35,
      s = e.selected,
      l = e.name.trim() || "机位",
      d = v1a(l),
      u = s ? df.color.active : e.color,
      h = s ? df.color.active : "rgba(8,10,12,0.78)",
      p = s ? df.marker.camera.fovEditRadius : df.marker.camera.fovShortRadius,
      m = b1a(o, p),
      f = XJt(m.left, df.marker.camera.handleDistance),
      y = XJt(m.right, df.marker.camera.handleDistance),
      b = `plan-fov-${e.id}`,
      v = df.marker.visualScale;
    return c.jsxs("g", {
      transform: `translate(${e.x} ${e.y})`,
      style: {
        pointerEvents: "auto"
      },
      children: [c.jsxs("g", {
        transform: `rotate(${e.yawDeg}) scale(${v})`,
        children: [c.jsx("defs", {
          children: c.jsxs("radialGradient", {
            id: b,
            cx: "0",
            cy: "0",
            r: p,
            gradientUnits: "userSpaceOnUse",
            children: [c.jsx("stop", {
              offset: "0%",
              stopColor: u,
              stopOpacity: s ? .24 : .34
            }), c.jsx("stop", {
              offset: "46%",
              stopColor: u,
              stopOpacity: s ? .12 : .17
            }), c.jsx("stop", {
              offset: "100%",
              stopColor: u,
              stopOpacity: 0
            })]
          })
        }), c.jsx("path", {
          d: m.path,
          fill: `url(#${b})`,
          pointerEvents: "none"
        }), s && c.jsxs("g", {
          children: [c.jsx("line", {
            x1: 0,
            y1: 0,
            x2: m.left.x,
            y2: m.left.y,
            stroke: u,
            strokeWidth: .8,
            strokeLinecap: "round",
            pointerEvents: "none"
          }), c.jsx("line", {
            x1: 0,
            y1: 0,
            x2: m.right.x,
            y2: m.right.y,
            stroke: u,
            strokeWidth: .8,
            strokeLinecap: "round",
            pointerEvents: "none"
          }), c.jsx(JJt, {
            color: u,
            geometry: f,
            onPointerDown: i
          }), c.jsx(JJt, {
            color: u,
            geometry: y,
            onPointerDown: i
          })]
        }), c.jsx(w1a, {
          color: u,
          selected: s,
          interactive: s,
          onPointerDown: a
        }), c.jsxs("g", {
          transform: `rotate(-90) scale(${df.marker.camera.glyphScale})`,
          onPointerDown: r,
          style: {
            cursor: "grab"
          },
          children: [c.jsx("circle", {
            r: 24,
            fill: "transparent",
            onPointerDown: n
          }), c.jsx("path", {
            d: QJt,
            fill: u,
            stroke: h,
            strokeWidth: 1.2
          }), c.jsx("path", {
            d: YJt,
            fill: u,
            stroke: h,
            strokeWidth: 1.2
          }), s && c.jsxs("g", {
            pointerEvents: "none",
            style: {
              filter: df.shadow.selected
            },
            children: [c.jsx("path", {
              d: QJt,
              fill: "none",
              stroke: df.color.active,
              strokeWidth: 1.55
            }), c.jsx("path", {
              d: YJt,
              fill: "none",
              stroke: df.color.active,
              strokeWidth: 1.55
            })]
          })]
        })]
      }), s && c.jsxs("g", {
        transform: "translate(0 34)",
        pointerEvents: "none",
        children: [c.jsx("rect", {
          x: -d / 2,
          y: -10,
          width: d,
          height: 20,
          rx: 10,
          fill: df.color.markerCore,
          stroke: df.color.active,
          strokeWidth: 1
        }), c.jsx("text", {
          x: 0,
          y: 1,
          textAnchor: "middle",
          dominantBaseline: "middle",
          fill: df.color.active,
          fontSize: 10,
          fontWeight: 600,
          children: l
        })]
      })]
    });
  },
  Sme = ({
    label: e,
    children: t,
    onClick: n,
    onHold: r
  }) => {
    on();
    const a = g.useRef(null),
      i = () => {
        a.current != null && (window.cancelAnimationFrame(a.current), a.current = null);
      },
      o = () => {
        if (!r) return;
        i();
        const s = () => {
          r(), a.current = window.requestAnimationFrame(s);
        };
        a.current = window.requestAnimationFrame(s);
      };
    return g.useEffect(() => i, []), c.jsx("button", {
      type: "button",
      title: e,
      "aria-label": e,
      onClick: s => {
        n == null || n(), s.detail === 0 && (r == null || r());
      },
      onPointerDown: s => {
        !r || s.button !== 0 || (s.currentTarget.setPointerCapture(s.pointerId), o());
      },
      onPointerUp: i,
      onPointerCancel: i,
      onLostPointerCapture: i,
      className: "grid h-7 w-7 place-items-center rounded-md text-zinc-300 transition hover:bg-white/[0.07] hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-cyan-300/60",
      children: t
    });
  },
  _1a = ({
    getZoom: e,
    onRotate: t,
    onZoom: n,
    onReset: r
  }) => {
    on();
    const [a, i] = g.useState(e);
    return g.useEffect(() => {
      let o = 0;
      const s = () => {
        i(e()), o = requestAnimationFrame(s);
      };
      return o = requestAnimationFrame(s), () => cancelAnimationFrame(o);
    }, [e]), c.jsxs("div", {
      className: "mt-2 border-t border-white/[0.06] pt-2",
      children: [c.jsx("div", {
        className: "px-2 pb-1 text-[10px] text-zinc-500",
        children: x("俯视视角")
      }), c.jsxs("div", {
        className: "flex items-center justify-between",
        children: [c.jsx(Sme, {
          label: x("向左旋转俯视图"),
          onHold: () => t(-1),
          children: c.jsx(d_, {
            size: 14
          })
        }), c.jsx(Sme, {
          label: x("向右旋转俯视图"),
          onHold: () => t(1),
          children: c.jsx(ox, {
            size: 14
          })
        }), c.jsx(Sme, {
          label: x("缩小"),
          onClick: () => n(-1),
          children: c.jsx(Wue, {
            size: 14
          })
        }), c.jsxs("span", {
          className: "min-w-8 text-center text-[10px] tabular-nums text-zinc-400",
          children: [a.toFixed(1), "x"]
        }), c.jsx(Sme, {
          label: x("放大"),
          onClick: () => n(1),
          children: c.jsx(Z$, {
            size: 14
          })
        }), c.jsx(Sme, {
          label: x("重置俯视图"),
          onClick: r,
          children: c.jsx(vd, {
            size: 14
          })
        })]
      })]
    });
  },
  k1a = ({
    enabled: e,
    getSnapshot: t,
    screenToGround: n,
    onSelect: r,
    onCameraMove: a,
    onCameraLook: i,
    onCameraFov: o
  }) => {
    on();
    const [s, l] = g.useState({
        zoom: 1,
        markers: []
      }),
      [d, u] = g.useState(null),
      h = g.useRef(null);
    g.useEffect(() => {
      if (!e) return;
      let y = 0;
      const b = () => {
        l(t()), y = window.requestAnimationFrame(b);
      };
      return y = window.requestAnimationFrame(b), () => window.cancelAnimationFrame(y);
    }, [e, t]), g.useEffect(() => {
      const y = (w, k) => {
          const A = h.current;
          if (!A || w.pointerId !== A.pointerId) return;
          const S = n(w.clientX, w.clientY);
          k && S && (A.kind === "move" && a(A.id, S, !1), A.kind === "rotate" && i(A.id, S, !1), A.kind === "fov" && d && o(A.id, d.fov, !1)), h.current = null, u(null);
        },
        b = w => {
          const k = h.current;
          if (!k || w.pointerId !== k.pointerId) return;
          const A = n(w.clientX, w.clientY);
          if (k.kind === "move" && A) {
            a(k.id, A, !0);
            return;
          }
          if (k.kind === "rotate" && A) {
            i(k.id, A, !0);
            return;
          }
          const S = s.markers.find(I => I.id === k.id);
          if (!S) return;
          const C = m(S, w.clientX, w.clientY);
          u({
            id: k.id,
            fov: C
          }), o(k.id, C, !0);
        },
        v = w => y(w, !0),
        _ = w => y(w, !1);
      return window.addEventListener("pointermove", b, !0), window.addEventListener("pointerup", v, !0), window.addEventListener("pointercancel", _, !0), () => {
        window.removeEventListener("pointermove", b, !0), window.removeEventListener("pointerup", v, !0), window.removeEventListener("pointercancel", _, !0);
      };
    }, [d, o, i, a, n, s.markers]);
    const p = (y, b, v) => {
        var w, k;
        if (y.button !== 0) return;
        y.preventDefault(), y.stopPropagation(), r(b.id);
        const _ = n(y.clientX, y.clientY);
        h.current = {
          pointerId: y.pointerId,
          id: b.id,
          kind: v,
          origin: _ ?? void 0
        }, (k = (w = y.currentTarget).setPointerCapture) == null || k.call(w, y.pointerId);
      },
      m = (y, b, v) => {
        const _ = document.querySelector('[data-testid="workspace-plan-view-surface"]'),
          w = _ == null ? void 0 : _.getBoundingClientRect();
        if (!w) return y.fov ?? 35;
        const k = b - w.left - y.x,
          A = v - w.top - y.y,
          S = y.yawDeg * Math.PI / 180,
          C = k * Math.cos(-S) - A * Math.sin(-S),
          I = k * Math.sin(-S) + A * Math.cos(-S),
          E = Math.abs(Math.atan2(C, -I));
        return Math.max(12, Math.min(120, E * 360 / Math.PI));
      };
    if (!e) return null;
    const f = s.markers.filter(y => y.kind === "camera");
    return c.jsx("div", {
      className: "pointer-events-none absolute inset-0 z-20 overflow-hidden",
      "data-testid": "workspace-plan-view-surface",
      children: c.jsx("svg", {
        className: "absolute inset-0 h-full w-full",
        overflow: "visible",
        children: f.map(y => c.jsx(x1a, {
          marker: y,
          liveFov: (d == null ? void 0 : d.id) === y.id ? d.fov : void 0,
          onSelect: () => r(y.id),
          onMove: b => p(b, y, "move"),
          onRotate: b => p(b, y, "rotate"),
          onFov: b => p(b, y, "fov")
        }, y.id))
      })
    });
  };

/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const jjt = "183",
  tj = {
    ROTATE: 0,
    DOLLY: 1,
    PAN: 2
  },
  kre = {
    ROTATE: 0,
    PAN: 1,
    DOLLY_PAN: 2,
    DOLLY_ROTATE: 3
  },
  A1a = 0,
  ZJt = 1,
  S1a = 2,
  jve = 1,
  I1a = 2,
  E0e = 3,
  uT = 0,
  xx = 1,
  _y = 2,
  nj = 0,
  Sie = 1,
  KFe = 2,
  eZt = 3,
  tZt = 4,
  C1a = 5,
  mH = 100,
  E1a = 101,
  T1a = 102,
  M1a = 103,
  P1a = 104,
  R1a = 200,
  N1a = 201,
  j1a = 202,
  D1a = 203,
  Mbt = 204,
  Pbt = 205,
  L1a = 206,
  O1a = 207,
  B1a = 208,
  F1a = 209,
  z1a = 210,
  U1a = 211,
  $1a = 212,
  G1a = 213,
  V1a = 214,
  Rbt = 0,
  Nbt = 1,
  jbt = 2,
  tde = 3,
  Dbt = 4,
  Lbt = 5,
  Obt = 6,
  Bbt = 7,
  $Ye = 0,
  H1a = 1,
  W1a = 2,
  sP = 0,
  wqn = 1,
  xqn = 2,
  _qn = 3,
  epe = 4,
  kqn = 5,
  Aqn = 6,
  Sqn = 7,
  nZt = "attached",
  q1a = "detached",
  Are = 300,
  XX = 301,
  nde = 302,
  Dve = 303,
  Qnt = 304,
  GYe = 306,
  e$ = 1e3,
  hy = 1001,
  QFe = 1002,
  cg = 1003,
  Iqn = 1004,
  T0e = 1005,
  $m = 1006,
  CNe = 1007,
  A7 = 1008,
  bk = 1009,
  Cqn = 1010,
  Eqn = 1011,
  I_e = 1012,
  Djt = 1013,
  BP = 1014,
  Ck = 1015,
  hT = 1016,
  Ljt = 1017,
  Ojt = 1018,
  C_e = 1020,
  Tqn = 35902,
  Mqn = 35899,
  Pqn = 1021,
  Rqn = 1022,
  W1 = 1023,
  iD = 1026,
  pW = 1027,
  Bjt = 1028,
  Fjt = 1029,
  rde = 1030,
  zjt = 1031,
  Ujt = 1033,
  ENe = 33776,
  TNe = 33777,
  MNe = 33778,
  PNe = 33779,
  Fbt = 35840,
  zbt = 35841,
  Ubt = 35842,
  $bt = 35843,
  Gbt = 36196,
  Vbt = 37492,
  Hbt = 37496,
  Wbt = 37488,
  qbt = 37489,
  Kbt = 37490,
  Qbt = 37491,
  Ybt = 37808,
  Xbt = 37809,
  Jbt = 37810,
  Zbt = 37811,
  evt = 37812,
  tvt = 37813,
  nvt = 37814,
  rvt = 37815,
  avt = 37816,
  ivt = 37817,
  ovt = 37818,
  svt = 37819,
  lvt = 37820,
  cvt = 37821,
  dvt = 36492,
  uvt = 36494,
  hvt = 36495,
  pvt = 36283,
  mvt = 36284,
  fvt = 36285,
  gvt = 36286,
  $jt = 2200,
  Iie = 2201,
  K1a = 2202,
  E_e = 2300,
  T_e = 2301,
  Ynt = 2302,
  rZt = 2303,
  Sre = 2400,
  Ire = 2401,
  YFe = 2402,
  Gjt = 2500,
  Q1a = 2501,
  Y1a = 0,
  Nqn = 1,
  yvt = 2,
  X1a = 3200,
  VYe = 0,
  J1a = 1,
  $O = "",
  Nl = "srgb",
  l_ = "srgb-linear",
  XFe = "linear",
  Fh = "srgb",
  Tee = 7680,
  aZt = 519,
  Z1a = 512,
  ewa = 513,
  twa = 514,
  Vjt = 515,
  nwa = 516,
  rwa = 517,
  Hjt = 518,
  awa = 519,
  bvt = 35044,
  iZt = "300 es",
  AM = 2e3,
  M_e = 2001;

function iwa(e) {
  for (let t = e.length - 1; t >= 0; --t) if (e[t] >= 65535) return !0;
  return !1;
}

function owa(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}

function P_e(e) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", e);
}

function swa() {
  const e = P_e("canvas");
  return e.style.display = "block", e;
}

const oZt = {};

function JFe(...e) {
  const t = "THREE." + e.shift();
  console.log(t, ...e);
}

function jqn(e) {
  const t = e[0];
  if (typeof t == "string" && t.startsWith("TSL:")) {
    const n = e[1];
    n && n.isStackTrace ? e[0] += " " + n.getLocation() : e[1] = 'Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.';
  }
  return e;
}

function Es(...e) {
  e = jqn(e);
  const t = "THREE." + e.shift();
  {
    const n = e[0];
    n && n.isStackTrace ? console.warn(n.getError(t)) : console.warn(t, ...e);
  }
}

function vl(...e) {
  e = jqn(e);
  const t = "THREE." + e.shift();
  {
    const n = e[0];
    n && n.isStackTrace ? console.error(n.getError(t)) : console.error(t, ...e);
  }
}

function ZFe(...e) {
  const t = e.join(" ");
  t in oZt || (oZt[t] = !0, Es(...e));
}

function lwa(e, t, n) {
  return new Promise(function (r, a) {
    function i() {
      switch (e.clientWaitSync(t, e.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case e.WAIT_FAILED:
          a();
          break;
        case e.TIMEOUT_EXPIRED:
          setTimeout(i, n);
          break;
        default:
          r();
      }
    }
    setTimeout(i, n);
  });
}

const cwa = {
  [Rbt]: Nbt,
  [jbt]: Obt,
  [Dbt]: Bbt,
  [tde]: Lbt,
  [Nbt]: Rbt,
  [Obt]: jbt,
  [Bbt]: Dbt,
  [Lbt]: tde
};

class dG {
  addEventListener(t, n) {
    this._listeners === void 0 && (this._listeners = {});
    const r = this._listeners;
    r[t] === void 0 && (r[t] = []), r[t].indexOf(n) === -1 && r[t].push(n);
  }
  hasEventListener(t, n) {
    const r = this._listeners;
    return r === void 0 ? !1 : r[t] !== void 0 && r[t].indexOf(n) !== -1;
  }
  removeEventListener(t, n) {
    const r = this._listeners;
    if (r === void 0) return;
    const a = r[t];
    if (a !== void 0) {
      const i = a.indexOf(n);
      i !== -1 && a.splice(i, 1);
    }
  }
  dispatchEvent(t) {
    const n = this._listeners;
    if (n === void 0) return;
    const r = n[t.type];
    if (r !== void 0) {
      t.target = this;
      const a = r.slice(0);
      for (let i = 0, o = a.length; i < o; i++) a[i].call(this, t);
      t.target = null;
    }
  }
}

const Iw = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];

let sZt = 1234567;

const Lve = Math.PI / 180,
  ade = 180 / Math.PI;

function H5() {
  const e = Math.random() * 4294967295 | 0,
    t = Math.random() * 4294967295 | 0,
    n = Math.random() * 4294967295 | 0,
    r = Math.random() * 4294967295 | 0;
  return (Iw[e & 255] + Iw[e >> 8 & 255] + Iw[e >> 16 & 255] + Iw[e >> 24 & 255] + "-" + Iw[t & 255] + Iw[t >> 8 & 255] + "-" + Iw[t >> 16 & 15 | 64] + Iw[t >> 24 & 255] + "-" + Iw[n & 63 | 128] + Iw[n >> 8 & 255] + "-" + Iw[n >> 16 & 255] + Iw[n >> 24 & 255] + Iw[r & 255] + Iw[r >> 8 & 255] + Iw[r >> 16 & 255] + Iw[r >> 24 & 255]).toLowerCase();
}

function Dl(e, t, n) {
  return Math.max(t, Math.min(n, e));
}

function Wjt(e, t) {
  return (e % t + t) % t;
}

function dwa(e, t, n, r, a) {
  return r + (e - t) * (a - r) / (n - t);
}

function uwa(e, t, n) {
  return e !== t ? (n - e) / (t - e) : 0;
}

function Ove(e, t, n) {
  return (1 - n) * e + n * t;
}

function hwa(e, t, n, r) {
  return Ove(e, t, 1 - Math.exp(-n * r));
}

function pwa(e, t = 1) {
  return t - Math.abs(Wjt(e, t * 2) - t);
}

function mwa(e, t, n) {
  return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t), e * e * (3 - 2 * e));
}

function fwa(e, t, n) {
  return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t), e * e * e * (e * (e * 6 - 15) + 10));
}

function gwa(e, t) {
  return e + Math.floor(Math.random() * (t - e + 1));
}

function ywa(e, t) {
  return e + Math.random() * (t - e);
}

function bwa(e) {
  return e * (.5 - Math.random());
}

function vwa(e) {
  e !== void 0 && (sZt = e);
  let t = sZt += 1831565813;
  return t = Math.imul(t ^ t >>> 15, t | 1), t ^= t + Math.imul(t ^ t >>> 7, t | 61), ((t ^ t >>> 14) >>> 0) / 4294967296;
}

function wwa(e) {
  return e * Lve;
}

function xwa(e) {
  return e * ade;
}

function _wa(e) {
  return (e & e - 1) === 0 && e !== 0;
}

function kwa(e) {
  return Math.pow(2, Math.ceil(Math.log(e) / Math.LN2));
}

function Awa(e) {
  return Math.pow(2, Math.floor(Math.log(e) / Math.LN2));
}

function Swa(e, t, n, r, a) {
  const i = Math.cos,
    o = Math.sin,
    s = i(n / 2),
    l = o(n / 2),
    d = i((t + r) / 2),
    u = o((t + r) / 2),
    h = i((t - r) / 2),
    p = o((t - r) / 2),
    m = i((r - t) / 2),
    f = o((r - t) / 2);
  switch (a) {
    case "XYX":
      e.set(s * u, l * h, l * p, s * d);
      break;
    case "YZY":
      e.set(l * p, s * u, l * h, s * d);
      break;
    case "ZXZ":
      e.set(l * h, l * p, s * u, s * d);
      break;
    case "XZX":
      e.set(s * u, l * f, l * m, s * d);
      break;
    case "YXY":
      e.set(l * m, s * u, l * f, s * d);
      break;
    case "ZYZ":
      e.set(l * f, l * m, s * u, s * d);
      break;
    default:
      Es("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + a);
  }
}

function nE(e, t) {
  switch (t.constructor) {
    case Float32Array:
      return e;
    case Uint32Array:
      return e / 4294967295;
    case Uint16Array:
      return e / 65535;
    case Uint8Array:
      return e / 255;
    case Int32Array:
      return Math.max(e / 2147483647, -1);
    case Int16Array:
      return Math.max(e / 32767, -1);
    case Int8Array:
      return Math.max(e / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}

function $h(e, t) {
  switch (t.constructor) {
    case Float32Array:
      return e;
    case Uint32Array:
      return Math.round(e * 4294967295);
    case Uint16Array:
      return Math.round(e * 65535);
    case Uint8Array:
      return Math.round(e * 255);
    case Int32Array:
      return Math.round(e * 2147483647);
    case Int16Array:
      return Math.round(e * 32767);
    case Int8Array:
      return Math.round(e * 127);
    default:
      throw new Error("Invalid component type.");
  }
}

const Mo = {
  DEG2RAD: Lve,
  RAD2DEG: ade,
  generateUUID: H5,
  clamp: Dl,
  euclideanModulo: Wjt,
  mapLinear: dwa,
  inverseLerp: uwa,
  lerp: Ove,
  damp: hwa,
  pingpong: pwa,
  smoothstep: mwa,
  smootherstep: fwa,
  randInt: gwa,
  randFloat: ywa,
  randFloatSpread: bwa,
  seededRandom: vwa,
  degToRad: wwa,
  radToDeg: xwa,
  isPowerOfTwo: _wa,
  ceilPowerOfTwo: kwa,
  floorPowerOfTwo: Awa,
  setQuaternionFromProperEuler: Swa,
  normalize: $h,
  denormalize: nE
};

class Qi {
  constructor(t = 0, n = 0) {
    Qi.prototype.isVector2 = !0, this.x = t, this.y = n;
  }
  get width() {
    return this.x;
  }
  set width(t) {
    this.x = t;
  }
  get height() {
    return this.y;
  }
  set height(t) {
    this.y = t;
  }
  set(t, n) {
    return this.x = t, this.y = n, this;
  }
  setScalar(t) {
    return this.x = t, this.y = t, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setComponent(t, n) {
    switch (t) {
      case 0:
        this.x = n;
        break;
      case 1:
        this.y = n;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this;
  }
  add(t) {
    return this.x += t.x, this.y += t.y, this;
  }
  addScalar(t) {
    return this.x += t, this.y += t, this;
  }
  addVectors(t, n) {
    return this.x = t.x + n.x, this.y = t.y + n.y, this;
  }
  addScaledVector(t, n) {
    return this.x += t.x * n, this.y += t.y * n, this;
  }
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this;
  }
  subScalar(t) {
    return this.x -= t, this.y -= t, this;
  }
  subVectors(t, n) {
    return this.x = t.x - n.x, this.y = t.y - n.y, this;
  }
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this;
  }
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this;
  }
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  applyMatrix3(t) {
    const n = this.x,
      r = this.y,
      a = t.elements;
    return this.x = a[0] * n + a[3] * r + a[6], this.y = a[1] * n + a[4] * r + a[7], this;
  }
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this;
  }
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this;
  }
  clamp(t, n) {
    return this.x = Dl(this.x, t.x, n.x), this.y = Dl(this.y, t.y, n.y), this;
  }
  clampScalar(t, n) {
    return this.x = Dl(this.x, t, n), this.y = Dl(this.y, t, n), this;
  }
  clampLength(t, n) {
    const r = this.length();
    return this.divideScalar(r || 1).multiplyScalar(Dl(r, t, n));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y;
  }
  cross(t) {
    return this.x * t.y - this.y * t.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(t) {
    const n = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (n === 0) return Math.PI / 2;
    const r = this.dot(t) / n;
    return Math.acos(Dl(r, -1, 1));
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  distanceToSquared(t) {
    const n = this.x - t.x,
      r = this.y - t.y;
    return n * n + r * r;
  }
  manhattanDistanceTo(t) {
    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, n) {
    return this.x += (t.x - this.x) * n, this.y += (t.y - this.y) * n, this;
  }
  lerpVectors(t, n, r) {
    return this.x = t.x + (n.x - t.x) * r, this.y = t.y + (n.y - t.y) * r, this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y;
  }
  fromArray(t, n = 0) {
    return this.x = t[n], this.y = t[n + 1], this;
  }
  toArray(t = [], n = 0) {
    return t[n] = this.x, t[n + 1] = this.y, t;
  }
  fromBufferAttribute(t, n) {
    return this.x = t.getX(n), this.y = t.getY(n), this;
  }
  rotateAround(t, n) {
    const r = Math.cos(n),
      a = Math.sin(n),
      i = this.x - t.x,
      o = this.y - t.y;
    return this.x = i * r - o * a + t.x, this.y = i * a + o * r + t.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}

class hl {
  constructor(t = 0, n = 0, r = 0, a = 1) {
    this.isQuaternion = !0, this._x = t, this._y = n, this._z = r, this._w = a;
  }
  static slerpFlat(t, n, r, a, i, o, s) {
    let l = r[a + 0],
      d = r[a + 1],
      u = r[a + 2],
      h = r[a + 3],
      p = i[o + 0],
      m = i[o + 1],
      f = i[o + 2],
      y = i[o + 3];
    if (h !== y || l !== p || d !== m || u !== f) {
      let b = l * p + d * m + u * f + h * y;
      b < 0 && (p = -p, m = -m, f = -f, y = -y, b = -b);
      let v = 1 - s;
      if (b < .9995) {
        const _ = Math.acos(b),
          w = Math.sin(_);
        v = Math.sin(v * _) / w, s = Math.sin(s * _) / w, l = l * v + p * s, d = d * v + m * s, u = u * v + f * s, h = h * v + y * s;
      } else {
        l = l * v + p * s, d = d * v + m * s, u = u * v + f * s, h = h * v + y * s;
        const _ = 1 / Math.sqrt(l * l + d * d + u * u + h * h);
        l *= _, d *= _, u *= _, h *= _;
      }
    }
    t[n] = l, t[n + 1] = d, t[n + 2] = u, t[n + 3] = h;
  }
  static multiplyQuaternionsFlat(t, n, r, a, i, o) {
    const s = r[a],
      l = r[a + 1],
      d = r[a + 2],
      u = r[a + 3],
      h = i[o],
      p = i[o + 1],
      m = i[o + 2],
      f = i[o + 3];
    return t[n] = s * f + u * h + l * m - d * p, t[n + 1] = l * f + u * p + d * h - s * m, t[n + 2] = d * f + u * m + s * p - l * h, t[n + 3] = u * f - s * h - l * p - d * m, t;
  }
  get x() {
    return this._x;
  }
  set x(t) {
    this._x = t, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(t) {
    this._y = t, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(t) {
    this._z = t, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(t) {
    this._w = t, this._onChangeCallback();
  }
  set(t, n, r, a) {
    return this._x = t, this._y = n, this._z = r, this._w = a, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(t) {
    return this._x = t.x, this._y = t.y, this._z = t.z, this._w = t.w, this._onChangeCallback(), this;
  }
  setFromEuler(t, n = !0) {
    const r = t._x,
      a = t._y,
      i = t._z,
      o = t._order,
      s = Math.cos,
      l = Math.sin,
      d = s(r / 2),
      u = s(a / 2),
      h = s(i / 2),
      p = l(r / 2),
      m = l(a / 2),
      f = l(i / 2);
    switch (o) {
      case "XYZ":
        this._x = p * u * h + d * m * f, this._y = d * m * h - p * u * f, this._z = d * u * f + p * m * h, this._w = d * u * h - p * m * f;
        break;
      case "YXZ":
        this._x = p * u * h + d * m * f, this._y = d * m * h - p * u * f, this._z = d * u * f - p * m * h, this._w = d * u * h + p * m * f;
        break;
      case "ZXY":
        this._x = p * u * h - d * m * f, this._y = d * m * h + p * u * f, this._z = d * u * f + p * m * h, this._w = d * u * h - p * m * f;
        break;
      case "ZYX":
        this._x = p * u * h - d * m * f, this._y = d * m * h + p * u * f, this._z = d * u * f - p * m * h, this._w = d * u * h + p * m * f;
        break;
      case "YZX":
        this._x = p * u * h + d * m * f, this._y = d * m * h + p * u * f, this._z = d * u * f - p * m * h, this._w = d * u * h - p * m * f;
        break;
      case "XZY":
        this._x = p * u * h - d * m * f, this._y = d * m * h - p * u * f, this._z = d * u * f + p * m * h, this._w = d * u * h + p * m * f;
        break;
      default:
        Es("Quaternion: .setFromEuler() encountered an unknown order: " + o);
    }
    return n === !0 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(t, n) {
    const r = n / 2,
      a = Math.sin(r);
    return this._x = t.x * a, this._y = t.y * a, this._z = t.z * a, this._w = Math.cos(r), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(t) {
    const n = t.elements,
      r = n[0],
      a = n[4],
      i = n[8],
      o = n[1],
      s = n[5],
      l = n[9],
      d = n[2],
      u = n[6],
      h = n[10],
      p = r + s + h;
    if (p > 0) {
      const m = .5 / Math.sqrt(p + 1);
      this._w = .25 / m, this._x = (u - l) * m, this._y = (i - d) * m, this._z = (o - a) * m;
    } else if (r > s && r > h) {
      const m = 2 * Math.sqrt(1 + r - s - h);
      this._w = (u - l) / m, this._x = .25 * m, this._y = (a + o) / m, this._z = (i + d) / m;
    } else if (s > h) {
      const m = 2 * Math.sqrt(1 + s - r - h);
      this._w = (i - d) / m, this._x = (a + o) / m, this._y = .25 * m, this._z = (l + u) / m;
    } else {
      const m = 2 * Math.sqrt(1 + h - r - s);
      this._w = (o - a) / m, this._x = (i + d) / m, this._y = (l + u) / m, this._z = .25 * m;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(t, n) {
    let r = t.dot(n) + 1;
    return r < 1e-8 ? (r = 0, Math.abs(t.x) > Math.abs(t.z) ? (this._x = -t.y, this._y = t.x, this._z = 0, this._w = r) : (this._x = 0, this._y = -t.z, this._z = t.y, this._w = r)) : (this._x = t.y * n.z - t.z * n.y, this._y = t.z * n.x - t.x * n.z, this._z = t.x * n.y - t.y * n.x, this._w = r), this.normalize();
  }
  angleTo(t) {
    return 2 * Math.acos(Math.abs(Dl(this.dot(t), -1, 1)));
  }
  rotateTowards(t, n) {
    const r = this.angleTo(t);
    if (r === 0) return this;
    const a = Math.min(1, n / r);
    return this.slerp(t, a), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  dot(t) {
    return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let t = this.length();
    return t === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (t = 1 / t, this._x = this._x * t, this._y = this._y * t, this._z = this._z * t, this._w = this._w * t), this._onChangeCallback(), this;
  }
  multiply(t) {
    return this.multiplyQuaternions(this, t);
  }
  premultiply(t) {
    return this.multiplyQuaternions(t, this);
  }
  multiplyQuaternions(t, n) {
    const r = t._x,
      a = t._y,
      i = t._z,
      o = t._w,
      s = n._x,
      l = n._y,
      d = n._z,
      u = n._w;
    return this._x = r * u + o * s + a * d - i * l, this._y = a * u + o * l + i * s - r * d, this._z = i * u + o * d + r * l - a * s, this._w = o * u - r * s - a * l - i * d, this._onChangeCallback(), this;
  }
  slerp(t, n) {
    let r = t._x,
      a = t._y,
      i = t._z,
      o = t._w,
      s = this.dot(t);
    s < 0 && (r = -r, a = -a, i = -i, o = -o, s = -s);
    let l = 1 - n;
    if (s < .9995) {
      const d = Math.acos(s),
        u = Math.sin(d);
      l = Math.sin(l * d) / u, n = Math.sin(n * d) / u, this._x = this._x * l + r * n, this._y = this._y * l + a * n, this._z = this._z * l + i * n, this._w = this._w * l + o * n, this._onChangeCallback();
    } else this._x = this._x * l + r * n, this._y = this._y * l + a * n, this._z = this._z * l + i * n, this._w = this._w * l + o * n, this.normalize();
    return this;
  }
  slerpQuaternions(t, n, r) {
    return this.copy(t).slerp(n, r);
  }
  random() {
    const t = 2 * Math.PI * Math.random(),
      n = 2 * Math.PI * Math.random(),
      r = Math.random(),
      a = Math.sqrt(1 - r),
      i = Math.sqrt(r);
    return this.set(a * Math.sin(t), a * Math.cos(t), i * Math.sin(n), i * Math.cos(n));
  }
  equals(t) {
    return t._x === this._x && t._y === this._y && t._z === this._z && t._w === this._w;
  }
  fromArray(t, n = 0) {
    return this._x = t[n], this._y = t[n + 1], this._z = t[n + 2], this._w = t[n + 3], this._onChangeCallback(), this;
  }
  toArray(t = [], n = 0) {
    return t[n] = this._x, t[n + 1] = this._y, t[n + 2] = this._z, t[n + 3] = this._w, t;
  }
  fromBufferAttribute(t, n) {
    return this._x = t.getX(n), this._y = t.getY(n), this._z = t.getZ(n), this._w = t.getW(n), this._onChangeCallback(), this;
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(t) {
    return this._onChangeCallback = t, this;
  }
  _onChangeCallback() {}
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}

class dr {
  constructor(t = 0, n = 0, r = 0) {
    dr.prototype.isVector3 = !0, this.x = t, this.y = n, this.z = r;
  }
  set(t, n, r) {
    return r === void 0 && (r = this.z), this.x = t, this.y = n, this.z = r, this;
  }
  setScalar(t) {
    return this.x = t, this.y = t, this.z = t, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setZ(t) {
    return this.z = t, this;
  }
  setComponent(t, n) {
    switch (t) {
      case 0:
        this.x = n;
        break;
      case 1:
        this.y = n;
        break;
      case 2:
        this.z = n;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this.z = t.z, this;
  }
  add(t) {
    return this.x += t.x, this.y += t.y, this.z += t.z, this;
  }
  addScalar(t) {
    return this.x += t, this.y += t, this.z += t, this;
  }
  addVectors(t, n) {
    return this.x = t.x + n.x, this.y = t.y + n.y, this.z = t.z + n.z, this;
  }
  addScaledVector(t, n) {
    return this.x += t.x * n, this.y += t.y * n, this.z += t.z * n, this;
  }
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this.z -= t.z, this;
  }
  subScalar(t) {
    return this.x -= t, this.y -= t, this.z -= t, this;
  }
  subVectors(t, n) {
    return this.x = t.x - n.x, this.y = t.y - n.y, this.z = t.z - n.z, this;
  }
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this.z *= t.z, this;
  }
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this.z *= t, this;
  }
  multiplyVectors(t, n) {
    return this.x = t.x * n.x, this.y = t.y * n.y, this.z = t.z * n.z, this;
  }
  applyEuler(t) {
    return this.applyQuaternion(lZt.setFromEuler(t));
  }
  applyAxisAngle(t, n) {
    return this.applyQuaternion(lZt.setFromAxisAngle(t, n));
  }
  applyMatrix3(t) {
    const n = this.x,
      r = this.y,
      a = this.z,
      i = t.elements;
    return this.x = i[0] * n + i[3] * r + i[6] * a, this.y = i[1] * n + i[4] * r + i[7] * a, this.z = i[2] * n + i[5] * r + i[8] * a, this;
  }
  applyNormalMatrix(t) {
    return this.applyMatrix3(t).normalize();
  }
  applyMatrix4(t) {
    const n = this.x,
      r = this.y,
      a = this.z,
      i = t.elements,
      o = 1 / (i[3] * n + i[7] * r + i[11] * a + i[15]);
    return this.x = (i[0] * n + i[4] * r + i[8] * a + i[12]) * o, this.y = (i[1] * n + i[5] * r + i[9] * a + i[13]) * o, this.z = (i[2] * n + i[6] * r + i[10] * a + i[14]) * o, this;
  }
  applyQuaternion(t) {
    const n = this.x,
      r = this.y,
      a = this.z,
      i = t.x,
      o = t.y,
      s = t.z,
      l = t.w,
      d = 2 * (o * a - s * r),
      u = 2 * (s * n - i * a),
      h = 2 * (i * r - o * n);
    return this.x = n + l * d + o * h - s * u, this.y = r + l * u + s * d - i * h, this.z = a + l * h + i * u - o * d, this;
  }
  project(t) {
    return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix);
  }
  unproject(t) {
    return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld);
  }
  transformDirection(t) {
    const n = this.x,
      r = this.y,
      a = this.z,
      i = t.elements;
    return this.x = i[0] * n + i[4] * r + i[8] * a, this.y = i[1] * n + i[5] * r + i[9] * a, this.z = i[2] * n + i[6] * r + i[10] * a, this.normalize();
  }
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this.z /= t.z, this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this;
  }
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this;
  }
  clamp(t, n) {
    return this.x = Dl(this.x, t.x, n.x), this.y = Dl(this.y, t.y, n.y), this.z = Dl(this.z, t.z, n.z), this;
  }
  clampScalar(t, n) {
    return this.x = Dl(this.x, t, n), this.y = Dl(this.y, t, n), this.z = Dl(this.z, t, n), this;
  }
  clampLength(t, n) {
    const r = this.length();
    return this.divideScalar(r || 1).multiplyScalar(Dl(r, t, n));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, n) {
    return this.x += (t.x - this.x) * n, this.y += (t.y - this.y) * n, this.z += (t.z - this.z) * n, this;
  }
  lerpVectors(t, n, r) {
    return this.x = t.x + (n.x - t.x) * r, this.y = t.y + (n.y - t.y) * r, this.z = t.z + (n.z - t.z) * r, this;
  }
  cross(t) {
    return this.crossVectors(this, t);
  }
  crossVectors(t, n) {
    const r = t.x,
      a = t.y,
      i = t.z,
      o = n.x,
      s = n.y,
      l = n.z;
    return this.x = a * l - i * s, this.y = i * o - r * l, this.z = r * s - a * o, this;
  }
  projectOnVector(t) {
    const n = t.lengthSq();
    if (n === 0) return this.set(0, 0, 0);
    const r = t.dot(this) / n;
    return this.copy(t).multiplyScalar(r);
  }
  projectOnPlane(t) {
    return Xnt.copy(this).projectOnVector(t), this.sub(Xnt);
  }
  reflect(t) {
    return this.sub(Xnt.copy(t).multiplyScalar(2 * this.dot(t)));
  }
  angleTo(t) {
    const n = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (n === 0) return Math.PI / 2;
    const r = this.dot(t) / n;
    return Math.acos(Dl(r, -1, 1));
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  distanceToSquared(t) {
    const n = this.x - t.x,
      r = this.y - t.y,
      a = this.z - t.z;
    return n * n + r * r + a * a;
  }
  manhattanDistanceTo(t) {
    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z);
  }
  setFromSpherical(t) {
    return this.setFromSphericalCoords(t.radius, t.phi, t.theta);
  }
  setFromSphericalCoords(t, n, r) {
    const a = Math.sin(n) * t;
    return this.x = a * Math.sin(r), this.y = Math.cos(n) * t, this.z = a * Math.cos(r), this;
  }
  setFromCylindrical(t) {
    return this.setFromCylindricalCoords(t.radius, t.theta, t.y);
  }
  setFromCylindricalCoords(t, n, r) {
    return this.x = t * Math.sin(n), this.y = r, this.z = t * Math.cos(n), this;
  }
  setFromMatrixPosition(t) {
    const n = t.elements;
    return this.x = n[12], this.y = n[13], this.z = n[14], this;
  }
  setFromMatrixScale(t) {
    const n = this.setFromMatrixColumn(t, 0).length(),
      r = this.setFromMatrixColumn(t, 1).length(),
      a = this.setFromMatrixColumn(t, 2).length();
    return this.x = n, this.y = r, this.z = a, this;
  }
  setFromMatrixColumn(t, n) {
    return this.fromArray(t.elements, n * 4);
  }
  setFromMatrix3Column(t, n) {
    return this.fromArray(t.elements, n * 3);
  }
  setFromEuler(t) {
    return this.x = t._x, this.y = t._y, this.z = t._z, this;
  }
  setFromColor(t) {
    return this.x = t.r, this.y = t.g, this.z = t.b, this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z;
  }
  fromArray(t, n = 0) {
    return this.x = t[n], this.y = t[n + 1], this.z = t[n + 2], this;
  }
  toArray(t = [], n = 0) {
    return t[n] = this.x, t[n + 1] = this.y, t[n + 2] = this.z, t;
  }
  fromBufferAttribute(t, n) {
    return this.x = t.getX(n), this.y = t.getY(n), this.z = t.getZ(n), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    const t = Math.random() * Math.PI * 2,
      n = Math.random() * 2 - 1,
      r = Math.sqrt(1 - n * n);
    return this.x = r * Math.cos(t), this.y = n, this.z = r * Math.sin(t), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}

const Xnt = new dr(),
  lZt = new hl();

class Tc {
  constructor(t, n, r, a, i, o, s, l, d) {
    Tc.prototype.isMatrix3 = !0, this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1], t !== void 0 && this.set(t, n, r, a, i, o, s, l, d);
  }
  set(t, n, r, a, i, o, s, l, d) {
    const u = this.elements;
    return u[0] = t, u[1] = a, u[2] = s, u[3] = n, u[4] = i, u[5] = l, u[6] = r, u[7] = o, u[8] = d, this;
  }
  identity() {
    return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
  }
  copy(t) {
    const n = this.elements,
      r = t.elements;
    return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[4] = r[4], n[5] = r[5], n[6] = r[6], n[7] = r[7], n[8] = r[8], this;
  }
  extractBasis(t, n, r) {
    return t.setFromMatrix3Column(this, 0), n.setFromMatrix3Column(this, 1), r.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(t) {
    const n = t.elements;
    return this.set(n[0], n[4], n[8], n[1], n[5], n[9], n[2], n[6], n[10]), this;
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, n) {
    const r = t.elements,
      a = n.elements,
      i = this.elements,
      o = r[0],
      s = r[3],
      l = r[6],
      d = r[1],
      u = r[4],
      h = r[7],
      p = r[2],
      m = r[5],
      f = r[8],
      y = a[0],
      b = a[3],
      v = a[6],
      _ = a[1],
      w = a[4],
      k = a[7],
      A = a[2],
      S = a[5],
      C = a[8];
    return i[0] = o * y + s * _ + l * A, i[3] = o * b + s * w + l * S, i[6] = o * v + s * k + l * C, i[1] = d * y + u * _ + h * A, i[4] = d * b + u * w + h * S, i[7] = d * v + u * k + h * C, i[2] = p * y + m * _ + f * A, i[5] = p * b + m * w + f * S, i[8] = p * v + m * k + f * C, this;
  }
  multiplyScalar(t) {
    const n = this.elements;
    return n[0] *= t, n[3] *= t, n[6] *= t, n[1] *= t, n[4] *= t, n[7] *= t, n[2] *= t, n[5] *= t, n[8] *= t, this;
  }
  determinant() {
    const t = this.elements,
      n = t[0],
      r = t[1],
      a = t[2],
      i = t[3],
      o = t[4],
      s = t[5],
      l = t[6],
      d = t[7],
      u = t[8];
    return n * o * u - n * s * d - r * i * u + r * s * l + a * i * d - a * o * l;
  }
  invert() {
    const t = this.elements,
      n = t[0],
      r = t[1],
      a = t[2],
      i = t[3],
      o = t[4],
      s = t[5],
      l = t[6],
      d = t[7],
      u = t[8],
      h = u * o - s * d,
      p = s * l - u * i,
      m = d * i - o * l,
      f = n * h + r * p + a * m;
    if (f === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const y = 1 / f;
    return t[0] = h * y, t[1] = (a * d - u * r) * y, t[2] = (s * r - a * o) * y, t[3] = p * y, t[4] = (u * n - a * l) * y, t[5] = (a * i - s * n) * y, t[6] = m * y, t[7] = (r * l - d * n) * y, t[8] = (o * n - r * i) * y, this;
  }
  transpose() {
    let t;
    const n = this.elements;
    return t = n[1], n[1] = n[3], n[3] = t, t = n[2], n[2] = n[6], n[6] = t, t = n[5], n[5] = n[7], n[7] = t, this;
  }
  getNormalMatrix(t) {
    return this.setFromMatrix4(t).invert().transpose();
  }
  transposeIntoArray(t) {
    const n = this.elements;
    return t[0] = n[0], t[1] = n[3], t[2] = n[6], t[3] = n[1], t[4] = n[4], t[5] = n[7], t[6] = n[2], t[7] = n[5], t[8] = n[8], this;
  }
  setUvTransform(t, n, r, a, i, o, s) {
    const l = Math.cos(i),
      d = Math.sin(i);
    return this.set(r * l, r * d, -r * (l * o + d * s) + o + t, -a * d, a * l, -a * (-d * o + l * s) + s + n, 0, 0, 1), this;
  }
  scale(t, n) {
    return this.premultiply(Jnt.makeScale(t, n)), this;
  }
  rotate(t) {
    return this.premultiply(Jnt.makeRotation(-t)), this;
  }
  translate(t, n) {
    return this.premultiply(Jnt.makeTranslation(t, n)), this;
  }
  makeTranslation(t, n) {
    return t.isVector2 ? this.set(1, 0, t.x, 0, 1, t.y, 0, 0, 1) : this.set(1, 0, t, 0, 1, n, 0, 0, 1), this;
  }
  makeRotation(t) {
    const n = Math.cos(t),
      r = Math.sin(t);
    return this.set(n, -r, 0, r, n, 0, 0, 0, 1), this;
  }
  makeScale(t, n) {
    return this.set(t, 0, 0, 0, n, 0, 0, 0, 1), this;
  }
  equals(t) {
    const n = this.elements,
      r = t.elements;
    for (let a = 0; a < 9; a++) if (n[a] !== r[a]) return !1;
    return !0;
  }
  fromArray(t, n = 0) {
    for (let r = 0; r < 9; r++) this.elements[r] = t[r + n];
    return this;
  }
  toArray(t = [], n = 0) {
    const r = this.elements;
    return t[n] = r[0], t[n + 1] = r[1], t[n + 2] = r[2], t[n + 3] = r[3], t[n + 4] = r[4], t[n + 5] = r[5], t[n + 6] = r[6], t[n + 7] = r[7], t[n + 8] = r[8], t;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}

const Jnt = new Tc(),
  cZt = new Tc().set(.4123908, .3575843, .1804808, .212639, .7151687, .0721923, .0193308, .1191948, .9505322),
  dZt = new Tc().set(3.2409699, -1.5373832, -.4986108, -.9692436, 1.8759675, .0415551, .0556301, -.203977, 1.0569715);

function Iwa() {
  const e = {
      enabled: !0,
      workingColorSpace: l_,
      spaces: {},
      convert: function (a, i, o) {
        return this.enabled === !1 || i === o || !i || !o || (this.spaces[i].transfer === Fh && (a.r = rj(a.r), a.g = rj(a.g), a.b = rj(a.b)), this.spaces[i].primaries !== this.spaces[o].primaries && (a.applyMatrix3(this.spaces[i].toXYZ), a.applyMatrix3(this.spaces[o].fromXYZ)), this.spaces[o].transfer === Fh && (a.r = Cie(a.r), a.g = Cie(a.g), a.b = Cie(a.b))), a;
      },
      workingToColorSpace: function (a, i) {
        return this.convert(a, this.workingColorSpace, i);
      },
      colorSpaceToWorking: function (a, i) {
        return this.convert(a, i, this.workingColorSpace);
      },
      getPrimaries: function (a) {
        return this.spaces[a].primaries;
      },
      getTransfer: function (a) {
        return a === $O ? XFe : this.spaces[a].transfer;
      },
      getToneMappingMode: function (a) {
        return this.spaces[a].outputColorSpaceConfig.toneMappingMode || "standard";
      },
      getLuminanceCoefficients: function (a, i = this.workingColorSpace) {
        return a.fromArray(this.spaces[i].luminanceCoefficients);
      },
      define: function (a) {
        Object.assign(this.spaces, a);
      },
      _getMatrix: function (a, i, o) {
        return a.copy(this.spaces[i].toXYZ).multiply(this.spaces[o].fromXYZ);
      },
      _getDrawingBufferColorSpace: function (a) {
        return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace;
      },
      _getUnpackColorSpace: function (a = this.workingColorSpace) {
        return this.spaces[a].workingColorSpaceConfig.unpackColorSpace;
      },
      fromWorkingColorSpace: function (a, i) {
        return ZFe("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."), e.workingToColorSpace(a, i);
      },
      toWorkingColorSpace: function (a, i) {
        return ZFe("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."), e.colorSpaceToWorking(a, i);
      }
    },
    t = [.64, .33, .3, .6, .15, .06],
    n = [.2126, .7152, .0722],
    r = [.3127, .329];
  return e.define({
    [l_]: {
      primaries: t,
      whitePoint: r,
      transfer: XFe,
      toXYZ: cZt,
      fromXYZ: dZt,
      luminanceCoefficients: n,
      workingColorSpaceConfig: {
        unpackColorSpace: Nl
      },
      outputColorSpaceConfig: {
        drawingBufferColorSpace: Nl
      }
    },
    [Nl]: {
      primaries: t,
      whitePoint: r,
      transfer: Fh,
      toXYZ: cZt,
      fromXYZ: dZt,
      luminanceCoefficients: n,
      outputColorSpaceConfig: {
        drawingBufferColorSpace: Nl
      }
    }
  }), e;
}

const vc = Iwa();

function rj(e) {
  return e < .04045 ? e * .0773993808 : Math.pow(e * .9478672986 + .0521327014, 2.4);
}

function Cie(e) {
  return e < .0031308 ? e * 12.92 : 1.055 * Math.pow(e, .41666) - .055;
}

let Mee;

class Cwa {
  static getDataURL(t, n = "image/png") {
    if (/^data:/i.test(t.src) || typeof HTMLCanvasElement > "u") return t.src;
    let r;
    if (t instanceof HTMLCanvasElement) r = t;else {
      Mee === void 0 && (Mee = P_e("canvas")), Mee.width = t.width, Mee.height = t.height;
      const a = Mee.getContext("2d");
      t instanceof ImageData ? a.putImageData(t, 0, 0) : a.drawImage(t, 0, 0, t.width, t.height), r = Mee;
    }
    return r.toDataURL(n);
  }
  static sRGBToLinear(t) {
    if (typeof HTMLImageElement < "u" && t instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && t instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && t instanceof ImageBitmap) {
      const n = P_e("canvas");
      n.width = t.width, n.height = t.height;
      const r = n.getContext("2d");
      r.drawImage(t, 0, 0, t.width, t.height);
      const a = r.getImageData(0, 0, t.width, t.height),
        i = a.data;
      for (let o = 0; o < i.length; o++) i[o] = rj(i[o] / 255) * 255;
      return r.putImageData(a, 0, 0), n;
    } else if (t.data) {
      const n = t.data.slice(0);
      for (let r = 0; r < n.length; r++) n instanceof Uint8Array || n instanceof Uint8ClampedArray ? n[r] = Math.floor(rj(n[r] / 255) * 255) : n[r] = rj(n[r]);
      return {
        data: n,
        width: t.width,
        height: t.height
      };
    } else return Es("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), t;
  }
}

let Ewa = 0;

class qjt {
  constructor(t = null) {
    this.isSource = !0, Object.defineProperty(this, "id", {
      value: Ewa++
    }), this.uuid = H5(), this.data = t, this.dataReady = !0, this.version = 0;
  }
  getSize(t) {
    const n = this.data;
    return typeof HTMLVideoElement < "u" && n instanceof HTMLVideoElement ? t.set(n.videoWidth, n.videoHeight, 0) : typeof VideoFrame < "u" && n instanceof VideoFrame ? t.set(n.displayHeight, n.displayWidth, 0) : n !== null ? t.set(n.width, n.height, n.depth || 0) : t.set(0, 0, 0), t;
  }
  set needsUpdate(t) {
    t === !0 && this.version++;
  }
  toJSON(t) {
    const n = t === void 0 || typeof t == "string";
    if (!n && t.images[this.uuid] !== void 0) return t.images[this.uuid];
    const r = {
        uuid: this.uuid,
        url: ""
      },
      a = this.data;
    if (a !== null) {
      let i;
      if (Array.isArray(a)) {
        i = [];
        for (let o = 0, s = a.length; o < s; o++) a[o].isDataTexture ? i.push(Znt(a[o].image)) : i.push(Znt(a[o]));
      } else i = Znt(a);
      r.url = i;
    }
    return n || (t.images[this.uuid] = r), r;
  }
}

function Znt(e) {
  return typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap ? Cwa.getDataURL(e) : e.data ? {
    data: Array.from(e.data),
    width: e.width,
    height: e.height,
    type: e.data.constructor.name
  } : (Es("Texture: Unable to serialize Texture."), {});
}

let Twa = 0;

const ert = new dr();

class N0 extends dG {
  constructor(t = N0.DEFAULT_IMAGE, n = N0.DEFAULT_MAPPING, r = hy, a = hy, i = $m, o = A7, s = W1, l = bk, d = N0.DEFAULT_ANISOTROPY, u = $O) {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", {
      value: Twa++
    }), this.uuid = H5(), this.name = "", this.source = new qjt(t), this.mipmaps = [], this.mapping = n, this.channel = 0, this.wrapS = r, this.wrapT = a, this.magFilter = i, this.minFilter = o, this.anisotropy = d, this.format = s, this.internalFormat = null, this.type = l, this.offset = new Qi(0, 0), this.repeat = new Qi(1, 1), this.center = new Qi(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Tc(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = u, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = !1, this.isArrayTexture = !!(t && t.depth && t.depth > 1), this.pmremVersion = 0;
  }
  get width() {
    return this.source.getSize(ert).x;
  }
  get height() {
    return this.source.getSize(ert).y;
  }
  get depth() {
    return this.source.getSize(ert).z;
  }
  get image() {
    return this.source.data;
  }
  set image(t = null) {
    this.source.data = t;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  addUpdateRange(t, n) {
    this.updateRanges.push({
      start: t,
      count: n
    });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.name = t.name, this.source = t.source, this.mipmaps = t.mipmaps.slice(0), this.mapping = t.mapping, this.channel = t.channel, this.wrapS = t.wrapS, this.wrapT = t.wrapT, this.magFilter = t.magFilter, this.minFilter = t.minFilter, this.anisotropy = t.anisotropy, this.format = t.format, this.internalFormat = t.internalFormat, this.type = t.type, this.offset.copy(t.offset), this.repeat.copy(t.repeat), this.center.copy(t.center), this.rotation = t.rotation, this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrix.copy(t.matrix), this.generateMipmaps = t.generateMipmaps, this.premultiplyAlpha = t.premultiplyAlpha, this.flipY = t.flipY, this.unpackAlignment = t.unpackAlignment, this.colorSpace = t.colorSpace, this.renderTarget = t.renderTarget, this.isRenderTargetTexture = t.isRenderTargetTexture, this.isArrayTexture = t.isArrayTexture, this.userData = JSON.parse(JSON.stringify(t.userData)), this.needsUpdate = !0, this;
  }
  setValues(t) {
    for (const n in t) {
      const r = t[n];
      if (r === void 0) {
        Es(`Texture.setValues(): parameter '${n}' has value of undefined.`);
        continue;
      }
      const a = this[n];
      if (a === void 0) {
        Es(`Texture.setValues(): property '${n}' does not exist.`);
        continue;
      }
      a && r && a.isVector2 && r.isVector2 || a && r && a.isVector3 && r.isVector3 || a && r && a.isMatrix3 && r.isMatrix3 ? a.copy(r) : this[n] = r;
    }
  }
  toJSON(t) {
    const n = t === void 0 || typeof t == "string";
    if (!n && t.textures[this.uuid] !== void 0) return t.textures[this.uuid];
    const r = {
      metadata: {
        version: 4.7,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(t).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (r.userData = this.userData), n || (t.textures[this.uuid] = r), r;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
  transformUv(t) {
    if (this.mapping !== Are) return t;
    if (t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1) switch (this.wrapS) {
      case e$:
        t.x = t.x - Math.floor(t.x);
        break;
      case hy:
        t.x = t.x < 0 ? 0 : 1;
        break;
      case QFe:
        Math.abs(Math.floor(t.x) % 2) === 1 ? t.x = Math.ceil(t.x) - t.x : t.x = t.x - Math.floor(t.x);
        break;
    }
    if (t.y < 0 || t.y > 1) switch (this.wrapT) {
      case e$:
        t.y = t.y - Math.floor(t.y);
        break;
      case hy:
        t.y = t.y < 0 ? 0 : 1;
        break;
      case QFe:
        Math.abs(Math.floor(t.y) % 2) === 1 ? t.y = Math.ceil(t.y) - t.y : t.y = t.y - Math.floor(t.y);
        break;
    }
    return this.flipY && (t.y = 1 - t.y), t;
  }
  set needsUpdate(t) {
    t === !0 && (this.version++, this.source.needsUpdate = !0);
  }
  set needsPMREMUpdate(t) {
    t === !0 && this.pmremVersion++;
  }
}

N0.DEFAULT_IMAGE = null;

N0.DEFAULT_MAPPING = Are;

N0.DEFAULT_ANISOTROPY = 1;

class Vd {
  constructor(t = 0, n = 0, r = 0, a = 1) {
    Vd.prototype.isVector4 = !0, this.x = t, this.y = n, this.z = r, this.w = a;
  }
  get width() {
    return this.z;
  }
  set width(t) {
    this.z = t;
  }
  get height() {
    return this.w;
  }
  set height(t) {
    this.w = t;
  }
  set(t, n, r, a) {
    return this.x = t, this.y = n, this.z = r, this.w = a, this;
  }
  setScalar(t) {
    return this.x = t, this.y = t, this.z = t, this.w = t, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setZ(t) {
    return this.z = t, this;
  }
  setW(t) {
    return this.w = t, this;
  }
  setComponent(t, n) {
    switch (t) {
      case 0:
        this.x = n;
        break;
      case 1:
        this.y = n;
        break;
      case 2:
        this.z = n;
        break;
      case 3:
        this.w = n;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this.z = t.z, this.w = t.w !== void 0 ? t.w : 1, this;
  }
  add(t) {
    return this.x += t.x, this.y += t.y, this.z += t.z, this.w += t.w, this;
  }
  addScalar(t) {
    return this.x += t, this.y += t, this.z += t, this.w += t, this;
  }
  addVectors(t, n) {
    return this.x = t.x + n.x, this.y = t.y + n.y, this.z = t.z + n.z, this.w = t.w + n.w, this;
  }
  addScaledVector(t, n) {
    return this.x += t.x * n, this.y += t.y * n, this.z += t.z * n, this.w += t.w * n, this;
  }
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this.z -= t.z, this.w -= t.w, this;
  }
  subScalar(t) {
    return this.x -= t, this.y -= t, this.z -= t, this.w -= t, this;
  }
  subVectors(t, n) {
    return this.x = t.x - n.x, this.y = t.y - n.y, this.z = t.z - n.z, this.w = t.w - n.w, this;
  }
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this.z *= t.z, this.w *= t.w, this;
  }
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this.z *= t, this.w *= t, this;
  }
  applyMatrix4(t) {
    const n = this.x,
      r = this.y,
      a = this.z,
      i = this.w,
      o = t.elements;
    return this.x = o[0] * n + o[4] * r + o[8] * a + o[12] * i, this.y = o[1] * n + o[5] * r + o[9] * a + o[13] * i, this.z = o[2] * n + o[6] * r + o[10] * a + o[14] * i, this.w = o[3] * n + o[7] * r + o[11] * a + o[15] * i, this;
  }
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this.z /= t.z, this.w /= t.w, this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  setAxisAngleFromQuaternion(t) {
    this.w = 2 * Math.acos(t.w);
    const n = Math.sqrt(1 - t.w * t.w);
    return n < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = t.x / n, this.y = t.y / n, this.z = t.z / n), this;
  }
  setAxisAngleFromRotationMatrix(t) {
    let n, r, a, i;
    const l = t.elements,
      d = l[0],
      u = l[4],
      h = l[8],
      p = l[1],
      m = l[5],
      f = l[9],
      y = l[2],
      b = l[6],
      v = l[10];
    if (Math.abs(u - p) < .01 && Math.abs(h - y) < .01 && Math.abs(f - b) < .01) {
      if (Math.abs(u + p) < .1 && Math.abs(h + y) < .1 && Math.abs(f + b) < .1 && Math.abs(d + m + v - 3) < .1) return this.set(1, 0, 0, 0), this;
      n = Math.PI;
      const w = (d + 1) / 2,
        k = (m + 1) / 2,
        A = (v + 1) / 2,
        S = (u + p) / 4,
        C = (h + y) / 4,
        I = (f + b) / 4;
      return w > k && w > A ? w < .01 ? (r = 0, a = .707106781, i = .707106781) : (r = Math.sqrt(w), a = S / r, i = C / r) : k > A ? k < .01 ? (r = .707106781, a = 0, i = .707106781) : (a = Math.sqrt(k), r = S / a, i = I / a) : A < .01 ? (r = .707106781, a = .707106781, i = 0) : (i = Math.sqrt(A), r = C / i, a = I / i), this.set(r, a, i, n), this;
    }
    let _ = Math.sqrt((b - f) * (b - f) + (h - y) * (h - y) + (p - u) * (p - u));
    return Math.abs(_) < .001 && (_ = 1), this.x = (b - f) / _, this.y = (h - y) / _, this.z = (p - u) / _, this.w = Math.acos((d + m + v - 1) / 2), this;
  }
  setFromMatrixPosition(t) {
    const n = t.elements;
    return this.x = n[12], this.y = n[13], this.z = n[14], this.w = n[15], this;
  }
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this.w = Math.min(this.w, t.w), this;
  }
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this.w = Math.max(this.w, t.w), this;
  }
  clamp(t, n) {
    return this.x = Dl(this.x, t.x, n.x), this.y = Dl(this.y, t.y, n.y), this.z = Dl(this.z, t.z, n.z), this.w = Dl(this.w, t.w, n.w), this;
  }
  clampScalar(t, n) {
    return this.x = Dl(this.x, t, n), this.y = Dl(this.y, t, n), this.z = Dl(this.z, t, n), this.w = Dl(this.w, t, n), this;
  }
  clampLength(t, n) {
    const r = this.length();
    return this.divideScalar(r || 1).multiplyScalar(Dl(r, t, n));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, n) {
    return this.x += (t.x - this.x) * n, this.y += (t.y - this.y) * n, this.z += (t.z - this.z) * n, this.w += (t.w - this.w) * n, this;
  }
  lerpVectors(t, n, r) {
    return this.x = t.x + (n.x - t.x) * r, this.y = t.y + (n.y - t.y) * r, this.z = t.z + (n.z - t.z) * r, this.w = t.w + (n.w - t.w) * r, this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w;
  }
  fromArray(t, n = 0) {
    return this.x = t[n], this.y = t[n + 1], this.z = t[n + 2], this.w = t[n + 3], this;
  }
  toArray(t = [], n = 0) {
    return t[n] = this.x, t[n + 1] = this.y, t[n + 2] = this.z, t[n + 3] = this.w, t;
  }
  fromBufferAttribute(t, n) {
    return this.x = t.getX(n), this.y = t.getY(n), this.z = t.getZ(n), this.w = t.getW(n), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}

class Mwa extends dG {
  constructor(t = 1, n = 1, r = {}) {
    super(), r = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: $m,
      depthBuffer: !0,
      stencilBuffer: !1,
      resolveDepthBuffer: !0,
      resolveStencilBuffer: !0,
      depthTexture: null,
      samples: 0,
      count: 1,
      depth: 1,
      multiview: !1
    }, r), this.isRenderTarget = !0, this.width = t, this.height = n, this.depth = r.depth, this.scissor = new Vd(0, 0, t, n), this.scissorTest = !1, this.viewport = new Vd(0, 0, t, n), this.textures = [];
    const a = {
        width: t,
        height: n,
        depth: r.depth
      },
      i = new N0(a),
      o = r.count;
    for (let s = 0; s < o; s++) this.textures[s] = i.clone(), this.textures[s].isRenderTargetTexture = !0, this.textures[s].renderTarget = this;
    this._setTextureOptions(r), this.depthBuffer = r.depthBuffer, this.stencilBuffer = r.stencilBuffer, this.resolveDepthBuffer = r.resolveDepthBuffer, this.resolveStencilBuffer = r.resolveStencilBuffer, this._depthTexture = null, this.depthTexture = r.depthTexture, this.samples = r.samples, this.multiview = r.multiview;
  }
  _setTextureOptions(t = {}) {
    const n = {
      minFilter: $m,
      generateMipmaps: !1,
      flipY: !1,
      internalFormat: null
    };
    t.mapping !== void 0 && (n.mapping = t.mapping), t.wrapS !== void 0 && (n.wrapS = t.wrapS), t.wrapT !== void 0 && (n.wrapT = t.wrapT), t.wrapR !== void 0 && (n.wrapR = t.wrapR), t.magFilter !== void 0 && (n.magFilter = t.magFilter), t.minFilter !== void 0 && (n.minFilter = t.minFilter), t.format !== void 0 && (n.format = t.format), t.type !== void 0 && (n.type = t.type), t.anisotropy !== void 0 && (n.anisotropy = t.anisotropy), t.colorSpace !== void 0 && (n.colorSpace = t.colorSpace), t.flipY !== void 0 && (n.flipY = t.flipY), t.generateMipmaps !== void 0 && (n.generateMipmaps = t.generateMipmaps), t.internalFormat !== void 0 && (n.internalFormat = t.internalFormat);
    for (let r = 0; r < this.textures.length; r++) this.textures[r].setValues(n);
  }
  get texture() {
    return this.textures[0];
  }
  set texture(t) {
    this.textures[0] = t;
  }
  set depthTexture(t) {
    this._depthTexture !== null && (this._depthTexture.renderTarget = null), t !== null && (t.renderTarget = this), this._depthTexture = t;
  }
  get depthTexture() {
    return this._depthTexture;
  }
  setSize(t, n, r = 1) {
    if (this.width !== t || this.height !== n || this.depth !== r) {
      this.width = t, this.height = n, this.depth = r;
      for (let a = 0, i = this.textures.length; a < i; a++) this.textures[a].image.width = t, this.textures[a].image.height = n, this.textures[a].image.depth = r, this.textures[a].isData3DTexture !== !0 && (this.textures[a].isArrayTexture = this.textures[a].image.depth > 1);
      this.dispose();
    }
    this.viewport.set(0, 0, t, n), this.scissor.set(0, 0, t, n);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    this.width = t.width, this.height = t.height, this.depth = t.depth, this.scissor.copy(t.scissor), this.scissorTest = t.scissorTest, this.viewport.copy(t.viewport), this.textures.length = 0;
    for (let n = 0, r = t.textures.length; n < r; n++) {
      this.textures[n] = t.textures[n].clone(), this.textures[n].isRenderTargetTexture = !0, this.textures[n].renderTarget = this;
      const a = Object.assign({}, t.textures[n].image);
      this.textures[n].source = new qjt(a);
    }
    return this.depthBuffer = t.depthBuffer, this.stencilBuffer = t.stencilBuffer, this.resolveDepthBuffer = t.resolveDepthBuffer, this.resolveStencilBuffer = t.resolveStencilBuffer, t.depthTexture !== null && (this.depthTexture = t.depthTexture.clone()), this.samples = t.samples, this;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
}

class FE extends Mwa {
  constructor(t = 1, n = 1, r = {}) {
    super(t, n, r), this.isWebGLRenderTarget = !0;
  }
}

class Dqn extends N0 {
  constructor(t = null, n = 1, r = 1, a = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = {
      data: t,
      width: n,
      height: r,
      depth: a
    }, this.magFilter = cg, this.minFilter = cg, this.wrapR = hy, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = new Set();
  }
  addLayerUpdate(t) {
    this.layerUpdates.add(t);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}

class Pwa extends N0 {
  constructor(t = null, n = 1, r = 1, a = 1) {
    super(null), this.isData3DTexture = !0, this.image = {
      data: t,
      width: n,
      height: r,
      depth: a
    }, this.magFilter = cg, this.minFilter = cg, this.wrapR = hy, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}

class bo {
  constructor(t, n, r, a, i, o, s, l, d, u, h, p, m, f, y, b) {
    bo.prototype.isMatrix4 = !0, this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], t !== void 0 && this.set(t, n, r, a, i, o, s, l, d, u, h, p, m, f, y, b);
  }
  set(t, n, r, a, i, o, s, l, d, u, h, p, m, f, y, b) {
    const v = this.elements;
    return v[0] = t, v[4] = n, v[8] = r, v[12] = a, v[1] = i, v[5] = o, v[9] = s, v[13] = l, v[2] = d, v[6] = u, v[10] = h, v[14] = p, v[3] = m, v[7] = f, v[11] = y, v[15] = b, this;
  }
  identity() {
    return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  clone() {
    return new bo().fromArray(this.elements);
  }
  copy(t) {
    const n = this.elements,
      r = t.elements;
    return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[4] = r[4], n[5] = r[5], n[6] = r[6], n[7] = r[7], n[8] = r[8], n[9] = r[9], n[10] = r[10], n[11] = r[11], n[12] = r[12], n[13] = r[13], n[14] = r[14], n[15] = r[15], this;
  }
  copyPosition(t) {
    const n = this.elements,
      r = t.elements;
    return n[12] = r[12], n[13] = r[13], n[14] = r[14], this;
  }
  setFromMatrix3(t) {
    const n = t.elements;
    return this.set(n[0], n[3], n[6], 0, n[1], n[4], n[7], 0, n[2], n[5], n[8], 0, 0, 0, 0, 1), this;
  }
  extractBasis(t, n, r) {
    return this.determinant() === 0 ? (t.set(1, 0, 0), n.set(0, 1, 0), r.set(0, 0, 1), this) : (t.setFromMatrixColumn(this, 0), n.setFromMatrixColumn(this, 1), r.setFromMatrixColumn(this, 2), this);
  }
  makeBasis(t, n, r) {
    return this.set(t.x, n.x, r.x, 0, t.y, n.y, r.y, 0, t.z, n.z, r.z, 0, 0, 0, 0, 1), this;
  }
  extractRotation(t) {
    if (t.determinant() === 0) return this.identity();
    const n = this.elements,
      r = t.elements,
      a = 1 / Pee.setFromMatrixColumn(t, 0).length(),
      i = 1 / Pee.setFromMatrixColumn(t, 1).length(),
      o = 1 / Pee.setFromMatrixColumn(t, 2).length();
    return n[0] = r[0] * a, n[1] = r[1] * a, n[2] = r[2] * a, n[3] = 0, n[4] = r[4] * i, n[5] = r[5] * i, n[6] = r[6] * i, n[7] = 0, n[8] = r[8] * o, n[9] = r[9] * o, n[10] = r[10] * o, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, this;
  }
  makeRotationFromEuler(t) {
    const n = this.elements,
      r = t.x,
      a = t.y,
      i = t.z,
      o = Math.cos(r),
      s = Math.sin(r),
      l = Math.cos(a),
      d = Math.sin(a),
      u = Math.cos(i),
      h = Math.sin(i);
    if (t.order === "XYZ") {
      const p = o * u,
        m = o * h,
        f = s * u,
        y = s * h;
      n[0] = l * u, n[4] = -l * h, n[8] = d, n[1] = m + f * d, n[5] = p - y * d, n[9] = -s * l, n[2] = y - p * d, n[6] = f + m * d, n[10] = o * l;
    } else if (t.order === "YXZ") {
      const p = l * u,
        m = l * h,
        f = d * u,
        y = d * h;
      n[0] = p + y * s, n[4] = f * s - m, n[8] = o * d, n[1] = o * h, n[5] = o * u, n[9] = -s, n[2] = m * s - f, n[6] = y + p * s, n[10] = o * l;
    } else if (t.order === "ZXY") {
      const p = l * u,
        m = l * h,
        f = d * u,
        y = d * h;
      n[0] = p - y * s, n[4] = -o * h, n[8] = f + m * s, n[1] = m + f * s, n[5] = o * u, n[9] = y - p * s, n[2] = -o * d, n[6] = s, n[10] = o * l;
    } else if (t.order === "ZYX") {
      const p = o * u,
        m = o * h,
        f = s * u,
        y = s * h;
      n[0] = l * u, n[4] = f * d - m, n[8] = p * d + y, n[1] = l * h, n[5] = y * d + p, n[9] = m * d - f, n[2] = -d, n[6] = s * l, n[10] = o * l;
    } else if (t.order === "YZX") {
      const p = o * l,
        m = o * d,
        f = s * l,
        y = s * d;
      n[0] = l * u, n[4] = y - p * h, n[8] = f * h + m, n[1] = h, n[5] = o * u, n[9] = -s * u, n[2] = -d * u, n[6] = m * h + f, n[10] = p - y * h;
    } else if (t.order === "XZY") {
      const p = o * l,
        m = o * d,
        f = s * l,
        y = s * d;
      n[0] = l * u, n[4] = -h, n[8] = d * u, n[1] = p * h + y, n[5] = o * u, n[9] = m * h - f, n[2] = f * h - m, n[6] = s * u, n[10] = y * h + p;
    }
    return n[3] = 0, n[7] = 0, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, this;
  }
  makeRotationFromQuaternion(t) {
    return this.compose(Rwa, t, Nwa);
  }
  lookAt(t, n, r) {
    const a = this.elements;
    return CA.subVectors(t, n), CA.lengthSq() === 0 && (CA.z = 1), CA.normalize(), hL.crossVectors(r, CA), hL.lengthSq() === 0 && (Math.abs(r.z) === 1 ? CA.x += 1e-4 : CA.z += 1e-4, CA.normalize(), hL.crossVectors(r, CA)), hL.normalize(), t8e.crossVectors(CA, hL), a[0] = hL.x, a[4] = t8e.x, a[8] = CA.x, a[1] = hL.y, a[5] = t8e.y, a[9] = CA.y, a[2] = hL.z, a[6] = t8e.z, a[10] = CA.z, this;
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, n) {
    const r = t.elements,
      a = n.elements,
      i = this.elements,
      o = r[0],
      s = r[4],
      l = r[8],
      d = r[12],
      u = r[1],
      h = r[5],
      p = r[9],
      m = r[13],
      f = r[2],
      y = r[6],
      b = r[10],
      v = r[14],
      _ = r[3],
      w = r[7],
      k = r[11],
      A = r[15],
      S = a[0],
      C = a[4],
      I = a[8],
      E = a[12],
      M = a[1],
      T = a[5],
      P = a[9],
      R = a[13],
      j = a[2],
      B = a[6],
      F = a[10],
      N = a[14],
      G = a[3],
      z = a[7],
      V = a[11],
      O = a[15];
    return i[0] = o * S + s * M + l * j + d * G, i[4] = o * C + s * T + l * B + d * z, i[8] = o * I + s * P + l * F + d * V, i[12] = o * E + s * R + l * N + d * O, i[1] = u * S + h * M + p * j + m * G, i[5] = u * C + h * T + p * B + m * z, i[9] = u * I + h * P + p * F + m * V, i[13] = u * E + h * R + p * N + m * O, i[2] = f * S + y * M + b * j + v * G, i[6] = f * C + y * T + b * B + v * z, i[10] = f * I + y * P + b * F + v * V, i[14] = f * E + y * R + b * N + v * O, i[3] = _ * S + w * M + k * j + A * G, i[7] = _ * C + w * T + k * B + A * z, i[11] = _ * I + w * P + k * F + A * V, i[15] = _ * E + w * R + k * N + A * O, this;
  }
  multiplyScalar(t) {
    const n = this.elements;
    return n[0] *= t, n[4] *= t, n[8] *= t, n[12] *= t, n[1] *= t, n[5] *= t, n[9] *= t, n[13] *= t, n[2] *= t, n[6] *= t, n[10] *= t, n[14] *= t, n[3] *= t, n[7] *= t, n[11] *= t, n[15] *= t, this;
  }
  determinant() {
    const t = this.elements,
      n = t[0],
      r = t[4],
      a = t[8],
      i = t[12],
      o = t[1],
      s = t[5],
      l = t[9],
      d = t[13],
      u = t[2],
      h = t[6],
      p = t[10],
      m = t[14],
      f = t[3],
      y = t[7],
      b = t[11],
      v = t[15],
      _ = l * m - d * p,
      w = s * m - d * h,
      k = s * p - l * h,
      A = o * m - d * u,
      S = o * p - l * u,
      C = o * h - s * u;
    return n * (y * _ - b * w + v * k) - r * (f * _ - b * A + v * S) + a * (f * w - y * A + v * C) - i * (f * k - y * S + b * C);
  }
  transpose() {
    const t = this.elements;
    let n;
    return n = t[1], t[1] = t[4], t[4] = n, n = t[2], t[2] = t[8], t[8] = n, n = t[6], t[6] = t[9], t[9] = n, n = t[3], t[3] = t[12], t[12] = n, n = t[7], t[7] = t[13], t[13] = n, n = t[11], t[11] = t[14], t[14] = n, this;
  }
  setPosition(t, n, r) {
    const a = this.elements;
    return t.isVector3 ? (a[12] = t.x, a[13] = t.y, a[14] = t.z) : (a[12] = t, a[13] = n, a[14] = r), this;
  }
  invert() {
    const t = this.elements,
      n = t[0],
      r = t[1],
      a = t[2],
      i = t[3],
      o = t[4],
      s = t[5],
      l = t[6],
      d = t[7],
      u = t[8],
      h = t[9],
      p = t[10],
      m = t[11],
      f = t[12],
      y = t[13],
      b = t[14],
      v = t[15],
      _ = n * s - r * o,
      w = n * l - a * o,
      k = n * d - i * o,
      A = r * l - a * s,
      S = r * d - i * s,
      C = a * d - i * l,
      I = u * y - h * f,
      E = u * b - p * f,
      M = u * v - m * f,
      T = h * b - p * y,
      P = h * v - m * y,
      R = p * v - m * b,
      j = _ * R - w * P + k * T + A * M - S * E + C * I;
    if (j === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const B = 1 / j;
    return t[0] = (s * R - l * P + d * T) * B, t[1] = (a * P - r * R - i * T) * B, t[2] = (y * C - b * S + v * A) * B, t[3] = (p * S - h * C - m * A) * B, t[4] = (l * M - o * R - d * E) * B, t[5] = (n * R - a * M + i * E) * B, t[6] = (b * k - f * C - v * w) * B, t[7] = (u * C - p * k + m * w) * B, t[8] = (o * P - s * M + d * I) * B, t[9] = (r * M - n * P - i * I) * B, t[10] = (f * S - y * k + v * _) * B, t[11] = (h * k - u * S - m * _) * B, t[12] = (s * E - o * T - l * I) * B, t[13] = (n * T - r * E + a * I) * B, t[14] = (y * w - f * A - b * _) * B, t[15] = (u * A - h * w + p * _) * B, this;
  }
  scale(t) {
    const n = this.elements,
      r = t.x,
      a = t.y,
      i = t.z;
    return n[0] *= r, n[4] *= a, n[8] *= i, n[1] *= r, n[5] *= a, n[9] *= i, n[2] *= r, n[6] *= a, n[10] *= i, n[3] *= r, n[7] *= a, n[11] *= i, this;
  }
  getMaxScaleOnAxis() {
    const t = this.elements,
      n = t[0] * t[0] + t[1] * t[1] + t[2] * t[2],
      r = t[4] * t[4] + t[5] * t[5] + t[6] * t[6],
      a = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
    return Math.sqrt(Math.max(n, r, a));
  }
  makeTranslation(t, n, r) {
    return t.isVector3 ? this.set(1, 0, 0, t.x, 0, 1, 0, t.y, 0, 0, 1, t.z, 0, 0, 0, 1) : this.set(1, 0, 0, t, 0, 1, 0, n, 0, 0, 1, r, 0, 0, 0, 1), this;
  }
  makeRotationX(t) {
    const n = Math.cos(t),
      r = Math.sin(t);
    return this.set(1, 0, 0, 0, 0, n, -r, 0, 0, r, n, 0, 0, 0, 0, 1), this;
  }
  makeRotationY(t) {
    const n = Math.cos(t),
      r = Math.sin(t);
    return this.set(n, 0, r, 0, 0, 1, 0, 0, -r, 0, n, 0, 0, 0, 0, 1), this;
  }
  makeRotationZ(t) {
    const n = Math.cos(t),
      r = Math.sin(t);
    return this.set(n, -r, 0, 0, r, n, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  makeRotationAxis(t, n) {
    const r = Math.cos(n),
      a = Math.sin(n),
      i = 1 - r,
      o = t.x,
      s = t.y,
      l = t.z,
      d = i * o,
      u = i * s;
    return this.set(d * o + r, d * s - a * l, d * l + a * s, 0, d * s + a * l, u * s + r, u * l - a * o, 0, d * l - a * s, u * l + a * o, i * l * l + r, 0, 0, 0, 0, 1), this;
  }
  makeScale(t, n, r) {
    return this.set(t, 0, 0, 0, 0, n, 0, 0, 0, 0, r, 0, 0, 0, 0, 1), this;
  }
  makeShear(t, n, r, a, i, o) {
    return this.set(1, r, i, 0, t, 1, o, 0, n, a, 1, 0, 0, 0, 0, 1), this;
  }
  compose(t, n, r) {
    const a = this.elements,
      i = n._x,
      o = n._y,
      s = n._z,
      l = n._w,
      d = i + i,
      u = o + o,
      h = s + s,
      p = i * d,
      m = i * u,
      f = i * h,
      y = o * u,
      b = o * h,
      v = s * h,
      _ = l * d,
      w = l * u,
      k = l * h,
      A = r.x,
      S = r.y,
      C = r.z;
    return a[0] = (1 - (y + v)) * A, a[1] = (m + k) * A, a[2] = (f - w) * A, a[3] = 0, a[4] = (m - k) * S, a[5] = (1 - (p + v)) * S, a[6] = (b + _) * S, a[7] = 0, a[8] = (f + w) * C, a[9] = (b - _) * C, a[10] = (1 - (p + y)) * C, a[11] = 0, a[12] = t.x, a[13] = t.y, a[14] = t.z, a[15] = 1, this;
  }
  decompose(t, n, r) {
    const a = this.elements;
    t.x = a[12], t.y = a[13], t.z = a[14];
    const i = this.determinant();
    if (i === 0) return r.set(1, 1, 1), n.identity(), this;
    let o = Pee.set(a[0], a[1], a[2]).length();
    const s = Pee.set(a[4], a[5], a[6]).length(),
      l = Pee.set(a[8], a[9], a[10]).length();
    i < 0 && (o = -o), FI.copy(this);
    const d = 1 / o,
      u = 1 / s,
      h = 1 / l;
    return FI.elements[0] *= d, FI.elements[1] *= d, FI.elements[2] *= d, FI.elements[4] *= u, FI.elements[5] *= u, FI.elements[6] *= u, FI.elements[8] *= h, FI.elements[9] *= h, FI.elements[10] *= h, n.setFromRotationMatrix(FI), r.x = o, r.y = s, r.z = l, this;
  }
  makePerspective(t, n, r, a, i, o, s = AM, l = !1) {
    const d = this.elements,
      u = 2 * i / (n - t),
      h = 2 * i / (r - a),
      p = (n + t) / (n - t),
      m = (r + a) / (r - a);
    let f, y;
    if (l) f = i / (o - i), y = o * i / (o - i);else if (s === AM) f = -(o + i) / (o - i), y = -2 * o * i / (o - i);else if (s === M_e) f = -o / (o - i), y = -o * i / (o - i);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + s);
    return d[0] = u, d[4] = 0, d[8] = p, d[12] = 0, d[1] = 0, d[5] = h, d[9] = m, d[13] = 0, d[2] = 0, d[6] = 0, d[10] = f, d[14] = y, d[3] = 0, d[7] = 0, d[11] = -1, d[15] = 0, this;
  }
  makeOrthographic(t, n, r, a, i, o, s = AM, l = !1) {
    const d = this.elements,
      u = 2 / (n - t),
      h = 2 / (r - a),
      p = -(n + t) / (n - t),
      m = -(r + a) / (r - a);
    let f, y;
    if (l) f = 1 / (o - i), y = o / (o - i);else if (s === AM) f = -2 / (o - i), y = -(o + i) / (o - i);else if (s === M_e) f = -1 / (o - i), y = -i / (o - i);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + s);
    return d[0] = u, d[4] = 0, d[8] = 0, d[12] = p, d[1] = 0, d[5] = h, d[9] = 0, d[13] = m, d[2] = 0, d[6] = 0, d[10] = f, d[14] = y, d[3] = 0, d[7] = 0, d[11] = 0, d[15] = 1, this;
  }
  equals(t) {
    const n = this.elements,
      r = t.elements;
    for (let a = 0; a < 16; a++) if (n[a] !== r[a]) return !1;
    return !0;
  }
  fromArray(t, n = 0) {
    for (let r = 0; r < 16; r++) this.elements[r] = t[r + n];
    return this;
  }
  toArray(t = [], n = 0) {
    const r = this.elements;
    return t[n] = r[0], t[n + 1] = r[1], t[n + 2] = r[2], t[n + 3] = r[3], t[n + 4] = r[4], t[n + 5] = r[5], t[n + 6] = r[6], t[n + 7] = r[7], t[n + 8] = r[8], t[n + 9] = r[9], t[n + 10] = r[10], t[n + 11] = r[11], t[n + 12] = r[12], t[n + 13] = r[13], t[n + 14] = r[14], t[n + 15] = r[15], t;
  }
}

const Pee = new dr(),
  FI = new bo(),
  Rwa = new dr(0, 0, 0),
  Nwa = new dr(1, 1, 1),
  hL = new dr(),
  t8e = new dr(),
  CA = new dr(),
  uZt = new bo(),
  hZt = new hl();

class xp {
  constructor(t = 0, n = 0, r = 0, a = xp.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = t, this._y = n, this._z = r, this._order = a;
  }
  get x() {
    return this._x;
  }
  set x(t) {
    this._x = t, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(t) {
    this._y = t, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(t) {
    this._z = t, this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(t) {
    this._order = t, this._onChangeCallback();
  }
  set(t, n, r, a = this._order) {
    return this._x = t, this._y = n, this._z = r, this._order = a, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(t) {
    return this._x = t._x, this._y = t._y, this._z = t._z, this._order = t._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(t, n = this._order, r = !0) {
    const a = t.elements,
      i = a[0],
      o = a[4],
      s = a[8],
      l = a[1],
      d = a[5],
      u = a[9],
      h = a[2],
      p = a[6],
      m = a[10];
    switch (n) {
      case "XYZ":
        this._y = Math.asin(Dl(s, -1, 1)), Math.abs(s) < .9999999 ? (this._x = Math.atan2(-u, m), this._z = Math.atan2(-o, i)) : (this._x = Math.atan2(p, d), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-Dl(u, -1, 1)), Math.abs(u) < .9999999 ? (this._y = Math.atan2(s, m), this._z = Math.atan2(l, d)) : (this._y = Math.atan2(-h, i), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(Dl(p, -1, 1)), Math.abs(p) < .9999999 ? (this._y = Math.atan2(-h, m), this._z = Math.atan2(-o, d)) : (this._y = 0, this._z = Math.atan2(l, i));
        break;
      case "ZYX":
        this._y = Math.asin(-Dl(h, -1, 1)), Math.abs(h) < .9999999 ? (this._x = Math.atan2(p, m), this._z = Math.atan2(l, i)) : (this._x = 0, this._z = Math.atan2(-o, d));
        break;
      case "YZX":
        this._z = Math.asin(Dl(l, -1, 1)), Math.abs(l) < .9999999 ? (this._x = Math.atan2(-u, d), this._y = Math.atan2(-h, i)) : (this._x = 0, this._y = Math.atan2(s, m));
        break;
      case "XZY":
        this._z = Math.asin(-Dl(o, -1, 1)), Math.abs(o) < .9999999 ? (this._x = Math.atan2(p, d), this._y = Math.atan2(s, i)) : (this._x = Math.atan2(-u, m), this._y = 0);
        break;
      default:
        Es("Euler: .setFromRotationMatrix() encountered an unknown order: " + n);
    }
    return this._order = n, r === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(t, n, r) {
    return uZt.makeRotationFromQuaternion(t), this.setFromRotationMatrix(uZt, n, r);
  }
  setFromVector3(t, n = this._order) {
    return this.set(t.x, t.y, t.z, n);
  }
  reorder(t) {
    return hZt.setFromEuler(this), this.setFromQuaternion(hZt, t);
  }
  equals(t) {
    return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order;
  }
  fromArray(t) {
    return this._x = t[0], this._y = t[1], this._z = t[2], t[3] !== void 0 && (this._order = t[3]), this._onChangeCallback(), this;
  }
  toArray(t = [], n = 0) {
    return t[n] = this._x, t[n + 1] = this._y, t[n + 2] = this._z, t[n + 3] = this._order, t;
  }
  _onChange(t) {
    return this._onChangeCallback = t, this;
  }
  _onChangeCallback() {}
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}

xp.DEFAULT_ORDER = "XYZ";

class Kjt {
  constructor() {
    this.mask = 1;
  }
  set(t) {
    this.mask = (1 << t | 0) >>> 0;
  }
  enable(t) {
    this.mask |= 1 << t | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(t) {
    this.mask ^= 1 << t | 0;
  }
  disable(t) {
    this.mask &= ~(1 << t | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(t) {
    return (this.mask & t.mask) !== 0;
  }
  isEnabled(t) {
    return (this.mask & (1 << t | 0)) !== 0;
  }
}

let jwa = 0;

const pZt = new dr(),
  Ree = new hl(),
  q9 = new bo(),
  n8e = new dr(),
  Ime = new dr(),
  Dwa = new dr(),
  Lwa = new hl(),
  mZt = new dr(1, 0, 0),
  fZt = new dr(0, 1, 0),
  gZt = new dr(0, 0, 1),
  yZt = {
    type: "added"
  },
  Owa = {
    type: "removed"
  },
  Nee = {
    type: "childadded",
    child: null
  },
  trt = {
    type: "childremoved",
    child: null
  };

class Zc extends dG {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", {
      value: jwa++
    }), this.uuid = H5(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = Zc.DEFAULT_UP.clone();
    const t = new dr(),
      n = new xp(),
      r = new hl(),
      a = new dr(1, 1, 1);
    function i() {
      r.setFromEuler(n, !1);
    }
    function o() {
      n.setFromQuaternion(r, void 0, !1);
    }
    n._onChange(i), r._onChange(o), Object.defineProperties(this, {
      position: {
        configurable: !0,
        enumerable: !0,
        value: t
      },
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: n
      },
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: r
      },
      scale: {
        configurable: !0,
        enumerable: !0,
        value: a
      },
      modelViewMatrix: {
        value: new bo()
      },
      normalMatrix: {
        value: new Tc()
      }
    }), this.matrix = new bo(), this.matrixWorld = new bo(), this.matrixAutoUpdate = Zc.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = Zc.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new Kjt(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.static = !1, this.userData = {}, this.pivot = null;
  }
  onBeforeShadow() {}
  onAfterShadow() {}
  onBeforeRender() {}
  onAfterRender() {}
  applyMatrix4(t) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(t), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(t) {
    return this.quaternion.premultiply(t), this;
  }
  setRotationFromAxisAngle(t, n) {
    this.quaternion.setFromAxisAngle(t, n);
  }
  setRotationFromEuler(t) {
    this.quaternion.setFromEuler(t, !0);
  }
  setRotationFromMatrix(t) {
    this.quaternion.setFromRotationMatrix(t);
  }
  setRotationFromQuaternion(t) {
    this.quaternion.copy(t);
  }
  rotateOnAxis(t, n) {
    return Ree.setFromAxisAngle(t, n), this.quaternion.multiply(Ree), this;
  }
  rotateOnWorldAxis(t, n) {
    return Ree.setFromAxisAngle(t, n), this.quaternion.premultiply(Ree), this;
  }
  rotateX(t) {
    return this.rotateOnAxis(mZt, t);
  }
  rotateY(t) {
    return this.rotateOnAxis(fZt, t);
  }
  rotateZ(t) {
    return this.rotateOnAxis(gZt, t);
  }
  translateOnAxis(t, n) {
    return pZt.copy(t).applyQuaternion(this.quaternion), this.position.add(pZt.multiplyScalar(n)), this;
  }
  translateX(t) {
    return this.translateOnAxis(mZt, t);
  }
  translateY(t) {
    return this.translateOnAxis(fZt, t);
  }
  translateZ(t) {
    return this.translateOnAxis(gZt, t);
  }
  localToWorld(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4(q9.copy(this.matrixWorld).invert());
  }
  lookAt(t, n, r) {
    t.isVector3 ? n8e.copy(t) : n8e.set(t, n, r);
    const a = this.parent;
    this.updateWorldMatrix(!0, !1), Ime.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? q9.lookAt(Ime, n8e, this.up) : q9.lookAt(n8e, Ime, this.up), this.quaternion.setFromRotationMatrix(q9), a && (q9.extractRotation(a.matrixWorld), Ree.setFromRotationMatrix(q9), this.quaternion.premultiply(Ree.invert()));
  }
  add(t) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++) this.add(arguments[n]);
      return this;
    }
    return t === this ? (vl("Object3D.add: object can't be added as a child of itself.", t), this) : (t && t.isObject3D ? (t.removeFromParent(), t.parent = this, this.children.push(t), t.dispatchEvent(yZt), Nee.child = t, this.dispatchEvent(Nee), Nee.child = null) : vl("Object3D.add: object not an instance of THREE.Object3D.", t), this);
  }
  remove(t) {
    if (arguments.length > 1) {
      for (let r = 0; r < arguments.length; r++) this.remove(arguments[r]);
      return this;
    }
    const n = this.children.indexOf(t);
    return n !== -1 && (t.parent = null, this.children.splice(n, 1), t.dispatchEvent(Owa), trt.child = t, this.dispatchEvent(trt), trt.child = null), this;
  }
  removeFromParent() {
    const t = this.parent;
    return t !== null && t.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(t) {
    return this.updateWorldMatrix(!0, !1), q9.copy(this.matrixWorld).invert(), t.parent !== null && (t.parent.updateWorldMatrix(!0, !1), q9.multiply(t.parent.matrixWorld)), t.applyMatrix4(q9), t.removeFromParent(), t.parent = this, this.children.push(t), t.updateWorldMatrix(!1, !0), t.dispatchEvent(yZt), Nee.child = t, this.dispatchEvent(Nee), Nee.child = null, this;
  }
  getObjectById(t) {
    return this.getObjectByProperty("id", t);
  }
  getObjectByName(t) {
    return this.getObjectByProperty("name", t);
  }
  getObjectByProperty(t, n) {
    if (this[t] === n) return this;
    for (let r = 0, a = this.children.length; r < a; r++) {
      const o = this.children[r].getObjectByProperty(t, n);
      if (o !== void 0) return o;
    }
  }
  getObjectsByProperty(t, n, r = []) {
    this[t] === n && r.push(this);
    const a = this.children;
    for (let i = 0, o = a.length; i < o; i++) a[i].getObjectsByProperty(t, n, r);
    return r;
  }
  getWorldPosition(t) {
    return this.updateWorldMatrix(!0, !1), t.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(t) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ime, t, Dwa), t;
  }
  getWorldScale(t) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ime, Lwa, t), t;
  }
  getWorldDirection(t) {
    this.updateWorldMatrix(!0, !1);
    const n = this.matrixWorld.elements;
    return t.set(n[8], n[9], n[10]).normalize();
  }
  raycast() {}
  traverse(t) {
    t(this);
    const n = this.children;
    for (let r = 0, a = n.length; r < a; r++) n[r].traverse(t);
  }
  traverseVisible(t) {
    if (this.visible === !1) return;
    t(this);
    const n = this.children;
    for (let r = 0, a = n.length; r < a; r++) n[r].traverseVisible(t);
  }
  traverseAncestors(t) {
    const n = this.parent;
    n !== null && (t(n), n.traverseAncestors(t));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale);
    const t = this.pivot;
    if (t !== null) {
      const n = t.x,
        r = t.y,
        a = t.z,
        i = this.matrix.elements;
      i[12] += n - i[0] * n - i[4] * r - i[8] * a, i[13] += r - i[1] * n - i[5] * r - i[9] * a, i[14] += a - i[2] * n - i[6] * r - i[10] * a;
    }
    this.matrixWorldNeedsUpdate = !0;
  }
  updateMatrixWorld(t) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || t) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, t = !0);
    const n = this.children;
    for (let r = 0, a = n.length; r < a; r++) n[r].updateMatrixWorld(t);
  }
  updateWorldMatrix(t, n) {
    const r = this.parent;
    if (t === !0 && r !== null && r.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), n === !0) {
      const a = this.children;
      for (let i = 0, o = a.length; i < o; i++) a[i].updateWorldMatrix(!1, !0);
    }
  }
  toJSON(t) {
    const n = t === void 0 || typeof t == "string",
      r = {};
    n && (t = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, r.metadata = {
      version: 4.7,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const a = {};
    a.uuid = this.uuid, a.type = this.type, this.name !== "" && (a.name = this.name), this.castShadow === !0 && (a.castShadow = !0), this.receiveShadow === !0 && (a.receiveShadow = !0), this.visible === !1 && (a.visible = !1), this.frustumCulled === !1 && (a.frustumCulled = !1), this.renderOrder !== 0 && (a.renderOrder = this.renderOrder), this.static !== !1 && (a.static = this.static), Object.keys(this.userData).length > 0 && (a.userData = this.userData), a.layers = this.layers.mask, a.matrix = this.matrix.toArray(), a.up = this.up.toArray(), this.pivot !== null && (a.pivot = this.pivot.toArray()), this.matrixAutoUpdate === !1 && (a.matrixAutoUpdate = !1), this.morphTargetDictionary !== void 0 && (a.morphTargetDictionary = Object.assign({}, this.morphTargetDictionary)), this.morphTargetInfluences !== void 0 && (a.morphTargetInfluences = this.morphTargetInfluences.slice()), this.isInstancedMesh && (a.type = "InstancedMesh", a.count = this.count, a.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (a.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (a.type = "BatchedMesh", a.perObjectFrustumCulled = this.perObjectFrustumCulled, a.sortObjects = this.sortObjects, a.drawRanges = this._drawRanges, a.reservedRanges = this._reservedRanges, a.geometryInfo = this._geometryInfo.map(s => ({
      ...s,
      boundingBox: s.boundingBox ? s.boundingBox.toJSON() : void 0,
      boundingSphere: s.boundingSphere ? s.boundingSphere.toJSON() : void 0
    })), a.instanceInfo = this._instanceInfo.map(s => ({
      ...s
    })), a.availableInstanceIds = this._availableInstanceIds.slice(), a.availableGeometryIds = this._availableGeometryIds.slice(), a.nextIndexStart = this._nextIndexStart, a.nextVertexStart = this._nextVertexStart, a.geometryCount = this._geometryCount, a.maxInstanceCount = this._maxInstanceCount, a.maxVertexCount = this._maxVertexCount, a.maxIndexCount = this._maxIndexCount, a.geometryInitialized = this._geometryInitialized, a.matricesTexture = this._matricesTexture.toJSON(t), a.indirectTexture = this._indirectTexture.toJSON(t), this._colorsTexture !== null && (a.colorsTexture = this._colorsTexture.toJSON(t)), this.boundingSphere !== null && (a.boundingSphere = this.boundingSphere.toJSON()), this.boundingBox !== null && (a.boundingBox = this.boundingBox.toJSON()));
    function i(s, l) {
      return s[l.uuid] === void 0 && (s[l.uuid] = l.toJSON(t)), l.uuid;
    }
    if (this.isScene) this.background && (this.background.isColor ? a.background = this.background.toJSON() : this.background.isTexture && (a.background = this.background.toJSON(t).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (a.environment = this.environment.toJSON(t).uuid);else if (this.isMesh || this.isLine || this.isPoints) {
      a.geometry = i(t.geometries, this.geometry);
      const s = this.geometry.parameters;
      if (s !== void 0 && s.shapes !== void 0) {
        const l = s.shapes;
        if (Array.isArray(l)) for (let d = 0, u = l.length; d < u; d++) {
          const h = l[d];
          i(t.shapes, h);
        } else i(t.shapes, l);
      }
    }
    if (this.isSkinnedMesh && (a.bindMode = this.bindMode, a.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (i(t.skeletons, this.skeleton), a.skeleton = this.skeleton.uuid)), this.material !== void 0) if (Array.isArray(this.material)) {
      const s = [];
      for (let l = 0, d = this.material.length; l < d; l++) s.push(i(t.materials, this.material[l]));
      a.material = s;
    } else a.material = i(t.materials, this.material);
    if (this.children.length > 0) {
      a.children = [];
      for (let s = 0; s < this.children.length; s++) a.children.push(this.children[s].toJSON(t).object);
    }
    if (this.animations.length > 0) {
      a.animations = [];
      for (let s = 0; s < this.animations.length; s++) {
        const l = this.animations[s];
        a.animations.push(i(t.animations, l));
      }
    }
    if (n) {
      const s = o(t.geometries),
        l = o(t.materials),
        d = o(t.textures),
        u = o(t.images),
        h = o(t.shapes),
        p = o(t.skeletons),
        m = o(t.animations),
        f = o(t.nodes);
      s.length > 0 && (r.geometries = s), l.length > 0 && (r.materials = l), d.length > 0 && (r.textures = d), u.length > 0 && (r.images = u), h.length > 0 && (r.shapes = h), p.length > 0 && (r.skeletons = p), m.length > 0 && (r.animations = m), f.length > 0 && (r.nodes = f);
    }
    return r.object = a, r;
    function o(s) {
      const l = [];
      for (const d in s) {
        const u = s[d];
        delete u.metadata, l.push(u);
      }
      return l;
    }
  }
  clone(t) {
    return new this.constructor().copy(this, t);
  }
  copy(t, n = !0) {
    if (this.name = t.name, this.up.copy(t.up), this.position.copy(t.position), this.rotation.order = t.rotation.order, this.quaternion.copy(t.quaternion), this.scale.copy(t.scale), t.pivot !== null && (this.pivot = t.pivot.clone()), this.matrix.copy(t.matrix), this.matrixWorld.copy(t.matrixWorld), this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrixWorldAutoUpdate = t.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate, this.layers.mask = t.layers.mask, this.visible = t.visible, this.castShadow = t.castShadow, this.receiveShadow = t.receiveShadow, this.frustumCulled = t.frustumCulled, this.renderOrder = t.renderOrder, this.static = t.static, this.animations = t.animations.slice(), this.userData = JSON.parse(JSON.stringify(t.userData)), n === !0) for (let r = 0; r < t.children.length; r++) {
      const a = t.children[r];
      this.add(a.clone());
    }
    return this;
  }
}

Zc.DEFAULT_UP = new dr(0, 1, 0);

Zc.DEFAULT_MATRIX_AUTO_UPDATE = !0;

Zc.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;

class hc extends Zc {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}

const Bwa = {
  type: "move"
};

class nrt {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new hc(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = {
      pinching: !1
    }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new hc(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new dr(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new dr()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new hc(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new dr(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new dr()), this._grip;
  }
  dispatchEvent(t) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(t), this._grip !== null && this._grip.dispatchEvent(t), this._hand !== null && this._hand.dispatchEvent(t), this;
  }
  connect(t) {
    if (t && t.hand) {
      const n = this._hand;
      if (n) for (const r of t.hand.values()) this._getHandJoint(n, r);
    }
    return this.dispatchEvent({
      type: "connected",
      data: t
    }), this;
  }
  disconnect(t) {
    return this.dispatchEvent({
      type: "disconnected",
      data: t
    }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
  }
  update(t, n, r) {
    let a = null,
      i = null,
      o = null;
    const s = this._targetRay,
      l = this._grip,
      d = this._hand;
    if (t && n.session.visibilityState !== "visible-blurred") {
      if (d && t.hand) {
        o = !0;
        for (const y of t.hand.values()) {
          const b = n.getJointPose(y, r),
            v = this._getHandJoint(d, y);
          b !== null && (v.matrix.fromArray(b.transform.matrix), v.matrix.decompose(v.position, v.rotation, v.scale), v.matrixWorldNeedsUpdate = !0, v.jointRadius = b.radius), v.visible = b !== null;
        }
        const u = d.joints["index-finger-tip"],
          h = d.joints["thumb-tip"],
          p = u.position.distanceTo(h.position),
          m = .02,
          f = .005;
        d.inputState.pinching && p > m + f ? (d.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: t.handedness,
          target: this
        })) : !d.inputState.pinching && p <= m - f && (d.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: t.handedness,
          target: this
        }));
      } else l !== null && t.gripSpace && (i = n.getPose(t.gripSpace, r), i !== null && (l.matrix.fromArray(i.transform.matrix), l.matrix.decompose(l.position, l.rotation, l.scale), l.matrixWorldNeedsUpdate = !0, i.linearVelocity ? (l.hasLinearVelocity = !0, l.linearVelocity.copy(i.linearVelocity)) : l.hasLinearVelocity = !1, i.angularVelocity ? (l.hasAngularVelocity = !0, l.angularVelocity.copy(i.angularVelocity)) : l.hasAngularVelocity = !1));
      s !== null && (a = n.getPose(t.targetRaySpace, r), a === null && i !== null && (a = i), a !== null && (s.matrix.fromArray(a.transform.matrix), s.matrix.decompose(s.position, s.rotation, s.scale), s.matrixWorldNeedsUpdate = !0, a.linearVelocity ? (s.hasLinearVelocity = !0, s.linearVelocity.copy(a.linearVelocity)) : s.hasLinearVelocity = !1, a.angularVelocity ? (s.hasAngularVelocity = !0, s.angularVelocity.copy(a.angularVelocity)) : s.hasAngularVelocity = !1, this.dispatchEvent(Bwa)));
    }
    return s !== null && (s.visible = a !== null), l !== null && (l.visible = i !== null), d !== null && (d.visible = o !== null), this;
  }
  _getHandJoint(t, n) {
    if (t.joints[n.jointName] === void 0) {
      const r = new hc();
      r.matrixAutoUpdate = !1, r.visible = !1, t.joints[n.jointName] = r, t.add(r);
    }
    return t.joints[n.jointName];
  }
}

const Lqn = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
  },
  pL = {
    h: 0,
    s: 0,
    l: 0
  },
  r8e = {
    h: 0,
    s: 0,
    l: 0
  };

function rrt(e, t, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * 6 * (2 / 3 - n) : e;
}

class so {
  constructor(t, n, r) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(t, n, r);
  }
  set(t, n, r) {
    if (n === void 0 && r === void 0) {
      const a = t;
      a && a.isColor ? this.copy(a) : typeof a == "number" ? this.setHex(a) : typeof a == "string" && this.setStyle(a);
    } else this.setRGB(t, n, r);
    return this;
  }
  setScalar(t) {
    return this.r = t, this.g = t, this.b = t, this;
  }
  setHex(t, n = Nl) {
    return t = Math.floor(t), this.r = (t >> 16 & 255) / 255, this.g = (t >> 8 & 255) / 255, this.b = (t & 255) / 255, vc.colorSpaceToWorking(this, n), this;
  }
  setRGB(t, n, r, a = vc.workingColorSpace) {
    return this.r = t, this.g = n, this.b = r, vc.colorSpaceToWorking(this, a), this;
  }
  setHSL(t, n, r, a = vc.workingColorSpace) {
    if (t = Wjt(t, 1), n = Dl(n, 0, 1), r = Dl(r, 0, 1), n === 0) this.r = this.g = this.b = r;else {
      const i = r <= .5 ? r * (1 + n) : r + n - r * n,
        o = 2 * r - i;
      this.r = rrt(o, i, t + 1 / 3), this.g = rrt(o, i, t), this.b = rrt(o, i, t - 1 / 3);
    }
    return vc.colorSpaceToWorking(this, a), this;
  }
  setStyle(t, n = Nl) {
    function r(i) {
      i !== void 0 && parseFloat(i) < 1 && Es("Color: Alpha component of " + t + " will be ignored.");
    }
    let a;
    if (a = /^(\w+)\(([^\)]*)\)/.exec(t)) {
      let i;
      const o = a[1],
        s = a[2];
      switch (o) {
        case "rgb":
        case "rgba":
          if (i = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s)) return r(i[4]), this.setRGB(Math.min(255, parseInt(i[1], 10)) / 255, Math.min(255, parseInt(i[2], 10)) / 255, Math.min(255, parseInt(i[3], 10)) / 255, n);
          if (i = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s)) return r(i[4]), this.setRGB(Math.min(100, parseInt(i[1], 10)) / 100, Math.min(100, parseInt(i[2], 10)) / 100, Math.min(100, parseInt(i[3], 10)) / 100, n);
          break;
        case "hsl":
        case "hsla":
          if (i = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s)) return r(i[4]), this.setHSL(parseFloat(i[1]) / 360, parseFloat(i[2]) / 100, parseFloat(i[3]) / 100, n);
          break;
        default:
          Es("Color: Unknown color model " + t);
      }
    } else if (a = /^\#([A-Fa-f\d]+)$/.exec(t)) {
      const i = a[1],
        o = i.length;
      if (o === 3) return this.setRGB(parseInt(i.charAt(0), 16) / 15, parseInt(i.charAt(1), 16) / 15, parseInt(i.charAt(2), 16) / 15, n);
      if (o === 6) return this.setHex(parseInt(i, 16), n);
      Es("Color: Invalid hex color " + t);
    } else if (t && t.length > 0) return this.setColorName(t, n);
    return this;
  }
  setColorName(t, n = Nl) {
    const r = Lqn[t.toLowerCase()];
    return r !== void 0 ? this.setHex(r, n) : Es("Color: Unknown color " + t), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(t) {
    return this.r = t.r, this.g = t.g, this.b = t.b, this;
  }
  copySRGBToLinear(t) {
    return this.r = rj(t.r), this.g = rj(t.g), this.b = rj(t.b), this;
  }
  copyLinearToSRGB(t) {
    return this.r = Cie(t.r), this.g = Cie(t.g), this.b = Cie(t.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(t = Nl) {
    return vc.workingToColorSpace(Cw.copy(this), t), Math.round(Dl(Cw.r * 255, 0, 255)) * 65536 + Math.round(Dl(Cw.g * 255, 0, 255)) * 256 + Math.round(Dl(Cw.b * 255, 0, 255));
  }
  getHexString(t = Nl) {
    return ("000000" + this.getHex(t).toString(16)).slice(-6);
  }
  getHSL(t, n = vc.workingColorSpace) {
    vc.workingToColorSpace(Cw.copy(this), n);
    const r = Cw.r,
      a = Cw.g,
      i = Cw.b,
      o = Math.max(r, a, i),
      s = Math.min(r, a, i);
    let l, d;
    const u = (s + o) / 2;
    if (s === o) l = 0, d = 0;else {
      const h = o - s;
      switch (d = u <= .5 ? h / (o + s) : h / (2 - o - s), o) {
        case r:
          l = (a - i) / h + (a < i ? 6 : 0);
          break;
        case a:
          l = (i - r) / h + 2;
          break;
        case i:
          l = (r - a) / h + 4;
          break;
      }
      l /= 6;
    }
    return t.h = l, t.s = d, t.l = u, t;
  }
  getRGB(t, n = vc.workingColorSpace) {
    return vc.workingToColorSpace(Cw.copy(this), n), t.r = Cw.r, t.g = Cw.g, t.b = Cw.b, t;
  }
  getStyle(t = Nl) {
    vc.workingToColorSpace(Cw.copy(this), t);
    const n = Cw.r,
      r = Cw.g,
      a = Cw.b;
    return t !== Nl ? `color(${t} ${n.toFixed(3)} ${r.toFixed(3)} ${a.toFixed(3)})` : `rgb(${Math.round(n * 255)},${Math.round(r * 255)},${Math.round(a * 255)})`;
  }
  offsetHSL(t, n, r) {
    return this.getHSL(pL), this.setHSL(pL.h + t, pL.s + n, pL.l + r);
  }
  add(t) {
    return this.r += t.r, this.g += t.g, this.b += t.b, this;
  }
  addColors(t, n) {
    return this.r = t.r + n.r, this.g = t.g + n.g, this.b = t.b + n.b, this;
  }
  addScalar(t) {
    return this.r += t, this.g += t, this.b += t, this;
  }
  sub(t) {
    return this.r = Math.max(0, this.r - t.r), this.g = Math.max(0, this.g - t.g), this.b = Math.max(0, this.b - t.b), this;
  }
  multiply(t) {
    return this.r *= t.r, this.g *= t.g, this.b *= t.b, this;
  }
  multiplyScalar(t) {
    return this.r *= t, this.g *= t, this.b *= t, this;
  }
  lerp(t, n) {
    return this.r += (t.r - this.r) * n, this.g += (t.g - this.g) * n, this.b += (t.b - this.b) * n, this;
  }
  lerpColors(t, n, r) {
    return this.r = t.r + (n.r - t.r) * r, this.g = t.g + (n.g - t.g) * r, this.b = t.b + (n.b - t.b) * r, this;
  }
  lerpHSL(t, n) {
    this.getHSL(pL), t.getHSL(r8e);
    const r = Ove(pL.h, r8e.h, n),
      a = Ove(pL.s, r8e.s, n),
      i = Ove(pL.l, r8e.l, n);
    return this.setHSL(r, a, i), this;
  }
  setFromVector3(t) {
    return this.r = t.x, this.g = t.y, this.b = t.z, this;
  }
  applyMatrix3(t) {
    const n = this.r,
      r = this.g,
      a = this.b,
      i = t.elements;
    return this.r = i[0] * n + i[3] * r + i[6] * a, this.g = i[1] * n + i[4] * r + i[7] * a, this.b = i[2] * n + i[5] * r + i[8] * a, this;
  }
  equals(t) {
    return t.r === this.r && t.g === this.g && t.b === this.b;
  }
  fromArray(t, n = 0) {
    return this.r = t[n], this.g = t[n + 1], this.b = t[n + 2], this;
  }
  toArray(t = [], n = 0) {
    return t[n] = this.r, t[n + 1] = this.g, t[n + 2] = this.b, t;
  }
  fromBufferAttribute(t, n) {
    return this.r = t.getX(n), this.g = t.getY(n), this.b = t.getZ(n), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}

const Cw = new so();

so.NAMES = Lqn;

class eze {
  constructor(t, n = 1, r = 1e3) {
    this.isFog = !0, this.name = "", this.color = new so(t), this.near = n, this.far = r;
  }
  clone() {
    return new eze(this.color, this.near, this.far);
  }
  toJSON() {
    return {
      type: "Fog",
      name: this.name,
      color: this.color.getHex(),
      near: this.near,
      far: this.far
    };
  }
}

class OD extends Zc {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new xp(), this.environmentIntensity = 1, this.environmentRotation = new xp(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {
      detail: this
    }));
  }
  copy(t, n) {
    return super.copy(t, n), t.background !== null && (this.background = t.background.clone()), t.environment !== null && (this.environment = t.environment.clone()), t.fog !== null && (this.fog = t.fog.clone()), this.backgroundBlurriness = t.backgroundBlurriness, this.backgroundIntensity = t.backgroundIntensity, this.backgroundRotation.copy(t.backgroundRotation), this.environmentIntensity = t.environmentIntensity, this.environmentRotation.copy(t.environmentRotation), t.overrideMaterial !== null && (this.overrideMaterial = t.overrideMaterial.clone()), this.matrixAutoUpdate = t.matrixAutoUpdate, this;
  }
  toJSON(t) {
    const n = super.toJSON(t);
    return this.fog !== null && (n.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (n.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (n.object.backgroundIntensity = this.backgroundIntensity), n.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (n.object.environmentIntensity = this.environmentIntensity), n.object.environmentRotation = this.environmentRotation.toArray(), n;
  }
}

const zI = new dr(),
  K9 = new dr(),
  art = new dr(),
  Q9 = new dr(),
  jee = new dr(),
  Dee = new dr(),
  bZt = new dr(),
  irt = new dr(),
  ort = new dr(),
  srt = new dr(),
  lrt = new Vd(),
  crt = new Vd(),
  drt = new Vd();

class g5 {
  constructor(t = new dr(), n = new dr(), r = new dr()) {
    this.a = t, this.b = n, this.c = r;
  }
  static getNormal(t, n, r, a) {
    a.subVectors(r, n), zI.subVectors(t, n), a.cross(zI);
    const i = a.lengthSq();
    return i > 0 ? a.multiplyScalar(1 / Math.sqrt(i)) : a.set(0, 0, 0);
  }
  static getBarycoord(t, n, r, a, i) {
    zI.subVectors(a, n), K9.subVectors(r, n), art.subVectors(t, n);
    const o = zI.dot(zI),
      s = zI.dot(K9),
      l = zI.dot(art),
      d = K9.dot(K9),
      u = K9.dot(art),
      h = o * d - s * s;
    if (h === 0) return i.set(0, 0, 0), null;
    const p = 1 / h,
      m = (d * l - s * u) * p,
      f = (o * u - s * l) * p;
    return i.set(1 - m - f, f, m);
  }
  static containsPoint(t, n, r, a) {
    return this.getBarycoord(t, n, r, a, Q9) === null ? !1 : Q9.x >= 0 && Q9.y >= 0 && Q9.x + Q9.y <= 1;
  }
  static getInterpolation(t, n, r, a, i, o, s, l) {
    return this.getBarycoord(t, n, r, a, Q9) === null ? (l.x = 0, l.y = 0, "z" in l && (l.z = 0), "w" in l && (l.w = 0), null) : (l.setScalar(0), l.addScaledVector(i, Q9.x), l.addScaledVector(o, Q9.y), l.addScaledVector(s, Q9.z), l);
  }
  static getInterpolatedAttribute(t, n, r, a, i, o) {
    return lrt.setScalar(0), crt.setScalar(0), drt.setScalar(0), lrt.fromBufferAttribute(t, n), crt.fromBufferAttribute(t, r), drt.fromBufferAttribute(t, a), o.setScalar(0), o.addScaledVector(lrt, i.x), o.addScaledVector(crt, i.y), o.addScaledVector(drt, i.z), o;
  }
  static isFrontFacing(t, n, r, a) {
    return zI.subVectors(r, n), K9.subVectors(t, n), zI.cross(K9).dot(a) < 0;
  }
  set(t, n, r) {
    return this.a.copy(t), this.b.copy(n), this.c.copy(r), this;
  }
  setFromPointsAndIndices(t, n, r, a) {
    return this.a.copy(t[n]), this.b.copy(t[r]), this.c.copy(t[a]), this;
  }
  setFromAttributeAndIndices(t, n, r, a) {
    return this.a.fromBufferAttribute(t, n), this.b.fromBufferAttribute(t, r), this.c.fromBufferAttribute(t, a), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this;
  }
  getArea() {
    return zI.subVectors(this.c, this.b), K9.subVectors(this.a, this.b), zI.cross(K9).length() * .5;
  }
  getMidpoint(t) {
    return t.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(t) {
    return g5.getNormal(this.a, this.b, this.c, t);
  }
  getPlane(t) {
    return t.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(t, n) {
    return g5.getBarycoord(t, this.a, this.b, this.c, n);
  }
  getInterpolation(t, n, r, a, i) {
    return g5.getInterpolation(t, this.a, this.b, this.c, n, r, a, i);
  }
  containsPoint(t) {
    return g5.containsPoint(t, this.a, this.b, this.c);
  }
  isFrontFacing(t) {
    return g5.isFrontFacing(this.a, this.b, this.c, t);
  }
  intersectsBox(t) {
    return t.intersectsTriangle(this);
  }
  closestPointToPoint(t, n) {
    const r = this.a,
      a = this.b,
      i = this.c;
    let o, s;
    jee.subVectors(a, r), Dee.subVectors(i, r), irt.subVectors(t, r);
    const l = jee.dot(irt),
      d = Dee.dot(irt);
    if (l <= 0 && d <= 0) return n.copy(r);
    ort.subVectors(t, a);
    const u = jee.dot(ort),
      h = Dee.dot(ort);
    if (u >= 0 && h <= u) return n.copy(a);
    const p = l * h - u * d;
    if (p <= 0 && l >= 0 && u <= 0) return o = l / (l - u), n.copy(r).addScaledVector(jee, o);
    srt.subVectors(t, i);
    const m = jee.dot(srt),
      f = Dee.dot(srt);
    if (f >= 0 && m <= f) return n.copy(i);
    const y = m * d - l * f;
    if (y <= 0 && d >= 0 && f <= 0) return s = d / (d - f), n.copy(r).addScaledVector(Dee, s);
    const b = u * f - m * h;
    if (b <= 0 && h - u >= 0 && m - f >= 0) return bZt.subVectors(i, a), s = (h - u) / (h - u + (m - f)), n.copy(a).addScaledVector(bZt, s);
    const v = 1 / (b + y + p);
    return o = y * v, s = p * v, n.copy(r).addScaledVector(jee, o).addScaledVector(Dee, s);
  }
  equals(t) {
    return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
  }
}

class j0 {
  constructor(t = new dr(1 / 0, 1 / 0, 1 / 0), n = new dr(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = t, this.max = n;
  }
  set(t, n) {
    return this.min.copy(t), this.max.copy(n), this;
  }
  setFromArray(t) {
    this.makeEmpty();
    for (let n = 0, r = t.length; n < r; n += 3) this.expandByPoint(UI.fromArray(t, n));
    return this;
  }
  setFromBufferAttribute(t) {
    this.makeEmpty();
    for (let n = 0, r = t.count; n < r; n++) this.expandByPoint(UI.fromBufferAttribute(t, n));
    return this;
  }
  setFromPoints(t) {
    this.makeEmpty();
    for (let n = 0, r = t.length; n < r; n++) this.expandByPoint(t[n]);
    return this;
  }
  setFromCenterAndSize(t, n) {
    const r = UI.copy(n).multiplyScalar(.5);
    return this.min.copy(t).sub(r), this.max.copy(t).add(r), this;
  }
  setFromObject(t, n = !1) {
    return this.makeEmpty(), this.expandByObject(t, n);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.min.copy(t.min), this.max.copy(t.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(t) {
    return this.isEmpty() ? t.set(0, 0, 0) : t.addVectors(this.min, this.max).multiplyScalar(.5);
  }
  getSize(t) {
    return this.isEmpty() ? t.set(0, 0, 0) : t.subVectors(this.max, this.min);
  }
  expandByPoint(t) {
    return this.min.min(t), this.max.max(t), this;
  }
  expandByVector(t) {
    return this.min.sub(t), this.max.add(t), this;
  }
  expandByScalar(t) {
    return this.min.addScalar(-t), this.max.addScalar(t), this;
  }
  expandByObject(t, n = !1) {
    t.updateWorldMatrix(!1, !1);
    const r = t.geometry;
    if (r !== void 0) {
      const i = r.getAttribute("position");
      if (n === !0 && i !== void 0 && t.isInstancedMesh !== !0) for (let o = 0, s = i.count; o < s; o++) t.isMesh === !0 ? t.getVertexPosition(o, UI) : UI.fromBufferAttribute(i, o), UI.applyMatrix4(t.matrixWorld), this.expandByPoint(UI);else t.boundingBox !== void 0 ? (t.boundingBox === null && t.computeBoundingBox(), a8e.copy(t.boundingBox)) : (r.boundingBox === null && r.computeBoundingBox(), a8e.copy(r.boundingBox)), a8e.applyMatrix4(t.matrixWorld), this.union(a8e);
    }
    const a = t.children;
    for (let i = 0, o = a.length; i < o; i++) this.expandByObject(a[i], n);
    return this;
  }
  containsPoint(t) {
    return t.x >= this.min.x && t.x <= this.max.x && t.y >= this.min.y && t.y <= this.max.y && t.z >= this.min.z && t.z <= this.max.z;
  }
  containsBox(t) {
    return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y && this.min.z <= t.min.z && t.max.z <= this.max.z;
  }
  getParameter(t, n) {
    return n.set((t.x - this.min.x) / (this.max.x - this.min.x), (t.y - this.min.y) / (this.max.y - this.min.y), (t.z - this.min.z) / (this.max.z - this.min.z));
  }
  intersectsBox(t) {
    return t.max.x >= this.min.x && t.min.x <= this.max.x && t.max.y >= this.min.y && t.min.y <= this.max.y && t.max.z >= this.min.z && t.min.z <= this.max.z;
  }
  intersectsSphere(t) {
    return this.clampPoint(t.center, UI), UI.distanceToSquared(t.center) <= t.radius * t.radius;
  }
  intersectsPlane(t) {
    let n, r;
    return t.normal.x > 0 ? (n = t.normal.x * this.min.x, r = t.normal.x * this.max.x) : (n = t.normal.x * this.max.x, r = t.normal.x * this.min.x), t.normal.y > 0 ? (n += t.normal.y * this.min.y, r += t.normal.y * this.max.y) : (n += t.normal.y * this.max.y, r += t.normal.y * this.min.y), t.normal.z > 0 ? (n += t.normal.z * this.min.z, r += t.normal.z * this.max.z) : (n += t.normal.z * this.max.z, r += t.normal.z * this.min.z), n <= -t.constant && r >= -t.constant;
  }
  intersectsTriangle(t) {
    if (this.isEmpty()) return !1;
    this.getCenter(Cme), i8e.subVectors(this.max, Cme), Lee.subVectors(t.a, Cme), Oee.subVectors(t.b, Cme), Bee.subVectors(t.c, Cme), mL.subVectors(Oee, Lee), fL.subVectors(Bee, Oee), RG.subVectors(Lee, Bee);
    let n = [0, -mL.z, mL.y, 0, -fL.z, fL.y, 0, -RG.z, RG.y, mL.z, 0, -mL.x, fL.z, 0, -fL.x, RG.z, 0, -RG.x, -mL.y, mL.x, 0, -fL.y, fL.x, 0, -RG.y, RG.x, 0];
    return !urt(n, Lee, Oee, Bee, i8e) || (n = [1, 0, 0, 0, 1, 0, 0, 0, 1], !urt(n, Lee, Oee, Bee, i8e)) ? !1 : (o8e.crossVectors(mL, fL), n = [o8e.x, o8e.y, o8e.z], urt(n, Lee, Oee, Bee, i8e));
  }
  clampPoint(t, n) {
    return n.copy(t).clamp(this.min, this.max);
  }
  distanceToPoint(t) {
    return this.clampPoint(t, UI).distanceTo(t);
  }
  getBoundingSphere(t) {
    return this.isEmpty() ? t.makeEmpty() : (this.getCenter(t.center), t.radius = this.getSize(UI).length() * .5), t;
  }
  intersect(t) {
    return this.min.max(t.min), this.max.min(t.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(t) {
    return this.min.min(t.min), this.max.max(t.max), this;
  }
  applyMatrix4(t) {
    return this.isEmpty() ? this : (Y9[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t), Y9[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t), Y9[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t), Y9[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t), Y9[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t), Y9[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t), Y9[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t), Y9[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t), this.setFromPoints(Y9), this);
  }
  translate(t) {
    return this.min.add(t), this.max.add(t), this;
  }
  equals(t) {
    return t.min.equals(this.min) && t.max.equals(this.max);
  }
  toJSON() {
    return {
      min: this.min.toArray(),
      max: this.max.toArray()
    };
  }
  fromJSON(t) {
    return this.min.fromArray(t.min), this.max.fromArray(t.max), this;
  }
}

const Y9 = [new dr(), new dr(), new dr(), new dr(), new dr(), new dr(), new dr(), new dr()],
  UI = new dr(),
  a8e = new j0(),
  Lee = new dr(),
  Oee = new dr(),
  Bee = new dr(),
  mL = new dr(),
  fL = new dr(),
  RG = new dr(),
  Cme = new dr(),
  i8e = new dr(),
  o8e = new dr(),
  NG = new dr();

function urt(e, t, n, r, a) {
  for (let i = 0, o = e.length - 3; i <= o; i += 3) {
    NG.fromArray(e, i);
    const s = a.x * Math.abs(NG.x) + a.y * Math.abs(NG.y) + a.z * Math.abs(NG.z),
      l = t.dot(NG),
      d = n.dot(NG),
      u = r.dot(NG);
    if (Math.max(-Math.max(l, d, u), Math.min(l, d, u)) > s) return !1;
  }
  return !0;
}

const YN = Fwa();

function Fwa() {
  const e = new ArrayBuffer(4),
    t = new Float32Array(e),
    n = new Uint32Array(e),
    r = new Uint32Array(512),
    a = new Uint32Array(512);
  for (let l = 0; l < 256; ++l) {
    const d = l - 127;
    d < -27 ? (r[l] = 0, r[l | 256] = 32768, a[l] = 24, a[l | 256] = 24) : d < -14 ? (r[l] = 1024 >> -d - 14, r[l | 256] = 1024 >> -d - 14 | 32768, a[l] = -d - 1, a[l | 256] = -d - 1) : d <= 15 ? (r[l] = d + 15 << 10, r[l | 256] = d + 15 << 10 | 32768, a[l] = 13, a[l | 256] = 13) : d < 128 ? (r[l] = 31744, r[l | 256] = 64512, a[l] = 24, a[l | 256] = 24) : (r[l] = 31744, r[l | 256] = 64512, a[l] = 13, a[l | 256] = 13);
  }
  const i = new Uint32Array(2048),
    o = new Uint32Array(64),
    s = new Uint32Array(64);
  for (let l = 1; l < 1024; ++l) {
    let d = l << 13,
      u = 0;
    for (; (d & 8388608) === 0;) d <<= 1, u -= 8388608;
    d &= -8388609, u += 947912704, i[l] = d | u;
  }
  for (let l = 1024; l < 2048; ++l) i[l] = 939524096 + (l - 1024 << 13);
  for (let l = 1; l < 31; ++l) o[l] = l << 23;
  o[31] = 1199570944, o[32] = 2147483648;
  for (let l = 33; l < 63; ++l) o[l] = 2147483648 + (l - 32 << 23);
  o[63] = 3347054592;
  for (let l = 1; l < 64; ++l) l !== 32 && (s[l] = 1024);
  return {
    floatView: t,
    uint32View: n,
    baseTable: r,
    shiftTable: a,
    mantissaTable: i,
    exponentTable: o,
    offsetTable: s
  };
}

function zwa(e) {
  Math.abs(e) > 65504 && Es("DataUtils.toHalfFloat(): Value out of range."), e = Dl(e, -65504, 65504), YN.floatView[0] = e;
  const t = YN.uint32View[0],
    n = t >> 23 & 511;
  return YN.baseTable[n] + ((t & 8388607) >> YN.shiftTable[n]);
}

function Uwa(e) {
  const t = e >> 10;
  return YN.uint32View[0] = YN.mantissaTable[YN.offsetTable[t] + (e & 1023)] + YN.exponentTable[t], YN.floatView[0];
}

class vZt {
  static toHalfFloat(t) {
    return zwa(t);
  }
  static fromHalfFloat(t) {
    return Uwa(t);
  }
}

const W0 = new dr(),
  s8e = new Qi();

let $wa = 0;

class Z1 {
  constructor(t, n, r = !1) {
    if (Array.isArray(t)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, Object.defineProperty(this, "id", {
      value: $wa++
    }), this.name = "", this.array = t, this.itemSize = n, this.count = t !== void 0 ? t.length / n : 0, this.normalized = r, this.usage = bvt, this.updateRanges = [], this.gpuType = Ck, this.version = 0;
  }
  onUploadCallback() {}
  set needsUpdate(t) {
    t === !0 && this.version++;
  }
  setUsage(t) {
    return this.usage = t, this;
  }
  addUpdateRange(t, n) {
    this.updateRanges.push({
      start: t,
      count: n
    });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(t) {
    return this.name = t.name, this.array = new t.array.constructor(t.array), this.itemSize = t.itemSize, this.count = t.count, this.normalized = t.normalized, this.usage = t.usage, this.gpuType = t.gpuType, this;
  }
  copyAt(t, n, r) {
    t *= this.itemSize, r *= n.itemSize;
    for (let a = 0, i = this.itemSize; a < i; a++) this.array[t + a] = n.array[r + a];
    return this;
  }
  copyArray(t) {
    return this.array.set(t), this;
  }
  applyMatrix3(t) {
    if (this.itemSize === 2) for (let n = 0, r = this.count; n < r; n++) s8e.fromBufferAttribute(this, n), s8e.applyMatrix3(t), this.setXY(n, s8e.x, s8e.y);else if (this.itemSize === 3) for (let n = 0, r = this.count; n < r; n++) W0.fromBufferAttribute(this, n), W0.applyMatrix3(t), this.setXYZ(n, W0.x, W0.y, W0.z);
    return this;
  }
  applyMatrix4(t) {
    for (let n = 0, r = this.count; n < r; n++) W0.fromBufferAttribute(this, n), W0.applyMatrix4(t), this.setXYZ(n, W0.x, W0.y, W0.z);
    return this;
  }
  applyNormalMatrix(t) {
    for (let n = 0, r = this.count; n < r; n++) W0.fromBufferAttribute(this, n), W0.applyNormalMatrix(t), this.setXYZ(n, W0.x, W0.y, W0.z);
    return this;
  }
  transformDirection(t) {
    for (let n = 0, r = this.count; n < r; n++) W0.fromBufferAttribute(this, n), W0.transformDirection(t), this.setXYZ(n, W0.x, W0.y, W0.z);
    return this;
  }
  set(t, n = 0) {
    return this.array.set(t, n), this;
  }
  getComponent(t, n) {
    let r = this.array[t * this.itemSize + n];
    return this.normalized && (r = nE(r, this.array)), r;
  }
  setComponent(t, n, r) {
    return this.normalized && (r = $h(r, this.array)), this.array[t * this.itemSize + n] = r, this;
  }
  getX(t) {
    let n = this.array[t * this.itemSize];
    return this.normalized && (n = nE(n, this.array)), n;
  }
  setX(t, n) {
    return this.normalized && (n = $h(n, this.array)), this.array[t * this.itemSize] = n, this;
  }
  getY(t) {
    let n = this.array[t * this.itemSize + 1];
    return this.normalized && (n = nE(n, this.array)), n;
  }
  setY(t, n) {
    return this.normalized && (n = $h(n, this.array)), this.array[t * this.itemSize + 1] = n, this;
  }
  getZ(t) {
    let n = this.array[t * this.itemSize + 2];
    return this.normalized && (n = nE(n, this.array)), n;
  }
  setZ(t, n) {
    return this.normalized && (n = $h(n, this.array)), this.array[t * this.itemSize + 2] = n, this;
  }
  getW(t) {
    let n = this.array[t * this.itemSize + 3];
    return this.normalized && (n = nE(n, this.array)), n;
  }
  setW(t, n) {
    return this.normalized && (n = $h(n, this.array)), this.array[t * this.itemSize + 3] = n, this;
  }
  setXY(t, n, r) {
    return t *= this.itemSize, this.normalized && (n = $h(n, this.array), r = $h(r, this.array)), this.array[t + 0] = n, this.array[t + 1] = r, this;
  }
  setXYZ(t, n, r, a) {
    return t *= this.itemSize, this.normalized && (n = $h(n, this.array), r = $h(r, this.array), a = $h(a, this.array)), this.array[t + 0] = n, this.array[t + 1] = r, this.array[t + 2] = a, this;
  }
  setXYZW(t, n, r, a, i) {
    return t *= this.itemSize, this.normalized && (n = $h(n, this.array), r = $h(r, this.array), a = $h(a, this.array), i = $h(i, this.array)), this.array[t + 0] = n, this.array[t + 1] = r, this.array[t + 2] = a, this.array[t + 3] = i, this;
  }
  onUpload(t) {
    return this.onUploadCallback = t, this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const t = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return this.name !== "" && (t.name = this.name), this.usage !== bvt && (t.usage = this.usage), t;
  }
}

class Qjt extends Z1 {
  constructor(t, n, r) {
    super(new Uint16Array(t), n, r);
  }
}

class Oqn extends Z1 {
  constructor(t, n, r) {
    super(new Uint32Array(t), n, r);
  }
}

class Al extends Z1 {
  constructor(t, n, r) {
    super(new Float32Array(t), n, r);
  }
}

const Gwa = new j0(),
  Eme = new dr(),
  hrt = new dr();

class mI {
  constructor(t = new dr(), n = -1) {
    this.isSphere = !0, this.center = t, this.radius = n;
  }
  set(t, n) {
    return this.center.copy(t), this.radius = n, this;
  }
  setFromPoints(t, n) {
    const r = this.center;
    n !== void 0 ? r.copy(n) : Gwa.setFromPoints(t).getCenter(r);
    let a = 0;
    for (let i = 0, o = t.length; i < o; i++) a = Math.max(a, r.distanceToSquared(t[i]));
    return this.radius = Math.sqrt(a), this;
  }
  copy(t) {
    return this.center.copy(t.center), this.radius = t.radius, this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  containsPoint(t) {
    return t.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(t) {
    return t.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(t) {
    const n = this.radius + t.radius;
    return t.center.distanceToSquared(this.center) <= n * n;
  }
  intersectsBox(t) {
    return t.intersectsSphere(this);
  }
  intersectsPlane(t) {
    return Math.abs(t.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(t, n) {
    const r = this.center.distanceToSquared(t);
    return n.copy(t), r > this.radius * this.radius && (n.sub(this.center).normalize(), n.multiplyScalar(this.radius).add(this.center)), n;
  }
  getBoundingBox(t) {
    return this.isEmpty() ? (t.makeEmpty(), t) : (t.set(this.center, this.center), t.expandByScalar(this.radius), t);
  }
  applyMatrix4(t) {
    return this.center.applyMatrix4(t), this.radius = this.radius * t.getMaxScaleOnAxis(), this;
  }
  translate(t) {
    return this.center.add(t), this;
  }
  expandByPoint(t) {
    if (this.isEmpty()) return this.center.copy(t), this.radius = 0, this;
    Eme.subVectors(t, this.center);
    const n = Eme.lengthSq();
    if (n > this.radius * this.radius) {
      const r = Math.sqrt(n),
        a = (r - this.radius) * .5;
      this.center.addScaledVector(Eme, a / r), this.radius += a;
    }
    return this;
  }
  union(t) {
    return t.isEmpty() ? this : this.isEmpty() ? (this.copy(t), this) : (this.center.equals(t.center) === !0 ? this.radius = Math.max(this.radius, t.radius) : (hrt.subVectors(t.center, this.center).setLength(t.radius), this.expandByPoint(Eme.copy(t.center).add(hrt)), this.expandByPoint(Eme.copy(t.center).sub(hrt))), this);
  }
  equals(t) {
    return t.center.equals(this.center) && t.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    return {
      radius: this.radius,
      center: this.center.toArray()
    };
  }
  fromJSON(t) {
    return this.radius = t.radius, this.center.fromArray(t.center), this;
  }
}

let Vwa = 0;

const l4 = new bo(),
  prt = new Zc(),
  Fee = new dr(),
  EA = new j0(),
  Tme = new j0(),
  nv = new dr();

class Fd extends dG {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", {
      value: Vwa++
    }), this.uuid = H5(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.indirectOffset = 0, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
      start: 0,
      count: 1 / 0
    }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(t) {
    return Array.isArray(t) ? this.index = new (iwa(t) ? Oqn : Qjt)(t, 1) : this.index = t, this;
  }
  setIndirect(t, n = 0) {
    return this.indirect = t, this.indirectOffset = n, this;
  }
  getIndirect() {
    return this.indirect;
  }
  getAttribute(t) {
    return this.attributes[t];
  }
  setAttribute(t, n) {
    return this.attributes[t] = n, this;
  }
  deleteAttribute(t) {
    return delete this.attributes[t], this;
  }
  hasAttribute(t) {
    return this.attributes[t] !== void 0;
  }
  addGroup(t, n, r = 0) {
    this.groups.push({
      start: t,
      count: n,
      materialIndex: r
    });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(t, n) {
    this.drawRange.start = t, this.drawRange.count = n;
  }
  applyMatrix4(t) {
    const n = this.attributes.position;
    n !== void 0 && (n.applyMatrix4(t), n.needsUpdate = !0);
    const r = this.attributes.normal;
    if (r !== void 0) {
      const i = new Tc().getNormalMatrix(t);
      r.applyNormalMatrix(i), r.needsUpdate = !0;
    }
    const a = this.attributes.tangent;
    return a !== void 0 && (a.transformDirection(t), a.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  applyQuaternion(t) {
    return l4.makeRotationFromQuaternion(t), this.applyMatrix4(l4), this;
  }
  rotateX(t) {
    return l4.makeRotationX(t), this.applyMatrix4(l4), this;
  }
  rotateY(t) {
    return l4.makeRotationY(t), this.applyMatrix4(l4), this;
  }
  rotateZ(t) {
    return l4.makeRotationZ(t), this.applyMatrix4(l4), this;
  }
  translate(t, n, r) {
    return l4.makeTranslation(t, n, r), this.applyMatrix4(l4), this;
  }
  scale(t, n, r) {
    return l4.makeScale(t, n, r), this.applyMatrix4(l4), this;
  }
  lookAt(t) {
    return prt.lookAt(t), prt.updateMatrix(), this.applyMatrix4(prt.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(Fee).negate(), this.translate(Fee.x, Fee.y, Fee.z), this;
  }
  setFromPoints(t) {
    const n = this.getAttribute("position");
    if (n === void 0) {
      const r = [];
      for (let a = 0, i = t.length; a < i; a++) {
        const o = t[a];
        r.push(o.x, o.y, o.z || 0);
      }
      this.setAttribute("position", new Al(r, 3));
    } else {
      const r = Math.min(t.length, n.count);
      for (let a = 0; a < r; a++) {
        const i = t[a];
        n.setXYZ(a, i.x, i.y, i.z || 0);
      }
      t.length > n.count && Es("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), n.needsUpdate = !0;
    }
    return this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new j0());
    const t = this.attributes.position,
      n = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      vl("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(new dr(-1 / 0, -1 / 0, -1 / 0), new dr(1 / 0, 1 / 0, 1 / 0));
      return;
    }
    if (t !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(t), n) for (let r = 0, a = n.length; r < a; r++) {
        const i = n[r];
        EA.setFromBufferAttribute(i), this.morphTargetsRelative ? (nv.addVectors(this.boundingBox.min, EA.min), this.boundingBox.expandByPoint(nv), nv.addVectors(this.boundingBox.max, EA.max), this.boundingBox.expandByPoint(nv)) : (this.boundingBox.expandByPoint(EA.min), this.boundingBox.expandByPoint(EA.max));
      }
    } else this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && vl('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new mI());
    const t = this.attributes.position,
      n = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      vl("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new dr(), 1 / 0);
      return;
    }
    if (t) {
      const r = this.boundingSphere.center;
      if (EA.setFromBufferAttribute(t), n) for (let i = 0, o = n.length; i < o; i++) {
        const s = n[i];
        Tme.setFromBufferAttribute(s), this.morphTargetsRelative ? (nv.addVectors(EA.min, Tme.min), EA.expandByPoint(nv), nv.addVectors(EA.max, Tme.max), EA.expandByPoint(nv)) : (EA.expandByPoint(Tme.min), EA.expandByPoint(Tme.max));
      }
      EA.getCenter(r);
      let a = 0;
      for (let i = 0, o = t.count; i < o; i++) nv.fromBufferAttribute(t, i), a = Math.max(a, r.distanceToSquared(nv));
      if (n) for (let i = 0, o = n.length; i < o; i++) {
        const s = n[i],
          l = this.morphTargetsRelative;
        for (let d = 0, u = s.count; d < u; d++) nv.fromBufferAttribute(s, d), l && (Fee.fromBufferAttribute(t, d), nv.add(Fee)), a = Math.max(a, r.distanceToSquared(nv));
      }
      this.boundingSphere.radius = Math.sqrt(a), isNaN(this.boundingSphere.radius) && vl('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const t = this.index,
      n = this.attributes;
    if (t === null || n.position === void 0 || n.normal === void 0 || n.uv === void 0) {
      vl("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const r = n.position,
      a = n.normal,
      i = n.uv;
    this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new Z1(new Float32Array(4 * r.count), 4));
    const o = this.getAttribute("tangent"),
      s = [],
      l = [];
    for (let I = 0; I < r.count; I++) s[I] = new dr(), l[I] = new dr();
    const d = new dr(),
      u = new dr(),
      h = new dr(),
      p = new Qi(),
      m = new Qi(),
      f = new Qi(),
      y = new dr(),
      b = new dr();
    function v(I, E, M) {
      d.fromBufferAttribute(r, I), u.fromBufferAttribute(r, E), h.fromBufferAttribute(r, M), p.fromBufferAttribute(i, I), m.fromBufferAttribute(i, E), f.fromBufferAttribute(i, M), u.sub(d), h.sub(d), m.sub(p), f.sub(p);
      const T = 1 / (m.x * f.y - f.x * m.y);
      isFinite(T) && (y.copy(u).multiplyScalar(f.y).addScaledVector(h, -m.y).multiplyScalar(T), b.copy(h).multiplyScalar(m.x).addScaledVector(u, -f.x).multiplyScalar(T), s[I].add(y), s[E].add(y), s[M].add(y), l[I].add(b), l[E].add(b), l[M].add(b));
    }
    let _ = this.groups;
    _.length === 0 && (_ = [{
      start: 0,
      count: t.count
    }]);
    for (let I = 0, E = _.length; I < E; ++I) {
      const M = _[I],
        T = M.start,
        P = M.count;
      for (let R = T, j = T + P; R < j; R += 3) v(t.getX(R + 0), t.getX(R + 1), t.getX(R + 2));
    }
    const w = new dr(),
      k = new dr(),
      A = new dr(),
      S = new dr();
    function C(I) {
      A.fromBufferAttribute(a, I), S.copy(A);
      const E = s[I];
      w.copy(E), w.sub(A.multiplyScalar(A.dot(E))).normalize(), k.crossVectors(S, E);
      const T = k.dot(l[I]) < 0 ? -1 : 1;
      o.setXYZW(I, w.x, w.y, w.z, T);
    }
    for (let I = 0, E = _.length; I < E; ++I) {
      const M = _[I],
        T = M.start,
        P = M.count;
      for (let R = T, j = T + P; R < j; R += 3) C(t.getX(R + 0)), C(t.getX(R + 1)), C(t.getX(R + 2));
    }
  }
  computeVertexNormals() {
    const t = this.index,
      n = this.getAttribute("position");
    if (n !== void 0) {
      let r = this.getAttribute("normal");
      if (r === void 0) r = new Z1(new Float32Array(n.count * 3), 3), this.setAttribute("normal", r);else for (let p = 0, m = r.count; p < m; p++) r.setXYZ(p, 0, 0, 0);
      const a = new dr(),
        i = new dr(),
        o = new dr(),
        s = new dr(),
        l = new dr(),
        d = new dr(),
        u = new dr(),
        h = new dr();
      if (t) for (let p = 0, m = t.count; p < m; p += 3) {
        const f = t.getX(p + 0),
          y = t.getX(p + 1),
          b = t.getX(p + 2);
        a.fromBufferAttribute(n, f), i.fromBufferAttribute(n, y), o.fromBufferAttribute(n, b), u.subVectors(o, i), h.subVectors(a, i), u.cross(h), s.fromBufferAttribute(r, f), l.fromBufferAttribute(r, y), d.fromBufferAttribute(r, b), s.add(u), l.add(u), d.add(u), r.setXYZ(f, s.x, s.y, s.z), r.setXYZ(y, l.x, l.y, l.z), r.setXYZ(b, d.x, d.y, d.z);
      } else for (let p = 0, m = n.count; p < m; p += 3) a.fromBufferAttribute(n, p + 0), i.fromBufferAttribute(n, p + 1), o.fromBufferAttribute(n, p + 2), u.subVectors(o, i), h.subVectors(a, i), u.cross(h), r.setXYZ(p + 0, u.x, u.y, u.z), r.setXYZ(p + 1, u.x, u.y, u.z), r.setXYZ(p + 2, u.x, u.y, u.z);
      this.normalizeNormals(), r.needsUpdate = !0;
    }
  }
  normalizeNormals() {
    const t = this.attributes.normal;
    for (let n = 0, r = t.count; n < r; n++) nv.fromBufferAttribute(t, n), nv.normalize(), t.setXYZ(n, nv.x, nv.y, nv.z);
  }
  toNonIndexed() {
    function t(s, l) {
      const d = s.array,
        u = s.itemSize,
        h = s.normalized,
        p = new d.constructor(l.length * u);
      let m = 0,
        f = 0;
      for (let y = 0, b = l.length; y < b; y++) {
        s.isInterleavedBufferAttribute ? m = l[y] * s.data.stride + s.offset : m = l[y] * u;
        for (let v = 0; v < u; v++) p[f++] = d[m++];
      }
      return new Z1(p, u, h);
    }
    if (this.index === null) return Es("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const n = new Fd(),
      r = this.index.array,
      a = this.attributes;
    for (const s in a) {
      const l = a[s],
        d = t(l, r);
      n.setAttribute(s, d);
    }
    const i = this.morphAttributes;
    for (const s in i) {
      const l = [],
        d = i[s];
      for (let u = 0, h = d.length; u < h; u++) {
        const p = d[u],
          m = t(p, r);
        l.push(m);
      }
      n.morphAttributes[s] = l;
    }
    n.morphTargetsRelative = this.morphTargetsRelative;
    const o = this.groups;
    for (let s = 0, l = o.length; s < l; s++) {
      const d = o[s];
      n.addGroup(d.start, d.count, d.materialIndex);
    }
    return n;
  }
  toJSON() {
    const t = {
      metadata: {
        version: 4.7,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (t.uuid = this.uuid, t.type = this.type, this.name !== "" && (t.name = this.name), Object.keys(this.userData).length > 0 && (t.userData = this.userData), this.parameters !== void 0) {
      const l = this.parameters;
      for (const d in l) l[d] !== void 0 && (t[d] = l[d]);
      return t;
    }
    t.data = {
      attributes: {}
    };
    const n = this.index;
    n !== null && (t.data.index = {
      type: n.array.constructor.name,
      array: Array.prototype.slice.call(n.array)
    });
    const r = this.attributes;
    for (const l in r) {
      const d = r[l];
      t.data.attributes[l] = d.toJSON(t.data);
    }
    const a = {};
    let i = !1;
    for (const l in this.morphAttributes) {
      const d = this.morphAttributes[l],
        u = [];
      for (let h = 0, p = d.length; h < p; h++) {
        const m = d[h];
        u.push(m.toJSON(t.data));
      }
      u.length > 0 && (a[l] = u, i = !0);
    }
    i && (t.data.morphAttributes = a, t.data.morphTargetsRelative = this.morphTargetsRelative);
    const o = this.groups;
    o.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(o)));
    const s = this.boundingSphere;
    return s !== null && (t.data.boundingSphere = s.toJSON()), t;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const n = {};
    this.name = t.name;
    const r = t.index;
    r !== null && this.setIndex(r.clone());
    const a = t.attributes;
    for (const d in a) {
      const u = a[d];
      this.setAttribute(d, u.clone(n));
    }
    const i = t.morphAttributes;
    for (const d in i) {
      const u = [],
        h = i[d];
      for (let p = 0, m = h.length; p < m; p++) u.push(h[p].clone(n));
      this.morphAttributes[d] = u;
    }
    this.morphTargetsRelative = t.morphTargetsRelative;
    const o = t.groups;
    for (let d = 0, u = o.length; d < u; d++) {
      const h = o[d];
      this.addGroup(h.start, h.count, h.materialIndex);
    }
    const s = t.boundingBox;
    s !== null && (this.boundingBox = s.clone());
    const l = t.boundingSphere;
    return l !== null && (this.boundingSphere = l.clone()), this.drawRange.start = t.drawRange.start, this.drawRange.count = t.drawRange.count, this.userData = t.userData, this;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
}

class Yjt {
  constructor(t, n) {
    this.isInterleavedBuffer = !0, this.array = t, this.stride = n, this.count = t !== void 0 ? t.length / n : 0, this.usage = bvt, this.updateRanges = [], this.version = 0, this.uuid = H5();
  }
  onUploadCallback() {}
  set needsUpdate(t) {
    t === !0 && this.version++;
  }
  setUsage(t) {
    return this.usage = t, this;
  }
  addUpdateRange(t, n) {
    this.updateRanges.push({
      start: t,
      count: n
    });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(t) {
    return this.array = new t.array.constructor(t.array), this.count = t.count, this.stride = t.stride, this.usage = t.usage, this;
  }
  copyAt(t, n, r) {
    t *= this.stride, r *= n.stride;
    for (let a = 0, i = this.stride; a < i; a++) this.array[t + a] = n.array[r + a];
    return this;
  }
  set(t, n = 0) {
    return this.array.set(t, n), this;
  }
  clone(t) {
    t.arrayBuffers === void 0 && (t.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = H5()), t.arrayBuffers[this.array.buffer._uuid] === void 0 && (t.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer);
    const n = new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),
      r = new this.constructor(n, this.stride);
    return r.setUsage(this.usage), r;
  }
  onUpload(t) {
    return this.onUploadCallback = t, this;
  }
  toJSON(t) {
    return t.arrayBuffers === void 0 && (t.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = H5()), t.arrayBuffers[this.array.buffer._uuid] === void 0 && (t.arrayBuffers[this.array.buffer._uuid] = Array.from(new Uint32Array(this.array.buffer))), {
      uuid: this.uuid,
      buffer: this.array.buffer._uuid,
      type: this.array.constructor.name,
      stride: this.stride
    };
  }
}

const Xx = new dr();

class mE {
  constructor(t, n, r, a = !1) {
    this.isInterleavedBufferAttribute = !0, this.name = "", this.data = t, this.itemSize = n, this.offset = r, this.normalized = a;
  }
  get count() {
    return this.data.count;
  }
  get array() {
    return this.data.array;
  }
  set needsUpdate(t) {
    this.data.needsUpdate = t;
  }
  applyMatrix4(t) {
    for (let n = 0, r = this.data.count; n < r; n++) Xx.fromBufferAttribute(this, n), Xx.applyMatrix4(t), this.setXYZ(n, Xx.x, Xx.y, Xx.z);
    return this;
  }
  applyNormalMatrix(t) {
    for (let n = 0, r = this.count; n < r; n++) Xx.fromBufferAttribute(this, n), Xx.applyNormalMatrix(t), this.setXYZ(n, Xx.x, Xx.y, Xx.z);
    return this;
  }
  transformDirection(t) {
    for (let n = 0, r = this.count; n < r; n++) Xx.fromBufferAttribute(this, n), Xx.transformDirection(t), this.setXYZ(n, Xx.x, Xx.y, Xx.z);
    return this;
  }
  getComponent(t, n) {
    let r = this.array[t * this.data.stride + this.offset + n];
    return this.normalized && (r = nE(r, this.array)), r;
  }
  setComponent(t, n, r) {
    return this.normalized && (r = $h(r, this.array)), this.data.array[t * this.data.stride + this.offset + n] = r, this;
  }
  setX(t, n) {
    return this.normalized && (n = $h(n, this.array)), this.data.array[t * this.data.stride + this.offset] = n, this;
  }
  setY(t, n) {
    return this.normalized && (n = $h(n, this.array)), this.data.array[t * this.data.stride + this.offset + 1] = n, this;
  }
  setZ(t, n) {
    return this.normalized && (n = $h(n, this.array)), this.data.array[t * this.data.stride + this.offset + 2] = n, this;
  }
  setW(t, n) {
    return this.normalized && (n = $h(n, this.array)), this.data.array[t * this.data.stride + this.offset + 3] = n, this;
  }
  getX(t) {
    let n = this.data.array[t * this.data.stride + this.offset];
    return this.normalized && (n = nE(n, this.array)), n;
  }
  getY(t) {
    let n = this.data.array[t * this.data.stride + this.offset + 1];
    return this.normalized && (n = nE(n, this.array)), n;
  }
  getZ(t) {
    let n = this.data.array[t * this.data.stride + this.offset + 2];
    return this.normalized && (n = nE(n, this.array)), n;
  }
  getW(t) {
    let n = this.data.array[t * this.data.stride + this.offset + 3];
    return this.normalized && (n = nE(n, this.array)), n;
  }
  setXY(t, n, r) {
    return t = t * this.data.stride + this.offset, this.normalized && (n = $h(n, this.array), r = $h(r, this.array)), this.data.array[t + 0] = n, this.data.array[t + 1] = r, this;
  }
  setXYZ(t, n, r, a) {
    return t = t * this.data.stride + this.offset, this.normalized && (n = $h(n, this.array), r = $h(r, this.array), a = $h(a, this.array)), this.data.array[t + 0] = n, this.data.array[t + 1] = r, this.data.array[t + 2] = a, this;
  }
  setXYZW(t, n, r, a, i) {
    return t = t * this.data.stride + this.offset, this.normalized && (n = $h(n, this.array), r = $h(r, this.array), a = $h(a, this.array), i = $h(i, this.array)), this.data.array[t + 0] = n, this.data.array[t + 1] = r, this.data.array[t + 2] = a, this.data.array[t + 3] = i, this;
  }
  clone(t) {
    if (t === void 0) {
      JFe("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");
      const n = [];
      for (let r = 0; r < this.count; r++) {
        const a = r * this.data.stride + this.offset;
        for (let i = 0; i < this.itemSize; i++) n.push(this.data.array[a + i]);
      }
      return new Z1(new this.array.constructor(n), this.itemSize, this.normalized);
    } else return t.interleavedBuffers === void 0 && (t.interleavedBuffers = {}), t.interleavedBuffers[this.data.uuid] === void 0 && (t.interleavedBuffers[this.data.uuid] = this.data.clone(t)), new mE(t.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized);
  }
  toJSON(t) {
    if (t === void 0) {
      JFe("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");
      const n = [];
      for (let r = 0; r < this.count; r++) {
        const a = r * this.data.stride + this.offset;
        for (let i = 0; i < this.itemSize; i++) n.push(this.data.array[a + i]);
      }
      return {
        itemSize: this.itemSize,
        type: this.array.constructor.name,
        array: n,
        normalized: this.normalized
      };
    } else return t.interleavedBuffers === void 0 && (t.interleavedBuffers = {}), t.interleavedBuffers[this.data.uuid] === void 0 && (t.interleavedBuffers[this.data.uuid] = this.data.toJSON(t)), {
      isInterleavedBufferAttribute: !0,
      itemSize: this.itemSize,
      data: this.data.uuid,
      offset: this.offset,
      normalized: this.normalized
    };
  }
}

let Hwa = 0;

class Bk extends dG {
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", {
      value: Hwa++
    }), this.uuid = H5(), this.name = "", this.type = "Material", this.blending = Sie, this.side = uT, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = Mbt, this.blendDst = Pbt, this.blendEquation = mH, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new so(0, 0, 0), this.blendAlpha = 0, this.depthFunc = tde, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = aZt, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = Tee, this.stencilZFail = Tee, this.stencilZPass = Tee, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.allowOverride = !0, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(t) {
    this._alphaTest > 0 != t > 0 && this.version++, this._alphaTest = t;
  }
  onBeforeRender() {}
  onBeforeCompile() {}
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(t) {
    if (t !== void 0) for (const n in t) {
      const r = t[n];
      if (r === void 0) {
        Es(`Material: parameter '${n}' has value of undefined.`);
        continue;
      }
      const a = this[n];
      if (a === void 0) {
        Es(`Material: '${n}' is not a property of THREE.${this.type}.`);
        continue;
      }
      a && a.isColor ? a.set(r) : a && a.isVector3 && r && r.isVector3 ? a.copy(r) : this[n] = r;
    }
  }
  toJSON(t) {
    const n = t === void 0 || typeof t == "string";
    n && (t = {
      textures: {},
      images: {}
    });
    const r = {
      metadata: {
        version: 4.7,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    r.uuid = this.uuid, r.type = this.type, this.name !== "" && (r.name = this.name), this.color && this.color.isColor && (r.color = this.color.getHex()), this.roughness !== void 0 && (r.roughness = this.roughness), this.metalness !== void 0 && (r.metalness = this.metalness), this.sheen !== void 0 && (r.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (r.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (r.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (r.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (r.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (r.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (r.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (r.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (r.shininess = this.shininess), this.clearcoat !== void 0 && (r.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (r.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (r.clearcoatMap = this.clearcoatMap.toJSON(t).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (r.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(t).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (r.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(t).uuid, r.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.sheenColorMap && this.sheenColorMap.isTexture && (r.sheenColorMap = this.sheenColorMap.toJSON(t).uuid), this.sheenRoughnessMap && this.sheenRoughnessMap.isTexture && (r.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(t).uuid), this.dispersion !== void 0 && (r.dispersion = this.dispersion), this.iridescence !== void 0 && (r.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (r.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (r.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (r.iridescenceMap = this.iridescenceMap.toJSON(t).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (r.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(t).uuid), this.anisotropy !== void 0 && (r.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (r.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (r.anisotropyMap = this.anisotropyMap.toJSON(t).uuid), this.map && this.map.isTexture && (r.map = this.map.toJSON(t).uuid), this.matcap && this.matcap.isTexture && (r.matcap = this.matcap.toJSON(t).uuid), this.alphaMap && this.alphaMap.isTexture && (r.alphaMap = this.alphaMap.toJSON(t).uuid), this.lightMap && this.lightMap.isTexture && (r.lightMap = this.lightMap.toJSON(t).uuid, r.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (r.aoMap = this.aoMap.toJSON(t).uuid, r.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (r.bumpMap = this.bumpMap.toJSON(t).uuid, r.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (r.normalMap = this.normalMap.toJSON(t).uuid, r.normalMapType = this.normalMapType, r.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (r.displacementMap = this.displacementMap.toJSON(t).uuid, r.displacementScale = this.displacementScale, r.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (r.roughnessMap = this.roughnessMap.toJSON(t).uuid), this.metalnessMap && this.metalnessMap.isTexture && (r.metalnessMap = this.metalnessMap.toJSON(t).uuid), this.emissiveMap && this.emissiveMap.isTexture && (r.emissiveMap = this.emissiveMap.toJSON(t).uuid), this.specularMap && this.specularMap.isTexture && (r.specularMap = this.specularMap.toJSON(t).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (r.specularIntensityMap = this.specularIntensityMap.toJSON(t).uuid), this.specularColorMap && this.specularColorMap.isTexture && (r.specularColorMap = this.specularColorMap.toJSON(t).uuid), this.envMap && this.envMap.isTexture && (r.envMap = this.envMap.toJSON(t).uuid, this.combine !== void 0 && (r.combine = this.combine)), this.envMapRotation !== void 0 && (r.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (r.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (r.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (r.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (r.gradientMap = this.gradientMap.toJSON(t).uuid), this.transmission !== void 0 && (r.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (r.transmissionMap = this.transmissionMap.toJSON(t).uuid), this.thickness !== void 0 && (r.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (r.thicknessMap = this.thicknessMap.toJSON(t).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (r.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (r.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (r.size = this.size), this.shadowSide !== null && (r.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (r.sizeAttenuation = this.sizeAttenuation), this.blending !== Sie && (r.blending = this.blending), this.side !== uT && (r.side = this.side), this.vertexColors === !0 && (r.vertexColors = !0), this.opacity < 1 && (r.opacity = this.opacity), this.transparent === !0 && (r.transparent = !0), this.blendSrc !== Mbt && (r.blendSrc = this.blendSrc), this.blendDst !== Pbt && (r.blendDst = this.blendDst), this.blendEquation !== mH && (r.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (r.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (r.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (r.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (r.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (r.blendAlpha = this.blendAlpha), this.depthFunc !== tde && (r.depthFunc = this.depthFunc), this.depthTest === !1 && (r.depthTest = this.depthTest), this.depthWrite === !1 && (r.depthWrite = this.depthWrite), this.colorWrite === !1 && (r.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (r.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== aZt && (r.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (r.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (r.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== Tee && (r.stencilFail = this.stencilFail), this.stencilZFail !== Tee && (r.stencilZFail = this.stencilZFail), this.stencilZPass !== Tee && (r.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (r.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (r.rotation = this.rotation), this.polygonOffset === !0 && (r.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (r.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (r.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (r.linewidth = this.linewidth), this.dashSize !== void 0 && (r.dashSize = this.dashSize), this.gapSize !== void 0 && (r.gapSize = this.gapSize), this.scale !== void 0 && (r.scale = this.scale), this.dithering === !0 && (r.dithering = !0), this.alphaTest > 0 && (r.alphaTest = this.alphaTest), this.alphaHash === !0 && (r.alphaHash = !0), this.alphaToCoverage === !0 && (r.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (r.premultipliedAlpha = !0), this.forceSinglePass === !0 && (r.forceSinglePass = !0), this.allowOverride === !1 && (r.allowOverride = !1), this.wireframe === !0 && (r.wireframe = !0), this.wireframeLinewidth > 1 && (r.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (r.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (r.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (r.flatShading = !0), this.visible === !1 && (r.visible = !1), this.toneMapped === !1 && (r.toneMapped = !1), this.fog === !1 && (r.fog = !1), Object.keys(this.userData).length > 0 && (r.userData = this.userData);
    function a(i) {
      const o = [];
      for (const s in i) {
        const l = i[s];
        delete l.metadata, o.push(l);
      }
      return o;
    }
    if (n) {
      const i = a(t.textures),
        o = a(t.images);
      i.length > 0 && (r.textures = i), o.length > 0 && (r.images = o);
    }
    return r;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    this.name = t.name, this.blending = t.blending, this.side = t.side, this.vertexColors = t.vertexColors, this.opacity = t.opacity, this.transparent = t.transparent, this.blendSrc = t.blendSrc, this.blendDst = t.blendDst, this.blendEquation = t.blendEquation, this.blendSrcAlpha = t.blendSrcAlpha, this.blendDstAlpha = t.blendDstAlpha, this.blendEquationAlpha = t.blendEquationAlpha, this.blendColor.copy(t.blendColor), this.blendAlpha = t.blendAlpha, this.depthFunc = t.depthFunc, this.depthTest = t.depthTest, this.depthWrite = t.depthWrite, this.stencilWriteMask = t.stencilWriteMask, this.stencilFunc = t.stencilFunc, this.stencilRef = t.stencilRef, this.stencilFuncMask = t.stencilFuncMask, this.stencilFail = t.stencilFail, this.stencilZFail = t.stencilZFail, this.stencilZPass = t.stencilZPass, this.stencilWrite = t.stencilWrite;
    const n = t.clippingPlanes;
    let r = null;
    if (n !== null) {
      const a = n.length;
      r = new Array(a);
      for (let i = 0; i !== a; ++i) r[i] = n[i].clone();
    }
    return this.clippingPlanes = r, this.clipIntersection = t.clipIntersection, this.clipShadows = t.clipShadows, this.shadowSide = t.shadowSide, this.colorWrite = t.colorWrite, this.precision = t.precision, this.polygonOffset = t.polygonOffset, this.polygonOffsetFactor = t.polygonOffsetFactor, this.polygonOffsetUnits = t.polygonOffsetUnits, this.dithering = t.dithering, this.alphaTest = t.alphaTest, this.alphaHash = t.alphaHash, this.alphaToCoverage = t.alphaToCoverage, this.premultipliedAlpha = t.premultipliedAlpha, this.forceSinglePass = t.forceSinglePass, this.allowOverride = t.allowOverride, this.visible = t.visible, this.toneMapped = t.toneMapped, this.userData = JSON.parse(JSON.stringify(t.userData)), this;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
  set needsUpdate(t) {
    t === !0 && this.version++;
  }
}

class HYe extends Bk {
  constructor(t) {
    super(), this.isSpriteMaterial = !0, this.type = "SpriteMaterial", this.color = new so(16777215), this.map = null, this.alphaMap = null, this.rotation = 0, this.sizeAttenuation = !0, this.transparent = !0, this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.map = t.map, this.alphaMap = t.alphaMap, this.rotation = t.rotation, this.sizeAttenuation = t.sizeAttenuation, this.fog = t.fog, this;
  }
}

let zee;

const Mme = new dr(),
  Uee = new dr(),
  $ee = new dr(),
  Gee = new Qi(),
  Pme = new Qi(),
  Bqn = new bo(),
  l8e = new dr(),
  Rme = new dr(),
  c8e = new dr(),
  wZt = new Qi(),
  mrt = new Qi(),
  xZt = new Qi();

class Xjt extends Zc {
  constructor(t = new HYe()) {
    if (super(), this.isSprite = !0, this.type = "Sprite", zee === void 0) {
      zee = new Fd();
      const n = new Float32Array([-.5, -.5, 0, 0, 0, .5, -.5, 0, 1, 0, .5, .5, 0, 1, 1, -.5, .5, 0, 0, 1]),
        r = new Yjt(n, 5);
      zee.setIndex([0, 1, 2, 0, 2, 3]), zee.setAttribute("position", new mE(r, 3, 0, !1)), zee.setAttribute("uv", new mE(r, 2, 3, !1));
    }
    this.geometry = zee, this.material = t, this.center = new Qi(.5, .5), this.count = 1;
  }
  raycast(t, n) {
    t.camera === null && vl('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'), Uee.setFromMatrixScale(this.matrixWorld), Bqn.copy(t.camera.matrixWorld), this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse, this.matrixWorld), $ee.setFromMatrixPosition(this.modelViewMatrix), t.camera.isPerspectiveCamera && this.material.sizeAttenuation === !1 && Uee.multiplyScalar(-$ee.z);
    const r = this.material.rotation;
    let a, i;
    r !== 0 && (i = Math.cos(r), a = Math.sin(r));
    const o = this.center;
    d8e(l8e.set(-.5, -.5, 0), $ee, o, Uee, a, i), d8e(Rme.set(.5, -.5, 0), $ee, o, Uee, a, i), d8e(c8e.set(.5, .5, 0), $ee, o, Uee, a, i), wZt.set(0, 0), mrt.set(1, 0), xZt.set(1, 1);
    let s = t.ray.intersectTriangle(l8e, Rme, c8e, !1, Mme);
    if (s === null && (d8e(Rme.set(-.5, .5, 0), $ee, o, Uee, a, i), mrt.set(0, 1), s = t.ray.intersectTriangle(l8e, c8e, Rme, !1, Mme), s === null)) return;
    const l = t.ray.origin.distanceTo(Mme);
    l < t.near || l > t.far || n.push({
      distance: l,
      point: Mme.clone(),
      uv: g5.getInterpolation(Mme, l8e, Rme, c8e, wZt, mrt, xZt, new Qi()),
      face: null,
      object: this
    });
  }
  copy(t, n) {
    return super.copy(t, n), t.center !== void 0 && this.center.copy(t.center), this.material = t.material, this;
  }
}

function d8e(e, t, n, r, a, i) {
  Gee.subVectors(e, n).addScalar(.5).multiply(r), a !== void 0 ? (Pme.x = i * Gee.x - a * Gee.y, Pme.y = a * Gee.x + i * Gee.y) : Pme.copy(Gee), e.copy(t), e.x += Pme.x, e.y += Pme.y, e.applyMatrix4(Bqn);
}

const X9 = new dr(),
  frt = new dr(),
  u8e = new dr(),
  gL = new dr(),
  grt = new dr(),
  h8e = new dr(),
  yrt = new dr();

class tpe {
  constructor(t = new dr(), n = new dr(0, 0, -1)) {
    this.origin = t, this.direction = n;
  }
  set(t, n) {
    return this.origin.copy(t), this.direction.copy(n), this;
  }
  copy(t) {
    return this.origin.copy(t.origin), this.direction.copy(t.direction), this;
  }
  at(t, n) {
    return n.copy(this.origin).addScaledVector(this.direction, t);
  }
  lookAt(t) {
    return this.direction.copy(t).sub(this.origin).normalize(), this;
  }
  recast(t) {
    return this.origin.copy(this.at(t, X9)), this;
  }
  closestPointToPoint(t, n) {
    n.subVectors(t, this.origin);
    const r = n.dot(this.direction);
    return r < 0 ? n.copy(this.origin) : n.copy(this.origin).addScaledVector(this.direction, r);
  }
  distanceToPoint(t) {
    return Math.sqrt(this.distanceSqToPoint(t));
  }
  distanceSqToPoint(t) {
    const n = X9.subVectors(t, this.origin).dot(this.direction);
    return n < 0 ? this.origin.distanceToSquared(t) : (X9.copy(this.origin).addScaledVector(this.direction, n), X9.distanceToSquared(t));
  }
  distanceSqToSegment(t, n, r, a) {
    frt.copy(t).add(n).multiplyScalar(.5), u8e.copy(n).sub(t).normalize(), gL.copy(this.origin).sub(frt);
    const i = t.distanceTo(n) * .5,
      o = -this.direction.dot(u8e),
      s = gL.dot(this.direction),
      l = -gL.dot(u8e),
      d = gL.lengthSq(),
      u = Math.abs(1 - o * o);
    let h, p, m, f;
    if (u > 0) {
      if (h = o * l - s, p = o * s - l, f = i * u, h >= 0) {
        if (p >= -f) {
          if (p <= f) {
            const y = 1 / u;
            h *= y, p *= y, m = h * (h + o * p + 2 * s) + p * (o * h + p + 2 * l) + d;
          } else p = i, h = Math.max(0, -(o * p + s)), m = -h * h + p * (p + 2 * l) + d;
        } else p = -i, h = Math.max(0, -(o * p + s)), m = -h * h + p * (p + 2 * l) + d;
      } else p <= -f ? (h = Math.max(0, -(-o * i + s)), p = h > 0 ? -i : Math.min(Math.max(-i, -l), i), m = -h * h + p * (p + 2 * l) + d) : p <= f ? (h = 0, p = Math.min(Math.max(-i, -l), i), m = p * (p + 2 * l) + d) : (h = Math.max(0, -(o * i + s)), p = h > 0 ? i : Math.min(Math.max(-i, -l), i), m = -h * h + p * (p + 2 * l) + d);
    } else p = o > 0 ? -i : i, h = Math.max(0, -(o * p + s)), m = -h * h + p * (p + 2 * l) + d;
    return r && r.copy(this.origin).addScaledVector(this.direction, h), a && a.copy(frt).addScaledVector(u8e, p), m;
  }
  intersectSphere(t, n) {
    X9.subVectors(t.center, this.origin);
    const r = X9.dot(this.direction),
      a = X9.dot(X9) - r * r,
      i = t.radius * t.radius;
    if (a > i) return null;
    const o = Math.sqrt(i - a),
      s = r - o,
      l = r + o;
    return l < 0 ? null : s < 0 ? this.at(l, n) : this.at(s, n);
  }
  intersectsSphere(t) {
    return t.radius < 0 ? !1 : this.distanceSqToPoint(t.center) <= t.radius * t.radius;
  }
  distanceToPlane(t) {
    const n = t.normal.dot(this.direction);
    if (n === 0) return t.distanceToPoint(this.origin) === 0 ? 0 : null;
    const r = -(this.origin.dot(t.normal) + t.constant) / n;
    return r >= 0 ? r : null;
  }
  intersectPlane(t, n) {
    const r = this.distanceToPlane(t);
    return r === null ? null : this.at(r, n);
  }
  intersectsPlane(t) {
    const n = t.distanceToPoint(this.origin);
    return n === 0 || t.normal.dot(this.direction) * n < 0;
  }
  intersectBox(t, n) {
    let r, a, i, o, s, l;
    const d = 1 / this.direction.x,
      u = 1 / this.direction.y,
      h = 1 / this.direction.z,
      p = this.origin;
    return d >= 0 ? (r = (t.min.x - p.x) * d, a = (t.max.x - p.x) * d) : (r = (t.max.x - p.x) * d, a = (t.min.x - p.x) * d), u >= 0 ? (i = (t.min.y - p.y) * u, o = (t.max.y - p.y) * u) : (i = (t.max.y - p.y) * u, o = (t.min.y - p.y) * u), r > o || i > a || ((i > r || isNaN(r)) && (r = i), (o < a || isNaN(a)) && (a = o), h >= 0 ? (s = (t.min.z - p.z) * h, l = (t.max.z - p.z) * h) : (s = (t.max.z - p.z) * h, l = (t.min.z - p.z) * h), r > l || s > a) || ((s > r || r !== r) && (r = s), (l < a || a !== a) && (a = l), a < 0) ? null : this.at(r >= 0 ? r : a, n);
  }
  intersectsBox(t) {
    return this.intersectBox(t, X9) !== null;
  }
  intersectTriangle(t, n, r, a, i) {
    grt.subVectors(n, t), h8e.subVectors(r, t), yrt.crossVectors(grt, h8e);
    let o = this.direction.dot(yrt),
      s;
    if (o > 0) {
      if (a) return null;
      s = 1;
    } else if (o < 0) s = -1, o = -o;else return null;
    gL.subVectors(this.origin, t);
    const l = s * this.direction.dot(h8e.crossVectors(gL, h8e));
    if (l < 0) return null;
    const d = s * this.direction.dot(grt.cross(gL));
    if (d < 0 || l + d > o) return null;
    const u = -s * gL.dot(yrt);
    return u < 0 ? null : this.at(u / o, i);
  }
  applyMatrix4(t) {
    return this.origin.applyMatrix4(t), this.direction.transformDirection(t), this;
  }
  equals(t) {
    return t.origin.equals(this.origin) && t.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}

class uu extends Bk {
  constructor(t) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new so(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new xp(), this.combine = $Ye, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapRotation.copy(t.envMapRotation), this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.fog = t.fog, this;
  }
}

const _Zt = new bo(),
  jG = new tpe(),
  p8e = new mI(),
  kZt = new dr(),
  m8e = new dr(),
  f8e = new dr(),
  g8e = new dr(),
  brt = new dr(),
  y8e = new dr(),
  AZt = new dr(),
  b8e = new dr();

class di extends Zc {
  constructor(t = new Fd(), n = new uu()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = t, this.material = n, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.count = 1, this.updateMorphTargets();
  }
  copy(t, n) {
    return super.copy(t, n), t.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = t.morphTargetInfluences.slice()), t.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, t.morphTargetDictionary)), this.material = Array.isArray(t.material) ? t.material.slice() : t.material, this.geometry = t.geometry, this;
  }
  updateMorphTargets() {
    const n = this.geometry.morphAttributes,
      r = Object.keys(n);
    if (r.length > 0) {
      const a = n[r[0]];
      if (a !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let i = 0, o = a.length; i < o; i++) {
          const s = a[i].name || String(i);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[s] = i;
        }
      }
    }
  }
  getVertexPosition(t, n) {
    const r = this.geometry,
      a = r.attributes.position,
      i = r.morphAttributes.position,
      o = r.morphTargetsRelative;
    n.fromBufferAttribute(a, t);
    const s = this.morphTargetInfluences;
    if (i && s) {
      y8e.set(0, 0, 0);
      for (let l = 0, d = i.length; l < d; l++) {
        const u = s[l],
          h = i[l];
        u !== 0 && (brt.fromBufferAttribute(h, t), o ? y8e.addScaledVector(brt, u) : y8e.addScaledVector(brt.sub(n), u));
      }
      n.add(y8e);
    }
    return n;
  }
  raycast(t, n) {
    const r = this.geometry,
      a = this.material,
      i = this.matrixWorld;
    a !== void 0 && (r.boundingSphere === null && r.computeBoundingSphere(), p8e.copy(r.boundingSphere), p8e.applyMatrix4(i), jG.copy(t.ray).recast(t.near), !(p8e.containsPoint(jG.origin) === !1 && (jG.intersectSphere(p8e, kZt) === null || jG.origin.distanceToSquared(kZt) > (t.far - t.near) ** 2)) && (_Zt.copy(i).invert(), jG.copy(t.ray).applyMatrix4(_Zt), !(r.boundingBox !== null && jG.intersectsBox(r.boundingBox) === !1) && this._computeIntersections(t, n, jG)));
  }
  _computeIntersections(t, n, r) {
    let a;
    const i = this.geometry,
      o = this.material,
      s = i.index,
      l = i.attributes.position,
      d = i.attributes.uv,
      u = i.attributes.uv1,
      h = i.attributes.normal,
      p = i.groups,
      m = i.drawRange;
    if (s !== null) {
      if (Array.isArray(o)) for (let f = 0, y = p.length; f < y; f++) {
        const b = p[f],
          v = o[b.materialIndex],
          _ = Math.max(b.start, m.start),
          w = Math.min(s.count, Math.min(b.start + b.count, m.start + m.count));
        for (let k = _, A = w; k < A; k += 3) {
          const S = s.getX(k),
            C = s.getX(k + 1),
            I = s.getX(k + 2);
          a = v8e(this, v, t, r, d, u, h, S, C, I), a && (a.faceIndex = Math.floor(k / 3), a.face.materialIndex = b.materialIndex, n.push(a));
        }
      } else {
        const f = Math.max(0, m.start),
          y = Math.min(s.count, m.start + m.count);
        for (let b = f, v = y; b < v; b += 3) {
          const _ = s.getX(b),
            w = s.getX(b + 1),
            k = s.getX(b + 2);
          a = v8e(this, o, t, r, d, u, h, _, w, k), a && (a.faceIndex = Math.floor(b / 3), n.push(a));
        }
      }
    } else if (l !== void 0) if (Array.isArray(o)) for (let f = 0, y = p.length; f < y; f++) {
      const b = p[f],
        v = o[b.materialIndex],
        _ = Math.max(b.start, m.start),
        w = Math.min(l.count, Math.min(b.start + b.count, m.start + m.count));
      for (let k = _, A = w; k < A; k += 3) {
        const S = k,
          C = k + 1,
          I = k + 2;
        a = v8e(this, v, t, r, d, u, h, S, C, I), a && (a.faceIndex = Math.floor(k / 3), a.face.materialIndex = b.materialIndex, n.push(a));
      }
    } else {
      const f = Math.max(0, m.start),
        y = Math.min(l.count, m.start + m.count);
      for (let b = f, v = y; b < v; b += 3) {
        const _ = b,
          w = b + 1,
          k = b + 2;
        a = v8e(this, o, t, r, d, u, h, _, w, k), a && (a.faceIndex = Math.floor(b / 3), n.push(a));
      }
    }
  }
}

function Wwa(e, t, n, r, a, i, o, s) {
  let l;
  if (t.side === xx ? l = r.intersectTriangle(o, i, a, !0, s) : l = r.intersectTriangle(a, i, o, t.side === uT, s), l === null) return null;
  b8e.copy(s), b8e.applyMatrix4(e.matrixWorld);
  const d = n.ray.origin.distanceTo(b8e);
  return d < n.near || d > n.far ? null : {
    distance: d,
    point: b8e.clone(),
    object: e
  };
}

function v8e(e, t, n, r, a, i, o, s, l, d) {
  e.getVertexPosition(s, m8e), e.getVertexPosition(l, f8e), e.getVertexPosition(d, g8e);
  const u = Wwa(e, t, n, r, m8e, f8e, g8e, AZt);
  if (u) {
    const h = new dr();
    g5.getBarycoord(AZt, m8e, f8e, g8e, h), a && (u.uv = g5.getInterpolatedAttribute(a, s, l, d, h, new Qi())), i && (u.uv1 = g5.getInterpolatedAttribute(i, s, l, d, h, new Qi())), o && (u.normal = g5.getInterpolatedAttribute(o, s, l, d, h, new dr()), u.normal.dot(r.direction) > 0 && u.normal.multiplyScalar(-1));
    const p = {
      a: s,
      b: l,
      c: d,
      normal: new dr(),
      materialIndex: 0
    };
    g5.getNormal(m8e, f8e, g8e, p.normal), u.face = p, u.barycoord = h;
  }
  return u;
}

const SZt = new dr(),
  IZt = new Vd(),
  CZt = new Vd(),
  qwa = new dr(),
  EZt = new bo(),
  w8e = new dr(),
  vrt = new mI(),
  TZt = new bo(),
  wrt = new tpe();

class Fqn extends di {
  constructor(t, n) {
    super(t, n), this.isSkinnedMesh = !0, this.type = "SkinnedMesh", this.bindMode = nZt, this.bindMatrix = new bo(), this.bindMatrixInverse = new bo(), this.boundingBox = null, this.boundingSphere = null;
  }
  computeBoundingBox() {
    const t = this.geometry;
    this.boundingBox === null && (this.boundingBox = new j0()), this.boundingBox.makeEmpty();
    const n = t.getAttribute("position");
    for (let r = 0; r < n.count; r++) this.getVertexPosition(r, w8e), this.boundingBox.expandByPoint(w8e);
  }
  computeBoundingSphere() {
    const t = this.geometry;
    this.boundingSphere === null && (this.boundingSphere = new mI()), this.boundingSphere.makeEmpty();
    const n = t.getAttribute("position");
    for (let r = 0; r < n.count; r++) this.getVertexPosition(r, w8e), this.boundingSphere.expandByPoint(w8e);
  }
  copy(t, n) {
    return super.copy(t, n), this.bindMode = t.bindMode, this.bindMatrix.copy(t.bindMatrix), this.bindMatrixInverse.copy(t.bindMatrixInverse), this.skeleton = t.skeleton, t.boundingBox !== null && (this.boundingBox = t.boundingBox.clone()), t.boundingSphere !== null && (this.boundingSphere = t.boundingSphere.clone()), this;
  }
  raycast(t, n) {
    const r = this.material,
      a = this.matrixWorld;
    r !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), vrt.copy(this.boundingSphere), vrt.applyMatrix4(a), t.ray.intersectsSphere(vrt) !== !1 && (TZt.copy(a).invert(), wrt.copy(t.ray).applyMatrix4(TZt), !(this.boundingBox !== null && wrt.intersectsBox(this.boundingBox) === !1) && this._computeIntersections(t, n, wrt)));
  }
  getVertexPosition(t, n) {
    return super.getVertexPosition(t, n), this.applyBoneTransform(t, n), n;
  }
  bind(t, n) {
    this.skeleton = t, n === void 0 && (this.updateMatrixWorld(!0), this.skeleton.calculateInverses(), n = this.matrixWorld), this.bindMatrix.copy(n), this.bindMatrixInverse.copy(n).invert();
  }
  pose() {
    this.skeleton.pose();
  }
  normalizeSkinWeights() {
    const t = new Vd(),
      n = this.geometry.attributes.skinWeight;
    for (let r = 0, a = n.count; r < a; r++) {
      t.fromBufferAttribute(n, r);
      const i = 1 / t.manhattanLength();
      i !== 1 / 0 ? t.multiplyScalar(i) : t.set(1, 0, 0, 0), n.setXYZW(r, t.x, t.y, t.z, t.w);
    }
  }
  updateMatrixWorld(t) {
    super.updateMatrixWorld(t), this.bindMode === nZt ? this.bindMatrixInverse.copy(this.matrixWorld).invert() : this.bindMode === q1a ? this.bindMatrixInverse.copy(this.bindMatrix).invert() : Es("SkinnedMesh: Unrecognized bindMode: " + this.bindMode);
  }
  applyBoneTransform(t, n) {
    const r = this.skeleton,
      a = this.geometry;
    IZt.fromBufferAttribute(a.attributes.skinIndex, t), CZt.fromBufferAttribute(a.attributes.skinWeight, t), SZt.copy(n).applyMatrix4(this.bindMatrix), n.set(0, 0, 0);
    for (let i = 0; i < 4; i++) {
      const o = CZt.getComponent(i);
      if (o !== 0) {
        const s = IZt.getComponent(i);
        EZt.multiplyMatrices(r.bones[s].matrixWorld, r.boneInverses[s]), n.addScaledVector(qwa.copy(SZt).applyMatrix4(EZt), o);
      }
    }
    return n.applyMatrix4(this.bindMatrixInverse);
  }
}

class tze extends Zc {
  constructor() {
    super(), this.isBone = !0, this.type = "Bone";
  }
}

class mW extends N0 {
  constructor(t = null, n = 1, r = 1, a, i, o, s, l, d = cg, u = cg, h, p) {
    super(null, o, s, l, d, u, a, i, h, p), this.isDataTexture = !0, this.image = {
      data: t,
      width: n,
      height: r
    }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}

const MZt = new bo(),
  Kwa = new bo();

class WYe {
  constructor(t = [], n = []) {
    this.uuid = H5(), this.bones = t.slice(0), this.boneInverses = n, this.boneMatrices = null, this.previousBoneMatrices = null, this.boneTexture = null, this.init();
  }
  init() {
    const t = this.bones,
      n = this.boneInverses;
    if (this.boneMatrices = new Float32Array(t.length * 16), n.length === 0) this.calculateInverses();else if (t.length !== n.length) {
      Es("Skeleton: Number of inverse bone matrices does not match amount of bones."), this.boneInverses = [];
      for (let r = 0, a = this.bones.length; r < a; r++) this.boneInverses.push(new bo());
    }
  }
  calculateInverses() {
    this.boneInverses.length = 0;
    for (let t = 0, n = this.bones.length; t < n; t++) {
      const r = new bo();
      this.bones[t] && r.copy(this.bones[t].matrixWorld).invert(), this.boneInverses.push(r);
    }
  }
  pose() {
    for (let t = 0, n = this.bones.length; t < n; t++) {
      const r = this.bones[t];
      r && r.matrixWorld.copy(this.boneInverses[t]).invert();
    }
    for (let t = 0, n = this.bones.length; t < n; t++) {
      const r = this.bones[t];
      r && (r.parent && r.parent.isBone ? (r.matrix.copy(r.parent.matrixWorld).invert(), r.matrix.multiply(r.matrixWorld)) : r.matrix.copy(r.matrixWorld), r.matrix.decompose(r.position, r.quaternion, r.scale));
    }
  }
  update() {
    const t = this.bones,
      n = this.boneInverses,
      r = this.boneMatrices,
      a = this.boneTexture;
    for (let i = 0, o = t.length; i < o; i++) {
      const s = t[i] ? t[i].matrixWorld : Kwa;
      MZt.multiplyMatrices(s, n[i]), MZt.toArray(r, i * 16);
    }
    a !== null && (a.needsUpdate = !0);
  }
  clone() {
    return new WYe(this.bones, this.boneInverses);
  }
  computeBoneTexture() {
    let t = Math.sqrt(this.bones.length * 4);
    t = Math.ceil(t / 4) * 4, t = Math.max(t, 4);
    const n = new Float32Array(t * t * 4);
    n.set(this.boneMatrices);
    const r = new mW(n, t, t, W1, Ck);
    return r.needsUpdate = !0, this.boneMatrices = n, this.boneTexture = r, this;
  }
  getBoneByName(t) {
    for (let n = 0, r = this.bones.length; n < r; n++) {
      const a = this.bones[n];
      if (a.name === t) return a;
    }
  }
  dispose() {
    this.boneTexture !== null && (this.boneTexture.dispose(), this.boneTexture = null);
  }
  fromJSON(t, n) {
    this.uuid = t.uuid;
    for (let r = 0, a = t.bones.length; r < a; r++) {
      const i = t.bones[r];
      let o = n[i];
      o === void 0 && (Es("Skeleton: No bone found with UUID:", i), o = new tze()), this.bones.push(o), this.boneInverses.push(new bo().fromArray(t.boneInverses[r]));
    }
    return this.init(), this;
  }
  toJSON() {
    const t = {
      metadata: {
        version: 4.7,
        type: "Skeleton",
        generator: "Skeleton.toJSON"
      },
      bones: [],
      boneInverses: []
    };
    t.uuid = this.uuid;
    const n = this.bones,
      r = this.boneInverses;
    for (let a = 0, i = n.length; a < i; a++) {
      const o = n[a];
      t.bones.push(o.uuid);
      const s = r[a];
      t.boneInverses.push(s.toArray());
    }
    return t;
  }
}

class vvt extends Z1 {
  constructor(t, n, r, a = 1) {
    super(t, n, r), this.isInstancedBufferAttribute = !0, this.meshPerAttribute = a;
  }
  copy(t) {
    return super.copy(t), this.meshPerAttribute = t.meshPerAttribute, this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.meshPerAttribute = this.meshPerAttribute, t.isInstancedBufferAttribute = !0, t;
  }
}

const Vee = new bo(),
  PZt = new bo(),
  x8e = [],
  RZt = new j0(),
  Qwa = new bo(),
  Nme = new di(),
  jme = new mI();

class zqn extends di {
  constructor(t, n, r) {
    super(t, n), this.isInstancedMesh = !0, this.instanceMatrix = new vvt(new Float32Array(r * 16), 16), this.previousInstanceMatrix = null, this.instanceColor = null, this.morphTexture = null, this.count = r, this.boundingBox = null, this.boundingSphere = null;
    for (let a = 0; a < r; a++) this.setMatrixAt(a, Qwa);
  }
  computeBoundingBox() {
    const t = this.geometry,
      n = this.count;
    this.boundingBox === null && (this.boundingBox = new j0()), t.boundingBox === null && t.computeBoundingBox(), this.boundingBox.makeEmpty();
    for (let r = 0; r < n; r++) this.getMatrixAt(r, Vee), RZt.copy(t.boundingBox).applyMatrix4(Vee), this.boundingBox.union(RZt);
  }
  computeBoundingSphere() {
    const t = this.geometry,
      n = this.count;
    this.boundingSphere === null && (this.boundingSphere = new mI()), t.boundingSphere === null && t.computeBoundingSphere(), this.boundingSphere.makeEmpty();
    for (let r = 0; r < n; r++) this.getMatrixAt(r, Vee), jme.copy(t.boundingSphere).applyMatrix4(Vee), this.boundingSphere.union(jme);
  }
  copy(t, n) {
    return super.copy(t, n), this.instanceMatrix.copy(t.instanceMatrix), t.previousInstanceMatrix !== null && (this.previousInstanceMatrix = t.previousInstanceMatrix.clone()), t.morphTexture !== null && (this.morphTexture = t.morphTexture.clone()), t.instanceColor !== null && (this.instanceColor = t.instanceColor.clone()), this.count = t.count, t.boundingBox !== null && (this.boundingBox = t.boundingBox.clone()), t.boundingSphere !== null && (this.boundingSphere = t.boundingSphere.clone()), this;
  }
  getColorAt(t, n) {
    n.fromArray(this.instanceColor.array, t * 3);
  }
  getMatrixAt(t, n) {
    n.fromArray(this.instanceMatrix.array, t * 16);
  }
  getMorphAt(t, n) {
    const r = n.morphTargetInfluences,
      a = this.morphTexture.source.data.data,
      i = r.length + 1,
      o = t * i + 1;
    for (let s = 0; s < r.length; s++) r[s] = a[o + s];
  }
  raycast(t, n) {
    const r = this.matrixWorld,
      a = this.count;
    if (Nme.geometry = this.geometry, Nme.material = this.material, Nme.material !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), jme.copy(this.boundingSphere), jme.applyMatrix4(r), t.ray.intersectsSphere(jme) !== !1)) for (let i = 0; i < a; i++) {
      this.getMatrixAt(i, Vee), PZt.multiplyMatrices(r, Vee), Nme.matrixWorld = PZt, Nme.raycast(t, x8e);
      for (let o = 0, s = x8e.length; o < s; o++) {
        const l = x8e[o];
        l.instanceId = i, l.object = this, n.push(l);
      }
      x8e.length = 0;
    }
  }
  setColorAt(t, n) {
    this.instanceColor === null && (this.instanceColor = new vvt(new Float32Array(this.instanceMatrix.count * 3).fill(1), 3)), n.toArray(this.instanceColor.array, t * 3);
  }
  setMatrixAt(t, n) {
    n.toArray(this.instanceMatrix.array, t * 16);
  }
  setMorphAt(t, n) {
    const r = n.morphTargetInfluences,
      a = r.length + 1;
    this.morphTexture === null && (this.morphTexture = new mW(new Float32Array(a * this.count), a, this.count, Bjt, Ck));
    const i = this.morphTexture.source.data.data;
    let o = 0;
    for (let d = 0; d < r.length; d++) o += r[d];
    const s = this.geometry.morphTargetsRelative ? 1 : 1 - o,
      l = a * t;
    i[l] = s, i.set(r, l + 1);
  }
  updateMorphTargets() {}
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    }), this.morphTexture !== null && (this.morphTexture.dispose(), this.morphTexture = null);
  }
}

const xrt = new dr(),
  Ywa = new dr(),
  Xwa = new Tc();

class D1 {
  constructor(t = new dr(1, 0, 0), n = 0) {
    this.isPlane = !0, this.normal = t, this.constant = n;
  }
  set(t, n) {
    return this.normal.copy(t), this.constant = n, this;
  }
  setComponents(t, n, r, a) {
    return this.normal.set(t, n, r), this.constant = a, this;
  }
  setFromNormalAndCoplanarPoint(t, n) {
    return this.normal.copy(t), this.constant = -n.dot(this.normal), this;
  }
  setFromCoplanarPoints(t, n, r) {
    const a = xrt.subVectors(r, n).cross(Ywa.subVectors(t, n)).normalize();
    return this.setFromNormalAndCoplanarPoint(a, t), this;
  }
  copy(t) {
    return this.normal.copy(t.normal), this.constant = t.constant, this;
  }
  normalize() {
    const t = 1 / this.normal.length();
    return this.normal.multiplyScalar(t), this.constant *= t, this;
  }
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  distanceToPoint(t) {
    return this.normal.dot(t) + this.constant;
  }
  distanceToSphere(t) {
    return this.distanceToPoint(t.center) - t.radius;
  }
  projectPoint(t, n) {
    return n.copy(t).addScaledVector(this.normal, -this.distanceToPoint(t));
  }
  intersectLine(t, n) {
    const r = t.delta(xrt),
      a = this.normal.dot(r);
    if (a === 0) return this.distanceToPoint(t.start) === 0 ? n.copy(t.start) : null;
    const i = -(t.start.dot(this.normal) + this.constant) / a;
    return i < 0 || i > 1 ? null : n.copy(t.start).addScaledVector(r, i);
  }
  intersectsLine(t) {
    const n = this.distanceToPoint(t.start),
      r = this.distanceToPoint(t.end);
    return n < 0 && r > 0 || r < 0 && n > 0;
  }
  intersectsBox(t) {
    return t.intersectsPlane(this);
  }
  intersectsSphere(t) {
    return t.intersectsPlane(this);
  }
  coplanarPoint(t) {
    return t.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(t, n) {
    const r = n || Xwa.getNormalMatrix(t),
      a = this.coplanarPoint(xrt).applyMatrix4(t),
      i = this.normal.applyMatrix3(r).normalize();
    return this.constant = -a.dot(i), this;
  }
  translate(t) {
    return this.constant -= t.dot(this.normal), this;
  }
  equals(t) {
    return t.normal.equals(this.normal) && t.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}

const DG = new mI(),
  Jwa = new Qi(.5, .5),
  _8e = new dr();

class Jjt {
  constructor(t = new D1(), n = new D1(), r = new D1(), a = new D1(), i = new D1(), o = new D1()) {
    this.planes = [t, n, r, a, i, o];
  }
  set(t, n, r, a, i, o) {
    const s = this.planes;
    return s[0].copy(t), s[1].copy(n), s[2].copy(r), s[3].copy(a), s[4].copy(i), s[5].copy(o), this;
  }
  copy(t) {
    const n = this.planes;
    for (let r = 0; r < 6; r++) n[r].copy(t.planes[r]);
    return this;
  }
  setFromProjectionMatrix(t, n = AM, r = !1) {
    const a = this.planes,
      i = t.elements,
      o = i[0],
      s = i[1],
      l = i[2],
      d = i[3],
      u = i[4],
      h = i[5],
      p = i[6],
      m = i[7],
      f = i[8],
      y = i[9],
      b = i[10],
      v = i[11],
      _ = i[12],
      w = i[13],
      k = i[14],
      A = i[15];
    if (a[0].setComponents(d - o, m - u, v - f, A - _).normalize(), a[1].setComponents(d + o, m + u, v + f, A + _).normalize(), a[2].setComponents(d + s, m + h, v + y, A + w).normalize(), a[3].setComponents(d - s, m - h, v - y, A - w).normalize(), r) a[4].setComponents(l, p, b, k).normalize(), a[5].setComponents(d - l, m - p, v - b, A - k).normalize();else if (a[4].setComponents(d - l, m - p, v - b, A - k).normalize(), n === AM) a[5].setComponents(d + l, m + p, v + b, A + k).normalize();else if (n === M_e) a[5].setComponents(l, p, b, k).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + n);
    return this;
  }
  intersectsObject(t) {
    if (t.boundingSphere !== void 0) t.boundingSphere === null && t.computeBoundingSphere(), DG.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else {
      const n = t.geometry;
      n.boundingSphere === null && n.computeBoundingSphere(), DG.copy(n.boundingSphere).applyMatrix4(t.matrixWorld);
    }
    return this.intersectsSphere(DG);
  }
  intersectsSprite(t) {
    DG.center.set(0, 0, 0);
    const n = Jwa.distanceTo(t.center);
    return DG.radius = .7071067811865476 + n, DG.applyMatrix4(t.matrixWorld), this.intersectsSphere(DG);
  }
  intersectsSphere(t) {
    const n = this.planes,
      r = t.center,
      a = -t.radius;
    for (let i = 0; i < 6; i++) if (n[i].distanceToPoint(r) < a) return !1;
    return !0;
  }
  intersectsBox(t) {
    const n = this.planes;
    for (let r = 0; r < 6; r++) {
      const a = n[r];
      if (_8e.x = a.normal.x > 0 ? t.max.x : t.min.x, _8e.y = a.normal.y > 0 ? t.max.y : t.min.y, _8e.z = a.normal.z > 0 ? t.max.z : t.min.z, a.distanceToPoint(_8e) < 0) return !1;
    }
    return !0;
  }
  containsPoint(t) {
    const n = this.planes;
    for (let r = 0; r < 6; r++) if (n[r].distanceToPoint(t) < 0) return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}

class BD extends Bk {
  constructor(t) {
    super(), this.isLineBasicMaterial = !0, this.type = "LineBasicMaterial", this.color = new so(16777215), this.map = null, this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.map = t.map, this.linewidth = t.linewidth, this.linecap = t.linecap, this.linejoin = t.linejoin, this.fog = t.fog, this;
  }
}

const nze = new dr(),
  rze = new dr(),
  NZt = new bo(),
  Dme = new tpe(),
  k8e = new mI(),
  _rt = new dr(),
  jZt = new dr();

class Qw extends Zc {
  constructor(t = new Fd(), n = new BD()) {
    super(), this.isLine = !0, this.type = "Line", this.geometry = t, this.material = n, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.updateMorphTargets();
  }
  copy(t, n) {
    return super.copy(t, n), this.material = Array.isArray(t.material) ? t.material.slice() : t.material, this.geometry = t.geometry, this;
  }
  computeLineDistances() {
    const t = this.geometry;
    if (t.index === null) {
      const n = t.attributes.position,
        r = [0];
      for (let a = 1, i = n.count; a < i; a++) nze.fromBufferAttribute(n, a - 1), rze.fromBufferAttribute(n, a), r[a] = r[a - 1], r[a] += nze.distanceTo(rze);
      t.setAttribute("lineDistance", new Al(r, 1));
    } else Es("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
  raycast(t, n) {
    const r = this.geometry,
      a = this.matrixWorld,
      i = t.params.Line.threshold,
      o = r.drawRange;
    if (r.boundingSphere === null && r.computeBoundingSphere(), k8e.copy(r.boundingSphere), k8e.applyMatrix4(a), k8e.radius += i, t.ray.intersectsSphere(k8e) === !1) return;
    NZt.copy(a).invert(), Dme.copy(t.ray).applyMatrix4(NZt);
    const s = i / ((this.scale.x + this.scale.y + this.scale.z) / 3),
      l = s * s,
      d = this.isLineSegments ? 2 : 1,
      u = r.index,
      p = r.attributes.position;
    if (u !== null) {
      const m = Math.max(0, o.start),
        f = Math.min(u.count, o.start + o.count);
      for (let y = m, b = f - 1; y < b; y += d) {
        const v = u.getX(y),
          _ = u.getX(y + 1),
          w = A8e(this, t, Dme, l, v, _, y);
        w && n.push(w);
      }
      if (this.isLineLoop) {
        const y = u.getX(f - 1),
          b = u.getX(m),
          v = A8e(this, t, Dme, l, y, b, f - 1);
        v && n.push(v);
      }
    } else {
      const m = Math.max(0, o.start),
        f = Math.min(p.count, o.start + o.count);
      for (let y = m, b = f - 1; y < b; y += d) {
        const v = A8e(this, t, Dme, l, y, y + 1, y);
        v && n.push(v);
      }
      if (this.isLineLoop) {
        const y = A8e(this, t, Dme, l, f - 1, m, f - 1);
        y && n.push(y);
      }
    }
  }
  updateMorphTargets() {
    const n = this.geometry.morphAttributes,
      r = Object.keys(n);
    if (r.length > 0) {
      const a = n[r[0]];
      if (a !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let i = 0, o = a.length; i < o; i++) {
          const s = a[i].name || String(i);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[s] = i;
        }
      }
    }
  }
}

function A8e(e, t, n, r, a, i, o) {
  const s = e.geometry.attributes.position;
  if (nze.fromBufferAttribute(s, a), rze.fromBufferAttribute(s, i), n.distanceSqToSegment(nze, rze, _rt, jZt) > r) return;
  _rt.applyMatrix4(e.matrixWorld);
  const d = t.ray.origin.distanceTo(_rt);
  if (!(d < t.near || d > t.far)) return {
    distance: d,
    point: jZt.clone().applyMatrix4(e.matrixWorld),
    index: o,
    face: null,
    faceIndex: null,
    barycoord: null,
    object: e
  };
}

const DZt = new dr(),
  LZt = new dr();

class Zjt extends Qw {
  constructor(t, n) {
    super(t, n), this.isLineSegments = !0, this.type = "LineSegments";
  }
  computeLineDistances() {
    const t = this.geometry;
    if (t.index === null) {
      const n = t.attributes.position,
        r = [];
      for (let a = 0, i = n.count; a < i; a += 2) DZt.fromBufferAttribute(n, a), LZt.fromBufferAttribute(n, a + 1), r[a] = a === 0 ? 0 : r[a - 1], r[a + 1] = r[a] + DZt.distanceTo(LZt);
      t.setAttribute("lineDistance", new Al(r, 1));
    } else Es("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
}

class Zwa extends Qw {
  constructor(t, n) {
    super(t, n), this.isLineLoop = !0, this.type = "LineLoop";
  }
}

class Uqn extends Bk {
  constructor(t) {
    super(), this.isPointsMaterial = !0, this.type = "PointsMaterial", this.color = new so(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = !0, this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.map = t.map, this.alphaMap = t.alphaMap, this.size = t.size, this.sizeAttenuation = t.sizeAttenuation, this.fog = t.fog, this;
  }
}

const OZt = new bo(),
  wvt = new tpe(),
  S8e = new mI(),
  I8e = new dr();

class exa extends Zc {
  constructor(t = new Fd(), n = new Uqn()) {
    super(), this.isPoints = !0, this.type = "Points", this.geometry = t, this.material = n, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.updateMorphTargets();
  }
  copy(t, n) {
    return super.copy(t, n), this.material = Array.isArray(t.material) ? t.material.slice() : t.material, this.geometry = t.geometry, this;
  }
  raycast(t, n) {
    const r = this.geometry,
      a = this.matrixWorld,
      i = t.params.Points.threshold,
      o = r.drawRange;
    if (r.boundingSphere === null && r.computeBoundingSphere(), S8e.copy(r.boundingSphere), S8e.applyMatrix4(a), S8e.radius += i, t.ray.intersectsSphere(S8e) === !1) return;
    OZt.copy(a).invert(), wvt.copy(t.ray).applyMatrix4(OZt);
    const s = i / ((this.scale.x + this.scale.y + this.scale.z) / 3),
      l = s * s,
      d = r.index,
      h = r.attributes.position;
    if (d !== null) {
      const p = Math.max(0, o.start),
        m = Math.min(d.count, o.start + o.count);
      for (let f = p, y = m; f < y; f++) {
        const b = d.getX(f);
        I8e.fromBufferAttribute(h, b), BZt(I8e, b, l, a, t, n, this);
      }
    } else {
      const p = Math.max(0, o.start),
        m = Math.min(h.count, o.start + o.count);
      for (let f = p, y = m; f < y; f++) I8e.fromBufferAttribute(h, f), BZt(I8e, f, l, a, t, n, this);
    }
  }
  updateMorphTargets() {
    const n = this.geometry.morphAttributes,
      r = Object.keys(n);
    if (r.length > 0) {
      const a = n[r[0]];
      if (a !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let i = 0, o = a.length; i < o; i++) {
          const s = a[i].name || String(i);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[s] = i;
        }
      }
    }
  }
}

function BZt(e, t, n, r, a, i, o) {
  const s = wvt.distanceSqToPoint(e);
  if (s < n) {
    const l = new dr();
    wvt.closestPointToPoint(e, l), l.applyMatrix4(r);
    const d = a.ray.origin.distanceTo(l);
    if (d < a.near || d > a.far) return;
    i.push({
      distance: d,
      distanceToRay: Math.sqrt(s),
      point: l,
      index: t,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: o
    });
  }
}

class $qn extends N0 {
  constructor(t = [], n = XX, r, a, i, o, s, l, d, u) {
    super(t, n, r, a, i, o, s, l, d, u), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(t) {
    this.image = t;
  }
}

class R_e extends N0 {
  constructor(t, n, r, a, i, o, s, l, d) {
    super(t, n, r, a, i, o, s, l, d), this.isCanvasTexture = !0, this.needsUpdate = !0;
  }
}

class N_e extends N0 {
  constructor(t, n, r = BP, a, i, o, s = cg, l = cg, d, u = iD, h = 1) {
    if (u !== iD && u !== pW) throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    const p = {
      width: t,
      height: n,
      depth: h
    };
    super(p, a, i, o, s, l, u, r, d), this.isDepthTexture = !0, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(t) {
    return super.copy(t), this.source = new qjt(Object.assign({}, t.image)), this.compareFunction = t.compareFunction, this;
  }
  toJSON(t) {
    const n = super.toJSON(t);
    return this.compareFunction !== null && (n.compareFunction = this.compareFunction), n;
  }
}

class txa extends N_e {
  constructor(t, n = BP, r = XX, a, i, o = cg, s = cg, l, d = iD) {
    const u = {
        width: t,
        height: t,
        depth: 1
      },
      h = [u, u, u, u, u, u];
    super(t, t, n, r, a, i, o, s, l, d), this.image = h, this.isCubeDepthTexture = !0, this.isCubeTexture = !0;
  }
  get images() {
    return this.image;
  }
  set images(t) {
    this.image = t;
  }
}

class Gqn extends N0 {
  constructor(t = null) {
    super(), this.sourceTexture = t, this.isExternalTexture = !0;
  }
  copy(t) {
    return super.copy(t), this.sourceTexture = t.sourceTexture, this;
  }
}

class dl extends Fd {
  constructor(t = 1, n = 1, r = 1, a = 1, i = 1, o = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: t,
      height: n,
      depth: r,
      widthSegments: a,
      heightSegments: i,
      depthSegments: o
    };
    const s = this;
    a = Math.floor(a), i = Math.floor(i), o = Math.floor(o);
    const l = [],
      d = [],
      u = [],
      h = [];
    let p = 0,
      m = 0;
    f("z", "y", "x", -1, -1, r, n, t, o, i, 0), f("z", "y", "x", 1, -1, r, n, -t, o, i, 1), f("x", "z", "y", 1, 1, t, r, n, a, o, 2), f("x", "z", "y", 1, -1, t, r, -n, a, o, 3), f("x", "y", "z", 1, -1, t, n, r, a, i, 4), f("x", "y", "z", -1, -1, t, n, -r, a, i, 5), this.setIndex(l), this.setAttribute("position", new Al(d, 3)), this.setAttribute("normal", new Al(u, 3)), this.setAttribute("uv", new Al(h, 2));
    function f(y, b, v, _, w, k, A, S, C, I, E) {
      const M = k / C,
        T = A / I,
        P = k / 2,
        R = A / 2,
        j = S / 2,
        B = C + 1,
        F = I + 1;
      let N = 0,
        G = 0;
      const z = new dr();
      for (let V = 0; V < F; V++) {
        const O = V * T - R;
        for (let L = 0; L < B; L++) {
          const D = L * M - P;
          z[y] = D * _, z[b] = O * w, z[v] = j, d.push(z.x, z.y, z.z), z[y] = 0, z[b] = 0, z[v] = S > 0 ? 1 : -1, u.push(z.x, z.y, z.z), h.push(L / C), h.push(1 - V / I), N += 1;
        }
      }
      for (let V = 0; V < I; V++) for (let O = 0; O < C; O++) {
        const L = p + O + B * V,
          D = p + O + B * (V + 1),
          U = p + (O + 1) + B * (V + 1),
          H = p + (O + 1) + B * V;
        l.push(L, D, H), l.push(D, U, H), G += 6;
      }
      s.addGroup(m, G, E), m += G, p += N;
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new dl(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
  }
}

class t$ extends Fd {
  constructor(t = 1, n = 1, r = 4, a = 8, i = 1) {
    super(), this.type = "CapsuleGeometry", this.parameters = {
      radius: t,
      height: n,
      capSegments: r,
      radialSegments: a,
      heightSegments: i
    }, n = Math.max(0, n), r = Math.max(1, Math.floor(r)), a = Math.max(3, Math.floor(a)), i = Math.max(1, Math.floor(i));
    const o = [],
      s = [],
      l = [],
      d = [],
      u = n / 2,
      h = Math.PI / 2 * t,
      p = n,
      m = 2 * h + p,
      f = r * 2 + i,
      y = a + 1,
      b = new dr(),
      v = new dr();
    for (let _ = 0; _ <= f; _++) {
      let w = 0,
        k = 0,
        A = 0,
        S = 0;
      if (_ <= r) {
        const E = _ / r,
          M = E * Math.PI / 2;
        k = -u - t * Math.cos(M), A = t * Math.sin(M), S = -t * Math.cos(M), w = E * h;
      } else if (_ <= r + i) {
        const E = (_ - r) / i;
        k = -u + E * n, A = t, S = 0, w = h + E * p;
      } else {
        const E = (_ - r - i) / r,
          M = E * Math.PI / 2;
        k = u + t * Math.sin(M), A = t * Math.cos(M), S = t * Math.sin(M), w = h + p + E * h;
      }
      const C = Math.max(0, Math.min(1, w / m));
      let I = 0;
      _ === 0 ? I = .5 / a : _ === f && (I = -.5 / a);
      for (let E = 0; E <= a; E++) {
        const M = E / a,
          T = M * Math.PI * 2,
          P = Math.sin(T),
          R = Math.cos(T);
        v.x = -A * R, v.y = k, v.z = A * P, s.push(v.x, v.y, v.z), b.set(-A * R, S, A * P), b.normalize(), l.push(b.x, b.y, b.z), d.push(M + I, C);
      }
      if (_ > 0) {
        const E = (_ - 1) * y;
        for (let M = 0; M < a; M++) {
          const T = E + M,
            P = E + M + 1,
            R = _ * y + M,
            j = _ * y + M + 1;
          o.push(T, P, R), o.push(P, j, R);
        }
      }
    }
    this.setIndex(o), this.setAttribute("position", new Al(s, 3)), this.setAttribute("normal", new Al(l, 3)), this.setAttribute("uv", new Al(d, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new t$(t.radius, t.height, t.capSegments, t.radialSegments, t.heightSegments);
  }
}

class lm extends Fd {
  constructor(t = 1, n = 1, r = 1, a = 32, i = 1, o = !1, s = 0, l = Math.PI * 2) {
    super(), this.type = "CylinderGeometry", this.parameters = {
      radiusTop: t,
      radiusBottom: n,
      height: r,
      radialSegments: a,
      heightSegments: i,
      openEnded: o,
      thetaStart: s,
      thetaLength: l
    };
    const d = this;
    a = Math.floor(a), i = Math.floor(i);
    const u = [],
      h = [],
      p = [],
      m = [];
    let f = 0;
    const y = [],
      b = r / 2;
    let v = 0;
    _(), o === !1 && (t > 0 && w(!0), n > 0 && w(!1)), this.setIndex(u), this.setAttribute("position", new Al(h, 3)), this.setAttribute("normal", new Al(p, 3)), this.setAttribute("uv", new Al(m, 2));
    function _() {
      const k = new dr(),
        A = new dr();
      let S = 0;
      const C = (n - t) / r;
      for (let I = 0; I <= i; I++) {
        const E = [],
          M = I / i,
          T = M * (n - t) + t;
        for (let P = 0; P <= a; P++) {
          const R = P / a,
            j = R * l + s,
            B = Math.sin(j),
            F = Math.cos(j);
          A.x = T * B, A.y = -M * r + b, A.z = T * F, h.push(A.x, A.y, A.z), k.set(B, C, F).normalize(), p.push(k.x, k.y, k.z), m.push(R, 1 - M), E.push(f++);
        }
        y.push(E);
      }
      for (let I = 0; I < a; I++) for (let E = 0; E < i; E++) {
        const M = y[E][I],
          T = y[E + 1][I],
          P = y[E + 1][I + 1],
          R = y[E][I + 1];
        (t > 0 || E !== 0) && (u.push(M, T, R), S += 3), (n > 0 || E !== i - 1) && (u.push(T, P, R), S += 3);
      }
      d.addGroup(v, S, 0), v += S;
    }
    function w(k) {
      const A = f,
        S = new Qi(),
        C = new dr();
      let I = 0;
      const E = k === !0 ? t : n,
        M = k === !0 ? 1 : -1;
      for (let P = 1; P <= a; P++) h.push(0, b * M, 0), p.push(0, M, 0), m.push(.5, .5), f++;
      const T = f;
      for (let P = 0; P <= a; P++) {
        const j = P / a * l + s,
          B = Math.cos(j),
          F = Math.sin(j);
        C.x = E * F, C.y = b * M, C.z = E * B, h.push(C.x, C.y, C.z), p.push(0, M, 0), S.x = B * .5 + .5, S.y = F * .5 * M + .5, m.push(S.x, S.y), f++;
      }
      for (let P = 0; P < a; P++) {
        const R = A + P,
          j = T + P;
        k === !0 ? u.push(j, j + 1, R) : u.push(j + 1, j, R), I += 3;
      }
      d.addGroup(v, I, k === !0 ? 1 : 2), v += I;
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new lm(t.radiusTop, t.radiusBottom, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
  }
}

class FP extends lm {
  constructor(t = 1, n = 1, r = 32, a = 1, i = !1, o = 0, s = Math.PI * 2) {
    super(0, t, n, r, a, i, o, s), this.type = "ConeGeometry", this.parameters = {
      radius: t,
      height: n,
      radialSegments: r,
      heightSegments: a,
      openEnded: i,
      thetaStart: o,
      thetaLength: s
    };
  }
  static fromJSON(t) {
    return new FP(t.radius, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
  }
}

class eDt extends Fd {
  constructor(t = [], n = [], r = 1, a = 0) {
    super(), this.type = "PolyhedronGeometry", this.parameters = {
      vertices: t,
      indices: n,
      radius: r,
      detail: a
    };
    const i = [],
      o = [];
    s(a), d(r), u(), this.setAttribute("position", new Al(i, 3)), this.setAttribute("normal", new Al(i.slice(), 3)), this.setAttribute("uv", new Al(o, 2)), a === 0 ? this.computeVertexNormals() : this.normalizeNormals();
    function s(_) {
      const w = new dr(),
        k = new dr(),
        A = new dr();
      for (let S = 0; S < n.length; S += 3) m(n[S + 0], w), m(n[S + 1], k), m(n[S + 2], A), l(w, k, A, _);
    }
    function l(_, w, k, A) {
      const S = A + 1,
        C = [];
      for (let I = 0; I <= S; I++) {
        C[I] = [];
        const E = _.clone().lerp(k, I / S),
          M = w.clone().lerp(k, I / S),
          T = S - I;
        for (let P = 0; P <= T; P++) P === 0 && I === S ? C[I][P] = E : C[I][P] = E.clone().lerp(M, P / T);
      }
      for (let I = 0; I < S; I++) for (let E = 0; E < 2 * (S - I) - 1; E++) {
        const M = Math.floor(E / 2);
        E % 2 === 0 ? (p(C[I][M + 1]), p(C[I + 1][M]), p(C[I][M])) : (p(C[I][M + 1]), p(C[I + 1][M + 1]), p(C[I + 1][M]));
      }
    }
    function d(_) {
      const w = new dr();
      for (let k = 0; k < i.length; k += 3) w.x = i[k + 0], w.y = i[k + 1], w.z = i[k + 2], w.normalize().multiplyScalar(_), i[k + 0] = w.x, i[k + 1] = w.y, i[k + 2] = w.z;
    }
    function u() {
      const _ = new dr();
      for (let w = 0; w < i.length; w += 3) {
        _.x = i[w + 0], _.y = i[w + 1], _.z = i[w + 2];
        const k = b(_) / 2 / Math.PI + .5,
          A = v(_) / Math.PI + .5;
        o.push(k, 1 - A);
      }
      f(), h();
    }
    function h() {
      for (let _ = 0; _ < o.length; _ += 6) {
        const w = o[_ + 0],
          k = o[_ + 2],
          A = o[_ + 4],
          S = Math.max(w, k, A),
          C = Math.min(w, k, A);
        S > .9 && C < .1 && (w < .2 && (o[_ + 0] += 1), k < .2 && (o[_ + 2] += 1), A < .2 && (o[_ + 4] += 1));
      }
    }
    function p(_) {
      i.push(_.x, _.y, _.z);
    }
    function m(_, w) {
      const k = _ * 3;
      w.x = t[k + 0], w.y = t[k + 1], w.z = t[k + 2];
    }
    function f() {
      const _ = new dr(),
        w = new dr(),
        k = new dr(),
        A = new dr(),
        S = new Qi(),
        C = new Qi(),
        I = new Qi();
      for (let E = 0, M = 0; E < i.length; E += 9, M += 6) {
        _.set(i[E + 0], i[E + 1], i[E + 2]), w.set(i[E + 3], i[E + 4], i[E + 5]), k.set(i[E + 6], i[E + 7], i[E + 8]), S.set(o[M + 0], o[M + 1]), C.set(o[M + 2], o[M + 3]), I.set(o[M + 4], o[M + 5]), A.copy(_).add(w).add(k).divideScalar(3);
        const T = b(A);
        y(S, M + 0, _, T), y(C, M + 2, w, T), y(I, M + 4, k, T);
      }
    }
    function y(_, w, k, A) {
      A < 0 && _.x === 1 && (o[w] = _.x - 1), k.x === 0 && k.z === 0 && (o[w] = A / 2 / Math.PI + .5);
    }
    function b(_) {
      return Math.atan2(_.z, -_.x);
    }
    function v(_) {
      return Math.atan2(-_.y, Math.sqrt(_.x * _.x + _.z * _.z));
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new eDt(t.vertices, t.indices, t.radius, t.detail);
  }
}

class RT {
  constructor() {
    this.type = "Curve", this.arcLengthDivisions = 200, this.needsUpdate = !1, this.cacheArcLengths = null;
  }
  getPoint() {
    Es("Curve: .getPoint() not implemented.");
  }
  getPointAt(t, n) {
    const r = this.getUtoTmapping(t);
    return this.getPoint(r, n);
  }
  getPoints(t = 5) {
    const n = [];
    for (let r = 0; r <= t; r++) n.push(this.getPoint(r / t));
    return n;
  }
  getSpacedPoints(t = 5) {
    const n = [];
    for (let r = 0; r <= t; r++) n.push(this.getPointAt(r / t));
    return n;
  }
  getLength() {
    const t = this.getLengths();
    return t[t.length - 1];
  }
  getLengths(t = this.arcLengthDivisions) {
    if (this.cacheArcLengths && this.cacheArcLengths.length === t + 1 && !this.needsUpdate) return this.cacheArcLengths;
    this.needsUpdate = !1;
    const n = [];
    let r,
      a = this.getPoint(0),
      i = 0;
    n.push(0);
    for (let o = 1; o <= t; o++) r = this.getPoint(o / t), i += r.distanceTo(a), n.push(i), a = r;
    return this.cacheArcLengths = n, n;
  }
  updateArcLengths() {
    this.needsUpdate = !0, this.getLengths();
  }
  getUtoTmapping(t, n = null) {
    const r = this.getLengths();
    let a = 0;
    const i = r.length;
    let o;
    n ? o = n : o = t * r[i - 1];
    let s = 0,
      l = i - 1,
      d;
    for (; s <= l;) if (a = Math.floor(s + (l - s) / 2), d = r[a] - o, d < 0) s = a + 1;else if (d > 0) l = a - 1;else {
      l = a;
      break;
    }
    if (a = l, r[a] === o) return a / (i - 1);
    const u = r[a],
      p = r[a + 1] - u,
      m = (o - u) / p;
    return (a + m) / (i - 1);
  }
  getTangent(t, n) {
    let a = t - 1e-4,
      i = t + 1e-4;
    a < 0 && (a = 0), i > 1 && (i = 1);
    const o = this.getPoint(a),
      s = this.getPoint(i),
      l = n || (o.isVector2 ? new Qi() : new dr());
    return l.copy(s).sub(o).normalize(), l;
  }
  getTangentAt(t, n) {
    const r = this.getUtoTmapping(t);
    return this.getTangent(r, n);
  }
  computeFrenetFrames(t, n = !1) {
    const r = new dr(),
      a = [],
      i = [],
      o = [],
      s = new dr(),
      l = new bo();
    for (let m = 0; m <= t; m++) {
      const f = m / t;
      a[m] = this.getTangentAt(f, new dr());
    }
    i[0] = new dr(), o[0] = new dr();
    let d = Number.MAX_VALUE;
    const u = Math.abs(a[0].x),
      h = Math.abs(a[0].y),
      p = Math.abs(a[0].z);
    u <= d && (d = u, r.set(1, 0, 0)), h <= d && (d = h, r.set(0, 1, 0)), p <= d && r.set(0, 0, 1), s.crossVectors(a[0], r).normalize(), i[0].crossVectors(a[0], s), o[0].crossVectors(a[0], i[0]);
    for (let m = 1; m <= t; m++) {
      if (i[m] = i[m - 1].clone(), o[m] = o[m - 1].clone(), s.crossVectors(a[m - 1], a[m]), s.length() > Number.EPSILON) {
        s.normalize();
        const f = Math.acos(Dl(a[m - 1].dot(a[m]), -1, 1));
        i[m].applyMatrix4(l.makeRotationAxis(s, f));
      }
      o[m].crossVectors(a[m], i[m]);
    }
    if (n === !0) {
      let m = Math.acos(Dl(i[0].dot(i[t]), -1, 1));
      m /= t, a[0].dot(s.crossVectors(i[0], i[t])) > 0 && (m = -m);
      for (let f = 1; f <= t; f++) i[f].applyMatrix4(l.makeRotationAxis(a[f], m * f)), o[f].crossVectors(a[f], i[f]);
    }
    return {
      tangents: a,
      normals: i,
      binormals: o
    };
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.arcLengthDivisions = t.arcLengthDivisions, this;
  }
  toJSON() {
    const t = {
      metadata: {
        version: 4.7,
        type: "Curve",
        generator: "Curve.toJSON"
      }
    };
    return t.arcLengthDivisions = this.arcLengthDivisions, t.type = this.type, t;
  }
  fromJSON(t) {
    return this.arcLengthDivisions = t.arcLengthDivisions, this;
  }
}

class tDt extends RT {
  constructor(t = 0, n = 0, r = 1, a = 1, i = 0, o = Math.PI * 2, s = !1, l = 0) {
    super(), this.isEllipseCurve = !0, this.type = "EllipseCurve", this.aX = t, this.aY = n, this.xRadius = r, this.yRadius = a, this.aStartAngle = i, this.aEndAngle = o, this.aClockwise = s, this.aRotation = l;
  }
  getPoint(t, n = new Qi()) {
    const r = n,
      a = Math.PI * 2;
    let i = this.aEndAngle - this.aStartAngle;
    const o = Math.abs(i) < Number.EPSILON;
    for (; i < 0;) i += a;
    for (; i > a;) i -= a;
    i < Number.EPSILON && (o ? i = 0 : i = a), this.aClockwise === !0 && !o && (i === a ? i = -a : i = i - a);
    const s = this.aStartAngle + t * i;
    let l = this.aX + this.xRadius * Math.cos(s),
      d = this.aY + this.yRadius * Math.sin(s);
    if (this.aRotation !== 0) {
      const u = Math.cos(this.aRotation),
        h = Math.sin(this.aRotation),
        p = l - this.aX,
        m = d - this.aY;
      l = p * u - m * h + this.aX, d = p * h + m * u + this.aY;
    }
    return r.set(l, d);
  }
  copy(t) {
    return super.copy(t), this.aX = t.aX, this.aY = t.aY, this.xRadius = t.xRadius, this.yRadius = t.yRadius, this.aStartAngle = t.aStartAngle, this.aEndAngle = t.aEndAngle, this.aClockwise = t.aClockwise, this.aRotation = t.aRotation, this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.aX = this.aX, t.aY = this.aY, t.xRadius = this.xRadius, t.yRadius = this.yRadius, t.aStartAngle = this.aStartAngle, t.aEndAngle = this.aEndAngle, t.aClockwise = this.aClockwise, t.aRotation = this.aRotation, t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.aX = t.aX, this.aY = t.aY, this.xRadius = t.xRadius, this.yRadius = t.yRadius, this.aStartAngle = t.aStartAngle, this.aEndAngle = t.aEndAngle, this.aClockwise = t.aClockwise, this.aRotation = t.aRotation, this;
  }
}

class nxa extends tDt {
  constructor(t, n, r, a, i, o) {
    super(t, n, r, r, a, i, o), this.isArcCurve = !0, this.type = "ArcCurve";
  }
}

function nDt() {
  let e = 0,
    t = 0,
    n = 0,
    r = 0;
  function a(i, o, s, l) {
    e = i, t = s, n = -3 * i + 3 * o - 2 * s - l, r = 2 * i - 2 * o + s + l;
  }
  return {
    initCatmullRom: function (i, o, s, l, d) {
      a(o, s, d * (s - i), d * (l - o));
    },
    initNonuniformCatmullRom: function (i, o, s, l, d, u, h) {
      let p = (o - i) / d - (s - i) / (d + u) + (s - o) / u,
        m = (s - o) / u - (l - o) / (u + h) + (l - s) / h;
      p *= u, m *= u, a(o, s, p, m);
    },
    calc: function (i) {
      const o = i * i,
        s = o * i;
      return e + t * i + n * o + r * s;
    }
  };
}

const C8e = new dr(),
  krt = new nDt(),
  Art = new nDt(),
  Srt = new nDt();

class rDt extends RT {
  constructor(t = [], n = !1, r = "centripetal", a = .5) {
    super(), this.isCatmullRomCurve3 = !0, this.type = "CatmullRomCurve3", this.points = t, this.closed = n, this.curveType = r, this.tension = a;
  }
  getPoint(t, n = new dr()) {
    const r = n,
      a = this.points,
      i = a.length,
      o = (i - (this.closed ? 0 : 1)) * t;
    let s = Math.floor(o),
      l = o - s;
    this.closed ? s += s > 0 ? 0 : (Math.floor(Math.abs(s) / i) + 1) * i : l === 0 && s === i - 1 && (s = i - 2, l = 1);
    let d, u;
    this.closed || s > 0 ? d = a[(s - 1) % i] : (C8e.subVectors(a[0], a[1]).add(a[0]), d = C8e);
    const h = a[s % i],
      p = a[(s + 1) % i];
    if (this.closed || s + 2 < i ? u = a[(s + 2) % i] : (C8e.subVectors(a[i - 1], a[i - 2]).add(a[i - 1]), u = C8e), this.curveType === "centripetal" || this.curveType === "chordal") {
      const m = this.curveType === "chordal" ? .5 : .25;
      let f = Math.pow(d.distanceToSquared(h), m),
        y = Math.pow(h.distanceToSquared(p), m),
        b = Math.pow(p.distanceToSquared(u), m);
      y < 1e-4 && (y = 1), f < 1e-4 && (f = y), b < 1e-4 && (b = y), krt.initNonuniformCatmullRom(d.x, h.x, p.x, u.x, f, y, b), Art.initNonuniformCatmullRom(d.y, h.y, p.y, u.y, f, y, b), Srt.initNonuniformCatmullRom(d.z, h.z, p.z, u.z, f, y, b);
    } else this.curveType === "catmullrom" && (krt.initCatmullRom(d.x, h.x, p.x, u.x, this.tension), Art.initCatmullRom(d.y, h.y, p.y, u.y, this.tension), Srt.initCatmullRom(d.z, h.z, p.z, u.z, this.tension));
    return r.set(krt.calc(l), Art.calc(l), Srt.calc(l)), r;
  }
  copy(t) {
    super.copy(t), this.points = [];
    for (let n = 0, r = t.points.length; n < r; n++) {
      const a = t.points[n];
      this.points.push(a.clone());
    }
    return this.closed = t.closed, this.curveType = t.curveType, this.tension = t.tension, this;
  }
  toJSON() {
    const t = super.toJSON();
    t.points = [];
    for (let n = 0, r = this.points.length; n < r; n++) {
      const a = this.points[n];
      t.points.push(a.toArray());
    }
    return t.closed = this.closed, t.curveType = this.curveType, t.tension = this.tension, t;
  }
  fromJSON(t) {
    super.fromJSON(t), this.points = [];
    for (let n = 0, r = t.points.length; n < r; n++) {
      const a = t.points[n];
      this.points.push(new dr().fromArray(a));
    }
    return this.closed = t.closed, this.curveType = t.curveType, this.tension = t.tension, this;
  }
}

function FZt(e, t, n, r, a) {
  const i = (r - t) * .5,
    o = (a - n) * .5,
    s = e * e,
    l = e * s;
  return (2 * n - 2 * r + i + o) * l + (-3 * n + 3 * r - 2 * i - o) * s + i * e + n;
}

function rxa(e, t) {
  const n = 1 - e;
  return n * n * t;
}

function axa(e, t) {
  return 2 * (1 - e) * e * t;
}

function ixa(e, t) {
  return e * e * t;
}

function Bve(e, t, n, r) {
  return rxa(e, t) + axa(e, n) + ixa(e, r);
}

function oxa(e, t) {
  const n = 1 - e;
  return n * n * n * t;
}

function sxa(e, t) {
  const n = 1 - e;
  return 3 * n * n * e * t;
}

function lxa(e, t) {
  return 3 * (1 - e) * e * e * t;
}

function cxa(e, t) {
  return e * e * e * t;
}

function Fve(e, t, n, r, a) {
  return oxa(e, t) + sxa(e, n) + lxa(e, r) + cxa(e, a);
}

class Vqn extends RT {
  constructor(t = new Qi(), n = new Qi(), r = new Qi(), a = new Qi()) {
    super(), this.isCubicBezierCurve = !0, this.type = "CubicBezierCurve", this.v0 = t, this.v1 = n, this.v2 = r, this.v3 = a;
  }
  getPoint(t, n = new Qi()) {
    const r = n,
      a = this.v0,
      i = this.v1,
      o = this.v2,
      s = this.v3;
    return r.set(Fve(t, a.x, i.x, o.x, s.x), Fve(t, a.y, i.y, o.y, s.y)), r;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this.v3.copy(t.v3), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t.v3 = this.v3.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this.v3.fromArray(t.v3), this;
  }
}

class dxa extends RT {
  constructor(t = new dr(), n = new dr(), r = new dr(), a = new dr()) {
    super(), this.isCubicBezierCurve3 = !0, this.type = "CubicBezierCurve3", this.v0 = t, this.v1 = n, this.v2 = r, this.v3 = a;
  }
  getPoint(t, n = new dr()) {
    const r = n,
      a = this.v0,
      i = this.v1,
      o = this.v2,
      s = this.v3;
    return r.set(Fve(t, a.x, i.x, o.x, s.x), Fve(t, a.y, i.y, o.y, s.y), Fve(t, a.z, i.z, o.z, s.z)), r;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this.v3.copy(t.v3), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t.v3 = this.v3.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this.v3.fromArray(t.v3), this;
  }
}

class Hqn extends RT {
  constructor(t = new Qi(), n = new Qi()) {
    super(), this.isLineCurve = !0, this.type = "LineCurve", this.v1 = t, this.v2 = n;
  }
  getPoint(t, n = new Qi()) {
    const r = n;
    return t === 1 ? r.copy(this.v2) : (r.copy(this.v2).sub(this.v1), r.multiplyScalar(t).add(this.v1)), r;
  }
  getPointAt(t, n) {
    return this.getPoint(t, n);
  }
  getTangent(t, n = new Qi()) {
    return n.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(t, n) {
    return this.getTangent(t, n);
  }
  copy(t) {
    return super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}

class uxa extends RT {
  constructor(t = new dr(), n = new dr()) {
    super(), this.isLineCurve3 = !0, this.type = "LineCurve3", this.v1 = t, this.v2 = n;
  }
  getPoint(t, n = new dr()) {
    const r = n;
    return t === 1 ? r.copy(this.v2) : (r.copy(this.v2).sub(this.v1), r.multiplyScalar(t).add(this.v1)), r;
  }
  getPointAt(t, n) {
    return this.getPoint(t, n);
  }
  getTangent(t, n = new dr()) {
    return n.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(t, n) {
    return this.getTangent(t, n);
  }
  copy(t) {
    return super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}

class Wqn extends RT {
  constructor(t = new Qi(), n = new Qi(), r = new Qi()) {
    super(), this.isQuadraticBezierCurve = !0, this.type = "QuadraticBezierCurve", this.v0 = t, this.v1 = n, this.v2 = r;
  }
  getPoint(t, n = new Qi()) {
    const r = n,
      a = this.v0,
      i = this.v1,
      o = this.v2;
    return r.set(Bve(t, a.x, i.x, o.x), Bve(t, a.y, i.y, o.y)), r;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}

class qqn extends RT {
  constructor(t = new dr(), n = new dr(), r = new dr()) {
    super(), this.isQuadraticBezierCurve3 = !0, this.type = "QuadraticBezierCurve3", this.v0 = t, this.v1 = n, this.v2 = r;
  }
  getPoint(t, n = new dr()) {
    const r = n,
      a = this.v0,
      i = this.v1,
      o = this.v2;
    return r.set(Bve(t, a.x, i.x, o.x), Bve(t, a.y, i.y, o.y), Bve(t, a.z, i.z, o.z)), r;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}

class Kqn extends RT {
  constructor(t = []) {
    super(), this.isSplineCurve = !0, this.type = "SplineCurve", this.points = t;
  }
  getPoint(t, n = new Qi()) {
    const r = n,
      a = this.points,
      i = (a.length - 1) * t,
      o = Math.floor(i),
      s = i - o,
      l = a[o === 0 ? o : o - 1],
      d = a[o],
      u = a[o > a.length - 2 ? a.length - 1 : o + 1],
      h = a[o > a.length - 3 ? a.length - 1 : o + 2];
    return r.set(FZt(s, l.x, d.x, u.x, h.x), FZt(s, l.y, d.y, u.y, h.y)), r;
  }
  copy(t) {
    super.copy(t), this.points = [];
    for (let n = 0, r = t.points.length; n < r; n++) {
      const a = t.points[n];
      this.points.push(a.clone());
    }
    return this;
  }
  toJSON() {
    const t = super.toJSON();
    t.points = [];
    for (let n = 0, r = this.points.length; n < r; n++) {
      const a = this.points[n];
      t.points.push(a.toArray());
    }
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t), this.points = [];
    for (let n = 0, r = t.points.length; n < r; n++) {
      const a = t.points[n];
      this.points.push(new Qi().fromArray(a));
    }
    return this;
  }
}

var xvt = Object.freeze({
  __proto__: null,
  ArcCurve: nxa,
  CatmullRomCurve3: rDt,
  CubicBezierCurve: Vqn,
  CubicBezierCurve3: dxa,
  EllipseCurve: tDt,
  LineCurve: Hqn,
  LineCurve3: uxa,
  QuadraticBezierCurve: Wqn,
  QuadraticBezierCurve3: qqn,
  SplineCurve: Kqn
});

class hxa extends RT {
  constructor() {
    super(), this.type = "CurvePath", this.curves = [], this.autoClose = !1;
  }
  add(t) {
    this.curves.push(t);
  }
  closePath() {
    const t = this.curves[0].getPoint(0),
      n = this.curves[this.curves.length - 1].getPoint(1);
    if (!t.equals(n)) {
      const r = t.isVector2 === !0 ? "LineCurve" : "LineCurve3";
      this.curves.push(new xvt[r](n, t));
    }
    return this;
  }
  getPoint(t, n) {
    const r = t * this.getLength(),
      a = this.getCurveLengths();
    let i = 0;
    for (; i < a.length;) {
      if (a[i] >= r) {
        const o = a[i] - r,
          s = this.curves[i],
          l = s.getLength(),
          d = l === 0 ? 0 : 1 - o / l;
        return s.getPointAt(d, n);
      }
      i++;
    }
    return null;
  }
  getLength() {
    const t = this.getCurveLengths();
    return t[t.length - 1];
  }
  updateArcLengths() {
    this.needsUpdate = !0, this.cacheLengths = null, this.getCurveLengths();
  }
  getCurveLengths() {
    if (this.cacheLengths && this.cacheLengths.length === this.curves.length) return this.cacheLengths;
    const t = [];
    let n = 0;
    for (let r = 0, a = this.curves.length; r < a; r++) n += this.curves[r].getLength(), t.push(n);
    return this.cacheLengths = t, t;
  }
  getSpacedPoints(t = 40) {
    const n = [];
    for (let r = 0; r <= t; r++) n.push(this.getPoint(r / t));
    return this.autoClose && n.push(n[0]), n;
  }
  getPoints(t = 12) {
    const n = [];
    let r;
    for (let a = 0, i = this.curves; a < i.length; a++) {
      const o = i[a],
        s = o.isEllipseCurve ? t * 2 : o.isLineCurve || o.isLineCurve3 ? 1 : o.isSplineCurve ? t * o.points.length : t,
        l = o.getPoints(s);
      for (let d = 0; d < l.length; d++) {
        const u = l[d];
        r && r.equals(u) || (n.push(u), r = u);
      }
    }
    return this.autoClose && n.length > 1 && !n[n.length - 1].equals(n[0]) && n.push(n[0]), n;
  }
  copy(t) {
    super.copy(t), this.curves = [];
    for (let n = 0, r = t.curves.length; n < r; n++) {
      const a = t.curves[n];
      this.curves.push(a.clone());
    }
    return this.autoClose = t.autoClose, this;
  }
  toJSON() {
    const t = super.toJSON();
    t.autoClose = this.autoClose, t.curves = [];
    for (let n = 0, r = this.curves.length; n < r; n++) {
      const a = this.curves[n];
      t.curves.push(a.toJSON());
    }
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t), this.autoClose = t.autoClose, this.curves = [];
    for (let n = 0, r = t.curves.length; n < r; n++) {
      const a = t.curves[n];
      this.curves.push(new xvt[a.type]().fromJSON(a));
    }
    return this;
  }
}

class zZt extends hxa {
  constructor(t) {
    super(), this.type = "Path", this.currentPoint = new Qi(), t && this.setFromPoints(t);
  }
  setFromPoints(t) {
    this.moveTo(t[0].x, t[0].y);
    for (let n = 1, r = t.length; n < r; n++) this.lineTo(t[n].x, t[n].y);
    return this;
  }
  moveTo(t, n) {
    return this.currentPoint.set(t, n), this;
  }
  lineTo(t, n) {
    const r = new Hqn(this.currentPoint.clone(), new Qi(t, n));
    return this.curves.push(r), this.currentPoint.set(t, n), this;
  }
  quadraticCurveTo(t, n, r, a) {
    const i = new Wqn(this.currentPoint.clone(), new Qi(t, n), new Qi(r, a));
    return this.curves.push(i), this.currentPoint.set(r, a), this;
  }
  bezierCurveTo(t, n, r, a, i, o) {
    const s = new Vqn(this.currentPoint.clone(), new Qi(t, n), new Qi(r, a), new Qi(i, o));
    return this.curves.push(s), this.currentPoint.set(i, o), this;
  }
  splineThru(t) {
    const n = [this.currentPoint.clone()].concat(t),
      r = new Kqn(n);
    return this.curves.push(r), this.currentPoint.copy(t[t.length - 1]), this;
  }
  arc(t, n, r, a, i, o) {
    const s = this.currentPoint.x,
      l = this.currentPoint.y;
    return this.absarc(t + s, n + l, r, a, i, o), this;
  }
  absarc(t, n, r, a, i, o) {
    return this.absellipse(t, n, r, r, a, i, o), this;
  }
  ellipse(t, n, r, a, i, o, s, l) {
    const d = this.currentPoint.x,
      u = this.currentPoint.y;
    return this.absellipse(t + d, n + u, r, a, i, o, s, l), this;
  }
  absellipse(t, n, r, a, i, o, s, l) {
    const d = new tDt(t, n, r, a, i, o, s, l);
    if (this.curves.length > 0) {
      const h = d.getPoint(0);
      h.equals(this.currentPoint) || this.lineTo(h.x, h.y);
    }
    this.curves.push(d);
    const u = d.getPoint(1);
    return this.currentPoint.copy(u), this;
  }
  copy(t) {
    return super.copy(t), this.currentPoint.copy(t.currentPoint), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.currentPoint = this.currentPoint.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.currentPoint.fromArray(t.currentPoint), this;
  }
}

class Qqn extends zZt {
  constructor(t) {
    super(t), this.uuid = H5(), this.type = "Shape", this.holes = [];
  }
  getPointsHoles(t) {
    const n = [];
    for (let r = 0, a = this.holes.length; r < a; r++) n[r] = this.holes[r].getPoints(t);
    return n;
  }
  extractPoints(t) {
    return {
      shape: this.getPoints(t),
      holes: this.getPointsHoles(t)
    };
  }
  copy(t) {
    super.copy(t), this.holes = [];
    for (let n = 0, r = t.holes.length; n < r; n++) {
      const a = t.holes[n];
      this.holes.push(a.clone());
    }
    return this;
  }
  toJSON() {
    const t = super.toJSON();
    t.uuid = this.uuid, t.holes = [];
    for (let n = 0, r = this.holes.length; n < r; n++) {
      const a = this.holes[n];
      t.holes.push(a.toJSON());
    }
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t), this.uuid = t.uuid, this.holes = [];
    for (let n = 0, r = t.holes.length; n < r; n++) {
      const a = t.holes[n];
      this.holes.push(new zZt().fromJSON(a));
    }
    return this;
  }
}

function pxa(e, t, n = 2) {
  const r = t && t.length,
    a = r ? t[0] * n : e.length;
  let i = Yqn(e, 0, a, n, !0);
  const o = [];
  if (!i || i.next === i.prev) return o;
  let s, l, d;
  if (r && (i = bxa(e, t, i, n)), e.length > 80 * n) {
    s = e[0], l = e[1];
    let u = s,
      h = l;
    for (let p = n; p < a; p += n) {
      const m = e[p],
        f = e[p + 1];
      m < s && (s = m), f < l && (l = f), m > u && (u = m), f > h && (h = f);
    }
    d = Math.max(u - s, h - l), d = d !== 0 ? 32767 / d : 0;
  }
  return j_e(i, o, n, s, l, d, 0), o;
}

function Yqn(e, t, n, r, a) {
  let i;
  if (a === Txa(e, t, n, r) > 0) for (let o = t; o < n; o += r) i = UZt(o / r | 0, e[o], e[o + 1], i);else for (let o = n - r; o >= t; o -= r) i = UZt(o / r | 0, e[o], e[o + 1], i);
  return i && ide(i, i.next) && (L_e(i), i = i.next), i;
}

function JX(e, t) {
  if (!e) return e;
  t || (t = e);
  let n = e,
    r;
  do if (r = !1, !n.steiner && (ide(n, n.next) || og(n.prev, n, n.next) === 0)) {
    if (L_e(n), n = t = n.prev, n === n.next) break;
    r = !0;
  } else n = n.next; while (r || n !== t);
  return t;
}

function j_e(e, t, n, r, a, i, o) {
  if (!e) return;
  !o && i && kxa(e, r, a, i);
  let s = e;
  for (; e.prev !== e.next;) {
    const l = e.prev,
      d = e.next;
    if (i ? fxa(e, r, a, i) : mxa(e)) {
      t.push(l.i, e.i, d.i), L_e(e), e = d.next, s = d.next;
      continue;
    }
    if (e = d, e === s) {
      o ? o === 1 ? (e = gxa(JX(e), t), j_e(e, t, n, r, a, i, 2)) : o === 2 && yxa(e, t, n, r, a, i) : j_e(JX(e), t, n, r, a, i, 1);
      break;
    }
  }
}

function mxa(e) {
  const t = e.prev,
    n = e,
    r = e.next;
  if (og(t, n, r) >= 0) return !1;
  const a = t.x,
    i = n.x,
    o = r.x,
    s = t.y,
    l = n.y,
    d = r.y,
    u = Math.min(a, i, o),
    h = Math.min(s, l, d),
    p = Math.max(a, i, o),
    m = Math.max(s, l, d);
  let f = r.next;
  for (; f !== t;) {
    if (f.x >= u && f.x <= p && f.y >= h && f.y <= m && M0e(a, s, i, l, o, d, f.x, f.y) && og(f.prev, f, f.next) >= 0) return !1;
    f = f.next;
  }
  return !0;
}

function fxa(e, t, n, r) {
  const a = e.prev,
    i = e,
    o = e.next;
  if (og(a, i, o) >= 0) return !1;
  const s = a.x,
    l = i.x,
    d = o.x,
    u = a.y,
    h = i.y,
    p = o.y,
    m = Math.min(s, l, d),
    f = Math.min(u, h, p),
    y = Math.max(s, l, d),
    b = Math.max(u, h, p),
    v = _vt(m, f, t, n, r),
    _ = _vt(y, b, t, n, r);
  let w = e.prevZ,
    k = e.nextZ;
  for (; w && w.z >= v && k && k.z <= _;) {
    if (w.x >= m && w.x <= y && w.y >= f && w.y <= b && w !== a && w !== o && M0e(s, u, l, h, d, p, w.x, w.y) && og(w.prev, w, w.next) >= 0 || (w = w.prevZ, k.x >= m && k.x <= y && k.y >= f && k.y <= b && k !== a && k !== o && M0e(s, u, l, h, d, p, k.x, k.y) && og(k.prev, k, k.next) >= 0)) return !1;
    k = k.nextZ;
  }
  for (; w && w.z >= v;) {
    if (w.x >= m && w.x <= y && w.y >= f && w.y <= b && w !== a && w !== o && M0e(s, u, l, h, d, p, w.x, w.y) && og(w.prev, w, w.next) >= 0) return !1;
    w = w.prevZ;
  }
  for (; k && k.z <= _;) {
    if (k.x >= m && k.x <= y && k.y >= f && k.y <= b && k !== a && k !== o && M0e(s, u, l, h, d, p, k.x, k.y) && og(k.prev, k, k.next) >= 0) return !1;
    k = k.nextZ;
  }
  return !0;
}

function gxa(e, t) {
  let n = e;
  do {
    const r = n.prev,
      a = n.next.next;
    !ide(r, a) && Jqn(r, n, n.next, a) && D_e(r, a) && D_e(a, r) && (t.push(r.i, n.i, a.i), L_e(n), L_e(n.next), n = e = a), n = n.next;
  } while (n !== e);
  return JX(n);
}

function yxa(e, t, n, r, a, i) {
  let o = e;
  do {
    let s = o.next.next;
    for (; s !== o.prev;) {
      if (o.i !== s.i && Ixa(o, s)) {
        let l = Zqn(o, s);
        o = JX(o, o.next), l = JX(l, l.next), j_e(o, t, n, r, a, i, 0), j_e(l, t, n, r, a, i, 0);
        return;
      }
      s = s.next;
    }
    o = o.next;
  } while (o !== e);
}

function bxa(e, t, n, r) {
  const a = [];
  for (let i = 0, o = t.length; i < o; i++) {
    const s = t[i] * r,
      l = i < o - 1 ? t[i + 1] * r : e.length,
      d = Yqn(e, s, l, r, !1);
    d === d.next && (d.steiner = !0), a.push(Sxa(d));
  }
  a.sort(vxa);
  for (let i = 0; i < a.length; i++) n = wxa(a[i], n);
  return n;
}

function vxa(e, t) {
  let n = e.x - t.x;
  if (n === 0 && (n = e.y - t.y, n === 0)) {
    const r = (e.next.y - e.y) / (e.next.x - e.x),
      a = (t.next.y - t.y) / (t.next.x - t.x);
    n = r - a;
  }
  return n;
}

function wxa(e, t) {
  const n = xxa(e, t);
  if (!n) return t;
  const r = Zqn(n, e);
  return JX(r, r.next), JX(n, n.next);
}

function xxa(e, t) {
  let n = t;
  const r = e.x,
    a = e.y;
  let i = -1 / 0,
    o;
  if (ide(e, n)) return n;
  do {
    if (ide(e, n.next)) return n.next;
    if (a <= n.y && a >= n.next.y && n.next.y !== n.y) {
      const h = n.x + (a - n.y) * (n.next.x - n.x) / (n.next.y - n.y);
      if (h <= r && h > i && (i = h, o = n.x < n.next.x ? n : n.next, h === r)) return o;
    }
    n = n.next;
  } while (n !== t);
  if (!o) return null;
  const s = o,
    l = o.x,
    d = o.y;
  let u = 1 / 0;
  n = o;
  do {
    if (r >= n.x && n.x >= l && r !== n.x && Xqn(a < d ? r : i, a, l, d, a < d ? i : r, a, n.x, n.y)) {
      const h = Math.abs(a - n.y) / (r - n.x);
      D_e(n, e) && (h < u || h === u && (n.x > o.x || n.x === o.x && _xa(o, n))) && (o = n, u = h);
    }
    n = n.next;
  } while (n !== s);
  return o;
}

function _xa(e, t) {
  return og(e.prev, e, t.prev) < 0 && og(t.next, e, e.next) < 0;
}

function kxa(e, t, n, r) {
  let a = e;
  do a.z === 0 && (a.z = _vt(a.x, a.y, t, n, r)), a.prevZ = a.prev, a.nextZ = a.next, a = a.next; while (a !== e);
  a.prevZ.nextZ = null, a.prevZ = null, Axa(a);
}

function Axa(e) {
  let t,
    n = 1;
  do {
    let r = e,
      a;
    e = null;
    let i = null;
    for (t = 0; r;) {
      t++;
      let o = r,
        s = 0;
      for (let d = 0; d < n && (s++, o = o.nextZ, !!o); d++);
      let l = n;
      for (; s > 0 || l > 0 && o;) s !== 0 && (l === 0 || !o || r.z <= o.z) ? (a = r, r = r.nextZ, s--) : (a = o, o = o.nextZ, l--), i ? i.nextZ = a : e = a, a.prevZ = i, i = a;
      r = o;
    }
    i.nextZ = null, n *= 2;
  } while (t > 1);
  return e;
}

function _vt(e, t, n, r, a) {
  return e = (e - n) * a | 0, t = (t - r) * a | 0, e = (e | e << 8) & 16711935, e = (e | e << 4) & 252645135, e = (e | e << 2) & 858993459, e = (e | e << 1) & 1431655765, t = (t | t << 8) & 16711935, t = (t | t << 4) & 252645135, t = (t | t << 2) & 858993459, t = (t | t << 1) & 1431655765, e | t << 1;
}

function Sxa(e) {
  let t = e,
    n = e;
  do (t.x < n.x || t.x === n.x && t.y < n.y) && (n = t), t = t.next; while (t !== e);
  return n;
}

function Xqn(e, t, n, r, a, i, o, s) {
  return (a - o) * (t - s) >= (e - o) * (i - s) && (e - o) * (r - s) >= (n - o) * (t - s) && (n - o) * (i - s) >= (a - o) * (r - s);
}

function M0e(e, t, n, r, a, i, o, s) {
  return !(e === o && t === s) && Xqn(e, t, n, r, a, i, o, s);
}

function Ixa(e, t) {
  return e.next.i !== t.i && e.prev.i !== t.i && !Cxa(e, t) && (D_e(e, t) && D_e(t, e) && Exa(e, t) && (og(e.prev, e, t.prev) || og(e, t.prev, t)) || ide(e, t) && og(e.prev, e, e.next) > 0 && og(t.prev, t, t.next) > 0);
}

function og(e, t, n) {
  return (t.y - e.y) * (n.x - t.x) - (t.x - e.x) * (n.y - t.y);
}

function ide(e, t) {
  return e.x === t.x && e.y === t.y;
}

function Jqn(e, t, n, r) {
  const a = T8e(og(e, t, n)),
    i = T8e(og(e, t, r)),
    o = T8e(og(n, r, e)),
    s = T8e(og(n, r, t));
  return !!(a !== i && o !== s || a === 0 && E8e(e, n, t) || i === 0 && E8e(e, r, t) || o === 0 && E8e(n, e, r) || s === 0 && E8e(n, t, r));
}

function E8e(e, t, n) {
  return t.x <= Math.max(e.x, n.x) && t.x >= Math.min(e.x, n.x) && t.y <= Math.max(e.y, n.y) && t.y >= Math.min(e.y, n.y);
}

function T8e(e) {
  return e > 0 ? 1 : e < 0 ? -1 : 0;
}

function Cxa(e, t) {
  let n = e;
  do {
    if (n.i !== e.i && n.next.i !== e.i && n.i !== t.i && n.next.i !== t.i && Jqn(n, n.next, e, t)) return !0;
    n = n.next;
  } while (n !== e);
  return !1;
}

function D_e(e, t) {
  return og(e.prev, e, e.next) < 0 ? og(e, t, e.next) >= 0 && og(e, e.prev, t) >= 0 : og(e, t, e.prev) < 0 || og(e, e.next, t) < 0;
}

function Exa(e, t) {
  let n = e,
    r = !1;
  const a = (e.x + t.x) / 2,
    i = (e.y + t.y) / 2;
  do n.y > i != n.next.y > i && n.next.y !== n.y && a < (n.next.x - n.x) * (i - n.y) / (n.next.y - n.y) + n.x && (r = !r), n = n.next; while (n !== e);
  return r;
}

function Zqn(e, t) {
  const n = kvt(e.i, e.x, e.y),
    r = kvt(t.i, t.x, t.y),
    a = e.next,
    i = t.prev;
  return e.next = t, t.prev = e, n.next = a, a.prev = n, r.next = n, n.prev = r, i.next = r, r.prev = i, r;
}

function UZt(e, t, n, r) {
  const a = kvt(e, t, n);
  return r ? (a.next = r.next, a.prev = r, r.next.prev = a, r.next = a) : (a.prev = a, a.next = a), a;
}

function L_e(e) {
  e.next.prev = e.prev, e.prev.next = e.next, e.prevZ && (e.prevZ.nextZ = e.nextZ), e.nextZ && (e.nextZ.prevZ = e.prevZ);
}

function kvt(e, t, n) {
  return {
    i: e,
    x: t,
    y: n,
    prev: null,
    next: null,
    z: 0,
    prevZ: null,
    nextZ: null,
    steiner: !1
  };
}

function Txa(e, t, n, r) {
  let a = 0;
  for (let i = t, o = n - r; i < n; i += r) a += (e[o] - e[i]) * (e[i + 1] + e[o + 1]), o = i;
  return a;
}

class Mxa {
  static triangulate(t, n, r = 2) {
    return pxa(t, n, r);
  }
}

class Eie {
  static area(t) {
    const n = t.length;
    let r = 0;
    for (let a = n - 1, i = 0; i < n; a = i++) r += t[a].x * t[i].y - t[i].x * t[a].y;
    return r * .5;
  }
  static isClockWise(t) {
    return Eie.area(t) < 0;
  }
  static triangulateShape(t, n) {
    const r = [],
      a = [],
      i = [];
    $Zt(t), GZt(r, t);
    let o = t.length;
    n.forEach($Zt);
    for (let l = 0; l < n.length; l++) a.push(o), o += n[l].length, GZt(r, n[l]);
    const s = Mxa.triangulate(r, a);
    for (let l = 0; l < s.length; l += 3) i.push(s.slice(l, l + 3));
    return i;
  }
}

function $Zt(e) {
  const t = e.length;
  t > 2 && e[t - 1].equals(e[0]) && e.pop();
}

function GZt(e, t) {
  for (let n = 0; n < t.length; n++) e.push(t[n].x), e.push(t[n].y);
}

class fW extends eDt {
  constructor(t = 1, n = 0) {
    const r = [1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1],
      a = [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2];
    super(r, a, t, n), this.type = "OctahedronGeometry", this.parameters = {
      radius: t,
      detail: n
    };
  }
  static fromJSON(t) {
    return new fW(t.radius, t.detail);
  }
}

class W5 extends Fd {
  constructor(t = 1, n = 1, r = 1, a = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: t,
      height: n,
      widthSegments: r,
      heightSegments: a
    };
    const i = t / 2,
      o = n / 2,
      s = Math.floor(r),
      l = Math.floor(a),
      d = s + 1,
      u = l + 1,
      h = t / s,
      p = n / l,
      m = [],
      f = [],
      y = [],
      b = [];
    for (let v = 0; v < u; v++) {
      const _ = v * p - o;
      for (let w = 0; w < d; w++) {
        const k = w * h - i;
        f.push(k, -_, 0), y.push(0, 0, 1), b.push(w / s), b.push(1 - v / l);
      }
    }
    for (let v = 0; v < l; v++) for (let _ = 0; _ < s; _++) {
      const w = _ + d * v,
        k = _ + d * (v + 1),
        A = _ + 1 + d * (v + 1),
        S = _ + 1 + d * v;
      m.push(w, k, S), m.push(k, A, S);
    }
    this.setIndex(m), this.setAttribute("position", new Al(f, 3)), this.setAttribute("normal", new Al(y, 3)), this.setAttribute("uv", new Al(b, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new W5(t.width, t.height, t.widthSegments, t.heightSegments);
  }
}

class aDt extends Fd {
  constructor(t = new Qqn([new Qi(0, .5), new Qi(-.5, -.5), new Qi(.5, -.5)]), n = 12) {
    super(), this.type = "ShapeGeometry", this.parameters = {
      shapes: t,
      curveSegments: n
    };
    const r = [],
      a = [],
      i = [],
      o = [];
    let s = 0,
      l = 0;
    if (Array.isArray(t) === !1) d(t);else for (let u = 0; u < t.length; u++) d(t[u]), this.addGroup(s, l, u), s += l, l = 0;
    this.setIndex(r), this.setAttribute("position", new Al(a, 3)), this.setAttribute("normal", new Al(i, 3)), this.setAttribute("uv", new Al(o, 2));
    function d(u) {
      const h = a.length / 3,
        p = u.extractPoints(n);
      let m = p.shape;
      const f = p.holes;
      Eie.isClockWise(m) === !1 && (m = m.reverse());
      for (let b = 0, v = f.length; b < v; b++) {
        const _ = f[b];
        Eie.isClockWise(_) === !0 && (f[b] = _.reverse());
      }
      const y = Eie.triangulateShape(m, f);
      for (let b = 0, v = f.length; b < v; b++) {
        const _ = f[b];
        m = m.concat(_);
      }
      for (let b = 0, v = m.length; b < v; b++) {
        const _ = m[b];
        a.push(_.x, _.y, 0), i.push(0, 0, 1), o.push(_.x, _.y);
      }
      for (let b = 0, v = y.length; b < v; b++) {
        const _ = y[b],
          w = _[0] + h,
          k = _[1] + h,
          A = _[2] + h;
        r.push(w, k, A), l += 3;
      }
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  toJSON() {
    const t = super.toJSON(),
      n = this.parameters.shapes;
    return Pxa(n, t);
  }
  static fromJSON(t, n) {
    const r = [];
    for (let a = 0, i = t.shapes.length; a < i; a++) {
      const o = n[t.shapes[a]];
      r.push(o);
    }
    return new aDt(r, t.curveSegments);
  }
}

function Pxa(e, t) {
  if (t.shapes = [], Array.isArray(e)) for (let n = 0, r = e.length; n < r; n++) {
    const a = e[n];
    t.shapes.push(a.uuid);
  } else t.shapes.push(e.uuid);
  return t;
}

class qp extends Fd {
  constructor(t = 1, n = 32, r = 16, a = 0, i = Math.PI * 2, o = 0, s = Math.PI) {
    super(), this.type = "SphereGeometry", this.parameters = {
      radius: t,
      widthSegments: n,
      heightSegments: r,
      phiStart: a,
      phiLength: i,
      thetaStart: o,
      thetaLength: s
    }, n = Math.max(3, Math.floor(n)), r = Math.max(2, Math.floor(r));
    const l = Math.min(o + s, Math.PI);
    let d = 0;
    const u = [],
      h = new dr(),
      p = new dr(),
      m = [],
      f = [],
      y = [],
      b = [];
    for (let v = 0; v <= r; v++) {
      const _ = [],
        w = v / r;
      let k = 0;
      v === 0 && o === 0 ? k = .5 / n : v === r && l === Math.PI && (k = -.5 / n);
      for (let A = 0; A <= n; A++) {
        const S = A / n;
        h.x = -t * Math.cos(a + S * i) * Math.sin(o + w * s), h.y = t * Math.cos(o + w * s), h.z = t * Math.sin(a + S * i) * Math.sin(o + w * s), f.push(h.x, h.y, h.z), p.copy(h).normalize(), y.push(p.x, p.y, p.z), b.push(S + k, 1 - w), _.push(d++);
      }
      u.push(_);
    }
    for (let v = 0; v < r; v++) for (let _ = 0; _ < n; _++) {
      const w = u[v][_ + 1],
        k = u[v][_],
        A = u[v + 1][_],
        S = u[v + 1][_ + 1];
      (v !== 0 || o > 0) && m.push(w, k, S), (v !== r - 1 || l < Math.PI) && m.push(k, A, S);
    }
    this.setIndex(m), this.setAttribute("position", new Al(f, 3)), this.setAttribute("normal", new Al(y, 3)), this.setAttribute("uv", new Al(b, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new qp(t.radius, t.widthSegments, t.heightSegments, t.phiStart, t.phiLength, t.thetaStart, t.thetaLength);
  }
}

class xS extends Fd {
  constructor(t = 1, n = .4, r = 12, a = 48, i = Math.PI * 2, o = 0, s = Math.PI * 2) {
    super(), this.type = "TorusGeometry", this.parameters = {
      radius: t,
      tube: n,
      radialSegments: r,
      tubularSegments: a,
      arc: i,
      thetaStart: o,
      thetaLength: s
    }, r = Math.floor(r), a = Math.floor(a);
    const l = [],
      d = [],
      u = [],
      h = [],
      p = new dr(),
      m = new dr(),
      f = new dr();
    for (let y = 0; y <= r; y++) {
      const b = o + y / r * s;
      for (let v = 0; v <= a; v++) {
        const _ = v / a * i;
        m.x = (t + n * Math.cos(b)) * Math.cos(_), m.y = (t + n * Math.cos(b)) * Math.sin(_), m.z = n * Math.sin(b), d.push(m.x, m.y, m.z), p.x = t * Math.cos(_), p.y = t * Math.sin(_), f.subVectors(m, p).normalize(), u.push(f.x, f.y, f.z), h.push(v / a), h.push(y / r);
      }
    }
    for (let y = 1; y <= r; y++) for (let b = 1; b <= a; b++) {
      const v = (a + 1) * y + b - 1,
        _ = (a + 1) * (y - 1) + b - 1,
        w = (a + 1) * (y - 1) + b,
        k = (a + 1) * y + b;
      l.push(v, _, k), l.push(_, w, k);
    }
    this.setIndex(l), this.setAttribute("position", new Al(d, 3)), this.setAttribute("normal", new Al(u, 3)), this.setAttribute("uv", new Al(h, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new xS(t.radius, t.tube, t.radialSegments, t.tubularSegments, t.arc);
  }
}

class qYe extends Fd {
  constructor(t = new qqn(new dr(-1, -1, 0), new dr(-1, 1, 0), new dr(1, 1, 0)), n = 64, r = 1, a = 8, i = !1) {
    super(), this.type = "TubeGeometry", this.parameters = {
      path: t,
      tubularSegments: n,
      radius: r,
      radialSegments: a,
      closed: i
    };
    const o = t.computeFrenetFrames(n, i);
    this.tangents = o.tangents, this.normals = o.normals, this.binormals = o.binormals;
    const s = new dr(),
      l = new dr(),
      d = new Qi();
    let u = new dr();
    const h = [],
      p = [],
      m = [],
      f = [];
    y(), this.setIndex(f), this.setAttribute("position", new Al(h, 3)), this.setAttribute("normal", new Al(p, 3)), this.setAttribute("uv", new Al(m, 2));
    function y() {
      for (let w = 0; w < n; w++) b(w);
      b(i === !1 ? n : 0), _(), v();
    }
    function b(w) {
      u = t.getPointAt(w / n, u);
      const k = o.normals[w],
        A = o.binormals[w];
      for (let S = 0; S <= a; S++) {
        const C = S / a * Math.PI * 2,
          I = Math.sin(C),
          E = -Math.cos(C);
        l.x = E * k.x + I * A.x, l.y = E * k.y + I * A.y, l.z = E * k.z + I * A.z, l.normalize(), p.push(l.x, l.y, l.z), s.x = u.x + r * l.x, s.y = u.y + r * l.y, s.z = u.z + r * l.z, h.push(s.x, s.y, s.z);
      }
    }
    function v() {
      for (let w = 1; w <= n; w++) for (let k = 1; k <= a; k++) {
        const A = (a + 1) * (w - 1) + (k - 1),
          S = (a + 1) * w + (k - 1),
          C = (a + 1) * w + k,
          I = (a + 1) * (w - 1) + k;
        f.push(A, S, I), f.push(S, C, I);
      }
    }
    function _() {
      for (let w = 0; w <= n; w++) for (let k = 0; k <= a; k++) d.x = w / n, d.y = k / a, m.push(d.x, d.y);
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.path = this.parameters.path.toJSON(), t;
  }
  static fromJSON(t) {
    return new qYe(new xvt[t.path.type]().fromJSON(t.path), t.tubularSegments, t.radius, t.radialSegments, t.closed);
  }
}

class Rxa extends Fd {
  constructor(t = null) {
    if (super(), this.type = "WireframeGeometry", this.parameters = {
      geometry: t
    }, t !== null) {
      const n = [],
        r = new Set(),
        a = new dr(),
        i = new dr();
      if (t.index !== null) {
        const o = t.attributes.position,
          s = t.index;
        let l = t.groups;
        l.length === 0 && (l = [{
          start: 0,
          count: s.count,
          materialIndex: 0
        }]);
        for (let d = 0, u = l.length; d < u; ++d) {
          const h = l[d],
            p = h.start,
            m = h.count;
          for (let f = p, y = p + m; f < y; f += 3) for (let b = 0; b < 3; b++) {
            const v = s.getX(f + b),
              _ = s.getX(f + (b + 1) % 3);
            a.fromBufferAttribute(o, v), i.fromBufferAttribute(o, _), VZt(a, i, r) === !0 && (n.push(a.x, a.y, a.z), n.push(i.x, i.y, i.z));
          }
        }
      } else {
        const o = t.attributes.position;
        for (let s = 0, l = o.count / 3; s < l; s++) for (let d = 0; d < 3; d++) {
          const u = 3 * s + d,
            h = 3 * s + (d + 1) % 3;
          a.fromBufferAttribute(o, u), i.fromBufferAttribute(o, h), VZt(a, i, r) === !0 && (n.push(a.x, a.y, a.z), n.push(i.x, i.y, i.z));
        }
      }
      this.setAttribute("position", new Al(n, 3));
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
}

function VZt(e, t, n) {
  const r = `${e.x},${e.y},${e.z}-${t.x},${t.y},${t.z}`,
    a = `${t.x},${t.y},${t.z}-${e.x},${e.y},${e.z}`;
  return n.has(r) === !0 || n.has(a) === !0 ? !1 : (n.add(r), n.add(a), !0);
}

class Nxa extends Bk {
  constructor(t) {
    super(), this.isShadowMaterial = !0, this.type = "ShadowMaterial", this.color = new so(0), this.transparent = !0, this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.fog = t.fog, this;
  }
}

function ode(e) {
  const t = {};
  for (const n in e) {
    t[n] = {};
    for (const r in e[n]) {
      const a = e[n][r];
      a && (a.isColor || a.isMatrix3 || a.isMatrix4 || a.isVector2 || a.isVector3 || a.isVector4 || a.isTexture || a.isQuaternion) ? a.isRenderTargetTexture ? (Es("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), t[n][r] = null) : t[n][r] = a.clone() : Array.isArray(a) ? t[n][r] = a.slice() : t[n][r] = a;
    }
  }
  return t;
}

function r2(e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = ode(e[n]);
    for (const a in r) t[a] = r[a];
  }
  return t;
}

function jxa(e) {
  const t = [];
  for (let n = 0; n < e.length; n++) t.push(e[n].clone());
  return t;
}

function eKn(e) {
  const t = e.getRenderTarget();
  return t === null ? e.outputColorSpace : t.isXRRenderTarget === !0 ? t.texture.colorSpace : vc.workingColorSpace;
}

const iDt = {
  clone: ode,
  merge: r2
};

var Dxa = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,
  Lxa = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;

class Mx extends Bk {
  constructor(t) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = Dxa, this.fragmentShader = Lxa, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
      clipCullDistance: !1,
      multiDraw: !1
    }, this.defaultAttributeValues = {
      color: [1, 1, 1],
      uv: [0, 0],
      uv1: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, t !== void 0 && this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.fragmentShader = t.fragmentShader, this.vertexShader = t.vertexShader, this.uniforms = ode(t.uniforms), this.uniformsGroups = jxa(t.uniformsGroups), this.defines = Object.assign({}, t.defines), this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.fog = t.fog, this.lights = t.lights, this.clipping = t.clipping, this.extensions = Object.assign({}, t.extensions), this.glslVersion = t.glslVersion, this.defaultAttributeValues = Object.assign({}, t.defaultAttributeValues), this.index0AttributeName = t.index0AttributeName, this.uniformsNeedUpdate = t.uniformsNeedUpdate, this;
  }
  toJSON(t) {
    const n = super.toJSON(t);
    n.glslVersion = this.glslVersion, n.uniforms = {};
    for (const a in this.uniforms) {
      const o = this.uniforms[a].value;
      o && o.isTexture ? n.uniforms[a] = {
        type: "t",
        value: o.toJSON(t).uuid
      } : o && o.isColor ? n.uniforms[a] = {
        type: "c",
        value: o.getHex()
      } : o && o.isVector2 ? n.uniforms[a] = {
        type: "v2",
        value: o.toArray()
      } : o && o.isVector3 ? n.uniforms[a] = {
        type: "v3",
        value: o.toArray()
      } : o && o.isVector4 ? n.uniforms[a] = {
        type: "v4",
        value: o.toArray()
      } : o && o.isMatrix3 ? n.uniforms[a] = {
        type: "m3",
        value: o.toArray()
      } : o && o.isMatrix4 ? n.uniforms[a] = {
        type: "m4",
        value: o.toArray()
      } : n.uniforms[a] = {
        value: o
      };
    }
    Object.keys(this.defines).length > 0 && (n.defines = this.defines), n.vertexShader = this.vertexShader, n.fragmentShader = this.fragmentShader, n.lights = this.lights, n.clipping = this.clipping;
    const r = {};
    for (const a in this.extensions) this.extensions[a] === !0 && (r[a] = !0);
    return Object.keys(r).length > 0 && (n.extensions = r), n;
  }
}

class Oxa extends Mx {
  constructor(t) {
    super(t), this.isRawShaderMaterial = !0, this.type = "RawShaderMaterial";
  }
}

class ng extends Bk {
  constructor(t) {
    super(), this.isMeshStandardMaterial = !0, this.type = "MeshStandardMaterial", this.defines = {
      STANDARD: ""
    }, this.color = new so(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new so(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = VYe, this.normalScale = new Qi(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new xp(), this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.defines = {
      STANDARD: ""
    }, this.color.copy(t.color), this.roughness = t.roughness, this.metalness = t.metalness, this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalMapType = t.normalMapType, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.roughnessMap = t.roughnessMap, this.metalnessMap = t.metalnessMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapRotation.copy(t.envMapRotation), this.envMapIntensity = t.envMapIntensity, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.flatShading = t.flatShading, this.fog = t.fog, this;
  }
}

class NT extends ng {
  constructor(t) {
    super(), this.isMeshPhysicalMaterial = !0, this.defines = {
      STANDARD: "",
      PHYSICAL: ""
    }, this.type = "MeshPhysicalMaterial", this.anisotropyRotation = 0, this.anisotropyMap = null, this.clearcoatMap = null, this.clearcoatRoughness = 0, this.clearcoatRoughnessMap = null, this.clearcoatNormalScale = new Qi(1, 1), this.clearcoatNormalMap = null, this.ior = 1.5, Object.defineProperty(this, "reflectivity", {
      get: function () {
        return Dl(2.5 * (this.ior - 1) / (this.ior + 1), 0, 1);
      },
      set: function (n) {
        this.ior = (1 + .4 * n) / (1 - .4 * n);
      }
    }), this.iridescenceMap = null, this.iridescenceIOR = 1.3, this.iridescenceThicknessRange = [100, 400], this.iridescenceThicknessMap = null, this.sheenColor = new so(0), this.sheenColorMap = null, this.sheenRoughness = 1, this.sheenRoughnessMap = null, this.transmissionMap = null, this.thickness = 0, this.thicknessMap = null, this.attenuationDistance = 1 / 0, this.attenuationColor = new so(1, 1, 1), this.specularIntensity = 1, this.specularIntensityMap = null, this.specularColor = new so(1, 1, 1), this.specularColorMap = null, this._anisotropy = 0, this._clearcoat = 0, this._dispersion = 0, this._iridescence = 0, this._sheen = 0, this._transmission = 0, this.setValues(t);
  }
  get anisotropy() {
    return this._anisotropy;
  }
  set anisotropy(t) {
    this._anisotropy > 0 != t > 0 && this.version++, this._anisotropy = t;
  }
  get clearcoat() {
    return this._clearcoat;
  }
  set clearcoat(t) {
    this._clearcoat > 0 != t > 0 && this.version++, this._clearcoat = t;
  }
  get iridescence() {
    return this._iridescence;
  }
  set iridescence(t) {
    this._iridescence > 0 != t > 0 && this.version++, this._iridescence = t;
  }
  get dispersion() {
    return this._dispersion;
  }
  set dispersion(t) {
    this._dispersion > 0 != t > 0 && this.version++, this._dispersion = t;
  }
  get sheen() {
    return this._sheen;
  }
  set sheen(t) {
    this._sheen > 0 != t > 0 && this.version++, this._sheen = t;
  }
  get transmission() {
    return this._transmission;
  }
  set transmission(t) {
    this._transmission > 0 != t > 0 && this.version++, this._transmission = t;
  }
  copy(t) {
    return super.copy(t), this.defines = {
      STANDARD: "",
      PHYSICAL: ""
    }, this.anisotropy = t.anisotropy, this.anisotropyRotation = t.anisotropyRotation, this.anisotropyMap = t.anisotropyMap, this.clearcoat = t.clearcoat, this.clearcoatMap = t.clearcoatMap, this.clearcoatRoughness = t.clearcoatRoughness, this.clearcoatRoughnessMap = t.clearcoatRoughnessMap, this.clearcoatNormalMap = t.clearcoatNormalMap, this.clearcoatNormalScale.copy(t.clearcoatNormalScale), this.dispersion = t.dispersion, this.ior = t.ior, this.iridescence = t.iridescence, this.iridescenceMap = t.iridescenceMap, this.iridescenceIOR = t.iridescenceIOR, this.iridescenceThicknessRange = [...t.iridescenceThicknessRange], this.iridescenceThicknessMap = t.iridescenceThicknessMap, this.sheen = t.sheen, this.sheenColor.copy(t.sheenColor), this.sheenColorMap = t.sheenColorMap, this.sheenRoughness = t.sheenRoughness, this.sheenRoughnessMap = t.sheenRoughnessMap, this.transmission = t.transmission, this.transmissionMap = t.transmissionMap, this.thickness = t.thickness, this.thicknessMap = t.thicknessMap, this.attenuationDistance = t.attenuationDistance, this.attenuationColor.copy(t.attenuationColor), this.specularIntensity = t.specularIntensity, this.specularIntensityMap = t.specularIntensityMap, this.specularColor.copy(t.specularColor), this.specularColorMap = t.specularColorMap, this;
  }
}

class M8e extends Bk {
  constructor(t) {
    super(), this.isMeshPhongMaterial = !0, this.type = "MeshPhongMaterial", this.color = new so(16777215), this.specular = new so(1118481), this.shininess = 30, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new so(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = VYe, this.normalScale = new Qi(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new xp(), this.combine = $Ye, this.reflectivity = 1, this.envMapIntensity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.specular.copy(t.specular), this.shininess = t.shininess, this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalMapType = t.normalMapType, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapRotation.copy(t.envMapRotation), this.combine = t.combine, this.reflectivity = t.reflectivity, this.envMapIntensity = t.envMapIntensity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.flatShading = t.flatShading, this.fog = t.fog, this;
  }
}

class Bxa extends Bk {
  constructor(t) {
    super(), this.isMeshLambertMaterial = !0, this.type = "MeshLambertMaterial", this.color = new so(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new so(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = VYe, this.normalScale = new Qi(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new xp(), this.combine = $Ye, this.reflectivity = 1, this.envMapIntensity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalMapType = t.normalMapType, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapRotation.copy(t.envMapRotation), this.combine = t.combine, this.reflectivity = t.reflectivity, this.envMapIntensity = t.envMapIntensity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.flatShading = t.flatShading, this.fog = t.fog, this;
  }
}

class Fxa extends Bk {
  constructor(t) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = X1a, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.depthPacking = t.depthPacking, this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this;
  }
}

class zxa extends Bk {
  constructor(t) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this;
  }
}

class Uxa extends BD {
  constructor(t) {
    super(), this.isLineDashedMaterial = !0, this.type = "LineDashedMaterial", this.scale = 1, this.dashSize = 3, this.gapSize = 1, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.scale = t.scale, this.dashSize = t.dashSize, this.gapSize = t.gapSize, this;
  }
}

function P8e(e, t) {
  return !e || e.constructor === t ? e : typeof t.BYTES_PER_ELEMENT == "number" ? new t(e) : Array.prototype.slice.call(e);
}

function $xa(e) {
  function t(a, i) {
    return e[a] - e[i];
  }
  const n = e.length,
    r = new Array(n);
  for (let a = 0; a !== n; ++a) r[a] = a;
  return r.sort(t), r;
}

function HZt(e, t, n) {
  const r = e.length,
    a = new e.constructor(r);
  for (let i = 0, o = 0; o !== r; ++i) {
    const s = n[i] * t;
    for (let l = 0; l !== t; ++l) a[o++] = e[s + l];
  }
  return a;
}

function tKn(e, t, n, r) {
  let a = 1,
    i = e[0];
  for (; i !== void 0 && i[r] === void 0;) i = e[a++];
  if (i === void 0) return;
  let o = i[r];
  if (o !== void 0) if (Array.isArray(o)) do o = i[r], o !== void 0 && (t.push(i.time), n.push(...o)), i = e[a++]; while (i !== void 0);else if (o.toArray !== void 0) do o = i[r], o !== void 0 && (t.push(i.time), o.toArray(n, n.length)), i = e[a++]; while (i !== void 0);else do o = i[r], o !== void 0 && (t.push(i.time), n.push(o)), i = e[a++]; while (i !== void 0);
}

class npe {
  constructor(t, n, r, a) {
    this.parameterPositions = t, this._cachedIndex = 0, this.resultBuffer = a !== void 0 ? a : new n.constructor(r), this.sampleValues = n, this.valueSize = r, this.settings = null, this.DefaultSettings_ = {};
  }
  evaluate(t) {
    const n = this.parameterPositions;
    let r = this._cachedIndex,
      a = n[r],
      i = n[r - 1];
    e: {
      t: {
        let o;
        n: {
          r: if (!(t < a)) {
            for (let s = r + 2;;) {
              if (a === void 0) {
                if (t < i) break r;
                return r = n.length, this._cachedIndex = r, this.copySampleValue_(r - 1);
              }
              if (r === s) break;
              if (i = a, a = n[++r], t < a) break t;
            }
            o = n.length;
            break n;
          }
          if (!(t >= i)) {
            const s = n[1];
            t < s && (r = 2, i = s);
            for (let l = r - 2;;) {
              if (i === void 0) return this._cachedIndex = 0, this.copySampleValue_(0);
              if (r === l) break;
              if (a = i, i = n[--r - 1], t >= i) break t;
            }
            o = r, r = 0;
            break n;
          }
          break e;
        }
        for (; r < o;) {
          const s = r + o >>> 1;
          t < n[s] ? o = s : r = s + 1;
        }
        if (a = n[r], i = n[r - 1], i === void 0) return this._cachedIndex = 0, this.copySampleValue_(0);
        if (a === void 0) return r = n.length, this._cachedIndex = r, this.copySampleValue_(r - 1);
      }
      this._cachedIndex = r, this.intervalChanged_(r, i, a);
    }
    return this.interpolate_(r, i, t, a);
  }
  getSettings_() {
    return this.settings || this.DefaultSettings_;
  }
  copySampleValue_(t) {
    const n = this.resultBuffer,
      r = this.sampleValues,
      a = this.valueSize,
      i = t * a;
    for (let o = 0; o !== a; ++o) n[o] = r[i + o];
    return n;
  }
  interpolate_() {
    throw new Error("call to abstract method");
  }
  intervalChanged_() {}
}

class Gxa extends npe {
  constructor(t, n, r, a) {
    super(t, n, r, a), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = {
      endingStart: Sre,
      endingEnd: Sre
    };
  }
  intervalChanged_(t, n, r) {
    const a = this.parameterPositions;
    let i = t - 2,
      o = t + 1,
      s = a[i],
      l = a[o];
    if (s === void 0) switch (this.getSettings_().endingStart) {
      case Ire:
        i = t, s = 2 * n - r;
        break;
      case YFe:
        i = a.length - 2, s = n + a[i] - a[i + 1];
        break;
      default:
        i = t, s = r;
    }
    if (l === void 0) switch (this.getSettings_().endingEnd) {
      case Ire:
        o = t, l = 2 * r - n;
        break;
      case YFe:
        o = 1, l = r + a[1] - a[0];
        break;
      default:
        o = t - 1, l = n;
    }
    const d = (r - n) * .5,
      u = this.valueSize;
    this._weightPrev = d / (n - s), this._weightNext = d / (l - r), this._offsetPrev = i * u, this._offsetNext = o * u;
  }
  interpolate_(t, n, r, a) {
    const i = this.resultBuffer,
      o = this.sampleValues,
      s = this.valueSize,
      l = t * s,
      d = l - s,
      u = this._offsetPrev,
      h = this._offsetNext,
      p = this._weightPrev,
      m = this._weightNext,
      f = (r - n) / (a - n),
      y = f * f,
      b = y * f,
      v = -p * b + 2 * p * y - p * f,
      _ = (1 + p) * b + (-1.5 - 2 * p) * y + (-.5 + p) * f + 1,
      w = (-1 - m) * b + (1.5 + m) * y + .5 * f,
      k = m * b - m * y;
    for (let A = 0; A !== s; ++A) i[A] = v * o[u + A] + _ * o[d + A] + w * o[l + A] + k * o[h + A];
    return i;
  }
}

class nKn extends npe {
  constructor(t, n, r, a) {
    super(t, n, r, a);
  }
  interpolate_(t, n, r, a) {
    const i = this.resultBuffer,
      o = this.sampleValues,
      s = this.valueSize,
      l = t * s,
      d = l - s,
      u = (r - n) / (a - n),
      h = 1 - u;
    for (let p = 0; p !== s; ++p) i[p] = o[d + p] * h + o[l + p] * u;
    return i;
  }
}

class Vxa extends npe {
  constructor(t, n, r, a) {
    super(t, n, r, a);
  }
  interpolate_(t) {
    return this.copySampleValue_(t - 1);
  }
}

class Hxa extends npe {
  interpolate_(t, n, r, a) {
    const i = this.resultBuffer,
      o = this.sampleValues,
      s = this.valueSize,
      l = t * s,
      d = l - s,
      u = this.settings || this.DefaultSettings_,
      h = u.inTangents,
      p = u.outTangents;
    if (!h || !p) {
      const y = (r - n) / (a - n),
        b = 1 - y;
      for (let v = 0; v !== s; ++v) i[v] = o[d + v] * b + o[l + v] * y;
      return i;
    }
    const m = s * 2,
      f = t - 1;
    for (let y = 0; y !== s; ++y) {
      const b = o[d + y],
        v = o[l + y],
        _ = f * m + y * 2,
        w = p[_],
        k = p[_ + 1],
        A = t * m + y * 2,
        S = h[A],
        C = h[A + 1];
      let I = (r - n) / (a - n),
        E,
        M,
        T,
        P,
        R;
      for (let j = 0; j < 8; j++) {
        E = I * I, M = E * I, T = 1 - I, P = T * T, R = P * T;
        const F = R * n + 3 * P * I * w + 3 * T * E * S + M * a - r;
        if (Math.abs(F) < 1e-10) break;
        const N = 3 * P * (w - n) + 6 * T * I * (S - w) + 3 * E * (a - S);
        if (Math.abs(N) < 1e-10) break;
        I = I - F / N, I = Math.max(0, Math.min(1, I));
      }
      i[y] = R * b + 3 * P * I * k + 3 * T * E * C + M * v;
    }
    return i;
  }
}

class jT {
  constructor(t, n, r, a) {
    if (t === void 0) throw new Error("THREE.KeyframeTrack: track name is undefined");
    if (n === void 0 || n.length === 0) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + t);
    this.name = t, this.times = P8e(n, this.TimeBufferType), this.values = P8e(r, this.ValueBufferType), this.setInterpolation(a || this.DefaultInterpolation);
  }
  static toJSON(t) {
    const n = t.constructor;
    let r;
    if (n.toJSON !== this.toJSON) r = n.toJSON(t);else {
      r = {
        name: t.name,
        times: P8e(t.times, Array),
        values: P8e(t.values, Array)
      };
      const a = t.getInterpolation();
      a !== t.DefaultInterpolation && (r.interpolation = a);
    }
    return r.type = t.ValueTypeName, r;
  }
  InterpolantFactoryMethodDiscrete(t) {
    return new Vxa(this.times, this.values, this.getValueSize(), t);
  }
  InterpolantFactoryMethodLinear(t) {
    return new nKn(this.times, this.values, this.getValueSize(), t);
  }
  InterpolantFactoryMethodSmooth(t) {
    return new Gxa(this.times, this.values, this.getValueSize(), t);
  }
  InterpolantFactoryMethodBezier(t) {
    const n = new Hxa(this.times, this.values, this.getValueSize(), t);
    return this.settings && (n.settings = this.settings), n;
  }
  setInterpolation(t) {
    let n;
    switch (t) {
      case E_e:
        n = this.InterpolantFactoryMethodDiscrete;
        break;
      case T_e:
        n = this.InterpolantFactoryMethodLinear;
        break;
      case Ynt:
        n = this.InterpolantFactoryMethodSmooth;
        break;
      case rZt:
        n = this.InterpolantFactoryMethodBezier;
        break;
    }
    if (n === void 0) {
      const r = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
      if (this.createInterpolant === void 0) if (t !== this.DefaultInterpolation) this.setInterpolation(this.DefaultInterpolation);else throw new Error(r);
      return Es("KeyframeTrack:", r), this;
    }
    return this.createInterpolant = n, this;
  }
  getInterpolation() {
    switch (this.createInterpolant) {
      case this.InterpolantFactoryMethodDiscrete:
        return E_e;
      case this.InterpolantFactoryMethodLinear:
        return T_e;
      case this.InterpolantFactoryMethodSmooth:
        return Ynt;
      case this.InterpolantFactoryMethodBezier:
        return rZt;
    }
  }
  getValueSize() {
    return this.values.length / this.times.length;
  }
  shift(t) {
    if (t !== 0) {
      const n = this.times;
      for (let r = 0, a = n.length; r !== a; ++r) n[r] += t;
    }
    return this;
  }
  scale(t) {
    if (t !== 1) {
      const n = this.times;
      for (let r = 0, a = n.length; r !== a; ++r) n[r] *= t;
    }
    return this;
  }
  trim(t, n) {
    const r = this.times,
      a = r.length;
    let i = 0,
      o = a - 1;
    for (; i !== a && r[i] < t;) ++i;
    for (; o !== -1 && r[o] > n;) --o;
    if (++o, i !== 0 || o !== a) {
      i >= o && (o = Math.max(o, 1), i = o - 1);
      const s = this.getValueSize();
      this.times = r.slice(i, o), this.values = this.values.slice(i * s, o * s);
    }
    return this;
  }
  validate() {
    let t = !0;
    const n = this.getValueSize();
    n - Math.floor(n) !== 0 && (vl("KeyframeTrack: Invalid value size in track.", this), t = !1);
    const r = this.times,
      a = this.values,
      i = r.length;
    i === 0 && (vl("KeyframeTrack: Track is empty.", this), t = !1);
    let o = null;
    for (let s = 0; s !== i; s++) {
      const l = r[s];
      if (typeof l == "number" && isNaN(l)) {
        vl("KeyframeTrack: Time is not a valid number.", this, s, l), t = !1;
        break;
      }
      if (o !== null && o > l) {
        vl("KeyframeTrack: Out of order keys.", this, s, l, o), t = !1;
        break;
      }
      o = l;
    }
    if (a !== void 0 && owa(a)) for (let s = 0, l = a.length; s !== l; ++s) {
      const d = a[s];
      if (isNaN(d)) {
        vl("KeyframeTrack: Value is not a valid number.", this, s, d), t = !1;
        break;
      }
    }
    return t;
  }
  optimize() {
    const t = this.times.slice(),
      n = this.values.slice(),
      r = this.getValueSize(),
      a = this.getInterpolation() === Ynt,
      i = t.length - 1;
    let o = 1;
    for (let s = 1; s < i; ++s) {
      let l = !1;
      const d = t[s],
        u = t[s + 1];
      if (d !== u && (s !== 1 || d !== t[0])) if (a) l = !0;else {
        const h = s * r,
          p = h - r,
          m = h + r;
        for (let f = 0; f !== r; ++f) {
          const y = n[h + f];
          if (y !== n[p + f] || y !== n[m + f]) {
            l = !0;
            break;
          }
        }
      }
      if (l) {
        if (s !== o) {
          t[o] = t[s];
          const h = s * r,
            p = o * r;
          for (let m = 0; m !== r; ++m) n[p + m] = n[h + m];
        }
        ++o;
      }
    }
    if (i > 0) {
      t[o] = t[i];
      for (let s = i * r, l = o * r, d = 0; d !== r; ++d) n[l + d] = n[s + d];
      ++o;
    }
    return o !== t.length ? (this.times = t.slice(0, o), this.values = n.slice(0, o * r)) : (this.times = t, this.values = n), this;
  }
  clone() {
    const t = this.times.slice(),
      n = this.values.slice(),
      r = this.constructor,
      a = new r(this.name, t, n);
    return a.createInterpolant = this.createInterpolant, a;
  }
}

jT.prototype.ValueTypeName = "";

jT.prototype.TimeBufferType = Float32Array;

jT.prototype.ValueBufferType = Float32Array;

jT.prototype.DefaultInterpolation = T_e;

class rpe extends jT {
  constructor(t, n, r) {
    super(t, n, r);
  }
}

rpe.prototype.ValueTypeName = "bool";

rpe.prototype.ValueBufferType = Array;

rpe.prototype.DefaultInterpolation = E_e;

rpe.prototype.InterpolantFactoryMethodLinear = void 0;

rpe.prototype.InterpolantFactoryMethodSmooth = void 0;

class rKn extends jT {
  constructor(t, n, r, a) {
    super(t, n, r, a);
  }
}

rKn.prototype.ValueTypeName = "color";

class ZX extends jT {
  constructor(t, n, r, a) {
    super(t, n, r, a);
  }
}

ZX.prototype.ValueTypeName = "number";

class Wxa extends npe {
  constructor(t, n, r, a) {
    super(t, n, r, a);
  }
  interpolate_(t, n, r, a) {
    const i = this.resultBuffer,
      o = this.sampleValues,
      s = this.valueSize,
      l = (r - n) / (a - n);
    let d = t * s;
    for (let u = d + s; d !== u; d += 4) hl.slerpFlat(i, 0, o, d - s, o, d, l);
    return i;
  }
}

class n$ extends jT {
  constructor(t, n, r, a) {
    super(t, n, r, a);
  }
  InterpolantFactoryMethodLinear(t) {
    return new Wxa(this.times, this.values, this.getValueSize(), t);
  }
}

n$.prototype.ValueTypeName = "quaternion";

n$.prototype.InterpolantFactoryMethodSmooth = void 0;

class ape extends jT {
  constructor(t, n, r) {
    super(t, n, r);
  }
}

ape.prototype.ValueTypeName = "string";

ape.prototype.ValueBufferType = Array;

ape.prototype.DefaultInterpolation = E_e;

ape.prototype.InterpolantFactoryMethodLinear = void 0;

ape.prototype.InterpolantFactoryMethodSmooth = void 0;

class eJ extends jT {
  constructor(t, n, r, a) {
    super(t, n, r, a);
  }
}

eJ.prototype.ValueTypeName = "vector";

class aze {
  constructor(t = "", n = -1, r = [], a = Gjt) {
    this.name = t, this.tracks = r, this.duration = n, this.blendMode = a, this.uuid = H5(), this.userData = {}, this.duration < 0 && this.resetDuration();
  }
  static parse(t) {
    const n = [],
      r = t.tracks,
      a = 1 / (t.fps || 1);
    for (let o = 0, s = r.length; o !== s; ++o) n.push(Kxa(r[o]).scale(a));
    const i = new this(t.name, t.duration, n, t.blendMode);
    return i.uuid = t.uuid, i.userData = JSON.parse(t.userData || "{}"), i;
  }
  static toJSON(t) {
    const n = [],
      r = t.tracks,
      a = {
        name: t.name,
        duration: t.duration,
        tracks: n,
        uuid: t.uuid,
        blendMode: t.blendMode,
        userData: JSON.stringify(t.userData)
      };
    for (let i = 0, o = r.length; i !== o; ++i) n.push(jT.toJSON(r[i]));
    return a;
  }
  static CreateFromMorphTargetSequence(t, n, r, a) {
    const i = n.length,
      o = [];
    for (let s = 0; s < i; s++) {
      let l = [],
        d = [];
      l.push((s + i - 1) % i, s, (s + 1) % i), d.push(0, 1, 0);
      const u = $xa(l);
      l = HZt(l, 1, u), d = HZt(d, 1, u), !a && l[0] === 0 && (l.push(i), d.push(d[0])), o.push(new ZX(".morphTargetInfluences[" + n[s].name + "]", l, d).scale(1 / r));
    }
    return new this(t, -1, o);
  }
  static findByName(t, n) {
    let r = t;
    if (!Array.isArray(t)) {
      const a = t;
      r = a.geometry && a.geometry.animations || a.animations;
    }
    for (let a = 0; a < r.length; a++) if (r[a].name === n) return r[a];
    return null;
  }
  static CreateClipsFromMorphTargetSequences(t, n, r) {
    const a = {},
      i = /^([\w-]*?)([\d]+)$/;
    for (let s = 0, l = t.length; s < l; s++) {
      const d = t[s],
        u = d.name.match(i);
      if (u && u.length > 1) {
        const h = u[1];
        let p = a[h];
        p || (a[h] = p = []), p.push(d);
      }
    }
    const o = [];
    for (const s in a) o.push(this.CreateFromMorphTargetSequence(s, a[s], n, r));
    return o;
  }
  static parseAnimation(t, n) {
    if (Es("AnimationClip: parseAnimation() is deprecated and will be removed with r185"), !t) return vl("AnimationClip: No animation in JSONLoader data."), null;
    const r = function (h, p, m, f, y) {
        if (m.length !== 0) {
          const b = [],
            v = [];
          tKn(m, b, v, f), b.length !== 0 && y.push(new h(p, b, v));
        }
      },
      a = [],
      i = t.name || "default",
      o = t.fps || 30,
      s = t.blendMode;
    let l = t.length || -1;
    const d = t.hierarchy || [];
    for (let h = 0; h < d.length; h++) {
      const p = d[h].keys;
      if (!(!p || p.length === 0)) if (p[0].morphTargets) {
        const m = {};
        let f;
        for (f = 0; f < p.length; f++) if (p[f].morphTargets) for (let y = 0; y < p[f].morphTargets.length; y++) m[p[f].morphTargets[y]] = -1;
        for (const y in m) {
          const b = [],
            v = [];
          for (let _ = 0; _ !== p[f].morphTargets.length; ++_) {
            const w = p[f];
            b.push(w.time), v.push(w.morphTarget === y ? 1 : 0);
          }
          a.push(new ZX(".morphTargetInfluence[" + y + "]", b, v));
        }
        l = m.length * o;
      } else {
        const m = ".bones[" + n[h].name + "]";
        r(eJ, m + ".position", p, "pos", a), r(n$, m + ".quaternion", p, "rot", a), r(eJ, m + ".scale", p, "scl", a);
      }
    }
    return a.length === 0 ? null : new this(i, l, a, s);
  }
  resetDuration() {
    const t = this.tracks;
    let n = 0;
    for (let r = 0, a = t.length; r !== a; ++r) {
      const i = this.tracks[r];
      n = Math.max(n, i.times[i.times.length - 1]);
    }
    return this.duration = n, this;
  }
  trim() {
    for (let t = 0; t < this.tracks.length; t++) this.tracks[t].trim(0, this.duration);
    return this;
  }
  validate() {
    let t = !0;
    for (let n = 0; n < this.tracks.length; n++) t = t && this.tracks[n].validate();
    return t;
  }
  optimize() {
    for (let t = 0; t < this.tracks.length; t++) this.tracks[t].optimize();
    return this;
  }
  clone() {
    const t = [];
    for (let r = 0; r < this.tracks.length; r++) t.push(this.tracks[r].clone());
    const n = new this.constructor(this.name, this.duration, t, this.blendMode);
    return n.userData = JSON.parse(JSON.stringify(this.userData)), n;
  }
  toJSON() {
    return this.constructor.toJSON(this);
  }
}

function qxa(e) {
  switch (e.toLowerCase()) {
    case "scalar":
    case "double":
    case "float":
    case "number":
    case "integer":
      return ZX;
    case "vector":
    case "vector2":
    case "vector3":
    case "vector4":
      return eJ;
    case "color":
      return rKn;
    case "quaternion":
      return n$;
    case "bool":
    case "boolean":
      return rpe;
    case "string":
      return ape;
  }
  throw new Error("THREE.KeyframeTrack: Unsupported typeName: " + e);
}

function Kxa(e) {
  if (e.type === void 0) throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");
  const t = qxa(e.type);
  if (e.times === void 0) {
    const n = [],
      r = [];
    tKn(e.keys, n, r, "value"), e.times = n, e.values = r;
  }
  return t.parse !== void 0 ? t.parse(e) : new t(e.name, e.times, e.values, e.interpolation);
}

const S7 = {
  enabled: !1,
  files: {},
  add: function (e, t) {
    this.enabled !== !1 && (WZt(e) || (this.files[e] = t));
  },
  get: function (e) {
    if (this.enabled !== !1 && !WZt(e)) return this.files[e];
  },
  remove: function (e) {
    delete this.files[e];
  },
  clear: function () {
    this.files = {};
  }
};

function WZt(e) {
  try {
    const t = e.slice(e.indexOf(":") + 1);
    return new URL(t).protocol === "blob:";
  } catch {
    return !1;
  }
}

class aKn {
  constructor(t, n, r) {
    const a = this;
    let i = !1,
      o = 0,
      s = 0,
      l;
    const d = [];
    this.onStart = void 0, this.onLoad = t, this.onProgress = n, this.onError = r, this._abortController = null, this.itemStart = function (u) {
      s++, i === !1 && a.onStart !== void 0 && a.onStart(u, o, s), i = !0;
    }, this.itemEnd = function (u) {
      o++, a.onProgress !== void 0 && a.onProgress(u, o, s), o === s && (i = !1, a.onLoad !== void 0 && a.onLoad());
    }, this.itemError = function (u) {
      a.onError !== void 0 && a.onError(u);
    }, this.resolveURL = function (u) {
      return l ? l(u) : u;
    }, this.setURLModifier = function (u) {
      return l = u, this;
    }, this.addHandler = function (u, h) {
      return d.push(u, h), this;
    }, this.removeHandler = function (u) {
      const h = d.indexOf(u);
      return h !== -1 && d.splice(h, 2), this;
    }, this.getHandler = function (u) {
      for (let h = 0, p = d.length; h < p; h += 2) {
        const m = d[h],
          f = d[h + 1];
        if (m.global && (m.lastIndex = 0), m.test(u)) return f;
      }
      return null;
    }, this.abort = function () {
      return this.abortController.abort(), this._abortController = null, this;
    };
  }
  get abortController() {
    return this._abortController || (this._abortController = new AbortController()), this._abortController;
  }
}

const Qxa = new aKn();

class oD {
  constructor(t) {
    this.manager = t !== void 0 ? t : Qxa, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {}, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {
      detail: this
    }));
  }
  load() {}
  loadAsync(t, n) {
    const r = this;
    return new Promise(function (a, i) {
      r.load(t, a, n, i);
    });
  }
  parse() {}
  setCrossOrigin(t) {
    return this.crossOrigin = t, this;
  }
  setWithCredentials(t) {
    return this.withCredentials = t, this;
  }
  setPath(t) {
    return this.path = t, this;
  }
  setResourcePath(t) {
    return this.resourcePath = t, this;
  }
  setRequestHeader(t) {
    return this.requestHeader = t, this;
  }
  abort() {
    return this;
  }
}

oD.DEFAULT_MATERIAL_NAME = "__DEFAULT";

const J9 = {};

class Yxa extends Error {
  constructor(t, n) {
    super(t), this.response = n;
  }
}

class oDt extends oD {
  constructor(t) {
    super(t), this.mimeType = "", this.responseType = "", this._abortController = new AbortController();
  }
  load(t, n, r, a) {
    t === void 0 && (t = ""), this.path !== void 0 && (t = this.path + t), t = this.manager.resolveURL(t);
    const i = S7.get(`file:${t}`);
    if (i !== void 0) return this.manager.itemStart(t), setTimeout(() => {
      n && n(i), this.manager.itemEnd(t);
    }, 0), i;
    if (J9[t] !== void 0) {
      J9[t].push({
        onLoad: n,
        onProgress: r,
        onError: a
      });
      return;
    }
    J9[t] = [], J9[t].push({
      onLoad: n,
      onProgress: r,
      onError: a
    });
    const o = new Request(t, {
        headers: new Headers(this.requestHeader),
        credentials: this.withCredentials ? "include" : "same-origin",
        signal: typeof AbortSignal.any == "function" ? AbortSignal.any([this._abortController.signal, this.manager.abortController.signal]) : this._abortController.signal
      }),
      s = this.mimeType,
      l = this.responseType;
    fetch(o).then(d => {
      if (d.status === 200 || d.status === 0) {
        if (d.status === 0 && Es("FileLoader: HTTP Status 0 received."), typeof ReadableStream > "u" || d.body === void 0 || d.body.getReader === void 0) return d;
        const u = J9[t],
          h = d.body.getReader(),
          p = d.headers.get("X-File-Size") || d.headers.get("Content-Length"),
          m = p ? parseInt(p) : 0,
          f = m !== 0;
        let y = 0;
        const b = new ReadableStream({
          start(v) {
            _();
            function _() {
              h.read().then(({
                done: w,
                value: k
              }) => {
                if (w) v.close();else {
                  y += k.byteLength;
                  const A = new ProgressEvent("progress", {
                    lengthComputable: f,
                    loaded: y,
                    total: m
                  });
                  for (let S = 0, C = u.length; S < C; S++) {
                    const I = u[S];
                    I.onProgress && I.onProgress(A);
                  }
                  v.enqueue(k), _();
                }
              }, w => {
                v.error(w);
              });
            }
          }
        });
        return new Response(b);
      } else throw new Yxa(`fetch for "${d.url}" responded with ${d.status}: ${d.statusText}`, d);
    }).then(d => {
      switch (l) {
        case "arraybuffer":
          return d.arrayBuffer();
        case "blob":
          return d.blob();
        case "document":
          return d.text().then(u => new DOMParser().parseFromString(u, s));
        case "json":
          return d.json();
        default:
          if (s === "") return d.text();
          {
            const h = /charset="?([^;"\s]*)"?/i.exec(s),
              p = h && h[1] ? h[1].toLowerCase() : void 0,
              m = new TextDecoder(p);
            return d.arrayBuffer().then(f => m.decode(f));
          }
      }
    }).then(d => {
      S7.add(`file:${t}`, d);
      const u = J9[t];
      delete J9[t];
      for (let h = 0, p = u.length; h < p; h++) {
        const m = u[h];
        m.onLoad && m.onLoad(d);
      }
    }).catch(d => {
      const u = J9[t];
      if (u === void 0) throw this.manager.itemError(t), d;
      delete J9[t];
      for (let h = 0, p = u.length; h < p; h++) {
        const m = u[h];
        m.onError && m.onError(d);
      }
      this.manager.itemError(t);
    }).finally(() => {
      this.manager.itemEnd(t);
    }), this.manager.itemStart(t);
  }
  setResponseType(t) {
    return this.responseType = t, this;
  }
  setMimeType(t) {
    return this.mimeType = t, this;
  }
  abort() {
    return this._abortController.abort(), this._abortController = new AbortController(), this;
  }
}

const Hee = new WeakMap();

class Xxa extends oD {
  constructor(t) {
    super(t);
  }
  load(t, n, r, a) {
    this.path !== void 0 && (t = this.path + t), t = this.manager.resolveURL(t);
    const i = this,
      o = S7.get(`image:${t}`);
    if (o !== void 0) {
      if (o.complete === !0) i.manager.itemStart(t), setTimeout(function () {
        n && n(o), i.manager.itemEnd(t);
      }, 0);else {
        let h = Hee.get(o);
        h === void 0 && (h = [], Hee.set(o, h)), h.push({
          onLoad: n,
          onError: a
        });
      }
      return o;
    }
    const s = P_e("img");
    function l() {
      u(), n && n(this);
      const h = Hee.get(this) || [];
      for (let p = 0; p < h.length; p++) {
        const m = h[p];
        m.onLoad && m.onLoad(this);
      }
      Hee.delete(this), i.manager.itemEnd(t);
    }
    function d(h) {
      u(), a && a(h), S7.remove(`image:${t}`);
      const p = Hee.get(this) || [];
      for (let m = 0; m < p.length; m++) {
        const f = p[m];
        f.onError && f.onError(h);
      }
      Hee.delete(this), i.manager.itemError(t), i.manager.itemEnd(t);
    }
    function u() {
      s.removeEventListener("load", l, !1), s.removeEventListener("error", d, !1);
    }
    return s.addEventListener("load", l, !1), s.addEventListener("error", d, !1), t.slice(0, 5) !== "data:" && this.crossOrigin !== void 0 && (s.crossOrigin = this.crossOrigin), S7.add(`image:${t}`, s), i.manager.itemStart(t), s.src = t, s;
  }
}

class sD extends oD {
  constructor(t) {
    super(t);
  }
  load(t, n, r, a) {
    const i = new N0(),
      o = new Xxa(this.manager);
    return o.setCrossOrigin(this.crossOrigin), o.setPath(this.path), o.load(t, function (s) {
      i.image = s, i.needsUpdate = !0, n !== void 0 && n(i);
    }, r, a), i;
  }
}

class ipe extends Zc {
  constructor(t, n = 1) {
    super(), this.isLight = !0, this.type = "Light", this.color = new so(t), this.intensity = n;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
  copy(t, n) {
    return super.copy(t, n), this.color.copy(t.color), this.intensity = t.intensity, this;
  }
  toJSON(t) {
    const n = super.toJSON(t);
    return n.object.color = this.color.getHex(), n.object.intensity = this.intensity, n;
  }
}

class iKn extends ipe {
  constructor(t, n, r) {
    super(t, r), this.isHemisphereLight = !0, this.type = "HemisphereLight", this.position.copy(Zc.DEFAULT_UP), this.updateMatrix(), this.groundColor = new so(n);
  }
  copy(t, n) {
    return super.copy(t, n), this.groundColor.copy(t.groundColor), this;
  }
  toJSON(t) {
    const n = super.toJSON(t);
    return n.object.groundColor = this.groundColor.getHex(), n;
  }
}

const Irt = new bo(),
  qZt = new dr(),
  KZt = new dr();

class sDt {
  constructor(t) {
    this.camera = t, this.intensity = 1, this.bias = 0, this.biasNode = null, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new Qi(512, 512), this.mapType = bk, this.map = null, this.mapPass = null, this.matrix = new bo(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new Jjt(), this._frameExtents = new Qi(1, 1), this._viewportCount = 1, this._viewports = [new Vd(0, 0, 1, 1)];
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(t) {
    const n = this.camera,
      r = this.matrix;
    qZt.setFromMatrixPosition(t.matrixWorld), n.position.copy(qZt), KZt.setFromMatrixPosition(t.target.matrixWorld), n.lookAt(KZt), n.updateMatrixWorld(), Irt.multiplyMatrices(n.projectionMatrix, n.matrixWorldInverse), this._frustum.setFromProjectionMatrix(Irt, n.coordinateSystem, n.reversedDepth), n.coordinateSystem === M_e || n.reversedDepth ? r.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, 1, 0, 0, 0, 0, 1) : r.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), r.multiply(Irt);
  }
  getViewport(t) {
    return this._viewports[t];
  }
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
  }
  copy(t) {
    return this.camera = t.camera.clone(), this.intensity = t.intensity, this.bias = t.bias, this.radius = t.radius, this.autoUpdate = t.autoUpdate, this.needsUpdate = t.needsUpdate, this.normalBias = t.normalBias, this.blurSamples = t.blurSamples, this.mapSize.copy(t.mapSize), this.biasNode = t.biasNode, this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    const t = {};
    return this.intensity !== 1 && (t.intensity = this.intensity), this.bias !== 0 && (t.bias = this.bias), this.normalBias !== 0 && (t.normalBias = this.normalBias), this.radius !== 1 && (t.radius = this.radius), (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (t.mapSize = this.mapSize.toArray()), t.camera = this.camera.toJSON(!1).object, delete t.camera.matrix, t;
  }
}

const R8e = new dr(),
  N8e = new hl(),
  c8 = new dr();

class oKn extends Zc {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new bo(), this.projectionMatrix = new bo(), this.projectionMatrixInverse = new bo(), this.coordinateSystem = AM, this._reversedDepth = !1;
  }
  get reversedDepth() {
    return this._reversedDepth;
  }
  copy(t, n) {
    return super.copy(t, n), this.matrixWorldInverse.copy(t.matrixWorldInverse), this.projectionMatrix.copy(t.projectionMatrix), this.projectionMatrixInverse.copy(t.projectionMatrixInverse), this.coordinateSystem = t.coordinateSystem, this;
  }
  getWorldDirection(t) {
    return super.getWorldDirection(t).negate();
  }
  updateMatrixWorld(t) {
    super.updateMatrixWorld(t), this.matrixWorld.decompose(R8e, N8e, c8), c8.x === 1 && c8.y === 1 && c8.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(R8e, N8e, c8.set(1, 1, 1)).invert();
  }
  updateWorldMatrix(t, n) {
    super.updateWorldMatrix(t, n), this.matrixWorld.decompose(R8e, N8e, c8), c8.x === 1 && c8.y === 1 && c8.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(R8e, N8e, c8.set(1, 1, 1)).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}

const yL = new dr(),
  QZt = new Qi(),
  YZt = new Qi();

class lu extends oKn {
  constructor(t = 50, n = 1, r = .1, a = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = t, this.zoom = 1, this.near = r, this.far = a, this.focus = 10, this.aspect = n, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(t, n) {
    return super.copy(t, n), this.fov = t.fov, this.zoom = t.zoom, this.near = t.near, this.far = t.far, this.focus = t.focus, this.aspect = t.aspect, this.view = t.view === null ? null : Object.assign({}, t.view), this.filmGauge = t.filmGauge, this.filmOffset = t.filmOffset, this;
  }
  setFocalLength(t) {
    const n = .5 * this.getFilmHeight() / t;
    this.fov = ade * 2 * Math.atan(n), this.updateProjectionMatrix();
  }
  getFocalLength() {
    const t = Math.tan(Lve * .5 * this.fov);
    return .5 * this.getFilmHeight() / t;
  }
  getEffectiveFOV() {
    return ade * 2 * Math.atan(Math.tan(Lve * .5 * this.fov) / this.zoom);
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  getViewBounds(t, n, r) {
    yL.set(-1, -1, .5).applyMatrix4(this.projectionMatrixInverse), n.set(yL.x, yL.y).multiplyScalar(-t / yL.z), yL.set(1, 1, .5).applyMatrix4(this.projectionMatrixInverse), r.set(yL.x, yL.y).multiplyScalar(-t / yL.z);
  }
  getViewSize(t, n) {
    return this.getViewBounds(t, QZt, YZt), n.subVectors(YZt, QZt);
  }
  setViewOffset(t, n, r, a, i, o) {
    this.aspect = t / n, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = t, this.view.fullHeight = n, this.view.offsetX = r, this.view.offsetY = a, this.view.width = i, this.view.height = o, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const t = this.near;
    let n = t * Math.tan(Lve * .5 * this.fov) / this.zoom,
      r = 2 * n,
      a = this.aspect * r,
      i = -.5 * a;
    const o = this.view;
    if (this.view !== null && this.view.enabled) {
      const l = o.fullWidth,
        d = o.fullHeight;
      i += o.offsetX * a / l, n -= o.offsetY * r / d, a *= o.width / l, r *= o.height / d;
    }
    const s = this.filmOffset;
    s !== 0 && (i += t * s / this.getFilmWidth()), this.projectionMatrix.makePerspective(i, i + a, n, n - r, t, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(t) {
    const n = super.toJSON(t);
    return n.object.fov = this.fov, n.object.zoom = this.zoom, n.object.near = this.near, n.object.far = this.far, n.object.focus = this.focus, n.object.aspect = this.aspect, this.view !== null && (n.object.view = Object.assign({}, this.view)), n.object.filmGauge = this.filmGauge, n.object.filmOffset = this.filmOffset, n;
  }
}

class Jxa extends sDt {
  constructor() {
    super(new lu(50, 1, .5, 500)), this.isSpotLightShadow = !0, this.focus = 1, this.aspect = 1;
  }
  updateMatrices(t) {
    const n = this.camera,
      r = ade * 2 * t.angle * this.focus,
      a = this.mapSize.width / this.mapSize.height * this.aspect,
      i = t.distance || n.far;
    (r !== n.fov || a !== n.aspect || i !== n.far) && (n.fov = r, n.aspect = a, n.far = i, n.updateProjectionMatrix()), super.updateMatrices(t);
  }
  copy(t) {
    return super.copy(t), this.focus = t.focus, this;
  }
}

class lDt extends ipe {
  constructor(t, n, r = 0, a = Math.PI / 3, i = 0, o = 2) {
    super(t, n), this.isSpotLight = !0, this.type = "SpotLight", this.position.copy(Zc.DEFAULT_UP), this.updateMatrix(), this.target = new Zc(), this.distance = r, this.angle = a, this.penumbra = i, this.decay = o, this.map = null, this.shadow = new Jxa();
  }
  get power() {
    return this.intensity * Math.PI;
  }
  set power(t) {
    this.intensity = t / Math.PI;
  }
  dispose() {
    super.dispose(), this.shadow.dispose();
  }
  copy(t, n) {
    return super.copy(t, n), this.distance = t.distance, this.angle = t.angle, this.penumbra = t.penumbra, this.decay = t.decay, this.target = t.target.clone(), this.map = t.map, this.shadow = t.shadow.clone(), this;
  }
  toJSON(t) {
    const n = super.toJSON(t);
    return n.object.distance = this.distance, n.object.angle = this.angle, n.object.decay = this.decay, n.object.penumbra = this.penumbra, n.object.target = this.target.uuid, this.map && this.map.isTexture && (n.object.map = this.map.toJSON(t).uuid), n.object.shadow = this.shadow.toJSON(), n;
  }
}

class Zxa extends sDt {
  constructor() {
    super(new lu(90, 1, .5, 500)), this.isPointLightShadow = !0;
  }
}

class sde extends ipe {
  constructor(t, n, r = 0, a = 2) {
    super(t, n), this.isPointLight = !0, this.type = "PointLight", this.distance = r, this.decay = a, this.shadow = new Zxa();
  }
  get power() {
    return this.intensity * 4 * Math.PI;
  }
  set power(t) {
    this.intensity = t / (4 * Math.PI);
  }
  dispose() {
    super.dispose(), this.shadow.dispose();
  }
  copy(t, n) {
    return super.copy(t, n), this.distance = t.distance, this.decay = t.decay, this.shadow = t.shadow.clone(), this;
  }
  toJSON(t) {
    const n = super.toJSON(t);
    return n.object.distance = this.distance, n.object.decay = this.decay, n.object.shadow = this.shadow.toJSON(), n;
  }
}

class uG extends oKn {
  constructor(t = -1, n = 1, r = 1, a = -1, i = .1, o = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = t, this.right = n, this.top = r, this.bottom = a, this.near = i, this.far = o, this.updateProjectionMatrix();
  }
  copy(t, n) {
    return super.copy(t, n), this.left = t.left, this.right = t.right, this.top = t.top, this.bottom = t.bottom, this.near = t.near, this.far = t.far, this.zoom = t.zoom, this.view = t.view === null ? null : Object.assign({}, t.view), this;
  }
  setViewOffset(t, n, r, a, i, o) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = t, this.view.fullHeight = n, this.view.offsetX = r, this.view.offsetY = a, this.view.width = i, this.view.height = o, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const t = (this.right - this.left) / (2 * this.zoom),
      n = (this.top - this.bottom) / (2 * this.zoom),
      r = (this.right + this.left) / 2,
      a = (this.top + this.bottom) / 2;
    let i = r - t,
      o = r + t,
      s = a + n,
      l = a - n;
    if (this.view !== null && this.view.enabled) {
      const d = (this.right - this.left) / this.view.fullWidth / this.zoom,
        u = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      i += d * this.view.offsetX, o = i + d * this.view.width, s -= u * this.view.offsetY, l = s - u * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(i, o, s, l, this.near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(t) {
    const n = super.toJSON(t);
    return n.object.zoom = this.zoom, n.object.left = this.left, n.object.right = this.right, n.object.top = this.top, n.object.bottom = this.bottom, n.object.near = this.near, n.object.far = this.far, this.view !== null && (n.object.view = Object.assign({}, this.view)), n;
  }
}

class e2a extends sDt {
  constructor() {
    super(new uG(-5, 5, 5, -5, .5, 500)), this.isDirectionalLightShadow = !0;
  }
}

class pT extends ipe {
  constructor(t, n) {
    super(t, n), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(Zc.DEFAULT_UP), this.updateMatrix(), this.target = new Zc(), this.shadow = new e2a();
  }
  dispose() {
    super.dispose(), this.shadow.dispose();
  }
  copy(t) {
    return super.copy(t), this.target = t.target.clone(), this.shadow = t.shadow.clone(), this;
  }
  toJSON(t) {
    const n = super.toJSON(t);
    return n.object.shadow = this.shadow.toJSON(), n.object.target = this.target.uuid, n;
  }
}

class ope extends ipe {
  constructor(t, n) {
    super(t, n), this.isAmbientLight = !0, this.type = "AmbientLight";
  }
}

class t2a extends ipe {
  constructor(t, n, r = 10, a = 10) {
    super(t, n), this.isRectAreaLight = !0, this.type = "RectAreaLight", this.width = r, this.height = a;
  }
  get power() {
    return this.intensity * this.width * this.height * Math.PI;
  }
  set power(t) {
    this.intensity = t / (this.width * this.height * Math.PI);
  }
  copy(t) {
    return super.copy(t), this.width = t.width, this.height = t.height, this;
  }
  toJSON(t) {
    const n = super.toJSON(t);
    return n.object.width = this.width, n.object.height = this.height, n;
  }
}

class Tie {
  static extractUrlBase(t) {
    const n = t.lastIndexOf("/");
    return n === -1 ? "./" : t.slice(0, n + 1);
  }
  static resolveURL(t, n) {
    return typeof t != "string" || t === "" ? "" : (/^https?:\/\//i.test(n) && /^\//.test(t) && (n = n.replace(/(^https?:\/\/[^\/]+).*/i, "$1")), /^(https?:)?\/\//i.test(t) || /^data:.*,.*$/i.test(t) || /^blob:.*$/i.test(t) ? t : n + t);
  }
}

class n2a extends Fd {
  constructor() {
    super(), this.isInstancedBufferGeometry = !0, this.type = "InstancedBufferGeometry", this.instanceCount = 1 / 0;
  }
  copy(t) {
    return super.copy(t), this.instanceCount = t.instanceCount, this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.instanceCount = this.instanceCount, t.isInstancedBufferGeometry = !0, t;
  }
}

const Crt = new WeakMap();

class r2a extends oD {
  constructor(t) {
    super(t), this.isImageBitmapLoader = !0, typeof createImageBitmap > "u" && Es("ImageBitmapLoader: createImageBitmap() not supported."), typeof fetch > "u" && Es("ImageBitmapLoader: fetch() not supported."), this.options = {
      premultiplyAlpha: "none"
    }, this._abortController = new AbortController();
  }
  setOptions(t) {
    return this.options = t, this;
  }
  load(t, n, r, a) {
    t === void 0 && (t = ""), this.path !== void 0 && (t = this.path + t), t = this.manager.resolveURL(t);
    const i = this,
      o = S7.get(`image-bitmap:${t}`);
    if (o !== void 0) {
      if (i.manager.itemStart(t), o.then) {
        o.then(d => {
          if (Crt.has(o) === !0) a && a(Crt.get(o)), i.manager.itemError(t), i.manager.itemEnd(t);else return n && n(d), i.manager.itemEnd(t), d;
        });
        return;
      }
      return setTimeout(function () {
        n && n(o), i.manager.itemEnd(t);
      }, 0), o;
    }
    const s = {};
    s.credentials = this.crossOrigin === "anonymous" ? "same-origin" : "include", s.headers = this.requestHeader, s.signal = typeof AbortSignal.any == "function" ? AbortSignal.any([this._abortController.signal, this.manager.abortController.signal]) : this._abortController.signal;
    const l = fetch(t, s).then(function (d) {
      return d.blob();
    }).then(function (d) {
      return createImageBitmap(d, Object.assign(i.options, {
        colorSpaceConversion: "none"
      }));
    }).then(function (d) {
      return S7.add(`image-bitmap:${t}`, d), n && n(d), i.manager.itemEnd(t), d;
    }).catch(function (d) {
      a && a(d), Crt.set(l, d), S7.remove(`image-bitmap:${t}`), i.manager.itemError(t), i.manager.itemEnd(t);
    });
    S7.add(`image-bitmap:${t}`, l), i.manager.itemStart(t);
  }
  abort() {
    return this._abortController.abort(), this._abortController = new AbortController(), this;
  }
}

const Wee = -90,
  qee = 1;

class a2a extends Zc {
  constructor(t, n, r) {
    super(), this.type = "CubeCamera", this.renderTarget = r, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const a = new lu(Wee, qee, t, n);
    a.layers = this.layers, this.add(a);
    const i = new lu(Wee, qee, t, n);
    i.layers = this.layers, this.add(i);
    const o = new lu(Wee, qee, t, n);
    o.layers = this.layers, this.add(o);
    const s = new lu(Wee, qee, t, n);
    s.layers = this.layers, this.add(s);
    const l = new lu(Wee, qee, t, n);
    l.layers = this.layers, this.add(l);
    const d = new lu(Wee, qee, t, n);
    d.layers = this.layers, this.add(d);
  }
  updateCoordinateSystem() {
    const t = this.coordinateSystem,
      n = this.children.concat(),
      [r, a, i, o, s, l] = n;
    for (const d of n) this.remove(d);
    if (t === AM) r.up.set(0, 1, 0), r.lookAt(1, 0, 0), a.up.set(0, 1, 0), a.lookAt(-1, 0, 0), i.up.set(0, 0, -1), i.lookAt(0, 1, 0), o.up.set(0, 0, 1), o.lookAt(0, -1, 0), s.up.set(0, 1, 0), s.lookAt(0, 0, 1), l.up.set(0, 1, 0), l.lookAt(0, 0, -1);else if (t === M_e) r.up.set(0, -1, 0), r.lookAt(-1, 0, 0), a.up.set(0, -1, 0), a.lookAt(1, 0, 0), i.up.set(0, 0, 1), i.lookAt(0, 1, 0), o.up.set(0, 0, -1), o.lookAt(0, -1, 0), s.up.set(0, -1, 0), s.lookAt(0, 0, 1), l.up.set(0, -1, 0), l.lookAt(0, 0, -1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + t);
    for (const d of n) this.add(d), d.updateMatrixWorld();
  }
  update(t, n) {
    this.parent === null && this.updateMatrixWorld();
    const {
      renderTarget: r,
      activeMipmapLevel: a
    } = this;
    this.coordinateSystem !== t.coordinateSystem && (this.coordinateSystem = t.coordinateSystem, this.updateCoordinateSystem());
    const [i, o, s, l, d, u] = this.children,
      h = t.getRenderTarget(),
      p = t.getActiveCubeFace(),
      m = t.getActiveMipmapLevel(),
      f = t.xr.enabled;
    t.xr.enabled = !1;
    const y = r.texture.generateMipmaps;
    r.texture.generateMipmaps = !1;
    let b = !1;
    t.isWebGLRenderer === !0 ? b = t.state.buffers.depth.getReversed() : b = t.reversedDepthBuffer, t.setRenderTarget(r, 0, a), b && t.autoClear === !1 && t.clearDepth(), t.render(n, i), t.setRenderTarget(r, 1, a), b && t.autoClear === !1 && t.clearDepth(), t.render(n, o), t.setRenderTarget(r, 2, a), b && t.autoClear === !1 && t.clearDepth(), t.render(n, s), t.setRenderTarget(r, 3, a), b && t.autoClear === !1 && t.clearDepth(), t.render(n, l), t.setRenderTarget(r, 4, a), b && t.autoClear === !1 && t.clearDepth(), t.render(n, d), r.texture.generateMipmaps = y, t.setRenderTarget(r, 5, a), b && t.autoClear === !1 && t.clearDepth(), t.render(n, u), t.setRenderTarget(h, p, m), t.xr.enabled = f, r.texture.needsPMREMUpdate = !0;
  }
}

class i2a extends lu {
  constructor(t = []) {
    super(), this.isArrayCamera = !0, this.isMultiViewCamera = !1, this.cameras = t;
  }
}

class o2a {
  constructor(t, n, r) {
    this.binding = t, this.valueSize = r;
    let a, i, o;
    switch (n) {
      case "quaternion":
        a = this._slerp, i = this._slerpAdditive, o = this._setAdditiveIdentityQuaternion, this.buffer = new Float64Array(r * 6), this._workIndex = 5;
        break;
      case "string":
      case "bool":
        a = this._select, i = this._select, o = this._setAdditiveIdentityOther, this.buffer = new Array(r * 5);
        break;
      default:
        a = this._lerp, i = this._lerpAdditive, o = this._setAdditiveIdentityNumeric, this.buffer = new Float64Array(r * 5);
    }
    this._mixBufferRegion = a, this._mixBufferRegionAdditive = i, this._setIdentity = o, this._origIndex = 3, this._addIndex = 4, this.cumulativeWeight = 0, this.cumulativeWeightAdditive = 0, this.useCount = 0, this.referenceCount = 0;
  }
  accumulate(t, n) {
    const r = this.buffer,
      a = this.valueSize,
      i = t * a + a;
    let o = this.cumulativeWeight;
    if (o === 0) {
      for (let s = 0; s !== a; ++s) r[i + s] = r[s];
      o = n;
    } else {
      o += n;
      const s = n / o;
      this._mixBufferRegion(r, i, 0, s, a);
    }
    this.cumulativeWeight = o;
  }
  accumulateAdditive(t) {
    const n = this.buffer,
      r = this.valueSize,
      a = r * this._addIndex;
    this.cumulativeWeightAdditive === 0 && this._setIdentity(), this._mixBufferRegionAdditive(n, a, 0, t, r), this.cumulativeWeightAdditive += t;
  }
  apply(t) {
    const n = this.valueSize,
      r = this.buffer,
      a = t * n + n,
      i = this.cumulativeWeight,
      o = this.cumulativeWeightAdditive,
      s = this.binding;
    if (this.cumulativeWeight = 0, this.cumulativeWeightAdditive = 0, i < 1) {
      const l = n * this._origIndex;
      this._mixBufferRegion(r, a, l, 1 - i, n);
    }
    o > 0 && this._mixBufferRegionAdditive(r, a, this._addIndex * n, 1, n);
    for (let l = n, d = n + n; l !== d; ++l) if (r[l] !== r[l + n]) {
      s.setValue(r, a);
      break;
    }
  }
  saveOriginalState() {
    const t = this.binding,
      n = this.buffer,
      r = this.valueSize,
      a = r * this._origIndex;
    t.getValue(n, a);
    for (let i = r, o = a; i !== o; ++i) n[i] = n[a + i % r];
    this._setIdentity(), this.cumulativeWeight = 0, this.cumulativeWeightAdditive = 0;
  }
  restoreOriginalState() {
    const t = this.valueSize * 3;
    this.binding.setValue(this.buffer, t);
  }
  _setAdditiveIdentityNumeric() {
    const t = this._addIndex * this.valueSize,
      n = t + this.valueSize;
    for (let r = t; r < n; r++) this.buffer[r] = 0;
  }
  _setAdditiveIdentityQuaternion() {
    this._setAdditiveIdentityNumeric(), this.buffer[this._addIndex * this.valueSize + 3] = 1;
  }
  _setAdditiveIdentityOther() {
    const t = this._origIndex * this.valueSize,
      n = this._addIndex * this.valueSize;
    for (let r = 0; r < this.valueSize; r++) this.buffer[n + r] = this.buffer[t + r];
  }
  _select(t, n, r, a, i) {
    if (a >= .5) for (let o = 0; o !== i; ++o) t[n + o] = t[r + o];
  }
  _slerp(t, n, r, a) {
    hl.slerpFlat(t, n, t, n, t, r, a);
  }
  _slerpAdditive(t, n, r, a, i) {
    const o = this._workIndex * i;
    hl.multiplyQuaternionsFlat(t, o, t, n, t, r), hl.slerpFlat(t, n, t, n, t, o, a);
  }
  _lerp(t, n, r, a, i) {
    const o = 1 - a;
    for (let s = 0; s !== i; ++s) {
      const l = n + s;
      t[l] = t[l] * o + t[r + s] * a;
    }
  }
  _lerpAdditive(t, n, r, a, i) {
    for (let o = 0; o !== i; ++o) {
      const s = n + o;
      t[s] = t[s] + t[r + o] * a;
    }
  }
}

const cDt = "\\[\\]\\.:\\/",
  s2a = new RegExp("[" + cDt + "]", "g"),
  dDt = "[^" + cDt + "]",
  l2a = "[^" + cDt.replace("\\.", "") + "]",
  c2a = /((?:WC+[\/:])*)/.source.replace("WC", dDt),
  d2a = /(WCOD+)?/.source.replace("WCOD", l2a),
  u2a = /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", dDt),
  h2a = /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", dDt),
  p2a = new RegExp("^" + c2a + d2a + u2a + h2a + "$"),
  m2a = ["material", "materials", "bones", "map"];

class f2a {
  constructor(t, n, r) {
    const a = r || au.parseTrackName(n);
    this._targetGroup = t, this._bindings = t.subscribe_(n, a);
  }
  getValue(t, n) {
    this.bind();
    const r = this._targetGroup.nCachedObjects_,
      a = this._bindings[r];
    a !== void 0 && a.getValue(t, n);
  }
  setValue(t, n) {
    const r = this._bindings;
    for (let a = this._targetGroup.nCachedObjects_, i = r.length; a !== i; ++a) r[a].setValue(t, n);
  }
  bind() {
    const t = this._bindings;
    for (let n = this._targetGroup.nCachedObjects_, r = t.length; n !== r; ++n) t[n].bind();
  }
  unbind() {
    const t = this._bindings;
    for (let n = this._targetGroup.nCachedObjects_, r = t.length; n !== r; ++n) t[n].unbind();
  }
}

class au {
  constructor(t, n, r) {
    this.path = n, this.parsedPath = r || au.parseTrackName(n), this.node = au.findNode(t, this.parsedPath.nodeName), this.rootNode = t, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
  static create(t, n, r) {
    return t && t.isAnimationObjectGroup ? new au.Composite(t, n, r) : new au(t, n, r);
  }
  static sanitizeNodeName(t) {
    return t.replace(/\s/g, "_").replace(s2a, "");
  }
  static parseTrackName(t) {
    const n = p2a.exec(t);
    if (n === null) throw new Error("PropertyBinding: Cannot parse trackName: " + t);
    const r = {
        nodeName: n[2],
        objectName: n[3],
        objectIndex: n[4],
        propertyName: n[5],
        propertyIndex: n[6]
      },
      a = r.nodeName && r.nodeName.lastIndexOf(".");
    if (a !== void 0 && a !== -1) {
      const i = r.nodeName.substring(a + 1);
      m2a.indexOf(i) !== -1 && (r.nodeName = r.nodeName.substring(0, a), r.objectName = i);
    }
    if (r.propertyName === null || r.propertyName.length === 0) throw new Error("PropertyBinding: can not parse propertyName from trackName: " + t);
    return r;
  }
  static findNode(t, n) {
    if (n === void 0 || n === "" || n === "." || n === -1 || n === t.name || n === t.uuid) return t;
    if (t.skeleton) {
      const r = t.skeleton.getBoneByName(n);
      if (r !== void 0) return r;
    }
    if (t.children) {
      const r = function (i) {
          for (let o = 0; o < i.length; o++) {
            const s = i[o];
            if (s.name === n || s.uuid === n) return s;
            const l = r(s.children);
            if (l) return l;
          }
          return null;
        },
        a = r(t.children);
      if (a) return a;
    }
    return null;
  }
  _getValue_unavailable() {}
  _setValue_unavailable() {}
  _getValue_direct(t, n) {
    t[n] = this.targetObject[this.propertyName];
  }
  _getValue_array(t, n) {
    const r = this.resolvedProperty;
    for (let a = 0, i = r.length; a !== i; ++a) t[n++] = r[a];
  }
  _getValue_arrayElement(t, n) {
    t[n] = this.resolvedProperty[this.propertyIndex];
  }
  _getValue_toArray(t, n) {
    this.resolvedProperty.toArray(t, n);
  }
  _setValue_direct(t, n) {
    this.targetObject[this.propertyName] = t[n];
  }
  _setValue_direct_setNeedsUpdate(t, n) {
    this.targetObject[this.propertyName] = t[n], this.targetObject.needsUpdate = !0;
  }
  _setValue_direct_setMatrixWorldNeedsUpdate(t, n) {
    this.targetObject[this.propertyName] = t[n], this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_array(t, n) {
    const r = this.resolvedProperty;
    for (let a = 0, i = r.length; a !== i; ++a) r[a] = t[n++];
  }
  _setValue_array_setNeedsUpdate(t, n) {
    const r = this.resolvedProperty;
    for (let a = 0, i = r.length; a !== i; ++a) r[a] = t[n++];
    this.targetObject.needsUpdate = !0;
  }
  _setValue_array_setMatrixWorldNeedsUpdate(t, n) {
    const r = this.resolvedProperty;
    for (let a = 0, i = r.length; a !== i; ++a) r[a] = t[n++];
    this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_arrayElement(t, n) {
    this.resolvedProperty[this.propertyIndex] = t[n];
  }
  _setValue_arrayElement_setNeedsUpdate(t, n) {
    this.resolvedProperty[this.propertyIndex] = t[n], this.targetObject.needsUpdate = !0;
  }
  _setValue_arrayElement_setMatrixWorldNeedsUpdate(t, n) {
    this.resolvedProperty[this.propertyIndex] = t[n], this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_fromArray(t, n) {
    this.resolvedProperty.fromArray(t, n);
  }
  _setValue_fromArray_setNeedsUpdate(t, n) {
    this.resolvedProperty.fromArray(t, n), this.targetObject.needsUpdate = !0;
  }
  _setValue_fromArray_setMatrixWorldNeedsUpdate(t, n) {
    this.resolvedProperty.fromArray(t, n), this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _getValue_unbound(t, n) {
    this.bind(), this.getValue(t, n);
  }
  _setValue_unbound(t, n) {
    this.bind(), this.setValue(t, n);
  }
  bind() {
    let t = this.node;
    const n = this.parsedPath,
      r = n.objectName,
      a = n.propertyName;
    let i = n.propertyIndex;
    if (t || (t = au.findNode(this.rootNode, n.nodeName), this.node = t), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !t) {
      Es("PropertyBinding: No target node found for track: " + this.path + ".");
      return;
    }
    if (r) {
      let d = n.objectIndex;
      switch (r) {
        case "materials":
          if (!t.material) {
            vl("PropertyBinding: Can not bind to material as node does not have a material.", this);
            return;
          }
          if (!t.material.materials) {
            vl("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
            return;
          }
          t = t.material.materials;
          break;
        case "bones":
          if (!t.skeleton) {
            vl("PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
            return;
          }
          t = t.skeleton.bones;
          for (let u = 0; u < t.length; u++) if (t[u].name === d) {
            d = u;
            break;
          }
          break;
        case "map":
          if ("map" in t) {
            t = t.map;
            break;
          }
          if (!t.material) {
            vl("PropertyBinding: Can not bind to material as node does not have a material.", this);
            return;
          }
          if (!t.material.map) {
            vl("PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
            return;
          }
          t = t.material.map;
          break;
        default:
          if (t[r] === void 0) {
            vl("PropertyBinding: Can not bind to objectName of node undefined.", this);
            return;
          }
          t = t[r];
      }
      if (d !== void 0) {
        if (t[d] === void 0) {
          vl("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, t);
          return;
        }
        t = t[d];
      }
    }
    const o = t[a];
    if (o === void 0) {
      const d = n.nodeName;
      vl("PropertyBinding: Trying to update property for track: " + d + "." + a + " but it wasn't found.", t);
      return;
    }
    let s = this.Versioning.None;
    this.targetObject = t, t.isMaterial === !0 ? s = this.Versioning.NeedsUpdate : t.isObject3D === !0 && (s = this.Versioning.MatrixWorldNeedsUpdate);
    let l = this.BindingType.Direct;
    if (i !== void 0) {
      if (a === "morphTargetInfluences") {
        if (!t.geometry) {
          vl("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
          return;
        }
        if (!t.geometry.morphAttributes) {
          vl("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
          return;
        }
        t.morphTargetDictionary[i] !== void 0 && (i = t.morphTargetDictionary[i]);
      }
      l = this.BindingType.ArrayElement, this.resolvedProperty = o, this.propertyIndex = i;
    } else o.fromArray !== void 0 && o.toArray !== void 0 ? (l = this.BindingType.HasFromToArray, this.resolvedProperty = o) : Array.isArray(o) ? (l = this.BindingType.EntireArray, this.resolvedProperty = o) : this.propertyName = a;
    this.getValue = this.GetterByBindingType[l], this.setValue = this.SetterByBindingTypeAndVersioning[l][s];
  }
  unbind() {
    this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
}

au.Composite = f2a;

au.prototype.BindingType = {
  Direct: 0,
  EntireArray: 1,
  ArrayElement: 2,
  HasFromToArray: 3
};

au.prototype.Versioning = {
  None: 0,
  NeedsUpdate: 1,
  MatrixWorldNeedsUpdate: 2
};

au.prototype.GetterByBindingType = [au.prototype._getValue_direct, au.prototype._getValue_array, au.prototype._getValue_arrayElement, au.prototype._getValue_toArray];

au.prototype.SetterByBindingTypeAndVersioning = [[au.prototype._setValue_direct, au.prototype._setValue_direct_setNeedsUpdate, au.prototype._setValue_direct_setMatrixWorldNeedsUpdate], [au.prototype._setValue_array, au.prototype._setValue_array_setNeedsUpdate, au.prototype._setValue_array_setMatrixWorldNeedsUpdate], [au.prototype._setValue_arrayElement, au.prototype._setValue_arrayElement_setNeedsUpdate, au.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate], [au.prototype._setValue_fromArray, au.prototype._setValue_fromArray_setNeedsUpdate, au.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];

class g2a {
  constructor(t, n, r = null, a = n.blendMode) {
    this._mixer = t, this._clip = n, this._localRoot = r, this.blendMode = a;
    const i = n.tracks,
      o = i.length,
      s = new Array(o),
      l = {
        endingStart: Sre,
        endingEnd: Sre
      };
    for (let d = 0; d !== o; ++d) {
      const u = i[d].createInterpolant(null);
      s[d] = u, u.settings = l;
    }
    this._interpolantSettings = l, this._interpolants = s, this._propertyBindings = new Array(o), this._cacheIndex = null, this._byClipCacheIndex = null, this._timeScaleInterpolant = null, this._weightInterpolant = null, this.loop = Iie, this._loopCount = -1, this._startTime = null, this.time = 0, this.timeScale = 1, this._effectiveTimeScale = 1, this.weight = 1, this._effectiveWeight = 1, this.repetitions = 1 / 0, this.paused = !1, this.enabled = !0, this.clampWhenFinished = !1, this.zeroSlopeAtStart = !0, this.zeroSlopeAtEnd = !0;
  }
  play() {
    return this._mixer._activateAction(this), this;
  }
  stop() {
    return this._mixer._deactivateAction(this), this.reset();
  }
  reset() {
    return this.paused = !1, this.enabled = !0, this.time = 0, this._loopCount = -1, this._startTime = null, this.stopFading().stopWarping();
  }
  isRunning() {
    return this.enabled && !this.paused && this.timeScale !== 0 && this._startTime === null && this._mixer._isActiveAction(this);
  }
  isScheduled() {
    return this._mixer._isActiveAction(this);
  }
  startAt(t) {
    return this._startTime = t, this;
  }
  setLoop(t, n) {
    return this.loop = t, this.repetitions = n, this;
  }
  setEffectiveWeight(t) {
    return this.weight = t, this._effectiveWeight = this.enabled ? t : 0, this.stopFading();
  }
  getEffectiveWeight() {
    return this._effectiveWeight;
  }
  fadeIn(t) {
    return this._scheduleFading(t, 0, 1);
  }
  fadeOut(t) {
    return this._scheduleFading(t, 1, 0);
  }
  crossFadeFrom(t, n, r = !1) {
    if (t.fadeOut(n), this.fadeIn(n), r === !0) {
      const a = this._clip.duration,
        i = t._clip.duration,
        o = i / a,
        s = a / i;
      t.warp(1, o, n), this.warp(s, 1, n);
    }
    return this;
  }
  crossFadeTo(t, n, r = !1) {
    return t.crossFadeFrom(this, n, r);
  }
  stopFading() {
    const t = this._weightInterpolant;
    return t !== null && (this._weightInterpolant = null, this._mixer._takeBackControlInterpolant(t)), this;
  }
  setEffectiveTimeScale(t) {
    return this.timeScale = t, this._effectiveTimeScale = this.paused ? 0 : t, this.stopWarping();
  }
  getEffectiveTimeScale() {
    return this._effectiveTimeScale;
  }
  setDuration(t) {
    return this.timeScale = this._clip.duration / t, this.stopWarping();
  }
  syncWith(t) {
    return this.time = t.time, this.timeScale = t.timeScale, this.stopWarping();
  }
  halt(t) {
    return this.warp(this._effectiveTimeScale, 0, t);
  }
  warp(t, n, r) {
    const a = this._mixer,
      i = a.time,
      o = this.timeScale;
    let s = this._timeScaleInterpolant;
    s === null && (s = a._lendControlInterpolant(), this._timeScaleInterpolant = s);
    const l = s.parameterPositions,
      d = s.sampleValues;
    return l[0] = i, l[1] = i + r, d[0] = t / o, d[1] = n / o, this;
  }
  stopWarping() {
    const t = this._timeScaleInterpolant;
    return t !== null && (this._timeScaleInterpolant = null, this._mixer._takeBackControlInterpolant(t)), this;
  }
  getMixer() {
    return this._mixer;
  }
  getClip() {
    return this._clip;
  }
  getRoot() {
    return this._localRoot || this._mixer._root;
  }
  _update(t, n, r, a) {
    if (!this.enabled) {
      this._updateWeight(t);
      return;
    }
    const i = this._startTime;
    if (i !== null) {
      const l = (t - i) * r;
      l < 0 || r === 0 ? n = 0 : (this._startTime = null, n = r * l);
    }
    n *= this._updateTimeScale(t);
    const o = this._updateTime(n),
      s = this._updateWeight(t);
    if (s > 0) {
      const l = this._interpolants,
        d = this._propertyBindings;
      switch (this.blendMode) {
        case Q1a:
          for (let u = 0, h = l.length; u !== h; ++u) l[u].evaluate(o), d[u].accumulateAdditive(s);
          break;
        case Gjt:
        default:
          for (let u = 0, h = l.length; u !== h; ++u) l[u].evaluate(o), d[u].accumulate(a, s);
      }
    }
  }
  _updateWeight(t) {
    let n = 0;
    if (this.enabled) {
      n = this.weight;
      const r = this._weightInterpolant;
      if (r !== null) {
        const a = r.evaluate(t)[0];
        n *= a, t > r.parameterPositions[1] && (this.stopFading(), a === 0 && (this.enabled = !1));
      }
    }
    return this._effectiveWeight = n, n;
  }
  _updateTimeScale(t) {
    let n = 0;
    if (!this.paused) {
      n = this.timeScale;
      const r = this._timeScaleInterpolant;
      if (r !== null) {
        const a = r.evaluate(t)[0];
        n *= a, t > r.parameterPositions[1] && (this.stopWarping(), n === 0 ? this.paused = !0 : this.timeScale = n);
      }
    }
    return this._effectiveTimeScale = n, n;
  }
  _updateTime(t) {
    const n = this._clip.duration,
      r = this.loop;
    let a = this.time + t,
      i = this._loopCount;
    const o = r === K1a;
    if (t === 0) return i === -1 ? a : o && (i & 1) === 1 ? n - a : a;
    if (r === $jt) {
      i === -1 && (this._loopCount = 0, this._setEndings(!0, !0, !1));
      e: {
        if (a >= n) a = n;else if (a < 0) a = 0;else {
          this.time = a;
          break e;
        }
        this.clampWhenFinished ? this.paused = !0 : this.enabled = !1, this.time = a, this._mixer.dispatchEvent({
          type: "finished",
          action: this,
          direction: t < 0 ? -1 : 1
        });
      }
    } else {
      if (i === -1 && (t >= 0 ? (i = 0, this._setEndings(!0, this.repetitions === 0, o)) : this._setEndings(this.repetitions === 0, !0, o)), a >= n || a < 0) {
        const s = Math.floor(a / n);
        a -= n * s, i += Math.abs(s);
        const l = this.repetitions - i;
        if (l <= 0) this.clampWhenFinished ? this.paused = !0 : this.enabled = !1, a = t > 0 ? n : 0, this.time = a, this._mixer.dispatchEvent({
          type: "finished",
          action: this,
          direction: t > 0 ? 1 : -1
        });else {
          if (l === 1) {
            const d = t < 0;
            this._setEndings(d, !d, o);
          } else this._setEndings(!1, !1, o);
          this._loopCount = i, this.time = a, this._mixer.dispatchEvent({
            type: "loop",
            action: this,
            loopDelta: s
          });
        }
      } else this.time = a;
      if (o && (i & 1) === 1) return n - a;
    }
    return a;
  }
  _setEndings(t, n, r) {
    const a = this._interpolantSettings;
    r ? (a.endingStart = Ire, a.endingEnd = Ire) : (t ? a.endingStart = this.zeroSlopeAtStart ? Ire : Sre : a.endingStart = YFe, n ? a.endingEnd = this.zeroSlopeAtEnd ? Ire : Sre : a.endingEnd = YFe);
  }
  _scheduleFading(t, n, r) {
    const a = this._mixer,
      i = a.time;
    let o = this._weightInterpolant;
    o === null && (o = a._lendControlInterpolant(), this._weightInterpolant = o);
    const s = o.parameterPositions,
      l = o.sampleValues;
    return s[0] = i, l[0] = n, s[1] = i + t, l[1] = r, this;
  }
}

const y2a = new Float32Array(1);

class uDt extends dG {
  constructor(t) {
    super(), this._root = t, this._initMemoryManager(), this._accuIndex = 0, this.time = 0, this.timeScale = 1, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {
      detail: this
    }));
  }
  _bindAction(t, n) {
    const r = t._localRoot || this._root,
      a = t._clip.tracks,
      i = a.length,
      o = t._propertyBindings,
      s = t._interpolants,
      l = r.uuid,
      d = this._bindingsByRootAndName;
    let u = d[l];
    u === void 0 && (u = {}, d[l] = u);
    for (let h = 0; h !== i; ++h) {
      const p = a[h],
        m = p.name;
      let f = u[m];
      if (f !== void 0) ++f.referenceCount, o[h] = f;else {
        if (f = o[h], f !== void 0) {
          f._cacheIndex === null && (++f.referenceCount, this._addInactiveBinding(f, l, m));
          continue;
        }
        const y = n && n._propertyBindings[h].binding.parsedPath;
        f = new o2a(au.create(r, m, y), p.ValueTypeName, p.getValueSize()), ++f.referenceCount, this._addInactiveBinding(f, l, m), o[h] = f;
      }
      s[h].resultBuffer = f.buffer;
    }
  }
  _activateAction(t) {
    if (!this._isActiveAction(t)) {
      if (t._cacheIndex === null) {
        const r = (t._localRoot || this._root).uuid,
          a = t._clip.uuid,
          i = this._actionsByClip[a];
        this._bindAction(t, i && i.knownActions[0]), this._addInactiveAction(t, a, r);
      }
      const n = t._propertyBindings;
      for (let r = 0, a = n.length; r !== a; ++r) {
        const i = n[r];
        i.useCount++ === 0 && (this._lendBinding(i), i.saveOriginalState());
      }
      this._lendAction(t);
    }
  }
  _deactivateAction(t) {
    if (this._isActiveAction(t)) {
      const n = t._propertyBindings;
      for (let r = 0, a = n.length; r !== a; ++r) {
        const i = n[r];
        --i.useCount === 0 && (i.restoreOriginalState(), this._takeBackBinding(i));
      }
      this._takeBackAction(t);
    }
  }
  _initMemoryManager() {
    this._actions = [], this._nActiveActions = 0, this._actionsByClip = {}, this._bindings = [], this._nActiveBindings = 0, this._bindingsByRootAndName = {}, this._controlInterpolants = [], this._nActiveControlInterpolants = 0;
    const t = this;
    this.stats = {
      actions: {
        get total() {
          return t._actions.length;
        },
        get inUse() {
          return t._nActiveActions;
        }
      },
      bindings: {
        get total() {
          return t._bindings.length;
        },
        get inUse() {
          return t._nActiveBindings;
        }
      },
      controlInterpolants: {
        get total() {
          return t._controlInterpolants.length;
        },
        get inUse() {
          return t._nActiveControlInterpolants;
        }
      }
    };
  }
  _isActiveAction(t) {
    const n = t._cacheIndex;
    return n !== null && n < this._nActiveActions;
  }
  _addInactiveAction(t, n, r) {
    const a = this._actions,
      i = this._actionsByClip;
    let o = i[n];
    if (o === void 0) o = {
      knownActions: [t],
      actionByRoot: {}
    }, t._byClipCacheIndex = 0, i[n] = o;else {
      const s = o.knownActions;
      t._byClipCacheIndex = s.length, s.push(t);
    }
    t._cacheIndex = a.length, a.push(t), o.actionByRoot[r] = t;
  }
  _removeInactiveAction(t) {
    const n = this._actions,
      r = n[n.length - 1],
      a = t._cacheIndex;
    r._cacheIndex = a, n[a] = r, n.pop(), t._cacheIndex = null;
    const i = t._clip.uuid,
      o = this._actionsByClip,
      s = o[i],
      l = s.knownActions,
      d = l[l.length - 1],
      u = t._byClipCacheIndex;
    d._byClipCacheIndex = u, l[u] = d, l.pop(), t._byClipCacheIndex = null;
    const h = s.actionByRoot,
      p = (t._localRoot || this._root).uuid;
    delete h[p], l.length === 0 && delete o[i], this._removeInactiveBindingsForAction(t);
  }
  _removeInactiveBindingsForAction(t) {
    const n = t._propertyBindings;
    for (let r = 0, a = n.length; r !== a; ++r) {
      const i = n[r];
      --i.referenceCount === 0 && this._removeInactiveBinding(i);
    }
  }
  _lendAction(t) {
    const n = this._actions,
      r = t._cacheIndex,
      a = this._nActiveActions++,
      i = n[a];
    t._cacheIndex = a, n[a] = t, i._cacheIndex = r, n[r] = i;
  }
  _takeBackAction(t) {
    const n = this._actions,
      r = t._cacheIndex,
      a = --this._nActiveActions,
      i = n[a];
    t._cacheIndex = a, n[a] = t, i._cacheIndex = r, n[r] = i;
  }
  _addInactiveBinding(t, n, r) {
    const a = this._bindingsByRootAndName,
      i = this._bindings;
    let o = a[n];
    o === void 0 && (o = {}, a[n] = o), o[r] = t, t._cacheIndex = i.length, i.push(t);
  }
  _removeInactiveBinding(t) {
    const n = this._bindings,
      r = t.binding,
      a = r.rootNode.uuid,
      i = r.path,
      o = this._bindingsByRootAndName,
      s = o[a],
      l = n[n.length - 1],
      d = t._cacheIndex;
    l._cacheIndex = d, n[d] = l, n.pop(), delete s[i], Object.keys(s).length === 0 && delete o[a];
  }
  _lendBinding(t) {
    const n = this._bindings,
      r = t._cacheIndex,
      a = this._nActiveBindings++,
      i = n[a];
    t._cacheIndex = a, n[a] = t, i._cacheIndex = r, n[r] = i;
  }
  _takeBackBinding(t) {
    const n = this._bindings,
      r = t._cacheIndex,
      a = --this._nActiveBindings,
      i = n[a];
    t._cacheIndex = a, n[a] = t, i._cacheIndex = r, n[r] = i;
  }
  _lendControlInterpolant() {
    const t = this._controlInterpolants,
      n = this._nActiveControlInterpolants++;
    let r = t[n];
    return r === void 0 && (r = new nKn(new Float32Array(2), new Float32Array(2), 1, y2a), r.__cacheIndex = n, t[n] = r), r;
  }
  _takeBackControlInterpolant(t) {
    const n = this._controlInterpolants,
      r = t.__cacheIndex,
      a = --this._nActiveControlInterpolants,
      i = n[a];
    t.__cacheIndex = a, n[a] = t, i.__cacheIndex = r, n[r] = i;
  }
  clipAction(t, n, r) {
    const a = n || this._root,
      i = a.uuid;
    let o = typeof t == "string" ? aze.findByName(a, t) : t;
    const s = o !== null ? o.uuid : t,
      l = this._actionsByClip[s];
    let d = null;
    if (r === void 0 && (o !== null ? r = o.blendMode : r = Gjt), l !== void 0) {
      const h = l.actionByRoot[i];
      if (h !== void 0 && h.blendMode === r) return h;
      d = l.knownActions[0], o === null && (o = d._clip);
    }
    if (o === null) return null;
    const u = new g2a(this, o, n, r);
    return this._bindAction(u, d), this._addInactiveAction(u, s, i), u;
  }
  existingAction(t, n) {
    const r = n || this._root,
      a = r.uuid,
      i = typeof t == "string" ? aze.findByName(r, t) : t,
      o = i ? i.uuid : t,
      s = this._actionsByClip[o];
    return s !== void 0 && s.actionByRoot[a] || null;
  }
  stopAllAction() {
    const t = this._actions,
      n = this._nActiveActions;
    for (let r = n - 1; r >= 0; --r) t[r].stop();
    return this;
  }
  update(t) {
    t *= this.timeScale;
    const n = this._actions,
      r = this._nActiveActions,
      a = this.time += t,
      i = Math.sign(t),
      o = this._accuIndex ^= 1;
    for (let d = 0; d !== r; ++d) n[d]._update(a, t, i, o);
    const s = this._bindings,
      l = this._nActiveBindings;
    for (let d = 0; d !== l; ++d) s[d].apply(o);
    return this;
  }
  setTime(t) {
    this.time = 0;
    for (let n = 0; n < this._actions.length; n++) this._actions[n].time = 0;
    return this.update(t);
  }
  getRoot() {
    return this._root;
  }
  uncacheClip(t) {
    const n = this._actions,
      r = t.uuid,
      a = this._actionsByClip,
      i = a[r];
    if (i !== void 0) {
      const o = i.knownActions;
      for (let s = 0, l = o.length; s !== l; ++s) {
        const d = o[s];
        this._deactivateAction(d);
        const u = d._cacheIndex,
          h = n[n.length - 1];
        d._cacheIndex = null, d._byClipCacheIndex = null, h._cacheIndex = u, n[u] = h, n.pop(), this._removeInactiveBindingsForAction(d);
      }
      delete a[r];
    }
  }
  uncacheRoot(t) {
    const n = t.uuid,
      r = this._actionsByClip;
    for (const o in r) {
      const s = r[o].actionByRoot,
        l = s[n];
      l !== void 0 && (this._deactivateAction(l), this._removeInactiveAction(l));
    }
    const a = this._bindingsByRootAndName,
      i = a[n];
    if (i !== void 0) for (const o in i) {
      const s = i[o];
      s.restoreOriginalState(), this._removeInactiveBinding(s);
    }
  }
  uncacheAction(t, n) {
    const r = this.existingAction(t, n);
    r !== null && (this._deactivateAction(r), this._removeInactiveAction(r));
  }
}

class Avt extends Yjt {
  constructor(t, n, r = 1) {
    super(t, n), this.isInstancedInterleavedBuffer = !0, this.meshPerAttribute = r;
  }
  copy(t) {
    return super.copy(t), this.meshPerAttribute = t.meshPerAttribute, this;
  }
  clone(t) {
    const n = super.clone(t);
    return n.meshPerAttribute = this.meshPerAttribute, n;
  }
  toJSON(t) {
    const n = super.toJSON(t);
    return n.isInstancedInterleavedBuffer = !0, n.meshPerAttribute = this.meshPerAttribute, n;
  }
}

const XZt = new bo();

class tJ {
  constructor(t, n, r = 0, a = 1 / 0) {
    this.ray = new tpe(t, n), this.near = r, this.far = a, this.camera = null, this.layers = new Kjt(), this.params = {
      Mesh: {},
      Line: {
        threshold: 1
      },
      LOD: {},
      Points: {
        threshold: 1
      },
      Sprite: {}
    };
  }
  set(t, n) {
    this.ray.set(t, n);
  }
  setFromCamera(t, n) {
    n.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(n.matrixWorld), this.ray.direction.set(t.x, t.y, .5).unproject(n).sub(this.ray.origin).normalize(), this.camera = n) : n.isOrthographicCamera ? (this.ray.origin.set(t.x, t.y, (n.near + n.far) / (n.near - n.far)).unproject(n), this.ray.direction.set(0, 0, -1).transformDirection(n.matrixWorld), this.camera = n) : vl("Raycaster: Unsupported camera type: " + n.type);
  }
  setFromXRController(t) {
    return XZt.identity().extractRotation(t.matrixWorld), this.ray.origin.setFromMatrixPosition(t.matrixWorld), this.ray.direction.set(0, 0, -1).applyMatrix4(XZt), this;
  }
  intersectObject(t, n = !0, r = []) {
    return Svt(t, this, r, n), r.sort(JZt), r;
  }
  intersectObjects(t, n = !0, r = []) {
    for (let a = 0, i = t.length; a < i; a++) Svt(t[a], this, r, n);
    return r.sort(JZt), r;
  }
}

function JZt(e, t) {
  return e.distance - t.distance;
}

function Svt(e, t, n, r) {
  let a = !0;
  if (e.layers.test(t.layers) && e.raycast(t, n) === !1 && (a = !1), a === !0 && r === !0) {
    const i = e.children;
    for (let o = 0, s = i.length; o < s; o++) Svt(i[o], t, n, !0);
  }
}

class ZZt {
  constructor(t = 1, n = 0, r = 0) {
    this.radius = t, this.phi = n, this.theta = r;
  }
  set(t, n, r) {
    return this.radius = t, this.phi = n, this.theta = r, this;
  }
  copy(t) {
    return this.radius = t.radius, this.phi = t.phi, this.theta = t.theta, this;
  }
  makeSafe() {
    return this.phi = Dl(this.phi, 1e-6, Math.PI - 1e-6), this;
  }
  setFromVector3(t) {
    return this.setFromCartesianCoords(t.x, t.y, t.z);
  }
  setFromCartesianCoords(t, n, r) {
    return this.radius = Math.sqrt(t * t + n * n + r * r), this.radius === 0 ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(t, r), this.phi = Math.acos(Dl(n / this.radius, -1, 1))), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}

const een = new dr(),
  j8e = new dr(),
  Kee = new dr(),
  Qee = new dr(),
  Ert = new dr(),
  b2a = new dr(),
  v2a = new dr();

class w2a {
  constructor(t = new dr(), n = new dr()) {
    this.start = t, this.end = n;
  }
  set(t, n) {
    return this.start.copy(t), this.end.copy(n), this;
  }
  copy(t) {
    return this.start.copy(t.start), this.end.copy(t.end), this;
  }
  getCenter(t) {
    return t.addVectors(this.start, this.end).multiplyScalar(.5);
  }
  delta(t) {
    return t.subVectors(this.end, this.start);
  }
  distanceSq() {
    return this.start.distanceToSquared(this.end);
  }
  distance() {
    return this.start.distanceTo(this.end);
  }
  at(t, n) {
    return this.delta(n).multiplyScalar(t).add(this.start);
  }
  closestPointToPointParameter(t, n) {
    een.subVectors(t, this.start), j8e.subVectors(this.end, this.start);
    const r = j8e.dot(j8e);
    let i = j8e.dot(een) / r;
    return n && (i = Dl(i, 0, 1)), i;
  }
  closestPointToPoint(t, n, r) {
    const a = this.closestPointToPointParameter(t, n);
    return this.delta(r).multiplyScalar(a).add(this.start);
  }
  distanceSqToLine3(t, n = b2a, r = v2a) {
    const a = 10000000000000001e-32;
    let i, o;
    const s = this.start,
      l = t.start,
      d = this.end,
      u = t.end;
    Kee.subVectors(d, s), Qee.subVectors(u, l), Ert.subVectors(s, l);
    const h = Kee.dot(Kee),
      p = Qee.dot(Qee),
      m = Qee.dot(Ert);
    if (h <= a && p <= a) return n.copy(s), r.copy(l), n.sub(r), n.dot(n);
    if (h <= a) i = 0, o = m / p, o = Dl(o, 0, 1);else {
      const f = Kee.dot(Ert);
      if (p <= a) o = 0, i = Dl(-f / h, 0, 1);else {
        const y = Kee.dot(Qee),
          b = h * p - y * y;
        b !== 0 ? i = Dl((y * m - f * p) / b, 0, 1) : i = 0, o = (y * i + m) / p, o < 0 ? (o = 0, i = Dl(-f / h, 0, 1)) : o > 1 && (o = 1, i = Dl((y - f) / h, 0, 1));
      }
    }
    return n.copy(s).addScaledVector(Kee, i), r.copy(l).addScaledVector(Qee, o), n.distanceToSquared(r);
  }
  applyMatrix4(t) {
    return this.start.applyMatrix4(t), this.end.applyMatrix4(t), this;
  }
  equals(t) {
    return t.start.equals(this.start) && t.end.equals(this.end);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}

class sKn extends Zjt {
  constructor(t = 10, n = 10, r = 4473924, a = 8947848) {
    r = new so(r), a = new so(a);
    const i = n / 2,
      o = t / n,
      s = t / 2,
      l = [],
      d = [];
    for (let p = 0, m = 0, f = -s; p <= n; p++, f += o) {
      l.push(-s, 0, f, s, 0, f), l.push(f, 0, -s, f, 0, s);
      const y = p === i ? r : a;
      y.toArray(d, m), m += 3, y.toArray(d, m), m += 3, y.toArray(d, m), m += 3, y.toArray(d, m), m += 3;
    }
    const u = new Fd();
    u.setAttribute("position", new Al(l, 3)), u.setAttribute("color", new Al(d, 3));
    const h = new BD({
      vertexColors: !0,
      toneMapped: !1
    });
    super(u, h), this.type = "GridHelper";
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}

class lKn extends dG {
  constructor(t, n = null) {
    super(), this.object = t, this.domElement = n, this.enabled = !0, this.state = -1, this.keys = {}, this.mouseButtons = {
      LEFT: null,
      MIDDLE: null,
      RIGHT: null
    }, this.touches = {
      ONE: null,
      TWO: null
    };
  }
  connect(t) {
    if (t === void 0) {
      Es("Controls: connect() now requires an element.");
      return;
    }
    this.domElement !== null && this.disconnect(), this.domElement = t;
  }
  disconnect() {}
  dispose() {}
  update() {}
}

function ten(e, t, n, r) {
  const a = x2a(r);
  switch (n) {
    case Pqn:
      return e * t;
    case Bjt:
      return e * t / a.components * a.byteLength;
    case Fjt:
      return e * t / a.components * a.byteLength;
    case rde:
      return e * t * 2 / a.components * a.byteLength;
    case zjt:
      return e * t * 2 / a.components * a.byteLength;
    case Rqn:
      return e * t * 3 / a.components * a.byteLength;
    case W1:
      return e * t * 4 / a.components * a.byteLength;
    case Ujt:
      return e * t * 4 / a.components * a.byteLength;
    case ENe:
    case TNe:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case MNe:
    case PNe:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case zbt:
    case $bt:
      return Math.max(e, 16) * Math.max(t, 8) / 4;
    case Fbt:
    case Ubt:
      return Math.max(e, 8) * Math.max(t, 8) / 2;
    case Gbt:
    case Vbt:
    case Wbt:
    case qbt:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case Hbt:
    case Kbt:
    case Qbt:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case Ybt:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case Xbt:
      return Math.floor((e + 4) / 5) * Math.floor((t + 3) / 4) * 16;
    case Jbt:
      return Math.floor((e + 4) / 5) * Math.floor((t + 4) / 5) * 16;
    case Zbt:
      return Math.floor((e + 5) / 6) * Math.floor((t + 4) / 5) * 16;
    case evt:
      return Math.floor((e + 5) / 6) * Math.floor((t + 5) / 6) * 16;
    case tvt:
      return Math.floor((e + 7) / 8) * Math.floor((t + 4) / 5) * 16;
    case nvt:
      return Math.floor((e + 7) / 8) * Math.floor((t + 5) / 6) * 16;
    case rvt:
      return Math.floor((e + 7) / 8) * Math.floor((t + 7) / 8) * 16;
    case avt:
      return Math.floor((e + 9) / 10) * Math.floor((t + 4) / 5) * 16;
    case ivt:
      return Math.floor((e + 9) / 10) * Math.floor((t + 5) / 6) * 16;
    case ovt:
      return Math.floor((e + 9) / 10) * Math.floor((t + 7) / 8) * 16;
    case svt:
      return Math.floor((e + 9) / 10) * Math.floor((t + 9) / 10) * 16;
    case lvt:
      return Math.floor((e + 11) / 12) * Math.floor((t + 9) / 10) * 16;
    case cvt:
      return Math.floor((e + 11) / 12) * Math.floor((t + 11) / 12) * 16;
    case dvt:
    case uvt:
    case hvt:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
    case pvt:
    case mvt:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 8;
    case fvt:
    case gvt:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
  }
  throw new Error(`Unable to determine texture byte length for ${n} format.`);
}

function x2a(e) {
  switch (e) {
    case bk:
    case Cqn:
      return {
        byteLength: 1,
        components: 1
      };
    case I_e:
    case Eqn:
    case hT:
      return {
        byteLength: 2,
        components: 1
      };
    case Ljt:
    case Ojt:
      return {
        byteLength: 2,
        components: 4
      };
    case BP:
    case Djt:
    case Ck:
      return {
        byteLength: 4,
        components: 1
      };
    case Tqn:
    case Mqn:
      return {
        byteLength: 4,
        components: 3
      };
  }
  throw new Error(`Unknown texture type ${e}.`);
}

typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", {
  detail: {
    revision: jjt
  }
}));

typeof window < "u" && (window.__THREE__ ? Es("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = jjt);

/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function cKn() {
  let e = null,
    t = !1,
    n = null,
    r = null;
  function a(i, o) {
    n(i, o), r = e.requestAnimationFrame(a);
  }
  return {
    start: function () {
      t !== !0 && n !== null && (r = e.requestAnimationFrame(a), t = !0);
    },
    stop: function () {
      e.cancelAnimationFrame(r), t = !1;
    },
    setAnimationLoop: function (i) {
      n = i;
    },
    setContext: function (i) {
      e = i;
    }
  };
}

function _2a(e) {
  const t = new WeakMap();
  function n(s, l) {
    const d = s.array,
      u = s.usage,
      h = d.byteLength,
      p = e.createBuffer();
    e.bindBuffer(l, p), e.bufferData(l, d, u), s.onUploadCallback();
    let m;
    if (d instanceof Float32Array) m = e.FLOAT;else if (typeof Float16Array < "u" && d instanceof Float16Array) m = e.HALF_FLOAT;else if (d instanceof Uint16Array) s.isFloat16BufferAttribute ? m = e.HALF_FLOAT : m = e.UNSIGNED_SHORT;else if (d instanceof Int16Array) m = e.SHORT;else if (d instanceof Uint32Array) m = e.UNSIGNED_INT;else if (d instanceof Int32Array) m = e.INT;else if (d instanceof Int8Array) m = e.BYTE;else if (d instanceof Uint8Array) m = e.UNSIGNED_BYTE;else if (d instanceof Uint8ClampedArray) m = e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + d);
    return {
      buffer: p,
      type: m,
      bytesPerElement: d.BYTES_PER_ELEMENT,
      version: s.version,
      size: h
    };
  }
  function r(s, l, d) {
    const u = l.array,
      h = l.updateRanges;
    if (e.bindBuffer(d, s), h.length === 0) e.bufferSubData(d, 0, u);else {
      h.sort((m, f) => m.start - f.start);
      let p = 0;
      for (let m = 1; m < h.length; m++) {
        const f = h[p],
          y = h[m];
        y.start <= f.start + f.count + 1 ? f.count = Math.max(f.count, y.start + y.count - f.start) : (++p, h[p] = y);
      }
      h.length = p + 1;
      for (let m = 0, f = h.length; m < f; m++) {
        const y = h[m];
        e.bufferSubData(d, y.start * u.BYTES_PER_ELEMENT, u, y.start, y.count);
      }
      l.clearUpdateRanges();
    }
    l.onUploadCallback();
  }
  function a(s) {
    return s.isInterleavedBufferAttribute && (s = s.data), t.get(s);
  }
  function i(s) {
    s.isInterleavedBufferAttribute && (s = s.data);
    const l = t.get(s);
    l && (e.deleteBuffer(l.buffer), t.delete(s));
  }
  function o(s, l) {
    if (s.isInterleavedBufferAttribute && (s = s.data), s.isGLBufferAttribute) {
      const u = t.get(s);
      (!u || u.version < s.version) && t.set(s, {
        buffer: s.buffer,
        type: s.type,
        bytesPerElement: s.elementSize,
        version: s.version
      });
      return;
    }
    const d = t.get(s);
    if (d === void 0) t.set(s, n(s, l));else if (d.version < s.version) {
      if (d.size !== s.array.byteLength) throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
      r(d.buffer, s, l), d.version = s.version;
    }
  }
  return {
    get: a,
    remove: i,
    update: o
  };
}

var k2a = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,
  A2a = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,
  S2a = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,
  I2a = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
  C2a = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,
  E2a = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,
  T2a = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,
  M2a = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,
  P2a = `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,
  R2a = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,
  N2a = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,
  j2a = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,
  D2a = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,
  L2a = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,
  O2a = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,
  B2a = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,
  F2a = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,
  z2a = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,
  U2a = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,
  $2a = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,
  G2a = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,
  V2a = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,
  H2a = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,
  W2a = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,
  q2a = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,
  K2a = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,
  Q2a = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,
  Y2a = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,
  X2a = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,
  J2a = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,
  Z2a = "gl_FragColor = linearToOutputTexel( gl_FragColor );",
  e_a = `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,
  t_a = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,
  n_a = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,
  r_a = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,
  a_a = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,
  i_a = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,
  o_a = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,
  s_a = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`,
  l_a = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,
  c_a = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,
  d_a = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,
  u_a = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,
  h_a = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,
  p_a = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,
  m_a = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,
  f_a = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,
  g_a = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,
  y_a = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,
  b_a = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,
  v_a = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,
  w_a = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,
  x_a = `uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,
  __a = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,
  k_a = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,
  A_a = `#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,
  S_a = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,
  I_a = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,
  C_a = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,
  E_a = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,
  T_a = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,
  M_a = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`,
  P_a = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,
  R_a = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
  N_a = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,
  j_a = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,
  D_a = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,
  L_a = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,
  O_a = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,
  B_a = `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,
  F_a = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,
  z_a = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,
  U_a = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,
  $_a = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
  G_a = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
  V_a = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,
  H_a = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,
  W_a = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,
  q_a = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,
  K_a = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,
  Q_a = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,
  Y_a = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,
  X_a = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,
  J_a = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,
  Z_a = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,
  eka = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,
  tka = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,
  nka = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,
  rka = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,
  aka = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,
  ika = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,
  oka = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,
  ska = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,
  lka = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,
  cka = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,
  dka = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,
  uka = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,
  hka = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,
  pka = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,
  mka = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,
  fka = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,
  gka = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,
  yka = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,
  bka = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,
  vka = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,
  wka = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,
  xka = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;

const _ka = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,
  kka = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  Aka = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,
  Ska = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  Ika = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,
  Cka = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  Eka = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,
  Tka = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,
  Mka = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,
  Pka = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,
  Rka = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,
  Nka = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  jka = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
  Dka = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
  Lka = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,
  Oka = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  Bka = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  Fka = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  zka = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,
  Uka = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  $ka = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,
  Gka = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,
  Vka = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  Hka = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  Wka = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,
  qka = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  Kka = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  Qka = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  Yka = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,
  Xka = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
  Jka = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  Zka = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
  eAa = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
  tAa = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,
  Wc = {
    alphahash_fragment: k2a,
    alphahash_pars_fragment: A2a,
    alphamap_fragment: S2a,
    alphamap_pars_fragment: I2a,
    alphatest_fragment: C2a,
    alphatest_pars_fragment: E2a,
    aomap_fragment: T2a,
    aomap_pars_fragment: M2a,
    batching_pars_vertex: P2a,
    batching_vertex: R2a,
    begin_vertex: N2a,
    beginnormal_vertex: j2a,
    bsdfs: D2a,
    iridescence_fragment: L2a,
    bumpmap_pars_fragment: O2a,
    clipping_planes_fragment: B2a,
    clipping_planes_pars_fragment: F2a,
    clipping_planes_pars_vertex: z2a,
    clipping_planes_vertex: U2a,
    color_fragment: $2a,
    color_pars_fragment: G2a,
    color_pars_vertex: V2a,
    color_vertex: H2a,
    common: W2a,
    cube_uv_reflection_fragment: q2a,
    defaultnormal_vertex: K2a,
    displacementmap_pars_vertex: Q2a,
    displacementmap_vertex: Y2a,
    emissivemap_fragment: X2a,
    emissivemap_pars_fragment: J2a,
    colorspace_fragment: Z2a,
    colorspace_pars_fragment: e_a,
    envmap_fragment: t_a,
    envmap_common_pars_fragment: n_a,
    envmap_pars_fragment: r_a,
    envmap_pars_vertex: a_a,
    envmap_physical_pars_fragment: f_a,
    envmap_vertex: i_a,
    fog_vertex: o_a,
    fog_pars_vertex: s_a,
    fog_fragment: l_a,
    fog_pars_fragment: c_a,
    gradientmap_pars_fragment: d_a,
    lightmap_pars_fragment: u_a,
    lights_lambert_fragment: h_a,
    lights_lambert_pars_fragment: p_a,
    lights_pars_begin: m_a,
    lights_toon_fragment: g_a,
    lights_toon_pars_fragment: y_a,
    lights_phong_fragment: b_a,
    lights_phong_pars_fragment: v_a,
    lights_physical_fragment: w_a,
    lights_physical_pars_fragment: x_a,
    lights_fragment_begin: __a,
    lights_fragment_maps: k_a,
    lights_fragment_end: A_a,
    logdepthbuf_fragment: S_a,
    logdepthbuf_pars_fragment: I_a,
    logdepthbuf_pars_vertex: C_a,
    logdepthbuf_vertex: E_a,
    map_fragment: T_a,
    map_pars_fragment: M_a,
    map_particle_fragment: P_a,
    map_particle_pars_fragment: R_a,
    metalnessmap_fragment: N_a,
    metalnessmap_pars_fragment: j_a,
    morphinstance_vertex: D_a,
    morphcolor_vertex: L_a,
    morphnormal_vertex: O_a,
    morphtarget_pars_vertex: B_a,
    morphtarget_vertex: F_a,
    normal_fragment_begin: z_a,
    normal_fragment_maps: U_a,
    normal_pars_fragment: $_a,
    normal_pars_vertex: G_a,
    normal_vertex: V_a,
    normalmap_pars_fragment: H_a,
    clearcoat_normal_fragment_begin: W_a,
    clearcoat_normal_fragment_maps: q_a,
    clearcoat_pars_fragment: K_a,
    iridescence_pars_fragment: Q_a,
    opaque_fragment: Y_a,
    packing: X_a,
    premultiplied_alpha_fragment: J_a,
    project_vertex: Z_a,
    dithering_fragment: eka,
    dithering_pars_fragment: tka,
    roughnessmap_fragment: nka,
    roughnessmap_pars_fragment: rka,
    shadowmap_pars_fragment: aka,
    shadowmap_pars_vertex: ika,
    shadowmap_vertex: oka,
    shadowmask_pars_fragment: ska,
    skinbase_vertex: lka,
    skinning_pars_vertex: cka,
    skinning_vertex: dka,
    skinnormal_vertex: uka,
    specularmap_fragment: hka,
    specularmap_pars_fragment: pka,
    tonemapping_fragment: mka,
    tonemapping_pars_fragment: fka,
    transmission_fragment: gka,
    transmission_pars_fragment: yka,
    uv_pars_fragment: bka,
    uv_pars_vertex: vka,
    uv_vertex: wka,
    worldpos_vertex: xka,
    background_vert: _ka,
    background_frag: kka,
    backgroundCube_vert: Aka,
    backgroundCube_frag: Ska,
    cube_vert: Ika,
    cube_frag: Cka,
    depth_vert: Eka,
    depth_frag: Tka,
    distance_vert: Mka,
    distance_frag: Pka,
    equirect_vert: Rka,
    equirect_frag: Nka,
    linedashed_vert: jka,
    linedashed_frag: Dka,
    meshbasic_vert: Lka,
    meshbasic_frag: Oka,
    meshlambert_vert: Bka,
    meshlambert_frag: Fka,
    meshmatcap_vert: zka,
    meshmatcap_frag: Uka,
    meshnormal_vert: $ka,
    meshnormal_frag: Gka,
    meshphong_vert: Vka,
    meshphong_frag: Hka,
    meshphysical_vert: Wka,
    meshphysical_frag: qka,
    meshtoon_vert: Kka,
    meshtoon_frag: Qka,
    points_vert: Yka,
    points_frag: Xka,
    shadow_vert: Jka,
    shadow_frag: Zka,
    sprite_vert: eAa,
    sprite_frag: tAa
  },
  wo = {
    common: {
      diffuse: {
        value: new so(16777215)
      },
      opacity: {
        value: 1
      },
      map: {
        value: null
      },
      mapTransform: {
        value: new Tc()
      },
      alphaMap: {
        value: null
      },
      alphaMapTransform: {
        value: new Tc()
      },
      alphaTest: {
        value: 0
      }
    },
    specularmap: {
      specularMap: {
        value: null
      },
      specularMapTransform: {
        value: new Tc()
      }
    },
    envmap: {
      envMap: {
        value: null
      },
      envMapRotation: {
        value: new Tc()
      },
      flipEnvMap: {
        value: -1
      },
      reflectivity: {
        value: 1
      },
      ior: {
        value: 1.5
      },
      refractionRatio: {
        value: .98
      },
      dfgLUT: {
        value: null
      }
    },
    aomap: {
      aoMap: {
        value: null
      },
      aoMapIntensity: {
        value: 1
      },
      aoMapTransform: {
        value: new Tc()
      }
    },
    lightmap: {
      lightMap: {
        value: null
      },
      lightMapIntensity: {
        value: 1
      },
      lightMapTransform: {
        value: new Tc()
      }
    },
    bumpmap: {
      bumpMap: {
        value: null
      },
      bumpMapTransform: {
        value: new Tc()
      },
      bumpScale: {
        value: 1
      }
    },
    normalmap: {
      normalMap: {
        value: null
      },
      normalMapTransform: {
        value: new Tc()
      },
      normalScale: {
        value: new Qi(1, 1)
      }
    },
    displacementmap: {
      displacementMap: {
        value: null
      },
      displacementMapTransform: {
        value: new Tc()
      },
      displacementScale: {
        value: 1
      },
      displacementBias: {
        value: 0
      }
    },
    emissivemap: {
      emissiveMap: {
        value: null
      },
      emissiveMapTransform: {
        value: new Tc()
      }
    },
    metalnessmap: {
      metalnessMap: {
        value: null
      },
      metalnessMapTransform: {
        value: new Tc()
      }
    },
    roughnessmap: {
      roughnessMap: {
        value: null
      },
      roughnessMapTransform: {
        value: new Tc()
      }
    },
    gradientmap: {
      gradientMap: {
        value: null
      }
    },
    fog: {
      fogDensity: {
        value: 25e-5
      },
      fogNear: {
        value: 1
      },
      fogFar: {
        value: 2e3
      },
      fogColor: {
        value: new so(16777215)
      }
    },
    lights: {
      ambientLightColor: {
        value: []
      },
      lightProbe: {
        value: []
      },
      directionalLights: {
        value: [],
        properties: {
          direction: {},
          color: {}
        }
      },
      directionalLightShadows: {
        value: [],
        properties: {
          shadowIntensity: 1,
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {}
        }
      },
      directionalShadowMatrix: {
        value: []
      },
      spotLights: {
        value: [],
        properties: {
          color: {},
          position: {},
          direction: {},
          distance: {},
          coneCos: {},
          penumbraCos: {},
          decay: {}
        }
      },
      spotLightShadows: {
        value: [],
        properties: {
          shadowIntensity: 1,
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {}
        }
      },
      spotLightMap: {
        value: []
      },
      spotLightMatrix: {
        value: []
      },
      pointLights: {
        value: [],
        properties: {
          color: {},
          position: {},
          decay: {},
          distance: {}
        }
      },
      pointLightShadows: {
        value: [],
        properties: {
          shadowIntensity: 1,
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {},
          shadowCameraNear: {},
          shadowCameraFar: {}
        }
      },
      pointShadowMatrix: {
        value: []
      },
      hemisphereLights: {
        value: [],
        properties: {
          direction: {},
          skyColor: {},
          groundColor: {}
        }
      },
      rectAreaLights: {
        value: [],
        properties: {
          color: {},
          position: {},
          width: {},
          height: {}
        }
      },
      ltc_1: {
        value: null
      },
      ltc_2: {
        value: null
      }
    },
    points: {
      diffuse: {
        value: new so(16777215)
      },
      opacity: {
        value: 1
      },
      size: {
        value: 1
      },
      scale: {
        value: 1
      },
      map: {
        value: null
      },
      alphaMap: {
        value: null
      },
      alphaMapTransform: {
        value: new Tc()
      },
      alphaTest: {
        value: 0
      },
      uvTransform: {
        value: new Tc()
      }
    },
    sprite: {
      diffuse: {
        value: new so(16777215)
      },
      opacity: {
        value: 1
      },
      center: {
        value: new Qi(.5, .5)
      },
      rotation: {
        value: 0
      },
      map: {
        value: null
      },
      mapTransform: {
        value: new Tc()
      },
      alphaMap: {
        value: null
      },
      alphaMapTransform: {
        value: new Tc()
      },
      alphaTest: {
        value: 0
      }
    }
  },
  uk = {
    basic: {
      uniforms: r2([wo.common, wo.specularmap, wo.envmap, wo.aomap, wo.lightmap, wo.fog]),
      vertexShader: Wc.meshbasic_vert,
      fragmentShader: Wc.meshbasic_frag
    },
    lambert: {
      uniforms: r2([wo.common, wo.specularmap, wo.envmap, wo.aomap, wo.lightmap, wo.emissivemap, wo.bumpmap, wo.normalmap, wo.displacementmap, wo.fog, wo.lights, {
        emissive: {
          value: new so(0)
        },
        envMapIntensity: {
          value: 1
        }
      }]),
      vertexShader: Wc.meshlambert_vert,
      fragmentShader: Wc.meshlambert_frag
    },
    phong: {
      uniforms: r2([wo.common, wo.specularmap, wo.envmap, wo.aomap, wo.lightmap, wo.emissivemap, wo.bumpmap, wo.normalmap, wo.displacementmap, wo.fog, wo.lights, {
        emissive: {
          value: new so(0)
        },
        specular: {
          value: new so(1118481)
        },
        shininess: {
          value: 30
        },
        envMapIntensity: {
          value: 1
        }
      }]),
      vertexShader: Wc.meshphong_vert,
      fragmentShader: Wc.meshphong_frag
    },
    standard: {
      uniforms: r2([wo.common, wo.envmap, wo.aomap, wo.lightmap, wo.emissivemap, wo.bumpmap, wo.normalmap, wo.displacementmap, wo.roughnessmap, wo.metalnessmap, wo.fog, wo.lights, {
        emissive: {
          value: new so(0)
        },
        roughness: {
          value: 1
        },
        metalness: {
          value: 0
        },
        envMapIntensity: {
          value: 1
        }
      }]),
      vertexShader: Wc.meshphysical_vert,
      fragmentShader: Wc.meshphysical_frag
    },
    toon: {
      uniforms: r2([wo.common, wo.aomap, wo.lightmap, wo.emissivemap, wo.bumpmap, wo.normalmap, wo.displacementmap, wo.gradientmap, wo.fog, wo.lights, {
        emissive: {
          value: new so(0)
        }
      }]),
      vertexShader: Wc.meshtoon_vert,
      fragmentShader: Wc.meshtoon_frag
    },
    matcap: {
      uniforms: r2([wo.common, wo.bumpmap, wo.normalmap, wo.displacementmap, wo.fog, {
        matcap: {
          value: null
        }
      }]),
      vertexShader: Wc.meshmatcap_vert,
      fragmentShader: Wc.meshmatcap_frag
    },
    points: {
      uniforms: r2([wo.points, wo.fog]),
      vertexShader: Wc.points_vert,
      fragmentShader: Wc.points_frag
    },
    dashed: {
      uniforms: r2([wo.common, wo.fog, {
        scale: {
          value: 1
        },
        dashSize: {
          value: 1
        },
        totalSize: {
          value: 2
        }
      }]),
      vertexShader: Wc.linedashed_vert,
      fragmentShader: Wc.linedashed_frag
    },
    depth: {
      uniforms: r2([wo.common, wo.displacementmap]),
      vertexShader: Wc.depth_vert,
      fragmentShader: Wc.depth_frag
    },
    normal: {
      uniforms: r2([wo.common, wo.bumpmap, wo.normalmap, wo.displacementmap, {
        opacity: {
          value: 1
        }
      }]),
      vertexShader: Wc.meshnormal_vert,
      fragmentShader: Wc.meshnormal_frag
    },
    sprite: {
      uniforms: r2([wo.sprite, wo.fog]),
      vertexShader: Wc.sprite_vert,
      fragmentShader: Wc.sprite_frag
    },
    background: {
      uniforms: {
        uvTransform: {
          value: new Tc()
        },
        t2D: {
          value: null
        },
        backgroundIntensity: {
          value: 1
        }
      },
      vertexShader: Wc.background_vert,
      fragmentShader: Wc.background_frag
    },
    backgroundCube: {
      uniforms: {
        envMap: {
          value: null
        },
        flipEnvMap: {
          value: -1
        },
        backgroundBlurriness: {
          value: 0
        },
        backgroundIntensity: {
          value: 1
        },
        backgroundRotation: {
          value: new Tc()
        }
      },
      vertexShader: Wc.backgroundCube_vert,
      fragmentShader: Wc.backgroundCube_frag
    },
    cube: {
      uniforms: {
        tCube: {
          value: null
        },
        tFlip: {
          value: -1
        },
        opacity: {
          value: 1
        }
      },
      vertexShader: Wc.cube_vert,
      fragmentShader: Wc.cube_frag
    },
    equirect: {
      uniforms: {
        tEquirect: {
          value: null
        }
      },
      vertexShader: Wc.equirect_vert,
      fragmentShader: Wc.equirect_frag
    },
    distance: {
      uniforms: r2([wo.common, wo.displacementmap, {
        referencePosition: {
          value: new dr()
        },
        nearDistance: {
          value: 1
        },
        farDistance: {
          value: 1e3
        }
      }]),
      vertexShader: Wc.distance_vert,
      fragmentShader: Wc.distance_frag
    },
    shadow: {
      uniforms: r2([wo.lights, wo.fog, {
        color: {
          value: new so(0)
        },
        opacity: {
          value: 1
        }
      }]),
      vertexShader: Wc.shadow_vert,
      fragmentShader: Wc.shadow_frag
    }
  };

uk.physical = {
  uniforms: r2([uk.standard.uniforms, {
    clearcoat: {
      value: 0
    },
    clearcoatMap: {
      value: null
    },
    clearcoatMapTransform: {
      value: new Tc()
    },
    clearcoatNormalMap: {
      value: null
    },
    clearcoatNormalMapTransform: {
      value: new Tc()
    },
    clearcoatNormalScale: {
      value: new Qi(1, 1)
    },
    clearcoatRoughness: {
      value: 0
    },
    clearcoatRoughnessMap: {
      value: null
    },
    clearcoatRoughnessMapTransform: {
      value: new Tc()
    },
    dispersion: {
      value: 0
    },
    iridescence: {
      value: 0
    },
    iridescenceMap: {
      value: null
    },
    iridescenceMapTransform: {
      value: new Tc()
    },
    iridescenceIOR: {
      value: 1.3
    },
    iridescenceThicknessMinimum: {
      value: 100
    },
    iridescenceThicknessMaximum: {
      value: 400
    },
    iridescenceThicknessMap: {
      value: null
    },
    iridescenceThicknessMapTransform: {
      value: new Tc()
    },
    sheen: {
      value: 0
    },
    sheenColor: {
      value: new so(0)
    },
    sheenColorMap: {
      value: null
    },
    sheenColorMapTransform: {
      value: new Tc()
    },
    sheenRoughness: {
      value: 1
    },
    sheenRoughnessMap: {
      value: null
    },
    sheenRoughnessMapTransform: {
      value: new Tc()
    },
    transmission: {
      value: 0
    },
    transmissionMap: {
      value: null
    },
    transmissionMapTransform: {
      value: new Tc()
    },
    transmissionSamplerSize: {
      value: new Qi()
    },
    transmissionSamplerMap: {
      value: null
    },
    thickness: {
      value: 0
    },
    thicknessMap: {
      value: null
    },
    thicknessMapTransform: {
      value: new Tc()
    },
    attenuationDistance: {
      value: 0
    },
    attenuationColor: {
      value: new so(0)
    },
    specularColor: {
      value: new so(1, 1, 1)
    },
    specularColorMap: {
      value: null
    },
    specularColorMapTransform: {
      value: new Tc()
    },
    specularIntensity: {
      value: 1
    },
    specularIntensityMap: {
      value: null
    },
    specularIntensityMapTransform: {
      value: new Tc()
    },
    anisotropyVector: {
      value: new Qi()
    },
    anisotropyMap: {
      value: null
    },
    anisotropyMapTransform: {
      value: new Tc()
    }
  }]),
  vertexShader: Wc.meshphysical_vert,
  fragmentShader: Wc.meshphysical_frag
};

const D8e = {
    r: 0,
    b: 0,
    g: 0
  },
  LG = new xp(),
  nAa = new bo();

function rAa(e, t, n, r, a, i) {
  const o = new so(0);
  let s = a === !0 ? 0 : 1,
    l,
    d,
    u = null,
    h = 0,
    p = null;
  function m(_) {
    let w = _.isScene === !0 ? _.background : null;
    if (w && w.isTexture) {
      const k = _.backgroundBlurriness > 0;
      w = t.get(w, k);
    }
    return w;
  }
  function f(_) {
    let w = !1;
    const k = m(_);
    k === null ? b(o, s) : k && k.isColor && (b(k, 1), w = !0);
    const A = e.xr.getEnvironmentBlendMode();
    A === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, i) : A === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, i), (e.autoClear || w) && (n.buffers.depth.setTest(!0), n.buffers.depth.setMask(!0), n.buffers.color.setMask(!0), e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil));
  }
  function y(_, w) {
    const k = m(w);
    k && (k.isCubeTexture || k.mapping === GYe) ? (d === void 0 && (d = new di(new dl(1, 1, 1), new Mx({
      name: "BackgroundCubeMaterial",
      uniforms: ode(uk.backgroundCube.uniforms),
      vertexShader: uk.backgroundCube.vertexShader,
      fragmentShader: uk.backgroundCube.fragmentShader,
      side: xx,
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      allowOverride: !1
    })), d.geometry.deleteAttribute("normal"), d.geometry.deleteAttribute("uv"), d.onBeforeRender = function (A, S, C) {
      this.matrixWorld.copyPosition(C.matrixWorld);
    }, Object.defineProperty(d.material, "envMap", {
      get: function () {
        return this.uniforms.envMap.value;
      }
    }), r.update(d)), LG.copy(w.backgroundRotation), LG.x *= -1, LG.y *= -1, LG.z *= -1, k.isCubeTexture && k.isRenderTargetTexture === !1 && (LG.y *= -1, LG.z *= -1), d.material.uniforms.envMap.value = k, d.material.uniforms.flipEnvMap.value = k.isCubeTexture && k.isRenderTargetTexture === !1 ? -1 : 1, d.material.uniforms.backgroundBlurriness.value = w.backgroundBlurriness, d.material.uniforms.backgroundIntensity.value = w.backgroundIntensity, d.material.uniforms.backgroundRotation.value.setFromMatrix4(nAa.makeRotationFromEuler(LG)), d.material.toneMapped = vc.getTransfer(k.colorSpace) !== Fh, (u !== k || h !== k.version || p !== e.toneMapping) && (d.material.needsUpdate = !0, u = k, h = k.version, p = e.toneMapping), d.layers.enableAll(), _.unshift(d, d.geometry, d.material, 0, 0, null)) : k && k.isTexture && (l === void 0 && (l = new di(new W5(2, 2), new Mx({
      name: "BackgroundMaterial",
      uniforms: ode(uk.background.uniforms),
      vertexShader: uk.background.vertexShader,
      fragmentShader: uk.background.fragmentShader,
      side: uT,
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      allowOverride: !1
    })), l.geometry.deleteAttribute("normal"), Object.defineProperty(l.material, "map", {
      get: function () {
        return this.uniforms.t2D.value;
      }
    }), r.update(l)), l.material.uniforms.t2D.value = k, l.material.uniforms.backgroundIntensity.value = w.backgroundIntensity, l.material.toneMapped = vc.getTransfer(k.colorSpace) !== Fh, k.matrixAutoUpdate === !0 && k.updateMatrix(), l.material.uniforms.uvTransform.value.copy(k.matrix), (u !== k || h !== k.version || p !== e.toneMapping) && (l.material.needsUpdate = !0, u = k, h = k.version, p = e.toneMapping), l.layers.enableAll(), _.unshift(l, l.geometry, l.material, 0, 0, null));
  }
  function b(_, w) {
    _.getRGB(D8e, eKn(e)), n.buffers.color.setClear(D8e.r, D8e.g, D8e.b, w, i);
  }
  function v() {
    d !== void 0 && (d.geometry.dispose(), d.material.dispose(), d = void 0), l !== void 0 && (l.geometry.dispose(), l.material.dispose(), l = void 0);
  }
  return {
    getClearColor: function () {
      return o;
    },
    setClearColor: function (_, w = 1) {
      o.set(_), s = w, b(o, s);
    },
    getClearAlpha: function () {
      return s;
    },
    setClearAlpha: function (_) {
      s = _, b(o, s);
    },
    render: f,
    addToRenderList: y,
    dispose: v
  };
}

function aAa(e, t) {
  const n = e.getParameter(e.MAX_VERTEX_ATTRIBS),
    r = {},
    a = p(null);
  let i = a,
    o = !1;
  function s(T, P, R, j, B) {
    let F = !1;
    const N = h(T, j, R, P);
    i !== N && (i = N, d(i.object)), F = m(T, j, R, B), F && f(T, j, R, B), B !== null && t.update(B, e.ELEMENT_ARRAY_BUFFER), (F || o) && (o = !1, k(T, P, R, j), B !== null && e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, t.get(B).buffer));
  }
  function l() {
    return e.createVertexArray();
  }
  function d(T) {
    return e.bindVertexArray(T);
  }
  function u(T) {
    return e.deleteVertexArray(T);
  }
  function h(T, P, R, j) {
    const B = j.wireframe === !0;
    let F = r[P.id];
    F === void 0 && (F = {}, r[P.id] = F);
    const N = T.isInstancedMesh === !0 ? T.id : 0;
    let G = F[N];
    G === void 0 && (G = {}, F[N] = G);
    let z = G[R.id];
    z === void 0 && (z = {}, G[R.id] = z);
    let V = z[B];
    return V === void 0 && (V = p(l()), z[B] = V), V;
  }
  function p(T) {
    const P = [],
      R = [],
      j = [];
    for (let B = 0; B < n; B++) P[B] = 0, R[B] = 0, j[B] = 0;
    return {
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: P,
      enabledAttributes: R,
      attributeDivisors: j,
      object: T,
      attributes: {},
      index: null
    };
  }
  function m(T, P, R, j) {
    const B = i.attributes,
      F = P.attributes;
    let N = 0;
    const G = R.getAttributes();
    for (const z in G) if (G[z].location >= 0) {
      const O = B[z];
      let L = F[z];
      if (L === void 0 && (z === "instanceMatrix" && T.instanceMatrix && (L = T.instanceMatrix), z === "instanceColor" && T.instanceColor && (L = T.instanceColor)), O === void 0 || O.attribute !== L || L && O.data !== L.data) return !0;
      N++;
    }
    return i.attributesNum !== N || i.index !== j;
  }
  function f(T, P, R, j) {
    const B = {},
      F = P.attributes;
    let N = 0;
    const G = R.getAttributes();
    for (const z in G) if (G[z].location >= 0) {
      let O = F[z];
      O === void 0 && (z === "instanceMatrix" && T.instanceMatrix && (O = T.instanceMatrix), z === "instanceColor" && T.instanceColor && (O = T.instanceColor));
      const L = {};
      L.attribute = O, O && O.data && (L.data = O.data), B[z] = L, N++;
    }
    i.attributes = B, i.attributesNum = N, i.index = j;
  }
  function y() {
    const T = i.newAttributes;
    for (let P = 0, R = T.length; P < R; P++) T[P] = 0;
  }
  function b(T) {
    v(T, 0);
  }
  function v(T, P) {
    const R = i.newAttributes,
      j = i.enabledAttributes,
      B = i.attributeDivisors;
    R[T] = 1, j[T] === 0 && (e.enableVertexAttribArray(T), j[T] = 1), B[T] !== P && (e.vertexAttribDivisor(T, P), B[T] = P);
  }
  function _() {
    const T = i.newAttributes,
      P = i.enabledAttributes;
    for (let R = 0, j = P.length; R < j; R++) P[R] !== T[R] && (e.disableVertexAttribArray(R), P[R] = 0);
  }
  function w(T, P, R, j, B, F, N) {
    N === !0 ? e.vertexAttribIPointer(T, P, R, B, F) : e.vertexAttribPointer(T, P, R, j, B, F);
  }
  function k(T, P, R, j) {
    y();
    const B = j.attributes,
      F = R.getAttributes(),
      N = P.defaultAttributeValues;
    for (const G in F) {
      const z = F[G];
      if (z.location >= 0) {
        let V = B[G];
        if (V === void 0 && (G === "instanceMatrix" && T.instanceMatrix && (V = T.instanceMatrix), G === "instanceColor" && T.instanceColor && (V = T.instanceColor)), V !== void 0) {
          const O = V.normalized,
            L = V.itemSize,
            D = t.get(V);
          if (D === void 0) continue;
          const U = D.buffer,
            H = D.type,
            Y = D.bytesPerElement,
            K = H === e.INT || H === e.UNSIGNED_INT || V.gpuType === Djt;
          if (V.isInterleavedBufferAttribute) {
            const W = V.data,
              Q = W.stride,
              q = V.offset;
            if (W.isInstancedInterleavedBuffer) {
              for (let ne = 0; ne < z.locationSize; ne++) v(z.location + ne, W.meshPerAttribute);
              T.isInstancedMesh !== !0 && j._maxInstanceCount === void 0 && (j._maxInstanceCount = W.meshPerAttribute * W.count);
            } else for (let ne = 0; ne < z.locationSize; ne++) b(z.location + ne);
            e.bindBuffer(e.ARRAY_BUFFER, U);
            for (let ne = 0; ne < z.locationSize; ne++) w(z.location + ne, L / z.locationSize, H, O, Q * Y, (q + L / z.locationSize * ne) * Y, K);
          } else {
            if (V.isInstancedBufferAttribute) {
              for (let W = 0; W < z.locationSize; W++) v(z.location + W, V.meshPerAttribute);
              T.isInstancedMesh !== !0 && j._maxInstanceCount === void 0 && (j._maxInstanceCount = V.meshPerAttribute * V.count);
            } else for (let W = 0; W < z.locationSize; W++) b(z.location + W);
            e.bindBuffer(e.ARRAY_BUFFER, U);
            for (let W = 0; W < z.locationSize; W++) w(z.location + W, L / z.locationSize, H, O, L * Y, L / z.locationSize * W * Y, K);
          }
        } else if (N !== void 0) {
          const O = N[G];
          if (O !== void 0) switch (O.length) {
            case 2:
              e.vertexAttrib2fv(z.location, O);
              break;
            case 3:
              e.vertexAttrib3fv(z.location, O);
              break;
            case 4:
              e.vertexAttrib4fv(z.location, O);
              break;
            default:
              e.vertexAttrib1fv(z.location, O);
          }
        }
      }
    }
    _();
  }
  function A() {
    E();
    for (const T in r) {
      const P = r[T];
      for (const R in P) {
        const j = P[R];
        for (const B in j) {
          const F = j[B];
          for (const N in F) u(F[N].object), delete F[N];
          delete j[B];
        }
      }
      delete r[T];
    }
  }
  function S(T) {
    if (r[T.id] === void 0) return;
    const P = r[T.id];
    for (const R in P) {
      const j = P[R];
      for (const B in j) {
        const F = j[B];
        for (const N in F) u(F[N].object), delete F[N];
        delete j[B];
      }
    }
    delete r[T.id];
  }
  function C(T) {
    for (const P in r) {
      const R = r[P];
      for (const j in R) {
        const B = R[j];
        if (B[T.id] === void 0) continue;
        const F = B[T.id];
        for (const N in F) u(F[N].object), delete F[N];
        delete B[T.id];
      }
    }
  }
  function I(T) {
    for (const P in r) {
      const R = r[P],
        j = T.isInstancedMesh === !0 ? T.id : 0,
        B = R[j];
      if (B !== void 0) {
        for (const F in B) {
          const N = B[F];
          for (const G in N) u(N[G].object), delete N[G];
          delete B[F];
        }
        delete R[j], Object.keys(R).length === 0 && delete r[P];
      }
    }
  }
  function E() {
    M(), o = !0, i !== a && (i = a, d(i.object));
  }
  function M() {
    a.geometry = null, a.program = null, a.wireframe = !1;
  }
  return {
    setup: s,
    reset: E,
    resetDefaultState: M,
    dispose: A,
    releaseStatesOfGeometry: S,
    releaseStatesOfObject: I,
    releaseStatesOfProgram: C,
    initAttributes: y,
    enableAttribute: b,
    disableUnusedAttributes: _
  };
}

function iAa(e, t, n) {
  let r;
  function a(d) {
    r = d;
  }
  function i(d, u) {
    e.drawArrays(r, d, u), n.update(u, r, 1);
  }
  function o(d, u, h) {
    h !== 0 && (e.drawArraysInstanced(r, d, u, h), n.update(u, r, h));
  }
  function s(d, u, h) {
    if (h === 0) return;
    t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r, d, 0, u, 0, h);
    let m = 0;
    for (let f = 0; f < h; f++) m += u[f];
    n.update(m, r, 1);
  }
  function l(d, u, h, p) {
    if (h === 0) return;
    const m = t.get("WEBGL_multi_draw");
    if (m === null) for (let f = 0; f < d.length; f++) o(d[f], u[f], p[f]);else {
      m.multiDrawArraysInstancedWEBGL(r, d, 0, u, 0, p, 0, h);
      let f = 0;
      for (let y = 0; y < h; y++) f += u[y] * p[y];
      n.update(f, r, 1);
    }
  }
  this.setMode = a, this.render = i, this.renderInstances = o, this.renderMultiDraw = s, this.renderMultiDrawInstances = l;
}

function oAa(e, t, n, r) {
  let a;
  function i() {
    if (a !== void 0) return a;
    if (t.has("EXT_texture_filter_anisotropic") === !0) {
      const C = t.get("EXT_texture_filter_anisotropic");
      a = e.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else a = 0;
    return a;
  }
  function o(C) {
    return !(C !== W1 && r.convert(C) !== e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function s(C) {
    const I = C === hT && (t.has("EXT_color_buffer_half_float") || t.has("EXT_color_buffer_float"));
    return !(C !== bk && r.convert(C) !== e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE) && C !== Ck && !I);
  }
  function l(C) {
    if (C === "highp") {
      if (e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).precision > 0) return "highp";
      C = "mediump";
    }
    return C === "mediump" && e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  let d = n.precision !== void 0 ? n.precision : "highp";
  const u = l(d);
  u !== d && (Es("WebGLRenderer:", d, "not supported, using", u, "instead."), d = u);
  const h = n.logarithmicDepthBuffer === !0,
    p = n.reversedDepthBuffer === !0 && t.has("EXT_clip_control"),
    m = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),
    f = e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
    y = e.getParameter(e.MAX_TEXTURE_SIZE),
    b = e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),
    v = e.getParameter(e.MAX_VERTEX_ATTRIBS),
    _ = e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),
    w = e.getParameter(e.MAX_VARYING_VECTORS),
    k = e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),
    A = e.getParameter(e.MAX_SAMPLES),
    S = e.getParameter(e.SAMPLES);
  return {
    isWebGL2: !0,
    getMaxAnisotropy: i,
    getMaxPrecision: l,
    textureFormatReadable: o,
    textureTypeReadable: s,
    precision: d,
    logarithmicDepthBuffer: h,
    reversedDepthBuffer: p,
    maxTextures: m,
    maxVertexTextures: f,
    maxTextureSize: y,
    maxCubemapSize: b,
    maxAttributes: v,
    maxVertexUniforms: _,
    maxVaryings: w,
    maxFragmentUniforms: k,
    maxSamples: A,
    samples: S
  };
}

function sAa(e) {
  const t = this;
  let n = null,
    r = 0,
    a = !1,
    i = !1;
  const o = new D1(),
    s = new Tc(),
    l = {
      value: null,
      needsUpdate: !1
    };
  this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function (h, p) {
    const m = h.length !== 0 || p || r !== 0 || a;
    return a = p, r = h.length, m;
  }, this.beginShadows = function () {
    i = !0, u(null);
  }, this.endShadows = function () {
    i = !1;
  }, this.setGlobalState = function (h, p) {
    n = u(h, p, 0);
  }, this.setState = function (h, p, m) {
    const f = h.clippingPlanes,
      y = h.clipIntersection,
      b = h.clipShadows,
      v = e.get(h);
    if (!a || f === null || f.length === 0 || i && !b) i ? u(null) : d();else {
      const _ = i ? 0 : r,
        w = _ * 4;
      let k = v.clippingState || null;
      l.value = k, k = u(f, p, w, m);
      for (let A = 0; A !== w; ++A) k[A] = n[A];
      v.clippingState = k, this.numIntersection = y ? this.numPlanes : 0, this.numPlanes += _;
    }
  };
  function d() {
    l.value !== n && (l.value = n, l.needsUpdate = r > 0), t.numPlanes = r, t.numIntersection = 0;
  }
  function u(h, p, m, f) {
    const y = h !== null ? h.length : 0;
    let b = null;
    if (y !== 0) {
      if (b = l.value, f !== !0 || b === null) {
        const v = m + y * 4,
          _ = p.matrixWorldInverse;
        s.getNormalMatrix(_), (b === null || b.length < v) && (b = new Float32Array(v));
        for (let w = 0, k = m; w !== y; ++w, k += 4) o.copy(h[w]).applyMatrix4(_, s), o.normal.toArray(b, k), b[k + 3] = o.constant;
      }
      l.value = b, l.needsUpdate = !0;
    }
    return t.numPlanes = y, t.numIntersection = 0, b;
  }
}

const HF = 4,
  nen = [.125, .215, .35, .446, .526, .582],
  fH = 20,
  lAa = 256,
  Lme = new uG(),
  ren = new so();

let Trt = null,
  Mrt = 0,
  Prt = 0,
  Rrt = !1;

const cAa = new dr();

