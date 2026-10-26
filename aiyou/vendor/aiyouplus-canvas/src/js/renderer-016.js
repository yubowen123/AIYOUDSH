function rMe(e) {
  e.strokeStyle = e.fillStyle = "#000000", e.fillRule = "nonzero", e.globalAlpha = 1, e.lineWidth = 1, e.lineCap = "butt", e.lineJoin = "miter", e.miterLimit = 10, e.globalCompositeOperation = "source-over", e.font = "10px sans-serif", e.setLineDash !== void 0 && (e.setLineDash([]), e.lineDashOffset = 0);
  const {
    filter: t
  } = e;
  t !== "none" && t !== "" && (e.filter = "none");
}

function qon(e, t) {
  if (t) return !0;
  fo.singularValueDecompose2dScale(e, dS);
  const n = Math.fround(h$.pixelRatio * Dde.PDF_TO_CSS_UNITS);
  return dS[0] <= n && dS[1] <= n;
}

const msi = ["butt", "round", "square"],
  fsi = ["miter", "round", "bevel"],
  gsi = {},
  Kon = {};

var KGe, GA, EB, kq, Aq, Sq, Iq, Cq, Eq, Tq, i6, Fs, Gxt, Vxt, Hxt, Wxt, qxt, F_, Mw, Kxt, zir, _7e;

const jH = class jH {
  constructor(t, n, r, a, i, {
    optionalContentConfig: o,
    markedContentStack: s = null
  }, l, d, u, h) {
    qt(this, Fs);
    qt(this, GA, 0);
    qt(this, EB, 0);
    qt(this, kq, null);
    qt(this, Aq, null);
    qt(this, Sq, null);
    qt(this, Iq, null);
    qt(this, Cq, 1);
    qt(this, Eq);
    qt(this, Tq, null);
    qt(this, i6, []);
    this.ctx = t, this.current = new Von(this.ctx.canvas.width, this.ctx.canvas.height), this.stateStack = [], this.pendingClip = null, this.pendingEOFill = !1, this.commonObjs = n, this.objs = r, this.canvasFactory = a, this.filterFactory = i, this.groupStack = [], this.baseTransform = null, this.baseTransformStack = [], this.groupLevel = 0, this.smaskStack = [], this.tempSMask = null, this.smaskGroupCanvases = [], this.smaskPreparedEntry = null, this.smaskPreparedFor = null, this.smaskPreparedOffsetX = 0, this.smaskPreparedOffsetY = 0, this.smaskPreparedOOBAlpha = null, this.suspendedCtx = null, this.contentVisible = !0, this.markedContentStack = s || [], this.optionalContentConfig = o, this.cachedPatterns = new Map(), this.annotationCanvasMap = l, this.viewportScale = 1, this.outputScaleX = 1, this.outputScaleY = 1, this.pageColors = d, this._cachedScaleForStroking = [-1, 0], this._cachedGetSinglePixelWidth = null, this._cachedBitmapsMap = new Map(), this.dependencyTracker = u ?? null, this.imagesTracker = h ?? null;
  }
  getObject(t, n, r = null) {
    var a;
    return typeof n == "string" ? ((a = this.dependencyTracker) == null || a.recordNamedDependency(t, n), n.startsWith("g_") ? this.commonObjs.get(n) : this.objs.get(n)) : r;
  }
  beginDrawing({
    transform: t,
    viewport: n,
    transparency: r = !1,
    background: a = null
  }) {
    const i = this.ctx.canvas.width,
      o = this.ctx.canvas.height,
      s = this.ctx.fillStyle;
    if (this.ctx.fillStyle = a || "#ffffff", this.ctx.fillRect(0, 0, i, o), this.ctx.fillStyle = s, r) {
      const l = this.transparentCanvasEntry = this.canvasFactory.create(i, o);
      this.compositeCtx = this.ctx, {
        canvas: this.transparentCanvas,
        context: this.ctx
      } = l, this.ctx.save(), this.ctx.transform(...om(this.compositeCtx));
    }
    this.ctx.save(), rMe(this.ctx), t && (this.ctx.transform(...t), this.outputScaleX = t[0], this.outputScaleY = t[3]), this.ctx.transform(...n.transform), this.viewportScale = n.scale, this.baseTransform = om(this.ctx);
  }
  executeOperatorList(t, n, r, a, i) {
    var v;
    const o = t.argsArray,
      s = t.fnArray;
    let l = n || 0;
    const d = o.length;
    if (d === l) return l;
    const u = d - l > $on && typeof r == "function",
      h = u ? Date.now() + psi : 0;
    let p = 0;
    const m = this.commonObjs,
      f = this.objs;
    let y, b;
    for (;;) {
      if (a !== void 0) {
        if (l === a.nextBreakPoint) return a.breakIt(l, r), l;
        if (a.shouldSkip(l)) {
          if (++l === d) return l;
          continue;
        }
      }
      if (!i || i(l)) if (y = s[l], b = o[l] ?? null, y !== G8.dependency) b === null ? this[y](l) : this[y](l, ...b);else for (const _ of b) {
        (v = this.dependencyTracker) == null || v.recordNamedData(_, l);
        const w = _.startsWith("g_") ? m : f;
        if (!w.has(_)) return w.get(_, r), l;
      }
      if (l++, l === d) return l;
      if (u && ++p > $on) {
        if (Date.now() > h) return r(), l;
        p = 0;
      }
    }
  }
  endDrawing() {
    Gt(this, Fs, Gxt).call(this);
    for (const t of this.smaskGroupCanvases) this.canvasFactory.destroy(t);
    this.smaskGroupCanvases.length = 0, this._clearPreparedSMask(), this.tempSMask = null, this.smaskStack.length = 0;
    for (const t of te(this, i6)) Gt(this, Fs, _7e).call(this, t);
    te(this, i6).length = 0, yt(this, kq, null), yt(this, Aq, null), yt(this, Sq, null), yt(this, Iq, null), yt(this, Cq, 1), yt(this, Tq, null), yt(this, EB, 0), yt(this, GA, 0), this.cachedPatterns.clear();
    for (const t of this._cachedBitmapsMap.values()) {
      for (const n of t.values()) typeof HTMLCanvasElement < "u" && n instanceof HTMLCanvasElement && (n.width = n.height = 0);
      t.clear();
    }
    this._cachedBitmapsMap.clear(), Gt(this, Fs, Vxt).call(this);
  }
  _scaleImage(t, n) {
    const r = t.width ?? t.displayWidth,
      a = t.height ?? t.displayHeight,
      i = Math.max(Math.hypot(n[0], n[1]), 1),
      o = Math.max(Math.hypot(n[2], n[3]), 1),
      s = [];
    let l = i,
      d = o,
      u = r,
      h = a;
    for (; l > 2 && u > 1 || d > 2 && h > 1;) {
      let v = u,
        _ = h;
      l > 2 && u > 1 && (v = Math.ceil(u / 2), l /= u / v), d > 2 && h > 1 && (_ = Math.ceil(h / 2), d /= h / _), s.push({
        newWidth: v,
        newHeight: _
      }), u = v, h = _;
    }
    if (s.length === 0) return {
      img: t,
      paintWidth: r,
      paintHeight: a,
      tmpCanvas: null
    };
    if (s.length === 1) {
      const {
          newWidth: v,
          newHeight: _
        } = s[0],
        w = this.canvasFactory.create(v, _);
      return w.context.drawImage(t, 0, 0, r, a, 0, 0, v, _), {
        img: w.canvas,
        paintWidth: v,
        paintHeight: _,
        tmpCanvas: w
      };
    }
    let p = this.canvasFactory.create(1, 1),
      m = this.canvasFactory.create(1, 1),
      f = r,
      y = a,
      b = t;
    for (const {
      newWidth: v,
      newHeight: _
    } of s) this.canvasFactory.reset(m, v, _), m.context.drawImage(b, 0, 0, f, y, 0, 0, v, _), [p, m] = [m, p], b = p.canvas, f = v, y = _;
    return this.canvasFactory.destroy(m), {
      img: p.canvas,
      paintWidth: f,
      paintHeight: y,
      tmpCanvas: p
    };
  }
  _createMaskCanvas(t, n) {
    var T, P;
    const r = this.ctx,
      {
        width: a,
        height: i
      } = n,
      o = this.current.fillColor,
      s = this.current.patternFill,
      l = om(r);
    let d, u, h, p;
    if ((n.bitmap || n.data) && n.count > 1) {
      const R = n.bitmap || n.data.buffer;
      u = JSON.stringify(s ? l : [l.slice(0, 4), o]), d = this._cachedBitmapsMap.getOrInsertComputed(R, aBt);
      const j = d.get(u);
      if (j && !s) {
        const B = Math.round(Math.min(l[0], l[2]) + l[4]),
          F = Math.round(Math.min(l[1], l[3]) + l[5]);
        return (T = this.dependencyTracker) == null || T.recordDependencies(t, h4.transformAndFill), {
          canvas: j,
          offsetX: B,
          offsetY: F
        };
      }
      h = j;
    }
    h || (p = this.canvasFactory.create(a, i), Won(p.context, n));
    let m = fo.transform(l, [1 / a, 0, 0, -1 / i, 0, 0]);
    m = fo.transform(m, [1, 0, 0, 1, 0, -i]);
    const f = SW.slice();
    fo.axialAlignedBoundingBox([0, 0, a, i], m, f);
    const [y, b, v, _] = f,
      w = Math.round(v - y) || 1,
      k = Math.round(_ - b) || 1,
      A = this.canvasFactory.create(w, k),
      S = A.context,
      C = y,
      I = b;
    S.translate(-C, -I), S.transform(...m);
    let E = null;
    if (!h) {
      const R = this._scaleImage(p.canvas, y8(S));
      h = R.img, E = R.tmpCanvas, h !== p.canvas && (this.canvasFactory.destroy(p), p = null), d && s && (d.set(u, h), E = null, p = null);
    }
    S.imageSmoothingEnabled = qon(om(S), n.interpolate), nMe(S, h, 0, 0, h.width, h.height, 0, 0, a, i), E && this.canvasFactory.destroy(E), p && this.canvasFactory.destroy(p), S.globalCompositeOperation = "source-in";
    const M = fo.transform(y8(S), [1, 0, 0, 1, -C, -I]);
    return S.fillStyle = s ? o.getPattern(r, this, M, T1.FILL, t) : o, S.fillRect(0, 0, a, i), d && !s && d.set(u, A.canvas), (P = this.dependencyTracker) == null || P.recordDependencies(t, h4.transformAndFill), {
      canvas: A.canvas,
      canvasEntry: d && !s ? null : A,
      offsetX: Math.round(C),
      offsetY: Math.round(I)
    };
  }
  setLineWidth(t, n) {
    var r;
    (r = this.dependencyTracker) == null || r.recordSimpleData("lineWidth", t), n !== this.current.lineWidth && (this._cachedScaleForStroking[0] = -1), this.current.lineWidth = n, this.ctx.lineWidth = n;
  }
  setLineCap(t, n) {
    var r;
    (r = this.dependencyTracker) == null || r.recordSimpleData("lineCap", t), this.ctx.lineCap = msi[n];
  }
  setLineJoin(t, n) {
    var r;
    (r = this.dependencyTracker) == null || r.recordSimpleData("lineJoin", t), this.ctx.lineJoin = fsi[n];
  }
  setMiterLimit(t, n) {
    var r;
    (r = this.dependencyTracker) == null || r.recordSimpleData("miterLimit", t), this.ctx.miterLimit = n;
  }
  setDash(t, n, r) {
    var i;
    (i = this.dependencyTracker) == null || i.recordSimpleData("dash", t);
    const a = this.ctx;
    a.setLineDash !== void 0 && (a.setLineDash(n), a.lineDashOffset = r);
  }
  setRenderingIntent(t, n) {}
  setFlatness(t, n) {}
  setGState(t, n) {
    var r, a, i, o, s;
    for (const [l, d] of n) switch (l) {
      case "LW":
        this.setLineWidth(t, d);
        break;
      case "LC":
        this.setLineCap(t, d);
        break;
      case "LJ":
        this.setLineJoin(t, d);
        break;
      case "ML":
        this.setMiterLimit(t, d);
        break;
      case "D":
        this.setDash(t, d[0], d[1]);
        break;
      case "RI":
        this.setRenderingIntent(t, d);
        break;
      case "FL":
        this.setFlatness(t, d);
        break;
      case "Font":
        this.setFont(t, d[0], d[1]);
        break;
      case "CA":
        (r = this.dependencyTracker) == null || r.recordSimpleData("strokeAlpha", t), this.current.strokeAlpha = d;
        break;
      case "ca":
        (a = this.dependencyTracker) == null || a.recordSimpleData("fillAlpha", t), this.ctx.globalAlpha = this.current.fillAlpha = d;
        break;
      case "BM":
        (i = this.dependencyTracker) == null || i.recordSimpleData("globalCompositeOperation", t), this.ctx.globalCompositeOperation = d;
        break;
      case "SMask":
        (o = this.dependencyTracker) == null || o.recordSimpleData("SMask", t), this.current.activeSMask = d ? this.tempSMask : null, this.current.activeSMask && (this.current.activeSMask.blendMode = this.ctx.globalCompositeOperation), this.tempSMask = null, this.checkSMaskState(t);
        break;
      case "TR":
        (s = this.dependencyTracker) == null || s.recordSimpleData("filter", t), this.ctx.filter = this.current.transferMaps = this.filterFactory.addFilter(d);
        break;
    }
  }
  get inSMaskMode() {
    return !!this.suspendedCtx;
  }
  _clearPreparedSMask() {
    this.smaskPreparedEntry && (this.canvasFactory.destroy(this.smaskPreparedEntry), this.smaskPreparedEntry = null), this.smaskPreparedFor = null, this.smaskPreparedOffsetX = 0, this.smaskPreparedOffsetY = 0, this.smaskPreparedOOBAlpha = null;
  }
  _ensurePreparedSMask(t) {
    t !== this.smaskPreparedFor && (this._clearPreparedSMask(), this._prepareSMaskCanvas(t));
  }
  checkSMaskState(t) {
    const n = this.inSMaskMode;
    this.current.activeSMask && !n ? this.beginSMaskMode(t) : !this.current.activeSMask && n ? this.endSMaskMode() : this.current.activeSMask && n && this._ensurePreparedSMask(this.current.activeSMask);
  }
  _prepareSMaskCanvas(t) {
    const {
        canvas: n,
        subtype: r,
        backdrop: a,
        transferMap: i
      } = t,
      o = r === "Luminosity" || r === "Alpha" && i;
    if (!o && !(r === "Luminosity" && a)) {
      this.smaskPreparedFor = t;
      return;
    }
    let s;
    if (r === "Luminosity" && a) {
      const [_, w, k] = LCe(a),
        A = Math.round(.3 * _ + .59 * w + .11 * k);
      s = (i == null ? void 0 : i[A]) ?? A;
    } else s = (i == null ? void 0 : i[0]) ?? 0;
    const l = 4,
      {
        width: d,
        height: u
      } = this.ctx.canvas,
      h = n.width * n.height,
      p = d * u < l * h,
      m = o ? {
        url: r === "Alpha" ? this.filterFactory.addAlphaFilter(i) : this.filterFactory.addLuminosityFilter(i),
        subtype: r,
        transferMap: i
      } : null,
      f = r === "Luminosity" ? a : null;
    let y, b, v;
    p ? (y = this._bakeSMaskCanvas(n, t.offsetX, t.offsetY, d, u, f, m), b = 0, v = 0) : (y = this._bakeSMaskCanvas(n, 0, 0, n.width, n.height, f, m), b = t.offsetX, v = t.offsetY), this.smaskPreparedEntry = y, this.smaskPreparedFor = t, this.smaskPreparedOffsetX = b, this.smaskPreparedOffsetY = v, this.smaskPreparedOOBAlpha = !p && s !== 0 ? s : null;
  }
  _bakeSMaskCanvas(t, n, r, a, i, o, s) {
    !o && !s && Pu("_bakeSMaskCanvas with neither backdrop nor filter");
    const l = this.canvasFactory.create(a, i),
      d = l.context;
    if (d.drawImage(t, n, r), o && (d.globalCompositeOperation = "destination-atop", d.fillStyle = o, d.fillRect(0, 0, a, i)), !s) return l;
    const u = this.canvasFactory.create(a, i),
      h = u.context;
    h.filter = s.url;
    const p = gp.isCanvasFilterSupported && h.filter !== "none" && h.filter !== "";
    if (h.drawImage(l.canvas, 0, 0), gp.isCanvasFilterSupported && (h.filter = "none"), !p) {
      const m = h.getImageData(0, 0, a, i),
        {
          data: f
        } = m,
        {
          transferMap: y
        } = s;
      if (s.subtype === "Luminosity") for (let b = 0, v = f.length; b < v; b += 4) {
        const _ = .3 * f[b] + .59 * f[b + 1] + .11 * f[b + 2] + .5 | 0;
        f[b] = f[b + 1] = f[b + 2] = 0, f[b + 3] = (y == null ? void 0 : y[_]) ?? _;
      } else for (let b = 3, v = f.length; b < v; b += 4) f[b] = y[f[b]];
      h.putImageData(m, 0, 0);
    }
    return this.canvasFactory.destroy(l), u;
  }
  beginSMaskMode(t) {
    if (this.inSMaskMode) throw new Error("beginSMaskMode called while already in smask mode");
    const {
        width: n,
        height: r
      } = this.ctx.canvas,
      a = this.canvasFactory.create(n, r);
    this.smaskScratchCanvas = a, this.suspendedCtx = this.ctx;
    const i = this.ctx = a.context;
    i.setTransform(this.suspendedCtx.getTransform()), ZG(this.suspendedCtx, i), Gon(i, this.suspendedCtx), this._ensurePreparedSMask(this.current.activeSMask), this.setGState(t, [["BM", "source-over"]]);
  }
  endSMaskMode() {
    if (!this.inSMaskMode) throw new Error("endSMaskMode called while not in smask mode");
    this.ctx._removeMirroring(), ZG(this.ctx, this.suspendedCtx), this.ctx = this.suspendedCtx, this.suspendedCtx = null, this.canvasFactory.destroy(this.smaskScratchCanvas), this.smaskScratchCanvas = null, this._clearPreparedSMask();
  }
  compose(t) {
    if (!this.current.activeSMask) return;
    t = t ? [Math.floor(t[0]), Math.floor(t[1]), Math.ceil(t[2]), Math.ceil(t[3])] : [0, 0, this.ctx.canvas.width, this.ctx.canvas.height];
    const n = this.current.activeSMask,
      r = this.suspendedCtx,
      a = te(this, EB) > 0 && r === this.ctx;
    this.composeSMask(a ? null : r, n, this.ctx, t), !a && (this.ctx.save(), this.ctx.setTransform(1, 0, 0, 1, 0, 0), this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height), this.ctx.restore());
  }
  composeSMask(t, n, r, a) {
    const i = a[0],
      o = a[1],
      s = a[2] - i,
      l = a[3] - o;
    if (s === 0 || l === 0) return;
    const d = this.smaskPreparedEntry;
    if (d) {
      let u = i,
        h = o,
        p = s,
        m = l;
      const f = this.smaskPreparedOOBAlpha,
        y = f !== null;
      if (y) {
        u = Math.max(i, n.offsetX), h = Math.max(o, n.offsetY);
        const b = Math.min(i + s, n.offsetX + n.canvas.width),
          v = Math.min(o + l, n.offsetY + n.canvas.height);
        p = b - u, m = v - h;
      }
      if (p > 0 && m > 0) {
        const b = u - this.smaskPreparedOffsetX,
          v = h - this.smaskPreparedOffsetY;
        r.save(), r.globalAlpha = 1, r.setTransform(1, 0, 0, 1, 0, 0);
        const _ = new Path2D();
        _.rect(u, h, p, m), r.clip(_), r.globalCompositeOperation = "destination-in", r.drawImage(d.canvas, b, v, p, m, u, h, p, m), r.restore();
      }
      y && f < 255 && this._applySMaskOOBAlpha(r, i, o, s, l, u, h, u + p, h + m, f);
    } else this.genericComposeSMask(n, r, s, l, i, o);
    t && (t.save(), t.globalAlpha = 1, t.globalCompositeOperation = n.blendMode || "source-over", t.setTransform(1, 0, 0, 1, 0, 0), t.drawImage(r.canvas, i, o, s, l, i, o, s, l), t.restore());
  }
  _applySMaskOOBAlpha(t, n, r, a, i, o, s, l, d, u) {
    const h = o < l && s < d;
    if (h && o === n && s === r && l === n + a && d === r + i) return;
    const p = new Path2D();
    p.rect(n, r, a, i), h && p.rect(o, s, l - o, d - s), t.save(), t.globalAlpha = u / 255, t.setTransform(1, 0, 0, 1, 0, 0), t.clip(p, "evenodd"), t.globalCompositeOperation = "destination-in", t.fillStyle = "#000000", t.fillRect(n, r, a, i), t.restore();
  }
  genericComposeSMask(t, n, r, a, i, o) {
    const {
      context: s,
      offsetX: l,
      offsetY: d
    } = t;
    n.save(), n.globalAlpha = 1, n.setTransform(1, 0, 0, 1, 0, 0);
    const u = new Path2D();
    u.rect(i, o, r, a), n.clip(u), n.globalCompositeOperation = "destination-in", n.drawImage(s.canvas, i - l, o - d, r, a, i, o, r, a), n.restore();
  }
  save(t) {
    var r;
    this.inSMaskMode && ZG(this.ctx, this.suspendedCtx), this.ctx.save();
    const n = this.current;
    this.stateStack.push(n), this.current = n.clone(), (r = this.dependencyTracker) == null || r.save(t);
  }
  restore(t) {
    var n;
    if ((n = this.dependencyTracker) == null || n.restore(t), this.stateStack.length === 0) {
      this.inSMaskMode && this.endSMaskMode();
      return;
    }
    this.current = this.stateStack.pop(), this.ctx.restore(), this.inSMaskMode && (ZG(this.suspendedCtx, this.ctx), this.ctx.setTransform(this.suspendedCtx.getTransform())), this.checkSMaskState(t), this.pendingClip = null, this._cachedScaleForStroking[0] = -1, this._cachedGetSinglePixelWidth = null;
  }
  transform(t, n, r, a, i, o, s) {
    var l;
    (l = this.dependencyTracker) == null || l.recordIncrementalData("transform", t), this.ctx.transform(n, r, a, i, o, s), this._cachedScaleForStroking[0] = -1, this._cachedGetSinglePixelWidth = null;
  }
  constructPath(t, n, r, a) {
    let [i] = r;
    if (!a) {
      i || (i = r[0] = new Path2D()), n !== G8.stroke && n !== G8.closeStroke && (this.current.tilingPatternDims = null), this[n](t, i);
      return;
    }
    if (this.dependencyTracker !== null) {
      const s = n === G8.stroke ? this.current.lineWidth / 2 : 0;
      this.dependencyTracker.resetBBox(t).recordBBox(t, this.ctx, a[0] - s, a[2] + s, a[1] - s, a[3] + s).recordDependencies(t, ["transform"]);
    }
    i instanceof Path2D || (i = r[0] = Var(i)), fo.axialAlignedBoundingBox(a, om(this.ctx), this.current.minMax);
    const o = this.current.tilingPatternDims;
    if (o && n !== G8.stroke && n !== G8.closeStroke && this.current.fillColor instanceof b1e) {
      const s = fo.intersect(this.current.clipBox, this.current.minMax);
      s ? this.current.fillColor.updatePatternDims(s, o) : this.current.tilingPatternDims = null;
    }
    this[n](t, i), this._pathStartIdx = t;
  }
  closePath(t) {
    this.ctx.closePath();
  }
  stroke(t, n, r = !0) {
    var s;
    const a = r && Gt(this, Fs, F_).call(this, this.current.strokeAlpha),
      i = this.ctx,
      o = this.current.strokeColor;
    if (i.globalAlpha = this.current.strokeAlpha, this.contentVisible) if (typeof o == "object" && (o != null && o.getPattern)) {
      const l = o.isModifyingCurrentTransform() ? i.getTransform() : null;
      if (i.save(), i.strokeStyle = o.getPattern(i, this, y8(i), T1.STROKE, t), l) {
        const d = new Path2D();
        d.addPath(n, i.getTransform().invertSelf().multiplySelf(l)), n = d;
      }
      this.rescaleAndStroke(n, !1), i.restore();
    } else this.rescaleAndStroke(n, !0);
    (s = this.dependencyTracker) == null || s.recordDependencies(t, h4.stroke), r && this.consumePath(t, n, this.current.getClippedPathBoundingBox(T1.STROKE, om(this.ctx))), i.globalAlpha = this.current.fillAlpha, Gt(this, Fs, Mw).call(this, a);
  }
  closeStroke(t, n) {
    this.stroke(t, n);
  }
  fill(t, n, r = !0) {
    var u, h, p;
    const a = r && Gt(this, Fs, F_).call(this, this.current.fillAlpha),
      i = this.ctx,
      o = this.current.fillColor,
      s = this.current.patternFill;
    let l = !1;
    const d = this.current.getClippedPathBoundingBox();
    if ((u = this.dependencyTracker) == null || u.recordDependencies(t, h4.fill), s) {
      const m = this.current.tilingPatternDims,
        f = m && o.canSkipPatternCanvas(m);
      if (f) {
        o.drawPattern(this, n, this.pendingEOFill, f, t), this.pendingEOFill = !1, r && this.consumePath(t, n, d), this.current.tilingPatternDims = null, Gt(this, Fs, Mw).call(this, a);
        return;
      }
      const y = o.isModifyingCurrentTransform() ? i.getTransform() : null;
      if ((h = this.dependencyTracker) == null || h.save(t), i.save(), i.fillStyle = o.getPattern(i, this, y8(i), T1.FILL, t), y) {
        const b = new Path2D();
        b.addPath(n, i.getTransform().invertSelf().multiplySelf(y)), n = b;
      }
      l = !0;
    }
    this.contentVisible && d !== null && (this.pendingEOFill ? (i.fill(n, "evenodd"), this.pendingEOFill = !1) : i.fill(n)), l && (i.restore(), (p = this.dependencyTracker) == null || p.restore(t)), r && this.consumePath(t, n, d), Gt(this, Fs, Mw).call(this, a);
  }
  eoFill(t, n) {
    this.pendingEOFill = !0, this.fill(t, n);
  }
  fillStroke(t, n) {
    const r = Gt(this, Fs, F_).call(this, Math.min(this.current.fillAlpha, this.current.strokeAlpha));
    this.fill(t, n, !1), this.stroke(t, n, !1), this.consumePath(t, n), Gt(this, Fs, Mw).call(this, r);
  }
  eoFillStroke(t, n) {
    this.pendingEOFill = !0, this.fillStroke(t, n);
  }
  closeFillStroke(t, n) {
    this.fillStroke(t, n);
  }
  closeEOFillStroke(t, n) {
    this.pendingEOFill = !0, this.fillStroke(t, n);
  }
  endPath(t, n) {
    this.consumePath(t, n);
  }
  rawFillPath(t, n) {
    var a;
    const r = Gt(this, Fs, F_).call(this, this.current.fillAlpha);
    this.ctx.fill(n), (a = this.dependencyTracker) == null || a.recordDependencies(t, h4.rawFillPath).recordOperation(t), Gt(this, Fs, Mw).call(this, r);
  }
  clip(t) {
    var n;
    (n = this.dependencyTracker) == null || n.recordFutureForcedDependency("clipMode", t), this.pendingClip = gsi;
  }
  eoClip(t) {
    var n;
    (n = this.dependencyTracker) == null || n.recordFutureForcedDependency("clipMode", t), this.pendingClip = Kon;
  }
  beginText(t) {
    var n;
    this.current.textMatrix = null, this.current.textMatrixScale = 1, this.current.x = this.current.lineX = 0, this.current.y = this.current.lineY = 0, (n = this.dependencyTracker) == null || n.recordOpenMarker(t).resetIncrementalData("sameLineText").resetIncrementalData("moveText", t);
  }
  endText(t) {
    const n = this.pendingTextPaths,
      r = this.ctx;
    if (this.dependencyTracker) {
      const {
        dependencyTracker: a
      } = this;
      n !== void 0 && a.recordFutureForcedDependency("textClip", a.getOpenMarker()).recordFutureForcedDependency("textClip", t), a.recordCloseMarker(t);
    }
    if (n !== void 0) {
      const a = new Path2D(),
        i = r.getTransform().invertSelf();
      for (const {
        transform: o,
        x: s,
        y: l,
        fontSize: d,
        path: u
      } of n) u && a.addPath(u, new DOMMatrix(o).preMultiplySelf(i).translate(s, l).scale(d, -d));
      r.clip(a);
    }
    delete this.pendingTextPaths;
  }
  setCharSpacing(t, n) {
    var r;
    (r = this.dependencyTracker) == null || r.recordSimpleData("charSpacing", t), this.current.charSpacing = n;
  }
  setWordSpacing(t, n) {
    var r;
    (r = this.dependencyTracker) == null || r.recordSimpleData("wordSpacing", t), this.current.wordSpacing = n;
  }
  setHScale(t, n) {
    var r;
    (r = this.dependencyTracker) == null || r.recordSimpleData("hScale", t), this.current.textHScale = n / 100;
  }
  setLeading(t, n) {
    var r;
    (r = this.dependencyTracker) == null || r.recordSimpleData("leading", t), this.current.leading = -n;
  }
  setFont(t, n, r) {
    var h, p;
    (h = this.dependencyTracker) == null || h.recordSimpleData("font", t).recordSimpleDataFromNamed("fontObj", n, t);
    const a = this.commonObjs.get(n),
      i = this.current;
    if (!a) throw new Error(`Can't find font for ${n}`);
    if (i.fontMatrix = a.fontMatrix || txt, (i.fontMatrix[0] === 0 || i.fontMatrix[3] === 0) && Vl("Invalid font matrix for font " + n), r < 0 ? (r = -r, i.fontDirection = -1) : i.fontDirection = 1, this.current.font = a, this.current.fontSize = r, a.isType3Font) return;
    const o = a.loadedName || "sans-serif",
      s = ((p = a.systemFontInfo) == null ? void 0 : p.css) || `"${o}", ${a.fallbackName}`;
    let l = "normal";
    a.black ? l = "900" : a.bold && (l = "bold");
    const d = a.italic ? "italic" : "normal",
      u = Pm(r, usi, hsi);
    this.current.fontSizeScale = r / u, this.ctx.font = `${d} ${l} ${u}px ${s}`;
  }
  setTextRenderingMode(t, n) {
    var r;
    (r = this.dependencyTracker) == null || r.recordSimpleData("textRenderingMode", t), this.current.textRenderingMode = n;
  }
  setTextRise(t, n) {
    var r;
    (r = this.dependencyTracker) == null || r.recordSimpleData("textRise", t), this.current.textRise = n;
  }
  moveText(t, n, r) {
    var a;
    (a = this.dependencyTracker) == null || a.resetIncrementalData("sameLineText").recordIncrementalData("moveText", t), this.current.x = this.current.lineX += n, this.current.y = this.current.lineY += r;
  }
  setLeadingMoveText(t, n, r) {
    this.setLeading(t, -r), this.moveText(t, n, r);
  }
  setTextMatrix(t, n) {
    var a;
    (a = this.dependencyTracker) == null || a.resetIncrementalData("sameLineText").recordSimpleData("textMatrix", t);
    const {
      current: r
    } = this;
    r.textMatrix = n, r.textMatrixScale = Math.hypot(n[0], n[1]), r.x = r.lineX = 0, r.y = r.lineY = 0;
  }
  nextLine(t) {
    var n;
    this.moveText(t, 0, this.current.leading), (n = this.dependencyTracker) == null || n.recordIncrementalData("moveText", this.dependencyTracker.getSimpleIndex("leading") ?? t);
  }
  paintChar(t, n, r, a, i, o) {
    var v, _, w, k;
    const s = this.ctx,
      l = this.current,
      d = l.font,
      u = l.textRenderingMode,
      h = l.fontSize / l.fontSizeScale,
      p = u & rb.FILL_STROKE_MASK,
      m = !!(u & rb.ADD_TO_PATH_FLAG),
      f = l.patternFill && !d.missingFile,
      y = l.patternStroke && !d.missingFile;
    let b;
    if ((d.disableFontFace || m || f || y) && !d.missingFile && (b = d.getPathGenerator(this.commonObjs, n)), b && (d.disableFontFace || f || y)) {
      s.save(), s.translate(r, a), s.scale(h, -h), (v = this.dependencyTracker) == null || v.recordCharacterBBox(t, s, d);
      let A;
      if (p === rb.FILL || p === rb.FILL_STROKE) if (i) {
        A = s.getTransform(), s.setTransform(...i);
        const S = Gt(this, Fs, Kxt).call(this, b, A, i);
        s.fill(S);
      } else s.fill(b);
      if (p === rb.STROKE || p === rb.FILL_STROKE) if (o) {
        A || (A = s.getTransform()), s.setTransform(...o);
        const {
            a: S,
            b: C,
            c: I,
            d: E
          } = A,
          M = fo.inverseTransform(o),
          T = fo.transform([S, C, I, E, 0, 0], M);
        fo.singularValueDecompose2dScale(T, dS), s.lineWidth *= Math.max(dS[0], dS[1]) / h, s.stroke(Gt(this, Fs, Kxt).call(this, b, A, o));
      } else s.lineWidth /= h, s.stroke(b);
      s.restore();
    } else (p === rb.FILL || p === rb.FILL_STROKE) && (s.fillText(n, r, a), (_ = this.dependencyTracker) == null || _.recordCharacterBBox(t, s, d, h, r, a, () => s.measureText(n))), (p === rb.STROKE || p === rb.FILL_STROKE) && (this.dependencyTracker && ((w = this.dependencyTracker) == null || w.recordCharacterBBox(t, s, d, h, r, a, () => s.measureText(n)).recordDependencies(t, h4.stroke)), s.strokeText(n, r, a));
    m && ((this.pendingTextPaths || (this.pendingTextPaths = [])).push({
      transform: om(s),
      x: r,
      y: a,
      fontSize: h,
      path: b
    }), (k = this.dependencyTracker) == null || k.recordCharacterBBox(t, s, d, h, r, a));
  }
  get isFontSubpixelAAEnabled() {
    const t = this.canvasFactory.create(10, 10),
      n = t.context;
    n.scale(1.5, 1), n.fillText("I", 0, 10);
    const r = n.getImageData(0, 0, 10, 10).data;
    this.canvasFactory.destroy(t);
    let a = !1;
    for (let i = 3; i < r.length; i += 4) if (r[i] > 0 && r[i] < 255) {
      a = !0;
      break;
    }
    return Ws(this, "isFontSubpixelAAEnabled", a);
  }
  showText(t, n) {
    var P, R, j, B;
    this.dependencyTracker && (this.dependencyTracker.recordDependencies(t, h4.showText).resetBBox(t), this.current.textRenderingMode & rb.ADD_TO_PATH_FLAG && this.dependencyTracker.recordFutureForcedDependency("textClip", t).inheritPendingDependenciesAsFutureForcedDependencies());
    const r = this.current,
      a = r.font;
    if (a.isType3Font) {
      const F = Gt(this, Fs, F_).call(this, r.fillAlpha);
      this.showType3Text(t, n), (P = this.dependencyTracker) == null || P.recordShowTextOperation(t), Gt(this, Fs, Mw).call(this, F);
      return;
    }
    const i = r.fontSize;
    if (i === 0) {
      (R = this.dependencyTracker) == null || R.recordOperation(t);
      return;
    }
    const o = Gt(this, Fs, F_).call(this, r.fillAlpha),
      s = this.ctx,
      l = r.fontSizeScale,
      d = r.charSpacing,
      u = r.wordSpacing,
      h = r.fontDirection,
      p = r.textHScale * h,
      m = n.length,
      f = a.vertical,
      y = f ? 1 : -1,
      b = a.defaultVMetrics,
      v = i * r.fontMatrix[0],
      _ = r.textRenderingMode === rb.FILL && !a.disableFontFace && !r.patternFill;
    s.save(), r.textMatrix && s.transform(...r.textMatrix), s.translate(r.x, r.y + r.textRise), h > 0 ? s.scale(p, -1) : s.scale(p, 1);
    let w, k;
    const A = r.textRenderingMode & rb.FILL_STROKE_MASK,
      S = A === rb.FILL || A === rb.FILL_STROKE,
      C = A === rb.STROKE || A === rb.FILL_STROKE;
    let I = r.lineWidth;
    const E = r.textMatrixScale;
    if (E === 0 || I === 0 ? C && (I = this.getSinglePixelWidth()) : I /= E, l !== 1 && (s.scale(l, l), I /= l), s.lineWidth = I, S && r.patternFill) {
      s.save();
      const F = r.fillColor.getPattern(s, this, y8(s), T1.FILL, t);
      w = om(s), s.restore(), s.fillStyle = F;
    }
    if (C && r.patternStroke) {
      s.save();
      const F = r.strokeColor.getPattern(s, this, y8(s), T1.STROKE, t);
      k = om(s), s.restore(), s.strokeStyle = F;
    }
    if (a.isInvalidPDFjsFont) {
      const F = [];
      let N = 0;
      for (const z of n) F.push(z.unicode), N += z.width;
      const G = F.join("");
      if (s.fillText(G, 0, 0), this.dependencyTracker !== null) {
        const z = s.measureText(G);
        this.dependencyTracker.recordBBox(t, this.ctx, -z.actualBoundingBoxLeft, z.actualBoundingBoxRight, -z.actualBoundingBoxAscent, z.actualBoundingBoxDescent).recordShowTextOperation(t);
      }
      r.x += N * v * p, s.restore(), this.compose(), Gt(this, Fs, Mw).call(this, o);
      return;
    }
    let M = 0,
      T;
    for (T = 0; T < m; ++T) {
      const F = n[T];
      if (typeof F == "number") {
        M += y * F * i / 1e3;
        continue;
      }
      let N = !1;
      const G = (F.isSpace ? u : 0) + d,
        z = F.fontChar,
        V = F.accent;
      let O,
        L,
        D = F.width;
      if (f) {
        const Y = F.vmetric || b,
          K = -(F.vmetric ? Y[1] : D * .5) * v,
          W = Y[2] * v;
        D = Y ? -Y[0] : D, O = K / l, L = (M + W) / l;
      } else O = M / l, L = 0;
      let U;
      if (a.remeasure && D > 0) {
        U = s.measureText(z);
        const Y = U.width * 1e3 / i * l;
        if (D < Y && this.isFontSubpixelAAEnabled) {
          const K = D / Y;
          N = !0, s.save(), s.scale(K, 1), O /= K;
        } else D !== Y && (O += (D - Y) / 2e3 * i / l);
      }
      if (this.contentVisible && (F.isInFont || a.missingFile)) {
        if (_ && !V) s.fillText(z, O, L), (j = this.dependencyTracker) == null || j.recordCharacterBBox(t, s, U ? {
          bbox: null
        } : a, i / l, O, L, () => U ?? s.measureText(z));else if (this.paintChar(t, z, O, L, w, k), V) {
          const Y = O + i * V.offset.x / l,
            K = L - i * V.offset.y / l;
          this.paintChar(t, V.fontChar, Y, K, w, k);
        }
      }
      const H = f ? D * v - G * h : D * v + G * h;
      M += H, N && s.restore();
    }
    f ? r.y -= M : r.x += M * p, s.restore(), this.compose(), (B = this.dependencyTracker) == null || B.recordShowTextOperation(t), Gt(this, Fs, Mw).call(this, o);
  }
  showType3Text(t, n) {
    const r = this.ctx,
      a = this.current,
      i = a.font,
      o = a.fontSize,
      s = a.fontDirection,
      l = i.vertical ? 1 : -1,
      d = a.charSpacing,
      u = a.wordSpacing,
      h = a.textHScale * s,
      p = a.fontMatrix || txt,
      m = n.length,
      f = a.textRenderingMode === rb.INVISIBLE;
    let y, b, v, _;
    if (f || o === 0) return;
    this._cachedScaleForStroking[0] = -1, this._cachedGetSinglePixelWidth = null, r.save(), a.textMatrix && r.transform(...a.textMatrix), r.translate(a.x, a.y + a.textRise), r.scale(h, s);
    const w = this.dependencyTracker;
    for (this.dependencyTracker = w ? new Pke(w, t) : null, y = 0; y < m; ++y) {
      if (b = n[y], typeof b == "number") {
        _ = l * b * o / 1e3, this.ctx.translate(_, 0), a.x += _ * h;
        continue;
      }
      const k = (b.isSpace ? u : 0) + d,
        A = i.charProcOperatorList.get(b.operatorListId);
      A ? this.contentVisible && (this.save(), A.fnArray[0] === G8.setCharWidth && (a.fillAlpha = a.strokeAlpha = 1, r.globalAlpha = 1), r.scale(o, o), r.transform(...p), this.executeOperatorList(A), this.restore()) : Vl(`Type3 character "${b.operatorListId}" is not available.`);
      const S = [b.width, 0];
      fo.applyTransform(S, p), v = S[0] * o + k, r.translate(v, 0), a.x += v * h;
    }
    r.restore(), w && (this.dependencyTracker = w);
  }
  setCharWidth(t, n, r) {}
  setCharWidthAndBounds(t, n, r, a, i, o, s) {
    var d;
    const l = new Path2D();
    l.rect(a, i, o - a, s - i), this.ctx.clip(l), (d = this.dependencyTracker) == null || d.recordBBox(t, this.ctx, a, o, i, s).recordClipBox(t, this.ctx, a, o, i, s), this.endPath(t);
  }
  getColorN_Pattern(t, n) {
    let r;
    if (n[0] === "TilingPattern") {
      const a = this.baseTransform || om(this.ctx),
        i = {
          createCanvasGraphics: (o, s) => new jH(o, this.commonObjs, this.objs, this.canvasFactory, this.filterFactory, {
            optionalContentConfig: this.optionalContentConfig,
            markedContentStack: this.markedContentStack
          }, void 0, void 0, this.dependencyTracker ? new Pke(this.dependencyTracker, s, !0) : null)
        };
      r = new b1e(n, this.ctx, i, a);
    } else r = this._getPattern(t, n[1], n[2]);
    return r;
  }
  setStrokeColorN(t, ...n) {
    var r;
    (r = this.dependencyTracker) == null || r.recordSimpleData("strokeColor", t), this.current.strokeColor = this.getColorN_Pattern(t, n), this.current.patternStroke = !0;
  }
  setFillColorN(t, ...n) {
    var a;
    (a = this.dependencyTracker) == null || a.recordSimpleData("fillColor", t);
    const r = this.current.fillColor = this.getColorN_Pattern(t, n);
    this.current.patternFill = !0, this.current.tilingPatternDims = r instanceof b1e ? [0, 0, 0, 0] : null;
  }
  setStrokeRGBColor(t, n) {
    var r;
    (r = this.dependencyTracker) == null || r.recordSimpleData("strokeColor", t), this.ctx.strokeStyle = this.current.strokeColor = n, this.current.patternStroke = !1;
  }
  setStrokeTransparent(t) {
    var n;
    (n = this.dependencyTracker) == null || n.recordSimpleData("strokeColor", t), this.ctx.strokeStyle = this.current.strokeColor = "transparent", this.current.patternStroke = !1;
  }
  setFillRGBColor(t, n) {
    var r;
    (r = this.dependencyTracker) == null || r.recordSimpleData("fillColor", t), this.ctx.fillStyle = this.current.fillColor = n, this.current.patternFill = !1, this.current.tilingPatternDims = null;
  }
  setFillTransparent(t) {
    var n;
    (n = this.dependencyTracker) == null || n.recordSimpleData("fillColor", t), this.ctx.fillStyle = this.current.fillColor = "transparent", this.current.patternFill = !1, this.current.tilingPatternDims = null;
  }
  _getPattern(t, n, r = null) {
    const a = this.cachedPatterns.getOrInsertComputed(n, () => dsi(this.getObject(t, n)));
    return r && (a.matrix = r), a;
  }
  shadingFill(t, n) {
    var s;
    if (!this.contentVisible) return;
    const r = Gt(this, Fs, F_).call(this, this.current.fillAlpha),
      a = this.ctx;
    this.save(t);
    const i = this._getPattern(t, n);
    a.fillStyle = i.getPattern(a, this, y8(a), T1.SHADING, t);
    const o = y8(a);
    if (o) {
      const {
          width: l,
          height: d
        } = a.canvas,
        u = SW.slice();
      fo.axialAlignedBoundingBox([0, 0, l, d], o, u);
      const [h, p, m, f] = u;
      this.ctx.fillRect(h, p, m - h, f - p);
    } else this.ctx.fillRect(-1e10, -1e10, 2e10, 2e10);
    (s = this.dependencyTracker) == null || s.resetBBox(t).recordFullPageBBox(t).recordDependencies(t, h4.transform).recordDependencies(t, h4.fill).recordOperation(t), this.compose(this.current.getClippedPathBoundingBox()), this.restore(t), Gt(this, Fs, Mw).call(this, r);
  }
  beginInlineImage() {
    Pu("Should not call beginInlineImage");
  }
  beginImageData() {
    Pu("Should not call beginImageData");
  }
  paintFormXObjectBegin(t, n, r) {
    var a;
    if (this.contentVisible && (this.save(t), this.baseTransformStack.push(this.baseTransform), n && this.transform(t, ...n), this.baseTransform = om(this.ctx), r)) {
      fo.axialAlignedBoundingBox(r, this.baseTransform, this.current.minMax);
      const [i, o, s, l] = r,
        d = new Path2D();
      d.rect(i, o, s - i, l - o), this.ctx.clip(d), (a = this.dependencyTracker) == null || a.recordClipBox(t, this.ctx, i, s, o, l), this.endPath(t);
    }
  }
  paintFormXObjectEnd(t) {
    this.contentVisible && (this.restore(t), this.baseTransform = this.baseTransformStack.pop());
  }
  beginGroup(t, n) {
    var k;
    if (!this.contentVisible) return;
    this.save(t);
    const {
      inSMaskMode: r
    } = this;
    r && (this.endSMaskMode(), this.current.activeSMask = null);
    const a = this.ctx;
    if ((!n.needsIsolation || !n.isolated && !n.hasSoftMask) && !n.knockout && !n.isGray && te(this, GA) === 0 && a.globalAlpha === 1 && a.globalCompositeOperation === "source-over" && !r) {
      if (n.bbox) {
        let A = new Path2D();
        const [S, C, I, E] = n.bbox;
        if (A.rect(S, C, I - S, E - C), n.matrix) {
          const M = new Path2D();
          M.addPath(A, new DOMMatrix(n.matrix)), A = M;
        }
        a.clip(A);
      }
      this.groupStack.push(null), te(this, i6).push(null), this.groupLevel++;
      return;
    }
    !n.isolated && !n.knockout && te(this, GA) === 0 && YXe("TODO: Fully support non-isolated non-knockout groups.");
    const i = om(a);
    n.matrix && a.transform(...n.matrix);
    const o = [0, 0, a.canvas.width, a.canvas.height];
    let s;
    n.bbox ? (s = SW.slice(), fo.axialAlignedBoundingBox(n.bbox, om(a), s), s = fo.intersect(s, o) || [0, 0, 0, 0]) : s = o;
    const l = Math.floor(s[0]),
      d = Math.floor(s[1]),
      u = Math.max(Math.ceil(s[2]) - l, 1),
      h = Math.max(Math.ceil(s[3]) - d, 1);
    this.current.startNewPathAndClipBox([0, 0, u, h]);
    const p = this.canvasFactory.create(u, h);
    n.smask && this.smaskGroupCanvases.push(p);
    const m = p.context,
      f = n.knockout && !n.isolated ? a : null,
      y = !n.isolated && !n.knockout && !n.smask && n.needsIsolation && te(this, GA) > 0,
      b = n.knockout ? this.canvasFactory.create(u, h) : null,
      v = te(this, GA);
    n.knockout ? rm(this, GA)._++ : yt(this, GA, 0), m.translate(-l, -d), m.transform(...i);
    const _ = !n.isolated && !n.smask && n.needsIsolation,
      w = _ && !r && v === 0 && !n.knockout && !n.isGray && n.hasSoftMask && a.globalAlpha === 1 && a.globalCompositeOperation === "source-over" && this.current.transferMaps === "none";
    if (_ && (r || w) && (m.save(), m.setTransform(1, 0, 0, 1, 0, 0), m.drawImage(a.canvas, -l, -d), m.restore()), n.bbox) {
      let A = new Path2D();
      const [S, C, I, E] = n.bbox;
      if (A.rect(S, C, I - S, E - C), n.matrix) {
        const M = new Path2D();
        M.addPath(A, new DOMMatrix(n.matrix)), A = M;
      }
      m.clip(A);
    }
    n.smask && this.smaskStack.push({
      canvas: p.canvas,
      context: m,
      offsetX: l,
      offsetY: d,
      subtype: n.smask.subtype,
      backdrop: n.smask.backdrop,
      transferMap: n.smask.transferMap || null
    }), (!n.smask || this.dependencyTracker) && (a.setTransform(1, 0, 0, 1, 0, 0), a.translate(l, d), a.save()), ZG(a, m), this.ctx = m, (k = this.dependencyTracker) == null || k.inheritSimpleDataAsFutureForcedDependencies(["fillAlpha", "strokeAlpha", "globalCompositeOperation"]).pushBaseTransform(a), this.setGState(t, [["BM", "source-over"], ["ca", 1], ["CA", 1], ["TR", null]]), this.groupStack.push(a), te(this, i6).push({
      backdropCtx: f,
      savedKnockoutLevel: v,
      offsetX: l,
      offsetY: d,
      hasInnerBackdrop: y,
      replaceBackdrop: w,
      knockoutMaskEntry: b,
      knockoutTempEntry: null,
      knockoutBackdropEntry: null
    }), this.groupLevel++;
  }
  endGroup(t, n) {
    var o;
    if (!this.contentVisible) return;
    this.groupLevel--;
    const r = this.ctx,
      a = this.groupStack.pop(),
      i = te(this, i6).pop();
    if (i && yt(this, GA, i.savedKnockoutLevel), a === null) {
      this.restore(t);
      return;
    }
    if (n.isGray && Gt(this, Fs, zir).call(this, r), this.ctx = a, this.ctx.imageSmoothingEnabled = !1, (o = this.dependencyTracker) == null || o.popBaseTransform(), n.smask) this.tempSMask = this.smaskStack.pop(), this.restore(t), this.dependencyTracker && (this.ctx.restore(), this.inSMaskMode && this.ctx.setTransform(this.suspendedCtx.getTransform())), Gt(this, Fs, _7e).call(this, i);else {
      this.ctx.restore();
      const s = om(this.ctx);
      this.restore(t), this.ctx.save(), this.ctx.setTransform(...s);
      const l = SW.slice();
      fo.axialAlignedBoundingBox([0, 0, r.canvas.width, r.canvas.height], s, l);
      const d = te(this, i6).at(-1);
      if (te(this, GA) > 0) {
        if (i.hasInnerBackdrop) {
          const {
              width: u,
              height: h
            } = r.canvas,
            p = this.canvasFactory.create(u, h),
            m = p.context;
          m.drawImage(a.canvas, i.offsetX, i.offsetY, u, h, 0, 0, u, h), m.globalCompositeOperation = "source-over", m.drawImage(r.canvas, 0, 0);
          const f = Gt(this, Fs, Hxt).call(this, r.canvas);
          m.globalCompositeOperation = "destination-in", m.drawImage(f.canvas, 0, 0);
          const y = this.ctx.globalCompositeOperation,
            b = this.ctx.globalAlpha,
            v = this.ctx.filter;
          this.ctx.save(), this.ctx.setTransform(...s), this.ctx.globalAlpha = 1, gp.isCanvasFilterSupported && (this.ctx.filter = "none"), this.ctx.globalCompositeOperation = "destination-out", this.ctx.drawImage(f.canvas, 0, 0), this.ctx.globalCompositeOperation = y, this.ctx.globalAlpha = b, gp.isCanvasFilterSupported && (this.ctx.filter = v ?? "none"), this.ctx.drawImage(p.canvas, 0, 0), this.ctx.restore(), this.canvasFactory.destroy(f), this.canvasFactory.destroy(p);
        } else {
          const u = (d == null ? void 0 : d.backdropCtx) ?? null;
          Gt(this, Fs, qxt).call(this, this.ctx, r.canvas, {
            backdropCanvas: (u == null ? void 0 : u.canvas) ?? null,
            destTransform: s,
            backdropOffset: u ? [d.offsetX + i.offsetX, d.offsetY + i.offsetY] : [0, 0],
            sourceAlpha: this.ctx.globalAlpha,
            sourceFilter: this.ctx.filter
          });
        }
      } else {
        if (i.replaceBackdrop) {
          const u = new Path2D();
          u.rect(0, 0, r.canvas.width, r.canvas.height), this.ctx.clip(u), this.ctx.globalCompositeOperation = "copy";
        }
        this.ctx.drawImage(r.canvas, 0, 0);
      }
      this.ctx.restore(), this.canvasFactory.destroy({
        canvas: r.canvas,
        context: r
      }), Gt(this, Fs, _7e).call(this, i), this.compose(l);
    }
  }
  beginAnnotation(t, n, r, a, i, o, s) {
    if (Gt(this, Fs, Gxt).call(this), rMe(this.ctx), this.ctx.save(), this.save(t), this.baseTransform && this.ctx.setTransform(...this.baseTransform), r) {
      const l = r[2] - r[0],
        d = r[3] - r[1];
      if (o && this.annotationCanvasMap) {
        a = a.slice(), a[4] -= r[0], a[5] -= r[1], fo.singularValueDecompose2dScale(om(this.ctx), dS);
        const {
            viewportScale: u
          } = this,
          h = Math.ceil(l * this.outputScaleX * u),
          p = Math.ceil(d * this.outputScaleY * u);
        this.annotationCanvas = this.canvasFactory.create(h, p);
        const {
          canvas: m,
          context: f
        } = this.annotationCanvas;
        if (s) {
          const y = this.annotationCanvasMap.getOrInsertComputed(n, kpe);
          m.setAttribute("data-canvas-name", s);
          const b = y.findIndex(v => v.getAttribute("data-canvas-name") === s);
          b === -1 ? y.push(m) : y[b] = m;
        } else this.annotationCanvasMap.set(n, m);
        this.annotationCanvas.savedCtx = this.ctx, this.ctx = f, this.ctx.save(), this.ctx.setTransform(dS[0], 0, 0, -dS[1], 0, d * dS[1]), rMe(this.ctx);
      } else {
        rMe(this.ctx), this.endPath(t);
        const u = new Path2D();
        u.rect(r[0], r[1], l, d), this.ctx.clip(u);
      }
    }
    this.current = new Von(this.ctx.canvas.width, this.ctx.canvas.height), this.baseTransformStack.push(this.baseTransform), this.transform(t, ...a), this.transform(t, ...i), this.baseTransform = om(this.ctx);
  }
  endAnnotation(t) {
    this.annotationCanvas && (this.ctx.restore(), Gt(this, Fs, Vxt).call(this), this.ctx = this.annotationCanvas.savedCtx, delete this.annotationCanvas.savedCtx, delete this.annotationCanvas), this.baseTransform = this.baseTransformStack.pop();
  }
  paintImageMaskXObject(t, n) {
    var l;
    if (!this.contentVisible) return;
    const r = n.count;
    n = this.getObject(t, n.data, n), n.count = r;
    const a = Gt(this, Fs, F_).call(this, this.current.fillAlpha),
      i = this.ctx,
      o = this._createMaskCanvas(t, n),
      s = o.canvas;
    i.save(), i.setTransform(1, 0, 0, 1, 0, 0), i.drawImage(s, o.offsetX, o.offsetY), (l = this.dependencyTracker) == null || l.resetBBox(t).recordBBox(t, this.ctx, o.offsetX, o.offsetX + s.width, o.offsetY, o.offsetY + s.height).recordOperation(t), i.restore(), o.canvasEntry && this.canvasFactory.destroy(o.canvasEntry), this.compose(), Gt(this, Fs, Mw).call(this, a);
  }
  paintImageMaskXObjectRepeat(t, n, r, a = 0, i = 0, o, s) {
    var p, m, f;
    if (!this.contentVisible) return;
    n = this.getObject(t, n.data, n);
    const l = Gt(this, Fs, F_).call(this, this.current.fillAlpha),
      d = this.ctx;
    d.save();
    const u = om(d);
    d.transform(r, a, i, o, 0, 0);
    const h = this._createMaskCanvas(t, n);
    d.setTransform(1, 0, 0, 1, h.offsetX - u[4], h.offsetY - u[5]), (p = this.dependencyTracker) == null || p.resetBBox(t);
    for (let y = 0, b = s.length; y < b; y += 2) {
      const v = fo.transform(u, [r, a, i, o, s[y], s[y + 1]]);
      d.drawImage(h.canvas, v[4], v[5]), (m = this.dependencyTracker) == null || m.recordBBox(t, this.ctx, v[4], v[4] + h.canvas.width, v[5], v[5] + h.canvas.height);
    }
    d.restore(), h.canvasEntry && this.canvasFactory.destroy(h.canvasEntry), this.compose(), (f = this.dependencyTracker) == null || f.recordOperation(t), Gt(this, Fs, Mw).call(this, l);
  }
  paintImageMaskXObjectGroup(t, n) {
    var s, l, d;
    if (!this.contentVisible) return;
    const r = Gt(this, Fs, F_).call(this, this.current.fillAlpha),
      a = this.ctx,
      i = this.current.fillColor,
      o = this.current.patternFill;
    (s = this.dependencyTracker) == null || s.resetBBox(t).recordDependencies(t, h4.transformAndFill);
    for (const u of n) {
      const {
          data: h,
          width: p,
          height: m,
          transform: f
        } = u,
        y = this.canvasFactory.create(p, m),
        b = y.context;
      b.save();
      const v = this.getObject(t, h, u);
      Won(b, v), b.globalCompositeOperation = "source-in", b.fillStyle = o ? i.getPattern(b, this, y8(a), T1.FILL, t) : i, b.fillRect(0, 0, p, m), b.restore(), a.save(), a.transform(...f), a.scale(1, -1), nMe(a, y.canvas, 0, 0, p, m, 0, -1, 1, 1), this.canvasFactory.destroy(y), (l = this.dependencyTracker) == null || l.recordBBox(t, a, 0, p, 0, m), a.restore();
    }
    this.compose(), (d = this.dependencyTracker) == null || d.recordOperation(t), Gt(this, Fs, Mw).call(this, r);
  }
  paintImageXObject(t, n) {
    if (!this.contentVisible) return;
    const r = this.getObject(t, n);
    if (!r) {
      Vl("Dependent image isn't ready yet");
      return;
    }
    this.paintInlineImageXObject(t, r);
  }
  paintImageXObjectRepeat(t, n, r, a, i) {
    if (!this.contentVisible) return;
    const o = this.getObject(t, n);
    if (!o) {
      Vl("Dependent image isn't ready yet");
      return;
    }
    const s = o.width,
      l = o.height,
      d = [];
    for (let u = 0, h = i.length; u < h; u += 2) d.push({
      transform: [r, 0, 0, a, i[u], i[u + 1]],
      x: 0,
      y: 0,
      w: s,
      h: l
    });
    this.paintInlineImageXObjectGroup(t, o, d);
  }
  applyTransferMapsToCanvas(t) {
    return this.current.transferMaps !== "none" && (t.filter = this.current.transferMaps, t.drawImage(t.canvas, 0, 0), t.filter = "none"), t.canvas;
  }
  applyTransferMapsToBitmap(t) {
    if (this.current.transferMaps === "none") return {
      img: t.bitmap,
      canvasEntry: null
    };
    const {
        bitmap: n,
        width: r,
        height: a
      } = t,
      i = this.canvasFactory.create(r, a),
      o = i.context;
    return o.filter = this.current.transferMaps, o.drawImage(n, 0, 0), o.filter = "none", {
      img: i.canvas,
      canvasEntry: i
    };
  }
  paintInlineImageXObject(t, n) {
    var h;
    if (!this.contentVisible) return;
    const r = n.width,
      a = n.height,
      i = Gt(this, Fs, F_).call(this, this.current.fillAlpha),
      o = this.ctx;
    this.save(t);
    const {
      filter: s
    } = o;
    s !== "none" && s !== "" && (o.filter = "none"), o.scale(1 / r, -1 / a);
    let l,
      d = null;
    if (n.bitmap) {
      const p = this.applyTransferMapsToBitmap(n);
      l = p.img, d = p.canvasEntry;
    } else {
      const p = this.canvasFactory.create(r, a);
      Hon(p.context, n), l = this.applyTransferMapsToCanvas(p.context), d = p;
    }
    const u = this._scaleImage(l, y8(o));
    o.imageSmoothingEnabled = qon(om(o), n.interpolate), this.dependencyTracker && (this.dependencyTracker.resetBBox(t).recordBBox(t, o, 0, r, -a, 0).recordDependencies(t, h4.imageXObject).recordOperation(t), (h = this.imagesTracker) == null || h.record(o, r, a, this.dependencyTracker.clipBox)), nMe(o, u.img, 0, 0, u.paintWidth, u.paintHeight, 0, -a, r, a), u.tmpCanvas && this.canvasFactory.destroy(u.tmpCanvas), d && this.canvasFactory.destroy(d), this.compose(), this.restore(t), Gt(this, Fs, Mw).call(this, i);
  }
  paintInlineImageXObjectGroup(t, n, r) {
    var l, d, u;
    if (!this.contentVisible) return;
    const a = Gt(this, Fs, F_).call(this, this.current.fillAlpha),
      i = this.ctx;
    let o,
      s = null;
    if (n.bitmap) o = n.bitmap;else {
      const h = n.width,
        p = n.height,
        m = this.canvasFactory.create(h, p);
      Hon(m.context, n), o = this.applyTransferMapsToCanvas(m.context), s = m;
    }
    (l = this.dependencyTracker) == null || l.resetBBox(t);
    for (const h of r) i.save(), i.transform(...h.transform), i.scale(1, -1), nMe(i, o, h.x, h.y, h.w, h.h, 0, -1, 1, 1), (d = this.dependencyTracker) == null || d.recordBBox(t, i, 0, 1, -1, 0), i.restore();
    s && this.canvasFactory.destroy(s), (u = this.dependencyTracker) == null || u.recordOperation(t), this.compose(), Gt(this, Fs, Mw).call(this, a);
  }
  paintSolidColorImageMask(t) {
    var r;
    if (!this.contentVisible) return;
    const n = Gt(this, Fs, F_).call(this, this.current.fillAlpha);
    (r = this.dependencyTracker) == null || r.resetBBox(t).recordBBox(t, this.ctx, 0, 1, 0, 1).recordDependencies(t, h4.fill).recordOperation(t), this.ctx.fillRect(0, 0, 1, 1), this.compose(), Gt(this, Fs, Mw).call(this, n);
  }
  markPoint(t, n) {}
  markPointProps(t, n, r) {}
  beginMarkedContent(t, n) {
    var r;
    (r = this.dependencyTracker) == null || r.beginMarkedContent(t), this.markedContentStack.push({
      visible: !0
    });
  }
  beginMarkedContentProps(t, n, r) {
    var a;
    (a = this.dependencyTracker) == null || a.beginMarkedContent(t), n === "OC" ? this.markedContentStack.push({
      visible: this.optionalContentConfig.isVisible(r)
    }) : this.markedContentStack.push({
      visible: !0
    }), this.contentVisible = this.isContentVisible();
  }
  endMarkedContent(t) {
    var n;
    (n = this.dependencyTracker) == null || n.endMarkedContent(t), this.markedContentStack.pop(), this.contentVisible = this.isContentVisible();
  }
  beginCompat(t) {}
  endCompat(t) {}
  consumePath(t, n, r) {
    var o, s;
    const a = this.current.isEmptyClip();
    this.pendingClip && this.current.updateClipFromPath(), this.pendingClip || this.compose(r);
    const i = this.ctx;
    this.pendingClip ? (a || (this.pendingClip === Kon ? i.clip(n, "evenodd") : i.clip(n)), this.pendingClip = null, (o = this.dependencyTracker) == null || o.bboxToClipBoxDropOperation(t).recordFutureForcedDependency("clipPath", t)) : (s = this.dependencyTracker) == null || s.recordOperation(t), this.current.startNewPathAndClipBox(this.current.clipBox);
  }
  getSinglePixelWidth() {
    if (!this._cachedGetSinglePixelWidth) {
      const t = om(this.ctx);
      if (t[1] === 0 && t[2] === 0) this._cachedGetSinglePixelWidth = 1 / Math.min(Math.abs(t[0]), Math.abs(t[3]));else {
        const n = Math.abs(t[0] * t[3] - t[2] * t[1]),
          r = Math.hypot(t[0], t[2]),
          a = Math.hypot(t[1], t[3]);
        this._cachedGetSinglePixelWidth = Math.max(r, a) / n;
      }
    }
    return this._cachedGetSinglePixelWidth;
  }
  getScaleForStroking() {
    if (this._cachedScaleForStroking[0] === -1) {
      const {
          lineWidth: t
        } = this.current,
        {
          a: n,
          b: r,
          c: a,
          d: i
        } = this.ctx.getTransform();
      let o, s;
      if (r === 0 && a === 0) {
        const l = Math.abs(n),
          d = Math.abs(i);
        if (l === d) {
          if (t === 0) o = s = 1 / l;else {
            const u = l * t;
            o = s = u < 1 ? 1 / u : 1;
          }
        } else if (t === 0) o = 1 / l, s = 1 / d;else {
          const u = l * t,
            h = d * t;
          o = u < 1 ? 1 / u : 1, s = h < 1 ? 1 / h : 1;
        }
      } else {
        const l = Math.abs(n * i - r * a),
          d = Math.hypot(n, r),
          u = Math.hypot(a, i);
        if (t === 0) o = u / l, s = d / l;else {
          const h = t * l;
          o = u > h ? u / h : 1, s = d > h ? d / h : 1;
        }
      }
      this._cachedScaleForStroking[0] = o, this._cachedScaleForStroking[1] = s;
    }
    return this._cachedScaleForStroking;
  }
  rescaleAndStroke(t, n) {
    const {
        ctx: r,
        current: {
          lineWidth: a
        }
      } = this,
      [i, o] = this.getScaleForStroking();
    if (i === o) {
      r.lineWidth = (a || 1) * i, r.stroke(t);
      return;
    }
    const s = te(jH, KGe) ?? yt(jH, KGe, new DOMMatrix()),
      l = r.getLineDash();
    n && r.save(), r.scale(i, o), s.a = 1 / i, s.d = 1 / o;
    const d = new Path2D();
    if (d.addPath(t, s), l.length > 0) {
      const u = Math.max(i, o);
      r.setLineDash(l.map(h => h / u)), r.lineDashOffset /= u;
    }
    r.lineWidth = a || 1, r.stroke(d), n && r.restore();
  }
  isContentVisible() {
    for (let t = this.markedContentStack.length - 1; t >= 0; t--) if (!this.markedContentStack[t].visible) return !1;
    return !0;
  }
};

KGe = new WeakMap(), GA = new WeakMap(), EB = new WeakMap(), kq = new WeakMap(), Aq = new WeakMap(), Sq = new WeakMap(), Iq = new WeakMap(), Cq = new WeakMap(), Eq = new WeakMap(), Tq = new WeakMap(), i6 = new WeakMap(), Fs = new WeakSet(), Gxt = function () {
  for (; this.stateStack.length || this.inSMaskMode;) this.restore();
  this.current.activeSMask = null, this.ctx.restore(), this.transparentCanvas && (this.ctx = this.compositeCtx, this.ctx.save(), this.ctx.setTransform(1, 0, 0, 1, 0, 0), this.ctx.drawImage(this.transparentCanvas, 0, 0), this.ctx.restore(), this.canvasFactory.destroy(this.transparentCanvasEntry), this.transparentCanvas = null, this.transparentCanvasEntry = null);
}, Vxt = function () {
  if (this.pageColors) {
    const t = this.filterFactory.addHCMFilter(this.pageColors.foreground, this.pageColors.background);
    if (t !== "none") {
      const n = this.ctx.filter;
      this.ctx.filter = t, this.ctx.drawImage(this.ctx.canvas, 0, 0), this.ctx.filter = n;
    }
  }
}, Hxt = function (t, n = null, r = 1) {
  const {
      width: a,
      height: i
    } = t,
    o = n ?? this.canvasFactory.create(a, i),
    s = o.context;
  r = Math.round(r * 255) / 255;
  const l = r < 1;
  l && te(this, Eq) === void 0 && yt(this, Eq, gp.isCanvasFilterSupported ? new Map() : "none");
  let d = "none";
  if (l && te(this, Eq) instanceof Map && (d = te(this, Eq).getOrInsertComputed(r, () => this.filterFactory.addKnockoutFilter(r))), !l || d !== "none") return n && (s.save(), s.setTransform(1, 0, 0, 1, 0, 0), s.clearRect(0, 0, a, i), s.restore()), s.filter = d, s.drawImage(t, 0, 0), s.filter = "none", o;
  const u = t.getContext("2d", {
      willReadFrequently: !0
    }).getImageData(0, 0, a, i),
    h = s.createImageData(a, i),
    p = u.data,
    m = h.data,
    f = r > 0 ? 1 / r : 1e6;
  for (let y = 3, b = p.length; y < b; y += 4) m[y] = Math.min(Math.round(p[y] * f), 255);
  return s.putImageData(h, 0, 0), o;
}, Wxt = function (t, n, r, a) {
  let i = (t == null ? void 0 : t[n]) ?? null;
  if (i && (i.canvas.width !== r || i.canvas.height !== a) && (this.canvasFactory.destroy(i), i = null), !i) return i = this.canvasFactory.create(r, a), t && (t[n] = i), i;
  const o = i.context;
  return o.save(), o.setTransform(1, 0, 0, 1, 0, 0), o.clearRect(0, 0, r, a), o.restore(), i;
}, qxt = function (t, n, r = {}) {
  const {
      backdropCanvas: a = null,
      destTransform: i = [1, 0, 0, 1, 0, 0],
      backdropOffset: o = [0, 0],
      reuseMaskEntry: s = null,
      poolMeta: l = null,
      sourceAlpha: d = 1,
      sourceFilter: u = "none",
      knockoutAlpha: h = 1
    } = r,
    {
      width: p,
      height: m
    } = n,
    f = Gt(this, Fs, Hxt).call(this, n, s, h),
    y = t.globalCompositeOperation;
  if (t.save(), t.setTransform(...i), t.globalAlpha = 1, gp.isCanvasFilterSupported && (t.filter = "none"), t.globalCompositeOperation = "destination-out", t.drawImage(f.canvas, 0, 0), a) {
    const [b, v] = o,
      _ = Gt(this, Fs, Wxt).call(this, l, "knockoutBackdropEntry", p, m),
      w = _.context;
    w.drawImage(a, b, v, p, m, 0, 0, p, m), w.globalCompositeOperation = "destination-in", w.drawImage(f.canvas, 0, 0), w.globalCompositeOperation = "source-over", t.globalCompositeOperation = "destination-over", t.drawImage(_.canvas, 0, 0), l || this.canvasFactory.destroy(_);
  }
  t.globalCompositeOperation = y, t.globalAlpha = d, gp.isCanvasFilterSupported && (t.filter = u ?? "none"), t.drawImage(n, 0, 0), t.restore(), s || this.canvasFactory.destroy(f);
}, F_ = function (t = 1) {
  if (te(this, GA) === 0 || te(this, EB) > 0 || !this.contentVisible) return !1;
  rm(this, EB)._++, yt(this, Cq, t);
  const n = te(this, i6).at(-1),
    {
      canvas: r
    } = this.ctx,
    a = Gt(this, Fs, Wxt).call(this, n, "knockoutTempEntry", r.width, r.height);
  yt(this, kq, a);
  const i = a.context;
  return i.save(), i.setTransform(this.ctx.getTransform()), ZG(this.ctx, i), yt(this, Iq, i.globalCompositeOperation), i.globalCompositeOperation = "source-over", Gon(i, this.ctx), yt(this, Tq, n), yt(this, Aq, this.ctx), yt(this, Sq, this.suspendedCtx), this.ctx = i, this.inSMaskMode && (this.suspendedCtx = i), !0;
}, Mw = function (t) {
  var l;
  if (!t) return;
  const n = te(this, kq),
    r = te(this, Aq),
    a = te(this, Sq),
    i = n.context;
  yt(this, kq, null), yt(this, Aq, null), yt(this, Sq, null), this.inSMaskMode && this.suspendedCtx === i && this.ctx !== i && this.endSMaskMode(), this.inSMaskMode && (this.suspendedCtx = a), this.ctx._removeMirroring(), this.ctx.globalCompositeOperation = te(this, Iq), yt(this, Iq, null), ZG(this.ctx, r), this.ctx = r;
  const o = te(this, Tq);
  yt(this, Tq, null);
  const s = te(this, Cq);
  yt(this, Cq, 1);
  try {
    Gt(this, Fs, qxt).call(this, a ?? r, n.canvas, {
      backdropCanvas: ((l = o == null ? void 0 : o.backdropCtx) == null ? void 0 : l.canvas) ?? null,
      backdropOffset: o != null && o.backdropCtx ? [o.offsetX, o.offsetY] : [0, 0],
      reuseMaskEntry: (o == null ? void 0 : o.knockoutMaskEntry) ?? null,
      poolMeta: o,
      knockoutAlpha: s
    });
  } finally {
    i.restore(), rm(this, EB)._--, o || this.canvasFactory.destroy(n);
  }
}, Kxt = function (t, n, r) {
  const a = new Path2D();
  return a.addPath(t, new DOMMatrix(r).invertSelf().multiplySelf(n)), a;
}, zir = function (t) {
  const {
      canvas: n
    } = t,
    {
      width: r,
      height: a
    } = n;
  if (gp.isCanvasFilterSupported) {
    t.save(), t.setTransform(1, 0, 0, 1, 0, 0), t.filter = "grayscale(1)", t.globalAlpha = 1, t.globalCompositeOperation = "copy", t.drawImage(n, 0, 0), t.restore();
    return;
  }
  const i = t.getImageData(0, 0, r, a),
    {
      data: o
    } = i;
  for (let s = 0, l = o.length; s < l; s += 4) {
    const d = o[s] * .2126 + o[s + 1] * .7152 + o[s + 2] * .0722 + .5 | 0;
    o[s] = o[s + 1] = o[s + 2] = d;
  }
  t.putImageData(i, 0, 0);
}, _7e = function (t) {
  t && (t.knockoutMaskEntry && (this.canvasFactory.destroy(t.knockoutMaskEntry), t.knockoutMaskEntry = null), t.knockoutTempEntry && (this.canvasFactory.destroy(t.knockoutTempEntry), t.knockoutTempEntry = null), t.knockoutBackdropEntry && (this.canvasFactory.destroy(t.knockoutBackdropEntry), t.knockoutBackdropEntry = null));
}, qt(jH, KGe, null);

let Yie = jH;

for (const e in G8) Yie.prototype[e] !== void 0 && (Yie.prototype[G8[e]] = Yie.prototype[e]);

var jSe, DSe;

class eJe {
  constructor(t, n, r) {
    qt(this, jSe, null);
    qt(this, DSe, null);
    On(this, "_fullReader", null);
    On(this, "_rangeReaders", new Set());
    On(this, "_source", null);
    this._source = t, yt(this, jSe, n), yt(this, DSe, r);
  }
  get _progressiveDataLength() {
    var t;
    return ((t = this._fullReader) == null ? void 0 : t._loaded) ?? 0;
  }
  getFullReader() {
    return sg(!this._fullReader, "BasePDFStream.getFullReader can only be called once."), this._fullReader = new (te(this, jSe))(this);
  }
  getRangeReader(t, n) {
    if (n <= this._progressiveDataLength) return null;
    const r = new (te(this, DSe))(this, t, n);
    return this._rangeReaders.add(r), r;
  }
  cancelAllRequests(t) {
    var n;
    (n = this._fullReader) == null || n.cancel(t);
    for (const r of new Set(this._rangeReaders)) r.cancel(t);
  }
}

jSe = new WeakMap(), DSe = new WeakMap();

class tJe {
  constructor(t) {
    On(this, "onProgress", null);
    On(this, "_contentLength", 0);
    On(this, "_filename", null);
    On(this, "_headersCapability", Promise.withResolvers());
    On(this, "_isRangeSupported", !1);
    On(this, "_isStreamingSupported", !1);
    On(this, "_loaded", 0);
    On(this, "_stream", null);
    this._stream = t;
  }
  _callOnProgress() {
    var t;
    (t = this.onProgress) == null || t.call(this, {
      loaded: this._loaded,
      total: this._contentLength
    });
  }
  get headersReady() {
    return this._headersCapability.promise;
  }
  get filename() {
    return this._filename;
  }
  get contentLength() {
    return this._contentLength;
  }
  get isRangeSupported() {
    return this._isRangeSupported;
  }
  get isStreamingSupported() {
    return this._isStreamingSupported;
  }
  async read() {
    Pu("Abstract method `read` called");
  }
  cancel(t) {
    Pu("Abstract method `cancel` called");
  }
}

class nJe {
  constructor(t, n, r) {
    On(this, "_stream", null);
    this._stream = t;
  }
  async read() {
    Pu("Abstract method `read` called");
  }
  cancel(t) {
    Pu("Abstract method `cancel` called");
  }
}

function ysi(e) {
  let t = !0,
    n = r("filename\\*", "i").exec(e);
  if (n) {
    n = n[1];
    let u = s(n);
    return u = unescape(u), u = l(u), u = d(u), i(u);
  }
  if (n = o(e), n) {
    const u = d(n);
    return i(u);
  }
  if (n = r("filename", "i").exec(e), n) {
    n = n[1];
    let u = s(n);
    return u = d(u), i(u);
  }
  function r(u, h) {
    return new RegExp("(?:^|;)\\s*" + u + '\\s*=\\s*([^";\\s][^;\\s]*|"(?:[^"\\\\]|\\\\"?)+"?)', h);
  }
  function a(u, h) {
    if (u) {
      if (!/^[\x00-\xFF]+$/.test(h)) return h;
      try {
        const p = new TextDecoder(u, {
            fatal: !0
          }),
          m = XXe(h);
        h = p.decode(m), t = !1;
      } catch {}
    }
    return h;
  }
  function i(u) {
    return t && /[\x80-\xff]/.test(u) && (u = a("utf-8", u), t && (u = a("iso-8859-1", u))), u;
  }
  function o(u) {
    const h = [];
    let p;
    const m = r("filename\\*((?!0\\d)\\d+)(\\*?)", "ig");
    for (; (p = m.exec(u)) !== null;) {
      let [, y, b, v] = p;
      if (y = parseInt(y, 10), y in h) {
        if (y === 0) break;
        continue;
      }
      h[y] = [b, v];
    }
    const f = [];
    for (let y = 0; y < h.length && y in h; ++y) {
      let [b, v] = h[y];
      v = s(v), b && (v = unescape(v), y === 0 && (v = l(v))), f.push(v);
    }
    return f.join("");
  }
  function s(u) {
    if (u.startsWith('"')) {
      const h = u.slice(1).split('\\"');
      for (let p = 0; p < h.length; ++p) {
        const m = h[p].indexOf('"');
        m !== -1 && (h[p] = h[p].slice(0, m), h.length = p + 1), h[p] = h[p].replaceAll(/\\(.)/g, "$1");
      }
      u = h.join('"');
    }
    return u;
  }
  function l(u) {
    const h = u.indexOf("'");
    if (h === -1) return u;
    const p = u.slice(0, h),
      f = u.slice(h + 1).replace(/^[^']*'/, "");
    return a(p, f);
  }
  function d(u) {
    return !u.startsWith("=?") || /[\x00-\x19\x80-\xff]/.test(u) ? u : u.replaceAll(/=\?([\w-]*)\?([QB])\?((?:[^?]|\?(?!=))*)\?=/gi, function (h, p, m, f) {
      if (m === "q" || m === "Q") return f = f.replaceAll("_", " "), f = f.replaceAll(/=([0-9a-f]{2})/gi, function (y, b) {
        return String.fromCharCode(parseInt(b, 16));
      }), a(p, f);
      try {
        f = atob(f);
      } catch {}
      return a(p, f);
    });
  }
  return "";
}

function Uir(e, t) {
  const n = new Headers();
  if (!e || !t || typeof t != "object") return n;
  for (const r in t) {
    const a = t[r];
    a !== void 0 && n.append(r, a);
  }
  return n;
}

function bsi(e) {
  let t = e.length;
  for (; t > 0 && e[t - 1] !== " " && /\s/.test(e[t - 1]);) t--;
  return e.slice(0, t);
}

function rJe(e) {
  var t;
  return ((t = URL.parse(e)) == null ? void 0 : t.origin) ?? null;
}

function $ir({
  responseHeaders: e,
  isHttp: t,
  rangeChunkSize: n,
  disableRange: r
}) {
  const a = {
      contentLength: 0,
      isRangeSupported: !1
    },
    i = parseInt(e.get("Content-Length"), 10);
  return !Number.isInteger(i) || (a.contentLength = i, i <= 2 * n) || r || !t || e.get("Accept-Ranges") !== "bytes" || (e.get("Content-Encoding") || "identity") === "identity" && (a.isRangeSupported = !0), a;
}

function Gir(e) {
  const t = e.get("Content-Disposition");
  if (t) {
    let n = ysi(t);
    if (n.includes("%")) try {
      n = decodeURIComponent(n);
    } catch {}
    if (sBt(n)) return n;
  }
  return null;
}

function aJe(e, t) {
  return new tUe(`Unexpected server response (${e}) while retrieving PDF "${t.href}".`, e, e === 404 || e === 0 && t.protocol === "file:");
}

function Vir(e, t) {
  if (e !== t) throw new Error(`Expected range response-origin "${e}" to match "${t}".`);
}

function Hir(e, t, n, r) {
  return fetch(e, {
    method: "GET",
    headers: t,
    signal: r.signal,
    mode: "cors",
    credentials: n ? "include" : "same-origin",
    redirect: "follow"
  });
}

function Wir(e, t) {
  if (e !== 200 && e !== 206) throw aJe(e, t);
}

function iJe(e) {
  if (e instanceof Uint8Array) return e.buffer;
  if (e instanceof ArrayBuffer) return e;
  throw new Error(`getArrayBuffer - unexpected data: ${e}`);
}

class vsi extends eJe {
  constructor(n) {
    super(n, wsi, xsi);
    On(this, "_responseOrigin", null);
    const {
      httpHeaders: r,
      url: a
    } = n;
    sg(/https?:/.test(a.protocol), "PDFFetchStream only supports http(s):// URLs."), this.headers = Uir(!0, r);
  }
}

class wsi extends tJe {
  constructor(n) {
    super(n);
    On(this, "_abortController", new AbortController());
    On(this, "_reader", null);
    const {
      disableRange: r,
      disableStream: a,
      rangeChunkSize: i,
      url: o,
      withCredentials: s
    } = n._source;
    this._isStreamingSupported = !a;
    const l = new Headers(n.headers);
    Hir(o, l, s, this._abortController).then(d => {
      n._responseOrigin = rJe(d.url), Wir(d.status, o), this._reader = d.body.getReader();
      const u = d.headers,
        {
          contentLength: h,
          isRangeSupported: p
        } = $ir({
          responseHeaders: u,
          isHttp: !0,
          rangeChunkSize: i,
          disableRange: r
        });
      this._contentLength = h, this._isRangeSupported = p, this._filename = Gir(u), !this._isStreamingSupported && this._isRangeSupported && this.cancel(new u$("Streaming is disabled.")), this._headersCapability.resolve();
    }).catch(this._headersCapability.reject);
  }
  async read() {
    await this._headersCapability.promise;
    const {
      value: n,
      done: r
    } = await this._reader.read();
    return r ? {
      value: n,
      done: r
    } : (this._loaded += n.byteLength, this._callOnProgress(), {
      value: iJe(n),
      done: !1
    });
  }
  cancel(n) {
    var r;
    (r = this._reader) == null || r.cancel(n), this._abortController.abort();
  }
}

class xsi extends nJe {
  constructor(n, r, a) {
    super(n, r, a);
    On(this, "_abortController", new AbortController());
    On(this, "_readCapability", Promise.withResolvers());
    On(this, "_reader", null);
    const {
        url: i,
        withCredentials: o
      } = n._source,
      s = new Headers(n.headers);
    s.append("Range", `bytes=${r}-${a - 1}`), Hir(i, s, o, this._abortController).then(l => {
      const d = rJe(l.url);
      Vir(d, n._responseOrigin), Wir(l.status, i), this._reader = l.body.getReader(), this._readCapability.resolve();
    }).catch(this._readCapability.reject);
  }
  async read() {
    await this._readCapability.promise;
    const {
      value: n,
      done: r
    } = await this._reader.read();
    return r ? {
      value: n,
      done: r
    } : {
      value: iJe(n),
      done: !1
    };
  }
  cancel(n) {
    var r;
    (r = this._reader) == null || r.cancel(n), this._abortController.abort();
  }
}

function Qon(e) {
  return e instanceof Uint8Array && e.byteLength === e.buffer.byteLength ? e.buffer : new Uint8Array(e).buffer;
}

function oJe() {
  for (const e of this._requests) e.resolve({
    value: void 0,
    done: !0
  });
  this._requests.length = 0;
}

var QGe, qir;

class _si extends eJe {
  constructor(n) {
    super(n, ksi, Asi);
    qt(this, QGe);
    On(this, "_progressiveDone", !1);
    On(this, "_queuedChunks", []);
    const {
        pdfDataRangeTransport: r
      } = n,
      {
        initialData: a,
        progressiveDone: i
      } = r;
    if ((a == null ? void 0 : a.length) > 0) {
      const s = Qon(a);
      this._queuedChunks.push(s);
    }
    this._progressiveDone = i;
    const o = s => {
      var l;
      switch (s.type) {
        case "range":
        case "progressiveRead":
          Gt(this, QGe, qir).call(this, s.begin, s.chunk);
          break;
        case "progressiveDone":
          (l = this._fullReader) == null || l.progressiveDone(), this._progressiveDone = !0;
          break;
      }
    };
    r.transportReady(o);
  }
  getFullReader() {
    const n = super.getFullReader();
    return this._queuedChunks = null, n;
  }
  getRangeReader(n, r) {
    const a = super.getRangeReader(n, r);
    return a && (a.onDone = () => this._rangeReaders.delete(a), this._source.pdfDataRangeTransport.requestDataRange(n, r)), a;
  }
  cancelAllRequests(n) {
    super.cancelAllRequests(n), this._source.pdfDataRangeTransport.abort();
  }
}

QGe = new WeakSet(), qir = function (n, r) {
  const a = Qon(r);
  if (n === void 0) this._fullReader ? this._fullReader._enqueue(a) : this._queuedChunks.push(a);else {
    const i = this._rangeReaders.keys().find(o => o._begin === n);
    sg(i, "#onReceiveData - no `PDFDataTransportStreamRangeReader` instance found."), i._enqueue(a);
  }
};

var LSe;

class ksi extends tJe {
  constructor(n) {
    super(n);
    qt(this, LSe, oJe.bind(this));
    On(this, "_done", !1);
    On(this, "_queuedChunks", null);
    On(this, "_requests", []);
    const {
        pdfDataRangeTransport: r,
        disableRange: a,
        disableStream: i
      } = n._source,
      {
        length: o,
        contentDispositionFilename: s
      } = r;
    this._queuedChunks = n._queuedChunks || [];
    for (const d of this._queuedChunks) this._loaded += d.byteLength;
    this._done = n._progressiveDone, this._contentLength = o, this._isStreamingSupported = !i, this._isRangeSupported = !a, sBt(s) && (this._filename = s), this._headersCapability.resolve();
    const l = this._loaded;
    Promise.resolve().then(() => {
      l > 0 && this._loaded === l && this._callOnProgress();
    });
  }
  _enqueue(n) {
    this._done || (this._requests.length > 0 ? this._requests.shift().resolve({
      value: n,
      done: !1
    }) : this._queuedChunks.push(n), this._loaded += n.byteLength, this._callOnProgress());
  }
  async read() {
    if (this._queuedChunks.length > 0) return {
      value: this._queuedChunks.shift(),
      done: !1
    };
    if (this._done) return {
      value: void 0,
      done: !0
    };
    const n = Promise.withResolvers();
    return this._requests.push(n), n.promise;
  }
  cancel(n) {
    this._done = !0, te(this, LSe).call(this);
  }
  progressiveDone() {
    this._done || (this._done = !0), this._queuedChunks.length === 0 && te(this, LSe).call(this);
  }
}

LSe = new WeakMap();

var OSe;

class Asi extends nJe {
  constructor(n, r, a) {
    super(n, r, a);
    qt(this, OSe, oJe.bind(this));
    On(this, "onDone", null);
    On(this, "_begin", -1);
    On(this, "_done", !1);
    On(this, "_queuedChunk", null);
    On(this, "_requests", []);
    this._begin = r;
  }
  _enqueue(n) {
    var r;
    this._done || (this._requests.length === 0 ? this._queuedChunk = n : (this._requests.shift().resolve({
      value: n,
      done: !1
    }), te(this, OSe).call(this)), this._done = !0, (r = this.onDone) == null || r.call(this));
  }
  async read() {
    if (this._queuedChunk) {
      const r = this._queuedChunk;
      return this._queuedChunk = null, {
        value: r,
        done: !1
      };
    }
    if (this._done) return {
      value: void 0,
      done: !0
    };
    const n = Promise.withResolvers();
    return this._requests.push(n), n.promise;
  }
  cancel(n) {
    var r;
    this._done = !0, te(this, OSe).call(this), (r = this.onDone) == null || r.call(this);
  }
}

OSe = new WeakMap();

const cot = 200,
  Yon = 206;

function Ssi(e) {
  return typeof e != "string" ? e : XXe(e).buffer;
}

var o6, _ue, Kir, Qir;

class Isi extends eJe {
  constructor(n) {
    super(n, Csi, Esi);
    qt(this, _ue);
    qt(this, o6, new WeakMap());
    On(this, "_responseOrigin", null);
    const {
      httpHeaders: r,
      url: a
    } = n;
    this.url = a, this.isHttp = /https?:/.test(a.protocol), this.headers = Uir(this.isHttp, r);
  }
  _request(n) {
    const r = new XMLHttpRequest(),
      a = {
        validateStatus: null,
        onHeadersReceived: n.onHeadersReceived,
        onDone: n.onDone,
        onError: n.onError,
        onProgress: n.onProgress
      };
    te(this, o6).set(r, a), r.open("GET", this.url), r.withCredentials = this._source.withCredentials;
    for (const [i, o] of this.headers) r.setRequestHeader(i, o);
    return this.isHttp && "begin" in n && "end" in n ? (r.setRequestHeader("Range", `bytes=${n.begin}-${n.end - 1}`), a.validateStatus = i => i === Yon || i === cot) : a.validateStatus = i => i === cot, r.responseType = "arraybuffer", sg(n.onError, "Expected `onError` callback to be provided."), r.onerror = () => n.onError(r.status), r.onreadystatechange = Gt(this, _ue, Qir).bind(this, r), r.onprogress = Gt(this, _ue, Kir).bind(this, r), r.send(null), r;
  }
  _abortRequest(n) {
    te(this, o6).has(n) && (te(this, o6).delete(n), n.abort());
  }
  getRangeReader(n, r) {
    const a = super.getRangeReader(n, r);
    return a && (a.onClosed = () => this._rangeReaders.delete(a)), a;
  }
}

o6 = new WeakMap(), _ue = new WeakSet(), Kir = function (n, r) {
  var i;
  const a = te(this, o6).get(n);
  (i = a == null ? void 0 : a.onProgress) == null || i.call(a, r);
}, Qir = function (n, r) {
  const a = te(this, o6).get(n);
  if (!a || (n.readyState >= 2 && a.onHeadersReceived && (a.onHeadersReceived(), delete a.onHeadersReceived), n.readyState !== 4) || !te(this, o6).has(n)) return;
  if (te(this, o6).delete(n), n.status === 0 && this.isHttp) {
    a.onError(n.status);
    return;
  }
  const i = n.status || cot;
  if (!a.validateStatus(i)) {
    a.onError(n.status);
    return;
  }
  const o = Ssi(n.response);
  if (i === Yon) {
    const s = n.getResponseHeader("Content-Range");
    /bytes \d+-\d+\/\d+/.test(s) ? a.onDone(o) : (Vl('Missing or invalid "Content-Range" header.'), a.onError(0));
  } else o ? a.onDone(o) : a.onError(n.status);
};

var BSe, ZP, Yir, Xir, Jir, Zir;

class Csi extends tJe {
  constructor(n) {
    super(n);
    qt(this, ZP);
    qt(this, BSe, oJe.bind(this));
    On(this, "_cachedChunks", []);
    On(this, "_done", !1);
    On(this, "_requests", []);
    On(this, "_storedError", null);
    this._fullRequestXhr = n._request({
      onHeadersReceived: Gt(this, ZP, Yir).bind(this),
      onDone: Gt(this, ZP, Xir).bind(this),
      onError: Gt(this, ZP, Jir).bind(this),
      onProgress: Gt(this, ZP, Zir).bind(this)
    });
  }
  async read() {
    if (await this._headersCapability.promise, this._storedError) throw this._storedError;
    if (this._cachedChunks.length > 0) return {
      value: this._cachedChunks.shift(),
      done: !1
    };
    if (this._done) return {
      value: void 0,
      done: !0
    };
    const n = Promise.withResolvers();
    return this._requests.push(n), n.promise;
  }
  cancel(n) {
    this._done = !0, this._headersCapability.reject(n), te(this, BSe).call(this), this._stream._abortRequest(this._fullRequestXhr), this._fullRequestXhr = null;
  }
}

BSe = new WeakMap(), ZP = new WeakSet(), Yir = function () {
  const n = this._stream,
    {
      disableRange: r,
      rangeChunkSize: a
    } = n._source,
    i = this._fullRequestXhr;
  n._responseOrigin = rJe(i.responseURL);
  const o = i.getAllResponseHeaders(),
    s = new Headers(o ? bsi(o.trimStart()).split(/[\r\n]+/).map(u => {
      const [h, ...p] = u.split(": ");
      return [h, p.join(": ")];
    }) : []),
    {
      contentLength: l,
      isRangeSupported: d
    } = $ir({
      responseHeaders: s,
      isHttp: n.isHttp,
      rangeChunkSize: a,
      disableRange: r
    });
  this._contentLength = l, this._isRangeSupported = d, this._filename = Gir(s), this._isRangeSupported && n._abortRequest(i), this._headersCapability.resolve();
}, Xir = function (n) {
  this._requests.length > 0 ? this._requests.shift().resolve({
    value: n,
    done: !1
  }) : this._cachedChunks.push(n), this._done = !0, this._cachedChunks.length === 0 && te(this, BSe).call(this);
}, Jir = function (n) {
  this._storedError = aJe(n, this._stream.url), this._headersCapability.reject(this._storedError);
  for (const r of this._requests) r.reject(this._storedError);
  this._requests.length = 0, this._cachedChunks.length = 0;
}, Zir = function (n) {
  var r;
  (r = this.onProgress) == null || r.call(this, {
    loaded: n.loaded,
    total: n.lengthComputable ? n.total : this._contentLength
  });
};

var FSe, gD, eor, tor, Qxt;

class Esi extends nJe {
  constructor(n, r, a) {
    super(n, r, a);
    qt(this, gD);
    qt(this, FSe, oJe.bind(this));
    On(this, "onClosed", null);
    On(this, "_done", !1);
    On(this, "_queuedChunk", null);
    On(this, "_requests", []);
    On(this, "_storedError", null);
    this._requestXhr = n._request({
      begin: r,
      end: a,
      onHeadersReceived: Gt(this, gD, eor).bind(this),
      onDone: Gt(this, gD, tor).bind(this),
      onError: Gt(this, gD, Qxt).bind(this),
      onProgress: null
    });
  }
  async read() {
    if (this._storedError) throw this._storedError;
    if (this._queuedChunk !== null) {
      const r = this._queuedChunk;
      return this._queuedChunk = null, {
        value: r,
        done: !1
      };
    }
    if (this._done) return {
      value: void 0,
      done: !0
    };
    const n = Promise.withResolvers();
    return this._requests.push(n), n.promise;
  }
  cancel(n) {
    var r;
    this._done = !0, te(this, FSe).call(this), this._stream._abortRequest(this._requestXhr), (r = this.onClosed) == null || r.call(this);
  }
}

FSe = new WeakMap(), gD = new WeakSet(), eor = function () {
  var r;
  const n = rJe((r = this._requestXhr) == null ? void 0 : r.responseURL);
  try {
    Vir(n, this._stream._responseOrigin);
  } catch (a) {
    this._storedError = a, Gt(this, gD, Qxt).call(this, 0);
  }
}, tor = function (n) {
  var r;
  this._requests.length > 0 ? this._requests.shift().resolve({
    value: n,
    done: !1
  }) : this._queuedChunk = n, this._done = !0, te(this, FSe).call(this), (r = this.onClosed) == null || r.call(this);
}, Qxt = function (n) {
  this._storedError ?? (this._storedError = aJe(n, this._stream.url));
  for (const r of this._requests) r.reject(this._storedError);
  this._requests.length = 0, this._queuedChunk = null;
};

function nor(e, t = null) {
  const n = process.getBuiltinModule("fs"),
    {
      Readable: r
    } = process.getBuiltinModule("stream"),
    a = n.createReadStream(e, t);
  return r.toWeb(a);
}

class Tsi extends eJe {
  constructor(t) {
    super(t, Msi, Psi);
    const {
      url: n
    } = t;
    sg(n.protocol === "file:", "PDFNodeStream only supports file:// URLs.");
  }
}

class Msi extends tJe {
  constructor(n) {
    super(n);
    On(this, "_reader", null);
    const {
      disableRange: r,
      disableStream: a,
      rangeChunkSize: i,
      url: o
    } = n._source;
    this._isStreamingSupported = !a, process.getBuiltinModule("fs/promises").lstat(o).then(l => {
      const d = nor(o);
      this._reader = d.getReader();
      const {
        size: u
      } = l;
      this._contentLength = u, this._isRangeSupported = !r && u > 2 * i, !this._isStreamingSupported && this._isRangeSupported && this.cancel(new u$("Streaming is disabled.")), this._headersCapability.resolve();
    }).catch(l => {
      l.code === "ENOENT" && (l = aJe(0, o)), this._headersCapability.reject(l);
    });
  }
  async read() {
    await this._headersCapability.promise;
    const {
      value: n,
      done: r
    } = await this._reader.read();
    return r ? {
      value: n,
      done: r
    } : (this._loaded += n.byteLength, this._callOnProgress(), {
      value: iJe(n),
      done: !1
    });
  }
  cancel(n) {
    var r;
    (r = this._reader) == null || r.cancel(n);
  }
}

class Psi extends nJe {
  constructor(n, r, a) {
    super(n, r, a);
    On(this, "_readCapability", Promise.withResolvers());
    On(this, "_reader", null);
    const {
      url: i
    } = n._source;
    try {
      const o = nor(i, {
        start: r,
        end: a - 1
      });
      this._reader = o.getReader(), this._readCapability.resolve();
    } catch (o) {
      this._readCapability.reject(o);
    }
  }
  async read() {
    await this._readCapability.promise;
    const {
      value: n,
      done: r
    } = await this._reader.read();
    return r ? {
      value: n,
      done: r
    } : {
      value: iJe(n),
      done: !1
    };
  }
  cancel(n) {
    var r;
    (r = this._reader) == null || r.cancel(n);
  }
}

function Rsi(e) {
  return y1e(e) ? vsi : cS ? Tsi : Isi;
}

var C9e, zSe, USe;

let WO = (C9e = class {
  static get workerPort() {
    return te(this, zSe);
  }
  static set workerPort(t) {
    if (!(typeof Worker < "u" && t instanceof Worker) && t !== null) throw new Error("Invalid `workerPort` type.");
    yt(this, zSe, t);
  }
  static get workerSrc() {
    return te(this, USe);
  }
  static set workerSrc(t) {
    if (typeof t != "string") throw new Error("Invalid `workerSrc` type.");
    yt(this, USe, t);
  }
}, zSe = new WeakMap(), USe = new WeakMap(), qt(C9e, zSe, null), qt(C9e, USe, ""), C9e);

var ase, $Se;

class Nsi {
  constructor({
    parsedData: t,
    rawData: n
  }) {
    qt(this, ase);
    qt(this, $Se);
    yt(this, ase, t), yt(this, $Se, n);
  }
  getRaw() {
    return te(this, $Se);
  }
  get(t) {
    return te(this, ase).get(t) ?? null;
  }
  [Symbol.iterator]() {
    return te(this, ase).entries();
  }
}

ase = new WeakMap(), $Se = new WeakMap();

const YV = Symbol("INTERNAL");

var GSe, VSe, ise, Mq;

class jsi {
  constructor(t, {
    name: n,
    intent: r,
    usage: a,
    rbGroups: i
  }) {
    qt(this, GSe, !1);
    qt(this, VSe, !1);
    qt(this, ise, !1);
    qt(this, Mq, !0);
    yt(this, GSe, !!(t & aS.DISPLAY)), yt(this, VSe, !!(t & aS.PRINT)), this.name = n, this.intent = r, this.usage = a, this.rbGroups = i;
  }
  get visible() {
    if (te(this, ise)) return te(this, Mq);
    if (!te(this, Mq)) return !1;
    const {
      print: t,
      view: n
    } = this.usage;
    return te(this, GSe) ? (n == null ? void 0 : n.viewState) !== "OFF" : te(this, VSe) ? (t == null ? void 0 : t.printState) !== "OFF" : !0;
  }
  _setVisible(t, n, r = !1) {
    t !== YV && Pu("Internal method `_setVisible` called."), yt(this, ise, r), yt(this, Mq, n);
  }
  get serializable() {
    return {
      userSet: te(this, ise),
      visible: te(this, Mq)
    };
  }
}

GSe = new WeakMap(), VSe = new WeakMap(), ise = new WeakMap(), Mq = new WeakMap();

var TB, Qu, ose, sse, HSe, WSe, Xxt;

const gVt = class gVt {
  constructor(t, n = aS.DISPLAY, r = null) {
    qt(this, WSe);
    qt(this, TB, null);
    qt(this, Qu, new Map());
    qt(this, ose, null);
    qt(this, sse, null);
    qt(this, HSe);
    On(this, "creator", null);
    On(this, "name", null);
    if (yt(this, HSe, t), this.renderingIntent = n, t !== null) {
      this.name = t.name, this.creator = t.creator, yt(this, sse, t.order);
      for (const a of t.groups) te(this, Qu).set(a.id, new jsi(n, a));
      if (r) {
        r.size !== te(this, Qu).size && Pu("Incorrect serialized groupState.");
        for (const [a, i] of r) te(this, Qu).get(a)._setVisible(YV, i.visible, i.userSet);
      } else {
        if (t.baseState === "OFF") for (const a of te(this, Qu).values()) a._setVisible(YV, !1);
        for (const a of t.on) te(this, Qu).get(a)._setVisible(YV, !0);
        for (const a of t.off) te(this, Qu).get(a)._setVisible(YV, !1);
      }
      yt(this, ose, this.getHash());
    }
  }
  isVisible(t) {
    if (te(this, Qu).size === 0) return !0;
    if (!t) return YXe("Optional content group not defined."), !0;
    if (t.type === "OCG") return te(this, Qu).has(t.id) ? te(this, Qu).get(t.id).visible : (Vl(`Optional content group not found: ${t.id}`), !0);
    if (t.type === "OCMD") {
      if (t.expression) return Gt(this, WSe, Xxt).call(this, t.expression);
      if (!t.policy || t.policy === "AnyOn") {
        for (const n of t.ids) {
          if (!te(this, Qu).has(n)) return Vl(`Optional content group not found: ${n}`), !0;
          if (te(this, Qu).get(n).visible) return !0;
        }
        return !1;
      } else if (t.policy === "AllOn") {
        for (const n of t.ids) {
          if (!te(this, Qu).has(n)) return Vl(`Optional content group not found: ${n}`), !0;
          if (!te(this, Qu).get(n).visible) return !1;
        }
        return !0;
      } else if (t.policy === "AnyOff") {
        for (const n of t.ids) {
          if (!te(this, Qu).has(n)) return Vl(`Optional content group not found: ${n}`), !0;
          if (!te(this, Qu).get(n).visible) return !0;
        }
        return !1;
      } else if (t.policy === "AllOff") {
        for (const n of t.ids) {
          if (!te(this, Qu).has(n)) return Vl(`Optional content group not found: ${n}`), !0;
          if (te(this, Qu).get(n).visible) return !1;
        }
        return !0;
      }
      return Vl(`Unknown optional content policy ${t.policy}.`), !0;
    }
    return Vl(`Unknown group type ${t.type}.`), !0;
  }
  setVisibility(t, n = !0, r = !0) {
    var i;
    const a = te(this, Qu).get(t);
    if (!a) {
      Vl(`Optional content group not found: ${t}`);
      return;
    }
    if (r && n && a.rbGroups.length) for (const o of a.rbGroups) for (const s of o) s !== t && ((i = te(this, Qu).get(s)) == null || i._setVisible(YV, !1, !0));
    a._setVisible(YV, !!n, !0), yt(this, TB, null);
  }
  setOCGState({
    state: t,
    preserveRB: n
  }) {
    let r;
    for (const a of t) {
      switch (a) {
        case "ON":
        case "OFF":
        case "Toggle":
          r = a;
          continue;
      }
      const i = te(this, Qu).get(a);
      if (i) switch (r) {
        case "ON":
          this.setVisibility(a, !0, n);
          break;
        case "OFF":
          this.setVisibility(a, !1, n);
          break;
        case "Toggle":
          this.setVisibility(a, !i.visible, n);
          break;
      }
    }
    yt(this, TB, null);
  }
  get hasInitialVisibility() {
    return te(this, ose) === null || this.getHash() === te(this, ose);
  }
  getOrder() {
    return te(this, Qu).size ? te(this, sse) ? te(this, sse).slice() : [...te(this, Qu).keys()] : null;
  }
  getGroup(t) {
    return te(this, Qu).get(t) || null;
  }
  getHash() {
    if (te(this, TB) !== null) return te(this, TB);
    const t = new jxt();
    for (const [n, r] of te(this, Qu)) t.update(`${n}:${r.visible}`);
    return yt(this, TB, t.hexdigest());
  }
  [Symbol.iterator]() {
    return te(this, Qu).entries();
  }
  get serializable() {
    const t = new Map();
    for (const [n, r] of te(this, Qu)) t.set(n, r.serializable);
    return {
      data: te(this, HSe),
      renderingIntent: this.renderingIntent,
      groupState: t
    };
  }
  static fromSerializable({
    data: t,
    renderingIntent: n,
    groupState: r
  }) {
    return new gVt(t, n, r);
  }
};

TB = new WeakMap(), Qu = new WeakMap(), ose = new WeakMap(), sse = new WeakMap(), HSe = new WeakMap(), WSe = new WeakSet(), Xxt = function (t) {
  const n = t.length;
  if (n < 2) return !0;
  const r = t[0];
  for (let a = 1; a < n; a++) {
    const i = t[a];
    let o;
    if (Array.isArray(i)) o = Gt(this, WSe, Xxt).call(this, i);else if (te(this, Qu).has(i)) o = te(this, Qu).get(i).visible;else return Vl(`Optional content group not found: ${i}`), !0;
    switch (r) {
      case "And":
        if (!o) return !1;
        break;
      case "Or":
        if (o) return !0;
        break;
      case "Not":
        return !o;
      default:
        return !0;
    }
  }
  return r === "And";
};

let Yxt = gVt;

var Qf, R4, ib, Pq, s6, q1, cye, k7e, Jxt, Zxt;

class Dsi {
  constructor() {
    qt(this, q1);
    qt(this, Qf, null);
    qt(this, R4, null);
    qt(this, ib, 0);
    qt(this, Pq, null);
    qt(this, s6, null);
  }
  get pagesNumber() {
    return te(this, ib);
  }
  set pagesNumber(t) {
    te(this, ib) !== t && (yt(this, ib, t), yt(this, Qf, null), yt(this, R4, null));
  }
  movePages(t, n, r) {
    Gt(this, q1, cye).call(this);
    const a = te(this, Qf),
      i = n.length,
      o = new Uint32Array(i);
    let s = 0;
    for (let p = 0; p < i; p++) {
      const m = n[p] - 1;
      o[p] = a[m], m < r && s++;
    }
    const l = te(this, ib),
      d = l - i,
      u = new Int32Array(l),
      h = Pm(r - s, 0, d);
    for (let p = 0, m = 0; p < l; p++) t.has(p + 1) || (a[m] = a[p], u[m++] = p + 1);
    a.copyWithin(h + i, h, d), a.set(o, h), u.copyWithin(h + i, h, d), u.set(n, h), yt(this, R4, u), a.every((p, m) => p === m + 1) && yt(this, Qf, null);
  }
  deletePages(t) {
    Gt(this, q1, cye).call(this);
    const n = te(this, Qf),
      r = Gt(this, q1, k7e).call(this);
    yt(this, s6, {
      pageNumberToId: n.slice(),
      pagesNumber: te(this, ib),
      prevPageNumbers: te(this, R4).slice()
    });
    const a = te(this, ib) - t.length;
    yt(this, ib, a);
    const i = yt(this, Qf, new Uint32Array(a));
    yt(this, R4, new Int32Array(a));
    let o = 0,
      s = 0;
    for (const l of t) {
      const d = l - 1;
      d !== o && (i.set(n.subarray(o, d), s), s += d - o), o = d + 1;
    }
    o < n.length && i.set(n.subarray(o), s), Gt(this, q1, Jxt).call(this, r, new Set(t));
  }
  cancelDelete() {
    te(this, s6) && (yt(this, Qf, te(this, s6).pageNumberToId), yt(this, ib, te(this, s6).pagesNumber), yt(this, R4, te(this, s6).prevPageNumbers), yt(this, s6, null));
  }
  cleanSavedData() {
    yt(this, s6, null);
  }
  copyPages(t) {
    Gt(this, q1, cye).call(this), yt(this, Pq, {
      pageNumbers: t,
      pageIds: t.map(n => te(this, Qf)[n - 1])
    });
  }
  cancelCopy() {
    yt(this, Pq, null);
  }
  pastePages(t) {
    Gt(this, q1, cye).call(this);
    const n = te(this, Qf),
      r = Gt(this, q1, k7e).call(this),
      {
        pageNumbers: a,
        pageIds: i
      } = te(this, Pq),
      o = te(this, ib) + a.length;
    yt(this, ib, o);
    const s = yt(this, Qf, new Uint32Array(o));
    yt(this, R4, new Int32Array(o)), s.set(n.subarray(0, t), 0), s.set(i, t), s.set(n.subarray(t), t + a.length), Gt(this, q1, Jxt).call(this, r, null, t, a), yt(this, Pq, null);
  }
  hasBeenAltered() {
    return te(this, Qf) !== null;
  }
  getPageMappingForSaving(t = null, n = Gt(this, q1, Zxt).call(this)) {
    t ?? (t = Gt(this, q1, k7e).call(this));
    let r = 0;
    for (const i of t.values()) r = Math.max(r, i.length);
    const a = new Array(r);
    for (let i = 0; i < r; i++) a[i] = {
      document: null,
      pageIndices: [],
      includePages: []
    };
    for (const [i, o] of t) for (let s = 0, l = o.length; s < l; s++) a[s].includePages.push([i - 1, o[s] - 1]);
    for (const {
      includePages: i,
      pageIndices: o
    } of a) {
      i.sort((s, l) => s[0] - l[0]);
      for (let s = 0, l = i.length; s < l; s++) o.push(i[s][1]), i[s] = i[s][0];
    }
    return {
      pageInfos: a,
      copyLevels: n
    };
  }
  extractPages(t) {
    t = Array.from(t).sort((r, a) => r - a);
    const n = new Map();
    for (let r = 0, a = t.length; r < a; r++) {
      const i = this.getPageId(t[r]);
      n.getOrInsertComputed(i, kpe).push(r + 1);
    }
    return this.getPageMappingForSaving(n, Gt(this, q1, Zxt).call(this, t));
  }
  getPrevPageNumber(t) {
    var n;
    return ((n = te(this, R4)) == null ? void 0 : n[t - 1]) ?? 0;
  }
  getPageNumber(t) {
    if (!te(this, Qf)) return t;
    const n = te(this, Qf);
    for (let r = 0, a = te(this, ib); r < a; r++) if (n[r] === t) return r + 1;
    return 0;
  }
  getPageId(t) {
    var n;
    return ((n = te(this, Qf)) == null ? void 0 : n[t - 1]) ?? t;
  }
  getMapping() {
    var t;
    return (t = te(this, Qf)) == null ? void 0 : t.subarray(0, this.pagesNumber);
  }
}

Qf = new WeakMap(), R4 = new WeakMap(), ib = new WeakMap(), Pq = new WeakMap(), s6 = new WeakMap(), q1 = new WeakSet(), cye = function () {
  if (te(this, Qf)) return;
  const t = te(this, ib),
    n = yt(this, Qf, new Uint32Array(t));
  for (let r = 0; r < t; r++) n[r] = r + 1;
  yt(this, R4, new Int32Array(n));
}, k7e = function () {
  const t = new Map(),
    n = te(this, Qf);
  for (let r = 0, a = te(this, ib); r < a; r++) {
    const i = n[r],
      o = t.get(i);
    o ? o.push(r + 1) : t.set(i, [r + 1]);
  }
  return t;
}, Jxt = function (t, n = null, r = -1, a = null) {
  const i = te(this, R4),
    o = te(this, Qf),
    s = r + ((a == null ? void 0 : a.length) ?? 0),
    l = new Map();
  for (let d = 0, u = te(this, ib); d < u; d++) {
    if (d >= r && d < s) {
      i[d] = -a[d - r];
      continue;
    }
    const h = o[d],
      p = t.get(h);
    let m = l.get(h) || 0;
    if (n && p) for (; m < p.length && n.has(p[m]);) m++;
    i[d] = p == null ? void 0 : p[m], l.set(h, m + 1);
  }
}, Zxt = function (t = null) {
  if (!te(this, Qf)) return null;
  const n = new Int32Array(te(this, ib)).fill(-1),
    r = new Map();
  if (t) for (const a of t) {
    const i = this.getPageId(a),
      o = r.get(i) ?? 0;
    r.set(i, o + 1), n[a - 1] = o;
  } else for (let a = 0, i = te(this, ib); a < i; a++) {
    const o = te(this, Qf)[a],
      s = r.get(o) ?? 0;
    r.set(o, s + 1), n[a] = s;
  }
  return n;
};

const Nne = Symbol("INITIAL_DATA"),
  Xon = () => ({
    ...Promise.withResolvers(),
    data: Nne
  });

var N4;

class ror {
  constructor() {
    qt(this, N4, new Map());
  }
  get(t, n = null) {
    if (n) {
      const a = te(this, N4).getOrInsertComputed(t, Xon);
      return a.promise.then(() => n(a.data)), null;
    }
    const r = te(this, N4).get(t);
    if (!r || r.data === Nne) throw new Error(`Requesting object that isn't resolved yet ${t}.`);
    return r.data;
  }
  has(t) {
    const n = te(this, N4).get(t);
    return !!n && n.data !== Nne;
  }
  delete(t) {
    const n = te(this, N4).get(t);
    return !n || n.data === Nne ? !1 : (te(this, N4).delete(t), !0);
  }
  resolve(t, n = null) {
    const r = te(this, N4).getOrInsertComputed(t, Xon);
    if (r.data !== Nne) throw new Error(`Object already resolved ${t}.`);
    r.data = n, r.resolve();
  }
  clear() {
    var t;
    for (const {
      data: n
    } of te(this, N4).values()) (t = n == null ? void 0 : n.bitmap) == null || t.close();
    te(this, N4).clear();
  }
  *[Symbol.iterator]() {
    for (const [t, {
      data: n
    }] of te(this, N4)) n !== Nne && (yield [t, n]);
  }
}

N4 = new WeakMap();

const Lsi = 1e5,
  Jon = 30;

var kSn, MB, s2, qSe, KSe, lse, Rq, iN, QSe, YSe, Nq, XSe, cse, PB, dse, JSe, use, jq, ZSe, e3e, uy, hse, Dq, t3e, pse, mse, yD, aor, ior, t2t, n3, A7e, n2t, oor, sor;

let e2t = (uy = class {
  constructor({
    textContentSource: t,
    images: n,
    container: r,
    viewport: a
  }) {
    qt(this, yD);
    qt(this, MB, Promise.withResolvers());
    qt(this, s2, null);
    qt(this, qSe, !1);
    qt(this, KSe, !!((kSn = globalThis.FontInspector) != null && kSn.enabled));
    qt(this, lse, null);
    qt(this, Rq, null);
    qt(this, iN, null);
    qt(this, QSe, 0);
    qt(this, YSe, 0);
    qt(this, Nq, null);
    qt(this, XSe, null);
    qt(this, cse, 0);
    qt(this, PB, 0);
    qt(this, dse, Object.create(null));
    qt(this, JSe, []);
    qt(this, use, null);
    qt(this, jq, []);
    qt(this, ZSe, new WeakMap());
    qt(this, e3e, null);
    var d;
    if (t instanceof ReadableStream) yt(this, use, t);else if (typeof t == "object") yt(this, use, new ReadableStream({
      start(u) {
        u.enqueue(t), u.close();
      }
    }));else throw new Error('No "textContentSource" parameter specified.');
    yt(this, s2, yt(this, XSe, r)), yt(this, lse, n), yt(this, PB, a.scale * h$.pixelRatio), yt(this, cse, a.rotation), yt(this, iN, {
      div: null,
      properties: null,
      ctx: null
    });
    const {
      pageWidth: i,
      pageHeight: o,
      pageX: s,
      pageY: l
    } = a.rawDims;
    yt(this, e3e, [1, 0, 0, -1, -s, l + o]), yt(this, YSe, i), yt(this, QSe, o), Gt(d = uy, n3, oor).call(d), r.style.setProperty("--min-font-size", te(uy, pse)), IJ(r, a), te(this, MB).promise.finally(() => {
      te(uy, mse).delete(this), yt(this, iN, null), yt(this, dse, null);
    }).catch(() => {});
  }
  static get fontFamilyMap() {
    const {
      isWindows: t,
      isFirefox: n
    } = gp.platform;
    return Ws(this, "fontFamilyMap", new Map([["sans-serif", `${t && n ? "Calibri, " : ""}sans-serif`], ["monospace", `${t && n ? "Lucida Console, " : ""}monospace`]]));
  }
  render() {
    te(this, lse) && te(this, s2).append(te(this, lse).render());
    const t = () => {
      te(this, Nq).read().then(({
        value: n,
        done: r
      }) => {
        if (r) {
          te(this, MB).resolve();
          return;
        }
        te(this, Rq) ?? yt(this, Rq, n.lang), Object.assign(te(this, dse), n.styles), Gt(this, yD, aor).call(this, n.items), t();
      }, te(this, MB).reject);
    };
    return yt(this, Nq, te(this, use).getReader()), te(uy, mse).add(this), t(), te(this, MB).promise;
  }
  update({
    viewport: t,
    onBefore: n = null
  }) {
    var i;
    const r = t.scale * h$.pixelRatio,
      a = t.rotation;
    if (a !== te(this, cse) && (n == null || n(), yt(this, cse, a), IJ(te(this, XSe), {
      rotation: a
    })), r !== te(this, PB)) {
      n == null || n(), yt(this, PB, r);
      const o = {
        div: null,
        properties: null,
        ctx: Gt(i = uy, n3, A7e).call(i, te(this, Rq))
      };
      for (const s of te(this, jq)) o.properties = te(this, ZSe).get(s), o.div = s, Gt(this, yD, t2t).call(this, o);
    }
  }
  cancel() {
    var n;
    const t = new u$("TextLayer task cancelled.");
    (n = te(this, Nq)) == null || n.cancel(t).catch(() => {}), yt(this, Nq, null), te(this, MB).reject(t);
  }
  get textDivs() {
    return te(this, jq);
  }
  get textContentItemsStr() {
    return te(this, JSe);
  }
  static cleanup() {
    if (!(te(this, mse).size > 0)) {
      te(this, hse).clear();
      for (const {
        canvas: t
      } of te(this, Dq).values()) t.remove();
      te(this, Dq).clear();
    }
  }
}, MB = new WeakMap(), s2 = new WeakMap(), qSe = new WeakMap(), KSe = new WeakMap(), lse = new WeakMap(), Rq = new WeakMap(), iN = new WeakMap(), QSe = new WeakMap(), YSe = new WeakMap(), Nq = new WeakMap(), XSe = new WeakMap(), cse = new WeakMap(), PB = new WeakMap(), dse = new WeakMap(), JSe = new WeakMap(), use = new WeakMap(), jq = new WeakMap(), ZSe = new WeakMap(), e3e = new WeakMap(), hse = new WeakMap(), Dq = new WeakMap(), t3e = new WeakMap(), pse = new WeakMap(), mse = new WeakMap(), yD = new WeakSet(), aor = function (t) {
  var a, i;
  if (te(this, qSe)) return;
  (i = te(this, iN)).ctx ?? (i.ctx = Gt(a = uy, n3, A7e).call(a, te(this, Rq)));
  const n = te(this, jq),
    r = te(this, JSe);
  for (const o of t) {
    if (n.length > Lsi) {
      Vl("Ignoring additional textDivs for performance reasons."), yt(this, qSe, !0);
      return;
    }
    if (o.str === void 0) {
      if (o.type === "beginMarkedContentProps" || o.type === "beginMarkedContent") {
        const s = te(this, s2);
        yt(this, s2, document.createElement("span")), te(this, s2).classList.add("markedContent"), o.id && te(this, s2).setAttribute("id", o.id), o.tag === "Artifact" && (te(this, s2).ariaHidden = !0), s.append(te(this, s2));
      } else o.type === "endMarkedContent" && yt(this, s2, te(this, s2).parentNode);
      continue;
    }
    r.push(o.str), Gt(this, yD, ior).call(this, o);
  }
}, ior = function (t) {
  var f;
  const n = document.createElement("span"),
    r = {
      angle: 0,
      canvasWidth: 0,
      hasText: t.str !== "",
      hasEOL: t.hasEOL,
      fontSize: 0
    };
  te(this, jq).push(n);
  const a = fo.transform(te(this, e3e), t.transform);
  let i = Math.atan2(a[1], a[0]);
  const o = te(this, dse)[t.fontName];
  o.vertical && (i += Math.PI / 2);
  let s = te(this, KSe) && o.fontSubstitution || o.fontFamily;
  s = uy.fontFamilyMap.get(s) || s;
  const l = Math.hypot(a[2], a[3]),
    d = l * Gt(f = uy, n3, sor).call(f, s, o, te(this, Rq));
  let u, h;
  i === 0 ? (u = a[4], h = a[5] - d) : (u = a[4] + d * Math.sin(i), h = a[5] - d * Math.cos(i));
  const p = n.style;
  p.left = `${(100 * u / te(this, YSe)).toFixed(2)}%`, p.top = `${(100 * h / te(this, QSe)).toFixed(2)}%`, p.setProperty("--font-height", `${l.toFixed(2)}px`), p.fontFamily = s, r.fontSize = l, n.setAttribute("role", "presentation"), n.textContent = t.str, n.dir = t.dir, te(this, KSe) && (n.dataset.fontName = o.fontSubstitutionLoadedName || t.fontName), i !== 0 && (r.angle = i * (180 / Math.PI));
  let m = !1;
  if (t.str.length > 1) m = !0;else if (t.str !== " " && t.transform[0] !== t.transform[3]) {
    const y = Math.abs(t.transform[0]),
      b = Math.abs(t.transform[3]);
    y !== b && Math.max(y, b) / Math.min(y, b) > 1.5 && (m = !0);
  }
  if (m && (r.canvasWidth = o.vertical ? t.height : t.width), te(this, ZSe).set(n, r), te(this, iN).div = n, te(this, iN).properties = r, Gt(this, yD, t2t).call(this, te(this, iN)), r.hasText && te(this, s2).append(n), r.hasEOL) {
    const y = document.createElement("br");
    y.setAttribute("role", "presentation"), te(this, s2).append(y);
  }
}, t2t = function (t) {
  var o;
  const {
      div: n,
      properties: r,
      ctx: a
    } = t,
    {
      style: i
    } = n;
  if (r.canvasWidth !== 0 && r.hasText) {
    const {
        fontFamily: s
      } = i,
      {
        canvasWidth: l,
        fontSize: d
      } = r;
    Gt(o = uy, n3, n2t).call(o, a, d * te(this, PB), s);
    const {
      width: u
    } = a.measureText(n.textContent);
    u > 0 && i.setProperty("--scale-x", l * te(this, PB) / u);
  }
  r.angle !== 0 && i.setProperty("--rotate", `${r.angle}deg`);
}, n3 = new WeakSet(), A7e = function (t = null) {
  let n = te(this, Dq).get(t || (t = ""));
  if (!n) {
    const r = document.createElement("canvas");
    r.style.cssText = "position:absolute;top:0;left:0;width:0;height:0;display:none;letter-spacing:normal;word-spacing:normal", r.lang = t, document.body.append(r), n = r.getContext("2d", {
      alpha: !1,
      willReadFrequently: !0
    }), te(this, Dq).set(t, n), te(this, t3e).set(n, {
      size: 0,
      family: ""
    });
  }
  return n;
}, n2t = function (t, n, r) {
  const a = te(this, t3e).get(t);
  n === a.size && r === a.family || (t.font = `${n}px ${r}`, a.size = n, a.family = r);
}, oor = function () {
  if (te(this, pse) !== null) return;
  const t = document.createElement("div");
  t.style.opacity = 0, t.style.lineHeight = 1, t.style.fontSize = "1px", t.style.position = "absolute", t.textContent = "X", document.body.append(t), yt(this, pse, t.getBoundingClientRect().height), t.remove();
}, sor = function (t, n, r) {
  const a = te(this, hse).get(t);
  if (a) return a;
  const i = Gt(this, n3, A7e).call(this, r);
  i.canvas.width = i.canvas.height = Jon, Gt(this, n3, n2t).call(this, i, Jon, t);
  const o = i.measureText(""),
    s = o.fontBoundingBoxAscent,
    l = Math.abs(o.fontBoundingBoxDescent);
  i.canvas.width = i.canvas.height = 0;
  let d = .8;
  return s ? d = s / (s + l) : (gp.platform.isFirefox && Vl("Enable the `dom.textMetrics.fontBoundingBox.enabled` preference in `about:config` to improve TextLayer rendering."), n.ascent ? d = n.ascent : n.descent && (d = 1 + n.descent)), te(this, hse).set(t, d), d;
}, qt(uy, n3), qt(uy, hse, new Map()), qt(uy, Dq, new Map()), qt(uy, t3e, new WeakMap()), qt(uy, pse, null), qt(uy, mse, new Set()), uy);

const Osi = 100;

function lor(e = {}) {
  const t = new r2t(),
    {
      docId: n
    } = t,
    r = e.url ? $oi(e.url) : null,
    a = e.data ? Goi(e.data) : null,
    i = e.httpHeaders || null,
    o = e.withCredentials === !0,
    s = e.password ?? null,
    l = e.range instanceof cor ? e.range : null,
    d = Number.isInteger(e.rangeChunkSize) && e.rangeChunkSize > 0 ? e.rangeChunkSize : 2 ** 16;
  let u = e.worker instanceof i2t ? e.worker : null;
  const h = e.verbosity,
    p = typeof e.docBaseUrl == "string" && !JXe(e.docBaseUrl) ? e.docBaseUrl : null,
    m = eMe(e.cMapUrl),
    f = e.cMapPacked !== !1,
    y = eMe(e.iccUrl),
    b = eMe(e.standardFontDataUrl),
    v = eMe(e.wasmUrl),
    _ = e.stopAtErrors !== !0,
    w = Number.isInteger(e.maxImageSize) && e.maxImageSize > -1 ? e.maxImageSize : -1,
    k = typeof e.isOffscreenCanvasSupported == "boolean" ? e.isOffscreenCanvasSupported : !cS,
    A = typeof e.isImageDecoderSupported == "boolean" ? e.isImageDecoderSupported : !cS,
    S = Number.isInteger(e.canvasMaxAreaInBytes) ? e.canvasMaxAreaInBytes : -1,
    C = typeof e.disableFontFace == "boolean" ? e.disableFontFace : cS,
    I = e.fontExtraProperties === !0,
    E = e.enableXfa === !0,
    M = e.ownerDocument || globalThis.document,
    T = e.disableRange === !0,
    P = e.disableStream === !0,
    R = e.disableAutoFetch === !0,
    j = e.pdfBug === !0,
    B = e.CanvasFactory || (cS ? Xoi : qoi),
    F = e.FilterFactory || (cS ? Yoi : Koi),
    N = e.BinaryDataFactory || (cS ? Joi : zon),
    G = e.enableHWA === !0,
    V = e.enableWebGPU === !0 ? nsi() : Promise.resolve(!1),
    O = e.useWasm !== !1,
    L = e.pagesMapper || new Dsi(),
    D = typeof e.useSystemFonts == "boolean" ? e.useSystemFonts : !cS && !C,
    U = typeof e.useWorkerFetch == "boolean" ? e.useWorkerFetch : !!(N === zon && m && f && b && v && y1e(m, document.baseURI) && y1e(b, document.baseURI) && y1e(v, document.baseURI)),
    H = null;
  soi(h);
  const Y = {
    canvasFactory: new B({
      ownerDocument: M,
      enableHWA: G
    }),
    filterFactory: new F({
      docId: n,
      ownerDocument: M
    }),
    binaryDataFactory: U ? null : new N({
      cMapUrl: m,
      standardFontDataUrl: b,
      wasmUrl: v
    })
  };
  u || (u = i2t.create({
    verbosity: h,
    port: WO.workerPort
  }), t._worker = u);
  const K = {
      docId: n,
      apiVersion: "6.3.289",
      data: a,
      password: s,
      disableAutoFetch: R,
      rangeChunkSize: d,
      docBaseUrl: p,
      enableXfa: E,
      evaluatorOptions: {
        maxImageSize: w,
        disableFontFace: C,
        ignoreErrors: _,
        isOffscreenCanvasSupported: k,
        isImageDecoderSupported: A,
        canvasMaxAreaInBytes: S,
        fontExtraProperties: I,
        useSystemFonts: D,
        useWasm: O,
        useWorkerFetch: U,
        cMapUrl: m,
        cMapPacked: f,
        iccUrl: y,
        standardFontDataUrl: b,
        wasmUrl: v,
        hasGPU: !1
      }
    },
    W = {
      ownerDocument: M,
      pdfBug: j,
      styleElement: H,
      enableHWA: G,
      loadingParams: {
        disableAutoFetch: R,
        enableXfa: E
      }
    };
  return Promise.all([u.promise, V]).then(function ([, Q]) {
    if (u.destroyed) throw new Error("Worker was destroyed");
    K.evaluatorOptions.hasGPU = Q;
    const q = u.messageHandler.sendWithPromise("GetDocRequest", K, a ? [a.buffer] : null);
    let ne;
    if (!a) if (l) ne = new _si({
      pdfDataRangeTransport: l,
      disableRange: T,
      disableStream: P
    });else if (r) {
      const de = Rsi(r);
      ne = new de({
        url: r,
        httpHeaders: i,
        withCredentials: o,
        rangeChunkSize: d,
        disableRange: T,
        disableStream: P
      });
    } else throw new Error("getDocument - expected either `data`, `range`, or `url` parameter.");
    return q.then(de => {
      if (u.destroyed) throw new Error("Worker was destroyed");
      const le = new aye(n, de, u.port),
        J = new Fsi(le, t, ne, W, Y, L);
      if (t._transport = J, t.destroyed) throw new Error("Loading aborted");
      le.send("Ready", null);
    });
  }).catch(t._capability.reject).finally(t._setupCapability.resolve), t;
}

var YGe;

const XGe = class XGe {
  constructor() {
    On(this, "_capability", Promise.withResolvers());
    On(this, "_setupCapability", Promise.withResolvers());
    On(this, "_transport", null);
    On(this, "_worker", null);
    On(this, "docId", `d${rm(XGe, YGe)._++}`);
    On(this, "destroyed", !1);
    On(this, "onPassword", null);
    On(this, "onProgress", null);
  }
  get promise() {
    return this._capability.promise;
  }
  async destroy() {
    var t, n, r, a;
    this.destroyed = !0, this._capability.promise.catch(() => {});
    try {
      (t = this._worker) != null && t.port && (this._worker._pendingDestroy = !0), await this._setupCapability.promise, await ((n = this._transport) == null ? void 0 : n.destroy());
    } catch (i) {
      throw (r = this._worker) != null && r.port && delete this._worker._pendingDestroy, i;
    }
    this._transport = null, (a = this._worker) == null || a.destroy(), this._worker = null;
  }
  async getData() {
    return this._transport.getData();
  }
};

YGe = new WeakMap(), qt(XGe, YGe, 0);

let r2t = XGe;

var fse, Lq, ASn;

let cor = (ASn = class {
  constructor(t, n, r = !1, a = null) {
    qt(this, fse, Promise.withResolvers());
    qt(this, Lq, null);
    this.length = t, this.initialData = n, this.progressiveDone = r, this.contentDispositionFilename = a;
  }
  onDataRange(t, n) {
    te(this, Lq).call(this, {
      type: "range",
      begin: t,
      chunk: n
    });
  }
  onDataProgressiveRead(t) {
    te(this, fse).promise.then(() => {
      te(this, Lq).call(this, {
        type: "progressiveRead",
        chunk: t
      });
    });
  }
  onDataProgressiveDone() {
    te(this, fse).promise.then(() => {
      te(this, Lq).call(this, {
        type: "progressiveDone"
      });
    });
  }
  transportReady(t) {
    yt(this, Lq, t), te(this, fse).resolve();
  }
  requestDataRange(t, n) {
    Pu("Abstract method PDFDataRangeTransport.requestDataRange");
  }
  abort() {}
}, fse = new WeakMap(), Lq = new WeakMap(), ASn);

class Bsi {
  constructor(t, n) {
    this._pdfInfo = t, this._transport = n;
  }
  get pagesMapper() {
    return this._transport.pagesMapper;
  }
  get annotationStorage() {
    return this._transport.annotationStorage;
  }
  get canvasFactory() {
    return this._transport.canvasFactory;
  }
  get filterFactory() {
    return this._transport.filterFactory;
  }
  get numPages() {
    return this._pdfInfo.numPages;
  }
  get fingerprints() {
    return this._pdfInfo.fingerprints;
  }
  get isPureXfa() {
    return Ws(this, "isPureXfa", !!this._transport._htmlForXfa);
  }
  get allXfaHtml() {
    return this._transport._htmlForXfa;
  }
  getPage(t) {
    return this._transport.getPage(t);
  }
  getPageIndex(t) {
    return this._transport.getPageIndex(t);
  }
  getDestinations() {
    return this._transport.getDestinations();
  }
  getDestination(t) {
    return this._transport.getDestination(t);
  }
  getPageLabels() {
    return this._transport.getPageLabels();
  }
  getPageLayout() {
    return this._transport.getPageLayout();
  }
  getPageMode() {
    return this._transport.getPageMode();
  }
  getViewerPreferences() {
    return this._transport.getViewerPreferences();
  }
  getOpenAction() {
    return this._transport.getOpenAction();
  }
  getAttachments() {
    return this._transport.getAttachments();
  }
  getAttachmentContent(t) {
    return this._transport.getAttachmentContent(t);
  }
  getAnnotationsByType(t, n) {
    return this._transport.getAnnotationsByType(t, n);
  }
  getJSActions() {
    return this._transport.getDocJSActions();
  }
  getOutline() {
    return this._transport.getOutline();
  }
  getOptionalContentConfig({
    intent: t = "display"
  } = {}) {
    const {
      renderingIntent: n
    } = this._transport.getRenderingIntent(t);
    return this._transport.getOptionalContentConfig(n);
  }
  getPermissions() {
    return this._transport.getPermissions();
  }
  getMetadata() {
    return this._transport.getMetadata();
  }
  getMarkInfo() {
    return this._transport.getMarkInfo();
  }
  getData() {
    return this._transport.getData();
  }
  saveDocument() {
    return this._transport.saveDocument();
  }
  extractPages(t, n = null) {
    return this._transport.extractPages(t, n);
  }
  getDownloadInfo() {
    return this._transport.downloadInfoCapability.promise;
  }
  cleanup(t = !1) {
    return this._transport.startCleanup(t || this.isPureXfa);
  }
  cachedPageNumber(t) {
    return this._transport.cachedPageNumber(t);
  }
  get loadingParams() {
    return this._transport.loadingParams;
  }
  get loadingTask() {
    return this._transport.loadingTask;
  }
  getFieldObjects() {
    return this._transport.getFieldObjects();
  }
  getSignatures() {
    return this._transport.getSignatures();
  }
  getSignatureData(t) {
    return this._transport.getSignatureData(t);
  }
  hasJSActions() {
    return this._transport.hasJSActions();
  }
  getCalculationOrderIds() {
    return this._transport.getCalculationOrderIds();
  }
}

var oN, Oq, Bq, dye;

const yVt = class yVt {
  constructor(t, n, r, a, i = !1) {
    qt(this, Bq);
    qt(this, oN, !1);
    qt(this, Oq, null);
    this._pageIndex = t, this._pageInfo = n, this._transport = r, this._stats = i ? new Ion() : null, this._pdfBug = i, this.commonObjs = r.commonObjs, this.objs = new ror(), this._intentStates = new Map(), this.destroyed = !1, this.recordedBBoxes = null, yt(this, Oq, a), this.imageCoordinates = null;
  }
  clone(t) {
    const n = new yVt(t, this._pageInfo, this._transport, te(this, Oq), this._pdfBug);
    return n.clonedFromIndex = this.clonedFromIndex ?? this._pageIndex, this._transport.updatePage(n), n;
  }
  get pageNumber() {
    return this._pageIndex + 1;
  }
  set pageNumber(t) {
    this._pageIndex = t - 1, this._transport.updatePage(this);
  }
  get rotate() {
    return this._pageInfo.rotate;
  }
  get ref() {
    return this._pageInfo.ref;
  }
  get userUnit() {
    return this._pageInfo.userUnit;
  }
  get view() {
    return this._pageInfo.view;
  }
  getViewport({
    scale: t,
    rotation: n = this.rotate,
    offsetX: r = 0,
    offsetY: a = 0,
    dontFlip: i = !1
  } = {}) {
    return new DCe({
      viewBox: this.view,
      userUnit: this.userUnit,
      scale: t,
      rotation: n,
      offsetX: r,
      offsetY: a,
      dontFlip: i
    });
  }
  getAnnotations({
    intent: t = "display"
  } = {}) {
    const {
      renderingIntent: n
    } = this._transport.getRenderingIntent(t);
    return this._transport.getAnnotations(this._pageIndex, n);
  }
  getJSActions() {
    return this._transport.getPageJSActions(this._pageIndex);
  }
  get filterFactory() {
    return this._transport.filterFactory;
  }
  get isPureXfa() {
    return Ws(this, "isPureXfa", !!this._transport._htmlForXfa);
  }
  async getXfa() {
    var t;
    return ((t = this._transport._htmlForXfa) == null ? void 0 : t.children[this._pageIndex]) || null;
  }
  render({
    canvasContext: t,
    canvas: n = t.canvas,
    viewport: r,
    intent: a = "display",
    annotationMode: i = HO.ENABLE,
    transform: o = null,
    background: s = null,
    optionalContentConfigPromise: l = null,
    annotationCanvasMap: d = null,
    pageColors: u = null,
    printAnnotationStorage: h = null,
    isEditing: p = !1,
    recordImages: m = !1,
    recordOperations: f = !1,
    operationsFilter: y = null
  }) {
    var R, j, B;
    (R = this._stats) == null || R.time("Overall");
    const b = this._transport.getRenderingIntent(a, i, h, p),
      {
        renderingIntent: v,
        cacheKey: _
      } = b;
    yt(this, oN, !1), l || (l = this._transport.getOptionalContentConfig(v));
    const w = this._intentStates.getOrInsertComputed(_, oxt);
    w.streamReaderCancelTimeout && (clearTimeout(w.streamReaderCancelTimeout), w.streamReaderCancelTimeout = null);
    const k = !!(v & aS.PRINT);
    w.displayReadyCapability || (w.displayReadyCapability = Promise.withResolvers(), w.operatorList = {
      fnArray: [],
      argsArray: [],
      lastChunk: !1,
      separateAnnots: null
    }, (j = this._stats) == null || j.time("Page Request"), this._pumpOperatorList(b));
    const A = !!(this._pdfBug && ((B = globalThis.StepperManager) != null && B.enabled)),
      S = !!n && !this.recordedBBoxes && (f || A),
      C = !!n && !this.imageCoordinates && m,
      I = F => {
        var N, G, z, V;
        if (w.renderTasks.delete(T), S) {
          const O = (N = T.gfx) == null ? void 0 : N.dependencyTracker.take();
          O && ((G = T.stepper) == null || G.setOperatorBBoxes(O, T.gfx.dependencyTracker.takeDebugMetadata()), f && (this.recordedBBoxes = O));
        }
        C && !F && (this.imageCoordinates = (z = T.gfx) == null ? void 0 : z.imagesTracker.take()), k && yt(this, oN, !0), Gt(this, Bq, dye).call(this), F ? (T.capability.reject(F), this._abortOperatorList({
          intentState: w,
          reason: F instanceof Error ? F : new Error(F)
        })) : T.capability.resolve(), this._stats && (this._stats.timeEnd("Rendering"), this._stats.timeEnd("Overall"), (V = globalThis.Stats) != null && V.enabled && globalThis.Stats.add(this.pageNumber, this._stats));
      };
    let E = null,
      M = null;
    (S || C) && (M = new Roi(n, w.operatorList.length)), S && (E = new Noi(M, A));
    const T = new o2t({
      callback: I,
      params: {
        canvas: n,
        canvasContext: t,
        dependencyTracker: E ?? M,
        imagesTracker: C ? new Oxt(n) : null,
        viewport: r,
        transform: o,
        background: s
      },
      objs: this.objs,
      commonObjs: this.commonObjs,
      annotationCanvasMap: d,
      operatorList: w.operatorList,
      pageIndex: this._pageIndex,
      canvasFactory: this._transport.canvasFactory,
      filterFactory: this._transport.filterFactory,
      useRequestAnimationFrame: !k,
      pdfBug: this._pdfBug,
      pageColors: u,
      enableHWA: this._transport.enableHWA,
      operationsFilter: y
    });
    (w.renderTasks || (w.renderTasks = new Set())).add(T);
    const P = T.task;
    return Promise.all([w.displayReadyCapability.promise, l]).then(([F, N]) => {
      var G;
      if (this.destroyed) {
        I();
        return;
      }
      if ((G = this._stats) == null || G.time("Rendering"), !(N.renderingIntent & v)) throw new Error("Must use the same `intent`-argument when calling the `PDFPageProxy.render` and `PDFDocumentProxy.getOptionalContentConfig` methods.");
      T.initializeGraphics({
        transparency: F,
        optionalContentConfig: N
      }), T.operatorListChanged();
    }).catch(I), P;
  }
  getOperatorList({
    intent: t = "display",
    annotationMode: n = HO.ENABLE,
    printAnnotationStorage: r = null,
    isEditing: a = !1
  } = {}) {
    var d;
    function i() {
      s.operatorList.lastChunk && (s.opListReadCapability.resolve(s.operatorList), s.renderTasks.delete(l));
    }
    const o = this._transport.getRenderingIntent(t, n, r, a, !0),
      s = this._intentStates.getOrInsertComputed(o.cacheKey, oxt);
    let l;
    return s.opListReadCapability || (l = Object.create(null), l.operatorListChanged = i, s.opListReadCapability = Promise.withResolvers(), (s.renderTasks || (s.renderTasks = new Set())).add(l), s.operatorList = {
      fnArray: [],
      argsArray: [],
      lastChunk: !1,
      separateAnnots: null
    }, (d = this._stats) == null || d.time("Page Request"), this._pumpOperatorList(o)), s.opListReadCapability.promise;
  }
  streamTextContent({
    includeMarkedContent: t = !1,
    disableNormalization: n = !1
  } = {}) {
    return this._transport.messageHandler.sendWithStream("GetTextContent", {
      pageId: te(this, Oq).getPageId(this._pageIndex + 1) - 1,
      pageIndex: this._pageIndex,
      includeMarkedContent: t === !0,
      disableNormalization: n === !0
    }, {
      highWaterMark: 100,
      size(a) {
        return a.items.length;
      }
    });
  }
  async getTextContent(t = {}) {
    if (this._transport._htmlForXfa) return this.getXfa().then(a => Eke.textContent(a));
    const n = this.streamTextContent(t),
      r = {
        items: [],
        styles: Object.create(null),
        lang: null
      };
    for await (const a of n) r.lang ?? (r.lang = a.lang), Object.assign(r.styles, a.styles), r.items.push(...a.items);
    return r;
  }
  getStructTree() {
    return this._transport.getStructTree(this._pageIndex);
  }
  _destroy() {
    this.destroyed = !0;
    const t = [];
    for (const n of this._intentStates.values()) if (this._abortOperatorList({
      intentState: n,
      reason: new Error("Page was destroyed."),
      force: !0
    }), !n.opListReadCapability) for (const r of n.renderTasks) t.push(r.completed), r.cancel();
    return this.objs.clear(), yt(this, oN, !1), Promise.all(t);
  }
  cleanup(t = !1) {
    yt(this, oN, !0);
    const n = Gt(this, Bq, dye).call(this);
    return t && n && this._stats && (this._stats = new Ion()), n;
  }
  _startRenderPage(t, n) {
    var a, i;
    const r = this._intentStates.get(n);
    r && ((a = this._stats) == null || a.timeEnd("Page Request"), (i = r.displayReadyCapability) == null || i.resolve(t));
  }
  _renderPageChunk(t, n) {
    for (let r = 0, a = t.length; r < a; r++) n.operatorList.fnArray.push(t.fnArray[r]), n.operatorList.argsArray.push(t.argsArray[r]);
    n.operatorList.lastChunk = t.lastChunk, n.operatorList.separateAnnots = t.separateAnnots;
    for (const r of n.renderTasks) r.operatorListChanged();
    t.lastChunk && Gt(this, Bq, dye).call(this);
  }
  _pumpOperatorList({
    renderingIntent: t,
    cacheKey: n,
    annotationStorageSerializable: r,
    modifiedIds: a
  }) {
    const {
        map: i,
        transfer: o
      } = r,
      l = this._transport.messageHandler.sendWithStream("GetOperatorList", {
        pageId: te(this, Oq).getPageId(this._pageIndex + 1) - 1,
        pageIndex: this._pageIndex,
        intent: t,
        cacheKey: n,
        annotationStorage: i,
        modifiedIds: a
      }, void 0, o).getReader(),
      d = this._intentStates.get(n);
    d.streamReader = l;
    const u = () => {
      l.read().then(({
        value: h,
        done: p
      }) => {
        if (p) {
          d.streamReader = null;
          return;
        }
        this._transport.destroyed || (this._renderPageChunk(h, d), u());
      }, h => {
        if (d.streamReader = null, !this._transport.destroyed) {
          if (d.operatorList) {
            d.operatorList.lastChunk = !0;
            for (const p of d.renderTasks) p.operatorListChanged();
            Gt(this, Bq, dye).call(this);
          }
          if (d.displayReadyCapability) d.displayReadyCapability.reject(h);else if (d.opListReadCapability) d.opListReadCapability.reject(h);else throw h;
        }
      });
    };
    u();
  }
  _abortOperatorList({
    intentState: t,
    reason: n,
    force: r = !1
  }) {
    if (t.streamReader) {
      if (t.streamReaderCancelTimeout && (clearTimeout(t.streamReaderCancelTimeout), t.streamReaderCancelTimeout = null), !r) {
        if (t.renderTasks.size > 0) return;
        if (n instanceof oBt) {
          let a = Osi;
          n.extraDelay > 0 && n.extraDelay < 1e3 && (a += n.extraDelay), t.streamReaderCancelTimeout = setTimeout(() => {
            t.streamReaderCancelTimeout = null, this._abortOperatorList({
              intentState: t,
              reason: n,
              force: !0
            });
          }, a);
          return;
        }
      }
      if (t.streamReader.cancel(new u$(n.message)).catch(() => {}), t.streamReader = null, !this._transport.destroyed) {
        for (const [a, i] of this._intentStates) if (i === t) {
          this._intentStates.delete(a);
          break;
        }
        this.cleanup();
      }
    }
  }
  get stats() {
    return this._stats;
  }
};

oN = new WeakMap(), Oq = new WeakMap(), Bq = new WeakSet(), dye = function () {
  if (!te(this, oN) || this.destroyed) return !1;
  for (const {
    renderTasks: t,
    operatorList: n
  } of this._intentStates.values()) if (t.size > 0 || !n.lastChunk) return !1;
  return this._intentStates.clear(), this.objs.clear(), yt(this, oN, !1), !0;
};

let a2t = yVt;

var RB, SC, sN, Fq, Mm, JGe, zq, Uq, V2, S7e, dor, uor, uye, gse, I7e;

let i2t = (Mm = class {
  constructor({
    name: t = null,
    port: n = null,
    verbosity: r = loi()
  } = {}) {
    qt(this, V2);
    qt(this, RB, Promise.withResolvers());
    qt(this, SC, null);
    qt(this, sN, null);
    qt(this, Fq, null);
    if (this.name = t, this.destroyed = !1, this.verbosity = r, n) {
      if (te(Mm, Uq).has(n)) throw new Error("Cannot use more than one PDFWorker per port.");
      te(Mm, Uq).set(n, this), Gt(this, V2, dor).call(this, n);
    } else Gt(this, V2, uor).call(this);
  }
  get promise() {
    return te(this, RB).promise;
  }
  get port() {
    return te(this, sN);
  }
  get messageHandler() {
    return te(this, SC);
  }
  destroy() {
    var t, n;
    this.destroyed = !0, (t = te(this, Fq)) == null || t.terminate(), yt(this, Fq, null), te(Mm, Uq).delete(te(this, sN)), yt(this, sN, null), (n = te(this, SC)) == null || n.destroy(), yt(this, SC, null);
  }
  static create(t) {
    const n = te(this, Uq).get(t == null ? void 0 : t.port);
    if (n) {
      if (n._pendingDestroy) throw new Error("PDFWorker.create - the worker is being destroyed.\nPlease remember to await `PDFDocumentLoadingTask.destroy()`-calls.");
      return n;
    }
    return new Mm(t);
  }
  static get workerSrc() {
    if (WO.workerSrc) return WO.workerSrc;
    throw new Error('No "GlobalWorkerOptions.workerSrc" specified.');
  }
  static get _setupFakeWorkerGlobal() {
    return Ws(this, "_setupFakeWorkerGlobal", (async () => te(this, gse, I7e) ? te(this, gse, I7e) : (await import(this.workerSrc)).WorkerMessageHandler)());
  }
}, RB = new WeakMap(), SC = new WeakMap(), sN = new WeakMap(), Fq = new WeakMap(), JGe = new WeakMap(), zq = new WeakMap(), Uq = new WeakMap(), V2 = new WeakSet(), S7e = function () {
  te(this, RB).resolve(), te(this, SC).send("configure", {
    verbosity: this.verbosity
  });
}, dor = function (t) {
  yt(this, sN, t), yt(this, SC, new aye("main", "worker", t)), te(this, SC).on("ready", () => {}), Gt(this, V2, S7e).call(this);
}, uor = function () {
  if (te(Mm, zq) || te(Mm, gse, I7e)) {
    Gt(this, V2, uye).call(this);
    return;
  }
  let {
    workerSrc: t
  } = Mm;
  try {
    Mm._isSameOrigin(window.location, t) || (t = Mm._createCDNWrapper(new URL(t, window.location).href));
    const n = new Worker(t, {
        type: "module"
      }),
      r = new aye("main", "worker", n),
      a = () => {
        i.abort(), r.destroy(), n.terminate(), this.destroyed ? te(this, RB).reject(new Error("Worker was destroyed")) : Gt(this, V2, uye).call(this);
      },
      i = new AbortController();
    n.addEventListener("error", () => {
      te(this, Fq) || a();
    }, {
      signal: i.signal
    }), r.on("test", s => {
      if (i.abort(), this.destroyed || !s) {
        a();
        return;
      }
      yt(this, SC, r), yt(this, sN, n), yt(this, Fq, n), Gt(this, V2, S7e).call(this);
    }), r.on("ready", s => {
      if (i.abort(), this.destroyed) {
        a();
        return;
      }
      try {
        o();
      } catch {
        Gt(this, V2, uye).call(this);
      }
    });
    const o = () => {
      const s = new Uint8Array();
      r.send("test", s, [s.buffer]);
    };
    o();
    return;
  } catch {
    YXe("The worker has been disabled.");
  }
  Gt(this, V2, uye).call(this);
}, uye = function () {
  te(Mm, zq) || (Vl("Setting up fake worker."), yt(Mm, zq, !0)), Mm._setupFakeWorkerGlobal.then(t => {
    if (this.destroyed) {
      te(this, RB).reject(new Error("Worker was destroyed"));
      return;
    }
    const n = new Woi();
    yt(this, sN, n);
    const r = `fake${rm(Mm, JGe)._++}`,
      a = new aye(r + "_worker", r, n);
    t.setup(a, n), yt(this, SC, new aye(r, r + "_worker", n)), Gt(this, V2, S7e).call(this);
  }).catch(t => {
    te(this, RB).reject(new Error(`Setting up fake worker failed: "${t.message}".`));
  });
}, gse = new WeakSet(), I7e = function () {
  var t;
  try {
    return ((t = globalThis.pdfjsWorker) == null ? void 0 : t.WorkerMessageHandler) || null;
  } catch {
    return null;
  }
}, qt(Mm, gse), qt(Mm, JGe, 0), qt(Mm, zq, !1), qt(Mm, Uq, new WeakMap()), cS && (yt(Mm, zq, !0), WO.workerSrc || (WO.workerSrc = "./pdf.worker.mjs")), Mm._isSameOrigin = (t, n) => {
  const r = URL.parse(t);
  if (!(r != null && r.origin) || r.origin === "null") return !1;
  const a = new URL(n, r);
  return r.origin === a.origin;
}, Mm._createCDNWrapper = t => {
  const n = `await import("${t}");`;
  return URL.createObjectURL(new Blob([n], {
    type: "text/javascript"
  }));
}, Mm);

var VA, $q, lN, IC, Gq, yse, cN, x5, jne, C7e;

class Fsi {
  constructor(t, n, r, a, i, o) {
    qt(this, x5);
    On(this, "downloadInfoCapability", Promise.withResolvers());
    qt(this, VA, null);
    qt(this, $q, new Map());
    qt(this, lN, null);
    qt(this, IC, new Map());
    qt(this, Gq, new Map());
    qt(this, yse, new Map());
    qt(this, cN, null);
    this.messageHandler = t, this.loadingTask = n, yt(this, lN, r), this.commonObjs = new ror(), this.fontLoader = new Doi({
      ownerDocument: a.ownerDocument,
      styleElement: a.styleElement
    }), this.enableHWA = a.enableHWA, this.loadingParams = a.loadingParams, this._params = a, this.canvasFactory = i.canvasFactory, this.filterFactory = i.filterFactory, this.binaryDataFactory = i.binaryDataFactory, this.pagesMapper = o, this.destroyed = !1, this.destroyCapability = null, this.setupMessageHandler();
  }
  updatePage(t) {
    const {
      _pageIndex: n
    } = t;
    te(this, IC).set(n, t), te(this, Gq).set(n, Promise.resolve(t));
  }
  get annotationStorage() {
    return Ws(this, "annotationStorage", new lBt());
  }
  getRenderingIntent(t, n = HO.ENABLE, r = null, a = !1, i = !1) {
    let o = aS.DISPLAY,
      s = Mke;
    switch (t) {
      case "any":
        o = aS.ANY;
        break;
      case "display":
        break;
      case "print":
        o = aS.PRINT;
        break;
      default:
        Vl(`getRenderingIntent - invalid intent: ${t}`);
    }
    const l = o & aS.PRINT && r instanceof Sir ? r : this.annotationStorage;
    switch (n) {
      case HO.DISABLE:
        o += aS.ANNOTATIONS_DISABLE;
        break;
      case HO.ENABLE:
        break;
      case HO.ENABLE_FORMS:
        o += aS.ANNOTATIONS_FORMS;
        break;
      case HO.ENABLE_STORAGE:
        o += aS.ANNOTATIONS_STORAGE, s = l.serializable;
        break;
      default:
        Vl(`getRenderingIntent - invalid annotationMode: ${n}`);
    }
    a && (o += aS.IS_EDITING), i && (o += aS.OPLIST);
    const {
        ids: d,
        hash: u
      } = l.modifiedIds,
      h = [o, s.hash, u];
    return {
      renderingIntent: o,
      cacheKey: h.join("_"),
      annotationStorageSerializable: s,
      modifiedIds: d
    };
  }
  destroy() {
    var r;
    if (this.destroyCapability) return this.destroyCapability.promise;
    this.destroyed = !0, this.destroyCapability = Promise.withResolvers(), (r = te(this, cN)) == null || r.reject(new Error("Worker was destroyed during onPassword callback"));
    const t = [];
    for (const a of te(this, IC).values()) t.push(a._destroy());
    te(this, IC).clear(), te(this, Gq).clear(), te(this, yse).clear(), Object.hasOwn(this, "annotationStorage") && this.annotationStorage.resetModified();
    const n = this.messageHandler.sendWithPromise("Terminate", null);
    return t.push(n), Promise.all(t).then(() => {
      var a, i;
      this.commonObjs.clear(), this.fontLoader.clear(), te(this, $q).clear(), this.filterFactory.destroy(), e2t.cleanup(), (a = te(this, lN)) == null || a.cancelAllRequests(new u$("Worker was terminated.")), (i = this.messageHandler) == null || i.destroy(), this.messageHandler = null, this.destroyCapability.resolve();
    }, this.destroyCapability.reject), this.destroyCapability.promise;
  }
  setupMessageHandler() {
    const {
      messageHandler: t,
      loadingTask: n
    } = this;
    t.on("GetReader", (r, a) => {
      sg(te(this, lN), "GetReader - no `BasePDFStream` instance available."), yt(this, VA, te(this, lN).getFullReader()), te(this, VA).onProgress = i => Gt(this, x5, C7e).call(this, i), a.onPull = () => {
        te(this, VA).read().then(function ({
          value: i,
          done: o
        }) {
          if (o) {
            a.close();
            return;
          }
          sg(i instanceof ArrayBuffer, "GetReader - expected an ArrayBuffer."), a.enqueue(new Uint8Array(i), 1, [i]);
        }).catch(i => {
          a.error(i);
        });
      }, a.onCancel = i => {
        te(this, VA).cancel(i), a.ready.catch(o => {
          if (!this.destroyed) throw o;
        });
      };
    }), t.on("ReaderHeadersReady", async r => {
      await te(this, VA).headersReady;
      const {
        isStreamingSupported: a,
        isRangeSupported: i,
        contentLength: o
      } = te(this, VA);
      return a && i && (te(this, VA).onProgress = null), {
        isStreamingSupported: a,
        isRangeSupported: i,
        contentLength: o
      };
    }), t.on("GetRangeReader", (r, a) => {
      sg(te(this, lN), "GetRangeReader - no `BasePDFStream` instance available.");
      const i = te(this, lN).getRangeReader(r.begin, r.end);
      if (!i) {
        a.close();
        return;
      }
      a.onPull = () => {
        i.read().then(function ({
          value: o,
          done: s
        }) {
          if (s) {
            a.close();
            return;
          }
          sg(o instanceof ArrayBuffer, "GetRangeReader - expected an ArrayBuffer."), a.enqueue(new Uint8Array(o), 1, [o]);
        }).catch(o => {
          a.error(o);
        });
      }, a.onCancel = o => {
        i.cancel(o), a.ready.catch(s => {
          if (!this.destroyed) throw s;
        });
      };
    }), t.on("GetDoc", ({
      pdfInfo: r
    }) => {
      this.pagesMapper.pagesNumber = r.numPages, this._numPages = r.numPages, this._htmlForXfa = r.htmlForXfa, delete r.htmlForXfa, n._capability.resolve(new Bsi(r, this));
    }), t.on("DocException", r => {
      n._capability.reject(U_(r));
    }), t.on("PasswordRequest", r => {
      yt(this, cN, Promise.withResolvers());
      try {
        if (!n.onPassword) throw U_(r);
        const a = i => {
          i instanceof Error ? te(this, cN).reject(i) : te(this, cN).resolve({
            password: i
          });
        };
        n.onPassword(a, r.code);
      } catch (a) {
        te(this, cN).reject(a);
      }
      return te(this, cN).promise;
    }), t.on("DataLoaded", r => {
      Gt(this, x5, C7e).call(this, {
        loaded: r.length,
        total: r.length
      }), this.downloadInfoCapability.resolve(r);
    }), t.on("StartRenderPage", r => {
      if (this.destroyed) return;
      te(this, IC).get(r.pageIndex)._startRenderPage(r.transparency, r.cacheKey);
    }), t.on("commonobj", ([r, a, i]) => {
      var o;
      if (this.destroyed || this.commonObjs.has(r)) return null;
      switch (a) {
        case "Font":
          if ("error" in i) {
            const p = i.error;
            Vl(`Error during font loading: ${p}`), this.commonObjs.resolve(r, p);
            break;
          }
          const s = new Foi(i),
            l = this._params.pdfBug && ((o = globalThis.FontInspector) != null && o.enabled) ? (p, m) => globalThis.FontInspector.fontAdded(p, m) : null,
            d = new Loi(s, l, i.charProcOperatorList, i.extra);
          this.fontLoader.bind(d).catch(() => t.sendWithPromise("FontFallback", {
            id: r
          })).finally(() => {
            d.fontExtraProperties || d.clearData(), this.commonObjs.resolve(r, d);
          });
          break;
        case "CopyLocalImage":
          const {
            imageRef: u
          } = i;
          sg(u, "The imageRef must be defined.");
          for (const p of te(this, IC).values()) for (const [, m] of p.objs) {
            if ((m == null ? void 0 : m.ref) !== u) continue;
            if (!m.dataLen) return null;
            const f = structuredClone(m);
            return this.commonObjs.resolve(r, f), m.dataLen;
          }
          break;
        case "FontPath":
          this.commonObjs.resolve(r, new Uoi(i));
          break;
        case "Image":
          this.commonObjs.resolve(r, i);
          break;
        case "Pattern":
          const h = new zoi(i);
          this.commonObjs.resolve(r, h.getIR());
          break;
        default:
          throw new Error(`Got unknown common object type ${a}`);
      }
      return null;
    }), t.on("obj", ([r, a, i, o]) => {
      var l;
      if (this.destroyed) return;
      const s = te(this, IC).get(a);
      if (!s.objs.has(r)) {
        if (s._intentStates.size === 0) {
          (l = o == null ? void 0 : o.bitmap) == null || l.close();
          return;
        }
        switch (i) {
          case "Image":
          case "Pattern":
            s.objs.resolve(r, o);
            break;
          default:
            throw new Error(`Got unknown object type ${i}`);
        }
      }
    }), t.on("DocProgress", r => {
      this.destroyed || Gt(this, x5, C7e).call(this, r);
    }), t.on("FetchBinaryData", async r => {
      if (this.destroyed) throw new Error("Worker was destroyed.");
      if (!this.binaryDataFactory) throw new Error("`BinaryDataFactory` not initialized, see the `useWorkerFetch` parameter.");
      return this.binaryDataFactory.fetch(r);
    });
  }
  getData() {
    return this.messageHandler.sendWithPromise("GetData", null);
  }
  saveDocument() {
    var r;
    this.annotationStorage.size <= 0 && Vl("saveDocument called while `annotationStorage` is empty, please use the getData-method instead.");
    const {
      map: t,
      transfer: n
    } = this.annotationStorage.serializable;
    return this.messageHandler.sendWithPromise("SaveDocument", {
      isPureXfa: !!this._htmlForXfa,
      numPages: this._numPages,
      annotationStorage: t,
      filename: ((r = te(this, VA)) == null ? void 0 : r.filename) ?? null
    }, n).finally(() => {
      this.annotationStorage.resetModified();
    });
  }
  extractPages(t, n = null) {
    var o;
    const r = {
      pageInfos: t
    };
    let a;
    const i = globalThis.ImageBitmap;
    if (typeof i == "function") {
      const s = Array.isArray(t) ? t : [t];
      for (const l of s) (l == null ? void 0 : l.image) instanceof i && (a || (a = [])).push(l.image);
    }
    if (this.annotationStorage.size > 0) {
      const s = this.annotationStorage.serializable;
      let {
        map: l
      } = s;
      (o = s.transfer) != null && o.length && (a ? a.push(...s.transfer) : a = s.transfer);
      const d = this.pagesMapper.getMapping();
      if (d) {
        const u = new Map();
        for (const [h, p] of l) {
          if ((p == null ? void 0 : p.pageIndex) !== void 0 && p.pageIndex >= 0 && p.pageIndex < d.length) {
            const m = (n == null ? void 0 : n[p.pageIndex]) ?? 0,
              f = d[p.pageIndex] - 1;
            if (f !== p.pageIndex || m !== 0) {
              u.set(h, {
                ...p,
                pageIndex: f,
                copyLevel: m
              });
              continue;
            }
          }
          u.set(h, p);
        }
        l = u;
      }
      r.annotationStorage = l;
    }
    return this.messageHandler.sendWithPromise("ExtractPages", r, a).finally(() => {
      this.annotationStorage.resetModified();
    });
  }
  getPage(t) {
    if (!Number.isInteger(t) || t <= 0 || t > this.pagesMapper.pagesNumber) return Promise.reject(new Error("Invalid page request."));
    const n = t - 1,
      r = this.pagesMapper.getPageId(t) - 1,
      a = te(this, Gq).get(n);
    if (a) return a;
    const i = this.messageHandler.sendWithPromise("GetPage", {
      pageIndex: r
    }).then(o => {
      if (this.destroyed) throw new Error("Transport destroyed");
      o.refStr && te(this, yse).set(o.refStr, r);
      const s = new a2t(n, o, this, this.pagesMapper, this._params.pdfBug);
      return te(this, IC).set(n, s), s;
    });
    return te(this, Gq).set(n, i), i;
  }
  async getPageIndex(t) {
    if (!Fxt(t)) throw new Error("Invalid pageIndex request.");
    const n = await this.messageHandler.sendWithPromise("GetPageIndex", {
        num: t.num,
        gen: t.gen
      }),
      r = this.pagesMapper.getPageNumber(n + 1);
    if (r === 0) throw new Error("GetPageIndex: page has been removed.");
    return r - 1;
  }
  getAnnotations(t, n) {
    return this.messageHandler.sendWithPromise("GetAnnotations", {
      pageIndex: this.pagesMapper.getPageId(t + 1) - 1,
      intent: n
    });
  }
  getFieldObjects() {
    return Gt(this, x5, jne).call(this, "GetFieldObjects");
  }
  getSignatures() {
    return Gt(this, x5, jne).call(this, "GetSignatures");
  }
  getSignatureData(t) {
    return this.messageHandler.sendWithPromise("GetSignatureData", t);
  }
  hasJSActions() {
    return Gt(this, x5, jne).call(this, "HasJSActions");
  }
  getCalculationOrderIds() {
    return this.messageHandler.sendWithPromise("GetCalculationOrderIds", null);
  }
  getDestinations() {
    return this.messageHandler.sendWithPromise("GetDestinations", null);
  }
  getDestination(t) {
    return typeof t != "string" ? Promise.reject(new Error("Invalid destination request.")) : this.messageHandler.sendWithPromise("GetDestination", {
      id: t
    });
  }
  getPageLabels() {
    return this.messageHandler.sendWithPromise("GetPageLabels", null);
  }
  getPageLayout() {
    return this.messageHandler.sendWithPromise("GetPageLayout", null);
  }
  getPageMode() {
    return this.messageHandler.sendWithPromise("GetPageMode", null);
  }
  getViewerPreferences() {
    return this.messageHandler.sendWithPromise("GetViewerPreferences", null);
  }
  getOpenAction() {
    return this.messageHandler.sendWithPromise("GetOpenAction", null);
  }
  getAttachments() {
    return this.messageHandler.sendWithPromise("GetAttachments", null);
  }
  getAttachmentContent(t) {
    return this.messageHandler.sendWithPromise("GetAttachmentContent", t);
  }
  getAnnotationsByType(t, n) {
    return this.messageHandler.sendWithPromise("GetAnnotationsByType", {
      types: t,
      pageIndexesToSkip: n
    });
  }
  getDocJSActions() {
    return Gt(this, x5, jne).call(this, "GetDocJSActions");
  }
  getPageJSActions(t) {
    return this.messageHandler.sendWithPromise("GetPageJSActions", {
      pageIndex: this.pagesMapper.getPageId(t + 1) - 1
    });
  }
  getStructTree(t) {
    return this.messageHandler.sendWithPromise("GetStructTree", {
      pageIndex: this.pagesMapper.getPageId(t + 1) - 1
    });
  }
  getOutline() {
    return this.messageHandler.sendWithPromise("GetOutline", null);
  }
  getOptionalContentConfig(t) {
    return Gt(this, x5, jne).call(this, "GetOptionalContentConfig").then(n => new Yxt(n, t));
  }
  getPermissions() {
    return this.messageHandler.sendWithPromise("GetPermissions", null);
  }
  getMetadata() {
    const t = "GetMetadata";
    return te(this, $q).getOrInsertComputed(t, () => this.messageHandler.sendWithPromise(t, null).then(n => {
      var r, a;
      return {
        info: n[0],
        metadata: n[1] ? new Nsi(n[1]) : null,
        contentDispositionFilename: ((r = te(this, VA)) == null ? void 0 : r.filename) ?? null,
        contentLength: ((a = te(this, VA)) == null ? void 0 : a.contentLength) ?? null,
        hasStructTree: n[2]
      };
    }));
  }
  getMarkInfo() {
    return this.messageHandler.sendWithPromise("GetMarkInfo", null);
  }
  async startCleanup(t = !1) {
    if (!this.destroyed) {
      await this.messageHandler.sendWithPromise("Cleanup", null);
      for (const n of te(this, IC).values()) if (!n.cleanup()) throw new Error(`startCleanup: Page ${n.pageNumber} is currently rendering.`);
      this.commonObjs.clear(), t || this.fontLoader.clear(), te(this, $q).clear(), this.filterFactory.destroy(!0), e2t.cleanup();
    }
  }
  cachedPageNumber(t) {
    if (!Fxt(t)) return null;
    const n = t.gen === 0 ? `${t.num}R` : `${t.num}R${t.gen}`,
      r = te(this, yse).get(n);
    if (r >= 0) {
      const a = this.pagesMapper.getPageNumber(r + 1);
      if (a !== 0) return a;
    }
    return null;
  }
}

VA = new WeakMap(), $q = new WeakMap(), lN = new WeakMap(), IC = new WeakMap(), Gq = new WeakMap(), yse = new WeakMap(), cN = new WeakMap(), x5 = new WeakSet(), jne = function (t, n = null) {
  return te(this, $q).getOrInsertComputed(t, () => this.messageHandler.sendWithPromise(t, n));
}, C7e = function ({
  loaded: t,
  total: n
}) {
  var r, a;
  (a = (r = this.loadingTask).onProgress) == null || a.call(r, {
    loaded: t,
    total: n,
    percent: n ? Pm(Math.round(t / n * 100), 0, 100) : NaN
  });
};

class zsi {
  constructor(t) {
    On(this, "_internalRenderTask", null);
    On(this, "onContinue", null);
    On(this, "onError", null);
    this._internalRenderTask = t;
  }
  get promise() {
    return this._internalRenderTask.capability.promise;
  }
  cancel(t = 0) {
    this._internalRenderTask.cancel(null, t);
  }
  get separateAnnots() {
    const {
      separateAnnots: t
    } = this._internalRenderTask.operatorList;
    if (!t) return !1;
    const {
      annotationCanvasMap: n
    } = this._internalRenderTask;
    return t.form || t.canvas && (n == null ? void 0 : n.size) > 0;
  }
  get imageCoordinates() {
    return this._internalRenderTask.imageCoordinates || null;
  }
}

var NB, Vq;

const DH = class DH {
  constructor({
    callback: t,
    params: n,
    objs: r,
    commonObjs: a,
    annotationCanvasMap: i,
    operatorList: o,
    pageIndex: s,
    canvasFactory: l,
    filterFactory: d,
    useRequestAnimationFrame: u = !1,
    pdfBug: h = !1,
    pageColors: p = null,
    enableHWA: m = !1,
    operationsFilter: f = null
  }) {
    qt(this, NB, null);
    this.callback = t, this.params = n, this.objs = r, this.commonObjs = a, this.annotationCanvasMap = i, this.operatorListIdx = null, this.operatorList = o, this._pageIndex = s, this.canvasFactory = l, this.filterFactory = d, this._pdfBug = h, this.pageColors = p, this.running = !1, this.graphicsReadyCallback = null, this.graphicsReady = !1, this._useRequestAnimationFrame = u === !0 && typeof window < "u", this.cancelled = !1, this.capability = Promise.withResolvers(), this.task = new zsi(this), this._cancelBound = this.cancel.bind(this), this._continueBound = this._continue.bind(this), this._scheduleNextBound = this._scheduleNext.bind(this), this._nextBound = this._next.bind(this), this._canvas = n.canvas, this._canvasContext = n.canvas ? null : n.canvasContext, this._enableHWA = m, this._dependencyTracker = n.dependencyTracker, this._imagesTracker = n.imagesTracker, this._operationsFilter = f;
  }
  get completed() {
    return this.capability.promise.catch(function () {});
  }
  initializeGraphics({
    transparency: t = !1,
    optionalContentConfig: n
  }) {
    var d, u;
    if (this.cancelled) return;
    if (this._canvas) {
      if (te(DH, Vq).has(this._canvas)) throw new Error("Cannot use the same canvas during multiple render() operations. Use different canvas or ensure previous operations were cancelled or completed.");
      te(DH, Vq).add(this._canvas);
    }
    this._pdfBug && ((d = globalThis.StepperManager) != null && d.enabled) && (this.stepper = globalThis.StepperManager.create(this._pageIndex), this.stepper.init(this.operatorList), this.stepper.nextBreakPoint = this.stepper.getNextBreakPoint());
    const {
        viewport: r,
        transform: a,
        background: i,
        dependencyTracker: o,
        imagesTracker: s
      } = this.params,
      l = this._canvasContext || this._canvas.getContext("2d", {
        alpha: !1,
        willReadFrequently: !this._enableHWA
      });
    this.gfx = new Yie(l, this.commonObjs, this.objs, this.canvasFactory, this.filterFactory, {
      optionalContentConfig: n
    }, this.annotationCanvasMap, this.pageColors, o, s), this.gfx.beginDrawing({
      transform: a,
      viewport: r,
      transparency: t,
      background: i
    }), this.operatorListIdx = 0, this.graphicsReady = !0, (u = this.graphicsReadyCallback) == null || u.call(this);
  }
  cancel(t = null, n = 0) {
    var r, a, i;
    this.running = !1, this.cancelled = !0, (r = this.gfx) == null || r.endDrawing(), te(this, NB) && (window.cancelAnimationFrame(te(this, NB)), yt(this, NB, null)), te(DH, Vq).delete(this._canvas), t || (t = new oBt(`Rendering cancelled, page ${this._pageIndex + 1}`, n)), this.callback(t), (i = (a = this.task).onError) == null || i.call(a, t);
  }
  operatorListChanged() {
    var t, n;
    if (!this.graphicsReady) {
      this.graphicsReadyCallback || (this.graphicsReadyCallback = this._continueBound);
      return;
    }
    (t = this.gfx.dependencyTracker) == null || t.growOperationsCount(this.operatorList.fnArray.length), (n = this.stepper) == null || n.updateOperatorList(this.operatorList), !this.running && this._continue();
  }
  _continue() {
    this.running = !0, !this.cancelled && (this.task.onContinue ? this.task.onContinue(this._scheduleNextBound) : this._scheduleNext());
  }
  _scheduleNext() {
    this._useRequestAnimationFrame ? yt(this, NB, window.requestAnimationFrame(() => {
      yt(this, NB, null), this._nextBound().catch(this._cancelBound);
    })) : Promise.resolve().then(this._nextBound).catch(this._cancelBound);
  }
  async _next() {
    this.cancelled || (this.operatorListIdx = this.gfx.executeOperatorList(this.operatorList, this.operatorListIdx, this._continueBound, this.stepper, this._operationsFilter), this.operatorListIdx === this.operatorList.argsArray.length && (this.running = !1, this.operatorList.lastChunk && (this.gfx.endDrawing(), te(DH, Vq).delete(this._canvas), this.callback())));
  }
};

NB = new WeakMap(), Vq = new WeakMap(), qt(DH, Vq, new WeakSet());

let o2t = DH;

const Usi = "6.3.289",
  $si = "1c8020a7d";

jc(3068);

var HA, Hq, bse, ob, n3e, vse, dN, r3e, jB, CC, I1, a3e, yp, s2t, l2t, c2t, XV, por, iO;

let hor = (I1 = class {
  constructor({
    editor: t = null,
    uiManager: n = null
  }) {
    qt(this, yp);
    qt(this, HA, null);
    qt(this, Hq, null);
    qt(this, bse);
    qt(this, ob, null);
    qt(this, n3e, !1);
    qt(this, vse, !1);
    qt(this, dN, null);
    qt(this, r3e);
    qt(this, jB, null);
    qt(this, CC, null);
    var r, a;
    t ? (yt(this, vse, !1), yt(this, dN, t)) : yt(this, vse, !0), yt(this, CC, (t == null ? void 0 : t._uiManager) || n), yt(this, r3e, te(this, CC)._eventBus), yt(this, bse, ((r = t == null ? void 0 : t.color) == null ? void 0 : r.toUpperCase()) || ((a = te(this, CC)) == null ? void 0 : a.highlightColors.values().next().value) || "#FFFF98"), te(I1, a3e) || yt(I1, a3e, Object.freeze({
      blue: "pdfjs-editor-colorpicker-blue",
      green: "pdfjs-editor-colorpicker-green",
      pink: "pdfjs-editor-colorpicker-pink",
      red: "pdfjs-editor-colorpicker-red",
      yellow: "pdfjs-editor-colorpicker-yellow"
    }));
  }
  static get _keyboardManager() {
    return Ws(this, "_keyboardManager", new CJ([[["Escape"], I1.prototype._hideDropdownFromKeyboard], [["Space"], I1.prototype._colorSelectFromKeyboard], [["ArrowDown", "ArrowRight"], I1.prototype._moveToNext], [["ArrowUp", "ArrowLeft"], I1.prototype._moveToPrevious], [["Home"], I1.prototype._moveToBeginning], [["End"], I1.prototype._moveToEnd]]));
  }
  renderButton() {
    const t = yt(this, HA, document.createElement("button"));
    t.className = "colorPicker", t.tabIndex = "0", t.setAttribute("data-l10n-id", "pdfjs-editor-colorpicker-button"), t.ariaHasPopup = "true", te(this, dN) && (t.ariaControls = `${te(this, dN).id}_colorpicker_dropdown`);
    const n = te(this, CC)._signal;
    t.addEventListener("click", Gt(this, yp, XV).bind(this), {
      signal: n
    }), t.addEventListener("keydown", Gt(this, yp, c2t).bind(this), {
      signal: n
    });
    const r = yt(this, Hq, document.createElement("span"));
    return r.className = "swatch", r.ariaHidden = "true", r.style.backgroundColor = te(this, bse), t.append(r), t;
  }
  renderMainDropdown() {
    const t = yt(this, ob, Gt(this, yp, s2t).call(this));
    return t.ariaOrientation = "horizontal", t.ariaLabelledBy = "highlightColorPickerLabel", t;
  }
  _colorSelectFromKeyboard(t) {
    if (t.target === te(this, HA)) {
      Gt(this, yp, XV).call(this, t);
      return;
    }
    const n = t.target.getAttribute("data-color");
    n && Gt(this, yp, l2t).call(this, n, t);
  }
  _moveToNext(t) {
    var n, r;
    if (!te(this, yp, iO)) {
      Gt(this, yp, XV).call(this, t);
      return;
    }
    if (t.target === te(this, HA)) {
      (n = te(this, ob).firstElementChild) == null || n.focus();
      return;
    }
    (r = t.target.nextSibling) == null || r.focus();
  }
  _moveToPrevious(t) {
    var n, r;
    if (t.target === ((n = te(this, ob)) == null ? void 0 : n.firstElementChild) || t.target === te(this, HA)) {
      te(this, yp, iO) && this._hideDropdownFromKeyboard();
      return;
    }
    te(this, yp, iO) || Gt(this, yp, XV).call(this, t), (r = t.target.previousSibling) == null || r.focus();
  }
  _moveToBeginning(t) {
    var n;
    if (!te(this, yp, iO)) {
      Gt(this, yp, XV).call(this, t);
      return;
    }
    (n = te(this, ob).firstElementChild) == null || n.focus();
  }
  _moveToEnd(t) {
    var n;
    if (!te(this, yp, iO)) {
      Gt(this, yp, XV).call(this, t);
      return;
    }
    (n = te(this, ob).lastElementChild) == null || n.focus();
  }
  hideDropdown() {
    var t, n;
    (t = te(this, ob)) == null || t.classList.add("hidden"), te(this, HA).ariaExpanded = "false", (n = te(this, jB)) == null || n.abort(), yt(this, jB, null);
  }
  _hideDropdownFromKeyboard() {
    var t;
    if (!te(this, vse)) {
      if (!te(this, yp, iO)) {
        (t = te(this, dN)) == null || t.unselect();
        return;
      }
      this.hideDropdown(), te(this, HA).focus({
        preventScroll: !0,
        focusVisible: te(this, n3e)
      });
    }
  }
  update(t) {
    if (te(this, Hq) && (te(this, Hq).style.backgroundColor = t), !te(this, ob)) return;
    const n = te(this, CC).highlightColors.values();
    for (const r of te(this, ob).children) r.ariaSelected = n.next().value === t.toUpperCase();
  }
  destroy() {
    var t, n;
    (t = te(this, HA)) == null || t.remove(), yt(this, HA, null), yt(this, Hq, null), (n = te(this, ob)) == null || n.remove(), yt(this, ob, null);
  }
}, HA = new WeakMap(), Hq = new WeakMap(), bse = new WeakMap(), ob = new WeakMap(), n3e = new WeakMap(), vse = new WeakMap(), dN = new WeakMap(), r3e = new WeakMap(), jB = new WeakMap(), CC = new WeakMap(), a3e = new WeakMap(), yp = new WeakSet(), s2t = function () {
  const t = document.createElement("div"),
    n = te(this, CC)._signal;
  t.addEventListener("contextmenu", gT, {
    signal: n
  }), t.className = "dropdown", t.role = "listbox", t.ariaMultiSelectable = "false", t.ariaOrientation = "vertical", t.setAttribute("data-l10n-id", "pdfjs-editor-colorpicker-dropdown"), te(this, dN) && (t.id = `${te(this, dN).id}_colorpicker_dropdown`);
  for (const [r, a] of te(this, CC).highlightColors) {
    const i = document.createElement("button");
    i.tabIndex = "0", i.role = "option", i.setAttribute("data-color", a), i.title = r, i.setAttribute("data-l10n-id", te(I1, a3e)[r]);
    const o = document.createElement("span");
    i.append(o), o.className = "swatch", o.style.backgroundColor = a, i.ariaSelected = a === te(this, bse), i.addEventListener("click", Gt(this, yp, l2t).bind(this, a), {
      signal: n
    }), t.append(i);
  }
  return t.addEventListener("keydown", Gt(this, yp, c2t).bind(this), {
    signal: n
  }), t;
}, l2t = function (t, n) {
  n.stopPropagation(), te(this, r3e).dispatch("switchannotationeditorparams", {
    source: this,
    type: Td.HIGHLIGHT_COLOR,
    value: t
  }), this.update(t);
}, c2t = function (t) {
  I1._keyboardManager.exec(this, t);
}, XV = function (t) {
  if (te(this, yp, iO)) {
    this.hideDropdown();
    return;
  }
  if (yt(this, n3e, t.detail === 0), te(this, jB) || (yt(this, jB, new AbortController()), window.addEventListener("pointerdown", Gt(this, yp, por).bind(this), {
    signal: te(this, CC).combinedSignal(te(this, jB))
  })), te(this, HA).ariaExpanded = "true", te(this, ob)) {
    te(this, ob).classList.remove("hidden");
    return;
  }
  const n = yt(this, ob, Gt(this, yp, s2t).call(this));
  te(this, HA).append(n);
}, por = function (t) {
  var n;
  (n = te(this, ob)) != null && n.contains(t.target) || this.hideDropdown();
}, iO = function () {
  return te(this, ob) && !te(this, ob).classList.contains("hidden");
}, qt(I1, a3e, null), I1);

var WA, wse, Wq, uN, i3e;

const LH = class LH {
  constructor(t) {
    qt(this, WA, null);
    qt(this, wse, !1);
    qt(this, Wq, null);
    qt(this, uN, null);
    yt(this, Wq, t), yt(this, uN, t._uiManager), te(LH, i3e) || yt(LH, i3e, Object.freeze({
      freetext: "pdfjs-editor-color-picker-free-text-input",
      ink: "pdfjs-editor-color-picker-ink-input"
    }));
  }
  renderButton() {
    if (te(this, WA)) return te(this, WA);
    const {
        editorType: t,
        colorType: n,
        colorAndOpacityType: r,
        opacityType: a,
        color: i,
        opacity: o
      } = te(this, Wq),
      s = yt(this, wse, gp.isAlphaColorInputSupported && a !== void 0),
      l = yt(this, WA, document.createElement("input"));
    if (l.type = "color", s) {
      l.setAttribute("alpha", "");
      const d = fo.hexNums[Math.round((o ?? 1) * 255)];
      l.value = (i || "#000000") + d;
    } else l.value = i || "#000000";
    return l.className = "basicColorPicker", l.tabIndex = 0, l.setAttribute("data-l10n-id", te(LH, i3e)[t]), l.addEventListener("input", () => {
      if (s) {
        const d = LCe(l.value);
        if (!d) return;
        const [u, h, p, m] = d,
          f = fo.makeHexColor(u, h, p);
        r !== void 0 ? te(this, uN).updateParams(r, {
          color: f,
          opacity: m
        }) : (te(this, uN).updateParams(n, f), te(this, uN).updateParams(a, m));
      } else te(this, uN).updateParams(n, l.value);
    }, {
      signal: te(this, uN)._signal
    }), l;
  }
  update(t) {
    if (te(this, WA)) if (te(this, wse)) {
      const n = fo.hexNums[Math.round(te(this, Wq).opacity * 255)];
      te(this, WA).value = t + n;
    } else te(this, WA).value = t;
  }
  updateOpacity(t) {
    if (!te(this, WA) || !te(this, wse)) return;
    const n = fo.hexNums[Math.round(t * 255)];
    te(this, WA).value = te(this, Wq).color + n;
  }
  destroy() {
    var t;
    (t = te(this, WA)) == null || t.remove(), yt(this, WA, null);
  }
  hideDropdown() {}
};

WA = new WeakMap(), wse = new WeakMap(), Wq = new WeakMap(), uN = new WeakMap(), i3e = new WeakMap(), qt(LH, i3e, null);

let aUe = LH;

jc(531);

function Zon(e) {
  return Math.floor(Pm(e, 0, 1) * 255).toString(16).padStart(2, "0");
}

function xfe(e) {
  return Pm(e, 0, 1) * 255;
}

class esn {
  static CMYK_G([t, n, r, a]) {
    return ["G", 1 - Math.min(1, .3 * t + .59 * r + .11 * n + a)];
  }
  static G_CMYK([t]) {
    return ["CMYK", 0, 0, 0, 1 - t];
  }
  static G_RGB([t]) {
    return ["RGB", t, t, t];
  }
  static G_rgb([t]) {
    return t = xfe(t), [t, t, t];
  }
  static G_HTML([t]) {
    const n = Zon(t);
    return `#${n}${n}${n}`;
  }
  static RGB_G([t, n, r]) {
    return ["G", .3 * t + .59 * n + .11 * r];
  }
  static RGB_rgb(t) {
    return t.map(xfe);
  }
  static RGB_HTML(t) {
    return `#${t.map(Zon).join("")}`;
  }
  static T_HTML() {
    return "#00000000";
  }
  static T_rgb() {
    return [null];
  }
  static CMYK_RGB([t, n, r, a]) {
    return ["RGB", 1 - Math.min(1, t + a), 1 - Math.min(1, r + a), 1 - Math.min(1, n + a)];
  }
  static CMYK_rgb([t, n, r, a]) {
    return [xfe(1 - Math.min(1, t + a)), xfe(1 - Math.min(1, r + a)), xfe(1 - Math.min(1, n + a))];
  }
  static CMYK_HTML(t) {
    const n = this.CMYK_RGB(t).slice(1);
    return this.RGB_HTML(n);
  }
  static RGB_CMYK([t, n, r]) {
    const a = 1 - t,
      i = 1 - n,
      o = 1 - r,
      s = Math.min(a, i, o);
    return ["CMYK", a, i, o, s];
  }
}

class Gsi {
  create(t, n, r = !1) {
    if (t <= 0 || n <= 0) throw new Error("Invalid SVG dimensions");
    const a = this._createSVG("svg:svg");
    return a.setAttribute("version", "1.1"), r || (a.setAttribute("width", `${t}px`), a.setAttribute("height", `${n}px`)), a.setAttribute("preserveAspectRatio", "none"), a.setAttribute("viewBox", `0 0 ${t} ${n}`), a;
  }
  createElement(t) {
    if (typeof t != "string") throw new Error("Invalid SVG element type");
    return this._createSVG(t);
  }
  _createSVG(t) {
    Pu("Abstract method `_createSVG` called.");
  }
}

let iUe = class extends Gsi {
  _createSVG(t) {
    return document.createElementNS(p2, t);
  }
};

const Vsi = 9,
  EJ = new WeakSet(),
  Hsi = new Date().getTimezoneOffset() * 60 * 1e3;

class dot {
  static create(t) {
    switch (t.data.annotationType) {
      case Wf.LINK:
        return new dBt(t);
      case Wf.TEXT:
        return new qsi(t);
      case Wf.WIDGET:
        switch (t.data.fieldType) {
          case "Tx":
            return new Ksi(t);
          case "Btn":
            return t.data.radioButton ? new Xsi(t) : t.data.checkBox ? new Ysi(t) : new Jsi(t);
          case "Ch":
            return new Zsi(t);
          case "Sig":
            return new Qsi(t);
        }
        return new JZ(t);
      case Wf.POPUP:
        return new u2t(t);
      case Wf.FREETEXT:
        return new xor(t);
      case Wf.LINE:
        return new tli(t);
      case Wf.SQUARE:
        return new nli(t);
      case Wf.CIRCLE:
        return new rli(t);
      case Wf.POLYLINE:
        return new _or(t);
      case Wf.CARET:
        return new ili(t);
      case Wf.INK:
        return new uBt(t);
      case Wf.POLYGON:
        return new ali(t);
      case Wf.HIGHLIGHT:
        return new kor(t);
      case Wf.UNDERLINE:
        return new oli(t);
      case Wf.SQUIGGLY:
        return new sli(t);
      case Wf.STRIKEOUT:
        return new lli(t);
      case Wf.STAMP:
        return new Aor(t);
      case Wf.FILEATTACHMENT:
        return new cli(t);
      case Wf.RICHMEDIA:
      case Wf.SCREEN:
      case Wf.SOUND:
        return new Sor(t);
      default:
        return new Cf(t);
    }
  }
}

var qq, xse, j4, o3e, d2t;

const bVt = class bVt {
  constructor(t, {
    isRenderable: n = !1,
    ignoreBorder: r = !1,
    createQuadrilaterals: a = !1
  } = {}) {
    qt(this, o3e);
    qt(this, qq, null);
    qt(this, xse, !1);
    qt(this, j4, null);
    this.isRenderable = n, this.data = t.data, this.layer = t.layer, this.linkService = t.linkService, this.downloadManager = t.downloadManager, this.imageResourcesPath = t.imageResourcesPath, this.renderForms = t.renderForms, this.svgFactory = t.svgFactory, this.annotationStorage = t.annotationStorage, this.enableComment = t.enableComment, this.enableScripting = t.enableScripting, this.hasJSActions = t.hasJSActions, this._fieldObjects = t.fieldObjects, this.parent = t.parent, this.hasOwnCommentButton = !1, n && (this.contentElement = this.container = this._createContainer(r)), a && this._createQuadrilaterals();
  }
  static _hasPopupData({
    contentsObj: t,
    richText: n
  }) {
    return !!(t != null && t.str || n != null && n.str);
  }
  get _isEditable() {
    return this.data.isEditable;
  }
  get hasPopupData() {
    return bVt._hasPopupData(this.data) || this.enableComment && !!this.commentText;
  }
  get commentData() {
    var r;
    const {
        data: t
      } = this,
      n = (r = this.annotationStorage) == null ? void 0 : r.getEditor(t.id);
    return n ? n.getData() : t;
  }
  get hasCommentButton() {
    return this.enableComment && this.hasPopupElement;
  }
  get commentButtonPosition() {
    var s;
    const t = (s = this.annotationStorage) == null ? void 0 : s.getEditor(this.data.id);
    if (t) return t.commentButtonPositionInPage;
    const {
      quadPoints: n,
      inkLists: r,
      rect: a
    } = this.data;
    let i = -1 / 0,
      o = -1 / 0;
    if ((n == null ? void 0 : n.length) >= 8) {
      for (let l = 0; l < n.length; l += 8) n[l + 1] > o ? (o = n[l + 1], i = n[l + 2]) : n[l + 1] === o && (i = Math.max(i, n[l + 2]));
      return [i, o];
    }
    if ((r == null ? void 0 : r.length) >= 1) {
      for (const l of r) for (let d = 0, u = l.length; d < u; d += 2) l[d + 1] > o ? (o = l[d + 1], i = l[d]) : l[d + 1] === o && (i = Math.max(i, l[d]));
      if (i !== 1 / 0) return [i, o];
    }
    return a ? [a[2], a[3]] : null;
  }
  _normalizePoint(t) {
    const {
      page: {
        view: n
      },
      viewport: {
        rawDims: {
          pageWidth: r,
          pageHeight: a,
          pageX: i,
          pageY: o
        }
      }
    } = this.parent;
    return t[1] = n[3] - t[1] + n[1], t[0] = 100 * (t[0] - i) / r, t[1] = 100 * (t[1] - o) / a, t;
  }
  get commentText() {
    var n, r, a;
    const {
      data: t
    } = this;
    return ((r = (n = this.annotationStorage.getRawValue(`${jde}${t.id}`)) == null ? void 0 : n.popup) == null ? void 0 : r.contents) || ((a = t.contentsObj) == null ? void 0 : a.str) || "";
  }
  set commentText(t) {
    const {
        data: n
      } = this,
      r = {
        deleted: !t,
        contents: t || ""
      };
    this.annotationStorage.updateEditor(n.id, {
      popup: r
    }) || this.annotationStorage.setValue(`${jde}${n.id}`, {
      id: n.id,
      annotationType: n.annotationType,
      page: this.parent.page,
      popup: r,
      popupRef: n.popupRef,
      modificationDate: new Date()
    }), t || this.removePopup();
  }
  removePopup() {
    var t, n;
    (n = ((t = te(this, j4)) == null ? void 0 : t.popup) || this.popup) == null || n.remove(), yt(this, j4, this.popup = null);
  }
  updateEdited(t) {
    var i;
    if (!this.container) return;
    t.rect && (te(this, qq) || yt(this, qq, {
      rect: this.data.rect.slice(0)
    }));
    const {
      rect: n,
      popup: r
    } = t;
    n && Gt(this, o3e, d2t).call(this, n);
    let a = ((i = te(this, j4)) == null ? void 0 : i.popup) || this.popup;
    !a && (r != null && r.text) && (this._createPopup(r), a = te(this, j4).popup), a && (a.updateEdited(t), r != null && r.deleted && (a.remove(), yt(this, j4, null), this.popup = null));
  }
  resetEdited() {
    var t;
    te(this, qq) && (Gt(this, o3e, d2t).call(this, te(this, qq).rect), (t = te(this, j4)) == null || t.popup.resetEdited(), yt(this, qq, null));
  }
  _createContainer(t) {
    const {
        data: n,
        parent: {
          page: r,
          viewport: a
        }
      } = this,
      i = document.createElement("section");
    i.setAttribute("data-annotation-id", n.id), !(this instanceof JZ) && !(this instanceof dBt) && !(this instanceof Sor) && (i.tabIndex = 0);
    const {
      style: o
    } = i;
    if (o.zIndex = this.parent.zIndex, this.parent.zIndex += 2, n.alternativeText && (i.title = n.alternativeText), n.noRotate && i.classList.add("norotate"), !n.rect || this instanceof u2t) {
      const {
        rotation: y
      } = n;
      return !n.hasOwnCanvas && y !== 0 && this.setRotation(y, i), i;
    }
    const {
      width: s,
      height: l
    } = this;
    if (!t && n.borderStyle.width > 0) {
      o.borderWidth = `${n.borderStyle.width}px`;
      const y = n.borderStyle.horizontalCornerRadius,
        b = n.borderStyle.verticalCornerRadius;
      if (y > 0 || b > 0) {
        const _ = `calc(${y}px * var(--total-scale-factor)) / calc(${b}px * var(--total-scale-factor))`;
        o.borderRadius = _;
      }
      switch (n.borderStyle.style) {
        case Pne.SOLID:
          o.borderStyle = "solid";
          break;
        case Pne.DASHED:
          o.borderStyle = "dashed";
          break;
        case Pne.BEVELED:
          Vl("Unimplemented border style: beveled");
          break;
        case Pne.INSET:
          Vl("Unimplemented border style: inset");
          break;
        case Pne.UNDERLINE:
          o.borderBottomStyle = "solid";
          break;
      }
      const v = n.borderColor || null;
      v ? (yt(this, xse, !0), o.borderColor = fo.makeHexColor(...v)) : o.borderWidth = 0;
    }
    const d = fo.normalizeRect([n.rect[0], r.view[3] - n.rect[1] + r.view[1], n.rect[2], r.view[3] - n.rect[3] + r.view[1]]),
      {
        pageWidth: u,
        pageHeight: h,
        pageX: p,
        pageY: m
      } = a.rawDims;
    o.left = `${100 * (d[0] - p) / u}%`, o.top = `${100 * (d[1] - m) / h}%`;
    const {
      rotation: f
    } = n;
    return n.hasOwnCanvas || f === 0 ? (o.width = `${100 * s / u}%`, o.height = `${100 * l / h}%`) : this.setRotation(f, i), i;
  }
  setRotation(t, n = this.container) {
    if (!this.data.rect) return;
    const {
      pageWidth: r,
      pageHeight: a
    } = this.parent.viewport.rawDims;
    let {
      width: i,
      height: o
    } = this;
    t % 180 !== 0 && ([i, o] = [o, i]), n.style.width = `${100 * i / r}%`, n.style.height = `${100 * o / a}%`, n.setAttribute("data-main-rotation", (360 - t) % 360);
  }
  get _commonActions() {
    const t = (n, r, a) => {
      const i = a.detail[n],
        o = i[0],
        s = i.slice(1);
      a.target.style[r] = esn[`${o}_HTML`](s), this.annotationStorage.setValue(this.data.id, {
        [r]: esn[`${o}_rgb`](s)
      });
    };
    return Ws(this, "_commonActions", {
      display: n => {
        const {
            display: r
          } = n.detail,
          a = r % 2 === 1;
        this.container.style.visibility = a ? "hidden" : "visible", this.annotationStorage.setValue(this.data.id, {
          noView: a,
          noPrint: r === 1 || r === 2
        });
      },
      print: n => {
        this.annotationStorage.setValue(this.data.id, {
          noPrint: !n.detail.print
        });
      },
      hidden: n => {
        const {
          hidden: r
        } = n.detail;
        this.container.style.visibility = r ? "hidden" : "visible", this.annotationStorage.setValue(this.data.id, {
          noPrint: r,
          noView: r
        });
      },
      focus: n => {
        setTimeout(() => n.target.focus({
          preventScroll: !1
        }), 0);
      },
      userName: n => {
        n.target.title = n.detail.userName;
      },
      readonly: n => {
        n.target.disabled = n.detail.readonly;
      },
      required: n => {
        this._setRequired(n.target, n.detail.required);
      },
      bgColor: n => {
        t("bgColor", "backgroundColor", n);
      },
      fillColor: n => {
        t("fillColor", "backgroundColor", n);
      },
      fgColor: n => {
        t("fgColor", "color", n);
      },
      textColor: n => {
        t("textColor", "color", n);
      },
      borderColor: n => {
        t("borderColor", "borderColor", n);
      },
      strokeColor: n => {
        t("strokeColor", "borderColor", n);
      },
      rotation: n => {
        const r = n.detail.rotation;
        this.setRotation(r), this.annotationStorage.setValue(this.data.id, {
          rotation: r
        });
      }
    });
  }
  _dispatchEventFromSandbox(t, n) {
    const r = this._commonActions;
    for (const a of Object.keys(n.detail)) {
      const i = t[a] || r[a];
      i == null || i(n);
    }
  }
  _setDefaultPropertiesFromJS(t) {
    if (!this.enableScripting) return;
    const n = this.annotationStorage.getRawValue(this.data.id);
    if (!n) return;
    const r = this._commonActions;
    for (const [a, i] of Object.entries(n)) {
      const o = r[a];
      if (o) {
        const s = {
          detail: {
            [a]: i
          },
          target: t
        };
        o(s), delete n[a];
      }
    }
  }
  _createQuadrilaterals() {
    if (!this.container) return;
    const {
      quadPoints: t
    } = this.data;
    if (!t) return;
    const [n, r, a, i] = this.data.rect.map(Math.fround);
    if (t.length === 8) {
      const [y, b, v, _] = t.subarray(2, 6);
      if (a === y && i === b && n === v && r === _) return;
    }
    const {
      style: o
    } = this.container;
    let s;
    if (te(this, xse)) {
      const {
        borderColor: y,
        borderWidth: b
      } = o;
      o.borderWidth = 0, s = ["url('data:image/svg+xml;utf8,", `<svg xmlns="${p2}" preserveAspectRatio="none" viewBox="0 0 1 1">`, `<g fill="transparent" stroke="${y}" stroke-width="${b}">`], this.container.classList.add("hasBorder");
    }
    const l = a - n,
      d = i - r,
      {
        svgFactory: u
      } = this,
      h = u.createElement("svg");
    h.classList.add("quadrilateralsContainer"), h.setAttribute("width", 0), h.setAttribute("height", 0), h.role = "none";
    const p = u.createElement("defs");
    h.append(p);
    const m = u.createElement("clipPath"),
      f = `clippath_${this.data.id}`;
    m.setAttribute("id", f), m.setAttribute("clipPathUnits", "objectBoundingBox"), p.append(m);
    for (let y = 2, b = t.length; y < b; y += 8) {
      const v = t[y],
        _ = t[y + 1],
        w = t[y + 2],
        k = t[y + 3],
        A = u.createElement("rect"),
        S = (w - n) / l,
        C = (i - _) / d,
        I = (v - w) / l,
        E = (_ - k) / d;
      A.setAttribute("x", S), A.setAttribute("y", C), A.setAttribute("width", I), A.setAttribute("height", E), m.append(A), s == null || s.push(`<rect vector-effect="non-scaling-stroke" x="${S}" y="${C}" width="${I}" height="${E}"/>`);
    }
    te(this, xse) && (s.push("</g></svg>')"), o.backgroundImage = s.join("")), this.container.append(h), this.container.style.clipPath = `url(#${f})`;
  }
  _createPopup(t = null) {
    const {
      data: n
    } = this;
    let r, a;
    t ? (r = {
      str: t.text
    }, a = t.date) : (r = n.contentsObj, a = n.modificationDate), yt(this, j4, new u2t({
      data: {
        color: n.color,
        titleObj: n.titleObj,
        modificationDate: a,
        contentsObj: r,
        richText: n.richText,
        parentRect: n.rect,
        borderStyle: 0,
        id: `popup_${n.id}`,
        rotation: n.rotation,
        noRotate: !0
      },
      linkService: this.linkService,
      parent: this.parent,
      elements: [this]
    }));
  }
  get hasPopupElement() {
    return !!(te(this, j4) || this.popup || this.data.popupRef);
  }
  get extraPopupElement() {
    return te(this, j4);
  }
  render() {
    Pu("Abstract method `AnnotationElement.render` called");
  }
  _getElementsByName(t, n = null) {
    const r = [];
    if (this._fieldObjects) {
      const a = this._fieldObjects.get(t) || [];
      for (const {
        page: i,
        id: o,
        exportValues: s
      } of a) {
        if (i === -1 || o === n) continue;
        const l = typeof s == "string" ? s : null,
          d = document.querySelector(`[data-element-id="${o}"]`);
        if (d && !EJ.has(d)) {
          Vl(`_getElementsByName - element not allowed: ${o}`);
          continue;
        }
        r.push({
          id: o,
          exportValue: l,
          domElement: d
        });
      }
      return r;
    }
    for (const a of document.getElementsByName(t)) {
      const {
          exportValue: i
        } = a,
        o = a.getAttribute("data-element-id");
      o !== n && EJ.has(a) && r.push({
        id: o,
        exportValue: i,
        domElement: a
      });
    }
    return r;
  }
  show() {
    var t;
    this.container && (this.container.hidden = !1), (t = this.popup) == null || t.maybeShow();
  }
  hide() {
    var t;
    this.container && (this.container.hidden = !0), (t = this.popup) == null || t.forceHide();
  }
  getElementsToTriggerPopup() {
    return this.container;
  }
  addHighlightArea() {
    const t = this.getElementsToTriggerPopup();
    if (Array.isArray(t)) for (const n of t) n.classList.add("highlightArea");else t.classList.add("highlightArea");
  }
  _editOnDoubleClick() {
    if (!this._isEditable) return;
    const {
      annotationEditorType: t,
      data: {
        id: n
      }
    } = this;
    this.container.addEventListener("dblclick", () => {
      var r;
      (r = this.linkService.eventBus) == null || r.dispatch("switchannotationeditormode", {
        source: this,
        mode: t,
        editId: n,
        mustEnterInEditMode: !0
      });
    });
  }
  updateOC(t) {
    if (!this.data.oc || !t) return;
    t.isVisible(this.data.oc) ? this.show() : this.hide();
  }
  get width() {
    return this.data.rect[2] - this.data.rect[0];
  }
  get height() {
    return this.data.rect[3] - this.data.rect[1];
  }
  _setBackgroundColor(t) {
    const n = this.data.backgroundColor || null;
    t.style.backgroundColor = n === null ? "transparent" : fo.makeHexColor(...n);
  }
};

qq = new WeakMap(), xse = new WeakMap(), j4 = new WeakMap(), o3e = new WeakSet(), d2t = function (t) {
  const {
    container: {
      style: n
    },
    data: {
      rect: r,
      rotation: a
    },
    parent: {
      viewport: {
        rawDims: {
          pageWidth: i,
          pageHeight: o,
          pageX: s,
          pageY: l
        }
      }
    }
  } = this;
  r == null || r.splice(0, 4, ...t), n.left = `${100 * (t[0] - s) / i}%`, n.top = `${100 * (o - t[3] + l) / o}%`, a === 0 ? (n.width = `${100 * (t[2] - t[0]) / i}%`, n.height = `${100 * (t[3] - t[1]) / o}%`) : this.setRotation(a);
};

let Cf = bVt;

class Wsi extends Cf {
  constructor(t) {
    super(t, {
      isRenderable: !0,
      ignoreBorder: !0
    }), this.editor = t.editor;
  }
  render() {
    return this.container.className = "editorAnnotation", this.container;
  }
  createOrUpdatePopup() {
    const {
      editor: t
    } = this;
    t.hasComment && this._createPopup(t.comment);
  }
  get hasCommentButton() {
    return this.enableComment && this.editor.hasComment;
  }
  get commentButtonPosition() {
    return this.editor.commentButtonPositionInPage;
  }
  get commentText() {
    return this.editor.comment.text;
  }
  set commentText(t) {
    this.editor.comment = t, t || this.removePopup();
  }
  get commentData() {
    return this.editor.getData();
  }
  remove() {
    this.parent.removeAnnotation(this.data.id), this.container.remove(), this.container = null, this.removePopup();
  }
}

var vS, JV, mor, gor;

class dBt extends Cf {
  constructor(n, r = null) {
    super(n, {
      isRenderable: !0,
      ignoreBorder: !!(r != null && r.ignoreBorder),
      createQuadrilaterals: !0
    });
    qt(this, vS);
    this.isTooltipOnly = n.data.isTooltipOnly;
  }
  render() {
    const {
        data: n,
        linkService: r
      } = this,
      a = document.createElement("a");
    a.setAttribute("data-element-id", n.id);
    let i = !1;
    return n.url ? (r.addLinkAttributes(a, n.url, n.newWindow), i = !0) : n.action ? (this._bindNamedAction(a, n.action, n.overlaidText), i = !0) : n.attachment ? (Gt(this, vS, mor).call(this, a, n.attachmentId, n.attachment, n.overlaidText, n.attachmentDest), i = !0) : n.setOCGState ? (Gt(this, vS, gor).call(this, a, n.setOCGState, n.overlaidText), i = !0) : n.dest ? (this._bindLink(a, n.dest, n.overlaidText), i = !0) : (n.actions && (n.actions.has("Action") || n.actions.has("Mouse Up") || n.actions.has("Mouse Down")) && this.enableScripting && this.hasJSActions && (this._bindJSAction(a, n), i = !0), n.resetForm ? (this._bindResetFormAction(a, n.resetForm), i = !0) : this.isTooltipOnly && !i && (this._bindLink(a, ""), i = !0)), this.container.classList.add("linkAnnotation"), i && (this.contentElement = a, this.container.append(a)), this.container;
  }
  _bindLink(n, r, a = "") {
    n.href = this.linkService.getDestinationHash(r), n.onclick = () => (r && this.linkService.goToDestination(r), !1), (r || r === "") && Gt(this, vS, JV).call(this), a && (n.title = a);
  }
  _bindNamedAction(n, r, a = "") {
    n.href = this.linkService.getAnchorUrl(""), n.onclick = () => (this.linkService.executeNamedAction(r), !1), a && (n.title = a), Gt(this, vS, JV).call(this);
  }
  _bindJSAction(n, {
    actions: r,
    id: a,
    overlaidText: i
  }) {
    n.href = this.linkService.getAnchorUrl("");
    const o = new Map([["Action", "onclick"], ["Mouse Up", "onmouseup"], ["Mouse Down", "onmousedown"]]);
    for (const s of r.keys()) {
      const l = o.get(s);
      l && (n[l] = () => {
        var d;
        return (d = this.linkService.eventBus) == null || d.dispatch("dispatcheventinsandbox", {
          source: this,
          detail: {
            id: a,
            name: s
          }
        }), !1;
      });
    }
    i && (n.title = i), n.onclick || (n.onclick = () => !1), Gt(this, vS, JV).call(this);
  }
  _bindResetFormAction(n, r) {
    const a = n.onclick;
    if (a || (n.href = this.linkService.getAnchorUrl("")), Gt(this, vS, JV).call(this), !this._fieldObjects) {
      Vl('_bindResetFormAction - "resetForm" action not supported, ensure that the `fieldObjects` parameter is provided.'), a || (n.onclick = () => !1);
      return;
    }
    n.onclick = () => {
      var h;
      a == null || a();
      const {
          fields: i,
          refs: o,
          include: s
        } = r,
        l = [];
      if (i.length !== 0 || o.length !== 0) {
        const p = new Set(o);
        for (const m of i) {
          const f = this._fieldObjects.get(m) || [];
          for (const {
            id: y
          } of f) p.add(y);
        }
        for (const m of this._fieldObjects.values()) for (const f of m) p.has(f.id) === s && l.push(f);
      } else for (const p of this._fieldObjects.values()) l.push(...p);
      const d = this.annotationStorage,
        u = [];
      for (const p of l) {
        const {
          id: m
        } = p;
        switch (u.push(m), p.type) {
          case "text":
            {
              const y = p.defaultValue || "";
              d.setValue(m, {
                value: y
              });
              break;
            }
          case "checkbox":
          case "radiobutton":
            {
              const y = p.defaultValue === p.exportValues;
              d.setValue(m, {
                value: y
              });
              break;
            }
          case "combobox":
          case "listbox":
            {
              const y = p.defaultValue || "";
              d.setValue(m, {
                value: y
              });
              break;
            }
          default:
            continue;
        }
        const f = document.querySelector(`[data-element-id="${m}"]`);
        if (f) {
          if (!EJ.has(f)) {
            Vl(`_bindResetFormAction - element not allowed: ${m}`);
            continue;
          }
        } else continue;
        f.dispatchEvent(new Event("resetform"));
      }
      return this.enableScripting && ((h = this.linkService.eventBus) == null || h.dispatch("dispatcheventinsandbox", {
        source: this,
        detail: {
          id: "app",
          ids: u,
          name: "ResetForm"
        }
      })), !1;
    };
  }
}

vS = new WeakSet(), JV = function () {
  this.container.setAttribute("data-internal-link", "");
}, mor = function (n, r, a, i = "", o = null) {
  n.href = this.linkService.getAnchorUrl(""), a.description ? n.title = a.description : i && (n.title = i);
  const s = async () => {
    var d;
    const l = await this.linkService.getAttachmentContent(r);
    l && ((d = this.downloadManager) == null || d.openOrDownloadData(l, a.filename, o));
  };
  n.onclick = () => (s(), !1), Gt(this, vS, JV).call(this);
}, gor = function (n, r, a = "") {
  n.href = this.linkService.getAnchorUrl(""), n.onclick = () => (this.linkService.executeSetOCGState(r), !1), a && (n.title = a), Gt(this, vS, JV).call(this);
};

class qsi extends Cf {
  constructor(t) {
    super(t, {
      isRenderable: !0
    });
  }
  render() {
    this.container.classList.add("textAnnotation");
    const t = document.createElement("img");
    return t.src = this.imageResourcesPath + "annotation-" + this.data.name.toLowerCase() + ".svg", t.setAttribute("data-l10n-id", "pdfjs-text-annotation-type"), t.setAttribute("data-l10n-args", JSON.stringify({
      type: this.data.name
    })), !this.data.popupRef && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container.append(t), this.container;
  }
}

class JZ extends Cf {
  render() {
    return this.container;
  }
  _getKeyModifier(t) {
    return gp.platform.isMac ? t.metaKey : t.ctrlKey;
  }
  _setEventListener(t, n, r, a, i) {
    r.includes("mouse") ? t.addEventListener(r, o => {
      var s;
      (s = this.linkService.eventBus) == null || s.dispatch("dispatcheventinsandbox", {
        source: this,
        detail: {
          id: this.data.id,
          name: a,
          value: i(o),
          shift: o.shiftKey,
          modifier: this._getKeyModifier(o)
        }
      });
    }) : t.addEventListener(r, o => {
      var s;
      if (r === "blur") {
        if (!n.focused || !o.relatedTarget) return;
        n.focused = !1;
      } else if (r === "focus") {
        if (n.focused) return;
        n.focused = !0;
      }
      i && ((s = this.linkService.eventBus) == null || s.dispatch("dispatcheventinsandbox", {
        source: this,
        detail: {
          id: this.data.id,
          name: a,
          value: i(o)
        }
      }));
    });
  }
  _setEventListeners(t, n, r, a) {
    const {
      actions: i
    } = this.data;
    for (const [o, s] of r) (s === "Action" || i != null && i.has(s)) && ((s === "Focus" || s === "Blur") && (n || (n = {
      focused: !1
    })), this._setEventListener(t, n, o, s, a), s === "Focus" && !(i != null && i.has("Blur")) ? this._setEventListener(t, n, "blur", "Blur", null) : s === "Blur" && !(i != null && i.has("Focus")) && this._setEventListener(t, n, "focus", "Focus", null));
  }
  _setTextStyle(t) {
    const n = ["left", "center", "right"],
      {
        fontColor: r
      } = this.data.defaultAppearanceData,
      a = this.data.defaultAppearanceData.fontSize || Vsi,
      i = t.style;
    let o;
    const s = 2,
      l = d => Math.round(10 * d) / 10;
    if (this.data.multiLine) {
      const d = Math.abs(this.data.rect[3] - this.data.rect[1] - s),
        u = Math.round(d / (1.35 * a)) || 1,
        h = d / u;
      o = Math.min(a, l(h / 1.35));
    } else {
      const d = Math.abs(this.data.rect[3] - this.data.rect[1] - s);
      o = Math.min(a, l(d / 1.35));
    }
    i.fontSize = `calc(${o}px * var(--total-scale-factor))`, i.color = fo.makeHexColor(...r), this.data.textAlignment !== null && !this.data.comb && (i.textAlign = n[this.data.textAlignment]);
  }
  _setRequired(t, n) {
    n ? t.setAttribute("required", !0) : t.removeAttribute("required"), t.setAttribute("aria-required", n);
  }
}

class Ksi extends JZ {
  constructor(t) {
    const n = t.renderForms || t.data.hasOwnCanvas || !t.data.hasAppearance && !!t.data.fieldValue;
    super(t, {
      isRenderable: n
    });
  }
  setPropertyOnSiblings(t, n, r, a) {
    const i = this.annotationStorage;
    for (const o of this._getElementsByName(t.name, t.id)) o.domElement && (o.domElement[n] = r), i.setValue(o.id, {
      [a]: r
    });
  }
  render() {
    var a, i;
    const t = this.annotationStorage,
      n = this.data.id;
    this.container.classList.add("textWidgetAnnotation");
    let r = null;
    if (this.renderForms) {
      const o = t.getValue(n, {
        value: this.data.fieldValue
      });
      let s = o.value || "";
      const l = t.getValue(n, {
        charLimit: this.data.maxLen
      }).charLimit;
      l && s.length > l && (s = s.slice(0, l));
      let d = o.formattedValue || ((a = this.data.textContent) == null ? void 0 : a.join(`
`)) || null;
      d && this.data.comb && (d = d.replaceAll(/\s+/g, ""));
      const u = {
        userValue: s,
        formattedValue: d,
        lastCommittedValue: null,
        commitKey: 1,
        focused: !1
      };
      this.data.multiLine ? (r = document.createElement("textarea"), r.textContent = d ?? s, this.data.doNotScroll && (r.style.overflowY = "hidden")) : (r = document.createElement("input"), r.type = this.data.password ? "password" : "text", r.setAttribute("value", d ?? s), this.data.doNotScroll && (r.style.overflowX = "hidden")), this.data.hasOwnCanvas && (this.container.classList.add("hasOwnCanvas"), t.has(n) && this.container.classList.add("sandboxModified")), EJ.add(r), this.contentElement = r, r.setAttribute("data-element-id", n), r.disabled = this.data.readOnly, r.name = this.data.fieldName, r.tabIndex = 0;
      const {
          datetimeFormat: h,
          datetimeType: p,
          timeStep: m
        } = this.data,
        f = !!p && this.enableScripting;
      h && (r.title = h), this._setRequired(r, this.data.required), l && (r.maxLength = l), r.addEventListener("input", b => {
        t.setValue(n, {
          value: b.target.value
        }), this.setPropertyOnSiblings(r, "value", b.target.value, "value"), u.formattedValue = null;
      }), r.addEventListener("resetform", b => {
        const v = this.data.defaultFieldValue ?? "";
        r.value = u.userValue = v, u.formattedValue = null;
      });
      let y = b => {
        const {
          formattedValue: v
        } = u;
        v != null && (b.target.value = v), b.target.scrollLeft = 0;
      };
      if (this.enableScripting && this.hasJSActions) {
        r.addEventListener("focus", v => {
          var w;
          if (u.focused) return;
          const {
            target: _
          } = v;
          if (f && (_.type = p, m && (_.step = m)), u.userValue) {
            const k = u.userValue;
            if (f) {
              if (p === "time") {
                const A = new Date(k),
                  S = [A.getHours(), A.getMinutes(), A.getSeconds()];
                _.value = S.map(C => C.toString().padStart(2, "0")).join(":");
              } else _.value = new Date(k - Hsi).toISOString().split(p === "date" ? "T" : ".", 1)[0];
            } else _.value = k;
          }
          u.lastCommittedValue = _.value, u.commitKey = 1, (w = this.data.actions) != null && w.has("Focus") || (u.focused = !0);
        }), r.addEventListener("updatefromsandbox", v => {
          this.container.classList.add("sandboxModified");
          const _ = {
            value(w) {
              u.userValue = w.detail.value ?? "", f || t.setValue(n, {
                value: u.userValue.toString()
              }), w.target.value = u.userValue;
            },
            formattedValue(w) {
              const {
                formattedValue: k
              } = w.detail;
              u.formattedValue = k, k != null && w.target !== document.activeElement && (w.target.value = k);
              const A = {
                formattedValue: k
              };
              f && (A.value = k), t.setValue(n, A);
            },
            selRange(w) {
              w.target.setSelectionRange(...w.detail.selRange);
            },
            charLimit: w => {
              var C;
              const {
                  charLimit: k
                } = w.detail,
                {
                  target: A
                } = w;
              if (k === 0) {
                A.removeAttribute("maxLength");
                return;
              }
              A.setAttribute("maxLength", k);
              let S = u.userValue;
              !S || S.length <= k || (S = S.slice(0, k), A.value = u.userValue = S, t.setValue(n, {
                value: S
              }), (C = this.linkService.eventBus) == null || C.dispatch("dispatcheventinsandbox", {
                source: this,
                detail: {
                  id: n,
                  name: "Keystroke",
                  value: S,
                  willCommit: !0,
                  commitKey: 1,
                  selStart: A.selectionStart,
                  selEnd: A.selectionEnd
                }
              }));
            }
          };
          this._dispatchEventFromSandbox(_, v);
        }), r.addEventListener("keydown", v => {
          var k;
          u.commitKey = 1;
          let _ = -1;
          if (v.key === "Escape" ? _ = 0 : v.key === "Enter" && !this.data.multiLine ? _ = 2 : v.key === "Tab" && (u.commitKey = 3), _ === -1) return;
          const {
            value: w
          } = v.target;
          u.lastCommittedValue !== w && (u.lastCommittedValue = w, u.userValue = w, (k = this.linkService.eventBus) == null || k.dispatch("dispatcheventinsandbox", {
            source: this,
            detail: {
              id: n,
              name: "Keystroke",
              value: w,
              willCommit: !0,
              commitKey: _,
              selStart: v.target.selectionStart,
              selEnd: v.target.selectionEnd
            }
          }));
        });
        const b = y;
        y = null, r.addEventListener("blur", v => {
          var k, A;
          if (!u.focused || !v.relatedTarget) return;
          (k = this.data.actions) != null && k.has("Blur") || (u.focused = !1);
          const {
            target: _
          } = v;
          let {
            value: w
          } = _;
          if (f) {
            if (w && p === "time") {
              const S = w.split(":").map(C => parseInt(C, 10));
              w = new Date(2e3, 0, 1, S[0], S[1], S[2] || 0).valueOf(), _.step = "";
            } else w.includes("T") || (w = `${w}T00:00`), w = new Date(w).valueOf();
            _.type = "text";
          }
          u.userValue = w, u.lastCommittedValue !== w && ((A = this.linkService.eventBus) == null || A.dispatch("dispatcheventinsandbox", {
            source: this,
            detail: {
              id: n,
              name: "Keystroke",
              value: w,
              willCommit: !0,
              commitKey: u.commitKey,
              selStart: v.target.selectionStart,
              selEnd: v.target.selectionEnd
            }
          })), b(v);
        }), (i = this.data.actions) != null && i.has("Keystroke") && r.addEventListener("beforeinput", v => {
          var E;
          u.lastCommittedValue = null;
          const {
              data: _,
              target: w
            } = v,
            {
              value: k,
              selectionStart: A,
              selectionEnd: S
            } = w;
          let C = A,
            I = S;
          switch (v.inputType) {
            case "deleteWordBackward":
              {
                const M = /\w/;
                for (; C > 0 && !M.test(k[C - 1]);) C--;
                for (; C > 0 && M.test(k[C - 1]);) C--;
                break;
              }
            case "deleteWordForward":
              {
                const M = k.substring(A).match(/^\W*\w*/);
                M && (I += M[0].length);
                break;
              }
            case "deleteContentBackward":
              A === S && (C -= 1);
              break;
            case "deleteContentForward":
              A === S && (I += 1);
              break;
          }
          v.preventDefault(), (E = this.linkService.eventBus) == null || E.dispatch("dispatcheventinsandbox", {
            source: this,
            detail: {
              id: n,
              name: "Keystroke",
              value: k,
              change: _ || "",
              willCommit: !1,
              selStart: C,
              selEnd: I
            }
          });
        }), this._setEventListeners(r, u, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], v => v.target.value);
      }
      if (y && r.addEventListener("blur", y), this.data.comb) {
        const v = (this.data.rect[2] - this.data.rect[0]) / l;
        r.classList.add("comb"), r.style.setProperty("--comb-width", `calc(${v}px * var(--total-scale-factor))`);
        const _ = this.data.textAlignment;
        if (_ === 1 || _ === 2) {
          const w = () => {
            const k = l - r.value.length;
            r.style.setProperty("--comb-offset", `${_ === 1 ? k >> 1 : k}`);
          };
          w();
          for (const k of ["input", "blur", "resetform", "updatefromsandbox"]) r.addEventListener(k, w);
        }
      }
    } else r = document.createElement("div"), r.textContent = this.data.fieldValue, r.style.verticalAlign = "middle", r.style.display = "table-cell", this.data.hasOwnCanvas && (r.hidden = !0);
    return this._setTextStyle(r), this._setBackgroundColor(r), this._setDefaultPropertiesFromJS(r), this.container.append(r), this.container;
  }
}

class Qsi extends JZ {
  constructor(t) {
    super(t, {
      isRenderable: !!t.data.hasOwnCanvas
    });
  }
}

class Ysi extends JZ {
  constructor(t) {
    super(t, {
      isRenderable: t.renderForms
    });
  }
  render() {
    const t = this.annotationStorage,
      n = this.data,
      r = n.id;
    let a = t.getValue(r, {
      value: n.exportValue === n.fieldValue
    }).value;
    typeof a == "string" && (a = a !== "Off", t.setValue(r, {
      value: a
    })), this.container.classList.add("buttonWidgetAnnotation", "checkBox");
    const i = document.createElement("input");
    return EJ.add(i), i.setAttribute("data-element-id", r), i.disabled = n.readOnly, this._setRequired(i, this.data.required), i.type = "checkbox", i.name = n.fieldName, a && i.setAttribute("checked", !0), i.setAttribute("exportValue", n.exportValue), i.tabIndex = 0, i.addEventListener("change", o => {
      const {
        name: s,
        checked: l
      } = o.target;
      for (const d of this._getElementsByName(s, r)) {
        const u = l && d.exportValue === n.exportValue;
        d.domElement && (d.domElement.checked = u), t.setValue(d.id, {
          value: u
        });
      }
      t.setValue(r, {
        value: l
      });
    }), i.addEventListener("resetform", o => {
      const s = n.defaultFieldValue || "Off";
      o.target.checked = s === n.exportValue;
    }), this.enableScripting && this.hasJSActions && (i.addEventListener("updatefromsandbox", o => {
      const s = {
        value(l) {
          l.target.checked = l.detail.value !== "Off", t.setValue(r, {
            value: l.target.checked
          });
        }
      };
      this._dispatchEventFromSandbox(s, o);
    }), this._setEventListeners(i, null, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], o => o.target.checked)), this._setDefaultPropertiesFromJS(i), this.container.append(i), this.container;
  }
}

class Xsi extends JZ {
  constructor(t) {
    super(t, {
      isRenderable: t.renderForms
    });
  }
  render() {
    this.container.classList.add("buttonWidgetAnnotation", "radioButton");
    const t = this.annotationStorage,
      n = this.data,
      r = n.id;
    let a = t.getValue(r, {
      value: n.buttonValue !== null && n.fieldValue === n.buttonValue
    }).value;
    if (typeof a == "string" && (a = a !== n.buttonValue, t.setValue(r, {
      value: a
    })), a) for (const o of this._getElementsByName(n.fieldName, r)) t.setValue(o.id, {
      value: !1
    });
    const i = document.createElement("input");
    if (EJ.add(i), i.setAttribute("data-element-id", r), i.disabled = n.readOnly, this._setRequired(i, this.data.required), i.type = "radio", i.name = n.fieldName, a && i.setAttribute("checked", !0), i.tabIndex = 0, i.addEventListener("change", o => {
      const {
        name: s,
        checked: l
      } = o.target;
      for (const d of this._getElementsByName(s, r)) t.setValue(d.id, {
        value: !1
      });
      t.setValue(r, {
        value: l
      });
    }), i.addEventListener("resetform", o => {
      const s = n.defaultFieldValue;
      o.target.checked = s != null && s === n.buttonValue;
    }), this.enableScripting && this.hasJSActions) {
      const o = n.buttonValue;
      i.addEventListener("updatefromsandbox", s => {
        const l = {
          value: d => {
            const u = o === d.detail.value;
            for (const h of this._getElementsByName(d.target.name)) {
              const p = u && h.id === r;
              h.domElement && (h.domElement.checked = p), t.setValue(h.id, {
                value: p
              });
            }
          }
        };
        this._dispatchEventFromSandbox(l, s);
      }), this._setEventListeners(i, null, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], s => s.target.checked);
    }
    return this._setDefaultPropertiesFromJS(i), this.container.append(i), this.container;
  }
}

class Jsi extends dBt {
  constructor(t) {
    super(t, {
      ignoreBorder: t.data.hasAppearance
    });
  }
  render() {
    const t = super.render();
    t.classList.add("buttonWidgetAnnotation", "pushButton");
    const n = t.lastChild;
    return this.enableScripting && this.hasJSActions && n && (this._setDefaultPropertiesFromJS(n), n.addEventListener("updatefromsandbox", r => {
      this._dispatchEventFromSandbox({}, r);
    })), t;
  }
}

class Zsi extends JZ {
  constructor(t) {
    super(t, {
      isRenderable: t.renderForms
    });
  }
  render() {
    this.container.classList.add("choiceWidgetAnnotation");
    const t = this.annotationStorage,
      n = this.data.id,
      r = t.getValue(n, {
        value: this.data.fieldValue
      }),
      a = document.createElement("select");
    EJ.add(a), a.setAttribute("data-element-id", n), a.disabled = this.data.readOnly, this._setRequired(a, this.data.required), a.name = this.data.fieldName, a.tabIndex = 0;
    let i = this.data.combo && this.data.options.length > 0;
    this.data.combo || (a.size = this.data.options.length, this.data.multiSelect && (a.multiple = !0)), a.addEventListener("resetform", h => {
      const p = this.data.defaultFieldValue;
      for (const m of a.options) m.selected = m.value === p;
    });
    const o = (h, p) => {
      const m = p.replaceAll(" ", " ");
      h.textContent = m, m !== p && h.setAttribute("display-value", p);
    };
    for (const h of this.data.options) {
      const p = document.createElement("option");
      o(p, h.displayValue), p.value = h.exportValue, r.value.includes(h.exportValue) && (p.setAttribute("selected", !0), i = !1), a.append(p);
    }
    let s = null;
    if (i) {
      const h = document.createElement("option");
      h.value = " ", h.setAttribute("hidden", !0), h.setAttribute("selected", !0), a.prepend(h), s = () => {
        h.remove(), a.removeEventListener("input", s), s = null;
      }, a.addEventListener("input", s);
    }
    const l = h => {
      const p = h ? "value" : "textContent",
        {
          options: m,
          multiple: f
        } = a;
      return f ? Array.prototype.filter.call(m, y => y.selected).map(y => y[p]) : m.selectedIndex === -1 ? null : m[m.selectedIndex][p];
    };
    let d = l(!1);
    const u = h => {
      const p = h.target.options;
      return Array.prototype.map.call(p, m => ({
        displayValue: m.getAttribute("display-value") || m.textContent,
        exportValue: m.value
      }));
    };
    return this.enableScripting && this.hasJSActions ? (a.addEventListener("updatefromsandbox", h => {
      const p = {
        value(m) {
          s == null || s();
          const f = m.detail.value,
            y = new Set(Array.isArray(f) ? f : [f]);
          for (const b of a.options) b.selected = y.has(b.value);
          t.setValue(n, {
            value: l(!0)
          }), d = l(!1);
        },
        multipleSelection(m) {
          a.multiple = !0;
        },
        remove(m) {
          const f = a.options,
            y = m.detail.remove;
          f[y].selected = !1, a.remove(y), f.length > 0 && Array.prototype.findIndex.call(f, v => v.selected) === -1 && (f[0].selected = !0), t.setValue(n, {
            value: l(!0),
            items: u(m)
          }), d = l(!1);
        },
        clear(m) {
          for (; a.length !== 0;) a.remove(0);
          t.setValue(n, {
            value: null,
            items: []
          }), d = l(!1);
        },
        insert(m) {
          const {
              index: f,
              displayValue: y,
              exportValue: b
            } = m.detail.insert,
            v = a.children[f],
            _ = document.createElement("option");
          o(_, y), _.value = b, v ? v.before(_) : a.append(_), t.setValue(n, {
            value: l(!0),
            items: u(m)
          }), d = l(!1);
        },
        items(m) {
          const {
            items: f
          } = m.detail;
          for (; a.length !== 0;) a.remove(0);
          for (const y of f) {
            const {
                displayValue: b,
                exportValue: v
              } = y,
              _ = document.createElement("option");
            o(_, b), _.value = v, a.append(_);
          }
          a.options.length > 0 && (a.options[0].selected = !0), t.setValue(n, {
            value: l(!0),
            items: u(m)
          }), d = l(!1);
        },
        indices(m) {
          const f = new Set(m.detail.indices);
          for (const y of m.target.options) y.selected = f.has(y.index);
          t.setValue(n, {
            value: l(!0)
          }), d = l(!1);
        },
        editable(m) {
          m.target.disabled = !m.detail.editable;
        }
      };
      this._dispatchEventFromSandbox(p, h);
    }), a.addEventListener("input", h => {
      var f;
      const p = l(!0),
        m = l(!1);
      t.setValue(n, {
        value: p
      }), h.preventDefault(), (f = this.linkService.eventBus) == null || f.dispatch("dispatcheventinsandbox", {
        source: this,
        detail: {
          id: n,
          name: "Keystroke",
          value: d,
          change: m,
          changeEx: p,
          willCommit: !1,
          commitKey: 1,
          keyDown: !1
        }
      });
    }), this._setEventListeners(a, null, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"], ["input", "Action"], ["input", "Validate"]], h => h.target.value)) : a.addEventListener("input", function (h) {
      t.setValue(n, {
        value: l(!0)
      });
    }), this.data.combo && this._setTextStyle(a), this._setBackgroundColor(a), this._setDefaultPropertiesFromJS(a), this.container.append(a), this.container;
  }
}

var s3e, h2t;

class u2t extends Cf {
  constructor(n) {
    const {
        data: r,
        elements: a,
        parent: i
      } = n,
      o = !!i._commentManager;
    super(n, {
      isRenderable: !o && Cf._hasPopupData(r)
    });
    qt(this, s3e);
    if (this.elements = a, o && Cf._hasPopupData(r)) {
      const s = this.popup = Gt(this, s3e, h2t).call(this);
      for (const l of a) l.popup = s;
    } else this.popup = null;
  }
  render() {
    const {
      container: n
    } = this;
    n.classList.add("popupAnnotation"), n.role = "comment";
    const r = this.popup = Gt(this, s3e, h2t).call(this),
      a = [];
    for (const i of this.elements) i.popup = r, i.container.ariaHasPopup = "dialog", a.push(i.data.id), i.addHighlightArea();
    return this.container.setAttribute("aria-controls", a.map(i => `${Ure}${i}`).join(",")), this.container;
  }
}

s3e = new WeakSet(), h2t = function () {
  return new eli({
    container: this.container,
    color: this.data.color,
    titleObj: this.data.titleObj,
    modificationDate: this.data.modificationDate || this.data.creationDate,
    contentsObj: this.data.contentsObj,
    richText: this.data.richText,
    rect: this.data.rect,
    parentRect: this.data.parentRect || null,
    parent: this.parent,
    elements: this.elements,
    open: this.data.open,
    commentManager: this.parent._commentManager
  });
};

var qA, DB, ZGe, eVe, _se, kse, Tg, l6, LB, Kq, Ase, Sse, c6, KA, hN, pN, Mg, mN, OB, l3e, fN, Ise, Qq, BB, lv, FB, $c, E7e, p2t, m2t, f2t, T7e, g2t, yor, bor, vor, wor, M7e, P7e, y2t;

class eli {
  constructor({
    container: t,
    color: n,
    elements: r,
    titleObj: a,
    modificationDate: i,
    contentsObj: o,
    richText: s,
    parent: l,
    rect: d,
    parentRect: u,
    open: h,
    commentManager: p = null
  }) {
    qt(this, $c);
    qt(this, qA, null);
    qt(this, DB, Gt(this, $c, vor).bind(this));
    qt(this, ZGe, Gt(this, $c, y2t).bind(this));
    qt(this, eVe, Gt(this, $c, P7e).bind(this));
    qt(this, _se, Gt(this, $c, M7e).bind(this));
    qt(this, kse, null);
    qt(this, Tg, null);
    qt(this, l6, null);
    qt(this, LB, null);
    qt(this, Kq, null);
    qt(this, Ase, null);
    qt(this, Sse, null);
    qt(this, c6, !1);
    qt(this, KA, null);
    qt(this, hN, null);
    qt(this, pN, null);
    qt(this, Mg, null);
    qt(this, mN, null);
    qt(this, OB, null);
    qt(this, l3e, null);
    qt(this, fN, null);
    qt(this, Ise, null);
    qt(this, Qq, null);
    qt(this, BB, !1);
    qt(this, lv, null);
    qt(this, FB, null);
    yt(this, Tg, t), yt(this, Ise, a), yt(this, l6, o), yt(this, fN, s), yt(this, Ase, l), yt(this, kse, n), yt(this, l3e, d), yt(this, Sse, u), yt(this, Kq, r), yt(this, qA, p), yt(this, lv, r[0]), yt(this, LB, lxt.toDateObject(i)), this.trigger = r.flatMap(m => m.getElementsToTriggerPopup()), p || (Gt(this, $c, E7e).call(this), te(this, Tg).hidden = !0, h && Gt(this, $c, M7e).call(this));
  }
  renderCommentButton() {
    if (te(this, Mg)) {
      te(this, Mg).parentNode || te(this, lv).container.after(te(this, Mg));
      return;
    }
    if (te(this, mN) || Gt(this, $c, p2t).call(this), !te(this, mN)) return;
    const {
        signal: t
      } = yt(this, hN, new AbortController()),
      n = te(this, lv).hasOwnCommentButton,
      r = () => {
        te(this, qA).toggleCommentPopup(this, !0, void 0, !n);
      },
      a = () => {
        te(this, qA).toggleCommentPopup(this, !1, !0, !n);
      },
      i = () => {
        te(this, qA).toggleCommentPopup(this, !1, !1);
      };
    if (n) {
      yt(this, Mg, te(this, lv).container);
      for (const o of this.trigger) o.ariaHasPopup = "dialog", o.ariaControls = "commentPopup", o.addEventListener("keydown", te(this, DB), {
        signal: t
      }), o.addEventListener("click", r, {
        signal: t
      }), o.addEventListener("pointerenter", a, {
        signal: t
      }), o.addEventListener("pointerleave", i, {
        signal: t
      }), o.classList.add("popupTriggerArea");
    } else {
      const o = yt(this, Mg, document.createElement("button"));
      o.className = "annotationCommentButton";
      const s = te(this, lv).container;
      o.style.zIndex = parseInt(s.style.zIndex, 10) + 1, o.tabIndex = 0, o.ariaHasPopup = "dialog", o.ariaControls = "commentPopup", o.setAttribute("data-l10n-id", "pdfjs-show-comment-button"), Gt(this, $c, f2t).call(this), Gt(this, $c, m2t).call(this), o.addEventListener("keydown", te(this, DB), {
        signal: t
      }), o.addEventListener("click", r, {
        signal: t
      }), o.addEventListener("pointerenter", a, {
        signal: t
      }), o.addEventListener("pointerleave", i, {
        signal: t
      }), s.after(o);
    }
  }
  get commentButtonColor() {
    const {
      color: t,
      opacity: n
    } = te(this, lv).commentData;
    return t ? te(this, Ase)._commentManager.makeCommentColor(t, n) : null;
  }
  focusCommentButton() {
    setTimeout(() => {
      var t;
      (t = te(this, Mg)) == null || t.focus();
    }, 0);
  }
  getData() {
    const {
      richText: t,
      color: n,
      opacity: r,
      creationDate: a,
      modificationDate: i
    } = te(this, lv).commentData;
    return {
      contentsObj: {
        str: this.comment
      },
      richText: t,
      color: n,
      opacity: r,
      creationDate: a,
      modificationDate: i
    };
  }
  get elementBeforePopup() {
    return te(this, Mg);
  }
  get comment() {
    return te(this, FB) || yt(this, FB, te(this, lv).commentText), te(this, FB);
  }
  set comment(t) {
    t !== this.comment && (te(this, lv).commentText = yt(this, FB, t));
  }
  focus() {
    var t;
    (t = te(this, lv).container) == null || t.focus();
  }
  get parentBoundingClientRect() {
    return te(this, lv).layer.getBoundingClientRect();
  }
  setCommentButtonStates({
    selected: t,
    hasPopup: n
  }) {
    te(this, Mg) && (te(this, Mg).classList.toggle("selected", t), te(this, Mg).ariaExpanded = n);
  }
  setSelectedCommentButton(t) {
    te(this, Mg).classList.toggle("selected", t);
  }
  get commentPopupPosition() {
    if (te(this, OB)) return te(this, OB);
    const {
        x: t,
        y: n,
        height: r
      } = te(this, Mg).getBoundingClientRect(),
      {
        x: a,
        y: i,
        width: o,
        height: s
      } = te(this, lv).layer.getBoundingClientRect();
    return [(t - a) / o, (n + r - i) / s];
  }
  set commentPopupPosition(t) {
    yt(this, OB, t);
  }
  hasDefaultPopupPosition() {
    return te(this, OB) === null;
  }
  get commentButtonPosition() {
    return te(this, mN);
  }
  get commentButtonWidth() {
    return te(this, Mg).getBoundingClientRect().width / this.parentBoundingClientRect.width;
  }
  editComment(t) {
    const [n, r] = te(this, OB) || this.commentButtonPosition.map(d => d / 100),
      a = this.parentBoundingClientRect,
      {
        x: i,
        y: o,
        width: s,
        height: l
      } = a;
    te(this, qA).showDialog(null, this, i + n * s, o + r * l, {
      ...t,
      parentDimensions: a
    });
  }
  render() {
    var r, a;
    if (te(this, KA)) return;
    const t = yt(this, KA, document.createElement("div"));
    if (t.className = "popup", te(this, kse)) {
      const i = t.style.outlineColor = fo.makeHexColor(...te(this, kse));
      t.style.backgroundColor = `color-mix(in srgb, ${i} 30%, white)`;
    }
    const n = document.createElement("span");
    if (n.className = "header", (r = te(this, Ise)) != null && r.str) {
      const i = document.createElement("span");
      i.className = "title", n.append(i), {
        dir: i.dir,
        str: i.textContent
      } = te(this, Ise);
    }
    if (t.append(n), te(this, LB)) {
      const i = document.createElement("time");
      i.className = "popupDate", i.setAttribute("data-l10n-id", "pdfjs-annotation-date-time-string"), i.setAttribute("data-l10n-args", JSON.stringify({
        dateObj: te(this, LB).valueOf()
      })), i.dateTime = te(this, LB).toISOString(), n.append(i);
    }
    Gar({
      html: te(this, $c, T7e) || te(this, l6).str,
      dir: (a = te(this, l6)) == null ? void 0 : a.dir,
      className: "popupContent"
    }, t), te(this, Tg).append(t);
  }
  updateEdited({
    rect: t,
    popup: n,
    deleted: r
  }) {
    var a;
    if (te(this, qA)) {
      r ? (this.remove(), yt(this, FB, null)) : n && (n.deleted ? this.remove() : (Gt(this, $c, f2t).call(this), yt(this, FB, n.text))), t && (yt(this, mN, null), Gt(this, $c, p2t).call(this), Gt(this, $c, m2t).call(this));
      return;
    }
    if (r || n != null && n.deleted) {
      this.remove();
      return;
    }
    Gt(this, $c, E7e).call(this), te(this, Qq) || yt(this, Qq, {
      contentsObj: te(this, l6),
      richText: te(this, fN)
    }), t && yt(this, pN, null), n && n.text && (yt(this, fN, Gt(this, $c, bor).call(this, n.text)), yt(this, LB, lxt.toDateObject(n.date)), yt(this, l6, null)), (a = te(this, KA)) == null || a.remove(), yt(this, KA, null);
  }
  resetEdited() {
    var t;
    te(this, Qq) && ({
      contentsObj: rm(this, l6)._,
      richText: rm(this, fN)._
    } = te(this, Qq), yt(this, Qq, null), (t = te(this, KA)) == null || t.remove(), yt(this, KA, null), yt(this, pN, null));
  }
  remove() {
    var t, n, r;
    if ((t = te(this, hN)) == null || t.abort(), yt(this, hN, null), (n = te(this, KA)) == null || n.remove(), yt(this, KA, null), yt(this, BB, !1), yt(this, c6, !1), (r = te(this, Mg)) == null || r.remove(), yt(this, Mg, null), this.trigger) for (const a of this.trigger) a.classList.remove("popupTriggerArea");
  }
  forceHide() {
    yt(this, BB, this.isVisible), te(this, BB) && (te(this, Tg).hidden = !0);
  }
  maybeShow() {
    te(this, qA) || (Gt(this, $c, E7e).call(this), te(this, BB) && (te(this, KA) || Gt(this, $c, P7e).call(this), yt(this, BB, !1), te(this, Tg).hidden = !1));
  }
  get isVisible() {
    return !te(this, qA) && te(this, Tg).hidden === !1;
  }
}

qA = new WeakMap(), DB = new WeakMap(), ZGe = new WeakMap(), eVe = new WeakMap(), _se = new WeakMap(), kse = new WeakMap(), Tg = new WeakMap(), l6 = new WeakMap(), LB = new WeakMap(), Kq = new WeakMap(), Ase = new WeakMap(), Sse = new WeakMap(), c6 = new WeakMap(), KA = new WeakMap(), hN = new WeakMap(), pN = new WeakMap(), Mg = new WeakMap(), mN = new WeakMap(), OB = new WeakMap(), l3e = new WeakMap(), fN = new WeakMap(), Ise = new WeakMap(), Qq = new WeakMap(), BB = new WeakMap(), lv = new WeakMap(), FB = new WeakMap(), $c = new WeakSet(), E7e = function () {
  var n;
  if (te(this, hN)) return;
  yt(this, hN, new AbortController());
  const {
    signal: t
  } = te(this, hN);
  for (const r of this.trigger) r.addEventListener("click", te(this, _se), {
    signal: t
  }), r.addEventListener("pointerenter", te(this, eVe), {
    signal: t
  }), r.addEventListener("pointerleave", te(this, ZGe), {
    signal: t
  }), r.classList.add("popupTriggerArea");
  for (const r of te(this, Kq)) (n = r.container) == null || n.addEventListener("keydown", te(this, DB), {
    signal: t
  });
}, p2t = function () {
  const t = te(this, Kq).find(n => n.hasCommentButton);
  t && yt(this, mN, t._normalizePoint(t.commentButtonPosition));
}, m2t = function () {
  if (te(this, lv).extraPopupElement && !te(this, lv).editor) return;
  te(this, Mg) || this.renderCommentButton();
  const [t, n] = te(this, mN),
    {
      style: r
    } = te(this, Mg);
  r.left = `calc(${t}%)`, r.top = `calc(${n}% - var(--comment-button-dim))`;
}, f2t = function () {
  te(this, lv).extraPopupElement || (te(this, Mg) || this.renderCommentButton(), te(this, Mg).style.backgroundColor = this.commentButtonColor || "");
}, T7e = function () {
  const t = te(this, fN),
    n = te(this, l6);
  return t != null && t.str && (!(n != null && n.str) || n.str === t.str) && te(this, fN).html || null;
}, g2t = function () {
  var t, n, r;
  return ((r = (n = (t = te(this, $c, T7e)) == null ? void 0 : t.attributes) == null ? void 0 : n.style) == null ? void 0 : r.fontSize) || 0;
}, yor = function () {
  var t, n, r;
  return ((r = (n = (t = te(this, $c, T7e)) == null ? void 0 : t.attributes) == null ? void 0 : n.style) == null ? void 0 : r.color) || null;
}, bor = function (t) {
  const n = [],
    r = {
      str: t,
      html: {
        name: "div",
        attributes: {
          dir: "auto"
        },
        children: [{
          name: "p",
          children: n
        }]
      }
    },
    a = {
      style: {
        color: te(this, $c, yor),
        fontSize: te(this, $c, g2t) ? `calc(${te(this, $c, g2t)}px * var(--total-scale-factor))` : ""
      }
    };
  for (const i of t.split(`
`)) n.push({
    name: "span",
    value: i,
    attributes: a
  });
  return r;
}, vor = function (t) {
  t.altKey || t.shiftKey || t.ctrlKey || t.metaKey || (t.key === "Enter" || t.key === "Escape" && te(this, c6)) && Gt(this, $c, M7e).call(this);
}, wor = function () {
  if (te(this, pN) !== null) return;
  const {
    page: {
      view: t
    },
    viewport: {
      rawDims: {
        pageWidth: n,
        pageHeight: r,
        pageX: a,
        pageY: i
      }
    }
  } = te(this, Ase);
  let o = !!te(this, Sse),
    s = o ? te(this, Sse) : te(this, l3e);
  for (const f of te(this, Kq)) if (!s || fo.intersect(f.data.rect, s) !== null) {
    s = f.data.rect, o = !0;
    break;
  }
  const l = fo.normalizeRect([s[0], t[3] - s[1] + t[1], s[2], t[3] - s[3] + t[1]]),
    u = o ? s[2] - s[0] + 5 : 0,
    h = l[0] + u,
    p = l[1];
  yt(this, pN, [100 * (h - a) / n, 100 * (p - i) / r]);
  const {
    style: m
  } = te(this, Tg);
  m.left = `${te(this, pN)[0]}%`, m.top = `${te(this, pN)[1]}%`;
}, M7e = function () {
  if (te(this, qA)) {
    te(this, qA).toggleCommentPopup(this, !1);
    return;
  }
  yt(this, c6, !te(this, c6)), te(this, c6) ? (Gt(this, $c, P7e).call(this), te(this, Tg).addEventListener("click", te(this, _se)), te(this, Tg).addEventListener("keydown", te(this, DB))) : (Gt(this, $c, y2t).call(this), te(this, Tg).removeEventListener("click", te(this, _se)), te(this, Tg).removeEventListener("keydown", te(this, DB)));
}, P7e = function () {
  te(this, KA) || this.render(), this.isVisible ? te(this, c6) && te(this, Tg).classList.add("focused") : (Gt(this, $c, wor).call(this), te(this, Tg).hidden = !1, te(this, Tg).style.zIndex = parseInt(te(this, Tg).style.zIndex, 10) + 1e3);
}, y2t = function () {
  te(this, Tg).classList.remove("focused"), !(te(this, c6) || !this.isVisible) && (te(this, Tg).hidden = !0, te(this, Tg).style.zIndex = parseInt(te(this, Tg).style.zIndex, 10) - 1e3);
};

class xor extends Cf {
  constructor(t) {
    super(t, {
      isRenderable: !0,
      ignoreBorder: !0
    }), this.textContent = t.data.textContent, this.textPosition = t.data.textPosition, this.annotationEditorType = nc.FREETEXT;
  }
  render() {
    if (this.container.classList.add("freeTextAnnotation"), this.textContent) {
      const t = this.contentElement = document.createElement("div");
      t.classList.add("annotationTextContent"), t.setAttribute("role", "comment");
      for (const n of this.textContent) {
        const r = document.createElement("span");
        r.textContent = n, t.append(r);
      }
      this.container.append(t);
    }
    return !this.data.popupRef && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this._editOnDoubleClick(), this.container;
  }
}

var c3e;

class tli extends Cf {
  constructor(n) {
    super(n, {
      isRenderable: !0,
      ignoreBorder: !0
    });
    qt(this, c3e, null);
  }
  render() {
    this.container.classList.add("lineAnnotation");
    const {
        data: n,
        width: r,
        height: a
      } = this,
      i = this.svgFactory.create(r, a, !0),
      o = yt(this, c3e, this.svgFactory.createElement("svg:line"));
    return o.setAttribute("x1", n.rect[2] - n.lineCoordinates[0]), o.setAttribute("y1", n.rect[3] - n.lineCoordinates[1]), o.setAttribute("x2", n.rect[2] - n.lineCoordinates[2]), o.setAttribute("y2", n.rect[3] - n.lineCoordinates[3]), o.setAttribute("stroke-width", n.borderStyle.width || 1), o.setAttribute("stroke", "transparent"), o.setAttribute("fill", "transparent"), i.append(o), this.container.append(i), !n.popupRef && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container;
  }
  getElementsToTriggerPopup() {
    return te(this, c3e);
  }
  addHighlightArea() {
    this.container.classList.add("highlightArea");
  }
}

c3e = new WeakMap();

var d3e;

class nli extends Cf {
  constructor(n) {
    super(n, {
      isRenderable: !0,
      ignoreBorder: !0
    });
    qt(this, d3e, null);
  }
  render() {
    this.container.classList.add("squareAnnotation");
    const {
        data: n,
        width: r,
        height: a
      } = this,
      i = this.svgFactory.create(r, a, !0),
      o = n.borderStyle.width,
      s = yt(this, d3e, this.svgFactory.createElement("svg:rect"));
    return s.setAttribute("x", o / 2), s.setAttribute("y", o / 2), s.setAttribute("width", r - o), s.setAttribute("height", a - o), s.setAttribute("stroke-width", o || 1), s.setAttribute("stroke", "transparent"), s.setAttribute("fill", "transparent"), i.append(s), this.container.append(i), !n.popupRef && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container;
  }
  getElementsToTriggerPopup() {
    return te(this, d3e);
  }
  addHighlightArea() {
    this.container.classList.add("highlightArea");
  }
}

d3e = new WeakMap();

var u3e;

class rli extends Cf {
  constructor(n) {
    super(n, {
      isRenderable: !0,
      ignoreBorder: !0
    });
    qt(this, u3e, null);
  }
  render() {
    this.container.classList.add("circleAnnotation");
    const {
        data: n,
        width: r,
        height: a
      } = this,
      i = this.svgFactory.create(r, a, !0),
      o = n.borderStyle.width,
      s = yt(this, u3e, this.svgFactory.createElement("svg:ellipse"));
    return s.setAttribute("cx", r / 2), s.setAttribute("cy", a / 2), s.setAttribute("rx", r / 2 - o / 2), s.setAttribute("ry", a / 2 - o / 2), s.setAttribute("stroke-width", o || 1), s.setAttribute("stroke", "transparent"), s.setAttribute("fill", "transparent"), i.append(s), this.container.append(i), !n.popupRef && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container;
  }
  getElementsToTriggerPopup() {
    return te(this, u3e);
  }
  addHighlightArea() {
    this.container.classList.add("highlightArea");
  }
}

u3e = new WeakMap();

var h3e;

class _or extends Cf {
  constructor(n) {
    super(n, {
      isRenderable: !0,
      ignoreBorder: !0
    });
    qt(this, h3e, null);
    this.containerClassName = "polylineAnnotation", this.svgElementName = "svg:polyline";
  }
  render() {
    this.container.classList.add(this.containerClassName);
    const {
      data: {
        rect: n,
        vertices: r,
        borderStyle: a,
        popupRef: i
      },
      width: o,
      height: s
    } = this;
    if (!r) return this.container;
    const l = this.svgFactory.create(o, s, !0);
    let d = [];
    for (let h = 0, p = r.length; h < p; h += 2) {
      const m = r[h] - n[0],
        f = n[3] - r[h + 1];
      d.push(`${m},${f}`);
    }
    d = d.join(" ");
    const u = yt(this, h3e, this.svgFactory.createElement(this.svgElementName));
    return u.setAttribute("points", d), u.setAttribute("stroke-width", a.width || 1), u.setAttribute("stroke", "transparent"), u.setAttribute("fill", "transparent"), l.append(u), this.container.append(l), !i && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container;
  }
  getElementsToTriggerPopup() {
    return te(this, h3e);
  }
  addHighlightArea() {
    this.container.classList.add("highlightArea");
  }
}

h3e = new WeakMap();

class ali extends _or {
  constructor(t) {
    super(t), this.containerClassName = "polygonAnnotation", this.svgElementName = "svg:polygon";
  }
}

class ili extends Cf {
  constructor(t) {
    super(t, {
      isRenderable: !0,
      ignoreBorder: !0
    });
  }
  render() {
    return this.container.classList.add("caretAnnotation"), !this.data.popupRef && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container;
  }
}

var p3e, Yq, m3e, b2t;

class uBt extends Cf {
  constructor(n) {
    super(n, {
      isRenderable: !0,
      ignoreBorder: !0
    });
    qt(this, m3e);
    qt(this, p3e, null);
    qt(this, Yq, []);
    this.containerClassName = "inkAnnotation", this.svgElementName = "svg:polyline", this.annotationEditorType = this.data.it === "InkHighlight" ? nc.HIGHLIGHT : nc.INK;
  }
  render() {
    this.container.classList.add(this.containerClassName);
    const {
        data: {
          rect: n,
          rotation: r,
          inkLists: a,
          borderStyle: i,
          popupRef: o
        }
      } = this,
      {
        transform: s,
        width: l,
        height: d
      } = Gt(this, m3e, b2t).call(this, r, n),
      u = this.svgFactory.create(l, d, !0),
      h = yt(this, p3e, this.svgFactory.createElement("svg:g"));
    u.append(h), h.setAttribute("stroke-width", i.width || 1), h.setAttribute("stroke-linecap", "round"), h.setAttribute("stroke-linejoin", "round"), h.setAttribute("stroke-miterlimit", 10), h.setAttribute("stroke", "transparent"), h.setAttribute("fill", "transparent"), h.setAttribute("transform", s);
    for (const p of a) {
      const m = this.svgFactory.createElement(this.svgElementName);
      te(this, Yq).push(m), m.setAttribute("points", p.join(",")), h.append(m);
    }
    return !o && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container.append(u), this._editOnDoubleClick(), this.container;
  }
  updateEdited(n) {
    super.updateEdited(n);
    const {
        thickness: r,
        points: a,
        rect: i
      } = n,
      o = te(this, p3e);
    if (r >= 0 && o.setAttribute("stroke-width", r || 1), a) for (let s = 0, l = te(this, Yq).length; s < l; s++) te(this, Yq)[s].setAttribute("points", a[s].join(","));
    if (i) {
      const {
        transform: s,
        width: l,
        height: d
      } = Gt(this, m3e, b2t).call(this, this.data.rotation, i);
      o.parentElement.setAttribute("viewBox", `0 0 ${l} ${d}`), o.setAttribute("transform", s);
    }
  }
  getElementsToTriggerPopup() {
    return te(this, Yq);
  }
  addHighlightArea() {
    this.container.classList.add("highlightArea");
  }
}

p3e = new WeakMap(), Yq = new WeakMap(), m3e = new WeakSet(), b2t = function (n, r) {
  switch (n) {
    case 90:
      return {
        transform: `rotate(90) translate(${-r[0]},${r[1]}) scale(1,-1)`,
        width: r[3] - r[1],
        height: r[2] - r[0]
      };
    case 180:
      return {
        transform: `rotate(180) translate(${-r[2]},${r[1]}) scale(1,-1)`,
        width: r[2] - r[0],
        height: r[3] - r[1]
      };
    case 270:
      return {
        transform: `rotate(270) translate(${-r[2]},${r[3]}) scale(1,-1)`,
        width: r[3] - r[1],
        height: r[2] - r[0]
      };
    default:
      return {
        transform: `translate(${-r[0]},${r[3]}) scale(1,-1)`,
        width: r[2] - r[0],
        height: r[3] - r[1]
      };
  }
};

class kor extends Cf {
  constructor(t) {
    super(t, {
      isRenderable: !0,
      ignoreBorder: !0,
      createQuadrilaterals: !0
    }), this.annotationEditorType = nc.HIGHLIGHT;
  }
  render() {
    const {
      data: {
        overlaidText: t,
        popupRef: n
      }
    } = this;
    if (!n && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container.classList.add("highlightAnnotation"), this._editOnDoubleClick(), t) {
      const r = document.createElement("mark");
      r.classList.add("overlaidText"), r.textContent = t, this.container.append(r);
    }
    return this.container;
  }
}

class oli extends Cf {
  constructor(t) {
    super(t, {
      isRenderable: !0,
      ignoreBorder: !0,
      createQuadrilaterals: !0
    });
  }
  render() {
    const {
      data: {
        overlaidText: t,
        popupRef: n
      }
    } = this;
    if (!n && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container.classList.add("underlineAnnotation"), t) {
      const r = document.createElement("u");
      r.classList.add("overlaidText"), r.textContent = t, this.container.append(r);
    }
    return this.container;
  }
}

class sli extends Cf {
  constructor(t) {
    super(t, {
      isRenderable: !0,
      ignoreBorder: !0,
      createQuadrilaterals: !0
    });
  }
  render() {
    const {
      data: {
        overlaidText: t,
        popupRef: n
      }
    } = this;
    if (!n && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container.classList.add("squigglyAnnotation"), t) {
      const r = document.createElement("u");
      r.classList.add("overlaidText"), r.textContent = t, this.container.append(r);
    }
    return this.container;
  }
}

class lli extends Cf {
  constructor(t) {
    super(t, {
      isRenderable: !0,
      ignoreBorder: !0,
      createQuadrilaterals: !0
    });
  }
  render() {
    const {
      data: {
        overlaidText: t,
        popupRef: n
      }
    } = this;
    if (!n && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container.classList.add("strikeoutAnnotation"), t) {
      const r = document.createElement("s");
      r.classList.add("overlaidText"), r.textContent = t, this.container.append(r);
    }
    return this.container;
  }
}

class Aor extends Cf {
  constructor(t) {
    super(t, {
      isRenderable: !0,
      ignoreBorder: !0
    }), this.annotationEditorType = nc.STAMP;
  }
  render() {
    return this.container.classList.add("stampAnnotation"), this.container.setAttribute("role", "img"), !this.data.popupRef && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this._editOnDoubleClick(), this.container;
  }
}

var f3e, g3e, v2t;

class cli extends Cf {
  constructor(n) {
    var i;
    super(n, {
      isRenderable: !0
    });
    qt(this, g3e);
    qt(this, f3e, null);
    const {
      fileId: r,
      file: a
    } = this.data;
    this.filename = a.filename, this.content = a.content, this.fileId = r, (i = this.linkService.eventBus) == null || i.dispatch("fileattachmentannotation", {
      source: this,
      attachmentId: this.fileId,
      ...a
    });
  }
  render() {
    this.container.classList.add("fileAttachmentAnnotation");
    const {
      container: n,
      data: r
    } = this;
    let a;
    r.hasAppearance || r.fillAlpha === 0 ? a = document.createElement("div") : (a = document.createElement("img"), a.src = `${this.imageResourcesPath}annotation-${/paperclip/i.test(r.name) ? "paperclip" : "pushpin"}.svg`, r.fillAlpha && r.fillAlpha < 1 && (a.style = `filter: opacity(${Math.round(r.fillAlpha * 100)}%);`)), a.addEventListener("dblclick", Gt(this, g3e, v2t).bind(this)), yt(this, f3e, a);
    const {
      isMac: i
    } = gp.platform;
    return n.addEventListener("keydown", o => {
      o.key === "Enter" && (i ? o.metaKey : o.ctrlKey) && Gt(this, g3e, v2t).call(this);
    }), !r.popupRef && this.hasPopupData ? (this.hasOwnCommentButton = !0, this._createPopup()) : a.classList.add("popupTriggerArea"), n.append(a), n;
  }
  getElementsToTriggerPopup() {
    return te(this, f3e);
  }
  addHighlightArea() {
    this.container.classList.add("highlightArea");
  }
}

f3e = new WeakMap(), g3e = new WeakSet(), v2t = async function () {
  var o;
  const {
      fileId: n,
      filename: r,
      content: a
    } = this,
    i = (await this.linkService.getAttachmentContent(n)) || a;
  i && ((o = this.downloadManager) == null || o.openOrDownloadData(i, r));
};

var Cse, Xq, gN, YJ, Ior, w2t;

class Sor extends Cf {
  constructor(n) {
    super(n, {
      isRenderable: !!n.data.richMedia
    });
    qt(this, YJ);
    qt(this, Cse, new AbortController());
    qt(this, Xq, null);
    qt(this, gN, null);
  }
  render() {
    this.container.classList.add("mediaAnnotation");
    const {
        filename: n
      } = this.data.richMedia,
      r = document.createElement("button");
    return r.className = "mediaPlayButton", r.type = "button", r.title = r.ariaLabel = n, r.addEventListener("click", () => Gt(this, YJ, Ior).call(this, r), {
      signal: te(this, Cse).signal
    }), this.container.append(r), this.container;
  }
  destroy() {
    te(this, Cse).abort(), te(this, gN) && (te(this, gN).pause(), te(this, gN).removeAttribute("src"), te(this, gN).load(), yt(this, gN, null)), Gt(this, YJ, w2t).call(this);
  }
}

Cse = new WeakMap(), Xq = new WeakMap(), gN = new WeakMap(), YJ = new WeakSet(), Ior = async function (n) {
  const {
    fileId: r,
    filename: a,
    contentType: i
  } = this.data.richMedia;
  n.disabled = !0;
  let o;
  try {
    o = await this.linkService.getAttachmentContent(r);
  } catch {
    return;
  } finally {
    n.disabled = !1;
  }
  if (!o || !n.isConnected) return;
  const {
      signal: s
    } = te(this, Cse),
    l = URL.createObjectURL(new Blob([o], {
      type: i
    }));
  yt(this, Xq, l);
  const d = i.startsWith("audio/"),
    u = document.createElement(d ? "audio" : "video");
  if (yt(this, gN, u), u.className = "mediaContent", this._setBackgroundColor(u), u.src = l, u.title = a, u.controls = !0, u.autoplay = !0, u.tabIndex = 0, d) {
    let h = !1,
      p = !1;
    const m = () => {
      u.controls = h || p;
    };
    this.container.addEventListener("pointerenter", () => {
      h = !0, m();
    }, {
      signal: s
    }), this.container.addEventListener("pointerleave", () => {
      h = !1, m();
    }, {
      signal: s
    }), this.container.addEventListener("focusin", () => {
      p = !0, m();
    }, {
      signal: s
    }), this.container.addEventListener("focusout", () => {
      p = !1, m();
    }, {
      signal: s
    });
  }
  u.addEventListener("emptied", () => Gt(this, YJ, w2t).call(this, l), {
    once: !0,
    signal: s
  }), n.replaceWith(u), u.play().catch(() => {});
}, w2t = function (n = te(this, Xq)) {
  n && n === te(this, Xq) && (URL.revokeObjectURL(n), yt(this, Xq, null));
};

var zB, Jq, Ese, yN, Tse, Zq, Ow, y3e, gP, R7e, N7e, Mse;

let dli = (Mse = class {
  constructor({
    div: t,
    accessibilityManager: n,
    annotationCanvasMap: r,
    annotationEditorUIManager: a,
    page: i,
    viewport: o,
    structTreeLayer: s,
    commentManager: l,
    linkService: d,
    annotationStorage: u
  }) {
    qt(this, gP);
    qt(this, zB, null);
    qt(this, Jq, null);
    qt(this, Ese, null);
    qt(this, yN, new Map());
    qt(this, Tse, null);
    qt(this, Zq, null);
    qt(this, Ow, []);
    qt(this, y3e, !1);
    On(this, "zIndex", 0);
    this.div = t, yt(this, zB, n), yt(this, Jq, r), yt(this, Tse, s || null), yt(this, Zq, d || null), yt(this, Ese, u || new lBt()), this.page = i, this.viewport = o, this._annotationEditorUIManager = a, this._commentManager = l || null;
  }
  hasEditableAnnotations() {
    return te(this, yN).size > 0;
  }
  async render(t) {
    var l;
    const {
        annotations: n,
        optionalContentConfig: r
      } = t,
      a = this.div;
    IJ(a, this.viewport);
    const i = new Map(),
      o = [],
      s = {
        data: null,
        layer: a,
        linkService: te(this, Zq),
        downloadManager: t.downloadManager,
        imageResourcesPath: t.imageResourcesPath || "",
        renderForms: t.renderForms !== !1,
        svgFactory: new iUe(),
        annotationStorage: te(this, Ese),
        enableComment: t.enableComment === !0,
        enableScripting: t.enableScripting === !0,
        hasJSActions: t.hasJSActions,
        fieldObjects: t.fieldObjects,
        parent: this,
        elements: null
      };
    for (const d of n) {
      if (d.noHTML) continue;
      const u = d.annotationType === Wf.POPUP;
      if (u) {
        const m = i.get(d.id);
        if (!m) continue;
        if (!this._commentManager) {
          o.push(d);
          continue;
        }
        s.elements = m;
      } else if (d.rect[2] === d.rect[0] || d.rect[3] === d.rect[1]) continue;
      s.data = d;
      const h = dot.create(s);
      if (!h.isRenderable) continue;
      u || (te(this, Ow).push(h), d.popupRef && i.getOrInsertComputed(d.popupRef, kpe).push(h));
      const p = h.render();
      d.hidden && (p.style.visibility = "hidden"), h.updateOC(r), h._isEditable && (te(this, yN).set(h.data.id, h), (l = this._annotationEditorUIManager) == null || l.renderAnnotationElement(h));
    }
    await Gt(this, gP, R7e).call(this);
    for (const d of o) {
      const u = s.elements = i.get(d.id);
      s.data = d;
      const h = dot.create(s);
      if (!h.isRenderable) continue;
      const p = h.render();
      h.contentElement.id = `${Ure}${d.id}`, d.hidden && (p.style.visibility = "hidden"), u.at(-1).container.after(p);
    }
    Gt(this, gP, N7e).call(this);
  }
  async addLinkAnnotations(t) {
    const n = {
      data: null,
      layer: this.div,
      linkService: te(this, Zq),
      svgFactory: new iUe(),
      parent: this
    };
    for (const r of t) {
      r.borderStyle || (r.borderStyle = Mse._defaultBorderStyle), n.data = r;
      const a = dot.create(n);
      a.isRenderable && (a.render(), a.contentElement.id = `${Ure}${r.id}`, te(this, Ow).push(a));
    }
    await Gt(this, gP, R7e).call(this);
  }
  update({
    viewport: t,
    optionalContentConfig: n
  }) {
    const r = this.div;
    this.viewport = t, IJ(r, {
      rotation: t.rotation
    });
    for (const a of te(this, Ow)) a.updateOC(n);
    Gt(this, gP, N7e).call(this), r.hidden = !1;
  }
  destroy() {
    var t, n;
    for (const r of te(this, Ow)) (t = r.destroy) == null || t.call(r), (n = te(this, zB)) == null || n.removePointerInTextLayer(r.contentElement);
    te(this, Ow).length = 0, te(this, yN).clear(), this.div.replaceChildren();
  }
  refreshCanvases() {
    Gt(this, gP, N7e).call(this);
  }
  getEditableAnnotations() {
    return te(this, yN).values();
  }
  getEditableAnnotation(t) {
    return te(this, yN).get(t);
  }
  addFakeAnnotation(t) {
    const {
        div: n
      } = this,
      {
        id: r,
        rotation: a
      } = t,
      i = new Wsi({
        data: {
          id: r,
          rect: t.getPDFRect(),
          rotation: a
        },
        editor: t,
        layer: n,
        parent: this,
        enableComment: !!this._commentManager,
        linkService: te(this, Zq),
        annotationStorage: te(this, Ese)
      });
    return i.render(), i.contentElement.id = `${Ure}${r}`, i.createOrUpdatePopup(), te(this, Ow).push(i), i;
  }
  removeAnnotation(t) {
    var a;
    const n = te(this, Ow).findIndex(i => i.data.id === t);
    if (n < 0) return;
    const [r] = te(this, Ow).splice(n, 1);
    (a = te(this, zB)) == null || a.removePointerInTextLayer(r.contentElement);
  }
  updateFakeAnnotations(t) {
    if (t.length !== 0) {
      for (const n of t) n.updateFakeAnnotationElement(this);
      Gt(this, gP, R7e).call(this);
    }
  }
  togglePointerEvents(t = !1) {
    this.div.classList.toggle("disabled", !t);
  }
  static get _defaultBorderStyle() {
    return Ws(this, "_defaultBorderStyle", Object.freeze({
      width: 1,
      rawWidth: 1,
      style: Pne.SOLID,
      dashArray: [3],
      horizontalCornerRadius: 0,
      verticalCornerRadius: 0
    }));
  }
}, zB = new WeakMap(), Jq = new WeakMap(), Ese = new WeakMap(), yN = new WeakMap(), Tse = new WeakMap(), Zq = new WeakMap(), Ow = new WeakMap(), y3e = new WeakMap(), gP = new WeakSet(), R7e = async function () {
  var r, a, i, o;
  if (te(this, Ow).length === 0) return;
  this.div.replaceChildren();
  const t = [];
  if (!te(this, y3e)) {
    yt(this, y3e, !0);
    for (const {
      contentElement: s,
      data: {
        hidden: l,
        id: d,
        oc: u
      }
    } of te(this, Ow)) {
      const h = s.id = `${Ure}${d}`,
        p = s.localName === "a" && !l && !u;
      t.push((r = te(this, Tse)) == null ? void 0 : r.getAriaAttributes(h, {
        enableLinkOwnership: p
      }).then(m => {
        if (m) for (const [f, y] of m) s.setAttribute(f, y);
      }));
    }
  }
  te(this, Ow).sort(({
    data: {
      rect: [s, l, d, u]
    }
  }, {
    data: {
      rect: [h, p, m, f]
    }
  }) => {
    if (s === d && l === u) return 1;
    if (h === m && p === f) return -1;
    const y = u,
      b = l,
      v = (l + u) / 2,
      _ = f,
      w = p,
      k = (p + f) / 2;
    if (v >= _ && k <= b) return -1;
    if (k >= y && v <= w) return 1;
    const A = (s + d) / 2,
      S = (h + m) / 2;
    return A - S;
  });
  const n = document.createDocumentFragment();
  for (const s of te(this, Ow)) n.append(s.container), this._commentManager ? (i = ((a = s.extraPopupElement) == null ? void 0 : a.popup) || s.popup) == null || i.renderCommentButton() : s.extraPopupElement && n.append(s.extraPopupElement.render());
  if (this.div.append(n), await Promise.all(t), te(this, zB)) {
    const s = await ((o = te(this, Tse)) == null ? void 0 : o.getAnnotationIds());
    for (const {
      contentElement: l
    } of te(this, Ow)) s != null && s.has(l.id) || te(this, zB).addPointerInTextLayer(l, !1);
  }
}, N7e = function () {
  var n;
  if (!te(this, Jq)) return;
  const t = this.div;
  for (const [r, a] of te(this, Jq)) {
    const i = t.querySelector(`[data-annotation-id="${r}"]`);
    if (!i) continue;
    if (Array.isArray(a)) for (const u of a) u.className = "annotationContent", u.ariaHidden = !0;else a.className = "annotationContent", a.ariaHidden = !0;
    const o = [];
    for (const u of i.children) u.nodeName === "CANVAS" && o.push(u);
    for (const u of o) u.remove();
    const s = Array.isArray(a) ? a[0] : a,
      {
        firstChild: l
      } = i;
    if (l ? l.classList.contains("annotationContent") ? l.after(s) : l.before(s) : i.append(s), Array.isArray(a)) {
      let u = s;
      for (let h = 1, p = a.length; h < p; h++) u.after(a[h]), u = a[h];
    }
    te(this, Jq).delete(r);
    const d = te(this, yN).get(r);
    d && (d._hasNoCanvas ? ((n = this._annotationEditorUIManager) == null || n.setMissingCanvas(r, i.id, a), d._hasNoCanvas = !1) : d.canvas = a);
  }
}, Mse);

const aMe = /\r\n?|\n/g;

var QA, b3e, eK, YA, Py, Cor, Eor, Tor, j7e, bj, D7e, L7e, Mor, _2t, Por;

const Em = class Em extends _p {
  constructor(n) {
    super({
      ...n,
      name: "freeTextEditor"
    });
    qt(this, Py);
    qt(this, QA, "");
    qt(this, b3e, `${this.id}-editor`);
    qt(this, eK, null);
    qt(this, YA);
    On(this, "_colorPicker", null);
    this.color = n.color || Em._defaultColor || _p._defaultLineColor, yt(this, YA, n.fontSize || Em._defaultFontSize), this.annotationElementId || this._uiManager.a11yAlert(_p._l10nAlert.freetext), this.canAddComment = !1;
  }
  static get _keyboardManager() {
    const n = Em.prototype,
      r = o => o.isEmpty(),
      a = Tke.TRANSLATE_SMALL,
      i = Tke.TRANSLATE_BIG;
    return Ws(this, "_keyboardManager", new CJ([[["ctrl+s", "mac+meta+s", "ctrl+p", "mac+meta+p"], n.commitOrRemove, {
      bubbles: !0
    }], [["ctrl+Enter", "mac+meta+Enter"], n.commitOrRemove], [["Escape"], n.commitOrRemove], [["ArrowLeft"], n._translateEmpty, {
      args: [-a, 0],
      checker: r
    }], [["ctrl+ArrowLeft", "mac+shift+ArrowLeft"], n._translateEmpty, {
      args: [-i, 0],
      checker: r
    }], [["ArrowRight"], n._translateEmpty, {
      args: [a, 0],
      checker: r
    }], [["ctrl+ArrowRight", "mac+shift+ArrowRight"], n._translateEmpty, {
      args: [i, 0],
      checker: r
    }], [["ArrowUp"], n._translateEmpty, {
      args: [0, -a],
      checker: r
    }], [["ctrl+ArrowUp", "mac+shift+ArrowUp"], n._translateEmpty, {
      args: [0, -i],
      checker: r
    }], [["ArrowDown"], n._translateEmpty, {
      args: [0, a],
      checker: r
    }], [["ctrl+ArrowDown", "mac+shift+ArrowDown"], n._translateEmpty, {
      args: [0, i],
      checker: r
    }]]));
  }
  static initialize(n, r) {
    _p.initialize(n, r);
    const a = getComputedStyle(document.documentElement);
    this._internalPadding = parseFloat(a.getPropertyValue("--freetext-padding"));
  }
  static updateDefaultParams(n, r) {
    switch (n) {
      case Td.FREETEXT_SIZE:
        Em._defaultFontSize = r;
        break;
      case Td.FREETEXT_COLOR:
        Em._defaultColor = r;
        break;
    }
  }
  updateParams(n, r) {
    switch (n) {
      case Td.FREETEXT_SIZE:
        Gt(this, Py, Cor).call(this, r);
        break;
      case Td.FREETEXT_COLOR:
        Gt(this, Py, Eor).call(this, r);
        break;
    }
  }
  static get defaultPropertiesToUpdate() {
    return [[Td.FREETEXT_SIZE, Em._defaultFontSize], [Td.FREETEXT_COLOR, Em._defaultColor || _p._defaultLineColor]];
  }
  get propertiesToUpdate() {
    return [[Td.FREETEXT_SIZE, te(this, YA)], [Td.FREETEXT_COLOR, this.color]];
  }
  get toolbarButtons() {
    return this._colorPicker || (this._colorPicker = new aUe(this)), [["colorPicker", this._colorPicker]];
  }
  get colorType() {
    return Td.FREETEXT_COLOR;
  }
  onUpdatedColor() {
    var n;
    this.editorDiv.style.color = this.color, (n = this._colorPicker) == null || n.update(this.color), super.onUpdatedColor();
  }
  _translateEmpty(n, r) {
    this._uiManager.translateSelectedEditors(n, r, !0);
  }
  getInitialTranslation() {
    const n = this.parentScale;
    return [-Em._internalPadding * n, -(Em._internalPadding + te(this, YA)) * n];
  }
  rebuild() {
    this.parent && (super.rebuild(), this.div !== null && (this.isAttachedToDOM || this.parent.add(this)));
  }
  enableEditMode() {
    if (!super.enableEditMode()) return !1;
    this.overlayDiv.classList.remove("enabled"), this.editorDiv.contentEditable = !0, this._isDraggable = !1, this.div.removeAttribute("aria-activedescendant"), yt(this, eK, new AbortController());
    const n = this._uiManager.combinedSignal(te(this, eK));
    return this.editorDiv.addEventListener("keydown", this.editorDivKeydown.bind(this), {
      signal: n
    }), this.editorDiv.addEventListener("focus", this.editorDivFocus.bind(this), {
      signal: n
    }), this.editorDiv.addEventListener("blur", this.editorDivBlur.bind(this), {
      signal: n
    }), this.editorDiv.addEventListener("input", this.editorDivInput.bind(this), {
      signal: n
    }), this.editorDiv.addEventListener("paste", this.editorDivPaste.bind(this), {
      signal: n
    }), !0;
  }
  disableEditMode() {
    var n;
    return super.disableEditMode() ? (this.overlayDiv.classList.add("enabled"), this.editorDiv.contentEditable = !1, this.div.setAttribute("aria-activedescendant", te(this, b3e)), this._isDraggable = !0, (n = te(this, eK)) == null || n.abort(), yt(this, eK, null), this.div.focus({
      preventScroll: !0
    }), this.isEditing = !1, this.parent.div.classList.add("freetextEditing"), !0) : !1;
  }
  focusin(n) {
    this._focusEventsAllowed && (super.focusin(n), n.target !== this.editorDiv && this.editorDiv.focus());
  }
  onceAdded(n) {
    var r;
    this.width || (this.enableEditMode(), n && this.editorDiv.focus(), (r = this._initialOptions) != null && r.isCentered && this.center(), this._initialOptions = null);
  }
  isEmpty() {
    return !this.editorDiv || this.editorDiv.innerText.trim() === "";
  }
  remove() {
    this.isEditing = !1, this.parent && (this.parent.setEditingState(!0), this.parent.div.classList.add("freetextEditing")), super.remove();
  }
  commit() {
    if (!this.isInEditMode()) return;
    super.commit(), this.disableEditMode();
    const n = te(this, QA),
      r = yt(this, QA, Gt(this, Py, Tor).call(this).trimEnd());
    if (n === r) return;
    const a = i => {
      if (yt(this, QA, i), !i) {
        this.remove();
        return;
      }
      Gt(this, Py, L7e).call(this), this._uiManager.rebuild(this), Gt(this, Py, j7e).call(this);
    };
    this.addCommands({
      cmd: () => {
        a(r);
      },
      undo: () => {
        a(n);
      },
      mustExec: !1
    }), Gt(this, Py, j7e).call(this);
  }
  shouldGetKeyboardEvents() {
    return this.isInEditMode();
  }
  enterInEditMode() {
    this.enableEditMode(), this.editorDiv.focus();
  }
  keydown(n) {
    n.target === this.div && n.key === "Enter" && (this.enterInEditMode(), n.preventDefault());
  }
  editorDivKeydown(n) {
    Em._keyboardManager.exec(this, n);
  }
  editorDivFocus(n) {
    this.isEditing = !0;
  }
  editorDivBlur(n) {
    this.isEditing = !1;
  }
  editorDivInput(n) {
    this.parent.div.classList.toggle("freetextEditing", this.isEmpty());
  }
  disableEditing() {
    this.editorDiv.setAttribute("role", "comment"), this.editorDiv.removeAttribute("aria-multiline");
  }
  enableEditing() {
    this.editorDiv.setAttribute("role", "textbox"), this.editorDiv.setAttribute("aria-multiline", !0);
  }
  get canChangeContent() {
    return !0;
  }
  render() {
    if (this.div) return this.div;
    let n, r;
    (this._isCopy || this.annotationElementId) && (n = this.x, r = this.y), super.render(), this.editorDiv = document.createElement("div"), this.editorDiv.className = "internal", this.editorDiv.setAttribute("id", te(this, b3e)), this.editorDiv.setAttribute("data-l10n-id", "pdfjs-free-text2"), this.editorDiv.setAttribute("data-l10n-attrs", "default-content"), this.enableEditing(), this.editorDiv.contentEditable = !0;
    const {
      style: a
    } = this.editorDiv;
    if (a.fontSize = `calc(${te(this, YA)}px * var(--total-scale-factor))`, a.color = this.color, this.div.append(this.editorDiv), this.overlayDiv = document.createElement("div"), this.overlayDiv.classList.add("overlay", "enabled"), this.div.append(this.overlayDiv), this._isCopy || this.annotationElementId) {
      const [i, o] = this.parentDimensions;
      if (this.annotationElementId) {
        const {
          position: s
        } = this._initialData;
        let [l, d] = this.getInitialTranslation();
        [l, d] = this.pageTranslationToScreen(l, d);
        const [u, h] = this.pageDimensions,
          [p, m] = this.pageTranslation;
        let f, y;
        switch (this.rotation) {
          case 0:
            f = n + (s[0] - p) / u, y = r + this.height - (s[1] - m) / h;
            break;
          case 90:
            f = n + (s[0] - p) / u, y = r - (s[1] - m) / h, [l, d] = [d, -l];
            break;
          case 180:
            f = n - this.width + (s[0] - p) / u, y = r - (s[1] - m) / h, [l, d] = [-l, -d];
            break;
          case 270:
            f = n + (s[0] - p - this.height * h) / u, y = r + (s[1] - m - this.width * u) / h, [l, d] = [-d, l];
            break;
        }
        this.setAt(f * i, y * o, l, d);
      } else this._moveAfterPaste(n, r);
      Gt(this, Py, L7e).call(this), this._isDraggable = !0, this.editorDiv.contentEditable = !1;
    } else this._isDraggable = !1, this.editorDiv.contentEditable = !0;
    return this.div;
  }
  editorDivPaste(n) {
    var f, y, b;
    const r = n.clipboardData || window.clipboardData,
      {
        types: a
      } = r;
    if (a.length === 1 && a[0] === "text/plain") return;
    n.preventDefault();
    const i = Gt(f = Em, bj, _2t).call(f, r.getData("text") || "").replaceAll(aMe, `
`);
    if (!i) return;
    const o = window.getSelection();
    if (!o.rangeCount) return;
    this.editorDiv.normalize(), o.deleteFromDocument();
    const s = o.getRangeAt(0);
    if (!i.includes(`
`)) {
      s.insertNode(document.createTextNode(i)), this.editorDiv.normalize(), o.collapseToStart();
      return;
    }
    const {
        startContainer: l,
        startOffset: d
      } = s,
      u = [],
      h = [];
    if (l.nodeType === Node.TEXT_NODE) {
      const v = l.parentElement;
      if (h.push(l.nodeValue.slice(d).replaceAll(aMe, "")), v !== this.editorDiv) {
        let _ = u;
        for (const w of this.editorDiv.childNodes) {
          if (w === v) {
            _ = h;
            continue;
          }
          _.push(Gt(y = Em, bj, D7e).call(y, w));
        }
      }
      u.push(l.nodeValue.slice(0, d).replaceAll(aMe, ""));
    } else if (l === this.editorDiv) {
      let v = u,
        _ = 0;
      for (const w of this.editorDiv.childNodes) _++ === d && (v = h), v.push(Gt(b = Em, bj, D7e).call(b, w));
    }
    yt(this, QA, `${u.join(`
`)}${i}${h.join(`
`)}`), Gt(this, Py, L7e).call(this);
    const p = new Range();
    let m = Math.sumPrecise(u.map(v => v.length));
    for (const {
      firstChild: v
    } of this.editorDiv.childNodes) if (v.nodeType === Node.TEXT_NODE) {
      const _ = v.nodeValue.length;
      if (m <= _) {
        p.setStart(v, m), p.setEnd(v, m);
        break;
      }
      m -= _;
    }
    o.removeAllRanges(), o.addRange(p);
  }
  get contentDiv() {
    return this.editorDiv;
  }
  getPDFRect() {
    const n = Em._internalPadding * this.parentScale;
    return this.getRect(n, n);
  }
  static async deserialize(n, r, a) {
    var s;
    let i = null;
    if (n instanceof xor) {
      const {
        data: {
          defaultAppearanceData: {
            fontSize: l,
            fontColor: d
          },
          rect: u,
          rotation: h,
          id: p,
          popupRef: m,
          richText: f,
          contentsObj: y,
          creationDate: b,
          modificationDate: v
        },
        textContent: _,
        textPosition: w,
        parent: {
          page: {
            pageNumber: k
          }
        }
      } = n;
      if (!(_ != null && _.length)) return null;
      i = n = {
        annotationType: nc.FREETEXT,
        color: Array.from(d),
        fontSize: l,
        value: _.join(`
`),
        position: w,
        pageIndex: k - 1,
        rect: u.slice(0),
        rotation: h,
        annotationElementId: p,
        id: p,
        deleted: !1,
        popupRef: m,
        comment: (y == null ? void 0 : y.str) || null,
        richText: f,
        creationDate: b,
        modificationDate: v
      };
    }
    const o = await super.deserialize(n, r, a);
    return yt(o, YA, n.fontSize), o.color = fo.makeHexColor(...n.color), yt(o, QA, Gt(s = Em, bj, _2t).call(s, n.value)), o._initialData = i, n.comment && o.setCommentData(n), o;
  }
  serialize(n = !1) {
    if (this.isEmpty()) return null;
    if (this.deleted) return this.serializeDeleted();
    const r = _p._colorManager.convert(this.isAttachedToDOM ? getComputedStyle(this.editorDiv).color : this.color),
      a = Object.assign(super.serialize(n), {
        color: r,
        fontSize: te(this, YA),
        value: Gt(this, Py, Mor).call(this)
      });
    return this.addComment(a), n ? (a.isCopy = !0, a) : this.annotationElementId && !Gt(this, Py, Por).call(this, a) ? null : (a.id = this.annotationElementId, a);
  }
  renderAnnotationElement(n) {
    const r = super.renderAnnotationElement(n);
    if (!r) return null;
    const {
      style: a
    } = r;
    a.fontSize = `calc(${te(this, YA)}px * var(--total-scale-factor))`, a.color = this.color, r.replaceChildren();
    for (const i of te(this, QA).split(`
`)) {
      const o = document.createElement("div");
      o.append(i ? document.createTextNode(i) : document.createElement("br")), r.append(o);
    }
    return n.updateEdited({
      rect: this.getPDFRect(),
      popup: this._uiManager.hasCommentManager() || this.hasEditedComment ? this.comment : {
        text: te(this, QA)
      }
    }), r;
  }
  resetAnnotationElement(n) {
    super.resetAnnotationElement(n), n.resetEdited();
  }
};

QA = new WeakMap(), b3e = new WeakMap(), eK = new WeakMap(), YA = new WeakMap(), Py = new WeakSet(), Cor = function (n) {
  const r = i => {
      this.editorDiv.style.fontSize = `calc(${i}px * var(--total-scale-factor))`, this.translate(0, -(i - te(this, YA)) * this.parentScale), yt(this, YA, i), Gt(this, Py, j7e).call(this);
    },
    a = te(this, YA);
  this.addCommands({
    cmd: r.bind(this, n),
    undo: r.bind(this, a),
    post: this._uiManager.updateUI.bind(this._uiManager, this),
    mustExec: !0,
    type: Td.FREETEXT_SIZE,
    overwriteIfSameType: !0,
    keepUndo: !0
  });
}, Eor = function (n) {
  const r = i => {
      this.color = i, this.onUpdatedColor();
    },
    a = this.color;
  this.addCommands({
    cmd: r.bind(this, n),
    undo: r.bind(this, a),
    post: this._uiManager.updateUI.bind(this._uiManager, this),
    mustExec: !0,
    type: Td.FREETEXT_COLOR,
    overwriteIfSameType: !0,
    keepUndo: !0
  });
}, Tor = function () {
  var a;
  const n = [];
  this.editorDiv.normalize();
  let r = null;
  for (const i of this.editorDiv.childNodes) (r == null ? void 0 : r.nodeType) === Node.TEXT_NODE && i.nodeName === "BR" || (n.push(Gt(a = Em, bj, D7e).call(a, i)), r = i);
  return n.join(`
`);
}, j7e = function () {
  const [n, r] = this.parentDimensions;
  let a;
  if (this.isAttachedToDOM) a = this.div.getBoundingClientRect();else {
    const {
        currentLayer: i,
        div: o
      } = this,
      s = o.style.display,
      l = o.classList.contains("hidden");
    o.classList.remove("hidden"), o.style.display = "hidden", i.div.append(this.div), a = o.getBoundingClientRect(), o.remove(), o.style.display = s, o.classList.toggle("hidden", l);
  }
  this.rotation % 180 === this.parentRotation % 180 ? (this.width = a.width / n, this.height = a.height / r) : (this.width = a.height / n, this.height = a.width / r), this.fixAndSetPosition();
}, bj = new WeakSet(), D7e = function (n) {
  return (n.nodeType === Node.TEXT_NODE ? n.nodeValue : n.innerText).replaceAll(aMe, "");
}, L7e = function () {
  if (this.editorDiv.replaceChildren(), !!te(this, QA)) for (const n of te(this, QA).split(`
`)) {
    const r = document.createElement("div");
    r.append(n ? document.createTextNode(n) : document.createElement("br")), this.editorDiv.append(r);
  }
}, Mor = function () {
  return te(this, QA).replaceAll(" ", " ");
}, _2t = function (n) {
  return n.replaceAll(" ", " ");
}, Por = function (n) {
  const {
    value: r,
    fontSize: a,
    color: i,
    pageIndex: o
  } = this._initialData;
  return this.hasEditedComment || this._hasBeenMoved || n.value !== r || n.fontSize !== a || n.color.some((s, l) => s !== i[l]) || n.pageIndex !== o;
}, qt(Em, bj), On(Em, "_freeTextDefaultContent", ""), On(Em, "_internalPadding", 0), On(Em, "_defaultColor", null), On(Em, "_defaultFontSize", 10), On(Em, "_type", "freetext"), On(Em, "_editorType", nc.FREETEXT);

let x2t = Em;

var tK;

class hBt {
  constructor() {
    qt(this, tK, Object.create(null));
  }
  updateProperty(t, n) {
    this[t] = n, this.updateSVGProperty(t, n);
  }
  updateProperties(t) {
    if (t) for (const [n, r] of Object.entries(t)) n.startsWith("_") || this.updateProperty(n, r);
  }
  updateSVGProperty(t, n) {
    te(this, tK)[t] = n;
  }
  toSVGProperties() {
    const t = te(this, tK);
    return yt(this, tK, Object.create(null)), {
      root: t
    };
  }
  reset() {
    yt(this, tK, Object.create(null));
  }
  updateAll(t = this) {
    this.updateProperties(t);
  }
  clone() {
    Pu("Not implemented");
  }
}

tK = new WeakMap();

var Pse, Rse, J0, nK, rK, Nse, wl, k2t, A2t, S2t, I2t, hye, C2t, E2t, T2t, pye, Ror, O7e, mye, Dne;

const Cc = class Cc extends _p {
  constructor(n) {
    super(n);
    qt(this, wl);
    qt(this, Pse, null);
    qt(this, Rse);
    On(this, "_clipPathId", null);
    On(this, "_colorPicker", null);
    On(this, "_drawId", null);
    On(this, "_drawOutlines", null);
    On(this, "_focusDrawId", null);
    yt(this, Rse, n.mustBeCommitted || !1), this._addOutlines(n);
  }
  onUpdatedColor() {
    var n;
    (n = this._colorPicker) == null || n.update(this.color), super.onUpdatedColor();
  }
  onUpdatedOpacity() {
    var n, r;
    (r = (n = this._colorPicker) == null ? void 0 : n.updateOpacity) == null || r.call(n, this.opacity);
  }
  _addOutlines(n) {
    n.drawOutlines && (Gt(this, wl, k2t).call(this, n), Gt(this, wl, pye).call(this));
  }
  static _mergeSVGProperties(n, r) {
    const a = new Set(Object.keys(n));
    for (const [i, o] of Object.entries(r)) a.has(i) ? Object.assign(n[i], o) : n[i] = o;
    return n;
  }
  static getDefaultDrawingOptions(n) {
    Pu("Not implemented");
  }
  static get typesMap() {
    Pu("Not implemented");
  }
  static get isDrawer() {
    return !0;
  }
  static get _hasClipPath() {
    return !1;
  }
  static get _hasDrawClass() {
    return !0;
  }
  static get supportMultipleDrawings() {
    return !1;
  }
  get _drawRotation() {
    return this.rotation;
  }
  get _opacityName() {
    return this.constructor.typesMap.get(this.opacityType);
  }
  static updateDefaultParams(n, r) {
    const a = this.typesMap.get(n);
    a && this._defaultDrawingOptions.updateProperty(a, r), this._currentParent && (te(Cc, J0).updateProperty(a, r), this._currentParent.drawLayer.updateProperties(this._currentDrawId, this._defaultDrawingOptions.toSVGProperties()));
  }
  updateParams(n, r) {
    const a = this.constructor.typesMap.get(n);
    a && this._updateProperty(n, a, r);
  }
  static get defaultPropertiesToUpdate() {
    const n = [],
      r = this._defaultDrawingOptions;
    for (const [a, i] of this.typesMap) n.push([a, r[i]]);
    return n;
  }
  get propertiesToUpdate() {
    const n = [],
      {
        _drawingOptions: r
      } = this;
    for (const [a, i] of this.constructor.typesMap) n.push([a, r[i]]);
    return n;
  }
  _updateProperty(n, r, a) {
    const i = this._drawingOptions,
      o = i[r],
      s = l => {
        var u;
        i.updateProperty(r, l);
        const d = this._drawOutlines.updateProperty(r, l);
        d && Gt(this, wl, mye).call(this, d), (u = this.parent) == null || u.drawLayer.updateProperties(this._drawId, i.toSVGProperties()), n === this.colorType ? this.onUpdatedColor() : n === this.opacityType && this.onUpdatedOpacity();
      };
    this.addCommands({
      cmd: s.bind(this, a),
      undo: s.bind(this, o),
      post: this._uiManager.updateUI.bind(this._uiManager, this),
      mustExec: !0,
      type: n,
      overwriteIfSameType: !0,
      keepUndo: !0
    });
  }
  _updateColorAndOpacity(n, r, a = this.colorAndOpacityType) {
    const i = this.constructor.typesMap.get(this.colorType),
      o = this._opacityName,
      s = this._drawingOptions,
      l = s[i],
      d = s[o],
      u = (h, p) => {
        var m;
        s.updateProperty(i, h), s.updateProperty(o, p), this._drawOutlines.updateProperty(i, h), this._drawOutlines.updateProperty(o, p), (m = this.parent) == null || m.drawLayer.updateProperties(this._drawId, s.toSVGProperties()), this.onUpdatedColor(), this.onUpdatedOpacity();
      };
    this.addCommands({
      cmd: u.bind(this, n, r),
      undo: u.bind(this, l, d),
      post: this._uiManager.updateUI.bind(this._uiManager, this),
      mustExec: !0,
      type: a,
      overwriteIfSameType: !0,
      keepUndo: !0
    });
  }
  _onResizing() {
    var n;
    (n = this.parent) == null || n.drawLayer.updateProperties(this._drawId, Cc._mergeSVGProperties(this._drawOutlines.getPathResizingSVGProperties(Gt(this, wl, O7e).call(this)), {
      bbox: Gt(this, wl, Dne).call(this)
    }));
  }
  _onResized() {
    var n;
    (n = this.parent) == null || n.drawLayer.updateProperties(this._drawId, Cc._mergeSVGProperties(this._drawOutlines.getPathResizedSVGProperties(Gt(this, wl, O7e).call(this)), {
      bbox: Gt(this, wl, Dne).call(this)
    })), Gt(this, wl, I2t).call(this);
  }
  _onTranslating(n, r) {
    var a;
    (a = this.parent) == null || a.drawLayer.updateProperties(this._drawId, {
      bbox: Gt(this, wl, Dne).call(this)
    });
  }
  _onTranslated() {
    var n;
    (n = this.parent) == null || n.drawLayer.updateProperties(this._drawId, Cc._mergeSVGProperties(this._drawOutlines.getPathTranslatedSVGProperties(Gt(this, wl, O7e).call(this), this.parentDimensions), {
      bbox: Gt(this, wl, Dne).call(this)
    }));
  }
  _onStartDragging() {
    var n;
    (n = this.parent) == null || n.drawLayer.updateProperties(this._drawId, {
      rootClass: {
        moving: !0
      }
    });
  }
  _onStopDragging() {
    var n;
    (n = this.parent) == null || n.drawLayer.updateProperties(this._drawId, {
      rootClass: {
        moving: !1
      }
    });
  }
  get _mustBeDisabledOnCommit() {
    return !0;
  }
  commit() {
    super.commit(), this._mustBeDisabledOnCommit && (this.disableEditMode(), this.disableEditing());
  }
  disableEditing() {
    super.disableEditing(), this.div.classList.toggle("disabled", !0);
  }
  enableEditing() {
    super.enableEditing(), this.div.classList.toggle("disabled", !1);
  }
  getBaseTranslation() {
    return [0, 0];
  }
  get isResizable() {
    return !0;
  }
  onceAdded(n) {
    this.annotationElementId || this.parent.addUndoableEditor(this), this._isDraggable = !0, te(this, Rse) && (yt(this, Rse, !1), this.commit(), this.parent.setSelected(this), n && this.isOnScreen && this.div.focus());
  }
  remove() {
    this._uiManager.removeShouldRescale(this), Gt(this, wl, T2t).call(this), super.remove();
  }
  rebuild() {
    this.parent && (super.rebuild(), this.div !== null && (Gt(this, wl, pye).call(this), Gt(this, wl, mye).call(this, this._drawOutlines.box), this.isAttachedToDOM || this.parent.add(this)));
  }
  setParent(n) {
    var a;
    let r = !1;
    this.parent && !n ? (this._uiManager.removeShouldRescale(this), Gt(this, wl, T2t).call(this)) : n && (this._uiManager.addShouldRescale(this), Gt(this, wl, pye).call(this, n), r = !this.parent && ((a = this.div) == null ? void 0 : a.classList.contains("selectedEditor"))), super.setParent(n), Gt(this, wl, C2t).call(this), r && this.select();
  }
  rotate(n = this.parentRotation) {
    if (!this.parent || this._drawId === null) return;
    const r = (n - this._drawRotation + 360) % 360;
    this.parent.drawLayer.updateProperties(this._drawId, Cc._mergeSVGProperties({
      bbox: Gt(this, wl, Dne).call(this, n)
    }, this._drawOutlines.updateRotation(r))), Gt(this, wl, I2t).call(this, r);
  }
  show(n = this._isVisible) {
    super.show(n), Gt(this, wl, C2t).call(this);
  }
  select() {
    super.select(), Gt(this, wl, hye).call(this, {
      hovered: !1,
      selected: !0
    });
  }
  unselect() {
    super.unselect(), Gt(this, wl, hye).call(this, {
      selected: !1
    });
  }
  pointerover() {
    this.isSelected || Gt(this, wl, hye).call(this, {
      hovered: !0
    });
  }
  pointerleave() {
    this.isSelected || Gt(this, wl, hye).call(this, {
      hovered: !1
    });
  }
  onScaleChanging() {
    if (!this.parent) return;
    const n = this._drawOutlines.updateParentDimensions(this.parentDimensions, this.parent.scale);
    n && Gt(this, wl, mye).call(this, n);
  }
  static onScaleChangingWhenDrawing() {}
  render() {
    if (this.div) return this.div;
    let n, r;
    this._isCopy && (n = this.x, r = this.y);
    const a = super.render();
    this.constructor._hasDrawClass && a.classList.add("draw");
    const i = yt(this, Pse, document.createElement("div"));
    return a.append(i), i.setAttribute("aria-hidden", "true"), i.className = "internal", this._clipPathId && (i.style.clipPath = this._clipPathId), Yar(this, i, ["pointerover", "pointerleave"]), this.setDims(), this._uiManager.addShouldRescale(this), this.disableEditing(), this._isCopy && this._moveAfterPaste(n, r), a;
  }
  static createDrawerInstance(n) {
    Pu("Not implemented");
  }
  static _getDrawingTarget(n, {
    target: r
  }) {
    return r;
  }
  static _getPointerCoords({
    offsetX: n,
    offsetY: r,
    clientX: a,
    clientY: i
  }, o = null) {
    if (!o) return [n, r];
    let s = a - o.clientX,
      l = i - o.clientY;
    switch (this._currentParent.viewport.rotation) {
      case 90:
        [s, l] = [l, -s];
        break;
      case 180:
        [s, l] = [-s, -l];
        break;
      case 270:
        [s, l] = [-l, s];
        break;
    }
    return [o.offsetX + s, o.offsetY + l];
  }
  static _addDrawingListeners(n, r) {}
  static _endDrawingSession(n = !1) {
    return this._currentParent.endDrawingSession(n);
  }
  static startDrawing(n, r, a, i) {
    var k;
    const {
      pointerId: o,
      pointerType: s
    } = i;
    if (Nw.isInitializedAndDifferentPointerType(s)) return;
    const l = this._getDrawingTarget(n, i),
      [d, u] = this._getPointerCoords(i),
      {
        viewport: {
          rotation: h
        }
      } = n,
      {
        x: p,
        y: m,
        width: f,
        height: y
      } = l.getBoundingClientRect(),
      b = yt(Cc, nK, new AbortController()),
      v = n.combinedSignal(b);
    if (Nw.setPointer(s, o), window.addEventListener("pointerup", A => {
      Nw.isSamePointerIdOrRemove(A.pointerId) && this._endDraw(A);
    }, {
      signal: v
    }), window.addEventListener("pointercancel", A => {
      Nw.isSamePointerIdOrRemove(A.pointerId) && this._endDrawingSession();
    }, {
      signal: v
    }), window.addEventListener("pointerdown", A => {
      Nw.isSamePointerType(A.pointerType) && (Nw.initializeAndAddPointerId(A.pointerId), te(Cc, J0).isCancellable() && (te(Cc, J0).removeLastElement(), te(Cc, J0).isEmpty() ? this._endDrawingSession(!0) : this._endDraw(null)));
    }, {
      capture: !0,
      passive: !1,
      signal: v
    }), window.addEventListener("contextmenu", gT, {
      signal: v
    }), l.addEventListener("pointermove", this._drawMove.bind(this), {
      signal: v
    }), l.addEventListener("touchmove", A => {
      Nw.isSameTimeStamp(A.timeStamp) && gb(A);
    }, {
      signal: v
    }), this._addDrawingListeners(l, v), n.toggleDrawing(), (k = r._editorUndoBar) == null || k.hide(), te(Cc, J0)) {
      n.drawLayer.updateProperties(this._currentDrawId, te(Cc, J0).startNew(d, u, f, y, h));
      return;
    }
    r.updateUIForDefaultProperties(this), yt(Cc, J0, this.createDrawerInstance({
      x: d,
      y: u,
      box: [p, m, f, y],
      rotation: h,
      parent: n,
      isLTR: a
    })), yt(Cc, rK, this.getDefaultDrawingOptions()), this._currentParent = n;
    const {
      id: _,
      clipPathId: w
    } = n.drawLayer.draw(this._mergeSVGProperties(te(Cc, rK).toSVGProperties(), te(Cc, J0).defaultSVGProperties), !0, this._hasClipPath);
    this._currentDrawId = _, yt(Cc, Nse, this._hasClipPath ? w : null);
  }
  static _drawMove(n) {
    var i;
    if (Nw.isSameTimeStamp(n.timeStamp), !te(Cc, J0) || !Nw.isSamePointerId(n.pointerId)) return;
    if (Nw.isUsingMultiplePointers()) {
      this._endDraw(n);
      return;
    }
    let r;
    const a = (i = n.getCoalescedEvents) == null ? void 0 : i.call(n);
    if (a != null && a.length) {
      const o = [];
      for (const s of a) o.push(...this._getPointerCoords(s, n));
      r = te(Cc, J0).addPoints(o);
    } else r = te(Cc, J0).add(...this._getPointerCoords(n));
    this._currentParent.drawLayer.updateProperties(this._currentDrawId, r), Nw.setTimeStamp(n.timeStamp), gb(n);
  }
  static _cleanup(n) {
    n && (this._currentDrawId = -1, this._currentParent = null, yt(Cc, J0, null), yt(Cc, rK, null), yt(Cc, Nse, null), Nw.clearTimeStamp()), te(Cc, nK) && (te(Cc, nK).abort(), yt(Cc, nK, null), Nw.clearPointerIds());
  }
  static _endDraw(n) {
    const r = this._currentParent;
    if (r) {
      if (r.toggleDrawing(!0), this._cleanup(!1), r.drawLayer.updateProperties(this._currentDrawId, (n == null ? void 0 : n.target) === r.div ? te(Cc, J0).end(...this._getPointerCoords(n)) : te(Cc, J0).end()), this.supportMultipleDrawings) {
        const a = te(Cc, J0),
          i = this._currentDrawId,
          o = a.getLastElement();
        r.addCommands({
          cmd: () => {
            r.drawLayer.updateProperties(i, a.setLastElement(o));
          },
          undo: () => {
            r.drawLayer.updateProperties(i, a.removeLastElement());
          },
          mustExec: !1,
          type: Td.DRAW_STEP
        });
        return;
      }
      this.endDrawing(!1);
    }
  }
  static endDrawing(n) {
    const r = this._currentParent;
    if (!r) return null;
    if (r.toggleDrawing(!0), r.cleanUndoStack(Td.DRAW_STEP), !te(Cc, J0).isEmpty()) {
      const {
          pageDimensions: [a, i],
          scale: o
        } = r,
        s = r.createAndAddNewEditor({
          offsetX: 0,
          offsetY: 0
        }, !1, {
          drawId: this._currentDrawId,
          clipPathId: te(Cc, Nse),
          drawOutlines: te(Cc, J0).getOutlines(a * o, i * o, o, this._INNER_MARGIN),
          drawingOptions: te(Cc, rK),
          mustBeCommitted: !n
        });
      return this._cleanup(!0), s;
    }
    return r.drawLayer.remove(this._currentDrawId), this._cleanup(!0), null;
  }
  createDrawingOptions(n) {}
  static deserializeDraw(n, r, a, i, o, s, l) {
    Pu("Not implemented");
  }
  static async deserialize(n, r, a) {
    var h, p;
    const {
        rawDims: {
          pageWidth: i,
          pageHeight: o,
          pageX: s,
          pageY: l
        }
      } = r.viewport,
      d = this.deserializeDraw(s, l, i, o, this._INNER_MARGIN, n, a),
      u = await super.deserialize(n, r, a);
    return u.createDrawingOptions(n), Gt(h = u, wl, k2t).call(h, {
      drawOutlines: d
    }), Gt(p = u, wl, pye).call(p), u.onScaleChanging(), u.rotate(), u;
  }
  serializeDraw(n) {
    const [r, a] = this.pageTranslation,
      [i, o] = this.pageDimensions;
    return this._drawOutlines.serialize([r, a, i, o], n);
  }
  renderAnnotationElement(n) {
    return n.updateEdited({
      rect: this.getPDFRect()
    }), null;
  }
  static canCreateNewEmptyEditor() {
    return !1;
  }
};

Pse = new WeakMap(), Rse = new WeakMap(), J0 = new WeakMap(), nK = new WeakMap(), rK = new WeakMap(), Nse = new WeakMap(), wl = new WeakSet(), k2t = function ({
  drawOutlines: n,
  drawId: r,
  drawingOptions: a,
  clipPathId: i
}) {
  this._drawOutlines = n, this._drawingOptions || (this._drawingOptions = a), this.annotationElementId || this._uiManager.a11yAlert(_p._l10nAlert[this.editorType]), r >= 0 ? (this._drawId = r, this._clipPathId = i ?? null, this.parent.drawLayer.finalizeDraw(r, n.defaultProperties), Gt(this, wl, S2t).call(this, this.parent)) : this._drawId = Gt(this, wl, A2t).call(this, n, this.parent), Gt(this, wl, mye).call(this, n.box);
}, A2t = function (n, r) {
  const {
    id: a,
    clipPathId: i
  } = r.drawLayer.draw(Cc._mergeSVGProperties(this._drawingOptions.toSVGProperties(), n.defaultSVGProperties), !1, this.constructor._hasClipPath);
  return this.constructor._hasClipPath && (this._clipPathId = i), Gt(this, wl, S2t).call(this, r), a;
}, S2t = function (n) {
  const r = this._drawOutlines.getFocusSVGProperties(te(this, wl, E2t));
  r && (this._focusDrawId = n.drawLayer.drawOutline(r, this._drawOutlines.focusMustRemoveSelfIntersections));
}, I2t = function (n = te(this, wl, E2t)) {
  var r;
  this._focusDrawId !== null && ((r = this.parent) == null || r.drawLayer.updateProperties(this._focusDrawId, this._drawOutlines.getFocusSVGProperties(n)));
}, hye = function (n) {
  var r;
  this._focusDrawId !== null && ((r = this.parent) == null || r.drawLayer.updateProperties(this._focusDrawId, {
    rootClass: n
  }));
}, C2t = function () {
  const {
    parent: n,
    _drawId: r,
    _focusDrawId: a,
    _isVisible: i
  } = this;
  if (!n || r === null) return;
  const o = {
    hidden: !i
  };
  n.drawLayer.updateProperties(r, {
    rootClass: o
  }), a !== null && n.drawLayer.updateProperties(a, {
    rootClass: o
  });
}, E2t = function () {
  return (this.parentRotation - this._drawRotation + 360) % 360;
}, T2t = function () {
  if (this._drawId === null || !this.parent) return;
  const {
    drawLayer: n
  } = this.parent;
  n.remove(this._drawId), this._drawId = null, this._focusDrawId !== null && (n.remove(this._focusDrawId), this._focusDrawId = null), this._drawingOptions.reset();
}, pye = function (n = this.parent) {
  if (!(this._drawId !== null && this.parent === n)) {
    if (this._drawId !== null) {
      const {
        drawLayer: r
      } = this.parent;
      r.updateParent(this._drawId, n.drawLayer), this._focusDrawId !== null && r.updateParent(this._focusDrawId, n.drawLayer);
      return;
    }
    this._drawingOptions.updateAll(), this._drawId = Gt(this, wl, A2t).call(this, this._drawOutlines, n), this._clipPathId && te(this, Pse) && (te(this, Pse).style.clipPath = this._clipPathId);
  }
}, Ror = function ([n, r, a, i]) {
  const {
    parentDimensions: [o, s],
    _drawRotation: l
  } = this;
  switch (l) {
    case 90:
      return [r, 1 - n, a * (s / o), i * (o / s)];
    case 180:
      return [1 - n, 1 - r, a, i];
    case 270:
      return [1 - r, n, a * (s / o), i * (o / s)];
    default:
      return [n, r, a, i];
  }
}, O7e = function () {
  const {
    x: n,
    y: r,
    width: a,
    height: i,
    parentDimensions: [o, s],
    _drawRotation: l
  } = this;
  switch (l) {
    case 90:
      return [1 - r, n, a * (o / s), i * (s / o)];
    case 180:
      return [1 - n, 1 - r, a, i];
    case 270:
      return [r, 1 - n, a * (o / s), i * (s / o)];
    default:
      return [n, r, a, i];
  }
}, mye = function (n) {
  [this.x, this.y, this.width, this.height] = Gt(this, wl, Ror).call(this, n), this.div && (this.fixAndSetPosition(), this.setDims()), this._onResized();
}, Dne = function (n = this.parentRotation) {
  const {
    x: r,
    y: a,
    width: i,
    height: o,
    _drawRotation: s,
    parentDimensions: [l, d]
  } = this;
  switch ((s * 4 + n) / 90) {
    case 1:
      return [1 - a - o, r, o, i];
    case 2:
      return [1 - r - i, 1 - a - o, i, o];
    case 3:
      return [a, 1 - r - i, o, i];
    case 4:
      return [r, a - i * (l / d), o * (d / l), i * (l / d)];
    case 5:
      return [1 - a, r, i * (l / d), o * (d / l)];
    case 6:
      return [1 - r - o * (d / l), 1 - a, o * (d / l), i * (l / d)];
    case 7:
      return [a - i * (l / d), 1 - r - o * (d / l), i * (l / d), o * (d / l)];
    case 8:
      return [r - i, a - o, i, o];
    case 9:
      return [1 - a, r - i, o, i];
    case 10:
      return [1 - r, 1 - a, i, o];
    case 11:
      return [a - o, 1 - r, o, i];
    case 12:
      return [r - o * (d / l), a, o * (d / l), i * (l / d)];
    case 13:
      return [1 - a - i * (l / d), r - o * (d / l), i * (l / d), o * (d / l)];
    case 14:
      return [1 - r, 1 - a - i * (l / d), o * (d / l), i * (l / d)];
    case 15:
      return [a, 1 - r, i * (l / d), o * (d / l)];
    default:
      return [r, a, i, o];
  }
}, On(Cc, "_currentDrawId", -1), On(Cc, "_currentParent", null), qt(Cc, J0, null), qt(Cc, nK, null), qt(Cc, rK, null), qt(Cc, Nse, null), On(Cc, "_INNER_MARGIN", 3);

let Rke = Cc;

class Uo {
  constructor() {
    On(this, "focusOutline", null);
  }
  toSVGPath() {
    Pu("Abstract method `toSVGPath` must be implemented.");
  }
  get box() {
    Pu("Abstract getter `box` must be implemented.");
  }
  serialize(t, n) {
    Pu("Abstract method `serialize` must be implemented.");
  }
  get defaultSVGProperties() {
    Pu("Abstract getter `defaultSVGProperties` must be implemented.");
  }
  get defaultProperties() {
    return this.defaultSVGProperties;
  }
  getFocusSVGProperties(t) {
    return null;
  }
  get focusMustRemoveSelfIntersections() {
    return !1;
  }
  updateProperty(t, n) {
    return null;
  }
  updateParentDimensions(t, n) {
    return null;
  }
  serializeQuadPoints(t, n) {
    return null;
  }
  updateRotation(t) {
    return {};
  }
  getPathResizingSVGProperties(t) {
    return {};
  }
  getPathResizedSVGProperties(t) {
    return {};
  }
  getPathTranslatedSVGProperties(t, n) {
    return {};
  }
  static _rotateBox([t, n, r, a], i) {
    switch (i) {
      case 90:
        return [1 - n - a, t, a, r];
      case 180:
        return [1 - t - r, 1 - n - a, r, a];
      case 270:
        return [n, 1 - t - r, a, r];
    }
    return [t, n, r, a];
  }
  static _rescale(t, n, r, a, i, o) {
    o || (o = new Float32Array(t.length));
    for (let s = 0, l = t.length; s < l; s += 2) o[s] = n + t[s] * a, o[s + 1] = r + t[s + 1] * i;
    return o;
  }
  static _rescaleAndSwap(t, n, r, a, i, o) {
    o || (o = new Float32Array(t.length));
    for (let s = 0, l = t.length; s < l; s += 2) o[s] = n + t[s + 1] * a, o[s + 1] = r + t[s] * i;
    return o;
  }
  static _translate(t, n, r, a) {
    a || (a = new Float32Array(t.length));
    for (let i = 0, o = t.length; i < o; i += 2) a[i] = n + t[i], a[i + 1] = r + t[i + 1];
    return a;
  }
  static svgRound(t) {
    return Math.round(t * 1e4);
  }
  static _normalizePoint(t, n, r, a, i) {
    switch (i) {
      case 90:
        return [1 - n / r, t / a];
      case 180:
        return [1 - t / r, 1 - n / a];
      case 270:
        return [n / r, 1 - t / a];
      default:
        return [t / r, n / a];
    }
  }
  static createBezierPoints(t, n, r, a, i, o) {
    return [(t + 5 * r) / 6, (n + 5 * a) / 6, (5 * r + i) / 6, (5 * a + o) / 6, (r + i) / 2, (a + o) / 2];
  }
}

On(Uo, "PRECISION", 1e-4);

var XA, D4, jse, Dse, EC, nd, aK, iK, v3e, w3e, Lse, Ose, d6, x3e, tVe, nVe, Ab, fye, Nor, jor, Dor, Lor, Oor, Bor;

const PR = class PR {
  constructor(t, n, r, a, i, o, s = 0) {
    qt(this, Ab);
    qt(this, XA);
    qt(this, D4, []);
    qt(this, jse);
    qt(this, Dse);
    qt(this, EC, []);
    qt(this, nd, new Float32Array(18));
    qt(this, aK);
    qt(this, iK);
    qt(this, v3e);
    qt(this, w3e);
    qt(this, Lse);
    qt(this, Ose);
    qt(this, d6, []);
    yt(this, XA, r), yt(this, Ose, i * a), yt(this, Dse, o), te(this, nd).set([NaN, NaN, NaN, NaN, t, n], 6), yt(this, jse, s), yt(this, w3e, te(PR, x3e) * a), yt(this, v3e, te(PR, nVe) * a), yt(this, Lse, a), te(this, d6).push(t, n);
  }
  isEmpty() {
    return isNaN(te(this, nd)[8]);
  }
  isCancellable() {
    return te(this, d6).length <= 10;
  }
  removeLastElement() {
    return te(this, nd).fill(NaN), te(this, EC).length = te(this, D4).length = te(this, d6).length = 0, {
      path: {
        d: ""
      }
    };
  }
  add(t, n) {
    var E;
    yt(this, aK, t), yt(this, iK, n);
    const [r, a, i, o] = te(this, XA);
    let [s, l, d, u] = te(this, nd).subarray(8, 12);
    const h = t - d,
      p = n - u,
      m = Math.hypot(h, p);
    if (m < te(this, v3e)) return !1;
    const f = m - te(this, w3e),
      y = f / m,
      b = y * h,
      v = y * p;
    let _ = s,
      w = l;
    s = d, l = u, d += b, u += v, (E = te(this, d6)) == null || E.push(t, n);
    const k = -v / f,
      A = b / f,
      S = k * te(this, Ose),
      C = A * te(this, Ose);
    return te(this, nd).set(te(this, nd).subarray(2, 8), 0), te(this, nd).set([d + S, u + C], 4), te(this, nd).set(te(this, nd).subarray(14, 18), 12), te(this, nd).set([d - S, u - C], 16), isNaN(te(this, nd)[6]) ? (te(this, EC).length === 0 && (te(this, nd).set([s + S, l + C], 2), te(this, EC).push(NaN, NaN, NaN, NaN, (s + S - r) / i, (l + C - a) / o), te(this, nd).set([s - S, l - C], 14), te(this, D4).push(NaN, NaN, NaN, NaN, (s - S - r) / i, (l - C - a) / o)), te(this, nd).set([_, w, s, l, d, u], 6), !this.isEmpty()) : (te(this, nd).set([_, w, s, l, d, u], 6), Math.abs(Math.atan2(w - l, _ - s) - Math.atan2(v, b)) < Math.PI / 2 ? ([s, l, d, u] = te(this, nd).subarray(2, 6), te(this, EC).push(NaN, NaN, NaN, NaN, ((s + d) / 2 - r) / i, ((l + u) / 2 - a) / o), [s, l, _, w] = te(this, nd).subarray(14, 18), te(this, D4).push(NaN, NaN, NaN, NaN, ((_ + s) / 2 - r) / i, ((w + l) / 2 - a) / o), !0) : ([_, w, s, l, d, u] = te(this, nd).subarray(0, 6), te(this, EC).push(((_ + 5 * s) / 6 - r) / i, ((w + 5 * l) / 6 - a) / o, ((5 * s + d) / 6 - r) / i, ((5 * l + u) / 6 - a) / o, ((s + d) / 2 - r) / i, ((l + u) / 2 - a) / o), [d, u, s, l, _, w] = te(this, nd).subarray(12, 18), te(this, D4).push(((_ + 5 * s) / 6 - r) / i, ((w + 5 * l) / 6 - a) / o, ((5 * s + d) / 6 - r) / i, ((5 * l + u) / 6 - a) / o, ((s + d) / 2 - r) / i, ((l + u) / 2 - a) / o), !0));
  }
  toSVGPath() {
    if (this.isEmpty()) return "";
    const t = te(this, EC),
      n = te(this, D4);
    if (isNaN(te(this, nd)[6]) && !this.isEmpty()) return Gt(this, Ab, Nor).call(this);
    const r = [];
    r.push(`M${t[4]} ${t[5]}`);
    for (let a = 6; a < t.length; a += 6) isNaN(t[a]) ? r.push(`L${t[a + 4]} ${t[a + 5]}`) : r.push(`C${t[a]} ${t[a + 1]} ${t[a + 2]} ${t[a + 3]} ${t[a + 4]} ${t[a + 5]}`);
    Gt(this, Ab, Dor).call(this, r);
    for (let a = n.length - 6; a >= 6; a -= 6) isNaN(n[a]) ? r.push(`L${n[a + 4]} ${n[a + 5]}`) : r.push(`C${n[a]} ${n[a + 1]} ${n[a + 2]} ${n[a + 3]} ${n[a + 4]} ${n[a + 5]}`);
    return Gt(this, Ab, jor).call(this, r), r.join(" ");
  }
  newFreeDrawOutline(t, n, r, a, i, o) {
    return new For(t, n, r, a, i, o);
  }
  getOutlines() {
    var h;
    const t = te(this, EC),
      n = te(this, D4),
      r = te(this, nd),
      [a, i, o, s] = te(this, XA),
      l = new Float32Array((((h = te(this, d6)) == null ? void 0 : h.length) ?? 0) + 2);
    for (let p = 0, m = l.length - 2; p < m; p += 2) l[p] = (te(this, d6)[p] - a) / o, l[p + 1] = (te(this, d6)[p + 1] - i) / s;
    if (l[l.length - 2] = (te(this, aK) - a) / o, l[l.length - 1] = (te(this, iK) - i) / s, isNaN(r[6]) && !this.isEmpty()) return Gt(this, Ab, Lor).call(this, l);
    const d = new Float32Array(te(this, EC).length + 24 + te(this, D4).length);
    let u = t.length;
    for (let p = 0; p < u; p += 2) {
      if (isNaN(t[p])) {
        d[p] = d[p + 1] = NaN;
        continue;
      }
      d[p] = t[p], d[p + 1] = t[p + 1];
    }
    u = Gt(this, Ab, Bor).call(this, d, u);
    for (let p = n.length - 6; p >= 6; p -= 6) for (let m = 0; m < 6; m += 2) {
      if (isNaN(n[p + m])) {
        d[u] = d[u + 1] = NaN, u += 2;
        continue;
      }
      d[u] = n[p + m], d[u + 1] = n[p + m + 1], u += 2;
    }
    return Gt(this, Ab, Oor).call(this, d, u), this.newFreeDrawOutline(d, l, te(this, XA), te(this, Lse), te(this, jse), te(this, Dse));
  }
};

XA = new WeakMap(), D4 = new WeakMap(), jse = new WeakMap(), Dse = new WeakMap(), EC = new WeakMap(), nd = new WeakMap(), aK = new WeakMap(), iK = new WeakMap(), v3e = new WeakMap(), w3e = new WeakMap(), Lse = new WeakMap(), Ose = new WeakMap(), d6 = new WeakMap(), x3e = new WeakMap(), tVe = new WeakMap(), nVe = new WeakMap(), Ab = new WeakSet(), fye = function () {
  const t = te(this, nd).subarray(4, 6),
    n = te(this, nd).subarray(16, 18),
    [r, a, i, o] = te(this, XA);
  return [(te(this, aK) + (t[0] - n[0]) / 2 - r) / i, (te(this, iK) + (t[1] - n[1]) / 2 - a) / o, (te(this, aK) + (n[0] - t[0]) / 2 - r) / i, (te(this, iK) + (n[1] - t[1]) / 2 - a) / o];
}, Nor = function () {
  const [t, n, r, a] = te(this, XA),
    [i, o, s, l] = Gt(this, Ab, fye).call(this);
  return `M${(te(this, nd)[2] - t) / r} ${(te(this, nd)[3] - n) / a} L${(te(this, nd)[4] - t) / r} ${(te(this, nd)[5] - n) / a} L${i} ${o} L${s} ${l} L${(te(this, nd)[16] - t) / r} ${(te(this, nd)[17] - n) / a} L${(te(this, nd)[14] - t) / r} ${(te(this, nd)[15] - n) / a} Z`;
}, jor = function (t) {
  const n = te(this, D4);
  t.push(`L${n[4]} ${n[5]} Z`);
}, Dor = function (t) {
  const [n, r, a, i] = te(this, XA),
    o = te(this, nd).subarray(4, 6),
    s = te(this, nd).subarray(16, 18),
    [l, d, u, h] = Gt(this, Ab, fye).call(this);
  t.push(`L${(o[0] - n) / a} ${(o[1] - r) / i} L${l} ${d} L${u} ${h} L${(s[0] - n) / a} ${(s[1] - r) / i}`);
}, Lor = function (t) {
  const n = te(this, nd),
    [r, a, i, o] = te(this, XA),
    [s, l, d, u] = Gt(this, Ab, fye).call(this),
    h = new Float32Array(36);
  return h.set([NaN, NaN, NaN, NaN, (n[2] - r) / i, (n[3] - a) / o, NaN, NaN, NaN, NaN, (n[4] - r) / i, (n[5] - a) / o, NaN, NaN, NaN, NaN, s, l, NaN, NaN, NaN, NaN, d, u, NaN, NaN, NaN, NaN, (n[16] - r) / i, (n[17] - a) / o, NaN, NaN, NaN, NaN, (n[14] - r) / i, (n[15] - a) / o], 0), this.newFreeDrawOutline(h, t, te(this, XA), te(this, Lse), te(this, jse), te(this, Dse));
}, Oor = function (t, n) {
  const r = te(this, D4);
  return t.set([NaN, NaN, NaN, NaN, r[4], r[5]], n), n += 6;
}, Bor = function (t, n) {
  const r = te(this, nd).subarray(4, 6),
    a = te(this, nd).subarray(16, 18),
    [i, o, s, l] = te(this, XA),
    [d, u, h, p] = Gt(this, Ab, fye).call(this);
  return t.set([NaN, NaN, NaN, NaN, (r[0] - i) / s, (r[1] - o) / l, NaN, NaN, NaN, NaN, d, u, NaN, NaN, NaN, NaN, h, p, NaN, NaN, NaN, NaN, (a[0] - i) / s, (a[1] - o) / l], n), n += 24;
}, qt(PR, x3e, 8), qt(PR, tVe, 2), qt(PR, nVe, te(PR, x3e) + te(PR, tVe));

let oUe = PR;

var Bse, u6, bN, _3e, TC, k3e, Yf, rVe, zor;

class For extends Uo {
  constructor(n, r, a, i, o, s) {
    super();
    qt(this, rVe);
    qt(this, Bse);
    qt(this, u6, new Float32Array(4));
    qt(this, bN);
    qt(this, _3e);
    qt(this, TC);
    qt(this, k3e);
    qt(this, Yf);
    yt(this, Yf, n), yt(this, TC, r), yt(this, Bse, a), yt(this, k3e, i), yt(this, bN, o), yt(this, _3e, s), this.firstPoint = [NaN, NaN], this.lastPoint = [NaN, NaN], Gt(this, rVe, zor).call(this, s);
    const [l, d, u, h] = te(this, u6);
    for (let p = 0, m = n.length; p < m; p += 2) n[p] = (n[p] - l) / u, n[p + 1] = (n[p + 1] - d) / h;
    for (let p = 0, m = r.length; p < m; p += 2) r[p] = (r[p] - l) / u, r[p + 1] = (r[p + 1] - d) / h;
  }
  toSVGPath() {
    const n = [`M${te(this, Yf)[4]} ${te(this, Yf)[5]}`];
    for (let r = 6, a = te(this, Yf).length; r < a; r += 6) {
      if (isNaN(te(this, Yf)[r])) {
        n.push(`L${te(this, Yf)[r + 4]} ${te(this, Yf)[r + 5]}`);
        continue;
      }
      n.push(`C${te(this, Yf)[r]} ${te(this, Yf)[r + 1]} ${te(this, Yf)[r + 2]} ${te(this, Yf)[r + 3]} ${te(this, Yf)[r + 4]} ${te(this, Yf)[r + 5]}`);
    }
    return n.push("Z"), n.join(" ");
  }
  serialize([n, r, a, i], o) {
    const s = a - n,
      l = i - r;
    let d, u;
    switch (o) {
      case 0:
        d = Uo._rescale(te(this, Yf), n, i, s, -l), u = Uo._rescale(te(this, TC), n, i, s, -l);
        break;
      case 90:
        d = Uo._rescaleAndSwap(te(this, Yf), n, r, s, l), u = Uo._rescaleAndSwap(te(this, TC), n, r, s, l);
        break;
      case 180:
        d = Uo._rescale(te(this, Yf), a, r, -s, l), u = Uo._rescale(te(this, TC), a, r, -s, l);
        break;
      case 270:
        d = Uo._rescaleAndSwap(te(this, Yf), a, i, -s, -l), u = Uo._rescaleAndSwap(te(this, TC), a, i, -s, -l);
        break;
    }
    return {
      outline: Array.from(d),
      points: [Array.from(u)]
    };
  }
  get box() {
    return te(this, u6);
  }
  newOutliner(n, r, a, i, o, s, l = 0) {
    return new oUe(n, r, a, i, o, s, l);
  }
  updateThickness(n) {
    const r = this.getNewOutline(n);
    return yt(this, Yf, te(r, Yf)), yt(this, TC, te(r, TC)), te(this, u6).set(te(r, u6)), this.firstPoint = r.firstPoint, this.lastPoint = r.lastPoint, te(this, u6);
  }
  getNewOutline(n, r) {
    const [a, i, o, s] = te(this, u6),
      [l, d, u, h] = te(this, Bse),
      p = o * u,
      m = s * h,
      f = a * u + l,
      y = i * h + d,
      b = te(this, TC),
      v = this.newOutliner(b[0] * p + f, b[1] * m + y, te(this, Bse), te(this, k3e), n, te(this, _3e), r ?? te(this, bN));
    for (let _ = 2, w = b.length; _ < w; _ += 2) v.add(b[_] * p + f, b[_ + 1] * m + y);
    return v.getOutlines();
  }
}

Bse = new WeakMap(), u6 = new WeakMap(), bN = new WeakMap(), _3e = new WeakMap(), TC = new WeakMap(), k3e = new WeakMap(), Yf = new WeakMap(), rVe = new WeakSet(), zor = function (n) {
  const r = te(this, Yf);
  let a = r[4],
    i = r[5];
  const o = [a, i, a, i];
  let s = a,
    l = i,
    d = a,
    u = i;
  const h = n ? Math.max : Math.min,
    p = new Float32Array(4);
  for (let f = 6, y = r.length; f < y; f += 6) {
    const b = r[f + 4],
      v = r[f + 5];
    isNaN(r[f]) ? (fo.pointBoundingBox(b, v, o), l > v ? (s = b, l = v) : l === v && (s = h(s, b)), u < v ? (d = b, u = v) : u === v && (d = h(d, b))) : (p.set(R7, 0), fo.bezierBoundingBox(a, i, ...r.slice(f, f + 6), p), fo.rectBoundingBox(...p, o), l > p[1] ? (s = p[0], l = p[1]) : l === p[1] && (s = h(s, p[0])), u < p[3] ? (d = p[2], u = p[3]) : u === p[3] && (d = h(d, p[2]))), a = b, i = v;
  }
  const m = te(this, u6);
  m[0] = o[0] - te(this, bN), m[1] = o[1] - te(this, bN), m[2] = o[2] - o[0] + 2 * te(this, bN), m[3] = o[3] - o[1] + 2 * te(this, bN), this.firstPoint = [s, l], this.lastPoint = [d, u];
};

function Uor(e) {
  return {
    bbox: e.box,
    root: {
      viewBox: "0 0 1 1"
    },
    rootClass: {
      highlight: !0,
      free: e.isFree
    },
    path: {
      d: e.toSVGPath()
    }
  };
}

function $or(e, t) {
  const {
    focusOutline: n
  } = e;
  return {
    bbox: Uo._rotateBox(n.box, t),
    root: {
      "data-main-rotation": t
    },
    rootClass: {
      highlightOutline: !0,
      free: e.isFree
    },
    path: {
      d: n.toSVGPath()
    }
  };
}

var A3e, S3e, I3e, UB, MC, r_, Gor, B7e, Vor, Hor, P2t;

class M2t {
  constructor(t, n = 0, r = 0, a = !0) {
    qt(this, r_);
    qt(this, A3e);
    qt(this, S3e);
    qt(this, I3e);
    qt(this, UB, []);
    qt(this, MC, []);
    const i = R7.slice(),
      o = 10 ** -4;
    for (const {
      x: y,
      y: b,
      width: v,
      height: _
    } of t) {
      const w = Math.floor((y - n) / o) * o,
        k = Math.ceil((y + v + n) / o) * o,
        A = Math.floor((b - n) / o) * o,
        S = Math.ceil((b + _ + n) / o) * o,
        C = [w, A, S, !0],
        I = [k, A, S, !1];
      te(this, UB).push(C, I), fo.rectBoundingBox(w, A, k, S, i);
    }
    const s = i[2] - i[0] + 2 * r,
      l = i[3] - i[1] + 2 * r,
      d = i[0] - r,
      u = i[1] - r;
    let h = a ? -1 / 0 : 1 / 0,
      p = 1 / 0;
    const m = te(this, UB).at(a ? -1 : -2),
      f = [m[0], m[2]];
    for (const y of te(this, UB)) {
      const [b, v, _, w] = y;
      !w && a ? v < p ? (p = v, h = b) : v === p && (h = Math.max(h, b)) : w && !a && (v < p ? (p = v, h = b) : v === p && (h = Math.min(h, b))), y[0] = (b - d) / s, y[1] = (v - u) / l, y[2] = (_ - u) / l;
    }
    yt(this, A3e, new Float32Array([d, u, s, l])), yt(this, S3e, [h, p]), yt(this, I3e, f);
  }
  getOutlines() {
    te(this, UB).sort((n, r) => n[0] - r[0] || n[1] - r[1] || n[2] - r[2]);
    const t = [];
    for (const n of te(this, UB)) n[3] ? (t.push(...Gt(this, r_, P2t).call(this, n)), Gt(this, r_, Vor).call(this, n)) : (Gt(this, r_, Hor).call(this, n), t.push(...Gt(this, r_, P2t).call(this, n)));
    return Gt(this, r_, Gor).call(this, t);
  }
}

A3e = new WeakMap(), S3e = new WeakMap(), I3e = new WeakMap(), UB = new WeakMap(), MC = new WeakMap(), r_ = new WeakSet(), Gor = function (t) {
  const n = [],
    r = new Set();
  for (const o of t) {
    const [s, l, d] = o;
    n.push([s, l, o], [s, d, o]);
  }
  n.sort((o, s) => o[1] - s[1] || o[0] - s[0]);
  for (let o = 0, s = n.length; o < s; o += 2) {
    const l = n[o][2],
      d = n[o + 1][2];
    l.push(d), d.push(l), r.add(l), r.add(d);
  }
  const a = [];
  let i;
  for (; r.size > 0;) {
    const o = r.values().next().value;
    let [s, l, d, u, h] = o;
    r.delete(o);
    let p = s,
      m = l;
    for (i = [s, d], a.push(i);;) {
      let f;
      if (r.has(u)) f = u;else if (r.has(h)) f = h;else break;
      r.delete(f), [s, l, d, u, h] = f, p !== s && (i.push(p, m, s, m === l ? l : d), p = s), m = m === l ? d : l;
    }
    i.push(p, m);
  }
  return new R2t(a, te(this, A3e), te(this, S3e), te(this, I3e));
}, B7e = function (t) {
  const n = te(this, MC);
  let r = 0,
    a = n.length - 1;
  for (; r <= a;) {
    const i = r + a >> 1,
      o = n[i][0];
    if (o === t) return i;
    o < t ? r = i + 1 : a = i - 1;
  }
  return a + 1;
}, Vor = function ([, t, n]) {
  const r = Gt(this, r_, B7e).call(this, t);
  te(this, MC).splice(r, 0, [t, n]);
}, Hor = function ([, t, n]) {
  const r = Gt(this, r_, B7e).call(this, t);
  for (let a = r; a < te(this, MC).length; a++) {
    const [i, o] = te(this, MC)[a];
    if (i !== t) break;
    if (i === t && o === n) {
      te(this, MC).splice(a, 1);
      return;
    }
  }
  for (let a = r - 1; a >= 0; a--) {
    const [i, o] = te(this, MC)[a];
    if (i !== t) break;
    if (i === t && o === n) {
      te(this, MC).splice(a, 1);
      return;
    }
  }
}, P2t = function (t) {
  const [n, r, a] = t,
    i = [[n, r, a]],
    o = Gt(this, r_, B7e).call(this, a);
  for (let s = 0; s < o; s++) {
    const [l, d] = te(this, MC)[s];
    for (let u = 0, h = i.length; u < h; u++) {
      const [, p, m] = i[u];
      if (!(d <= p || m <= l)) {
        if (p >= l) {
          if (m > d) i[u][1] = d;else {
            if (h === 1) return [];
            i.splice(u, 1), u--, h--;
          }
          continue;
        }
        i[u][2] = l, m > d && i.push([n, d, m]);
      }
    }
  }
  return i;
};

var C3e, E3e, Fse;

class R2t extends Uo {
  constructor(n, r, a, i) {
    super();
    qt(this, C3e);
    qt(this, E3e, null);
    qt(this, Fse);
    yt(this, Fse, n), yt(this, C3e, r), this.firstPoint = a, this.lastPoint = i;
  }
  static build(n, r) {
    const a = new M2t(n, .001).getOutlines();
    return yt(a, E3e, n), a.focusOutline = new M2t(n, .0025, .001, r).getOutlines(), a;
  }
  get isFree() {
    return !1;
  }
  get defaultSVGProperties() {
    return Uor(this);
  }
  getFocusSVGProperties(n) {
    return $or(this, n);
  }
  updateRotation(n) {
    return {
      root: {
        "data-main-rotation": n
      }
    };
  }
  serializeQuadPoints([n, r], [a, i]) {
    const o = te(this, E3e),
      s = new Float32Array(o.length * 8);
    let l = 0;
    for (const {
      x: d,
      y: u,
      width: h,
      height: p
    } of o) {
      const m = d * a + n,
        f = (1 - u) * i + r;
      s[l] = s[l + 4] = m, s[l + 1] = s[l + 3] = f, s[l + 2] = s[l + 6] = m + h * a, s[l + 5] = s[l + 7] = f - p * i, l += 8;
    }
    return s;
  }
  toSVGPath() {
    const n = [];
    for (const r of te(this, Fse)) {
      let [a, i] = r;
      n.push(`M${a} ${i}`);
      for (let o = 2; o < r.length; o += 2) {
        const s = r[o],
          l = r[o + 1];
        s === a ? (n.push(`V${l}`), i = l) : l === i && (n.push(`H${s}`), a = s);
      }
      n.push("Z");
    }
    return n.join(" ");
  }
  serialize([n, r, a, i], o) {
    const s = [],
      l = a - n,
      d = i - r;
    for (const u of te(this, Fse)) {
      const h = new Array(u.length);
      for (let p = 0; p < u.length; p += 2) h[p] = n + u[p] * l, h[p + 1] = i - u[p + 1] * d;
      s.push(h);
    }
    return s;
  }
  get box() {
    return te(this, C3e);
  }
}

C3e = new WeakMap(), E3e = new WeakMap(), Fse = new WeakMap();

class pBt extends oUe {
  newFreeDrawOutline(t, n, r, a, i, o) {
    return new N2t(t, n, r, a, i, o);
  }
}

var JA, T3e;

class uli {
  constructor(t, n, r, a, i, o, s) {
    qt(this, JA);
    qt(this, T3e);
    yt(this, JA, new pBt(t, n, r, a, i, o, s)), yt(this, T3e, i);
  }
  add(t, n) {
    return te(this, JA).add(t, n) ? {
      path: {
        d: te(this, JA).toSVGPath()
      }
    } : null;
  }
  addPoints(t) {
    let n = !1;
    for (let r = 0, a = t.length; r < a; r += 2) n = te(this, JA).add(t[r], t[r + 1]) || n;
    return n ? {
      path: {
        d: te(this, JA).toSVGPath()
      }
    } : null;
  }
  end(t, n) {
    return t === void 0 ? null : this.add(t, n);
  }
  isEmpty() {
    return te(this, JA).isEmpty();
  }
  isCancellable() {
    return te(this, JA).isCancellable();
  }
  removeLastElement() {
    return te(this, JA).removeLastElement();
  }
  updateProperty(t, n) {
    return null;
  }
  getOutlines() {
    const t = te(this, JA).getOutlines();
    return t.buildFocusOutline(2 * te(this, T3e)), t;
  }
  get defaultSVGProperties() {
    return {
      bbox: [0, 0, 1, 1],
      root: {
        viewBox: "0 0 1 1"
      },
      rootClass: {
        highlight: !0,
        free: !0
      },
      path: {
        d: te(this, JA).toSVGPath()
      }
    };
  }
}

JA = new WeakMap(), T3e = new WeakMap();

var aVe;

const iVe = class iVe extends For {
  newOutliner(t, n, r, a, i, o, s = 0) {
    return new pBt(t, n, r, a, i, o, s);
  }
  get isFree() {
    return !0;
  }
  buildFocusOutline(t) {
    this.focusOutline = this.getNewOutline(t / 2 + te(iVe, aVe), .0025);
  }
  get defaultSVGProperties() {
    return Uor(this);
  }
  getFocusSVGProperties(t) {
    return $or(this, t);
  }
  get focusMustRemoveSelfIntersections() {
    return !0;
  }
  updateRotation(t) {
    return {
      root: {
        "data-main-rotation": t
      }
    };
  }
  updateProperty(t, n) {
    if (t !== "thickness") return null;
    const r = this.updateThickness(n / 2);
    return this.buildFocusOutline(n), r;
  }
  getPathResizedSVGProperties() {
    return {
      path: {
        d: this.toSVGPath()
      }
    };
  }
};

aVe = new WeakMap(), qt(iVe, aVe, 1.5);

let N2t = iVe;

class mBt extends hBt {
  constructor(t = null) {
    super(), super.updateProperties(t);
  }
  updateSVGProperty(t, n) {
    t !== "thickness" && super.updateSVGProperty(t, n);
  }
  clone() {
    const t = new mBt();
    return t.updateAll(this), t;
  }
}

var zse, M3e, P3e, R3e, N3e, Use, r3, j2t, Wor, F7e, qor;

const o2 = class o2 extends Rke {
  constructor(n) {
    var r;
    super({
      ...n,
      name: "highlightEditor"
    });
    qt(this, r3);
    qt(this, zse, null);
    qt(this, M3e, 0);
    qt(this, P3e, null);
    qt(this, R3e, 0);
    qt(this, N3e, "");
    qt(this, Use, "");
    yt(this, zse, n.anchorNode || null), yt(this, M3e, n.anchorOffset || 0), yt(this, P3e, n.focusNode || null), yt(this, R3e, n.focusOffset || 0), yt(this, N3e, n.methodOfCreation || ((r = this._drawOutlines) != null && r.isFree ? "main_toolbar" : "")), yt(this, Use, n.text || ""), this._isDraggable = !1, this.defaultL10nId = "pdfjs-editor-highlight-editor", this.rotate();
  }
  static get _keyboardManager() {
    const n = o2.prototype;
    return Ws(this, "_keyboardManager", new CJ([[["ArrowLeft"], n._moveCaret, {
      args: [0]
    }], [["ArrowRight"], n._moveCaret, {
      args: [1]
    }], [["ArrowUp"], n._moveCaret, {
      args: [2]
    }], [["ArrowDown"], n._moveCaret, {
      args: [3]
    }]]));
  }
  static initialize(n, r) {
    var a;
    _p.initialize(n, r), this._defaultDrawingOptions || (this._defaultDrawingOptions = new mBt({
      fill: ((a = r.highlightColors) == null ? void 0 : a.values().next().value) || "#fff066",
      "fill-opacity": o2._DEFAULT_OPACITY,
      thickness: o2._DEFAULT_THICKNESS
    }));
  }
  static getDefaultDrawingOptions(n) {
    const r = this._defaultDrawingOptions.clone();
    return r.updateProperties(n), r;
  }
  static get typesMap() {
    return Ws(this, "typesMap", new Map([[Td.HIGHLIGHT_COLOR, "fill"], [Td.HIGHLIGHT_THICKNESS, "thickness"]]));
  }
  static get isDrawer() {
    return !1;
  }
  static get _hasClipPath() {
    return !0;
  }
  static get _hasDrawClass() {
    return !1;
  }
  _addOutlines(n) {
    const {
      boxes: r,
      drawOutlines: a
    } = n;
    !r && !a || (this._drawingOptions || (this._drawingOptions = n.drawingOptions || o2.getDefaultDrawingOptions()), r && (n = {
      ...n,
      drawOutlines: R2t.build(r, this._uiManager.direction === "ltr")
    }), super._addOutlines(n));
  }
  get colorType() {
    return Td.HIGHLIGHT_COLOR;
  }
  get color() {
    return this._drawingOptions.fill;
  }
  get opacity() {
    return this._drawingOptions["fill-opacity"];
  }
  get _opacityName() {
    return "fill-opacity";
  }
  get _drawRotation() {
    var n;
    return (n = this._drawOutlines) != null && n.isFree ? this.rotation : 0;
  }
  get isResizable() {
    return !1;
  }
  get _mustBeDisabledOnCommit() {
    return !1;
  }
  get _mustFixPosition() {
    var n;
    return !((n = this._drawOutlines) != null && n.isFree);
  }
  get telemetryInitialData() {
    return {
      action: "added",
      type: this._drawOutlines.isFree ? "free_highlight" : "highlight",
      color: this._uiManager.getNonHCMColorName(this.color),
      thickness: this._drawingOptions.thickness,
      methodOfCreation: te(this, N3e)
    };
  }
  get telemetryFinalData() {
    return {
      type: "highlight",
      color: this._uiManager.getNonHCMColorName(this.color)
    };
  }
  static computeTelemetryFinalData(n) {
    return {
      numberOfColors: n.get("color").size
    };
  }
  translateInPage(n, r) {}
  get toolbarPosition() {
    return Gt(this, r3, j2t).call(this, this._drawOutlines.focusOutline.lastPoint);
  }
  get commentButtonPosition() {
    return Gt(this, r3, j2t).call(this, this._drawOutlines.firstPoint);
  }
  updateParams(n, r) {
    switch (n) {
      case Td.HIGHLIGHT_COLOR:
        this._updateColorAndOpacity(r, o2._DEFAULT_OPACITY, n), this._reportTelemetry({
          action: "color_changed",
          color: this._uiManager.getNonHCMColorName(r)
        }, !0);
        break;
      case Td.HIGHLIGHT_THICKNESS:
        super.updateParams(n, r), this._reportTelemetry({
          action: "thickness_changed",
          thickness: r
        }, !0);
        break;
    }
  }
  get propertiesToUpdate() {
    const n = super.propertiesToUpdate;
    return n.push([Td.HIGHLIGHT_FREE, this._drawOutlines.isFree]), n;
  }
  get toolbarButtons() {
    return this._uiManager.highlightColors ? (this._colorPicker = new hor({
      editor: this
    }), [["colorPicker", this._colorPicker]]) : super.toolbarButtons;
  }
  fixAndSetPosition() {
    return super.fixAndSetPosition(this._drawRotation);
  }
  getRect(n, r) {
    return super.getRect(n, r, this._drawRotation);
  }
  onceAdded(n) {
    this.annotationElementId || this.parent.addUndoableEditor(this), n && this.div.focus();
  }
  remove() {
    this._reportTelemetry({
      action: "deleted"
    }), super.remove();
  }
  render() {
    if (this.div) return this.div;
    const n = super.render();
    return te(this, Use) && (n.setAttribute("aria-label", te(this, Use)), n.setAttribute("role", "mark")), this._drawOutlines.isFree ? n.classList.add("free") : n.addEventListener("keydown", Gt(this, r3, Wor).bind(this), {
      signal: this._uiManager._signal
    }), this.enableEditing(), n;
  }
  _moveCaret(n) {
    switch (this.parent.unselect(this), n) {
      case 0:
      case 2:
        Gt(this, r3, F7e).call(this, !0);
        break;
      case 1:
      case 3:
        Gt(this, r3, F7e).call(this, !1);
        break;
    }
  }
  unselect() {
    super.unselect(), this._drawOutlines.isFree || Gt(this, r3, F7e).call(this, !1);
  }
  static createDrawerInstance({
    x: n,
    y: r,
    box: a,
    parent: i,
    isLTR: o
  }) {
    return new uli(n, r, a, i.scale, this._defaultDrawingOptions.thickness / 2, o, .001);
  }
  static _getDrawingTarget(n, {
    target: r
  }) {
    return r.closest(".textLayer");
  }
  static _getPointerCoords({
    x: n,
    y: r
  }) {
    return [n, r];
  }
  static _addDrawingListeners(n, r) {
    n.classList.add("free"), r.addEventListener("abort", () => n.classList.remove("free"), {
      once: !0
    }), window.addEventListener("blur", () => this._endDraw(null), {
      signal: r
    }), window.addEventListener("pointerdown", gb, {
      capture: !0,
      passive: !1,
      signal: r
    });
  }
  static _endDrawingSession(n = !1) {
    return this.endDrawing(n);
  }
  createDrawingOptions({
    color: n,
    opacity: r,
    thickness: a
  }) {
    const {
      _defaultDrawingOptions: i,
      _DEFAULT_OPACITY: o
    } = o2;
    this._drawingOptions = o2.getDefaultDrawingOptions({
      fill: fo.makeHexColor(...n),
      "fill-opacity": r || o,
      thickness: a || i.thickness
    });
  }
  static deserializeDraw(n, r, a, i, o, s, l) {
    const {
      quadPoints: d
    } = s;
    if (d) {
      const f = [];
      for (let y = 0, b = d.length; y < b; y += 8) f.push({
        x: (d[y] - n) / a,
        y: 1 - (d[y + 1] - r) / i,
        width: (d[y + 2] - d[y]) / a,
        height: (d[y + 1] - d[y + 5]) / i
      });
      return R2t.build(f, l.direction === "ltr");
    }
    const u = s.thickness || this._defaultDrawingOptions.thickness,
      h = (s.inkLists || s.outlines.points)[0],
      p = new pBt(h[0] - n, i - (h[1] - r), [0, 0, a, i], 1, u / 2, !0, .001);
    for (let f = 0, y = h.length; f < y; f += 2) p.add(h[f] - n, i - (h[f + 1] - r));
    const m = p.getOutlines();
    return m.buildFocusOutline(u), m;
  }
  static async deserialize(n, r, a) {
    let i = null;
    if (n instanceof kor) {
      const {
        data: {
          quadPoints: s,
          rect: l,
          rotation: d,
          id: u,
          color: h,
          opacity: p,
          popupRef: m,
          richText: f,
          contentsObj: y,
          creationDate: b,
          modificationDate: v
        },
        parent: {
          page: {
            pageNumber: _
          }
        }
      } = n;
      i = n = {
        annotationType: nc.HIGHLIGHT,
        color: Array.from(h),
        opacity: p,
        quadPoints: s,
        pageIndex: _ - 1,
        rect: l.slice(0),
        rotation: d,
        annotationElementId: u,
        id: u,
        deleted: !1,
        popupRef: m,
        richText: f,
        comment: (y == null ? void 0 : y.str) || null,
        creationDate: b,
        modificationDate: v
      };
    } else if (n instanceof uBt) {
      const {
        data: {
          inkLists: s,
          rect: l,
          rotation: d,
          id: u,
          color: h,
          borderStyle: {
            rawWidth: p
          },
          popupRef: m,
          richText: f,
          contentsObj: y,
          creationDate: b,
          modificationDate: v
        },
        parent: {
          page: {
            pageNumber: _
          }
        }
      } = n;
      i = n = {
        annotationType: nc.HIGHLIGHT,
        color: Array.from(h),
        thickness: p,
        inkLists: s,
        pageIndex: _ - 1,
        rect: l.slice(0),
        rotation: d,
        annotationElementId: u,
        id: u,
        deleted: !1,
        popupRef: m,
        richText: f,
        comment: (y == null ? void 0 : y.str) || null,
        creationDate: b,
        modificationDate: v
      };
    }
    const o = await super.deserialize(n, r, a);
    return o._initialData = i, n.comment && o.setCommentData(n), o;
  }
  serialize(n = !1) {
    if (this.isEmpty() || n) return null;
    if (this.deleted) return this.serializeDeleted();
    const r = super.serialize(n);
    return Object.assign(r, {
      color: _p._colorManager.convert(this._uiManager.getNonHCMColor(this.color)),
      opacity: this.opacity,
      thickness: this._drawingOptions.thickness,
      quadPoints: this._drawOutlines.serializeQuadPoints(this.pageTranslation, this.pageDimensions),
      outlines: this._drawOutlines.serialize(r.rect, this._drawRotation)
    }), this.addComment(r), this.annotationElementId && !Gt(this, r3, qor).call(this, r) ? null : (r.id = this.annotationElementId, r);
  }
  renderAnnotationElement(n) {
    return this.deleted ? (n.hide(), null) : (n.updateEdited({
      rect: this.getPDFRect(),
      popup: this.comment
    }), null);
  }
};

zse = new WeakMap(), M3e = new WeakMap(), P3e = new WeakMap(), R3e = new WeakMap(), N3e = new WeakMap(), Use = new WeakMap(), r3 = new WeakSet(), j2t = function ([n, r]) {
  const [a, i, o, s] = this._drawOutlines.box;
  return [(n - a) / o, (r - i) / s];
}, Wor = function (n) {
  o2._keyboardManager.exec(this, n);
}, F7e = function (n) {
  if (!te(this, zse)) return;
  const r = window.getSelection();
  n ? r.setPosition(te(this, zse), te(this, M3e)) : r.setPosition(te(this, P3e), te(this, R3e));
}, qor = function (n) {
  const {
    color: r
  } = this._initialData;
  return this.hasEditedComment || n.color.some((a, i) => a !== r[i]);
}, On(o2, "_DEFAULT_OPACITY", 1), On(o2, "_DEFAULT_THICKNESS", 12), On(o2, "_defaultDrawingOptions", null), On(o2, "_type", "highlight"), On(o2, "_editorType", nc.HIGHLIGHT);

let sUe = o2;

var h6, $B, Z0, b1, oK, $se, v1, ey, L4, sK, lK, cK, a3, z7e, U7e, D2t;

class hli {
  constructor(t, n, r, a, i, o) {
    qt(this, a3);
    qt(this, h6, new Float64Array(6));
    qt(this, $B, new Float64Array(2));
    qt(this, Z0);
    qt(this, b1);
    qt(this, oK);
    qt(this, $se);
    qt(this, v1);
    qt(this, ey, "");
    qt(this, L4, 0);
    qt(this, sK, new BCe());
    qt(this, lK);
    qt(this, cK);
    yt(this, lK, r), yt(this, cK, a), yt(this, oK, i), yt(this, $se, o), [t, n] = Gt(this, a3, z7e).call(this, t, n);
    const s = yt(this, Z0, [NaN, NaN, NaN, NaN, t, n]);
    yt(this, v1, [t, n]), yt(this, b1, [{
      line: s,
      points: te(this, v1)
    }]), te(this, h6).set(s, 0), te(this, $B).set([t, n], 0);
  }
  updateProperty(t, n) {
    t === "stroke-width" && yt(this, $se, n);
  }
  isEmpty() {
    var t;
    return !((t = te(this, b1)) != null && t.length);
  }
  isCancellable() {
    return te(this, v1).length <= 10;
  }
  add(t, n) {
    return Gt(this, a3, U7e).call(this, t, n) && this.toSVGPath(), {
      path: {
        d: Gt(this, a3, D2t).call(this)
      }
    };
  }
  addPoints(t) {
    let n = !1;
    for (let r = 0, a = t.length; r < a; r += 2) Gt(this, a3, U7e).call(this, t[r], t[r + 1]) && (n = !0, te(this, v1).length <= 6 && (this.toSVGPath(), n = !1));
    return n && this.toSVGPath(), {
      path: {
        d: Gt(this, a3, D2t).call(this)
      }
    };
  }
  end(t, n) {
    return t !== void 0 && Gt(this, a3, U7e).call(this, t, n) ? {
      path: {
        d: this.toSVGPath()
      }
    } : te(this, v1).length === 2 ? {
      path: {
        d: this.toSVGPath()
      }
    } : {
      path: {
        d: te(this, ey)
      }
    };
  }
  startNew(t, n, r, a, i) {
    yt(this, lK, r), yt(this, cK, a), yt(this, oK, i), [t, n] = Gt(this, a3, z7e).call(this, t, n);
    const o = yt(this, Z0, [NaN, NaN, NaN, NaN, t, n]);
    yt(this, v1, [t, n]), te(this, $B).set([t, n], 0);
    const s = te(this, b1).at(-1);
    return s && (s.line = new Float32Array(s.line), s.points = new Float32Array(s.points)), te(this, b1).push({
      line: o,
      points: te(this, v1)
    }), te(this, h6).set(o, 0), yt(this, L4, 0), this.toSVGPath(), null;
  }
  getLastElement() {
    return te(this, b1).at(-1);
  }
  setLastElement(t) {
    return te(this, b1) ? (te(this, b1).push(t), yt(this, Z0, t.line), yt(this, v1, t.points), yt(this, L4, 0), {
      path: {
        d: this.toSVGPath()
      }
    }) : te(this, sK).setLastElement(t);
  }
  removeLastElement() {
    if (!te(this, b1)) return te(this, sK).removeLastElement();
    te(this, b1).pop(), yt(this, ey, "");
    for (let t = 0, n = te(this, b1).length; t < n; t++) {
      const {
        line: r,
        points: a
      } = te(this, b1)[t];
      yt(this, Z0, r), yt(this, v1, a), yt(this, L4, 0), this.toSVGPath();
    }
    return {
      path: {
        d: te(this, ey)
      }
    };
  }
  toSVGPath() {
    const t = Uo.svgRound(te(this, Z0)[4]),
      n = Uo.svgRound(te(this, Z0)[5]);
    if (te(this, v1).length === 2) return yt(this, ey, `${te(this, ey)} M ${t} ${n} Z`), te(this, ey);
    if (te(this, v1).length <= 6) {
      const a = te(this, ey).lastIndexOf("M");
      yt(this, ey, `${te(this, ey).slice(0, a)} M ${t} ${n}`), yt(this, L4, 6);
    }
    if (te(this, v1).length === 4) {
      const a = Uo.svgRound(te(this, Z0)[10]),
        i = Uo.svgRound(te(this, Z0)[11]);
      return yt(this, ey, `${te(this, ey)} L ${a} ${i}`), yt(this, L4, 12), te(this, ey);
    }
    const r = [];
    te(this, L4) === 0 && (r.push(`M ${t} ${n}`), yt(this, L4, 6));
    for (let a = te(this, L4), i = te(this, Z0).length; a < i; a += 6) {
      const [o, s, l, d, u, h] = te(this, Z0).slice(a, a + 6).map(Uo.svgRound);
      r.push(`C${o} ${s} ${l} ${d} ${u} ${h}`);
    }
    return yt(this, ey, te(this, ey) + r.join(" ")), yt(this, L4, te(this, Z0).length), te(this, ey);
  }
  getOutlines(t, n, r, a) {
    const i = te(this, b1).at(-1);
    return i.line = new Float32Array(i.line), i.points = new Float32Array(i.points), te(this, sK).build(te(this, b1), t, n, r, te(this, oK), te(this, $se), a), yt(this, h6, null), yt(this, Z0, null), yt(this, b1, null), yt(this, ey, null), te(this, sK);
  }
  get defaultSVGProperties() {
    return {
      root: {
        viewBox: "0 0 10000 10000"
      },
      rootClass: {
        draw: !0
      },
      bbox: [0, 0, 1, 1]
    };
  }
}

h6 = new WeakMap(), $B = new WeakMap(), Z0 = new WeakMap(), b1 = new WeakMap(), oK = new WeakMap(), $se = new WeakMap(), v1 = new WeakMap(), ey = new WeakMap(), L4 = new WeakMap(), sK = new WeakMap(), lK = new WeakMap(), cK = new WeakMap(), a3 = new WeakSet(), z7e = function (t, n) {
  return Uo._normalizePoint(t, n, te(this, lK), te(this, cK), te(this, oK));
}, U7e = function (t, n) {
  [t, n] = Gt(this, a3, z7e).call(this, t, n), te(this, $B).set([t, n], 0);
  const [r, a, i, o] = te(this, h6).subarray(2, 6),
    s = t - i,
    l = n - o;
  return Math.hypot(te(this, lK) * s, te(this, cK) * l) <= 2 ? !1 : (te(this, v1).push(t, n), isNaN(r) ? (te(this, h6).set([i, o, t, n], 2), te(this, Z0).push(NaN, NaN, NaN, NaN, t, n), !0) : (isNaN(te(this, h6)[0]) && te(this, Z0).splice(6, 6), te(this, h6).set([r, a, i, o, t, n], 0), te(this, Z0).push(...Uo.createBezierPoints(r, a, i, o, t, n)), !0));
}, D2t = function () {
  const t = Uo.svgRound(te(this, $B)[0]),
    n = Uo.svgRound(te(this, $B)[1]);
  if (te(this, v1).length === 2) {
    const r = Uo.svgRound(te(this, Z0)[4]),
      a = Uo.svgRound(te(this, Z0)[5]);
    return `${te(this, ey)} M ${r} ${a} L ${t} ${n}`;
  }
  return `${te(this, ey)} L ${t} ${n}`;
};

var l2, j3e, D3e, ZA, p6, m6, Gse, Vse, dK, M1, wR, Kor, Qor, Yor;

class BCe extends Uo {
  constructor() {
    super(...arguments);
    qt(this, M1);
    qt(this, l2);
    qt(this, j3e, 0);
    qt(this, D3e);
    qt(this, ZA);
    qt(this, p6);
    qt(this, m6);
    qt(this, Gse);
    qt(this, Vse);
    qt(this, dK);
  }
  build(n, r, a, i, o, s, l) {
    yt(this, p6, r), yt(this, m6, a), yt(this, Gse, i), yt(this, Vse, o), yt(this, dK, s), yt(this, D3e, l ?? 0), yt(this, ZA, n), Gt(this, M1, Qor).call(this);
  }
  get thickness() {
    return te(this, dK);
  }
  setLastElement(n) {
    return te(this, ZA).push(n), {
      path: {
        d: this.toSVGPath()
      }
    };
  }
  removeLastElement() {
    return te(this, ZA).pop(), {
      path: {
        d: this.toSVGPath()
      }
    };
  }
  toSVGPath() {
    const n = [];
    for (const {
      line: r
    } of te(this, ZA)) {
      if (n.push(`M${Uo.svgRound(r[4])} ${Uo.svgRound(r[5])}`), r.length === 6) {
        n.push("Z");
        continue;
      }
      if (r.length === 12 && isNaN(r[6])) {
        n.push(`L${Uo.svgRound(r[10])} ${Uo.svgRound(r[11])}`);
        continue;
      }
      for (let a = 6, i = r.length; a < i; a += 6) {
        const [o, s, l, d, u, h] = r.subarray(a, a + 6).map(Uo.svgRound);
        n.push(`C${o} ${s} ${l} ${d} ${u} ${h}`);
      }
    }
    return n.join("");
  }
  serialize([n, r, a, i], o) {
    const s = [],
      l = [],
      [d, u, h, p] = Gt(this, M1, Kor).call(this);
    let m, f, y, b, v, _, w, k, A;
    switch (te(this, Vse)) {
      case 0:
        A = Uo._rescale, m = n, f = r + i, y = a, b = -i, v = n + d * a, _ = r + (1 - u - p) * i, w = n + (d + h) * a, k = r + (1 - u) * i;
        break;
      case 90:
        A = Uo._rescaleAndSwap, m = n, f = r, y = a, b = i, v = n + u * a, _ = r + d * i, w = n + (u + p) * a, k = r + (d + h) * i;
        break;
      case 180:
        A = Uo._rescale, m = n + a, f = r, y = -a, b = i, v = n + (1 - d - h) * a, _ = r + u * i, w = n + (1 - d) * a, k = r + (u + p) * i;
        break;
      case 270:
        A = Uo._rescaleAndSwap, m = n + a, f = r + i, y = -a, b = -i, v = n + (1 - u - p) * a, _ = r + (1 - d - h) * i, w = n + (1 - u) * a, k = r + (1 - d) * i;
        break;
    }
    for (const {
      line: S,
      points: C
    } of te(this, ZA)) s.push(A(S, m, f, y, b, o ? new Array(S.length) : null)), l.push(A(C, m, f, y, b, o ? new Array(C.length) : null));
    return {
      lines: s,
      points: l,
      rect: [v, _, w, k]
    };
  }
  static deserialize(n, r, a, i, o, {
    paths: {
      lines: s,
      points: l
    },
    rotation: d,
    thickness: u
  }) {
    const h = [];
    let p, m, f, y, b;
    switch (d) {
      case 0:
        b = Uo._rescale, p = -n / a, m = r / i + 1, f = 1 / a, y = -1 / i;
        break;
      case 90:
        b = Uo._rescaleAndSwap, p = -r / i, m = -n / a, f = 1 / i, y = 1 / a;
        break;
      case 180:
        b = Uo._rescale, p = n / a + 1, m = -r / i, f = -1 / a, y = 1 / i;
        break;
      case 270:
        b = Uo._rescaleAndSwap, p = r / i + 1, m = n / a + 1, f = -1 / i, y = -1 / a;
        break;
    }
    if (!s) {
      s = [];
      for (const _ of l) {
        const w = _.length;
        if (w === 2) {
          s.push(new Float32Array([NaN, NaN, NaN, NaN, _[0], _[1]]));
          continue;
        }
        if (w === 4) {
          s.push(new Float32Array([NaN, NaN, NaN, NaN, _[0], _[1], NaN, NaN, NaN, NaN, _[2], _[3]]));
          continue;
        }
        const k = new Float32Array(3 * (w - 2));
        s.push(k);
        let [A, S, C, I] = _.subarray(0, 4);
        k.set([NaN, NaN, NaN, NaN, A, S], 0);
        for (let E = 4; E < w; E += 2) {
          const M = _[E],
            T = _[E + 1];
          k.set(Uo.createBezierPoints(A, S, C, I, M, T), (E - 2) * 3), [A, S, C, I] = [C, I, M, T];
        }
      }
    }
    for (let _ = 0, w = s.length; _ < w; _++) h.push({
      line: b(s[_].map(k => k ?? NaN), p, m, f, y),
      points: b(l[_].map(k => k ?? NaN), p, m, f, y)
    });
    const v = new this.prototype.constructor();
    return v.build(h, a, i, 1, d, u, o), v;
  }
  get box() {
    return te(this, l2);
  }
  updateProperty(n, r) {
    return n === "stroke-width" ? Gt(this, M1, Yor).call(this, r) : null;
  }
  updateParentDimensions([n, r], a) {
    const [i, o] = Gt(this, M1, wR).call(this);
    yt(this, p6, n), yt(this, m6, r), yt(this, Gse, a);
    const [s, l] = Gt(this, M1, wR).call(this),
      d = s - i,
      u = l - o,
      h = te(this, l2);
    return h[0] -= d, h[1] -= u, h[2] += 2 * d, h[3] += 2 * u, h;
  }
  updateRotation(n) {
    return yt(this, j3e, n), {
      path: {
        transform: this.rotationTransform
      }
    };
  }
  get viewBox() {
    return te(this, l2).map(Uo.svgRound).join(" ");
  }
  get defaultProperties() {
    const [n, r] = te(this, l2);
    return {
      root: {
        viewBox: this.viewBox
      },
      path: {
        "transform-origin": `${Uo.svgRound(n)} ${Uo.svgRound(r)}`
      }
    };
  }
  get rotationTransform() {
    const [,, n, r] = te(this, l2);
    let a = 0,
      i = 0,
      o = 0,
      s = 0,
      l = 0,
      d = 0;
    switch (te(this, j3e)) {
      case 90:
        i = r / n, o = -n / r, l = n;
        break;
      case 180:
        a = -1, s = -1, l = n, d = r;
        break;
      case 270:
        i = -r / n, o = n / r, d = r;
        break;
      default:
        return "";
    }
    return `matrix(${a} ${i} ${o} ${s} ${Uo.svgRound(l)} ${Uo.svgRound(d)})`;
  }
  getPathResizingSVGProperties([n, r, a, i]) {
    const [o, s] = Gt(this, M1, wR).call(this),
      [l, d, u, h] = te(this, l2);
    if (Math.abs(u - o) <= Uo.PRECISION || Math.abs(h - s) <= Uo.PRECISION) {
      const b = n + a / 2 - (l + u / 2),
        v = r + i / 2 - (d + h / 2);
      return {
        path: {
          "transform-origin": `${Uo.svgRound(n)} ${Uo.svgRound(r)}`,
          transform: `${this.rotationTransform} translate(${b} ${v})`
        }
      };
    }
    const p = (a - 2 * o) / (u - 2 * o),
      m = (i - 2 * s) / (h - 2 * s),
      f = u / a,
      y = h / i;
    return {
      path: {
        "transform-origin": `${Uo.svgRound(l)} ${Uo.svgRound(d)}`,
        transform: `${this.rotationTransform} scale(${f} ${y}) translate(${Uo.svgRound(o)} ${Uo.svgRound(s)}) scale(${p} ${m}) translate(${Uo.svgRound(-o)} ${Uo.svgRound(-s)})`
      }
    };
  }
  getPathResizedSVGProperties([n, r, a, i]) {
    const [o, s] = Gt(this, M1, wR).call(this),
      l = te(this, l2),
      [d, u, h, p] = l;
    if (l[0] = n, l[1] = r, l[2] = a, l[3] = i, Math.abs(h - o) <= Uo.PRECISION || Math.abs(p - s) <= Uo.PRECISION) {
      const v = n + a / 2 - (d + h / 2),
        _ = r + i / 2 - (u + p / 2);
      for (const {
        line: w,
        points: k
      } of te(this, ZA)) Uo._translate(w, v, _, w), Uo._translate(k, v, _, k);
      return {
        root: {
          viewBox: this.viewBox
        },
        path: {
          "transform-origin": `${Uo.svgRound(n)} ${Uo.svgRound(r)}`,
          transform: this.rotationTransform || null,
          d: this.toSVGPath()
        }
      };
    }
    const m = (a - 2 * o) / (h - 2 * o),
      f = (i - 2 * s) / (p - 2 * s),
      y = -m * (d + o) + n + o,
      b = -f * (u + s) + r + s;
    if (m !== 1 || f !== 1 || y !== 0 || b !== 0) for (const {
      line: v,
      points: _
    } of te(this, ZA)) Uo._rescale(v, y, b, m, f, v), Uo._rescale(_, y, b, m, f, _);
    return {
      root: {
        viewBox: this.viewBox
      },
      path: {
        "transform-origin": `${Uo.svgRound(n)} ${Uo.svgRound(r)}`,
        transform: this.rotationTransform || null,
        d: this.toSVGPath()
      }
    };
  }
  getPathTranslatedSVGProperties([n, r], a) {
    const [i, o] = a,
      s = te(this, l2),
      l = n - s[0],
      d = r - s[1];
    if (te(this, p6) === i && te(this, m6) === o) for (const {
      line: u,
      points: h
    } of te(this, ZA)) Uo._translate(u, l, d, u), Uo._translate(h, l, d, h);else {
      const u = te(this, p6) / i,
        h = te(this, m6) / o;
      yt(this, p6, i), yt(this, m6, o);
      for (const {
        line: p,
        points: m
      } of te(this, ZA)) Uo._rescale(p, l, d, u, h, p), Uo._rescale(m, l, d, u, h, m);
      s[2] *= u, s[3] *= h;
    }
    return s[0] = n, s[1] = r, {
      root: {
        viewBox: this.viewBox
      },
      path: {
        d: this.toSVGPath(),
        "transform-origin": `${Uo.svgRound(n)} ${Uo.svgRound(r)}`
      }
    };
  }
  get defaultSVGProperties() {
    const n = te(this, l2);
    return {
      root: {
        viewBox: this.viewBox
      },
      rootClass: {
        draw: !0
      },
      path: {
        d: this.toSVGPath(),
        "transform-origin": `${Uo.svgRound(n[0])} ${Uo.svgRound(n[1])}`,
        transform: this.rotationTransform || null
      },
      bbox: n
    };
  }
}

l2 = new WeakMap(), j3e = new WeakMap(), D3e = new WeakMap(), ZA = new WeakMap(), p6 = new WeakMap(), m6 = new WeakMap(), Gse = new WeakMap(), Vse = new WeakMap(), dK = new WeakMap(), M1 = new WeakSet(), wR = function (n = te(this, dK)) {
  const r = te(this, D3e) + n / 2 * te(this, Gse);
  return te(this, Vse) % 180 === 0 ? [r / te(this, p6), r / te(this, m6)] : [r / te(this, m6), r / te(this, p6)];
}, Kor = function () {
  const [n, r, a, i] = te(this, l2),
    [o, s] = Gt(this, M1, wR).call(this, 0);
  return [n + o, r + s, a - 2 * o, i - 2 * s];
}, Qor = function () {
  const n = yt(this, l2, SW.slice());
  for (const {
    line: i
  } of te(this, ZA)) {
    if (i.length <= 12) {
      for (let l = 4, d = i.length; l < d; l += 6) fo.pointBoundingBox(i[l], i[l + 1], n);
      continue;
    }
    let o = i[4],
      s = i[5];
    for (let l = 6, d = i.length; l < d; l += 6) {
      const [u, h, p, m, f, y] = i.subarray(l, l + 6);
      fo.bezierBoundingBox(o, s, u, h, p, m, f, y, n), o = f, s = y;
    }
  }
  const [r, a] = Gt(this, M1, wR).call(this);
  n[0] = Pm(n[0] - r, 0, 1), n[1] = Pm(n[1] - a, 0, 1), n[2] = Pm(n[2] + r, 0, 1), n[3] = Pm(n[3] + a, 0, 1), n[2] -= n[0], n[3] -= n[1];
}, Yor = function (n) {
  const [r, a] = Gt(this, M1, wR).call(this);
  yt(this, dK, n);
  const [i, o] = Gt(this, M1, wR).call(this),
    [s, l] = [i - r, o - a],
    d = te(this, l2);
  return d[0] -= s, d[1] -= l, d[2] += 2 * s, d[3] += 2 * l, d;
};

class sJe extends hBt {
  constructor(t) {
    super(), this._viewParameters = t, super.updateProperties({
      fill: "none",
      stroke: _p._defaultLineColor,
      "stroke-opacity": 1,
      "stroke-width": 1,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-miterlimit": 10
    });
  }
  updateSVGProperty(t, n) {
    t === "stroke-width" && (n ?? (n = this["stroke-width"]), n *= this._viewParameters.realScale), super.updateSVGProperty(t, n);
  }
  clone() {
    const t = new sJe(this._viewParameters);
    return t.updateAll(this), t;
  }
}

var oVe, Xor;

const hae = class hae extends Rke {
  constructor(n) {
    super({
      ...n,
      name: "inkEditor"
    });
    qt(this, oVe);
    this._willKeepAspectRatio = !0, this.defaultL10nId = "pdfjs-editor-ink-editor";
  }
  static initialize(n, r) {
    _p.initialize(n, r), this._defaultDrawingOptions = new sJe(r.viewParameters);
  }
  static getDefaultDrawingOptions(n) {
    const r = this._defaultDrawingOptions.clone();
    return r.updateProperties(n), r;
  }
  static get supportMultipleDrawings() {
    return !0;
  }
  static get typesMap() {
    return Ws(this, "typesMap", new Map([[Td.INK_THICKNESS, "stroke-width"], [Td.INK_COLOR, "stroke"], [Td.INK_OPACITY, "stroke-opacity"]]));
  }
  static createDrawerInstance({
    x: n,
    y: r,
    box: [,, a, i],
    rotation: o
  }) {
    return new hli(n, r, a, i, o, this._defaultDrawingOptions["stroke-width"]);
  }
  static deserializeDraw(n, r, a, i, o, s) {
    return BCe.deserialize(n, r, a, i, o, s);
  }
  static async deserialize(n, r, a) {
    let i = null;
    if (n instanceof uBt) {
      const {
        data: {
          inkLists: s,
          rect: l,
          rotation: d,
          id: u,
          color: h,
          opacity: p,
          borderStyle: {
            rawWidth: m
          },
          popupRef: f,
          richText: y,
          contentsObj: b,
          creationDate: v,
          modificationDate: _
        },
        parent: {
          page: {
            pageNumber: w
          }
        }
      } = n;
      i = n = {
        annotationType: nc.INK,
        color: Array.from(h),
        thickness: m,
        opacity: p,
        paths: {
          points: s
        },
        boxes: null,
        pageIndex: w - 1,
        rect: l.slice(0),
        rotation: d,
        annotationElementId: u,
        id: u,
        deleted: !1,
        popupRef: f,
        richText: y,
        comment: (b == null ? void 0 : b.str) || null,
        creationDate: v,
        modificationDate: _
      };
    }
    const o = await super.deserialize(n, r, a);
    return o._initialData = i, n.comment && o.setCommentData(n), o;
  }
  get toolbarButtons() {
    return this._colorPicker || (this._colorPicker = new aUe(this)), [["colorPicker", this._colorPicker]];
  }
  get colorType() {
    return Td.INK_COLOR;
  }
  get colorAndOpacityType() {
    return Td.INK_COLOR_AND_OPACITY;
  }
  get opacityType() {
    return Td.INK_OPACITY;
  }
  updateParams(n, r) {
    if (n === Td.INK_COLOR_AND_OPACITY) {
      this._updateColorAndOpacity(r.color, r.opacity);
      return;
    }
    super.updateParams(n, r);
  }
  static updateDefaultParams(n, r) {
    if (n === Td.INK_COLOR_AND_OPACITY) {
      super.updateDefaultParams(Td.INK_COLOR, r.color), super.updateDefaultParams(Td.INK_OPACITY, r.opacity);
      return;
    }
    super.updateDefaultParams(n, r);
  }
  get color() {
    return this._drawingOptions.stroke;
  }
  get opacity() {
    return this._drawingOptions["stroke-opacity"];
  }
  onScaleChanging() {
    if (!this.parent) return;
    super.onScaleChanging();
    const {
      _drawId: n,
      _drawingOptions: r,
      parent: a
    } = this;
    r.updateSVGProperty("stroke-width"), a.drawLayer.updateProperties(n, r.toSVGProperties());
  }
  static onScaleChangingWhenDrawing() {
    const n = this._currentParent;
    n && (super.onScaleChangingWhenDrawing(), this._defaultDrawingOptions.updateSVGProperty("stroke-width"), n.drawLayer.updateProperties(this._currentDrawId, this._defaultDrawingOptions.toSVGProperties()));
  }
  createDrawingOptions({
    color: n,
    thickness: r,
    opacity: a
  }) {
    this._drawingOptions = hae.getDefaultDrawingOptions({
      stroke: fo.makeHexColor(...n),
      "stroke-width": r,
      "stroke-opacity": a
    });
  }
  serialize(n = !1) {
    if (this.isEmpty()) return null;
    if (this.deleted) return this.serializeDeleted();
    const {
        lines: r,
        points: a
      } = this.serializeDraw(n),
      {
        _drawingOptions: {
          stroke: i,
          "stroke-opacity": o,
          "stroke-width": s
        }
      } = this,
      l = Object.assign(super.serialize(n), {
        color: _p._colorManager.convert(i),
        opacity: o,
        thickness: s,
        paths: {
          lines: r,
          points: a
        }
      });
    return this.addComment(l), n ? (l.isCopy = !0, l) : this.annotationElementId && !Gt(this, oVe, Xor).call(this, l) ? null : (l.id = this.annotationElementId, l);
  }
  renderAnnotationElement(n) {
    if (this.deleted) return n.hide(), null;
    const {
      points: r,
      rect: a
    } = this.serializeDraw(!1);
    return n.updateEdited({
      rect: a,
      thickness: this._drawingOptions["stroke-width"],
      points: r,
      popup: this.comment
    }), null;
  }
};

oVe = new WeakSet(), Xor = function (n) {
  const {
    color: r,
    thickness: a,
    opacity: i,
    pageIndex: o
  } = this._initialData;
  return this.hasEditedComment || this._hasBeenMoved || this._hasBeenResized || n.color.some((s, l) => s !== r[l]) || n.thickness !== a || n.opacity !== i || n.pageIndex !== o;
}, On(hae, "_type", "ink"), On(hae, "_editorType", nc.INK), On(hae, "_defaultDrawingOptions", null);

let L2t = hae;

class O2t extends BCe {
  toSVGPath() {
    let t = super.toSVGPath();
    return t.endsWith("Z") || (t += "Z"), t;
  }
}

jc(5213);

const iMe = 8,
  _fe = 3;

var Fge, uK, Mh, B2t, PC, Jor, Zor, F2t, $7e, esr, tsr, nsr, z2t, U2t, rsr;

let Lne = (Fge = class {
  static extractContoursFromText(t, {
    fontFamily: n,
    fontStyle: r,
    fontWeight: a
  }, i, o, s, l) {
    let d = new OffscreenCanvas(1, 1),
      u = d.getContext("2d", {
        alpha: !1
      });
    const h = 200,
      p = u.font = `${r} ${a} ${h}px ${n}`,
      {
        actualBoundingBoxLeft: m,
        actualBoundingBoxRight: f,
        actualBoundingBoxAscent: y,
        actualBoundingBoxDescent: b,
        fontBoundingBoxAscent: v,
        fontBoundingBoxDescent: _,
        width: w
      } = u.measureText(t),
      k = 1.5,
      A = Math.ceil(Math.max(Math.abs(m) + Math.abs(f) || 0, w) * k),
      S = Math.ceil(Math.max(Math.abs(y) + Math.abs(b) || h, Math.abs(v) + Math.abs(_) || h) * k);
    d = new OffscreenCanvas(A, S), u = d.getContext("2d", {
      alpha: !0,
      willReadFrequently: !0
    }), u.font = p, u.filter = "grayscale(1)", u.fillStyle = "white", u.fillRect(0, 0, A, S), u.fillStyle = "black", u.fillText(t, A * (k - 1) / 2, S * (3 - k) / 2);
    const C = Gt(this, Mh, z2t).call(this, u.getImageData(0, 0, A, S).data),
      I = Gt(this, Mh, nsr).call(this, C),
      E = Gt(this, Mh, U2t).call(this, I),
      M = Gt(this, Mh, F2t).call(this, C, A, S, E);
    return this.processDrawnLines({
      lines: {
        curves: M,
        width: A,
        height: S
      },
      pageWidth: i,
      pageHeight: o,
      rotation: s,
      innerMargin: l,
      mustSmooth: !0,
      areContours: !0
    });
  }
  static process(t, n, r, a, i) {
    const [o, s, l] = Gt(this, Mh, rsr).call(this, t),
      [d, u] = Gt(this, Mh, tsr).call(this, o, s, l, Math.hypot(s, l) * te(this, uK).sigmaSFactor, te(this, uK).sigmaR, te(this, uK).kernelSize),
      h = Gt(this, Mh, U2t).call(this, u),
      p = Gt(this, Mh, F2t).call(this, d, s, l, h);
    return this.processDrawnLines({
      lines: {
        curves: p,
        width: s,
        height: l
      },
      pageWidth: n,
      pageHeight: r,
      rotation: a,
      innerMargin: i,
      mustSmooth: !0,
      areContours: !0
    });
  }
  static processDrawnLines({
    lines: t,
    pageWidth: n,
    pageHeight: r,
    rotation: a,
    innerMargin: i,
    mustSmooth: o,
    areContours: s
  }) {
    a % 180 !== 0 && ([n, r] = [r, n]);
    const {
        curves: l,
        width: d,
        height: u
      } = t,
      h = t.thickness ?? 0,
      p = [],
      m = Math.min(n / d, r / u),
      f = m / n,
      y = m / r,
      b = [];
    for (const {
      points: _
    } of l) {
      const w = o ? Gt(this, Mh, esr).call(this, _) : _;
      if (!w) continue;
      b.push(w);
      const k = w.length,
        A = new Float32Array(k),
        S = new Float32Array(3 * (k === 2 ? 2 : k - 2));
      if (p.push({
        line: S,
        points: A
      }), k === 2) {
        A[0] = w[0] * f, A[1] = w[1] * y, S.set([NaN, NaN, NaN, NaN, A[0], A[1]], 0);
        continue;
      }
      let [C, I, E, M] = w;
      C *= f, I *= y, E *= f, M *= y, A.set([C, I, E, M], 0), S.set([NaN, NaN, NaN, NaN, C, I], 0);
      for (let T = 4; T < k; T += 2) {
        const P = A[T] = w[T] * f,
          R = A[T + 1] = w[T + 1] * y;
        S.set(Uo.createBezierPoints(C, I, E, M, P, R), (T - 2) * 3), [C, I, E, M] = [E, M, P, R];
      }
    }
    if (p.length === 0) return null;
    const v = s ? new O2t() : new BCe();
    return v.build(p, n, r, 1, a, s ? 0 : h, i), {
      outline: v,
      newCurves: b,
      areContours: s,
      thickness: h,
      width: d,
      height: u
    };
  }
  static async compressSignature({
    outlines: t,
    areContours: n,
    thickness: r,
    width: a,
    height: i
  }) {
    let o = 1 / 0,
      s = -1 / 0,
      l = 0;
    for (const _ of t) {
      l += _.length;
      for (let w = 2, k = _.length; w < k; w++) {
        const A = _[w] - _[w - 2];
        o = Math.min(o, A), s = Math.max(s, A);
      }
    }
    let d;
    o >= -128 && s <= 127 ? d = Int8Array : o >= -32768 && s <= 32767 ? d = Int16Array : d = Int32Array;
    const u = t.length,
      h = iMe + _fe * u,
      p = new Uint32Array(h);
    let m = 0;
    p[m++] = h * Uint32Array.BYTES_PER_ELEMENT + (l - 2 * u) * d.BYTES_PER_ELEMENT, p[m++] = 0, p[m++] = a, p[m++] = i, p[m++] = n ? 0 : 1, p[m++] = Math.max(0, Math.floor(r ?? 0)), p[m++] = u, p[m++] = d.BYTES_PER_ELEMENT;
    for (const _ of t) p[m++] = _.length - 2, p[m++] = _[0], p[m++] = _[1];
    const f = new CompressionStream("deflate-raw"),
      y = f.writable.getWriter();
    await y.ready, y.write(p);
    const b = d.prototype.constructor;
    for (const _ of t) {
      const w = new b(_.length - 2);
      for (let k = 2, A = _.length; k < A; k++) w[k - 2] = _[k] - _[k - 2];
      y.write(w);
    }
    return y.close(), (await new Response(f.readable).bytes()).toBase64();
  }
  static async decompressSignature(t) {
    try {
      const n = Uint8Array.fromBase64(t),
        {
          readable: r,
          writable: a
        } = new DecompressionStream("deflate-raw"),
        i = a.getWriter();
      await i.ready, i.write(n).then(async () => {
        await i.ready, await i.close();
      }).catch(() => {});
      let o = null,
        s = 0;
      for await (const w of r) o || (o = new Uint8Array(new Uint32Array(w.buffer, 0, 4)[0])), o.set(w, s), s += w.length;
      const l = new Uint32Array(o.buffer, 0, o.length >> 2),
        d = l[1];
      if (d !== 0) throw new Error(`Invalid version: ${d}`);
      const u = l[2],
        h = l[3],
        p = l[4] === 0,
        m = l[5],
        f = l[6],
        y = l[7],
        b = [],
        v = (iMe + _fe * f) * Uint32Array.BYTES_PER_ELEMENT;
      let _;
      switch (y) {
        case Int8Array.BYTES_PER_ELEMENT:
          _ = new Int8Array(o.buffer, v);
          break;
        case Int16Array.BYTES_PER_ELEMENT:
          _ = new Int16Array(o.buffer, v);
          break;
        case Int32Array.BYTES_PER_ELEMENT:
          _ = new Int32Array(o.buffer, v);
          break;
      }
      s = 0;
      for (let w = 0; w < f; w++) {
        const k = l[_fe * w + iMe],
          A = new Float32Array(k + 2);
        b.push(A);
        for (let S = 0; S < _fe - 1; S++) A[S] = l[_fe * w + iMe + S + 1];
        for (let S = 0; S < k; S++) A[S + 2] = A[S] + _[s++];
      }
      return {
        areContours: p,
        thickness: m,
        outlines: b,
        width: u,
        height: h
      };
    } catch (n) {
      return Vl(`decompressSignature: ${n}`), null;
    }
  }
}, uK = new WeakMap(), Mh = new WeakSet(), B2t = function (t, n, r, a) {
  return r -= t, a -= n, r === 0 ? a > 0 ? 0 : 4 : r === 1 ? a + 6 : 2 - a;
}, PC = new WeakMap(), Jor = function (t, n, r, a, i, o, s) {
  const l = Gt(this, Mh, B2t).call(this, r, a, i, o);
  for (let d = 0; d < 8; d++) {
    const u = (-d + l - s + 16) % 8,
      h = te(this, PC)[2 * u],
      p = te(this, PC)[2 * u + 1];
    if (t[(r + h) * n + (a + p)] !== 0) return u;
  }
  return -1;
}, Zor = function (t, n, r, a, i, o, s) {
  const l = Gt(this, Mh, B2t).call(this, r, a, i, o);
  for (let d = 0; d < 8; d++) {
    const u = (d + l + s + 16) % 8,
      h = te(this, PC)[2 * u],
      p = te(this, PC)[2 * u + 1];
    if (t[(r + h) * n + (a + p)] !== 0) return u;
  }
  return -1;
}, F2t = function (t, n, r, a) {
  const i = t.length,
    o = new Int32Array(i);
  for (let u = 0; u < i; u++) o[u] = t[u] <= a ? 1 : 0;
  for (let u = 1; u < r - 1; u++) o[u * n] = o[u * n + n - 1] = 0;
  for (let u = 0; u < n; u++) o[u] = o[n * r - 1 - u] = 0;
  let s = 1,
    l;
  const d = [];
  for (let u = 1; u < r - 1; u++) {
    l = 1;
    for (let h = 1; h < n - 1; h++) {
      const p = u * n + h,
        m = o[p];
      if (m === 0) continue;
      let f = u,
        y = h;
      if (m === 1 && o[p - 1] === 0) s += 1, y -= 1;else if (m >= 1 && o[p + 1] === 0) s += 1, y += 1, m > 1 && (l = m);else {
        m !== 1 && (l = Math.abs(m));
        continue;
      }
      const b = [h, u],
        v = y === h + 1,
        _ = {
          isHole: v,
          points: b,
          id: s,
          parent: 0
        };
      d.push(_);
      let w;
      for (const T of d) if (T.id === l) {
        w = T;
        break;
      }
      w ? w.isHole ? _.parent = v ? w.parent : l : _.parent = v ? l : w.parent : _.parent = v ? l : 0;
      const k = Gt(this, Mh, Jor).call(this, o, n, u, h, f, y, 0);
      if (k === -1) {
        o[p] = -s, o[p] !== 1 && (l = Math.abs(o[p]));
        continue;
      }
      let A = te(this, PC)[2 * k],
        S = te(this, PC)[2 * k + 1];
      const C = u + A,
        I = h + S;
      f = C, y = I;
      let E = u,
        M = h;
      for (;;) {
        const T = Gt(this, Mh, Zor).call(this, o, n, E, M, f, y, 1);
        A = te(this, PC)[2 * T], S = te(this, PC)[2 * T + 1];
        const P = E + A,
          R = M + S;
        b.push(R, P);
        const j = E * n + M;
        if (o[j + 1] === 0 ? o[j] = -s : o[j] === 1 && (o[j] = s), P === u && R === h && E === C && M === I) {
          o[p] !== 1 && (l = Math.abs(o[p]));
          break;
        } else f = E, y = M, E = P, M = R;
      }
    }
  }
  return d;
}, $7e = function (t, n, r, a) {
  if (r - n <= 4) {
    for (let C = n; C < r - 2; C += 2) a.push(t[C], t[C + 1]);
    return;
  }
  const i = t[n],
    o = t[n + 1],
    s = t[r - 4] - i,
    l = t[r - 3] - o,
    d = Math.hypot(s, l),
    u = s / d,
    h = l / d,
    p = u * o - h * i,
    m = l / s,
    f = 1 / d,
    y = Math.atan(m),
    b = Math.cos(y),
    v = Math.sin(y),
    _ = f * (Math.abs(b) + Math.abs(v)),
    w = f * (1 - _ + _ ** 2),
    k = Math.max(Math.atan(Math.abs(v + b) * w), Math.atan(Math.abs(v - b) * w));
  let A = 0,
    S = n;
  for (let C = n + 2; C < r - 2; C += 2) {
    const I = Math.abs(p - u * t[C + 1] + h * t[C]);
    I > A && (S = C, A = I);
  }
  A > (d * k) ** 2 ? (Gt(this, Mh, $7e).call(this, t, n, S + 2, a), Gt(this, Mh, $7e).call(this, t, S, r, a)) : a.push(i, o);
}, esr = function (t) {
  const n = [],
    r = t.length;
  return Gt(this, Mh, $7e).call(this, t, 0, r, n), n.push(t[r - 2], t[r - 1]), n.length <= 4 ? null : n;
}, tsr = function (t, n, r, a, i, o) {
  const s = new Float32Array(o ** 2),
    l = -2 * a ** 2,
    d = o >> 1;
  for (let y = 0; y < o; y++) {
    const b = (y - d) ** 2;
    for (let v = 0; v < o; v++) s[y * o + v] = Math.exp((b + (v - d) ** 2) / l);
  }
  const u = new Float32Array(256),
    h = -2 * i ** 2;
  for (let y = 0; y < 256; y++) u[y] = Math.exp(y ** 2 / h);
  const p = t.length,
    m = new Uint8Array(p),
    f = new Uint32Array(256);
  for (let y = 0; y < r; y++) for (let b = 0; b < n; b++) {
    const v = y * n + b,
      _ = t[v];
    let w = 0,
      k = 0;
    for (let S = 0; S < o; S++) {
      const C = y + S - d;
      if (!(C < 0 || C >= r)) for (let I = 0; I < o; I++) {
        const E = b + I - d;
        if (E < 0 || E >= n) continue;
        const M = t[C * n + E],
          T = s[S * o + I] * u[Math.abs(M - _)];
        w += M * T, k += T;
      }
    }
    const A = m[v] = Math.round(w / k);
    f[A]++;
  }
  return [m, f];
}, nsr = function (t) {
  const n = new Uint32Array(256);
  for (const r of t) n[r]++;
  return n;
}, z2t = function (t) {
  const n = t.length,
    r = new Uint8ClampedArray(n >> 2);
  let a = -1 / 0,
    i = 1 / 0;
  for (let s = 0, l = r.length; s < l; s++) {
    const d = r[s] = t[s << 2];
    a = Math.max(a, d), i = Math.min(i, d);
  }
  const o = 255 / (a - i);
  for (let s = 0, l = r.length; s < l; s++) r[s] = (r[s] - i) * o;
  return r;
}, U2t = function (t) {
  let n,
    r = -1 / 0,
    a = -1 / 0;
  const i = t.findIndex(l => l !== 0);
  let o = i,
    s = i;
  for (n = i; n < 256; n++) {
    const l = t[n];
    l > r && (n - o > a && (a = n - o, s = n - 1), r = l, o = n);
  }
  for (n = s - 1; n >= 0 && !(t[n] > t[n + 1]); n--);
  return n;
}, rsr = function (t) {
  const n = t,
    {
      width: r,
      height: a
    } = t,
    {
      maxDim: i
    } = te(this, uK);
  let o = r,
    s = a;
  if (r > i || a > i) {
    let p = r,
      m = a,
      f = Math.log2(Math.max(r, a) / i);
    const y = Math.floor(f);
    f = f === y ? y - 1 : y;
    for (let v = 0; v < f; v++) {
      o = Math.ceil(p / 2), s = Math.ceil(m / 2);
      const _ = new OffscreenCanvas(o, s);
      _.getContext("2d").drawImage(t, 0, 0, p, m, 0, 0, o, s), p = o, m = s, t !== n && t.close(), t = _.transferToImageBitmap();
    }
    const b = Math.min(i / o, i / s);
    o = Math.round(o * b), s = Math.round(s * b);
  }
  const d = new OffscreenCanvas(o, s).getContext("2d", {
    willReadFrequently: !0
  });
  d.fillStyle = "white", d.fillRect(0, 0, o, s), d.filter = "grayscale(1)", d.drawImage(t, 0, 0, t.width, t.height, 0, 0, o, s);
  const u = d.getImageData(0, 0, o, s).data;
  return [Gt(this, Mh, z2t).call(this, u), o, s];
}, qt(Fge, Mh), qt(Fge, uK, {
  maxDim: 512,
  sigmaSFactor: .02,
  sigmaR: 25,
  kernelSize: 16
}), qt(Fge, PC, new Int32Array([0, 1, -1, 1, -1, 0, -1, -1, 0, -1, 1, -1, 1, 0, 1, 1])), Fge);

class fBt extends hBt {
  constructor() {
    super(), super.updateProperties({
      fill: _p._defaultLineColor,
      "stroke-width": 0
    });
  }
  clone() {
    const t = new fBt();
    return t.updateAll(this), t;
  }
}

class gBt extends sJe {
  constructor(t) {
    super(t), super.updateProperties({
      stroke: _p._defaultLineColor,
      "stroke-width": 1
    });
  }
  clone() {
    const t = new gBt(this._viewParameters);
    return t.updateAll(this), t;
  }
}

var GB, f6, VB, hK;

const OA = class OA extends Rke {
  constructor(n) {
    super({
      ...n,
      mustBeCommitted: !0,
      name: "signatureEditor"
    });
    qt(this, GB, !1);
    qt(this, f6, null);
    qt(this, VB, null);
    qt(this, hK, null);
    this._willKeepAspectRatio = !0, yt(this, VB, n.signatureData || null), yt(this, f6, null), this.defaultL10nId = "pdfjs-editor-signature-editor1";
  }
  static initialize(n, r) {
    _p.initialize(n, r), this._defaultDrawingOptions = new fBt(), this._defaultDrawnSignatureOptions = new gBt(r.viewParameters);
  }
  static getDefaultDrawingOptions(n) {
    const r = this._defaultDrawingOptions.clone();
    return r.updateProperties(n), r;
  }
  static get supportMultipleDrawings() {
    return !1;
  }
  static get typesMap() {
    return Ws(this, "typesMap", new Map());
  }
  static get isDrawer() {
    return !1;
  }
  get telemetryFinalData() {
    return {
      type: "signature",
      hasDescription: !!te(this, f6)
    };
  }
  static computeTelemetryFinalData(n) {
    const r = n.get("hasDescription");
    return {
      hasAltText: r.get(!0) ?? 0,
      hasNoAltText: r.get(!1) ?? 0
    };
  }
  get isResizable() {
    return !0;
  }
  onScaleChanging() {
    this._drawId !== null && super.onScaleChanging();
  }
  render() {
    if (this.div) return this.div;
    let n, r;
    const {
      _isCopy: a
    } = this;
    if (a && (this._isCopy = !1, n = this.x, r = this.y), super.render(), this._drawId === null) {
      if (te(this, VB)) {
        const {
            lines: i,
            mustSmooth: o,
            areContours: s,
            description: l,
            uuid: d,
            heightInPage: u
          } = te(this, VB),
          {
            rawDims: {
              pageWidth: h,
              pageHeight: p
            },
            rotation: m
          } = this.parent.viewport,
          f = Lne.processDrawnLines({
            lines: i,
            pageWidth: h,
            pageHeight: p,
            rotation: m,
            innerMargin: OA._INNER_MARGIN,
            mustSmooth: o,
            areContours: s
          });
        this.addSignature(f, u, l, d);
      } else this.div.setAttribute("data-l10n-args", JSON.stringify({
        description: ""
      })), this.div.hidden = !0, this._uiManager.getSignature(this);
    } else this.div.setAttribute("data-l10n-args", JSON.stringify({
      description: te(this, f6) || ""
    }));
    return a && (this._isCopy = !0, this._moveAfterPaste(n, r)), this.div;
  }
  setUuid(n) {
    yt(this, hK, n), this.addEditToolbar();
  }
  getUuid() {
    return te(this, hK);
  }
  get description() {
    return te(this, f6);
  }
  set description(n) {
    yt(this, f6, n), this.div && (this.div.setAttribute("data-l10n-args", JSON.stringify({
      description: n
    })), super.addEditToolbar().then(r => {
      r == null || r.updateEditSignatureButton(n);
    }));
  }
  getSignaturePreview() {
    const {
        newCurves: n,
        areContours: r,
        thickness: a,
        width: i,
        height: o
      } = te(this, VB),
      s = Math.max(i, o),
      l = Lne.processDrawnLines({
        lines: {
          curves: n.map(d => ({
            points: d
          })),
          thickness: a,
          width: i,
          height: o
        },
        pageWidth: s,
        pageHeight: s,
        rotation: 0,
        innerMargin: 0,
        mustSmooth: !1,
        areContours: r
      });
    return {
      areContours: r,
      outline: l.outline
    };
  }
  get toolbarButtons() {
    return this._uiManager.signatureManager ? [["editSignature", this._uiManager.signatureManager]] : super.toolbarButtons;
  }
  addSignature(n, r, a, i) {
    const {
        x: o,
        y: s
      } = this,
      {
        outline: l
      } = yt(this, VB, n);
    yt(this, GB, l instanceof O2t), this.description = a;
    let d;
    te(this, GB) ? d = OA.getDefaultDrawingOptions() : (d = OA._defaultDrawnSignatureOptions.clone(), d.updateProperties({
      "stroke-width": l.thickness
    })), this._addOutlines({
      drawOutlines: l,
      drawingOptions: d
    });
    const [, u] = this.pageDimensions;
    let h = r / u;
    h = h >= 1 ? .5 : h, this.width *= h / this.height, this.width >= 1 && (h *= .9 / this.width, this.width = .9), this.height = h, this.setDims(), this.x = o, this.y = s, this.center(), this._onResized(), this.onScaleChanging(), this.rotate(), this._uiManager.addToAnnotationStorage(this), this.setUuid(i), this._reportTelemetry({
      action: "pdfjs.signature.inserted",
      data: {
        hasBeenSaved: !!i,
        hasDescription: !!a
      }
    }), this.div.hidden = !1;
  }
  getFromImage(n) {
    const {
      rawDims: {
        pageWidth: r,
        pageHeight: a
      },
      rotation: i
    } = this.parent.viewport;
    return Lne.process(n, r, a, i, OA._INNER_MARGIN);
  }
  getFromText(n, r) {
    const {
      rawDims: {
        pageWidth: a,
        pageHeight: i
      },
      rotation: o
    } = this.parent.viewport;
    return Lne.extractContoursFromText(n, r, a, i, o, OA._INNER_MARGIN);
  }
  getDrawnSignature(n) {
    const {
      rawDims: {
        pageWidth: r,
        pageHeight: a
      },
      rotation: i
    } = this.parent.viewport;
    return Lne.processDrawnLines({
      lines: n,
      pageWidth: r,
      pageHeight: a,
      rotation: i,
      innerMargin: OA._INNER_MARGIN,
      mustSmooth: !1,
      areContours: !1
    });
  }
  createDrawingOptions({
    areContours: n,
    thickness: r
  }) {
    n ? this._drawingOptions = OA.getDefaultDrawingOptions() : (this._drawingOptions = OA._defaultDrawnSignatureOptions.clone(), this._drawingOptions.updateProperties({
      "stroke-width": r
    }));
  }
  serialize(n = !1) {
    if (this.isEmpty()) return null;
    const {
        lines: r,
        points: a
      } = this.serializeDraw(n),
      {
        _drawingOptions: {
          "stroke-width": i
        }
      } = this,
      o = Object.assign(super.serialize(n), {
        isSignature: !0,
        areContours: te(this, GB),
        color: [0, 0, 0],
        thickness: te(this, GB) ? 0 : i
      });
    return this.addComment(o), n ? (o.paths = {
      lines: r,
      points: a
    }, o.uuid = te(this, hK), o.isCopy = !0) : o.lines = r, te(this, f6) && (o.accessibilityData = {
      type: "Figure",
      alt: te(this, f6)
    }), o;
  }
  static deserializeDraw(n, r, a, i, o, s) {
    return s.areContours ? O2t.deserialize(n, r, a, i, o, s) : BCe.deserialize(n, r, a, i, o, s);
  }
  static async deserialize(n, r, a) {
    var o;
    const i = await super.deserialize(n, r, a);
    return yt(i, GB, n.areContours), i.description = ((o = n.accessibilityData) == null ? void 0 : o.alt) || "", yt(i, hK, n.uuid), i;
  }
};

GB = new WeakMap(), f6 = new WeakMap(), VB = new WeakMap(), hK = new WeakMap(), On(OA, "_type", "signature"), On(OA, "_editorType", nc.SIGNATURE), On(OA, "_defaultDrawingOptions", null);

let $2t = OA;

var lf, cv, HB, vN, WB, Hse, wN, pK, g6, eS, Wse, Ru, gye, yye, G7e, V7e, H7e, V2t, W7e, asr;

class G2t extends _p {
  constructor(n) {
    super({
      ...n,
      name: "stampEditor"
    });
    qt(this, Ru);
    qt(this, lf, null);
    qt(this, cv, null);
    qt(this, HB, null);
    qt(this, vN, null);
    qt(this, WB, null);
    qt(this, Hse, "");
    qt(this, wN, null);
    qt(this, pK, !1);
    qt(this, g6, null);
    qt(this, eS, !1);
    qt(this, Wse, !1);
    yt(this, vN, n.bitmapUrl), yt(this, WB, n.bitmapFile), this.defaultL10nId = "pdfjs-editor-stamp-editor";
  }
  static initialize(n, r) {
    _p.initialize(n, r);
  }
  static isHandlingMimeForPasting(n) {
    return dxt.includes(n);
  }
  static paste(n, r) {
    r.pasteEditor({
      mode: nc.STAMP
    }, {
      bitmapFile: n.getAsFile()
    });
  }
  altTextFinish() {
    this._uiManager.useNewAltTextFlow && (this.div.hidden = !1), super.altTextFinish();
  }
  get telemetryFinalData() {
    var n;
    return {
      type: "stamp",
      hasAltText: !!((n = this.altTextData) != null && n.altText)
    };
  }
  static computeTelemetryFinalData(n) {
    const r = n.get("hasAltText");
    return {
      hasAltText: r.get(!0) ?? 0,
      hasNoAltText: r.get(!1) ?? 0
    };
  }
  async mlGuessAltText(n = null, r = !0) {
    if (this.hasAltTextData()) return null;
    const {
      mlManager: a
    } = this._uiManager;
    if (!a) throw new Error("No ML.");
    if (!(await a.isEnabledFor("altText"))) throw new Error("ML isn't enabled for alt text.");
    const {
        data: i,
        width: o,
        height: s
      } = n || this.copyCanvas(null, null, !0).imageData,
      l = await a.guess({
        name: "altText",
        request: {
          data: i,
          width: o,
          height: s,
          channels: i.length / (o * s)
        }
      });
    if (!l) throw new Error("No response from the AI service.");
    if (l.error) throw new Error("Error from the AI service.");
    if (l.cancel) return null;
    if (!l.output) throw new Error("No valid response from the AI service.");
    const d = l.output;
    return await this.setGuessedAltText(d), r && !this.hasAltTextData() && (this.altTextData = {
      alt: d,
      decorative: !1
    }), d;
  }
  remove() {
    var n;
    te(this, cv) && (yt(this, lf, null), this._uiManager.imageManager.deleteId(te(this, cv)), (n = te(this, wN)) == null || n.remove(), yt(this, wN, null), te(this, g6) && (clearTimeout(te(this, g6)), yt(this, g6, null))), super.remove();
  }
  rebuild() {
    if (!this.parent) {
      te(this, cv) && Gt(this, Ru, G7e).call(this);
      return;
    }
    super.rebuild(), this.div !== null && (te(this, cv) && te(this, wN) === null && Gt(this, Ru, G7e).call(this), this.isAttachedToDOM || this.parent.add(this));
  }
  onceAdded(n) {
    this._isDraggable = !0, n && this.div.focus();
  }
  isEmpty() {
    return !(te(this, HB) || te(this, lf) || te(this, vN) || te(this, WB) || te(this, cv) || te(this, pK));
  }
  get toolbarButtons() {
    return [["altText", this.createAltText()]];
  }
  get isResizable() {
    return !0;
  }
  render() {
    if (this.div) return this.div;
    let n, r;
    return this._isCopy && (n = this.x, r = this.y), super.render(), this.div.hidden = !0, this.createAltText(), te(this, pK) || (te(this, lf) ? Gt(this, Ru, V7e).call(this) : Gt(this, Ru, G7e).call(this)), this._isCopy && this._moveAfterPaste(n, r), this._uiManager.addShouldRescale(this), this.div;
  }
  setCanvas(n, r) {
    const {
      id: a,
      bitmap: i
    } = this._uiManager.imageManager.getFromCanvas(n, r);
    r.remove(), a && this._uiManager.imageManager.isValidId(a) && (yt(this, cv, a), i && yt(this, lf, i), yt(this, pK, !1), Gt(this, Ru, V7e).call(this));
  }
  _onResized() {
    this.onScaleChanging();
  }
  onScaleChanging() {
    if (!this.parent) return;
    te(this, g6) !== null && clearTimeout(te(this, g6)), yt(this, g6, setTimeout(() => {
      yt(this, g6, null), Gt(this, Ru, V2t).call(this);
    }, 200));
  }
  copyCanvas(n, r, a = !1) {
    n || (n = 224);
    const {
        width: i,
        height: o
      } = te(this, lf),
      s = new h$();
    let l = te(this, lf),
      d = i,
      u = o,
      h = null;
    if (r) {
      if (i > r || o > r) {
        const C = Math.min(r / i, r / o);
        d = Math.floor(i * C), u = Math.floor(o * C);
      }
      h = document.createElement("canvas");
      const m = h.width = Math.ceil(d * s.sx),
        f = h.height = Math.ceil(u * s.sy);
      te(this, eS) || (l = Gt(this, Ru, H7e).call(this, m, f));
      const y = h.getContext("2d");
      y.filter = this._uiManager.hcmFilter;
      let b = "white",
        v = "#cfcfd8";
      this._uiManager.hcmFilter !== "none" ? v = "black" : xoi.isDarkMode && (b = "#8f8f9d", v = "#42414d");
      const _ = 15,
        w = _ * s.sx,
        k = _ * s.sy,
        A = new OffscreenCanvas(w * 2, k * 2),
        S = A.getContext("2d");
      S.fillStyle = b, S.fillRect(0, 0, w * 2, k * 2), S.fillStyle = v, S.fillRect(0, 0, w, k), S.fillRect(w, k, w, k), y.fillStyle = y.createPattern(A, "repeat"), y.fillRect(0, 0, m, f), y.drawImage(l, 0, 0, l.width, l.height, 0, 0, m, f);
    }
    let p = null;
    if (a) {
      let m, f;
      if (s.symmetric && l.width < n && l.height < n) m = l.width, f = l.height;else if (l = te(this, lf), i > n || o > n) {
        const v = Math.min(n / i, n / o);
        m = Math.floor(i * v), f = Math.floor(o * v), te(this, eS) || (l = Gt(this, Ru, H7e).call(this, m, f));
      }
      const b = new OffscreenCanvas(m, f).getContext("2d", {
        willReadFrequently: !0
      });
      b.drawImage(l, 0, 0, l.width, l.height, 0, 0, m, f), p = {
        width: m,
        height: f,
        data: b.getImageData(0, 0, m, f).data
      };
    }
    return {
      canvas: h,
      width: d,
      height: u,
      imageData: p
    };
  }
  static async deserialize(n, r, a) {
    var b;
    let i = null,
      o = !1;
    if (n instanceof Aor) {
      const {
        data: {
          rect: v,
          rotation: _,
          id: w,
          structParent: k,
          popupRef: A,
          richText: S,
          contentsObj: C,
          creationDate: I,
          modificationDate: E
        },
        container: M,
        parent: {
          page: {
            pageNumber: T
          }
        },
        canvas: P
      } = n;
      let R, j;
      P ? (delete n.canvas, {
        id: R,
        bitmap: j
      } = a.imageManager.getFromCanvas(M.id, P), P.remove()) : (o = !0, n._hasNoCanvas = !0);
      const B = ((b = await r._structTree.getAriaAttributes(`${Ure}${w}`)) == null ? void 0 : b.get("aria-label")) || "";
      i = n = {
        annotationType: nc.STAMP,
        bitmapId: R,
        bitmap: j,
        pageIndex: T - 1,
        rect: v.slice(0),
        rotation: _,
        annotationElementId: w,
        id: w,
        deleted: !1,
        accessibilityData: {
          decorative: !1,
          altText: B
        },
        isSvg: !1,
        structParent: k,
        popupRef: A,
        richText: S,
        comment: (C == null ? void 0 : C.str) || null,
        creationDate: I,
        modificationDate: E
      };
    }
    const s = await super.deserialize(n, r, a),
      {
        rect: l,
        bitmap: d,
        bitmapUrl: u,
        bitmapId: h,
        isSvg: p,
        accessibilityData: m
      } = n;
    o ? (a.addMissingCanvas(n.id, s), yt(s, pK, !0)) : h && a.imageManager.isValidId(h) ? (yt(s, cv, h), d && yt(s, lf, d)) : yt(s, vN, u), yt(s, eS, p);
    const [f, y] = s.pageDimensions;
    return s.width = (l[2] - l[0]) / f, s.height = (l[3] - l[1]) / y, m && (s.altTextData = m), s._initialData = i, n.comment && s.setCommentData(n), yt(s, Wse, !!i), s;
  }
  serialize(n = !1, r = null) {
    if (this.isEmpty()) return null;
    if (this.deleted) return this.serializeDeleted();
    const a = Object.assign(super.serialize(n), {
      bitmapId: te(this, cv),
      isSvg: te(this, eS)
    });
    if (this.addComment(a), n) return a.bitmapUrl = Gt(this, Ru, W7e).call(this, !0), a.accessibilityData = this.serializeAltText(!0), a.isCopy = !0, a;
    const {
      decorative: i,
      altText: o
    } = this.serializeAltText(!1);
    if (!i && o && (a.accessibilityData = {
      type: "Figure",
      alt: o
    }), this.annotationElementId) {
      const l = Gt(this, Ru, asr).call(this, a);
      return l.isSame ? null : (l.isSameAltText ? delete a.accessibilityData : a.accessibilityData.structParent = this._initialData.structParent ?? -1, a.id = this.annotationElementId, delete a.bitmapId, a);
    }
    if (r === null) return a;
    r.stamps || (r.stamps = new Map());
    const s = te(this, eS) ? (a.rect[2] - a.rect[0]) * (a.rect[3] - a.rect[1]) : null;
    if (!r.stamps.has(te(this, cv))) r.stamps.set(te(this, cv), {
      area: s,
      serialized: a
    }), a.bitmap = Gt(this, Ru, W7e).call(this, !1);else if (te(this, eS)) {
      const l = r.stamps.get(te(this, cv));
      s > l.area && (l.area = s, l.serialized.bitmap.close(), l.serialized.bitmap = Gt(this, Ru, W7e).call(this, !1));
    }
    return a;
  }
  renderAnnotationElement(n) {
    return this.deleted ? (n.hide(), null) : (n.updateEdited({
      rect: this.getPDFRect(),
      popup: this.comment
    }), null);
  }
}

lf = new WeakMap(), cv = new WeakMap(), HB = new WeakMap(), vN = new WeakMap(), WB = new WeakMap(), Hse = new WeakMap(), wN = new WeakMap(), pK = new WeakMap(), g6 = new WeakMap(), eS = new WeakMap(), Wse = new WeakMap(), Ru = new WeakSet(), gye = function (n, r = !1) {
  if (!n) {
    this.remove();
    return;
  }
  yt(this, lf, n.bitmap), r || (yt(this, cv, n.id), yt(this, eS, n.isSvg)), n.file && yt(this, Hse, n.file.name), Gt(this, Ru, V7e).call(this);
}, yye = function () {
  if (yt(this, HB, null), this._uiManager.enableWaiting(!1), !!te(this, wN)) {
    if (this._uiManager.useNewAltTextWhenAddingImage && this._uiManager.useNewAltTextFlow && te(this, lf)) {
      this.addEditToolbar().then(() => {
        this._editToolbar.hide(), this._uiManager.editAltText(this, !0);
      });
      return;
    }
    if (!this._uiManager.useNewAltTextWhenAddingImage && this._uiManager.useNewAltTextFlow && te(this, lf)) {
      this._reportTelemetry({
        action: "pdfjs.image.image_added",
        data: {
          alt_text_modal: !1,
          alt_text_type: "empty"
        }
      });
      try {
        this.mlGuessAltText();
      } catch {}
    }
    this.div.focus();
  }
}, G7e = function () {
  if (te(this, cv)) {
    this._uiManager.enableWaiting(!0), this._uiManager.imageManager.getFromId(te(this, cv)).then(a => Gt(this, Ru, gye).call(this, a, !0)).finally(() => Gt(this, Ru, yye).call(this));
    return;
  }
  if (te(this, vN)) {
    const a = te(this, vN);
    yt(this, vN, null), this._uiManager.enableWaiting(!0), yt(this, HB, this._uiManager.imageManager.getFromUrl(a).then(i => Gt(this, Ru, gye).call(this, i)).finally(() => Gt(this, Ru, yye).call(this)));
    return;
  }
  if (te(this, WB)) {
    const a = te(this, WB);
    yt(this, WB, null), this._uiManager.enableWaiting(!0), yt(this, HB, this._uiManager.imageManager.getFromFile(a).then(i => Gt(this, Ru, gye).call(this, i)).finally(() => Gt(this, Ru, yye).call(this)));
    return;
  }
  const n = document.createElement("input");
  n.type = "file", n.accept = dxt.join(",");
  const r = this._uiManager._signal;
  yt(this, HB, new Promise(a => {
    n.addEventListener("change", async () => {
      if (!n.files || n.files.length === 0) this.remove();else {
        this._uiManager.enableWaiting(!0);
        const i = await this._uiManager.imageManager.getFromFile(n.files[0]);
        this._reportTelemetry({
          action: "pdfjs.image.image_selected",
          data: {
            alt_text_modal: this._uiManager.useNewAltTextFlow
          }
        }), Gt(this, Ru, gye).call(this, i);
      }
      a();
    }, {
      signal: r
    }), n.addEventListener("cancel", () => {
      this.remove(), a();
    }, {
      signal: r
    });
  }).finally(() => Gt(this, Ru, yye).call(this))), n.click();
}, V7e = function () {
  var d;
  const {
    div: n
  } = this;
  let {
    width: r,
    height: a
  } = te(this, lf);
  const [i, o] = this.pageDimensions,
    s = .75;
  if (this.width) r = this.width * i, a = this.height * o;else if (r > s * i || a > s * o) {
    const u = Math.min(s * i / r, s * o / a);
    r *= u, a *= u;
  }
  this._uiManager.enableWaiting(!1);
  const l = yt(this, wN, document.createElement("canvas"));
  l.setAttribute("role", "img"), this.addContainer(l), this.width = r / i, this.height = a / o, this.setDims(), (d = this._initialOptions) != null && d.isCentered ? this.center() : this.fixAndSetPosition(), this._initialOptions = null, (!this._uiManager.useNewAltTextWhenAddingImage || !this._uiManager.useNewAltTextFlow || this.annotationElementId) && (n.hidden = !1), Gt(this, Ru, V2t).call(this), te(this, Wse) || (this.parent.addUndoableEditor(this), yt(this, Wse, !0)), this._reportTelemetry({
    action: "inserted_image"
  }), te(this, Hse) && this.div.setAttribute("aria-description", te(this, Hse)), this.annotationElementId || this._uiManager.a11yAlert(_p._l10nAlert.stamp);
}, H7e = function (n, r) {
  const {
    width: a,
    height: i
  } = te(this, lf);
  let o = a,
    s = i,
    l = te(this, lf);
  for (; o > 2 * n || s > 2 * r;) {
    const d = o,
      u = s;
    o > 2 * n && (o = Math.ceil(o / 2)), s > 2 * r && (s = Math.ceil(s / 2));
    const h = new OffscreenCanvas(o, s);
    h.getContext("2d").drawImage(l, 0, 0, d, u, 0, 0, o, s), l = h.transferToImageBitmap();
  }
  return l;
}, V2t = function () {
  const [n, r] = this.parentDimensions,
    {
      width: a,
      height: i
    } = this,
    o = new h$(),
    s = Math.ceil(a * n * o.sx),
    l = Math.ceil(i * r * o.sy),
    d = te(this, wN);
  if (!d || d.width === s && d.height === l) return;
  d.width = s, d.height = l;
  const u = te(this, eS) ? te(this, lf) : Gt(this, Ru, H7e).call(this, s, l),
    h = d.getContext("2d");
  h.filter = this._uiManager.hcmFilter, h.drawImage(u, 0, 0, u.width, u.height, 0, 0, s, l);
}, W7e = function (n) {
  if (n) {
    if (te(this, eS)) {
      const i = this._uiManager.imageManager.getSvgUrl(te(this, cv));
      if (i) return i;
    }
    const r = document.createElement("canvas");
    return {
      width: r.width,
      height: r.height
    } = te(this, lf), r.getContext("2d").drawImage(te(this, lf), 0, 0), r.toDataURL();
  }
  if (te(this, eS)) {
    const [r, a] = this.pageDimensions,
      i = Math.round(this.width * r * Dde.PDF_TO_CSS_UNITS),
      o = Math.round(this.height * a * Dde.PDF_TO_CSS_UNITS),
      s = new OffscreenCanvas(i, o);
    return s.getContext("2d").drawImage(te(this, lf), 0, 0, te(this, lf).width, te(this, lf).height, 0, 0, i, o), s.transferToImageBitmap();
  }
  return structuredClone(te(this, lf));
}, asr = function (n) {
  var s;
  const {
      pageIndex: r,
      accessibilityData: {
        altText: a
      }
    } = this._initialData,
    i = n.pageIndex === r,
    o = (((s = n.accessibilityData) == null ? void 0 : s.alt) || "") === a;
  return {
    isSame: !this.hasEditedComment && !this._hasBeenMoved && !this._hasBeenResized && i && o,
    isSameAltText: o
  };
}, On(G2t, "_type", "stamp"), On(G2t, "_editorType", nc.STAMP);

var mK, qse, qB, KB, xN, Y_, QB, Kse, Qse, RC, _N, X_, kN, YB, Yse, ms, ck, XB, zp, H2t, isr, R8, W2t, q2t, q7e;

let pli = (ck = class {
  constructor({
    uiManager: t,
    pageIndex: n,
    div: r,
    structTreeLayer: a,
    accessibilityManager: i,
    annotationLayer: o,
    drawLayer: s,
    textLayer: l,
    viewport: d,
    l10n: u
  }) {
    qt(this, zp);
    qt(this, mK);
    qt(this, qse, !1);
    qt(this, qB, null);
    qt(this, KB, null);
    qt(this, xN, null);
    qt(this, Y_, new Map());
    qt(this, QB, !1);
    qt(this, Kse, !1);
    qt(this, Qse, !1);
    qt(this, RC, null);
    qt(this, _N, null);
    qt(this, X_, null);
    qt(this, kN, null);
    qt(this, YB, null);
    qt(this, Yse, -1);
    qt(this, ms);
    const h = [...te(ck, XB).values()];
    if (!ck._initialized) {
      ck._initialized = !0;
      for (const p of h) p.initialize(u, t);
    }
    t.registerEditorTypes(h), yt(this, ms, t), this.pageIndex = n, this.div = r, yt(this, mK, i), yt(this, qB, o), this.viewport = d, yt(this, X_, l), this.drawLayer = s, this._structTree = a, te(this, ms).addLayer(this);
  }
  get isEmpty() {
    return te(this, Y_).size === 0;
  }
  get isInvisible() {
    return this.isEmpty && te(this, ms).getMode() === nc.NONE;
  }
  updateToolbar(t) {
    te(this, ms).updateToolbar(t);
  }
  updateMode(t = te(this, ms).getMode()) {
    switch (Gt(this, zp, q7e).call(this), t) {
      case nc.NONE:
        this.div.classList.toggle("nonEditing", !0), this.disableTextSelection(), this.togglePointerEvents(!1), this.toggleAnnotationLayerPointerEvents(!0), this.disableClick();
        return;
      case nc.INK:
        this.disableTextSelection(), this.togglePointerEvents(!0), this.enableClick();
        break;
      case nc.HIGHLIGHT:
        this.enableTextSelection(), this.togglePointerEvents(!1), this.disableClick();
        break;
      default:
        this.disableTextSelection(), this.togglePointerEvents(!0), this.enableClick();
    }
    this.toggleAnnotationLayerPointerEvents(!1);
    const {
      classList: n
    } = this.div;
    if (n.toggle("nonEditing", !1), t === nc.POPUP) n.toggle("commentEditing", !0);else {
      n.toggle("commentEditing", !1);
      for (const r of te(ck, XB).values()) n.toggle(`${r._type}Editing`, t === r._editorType);
    }
    this.div.hidden = !1;
  }
  hasTextLayer(t) {
    var n;
    return t === ((n = te(this, X_)) == null ? void 0 : n.div);
  }
  setEditingState(t) {
    te(this, ms).setEditingState(t);
  }
  addCommands(t) {
    te(this, ms).addCommands(t);
  }
  cleanUndoStack(t) {
    te(this, ms).cleanUndoStack(t);
  }
  toggleDrawing(t = !1) {
    this.div.classList.toggle("drawing", !t);
  }
  togglePointerEvents(t = !1) {
    this.div.classList.toggle("disabled", !t);
  }
  toggleAnnotationLayerPointerEvents(t = !1) {
    var n;
    (n = te(this, qB)) == null || n.togglePointerEvents(t);
  }
  async enable() {
    var r;
    yt(this, Qse, !0), this.div.tabIndex = 0, this.togglePointerEvents(!0), this.div.classList.toggle("nonEditing", !1), (r = te(this, YB)) == null || r.abort(), yt(this, YB, null);
    const t = new Set();
    for (const a of te(this, zp, H2t)) a.enableEditing(), a.show(!0), a.annotationElementId && (te(this, ms).removeChangedExistingAnnotation(a), t.add(a.annotationElementId));
    const n = te(this, qB);
    if (n) for (const a of n.getEditableAnnotations()) {
      if (a.hide(), te(this, ms).isDeletedAnnotationElement(a.data.id) || t.has(a.data.id)) continue;
      const i = await this.deserialize(a);
      i && (this.addOrRebuild(i), i.enableEditing());
    }
    yt(this, Qse, !1), te(this, ms)._eventBus.dispatch("editorsrendered", {
      source: this,
      pageNumber: this.pageIndex + 1
    });
  }
  disable() {
    var a;
    if (yt(this, Kse, !0), this.div.tabIndex = -1, this.togglePointerEvents(!1), this.div.classList.toggle("nonEditing", !0), te(this, X_) && !te(this, YB)) {
      yt(this, YB, new AbortController());
      const i = te(this, ms).combinedSignal(te(this, YB));
      te(this, X_).div.addEventListener("pointerdown", o => {
        const {
            clientX: l,
            clientY: d,
            timeStamp: u
          } = o,
          h = te(this, Yse);
        if (u - h > 500) {
          yt(this, Yse, u);
          return;
        }
        yt(this, Yse, -1);
        const {
          classList: p
        } = this.div;
        p.toggle("getElements", !0);
        const m = document.elementsFromPoint(l, d);
        if (p.toggle("getElements", !1), !this.div.contains(m[0])) return;
        let f;
        const y = new RegExp(`^${jde}[0-9]+$`);
        for (const v of m) if (y.test(v.id)) {
          f = v.id;
          break;
        }
        if (!f) return;
        const b = te(this, Y_).get(f);
        (b == null ? void 0 : b.annotationElementId) === null && (gb(o), b.dblclick(o));
      }, {
        signal: i,
        capture: !0
      });
    }
    const t = te(this, qB),
      n = [];
    if (t) {
      const i = new Map(),
        o = new Map();
      for (const s of te(this, zp, H2t)) {
        if (s.disableEditing(), !s.annotationElementId) {
          n.push(s);
          continue;
        }
        if (s.serialize() !== null) {
          i.set(s.annotationElementId, s);
          continue;
        } else o.set(s.annotationElementId, s);
        (a = this.getEditableAnnotation(s.annotationElementId)) == null || a.show(), s.remove();
      }
      for (const s of t.getEditableAnnotations()) {
        const {
          id: l
        } = s.data;
        if (te(this, ms).isDeletedAnnotationElement(l)) {
          s.updateEdited({
            deleted: !0
          });
          continue;
        }
        let d = o.get(l);
        if (d) {
          d.resetAnnotationElement(s), d.show(!1), s.show();
          continue;
        }
        d = i.get(l), d && (te(this, ms).addChangedExistingAnnotation(d), d.renderAnnotationElement(s) && d.show(!1)), s.show();
      }
    }
    Gt(this, zp, q7e).call(this), this.isEmpty && (this.div.hidden = !0);
    const {
      classList: r
    } = this.div;
    for (const i of te(ck, XB).values()) r.remove(`${i._type}Editing`);
    this.disableTextSelection(), this.toggleAnnotationLayerPointerEvents(!0), t == null || t.updateFakeAnnotations(n), yt(this, Kse, !1);
  }
  getEditableAnnotation(t) {
    var n;
    return ((n = te(this, qB)) == null ? void 0 : n.getEditableAnnotation(t)) || null;
  }
  setActiveEditor(t) {
    te(this, ms).getActive() !== t && te(this, ms).setActiveEditor(t);
  }
  enableTextSelection() {
    var t;
    if (this.div.tabIndex = -1, (t = te(this, X_)) != null && t.div && !te(this, kN)) {
      yt(this, kN, new AbortController());
      const n = te(this, ms).combinedSignal(te(this, kN));
      te(this, X_).div.addEventListener("pointerdown", Gt(this, zp, isr).bind(this), {
        signal: n
      }), te(this, X_).div.classList.add("highlighting");
    }
  }
  disableTextSelection() {
    var t;
    this.div.tabIndex = 0, (t = te(this, X_)) != null && t.div && te(this, kN) && (te(this, kN).abort(), yt(this, kN, null), te(this, X_).div.classList.remove("highlighting"));
  }
  enableClick() {
    if (te(this, KB)) return;
    yt(this, KB, new AbortController());
    const t = te(this, ms).combinedSignal(te(this, KB));
    this.div.addEventListener("pointerdown", this.pointerdown.bind(this), {
      signal: t
    });
    const n = this.pointerup.bind(this);
    this.div.addEventListener("pointerup", n, {
      signal: t
    }), this.div.addEventListener("pointercancel", n, {
      signal: t
    });
  }
  disableClick() {
    var t;
    (t = te(this, KB)) == null || t.abort(), yt(this, KB, null);
  }
  attach(t) {
    te(this, Y_).set(t.id, t);
    const {
      annotationElementId: n
    } = t;
    n && te(this, ms).isDeletedAnnotationElement(n) && te(this, ms).removeDeletedAnnotationElement(t);
  }
  detach(t) {
    var n;
    te(this, Y_).delete(t.id), (n = te(this, mK)) == null || n.removePointerInTextLayer(t.contentDiv), !te(this, Kse) && t.annotationElementId && te(this, ms).addDeletedAnnotationElement(t);
  }
  remove(t) {
    this.detach(t), te(this, ms).removeEditor(t), t.div.remove(), t.isAttachedToDOM = !1;
  }
  changeParent(t) {
    var n;
    t.parent !== this && (t.parent && t.annotationElementId && (te(this, ms).addDeletedAnnotationElement(t), _p.deleteAnnotationElement(t), t.annotationElementId = null), this.attach(t), (n = t.parent) == null || n.detach(t), t.setParent(this), t.div && t.isAttachedToDOM && (t.div.remove(), this.div.append(t.div)));
  }
  add(t) {
    if (!(t.parent === this && t.isAttachedToDOM)) {
      if (this.changeParent(t), te(this, ms).addEditor(t), this.attach(t), !t.isAttachedToDOM) {
        const n = t.render();
        this.div.append(n), t.isAttachedToDOM = !0;
      }
      t.fixAndSetPosition(), t.onceAdded(!te(this, Qse)), te(this, ms).addToAnnotationStorage(t), t._reportTelemetry(t.telemetryInitialData);
    }
  }
  moveEditorInDOM(t) {
    var r;
    if (!t.isAttachedToDOM) return;
    const {
      activeElement: n
    } = document;
    t.div.contains(n) && !te(this, xN) && (t._focusEventsAllowed = !1, yt(this, xN, setTimeout(() => {
      yt(this, xN, null), t.div.contains(document.activeElement) ? t._focusEventsAllowed = !0 : (t.div.addEventListener("focusin", () => {
        t._focusEventsAllowed = !0;
      }, {
        once: !0,
        signal: te(this, ms)._signal
      }), n.focus());
    }, 0))), t._structTreeParentId = (r = te(this, mK)) == null ? void 0 : r.moveElementInDOM(this.div, t.div, t.contentDiv, !0);
  }
  addOrRebuild(t) {
    t.needsToBeRebuilt() ? (t.parent || (t.parent = this), t.rebuild(), t.show()) : this.add(t);
  }
  addUndoableEditor(t) {
    const n = () => t._uiManager.rebuild(t),
      r = () => {
        t.remove();
      };
    this.addCommands({
      cmd: n,
      undo: r,
      mustExec: !1
    });
  }
  getEditorByUID(t) {
    for (const n of te(this, Y_).values()) if (n.uid === t) return n;
    return null;
  }
  combinedSignal(t) {
    return te(this, ms).combinedSignal(t);
  }
  canCreateNewEmptyEditor() {
    var t;
    return (t = te(this, zp, R8)) == null ? void 0 : t.canCreateNewEmptyEditor();
  }
  async pasteEditor(t, n) {
    this.updateToolbar(t), await te(this, ms).updateMode(t.mode);
    const {
        offsetX: r,
        offsetY: a
      } = Gt(this, zp, q2t).call(this),
      i = te(this, ms).getId(),
      o = Gt(this, zp, W2t).call(this, {
        parent: this,
        id: i,
        x: r,
        y: a,
        uiManager: te(this, ms),
        isCentered: !0,
        ...n
      });
    o && this.add(o);
  }
  async deserialize(t) {
    var n;
    return (await ((n = te(ck, XB).get(t.annotationType ?? t.annotationEditorType)) == null ? void 0 : n.deserialize(t, this, te(this, ms)))) || null;
  }
  createAndAddNewEditor(t, n, r = {}) {
    const a = te(this, ms).getId(),
      i = Gt(this, zp, W2t).call(this, {
        parent: this,
        id: a,
        x: t.offsetX,
        y: t.offsetY,
        uiManager: te(this, ms),
        isCentered: n,
        ...r
      });
    return i && this.add(i), i;
  }
  get boundingClientRect() {
    return this.div.getBoundingClientRect();
  }
  addNewEditor(t = {}) {
    this.createAndAddNewEditor(Gt(this, zp, q2t).call(this), !0, t);
  }
  setSelected(t) {
    te(this, ms).setSelected(t);
  }
  toggleSelected(t) {
    te(this, ms).toggleSelected(t);
  }
  unselect(t) {
    te(this, ms).unselect(t);
  }
  pointerup(t) {
    var a;
    const {
      isMac: n
    } = gp.platform;
    if (t.button !== 0 || t.ctrlKey && n || t.target !== this.div || !te(this, QB) || (yt(this, QB, !1), (a = te(this, zp, R8)) != null && a.isDrawer && te(this, zp, R8).supportMultipleDrawings)) return;
    if (!te(this, qse)) {
      yt(this, qse, !0);
      return;
    }
    const r = te(this, ms).getMode();
    if (r === nc.STAMP || r === nc.POPUP || r === nc.SIGNATURE) {
      te(this, ms).unselectAll();
      return;
    }
    this.createAndAddNewEditor(t, !1);
  }
  pointerdown(t) {
    var a;
    if (te(this, ms).getMode() === nc.HIGHLIGHT && this.enableTextSelection(), te(this, QB)) {
      yt(this, QB, !1);
      return;
    }
    const {
      isMac: n
    } = gp.platform;
    if (t.button !== 0 || t.ctrlKey && n || t.target !== this.div) return;
    if (yt(this, QB, !0), (a = te(this, zp, R8)) != null && a.isDrawer) {
      this.startDrawingSession(t);
      return;
    }
    const r = te(this, ms).getActive();
    yt(this, qse, !r || r.isEmpty());
  }
  startDrawingSession(t) {
    if (this.div.focus({
      preventScroll: !0
    }), te(this, RC)) {
      te(this, zp, R8).startDrawing(this, te(this, ms), !1, t);
      return;
    }
    te(this, ms).setCurrentDrawingSession(this), yt(this, RC, new AbortController());
    const n = te(this, ms).combinedSignal(te(this, RC));
    this.div.addEventListener("blur", ({
      relatedTarget: r
    }) => {
      r && !this.div.contains(r) && (yt(this, _N, null), this.commitOrRemove());
    }, {
      signal: n
    }), te(this, zp, R8).startDrawing(this, te(this, ms), !1, t);
  }
  pause(t) {
    if (t) {
      const {
        activeElement: n
      } = document;
      this.div.contains(n) && yt(this, _N, n);
      return;
    }
    te(this, _N) && setTimeout(() => {
      var n;
      (n = te(this, _N)) == null || n.focus(), yt(this, _N, null);
    }, 0);
  }
  endDrawingSession(t = !1) {
    return te(this, RC) ? (te(this, ms).setCurrentDrawingSession(null), te(this, RC).abort(), yt(this, RC, null), yt(this, _N, null), te(this, zp, R8).endDrawing(t)) : null;
  }
  findNewParent(t, n, r) {
    const a = te(this, ms).findParent(n, r);
    return a === null || a === this ? !1 : (a.changeParent(t), !0);
  }
  commitOrRemove() {
    return te(this, RC) ? (this.endDrawingSession(), !0) : !1;
  }
  onScaleChanging() {
    te(this, RC) && te(this, zp, R8).onScaleChangingWhenDrawing(this);
  }
  destroy() {
    var t, n;
    this.commitOrRemove(), ((t = te(this, ms).getActive()) == null ? void 0 : t.parent) === this && (te(this, ms).commitOrRemove(), te(this, ms).setActiveEditor(null)), te(this, xN) && (clearTimeout(te(this, xN)), yt(this, xN, null));
    for (const r of te(this, Y_).values()) (n = te(this, mK)) == null || n.removePointerInTextLayer(r.contentDiv), r.setParent(null), r.isAttachedToDOM = !1, r.div.remove();
    this.div = null, te(this, Y_).clear(), te(this, ms).removeLayer(this);
  }
  async render({
    viewport: t
  }) {
    this.viewport = t, IJ(this.div, t);
    for (const n of te(this, ms).getEditors(this.pageIndex)) this.add(n), n.rebuild();
    await te(this, ms).findClonesForPage(this), this.div.hidden = this.isEmpty, this.updateMode();
  }
  update({
    viewport: t
  }) {
    te(this, ms).commitOrRemove(), Gt(this, zp, q7e).call(this);
    const n = this.viewport.rotation,
      r = t.rotation;
    if (this.viewport = t, IJ(this.div, {
      rotation: r
    }), n !== r) for (const a of te(this, Y_).values()) a.rotate(r);
  }
  get pageDimensions() {
    const {
      pageWidth: t,
      pageHeight: n
    } = this.viewport.rawDims;
    return [t, n];
  }
  get scale() {
    return te(this, ms).viewParameters.realScale;
  }
}, mK = new WeakMap(), qse = new WeakMap(), qB = new WeakMap(), KB = new WeakMap(), xN = new WeakMap(), Y_ = new WeakMap(), QB = new WeakMap(), Kse = new WeakMap(), Qse = new WeakMap(), RC = new WeakMap(), _N = new WeakMap(), X_ = new WeakMap(), kN = new WeakMap(), YB = new WeakMap(), Yse = new WeakMap(), ms = new WeakMap(), XB = new WeakMap(), zp = new WeakSet(), H2t = function () {
  return te(this, Y_).size !== 0 ? te(this, Y_).values() : te(this, ms).getEditors(this.pageIndex);
}, isr = function (t) {
  te(this, ms).unselectAll();
  const {
    target: n
  } = t;
  if (n === te(this, X_).div || (n.getAttribute("role") === "img" || n.classList.contains("endOfContent") || n.classList.contains("textLayerImages") || n.classList.contains("textLayerImagePlaceholder")) && te(this, X_).div.contains(n)) {
    const {
      isMac: r
    } = gp.platform;
    if (t.button !== 0 || t.ctrlKey && r) return;
    te(this, ms).showAllEditors("highlight", !0, !0), sUe.startDrawing(this, te(this, ms), te(this, ms).direction === "ltr", t), t.preventDefault();
  }
}, R8 = function () {
  return te(ck, XB).get(te(this, ms).getMode());
}, W2t = function (t) {
  const n = te(this, zp, R8);
  return n ? new n.prototype.constructor(t) : null;
}, q2t = function () {
  const {
      x: t,
      y: n,
      width: r,
      height: a
    } = this.boundingClientRect,
    i = Math.max(0, t),
    o = Math.max(0, n),
    s = Math.min(window.innerWidth, t + r),
    l = Math.min(window.innerHeight, n + a),
    d = (i + s) / 2 - t,
    u = (o + l) / 2 - n,
    [h, p] = this.viewport.rotation % 180 === 0 ? [d, u] : [u, d];
  return {
    offsetX: h,
    offsetY: p
  };
}, q7e = function () {
  for (const t of te(this, Y_).values()) t.isEmpty() && t.remove();
}, On(ck, "_initialized", !1), qt(ck, XB, new Map([x2t, L2t, G2t, sUe, $2t].map(t => [t._editorType, t]))), ck);

jc(1806);

function mli(e, t) {
  return e === t ? 0 : e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
}

function oMe(e) {
  var t;
  return e ? e.nodeType === Node.ELEMENT_NODE ? e.closest(".textLayer") : ((t = e.parentElement) == null ? void 0 : t.closest(".textLayer")) || null : null;
}

function fli(e, t, n, r) {
  if (e === n) return t <= r;
  const a = e.compareDocumentPosition(n);
  return a & Node.DOCUMENT_POSITION_FOLLOWING ? !0 : a & Node.DOCUMENT_POSITION_PRECEDING ? !1 : null;
}

function tsn(e, t, n) {
  if (e.nodeType !== Node.ELEMENT_NODE || !e.classList.contains("textLayer") || t !== e.childNodes.length) return {
    container: e,
    offset: t
  };
  let r = e.lastChild;
  return (r == null ? void 0 : r.nodeType) === Node.ELEMENT_NODE && r.classList.contains("endOfContent") && (r = r.previousSibling), !r || !n.contains(r) ? null : r.nodeType === Node.TEXT_NODE ? {
    container: r,
    offset: r.textContent.length
  } : {
    container: r,
    offset: r.childNodes.length
  };
}

var c2, d2, O4, L3e, O3e, fK, gK, js, B3e, sVe, JB, ZB, eF, tF, AN, Sx, K2t, Q2t, osr, K7e, ssr, e9, Y2t, lsr, X2t;

let gli = (js = class {
  constructor({
    filterFactory: t = null,
    pageColors: n = null,
    pageIndex: r,
    textLayer: a = null
  }) {
    qt(this, e9);
    qt(this, c2, null);
    qt(this, d2, new Map());
    qt(this, O4, null);
    qt(this, L3e, null);
    qt(this, O3e, null);
    qt(this, fK, null);
    qt(this, gK, new Map());
    if (this.pageIndex = r, yt(this, L3e, t), yt(this, O3e, n), a) {
      const i = te(js, AN).get(a);
      if (i != null && i.selectionDiv && (i.selectionDiv.remove(), te(js, ZB).delete(i.selectionDiv)), te(js, AN).set(a, {
        drawLayer: this
      }), te(js, tF).add(a), yt(this, O4, a), yt(this, fK, new MutationObserver(o => {
        var s, l, d;
        if (!(!te(this, c2) || !((s = te(this, O4)) != null && s.isConnected) || !Gt(l = js, Sx, Q2t).call(l))) {
          for (const {
            addedNodes: u
          } of o) for (const h of u) if (h.nodeType === Node.ELEMENT_NODE && h.classList.contains("endOfContent")) {
            Gt(d = js, Sx, K7e).call(d);
            return;
          }
        }
      })), te(this, fK).observe(a, {
        childList: !0
      }), te(js, JB) === null) {
        yt(js, JB, new AbortController());
        const {
          signal: o
        } = te(js, JB);
        document.addEventListener("selectionchange", Gt(js, Sx, K7e).bind(js), {
          signal: o
        }), document.addEventListener("pointerdown", () => {
          yt(js, eF, !0);
        }, {
          signal: o
        }), document.addEventListener("pointerup", () => {
          yt(js, eF, !1);
        }, {
          signal: o
        }), window.addEventListener("blur", () => {
          yt(js, eF, !1);
        }, {
          signal: o
        });
      }
    }
  }
  setParent(t) {
    var n, r, a;
    if (!te(this, c2)) {
      yt(this, c2, t), (n = te(this, O4)) != null && n.isConnected && Gt(r = js, Sx, Q2t).call(r) && Gt(a = js, Sx, K7e).call(a);
      return;
    }
    if (te(this, c2) !== t) {
      if (te(this, d2).size > 0) for (const i of te(this, d2).values()) i.remove(), t.append(i);
      yt(this, c2, t);
    }
  }
  static get _svgFactory() {
    return Ws(this, "_svgFactory", new iUe());
  }
  draw(t, n = !1, r = !1) {
    const a = rm(js, B3e)._++,
      i = Gt(this, e9, Y2t).call(this),
      o = js._svgFactory.createElement("defs");
    i.append(o);
    const s = js._svgFactory.createElement("path");
    o.append(s);
    const l = `path_${a}`;
    s.setAttribute("id", l), s.setAttribute("vector-effect", "non-scaling-stroke"), n && te(this, gK).set(a, s);
    const d = r ? Gt(this, e9, lsr).call(this, o, l) : null,
      u = js._svgFactory.createElement("use");
    return i.append(u), u.setAttribute("href", `#${l}`), this.updateProperties(i, t), te(this, d2).set(a, i), {
      id: a,
      clipPathId: `url(#${d})`
    };
  }
  drawOutline(t, n) {
    const r = rm(js, B3e)._++,
      a = Gt(this, e9, Y2t).call(this),
      i = js._svgFactory.createElement("defs");
    a.append(i);
    const o = js._svgFactory.createElement("path");
    i.append(o);
    const s = `path_${r}`;
    o.setAttribute("id", s), o.setAttribute("vector-effect", "non-scaling-stroke");
    let l;
    if (n) {
      const h = js._svgFactory.createElement("mask");
      i.append(h), l = `mask_${r}`, h.setAttribute("id", l), h.setAttribute("maskUnits", "objectBoundingBox");
      const p = js._svgFactory.createElement("rect");
      h.append(p), p.setAttribute("width", "1"), p.setAttribute("height", "1"), p.setAttribute("fill", "white");
      const m = js._svgFactory.createElement("use");
      h.append(m), m.setAttribute("href", `#${s}`), m.setAttribute("stroke", "none"), m.setAttribute("fill", "black"), m.setAttribute("fill-rule", "nonzero"), m.classList.add("mask");
    }
    const d = js._svgFactory.createElement("use");
    a.append(d), d.setAttribute("href", `#${s}`), l && d.setAttribute("mask", `url(#${l})`);
    const u = d.cloneNode();
    return a.append(u), d.classList.add("mainOutline"), u.classList.add("secondaryOutline"), this.updateProperties(a, t), te(this, d2).set(r, a), r;
  }
  finalizeDraw(t, n) {
    te(this, gK).delete(t), this.updateProperties(t, n);
  }
  updateProperties(t, n) {
    var l;
    if (!n) return;
    const {
        root: r,
        bbox: a,
        rootClass: i,
        path: o
      } = n,
      s = typeof t == "number" ? te(this, d2).get(t) : t;
    if (s) {
      if (r && Gt(this, e9, X2t).call(this, s, r), a && Gt(l = js, Sx, ssr).call(l, s, a), i) {
        const {
          classList: d
        } = s;
        for (const [u, h] of Object.entries(i)) d.toggle(u, h);
      }
      if (o) {
        const u = s.firstElementChild.firstElementChild;
        Gt(this, e9, X2t).call(this, u, o);
      }
    }
  }
  updateParent(t, n) {
    if (n === this) return;
    const r = te(this, d2).get(t);
    r && (te(n, c2).append(r), te(this, d2).delete(t), te(n, d2).set(t, r));
  }
  remove(t) {
    te(this, gK).delete(t), te(this, c2) !== null && (te(this, d2).get(t).remove(), te(this, d2).delete(t));
  }
  destroy() {
    var t, n, r;
    yt(this, c2, null);
    for (const a of te(this, d2).values()) a.remove();
    if (te(this, d2).clear(), te(this, gK).clear(), (t = te(this, fK)) == null || t.disconnect(), yt(this, fK, null), te(this, O4)) {
      const a = te(js, AN).get(te(this, O4));
      (a == null ? void 0 : a.drawLayer) === this && (Gt(n = js, Sx, K2t).call(n, te(this, O4)), te(js, AN).delete(te(this, O4)), te(js, tF).delete(te(this, O4)), te(js, tF).size === 0 && ((r = te(js, JB)) == null || r.abort(), yt(js, JB, null), yt(js, eF, !1))), yt(this, O4, null);
    }
  }
}, c2 = new WeakMap(), d2 = new WeakMap(), O4 = new WeakMap(), L3e = new WeakMap(), O3e = new WeakMap(), fK = new WeakMap(), gK = new WeakMap(), B3e = new WeakMap(), sVe = new WeakMap(), JB = new WeakMap(), ZB = new WeakMap(), eF = new WeakMap(), tF = new WeakMap(), AN = new WeakMap(), Sx = new WeakSet(), K2t = function (t) {
  const n = te(this, AN).get(t);
  n != null && n.selectionDiv && (n.selectionDiv.remove(), te(this, ZB).delete(n.selectionDiv), n.selectionDiv = null, n.path = null);
}, Q2t = function () {
  const t = document.getSelection();
  return !!t && !t.isCollapsed;
}, osr = function () {
  return te(this, tF).keys().filter(t => t.isConnected).toArray().sort(mli);
}, K7e = function () {
  var o;
  const t = document.getSelection();
  if (!t || t.isCollapsed) {
    for (const s of te(this, ZB)) s.remove();
    te(this, ZB).clear();
    return;
  }
  const n = new WeakMap(),
    r = Gt(this, Sx, osr).call(this),
    a = [];
  for (let s = 0, l = t.rangeCount; s < l; s++) {
    const d = t.getRangeAt(s);
    if (d.collapsed) continue;
    let {
        startContainer: u,
        startOffset: h,
        endContainer: p,
        endOffset: m
      } = d,
      f = oMe(u),
      y = oMe(p);
    const b = f === null,
      v = y === null;
    if (te(this, eF) && b !== v) return;
    if (t.rangeCount === 1) {
      const {
          anchorNode: k,
          anchorOffset: A,
          focusNode: S,
          focusOffset: C
        } = t,
        I = oMe(k),
        E = oMe(S),
        M = fli(k, A, S, C);
      I && E && M !== null && (M ? (u = k, h = A, f = I, p = S, m = C, y = E) : (u = S, h = C, f = E, p = k, m = A, y = I));
    }
    const _ = r.filter(k => d.intersectsNode(k));
    if (_.length === 0) continue;
    let w = !1;
    if (f || (f = _[0], u = f, h = 0, w = !0), y || (y = _.at(-1), p = y, m = y.childNodes.length, w = !0), p.nodeType === Node.ELEMENT_NODE) {
      if (p.classList.contains("endOfContent")) {
        const k = p.previousSibling;
        if (!k) continue;
        p = k, m = k.nodeType === Node.TEXT_NODE ? k.textContent.length : k.childNodes.length;
      } else if (p.classList.contains("textLayer") && p.childNodes.length === m) {
        const k = tsn(p, m, y);
        if (!k) continue;
        p = k.container, m = k.offset;
      }
    }
    if (u.nodeType === Node.ELEMENT_NODE) {
      const k = tsn(u, h, f);
      if (!k) continue;
      u = k.container, h = k.offset;
    }
    if (f === y && !w && _.includes(f)) {
      a.push([d, f]);
      continue;
    }
    for (const k of _) {
      const A = k.firstChild;
      if (!A) continue;
      const S = document.createRange();
      if (k === f ? S.setStart(u, h) : S.setStartBefore(A), k === y) S.setEnd(p, m);else {
        const C = k.lastChild;
        if (!C) continue;
        if (C.nodeType === Node.ELEMENT_NODE && C.classList.contains("endOfContent")) {
          const I = C.previousSibling;
          if (!I) continue;
          S.setEndAfter(I);
        } else S.setEndAfter(C);
      }
      S.collapsed || a.push([S, k]);
    }
  }
  const i = new Set(a.map(s => s[1]));
  for (const s of te(this, tF)) i.has(s) || Gt(this, Sx, K2t).call(this, s);
  for (const [s, l] of a) {
    const d = te(js, AN).get(l);
    if (!d) continue;
    let u = n.get(l);
    if (!u) {
      const y = l.getBoundingClientRect();
      u = (b, v, _, w) => ({
        x: (b - y.x) / y.width,
        y: (v - y.y) / y.height,
        width: _ / y.width,
        height: w / y.height
      }), n.set(l, u);
    }
    const h = [];
    for (let {
      x: y,
      y: b,
      width: v,
      height: _
    } of s.getClientRects()) v === 0 || _ === 0 || ({
      x: y,
      y: b,
      width: v,
      height: _
    } = u(y, b, v, _), !(v === 1 && _ === 1) && h.push(`M${y} ${b} h${v} v${_} h-${v} Z`));
    if (h.length === 0) continue;
    const p = d.drawLayer;
    let m = d.selectionDiv,
      f = d.path;
    if (!m) {
      const y = `clip_selection_${rm(js, sVe)._++}`;
      m = document.createElement("div"), m.className = "selection", m.style.clipPath = `url(#${y})`;
      const b = (o = te(p, L3e)) == null ? void 0 : o.createSelectionStyle(te(p, O3e));
      if (b) for (const [w, k] of Object.entries(b)) m.style.setProperty(w, k);
      const v = js._svgFactory.create(1, 1, !0);
      v.setAttribute("aria-hidden", "true"), v.setAttribute("width", "100%"), v.setAttribute("height", "100%");
      const _ = js._svgFactory.createElement("clipPath");
      _.setAttribute("id", y), _.setAttribute("clipPathUnits", "objectBoundingBox"), f = js._svgFactory.createElement("path"), _.append(f), v.append(_), m.append(v), d.path = f, d.selectionDiv = m;
    }
    te(p, c2) && m.parentNode !== te(p, c2) && (te(p, c2).append(m), te(this, ZB).add(m)), f.setAttribute("d", h.join(" "));
  }
}, ssr = function (t, [n, r, a, i]) {
  const {
    style: o
  } = t;
  o.top = `${100 * r}%`, o.left = `${100 * n}%`, o.width = `${100 * a}%`, o.height = `${100 * i}%`;
}, e9 = new WeakSet(), Y2t = function () {
  const t = js._svgFactory.create(1, 1, !0);
  return te(this, c2).append(t), t.setAttribute("aria-hidden", "true"), t;
}, lsr = function (t, n) {
  const r = js._svgFactory.createElement("clipPath");
  t.append(r);
  const a = `clip_${n}`;
  r.setAttribute("id", a), r.setAttribute("clipPathUnits", "objectBoundingBox");
  const i = js._svgFactory.createElement("use");
  return r.append(i), i.setAttribute("href", `#${n}`), i.classList.add("clip"), a;
}, X2t = function (t, n) {
  for (const [r, a] of Object.entries(n)) a === null ? t.removeAttribute(r) : t.setAttribute(r, a);
}, qt(js, Sx), qt(js, B3e, 0), qt(js, sVe, 0), qt(js, JB, null), qt(js, ZB, new Set()), qt(js, eF, !1), qt(js, tF, new Set()), qt(js, AN, new WeakMap()), js);

function sMe(e) {
  return `${(e * 100).toFixed(2)}%`;
}

var Xse, F3e, z3e, Jse, y6, b6, hz, U3e, lVe, csr;

let yli = (hz = class {
  constructor(t, n, r, a) {
    qt(this, lVe);
    qt(this, Xse, []);
    qt(this, F3e, new Map());
    qt(this, z3e, null);
    qt(this, Jse, 0);
    qt(this, y6, 0);
    qt(this, b6, 0);
    yt(this, Jse, t), yt(this, Xse, n), yt(this, y6, r.rawDims.pageWidth), yt(this, b6, r.rawDims.pageHeight), yt(this, z3e, a);
  }
  render() {
    const t = document.createElement("div");
    t.className = "textLayerImages";
    for (let n = 0; n < te(this, Xse).length; n += 6) {
      const r = Gt(this, lVe, csr).call(this, te(this, Xse).subarray(n, n + 6));
      r && t.append(r);
    }
    return t.addEventListener("contextmenu", n => {
      var v;
      if (!(n.target instanceof HTMLCanvasElement)) return;
      const r = n.target,
        a = te(this, F3e).get(r);
      if (!a) return;
      const i = (v = te(hz, U3e)) == null ? void 0 : v.deref();
      if (i === r) return;
      i && (i.width = 0, i.height = 0), yt(hz, U3e, new WeakRef(r));
      const {
          inverseTransform: o,
          x1: s,
          y1: l,
          width: d,
          height: u
        } = a,
        h = te(this, z3e).call(this),
        p = Math.ceil(s * h.width),
        m = Math.ceil(l * h.height),
        f = Math.floor((s + d / te(this, y6)) * h.width),
        y = Math.floor((l + u / te(this, b6)) * h.height);
      r.width = f - p, r.height = y - m;
      const b = r.getContext("2d");
      b.setTransform(...o), b.translate(-p, -m), b.drawImage(h, 0, 0);
    }), t;
  }
}, Xse = new WeakMap(), F3e = new WeakMap(), z3e = new WeakMap(), Jse = new WeakMap(), y6 = new WeakMap(), b6 = new WeakMap(), U3e = new WeakMap(), lVe = new WeakSet(), csr = function ([t, n, r, a, i, o]) {
  const s = Math.hypot((i - t) * te(this, y6), (o - n) * te(this, b6)),
    l = Math.hypot((r - t) * te(this, y6), (a - n) * te(this, b6));
  if (s < te(this, Jse) || l < te(this, Jse)) return null;
  const d = [(i - t) * te(this, y6) / s, (o - n) * te(this, b6) / s, (r - t) * te(this, y6) / l, (a - n) * te(this, b6) / l, 0, 0],
    u = fo.inverseTransform(d),
    h = document.createElement("canvas");
  return h.className = "textLayerImagePlaceholder", h.width = 0, h.height = 0, Object.assign(h.style, {
    opacity: 0,
    position: "absolute",
    left: sMe(t),
    top: sMe(n),
    width: sMe(s / te(this, y6)),
    height: sMe(l / te(this, b6)),
    transformOrigin: "0% 0%",
    transform: `matrix(${d.join(",")})`
  }), te(this, F3e).set(h, {
    inverseTransform: u,
    width: s,
    height: l,
    x1: t,
    y1: n
  }), h;
}, qt(hz, U3e, null), hz);

globalThis._pdfjsTestingUtils = {
  HighlightOutliner: M2t
};

globalThis.pdfjsLib = {
  AbortException: u$,
  AnnotationEditorLayer: pli,
  AnnotationEditorParamsType: Td,
  AnnotationEditorType: nc,
  AnnotationEditorUIManager: Tke,
  AnnotationLayer: dli,
  AnnotationMode: HO,
  AnnotationType: Wf,
  applyOpacity: koi,
  build: $si,
  ColorPicker: hor,
  createValidAbsoluteUrl: Far,
  CSSConstants: _oi,
  DOMSVGFactory: iUe,
  DrawLayer: gli,
  FeatureTest: gp,
  fetchData: iBt,
  findContrastColor: Aoi,
  getDocument: lor,
  getFilenameFromUrl: boi,
  getPdfFilenameFromUrl: voi,
  getRGB: OCe,
  getRGBA: LCe,
  getUuid: Uar,
  GlobalWorkerOptions: WO,
  ImageKind: l7e,
  InvalidPDFException: axt,
  isDataScheme: JXe,
  isPdfFile: sBt,
  isValidExplicitDest: Hoi,
  makeArr: kpe,
  makeMap: aBt,
  makeObj: oxt,
  makeSet: foi,
  MathClamp: Pm,
  noContextMenu: gT,
  normalizeUnicode: poi,
  OPS: G8,
  OutputScale: h$,
  PasswordException: rxt,
  PasswordResponses: ooi,
  PDFDataRangeTransport: cor,
  PDFDateString: lxt,
  PDFWorker: i2t,
  PermissionFlag: ioi,
  PixelsPerInch: Dde,
  RenderingCancelledException: oBt,
  renderRichText: Gar,
  ResponseException: tUe,
  setLayerDimensions: IJ,
  shadow: Ws,
  SignatureExtractor: Lne,
  stopEvent: gb,
  SupportedImageMimeTypes: dxt,
  TextLayer: e2t,
  TextLayerImages: yli,
  TouchManager: uir,
  updateUrlHash: zar,
  Util: fo,
  VerbosityLevel: KXe,
  version: Usi,
  XfaLayer: $ar
};

const bli = "" + new URL("pdf.worker.min-BmVo14Nb.mjs", import.meta.url).href,
  vli = Object.assign({
    "/node_modules/pdfjs-dist/cmaps/78-EUC-H.bcmap": Bni,
    "/node_modules/pdfjs-dist/cmaps/78-EUC-V.bcmap": Fni,
    "/node_modules/pdfjs-dist/cmaps/78-H.bcmap": zni,
    "/node_modules/pdfjs-dist/cmaps/78-RKSJ-H.bcmap": Uni,
    "/node_modules/pdfjs-dist/cmaps/78-RKSJ-V.bcmap": $ni,
    "/node_modules/pdfjs-dist/cmaps/78-V.bcmap": Gni,
    "/node_modules/pdfjs-dist/cmaps/78ms-RKSJ-H.bcmap": Vni,
    "/node_modules/pdfjs-dist/cmaps/78ms-RKSJ-V.bcmap": Hni,
    "/node_modules/pdfjs-dist/cmaps/83pv-RKSJ-H.bcmap": Wni,
    "/node_modules/pdfjs-dist/cmaps/90ms-RKSJ-H.bcmap": qni,
    "/node_modules/pdfjs-dist/cmaps/90ms-RKSJ-V.bcmap": Kni,
    "/node_modules/pdfjs-dist/cmaps/90msp-RKSJ-H.bcmap": Qni,
    "/node_modules/pdfjs-dist/cmaps/90msp-RKSJ-V.bcmap": Yni,
    "/node_modules/pdfjs-dist/cmaps/90pv-RKSJ-H.bcmap": Xni,
    "/node_modules/pdfjs-dist/cmaps/90pv-RKSJ-V.bcmap": Jni,
    "/node_modules/pdfjs-dist/cmaps/Add-H.bcmap": Zni,
    "/node_modules/pdfjs-dist/cmaps/Add-RKSJ-H.bcmap": eri,
    "/node_modules/pdfjs-dist/cmaps/Add-RKSJ-V.bcmap": tri,
    "/node_modules/pdfjs-dist/cmaps/Add-V.bcmap": nri,
    "/node_modules/pdfjs-dist/cmaps/Adobe-CNS1-0.bcmap": rri,
    "/node_modules/pdfjs-dist/cmaps/Adobe-CNS1-1.bcmap": ari,
    "/node_modules/pdfjs-dist/cmaps/Adobe-CNS1-2.bcmap": iri,
    "/node_modules/pdfjs-dist/cmaps/Adobe-CNS1-3.bcmap": ori,
    "/node_modules/pdfjs-dist/cmaps/Adobe-CNS1-4.bcmap": sri,
    "/node_modules/pdfjs-dist/cmaps/Adobe-CNS1-5.bcmap": lri,
    "/node_modules/pdfjs-dist/cmaps/Adobe-CNS1-6.bcmap": cri,
    "/node_modules/pdfjs-dist/cmaps/Adobe-CNS1-UCS2.bcmap": dri,
    "/node_modules/pdfjs-dist/cmaps/Adobe-GB1-0.bcmap": uri,
    "/node_modules/pdfjs-dist/cmaps/Adobe-GB1-1.bcmap": hri,
    "/node_modules/pdfjs-dist/cmaps/Adobe-GB1-2.bcmap": pri,
    "/node_modules/pdfjs-dist/cmaps/Adobe-GB1-3.bcmap": mri,
    "/node_modules/pdfjs-dist/cmaps/Adobe-GB1-4.bcmap": fri,
    "/node_modules/pdfjs-dist/cmaps/Adobe-GB1-5.bcmap": gri,
    "/node_modules/pdfjs-dist/cmaps/Adobe-GB1-UCS2.bcmap": yri,
    "/node_modules/pdfjs-dist/cmaps/Adobe-Japan1-0.bcmap": bri,
    "/node_modules/pdfjs-dist/cmaps/Adobe-Japan1-1.bcmap": vri,
    "/node_modules/pdfjs-dist/cmaps/Adobe-Japan1-2.bcmap": wri,
    "/node_modules/pdfjs-dist/cmaps/Adobe-Japan1-3.bcmap": xri,
    "/node_modules/pdfjs-dist/cmaps/Adobe-Japan1-4.bcmap": _ri,
    "/node_modules/pdfjs-dist/cmaps/Adobe-Japan1-5.bcmap": kri,
    "/node_modules/pdfjs-dist/cmaps/Adobe-Japan1-6.bcmap": Ari,
    "/node_modules/pdfjs-dist/cmaps/Adobe-Japan1-UCS2.bcmap": Sri,
    "/node_modules/pdfjs-dist/cmaps/Adobe-Korea1-0.bcmap": Iri,
    "/node_modules/pdfjs-dist/cmaps/Adobe-Korea1-1.bcmap": Cri,
    "/node_modules/pdfjs-dist/cmaps/Adobe-Korea1-2.bcmap": Eri,
    "/node_modules/pdfjs-dist/cmaps/Adobe-Korea1-UCS2.bcmap": Tri,
    "/node_modules/pdfjs-dist/cmaps/B5-H.bcmap": Mri,
    "/node_modules/pdfjs-dist/cmaps/B5-V.bcmap": Pri,
    "/node_modules/pdfjs-dist/cmaps/B5pc-H.bcmap": Rri,
    "/node_modules/pdfjs-dist/cmaps/B5pc-V.bcmap": Nri,
    "/node_modules/pdfjs-dist/cmaps/CNS-EUC-H.bcmap": jri,
    "/node_modules/pdfjs-dist/cmaps/CNS-EUC-V.bcmap": Dri,
    "/node_modules/pdfjs-dist/cmaps/CNS1-H.bcmap": Lri,
    "/node_modules/pdfjs-dist/cmaps/CNS1-V.bcmap": Ori,
    "/node_modules/pdfjs-dist/cmaps/CNS2-H.bcmap": Bri,
    "/node_modules/pdfjs-dist/cmaps/CNS2-V.bcmap": Fri,
    "/node_modules/pdfjs-dist/cmaps/ETHK-B5-H.bcmap": zri,
    "/node_modules/pdfjs-dist/cmaps/ETHK-B5-V.bcmap": Uri,
    "/node_modules/pdfjs-dist/cmaps/ETen-B5-H.bcmap": $ri,
    "/node_modules/pdfjs-dist/cmaps/ETen-B5-V.bcmap": Gri,
    "/node_modules/pdfjs-dist/cmaps/ETenms-B5-H.bcmap": Vri,
    "/node_modules/pdfjs-dist/cmaps/ETenms-B5-V.bcmap": Hri,
    "/node_modules/pdfjs-dist/cmaps/EUC-H.bcmap": Wri,
    "/node_modules/pdfjs-dist/cmaps/EUC-V.bcmap": qri,
    "/node_modules/pdfjs-dist/cmaps/Ext-H.bcmap": Kri,
    "/node_modules/pdfjs-dist/cmaps/Ext-RKSJ-H.bcmap": Qri,
    "/node_modules/pdfjs-dist/cmaps/Ext-RKSJ-V.bcmap": Yri,
    "/node_modules/pdfjs-dist/cmaps/Ext-V.bcmap": Xri,
    "/node_modules/pdfjs-dist/cmaps/GB-EUC-H.bcmap": Jri,
    "/node_modules/pdfjs-dist/cmaps/GB-EUC-V.bcmap": Zri,
    "/node_modules/pdfjs-dist/cmaps/GB-H.bcmap": eai,
    "/node_modules/pdfjs-dist/cmaps/GB-V.bcmap": tai,
    "/node_modules/pdfjs-dist/cmaps/GBK-EUC-H.bcmap": nai,
    "/node_modules/pdfjs-dist/cmaps/GBK-EUC-V.bcmap": rai,
    "/node_modules/pdfjs-dist/cmaps/GBK2K-H.bcmap": aai,
    "/node_modules/pdfjs-dist/cmaps/GBK2K-V.bcmap": iai,
    "/node_modules/pdfjs-dist/cmaps/GBKp-EUC-H.bcmap": oai,
    "/node_modules/pdfjs-dist/cmaps/GBKp-EUC-V.bcmap": sai,
    "/node_modules/pdfjs-dist/cmaps/GBT-EUC-H.bcmap": lai,
    "/node_modules/pdfjs-dist/cmaps/GBT-EUC-V.bcmap": cai,
    "/node_modules/pdfjs-dist/cmaps/GBT-H.bcmap": dai,
    "/node_modules/pdfjs-dist/cmaps/GBT-V.bcmap": uai,
    "/node_modules/pdfjs-dist/cmaps/GBTpc-EUC-H.bcmap": hai,
    "/node_modules/pdfjs-dist/cmaps/GBTpc-EUC-V.bcmap": pai,
    "/node_modules/pdfjs-dist/cmaps/GBpc-EUC-H.bcmap": mai,
    "/node_modules/pdfjs-dist/cmaps/GBpc-EUC-V.bcmap": fai,
    "/node_modules/pdfjs-dist/cmaps/H.bcmap": gai,
    "/node_modules/pdfjs-dist/cmaps/HKdla-B5-H.bcmap": yai,
    "/node_modules/pdfjs-dist/cmaps/HKdla-B5-V.bcmap": bai,
    "/node_modules/pdfjs-dist/cmaps/HKdlb-B5-H.bcmap": vai,
    "/node_modules/pdfjs-dist/cmaps/HKdlb-B5-V.bcmap": wai,
    "/node_modules/pdfjs-dist/cmaps/HKgccs-B5-H.bcmap": xai,
    "/node_modules/pdfjs-dist/cmaps/HKgccs-B5-V.bcmap": _ai,
    "/node_modules/pdfjs-dist/cmaps/HKm314-B5-H.bcmap": kai,
    "/node_modules/pdfjs-dist/cmaps/HKm314-B5-V.bcmap": Aai,
    "/node_modules/pdfjs-dist/cmaps/HKm471-B5-H.bcmap": Sai,
    "/node_modules/pdfjs-dist/cmaps/HKm471-B5-V.bcmap": Iai,
    "/node_modules/pdfjs-dist/cmaps/HKscs-B5-H.bcmap": Cai,
    "/node_modules/pdfjs-dist/cmaps/HKscs-B5-V.bcmap": Eai,
    "/node_modules/pdfjs-dist/cmaps/Hankaku.bcmap": Tai,
    "/node_modules/pdfjs-dist/cmaps/Hiragana.bcmap": Mai,
    "/node_modules/pdfjs-dist/cmaps/KSC-EUC-H.bcmap": Pai,
    "/node_modules/pdfjs-dist/cmaps/KSC-EUC-V.bcmap": Rai,
    "/node_modules/pdfjs-dist/cmaps/KSC-H.bcmap": Nai,
    "/node_modules/pdfjs-dist/cmaps/KSC-Johab-H.bcmap": jai,
    "/node_modules/pdfjs-dist/cmaps/KSC-Johab-V.bcmap": Dai,
    "/node_modules/pdfjs-dist/cmaps/KSC-V.bcmap": Lai,
    "/node_modules/pdfjs-dist/cmaps/KSCms-UHC-H.bcmap": Oai,
    "/node_modules/pdfjs-dist/cmaps/KSCms-UHC-HW-H.bcmap": Bai,
    "/node_modules/pdfjs-dist/cmaps/KSCms-UHC-HW-V.bcmap": Fai,
    "/node_modules/pdfjs-dist/cmaps/KSCms-UHC-V.bcmap": zai,
    "/node_modules/pdfjs-dist/cmaps/KSCpc-EUC-H.bcmap": Uai,
    "/node_modules/pdfjs-dist/cmaps/KSCpc-EUC-V.bcmap": $ai,
    "/node_modules/pdfjs-dist/cmaps/Katakana.bcmap": Gai,
    "/node_modules/pdfjs-dist/cmaps/NWP-H.bcmap": Vai,
    "/node_modules/pdfjs-dist/cmaps/NWP-V.bcmap": Hai,
    "/node_modules/pdfjs-dist/cmaps/RKSJ-H.bcmap": Wai,
    "/node_modules/pdfjs-dist/cmaps/RKSJ-V.bcmap": qai,
    "/node_modules/pdfjs-dist/cmaps/Roman.bcmap": Kai,
    "/node_modules/pdfjs-dist/cmaps/UniCNS-UCS2-H.bcmap": Qai,
    "/node_modules/pdfjs-dist/cmaps/UniCNS-UCS2-V.bcmap": Yai,
    "/node_modules/pdfjs-dist/cmaps/UniCNS-UTF16-H.bcmap": Xai,
    "/node_modules/pdfjs-dist/cmaps/UniCNS-UTF16-V.bcmap": Jai,
    "/node_modules/pdfjs-dist/cmaps/UniCNS-UTF32-H.bcmap": Zai,
    "/node_modules/pdfjs-dist/cmaps/UniCNS-UTF32-V.bcmap": eii,
    "/node_modules/pdfjs-dist/cmaps/UniCNS-UTF8-H.bcmap": tii,
    "/node_modules/pdfjs-dist/cmaps/UniCNS-UTF8-V.bcmap": nii,
    "/node_modules/pdfjs-dist/cmaps/UniGB-UCS2-H.bcmap": rii,
    "/node_modules/pdfjs-dist/cmaps/UniGB-UCS2-V.bcmap": aii,
    "/node_modules/pdfjs-dist/cmaps/UniGB-UTF16-H.bcmap": iii,
    "/node_modules/pdfjs-dist/cmaps/UniGB-UTF16-V.bcmap": oii,
    "/node_modules/pdfjs-dist/cmaps/UniGB-UTF32-H.bcmap": sii,
    "/node_modules/pdfjs-dist/cmaps/UniGB-UTF32-V.bcmap": lii,
    "/node_modules/pdfjs-dist/cmaps/UniGB-UTF8-H.bcmap": cii,
    "/node_modules/pdfjs-dist/cmaps/UniGB-UTF8-V.bcmap": dii,
    "/node_modules/pdfjs-dist/cmaps/UniJIS-UCS2-H.bcmap": uii,
    "/node_modules/pdfjs-dist/cmaps/UniJIS-UCS2-HW-H.bcmap": hii,
    "/node_modules/pdfjs-dist/cmaps/UniJIS-UCS2-HW-V.bcmap": pii,
    "/node_modules/pdfjs-dist/cmaps/UniJIS-UCS2-V.bcmap": mii,
    "/node_modules/pdfjs-dist/cmaps/UniJIS-UTF16-H.bcmap": fii,
    "/node_modules/pdfjs-dist/cmaps/UniJIS-UTF16-V.bcmap": gii,
    "/node_modules/pdfjs-dist/cmaps/UniJIS-UTF32-H.bcmap": yii,
    "/node_modules/pdfjs-dist/cmaps/UniJIS-UTF32-V.bcmap": bii,
    "/node_modules/pdfjs-dist/cmaps/UniJIS-UTF8-H.bcmap": vii,
    "/node_modules/pdfjs-dist/cmaps/UniJIS-UTF8-V.bcmap": wii,
    "/node_modules/pdfjs-dist/cmaps/UniJIS2004-UTF16-H.bcmap": xii,
    "/node_modules/pdfjs-dist/cmaps/UniJIS2004-UTF16-V.bcmap": _ii,
    "/node_modules/pdfjs-dist/cmaps/UniJIS2004-UTF32-H.bcmap": kii,
    "/node_modules/pdfjs-dist/cmaps/UniJIS2004-UTF32-V.bcmap": Aii,
    "/node_modules/pdfjs-dist/cmaps/UniJIS2004-UTF8-H.bcmap": Sii,
    "/node_modules/pdfjs-dist/cmaps/UniJIS2004-UTF8-V.bcmap": Iii,
    "/node_modules/pdfjs-dist/cmaps/UniJISPro-UCS2-HW-V.bcmap": Cii,
    "/node_modules/pdfjs-dist/cmaps/UniJISPro-UCS2-V.bcmap": Eii,
    "/node_modules/pdfjs-dist/cmaps/UniJISPro-UTF8-V.bcmap": Tii,
    "/node_modules/pdfjs-dist/cmaps/UniJISX0213-UTF32-H.bcmap": Mii,
    "/node_modules/pdfjs-dist/cmaps/UniJISX0213-UTF32-V.bcmap": Pii,
    "/node_modules/pdfjs-dist/cmaps/UniJISX02132004-UTF32-H.bcmap": Rii,
    "/node_modules/pdfjs-dist/cmaps/UniJISX02132004-UTF32-V.bcmap": Nii,
    "/node_modules/pdfjs-dist/cmaps/UniKS-UCS2-H.bcmap": jii,
    "/node_modules/pdfjs-dist/cmaps/UniKS-UCS2-V.bcmap": Dii,
    "/node_modules/pdfjs-dist/cmaps/UniKS-UTF16-H.bcmap": Lii,
    "/node_modules/pdfjs-dist/cmaps/UniKS-UTF16-V.bcmap": Oii,
    "/node_modules/pdfjs-dist/cmaps/UniKS-UTF32-H.bcmap": Bii,
    "/node_modules/pdfjs-dist/cmaps/UniKS-UTF32-V.bcmap": Fii,
    "/node_modules/pdfjs-dist/cmaps/UniKS-UTF8-H.bcmap": zii,
    "/node_modules/pdfjs-dist/cmaps/UniKS-UTF8-V.bcmap": Uii,
    "/node_modules/pdfjs-dist/cmaps/V.bcmap": $ii,
    "/node_modules/pdfjs-dist/cmaps/WP-Symbol.bcmap": Gii,
    "/node_modules/pdfjs-dist/standard_fonts/FoxitDingbats.pfb": Vii,
    "/node_modules/pdfjs-dist/standard_fonts/FoxitFixed.pfb": Hii,
    "/node_modules/pdfjs-dist/standard_fonts/FoxitFixedBold.pfb": Wii,
    "/node_modules/pdfjs-dist/standard_fonts/FoxitFixedBoldItalic.pfb": qii,
    "/node_modules/pdfjs-dist/standard_fonts/FoxitFixedItalic.pfb": Kii,
    "/node_modules/pdfjs-dist/standard_fonts/FoxitSerif.pfb": Qii,
    "/node_modules/pdfjs-dist/standard_fonts/FoxitSerifBold.pfb": Yii,
    "/node_modules/pdfjs-dist/standard_fonts/FoxitSerifBoldItalic.pfb": Xii,
    "/node_modules/pdfjs-dist/standard_fonts/FoxitSerifItalic.pfb": Jii,
    "/node_modules/pdfjs-dist/standard_fonts/FoxitSymbol.pfb": Zii,
    "/node_modules/pdfjs-dist/standard_fonts/LiberationSans-Bold.ttf": eoi,
    "/node_modules/pdfjs-dist/standard_fonts/LiberationSans-BoldItalic.ttf": toi,
    "/node_modules/pdfjs-dist/standard_fonts/LiberationSans-Italic.ttf": noi,
    "/node_modules/pdfjs-dist/standard_fonts/LiberationSans-Regular.ttf": roi
  });

class wli {
  async fetch({
    kind: t,
    filename: n
  }) {
    const a = vli[`/node_modules/pdfjs-dist/${t === "cMapUrl" ? "cmaps" : t === "standardFontDataUrl" ? "standard_fonts" : ""}/${n}`];
    if (!a) throw new Error(`缺少 PDF 本地解析资源：${n}`);
    const i = await fetch(a);
    if (!i.ok) throw new Error(`无法载入 PDF 本地解析资源：${n}`);
    return new Uint8Array(await i.arrayBuffer());
  }
}

function yBt(e) {
  return WO.workerSrc = bli, lor({
    data: Uint8Array.from(e),
    BinaryDataFactory: wli,
    useWorkerFetch: !1,
    useWasm: !1,
    useSystemFonts: !0,
    stopAtErrors: !0
  });
}

async function xli(e, t) {
  const n = yBt(e),
    r = [];
  let a = 0,
    i = !1;
  try {
    const o = await n.promise;
    for (let s = 1; s <= Math.min(o.numPages, 300); s++) {
      const l = await o.getPage(s),
        u = (await l.getTextContent()).items.map(h => "str" in h ? h.str + (h.hasEOL ? `
` : " ") : "").join("").trim();
      if (i || (i = !!u), r.push(`# 第 ${s} 页
${u || "（本页无文字层，图片内容尚未识别）"}`), a += u.length, l.cleanup(), a >= t || s === 300 && s < o.numPages) {
        r.push(`…（抽取已截断：已处理 ${s}/${o.numPages} 页，请按页处理原文件）`);
        break;
      }
    }
    if (!i) throw new Error("PDF 没有可提取的文字层（可能是扫描件），需要 OCR 后再读取");
    return r.join(`

`);
  } catch (o) {
    throw o instanceof Error && o.name === "PasswordException" ? new Error("PDF 已加密，请先提供解密后的文件；未读取其内容") : o;
  } finally {
    await n.destroy();
  }
}

const _li = Object.freeze(Object.defineProperty({
  __proto__: null,
  extractLocalSkillPdfText: xli,
  loadLocalPdf: yBt
}, Symbol.toStringTag, {
  value: "Module"
}));

function Nke(e) {
  const t = String(e || "");
  return /素材状态异常|期望状态为Active|status\s*=\s*Processing/i.test(t);
}

function bBt(e) {
  const t = String(e || "");
  return /may contain real person|input image may contain real person|含真人|真人脸/i.test(t);
}

function dsr(e) {
  return String(e || "").trim().replace(/\/+$/, "");
}

function nsn(e, t) {
  const n = String(e || "").trim();
  if (!n) throw new Error(`${t} 未配置`);
  return n;
}

function kli(e) {
  const t = String(e || "").trim();
  return /^https?:\/\//i.test(t) ? !!(/\.(png|jpe?g|webp|bmp|gif|tiff?)($|\?)/i.test(t) || /aliyuncs\.com/i.test(t)) : !1;
}

function Ali(e, t) {
  var a, i, o, s, l;
  const n = (t == null ? void 0 : t.url) || (t == null ? void 0 : t.file_url) || (t == null ? void 0 : t.download_url) || ((a = t == null ? void 0 : t.data) == null ? void 0 : a.url) || ((i = t == null ? void 0 : t.data) == null ? void 0 : i.file_url) || ((o = t == null ? void 0 : t.data) == null ? void 0 : o.download_url);
  if (typeof n == "string" && /^https?:\/\//i.test(n.trim())) return n.trim();
  const r = (t == null ? void 0 : t.id) || ((s = t == null ? void 0 : t.data) == null ? void 0 : s.id) || ((l = t == null ? void 0 : t.data) == null ? void 0 : l.file_id) || (t == null ? void 0 : t.file_id);
  return typeof r == "string" && r.trim() ? `${dsr(e)}/v1/files/${encodeURIComponent(r.trim())}/content` : null;
}

async function uot(e) {
  const t = e instanceof Error ? e.message : String(e || ""),
    n = window.prompt(x(`自动上传图片失败。

请粘贴一条“图片直链（Direct link）”（http(s)，通常以 .jpg/.png/.webp 结尾）。
注意：像 https://ibb.co/xxxx 这种“查看页链接”不是图片直链，会报格式不支持。
取消将中断创建。

错误信息：{0}`, t.slice(0, 240)), ""),
    r = String(n || "").trim();
  if (!r) throw e instanceof Error ? e : new Error(t);
  if (!/^https?:\/\//i.test(r)) throw new Error(`手动填写的图片地址需以 http:// 或 https:// 开头。${t.slice(0, 160)}`);
  if (!kli(r)) throw new Error("你粘贴的可能不是“图片直链”。请在图床选择 Direct link（例如 i.ibb.co 域名、或以 .jpg/.png/.webp 结尾的链接），再重试。");
  return r;
}

async function Sli(e, t) {
  const n = String(e || "").trim();
  if (/^https?:\/\//i.test(n)) return n;
  const r = nsn(t.baseUrl, "BASE URL"),
    a = nsn(t.apiKey, "API KEY"),
    i = dsr(r),
    o = await (await fetch(n)).blob(),
    s = o.type || "image/png",
    l = s.includes("webp") ? "webp" : s.includes("png") ? "png" : s.includes("bmp") ? "bmp" : s.includes("gif") ? "gif" : "jpg",
    d = new File([o], `seedance-upload.${l}`, {
      type: s
    }),
    u = new FormData();
  u.append("file", d);
  let h,
    p = "";
  try {
    h = await fetch(`${i}/v1/files`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${a}`
      },
      body: u
    }), p = await h.text().catch(() => "");
  } catch (y) {
    return await uot(y);
  }
  if (!h.ok) return await uot(new Error(`上传素材失败 (HTTP ${h.status}): ${p.slice(0, 200)}`));
  let m = {};
  try {
    m = p ? JSON.parse(p) : {};
  } catch {
    m = {};
  }
  const f = Ali(i, m) || (typeof p == "string" && /^https?:\/\//i.test(p.trim()) ? p.trim() : null);
  return f || (await uot(new Error(`上传成功但未解析到可访问 URL，响应前 240 字: ${p.slice(0, 240)}`)));
}

const Ili = Object.freeze(Object.defineProperty({
  __proto__: null,
  isHuyaVolcAssetProcessingError: Nke,
  isHuyaVolcRealPersonBlockedError: bBt,
  uploadImageToPublicHttpUrl: Sli
}, Symbol.toStringTag, {
  value: "Module"
}));

async function Cli(e) {
  var r;
  if (!e.isImage && !((r = e.type) != null && r.startsWith("image/"))) return null;
  const t = String(e.url || e.preview || "");
  if (/^data:image\//i.test(t)) return t;
  const n = e._assetId ? await ni.getAssetBlob(e._assetId) : e instanceof Blob && e.size ? e : null;
  if (n) return new Promise((a, i) => {
    const o = new FileReader();
    o.onload = () => a(String(o.result)), o.onerror = () => i(new Error(`无法读取图片：${e.name}`)), o.readAsDataURL(n);
  });
  if (/^https?:\/\//i.test(t) && !/^https?:\/\/(asset|tauri)\.localhost/i.test(t)) return t;
  throw new Error(`图片附件不可读取，请重新添加：${e.name}`);
}

const Eli = Object.freeze(Object.defineProperty({
  __proto__: null,
  localSkillImageInput: Cli
}, Symbol.toStringTag, {
  value: "Module"
}));

function usr(e) {
  if (!e) return null;
  const t = e.settings || {};
  if (kX(t.threedMeta)) return t.threedMeta;
  const n = String(t._ossModelUrl || t[_i] || "").trim(),
    r = String(t[Pi] || e.thumbnailUrl || e.content || "").trim();
  return !n && !r ? null : {
    asset_source: "imported",
    imported_asset_kind: "object",
    source_url: n || void 0,
    source_format: n && She(n) || "glb",
    rendered_image_url: r || void 0,
    src_thumbnail_url: r || void 0,
    display_name: e.nodeName || e.prompt || "3D"
  };
}

function vBt(e) {
  var l;
  if (e.type !== "3d") return null;
  const t = String(e._ossThumbnailUrl || e.thumbnailUrl || "").trim(),
    n = String(e.url || e.originalUrl || "").trim();
  if (!t && !n) return null;
  const r = {
      asset_source: "generated",
      imported_asset_kind: "object",
      display_name: e.prompt || e.modelName || "3D",
      source_url: n || void 0,
      source_format: e.threeDFormat || (n ? She(n) : void 0) || (n ? "glb" : void 0),
      rendered_image_url: t || void 0,
      src_thumbnail_url: t || void 0,
      lod_assets: (l = e.threeDFiles) == null ? void 0 : l.map(d => ({
        format: d.format,
        level: d.fileName || d.format,
        url: d.url
      }))
    },
    a = nr(t),
    i = nr(n),
    s = !!(ua() && (a || i || e._globalOssUrlOnly || e.ossUploaded));
  return {
    content: t || n,
    mediaType: "3d",
    nodeName: sW(e),
    settings: {
      mediaType: "3d",
      threedMeta: r,
      [OS]: String(e.id),
      ...(a || e._ossThumbnailUrl ? {
        [Pi]: a ? t : e._ossThumbnailUrl
      } : {}),
      ...(i ? {
        [_i]: n,
        _ossModelUrl: n
      } : e._ossRemoteUrl ? {
        [_i]: e._ossRemoteUrl
      } : {}),
      ...(s ? {
        [Cl]: !0,
        _globalOssUrlOnly: !0
      } : {})
    }
  };
}

async function Tli(e) {
  const t = vBt(e);
  if (!t) return null;
  if (!ua()) return t;
  const n = kX(t.settings.threedMeta) ? t.settings.threedMeta : null;
  if (!n) return t;
  if (nr(t.content) && (nr(String(n.source_url || "")) || !n.source_url)) return {
    ...t,
    settings: {
      ...t.settings,
      [Cl]: !0,
      _globalOssUrlOnly: !0,
      ...(nr(t.content) ? {
        [Pi]: t.content
      } : {}),
      ...(nr(String(n.source_url || "")) ? {
        [_i]: n.source_url,
        _ossModelUrl: n.source_url
      } : {})
    }
  };
  const {
      persistThreeDAssetsToOss: a
    } = await Ie(async () => {
      const {
        persistThreeDAssetsToOss: o
      } = await Promise.resolve().then(() => zmr);
      return {
        persistThreeDAssetsToOss: o
      };
    }, [], import.meta.url),
    i = await a(n, `3d-${e.id || "drop"}`);
  return i ? {
    content: i.displayUrl || t.content,
    mediaType: "3d",
    nodeName: t.nodeName,
    settings: {
      ...t.settings,
      threedMeta: i.meta,
      [Cl]: !0,
      _globalOssUrlOnly: !0,
      [Pi]: i.displayUrl,
      [_i]: i.modelUrl || i.remoteThumbUrl || i.displayUrl,
      _ossModelUrl: i.modelUrl
    }
  } : t;
}

function Mli(e) {
  const t = usr(e);
  if (!t) return !1;
  const n = CDt({
    sourceKind: "world-object",
    sourceMeta: t,
    sourceNodeId: e.id,
    title: e.nodeName || e.prompt || t.display_name || "3D",
    canCreateStudio: !!t.source_url
  });
  return n ? (nJ(n), !0) : !1;
}

const hsr = Object.freeze(Object.defineProperty({
  __proto__: null,
  buildHistoryThreeDInputDrop: vBt,
  openThreeDInputNodePreview: Mli,
  readThreeDInputNodeMeta: usr,
  resolveHistoryThreeDInputDrop: Tli
}, Symbol.toStringTag, {
  value: "Module"
}));

function Pli(e, t, n, r, a, i) {
  var d, u;
  const o = new Set(n.filter(h => {
    var p;
    return ((p = sm(h)) == null ? void 0 : p.sessionId) === t;
  }).map(h => h.id));
  i.references.forEach(h => o.add(h.nodeId));
  let s = !0;
  for (; s;) {
    const h = o.size;
    for (const p of n) o.has(p.id) && ((d = sm(p)) == null || d.references.forEach(m => o.add(m.nodeId)));
    for (const p of r) o.has(p.to) && (o.add(p.from), (u = p.fromGroupNodeIds) == null || u.forEach(m => o.add(m)));
    s = o.size !== h;
  }
  const l = n.filter(h => o.has(h.id)).map(h => {
    const p = sm(h);
    if (!p || p.sessionId === t) return h;
    const m = {
      ...h.settings
    };
    return delete m.studioGeneration, {
      ...h,
      settings: m
    };
  });
  if (l.length !== o.size) throw new Error("部分参考素材已不存在，请先移除失效引用");
  return JSON.parse(JSON.stringify({
    kind: "generation",
    workspaceId: e,
    sessionId: t,
    draft: i,
    nodes: l,
    connections: r.filter(h => o.has(h.from) && o.has(h.to)),
    history: a.filter(h => {
      var p;
      return o.has(h.sourceNodeId || "") || ((p = h.studioImageTool) == null ? void 0 : p.sessionId) === t;
    })
  }));
}

function psr(e) {
  return e.map(t => ({
    ...t,
    apiConfig: void 0,
    remoteTaskId: void 0,
    studioImageTool: void 0,
    status: t.status === "generating" ? "failed" : t.status,
    errorMsg: t.status === "generating" ? "保存时任务尚未完成，恢复后不会自动提交。" : t.errorMsg
  }));
}

function Rli(e, t) {
  const n = new Map(),
    r = l => (n.has(l) || n.set(l, crypto.randomUUID()), n.get(l)),
    a = r(e.sessionId);
  e.nodes.forEach(l => {
    r(l.id);
    const d = sm(l);
    d && r(d.roundId);
  }), e.history.forEach(l => r(l.id));
  const i = l => {
    if (!l || typeof l != "object") return;
    if (Array.isArray(l)) {
      l.forEach(i);
      return;
    }
    const d = l;
    typeof d.id == "string" && r(d.id), Object.values(d).forEach(i);
  };
  i(e.nodes), i(e.connections), i(e.history);
  const o = (l, d = "") => typeof l == "string" && /^(id|nodeId|sourceNodeId|targetPreviewId|selectedPreviewId|_autoCreatedPreviewId|from|to|sessionId|roundId|historyId|studioImageToolHistoryId)$/.test(d) ? n.get(l) || l : Array.isArray(l) ? l.map(u => typeof u == "string" && /^(historyIds|fromGroupNodeIds|studioGenerationFavoriteIds)$/.test(d) ? n.get(u) || u : o(u)) : !l || typeof l != "object" ? l : Object.fromEntries(Object.entries(l).filter(([u]) => !/^(remoteTaskId|taskId|requestKey|apiConfig|codexThreadId|studioImageTool.*|_ossUploading|_localFilePath|localFilePath)$/.test(u)).map(([u, h]) => [u, o(h, u)])),
    s = o(e);
  return s.workspaceId = t, s.sessionId = a, s.connections = s.connections.map(l => ({
    ...l,
    id: crypto.randomUUID()
  })), s.nodes = s.nodes.map(l => {
    var d;
    return {
      ...l,
      isGenerating: !1,
      extractingFrames: !1,
      errorMsg: l.isGenerating || (d = l.settings) != null && d.isGenerating ? "保存时任务尚未完成，恢复后不会自动提交。" : l.errorMsg,
      settings: {
        ...l.settings,
        isGenerating: !1,
        progress: void 0,
        studioGenerationSettled: !0
      }
    };
  }), s.history = psr(s.history), s;
}

async function Nli(e, t, n) {
  var o, s;
  if (e === "chat") return AUn(t);
  const r = await VUn(t),
    a = eg("studio-home", r.rootPath, t),
    i = new Set(r.messages.flatMap(l => {
      var d;
      return ((d = l.imageGenerations) == null ? void 0 : d.flatMap(u => u.historyIds)) || [];
    }));
  for (const l of i) {
    const d = ((o = y9t().find(u => u.item.id === l)) == null ? void 0 : o.item) || (await cZ(l));
    if (!d) throw new Error("部分 Harness 生成记录暂不可读取，请恢复缓存目录后重试");
    if (((s = d.harnessImage) == null ? void 0 : s.scope) !== a) throw new Error("生成记录不属于此会话，已停止保存");
    r.history.push(d);
  }
  if (n) try {
    const {
        resolveInsideLocalSkillRoot: l
      } = await Ie(async () => {
        const {
          resolveInsideLocalSkillRoot: u
        } = await Promise.resolve().then(() => O9t);
        return {
          resolveInsideLocalSkillRoot: u
        };
      }, void 0, import.meta.url),
      d = await Ie(() => Promise.resolve().then(() => oc), void 0, import.meta.url);
    for (const u of FUn(r.messages)) {
      const h = u.relPath.replace(/\\/g, "/").split("/"),
        p = l(r.rootPath, u.relPath);
      for (let y = 0; y <= h.length; y++) {
        const b = y ? l(r.rootPath, h.slice(0, y).join("/")) : r.rootPath,
          v = await d.lstat(b);
        if (v.isSymlink || (y === h.length ? !v.isFile : !v.isDirectory)) throw new Error(`生成文件路径已变化：${u.relPath}`);
      }
      const m = await d.readFile(p),
        f = URL.createObjectURL(new Blob([m]));
      r.files.push({
        name: u.relPath,
        url: f
      });
    }
  } catch (l) {
    throw r.files.forEach(d => URL.revokeObjectURL(d.url)), l;
  }
  return r;
}

async function jli(e, t, n, r) {
  const a = eg("studio-home", n, r),
    i = new Map(e.history.map(d => [d.id, crypto.randomUUID()])),
    o = new Map(),
    s = d => (o.has(d) || o.set(d, crypto.randomUUID()), o.get(d)),
    l = psr(e.history).map(d => ({
      ...d,
      id: i.get(d.id),
      sourceNodeId: void 0,
      harnessImage: d.harnessImage ? {
        ...d.harnessImage,
        scope: a,
        requestId: s(d.harnessImage.requestId)
      } : void 0
    }));
  if (l.length && (await wU(l)) !== l.length) throw new Error("生成记录恢复失败，请检查本地缓存目录；原存档已保留");
  for (const d of t) d.imageGenerations && (d.imageGenerations = d.imageGenerations.map(u => ({
    ...u,
    requestId: s(u.requestId),
    historyIds: u.historyIds.map(h => i.get(h)).filter(Boolean)
  })));
  Cz(l, !0, !0);
}

const msr = Object.freeze(Object.defineProperty({
  __proto__: null,
  captureLibraryThread: Nli,
  restoreHarnessLibraryImages: jli
}, Symbol.toStringTag, {
  value: "Module"
}));

/*
 * @license
 * docx-preview <https://github.com/VolodymyrBaydalka/docxjs>
 * Released under Apache License 2.0  <https://github.com/VolodymyrBaydalka/docxjs/blob/master/LICENSE>
 * Copyright Volodymyr Baydalka
 */var y0;

(function (e) {
  e.OfficeDocument = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument", e.FontTable = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable", e.Image = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", e.Numbering = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering", e.Styles = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles", e.StylesWithEffects = "http://schemas.microsoft.com/office/2007/relationships/stylesWithEffects", e.Theme = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme", e.Settings = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings", e.WebSettings = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/webSettings", e.Hyperlink = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink", e.Footnotes = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footnotes", e.Endnotes = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/endnotes", e.Footer = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer", e.Header = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/header", e.ExtendedProperties = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties", e.CoreProperties = "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties", e.CustomProperties = "http://schemas.openxmlformats.org/package/2006/relationships/metadata/custom-properties", e.Comments = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments", e.CommentsExtended = "http://schemas.microsoft.com/office/2011/relationships/commentsExtended", e.AltChunk = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/aFChunk";
})(y0 || (y0 = {}));

function Dli(e, t) {
  return t.elements(e).map(n => ({
    id: t.attr(n, "Id"),
    type: t.attr(n, "Type"),
    target: t.attr(n, "Target"),
    targetMode: t.attr(n, "TargetMode")
  }));
}

function Lli(e) {
  return e == null ? void 0 : e.replace(/[ .]+/g, "-").replace(/[&]+/g, "and").toLowerCase();
}

function J2t(e) {
  return /^[^"'].*\s.*[^"']$/.test(e) ? `'${e}'` : e;
}

function Q7e(e) {
  let t = e.lastIndexOf("/") + 1,
    n = t == 0 ? "" : e.substring(0, t),
    r = t == 0 ? e : e.substring(t);
  return [n, r];
}

function hot(e, t) {
  try {
    const n = "http://docx/";
    return new URL(e, n + t).toString().substring(n.length);
  } catch {
    return `${t}${e}`;
  }
}

function kO(e, t) {
  return e.reduce((n, r) => (n[t(r)] = r, n), {});
}

function Oli(e) {
  return new Promise((t, n) => {
    const r = new FileReader();
    r.onloadend = () => t(r.result), r.onerror = () => n(), r.readAsDataURL(e);
  });
}

function pot(e) {
  return e && typeof e == "object" && !Array.isArray(e);
}

function Z2t(e) {
  return typeof e == "string" || e instanceof String;
}

function lUe(e, ...t) {
  if (!t.length) return e;
  const n = t.shift();
  if (pot(e) && pot(n)) for (const r in n) if (pot(n[r])) {
    const a = e[r] ?? (e[r] = {});
    lUe(a, n[r]);
  } else e[r] = n[r];
  return lUe(e, ...t);
}

function kfe(e) {
  return Array.isArray(e) ? e : [e];
}

function Bli(e, t, n) {
  return t > e ? t : n < e ? n : e;
}

const fsr = {
    wordml: "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
  },
  ly = {
    Dxa: {
      mul: .05,
      unit: "pt"
    },
    Emu: {
      mul: 1 / 12700,
      unit: "pt"
    },
    FontSize: {
      mul: .5,
      unit: "pt"
    },
    Border: {
      mul: .125,
      unit: "pt",
      min: .25,
      max: 12
    },
    Point: {
      mul: 1,
      unit: "pt"
    },
    Percent: {
      mul: .02,
      unit: "%"
    }
  };

function gsr(e, t = ly.Dxa) {
  if (e == null || /.+(p[xt]|[%])$/.test(e)) return e;
  var n = parseInt(e) * t.mul;
  return t.min && t.max && (n = Bli(n, t.min, t.max)), `${n.toFixed(2)}${t.unit}`;
}

function Fli(e, t = !1) {
  switch (e) {
    case "1":
      return !0;
    case "0":
      return !1;
    case "on":
      return !0;
    case "off":
      return !1;
    case "true":
      return !0;
    case "false":
      return !1;
    default:
      return t;
  }
}

function ysr(e, t, n) {
  if (e.namespaceURI != fsr.wordml) return !1;
  switch (e.localName) {
    case "color":
      t.color = n.attr(e, "val");
      break;
    case "sz":
      t.fontSize = n.lengthAttr(e, "val", ly.FontSize);
      break;
    default:
      return !1;
  }
  return !0;
}

function zli(e, t = !1) {
  t && (e = e.replace(/<[?].*[?]>/, "")), e = $li(e);
  const n = new DOMParser().parseFromString(e, "application/xml"),
    r = Uli(n);
  if (r) throw new Error(r);
  return n;
}

function Uli(e) {
  var t;
  return (t = e.getElementsByTagName("parsererror")[0]) == null ? void 0 : t.textContent;
}

function $li(e) {
  return e.charCodeAt(0) === 65279 ? e.substring(1) : e;
}

function Gli(e) {
  return new XMLSerializer().serializeToString(e);
}

class bsr {
  elements(t, n = null) {
    const r = [];
    for (let a = 0, i = t.childNodes.length; a < i; a++) {
      let o = t.childNodes.item(a);
      o.nodeType == Node.ELEMENT_NODE && (n == null || o.localName == n) && r.push(o);
    }
    return r;
  }
  element(t, n) {
    for (let r = 0, a = t.childNodes.length; r < a; r++) {
      let i = t.childNodes.item(r);
      if (i.nodeType == 1 && i.localName == n) return i;
    }
    return null;
  }
  elementAttr(t, n, r) {
    var a = this.element(t, n);
    return a ? this.attr(a, r) : void 0;
  }
  attrs(t) {
    return Array.from(t.attributes);
  }
  attr(t, n) {
    for (let r = 0, a = t.attributes.length; r < a; r++) {
      let i = t.attributes.item(r);
      if (i.localName == n) return i.value;
    }
    return null;
  }
  intAttr(t, n, r = null) {
    var a = this.attr(t, n);
    return a ? parseInt(a) : r;
  }
  hexAttr(t, n, r = null) {
    var a = this.attr(t, n);
    return a ? parseInt(a, 16) : r;
  }
  floatAttr(t, n, r = null) {
    var a = this.attr(t, n);
    return a ? parseFloat(a) : r;
  }
  boolAttr(t, n, r = null) {
    return Fli(this.attr(t, n), r);
  }
  lengthAttr(t, n, r = ly.Dxa) {
    return gsr(this.attr(t, n), r);
  }
}

const Ma = new bsr();

class R3 {
  constructor(t, n) {
    this._package = t, this.path = n;
  }
  async load() {
    this.rels = await this._package.loadRelationships(this.path);
    const t = await this._package.load(this.path),
      n = this._package.parseXmlDocument(t);
    this._package.options.keepOrigin && (this._xmlDocument = n), this.parseXml(n.firstElementChild);
  }
  save() {
    this._package.update(this.path, Gli(this._xmlDocument));
  }
  parseXml(t) {}
}

const Vli = {
  embedRegular: "regular",
  embedBold: "bold",
  embedItalic: "italic",
  embedBoldItalic: "boldItalic"
};

function Hli(e, t) {
  return t.elements(e).map(n => Wli(n, t));
}

function Wli(e, t) {
  let n = {
    name: t.attr(e, "name"),
    embedFontRefs: []
  };
  for (let r of t.elements(e)) switch (r.localName) {
    case "family":
      n.family = t.attr(r, "val");
      break;
    case "altName":
      n.altName = t.attr(r, "val");
      break;
    case "embedRegular":
    case "embedBold":
    case "embedItalic":
    case "embedBoldItalic":
      n.embedFontRefs.push(qli(r, t));
      break;
  }
  return n;
}

function qli(e, t) {
  return {
    id: t.attr(e, "id"),
    key: t.attr(e, "fontKey"),
    type: Vli[e.localName]
  };
}

class Kli extends R3 {
  parseXml(t) {
    this.fonts = Hli(t, this._package.xmlParser);
  }
}

function Qli(e, t) {
  return t.elements(e).map(n => ({
    extension: t.attr(n, "Extension"),
    partName: t.attr(n, "PartName"),
    contentType: t.attr(n, "ContentType")
  }));
}

class wBt {
  constructor(t, n) {
    this._zip = t, this.options = n, this.xmlParser = new bsr();
  }
  get(t) {
    const n = Yli(t);
    return this._zip.files[n] ?? this._zip.files[n.replace(/\//g, "\\")];
  }
  update(t, n) {
    this._zip.file(t, n);
  }
  static async load(t, n) {
    const r = await fOt.loadAsync(t);
    return new wBt(r, n);
  }
  save(t = "blob") {
    return this._zip.generateAsync({
      type: t
    });
  }
  load(t, n = "string") {
    var r;
    return ((r = this.get(t)) == null ? void 0 : r.async(n)) ?? Promise.resolve(null);
  }
  async loadRelationships(t = null) {
    let n = "_rels/.rels";
    if (t != null) {
      const [a, i] = Q7e(t);
      n = `${a}_rels/${i}.rels`;
    }
    const r = await this.load(n);
    return r ? Dli(this.parseXmlDocument(r).firstElementChild, this.xmlParser) : null;
  }
  async loadContentTypes() {
    const t = await this.load("[Content_Types].xml");
    return t ? Qli(this.parseXmlDocument(t).firstElementChild, this.xmlParser) : [];
  }
  parseXmlDocument(t) {
    return zli(t, this.options.trimXmlDeclaration);
  }
}

function Yli(e) {
  return e.startsWith("/") ? e.substr(1) : e;
}

class Xli extends R3 {
  constructor(t, n, r) {
    super(t, n), this._documentParser = r;
  }
  parseXml(t) {
    this.body = this._documentParser.parseDocumentFile(t);
  }
}

function lMe(e, t) {
  return {
    type: t.attr(e, "val"),
    color: t.attr(e, "color"),
    size: t.lengthAttr(e, "sz", ly.Border),
    offset: t.lengthAttr(e, "space", ly.Point),
    frame: t.boolAttr(e, "frame"),
    shadow: t.boolAttr(e, "shadow")
  };
}

function Jli(e, t) {
  var n = {};
  for (let r of t.elements(e)) switch (r.localName) {
    case "left":
      n.left = lMe(r, t);
      break;
    case "top":
      n.top = lMe(r, t);
      break;
    case "right":
      n.right = lMe(r, t);
      break;
    case "bottom":
      n.bottom = lMe(r, t);
      break;
  }
  return n;
}

var rsn;

(function (e) {
  e.Continuous = "continuous", e.NextPage = "nextPage", e.NextColumn = "nextColumn", e.EvenPage = "evenPage", e.OddPage = "oddPage";
})(rsn || (rsn = {}));

function vsr(e, t = Ma) {
  var n = {};
  for (let r of t.elements(e)) switch (r.localName) {
    case "pgSz":
      n.pageSize = {
        width: t.lengthAttr(r, "w"),
        height: t.lengthAttr(r, "h"),
        orientation: t.attr(r, "orient")
      };
      break;
    case "type":
      n.type = t.attr(r, "val");
      break;
    case "pgMar":
      n.pageMargins = {
        left: t.lengthAttr(r, "left"),
        right: t.lengthAttr(r, "right"),
        top: t.lengthAttr(r, "top"),
        bottom: t.lengthAttr(r, "bottom"),
        header: t.lengthAttr(r, "header"),
        footer: t.lengthAttr(r, "footer"),
        gutter: t.lengthAttr(r, "gutter")
      };
      break;
    case "cols":
      n.columns = Zli(r, t);
      break;
    case "headerReference":
      (n.headerRefs ?? (n.headerRefs = [])).push(asn(r, t));
      break;
    case "footerReference":
      (n.footerRefs ?? (n.footerRefs = [])).push(asn(r, t));
      break;
    case "titlePg":
      n.titlePage = t.boolAttr(r, "val", !0);
      break;
    case "pgBorders":
      n.pageBorders = Jli(r, t);
      break;
    case "pgNumType":
      n.pageNumber = eci(r, t);
      break;
  }
  return n;
}

function Zli(e, t) {
  return {
    numberOfColumns: t.intAttr(e, "num"),
    space: t.lengthAttr(e, "space"),
    separator: t.boolAttr(e, "sep"),
    equalWidth: t.boolAttr(e, "equalWidth", !0),
    columns: t.elements(e, "col").map(n => ({
      width: t.lengthAttr(n, "w"),
      space: t.lengthAttr(n, "space")
    }))
  };
}

function eci(e, t) {
  return {
    chapSep: t.attr(e, "chapSep"),
    chapStyle: t.attr(e, "chapStyle"),
    format: t.attr(e, "fmt"),
    start: t.intAttr(e, "start")
  };
}

function asn(e, t) {
  return {
    id: t.attr(e, "id"),
    type: t.attr(e, "type")
  };
}

function tci(e, t) {
  return {
    before: t.lengthAttr(e, "before"),
    after: t.lengthAttr(e, "after"),
    line: t.intAttr(e, "line"),
    lineRule: t.attr(e, "lineRule")
  };
}

function xBt(e, t) {
  let n = {};
  for (let r of t.elements(e)) nci(r, n, t);
  return n;
}

function nci(e, t, n) {
  return !!ysr(e, t, n);
}

function wsr(e, t) {
  let n = {};
  for (let r of t.elements(e)) xsr(r, n, t);
  return n;
}

function xsr(e, t, n) {
  if (e.namespaceURI != fsr.wordml) return !1;
  if (ysr(e, t, n)) return !0;
  switch (e.localName) {
    case "tabs":
      t.tabs = rci(e, n);
      break;
    case "sectPr":
      t.sectionProps = vsr(e, n);
      break;
    case "numPr":
      t.numbering = aci(e, n);
      break;
    case "spacing":
      return t.lineSpacing = tci(e, n), !1;
    case "textAlignment":
      return t.textAlignment = n.attr(e, "val"), !1;
    case "keepLines":
      t.keepLines = n.boolAttr(e, "val", !0);
      break;
    case "keepNext":
      t.keepNext = n.boolAttr(e, "val", !0);
      break;
    case "pageBreakBefore":
      t.pageBreakBefore = n.boolAttr(e, "val", !0);
      break;
    case "outlineLvl":
      t.outlineLevel = n.intAttr(e, "val");
      break;
    case "pStyle":
      t.styleName = n.attr(e, "val");
      break;
    case "rPr":
      t.runProps = xBt(e, n);
      break;
    default:
      return !1;
  }
  return !0;
}

function rci(e, t) {
  return t.elements(e, "tab").map(n => ({
    position: t.lengthAttr(n, "pos"),
    leader: t.attr(n, "leader"),
    style: t.attr(n, "val")
  }));
}

function aci(e, t) {
  var n = {};
  for (let r of t.elements(e)) switch (r.localName) {
    case "numId":
      n.id = t.attr(r, "val");
      break;
    case "ilvl":
      n.level = t.intAttr(r, "val");
      break;
  }
  return n;
}

function ici(e, t) {
  let n = {
    numberings: [],
    abstractNumberings: [],
    bulletPictures: []
  };
  for (let r of t.elements(e)) switch (r.localName) {
    case "num":
      n.numberings.push(oci(r, t));
      break;
    case "abstractNum":
      n.abstractNumberings.push(sci(r, t));
      break;
    case "numPicBullet":
      n.bulletPictures.push(cci(r, t));
      break;
  }
  return n;
}

function oci(e, t) {
  let n = {
    id: t.attr(e, "numId"),
    overrides: []
  };
  for (let r of t.elements(e)) switch (r.localName) {
    case "abstractNumId":
      n.abstractId = t.attr(r, "val");
      break;
    case "lvlOverride":
      n.overrides.push(lci(r, t));
      break;
  }
  return n;
}

function sci(e, t) {
  let n = {
    id: t.attr(e, "abstractNumId"),
    levels: []
  };
  for (let r of t.elements(e)) switch (r.localName) {
    case "name":
      n.name = t.attr(r, "val");
      break;
    case "multiLevelType":
      n.multiLevelType = t.attr(r, "val");
      break;
    case "numStyleLink":
      n.numberingStyleLink = t.attr(r, "val");
      break;
    case "styleLink":
      n.styleLink = t.attr(r, "val");
      break;
    case "lvl":
      n.levels.push(_sr(r, t));
      break;
  }
  return n;
}

function _sr(e, t) {
  let n = {
    level: t.intAttr(e, "ilvl")
  };
  for (let r of t.elements(e)) switch (r.localName) {
    case "start":
      n.start = t.attr(r, "val");
      break;
    case "lvlRestart":
      n.restart = t.intAttr(r, "val");
      break;
    case "numFmt":
      n.format = t.attr(r, "val");
      break;
    case "lvlText":
      n.text = t.attr(r, "val");
      break;
    case "lvlJc":
      n.justification = t.attr(r, "val");
      break;
    case "lvlPicBulletId":
      n.bulletPictureId = t.attr(r, "val");
      break;
    case "pStyle":
      n.paragraphStyle = t.attr(r, "val");
      break;
    case "pPr":
      n.paragraphProps = wsr(r, t);
      break;
    case "rPr":
      n.runProps = xBt(r, t);
      break;
  }
  return n;
}

function lci(e, t) {
  let n = {
    level: t.intAttr(e, "ilvl")
  };
  for (let r of t.elements(e)) switch (r.localName) {
    case "startOverride":
      n.start = t.intAttr(r, "val");
      break;
    case "lvl":
      n.numberingLevel = _sr(r, t);
      break;
  }
  return n;
}

function cci(e, t) {
  var n = t.element(e, "pict"),
    r = n && t.element(n, "shape"),
    a = r && t.element(r, "imagedata");
  return a ? {
    id: t.attr(e, "numPicBulletId"),
    referenceId: t.attr(a, "id"),
    style: t.attr(r, "style")
  } : null;
}

class dci extends R3 {
  constructor(t, n, r) {
    super(t, n), this._documentParser = r;
  }
  parseXml(t) {
    Object.assign(this, ici(t, this._package.xmlParser)), this.domNumberings = this._documentParser.parseNumberingFile(t);
  }
}

class uci extends R3 {
  constructor(t, n, r) {
    super(t, n), this._documentParser = r;
  }
  parseXml(t) {
    this.styles = this._documentParser.parseStylesFile(t);
  }
}

var li;

(function (e) {
  e.Document = "document", e.Paragraph = "paragraph", e.Run = "run", e.Break = "break", e.NoBreakHyphen = "noBreakHyphen", e.Table = "table", e.Row = "row", e.Cell = "cell", e.Hyperlink = "hyperlink", e.SmartTag = "smartTag", e.Drawing = "drawing", e.Image = "image", e.Text = "text", e.Tab = "tab", e.Symbol = "symbol", e.BookmarkStart = "bookmarkStart", e.BookmarkEnd = "bookmarkEnd", e.Footer = "footer", e.Header = "header", e.FootnoteReference = "footnoteReference", e.EndnoteReference = "endnoteReference", e.Footnote = "footnote", e.Endnote = "endnote", e.SimpleField = "simpleField", e.ComplexField = "complexField", e.Instruction = "instruction", e.VmlPicture = "vmlPicture", e.MmlMath = "mmlMath", e.MmlMathParagraph = "mmlMathParagraph", e.MmlFraction = "mmlFraction", e.MmlFunction = "mmlFunction", e.MmlFunctionName = "mmlFunctionName", e.MmlNumerator = "mmlNumerator", e.MmlDenominator = "mmlDenominator", e.MmlRadical = "mmlRadical", e.MmlBase = "mmlBase", e.MmlDegree = "mmlDegree", e.MmlSuperscript = "mmlSuperscript", e.MmlSubscript = "mmlSubscript", e.MmlPreSubSuper = "mmlPreSubSuper", e.MmlSubArgument = "mmlSubArgument", e.MmlSuperArgument = "mmlSuperArgument", e.MmlNary = "mmlNary", e.MmlDelimiter = "mmlDelimiter", e.MmlRun = "mmlRun", e.MmlEquationArray = "mmlEquationArray", e.MmlLimit = "mmlLimit", e.MmlLimitLower = "mmlLimitLower", e.MmlMatrix = "mmlMatrix", e.MmlMatrixRow = "mmlMatrixRow", e.MmlBox = "mmlBox", e.MmlBar = "mmlBar", e.MmlGroupChar = "mmlGroupChar", e.VmlElement = "vmlElement", e.Inserted = "inserted", e.Deleted = "deleted", e.DeletedText = "deletedText", e.Comment = "comment", e.CommentReference = "commentReference", e.CommentRangeStart = "commentRangeStart", e.CommentRangeEnd = "commentRangeEnd", e.AltChunk = "altChunk";
})(li || (li = {}));

class ZZ {
  constructor() {
    this.children = [], this.cssStyle = {};
  }
}

class hci extends ZZ {
  constructor() {
    super(...arguments), this.type = li.Header;
  }
}

class pci extends ZZ {
  constructor() {
    super(...arguments), this.type = li.Footer;
  }
}

class ksr extends R3 {
  constructor(t, n, r) {
    super(t, n), this._documentParser = r;
  }
  parseXml(t) {
    this.rootElement = this.createRootElement(), this.rootElement.children = this._documentParser.parseBodyElements(t);
  }
}

class mci extends ksr {
  createRootElement() {
    return new hci();
  }
}

class fci extends ksr {
  createRootElement() {
    return new pci();
  }
}

function gci(e, t) {
  const n = {};
  for (let r of t.elements(e)) switch (r.localName) {
    case "Template":
      n.template = r.textContent;
      break;
    case "Pages":
      n.pages = Afe(r.textContent);
      break;
    case "Words":
      n.words = Afe(r.textContent);
      break;
    case "Characters":
      n.characters = Afe(r.textContent);
      break;
    case "Application":
      n.application = r.textContent;
      break;
    case "Lines":
      n.lines = Afe(r.textContent);
      break;
    case "Paragraphs":
      n.paragraphs = Afe(r.textContent);
      break;
    case "Company":
      n.company = r.textContent;
      break;
    case "AppVersion":
      n.appVersion = r.textContent;
      break;
  }
  return n;
}

function Afe(e) {
  if (!(typeof e > "u")) return parseInt(e);
}

class yci extends R3 {
  parseXml(t) {
    this.props = gci(t, this._package.xmlParser);
  }
}

function bci(e, t) {
  const n = {};
  for (let r of t.elements(e)) switch (r.localName) {
    case "title":
      n.title = r.textContent;
      break;
    case "description":
      n.description = r.textContent;
      break;
    case "subject":
      n.subject = r.textContent;
      break;
    case "creator":
      n.creator = r.textContent;
      break;
    case "keywords":
      n.keywords = r.textContent;
      break;
    case "language":
      n.language = r.textContent;
      break;
    case "lastModifiedBy":
      n.lastModifiedBy = r.textContent;
      break;
    case "revision":
      r.textContent && (n.revision = parseInt(r.textContent));
      break;
  }
  return n;
}

class vci extends R3 {
  parseXml(t) {
    this.props = bci(t, this._package.xmlParser);
  }
}

class wci {}

function xci(e, t) {
  var n = new wci(),
    r = t.element(e, "themeElements");
  for (let a of t.elements(r)) switch (a.localName) {
    case "clrScheme":
      n.colorScheme = _ci(a, t);
      break;
    case "fontScheme":
      n.fontScheme = kci(a, t);
      break;
  }
  return n;
}

function _ci(e, t) {
  var n = {
    name: t.attr(e, "name"),
    colors: {}
  };
  for (let i of t.elements(e)) {
    var r = t.element(i, "srgbClr"),
      a = t.element(i, "sysClr");
    r ? n.colors[i.localName] = t.attr(r, "val") : a && (n.colors[i.localName] = t.attr(a, "lastClr"));
  }
  return n;
}

function kci(e, t) {
  var n = {
    name: t.attr(e, "name")
  };
  for (let r of t.elements(e)) switch (r.localName) {
    case "majorFont":
      n.majorFont = isn(r, t);
      break;
    case "minorFont":
      n.minorFont = isn(r, t);
      break;
  }
  return n;
}

function isn(e, t) {
  return {
    latinTypeface: t.elementAttr(e, "latin", "typeface"),
    eaTypeface: t.elementAttr(e, "ea", "typeface"),
    csTypeface: t.elementAttr(e, "cs", "typeface")
  };
}

class Aci extends R3 {
  constructor(t, n) {
    super(t, n);
  }
  parseXml(t) {
    this.theme = xci(t, this._package.xmlParser);
  }
}

class Asr {}

class Sci extends Asr {
  constructor() {
    super(...arguments), this.type = li.Footnote;
  }
}

class Ici extends Asr {
  constructor() {
    super(...arguments), this.type = li.Endnote;
  }
}

class Ssr extends R3 {
  constructor(t, n, r) {
    super(t, n), this._documentParser = r;
  }
}

class Cci extends Ssr {
  constructor(t, n, r) {
    super(t, n, r);
  }
  parseXml(t) {
    this.notes = this._documentParser.parseNotes(t, "footnote", Sci);
  }
}

class Eci extends Ssr {
  constructor(t, n, r) {
    super(t, n, r);
  }
  parseXml(t) {
    this.notes = this._documentParser.parseNotes(t, "endnote", Ici);
  }
}

function Tci(e, t) {
  var n = {};
  for (let r of t.elements(e)) switch (r.localName) {
    case "defaultTabStop":
      n.defaultTabStop = t.lengthAttr(r, "val");
      break;
    case "footnotePr":
      n.footnoteProps = osn(r, t);
      break;
    case "endnotePr":
      n.endnoteProps = osn(r, t);
      break;
    case "autoHyphenation":
      n.autoHyphenation = t.boolAttr(r, "val");
      break;
    case "evenAndOddHeaders":
      n.evenAndOddHeaders = t.boolAttr(r, "val", !0);
      break;
  }
  return n;
}

function osn(e, t) {
  var n = {
    defaultNoteIds: []
  };
  for (let r of t.elements(e)) switch (r.localName) {
    case "numFmt":
      n.nummeringFormat = t.attr(r, "val");
      break;
    case "footnote":
    case "endnote":
      n.defaultNoteIds.push(t.attr(r, "id"));
      break;
  }
  return n;
}

class Mci extends R3 {
  constructor(t, n) {
    super(t, n);
  }
  parseXml(t) {
    this.settings = Tci(t, this._package.xmlParser);
  }
}

function Pci(e, t) {
  return t.elements(e, "property").map(n => {
    const r = n.firstChild;
    return {
      formatId: t.attr(n, "fmtid"),
      name: t.attr(n, "name"),
      type: r.nodeName,
      value: r.textContent
    };
  });
}

class Rci extends R3 {
  parseXml(t) {
    this.props = Pci(t, this._package.xmlParser);
  }
}

class Nci extends R3 {
  constructor(t, n, r) {
    super(t, n), this._documentParser = r;
  }
  parseXml(t) {
    this.comments = this._documentParser.parseComments(t), this.commentMap = kO(this.comments, n => n.id);
  }
}

class jci extends R3 {
  constructor(t, n) {
    super(t, n), this.comments = [];
  }
  parseXml(t) {
    const n = this._package.xmlParser;
    for (let r of n.elements(t, "commentEx")) this.comments.push({
      paraId: n.attr(r, "paraId"),
      paraIdParent: n.attr(r, "paraIdParent"),
      done: n.boolAttr(r, "done")
    });
    this.commentMap = kO(this.comments, r => r.paraId);
  }
}

const Dci = [{
  type: y0.OfficeDocument,
  target: "word/document.xml"
}, {
  type: y0.ExtendedProperties,
  target: "docProps/app.xml"
}, {
  type: y0.CoreProperties,
  target: "docProps/core.xml"
}, {
  type: y0.CustomProperties,
  target: "docProps/custom.xml"
}];

class _Bt {
  constructor() {
    this.parts = [], this.partsMap = {}, this.contentTypes = [];
  }
  static async load(t, n, r) {
    var a = new _Bt();
    return a._options = r, a._parser = n, a._package = await wBt.load(t, r), a.rels = await a._package.loadRelationships(), a.contentTypes = await a._package.loadContentTypes(), await Promise.all(Dci.map(i => {
      const o = a.rels.find(s => s.type === i.type) ?? i;
      return a.loadRelationshipPart(o.target, o.type);
    })), a;
  }
  save(t = "blob") {
    return this._package.save(t);
  }
  async loadRelationshipPart(t, n) {
    var a;
    if (this.partsMap[t]) return this.partsMap[t];
    if (!this._package.get(t)) return null;
    let r = null;
    switch (n) {
      case y0.OfficeDocument:
        this.documentPart = r = new Xli(this._package, t, this._parser);
        break;
      case y0.FontTable:
        this.fontTablePart = r = new Kli(this._package, t);
        break;
      case y0.Numbering:
        this.numberingPart = r = new dci(this._package, t, this._parser);
        break;
      case y0.Styles:
        this.stylesPart = r = new uci(this._package, t, this._parser);
        break;
      case y0.Theme:
        this.themePart = r = new Aci(this._package, t);
        break;
      case y0.Footnotes:
        this.footnotesPart = r = new Cci(this._package, t, this._parser);
        break;
      case y0.Endnotes:
        this.endnotesPart = r = new Eci(this._package, t, this._parser);
        break;
      case y0.Footer:
        r = new fci(this._package, t, this._parser);
        break;
      case y0.Header:
        r = new mci(this._package, t, this._parser);
        break;
      case y0.CoreProperties:
        this.corePropsPart = r = new vci(this._package, t);
        break;
      case y0.ExtendedProperties:
        this.extendedPropsPart = r = new yci(this._package, t);
        break;
      case y0.CustomProperties:
        r = new Rci(this._package, t);
        break;
      case y0.Settings:
        this.settingsPart = r = new Mci(this._package, t);
        break;
      case y0.Comments:
        this.commentsPart = r = new Nci(this._package, t, this._parser);
        break;
      case y0.CommentsExtended:
        this.commentsExtendedPart = r = new jci(this._package, t);
        break;
    }
    if (r == null) return Promise.resolve(null);
    if (this.partsMap[t] = r, this.parts.push(r), await r.load(), ((a = r.rels) == null ? void 0 : a.length) > 0) {
      const [i] = Q7e(r.path);
      await Promise.all(r.rels.map(o => this.loadRelationshipPart(hot(o.target, i), o.type)));
    }
    return r;
  }
  async loadDocumentImage(t, n) {
    const r = this.getPathById(n ?? this.documentPart, t);
    return r ? this.blobToURL(await this._package.load(r, "blob"), r) : null;
  }
  async loadNumberingImage(t) {
    const n = this.getPathById(this.numberingPart, t);
    return n ? this.blobToURL(await this._package.load(n, "blob"), n) : null;
  }
  async loadFont(t, n) {
    const r = this.getPathById(this.fontTablePart, t);
    if (!r) return null;
    const a = await this._package.load(r, "uint8array");
    return a && this.blobToURL(new Blob([Lci(a, n)]), r);
  }
  async loadAltChunk(t, n) {
    const r = this.getPathById(n ?? this.documentPart, t);
    return r ? this._package.load(r, "string") : Promise.resolve(null);
  }
  blobToURL(t, n) {
    if (!t) return null;
    if (n) {
      const r = this.contentTypes.find(a => a.partName === n || a.extension && n.endsWith(`.${a.extension}`));
      t = r ? new Blob([t], {
        type: r.contentType
      }) : t;
    }
    return this._options.useBase64URL ? Oli(t) : URL.createObjectURL(t);
  }
  findPartByRelId(t, n = null) {
    var r = (n.rels ?? this.rels).find(i => i.id == t);
    const a = n ? Q7e(n.path)[0] : "";
    return r ? this.partsMap[hot(r.target, a)] : null;
  }
  getPathById(t, n) {
    const r = t.rels.find(i => i.id == n),
      [a] = Q7e(t.path);
    return r ? hot(r.target, a) : null;
  }
}

function Lci(e, t) {
  const r = t.replace(/{|}|-/g, ""),
    a = new Array(16);
  for (let i = 0; i < 16; i++) a[16 - i - 1] = parseInt(r.substring(i * 2, i * 2 + 2), 16);
  for (let i = 0; i < 32; i++) e[i] = e[i] ^ a[i % 16];
  return e;
}

function Oci(e, t) {
  return {
    type: li.BookmarkStart,
    id: t.attr(e, "id"),
    name: t.attr(e, "name"),
    colFirst: t.intAttr(e, "colFirst"),
    colLast: t.intAttr(e, "colLast")
  };
}

function Bci(e, t) {
  return {
    type: li.BookmarkEnd,
    id: t.attr(e, "id")
  };
}

class Fci extends ZZ {
  constructor() {
    super(...arguments), this.type = li.VmlElement, this.attrs = {};
  }
}

function Isr(e, t) {
  var n = new Fci();
  switch (e.localName) {
    case "rect":
      n.tagName = "rect", Object.assign(n.attrs, {
        width: "100%",
        height: "100%"
      });
      break;
    case "oval":
      n.tagName = "ellipse", Object.assign(n.attrs, {
        cx: "50%",
        cy: "50%",
        rx: "50%",
        ry: "50%"
      });
      break;
    case "line":
      n.tagName = "line";
      break;
    case "shape":
      n.tagName = "g";
      break;
    case "textbox":
      n.tagName = "foreignObject", Object.assign(n.attrs, {
        width: "100%",
        height: "100%"
      });
      break;
    default:
      return null;
  }
  for (const r of Ma.attrs(e)) switch (r.localName) {
    case "style":
      n.cssStyleText = r.value;
      break;
    case "fillcolor":
      n.attrs.fill = r.value;
      break;
    case "from":
      const [a, i] = ssn(r.value);
      Object.assign(n.attrs, {
        x1: a,
        y1: i
      });
      break;
    case "to":
      const [o, s] = ssn(r.value);
      Object.assign(n.attrs, {
        x2: o,
        y2: s
      });
      break;
  }
  for (const r of Ma.elements(e)) switch (r.localName) {
    case "stroke":
      Object.assign(n.attrs, zci(r));
      break;
    case "fill":
      Object.assign(n.attrs, Uci());
      break;
    case "imagedata":
      n.tagName = "image", Object.assign(n.attrs, {
        width: "100%",
        height: "100%"
      }), n.imageHref = {
        id: Ma.attr(r, "id"),
        title: Ma.attr(r, "title")
      };
      break;
    case "txbxContent":
      n.children.push(...t.parseBodyElements(r));
      break;
    default:
      const a = Isr(r, t);
      a && n.children.push(a);
      break;
  }
  return n;
}

function zci(e) {
  return {
    stroke: Ma.attr(e, "color"),
    "stroke-width": Ma.lengthAttr(e, "weight", ly.Emu) ?? "1px"
  };
}

function Uci(e) {
  return {};
}

function ssn(e) {
  return e.split(",");
}

class $ci extends ZZ {
  constructor() {
    super(...arguments), this.type = li.Comment;
  }
}

class Gci extends ZZ {
  constructor(t) {
    super(), this.id = t, this.type = li.CommentReference;
  }
}

class Vci extends ZZ {
  constructor(t) {
    super(), this.id = t, this.type = li.CommentRangeStart;
  }
}

class Hci extends ZZ {
  constructor(t) {
    super(), this.id = t, this.type = li.CommentRangeEnd;
  }
}

var Y7e = {
  shd: "inherit",
  color: "black",
  borderColor: "black",
  highlight: "transparent"
};

const Wci = [],
  lsn = {
    oMath: li.MmlMath,
    oMathPara: li.MmlMathParagraph,
    f: li.MmlFraction,
    func: li.MmlFunction,
    fName: li.MmlFunctionName,
    num: li.MmlNumerator,
    den: li.MmlDenominator,
    rad: li.MmlRadical,
    deg: li.MmlDegree,
    e: li.MmlBase,
    sSup: li.MmlSuperscript,
    sSub: li.MmlSubscript,
    sPre: li.MmlPreSubSuper,
    sup: li.MmlSuperArgument,
    sub: li.MmlSubArgument,
    d: li.MmlDelimiter,
    nary: li.MmlNary,
    eqArr: li.MmlEquationArray,
    lim: li.MmlLimit,
    limLow: li.MmlLimitLower,
    m: li.MmlMatrix,
    mr: li.MmlMatrixRow,
    box: li.MmlBox,
    bar: li.MmlBar,
    groupChr: li.MmlGroupChar
  };

class qci {
  constructor(t) {
    this.options = {
      ignoreWidth: !1,
      debug: !1,
      ...t
    };
  }
  parseNotes(t, n, r) {
    var a = [];
    for (let i of Ma.elements(t, n)) {
      const o = new r();
      o.id = Ma.attr(i, "id"), o.noteType = Ma.attr(i, "type"), o.children = this.parseBodyElements(i), a.push(o);
    }
    return a;
  }
  parseComments(t) {
    var n = [];
    for (let r of Ma.elements(t, "comment")) {
      const a = new $ci();
      a.id = Ma.attr(r, "id"), a.author = Ma.attr(r, "author"), a.initials = Ma.attr(r, "initials"), a.date = Ma.attr(r, "date"), a.children = this.parseBodyElements(r), n.push(a);
    }
    return n;
  }
  parseDocumentFile(t) {
    var n = Ma.element(t, "body"),
      r = Ma.element(t, "background"),
      a = Ma.element(n, "sectPr");
    return {
      type: li.Document,
      children: this.parseBodyElements(n),
      props: a ? vsr(a, Ma) : {},
      cssStyle: r ? this.parseBackground(r) : {}
    };
  }
  parseBackground(t) {
    var n = {},
      r = One.colorAttr(t, "color");
    return r && (n["background-color"] = r), n;
  }
  parseBodyElements(t) {
    var n = [];
    for (const r of Ma.elements(t)) switch (r.localName) {
      case "p":
        n.push(this.parseParagraph(r));
        break;
      case "altChunk":
        n.push(this.parseAltChunk(r));
        break;
      case "tbl":
        n.push(this.parseTable(r));
        break;
      case "sdt":
        n.push(...this.parseSdt(r, a => this.parseBodyElements(a)));
        break;
    }
    return n;
  }
  parseStylesFile(t) {
    var n = [];
    for (const r of Ma.elements(t)) switch (r.localName) {
      case "style":
        n.push(this.parseStyle(r));
        break;
      case "docDefaults":
        n.push(this.parseDefaultStyles(r));
        break;
    }
    return n;
  }
  parseDefaultStyles(t) {
    var n = {
      id: null,
      name: null,
      target: null,
      basedOn: null,
      styles: []
    };
    for (const i of Ma.elements(t)) switch (i.localName) {
      case "rPrDefault":
        var r = Ma.element(i, "rPr");
        r && n.styles.push({
          target: "span",
          values: this.parseDefaultProperties(r, {})
        });
        break;
      case "pPrDefault":
        var a = Ma.element(i, "pPr");
        a && n.styles.push({
          target: "p",
          values: this.parseDefaultProperties(a, {})
        });
        break;
    }
    return n;
  }
  parseStyle(t) {
    var n = {
      id: Ma.attr(t, "styleId"),
      isDefault: Ma.boolAttr(t, "default"),
      name: null,
      target: null,
      basedOn: null,
      styles: [],
      linked: null
    };
    switch (Ma.attr(t, "type")) {
      case "paragraph":
        n.target = "p";
        break;
      case "table":
        n.target = "table";
        break;
      case "character":
        n.target = "span";
        break;
    }
    for (const r of Ma.elements(t)) switch (r.localName) {
      case "basedOn":
        n.basedOn = Ma.attr(r, "val");
        break;
      case "name":
        n.name = Ma.attr(r, "val");
        break;
      case "link":
        n.linked = Ma.attr(r, "val");
        break;
      case "next":
        n.next = Ma.attr(r, "val");
        break;
      case "aliases":
        n.aliases = Ma.attr(r, "val").split(",");
        break;
      case "pPr":
        n.styles.push({
          target: "p",
          values: this.parseDefaultProperties(r, {})
        }), n.paragraphProps = wsr(r, Ma);
        break;
      case "rPr":
        n.styles.push({
          target: "span",
          values: this.parseDefaultProperties(r, {})
        }), n.runProps = xBt(r, Ma);
        break;
      case "tblPr":
      case "tcPr":
        n.styles.push({
          target: "td",
          values: this.parseDefaultProperties(r, {})
        });
        break;
      case "tblStylePr":
        for (let a of this.parseTableStyle(r)) n.styles.push(a);
        break;
      case "rsid":
      case "qFormat":
      case "hidden":
      case "semiHidden":
      case "unhideWhenUsed":
      case "autoRedefine":
      case "uiPriority":
        break;
      default:
        this.options.debug && console.warn(`DOCX: Unknown style element: ${r.localName}`);
    }
    return n;
  }
  parseTableStyle(t) {
    var n = [],
      r = Ma.attr(t, "type"),
      a = "",
      i = "";
    switch (r) {
      case "firstRow":
        i = ".first-row", a = "tr.first-row td";
        break;
      case "lastRow":
        i = ".last-row", a = "tr.last-row td";
        break;
      case "firstCol":
        i = ".first-col", a = "td.first-col";
        break;
      case "lastCol":
        i = ".last-col", a = "td.last-col";
        break;
      case "band1Vert":
        i = ":not(.no-vband)", a = "td.odd-col";
        break;
      case "band2Vert":
        i = ":not(.no-vband)", a = "td.even-col";
        break;
      case "band1Horz":
        i = ":not(.no-hband)", a = "tr.odd-row";
        break;
      case "band2Horz":
        i = ":not(.no-hband)", a = "tr.even-row";
        break;
      default:
        return [];
    }
    for (const o of Ma.elements(t)) switch (o.localName) {
      case "pPr":
        n.push({
          target: `${a} p`,
          mod: i,
          values: this.parseDefaultProperties(o, {})
        });
        break;
      case "rPr":
        n.push({
          target: `${a} span`,
          mod: i,
          values: this.parseDefaultProperties(o, {})
        });
        break;
      case "tblPr":
      case "tcPr":
        n.push({
          target: a,
          mod: i,
          values: this.parseDefaultProperties(o, {})
        });
        break;
    }
    return n;
  }
  parseNumberingFile(t) {
    const n = [],
      r = [],
      a = [];
    for (const i of Ma.elements(t)) switch (i.localName) {
      case "abstractNum":
        n.push(...this.parseAbstractNumbering(i, a));
        break;
      case "numPicBullet":
        a.push(this.parseNumberingPicBullet(i));
        break;
      case "num":
        r.push({
          numId: Ma.attr(i, "numId"),
          abstractNumId: Ma.elementAttr(i, "abstractNumId", "val")
        });
        break;
    }
    return r.flatMap(i => n.filter(o => i.abstractNumId == o.id).map(o => ({
      ...o,
      id: i.numId
    })));
  }
  parseNumberingPicBullet(t) {
    var n = Ma.element(t, "pict"),
      r = n && Ma.element(n, "shape"),
      a = r && Ma.element(r, "imagedata");
    return a ? {
      id: Ma.intAttr(t, "numPicBulletId"),
      src: Ma.attr(a, "id"),
      style: Ma.attr(r, "style")
    } : null;
  }
  parseAbstractNumbering(t, n) {
    var r = [],
      a = Ma.attr(t, "abstractNumId");
    for (const i of Ma.elements(t)) switch (i.localName) {
      case "lvl":
        r.push(this.parseNumberingLevel(a, i, n));
        break;
    }
    return r;
  }
  parseNumberingLevel(t, n, r) {
    var a = {
      id: t,
      level: Ma.intAttr(n, "ilvl"),
      start: 1,
      pStyleName: void 0,
      pStyle: {},
      rStyle: {},
      suff: "tab"
    };
    for (const o of Ma.elements(n)) switch (o.localName) {
      case "start":
        a.start = Ma.intAttr(o, "val");
        break;
      case "pPr":
        this.parseDefaultProperties(o, a.pStyle);
        break;
      case "rPr":
        this.parseDefaultProperties(o, a.rStyle);
        break;
      case "lvlPicBulletId":
        var i = Ma.intAttr(o, "val");
        a.bullet = r.find(s => (s == null ? void 0 : s.id) == i);
        break;
      case "lvlText":
        a.levelText = Ma.attr(o, "val");
        break;
      case "pStyle":
        a.pStyleName = Ma.attr(o, "val");
        break;
      case "numFmt":
        a.format = Ma.attr(o, "val");
        break;
      case "suff":
        a.suff = Ma.attr(o, "val");
        break;
    }
    return a;
  }
  parseSdt(t, n) {
    const r = Ma.element(t, "sdtContent");
    return r ? n(r) : [];
  }
  parseChange(t, n, r) {
    var a;
    return {
      type: t,
      children: ((a = r(n)) == null ? void 0 : a.children) ?? [],
      id: Ma.attr(n, "id"),
      author: Ma.attr(n, "author"),
      date: Ma.attr(n, "date")
    };
  }
  parseAltChunk(t) {
    return {
      type: li.AltChunk,
      children: [],
      id: Ma.attr(t, "id")
    };
  }
  parseParagraph(t) {
    var n = {
      type: li.Paragraph,
      children: []
    };
    for (let r of Ma.elements(t)) switch (r.localName) {
      case "pPr":
        this.parseParagraphProperties(r, n);
        break;
      case "r":
        n.children.push(this.parseRun(r, n));
        break;
      case "hyperlink":
        n.children.push(this.parseHyperlink(r, n));
        break;
      case "smartTag":
        n.children.push(this.parseSmartTag(r, n));
        break;
      case "bookmarkStart":
        n.children.push(Oci(r, Ma));
        break;
      case "bookmarkEnd":
        n.children.push(Bci(r, Ma));
        break;
      case "commentRangeStart":
        n.children.push(new Vci(Ma.attr(r, "id")));
        break;
      case "commentRangeEnd":
        n.children.push(new Hci(Ma.attr(r, "id")));
        break;
      case "oMath":
      case "oMathPara":
        n.children.push(this.parseMathElement(r));
        break;
      case "sdt":
        n.children.push(...this.parseSdt(r, a => this.parseParagraph(a).children));
        break;
      case "ins":
        n.children.push(this.parseChange(li.Inserted, r, a => this.parseParagraph(a)));
        break;
      case "del":
        n.children.push(this.parseChange(li.Deleted, r, a => this.parseParagraph(a)));
        break;
    }
    return n;
  }
  parseParagraphProperties(t, n) {
    this.parseDefaultProperties(t, n.cssStyle = {}, null, r => {
      if (xsr(r, n, Ma)) return !0;
      switch (r.localName) {
        case "pStyle":
          n.styleName = Ma.attr(r, "val");
          break;
        case "cnfStyle":
          n.className = Cm.classNameOfCnfStyle(r);
          break;
        case "framePr":
          this.parseFrame(r, n);
          break;
        case "rPr":
          break;
        default:
          return !1;
      }
      return !0;
    });
  }
  parseFrame(t, n) {
    var r = Ma.attr(t, "dropCap");
    r == "drop" && (n.cssStyle.float = "left");
  }
  parseHyperlink(t, n) {
    var r = {
      type: li.Hyperlink,
      parent: n,
      children: []
    };
    r.anchor = Ma.attr(t, "anchor"), r.id = Ma.attr(t, "id");
    for (const a of Ma.elements(t)) switch (a.localName) {
      case "r":
        r.children.push(this.parseRun(a, r));
        break;
    }
    return r;
  }
  parseSmartTag(t, n) {
    var r = {
        type: li.SmartTag,
        parent: n,
        children: []
      },
      a = Ma.attr(t, "uri"),
      i = Ma.attr(t, "element");
    a && (r.uri = a), i && (r.element = i);
    for (const o of Ma.elements(t)) switch (o.localName) {
      case "r":
        r.children.push(this.parseRun(o, r));
        break;
      case "smartTag":
        r.children.push(this.parseSmartTag(o, r));
        break;
    }
    return r;
  }
  parseRun(t, n) {
    var r = {
      type: li.Run,
      parent: n,
      children: []
    };
    for (let a of Ma.elements(t)) switch (a = this.checkAlternateContent(a), a == null ? void 0 : a.localName) {
      case "t":
        r.children.push({
          type: li.Text,
          text: a.textContent
        });
        break;
      case "delText":
        r.children.push({
          type: li.DeletedText,
          text: a.textContent
        });
        break;
      case "commentReference":
        r.children.push(new Gci(Ma.attr(a, "id")));
        break;
      case "fldSimple":
        r.children.push({
          type: li.SimpleField,
          instruction: Ma.attr(a, "instr"),
          lock: Ma.boolAttr(a, "lock", !1),
          dirty: Ma.boolAttr(a, "dirty", !1)
        });
        break;
      case "instrText":
        r.fieldRun = !0, r.children.push({
          type: li.Instruction,
          text: a.textContent
        });
        break;
      case "fldChar":
        r.fieldRun = !0, r.children.push({
          type: li.ComplexField,
          charType: Ma.attr(a, "fldCharType"),
          lock: Ma.boolAttr(a, "lock", !1),
          dirty: Ma.boolAttr(a, "dirty", !1)
        });
        break;
      case "noBreakHyphen":
        r.children.push({
          type: li.NoBreakHyphen
        });
        break;
      case "br":
        r.children.push({
          type: li.Break,
          break: Ma.attr(a, "type") || "textWrapping"
        });
        break;
      case "lastRenderedPageBreak":
        r.children.push({
          type: li.Break,
          break: "lastRenderedPageBreak"
        });
        break;
      case "sym":
        r.children.push({
          type: li.Symbol,
          font: J2t(Ma.attr(a, "font")),
          char: Ma.hexAttr(a, "char")
        });
        break;
      case "tab":
        r.children.push({
          type: li.Tab
        });
        break;
      case "footnoteReference":
        r.children.push({
          type: li.FootnoteReference,
          id: Ma.attr(a, "id")
        });
        break;
      case "endnoteReference":
        r.children.push({
          type: li.EndnoteReference,
          id: Ma.attr(a, "id")
        });
        break;
      case "drawing":
        let i = this.parseDrawing(a);
        i && r.children.push(i);
        break;
      case "pict":
        r.children.push(this.parseVmlPicture(a));
        break;
      case "rPr":
        this.parseRunProperties(a, r);
        break;
    }
    return r;
  }
  parseMathElement(t) {
    const n = `${t.localName}Pr`,
      r = {
        type: lsn[t.localName],
        children: []
      };
    for (const i of Ma.elements(t)) if (lsn[i.localName]) r.children.push(this.parseMathElement(i));else if (i.localName == "r") {
      var a = this.parseRun(i);
      a.type = li.MmlRun, r.children.push(a);
    } else i.localName == n && (r.props = this.parseMathProperies(i));
    return r;
  }
  parseMathProperies(t) {
    const n = {};
    for (const r of Ma.elements(t)) switch (r.localName) {
      case "chr":
        n.char = Ma.attr(r, "val");
        break;
      case "vertJc":
        n.verticalJustification = Ma.attr(r, "val");
        break;
      case "pos":
        n.position = Ma.attr(r, "val");
        break;
      case "degHide":
        n.hideDegree = Ma.boolAttr(r, "val");
        break;
      case "begChr":
        n.beginChar = Ma.attr(r, "val");
        break;
      case "endChr":
        n.endChar = Ma.attr(r, "val");
        break;
    }
    return n;
  }
  parseRunProperties(t, n) {
    this.parseDefaultProperties(t, n.cssStyle = {}, null, r => {
      switch (r.localName) {
        case "rStyle":
          n.styleName = Ma.attr(r, "val");
          break;
        case "vertAlign":
          n.verticalAlign = Cm.valueOfVertAlign(r, !0);
          break;
        default:
          return !1;
      }
      return !0;
    });
  }
  parseVmlPicture(t) {
    const n = {
      type: li.VmlPicture,
      children: []
    };
    for (const r of Ma.elements(t)) {
      const a = Isr(r, this);
      a && n.children.push(a);
    }
    return n;
  }
  checkAlternateContent(t) {
    var i;
    if (t.localName != "AlternateContent") return t;
    var n = Ma.element(t, "Choice");
    if (n) {
      var r = Ma.attr(n, "Requires"),
        a = t.lookupNamespaceURI(r);
      if (Wci.includes(a)) return n.firstElementChild;
    }
    return (i = Ma.element(t, "Fallback")) == null ? void 0 : i.firstElementChild;
  }
  parseDrawing(t) {
    for (var n of Ma.elements(t)) switch (n.localName) {
      case "inline":
      case "anchor":
        return this.parseDrawingWrapper(n);
    }
  }
  parseDrawingWrapper(t) {
    var n = {
        type: li.Drawing,
        children: [],
        cssStyle: {}
      },
      r = t.localName == "anchor";
    let a = null,
      i = Ma.boolAttr(t, "simplePos");
    Ma.boolAttr(t, "behindDoc");
    let o = {
        relative: "page",
        align: "left",
        offset: "0"
      },
      s = {
        relative: "page",
        align: "top",
        offset: "0"
      };
    for (var l of Ma.elements(t)) switch (l.localName) {
      case "simplePos":
        i && (o.offset = Ma.lengthAttr(l, "x", ly.Emu), s.offset = Ma.lengthAttr(l, "y", ly.Emu));
        break;
      case "extent":
        n.cssStyle.width = Ma.lengthAttr(l, "cx", ly.Emu), n.cssStyle.height = Ma.lengthAttr(l, "cy", ly.Emu);
        break;
      case "positionH":
      case "positionV":
        if (!i) {
          let p = l.localName == "positionH" ? o : s;
          var d = Ma.element(l, "align"),
            u = Ma.element(l, "posOffset");
          p.relative = Ma.attr(l, "relativeFrom") ?? p.relative, d && (p.align = d.textContent), u && (p.offset = gsr(u.textContent, ly.Emu));
        }
        break;
      case "wrapTopAndBottom":
        a = "wrapTopAndBottom";
        break;
      case "wrapNone":
        a = "wrapNone";
        break;
      case "graphic":
        var h = this.parseGraphic(l);
        h && n.children.push(h);
        break;
    }
    return a == "wrapTopAndBottom" ? (n.cssStyle.display = "block", o.align && (n.cssStyle["text-align"] = o.align, n.cssStyle.width = "100%")) : a == "wrapNone" ? (n.cssStyle.display = "block", n.cssStyle.position = "relative", n.cssStyle.width = "0px", n.cssStyle.height = "0px", o.offset && (n.cssStyle.left = o.offset), s.offset && (n.cssStyle.top = s.offset)) : r && (o.align == "left" || o.align == "right") && (n.cssStyle.float = o.align), n;
  }
  parseGraphic(t) {
    var n = Ma.element(t, "graphicData");
    for (let r of Ma.elements(n)) switch (r.localName) {
      case "pic":
        return this.parsePicture(r);
    }
    return null;
  }
  parsePicture(t) {
    var n = {
        type: li.Image,
        src: "",
        cssStyle: {}
      },
      r = Ma.element(t, "blipFill"),
      a = Ma.element(r, "blip"),
      i = Ma.element(r, "srcRect");
    n.src = Ma.attr(a, "embed"), i && (n.srcRect = [Ma.intAttr(i, "l", 0) / 1e5, Ma.intAttr(i, "t", 0) / 1e5, Ma.intAttr(i, "r", 0) / 1e5, Ma.intAttr(i, "b", 0) / 1e5]);
    var o = Ma.element(t, "spPr"),
      s = Ma.element(o, "xfrm");
    if (n.cssStyle.position = "relative", s) {
      n.rotation = Ma.intAttr(s, "rot", 0) / 6e4;
      for (var l of Ma.elements(s)) switch (l.localName) {
        case "ext":
          n.cssStyle.width = Ma.lengthAttr(l, "cx", ly.Emu), n.cssStyle.height = Ma.lengthAttr(l, "cy", ly.Emu);
          break;
        case "off":
          n.cssStyle.left = Ma.lengthAttr(l, "x", ly.Emu), n.cssStyle.top = Ma.lengthAttr(l, "y", ly.Emu);
          break;
      }
    }
    return n;
  }
  parseTable(t) {
    var n = {
      type: li.Table,
      children: []
    };
    for (const r of Ma.elements(t)) switch (r.localName) {
      case "tr":
        n.children.push(this.parseTableRow(r));
        break;
      case "tblGrid":
        n.columns = this.parseTableColumns(r);
        break;
      case "tblPr":
        this.parseTableProperties(r, n);
        break;
    }
    return n;
  }
  parseTableColumns(t) {
    var n = [];
    for (const r of Ma.elements(t)) switch (r.localName) {
      case "gridCol":
        n.push({
          width: Ma.lengthAttr(r, "w")
        });
        break;
    }
    return n;
  }
  parseTableProperties(t, n) {
    switch (n.cssStyle = {}, n.cellStyle = {}, this.parseDefaultProperties(t, n.cssStyle, n.cellStyle, r => {
      switch (r.localName) {
        case "tblStyle":
          n.styleName = Ma.attr(r, "val");
          break;
        case "tblLook":
          n.className = Cm.classNameOftblLook(r);
          break;
        case "tblpPr":
          this.parseTablePosition(r, n);
          break;
        case "tblStyleColBandSize":
          n.colBandSize = Ma.intAttr(r, "val");
          break;
        case "tblStyleRowBandSize":
          n.rowBandSize = Ma.intAttr(r, "val");
          break;
        case "hidden":
          n.cssStyle.display = "none";
          break;
        default:
          return !1;
      }
      return !0;
    }), n.cssStyle["text-align"]) {
      case "center":
        delete n.cssStyle["text-align"], n.cssStyle["margin-left"] = "auto", n.cssStyle["margin-right"] = "auto";
        break;
      case "right":
        delete n.cssStyle["text-align"], n.cssStyle["margin-left"] = "auto";
        break;
    }
  }
  parseTablePosition(t, n) {
    var r = Ma.lengthAttr(t, "topFromText"),
      a = Ma.lengthAttr(t, "bottomFromText"),
      i = Ma.lengthAttr(t, "rightFromText"),
      o = Ma.lengthAttr(t, "leftFromText");
    n.cssStyle.float = "left", n.cssStyle["margin-bottom"] = Cm.addSize(n.cssStyle["margin-bottom"], a), n.cssStyle["margin-left"] = Cm.addSize(n.cssStyle["margin-left"], o), n.cssStyle["margin-right"] = Cm.addSize(n.cssStyle["margin-right"], i), n.cssStyle["margin-top"] = Cm.addSize(n.cssStyle["margin-top"], r);
  }
  parseTableRow(t) {
    var n = {
      type: li.Row,
      children: []
    };
    for (const r of Ma.elements(t)) switch (r.localName) {
      case "tc":
        n.children.push(this.parseTableCell(r));
        break;
      case "trPr":
      case "tblPrEx":
        this.parseTableRowProperties(r, n);
        break;
    }
    return n;
  }
  parseTableRowProperties(t, n) {
    n.cssStyle = this.parseDefaultProperties(t, {}, null, r => {
      switch (r.localName) {
        case "cnfStyle":
          n.className = Cm.classNameOfCnfStyle(r);
          break;
        case "tblHeader":
          n.isHeader = Ma.boolAttr(r, "val");
          break;
        case "gridBefore":
          n.gridBefore = Ma.intAttr(r, "val");
          break;
        case "gridAfter":
          n.gridAfter = Ma.intAttr(r, "val");
          break;
        default:
          return !1;
      }
      return !0;
    });
  }
  parseTableCell(t) {
    var n = {
      type: li.Cell,
      children: []
    };
    for (const r of Ma.elements(t)) switch (r.localName) {
      case "tbl":
        n.children.push(this.parseTable(r));
        break;
      case "p":
        n.children.push(this.parseParagraph(r));
        break;
      case "tcPr":
        this.parseTableCellProperties(r, n);
        break;
    }
    return n;
  }
  parseTableCellProperties(t, n) {
    n.cssStyle = this.parseDefaultProperties(t, {}, null, r => {
      switch (r.localName) {
        case "gridSpan":
          n.span = Ma.intAttr(r, "val", null);
          break;
        case "vMerge":
          n.verticalMerge = Ma.attr(r, "val") ?? "continue";
          break;
        case "cnfStyle":
          n.className = Cm.classNameOfCnfStyle(r);
          break;
        default:
          return !1;
      }
      return !0;
    }), this.parseTableCellVerticalText(t, n);
  }
  parseTableCellVerticalText(t, n) {
    const r = {
      btLr: {
        writingMode: "vertical-rl",
        transform: "rotate(180deg)"
      },
      lrTb: {
        writingMode: "vertical-lr",
        transform: "none"
      },
      tbRl: {
        writingMode: "vertical-rl",
        transform: "none"
      }
    };
    for (const a of Ma.elements(t)) if (a.localName === "textDirection") {
      const i = Ma.attr(a, "val"),
        o = r[i] || {
          writingMode: "horizontal-tb"
        };
      n.cssStyle["writing-mode"] = o.writingMode, n.cssStyle.transform = o.transform;
    }
  }
  parseDefaultProperties(t, n = null, r = null, a = null) {
    n = n || {};
    for (const i of Ma.elements(t)) if (!(a != null && a(i))) switch (i.localName) {
      case "jc":
        n["text-align"] = Cm.valueOfJc(i);
        break;
      case "textAlignment":
        n["vertical-align"] = Cm.valueOfTextAlignment(i);
        break;
      case "color":
        n.color = One.colorAttr(i, "val", null, Y7e.color);
        break;
      case "sz":
        n["font-size"] = n["min-height"] = Ma.lengthAttr(i, "val", ly.FontSize);
        break;
      case "shd":
        n["background-color"] = One.colorAttr(i, "fill", null, Y7e.shd);
        break;
      case "highlight":
        n["background-color"] = One.colorAttr(i, "val", null, Y7e.highlight);
        break;
      case "vertAlign":
        break;
      case "position":
        n.verticalAlign = Ma.lengthAttr(i, "val", ly.FontSize);
        break;
      case "tcW":
        if (this.options.ignoreWidth) break;
      case "tblW":
        n.width = Cm.valueOfSize(i, "w");
        break;
      case "trHeight":
        this.parseTrHeight(i, n);
        break;
      case "strike":
        n["text-decoration"] = Ma.boolAttr(i, "val", !0) ? "line-through" : "none";
        break;
      case "b":
        n["font-weight"] = Ma.boolAttr(i, "val", !0) ? "bold" : "normal";
        break;
      case "i":
        n["font-style"] = Ma.boolAttr(i, "val", !0) ? "italic" : "normal";
        break;
      case "caps":
        n["text-transform"] = Ma.boolAttr(i, "val", !0) ? "uppercase" : "none";
        break;
      case "smallCaps":
        n["font-variant"] = Ma.boolAttr(i, "val", !0) ? "small-caps" : "none";
        break;
      case "u":
        this.parseUnderline(i, n);
        break;
      case "ind":
      case "tblInd":
        this.parseIndentation(i, n);
        break;
      case "rFonts":
        this.parseFont(i, n);
        break;
      case "tblBorders":
        this.parseBorderProperties(i, r || n);
        break;
      case "tblCellSpacing":
        n["border-spacing"] = Cm.valueOfMargin(i), n["border-collapse"] = "separate";
        break;
      case "pBdr":
        this.parseBorderProperties(i, n);
        break;
      case "bdr":
        n.border = Cm.valueOfBorder(i);
        break;
      case "tcBorders":
        this.parseBorderProperties(i, n);
        break;
      case "vanish":
        Ma.boolAttr(i, "val", !0) && (n.display = "none");
        break;
      case "kern":
        break;
      case "noWrap":
        break;
      case "tblCellMar":
      case "tcMar":
        this.parseMarginProperties(i, r || n);
        break;
      case "tblLayout":
        n["table-layout"] = Cm.valueOfTblLayout(i);
        break;
      case "vAlign":
        n["vertical-align"] = Cm.valueOfTextAlignment(i);
        break;
      case "spacing":
        t.localName == "pPr" && this.parseSpacing(i, n);
        break;
      case "wordWrap":
        Ma.boolAttr(i, "val") && (n["overflow-wrap"] = "break-word");
        break;
      case "suppressAutoHyphens":
        n.hyphens = Ma.boolAttr(i, "val", !0) ? "none" : "auto";
        break;
      case "lang":
        n.$lang = Ma.attr(i, "val");
        break;
      case "rtl":
      case "bidi":
        Ma.boolAttr(i, "val", !0) && (n.direction = "rtl");
        break;
      case "bCs":
      case "iCs":
      case "szCs":
      case "tabs":
      case "outlineLvl":
      case "contextualSpacing":
      case "tblStyleColBandSize":
      case "tblStyleRowBandSize":
      case "webHidden":
      case "pageBreakBefore":
      case "suppressLineNumbers":
      case "keepLines":
      case "keepNext":
      case "widowControl":
      case "noProof":
        break;
      default:
        this.options.debug && console.warn(`DOCX: Unknown document element: ${t.localName}.${i.localName}`);
        break;
    }
    return n;
  }
  parseUnderline(t, n) {
    var r = Ma.attr(t, "val");
    if (r != null) {
      switch (r) {
        case "dash":
        case "dashDotDotHeavy":
        case "dashDotHeavy":
        case "dashedHeavy":
        case "dashLong":
        case "dashLongHeavy":
        case "dotDash":
        case "dotDotDash":
          n["text-decoration"] = "underline dashed";
          break;
        case "dotted":
        case "dottedHeavy":
          n["text-decoration"] = "underline dotted";
          break;
        case "double":
          n["text-decoration"] = "underline double";
          break;
        case "single":
        case "thick":
          n["text-decoration"] = "underline";
          break;
        case "wave":
        case "wavyDouble":
        case "wavyHeavy":
          n["text-decoration"] = "underline wavy";
          break;
        case "words":
          n["text-decoration"] = "underline";
          break;
        case "none":
          n["text-decoration"] = "none";
          break;
      }
      var a = One.colorAttr(t, "color");
      a && (n["text-decoration-color"] = a);
    }
  }
  parseFont(t, n) {
    var r = Ma.attr(t, "ascii"),
      a = Cm.themeValue(t, "asciiTheme"),
      i = Ma.attr(t, "eastAsia"),
      o = [r, a, i].filter(s => s).map(s => J2t(s));
    o.length > 0 && (n["font-family"] = [...new Set(o)].join(", "));
  }
  parseIndentation(t, n) {
    var r = Ma.lengthAttr(t, "firstLine"),
      a = Ma.lengthAttr(t, "hanging"),
      i = Ma.lengthAttr(t, "left"),
      o = Ma.lengthAttr(t, "start"),
      s = Ma.lengthAttr(t, "right"),
      l = Ma.lengthAttr(t, "end");
    r && (n["text-indent"] = r), a && (n["text-indent"] = `-${a}`), (i || o) && (n["margin-inline-start"] = i || o), (s || l) && (n["margin-inline-end"] = s || l);
  }
  parseSpacing(t, n) {
    var r = Ma.lengthAttr(t, "before"),
      a = Ma.lengthAttr(t, "after"),
      i = Ma.intAttr(t, "line", null),
      o = Ma.attr(t, "lineRule");
    if (r && (n["margin-top"] = r), a && (n["margin-bottom"] = a), i !== null) switch (o) {
      case "auto":
        n["line-height"] = `${(i / 240).toFixed(2)}`;
        break;
      case "atLeast":
        n["line-height"] = `calc(100% + ${i / 20}pt)`;
        break;
      default:
        n["line-height"] = n["min-height"] = `${i / 20}pt`;
        break;
    }
  }
  parseMarginProperties(t, n) {
    for (const r of Ma.elements(t)) switch (r.localName) {
      case "left":
        n["padding-left"] = Cm.valueOfMargin(r);
        break;
      case "right":
        n["padding-right"] = Cm.valueOfMargin(r);
        break;
      case "top":
        n["padding-top"] = Cm.valueOfMargin(r);
        break;
      case "bottom":
        n["padding-bottom"] = Cm.valueOfMargin(r);
        break;
    }
  }
  parseTrHeight(t, n) {
    switch (Ma.attr(t, "hRule")) {
      case "exact":
        n.height = Ma.lengthAttr(t, "val");
        break;
      case "atLeast":
      default:
        n.height = Ma.lengthAttr(t, "val");
        break;
    }
  }
  parseBorderProperties(t, n) {
    for (const r of Ma.elements(t)) switch (r.localName) {
      case "start":
      case "left":
        n["border-left"] = Cm.valueOfBorder(r);
        break;
      case "end":
      case "right":
        n["border-right"] = Cm.valueOfBorder(r);
        break;
      case "top":
        n["border-top"] = Cm.valueOfBorder(r);
        break;
      case "bottom":
        n["border-bottom"] = Cm.valueOfBorder(r);
        break;
    }
  }
}

const Kci = ["black", "blue", "cyan", "darkBlue", "darkCyan", "darkGray", "darkGreen", "darkMagenta", "darkRed", "darkYellow", "green", "lightGray", "magenta", "none", "red", "white", "yellow"];

class One {
  static colorAttr(t, n, r = null, a = "black") {
    var i = Ma.attr(t, n);
    if (i) return i == "auto" ? a : Kci.includes(i) ? i : `#${i}`;
    var o = Ma.attr(t, "themeColor");
    return o ? `var(--docx-${o}-color)` : r;
  }
}

let Cm = class Csr {
  static themeValue(t, n) {
    var r = Ma.attr(t, n);
    return r ? `var(--docx-${r}-font)` : null;
  }
  static valueOfSize(t, n) {
    var r = ly.Dxa;
    switch (Ma.attr(t, "type")) {
      case "dxa":
        break;
      case "pct":
        r = ly.Percent;
        break;
      case "auto":
        return "auto";
    }
    return Ma.lengthAttr(t, n, r);
  }
  static valueOfMargin(t) {
    return Ma.lengthAttr(t, "w");
  }
  static valueOfBorder(t) {
    var n = Csr.parseBorderType(Ma.attr(t, "val"));
    if (n == "none") return "none";
    var r = One.colorAttr(t, "color"),
      a = Ma.lengthAttr(t, "sz", ly.Border);
    return `${a} ${n} ${r == "auto" ? Y7e.borderColor : r}`;
  }
  static parseBorderType(t) {
    switch (t) {
      case "single":
        return "solid";
      case "dashDotStroked":
        return "solid";
      case "dashed":
        return "dashed";
      case "dashSmallGap":
        return "dashed";
      case "dotDash":
        return "dotted";
      case "dotDotDash":
        return "dotted";
      case "dotted":
        return "dotted";
      case "double":
        return "double";
      case "doubleWave":
        return "double";
      case "inset":
        return "inset";
      case "nil":
        return "none";
      case "none":
        return "none";
      case "outset":
        return "outset";
      case "thick":
        return "solid";
      case "thickThinLargeGap":
        return "solid";
      case "thickThinMediumGap":
        return "solid";
      case "thickThinSmallGap":
        return "solid";
      case "thinThickLargeGap":
        return "solid";
      case "thinThickMediumGap":
        return "solid";
      case "thinThickSmallGap":
        return "solid";
      case "thinThickThinLargeGap":
        return "solid";
      case "thinThickThinMediumGap":
        return "solid";
      case "thinThickThinSmallGap":
        return "solid";
      case "threeDEmboss":
        return "solid";
      case "threeDEngrave":
        return "solid";
      case "triple":
        return "double";
      case "wave":
        return "solid";
    }
    return "solid";
  }
  static valueOfTblLayout(t) {
    var n = Ma.attr(t, "val");
    return n == "fixed" ? "fixed" : "auto";
  }
  static classNameOfCnfStyle(t) {
    const n = Ma.attr(t, "val"),
      r = ["first-row", "last-row", "first-col", "last-col", "odd-col", "even-col", "odd-row", "even-row", "ne-cell", "nw-cell", "se-cell", "sw-cell"];
    if (n) return r.filter((i, o) => n[o] == "1").join(" ");
    const a = ["firstRow", "lastRow", "firstColumn", "lastColumn", "oddVBand", "evenVBand", "oddHBand", "evenHBand", "firstRowLastColumn", "firstRowFirstColumn", "lastRowLastColumn", "lastRowFirstColumn"];
    return r.filter((i, o) => Ma.boolAttr(t, a[o])).join(" ");
  }
  static valueOfJc(t) {
    var n = Ma.attr(t, "val");
    switch (n) {
      case "start":
      case "left":
        return "left";
      case "center":
        return "center";
      case "end":
      case "right":
        return "right";
      case "both":
        return "justify";
    }
    return n;
  }
  static valueOfVertAlign(t, n = !1) {
    var r = Ma.attr(t, "val");
    switch (r) {
      case "subscript":
        return "sub";
      case "superscript":
        return n ? "sup" : "super";
    }
    return n ? null : r;
  }
  static valueOfTextAlignment(t) {
    var n = Ma.attr(t, "val");
    switch (n) {
      case "auto":
      case "baseline":
        return "baseline";
      case "top":
        return "top";
      case "center":
        return "middle";
      case "bottom":
        return "bottom";
    }
    return n;
  }
  static addSize(t, n) {
    return t == null ? n : n == null ? t : `calc(${t} + ${n})`;
  }
  static classNameOftblLook(t) {
    const n = Ma.hexAttr(t, "val", 0);
    let r = "";
    return (Ma.boolAttr(t, "firstRow") || n & 32) && (r += " first-row"), (Ma.boolAttr(t, "lastRow") || n & 64) && (r += " last-row"), (Ma.boolAttr(t, "firstColumn") || n & 128) && (r += " first-col"), (Ma.boolAttr(t, "lastColumn") || n & 256) && (r += " last-col"), (Ma.boolAttr(t, "noHBand") || n & 512) && (r += " no-hband"), (Ma.boolAttr(t, "noVBand") || n & 1024) && (r += " no-vband"), r.trim();
  }
};

const csn = {
    pos: 0,
    leader: "none",
    style: "left"
  },
  Qci = 50;

function Yci(e = document.body) {
  const t = document.createElement("div");
  t.style.width = "100pt", e.appendChild(t);
  const n = 100 / t.offsetWidth;
  return e.removeChild(t), n;
}

function Xci(e, t, n, r = 72 / 96) {
  const a = e.closest("p"),
    i = e.getBoundingClientRect(),
    o = a.getBoundingClientRect(),
    s = getComputedStyle(a),
    l = (t == null ? void 0 : t.length) > 0 ? t.map(_ => ({
      pos: dsn(_.position),
      leader: _.leader,
      style: _.style
    })).sort((_, w) => _.pos - w.pos) : [csn],
    d = l[l.length - 1],
    u = o.width * r,
    h = dsn(n);
  let p = d.pos + h;
  if (p < u) for (; p < u && l.length < Qci; p += h) l.push({
    ...csn,
    pos: p
  });
  const m = parseFloat(s.marginLeft),
    f = o.left + m,
    y = (i.left - f) * r,
    b = l.find(_ => _.style != "clear" && _.pos > y);
  if (b == null) return;
  let v = 1;
  if (b.style == "right" || b.style == "center") {
    const _ = Array.from(a.querySelectorAll(`.${e.className}`)),
      w = _.indexOf(e) + 1,
      k = document.createRange();
    k.setStart(e, 1), w < _.length ? k.setEndBefore(_[w]) : k.setEndAfter(a);
    const A = b.style == "center" ? .5 : 1,
      S = k.getBoundingClientRect(),
      C = S.left + A * S.width - (o.left - m);
    v = b.pos - C * r;
  } else v = b.pos - y;
  switch (e.innerHTML = "&nbsp;", e.style.textDecoration = "inherit", e.style.wordSpacing = `${v.toFixed(0)}pt`, b.leader) {
    case "dot":
    case "middleDot":
      e.style.textDecoration = "underline", e.style.textDecorationStyle = "dotted";
      break;
    case "hyphen":
    case "heavy":
    case "underscore":
      e.style.textDecoration = "underline";
      break;
  }
}

function dsn(e) {
  return parseFloat(e);
}

var yh;

(function (e) {
  e.html = "http://www.w3.org/1999/xhtml", e.svg = "http://www.w3.org/2000/svg", e.mathML = "http://www.w3.org/1998/Math/MathML";
})(yh || (yh = {}));

function jke(e) {
  if (Z2t(e)) return document.createTextNode(e);
  if (e instanceof Node) return e;
  const {
    ns: t,
    tagName: n,
    className: r,
    style: a,
    children: i,
    ...o
  } = e;
  if (n === "#fragment") {
    const l = document.createDocumentFragment();
    return i && i.forEach(d => l.appendChild(jke(d))), l;
  }
  if (n === "#comment") return document.createComment(i ? i[0] : "");
  const s = t ? document.createElementNS(t, n) : document.createElement(n);
  if (r && s.setAttribute("class", r), a && (Z2t(a) ? s.setAttribute("style", a) : Object.assign(s.style, a)), o) for (const [l, d] of Object.entries(o)) d !== void 0 && (s[l] = d);
  return i && i.forEach(l => s.appendChild(jke(l))), s;
}

function Jci(...e) {
  return e.filter(Boolean).join(" ");
}

class Zci {
  constructor() {
    this.className = "docx", this.styleMap = {}, this.currentPart = null, this.tableVerticalMerges = [], this.currentVerticalMerge = null, this.tableCellPositions = [], this.currentCellPosition = null, this.footnoteMap = {}, this.endnoteMap = {}, this.currentEndnoteIds = [], this.usedHederFooterParts = [], this.currentTabs = [], this.commentMap = {}, this.tasks = [], this.postRenderTasks = [], this.h = jke;
  }
  async render(t, n) {
    var i;
    this.document = t, this.options = n, this.className = n.className, this.rootSelector = n.inWrapper ? `.${this.className}-wrapper` : ":root", this.h = n.h ?? jke, this.styleMap = null, this.tasks = [], this.options.renderComments && globalThis.Highlight && (this.commentHighlight = new Highlight());
    const r = [...this.renderDefaultStyle()];
    t.themePart && r.push(...this.renderTheme(t.themePart)), t.stylesPart != null && (this.styleMap = this.processStyles(t.stylesPart.styles), r.push(...this.renderStyles(t.stylesPart.styles))), t.numberingPart && (this.prodessNumberings(t.numberingPart.domNumberings), r.push(...(await this.renderNumbering(t.numberingPart.domNumberings)))), t.footnotesPart && (this.footnoteMap = kO(t.footnotesPart.notes, o => o.id)), t.endnotesPart && (this.endnoteMap = kO(t.endnotesPart.notes, o => o.id)), t.settingsPart && (this.defaultTabSize = (i = t.settingsPart.settings) == null ? void 0 : i.defaultTabStop), !n.ignoreFonts && t.fontTablePart && r.push(...(await this.renderFontTable(t.fontTablePart)));
    var a = this.renderSections(t.documentPart.body);
    return this.options.inWrapper ? r.push(this.renderWrapper(a)) : r.push(...a), this.commentHighlight && n.renderComments && CSS.highlights.set(`${this.className}-comments`, this.commentHighlight), this.postRenderTasks.forEach(o => o()), await Promise.allSettled(this.tasks), this.refreshTabStops(), r;
  }
  renderTheme(t) {
    var o, s;
    const n = {},
      r = (o = t.theme) == null ? void 0 : o.fontScheme;
    r && (r.majorFont && (n["--docx-majorHAnsi-font"] = r.majorFont.latinTypeface), r.minorFont && (n["--docx-minorHAnsi-font"] = r.minorFont.latinTypeface));
    const a = (s = t.theme) == null ? void 0 : s.colorScheme;
    if (a) for (let [l, d] of Object.entries(a.colors)) n[`--docx-${l}-color`] = `#${d}`;
    const i = this.styleToString(`.${this.className}`, n);
    return [this.h({
      tagName: "#comment",
      children: ["docxjs document theme values"]
    }), this.h({
      tagName: "style",
      children: [i]
    })];
  }
  async renderFontTable(t) {
    const n = [];
    for (let r of t.fonts) for (let a of r.embedFontRefs) try {
      const i = await this.document.loadFont(a.id, a.key),
        o = {
          "font-family": J2t(r.name),
          src: `url(${i})`
        };
      (a.type == "bold" || a.type == "boldItalic") && (o["font-weight"] = "bold"), (a.type == "italic" || a.type == "boldItalic") && (o["font-style"] = "italic"), n.push(this.h({
        tagName: "#comment",
        children: [`docxjs ${r.name} font`]
      })), n.push(this.h({
        tagName: "style",
        children: [this.styleToString("@font-face", o)]
      }));
    } catch {
      this.options.debug && console.warn(`Can't load font with id ${a.id} and key ${a.key}`);
    }
    return n;
  }
  processStyleName(t) {
    return t ? `${this.className}_${Lli(t)}` : this.className;
  }
  processStyles(t) {
    const n = kO(t.filter(a => a.id != null), a => a.id);
    for (const a of t.filter(i => i.basedOn)) {
      var r = n[a.basedOn];
      if (r) {
        a.paragraphProps = lUe(a.paragraphProps, r.paragraphProps), a.runProps = lUe(a.runProps, r.runProps);
        for (const i of r.styles) {
          const o = a.styles.find(s => s.target == i.target);
          o ? this.copyStyleProperties(i.values, o.values) : a.styles.push({
            ...i,
            values: {
              ...i.values
            }
          });
        }
      } else this.options.debug && console.warn(`Can't find base style ${a.basedOn}`);
    }
    for (let a of t) a.cssName = this.processStyleName(a.id);
    return n;
  }
  prodessNumberings(t) {
    var n;
    for (let r of t.filter(a => a.pStyleName)) {
      const a = this.findStyle(r.pStyleName);
      (n = a == null ? void 0 : a.paragraphProps) != null && n.numbering && (a.paragraphProps.numbering.level = r.level);
    }
  }
  processElement(t) {
    if (t.children) for (var n of t.children) n.parent = t, n.type == li.Table ? this.processTable(n) : this.processElement(n);
  }
  processTable(t) {
    for (var n of t.children) for (var r of n.children) r.cssStyle = this.copyStyleProperties(t.cellStyle, r.cssStyle, ["border-left", "border-right", "border-top", "border-bottom", "padding-left", "padding-right", "padding-top", "padding-bottom"]), this.processElement(r);
  }
  copyStyleProperties(t, n, r = null) {
    if (!t) return n;
    n == null && (n = {}), r == null && (r = Object.getOwnPropertyNames(t));
    for (var a of r) t.hasOwnProperty(a) && !n.hasOwnProperty(a) && (n[a] = t[a]);
    return n;
  }
  createPageElement(t, n, r) {
    const a = {
      ...r
    };
    return n && (n.pageMargins && (a.paddingLeft = n.pageMargins.left, a.paddingRight = n.pageMargins.right, a.paddingTop = n.pageMargins.top, a.paddingBottom = n.pageMargins.bottom), n.pageSize && (this.options.ignoreWidth || (a.width = n.pageSize.width), this.options.ignoreHeight || (a.minHeight = n.pageSize.height))), this.h({
      tagName: "section",
      className: t,
      style: a
    });
  }
  createSectionContent(t) {
    const n = {};
    return t.columns && t.columns.numberOfColumns && (n.columnCount = `${t.columns.numberOfColumns}`, n.columnGap = t.columns.space, t.columns.separator && (n.columnRule = "1px solid black")), this.h({
      tagName: "article",
      style: n
    });
  }
  renderSections(t) {
    const n = [];
    this.processElement(t);
    const r = this.splitBySection(t.children, t.props),
      a = this.groupByPageBreaks(r);
    let i = null;
    for (let s = 0, l = a.length; s < l; s++) {
      this.currentFootnoteIds = [];
      let u = a[s][0].sectProps;
      const h = this.createPageElement(this.className, u, t.cssStyle);
      this.options.renderHeaders && this.renderHeaderFooter(u.headerRefs, u, n.length, i != u, h);
      for (const p of a[s]) {
        var o = this.createSectionContent(p.sectProps);
        this.renderElements(p.elements, o), h.appendChild(o), u = p.sectProps;
      }
      if (this.options.renderFootnotes) {
        const p = this.renderNotes(this.currentFootnoteIds, this.footnoteMap);
        p && h.appendChild(p);
      }
      if (this.options.renderEndnotes && s == l - 1) {
        const p = this.renderNotes(this.currentEndnoteIds, this.endnoteMap);
        p && h.appendChild(p);
      }
      this.options.renderFooters && this.renderHeaderFooter(u.footerRefs, u, n.length, i != u, h), n.push(h), i = u;
    }
    return n;
  }
  renderHeaderFooter(t, n, r, a, i) {
    var d, u;
    if (!t) return;
    const o = ((u = (d = this.document.settingsPart) == null ? void 0 : d.settings) == null ? void 0 : u.evenAndOddHeaders) ?? !1;
    var s = (n.titlePage && a ? t.find(h => h.type == "first") : null) ?? (r % 2 == 1 && o ? t.find(h => h.type == "even") : null) ?? t.find(h => h.type == "default"),
      l = s && this.document.findPartByRelId(s.id, this.document.documentPart);
    if (l) {
      this.currentPart = l, this.usedHederFooterParts.includes(l.path) || (this.processElement(l.rootElement), this.usedHederFooterParts.push(l.path));
      const [h] = this.renderElements([l.rootElement], i);
      n != null && n.pageMargins && (l.rootElement.type === li.Header ? (h.style.marginTop = `calc(${n.pageMargins.header} - ${n.pageMargins.top})`, h.style.minHeight = `calc(${n.pageMargins.top} - ${n.pageMargins.header})`) : l.rootElement.type === li.Footer && (h.style.marginBottom = `calc(${n.pageMargins.footer} - ${n.pageMargins.bottom})`, h.style.minHeight = `calc(${n.pageMargins.bottom} - ${n.pageMargins.footer})`)), this.currentPart = null;
    }
  }
  isPageBreakElement(t) {
    return t.type != li.Break ? !1 : t.break == "lastRenderedPageBreak" ? !this.options.ignoreLastRenderedPageBreak : t.break == "page";
  }
  isPageBreakSection(t, n) {
    var r, a, i, o, s, l;
    return !t || !n ? !1 : ((r = t.pageSize) == null ? void 0 : r.orientation) != ((a = n.pageSize) == null ? void 0 : a.orientation) || ((i = t.pageSize) == null ? void 0 : i.width) != ((o = n.pageSize) == null ? void 0 : o.width) || ((s = t.pageSize) == null ? void 0 : s.height) != ((l = n.pageSize) == null ? void 0 : l.height);
  }
  splitBySection(t, n) {
    var h;
    var r = {
        sectProps: null,
        elements: [],
        pageBreak: !1
      },
      a = [r];
    for (let p of t) {
      if (p.type == li.Paragraph) {
        const m = p,
          f = this.findStyle(m.styleName);
        (m.pageBreakBefore || (h = f == null ? void 0 : f.paragraphProps) != null && h.pageBreakBefore) && (r.sectProps = i, r.pageBreak = !0, r = {
          sectProps: null,
          elements: [],
          pageBreak: !1
        }, a.push(r));
      }
      if (r.elements.push(p), p.type == li.Paragraph) {
        const m = p;
        var i = m.sectionProps,
          o = -1,
          s = -1;
        if (this.options.breakPages && m.children && (o = m.children.findIndex(f => {
          var y;
          return s = ((y = f.children) == null ? void 0 : y.findIndex(this.isPageBreakElement.bind(this))) ?? -1, s != -1;
        })), (i || o != -1) && (r.sectProps = i, r.pageBreak = o != -1, r = {
          sectProps: null,
          elements: [],
          pageBreak: !1
        }, a.push(r)), o != -1) {
          let f = m.children[o],
            y = s < f.children.length - 1;
          if (o < m.children.length - 1 || y) {
            var l = p.children,
              d = {
                ...p,
                children: l.slice(o)
              };
            if (p.children = l.slice(0, o), r.elements.push(d), y) {
              let b = f.children,
                v = {
                  ...f,
                  children: b.slice(0, s)
                };
              p.children.push(v), f.children = b.slice(s);
            }
          }
        }
      }
    }
    let u = null;
    for (let p = a.length - 1; p >= 0; p--) a[p].sectProps == null ? a[p].sectProps = u ?? n : u = a[p].sectProps;
    return a;
  }
  groupByPageBreaks(t) {
    let n = [],
      r;
    const a = [n];
    for (let i of t) n.push(i), (this.options.ignoreLastRenderedPageBreak || i.pageBreak || this.isPageBreakSection(r, i.sectProps)) && a.push(n = []), r = i.sectProps;
    return a.filter(i => i.length > 0);
  }
  renderWrapper(t) {
    return this.h({
      tagName: "div",
      className: `${this.className}-wrapper`,
      children: t
    });
  }
  renderDefaultStyle() {
    var t = this.className,
      n = `
.${t}-wrapper { background: gray; padding: 30px; padding-bottom: 0px; display: flex; flex-flow: column; align-items: center; } 
.${t}-wrapper>section.${t} { background: white; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); margin-bottom: 30px; }`;
    this.options.hideWrapperOnPrint && (n = `@media not print { ${n} }`);
    var r = `${n}
.${t} { color: black; hyphens: auto; text-underline-position: from-font; }
section.${t} { box-sizing: border-box; display: flex; flex-flow: column nowrap; position: relative; overflow: hidden; }
section.${t}>article { margin-bottom: auto; z-index: 1; }
section.${t}>footer { z-index: 1; }
.${t} table { border-collapse: collapse; }
.${t} table td, .${t} table th { vertical-align: top; }
.${t} p { margin: 0pt; min-height: 1em; }
.${t} span { white-space: pre-wrap; overflow-wrap: break-word; }
.${t} a { color: inherit; text-decoration: inherit; }
.${t} svg { fill: transparent; }
`;
    return this.options.renderComments && (r += `
.${t}-comment-ref { cursor: default; }
.${t}-comment-popover { display: none; z-index: 1000; padding: 0.5rem; background: white; position: absolute; box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.25); width: 30ch; }
.${t}-comment-ref:hover~.${t}-comment-popover { display: block; }
.${t}-comment-author,.${t}-comment-date { font-size: 0.875rem; color: #888; }
`), [this.h({
      tagName: "#comment",
      children: ["docxjs library predefined styles"]
    }), this.h({
      tagName: "style",
      children: [r]
    })];
  }
  async renderNumbering(t) {
    var n = "",
      r = [];
    for (var a of t) {
      var i = `p.${this.numberingClass(a.id, a.level)}`,
        o = "none";
      if (a.bullet) {
        let s = `--${this.className}-${a.bullet.src}`.toLowerCase();
        n += this.styleToString(`${i}:before`, {
          content: "' '",
          display: "inline-block",
          background: `var(${s})`
        }, a.bullet.style);
        try {
          const l = await this.document.loadNumberingImage(a.bullet.src);
          n += `${this.rootSelector} { ${s}: url(${l}) }`;
        } catch {
          this.options.debug && console.warn(`Can't load numbering image with src ${a.bullet.src}`);
        }
      } else if (a.levelText) {
        let s = this.numberingCounter(a.id, a.level);
        const l = s + " " + (a.start - 1);
        a.level > 0 && (n += this.styleToString(`p.${this.numberingClass(a.id, a.level - 1)}`, {
          "counter-set": l
        })), r.push(l), n += this.styleToString(`${i}:before`, {
          content: this.levelTextToContent(a.levelText, a.suff, a.id, this.numFormatToCssValue(a.format)),
          "counter-increment": s,
          ...a.rStyle
        });
      } else o = this.numFormatToCssValue(a.format);
      n += this.styleToString(i, {
        display: "list-item",
        "list-style-position": "inside",
        "list-style-type": o,
        ...a.pStyle
      });
    }
    return r.length > 0 && (n += this.styleToString(this.rootSelector, {
      "counter-reset": r.join(" ")
    })), [this.h({
      tagName: "#comment",
      children: ["docxjs document numbering styles"]
    }), this.h({
      tagName: "style",
      children: [n]
    })];
  }
  renderStyles(t) {
    var n = "";
    const r = this.styleMap,
      a = kO(t.filter(l => l.isDefault), l => l.target);
    for (const l of t) {
      var i = l.styles;
      if (l.linked) {
        var o = l.linked && r[l.linked];
        o ? i = i.concat(o.styles) : this.options.debug && console.warn(`Can't find linked style ${l.linked}`);
      }
      for (const d of i) {
        var s = `${l.target ?? ""}.${l.cssName}`;
        l.target != d.target && (s += ` ${d.target}`), a[l.target] == l && (s = `.${this.className} ${l.target}, ` + s), n += this.styleToString(s, d.values);
      }
    }
    return [this.h({
      tagName: "#comment",
      children: ["docxjs document styles"]
    }), this.h({
      tagName: "style",
      children: [n]
    })];
  }
  renderNotes(t, n) {
    var r = t.map(a => n[a]).filter(a => a);
    if (r.length > 0) return this.h({
      tagName: "ol",
      children: this.renderElements(r)
    });
  }
  renderElement(t) {
    switch (t.type) {
      case li.Paragraph:
        return this.renderParagraph(t);
      case li.BookmarkStart:
        return this.renderBookmarkStart(t);
      case li.BookmarkEnd:
        return null;
      case li.Run:
        return this.renderRun(t);
      case li.Table:
        return this.renderTable(t);
      case li.Row:
        return this.renderTableRow(t);
      case li.Cell:
        return this.renderTableCell(t);
      case li.Hyperlink:
        return this.renderHyperlink(t);
      case li.SmartTag:
        return this.renderSmartTag(t);
      case li.Drawing:
        return this.renderDrawing(t);
      case li.Image:
        return this.renderImage(t);
      case li.Text:
        return this.renderText(t);
      case li.Text:
        return this.renderText(t);
      case li.DeletedText:
        return this.renderDeletedText(t);
      case li.Tab:
        return this.renderTab(t);
      case li.Symbol:
        return this.renderSymbol(t);
      case li.Break:
        return this.renderBreak(t);
      case li.Footer:
        return this.renderContainer(t, "footer");
      case li.Header:
        return this.renderContainer(t, "header");
      case li.Footnote:
      case li.Endnote:
        return this.renderContainer(t, "li");
      case li.FootnoteReference:
        return this.renderFootnoteReference(t);
      case li.EndnoteReference:
        return this.renderEndnoteReference(t);
      case li.NoBreakHyphen:
        return this.h({
          tagName: "wbr"
        });
      case li.VmlPicture:
        return this.renderVmlPicture(t);
      case li.VmlElement:
        return this.renderVmlElement(t);
      case li.MmlMath:
        return this.renderContainerNS(t, yh.mathML, "math", {
          xmlns: yh.mathML
        });
      case li.MmlMathParagraph:
        return this.renderContainer(t, "span");
      case li.MmlFraction:
        return this.renderContainerNS(t, yh.mathML, "mfrac");
      case li.MmlBase:
        return this.renderContainerNS(t, yh.mathML, t.parent.type == li.MmlMatrixRow ? "mtd" : "mrow");
      case li.MmlNumerator:
      case li.MmlDenominator:
      case li.MmlFunction:
      case li.MmlLimit:
      case li.MmlBox:
        return this.renderContainerNS(t, yh.mathML, "mrow");
      case li.MmlGroupChar:
        return this.renderMmlGroupChar(t);
      case li.MmlLimitLower:
        return this.renderContainerNS(t, yh.mathML, "munder");
      case li.MmlMatrix:
        return this.renderContainerNS(t, yh.mathML, "mtable");
      case li.MmlMatrixRow:
        return this.renderContainerNS(t, yh.mathML, "mtr");
      case li.MmlRadical:
        return this.renderMmlRadical(t);
      case li.MmlSuperscript:
        return this.renderContainerNS(t, yh.mathML, "msup");
      case li.MmlSubscript:
        return this.renderContainerNS(t, yh.mathML, "msub");
      case li.MmlDegree:
      case li.MmlSuperArgument:
      case li.MmlSubArgument:
        return this.renderContainerNS(t, yh.mathML, "mn");
      case li.MmlFunctionName:
        return this.renderContainerNS(t, yh.mathML, "ms");
      case li.MmlDelimiter:
        return this.renderMmlDelimiter(t);
      case li.MmlRun:
        return this.renderMmlRun(t);
      case li.MmlNary:
        return this.renderMmlNary(t);
      case li.MmlPreSubSuper:
        return this.renderMmlPreSubSuper(t);
      case li.MmlBar:
        return this.renderMmlBar(t);
      case li.MmlEquationArray:
        return this.renderMllList(t);
      case li.Inserted:
        return this.renderInserted(t);
      case li.Deleted:
        return this.renderDeleted(t);
      case li.CommentRangeStart:
        return this.renderCommentRangeStart(t);
      case li.CommentRangeEnd:
        return this.renderCommentRangeEnd(t);
      case li.CommentReference:
        return this.renderCommentReference(t);
      case li.AltChunk:
        return this.renderAltChunk(t);
    }
    return null;
  }
  renderElements(t, n) {
    if (t == null) return null;
    var r = t.flatMap(a => this.renderElement(a)).filter(a => a != null);
    return n && r.forEach(a => n.appendChild(Z2t(a) ? document.createTextNode(a) : a)), r;
  }
  renderContainer(t, n, r) {
    return this.h({
      tagName: n,
      children: this.renderElements(t.children),
      ...r
    });
  }
  renderContainerNS(t, n, r, a) {
    return this.h({
      ns: n,
      tagName: r,
      children: this.renderElements(t.children),
      ...a
    });
  }
  renderParagraph(t) {
    var i, o;
    var n = this.toHTML(t, yh.html, "p");
    const r = this.findStyle(t.styleName);
    t.tabs ?? (t.tabs = (i = r == null ? void 0 : r.paragraphProps) == null ? void 0 : i.tabs);
    const a = t.numbering ?? ((o = r == null ? void 0 : r.paragraphProps) == null ? void 0 : o.numbering);
    return a && n.classList.add(this.numberingClass(a.id, a.level)), n;
  }
  renderHyperlink(t) {
    const n = this.toH(t, yh.html, "a");
    if (n.href = "", t.id) {
      const r = this.document.documentPart.rels.find(a => a.id == t.id && a.targetMode === "External");
      n.href = (r == null ? void 0 : r.target) ?? n.href;
    }
    return t.anchor && (n.href += `#${t.anchor}`), this.h(n);
  }
  renderSmartTag(t) {
    return this.renderContainer(t, "span");
  }
  renderCommentRangeStart(t) {
    var a;
    if (!this.options.renderComments) return null;
    const n = new Range();
    (a = this.commentHighlight) == null || a.add(n);
    const r = this.h({
      tagName: "#comment",
      children: [`start of comment #${t.id}`]
    });
    return this.later(() => n.setStart(r, 0)), this.commentMap[t.id] = n, r;
  }
  renderCommentRangeEnd(t) {
    if (!this.options.renderComments) return null;
    const n = this.commentMap[t.id],
      r = this.h({
        tagName: "#comment",
        children: [`end of comment #${t.id}`]
      });
    return this.later(() => n == null ? void 0 : n.setEnd(r, 0)), r;
  }
  renderCommentReference(t) {
    var i;
    if (!this.options.renderComments) return null;
    var n = (i = this.document.commentsPart) == null ? void 0 : i.commentMap[t.id];
    if (!n) return null;
    const r = this.h({
        tagName: "span",
        className: `${this.className}-comment-ref`,
        children: ["💬"]
      }),
      a = this.h({
        tagName: "div",
        className: `${this.className}-comment-popover`,
        children: [this.h({
          tagName: "div",
          className: `${this.className}-comment-author`,
          children: [n.author]
        }), this.h({
          tagName: "div",
          className: `${this.className}-comment-date`,
          children: [new Date(n.date).toLocaleString()]
        }), ...this.renderElements(n.children)]
      });
    return this.h({
      tagName: "#fragment",
      children: [this.h({
        tagName: "#comment",
        children: [`comment #${n.id} by ${n.author} on ${n.date}`]
      }), r, a]
    });
  }
  renderAltChunk(t) {
    if (!this.options.renderAltChunks) return null;
    var n = this.h({
      tagName: "iframe"
    });
    return this.tasks.push(this.document.loadAltChunk(t.id, this.currentPart).then(r => {
      n.srcdoc = r;
    })), n;
  }
  renderDrawing(t) {
    var n = this.toHTML(t, yh.html, "div");
    return n.style.display = "inline-block", n.style.position = "relative", n.style.textIndent = "0px", n;
  }
  renderImage(t) {
    var l;
    let n = this.toHTML(t, yh.html, "img", []),
      r = (l = t.cssStyle) == null ? void 0 : l.transform;
    if (t.srcRect && t.srcRect.some(d => d != 0)) {
      var [a, i, o, s] = t.srcRect;
      r = `scale(${1 / (1 - a - o)}, ${1 / (1 - i - s)})`, n.style["clip-path"] = `rect(${(100 * i).toFixed(2)}% ${(100 * (1 - o)).toFixed(2)}% ${(100 * (1 - s)).toFixed(2)}% ${(100 * a).toFixed(2)}%)`;
    }
    return t.rotation && (r = `rotate(${t.rotation}deg) ${r ?? ""}`), n.style.transform = r == null ? void 0 : r.trim(), this.document && this.tasks.push(this.document.loadDocumentImage(t.src, this.currentPart).then(d => {
      n.src = d;
    })), n;
  }
  renderText(t) {
    return this.h(t.text);
  }
  renderDeletedText(t) {
    return this.options.renderChanges ? this.renderText(t) : null;
  }
  renderBreak(t) {
    return t.break == "textWrapping" ? this.h({
      tagName: "br"
    }) : null;
  }
  renderInserted(t) {
    return this.options.renderChanges ? this.renderChange(t, "ins") : this.renderElements(t.children);
  }
  renderDeleted(t) {
    return this.options.renderChanges ? this.renderChange(t, "del") : null;
  }
  renderChange(t, n) {
    return this.renderContainer(t, n, {
      dateTime: t.date
    });
  }
  renderSymbol(t) {
    return this.h({
      tagName: "span",
      children: [String.fromCharCode(t.char)],
      style: {
        fontFamily: t.font
      }
    });
  }
  renderFootnoteReference(t) {
    return this.currentFootnoteIds.push(t.id), this.h({
      tagName: "sup",
      children: [`${this.currentFootnoteIds.length}`]
    });
  }
  renderEndnoteReference(t) {
    return this.currentEndnoteIds.push(t.id), this.h({
      tagName: "sup",
      children: [`${this.currentEndnoteIds.length}`]
    });
  }
  renderTab(t) {
    var a;
    var n = this.h({
      tagName: "span",
      children: [" "]
    });
    if (this.options.experimental) {
      n.className = this.tabStopClass();
      var r = (a = edi(t, li.Paragraph)) == null ? void 0 : a.tabs;
      this.currentTabs.push({
        stops: r,
        span: n
      });
    }
    return n;
  }
  renderBookmarkStart(t) {
    return this.h({
      tagName: "span",
      id: t.name
    });
  }
  renderRun(t) {
    if (t.fieldRun) return null;
    let n = this.renderElements(t.children);
    t.verticalAlign && (n = [this.h({
      tagName: t.verticalAlign,
      children: this.renderElements(t.children)
    })]);
    const r = this.toHTML(t, yh.html, "span", n);
    return t.id && (r.id = t.id), r;
  }
  renderTable(t) {
    this.tableCellPositions.push(this.currentCellPosition), this.tableVerticalMerges.push(this.currentVerticalMerge), this.currentVerticalMerge = {}, this.currentCellPosition = {
      col: 0,
      row: 0
    };
    const n = [];
    return t.columns && n.push(this.renderTableColumns(t.columns)), n.push(...this.renderElements(t.children)), this.currentVerticalMerge = this.tableVerticalMerges.pop(), this.currentCellPosition = this.tableCellPositions.pop(), this.toHTML(t, yh.html, "table", n);
  }
  renderTableColumns(t) {
    const n = t.map(r => this.h({
      tagName: "col",
      style: {
        width: r.width
      }
    }));
    return this.h({
      tagName: "colgroup",
      children: n
    });
  }
  renderTableRow(t) {
    this.currentCellPosition.col = 0;
    const n = [];
    return t.gridBefore && n.push(this.renderTableCellPlaceholder(t.gridBefore)), n.push(...this.renderElements(t.children)), t.gridAfter && n.push(this.renderTableCellPlaceholder(t.gridAfter)), this.currentCellPosition.row++, this.toHTML(t, yh.html, "tr", n);
  }
  renderTableCellPlaceholder(t) {
    return this.h({
      tagName: "td",
      colSpan: t,
      style: {
        border: "none"
      }
    });
  }
  renderTableCell(t) {
    let n = this.toHTML(t, yh.html, "td");
    const r = this.currentCellPosition.col;
    return t.verticalMerge ? t.verticalMerge == "restart" ? (this.currentVerticalMerge[r] = n, n.rowSpan = 1) : this.currentVerticalMerge[r] && (this.currentVerticalMerge[r].rowSpan += 1, n.style.display = "none") : this.currentVerticalMerge[r] = null, t.span && (n.colSpan = t.span), this.currentCellPosition.col += n.colSpan, n;
  }
  renderVmlPicture(t) {
    return this.renderContainer(t, "div");
  }
  renderVmlElement(t) {
    var a, i;
    var n = this.h({
      ns: yh.svg,
      tagName: "svg",
      style: t.cssStyleText
    });
    const r = this.renderVmlChildElement(t);
    return (a = t.imageHref) != null && a.id && this.tasks.push((i = this.document) == null ? void 0 : i.loadDocumentImage(t.imageHref.id, this.currentPart).then(o => r.setAttribute("href", o))), n.appendChild(r), requestAnimationFrame(() => {
      const o = n.firstElementChild.getBBox();
      n.setAttribute("width", `${Math.ceil(o.x + o.width)}`), n.setAttribute("height", `${Math.ceil(o.y + o.height)}`);
    }), n;
  }
  renderVmlChildElement(t) {
    const n = this.createSvgElement(t.tagName);
    Object.entries(t.attrs).forEach(([r, a]) => n.setAttribute(r, a));
    for (let r of t.children) r.type == li.VmlElement ? n.appendChild(this.renderVmlChildElement(r)) : n.appendChild(...kfe(this.renderElement(r)));
    return n;
  }
  renderMmlRadical(t) {
    var a;
    const n = t.children.find(i => i.type == li.MmlBase);
    if ((a = t.props) != null && a.hideDegree) return this.createMathMLElement("msqrt", null, this.renderElements([n]));
    const r = t.children.find(i => i.type == li.MmlDegree);
    return this.createMathMLElement("mroot", null, this.renderElements([n, r]));
  }
  renderMmlDelimiter(t) {
    const n = [];
    return n.push(this.createMathMLElement("mo", null, [t.props.beginChar ?? "("])), n.push(...this.renderElements(t.children)), n.push(this.createMathMLElement("mo", null, [t.props.endChar ?? ")"])), this.createMathMLElement("mrow", null, n);
  }
  renderMmlNary(t) {
    var d;
    const n = [],
      r = kO(t.children, u => u.type),
      a = r[li.MmlSuperArgument],
      i = r[li.MmlSubArgument],
      o = a ? this.createMathMLElement("mo", null, kfe(this.renderElement(a))) : null,
      s = i ? this.createMathMLElement("mo", null, kfe(this.renderElement(i))) : null,
      l = this.createMathMLElement("mo", null, [((d = t.props) == null ? void 0 : d.char) ?? "∫"]);
    return o || s ? n.push(this.createMathMLElement("munderover", null, [l, s, o])) : o ? n.push(this.createMathMLElement("mover", null, [l, o])) : s ? n.push(this.createMathMLElement("munder", null, [l, s])) : n.push(l), n.push(...this.renderElements(r[li.MmlBase].children)), this.createMathMLElement("mrow", null, n);
  }
  renderMmlPreSubSuper(t) {
    const n = [],
      r = kO(t.children, d => d.type),
      a = r[li.MmlSuperArgument],
      i = r[li.MmlSubArgument],
      o = a ? this.createMathMLElement("mo", null, kfe(this.renderElement(a))) : null,
      s = i ? this.createMathMLElement("mo", null, kfe(this.renderElement(i))) : null,
      l = this.createMathMLElement("mo", null);
    return n.push(this.createMathMLElement("msubsup", null, [l, s, o])), n.push(...this.renderElements(r[li.MmlBase].children)), this.createMathMLElement("mrow", null, n);
  }
  renderMmlGroupChar(t) {
    const n = t.props.verticalJustification === "bot" ? "mover" : "munder",
      r = this.renderContainerNS(t, yh.mathML, n);
    return t.props.char && r.appendChild(this.createMathMLElement("mo", null, [t.props.char])), r;
  }
  renderMmlBar(t) {
    const n = {};
    switch (t.props.position) {
      case "top":
        n.textDecoration = "overline";
        break;
      case "bottom":
        n.textDecoration = "underline";
        break;
    }
    return this.renderContainerNS(t, yh.mathML, "mrow", {
      style: n
    });
  }
  renderMmlRun(t) {
    return this.toHTML(t, yh.mathML, "ms");
  }
  renderMllList(t) {
    const n = this.renderElements(t.children).map(r => this.createMathMLElement("mtr", null, [this.createMathMLElement("mtd", null, [r])]));
    return this.toHTML(t, yh.mathML, "mtable", n);
  }
  toH(t, n, r, a = null) {
    const {
        $lang: i,
        ...o
      } = t.cssStyle ?? {},
      s = Jci(t.className, t.styleName && this.processStyleName(t.styleName));
    return {
      ns: n,
      tagName: r,
      className: s,
      lang: i,
      style: o,
      children: a ?? this.renderElements(t.children)
    };
  }
  toHTML(t, n, r, a = null) {
    return this.h(this.toH(t, n, r, a));
  }
  findStyle(t) {
    var n;
    return t && ((n = this.styleMap) == null ? void 0 : n[t]);
  }
  numberingClass(t, n) {
    return `${this.className}-num-${t}-${n}`;
  }
  tabStopClass() {
    return `${this.className}-tab-stop`;
  }
  styleToString(t, n, r = null) {
    let a = `${t} {\r
`;
    for (const i in n) i.startsWith("$") || (a += `  ${i}: ${n[i]};\r
`);
    return r && (a += r), a + `}\r
`;
  }
  numberingCounter(t, n) {
    return `${this.className}-num-${t}-${n}`;
  }
  levelTextToContent(t, n, r, a) {
    const i = {
      tab: "\\9",
      space: "\\a0"
    };
    var o = t.replace(/%\d*/g, s => {
      let l = parseInt(s.substring(1), 10) - 1;
      return `"counter(${this.numberingCounter(r, l)}, ${a})"`;
    });
    return `"${o}${i[n] ?? ""}"`;
  }
  numFormatToCssValue(t) {
    var n = {
      none: "none",
      bullet: "disc",
      decimal: "decimal",
      lowerLetter: "lower-alpha",
      upperLetter: "upper-alpha",
      lowerRoman: "lower-roman",
      upperRoman: "upper-roman",
      decimalZero: "decimal-leading-zero",
      aiueo: "katakana",
      aiueoFullWidth: "katakana",
      chineseCounting: "simp-chinese-informal",
      chineseCountingThousand: "simp-chinese-informal",
      chineseLegalSimplified: "simp-chinese-formal",
      chosung: "hangul-consonant",
      ideographDigital: "cjk-ideographic",
      ideographTraditional: "cjk-heavenly-stem",
      ideographLegalTraditional: "trad-chinese-formal",
      ideographZodiac: "cjk-earthly-branch",
      iroha: "katakana-iroha",
      irohaFullWidth: "katakana-iroha",
      japaneseCounting: "japanese-informal",
      japaneseDigitalTenThousand: "cjk-decimal",
      japaneseLegal: "japanese-formal",
      thaiNumbers: "thai",
      koreanCounting: "korean-hangul-formal",
      koreanDigital: "korean-hangul-formal",
      koreanDigital2: "korean-hanja-informal",
      hebrew1: "hebrew",
      hebrew2: "hebrew",
      hindiNumbers: "devanagari",
      ganada: "hangul",
      taiwaneseCounting: "cjk-ideographic",
      taiwaneseCountingThousand: "cjk-ideographic",
      taiwaneseDigital: "cjk-decimal"
    };
    return n[t] ?? t;
  }
  refreshTabStops() {
    this.options.experimental && setTimeout(() => {
      const t = Yci();
      for (let n of this.currentTabs) Xci(n.span, n.stops, this.defaultTabSize, t);
    }, 500);
  }
  createElementNS(t, n, r, a) {
    return this.h({
      ns: t,
      tagName: n,
      children: a,
      ...r
    });
  }
  createElement(t, n, r) {
    return this.createElementNS(yh.html, t, n, r);
  }
  createMathMLElement(t, n, r) {
    return this.createElementNS(yh.mathML, t, n, r);
  }
  createSvgElement(t, n, r) {
    return this.createElementNS(yh.svg, t, n, r);
  }
  later(t) {
    this.postRenderTasks.push(t);
  }
}

function edi(e, t) {
  for (var n = e.parent; n != null && n.type != t;) n = n.parent;
  return n;
}

const kBt = {
  ignoreHeight: !1,
  ignoreWidth: !1,
  ignoreFonts: !1,
  breakPages: !0,
  debug: !1,
  experimental: !1,
  className: "docx",
  inWrapper: !0,
  hideWrapperOnPrint: !1,
  trimXmlDeclaration: !0,
  ignoreLastRenderedPageBreak: !0,
  renderHeaders: !0,
  renderFooters: !0,
  renderFootnotes: !0,
  renderEndnotes: !0,
  useBase64URL: !1,
  renderChanges: !1,
  renderComments: !1,
  renderAltChunks: !0,
  h: jke
};

function Esr(e, t) {
  const n = {
    ...kBt,
    ...t
  };
  return _Bt.load(e, new qci(n), n);
}

async function Tsr(e, t) {
  const n = {
    ...kBt,
    ...t
  };
  return await new Zci().render(e, n);
}

async function tdi(e, t, n, r) {
  const a = await Esr(e, r),
    i = await Tsr(a, r);
  n ?? (n = t), n.innerHTML = "", t.innerHTML = "";
  for (let o of i) (o.nodeName === "STYLE" ? n : t).appendChild(o);
  return a;
}

