function RXt(e, t) {
  let n = 0,
    r = null;
  const a = (s, l) => (r = {
      node: s,
      offset: l
    }, !0),
    i = s => {
      for (let l = 0; l < s.childNodes.length; l++) {
        if (r) return !0;
        const d = s.childNodes[l],
          u = d.nodeType === Node.ELEMENT_NODE && (d.tagName === "DIV" || d.tagName === "P"),
          h = u && (l > 0 || n > 0),
          p = d_e(d),
          m = p + (h ? 1 : 0);
        if (n + m >= t) {
          if (d.nodeType === Node.TEXT_NODE) return a(d, Math.min(t - n, d.length));
          if (d.nodeType === Node.ELEMENT_NODE) {
            const f = d;
            if (f.hasAttribute("data-tag") || f.hasAttribute("data-prompt-ref") || f.hasAttribute("data-magic-item") || f.hasAttribute("data-smart-edit-protocol")) {
              const y = n + p;
              return (t > y || t === y && p > 0) && MXt(f, a) ? !0 : PXt(f, a);
            }
            if (u) {
              if (h && t <= n) return a(f, 0);
              const y = n + (h ? 1 : 0),
                b = t - y;
              return b <= 0 ? a(f, 0) : o(f, b) ? !0 : a(f, f.childNodes.length);
            }
            return i(d) ? !0 : a(d, f.childNodes.length);
          }
        }
        n += m;
      }
      return !1;
    },
    o = (s, l) => {
      let d = 0;
      for (let u = 0; u < s.childNodes.length; u++) {
        if (r) return !0;
        const h = s.childNodes[u],
          p = h.nodeType === Node.ELEMENT_NODE && (h.tagName === "DIV" || h.tagName === "P"),
          m = p && (u > 0 || d > 0),
          f = d_e(h),
          y = f + (m ? 1 : 0);
        if (d + y >= l) {
          if (h.nodeType === Node.TEXT_NODE) return a(h, Math.min(l - d, h.length));
          if (h.nodeType === Node.ELEMENT_NODE) {
            const b = h;
            if (b.hasAttribute("data-tag") || b.hasAttribute("data-prompt-ref") || b.hasAttribute("data-magic-item") || b.hasAttribute("data-smart-edit-protocol")) {
              const v = d + f;
              return (l > v || l === v && f > 0) && MXt(b, a) ? !0 : PXt(b, a);
            }
            if (p) {
              const v = d + (m ? 1 : 0),
                _ = l - v;
              return _ <= 0 ? a(b, 0) : o(b, _) ? !0 : a(b, b.childNodes.length);
            }
            return i(h) ? !0 : a(h, b.childNodes.length);
          }
        }
        d += y;
      }
      return !1;
    };
  return i(e), r || {
    node: e,
    offset: e.childNodes.length
  };
}

function BR(e, t, n) {
  if (typeof window > "u" || t < 0 || n < 0) return;
  const r = window.getSelection();
  if (!r) return;
  const a = Ec(e).length,
    i = Math.min(Math.max(0, t), a),
    o = Math.min(Math.max(0, n), a);
  if (i === o) {
    cy(e, i);
    return;
  }
  const s = RXt(e, i),
    l = RXt(e, o);
  if (!s || !l) return;
  const d = document.createRange();
  d.setStart(s.node, s.offset), d.setEnd(l.node, l.offset), g7t(r, d);
}

function Kk(e, t) {
  if (typeof window > "u") return 0;
  if (e instanceof HTMLTextAreaElement || e.tagName === "TEXTAREA") {
    const a = e;
    return typeof a.selectionStart == "number" ? a.selectionStart : (a.value || "").length;
  }
  const n = window.getSelection(),
    r = t ?? (n && n.rangeCount > 0 ? n.getRangeAt(0) : null);
  if (!r || !e.contains(r.startContainer)) {
    const a = parseInt(e.dataset.cursorPos || "", 10);
    return Number.isNaN(a) ? 0 : Math.max(0, a);
  }
  try {
    const a = r.cloneRange();
    a.selectNodeContents(e), a.setEnd(r.endContainer, r.endOffset);
    const i = a.cloneContents(),
      o = document.createElement("div");
    return o.appendChild(i), Ec(o).length;
  } catch {
    const a = parseInt(e.dataset.cursorPos || "", 10);
    return Number.isNaN(a) ? 0 : Math.max(0, a);
  }
}

function Gw(e) {
  if (typeof window > "u") return;
  if (e instanceof HTMLTextAreaElement || e.tagName === "TEXTAREA") {
    const r = e,
      a = typeof r.selectionStart == "number" ? r.selectionStart : (r.value || "").length,
      i = typeof r.selectionEnd == "number" ? r.selectionEnd : a;
    e.dataset.cursorPos = String(i), i > a ? (e.dataset.selectionStart = String(a), e.dataset.selectionEnd = String(i)) : TXt(e);
    return;
  }
  const t = window.getSelection(),
    n = t && t.rangeCount > 0 ? t.getRangeAt(0) : null;
  if (n && e.contains(n.startContainer)) {
    const r = pFe(e, n.startContainer, n.startOffset),
      a = pFe(e, n.endContainer, n.endOffset),
      i = Math.min(r, a),
      o = Math.max(r, a);
    e.dataset.cursorPos = String(o), o > i ? (e.dataset.selectionStart = String(i), e.dataset.selectionEnd = String(o)) : TXt(e);
    return;
  }
  e.dataset.cursorPos = String(Kk(e));
}

function IVn(e) {
  if (typeof window > "u") return 0;
  const t = Ec(e),
    n = parseInt(e.dataset.cursorPos || "", 10);
  if (!Number.isNaN(n)) {
    const o = Math.min(Math.max(0, n), t.length);
    return cy(e, o), Gw(e), o;
  }
  const r = window.getSelection(),
    a = r && r.rangeCount > 0 ? r.getRangeAt(0) : null;
  if (a && e.contains(a.startContainer)) {
    const o = Kk(e, a);
    return cy(e, o), Gw(e), o;
  }
  const i = t.length;
  return cy(e, i), Gw(e), i;
}

function gnt(e) {
  if (typeof window > "u") return;
  const t = d => (d.tagName === "DIV" || d.tagName === "P") && !d.hasAttribute("data-tag") && !d.hasAttribute("data-prompt-ref") && !d.hasAttribute("data-video") && !d.hasAttribute("data-element") && !d.hasAttribute("data-image");
  let n = !1;
  if (e.childNodes.length === 1) {
    const d = e.firstChild;
    (d == null ? void 0 : d.nodeType) === Node.ELEMENT_NODE && t(d) && (n = !0);
  }
  if (!n && e.childNodes.length >= 2) {
    const d = e.lastChild;
    if ((d == null ? void 0 : d.nodeType) === Node.ELEMENT_NODE && t(d)) {
      const u = d,
        h = Ec(u);
      h.length > 0 && !h.includes(`
`) && !u.querySelector("div, p, br") && (n = !0);
    }
  }
  if (!n) {
    u_e(e, {
      restoreCursor: !1
    });
    return;
  }
  const r = typeof document < "u" ? document.activeElement : null,
    i = r === e || !!r && e.contains(r) ? window.getSelection() : null,
    o = !!(i != null && i.anchorNode && e.contains(i.anchorNode)),
    s = o ? hW(e) : null;
  let l = !1;
  for (; e.childNodes.length === 1;) {
    const d = e.firstChild;
    if ((d == null ? void 0 : d.nodeType) !== Node.ELEMENT_NODE) break;
    const u = d;
    if (!t(u)) break;
    for (; u.firstChild;) e.insertBefore(u.firstChild, u);
    e.removeChild(u), l = !0;
  }
  if (e.childNodes.length >= 2) {
    const d = e.lastChild;
    if ((d == null ? void 0 : d.nodeType) === Node.ELEMENT_NODE && t(d)) {
      const u = d,
        h = Ec(u);
      h.length > 0 && !h.includes(`
`) && !u.querySelector("div, p, br") && (e.insertBefore(document.createTextNode(h), u), e.removeChild(u), l = !0);
    }
  }
  l && e.normalize(), l = u_e(e, {
    restoreCursor: !1
  }) || l, l && s !== null && o && s.start >= 0 && s.end >= 0 && BR(e, s.start, s.end);
}

function cy(e, t) {
  if (e instanceof HTMLTextAreaElement || e.tagName === "TEXTAREA") {
    const d = e,
      u = (d.value || "").length,
      h = Math.min(Math.max(0, t), u);
    try {
      d.focus({
        preventScroll: !0
      }), d.setSelectionRange(h, h);
    } catch {}
    e.dataset.cursorPos = String(h);
    return;
  }
  const n = window.getSelection();
  if (!n) return;
  const r = document.createRange();
  let a = 0,
    i = !1;
  const o = (d, u) => {
      r.setStart(d, u), r.collapse(!0), g7t(n, r), i = !0;
    },
    s = d => {
      for (let u = 0; u < d.childNodes.length; u++) {
        if (i) return !0;
        const h = d.childNodes[u],
          p = h.nodeType === Node.ELEMENT_NODE && (h.tagName === "DIV" || h.tagName === "P"),
          m = p && (u > 0 || a > 0),
          f = d_e(h),
          y = f + (m ? 1 : 0);
        if (a + y >= t) {
          if (h.nodeType === Node.TEXT_NODE) return o(h, Math.min(t - a, h.length)), !0;
          if (h.nodeType === Node.ELEMENT_NODE) {
            const b = h;
            if (b.hasAttribute("data-tag") || b.hasAttribute("data-prompt-ref") || b.hasAttribute("data-magic-item") || b.hasAttribute("data-smart-edit-protocol")) {
              const v = a + f;
              return (t > v || t === v && f > 0) && CXt(b, o) || EXt(b, o), !0;
            }
            if (p) {
              if (m && t <= a) return o(b, 0), !0;
              const v = a + (m ? 1 : 0),
                _ = t - v;
              return _ <= 0 ? (o(b, 0), !0) : (l(b, _) || o(b, b.childNodes.length), !0);
            }
            return s(h) || o(h, b.childNodes.length), !0;
          }
        }
        a += y;
      }
      return !1;
    },
    l = (d, u) => {
      let h = 0;
      for (let p = 0; p < d.childNodes.length; p++) {
        if (i) return !0;
        const m = d.childNodes[p],
          f = m.nodeType === Node.ELEMENT_NODE && (m.tagName === "DIV" || m.tagName === "P"),
          y = f && (p > 0 || h > 0),
          b = d_e(m),
          v = b + (y ? 1 : 0);
        if (h + v >= u) {
          if (m.nodeType === Node.TEXT_NODE) return o(m, Math.min(u - h, m.length)), !0;
          if (m.nodeType === Node.ELEMENT_NODE) {
            const _ = m;
            if (_.hasAttribute("data-tag") || _.hasAttribute("data-prompt-ref") || _.hasAttribute("data-magic-item") || _.hasAttribute("data-smart-edit-protocol")) {
              const w = h + b;
              return (u > w || u === w && b > 0) && CXt(_, o) || EXt(_, o), !0;
            }
            if (f) {
              const w = h + (y ? 1 : 0),
                k = u - w;
              return k <= 0 ? (o(_, 0), !0) : (l(_, k) || o(_, _.childNodes.length), !0);
            }
            return s(m) || o(m, _.childNodes.length), !0;
          }
        }
        h += v;
      }
      return !1;
    };
  s(e);
}

function ynt(e) {
  if (!e) return !1;
  const {
    left: t,
    top: n,
    width: r,
    height: a
  } = e;
  return !(!Number.isFinite(t) || !Number.isFinite(n) || t === 0 && n === 0 && r === 0 && a === 0 || r === 0 && a === 0 && t < 2 && n < 2);
}

function NXt(e, t) {
  const n = e.getBoundingClientRect(),
    r = window.getComputedStyle(e),
    a = parseFloat(r.lineHeight) || 22,
    i = parseFloat(r.paddingTop) || 8,
    o = parseFloat(r.paddingLeft) || 8,
    d = Ec(e).slice(0, Math.max(0, t)).split(`
`),
    u = Math.max(0, d.length - 1),
    h = d[u] || "",
    m = (parseFloat(r.fontSize) || 18) * .55,
    f = n.left + o + h.length * m,
    y = n.top + i + u * a;
  return new DOMRect(f, y, 0, a);
}

function Tpa(e) {
  if (typeof window > "u") return null;
  const t = window.getSelection(),
    n = t && t.rangeCount > 0 ? t.getRangeAt(0) : null;
  if (!n || !e.contains(n.startContainer)) {
    const l = Kk(e);
    return NXt(e, l);
  }
  const r = n.getClientRects();
  for (let l = r.length - 1; l >= 0; l--) if (ynt(r[l])) return r[l];
  const a = n.getBoundingClientRect();
  if (ynt(a)) return a;
  const i = n.cloneRange(),
    o = document.createElement("span");
  o.setAttribute("data-at-mention-caret-probe", "1"), o.appendChild(document.createTextNode("​"));
  try {
    i.collapse(!0), i.insertNode(o);
    const l = o.getBoundingClientRect();
    if (o.remove(), ynt(l)) return l;
  } catch {
    o.remove();
  }
  const s = Kk(e, n);
  return NXt(e, s);
}

function Mpa(e) {
  if (typeof window > "u") return null;
  const t = window.getSelection(),
    n = t && t.rangeCount > 0 ? t.getRangeAt(0).cloneRange() : null,
    r = Kk(e),
    a = Ec(e);
  let i = r;
  for (let s = r - 1; s >= 0; s--) {
    const l = a[s];
    if (l === "@") {
      i = s + 1;
      break;
    }
    if (/\s/.test(l)) break;
  }
  cy(e, i);
  const o = Tpa(e);
  return n && t && g7t(t, n), o;
}

function jXt(e, t) {
  var n;
  if (!((n = t.startContainer) != null && n.isConnected)) return !1;
  try {
    return e.removeAllRanges(), e.addRange(t), !0;
  } catch {
    return !1;
  }
}

const Wg = "​";

function CVn(e) {
  return e.replace(/\u200B/g, "");
}

function mFe(e) {
  return e.hasAttribute("data-prompt-ref") || e.hasAttribute("data-magic-item") || e.hasAttribute("data-smart-edit-protocol") || e.hasAttribute("data-tag") || e.hasAttribute("data-video") || e.hasAttribute("data-element") || e.hasAttribute("data-image");
}

function Ppa(e) {
  return e.replace(new RegExp(`${Wg}[\\t ]+`, "g"), Wg).replace(new RegExp(`[\\t ]+${Wg}`, "g"), Wg);
}

function Rpa(e) {
  return (e == null ? void 0 : e.nodeType) === Node.TEXT_NODE && (e.textContent || "") === Wg;
}

function VX(e, t = null) {
  const n = document.createTextNode(Wg);
  return e.insertBefore(n, t), n;
}

function DXt(e) {
  return (e.tagName === "DIV" || e.tagName === "P") && !mFe(e) && !e.hasAttribute("data-prompt-editor-area");
}

function Npa(e) {
  let t = !1;
  for (; e.childNodes.length === 1;) {
    const r = e.firstChild;
    if ((r == null ? void 0 : r.nodeType) !== Node.ELEMENT_NODE) break;
    const a = r;
    if (!DXt(a)) break;
    for (; a.firstChild;) e.insertBefore(a.firstChild, a);
    e.removeChild(a), t = !0;
  }
  const n = [...e.childNodes].filter(r => r.nodeType === Node.ELEMENT_NODE && DXt(r));
  if (n.length > 0) for (const r of n) {
    for (; r.firstChild;) e.insertBefore(r.firstChild, r);
    e.removeChild(r), t = !0;
  }
  return t;
}

function EVn(e) {
  let t = !1;
  for (const n of [...e.childNodes]) {
    if (n.nodeType !== Node.TEXT_NODE) continue;
    const r = n.textContent || "",
      a = n.previousSibling,
      i = n.nextSibling,
      o = (a == null ? void 0 : a.nodeType) === Node.ELEMENT_NODE && mFe(a),
      s = (i == null ? void 0 : i.nodeType) === Node.ELEMENT_NODE && mFe(i);
    if (o && s && /^[\t ]+$/.test(r)) {
      e.removeChild(n), t = !0;
      continue;
    }
    if (s && /^[\t ]+$/.test(r)) {
      e.removeChild(n), t = !0;
      continue;
    }
    if (Rpa(a) && /^[\t ]+$/.test(r)) {
      e.removeChild(n), t = !0;
      continue;
    }
    if (r.includes(Wg)) {
      const d = Ppa(r);
      if (d !== r) {
        n.textContent = d || Wg, t = !0;
        continue;
      }
    }
    if (o && /^[\t ]+$/.test(r)) {
      n.textContent = Wg, t = !0;
      continue;
    }
    if (o && /^[\t ]+@/.test(r)) {
      n.textContent = r.replace(/^[\t ]+/, ""), t = !0;
      continue;
    }
  }
  return t;
}

function y7t(e) {
  let t = !1;
  for (const n of [...e.childNodes]) {
    if (n.nodeType !== Node.TEXT_NODE) continue;
    const r = n.textContent || "";
    if (!r.includes(Wg) || r === Wg) continue;
    const a = n.parentNode;
    if (!a) continue;
    const i = r.split(Wg),
      o = document.createDocumentFragment();
    for (let s = 0; s < i.length; s++) s > 0 && o.appendChild(document.createTextNode(Wg)), i[s] && o.appendChild(document.createTextNode(i[s]));
    a.insertBefore(o, n), a.removeChild(n), t = !0;
  }
  return t;
}

function jpa(e) {
  const t = typeof window < "u" ? hW(e) : null;
  let n = y7t(e);
  return n = EVn(e) || n, n && (e.normalize(), t && t.start >= 0 && t.end >= 0 && (BR(e, t.start, t.end), Gw(e))), n;
}

function Dpa(e) {
  let t = y7t(e);
  for (const n of [...e.childNodes]) {
    if (n.nodeType !== Node.ELEMENT_NODE) continue;
    const r = n;
    if (!mFe(r)) continue;
    const a = r.nextSibling;
    if ((a == null ? void 0 : a.nodeType) === Node.TEXT_NODE) {
      const i = a.textContent || "";
      if (i === Wg) continue;
      if (/^[\t ]+$/.test(i)) {
        a.textContent = Wg, t = !0;
        continue;
      }
      if (i.length > 0) {
        e.insertBefore(document.createTextNode(Wg), a), t = !0;
        continue;
      }
    }
    VX(e, a), t = !0;
  }
  return t;
}

function u_e(e, t) {
  if (typeof window > "u") return !1;
  const n = (t == null ? void 0 : t.restoreCursor) !== !1,
    r = typeof document < "u" ? document.activeElement : null,
    i = n && (r === e || !!r && e.contains(r)) ? window.getSelection() : null,
    o = !!(i != null && i.anchorNode && e.contains(i.anchorNode)),
    s = o ? hW(e) : null;
  let l = !1;
  return l = y7t(e) || l, l = Npa(e) || l, l = EVn(e) || l, l = Dpa(e) || l, l && e.normalize(), l && s !== null && o && s.start >= 0 && s.end >= 0 && BR(e, s.start, s.end), l;
}

function bnt(e, t) {
  if (typeof window > "u") return;
  const n = window.getSelection();
  if (!n) return;
  u_e(e, {
    restoreCursor: !1
  });
  let r = t.nextSibling;
  if ((r == null ? void 0 : r.nodeType) === Node.TEXT_NODE && (r.textContent || "").includes(Wg)) {
    const o = (r.textContent || "").indexOf(Wg),
      s = document.createRange();
    s.setStart(r, o + 1), s.collapse(!0), jXt(n, s), e.dataset.cursorPos = String(Kk(e));
    return;
  }
  r = VX(t.parentNode || e, r);
  const a = document.createRange();
  a.setStart(r, 1), a.collapse(!0), jXt(n, a), e.dataset.cursorPos = String(Kk(e));
}

const HX = "qiaodoumayi_prompt_library",
  Lpa = new Set(["portrait-texture-default", "mood-adjust-default", "common_portrait-texture-default", "common_mood-adjust-default"]),
  Opa = new Set(["人像质感调节", "情绪调节"]),
  Bpa = "基于我上传的这张参考图，生成一张九宫格（3x3 grid）布局的分镜脚本。请严格保持角色与参考图一致（Keep character strictly consistent），但在9个格子中展示该角色不同的动作、表情和拍摄角度（如正面、侧面、背面、特写等）。要求风格高度统一，形成一张完整的角色动态表（Character Sheet）。",
  Fpa = "请对参考图片进行无损高清放大（Upscale）。请严格保持原图的构图、色彩、光影和所有细节元素不变，不要进行任何创造性的重绘或添加新内容。仅专注于提升分辨率、锐化边缘（Sharpening）和去除噪点（Denoising），实现像素级的高清修复。Best quality, 8k, masterpiece, highres, ultra detailed, sharp focus, image restoration, upscale, faithful to original.",
  zpa = "请基于上传的图片进行整体修复与画质优化，不要重新生成画面。严格保留原图的排版、主体内容、人物/物体、动作、场景关系、构图和分镜顺序，不要改变故事内容，不要随意增删元素。重点优化以下问题：1. 去除画面脏感、灰感、噪点、颗粒感、压缩痕迹、杂乱纹理、模糊边缘和低质量伪影；2. 提升整体清晰度、细节干净度和画面通透感；3. 优化色彩，让颜色更纯净、更协调、更有层次，避免浑浊、发灰、发闷、过脏的颜色；4. 统一画面的视觉风格，包括色调、亮度、对比度、清晰度、线条质感、细节密度和整体精致度；5. 让画面看起来更干净、更高级、更适合展示，只做优化和统一，不要重构场景，不要改变角色外观，不要改变主体姿势，不要改变重要物体的位置。最终效果要求：画面干净、噪点少、边缘清晰、色彩通透、明暗自然、风格统一、观感高级。不要添加文字、logo、水印，不要多出新角色或多余元素，不要把图片改成完全不同的风格。100% pure CG, Unreal Engine 5 cinematic cutscene, Octane render quality, 8K ultra-detailed, ray tracing, global illumination, MetaHuman high quality digital humans, AAA game cinematic quality, The Last of Us Part II / Death Stranding / Detroit Become Human style cinematic restraint.超写实CG数字人，3A游戏过场动画级人物质感，Unreal Engine 5 / MetaHuman级角色精度。只强调人物本体质感，不依赖场景叙事。",
  Upa = "智能识别并彻底抹除画面中的破坏性杂物及其投射的混乱阴影。激活AI像素级重建算法，深度解析并完美延展被遮挡的复杂背景(如高难度几何印花、编织纹理等)。强制对齐全局光照逻辑，无缝重连断裂的环境光影(如百叶窗投影)，确保填补区域与原始画面在纹理、透视与光照上达成100%的物理级统一，拒绝任何PS涂抹痕迹",
  $pa = "智能提取目标物体的空间透视与三维轮廓，键转化为极具机械美感的工业设计黑白概念线稿。精准勾勒复杂的空气动力学边缘、机械传动部件与装配接缝。在背景自动生成专业的流体力学辅助线、透视网格及尺寸标注排版。采用精准的马克笔触与轻微的灰阶排线表现截面体积，呈现顶级工业设计师的手绘蓝图质感。",
  Gpa = "提取参考图的环境特效与空间深度遮挡Mask(蒙版)。将目标产品完美替换入特效中心，强制保留原始流体/烟雾对主体的前景遮挡关系。重构产品表面光线折射模型，使其100%匹配新场景的复杂环境光(如金属反光、丝绸漫反射)，实现特效与实物的像素级物理融合。",
  Vpa = "精准提取目标产品并无缝置入新场景。强制启用全局光照(GI)计算，完美吸收环境双光源(如冷蓝光与暖橙光)形成立体反射。真实演算玻璃材质的透光率与折射率，并在承接面上投射带有液体色彩的物理焦散阴影(Caustics)，彻底消除边缘抠图感，实现电影级空间光影融合。",
  Hpa = "精准提取目标产品并无缝置入新场景。强制启用全局光照(GI)计算，完美吸收环境双光源(如冷蓝光与暖橙光)形成立体反射。真实演算玻璃材质的透光率与折射率，并在承接面上投射带有液体色彩的物理焦散阴影(Caustics)，彻底消除边缘抠图感，实现电影级空间光影融合。",
  Wpa = "将主体置于纯白无缝背景中，利用3D渲染级光影重塑其初始材质(如高级皮革的哑光纹理、塑料组件的镜面反光)。一键抹除所有物理磨损、泥土污渍与岁月痕迹，恢复至全新出厂状态。强化立体光感与阴影过渡，提升整体商业精致度，直出符合顶配电商主图的标准图像。";

function fFe(e) {
  return String(e || "").replace(/【|】/g, "").trim();
}

const qpa = `you are a veteran Hollywood storyboard artist with years of experience. You have the ability to accurately analyze character features and scene characteristics based on images. Provide me with the most suitable camera angles and storyboards. Strictly base this on the uploaded character and scene images, while maintaining a consistent visual style.

MANDATORY LAYOUT: Create a precise 3x3 GRID containing exactly 9 distinct panels.

- The output image MUST be a single image divided into a 3 (rows) by 3 (columns) matrix.
- There must be EXACTLY 3 horizontal rows and 3 vertical columns.
- Each panel must be completely separated by a thin, distinct, solid black line.
- DO NOT create a collage. DO NOT overlap images. DO NOT create random sizes. 
- The grid structure must be perfectly aligned for slicing.

Subject Content: "[在此处填充你对故事的描述]"

Styling Instructions:
- Each panel shows the SAME subject/scene from a DIFFERENT angle (e.g., Front, Side, Back, Action, Close-up).
- Maintain perfect consistency of the character/object across all panels.
- Cinematic lighting, high fidelity, 8k resolution.

Negative Constraints:
- No text, no captions, no UI elements.
- No watermarks.
- No broken grid lines.`,
  Kpa = `(strictly mimic source image art style:1.5), (same visual style:1.4),
score_9, score_8_up, masterpiece, best quality, (character sheet:1.4), (reference sheet:1.3), (consistent art style:1.3), matching visual style, 

[Structure & General Annotations]:
multiple views, full body central figure, clean background, 
(heavy annotation:1.4), (text labels with arrows:1.3), handwriting, data readout,

[SPECIAL CHARACTER DESCRIPTION AREA]:
(prominent character profile text box:1.6), (dedicated biography section:1.5), large descriptive text block,
[在此处填写特殊角色说明，例如：姓名、种族、背景故事等],

[Clothing Breakdown]:
(clothing breakdown:1.5), (outfit decomposition:1.4), garment analysis, (floating apparel:1.3), 
displaying outerwear, displaying upper body garment, displaying lower body garment, 

[Footwear Focus]:
(detailed footwear display:1.5), (floating shoes:1.4), shoe design breakdown, focus on shoes, 

[Inventory & Details]:
(inventory knolling:1.2), open container, personal accessories, organized items display, expression panels`,
  Qpa = `# Directive: Create a "Rich Narrative Mood Board" (8-Grid Layout)

## 1. PROJECT INPUT 

**A. [Story & Concept / 故事与核心想法]**
> [跟据自身内容书写]

**B. [Key Symbols / 核心意象 (Optional)]**
> [深度理解参考图，自行创作]

**C. [Color Preferences / 色彩倾向 (Optional)]**
> [深度理解参考图，自行创作]

**D. [Reference Images / 参考图]**
> (See attached images / 请读取我上传的图片)

---

## 2. Role Definition
Act as a **Senior Art Director**. Synthesize the Input above into a single, cohesive, high-density **Visual Mood Board** using a complex **8-Panel Asymmetrical Grid Layout**.

## 3. Layout Mapping (Strict Adherence)
You must design a visual composition that tells the story through **8 distinct panels** within one image. **Do not** generate random grids. Map the content exactly as follows:

* **Panel 1 (The World):** A wide, cinematic establishing shot of the environment (based on Input A).
* **Panel 2 (The Protagonist):** A portrait close-up (based on reference images), focusing on micro-expressions.
* **Panel 3 (The Metaphor):** An **abstract symbolic object** representing the core theme (based on Input B).
* **Panel 4 (The Palette):** A graphical **Color Palette Strip** showcasing 5 specific colors extracted from the scene.
* **Panel 5 (The Texture):** Extreme macro close-up of a material surface (e.g., rust, skin, fabric) to add tactile richness.
* **Panel 6 (The Motion):** A motion-blurred or long-exposure shot representing time/chaos.
* **Panel 7 (The Detail):** A focused shot of a specific prop or accessory relevant to the plot.
* **Panel 8 (The AI Art Interpretation - CRITICAL):** This is your **free creative space**. Generate an artistic, surreal, or abstract re-interpretation of the story's emotion. **Do not just copy the inputs.** Create a "Vibe Image" (e.g., Double Exposure, Oil Painting style, or abstract geometry) that captures the *soul* of the narrative.

## 4. Execution Requirements
* **Composition Style:** High-end Editorial / Magazine Layout. Clean, thin white borders.
* **Visual Unity:** All panels must share the same lighting conditions and color grading logic (Unified Aesthetic).
* **Task:** Provide the **Final English Image Prompt** that explicitly describes this 8-grid layout, ensuring Panel 8 stands out as an artistic variation.`,
  Ypa = "Analyze the strokes and features of this sketch. Interpret the user's drawing intent and any visible text, then generate a high-quality image that transforms this rough draft into a fully realized concept. [IMPORTANT: Strictly follow the pose, composition, and layout of the provided reference image. The reference image contains the primary structure. Maintain the visual elements from the input image with high fidelity.]",
  b7t = `You are editing an image from annotation markup. One or more reference images include the clean original and/or a screenshot with arrows, boxes, circles, and written notes showing the requested changes.

Apply every visible annotation instruction literally (arrows point to the region to change; text labels describe what to do). Preserve the original subject, composition, aspect ratio, identity, style, lighting, and background unless an annotation explicitly asks to change them.

Output ONLY a clean final bitmap with the edits applied. Do NOT render annotation artifacts: no red/colored arrows, boxes, circles, underlines, handwritten labels, callouts, selection outlines, resize handles, toolbars, cursors, or UI chrome.`,
  Xpa = `创建一张艺术性的16:9角色身份板。
[主体]: @参考图像
纯白色/柔和的米白色背景。无环境、无道具、无标志、无水印。


设计方向:
不要创建标准的角色参考表，创建一张电影般的身份板，
感觉像是高端动画工作室的角色研究与艺术书布局的结合。
布局应不对称、优雅且视觉上令人难忘。
使用大片留白、多样化的图像比例和有意的不平衡。
避免网格、蓝图设计、目录布局和重复的转场展示。


重要布局规则:
不要重叠任何角色图像。
每个视角必须有清晰的分离和呼吸空间。
保持所有身体、肖像、轮廓和细节研究的视觉区分。
无裁剪面部、无隐藏肢体、无堆叠人物、无合并姿势。


主要构图:
放置一个大型英雄全身视角，略微偏离中心作为视觉锚点。
围绕它，以干净的间距排列较小的辅助研究：
中性全身视角、背面视角、侧面视角、坐姿、倾斜姿势、
蹲姿、俯视身体角度、仰视身体角度、富有表现力的肖像研究。
每个视角应感觉像是一个独立的干净角色研究，
而不是来自一个场景的帧。


身份锁定:
在所有视角中保持严格的身份一致性:
相同面部、相同面部比例、相同发型、相同服装、相同身体比例、
相同姿势语言、相同视觉个性。


有用参考细节:
使角色便于未来的图像和视频生成:
清晰的面部形状、清晰的发型轮廓、清晰的服装轮廓、
清晰的身体形状、清晰的手部、清晰的姿势、清晰的表情范围。
8k分辨率，超写实，极致逼真的皮肤纹理，毛孔


艺术性部分:
包含一个小轮廓研究区域，带有2-3个简化的黑色角色轮廓。
包含一个小表情研究区域，带有细微的情感变化。
包含一个小细节研究区域，展示面部、头发和服装的关键视觉特征。


文本设计:
添加一个时尚的角色ID块。
保持简约、大胆且艺术导向。
仅使用: 名称、角色、核心情绪、视觉标志
仅在有帮助的地方使用小型手写风格标签。
允许使用细微的编辑箭头和标注标记，但保持简约和优雅。


风格:
简约、电影感、高端、艺术书般、干净、富有表现力、适用于制作。
最终图像应感觉像一张艺术性的角色身份板，重在帮助AI模型理解角色的面部、轮廓、服装、姿势和情感范围。`,
  Jpa = `创建一张艺术性的 16:9 场景身份板。
[空间主体]: @参考图像
中性柔和的米白/暖灰美术画册版面作为承载多视角画面的画布。无水印、无 logo、无杂乱边框。
设计方向:
不要做标准的场景参考表或分镜表,创建一张电影般的「空间身份板」,
感觉像高端动画工作室的场景美术研究与艺术设定集版面的结合。
布局应不对称、优雅且视觉上令人难忘。
使用大片留白、多样化的画幅比例和有意的不平衡。
避免网格、目录式排布、等距小图阵列和重复的机位陈列。
重要布局规则:
不要重叠任何机位画面。
每个视角之间必须有清晰的分隔和呼吸空间。
保持所有机位、景别、细节研究在视觉上彼此独立。
无相互裁切、无堆叠拼贴、无把不同机位糊进同一张。
主要构图:
放置一个大型「英雄建立镜头」(大远景全景空间),略微偏离中心作为视觉锚点。
围绕它,以干净的间距排列较小的辅助机位研究:
高空俯视/鸟瞰、反打镜头、低角度仰拍、过肩/主观视角、侧拍纵深、人视点中景、关键区域中景、局部材质特写。
每个视角应感觉像一张独立干净的空间研究,而不是同一段戏里的连续帧。
空间锁定:
在所有视角中保持严格的空间一致性:
相同建筑结构、相同材质与表面、相同光线方向与光质、相同色调、
相同关键地标与道具(招牌/海报上的文字逐字一致)、相同时代设定、相同空气与氛围。
有用参考细节:
让这个空间便于未来的图像和视频生成:
清晰的建筑形体、清晰的空间布局与动线、清晰的材质质感、清晰的光照逻辑、
清晰的标志物、清晰的尺度参照、清晰的景深层次。
8k 分辨率,超写实,极致材质细节(混凝土肌理、金属、玻璃、浮尘)。
艺术性部分:
包含一个小型平面/动线示意区,用 2-3 个简化的黑色平面或轴测图标出主要空间关系。
包含一个小型光线与氛围研究区,呈现不同时段或光位下的情绪变化。
包含一个小型细节研究区,展示建筑、材质与陈设的关键视觉特征。
文本设计:
添加一个时尚的场景 ID 块。保持简约、大胆且艺术导向。
仅使用: 地点名称、空间类型/功能、年代、核心情绪、视觉标志。
仅在有帮助的地方使用小型手写风格标签。
允许使用细微的标注箭头和标记,但保持简约和优雅。
风格:
简约、电影感、高端、艺术设定集般、干净、富有表现力、适用于制作。
最终图像应感觉像一张艺术性的空间身份板,重在帮助 AI 模型理解该场景的建筑、布局、材质、光线、机位与情绪范围。`,
  Zpa = `名称：{角色名}。

描述：{性别/年龄/身高/体型/发型/肤色/脸型…}

服装：{上衣}/{下装}/{鞋}/{帽}，{饰品}。

特征：{特征}。

构图规范：高质量专业角色设定图，横向构图，纯白色纯净背景，中性摄影棚灯光，平光布光；布局结构（必须是角色四视图）：正面面部头部特写（占图片水平 1/3 的空间）+ [全身正面视图 + 全身左侧面视图 + 全身背面视图]（占图片水平剩余的 2/3 的空间，并列排列），四个视图中间用淡灰色(#E2E2E2)的 2px 细线分割，无任何道具或背景物体。光影：中性摄影棚灯光，柔和的前侧光，清晰的轮廓定义，自然的肤色，面部清晰服装可辨识，平视镜头，完整全身，无裁剪。不得出现任何道具/武器/食物/饮料/手持物（角色必须空手）；不得出现复杂动作、情绪表情、面部遮挡；不得出现环境背景（仅白色）；不得出现其他角色；确保所有视图中的面部特征、发型、体型和服装保持一致；不得出现文字、水印、标签、UI元素；无背景场景，无过度风格化，纯 Naive 样貌。

[视觉风格：{视觉风格}]`,
  ema = `名称：{场景名}，{类型}。

描述：{室内/室外}，{尺度}，{长宽高}。

前背景：{背景层}；{前景层}；{最高处/核心物}。

氛围：{氛围词}。

构图规范：高质量专业场景设定图，横向构图，以 2 行 2 列的干净网格四等分整齐排版，每个格子都是独立的 16:9 横向画面，展示同一场景的四个大全景视角（1 为正面中心线大全景视图，镜头正对场景中心轴，构图严格居中，画面同时包含顶面与底面，尽量展示完整空间层次、更多环境细节和深景深；2 以 1 的中心线为参考，摄像机移动到场景左前方 45 度位置的大全景视图，镜头仍对准场景核心区域；3 以 1 的中心线为参考，摄像机移动到场景右前方 45 度位置的大全景视图；4 为镜头在室内最深处向外拍摄的正中心全景图）。四个视角必须是同一地点、同一时间、同一天气、同一光源、同一空间结构和同一美术风格。环境清晰，细节丰富，景深较深，光影自然，专业摄影，超清画质。不得出现任何人物（空场景参考图，必须空无一人），也不得出现人群、背影、剪影、人脸、手脚、人物倒影、阴影、照片人物、屏幕人物、镜中人物、剧情事件、人物活动；不得让四个视角表现成四个不同场景；不得改变建筑结构、空间比例、主体位置、材质、色彩、天气、时间段或光源方向；画面构图不得倾斜、透视畸变、广角畸变、变形、扭曲；不得出现鱼眼视角、斜角、极端俯视、极端仰视；正面视图必须居中、对称、中心线构图；禁止模糊、低画质；禁止景深太浅；不得出现文字、水印、签名、边框、标签、UI元素。

[视觉风格：{视觉风格}]`,
  tma = `名称：{产品名}，{品类}。

描述：{尺寸/材质/结构/接口/底座…}。

特征：{磨损/反光/细节}。

构图规范：高质量写实道具多角度展示图，横向构图，以 2 行 3 列的干净网格整齐排版，展示道具的六个极正视角。纯白色纯净背景，专业产品影棚摄影，标准六视图参考。六视图包括（必须是道具六视图）：绝对正前方视图、绝对正后方视图、绝对左侧视图、绝对右侧视图、绝对正上方俯拍视图、绝对正下方仰拍视图。所有视图必须是同一件道具，材质、颜色、比例、结构完全一致。使用超长焦镜头或移轴镜头效果，将透视变形降到最低，物体所有本该平行的边缘在画面中保持平行，接近正交投影。每个视图都像在专业产品影棚中用三脚架精密校准拍摄，构图绝对端正，物体在每个格子中居中，无任何倾斜、旋转或透视畸变。画面不得出现任何人物、角色、人群、人影；不得出现手、脚、人脸、场景、建筑、自然景观；无其他道具；必须无文字、无水印、无 logo、无 UI 元素，不要任何剧情事件；保持道具本体清晰、完整轮廓、所有角度的材质与结构一致。

[视觉风格：{视觉风格}]`,
  nma = `高质量专业角色设定图，纯白色纯净背景，中性摄影棚灯光，平光布光，平视镜头。布局：左侧为正面面部头部特写（占画面宽度 1/3，胸部以上、五官清晰）；右侧并列三格为全身正面视图 / 全身侧面视图 / 全身背面视图（各占 1/3），三格间用淡灰色(#E2E2E2) 2px 细线分割。角色：{主体}。要求：三视图服装、发型、体型、配色完全一致；全身完整不裁切、无遮挡；不得出现道具/武器/手持物；不得出现复杂动作与夸张表情；不得出现背景物体（纯白）；不得出现其他角色；不得出现文字、水印、标签、UI 元素。

[视觉风格：{视觉风格}]`,
  rma = `以参考图的同一场景为准，生成白底（或纯色）三视角视图（正面中心线 / 左前 45° / 右前 45°），三视角必须是同一空间结构、同一光源方向、同一时间与天候，建筑比例与材质一致；空场景、无人物；不得出现镜像、复制、透视畸变；不得出现文字与水印。

[视觉风格：{视觉风格}]`,
  ama = `根据需求描述整理为 4–8 个连续分镜（每格一个镜头），输出为规整网格长图：每格包含 景别(远/全/中/近/特写) + 机位/视角 + 主体动作 + 光影氛围；叙事节奏符合 10–15 秒内可演完的剧情；主角形象一致、场景连续、运动方向连贯；格内不得出现文字（除必要的对白气泡，可留白）；整体风格统一。

需求：{剧情描述}
[视觉风格：{视觉风格}]`,
  ima = `根据需求描述，输出 4–6 个中文调度分镜（手绘草图感）：每格标注 机位（俯拍/平视/仰视）、走位箭头、运动轨迹、主体动作与关键道具；画面为简洁线稿/淡彩示意，不追求精细渲染，重点表达调度与镜头关系；同一人物/场景在全部格子中保持一致；格内允许简洁中文标注（机位/动作/走位）。

需求：{剧情描述}`,
  oma = `基于参考图的画面内容与物理逻辑，推演并生成 3 秒后的同一机位/同一景别画面：人物动作与表情自然延续（含惯性、速度、力的作用），场景与光线保持不变或按物理逻辑合理变化（如扬尘、水花、光斑移动）；不得改变人物外貌与服装；不得出现时间倒流式矛盾；不得出现文字与水印。只输出这一帧画面。

[视觉风格：{视觉风格}]`,
  sma = `基于参考图的画面内容与物理逻辑，反推 5 秒前的同一机位画面：给出动作的起因状态（或即将发生的动作前半段），人物姿态与情绪比现状更早一阶段，场景一致、光线按时间合理倒推；不得改变人物身份与服装；不得出现不合理穿帮；不得出现文字与水印。只输出这一帧画面。

[视觉风格：{视觉风格}]`,
  lma = [{
    id: "grid-default",
    name: "九宫格分镜脚本",
    prompt: Bpa
  }, {
    id: "upscale-default",
    name: "高清放大",
    prompt: Fpa
  }, {
    id: "gpt-denoise-default",
    name: "GPT噪点消除",
    prompt: zpa
  }, {
    id: "blur-to-hd-default",
    name: "糊图变高清",
    prompt: Upa
  }, {
    id: "product-to-lineart-default",
    name: "产品转线稿",
    prompt: $pa
  }, {
    id: "style-replication-default",
    name: "风格复刻",
    prompt: Gpa
  }, {
    id: "product-composite-default",
    name: "产品融图",
    prompt: Vpa
  }, {
    id: "clutter-removal-default",
    name: "杂物消失",
    prompt: Hpa
  }, {
    id: "product-retouch-default",
    name: "精修产品",
    prompt: Wpa
  }, {
    id: "moodboard-default",
    name: "情绪版",
    prompt: Qpa
  }, {
    id: "storyboard-default",
    name: "分镜版",
    prompt: qpa
  }, {
    id: "character-sheet-default",
    name: "角色板",
    prompt: Kpa
  }, {
    id: "cinematic-character-identity-board-default",
    name: "电影级角色身份板",
    prompt: Xpa
  }, {
    id: "cinematic-scene-identity-board-default",
    name: "电影级场景身份板",
    prompt: Jpa
  }, {
    id: "canvas-default",
    name: "画板提示词",
    prompt: Ypa
  }, {
    id: "annotation-edit-default",
    name: "按标注修改",
    prompt: b7t
  }, {
    id: "character-setting-sheet-default",
    name: "角色设定图",
    prompt: Zpa
  }, {
    id: "scene-setting-sheet-default",
    name: "场景设定图",
    prompt: ema
  }, {
    id: "product-setting-sheet-default",
    name: "产品设定图",
    prompt: tma
  }, {
    id: "character-3view-default",
    name: "角色三视图",
    prompt: nma
  }, {
    id: "scene-3view-default",
    name: "场景三视图",
    prompt: rma
  }, {
    id: "narrative-storyboard-default",
    name: "故事板",
    prompt: ama
  }, {
    id: "blocking-storyboard-default",
    name: "调度故事板",
    prompt: ima
  }, {
    id: "frame-plus-3s-default",
    name: "画面推演 - 3秒后",
    prompt: oma
  }, {
    id: "frame-minus-5s-default",
    name: "画面推演 - 5秒前",
    prompt: sma
  }],
  cma = /<\/?(?:point|bbox)\b[^>]*>/iu,
  TVn = /<(point|bbox)>([\s\S]*?)<\/\1>/gi;

function MVn(e) {
  const t = [],
    n = new RegExp(TVn.source, "gi");
  let r = 0,
    a;
  for (; (a = n.exec(e)) !== null;) a.index > r && t.push({
    type: "text",
    text: e.slice(r, a.index)
  }), t.push({
    type: "protocol",
    raw: a[0],
    kind: a[1].toLowerCase() === "bbox" ? "bbox" : "point",
    values: String(a[2] || "").trim()
  }), r = n.lastIndex;
  return r < e.length && t.push({
    type: "text",
    text: e.slice(r)
  }), t.length > 0 ? t : [{
    type: "text",
    text: e
  }];
}

function dma(e) {
  return cma.test(e);
}

function Aee(e) {
  return Math.max(0, Math.min(999, Math.round(999 * e)));
}

function GTe(e, t) {
  return t > 0 ? Math.max(0, Math.min(1, e / t)) : 0;
}

function uma(e, t, n) {
  const r = GTe(e.x, t),
    a = GTe(e.y, n);
  if (e.mode === "point" || e.width <= 0 || e.height <= 0) return `<point>${Aee(r)} ${Aee(a)}</point>`;
  const i = GTe(e.x + e.width, t),
    o = GTe(e.y + e.height, n);
  return `<bbox>${Aee(r)} ${Aee(a)} ${Aee(i)} ${Aee(o)}</bbox>`;
}

function hma(e) {
  const t = new Map(e.elements.filter(a => a.type === "marker").map(a => [a.id, a]));
  let n = "";
  for (const a of e.segments) {
    if (a.type === "text") {
      if (dma(a.text)) throw new Error("提示词不能包含 <point> / <bbox> 标签");
      n += a.text;
      continue;
    }
    const i = t.get(a.markerId);
    i && (n += uma(i, e.sourceWidth, e.sourceHeight));
  }
  if (!e.segments.some(a => a.type === "text" && a.text.trim()) && e.elements.length > 0) {
    const a = e.elements.flatMap(i => i.type === "text" && i.text.trim() ? [i.text.trim()] : []);
    return [b7t, a.length ? `图中文字说明：
${a.join(`
`)}` : "", n.trim()].filter(Boolean).join(`

`);
  }
  return n;
}

const PVn = ["#e51739", "#ffc944", "#66d675", "#3eadff", "#111111", "#ffffff"],
  Yce = "#009EFA",
  pma = PVn[0],
  RVn = 6;

function NVn(e, t, n) {
  const r = document.createElement("span");
  r.setAttribute("data-smart-edit-protocol", t), r.setAttribute("data-smart-edit-raw", e), r.contentEditable = "false", r.className = "inline-flex h-4 items-center rounded-full pr-1.5 text-[11px] font-semibold text-white align-middle", r.style.cssText = `background-color:${Yce};vertical-align:middle;cursor:pointer;user-select:none;margin:0 2px;`, r.title = "点击查看提示词";
  const a = document.createElement("span");
  a.className = "mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] leading-none text-[#009EFA]", a.textContent = String(n || (t === "bbox" ? "框" : "点"));
  const i = document.createElement("span");
  return i.textContent = `标记${n || ""}`, r.appendChild(a), r.appendChild(i), r;
}

function mma(e) {
  return e.querySelectorAll("[data-prompt-ref]").length;
}

function vnt(e, t) {
  if (!e) return !1;
  const n = YYr(t);
  return n === 0 ? !1 : mma(e) < n;
}

function fma(e, t) {
  if (!e || t.length === 0) return !1;
  for (const n of e.querySelectorAll("[data-prompt-ref]")) {
    const r = n.getAttribute("data-ref-raw") || "",
      a = v3(r);
    if (!a) continue;
    const i = t.find(u => u.position1Based === a);
    if (!i) continue;
    const o = Ahe(i.mediaType || "image", i.position1Based, i.displayLabel || i.nodeName),
      s = n.querySelector("[data-ref-pill-label]");
    if (((s == null ? void 0 : s.textContent) || "") !== o || (n.getAttribute("data-ref-thumb") || "") !== Xg(i.thumbSrc) || (n.getAttribute("data-ref-name") || "") !== (i.nodeName || "") || (n.getAttribute("data-ref-media-type") || "") !== (i.mediaType || "") || (n.getAttribute("data-ref-position") || "") !== String(i.position1Based) || !n.className.includes("max-w-[120px]")) return !0;
    const l = n.querySelector("[data-ref-pill-close]"),
      d = n.querySelector("[data-ref-pill-lead]");
    if (!l || !(d != null && d.contains(l)) || !l.className.includes("group-hover/refpill:flex")) return !0;
  }
  return !1;
}

function gma(e, t, n) {
  var a;
  let r = !1;
  for (const i of Array.from(e.querySelectorAll("[data-prompt-ref]"))) {
    const o = i.getAttribute("data-ref-raw") || "",
      s = v3(o);
    if (!s) continue;
    const l = t.find(_ => _.position1Based === s);
    if (!l) continue;
    const d = Xg(l.thumbSrc),
      u = l.nodeName || "",
      h = Ahe(l.mediaType || "image", s, l.displayLabel || l.nodeName),
      p = i.querySelector("[data-ref-pill-label]"),
      m = i.querySelector("[data-ref-pill-close]"),
      f = i.querySelector("[data-ref-pill-lead]"),
      y = !i.className.includes("max-w-[120px]") || !m || !(f != null && f.contains(m)) || !m.className.includes("group-hover/refpill:flex");
    if ((i.getAttribute("data-ref-thumb") || "") === d && (i.getAttribute("data-ref-name") || "") === u && (i.getAttribute("data-ref-media-type") || "") === (l.mediaType || "") && !y) {
      p && p.textContent !== h && (p.textContent = h, r = !0);
      continue;
    }
    const v = v7t({
      rawToken: o,
      position1Based: s,
      nodeName: l.nodeName,
      displayLabel: l.displayLabel,
      thumbSrc: l.thumbSrc,
      mediaType: l.mediaType,
      isDark: n
    });
    (a = i.parentNode) == null || a.replaceChild(v, i), r = !0;
  }
  return r;
}

function LXt(e, t) {
  const n = document.createElement("span");
  return n.className = `inline-flex h-3.5 w-3.5 items-center justify-center rounded-[3px] shrink-0 text-[8px] leading-none ${t ? "bg-zinc-700/60 text-zinc-300" : "bg-zinc-200 text-zinc-600"}`, n.textContent = e === "video" ? "▶" : e === "audio" ? "♪" : "图", n;
}

function yma(e, t) {
  const {
      thumbSrc: n,
      mediaType: r,
      isDark: a
    } = t,
    i = document.createElement("span");
  i.setAttribute("data-ref-pill-lead", "true"), i.className = "relative inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center";
  const o = document.createElement("span");
  o.setAttribute("data-ref-pill-thumb", "true"), o.className = "inline-flex h-3.5 w-3.5 items-center justify-center overflow-hidden rounded-[3px] group-hover/refpill:hidden";
  const s = n && dx(n, r) ? Xg(n) : void 0;
  if (s) {
    const d = document.createElement("img");
    d.src = s, d.alt = "", d.className = "h-3.5 w-3.5 rounded-[3px] object-cover shrink-0", d.draggable = !1, d.style.boxShadow = "0px 4px 8px rgba(0,0,0,0.16), inset 0px 0.5px 0px 0px rgba(255,255,255,0.16)";
    const u = () => {
      d.isConnected && d.replaceWith(LXt(r, a));
    };
    d.onerror = () => {
      if (Gv(d)) {
        d.onerror = () => u();
        return;
      }
      u();
    }, o.appendChild(d);
  } else o.appendChild(LXt(r, a));
  i.appendChild(o);
  const l = document.createElement("button");
  l.type = "button", l.setAttribute("data-ref-pill-close", "true"), l.title = "移除 @ 标签", l.className = `absolute inset-0 z-[2] hidden h-3.5 w-3.5 items-center justify-center group-hover/refpill:flex ${a ? "text-white" : "text-zinc-700"}`, l.innerHTML = '<svg width="10" height="10" viewBox="0 0 8 8" fill="none" aria-hidden="true"><path d="M1 1L7 7M7 1L1 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>', i.appendChild(l), e.appendChild(i);
}

function v7t(e) {
  const {
      rawToken: t,
      position1Based: n,
      thumbSrc: r,
      mediaType: a,
      isDark: i
    } = e,
    o = String(e.nodeName || "").trim(),
    s = Xg(r),
    l = document.createElement("span");
  l.setAttribute("data-prompt-ref", "true"), l.setAttribute("data-ref-raw", t), l.setAttribute("data-ref-thumb", s), l.setAttribute("data-ref-name", o), l.setAttribute("data-ref-media-type", a || "image"), l.setAttribute("data-ref-position", String(n)), l.contentEditable = "false", l.className = `group/refpill relative inline-flex h-5 min-w-[24px] max-w-[120px] items-center gap-1 rounded-[4px] p-1 align-middle text-[12px] font-medium leading-[18px] tracking-[-0.16px] ${i ? "bg-[#3a3a3a] text-[#f0f0f0]" : "bg-[#ededef] text-[#1a1a1a]"}`, l.style.cssText = "display: inline-flex; vertical-align: middle; cursor: default; user-select: none; margin: 0; box-sizing: border-box;";
  const d = Ahe(a || "image", n, e.displayLabel || o);
  yma(l, {
    thumbSrc: s,
    mediaType: a,
    isDark: i
  });
  const u = document.createElement("span");
  return u.setAttribute("data-ref-pill-label", "true"), u.className = `min-w-0 flex-1 truncate leading-[18px] ${i ? "text-[#f0f0f0]" : "text-[#1a1a1a]"}`, u.textContent = d, l.appendChild(u), l;
}

function OXt(e, t, n) {
  const r = /【([^】]+)】|(<<<video_\d+>>>)|(<<<element_\d+>>>)|(<<<image_\d+>>>)/g;
  let a = 0,
    i;
  for (; (i = r.exec(t)) !== null;) {
    if (i.index > a && e.appendChild(document.createTextNode(t.slice(a, i.index))), i[1]) e.appendChild(document.createTextNode(`【${i[1]}】`));else if (i[2]) {
      const o = document.createElement("span");
      o.setAttribute("data-video", "true"), o.contentEditable = "false", o.className = `inline-flex items-center gap-0.5 px-1 rounded text-[11px] font-medium whitespace-nowrap ${n ? "bg-purple-500/30 text-purple-300 border border-purple-500/50" : "bg-purple-100 text-purple-700 border border-purple-300"}`, o.style.cssText = "vertical-align: middle; cursor: default; user-select: none;";
      const s = document.createElement("span");
      s.textContent = i[2], o.appendChild(s), e.appendChild(o);
    } else if (i[3]) {
      const o = document.createElement("span");
      o.setAttribute("data-element", "true"), o.contentEditable = "false", o.className = `inline-flex items-center gap-0.5 px-1 rounded text-[11px] font-medium whitespace-nowrap ${n ? "bg-orange-500/30 text-orange-300 border border-orange-500/50" : "bg-orange-100 text-orange-700 border border-orange-300"}`, o.style.cssText = "vertical-align: middle; cursor: default; user-select: none;";
      const s = document.createElement("span");
      s.textContent = i[3], o.appendChild(s), e.appendChild(o);
    } else if (i[4]) {
      const o = document.createElement("span");
      o.setAttribute("data-image", "true"), o.contentEditable = "false", o.className = `inline-flex items-center gap-0.5 px-1 rounded text-[11px] font-medium whitespace-nowrap ${n ? "bg-blue-500/30 text-blue-300 border border-blue-500/50" : "bg-blue-100 text-blue-700 border border-blue-300"}`, o.style.cssText = "vertical-align: middle; cursor: default; user-select: none;";
      const s = document.createElement("span");
      s.textContent = i[4], o.appendChild(s), e.appendChild(o);
    }
    a = r.lastIndex;
  }
  a < t.length && e.appendChild(document.createTextNode(t.slice(a)));
}

function BXt(e, t, n) {
  const r = new RegExp(ET.source, "g");
  let a = 0,
    i;
  for (; (i = r.exec(t)) !== null;) {
    if (i.index > a) {
      const d = t.slice(a, i.index);
      /^[\t ]+$/.test(d) || OXt(e, d, n.isDark);
    }
    const o = i[0],
      s = v3(o),
      l = s ? n.refItems.find(d => d.position1Based === s) : void 0;
    if (s && l) {
      const d = v7t({
        rawToken: o,
        position1Based: s,
        nodeName: l.nodeName,
        displayLabel: l.displayLabel,
        thumbSrc: l.thumbSrc,
        mediaType: l.mediaType,
        isDark: n.isDark
      });
      e.appendChild(d), VX(e);
    } else e.appendChild(document.createTextNode(o));
    a = r.lastIndex;
  }
  a < t.length && OXt(e, t.slice(a), n.isDark);
}

function bma(e, t, n) {
  var i;
  const r = MVn(t);
  if (r.length === 1 && ((i = r[0]) == null ? void 0 : i.type) === "text") {
    BXt(e, r[0].text, n);
    return;
  }
  let a = e.querySelectorAll("[data-smart-edit-protocol]").length;
  for (const o of r) {
    if (o.type === "protocol") {
      a += 1, e.appendChild(NVn(o.raw, o.kind, a)), VX(e);
      continue;
    }
    o.text && BXt(e, o.text, n);
  }
}

const vma = "::lg:: ",
  wma = "::sm:: ",
  jVn = "text-node-size-lg",
  xma = "text-node-size-md",
  DVn = "text-node-size-sm",
  _ma = "text-node-hr",
  gFe = "data-prompt-md-root",
  LVn = "data-prompt-md-raw";

function FXt(e) {
  return e.trim() ? /\*\*\*[^*\n]+\*\*\*|\*\*[^*\n]+\*\*|__[^_\n]+__|\*[^*\n]+\*|~~[^~\n]+~~|`[^`\n]+`/.test(e) || /^#{1,3}\s/m.test(e) || /^::(?:sm|lg)::\s/m.test(e) || /^---+\s*$/m.test(e) || /^>\s?/m.test(e) || /^\s*[-*+•]\s+/m.test(e) || /^\s*\d+[.)]\s+/m.test(e) : !1;
}

function kma(e) {
  return e === "lg" ? jVn : e === "sm" ? DVn : xma;
}

function Ama(e) {
  return `${_ma} block w-full border-0`;
}

function wnt(e, t) {
  t && e.appendChild(document.createTextNode(t));
}

function Sma(e, t, n) {
  const r = (n == null ? void 0 : n.isDark) ?? !0,
    a = (n == null ? void 0 : n.refItems) ?? [],
    i = /(`[^`\n]+`|\*\*\*[^*\n]+\*\*\*|\*\*[^*\n]+\*\*|__[^_\n]+__|~~[^~\n]+~~|\*[^*\n]+\*|@(?:图片|视频|音频)\d+|@\d+)/g;
  let o = 0,
    s;
  for (; (s = i.exec(t)) !== null;) {
    s.index > o && wnt(e, t.slice(o, s.index));
    const l = s[0];
    if (l.startsWith("@")) {
      const d = v3(l),
        u = d ? a.find(h => h.position1Based === d) : void 0;
      if (d && u) {
        const h = v7t({
          rawToken: l,
          position1Based: d,
          nodeName: u.nodeName,
          thumbSrc: u.thumbSrc,
          mediaType: u.mediaType,
          isDark: r
        });
        e.appendChild(h), VX(e);
      } else wnt(e, l);
    } else if (l.startsWith("***")) {
      const d = document.createElement("strong"),
        u = document.createElement("em");
      u.textContent = l.slice(3, -3), d.appendChild(u), e.appendChild(d);
    } else if (l.startsWith("**") || l.startsWith("__")) {
      const d = document.createElement("strong");
      d.textContent = l.slice(2, -2), e.appendChild(d);
    } else if (l.startsWith("~~")) {
      const d = document.createElement("del");
      d.textContent = l.slice(2, -2), e.appendChild(d);
    } else if (l.startsWith("`")) {
      const d = document.createElement("code");
      d.className = "rounded bg-black/15 px-1 py-0.5 font-mono text-[0.9em]", d.textContent = l.slice(1, -1), e.appendChild(d);
    } else {
      const d = document.createElement("em");
      d.textContent = l.slice(1, -1), e.appendChild(d);
    }
    o = s.index + l.length;
  }
  o < t.length && wnt(e, t.slice(o));
}

function Ima(e, t, n) {
  const {
      isDark: r,
      refItems: a = []
    } = n,
    i = n.rawMarkdown ?? t,
    o = document.createElement("div");
  o.className = "text-node-rich-root prompt-md-rich-root", o.setAttribute(gFe, "1"), o.setAttribute(LVn, i);
  const s = t.replace(/\r\n/g, `
`).split(`
`);
  let l = 0;
  const d = (u, h) => {
    Sma(u, h, {
      isDark: r,
      refItems: a
    });
  };
  for (; l < s.length;) {
    const u = s[l],
      h = u.trim();
    if (!h) {
      l += 1;
      continue;
    }
    if (/^---+$/.test(h)) {
      const _ = document.createElement("div");
      _.className = "text-node-hr-wrap";
      const w = document.createElement("hr");
      w.className = Ama(), _.appendChild(w), o.appendChild(_), l += 1;
      continue;
    }
    const p = /^::(sm|lg)::\s*(.+)$/.exec(u);
    if (p) {
      const _ = p[1] === "lg" ? "lg" : "sm",
        w = document.createElement("p");
      w.className = `whitespace-pre-wrap ${kma(_)}`, d(w, p[2]), o.appendChild(w), l += 1;
      continue;
    }
    const m = /^(#{1,3})\s+(.+)$/.exec(u);
    if (m) {
      const _ = m[1].length,
        w = _ === 1 ? "h1" : _ === 2 ? "h2" : "h3",
        k = document.createElement(w);
      k.className = "whitespace-pre-wrap", d(k, m[2]), o.appendChild(k), l += 1;
      continue;
    }
    if (/^>\s?(.+)$/.exec(u)) {
      const _ = document.createElement("blockquote");
      for (_.className = "text-node-quote"; l < s.length;) {
        const w = /^>\s?(.+)$/.exec(s[l]);
        if (!w) break;
        const k = document.createElement("div");
        d(k, w[1]), _.appendChild(k), l += 1;
      }
      o.appendChild(_);
      continue;
    }
    if (/^\s*[-*+•]\s+(.+)$/.exec(u)) {
      const _ = document.createElement("ul");
      for (_.className = ""; l < s.length;) {
        const w = /^\s*[-*+•]\s+(.+)$/.exec(s[l]);
        if (!w) break;
        const k = document.createElement("li");
        d(k, w[1]), _.appendChild(k), l += 1;
      }
      o.appendChild(_);
      continue;
    }
    if (/^\s*\d+[.)]\s+(.+)$/.exec(u)) {
      const _ = document.createElement("ol");
      for (_.className = ""; l < s.length;) {
        const w = /^\s*\d+[.)]\s+(.+)$/.exec(s[l]);
        if (!w) break;
        const k = document.createElement("li");
        d(k, w[1]), _.appendChild(k), l += 1;
      }
      o.appendChild(_);
      continue;
    }
    const v = [];
    for (; l < s.length;) {
      const _ = s[l];
      if (!_.trim() || /^::(?:sm|lg)::\s+/.test(_) || /^(#{1,3})\s+/.test(_) || /^>\s?/.test(_) || /^\s*[-*+•]\s+/.test(_) || /^\s*\d+[.)]\s+/.test(_) || /^---+$/.test(_.trim())) break;
      v.push(_), l += 1;
    }
    if (v.length > 0) {
      const _ = document.createElement("p");
      _.className = "whitespace-pre-wrap", d(_, v.join(`
`)), o.appendChild(_);
    } else l += 1;
  }
  e.appendChild(o);
}

function _ie(e) {
  if (e.nodeType === Node.TEXT_NODE) return e.textContent || "";
  if (!(e instanceof HTMLElement)) return "";
  if (e.hasAttribute("data-prompt-ref")) return e.getAttribute("data-ref-raw") || "";
  if (e.hasAttribute("data-prompt-chip-caret")) return "";
  const t = Array.from(e.childNodes).map(_ie).join("");
  return e.tagName === "STRONG" || e.tagName === "B" ? `**${t}**` : e.tagName === "EM" || e.tagName === "I" ? `*${t}*` : e.tagName === "DEL" || e.tagName === "S" || e.tagName === "STRIKE" ? `~~${t}~~` : e.tagName === "CODE" ? `\`${t}\`` : e.tagName === "BR" ? `
` : t;
}

function Cma(e) {
  const t = _ie(e).trim(),
    n = e.tagName;
  return n === "H1" ? `# ${t}`.trimEnd() : n === "H2" ? `## ${t}`.trimEnd() : n === "H3" ? `### ${t}`.trimEnd() : e.classList.contains(jVn) ? `${vma}${t}`.trimEnd() : e.classList.contains(DVn) ? `${wma}${t}`.trimEnd() : _ie(e).trimEnd();
}

function xnt(e) {
  var a;
  const t = ((a = e.matches) != null && a.call(e, `[${gFe}]`) ? e : null) || e.querySelector(`[${gFe}]`) || e.querySelector(":scope > .text-node-rich-root") || e.querySelector(".text-node-rich-root");
  if (!t) return (e.innerText || "").replace(/\r\n/g, `
`).replace(/\u200b/g, "").trim();
  const n = t.getAttribute(LVn);
  if (n != null && t.getAttribute("data-prompt-md-dirty") !== "1") return n;
  const r = [];
  return Array.from(t.childNodes).forEach(i => {
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
      r.push(Cma(i));
      return;
    }
    if (o === "BLOCKQUOTE") {
      _ie(i).split(`
`).filter(Boolean).forEach(s => r.push(`> ${s}`));
      return;
    }
    if (o === "UL" || o === "OL") {
      Array.from(i.children).forEach((s, l) => {
        const d = o === "OL" ? `${l + 1}. ` : "- ";
        r.push(`${d}${_ie(s).trim()}`);
      });
      return;
    }
    if (o === "HR") {
      r.push("---");
      return;
    }
    r.push(_ie(i).trimEnd());
  }), r.filter(i => i.length > 0).join(`
`).replace(/\n{3,}/g, `

`).trim();
}

function Ema(e, t, n) {
  if (!FXt(t)) return !1;
  const r = t.replace(new RegExp(ET.source, "g"), "").trim();
  return FXt(r) ? (Ima(e, t, {
    isDark: n.isDark,
    refItems: n.refItems,
    rawMarkdown: t
  }), !0) : !1;
}

function zXt(e) {
  e && e.querySelectorAll(`[${gFe}]`).forEach(t => {
    t.setAttribute("data-prompt-md-dirty", "1");
  });
}

function _nt(e) {
  return e.hasAttribute("data-prompt-md-root") || e.classList.contains("text-node-rich-root") || e.classList.contains("prompt-md-rich-root");
}

function Ec(e) {
  if (e instanceof HTMLTextAreaElement || e.tagName === "TEXTAREA") return e.value || "";
  if (_nt(e) || e.childNodes.length === 1 && e.firstElementChild instanceof HTMLElement && _nt(e.firstElementChild)) return xnt(e);
  let n = "";
  return e.childNodes.forEach((r, a) => {
    if (r.nodeType === Node.TEXT_NODE) n += CVn(r.textContent || "");else if (r.nodeType === Node.ELEMENT_NODE) {
      const i = r;
      if (_nt(i)) {
        (a > 0 || n.length > 0) && (n += `
`), n += xnt(i);
        return;
      }
      if (i.hasAttribute("data-tag")) {
        const o = i.getAttribute("data-tag-content") || "";
        n += `【${o}】`;
      } else i.hasAttribute("data-video") || i.hasAttribute("data-element") ? n += i.textContent || "" : i.hasAttribute("data-magic-item") ? n += i.getAttribute("data-magic-raw") || i.textContent || "" : i.hasAttribute("data-smart-edit-protocol") ? n += i.getAttribute("data-smart-edit-raw") || i.textContent || "" : i.hasAttribute("data-prompt-ref") ? n += i.getAttribute("data-ref-raw") || "" : i.hasAttribute("data-image") ? n += i.textContent || "" : i.tagName === "BR" ? n += `
` : i.tagName === "DIV" || i.tagName === "P" || i.tagName === "H1" || i.tagName === "H2" || i.tagName === "H3" ? ((a > 0 || n.length > 0) && (n += `
`), n += Ec(i)) : i.tagName === "STRONG" || i.tagName === "B" ? n += `**${i.textContent || ""}**` : i.tagName === "EM" || i.tagName === "I" ? n += `*${i.textContent || ""}*` : i.tagName === "DEL" || i.tagName === "S" ? n += `~~${i.textContent || ""}~~` : n += i.textContent || "";
    }
  }), n;
}

function Op(e, t) {
  const n = r => r.replace(/\s+/g, " ").trim();
  return n(e) === n(t);
}

const See = "data-pending-ref-pill-upgrade",
  WX = "gen-prompt-apply-text",
  h_e = "gen-prompt-flush";

function Z7(e) {
  const t = t_(e);
  t && t.dispatchEvent(new CustomEvent(h_e));
}

function Tma(e) {
  const t = Ec(e).length,
    n = parseInt(e.dataset.cursorPos || "", 10),
    r = parseInt(e.dataset.selectionStart || "", 10),
    a = parseInt(e.dataset.selectionEnd || "", 10);
  if (!Number.isNaN(r) && !Number.isNaN(a) && a > r) return {
    start: Math.min(Math.max(0, r), t),
    end: Math.min(Math.max(0, a), t)
  };
  const i = Number.isNaN(n) ? t : Math.min(Math.max(0, n), t);
  return {
    start: i,
    end: i
  };
}

function Mma(e) {
  delete e.dataset.selectionStart, delete e.dataset.selectionEnd;
}

function w7t(e, t) {
  const n = Ec(e),
    {
      start: r,
      end: a
    } = Tma(e),
    i = n.slice(0, r) + t + n.slice(a);
  return Mma(e), {
    text: i,
    offset: r,
    cursor: r + t.length
  };
}

function t_(e) {
  if (typeof document > "u") return null;
  const t = typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e;
  return document.querySelector(`[data-node-id="${t}"][data-prompt-editor-area="true"]`);
}

function p_e(e, t) {
  const n = String(t || "").trim();
  if (!n) return;
  const r = t_(e);
  r && r.dispatchEvent(new CustomEvent(WX, {
    detail: {
      text: n,
      cursor: n.length
    }
  }));
}

function Pma(e, t, n) {
  const r = t.getAttribute("data-ref-raw") || "",
    a = String(n || "").trim();
  if (!r || !a) return null;
  const i = SVn(e, t);
  if (i === null) return null;
  const o = Ec(e);
  return {
    text: o.slice(0, i) + a + o.slice(i + r.length),
    cursor: i + a.length
  };
}

function Rma(e) {
  return e ? /\{\{magic_item:/.test(e) || /【[^】]+】/.test(e) || /<<<(?:video|element|image)_\d+>>>/.test(e) ? !0 : /@(?:图片|视频|音频)\d+|@\d+/.test(e) : !1;
}

function Nma(e, t) {
  if (e.innerHTML = "", !t) {
    e.appendChild(document.createTextNode(""));
    return;
  }
  const n = t.split(`
`);
  for (let r = 0; r < n.length; r++) {
    r > 0 && e.appendChild(document.createElement("br"));
    const a = n[r];
    a && e.appendChild(document.createTextNode(a));
  }
}

function jma(e, t, n, r) {
  const a = n.start < 0 ? r.length : n.start,
    i = n.end < 0 ? r.length : n.end,
    o = r.slice(0, a) + t + r.slice(i),
    s = a + t.length,
    l = typeof window < "u" ? window.getSelection() : null,
    d = l && l.rangeCount > 0 && e.contains(l.getRangeAt(0).commonAncestorContainer) ? l.getRangeAt(0) : null,
    u = Math.max(0, i - a);
  if (!d || t.length >= 120 || u >= 120) return Nma(e, o), {
    nextText: o,
    cursor: s
  };
  d.deleteContents();
  const h = document.createDocumentFragment(),
    p = t.split(`
`);
  let m = null;
  for (let f = 0; f < p.length; f++) f > 0 && (m = document.createElement("br"), h.appendChild(m)), p[f] && (m = document.createTextNode(p[f]), h.appendChild(m));
  if (m || (m = document.createTextNode(""), h.appendChild(m)), d.insertNode(h), l && m) {
    const f = document.createRange();
    m.nodeType === Node.TEXT_NODE ? f.setStart(m, (m.textContent || "").length) : f.setStartAfter(m), f.collapse(!0);
    try {
      m.isConnected && (l.removeAllRanges(), l.addRange(f));
    } catch {}
  }
  return {
    nextText: o,
    cursor: s
  };
}

const Dma = 5e3,
  MG = new Map();

function Lma(e, t) {
  const n = t_(e);
  return n ? {
    text: Ec(n),
    fromEditor: !0
  } : {
    text: t,
    fromEditor: !1
  };
}

function XIe({
  kind: e,
  value: t,
  onChange: n,
  isDark: r,
  scopeId: a,
  mediaCount: i = 0,
  disabled: o = !1,
  variant: s = "boxed",
  className: l = "",
  fallbackModelId: d,
  reasoningEffort: u
}) {
  const [h, p] = g.useState(!1),
    [m, f] = g.useState(!1),
    [y, b] = g.useState(null),
    v = g.useRef(null),
    _ = g.useRef(""),
    w = g.useRef(null),
    k = g.useRef(null),
    A = g.useRef(!0),
    S = g.useRef(n);
  S.current = n;
  const C = g.useRef(null),
    I = g.useRef(null),
    E = g.useCallback((F, N = !1) => {
      _.current = F, S.current(F), I.current = F;
      const G = () => {
        C.current = null;
        const z = I.current;
        I.current = null, z != null && p_e(a, z);
      };
      if (N) {
        C.current != null && (window.cancelAnimationFrame(C.current), C.current = null), G();
        return;
      }
      C.current == null && (C.current = window.requestAnimationFrame(G));
    }, [a]);
  g.useEffect(() => {
    !m || !_.current || t !== _.current && (v.current = null, _.current = "", f(!1));
  }, [t, m]), g.useEffect(() => (A.current = !0, () => {
    A.current = !1, w.current = null, C.current != null && (window.cancelAnimationFrame(C.current), C.current = null);
    const F = I.current;
    I.current = null, F != null && p_e(a, F), k.current && clearTimeout(k.current);
  }), [a]);
  const M = g.useCallback(F => {
      b(F), qi(F), k.current && clearTimeout(k.current), k.current = setTimeout(() => {
        b(null), k.current = null;
      }, Dma);
    }, []),
    T = g.useCallback(async () => {
      var z;
      if (h || o) return;
      const F = Lma(a, t),
        N = F.fromEditor || F.text.trim() ? F.text : t;
      (z = MG.get(a)) == null || z.abort();
      const G = new AbortController();
      w.current = G, MG.set(a, G), v.current = N, _.current = "", f(!1), p(!0), b(null);
      try {
        const V = await $ia({
          kind: e,
          text: N,
          mediaCount: i,
          signal: G.signal,
          modelId: d,
          reasoningEffort: u,
          onDelta: O => {
            MG.get(a) === G && E(O);
          }
        });
        if (MG.get(a) !== G) return;
        E(V, !0), A.current && f(!0);
      } catch (V) {
        if ((V == null ? void 0 : V.name) === "AbortError" || MG.get(a) !== G) return;
        v.current != null && E(v.current, !0), v.current = null, _.current = "", A.current && f(!1), M(V instanceof Error ? V.message : "优化失败，请稍后重试");
      } finally {
        MG.get(a) === G && MG.delete(a), w.current === G && (w.current = null), A.current && p(!1);
      }
    }, [E, o, d, h, e, i, u, a, M, t]),
    P = g.useCallback(() => {
      v.current && (E(v.current, !0), v.current = null, _.current = "", f(!1));
    }, [E]),
    R = y || (h ? "正在优化..." : m ? "恢复优化前内容" : "增强提示词"),
    j = `inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-0 bg-transparent shadow-none ${o || h ? r ? "cursor-not-allowed text-white/35" : "cursor-not-allowed text-zinc-400" : r ? "text-white/70 hover:bg-white/[0.06] hover:text-white" : "text-zinc-600 hover:bg-black/[0.05] hover:text-zinc-900"}`;
  return c.jsx("div", {
    className: `inline-flex shrink-0 items-center ${l}`,
    "data-prompt-enhance-control": !0,
    onMouseDown: F => F.stopPropagation(),
    children: c.jsx("button", {
      type: "button",
      disabled: o || h,
      title: R,
      "aria-label": R,
      className: s === "icon" ? "sketch-chat-toolbar-icon-btn" : j,
      onClick: F => {
        F.stopPropagation(), m && !h ? P() : T();
      },
      children: h ? c.jsx(Ua, {
        size: s === "icon" ? 16 : 14,
        className: "animate-spin"
      }) : m ? c.jsx(d_, {
        size: s === "icon" ? 16 : 14
      }) : c.jsx(SNr, {
        size: s === "icon" ? 16 : 14,
        strokeWidth: 1.75
      })
    })
  });
}

const my = 14,
  Oma = 50 * 1024 * 1024,
  UXt = 2 * 1024 * 1024,
  $Xt = 20 * 1024 * 1024,
  OVn = ["image/*,.jpg,.jpeg,.png,.gif,.webp,.bmp,video/*,.mp4,.webm,.mov,.avi,.mkv,.flv,.ogg", ...[...OKe, ...BKe, ...AIe].map(e => `.${e}`), "text/*,application/json,application/xml,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document"].join(","),
  Bma = new Set(["application/pdf", "application/vnd.ms-excel", "application/vnd.ms-excel.sheet.macroenabled.12", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.ms-powerpoint", "application/wps-office.xlsx", "application/wps-office.xls", "application/wps-office.docx", "application/vnd.oasis.opendocument.text", "application/vnd.oasis.opendocument.spreadsheet", "application/vnd.oasis.opendocument.presentation"]),
  Fma = new Set([...OKe, ...BKe]);

function BVn(e) {
  var r, a;
  const t = e.type || "";
  if (t.startsWith("text/") || t === "application/json" || t === "application/xml") return !0;
  const n = ((a = (r = e.name) == null ? void 0 : r.split(".").pop()) == null ? void 0 : a.toLowerCase()) || "";
  return Fma.has(n) || /^(Makefile|Dockerfile|LICENSE|SKILL)$/i.test(e.name || "");
}

function zma(e) {
  var r, a;
  const t = ((a = (r = e.name) == null ? void 0 : r.split(".").pop()) == null ? void 0 : a.toLowerCase()) || "";
  if (t && AIe.has(t)) return t;
  const n = (e.type || "").toLowerCase();
  return n === "application/vnd.oasis.opendocument.text" ? "odt" : n === "application/vnd.oasis.opendocument.spreadsheet" ? "ods" : n === "application/vnd.oasis.opendocument.presentation" ? "odp" : n.includes("spreadsheet") || n.includes("excel") || n.endsWith("xlsx") ? "xlsx" : n.includes("wordprocessing") || n.includes("msword") ? "docx" : n.includes("presentation") || n.includes("powerpoint") ? "pptx" : n.includes("pdf") ? "pdf" : t || "xlsx";
}

function Uma(e) {
  const t = e.name || "";
  if (t && Che(t)) return !0;
  const n = (e.type || "").toLowerCase();
  return Bma.has(n) ? !0 : n.includes("spreadsheetml") || n.includes("ms-excel");
}

function knt(e) {
  var n;
  const t = ((n = e.split("/")[1]) == null ? void 0 : n.toLowerCase()) || "";
  return t ? t === "jpeg" ? "jpg" : t.includes("+") ? t.split("+")[0] : t : "";
}

function $ma(e, t) {
  var a;
  const n = (e.name || "").trim();
  if (n && n !== "blob") return n;
  const r = e.type || "";
  if (r.startsWith("image/")) {
    const i = knt(r) || "png";
    return `image-${t}.${i}`;
  }
  if (r.startsWith("video/")) {
    const i = knt(r) || "mp4";
    return `video-${t}.${i}`;
  }
  if (BVn(e)) {
    const i = ((a = n.split(".").pop()) == null ? void 0 : a.toLowerCase()) || knt(r) || "txt";
    return n || `document-${t}.${i}`;
  }
  return n || `file-${t}`;
}

const Gma = 300 * 1024,
  FVn = 400 * 1024;

function Vma(e) {
  return e.size > 0 && e.size <= Gma && /^image\/(jpeg|jpg|webp|png)$/i.test(e.type || "");
}

async function Hma(e, t) {
  let n,
    r = "image/jpeg";
  Vma(e) ? (n = e, r = e.type || "image/jpeg") : (n = await nRt(e), r = "image/jpeg");
  const a = await Rhe(n, {
    name: e.name,
    type: r,
    isVideo: !1
  }, t);
  if (!a) return null;
  let i = await TIe(a),
    o,
    s;
  if (ua()) try {
    const {
        uploadBlobUrlToGlobalMaterialImage: l
      } = await Ie(async () => {
        const {
          uploadBlobUrlToGlobalMaterialImage: h
        } = await Promise.resolve().then(() => ii);
        return {
          uploadBlobUrlToGlobalMaterialImage: h
        };
      }, void 0, import.meta.url),
      d = String(e.name || "chat").replace(/[^\w\u4e00-\u9fff.-]+/g, "_").slice(0, 60) || "chat",
      u = URL.createObjectURL(n);
    try {
      const h = await l(u, /\.(png|jpe?g|webp|gif)$/i.test(d) ? d : `${d}.png`);
      h != null && h.displayUrl && nr(h.displayUrl) && (o = h.displayUrl, i = h.displayUrl), (h != null && h.remoteUrl && gx(h.remoteUrl) || h != null && h.remoteUrl && nr(h.remoteUrl) && !/\/thumbnails\//i.test(h.remoteUrl)) && (s = h.remoteUrl), !i && (h != null && h.remoteUrl) && (i = h.remoteUrl);
    } finally {
      URL.revokeObjectURL(u);
    }
  } catch (l) {
    console.warn("[Chat] OSS 附件上传失败，回退本地 preview:", l);
  }
  return {
    assetId: a,
    preview: i,
    type: r,
    ossDisplayUrl: o,
    ossRemoteUrl: s
  };
}

const Wma = new Set(["jpg", "jpeg", "png", "gif", "webp", "bmp"]),
  qma = new Set(["mp4", "webm", "mov", "avi", "mkv", "flv", "ogg", "m4v"]);

function Kma(e) {
  var r, a;
  const t = e.type || "";
  if (t.startsWith("image/")) return "image";
  if (t.startsWith("video/")) return "video";
  const n = ((a = (r = e.name) == null ? void 0 : r.split(".").pop()) == null ? void 0 : a.toLowerCase()) || "";
  return Wma.has(n) ? "image" : qma.has(n) ? "video" : "other";
}

async function Qma(e, t) {
  const n = await Rhe(e, {
    name: e.name,
    type: e.type || "video/mp4",
    isVideo: !0
  }, t);
  if (!n) return null;
  let r = await TIe(n, {
      allowVideoPlayableFallback: !0
    }),
    a,
    i;
  if (ua()) try {
    const {
        uploadGlobalMaterialVideo: o
      } = await Ie(async () => {
        const {
          uploadGlobalMaterialVideo: u
        } = await Promise.resolve().then(() => ii);
        return {
          uploadGlobalMaterialVideo: u
        };
      }, void 0, import.meta.url),
      s = await o(e),
      l = String((s == null ? void 0 : s.remoteUrl) || "").trim(),
      d = String((s == null ? void 0 : s.posterUrl) || (s == null ? void 0 : s.displayUrl) || "").trim();
    l && nr(l) && (i = l), d && nr(d) && !/\/videos\//i.test(d) && (a = d, r = d);
  } catch (o) {
    console.warn("[Chat] OSS 视频附件上传失败，回退本地 preview:", o);
  }
  return {
    assetId: n,
    preview: r,
    ossDisplayUrl: a,
    ossRemoteUrl: i
  };
}

async function Yma(e) {
  try {
    if (e.size > 0 && e.size <= FVn) return URL.createObjectURL(e);
    const t = await i_(e, 256, .72);
    return t != null && t.size ? URL.createObjectURL(t) : null;
  } catch {
    return null;
  }
}

function Xma(e) {
  if (e[0] === 255 && e[1] === 254) return new TextDecoder("utf-16le").decode(e);
  if (e[0] === 254 && e[1] === 255) return new TextDecoder("utf-16be").decode(e);
  try {
    return new TextDecoder("utf-8", {
      fatal: !0
    }).decode(e);
  } catch {
    return new TextDecoder("gb18030", {
      fatal: !0
    }).decode(e);
  }
}

async function uNe(e, t, n, r) {
  var s, l;
  const a = (r == null ? void 0 : r.sourceLabel) ?? "上传";
  let i = Math.max(0, my - t);
  if (i <= 0) {
    alert(x("最多只能上传{0}个文件，当前已有{1}个", my, t));
    return;
  }
  let o = t;
  for (const d of e) {
    if (i <= 0) {
      alert(x("最多只能上传{0}个文件，已忽略多余的{1}项", my, a));
      break;
    }
    const u = Kma(d),
      h = u === "image",
      p = u === "video";
    if (p && d.size > Oma) {
      alert(x("视频文件 {0} 体积为 {1}MB，已超过 50MB 限制，请先压缩或裁剪后再上传。", d.name, (d.size / 1024 / 1024).toFixed(1)));
      continue;
    }
    let m;
    try {
      o += 1;
      const f = $ma(d, o);
      if (h) {
        const y = `pending_img_${Fi()}`;
        m = y;
        const b = d.size > 0 && d.size <= FVn ? await Yma(d) : null;
        n(_ => {
          if (_.length >= my) {
            if (b) try {
              URL.revokeObjectURL(b);
            } catch {}
            return _;
          }
          return [..._, {
            name: f,
            displayName: f,
            isImage: !0,
            isVideo: !1,
            preview: b || void 0,
            _ephemeralPreview: !!b,
            _pendingToken: y,
            _pendingEncode: !b,
            type: d.type || "image/jpeg"
          }];
        }), b || (await UK());
        const v = await Hma(d, o);
        if (!v) {
          n(_ => {
            const w = _.find(k => k._pendingToken === y);
            return KN(w), _.filter(k => k._pendingToken !== y);
          }), alert(x("图片 {0} 本地缓存失败，请检查缓存目录后重试。", d.name));
          continue;
        }
        n(_ => {
          var I;
          const w = _.findIndex(E => E._pendingToken === y),
            k = String(v.preview || "").trim(),
            A = (v.ossDisplayUrl && nr(v.ossDisplayUrl) ? v.ossDisplayUrl : void 0) || (k && nr(k) ? k : void 0),
            S = v.ossRemoteUrl && nr(v.ossRemoteUrl) ? v.ossRemoteUrl : void 0,
            C = {
              name: f,
              displayName: f,
              _assetId: v.assetId,
              isImage: !0,
              isVideo: !1,
              preview: A || k || void 0,
              url: S || A,
              _ossRemoteUrl: S,
              type: v.type || "image/jpeg"
            };
          if (w >= 0) {
            const E = _[w];
            k && KN(E);
            const M = [..._];
            return M[w] = k ? C : {
              ...C,
              preview: E.preview,
              _ephemeralPreview: !!(E._ephemeralPreview || (I = E.preview) != null && I.startsWith("blob:"))
            }, M;
          }
          return _;
        }), i--;
        continue;
      }
      if (p) {
        const y = `pending_vid_${Fi()}`;
        m = y;
        let b = null;
        try {
          b = URL.createObjectURL(d);
        } catch {
          b = null;
        }
        n(_ => {
          if (_.length >= my) {
            if (b) try {
              URL.revokeObjectURL(b);
            } catch {}
            return _;
          }
          return [..._, {
            name: f,
            displayName: f,
            isImage: !1,
            isVideo: !0,
            preview: b || void 0,
            _ephemeralPreview: !!b,
            _pendingToken: y,
            _pendingEncode: !b,
            type: d.type || "video/mp4"
          }];
        });
        const v = await Qma(d, o);
        if (!v) {
          n(_ => {
            const w = _.find(k => k._pendingToken === y);
            return KN(w), _.filter(k => k._pendingToken !== y);
          }), alert(x("视频 {0} 本地缓存失败，请检查缓存目录后重试。", d.name));
          continue;
        }
        n(_ => {
          var I;
          const w = _.findIndex(E => E._pendingToken === y),
            k = String(v.preview || "").trim(),
            A = v.ossRemoteUrl && nr(v.ossRemoteUrl) ? v.ossRemoteUrl : void 0,
            S = v.ossDisplayUrl && nr(v.ossDisplayUrl) ? v.ossDisplayUrl : void 0,
            C = {
              name: f,
              displayName: f,
              _assetId: v.assetId,
              isImage: !1,
              isVideo: !0,
              preview: S || k || void 0,
              url: A,
              _ossRemoteUrl: A,
              type: d.type || "video/mp4"
            };
          if (w >= 0) {
            const E = _[w];
            k && KN(E);
            const M = [..._];
            return M[w] = k ? C : {
              ...C,
              preview: E.preview,
              _ephemeralPreview: !!(E._ephemeralPreview || (I = E.preview) != null && I.startsWith("blob:"))
            }, M;
          }
          return _;
        }), i--;
        continue;
      }
      if (Uma(d)) {
        if (d.size > $Xt) {
          alert(x("文档 {0} 体积为 {1}MB，已超过 {2}MB 限制，请换成更小的文件。", d.name, (d.size / 1024 / 1024).toFixed(1), $Xt / 1024 / 1024));
          continue;
        }
        const y = zma(d),
          b = (d.name || "").trim() && d.name !== "blob" ? d.name : `document-${o}.${y}`,
          v = new Uint8Array(await d.arrayBuffer()),
          _ = await A9t(b, v);
        if (!String(_ || "").trim()) {
          alert(x("无法从「{0}」抽出可用文字，请检查文档内容或转换为受支持的格式。", b));
          continue;
        }
        const w = `chat_document_${Fi()}`;
        await lYe(w, d), n(k => k.length >= my ? k : [...k, {
          ...d,
          name: b,
          size: d.size,
          _documentAssetId: w,
          displayName: b,
          content: _,
          isImage: !1,
          isVideo: !1,
          isText: !0,
          isExcel: ["xlsx", "xlsm", "xls", "xlsb", "xltx", "xltm", "et", "ett", "ods"].includes(y),
          isPDF: y === "pdf",
          isDoc: ["docx", "docm", "dotx", "dotm", "doc", "odt", "wps", "wpt", "wpx"].includes(y),
          fileExt: y,
          type: d.type || `application/${y}`
        }]), i--;
        continue;
      }
      if (BVn(d)) {
        if (d.size > UXt) {
          alert(x("文本文件 {0} 体积为 {1}MB，已超过 {2}MB 限制，请截取后重试。", d.name, (d.size / 1024 / 1024).toFixed(1), UXt / 1024 / 1024));
          continue;
        }
        const y = Xma(new Uint8Array(await d.arrayBuffer())),
          b = ((l = (s = d.name) == null ? void 0 : s.split(".").pop()) == null ? void 0 : l.toLowerCase()) || "";
        n(v => v.length >= my ? v : [...v, {
          name: d.name || f,
          type: d.type || "text/plain",
          size: d.size,
          displayName: f,
          content: y,
          isImage: !1,
          isVideo: !1,
          isText: !0,
          fileExt: b
        }]), i--;
        continue;
      }
      r != null && r.warnUnsupported && alert(x("无法从{0}添加「{1}」，请用下方「图片」或「文档」按钮选择支持的文件。", a, d.name || d.type || "未知类型"));
    } catch (f) {
      console.error("[ChatPanel] 文件处理失败:", f), m && n(y => {
        const b = y.find(v => v._pendingToken === m);
        return KN(b), y.filter(v => v._pendingToken !== m);
      }), alert(x("文件 {0} 处理失败：{1}", d.name, f instanceof Error ? f.message : "请重试"));
    }
  }
}

function Jma(e, t) {
  const n = String(t || "").trim();
  if (!n) return e;
  const r = String(e || "").trim();
  return r ? `${r} ${n}` : n;
}

function Zma(e, t = "") {
  const n = t_(e);
  return n && Ec(n) || t;
}

function efa(e, t, n, r) {
  if (!String(t || "").trim()) return n;
  const a = Jma(Zma(e, n), t);
  r(a);
  const i = t_(e);
  return i && i.dispatchEvent(new CustomEvent(WX, {
    detail: {
      text: a,
      cursor: a.length
    }
  })), a;
}

const GXt = [{
  audio: !0
}, {
  audio: {
    echoCancellation: !0,
    noiseSuppression: !0
  }
}, {
  audio: {
    deviceId: "default"
  }
}];

function tfa(e) {
  if (e && typeof e == "object") {
    const t = String(e.name || ""),
      n = String(e.message || e);
    return {
      name: t,
      message: n
    };
  }
  return {
    name: "",
    message: String(e || "")
  };
}

function zVn(e) {
  const {
      name: t,
      message: n
    } = tfa(e),
    r = `${t} ${n}`.toLowerCase();
  return t === "NotAllowedError" || /permission|notallowed|denied|dismissed/.test(r) ? "麦克风权限被拒绝。请在系统设置里允许本应用使用麦克风后再试。" : t === "NotFoundError" || /notfound|not found|requested device/.test(r) ? "找不到可用麦克风。请确认已接入麦克风，并在 Windows「设置 → 隐私和安全性 → 麦克风」里打开「允许桌面应用访问麦克风」。" : t === "NotReadableError" || /notreadable|in use|占用/.test(r) ? "麦克风正被其他程序占用，请关闭后再试。" : t === "SecurityError" || /secure context|insecure/.test(r) ? "当前页面无法访问麦克风，请重启应用后再试。" : t === "OverconstrainedError" ? "当前麦克风不满足录音要求，请换一个输入设备。" : /unavailable|undefined is not/.test(r) ? "当前环境无法使用麦克风，请检查系统权限后重启应用。" : n && !/^requested device/i.test(n) ? n : "无法开始录音，请检查麦克风后重试。";
}

async function nfa() {
  var e;
  if (!((e = navigator.mediaDevices) != null && e.enumerateDevices)) return [];
  try {
    return (await navigator.mediaDevices.enumerateDevices()).filter(n => n.kind === "audioinput");
  } catch {
    return [];
  }
}

async function rfa() {
  var i, o, s;
  const e = (o = (i = navigator.mediaDevices) == null ? void 0 : i.getUserMedia) == null ? void 0 : o.bind(navigator.mediaDevices);
  if (!e) throw new Error("当前环境无法使用麦克风，请检查系统权限");
  const n = (s = (await nfa()).find(l => l.deviceId && l.deviceId !== "default")) == null ? void 0 : s.deviceId,
    r = n ? [{
      audio: {
        deviceId: {
          exact: n
        }
      }
    }, ...GXt] : GXt;
  let a = null;
  for (const l of r) try {
    return await e(l);
  } catch (d) {
    a = d;
  }
  throw new Error(zVn(a));
}

function afa() {
  if (typeof window > "u") return null;
  const e = window;
  return e.SpeechRecognition || e.webkitSpeechRecognition || null;
}

function ifa(e) {
  var r;
  if (!e || typeof e != "object") return "";
  const t = e,
    n = t.text ?? ((r = t.data) == null ? void 0 : r.text);
  return typeof n == "string" ? n.trim() : "";
}

async function ofa(e, t) {
  var h;
  const n = Lhe(),
    r = AQe().find(p => p.id === n);
  if (!r) throw new Error("请先在设置里配置 Chat 模型，再使用语音输入");
  const a = (Qa.getResolvedModelBaseUrl(r.id) || r.url || Qa.getGlobalBaseUrl()).replace(/\/+$/, ""),
    i = cu(r.key, Qa.getGlobalApiKey(), void 0, {
      modelId: r.id,
      modelName: r.modelName,
      baseUrl: a,
      modelSavedApiKeyId: r.savedApiKeyId
    });
  if (!i) throw new Error("请先在模型接口配置里填写 API Key");
  const o = new FormData();
  o.append("file", e), o.append("model", "whisper-1"), o.append("response_format", "json"), o.append("language", "zh");
  const s = await $i(`${a}/v1/audio/transcriptions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${i}`
      },
      body: o,
      signal: t
    }),
    l = await s.text();
  let d = l;
  try {
    d = l ? JSON.parse(l) : null;
  } catch {
    d = {
      text: l
    };
  }
  if (!s.ok) {
    const p = d && typeof d == "object" ? ((h = d.error) == null ? void 0 : h.message) || d.message : "";
    throw new Error(p || `语音识别失败（${s.status}）`);
  }
  const u = ifa(d);
  if (!u) throw new Error("没有识别到有效语音");
  return u;
}

function sfa() {
  const e = afa();
  if (!e) return null;
  const t = new e();
  t.lang = "zh-CN", t.continuous = !0, t.interimResults = !0;
  let n = "",
    r = !1,
    a = null;
  t.onresult = i => {
    var s;
    let o = "";
    for (let l = i.resultIndex; l < i.results.length; l += 1) {
      const d = i.results[l],
        u = ((s = d == null ? void 0 : d[0]) == null ? void 0 : s.transcript) || "";
      u && (d.isFinal ? n = `${n} ${u}`.trim() : o = u);
    }
    o && (n = n || o);
  }, t.onerror = () => {
    r || (r = !0, a == null || a(n.trim()));
  }, t.onend = () => {
    r || (r = !0, a == null || a(n.trim()));
  };
  try {
    t.start();
  } catch {
    return null;
  }
  return {
    stop: () => new Promise(i => {
      if (r) {
        i(n.trim());
        return;
      }
      a = i;
      try {
        t.stop();
      } catch {
        r = !0, i(n.trim());
      }
    }),
    cancel: () => {
      r = !0, a = null;
      try {
        t.abort();
      } catch {}
    }
  };
}

async function lfa(e, t, n) {
  const r = String(t || "").trim();
  return r || ofa(e, n);
}

const x7t = {
    status: "idle",
    volume: 0,
    analyserNode: null
  },
  vQ = new Map(),
  hNe = new Map(),
  cfa = new Set();

function UVn(e) {
  var t;
  e && ((t = hNe.get(e)) == null || t.forEach(n => n())), cfa.forEach(n => n());
}

function $Vn(e) {
  return vQ.get(e) || x7t;
}

function yFe(e) {
  return $Vn(e).status;
}

function GVn() {
  for (const [e, t] of vQ) if (t.status !== "idle") return e;
  return null;
}

function VVn(e, t) {
  const n = vQ.get(e) || x7t,
    r = {
      status: t.status ?? n.status,
      volume: t.volume ?? n.volume,
      analyserNode: t.analyserNode === void 0 ? n.analyserNode : t.analyserNode
    };
  r.status === n.status && r.volume === n.volume && r.analyserNode === n.analyserNode || (r.status === "idle" && r.volume === 0 && !r.analyserNode ? vQ.delete(e) : vQ.set(e, r), UVn(e));
}

function bFe(e) {
  vQ.has(e) && (vQ.delete(e), UVn(e));
}

function dfa(e, t) {
  let n = hNe.get(e);
  return n || (n = new Set(), hNe.set(e, n)), n.add(t), () => {
    n == null || n.delete(t), n && n.size === 0 && hNe.delete(e);
  };
}

function _7t(e) {
  return g.useSyncExternalStore(t => dfa(e, t), () => $Vn(e), () => x7t);
}

const ufa = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/mpeg", "audio/wav"],
  hfa = {
    "audio/webm": "webm",
    "audio/mp4": "mp4",
    "audio/mpeg": "mp3",
    "audio/mp3": "mp3",
    "audio/wav": "wav",
    "audio/x-m4a": "m4a"
  },
  wQ = new Map();

let ej = null,
  pNe = !1,
  Gyt = 0,
  GF = null,
  mNe = null,
  _7 = null,
  m_e = [],
  Vyt = "audio/webm",
  bre = null,
  tE = null;

function pfa() {
  if (typeof MediaRecorder > "u") throw new Error("当前环境不支持录音");
  const e = ufa.find(t => MediaRecorder.isTypeSupported(t));
  if (!e) throw new Error("当前环境不支持录音");
  return e;
}

function k7t(e) {
  try {
    const t = window.AudioContext || window.webkitAudioContext;
    if (!t) return;
    const n = new t(),
      r = n.createOscillator(),
      a = n.createGain();
    r.type = "sine", r.frequency.value = e === "on" ? 880 : 520, a.gain.value = .045, r.connect(a), a.connect(n.destination), r.start(), r.stop(n.currentTime + .07), r.onended = () => {
      n.close();
    };
  } catch {}
}

function vFe() {
  GF == null || GF.getTracks().forEach(e => e.stop()), GF = null, mNe && (mNe.close(), mNe = null), _7 = null, m_e = [];
}

function Hyt(e, t) {
  var n, r;
  (r = (n = wQ.get(e)) == null ? void 0 : n.onError) == null || r.call(n, t);
}

function mfa(e, t) {
  return wQ.set(e, t), () => {
    wQ.get(e) === t && wQ.delete(e);
  };
}

function wFe(e) {
  ffa(e);
}

async function ffa(e) {
  const t = GVn();
  if (t && t !== e && fNe(t), yFe(e) !== "idle" || pNe) return;
  if (!wQ.has(e)) {
    qi("请先打开该节点的提示词栏再使用语音输入");
    return;
  }
  pNe = !0;
  const n = Gyt;
  try {
    const r = await rfa();
    if (n !== Gyt || yFe(e) !== "idle" || !wQ.has(e)) {
      r.getTracks().forEach(s => s.stop());
      return;
    }
    GF = r;
    const a = new AudioContext(),
      i = a.createAnalyser();
    i.fftSize = 256, i.minDecibels = -90, i.maxDecibels = -10, i.smoothingTimeConstant = .6, a.createMediaStreamSource(r).connect(i), mNe = a, Vyt = pfa();
    const o = new MediaRecorder(r, {
      mimeType: Vyt
    });
    _7 = o, m_e = [], o.ondataavailable = s => {
      s.data.size > 0 && m_e.push(s.data);
    }, o.onerror = () => {
      vFe(), bFe(e), ej = null, Hyt(e, new Error("录音出错，请重试"));
    }, o.start(100), tE = sfa(), k7t("on"), ej = e, VVn(e, {
      status: "recording",
      analyserNode: i
    });
  } catch (r) {
    vFe(), tE == null || tE.cancel(), tE = null, bFe(e), ej = null, Hyt(e, new Error(zVn(r)));
  } finally {
    pNe = !1;
  }
}

function Wyt(e = ej) {
  if (!e || !_7 || _7.state === "inactive") return;
  const t = _7;
  VVn(e, {
    status: "processing",
    analyserNode: null,
    volume: 0
  });
  const n = new AbortController();
  bre = n;
  const r = tE;
  tE = null, t.onstop = async () => {
    var a;
    try {
      if (n.signal.aborted || m_e.length === 0) return;
      const i = (await (r == null ? void 0 : r.stop())) || "";
      if (n.signal.aborted) return;
      const o = Vyt.split(";")[0],
        s = hfa[o] ?? "webm",
        l = new Blob(m_e, {
          type: o
        }),
        d = new File([l], `voice-input-${Date.now()}.${s}`, {
          type: o
        }),
        u = await lfa(d, i, n.signal);
      if (n.signal.aborted) return;
      u.trim() && ((a = wQ.get(e)) == null || a.onResult(u.trim()));
    } catch (i) {
      n.signal.aborted || Hyt(e, i instanceof Error ? i : new Error("语音识别失败"));
    } finally {
      n.signal.aborted || (vFe(), bFe(e), ej === e && (ej = null)), bre = null;
    }
  }, k7t("off"), t.stop(), GF == null || GF.getTracks().forEach(a => a.stop());
}

function fNe(e = ej) {
  Gyt += 1, pNe = !1, bre == null || bre.abort(), bre = null, tE == null || tE.cancel(), tE = null, _7 && _7.state !== "inactive" && (_7.onstop = null, _7.stop()), k7t("off"), vFe(), e && bFe(e), ej === e && (ej = null);
}

const vre = 20,
  gfa = Array.from({
    length: vre
  }, (e, t) => {
    const n = t / (vre - 1) * Math.PI,
      r = Math.sin(n);
    return .1 + .9 * r * r;
  }),
  yfa = g.memo(function ({
    analyserNode: t,
    className: n
  }) {
    const r = g.useRef([]),
      a = g.useRef(0),
      i = g.useRef(t);
    i.current = t;
    const o = g.useRef(null);
    return g.useEffect(() => {
      t ? (t.minDecibels = -90, t.maxDecibels = -10, t.smoothingTimeConstant = .6, o.current = new Uint8Array(new ArrayBuffer(t.frequencyBinCount))) : o.current = null;
    }, [t]), g.useEffect(() => {
      const s = () => {
        const l = i.current,
          d = o.current,
          u = !!(l && d);
        u && l.getByteFrequencyData(d);
        for (let h = 0; h < vre; h += 1) {
          const p = r.current[h];
          if (!p) continue;
          let m;
          if (u) {
            const f = Math.ceil(d.length / 3),
              y = Math.floor(h / vre * f),
              b = Math.floor((h + 1) / vre * f);
            let v = 0;
            for (let _ = y; _ < b; _ += 1) v += d[_];
            m = Math.pow(v / Math.max(1, b - y) / 255, .3);
          } else m = Math.sin(Date.now() / 150 + h * .8) * .5 + .5;
          p.style.height = `${2 + gfa[h] * m * 20}px`;
        }
        a.current = requestAnimationFrame(s);
      };
      return a.current = requestAnimationFrame(s), () => cancelAnimationFrame(a.current);
    }, []), c.jsx("div", {
      className: `voice-waveform ${n ?? ""}`,
      "aria-hidden": !0,
      children: Array.from({
        length: vre
      }).map((s, l) => c.jsx("div", {
        ref: d => {
          r.current[l] = d;
        },
        className: "voice-waveform__bar"
      }, l))
    });
  }),
  JIe = g.memo(function ({
    nodeId: t,
    value: n,
    onChange: r,
    isDark: a,
    disabled: i = !1,
    className: o = ""
  }) {
    on();
    const s = _7t(t),
      l = s.status !== "idle",
      d = g.useRef(n);
    d.current = n;
    const u = g.useRef(r);
    u.current = r;
    const h = g.useCallback(f => {
        efa(t, f, d.current, u.current);
      }, [t]),
      p = g.useCallback(f => {
        qi(f.message || "语音输入失败");
      }, []);
    g.useEffect(() => mfa(t, {
      onResult: h,
      onError: p
    }), [p, h, t]), g.useEffect(() => () => {
      yFe(t) !== "idle" && fNe(t);
    }, [t]), g.useEffect(() => {
      if (!l) return;
      const f = y => {
        if (y.key === "Escape") {
          y.stopPropagation(), y.preventDefault(), fNe(t);
          return;
        }
        y.key.toLowerCase() === "v" && !y.ctrlKey && !y.metaKey && !y.altKey && s.status === "recording" && (y.stopPropagation(), y.preventDefault(), Wyt(t));
      };
      return document.addEventListener("keydown", f, !0), () => document.removeEventListener("keydown", f, !0);
    }, [l, t, s.status]);
    const m = `inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-0 bg-transparent shadow-none ${i ? a ? "cursor-not-allowed text-white/35" : "cursor-not-allowed text-zinc-400" : a ? "text-white/70 hover:bg-white/[0.06] hover:text-white" : "text-zinc-600 hover:bg-black/[0.05] hover:text-zinc-900"}`;
    return c.jsxs("div", {
      className: `voice-input-control ${o}`,
      "data-expanded": l ? "true" : "false",
      "data-divider": "true",
      "data-voice-input-control": !0,
      onMouseDown: f => f.stopPropagation(),
      children: [c.jsx("button", {
        type: "button",
        title: l ? void 0 : x("语音输入"),
        "aria-label": x("语音输入"),
        disabled: i || l,
        className: `${m} ${l ? "pointer-events-none opacity-0" : ""}`,
        onClick: f => {
          f.stopPropagation(), !(i || l) && wFe(t);
        },
        children: c.jsx(cTn, {
          size: 14
        })
      }), s.status === "recording" ? c.jsxs(c.Fragment, {
        children: [c.jsx(yfa, {
          analyserNode: s.analyserNode,
          className: "mx-1"
        }), c.jsx("button", {
          type: "button",
          title: x("完成语音输入"),
          className: "voice-input-action",
          onClick: f => {
            f.stopPropagation(), Wyt(t);
          },
          children: x("完成")
        })]
      }) : null, s.status === "processing" ? c.jsxs(c.Fragment, {
        children: [c.jsx(Ua, {
          size: 14,
          className: "voice-input-spinner"
        }), c.jsx("span", {
          className: "voice-input-breathing px-1 text-[11px] whitespace-nowrap opacity-80",
          children: x("识别中")
        })]
      }) : null, l ? c.jsx("button", {
        type: "button",
        title: x("取消"),
        className: "voice-input-action opacity-70",
        onClick: f => {
          f.stopPropagation(), fNe(t);
        },
        children: x("取消")
      }) : null]
    });
  });

function $Z(e) {
  if (!e || !("tagName" in e)) return !1;
  const t = e;
  return t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable;
}

function bfa(e) {
  return $Z(e.target) || !(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== "z" || e.defaultPrevented ? null : e.shiftKey ? "redo" : "undo";
}

function gNe(e) {
  e.preventDefault(), e.stopPropagation();
}

const vfa = 400;

function wfa(e) {
  return e === "text-node" || e === "gen-image" || e === "gen-video";
}

function HVn(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.repeat || e.isComposing ? !1 : e.key.toLowerCase() === "v";
}

function xfa(e) {
  return !(!HVn(e) || $Z(e.target));
}

function VXt(e) {
  return HVn(e);
}

function WVn({
  value: e,
  onChange: t,
  isDark: n = !1,
  className: r = "shrink-0",
  skillId: a,
  showCanvasAccess: i = !0,
  coding: o = !1
}) {
  on();
  const [s, l] = g.useState(!1),
    [d, u] = g.useState(() => U2e(a)),
    h = g.useRef(null);
  g.useEffect(() => {
    u(U2e(a));
  }, [a, s]), g.useEffect(() => {
    if (!s) return;
    const m = f => {
      var b;
      const y = f.target;
      y && ((b = h.current) != null && b.contains(y) || y.closest("[data-local-skill-permission-panel]") || l(!1));
    };
    return document.addEventListener("mousedown", m, !0), () => document.removeEventListener("mousedown", m, !0);
  }, [s]);
  const p = Htt.find(m => m.value === e) || Htt[0];
  return c.jsxs("div", {
    className: `relative overflow-visible ${r}`,
    "data-local-skill-permission": !0,
    children: [c.jsxs("button", {
      ref: h,
      type: "button",
      title: x(o ? k0t[e] : p.description),
      "aria-haspopup": "menu",
      "aria-expanded": s,
      onClick: m => {
        m.preventDefault(), m.stopPropagation(), l(f => !f);
      },
      className: `node-dropdown-button sketch-chat-local-skill-perm-trigger flex items-center gap-1 px-1.5 text-xs outline-none ${n ? "text-zinc-200" : "text-zinc-700"} ${e === "full" ? "is-warn" : ""} ${s ? "node-dropdown-button--open" : ""}`,
      children: [e === "full" ? c.jsx(RLe, {
        size: 14
      }) : e === "assist" ? c.jsx(ymt, {
        size: 14
      }) : c.jsx(Zle, {
        size: 14
      }), c.jsx("span", {
        className: "truncate",
        children: x(p.title)
      }), c.jsx(Mi, {
        size: 12,
        className: `shrink-0 opacity-60 transition-transform ${s ? "rotate-180" : ""}`
      })]
    }), c.jsxs(yg, {
      open: s,
      anchorRef: h,
      isDark: n,
      placement: "above",
      align: "left",
      gap: 4,
      unstyled: !0,
      zIndex: 10200,
      dataPortalAttr: "data-local-skill-permission-panel",
      className: `sketch-chat-local-skill-perm-panel ${n ? "is-dark" : ""}`,
      children: [Htt.map(m => {
        const f = m.value === e,
          y = m.value === "full" ? RLe : m.value === "assist" ? ymt : Zle;
        return c.jsxs("button", {
          type: "button",
          title: x(o ? k0t[m.value] : m.description),
          className: `sketch-chat-local-skill-perm-option ${f ? "is-selected" : ""} ${m.tone === "warn" ? "is-warn" : ""}`,
          onClick: () => {
            m.value === "full" && e !== "full" && !window.confirm(x(o ? "完全访问将允许 Agent 读写文件并以当前用户权限执行命令。命令不受工作区路径限制。确定开启？" : "完全访问将允许 Agent 读写本机用户目录（文档 / 下载 / 桌面 / 图片等）。确定开启？")) || (t(m.value), l(!1));
          },
          children: [c.jsx(y, {
            size: 14,
            className: "sketch-chat-local-skill-perm-icon"
          }), c.jsx("span", {
            className: "sketch-chat-local-skill-perm-title min-w-0 flex-1",
            children: x(m.title)
          }), f ? c.jsx(io, {
            size: 14,
            className: "sketch-chat-local-skill-perm-check"
          }) : null]
        }, m.value);
      }), i ? c.jsx("div", {
        className: "sketch-chat-local-skill-perm-label",
        children: x("Skill 调画布")
      }) : null, i ? CRt.map(m => {
        const f = m.value === d;
        return c.jsxs("button", {
          type: "button",
          title: x(m.description),
          className: `sketch-chat-local-skill-perm-option ${f ? "is-selected" : ""} ${m.value === "allow" ? "is-warn" : ""}`,
          onClick: () => {
            m.value === "allow" && d !== "allow" && !window.confirm(x("允许后，此 Skill 可在当前画布权限下改节点、连线或提交生成。高风险删除仍会询问。确定开启？")) || (a ? Nzn(a, {
              canvasAccess: m.value
            }) : pQe({
              skillCanvasAccess: m.value
            }), u(m.value), l(!1));
          },
          children: [c.jsx("span", {
            className: "sketch-chat-local-skill-perm-title min-w-0 flex-1",
            children: x(m.title)
          }), f ? c.jsx(io, {
            size: 14,
            className: "sketch-chat-local-skill-perm-check"
          }) : null]
        }, `canvas-${m.value}`);
      }) : null]
    })]
  });
}

function _fa({
  value: e,
  onChange: t,
  isDark: n = !1,
  disabled: r = !1,
  labelLimit: a
}) {
  on();
  const [i, o] = g.useState(!1),
    [s, l] = g.useState(0),
    d = g.useRef(null),
    u = g.useMemo(() => jce(), [s]),
    h = u.find(f => f.id === e) || u[0],
    p = h ? h.builtin ? x(h.title) : h.title : x("标准模式"),
    m = h ? h.builtin ? x(h.description) : h.description : x("会话预设");
  return g.useEffect(() => {
    const f = () => l(y => y + 1);
    return window.addEventListener(iI, f), () => window.removeEventListener(iI, f);
  }, []), g.useEffect(() => {
    if (!i) return;
    const f = y => {
      var v;
      const b = y.target;
      !b || (v = d.current) != null && v.contains(b) || b.closest("[data-session-harness-preset]") || o(!1);
    };
    return document.addEventListener("mousedown", f, !0), () => document.removeEventListener("mousedown", f, !0);
  }, [i]), c.jsxs("div", {
    className: "relative shrink-0 overflow-visible",
    children: [c.jsxs("button", {
      ref: d,
      disabled: r,
      type: "button",
      title: `${p} · ${m}`,
      "aria-haspopup": "menu",
      "aria-expanded": i,
      onClick: f => {
        f.preventDefault(), f.stopPropagation(), o(y => !y);
      },
      className: `node-dropdown-button sketch-chat-local-skill-perm-trigger flex items-center gap-1 px-1.5 text-xs outline-none ${n ? "text-zinc-200" : "text-zinc-700"} ${i ? "node-dropdown-button--open" : ""}`,
      children: [c.jsx(Y2, {
        size: 14
      }), c.jsx("span", {
        className: "truncate",
        children: a && !(h != null && h.builtin) ? W7(p, a) : p
      }), c.jsx(Mi, {
        size: 12,
        className: `shrink-0 opacity-60 transition-transform ${i ? "rotate-180" : ""}`
      })]
    }), c.jsx(yg, {
      open: i,
      anchorRef: d,
      isDark: n,
      placement: "above",
      align: "left",
      gap: 4,
      unstyled: !0,
      zIndex: 10200,
      dataPortalAttr: "data-session-harness-preset",
      className: `sketch-chat-local-skill-perm-panel session-harness-preset-panel ${n ? "is-dark" : ""}`,
      children: u.map(f => {
        const y = f.id === (h == null ? void 0 : h.id);
        return c.jsxs("button", {
          type: "button",
          className: `sketch-chat-local-skill-perm-option ${y ? "is-selected" : ""}`,
          onClick: () => {
            t(f.id), o(!1);
          },
          children: [c.jsx(Y2, {
            size: 14,
            className: "sketch-chat-local-skill-perm-icon"
          }), c.jsx("span", {
            className: "min-w-0 flex-1",
            children: c.jsx("span", {
              className: "sketch-chat-local-skill-perm-title",
              children: f.builtin ? x(f.title) : f.title
            })
          }), y ? c.jsx(io, {
            size: 14,
            className: "sketch-chat-local-skill-perm-check"
          }) : null]
        }, f.id);
      })
    })]
  });
}

const bme = "Harness";

function kfa({
  mode: e,
  locked: t = !1
}) {
  return on(), t ? c.jsx("div", {
    className: "studio-home-mode",
    "aria-label": x("当前会话类型"),
    children: c.jsx("span", {
      className: "studio-pill",
      title: e === "local-skill" ? bme : x("对话"),
      children: e === "local-skill" ? bme : x("对话")
    })
  }) : c.jsxs("div", {
    className: "studio-home-mode",
    role: "tablist",
    "aria-label": x("开始创作模式"),
    children: [c.jsxs("button", {
      type: "button",
      role: "tab",
      "aria-selected": e === "chat",
      className: `studio-home-mode__item${e === "chat" ? " is-active" : ""}`,
      onClick: () => DE("chat"),
      children: [c.jsx(sTn, {
        size: 14,
        "aria-hidden": "true"
      }), x("对话")]
    }), c.jsxs("button", {
      type: "button",
      role: "tab",
      "aria-selected": e === "local-skill",
      title: bme,
      "aria-label": bme,
      className: `studio-home-mode__item${e === "local-skill" ? " is-active" : ""}`,
      onClick: () => DE("local-skill"),
      children: [c.jsx(ac, {
        size: 14,
        "aria-hidden": "true"
      }), bme]
    })]
  });
}

const vme = {
  typingSpeed: 55,
  pauseDuration: 1100,
  deletingSpeed: 22
};

function qVn({
  text: e,
  className: t = "",
  onActiveIndexChange: n
}) {
  const r = g.useMemo(() => e.filter(Boolean), [e]),
    [a, i] = g.useState(0),
    [o, s] = g.useState(""),
    [l, d] = g.useState("typing"),
    u = g.useRef(null);
  return g.useEffect(() => {
    n == null || n(a);
  }, [a, n]), g.useEffect(() => {
    const h = r[a] ?? "",
      p = () => {
        u.current && window.clearTimeout(u.current), u.current = null;
      };
    if (p(), !!h) return l === "typing" ? o === h ? u.current = window.setTimeout(() => d("pausing"), vme.typingSpeed) : u.current = window.setTimeout(() => {
      s(h.slice(0, o.length + 1));
    }, vme.typingSpeed) : l === "pausing" ? u.current = window.setTimeout(() => d("deleting"), vme.pauseDuration) : o.length === 0 ? u.current = window.setTimeout(() => {
      i(m => (m + 1) % Math.max(r.length, 1)), d("typing");
    }, vme.deletingSpeed) : u.current = window.setTimeout(() => {
      s(h.slice(0, o.length - 1));
    }, vme.deletingSpeed), p;
  }, [o, a, r, l]), c.jsxs("span", {
    className: t,
    "aria-hidden": !0,
    children: [o, c.jsx("span", {
      className: "studio-type-cursor",
      children: "_"
    })]
  });
}

function uYe() {
  const [e, t] = g.useState(NOe);
  g.useEffect(() => {
    const r = a => {
      const i = a.detail;
      t(ROe(i ?? NOe()));
    };
    return window.addEventListener(Cft, r), () => window.removeEventListener(Cft, r);
  }, []);
  const n = g.useCallback(r => {
    const a = ROe(r);
    t(a), P$r(a);
  }, []);
  return [e, n];
}

function hYe({
  nodeId: e,
  dropdownType: t,
  value: n,
  isDark: r,
  activeDropdown: a,
  setActiveDropdown: i,
  onSelect: o,
  buttonClassName: s = "",
  menuClassName: l = "w-36",
  menuPlacement: d = "above",
  menuAlign: u = "start",
  menuZIndex: h = 9999,
  buttonVariant: p = "default"
}) {
  on();
  const m = nTe.find(C => C.id === n) ?? nTe[0],
    f = (a == null ? void 0 : a.nodeId) === e && a.type === t,
    y = g.useRef(null),
    b = g.useRef(null),
    v = g.useRef("above"),
    _ = g.useRef(144),
    w = g.useCallback(() => {
      const C = y.current;
      if (!C || typeof window > "u") return;
      const I = C.getBoundingClientRect(),
        E = 4,
        M = 8,
        T = nTe.length * 34 + 16,
        P = window.innerHeight - I.bottom - E - M,
        R = I.top - E - M;
      d === "below" ? v.current = "below" : d === "above" ? v.current = "above" : v.current = P >= T || P >= R ? "below" : "above", _.current = Math.max(I.width, 144);
    }, [d]),
    k = g.useCallback(() => {
      const C = y.current,
        I = b.current;
      if (!C || !I || typeof window > "u") return;
      const E = C.getBoundingClientRect(),
        M = 4,
        T = 8,
        P = v.current === "below";
      I.style.position = "fixed", I.style.minWidth = `${_.current}px`, I.style.maxWidth = "calc(100vw - 16px)", I.style.zIndex = String(h), I.style.visibility = "visible";
      const R = Math.min(Math.max(I.offsetWidth || _.current, _.current), window.innerWidth - T * 2),
        j = u === "end" ? E.right - R : E.left,
        B = window.innerWidth - T - R;
      I.style.left = `${Math.min(Math.max(j, T), Math.max(T, B))}px`, P ? (I.style.top = `${E.bottom + M}px`, I.style.bottom = "", I.style.maxHeight = `${Math.max(window.innerHeight - E.bottom - M - T, 120)}px`) : (I.style.top = "", I.style.bottom = `${window.innerHeight - E.top + M}px`, I.style.maxHeight = `${Math.max(E.top - M - T, 120)}px`);
    }, [u, h]);
  g.useLayoutEffect(() => {
    if (!f) return;
    w(), k(), P3(b.current);
    let C = 0;
    const I = () => {
      k(), C = requestAnimationFrame(I);
    };
    return C = requestAnimationFrame(I), () => cancelAnimationFrame(C);
  }, [f, w, k, n]);
  const A = p === "bare" ? m.shortLabel : m.label,
    S = f ? c.jsx("div", {
      ref: b,
      className: `node-dropdown-menu rounded-xl shadow-xl p-1.5 border overflow-y-auto scrollbar-hide ${r ? "bg-[#1f1f1f] border-zinc-700" : "bg-white border-zinc-200"} ${l}`,
      style: {
        position: "fixed",
        visibility: "hidden",
        zIndex: h
      },
      onMouseDown: C => C.stopPropagation(),
      onWheel: C => C.stopPropagation(),
      children: nTe.map(C => c.jsx("button", {
        type: "button",
        ...(n === C.id ? {
          [Md]: "true"
        } : {}),
        onClick: I => {
          I.stopPropagation(), o(C.id), i(null);
        },
        className: `w-full flex items-center px-2 py-1.5 rounded-lg text-left text-xs transition-colors ${r ? "hover:bg-zinc-800/90 text-zinc-300" : "hover:bg-zinc-100 text-zinc-700"} ${n === C.id ? r ? "bg-zinc-800 text-white" : "bg-zinc-100 text-zinc-900" : ""}`,
        children: c.jsx("span", {
          className: "font-medium whitespace-nowrap",
          children: x(C.label)
        })
      }, C.id))
    }) : null;
  return c.jsxs("div", {
    className: "relative overflow-visible shrink-0",
    "data-model-select-area": !0,
    children: [c.jsxs("button", {
      ref: y,
      type: "button",
      title: x("小米官渠视频：默认发公网 URL，或改 b64 内联"),
      onClick: C => {
        C.preventDefault(), C.stopPropagation(), i(f ? null : {
          nodeId: e,
          type: t
        });
      },
      onMouseDown: C => {
        C.preventDefault(), C.stopPropagation();
      },
      className: `node-dropdown-button flex items-center gap-1 rounded text-xs transition-colors outline-none cursor-pointer ${p === "bare" ? `border-0 bg-transparent px-1 py-1 ${r ? "text-white/75 hover:text-white" : "text-zinc-700 hover:text-zinc-900"}` : `px-2 py-1 border ${r ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`} ${s}`,
      children: [c.jsx("span", {
        className: `truncate ${p === "bare" ? "max-w-[40px]" : "max-w-[72px]"}`,
        children: x(A)
      }), c.jsx(Mi, {
        size: 10,
        className: `shrink-0 opacity-70 transition-transform ${f ? "rotate-180" : ""}`
      })]
    }), S && typeof document < "u" ? Da.createPortal(S, document.body) : null]
  });
}

const tD = "qiaodoumayi_saved_skills",
  cw = "qiaodoumayi-saved-skills-changed";

function KVn() {
  return "skill-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 9);
}

function Afa() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(cw));
}

function Sfa() {
  (async () => {
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
      await e.syncPromptWordsSavedSkills(vp());
    } catch (e) {
      console.warn("[savedSkills] 同步到资源缓存 Prompt words 失败:", e);
    }
  })();
}

function pYe() {
  Afa(), Sfa();
}

async function QVn() {
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
    await e.syncPromptWordsSavedSkills(vp());
  } catch (e) {
    console.warn("[savedSkills] syncSavedSkillsToPromptWordsDir 失败:", e);
  }
}

function vp() {
  try {
    const e = localStorage.getItem(tD);
    if (!e) return [];
    const t = JSON.parse(e);
    return Array.isArray(t) ? t : [];
  } catch {
    return [];
  }
}

function Qhe(e) {
  var a;
  const t = vp(),
    n = (a = e.description) == null ? void 0 : a.trim(),
    r = {
      id: KVn(),
      name: e.name.trim() || `Skill ${new Date().toLocaleString()}`,
      content: e.content,
      ...(n ? {
        description: n
      } : {}),
      createdAt: Date.now()
    };
  return t.unshift(r), localStorage.setItem(tD, JSON.stringify(t)), pYe(), r;
}

function YVn(e) {
  const t = vp().filter(n => n.id !== e);
  localStorage.setItem(tD, JSON.stringify(t)), pYe();
}

function A7t(e, t) {
  const n = vp().map(r => r.id === e ? {
    ...r,
    ...t
  } : r);
  localStorage.setItem(tD, JSON.stringify(n)), pYe();
}

function XVn(e) {
  if (e === null || typeof e != "object") return null;
  const t = e;
  if (typeof t.content != "string") return null;
  const n = typeof t.name == "string" ? t.name : "",
    r = t.content;
  return n.trim() === "" && r.trim() === "" ? null : {
    name: n.trim() || `Skill ${new Date().toLocaleString()}`,
    content: r
  };
}

function JVn(e, t) {
  const n = Date.now(),
    r = t.map((a, i) => ({
      id: KVn(),
      name: a.name,
      content: a.content,
      createdAt: n + i
    }));
  return [...e, ...r];
}

function ZVn(e) {
  let t;
  try {
    t = JSON.parse(e);
  } catch {
    return {
      ok: !1,
      message: "JSON 解析失败，请检查文件是否为合法 JSON。"
    };
  }
  let n;
  if (Array.isArray(t)) n = t;else if (t !== null && typeof t == "object" && Array.isArray(t.skills)) n = t.skills;else return {
    ok: !1,
    message: "JSON 结构不支持：根须为数组，或包含 skills 数组的对象。"
  };
  const r = [];
  for (const a of n) {
    const i = XVn(a);
    i && r.push(i);
  }
  if (r.length === 0) return {
    ok: !1,
    message: "文件中没有可导入的 Skill（需含字符串 content，且 name 与 content 不能同时为空）。"
  };
  try {
    const a = JVn(vp(), r);
    localStorage.setItem(tD, JSON.stringify(a)), pYe();
  } catch (a) {
    return console.error("[savedSkills] importSavedSkillsFromJsonText 写入失败:", a), {
      ok: !1,
      message: "写入本地存储失败，请检查浏览器是否禁用存储或空间已满。"
    };
  }
  return {
    ok: !0,
    added: r.length
  };
}

function eHn(e, t) {
  if (!e.trim()) return {
    ok: !1,
    message: "文件内容为空"
  };
  const n = (t || "").replace(/\.(txt|md)$/i, "").trim() || (t == null ? void 0 : t.trim()) || `Skill ${new Date().toLocaleString()}`;
  try {
    Qhe({
      name: n,
      content: e
    });
  } catch (r) {
    return console.error("[savedSkills] importSavedSkillFromPlainText 写入失败:", r), {
      ok: !1,
      message: "写入本地存储失败，请检查浏览器是否禁用存储或空间已满。"
    };
  }
  return {
    ok: !0,
    added: 1
  };
}

function tHn(e, t) {
  const n = e.toLowerCase();
  return n.endsWith(".txt") || n.endsWith(".md") ? eHn(t, e) : ZVn(t);
}

const S7t = Object.freeze(Object.defineProperty({
    __proto__: null,
    SAVED_SKILLS_CHANGED_EVENT: cw,
    SAVED_SKILLS_KEY: tD,
    addSavedSkill: Qhe,
    deleteSavedSkill: YVn,
    getSavedSkills: vp,
    importSavedSkillFromPlainText: eHn,
    importSavedSkillsFromFileText: tHn,
    importSavedSkillsFromJsonText: ZVn,
    mergeImportedSavedSkills: JVn,
    normalizeImportedEntry: XVn,
    syncSavedSkillsToPromptWordsDir: QVn,
    updateSavedSkill: A7t
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  f_e = "qiaodoumayi_local_file_skills_root",
  xFe = "qiaodoumayi_local_file_skills_folders",
  oI = "qiaodoumayi-local-file-skills-changed",
  mYe = "localfile:",
  I7t = 800,
  nHn = 5,
  C7t = 40,
  rHn = 24,
  Ifa = new Set(["node_modules", ".git", ".svn", ".hg", "__pycache__", ".ds_store", "outputs"]),
  Cfa = new Set(["readme.md", "readme", "security-report.md", "security-report.json", "marketplace-index.json", "classify-report.json", "_index.md", "_index"]);

let Ik = [],
  Ant = 0;

function Yhe(e) {
  return String(e || "").startsWith(mYe);
}

function Dy(e) {
  return String(e || "").replace(/\\/g, "/").replace(/\/+$/, "").trim();
}

function fYe(e) {
  const t = Dy(e);
  return /^[a-zA-Z]:\//.test(t) ? t.replace(/\//g, "\\") : t;
}

function qyt(e, t) {
  const n = Dy(e),
    r = Dy(t).replace(/^\.\//, "").replace(/^\/+/, "");
  return !r || r === "." ? n : `${n}/${r}`;
}

function aHn(e) {
  return `${mYe}${Dy(e)}`;
}

function gYe(e) {
  return Yhe(e) ? Dy(e.slice(mYe.length)) : "";
}

function yYe(e) {
  return String(e || "").replace(/\.(md|markdown)$/i, "").trim() || e;
}

function _Fe(e) {
  const t = Dy(e).split("/").filter(Boolean);
  return t.length <= 1 ? "未分类" : t[0];
}

function g_e(e) {
  const t = Dy(e);
  return t.split("/").filter(Boolean).pop() || t;
}

function Xce(e, t) {
  return Dy(e).toLowerCase() === Dy(t).toLowerCase();
}

function bYe(e) {
  const t = [];
  for (const n of e) {
    const r = Dy(n);
    r && (t.some(a => Xce(a, r)) || t.push(r));
  }
  return t;
}

function iHn(e) {
  const t = String(e || "").trim();
  return !(!t || t === "." || t === ".." || Ifa.has(t.toLowerCase()) || t.startsWith(".") || t.startsWith("_"));
}

function oHn(e) {
  const t = String(e || "").trim();
  return !t || t.startsWith(".") || t.startsWith("_") || Cfa.has(t.toLowerCase()) ? !1 : /\.(md|markdown)$/i.test(t);
}

function kFe(e, t) {
  const n = t.trim().toLowerCase();
  return n ? e.filter(r => {
    const a = r.name.toLowerCase(),
      i = String(r.category || "").toLowerCase(),
      o = String(r.description || "").toLowerCase(),
      s = String(r.rootLabel || "").toLowerCase();
    return a.includes(n) || i.includes(n) || o.includes(n) || s.includes(n);
  }) : e;
}

function xQ() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(oI));
}

function AFe(e, t) {
  const n = bYe(e),
    r = t && n.some(a => Xce(a, t)) ? Dy(t) : n[0] || "";
  try {
    n.length ? localStorage.setItem(xFe, JSON.stringify(n)) : localStorage.removeItem(xFe), r ? localStorage.setItem(f_e, r) : localStorage.removeItem(f_e);
  } catch {}
}

function ZU() {
  try {
    const e = localStorage.getItem(xFe);
    if (e) {
      const n = JSON.parse(e);
      if (Array.isArray(n)) return bYe(n.map(r => String(r || "")));
    }
    const t = Dy(localStorage.getItem(f_e) || "");
    return t ? [t] : [];
  } catch {
    return [];
  }
}

function Rz() {
  const e = ZU();
  if (e.length === 0) return null;
  try {
    const t = Dy(localStorage.getItem(f_e) || "");
    if (t && e.some(n => Xce(n, t))) return t;
  } catch {}
  return e[0];
}

function Kyt(e) {
  const t = ZU();
  if (!e) {
    AFe([], null), Ik = [], xQ();
    return;
  }
  const n = Dy(e);
  AFe(t.length ? t : [n], n), xQ();
}

function sHn(e) {
  const t = bYe([...ZU(), ...e]),
    n = e.map(Dy).filter(Boolean);
  return AFe(t, n[n.length - 1] || Rz()), t;
}

function lHn(e) {
  const t = ZU().filter(n => !Xce(n, e));
  return AFe(t, Rz()), Ik = Ik.filter(n => !n.rootPath || !Xce(n.rootPath, e)), xQ(), t;
}

function vYe() {
  return Ik;
}

function cHn(e, t) {
  const n = String(e || "").trim(),
    r = String(t || "").trim().toLowerCase();
  if (n) {
    const a = Ik.find(i => i.id === n);
    if (a) return a;
  }
  return r && (Ik.find(a => a.name.trim().toLowerCase() === r) || Ik.find(a => a.name.trim().toLowerCase().includes(r))) || null;
}

function wYe(e) {
  const t = e.rootLabel && e.category && e.category !== "未分类" ? `${e.rootLabel} / ${e.category}` : e.rootLabel || e.category;
  return {
    id: e.id,
    name: e.name,
    content: "",
    description: t,
    createdAt: 0,
    source: "local-file",
    category: t,
    rootLabel: e.rootLabel
  };
}

function E7t(e) {
  return {
    ...e,
    source: "cache"
  };
}

function Xhe(e) {
  const t = String(e || "").trim();
  if (!t) return null;
  if (Yhe(t)) {
    const n = Ik.find(i => i.id === t);
    if (n) return wYe(n);
    const r = gYe(t);
    if (!r) return null;
    const a = yYe(r.split("/").pop() || r);
    return {
      id: t,
      name: a,
      content: "",
      description: _Fe(r),
      createdAt: 0,
      source: "local-file",
      category: _Fe(r)
    };
  }
  try {
    const n = vp().find(r => r.id === t);
    return n ? E7t(n) : null;
  } catch {
    return null;
  }
}

function Efa() {
  if (typeof window > "u") return !1;
  const e = window;
  return !!(e.__TAURI_INTERNALS__ || e.__TAURI__);
}

async function dHn() {
  return Ie(() => Promise.resolve().then(() => oc), void 0, import.meta.url);
}

async function uHn() {
  if (!Efa()) throw new Error("选择本地 Skill 文件夹需在桌面端运行");
  const {
      open: e
    } = await Ie(async () => {
      const {
        open: r
      } = await Promise.resolve().then(() => Sb);
      return {
        open: r
      };
    }, void 0, import.meta.url),
    t = await e({
      directory: !0,
      multiple: !0,
      title: "添加 Skill 本地浏览目录（可多选，读取其中的 .md，不写入缓存）",
      defaultPath: Rz() ? fYe(Rz()) : void 0
    });
  if (!t) return null;
  const n = (Array.isArray(t) ? t : [String(t)]).map(r => Dy(r)).filter(Boolean);
  if (n.length === 0) return null;
  for (const r of n) if (b7(r)) throw new Error(`不能选择系统保护目录：${g_e(r)}`);
  return sHn(n), xQ(), n;
}

async function T7t(e, t = ".") {
  const {
      readDir: n
    } = await dHn(),
    r = qyt(e, t);
  let a = [];
  try {
    a = await n(fYe(r));
  } catch (s) {
    const l = s instanceof Error ? s.message : String(s);
    throw new Error(`无法列出目录：${l}`);
  }
  const i = [],
    o = [];
  for (const s of a) {
    const l = String(s.name || "").trim();
    if (!l) continue;
    const d = t === "." || t === "" ? l : `${Dy(t)}/${l}`;
    if (s.isDirectory) {
      if (!iHn(l)) continue;
      i.push({
        name: l,
        relPath: d
      });
      continue;
    }
    if (!oHn(l)) continue;
    const u = qyt(e, d);
    o.push({
      id: aHn(u),
      name: yYe(l),
      relPath: d,
      absPath: u,
      category: _Fe(d)
    });
  }
  return i.sort((s, l) => s.name.localeCompare(l.name, "zh")), o.sort((s, l) => s.name.localeCompare(l.name, "zh")), {
    folders: i,
    files: o
  };
}

async function hHn(e, t, n, r, a) {
  if (r.left <= 0 || n > nHn) return;
  const i = await T7t(e, t);
  for (const o of i.files) {
    if (r.left <= 0) return;
    r.left -= 1, a.push(o);
  }
  for (const o of i.folders) {
    if (r.left <= 0) return;
    await hHn(e, o.relPath, n + 1, r, a);
  }
}

async function pHn(e, t = {
  left: I7t
}) {
  const n = Dy(e);
  if (!n) return [];
  const r = [];
  await hHn(n, ".", 1, t, r);
  const a = g_e(n);
  return r.map(i => ({
    ...i,
    rootPath: n,
    rootLabel: a
  }));
}

async function M7t() {
  const e = ZU(),
    t = ++Ant;
  if (e.length === 0) return Ik = [], xQ(), [];
  try {
    const n = [],
      r = {
        left: I7t
      };
    for (const a of e) {
      if (r.left <= 0) break;
      n.push(...(await pHn(a, r)));
    }
    return t !== Ant ? Ik : (Ik = n, xQ(), n);
  } catch (n) {
    throw t === Ant && (Ik = [], xQ()), n;
  }
}

let wme = null;

function xYe() {
  return Ik.length > 0 ? Promise.resolve(Ik) : wme || (wme = M7t().finally(() => {
    wme = null;
  }), wme);
}

async function _Ye(e) {
  const t = Dy(e);
  if (!t) throw new Error("Skill 文件路径为空");
  if (b7(t)) throw new Error("不能读取系统保护目录中的文件");
  const {
      readTextFile: n
    } = await dHn(),
    r = await n(fYe(t));
  if (!String(r || "").trim()) throw new Error("Skill 文件内容为空");
  return r;
}

async function P7t(e) {
  if (!e) return null;
  if (e.content.trim()) return e;
  const t = Yhe(e.id) ? gYe(e.id) : "";
  if (!t) return e;
  const n = await _Ye(t);
  return {
    ...e,
    content: n,
    filePath: t
  };
}

const mHn = Object.freeze(Object.defineProperty({
  __proto__: null,
  LOCAL_FILE_SKILLS_CHANGED_EVENT: oI,
  LOCAL_FILE_SKILLS_FOLDERS_KEY: xFe,
  LOCAL_FILE_SKILLS_ROOT_KEY: f_e,
  LOCAL_FILE_SKILL_CATALOG_LIMIT: rHn,
  LOCAL_FILE_SKILL_ID_PREFIX: mYe,
  LOCAL_FILE_SKILL_SCAN_MAX_DEPTH: nHn,
  LOCAL_FILE_SKILL_SCAN_MAX_FILES: I7t,
  LOCAL_FILE_SKILL_SLASH_LIMIT: C7t,
  addLocalFileSkillsFolders: sHn,
  categoryFromRelPath: _Fe,
  chooseLocalFileSkillsFolder: uHn,
  ensureLocalFileSkillIndex: xYe,
  filterBrowsableSkills: kFe,
  findLocalFileSkill: cHn,
  folderDisplayName: g_e,
  getLocalFileSkillIndex: vYe,
  getLocalFileSkillsFolders: ZU,
  getLocalFileSkillsRoot: Rz,
  hydrateSkillLibraryItem: P7t,
  isBrowsableSkillDirName: iHn,
  isBrowsableSkillFileName: oHn,
  isLocalFileSkillId: Yhe,
  joinLocalFileSkillPath: qyt,
  listLocalFileSkillDir: T7t,
  localFileSkillIdFromPath: aHn,
  normalizeLocalFileSkillPath: Dy,
  pathFromLocalFileSkillId: gYe,
  readLocalFileSkillContent: _Ye,
  refreshLocalFileSkillIndex: M7t,
  removeLocalFileSkillsFolder: lHn,
  resolveSkillLibraryItem: Xhe,
  sameLocalFileSkillPath: Xce,
  scanLocalFileSkills: pHn,
  setLocalFileSkillsRoot: Kyt,
  skillNameFromFileName: yYe,
  toBrowsableCachedSkill: E7t,
  toBrowsableLocalFileSkill: wYe,
  toWindowsLocalPath: fYe,
  uniqueLocalFileSkillPaths: bYe
}, Symbol.toStringTag, {
  value: "Module"
}));

function Tfa() {
  const [e, t] = g.useState(() => ZU()),
    [n, r] = g.useState(() => Rz()),
    [a, i] = g.useState("."),
    [o, s] = g.useState({
      folders: [],
      files: []
    }),
    [l, d] = g.useState(0),
    [u, h] = g.useState(""),
    [p, m] = g.useState(!1),
    [f, y] = g.useState(null),
    b = g.useCallback(() => {
      t(ZU()), r(Rz()), d(R => R + 1);
    }, []),
    v = g.useCallback(async (R, j) => {
      if (!R) {
        s({
          folders: [],
          files: []
        });
        return;
      }
      m(!0), y(null);
      try {
        const B = await T7t(R, j);
        s(B);
      } catch (B) {
        s({
          folders: [],
          files: []
        }), y(B instanceof Error ? B.message : String(B));
      } finally {
        m(!1);
      }
    }, []);
  g.useEffect(() => {
    const R = () => b();
    return window.addEventListener(oI, R), () => window.removeEventListener(oI, R);
  }, [b]), g.useEffect(() => {
    if (!u.trim()) return;
    let R = !1;
    return xYe().then(() => {
      R || d(j => j + 1);
    }).catch(() => {}), () => {
      R = !0;
    };
  }, [u]), g.useEffect(() => {
    v(n, a);
  }, [v, a, n]), g.useEffect(() => {
    i("."), h("");
  }, [n]);
  const _ = g.useCallback(async () => {
      y(null);
      try {
        const R = await uHn();
        if (!(R != null && R.length)) return;
        i("."), h(""), b();
      } catch (R) {
        y(R instanceof Error ? R.message : String(R));
      }
    }, [b]),
    w = g.useCallback(R => {
      Kyt(R), r(R), i("."), h("");
    }, []),
    k = g.useCallback(R => {
      lHn(R), i("."), h(""), b();
    }, [b]),
    A = g.useCallback(() => {
      Kyt(null), t([]), r(null), i("."), s({
        folders: [],
        files: []
      }), d(R => R + 1), h(""), y(null);
    }, []),
    S = g.useCallback(async () => {
      y(null);
      try {
        await M7t(), b(), await v(Rz(), a);
      } catch (R) {
        y(R instanceof Error ? R.message : String(R));
      }
    }, [v, a, b]),
    C = g.useCallback(R => {
      i(R || "."), h("");
    }, []),
    I = g.useCallback(() => {
      if (!a || a === ".") return;
      const R = a.split("/").filter(Boolean);
      R.pop(), i(R.length ? R.join("/") : "."), h("");
    }, [a]),
    E = g.useMemo(() => e.map(R => ({
      path: R,
      name: g_e(R),
      active: !!(n && R.toLowerCase() === n.toLowerCase())
    })), [e, n]),
    M = g.useMemo(() => {
      if (!n) return [];
      const R = a === "." ? [] : a.split("/").filter(Boolean),
        j = [{
          name: g_e(n),
          relPath: "."
        }];
      let B = "";
      for (const F of R) B = B ? `${B}/${F}` : F, j.push({
        name: F,
        relPath: B
      });
      return j;
    }, [a, n]),
    T = g.useMemo(() => kFe(vYe(), u).slice(0, C7t), [l, u]),
    P = u.trim().length > 0;
  return {
    rootPath: n,
    folders: e,
    libraries: E,
    relPath: a,
    listing: o,
    query: u,
    setQuery: h,
    loading: p,
    error: f,
    crumbs: M,
    searching: P,
    searchMatches: T,
    addFolders: _,
    switchFolder: w,
    removeFolder: k,
    chooseFolder: _,
    clearFolder: A,
    refresh: S,
    navigate: C,
    goUp: I
  };
}

function fHn({
  isDark: e,
  variant: t = "node",
  selectedId: n,
  applyLabel: r = "应用",
  onApply: a
}) {
  on();
  const i = Tfa(),
    o = t === "menu",
    [s, l] = g.useState(!1),
    d = g.useRef(null),
    u = w => w.stopPropagation(),
    h = i.libraries.find(w => w.active) || i.libraries[0] || null;
  g.useEffect(() => {
    if (!s) return;
    const w = k => {
      var S;
      const A = k.target;
      A && ((S = d.current) != null && S.contains(A) || A.closest("[data-local-file-skill-lib-menu]") || l(!1));
    };
    return document.addEventListener("mousedown", w, !0), () => document.removeEventListener("mousedown", w, !0);
  }, [s]);
  const p = e ? "border-transparent bg-white/[0.03] hover:bg-white/[0.06]" : "border-transparent bg-black/[0.03] hover:bg-black/[0.05]",
    m = e ? "text-zinc-100" : "text-zinc-800",
    f = e ? "text-zinc-300" : "text-zinc-500",
    y = e ? "border-transparent text-zinc-100 hover:bg-white/[0.08] hover:text-white" : "border-transparent text-zinc-500 hover:bg-black/[0.05] hover:text-zinc-900",
    b = i.folders.length === 0 ? "点「添加目录」选择一个或多个 Skill 文件夹。按子文件夹浏览 .md，不会写入本地缓存。" : i.error ? i.error : i.loading ? "正在读取本地文件夹…" : "这个文件夹里没有可浏览的 .md Skill。",
    v = (w, k) => {
      const A = n === w.id,
        S = k || w.category;
      return o ? c.jsxs("button", {
        type: "button",
        className: A ? "sketch-chat-agent-skill-menu-item sketch-chat-agent-skill-menu-item--active" : "sketch-chat-agent-skill-menu-item",
        onClick: () => a(w),
        onMouseDown: u,
        title: w.relPath,
        children: [c.jsxs("span", {
          className: "sketch-chat-agent-skill-menu-item-name",
          children: [c.jsx(Hd, {
            size: 13,
            className: "shrink-0"
          }), c.jsx("span", {
            className: "truncate",
            children: w.name
          })]
        }), c.jsx("span", {
          className: "sketch-chat-agent-skill-menu-item-preview",
          children: w.rootLabel ? `${w.rootLabel} / ${S}` : S
        })]
      }, w.id) : c.jsxs("div", {
        className: `flex items-center justify-between pl-3 pr-1 py-1 rounded-lg border transition-colors ${p}`,
        title: w.relPath,
        children: [c.jsx("span", {
          className: `text-[11px] truncate flex-1 mr-2 ${m}`,
          children: w.name
        }), c.jsx("button", {
          "data-gen-prompt-apply": !0,
          type: "button",
          onClick: C => {
            C.stopPropagation(), a(w);
          },
          onPointerDown: u,
          onMouseDown: u,
          className: `relative z-10 px-2 py-1 text-[10px] rounded-md border transition-colors shrink-0 ${y}`,
          children: x(r)
        })]
      }, w.id);
    },
    _ = o ? "sketch-chat-agent-skill-menu-list" : "grid grid-cols-3 gap-1 max-h-48 overflow-y-auto rh-scroll-minimal";
  return c.jsxs("div", {
    className: `local-file-skill-browser ${o ? "local-file-skill-browser--menu" : ""}`,
    onMouseDown: u,
    onPointerDown: u,
    children: [c.jsxs("div", {
      className: "local-file-skill-browser-toolbar",
      children: [h ? c.jsxs(c.Fragment, {
        children: [c.jsxs("button", {
          ref: d,
          type: "button",
          className: `local-file-skill-lib-trigger ${e ? "is-dark" : ""}`,
          onClick: () => l(w => !w),
          title: h.path,
          children: [c.jsx("span", {
            className: "truncate",
            children: h.name
          }), c.jsx(Mi, {
            size: 11,
            className: s ? "rotate-180" : ""
          })]
        }), c.jsx(yg, {
          open: s,
          anchorRef: d,
          isDark: e,
          placement: "below",
          align: "left",
          gap: 6,
          unstyled: !0,
          zIndex: 10400,
          minWidth: 220,
          dataPortalAttr: "data-local-file-skill-lib-menu",
          className: `sketch-chat-agent-skill-menu ${e ? "sketch-chat-agent-skill-menu-dark" : ""}`,
          children: i.libraries.map(w => c.jsxs("div", {
            className: "local-file-skill-lib-row",
            children: [c.jsx("button", {
              type: "button",
              className: w.active ? "sketch-chat-agent-skill-menu-item sketch-chat-agent-skill-menu-item--active" : "sketch-chat-agent-skill-menu-item",
              title: w.path,
              onClick: () => {
                i.switchFolder(w.path), l(!1);
              },
              children: c.jsxs("span", {
                className: "sketch-chat-agent-skill-menu-item-name",
                children: [w.active ? c.jsx(io, {
                  size: 12,
                  className: "shrink-0"
                }) : c.jsx(_h, {
                  size: 12,
                  className: "shrink-0"
                }), c.jsx("span", {
                  className: "truncate",
                  children: w.name
                })]
              })
            }), c.jsx("button", {
              type: "button",
              className: "local-file-skill-lib-remove",
              title: x("移除这个文件夹"),
              onClick: () => {
                i.removeFolder(w.path), i.libraries.length <= 1 && l(!1);
              },
              children: c.jsx(Na, {
                size: 12
              })
            })]
          }, w.path))
        })]
      }) : null, c.jsxs("div", {
        className: "local-file-skill-browser-search",
        children: [c.jsx(mc, {
          size: 10
        }), c.jsx("input", {
          type: "text",
          value: i.query,
          onChange: w => i.setQuery(w.target.value),
          placeholder: x("搜索本地 .md"),
          className: e ? "local-file-skill-browser-search-input is-dark" : "local-file-skill-browser-search-input",
          onMouseDown: u
        })]
      }), c.jsxs("button", {
        type: "button",
        className: `px-2 py-1 text-[10px] rounded-md border transition-colors flex items-center gap-1 shrink-0 ${y}`,
        onClick: () => void i.addFolders(),
        title: x("可一次多选，继续添加更多本地 Skill 文件夹"),
        children: [c.jsx(Jle, {
          size: 12
        }), x("添加目录")]
      }), i.folders.length > 0 ? c.jsx("button", {
        type: "button",
        className: `p-1 rounded-md border transition-colors ${y}`,
        onClick: () => void i.refresh(),
        title: x("重新扫描全部已添加文件夹"),
        children: c.jsx(bd, {
          size: 11
        })
      }) : null]
    }), i.rootPath && i.crumbs.length > 1 ? c.jsx("div", {
      className: `local-file-skill-browser-crumbs ${f}`,
      children: i.crumbs.map((w, k) => c.jsxs(Ia.Fragment, {
        children: [k > 0 ? c.jsx("span", {
          className: "local-file-skill-crumb-sep",
          children: "/"
        }) : null, c.jsx("button", {
          type: "button",
          className: "local-file-skill-browser-crumb",
          title: w.name,
          onClick: () => i.navigate(w.relPath),
          children: w.name
        })]
      }, w.relPath))
    }) : null, i.searching ? c.jsx("div", {
      className: _,
      "data-scrollable": "true",
      children: i.searchMatches.length === 0 ? c.jsx("div", {
        className: `py-4 text-center text-[10px] ${o ? "" : "col-span-3"} ${f}`,
        children: x("没有匹配的本地 Skill")
      }) : i.searchMatches.map(w => v(w, w.category))
    }) : i.folders.length === 0 || i.listing.folders.length === 0 && i.listing.files.length === 0 ? c.jsx("div", {
      className: `py-4 text-center text-[12px] leading-5 ${f}`,
      children: b
    }) : o ? c.jsxs("div", {
      className: "sketch-chat-agent-skill-menu-list",
      children: [i.listing.folders.map(w => c.jsxs("button", {
        type: "button",
        className: "sketch-chat-agent-skill-menu-item",
        onClick: () => i.navigate(w.relPath),
        onMouseDown: u,
        title: w.name,
        children: [c.jsxs("span", {
          className: "sketch-chat-agent-skill-menu-item-name",
          children: [c.jsx(_h, {
            size: 13,
            className: "shrink-0"
          }), c.jsx("span", {
            className: "truncate",
            children: w.name
          })]
        }), c.jsx("span", {
          className: "sketch-chat-agent-skill-menu-item-preview",
          children: x("文件夹")
        })]
      }, w.relPath)), i.listing.files.map(w => v(w))]
    }) : c.jsxs("div", {
      className: _,
      "data-scrollable": "true",
      children: [i.listing.folders.map(w => c.jsxs("button", {
        type: "button",
        onClick: () => i.navigate(w.relPath),
        onMouseDown: u,
        className: `flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors text-left ${p}`,
        title: w.name,
        children: [c.jsx(_h, {
          size: 12,
          className: `shrink-0 ${m}`
        }), c.jsx("span", {
          className: `text-[11px] truncate ${m}`,
          children: w.name
        })]
      }, w.relPath)), i.listing.files.map(w => v(w))]
    })]
  });
}

function kYe({
  value: e,
  onChange: t,
  isDark: n,
  variant: r = "inline",
  menuAlign: a,
  className: i = "",
  title: o,
  disabled: s = !1,
  additionalSkills: l = [],
  menuPlacement: d = "above",
  onCreateFromChat: u,
  createDisabledReason: h
}) {
  on();
  const [p, m] = g.useState(!1),
    [f, y] = g.useState(""),
    b = r === "harness",
    [v, _] = g.useState("above"),
    [w, k] = g.useState("cache"),
    [A, S] = g.useState(() => vp()),
    [C, I] = g.useState(!1),
    [E, M] = g.useState({
      name: "",
      content: ""
    }),
    T = g.useRef(null),
    P = g.useRef(null),
    R = g.useRef(null),
    j = g.useCallback(() => {
      S(vp());
    }, []);
  g.useEffect(() => {
    j();
    const K = () => j();
    return window.addEventListener(cw, K), window.addEventListener(oI, K), () => {
      window.removeEventListener(cw, K), window.removeEventListener(oI, K);
    };
  }, [j]), g.useEffect(() => {
    if (!p) {
      y(""), I(!1), M({
        name: "",
        content: ""
      });
      return;
    }
    j();
    const K = Q => {
      var ne;
      const q = Q.target;
      q && ((ne = T.current) != null && ne.contains(Q.target) || q.closest("[data-chat-agent-skill-menu]") || q.closest("[data-local-file-skill-lib-menu]") || m(!1));
    };
    document.addEventListener("mousedown", K, !0);
    const W = Q => {
      var q;
      Q.key === "Escape" && (m(!1), (q = T.current) == null || q.focus());
    };
    return document.addEventListener("keydown", W), () => {
      document.removeEventListener("mousedown", K, !0), document.removeEventListener("keydown", W);
    };
  }, [p, j]);
  const B = [...A, ...l],
    F = (w === "preset" ? l : A).filter(K => !b || `${K.name} ${K.content}`.toLowerCase().includes(f.trim().toLowerCase())),
    N = B.find(K => K.id === e) ?? Xhe(e) ?? null,
    G = N ? `已选 Skill：${N.name}（点击更换）` : "从 Skill 库选择工作流（本地缓存 / 本地浏览）",
    z = K => {
      t((K == null ? void 0 : K.id) ?? null, K), m(!1);
    };
  g.useEffect(() => {
    if (!C) return;
    const K = window.setTimeout(() => {
      var W;
      return (W = P.current) == null ? void 0 : W.focus();
    }, 0);
    return () => window.clearTimeout(K);
  }, [C]);
  const V = () => {
      I(!0), M({
        name: "",
        content: ""
      });
    },
    O = () => {
      I(!1), M({
        name: "",
        content: ""
      });
    },
    L = () => {
      var K;
      (K = R.current) == null || K.click();
    },
    D = async K => {
      var q;
      const W = (q = K.target.files) == null ? void 0 : q[0];
      if (K.target.value = "", !W) return;
      const Q = W.name.toLowerCase();
      if (!Q.endsWith(".txt") && !Q.endsWith(".md")) {
        typeof window < "u" && window.__toastError ? window.__toastError("仅支持 .txt 与 .md 文件") : alert(x("仅支持 .txt 与 .md 文件"));
        return;
      }
      try {
        const ne = await W.text();
        if (!ne.trim()) {
          typeof window < "u" && window.__toastError ? window.__toastError("文件内容为空") : alert(x("文件内容为空"));
          return;
        }
        const de = W.name.replace(/\.(txt|md)$/i, "").trim() || W.name;
        if (M(le => ({
          name: le.name.trim() || de,
          content: ne
        })), typeof window < "u" && window.__toastSuccess) {
          const le = (new TextEncoder().encode(ne).length / 1024).toFixed(1);
          window.__toastSuccess(`已导入 ${W.name}（约 ${le} KB，无字数截断）`);
        }
      } catch {
        typeof window < "u" && window.__toastError ? window.__toastError("读取文件失败，请重试") : alert(x("读取文件失败，请重试"));
      }
    },
    U = () => {
      const K = E.name.trim(),
        W = E.content.trim();
      if (!K || !W) {
        typeof window < "u" && window.__toastError ? window.__toastError("请填写 Skill 名称和内容") : alert(x("请填写 Skill 名称和内容"));
        return;
      }
      const Q = Qhe({
        name: K,
        content: W
      });
      j(), I(!1), M({
        name: "",
        content: ""
      }), typeof window < "u" && window.__toastSuccess && window.__toastSuccess("已保存到 Skill 库，可在 Agent 节点中选用"), z(Q);
    },
    H = a ?? (r === "inline" ? "right" : "left"),
    Y = b ? `harness-composer-action ${N ? "is-selected" : ""}` : r === "compact" ? `sketch-chat-assistant-action-btn ${N ? "sketch-chat-assistant-action-btn--skill-active" : ""}` : `sketch-chat-agent-skill-btn ${N ? "sketch-chat-agent-skill-btn--active" : ""} ${n ? "sketch-chat-agent-skill-btn-dark" : ""}`;
  return c.jsxs("div", {
    className: `relative ${i}`,
    "data-chat-agent-skill-picker": !0,
    children: [c.jsxs("button", {
      ref: T,
      type: "button",
      className: Y,
      disabled: s,
      title: o || G,
      "aria-label": N ? `Skill：${N.name}` : x("调用 Skill"),
      "aria-expanded": p,
      onClick: K => {
        var Q;
        if (K.preventDefault(), K.stopPropagation(), s) return;
        const W = (Q = T.current) == null ? void 0 : Q.getBoundingClientRect();
        _(d !== "auto" ? d : W && window.innerHeight - W.bottom >= 340 ? "below" : "above"), m(q => !q);
      },
      onMouseDown: K => K.stopPropagation(),
      children: [c.jsx(dZ, {
        size: r === "inline" ? 12 : 14
      }), r !== "compact" ? c.jsx("span", {
        className: "sketch-chat-agent-skill-btn-label truncate max-w-[72px]",
        children: N ? N.name : "Skill"
      }) : null, b && c.jsx(Mi, {
        size: 12
      })]
    }), c.jsxs(yg, {
      open: p,
      anchorRef: T,
      isDark: n,
      placement: b ? "auto" : v,
      align: H,
      gap: 6,
      unstyled: !0,
      zIndex: 10350,
      dataPortalAttr: "data-chat-agent-skill-menu",
      className: b ? `harness-picker harness-skill-picker ${n ? "is-dark" : ""}` : `sketch-chat-agent-skill-menu ${w === "browse" ? "sketch-chat-agent-skill-menu--browse" : ""} ${n ? "sketch-chat-agent-skill-menu-dark" : ""}`,
      children: [c.jsxs("div", {
        className: "sketch-chat-agent-skill-menu-head",
        children: [c.jsx("span", {
          children: x(b ? "选择 Skill" : "Skill 库")
        }), c.jsxs("div", {
          className: "sketch-chat-agent-skill-menu-head-actions",
          children: [!C && w === "cache" ? c.jsxs("button", {
            type: "button",
            className: "sketch-chat-agent-skill-menu-add",
            onClick: V,
            title: x("手动添加 Skill 到库中"),
            children: [c.jsx(eo, {
              size: 12
            }), c.jsx("span", {
              children: x("添加")
            })]
          }) : null, c.jsx("button", {
            type: "button",
            className: "sketch-chat-agent-skill-menu-close",
            onClick: () => m(!1),
            "aria-label": x("关闭"),
            children: c.jsx(Na, {
              size: 14
            })
          })]
        })]
      }), C ? null : c.jsxs("div", {
        className: "sketch-chat-agent-skill-menu-tabs",
        children: [c.jsx("button", {
          type: "button",
          className: w === "cache" ? "is-active" : "",
          onClick: () => k("cache"),
          children: x(b ? "已保存" : "本地缓存")
        }), c.jsx("button", {
          type: "button",
          className: w === "browse" ? "is-active" : "",
          onClick: () => k("browse"),
          children: x(b ? "本地目录" : "本地浏览")
        }), l.length > 0 && c.jsx("button", {
          type: "button",
          className: w === "preset" ? "is-active" : "",
          onClick: () => k("preset"),
          children: x("已有预设")
        })]
      }), b && !C && w !== "browse" && c.jsxs("label", {
        className: "harness-picker-search",
        children: [c.jsx(mc, {
          size: 14
        }), c.jsx("input", {
          autoFocus: !0,
          value: f,
          onChange: K => y(K.target.value),
          placeholder: x("搜索 Skill")
        })]
      }), u && !C && w === "cache" ? c.jsxs("button", {
        type: "button",
        className: `sketch-chat-agent-skill-menu-create ${h ? "is-disabled" : ""}`,
        disabled: !!h,
        title: h || x("把当前对话蒸馏成可复用 Skill"),
        onClick: () => {
          h || (m(!1), u());
        },
        children: [c.jsx(eo, {
          size: 12
        }), c.jsxs("span", {
          children: [c.jsx("strong", {
            children: x("基于此对话创建 Skill")
          }), c.jsx("em", {
            children: x("Skill 模式会先问方向，再写成画布可执行 Skill")
          })]
        })]
      }) : null, C ? c.jsxs("div", {
        className: "sketch-chat-agent-skill-menu-form",
        children: [c.jsxs("div", {
          className: "sketch-chat-agent-skill-menu-form-head",
          children: [c.jsx("div", {
            className: "sketch-chat-agent-skill-menu-form-title",
            children: x("新建 Skill")
          }), c.jsxs("button", {
            type: "button",
            className: "sketch-chat-agent-skill-menu-form-import",
            onClick: L,
            title: x("从 .txt / .md 日志导入全文到内容区（不限字数）"),
            children: [c.jsx(ml, {
              size: 12
            }), c.jsx("span", {
              children: x("导入")
            })]
          }), c.jsx("input", {
            ref: R,
            type: "file",
            accept: ".txt,.md,text/plain,text/markdown",
            className: "hidden",
            "aria-hidden": !0,
            onChange: K => void D(K)
          })]
        }), c.jsx("input", {
          ref: P,
          type: "text",
          className: "sketch-chat-agent-skill-menu-form-input",
          placeholder: x("Skill 名称"),
          value: E.name,
          onChange: K => M(W => ({
            ...W,
            name: K.target.value
          })),
          onKeyDown: K => {
            K.key === "Escape" && O();
          }
        }), c.jsx("textarea", {
          className: "sketch-chat-agent-skill-menu-form-textarea rh-scroll-minimal",
          placeholder: x("Skill 内容（工作流说明、提示词等）"),
          value: E.content,
          onChange: K => M(W => ({
            ...W,
            content: K.target.value
          })),
          rows: 4,
          onKeyDown: K => {
            K.key === "Escape" && O();
          }
        }), c.jsxs("div", {
          className: "sketch-chat-agent-skill-menu-form-actions",
          children: [c.jsx("button", {
            type: "button",
            className: "sketch-chat-agent-skill-menu-form-save",
            onClick: U,
            children: x("保存到 Skill 库")
          }), c.jsx("button", {
            type: "button",
            className: "sketch-chat-agent-skill-menu-form-cancel",
            onClick: O,
            children: x("取消")
          })]
        })]
      }) : null, w === "browse" && !C ? c.jsx(fHn, {
        isDark: n,
        variant: "menu",
        selectedId: e,
        applyLabel: "选用",
        onApply: K => z(wYe(K))
      }) : null, N && !C ? c.jsx("button", {
        type: "button",
        className: "sketch-chat-agent-skill-menu-clear",
        onClick: () => z(null),
        children: x("清除当前 Skill")
      }) : null, w === "cache" && !C && F.length === 0 ? c.jsx("p", {
        className: "sketch-chat-agent-skill-menu-empty",
        children: x(b ? f ? "没有匹配的 Skill" : "添加一个 Skill，或从本地目录选用。" : "暂无缓存 Skill。点右上角「添加」，或切到「本地浏览」读取电脑文件夹里的 .md。")
      }) : w !== "browse" && !C ? c.jsx("ul", {
        className: "sketch-chat-agent-skill-menu-list",
        children: F.map(K => {
          const W = K.id === e,
            Q = K.content.replace(/\s+/g, " ").trim().slice(0, 120);
          return c.jsx("li", {
            children: c.jsxs("button", {
              type: "button",
              className: W ? "sketch-chat-agent-skill-menu-item sketch-chat-agent-skill-menu-item--active" : "sketch-chat-agent-skill-menu-item",
              onClick: () => z(K),
              children: [c.jsxs("span", {
                className: "sketch-chat-agent-skill-menu-item-name",
                children: [W ? c.jsx(io, {
                  size: 12,
                  className: "shrink-0"
                }) : null, c.jsx("span", {
                  className: "truncate",
                  children: K.name
                })]
              }), Q ? c.jsx("span", {
                className: "sketch-chat-agent-skill-menu-item-preview",
                children: Q
              }) : null]
            })
          }, K.id);
        })
      }) : null]
    })]
  });
}

function Mfa({
  prefs: e,
  onChange: t,
  imageConfigs: n,
  isDark: r
}) {
  on();
  const [a, i] = g.useState(!1),
    o = g.useRef(null);
  return g.useEffect(() => {
    if (!a) return;
    const s = d => {
        var h;
        const u = d.target;
        (h = o.current) != null && h.contains(u) || u != null && u.closest("[data-harness-image-prefs], [data-platform-group-picker-menu]") || i(!1);
      },
      l = d => {
        var u;
        d.key === "Escape" && (i(!1), (u = o.current) == null || u.focus());
      };
    return document.addEventListener("pointerdown", s, !0), document.addEventListener("keydown", l), () => {
      document.removeEventListener("pointerdown", s, !0), document.removeEventListener("keydown", l);
    };
  }, [a]), c.jsxs(c.Fragment, {
    children: [c.jsxs("button", {
      ref: o,
      type: "button",
      className: "harness-composer-action",
      title: x("图片生成设置"),
      "aria-label": x("图片生成设置"),
      "aria-expanded": a,
      "aria-haspopup": "dialog",
      onClick: () => i(!a),
      children: [c.jsx(lo, {
        size: 14
      }), c.jsx("span", {
        children: x("生图")
      }), c.jsx(Mi, {
        size: 12
      })]
    }), c.jsx(yg, {
      open: a,
      anchorRef: o,
      isDark: r,
      placement: "auto",
      gap: 8,
      unstyled: !0,
      zIndex: 10250,
      dataPortalAttr: "data-harness-image-prefs",
      className: `harness-picker harness-image-picker ${r ? "is-dark" : ""}`,
      children: c.jsx(f7t, {
        prefs: e,
        onChange: s => t({
          ...s,
          mediaType: "image"
        }),
        imageConfigs: n,
        isDark: r,
        onClose: () => i(!1)
      })
    })]
  });
}

const Pfa = ["帮我梳理一个创作思路", "把这段文案润色得更自然", "总结这段内容的重点", "帮我优化图片生成提示词"];

function HXt(e) {
  var t;
  return Array.from(((t = e.dataTransfer) == null ? void 0 : t.types) || []).includes("Files");
}

function WXt(e) {
  var a, i;
  const t = String(e.preview || "").trim();
  if (!t) return "none";
  const n = !!(e.isVideo || (a = e.type) != null && a.startsWith("video/"));
  return n && (t.startsWith("blob:") || /\/videos\//i.test(t) || /\.(mp4|webm|mov|m4v|ogg)(\?|#|$)/i.test(t)) ? "video" : n || e.isImage || (i = e.type) != null && i.startsWith("image/") ? "image" : "none";
}

function Rfa({
  value: e,
  onChange: t,
  files: n,
  onFilesChange: r,
  onOpenAttachment: a,
  quotedFrom: i,
  onClearQuote: o,
  modelId: s,
  onModelChange: l,
  reasoningEffort: d,
  onReasoningChange: u,
  sending: h,
  voiceEnabled: p = !0,
  placement: m = "home",
  productMode: f = "chat",
  workspaceLabel: y,
  workspacePath: b,
  onPickWorkspace: v,
  onSelectWorkspace: _,
  permission: w = "ask",
  onPermissionChange: k,
  preset: A = "standard",
  onPresetChange: S,
  onOpenHarnessSettings: C,
  platformGroup: I = "",
  onPlatformGroupChange: E,
  historyCount: M = 50,
  onHistoryChange: T,
  onSubmit: P,
  onCancel: R,
  canvasSkillId: j,
  onCanvasSkillChange: B
}) {
  var He;
  const F = on(),
    N = g.useMemo(() => Pfa.map(Ve => x(Ve)), [F]),
    {
      isDark: G
    } = Oy(),
    [z, V] = g.useState(DOn),
    O = g.useRef(null),
    L = g.useRef(null),
    D = g.useRef(null),
    U = g.useRef(0),
    [H, Y] = g.useState(0),
    [K, W] = g.useState(NX),
    [Q, q] = g.useState(null),
    [ne, de] = g.useState(!1),
    [le, J] = g.useState(""),
    [pe, ce] = g.useState(0),
    we = g.useRef(!0);
  g.useEffect(() => (we.current = !0, () => {
    we.current = !1;
  }), []);
  const [X, Z] = g.useState(!1),
    [re, fe] = g.useState(!1),
    ye = nNt(),
    {
      isModelHiddenInList: ie
    } = BZ(),
    ae = !!i || n.length > 0 || e.includes(`
`) || e.length > 72;
  g.useEffect(() => {
    var Ve;
    i && ((Ve = O.current) == null || Ve.focus());
  }, [i]);
  const be = g.useMemo(() => K.filter(Ve => Ve.id === s || !ie(Ve.id)), [K, s, ie]),
    {
      visibleModels: Ee,
      selectedChannel: xe,
      onSelectChannel: he,
      showHaiyiChannel: ue
    } = m7t(be),
    ge = K.find(Ve => Ve.id === s),
    _e = Mu(s),
    ke = !!(E && !_e && ge && (f === "local-skill" || od(ge, Qa.getGlobalBaseUrl()))),
    ve = aQe(_e),
    Te = (He = ve.catalog) == null ? void 0 : He.models.find(Ve => `codex-chat:${Ve.model}` === s),
    Ne = g.useMemo(() => mRt(Te), [Te]),
    me = _e || TT(s, ge == null ? void 0 : ge.modelName),
    [Ae, Fe] = uYe(),
    Me = Mxe({
      modelId: s,
      url: ge == null ? void 0 : ge.url,
      hasVideo: n.some(Ve => !!Ve.isVideo || String(Ve.type || "").startsWith("video/"))
    }),
    Re = f === "chat" && !_e && !hI(s) && !Eb(s) && !!T,
    $e = g.useCallback(() => {
      const Ve = O.current;
      Ve && (Ve.style.height = "36px", Ve.style.height = `${Math.min(140, Math.max(36, Ve.scrollHeight))}px`);
    }, []);
  g.useEffect(() => {
    $e();
  }, [$e, e]), g.useEffect(() => {
    const Ve = () => W(NX());
    Ve(), window.addEventListener(Jj, Ve);
    const it = Qa.subscribe(Ve);
    return () => {
      window.removeEventListener(Jj, Ve), it();
    };
  }, []), g.useEffect(() => {
    Ee.length !== 0 && (!s || !Ee.some(Ve => Ve.id === s)) && l(Ee[0].id);
  }, [s, Ee, l]), g.useEffect(() => {
    !_e || !Ne.length || Ne.some(Ve => Ve.value === d) || u((Te == null ? void 0 : Te.defaultReasoningEffort) || Ne[0].value);
  }, [_e, Ne, d, u, Te]), g.useEffect(() => {
    if (!X) {
      fe(!1);
      return;
    }
    const Ve = it => {
      var Ft;
      const It = it.target;
      It && ((Ft = D.current) != null && Ft.contains(It) || It.closest("[data-studio-workspace-menu]") || Z(!1));
    };
    return document.addEventListener("pointerdown", Ve, !0), () => document.removeEventListener("pointerdown", Ve, !0);
  }, [X]);
  const rt = zQe(),
    nt = re ? rt : rt.slice(0, 5),
    ze = Math.max(0, rt.length - 5),
    Le = Ve => {
      var it;
      return (it = ye.find(It => It.kind === "local-skill" && e_(It.rootPath, Ve))) == null ? void 0 : it.updatedAt;
    },
    Ke = QKe(),
    Xe = (Ve = !1) => {
      if (pe || n.some(It => It._pendingToken)) {
        J("正在读取附件，完成后即可发送");
        return;
      }
      if (f === "local-skill" && !y) {
        J("选择一个本地工作区以继续"), rt.length ? Z(!0) : v == null || v();
        return;
      }
      const it = e.trim() || (n.length ? "" : m === "home" && f === "chat" && N[H] || "");
      if (!it && n.length === 0) {
        J(m === "thread" ? "先写一句后续要求，或附上参考文件" : "先写一句创作说明，或附上参考文件");
        return;
      }
      J(""), P(it, f === "local-skill" && h ? Ve ? Ke.busySend !== "interrupt" : Ke.busySend === "interrupt" : void 0);
    },
    De = Ve => {
      const it = my - n.length;
      if (it <= 0) {
        J(`最多只能附加 ${my} 个文件，请先移除部分附件`);
        return;
      }
      Ve.length > it ? J(`还可以再附加 ${it} 个文件（最多 ${my} 个）`) : J(""), ce(It => It + 1), uNe(Ve.slice(0, Math.max(0, it)), n.length, It => {
        we.current && r(It);
      }, {
        warnUnsupported: !0
      }).finally(() => {
        we.current && ce(It => It - 1);
      });
    },
    Ye = () => {
      U.current = 0, de(!1);
    },
    Ce = h ? f === "local-skill" ? Ke.busySend === "queue" ? "补充要求，发送后加入队列" : "补充要求，发送后停止当前轮并处理" : "处理中…" : i ? "描述你想如何修改或使用这段内容" : f === "local-skill" ? y ? m === "thread" ? "提出后续变更要求" : `我们要在 ${y} 中构建什么？` : "选择本地工作区后开始" : m === "thread" ? "继续描述你想改的地方" : "";
  return c.jsxs("div", {
    className: "studio-composer",
    "data-chat-file-drop-zone": "studio-home",
    "data-composer-placement": m,
    "data-composer-mode": f,
    "data-composer-layout": ae ? "expanded" : "single-line",
    "data-composer-drag-active": ne ? "true" : "false",
    "data-composer-busy": h ? "true" : "false",
    onDragEnter: Ve => {
      h && f !== "local-skill" || !HXt(Ve) || (Ve.preventDefault(), U.current += 1, de(!0));
    },
    onDragOver: Ve => {
      h && f !== "local-skill" || !HXt(Ve) || (Ve.preventDefault(), Ve.dataTransfer.dropEffect = "copy");
    },
    onDragLeave: () => {
      U.current = Math.max(0, U.current - 1), U.current === 0 && de(!1);
    },
    onDrop: Ve => {
      Ve.preventDefault(), Ve.stopPropagation(), Ye(), !(h && f !== "local-skill") && De(Array.from(Ve.dataTransfer.files || []));
    },
    onDragEnd: Ye,
    children: [c.jsxs("div", {
      className: "studio-composer__box",
      children: [c.jsx("div", {
        className: "studio-composer-drop",
        "aria-hidden": !ne,
        children: x("拖放到此处以附加")
      }), i && c.jsx(XGn, {
        quote: i,
        onClear: o
      }), n.length ? c.jsxs("div", {
        className: "studio-attach-strip",
        children: [c.jsx("div", {
          className: "studio-attach-scroll",
          children: n.map((Ve, it) => c.jsxs("div", {
            className: "studio-attach-chip",
            children: [WXt(Ve) === "video" ? c.jsx("video", {
              src: Ve.preview,
              muted: !0,
              playsInline: !0,
              preload: "metadata"
            }) : WXt(Ve) === "image" ? c.jsx("img", {
              src: Ve.preview,
              alt: Ve.displayName || Ve.name
            }) : a && !Ve.isImage && !Ve.isVideo ? c.jsx("button", {
              type: "button",
              className: "studio-attach-read",
              title: x("阅读 {0}", Ve.displayName || Ve.name),
              onClick: () => a(Ve),
              children: Ve.displayName || Ve.name || x("附件")
            }) : c.jsx("span", {
              children: Ve.displayName || Ve.name || x("附件")
            }), c.jsx("button", {
              type: "button",
              "aria-label": x("移除附件"),
              onClick: () => {
                r(It => (KN(It[it]), It.filter((Ft, We) => We !== it))), J("");
              },
              children: c.jsx(Na, {
                size: 10,
                strokeWidth: 2.4
              })
            })]
          }, `${Ve._assetId || Ve.name || "f"}-${it}`))
        }), n.length > 1 ? c.jsx("button", {
          type: "button",
          className: "studio-attach-clear",
          onClick: () => {
            r(Ve => (Ez(Ve), [])), J("");
          },
          children: x("清除")
        }) : null]
      }) : null, c.jsxs("div", {
        className: "studio-composer-field",
        children: [e ? null : Ce ? c.jsx("span", {
          className: "studio-composer-placeholder",
          children: x(Ce)
        }) : c.jsx("button", {
          type: "button",
          className: "studio-composer-placeholder",
          onClick: () => t(N[H] || ""),
          children: c.jsx(qVn, {
            text: N,
            onActiveIndexChange: Y
          }, F)
        }), c.jsx("textarea", {
          ref: O,
          value: e,
          onChange: Ve => {
            J(""), t(Ve.target.value);
          },
          onPaste: Ve => {
            var It;
            const it = Array.from(((It = Ve.clipboardData) == null ? void 0 : It.files) || []);
            it.length && (Ve.preventDefault(), De(it));
          },
          onKeyDown: Ve => {
            Ve.key === "Enter" && !Ve.shiftKey && !Ve.nativeEvent.isComposing && (f !== "local-skill" || Ke.sendKey === "enter" || Ve.ctrlKey || Ve.metaKey) && (Ve.preventDefault(), h && f !== "local-skill" ? R() : Xe(f === "local-skill" && (Ke.sendKey === "enter" || Ve.altKey) && (Ve.ctrlKey || Ve.metaKey)));
          },
          "aria-label": x(m === "thread" ? "后续要求" : "创作说明")
        })]
      }), pe || le ? c.jsx("p", {
        className: "studio-composer-hint",
        role: "status",
        children: pe ? x("正在读取附件…") : le
      }) : null, c.jsxs("div", {
        className: "studio-composer-bar",
        children: [c.jsxs("div", {
          className: "studio-composer-bar-left",
          children: [c.jsx("button", {
            type: "button",
            className: "studio-icon-btn",
            "aria-label": x("上传图片或视频"),
            title: x("上传图片或视频（最多{0}个）", my),
            disabled: h && f !== "local-skill",
            onClick: () => {
              var Ve;
              return (Ve = L.current) == null ? void 0 : Ve.click();
            },
            children: c.jsx(eo, {
              size: 16,
              strokeWidth: 1.75
            })
          }), c.jsx("input", {
            ref: L,
            type: "file",
            accept: OVn,
            multiple: !0,
            className: "hidden",
            onChange: Ve => {
              const it = Array.from(Ve.target.files || []);
              Ve.target.value = "", it.length && De(it);
            }
          }), c.jsx(Th, {
            scopeId: "studio-home-chat",
            dropdownType: "studio-home-chat-model",
            value: s,
            models: be,
            isDark: G,
            activeDropdown: Q,
            setActiveDropdown: q,
            onSelect: l,
            isModelHiddenInList: ie,
            variant: f === "local-skill" ? "harness" : "canvas",
            menuPlacement: f === "local-skill" ? "auto" : "above",
            menuMaxHeight: f === "local-skill" ? 360 : void 0,
            showChannelBar: !0,
            channelBarPlacement: "external",
            buttonVariant: "transparent",
            className: "studio-home-model-picker !flex-none",
            menuClassName: "studio-content-menu"
          }), Me ? c.jsx(hYe, {
            nodeId: "studio-home-chat",
            dropdownType: "studio-home-mimo-video-send",
            value: Ae,
            isDark: G,
            activeDropdown: Q,
            setActiveDropdown: q,
            onSelect: Fe,
            menuPlacement: "above",
            buttonVariant: "bare",
            buttonClassName: "studio-home-effort-picker shrink-0 text-xs"
          }) : null, me ? c.jsx(dT, {
            nodeId: "studio-home-chat",
            dropdownType: "studio-home-reasoning",
            optionsOverride: _e ? Ne : void 0,
            unavailableMessage: _e ? ve.loading ? "正在读取 Codex 思考档位…" : ve.error || "当前 Codex 未提供此模型的思考档位，请检测 Chat 连接" : void 0,
            onRetry: _e ? ve.refresh : void 0,
            value: d,
            isDark: G,
            activeDropdown: Q,
            setActiveDropdown: q,
            onSelect: u,
            menuPlacement: "above",
            buttonVariant: "bare",
            buttonClassName: "studio-home-effort-picker shrink-0 text-xs",
            modelId: s,
            modelName: ge == null ? void 0 : ge.modelName
          }) : null, f === "local-skill" ? c.jsx(Mfa, {
            prefs: z,
            onChange: Ve => {
              V(Ve), RDn(Ve);
            },
            imageConfigs: Qa.getConfigsByType("Image"),
            isDark: G
          }) : null, f === "local-skill" ? c.jsx(kYe, {
            variant: "harness",
            isDark: G,
            value: j,
            onChange: Ve => B == null ? void 0 : B(Ve),
            menuPlacement: "auto",
            disabled: h,
            title: x("选择本次对话使用的 Skill")
          }) : null]
        }), c.jsxs("div", {
          className: `studio-composer-bar-right${G ? " sketch-chat-toolbar-dark" : ""}`,
          children: [c.jsx(XIe, {
            kind: "chat",
            value: e,
            onChange: t,
            isDark: G,
            scopeId: "studio-home-chat",
            mediaCount: n.length,
            disabled: h,
            variant: "icon",
            fallbackModelId: _e ? void 0 : s,
            reasoningEffort: d
          }), p && c.jsx(JIe, {
            nodeId: "studio-home-chat",
            value: e,
            onChange: t,
            isDark: G,
            disabled: h
          }), h && f === "local-skill" && (e.trim() || n.length > 0) ? c.jsx("button", {
            type: "button",
            className: "studio-send",
            title: Ke.busySend === "queue" ? x("加入队列") : x("停止当前轮并发送"),
            "aria-label": Ke.busySend === "queue" ? x("加入队列") : x("停止当前轮并发送"),
            onClick: () => Xe(),
            children: c.jsx(Gc, {
              size: 16
            })
          }) : null, c.jsx("button", {
            type: "button",
            className: "studio-send",
            onClick: () => {
              h ? R() : Xe();
            },
            disabled: h ? !1 : pe > 0 || n.some(Ve => !!Ve._pendingToken) || !e.trim() && n.length === 0,
            "aria-label": x(h ? "停止" : "发送"),
            children: h ? c.jsx(kf, {
              size: 12,
              strokeWidth: 0,
              fill: "currentColor"
            }) : c.jsx(Gc, {
              size: 16,
              strokeWidth: 2
            })
          })]
        })]
      })]
    }), c.jsxs("div", {
      className: "studio-composer-dock",
      children: [c.jsx(kfa, {
        mode: f,
        locked: m === "thread"
      }), Re ? c.jsx(qs, {
        scopeId: "studio-home-chat",
        dropdownType: "studio-home-history",
        value: String(M),
        options: xUn,
        isDark: G,
        activeDropdown: Q,
        setActiveDropdown: q,
        onSelect: Ve => T == null ? void 0 : T(Number(Ve)),
        menuPlacement: "above",
        buttonVariant: "bare",
        className: "studio-home-history-picker",
        menuClassName: "sketch-chat-popover studio-content-menu",
        minMenuWidth: 120
      }) : null, f === "local-skill" ? c.jsxs(c.Fragment, {
        children: [c.jsxs("button", {
          ref: D,
          type: "button",
          className: `studio-pill studio-home-workspace-picker${X ? " is-open" : ""}`,
          "aria-haspopup": "menu",
          "aria-expanded": X,
          title: b || y || x("选择本地工作区"),
          onClick: () => Z(Ve => !Ve),
          children: [c.jsx(_h, {
            size: 14,
            strokeWidth: 1.75
          }), c.jsx("span", {
            children: y ? W7(y, 5) : x("选择工作区")
          }), X ? c.jsx(Mi, {
            size: 12,
            strokeWidth: 2
          }) : c.jsx(ss, {
            size: 12,
            strokeWidth: 2
          })]
        }), c.jsx(yg, {
          open: X,
          anchorRef: D,
          isDark: G,
          placement: "above",
          dataPortalAttr: "data-studio-workspace-menu",
          className: "studio-workspace-menu studio-content-menu",
          children: rt.length === 0 ? c.jsxs("button", {
            type: "button",
            onClick: () => {
              Z(!1), v == null || v();
            },
            children: [c.jsx(_h, {
              size: 15,
              strokeWidth: 1.75
            }), c.jsx("span", {
              children: x("选择本机工作区目录")
            })]
          }) : c.jsxs(c.Fragment, {
            children: [nt.map(Ve => {
              const it = e_(Ve, b),
                It = Le(Ve);
              return c.jsxs("button", {
                type: "button",
                className: it ? "is-active" : "",
                title: Ve,
                onClick: () => {
                  it || _ == null || _(Ve), Z(!1);
                },
                children: [c.jsx(_h, {
                  size: 15,
                  strokeWidth: 1.75
                }), c.jsx("span", {
                  children: W6(Ve)
                }), It ? c.jsx("em", {
                  className: "studio-workspace-menu__time",
                  children: QU(It)
                }) : null]
              }, Ve);
            }), ze > 0 ? c.jsx("button", {
              type: "button",
              className: "studio-workspace-menu__more",
              onClick: () => fe(Ve => !Ve),
              children: re ? x("收起显示") : x("展开显示（{0}）", ze)
            }) : null, c.jsx("div", {
              role: "separator"
            }), c.jsxs("button", {
              type: "button",
              onClick: () => {
                Z(!1), v == null || v();
              },
              children: [c.jsx(eo, {
                size: 15,
                strokeWidth: 1.75
              }), c.jsx("span", {
                children: x("添加本机工作区")
              })]
            })]
          })
        })]
      }) : null, c.jsxs("div", {
        className: "studio-composer-dock-end",
        children: [f === "local-skill" ? c.jsxs(c.Fragment, {
          children: [c.jsx("div", {
            className: "studio-home-preset-picker",
            children: c.jsx(_fa, {
              disabled: h,
              value: A,
              onChange: Ve => S == null ? void 0 : S(Ve),
              labelLimit: 5,
              isDark: G
            })
          }), c.jsx("button", {
            type: "button",
            className: "studio-pill",
            "aria-label": x("Harness 设置"),
            title: x("对话设置、插件和 Agent 预设"),
            onClick: C,
            children: c.jsx(Pj, {
              size: 14
            })
          }), c.jsx(WVn, {
            value: w,
            onChange: Ve => k == null ? void 0 : k(Ve),
            isDark: G,
            workspaceLabel: y,
            showCanvasAccess: !1,
            coding: !0
          })]
        }) : null, ke ? c.jsx(Ku, {
          nodeId: f === "local-skill" ? "studio-home-local-skill" : "studio-home-chat",
          platformGroup: I,
          modelName: ge == null ? void 0 : ge.modelName,
          modelId: s,
          modelConfigId: s,
          isDark: G,
          onGroupChange: E,
          compact: !0,
          truncateHead3: f === "local-skill",
          truncateHeadLen: f === "local-skill" ? 5 : void 0,
          buttonVariant: "bare",
          persistModelSettings: f !== "local-skill",
          menuPlacement: "above",
          className: "studio-home-key-picker",
          menuClassName: "studio-content-menu"
        }) : null, c.jsx("div", {
          className: "studio-composer-dock-channels",
          children: c.jsx(m9, {
            isDark: G,
            selected: xe,
            onSelect: he,
            channels: c7t,
            showHaiyi: ue,
            showCustomProviders: !1
          })
        })]
      })]
    })]
  });
}

function R7t({
  isDark: e,
  switcherRef: t,
  onCanvasClick: n,
  onCanvasContextMenu: r,
  onBrowserClick: a,
  surface: i,
  canvasTitle: o
}) {
  on();
  const s = qQe(),
    l = i ?? s,
    d = l === "canvas",
    u = l === "browser",
    h = e ? "bg-[#141416] border-white/[0.08]" : "bg-white/90 border-black/8",
    p = e ? "text-white/50 hover:text-white/80" : "text-zinc-500 hover:text-zinc-800",
    m = e ? "bg-transparent text-white" : "bg-transparent text-zinc-900";
  return c.jsxs("div", {
    ref: t,
    className: `workspace-switcher flex items-center rounded-full border p-[2px] pointer-events-auto ${h}`,
    role: "tablist",
    "aria-label": x("工作区"),
    children: [c.jsx("button", {
      type: "button",
      role: "tab",
      "aria-selected": d,
      title: o ?? x(d ? "工具栏布局" : "画布"),
      onClick: f => {
        f.currentTarget.blur(), (n ?? YBe)(f);
      },
      onContextMenu: r,
      className: `grid h-7 w-7 place-items-center rounded-[9px] border-0 cursor-pointer transition-colors ${d ? m : `bg-transparent ${p}`}`,
      children: c.jsx(LEn, {
        size: 14,
        strokeWidth: 1.75
      })
    }), c.jsxs("button", {
      type: "button",
      role: "tab",
      "aria-selected": u,
      onClick: f => {
        f.currentTarget.blur(), (a ?? Cla)(f);
      },
      className: `flex h-7 items-center gap-1 rounded-[9px] border-0 bg-transparent pl-1.5 pr-2.5 cursor-pointer transition-colors ${u ? "" : p}`,
      children: [c.jsx(i9, {
        size: 14,
        strokeWidth: 1.75,
        className: u ? e ? "text-white/50" : "text-zinc-500" : void 0
      }), c.jsx("span", {
        className: `text-[13px] leading-none ${u ? e ? "text-white" : "text-zinc-900" : ""}`,
        children: x("浏览器")
      })]
    })]
  });
}

const N7t = "studio-project-privacy",
  Qyt = new Set(),
  gHn = () => {
    try {
      return localStorage.getItem(N7t) === "1";
    } catch {
      return !1;
    }
  };

let j7t = gHn();

const yHn = () => Qyt.forEach(e => e()),
  Nfa = e => (Qyt.add(e), () => {
    Qyt.delete(e);
  }),
  jfa = () => j7t;

function Dfa(e) {
  j7t = e;
  try {
    localStorage.setItem(N7t, e ? "1" : "0");
  } catch {}
  yHn();
}

typeof window < "u" && window.addEventListener("storage", e => {
  (e.key === N7t || e.key === null) && (j7t = gHn(), yHn());
});

const PT = () => g.useSyncExternalStore(Nfa, jfa, () => !1),
  wp = (e, t, n = "未命名项目") => t ? "已隐藏项目" : e || n,
  bHn = "qiaodoumayi_studio_home_conversation_view";

function uE(e) {
  return e.trim().replace(/\\/g, "/").replace(/\/+$/, "").toLowerCase();
}

function vHn() {
  const e = {
    groupBy: "workspace",
    orderBy: "updated",
    archivedFilter: "hide",
    workspaceOrder: [],
    threadOrder: [],
    workspaceNames: {},
    collapsedWorkspaces: [],
    expandedThreadLists: []
  };
  try {
    const t = JSON.parse(localStorage.getItem(bHn) || "{}");
    if (!t || typeof t != "object") return e;
    for (const n of ["workspaceOrder", "threadOrder", "collapsedWorkspaces", "expandedThreadLists"]) Array.isArray(t[n]) && (e[n] = [...new Set(t[n].filter(r => typeof r == "string"))]);
    ["workspace", "workspace-tree", "flat"].includes(t.groupBy) && (e.groupBy = t.groupBy), ["manual", "updated"].includes(t.orderBy) && (e.orderBy = t.orderBy), ["hide", "all", "only"].includes(t.archivedFilter) && (e.archivedFilter = t.archivedFilter), t.workspaceNames && typeof t.workspaceNames == "object" && !Array.isArray(t.workspaceNames) && (e.workspaceNames = Object.fromEntries(Object.entries(t.workspaceNames).filter(n => typeof n[1] == "string" && !!n[1].trim())));
  } catch {}
  return e;
}

let Sve = vHn();

const Yyt = new Set();

function cL(e) {
  Sve = {
    ...Sve,
    ...e
  };
  try {
    localStorage.setItem(bHn, JSON.stringify(Sve));
  } catch {}
  Yyt.forEach(t => t());
}

function wHn() {
  return g.useSyncExternalStore(e => (Yyt.add(e), () => Yyt.delete(e)), () => Sve, () => Sve);
}

function Xyt(e, t) {
  const n = new Set(e);
  return [...new Set([...t.filter(r => n.has(r)), ...e])];
}

function qXt(e, t, n, r) {
  const a = Xyt(e, t);
  return n === r || !a.includes(n) || !a.includes(r) || (a.splice(a.indexOf(n), 1), a.splice(a.indexOf(r), 0, n)), a;
}

function y_e(e, t) {
  return t[uE(e)] || W6(e);
}

function Lfa(e, t) {
  const n = uE(e);
  return t.filter(r => n.startsWith(`${uE(r)}/`)).sort((r, a) => uE(a).length - uE(r).length)[0];
}

const Ofa = ["qiaodoumayi_chat_sessions_index", "qiaodoumayi_chat_sessions"];

function Bfa() {
  const e = new Set();
  for (const t of Ofa) try {
    const n = JSON.parse(localStorage.getItem(t) || "null");
    if (!Array.isArray(n)) continue;
    for (const r of n) {
      const a = String((r == null ? void 0 : r.id) || "").trim();
      a && a !== "default" && e.add(a);
    }
  } catch {}
  return e;
}

function Ffa() {
  const e = new Set();
  try {
    const t = JSON.parse(localStorage.getItem("qiaodoumayi_studio_home_chat") || "[]");
    Array.isArray(t) && t.length && e.add("studio-home-chat");
  } catch {}
  try {
    const t = JSON.parse(localStorage.getItem("qiaodoumayi_studio_home_chat_threads") || "{}");
    if (t && typeof t == "object" && !Array.isArray(t)) for (const [n, r] of Object.entries(t)) n && Array.isArray(r) && e.add(n);
  } catch {}
  return e;
}

function xHn(e, t) {
  const n = Bfa(),
    r = Ffa();
  return e.filter(a => !Tx(a) || n.has(a.id) ? !1 : a.kind === "chat" ? !a.rootPath && r.has(a.id) : a.kind === "local-skill" && !!a.rootPath && t.some(i => e_(i, a.rootPath)));
}

function _Hn(e, t, n, r = "", a = "local-skill") {
  e = e.filter(Tx);
  const i = Xyt(e.map(y => y.id), n.threadOrder),
    o = Xyt(t.map(uE), n.workspaceOrder),
    s = [...e].sort((y, b) => +(!!b.pinned && !b.archived) - +(!!y.pinned && !y.archived) || (n.orderBy === "updated" ? b.updatedAt - y.updatedAt : i.indexOf(y.id) - i.indexOf(b.id))),
    l = r.replace(/\0/g, "").trim().slice(0, 500).toLocaleLowerCase(),
    d = a === "home" ? new Set(["chat", "local-skill"]) : new Set([a]),
    u = s.filter(y => d.has(y.kind) && (n.archivedFilter === "all" || (n.archivedFilter === "only" ? !!y.archived : !y.archived)) && (!l || `${y.title}
${y.rootPath ? y_e(y.rootPath, n.workspaceNames) : ""}`.toLocaleLowerCase().includes(l))),
    h = (d.has("local-skill") ? t : []).map(y => ({
      path: y,
      key: uE(y),
      name: y_e(y, n.workspaceNames),
      threads: u.filter(b => b.kind === "local-skill" && e_(b.rootPath, y)),
      children: []
    }));
  h.sort((y, b) => o.indexOf(y.key) - o.indexOf(b.key));
  const p = new Map(h.map(y => [y.key, y])),
    m = [];
  for (const y of h) {
    const b = n.groupBy === "workspace-tree" ? Lfa(y.path, t) : void 0;
    b ? p.get(uE(b)).children.push(y) : m.push(y);
  }
  const f = y => (y.children = y.children.filter(f), n.archivedFilter !== "only" || y.threads.length > 0 || y.children.length > 0);
  return {
    groups: m.filter(f),
    visible: u,
    ungrouped: u.filter(y => !y.rootPath || y.kind !== "local-skill" || !t.some(b => e_(b, y.rootPath))),
    threadOrder: i,
    workspaceOrder: o
  };
}

function zfa(e, t, n, r, a = 5) {
  if (t) return e;
  let i = 0;
  return e.filter(o => o.id === n || r(o) || i++ < a);
}

function Jyt({
  projects: e,
  origin: t = "home",
  localSkill: n = !1,
  onHomeBrowser: r
}) {
  on();
  const {
      isDark: a
    } = Oy(),
    i = PT(),
    o = UQe(),
    s = wHn(),
    l = n ? zQe() : [],
    [d, u] = g.useState(!1),
    h = g.useRef(null);
  return g.useEffect(() => {
    if (!d) return;
    const p = f => {
        var y;
        (y = h.current) != null && y.contains(f.target) || u(!1);
      },
      m = f => {
        f.key === "Escape" && u(!1);
      };
    return document.addEventListener("mousedown", p), document.addEventListener("keydown", m), () => {
      document.removeEventListener("mousedown", p), document.removeEventListener("keydown", m);
    };
  }, [d]), c.jsxs("div", {
    className: "studio-home-switch",
    ref: h,
    children: [c.jsx(R7t, {
      isDark: a,
      surface: "none",
      canvasTitle: n ? o.rootPath ? y_e(o.rootPath, s.workspaceNames) : "选择工作区" : "选择画布",
      onCanvasClick: () => u(p => !p),
      onBrowserClick: () => {
        u(!1), n ? r == null || r() : Wla(t);
      }
    }), d ? c.jsx("div", {
      className: "studio-home-switch-menu",
      role: "menu",
      "aria-label": x(n ? "选择首页工作区" : "选择画布"),
      children: n ? c.jsxs(c.Fragment, {
        children: [l.map(p => c.jsx("button", {
          type: "button",
          role: "menuitem",
          onClick: () => {
            u(!1), $Ie(p);
          },
          children: c.jsx("span", {
            className: "studio-home-switch-name",
            children: y_e(p, s.workspaceNames)
          })
        }, p)), c.jsx("button", {
          type: "button",
          role: "menuitem",
          onClick: () => {
            u(!1), KU();
          },
          children: x("添加工作区")
        })]
      }) : e.length === 0 ? c.jsx("div", {
        className: "studio-home-switch-empty",
        children: x("还没有画布")
      }) : e.map(p => {
        const m = wp(p.name, i);
        return c.jsxs("button", {
          type: "button",
          role: "menuitem",
          onClick: () => {
            u(!1), iP(p.id, p.name);
          },
          children: [c.jsx("span", {
            className: "studio-home-switch-name",
            children: m
          }), c.jsx("span", {
            className: "studio-home-switch-time",
            children: QU(p.updatedAt)
          })]
        }, p.id);
      })
    }) : null]
  });
}

let kHn = null;

const Zyt = new Set(),
  KXt = () => kHn;

function Ufa(e) {
  return Zyt.add(e), () => {
    Zyt.delete(e);
  };
}

function X6(e) {
  kHn = e, Zyt.forEach(t => t());
}

function ebt(e, t) {
  var r;
  const n = ((r = xy().find(a => a.id === t)) == null ? void 0 : r.title) || (e === "chat" ? "新对话" : "Harness 会话");
  X6({
    mode: "save",
    source: {
      kind: e,
      sourceId: t,
      name: n,
      capture: async a => {
        const i = yKe(e, t),
          {
            captureLibraryThread: o
          } = await Ie(async () => {
            const {
              captureLibraryThread: s
            } = await Promise.resolve().then(() => msr);
            return {
              captureLibraryThread: s
            };
          }, void 0, import.meta.url);
        return {
          content: await o(e, t, a),
          sourceStamp: i
        };
      }
    }
  });
}

function $fa({
  project: e,
  cover: t
}) {
  on();
  const n = PT(),
    r = wp(e.name, n),
    a = () => iP(e.id, e.name);
  return c.jsxs("div", {
    className: "studio-card",
    children: [c.jsx("button", {
      type: "button",
      className: "studio-card-thumb",
      onClick: a,
      "aria-label": x("打开 {0}", r),
      children: !n && t ? c.jsx("img", {
        src: t,
        alt: ""
      }) : c.jsx("span", {
        className: "studio-card-fallback",
        children: n ? "◇" : r.slice(0, 1) || x("画")
      })
    }), c.jsxs("div", {
      className: "studio-card-meta",
      children: [c.jsx("button", {
        type: "button",
        className: "studio-card-title",
        onClick: a,
        title: r,
        children: r
      }), c.jsxs("div", {
        className: "studio-card-time",
        children: [x("编辑于 "), QU(e.updatedAt), " · ", e.nodeCount ?? 0, x(" 节点")]
      })]
    })]
  });
}

const Gfa = "__projectAsset",
  SFe = "assets-manifest.json";

function QXt(e) {
  return String(e || "unknown").replace(/[^\w.-]+/g, "_").replace(/_+/g, "_").slice(0, 72);
}

function Vfa(e, t, n, r) {
  const a = n !== void 0 && n >= 0 ? `${QXt(e)}_${t}_${n}` : `${QXt(e)}_${t}`;
  if (!r) return a;
  let i = a,
    o = 2;
  for (; r.has(i);) i = `${a}_dup${o}`, o += 1;
  return r.add(i), i;
}

function kM(e, t) {
  return `pm_${e}_${t}`;
}

function Hfa(e) {
  const t = String(e || "").trim();
  if (!t.startsWith("pm_")) return null;
  const n = t.match(/^pm_(project_(?:teaching_)?\d+_[a-z0-9]+)_(.+)$/i);
  return n ? {
    projectId: n[1],
    assetKey: n[2]
  } : null;
}

function AHn(e) {
  return typeof e == "string" && (e.startsWith("data:image/") || e.startsWith("data:video/") || e.startsWith("data:audio/"));
}

function nD(e) {
  return typeof e == "object" && e !== null && e.__projectAsset === !0 && typeof e.key == "string";
}

function SHn(e) {
  if (e === "content") return {
    role: "content"
  };
  if (e === "maskContent") return {
    role: "mask"
  };
  if (e === "selectedPreviewImage") return {
    role: "selectedPreview"
  };
  const t = e.match(/generatedImages\[(\d+)\]\.fullUrl$/);
  if (t) return {
    role: "full",
    index: parseInt(t[1], 10)
  };
  const n = e.match(/generatedImages\[(\d+)\]\.thumbUrl$/);
  if (n) return {
    role: "thumb",
    index: parseInt(n[1], 10)
  };
  const r = e.match(/generatedImages\[(\d+)\]\.url$/);
  if (r) return {
    role: "full",
    index: parseInt(r[1], 10)
  };
  const a = e.match(/^previewMjImages\[(\d+)\]$/);
  if (a) return {
    role: "previewMj",
    index: parseInt(a[1], 10)
  };
  const i = e.match(/^mjImages\[(\d+)\]$/);
  if (i) return {
    role: "mj",
    index: parseInt(i[1], 10)
  };
  const o = e.match(/^batchImages\[(\d+)\]$/);
  return o ? {
    role: "previewMj",
    index: parseInt(o[1], 10)
  } : {
    role: "other"
  };
}

function Wfa(e, t, n) {
  var m;
  const r = e.id,
    a = e.type === "input-image",
    i = (m = e.settings) == null ? void 0 : m.mediaType,
    o = a && i !== "video" && i !== "audio",
    s = (f, y, b, v) => {
      const _ = o && v === "content" ? 0 : t;
      if (AHn(f) && f.length > _) {
        n.push({
          parent: y,
          key: b,
          value: f,
          nodeId: r,
          fieldPath: v
        });
        return;
      }
      if (Array.isArray(f)) {
        f.forEach((w, k) => s(w, f, k, `${v}[${k}]`));
        return;
      }
      if (f !== null && typeof f == "object" && !nD(f)) for (const w of Object.keys(f)) {
        const k = v ? `${v}.${w}` : w;
        s(f[w], f, w, k);
      }
    },
    l = e.settings || {},
    d = l.generatedImages,
    u = Math.max(0, Number(l.selectedMjImageIndex ?? 0)),
    h = Array.isArray(d) && d[u] ? typeof d[u].fullUrl == "string" ? d[u].fullUrl : typeof d[u].url == "string" ? d[u].url : "" : "",
    p = typeof e.content == "string" ? e.content : "";
  if (p && (!h || p !== h) && s(e.content, e, "content", "content"), e.maskContent && s(e.maskContent, e, "maskContent", "maskContent"), Array.isArray(e.previewMjImages)) {
    const f = e.previewMjImages;
    f.forEach((y, b) => {
      typeof y == "string" && s(y, f, b, `previewMjImages[${b}]`);
    });
  }
  if (typeof e.selectedPreviewImage == "string") {
    const f = typeof e.content == "string" ? e.content : "";
    (!f || e.selectedPreviewImage !== f) && s(e.selectedPreviewImage, e, "selectedPreviewImage", "selectedPreviewImage");
  }
  if (e.type === "image-wash" && l.washOriginalUrl && s(l.washOriginalUrl, l, "washOriginalUrl", "settings.washOriginalUrl"), Array.isArray(l.mjImages)) {
    const f = l.mjImages;
    f.forEach((y, b) => {
      typeof y == "string" && s(y, f, b, `settings.mjImages[${b}]`);
    });
  }
  if (Array.isArray(l.batchImages)) {
    const f = l.batchImages;
    f.forEach((y, b) => {
      typeof y == "string" && s(y, f, b, `settings.batchImages[${b}]`);
    });
  }
  Array.isArray(l.generatedImages) && l.generatedImages.forEach((f, y) => {
    if (f && typeof f == "object") {
      const b = typeof f.fullUrl == "string" ? f.fullUrl : typeof f.url == "string" ? f.url : "";
      typeof f.fullUrl == "string" && s(f.fullUrl, f, "fullUrl", `settings.generatedImages[${y}].fullUrl`), typeof f.url == "string" && f.url !== b && s(f.url, f, "url", `settings.generatedImages[${y}].url`), typeof f.thumbUrl == "string" && f.thumbUrl !== b && s(f.thumbUrl, f, "thumbUrl", `settings.generatedImages[${y}].thumbUrl`);
    }
  });
}

function qfa(e, t, n) {
  const r = new Set(["nodes"]),
    a = (i, o, s, l) => {
      if (AHn(i) && i.length > t) {
        n.push({
          parent: o,
          key: s,
          value: i,
          nodeId: "global",
          fieldPath: l || String(s)
        });
        return;
      }
      if (Array.isArray(i)) {
        i.forEach((d, u) => a(d, i, u, `${l}[${u}]`));
        return;
      }
      if (i !== null && typeof i == "object" && !nD(i)) for (const d of Object.keys(i)) a(i[d], i, d, l ? `${l}.${d}` : d);
    };
  for (const i of Object.keys(e)) r.has(i) || a(e[i], e, i, i);
}

async function Kfa(e, t, n, r) {
  if (ua()) return r == null || r("全局 OSS 模式：素材以远程 HTTPS 链接写入，跳过本地 assets 落盘"), {
    version: 1,
    projectId: t,
    updatedAt: Date.now(),
    entries: [],
    canonicalFullByNode: {}
  };
  const a = [];
  for (const u of e.nodes || []) Wfa(u, n, a);
  qfa(e, n, a);
  const i = new Set(),
    o = [],
    s = {},
    l = new Map();
  a.length > 0 && (r == null || r(`正在保存 ${a.length} 个素材到本地（语义化命名）...`));
  for (const u of a) {
    const {
        role: h,
        index: p
      } = SHn(u.fieldPath),
      m = await Jfa(u.value),
      f = await KEt(m);
    let y = l.get(f);
    y || (y = Vfa(u.nodeId, h, p, i), await oBr(t, y, m), l.set(f, y)), u.parent[u.key] = {
      [Gfa]: !0,
      key: y
    }, o.push({
      assetKey: y,
      nodeId: u.nodeId,
      field: u.fieldPath,
      role: h,
      index: p
    });
  }
  for (const u of e.nodes || []) {
    if (u.type !== "gen-image" && u.type !== "gen-video" && u.type !== "input-image") continue;
    const h = o.filter(y => y.nodeId === u.id),
      p = u.settings || {},
      m = Math.max(0, Number(p.selectedMjImageIndex ?? 0)),
      f = h.find(y => y.role === "full" && y.index === m) || h.find(y => y.role === "full") || h.find(y => y.role === "content") || h.find(y => y.role === "previewMj" && y.index === m);
    f && (s[u.id] = f.assetKey);
  }
  const d = {
    version: 1,
    projectId: t,
    updatedAt: Date.now(),
    entries: o,
    canonicalFullByNode: s
  };
  return await Qfa(t, d), d;
}

async function Qfa(e, t) {
  await Yfa(e, t);
}

async function Yfa(e, t) {
  const {
      localCacheManager: n
    } = await Ie(async () => {
      const {
        localCacheManager: s
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: s
      };
    }, void 0, import.meta.url),
    {
      mkdir: r
    } = await Ie(async () => {
      const {
        mkdir: s
      } = await Promise.resolve().then(() => oc);
      return {
        mkdir: s
      };
    }, void 0, import.meta.url),
    {
      invoke: a
    } = await Ie(async () => {
      const {
        invoke: s
      } = await Promise.resolve().then(() => sd);
      return {
        invoke: s
      };
    }, void 0, import.meta.url),
    i = JSON.stringify(t, null, 2);
  if (n.getDirectoryPathTauri()) {
    const s = n.getDirectoryPathTauri();
    if (!s) return;
    const l = `${s.replace(/[/\\]+$/, "")}/project management/${e}/assets`;
    await r(l, {
      recursive: !0
    }), await a("write_text_file_atomic", {
      path: `${l}/${SFe}`,
      body: i
    });
    return;
  }
  const o = n.getDirectoryHandle();
  if (o) try {
    const h = await (await (await (await (await o.getDirectoryHandle("project management", {
      create: !0
    })).getDirectoryHandle(e, {
      create: !0
    })).getDirectoryHandle("assets", {
      create: !0
    })).getFileHandle(SFe, {
      create: !0
    })).createWritable();
    await h.write(i), await h.close();
  } catch (s) {
    console.warn("[projectAssetManifest] write manifest failed:", s);
  }
}

async function IHn(e) {
  const t = await Xfa(e);
  if (!t) return null;
  try {
    const n = JSON.parse(t);
    if ((n == null ? void 0 : n.version) === 1 && Array.isArray(n.entries)) return {
      ...n,
      projectId: n.projectId || e,
      canonicalFullByNode: n.canonicalFullByNode || {}
    };
  } catch {}
  return null;
}

async function Xfa(e) {
  const {
      localCacheManager: t
    } = await Ie(async () => {
      const {
        localCacheManager: a
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: a
      };
    }, void 0, import.meta.url),
    {
      readTextFile: n
    } = await Ie(async () => {
      const {
        readTextFile: a
      } = await Promise.resolve().then(() => oc);
      return {
        readTextFile: a
      };
    }, void 0, import.meta.url);
  if (t.getDirectoryPathTauri()) {
    const a = t.getDirectoryPathTauri();
    if (!a) return null;
    const i = `${a.replace(/[/\\]+$/, "")}/project management/${e}/assets/${SFe}`;
    try {
      return await n(i);
    } catch {
      return null;
    }
  }
  const r = t.getDirectoryHandle();
  if (!r) return null;
  try {
    return await (await (await (await (await (await r.getDirectoryHandle("project management", {
      create: !1
    })).getDirectoryHandle(e, {
      create: !1
    })).getDirectoryHandle("assets", {
      create: !1
    })).getFileHandle(SFe, {
      create: !1
    })).getFile()).text();
  } catch {
    return null;
  }
}

async function Jfa(e) {
  return (await fetch(e)).blob();
}

async function Zfa(e) {
  return new Promise((t, n) => {
    const r = new FileReader();
    r.onload = () => t(String(r.result || "")), r.onerror = () => n(r.error), r.readAsDataURL(e);
  });
}

function ega(e, t) {
  const n = e.id,
    r = (o, s) => {
      if (nD(o)) {
        const {
          role: l,
          index: d
        } = SHn(s);
        t.push({
          assetKey: o.key,
          nodeId: n,
          field: s,
          role: l,
          index: d
        });
        return;
      }
      if (Array.isArray(o)) {
        o.forEach((l, d) => r(l, `${s}[${d}]`));
        return;
      }
      if (o !== null && typeof o == "object") for (const l of Object.keys(o)) {
        const d = s ? `${s}.${l}` : l;
        r(o[l], d);
      }
    };
  r(e.content, "content"), e.maskContent && r(e.maskContent, "maskContent"), Array.isArray(e.previewMjImages) && e.previewMjImages.forEach((o, s) => r(e.previewMjImages[s], `previewMjImages[${s}]`)), e.selectedPreviewImage !== void 0 && e.selectedPreviewImage !== null && r(e.selectedPreviewImage, "selectedPreviewImage");
  const a = e.settings || {};
  e.type === "image-wash" && a.washOriginalUrl && r(a.washOriginalUrl, "settings.washOriginalUrl"), Array.isArray(a.mjImages) && a.mjImages.forEach((o, s) => r(a.mjImages[s], `settings.mjImages[${s}]`)), Array.isArray(a.batchImages) && a.batchImages.forEach((o, s) => r(a.batchImages[s], `settings.batchImages[${s}]`)), Array.isArray(a.generatedImages) && a.generatedImages.forEach((o, s) => {
    if (o && typeof o == "object") {
      const l = o;
      "fullUrl" in l && r(l.fullUrl, `settings.generatedImages[${s}].fullUrl`), "thumbUrl" in l && r(l.thumbUrl, `settings.generatedImages[${s}].thumbUrl`), "url" in l && r(l.url, `settings.generatedImages[${s}].url`);
    }
  });
  const i = a.seedanceMaterials;
  Array.isArray(i) && i.forEach((o, s) => {
    o && typeof o == "object" && r(o.url, `settings.seedanceMaterials[${s}].url`);
  });
}

function CHn(e, t) {
  const n = [];
  for (const o of e.nodes || []) ega(o, n);
  if (n.length === 0) return null;
  const r = new Set(),
    a = n.filter(o => {
      const s = `${o.nodeId}\0${o.assetKey}\0${o.field}`;
      return r.has(s) ? !1 : (r.add(s), !0);
    }),
    i = {};
  for (const o of e.nodes || []) {
    if (o.type !== "input-image" && o.type !== "gen-image" && o.type !== "gen-video" && o.type !== "preview") continue;
    const s = a.filter(d => d.nodeId === o.id),
      l = s.find(d => d.role === "content") || s.find(d => d.role === "full") || s[0];
    l && (i[o.id] = l.assetKey);
  }
  return {
    version: 1,
    projectId: t,
    updatedAt: Date.now(),
    entries: a,
    canonicalFullByNode: i
  };
}

function tga(e, t) {
  return e.some(n => {
    if (n.type !== "input-image") return !1;
    const r = n.settings || {},
      a = r.mediaType;
    if (a === "video" || a === "audio") return !1;
    const i = typeof n.content == "string" ? n.content.trim() : "";
    if (i.startsWith("http") && r._ossUrlOnlyMode) return !1;
    if (!i || Er.isContentRef(i) || i.startsWith("blob:") || !i.startsWith("http")) return !0;
    const o = t.canonicalFullByNode[n.id];
    return !!(o && r._projectFullAssetKey !== o);
  });
}

async function EHn(e, t, n) {
  const {
      contentStore: r
    } = await Ie(async () => {
      const {
        contentStore: o
      } = await Promise.resolve().then(() => Ly);
      return {
        contentStore: o
      };
    }, void 0, import.meta.url),
    {
      thumbnailStore: a
    } = await Ie(async () => {
      const {
        thumbnailStore: o
      } = await Promise.resolve().then(() => Y$);
      return {
        thumbnailStore: o
      };
    }, void 0, import.meta.url),
    {
      invalidateLazyContentCacheForRef: i
    } = await Ie(async () => {
      const {
        invalidateLazyContentCacheForRef: o
      } = await Promise.resolve().then(() => MXe);
      return {
        invalidateLazyContentCacheForRef: o
      };
    }, void 0, import.meta.url);
  return await ni.init(), await r.init(), Promise.all(e.map(async o => {
    var y, b;
    if (o.type !== "input-image") return o;
    const s = {
        ...(o.settings || {})
      },
      l = s.mediaType;
    if (l === "video" || l === "audio") return o;
    const d = t.entries.filter(v => v.nodeId === o.id);
    let u = t.canonicalFullByNode[o.id];
    if (u || (u = ((y = d.find(v => v.role === "content")) == null ? void 0 : y.assetKey) || ((b = d.find(v => v.role === "full")) == null ? void 0 : b.assetKey) || ""), !u) return o;
    const h = kM(n, u);
    let p = null;
    try {
      p = await ni.getAssetBlob(h);
    } catch {}
    if (!p && (p = await wWe(n, u), p)) try {
      await ni.saveBlobAsset(h, p, "", void 0, {
        silent: !0
      });
    } catch {}
    if (!p || !p.type.startsWith("image/")) return o;
    s._projectId = n, s._projectFullAssetKey = u, s._contentAssetId = h, s._localCacheAssetId = h;
    const m = typeof o.content == "string" ? o.content.trim() : "",
      f = URL.createObjectURL(p);
    if (Il(f, h), s._canvasDisplayPreviewUrl = await PHn(o, h, f), s._blobUrl = f, r.isContentRef(m)) {
      i(m);
      const v = r.extractId(m);
      await a.delete(v);
      try {
        const _ = await Zfa(p);
        await a.storeWithThumbnails(v, _);
      } catch (_) {
        console.warn("[projectAssetManifest] 重建图片输入预览失败:", v, _);
      }
      return {
        ...o,
        content: f,
        settings: {
          ...s,
          mediaRevision: (Number(s.mediaRevision) || 0) + 1
        },
        _contentAssetId: h
      };
    }
    return {
      ...o,
      content: f,
      settings: {
        ...s,
        mediaRevision: (Number(s.mediaRevision) || 0) + 1
      },
      _contentAssetId: h
    };
  }));
}

const THn = new Set(["input-image", "gen-image", "gen-video"]);

function IFe(e) {
  const t = String(e || "").trim();
  return t.startsWith("blob:") && ei() && !Nd(t);
}

function MHn(e) {
  const t = String(e || "").trim();
  return !t || Er.isContentRef(t) ? !1 : t.startsWith("data:image") ? !0 : vs(t) ? S3(t) : /^https?:\/\//i.test(t) ? !0 : t.startsWith("blob:") ? Nd(t) : !1;
}

function yNe(e, t) {
  const n = String(t || "").trim();
  return !n || Er.isContentRef(n) ? !1 : e.type === "gen-image" || e.type === "gen-video" ? U$(e, n) ? !1 : n.startsWith("data:image") ? !0 : vs(n) ? S3(n) : !!(/^https?:\/\//i.test(n) && /\/thumbnails\//i.test(n) || n.startsWith("blob:") && Nd(n)) : MHn(n);
}

async function nga(e) {
  if (e.type !== "gen-image" && e.type !== "gen-video") return "";
  const t = typeof e.content == "string" ? e.content.trim() : "";
  if (!t || Er.isContentRef(t) || !t.startsWith("blob:") && !t.startsWith("data:image")) return "";
  try {
    const {
        createThumbnailForAi: n
      } = await Ie(async () => {
        const {
          createThumbnailForAi: a
        } = await Promise.resolve().then(() => No);
        return {
          createThumbnailForAi: a
        };
      }, void 0, import.meta.url),
      {
        url: r
      } = await n(t, 256);
    if (r && !U$(e, r)) return r;
  } catch {}
  return "";
}

async function PHn(e, t, n) {
  var l, d;
  const r = String(n || "").trim(),
    {
      readLocalPreviewThumbnailAsUrl: a,
      resolveLocalCachedDisplayUrls: i
    } = await Ie(async () => {
      const {
        readLocalPreviewThumbnailAsUrl: u,
        resolveLocalCachedDisplayUrls: h
      } = await Promise.resolve().then(() => Ui);
      return {
        readLocalPreviewThumbnailAsUrl: u,
        resolveLocalCachedDisplayUrls: h
      };
    }, void 0, import.meta.url),
    o = [t, ...r5e(e, r)].filter((u, h, p) => {
      const m = String(u || "").trim();
      return m && p.indexOf(m) === h;
    });
  for (const u of o) {
    try {
      const h = await a(u);
      if (h && yNe(e, h)) return h;
    } catch {}
    try {
      const h = await i(u, {
          fallbackCreateThumbMax: 256
        }),
        p = (l = h == null ? void 0 : h.displayUrl) == null ? void 0 : l.trim(),
        m = (d = h == null ? void 0 : h.originalUrl) == null ? void 0 : d.trim();
      if (p && !Er.isContentRef(p) && p !== m && yNe(e, p)) return p.startsWith("blob:") && Il(p, u), p;
    } catch {}
  }
  if (r && yNe(e, r)) return r;
  const s = await nga(e);
  return s || "";
}

function RHn(e) {
  return ei() ? e.some(t => {
    if (!THn.has(t.type)) return !1;
    const n = t.settings || {};
    if (t.type === "input-image") {
      const a = n.mediaType;
      if (a === "video" || a === "audio") return !1;
    }
    const r = typeof n._canvasDisplayPreviewUrl == "string" ? n._canvasDisplayPreviewUrl.trim() : "";
    if (IFe(r) || r && !MHn(r) || (t.type === "gen-image" || t.type === "gen-video") && r && U$(t, r)) return !0;
    if ((t.type === "gen-image" || t.type === "gen-video") && !r) {
      const a = typeof t.content == "string" ? t.content.trim() : "",
        i = n.generatedImages,
        o = !!(a && !Er.isContentRef(a)) || !!(Array.isArray(i) && i.some(l => (l == null ? void 0 : l.fullUrl) || (l == null ? void 0 : l.url) || (l == null ? void 0 : l.thumbUrl))),
        s = !!(typeof n._localPreviewAssetId == "string" && n._localPreviewAssetId.trim()) || !!(typeof n._localCacheAssetId == "string" && n._localCacheAssetId.trim()) || !!(typeof n._assetId == "string" && n._assetId.trim()) || !!(typeof n._contentAssetId == "string" && n._contentAssetId.trim());
      if (o || s) return !0;
    }
    return !1;
  }) : !1;
}

async function NHn(e, t) {
  return ei() ? Promise.all(e.map(async n => {
    if (!THn.has(n.type)) return n;
    const r = {
      ...(n.settings || {})
    };
    if (n.type === "input-image") {
      const u = r.mediaType;
      if (u === "video" || u === "audio") return n;
    }
    const a = typeof r._canvasDisplayPreviewUrl == "string" ? r._canvasDisplayPreviewUrl.trim() : "";
    if (typeof n.content == "string" && n.content.trim(), a && yNe(n, a) && !IFe(a)) return n;
    a && U$(n, a) && delete r._canvasDisplayPreviewUrl;
    const i = (typeof r._localPreviewAssetId == "string" ? r._localPreviewAssetId.trim() : "") || a5e(n, typeof n.content == "string" ? n.content : void 0) || (typeof r._contentAssetId == "string" ? r._contentAssetId.trim() : "") || (typeof r._localCacheAssetId == "string" ? r._localCacheAssetId.trim() : "") || (typeof r._projectFullAssetKey == "string" && r._projectFullAssetKey ? kM(String(r._projectId || t), String(r._projectFullAssetKey)) : "") || n.id,
      s = await PHn(n, i, ""),
      l = String(s || "").trim();
    if (!l || Er.isContentRef(l)) {
      if (IFe(a)) {
        const {
          _canvasDisplayPreviewUrl: u,
          ...h
        } = r;
        return {
          ...n,
          settings: h
        };
      }
      return n;
    }
    l.startsWith("blob:") && Il(l, i);
    const d = n.type === "input-image" ? {
      mediaRevision: (Number(r.mediaRevision) || 0) + 1
    } : {};
    return {
      ...n,
      settings: {
        ...r,
        _canvasDisplayPreviewUrl: l,
        ...d
      }
    };
  })) : e;
}

async function jHn(e, t) {
  await ni.init();
  const n = new Set();
  for (const i of t.entries) (i.role === "full" || i.role === "content") && n.add(i.assetKey);
  Object.values(t.canonicalFullByNode || {}).forEach(i => n.add(i));
  const r = Array.from(n);
  if (r.length === 0) return;
  const a = 6;
  for (let i = 0; i < r.length; i += a) {
    const o = r.slice(i, i + a);
    await Promise.all(o.map(async s => {
      const l = await wWe(e, s);
      if (l) try {
        const d = kM(e, s);
        await ni.saveBlobAsset(d, l, "", void 0, {
          silent: !0
        });
      } catch (d) {
        console.warn("[projectAssetManifest] hydrate asset failed:", s, d);
      }
    })), i + a < r.length && (await new Promise(s => setTimeout(s, 0)));
  }
}

const rga = new Set(["gen-image", "gen-video", "preview", "input-image"]);

function D7t(e) {
  const t = {
    "gen-image": new Set(),
    "gen-video": new Set()
  };
  for (const n of e) {
    if (n.type !== "gen-image" && n.type !== "gen-video") continue;
    const r = (n.nodeName || "").trim();
    r && DHn(n.type, r) && !YXt(n) && t[n.type].add(r);
  }
  return e.map(n => {
    if (n.type !== "gen-image" && n.type !== "gen-video" || (n.nodeName || "").trim() && !YXt(n)) return n;
    const a = n.type === "gen-video" ? "生成视频" : "生成图片",
      i = t[n.type];
    let o = 0,
      s = a;
    for (; i.has(s);) o += 1, s = `${a}_${o}`;
    return i.add(s), {
      ...n,
      nodeName: s
    };
  });
}

function DHn(e, t) {
  const n = e === "gen-video" ? "生成视频" : "生成图片";
  return t === n || new RegExp(`^${n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}_(\\d+)$`).test(t);
}

function YXt(e) {
  const t = (e.nodeName || "").trim();
  if (!t) return !0;
  if (DHn(e.type, t)) return !1;
  const n = (e.prompt || "").trim().replace(/\s+/g, " ");
  return !!(n && (t === n || n.startsWith(t) && t.length >= 6 || t.startsWith(n.slice(0, Math.min(n.length, 12)))) || /^[\s{["'`]/.test(t) || /[{}\[\]]/.test(t) || t.length > 20);
}

function LHn(e, t, n) {
  if (!t) return e;
  const r = new Map();
  for (const a of t.entries) {
    const i = a.nodeId,
      o = r.get(i);
    o ? o.push(a) : r.set(i, [a]);
  }
  return e.map(a => {
    if (!rga.has(a.type)) return a;
    const i = {
        ...(a.settings || {})
      },
      o = Math.max(0, Number(i.selectedMjImageIndex ?? 0)),
      s = typeof i._canvasDisplayPreviewUrl == "string" ? i._canvasDisplayPreviewUrl.trim() : "";
    (s && IFe(s) || (a.type === "gen-image" || a.type === "gen-video") && s && U$(a, s)) && delete i._canvasDisplayPreviewUrl;
    const l = r.get(a.id) ?? [];
    let d = t.canonicalFullByNode[a.id];
    if (!d) {
      const y = l.find(b => b.role === "full" && b.index === o) || l.find(b => b.role === "content") || l.find(b => b.role === "full");
      d = (y == null ? void 0 : y.assetKey) || "";
    }
    const u = l.find(y => y.role === "thumb" && y.index === o) || l.find(y => y.role === "previewMj" && y.index === o) || l.find(y => y.role === "thumb");
    d && (i._projectFullAssetKey = d, i._projectId = n, i._contentAssetId = kM(n, d));
    const h = typeof a.content == "string" ? a.content.trim() : "";
    h.startsWith("blob:") && d && Il(h, kM(n, d));
    const p = i.generatedImages;
    if (Array.isArray(p) && p.length > 0) {
      const y = [],
        b = [];
      p.forEach((v, _) => {
        var k;
        const w = (k = l.find(A => A.role === "full" && A.index === _)) == null ? void 0 : k.assetKey;
        w && (v.assetId = kM(n, w), y[_] = v.assetId, b[_] = w);
      }), y.some(Boolean) && (i._mjAssetIds = y, i._projectAssetKeys = b);
    }
    let m = a.content;
    if (a.type === "gen-image" || a.type === "gen-video") {
      const y = u ? XXt(a, u) : void 0,
        b = d ? XXt(a, {
          role: "full"
        }) : void 0,
        v = i.generatedImages,
        _ = Array.isArray(v) ? v[o] : void 0,
        w = typeof (_ == null ? void 0 : _.thumbUrl) == "string" && nr(_.thumbUrl) ? _.thumbUrl : "",
        k = typeof (_ == null ? void 0 : _.fullUrl) == "string" && nr(_.fullUrl) ? _.fullUrl : typeof (_ == null ? void 0 : _.url) == "string" && nr(_.url) ? _.url : "",
        A = y || b || w || k;
      A && typeof A == "string" && (m = A), k && (i._ossRemoteUrl = k, i._ossThumbnailUrl = w || k, i._ossUrlOnlyMode = !0);
    }
    const f = d ? kM(n, d) : void 0;
    return {
      ...a,
      content: m,
      settings: i,
      ...(f ? {
        _contentAssetId: f
      } : {})
    };
  });
}

function XXt(e, t) {
  const {
    role: n,
    index: r
  } = t;
  if (n === "content" && typeof e.content == "string" && e.content.startsWith("blob:")) return e.content;
  const a = e.settings || {};
  if (n === "thumb" && Array.isArray(a.generatedImages) && r !== void 0) {
    const o = a.generatedImages[r],
      s = o == null ? void 0 : o.thumbUrl;
    if (typeof s == "string" && (s.startsWith("blob:") || s.startsWith("data:") || nr(s))) return s;
  }
  if (n === "full" && Array.isArray(a.generatedImages) && r !== void 0) {
    const o = a.generatedImages[r],
      s = (o == null ? void 0 : o.fullUrl) || (o == null ? void 0 : o.url);
    if (typeof s == "string" && (s.startsWith("blob:") || s.startsWith("data:") || nr(s))) return s;
  }
  if (n === "previewMj" && Array.isArray(e.previewMjImages) && r !== void 0) {
    const o = e.previewMjImages[r];
    if (typeof o == "string" && o.startsWith("blob:")) return o;
  }
  if ((n === "full" || n === "content") && Array.isArray(a.generatedImages)) {
    const o = r ?? 0,
      s = a.generatedImages[o],
      l = (s == null ? void 0 : s.fullUrl) || (s == null ? void 0 : s.url);
    if (typeof l == "string" && (l.startsWith("blob:") || l.startsWith("data:") || nr(l))) return l;
  }
  const i = typeof a._ossRemoteUrl == "string" ? a._ossRemoteUrl.trim() : "";
  if (i && nr(i)) return i;
}

function aga(e) {
  if (typeof e != "string" || !e.trim()) return !1;
  const t = e.trim();
  return Tu(t) ? !1 : ua() ? /^https?:\/\//i.test(t) : nr(t);
}

const _Q = "_localPreviewAssetId",
  L7t = "local-refs";

function iga(e, ...t) {
  return [e.replace(/\\/g, "/").replace(/\/+$/, ""), ...t].join("/").replace(/\/+/g, "/");
}

function oga() {
  return `project_ref_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function OHn(e) {
  return typeof e != "string" || !e ? !1 : !!(Tu(e) || Er.isContentRef(e) || e.startsWith("blob:") || vs(e) || e.startsWith("data:image/") || e.startsWith("data:video/") || e.startsWith("data:audio/"));
}

function O7t(e) {
  return !e || typeof e != "object" ? !1 : e.persistFormat === L7t ? !0 : !!(e.assetIdToLocalPath && Object.keys(e.assetIdToLocalPath).length > 0);
}

async function aiyouCacheReferenceImage(blob) {
  if (!blob?.size || !blob.type.startsWith("image/")) throw new Error("参考素材必须为有效图片");
  await Ur.ensureManifestLoaded();
  if (!Ur.isAvailable()) throw new Error("请先启用本地素材缓存，再添加参考图片");
  const digest = await crypto.subtle.digest("SHA-256", await blob.arrayBuffer());
  const assetId = "local_reference_" + [...new Uint8Array(digest)].map(v => v.toString(16).padStart(2, "0")).join("");
  if (!await ni.saveBlobAsset(assetId, blob, "file://aiyouplus-reference/" + assetId, "local", {silent: !0})) throw new Error("参考图原件保存失败");
  const url = await Ur.getConvertFileSrcForAsset(assetId);
  if (!url) throw new Error("参考图缓存不可读取");
  return {assetId, url};
}

function aiyouNestedImageRefs(node) {
  const refs = [];
  for (const field of ["frames", "selectedKeyframes"]) if (Array.isArray(node[field])) {
    for (const frame of node[field]) if (frame && typeof frame === "object") refs.push({item: frame, key: "url", assetOwner: frame, assetField: "assetId", kind: "image"});
  }
  const scene = node.settings?._director3dScene;
  if (Array.isArray(scene?.objects)) for (const object of scene.objects) {
    if (Array.isArray(object.screenshots)) for (const shot of object.screenshots) refs.push({item: shot, key: "dataUrl", assetOwner: shot, assetField: "assetId", kind: "image"});
  }
  if (Array.isArray(node.settings?.shots)) for (const shot of node.settings.shots) {
    if (!shot || typeof shot !== "object" || Array.isArray(shot)) continue;
    for (const [key, assetField, kind] of [
      ["image_url", "_imageAssetId", "image"],
      ["video_url", "_videoAssetId", "video"],
      ["image_thumb_url", "_imageThumbnailAssetId", "image"],
      ["video_thumb_url", "_videoThumbnailAssetId", "image"],
      ["startFrame", "_startFrameAssetId", "image"],
      ["endFrame", "_endFrameAssetId", "image"]
    ]) if (key in shot || assetField in shot) refs.push({item: shot, key, assetOwner: shot, assetField, kind});
    for (const [key, assetField] of [["image_urls", "_imageAssetIds"], ["image_thumb_urls", "_imageThumbnailAssetIds"]]) {
      if (!Array.isArray(shot[key])) continue;
      shot[key].forEach((_, index) => refs.push({item: shot[key], key: index, assetOwner: shot, assetField, assetIndex: index, kind: "image"}));
    }
  }
  if (Array.isArray(node.settings?.videoTimelineSources)) for (const source of node.settings.videoTimelineSources) {
    if (!source || typeof source !== "object" || Array.isArray(source)) continue;
    const kind = source.kind === "audio" ? "audio" : source.kind === "image" ? "image" : "video";
    // Empty display URLs in a lightweight project do not mean the source was deleted.
    // Deleting a timeline source removes its array entry instead.
    refs.push({item: source, key: "url", assetOwner: source, assetField: "assetId", kind, keepAssetWithoutUrl: !0});
    if ("thumbnailUrl" in source || "thumbnailAssetId" in source) refs.push({item: source, key: "thumbnailUrl", assetOwner: source, assetField: "thumbnailAssetId", kind: "image", keepAssetWithoutUrl: !0});
  }
  return refs;
}

function aiyouNestedMediaAssetId(ref) {
  const value = ref.assetIndex === void 0 ? ref.assetOwner?.[ref.assetField] : ref.assetOwner?.[ref.assetField]?.[ref.assetIndex];
  return typeof value === "string" ? value.trim() : "";
}

function aiyouSetNestedMediaAssetId(ref, assetId) {
  if (ref.assetIndex !== void 0) {
    if (!Array.isArray(ref.assetOwner[ref.assetField])) ref.assetOwner[ref.assetField] = [];
    ref.assetOwner[ref.assetField][ref.assetIndex] = assetId;
  } else if (assetId) ref.assetOwner[ref.assetField] = assetId;
  else delete ref.assetOwner[ref.assetField];
}

function aiyouCloneNestedMedia(node) {
  for (const field of ["frames", "selectedKeyframes"]) if (Array.isArray(node[field])) node[field] = node[field].map(frame => ({...frame}));
  if (node.settings?._director3dScene) node.settings = {...node.settings, _director3dScene: structuredClone(node.settings._director3dScene)};
  if (Array.isArray(node.settings?.shots)) node.settings = {...node.settings, shots: node.settings.shots.map(shot => {
    if (!shot || typeof shot !== "object" || Array.isArray(shot)) return shot;
    const copy = {...shot};
    for (const [key, ids] of [["image_urls", "_imageAssetIds"], ["image_thumb_urls", "_imageThumbnailAssetIds"]]) {
      if (!Array.isArray(shot[key])) continue;
      copy[key] = [...shot[key]];
      copy[ids] = copy[key].map((_, index) => typeof shot[ids]?.[index] === "string" ? shot[ids][index] : "");
    }
    return copy;
  })};
  if (Array.isArray(node.settings?.videoTimelineSources)) node.settings = {...node.settings, videoTimelineSources: node.settings.videoTimelineSources.map(source => source && typeof source === "object" ? {...source} : source)};
  return node;
}

async function aiyouCacheNestedMedia(blob, kind) {
  const label = kind === "video" ? "视频" : kind === "audio" ? "音频" : "图片";
  if (!blob?.size || !blob.type.startsWith(kind + "/")) throw new Error(`分镜${label}原件格式不匹配或内容为空`);
  await Ur.ensureManifestLoaded();
  if (!Ur.isAvailable()) throw new Error("请先启用本地素材缓存，再保存分镜媒体");
  const bytes = await blob.arrayBuffer(), digest = await crypto.subtle.digest("SHA-256", bytes);
  const assetId = "local_nested_" + kind + "_" + [...new Uint8Array(digest)].map(v => v.toString(16).padStart(2, "0")).join("");
  let url = await Ur.getConvertFileSrcForAsset(assetId);
  if (!url) {
    if (!await ni.saveBlobAsset(assetId, blob, "file://aiyouplus-nested/" + assetId, "local", {silent: !0})) throw new Error(`分镜${label}原件保存失败`);
    url = await Ur.getConvertFileSrcForAsset(assetId);
  }
  if (!url) throw new Error(`分镜${label}原件缓存不可读取`);
  return {assetId, url};
}

async function aiyouPersistNestedImages(node) {
  aiyouCloneNestedMedia(node);
  for (const ref of aiyouNestedImageRefs(node)) {
    const value = ref.item[ref.key];
    if (typeof value !== "string" || !value.trim()) {
      if (!ref.keepAssetWithoutUrl) aiyouSetNestedMediaAssetId(ref, "");
      continue;
    }
    // Resolve only local media. Saving a project must never fetch a business URL.
    if (!/^(data:(?:image|video|audio)\/|blob:|asset:\/\/)/i.test(value)) continue;
    const assetId = aiyouNestedMediaAssetId(ref);
    const record = assetId && Ur.getManifest()?.assets?.[assetId];
    if (assetId && typeof record?.mimeType === "string" && record.mimeType.startsWith(ref.kind + "/") && await Ur.getConvertFileSrcForAsset(assetId) === value) continue;
    const response = await fetch(value);
    if (!response.ok) throw new Error("分镜本地媒体原件读取失败");
    const cached = await aiyouCacheNestedMedia(await response.blob(), ref.kind);
    ref.item[ref.key] = cached.url;
    aiyouSetNestedMediaAssetId(ref, cached.assetId);
  }
}

async function aiyouRestoreNestedImages(node) {
  aiyouCloneNestedMedia(node);
  for (const ref of aiyouNestedImageRefs(node)) {
    const assetId = aiyouNestedMediaAssetId(ref);
    if (assetId) ref.item[ref.key] = await Ur.getConvertFileSrcForAsset(assetId) || ref.item[ref.key];
  }
  return node;
}

async function aiyouPersistReferenceArrays(node) {
  const settings = {...node.settings};
  for (const [field, idsField] of [["referenceImages", "_referenceImageAssetIds"], ["editImageReferenceImages", "_editReferenceImageAssetIds"]]) {
    if (!Array.isArray(settings[field])) continue;
    const refs = [...settings[field]], ids = [...(settings[idsField] || [])];
    for (let i = 0; i < refs.length; i++) if (typeof refs[i] === "string" && /^(data:image\/|blob:)/.test(refs[i])) {
      const cached = await aiyouCacheReferenceImage(await (await fetch(refs[i])).blob());
      refs[i] = cached.url; ids[i] = cached.assetId;
    }
    settings[field] = refs; settings[idsField] = refs.map((_, i) => ids[i] || "");
  }
  node.settings = settings;
}

function qX(e) {
  const t = e.settings || {};
  if (t._projectOmitMedia === !0) return [];
  const n = [],
    r = l => {
      typeof l == "string" && l.trim() && n.push(l.trim());
    };
  r(e._contentAssetId), r(t[dg]), r(t._localCacheAssetId), r(t._contentAssetId), r(t._assetId), r(e._selectedImageAssetId), r(t._selectedImageAssetId), e.type === "image-wash" && r(t.washOriginalAssetId), (e.type === "gen-image" || e.type === "gen-video" || e.type === "input-image") && r(e.id);
  const a = t._mjAssetIds || e._previewMjAssetIds;
  Array.isArray(a) && a.forEach(r);
  const i = e._previewMjAssetIds;
  Array.isArray(i) && i.forEach(r);
  const o = t.generatedImages;
  if (Array.isArray(o)) for (const l of o) r(l == null ? void 0 : l.id);
  const s = t.generationVersions;
  if (Array.isArray(s)) {
    for (const l of s) if (r(l == null ? void 0 : l.id), Array.isArray(l == null ? void 0 : l.images)) for (const d of l.images) r(d == null ? void 0 : d.id);
  }
  for (const key of ["_referenceImageAssetIds", "_editReferenceImageAssetIds"]) if (Array.isArray(t[key])) t[key].forEach(r);
  for (const ref of aiyouNestedImageRefs(e)) r(aiyouNestedMediaAssetId(ref));
  return [...new Set(n)];
}

function BHn(e) {
  const t = new Set();
  for (const n of e) for (const r of qX(n)) t.add(r);
  return t;
}

async function Snt(e) {
  try {
    if (e.startsWith("data:")) {
      const n = await (await fetch(e)).blob();
      return n.size > 0 ? n : null;
    }
    if (e.startsWith("blob:") || /^https?:\/\//i.test(e)) {
      const t = await fetch(e);
      if (!t.ok) return null;
      const n = await t.blob();
      return n.size > 0 ? n : null;
    }
  } catch {}
  return null;
}

async function sga(e, t) {
  var a;
  const n = oga(),
    r = e.type || t != null && t.startsWith("data:") && ((a = t.match(/^data:([^;]+)/)) == null ? void 0 : a[1]) || "image/png";
  try {
    return await ni.saveBlobAsset(n, e, t || "file://project-local-ref", "local"), (await Ur.saveAsset(n, e, r, t || "file://project-local-ref", "local")) ? n : null;
  } catch (i) {
    return console.warn("[projectLocalRefPersist] 写入本地缓存失败:", i), null;
  }
}

async function lga(e) {
  if ((e.settings || {})._projectOmitMedia === !0) return;
  await aiyouPersistReferenceArrays(e);
  await aiyouPersistNestedImages(e);
  const n = qX(e),
    r = typeof e.content == "string" ? e.content : "",
    a = {
      ...(e.settings || {})
    },
    i = l => {
      e._contentAssetId = l, e.type === "input-image" ? e.settings = $$(a, l, r) : (a[dg] = l, a._localCacheAssetId = l, a._contentAssetId = l, a._assetId = l, e.settings = a);
    };
  if (n.length > 0) {
    typeof a._blobUrl == "string" && a._blobUrl.startsWith("blob:") && (a._blobUrl = "", e.settings = a);
    return;
  }
  let o = null;
  if (Er.isContentRef(r)) {
    const l = await Er.get(r.replace(/^content_ref:/, ""));
    l && (o = await Snt(l));
  } else OHn(r) ? o = await Snt(r) : typeof a._blobUrl == "string" && a._blobUrl.startsWith("blob:") && (o = await Snt(a._blobUrl));
  if (!o) return;
  const s = await sga(o, r || void 0);
  if (s && (i(s), typeof a._blobUrl == "string")) {
    const l = {
      ...(e.settings || {}),
      _blobUrl: ""
    };
    e.settings = l;
  }
}

function FHn(e) {
  const n = qX(e)[0] || "";
  if (n) {
    const i = {
      ...(e.settings || {})
    };
    i[_Q] = n, e.settings = i;
  }
  const r = (i, o) => {
      const s = i[o];
      if (!nD(s)) {
        if (OHn(s)) {
          i[o] = "";
          return;
        }
        typeof s == "string" && /^https?:\/\//i.test(s) && !aga(s) && (i[o] = "");
      }
    },
    a = (i, o) => {
      if (o > 18 || i == null) return;
      if (Array.isArray(i)) {
        for (let l = 0; l < i.length; l++) {
          const d = i[l];
          typeof d == "string" ? r(i, l) : d && typeof d == "object" && a(d, o + 1);
        }
        return;
      }
      if (typeof i != "object" || nD(i)) return;
      const s = i;
      for (const l of Object.keys(s)) {
        if (l === "referenceImages" && Array.isArray(s._referenceImageAssetIds) || l === "editImageReferenceImages" && Array.isArray(s._editReferenceImageAssetIds)) continue;
        if (l === "_assetId" || l === "_contentAssetId" || l === "_localCacheAssetId" || l === dg || l === _Q || l === "_mjAssetIds" || l === "_previewMjAssetIds" || l === "_selectedImageAssetId" || l === "_projectFullAssetKey" || l === "_projectId" || l === "id") continue;
        const d = s[l];
        typeof d == "string" ? r(s, l) : d && typeof d == "object" && a(d, o + 1);
      }
    };
  a(e, 0);
}

function cga(e, t) {
  const n = Ur.getManifest(),
    r = {};
  if (!n) return r;
  for (const a of e) {
    const i = n.assets[a];
    i != null && i.fileName && (r[a] = iga(t, i.fileName));
  }
  return r;
}

async function B7t(e, t) {
  const n = e.nodes || [];
  let r = 0;
  t == null || t("正在核对本地缓存引用...");
  for (let s = 0; s < n.length; s++) {
    const l = qX(n[s]).length;
    await lga(n[s]), qX(n[s]).length > l && (r += 1), s > 0 && s % 32 === 0 && (await new Promise(u => setTimeout(u, 0)));
  }
  const a = BHn(n);
  await Ur.ensureManifestLoaded();
  let i = Ur.getManifest();
  if (i) {
    let s = 0;
    for (const l of a) if (!i.assets[l]) try {
      const d = await ni.getAssetRecord(l);
      d != null && d.blob && (await Ur.saveAsset(l, d.blob, d.mimeType || d.blob.type, d.remoteUrl, d.cacheSubdir), s += 1);
    } catch {}
    s > 0 && (t == null || t(`已补写 ${s} 个素材到资源缓存...`));
  }
  await Ur.flushPendingAssets({
    force: !0
  }), await Ur.flushManifest({
    force: !0
  }), i = Ur.getManifest();
  const o = Ur.getDirectoryPathTauri() || "";
  t == null || t("正在生成轻量项目数据...");
  for (const s of n) FHn(s);
  return e.persistFormat = L7t, e.cacheDir = o || void 0, e.assetIdToLocalPath = o ? cga(a, o) : {}, {
    assetCount: a.size,
    orphanPersisted: r
  };
}

async function AYe(e, t) {
  try {
    await Ur.ensureManifestLoaded(), await F7t(e);
  } catch {}
  return 0;
}

async function F7t(e) {
  const t = e == null ? void 0 : e.assetIdToLocalPath;
  if (!t || typeof t != "object") return 0;
  const n = Object.entries(t).map(([r, a]) => ({
    assetId: String(r || "").trim(),
    absolutePath: String(a || "").trim()
  })).filter(r => r.assetId && r.absolutePath);
  if (n.length === 0) return 0;
  try {
    await Ur.ensureManifestLoaded();
    const r = String(Ur.getDirectoryPathTauri() || "").replace(/\\/g, "/").replace(/\/+$/, "").toLowerCase(),
      a = String((e == null ? void 0 : e.cacheDir) || "").replace(/\\/g, "/").replace(/\/+$/, "").toLowerCase(),
      i = !!(r && a && r === a),
      o = Ur.getManifest(),
      s = i ? n.filter(d => !(o != null && o.assets[d.assetId])) : n;
    if (s.length === 0) return 0;
    const l = await Ur.adoptAbsoluteFilesIntoCache(s, e == null ? void 0 : e.cacheDir);
    return l > 0 && console.log(`[projectLocalRefPersist] 已将 ${l} 个旧缓存路径迁入当前资源目录`), l;
  } catch (r) {
    return console.warn("[projectLocalRefPersist] remapLocalRefAssetsToCurrentCache failed:", r), 0;
  }
}

async function z7t(e, t = 8) {
  await Ur.ensureManifestLoaded().catch(() => {});
  const {
      readLocalPreviewThumbnailAsUrl: n
    } = await Ie(async () => {
      const {
        readLocalPreviewThumbnailAsUrl: a
      } = await Promise.resolve().then(() => Ui);
      return {
        readLocalPreviewThumbnailAsUrl: a
      };
    }, void 0, import.meta.url),
    r = e.slice();
  for (let a = 0; a < r.length; a += t) {
    const i = r.slice(a, a + t),
      o = await Promise.all(i.map(async s => {
        const l = {
            ...(s.settings || {})
          };
        for (const [field, idsField] of [["referenceImages", "_referenceImageAssetIds"], ["editImageReferenceImages", "_editReferenceImageAssetIds"]]) if (Array.isArray(l[field]) && Array.isArray(l[idsField])) {
          l[field] = await Promise.all(l[field].map(async (value, index) => l[idsField][index] ? await Ur.getConvertFileSrcForAsset(l[idsField][index]) || value : value));
        }
        const restored = await aiyouRestoreNestedImages({...s, settings: l}),
          d = typeof l._canvasDisplayPreviewUrl == "string" ? l._canvasDisplayPreviewUrl.trim() : "";
        if (!!d && !d.startsWith("blob:") && !d.startsWith("data:") && !Er.isContentRef(d) && !(vs(d) && !S3(d))) return restored;
        const h = typeof l[_Q] == "string" && l[_Q].trim() || qX(s)[0] || "";
        if (!h) return restored;
        try {
          const p = (await n(h)) || (await Ur.getConvertFileSrcForAsset(h));
          return p ? {
            ...restored,
            settings: {
              ...restored.settings,
              [_Q]: h,
              _canvasDisplayPreviewUrl: p
            }
          } : restored;
        } catch {
          return restored;
        }
      }));
    for (let s = 0; s < o.length; s++) r[a + s] = o[s];
  }
  return r;
}

const dga = Object.freeze(Object.defineProperty({
    __proto__: null,
    LOCAL_PREVIEW_ASSET_SETTING_KEY: _Q,
    PROJECT_PERSIST_FORMAT_LOCAL_REFS: L7t,
    applyStableLocalPreviewHints: z7t,
    collectLocalCacheAssetIdsFromNode: qX,
    collectLocalCacheAssetIdsFromNodes: BHn,
    hydrateLocalRefAssetsBeforeOpen: AYe,
    isLocalRefProjectPayload: O7t,
    prepareLocalCacheReferencePayload: B7t,
    remapLocalRefAssetsToCurrentCache: F7t,
    stripEphemeralMediaKeepAssetRefs: FHn
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  U7t = ".thumbnails/cover.jpg",
  uga = new Set(["gen-image", "input-image", "preview", "gen-video", "image-tile", "image-compare"]),
  $7t = /\.(avif|bmp|gif|jpe?g|png|webp)(\?|#|$)/i,
  CFe = /\.(mp4|webm|mov|m4v)(\?|#|$)/i,
  EFe = /\.(mp3|wav|m4a|aac|flac)(\?|#|$)/i,
  hga = 80 * 1024,
  pga = 256;

function zHn(e, ...t) {
  return [e.replace(/\\/g, "/").replace(/\/+$/, ""), ...t].join("/").replace(/\/+/g, "/");
}

function mga(e) {
  if (typeof e != "string") return !1;
  const t = e.trim();
  return !t || t.startsWith("blob:") || t.startsWith("data:") || CFe.test(t) || EFe.test(t) ? !1 : vs(t) ? S3(t) : /^https?:\/\//i.test(t);
}

function fga(e) {
  if (typeof e != "string") return null;
  const t = e.trim();
  return t && t.startsWith("local-asset://") && t.slice(14).trim() || null;
}

function gga(e) {
  return nD(e) && e.key.trim() ? e.key.trim() : null;
}

function yga(e) {
  const t = e.settings && typeof e.settings == "object" ? e.settings : null;
  return (Array.isArray(t == null ? void 0 : t.generatedImages) ? t.generatedImages : []).find(a => !!a && typeof a == "object") ?? null;
}

function bga(e) {
  const t = e.settings && typeof e.settings == "object" ? e.settings : null,
    n = yga(e),
    r = String(e.type || ""),
    a = r === "gen-video",
    i = [e._ossThumbnailUrl, t == null ? void 0 : t._ossThumbnailUrl, n == null ? void 0 : n.thumbUrl, n == null ? void 0 : n.fullUrl, e.thumbnailUrl, e.videoPosterUrl, e._ossRemoteUrl, e.content, n == null ? void 0 : n.url];
  for (const s of i) {
    const l = gga(s);
    if (l) return {
      kind: "projectAsset",
      value: l,
      isVideo: a
    };
    const d = fga(s);
    if (d) return {
      kind: "assetId",
      value: d,
      isVideo: a
    };
    if (mga(s)) return {
      kind: "url",
      value: s.trim(),
      isVideo: a
    };
  }
  const o = [t == null ? void 0 : t[_Q], t == null ? void 0 : t._localCacheAssetId, t == null ? void 0 : t._contentAssetId, t == null ? void 0 : t._assetId, e._contentAssetId, e._selectedImageAssetId, t == null ? void 0 : t._selectedImageAssetId, r === "gen-image" || r === "gen-video" || r === "input-image" ? e.id : null];
  for (const s of o) if (typeof s == "string" && s.trim()) return {
    kind: "assetId",
    value: s.trim(),
    isVideo: a
  };
  return null;
}

function UHn(e) {
  var a;
  if (!e || !Array.isArray(e.nodes)) return null;
  const t = [],
    n = [];
  for (const i of e.nodes) {
    if (!i || typeof i != "object") continue;
    const o = i,
      s = bga(o);
    s && (uga.has(String(o.type || "")) ? t.push(s) : n.push(s));
  }
  const r = t[0] || n[0] || null;
  if (!r) return null;
  if (r.kind === "assetId") {
    const i = (a = e.assetIdToLocalPath) == null ? void 0 : a[r.value];
    if (i && $7t.test(i) && eHe(i)) return {
      kind: "localPath",
      value: i,
      isVideo: r.isVideo
    };
  }
  return r;
}

const wre = new Map(),
  Int = new Map();

function vga(e, t) {
  return `${e}:${t}`;
}

function JXt(e, t) {
  if (wre.set(e, t), wre.size > 200) {
    const n = wre.keys().next().value;
    n && wre.delete(n);
  }
  return t;
}

async function G7t(e) {
  if (!qm()) return null;
  const t = Ur.getDirectoryPathTauri();
  return t ? zHn(t, Tp, e, U7t) : null;
}

async function Cnt(e, t = 0) {
  if (qm()) {
    const r = await G7t(e);
    if (!r) return null;
    try {
      if (!(await Fp(r))) return null;
    } catch {
      return null;
    }
    await Ur.registerAssetProtocolScope();
    const a = await Ur.convertAbsolutePathToSrc(r);
    return a ? t ? `${a}${a.includes("?") ? "&" : "?"}t=${t}` : a : null;
  }
  const n = Ur.getDirectoryHandle();
  if (!n) return null;
  try {
    const o = await (await (await (await (await n.getDirectoryHandle(Tp, {
      create: !1
    })).getDirectoryHandle(e, {
      create: !1
    })).getDirectoryHandle(".thumbnails", {
      create: !1
    })).getFileHandle("cover.jpg", {
      create: !1
    })).getFile();
    return URL.createObjectURL(o);
  } catch {
    return null;
  }
}

async function ZXt(e) {
  try {
    const t = await Ur.getConvertFileSrcForAsset(e);
    if (t && !CFe.test(t) && !EFe.test(t)) return t;
  } catch {}
  return null;
}

async function $Hn(e, t = !1) {
  for (const n of [`thumb_${e}`, `preview_${e}`]) {
    const r = await ZXt(n);
    if (r) return r;
  }
  try {
    const n = await Ur.readThumbnail(e, "thumb");
    if (n && !CFe.test(n) && !EFe.test(n)) return n;
  } catch {}
  try {
    const n = await Ur.readThumbnail(e, "preview");
    if (n && !CFe.test(n) && !EFe.test(n)) return n;
  } catch {}
  return t ? ZXt(e) : null;
}

async function GHn(e, t = !0) {
  var i;
  const n = Ur.getDirectoryPathTauri(),
    r = Ur.getManifest();
  if (!n || !r) return null;
  const a = t ? [`thumb_${e}`, `preview_${e}`] : [`thumb_${e}`, `preview_${e}`, e];
  for (const o of a) {
    const s = (i = r.assets[o]) == null ? void 0 : i.fileName;
    if (!s) continue;
    const l = zHn(n, s);
    if ($7t.test(l)) try {
      if (await Fp(l)) return l;
    } catch {}
  }
  return null;
}

async function wga(e, t) {
  if (t.kind === "url") return vs(t.value) && !S3(t.value) ? null : t.value;
  if (t.kind === "projectAsset") return eOe(e, t.value);
  if (t.kind === "localPath") return eHe(t.value) ? (await Ur.registerAssetProtocolScope(), Ur.convertAbsolutePathToSrc(t.value)) : null;
  const n = await $Hn(t.value);
  if (n) return n;
  const r = await GHn(t.value);
  return r ? (await Ur.registerAssetProtocolScope(), Ur.convertAbsolutePathToSrc(r)) : eOe(e, t.value);
}

async function tbt(e, t) {
  if (!qm()) return !1;
  const n = await G7t(e);
  if (!n) return !1;
  try {
    const r = n.replace(/[/\\][^/\\]+$/, "");
    return await qc(r, {
      recursive: !0
    }), (await Fr("copy_local_files_batch", {
      items: [{
        src: t,
        dest: n
      }]
    })).succeeded === 1;
  } catch {
    return !1;
  }
}

async function VHn(e, t) {
  if (/^https?:\/\//i.test(t) && !/asset\.localhost|asset:\/\//i.test(t) || vs(t) && !S3(t)) return !1;
  try {
    const n = await fetch(t);
    if (!n.ok) return !1;
    const r = await n.blob();
    if (!r.size || !String(r.type || "").startsWith("image/")) return !1;
    let a;
    if (r.size > hga) {
      const {
          thumbnailStore: i
        } = await Ie(async () => {
          const {
            thumbnailStore: s
          } = await Promise.resolve().then(() => Y$);
          return {
            thumbnailStore: s
          };
        }, void 0, import.meta.url),
        o = URL.createObjectURL(r);
      try {
        const s = await i.generateThumbnail(o, pga, .55),
          l = s.indexOf(",");
        if (l < 0) return !1;
        const d = atob(s.slice(l + 1));
        a = new Uint8Array(d.length);
        for (let u = 0; u < d.length; u++) a[u] = d.charCodeAt(u);
      } finally {
        URL.revokeObjectURL(o);
      }
    } else a = new Uint8Array(await r.arrayBuffer());
    return await vWe(e, U7t, a), !0;
  } catch {
    return !1;
  }
}

async function xga(e, t, n) {
  if (!(t.kind === "url" && /^https?:\/\//i.test(t.value) && !/asset\.localhost/i.test(t.value)) && !(t.kind === "localPath" && (await tbt(e, t.value)))) {
    if (t.kind === "assetId") {
      const r = await GHn(t.value);
      if (r && (await tbt(e, r))) return;
    }
    await VHn(e, n);
  }
}

async function _ga(e, t) {
  const n = t ?? (await rTt(e));
  if (!n) return null;
  try {
    const r = JSON.parse(n);
    if (t) return r;
    const a = await aTt(e);
    return JEt(r, j5e(a));
  } catch {
    return null;
  }
}

async function kga(e, t) {
  var i;
  if (t != null && t.force) {
    if (qm()) {
      const o = await G7t(e);
      if (o) try {
        await hk(o);
      } catch {}
    }
  } else {
    const o = await Cnt(e, t == null ? void 0 : t.updatedAt);
    if (o) return {
      url: o
    };
  }
  const n = await _ga(e, t == null ? void 0 : t.rawPayload),
    r = UHn(n);
  if (!r) return null;
  let a = await wga(e, r);
  if (!a && r.kind === "assetId") {
    const o = (i = n == null ? void 0 : n.assetIdToLocalPath) == null ? void 0 : i[r.value];
    if (o && $7t.test(o) && (await tbt(e, o))) {
      const s = await Cnt(e, t == null ? void 0 : t.updatedAt);
      if (s) return {
        url: s,
        isVideo: r.isVideo
      };
    }
    if (a = await $Hn(r.value, !0), a) {
      await VHn(e, a);
      const s = await Cnt(e);
      if (s) return {
        url: s,
        isVideo: r.isVideo
      };
    }
  }
  return !a || vs(a) && !S3(a) ? null : (xga(e, r, a), {
    url: a,
    isVideo: r.isVideo
  });
}

async function V7t(e, t = 0, n) {
  const r = await SYe(e, t, n);
  return (r == null ? void 0 : r.url) ?? null;
}

async function SYe(e, t = 0, n) {
  const r = vga(e, t);
  if (!(n != null && n.force) && !(n != null && n.rawPayload) && wre.has(r)) return wre.get(r) ?? null;
  const a = n != null && n.force ? `${r}:force` : r,
    i = Int.get(a);
  if (i) return i;
  const o = kga(e, {
    ...n,
    updatedAt: t
  }).then(s => JXt(r, s)).catch(() => JXt(r, null)).finally(() => Int.delete(a));
  return Int.set(a, o), o;
}

async function Aga(e, t) {
  Ur.isAvailable() && (await SYe(e, Date.now(), {
    force: !0,
    rawPayload: t
  }));
}

const Sga = Object.freeze(Object.defineProperty({
  __proto__: null,
  STUDIO_PROJECT_COVER_REL: U7t,
  loadStudioProjectCover: V7t,
  loadStudioProjectCoverHit: SYe,
  pickStudioProjectCoverSource: UHn,
  refreshStudioProjectCoverFromPayload: Aga
}, Symbol.toStringTag, {
  value: "Module"
}));

function IYe(e) {
  const [t, n] = g.useState({}),
    r = e.map(a => `${a.id}:${a.updatedAt}`).join("|");
  return g.useEffect(() => {
    let a = !1;
    if (e.length === 0) {
      n({});
      return;
    }
    return Promise.all(e.map(async i => [i.id, await SYe(i.id, i.updatedAt)])).then(i => {
      if (a) return;
      const o = {};
      for (const [s, l] of i) l != null && l.url && (o[s] = l);
      n(o);
    }), () => {
      a = !0;
    };
  }, [r]), t;
}

function Iga({
  showLabel: e = !1,
  onOpen: t
}) {
  on();
  const {
      fontSize: n
    } = QKe(),
    {
      isDark: r
    } = Oy(),
    [a, i] = g.useState(!1),
    [o, s] = g.useState(n),
    l = g.useRef(n),
    d = g.useRef(0),
    u = g.useRef(null),
    h = g.useRef(null),
    p = g.useCallback(y => {
      l.current = Math.round(Math.min(24, Math.max(12, y)) * 10) / 10, s(l.current), cancelAnimationFrame(d.current), d.current = requestAnimationFrame(() => {
        var b, v;
        (v = (b = u.current) == null ? void 0 : b.closest(".studio-page")) == null || v.style.setProperty("--local-skill-font-size", `${l.current}px`);
      });
    }, []),
    m = g.useCallback(() => {
      if (l.current !== cie().fontSize) try {
        DBn({
          fontSize: l.current
        });
      } catch {
        p(cie().fontSize), qi("字号保存失败，请检查本地存储空间");
      }
    }, [p]);
  g.useEffect(() => {
    l.current = n, s(n);
  }, [n]), g.useEffect(() => () => {
    cancelAnimationFrame(d.current);
  }, []), g.useEffect(() => {
    if (!a) return;
    const y = v => {
        var _, w;
        (_ = u.current) != null && _.contains(v.target) || (w = h.current) != null && w.contains(v.target) || (m(), i(!1));
      },
      b = v => {
        var _;
        v.key === "Escape" && (m(), i(!1), (_ = u.current) == null || _.focus());
      };
    return document.addEventListener("pointerdown", y, !0), document.addEventListener("keydown", b), () => {
      document.removeEventListener("pointerdown", y, !0), document.removeEventListener("keydown", b);
    };
  }, [a, m]);
  const f = y => {
    p(y), m();
  };
  return c.jsxs(c.Fragment, {
    children: [c.jsxs("button", {
      ref: u,
      type: "button",
      className: "studio-home-font-trigger",
      "aria-label": x("正文字号"),
      title: x("正文字号"),
      "aria-haspopup": "dialog",
      "aria-expanded": a,
      onClick: () => {
        m(), a || t == null || t(), i(!a);
      },
      children: [c.jsx(_U, {
        size: 16
      }), e && c.jsx("span", {
        children: x("字号")
      })]
    }), c.jsx(yg, {
      open: a,
      anchorRef: u,
      isDark: r,
      placement: "auto",
      align: e ? "left" : "right",
      minWidth: 224,
      unstyled: !0,
      className: `studio-home-font-menu studio-content-menu${r ? " is-dark" : ""}`,
      dataPortalAttr: "data-studio-font-menu",
      children: c.jsxs("div", {
        ref: h,
        role: "dialog",
        "aria-label": x("正文字号设置"),
        children: [c.jsxs("header", {
          children: [c.jsx("span", {
            children: x("正文字号")
          }), c.jsx("button", {
            type: "button",
            onClick: () => f(14),
            children: x("重置")
          })]
        }), c.jsxs("div", {
          className: "studio-home-font-stepper",
          children: [c.jsx("button", {
            type: "button",
            "aria-label": x("减小字号"),
            disabled: o <= 12,
            onClick: () => f(o - 1),
            children: c.jsx(AS, {
              size: 14
            })
          }), c.jsxs("output", {
            children: [o, "px"]
          }), c.jsx("button", {
            type: "button",
            "aria-label": x("增大字号"),
            disabled: o >= 24,
            onClick: () => f(o + 1),
            children: c.jsx(eo, {
              size: 14
            })
          })]
        }), c.jsx("input", {
          type: "range",
          "aria-label": x("正文字号大小"),
          min: 12,
          max: 24,
          step: .1,
          value: o,
          style: {
            "--font-progress": `${(o - 12) / 12 * 100}%`
          },
          onChange: y => p(Number(y.target.value)),
          onPointerUp: m,
          onPointerCancel: m,
          onKeyUp: m,
          onBlur: m
        })]
      })
    })]
  });
}

const Cga = "qiaodoumayi-canvas-chrome",
  Ega = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i,
  nbt = new Set();

function Ent(e) {
  try {
    const t = localStorage.getItem(e);
    return t == null ? null : JSON.parse(t);
  } catch {
    return null;
  }
}

function eJt(e) {
  if (typeof e != "string") return null;
  const t = e.trim().toLowerCase();
  return Ega.test(t) ? t.length === 4 ? `#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}` : t : null;
}

function HHn() {
  const e = MS(V$n().mode);
  if (e) return {
    theme: e.tone,
    isDark: e.tone === "dark",
    background: e.background
  };
  const n = Ent(Zi.THEME) === "light" ? "light" : "dark",
    r = eJt(Ent(Zi.CANVAS_BG_COLOR_LIGHT)) ?? I5e,
    a = eJt(Ent(Zi.CANVAS_BG_COLOR_DARK)) ?? yZ;
  return {
    theme: n,
    isDark: n !== "light",
    background: n === "light" ? r : a
  };
}

let TFe = typeof window > "u" ? {
  theme: "dark",
  isDark: !0,
  background: yZ
} : HHn();

function Tga() {
  return TFe = HHn(), TFe;
}

function Ive() {
  Tga(), nbt.forEach(e => e());
}

function Mga(e) {
  return nbt.add(e), () => nbt.delete(e);
}

function Pga() {
  return TFe;
}

typeof window < "u" && (G$n(Ive), window.addEventListener("storage", e => {
  (e.key === Zi.THEME || e.key === Zi.CANVAS_BG_COLOR_LIGHT || e.key === Zi.CANVAS_BG_COLOR_DARK || e.key === null) && Ive();
}), window.addEventListener(Cga, () => Ive()));

function H7t() {
  return g.useSyncExternalStore(Mga, Pga, () => TFe);
}

let Cve = !1;

const rbt = new Set();

function Rga() {
  rbt.forEach(e => e());
}

function WHn(e) {
  return rbt.add(e), () => {
    rbt.delete(e);
  };
}

function Nga(e = Cve) {
  if (typeof document > "u") return;
  const t = document.documentElement;
  if (e) {
    t.dataset.historyPanelOpen = "true", delete t.dataset.historyToolbarSnap;
    return;
  }
  t.dataset.historyToolbarSnap = "true", delete t.dataset.historyPanelOpen, requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      delete t.dataset.historyToolbarSnap;
    });
  });
}

function KX() {
  return Cve;
}

function b_e(e) {
  const t = typeof e == "function" ? e(Cve) : e;
  t !== Cve && (Cve = t, t ? Ie(async () => {
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
  }).catch(() => {}), Nga(t), Rga());
}

function jga() {
  b_e(!0);
}

function qHn() {
  b_e(!1);
}

function Dga() {
  b_e(e => !e);
}

function KHn(e) {
  return WHn(e);
}

function ZIe() {
  return g.useSyncExternalStore(WHn, KX, KX);
}

const Lga = JSON.parse('[{"id":"xinpianchang.com","title":"新片场","url":"https://www.xinpianchang.com/","region":"domestic","category":"filmMotion"},{"id":"xiaohongshu.com","title":"小红书","url":"https://www.xiaohongshu.com/explore","region":"domestic","category":"filmMotion"},{"id":"bilibili.com","title":"哔哩哔哩","url":"https://www.bilibili.com/","region":"domestic","category":"filmMotion"},{"id":"douyin.com","title":"抖音","url":"https://www.douyin.com/","region":"domestic","category":"filmMotion"},{"id":"weibo.com","title":"微博","url":"https://weibo.com/","region":"domestic","category":"filmMotion"},{"id":"movie.douban.com","title":"豆瓣电影","url":"https://movie.douban.com/","region":"domestic","category":"filmMotion"},{"id":"zcool.com.cn","title":"站酷","url":"https://www.zcool.com.cn/","region":"domestic","category":"visualDesign"},{"id":"huaban.com","title":"花瓣","url":"https://huaban.com/","region":"domestic","category":"visualDesign"},{"id":"cnu.cc","title":"CNU 视觉联盟","url":"http://www.cnu.cc/","region":"domestic","category":"visualDesign"},{"id":"tvcbook.com","title":"TVCBOOK","url":"https://www.tvcbook.com/discover","region":"domestic","category":"filmMotion"},{"id":"campaign.nowness.cn","title":"NOWNESS 天才发现计划","url":"https://campaign.nowness.cn/","region":"domestic","category":"filmMotion"},{"id":"cinehello.com","title":"影视工业网","url":"https://cinehello.com/","region":"domestic","category":"filmMotion"},{"id":"manamana.net","title":"MANA","url":"https://www.manamana.net/","region":"domestic","category":"visualDesign"},{"id":"d-arts.cn","title":"数艺网","url":"https://www.d-arts.cn/","region":"domestic","category":"visualDesign"},{"id":"digitaling.com","title":"数英","url":"https://www.digitaling.com/projects","region":"domestic","category":"brandCreative"},{"id":"adquan.com","title":"广告门","url":"https://www.adquan.com/case_library/index","region":"domestic","category":"brandCreative"},{"id":"meihua.info","title":"梅花网","url":"https://www.meihua.info/","region":"domestic","category":"brandCreative"},{"id":"topys.cn","title":"TOPYS","url":"https://www.topys.cn/","region":"domestic","category":"brandCreative"},{"id":"promonews.tv","title":"Promo News","url":"https://www.promonews.tv/","region":"domestic","category":"filmMotion"},{"id":"shotdeck.com","title":"ShotDeck","url":"https://shotdeck.com/","region":"domestic","category":"filmMotion"},{"id":"site.frameset.app","title":"Frame Set","url":"https://site.frameset.app/","region":"domestic","category":"filmMotion"},{"id":"itsnicethat.com","title":"It’s Nice That","url":"https://www.itsnicethat.com/projects-creatives","region":"domestic","category":"visualDesign"},{"id":"are.na","title":"Are.na","url":"https://www.are.na/","region":"domestic","category":"visualDesign"},{"id":"underconsideration.com","title":"Brand New","url":"https://www.underconsideration.com/brandnew/","region":"domestic","category":"brandCreative"},{"id":"design360.cn","title":"Design360°","url":"https://design360.cn/","region":"domestic","category":"brandCreative"},{"id":"thetype.com","title":"The Type","url":"https://www.thetype.com/","region":"domestic","category":"brandCreative"},{"id":"hiiibrand.com","title":"Hiiibrand","url":"https://www.hiiibrand.com/","region":"domestic","category":"brandCreative"},{"id":"gtn9.com","title":"古田路9号","url":"https://www.gtn9.com/","region":"domestic","category":"brandCreative"},{"id":"ui.cn","title":"UI 中国","url":"https://www.ui.cn/","region":"domestic","category":"visualDesign"},{"id":"uisdc.com","title":"优设","url":"https://www.uisdc.com/","region":"domestic","category":"visualDesign"},{"id":"hao.uisdc.com","title":"优设导航","url":"https://hao.uisdc.com/","region":"domestic","category":"visualDesign"},{"id":"dezeen.com","title":"Dezeen","url":"https://www.dezeen.com/","region":"domestic","category":"architectureProduct"},{"id":"designboom.com","title":"designboom","url":"https://www.designboom.com/","region":"domestic","category":"architectureProduct"},{"id":"archdaily.cn","title":"ArchDaily 中文","url":"https://www.archdaily.cn/cn","region":"domestic","category":"architectureProduct"},{"id":"gooood.cn","title":"谷德 gooood","url":"https://www.gooood.cn/","region":"domestic","category":"architectureProduct"},{"id":"designverse.com.cn","title":"Designverse","url":"https://www.designverse.com.cn/","region":"domestic","category":"architectureProduct"},{"id":"adstyle.com.cn","title":"AD 安邸","url":"https://www.adstyle.com.cn/","region":"domestic","category":"brandCreative"},{"id":"shejipi.com","title":"设计癖","url":"https://www.shejipi.com/","region":"domestic","category":"architectureProduct"},{"id":"puxiang.com","title":"普象","url":"https://www.puxiang.com/","region":"domestic","category":"architectureProduct"},{"id":"film-grab.com","title":"FilmGrab","url":"https://film-grab.com/","region":"overseas","category":"filmMotion"},{"id":"behance.net","title":"Behance","url":"https://www.behance.net/featured","region":"overseas","category":"visualDesign"},{"id":"artstation.com","title":"ArtStation","url":"https://www.artstation.com/","region":"overseas","category":"visualDesign"},{"id":"pinterest.com","title":"Pinterest","url":"https://www.pinterest.com/","region":"overseas","category":"visualDesign"},{"id":"mubi.com","title":"MUBI Notebook","url":"https://mubi.com/en/notebook","region":"overseas","category":"filmMotion"},{"id":"awwwards.com","title":"Awwwards","url":"https://www.awwwards.com/","region":"overseas","category":"visualDesign"},{"id":"cosmos.so","title":"Cosmos","url":"https://www.cosmos.so/","region":"overseas","category":"visualDesign"},{"id":"shot.cafe","title":"Shot.Cafe","url":"https://shot.cafe/stream/","region":"overseas","category":"visualDesign"},{"id":"flim.ai","title":"Flim","url":"https://flim.ai/","region":"overseas","category":"visualDesign"},{"id":"eyecannndy.com","title":"Eyecannndy","url":"https://eyecannndy.com/","region":"overseas","category":"visualDesign"},{"id":"shotonwhat.com","title":"ShotOnWhat","url":"https://shotonwhat.com/","region":"overseas","category":"visualDesign"},{"id":"theasc.com","title":"American Cinematographer","url":"https://theasc.com/articles","region":"overseas","category":"visualDesign"},{"id":"directorslibrary.com","title":"Directors’ Library","url":"https://directorslibrary.com/latest/","region":"overseas","category":"visualDesign"},{"id":"shots.net","title":"shots","url":"https://shots.net/the-work","region":"overseas","category":"visualDesign"},{"id":"lbbonline.com","title":"Little Black Book","url":"https://lbbonline.com/","region":"overseas","category":"visualDesign"},{"id":"directorsnotes.com","title":"Directors Notes","url":"https://directorsnotes.com/","region":"overseas","category":"visualDesign"},{"id":"nowness.com","title":"NOWNESS","url":"https://www.nowness.com/","region":"overseas","category":"filmMotion"},{"id":"artofthetitle.com","title":"Art of the Title","url":"https://www.artofthetitle.com/","region":"overseas","category":"visualDesign"},{"id":"motionographer.com","title":"Motionographer","url":"https://motionographer.com/","region":"overseas","category":"visualDesign"},{"id":"stashmedia.tv","title":"Stash","url":"https://www.stashmedia.tv/","region":"overseas","category":"visualDesign"},{"id":"the-brandidentity.com","title":"The Brand Identity","url":"https://the-brandidentity.com/","region":"overseas","category":"visualDesign"},{"id":"bpando.org","title":"BP&O","url":"https://bpando.org/","region":"overseas","category":"visualDesign"},{"id":"thedieline.com","title":"The Dieline","url":"https://thedieline.com/","region":"overseas","category":"visualDesign"},{"id":"commarts.com","title":"Communication Arts","url":"https://www.commarts.com/","region":"overseas","category":"visualDesign"},{"id":"dandad.org","title":"D&AD","url":"https://www.dandad.org/awards/professional/","region":"overseas","category":"visualDesign"},{"id":"fontsinuse.com","title":"Fonts In Use","url":"https://fontsinuse.com/","region":"overseas","category":"visualDesign"},{"id":"creativeboom.com","title":"Creative Boom","url":"https://www.creativeboom.com/","region":"overseas","category":"visualDesign"},{"id":"abduzeedo.com","title":"Abduzeedo","url":"https://abduzeedo.com/","region":"overseas","category":"visualDesign"},{"id":"archdaily.com","title":"ArchDaily","url":"https://www.archdaily.com/","region":"overseas","category":"architectureProduct"},{"id":"wallpaper.com","title":"Wallpaper*","url":"https://www.wallpaper.com/","region":"overseas","category":"visualDesign"},{"id":"design-milk.com","title":"Design Milk","url":"https://design-milk.com/","region":"overseas","category":"visualDesign"},{"id":"core77.com","title":"Core77","url":"https://www.core77.com/","region":"overseas","category":"visualDesign"},{"id":"siteinspire.com","title":"SiteInspire","url":"https://www.siteinspire.com/","region":"overseas","category":"visualDesign"},{"id":"mobbin.com","title":"Mobbin","url":"https://mobbin.com/","region":"overseas","category":"visualDesign"},{"id":"godly.website","title":"Godly","url":"https://godly.website/","region":"overseas","category":"visualDesign"},{"id":"land-book.com","title":"Land-book","url":"https://land-book.com/","region":"overseas","category":"visualDesign"},{"id":"savee.it","title":"Savee","url":"https://savee.it/","region":"overseas","category":"visualDesign"},{"id":"designspiration.com","title":"Designspiration","url":"https://www.designspiration.com/","region":"overseas","category":"visualDesign"},{"id":"thisiscolossal.com","title":"Colossal","url":"https://www.thisiscolossal.com/","region":"overseas","category":"visualDesign"},{"id":"booooooom.com","title":"Booooooom","url":"https://www.booooooom.com/","region":"overseas","category":"visualDesign"},{"id":"chatgpt.com","title":"ChatGPT","url":"https://chatgpt.com/","region":"overseas","category":"aiTools"},{"id":"gemini.google.com","title":"Gemini","url":"https://gemini.google.com/","region":"overseas","category":"aiTools"},{"id":"chat.deepseek.com","title":"DeepSeek","url":"https://chat.deepseek.com/","region":"domestic","category":"aiTools"},{"id":"claude.ai","title":"Claude","url":"https://claude.ai/","region":"overseas","category":"aiTools"},{"id":"kimi.com","title":"Kimi","url":"https://www.kimi.com/","region":"domestic","category":"aiTools"},{"id":"tongyi.aliyun.com","title":"通义","url":"https://www.tongyi.com/","region":"domestic","category":"aiTools"},{"id":"doubao.com","title":"豆包","url":"https://www.doubao.com/chat/","region":"domestic","category":"aiTools"},{"id":"perplexity.ai","title":"Perplexity","url":"https://www.perplexity.ai/","region":"overseas","category":"aiTools"},{"id":"grok.com","title":"Grok","url":"https://grok.com/","region":"overseas","category":"aiTools"},{"id":"copilot.microsoft.com","title":"Copilot","url":"https://copilot.microsoft.com/","region":"overseas","category":"aiTools"}]'),
  Oga = [{
    id: "filmMotion",
    name: "影视动态",
    accent: "#9ca3af"
  }, {
    id: "visualDesign",
    name: "视觉设计",
    accent: "#4ade80"
  }, {
    id: "brandCreative",
    name: "品牌创意",
    accent: "#f87171"
  }, {
    id: "architectureProduct",
    name: "建筑与产品",
    accent: "#a78bfa"
  }, {
    id: "aiTools",
    name: "AI",
    accent: "#60a5fa"
  }],
  Bga = Lga;

function abt(e, t = "") {
  const n = e.trim();
  if (n && !/^https?:/i.test(n)) return n.slice(0, 1).toUpperCase();
  try {
    return (new URL(t).hostname.replace(/^www\./, "").slice(0, 1) || "#").toUpperCase();
  } catch {
    return "#";
  }
}

function tJt(e = 4) {
  const t = {};
  for (const n of Oga) {
    const r = Bga.filter(o => o.category === n.id),
      a = [],
      i = [...r];
    for (; i.length && a.length < e;) a.push(i.splice(Math.floor(Math.random() * i.length), 1)[0]);
    t[n.id] = a;
  }
  return t;
}

const QHn = "" + new URL("brand-logo-dark-BLKnMPm0.png", import.meta.url).href,
  YHn = "" + new URL("brand-logo-DFJpb1GX.png", import.meta.url).href;

function Fga({
  url: e,
  title: t
}) {
  return on(), c.jsx("span", {
    className: "wsb-chip-logo",
    children: c.jsx("span", {
      "aria-hidden": !0,
      children: abt(t, e)
    })
  });
}

const I6 = 34,
  Iee = 220,
  zga = 1.5;

function Uga(e, t, n, r) {
  const a = r ? {
    r: 148,
    g: 163,
    b: 184,
    a: .1
  } : {
    r: 63,
    g: 63,
    b: 70,
    a: .12
  };
  e.fillStyle = `rgba(${a.r},${a.g},${a.b},${a.a})`;
  for (let i = I6 * .5; i < n; i += I6) for (let o = I6 * .5; o < t; o += I6) e.fillRect(o - 1, i - 1, 2, 2);
}

function $ga(e, t, n, r, a) {
  const i = r ? {
      r: 148,
      g: 163,
      b: 184,
      a: .1
    } : {
      r: 63,
      g: 63,
      b: 70,
      a: .12
    },
    o = r ? {
      r: 186,
      g: 224,
      b: 255,
      a: .22
    } : {
      r: 82,
      g: 82,
      b: 91,
      a: .28
    },
    s = Iee * Iee,
    l = s / 4,
    d = Math.max(I6 * .5, a.y - Iee),
    u = Math.min(n, a.y + Iee),
    h = Math.max(I6 * .5, a.x - Iee),
    p = Math.min(t, a.x + Iee);
  for (let m = I6 * .5; m < u; m += I6) {
    if (m < d) continue;
    const f = m - a.y;
    for (let y = I6 * .5; y < p; y += I6) {
      if (y < h) continue;
      const b = y - a.x,
        v = b * b + f * f;
      if (v > s) continue;
      const _ = Math.exp(-(v / (2 * l)));
      e.fillStyle = `rgba(${i.r + (o.r - i.r) * _ | 0},${i.g + (o.g - i.g) * _ | 0},${i.b + (o.b - i.b) * _ | 0},${i.a + (o.a - i.a) * _})`, e.fillRect(y - 1, m - 1, 2, 2);
    }
  }
}

function Gga({
  isDark: e
}) {
  on();
  const t = g.useRef(null),
    n = g.useRef(null),
    r = g.useRef(null),
    a = g.useRef(0),
    i = g.useRef(null),
    o = g.useRef(e);
  o.current = e;
  const s = g.useCallback(() => {
      const d = t.current,
        u = n.current;
      if (!d || !u) return;
      const h = u.getContext("2d");
      if (!h) return;
      const p = d.clientWidth,
        m = d.clientHeight;
      if (p <= 0 || m <= 0) return;
      const f = Math.min(window.devicePixelRatio || 1, zga),
        y = Math.max(1, Math.floor(p * f)),
        b = Math.max(1, Math.floor(m * f));
      u.width !== y && (u.width = y), u.height !== b && (u.height = b);
      const v = o.current,
        _ = `${y}x${b}:${v ? 1 : 0}`;
      if (!i.current || i.current.key !== _) {
        const k = document.createElement("canvas");
        k.width = y, k.height = b;
        const A = k.getContext("2d");
        if (!A) return;
        A.setTransform(f, 0, 0, f, 0, 0), Uga(A, p, m, v), i.current = {
          canvas: k,
          key: _
        };
      }
      h.setTransform(f, 0, 0, f, 0, 0), h.clearRect(0, 0, p, m), h.drawImage(i.current.canvas, 0, 0, p, m);
      const w = r.current;
      w && $ga(h, p, m, v, w);
    }, []),
    l = g.useCallback(() => {
      a.current || (a.current = requestAnimationFrame(() => {
        a.current = 0, s();
      }));
    }, [s]);
  return g.useEffect(() => {
    const d = t.current;
    if (!d) return;
    const u = new ResizeObserver(() => l());
    u.observe(d);
    let h = !1;
    const p = b => {
        const v = d.getBoundingClientRect(),
          _ = b.clientX - v.left,
          w = b.clientY - v.top,
          k = _ < 0 || w < 0 || _ > v.width || w > v.height,
          A = r.current;
        if (k && !A) return;
        const S = k ? null : {
          x: _,
          y: w
        };
        A && S && Math.abs(A.x - S.x) < 10 && Math.abs(A.y - S.y) < 10 || (r.current = S, l());
      },
      m = () => {
        h || (h = !0, window.addEventListener("mousemove", p, {
          passive: !0
        }));
      },
      f = typeof window.requestIdleCallback == "function" ? window.requestIdleCallback(() => {
        l(), m();
      }, {
        timeout: 320
      }) : 0,
      y = f ? 0 : window.setTimeout(() => {
        l(), m();
      }, 48);
    return () => {
      u.disconnect(), a.current && cancelAnimationFrame(a.current), a.current = 0, f && window.cancelIdleCallback(f), y && window.clearTimeout(y), h && window.removeEventListener("mousemove", p);
    };
  }, [l]), g.useEffect(() => {
    l();
  }, [e, l]), c.jsx("div", {
    className: "wsb-home-dots",
    ref: t,
    "aria-hidden": !0,
    children: c.jsx("canvas", {
      ref: n
    })
  });
}

function Vga({
  isDark: e,
  groups: t,
  onShuffle: n,
  onOpen: r
}) {
  on();
  const a = g.useMemo(() => {
    const i = new Set();
    return Object.values(t).flat().filter(o => i.has(o.id) ? !1 : (i.add(o.id), !0));
  }, [t]);
  return c.jsxs("div", {
    className: "wsb-home",
    children: [c.jsx(Gga, {
      isDark: e
    }), c.jsx("div", {
      className: "wsb-home-mark",
      "aria-hidden": !0,
      children: c.jsx("span", {
        className: "wsb-home-mark-frame",
        children: c.jsx("img", {
          src: e ? YHn : QHn,
          alt: "",
          draggable: !1
        })
      })
    }), c.jsxs("div", {
      className: "wsb-home-copy",
      children: [c.jsx("p", {
        children: x("随便看看")
      }), c.jsx("button", {
        type: "button",
        className: "wsb-icon-btn",
        title: x("换一批"),
        onClick: n,
        children: c.jsx(ox, {
          size: 13
        })
      })]
    }), c.jsx("div", {
      className: "wsb-sites",
      children: a.map((i, o) => c.jsxs("button", {
        type: "button",
        className: "wsb-chip",
        style: {
          animationDelay: `${o % 8 * -.55}s`,
          animationDuration: `${5.2 + o % 5 * .4}s`
        },
        onClick: () => r(i.url, i.title),
        children: [c.jsx(Fga, {
          url: i.url,
          title: i.title
        }), i.title]
      }, i.id))
    })]
  });
}

const B_ = new Map();

let nJt = !1,
  rJt = "";

const aJt = (e, t) => String(e).includes(t) && /not found|unknown|未找到|不存在|not allowed/i.test(String(e));

function iJt(e) {
  var t, n, r, a;
  return {
    x: e.x,
    y: e.y,
    width: e.width,
    height: e.height,
    clipLeft: e.clipLeft ?? 0,
    punchX: ((t = e.punch) == null ? void 0 : t.x) ?? 0,
    punchY: ((n = e.punch) == null ? void 0 : n.y) ?? 0,
    punchWidth: ((r = e.punch) == null ? void 0 : r.width) ?? 0,
    punchHeight: ((a = e.punch) == null ? void 0 : a.height) ?? 0
  };
}

function fR() {
  var e;
  return typeof window < "u" && !!((e = window.__TAURI_INTERNALS__) != null && e.invoke);
}

async function T_(e, t) {
  if (!fR()) return;
  const n = typeof (t == null ? void 0 : t.id) == "string" ? t.id : void 0,
    r = n ? B_.get(n) : void 0;
  if (n && !r) throw new Error("浏览器标签没有会话归属");
  await Fr(e, {
    ...t,
    ...(n ? {
      scope: r
    } : {})
  });
}

const K4 = {
  async reset() {},
  scoped(e) {
    if (!e) throw new Error("浏览器需要明确的会话归属");
    const t = r => {
        if (B_.get(r) !== e) throw new Error("浏览器标签属于另一会话");
      },
      n = Object.fromEntries(["navigate", "setBounds", "show", "hide", "destroy", "reload", "back", "forward", "setZoom", "eval", "evaluate", "screenshot", "clearData"].map(r => [r, (a, ...i) => (r === "hide" || r === "destroy") && !B_.has(a) ? Promise.resolve() : (t(a), K4[r](a, ...i))]));
    return {
      ...K4,
      ...n,
      async show(r) {
        t(r), rJt = e, await K4.show(r);
      },
      async setOcclusion(r) {
        try {
          await T_("workspace_browser_set_occlusion", {
            scope: e,
            occluded: r
          });
        } catch (a) {
          if (!aJt(a, "workspace_browser_set_occlusion")) throw a;
          r && (await Promise.all([...B_].filter(([, i]) => i === e).map(([i]) => K4.hide(i))));
        }
      },
      async onStateChanged(r) {
        return K4.onStateChanged(a => {
          B_.get(a.id) === e && r(a);
        });
      },
      async reset() {
        if (!fR()) return;
        let r;
        try {
          r = await Fr("workspace_browser_owned_tabs", {
            scope: e
          });
        } catch (a) {
          if (!aJt(a, "workspace_browser_owned_tabs")) throw a;
          nJt = !0, r = [...B_].filter(([, i]) => i === e).map(([i]) => i);
        }
        await Promise.all(r.filter(a => !B_.has(a)).map(a => (B_.set(a, e), K4.destroy(a))));
      },
      async create(r, a, i) {
        if (B_.has(r) && B_.get(r) !== e) throw new Error("浏览器标签属于其他会话");
        B_.set(r, e), await K4.create(r, a, i);
      },
      async onOpenTab(r) {
        return fR() ? JM("workspace-browser-open-tab", a => {
          var i;
          typeof a.payload == "string" ? nJt && rJt === e && r(a.payload) : ((i = a.payload) == null ? void 0 : i.scope) === e && r(a.payload.url);
        }) : () => {};
      }
    };
  },
  get native() {
    return fR();
  },
  async create(e, t, n) {
    await T_("workspace_browser_create", {
      id: e,
      url: t,
      ...iJt(n)
    });
  },
  async navigate(e, t) {
    await T_("workspace_browser_navigate", {
      id: e,
      url: t
    });
  },
  async setBounds(e, t) {
    await T_("workspace_browser_set_bounds", {
      id: e,
      ...iJt(t)
    });
  },
  async show(e) {
    await T_("workspace_browser_show", {
      id: e
    });
  },
  async hide(e) {
    await T_("workspace_browser_hide", {
      id: e
    });
  },
  async destroy(e) {
    await T_("workspace_browser_destroy", {
      id: e
    }), B_.delete(e);
  },
  async reload(e) {
    await T_("workspace_browser_reload", {
      id: e
    });
  },
  async back(e) {
    await T_("workspace_browser_back", {
      id: e
    });
  },
  async forward(e) {
    await T_("workspace_browser_forward", {
      id: e
    });
  },
  async setZoom(e, t) {
    await T_("workspace_browser_set_zoom", {
      id: e,
      factor: t
    });
  },
  async eval(e, t) {
    await T_("workspace_browser_eval", {
      id: e,
      js: t
    });
  },
  async evaluate(e, t) {
    if (!fR()) throw new Error("页面工具需要桌面浏览器");
    const n = B_.get(e);
    if (!n) throw new Error("浏览器标签没有会话归属");
    return Fr("workspace_browser_evaluate", {
      id: e,
      scope: n,
      js: t
    });
  },
  async screenshot(e) {
    if (!fR()) return "";
    const t = B_.get(e);
    if (!t) throw new Error("浏览器标签没有会话归属");
    return Fr("workspace_browser_screenshot", {
      id: e,
      scope: t
    });
  },
  async importChromeBookmarks() {
    return fR() ? Fr("workspace_browser_import_chrome_bookmarks") : [];
  },
  async clearData(e) {
    await T_("workspace_browser_clear_data", {
      id: e
    });
  },
  async setOcclusion(e) {
    await T_("workspace_browser_set_occlusion", {
      occluded: e
    });
  },
  async onStateChanged(e) {
    return fR() ? JM("workspace-browser-state", t => {
      t.payload && e(t.payload);
    }) : () => {};
  },
  async onOpenTab(e) {
    return fR() ? JM("workspace-browser-open-tab", t => {
      t.payload && e(t.payload);
    }) : () => {};
  }
};

function Tnt(e) {
  const t = Number.parseFloat(e);
  return Number.isFinite(t) ? Math.max(0, Math.round(t)) : 0;
}

function Hga(e, t, n) {
  const r = Tnt(e);
  if (r > 0) return r;
  const a = e.trim();
  return !a || a === "0" || a === "0px" ? 0 : Math.max(0, Tnt(t) - Tnt(n));
}

function Wga(e = typeof document > "u" ? null : document.querySelector(".studio-root")) {
  if (!e) return 0;
  const t = getComputedStyle(e.querySelector(".studio-sidebar-slot") ?? e);
  return Hga(t.getPropertyValue("--studio-preview-inset"), t.getPropertyValue("--studio-sidebar-w"), t.getPropertyValue("--studio-sidebar-w-collapsed"));
}

function qga(e, t) {
  return {
    ...e,
    clipLeft: Math.max(0, Math.round(t))
  };
}

function Kga(e, t, n = 8) {
  const r = Math.max(e.x, t.x - n),
    a = Math.max(e.y, t.y - n),
    i = Math.min(e.x + e.width, t.x + t.width + n),
    o = Math.min(e.y + e.height, t.y + t.height + n),
    s = Math.round(i - r),
    l = Math.round(o - a);
  return s < 8 || l < 8 ? null : {
    x: Math.round(r - e.x),
    y: Math.round(a - e.y),
    width: s,
    height: l
  };
}

function Qga(e, t, n = 8) {
  let r = 1 / 0,
    a = 1 / 0,
    i = -1 / 0,
    o = -1 / 0;
  for (const s of t) s.width < 1 || s.height < 1 || (r = Math.min(r, s.x), a = Math.min(a, s.y), i = Math.max(i, s.x + s.width), o = Math.max(o, s.y + s.height));
  return !Number.isFinite(r) || i - r < 1 || o - a < 1 ? null : Kga(e, {
    x: r,
    y: a,
    width: i - r,
    height: o - a
  }, n);
}

function Yga(e) {
  const t = e.reset(),
    n = new Map();
  let r = !1,
    a = {
      id: null,
      bounds: null,
      occluded: !0
    },
    i = 0,
    o = null,
    s = null,
    l = "",
    d;
  const u = p => (a = p, i++, o || (o = (async () => {
      var f, y, b;
      await t;
      let m;
      do {
        m = i;
        const v = a,
          _ = !r && !v.occluded && v.bounds && v.id && ((f = n.get(v.id)) != null && f.created) && !((y = n.get(v.id)) != null && y.closed) ? v.id : null;
        if (s && s !== _) {
          const w = s;
          s = null, l = "", await e.hide(w);
        }
        if (m === i && (!r && d !== v.occluded && (await e.setOcclusion(v.occluded), d = v.occluded), m === i && _ && v.bounds)) {
          const w = v.bounds,
            k = w.punch,
            A = k && k.width > 0 && k.height > 0 ? `${k.x},${k.y},${k.width},${k.height}` : "",
            S = `${_}:${w.x},${w.y},${w.width},${w.height}:${w.clipLeft || 0}:${A}`;
          if (l !== S && (await e.setBounds(_, w), l = S), m !== i || r || (b = n.get(_)) != null && b.closed) continue;
          s !== _ && (await e.show(_), s = _);
        }
      } while (m !== i);
    })().finally(() => {
      o = null;
    }), o)),
    h = async p => {
      const m = n.get(p);
      if (m) return m.closing || (m.closed = !0, m.closing = (async () => {
        const f = u(a);
        await Promise.allSettled([f, m.job]);
        try {
          m.attempted && (await e.destroy(p));
        } finally {
          n.delete(p);
        }
      })()), m.closing;
    };
  return {
    present: u,
    close: h,
    async navigate(p, m, f) {
      if (r) return !1;
      let y = n.get(p);
      if (y != null && y.closed) {
        if (await h(p), r) return !1;
        y = n.get(p);
      }
      if (y || (y = {
        closed: !1,
        attempted: !1,
        created: !1,
        job: t
      }, n.set(p, y)), y.closed) return !1;
      const b = y,
        v = b.job.catch(() => {}).then(async () => (await t, r || b.closed ? !1 : (b.created ? await e.navigate(p, m) : (b.attempted = !0, await e.create(p, m, f), b.created = !0), !r && !b.closed)));
      return b.job = v, v;
    },
    async dispose() {
      r = !0, await Promise.allSettled([u({
        id: null,
        bounds: null,
        occluded: !0
      }), ...Array.from(n.keys(), h)]);
    }
  };
}

let ibt = null;

function oJt(e) {
  ibt = e;
}

async function Xga(e) {
  if (!ibt) throw new Error("canvas send not ready");
  await ibt(e);
}

const Jga = e => `https://www.bing.com/search?q=${encodeURIComponent(e)}`;

function Zga(e) {
  const t = e.trim();
  return t ? /^(https?:\/\/|file:\/\/|about:)/i.test(t) || /^localhost(:\d+)?(\/|$)/i.test(t) || /^[\w-]+(\.[\w-]+)+(:\d+)?(\/|$)/.test(t) : !1;
}

function Mnt(e) {
  return /^about:(blank)?$/i.test(e.trim());
}

function sJt(e) {
  const t = e.trim();
  return t ? Zga(t) ? /^[a-z][a-z0-9+.-]*:/i.test(t) ? {
    url: t,
    kind: "url"
  } : /^[\w-]+(\.[\w-]+)+/.test(t) ? {
    url: `https://${t}`,
    kind: "url"
  } : {
    url: `https://${t}`,
    kind: "url"
  } : {
    url: Jga(t),
    kind: "search"
  } : {
    url: "",
    kind: "empty"
  };
}

const XHn = "workspace-browser-bookmarks",
  W9 = {
    size: 15,
    strokeWidth: 1.75
  },
  lJt = [{
    id: "adaptive",
    label: "自适应"
  }, {
    id: "desktop",
    label: "桌面"
  }, {
    id: "mobile",
    label: "移动端"
  }],
  e0a = "(() => { if (document.getElementById('__wsb_annotate__')) return; const l = document.createElement('div'); l.id = '__wsb_annotate__'; Object.assign(l.style, { position: 'fixed', inset: '0', zIndex: '2147483646', background: 'rgba(24,24,24,.28)', cursor: 'crosshair' }); l.title = '拖拽框选需要批注的区域'; document.documentElement.appendChild(l); })()",
  t0a = "document.getElementById('__wsb_annotate__')?.remove()",
  n0a = "(() => { const f = document.createElement('div'); Object.assign(f.style, { position: 'fixed', inset: '0', background: '#fff', zIndex: '2147483647', opacity: '0.65', pointerEvents: 'none' }); document.documentElement.appendChild(f); setTimeout(() => f.remove(), 140); })()";

function r0a(e) {
  try {
    const t = JSON.parse(localStorage.getItem(`${XHn}:${e}`) || "[]");
    return Array.isArray(t) ? t.filter(n => n == null ? void 0 : n.url) : [];
  } catch {
    return [];
  }
}

function Pnt(e, t) {
  localStorage.setItem(`${XHn}:${t}`, JSON.stringify(e.slice(0, 200)));
}

function JHn() {
  return `wsb-${crypto.randomUUID().replace(/-/g, "").slice(0, 10)}`;
}

function PG() {
  return {
    id: JHn(),
    title: "新标签页",
    url: "",
    input: "",
    status: "complete",
    created: !1,
    fallback: !1,
    navigation: 0,
    device: "adaptive"
  };
}

function cJt(e) {
  if (!e) return null;
  const t = e.getBoundingClientRect();
  return t.width < 8 || t.height < 8 ? null : qga({
    x: Math.round(t.left),
    y: Math.round(t.top),
    width: Math.round(t.width),
    height: Math.round(t.height)
  }, Wga());
}

function a0a(e) {
  const t = e.getBoundingClientRect(),
    n = Array.from(e.ownerDocument.querySelectorAll("[data-wsb-overlay]"), r => {
      const a = r.getBoundingClientRect();
      return {
        x: a.left,
        y: a.top,
        width: a.width,
        height: a.height
      };
    });
  return Qga({
    x: t.left,
    y: t.top,
    width: t.width,
    height: t.height
  }, n);
}

function i0a(e) {
  const t = document.activeElement;
  t instanceof HTMLElement && (e != null && e.contains(t)) && t.blur();
}

function W7t({
  isDark: e,
  scope: t,
  initialUrl: n,
  requestId: r = 0,
  embedded: a = !1,
  hidden: i = !1,
  bridge: o
}) {
  var nt;
  on();
  const s = g.useMemo(() => o || K4.scoped(t), [t, o]),
    l = qQe(),
    [d, u] = g.useState(FX),
    h = S5e(),
    p = ZIe(),
    m = rWe(),
    f = a ? !i : l === "browser" && d === "canvas",
    y = !f || !a && (h || p) || m,
    [b] = g.useState(() => {
      try {
        const ze = JSON.parse(localStorage.getItem(`workspace-browser-session:${t}`) || "{}"),
          Le = Array.isArray(ze.tabs) ? ze.tabs.map(Ke => ({
            ...PG(),
            title: Ke.title || "新标签页",
            url: Ke.url || "",
            input: Ke.url || "",
            device: Ke.device || "adaptive"
          })) : [];
        return {
          tabs: Le.length ? Le : [PG()],
          index: Number(ze.index) || 0
        };
      } catch {
        return {
          tabs: [PG()],
          index: 0
        };
      }
    }),
    [v, _] = g.useState(b.tabs),
    [w, k] = g.useState(() => {
      var ze;
      return ((ze = v[b.index]) == null ? void 0 : ze.id) || v[0].id;
    });
  g.useEffect(() => {
    try {
      localStorage.setItem(`workspace-browser-session:${t}`, JSON.stringify({
        tabs: v.map(({
          title: ze,
          url: Le,
          device: Ke
        }) => ({
          title: ze,
          url: Le,
          device: Ke
        })),
        index: Math.max(0, v.findIndex(ze => ze.id === w))
      }));
    } catch {}
  }, [v, w, t]);
  const [A, S] = g.useState(null),
    [C, I] = g.useState(() => r0a(t)),
    [E, M] = g.useState(!1),
    [T, P] = g.useState([]),
    [R, j] = g.useState(1),
    [B, F] = g.useState(!1),
    [N, G] = g.useState(!1),
    [z, V] = g.useState(!1),
    [O, L] = g.useState(() => tJt()),
    D = g.useRef(null),
    U = g.useRef(null),
    H = g.useRef(null),
    Y = g.useRef(null),
    K = g.useRef(null),
    W = g.useRef(null),
    Q = g.useRef(Promise.resolve()),
    q = g.useRef(0),
    ne = g.useRef(v),
    de = g.useRef(w),
    le = g.useRef(async () => {}),
    J = ze => {
      const Le = ze(ne.current);
      Le !== ne.current && (ne.current = Le, _(Le));
    },
    pe = ze => {
      de.current = ze, k(ze);
    },
    ce = v.find(ze => ze.id === w) ?? v[0],
    we = s.native,
    X = !(ce != null && ce.url);
  g.useEffect(() => BNt(() => u(FX())), []), g.useLayoutEffect(() => {
    const ze = D.current;
    if (ze) {
      if (f) {
        ze.removeAttribute("inert"), ze.removeAttribute("aria-hidden");
        return;
      }
      i0a(ze), ze.setAttribute("inert", ""), ze.setAttribute("aria-hidden", "true");
    }
  }, [f]), g.useEffect(() => {
    const ze = Q.current,
      Le = Yga({
        ...s,
        reset: async () => {
          await ze, await s.reset();
        }
      });
    return W.current = Le, J(Ke => Ke.map(Xe => ({
      ...Xe,
      created: !1
    }))), () => {
      W.current = null, Q.current = Le.dispose();
    };
  }, [s]), g.useEffect(() => {
    if (!we) return;
    let ze,
      Le = !1;
    return s.onStateChanged(Ke => {
      Le || J(Xe => {
        let De = !1;
        const Ye = Xe.map(Ce => {
          if (Ce.id !== Ke.id || (!Ke.url || Mnt(Ke.url)) && !Ce.url) return Ce;
          const He = Ke.title && !/^https?:/i.test(Ke.title) && !Mnt(Ke.title) ? Ke.title : Ce.title,
            Ve = /^https?:\/\//i.test(Ke.url) ? Ke.url : Ce.url,
            it = Ke.status || Ce.status;
          return He === Ce.title && Ve === Ce.url && it === Ce.status ? Ce : (De = !0, {
            ...Ce,
            title: He,
            url: Ve,
            input: Ve !== Ce.url ? Ve : Ce.input,
            status: it
          });
        });
        return De ? Ye : Xe;
      });
    }).then(Ke => {
      Le ? Ke() : ze = Ke;
    }).catch(console.warn), () => {
      Le = !0, ze == null || ze();
    };
  }, [we, s]), g.useEffect(() => {
    if (!we) return;
    let ze,
      Le = !1;
    return s.onOpenTab(Ke => {
      if (Le) return;
      const Xe = sJt(Ke);
      if (Xe.kind === "empty" || Mnt(Xe.url)) return;
      const De = ne.current.find(Ce => Ce.id === de.current);
      if (De && !De.url) {
        le.current(De.id, Xe.url);
        return;
      }
      const Ye = PG();
      J(Ce => [...Ce, Ye]), pe(Ye.id), le.current(Ye.id, Xe.url);
    }).then(Ke => {
      Le ? Ke() : ze = Ke;
    }).catch(console.warn), () => {
      Le = !0, ze == null || ze();
    };
  }, [we, s]);
  const Z = g.useCallback(() => {
    const ze = ne.current.find(Ye => Ye.id === de.current),
      Le = ze != null && ze.created && !ze.fallback && ze.url && ze.status !== "error" ? ze.id : null,
      Ke = (ze == null ? void 0 : ze.device) === "mobile" ? H.current : U.current,
      Xe = !y && Le ? cJt(Ke) : null;
    Xe && Ke && (Xe.punch = a0a(Ke));
    const De = W.current;
    De == null || De.present({
      id: Le,
      bounds: Xe,
      occluded: y
    }).catch(Ye => {
      W.current !== De || !Le || (console.warn("[workspace-browser] present", Ye), re(Le, {
        status: "error"
      }));
    });
  }, [y]);
  g.useEffect(() => {
    const ze = () => {
        q.current || (q.current = requestAnimationFrame(() => {
          q.current = 0, Z();
        }));
      },
      Le = new ResizeObserver(ze);
    U.current && Le.observe(U.current), H.current && Le.observe(H.current);
    const Ke = document.querySelector(".studio-sidebar");
    Ke && Le.observe(Ke);
    const Xe = document.querySelector(".studio-root"),
      De = document.querySelector(".studio-sidebar-slot"),
      Ye = new MutationObserver(ze);
    return Xe && Ye.observe(Xe, {
      attributes: !0,
      attributeFilter: ["class"]
    }), De && Ye.observe(De, {
      attributes: !0,
      subtree: !0,
      attributeFilter: ["class", "data-sidebar-menu-open", "data-project-menu-open", "data-canvas-menu-open"]
    }), window.addEventListener("resize", ze), ze(), () => {
      Le.disconnect(), Ye.disconnect(), window.removeEventListener("resize", ze), cancelAnimationFrame(q.current), q.current = 0;
    };
  }, [Z, w, ce == null ? void 0 : ce.created, ce == null ? void 0 : ce.fallback, ce == null ? void 0 : ce.device, ce == null ? void 0 : ce.status, !!(ce != null && ce.url)]), g.useLayoutEffect(() => {
    Z();
  }, [A, B, ce == null ? void 0 : ce.status, Z]), g.useEffect(() => {
    if (!f || !(ce != null && ce.url) || ce.status !== "loading") return;
    const {
        id: ze,
        navigation: Le
      } = ce,
      Ke = window.setTimeout(() => {
        const Xe = ne.current.find(De => De.id === ze);
        (Xe == null ? void 0 : Xe.navigation) === Le && Xe.status === "loading" && re(ze, {
          status: "slow"
        });
      }, 3e4);
    return () => window.clearTimeout(Ke);
  }, [f, ce == null ? void 0 : ce.id, ce == null ? void 0 : ce.navigation, ce == null ? void 0 : ce.url, ce == null ? void 0 : ce.status]), g.useEffect(() => {
    if (!f) {
      V(!1);
      return;
    }
    const ze = window.setTimeout(() => V(!0), 280);
    return () => window.clearTimeout(ze);
  }, [f]), g.useEffect(() => {
    if (!f) return;
    const ze = Le => {
      var Ke, Xe, De;
      a && !((Ke = D.current) != null && Ke.contains(document.activeElement)) || (Le.ctrlKey || Le.metaKey) && (Le.key.toLowerCase() === "t" && (Le.preventDefault(), ye()), Le.key.toLowerCase() === "l" && (Le.preventDefault(), (Xe = K.current) == null || Xe.focus(), (De = K.current) == null || De.select()));
    };
    return window.addEventListener("keydown", ze), () => window.removeEventListener("keydown", ze);
  }, [f, a]);
  const re = (ze, Le) => {
      J(Ke => Ke.map(Xe => Xe.id === ze ? {
        ...Xe,
        ...Le
      } : Xe));
    },
    fe = async (ze, Le, Ke, Xe = !0, De = !0) => {
      const Ye = sJt(Le);
      if (Ye.kind === "empty") return;
      const Ce = ne.current.find(We => We.id === ze);
      if (!Ce) return;
      const He = Ce.navigation + 1,
        Ve = Ke || (Ye.kind === "search" ? Le.trim() : Ye.url.replace(/^https?:\/\//, "").split("/")[0]);
      if (re(ze, {
        url: Ye.url,
        input: Ye.url,
        title: Ve,
        status: "loading",
        fallback: !we,
        navigation: He
      }), Xe && pe(ze), !we) return ze;
      const it = cJt(U.current) ?? {
          x: 0,
          y: 80,
          width: 800,
          height: 600
        },
        It = W.current,
        Ft = () => W.current === It && ne.current.some(We => We.id === ze && We.navigation === He);
      try {
        return Ce.status === "error" && (await (It == null ? void 0 : It.close(ze))), !Ft() || !(await (It == null ? void 0 : It.navigate(ze, Ye.url, it))) || !Ft() ? void 0 : (re(ze, {
          created: !0,
          fallback: !1
        }), ze);
      } catch (We) {
        if (!Ft() || (console.warn("[workspace-browser]", We), await (It == null ? void 0 : It.close(ze).catch(console.warn)), !Ft())) return;
        if (De && /belongs to another|tab not created|tab was closed|标签.*会话/.test(String(We))) {
          const Ze = JHn();
          return J(Ge => Ge.map(Oe => Oe.id === ze ? {
            ...Oe,
            id: Ze,
            created: !1
          } : Oe)), de.current === ze && pe(Ze), le.current(Ze, Ye.url, Ve, !1, !1);
        }
        re(ze, {
          created: !1,
          status: "error",
          fallback: !1
        });
      }
    };
  le.current = fe, g.useEffect(() => {
    if (!(!we || !f)) return lBr(t, async (ze, Le) => {
      var Xe;
      if (Le == null || Le.throwIfAborted(), ze.action === "tabs") return {
        tabs: ne.current.map(({
          id: De,
          title: Ye,
          url: Ce,
          status: He
        }) => ({
          id: De,
          title: Ye,
          url: Ce,
          status: He
        })),
        activeId: de.current
      };
      let Ke = ne.current.find(De => De.id === (ze.tabId || de.current));
      if (ze.action === "open") {
        const De = new URL(String(ze.url || ""));
        if (!["https:", "http:"].includes(De.protocol) || De.username || De.password) throw new Error("仅支持不含账号密码的 HTTP(S) 地址");
        if (ze.tabId && !Ke) throw new Error("标签不属于当前会话");
        ze.tabId || (Ke = PG(), J(Ce => [...Ce, Ke]));
        const Ye = await le.current(Ke.id, De.href);
        if (Ke = ne.current.find(Ce => Ce.id === Ye), !(Ke != null && Ke.created)) throw new Error("浏览器未能打开网页");
        return {
          tabId: Ke.id,
          url: De.href,
          note: "已打开，请 snapshot 检查页面是否加载完成。"
        };
      }
      if (!(Ke != null && Ke.created)) throw new Error("请先打开当前会话中的网页");
      if (ze.action === "wait") return await I6n(Math.min(5e3, Math.max(0, Number(ze.milliseconds) || 1e3)), Le), {
        tabId: Ke.id,
        status: (Xe = ne.current.find(De => De.id === Ke.id)) == null ? void 0 : Xe.status
      };
      if (ze.action === "screenshot") return {
        tabId: Ke.id,
        image: await s.screenshot(Ke.id)
      };
      if (!["snapshot", "click", "fill"].includes(ze.action)) throw new Error("未知浏览器操作");
      return {
        tabId: Ke.id,
        ...(await s.evaluate(Ke.id, uBr(ze)))
      };
    });
  }, [t, we, f, s]), g.useEffect(() => {
    for (const ze of ne.current) ze.url && !(n && ze.id === de.current) && le.current(ze.id, ze.url, ze.title, !1);
  }, [s]), g.useEffect(() => {
    n && le.current(de.current, n);
  }, [n, r, s]);
  const ye = () => {
      const ze = PG();
      J(Le => [...Le, ze]), pe(ze.id), requestAnimationFrame(() => {
        var Le;
        return (Le = K.current) == null ? void 0 : Le.focus();
      });
    },
    ie = ze => {
      var De;
      const Le = ne.current,
        Ke = Le.findIndex(Ye => Ye.id === ze);
      if (Ke < 0) return;
      const Xe = Le.filter(Ye => Ye.id !== ze);
      Xe.length || Xe.push(PG()), J(() => Xe), de.current === ze && pe(Xe[Math.min(Ke, Xe.length - 1)].id), (De = W.current) == null || De.close(ze).catch(Ye => {
        console.warn("[workspace-browser] close", Ye), qi("网页关闭失败，请重试");
      });
    },
    ae = ze => {
      ze !== de.current && (pe(ze), S(null), F(!1));
    },
    be = async () => {
      if (ce != null && ce.url) {
        try {
          const {
            openUrl: ze
          } = await Ie(async () => {
            const {
              openUrl: Le
            } = await Promise.resolve().then(() => hFe);
            return {
              openUrl: Le
            };
          }, void 0, import.meta.url);
          await ze(ce.url);
        } catch {
          window.open(ce.url, "_blank", "noopener");
        }
        S(null);
      }
    },
    Ee = !!(ce != null && ce.url && C.some(ze => ze.url === ce.url)),
    xe = () => {
      ce != null && ce.url && (I(ze => {
        const Le = Ee ? ze.filter(Ke => Ke.url !== ce.url) : [{
          url: ce.url,
          title: ce.title || ce.url
        }, ...ze.filter(Ke => Ke.url !== ce.url)];
        return Pnt(Le, t), Le;
      }), Vs(Ee ? "已移除书签" : "已加入书签"));
    },
    he = ze => {
      var Ke;
      const Le = Math.min(2, Math.max(.5, Math.round(ze * 10) / 10));
      if (j(Le), ce != null && ce.created && !ce.fallback && s.setZoom(ce.id, Le), ce != null && ce.fallback) {
        const Xe = (Ke = U.current) == null ? void 0 : Ke.querySelector("iframe");
        Xe && (Xe.style.transformOrigin = "0 0", Xe.style.transform = `scale(${Le})`, Xe.style.width = `${100 / Le}%`, Xe.style.height = `${100 / Le}%`);
      }
    },
    ue = async () => {
      if (!(ce != null && ce.url) || !ce.created || ce.fallback) {
        qi("当前页无法截图");
        return;
      }
      try {
        await s.eval(ce.id, n0a).catch(() => {});
        const ze = await s.screenshot(ce.id);
        if (!ze) throw new Error("empty");
        await Xga([ze]), YBe(), Vs("已发送到画布");
      } catch {
        qi("截图失败");
      }
    },
    ge = async () => {
      const ze = !N;
      G(ze), ce != null && ce.created && !ce.fallback && (await s.eval(ce.id, ze ? e0a : t0a).catch(() => {})), Vs(ze ? "批注模式已开启" : "已退出批注模式");
    },
    _e = ze => {
      const Le = de.current,
        Ke = ne.current.find(Xe => Xe.id === Le);
      if (re(Le, {
        device: ze
      }), F(!1), ze === "mobile" && !(Ke != null && Ke.url)) {
        Vs("打开网页后生效");
        return;
      }
      Vs(ze === "mobile" ? "设备预览：移动端" : ze === "desktop" ? "设备预览：桌面端" : "设备预览：自适应");
    },
    ke = async () => {
      try {
        const ze = await s.importChromeBookmarks();
        I(Le => {
          const Ke = [...ze.filter(Xe => Xe == null ? void 0 : Xe.url), ...Le.filter(Xe => !ze.some(De => De.url === Xe.url))];
          return Pnt(Ke, t), Ke.slice(0, 200);
        }), S("bookmarks"), Vs(`已导入 ${ze.length} 条 Chrome 书签`);
      } catch (ze) {
        const Le = typeof ze == "string" ? ze : ze == null ? void 0 : ze.message;
        qi(Le || "未找到本机 Chrome 书签");
      }
    },
    ve = () => {
      S(null), qi("Chrome Cookie 受系统加密保护，无法直接导入。书签可以导入。");
    },
    Te = async () => {
      try {
        const {
            downloadDir: ze
          } = await Ie(async () => {
            const {
              downloadDir: Ke
            } = await Promise.resolve().then(() => wT);
            return {
              downloadDir: Ke
            };
          }, void 0, import.meta.url),
          {
            openPath: Le
          } = await Ie(async () => {
            const {
              openPath: Ke
            } = await Promise.resolve().then(() => hFe);
            return {
              openPath: Ke
            };
          }, void 0, import.meta.url);
        await Le(await ze());
      } catch {}
      S(null);
    };
  g.useEffect(() => {
    A !== "bookmarks" && (M(!1), P([]));
  }, [A]);
  const Ne = ze => {
    F(!1), S(Le => Le === ze ? null : ze);
  };
  g.useEffect(() => {
    if (!A && !B) return;
    const ze = Ke => {
        const Xe = Ke.target;
        B && !(Xe != null && Xe.closest(".wsb-device")) && F(!1), A && !(Xe != null && Xe.closest("[data-wsb-chrome]")) && S(null);
      },
      Le = () => {
        S(null), F(!1);
      };
    return document.addEventListener("mousedown", ze), window.addEventListener("blur", Le), () => {
      document.removeEventListener("mousedown", ze), window.removeEventListener("blur", Le);
    };
  }, [A, B]), g.useEffect(() => {
    var Le;
    const ze = (Le = Y.current) == null ? void 0 : Le.querySelector(".wsb-tab.is-active");
    ze == null || ze.scrollIntoView({
      inline: "nearest",
      block: "nearest"
    });
  }, [w, v.length]);
  const me = ze => {
      Math.abs(ze.deltaY) <= Math.abs(ze.deltaX) || (ze.currentTarget.scrollLeft += ze.deltaY, ze.preventDefault());
    },
    Ae = !!(ce != null && ce.url) && !we,
    Fe = Ae ? c.jsx("iframe", {
      className: "wsb-iframe",
      title: ce.title,
      src: ce.url,
      onLoad: () => re(ce.id, {
        status: "complete"
      }),
      onError: () => re(ce.id, {
        status: "error"
      })
    }, `${ce.id}:${ce.navigation}`) : null,
    Me = async ze => {
      if (!(!(ce != null && ce.created) || ce.status === "error")) try {
        await s[ze](ce.id);
      } catch {
        re(ce.id, {
          status: "error"
        });
      }
    },
    Re = async () => {
      if (ce != null && ce.url) {
        if (!we || !ce.created || ce.status === "error" || ce.status === "slow") {
          await fe(ce.id, ce.url, ce.title);
          return;
        }
        re(ce.id, {
          status: "loading",
          navigation: ce.navigation + 1
        });
        try {
          await s.reload(ce.id);
        } catch {
          re(ce.id, {
            status: "error"
          });
        }
      }
    },
    $e = (ce == null ? void 0 : ce.device) === "mobile" && !!(ce != null && ce.url),
    rt = (ce == null ? void 0 : ce.device) ?? "adaptive";
  return c.jsxs("section", {
    ref: D,
    "aria-label": a ? x("会话浏览器") : void 0,
    className: `workspace-browser${a ? " is-embedded" : ""}${f ? " is-active" : ""}${z ? " is-settled" : ""}${e ? "" : " is-light"}`,
    children: [c.jsxs("div", {
      className: "wsb-tabs",
      children: [!a && c.jsx(R7t, {
        isDark: e,
        canvasTitle: qla() ?? void 0,
        onCanvasClick: () => {
          dGn() ? uGn() : YBe();
        }
      }), c.jsx("div", {
        className: "wsb-tab-list",
        ref: Y,
        onWheel: me,
        children: v.map(ze => c.jsxs("button", {
          type: "button",
          className: `wsb-tab${ze.id === w ? " is-active" : ""}`,
          onClick: () => void ae(ze.id),
          children: [ze.url ? c.jsx("span", {
            className: "wsb-favicon wsb-mark",
            "aria-hidden": !0,
            children: abt(ze.title, ze.url)
          }) : c.jsx(i9, {
            size: 12,
            strokeWidth: 1.75,
            opacity: .7
          }), c.jsx("span", {
            children: ze.title || x("新标签页")
          }), c.jsx("span", {
            className: "wsb-tab-close",
            role: "button",
            tabIndex: 0,
            "aria-label": x("关闭 {0}", ze.title || "新标签页"),
            onKeyDown: Le => {
              Le.key !== "Enter" && Le.key !== " " || (Le.preventDefault(), Le.stopPropagation(), ie(ze.id));
            },
            onClick: Le => {
              Le.stopPropagation(), ie(ze.id);
            },
            children: c.jsx(Na, {
              size: 12
            })
          })]
        }, ze.id))
      }), c.jsx("button", {
        type: "button",
        className: "wsb-icon-btn",
        title: x("新标签页"),
        onClick: ye,
        children: c.jsx(eo, {
          ...W9
        })
      })]
    }), c.jsxs("div", {
      className: "wsb-bar",
      "data-wsb-chrome": !0,
      children: [c.jsx("button", {
        type: "button",
        className: "wsb-icon-btn",
        title: x("后退"),
        disabled: !we || !(ce != null && ce.created) || ce.status === "error",
        onClick: () => void Me("back"),
        children: c.jsx(uw, {
          ...W9
        })
      }), c.jsx("button", {
        type: "button",
        className: "wsb-icon-btn",
        title: x("前进"),
        disabled: !we || !(ce != null && ce.created) || ce.status === "error",
        onClick: () => void Me("forward"),
        children: c.jsx(H7, {
          ...W9
        })
      }), c.jsx("button", {
        type: "button",
        className: "wsb-icon-btn",
        title: x("刷新"),
        disabled: !(ce != null && ce.url),
        onClick: () => void Re(),
        children: c.jsx(ox, {
          ...W9
        })
      }), c.jsx("label", {
        className: "wsb-url",
        children: c.jsx("input", {
          ref: K,
          value: (ce == null ? void 0 : ce.input) ?? "",
          placeholder: x("搜索一下或输入链接"),
          spellCheck: !1,
          onChange: ze => ce && re(ce.id, {
            input: ze.target.value
          }),
          onKeyDown: ze => {
            ze.key === "Enter" && ce && fe(ce.id, ce.input);
          }
        })
      }), c.jsxs("div", {
        className: "wsb-bar-actions",
        "data-wsb-chrome": !0,
        children: [c.jsx("button", {
          type: "button",
          className: `wsb-icon-btn${Ee ? " is-active" : ""}`,
          "data-tip": x(Ee ? "取消书签" : "添加到书签"),
          disabled: !(ce != null && ce.url),
          onClick: xe,
          children: c.jsx(OEn, {
            ...W9,
            fill: Ee ? "currentColor" : "none"
          })
        }), c.jsx("button", {
          type: "button",
          className: "wsb-icon-btn",
          "data-tip": x("截图"),
          "aria-label": x("截图"),
          disabled: !(ce != null && ce.url),
          onClick: () => void ue(),
          children: c.jsx(Kh, {
            ...W9
          })
        }), c.jsx("button", {
          type: "button",
          className: `wsb-icon-btn${N ? " is-active" : ""}`,
          "data-tip": x("批注"),
          "aria-label": x("批注"),
          disabled: !(ce != null && ce.url),
          onClick: () => void ge(),
          children: c.jsx(cNr, {
            ...W9
          })
        }), c.jsx("button", {
          type: "button",
          className: `wsb-icon-btn${A === "downloads" ? " is-active" : ""}`,
          "data-tip": x("下载（0 项进行中）"),
          onClick: () => Ne("downloads"),
          children: c.jsx(ws, {
            ...W9
          })
        }), c.jsx("button", {
          type: "button",
          className: `wsb-icon-btn${A === "menu" ? " is-active" : ""}`,
          "data-tip": x("更多"),
          "aria-label": x("更多"),
          onClick: () => Ne("menu"),
          children: c.jsx(hw, {
            ...W9
          })
        })]
      })]
    }), A === "menu" ? c.jsxs("div", {
      className: "wsb-menu",
      "data-wsb-chrome": !0,
      "data-wsb-overlay": !0,
      children: [c.jsx("button", {
        type: "button",
        className: "wsb-menu-item",
        onClick: () => void be(),
        disabled: !(ce != null && ce.url),
        children: x("在外部浏览器打开")
      }), c.jsxs("div", {
        className: "wsb-menu-row",
        children: [c.jsx("span", {
          children: x("缩放")
        }), c.jsxs("div", {
          className: "wsb-zoom-ctl",
          children: [c.jsx("button", {
            type: "button",
            onClick: () => he(R - .1),
            children: c.jsx(AS, {
              size: 13
            })
          }), c.jsxs("em", {
            children: [Math.round(R * 100), "%"]
          }), c.jsx("button", {
            type: "button",
            onClick: () => he(R + .1),
            children: c.jsx(eo, {
              size: 13
            })
          }), c.jsx("button", {
            type: "button",
            title: x("重置"),
            onClick: () => he(1),
            children: c.jsx(ox, {
              size: 13
            })
          })]
        })]
      }), c.jsxs("div", {
        className: "wsb-menu-row",
        children: [c.jsx("span", {
          children: x("设备预览")
        }), c.jsxs("div", {
          className: "wsb-device",
          children: [c.jsxs("button", {
            type: "button",
            className: `node-dropdown-button wsb-device-btn${B ? " is-open" : ""}`,
            onClick: ze => {
              ze.stopPropagation(), F(Le => !Le);
            },
            children: [c.jsx("span", {
              children: x((nt = lJt.find(ze => ze.id === rt)) == null ? void 0 : nt.label)
            }), c.jsx(Mi, {
              size: 12
            })]
          }), B ? c.jsx("div", {
            className: `node-dropdown-menu wsb-device-menu${e ? " is-dark" : ""}`,
            "data-wsb-overlay": !0,
            children: lJt.map(ze => c.jsx("button", {
              type: "button",
              className: rt === ze.id ? "is-active" : "",
              onClick: () => _e(ze.id),
              children: x(ze.label)
            }, ze.id))
          }) : null]
        })]
      }), c.jsx("button", {
        type: "button",
        className: "wsb-menu-item",
        onClick: () => void ke(),
        children: x("从 Chrome 导入书签")
      }), c.jsx("button", {
        type: "button",
        className: "wsb-menu-item",
        onClick: ve,
        children: x("从 Chrome 导入 Cookie")
      }), c.jsxs("button", {
        type: "button",
        className: "wsb-menu-item",
        onClick: () => Ne("bookmarks"),
        children: [x("书签"), c.jsx(ss, {
          size: 14
        })]
      }), c.jsx("button", {
        type: "button",
        className: "wsb-menu-item",
        disabled: !(ce != null && ce.created) || ce.fallback,
        onClick: async () => {
          try {
            ce != null && ce.created && (await s.clearData(ce.id)), S(null), Vs("已清除 Cookie");
          } catch (ze) {
            qi(`清除失败：${String(ze)}`);
          }
        },
        children: x("清除 Cookie")
      }), c.jsx("button", {
        type: "button",
        className: "wsb-menu-item",
        disabled: !(ce != null && ce.created) || ce.fallback,
        onClick: async () => {
          try {
            ce != null && ce.created && (await s.clearData(ce.id)), S(null), Vs("已清除缓存");
          } catch (ze) {
            qi(`清除失败：${String(ze)}`);
          }
        },
        children: x("清除缓存")
      })]
    }) : null, A === "downloads" ? c.jsxs("div", {
      className: "wsb-panel",
      "data-wsb-chrome": !0,
      "data-wsb-overlay": !0,
      children: [c.jsxs("div", {
        className: "wsb-panel-head",
        children: [c.jsx("span", {
          children: x("下载内容")
        }), c.jsx("button", {
          type: "button",
          className: "wsb-icon-btn",
          title: x("打开下载文件夹"),
          onClick: () => void Te(),
          children: c.jsx(ws, {
            size: 14
          })
        }), c.jsx("button", {
          type: "button",
          className: "wsb-icon-btn",
          title: x("关闭"),
          onClick: () => S(null),
          children: c.jsx(Na, {
            size: 14
          })
        })]
      }), c.jsx("div", {
        className: "wsb-panel-empty",
        children: x("暂无下载")
      })]
    }) : null, A === "bookmarks" ? c.jsxs("div", {
      className: "wsb-panel",
      "data-wsb-chrome": !0,
      "data-wsb-overlay": !0,
      children: [c.jsxs("div", {
        className: "wsb-panel-head",
        children: [c.jsx("span", {
          children: E ? x("已选 {0}", T.length) : x("书签")
        }), C.length > 0 ? c.jsx("button", {
          type: "button",
          className: "wsb-icon-btn",
          title: x(E ? "完成" : "批量删除"),
          onClick: () => {
            M(ze => !ze), P([]);
          },
          children: x(E ? "完成" : "选择")
        }) : null, c.jsx("button", {
          type: "button",
          className: "wsb-icon-btn",
          title: x("关闭"),
          onClick: () => S(null),
          children: c.jsx(Na, {
            size: 14
          })
        })]
      }), C.length === 0 ? c.jsx("div", {
        className: "wsb-panel-empty",
        children: x("暂无书签")
      }) : c.jsxs(c.Fragment, {
        children: [c.jsx("div", {
          className: "wsb-panel-list",
          children: C.map(ze => {
            const Le = T.includes(ze.url);
            return c.jsxs("button", {
              type: "button",
              className: Le ? "is-picked" : "",
              onClick: () => {
                if (E) {
                  P(Ke => Le ? Ke.filter(Xe => Xe !== ze.url) : [...Ke, ze.url]);
                  return;
                }
                ce && fe(ce.id, ze.url, ze.title), S(null);
              },
              children: [E ? c.jsx("i", {
                className: `wsb-check${Le ? " is-on" : ""}`
              }) : c.jsx("span", {
                className: "wsb-favicon wsb-mark",
                "aria-hidden": !0,
                children: abt(ze.title, ze.url)
              }), c.jsx("span", {
                children: ze.title || ze.url
              })]
            }, ze.url);
          })
        }), E ? c.jsxs("div", {
          className: "wsb-panel-actions",
          children: [c.jsx("button", {
            type: "button",
            onClick: () => P(T.length === C.length ? [] : C.map(ze => ze.url)),
            children: T.length === C.length ? x("取消全选") : x("全选")
          }), c.jsxs("button", {
            type: "button",
            className: "is-danger",
            disabled: T.length === 0,
            onClick: () => {
              const ze = new Set(T);
              I(Le => {
                const Ke = Le.filter(Xe => !ze.has(Xe.url));
                return Pnt(Ke, t), Ke;
              }), P([]), Vs(`已删除 ${T.length} 条书签`), T.length >= C.length && M(!1);
            },
            children: [c.jsx(Qo, {
              size: 13
            }), x(" 删除")]
          })]
        }) : null]
      })]
    }) : null, c.jsxs("div", {
      className: `wsb-content${$e ? " is-mobile" : ""}`,
      ref: U,
      children: [ce != null && ce.url && (ce.status === "error" || ce.status === "slow" || Ae) ? c.jsxs("div", {
        className: "wsb-error",
        role: ce.status === "error" ? "alert" : "status",
        "data-wsb-overlay": !0,
        children: [c.jsx("span", {
          children: x(ce.status === "error" ? "浏览器未能打开网页。" : ce.status === "slow" ? "网页加载时间较长，可以重试或使用外部浏览器。" : "部分网站不允许内嵌访问。若页面空白，请用外部浏览器打开。")
        }), c.jsx("button", {
          type: "button",
          onClick: () => void Re(),
          children: x("重试")
        }), c.jsx("button", {
          type: "button",
          onClick: () => void be(),
          children: x("外部打开")
        })]
      }) : null, (ce == null ? void 0 : ce.status) === "loading" && ce.url ? c.jsx("div", {
        className: "wsb-progress"
      }) : null, X && f ? c.jsx(Vga, {
        isDark: e,
        groups: O,
        onShuffle: () => L(tJt()),
        onOpen: (ze, Le) => ce && void fe(ce.id, ze, Le)
      }) : null, $e ? c.jsxs("div", {
        className: "wsb-phone-stage",
        children: [c.jsx("button", {
          type: "button",
          className: "wsb-phone-exit",
          onClick: () => _e("adaptive"),
          children: x("退出移动端")
        }), c.jsx("div", {
          className: "wsb-phone",
          children: c.jsx("div", {
            className: "wsb-phone-screen",
            ref: H,
            children: Fe
          })
        })]
      }) : Fe]
    })]
  });
}

const o0a = g.memo(function (t) {
    on();
    const n = M3(),
      r = n.browserScope || `canvas:${n.activeCanvasId || "unassigned"}`;
    return c.jsx(W7t, {
      ...t,
      scope: r,
      initialUrl: n.browserScope ? n.browserUrl : ""
    }, r);
  }),
  s0a = Object.freeze(Object.defineProperty({
    __proto__: null,
    WorkspaceBrowserHost: o0a,
    WorkspaceBrowserHostComponent: W7t
  }, Symbol.toStringTag, {
    value: "Module"
  }));

function l0a(e) {
  if (!e) throw new Error("浏览器需要明确的会话归属");
  if (typeof window > "u") return null;
  const t = window,
    n = `home-browser:${e}`,
    r = t.__LINGO_STUDIO_HOME_BROWSER__;
  if (r) {
    const a = async (o, s = {}) => {
        await r.command(o, {
          ...s,
          scope: n
        });
      },
      i = o => s => a(o, {
        id: s
      });
    return {
      ...K4,
      native: !0,
      reset: async () => {},
      create: (o, s, l) => a("create", {
        id: o,
        url: s,
        bounds: l
      }),
      navigate: (o, s) => a("navigate", {
        id: o,
        url: s
      }),
      setBounds: (o, s) => a("bounds", {
        id: o,
        bounds: s
      }),
      show: i("show"),
      hide: i("hide"),
      destroy: i("destroy"),
      back: i("back"),
      forward: i("forward"),
      reload: i("reload"),
      setOcclusion: o => a("occlusion", {
        occluded: o
      }),
      setZoom: (o, s) => a("zoom", {
        id: o,
        factor: s
      }),
      eval: (o, s) => a("eval", {
        id: o,
        js: s
      }),
      evaluate: (o, s) => r.command("eval", {
        id: o,
        js: s,
        scope: n
      }),
      screenshot: async o => String(await r.command("screenshot", {
        id: o,
        scope: n
      })),
      clearData: o => a("clear-data", {
        id: o
      }),
      onStateChanged: async o => r.onState(s => {
        s.scope === n && o(s);
      }),
      onOpenTab: async o => r.onOpen(s => {
        s.scope === n && o(s.url);
      })
    };
  }
  return t.__LINGO_ELECTRON_NATIVE_SHELL__ || t.__LINGO_SIDECAR__ || !K4.native ? null : K4.scoped(n);
}

const c0a = "atelier-home-browser-address:";

function d0a(e) {
  const t = e.trim(),
    n = /^(?:localhost|[^/:\s]+\.[^/:\s]+|\[[\da-f:]+\]):\d+(?:[/?#]|$)/i.test(t);
  if (!t || /^[a-z][a-z\d+.-]*:/i.test(t) && !/^https?:\/\//i.test(t) && !n) return null;
  try {
    const r = new URL(/^https?:\/\//i.test(t) ? t : `https://${t}`);
    return ["http:", "https:"].includes(r.protocol) && !r.username && !r.password ? r.href : null;
  } catch {
    return null;
  }
}

function u0a(e) {
  try {
    return d0a(localStorage.getItem(c0a + e) || "") || "";
  } catch {
    return "";
  }
}

function h0a({
  initialUrl: e,
  scope: t,
  requestId: n = 0,
  occluded: r = !1
}) {
  const {
      isDark: a
    } = H7t(),
    i = g.useMemo(() => {
      var s;
      try {
        if ((s = JSON.parse(localStorage.getItem(`workspace-browser-session:home-browser:${t}`) || "{}").tabs) != null && s.some(l => l.url)) return "";
      } catch {}
      return u0a(t);
    }, [t]),
    o = g.useMemo(() => {
      const s = K4.scoped(`home-browser:${t}`),
        l = l0a(t);
      return l ? {
        ...s,
        ...l
      } : {
        ...s,
        native: !1
      };
    }, [t]);
  return c.jsx(W7t, {
    isDark: a,
    scope: `home-browser:${t}`,
    initialUrl: e || i,
    requestId: n,
    embedded: !0,
    hidden: r,
    bridge: o
  }, t);
}

const ZHn = {
    start: "开始",
    files: "工作区文件",
    terminal: "命令终端",
    browser: "浏览器",
    images: "图片生成"
  },
  obt = "qiaodoumayi_studio_home_tools:";

function dJt(e) {
  try {
    const t = localStorage.getItem(obt + e);
    return t && Object.prototype.hasOwnProperty.call(ZHn, t) ? t : null;
  } catch {
    return null;
  }
}

function p0a(e, t) {
  try {
    t ? localStorage.setItem(obt + e, t) : localStorage.removeItem(obt + e);
  } catch {}
}

function m0a(e, t, n) {
  return JSON.stringify({
    format: "atelier-home-session",
    version: 1,
    threadId: e,
    rootPath: t,
    exportedAt: new Date().toISOString(),
    messages: n
  }, null, 2);
}

function f0a({
  rootPath: e,
  threadId: t,
  messages: n,
  expanded: r,
  onToggle: a,
  onOpen: i,
  view: o,
  onViewChange: s
}) {
  on();
  const [l, d] = g.useState(null),
    u = g.useRef(null);
  g.useEffect(() => {
    const m = y => {
        var b;
        (b = u.current) != null && b.contains(y.target) || d(null);
      },
      f = y => {
        var b, v;
        y.key === "Escape" && (d(null), (v = (b = u.current) == null ? void 0 : b.querySelector("[aria-expanded=true]")) == null || v.focus());
      };
    return document.addEventListener("mousedown", m), document.addEventListener("keydown", f), () => {
      document.removeEventListener("mousedown", m), document.removeEventListener("keydown", f);
    };
  }, []);
  const h = () => {
      d(null), SIe(e).catch(m => qi(String(m)));
    },
    p = () => {
      const m = URL.createObjectURL(new Blob([m0a(t, e, n)], {
          type: "application/json"
        })),
        f = document.createElement("a");
      f.href = m, f.download = s_(`${t}-session.json`), document.body.appendChild(f), f.click(), f.remove(), window.setTimeout(() => URL.revokeObjectURL(m), 1e3), d(null);
    };
  return c.jsxs("div", {
    className: "studio-home-tools-header",
    ref: u,
    children: [c.jsxs("div", {
      role: "tablist",
      "aria-label": x("会话视图"),
      children: [c.jsx("button", {
        role: "tab",
        "aria-selected": o === "conversation",
        onClick: () => s("conversation"),
        children: x("对话")
      }), c.jsx("button", {
        role: "tab",
        "aria-selected": o === "trajectory",
        onClick: () => s("trajectory"),
        children: x("轨迹")
      })]
    }), c.jsxs("div", {
      className: "studio-home-tools-actions",
      children: [c.jsx(Iga, {
        onOpen: () => d(null)
      }), c.jsxs("div", {
        className: "studio-home-tools-folder",
        children: [c.jsx("button", {
          type: "button",
          title: x(e ? "在资源管理器打开工作区" : "尚未选择工作区"),
          "aria-label": x("在资源管理器打开工作区"),
          disabled: !e,
          onClick: h,
          children: c.jsx(_h, {
            size: 15
          })
        }), c.jsx("button", {
          type: "button",
          "aria-label": x("工作区工具"),
          "aria-haspopup": "menu",
          "aria-expanded": l === "folder",
          onClick: () => d(l === "folder" ? null : "folder"),
          children: c.jsx(Mi, {
            size: 12
          })
        })]
      }), c.jsx("button", {
        type: "button",
        "aria-label": x("会话更多操作"),
        "aria-haspopup": "menu",
        "aria-expanded": l === "more",
        onClick: () => d(l === "more" ? null : "more"),
        children: c.jsx(hw, {
          size: 17
        })
      }), c.jsx("button", {
        type: "button",
        "aria-label": x(r ? "收起侧边工具" : "展开侧边工具"),
        "aria-expanded": r,
        onClick: a,
        children: c.jsx(yNr, {
          size: 16
        })
      })]
    }), l && c.jsx("div", {
      className: "studio-home-tools-menu",
      role: "menu",
      children: l === "folder" ? c.jsxs(c.Fragment, {
        children: [c.jsxs("button", {
          type: "button",
          role: "menuitem",
          disabled: !e,
          onClick: h,
          children: [c.jsx(S5, {
            size: 14
          }), x("资源管理器")]
        }), c.jsxs("button", {
          type: "button",
          role: "menuitem",
          onClick: () => {
            d(null), i("files");
          },
          children: [c.jsx(_h, {
            size: 14
          }), x("工作区文件 "), c.jsx("kbd", {
            children: "Ctrl+P"
          })]
        }), c.jsxs("button", {
          type: "button",
          role: "menuitem",
          onClick: () => {
            d(null), i("terminal");
          },
          children: [c.jsx(pZ, {
            size: 14
          }), x("命令终端 "), c.jsx("kbd", {
            children: "Ctrl+`"
          })]
        }), c.jsxs("button", {
          type: "button",
          role: "menuitem",
          onClick: () => {
            d(null), i("browser");
          },
          children: [c.jsx(i9, {
            size: 14
          }), x("浏览器 "), c.jsx("kbd", {
            children: "Ctrl+T"
          })]
        }), c.jsxs("button", {
          type: "button",
          role: "menuitem",
          onClick: () => {
            d(null), i("images");
          },
          children: [c.jsx(FM, {
            size: 14
          }), x("图片生成")]
        })]
      }) : c.jsxs("button", {
        type: "button",
        role: "menuitem",
        onClick: p,
        children: [c.jsx(ws, {
          size: 14
        }), x("下载会话日志（JSON）")]
      })
    })]
  });
}

function g0a({
  threadId: e,
  rootPath: t,
  onPreview: n
}) {
  on();
  const [r, a] = g.useState(""),
    [i, o] = g.useState("."),
    [s, l] = g.useState(""),
    d = IBn().filter(u => u.threadId === e);
  return c.jsxs("div", {
    className: "studio-home-tools-terminal",
    children: [c.jsx("p", {
      children: x("在当前工作区执行命令，输出保留在本会话。每条命令独立运行，可停止后台进程。")
    }), c.jsxs("form", {
      onSubmit: u => {
        if (u.preventDefault(), !!r.trim()) try {
          TBn(e, t, r.trim(), ad(t, i)), a(""), l("");
        } catch (h) {
          l(h instanceof Error ? h.message : String(h));
        }
      },
      children: [c.jsxs("label", {
        children: [x("工作目录"), c.jsx("input", {
          "aria-label": x("命令工作目录"),
          value: i,
          onChange: u => o(u.target.value),
          placeholder: "."
        })]
      }), c.jsxs("label", {
        children: [x("命令"), c.jsx("textarea", {
          "aria-label": x("终端命令"),
          value: r,
          onChange: u => a(u.target.value),
          placeholder: x("输入 PowerShell / Shell 命令"),
          rows: 3
        })]
      }), c.jsx("button", {
        type: "submit",
        disabled: !r.trim(),
        children: x("运行命令")
      })]
    }), s && c.jsx("p", {
      role: "alert",
      children: s
    }), !d.length && c.jsx("p", {
      className: "studio-home-tools-empty",
      children: x("本会话还没有命令输出。")
    }), c.jsx(MBn, {
      threadId: e,
      onPreview: n
    })]
  });
}

function y0a({
  tool: e,
  threadId: t,
  rootPath: n,
  messages: r,
  isDark: a,
  initialUrl: i,
  browserOccluded: o,
  browserRequestId: s,
  imageRequestId: l,
  onOpen: d,
  onClose: u,
  onPickWorkspace: h,
  onPreview: p
}) {
  on();
  const [m, f] = g.useState(!1);
  return c.jsxs("aside", {
    className: `studio-home-tools-pane is-inline${m ? " is-maximized" : ""}`,
    "aria-label": x("会话侧边工具"),
    children: [c.jsxs("header", {
      children: [c.jsx("button", {
        type: "button",
        onClick: () => d("start"),
        "aria-label": x("工具首页"),
        title: x("工具首页"),
        children: c.jsx(mEt, {
          size: 14
        })
      }), e === "start" ? c.jsx("span", {
        children: x("开始")
      }) : c.jsx("nav", {
        "aria-label": x("侧边工具切换"),
        children: ["files", "terminal", "browser", "images"].map(y => c.jsx("button", {
          type: "button",
          "aria-pressed": y === e,
          onClick: () => d(y),
          children: x(ZHn[y])
        }, y))
      }), c.jsx("button", {
        type: "button",
        "aria-label": x(m ? "恢复工具宽度" : "最大化侧边工具"),
        onClick: () => f(!m),
        children: m ? c.jsx(AT, {
          size: 15
        }) : c.jsx(Wm, {
          size: 15
        })
      }), c.jsx("button", {
        type: "button",
        "aria-label": x("关闭侧边工具"),
        onClick: u,
        children: c.jsx(Na, {
          size: 16
        })
      })]
    }), e === "start" ? c.jsx("div", {
      className: "studio-home-tools-start",
      children: [["files", _h, "工作区文件", "浏览当前会话工作区的文件", "Ctrl+P"], ["terminal", pZ, "命令终端", "在会话工作区运行命令", "Ctrl+`"], ["browser", i9, "浏览器", "浏览网页", "Ctrl+T"], ["images", FM, "图片生成", "查看本会话的图片和生成进度", ""]].map(([y, b, v, _, w]) => c.jsxs("button", {
        type: "button",
        onClick: () => d(y),
        children: [c.jsx(b, {
          size: 19
        }), c.jsxs("div", {
          children: [c.jsx("strong", {
            children: v
          }), c.jsx("small", {
            children: _
          })]
        }), c.jsx("kbd", {
          children: w
        })]
      }, y))
    }) : !n && e !== "browser" ? c.jsxs("div", {
      className: "studio-home-tools-empty",
      children: [c.jsx("p", {
        children: x("先为当前会话选择本地工作区。")
      }), c.jsx("button", {
        type: "button",
        onClick: h,
        children: x("选择工作区")
      })]
    }) : e === "files" ? c.jsx(PNt, {
      coding: !0,
      inline: !0,
      rootPath: n,
      rightOffset: 0,
      isDark: a,
      request: {
        relPath: ".",
        token: 0
      },
      sessionRelPaths: RNt(r),
      renderMarkdown: hre,
      onClose: u,
      onRevealInExplorer: y => {
        SIe(RE(n, y)).catch(b => qi(String(b)));
      }
    }, `${t}:${n}`) : e === "images" ? c.jsx(vVn, {
      scope: eg("studio-home", n, t),
      references: r.flatMap(y => (y.imageGenerations || []).map(b => ({
        ...b,
        messageId: y.id
      }))),
      requestId: l,
      onRetry: async (y, b) => {
        const v = r.find(_ => {
          var w;
          return (w = _.imageGenerations) == null ? void 0 : w.some(k => k.historyIds.includes(y));
        });
        if (!v) throw new Error("原图片任务已移除");
        await JUn(t, v.id, y, b);
      },
      onDelete: y => XUn(t, y)
    }) : e === "terminal" ? c.jsx(g0a, {
      threadId: t,
      rootPath: n,
      onPreview: p
    }, `${t}:${n}`) : c.jsx(h0a, {
      initialUrl: i,
      scope: eg("studio-home", n, t),
      occluded: o,
      requestId: s
    }, eg("studio-home", n, t))]
  });
}

function b0a({
  messages: e
}) {
  return on(), c.jsx("div", {
    className: "studio-home-trajectory",
    "aria-label": x("会话执行轨迹"),
    children: e.length ? e.map(t => {
      var n, r, a, i, o;
      return c.jsxs("section", {
        children: [c.jsxs("h3", {
          children: [t.role === "user" ? x("用户要求") : x("Agent 执行"), " ", c.jsx("time", {
            children: new Date(t.timestamp).toLocaleString()
          })]
        }), t.role === "user" ? c.jsx("p", {
          children: t.content
        }) : c.jsxs(c.Fragment, {
          children: [(n = t.modelCalls) == null ? void 0 : n.map((s, l) => c.jsxs("details", {
            children: [c.jsxs("summary", {
              children: [x("模型调用 "), l + 1, " · ", s.failed ? x("失败") : s.endedAt ? x("完成") : x("进行中"), s.endedAt ? ` · ${V2e(s.endedAt - s.startedAt)}` : ""]
            }), c.jsxs("p", {
              children: [t.modelName || "", s.outputTokens != null ? x(" · 输出 {0} tokens", s.outputTokens) : "", s.firstTokenAt ? x(" · 首 Token {0}ms", s.firstTokenAt - s.startedAt) : ""]
            })]
          }, s.id)), (r = t.agentMindTrace) == null ? void 0 : r.filter(s => s.kind === "thought" || s.kind === "observe").map(s => c.jsxs("details", {
            children: [c.jsx("summary", {
              children: s.label || x("思考")
            }), c.jsx("pre", {
              children: s.preview || s.meta || s.label
            })]
          }, s.id)), (a = t.toolSteps) == null ? void 0 : a.map(s => c.jsxs("details", {
            children: [c.jsxs("summary", {
              children: [s.tool, " · ", s.summary, " · ", s.status === "running" ? x("运行中") : s.ok ? x("完成") : x("失败")]
            }), c.jsx("pre", {
              children: s.command || s.preview || "没有保存详细输出"
            })]
          }, s.id)), !((i = t.modelCalls) != null && i.length) && !((o = t.toolSteps) != null && o.length) && c.jsx("p", {
            children: t.statusDetail || x("本轮没有保存模型或工具调用记录。")
          })]
        })]
      }, t.id);
    }) : c.jsx("p", {
      children: x("发送任务后，这里会显示本会话的执行记录。")
    })
  });
}

function v0a({
  projects: e
}) {
  var J, pe, ce, we, X;
  on();
  const t = UUn(),
    n = QKe(),
    [r, a] = g.useState(!1),
    i = g.useCallback(() => a(!1), []),
    [o, s] = g.useState(""),
    [l, d] = g.useState(0),
    [u, h] = g.useState(),
    {
      homeLanding: p
    } = M3(),
    m = NUn(),
    f = UQe(),
    [y, b] = g.useState(""),
    [v, _] = g.useState([]),
    [w, k] = g.useState(null);
  g.useEffect(() => FOn(async () => {
    if (y.trim() || v.length || w) throw new Error("首页对话中还有未发送的草稿，请先发送或清空后再切换，避免草稿丢失。");
  }), [y, v, w]);
  const [A, S] = g.useState(null),
    [C, I] = g.useState(null),
    E = g.useMemo(() => e.slice(0, 3), [e]),
    M = IYe(E),
    T = t === "local-skill" ? f : m;
  g.useEffect(() => {
    w && !f.messages.some(Z => Z.id === w.messageId) && k(null);
  }, [w, f.messages]);
  const P = !p,
    R = p ? "home" : eg("studio-home", t === "local-skill" ? f.rootPath : "", T.threadId),
    {
      isDark: j
    } = Oy(),
    [B, F] = g.useState({
      scope: R,
      tool: dJt(R)
    }),
    [N, G] = g.useState("conversation"),
    z = t === "local-skill" && P && B.scope === R ? B.tool : null,
    V = g.useCallback(Z => {
      F({
        scope: R,
        tool: Z
      }), p0a(R, Z);
    }, [R]);
  g.useEffect(() => {
    b(""), k(null), _(Z => (Ez(Z), []));
  }, [R]), g.useEffect(() => {
    S(null), s(""), I(null), F({
      scope: R,
      tool: dJt(R)
    }), G("conversation"), h(void 0);
  }, [R, t === "local-skill" ? f.rootPath : void 0]);
  const O = t === "local-skill" && !!f.codePreview && !!f.rootPath,
    L = !z && O && C !== ((J = f.codePreview) == null ? void 0 : J.openedAt),
    D = !!z || !!A || L,
    U = g.useCallback(Z => {
      var re;
      s(""), S(null), I(((re = f.codePreview) == null ? void 0 : re.openedAt) || null), V(Z);
    }, [V, (pe = f.codePreview) == null ? void 0 : pe.openedAt]);
  g.useEffect(() => {
    const Z = re => {
      var fe;
      ((fe = re.detail) == null ? void 0 : fe.scope) === R && t === "local-skill" && P && U("browser");
    };
    return window.addEventListener(lft, Z), () => window.removeEventListener(lft, Z);
  }, [R, t, P, U]), g.useEffect(() => {
    const Z = re => {
      const fe = re.detail;
      (fe == null ? void 0 : fe.scope) !== R || t !== "local-skill" || !P || (h(fe.requestId), U("images"));
    };
    return window.addEventListener(Ggt, Z), () => window.removeEventListener(Ggt, Z);
  }, [R, t, P, U]);
  const H = () => {
    var Z;
    s(""), V(null), S(null), I(((Z = f.codePreview) == null ? void 0 : Z.openedAt) || null);
  };
  g.useEffect(() => {
    if (t !== "local-skill" || !P) return;
    const Z = re => {
      if (re.defaultPrevented || re.isComposing || document.querySelector('dialog[open], [role="dialog"][aria-modal="true"]') || !(re.ctrlKey || re.metaKey) || re.altKey || re.shiftKey) return;
      const fe = re.key.toLowerCase(),
        ye = fe === "p" ? "files" : fe === "t" ? "browser" : fe === "`" ? "terminal" : null;
      ye && (re.preventDefault(), U(ye));
    };
    return window.addEventListener("keydown", Z), () => window.removeEventListener("keydown", Z);
  }, [t, P, U]);
  const Y = g.useCallback(Z => {
      var re;
      V(null), s(""), I(((re = f.codePreview) == null ? void 0 : re.openedAt) || null), S(Z);
    }, [V, (ce = f.codePreview) == null ? void 0 : ce.openedAt]),
    K = g.useCallback(Z => {
      V(null), I(null), s(""), S(null), FQe(Z);
    }, [V]),
    W = g.useCallback(Z => {
      V(null), I(null), s(""), S(null), e$n(f.rootPath, Z);
    }, [V, f.rootPath]),
    Q = f.rootPath ? W6(f.rootPath) : "",
    q = (Z, re) => {
      const fe = p && t === "chat";
      gy(!1);
      const ye = v;
      b(""), _([]), k(null), fe && jQe(), (t === "local-skill" ? jX(Z, ye, f.threadId, {
        interrupt: re,
        quotedFrom: w || void 0
      }) : cNt(Z, ye)).finally(() => {
        Ez(ye);
      });
    },
    ne = ((we = [...f.messages].reverse().find(Z => Z.plan !== void 0)) == null ? void 0 : we.plan) || [],
    de = g.useCallback(Z => {
      var re;
      try {
        const fe = new URL(Z);
        if (!["http:", "https:"].includes(fe.protocol) || fe.username || fe.password) return;
        if (n.linkOpening === "external") {
          UZ(fe.href);
          return;
        }
        S(null), I(((re = f.codePreview) == null ? void 0 : re.openedAt) || null), s(fe.href), d(ye => ye + 1), V("browser");
      } catch {}
    }, [n.linkOpening, (X = f.codePreview) == null ? void 0 : X.openedAt, V]),
    le = t === "local-skill" ? Q ? `我们要在 ${Q} 中构建什么？` : "选择本地工作区，开始写代码" : "今天要做点什么？";
  return c.jsxs("div", {
    style: {
      "--local-skill-font-size": `${n.fontSize}px`
    },
    className: `studio-page${t === "local-skill" ? " is-local-skill" : ""}${P ? " is-chatting" : " studio-page--home-landing"}${O ? " has-preview" : ""}${D ? " is-previewing" : ""}`,
    children: [P && t !== "local-skill" ? c.jsx(Jyt, {
      projects: e,
      origin: "home"
    }) : P ? null : c.jsxs(c.Fragment, {
      children: [c.jsx(_la, {
        emphasizePointer: !0
      }), c.jsx(pGn, {
        view: "home"
      })]
    }), c.jsxs("div", {
      className: `studio-home${P ? " is-chatting" : ""}${t === "local-skill" ? " is-local-skill" : ""}`,
      children: [P && t !== "local-skill" && c.jsx("button", {
        type: "button",
        className: "scl-save-entry scl-chat-save",
        onClick: () => ebt("chat", T.threadId),
        children: "保存到项目库"
      }), P ? c.jsxs(c.Fragment, {
        children: [t === "local-skill" && c.jsxs("div", {
          className: "studio-home-session-bar",
          children: [c.jsx(Jyt, {
            projects: e,
            origin: "home",
            localSkill: !0,
            onHomeBrowser: () => U("browser")
          }), c.jsx("button", {
            type: "button",
            className: "scl-save-entry",
            onClick: () => ebt("harness", f.threadId),
            children: "保存到项目库"
          }), c.jsx(f0a, {
            rootPath: f.rootPath,
            threadId: f.threadId,
            messages: f.messages,
            expanded: D,
            onToggle: () => D ? H() : U("start"),
            onOpen: U,
            view: N,
            onViewChange: G
          })]
        }), c.jsx("div", {
          className: "studio-home-workspace",
          children: t === "local-skill" && N === "trajectory" ? c.jsx(b0a, {
            messages: f.messages
          }) : c.jsx(fpa, {
            footer: t === "local-skill" ? c.jsx(MBn, {
              threadId: f.threadId,
              onPreview: (...Z) => {
                V(null), s(""), S(null), iyt(...Z);
              }
            }) : void 0,
            messages: T.messages,
            generationScope: t === "local-skill" ? R : void 0,
            onOpenAttachment: Y,
            onQuote: t === "local-skill" ? k : void 0,
            onOpenWeb: t === "local-skill" ? de : void 0,
            transcriptView: t === "local-skill" ? n.transcriptView : void 0,
            showCode: t === "local-skill" ? n.showCode : void 0,
            detailedUsage: t === "local-skill" && n.performanceUsage === "detailed",
            sending: T.sending,
            onRegenerate: t === "chat" ? PUn : void 0,
            onDelete: t === "chat" ? TUn : KUn,
            workspaceRoot: t === "local-skill" ? f.rootPath : void 0,
            onUndoEdits: t === "local-skill" ? ZUn : void 0,
            onReviewFile: t === "local-skill" ? K : void 0,
            onOpenPath: t === "local-skill" && f.rootPath ? W : void 0,
            preset: t === "local-skill" ? f.preset : void 0
          })
        })]
      }) : c.jsxs("div", {
        className: "studio-home-heading",
        children: [c.jsx("span", {
          className: "studio-home-orb",
          "aria-hidden": !0
        }), c.jsx("h1", {
          className: "studio-home-title",
          children: x(le)
        })]
      }), t === "local-skill" && f.queuedCount ? c.jsx("p", {
        className: "studio-composer-hint",
        role: "status",
        children: f.sending ? x("已加入 {0} 条要求，将在当前轮结束后处理；停止会取消待处理要求。", f.queuedCount) : c.jsxs(c.Fragment, {
          children: [x("恢复了 "), f.queuedCount, x(" 条尚未执行的要求。"), c.jsx("button", {
            type: "button",
            onClick: YUn,
            children: x("继续处理")
          }), " ", c.jsx("button", {
            type: "button",
            onClick: () => yie(),
            children: x("取消队列")
          })]
        })
      }) : null, t === "local-skill" && P && c.jsxs(c.Fragment, {
        children: [c.jsx(Apa, {
          goal: f.goal,
          sending: f.sending,
          onPause: n$n,
          onResume: r$n
        }), c.jsx(kpa, {
          steps: ne,
          stopped: !f.sending
        }, f.threadId), f.questions && c.jsx(Spa, {
          request: f.questions,
          onAnswer: t$n,
          onCancel: () => yie()
        }, f.questions.id)]
      }), c.jsx(Rfa, {
        value: y,
        onChange: b,
        files: v,
        onFilesChange: _,
        onOpenAttachment: Y,
        quotedFrom: t === "local-skill" ? w : null,
        onClearQuote: () => k(null),
        modelId: T.modelId,
        onModelChange: t === "local-skill" ? HUn : SUn,
        reasoningEffort: m.effort,
        onReasoningChange: IUn,
        sending: T.sending,
        voiceEnabled: t !== "local-skill" || SX(eg("studio-home", f.rootPath, f.threadId)).voiceEnabled,
        placement: P ? "thread" : "home",
        productMode: t,
        workspaceLabel: Q,
        workspacePath: f.rootPath,
        onPickWorkspace: () => void KU(),
        onSelectWorkspace: Z => $Ie(Z),
        permission: f.permission,
        onPermissionChange: qUn,
        preset: f.preset,
        onPresetChange: gie,
        onOpenHarnessSettings: () => a(!0),
        platformGroup: m.platformGroup,
        onPlatformGroupChange: EUn,
        historyCount: m.historyCount,
        onHistoryChange: CUn,
        onSubmit: q,
        onCancel: t === "local-skill" ? yie : lNt,
        canvasSkillId: f.canvasSkillId,
        onCanvasSkillChange: WUn
      }, R), t === "local-skill" && P ? c.jsx(gda, {
        messages: f.messages,
        mode: n.performanceUsage,
        sending: f.sending
      }) : null, P ? null : c.jsxs(c.Fragment, {
        children: [c.jsxs("div", {
          className: "studio-recent",
          children: [c.jsxs("button", {
            type: "button",
            className: "studio-card-new",
            onClick: tFe,
            children: [c.jsx(eo, {
              size: 20,
              strokeWidth: 1.75
            }), c.jsx("span", {
              children: x("新建项目")
            })]
          }), E.map(Z => {
            var re;
            return c.jsx($fa, {
              project: Z,
              cover: (re = M[Z.id]) == null ? void 0 : re.url
            }, Z.id);
          })]
        }), c.jsxs("button", {
          type: "button",
          className: "studio-all-projects",
          onClick: KIe,
          children: [x("所有项目 "), c.jsx(H7, {
            size: 13,
            strokeWidth: 1.75
          })]
        })]
      })]
    }), r && t === "local-skill" && c.jsx(_pa, {
      scope: eg("studio-home", f.rootPath, f.threadId),
      value: f.preset,
      modelId: f.modelId,
      busy: f.sending,
      onChange: gie,
      onClose: i,
      onCreateWithAgent: () => {
        i(), gie("cordis"), b("请帮我创建一个自定义 Agent 预设，先询问我的用途，再组合已有会话插件并保存。");
      }
    }), z && c.jsxs(c.Fragment, {
      children: [c.jsx(fnt, {}), c.jsx(y0a, {
        tool: z,
        threadId: f.threadId,
        rootPath: f.rootPath,
        messages: f.messages,
        isDark: j,
        initialUrl: o,
        browserRequestId: l,
        imageRequestId: u,
        browserOccluded: r,
        onOpen: U,
        onClose: H,
        onPickWorkspace: () => void KU(),
        onPreview: Z => {
          V(null), s(""), S(null), I(null), iyt(Z);
        }
      }, `${R}:${f.rootPath}`)]
    }), A ? c.jsxs(c.Fragment, {
      children: [c.jsx(fnt, {}), c.jsx(wua, {
        file: A,
        onClose: () => S(null)
      })]
    }) : null, !z && !A && t === "local-skill" && f.codePreview && f.rootPath ? c.jsxs(c.Fragment, {
      children: [D ? c.jsx(fnt, {}) : null, f.codePreview.previewUrl ? c.jsx(lea, {
        url: f.codePreview.previewUrl,
        onClose: oyt
      }) : c.jsx(PNt, {
        coding: !0,
        rootPath: f.rootPath,
        isDark: j,
        inline: !0,
        rightOffset: 0,
        sessionRelPaths: RNt(f.messages),
        request: {
          relPath: f.codePreview.relPath,
          token: f.codePreview.openedAt
        },
        renderMarkdown: hre,
        onClose: oyt,
        onRevealInExplorer: Z => {
          SIe(RE(f.rootPath, Z));
        }
      }, `${f.threadId}:${f.rootPath}`)]
    }) : null]
  });
}

function w0a({
  scope: e,
  open: t,
  onClose: n,
  busy: r,
  refreshToken: a,
  query: i,
  toolSteps: o = []
}) {
  on();
  const {
      isDark: s
    } = Oy(),
    [l, d] = g.useState(null),
    [u, h] = g.useState([]),
    [p, m] = g.useState(uH),
    [f, y] = g.useState(""),
    [b, v] = g.useState("https://registry.npmmirror.com"),
    [_, w] = g.useState(""),
    [k, A] = g.useState(!1),
    [S, C] = g.useState(""),
    [I, E] = g.useState(""),
    [M, T] = g.useState(""),
    P = g.useRef(e);
  P.current = e;
  const R = g.useRef(null),
    j = async () => {
      if (!uH()) {
        m(!1);
        return;
      }
      m(!0);
      try {
        const G = await aW(e, "list");
        P.current === e && h(G);
      } finally {
        P.current === e && m(!1);
      }
    };
  g.useEffect(() => {
    h([]), C(""), E(""), T(""), j().catch(G => {
      P.current === e && T(String(G));
    });
  }, [e, a]), g.useEffect(() => {
    var z, V;
    if (d(null), !t) return;
    const G = document.activeElement;
    return (V = (z = R.current) == null ? void 0 : z.querySelector("input")) == null || V.focus(), () => G == null ? void 0 : G.focus();
  }, [t]), g.useEffect(() => {
    if (!S) return;
    let G = !1,
      z = !1;
    const V = setInterval(() => {
      G || (G = !0, aW(e, "progress", {
        id: S
      }).then(O => {
        z || E(O);
      }).catch(() => {}).finally(() => {
        G = !1;
      }));
    }, 1500);
    return () => {
      z = !0, clearInterval(V);
    };
  }, [e, S]);
  const B = async (G, z) => {
      try {
        T(""), G === "update" && (z = {
          ...z,
          operationId: crypto.randomUUID()
        }, C(String(z.operationId)), E("正在安装新版本，当前版本保持可用…")), await aW(e, G, z), await j();
      } catch (V) {
        P.current === e && T(String(V));
      } finally {
        G === "update" && P.current === e && C("");
      }
    },
    F = async () => {
      const G = crypto.randomUUID();
      C(G), T(""), E("正在解析插件来源并安装依赖…");
      try {
        const z = await aW(e, "install", {
          id: G,
          source: f,
          registry: b === "custom" ? _ : b,
          trusted: k
        });
        if (P.current !== e) return;
        E(`${z.log}
${z.plugin.compatible ? "已安装，可在列表中启用。" : z.plugin.reason}`), y(""), A(!1), await j();
      } catch (z) {
        P.current === e && T(String(z));
      } finally {
        P.current === e && C("");
      }
    },
    N = u.filter(G => `${G.name} ${G.source} ${G.tools.map(z => `${z.name} ${z.description}`).join(" ")}`.toLowerCase().includes(i.trim().toLowerCase()));
  return c.jsxs(c.Fragment, {
    children: [c.jsxs("h2", {
      className: "studio-plugin-group-title",
      children: [x("已安装插件 "), c.jsx("span", {
        children: u.length
      })]
    }), c.jsx("p", {
      className: "studio-plugin-hint",
      children: x("仅管理当前对话安装的扩展。启用后，下次发送 Harness 消息时提供工具；调用仍遵守当前模型能力和对话权限。")
    }), uH() ? p ? c.jsx("p", {
      role: "status",
      children: x("正在读取插件状态…")
    }) : !M && !N.length && c.jsx("p", {
      className: "studio-plugin-empty",
      children: u.length ? x("没有匹配的已安装插件。") : x("当前对话尚未安装扩展插件。内置能力可直接在上方配置。")
    }) : c.jsx("p", {
      className: "studio-plugin-empty",
      children: x("扩展插件的安装与执行需要桌面应用。")
    }), c.jsx("div", {
      className: "studio-plugin-installed",
      children: N.map(G => {
        const z = Qta(G, o);
        return c.jsxs("details", {
          children: [c.jsxs("summary", {
            children: [c.jsxs("span", {
              children: [c.jsx("strong", {
                children: G.name
              }), c.jsxs("small", {
                children: [G.version, " · ", G.tools.length, x(" 个工具")]
              })]
            }), c.jsx("span", {
              className: "studio-plugin-status",
              "data-status": z.kind,
              children: x(z.label)
            })]
          }), c.jsxs("div", {
            children: [c.jsx("p", {
              className: "studio-plugin-status-hint",
              "data-status": z.kind,
              children: z.hint
            }), c.jsx("code", {
              children: G.source
            }), !!G.tools.length && c.jsx("ul", {
              className: "studio-plugin-tool-list",
              children: G.tools.map(V => c.jsxs("li", {
                children: [c.jsx("strong", {
                  children: V.name
                }), " · ", V.description]
              }, V.name))
            }), c.jsxs("label", {
              children: [c.jsx("input", {
                type: "checkbox",
                role: "switch",
                "aria-label": x("启用 {0}", G.name),
                checked: G.enabled,
                disabled: r || !!S || !G.compatible,
                onChange: V => void B("enable", {
                  id: G.id,
                  enabled: V.target.checked
                })
              }), x("在当前对话中启用")]
            }), c.jsx("button", {
              type: "button",
              disabled: r || !!S,
              onClick: () => void B("update", {
                id: G.id
              }),
              children: x("更新插件")
            }), G.previous && c.jsxs("button", {
              type: "button",
              disabled: r || !!S,
              onClick: () => void B("rollback", {
                id: G.id
              }),
              children: [x("回退至 "), G.previous.version]
            }), G.updatedAt && c.jsxs("p", {
              children: [x("更新于 "), new Date(G.updatedAt).toLocaleString()]
            }), c.jsx("button", {
              type: "button",
              disabled: r || !!S,
              onClick: () => void B("remove", {
                id: G.id
              }),
              children: x("移除插件")
            })]
          })]
        }, G.id);
      })
    }), !t && S && c.jsxs("div", {
      role: "status",
      children: [c.jsx("p", {
        children: x("正在更新插件，完成验证后切换版本…")
      }), c.jsx("pre", {
        className: "studio-plugin-log",
        children: I
      }), c.jsx("button", {
        type: "button",
        onClick: () => void B("cancel", {
          id: S
        }),
        children: x("取消更新")
      })]
    }), !t && M && c.jsx("p", {
      role: "alert",
      className: "studio-plugin-error",
      children: M
    }), t && Da.createPortal(c.jsx("div", {
      className: "studio-plugin-modal-backdrop",
      children: c.jsxs("div", {
        ref: R,
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "plugin-install-title",
        className: "studio-plugin-content studio-plugin-modal",
        onKeyDown: G => {
          var z, V, O;
          if (G.key === "Escape" && !S && n(), G.key === "Tab") {
            const L = [...Array.from(((z = R.current) == null ? void 0 : z.querySelectorAll("button:not(:disabled), input:not(:disabled), summary")) || []), ...Array.from(document.querySelectorAll(".studio-plugin-registry-menu button"))].filter(D => D.getClientRects().length > 0);
            G.shiftKey && document.activeElement === L[0] && (G.preventDefault(), (V = L[L.length - 1]) == null || V.focus()), !G.shiftKey && document.activeElement === L[L.length - 1] && (G.preventDefault(), (O = L[0]) == null || O.focus());
          }
        },
        children: [c.jsxs("header", {
          children: [c.jsx("h2", {
            id: "plugin-install-title",
            children: x("添加插件")
          }), c.jsx("button", {
            type: "button",
            "aria-label": x("关闭添加插件"),
            disabled: !!S,
            onClick: n,
            children: c.jsx(Na, {
              size: 16
            })
          })]
        }), c.jsx("p", {
          children: x("输入插件的包名、GitHub 仓库地址或本地目录路径。")
        }), c.jsx("input", {
          className: "studio-plugin-source",
          "aria-label": x("插件来源"),
          placeholder: x("插件包名、GitHub 地址或 D:\\\\plugins\\\\my-plugin"),
          value: f,
          disabled: !!S,
          onChange: G => y(G.target.value)
        }), c.jsxs("div", {
          className: "studio-plugin-registry",
          children: [c.jsx("span", {
            children: x("安装源")
          }), c.jsx(qs, {
            scopeId: "studio-plugin-install",
            dropdownType: "registry",
            ariaLabel: x("插件安装源"),
            value: b,
            options: [{
              value: "https://registry.npmjs.org",
              label: "npm 官方源"
            }, {
              value: "https://registry.npmmirror.com",
              label: "中国大陆镜像源"
            }, {
              value: "custom",
              label: "自定义地址"
            }],
            isDark: s,
            activeDropdown: l,
            setActiveDropdown: d,
            disabled: !!S,
            onSelect: v,
            menuPlacement: "auto",
            minMenuWidth: 180,
            menuZIndex: 10010,
            menuClassName: "sketch-chat-popover studio-plugin-registry-menu studio-content-menu"
          })]
        }), b === "custom" && c.jsx("input", {
          className: "studio-plugin-source",
          type: "url",
          "aria-label": x("自定义安装源"),
          placeholder: "https://npm.example.com/",
          value: _,
          disabled: !!S,
          onChange: G => w(G.target.value)
        }), c.jsxs("details", {
          children: [c.jsx("summary", {
            children: x("插件安装引导和兼容说明")
          }), c.jsx("p", {
            children: x("安装后，在“已安装插件”中打开“在当前对话中启用”，下一次发送 Harness 消息时即可调用其工具。插件只作用于当前对话，其他对话需要单独安装和启用。")
          }), c.jsx("p", {
            children: x("仅支持提供 atelierHarness 工具适配的包。DeepSeek / Cordis 原生插件可能显示“需要适配”，安装成功不代表已经可用。只有 SKILL.md 的设计技能请通过 Skill 库或工作区技能目录加载。")
          }), c.jsx("p", {
            children: x("插件安装在独立的会话目录中，不修改画布项目或 DeepSeek 配置。安装期间不执行包的生命周期脚本。私有源凭据请配置在本机 .npmrc。")
          })]
        }), c.jsxs("label", {
          className: "studio-plugin-trust",
          children: [c.jsx("input", {
            type: "checkbox",
            checked: k,
            disabled: !!S,
            onChange: G => A(G.target.checked)
          }), x("我信任此插件来源。启用后，插件代码可访问本机文件和网络。")]
        }), !uH() && c.jsx("p", {
          children: x("请在桌面应用中安装插件。")
        }), M && c.jsx("p", {
          role: "alert",
          className: "studio-plugin-error",
          children: M
        }), I && c.jsx("pre", {
          role: "status",
          className: "studio-plugin-log",
          children: I
        }), c.jsx("footer", {
          children: S ? c.jsx("button", {
            type: "button",
            onClick: () => void B("cancel", {
              id: S
            }),
            children: x("取消安装")
          }) : c.jsx("button", {
            type: "button",
            disabled: r || !f.trim() || !k || b === "custom" && !_.trim() || !uH(),
            onClick: () => void F(),
            children: x("安装插件")
          })
        })]
      })
    }), document.querySelector(".studio-root") || document.body)]
  });
}

function x0a({
  scope: e,
  kind: t
}) {
  on();
  const [n, r] = g.useState({
      children: [],
      tasks: []
    }),
    [a, i] = g.useState([]),
    [o, s] = g.useState(""),
    [l, d] = g.useState(""),
    [u, h] = g.useState(0),
    [p, m] = g.useState("");
  g.useEffect(() => {
    let y = !1;
    const b = () => {
      (t === "schedule" ? TFn(e).then(v => {
        y || i(v);
      }) : CFn(e).then(v => {
        y || r(v);
      })).catch(v => {
        y || m(String(v));
      });
    };
    return b(), window.addEventListener(p0t, b), window.addEventListener(m0t, b), () => {
      y = !0, window.removeEventListener(p0t, b), window.removeEventListener(m0t, b);
    };
  }, [e, t]);
  const f = async y => {
    try {
      await y(), m("");
    } catch (b) {
      m(String(b));
    }
  };
  return c.jsxs("div", {
    className: "studio-plugin-activity",
    children: [p && c.jsx("p", {
      role: "alert",
      className: "studio-plugin-error",
      children: p
    }), t === "schedule" ? c.jsxs(c.Fragment, {
      children: [c.jsx("p", {
        children: x("任务绑定当前对话，应用保持打开时执行；关闭期间错过的任务重新打开后补跑一次。失败会停用并显示原因。")
      }), c.jsxs("form", {
        onSubmit: y => {
          y.preventDefault(), f(async () => {
            await VRe(e, "schedule_create", {
              prompt: o,
              at: new Date(l).toISOString(),
              intervalMinutes: u
            }), s("");
          });
        },
        children: [c.jsx("textarea", {
          required: !0,
          "aria-label": x("定时任务内容"),
          placeholder: x("要执行的任务"),
          value: o,
          onChange: y => s(y.target.value)
        }), c.jsxs("label", {
          children: [x("首次执行"), c.jsx("input", {
            required: !0,
            "aria-label": x("首次执行时间"),
            type: "datetime-local",
            value: l,
            onChange: y => d(y.target.value)
          })]
        }), c.jsxs("label", {
          children: [x("重复间隔（分钟，0 为单次）"), c.jsx("input", {
            type: "number",
            min: "0",
            "aria-label": x("重复间隔"),
            value: u,
            onChange: y => h(Number(y.target.value))
          })]
        }), c.jsx("button", {
          type: "submit",
          children: x("创建任务")
        })]
      }), a.map(y => c.jsxs("article", {
        children: [c.jsxs("span", {
          children: [c.jsx("strong", {
            children: y.prompt
          }), c.jsxs("small", {
            children: [new Date(y.nextRun).toLocaleString(), " · ", y.enabled ? x("已启用") : x("已停用"), y.error && ` · ${y.error}`]
          })]
        }), c.jsx("button", {
          type: "button",
          onClick: () => void f(() => VRe(e, "schedule_update", {
            id: y.id,
            enabled: !y.enabled
          })),
          children: y.enabled ? x("暂停") : x("启用")
        }), c.jsx("button", {
          type: "button",
          onClick: () => void f(() => VRe(e, "schedule_delete", {
            id: y.id
          })),
          children: x("删除")
        })]
      }, y.id))]
    }) : c.jsxs(c.Fragment, {
      children: [c.jsx("h3", {
        children: x("成员与结果")
      }), !n.children.length && c.jsx("p", {
        children: x("在对话中明确要求委派子任务后，成员及结果会显示在这里。")
      }), n.children.map(y => {
        var b;
        return c.jsxs("details", {
          children: [c.jsxs("summary", {
            children: [y.name, " · ", x({
              running: "运行中",
              completed: "已完成",
              failed: "失败",
              stopped: "已停止"
            }[y.status])]
          }), c.jsx("p", {
            children: y.task
          }), c.jsx("pre", {
            children: y.result || "等待结果…"
          }), (b = y.edits) == null ? void 0 : b.map(v => c.jsxs("button", {
            type: "button",
            onClick: () => void f(() => FQe(v)),
            children: [v.relPath, x(" · 查看差异")]
          }, v.undoId || v.path)), y.status === "running" && c.jsx("button", {
            type: "button",
            onClick: () => void f(() => EFn(e, y.id)),
            children: x("停止成员")
          })]
        }, y.id);
      }), t === "team" && c.jsxs(c.Fragment, {
        children: [c.jsx("h3", {
          children: x("共享任务板")
        }), !n.tasks.length && c.jsx("p", {
          children: x("尚无团队任务。")
        }), n.tasks.map(y => c.jsxs("article", {
          children: [y.title, " · ", y.owner || x("未分配"), " · ", x({
            pending: "待处理",
            running: "进行中",
            done: "已完成"
          }[y.status])]
        }, y.id))]
      })]
    })]
  });
}

const xme = [{
  id: "team",
  title: "智能体团队",
  description: "团队协作、成员列表和共享任务看板。",
  icon: eWe,
  toggle: "teamEnabled"
}, {
  id: "review",
  title: "自动授权审查",
  description: "在工具调用前由当前模型审查；未通过时转人工审批。",
  icon: STn,
  toggle: "reviewEnabled"
}, {
  id: "schedule",
  title: "自动化任务",
  description: "按时间或周期执行任务，应用保持打开时运行。",
  icon: cxe,
  toggle: "scheduleEnabled"
}, {
  id: "voice",
  title: "语音输入",
  description: "复用画布语音识别与 Whisper 转写配置。",
  icon: B5,
  toggle: "voiceEnabled"
}, {
  id: "shell",
  title: "终端",
  description: "设置模型命令工具的最长执行时间与返回内容长度。",
  icon: pZ
}, {
  id: "loop",
  title: "Agent 循环",
  description: "设置每次请求的模型调用上限与只读工具并发数。",
  icon: hEt
}, {
  id: "subagent",
  title: "子智能体",
  description: "独立上下文，继承当前工作区与权限，可等待、继续或停止。",
  icon: BEn,
  toggle: "subagentEnabled"
}, {
  id: "search",
  title: "网页搜索",
  description: "读取网页内容；配置 Brave Search 后可独立搜索。",
  icon: mc
}];

function _0a() {
  var z, V, O, L;
  on();
  const {
      isDark: e
    } = Oy(),
    t = UQe(),
    n = eg("studio-home", t.rootPath, t.threadId),
    [, r] = g.useState(0),
    [a, i] = g.useState(""),
    [o, s] = g.useState(!1),
    [l, d] = g.useState(null),
    [u, h] = g.useState(() => HRe(n).braveApiKey),
    [p, m] = g.useState(""),
    [f, y] = g.useState(""),
    [b, v] = g.useState(0),
    [_, w] = g.useState(null);
  g.useEffect(() => {
    const D = () => r(U => U + 1);
    return window.addEventListener(iI, D), () => window.removeEventListener(iI, D);
  }, []), g.useEffect(() => {
    d(null), s(!1), y(""), m(""), h(HRe(n).braveApiKey);
  }, [n]);
  const k = Ob(t.preset),
    A = E2e(k.id, n),
    S = Nce(k.id, n),
    C = C2e(k.id, n),
    I = SX(n),
    E = Ob(kBe),
    M = IIe(),
    T = A.includes("tool-web") && !S.includes("tool-web"),
    P = !!HRe(n).braveApiKey,
    R = D => {
      const U = xme.find(H => H.id === D);
      return D === "search" ? T ? P ? "搜索与网页读取已启用" : "待配置搜索 · 网页读取可用" : "未启用" : (D === "subagent" || D === "team") && I[D === "team" ? "teamEnabled" : "subagentEnabled"] && !I.subagentMaxDepth ? D === "team" ? "任务板已启用 · 未开放子智能体" : "待配置 · 最大层级为 0" : D === "shell" ? A.some(H => (H === "tool-bash" || H === "tool-pwsh") && eE(H) && !S.includes(H)) ? "已启用 · 按对话权限执行" : "未启用 · 请开启会话命令插件" : "toggle" in U ? I[U.toggle] ? D === "voice" ? "输入框已启用" : "已启用" : "未启用" : "当前配置已生效";
    },
    j = D => D.toLowerCase().includes(a.trim().toLowerCase()),
    B = LU.filter(D => A.includes(D.id) && j(`${D.title} ${D.description} ${I2e(D.id).join(" ")}`)),
    F = LU.filter(D => !A.includes(D.id) && eE(D.id) && j(`${D.title} ${D.description}`)),
    N = (D, U = "") => {
      try {
        D(), m(""), y(U), r(H => H + 1);
      } catch (H) {
        m(H instanceof Error ? H.message : String(H));
      }
    },
    G = (D, U, H, Y, K, W = 1) => c.jsxs("label", {
      className: "studio-plugin-field",
      children: [c.jsxs("span", {
        children: [c.jsx("strong", {
          children: U
        }), c.jsx("small", {
          children: H
        })]
      }), c.jsx("input", {
        type: "number",
        min: Y,
        max: K,
        value: I[D] / W,
        disabled: t.sending,
        onChange: Q => {
          Q.target.value !== "" && N(() => ATe(n, {
            [D]: Number(Q.target.value) * W
          }));
        }
      })]
    });
  return c.jsx("div", {
    className: "studio-page studio-plugin-page",
    children: c.jsxs("div", {
      className: "studio-plugin-content",
      children: [c.jsxs("header", {
        children: [c.jsxs("div", {
          children: [c.jsx("h1", {
            children: ((z = xme.find(D => D.id === l)) == null ? void 0 : z.title) || x("插件")
          }), c.jsx("p", {
            children: x("管理当前首页对话的插件与配置，沿用画布功能")
          })]
        }), c.jsxs("div", {
          className: "studio-plugin-header-actions",
          children: [c.jsx("button", {
            type: "button",
            "aria-label": x("刷新插件"),
            title: x("刷新插件"),
            onClick: () => {
              r(D => D + 1), v(D => D + 1), y("插件与配置已刷新");
            },
            children: c.jsx(bd, {
              size: 16
            })
          }), c.jsxs("button", {
            type: "button",
            disabled: t.sending,
            onClick: () => {
              s(D => !D), d(null);
            },
            children: [c.jsx(eo, {
              size: 16
            }), x("添加插件")]
          })]
        })]
      }), c.jsxs("div", {
        className: "studio-plugin-context",
        children: [c.jsx("span", {
          children: t.rootPath || x("尚未选择工作区")
        }), c.jsx(qs, {
          translateLabels: !1,
          scopeId: "studio-plugins",
          dropdownType: "插件页预设",
          menuClassName: "studio-content-menu",
          ariaLabel: x("当前对话预设"),
          value: k.id,
          options: jce().map(D => ({
            value: D.id,
            label: D.builtin ? x(D.title) : D.title
          })),
          isDark: e,
          activeDropdown: _,
          setActiveDropdown: w,
          disabled: t.sending,
          onSelect: D => N(() => gie(D)),
          menuPlacement: "auto",
          maxMenuHeight: 280
        }), c.jsx("button", {
          type: "button",
          onClick: () => gy(!1),
          children: x("返回对话")
        })]
      }), p && c.jsx("p", {
        role: "alert",
        className: "studio-plugin-error",
        children: p
      }), f && c.jsx("p", {
        role: "status",
        className: "studio-plugin-notice",
        children: f
      }), l ? c.jsxs("section", {
        className: "studio-plugin-config",
        children: [c.jsxs("button", {
          type: "button",
          onClick: () => d(null),
          children: [c.jsx(Mf, {
            size: 15
          }), x("返回插件")]
        }), c.jsx("p", {
          children: x("仅作用于当前对话；下一次发送任务时生效。")
        }), l === "shell" ? c.jsxs(c.Fragment, {
          children: [G("commandTimeoutMs", "最长执行时间（秒）", "模型请求更短超时仍会生效；后台进程单独管理。", 1, 600, 1e3), G("commandOutputChars", "返回内容上限（字符）", "完整命令结果仍保存在会话中，可通过 read_execution 读取。", 1e3, 2e5)]
        }) : l === "loop" ? c.jsxs(c.Fragment, {
          children: [G("maxRounds", "模型调用上限", "达到上限后停止本次循环，保留已完成步骤。", 1, 96), G("readConcurrency", "只读工具并发数", "读取、目录和搜索可并发；文件修改按顺序执行。", 1, 8)]
        }) : l === "search" ? c.jsxs(c.Fragment, {
          children: [c.jsxs("label", {
            className: "studio-plugin-field",
            children: [c.jsxs("span", {
              children: [c.jsx("strong", {
                children: x("启用网页工具")
              }), c.jsx("small", {
                children: x("提供 web_fetch 和 web_search；不自动浏览工作区或上传本地文件。")
              })]
            }), c.jsx("input", {
              type: "checkbox",
              role: "switch",
              "aria-label": x("启用网页工具"),
              checked: A.includes("tool-web") && !S.includes("tool-web"),
              disabled: t.sending,
              onChange: D => N(() => D.target.checked ? dQt(k.id, "tool-web", n) : S2e(k.id, "tool-web", !1, n))
            })]
          }), c.jsxs("label", {
            className: "studio-plugin-field",
            children: [c.jsxs("span", {
              children: [c.jsx("strong", {
                children: x("Brave Search API 密钥")
              }), c.jsx("small", {
                children: x("网页读取无需密钥；搜索需要配置服务密钥。")
              })]
            }), c.jsx("input", {
              type: "password",
              autoComplete: "off",
              "aria-label": x("Brave Search API 密钥"),
              value: u,
              disabled: t.sending,
              onChange: D => h(D.target.value)
            })]
          }), c.jsx("button", {
            type: "button",
            disabled: t.sending,
            onClick: () => N(() => ena(n, {
              braveApiKey: u
            }), "搜索配置已保存"),
            children: x("保存搜索配置")
          })]
        }) : c.jsxs(c.Fragment, {
          children: [(() => {
            const D = xme.find(U => U.id === l);
            return D && "toggle" in D ? c.jsxs("label", {
              className: "studio-plugin-field",
              children: [c.jsxs("span", {
                children: [c.jsxs("strong", {
                  children: [x("启用"), x(D.title)]
                }), c.jsx("small", {
                  children: x(D.description)
                })]
              }), c.jsx("input", {
                type: "checkbox",
                role: "switch",
                "aria-label": x("启用{0}", D.title),
                checked: I[D.toggle],
                disabled: t.sending,
                onChange: U => N(() => ATe(n, {
                  [D.toggle]: U.target.checked
                }))
              })]
            }) : null;
          })(), (l === "subagent" || l === "team") && c.jsxs(c.Fragment, {
            children: [G("subagentMaxDepth", "最大递归层级", "0 表示不允许创建子智能体；根会话层级为 0。", 0, 4), G("subagentMaxCount", "并发成员上限", "整个团队共用并发上限。", 1, 16), c.jsxs("label", {
              className: "studio-plugin-field",
              children: [c.jsxs("span", {
                children: [c.jsx("strong", {
                  children: x("子智能体模型")
                }), c.jsx("small", {
                  children: x("留空继承当前模型；填写同一服务商下可用的模型 ID。")
                })]
              }), c.jsx("input", {
                "aria-label": x("子智能体模型"),
                value: I.subagentModel,
                disabled: t.sending,
                onChange: D => N(() => ATe(n, {
                  subagentModel: D.target.value
                }))
              })]
            })]
          }), l === "review" && c.jsx("p", {
            children: x("审查会产生额外模型调用。解析失败或服务错误时停止操作；审查未通过时仍可由你决定。系统目录保护继续生效。")
          }), l === "voice" && c.jsx("p", {
            children: x("开启后在对话输入框显示麦克风，使用现有语音服务；不另行下载 SenseVoice 模型。")
          }), (l === "team" || l === "subagent" || l === "schedule") && c.jsx(x0a, {
            scope: n,
            kind: l
          })]
        })]
      }) : c.jsxs(c.Fragment, {
        children: [c.jsxs("label", {
          className: "studio-plugin-search",
          children: [c.jsx(mc, {
            size: 15
          }), c.jsx("input", {
            placeholder: x("搜索插件"),
            "aria-label": x("搜索插件"),
            value: a,
            onChange: D => i(D.target.value)
          })]
        }), j(`${E.title} ${E.description} ${(V = E.examples) == null ? void 0 : V.join(" ")}`) && c.jsxs("section", {
          className: "studio-plugin-recommendation",
          "aria-label": x("推荐智能体"),
          children: [c.jsx("span", {
            className: "studio-plugin-art",
            children: c.jsx(tw, {
              size: 24
            })
          }), c.jsxs("div", {
            className: "studio-plugin-description",
            children: [c.jsx("strong", {
              children: x(E.title)
            }), c.jsx("span", {
              className: "studio-plugin-tag",
              children: x("内置智能体")
            }), c.jsx("p", {
              children: x(E.description)
            }), c.jsx("p", {
              className: "studio-plugin-hint",
              children: x("读取参考 → 制定方案 → 调用工具 → 检查产物。生图沿用对话中的模型与生成设置。")
            }), c.jsxs("details", {
              children: [c.jsx("summary", {
                children: x("适用任务与使用示例")
              }), c.jsx("ul", {
                children: (O = E.examples) == null ? void 0 : O.map(D => c.jsx("li", {
                  children: x(D)
                }, D))
              }), c.jsx("p", {
                children: x("在对话中描述任务并附上参考图即可。切换保留当前对话权限，各预设的工具可在下方单独启停。")
              })]
            })]
          }), c.jsxs("div", {
            className: "studio-plugin-recommendation-actions",
            children: [c.jsx("button", {
              type: "button",
              disabled: t.sending || k.id === E.id,
              onClick: () => N(() => gie(E.id), "已切换为设计助手，返回对话即可使用"),
              children: k.id === E.id ? x("当前正在使用") : x("在当前对话中使用")
            }), c.jsx("button", {
              type: "button",
              disabled: t.sending || M === E.id,
              onClick: () => N(() => yBn(E.id), "新建 Harness 对话将默认使用设计助手"),
              children: M === E.id ? x("新对话默认") : x("设为新对话默认")
            })]
          })]
        }), !t.rootPath && c.jsx("p", {
          className: "studio-plugin-hint",
          children: x("使用本地文件或扩展插件前，请返回对话选择工作区。")
        }), c.jsxs("h2", {
          className: "studio-plugin-group-title",
          children: [x("官方能力 · 画布适配 "), c.jsx("span", {
            children: xme.length
          })]
        }), c.jsx("div", {
          className: "studio-plugin-official",
          children: xme.filter(D => j(`${D.title} ${D.description}`)).map(D => c.jsxs("article", {
            children: [c.jsx("span", {
              className: "studio-plugin-art",
              children: c.jsx(D.icon, {
                size: 24
              })
            }), c.jsxs("button", {
              type: "button",
              className: "studio-plugin-description studio-plugin-row-title",
              onClick: () => d(D.id),
              children: [c.jsx("strong", {
                children: x(D.title)
              }), c.jsx("p", {
                children: x(D.description)
              }), c.jsx("small", {
                className: "studio-plugin-capability-status",
                children: R(D.id)
              })]
            }), "toggle" in D ? c.jsx("button", {
              type: "button",
              role: "switch",
              "aria-label": x("启用{0}", D.title),
              "aria-checked": I[D.toggle],
              disabled: t.sending,
              className: "studio-plugin-switch",
              onClick: () => N(() => ATe(n, {
                [D.toggle]: !I[D.toggle]
              }))
            }) : c.jsx("button", {
              type: "button",
              disabled: t.sending,
              onClick: () => d(D.id),
              children: x("配置")
            })]
          }, D.id))
        }), c.jsxs("h2", {
          className: "studio-plugin-group-title",
          children: [x("当前会话 "), c.jsx("span", {
            children: A.length
          })]
        }), c.jsxs("div", {
          className: "studio-plugin-installed",
          children: [B.map(D => c.jsxs("details", {
            children: [c.jsxs("summary", {
              children: [c.jsxs("span", {
                children: [c.jsx("strong", {
                  children: D.title
                }), c.jsx("small", {
                  children: D.description
                })]
              }), c.jsx("span", {
                children: eE(D.id) ? S.includes(D.id) ? x("已停用") : D.id === "tool-web" && !P ? x("搜索待配置") : x("已启用") : x("当前系统不可用")
              })]
            }), c.jsxs("div", {
              children: [c.jsx("code", {
                children: I2e(D.id).join(", ") || "会话指令 / 服务"
              }), D.id === "tool-web" && !P && c.jsx("p", {
                children: x("网页读取无需密钥；网页搜索需要在上方“网页搜索”中配置 Brave Search 密钥。")
              }), c.jsxs("label", {
                children: [c.jsx("input", {
                  type: "checkbox",
                  role: "switch",
                  "aria-label": x("启用 {0}", D.id),
                  checked: eE(D.id) && !S.includes(D.id),
                  disabled: t.sending || D.id === "persona" || !eE(D.id),
                  onChange: U => N(() => S2e(k.id, D.id, U.target.checked, n))
                }), x("在当前对话中启用")]
              }), C.includes(D.id) && c.jsx("button", {
                type: "button",
                disabled: t.sending,
                onClick: () => N(() => eea(k.id, D.id, n), `已移除 ${D.title}`),
                children: x("移除插件")
              })]
            })]
          }, D.id)), !B.length && c.jsx("p", {
            children: x("没有匹配的会话插件。")
          })]
        }), c.jsxs("details", {
          className: "studio-plugin-add",
          children: [c.jsx("summary", {
            children: x("添加内置会话插件")
          }), F.map(D => c.jsxs("article", {
            children: [c.jsxs("span", {
              children: [c.jsx("strong", {
                children: D.title
              }), c.jsx("small", {
                children: D.description
              })]
            }), c.jsx("button", {
              type: "button",
              disabled: t.sending,
              onClick: () => N(() => dQt(k.id, D.id, n), `已添加 ${D.title}`),
              children: x("添加")
            })]
          }, D.id)), !F.length && c.jsx("p", {
            children: x("已包含全部可添加的内置插件。")
          })]
        })]
      }), c.jsx(w0a, {
        scope: n,
        refreshToken: b,
        query: a,
        open: o,
        onClose: () => s(!1),
        busy: t.sending,
        toolSteps: (L = t.messages) == null ? void 0 : L.flatMap(D => D.toolSteps || [])
      }, n)]
    })
  });
}

const eWn = ["chat", "harness", "generation"],
  Eve = {
    chat: "对话",
    harness: "Harness",
    generation: "言绘"
  },
  sbt = "studio-content-library-changed";

function tWn(e) {
  return e >= 1024 * 1024 ? `${(e / 1024 / 1024).toFixed(1)} MB` : e >= 1024 ? `${(e / 1024).toFixed(1)} KB` : `${e} B`;
}

function k0a(e) {
  return e.kind === "generation" ? `${e.workspaceId}:${e.sessionId}` : e.threadId;
}

function A0a(e) {
  var t, n;
  if (e.kind === "generation") {
    const r = new Set(e.nodes.map(a => {
      var i, o;
      return (o = (i = a.settings) == null ? void 0 : i.studioGeneration) == null ? void 0 : o.roundId;
    }).filter(Boolean));
    return {
      summary: e.draft.prompt || ((t = e.nodes.find(a => a.prompt)) == null ? void 0 : t.prompt) || "创作会话",
      count: r.size
    };
  }
  return {
    summary: ((n = e.messages.find(r => r.role === "user")) == null ? void 0 : n.content) || "",
    count: e.messages.length
  };
}

let uJt;

function CYe() {
  return uJt || (uJt = new Promise((e, t) => {
    const n = indexedDB.open("studio-content-library", 1);
    n.onupgradeneeded = () => {
      n.result.createObjectStore("entries", {
        keyPath: "meta.id"
      }), n.result.createObjectStore("meta", {
        keyPath: "id"
      });
    }, n.onsuccess = () => e(n.result), n.onerror = () => {
      uJt = void 0, t(n.error);
    };
  }));
}

function nWn() {
  typeof window < "u" && window.dispatchEvent(new Event(sbt));
}

async function Jce() {
  const e = await CYe();
  return new Promise((t, n) => {
    const r = e.transaction("meta").objectStore("meta").getAll();
    r.onsuccess = () => t(r.result.filter(Nx).sort((a, i) => i.updatedAt - a.updatedAt)), r.onerror = () => n(r.error);
  });
}

async function kQ(e) {
  const t = await CYe();
  return new Promise((n, r) => {
    const a = t.transaction("entries").objectStore("entries").get(e);
    a.onsuccess = () => a.result ? n(a.result) : r(new Error("本地存档不存在，请刷新项目库")), a.onerror = () => r(a.error);
  });
}

async function v_e(e) {
  const t = await CYe();
  await new Promise((n, r) => {
    const a = t.transaction(["entries", "meta"], "readwrite");
    a.objectStore("entries").put(e), a.objectStore("meta").put(e.meta), a.oncomplete = () => n(), a.onerror = a.onabort = () => r(a.error || new Error("本地存档写入失败，请检查存储空间"));
  }), nWn();
}

async function S0a(e) {
  const t = await CYe();
  await new Promise((n, r) => {
    const a = t.transaction(["entries", "meta"], "readwrite");
    a.objectStore("entries").delete(e), a.objectStore("meta").delete(e), a.oncomplete = () => n(), a.onerror = a.onabort = () => r(a.error);
  }), nWn();
}

function rD(e) {
  return rU(e);
}

function rWn(e) {
  return `${e.replace(/\/+$/, "")}/${tI}`.replace(/\/+/g, "/");
}

async function q7t(e, t) {
  const n = rWn(t);
  try {
    const r = await Hp(n, e),
      a = JSON.parse(new TextDecoder().decode(r));
    return Array.isArray(a == null ? void 0 : a.projects) ? a.projects : [];
  } catch (r) {
    if (rD(r)) return null;
    throw r;
  }
}

const K7t = "qiaodoumayi_project_oss_backup",
  xre = "qiaodoumayi-project-oss-backup-changed",
  EYe = "qiaodoumayi_project_oss_sync_",
  MFe = "qiaodoumayi_project_oss_known_cloud_ids";

function TYe() {
  try {
    const e = localStorage.getItem(MFe);
    if (!e) return [];
    const t = JSON.parse(e);
    return Array.isArray(t) ? t.filter(n => typeof n == "string" && n.length > 0) : [];
  } catch {
    return [];
  }
}

function MYe(e) {
  if (!e.length) return;
  const t = new Set(TYe());
  e.forEach(n => t.add(n));
  try {
    localStorage.setItem(MFe, JSON.stringify([...t]));
  } catch {}
}

function Q7t(e) {
  const t = TYe().filter(n => n !== e);
  try {
    t.length === 0 ? localStorage.removeItem(MFe) : localStorage.setItem(MFe, JSON.stringify(t));
  } catch {}
}

const QX = "project management";

function hJt() {
  return {
    enabled: !1,
    folderName: QX
  };
}

function oP() {
  try {
    const e = localStorage.getItem(K7t);
    if (!e) return hJt();
    const t = JSON.parse(e);
    return {
      enabled: !!t.enabled,
      folderName: String(t.folderName ?? QX).trim() || QX
    };
  } catch {
    return hJt();
  }
}

function aWn(e) {
  const t = {
    enabled: !!e.enabled,
    folderName: String(e.folderName ?? QX).trim() || QX
  };
  localStorage.setItem(K7t, JSON.stringify(t)), window.dispatchEvent(new CustomEvent(xre));
}

function Jhe(e, t) {
  const n = (t || QX).trim().replace(/^\/+/, "").replace(/\/+$/, "");
  return n === "" ? "" : `${n}/`;
}

function OE(e, t, n) {
  const r = e.replace(/^\/+/, "").replace(/\/+$/, ""),
    a = n.replace(/^\/+/, "");
  return `${r}/${t}/${a}`.replace(/\/+/g, "/");
}

function PYe(e) {
  if (typeof e == "string" && e.trim()) return e;
  if (e && typeof e == "object") {
    const n = e.message;
    if (n && String(n).trim()) return String(n);
  }
  return String(e ?? "").trim() || "读取云端失败";
}

function eCe() {
  return n9();
}

const I0a = /^project_(?:teaching_)?\d+_[a-z0-9]+$/i;

function C0a(e, t, n) {
  const r = new Set(),
    a = `${e.replace(/^\/+|\/+$/g, "")}/`;
  for (const i of [...t, ...n]) {
    const o = i.replace(/\\/g, "/");
    if (!o.startsWith(a)) continue;
    const s = o.slice(a.length),
      l = s.indexOf("/");
    if (l < 0) continue;
    const d = s.slice(0, l);
    I0a.test(d) && r.add(d);
  }
  return [...r];
}

function Zce(e) {
  try {
    localStorage.setItem(`${EYe}${e}`, String(Date.now()));
  } catch {}
}

function Y7t(e) {
  try {
    const t = localStorage.getItem(`${EYe}${e}`);
    if (!t) return null;
    const n = Number(t);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

function tCe(e) {
  try {
    localStorage.removeItem(`${EYe}${e}`);
  } catch {}
}

async function X7t(e, t, n) {
  const r = JSON.stringify({
    version: 1,
    projects: [...n].sort((a, i) => i.updatedAt - a.updatedAt)
  }, null, 2);
  await Pv(rWn(t), new TextEncoder().encode(r), "application/json", e);
}

const iWn = ["png", "jpg", "jpeg", "webp", "gif", "mp4", "webm", "wav", "mp3", "bin"];

async function E0a(e, t, n) {
  const r = new Set(),
    a = o => {
      const s = o.replace(/^\/+/, "").trim();
      s && r.add(OE(t, n, s));
    },
    i = `${t.replace(/\/+$/, "")}/${n}/`;
  try {
    const {
      keys: o
    } = await JJ(i, e);
    for (const s of o) {
      const l = s.replace(/\\/g, "/").trim();
      l.startsWith(i) && r.add(l);
    }
    return [...r];
  } catch (o) {
    console.warn("[projectOssBackup] OSS List 扫描失败，合并 manifest 与本地路径:", o);
  }
  try {
    (await YOr(n)).forEach(a);
  } catch (o) {
    console.warn("[projectOssBackup] 读取本地项目文件列表失败:", o);
  }
  r.add(i), a("payload.json"), a("meta.json"), a(Cb), a("assets/assets-manifest.json");
  try {
    const o = await Hp(OE(t, n, "assets/assets-manifest.json"), e),
      s = JSON.parse(new TextDecoder().decode(o)),
      l = new Set();
    for (const d of s.entries || []) if (!(!(d != null && d.assetKey) || l.has(d.assetKey))) {
      l.add(d.assetKey);
      for (const u of iWn) a(`assets/${d.assetKey}.${u}`);
    }
  } catch (o) {
    if (!rD(o)) throw o;
  }
  try {
    const o = await v6n(n);
    for (const s of o) a(s.relativePath);
  } catch {}
  return [...r];
}

async function oWn(e, t, n) {
  const r = eCe(),
    a = oP(),
    i = Jhe(r, a.folderName),
    o = await E0a(r, i, e);
  n == null || n(`正在删除云端 ${o.length} 个文件...`);
  let s = null;
  for (let u = 0; u < o.length; u++) {
    n == null || n(`删除 ${u + 1}/${o.length}: ${o[u].split("/").pop() || o[u]}`);
    try {
      await aU(o[u], r);
    } catch (h) {
      if (rD(h)) continue;
      s = PYe(h);
    }
  }
  if (s) throw new Error(s);
  const d = ((await q7t(r, i)) || []).filter(u => u.id !== e);
  await X7t(r, i, d), tCe(e), Q7t(e), n == null || n("云端项目已永久删除");
}

function sWn(e, t) {
  for (const n of t) e.has(n.id) ? Zce(n.id) : tCe(n.id);
  return e;
}

const T0a = 8,
  M0a = 4;

async function lWn(e, t, n) {
  if (e.length === 0) return;
  let r = 0;
  const a = Math.min(Math.max(1, t), e.length);
  await Promise.all(Array.from({
    length: a
  }, async () => {
    for (;;) {
      const i = r++;
      if (i >= e.length) return;
      await n(e[i], i);
    }
  }));
}

function pJt(e) {
  return [...e].sort((t, n) => t.id.localeCompare(n.id)).map(t => `${t.id}	${t.name}	${t.updatedAt}	${t.nodeCount ?? ""}`).join(`
`);
}

async function P0a(e, t, n) {
  try {
    const r = await Hp(OE(t, n, "meta.json"), e),
      a = JSON.parse(new TextDecoder().decode(r));
    return {
      id: a.id || n,
      name: a.name || n,
      updatedAt: a.updatedAt || Date.now(),
      nodeCount: a.nodeCount ?? 0
    };
  } catch (r) {
    if (rD(r)) return null;
    throw r;
  }
}

async function R0a(e, t, n) {
  let r = !1,
    a,
    i = [];
  const [o, s] = await Promise.all([q7t(e, t), JJ(t, e, {
      delimiter: "/"
    }).then(y => ({
      ok: !0,
      ...y
    })).catch(y => (console.warn("[projectOssBackup] OSS 目录扫描失败，仅使用 projects-index.json:", y), {
      ok: !1,
      error: PYe(y),
      keys: [],
      prefixes: []
    }))]),
    l = new Map();
  for (const y of o ?? []) y != null && y.id && l.set(y.id, y);
  s.ok ? (r = !0, i = C0a(t, s.keys, s.prefixes)) : a = s.error;
  const d = new Set(r ? i : l.keys());
  if (!r) for (const y of TYe()) d.add(y);
  if (!s.ok && d.size === 0) throw new Error(s.error);
  const u = new Map();
  await lWn([...d], T0a, async y => {
    const b = await P0a(e, t, y);
    b && u.set(y, b);
  });
  const h = [],
    p = new Set(),
    m = [];
  for (const y of d) {
    const b = u.get(y);
    if (!b) {
      Q7t(y), tCe(y);
      continue;
    }
    p.add(y), m.push(b), h.push({
      ...b,
      source: "cloud",
      hasLocal: n.has(y)
    });
  }
  m.length > 0 && MYe(m.map(y => y.id));
  const f = pJt(o ?? []) === pJt(m);
  if (r && !f) try {
    await X7t(e, t, m);
  } catch (y) {
    console.warn("[projectOssBackup] 回写云端 projects-index.json 失败:", y);
  }
  return {
    projects: h.filter(O4t).sort((y, b) => b.updatedAt - y.updatedAt),
    uploadedIds: p,
    listScanOk: r,
    listScanError: a
  };
}

async function cWn(e, t, n) {
  const r = eCe(),
    a = oP(),
    i = Jhe(r, a.folderName);
  n == null || n({
    percent: 2,
    message: "正在收集本地项目文件..."
  });
  const o = await v6n(e);
  if (o.length === 0) throw new Error("本地未找到该项目文件，请先保存到项目管理");
  const s = 88;
  n == null || n({
    percent: 5,
    message: `准备上传 ${o.length} 个文件到 OSS...`
  });
  for (let h = 0; h < o.length; h++) {
    const p = o[h],
      m = OE(i, e, p.relativePath),
      f = 5 + Math.round((h + 1) / o.length * s);
    n == null || n({
      percent: Math.min(93, f),
      message: `上传 ${h + 1}/${o.length}: ${p.relativePath}`
    }), await Pv(m, p.bytes, p.mime, r);
  }
  if (!o.some(h => h.relativePath === Cb)) try {
    await aU(OE(i, e, Cb), r);
  } catch (h) {
    if (!rD(h)) throw h;
  }
  n == null || n({
    percent: 95,
    message: "正在更新云端项目索引..."
  });
  const l = new Map(),
    d = await q7t(r, i);
  if (d) for (const h of d) h != null && h.id && l.set(h.id, h);
  const u = t.find(h => h.id === e);
  u && l.set(e, u), await X7t(r, i, [...l.values()]), Zce(e), MYe([e]), n == null || n({
    percent: 100,
    message: "上传完成"
  });
}

async function dWn(e) {
  const t = eCe(),
    n = oP(),
    r = Jhe(t, n.folderName),
    a = new Set(e.map(i => i.id));
  return R0a(t, r, a);
}

async function N0a(e, t, n, r) {
  for (const a of iWn) {
    const i = `assets/${r}.${a}`;
    try {
      const o = await Hp(OE(t, n, i), e);
      return await vWe(n, i, o), !0;
    } catch (o) {
      if (rD(o)) continue;
      throw o;
    }
  }
  return !1;
}

async function j0a(e, t, n, r) {
  var p;
  const a = ["payload.json", "meta.json"];
  let i = null;
  try {
    i = await Hp(OE(t, n, Cb), e), a.push(Cb);
  } catch (m) {
    if (!rD(m)) throw m;
    await aft(n);
  }
  let o = null;
  try {
    const m = await Hp(OE(t, n, "assets/assets-manifest.json"), e);
    o = JSON.parse(new TextDecoder().decode(m)), a.push("assets/assets-manifest.json");
  } catch (m) {
    if (!rD(m)) throw m;
  }
  const s = new Set();
  if ((p = o == null ? void 0 : o.entries) != null && p.length) for (const m of o.entries) m != null && m.assetKey && s.add(m.assetKey);
  const l = Math.max(1, a.length + s.size);
  let d = 0;
  const u = m => {
    d += 1;
    const f = Math.min(99, Math.round(d / l * 100));
    r == null || r({
      percent: f,
      message: m
    });
  };
  let h = 0;
  for (const m of a) {
    u(`下载 ${d}/${l}: ${m}`);
    const f = m === Cb && i ? i : await Hp(OE(t, n, m), e);
    await vWe(n, m, f), h += 1;
  }
  if (s.size > 0) for (const m of s) u(`下载素材 ${d}/${l}: ${m}`), await N0a(e, t, n, m);
  if (h === 0) throw new Error("云端未找到该项目（无 payload.json）");
}

function D0a(e, t, n) {
  const r = `${e.replace(/^\/+|\/+$/g, "")}/${t}/`,
    a = n.replace(/\\/g, "/");
  if (!a.startsWith(r) || a.endsWith("/")) return null;
  const i = a.slice(r.length);
  return i || null;
}

async function uWn(e, t) {
  const n = eCe(),
    r = oP(),
    a = Jhe(n, r.folderName);
  t == null || t({
    percent: 2,
    message: "正在读取云端项目文件..."
  });
  let i = null;
  try {
    const o = `${a.replace(/\/+$/, "")}/${e}/`,
      {
        keys: s
      } = await JJ(o, n),
      l = new Set();
    for (const d of s) {
      const u = D0a(a, e, d);
      u && l.add(u);
    }
    i = [...l];
  } catch (o) {
    console.warn("[projectOssBackup] 列出项目文件失败，改用清单下载:", o);
  }
  if (i && i.includes("payload.json")) {
    i.sort((l, d) => {
      const u = h => h === "payload.json" ? 0 : h === "meta.json" ? 1 : 2;
      return u(l) - u(d) || l.localeCompare(d);
    });
    const o = i.length;
    let s = 0;
    await lWn(i, M0a, async l => {
      try {
        const d = await Hp(OE(a, e, l), n);
        await vWe(e, l, d);
      } catch (d) {
        if (l === "payload.json" || !rD(d)) throw d;
      }
      s += 1, t == null || t({
        percent: Math.min(99, Math.round(s / o * 100)),
        message: `下载 ${s}/${o}: ${l.split("/").pop() || l}`
      });
    });
  } else await j0a(n, a, e, t);
  Zce(e), MYe([e]), await BOr(e), t == null || t({
    percent: 100,
    message: "同步到本地完成"
  });
}

const L0a = Object.freeze(Object.defineProperty({
    __proto__: null,
    DEFAULT_PROJECT_OSS_FOLDER_NAME: QX,
    INDEX_FILENAME: tI,
    PROJECT_MANAGEMENT_DIR_NAME: Tp,
    PROJECT_OSS_BACKUP_CHANGED_EVENT: xre,
    PROJECT_OSS_BACKUP_STORAGE_KEY: K7t,
    PROJECT_OSS_SYNC_LS_PREFIX: EYe,
    assertOssCredentialsReady: eCe,
    buildProjectOssObjectKey: OE,
    buildProjectOssRootPrefix: Jhe,
    clearProjectOssSynced: tCe,
    deleteProjectFromOss: oWn,
    downloadProjectFromOss: uWn,
    fetchCloudProjectsIndex: dWn,
    forgetKnownCloudProjectId: Q7t,
    formatOssInvokeError: PYe,
    getKnownCloudProjectIds: TYe,
    getProjectOssSyncedAt: Y7t,
    loadProjectOssBackupSettings: oP,
    markProjectOssSynced: Zce,
    rememberKnownCloudProjectIds: MYe,
    saveProjectOssBackupSettings: aWn,
    syncOssBackupMarksFromIds: sWn,
    uploadProjectToOss: cWn
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  j8 = "library-media:",
  PFe = "library-id:",
  O0a = /^(url|originalUrl|fullUrl|thumbUrl|thumbnailUrl|ossRemoteUrl|ossThumbnailUrl|videoPosterUrl|videoPoster|audioUrl|videoUrl|imageUrl|image|maskContent|selectedPreviewImage|selectedPreviewVideo|_ossRemoteUrl|_ossOriginalUrl|_ossThumbnailUrl|localCacheUrl|preview)$/,
  B0a = /^(nodes|history|files|frames|selectedKeyframes|generatedImages|generationVersions|images|mjImages|mjThumbnails|batchImages|previewMjImages|previewMjVideos|threeDFiles|image_url|video_url)$/,
  mJt = /^(assetId|previewAssetId|_assetId|_audioAssetId|_thumbnailAssetId|_documentAssetId|_contentAssetId|_localCacheAssetId|_localCachePrimaryAssetId|_selectedImageAssetId|_selectedVideoAssetId)$/,
  F0a = /^(apiKey|key|globalApiKey|accessKeyId|accessKeySecret|authorization|password|secret|token|apiConfig|codexThreadId)$/i,
  _me = e => /^(https?:|data:|blob:|asset:|local-asset:|content_ref:)/i.test(e);

async function J7t(e) {
  return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", await e.arrayBuffer())), t => t.toString(16).padStart(2, "0")).join("");
}

function z0a(e) {
  return JSON.parse(JSON.stringify(e, (t, n) => F0a.test(t) ? void 0 : n));
}

async function Rnt(e) {
  var n;
  const t = await ni.getAssetBlob(e);
  return t || (await Ur.ensureRestored(), ((n = await Ur.readAsset(e).catch(() => null)) == null ? void 0 : n.blob) || null);
}

async function U0a(e, t = () => {}) {
  const n = z0a(e),
    r = {},
    a = [],
    i = [],
    o = new Map();
  async function s(u) {
    const h = await J7t(u);
    return r[h] || (r[h] = u, a.push({
      id: h,
      size: u.size,
      mime: u.type || "application/octet-stream"
    })), h;
  }
  async function l(u) {
    if (o.has(u)) return o.get(u);
    if (u.startsWith("content_ref:")) {
      const {
          contentStore: f
        } = await Ie(async () => {
          const {
            contentStore: v
          } = await Promise.resolve().then(() => Ly);
          return {
            contentStore: v
          };
        }, void 0, import.meta.url),
        y = await f.get(u.slice(12));
      if (!y || y === u) throw new Error("原素材引用已失效");
      const b = await l(y);
      return o.set(u, b), b;
    }
    const h = u.startsWith("local-asset:") ? u.replace(/^local-asset:(\/\/)?/, "") : "",
      p = h ? await Rnt(h) : await Nhe(u);
    if (!p || !p.size && /^(image|video|audio)\//.test(p.type)) throw new Error("原文件不可用");
    const m = j8 + (await s(p));
    return o.set(u, m), m;
  }
  async function d(u, h = !1, p = "") {
    if (Array.isArray(u)) {
      const f = [];
      for (let y = 0; y < u.length; y++) f.push(await d(u[y], h, `${p}[${y}]`));
      return f;
    }
    if (!u || typeof u != "object") {
      if (h && typeof u == "string" && _me(u)) try {
        return await l(u);
      } catch {
        i.push(p);
      }
      return u;
    }
    const m = u;
    for (const [f, y] of Object.entries(m)) if (mJt.test(f) && typeof y == "string" && y) try {
      const b = f === "_documentAssetId" ? await JGn({
        name: String(m.name || ""),
        _documentAssetId: y
      }) : await Rnt(y);
      if (b) {
        const v = await s(b);
        m[f] = PFe + v, f === "_documentAssetId" ? m.url = j8 + v : (f === "_assetId" || f === "_contentAssetId" || f === "assetId") && (typeof m.content == "string" && _me(m.content) && (o.set(m.content, j8 + v), m.content = j8 + v), typeof m.url == "string" && o.set(m.url, j8 + v), !m.url && f !== "_contentAssetId" && (m.url = j8 + v));
      } else f === "_documentAssetId" || ![m.url, m.content, m.originalUrl, m._ossRemoteUrl, m.fullUrl].some(v => typeof v == "string" && (_me(v) || v.startsWith(j8))) ? i.push(`${p}.${f}`) : delete m[f];
    } catch {
      i.push(`${p}.${f}`);
    }
    for (const [f, y] of Object.entries(m)) if (!mJt.test(f)) {
      if (/_libraryMedia/.test(f)) {
        delete m[f];
        continue;
      }
      if (/AssetIds$/.test(f) && Array.isArray(y)) {
        m[f] = await Promise.all(y.map(async b => {
          if (typeof b != "string") return null;
          const v = await Rnt(b);
          return v ? PFe + (await s(v)) : null;
        }));
        continue;
      }
      if (typeof y == "string" && (O0a.test(f) && h || f === "content" && h && !("role" in m)) && _me(y)) {
        t(`整理素材 ${a.length + 1}`);
        try {
          m[f] = await l(y);
        } catch {
          /^(preview|thumbUrl|thumbnailUrl|ossThumbnailUrl|_ossThumbnailUrl|videoPosterUrl|videoPoster)$/.test(f) && [m.url, m.content, m.originalUrl, m.fullUrl, m._ossRemoteUrl].some(b => typeof b == "string" && b !== y && (_me(b) || b.startsWith(j8))) ? delete m[f] : i.push(`${p}.${f}`);
        }
      } else y && typeof y == "object" && (m[f] = await d(y, h || B0a.test(f), `${p}.${f}`));
    }
    return m;
  }
  return await d(n), {
    content: n,
    blobs: r,
    assets: a,
    incomplete: [...new Set(i)]
  };
}

async function $0a(e) {
  if (e.meta.incomplete.length) throw new Error("存档有未保存的素材，请回到原会话重新保存后再恢复");
  for (const r of e.assets) {
    const a = e.blobs[r.id];
    if (!a || a.size !== r.size || (await J7t(a)) !== r.id) throw new Error("存档素材不完整，请重新下载");
    if (!(await ni.saveBlobAsset(`library_${r.id}`, a, "", "local"))) throw new Error("素材恢复失败，请检查本地存储空间");
  }
  const t = JSON.parse(JSON.stringify(e.content), (r, a) => typeof a != "string" ? a : a.startsWith(j8) ? `local-asset://library_${a.slice(j8.length)}` : a.startsWith(PFe) ? `library_${a.slice(PFe.length)}` : a),
    n = async r => {
      if (!r || typeof r != "object") return;
      if (Array.isArray(r)) {
        for (const s of r) await n(s);
        return;
      }
      const a = r,
        i = a.settings;
      for (const s of ["_globalOssUrlOnly", "preferDisplayUrls", "ossUploaded", "_ossUrlOnlyMode", "_ossUploading"]) delete a[s];
      const o = [i == null ? void 0 : i._ossRemoteUrl, a._ossRemoteUrl, a.ossRemoteUrl, a.originalUrl, a.fullUrl, a.url, a.content].find(s => typeof s == "string" && s.startsWith("local-asset://library_"));
      if (o) {
        const s = o.slice(14);
        "x" in a && "type" in a ? a._contentAssetId = s : (a.assetId = s, a._assetId = s), a._documentAssetId && (await lYe(String(a._documentAssetId), e.blobs[s.slice(8)]));
      }
      for (const s of Object.values(a)) await n(s);
    };
  return await n(t), t.kind === "generation" && (t.nodes = t.nodes.map(r => ({
    ...r,
    settings: {
      ...r.settings,
      _libraryMedia: !0
    }
  }))), t;
}

function G0a(e) {
  var n;
  const t = ((n = e.settings) == null ? void 0 : n._libraryMediaUrls) || {};
  return JSON.parse(JSON.stringify(e, (r, a) => r === "_libraryMediaUrls" ? void 0 : typeof a == "string" && t[a] ? `local-asset://${t[a]}` : a));
}

async function hWn(e) {
  var r;
  const t = new Map(),
    n = [];
  for (const a of e) {
    if (!((r = a.settings) != null && r._libraryMedia)) {
      n.push(a);
      continue;
    }
    const i = new Set();
    JSON.stringify(a, (s, l) => (typeof l == "string" && l.startsWith("local-asset://library_") && i.add(l), l));
    for (const s of i) {
      const l = s.slice(14),
        d = t.get(s) || (await ni.getAssetUrl(l));
      if (!d) throw new Error("存档素材缓存不存在，请从项目库重新恢复");
      t.set(s, d);
    }
    const o = JSON.parse(JSON.stringify(a), (s, l) => typeof l == "string" && t.get(l) || l);
    o.settings = {
      ...o.settings,
      _libraryMediaUrls: Object.fromEntries([...i].map(s => [t.get(s), s.slice(14)]))
    }, n.push(o);
  }
  return n;
}

const pWn = /^entry_[a-z0-9-]+$/,
  V0a = /^[a-z0-9-]+$/,
  H0a = /^[a-f0-9]{64}$/,
  bNe = e => new TextEncoder().encode(JSON.stringify(e)),
  W0a = e => JSON.parse(new TextDecoder().decode(e));

function mWn() {
  const e = sc();
  return [mo(e), e.endpoint, e.bucket, e.cloudinaryCloudName, e.qiniuDomain, oP().folderName].join("|");
}

function RYe() {
  const e = n9();
  return {
    cfg: e,
    root: `${Jhe(e, oP().folderName)}library/`,
    scope: mWn()
  };
}

function hE(e) {
  if (!e || typeof e != "object") return !1;
  const t = e;
  return pWn.test(t.id) && eWn.includes(t.kind) && V0a.test(t.revision) && typeof t.name == "string" && typeof t.sourceId == "string" && Number.isFinite(t.updatedAt) && typeof t.summary == "string" && Array.isArray(t.incomplete);
}

function q0a(e) {
  const {
    cloudScope: t,
    cloudRevision: n,
    cloudError: r,
    sourceStamp: a,
    ...i
  } = e;
  return i;
}

async function Nz(e, t) {
  try {
    return W0a(await Hp(e, t.cfg));
  } catch (n) {
    if (rU(n)) return;
    throw n;
  }
}

async function K0a(e, t, n = {}) {
  const r = k0a(e),
    a = n.copy ? void 0 : (await Jce()).find(d => d.kind === e.kind && d.sourceId === r),
    i = await U0a(e, n.progress),
    o = !!a && !a.incomplete.length && !!i.incomplete.length,
    l = {
      version: 1,
      meta: {
        ...(a ? {
          teaching: a.teaching
        } : P$()),
        id: !o && (a == null ? void 0 : a.id) || `entry_${crypto.randomUUID()}`,
        kind: e.kind,
        name: (t.trim() || "未命名内容") + (o ? "（未完成）" : ""),
        sourceId: n.copy || o ? `copy:${r}:${crypto.randomUUID()}` : r,
        revision: crypto.randomUUID(),
        updatedAt: Date.now(),
        ...A0a(e),
        assetCount: i.assets.length,
        bytes: i.assets.reduce((d, u) => d + u.size, 0),
        incomplete: i.incomplete,
        sourceStamp: n.copy || o ? void 0 : n.sourceStamp,
        cloudRevision: o || a == null ? void 0 : a.cloudRevision,
        cloudScope: o || a == null ? void 0 : a.cloudScope
      },
      ...i
    };
  return await v_e(l), l;
}

async function Z7t(e, t) {
  const n = `${t.root}${e}/`;
  try {
    const r = await JJ(n, t.cfg, {
        delimiter: "/"
      }),
      a = new Set([...r.keys, ...r.prefixes].filter(o => o.startsWith(n)).map(o => o.slice(n.length).split("/")[0]).filter(o => pWn.test(o))),
      i = [];
    for (const o of a) {
      const s = await Nz(`${n}${o}/meta.json`, t);
      hE(s) && s.kind === e && s.id === o && i.push(s);
    }
    return i;
  } catch (r) {
    const a = await Nz(`${n}index.json`, t);
    if (a === void 0) return [];
    if (!Array.isArray(a)) throw r;
    const i = [];
    for (const o of a.filter(hE)) {
      if (o.kind !== e) continue;
      const s = await Nz(`${n}${o.id}/meta.json`, t);
      hE(s) && s.id === o.id && s.kind === e && i.push(s);
    }
    return i;
  }
}

async function fJt() {
  const e = RYe();
  return (await Promise.all(eWn.map(n => Z7t(n, e)))).flat().filter(Nx).map(n => ({
    ...n,
    cloudScope: e.scope,
    cloudRevision: n.revision
  })).sort((n, r) => r.updatedAt - n.updatedAt);
}

const Nnt = new Set();

async function lbt(e, t = () => {}) {
  var a;
  const n = RYe();
  if (Nnt.has(e)) throw new Error("这份内容正在上传");
  Nnt.add(e);
  let r;
  try {
    if (r = await kQ(e), r.meta.incomplete.length) throw new Error(`有 ${r.meta.incomplete.length} 项素材未保存，请回原会话重新保存`);
    const i = `${n.root}${r.meta.kind}/${e}/`,
      o = await Nz(`${i}meta.json`, n),
      s = r.meta.cloudScope === n.scope ? r.meta.cloudRevision : void 0;
    if (hE(o) && o.revision !== s && o.revision !== r.meta.revision) throw new Error("云端已有不同版本，请先下载查看，或将当前内容另存为副本");
    const l = hE(o) ? await Nz(`${i}snapshots/${o.revision}.json`, n) : void 0,
      d = new Set(((a = l == null ? void 0 : l.assets) == null ? void 0 : a.map(y => y.id)) || []);
    let u = 0;
    for (const y of r.assets) {
      if (t(`上传素材 ${++u} / ${r.assets.length}`), d.has(y.id)) continue;
      const b = r.blobs[y.id];
      if (!b || b.size !== y.size) throw new Error("本地素材不完整，请重新保存");
      await Pv(`${i}assets/${y.id}`, new Uint8Array(await b.arrayBuffer()), "application/octet-stream", n.cfg);
    }
    const h = {
      version: 1,
      meta: q0a(r.meta),
      content: r.content,
      assets: r.assets
    };
    t("提交云端存档"), await Pv(`${i}snapshots/${r.meta.revision}.json`, bNe(h), "application/json", n.cfg);
    const p = await Nz(`${i}meta.json`, n);
    if (hE(p) && p.revision !== (hE(o) ? o.revision : void 0) && p.revision !== r.meta.revision) throw new Error("上传期间云端版本已变化，本地存档已保留");
    await Pv(`${i}meta.json`, bNe(h.meta), "application/json", n.cfg);
    const m = await Z7t(r.meta.kind, n);
    await Pv(`${n.root}${r.meta.kind}/index.json`, bNe([...m.filter(y => y.id !== e), h.meta]), "application/json", n.cfg);
    const f = await kQ(e);
    await v_e({
      ...f,
      meta: {
        ...f.meta,
        cloudRevision: r.meta.revision,
        cloudScope: n.scope,
        cloudError: void 0
      }
    }), typeof window < "u" && window.dispatchEvent(new Event("studio-content-library-cloud-changed"));
  } catch (i) {
    if (r) {
      const o = await kQ(e);
      await v_e({
        ...o,
        meta: {
          ...o.meta,
          cloudError: i instanceof Error ? i.message : "云端上传失败"
        }
      });
    }
    throw i;
  } finally {
    Nnt.delete(e);
  }
}

async function Q0a(e, t = () => {}) {
  var h;
  if (!hE(e)) throw new Error("不支持的云端存档");
  const n = RYe();
  if (e.cloudScope && e.cloudScope !== n.scope) throw new Error("云端配置已改变，请刷新后重试");
  const r = `download:${n.scope}:${e.id}:${e.revision}`,
    a = (await Jce()).find(p => p.sourceId === r && p.revision === e.revision);
  if (a) return kQ(a.id);
  const i = `${n.root}${e.kind}/${e.id}/`,
    o = await Nz(`${i}snapshots/${e.revision}.json`, n);
  if ((o == null ? void 0 : o.version) !== 1 || !hE(o.meta) || o.meta.id !== e.id || o.meta.revision !== e.revision || ((h = o.content) == null ? void 0 : h.kind) !== e.kind || !Array.isArray(o.assets)) throw new Error("存档格式无效或版本不受支持");
  const s = {};
  for (const p of o.assets) {
    if (!H0a.test(p.id) || !Number.isFinite(p.size) || typeof p.mime != "string") throw new Error("素材清单无效");
    t(`下载素材 ${Object.keys(s).length + 1} / ${o.assets.length}`);
    const m = await Hp(`${i}assets/${p.id}`, n.cfg),
      f = new Blob([new Uint8Array(m)], {
        type: p.mime
      });
    if (f.size !== p.size || (await J7t(f)) !== p.id) throw new Error("云端素材校验失败，本地原存档未改动");
    s[p.id] = f;
  }
  const l = (await Jce()).find(p => p.id === e.id),
    d = l && l.revision !== e.revision,
    u = {
      ...o,
      blobs: s,
      meta: {
        ...o.meta,
        ...(d ? {
          id: `entry_${crypto.randomUUID()}`,
          name: `${e.name}（云端副本）`,
          sourceId: r
        } : {}),
        cloudRevision: d ? void 0 : e.revision,
        cloudScope: d ? void 0 : n.scope
      }
    };
  return await v_e(u), u;
}

async function Y0a(e) {
  if (!hE(e)) throw new Error("无效的存档");
  const t = RYe();
  if (e.cloudScope && e.cloudScope !== t.scope) throw new Error("云端配置已改变，请刷新后重试");
  const n = `${t.root}${e.kind}/${e.id}/`,
    r = await Nz(`${n}meta.json`, t);
  if (hE(r) && r.revision !== e.revision) throw new Error("云端版本已变化，请刷新后重新确认");
  await aU(`${n}meta.json`, t.cfg);
  const a = await Z7t(e.kind, t);
  await Pv(`${t.root}${e.kind}/index.json`, bNe(a.filter(s => s.id !== e.id)), "application/json", t.cfg);
  const i = await JJ(n, t.cfg);
  for (const s of i.keys) s.startsWith(n) && (await aU(s, t.cfg));
  const o = await kQ(e.id).catch(() => {});
  (o == null ? void 0 : o.meta.cloudScope) === t.scope && (await v_e({
    ...o,
    meta: {
      ...o.meta,
      cloudRevision: void 0,
      cloudScope: void 0
    }
  })), typeof window < "u" && window.dispatchEvent(new Event("studio-content-library-cloud-changed"));
}

function X0a(e) {
  const [t, n] = g.useState([]),
    [r, a] = g.useState([]),
    [i, o] = g.useState(""),
    [s, l] = g.useState(!1),
    d = async () => {
      if (!s) {
        l(!0), o("");
        try {
          n(await Jce()), e && a(await fJt());
        } catch (u) {
          o(u instanceof Error ? u.message : String(u));
        } finally {
          l(!1);
        }
      }
    };
  return g.useEffect(() => {
    let u = !0;
    o("");
    const h = () => {
        Jce().then(m => {
          u && n(m);
        }).catch(m => {
          u && o(String(m));
        });
      },
      p = () => {
        e && fJt().then(m => {
          u && a(m);
        }).catch(m => {
          u && o(String(m));
        });
      };
    return h(), window.addEventListener(sbt, h), window.addEventListener("studio-content-library-cloud-changed", p), () => {
      u = !1, window.removeEventListener(sbt, h), window.removeEventListener("studio-content-library-cloud-changed", p);
    };
  }, [e]), g.useEffect(() => {
    e && d();
  }, [e]), {
    rows: e ? r : t,
    busy: s,
    error: i,
    refresh: d
  };
}

function J0a({
  value: e,
  onChange: t
}) {
  return c.jsx("div", {
    className: "studio-library-filters",
    role: "group",
    "aria-label": x("内容类型"),
    children: ["canvas", "chat", "harness", "generation"].map(n => c.jsx("button", {
      type: "button",
      "aria-pressed": e === n,
      className: e === n ? "is-active" : "",
      onClick: () => t(n),
      children: x(n === "canvas" ? "画布" : Eve[n])
    }, n))
  });
}

function Z0a({
  meta: e,
  cloud: t,
  onChanged: n
}) {
  const r = PT(),
    [a, i] = g.useState([]),
    [o, s] = g.useState(""),
    [l, d] = g.useState(""),
    u = e.kind === "chat" ? qv : e.kind === "harness" ? pZ : ac,
    h = e.cloudScope === mWn() && e.cloudRevision === e.revision,
    p = !!e.sourceStamp && e.sourceStamp !== yKe(e.kind, e.sourceId),
    m = t ? "云端存档" : e.incomplete.length ? "素材不完整" : l || e.cloudError ? "备份失败" : p ? "有更新待保存" : h ? "云端已备份" : e.cloudRevision ? "待更新备份" : "仅本地";
  g.useEffect(() => {
    if (t || r || e.kind !== "generation") return;
    let y = !0;
    const b = [];
    return kQ(e.id).then(v => {
      y && (v.assets.filter(_ => _.mime.startsWith("image/") && v.blobs[_.id]).slice(0, 3).forEach(_ => b.push(URL.createObjectURL(v.blobs[_.id]))), i(b));
    }).catch(() => {}), () => {
      y = !1, b.forEach(v => URL.revokeObjectURL(v));
    };
  }, [e.id, e.revision, e.kind, t, r]);
  const f = async () => {
    if (!o) {
      d(""), s("准备上传");
      try {
        await lbt(e.id, s), n();
      } catch (y) {
        d(y instanceof Error ? y.message : String(y));
      } finally {
        s("");
      }
    }
  };
  return c.jsxs("div", {
    className: `scl-card scl-card--${e.kind}`,
    children: [c.jsxs("button", {
      className: "scl-card-open",
      type: "button",
      onClick: () => X6({
        mode: "open",
        meta: e,
        cloud: t
      }),
      disabled: !!o,
      "aria-label": `查看${Eve[e.kind]}存档 ${wp(e.name, r)}`,
      children: [c.jsxs("div", {
        className: "scl-card-top",
        children: [c.jsxs("span", {
          children: [c.jsx(u, {
            size: 14
          }), Eve[e.kind]]
        }), c.jsxs("small", {
          children: [c.jsx(Wp, {
            size: 11
          }), m]
        })]
      }), c.jsx("div", {
        className: `scl-card-preview${a.length ? " has-images" : ""}`,
        children: r ? c.jsx(u, {
          size: 30
        }) : a.length ? a.map(y => c.jsx("img", {
          src: y,
          alt: "",
          loading: "lazy"
        }, y)) : c.jsxs(c.Fragment, {
          children: [c.jsx(u, {
            size: 24
          }), c.jsx("p", {
            children: e.summary || (t ? "下载后查看完整内容" : Eve[e.kind])
          })]
        })
      }), c.jsx("strong", {
        title: wp(e.name, r),
        children: wp(e.name, r)
      }), c.jsxs("span", {
        className: "scl-card-detail",
        children: [e.count, " ", e.kind === "generation" ? "轮创作" : "条消息", " · ", e.assetCount, " 个素材"]
      }), c.jsxs("span", {
        className: "scl-card-time",
        title: new Date(e.updatedAt).toLocaleString(ew()),
        children: [new Date(e.updatedAt).toLocaleDateString(ew()), " · ", tWn(e.bytes)]
      })]
    }), c.jsxs("div", {
      className: "scl-card-actions",
      children: [c.jsxs("button", {
        type: "button",
        disabled: !!o,
        onClick: () => X6({
          mode: "open",
          meta: e,
          cloud: t
        }),
        children: [t ? c.jsx(ws, {
          size: 13
        }) : c.jsx(u, {
          size: 13
        }), t ? "下载并查看" : "查看存档"]
      }), !t && H2() && c.jsxs("button", {
        type: "button",
        disabled: !!o || !!e.incomplete.length,
        onClick: () => void f(),
        title: "备份已保存的版本",
        children: [c.jsx(ml, {
          size: 13
        }), "备份"]
      }), c.jsx("button", {
        type: "button",
        className: "scl-card-delete",
        disabled: !!o,
        onClick: () => X6({
          mode: "delete",
          meta: e,
          cloud: t
        }),
        "aria-label": `删除${t ? "云端" : "本地"}存档 ${e.name}`,
        children: c.jsx(Qo, {
          size: 13
        })
      })]
    }), o && c.jsx("div", {
      className: "scl-card-message",
      role: "status",
      children: o
    }), l && c.jsx("div", {
      className: "scl-card-message scl-error",
      role: "alert",
      children: l
    })]
  });
}

const nCe = g.createContext(null);

let pE = null;

function eya(e) {
  return pE = e, () => {
    pE === e && (pE = null);
  };
}

async function fWn(e, t) {
  const n = t.trim();
  if (!n) throw new Error("请输入项目名称");
  if (pE) return pE.rename(e, n);
  const r = await sft(e, n);
  if (!r) throw new Error("项目不可用，请检查本地存储目录");
  return r;
}

async function gWn(e) {
  pE ? await pE.delete(e) : await S6n(e), iGn() === e && Ghe(null);
}

function yWn(e) {
  const t = Ur.getDirectoryPathTauri();
  return !t || !e ? null : `${ZEt(t)}/${e}`;
}

function tya(e) {
  return yWn(e) ?? `${POr()}/${e}`;
}

async function nya(e) {
  var n;
  const t = tya(e);
  if (!((n = navigator.clipboard) != null && n.writeText)) throw new Error("当前环境无法复制路径");
  return await navigator.clipboard.writeText(t), t;
}

async function rya(e) {
  const t = yWn(e);
  if (!t) throw new Error("当前没有可打开的本地路径，请先在设置中启用资源缓存目录");
  await Fr("open_folder_in_explorer", {
    path: t
  });
}

async function aya(e) {
  pE != null && pE.close && (await pE.close(e)), iGn() === e && Ghe(null), gy();
}

function iya({
  project: e,
  onChanged: t,
  source: n = "local",
  hasLocal: r = !0
}) {
  on();
  const a = PT(),
    i = g.useContext(nCe),
    o = i == null ? void 0 : i.upload,
    s = i == null ? void 0 : i.cloud,
    l = g.useRef(null),
    d = g.useRef(null),
    u = g.useRef(null),
    [h, p] = g.useState(null),
    [m, f] = g.useState(null),
    [y, b] = g.useState(e.name),
    [v, _] = g.useState(!1),
    [w, k] = g.useState(""),
    A = s != null && s.ossBusy && s.ossProgress.projectId === e.id ? s.ossProgress : null,
    S = (A == null ? void 0 : A.kind) === "upload",
    C = !!(o != null && o.busy || s != null && s.ossBusy);
  g.useEffect(() => {
    var R, j;
    if (!h) return;
    (j = (R = d.current) == null ? void 0 : R.querySelector("button")) == null || j.focus();
    const T = B => {
        var F, N;
        !((F = d.current) != null && F.contains(B.target)) && !((N = l.current) != null && N.contains(B.target)) && p(null);
      },
      P = () => p(null);
    return document.addEventListener("pointerdown", T), window.addEventListener("resize", P), window.addEventListener("scroll", P, !0), () => {
      document.removeEventListener("pointerdown", T), window.removeEventListener("resize", P), window.removeEventListener("scroll", P, !0);
    };
  }, [h]), g.useEffect(() => {
    var P;
    if (!m) return;
    const T = u.current;
    return T == null || T.showModal(), m === "rename" && ((P = T == null ? void 0 : T.querySelector("input")) == null || P.select()), () => {
      var R;
      T == null || T.close(), (R = l.current) == null || R.focus({
        preventScroll: !0
      });
    };
  }, [m]);
  const I = () => {
      v || f(null);
    },
    E = T => {
      p(null), k(""), b(e.name), f(T);
    },
    M = async () => {
      if (!(v || !m || m === "rename" && !y.trim())) {
        _(!0), k("");
        try {
          if (m === "rename") await fWn(e.id, y);else if (m === "delete-cloud") {
            if (!s) throw new Error("云端删除功能尚未就绪");
            if ((await s.deleteCloud(e.id)) === !1) throw new Error("删除云端项目失败");
          } else await gWn(e.id);
          f(null), t();
        } catch (T) {
          k(T instanceof Error ? T.message : "操作失败，请重试");
        } finally {
          _(!1);
        }
      }
    };
  return c.jsxs(c.Fragment, {
    children: [c.jsx("button", {
      ref: l,
      type: "button",
      className: `studio-project-more${h || m || A ? " is-open" : ""}`,
      "aria-label": x("管理 {0}", wp(e.name, a)),
      "aria-haspopup": "menu",
      "aria-expanded": !!h,
      title: x("项目操作"),
      onClick: () => {
        if (h) {
          p(null);
          return;
        }
        const T = l.current.getBoundingClientRect();
        p({
          left: Math.max(8, Math.min(T.right - 144, window.innerWidth - 152)),
          top: Math.max(8, Math.min(T.bottom + 6, window.innerHeight - 168))
        });
      },
      children: c.jsx(KEn, {
        size: 16
      })
    }), h && Da.createPortal(c.jsx("div", {
      ref: d,
      role: "menu",
      "aria-label": x("项目操作"),
      className: "studio-project-menu",
      style: h,
      onKeyDown: T => {
        var P, R;
        if (T.key === "Escape" || T.key === "Tab") p(null), T.key === "Escape" && (T.preventDefault(), (P = l.current) == null || P.focus());else if (T.key === "ArrowDown" || T.key === "ArrowUp") {
          T.preventDefault();
          const j = Array.from(d.current.querySelectorAll("button")),
            B = j.indexOf(document.activeElement);
          (R = j[(B + (T.key === "ArrowDown" ? 1 : j.length - 1)) % j.length]) == null || R.focus();
        }
      },
      children: n === "local" ? c.jsxs(c.Fragment, {
        children: [c.jsxs("button", {
          type: "button",
          role: "menuitem",
          onClick: () => E("rename"),
          children: [c.jsx(nw, {
            size: 14
          }), x("重命名")]
        }), c.jsxs("button", {
          type: "button",
          role: "menuitem",
          disabled: !(o != null && o.available) || C,
          title: o ? o.available ? x("上传此项目到 OSS") : x("请先在全局设置中配置 OSS") : x("正在准备上传功能"),
          onClick: () => {
            !o || C || (p(null), o.upload(e.id));
          },
          children: [c.jsx(ml, {
            size: 14
          }), S ? x("上传中 {0}%", Math.round((A == null ? void 0 : A.percent) ?? 0)) : x("上传到 OSS")]
        }), c.jsxs("button", {
          type: "button",
          role: "menuitem",
          className: "is-danger",
          onClick: () => E("delete"),
          children: [c.jsx(Qo, {
            size: 14
          }), x("删除")]
        })]
      }) : c.jsxs(c.Fragment, {
        children: [r ? c.jsxs("button", {
          type: "button",
          role: "menuitem",
          disabled: C,
          onClick: () => {
            p(null), iP(e.id, e.name);
          },
          children: [c.jsx(Sc, {
            size: 14
          }), x("本地打开")]
        }) : c.jsxs("button", {
          type: "button",
          role: "menuitem",
          disabled: C,
          onClick: () => {
            p(null), hGn(e.id, e.name);
          },
          children: [c.jsx(UEn, {
            size: 14
          }), (A == null ? void 0 : A.kind) === "download" ? x("同步中 {0}%", Math.round(A.percent)) : x("云端打开")]
        }), r ? c.jsxs("button", {
          type: "button",
          role: "menuitem",
          disabled: !(o != null && o.available) || C,
          title: o ? o.available ? x("将本地项目重新上传到云端") : x("请先在全局设置中配置 OSS") : x("正在准备上传功能"),
          onClick: () => {
            !o || C || (p(null), o.upload(e.id));
          },
          children: [c.jsx(ml, {
            size: 14
          }), S ? x("上传中 {0}%", Math.round((A == null ? void 0 : A.percent) ?? 0)) : x("上传到 OSS")]
        }) : c.jsxs("button", {
          type: "button",
          role: "menuitem",
          disabled: C,
          title: x("下载到本地后，可在本地项目中显示"),
          onClick: () => {
            !s || C || (p(null), s.download(e.id).then(t));
          },
          children: [c.jsx(ws, {
            size: 14
          }), (A == null ? void 0 : A.kind) === "download" ? x("同步中 {0}%", Math.round(A.percent)) : x("同步到本地")]
        }), c.jsxs("button", {
          type: "button",
          role: "menuitem",
          className: "is-danger",
          disabled: C,
          onClick: () => E("delete-cloud"),
          children: [c.jsx(Qo, {
            size: 14
          }), x("删云端")]
        })]
      })
    }), document.body), m && Da.createPortal(c.jsx("dialog", {
      ref: u,
      className: "studio-project-dialog",
      "aria-labelledby": `studio-project-dialog-${e.id}`,
      onCancel: T => {
        T.preventDefault(), I();
      },
      onClick: T => {
        T.target === T.currentTarget && I();
      },
      children: c.jsxs("form", {
        onSubmit: T => {
          T.preventDefault(), M();
        },
        children: [c.jsx("h2", {
          id: `studio-project-dialog-${e.id}`,
          children: x(m === "rename" ? "重命名项目" : m === "delete-cloud" ? "删除云端项目" : "删除项目")
        }), m === "rename" ? c.jsxs("label", {
          children: [x("项目名称"), c.jsx("input", {
            type: a ? "password" : "text",
            autoFocus: !0,
            value: y,
            disabled: v,
            onChange: T => b(T.target.value)
          })]
        }) : m === "delete-cloud" ? c.jsxs("p", {
          children: [x("确定从 OSS 永久删除「"), wp(e.name, a), x("」？云端文件夹内的全部文件将被删除，无法撤销。本地副本不受影响。")]
        }) : c.jsxs("p", {
          children: [x("确定删除「"), wp(e.name, a), x("」？本地项目及其素材将被删除，无法撤销。云端副本不受影响。")]
        }), w && c.jsx("p", {
          className: "studio-project-error",
          role: "alert",
          children: w
        }), c.jsxs("div", {
          className: "studio-project-dialog-actions",
          children: [c.jsx("button", {
            type: "button",
            onClick: I,
            disabled: v,
            autoFocus: m !== "rename",
            children: x("取消")
          }), c.jsx("button", {
            type: "submit",
            className: m === "rename" ? "is-primary" : "is-danger",
            disabled: v || m === "rename" && !y.trim(),
            children: x(v ? "处理中…" : m === "rename" ? "保存" : "删除")
          })]
        })]
      })
    }), document.body)]
  });
}

function oya({
  projects: e,
  onProjectsChanged: t
}) {
  on();
  const n = PT(),
    r = g.useContext(nCe),
    a = r == null ? void 0 : r.cloud,
    i = r == null ? void 0 : r.upload,
    o = (a == null ? void 0 : a.listTab) ?? "local",
    s = !!(a && (a.ossAvailable || i != null && i.available)),
    l = s && o === "cloud",
    [d, u] = g.useState("canvas"),
    [h, p] = g.useState(""),
    [m, f] = g.useState(() => {
      try {
        return localStorage.getItem("studio-projects-view") === "list" ? "list" : "grid";
      } catch {
        return "grid";
      }
    }),
    y = E => {
      f(E);
      try {
        localStorage.setItem("studio-projects-view", E);
      } catch {}
    },
    b = h.trim().toLocaleLowerCase(),
    v = E => wp(E, n).toLocaleLowerCase().includes(b),
    _ = X0a(l),
    w = _.rows.filter(E => (l || d === E.kind) && v(E.name)),
    k = l || d === "canvas",
    A = k ? (l ? (a == null ? void 0 : a.cloudProjects) ?? [] : e).filter(E => v(E.name)) : [],
    S = l ? A.filter(E => "hasLocal" in E && E.hasLocal) : e,
    C = IYe(S),
    I = l ? a != null && a.cloudListFetched ? A.length === 0 ? "云端暂无项目，请先在本地保存并上传。" : "" : (a == null ? void 0 : a.ossMessage) || "点击刷新，从云端拉取项目列表" : e.length === 0 ? "还没有保存过的项目。从首页发一句任务，或先新建一张画布。" : "";
  return c.jsxs("div", {
    className: "studio-page studio-page--projects",
    children: [c.jsx(pGn, {
      view: "projects"
    }), c.jsxs("div", {
      className: "studio-projects",
      children: [c.jsxs("header", {
        className: "studio-library-toolbar",
        "aria-label": x("项目库"),
        children: [c.jsxs("div", {
          className: "studio-library-sources",
          role: "group",
          "aria-label": x("项目来源"),
          children: [c.jsx(J0a, {
            value: l ? null : d,
            onChange: E => {
              a == null || a.setListTab("local"), u(E);
            }
          }), s && a ? c.jsx("button", {
            type: "button",
            "aria-pressed": l,
            className: l ? "is-active" : "",
            onClick: () => {
              a.enabled || a.updateSettings({
                enabled: !0
              }), a.setListTab("cloud");
            },
            children: x("云端备份")
          }) : null]
        }), c.jsxs("div", {
          className: "studio-library-tools",
          children: [c.jsxs("label", {
            className: "studio-library-search",
            children: [c.jsx(mc, {
              size: 16,
              "aria-hidden": "true"
            }), c.jsx("input", {
              type: "search",
              "aria-label": x("搜索项目"),
              placeholder: x("搜索项目"),
              value: h,
              onChange: E => p(E.target.value),
              onKeyDown: E => {
                E.key === "Escape" && p("");
              }
            }), h ? c.jsx("button", {
              type: "button",
              "aria-label": x("清空搜索"),
              onClick: () => p(""),
              children: c.jsx(Na, {
                size: 14
              })
            }) : null]
          }), c.jsxs("div", {
            className: "studio-library-views",
            role: "group",
            "aria-label": x("显示方式"),
            children: [c.jsx("button", {
              type: "button",
              "aria-label": x("网格视图"),
              title: x("网格视图"),
              "aria-pressed": m === "grid",
              onClick: () => y("grid"),
              children: c.jsx(Od, {
                size: 18
              })
            }), c.jsx("button", {
              type: "button",
              "aria-label": x("列表视图"),
              title: x("列表视图"),
              "aria-pressed": m === "list",
              onClick: () => y("list"),
              children: c.jsx(X$, {
                size: 19
              })
            })]
          }), l && a ? c.jsx("button", {
            type: "button",
            className: "studio-library-refresh",
            onClick: () => {
              a.refreshCloudList(), _.refresh();
            },
            disabled: a.ossBusy || _.busy,
            title: x("刷新云端列表，同步显示 OSS 项目"),
            "aria-label": x("刷新云端列表，同步显示 OSS 项目"),
            children: c.jsx(bd, {
              size: 14,
              strokeWidth: 1.75,
              className: a.ossBusy && a.ossProgress.kind === "refresh" ? "studio-spin" : void 0
            })
          }) : null, c.jsxs("button", {
            type: "button",
            className: "studio-library-create",
            onClick: tFe,
            children: [c.jsx(eo, {
              size: 18,
              strokeWidth: 1.75
            }), x("新建项目")]
          })]
        })]
      }), _.error ? c.jsx("p", {
        className: "scl-error",
        role: "alert",
        children: _.error
      }) : null, l && (a != null && a.ossMessage) && a.cloudListFetched ? c.jsx("p", {
        className: "studio-projects-oss-msg",
        role: "status",
        children: a.ossMessage
      }) : null, c.jsxs("div", {
        className: `studio-projects-grid${m === "list" ? " is-list" : ""}`,
        children: [m === "list" ? c.jsxs("div", {
          className: "studio-library-list-head",
          "aria-hidden": "true",
          children: [c.jsx("span", {
            children: x("预览")
          }), c.jsx("span", {
            children: x("名称")
          }), c.jsx("span", {
            children: x("类型")
          }), c.jsx("span", {
            children: x("内容")
          }), c.jsx("span", {
            children: x("最近更新")
          }), c.jsx("span", {
            children: x("状态")
          }), c.jsx("span", {})]
        }) : null, l || !k || b || m === "list" ? null : c.jsxs("button", {
          type: "button",
          className: "studio-project-tile studio-project-tile--new",
          onClick: tFe,
          children: [c.jsx("span", {
            className: "studio-library-plus",
            children: c.jsx(eo, {
              size: 24,
              strokeWidth: 2
            })
          }), c.jsx("span", {
            children: x("新建项目")
          })]
        }), !A.length && !w.length ? c.jsx("div", {
          className: "studio-empty",
          role: "status",
          children: _.busy ? x("正在读取云端内容…") : b ? x("没有找到匹配的项目") : k ? I : `暂无${d === "chat" ? "对话" : d === "harness" ? "Harness" : "言绘"}存档，从对应会话的「保存到项目库」开始。`
        }) : null, A.map(E => {
          const M = C[E.id],
            T = !l || !!("hasLocal" in E && E.hasLocal),
            P = !l && ((a == null ? void 0 : a.isBackedUpOnOss(E.id)) || Y7t(E.id) != null),
            R = a != null && a.ossBusy && a.ossProgress.projectId === E.id ? a.ossProgress : null,
            j = l ? T ? "本地+云" : "仅云端" : P ? "云端已备份" : "";
          return c.jsxs("div", {
            className: "studio-project-tile-wrap",
            children: [c.jsxs("button", {
              type: "button",
              className: "studio-project-tile",
              onClick: () => {
                R || (T ? iP(E.id, E.name) : hGn(E.id, E.name));
              },
              "aria-label": `${T ? "打开" : "从云端打开"} ${wp(E.name, n)}`,
              "aria-busy": R ? !0 : void 0,
              children: [c.jsx("span", {
                className: "studio-project-tile-cover",
                "aria-hidden": "true",
                children: c.jsx("span", {
                  className: "studio-project-tile-image",
                  children: !n && T && (M != null && M.url) ? c.jsx("img", {
                    src: M.url,
                    alt: "",
                    loading: "lazy"
                  }) : c.jsx("span", {
                    children: n ? "◇" : E.name.slice(0, 1) || x("画")
                  })
                })
              }), c.jsx("span", {
                className: "scl-canvas-kind",
                children: x("画布")
              }), j || m === "list" ? c.jsxs("span", {
                className: `studio-project-cloud-tag${l && !T ? " is-cloud-only" : l ? " is-local-cloud" : ""}`,
                title: x(j),
                children: [j ? c.jsx(Wp, {
                  size: 10,
                  strokeWidth: 2
                }) : null, x(j || "仅本地")]
              }) : null, R && R.kind ? c.jsxs("span", {
                className: "studio-project-oss-progress",
                children: [c.jsxs("span", {
                  className: "studio-project-oss-progress-row",
                  children: [c.jsx("span", {
                    children: R.kind === "upload" ? x("上传中") : R.kind === "delete" ? x("删除云端") : R.kind === "download" ? x("同步中") : x("处理中")
                  }), c.jsxs("span", {
                    children: [Math.round(R.percent), "%"]
                  })]
                }), c.jsx("span", {
                  className: "studio-project-oss-progress-bar",
                  children: c.jsx("span", {
                    style: {
                      width: `${Math.min(100, Math.max(0, R.percent))}%`
                    }
                  })
                }), R.message ? c.jsx("span", {
                  className: "studio-project-oss-progress-msg",
                  children: R.message
                }) : null]
              }) : null, c.jsxs("span", {
                className: "studio-project-tile-info",
                children: [c.jsx("span", {
                  className: "studio-project-tile-title",
                  title: wp(E.name, n),
                  children: wp(E.name, n)
                }), c.jsxs("span", {
                  className: "studio-project-tile-time",
                  children: [x("编辑于 "), QU(E.updatedAt), " · ", E.nodeCount ?? 0, x(" 节点")]
                })]
              }), m === "list" ? c.jsxs(c.Fragment, {
                children: [c.jsxs("span", {
                  className: "studio-library-count",
                  children: [E.nodeCount ?? 0, x(" 节点")]
                }), c.jsx("time", {
                  className: "studio-library-updated",
                  dateTime: new Date(E.updatedAt).toISOString(),
                  title: new Date(E.updatedAt).toLocaleString(ew()),
                  children: QU(E.updatedAt)
                })]
              }) : null]
            }), c.jsx(iya, {
              project: E,
              onChanged: t,
              source: l ? "cloud" : "local",
              hasLocal: T
            })]
          }, `${l ? "cloud" : "local"}-${E.id}`);
        }), w.map(E => c.jsx(Z0a, {
          meta: E,
          cloud: l,
          onChanged: () => void _.refresh()
        }, E.id))]
      })]
    })]
  });
}

function sya() {
  const e = g.useSyncExternalStore(Ufa, KXt, KXt);
  return e ? c.jsx(lya, {
    request: e
  }, e.mode === "save" ? `save:${e.source.sourceId}` : `${e.mode}:${e.meta.id}`) : null;
}

function lya({
  request: e
}) {
  const [t, n] = g.useState(e.mode === "save" ? e.source.name : e.meta.name),
    [r, a] = g.useState(H2),
    [i, o] = g.useState(!1),
    [s, l] = g.useState(!1),
    [d, u] = g.useState(!1),
    [h, p] = g.useState(null),
    [m, f] = g.useState(!1),
    [y, b] = g.useState(""),
    [v, _] = g.useState(""),
    [w, k] = g.useState({}),
    A = g.useRef(null),
    S = e.mode === "save" ? e.source.kind : e.meta.kind;
  g.useEffect(() => {
    var F, N;
    const B = document.activeElement;
    return (N = (F = A.current) == null ? void 0 : F.querySelector("input, button")) == null || N.focus(), () => {
      B != null && B.isConnected && B.focus();
    };
  }, []), g.useEffect(() => {
    let B = !0;
    return e.mode === "save" ? Jce().then(F => {
      B && u(F.some(N => N.kind === S && N.sourceId === e.source.sourceId));
    }).catch(F => {
      B && _(String(F));
    }) : e.mode === "open" && (f(!0), b("读取存档"), (e.cloud ? Q0a(e.meta, b) : kQ(e.meta.id)).then(F => {
      B && p(F);
    }).catch(F => {
      B && _(F instanceof Error ? F.message : String(F));
    }).finally(() => {
      B && (f(!1), b(""));
    })), () => {
      B = !1;
    };
  }, [e, S]), g.useEffect(() => {
    if (!h) return;
    const B = {};
    for (const F of h.assets) h.blobs[F.id] && (B[`library-media:${F.id}`] = URL.createObjectURL(h.blobs[F.id]));
    return k(B), () => Object.values(B).forEach(F => URL.revokeObjectURL(F));
  }, [h]);
  const C = () => {
      m || X6(null);
    },
    I = async B => {
      if (!m) {
        f(!0), _("");
        try {
          await B();
        } catch (F) {
          _(F instanceof Error ? F.message : String(F));
        } finally {
          f(!1), b("");
        }
      }
    },
    E = () => I(async () => {
      if (e.mode !== "save") return;
      b("收集当前会话");
      const B = await e.source.capture(s);
      let F;
      try {
        F = await K0a(B.content, t, {
          copy: i,
          sourceStamp: B.sourceStamp,
          progress: b
        });
      } finally {
        B.content.kind === "harness" && B.content.files.forEach(N => {
          N.url.startsWith("blob:") && URL.revokeObjectURL(N.url);
        });
      }
      if (p(F), F.meta.incomplete.length) throw new Error(`本地已保存，但有 ${F.meta.incomplete.length} 项素材无法读取；请检查原素材后重新保存。此存档尚不能备份或恢复。`);
      if (r) try {
        await lbt(F.meta.id, b);
      } catch (N) {
        throw new Error(`本地已保存，云端备份失败：${N instanceof Error ? N.message : String(N)}`);
      }
      Vs(r ? "已保存到项目库并完成云端备份" : "已保存到本地项目库"), X6(null);
    }),
    M = () => I(async () => {
      if (!h) return;
      b("恢复素材与会话");
      const B = await $0a(h);
      if (B.kind === "chat") {
        const {
          importStudioHomeChat: F
        } = await Ie(async () => {
          const {
            importStudioHomeChat: N
          } = await Promise.resolve().then(() => uoa);
          return {
            importStudioHomeChat: N
          };
        }, void 0, import.meta.url);
        F(B, h.meta.name), DE("chat"), gy(!1);
      } else if (B.kind === "harness") {
        const {
            pickLocalSkillDirectory: F
          } = await Ie(async () => {
            const {
              pickLocalSkillDirectory: z
            } = await Promise.resolve().then(() => O9t);
            return {
              pickLocalSkillDirectory: z
            };
          }, void 0, import.meta.url),
          N = await F();
        if (!N) return;
        const {
          importStudioHomeHarness: G
        } = await Ie(async () => {
          const {
            importStudioHomeHarness: z
          } = await Promise.resolve().then(() => xoa);
          return {
            importStudioHomeHarness: z
          };
        }, void 0, import.meta.url);
        B.files.length && B.messages.push({
          id: crypto.randomUUID(),
          role: "assistant",
          timestamp: Date.now(),
          content: "此存档包含以下生成文件，可下载后放入当前工作区。原工作区路径仅作为历史记录保留。",
          files: B.files.map(z => ({
            name: z.name,
            url: z.url,
            _documentAssetId: z.url.replace("local-asset://", "")
          }))
        }), await G(B, h.meta.name, N), gy(!1);
      } else {
        const {
          openLibraryGeneration: F
        } = await Ie(async () => {
          const {
            openLibraryGeneration: N
          } = await Promise.resolve().then(() => ldi);
          return {
            openLibraryGeneration: N
          };
        }, void 0, import.meta.url);
        await F(B, h.meta.name);
      }
      Vs("已恢复为新会话"), X6(null);
    }),
    T = () => I(async () => {
      e.mode === "delete" && (e.cloud ? await Y0a(e.meta) : await S0a(e.meta.id), Vs(e.cloud ? "已删除云端存档" : "已删除本地存档"), X6(null));
    }),
    P = () => I(async () => {
      h && (await lbt(h.meta.id, b), Vs("云端备份完成"), X6(null));
    }),
    R = h == null ? void 0 : h.content,
    j = async (B, F) => {
      const N = h == null ? void 0 : h.blobs[B.slice(14)];
      if (!N) {
        _("此文件未包含在存档中");
        return;
      }
      await I(async () => {
        const {
          isTauriEnvironment: G
        } = await Ie(async () => {
          const {
            isTauriEnvironment: z
          } = await Promise.resolve().then(() => FCr);
          return {
            isTauriEnvironment: z
          };
        }, void 0, import.meta.url);
        if (G()) {
          const {
            saveToDisk: z
          } = await Ie(async () => {
            const {
              saveToDisk: V
            } = await Promise.resolve().then(() => Sde);
            return {
              saveToDisk: V
            };
          }, void 0, import.meta.url);
          await z(N, F.split(/[\\/]/).pop() || "存档文件"), Vs("文件已保存到下载目录");
        } else {
          const z = document.createElement("a");
          z.href = w[B], z.download = F.split(/[\\/]/).pop() || "存档文件", z.click();
        }
      });
    };
  return c.jsx("div", {
    className: "scl-overlay",
    onPointerDown: B => {
      B.target === B.currentTarget && C();
    },
    onKeyDown: B => {
      var F;
      if (B.key === "Escape" && (B.stopPropagation(), C()), B.key === "Tab") {
        const N = [...(((F = A.current) == null ? void 0 : F.querySelectorAll('button:not(:disabled), input:not(:disabled), a[href], summary, [tabindex="0"]')) || [])],
          G = N[0],
          z = N[N.length - 1];
        B.shiftKey && document.activeElement === G ? (B.preventDefault(), z == null || z.focus()) : !B.shiftKey && document.activeElement === z && (B.preventDefault(), G == null || G.focus());
      }
    },
    children: c.jsxs("div", {
      className: `scl-dialog${e.mode === "open" ? " scl-dialog--preview" : ""}`,
      ref: A,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "scl-title",
      "aria-busy": m,
      children: [c.jsxs("header", {
        children: [c.jsx("span", {
          className: "scl-symbol",
          children: c.jsx(yRr, {
            size: 20
          })
        }), c.jsxs("div", {
          children: [c.jsxs("small", {
            children: [Eve[S], " · 项目库"]
          }), c.jsx("h2", {
            id: "scl-title",
            children: e.mode === "save" ? d ? "更新保存内容" : "保存到项目库" : e.mode === "delete" ? `删除${e.cloud ? "云端" : "本地"}存档` : t
          })]
        }), c.jsx("button", {
          type: "button",
          className: "scl-close",
          onClick: C,
          disabled: m,
          "aria-label": "关闭",
          children: c.jsx(Na, {
            size: 19
          })
        })]
      }), c.jsxs("div", {
        className: "scl-dialog-body",
        children: [e.mode === "save" ? c.jsxs("form", {
          id: "scl-save",
          onSubmit: B => {
            B.preventDefault(), E();
          },
          children: [c.jsxs("label", {
            className: "scl-field",
            children: ["内容名称", c.jsx("input", {
              value: t,
              maxLength: 100,
              required: !0,
              onChange: B => n(B.target.value),
              disabled: m
            })]
          }), c.jsxs("div", {
            className: "scl-scope",
            children: [c.jsx("strong", {
              children: "保存范围"
            }), c.jsx("p", {
              children: S === "generation" ? "当前选中的创作会话：全部轮次、图片与视频原文件、参考素材、生成参数和当前草稿。" : S === "harness" ? "当前会话：完整消息、附件、工具记录、生成结果和任务检查点。" : "当前会话：完整消息、引用内容、附件和模型选择。"
            })]
          }), c.jsxs("label", {
            className: "scl-check",
            children: [c.jsx("input", {
              type: "checkbox",
              checked: r,
              disabled: m || !H2(),
              onChange: B => a(B.target.checked)
            }), c.jsxs("span", {
              children: [c.jsx("strong", {
                children: "同时备份到云端"
              }), c.jsx("small", {
                children: H2() ? "使用现有图床 / OSS 配置，按内容类型独立保存" : "请先在设置中配置图床 / OSS；当前可保存到本地"
              })]
            }), c.jsx(Wp, {
              size: 17
            })]
          }), S === "harness" && c.jsxs("label", {
            className: "scl-check",
            children: [c.jsx("input", {
              type: "checkbox",
              checked: s,
              disabled: m,
              onChange: B => l(B.target.checked)
            }), c.jsxs("span", {
              children: [c.jsx("strong", {
                children: "包含本会话创建的文件"
              }), c.jsx("small", {
                children: "仅收集有创建记录的文件；恢复后可单独下载"
              })]
            })]
          }), d && c.jsxs("label", {
            className: "scl-check",
            children: [c.jsx("input", {
              type: "checkbox",
              checked: i,
              disabled: m,
              onChange: B => o(B.target.checked)
            }), c.jsx("span", {
              children: "另存为副本，保留之前的存档"
            })]
          }), c.jsx("p", {
            className: "scl-hint",
            children: "保存此刻的内容；后续新消息或生成结果可再次更新保存。"
          })]
        }) : e.mode === "delete" ? c.jsxs("p", {
          children: ["删除「", t, "」的", e.cloud ? "云端" : "本地", "存档？原会话、画布和", e.cloud ? "本地" : "云端", "内容会继续保留。"]
        }) : c.jsxs(c.Fragment, {
          children: [h && c.jsxs("p", {
            className: "scl-hint",
            children: [h.meta.count, " ", S === "generation" ? "轮创作" : "条消息", " · ", h.assets.length, " 个素材 · ", tWn(h.meta.bytes), c.jsx("br", {}), "恢复将创建新会话，运行中的任务不会自动重跑。"]
          }), R && R.kind !== "generation" && c.jsx("div", {
            className: "scl-transcript",
            children: R.messages.map((B, F) => {
              var N;
              return c.jsxs("article", {
                children: [c.jsx("small", {
                  children: B.role === "user" ? "你" : "助手"
                }), B.quotedFrom && c.jsxs("details", {
                  children: [c.jsx("summary", {
                    children: "引用内容"
                  }), c.jsx("pre", {
                    children: JSON.stringify(B.quotedFrom, null, 2)
                  })]
                }), c.jsx("p", {
                  children: B.content
                }), (N = B.files) == null ? void 0 : N.map((G, z) => G.url && w[G.url] ? c.jsx("a", {
                  href: w[G.url],
                  onClick: V => {
                    V.preventDefault(), j(G.url, G.name);
                  },
                  children: G.name
                }, z) : c.jsx("span", {
                  children: G.name
                }, z)), "toolSteps" in B && B.toolSteps && c.jsxs("details", {
                  children: [c.jsx("summary", {
                    children: "工具记录"
                  }), c.jsx("pre", {
                    children: JSON.stringify(B.toolSteps, null, 2)
                  })]
                })]
              }, `${B.id}:${F}`);
            })
          }), (R == null ? void 0 : R.kind) === "generation" && c.jsxs("div", {
            className: "scl-scope",
            children: [c.jsx("strong", {
              children: "当前草稿"
            }), c.jsx("p", {
              children: R.draft.prompt || "（空草稿）"
            }), c.jsxs("small", {
              children: [R.draft.model, " · ", R.draft.ratio, " · ", R.draft.resolution]
            })]
          }), h && c.jsx("div", {
            className: "scl-media-grid",
            children: h.assets.map(B => B.mime.startsWith("image/") ? c.jsx("img", {
              src: w[`library-media:${B.id}`],
              alt: "存档图片",
              loading: "lazy"
            }, B.id) : B.mime.startsWith("video/") ? c.jsx("video", {
              src: w[`library-media:${B.id}`],
              controls: !0,
              preload: "metadata"
            }, B.id) : null)
          }), (R == null ? void 0 : R.kind) === "harness" && R.files.map(B => c.jsxs("a", {
            className: "scl-file",
            href: w[B.url],
            onClick: F => {
              F.preventDefault(), j(B.url, B.name);
            },
            children: [c.jsx(ws, {
              size: 14
            }), B.name]
          }, B.name)), (R == null ? void 0 : R.kind) === "harness" && Object.keys(R.executions).length > 0 && c.jsxs("details", {
            children: [c.jsx("summary", {
              children: "完整工具输出"
            }), Object.entries(R.executions).map(([B, F]) => c.jsx("pre", {
              children: F
            }, B))]
          })]
        }), y && c.jsxs("p", {
          className: "scl-progress",
          role: "status",
          children: [c.jsx(Ua, {
            size: 15,
            className: "studio-spin"
          }), y]
        }), v && c.jsx("p", {
          className: "scl-error",
          role: "alert",
          children: v
        })]
      }), c.jsxs("footer", {
        children: [c.jsx("button", {
          type: "button",
          onClick: C,
          disabled: m,
          children: e.mode === "open" ? "关闭" : "取消"
        }), e.mode === "save" ? c.jsxs(c.Fragment, {
          children: [h && v && !h.meta.incomplete.length && r && c.jsx("button", {
            type: "button",
            onClick: () => void P(),
            disabled: m,
            children: "重试备份"
          }), c.jsx("button", {
            className: "scl-primary",
            type: "submit",
            form: "scl-save",
            disabled: m || !t.trim(),
            children: m ? "正在保存…" : d && !i ? "更新保存" : "保存内容"
          })]
        }) : e.mode === "delete" ? c.jsx("button", {
          type: "button",
          className: "scl-danger",
          disabled: m,
          onClick: () => void T(),
          children: "删除存档"
        }) : c.jsx("button", {
          type: "button",
          className: "scl-primary",
          disabled: m || !h || !!h.meta.incomplete.length,
          onClick: () => void M(),
          children: S === "harness" ? "选择工作区并恢复" : "恢复并打开"
        })]
      })]
    })
  });
}

function gJt({
  project: e,
  disabled: t,
  inbox: n = !1,
  onAction: r
}) {
  on();
  const a = g.useRef(null),
    i = g.useRef(null),
    [o, s] = g.useState(null);
  g.useEffect(() => {
    var h, p;
    if (!o) return;
    (p = (h = i.current) == null ? void 0 : h.querySelector("button")) == null || p.focus();
    const d = m => {
        var f, y;
        !((f = i.current) != null && f.contains(m.target)) && !((y = a.current) != null && y.contains(m.target)) && s(null);
      },
      u = () => s(null);
    return window.addEventListener("pointerdown", d), window.addEventListener("resize", u), () => {
      window.removeEventListener("pointerdown", d), window.removeEventListener("resize", u);
    };
  }, [o]);
  const l = d => {
    var u;
    s(null), (u = a.current) == null || u.focus({
      preventScroll: !0
    }), r(d);
  };
  return c.jsxs(c.Fragment, {
    children: [c.jsx("button", {
      ref: a,
      type: "button",
      className: "studio-tree-action",
      title: x("项目操作"),
      "aria-label": x("项目操作"),
      "aria-haspopup": "menu",
      "aria-expanded": !!o,
      "data-project-menu-open": o ? "" : void 0,
      disabled: t,
      onClick: () => {
        if (o) {
          s(null);
          return;
        }
        const d = a.current.getBoundingClientRect();
        s({
          left: Math.max(8, Math.min(d.left, window.innerWidth - 228)),
          top: Math.max(8, Math.min(d.bottom + 6, window.innerHeight - 248))
        });
      },
      children: c.jsx(hw, {
        size: 16
      })
    }), o && Da.createPortal(c.jsxs("div", {
      ref: i,
      role: "menu",
      "aria-label": x("项目操作"),
      className: "studio-project-menu studio-folder-menu",
      style: o,
      onKeyDown: d => {
        var u, h;
        if (d.key === "Escape" || d.key === "Tab") s(null), d.key === "Escape" && (d.preventDefault(), (u = a.current) == null || u.focus({
          preventScroll: !0
        }));else if (["ArrowDown", "ArrowUp", "Home", "End"].includes(d.key)) {
          d.preventDefault();
          const p = Array.from(i.current.querySelectorAll("button:not(:disabled)")),
            m = p.indexOf(document.activeElement);
          (h = p[d.key === "Home" ? 0 : d.key === "End" ? p.length - 1 : (m + (d.key === "ArrowDown" ? 1 : -1) + p.length) % p.length]) == null || h.focus();
        }
      },
      children: [c.jsxs("button", {
        role: "menuitem",
        onClick: () => l("pin"),
        children: [e.pinned ? c.jsx(k5e, {
          size: 16
        }) : c.jsx(zM, {
          size: 16
        }), e.pinned ? x("取消置顶") : x("置顶")]
      }), c.jsx("div", {
        role: "separator"
      }), c.jsxs("button", {
        role: "menuitem",
        onClick: () => l("canvas"),
        children: [c.jsx(eo, {
          size: 16
        }), x("新建画布")]
      }), c.jsxs("button", {
        role: "menuitem",
        onClick: () => l("fold"),
        children: [e.collapsed ? c.jsx(ss, {
          size: 16
        }) : c.jsx(Mi, {
          size: 16
        }), e.collapsed ? x("展开项目") : x("收起项目")]
      }), n ? null : c.jsxs(c.Fragment, {
        children: [c.jsx("div", {
          role: "separator"
        }), c.jsxs("button", {
          role: "menuitem",
          disabled: !e.canvasIds.length,
          onClick: () => l("release"),
          children: [c.jsx(rTn, {
            size: 16
          }), x("移出全部画布")]
        }), c.jsxs("button", {
          role: "menuitem",
          onClick: () => l("remove"),
          children: [c.jsx(Na, {
            size: 16
          }), x("移除项目")]
        })]
      })]
    }), document.body)]
  });
}

function bWn({
  url: e,
  name: t,
  isVideo: n,
  size: r = 20,
  fallback: a,
  onForceRetry: i,
  showTitle: o = !0
}) {
  on();
  const [s, l] = g.useState(!1),
    [d, u] = g.useState(!1),
    [h, p] = g.useState(e || "");
  g.useEffect(() => {
    p(e || ""), l(!1), u(!1);
  }, [e]);
  const m = c.jsx("span", {
    className: "studio-file-thumb-badge",
    title: o ? t : void 0,
    "aria-hidden": "true",
    style: {
      flex: "0 0 auto",
      width: r,
      height: r,
      borderRadius: Math.max(2, Math.round(r / 10)),
      display: "grid",
      placeItems: "center",
      background: "rgba(255,255,255,.08)",
      color: "inherit",
      fontSize: Math.round(r * .55),
      lineHeight: 1,
      overflow: "hidden"
    },
    children: a || t.slice(0, 1) || x("画")
  });
  return !h || d ? m : c.jsxs("span", {
    className: "studio-file-thumb",
    style: {
      position: "relative",
      flex: "0 0 auto",
      width: r,
      height: r,
      borderRadius: Math.max(2, Math.round(r / 10)),
      overflow: "hidden",
      background: "rgba(255,255,255,.08)"
    },
    title: o ? t : void 0,
    children: [c.jsx("img", {
      src: h,
      alt: "",
      loading: "lazy",
      decoding: "async",
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block"
      },
      onError: () => {
        if (s) {
          u(!0);
          return;
        }
        if (l(!0), i) {
          Promise.resolve(i()).then(f => {
            f && f !== h ? p(f) : u(!0);
          });
          return;
        }
        h.includes("force=1") ? u(!0) : p(`${h}${h.includes("?") ? "&" : "?"}force=1`);
      }
    }), n ? c.jsx("span", {
      className: "studio-file-thumb-play",
      "aria-hidden": "true",
      style: {
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        color: "#fff",
        textShadow: "0 1px 2px rgba(0,0,0,.6)"
      },
      children: c.jsx("svg", {
        width: "10",
        height: "10",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        children: c.jsx("path", {
          d: "M8 5.2c0-.7.8-1.2 1.4-.8l8.2 5.3c.6.4.6 1.2 0 1.6l-8.2 5.3c-.6.4-1.4 0-1.4-.8V5.2Z"
        })
      })
    }) : null]
  });
}

function jnt(e, t, n, r) {
  return {
    left: Math.max(8, Math.min(e, window.innerWidth - n)),
    top: Math.max(8, Math.min(t, window.innerHeight - r))
  };
}

const vWn = g.forwardRef(function ({
  canvasId: t,
  name: n,
  pinned: r,
  assignedProjectId: a,
  projects: i,
  canClose: o,
  disabled: s,
  showMove: l = !0,
  showPath: d = !0,
  label: u = "画布操作",
  onAction: h
}, p) {
  on();
  const m = PT(),
    f = g.useContext(nCe),
    y = f == null ? void 0 : f.upload,
    b = f == null ? void 0 : f.cloud,
    v = !!(y != null && y.busy || b != null && b.ossBusy),
    _ = b != null && b.ossBusy && b.ossProgress.projectId === t && b.ossProgress.kind === "upload" ? b.ossProgress : null,
    w = g.useRef(null),
    k = g.useRef(null),
    A = g.useRef(null),
    S = g.useRef(!1),
    [C, I] = g.useState(null),
    [E, M] = g.useState(null);
  g.useEffect(() => {
    var N, G;
    if (!C) return;
    (G = (N = k.current) == null ? void 0 : N.querySelector("button")) == null || G.focus();
    const B = z => {
        var O, L, D;
        const V = z.target;
        !((O = k.current) != null && O.contains(V)) && !((L = A.current) != null && L.contains(V)) && !((D = w.current) != null && D.contains(V)) && (I(null), M(null));
      },
      F = () => {
        I(null), M(null);
      };
    return window.addEventListener("pointerdown", B), window.addEventListener("resize", F), () => {
      window.removeEventListener("pointerdown", B), window.removeEventListener("resize", F);
    };
  }, [C]);
  const T = (B, F) => {
      S.current = !1, M(null), I(jnt(B, F, 228, 320));
    },
    P = () => {
      const B = w.current.getBoundingClientRect();
      S.current = !0, M(null), I({
        left: Math.max(8, B.right - 228),
        top: Math.max(8, B.top - 8)
      });
    };
  g.useLayoutEffect(() => {
    if (!C || !k.current || !w.current) return;
    const B = w.current.getBoundingClientRect(),
      F = k.current.offsetWidth || 228,
      N = k.current.offsetHeight,
      {
        left: G,
        top: z
      } = S.current ? {
        left: Math.max(8, Math.min(B.right - F, window.innerWidth - F - 8)),
        top: Math.max(8, B.top - N - 6)
      } : jnt(C.left, C.top, F + 8, N + 8);
    Math.abs(C.left - G) < 1 && Math.abs(C.top - z) < 1 || I({
      left: G,
      top: z
    });
  }, [C]), g.useImperativeHandle(p, () => ({
    openAt: T
  }), []);
  const R = (B, F) => {
      var N;
      I(null), M(null), (N = w.current) == null || N.focus({
        preventScroll: !0
      }), h(B, F);
    },
    j = B => {
      const F = B.getBoundingClientRect(),
        N = 196,
        G = Math.min(280, 44 + i.length * 40),
        z = F.right + N > window.innerWidth ? F.left - N + 6 : F.right - 6;
      M(jnt(z, F.top - 6, N, G));
    };
  return c.jsxs(c.Fragment, {
    children: [c.jsx("button", {
      ref: w,
      type: "button",
      className: "studio-tree-action",
      title: u,
      "aria-label": `${u} ${n}`,
      "aria-haspopup": "menu",
      "aria-expanded": !!C,
      "data-canvas-menu-open": C ? "" : void 0,
      disabled: s,
      onClick: B => {
        if (B.stopPropagation(), C) {
          I(null), M(null);
          return;
        }
        P();
      },
      onContextMenu: B => {
        B.preventDefault(), B.stopPropagation(), T(B.clientX, B.clientY);
      },
      children: c.jsx(hw, {
        size: 16
      })
    }), C && Da.createPortal(c.jsxs("div", {
      ref: k,
      role: "menu",
      "aria-label": u,
      className: "studio-project-menu studio-folder-menu studio-canvas-menu",
      style: C,
      onKeyDown: B => {
        var F, N, G;
        if (B.key === "Escape" || B.key === "Tab") I(null), M(null), B.key === "Escape" && (B.preventDefault(), (F = w.current) == null || F.focus({
          preventScroll: !0
        }));else if (["ArrowDown", "ArrowUp", "Home", "End"].includes(B.key)) {
          B.preventDefault();
          const z = Array.from(k.current.querySelectorAll(":scope > button:not(:disabled)")),
            V = z.indexOf(document.activeElement);
          (N = z[B.key === "Home" ? 0 : B.key === "End" ? z.length - 1 : (V + (B.key === "ArrowDown" ? 1 : -1) + z.length) % z.length]) == null || N.focus();
        } else B.key === "ArrowRight" && ((G = document.activeElement) == null ? void 0 : G.dataset.submenu) === "move" && (B.preventDefault(), j(document.activeElement), requestAnimationFrame(() => {
          var z, V;
          return (V = (z = A.current) == null ? void 0 : z.querySelector("button")) == null ? void 0 : V.focus();
        }));
      },
      children: [c.jsxs("button", {
        type: "button",
        role: "menuitem",
        onMouseEnter: () => M(null),
        onClick: () => R("rename"),
        children: [c.jsx(nw, {
          size: 16
        }), x("重命名")]
      }), l && c.jsxs("button", {
        type: "button",
        role: "menuitem",
        "data-submenu": "move",
        "aria-haspopup": "menu",
        "aria-expanded": !!E,
        onMouseEnter: B => j(B.currentTarget),
        onClick: B => j(B.currentTarget),
        children: [c.jsx(rTn, {
          size: 16
        }), c.jsx("span", {
          children: x("移入项目")
        }), c.jsx(ss, {
          size: 14
        })]
      }), (l || d || o) && c.jsx("div", {
        role: "separator"
      }), d && c.jsxs("button", {
        type: "button",
        role: "menuitem",
        onMouseEnter: () => M(null),
        onClick: () => R("copy-path"),
        children: [c.jsx(Cx, {
          size: 16
        }), x("复制路径")]
      }), d && c.jsxs("button", {
        type: "button",
        role: "menuitem",
        onMouseEnter: () => M(null),
        onClick: () => R("reveal"),
        children: [c.jsx(Sc, {
          size: 16
        }), x("在文件资源管理器中打开")]
      }), c.jsxs("button", {
        type: "button",
        role: "menuitem",
        disabled: s || !(y != null && y.available) || v,
        title: y ? y.available ? x("上传此项目到 OSS") : x("请先在全局设置中配置 OSS") : x("正在准备上传功能"),
        onMouseEnter: () => M(null),
        onClick: B => {
          var F;
          B.stopPropagation(), !(s || !(y != null && y.available) || v) && (I(null), M(null), (F = w.current) == null || F.focus({
            preventScroll: !0
          }), y.upload(t));
        },
        children: [c.jsx(ml, {
          size: 16
        }), _ ? x("上传中 {0}%", Math.round(_.percent)) : x("上传到 OSS")]
      }), o && c.jsxs("button", {
        type: "button",
        role: "menuitem",
        onMouseEnter: () => M(null),
        onClick: () => R("close"),
        children: [c.jsx(ENr, {
          size: 16
        }), x("关闭画布")]
      }), c.jsx("div", {
        role: "separator"
      }), c.jsxs("button", {
        type: "button",
        role: "menuitem",
        onMouseEnter: () => M(null),
        onClick: () => R("pin"),
        children: [r ? c.jsx(k5e, {
          size: 16
        }) : c.jsx(zM, {
          size: 16
        }), x(r ? "取消置顶" : "置顶")]
      }), c.jsxs("button", {
        type: "button",
        role: "menuitem",
        className: "is-danger",
        onMouseEnter: () => M(null),
        onClick: () => R("delete"),
        children: [c.jsx(Qo, {
          size: 16
        }), x("删除")]
      })]
    }), document.body), l && C && E && Da.createPortal(c.jsxs("div", {
      ref: A,
      role: "menu",
      "aria-label": x("移入项目"),
      className: "studio-project-menu studio-folder-menu studio-canvas-submenu",
      style: E,
      children: [c.jsx("button", {
        type: "button",
        role: "menuitem",
        disabled: !a,
        onClick: () => R("move-to", ""),
        children: x("未归档画布")
      }), i.map(B => c.jsx("button", {
        type: "button",
        role: "menuitem",
        disabled: B.id === a,
        onClick: () => R("move-to", B.id),
        children: wp(B.name, m)
      }, B.id)), c.jsx("div", {
        role: "separator"
      }), c.jsx("button", {
        type: "button",
        role: "menuitem",
        onClick: () => R("move-to", "__new-project__"),
        children: x("新建同名项目")
      })]
    }), document.body)]
  });
});

vWn.displayName = "StudioCanvasMenu";

function Dnt({
  canvas: e,
  privacy: t,
  cover: n,
  pinned: r,
  assignedProjectId: a,
  projects: i,
  active: o,
  disabled: s,
  inPinnedSection: l = !1,
  busy: d = !1,
  onAction: u,
  dragGroup: h,
  onPointerDown: p
}) {
  on();
  const m = g.useRef(null),
    f = g.useId(),
    [y, b] = g.useState(null),
    v = wp(e.name, t, "未命名画布"),
    _ = i.find(S => S.id === a),
    w = _ ? wp(_.name, t, "未命名项目") : "未归档画布",
    k = S => {
      var P, R;
      if (document.body.dataset.studioTreeDragging) return;
      const C = S.closest(".studio-tree-canvas"),
        I = C.getBoundingClientRect(),
        E = ((P = C.closest(".studio-sidebar")) == null ? void 0 : P.getBoundingClientRect().right) ?? I.right,
        M = ((R = document.querySelector(".studio-main")) == null ? void 0 : R.getBoundingClientRect().left) ?? E,
        T = Math.max(E, M);
      b({
        left: Math.max(8, T + 10),
        top: Math.max(8, Math.min(I.top, window.innerHeight - 80))
      });
    };
  g.useEffect(() => {
    if (!y) return;
    const S = () => b(null),
      C = I => {
        I.key === "Escape" && S();
      };
    return window.addEventListener("scroll", S, !0), window.addEventListener("resize", S), window.addEventListener("keydown", C), () => {
      window.removeEventListener("scroll", S, !0), window.removeEventListener("resize", S), window.removeEventListener("keydown", C);
    };
  }, [y]);
  const A = S => {
    var C;
    S.preventDefault(), (C = m.current) == null || C.openAt(S.clientX, S.clientY);
  };
  return c.jsxs("div", {
    className: `studio-tree-canvas${r ? " is-pinned" : ""}${o ? " is-active" : ""}${d ? " is-busy" : ""}`,
    "data-tree-drag-id": h ? e.id : void 0,
    "data-tree-drag-group": h,
    onPointerDown: p,
    onContextMenu: A,
    onPointerDownCapture: () => b(null),
    onClick: () => iP(e.id, e.name),
    children: [c.jsxs("button", {
      type: "button",
      className: `studio-project-item${o ? " is-active" : ""}`,
      "aria-describedby": y ? f : void 0,
      onMouseEnter: S => k(S.currentTarget),
      onMouseLeave: () => b(null),
      onFocus: S => k(S.currentTarget),
      onBlur: () => b(null),
      children: [c.jsx(bWn, {
        url: t ? null : n == null ? void 0 : n.url,
        name: v,
        showTitle: !1,
        isVideo: n == null ? void 0 : n.isVideo,
        fallback: t ? "◇" : e.name.slice(0, 1) || "画",
        onForceRetry: t ? void 0 : () => V7t(e.id, e.updatedAt, {
          force: !0
        })
      }), c.jsx("span", {
        className: "studio-project-name",
        children: v
      }), r && !l && c.jsx(zM, {
        size: 11,
        className: "studio-tree-pin-mark",
        "aria-label": x("已置顶")
      }), d ? c.jsx(Ua, {
        size: 14,
        className: "studio-row-busy",
        "aria-label": x("进行中")
      }) : c.jsx("span", {
        className: "studio-project-date",
        children: QU(e.updatedAt)
      })]
    }), c.jsx("button", {
      type: "button",
      className: `studio-tree-pin${r ? " is-on" : ""}`,
      title: x(r ? "取消置顶" : "置顶"),
      "aria-label": x(r ? "取消置顶 {0}" : "置顶 {0}", v),
      disabled: s,
      onClick: S => {
        S.stopPropagation(), u("pin");
      },
      children: r ? c.jsx(k5e, {
        size: 13
      }) : c.jsx(zM, {
        size: 13
      })
    }), c.jsx(vWn, {
      ref: m,
      canvasId: e.id,
      name: v,
      pinned: r,
      assignedProjectId: a,
      projects: i,
      canClose: o,
      disabled: s,
      onAction: u
    }), y && Da.createPortal(c.jsxs("div", {
      id: f,
      role: "tooltip",
      className: "studio-canvas-detail",
      style: y,
      children: [c.jsxs("div", {
        className: "studio-canvas-detail-heading",
        children: [c.jsx("strong", {
          children: v
        }), c.jsx("span", {
          children: QU(e.updatedAt)
        })]
      }), c.jsxs("div", {
        className: "studio-canvas-detail-project",
        children: [c.jsx(Sc, {
          size: 14
        }), c.jsx("span", {
          children: w
        }), c.jsxs("span", {
          children: [e.nodeCount ?? 0, x(" 节点")]
        })]
      })]
    }), document.body)]
  });
}

function cya({
  mode: e,
  onChange: t
}) {
  on();
  const n = g.useRef(null),
    r = g.useRef(null),
    [a, i] = g.useState(null),
    [o, s] = g.useState(!1);
  g.useEffect(() => {
    if (!a) return;
    const d = h => {
        var m, f;
        const p = h.target;
        !((m = r.current) != null && m.contains(p)) && !((f = n.current) != null && f.contains(p)) && i(null);
      },
      u = () => i(null);
    return window.addEventListener("pointerdown", d), window.addEventListener("resize", u), () => {
      window.removeEventListener("pointerdown", d), window.removeEventListener("resize", u);
    };
  }, [a]);
  const l = d => {
    var u;
    t(d), i(null), s(!1), (u = n.current) == null || u.focus({
      preventScroll: !0
    });
  };
  return c.jsxs(c.Fragment, {
    children: [c.jsx("button", {
      ref: n,
      type: "button",
      className: "studio-tree-action studio-tree-action--hover",
      title: x("整理侧边栏"),
      "aria-label": x("整理侧边栏"),
      "aria-haspopup": "menu",
      "aria-expanded": !!a,
      "data-organize-open": a ? "" : void 0,
      onClick: () => {
        if (a) {
          i(null), s(!1);
          return;
        }
        const d = n.current.getBoundingClientRect();
        s(!0), i({
          left: Math.max(8, Math.min(d.left, window.innerWidth - 196)),
          top: Math.max(8, Math.min(d.bottom + 6, window.innerHeight - 80))
        });
      },
      children: c.jsx(hw, {
        size: 16
      })
    }), a && Da.createPortal(c.jsx("div", {
      ref: r,
      role: "menu",
      "aria-label": x("整理侧边栏"),
      className: "studio-project-menu studio-organize-menu",
      style: a,
      onKeyDown: d => {
        var u;
        d.key === "Escape" && (d.preventDefault(), i(null), (u = n.current) == null || u.focus({
          preventScroll: !0
        }));
      },
      children: c.jsxs("div", {
        className: `studio-organize-row${o ? " is-open" : ""}`,
        onMouseEnter: () => s(!0),
        children: [c.jsx("span", {
          children: x("整理侧边栏")
        }), c.jsx(ss, {
          size: 14
        }), o && c.jsxs("div", {
          className: "studio-organize-sub",
          role: "menu",
          "aria-label": x("整理方式"),
          children: [c.jsxs("button", {
            type: "button",
            role: "menuitemradio",
            "aria-checked": e === "project",
            onClick: () => l("project"),
            children: [c.jsx("span", {
              className: `studio-organize-radio${e === "project" ? " is-on" : ""}`
            }), x("按项目")]
          }), c.jsxs("button", {
            type: "button",
            role: "menuitemradio",
            "aria-checked": e === "list",
            onClick: () => l("list"),
            children: [c.jsx("span", {
              className: `studio-organize-radio${e === "list" ? " is-on" : ""}`
            }), x("按列表")]
          })]
        })]
      })
    }), document.body)]
  });
}

function dya(e, t, n) {
  const r = e.closest(".studio-project-list, .studio-pinned-items");
  let a = !1,
    i = !1,
    o = t.clientX,
    s = t.clientY,
    l = 0,
    d = null,
    u = null;
  const h = document.body.style.cursor,
    p = e.style.transform,
    m = r.scrollTop,
    f = () => {
      d == null || d.classList.remove("is-drop-before", "is-drop-after", "is-drop-inside"), d = null, u = null;
    },
    y = () => {
      var F, N;
      f();
      const P = document.elementFromPoint(o, s);
      if ((F = e.dataset.treeDragGroup) != null && F.startsWith("canvas:")) {
        const G = P == null ? void 0 : P.closest("[data-canvas-drop-project]"),
          z = G == null ? void 0 : G.dataset.canvasDropProject;
        if (G && z !== void 0 && r.contains(G) && e.dataset.treeDragGroup !== `canvas:${z}`) {
          d = G, u = {
            id: z,
            placement: "inside"
          }, G.classList.add("is-drop-inside");
          return;
        }
      }
      const R = (N = e.dataset.treeDragGroup) != null && N.startsWith("project") ? "[data-project-id]" : "[data-tree-drag-id]",
        j = P == null ? void 0 : P.closest(R);
      if (!j || j === e || !r.contains(j) || j.dataset.treeDragGroup !== e.dataset.treeDragGroup) return;
      d = j;
      const B = j.getBoundingClientRect();
      u = {
        id: j.dataset.treeDragId,
        placement: s < B.top + B.height / 2 ? "before" : "after"
      }, j.classList.add(`is-drop-${u.placement}`);
    },
    b = () => {
      const P = r.getBoundingClientRect();
      if (o >= P.left && o <= P.right && s >= P.top && s <= P.bottom) {
        const R = s < P.top + 28 ? -6 : s > P.bottom - 28 ? 6 : 0;
        R && (r.scrollTop += R, y());
      }
      e.style.transform = `translateY(${s - t.clientY + r.scrollTop - m}px)`, l = requestAnimationFrame(b);
    },
    v = () => {
      window.removeEventListener("click", w, {
        capture: !0
      }), window.removeEventListener("pointerdown", v, {
        capture: !0
      }), window.removeEventListener("pointerup", _);
    },
    _ = P => {
      (!P || P.pointerId === t.pointerId) && window.setTimeout(v, 0);
    },
    w = P => {
      P.preventDefault(), P.stopImmediatePropagation(), v();
    },
    k = P => P.preventDefault(),
    A = () => {
      if (!(a || i)) {
        window.clearTimeout(S), a = !0;
        try {
          e.setPointerCapture(t.pointerId);
        } catch {}
        e.classList.add("is-dragging"), document.body.dataset.studioTreeDragging = "true", document.body.style.cursor = "grabbing", window.addEventListener("click", w, {
          capture: !0
        }), window.addEventListener("pointerdown", v, {
          capture: !0
        }), window.addEventListener("pointerup", _), l = requestAnimationFrame(b);
      }
    },
    S = window.setTimeout(A, 420),
    C = (P = !1) => {
      var j;
      if (i) return;
      i = !0, window.clearTimeout(S), cancelAnimationFrame(l);
      const R = u;
      f(), e.classList.remove("is-dragging"), e.style.transform = p, (j = e.hasPointerCapture) != null && j.call(e, t.pointerId) && e.releasePointerCapture(t.pointerId), a && (delete document.body.dataset.studioTreeDragging, document.body.style.cursor = h, P && _()), window.removeEventListener("pointermove", I, {
        capture: !0
      }), window.removeEventListener("pointerup", E, {
        capture: !0
      }), window.removeEventListener("pointercancel", M, {
        capture: !0
      }), window.removeEventListener("blur", M), window.removeEventListener("keydown", T), e.removeEventListener("dragstart", k), P && a && R && n(R);
    },
    I = P => {
      if (P.pointerId === t.pointerId) {
        if (o = P.clientX, s = P.clientY, !a) {
          if (Math.hypot(o - t.clientX, s - t.clientY) <= 8) return;
          if (t.pointerType === "touch") {
            C();
            return;
          }
          A();
        }
        P.preventDefault(), y();
      }
    },
    E = P => {
      P.pointerId === t.pointerId && (a && (o = P.clientX, s = P.clientY, y()), C(!0));
    },
    M = P => {
      P.type === "pointercancel" && P.pointerId !== t.pointerId || C();
    },
    T = P => {
      P.key === "Escape" && (P.preventDefault(), C());
    };
  return e.addEventListener("dragstart", k), window.addEventListener("pointermove", I, {
    capture: !0,
    passive: !1
  }), window.addEventListener("pointerup", E, {
    capture: !0
  }), window.addEventListener("pointercancel", M, {
    capture: !0
  }), window.addEventListener("blur", M), window.addEventListener("keydown", T), () => {
    C(), v();
  };
}

const VTe = "__unassigned__";

function uya({
  canvases: e,
  onChanged: t,
  pinnedHost: n
}) {
  var Te, Ne;
  on();
  const r = PT(),
    {
      activeCanvasId: a
    } = M3(),
    i = x9t(),
    [o, s] = g.useState([]),
    [l, d] = g.useState([]),
    [u, h] = g.useState([]),
    [p, m] = g.useState(!1),
    [f, y] = g.useState(""),
    [b, v] = g.useState(!1),
    _ = g.useRef(!1),
    w = g.useRef(0),
    k = g.useRef(0),
    A = g.useRef(Promise.resolve()),
    [S, C] = g.useState(() => {
      try {
        return localStorage.getItem("studio-unassigned-collapsed") === "1";
      } catch {
        return !1;
      }
    }),
    [I, E] = g.useState(() => {
      try {
        return localStorage.getItem("studio-pinned-collapsed") === "1";
      } catch {
        return !1;
      }
    }),
    [M, T] = g.useState(!1),
    [P, R] = g.useState(() => {
      try {
        return localStorage.getItem("studio-project-organize") === "list" ? "list" : "project";
      } catch {
        return "project";
      }
    }),
    j = g.useRef(null),
    [B, F] = g.useState([]),
    [N, G] = g.useState(null),
    [z, V] = g.useState(""),
    [O, L] = g.useState(""),
    D = g.useMemo(() => new Set(o.flatMap(me => me.canvasIds)), [o]),
    U = g.useMemo(() => new Set(l), [l]),
    H = g.useMemo(() => Rla(e, l), [e, l]),
    Y = g.useMemo(() => {
      const me = [];
      if (I || me.push(...H), M) return me;
      if (P === "list") return me.push(...e.filter(Fe => !U.has(Fe.id))), me;
      const Ae = (Fe, Me) => {
        const Re = lNe(Me.filter($e => !U.has($e.id)), u);
        me.push(...(B.includes(Fe) ? Re : Re.slice(0, 5)));
      };
      for (const Fe of o) Fe.collapsed || Ae(Fe.id, e.filter(Me => Fe.canvasIds.includes(Me.id)));
      return S || Ae("", e.filter(Fe => !D.has(Fe.id))), me;
    }, [D, e, u, M, B, P, H, I, U, o, S]),
    K = IYe(Y),
    W = g.useRef(null),
    Q = g.useRef(null),
    q = async (me = !1) => {
      if (_.current || k.current) return;
      const Ae = ++w.current;
      me && m(!1);
      try {
        const Fe = await DNt();
        if (Ae !== w.current) return;
        s(Fe.projects), d(Fe.pinnedCanvasIds), h(Fe.canvasOrder || []), m(!0), y("");
      } catch (Fe) {
        if (Ae !== w.current) return;
        m(!1), y(Fe instanceof Error ? Fe.message : "项目目录读取失败");
      }
    };
  g.useEffect(() => {
    const me = () => void q(),
      Ae = () => void q(!0);
    return me(), window.addEventListener(Tf, Ae), window.addEventListener(t_e, me), window.addEventListener("focus", me), () => {
      w.current += 1, window.removeEventListener(Tf, Ae), window.removeEventListener(t_e, me), window.removeEventListener("focus", me);
    };
  }, []), g.useEffect(() => {
    var Ae;
    if (!N) return;
    const me = W.current;
    return me == null || me.showModal(), (Ae = me == null ? void 0 : me.querySelector("input")) == null || Ae.select(), () => {
      var Fe;
      me == null || me.close(), (Fe = Q.current) == null || Fe.focus({
        preventScroll: !0
      });
    };
  }, [N]);
  const ne = me => {
      var Ae, Fe;
      Q.current = document.activeElement, V(me.kind === "rename" ? me.id === VTe ? x0e(o.map(Me => Me.name), "未归档画布") : o.find(Me => Me.id === me.id).name : me.kind === "rename-canvas" && ((Ae = e.find(Me => Me.id === me.id)) == null ? void 0 : Ae.name) || ""), L(((Fe = o.find(Me => Me.canvasIds.includes(me.id))) == null ? void 0 : Fe.id) || ""), y(""), G(me);
    },
    de = (me, Ae = l, Fe = u) => {
      w.current += 1, k.current += 1;
      const Me = A.current.then(() => X$n(me, Ae, Fe));
      return A.current = Me.catch(() => {}).finally(() => {
        k.current -= 1;
      }), Me;
    },
    le = async (me, Ae = l, Fe = u) => {
      await de(me, Ae, Fe), s(me), d(Ae), h(Fe);
    },
    J = me => {
      R(me);
      try {
        localStorage.setItem("studio-project-organize", me);
      } catch {}
    },
    pe = me => {
      const Ae = o.map(Fe => Fe.id === me ? {
        ...Fe,
        collapsed: !Fe.collapsed
      } : Fe);
      s(Ae), y(""), de(Ae).catch(() => y("展开状态未能保存，下次启动可能恢复原状"));
    },
    ce = () => {
      const me = !I;
      E(me);
      try {
        localStorage.setItem("studio-pinned-collapsed", me ? "1" : "0");
      } catch {}
    },
    we = () => {
      const me = !S;
      C(me);
      try {
        localStorage.setItem("studio-unassigned-collapsed", me ? "1" : "0");
      } catch {}
    },
    X = async me => {
      if (!_.current) {
        _.current = !0, v(!0), y("");
        try {
          await me();
        } catch (Ae) {
          y(Ae instanceof Error ? Ae.message : "操作失败，请重试");
        } finally {
          _.current = !1, v(!1);
        }
      }
    },
    Z = async (me, Ae) => {
      try {
        await le(FTe(o, me, Ae).map(Fe => Fe.id === Ae ? {
          ...Fe,
          collapsed: !1
        } : Fe));
      } catch {
        throw t(), L(Ae), G({
          kind: "move",
          id: me
        }), new Error("画布已保存到“未归档画布”，项目归属保存失败，请重试移动");
      }
      t();
    },
    re = () => X(async () => {
      const me = await cNe(mre);
      try {
        await le(Q$n(o, me).projects);
      } catch {
        throw t(), new Error("画布已保存到“未归档画布”，项目归属保存失败，请重试移动");
      }
      T(!1), t(), iP(me, mre);
    }),
    fe = me => X(async () => {
      const Ae = o.find(Re => Re.id === me);
      if (!Ae) return;
      const Fe = x0e(e.filter(Re => Ae.canvasIds.includes(Re.id)).map(Re => Re.name), mre),
        Me = await cNe(Fe);
      await Z(Me, me), iP(Me, Fe);
    }),
    ye = () => e.filter(me => !D.has(me.id) && !U.has(me.id)).map(me => me.id),
    ie = () => X(async () => {
      const me = x0e(e.filter(Fe => ye().includes(Fe.id)).map(Fe => Fe.name), mre),
        Ae = await cNe(me);
      C(!1);
      try {
        localStorage.setItem("studio-unassigned-collapsed", "0");
      } catch {}
      t(), iP(Ae, me);
    }),
    ae = () => X(async () => {
      var me;
      if (!(!N || !["move", "remove", "release", "delete-canvas"].includes(N.kind) && !z.trim())) {
        if (N.kind === "remove" || N.kind === "release") {
          await le(N.kind === "remove" ? o.filter(Ae => Ae.id !== N.id) : o.map(Ae => Ae.id === N.id ? {
            ...Ae,
            canvasIds: []
          } : Ae)), C(!1);
          try {
            localStorage.setItem("studio-unassigned-collapsed", "0");
          } catch {}
        } else if (N.kind === "rename") await le(N.id === VTe ? HYt(o, ye(), z.trim()) : o.map(Ae => Ae.id === N.id ? {
          ...Ae,
          name: z.trim()
        } : Ae));else if (N.kind === "rename-canvas") await fWn(N.id, z), t();else if (N.kind === "delete-canvas") await gWn(N.id), await le(o.map(Ae => ({
          ...Ae,
          canvasIds: Ae.canvasIds.filter(Fe => Fe !== N.id)
        })), l.filter(Ae => Ae !== N.id)), t();else if (N.kind === "move") {
          const Ae = O === "__new-project__" ? crypto.randomUUID() : O,
            Fe = O === "__new-project__" ? [...o, {
              id: Ae,
              name: ((me = e.find(Me => Me.id === N.id)) == null ? void 0 : me.name) || "未命名项目",
              canvasIds: [],
              collapsed: !1
            }] : o;
          await le(FTe(Fe, N.id, Ae).map(Me => Me.id === Ae ? {
            ...Me,
            collapsed: !1
          } : Me));
        }
        G(null);
      }
    });
  g.useEffect(() => () => {
    var me;
    return (me = j.current) == null ? void 0 : me.call(j);
  }, []);
  const be = (me, Ae, Fe) => {
      var Re;
      if (Fe.button !== 0 || Fe.pointerType === "touch" && !Fe.isPrimary || b || !p || Fe.target.closest(".studio-tree-action, .studio-tree-pin, .studio-folder-menu, .studio-canvas-menu-trigger")) return;
      (Re = j.current) == null || Re.call(j);
      const Me = Fe.currentTarget.closest("[data-tree-drag-id]");
      j.current = dya(Me, {
        clientX: Fe.clientX,
        clientY: Fe.clientY,
        pointerId: Fe.pointerId,
        pointerType: Fe.pointerType
      }, $e => {
        if ($e.placement === "inside") {
          if (Ae !== "canvas") return;
          X(async () => {
            if (await le(FTe(o, me, $e.id).map(rt => rt.id === $e.id ? {
              ...rt,
              collapsed: !1
            } : rt)), F(rt => rt.includes($e.id) ? rt : [...rt, $e.id]), !$e.id) {
              C(!1);
              try {
                localStorage.setItem("studio-unassigned-collapsed", "0");
              } catch {}
            }
          });
          return;
        }
        if (Ae === "project") {
          const rt = Mla(o, me, $e.id, $e.placement);
          rt !== o && X(() => le(rt));
        } else X(Ae === "pinned" ? () => le(o, VYt(H, l, me, $e.id, $e.placement)) : () => le(o, l, VYt(e, u, me, $e.id, $e.placement)));
      });
    },
    Ee = (me, Ae, Fe) => {
      if (Ae === "pin") {
        const Me = Pla(l, me.id);
        if (Me.includes(me.id)) {
          E(!1);
          try {
            localStorage.setItem("studio-pinned-collapsed", "0");
          } catch {}
        }
        X(() => le(o, Me));
      } else Ae === "rename" ? ne({
        kind: "rename-canvas",
        id: me.id
      }) : Ae === "move" ? ne({
        kind: "move",
        id: me.id
      }) : Ae === "move-to" ? X(async () => {
        const Me = Fe === "__new-project__" ? crypto.randomUUID() : Fe || "",
          Re = Fe === "__new-project__" ? [...o, {
            id: Me,
            name: me.name || "未命名项目",
            canvasIds: [],
            collapsed: !1
          }] : o;
        if (await le(FTe(Re, me.id, Me).map($e => $e.id === Me ? {
          ...$e,
          collapsed: !1
        } : $e)), !Me) {
          C(!1);
          try {
            localStorage.setItem("studio-unassigned-collapsed", "0");
          } catch {}
        }
      }) : Ae === "copy-path" ? X(async () => {
        await nya(me.id);
      }) : Ae === "reveal" ? X(() => rya(me.id)) : Ae === "close" ? X(() => aya(me.id)) : ne({
        kind: "delete-canvas",
        id: me.id
      });
    },
    xe = (me, Ae) => {
      const Fe = B.includes(me),
        Me = lNe(Ae.filter(Re => !U.has(Re.id)), u);
      return c.jsxs("div", {
        className: "studio-tree-children",
        children: [(Fe ? Me : Me.slice(0, 5)).map(Re => c.jsx(Dnt, {
          canvas: Re,
          privacy: r,
          cover: K[Re.id],
          pinned: !1,
          dragGroup: `canvas:${me}`,
          onPointerDown: $e => be(Re.id, "canvas", $e),
          assignedProjectId: me,
          projects: o,
          active: a === Re.id,
          disabled: b || !p,
          busy: i.canvas.has(Re.id),
          onAction: ($e, rt) => Ee(Re, $e, rt)
        }, Re.id)), Me.length > 5 && c.jsx("button", {
          type: "button",
          className: "studio-tree-more",
          onClick: () => F(Fe ? B.filter(Re => Re !== me) : [...B, me]),
          children: Fe ? x("收起显示") : x("展开显示（{0}）", Me.length - 5)
        }), Me.length === 0 && Ae.length === 0 && c.jsx("div", {
          className: "studio-tree-empty",
          children: x("暂无画布，在项目菜单中新建")
        })]
      });
    },
    he = D,
    ue = e.filter(me => !he.has(me.id) && !U.has(me.id)),
    ge = [...o].sort((me, Ae) => +!!Ae.pinned - +!!me.pinned),
    _e = lNe(e.filter(me => !U.has(me.id)), u),
    ke = (N == null ? void 0 : N.kind) === "remove" ? "移除项目" : (N == null ? void 0 : N.kind) === "release" ? "移出全部画布" : (N == null ? void 0 : N.kind) === "rename" ? "重命名项目" : (N == null ? void 0 : N.kind) === "rename-canvas" ? "重命名画布" : (N == null ? void 0 : N.kind) === "delete-canvas" ? "删除画布" : "移动画布",
    ve = H.length > 0 ? c.jsxs("div", {
      className: "studio-pinned-list",
      children: [c.jsx("div", {
        className: "studio-tree-heading",
        children: c.jsxs("button", {
          type: "button",
          "aria-expanded": !I,
          onClick: ce,
          children: [x("置顶 "), I ? c.jsx(ss, {
            size: 14
          }) : c.jsx(Mi, {
            size: 14
          })]
        })
      }), !I && c.jsx("div", {
        className: "studio-pinned-items",
        children: H.map(me => {
          var Ae;
          return c.jsx(Dnt, {
            canvas: me,
            privacy: r,
            cover: K[me.id],
            pinned: !0,
            inPinnedSection: !0,
            dragGroup: "pinned",
            onPointerDown: Fe => be(me.id, "pinned", Fe),
            assignedProjectId: ((Ae = o.find(Fe => Fe.canvasIds.includes(me.id))) == null ? void 0 : Ae.id) || "",
            projects: o,
            active: a === me.id,
            disabled: b || !p,
            busy: i.canvas.has(me.id),
            onAction: (Fe, Me) => Ee(me, Fe, Me)
          }, me.id);
        })
      })]
    }) : null;
  return c.jsxs(c.Fragment, {
    children: [n && ve ? Da.createPortal(ve, n) : null, c.jsxs("div", {
      className: "studio-section studio-project-tree",
      children: [c.jsxs("div", {
        className: "studio-tree-heading",
        children: [c.jsxs("button", {
          type: "button",
          "aria-expanded": !M,
          onClick: () => T(!M),
          children: [x("项目 "), M ? c.jsx(ss, {
            size: 14
          }) : c.jsx(Mi, {
            size: 14
          })]
        }), c.jsx(cya, {
          mode: P,
          onChange: J
        }), c.jsx("button", {
          type: "button",
          className: "studio-tree-action studio-tree-action--hover",
          "aria-label": x("新建项目分组"),
          title: x("新建项目"),
          disabled: !p || b,
          onClick: () => void re(),
          children: c.jsx(eo, {
            size: 17
          })
        })]
      }), !N && f && c.jsxs("div", {
        className: "studio-tree-error",
        role: "alert",
        children: [f, !p && c.jsx("button", {
          type: "button",
          onClick: () => void q(),
          children: x("重试")
        })]
      }), !M && c.jsxs("div", {
        className: "studio-project-list",
        onScroll: me => me.currentTarget.toggleAttribute("data-scrolled", me.currentTarget.scrollTop > 0),
        children: [!p && !f && c.jsx("div", {
          className: "studio-tree-empty",
          children: x("正在读取项目…")
        }), P === "list" ? _e.map(me => {
          var Ae;
          return c.jsx(Dnt, {
            dragGroup: "list",
            onPointerDown: Fe => be(me.id, "canvas", Fe),
            canvas: me,
            privacy: r,
            cover: K[me.id],
            pinned: !1,
            assignedProjectId: ((Ae = o.find(Fe => Fe.canvasIds.includes(me.id))) == null ? void 0 : Ae.id) || "",
            projects: o,
            active: a === me.id,
            disabled: b || !p,
            busy: i.canvas.has(me.id),
            onAction: (Fe, Me) => Ee(me, Fe, Me)
          }, me.id);
        }) : ge.map(me => {
          const Ae = new Set(me.canvasIds),
            Fe = !!a && Ae.has(a);
          return c.jsxs("div", {
            className: "studio-tree-project",
            "data-project-id": me.id,
            "data-canvas-drop-project": me.id,
            "data-tree-drag-id": me.id,
            "data-tree-drag-group": me.pinned ? "project:pinned" : "project",
            children: [c.jsxs("div", {
              className: `studio-tree-folder${Fe ? " is-active" : ""}`,
              onPointerDown: Me => be(me.id, "project", Me),
              children: [c.jsxs("button", {
                type: "button",
                className: "studio-tree-folder-title",
                "aria-expanded": !me.collapsed,
                disabled: b || !p,
                onClick: () => pe(me.id),
                title: x("{0}，长按可上下拖动", wp(me.name, r)),
                children: [me.collapsed ? c.jsx(_h, {
                  size: 17
                }) : c.jsx(Sc, {
                  size: 17
                }), c.jsx("span", {
                  children: wp(me.name, r)
                }), me.pinned && c.jsx(zM, {
                  size: 12,
                  "aria-label": x("已置顶")
                }), me.collapsed ? c.jsx(ss, {
                  size: 12
                }) : c.jsx(Mi, {
                  size: 12
                })]
              }), c.jsx(gJt, {
                project: me,
                disabled: b || !p,
                onAction: Me => {
                  Me === "pin" ? X(() => le(o.map(Re => Re.id === me.id ? {
                    ...Re,
                    pinned: !Re.pinned
                  } : Re))) : Me === "fold" ? pe(me.id) : Me === "canvas" ? fe(me.id) : ne({
                    kind: Me,
                    id: me.id
                  });
                }
              }), c.jsx("button", {
                type: "button",
                className: "studio-tree-action",
                "aria-label": x("重命名项目 {0}", wp(me.name, r)),
                title: x("重命名项目"),
                disabled: b || !p,
                onClick: () => ne({
                  kind: "rename",
                  id: me.id
                }),
                children: c.jsx(NLe, {
                  size: 16
                })
              })]
            }), !me.collapsed && xe(me.id, e.filter(Me => Ae.has(Me.id)))]
          }, me.id);
        }), P === "project" && ue.length > 0 && c.jsxs("div", {
          className: "studio-tree-project",
          "data-canvas-drop-project": "",
          children: [c.jsxs("div", {
            className: `studio-tree-folder${a && ue.some(me => me.id === a) ? " is-active" : ""}`,
            children: [c.jsxs("button", {
              type: "button",
              className: "studio-tree-folder-title",
              "aria-expanded": !S,
              onClick: we,
              children: [S ? c.jsx(_h, {
                size: 17
              }) : c.jsx(Sc, {
                size: 17
              }), c.jsx("span", {
                children: x("未归档画布")
              }), S ? c.jsx(ss, {
                size: 12
              }) : c.jsx(Mi, {
                size: 12
              })]
            }), c.jsx(gJt, {
              inbox: !0,
              project: {
                id: VTe,
                name: "未归档画布",
                canvasIds: ue.map(me => me.id),
                collapsed: S
              },
              disabled: b || !p,
              onAction: me => {
                me === "pin" ? X(() => le(HYt(o, ye(), x0e(o.map(Ae => Ae.name), "未归档画布"), !0))) : me === "fold" ? we() : me === "canvas" && ie();
              }
            }), c.jsx("button", {
              type: "button",
              className: "studio-tree-action",
              "aria-label": x("重命名未归档画布"),
              title: x("重命名项目"),
              disabled: b || !p,
              onClick: () => ne({
                kind: "rename",
                id: VTe
              }),
              children: c.jsx(NLe, {
                size: 16
              })
            })]
          }), !S && xe("", ue)]
        }), p && o.length === 0 && ue.length === 0 && H.length === 0 && c.jsx("div", {
          className: "studio-tree-empty",
          children: x("点击 ＋ 创建项目和画布")
        })]
      }), N && Da.createPortal(c.jsx("dialog", {
        ref: W,
        className: "studio-project-dialog",
        "aria-labelledby": "studio-tree-dialog-title",
        onCancel: me => {
          me.preventDefault(), b || G(null);
        },
        children: c.jsxs("form", {
          onSubmit: me => {
            me.preventDefault(), ae();
          },
          children: [c.jsx("h2", {
            id: "studio-tree-dialog-title",
            children: x(ke)
          }), N.kind === "delete-canvas" ? c.jsxs("p", {
            children: [x("确定删除「"), wp((Te = e.find(me => me.id === N.id)) == null ? void 0 : Te.name, r, "未命名画布"), x("」？本地画布及其素材将被删除，无法撤销。云端副本不受影响。")]
          }) : N.kind === "remove" || N.kind === "release" ? c.jsxs("p", {
            children: [N.kind === "remove" ? x("移除") : x("移出"), "「", wp((Ne = o.find(me => me.id === N.id)) == null ? void 0 : Ne.name, r), "」", N.kind === "remove" ? x("项目分组") : x("中的全部画布"), x("？画布和素材不会被删除，仍可在“未归档画布”中打开。")]
          }) : N.kind === "move" ? c.jsxs("label", {
            children: [x("所属项目"), c.jsxs("select", {
              autoFocus: !0,
              value: O,
              onChange: me => L(me.target.value),
              disabled: b,
              children: [c.jsx("option", {
                value: "",
                children: x("未归档画布")
              }), c.jsx("option", {
                value: "__new-project__",
                children: x("新建同名项目")
              }), o.map(me => c.jsx("option", {
                value: me.id,
                children: wp(me.name, r)
              }, me.id))]
            })]
          }) : c.jsxs("label", {
            children: [N.kind === "rename-canvas" ? x("画布名称") : x("项目名称"), c.jsx("input", {
              type: r ? "password" : "text",
              autoFocus: !0,
              value: z,
              disabled: b,
              onChange: me => V(me.target.value)
            })]
          }), N.kind === "move" && O === "__new-project__" && c.jsx("p", {
            children: x("以这张历史画布的名称创建项目，保留原画布内容，并可继续添加其他画布。")
          }), f && c.jsx("p", {
            className: "studio-project-error",
            role: "alert",
            children: f
          }), c.jsxs("div", {
            className: "studio-project-dialog-actions",
            children: [c.jsx("button", {
              type: "button",
              disabled: b,
              onClick: () => G(null),
              children: x("取消")
            }), c.jsx("button", {
              type: "submit",
              className: N.kind === "delete-canvas" || N.kind === "remove" ? "is-danger" : "is-primary",
              disabled: b || !["move", "remove", "release", "delete-canvas"].includes(N.kind) && !z.trim(),
              children: b ? x("处理中…") : N.kind === "remove" ? x("移除项目") : N.kind === "release" ? x("移出画布") : N.kind === "delete-canvas" ? x("删除") : x("保存")
            })]
          })]
        })
      }), document.body)]
    })]
  });
}

const RFe = g.forwardRef(function ({
  label: t,
  items: n,
  onChoose: r,
  className: a = "",
  icon: i = c.jsx(hw, {
    size: 16
  })
}, o) {
  on();
  const s = g.useRef(null),
    l = g.useRef(null),
    [d, u] = g.useState(null),
    h = (m, f) => u({
      left: Math.max(8, Math.min(m, window.innerWidth - 228)),
      top: Math.max(8, Math.min(f, window.innerHeight - Math.min(480, n.length * 36 + 12)))
    });
  g.useImperativeHandle(o, () => ({
    openAt: h
  })), g.useEffect(() => {
    var y, b;
    if (!d) return;
    (b = (y = l.current) == null ? void 0 : y.querySelector("button:not(:disabled)")) == null || b.focus();
    const m = v => {
        var _, w;
        !((_ = l.current) != null && _.contains(v.target)) && !((w = s.current) != null && w.contains(v.target)) && u(null);
      },
      f = () => u(null);
    return window.addEventListener("pointerdown", m), window.addEventListener("resize", f), () => {
      window.removeEventListener("pointerdown", m), window.removeEventListener("resize", f);
    };
  }, [d]);
  const p = () => {
    var m;
    u(null), (m = s.current) == null || m.focus({
      preventScroll: !0
    });
  };
  return c.jsxs(c.Fragment, {
    children: [c.jsx("button", {
      ref: s,
      type: "button",
      className: `studio-tree-action ${a}`,
      title: t,
      "aria-label": t,
      "aria-haspopup": "menu",
      "aria-expanded": !!d,
      "data-canvas-menu-open": d ? "" : void 0,
      onClick: () => {
        if (d) p();else {
          const m = s.current.getBoundingClientRect();
          h(m.left, m.bottom + 6);
        }
      },
      children: i
    }), d && Da.createPortal(c.jsx("div", {
      ref: l,
      role: "menu",
      "aria-label": t,
      className: "studio-project-menu studio-folder-menu studio-conversation-menu",
      style: d,
      onKeyDown: m => {
        var f;
        if (m.key === "Escape" || m.key === "Tab") m.key === "Escape" && m.preventDefault(), p();else if (["ArrowDown", "ArrowUp", "Home", "End"].includes(m.key)) {
          m.preventDefault();
          const y = Array.from(l.current.querySelectorAll("button:not(:disabled)")),
            b = y.indexOf(document.activeElement);
          (f = y[m.key === "Home" ? 0 : m.key === "End" ? y.length - 1 : (b + (m.key === "ArrowDown" ? 1 : -1) + y.length) % y.length]) == null || f.focus();
        }
      },
      children: n.map(m => m.heading ? c.jsx("div", {
        className: "studio-conversation-menu-heading",
        children: x(m.label)
      }, m.id) : c.jsxs("button", {
        type: "button",
        role: m.checked === void 0 ? "menuitem" : "menuitemradio",
        "aria-checked": m.checked,
        disabled: m.disabled,
        onClick: () => {
          p(), r(m.id);
        },
        children: [m.checked === void 0 ? m.icon : c.jsx("span", {
          className: `studio-organize-radio${m.checked ? " is-on" : ""}`
        }), x(m.label)]
      }, m.id))
    }), document.body)]
  });
});

function hya({
  thread: e,
  active: t,
  plain: n = !1,
  onOpen: r,
  onAction: a,
  busy: i = !1,
  now: o,
  drag: s
}) {
  on();
  const l = g.useRef(null),
    d = !!e.pinned,
    u = m => {
      var f;
      m.preventDefault(), (f = l.current) == null || f.openAt(m.clientX, m.clientY);
    },
    h = c.jsxs("button", {
      type: "button",
      className: `studio-tree-pin${d ? " is-on" : ""}`,
      title: x(d ? "取消置顶" : "置顶"),
      "aria-label": x(d ? "取消置顶 {0}" : "置顶 {0}", e.title),
      onClick: () => a("pin"),
      children: [d ? c.jsx(k5e, {
        size: 13
      }) : c.jsx(zM, {
        size: 13
      }), c.jsx("span", {
        className: "studio-tree-pin-label",
        children: x(d ? "取消置顶" : "置顶")
      })]
    }),
    p = c.jsx(RFe, {
      ref: l,
      label: x("对话操作 {0}", e.title),
      items: [{
        id: "save-library",
        label: "保存到项目库"
      }, {
        id: "rename",
        label: "重命名"
      }, {
        id: "pin",
        label: d ? "取消置顶" : "置顶",
        icon: c.jsx(zM, {
          size: 16
        }),
        disabled: !!e.archived
      }, ...(e.archived ? [{
        id: "archive",
        label: "恢复对话",
        icon: c.jsx(hWt, {
          size: 16
        })
      }] : []), ...(e.rootPath ? [{
        id: "copy-path",
        label: "复制路径"
      }, {
        id: "reveal",
        label: "在资源管理器中打开"
      }] : []), {
        id: "delete",
        label: "删除对话"
      }],
      onChoose: m => a(m)
    });
  return c.jsxs("div", {
    ...s,
    className: `studio-tree-canvas${n ? " is-plain" : ""}${d ? " is-pinned" : ""}${t && !e.archived ? " is-active" : ""}${i ? " is-busy" : ""}${e.archived ? " is-archived" : ""}`,
    onContextMenu: u,
    children: [c.jsxs("button", {
      type: "button",
      className: `studio-project-item${t ? " is-active" : ""}`,
      title: e.rootPath ? `${e.title}
${e.rootPath}` : e.title,
      onClick: r,
      disabled: !!e.archived,
      children: [n ? null : c.jsx("span", {
        className: "studio-nav-ic",
        children: c.jsx(qv, {
          size: 15,
          strokeWidth: 1.75
        })
      }), c.jsx("span", {
        className: "studio-project-name",
        children: e.title
      }), d && c.jsx(zM, {
        size: 11,
        className: "studio-tree-pin-mark",
        "aria-label": x("已置顶")
      }), i ? c.jsx(Ua, {
        size: 14,
        className: "studio-row-busy",
        "aria-label": x("进行中")
      }) : c.jsx("span", {
        className: "studio-project-date",
        children: e.archived ? x("已归档") : QU(e.updatedAt, o)
      })]
    }), e.archived ? c.jsx("button", {
      type: "button",
      className: "studio-tree-action studio-conversation-restore",
      title: x("恢复对话"),
      "aria-label": x("恢复对话 {0}", e.title),
      onClick: () => a("archive"),
      children: c.jsx(hWt, {
        size: 14
      })
    }) : h, p]
  });
}

function pya() {
  on();
  const e = nNt(),
    t = x9t(),
    n = oea(),
    {
      homeLanding: r
    } = M3(),
    a = UUn(),
    i = o$n(),
    o = jUn(),
    s = wHn(),
    [l, d] = g.useState(""),
    [u, h] = g.useState(!1),
    p = g.useRef(null),
    [m, f] = g.useState(Date.now),
    y = g.useRef(null),
    [b, v] = g.useState(!1),
    _ = g.useRef(null),
    [w, k] = g.useState(() => {
      try {
        return localStorage.getItem("studio-conversations-collapsed") === "1";
      } catch {
        return !1;
      }
    }),
    A = () => {
      const re = !w;
      k(re);
      try {
        localStorage.setItem("studio-conversations-collapsed", re ? "1" : "0");
      } catch {}
    },
    [S, C] = g.useState(null),
    [I, E] = g.useState(""),
    [M, T] = g.useState(!1),
    [P, R] = g.useState([]),
    [j, B] = g.useState(!1),
    [F, N] = g.useState(!1),
    [G, z] = g.useState(""),
    V = !!(S != null && S.kind.startsWith("workspace-")),
    O = S && !V ? e.find(re => re.id === S.id) : void 0,
    L = i.workspaces,
    D = _Hn(xHn(e, L), L, s, l, "home"),
    U = re => y_e(re, s.workspaceNames);
  g.useEffect(() => {
    const re = window.setInterval(() => f(Date.now()), 6e4);
    return () => window.clearInterval(re);
  }, []), g.useEffect(() => {
    var re;
    u && ((re = p.current) == null || re.focus());
  }, [u]), g.useEffect(() => {
    d(""), h(!1);
  }, [a]), g.useEffect(() => {
    (D.workspaceOrder.join("\0") !== s.workspaceOrder.join("\0") || D.threadOrder.join("\0") !== s.threadOrder.join("\0")) && cL({
      workspaceOrder: D.workspaceOrder,
      threadOrder: D.threadOrder
    });
  }, [e, L.join("\0"), s.workspaceOrder, s.threadOrder]), g.useEffect(() => {
    var fe;
    if (!S) return;
    const re = _.current;
    return re == null || re.showModal(), (S.kind === "rename" || S.kind === "workspace-rename") && ((fe = re == null ? void 0 : re.querySelector("input")) == null || fe.select()), () => {
      re == null || re.close();
    };
  }, [S]), g.useEffect(() => {
    let re = !0;
    T(!1), R([]), z("");
    const fe = (S == null ? void 0 : S.kind) === "delete" ? e.find(ie => ie.id === S.id) : void 0,
      ye = (fe == null ? void 0 : fe.kind) === "local-skill" && fe.rootPath;
    return B(!!ye), ye && pNt(fe.rootPath, fe.id).then(ie => {
      re && R(ie);
    }).catch(() => {
      re && z("文件记录读取失败；仍可仅删除对话。");
    }).finally(() => {
      re && B(!1);
    }), () => {
      re = !1;
    };
  }, [S]);
  const H = re => re.kind === "chat" ? t.chat.has(re.id) : t.skill.has(re.id) || n.has(re.id),
    Y = r ? "" : a === "local-skill" ? i.threadId : o,
    K = re => {
      re.archived || !Tx(re) || (DE(re.kind), re.kind === "chat" && DQe(re.id), re.kind === "local-skill" && re.rootPath && $Ie(re.rootPath, re.id, L.some(fe => e_(fe, re.rootPath))), gy(!1));
    },
    W = async re => {
      if (re.kind === "local-skill" && re.rootPath) {
        await QUn(re.rootPath, re.id, M ? P : void 0);
        return;
      }
      re.kind === "chat" && MUn(re.id), tNt(re.id);
    },
    Q = re => {
      if (Z0t(re.id), re.id !== Y) return;
      const fe = e.find(ye => ye.id !== re.id && ye.kind === re.kind && !ye.archived && Tx(ye));
      fe ? K(fe) : (DE("chat"), jQe(), gy());
    },
    q = (re, fe) => {
      var ye;
      if (fe === "save-library") {
        ebt(re.kind === "local-skill" ? "harness" : "chat", re.id);
        return;
      }
      if (fe === "pin") kUn(re.id);else if (fe === "rename") E(re.title), C({
        kind: "rename",
        id: re.id
      });else if (fe === "copy-path") {
        if (!re.rootPath) return;
        if (!((ye = navigator.clipboard) != null && ye.writeText)) {
          qi("当前环境无法复制路径");
          return;
        }
        navigator.clipboard.writeText(re.rootPath).catch(() => qi("当前环境无法复制路径"));
      } else if (fe === "reveal") {
        if (!re.rootPath) return;
        Fr("open_folder_in_explorer", {
          path: re.rootPath
        }).catch(ie => {
          qi(ie instanceof Error ? ie.message : "无法打开文件夹");
        });
      } else fe === "delete" ? C({
        kind: "delete",
        id: re.id
      }) : fe === "archive" && (!re.archived && H(re) ? C({
        kind: "archive",
        id: re.id
      }) : re.archived ? Z0t(re.id, !1) : Q(re));
    },
    ne = async () => {
      if (!(!S || !O && !V || F)) {
        N(!0), z("");
        try {
          if (S.kind === "workspace-rename") {
            if (!I.trim()) return;
            cL({
              workspaceNames: {
                ...s.workspaceNames,
                [uE(S.id)]: I.trim()
              }
            });
          } else if (S.kind === "workspace-remove") i$n(S.id);else if (S.kind === "rename") {
            if (!I.trim()) return;
            PQe(S.id, I);
          } else S.kind === "archive" ? (O.kind === "local-skill" ? (yie(O.id), EBn(O.id)) : lNt(O.id), Q(O)) : await W(O);
          C(null);
        } catch (re) {
          z(re instanceof Error ? re.message : `删除失败：${String(re)}`);
        } finally {
          N(!1);
        }
      }
    },
    de = (re, fe) => {
      cL({
        [re]: s[re].includes(fe) ? s[re].filter(ye => ye !== fe) : [...s[re], fe]
      });
    },
    le = (re, fe) => {
      y.current = fe, re.dataTransfer.effectAllowed = "move", re.dataTransfer.setData("text/plain", fe.id);
    },
    J = (re, fe) => ({
      draggable: s.orderBy === "manual" && !re.archived,
      onDragStart: ye => {
        ye.stopPropagation(), le(ye, {
          kind: "thread",
          id: re.id,
          group: fe,
          pinned: !!re.pinned
        });
      },
      onDragEnd: () => {
        y.current = null;
      },
      onDragOver: ye => {
        var ie;
        s.orderBy === "manual" && !re.archived && ((ie = y.current) == null ? void 0 : ie.kind) === "thread" && y.current.group === fe && y.current.pinned === !!re.pinned && (ye.preventDefault(), ye.stopPropagation(), ye.dataTransfer.dropEffect = "move");
      },
      onDrop: ye => {
        var ie;
        s.orderBy !== "manual" || re.archived || ((ie = y.current) == null ? void 0 : ie.kind) !== "thread" || y.current.group !== fe || y.current.pinned !== !!re.pinned || (ye.preventDefault(), ye.stopPropagation(), cL({
          threadOrder: qXt(e.map(ae => ae.id), s.threadOrder, y.current.id, re.id)
        }), y.current = null);
      }
    }),
    pe = (re, fe, ye = !1) => c.jsx(hya, {
      thread: re,
      plain: ye,
      active: re.id === Y,
      busy: H(re),
      now: m,
      drag: J(re, fe),
      onOpen: () => K(re),
      onAction: ie => q(re, ie)
    }, re.id),
    ce = re => {
      const fe = !s.collapsedWorkspaces.includes(re.key),
        ye = s.expandedThreadLists.includes(re.key),
        ie = zfa(re.threads, ye, Y, H),
        ae = !r && a === "local-skill" && e_(i.rootPath, re.path);
      return c.jsxs("div", {
        className: "studio-tree-project",
        children: [c.jsxs("div", {
          className: `studio-tree-folder${ae ? " is-active" : ""}`,
          draggable: s.orderBy === "manual",
          onDragStart: be => le(be, {
            kind: "workspace",
            id: re.key
          }),
          onDragEnd: () => {
            y.current = null;
          },
          onDragOver: be => {
            var Ee;
            s.orderBy === "manual" && ((Ee = y.current) == null ? void 0 : Ee.kind) === "workspace" && (be.preventDefault(), be.dataTransfer.dropEffect = "move");
          },
          onDrop: be => {
            var Ee;
            s.orderBy !== "manual" || ((Ee = y.current) == null ? void 0 : Ee.kind) !== "workspace" || (be.preventDefault(), cL({
              workspaceOrder: qXt(L.map(uE), s.workspaceOrder, y.current.id, re.key)
            }), y.current = null);
          },
          children: [c.jsxs("button", {
            type: "button",
            className: "studio-tree-folder-title",
            "aria-expanded": fe,
            title: re.path,
            onClick: () => de("collapsedWorkspaces", re.key),
            children: [fe ? c.jsx(Sc, {
              size: 17
            }) : c.jsx(_h, {
              size: 17
            }), c.jsx("span", {
              children: re.name
            }), fe ? c.jsx(Mi, {
              size: 12
            }) : c.jsx(ss, {
              size: 12
            })]
          }), c.jsx("button", {
            type: "button",
            className: "studio-tree-action studio-conversation-create",
            title: x("在当前工作区新建对话"),
            "aria-label": x("在 {0} 新建对话", re.name),
            onClick: () => {
              fe || de("collapsedWorkspaces", re.key), Y2e(re.path), gy(!1);
            },
            children: c.jsx(eo, {
              size: 16
            })
          }), c.jsx(RFe, {
            label: x("工作区操作 {0}", re.name),
            items: [{
              id: "workspace-rename",
              label: "重命名工作区"
            }, {
              id: "workspace-remove",
              label: "移除工作区"
            }],
            onChoose: be => {
              E(re.name), C({
                kind: be,
                id: re.path
              });
            }
          })]
        }), fe && c.jsxs("div", {
          className: "studio-tree-children studio-skill-threads",
          children: [ie.map(be => pe(be, re.key, !0)), re.threads.length > ie.length || ye && re.threads.length > 5 ? c.jsx("button", {
            type: "button",
            className: "studio-tree-more",
            onClick: () => de("expandedThreadLists", re.key),
            children: ye ? x("收起显示") : x("展开显示（{0}）", re.threads.length - ie.length)
          }) : null, re.children.map(ce)]
        })]
      }, re.key);
    },
    we = () => {
      const re = L.find(ye => e_(ye, i.rootPath)) || L[0];
      if (!re) {
        qi("先添加一个工作区，再新建对话");
        return;
      }
      const fe = uE(re);
      s.collapsedWorkspaces.includes(fe) && de("collapsedWorkspaces", fe), w && A(), Y2e(re), gy(!1);
    },
    X = async () => {
      if (!b) {
        v(!0);
        try {
          (await KU()) && (DE("local-skill"), gy(!1));
        } catch (re) {
          qi(re instanceof Error ? re.message : "无法选择工作区");
        } finally {
          v(!1);
        }
      }
    },
    Z = (S == null ? void 0 : S.kind) === "rename" || (S == null ? void 0 : S.kind) === "workspace-rename";
  return c.jsxs("div", {
    className: `studio-section studio-conversation-list${w ? " is-collapsed" : ""}`,
    children: [c.jsxs("div", {
      className: "studio-tree-heading",
      children: [c.jsxs("button", {
        type: "button",
        "aria-expanded": !w,
        onClick: A,
        children: [x("工作区 "), w ? c.jsx(ss, {
          size: 14
        }) : c.jsx(Mi, {
          size: 14
        })]
      }), c.jsx("button", {
        type: "button",
        className: "studio-tree-action",
        title: x("搜索对话"),
        "aria-label": x("搜索对话"),
        "aria-expanded": u,
        onClick: () => {
          h(!u), u && d(""), w && A();
        },
        children: c.jsx(mc, {
          size: 15
        })
      }), c.jsx(RFe, {
        label: x("对话列表显示选项"),
        icon: c.jsx(by, {
          size: 15
        }),
        items: [{
          id: "group-heading",
          label: "分组方式",
          heading: !0
        }, ...[{
          id: "workspace",
          label: "按工作区"
        }, {
          id: "workspace-tree",
          label: "按工作区树"
        }, {
          id: "flat",
          label: "单列表"
        }].map(re => ({
          ...re,
          checked: s.groupBy === re.id
        })), {
          id: "order-heading",
          label: "排序方式",
          heading: !0
        }, ...[{
          id: "manual",
          label: "手动排序"
        }, {
          id: "updated",
          label: "最近更新"
        }].map(re => ({
          ...re,
          checked: s.orderBy === re.id
        })), {
          id: "archive-heading",
          label: "归档对话",
          heading: !0
        }, ...[{
          id: "hide",
          label: "隐藏已归档"
        }, {
          id: "all",
          label: "显示全部"
        }, {
          id: "only",
          label: "仅已归档"
        }].map(re => ({
          ...re,
          checked: s.archivedFilter === re.id
        }))],
        onChoose: re => {
          re === "workspace" || re === "workspace-tree" || re === "flat" ? cL({
            groupBy: re
          }) : re === "manual" || re === "updated" ? cL({
            orderBy: re
          }) : (re === "hide" || re === "all" || re === "only") && cL({
            archivedFilter: re
          });
        }
      }), c.jsx("button", {
        type: "button",
        className: "studio-tree-action",
        title: x("在当前工作区新建对话"),
        "aria-label": x("在当前工作区新建对话"),
        onClick: we,
        children: c.jsx(eo, {
          size: 16
        })
      }), c.jsx("button", {
        type: "button",
        className: "studio-tree-action",
        title: x("添加 Harness 工作区"),
        "aria-label": x("添加工作区"),
        disabled: b,
        onClick: () => void X(),
        children: b ? c.jsx(Ua, {
          size: 15,
          className: "studio-row-busy"
        }) : c.jsx(_h, {
          size: 15
        })
      })]
    }), !w && c.jsxs(c.Fragment, {
      children: [u && c.jsxs("div", {
        className: "studio-conversation-search",
        children: [c.jsx(mc, {
          size: 14
        }), c.jsx("input", {
          ref: p,
          "aria-label": x("搜索首页对话或 Harness 工作区"),
          placeholder: x("搜索对话或工作区"),
          maxLength: 500,
          value: l,
          onChange: re => d(re.currentTarget.value.replace(/\0/g, "")),
          onKeyDown: re => {
            re.key === "Escape" && (d(""), h(!1));
          }
        }), c.jsx("button", {
          type: "button",
          "aria-label": x("关闭搜索"),
          onClick: () => {
            d(""), h(!1);
          },
          children: c.jsx(Na, {
            size: 14
          })
        })]
      }), c.jsxs("div", {
        className: "studio-project-list",
        children: [l.trim() || s.groupBy === "flat" ? D.visible.map(re => pe(re, "flat")) : c.jsxs(c.Fragment, {
          children: [D.groups.map(ce), D.ungrouped.some(re => re.kind === "chat") && c.jsx("p", {
            className: "studio-conversation-label",
            children: x("对话")
          }), D.ungrouped.filter(re => re.kind === "chat").map(re => pe(re, "chat"))]
        }), !D.visible.length && (l.trim() || s.archivedFilter === "only") && c.jsx("p", {
          className: "studio-conversation-empty",
          children: l.trim() ? x("没有匹配的对话") : x("没有已归档的对话")
        })]
      })]
    }), S && (O || V) && Da.createPortal(c.jsx("dialog", {
      ref: _,
      className: "studio-project-dialog",
      "aria-labelledby": "studio-conversation-dialog-title",
      onCancel: re => {
        re.preventDefault(), F || C(null);
      },
      children: c.jsxs("form", {
        onSubmit: re => {
          re.preventDefault(), ne();
        },
        children: [c.jsx("h2", {
          id: "studio-conversation-dialog-title",
          children: V ? x(Z ? "重命名工作区" : "移除工作区") : Z ? x("重命名对话") : S.kind === "archive" ? x("停止并归档对话") : x("删除对话")
        }), Z ? c.jsxs("label", {
          children: [x(V ? "工作区名称" : "对话名称"), c.jsx("input", {
            type: "text",
            autoFocus: !0,
            value: I,
            onChange: re => E(re.currentTarget.value)
          })]
        }) : c.jsx("p", {
          children: V ? x("确定移除「{0}」？仅移除工作区记录，保留对话及本地文件；对话仍可在列表中找到。", U(S.id)) : S.kind === "archive" ? x("「{0}」仍有任务或后台进程在运行，确定停止并归档？", O.title) : O.kind === "local-skill" ? x("确定删除「{0}」？默认仅删除对话记录，保留本地文件。", O.title) : x("确定删除「{0}」？对话记录将被清空，无法撤销。", O.title)
        }), S.kind === "delete" && (O == null ? void 0 : O.kind) === "local-skill" && c.jsxs("div", {
          className: "studio-thread-cleanup",
          children: [c.jsxs("label", {
            children: [c.jsx("input", {
              type: "checkbox",
              checked: M,
              disabled: F || j || !P.length,
              onChange: re => {
                T(re.currentTarget.checked), z("");
              }
            }), x("同时删除本对话新建的本地文件")]
          }), c.jsx("p", {
            children: j ? x("正在读取文件记录…") : P.length ? x("仅清理下列文件；已有文件、工作区文件夹会保留。检测到后续修改时会停止清理。") : x("没有可核实的新建文件记录；通过命令生成且未记录的文件需手动清理。")
          }), !!P.length && c.jsxs("details", {
            open: M,
            children: [c.jsxs("summary", {
              children: [x("查看 "), P.length, x(" 个文件")]
            }), c.jsx("p", {
              className: "studio-thread-cleanup-root",
              children: O.rootPath
            }), c.jsx("ul", {
              children: P.map(re => c.jsx("li", {
                children: re.relPath
              }, re.relPath))
            })]
          }), M && c.jsx("p", {
            className: "studio-project-error",
            children: x("这些文件将从磁盘永久删除。")
          })]
        }), G && c.jsx("p", {
          className: "studio-project-error",
          role: "alert",
          children: G
        }), c.jsxs("div", {
          className: "studio-project-dialog-actions",
          children: [c.jsx("button", {
            type: "button",
            disabled: F,
            onClick: () => C(null),
            children: x("取消")
          }), c.jsx("button", {
            type: "submit",
            className: S.kind === "delete" || S.kind === "workspace-remove" ? "is-danger" : "is-primary",
            disabled: F || Z && !I.trim(),
            children: F ? x("正在处理…") : S.kind === "workspace-remove" ? x("移除工作区") : S.kind === "archive" ? x("停止并归档") : S.kind === "delete" ? x(M ? "删除对话和文件" : "仅删除对话") : x("保存")
          })]
        })]
      })
    }), document.body)]
  });
}

function mya(e, t) {
  const n = document.documentElement,
    r = document.querySelector(".studio-sidebar-slot");
  if (!r) return () => {};
  const a = document.querySelector("[data-canvas-bottom-left-dock]"),
    i = $la();
  let o = i,
    s = i,
    l = 0,
    d = !1;
  n.dataset.studioSidebarResizing = "true";
  const u = () => {
      l = 0, s !== o && (r.style.setProperty("--studio-sidebar-w", `${o}px`), a == null || a.style.setProperty("--studio-frame-left", `${o + 6}px`), s = o);
    },
    h = f => {
      f.pointerId === t && (o = ZBe(i + f.clientX - e), l || (l = requestAnimationFrame(u)));
    },
    p = () => {
      d || (d = !0, l && cancelAnimationFrame(l), u(), sGn(o), r.style.removeProperty("--studio-sidebar-w"), a == null || a.style.removeProperty("--studio-frame-left"), delete n.dataset.studioSidebarResizing, window.removeEventListener("pointermove", h), window.removeEventListener("pointerup", m), window.removeEventListener("pointercancel", m), window.removeEventListener("blur", p));
    },
    m = f => {
      f.pointerId === t && (f.type === "pointerup" && (o = ZBe(i + f.clientX - e)), p());
    };
  return window.addEventListener("pointermove", h), window.addEventListener("pointerup", m), window.addEventListener("pointercancel", m), window.addEventListener("blur", p), p;
}

const fya = {
  original: ["M30 85 65 20l35 65M43 60h44M111 30v55", "M25 96h100"],
  cartoon: ["M31 72Q8 49 32 29q15-17 34 0 26-27 50 0 20 25-7 44l-10 19-17-13H45Z", "m78 37 4 10 11 1-8 7 2 11-9-6-10 5 3-10-7-8 10-1Z"],
  realistic: ["M27 91V51a43 43 0 0 1 86 0v40Zm12 0V51a31 31 0 0 1 62 0v40M23 97h102", "M71 18v72M40 57h61"],
  cyber: ["M19 32h27l11-13h51v57H64L49 92H22Zm8 7v26h17V39Zm49-8h22v20H76Z", "M6 51h15m88-7h31M89 76v22h32M70 82v19M57 31v26h8"],
  minimal: ["M37 53a32 32 0 1 0 64 0 32 32 0 0 0-64 0M22 94h106", "M69 12v17m-8-8h16"],
  manga: ["m69 7 7 24 22-13-5 25 28 2-22 17 20 18-28-1 1 25-18-20-20 20 5-27-28-1 23-16-17-23 26 5Z", "m65 34 14-2-4 24-12 1Zm-4 32h11v10H61Z"],
  music: ["M30 55a40 40 0 1 0 80 0 40 40 0 0 0-80 0m9 0a31 31 0 1 1 62 0m-52 0a21 21 0 1 1 42 0", "M61 55a9 9 0 1 0 18 0 9 9 0 0 0-18 0m56-30v47l-12 8m6-55h14"],
  watercolor: ["M32 93q9-40 54-76M52 63Q10 42 31 26q24 3 21 37Zm15-19Q62 8 84 11q17 13-17 33Zm-9 30q43-31 56-7-14 26-56 7Z", "M108 15v15m-7-7h14M26 99h90"],
  ukiyoe: ["M14 88q18-63 53-37 14 12-4 21 24-28 49-8l24 24M15 95h121M29 82q17-36 34-19m-24 25q16-22 30-9m5 8q16-21 40-9", "M100 24a13 13 0 1 0 26 0 13 13 0 0 0-26 0"],
  "papercut-red": ["M27 13h96v84H27Zm12 12h72v60H39Zm13 29q23-50 46 0-23 50-46 0Z", "m75 26 7 20 20 8-20 8-7 21-7-21-20-8 20-8Z"],
  "stained-glass": ["M31 93V46a42 42 0 0 1 84 0v47ZM39 89V46a34 34 0 0 1 68 0v43M73 7v87M31 46h84M32 91l82-46M31 46l83 46", "m73 19 17 27-17 28-17-28Z"],
  "ascii-crt": ["M21 18h108v68H21Zm7 8h94v52H28M55 96h41M73 86v10", "m41 41 10 8-10 8m20 0h28M35 31h5m5 0h5m5 0h5"],
  "pixel-rpg": ["M41 90V70H28V50h15V31h17V16h29v17h15v17h17v22h-18v19ZM56 91V71h32v20", "M64 42h9v9h-9m19-9h9v9h-9M58 60h36"],
  "paper-lantern": ["M26 17h99v77H26Zm8 8h83v61H34Zm7 8h69v46H41M40 80l22-30 17 20 12-15 21 26", "M81 44a9 9 0 1 0 18 0 9 9 0 0 0-18 0M21 100h109"],
  "silkscreen-poster": ["M28 14h94v84H28M35 87l29-40 19 23 18-35 17 52M37 22h42m-42 6h25", "M77 31a12 12 0 1 0 24 0 12 12 0 0 0-24 0"],
  engraving: ["M73 98V27m0 15Q42 40 41 17q27-1 32 25Zm0 16q35-5 32-29-28 3-32 29Zm0 16Q41 67 38 48q30 2 35 26Z", "M18 12h114v88H18m7-81h100v74H25M58 93h32"],
  "crayon-book": ["m25 57 49-40 50 39-6 2v40H31V58Zm17 1 4 39m51-38-1 38M65 97V74h20v24M22 102l38-3 26 3 43-2", "M106 16a8 8 0 1 0 16 0 8 8 0 0 0-16 0M106 4l-3-5m24 16h9"],
  impasto: ["M32 92q-10-42 11-65 14-17 31-4 27-8 36 17 17 35-17 54M48 89l13-58m5 58 13-58m-1 60 14-50M23 101h103", "m108 21 10-12 8 7-11 14Z"],
  "one-line": ["M15 84q28 23 42-1l7-19q-31-5-26-32 17-18 34-1l10 38q33-4 30-32-15-8-24 4l2 44q13 20 45 3", "M25 99h48"],
  whiteboard: ["M19 17h111v68H19ZM28 27h53m-53 7h39M48 95l7-10m44 10-7-10M87 46h22v22H87", "m36 59 8 8 18-22M74 55h12m-7-5 6 5-6 5"],
  "shadow-puppet": ["M23 12h105v87H23m7-79h91v71H30M43 85l19-35 16 6 20 29M62 49l-8-18 13-14 19 8-2 16-16 8m15 6 19-13", "M22 9v95m107-94v95M44 92h62"],
  "halftone-dossier": ["M27 14h89v82H27ZM34 22h37m-37 7h24M38 46h67m-67 8h67m-67 8h50M32 90h92v10", "M78 31h23v13H78m-36 32h3m6 0h3m6 0h3m6 0h3m6 0h3"],
  woodcut: ["M29 16h91v82H29M35 87l39-63 39 63M74 26v61M56 51l18 18 18-18M44 70l30 17 31-17", "M37 23h5m4 0h5m4 0h5M39 91h70"],
  "swiss-motion": ["M27 20h94v74H27M50 20v74m42-74v74M27 45h94M27 69h94", "M34 30h29v7H34M61 53h52v7H61M72 76h14v11H72"],
  "spy-titles": ["M22 91 38 17l32-5 55 28-17 58M34 82l17-49 22 2 31 25-13 28M75 43v25l-12 20m12-19 17 16", "m86 35 13 2M73 36a6 6 0 1 0 12 0 6 6 0 0 0-12 0"],
  "pictogram-motion": ["M69 26a9 9 0 1 0 18 0 9 9 0 0 0-18 0M75 41 61 60l-23-3m38-15 14 15h22M71 62l-11 24-29 7m42-30 22 13-5 23", "M22 30h24m-31 9h27m77 41h13"],
  dataviz: ["M24 17v76h105M37 85V62h12v23m11 0V43h12v42m12 0V54h12v31m11 0V29h12v56", "m34 48 25-21 27 7 36-23m-11 0h11v11"],
  "iso-infographic": ["m24 62 24-13 24 13v26L48 101 24 88Zm24-13v26m-24-13 24 13 24-13m10-31 24-14 24 14v26l-24 14-24-14Zm24-14v27m-24-13 24 13 24-13", "M22 39h28V20m39 69h33V73"],
  "dark-keynote": ["M21 22h111v62H21Zm36 62v13m34-13v13M47 97h54M46 66l18-28 17 22 16-33 20 39", "M31 30h23m-23 6h14"],
  "living-screencast": ["M21 15h112v82H21M21 31h112M28 23h3m5 0h3m5 0h3M29 39h33v48H29M72 43h48m-48 8h32", "m88 61 22 13-11 3-5 12Z"],
  "hologram-hud": ["M14 39V17h23m78 0h22v22m0 38v20h-22m-78 0H14V77M42 57a33 33 0 1 0 66 0 33 33 0 0 0-66 0m11 0a22 22 0 1 1 44 0", "M76 13v18m0 52v18M28 57h17m63 0h18M72 57h8m-4-4v8"],
  "rubber-hose": ["M40 35q-1-23 20-16 15-20 31-2 24-4 20 20l-8 24-27 10-24-12ZM60 65q-2 28-28 29m55-28q0 23 28 29M50 45q6 12 12 0m18 0q6 12 12 0", "m66 56 7 5 7-5M26 99h24m51 0h23"],
  "cel-anime-80s": ["M23 86 65 23l19 7 41 56M45 56l19-7 13 11 13-9 17 9M17 94h119M53 76h43", "M90 26a12 12 0 1 0 24 0 12 12 0 0 0-24 0M25 23l5 6m9-14 4 11"],
  "scifi-toon": ["M34 82q-24-34 13-52 36-19 64 10 29 36-21 51ZM53 30l-4-18m42 20 10-18M54 68q21 14 36-4", "M47 49a7 7 0 1 0 14 0 7 7 0 0 0-14 0m27 0a7 7 0 1 0 14 0 7 7 0 0 0-14 0"],
  "midcentury-toon": ["m48 30 12 66h32l13-65Zm9 11 39-18M68 42 52 10m43 12 9-14M32 98h80", "m13 67 25-30 11 42-36-12Zm96-7 12-20 19 26Z"],
  "hd-2d": ["M22 94V75h20V55h17V38h17V22h19v16h18v20h17v36M42 94V75h53V57h18M62 39v18h15", "M29 24v12m-6-6h12M115 14v10m-5-5h10"],
  microgame: ["M34 34h83l15 43-13 14-24-17H53L28 91 16 78Zm12 10v25m-12-13h25", "M91 49h9v9h-9m19 9h9v9h-9M59 28h29"],
  "game-show": ["M24 24h103v65H24M32 33h87v48H32M16 95h119m-90-1-7 9m69-9 7 9", "m75 39 7 12 14 2-10 9 2 14-13-7-13 7 2-14-10-9 14-2Z"],
  "silent-film": ["M18 20h117v76H18M34 20v76m84-76v76M18 32h16m-16 17h16m-16 18h16m-16 16h16m84-51h17m-17 17h17m-17 18h17m-17 16h17", "m59 38 31 19-31 20Z"],
  backrooms: ["M21 95V16h109v79M21 16l35 26h41l33-26M56 42v36L21 95m76-53v36l33 17M56 78h41M69 78V52h15v26", "M53 23h46v5H53M41 88h70"],
  "brick-toy": ["m23 57 38-20 64 21v31L86 106 23 85Zm0 0 63 23 39-22M86 80v26M47 30v13l20 6 18-8V27L65 21Z", "m67 49 1-15 17-7M47 30l21 4M31 51l15 5m41 0 15 5"],
  "paper-popup": ["M16 84V40l57 15 60-15v44l-60 16Zm57-29v45M44 47V28l27-13 28 15v18m-55-20 27 16 28-14M71 44v28", "m45 69 26 8 30-9M22 91l50 15 57-15"],
  "tilt-shift": ["M17 92h117M29 89V46h27v43m10 0V25h31v64m10 0V58h17v31M36 56h12m-12 10h12m26-31h14m-14 10h14m-14 10h14", "M14 16h27M109 16h27M13 102h25m72 0h26"],
  "lowpoly-island": ["m17 67 29-39 28 20 30-26 32 47-56 31Zm0 0 57-19 6 52m56-31-62-21 30-26M46 28l28 20", "m52 58 28-6 14 15-24 8Z"],
  "glass-product": ["M46 16h57l13 72q-38 20-80 0Zm-8 62q39 16 77 0M56 26l-8 46m47-46 8 46", "M27 40v20m-9-10h18M124 16v12m-6-6h12"]
};

function wWn({
  theme: e
}) {
  const t = fya[e];
  return t ? c.jsxs("g", {
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinejoin: "round",
    strokeLinecap: "round",
    children: [c.jsx("path", {
      d: t[0]
    }), c.jsx("path", {
      d: t[1],
      stroke: "var(--studio-motif-decoration, var(--studio-design-decoration))",
      strokeWidth: "2.5"
    })]
  }) : null;
}

const gya = ["#191919", "#ffffff", "#111113", "#f4f4f5", "#1e293b", "#dbeafe"];

function yJt({
  mode: e,
  active: t,
  label: n,
  onSelect: r,
  children: a
}) {
  return on(), c.jsxs("button", {
    type: "button",
    "aria-pressed": t,
    "aria-label": n,
    title: n,
    "data-mode": e,
    className: `studio-sidebar-theme-btn${t ? " is-active" : ""}`,
    onClick: r,
    children: [a, c.jsx("span", {
      children: n
    })]
  });
}

function yya({
  isDarkChrome: e,
  showLabel: t = !0
}) {
  on();
  const n = u9(),
    r = Uhe(n);
  return c.jsxs("div", {
    className: `studio-sidebar-theme-bar${t ? " is-row" : " is-compact"}${n.mode === "custom" ? " is-custom" : ""}`,
    "data-tone": $he(r),
    children: [t ? c.jsxs(c.Fragment, {
      children: [c.jsx("span", {
        className: "studio-nav-ic",
        "aria-hidden": !0,
        children: c.jsx(tw, {
          size: 18,
          strokeWidth: 1.75
        })
      }), c.jsx("span", {
        className: "studio-nav-label",
        children: x("主题")
      })]
    }) : null, c.jsxs("div", {
      className: "studio-sidebar-theme-toggles",
      role: "group",
      "aria-label": x("纯色外观"),
      children: [c.jsx(yJt, {
        mode: "dark",
        active: n.mode === "dark",
        label: x("深色"),
        onSelect: () => yQ("dark"),
        children: c.jsx(dTn, {
          size: 15,
          strokeWidth: 1.75
        })
      }), c.jsx(yJt, {
        mode: "light",
        active: n.mode === "light",
        label: x("浅色"),
        onSelect: () => yQ("light"),
        children: c.jsx(AD, {
          size: 15,
          strokeWidth: 1.75
        })
      }), c.jsx("div", {
        className: `studio-sidebar-theme-custom${n.mode === "custom" ? " is-active" : ""}`,
        onClickCapture: () => {
          n.mode !== "custom" && yQ("custom");
        },
        children: c.jsx(aWe, {
          isDark: e,
          title: x("自定义颜色"),
          triggerLabel: x("自定义"),
          pressed: n.mode === "custom",
          size: "sm",
          placement: "above",
          popupAlign: "right",
          portal: !1,
          canvasBackgroundColor: n.customColor,
          canvasBackgroundDefaultHex: n.customColor,
          onCanvasBackgroundColorChange: fla,
          presets: gya,
          recentStorageKey: "qiaodoumayi_studio_sidebar_recent_colors",
          dataTip: "自定义颜色"
        })
      })]
    })]
  });
}

function bya({
  onOpen: e
}) {
  on();
  const t = u9(),
    n = MS(t.mode);
  return c.jsxs("button", {
    type: "button",
    className: "creator-menu-row studio-theme-entry",
    onClick: e,
    "aria-haspopup": "dialog",
    children: [c.jsx(tw, {
      size: 18
    }), c.jsx("span", {
      children: x("主题")
    }), c.jsx("small", {
      children: x((n == null ? void 0 : n.name) ?? (t.mode === "dark" ? "暗色" : t.mode === "light" ? "亮色" : "自定义颜色"))
    }), c.jsx(ss, {
      size: 14
    })]
  });
}

function vya({
  id: e
}) {
  const t = e_e[e],
    n = Math.min(t.radius, 10);
  return c.jsx("span", {
    className: "studio-theme-preview",
    "aria-hidden": "true",
    children: c.jsxs("svg", {
      viewBox: "0 0 260 138",
      fill: "none",
      children: [c.jsx("path", {
        d: "M0 22h260M29 22v116",
        stroke: "var(--preview-line)"
      }), c.jsxs("g", {
        fill: "var(--preview-accent)",
        children: [c.jsx("circle", {
          cx: "13",
          cy: "11",
          r: "3"
        }), c.jsx("rect", {
          x: "9",
          y: "36",
          width: "9",
          height: "9",
          rx: "2"
        }), c.jsx("rect", {
          x: "9",
          y: "59",
          width: "9",
          height: "9",
          rx: "2",
          opacity: ".4"
        }), c.jsx("rect", {
          x: "9",
          y: "82",
          width: "9",
          height: "9",
          rx: "2",
          opacity: ".4"
        })]
      }), c.jsx("text", {
        x: "37",
        y: "15",
        fill: "var(--preview-ink)",
        fontSize: "7",
        letterSpacing: "1.7",
        children: "ATELIER / STUDIO"
      }), t.frame === "offset" && c.jsx("path", {
        d: "M48 98h80V43m15 76h101V56",
        stroke: "var(--preview-line)",
        strokeWidth: "3"
      }), c.jsx("rect", {
        x: "44",
        y: "39",
        width: "82",
        height: "58",
        rx: n,
        fill: "var(--preview-surface)",
        stroke: "var(--preview-line)"
      }), c.jsx("rect", {
        x: "139",
        y: "52",
        width: "103",
        height: "66",
        rx: n,
        fill: "var(--preview-surface)",
        stroke: "var(--preview-line)"
      }), t.frame === "double" && c.jsxs("g", {
        stroke: "var(--preview-line)",
        children: [c.jsx("rect", {
          x: "47",
          y: "42",
          width: "76",
          height: "52",
          rx: n
        }), c.jsx("rect", {
          x: "142",
          y: "55",
          width: "97",
          height: "60",
          rx: n
        })]
      }), t.frame === "ruled" && c.jsx("path", {
        d: "M48 40h74m21 13h95",
        stroke: "var(--preview-decoration)",
        strokeWidth: "2"
      }), c.jsx("path", {
        d: "M126 66h6v16h7",
        stroke: "var(--preview-accent)"
      }), c.jsx("path", {
        d: "M54 52h40m-40 9h58m-58 9h49m-49 14h23m72-15h76m-76 9h60m-60 9h69",
        stroke: "var(--preview-ink)",
        opacity: ".5",
        strokeWidth: "2"
      }), c.jsx("rect", {
        x: "174",
        y: "100",
        width: "56",
        height: "7",
        rx: "3",
        fill: "var(--preview-accent)"
      }), c.jsx("g", {
        transform: "translate(175 -3) scale(.45)",
        color: "var(--preview-accent)",
        style: {
          "--studio-motif-decoration": "var(--preview-decoration)"
        },
        children: c.jsx(wWn, {
          theme: e
        })
      }), e === "paper" && c.jsxs("g", {
        stroke: "var(--preview-accent)",
        children: [c.jsx("path", {
          d: "M215 18q-25 5-25 23 23 0 25-23Zm-20 19 16-15"
        }), c.jsx("path", {
          d: "M47 110h48",
          stroke: "var(--preview-decoration)",
          strokeWidth: "3"
        })]
      }), e === "ink" && c.jsxs("g", {
        children: [c.jsx("path", {
          d: "m160 46 18-17 11 9 15-12 30 22",
          stroke: "var(--preview-ink)",
          strokeWidth: "8",
          opacity: ".13"
        }), c.jsx("path", {
          d: "m171 46 25-28 27 31",
          stroke: "var(--preview-ink)",
          strokeWidth: "4",
          opacity: ".24"
        }), c.jsx("rect", {
          x: "48",
          y: "108",
          width: "13",
          height: "16",
          fill: "var(--preview-decoration)"
        }), c.jsx("path", {
          d: "M51 112h7m-6 0v8h6v-5h-5",
          stroke: "var(--preview-surface)"
        })]
      }), e === "risograph" && c.jsxs("g", {
        children: [c.jsx("circle", {
          cx: "200",
          cy: "34",
          r: "19",
          fill: "var(--preview-decoration)",
          opacity: ".55"
        }), c.jsx("path", {
          d: "M177 44 197 15l20 29Z",
          fill: "var(--preview-accent)",
          opacity: ".8"
        }), c.jsx("path", {
          d: "M48 103h79V47",
          stroke: "var(--preview-decoration)",
          strokeWidth: "3"
        })]
      }), e === "blueprint" && c.jsxs("g", {
        stroke: "var(--preview-accent)",
        opacity: ".7",
        children: [c.jsx("path", {
          d: "M44 29h82m-82-3v6m82-6v6M250 53v65m-3-65h6m-6 65h6",
          strokeWidth: ".6"
        }), c.jsx("circle", {
          cx: "187",
          cy: "32",
          r: "12"
        }), c.jsx("path", {
          d: "M172 32h30m-15-15v30",
          strokeDasharray: "3 2"
        }), c.jsx("text", {
          x: "215",
          y: "32",
          fill: "var(--preview-accent)",
          stroke: "none",
          fontSize: "7",
          children: "01 / A"
        })]
      }), e === "art-deco" && c.jsxs("g", {
        stroke: "var(--preview-accent)",
        strokeWidth: ".8",
        children: [c.jsx("path", {
          d: "M4 26v107h252V26M38 128h20m180 0h13M173 42l21-17 21 17m-34-7v-9h5v-5h16v5h5v9M194 21V7m-12 21-9-14m33 14 9-14"
        }), c.jsx("path", {
          d: "M195 121v10m-5-5 5-5 5 5-5 5Z",
          fill: "var(--preview-accent)"
        })]
      })]
    })
  });
}

function wya({
  onClose: e
}) {
  on();
  const t = u9(),
    n = g.useRef(null),
    [r, a] = g.useState(""),
    i = Object.entries(e_e).filter(([l, d]) => `${l} ${d.sourceStyle} ${d.name} ${x(d.name)} ${d.description}`.toLowerCase().includes(r.trim().toLowerCase())),
    o = g.useRef(!1),
    s = l => {
      const d = l.currentTarget.getBoundingClientRect();
      return l.target === l.currentTarget && (l.clientX < d.left || l.clientX > d.right || l.clientY < d.top || l.clientY > d.bottom);
    };
  return g.useEffect(() => {
    const l = document.activeElement,
      d = n.current;
    return d.showModal(), () => {
      d.close(), l == null || l.focus({
        preventScroll: !0
      });
    };
  }, []), Da.createPortal(c.jsx("dialog", {
    ref: n,
    className: "studio-theme-dialog",
    "data-mode": t.mode,
    "aria-label": x("选择全局主题"),
    onCancel: l => {
      l.preventDefault(), e();
    },
    onKeyDown: l => {
      var h;
      if (l.stopPropagation(), l.key !== "Tab") return;
      const d = Array.from(l.currentTarget.querySelectorAll('button:not(:disabled), input:not(:disabled), [tabindex="0"]')).filter(p => p.getClientRects().length),
        u = l.shiftKey ? d[0] : d[d.length - 1];
      document.activeElement === u && (l.preventDefault(), (h = d[l.shiftKey ? d.length - 1 : 0]) == null || h.focus());
    },
    onPointerDown: l => {
      o.current = s(l);
    },
    onPointerUp: l => {
      o.current && s(l) && e(), o.current = !1;
    },
    children: c.jsxs("section", {
      className: "studio-theme-sheet",
      children: [c.jsxs("header", {
        children: [c.jsxs("div", {
          children: [c.jsx("span", {
            className: "studio-theme-eyebrow",
            children: "ATELIER / APPEARANCE"
          }), c.jsx("h2", {
            children: x("选择全局主题")
          }), c.jsx("p", {
            children: x("为整个工作室换一种氛围。")
          })]
        }), c.jsx("button", {
          type: "button",
          className: "studio-theme-close",
          "aria-label": x("关闭"),
          onClick: e,
          children: c.jsx(Na, {
            size: 19
          })
        })]
      }), c.jsxs("label", {
        className: "studio-theme-search",
        children: [c.jsx(mc, {
          size: 15
        }), c.jsx("input", {
          "aria-label": x("搜索主题"),
          placeholder: x("搜索主题，如：油画、玻璃、HD-2D"),
          value: r,
          onChange: l => a(l.target.value)
        }), c.jsxs("small", {
          "aria-live": "polite",
          children: [i.length, " / ", Object.keys(e_e).length]
        })]
      }), c.jsxs("div", {
        className: "studio-theme-choices",
        role: "group",
        "aria-label": x("全局主题"),
        children: [i.map(([l, d]) => c.jsxs("button", {
          type: "button",
          className: "studio-theme-choice",
          "data-preset": l,
          title: x(d.description),
          "aria-pressed": t.mode === l,
          onClick: () => yQ(l),
          style: {
            "--preview-bg": d.background,
            "--preview-surface": d.surface,
            "--preview-line": d.border,
            "--preview-ink": d.ink,
            "--preview-accent": d.accent,
            "--preview-decoration": d.decoration
          },
          children: [c.jsx(vya, {
            id: l
          }), c.jsxs("span", {
            className: "studio-theme-choice-title",
            children: [c.jsx("strong", {
              children: x(d.name)
            }), t.mode === l && c.jsx(io, {
              size: 15
            })]
          }), c.jsx("small", {
            children: x(d.description)
          })]
        }, l)), !i.length && c.jsx("p", {
          className: "studio-theme-empty",
          children: x("没有找到匹配的主题")
        })]
      }), c.jsxs("footer", {
        children: [c.jsxs("div", {
          className: "studio-theme-base",
          children: [c.jsxs("div", {
            className: "studio-theme-base-heading",
            children: [c.jsx("strong", {
              children: x("纯色外观")
            }), c.jsx("span", {
              children: x("替换风格主题，使用统一底色")
            })]
          }), c.jsx(yya, {
            isDarkChrome: $he(Uhe(t)) === "dark",
            showLabel: !1
          })]
        }), c.jsxs("div", {
          className: "studio-theme-footer-actions",
          children: [c.jsx("span", {
            children: x("选择即保存，档案与分享卡可单独设置。")
          }), c.jsx("button", {
            type: "button",
            className: "studio-theme-done",
            onClick: e,
            children: x("完成")
          })]
        })]
      })]
    })
  }), document.body);
}

const w_e = {
  name: "创作者",
  bio: "把灵感，变成看得见的作品。",
  avatar: ""
};

let ejt = w_e,
  bJt;

const NFe = new Set(),
  xya = e => (NFe.add(e), () => {
    NFe.delete(e);
  });

function _ya() {
  return bJt || (bJt = wPt("profile").then(e => {
    e && (ejt = {
      name: typeof e.name == "string" && e.name.trim() ? e.name.trim().slice(0, 32) : w_e.name,
      bio: typeof e.bio == "string" ? e.bio.slice(0, 100) : "",
      avatar: /^data:image\/(png|jpeg|webp);base64,/.test(e.avatar) ? e.avatar : ""
    }, NFe.forEach(t => t()));
  }).catch(e => {
    throw bJt = void 0, e;
  }));
}

async function kya(e) {
  const t = e.name.trim();
  if (!t) throw new Error("请填写昵称");
  const n = {
    name: t.slice(0, 32),
    bio: e.bio.trim().slice(0, 100),
    avatar: e.avatar
  };
  await bYr("profile", n), ejt = n, NFe.forEach(r => r());
}

function xWn() {
  return g.useEffect(() => {
    _ya().catch(() => {});
  }, []), g.useSyncExternalStore(xya, () => ejt, () => w_e);
}

async function Aya(e) {
  if (!["image/png", "image/jpeg", "image/webp", "image/gif"].includes(e.type)) throw new Error("请选择 PNG、JPG、WebP 或 GIF 图片");
  if (e.size > 10 * 1024 * 1024) throw new Error("请选择小于 10 MB 的头像");
  const t = URL.createObjectURL(e);
  try {
    const n = new Image();
    n.src = t, await n.decode();
    const r = document.createElement("canvas");
    r.width = r.height = 256;
    const a = r.getContext("2d");
    if (!a) throw new Error("头像处理失败");
    const i = Math.min(n.naturalWidth, n.naturalHeight);
    return a.drawImage(n, (n.naturalWidth - i) / 2, (n.naturalHeight - i) / 2, i, i, 0, 0, 256, 256), r.toDataURL("image/png");
  } finally {
    URL.revokeObjectURL(t);
  }
}

function jFe({
  profile: e,
  className: t = ""
}) {
  return c.jsx("span", {
    className: `creator-avatar ${t}`,
    "aria-hidden": "true",
    children: e.avatar ? c.jsx("img", {
      src: e.avatar,
      alt: "",
      draggable: !1
    }) : c.jsx("span", {
      children: Array.from(e.name)[0] || "创"
    })
  });
}

function Sya({
  onOpenSettings: e,
  onOpenLogs: t
}) {
  on();
  const n = xWn(),
    r = u9(),
    a = g.useRef(null),
    i = g.useRef(null),
    [o, s] = g.useState(!1),
    [l, d] = g.useState(!1),
    [u, h] = g.useState({
      left: 0,
      top: 0
    }),
    p = () => {
      var f;
      s(!1), (f = a.current) == null || f.focus({
        preventScroll: !0
      });
    };
  g.useLayoutEffect(() => {
    var v, _;
    if (!o || !a.current || !i.current) return;
    const f = a.current.getBoundingClientRect(),
      y = ((v = a.current.closest(".studio-sidebar")) == null ? void 0 : v.getBoundingClientRect().right) ?? f.right,
      b = i.current.getBoundingClientRect();
    h({
      left: Math.max(8, Math.min(y + 16, window.innerWidth - b.width - 8)),
      top: Math.max(8, Math.min(f.bottom - b.height, window.innerHeight - b.height - 8))
    }), (_ = i.current.querySelector("button")) == null || _.focus();
  }, [o]), g.useEffect(() => {
    if (!o) return;
    const f = b => {
        var v, _, w, k;
        (v = i.current) != null && v.contains(b.target) || (_ = a.current) != null && _.contains(b.target) || (k = (w = b.target).closest) != null && k.call(w, "[data-canvas-bg-picker-portal]") || s(!1);
      },
      y = () => s(!1);
    return window.addEventListener("pointerdown", f), window.addEventListener("resize", y), () => {
      window.removeEventListener("pointerdown", f), window.removeEventListener("resize", y);
    };
  }, [o]);
  const m = f => {
    p(), f();
  };
  return c.jsxs(c.Fragment, {
    children: [c.jsxs("button", {
      ref: a,
      type: "button",
      className: "studio-profile-trigger",
      "aria-label": x("个人菜单"),
      title: x("个人菜单"),
      "aria-haspopup": "dialog",
      "aria-expanded": o,
      "data-profile-menu-open": o ? "" : void 0,
      onClick: () => s(f => !f),
      children: [c.jsx(jFe, {
        profile: n
      }), c.jsx("span", {
        className: "studio-nav-label studio-profile-trigger-name",
        children: c.jsx("strong", {
          children: n.name
        })
      }), c.jsx(hw, {
        className: "studio-nav-label",
        size: 17
      })]
    }), o && Da.createPortal(c.jsxs("div", {
      ref: i,
      role: "dialog",
      "aria-label": x("个人菜单"),
      className: "studio-profile-menu",
      style: {
        ...W$n(r),
        ...u
      },
      onKeyDown: f => {
        var y, b;
        if (f.key === "Escape" && (f.preventDefault(), f.stopPropagation(), p()), ["ArrowDown", "ArrowUp", "Tab"].includes(f.key)) {
          const v = Array.from(i.current.querySelectorAll("button:not(:disabled)")),
            _ = v.indexOf(document.activeElement);
          f.key === "Tab" ? (f.shiftKey && _ === 0 || !f.shiftKey && _ === v.length - 1) && (f.preventDefault(), (y = v[f.shiftKey ? v.length - 1 : 0]) == null || y.focus()) : (f.preventDefault(), (b = v[(_ + (f.key === "ArrowDown" ? 1 : -1) + v.length) % v.length]) == null || b.focus());
        }
      },
      children: [c.jsxs("button", {
        className: "studio-profile-menu-header",
        onClick: () => m(() => X1("profile")),
        children: [c.jsx(jFe, {
          profile: n
        }), c.jsx("span", {
          children: c.jsx("strong", {
            children: n.name
          })
        }), c.jsx(ss, {
          size: 15
        })]
      }), c.jsx("div", {
        className: "creator-menu-separator"
      }), c.jsxs("button", {
        className: "creator-menu-row",
        onClick: () => m(() => X1("profile")),
        children: [c.jsx(TRr, {
          size: 18
        }), c.jsx("span", {
          children: x("创作档案")
        }), c.jsx("small", {
          children: x("作品与用量")
        })]
      }), c.jsx(bya, {
        onOpen: () => m(() => d(!0))
      }), c.jsxs("button", {
        className: "creator-menu-row",
        onClick: () => m(e),
        children: [c.jsx(IP, {
          size: 18
        }), c.jsx("span", {
          children: x("设置")
        })]
      }), c.jsxs("button", {
        className: "creator-menu-row",
        onClick: () => m(t),
        children: [c.jsx(pZ, {
          size: 18
        }), c.jsx("span", {
          children: x("日志")
        })]
      })]
    }), document.body), l && c.jsx(wya, {
      onClose: () => d(!1)
    })]
  });
}

let tjt = null,
  Iya = 0,
  njt = 0,
  _Wn = {
    catalog: njt,
    request: tjt
  };

const cbt = new Set(),
  Cya = {
    catalog: 0,
    request: null
  };

function kWn() {
  _Wn = {
    catalog: njt,
    request: tjt
  }, cbt.forEach(e => e());
}

function Eya(e) {
  return cbt.add(e), () => cbt.delete(e);
}

function Tya() {
  return _Wn;
}

function Mya() {
  return Cya;
}

function Pya() {
  njt += 1, cGn(), kWn();
}

function Rya(e, t = e) {
  const n = e.trim(),
    r = (t || e).trim();
  !n && !r || (tjt = {
    id: ++Iya,
    previewUrl: n || r,
    sourceUrl: r || n
  }, cGn(), kWn());
}

function Nya({
  size: e = 18,
  strokeWidth: t = 1.7
}) {
  return on(), c.jsxs("svg", {
    width: e,
    height: e,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: t,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    children: [c.jsx("path", {
      className: "materials-nav-back",
      d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
    }), c.jsx("rect", {
      x: "8",
      y: "8",
      width: "14",
      height: "14",
      rx: "2"
    }), c.jsx("circle", {
      className: "materials-nav-sun",
      cx: "12.2",
      cy: "12.15",
      r: "1.35",
      fill: "currentColor",
      stroke: "none"
    }), c.jsx("path", {
      className: "materials-nav-hill",
      d: "M10.15 19.15 13.2 15.7a.85.85 0 0 1 1.25 0l2.85 3.45"
    })]
  });
}

const jya = [{
  id: "home",
  label: "开始创作",
  icon: _5e
}, {
  id: "projects",
  label: "项目库",
  icon: Sc
}, {
  id: "canvas",
  label: "画布",
  icon: Od
}, {
  id: "generation",
  label: "言绘",
  icon: SP
}, {
  id: "toolbox",
  label: "工具",
  icon: MTn
}, {
  id: "materials",
  label: "素材管理",
  icon: Nya
}];

function Dya({
  view: e,
  projects: t,
  sidebarOpen: n,
  onToggleSidebar: r,
  onProjectsChanged: a,
  onOpenSettings: i,
  onOpenLogs: o
}) {
  on();
  const [s, l] = g.useState(null),
    d = g.useRef(null),
    {
      homeLanding: u
    } = M3(),
    h = u9(),
    p = $he(Uhe(h));
  g.useEffect(() => () => {
    var f;
    return (f = d.current) == null ? void 0 : f.call(d);
  }, []);
  const m = f => {
    var y;
    f.button === 0 && (f.preventDefault(), (y = d.current) == null || y.call(d), d.current = mya(f.clientX, f.pointerId));
  };
  return c.jsxs(c.Fragment, {
    children: [c.jsxs("aside", {
      className: "studio-sidebar",
      "data-sidebar-theme": h.mode,
      "data-sidebar-tone": p,
      style: W$n(h),
      children: [c.jsxs("div", {
        className: "studio-sidebar-header",
        children: [c.jsx("button", {
          type: "button",
          className: "studio-sidebar-logo",
          "aria-label": x("切换侧栏"),
          "aria-expanded": n,
          title: x("切换侧栏"),
          onClick: r,
          children: c.jsx("img", {
            src: tEt,
            width: 24,
            height: 24,
            alt: "",
            draggable: !1
          })
        }), c.jsx("span", {
          className: "studio-sidebar-brand-name",
          title: "AIYOUPLUS",
          children: "AIYOUPLUS"
        })]
      }), c.jsx("nav", {
        className: "studio-nav",
        "aria-label": x("工作室导航"),
        children: jya.map(f => {
          const y = f.icon,
            b = f.id === "home" ? e === "home" && u : e === f.id || f.id === "toolbox" && (e === "plugins" || e === "inspiration");
          return c.jsxs("button", {
            type: "button",
            className: `studio-nav-item${b ? " is-active" : ""}`,
            "data-nav": f.id,
            onClick: () => {
              f.id === "home" ? gy() : f.id === "projects" ? KIe() : f.id === "toolbox" ? Pya() : f.id === "generation" ? X1("generation") : f.id === "materials" ? X1("materials") : Dx();
            },
            title: x(f.label),
            "aria-label": x(f.label),
            "aria-current": b ? "page" : void 0,
            children: [c.jsx("span", {
              className: "studio-nav-ic",
              children: c.jsx(y, {
                size: 18,
                strokeWidth: 1.75
              })
            }), c.jsx("span", {
              className: "studio-nav-label",
              children: x(f.label)
            })]
          }, f.id);
        })
      }), c.jsx("div", {
        ref: l,
        className: "studio-pinned-host"
      }), c.jsx(pya, {}), c.jsx(uya, {
        canvases: t,
        onChanged: a,
        pinnedHost: s
      }), c.jsx("div", {
        className: "studio-sidebar-footer",
        children: c.jsx(Sya, {
          onOpenSettings: i,
          onOpenLogs: o
        })
      })]
    }), c.jsx("button", {
      type: "button",
      className: "studio-sidebar-resizer",
      "aria-label": x("拖动调整侧栏宽度"),
      title: x("拖动调整宽度"),
      onPointerDown: m,
      onDoubleClick: () => sGn(VIe)
    })]
  });
}

function Lya({
  theme: e
}) {
  return c.jsxs("svg", {
    className: "studio-theme-mark",
    viewBox: "0 0 150 110",
    fill: "none",
    "aria-hidden": "true",
    children: [c.jsx(wWn, {
      theme: e
    }), e === "paper" && c.jsxs("g", {
      stroke: "currentColor",
      strokeWidth: "1.1",
      children: [c.jsx("path", {
        d: "m25 84 5-47 64 4-4 47Z",
        fill: "var(--design-surface)"
      }), c.jsx("path", {
        d: "m25 84 64 4 8-4M35 46l40 3m-40 5 36 2m-37 6 27 2M88 83l21-49"
      }), c.jsx("path", {
        d: "M98 59q-27-20-4-31 11 10 4 31Zm7-17q6-27 25-15-3 15-25 15Zm-17 39q-25-12-15-27 18 3 15 27Z",
        fill: "var(--studio-content-hover)"
      }), c.jsx("path", {
        d: "m116 70-4 20h18l-4-20Zm-3 3h13",
        stroke: "var(--studio-design-decoration)"
      }), c.jsx("path", {
        d: "M29 97h94",
        stroke: "var(--design-line)"
      })]
    }), e === "ink" && c.jsxs("g", {
      stroke: "currentColor",
      strokeLinecap: "round",
      children: [c.jsx("path", {
        d: "m14 79 27-36 15 14 23-32 45 54",
        strokeWidth: "12",
        opacity: ".09"
      }), c.jsx("path", {
        d: "m29 80 29-37 37 39m-31-12 23-42 38 57",
        strokeWidth: "5",
        opacity: ".21"
      }), c.jsx("path", {
        d: "M25 92q39-8 93 0",
        opacity: ".25"
      }), c.jsx("path", {
        d: "m29 76 5-35m0 6-12-6m11 16 14-10",
        strokeWidth: "1.2"
      }), c.jsx("rect", {
        x: "122",
        y: "26",
        width: "12",
        height: "19",
        rx: "1",
        fill: "var(--studio-design-decoration)",
        stroke: "none"
      }), c.jsx("path", {
        d: "M125 29v12h6m-6-7h6v-5h-3v12",
        stroke: "var(--design-bg)",
        strokeWidth: ".7"
      })]
    }), e === "risograph" && c.jsxs("g", {
      children: [c.jsx("circle", {
        cx: "99",
        cy: "40",
        r: "26",
        fill: "var(--studio-design-decoration)",
        opacity: ".56"
      }), c.jsx("path", {
        d: "m34 83 48-66 42 65Z",
        fill: "currentColor",
        opacity: ".66"
      }), c.jsx("path", {
        d: "M17 91h103v6H17Z",
        fill: "var(--studio-design-decoration)"
      }), c.jsx("path", {
        d: "m31 81 50-66 43 66Z",
        stroke: "currentColor",
        opacity: ".65"
      }), c.jsx("path", {
        d: "M18 36h14m-7-7v14m103 30h12m-6-6v12",
        stroke: "currentColor"
      })]
    }), e === "blueprint" && c.jsxs("g", {
      stroke: "currentColor",
      strokeWidth: ".8",
      children: [c.jsx("path", {
        d: "M17 91V17h116v74ZM22 86V22h106v64Z"
      }), c.jsx("path", {
        d: "M17 76h116m-35 0v15M57 17v74",
        opacity: ".45"
      }), c.jsx("circle", {
        cx: "80",
        cy: "49",
        r: "21"
      }), c.jsx("path", {
        d: "M80 23v52M54 49h52M34 27v42m-3-42h6m-6 42h6",
        strokeDasharray: "4 2"
      }), c.jsx("path", {
        d: "M41 102h79m-79-3v6m79-6v6"
      }), c.jsx("text", {
        x: "100",
        y: "86",
        fill: "currentColor",
        stroke: "none",
        fontSize: "6",
        fontFamily: "monospace",
        children: "01 / A"
      })]
    }), e === "art-deco" && c.jsxs("g", {
      stroke: "currentColor",
      strokeWidth: "1",
      children: [c.jsx("path", {
        d: "M25 94V44l50-32 50 32v50Zm7-7V48l43-28 43 28v39Z"
      }), c.jsx("path", {
        d: "M49 94V47h9V35h34v12h9v47M75 35v59M25 94h100"
      }), c.jsx("path", {
        d: "M75 12V2m-20 23L44 5m51 20L106 5M32 37 14 19m104 18 18-18",
        opacity: ".6"
      }), c.jsx("path", {
        d: "m69 73 6-10 6 10-6 10Z",
        fill: "currentColor"
      }), c.jsx("path", {
        d: "M41 102h68",
        opacity: ".6"
      })]
    })]
  });
}

const Oya = 600,
  Bya = 3e3,
  HTe = 400,
  Fya = 1500,
  zya = 800,
  Uya = 5;

function kme(e) {
  const t = Number.isFinite(e.x) ? e.x : 0,
    n = Number.isFinite(e.y) ? e.y : 0,
    r = Number.isFinite(e.zoom) && e.zoom > 0 ? e.zoom : 1;
  return `${t.toFixed(2)},${n.toFixed(2)},${r.toFixed(4)}`;
}

const AWn = "qiaodoumayi_project_manager_autosave_enabled",
  dbt = "qdm-project-mgr-autosave-changed";

function ubt() {
  try {
    const e = localStorage.getItem(AWn);
    return !(e === "0" || e === "false");
  } catch {
    return !0;
  }
}

function $ya(e) {
  try {
    localStorage.setItem(AWn, e ? "1" : "0");
  } catch {}
  try {
    window.dispatchEvent(new Event(dbt));
  } catch {}
}

function Gya(e) {
  const t = e.settings || {},
    n = [t._localCacheAssetId, t._assetId, t._contentAssetId, e._contentAssetId].map(a => typeof a == "string" ? a.trim() : "").find(Boolean) || "";
  let r = typeof e.content == "string" ? e.content : "";
  return n && (r.startsWith("blob:") || r.startsWith("data:") || r.startsWith("content_ref:")) && (r = ""), [e.id, e.type, e.x, e.y, e.width ?? "", e.height ?? "", r, e.prompt ?? "", n, typeof t.selectedMjImageIndex == "number" ? t.selectedMjImageIndex : ""].join("");
}

function Lnt(e) {
  return e.some(t => {
    if (t.type !== "gen-image" && t.type !== "gen-video") return !1;
    const n = t.settings || {};
    return t.isGenerating || n.isGenerating === !0 ? ![n._localCacheAssetId, n._assetId, n._contentAssetId, t._contentAssetId].map(a => typeof a == "string" ? a.trim() : "").find(Boolean) : !1;
  });
}

function _re(e) {
  const t = e.nodes.map(Gya).join("");
  return JSON.stringify({
    n: t,
    c: e.connections,
    g: e.groups,
    t: e.canvasTextBoxes,
    d: e.canvasDoodleStrokes
  });
}

function Vya({
  currentProjectId: e,
  currentProjectName: t,
  currentProjectSnapshotId: n = null,
  saveReceipt: r,
  fallbackProjectName: a = "未命名项目",
  nodes: i,
  connections: o,
  groups: s,
  canvasTextBoxes: l,
  canvasDoodleStrokes: d,
  view: u,
  isLoading: h,
  isSaving: p,
  saveProject: m,
  saveProjectIncremental: f,
  onSaved: y,
  debounceMs: b = Oya,
  enabled: v = !0
}) {
  const [_, w] = g.useState(() => ubt());
  g.useEffect(() => {
    const ye = () => w(ubt());
    return window.addEventListener(dbt, ye), () => window.removeEventListener(dbt, ye);
  }, []);
  const k = g.useRef(null),
    A = g.useRef(null),
    S = g.useRef(null),
    C = g.useRef(null),
    I = g.useRef(0),
    E = g.useRef(0);
  g.useLayoutEffect(() => (E.current++, () => {
    E.current++, I.current++;
  }), [e, h]);
  const M = g.useRef(r !== void 0),
    T = g.useRef(""),
    P = g.useRef(""),
    R = g.useRef(m),
    j = g.useRef(f),
    B = g.useRef(y),
    F = g.useRef(h),
    N = g.useRef(p),
    G = g.useRef(e),
    z = g.useRef(t),
    V = g.useRef(n),
    O = g.useRef(a),
    L = g.useRef(u),
    D = g.useRef({
      nodes: i,
      connections: o,
      groups: s,
      canvasTextBoxes: l,
      canvasDoodleStrokes: d,
      view: u
    }),
    U = g.useRef(new IOr()),
    H = g.useRef(!1);
  g.useLayoutEffect(() => {
    M.current = r !== void 0, R.current = m, j.current = f, B.current = y, F.current = h, N.current = p, G.current = e, z.current = t, V.current = n, O.current = a, L.current = u, D.current = {
      nodes: i,
      connections: o,
      groups: s,
      canvasTextBoxes: l,
      canvasDoodleStrokes: d,
      view: u
    }, H.current || (U.current.reset(D.current), H.current = !0);
  });
  const Y = () => {
      k.current && (clearTimeout(k.current), k.current = null), S.current && (clearTimeout(S.current), S.current = null);
    },
    K = () => {
      C.current && (clearTimeout(C.current), C.current = null);
    };
  g.useEffect(() => () => K(), []);
  const W = () => {
      A.current && (clearTimeout(A.current), A.current = null);
    },
    Q = g.useCallback((ye = D.current) => {
      T.current = _re(ye), P.current = kme(ye.view), U.current.commit(ye);
    }, []),
    q = g.useRef(new WeakSet()),
    ne = g.useCallback(ye => {
      var ie;
      !ye.isCurrent() || q.current.has(ye) || (q.current.add(ye), Q(ye.source), U.current.capture(D.current) || (ie = B.current) == null || ie.call(B));
    }, [Q]),
    de = g.useCallback(async (ye, ie) => {
      var he;
      const ae = D.current,
        be = E.current;
      let Ee;
      const xe = await R.current(ye, ie, {
        saveMode: "workflow+assets",
        silent: !0,
        onPersisted: ue => {
          Ee = ue, ne(ue);
        }
      });
      return xe && !Ee && !M.current && be === E.current && (Q(ae), U.current.capture(D.current) || (he = B.current) == null || he.call(B)), {
        id: xe,
        isCurrent: () => Ee ? Ee.isCurrent() : be === E.current
      };
    }, [Q, ne]),
    le = g.useCallback(ye => {
      P.current = kme(ye.view), U.current.commit(ye);
    }, []),
    J = g.useRef(_re({
      nodes: [],
      connections: [],
      groups: [],
      canvasTextBoxes: [],
      canvasDoodleStrokes: []
    })).current,
    pe = g.useCallback(() => {
      K();
      const ye = G.current,
        ie = V.current,
        ae = E.current;
      if (!ye || !ie) return;
      const be = async () => {
        if (C.current = null, !(E.current !== ae || G.current !== ye || V.current !== ie)) {
          try {
            const {
              isCanvasViewInteracting: Ee,
              isCanvasGenerationBurst: xe
            } = await Ie(async () => {
              const {
                isCanvasViewInteracting: he,
                isCanvasGenerationBurst: ue
              } = await Promise.resolve().then(() => W2);
              return {
                isCanvasViewInteracting: he,
                isCanvasGenerationBurst: ue
              };
            }, void 0, import.meta.url);
            if (Ee() || xe() || F.current || N.current || Lnt(D.current.nodes)) {
              C.current = setTimeout(() => void be(), 1500);
              return;
            }
          } catch {
            if (F.current || N.current) {
              C.current = setTimeout(() => void be(), 1500);
              return;
            }
          }
          if (E.current === ae) try {
            const Ee = await de(z.current || "未命名项目", ye);
            if (E.current !== ae) return;
            if (Ee.id == null) {
              C.current = setTimeout(() => void be(), 1500);
              return;
            }
          } catch (Ee) {
            console.warn("[useProjectManagerAutosave] 增量快照压实失败:", Ee);
          }
        }
      };
      C.current = setTimeout(() => void be(), 8e3);
    }, [de]),
    ce = g.useCallback(async () => {
      const ye = j.current;
      if (!G.current || !V.current || !ye) return "unsupported";
      const ie = D.current,
        ae = E.current,
        be = U.current.capture(ie);
      if (!be) return "clean";
      const Ee = await ye(be);
      return E.current !== ae ? "busy" : ((Ee === "saved" || Ee === "compact") && (le(ie), Ee === "compact" && pe()), Ee);
    }, [le, pe]),
    we = g.useCallback(() => U.current.capture(D.current) !== null, []),
    X = g.useCallback(async () => {
      Y(), W(), I.current += 1;
      const ye = E.current;
      let ie = G.current,
        ae = z.current || (O.current || "").trim() || "未命名项目";
      if (!xz()) return !1;
      if (!ie && D.current.nodes.length === 0) return !0;
      for (let he = 0; he < 20 && !(!N.current && !F.current); he++) await new Promise(ue => setTimeout(ue, 150));
      if (E.current !== ye || N.current || F.current) return !1;
      if (ie) {
        let he;
        try {
          he = await ce();
        } catch (ue) {
          return console.warn("[useProjectManagerAutosave] 增量 flush 失败:", ue), !1;
        }
        if (E.current !== ye) return !1;
        if (he === "clean" || he === "saved" || he === "compact") return !we();
        if (he === "busy") return !1;
      }
      const be = _re(D.current),
        Ee = ie ? T.current : J,
        xe = !!ie && kme(L.current) !== P.current;
      if (be === Ee && ie && !xe && !we()) return !0;
      try {
        const he = await de(ae, ie || void 0);
        return he.id == null || !he.isCurrent() ? !1 : !we();
      } catch (he) {
        return console.warn("[useProjectManagerAutosave] flushNow 失败:", he), !1;
      }
    }, [J, de, ce, we]);
  g.useEffect(() => {
    const ye = () => {
        typeof document < "u" && document.visibilityState === "hidden" && X();
      },
      ie = () => {
        X();
      };
    return document.addEventListener("visibilitychange", ye), window.addEventListener("pagehide", ie), () => {
      document.removeEventListener("visibilitychange", ye), window.removeEventListener("pagehide", ie);
    };
  }, [X]);
  const Z = g.useRef(h),
    re = g.useRef(p),
    fe = g.useRef(n);
  return g.useEffect(() => {
    if (!e) {
      T.current = J, P.current = "", U.current.reset(D.current), Z.current = h, re.current = p, fe.current = n;
      return;
    }
    const ye = Z.current && !h,
      ie = re.current && !p,
      ae = fe.current !== n,
      be = r;
    be && !q.current.has(be) && be.isCurrent() && be.projectId === e && be.snapshotId === n ? ne(be) : r === void 0 && (ye || ie || ae) && Q(), Z.current = h, re.current = p, fe.current = n;
  }, [e, n, r, h, p, i, o, s, l, d, J, Q, ne]), g.useEffect(() => {
    if (!v || !_) {
      W();
      return;
    }
    if (!xz()) {
      W();
      return;
    }
    if (h || !e || !t) {
      W();
      return;
    }
    if (kme(u) === P.current) {
      W();
      return;
    }
    const ie = ++I.current;
    return W(), A.current = setTimeout(() => {
      (async () => {
        if (I.current === ie) {
          try {
            const {
              isCanvasViewInteracting: ae,
              isCanvasGenerationBurst: be
            } = await Ie(async () => {
              const {
                isCanvasViewInteracting: Ee,
                isCanvasGenerationBurst: xe
              } = await Promise.resolve().then(() => W2);
              return {
                isCanvasViewInteracting: Ee,
                isCanvasGenerationBurst: xe
              };
            }, void 0, import.meta.url);
            if (ae() || be()) return;
          } catch {}
          if (!(I.current !== ie || F.current || N.current) && G.current && kme(L.current) !== P.current && !Lnt(D.current.nodes)) try {
            const ae = await ce();
            if (ae === "clean" || ae === "saved" || ae === "compact" || ae === "busy" || I.current !== ie) return;
            await de(z.current || "未命名项目", G.current || void 0);
          } catch (ae) {
            console.warn("[useProjectManagerAutosave] 视口静默保存失败:", ae);
          }
        }
      })();
    }, Bya), () => {
      W();
    };
  }, [v, _, e, t, h, u.x, u.y, u.zoom, de, ce]), g.useEffect(() => {
    if (!v || !_) {
      Y();
      return;
    }
    if (!xz()) {
      Y();
      return;
    }
    if (h) {
      Y();
      return;
    }
    if (!!!(e && t) && i.length === 0) {
      Y();
      return;
    }
    const ie = ++I.current,
      ae = (t || a || "未命名项目").trim() || "未命名项目";
    let be = 0;
    const Ee = async () => {
      if (I.current !== ie) return;
      if (typeof window < "u") try {
        const {
          isCanvasViewInteracting: he,
          isCanvasGenerationBurst: ue
        } = await Ie(async () => {
          const {
            isCanvasViewInteracting: ge,
            isCanvasGenerationBurst: _e
          } = await Promise.resolve().then(() => W2);
          return {
            isCanvasViewInteracting: ge,
            isCanvasGenerationBurst: _e
          };
        }, void 0, import.meta.url);
        if (he() || ue()) {
          S.current = setTimeout(() => {
            Ee();
          }, HTe);
          return;
        }
      } catch {}
      if (I.current !== ie) return;
      if (Lnt(D.current.nodes)) {
        S.current = setTimeout(() => {
          Ee();
        }, Fya);
        return;
      }
      if (F.current || N.current) {
        S.current = setTimeout(() => {
          Ee();
        }, HTe);
        return;
      }
      const xe = !!G.current;
      if (!(!xe && D.current.nodes.length === 0)) try {
        if (xe) {
          const ue = await ce();
          if (ue === "clean" || ue === "saved" || ue === "compact") {
            be = 0;
            return;
          }
          if (ue === "busy") {
            S.current = setTimeout(() => {
              Ee();
            }, HTe);
            return;
          }
        } else if (_re(D.current) === J) return;
        if (I.current !== ie) return;
        const he = await de(xe && z.current || ae, xe && G.current || void 0);
        if (I.current !== ie) return;
        if (he.id == null) {
          S.current = setTimeout(() => {
            Ee();
          }, HTe);
          return;
        }
        be = 0;
      } catch (he) {
        console.warn("[useProjectManagerAutosave] 静默保存失败:", he), be += 1, I.current === ie && be <= Uya && (S.current = setTimeout(() => {
          Ee();
        }, zya * be));
      }
    };
    return Y(), k.current = setTimeout(() => {
      Ee();
    }, b), () => {
      Y();
    };
  }, [v, _, e, t, a, i, o, s, l, d, h, b, J, de, ce]), {
    flushNow: X,
    hasPendingChanges: we
  };
}

const vJt = 8e3;

async function vNe(e) {
  try {
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
    await t("quit_app");
  } catch (t) {
    console.error("Failed to exit Tauri process, falling back to window destroy:", t), await e.destroy();
  }
}

let wNe = null;

function Hya(e) {
  return wNe = e, () => {
    wNe === e && (wNe = null);
  };
}

function Wya() {
  g.useEffect(() => {
    if (typeof window > "u" || !y5e(window)) return;
    const e = [];
    let t = !1,
      n = !1;
    return (async () => {
      try {
        const {
            getCurrentWindow: a
          } = await Ie(async () => {
            const {
              getCurrentWindow: d
            } = await Promise.resolve().then(() => ede);
            return {
              getCurrentWindow: d
            };
          }, void 0, import.meta.url),
          i = a(),
          {
            invoke: o
          } = await Ie(async () => {
            const {
              invoke: d
            } = await Promise.resolve().then(() => sd);
            return {
              invoke: d
            };
          }, void 0, import.meta.url),
          s = async () => {
            if (!n) {
              n = !0;
              try {
                const d = wNe;
                d ? await d(i) : await vNe(i);
              } finally {
                n = !1;
              }
            }
          },
          l = async (d, u) => {
            const h = await i.listen(d, u);
            t ? h() : e.push(h);
          };
        await l("atelier-tray-quit", s), await l("tauri://close-requested", async () => {
          (await o("hide_to_system_tray").catch(() => !1)) || (await s());
        });
      } catch (a) {
        console.error("Setup desktop close failed:", a);
      }
    })(), () => {
      t = !0, e.forEach(a => a());
    };
  }, []);
}

function qya({
  nodesRef: e,
  connectionsRef: t,
  groupsRef: n,
  canvasTextBoxesRef: r,
  canvasDoodleStrokesRef: a,
  savedProjectSignatureRef: i,
  hasPendingProjectChanges: o,
  hasSavedProjectRef: s,
  flushProjectAutosave: l
}) {
  const d = g.useRef(!1),
    u = g.useRef(l);
  u.current = l;
  const h = g.useRef(o);
  h.current = o;
  const p = async () => {
      try {
        const f = u.current;
        f && (await Promise.race([f(), new Promise(b => setTimeout(() => b(!1), vJt))]));
        const y = window.__qdmEmergencySave;
        typeof y == "function" && e.current.length > 0 && !s.current && (await Promise.race([y("window-close"), new Promise(b => setTimeout(() => b(null), vJt))]));
      } catch (f) {
        console.warn("[useTauriWindowCloseWarning] flush before quit failed:", f);
      }
    },
    m = g.useRef(async () => {});
  m.current = async f => {
    if (d.current) return;
    const y = e.current,
      b = h.current ? h.current() : _re({
        nodes: y,
        connections: t.current,
        groups: n.current,
        canvasTextBoxes: r.current,
        canvasDoodleStrokes: a.current
      }) !== i.current,
      v = !!s.current;
    if (y.length > 0 && b) {
      try {
        d.current = !0;
        const {
            ask: w
          } = await Ie(async () => {
            const {
              ask: C
            } = await Promise.resolve().then(() => Sb);
            return {
              ask: C
            };
          }, void 0, import.meta.url),
          k = v ? "你有未保存的更改，关闭前将尝试自动写入项目管理。" : "你还没有保存过工作流！关闭前将尝试紧急保存到项目管理。",
          A = `画布上有 ${y.length} 个节点，确定要关闭吗？

${k}`;
        (await w(A, {
          title: "确认关闭",
          kind: "warning",
          okLabel: "关闭",
          cancelLabel: "取消"
        })) ? (await p(), await vNe(f)) : d.current = !1;
      } catch (w) {
        console.error("Dialog error:", w), d.current = !1, await p(), await vNe(f);
      }
      return;
    }
    await p(), await vNe(f);
  }, g.useEffect(() => {
    if (!(typeof window > "u" || !y5e(window))) return Hya(f => m.current(f));
  }, []);
}

class rjt {
  constructor(...t) {
    this.type = "Logical", t.length === 1 ? "Logical" in t[0] ? (this.width = t[0].Logical.width, this.height = t[0].Logical.height) : (this.width = t[0].width, this.height = t[0].height) : (this.width = t[0], this.height = t[1]);
  }
  toPhysical(t) {
    return new jz(this.width * t, this.height * t);
  }
  [a_]() {
    return {
      width: this.width,
      height: this.height
    };
  }
  toJSON() {
    return this[a_]();
  }
}

class jz {
  constructor(...t) {
    this.type = "Physical", t.length === 1 ? "Physical" in t[0] ? (this.width = t[0].Physical.width, this.height = t[0].Physical.height) : (this.width = t[0].width, this.height = t[0].height) : (this.width = t[0], this.height = t[1]);
  }
  toLogical(t) {
    return new rjt(this.width / t, this.height / t);
  }
  [a_]() {
    return {
      width: this.width,
      height: this.height
    };
  }
  toJSON() {
    return this[a_]();
  }
}

class Cee {
  constructor(t) {
    this.size = t;
  }
  toLogical(t) {
    return this.size instanceof rjt ? this.size : this.size.toLogical(t);
  }
  toPhysical(t) {
    return this.size instanceof jz ? this.size : this.size.toPhysical(t);
  }
  [a_]() {
    return {
      [`${this.size.type}`]: {
        width: this.size.width,
        height: this.size.height
      }
    };
  }
  toJSON() {
    return this[a_]();
  }
}

class ajt {
  constructor(...t) {
    this.type = "Logical", t.length === 1 ? "Logical" in t[0] ? (this.x = t[0].Logical.x, this.y = t[0].Logical.y) : (this.x = t[0].x, this.y = t[0].y) : (this.x = t[0], this.y = t[1]);
  }
  toPhysical(t) {
    return new r5(this.x * t, this.y * t);
  }
  [a_]() {
    return {
      x: this.x,
      y: this.y
    };
  }
  toJSON() {
    return this[a_]();
  }
}

class r5 {
  constructor(...t) {
    this.type = "Physical", t.length === 1 ? "Physical" in t[0] ? (this.x = t[0].Physical.x, this.y = t[0].Physical.y) : (this.x = t[0].x, this.y = t[0].y) : (this.x = t[0], this.y = t[1]);
  }
  toLogical(t) {
    return new ajt(this.x / t, this.y / t);
  }
  [a_]() {
    return {
      x: this.x,
      y: this.y
    };
  }
  toJSON() {
    return this[a_]();
  }
}

class WTe {
  constructor(t) {
    this.position = t;
  }
  toLogical(t) {
    return this.position instanceof ajt ? this.position : this.position.toLogical(t);
  }
  toPhysical(t) {
    return this.position instanceof r5 ? this.position : this.position.toPhysical(t);
  }
  [a_]() {
    return {
      [`${this.position.type}`]: {
        x: this.position.x,
        y: this.position.y
      }
    };
  }
  toJSON() {
    return this[a_]();
  }
}

let Kya = class xNe extends fVe {
  constructor(t) {
    super(t);
  }
  static async new(t, n, r) {
    return Fr("plugin:image|new", {
      rgba: DFe(t),
      width: n,
      height: r
    }).then(a => new xNe(a));
  }
  static async fromBytes(t) {
    return Fr("plugin:image|from_bytes", {
      bytes: DFe(t)
    }).then(n => new xNe(n));
  }
  static async fromPath(t) {
    return Fr("plugin:image|from_path", {
      path: t
    }).then(n => new xNe(n));
  }
  async rgba() {
    return Fr("plugin:image|rgba", {
      rid: this.rid
    }).then(t => new Uint8Array(t));
  }
  async size() {
    return Fr("plugin:image|size", {
      rid: this.rid
    });
  }
};

function DFe(e) {
  return e == null ? null : typeof e == "string" ? e : e instanceof Kya ? e.rid : e;
}

var LFe;

(function (e) {
  e[e.Critical = 1] = "Critical", e[e.Informational = 2] = "Informational";
})(LFe || (LFe = {}));

class SWn {
  constructor(t) {
    this._preventDefault = !1, this.event = t.event, this.id = t.id;
  }
  preventDefault() {
    this._preventDefault = !0;
  }
  isPreventDefault() {
    return this._preventDefault;
  }
}

var hbt;

(function (e) {
  e.None = "none", e.Normal = "normal", e.Indeterminate = "indeterminate", e.Paused = "paused", e.Error = "error";
})(hbt || (hbt = {}));

function ijt() {
  return new ojt(window.__TAURI_INTERNALS__.metadata.currentWindow.label, {
    skip: !0
  });
}

async function _Ne() {
  return Fr("plugin:window|get_all_windows").then(e => e.map(t => new ojt(t, {
    skip: !0
  })));
}

const Ont = ["tauri://created", "tauri://error"];

class ojt {
  constructor(t, n = {}) {
    var r;
    this.label = t, this.listeners = Object.create(null), n != null && n.skip || Fr("plugin:window|create", {
      options: {
        ...n,
        parent: typeof n.parent == "string" ? n.parent : (r = n.parent) === null || r === void 0 ? void 0 : r.label,
        label: t
      }
    }).then(async () => this.emit("tauri://created")).catch(async a => this.emit("tauri://error", a));
  }
  static async getByLabel(t) {
    var n;
    return (n = (await _Ne()).find(r => r.label === t)) !== null && n !== void 0 ? n : null;
  }
  static getCurrent() {
    return ijt();
  }
  static async getAll() {
    return _Ne();
  }
  static async getFocusedWindow() {
    for (const t of await _Ne()) if (await t.isFocused()) return t;
    return null;
  }
  async listen(t, n) {
    return this._handleTauriEvent(t, n) ? () => {
      const r = this.listeners[t];
      r.splice(r.indexOf(n), 1);
    } : JM(t, n, {
      target: {
        kind: "Window",
        label: this.label
      }
    });
  }
  async once(t, n) {
    return this._handleTauriEvent(t, n) ? () => {
      const r = this.listeners[t];
      r.splice(r.indexOf(n), 1);
    } : xBn(t, n, {
      target: {
        kind: "Window",
        label: this.label
      }
    });
  }
  async emit(t, n) {
    if (Ont.includes(t)) {
      for (const r of this.listeners[t] || []) r({
        event: t,
        id: -1,
        payload: n
      });
      return;
    }
    return _Bn(t, n);
  }
  async emitTo(t, n, r) {
    if (Ont.includes(n)) {
      for (const a of this.listeners[n] || []) a({
        event: n,
        id: -1,
        payload: r
      });
      return;
    }
    return kBn(t, n, r);
  }
  _handleTauriEvent(t, n) {
    return Ont.includes(t) ? (t in this.listeners ? this.listeners[t].push(n) : this.listeners[t] = [n], !0) : !1;
  }
  async scaleFactor() {
    return Fr("plugin:window|scale_factor", {
      label: this.label
    });
  }
  async innerPosition() {
    return Fr("plugin:window|inner_position", {
      label: this.label
    }).then(t => new r5(t));
  }
  async outerPosition() {
    return Fr("plugin:window|outer_position", {
      label: this.label
    }).then(t => new r5(t));
  }
  async innerSize() {
    return Fr("plugin:window|inner_size", {
      label: this.label
    }).then(t => new jz(t));
  }
  async outerSize() {
    return Fr("plugin:window|outer_size", {
      label: this.label
    }).then(t => new jz(t));
  }
  async isFullscreen() {
    return Fr("plugin:window|is_fullscreen", {
      label: this.label
    });
  }
  async isMinimized() {
    return Fr("plugin:window|is_minimized", {
      label: this.label
    });
  }
  async isMaximized() {
    return Fr("plugin:window|is_maximized", {
      label: this.label
    });
  }
  async isFocused() {
    return Fr("plugin:window|is_focused", {
      label: this.label
    });
  }
  async isDecorated() {
    return Fr("plugin:window|is_decorated", {
      label: this.label
    });
  }
  async isResizable() {
    return Fr("plugin:window|is_resizable", {
      label: this.label
    });
  }
  async isMaximizable() {
    return Fr("plugin:window|is_maximizable", {
      label: this.label
    });
  }
  async isMinimizable() {
    return Fr("plugin:window|is_minimizable", {
      label: this.label
    });
  }
  async isClosable() {
    return Fr("plugin:window|is_closable", {
      label: this.label
    });
  }
  async isVisible() {
    return Fr("plugin:window|is_visible", {
      label: this.label
    });
  }
  async title() {
    return Fr("plugin:window|title", {
      label: this.label
    });
  }
  async theme() {
    return Fr("plugin:window|theme", {
      label: this.label
    });
  }
  async isAlwaysOnTop() {
    return Fr("plugin:window|is_always_on_top", {
      label: this.label
    });
  }
  async center() {
    return Fr("plugin:window|center", {
      label: this.label
    });
  }
  async requestUserAttention(t) {
    let n = null;
    return t && (t === LFe.Critical ? n = {
      type: "Critical"
    } : n = {
      type: "Informational"
    }), Fr("plugin:window|request_user_attention", {
      label: this.label,
      value: n
    });
  }
  async setResizable(t) {
    return Fr("plugin:window|set_resizable", {
      label: this.label,
      value: t
    });
  }
  async setEnabled(t) {
    return Fr("plugin:window|set_enabled", {
      label: this.label,
      value: t
    });
  }
  async isEnabled() {
    return Fr("plugin:window|is_enabled", {
      label: this.label
    });
  }
  async setMaximizable(t) {
    return Fr("plugin:window|set_maximizable", {
      label: this.label,
      value: t
    });
  }
  async setMinimizable(t) {
    return Fr("plugin:window|set_minimizable", {
      label: this.label,
      value: t
    });
  }
  async setClosable(t) {
    return Fr("plugin:window|set_closable", {
      label: this.label,
      value: t
    });
  }
  async setTitle(t) {
    return Fr("plugin:window|set_title", {
      label: this.label,
      value: t
    });
  }
  async maximize() {
    return Fr("plugin:window|maximize", {
      label: this.label
    });
  }
  async unmaximize() {
    return Fr("plugin:window|unmaximize", {
      label: this.label
    });
  }
  async toggleMaximize() {
    return Fr("plugin:window|toggle_maximize", {
      label: this.label
    });
  }
  async minimize() {
    return Fr("plugin:window|minimize", {
      label: this.label
    });
  }
  async unminimize() {
    return Fr("plugin:window|unminimize", {
      label: this.label
    });
  }
  async show() {
    return Fr("plugin:window|show", {
      label: this.label
    });
  }
  async hide() {
    return Fr("plugin:window|hide", {
      label: this.label
    });
  }
  async close() {
    return Fr("plugin:window|close", {
      label: this.label
    });
  }
  async destroy() {
    return Fr("plugin:window|destroy", {
      label: this.label
    });
  }
  async setDecorations(t) {
    return Fr("plugin:window|set_decorations", {
      label: this.label,
      value: t
    });
  }
  async setShadow(t) {
    return Fr("plugin:window|set_shadow", {
      label: this.label,
      value: t
    });
  }
  async setEffects(t) {
    return Fr("plugin:window|set_effects", {
      label: this.label,
      value: t
    });
  }
  async clearEffects() {
    return Fr("plugin:window|set_effects", {
      label: this.label,
      value: null
    });
  }
  async setAlwaysOnTop(t) {
    return Fr("plugin:window|set_always_on_top", {
      label: this.label,
      value: t
    });
  }
  async setAlwaysOnBottom(t) {
    return Fr("plugin:window|set_always_on_bottom", {
      label: this.label,
      value: t
    });
  }
  async setContentProtected(t) {
    return Fr("plugin:window|set_content_protected", {
      label: this.label,
      value: t
    });
  }
  async setSize(t) {
    return Fr("plugin:window|set_size", {
      label: this.label,
      value: t instanceof Cee ? t : new Cee(t)
    });
  }
  async setMinSize(t) {
    return Fr("plugin:window|set_min_size", {
      label: this.label,
      value: t instanceof Cee ? t : t ? new Cee(t) : null
    });
  }
  async setMaxSize(t) {
    return Fr("plugin:window|set_max_size", {
      label: this.label,
      value: t instanceof Cee ? t : t ? new Cee(t) : null
    });
  }
  async setSizeConstraints(t) {
    function n(r) {
      return r ? {
        Logical: r
      } : null;
    }
    return Fr("plugin:window|set_size_constraints", {
      label: this.label,
      value: {
        minWidth: n(t == null ? void 0 : t.minWidth),
        minHeight: n(t == null ? void 0 : t.minHeight),
        maxWidth: n(t == null ? void 0 : t.maxWidth),
        maxHeight: n(t == null ? void 0 : t.maxHeight)
      }
    });
  }
  async setPosition(t) {
    return Fr("plugin:window|set_position", {
      label: this.label,
      value: t instanceof WTe ? t : new WTe(t)
    });
  }
  async setFullscreen(t) {
    return Fr("plugin:window|set_fullscreen", {
      label: this.label,
      value: t
    });
  }
  async setSimpleFullscreen(t) {
    return Fr("plugin:window|set_simple_fullscreen", {
      label: this.label,
      value: t
    });
  }
  async setFocus() {
    return Fr("plugin:window|set_focus", {
      label: this.label
    });
  }
  async setFocusable(t) {
    return Fr("plugin:window|set_focusable", {
      label: this.label,
      value: t
    });
  }
  async setIcon(t) {
    return Fr("plugin:window|set_icon", {
      label: this.label,
      value: DFe(t)
    });
  }
  async setSkipTaskbar(t) {
    return Fr("plugin:window|set_skip_taskbar", {
      label: this.label,
      value: t
    });
  }
  async setCursorGrab(t) {
    return Fr("plugin:window|set_cursor_grab", {
      label: this.label,
      value: t
    });
  }
  async setCursorVisible(t) {
    return Fr("plugin:window|set_cursor_visible", {
      label: this.label,
      value: t
    });
  }
  async setCursorIcon(t) {
    return Fr("plugin:window|set_cursor_icon", {
      label: this.label,
      value: t
    });
  }
  async setBackgroundColor(t) {
    return Fr("plugin:window|set_background_color", {
      color: t
    });
  }
  async setCursorPosition(t) {
    return Fr("plugin:window|set_cursor_position", {
      label: this.label,
      value: t instanceof WTe ? t : new WTe(t)
    });
  }
  async setIgnoreCursorEvents(t) {
    return Fr("plugin:window|set_ignore_cursor_events", {
      label: this.label,
      value: t
    });
  }
  async startDragging() {
    return Fr("plugin:window|start_dragging", {
      label: this.label
    });
  }
  async startResizeDragging(t) {
    return Fr("plugin:window|start_resize_dragging", {
      label: this.label,
      value: t
    });
  }
  async setBadgeCount(t) {
    return Fr("plugin:window|set_badge_count", {
      label: this.label,
      value: t
    });
  }
  async setBadgeLabel(t) {
    return Fr("plugin:window|set_badge_label", {
      label: this.label,
      value: t
    });
  }
  async setOverlayIcon(t) {
    return Fr("plugin:window|set_overlay_icon", {
      label: this.label,
      value: t ? DFe(t) : void 0
    });
  }
  async setProgressBar(t) {
    return Fr("plugin:window|set_progress_bar", {
      label: this.label,
      value: t
    });
  }
  async setVisibleOnAllWorkspaces(t) {
    return Fr("plugin:window|set_visible_on_all_workspaces", {
      label: this.label,
      value: t
    });
  }
  async setTitleBarStyle(t) {
    return Fr("plugin:window|set_title_bar_style", {
      label: this.label,
      value: t
    });
  }
  async setTheme(t) {
    return Fr("plugin:window|set_theme", {
      label: this.label,
      value: t
    });
  }
  async onResized(t) {
    return this.listen(W_.WINDOW_RESIZED, n => {
      n.payload = new jz(n.payload), t(n);
    });
  }
  async onMoved(t) {
    return this.listen(W_.WINDOW_MOVED, n => {
      n.payload = new r5(n.payload), t(n);
    });
  }
  async onCloseRequested(t) {
    return this.listen(W_.WINDOW_CLOSE_REQUESTED, async n => {
      const r = new SWn(n);
      await t(r), r.isPreventDefault() || (await this.destroy());
    });
  }
  async onDragDropEvent(t) {
    const n = await this.listen(W_.DRAG_ENTER, o => {
        t({
          ...o,
          payload: {
            type: "enter",
            paths: o.payload.paths,
            position: new r5(o.payload.position)
          }
        });
      }),
      r = await this.listen(W_.DRAG_OVER, o => {
        t({
          ...o,
          payload: {
            type: "over",
            position: new r5(o.payload.position)
          }
        });
      }),
      a = await this.listen(W_.DRAG_DROP, o => {
        t({
          ...o,
          payload: {
            type: "drop",
            paths: o.payload.paths,
            position: new r5(o.payload.position)
          }
        });
      }),
      i = await this.listen(W_.DRAG_LEAVE, o => {
        t({
          ...o,
          payload: {
            type: "leave"
          }
        });
      });
    return () => {
      n(), a(), r(), i();
    };
  }
  async onFocusChanged(t) {
    const n = await this.listen(W_.WINDOW_FOCUS, a => {
        t({
          ...a,
          payload: !0
        });
      }),
      r = await this.listen(W_.WINDOW_BLUR, a => {
        t({
          ...a,
          payload: !1
        });
      });
    return () => {
      n(), r();
    };
  }
  async onScaleChanged(t) {
    return this.listen(W_.WINDOW_SCALE_FACTOR_CHANGED, t);
  }
  async onThemeChanged(t) {
    return this.listen(W_.WINDOW_THEME_CHANGED, t);
  }
}

var wJt;

(function (e) {
  e.Disabled = "disabled", e.Throttle = "throttle", e.Suspend = "suspend";
})(wJt || (wJt = {}));

var xJt;

(function (e) {
  e.Default = "default", e.FluentOverlay = "fluentOverlay";
})(xJt || (xJt = {}));

var pbt;

(function (e) {
  e.AppearanceBased = "appearanceBased", e.Light = "light", e.Dark = "dark", e.MediumLight = "mediumLight", e.UltraDark = "ultraDark", e.Titlebar = "titlebar", e.Selection = "selection", e.Menu = "menu", e.Popover = "popover", e.Sidebar = "sidebar", e.HeaderView = "headerView", e.Sheet = "sheet", e.WindowBackground = "windowBackground", e.HudWindow = "hudWindow", e.FullScreenUI = "fullScreenUI", e.Tooltip = "tooltip", e.ContentBackground = "contentBackground", e.UnderWindowBackground = "underWindowBackground", e.UnderPageBackground = "underPageBackground", e.Mica = "mica", e.Blur = "blur", e.Acrylic = "acrylic", e.Tabbed = "tabbed", e.TabbedDark = "tabbedDark", e.TabbedLight = "tabbedLight";
})(pbt || (pbt = {}));

var mbt;

(function (e) {
  e.FollowsWindowActiveState = "followsWindowActiveState", e.Active = "active", e.Inactive = "inactive";
})(mbt || (mbt = {}));

function NYe(e) {
  return e === null ? null : {
    name: e.name,
    scaleFactor: e.scaleFactor,
    position: new r5(e.position),
    size: new jz(e.size),
    workArea: {
      position: new r5(e.workArea.position),
      size: new jz(e.workArea.size)
    }
  };
}

async function Qya() {
  return Fr("plugin:window|current_monitor").then(NYe);
}

async function Yya() {
  return Fr("plugin:window|primary_monitor").then(NYe);
}

async function Xya(e, t) {
  return Fr("plugin:window|monitor_from_point", {
    x: e,
    y: t
  }).then(NYe);
}

async function Jya() {
  return Fr("plugin:window|available_monitors").then(e => e.map(NYe));
}

async function Zya() {
  return Fr("plugin:window|cursor_position").then(e => new r5(e));
}

const ede = Object.freeze(Object.defineProperty({
  __proto__: null,
  CloseRequestedEvent: SWn,
  get Effect() {
    return pbt;
  },
  get EffectState() {
    return mbt;
  },
  LogicalPosition: ajt,
  LogicalSize: rjt,
  PhysicalPosition: r5,
  PhysicalSize: jz,
  get ProgressBarStatus() {
    return hbt;
  },
  get UserAttentionType() {
    return LFe;
  },
  Window: ojt,
  availableMonitors: Jya,
  currentMonitor: Qya,
  cursorPosition: Zya,
  getAllWindows: _Ne,
  getCurrentWindow: ijt,
  monitorFromPoint: Xya,
  primaryMonitor: Yya
}, Symbol.toStringTag, {
  value: "Module"
}));

function eba(e, t, n, r) {
  const a = o => [...o].sort((s, l) => l.updatedAt - s.updatedAt).slice(0, 3),
    i = t.filter(o => !o.archived && Tx(o));
  return {
    theme: n,
    items: [...a(e).map(o => ({
      kind: "project",
      id: o.id,
      title: o.name,
      busy: r.canvas.has(o.id)
    })), ...a(i.filter(o => o.kind === "chat")).map(o => ({
      kind: "chat",
      id: o.id,
      title: o.title,
      busy: r.chat.has(o.id)
    })), ...a(i.filter(o => o.kind === "local-skill" && o.rootPath)).map(o => ({
      kind: "harness",
      id: o.id,
      title: o.title,
      busy: r.skill.has(o.id)
    }))]
  };
}

function tba(e, t) {
  const n = g.useRef({
    projects: e,
    theme: t
  });
  n.current = {
    projects: e,
    theme: t
  };
  const r = g.useRef(() => {});
  g.useEffect(() => r.current(), [e, t]), g.useEffect(() => {
    if (!y5e(window) || o3()) return;
    let a = !1,
      i,
      o = "";
    const s = [],
      l = () => {
        clearTimeout(i), i = setTimeout(() => {
          const d = eba(n.current.projects, xy(), n.current.theme, LKe()),
            u = JSON.stringify(d);
          u === o || a || (o = u, Fr("sync_system_tray", {
            snapshot: d
          }).catch(h => {
            o = "", console.warn("[system-tray] 同步失败", h);
          }));
        }, 120);
      };
    return (async () => {
      if (!(await Fr("system_tray_available")) || a) return;
      const d = await ijt().listen("atelier-tray-open", ({
        payload: u
      }) => {
        if (a) return;
        if (u.kind === "project") {
          const m = n.current.projects.find(f => f.id === u.id);
          m ? iP(m.id, m.name) : qi("该项目已不在最近项目中");
          return;
        }
        const h = u.kind === "harness" ? "local-skill" : "chat",
          p = xy().find(m => m.id === u.id && m.kind === h && !m.archived && Tx(m));
        if (!p) {
          qi("该对话已删除或归档"), l();
          return;
        }
        DE(h), h === "chat" ? DQe(p.id) : p.rootPath && $Ie(p.rootPath, p.id, BIe(void 0, "studio-home").some(m => e_(m, p.rootPath))), gy(!1);
      });
      if (a) {
        d();
        return;
      }
      s.push(d, eNt(l), w9t(l)), r.current = l, l();
    })().catch(d => console.warn("[system-tray] 初始化失败", d)), () => {
      a = !0, clearTimeout(i), r.current = () => {}, s.forEach(d => d());
    };
  }, []);
}

const nba = 208,
  A0e = 8,
  rba = 9,
  aba = 11,
  _Jt = {
    width: 1536,
    height: 1872
  },
  kJt = {
    width: 1536,
    height: 2288
  },
  AJt = [{
    id: "idle",
    row: 0,
    frames: 6,
    fps: 7,
    label: "待机"
  }, {
    id: "running-right",
    row: 1,
    frames: 8,
    fps: 12,
    label: "向右跑"
  }, {
    id: "running-left",
    row: 2,
    frames: 8,
    fps: 12,
    label: "向左跑"
  }, {
    id: "waving",
    row: 3,
    frames: 4,
    fps: 8,
    label: "挥手"
  }, {
    id: "jumping",
    row: 4,
    frames: 5,
    fps: 10,
    label: "跳跃"
  }, {
    id: "failed",
    row: 5,
    frames: 8,
    fps: 8,
    label: "失落"
  }, {
    id: "waiting",
    row: 6,
    frames: 6,
    fps: 7,
    label: "等待"
  }, {
    id: "running",
    row: 7,
    frames: 6,
    fps: 8,
    label: "思考"
  }, {
    id: "review",
    row: 8,
    frames: 6,
    fps: 7,
    label: "完成"
  }],
  Bnt = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5];

class BE extends Error {
  constructor(t) {
    super(t), this.name = "CodexPetFormatError";
  }
}

function iba(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) throw new BE("pet.json 必须是对象");
  return e;
}

function oba(e) {
  return e.trim().toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-").replace(/^-+|-+$/g, "") || `pet-${Date.now().toString(36)}`;
}

function OFe(e, t = "imported-pet") {
  const n = iba(e),
    r = String(n.displayName || n.name || t).trim() || t,
    a = String(n.spritesheetPath || n.spritesheet || "spritesheet.webp").trim(),
    i = n.spriteVersionNumber,
    o = i === 2 || i === "2" ? 2 : 1;
  if (!a) throw new BE("pet.json 缺少 spritesheetPath");
  return {
    id: oba(String(n.id || r || t)),
    displayName: r,
    description: String(n.description || "").trim(),
    spriteVersionNumber: o,
    spritesheetPath: a
  };
}

function sba(e, t, n) {
  if (!Number.isFinite(e) || !Number.isFinite(t) || e < A0e || t < nba) throw new BE("图集尺寸无效");
  const r = t / e,
    a = kJt.height / kJt.width,
    i = _Jt.height / _Jt.width;
  return Math.abs(r - a) <= .04 ? 2 : Math.abs(r - i) <= .04 ? 1 : n === 2 || n === 1 ? n : t / e > (i + a) / 2 ? 2 : 1;
}

function sjt(e, t, n) {
  const r = sba(e, t, n),
    a = r === 2 ? aba : rba;
  if (e % A0e !== 0) throw new BE(`图集宽度必须能被 ${A0e} 整除`);
  const i = e / A0e,
    o = t / a;
  if (o <= 0 || Math.abs(o - Math.round(o)) > .51) throw new BE(`图集高度 ${t} 无法均分成 ${a} 行`);
  return {
    version: r,
    cols: A0e,
    rows: a,
    cellW: i,
    cellH: Math.round(o),
    width: e,
    height: t,
    hasLookRows: r === 2
  };
}

function IWn(e) {
  return AJt.find(t => t.id === e) ?? AJt[0];
}

function lba(e) {
  const t = (e % 360 + 360) % 360;
  let n = 0,
    r = 360;
  for (let a = 0; a < Bnt.length; a++) {
    const i = Math.min(Math.abs(t - Bnt[a]), 360 - Math.abs(t - Bnt[a]));
    i < r && (n = a, r = i);
  }
  return n;
}

function cba(e, t, n = 36) {
  if (!Number.isFinite(e) || !Number.isFinite(t) || Math.hypot(e, t) < n) return null;
  const r = Math.atan2(e, -t) * 180 / Math.PI;
  return lba(r);
}

function dba(e) {
  const t = (e % 16 + 16) % 16;
  return {
    row: t < 8 ? 9 : 10,
    col: t % 8
  };
}

function CWn(e) {
  return /^(spritesheet|sprite-sheet)\.(webp|png)$/i.test(e.trim());
}

function uba(e) {
  return /^pet\.json$/i.test(e.trim());
}

const EWn = "qiaodoumayi_desktop_pet_v1",
  TWn = "qiaodoumayi_desktop_pets_index_v1",
  hba = "qiaodoumayi-desktop-pet-changed",
  BFe = "codex";

function ljt(e) {
  const t = Math.round(Number(e));
  return Number.isFinite(t) ? Math.min(240, Math.max(1, t)) : 60;
}

const rCe = [["codex", "Codex · 小机器人", "蓝色的 Codex 创作伙伴。"], ["dewey", "Dewey · 小水滴", "安静陪伴创作的小水滴。"], ["fireball", "Fireball · 小火苗", "充满活力的小火苗。"], ["hoots", "Hoots · 猫头鹰", "专注细节的猫头鹰伙伴。"], ["rocky", "Rocky · 小石头", "稳稳陪你完成任务的小石头。"], ["seedy", "Seedy · 小芽苗", "陪新灵感一起发芽的小伙伴。"], ["stacky", "Stacky · 叠叠机器人", "陪你专注工作的叠叠机器人。"], ["bsod", "BSOD · 蓝屏小伙伴", "调皮的蓝屏小伙伴。"], ["null-signal", "Null Signal · 静默信号", "安静陪伴的黑色小机器人。"]].map(([e, t, n]) => ({
    id: e,
    displayName: t,
    description: n,
    spriteVersionNumber: 2,
    spritesheetPath: "spritesheet.webp",
    source: "bundled",
    spritesheetUrl: `/desktop-pets/${e}/spritesheet.webp`
  })),
  pba = rCe[0],
  MWn = e => rCe.some(t => t.id === e),
  FFe = {
    enabled: !0,
    size: "medium",
    activePetId: BFe,
    pos: null,
    linkMode: "all",
    lookAtPointer: !0,
    hoverAnimate: !1,
    personality: "温柔、活泼、简洁的画布创作伙伴，称呼自己为小优。",
    notifyGeneration: !0,
    notifyAgent: !0,
    notifyCanvas: !1,
    hourlyChime: !1,
    chimeIntervalMinutes: 60,
    speakReplies: !1,
    speakNotifications: !1
  },
  fbt = new Set();

let cjt = FFe,
  djt = rCe,
  zFe = !1;

function PWn(e) {
  try {
    return typeof localStorage > "u" ? null : localStorage.getItem(e);
  } catch {
    return null;
  }
}

function RWn(e, t) {
  try {
    typeof localStorage < "u" && localStorage.setItem(e, t);
  } catch {}
}

function NWn() {
  for (const e of fbt) e();
  typeof window < "u" && window.dispatchEvent(new CustomEvent(hba));
}

function jWn(e, t) {
  if (!e) return t;
  try {
    return JSON.parse(e);
  } catch {
    return t;
  }
}

function DWn(e) {
  const t = (e == null ? void 0 : e.size) === "small" || (e == null ? void 0 : e.size) === "large" ? e.size : "medium",
    n = (e == null ? void 0 : e.linkMode) === "generate" || (e == null ? void 0 : e.linkMode) === "off" ? e.linkMode : "all",
    r = e != null && e.pos && Number.isFinite(e.pos.x) && Number.isFinite(e.pos.y) ? {
      x: e.pos.x,
      y: e.pos.y
    } : null;
  return {
    enabled: (e == null ? void 0 : e.enabled) === !0,
    size: t,
    activePetId: (e == null ? void 0 : e.activePetId) === "miaomiao" ? BFe : String((e == null ? void 0 : e.activePetId) || BFe),
    pos: r,
    linkMode: n,
    lookAtPointer: (e == null ? void 0 : e.lookAtPointer) !== !1,
    hoverAnimate: (e == null ? void 0 : e.hoverAnimate) === !0,
    personality: typeof (e == null ? void 0 : e.personality) == "string" ? e.personality.slice(0, 2e3) : FFe.personality,
    notifyGeneration: (e == null ? void 0 : e.notifyGeneration) !== !1,
    notifyAgent: (e == null ? void 0 : e.notifyAgent) !== !1,
    notifyCanvas: (e == null ? void 0 : e.notifyCanvas) === !0,
    hourlyChime: (e == null ? void 0 : e.hourlyChime) === !0,
    chimeIntervalMinutes: ljt((e == null ? void 0 : e.chimeIntervalMinutes) ?? FFe.chimeIntervalMinutes),
    speakReplies: (e == null ? void 0 : e.speakReplies) === !0,
    speakNotifications: (e == null ? void 0 : e.speakNotifications) === !0
  };
}

function mba() {
  const e = PWn(EWn);
  return e ? DWn(jWn(e, {})) : FFe;
}

function fba() {
  const e = jWn(PWn(TWn), []).filter(t => t && t.source === "imported" && t.id && !MWn(t.id));
  return [...rCe, ...e];
}

function LWn() {
  zFe || (cjt = mba(), djt = fba(), zFe = !0);
}

function YX() {
  return LWn(), cjt;
}

function $8(e) {
  const t = DWn({
    ...YX(),
    ...e
  });
  return cjt = t, zFe = !0, RWn(EWn, JSON.stringify(t)), NWn(), t;
}

function x_e() {
  return LWn(), djt;
}

function OWn(e) {
  const t = e.filter(n => n.source === "imported" && !MWn(n.id));
  djt = [...rCe, ...t], zFe = !0, RWn(TWn, JSON.stringify(t)), NWn();
}

function gba(e) {
  const t = x_e().filter(r => r.id !== e.id || r.source === "bundled"),
    n = [...t.filter(r => r.source === "bundled"), e, ...t.filter(r => r.source === "imported" && r.id !== e.id)];
  return OWn(n), n;
}

function yba(e) {
  const t = x_e().filter(r => r.id !== e || r.source === "bundled");
  return OWn(t), YX().activePetId === e && $8({
    activePetId: BFe
  }), t;
}

function SJt() {
  const e = YX();
  return x_e().find(t => t.id === e.activePetId) ?? pba;
}

function BWn(e) {
  return fbt.add(e), () => {
    fbt.delete(e);
  };
}

function jYe() {
  return g.useSyncExternalStore(BWn, YX, YX);
}

function bba() {
  return g.useSyncExternalStore(BWn, x_e, x_e);
}

let Tve = null;

function kie() {
  var e;
  !Tve || typeof window > "u" || ((e = window.speechSynthesis) == null || e.cancel(), Tve = null);
}

function ujt(e) {
  if (typeof window > "u" || !window.speechSynthesis || !e.trim()) return;
  kie(), window.speechSynthesis.getVoices(), window.speechSynthesis.resume();
  const t = new SpeechSynthesisUtterance(e.replace(/https?:\/\/\S+|[*#`]/g, "").slice(0, 1200));
  t.lang = "zh-CN", t.onend = t.onerror = () => {
    Tve === t && (Tve = null);
  }, Tve = t, window.speechSynthesis.speak(t);
}

let gbt = !1;

const ybt = new Set();

function IJt(e) {
  gbt !== e && (gbt = e, ybt.forEach(t => t()));
}

function vba() {
  const e = jYe();
  return g.useSyncExternalStore(n => (ybt.add(n), () => ybt.delete(n)), () => gbt, () => !1) && e.enabled && e.notifyCanvas && e.linkMode === "all";
}

function Mve(e) {
  window.dispatchEvent(new CustomEvent("desktopPetNotice", {
    detail: e
  }));
}

const CJt = ["起来走动一下吧，坐太久肩膀会酸哦。", "喝口水歇一歇，创作也要滋润一下。", "抬头看看远处，眼睛也需要休息呀。", "伸个懒腰吧，身子放松一下会更有灵感。", "站起来活动活动腿，待会儿回来更专注。", "记得眨眨眼，屏幕盯久了眼睛会累。", "去接杯温水吧，小优在这儿帮你看着。", "深呼吸三次，把肩膀放下来。", "创作辛苦啦，起来走两步再继续。", "腰背挺直一点，坐姿舒服才画得久。", "揉揉眼睛、转转脖子，休息十秒就好。", "起来倒杯水，顺便看看窗外吧。"];

function wba() {
  return CJt[Math.floor(Math.random() * CJt.length)];
}

function xba(e, t) {
  return e >= ljt(t) * 6e4;
}

const FWn = "qiaodoumayi_pet_chime_last";

function _ba() {
  try {
    return Number(sessionStorage.getItem(FWn) || 0);
  } catch {
    return 0;
  }
}

function kba(e) {
  try {
    sessionStorage.setItem(FWn, String(e));
  } catch {}
}

function zWn() {
  const e = wba();
  kba(Date.now()), Mve({
    text: e,
    kind: "info",
    silent: !0
  }), ujt(e);
}

function Aba(e, t) {
  const [n, r] = g.useState(null),
    a = TRt(),
    i = SQe(),
    o = g.useRef(new Set(i.map(l => `${l.id}:${l.type}`))),
    s = e.enabled && !t;
  return g.useEffect(() => {
    if (!s) {
      r(null), kie();
      return;
    }
    let l;
    const d = u => {
      const h = u.detail;
      r(h), clearTimeout(l), l = setTimeout(() => r(null), 6500), YX().speakNotifications && !h.silent && ujt(h.text);
    };
    return window.addEventListener("desktopPetNotice", d), () => {
      window.removeEventListener("desktopPetNotice", d), clearTimeout(l);
    };
  }, [s]), g.useEffect(() => {
    if (!s || !e.notifyGeneration || e.linkMode === "off") return;
    let l = 0,
      d = 0,
      u;
    const h = al.subscribeTerminal(p => {
      p.status === "completed" ? l += 1 : d += 1, !u && (u = setTimeout(() => {
        Mve({
          text: [l ? `${l} 个生成任务完成啦` : "", d ? `${d} 个生成任务失败，请查看生成历史` : ""].filter(Boolean).join("；"),
          kind: d ? "error" : "success"
        }), l = d = 0, u = void 0;
      }, 350));
    });
    return () => {
      h(), clearTimeout(u);
    };
  }, [s, e.notifyGeneration, e.linkMode]), g.useEffect(() => {
    s && e.notifyAgent && e.linkMode === "all" && a && Mve({
      text: `需要你确认：${a.title}`,
      kind: "busy"
    });
  }, [s, e.notifyAgent, e.linkMode, a == null ? void 0 : a.id]), g.useEffect(() => {
    const l = i.filter(u => !o.current.has(`${u.id}:${u.type}`));
    if (o.current = new Set(i.map(u => `${u.id}:${u.type}`)), !s || !e.notifyCanvas || e.linkMode !== "all") return;
    const d = l.filter(u => u.type === "success" || u.type === "error").slice(-1)[0];
    d && Mve({
      text: d.message,
      kind: d.type === "error" ? "error" : "success"
    });
  }, [i, s, e.notifyCanvas, e.linkMode]), g.useEffect(() => {
    if (!s || !e.hourlyChime) return;
    let l = _ba();
    const d = ljt(e.chimeIntervalMinutes) * 6e4,
      u = setInterval(() => {
        document.hidden || !xba(Date.now() - l, e.chimeIntervalMinutes) || (l = Date.now(), zWn());
      }, Math.min(15e3, d));
    return () => clearInterval(u);
  }, [s, e.hourlyChime, e.chimeIntervalMinutes]), g.useEffect(() => {
    !e.speakNotifications && !e.speakReplies && kie();
  }, [e.speakNotifications, e.speakReplies]), n;
}

const EJt = ({
    toast: e,
    onClose: t,
    isDark: n
  }) => {
    on();
    const [r, a] = g.useState(!1);
    g.useEffect(() => {
      if (e.duration && e.duration > 0) {
        const l = setTimeout(() => {
          a(!0), setTimeout(() => t(e.id), 300);
        }, e.duration);
        return () => clearTimeout(l);
      }
    }, [e.id, e.duration, t]);
    const i = () => {
        if (e.type === "loading") try {
          window.dispatchEvent(new CustomEvent("qdm-loading-toast-closed", {
            detail: {
              id: e.id
            }
          }));
        } catch {}
        a(!0), setTimeout(() => t(e.id), 300);
      },
      o = () => {
        switch (e.type) {
          case "success":
            return c.jsx(sEt, {
              size: 18,
              className: "text-green-500"
            });
          case "error":
            return c.jsx(LRr, {
              size: 18,
              className: "text-red-500"
            });
          case "warning":
            return c.jsx(c3, {
              size: 18,
              className: "text-amber-500"
            });
          case "loading":
            return c.jsx(Ua, {
              size: 18,
              className: "text-blue-500 animate-spin"
            });
          default:
            return c.jsx(ws, {
              size: 18,
              className: "text-blue-500"
            });
        }
      },
      s = () => {
        if (n) switch (e.type) {
          case "success":
            return "bg-green-900/90 border-green-700";
          case "error":
            return "bg-red-900/90 border-red-700";
          case "warning":
            return "bg-amber-900/90 border-amber-700";
          case "loading":
            return "bg-blue-900/90 border-blue-700";
          default:
            return "bg-zinc-800/95 border-zinc-700";
        } else switch (e.type) {
          case "success":
            return "bg-green-50 border-green-300";
          case "error":
            return "bg-red-50 border-red-300";
          case "warning":
            return "bg-amber-50 border-amber-300";
          case "loading":
            return "bg-blue-50 border-blue-300";
          default:
            return "bg-white border-zinc-300";
        }
      };
    return c.jsxs("div", {
      role: e.placement === "canvas-top" ? "status" : void 0,
      "data-project-open-toast": e.placement === "canvas-top" ? n ? "dark" : "light" : void 0,
      "data-exiting": r || void 0,
      className: `
                flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg backdrop-blur-sm
                transition-all duration-300 min-w-[280px] max-w-[400px]
                ${e.placement === "canvas-top" ? "" : s()}
                ${r ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"}
            `,
      children: [o(), c.jsxs("div", {
        className: "flex-1 min-w-0",
        children: [c.jsx("p", {
          className: `text-sm font-medium whitespace-pre-line break-words ${n ? "text-zinc-100" : "text-zinc-800"}`,
          children: x(e.message)
        }), e.progress !== void 0 && e.progress >= 0 && c.jsx("div", {
          className: "mt-2 h-1.5 bg-zinc-700/30 rounded-full overflow-hidden",
          children: c.jsx("div", {
            className: "h-full bg-blue-500 rounded-full transition-all duration-300",
            style: {
              width: `${e.progress}%`
            }
          })
        })]
      }), c.jsx("button", {
        type: "button",
        onClick: i,
        "aria-label": x("关闭"),
        className: `p-1 rounded-full transition-colors ${n ? "hover:bg-zinc-700 text-zinc-400" : "hover:bg-zinc-200 text-zinc-500"}`,
        children: c.jsx(Na, {
          size: 14
        })
      })]
    });
  },
  hjt = g.memo(({
    toasts: e,
    onClose: t,
    isDark: n
  }) => {
    on();
    const r = SQe(),
      a = vba(),
      i = (e ?? r).filter(d => a ? d.type !== "success" && d.type !== "error" : !0),
      o = t ?? gg,
      s = g.useRef(null),
      l = i.map(d => d.id).join(`
`);
    return g.useLayoutEffect(() => {
      const d = s.current;
      if (!(!d || i.length === 0 || typeof d.showPopover != "function")) {
        d.setAttribute("popover", "manual");
        try {
          d.matches(":popover-open") && !!document.querySelector("dialog[open]") && d.hidePopover(), d.matches(":popover-open") || d.showPopover();
        } catch {}
      }
    }, [l, i.length]), i.length === 0 ? null : c.jsxs("div", {
      ref: s,
      className: "toast-top-layer",
      children: [c.jsx("div", {
        className: "fixed bottom-[72px] right-4 z-[9999] flex flex-col gap-2 pointer-events-auto",
        children: i.filter(d => d.placement !== "canvas-top").map(d => c.jsx(EJt, {
          toast: d,
          onClose: o,
          isDark: n
        }, d.id))
      }), c.jsx("div", {
        className: "project-open-toast-position",
        children: i.filter(d => d.placement === "canvas-top").map(d => c.jsx(EJt, {
          toast: d,
          onClose: o,
          isDark: n
        }, d.id))
      })]
    });
  });

hjt.displayName = "ToastContainer";

const bbt = "atelier-workaxis-canvas",
  Sba = {
    F13: "home",
    F14: "harness",
    F15: "chat",
    F16: "generation",
    F17: "plugins",
    F18: "profile",
    F19: "canvas",
    F20: "save",
    F21: "projects",
    F22: "new-chat",
    F23: "undo",
    F24: "redo"
  },
  Iba = {
    F13: "dial-left",
    F14: "dial-right",
    F15: "dial-press",
    F16: "pan-up",
    F17: "pan-right",
    F18: "pan-down",
    F19: "pan-left"
  };

function Cba(e) {
  if (e.defaultPrevented || e.repeat || e.isComposing || e.altKey || e.metaKey) return null;
  const t = e.code || e.key;
  return e.ctrlKey && e.shiftKey ? Iba[t] ?? null : e.ctrlKey || e.shiftKey ? null : Sba[t] ?? null;
}

function Eba(e, t, n) {
  if (!e.length) return;
  const r = e.findIndex(a => a.id === t);
  return r === -1 ? n === 1 ? e[0] : e[e.length - 1] : e[(r + n + e.length) % e.length];
}

const Tba = new Set(["home", "harness", "chat", "generation", "plugins", "profile", "canvas", "projects", "new-chat"]);

function Mba() {
  let e = "";
  const t = () => {
      var o;
      const i = document.querySelector('[data-chat-file-drop-zone="studio-home"]');
      return !!i && (!!((o = i.querySelector("textarea")) != null && o.value.trim()) || i.dataset.composerLayout === "expanded");
    },
    n = async i => {
      const o = bie(),
        s = MYt(),
        l = xHn(xy(), o.workspaces).filter(p => !p.archived),
        {
          visible: d
        } = _Hn(l, o.workspaces, {
          ...vHn(),
          archivedFilter: "hide"
        }, "", s),
        u = e || (s === "local-skill" ? o.threadId : UBe().threadId),
        h = Eba(d, u, i);
      if (!h) {
        zO("当前类型还没有可切换的对话");
        return;
      }
      e = h.id;
      try {
        if (h.kind === "chat") DQe(h.id);else if (!(await KU(h.rootPath, h.id, !1))) return;
        gy(!1);
      } finally {
        e === h.id && (e = "");
      }
    },
    r = i => {
      const o = {
        command: i,
        handled: !1
      };
      window.dispatchEvent(new CustomEvent(bbt, {
        detail: o
      })), o.handled || zO("请先打开画布，并结束当前编辑或加载后再操作");
    },
    a = i => {
      var d;
      const o = Cba(i);
      if (!o || Array.from(document.querySelectorAll('dialog[open], [role="dialog"][aria-modal="true"]')).some(u => !u.closest('[inert], [hidden], [aria-hidden="true"]')) || document.body.dataset.director3dControl === "1") return;
      i.preventDefault(), i.stopImmediatePropagation();
      const l = FX();
      if ((Tba.has(o) || l === "home" && (o === "dial-left" || o === "dial-right")) && t()) {
        zO("输入框里还有未发送内容，请先处理草稿再切换");
        return;
      }
      switch (o) {
        case "home":
          gy();
          return;
        case "harness":
          DE("local-skill"), gy(!bie().rootPath);
          return;
        case "chat":
          DE("chat"), gy(!UBe().messages.length);
          return;
        case "generation":
        case "plugins":
        case "profile":
          X1(o);
          return;
        case "canvas":
          Dx();
          return;
        case "projects":
          KIe();
          return;
        case "new-chat":
          {
            if (MYt() === "chat") jQe();else {
              const u = bie(),
                h = u.rootPath || u.workspaces[0];
              if (!h) {
                gy(), zO("先在 Harness 中选择工作区");
                return;
              }
              Y2e(h);
            }
            gy(!1);
            return;
          }
        case "dial-left":
        case "dial-right":
          {
            l === "canvas" ? r(o === "dial-left" ? "zoom-out" : "zoom-in") : l === "home" ? n(o === "dial-left" ? -1 : 1).catch(u => qi(String(u))) : zO("旋钮在画布中缩放，在主页对话中切换会话");
            return;
          }
        case "dial-press":
          l === "canvas" ? r("fit") : l === "home" && ((d = document.querySelector('[data-chat-file-drop-zone="studio-home"] textarea')) == null || d.focus());
          return;
        default:
          r(o);
      }
    };
  return window.addEventListener("keydown", a, {
    capture: !0
  }), () => window.removeEventListener("keydown", a, {
    capture: !0
  });
}

function Pba() {
  g.useEffect(Mba, []);
}

function Rba(e, t) {
  let n = 0,
    r = null;
  const a = () => {
      n = 0, r !== null && t.clear(r), r = null;
    },
    i = () => {
      r !== null && t.clear(r), r = t.after(a, 2e3);
    };
  return {
    cancel: a,
    keydown(o) {
      if ($Z(o.target) || o.isComposing) {
        a();
        return;
      }
      if (o.repeat) return;
      if ((o.ctrlKey || o.metaKey) && o.code === "KeyO" && o.altKey !== o.shiftKey) {
        gNe(o), n = 1, i();
        return;
      }
      if (n === 1 && o.code === "KeyJ") {
        gNe(o), n = 2, i();
        return;
      }
      n === 2 && o.code === "Space" && (gNe(o), a(), e());
    }
  };
}

const Nba = {
  after: (e, t) => window.setTimeout(e, t),
  clear: e => window.clearTimeout(e)
};

function jba(e) {
  const t = g.useRef(e);
  g.useLayoutEffect(() => {
    t.current = e;
  });
  const [n] = g.useState(() => Rba(() => t.current(!0), Nba));
  g.useLayoutEffect(() => {
    const r = () => {
        document.hidden && n.cancel();
      },
      a = i => {
        $Z(i.target) && n.cancel();
      };
    return window.addEventListener("keydown", n.keydown, !0), window.addEventListener("blur", n.cancel), window.addEventListener("focusin", a), document.addEventListener("visibilitychange", r), () => {
      n.cancel(), window.removeEventListener("keydown", n.keydown, !0), window.removeEventListener("blur", n.cancel), window.removeEventListener("focusin", a), document.removeEventListener("visibilitychange", r);
    };
  }, [n]);
}

let UWn = !1;

const vbt = new Set();

function $Wn(e) {
  UWn = e, vbt.forEach(t => t());
}

const Dba = e => (vbt.add(e), () => {
    vbt.delete(e);
  }),
  Lba = () => g.useSyncExternalStore(Dba, () => UWn, () => !1);

function GWn({
  isDark: e
}) {
  on();
  const t = TRt();
  return t ? c.jsxs("aside", {
    className: `agent-runtime-approval ${e ? "is-dark" : "is-light"} is-risk-${t.risk}`,
    "aria-label": x("运行时审批"),
    children: [c.jsxs("div", {
      className: "agent-runtime-approval__copy",
      children: [c.jsxs("strong", {
        children: [c.jsx(RLe, {
          size: 13
        }), " ", t.title]
      }), c.jsx("span", {
        children: t.summary
      })]
    }), c.jsxs("div", {
      className: "agent-runtime-approval__actions",
      children: [c.jsxs("button", {
        type: "button",
        onClick: () => Ktt(t.id, "deny"),
        children: [c.jsx(Na, {
          size: 13
        }), x(" 拒绝")]
      }), t.persistentGrant ? c.jsx("button", {
        type: "button",
        onClick: () => Ktt(t.id, "allow_skill"),
        children: t.persistentGrant.label || x("始终允许此 Skill 访问画布")
      }) : null, c.jsxs("button", {
        type: "button",
        className: "is-primary",
        onClick: () => Ktt(t.id, "allow_once"),
        children: [c.jsx(io, {
          size: 13
        }), x(" 允许这一次")]
      })]
    })]
  }) : null;
}

const Oba = g.memo(g.lazy(() => Ie(() => Promise.resolve().then(() => VOi), void 0, import.meta.url))),
  Bba = g.lazy(() => Ie(() => Promise.resolve().then(() => tBi), void 0, import.meta.url));

function Fba() {
  on();
  const e = rWe(),
    t = c7r(),
    n = Oy();
  return !e || t ? null : c.jsx(b7r, {
    isDark: n.isDark,
    onClose: CEt
  });
}

function zba({
  mode: e
}) {
  on();
  const t = e === "open" ? 11 : e === "rail" ? 7 : 6.5;
  return c.jsxs("svg", {
    className: "studio-fold-mark",
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    children: [c.jsx("rect", {
      x: "3",
      y: "3",
      width: "18",
      height: "18",
      rx: "5"
    }), c.jsx("path", {
      d: `M${t} 6.5V17.5`
    })]
  });
}

function Uba({
  projects: e
}) {
  on();
  const {
      view: t
    } = M3(),
    [n, r] = g.useState(null);
  return g.useEffect(() => {
    if (t !== "generation") {
      r(null);
      return;
    }
    const a = document.getElementById("studio-generation-host"),
      i = () => document.getElementById("studio-generation-switch-slot");
    if (r(i()), !a) return;
    const o = new MutationObserver(() => {
      const s = i();
      r(l => l === s ? l : s);
    });
    return o.observe(a, {
      childList: !0,
      subtree: !0
    }), () => o.disconnect();
  }, [t]), n ? Da.createPortal(c.jsx(Jyt, {
    projects: e,
    origin: "generation"
  }), n) : null;
}

function TJt() {
  on(), Wya(), Pba();
  const {
      view: e,
      sidebarCollapsed: t,
      sidebarHidden: n = !1
    } = M3(),
    r = rWe(),
    a = u9(),
    i = Uhe(a),
    o = $he(i) === "dark",
    s = H7t(),
    l = Oy(),
    d = !!MS(a.mode) || e === "home" || e === "generation" || e === "plugins" || e === "toolbox" || e === "inspiration";
  g.useLayoutEffect(() => {
    var j;
    return document.documentElement.dataset.studioDesign = a.mode, document.documentElement.dataset.studioFrame = ((j = MS(a.mode)) == null ? void 0 : j.frame) ?? "", document.documentElement.toggleAttribute("data-studio-preset", !!MS(a.mode)), () => {
      delete document.documentElement.dataset.studioDesign, delete document.documentElement.dataset.studioFrame, document.documentElement.removeAttribute("data-studio-preset");
    };
  }, [a.mode]), g.useLayoutEffect(() => {
    const j = document.documentElement.style;
    return Object.entries(l.vars).forEach(([B, F]) => j.setProperty(B, F)), () => Object.keys(l.vars).forEach(B => j.removeProperty(B));
  }, [l]);
  const [u, h] = g.useState([]);
  tba(u, l.vars);
  const [p, m] = g.useState(0),
    [f, y] = g.useState(e === "canvas" || e === "projects" || e === "generation" || e === "toolbox" || e === "inspiration" || e === "materials");
  jba(j => {
    $Wn(j), j && y(!0);
  });
  const [b, v] = g.useState(null),
    [_, w] = g.useState(null),
    k = g.useCallback(() => m(j => j + 1), []),
    A = g.useMemo(() => ({
      upload: b,
      setUpload: v,
      cloud: _,
      setCloud: w,
      onProjectsChanged: k
    }), [b, _, k]),
    S = g.useRef(null),
    C = !t && !n,
    I = t && !n,
    E = j => {
      var B;
      (B = S.current) == null || B.classList.toggle("is-sidebar-preview", I && j);
    };
  g.useEffect(() => {
    var j;
    (j = S.current) == null || j.classList.remove("is-sidebar-preview");
  }, [I, e]);
  const M = n ? "hidden" : I ? "rail" : "open",
    T = () => {
      E(!1), Vla();
    },
    P = () => {
      E(!1), Gla();
    },
    R = n ? "展开图标栏" : I ? "展开侧栏" : "收起侧栏";
  return g.useEffect(() => {
    e6n();
  }, []), g.useEffect(() => {
    (async () => {
      try {
        const {
            getCurrentWindow: j
          } = await Ie(async () => {
            const {
              getCurrentWindow: F
            } = await Promise.resolve().then(() => ede);
            return {
              getCurrentWindow: F
            };
          }, void 0, import.meta.url),
          B = j();
        await B.setTheme(o ? "dark" : "light"), await B.setBackgroundColor(i);
      } catch {}
    })();
  }, [o, i]), g.useEffect(() => {
    const j = () => y(!0);
    return window.addEventListener(Vgt, j), () => window.removeEventListener(Vgt, j);
  }, []), g.useEffect(() => {
    Kla();
    const j = S.current;
    if (!j) return;
    const B = () => {
        j.querySelector("[data-canvas-menu-open]") && y(!0);
        const N = !!j.querySelector("[data-project-menu-open], [data-canvas-menu-open], [data-profile-menu-open]");
        j.hasAttribute("data-sidebar-menu-open") !== N && (j.toggleAttribute("data-sidebar-menu-open", N), N || j.classList.remove("is-sidebar-preview"));
      },
      F = new MutationObserver(B);
    return F.observe(j, {
      subtree: !0,
      childList: !0,
      attributes: !0,
      attributeFilter: ["data-project-menu-open", "data-canvas-menu-open", "data-profile-menu-open"]
    }), B(), () => {
      F.disconnect(), j.removeAttribute("data-sidebar-menu-open");
    };
  }, []), g.useEffect(() => {
    (r || e === "canvas" || e === "projects" || e === "generation" || e === "toolbox" || e === "inspiration" || e === "materials") && y(!0), e !== "canvas" && nWe();
  }, [e, r]), g.useEffect(() => {
    let j = !1;
    const B = async () => {
      try {
        const N = await k6n();
        j || h([...N].sort((G, z) => z.updatedAt - G.updatedAt));
      } catch {
        j || h([]);
      }
    };
    B();
    const F = () => void B();
    return window.addEventListener("focus", F), window.addEventListener(Tf, F), window.addEventListener(t_e, F), () => {
      j = !0, window.removeEventListener("focus", F), window.removeEventListener(Tf, F), window.removeEventListener(t_e, F);
    };
  }, [e, p]), c.jsxs(nCe.Provider, {
    value: A,
    children: [c.jsx(Fba, {}), c.jsxs("div", {
      className: `studio-root${C ? " is-sidebar-open" : ""}${n ? " is-sidebar-hidden" : ""}`,
      "data-chrome-tone": o ? "dark" : "light",
      "data-canvas-chrome": s.isDark ? "dark" : "light",
      "data-studio-view": e,
      "data-settings-open": r || void 0,
      style: {
        "--studio-shell-bg": i,
        "--desktop-titlebar-background": i,
        "--studio-workspace-bg": s.background
      },
      children: [c.jsx(GWn, {
        isDark: s.isDark
      }), c.jsx(sya, {}), e !== "canvas" ? c.jsx(hjt, {
        isDark: o
      }) : null, c.jsx(EEn, {
        isDark: o,
        title: "AIYOUPLUS 1.3",
        hideLogo: !0,
        leading: c.jsx("button", {
          type: "button",
          className: `studio-titlebar-fold is-${M}`,
          "aria-label": x(R),
          "aria-expanded": !n,
          title: x(R),
          onClick: P,
          onDoubleClick: j => j.stopPropagation(),
          children: c.jsx(zba, {
            mode: M
          })
        }),
        menus: c.jsx(ZNr, {
          isDark: o
        })
      }), c.jsxs("div", {
        className: "studio-body",
        children: [c.jsx("div", {
          ref: S,
          className: "studio-sidebar-slot",
          onPointerEnter: j => {
            j.pointerType !== "touch" && I && E(!0);
          },
          onPointerLeave: () => E(!1),
          children: c.jsx(Dya, {
            view: e,
            projects: u,
            sidebarOpen: C,
            onToggleSidebar: T,
            onProjectsChanged: () => m(j => j + 1),
            onOpenSettings: () => {
              y(!0), gZ();
            },
            onOpenLogs: () => {
              y(!0), s6n();
            }
          })
        }), c.jsxs("div", {
          className: "studio-main",
          "data-studio-content": d ? a.mode : void 0,
          children: [MS(a.mode) && (e === "home" || e === "projects") ? c.jsx(Lya, {
            theme: a.mode
          }) : null, e === "home" ? c.jsx(v0a, {
            projects: u
          }) : null, e === "profile" ? c.jsx(g.Suspense, {
            fallback: c.jsx("div", {
              className: "studio-page"
            }),
            children: c.jsx(Bba, {})
          }) : null, e === "projects" ? c.jsx(oya, {
            projects: u,
            onProjectsChanged: k
          }) : null, e === "generation" ? c.jsxs("div", {
            className: "studio-page studio-page--generation",
            children: [c.jsx(Uba, {
              projects: u
            }), c.jsx("div", {
              className: "studio-generation-host",
              id: "studio-generation-host"
            })]
          }) : null, c.jsxs("div", {
            className: "studio-page studio-tools-page",
            hidden: e !== "toolbox" && e !== "plugins" && e !== "inspiration",
            children: [c.jsxs("div", {
              className: "studio-tools-tabs",
              role: "tablist",
              "aria-label": x("工具、插件与灵感"),
              onKeyDown: j => {
                if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(j.key)) return;
                const B = Array.from(j.currentTarget.querySelectorAll('[role="tab"]')),
                  F = B.indexOf(j.target);
                if (F < 0) return;
                j.preventDefault();
                const N = j.key === "Home" ? 0 : j.key === "End" ? B.length - 1 : (F + (j.key === "ArrowRight" ? 1 : -1) + B.length) % B.length;
                B[N].focus(), B[N].click();
              },
              children: [c.jsxs("button", {
                type: "button",
                role: "tab",
                id: "studio-tools-tab",
                "aria-selected": e === "toolbox",
                "aria-controls": "studio-toolbox-host",
                onClick: () => X1("toolbox"),
                children: [c.jsx(MTn, {
                  size: 15
                }), x("工具")]
              }), c.jsxs("button", {
                type: "button",
                role: "tab",
                id: "studio-plugins-tab",
                "aria-selected": e === "plugins",
                "aria-controls": "studio-plugins-panel",
                onClick: () => X1("plugins"),
                children: [c.jsx(wz, {
                  size: 15
                }), x("插件")]
              }), c.jsxs("button", {
                type: "button",
                role: "tab",
                id: "studio-inspiration-tab",
                "aria-selected": e === "inspiration",
                "aria-controls": "studio-inspiration-host",
                onClick: () => X1("inspiration"),
                children: [c.jsx(ac, {
                  size: 15
                }), x("灵感")]
              })]
            }), c.jsxs("div", {
              className: "studio-tools-content",
              children: [c.jsx("div", {
                className: "studio-page studio-page--toolbox",
                id: "studio-toolbox-host",
                role: "tabpanel",
                "aria-labelledby": "studio-tools-tab",
                hidden: e !== "toolbox"
              }), c.jsx("div", {
                id: "studio-inspiration-host",
                role: "tabpanel",
                "aria-labelledby": "studio-inspiration-tab",
                hidden: e !== "inspiration"
              }), e === "plugins" ? c.jsx("div", {
                id: "studio-plugins-panel",
                role: "tabpanel",
                "aria-labelledby": "studio-plugins-tab",
                children: c.jsx(_0a, {})
              }) : null]
            })]
          }), c.jsx("div", {
            className: "studio-page studio-page--materials",
            id: "studio-materials-host",
            hidden: e !== "materials"
          }), f ? c.jsx("div", {
            className: "studio-page studio-page--canvas",
            hidden: e !== "canvas",
            children: c.jsx("div", {
              className: "studio-canvas-host",
              children: c.jsx(g.Suspense, {
                fallback: null,
                children: c.jsx(Oba, {})
              })
            })
          }) : null]
        })]
      })]
    })]
  });
}

const kNe = "qiaodoumayi.watchdog.reloadCount",
  ANe = "qiaodoumayi.watchdog.reloadFirstAt",
  wbt = "qiaodoumayi.watchdog.lastReason",
  $ba = 6e4,
  Gba = 2,
  Vba = 5;

function Hba(e) {
  try {
    const t = Date.now(),
      n = parseInt(sessionStorage.getItem(kNe) || "0", 10) || 0,
      r = parseInt(sessionStorage.getItem(ANe) || "0", 10) || 0;
    if (r > 0 && t - r > $ba) return sessionStorage.setItem(kNe, "1"), sessionStorage.setItem(ANe, String(t)), sessionStorage.setItem(wbt, e), !0;
    const a = n + 1;
    return a > Gba ? !1 : (sessionStorage.setItem(kNe, String(a)), r === 0 && sessionStorage.setItem(ANe, String(t)), sessionStorage.setItem(wbt, e), !0);
  } catch {
    return !0;
  }
}

function MJt() {
  try {
    sessionStorage.removeItem(kNe), sessionStorage.removeItem(ANe), sessionStorage.removeItem(wbt);
  } catch {}
}

class PJt extends g.Component {
  constructor(n) {
    super(n);
    On(this, "countdownTimer", null);
    On(this, "handleReload", () => {
      this.clearCountdown(), MJt(), Cmt("react_error_manual_reload");
    });
    On(this, "handleReset", () => {
      this.clearCountdown(), MJt(), this.setState({
        hasError: !1,
        error: null,
        errorInfo: null,
        autoReloadInSec: null
      });
    });
    On(this, "handleCancelAutoReload", () => {
      this.clearCountdown(), this.setState({
        autoReloadInSec: null
      });
    });
    this.state = {
      hasError: !1,
      error: null,
      errorInfo: null,
      autoReloadInSec: null
    };
  }
  static getDerivedStateFromError(n) {
    return {
      hasError: !0
    };
  }
  componentDidCatch(n, r) {
    console.error("[ErrorBoundary] Caught error:", n, r);
    const a = Hba(`react_error:${(n == null ? void 0 : n.message) || "unknown"}`);
    this.setState({
      error: n,
      errorInfo: r,
      autoReloadInSec: a ? Vba : null
    }, () => {
      a && this.startCountdown();
    });
  }
  componentWillUnmount() {
    this.clearCountdown();
  }
  startCountdown() {
    this.clearCountdown(), this.countdownTimer = window.setInterval(() => {
      this.setState(n => {
        if (n.autoReloadInSec === null) return null;
        const r = n.autoReloadInSec - 1;
        return r <= 0 ? (this.clearCountdown(), Cmt("react_error_auto_reload"), {
          autoReloadInSec: 0
        }) : {
          autoReloadInSec: r
        };
      });
    }, 1e3);
  }
  clearCountdown() {
    this.countdownTimer !== null && (clearInterval(this.countdownTimer), this.countdownTimer = null);
  }
  render() {
    if (this.state.hasError) {
      const {
        autoReloadInSec: n
      } = this.state;
      return c.jsx("div", {
        className: "w-full h-screen flex items-center justify-center bg-zinc-900 text-white",
        children: c.jsxs("div", {
          className: "max-w-2xl p-8 bg-zinc-800 rounded-lg border border-zinc-700",
          children: [c.jsxs("div", {
            className: "flex items-center gap-3 mb-4",
            children: [c.jsx("svg", {
              className: "w-8 h-8 text-red-500",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: c.jsx("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              })
            }), c.jsx("h1", {
              className: "text-2xl font-bold",
              children: x("应用出现错误")
            })]
          }), c.jsxs("p", {
            className: "text-zinc-300 mb-4",
            children: [x("应用遇到了一个意外错误。"), n !== null && n > 0 && c.jsxs(c.Fragment, {
              children: [" ", x("将在"), " ", c.jsx("span", {
                className: "text-blue-400 font-semibold",
                children: n
              }), " ", x("秒后自动重新加载，您也可以手动操作。")]
            }), n === null && c.jsxs(c.Fragment, {
              children: [" ", x("已暂停自动恢复（防止崩溃循环），请手动选择操作。")]
            })]
          }), this.state.error && c.jsxs("details", {
            className: "mb-4 p-4 bg-zinc-900 rounded border border-zinc-700",
            children: [c.jsx("summary", {
              className: "cursor-pointer text-sm font-medium mb-2",
              children: x("错误详情")
            }), c.jsxs("div", {
              className: "text-xs text-red-400 font-mono whitespace-pre-wrap",
              children: [this.state.error.toString(), this.state.errorInfo && c.jsx("div", {
                className: "mt-2 text-zinc-400",
                children: this.state.errorInfo.componentStack
              })]
            })]
          }), c.jsxs("div", {
            className: "flex gap-3 flex-wrap",
            children: [c.jsx("button", {
              onClick: this.handleReload,
              className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors",
              children: x("重新加载页面")
            }), c.jsx("button", {
              onClick: this.handleReset,
              className: "px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded transition-colors",
              children: x("尝试恢复")
            }), n !== null && n > 0 && c.jsx("button", {
              onClick: this.handleCancelAutoReload,
              className: "px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded transition-colors",
              children: x("取消自动重启")
            })]
          })]
        })
      });
    }
    return this.props.children;
  }
}

function VWn(e) {
  return typeof e == "string" ? e : e instanceof Request ? e.url : "";
}

function Wba(e) {
  const t = String(e || "").trim();
  return !(!/^https?:\/\//i.test(t) || !/aliyuncs\.com/i.test(t) || t.includes("/api/image-proxy") || /athena-haicong-llm-external\.oss/i.test(t) || /\/haiyi\//i.test(t));
}

function pjt() {
  return typeof window > "u" ? !1 : !!window.__LINGO_ELECTRON_NATIVE_SHELL__;
}

function xbt(e, t) {
  return e[1] !== void 0 ? [t, e[1]] : [t];
}

function HWn(e) {
  if (!pjt()) return e;
  const t = e[0],
    n = VWn(t);
  if (!Wba(n)) return e;
  const r = `/api/image-proxy?url=${encodeURIComponent(n)}`;
  return typeof t == "string" ? xbt(e, r) : t instanceof Request ? xbt(e, new Request(r, t)) : e;
}

const Eee = 40,
  Fnt = 20,
  qba = 160;

function Kba(e) {
  return e.length <= qba ? e : `[${e.startsWith("data:") ? e.slice(0, Math.min(e.indexOf(",") + 1 || 32, 80)) : e.startsWith("blob:") ? "blob:" : "string"} ${e.length} chars]`;
}

function VF(e, t = 0, n = new WeakSet()) {
  if (typeof e == "string") return Kba(e);
  if (e == null || typeof e != "object") return e;
  if (t >= 4) return `[${Array.isArray(e) ? "Array" : "Object"}]`;
  if (n.has(e)) return "[Circular]";
  if (n.add(e), typeof Blob < "u" && e instanceof Blob) return {
    type: e.type || "application/octet-stream",
    size: e.size
  };
  if (typeof FormData < "u" && e instanceof FormData) {
    const i = {};
    let o = 0;
    return e.forEach((s, l) => {
      o < Eee && (i[l] = VF(s, t + 1, n)), o += 1;
    }), o > Eee && (i.__truncatedEntries = o - Eee), i;
  }
  if (Array.isArray(e)) {
    const i = e.slice(0, Fnt).map(o => VF(o, t + 1, n));
    return e.length > Fnt && i.push(`[+${e.length - Fnt} items]`), i;
  }
  const r = Object.entries(e),
    a = {};
  for (const [i, o] of r.slice(0, Eee)) a[i] = VF(o, t + 1, n);
  return r.length > Eee && (a.__truncatedKeys = r.length - Eee), a;
}

const RJt = 800,
  NJt = 16e3,
  Qba = /(api[_-]?key|authorization|access[_-]?token|secret|password)(["']?\s*[:=]\s*["']?)([^"'\s,}\]]{6,})/gi,
  Yba = /\bBearer\s+[A-Za-z0-9._\-+/=]{8,}/gi,
  Xba = /\bsk-[A-Za-z0-9_-]{8,}/g,
  Jba = /\bAI-[A-Za-z0-9_-]{8,}/g;

let a5 = [],
  Zba = 1,
  _bt = 0;

const UFe = new Set();

let znt = 0,
  jJt = !1;

function WWn() {
  if (typeof requestAnimationFrame != "function") {
    _bt += 1, UFe.forEach(e => e());
    return;
  }
  znt || (znt = requestAnimationFrame(() => {
    znt = 0, _bt += 1, UFe.forEach(e => e());
  }));
}

function eva(e) {
  return e.replace(Yba, "Bearer ***").replace(Xba, "sk-***").replace(Jba, "AI-***").replace(Qba, "$1$2***");
}

function tva(e) {
  if (typeof e == "string") return e;
  if (typeof e == "number" || typeof e == "boolean" || e == null) return String(e);
  if (e instanceof Error) return e.stack || `${e.name}: ${e.message}`;
  try {
    const t = VF(e);
    return typeof t == "string" ? t : JSON.stringify(t, null, 2);
  } catch {
    try {
      return String(e);
    } catch {
      return "[Unserializable]";
    }
  }
}

function nva(e) {
  const t = e.map(tva).join(" "),
    n = eva(t);
  return n.length <= NJt ? n : `${n.slice(0, NJt)}
… [已截断，共 ${n.length} 字符]`;
}

function rva(e) {
  return UFe.add(e), () => {
    UFe.delete(e);
  };
}

function DJt() {
  return _bt;
}

function ava() {
  return g.useSyncExternalStore(rva, DJt, DJt), a5;
}

function S0e(e, t) {
  const n = nva(t);
  n && (a5 = a5.concat({
    id: Zba++,
    ts: Date.now(),
    level: e,
    text: n
  }), a5.length > RJt && (a5 = a5.slice(a5.length - RJt)), WWn());
}

function iva() {
  a5.length !== 0 && (a5 = [], WWn());
}

function ova(e) {
  return (!e || e === "all" ? a5 : e === "log" ? a5.filter(n => n.level === "log" || n.level === "info") : a5.filter(n => n.level === e)).map(n => `[${new Date(n.ts).toLocaleTimeString("zh-CN", {
    hour12: !1
  })}] ${n.level.toUpperCase()} ${n.text}`).join(`
`);
}

function sva() {
  jJt || typeof window > "u" || (jJt = !0, window.addEventListener("unhandledrejection", e => {
    const t = e.reason;
    S0e("error", ["[未处理的 Promise]", t]);
  }));
}

sjr();

function lva(e) {
  if (!e || typeof e != "object") return null;
  const t = ["available_memory_gb", "availableMemoryGB", "available_gb", "free_memory_gb", "freeMemoryGB", "total_memory_gb", "totalMemoryGB", "total_gb", "memory_gb"];
  for (const r of t) {
    const a = Number(e[r]);
    if (Number.isFinite(a) && a > 0) return a;
  }
  const n = ["available_memory", "availableMemory", "free_memory", "freeMemory", "total_memory", "totalMemory"];
  for (const r of n) {
    const a = Number(e[r]);
    if (Number.isFinite(a) && a > 0) return a / 1024 / 1024 / 1024;
  }
  return null;
}

const cva = async () => {
  try {
    const {
        getSystemMemoryInfo: e
      } = await Ie(async () => {
        const {
          getSystemMemoryInfo: r
        } = await Promise.resolve().then(() => nIt);
        return {
          getSystemMemoryInfo: r
        };
      }, void 0, import.meta.url),
      t = await e(),
      n = lva(t);
    if (n !== null) {
      const r = window;
      r.__qdmSystemMemoryInfo = t, r.__qdmSystemMemoryGB = n;
    }
  } catch {}
};

cva();

async function LJt() {
  try {
    const {
        ensureCacheRootReadyForWrite: e
      } = await Ie(async () => {
        const {
          ensureCacheRootReadyForWrite: a
        } = await Promise.resolve().then(() => Ha);
        return {
          ensureCacheRootReadyForWrite: a
        };
      }, void 0, import.meta.url),
      {
        migrateAndHydrateDiskLocalStorage: t
      } = await Ie(async () => {
        const {
          migrateAndHydrateDiskLocalStorage: a
        } = await Promise.resolve().then(() => qHe);
        return {
          migrateAndHydrateDiskLocalStorage: a
        };
      }, void 0, import.meta.url),
      {
        apiConfigManager: n
      } = await Ie(async () => {
        const {
          apiConfigManager: a
        } = await Promise.resolve().then(() => SFn);
        return {
          apiConfigManager: a
        };
      }, void 0, import.meta.url);
    await e(), await t(), n.reloadFromStorage();
    const {
      preloadProductionStateSqlite: r
    } = await Ie(async () => {
      const {
        preloadProductionStateSqlite: a
      } = await Promise.resolve().then(() => eja);
      return {
        preloadProductionStateSqlite: a
      };
    }, void 0, import.meta.url);
    if (await r()) {
      const {
        hydrateProductionQueueFromPreloadedState: a
      } = await Ie(async () => {
        const {
          hydrateProductionQueueFromPreloadedState: i
        } = await Promise.resolve().then(() => YZn);
        return {
          hydrateProductionQueueFromPreloadedState: i
        };
      }, void 0, import.meta.url);
      a();
    }
  } catch (e) {
    console.warn("[main] hydrateDiskLocalStorageBeforeMount failed:", e);
  }
  await N3n();
}

let Unt = !1;

function OJt() {
  Unt || (Unt = !0, Ie(async () => {
    const {
      memoryMonitor: e
    } = await Promise.resolve().then(() => eEe);
    return {
      memoryMonitor: e
    };
  }, void 0, import.meta.url).then(({
    memoryMonitor: e
  }) => {
    e.start(), window.addEventListener("beforeunload", () => e.stop(), {
      once: !0
    });
  }).catch(e => {
    Unt = !1, console.warn("[main] memory monitor failed to start:", e);
  }), Ie(() => Promise.resolve().then(() => CBi), void 0, import.meta.url).catch(() => {}), Ie(() => Promise.resolve().then(() => RBi), void 0, import.meta.url).catch(() => {}));
}

(function () {
  const e = console.error,
    t = console.warn,
    n = console.log,
    r = d => {
      if (typeof d == "string") return d;
      if (d && typeof d == "object") {
        if (d.message) return d.message;
        if (typeof d.toString == "function") return d.toString();
      }
      return String(d);
    },
    a = d => {
      const u = d.map(r).join(" ");
      if (u.includes("Unable to preventDefault inside passive event listener") || u.includes("passive event listener invocation") || u.includes("preventDefault") && u.includes("passive") || u.includes("Tracking Prevention blocked access to storage") || u.includes("Tracking Prevention blocked access") || u.includes("Tracking Prevention") && /aliyuncs\.com|cloudinary\.com|athena-haicong|\/haiyi\//i.test(u) || /blocked access to storage/i.test(u) && /aliyuncs\.com|athena-haicong|cloudinary\.com/i.test(u) || u.includes("aliyuncs.com") && (u.includes("CORS") || u.includes("Access to fetch at") || u.includes("Access to image at") || u.includes("ERR_FAILED") || u.includes("No Access-Control-Allow-Origin"))) return !0;
      for (const p of d) {
        let m = r(p);
        if (m.includes("blob:http") && (m.includes("ERR_FILE_NOT_FOUND") || m.includes("Failed to fetch") || m.includes("net::ERR")) || m.includes("[AssetStore]") || m.includes("[useAssetCache]") || m.includes("127.0.0.1:9527") || m.includes("127.0.0.1:9528") || m.includes("127.0.0.1:47418") || m.includes("localhost:47418") || m.includes("localhost:9527") || m.includes("localhost:9528") || m.includes("ERR_CONNECTION_REFUSED") || m.includes("checkLocalCacheServer") || m.includes("[LocalCache]") || m.includes("/ping") || m.includes("404") && m.includes("ping") || m.includes("CORS policy") || m.includes("Access-Control-Allow-Origin") || m.includes("has been blocked by CORS") || m.includes("Access to fetch at") || m.includes("Electron Security Warning") || m.includes("Insecure Content-Security-Policy") || m.includes("[LocalCacheManager]") && m.includes("requestPermission failed") || m.includes("aliyuncs.com") && (m.includes("canvas-materials/thumbnails") || m.includes("/thumbnails/")) || m.includes("[globalOssMaterial]") && m.includes("OSS 缩略图回填本地失败") || m.includes("zhengxianyang.oss-cn-beijing.aliyuncs.com") || m.includes("prod-ss-vidu") || m.includes("amazonaws.com.cn") && m.includes("infer/tasks") || m.includes("net::ERR_FAILED") && (m.includes("prod-ss-vidu") || m.includes("amazonaws.com.cn")) || (m.includes("[downloadUrlToLocal]") || m.includes("[downloadAndGetLocalUrl]")) && (m.includes("Failed to fetch") || m.includes("处理失败") || m.includes("下载失败")) || m.includes("Internal React error") || m.includes("Expected static flag was missing") || m.includes("Warning: Maximum update depth exceeded") || m.includes("Blocked aria-hidden") && m.includes("descendant retained focus") || m.includes("[Cleanup] Node") && m.includes("Released") && m.includes("Blob URLs") || m.includes("localAssetManager") || m.includes("auto-download") || m.includes("[historyOssBackup]") && (m.includes("NoSuchKey") || m.includes("404") || m.includes("不存在")) || m.includes("env.wasm.numThreads") || m.includes("WebAssembly multi-threading is not supported")) return !0;
      }
      return !1;
    },
    i = d => {
      const u = d.map(p => typeof p == "string" ? p : String(p)).join(" ");
      return !!(["[LocalCacheManager]", "[AssetStore]", "[useHistoryAssetSync]", "[ThumbnailStore]", "[AssetCacheQueue]", "[AssetDownloader]", "[useStoryboard]", "[MemoryMonitor]", "[IdleMemoryCleanup]", "[ContentStore]", "[MemoryPoolManager]", "[FinalOptimizationManager]", "[restoreAssetsFromAssetStore]"].some(p => u.includes(p)) || u.includes("[App]") && u.includes("allAssetsDownloadComplete") || u.includes("[Performance]") && (u.includes("Preset changed") || u.includes("Config updated") || u.includes("Config reset") || u.includes("Global API") || u.includes("Available presets") || u.includes("Current preset")) || u.includes("[ConnectionLineOptimizer]") && (u.includes("Connection animations") || u.includes("Network monitoring") || u.includes("Network busy") || u.includes("Network idle") || u.includes("Auto preset") || u.includes("User manual preset") || u.includes("skipping auto switch") || u.includes("isBusy")) || (u.includes("[Huya Art]") || u.includes("[Grok Image]")) && u.includes("轮询 URL") || u.includes("使用异步模式") || u.includes("使用同步模式") || u.includes("[NodeRenderOptimizer]") || u.includes("[PerformanceOptimizationManager]") && (u.includes("Node render state changed") || u.includes("Quality level") || u.includes("Node content")));
    },
    o = console.info,
    s = !window.__qdmAppConsoleCapture;
  window.__qdmAppConsoleCapture = !0, console.error = function (...d) {
    a(d) || (s && S0e("error", d), e.apply(console, d));
  }, console.warn = function (...d) {
    a(d) || (s && S0e("warn", d), t.apply(console, d));
  }, console.info = function (...d) {
    a(d) || (s && S0e("info", d), o.apply(console, d));
  }, console.log = function (...d) {
    i(d) || (s && S0e("log", d), n.apply(console, d));
  }, s && sva(), window.addEventListener("error", d => {
    const u = d.target;
    if (u && (u.tagName === "IMG" || u.tagName === "VIDEO") && (u.src || "").startsWith("blob:")) return d.preventDefault(), d.stopPropagation(), !1;
  }, !0);
  const l = window.fetch;
  window.fetch = function (...d) {
    var h;
    d = HWn(d);
    const u = typeof d[0] == "string" ? d[0] : ((h = d[0]) == null ? void 0 : h.url) ?? "";
    return u.includes("127.0.0.1:9527") || u.includes("127.0.0.1:9528") || u.includes("127.0.0.1:47418") || u.includes("localhost:47418") || u.includes("localhost:9527") || u.includes("localhost:9528") ? l.apply(this, d).catch(p => {
      throw p;
    }) : l.apply(this, d);
  };
})();

(() => {
  const e = t => {
    if (t.key !== "Alt" || t.repeat) return;
    const n = t.target;
    if (n instanceof HTMLElement) {
      const r = n.tagName;
      if (r === "INPUT" || r === "TEXTAREA" || n.isContentEditable) return;
    }
    t.preventDefault();
  };
  window.addEventListener("keydown", e, !0), window.addEventListener("keyup", e, !0);
})();

try {
  window.__LINGOAPP_RENDERED__ = !0;
  const e = document.querySelector(".art-status"),
    t = () => {
      const r = () => {
          Ie(async () => {
            const {
              runAppUpgradeMigrationsOnStartup: i
            } = await Promise.resolve().then(() => eFi);
            return {
              runAppUpgradeMigrationsOnStartup: i
            };
          }, void 0, import.meta.url).then(({
            runAppUpgradeMigrationsOnStartup: i
          }) => i()).catch(i => console.warn("[main] upgrade migration failed:", i));
        },
        a = window;
      typeof a.requestIdleCallback == "function" ? a.requestIdleCallback(r, {
        timeout: 3e3
      }) : setTimeout(r, 1500);
    },
    n = document.getElementById("root");
  n ? LJt().finally(() => {
    cWt.createRoot(n).render(c.jsx(PJt, {
      children: c.jsx(TJt, {})
    })), OJt(), t();
  }) : window.addEventListener("DOMContentLoaded", () => {
    try {
      window.__LINGOAPP_RENDERED__ = !0;
      const r = document.querySelector(".art-status");
      r && (r.textContent = "[JS已执行]");
      const a = document.getElementById("root");
      if (!a) return;
      LJt().finally(() => {
        cWt.createRoot(a).render(c.jsx(PJt, {
          children: c.jsx(TJt, {})
        })), OJt(), t();
      });
    } catch (r) {
      console.error("[main] DOMContentLoaded render failed:", r);
      const a = document.querySelector(".art-status");
      a && (a.textContent = "[启动失败] See console");
    }
  }, {
    once: !0
  });
} catch (e) {
  console.error("[main] Startup render failed:", e);
  const t = document.querySelector(".art-status");
  t && (t.textContent = "[启动失败] See console");
}

const dva = Object.freeze(Object.defineProperty({
    __proto__: null
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  $Fe = "mediaBlobUrlsInvalidated";

function qWn() {
  typeof window > "u" || (Ie(async () => {
    const {
      clearHistoryListResolvedCache: e
    } = await Promise.resolve().then(() => vtr);
    return {
      clearHistoryListResolvedCache: e
    };
  }, void 0, import.meta.url).then(({
    clearHistoryListResolvedCache: e
  }) => e()).catch(() => {}), window.dispatchEvent(new CustomEvent($Fe)));
}

function Zhe(e) {
  if (typeof window > "u") return () => {};
  const t = () => e();
  return window.addEventListener("lazyContentMemoryRelease", t), window.addEventListener($Fe, t), () => {
    window.removeEventListener("lazyContentMemoryRelease", t), window.removeEventListener($Fe, t);
  };
}

async function uva(e, t) {
  const n = String(e || "").trim();
  if (!n) return "";
  if (!n.startsWith("blob:")) return n;
  const r = t ? Bue(t) : void 0;
  return r && (await $Cn(n, [r])) || n;
}

async function __e(e, t) {
  const n = t;
  let r = "";
  if ((n == null ? void 0 : n.type) === "input-image") r = (await L1(n)) || "";else if (n && (n.type === "gen-image" || n.type === "gen-video")) {
    const a = n.settings || {},
      i = Math.max(0, Number(a.selectedMjImageIndex ?? 0));
    r = (await wY(n, e, i)) || e;
  } else e.startsWith("blob:") || e.startsWith("data:") ? r = e : r = (await f5e(e)) || e;
  return uva(r, n);
}

const mjt = Object.freeze(Object.defineProperty({
    __proto__: null,
    MEDIA_BLOB_INVALIDATED_EVENT: $Fe,
    dispatchMediaBlobUrlsInvalidated: qWn,
    resolveCropToolModalImageUrl: __e,
    subscribeMediaBlobInvalidation: Zhe
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  qTe = new Map(),
  sS = new Map(),
  hva = 8,
  pva = 16 * 1024 * 1024;

function fjt(e) {
  const t = String(e || "").trim();
  if (!t) return "";
  try {
    const n = new URL(t);
    return `${n.origin}${n.pathname}${n.search}`;
  } catch {
    return t;
  }
}

function KWn(e, t) {
  const n = fjt(e);
  if (!n || !(t != null && t.size)) return t;
  sS.delete(n), sS.set(n, t);
  let r = 0;
  for (const a of sS.values()) r += a.size;
  for (; sS.size > hva || r > pva;) {
    const a = sS.keys().next().value;
    if (!a) break;
    const i = sS.get(a);
    sS.delete(a), r = Math.max(0, r - ((i == null ? void 0 : i.size) || 0));
  }
  return t;
}

function gjt(e) {
  const t = fjt(e);
  if (!t) return null;
  const n = sS.get(t);
  return n != null && n.size ? n : null;
}

function mva() {
  let e = 0;
  for (const n of sS.values()) e += n.size;
  const t = sS.size;
  return sS.clear(), {
    entries: t,
    bytes: e
  };
}

function fva() {
  let e = 0;
  for (const t of sS.values()) e += t.size;
  return {
    entries: sS.size,
    bytes: e
  };
}

async function gva(e) {
  try {
    const t = await Fr("download_file_bypass_cors", {
        url: e
      }),
      n = yva(t);
    if (!n.length) throw new Error("Empty download");
    return nU(n);
  } catch (t) {
    throw t;
  }
}

function yva(e) {
  if (e instanceof Uint8Array) return e;
  if (e instanceof ArrayBuffer) return new Uint8Array(e);
  if (e && typeof e == "object") {
    const t = e;
    if (t.type === "Buffer" && Array.isArray(t.data)) return Uint8Array.from(t.data);
  }
  if (Array.isArray(e)) return Uint8Array.from(e);
  throw new Error("Invalid download response");
}

async function BJt(e, t, n) {
  if (Nb(e)) throw new Error("HTTP 404: OSS object known missing");
  if (e.startsWith("asset:") || /^https?:\/\/asset\.localhost\b/i.test(e) || /^https?:\/\/asset\.tauri\.localhost\b/i.test(e)) throw new Error("asset protocol URL cannot be downloaded via HTTP; use local file read instead");
  const r = n ? gjt(e) : null;
  if (r) return r;
  const a = e.startsWith("http://") || e.startsWith("https://"),
    i = /athena-haicong-llm-external\.oss/i.test(e) || /\/haiyi\//i.test(e) && /aliyuncs\.com/i.test(e);
  if (a) try {
    const l = await gva(e);
    return n ? bva(e, l) : l;
  } catch (l) {
    if (_j(l)) throw cY(e), l;
    if (i && /403|AccessDenied|Forbidden/i.test(String(l))) throw l instanceof Error ? l : new Error(String(l));
  }
  const o = new AbortController(),
    s = setTimeout(() => o.abort(), t);
  try {
    const l = await fetch(e, {
      mode: "cors",
      signal: o.signal,
      credentials: "omit",
      cache: "default"
    });
    if (clearTimeout(s), !l.ok) throw l.status === 404 && cY(e), new Error(`HTTP ${l.status}: ${l.statusText}`);
    const d = await l.blob();
    return n ? KWn(e, d) : d;
  } catch (l) {
    throw clearTimeout(s), l;
  }
}

function bva(e, t) {
  return KWn(e, t);
}

async function QWn(e, t = 6e4, n) {
  const r = String(e || "").trim();
  if (!r) throw new Error("Empty download URL");
  const a = r.startsWith("http://") || r.startsWith("https://"),
    i = a && fjt(r) || r,
    o = /\.(mp4|webm|mov|m4v|mkv)(\?|#|$)/i.test(r) || /\/video\//i.test(r),
    s = /audiopipe\.suno\.ai/i.test(r),
    l = (n == null ? void 0 : n.cacheResult) !== !1 && !o && !s,
    d = a && l ? gjt(r) : null;
  if (d) return d;
  if (!a) return BJt(r, t, l);
  const u = qTe.get(i);
  if (u) return u;
  const h = BJt(r, t, l);
  qTe.set(i, h);
  try {
    return await h;
  } finally {
    qTe.get(i) === h && qTe.delete(i);
  }
}

const El = Object.freeze(Object.defineProperty({
  __proto__: null,
  clearTauriDownloadSessionCache: mva,
  downloadWithFallback: QWn,
  getTauriDownloadCacheAudit: fva,
  peekSessionDownloadedBlob: gjt
}, Symbol.toStringTag, {
  value: "Module"
}));

function $nt(e) {
  localStorage.setItem(Sue, JSON.stringify(e)), g3n();
}

function Gnt() {
  queueMicrotask(() => {
    window.dispatchEvent(new CustomEvent(go));
  });
}

async function vva() {
  if (Ur.isAvailable()) try {
    const e = Iue(),
      t = await Ur.loadAliyunOssConfig(),
      n = qht(e),
      r = qht(t);
    if (!n && r && t) {
      $nt(t), Gnt();
      return;
    }
    if (n && !r) {
      $nt(e), await Ur.saveAliyunOssConfig(e), Gnt();
      return;
    }
    if (!n && !r) return;
    const a = o5t(t, e);
    a.provider = e.provider, $nt(a), await Ur.saveAliyunOssConfig(a), Gnt();
  } catch {}
}

async function wva(e) {
  if (Ur.isAvailable()) try {
    await Ur.saveAliyunOssConfig(e);
  } catch {}
}

