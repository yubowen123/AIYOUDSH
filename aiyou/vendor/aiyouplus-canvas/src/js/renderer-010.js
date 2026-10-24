const qCa = (e, t, n = 48) => Math.max(.05, (e - t) / n),
  rQn = (e, t, n) => [e[0], qCa(t, n), e[2]],
  KCa = e => ({
    mode: e,
    step: e === "free" ? "draw_target" : "place",
    targetPoints: [],
    cameraPoints: [],
    hoverPoint: null
  }),
  QCa = e => e.step === "draw_target" ? e.targetPoints : e.cameraPoints,
  n6e = e => e.step === "place" ? !!e.hoverPoint || (e.mode === "fixed_camera" ? e.cameraPoints.length === 1 : e.targetPoints.length === 1) : e.step === "draw_target" || e.step === "draw_camera" ? QCa(e).length >= 2 : e.step === "review",
  mat = e => {
    if (e.step === "place") {
      const t = e.hoverPoint ?? (e.mode === "fixed_camera" ? e.cameraPoints[0] : e.targetPoints[0]);
      return t ? e.mode === "fixed_camera" ? {
        ...e,
        step: "draw_target",
        cameraPoints: [t],
        hoverPoint: null
      } : {
        ...e,
        step: "draw_camera",
        targetPoints: [t],
        hoverPoint: null
      } : e;
    }
    return e.step === "draw_target" ? e.targetPoints.length < 2 ? e : {
      ...e,
      step: e.mode === "fixed_camera" ? "review" : "draw_camera",
      hoverPoint: null
    } : e.step === "draw_camera" ? e.cameraPoints.length < 2 ? e : {
      ...e,
      step: "review",
      hoverPoint: null
    } : e;
  },
  YCa = (e, t) => {
    const n = rQn(t.ground, t.startClientY, t.clientY);
    if (e.step === "place") return t.type === "down" || t.type === "move" ? {
      ...e,
      hoverPoint: n
    } : t.type === "up" ? e.mode === "fixed_camera" ? {
      ...e,
      cameraPoints: [n],
      hoverPoint: n
    } : {
      ...e,
      targetPoints: [n],
      hoverPoint: n
    } : e;
    if (e.step !== "draw_target" && e.step !== "draw_camera") return e;
    const r = e.step === "draw_target" ? "targetPoints" : "cameraPoints";
    if (t.type === "down" || t.type === "move") return {
      ...e,
      hoverPoint: n
    };
    if (t.type === "up") {
      const a = e[r],
        i = a[a.length - 1],
        o = i && Math.hypot(n[0] - i[0], n[1] - i[1], n[2] - i[2]) < .05 ? a : [...a, n];
      return {
        ...e,
        [r]: o,
        hoverPoint: null
      };
    }
    return e;
  },
  XCa = e => ({
    objectId: e,
    points: [],
    hoverPoint: null
  }),
  JCa = (e, t) => {
    const n = rQn(t.ground, t.startClientY, t.clientY);
    if (t.type === "down" || t.type === "move") return {
      ...e,
      hoverPoint: n
    };
    if (t.type === "up") {
      const r = e.points[e.points.length - 1],
        a = r && Math.hypot(n[0] - r[0], n[1] - r[1], n[2] - r[2]) < .05 ? e.points : [...e.points, n];
      return {
        ...e,
        points: a,
        hoverPoint: null
      };
    }
    return e;
  },
  fat = e => e.points.length >= 2,
  ZCa = e => e.points.length < 2 ? `已添加 ${e.points.length} 个点 · 在地面点击加点，按住上拖改高度` : `已添加 ${e.points.length} 个点 · 双击或点确认写入时间轴`,
  eEa = e => {
    const t = e.step === "draw_target" ? e.targetPoints.length : e.step === "draw_camera" ? e.cameraPoints.length : e.hoverPoint ? 1 : 0;
    return e.step === "place" ? e.mode === "fixed_camera" ? "在地面点击放置固定机位，按住上拖可抬高" : "在地面点击放置固定注视点，按住上拖可抬高" : e.step === "draw_target" ? `已添加 ${t} 个点 · 在地面点击画注视点，两点后点下一步` : e.step === "draw_camera" ? e.mode === "free" ? `已添加 ${t} 个点 · 在地面点击画机位路径，两点后点下一步` : `已添加 ${t} 个点 · 在地面点击画机位路径，两点后点下一步` : "检查导演视角和机位视角。确认后才会写入时间轴。";
  },
  Vve = "_director3dScene",
  gH = e => Array.isArray(e) && e.length === 3 && e.every(t => typeof t == "number" && Number.isFinite(t)),
  tEa = new Set(["stand", "t", "walk", "run", "sit", "squat", "single-knee", "double-knee", "akimbo", "think", "wave", "reach"]),
  nEa = e => e.kind !== "character" || tEa.has(e.pose) ? e : {
    ...e,
    pose: "stand"
  },
  rEa = new Set(["auto", "16:9", "9:16", "1:1", "4:3", "3:4", "2.39:1"]),
  aEa = e => Array.isArray(e) ? e.filter(t => {
    if (!t || typeof t != "object") return !1;
    const n = t;
    return typeof n.id == "string" && typeof n.name == "string" && typeof n.cameraId == "string" && rEa.has(n.aspectRatio);
  }).map(t => ({
    id: t.id,
    name: t.name,
    cameraId: t.cameraId,
    aspectRatio: t.aspectRatio,
    referenceImageUrl: typeof t.referenceImageUrl == "string" ? t.referenceImageUrl : void 0,
    referenceOpacity: typeof t.referenceOpacity == "number" ? t.referenceOpacity : void 0,
    referenceScale: typeof t.referenceScale == "number" ? t.referenceScale : void 0,
    referenceRotation: typeof t.referenceRotation == "number" ? t.referenceRotation : void 0,
    referenceInExport: typeof t.referenceInExport == "boolean" ? t.referenceInExport : void 0
  })) : [],
  iEa = e => {
    const t = e ?? {},
      n = typeof t.fps == "number" && t.fps > 0 ? Math.round(t.fps) : 24,
      r = typeof t.durationSeconds == "number" && t.durationSeconds > 0 ? t.durationSeconds : 15,
      a = Array.isArray(t.keyframes) ? t.keyframes.filter(s => {
        if (!s || typeof s != "object") return !1;
        const l = s;
        return typeof l.id == "string" && typeof l.frame == "number" && typeof l.cameraId == "string" && gH(l.position) && gH(l.lookAt) && typeof l.fov == "number";
      }).map(s => ({
        ...s,
        channels: Array.isArray(s.channels) ? s.channels.filter(l => l === "position" || l === "lookAt" || l === "fov") : s.channels
      })) : [],
      i = Array.isArray(t.objectKeyframes) ? t.objectKeyframes.filter(s => {
        if (!s || typeof s != "object") return !1;
        const l = s;
        return typeof l.id == "string" && typeof l.frame == "number" && typeof l.objectId == "string" && gH(l.position) && gH(l.rotation) && gH(l.scale);
      }).map(s => ({
        ...s,
        bonePoses: s.bonePoses && typeof s.bonePoses == "object" ? s.bonePoses : void 0,
        opacity: typeof s.opacity == "number" ? Math.max(0, Math.min(1, s.opacity)) : 1,
        channels: Array.isArray(s.channels) ? s.channels.filter(l => l === "position" || l === "rotation" || l === "scale" || l === "opacity" || l === "pose") : s.channels
      })) : [],
      o = Array.isArray(t.characterAnimationClips) ? t.characterAnimationClips.filter(s => {
        if (!s || typeof s != "object") return !1;
        const l = s;
        return typeof l.id == "string" && typeof l.objectId == "string" && typeof l.animationId == "string" && typeof l.name == "string" && typeof l.startFrame == "number" && typeof l.durationFrames == "number" && typeof l.sourceDurationSeconds == "number";
      }).map(s => ({
        ...s,
        startFrame: Math.max(0, Math.round(s.startFrame)),
        durationFrames: Math.max(1, Math.round(s.durationFrames)),
        sourceDurationSeconds: Math.max(1 / n, s.sourceDurationSeconds),
        sourceStartSeconds: typeof s.sourceStartSeconds == "number" ? Math.max(0, s.sourceStartSeconds) : void 0,
        mode: s.mode === "once" ? "once" : "loop"
      })) : [];
    return {
      fps: n,
      durationSeconds: r,
      loop: !!t.loop,
      interpolation: t.interpolation === "smooth" || t.interpolation === "hold" ? t.interpolation : "linear",
      keyframes: a,
      objectKeyframes: i,
      characterAnimationClips: o,
      workAreaStart: typeof t.workAreaStart == "number" ? Math.max(0, Math.round(t.workAreaStart)) : void 0,
      workAreaEnd: typeof t.workAreaEnd == "number" ? Math.max(0, Math.round(t.workAreaEnd)) : void 0
    };
  },
  r6e = {
    referenceOpacity: .5,
    referenceScale: 3,
    referenceRotation: 0,
    referenceInExport: !1
  },
  Z9 = {
    ambientIntensity: .58,
    keyIntensity: 1.4,
    fillIntensity: .5,
    keyAzimuth: 39,
    keyElevation: 51,
    exposure: 1,
    ambientColor: "#ffffff",
    keyColor: "#ffffff",
    fillColor: "#a9c2c6"
  };

function Vvt(e) {
  if (!e || typeof e != "object") return null;
  const t = e;
  if (t.version !== 1 || !t.settings || typeof t.settings != "object" || !Array.isArray(t.objects)) return null;
  const n = t.settings;
  return typeof n.scale != "number" || !gH(n.position) || !gH(n.rotation) || typeof n.skyColor != "string" || typeof n.showLabels != "boolean" || typeof n.gridSnap != "boolean" || typeof n.showGround != "boolean" || typeof n.opacity != "number" || typeof n.groundHeight != "number" ? null : {
    version: 1,
    settings: {
      ...n,
      skyColor: n.skyColor === "#d1d5db" ? "#060608" : n.skyColor,
      opacity: n.opacity === 1 ? .4 : n.opacity,
      gaussianGroundSnap: typeof n.gaussianGroundSnap == "boolean" ? n.gaussianGroundSnap : !0,
      showGrid: typeof n.showGrid == "boolean" ? n.showGrid : !0,
      panoramaRotation: typeof n.panoramaRotation == "number" ? n.panoramaRotation : 0,
      panoramaRadius: typeof n.panoramaRadius == "number" ? n.panoramaRadius : 60,
      panoramaImageUrl: typeof n.panoramaImageUrl == "string" ? n.panoramaImageUrl : void 0,
      referenceImageUrl: typeof n.referenceImageUrl == "string" ? n.referenceImageUrl : void 0,
      referenceOpacity: typeof n.referenceOpacity == "number" ? n.referenceOpacity : r6e.referenceOpacity,
      referenceScale: typeof n.referenceScale == "number" ? n.referenceScale : r6e.referenceScale,
      referenceRotation: typeof n.referenceRotation == "number" ? n.referenceRotation : r6e.referenceRotation,
      referenceInExport: typeof n.referenceInExport == "boolean" ? n.referenceInExport : r6e.referenceInExport,
      ambientIntensity: typeof n.ambientIntensity == "number" ? n.ambientIntensity : Z9.ambientIntensity,
      keyIntensity: typeof n.keyIntensity == "number" ? n.keyIntensity : Z9.keyIntensity,
      fillIntensity: typeof n.fillIntensity == "number" ? n.fillIntensity : Z9.fillIntensity,
      keyAzimuth: typeof n.keyAzimuth == "number" ? n.keyAzimuth : Z9.keyAzimuth,
      keyElevation: typeof n.keyElevation == "number" ? n.keyElevation : Z9.keyElevation,
      exposure: typeof n.exposure == "number" ? n.exposure : Z9.exposure,
      ambientColor: typeof n.ambientColor == "string" ? n.ambientColor : Z9.ambientColor,
      keyColor: typeof n.keyColor == "string" ? n.keyColor : Z9.keyColor,
      fillColor: typeof n.fillColor == "string" ? n.fillColor : Z9.fillColor,
      lockCameraToView: n.lockCameraToView === !0,
      autoKeyframe: n.autoKeyframe === !0,
      compositionGuides: n.compositionGuides === "thirds" || n.compositionGuides === "center" ? n.compositionGuides : "off",
      showMotionPaths: n.showMotionPaths !== !1,
      showHeightLines: n.showHeightLines === !0,
      showCanvasMask: n.showCanvasMask !== !1,
      exportAbstractCharacters: n.exportAbstractCharacters === !0
    },
    objects: gCa(t.objects.map(nEa)),
    selectedId: typeof t.selectedId == "string" || t.selectedId === null ? t.selectedId : null,
    viewMode: t.viewMode === "camera" || t.viewMode === "top" ? t.viewMode : "director",
    aspectRatio: t.aspectRatio ?? "auto",
    shots: aEa(t.shots),
    activeShotId: typeof t.activeShotId == "string" ? t.activeShotId : null,
    timeline: iEa(t.timeline),
    tool: t.tool === "move" || t.tool === "rotate" || t.tool === "scale" || t.tool === "select" || t.tool === "pose" ? t.tool : "select"
  };
}

function gat(e) {
  return {
    version: 1,
    settings: e.settings,
    objects: e.objects,
    selectedId: e.selectedId,
    viewMode: e.viewMode,
    aspectRatio: e.aspectRatio,
    shots: e.shots,
    activeShotId: e.activeShotId,
    timeline: e.timeline,
    tool: e.tool
  };
}

const b2 = e => `${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
  Etn = ["#7c83f7", "#ef5350", "#42a5f5", "#ab47bc", "#26a69a", "#ffa726", "#ec407a", "#66bb6a"],
  aQn = e => Etn[(Math.max(1, e) - 1) % Etn.length],
  oEa = {
    scale: 1,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    skyColor: "#060608",
    showLabels: !0,
    gridSnap: !1,
    gaussianGroundSnap: !0,
    showGround: !0,
    showGrid: !0,
    opacity: .4,
    groundHeight: 0,
    panoramaRotation: 0,
    panoramaRadius: 60,
    referenceOpacity: .5,
    referenceScale: 3,
    referenceRotation: 0,
    referenceInExport: !1,
    ambientIntensity: .58,
    keyIntensity: 1.4,
    fillIntensity: .5,
    keyAzimuth: 39,
    keyElevation: 51,
    exposure: 1,
    ambientColor: "#ffffff",
    keyColor: "#ffffff",
    fillColor: "#a9c2c6",
    footLock: !1,
    lockCameraToView: !0,
    autoKeyframe: !1,
    compositionGuides: "off",
    showMotionPaths: !0,
    showHeightLines: !1,
    showCanvasMask: !0,
    exportAbstractCharacters: !1
  },
  yat = {
    id: b2("camera"),
    kind: "camera",
    name: "机位 1",
    position: [0, 1.8, 4.8],
    rotation: [0, 0, 0],
    color: "#60a5fa",
    labelColor: aQn(1),
    lookAt: [0, 1, 0],
    fov: 45,
    screenshots: [],
    lookAtMode: "coordinate",
    followTargetId: null,
    lookAtTargetId: null
  },
  nu = e => ({
    version: e.version,
    settings: e.settings,
    objects: e.objects,
    selectedId: e.selectedId,
    viewMode: e.viewMode,
    aspectRatio: e.aspectRatio,
    shots: e.shots,
    activeShotId: e.activeShotId,
    timeline: e.timeline,
    tool: e.tool
  }),
  Ttn = (e, t, n) => ({
    ...e,
    past: t,
    future: n
  }),
  Bu = (e, t) => ({
    ...t,
    past: [...e.past, nu(e)].slice(-80),
    future: []
  }),
  Mtn = (e, t) => {
    const n = e.find(a => a.id === t),
      r = new Set([t]);
    return (n == null ? void 0 : n.kind) === "crowd" && n.childrenIds.forEach(a => r.add(a)), fCa(e, r).filter(a => !r.has(a.id)).map(a => a.kind !== "crowd" ? a : {
      ...a,
      childrenIds: a.childrenIds.filter(i => !r.has(i))
    });
  };

function sEa(e, t) {
  var n, r;
  switch (t.type) {
    case "replace-scene":
      return Bu(e, {
        ...t.scene,
        tool: t.scene.tool ?? "select"
      });
    case "select":
      return {
        ...e,
        selectedId: t.id
      };
    case "set-view-mode":
      return {
        ...e,
        viewMode: t.viewMode
      };
    case "set-tool":
      return {
        ...e,
        tool: t.tool
      };
    case "set-aspect-ratio":
      return Bu(e, {
        ...nu(e),
        aspectRatio: t.aspectRatio,
        shots: (e.shots ?? []).map(a => a.id === e.activeShotId ? {
          ...a,
          aspectRatio: t.aspectRatio
        } : a)
      });
    case "add-shot":
      return Bu(e, {
        ...nu(e),
        shots: [...(e.shots ?? []), t.shot],
        activeShotId: t.shot.id
      });
    case "duplicate-shot":
      {
        const a = (e.shots ?? []).find(l => l.id === t.id);
        if (!a) return e;
        const i = e.objects.find(l => l.kind === "camera" && l.id === a.cameraId);
        if (!i) return e;
        const o = structuredClone(i);
        o.id = b2("camera"), o.name = `机位 ${e.objects.filter(l => l.kind === "camera").length + 1}`, o.position = [i.position[0] + .6, i.position[1], i.position[2] + .6], o.screenshots = [];
        const s = {
          id: b2("shot"),
          name: o.name,
          cameraId: o.id,
          aspectRatio: a.aspectRatio,
          referenceImageUrl: a.referenceImageUrl,
          referenceOpacity: a.referenceOpacity,
          referenceScale: a.referenceScale,
          referenceRotation: a.referenceRotation,
          referenceInExport: a.referenceInExport
        };
        return Bu(e, {
          ...nu(e),
          objects: [...e.objects, o],
          shots: [...(e.shots ?? []), s],
          activeShotId: s.id,
          selectedId: o.id
        });
      }
    case "update-shot":
      return Bu(e, {
        ...nu(e),
        shots: (e.shots ?? []).map(a => a.id === t.id ? {
          ...a,
          ...t.patch
        } : a)
      });
    case "rename-shot":
      {
        const a = (e.shots ?? []).find(i => i.id === t.id);
        return a ? Bu(e, {
          ...nu(e),
          shots: (e.shots ?? []).map(i => i.id === t.id ? {
            ...i,
            name: t.name
          } : i),
          objects: e.objects.map(i => i.id === a.cameraId ? {
            ...i,
            name: t.name
          } : i)
        }) : e;
      }
    case "delete-shot":
      {
        const a = (e.shots ?? []).find(h => h.id === t.id),
          i = (e.shots ?? []).filter(h => h.id !== t.id);
        if (i.length === 0) return e;
        const o = e.activeShotId === t.id ? i[0].id : e.activeShotId,
          s = i.find(h => h.id === o) ?? i[0],
          l = !!(a && i.some(h => h.cameraId === a.cameraId)),
          d = a && !l ? Mtn(e.objects, a.cameraId) : e.objects,
          u = d.find(h => h.id === s.cameraId);
        return Bu(e, {
          ...nu(e),
          objects: d,
          shots: i,
          activeShotId: o,
          selectedId: u ? s.cameraId : e.selectedId && d.some(h => h.id === e.selectedId) ? e.selectedId : null,
          aspectRatio: s.aspectRatio
        });
      }
    case "select-shot":
      {
        const a = (e.shots ?? []).find(o => o.id === t.id);
        if (!a) return e;
        const i = e.objects.find(o => o.id === a.cameraId);
        return {
          ...e,
          activeShotId: a.id,
          selectedId: i ? a.cameraId : e.selectedId,
          aspectRatio: a.aspectRatio
        };
      }
    case "update-settings":
      return Bu(e, {
        ...nu(e),
        settings: {
          ...e.settings,
          ...t.patch
        }
      });
    case "add-object":
      return Bu(e, {
        ...nu(e),
        objects: [...e.objects, t.object],
        selectedId: t.object.id
      });
    case "add-objects":
      return Bu(e, {
        ...nu(e),
        objects: [...e.objects, ...t.objects],
        selectedId: t.selectedId
      });
    case "update-object":
      {
        const a = e.objects.map(l => l.id === t.id ? {
            ...l,
            ...t.patch
          } : l),
          o = e.objects.some(l => l.id === t.id && l.kind === "camera") && typeof t.patch.name == "string" ? (e.shots ?? []).map(l => l.cameraId === t.id ? {
            ...l,
            name: t.patch.name
          } : l) : e.shots,
          s = {
            ...nu(e),
            objects: a,
            shots: o
          };
        return t.transient ? {
          ...e,
          objects: a,
          shots: o
        } : Bu(e, s);
      }
    case "set-object-parent":
      {
        const a = kDt(e.objects, t.id, t.parentId);
        return a === e.objects ? e : Bu(e, {
          ...nu(e),
          objects: a
        });
      }
    case "delete-object":
      {
        const a = Mtn(e.objects, t.id),
          i = Wvt(a, e.shots, e.aspectRatio, e.activeShotId),
          o = new Set(a.map(l => l.id)),
          s = e.timeline ?? jA();
        return Bu(e, {
          ...nu(e),
          objects: a,
          shots: i.shots,
          activeShotId: i.activeShotId,
          timeline: {
            ...s,
            characterAnimationClips: (s.characterAnimationClips ?? []).filter(l => o.has(l.objectId))
          },
          selectedId: e.selectedId === t.id ? null : e.selectedId
        });
      }
    case "duplicate-object":
      {
        const a = e.objects.find(o => o.id === t.id);
        if (!a) return e;
        const i = structuredClone(a);
        if (i.id = b2(a.kind), i.name = `${a.name} 副本`, i.position = [a.position[0] + .45, a.position[1], a.position[2] + .25], i.kind === "crowd" && (i.childrenIds = []), i.kind === "camera") {
          i.screenshots = [];
          const o = cde(i.id, e.aspectRatio, i.name);
          return Bu(e, {
            ...nu(e),
            objects: [...e.objects, i],
            selectedId: i.id,
            shots: [...(e.shots ?? []), o],
            activeShotId: o.id
          });
        }
        return Bu(e, {
          ...nu(e),
          objects: [...e.objects, i],
          selectedId: i.id
        });
      }
    case "add-screenshot":
      {
        const a = e.objects.map(i => i.kind !== "camera" || i.id !== t.cameraId ? i : {
          ...i,
          screenshots: [{
            id: b2("shot"),
            createdAt: Date.now(),
            dataUrl: t.dataUrl,
            cameraName: i.name
          }, ...i.screenshots].slice(0, 12)
        });
        return Bu(e, {
          ...nu(e),
          objects: a
        });
      }
    case "delete-screenshot":
      {
        const a = e.objects.map(i => i.kind !== "camera" || i.id !== t.cameraId ? i : {
          ...i,
          screenshots: i.screenshots.filter(o => o.id !== t.screenshotId)
        });
        return Bu(e, {
          ...nu(e),
          objects: a
        });
      }
    case "toggle-object-visible":
      {
        const a = e.objects.find(l => l.id === t.id);
        if (!a) return e;
        const i = !k_e(a),
          o = new Set([t.id]);
        a.kind === "crowd" && a.childrenIds.forEach(l => o.add(l));
        const s = e.objects.map(l => o.has(l.id) ? {
          ...l,
          visible: i
        } : l);
        return Bu(e, {
          ...nu(e),
          objects: s
        });
      }
    case "clear-screenshots":
      {
        const a = e.objects.map(i => i.kind === "camera" && i.id === t.cameraId ? {
          ...i,
          screenshots: []
        } : i);
        return Bu(e, {
          ...nu(e),
          objects: a
        });
      }
    case "toggle-object-locked":
      {
        const a = e.objects.map(i => i.id === t.id ? {
          ...i,
          locked: !i.locked
        } : i);
        return Bu(e, {
          ...nu(e),
          objects: a
        });
      }
    case "replace-objects":
      {
        const a = Wvt(t.objects, void 0, e.aspectRatio, null);
        return Bu(e, {
          ...nu(e),
          objects: t.objects,
          selectedId: t.selectedId,
          shots: a.shots,
          activeShotId: a.activeShotId
        });
      }
    case "record-camera-keyframe":
      {
        const a = e.timeline ?? jA(),
          i = a.keyframes.findIndex(s => s.frame === t.keyframe.frame && s.cameraId === t.keyframe.cameraId),
          o = [...a.keyframes];
        if (i >= 0) {
          const s = o[i];
          o[i] = {
            ...s,
            ...t.keyframe,
            id: s.id,
            channels: [...new Set([...(t.keyframe.channels ?? s.channels ?? ["position", "lookAt", "fov"])])]
          };
        } else o.push(t.keyframe);
        return o.sort((s, l) => s.frame - l.frame), Bu(e, {
          ...nu(e),
          timeline: {
            ...a,
            keyframes: o
          }
        });
      }
    case "delete-camera-keyframe":
      return Bu(e, {
        ...nu(e),
        timeline: {
          ...(e.timeline ?? jA()),
          keyframes: (e.timeline ?? jA()).keyframes.filter(a => a.id !== t.id)
        }
      });
    case "set-timeline":
      return Bu(e, {
        ...nu(e),
        timeline: {
          ...(e.timeline ?? jA()),
          ...t.patch
        }
      });
    case "move-camera-keyframe":
      {
        const a = e.timeline ?? jA(),
          i = a.keyframes.map(o => o.id === t.id ? {
            ...o,
            frame: t.frame
          } : o).sort((o, s) => o.frame - s.frame);
        return Bu(e, {
          ...nu(e),
          timeline: {
            ...a,
            keyframes: i
          }
        });
      }
    case "move-object-keyframe":
      {
        const a = e.timeline ?? jA(),
          i = (a.objectKeyframes ?? []).map(o => o.id === t.id ? {
            ...o,
            frame: t.frame
          } : o).sort((o, s) => o.frame - s.frame);
        return Bu(e, {
          ...nu(e),
          timeline: {
            ...a,
            objectKeyframes: i
          }
        });
      }
    case "record-object-keyframe":
      {
        const a = e.timeline ?? jA(),
          i = a.objectKeyframes ?? [],
          o = i.findIndex(l => l.frame === t.keyframe.frame && l.objectId === t.keyframe.objectId),
          s = [...i];
        if (o >= 0) {
          const l = s[o];
          s[o] = {
            ...l,
            ...t.keyframe,
            id: l.id,
            channels: [...new Set([...(t.keyframe.channels ?? l.channels ?? ["position", "rotation", "scale"])])],
            bonePoses: t.keyframe.bonePoses ?? l.bonePoses,
            pose: t.keyframe.pose ?? l.pose,
            poseAdjust: t.keyframe.poseAdjust ?? l.poseAdjust
          };
        } else s.push(t.keyframe);
        return s.sort((l, d) => l.frame - d.frame), Bu(e, {
          ...nu(e),
          timeline: {
            ...a,
            objectKeyframes: s
          }
        });
      }
    case "delete-object-keyframe":
      return Bu(e, {
        ...nu(e),
        timeline: {
          ...(e.timeline ?? jA()),
          objectKeyframes: (((n = e.timeline) == null ? void 0 : n.objectKeyframes) ?? []).filter(a => a.id !== t.id)
        }
      });
    case "split-object-at":
      {
        const a = e.objects.find(v => v.id === t.id);
        if (!a || a.kind === "crowd") return e;
        const i = Math.max(1, t.totalFrames),
          o = FYe(a),
          s = zYe(a, i);
        if (t.frame <= o || t.frame >= s) return e;
        const l = a.labelColor ?? a.color,
          d = structuredClone(a);
        d.id = b2(a.kind), d.labelColor = l, d.inFrame = t.frame, d.outFrame = s, d.clips = void 0, d.kind === "camera" && (d.screenshots = []);
        const u = {
            ...a,
            inFrame: o,
            outFrame: t.frame,
            clips: void 0,
            labelColor: l
          },
          h = e.objects.findIndex(v => v.id === a.id),
          p = [...e.objects.slice(0, h + 1), d, ...e.objects.slice(h + 1)].map(v => v.id === u.id ? u : v),
          m = e.timeline ?? jA(),
          f = a.kind === "camera" ? (m.keyframes ?? []).filter(v => v.cameraId === a.id).map(v => ({
            ...v,
            id: b2("kf"),
            cameraId: d.id
          })) : [],
          y = a.kind !== "camera" ? (m.objectKeyframes ?? []).filter(v => v.objectId === a.id).map(v => ({
            ...v,
            id: b2("ok"),
            objectId: d.id
          })) : [],
          b = {
            ...m,
            keyframes: f.length ? [...m.keyframes, ...f].sort((v, _) => v.frame - _.frame) : m.keyframes,
            objectKeyframes: y.length ? [...(m.objectKeyframes ?? []), ...y].sort((v, _) => v.frame - _.frame) : m.objectKeyframes
          };
        if (d.kind === "camera") {
          const v = cde(d.id, e.aspectRatio, d.name);
          return Bu(e, {
            ...nu(e),
            objects: p,
            selectedId: d.id,
            shots: [...(e.shots ?? []), v],
            timeline: b
          });
        }
        return Bu(e, {
          ...nu(e),
          objects: p,
          selectedId: d.id,
          timeline: b
        });
      }
    case "set-layer-span":
      {
        const a = e.objects.find(S => S.id === t.id);
        if (!a || a.kind === "crowd") return e;
        const i = Math.max(1, t.totalFrames),
          o = Tjt(a, i),
          s = t.clipId ?? ((r = o[0]) == null ? void 0 : r.id),
          l = o.findIndex(S => S.id === s);
        if (l < 0) return e;
        let d = Math.max(0, Math.min(i - 1, Math.round(t.inFrame))),
          u = Math.max(d + 1, Math.min(i, Math.round(t.outFrame)));
        const h = o[l - 1],
          p = o[l + 1];
        if (h && (d = Math.max(d, h.outFrame)), p && (u = Math.min(u, p.inFrame)), u <= d) return e;
        const m = o.map((S, C) => C === l ? {
            ...S,
            inFrame: d,
            outFrame: u
          } : S),
          f = Math.min(...m.map(S => S.inFrame)),
          y = Math.max(...m.map(S => S.outFrame)),
          b = a.clips ? a.clips.length === m.length && a.clips.every((S, C) => S.inFrame === m[C].inFrame && S.outFrame === m[C].outFrame && S.id === m[C].id) : a.inFrame === d && a.outFrame === u,
          v = m.length > 1 ? 0 : Math.round(t.keyDelta ?? 0);
        if (b && !v) return e;
        const _ = e.objects.map(S => S.id === t.id ? {
            ...S,
            clips: m,
            inFrame: f,
            outFrame: y
          } : S),
          w = e.timeline ?? jA();
        if (!v) return Bu(e, {
          ...nu(e),
          objects: _,
          timeline: w
        });
        const k = S => Math.max(0, Math.min(i - 1, S + v)),
          A = a.kind === "camera" ? {
            ...w,
            keyframes: (w.keyframes ?? []).map(S => S.cameraId === t.id ? {
              ...S,
              frame: k(S.frame)
            } : S).sort((S, C) => S.frame - C.frame)
          } : {
            ...w,
            objectKeyframes: (w.objectKeyframes ?? []).map(S => S.objectId === t.id ? {
              ...S,
              frame: k(S.frame)
            } : S).sort((S, C) => S.frame - C.frame)
          };
        return Bu(e, {
          ...nu(e),
          objects: _,
          timeline: A
        });
      }
    case "undo":
      {
        const a = e.past[e.past.length - 1];
        return a ? Ttn(a, e.past.slice(0, -1), [nu(e), ...e.future]) : e;
      }
    case "redo":
      {
        const a = e.future[0];
        return a ? Ttn(a, [...e.past, nu(e)], e.future.slice(1)) : e;
      }
    default:
      return e;
  }
}

const Hvt = "#f7f7f7",
  a6e = (e, t, n = 1.45) => {
    const r = e.filter(a => a.kind === t).map(a => a.position);
    for (let a = 0; a < 80; a += 1) {
      const i = a % 8,
        o = Math.floor(a / 8),
        s = [i * n, t === "geometry" ? .5 : t === "light" ? 2.4 : 0, o * n];
      if (!r.some(d => Math.hypot(d[0] - s[0], d[2] - s[2]) < n * .55)) return s;
    }
    return [r.length * n, 0, 0];
  },
  ONe = (e = 1, t = {}) => ({
    id: b2("character"),
    kind: "character",
    name: e === 1 ? "角色A" : `角色${String.fromCharCode(64 + Math.min(e, 26))}`,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    color: Hvt,
    pose: "stand",
    scale: [1, 1, 1],
    poseAdjust: {
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
    },
    ...t
  }),
  lEa = (e, t) => ({
    id: b2(e),
    kind: "geometry",
    geometry: e,
    name: {
      box: "立方体",
      sphere: "球体",
      cylinder: "圆柱体",
      ring: "环状体",
      cone: "圆锥",
      prism: "棱锥",
      empty: "空对象"
    }[e] + ` ${t}`,
    position: [0, .5, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    color: "#94a3b8"
  }),
  cEa = (e, t, n) => {
    const r = Ejt(n),
      a = (r == null ? void 0 : r.kind) ?? e,
      i = Cbt.find(o => o.kind === a);
    return {
      id: b2(a),
      kind: "prop",
      prop: a,
      name: `${(r == null ? void 0 : r.label) ?? (i == null ? void 0 : i.label) ?? a} ${t}`,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: "#d8d4cc",
      modelId: r == null ? void 0 : r.id
    };
  },
  cde = (e, t, n) => ({
    id: b2("shot"),
    name: n,
    cameraId: e,
    aspectRatio: t
  }),
  dEa = (e, t) => ({
    id: b2("light"),
    kind: "light",
    light: e,
    name: {
      directional: "方向光",
      point: "点光",
      spot: "聚光灯"
    }[e] + ` ${t}`,
    position: e === "point" ? [0, 2.4, 0] : [3.2, 4.6, 2.4],
    rotation: e === "directional" || e === "spot" ? [-45, 35, 0] : [0, 0, 0],
    color: "#fff4d6",
    intensity: e === "directional" ? 1.2 : 1.4,
    distance: e === "directional" ? void 0 : 14,
    decay: 2,
    angle: e === "spot" ? 35 : void 0,
    penumbra: e === "spot" ? .25 : void 0
  }),
  bat = e => ({
    id: b2("camera"),
    kind: "camera",
    name: `机位 ${e}`,
    position: [0, 1.8, 4.8],
    rotation: [0, 0, 0],
    color: "#60a5fa",
    labelColor: aQn(e),
    lookAt: [0, 1, 0],
    fov: 45,
    screenshots: [],
    lookAtMode: "coordinate",
    followTargetId: null,
    lookAtTargetId: null
  }),
  Wvt = (e, t, n, r) => {
    var l;
    const a = e.filter(d => d.kind === "camera"),
      i = new Map();
    for (const d of t ?? []) {
      if (i.has(d.cameraId)) continue;
      const u = a.find(h => h.id === d.cameraId);
      u && i.set(d.cameraId, {
        ...d,
        name: u.name
      });
    }
    const o = a.map(d => i.get(d.id) ?? cde(d.id, n, d.name)),
      s = r && o.some(d => d.id === r) ? r : ((l = o[0]) == null ? void 0 : l.id) ?? null;
    return {
      shots: o,
      activeShotId: s
    };
  },
  jA = () => ({
    fps: 24,
    durationSeconds: 15,
    loop: !1,
    interpolation: "linear",
    keyframes: []
  }),
  uEa = () => {
    const e = [cde(yat.id, "auto", yat.name)];
    return {
      version: 1,
      settings: oEa,
      objects: [yat, ONe(1)],
      selectedId: null,
      viewMode: "director",
      aspectRatio: "auto",
      shots: e,
      activeShotId: e[0].id,
      timeline: jA(),
      tool: "select",
      past: [],
      future: []
    };
  },
  hEa = e => {
    const t = e.objects,
      n = Wvt(t, e.shots, e.aspectRatio, e.activeShotId);
    return {
      version: e.version,
      settings: {
        ...e.settings,
        autoKeyframe: !1
      },
      objects: t,
      selectedId: e.selectedId,
      viewMode: e.viewMode,
      aspectRatio: e.aspectRatio,
      shots: n.shots,
      activeShotId: n.activeShotId,
      timeline: e.timeline ?? jA(),
      tool: e.tool ?? "select",
      past: [],
      future: []
    };
  },
  pEa = e => {
    const [t, n] = g.useReducer(sEa, e, f => {
        const y = f ? Vvt(f) : null;
        return y ? hEa(y) : uEa();
      }),
      r = g.useCallback(f => t.objects.filter(y => y.kind === f).length + 1, [t.objects]),
      a = g.useCallback((f = {}) => {
        const y = r("character"),
          b = f.position ?? a6e(t.objects, "character"),
          v = f.color ?? Hvt;
        n({
          type: "add-object",
          object: ONe(y, {
            ...f,
            position: b,
            color: v
          })
        });
      }, [r, t.objects]),
      i = g.useCallback((f = 3, y = 3, b = 1.2) => {
        const v = b2("crowd"),
          _ = {
            id: v,
            kind: "crowd",
            name: `群众 ${r("crowd")}`,
            position: [0, 0, 0],
            rotation: [0, 0, 0],
            color: "#f97316",
            childrenIds: []
          },
          w = Math.max(1, Math.min(10, Math.round(f))),
          k = Math.max(1, Math.min(10, Math.round(y))),
          A = Math.max(.4, Math.min(5, b)),
          S = Array.from({
            length: w * k
          }, (C, I) => {
            const E = I % k - (k - 1) / 2,
              M = Math.floor(I / k) - (w - 1) / 2;
            return ONe(I + 1, {
              name: `群众角色 ${I + 1}`,
              parentCrowdId: v,
              position: [E * A, 0, M * A],
              color: Hvt
            });
          });
        _.childrenIds = S.map(C => C.id), n({
          type: "add-objects",
          objects: [_, ...S],
          selectedId: _.id
        });
      }, [r]),
      o = g.useCallback(f => {
        const y = lEa(f, r("geometry"));
        y.position = a6e(t.objects, "geometry"), n({
          type: "add-object",
          object: y
        });
      }, [r, t.objects]),
      s = g.useCallback((f, y, b) => {
        const v = cEa(f, r("prop"), y),
          _ = (b == null ? void 0 : b.position) ?? a6e(t.objects, "prop");
        n({
          type: "add-object",
          object: {
            ...v,
            ...b,
            kind: "prop",
            prop: v.prop,
            id: v.id,
            position: _
          }
        });
      }, [r, t.objects]),
      l = g.useCallback(f => {
        const y = dEa(f, r("light"));
        y.position = a6e(t.objects, "light"), n({
          type: "add-object",
          object: y
        });
      }, [r, t.objects]),
      d = g.useCallback((f = {}) => {
        const y = {
            ...bat(r("camera")),
            ...f
          },
          b = t.objects.filter(w => w.kind === "camera").map(w => w.position),
          v = y.position;
        b.some(w => Math.abs(w[0] - v[0]) < .01 && Math.abs(w[1] - v[1]) < .01 && Math.abs(w[2] - v[2]) < .01) && (y.position = [v[0] + .6, v[1], v[2] + .6]), n({
          type: "add-object",
          object: y
        }), n({
          type: "add-shot",
          shot: cde(y.id, t.aspectRatio, y.name)
        });
      }, [r, t.objects, t.shots, t.aspectRatio]),
      u = g.useCallback((f, y, b = !1) => {
        n({
          type: "update-object",
          id: f,
          patch: y,
          transient: b
        });
      }, []),
      h = g.useCallback((f, y) => {
        n({
          type: "set-object-parent",
          id: f,
          parentId: y
        });
      }, []),
      p = g.useCallback(f => n({
        type: "update-settings",
        patch: f
      }), []),
      m = t.objects.find(f => f.id === t.selectedId) ?? null;
    return {
      state: t,
      selectedObject: m,
      dispatch: n,
      actions: {
        replaceScene: f => n({
          type: "replace-scene",
          scene: f
        }),
        addCharacter: a,
        addCrowd: i,
        addGeometry: o,
        addProp: s,
        addLight: l,
        addCamera: d,
        updateObject: u,
        setObjectParent: h,
        updateSettings: p,
        select: f => n({
          type: "select",
          id: f
        }),
        deleteObject: f => n({
          type: "delete-object",
          id: f
        }),
        duplicateObject: f => n({
          type: "duplicate-object",
          id: f
        }),
        setViewMode: f => n({
          type: "set-view-mode",
          viewMode: f
        }),
        setTool: f => n({
          type: "set-tool",
          tool: f
        }),
        setAspectRatio: f => n({
          type: "set-aspect-ratio",
          aspectRatio: f
        }),
        addShot: () => {
          const f = bat(r("camera")),
            y = t.objects.filter(_ => _.kind === "camera").map(_ => _.position),
            b = f.position;
          y.some(_ => Math.abs(_[0] - b[0]) < .01 && Math.abs(_[1] - b[1]) < .01 && Math.abs(_[2] - b[2]) < .01) && (f.position = [b[0] + .6, b[1], b[2] + .6]), n({
            type: "add-object",
            object: f
          }), n({
            type: "add-shot",
            shot: cde(f.id, t.aspectRatio, f.name)
          });
        },
        duplicateShot: f => n({
          type: "duplicate-shot",
          id: f
        }),
        renameShot: (f, y) => n({
          type: "rename-shot",
          id: f,
          name: y
        }),
        deleteShot: f => n({
          type: "delete-shot",
          id: f
        }),
        selectShot: f => n({
          type: "select-shot",
          id: f
        }),
        updateShotReference: (f, y) => n({
          type: "update-shot",
          id: f,
          patch: y
        }),
        recordCameraKeyframe: f => n({
          type: "record-camera-keyframe",
          keyframe: f
        }),
        deleteCameraKeyframe: f => n({
          type: "delete-camera-keyframe",
          id: f
        }),
        setTimeline: f => n({
          type: "set-timeline",
          patch: f
        }),
        recordObjectKeyframe: f => n({
          type: "record-object-keyframe",
          keyframe: f
        }),
        deleteObjectKeyframe: f => n({
          type: "delete-object-keyframe",
          id: f
        }),
        moveCameraKeyframe: (f, y) => n({
          type: "move-camera-keyframe",
          id: f,
          frame: y
        }),
        moveObjectKeyframe: (f, y) => n({
          type: "move-object-keyframe",
          id: f,
          frame: y
        }),
        splitObjectAt: (f, y, b) => n({
          type: "split-object-at",
          id: f,
          frame: y,
          totalFrames: b
        }),
        setLayerSpan: (f, y, b, v, _ = 0, w) => n({
          type: "set-layer-span",
          id: f,
          inFrame: y,
          outFrame: b,
          totalFrames: v,
          keyDelta: _,
          clipId: w
        }),
        addScreenshot: (f, y) => n({
          type: "add-screenshot",
          cameraId: f,
          dataUrl: y
        }),
        deleteScreenshot: (f, y) => n({
          type: "delete-screenshot",
          cameraId: f,
          screenshotId: y
        }),
        clearScreenshots: f => n({
          type: "clear-screenshots",
          cameraId: f
        }),
        toggleObjectVisible: f => n({
          type: "toggle-object-visible",
          id: f
        }),
        toggleObjectLocked: f => n({
          type: "toggle-object-locked",
          id: f
        }),
        resetSceneObjects: () => {
          const f = bat(1),
            y = ONe(1);
          n({
            type: "replace-objects",
            objects: [f, y],
            selectedId: null
          });
        },
        undo: () => n({
          type: "undo"
        }),
        redo: () => n({
          type: "redo"
        })
      }
    };
  },
  mEa = "Kaydara FBX Binary  ",
  fEa = 20 * 1024 * 1024,
  gEa = {
    hips: ["hips", "hip", "pelvis"],
    spine: ["spine", "spine1", "spine2"],
    head: ["head"],
    leftarm: ["leftarm", "leftuparm", "leftupperarm"],
    leftupleg: ["leftupleg", "leftupperleg", "leftthigh"]
  },
  yEa = e => e.toLowerCase().replace(/^mixamorig[:_]?/i, "").replace(/[^a-z0-9]/g, ""),
  bEa = e => {
    const t = new Set(e.map(yEa));
    return Object.values(gEa).every(n => n.some(r => t.has(r)));
  },
  vEa = e => e.byteLength <= 0 || e.byteLength > fEa ? {
    ok: !1,
    message: "FBX 文件过大或为空（上限 20MB）"
  } : new TextDecoder("ascii").decode(e.slice(0, 20)) !== mEa ? {
    ok: !1,
    message: "仅支持 Mixamo 二进制 FBX"
  } : {
    ok: !0
  },
  wEa = (e, t) => {
    const n = new Set(),
      r = i => !t || i === t,
      a = i => !t || i === t;
    for (const i of e.keyframes ?? []) r(i.cameraId) && n.add(Math.round(i.frame));
    for (const i of e.objectKeyframes ?? []) a(i.objectId) && n.add(Math.round(i.frame));
    return [...n].sort((i, o) => i - o);
  },
  xEa = (e, t, n) => {
    if (e.length === 0) return null;
    if (n < 0) {
      for (let r = e.length - 1; r >= 0; r -= 1) if (e[r] < t) return e[r];
      return null;
    }
    for (const r of e) if (r > t) return r;
    return null;
  },
  iQn = e => Math.max(.001, e.sourceDurationSeconds),
  oQn = e => Math.max(0, e.sourceStartSeconds ?? 0),
  SDt = (e, t) => {
    const n = e.startFrame,
      r = n + Math.max(1, e.durationFrames);
    return t > n && t < r;
  },
  _Ea = (e, t, n) => {
    const r = e.filter(a => a.objectId === t && SDt(a, n));
    return r.length ? [...r].sort((a, i) => i.startFrame - a.startFrame || i.id.localeCompare(a.id))[0] ?? null : null;
  },
  kEa = (e, t, n, r) => {
    const a = e.find(y => y.id === t);
    if (!a || !SDt(a, n)) return null;
    const i = Math.max(1, a.durationFrames),
      o = n - a.startFrame,
      s = a.startFrame + i - n;
    if (o < 1 || s < 1) return null;
    const l = o / i,
      d = oQn(a),
      u = iQn(a),
      h = u * l,
      p = u * (1 - l),
      m = {
        ...a,
        durationFrames: o,
        sourceDurationSeconds: h,
        sourceStartSeconds: d
      },
      f = {
        ...a,
        id: r,
        startFrame: n,
        durationFrames: s,
        sourceDurationSeconds: p,
        sourceStartSeconds: d + h
      };
    return e.flatMap(y => y.id === t ? [m, f] : [y]);
  },
  AEa = (e, t, n, r) => {
    const a = e.filter(d => d.objectId === t && d.startFrame <= n).sort((d, u) => u.startFrame - d.startFrame || u.id.localeCompare(d.id))[0];
    if (!a) return null;
    const i = Math.max(1, a.durationFrames),
      o = Math.max(0, n - a.startFrame),
      s = a.mode === "loop" ? o % i : Math.min(i, o),
      l = iQn(a);
    return {
      clip: a,
      timeSeconds: oQn(a) + s / i * l,
      speed: l * Math.max(1, r) / i
    };
  },
  SEa = ({
    isOpen: e,
    onClose: t,
    initialScene: n,
    onSceneChange: r,
    onSendScreenshotToCanvas: a,
    initialSmartBuild: i = !1,
    apiConfigs: o = [],
    chatModel: s = "",
    globalApiKey: l = ""
  }) => {
    var Pt;
    on();
    const [d, u] = g.useState(i),
      h = g.useRef(null),
      p = g.useRef(null),
      [m, f] = g.useState(() => {
        if (typeof document > "u") return 0;
        const dt = document.querySelector(".studio-canvas-host");
        return dt instanceof HTMLElement ? dt.clientHeight : window.innerHeight;
      }),
      {
        state: y,
        selectedObject: b,
        actions: v
      } = pEa(n),
      _ = v.updateObject,
      [w, k] = g.useState(!1),
      [A, S] = g.useState(!1),
      C = g.useRef(null),
      I = g.useRef(null),
      [E, M] = g.useState(0),
      [T, P] = g.useState(!1),
      R = g.useRef(0),
      j = g.useRef(!1),
      B = g.useRef(null),
      [F, N] = g.useState(!1),
      [G, z] = g.useState(!1),
      [V, O] = g.useState(null),
      [L, D] = g.useState(!0),
      [U, H] = g.useState({
        w: 224,
        h: 190
      }),
      [Y, K] = g.useState({
        x: 0,
        y: 0
      }),
      [W] = g.useState("world"),
      [Q, q] = g.useState(null),
      [ne, de] = g.useState(!1),
      [le, J] = g.useState("preview"),
      [pe, ce] = g.useState(!1),
      [we, X] = g.useState(.58),
      [Z, re] = g.useState(null),
      [fe, ye] = g.useState({
        w: 640,
        h: 360
      }),
      [ie, ae] = g.useState(null),
      [be, Ee] = g.useState(null),
      [xe, he] = g.useState("saved"),
      ue = g.useRef(null),
      ge = g.useRef(null),
      _e = g.useRef(null);
    _e.current = ie;
    const ke = g.useRef(null);
    ke.current = be;
    const ve = g.useRef(() => {}),
      Te = g.useRef(() => {}),
      [Ne, me] = g.useState(!1),
      [Ae, Fe] = g.useState(null),
      [Me, Re] = g.useState(null),
      $e = g.useRef(null);
    $e.current = Me;
    const rt = g.useRef(!1);
    rt.current = Ne, g.useEffect(() => (Ne ? document.body.dataset.director3dControl = "1" : delete document.body.dataset.director3dControl, () => {
      delete document.body.dataset.director3dControl;
    }), [Ne]), g.useEffect(() => {
      var xt;
      if (!Me) return;
      (((xt = y.timeline) == null ? void 0 : xt.characterAnimationClips) ?? []).some(yn => yn.id === Me) || Re(null);
    }, [Me, (Pt = y.timeline) == null ? void 0 : Pt.characterAnimationClips]);
    const nt = g.useRef(null),
      ze = g.useRef(null),
      Le = g.useRef(y),
      Ke = g.useRef(new Map()),
      Xe = g.useRef([]);
    Le.current = y;
    const De = dt => {
      const xt = Le.current,
        yn = xt.timeline ?? {
          keyframes: []
        },
        gn = xEa(wEa(yn, xt.selectedId), Math.round(R.current), dt);
      gn != null && (R.current = gn, M(gn));
    };
    g.useEffect(() => {
      if (!e) {
        k(!1), S(!1);
        return;
      }
      S(!1);
      let dt = !1,
        xt = 0,
        yn = 0;
      return xt = requestAnimationFrame(() => {
        yn = requestAnimationFrame(() => !dt && k(!0));
      }), () => {
        dt = !0, cancelAnimationFrame(xt), cancelAnimationFrame(yn);
      };
    }, [e]), g.useEffect(() => {
      if (!e || A) return;
      const dt = window.setTimeout(() => S(!0), 3500);
      return () => window.clearTimeout(dt);
    }, [e, A]), g.useEffect(() => {
      if (!e) return;
      const dt = document.body.style.overflow;
      return document.body.style.overflow = "hidden", () => {
        document.body.style.overflow = dt;
      };
    }, [e]), g.useEffect(() => {
      if (!e) return;
      const dt = p.current;
      if (!dt) return;
      const xt = () => f(dt.clientHeight);
      xt();
      const yn = new ResizeObserver(xt);
      return yn.observe(dt), () => yn.disconnect();
    }, [e]), g.useEffect(() => {
      if (!e || !r) return;
      he("saving");
      const dt = window.setTimeout(() => {
        r(gat(Le.current)), he("saved");
      }, 400);
      return () => window.clearTimeout(dt);
    }, [e, r, y]), g.useEffect(() => {
      const dt = y.timeline;
      y.objects.forEach(xt => {
        if (xt.kind !== "camera") return;
        const yn = xt.followTargetId ? y.objects.find(Pa => Pa.id === xt.followTargetId) : null,
          gn = `${xt.id}:${xt.followTargetId ?? ""}`,
          mt = xt.lookAtMode === "target" ? y.objects.find(Pa => Pa.id === xt.lookAtTargetId) : null,
          Xt = `${xt.id}:look:${xt.lookAtTargetId ?? ""}`,
          Gn = dt ? C6(dt, xt.id, "position") : !1,
          rr = yn && dt ? G4(dt, yn.id, "position") : !1;
        if (!yn) Ke.current.delete(gn);else if (Gn || rr) Ke.current.set(gn, [...yn.position]);else {
          const Pa = Ke.current.get(gn);
          if (Ke.current.set(gn, [...yn.position]), Pa) {
            const fa = yn.position.map((Ca, $n) => Ca - Pa[$n]);
            fa.some(Ca => Math.abs(Ca) > .001) && _(xt.id, {
              position: xt.position.map((Ca, $n) => Ca + fa[$n]),
              lookAt: xt.lookAt.map((Ca, $n) => Ca + fa[$n])
            }, !0);
          }
        }
        if (!mt || mt.id === xt.followTargetId) {
          Ke.current.delete(Xt);
          return;
        }
        const qn = dt ? C6(dt, xt.id, "lookAt") : !1,
          Dn = dt ? G4(dt, mt.id, "position") : !1;
        if (qn || Dn) {
          Ke.current.set(Xt, [...mt.position]);
          return;
        }
        const Ar = Ke.current.get(Xt);
        if (Ke.current.set(Xt, [...mt.position]), !Ar) return;
        const _r = mt.position.map((Pa, fa) => Pa - Ar[fa]);
        _r.some(Pa => Math.abs(Pa) > .001) && _(xt.id, {
          lookAt: xt.lookAt.map((Pa, fa) => Pa + _r[fa])
        }, !0);
      });
    }, [y.objects, y.timeline, _]), g.useEffect(() => {
      if (!e) return;
      const dt = xt => {
        var mt, Xt, Gn, rr, qn, Dn, Ar, _r, Pa, fa;
        const yn = xt.target;
        if (yn != null && yn.matches('input, textarea, select, [contenteditable="true"]')) return;
        if (rt.current && (xt.ctrlKey || xt.metaKey) && xt.key.toLowerCase() === "s") {
          xt.preventDefault(), xt.stopPropagation();
          return;
        }
        if (xt.key === "Escape" && (_e.current || ke.current)) {
          xt.preventDefault(), ae(null), Ee(null);
          return;
        }
        if (xt.key === "Enter" && ke.current) {
          xt.preventDefault(), Te.current();
          return;
        }
        if (xt.key === "Enter" && _e.current) {
          xt.preventDefault(), _e.current.step === "review" ? ve.current() : ae($n => $n && n6e($n) ? mat($n) : $n);
          return;
        }
        if (xt.key === "Escape" && G) {
          xt.preventDefault(), z(!1);
          return;
        }
        const gn = xt.ctrlKey || xt.metaKey;
        if ((xt.key === "Delete" || xt.key === "Backspace") && y.selectedId) xt.preventDefault(), v.deleteObject(y.selectedId);else if (gn && xt.key.toLowerCase() === "z" && xt.shiftKey) xt.preventDefault(), v.redo();else if (gn && xt.key.toLowerCase() === "z") xt.preventDefault(), v.undo();else if (gn && xt.shiftKey && xt.key.toLowerCase() === "d") {
          xt.preventDefault();
          const Ca = Le.current,
            $n = Ca.selectedId,
            yr = Math.max(0, Math.round(R.current)),
            Ir = Math.max(1, Math.round((((mt = Ca.timeline) == null ? void 0 : mt.durationSeconds) ?? 15) * (((Xt = Ca.timeline) == null ? void 0 : Xt.fps) ?? 24))),
            Gr = ((Gn = Ca.timeline) == null ? void 0 : Gn.characterAnimationClips) ?? [],
            Zr = $e.current,
            La = Zr ? Gr.find(sa => sa.id === Zr) : void 0;
          if (La) {
            const sa = SDt(La, yr) ? La.id : (rr = _Ea(Gr, La.objectId, yr)) == null ? void 0 : rr.id;
            if (sa) {
              const Ea = kEa(Gr, sa, yr, `anim-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`);
              Ea && (v.setTimeline({
                characterAnimationClips: Ea
              }), Re(sa));
            }
            return;
          }
          $n && v.splitObjectAt($n, yr, Ir);
        }
        if (xt.key === "Home") {
          xt.preventDefault(), (qn = h.current) == null || qn.frameAll();
          return;
        }
        if (xt.altKey && xt.key.toLowerCase() === "h") {
          xt.preventDefault(), q(null);
          return;
        } else if (!gn && !xt.altKey) {
          if (xt.key.toLowerCase() === "f" && y.selectedId) xt.preventDefault(), (Dn = h.current) == null || Dn.focusObject(y.selectedId);else if (xt.code === "Space") {
            if (xt.preventDefault(), (_r = (Ar = document.activeElement) == null ? void 0 : Ar.blur) == null || _r.call(Ar), rt.current) return;
            P(Ca => {
              var $n, yr, Ir, Gr;
              if (!Ca) {
                const Zr = Le.current,
                  La = Math.max(1, Math.round(((($n = Zr.timeline) == null ? void 0 : $n.durationSeconds) ?? 15) * (((yr = Zr.timeline) == null ? void 0 : yr.fps) ?? 24))),
                  sa = Math.max(0, La - 1),
                  Ea = Math.max(0, Math.min(sa, Math.round(((Ir = Zr.timeline) == null ? void 0 : Ir.workAreaStart) ?? 0))),
                  ba = Math.max(Ea, Math.min(sa, Math.round(((Gr = Zr.timeline) == null ? void 0 : Gr.workAreaEnd) ?? sa)));
                R.current >= ba && (R.current = Ea);
              }
              return !Ca;
            });
          } else if (xt.key.toLowerCase() === "k") {
            xt.preventDefault();
            const Ca = Le.current,
              $n = Math.max(0, Math.round(R.current)),
              yr = Ca.objects.find(Ir => Ir.id === Ca.selectedId) ?? null;
            if (yr && yr.kind !== "camera" && yr.kind !== "crowd") {
              const Ir = yr.kind === "character" ? ["position", "rotation", "scale", "opacity", "pose"] : ["position", "rotation", "scale", "opacity"],
                Gr = (((Pa = Ca.timeline) == null ? void 0 : Pa.objectKeyframes) ?? []).find(Zr => Zr.objectId === yr.id && Zr.frame === $n);
              v.recordObjectKeyframe(dat(yr, $n, Ir, Gr));
            } else {
              const Ir = ((yr == null ? void 0 : yr.kind) === "camera" ? yr : Ca.objects.find(Gr => Gr.kind === "camera")) ?? null;
              if (Ir) {
                const Gr = (((fa = Ca.timeline) == null ? void 0 : fa.keyframes) ?? []).find(Zr => Zr.cameraId === Ir.id && Zr.frame === $n);
                v.recordCameraKeyframe(uat(Ir, $n, ["position", "lookAt", "fov"], Gr));
              }
            }
          } else if (xt.key.toLowerCase() === "h") {
            xt.preventDefault();
            const Ca = Le.current.selectedId;
            xt.shiftKey ? q($n => $n && $n === Ca ? null : Ca) : Ca && v.toggleObjectVisible(Ca);
          } else if (xt.key === "," || xt.key === "<") xt.preventDefault(), De(-1);else if (xt.key === "." || xt.key === ">") xt.preventDefault(), De(1);else if (xt.key.toLowerCase() === "v") xt.preventDefault(), xt.shiftKey ? de(Ca => !Ca) : (me(!1), v.setTool("select"));else if (xt.key.toLowerCase() === "b") xt.preventDefault(), me(!1), v.setTool("pose");else if (xt.key.toLowerCase() === "c") {
            xt.preventDefault();
            const Ca = Le.current,
              $n = Ca.objects.find(yr => yr.id === Ca.selectedId);
            if (($n == null ? void 0 : $n.kind) === "character") me(yr => (yr || P(!1), !yr));else {
              const yr = Ca.objects.find(Ir => Ir.kind === "character");
              yr && (v.select(yr.id), P(!1), me(!0));
            }
          }
        }
      };
      return window.addEventListener("keydown", dt), () => window.removeEventListener("keydown", dt);
    }, [v, G, e, De, y.selectedId]), g.useEffect(() => {
      (ie == null ? void 0 : ie.step) === "review" && ce(!0);
    }, [ie == null ? void 0 : ie.step]), g.useEffect(() => {
      const dt = ue.current;
      if (!pe || d || !dt) return;
      const xt = () => ye({
        w: Math.max(320, dt.clientWidth),
        h: Math.max(180, dt.clientHeight)
      });
      xt();
      const yn = new ResizeObserver(xt);
      return yn.observe(dt), () => yn.disconnect();
    }, [pe, d]);
    const Ye = ((b == null ? void 0 : b.kind) === "camera" ? b : null) ?? y.objects.find(dt => dt.kind === "camera") ?? null;
    if (!e) return null;
    let Ce = Ye;
    const He = (y.shots ?? []).find(dt => dt.id === y.activeShotId) ?? null,
      Ve = g.useMemo(() => (He == null ? void 0 : He.referenceImageUrl) == null ? y.settings : {
        ...y.settings,
        referenceImageUrl: He.referenceImageUrl,
        referenceOpacity: He.referenceOpacity ?? y.settings.referenceOpacity,
        referenceScale: He.referenceScale ?? y.settings.referenceScale,
        referenceRotation: He.referenceRotation ?? y.settings.referenceRotation,
        referenceInExport: He.referenceInExport ?? y.settings.referenceInExport
      }, [y.settings, He]),
      it = y.timeline ?? {
        fps: 24,
        durationSeconds: 15,
        loop: !1,
        keyframes: []
      },
      It = Math.max(1, Math.round((it.durationSeconds ?? 15) * (it.fps ?? 24))),
      Ft = Math.max(0, It - 1),
      We = Math.max(0, Math.min(Ft, Math.round(it.workAreaStart ?? 0))),
      Ze = Math.max(We, Math.min(Ft, Math.round(it.workAreaEnd ?? Ft))),
      Ge = Math.max(1, y.objects.filter(dt => dt.kind === "camera" || dt.kind !== "crowd" && !(dt.kind === "character" && dt.parentCrowdId)).length),
      Oe = m > 0 ? Math.max(160, Math.min(420, Math.round(m * .42))) : 420,
      st = Math.min(Oe, Math.max(160, Math.min(420, 80 + Ge * 52))),
      vt = d ? 0 : L ? 36 : Math.min(Oe, V ?? st),
      Ht = XTe(y.objects, E, It),
      nn = (T ? Ht == null ? void 0 : Ht.id : Ye == null ? void 0 : Ye.id) ?? (Ht == null ? void 0 : Ht.id) ?? null;
    T && (Ce = Ht ?? Ye);
    const pt = [...new Set((it.objectKeyframes ?? []).map(dt => dt.objectId))],
      lt = (dt, xt) => Math.abs(dt[0] - xt[0]) < 8e-4 && Math.abs(dt[1] - xt[1]) < 8e-4 && Math.abs(dt[2] - xt[2]) < 8e-4,
      gt = dt => [Number(dt[0].toFixed(3)), Number(dt[1].toFixed(3)), Number(dt[2].toFixed(3))],
      Ut = (dt, xt) => {
        var Ar, _r, Pa, fa, Ca, $n, yr;
        if ((Ar = h.current) != null && Ar.isGizmoDragging()) return;
        const yn = !j.current,
          gn = Le.current.objects,
          mt = xt ? gn.find(Ir => Ir.kind === "camera" && Ir.id === xt) : null,
          Xt = mt ? ACa(it, mt, gn, dt) : null,
          Gn = !!(mt && (C6(it, mt.id, "position") || C6(it, mt.id, "lookAt") || C6(it, mt.id, "fov") || mt.followTargetId || mt.lookAtMode === "target"));
        if (mt && Xt) {
          const {
              position: Ir,
              lookAt: Gr,
              fov: Zr
            } = Xt,
            La = !!(mt.followTargetId || mt.lookAtMode === "target");
          if (yn && Gn && !La) {
            const sa = {};
            lt(Ir, mt.position) || (sa.position = gt(Ir)), lt(Gr, mt.lookAt) || (sa.lookAt = gt(Gr)), Math.abs(Zr - mt.fov) > .05 && (sa.fov = Number(Zr.toFixed(1))), Object.keys(sa).length && v.updateObject(mt.id, sa, !0), (_r = h.current) == null || _r.clearPlayback();
          } else !yn || La ? (Pa = h.current) == null || Pa.applyPlaybackFrame(mt.id, Ir, Gr, Zr) : (fa = h.current) == null || fa.clearPlayback();
        } else (Ca = h.current) == null || Ca.clearPlayback();
        pt.forEach(Ir => {
          var _a, $a, Ya, ta, ki, Wn;
          if (rt.current && Ir === Le.current.selectedId) {
            (_a = h.current) == null || _a.clearObjectPlayback(Ir);
            return;
          }
          const Gr = ADt(it, Ir, dt),
            Zr = Le.current.objects.find(wr => wr.id === Ir);
          if (!Gr || !Zr) {
            ($a = h.current) == null || $a.clearObjectPlayback(Ir);
            return;
          }
          const La = "scale" in Zr && Zr.scale ? Zr.scale : [1, 1, 1],
            sa = Gr.position ?? Zr.position,
            Ea = Gr.rotation ?? Zr.rotation,
            ba = Gr.scale ?? La,
            ga = Gr.opacity ?? Zr.opacity ?? 1;
          if (yn) {
            const wr = {};
            Gr.position && !lt(Gr.position, Zr.position) && (wr.position = gt(Gr.position)), Gr.rotation && !lt(Gr.rotation, Zr.rotation) && (wr.rotation = gt(Gr.rotation)), Gr.scale && !lt(Gr.scale, La) && (wr.scale = gt(Gr.scale)), Gr.opacity != null && Math.abs(Gr.opacity - (Zr.opacity ?? 1)) > .001 && (wr.opacity = Number(Gr.opacity.toFixed(3))), Object.keys(wr).length && v.updateObject(Ir, wr, !0), (Ya = h.current) == null || Ya.applyAuthoredTransform(Ir, sa, Ea, ba, ga);
          } else Gr.position || Gr.rotation || Gr.scale || Gr.opacity != null ? (ta = h.current) == null || ta.applyObjectPlayback(Ir, sa, Ea, ba, ga) : (ki = h.current) == null || ki.clearObjectPlayback(Ir);
          Gr.hasPose && Zr.kind === "character" && ((Wn = h.current) == null || Wn.applyCharacterPose(Ir, Gr.pose ?? Zr.pose, Gr.poseAdjust ?? Zr.poseAdjust, Gr.bonePoses ?? Zr.bonePoses));
        });
        const rr = gn.filter(Ir => Ir.kind === "character"),
          qn = rr.find(Ir => Ir.id === Le.current.selectedId) ?? rr[0],
          Dn = qn ? AEa(it.characterAnimationClips ?? [], qn.id, dt, it.fps ?? 24) : null;
        qn && Dn ? ($n = h.current) == null || $n.applyCharacterAnimationFrame(qn.id, Dn.clip.animationId, Dn.timeSeconds, Dn.clip.mode) : (yr = h.current) == null || yr.clearCharacterAnimation();
      };
    g.useEffect(() => {
      j.current = T;
    }, [T]), g.useEffect(() => {
      Ne && (b == null ? void 0 : b.kind) !== "character" && me(!1);
    }, [Ne, b == null ? void 0 : b.kind]), g.useEffect(() => {
      if (Ne) return;
      const dt = T ? (Ht == null ? void 0 : Ht.id) ?? null : (Ye == null ? void 0 : Ye.id) ?? (Ht == null ? void 0 : Ht.id) ?? null;
      Ut(R.current, dt);
    }, [Ne]), g.useEffect(() => {
      if (T) {
        Le.current.viewMode !== "camera" && (B.current = Le.current.viewMode, v.setViewMode("camera"));
        return;
      }
      const dt = B.current;
      dt && (B.current = null, v.setViewMode(dt));
    }, [T]), g.useEffect(() => {
      const dt = T ? (Ht == null ? void 0 : Ht.id) ?? null : (Ye == null ? void 0 : Ye.id) ?? (Ht == null ? void 0 : Ht.id) ?? null;
      Ut(E, dt);
    }, [E, Ye == null ? void 0 : Ye.id, Ht == null ? void 0 : Ht.id, it.keyframes, it.objectKeyframes, it.characterAnimationClips, it.interpolation, T, It]), g.useEffect(() => {
      if (T) return;
      const dt = Ye ?? Ht;
      !dt || !(dt.followTargetId || dt.lookAtMode === "target") || Ut(E, dt.id);
    }, [y.objects, E, T, Ye == null ? void 0 : Ye.id, Ht == null ? void 0 : Ht.id]), g.useEffect(() => {
      if (!T) return;
      let dt = 0,
        xt = performance.now();
      const yn = gn => {
        const mt = (gn - xt) / 1e3;
        xt = gn;
        const Xt = it.fps ?? 24;
        R.current += mt * Xt, R.current > Ze && (R.current = Ze, P(!1)), M(Math.min(Math.floor(R.current), Ze, Ft)), dt = requestAnimationFrame(yn);
      };
      return dt = requestAnimationFrame(yn), () => cancelAnimationFrame(dt);
    }, [T, Ft, it.fps, Ze]);
    const _t = dt => {
        const xt = Le.current.objects.find(yn => yn.id === Le.current.selectedId);
        return xt && xt.kind !== "camera" && xt.kind !== "crowd" ? [...xt.position] : [...dt.lookAt];
      },
      At = (dt, xt, yn, gn) => {
        const Xt = Le.current.timeline ?? it;
        v.setTimeline({
          keyframes: Kva(Xt.keyframes ?? [], xt, yn, gn, dt)
        }), J("preview");
      },
      Yt = (dt, xt) => {
        var Xt;
        const yn = Le.current,
          gn = (((Xt = yn.objects.find(Gn => Gn.id === yn.selectedId)) == null ? void 0 : Xt.kind) === "camera" ? yn.objects.find(Gn => Gn.id === yn.selectedId) : yn.objects.find(Gn => Gn.kind === "camera")) ?? null;
        if (!gn) return;
        const mt = Vnt({
          workAreaStart: We,
          workAreaEnd: Ze,
          playhead: R.current,
          fps: it.fps ?? 24,
          lastFrame: Ft
        });
        At(dqn({
          camera: gn,
          kind: dt,
          direction: xt,
          lookAt: _t(gn),
          startFrame: mt.start,
          endFrame: mt.end
        }), gn.id, mt.start, mt.end), v.select(gn.id);
      },
      qe = () => {
        var mt;
        const dt = _e.current,
          xt = Le.current,
          yn = (((mt = xt.objects.find(Xt => Xt.id === xt.selectedId)) == null ? void 0 : mt.kind) === "camera" ? xt.objects.find(Xt => Xt.id === xt.selectedId) : xt.objects.find(Xt => Xt.kind === "camera")) ?? null;
        if (!dt || dt.step !== "review" || !yn) return;
        const gn = Vnt({
          workAreaStart: We,
          workAreaEnd: Ze,
          playhead: R.current,
          fps: it.fps ?? 24,
          lastFrame: Ft
        });
        At(uqn({
          cameraId: yn.id,
          fov: yn.fov,
          startFrame: gn.start,
          endFrame: gn.end,
          cameraPoints: dt.cameraPoints,
          targetPoints: dt.targetPoints,
          fallbackPosition: yn.position,
          fallbackLookAt: _t(yn)
        }), yn.id, gn.start, gn.end), v.select(yn.id), ae(null);
      },
      kt = () => {
        const dt = ke.current,
          xt = Le.current,
          yn = dt ? xt.objects.find(Gn => Gn.id === dt.objectId) : null;
        if (!dt || !yn || !fat(dt)) return;
        const gn = Vnt({
            workAreaStart: We,
            workAreaEnd: Ze,
            playhead: R.current,
            fps: it.fps ?? 24,
            lastFrame: Ft
          }),
          mt = "scale" in yn && yn.scale ? yn.scale : [1, 1, 1],
          Xt = xt.timeline ?? it;
        v.setTimeline({
          objectKeyframes: Qva(Xt.objectKeyframes ?? [], yn.id, gn.start, gn.end, Yva({
            objectId: yn.id,
            points: dt.points,
            rotation: yn.rotation,
            scale: mt,
            startFrame: gn.start,
            endFrame: gn.end
          }))
        }), v.select(yn.id), Ee(null), J("preview");
      };
    ve.current = qe, Te.current = kt;
    const St = dt => {
        const xt = dt ?? Le.current.selectedId,
          yn = xt ? Le.current.objects.find(gn => gn.id === xt) : null;
        !yn || yn.kind === "camera" || yn.kind === "crowd" || (v.setViewMode("director"), ae(null), Ee(XCa(yn.id)));
      },
      hn = () => {
        r == null || r(gat(Le.current)), t();
      },
      Qt = () => Math.max(0, Math.round(R.current)),
      Ot = (dt, xt) => {
        if (j.current) return;
        const yn = Le.current,
          gn = yn.objects.find(Dn => Dn.id === dt);
        if (!gn) return;
        const mt = Qt(),
          Xt = yn.timeline ?? it,
          Gn = {
            ...gn,
            ...xt
          };
        if (Gn.kind === "camera") {
          const Dn = [];
          if (xt.position && Dn.push("position"), "lookAt" in xt && xt.lookAt && Dn.push("lookAt"), "fov" in xt && xt.fov != null && Dn.push("fov"), !Dn.length) return;
          const Ar = (Xt.keyframes ?? []).find(_r => _r.cameraId === dt && _r.frame === mt);
          v.recordCameraKeyframe(uat(Gn, mt, Dn, Ar));
          return;
        }
        if (Gn.kind === "crowd") return;
        const rr = [];
        if (xt.position && rr.push("position"), xt.rotation && rr.push("rotation"), "scale" in xt && xt.scale && rr.push("scale"), "opacity" in xt && xt.opacity != null && rr.push("opacity"), ("bonePoses" in xt || "pose" in xt || "poseAdjust" in xt) && rr.push("pose"), !rr.length) return;
        const qn = (Xt.objectKeyframes ?? []).find(Dn => Dn.objectId === dt && Dn.frame === mt);
        v.recordObjectKeyframe(dat(Gn, mt, rr, qn));
      },
      ln = (dt, xt, yn = !1) => {
        const gn = Le.current.objects.find(Xt => Xt.id === dt);
        let mt = xt;
        if ((gn == null ? void 0 : gn.kind) === "camera" && gn.lookAtMode !== "target") {
          const Xt = xt,
            Gn = xt.position ?? gn.position,
            rr = xt.rotation ?? gn.rotation;
          if (xt.rotation) {
            const qn = [rr[0], rr[1], gDt(rr[2])];
            mt = {
              ...mt,
              rotation: qn
            };
            const Dn = !Xt.lookAt && Math.abs(rr[0] - gn.rotation[0]) < .001 && Math.abs(rr[1] - gn.rotation[1]) < .001;
            !Xt.lookAt && !Dn && (mt = {
              ...mt,
              lookAt: otn(Gn, qn, gn.lookAt)
            });
          } else gn.lookAtMode === "rotation" && xt.position && !Xt.lookAt && (mt = {
            ...xt,
            lookAt: otn(Gn, rr, gn.lookAt)
          });
        }
        if (rt.current && (gn == null ? void 0 : gn.kind) === "character" && "pose" in mt) {
          const Xt = {
            ...mt
          };
          delete Xt.pose, Object.keys(Xt).length && v.updateObject(dt, Xt, yn), !yn && Le.current.settings.autoKeyframe === !0 && Ot(dt, mt);
          return;
        }
        v.updateObject(dt, mt, yn), !yn && Le.current.settings.autoKeyframe === !0 && Ot(dt, mt);
      },
      Pn = (dt, xt = "loop") => {
        var rr;
        if (!dt) {
          const qn = (b == null ? void 0 : b.kind) === "character" ? b : y.objects.find(Ar => Ar.kind === "character"),
            Dn = qn ? (it.characterAnimationClips ?? []).filter(Ar => Ar.objectId === qn.id && Ar.startFrame <= R.current).sort((Ar, _r) => _r.startFrame - Ar.startFrame || _r.id.localeCompare(Ar.id))[0] : null;
          Dn && (Re(Ar => Ar === Dn.id ? null : Ar), v.setTimeline({
            characterAnimationClips: (it.characterAnimationClips ?? []).filter(Ar => Ar.id !== Dn.id)
          })), Fe(null), P(!1), (rr = h.current) == null || rr.clearCharacterAnimation();
          return;
        }
        const yn = jvt(dt),
          gn = (b == null ? void 0 : b.kind) === "character" ? b : y.objects.find(qn => qn.kind === "character");
        if (!yn || !gn) return;
        const mt = Math.max(0, Math.min(It - 1, Math.round(R.current))),
          Xt = Math.max(1, Math.round(yn.durationSeconds * (it.fps ?? 24))),
          Gn = {
            id: `anim-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
            objectId: gn.id,
            animationId: yn.id,
            name: yn.name,
            startFrame: mt,
            durationFrames: Xt,
            sourceDurationSeconds: yn.durationSeconds,
            mode: xt
          };
        v.select(gn.id), v.setTimeline({
          characterAnimationClips: [...(it.characterAnimationClips ?? []), Gn]
        }), Re(Gn.id), Fe(yn.id), R.current = mt, M(mt), P(!0);
      },
      rn = (dt, xt) => {
        var Gn;
        if (!xt || !rt.current || Le.current.settings.autoKeyframe !== !0) return;
        const yn = ((Gn = Le.current.timeline) == null ? void 0 : Gn.fps) ?? 24,
          gn = Ze,
          mt = R.current;
        R.current = Math.min(gn, mt + dt * yn);
        const Xt = Math.min(Math.floor(R.current), gn, Ft);
        Xt !== Math.floor(mt) && (M(Xt), R.current = Math.max(R.current, Xt));
      },
      Yn = (dt, xt, yn) => {
        const gn = Le.current.timeline ?? it,
          mt = Qt(),
          Xt = Le.current.objects.find(Gn => Gn.id === dt);
        if (Xt) {
          if (xt === "camera" && Xt.kind === "camera") {
            const Gn = yn;
            if (C6(gn, dt, Gn)) {
              const qn = ICa(gn, dt, Gn);
              v.setTimeline({
                keyframes: qn.keyframes,
                objectKeyframes: qn.objectKeyframes
              });
              return;
            }
            const rr = (gn.keyframes ?? []).find(qn => qn.cameraId === dt && qn.frame === mt);
            v.recordCameraKeyframe(uat(Xt, mt, [Gn], rr));
            return;
          }
          if (xt === "object" && Xt.kind !== "camera" && Xt.kind !== "crowd") {
            const Gn = yn;
            if (G4(gn, dt, Gn)) {
              const qn = CCa(gn, dt, Gn);
              v.setTimeline({
                keyframes: qn.keyframes,
                objectKeyframes: qn.objectKeyframes
              });
              return;
            }
            const rr = (gn.objectKeyframes ?? []).find(qn => qn.objectId === dt && qn.frame === mt);
            v.recordObjectKeyframe(dat(Xt, mt, [Gn], rr));
          }
        }
      },
      Ct = () => new Promise(dt => requestAnimationFrame(() => dt())),
      Cn = async (dt, xt, yn) => {
        try {
          const {
              save: gn
            } = await Ie(async () => {
              const {
                save: Gn
              } = await Promise.resolve().then(() => Sb);
              return {
                save: Gn
              };
            }, void 0, import.meta.url),
            {
              writeFile: mt
            } = await Ie(async () => {
              const {
                writeFile: Gn
              } = await Promise.resolve().then(() => oc);
              return {
                writeFile: Gn
              };
            }, void 0, import.meta.url),
            Xt = await gn({
              defaultPath: xt,
              filters: [{
                name: yn.map(Gn => Gn.toUpperCase()).join("/"),
                extensions: yn
              }]
            });
          return Xt ? (await mt(Xt, new Uint8Array(await dt.arrayBuffer())), !0) : !1;
        } catch {
          const gn = document.createElement("a");
          return gn.href = URL.createObjectURL(dt), gn.download = xt, gn.click(), setTimeout(() => URL.revokeObjectURL(gn.href), 1e3), !0;
        }
      },
      un = async () => {
        var Xt, Gn, rr;
        const dt = y.viewMode,
          xt = j.current;
        j.current = !0, dt !== "camera" && v.setViewMode("camera"), await Ct(), await Ct(), await Ct();
        const yn = [],
          gn = Le.current.objects;
        for (let qn = We; qn <= Ze; qn += 1) {
          const Dn = ((Xt = XTe(gn, qn, It)) == null ? void 0 : Xt.id) ?? (Ye == null ? void 0 : Ye.id) ?? null;
          Ut(qn, Dn), await Ct();
          const Ar = (Gn = h.current) == null ? void 0 : Gn.capture();
          Ar && yn.push(Ar);
        }
        j.current = xt, dt !== "camera" && v.setViewMode(dt);
        const mt = Math.max(0, Math.round(R.current));
        return Ut(mt, ((rr = XTe(Le.current.objects, mt, It)) == null ? void 0 : rr.id) ?? (Ye == null ? void 0 : Ye.id) ?? null), yn;
      },
      Jn = async () => {
        if (!F) {
          N(!0);
          try {
            const dt = await un();
            if (dt.length === 0) {
              window.alert(x("没有捕获到帧，请确认机位和时间轴工作区域。"));
              return;
            }
            const xt = (await Ie(async () => {
                const {
                  default: mt
                } = await Promise.resolve().then(() => wCe);
                return {
                  default: mt
                };
              }, void 0, import.meta.url)).default,
              yn = new xt();
            dt.forEach((mt, Xt) => yn.file(`frame_${String(Xt + 1).padStart(4, "0")}.png`, mt.split(",")[1] ?? "", {
              base64: !0
            }));
            const gn = await yn.generateAsync({
              type: "blob"
            });
            await Cn(gn, "director3d_frames.zip", ["zip"]);
          } catch (dt) {
            console.error(dt), window.alert(x("导出帧失败，请再试一次。"));
          } finally {
            N(!1);
          }
        }
      },
      Kn = async () => {
        if (!F) {
          N(!0);
          try {
            const dt = await un();
            if (dt.length === 0) {
              window.alert(x("没有捕获到帧，请确认机位和时间轴工作区域。"));
              return;
            }
            const {
                invoke: xt
              } = await Ie(async () => {
                const {
                  invoke: qn
                } = await Promise.resolve().then(() => sd);
                return {
                  invoke: qn
                };
              }, void 0, import.meta.url),
              yn = await xt("get_export_temp_dir"),
              gn = yn.replace(/\\/g, "/");
            for (let qn = 0; qn < dt.length; qn += 1) await xt("write_base64_to_file", {
              params: {
                path: `${gn}/frame_${String(qn + 1).padStart(4, "0")}.png`,
                base64Data: dt[qn]
              }
            });
            const mt = it.fps ?? 24,
              {
                save: Xt
              } = await Ie(async () => {
                const {
                  save: qn
                } = await Promise.resolve().then(() => Sb);
                return {
                  save: qn
                };
              }, void 0, import.meta.url),
              Gn = await Xt({
                defaultPath: "director3d.mp4",
                filters: [{
                  name: "MP4",
                  extensions: ["mp4"]
                }]
              });
            if (!Gn) return;
            const rr = Gn.toLowerCase().endsWith(".mp4") ? Gn : `${Gn}.mp4`;
            await xt("ffmpeg_encode_png_sequence_to_mp4", {
              framesDir: yn,
              fps: mt,
              outputPath: rr
            });
          } catch (dt) {
            console.error(dt);
            const xt = dt instanceof Error ? dt.message : String(dt);
            window.alert(xt.includes("FFmpeg") || xt.includes("ffmpeg") ? x(xt) : x("导出 MP4 失败，请确认已安装 FFmpeg（C:\\ffmpeg 或 PATH）。"));
          } finally {
            N(!1);
          }
        }
      },
      en = dt => {
        Xe.current = dt.map(xt => ({
          kind: xt.kind,
          keyframe: structuredClone(xt.keyframe)
        }));
      },
      Vn = () => {
        const dt = Xe.current;
        if (!dt.length) return;
        const xt = Qt(),
          yn = Math.min(...dt.map(mt => mt.keyframe.frame)),
          gn = Le.current.objects.find(mt => mt.id === Le.current.selectedId);
        dt.forEach((mt, Xt) => {
          const Gn = Math.max(0, Math.min(Ft, mt.keyframe.frame - yn + xt)),
            rr = `${Date.now().toString(36)}-${Xt}`;
          if (mt.kind === "camera") {
            const Ar = mt.keyframe,
              _r = (gn == null ? void 0 : gn.kind) === "camera" ? gn.id : Ar.cameraId;
            v.recordCameraKeyframe({
              ...Ar,
              id: `kf-${rr}`,
              frame: Gn,
              cameraId: _r
            });
            return;
          }
          const qn = mt.keyframe,
            Dn = gn && gn.kind !== "camera" && gn.kind !== "crowd" ? gn.id : qn.objectId;
          v.recordObjectKeyframe({
            ...qn,
            id: `ok-${rr}`,
            frame: Gn,
            objectId: Dn
          });
        });
      },
      Tt = () => {
        const dt = Ye,
          xt = y.objects.find(yn => yn.id === y.selectedId && (yn.kind === "character" || yn.kind === "geometry"));
        !dt || !xt || v.updateObject(dt.id, {
          lookAt: [...xt.position],
          lookAtMode: "coordinate"
        });
      },
      Ue = () => {
        var yn;
        const dt = (yn = h.current) == null ? void 0 : yn.getDirectorCamera(),
          xt = Ye;
        !dt || !xt || ln(xt.id, {
          position: dt.position,
          lookAt: dt.lookAt,
          fov: dt.fov,
          lookAtMode: "coordinate"
        });
      },
      et = () => {
        var Xt;
        const dt = (Xt = h.current) == null ? void 0 : Xt.getDirectorCamera();
        if (!dt) return;
        const xt = Math.max(0, Math.round(R.current)),
          yn = Math.max(1, It),
          gn = XTe(Le.current.objects, xt, yn);
        if (gn) {
          const Gn = FYe(gn),
            rr = zYe(gn, yn);
          xt > Gn && xt < rr && v.updateObject(gn.id, {
            outFrame: xt
          });
        }
        const mt = `camera-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
        v.addCamera({
          id: mt,
          position: dt.position,
          lookAt: dt.lookAt,
          fov: dt.fov,
          inFrame: xt,
          outFrame: yn
        }), v.recordCameraKeyframe({
          id: `kf-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
          frame: xt,
          cameraId: mt,
          position: dt.position,
          lookAt: dt.lookAt,
          fov: dt.fov,
          channels: ["position", "lookAt", "fov"]
        });
      },
      ft = dt => {
        dt.preventDefault(), nt.current = {
          startX: dt.clientX,
          startY: dt.clientY,
          baseX: Y.x,
          baseY: Y.y
        };
        const xt = gn => {
            const mt = nt.current;
            mt && K({
              x: mt.baseX - (gn.clientX - mt.startX),
              y: mt.baseY - (gn.clientY - mt.startY)
            });
          },
          yn = () => {
            nt.current = null, window.removeEventListener("pointermove", xt), window.removeEventListener("pointerup", yn);
          };
        window.addEventListener("pointermove", xt), window.addEventListener("pointerup", yn);
      },
      ht = dt => {
        dt.preventDefault(), dt.stopPropagation(), ze.current = {
          startX: dt.clientX,
          startY: dt.clientY,
          w: U.w,
          h: U.h
        };
        const xt = gn => {
            const mt = ze.current;
            mt && H({
              w: Math.max(160, mt.w + (gn.clientX - mt.startX)),
              h: Math.max(120, mt.h + (gn.clientY - mt.startY))
            });
          },
          yn = () => {
            ze.current = null, window.removeEventListener("pointermove", xt), window.removeEventListener("pointerup", yn);
          };
        window.addEventListener("pointermove", xt), window.addEventListener("pointerup", yn);
      },
      wt = () => {
        var xt;
        const dt = (xt = h.current) == null ? void 0 : xt.capture();
        !dt || !Ce || (v.addScreenshot(Ce.id, dt), v.select(Ce.id));
      },
      jt = y.objects.filter(dt => dt.kind === "camera"),
      bt = Z && jt.some(dt => dt.id === Z) ? Z : nn,
      Bt = dt => {
        var Gn, rr;
        dt.preventDefault(), dt.stopPropagation();
        const xt = ((Gn = ge.current) == null ? void 0 : Gn.clientWidth) || ((rr = dt.currentTarget.parentElement) == null ? void 0 : rr.clientWidth) || 800,
          yn = dt.clientX,
          gn = we;
        dt.currentTarget.setPointerCapture(dt.pointerId);
        const mt = qn => {
            X(Math.max(.28, Math.min(.78, gn + (qn.clientX - yn) / xt)));
          },
          Xt = () => {
            window.removeEventListener("pointermove", mt), window.removeEventListener("pointerup", Xt);
          };
        window.addEventListener("pointermove", mt), window.addEventListener("pointerup", Xt);
      },
      wn = vt + 8,
      at = wn + 52;
    return c.jsxs("div", {
      ref: p,
      "data-director3d-workbench": !0,
      "data-smart-build-open": d,
      className: "fixed inset-0 z-[9999] flex min-h-0 flex-col overflow-hidden bg-[#060608] font-sans text-zinc-200",
      children: [c.jsxs("div", {
        className: "director-workspace flex min-h-0 flex-1 flex-col",
        ...(d ? {
          inert: ""
        } : {}),
        children: [c.jsx(fqn, {
          chrome: le,
          viewMode: y.viewMode,
          splitPreview: pe,
          saveState: xe,
          settings: y.settings,
          onChromeChange: J,
          onViewModeChange: v.setViewMode,
          onToggleSplit: () => ce(dt => !dt),
          onSettingsChange: v.updateSettings,
          planViewControls: y.viewMode === "top" ? c.jsx(_1a, {
            getZoom: () => {
              var dt;
              return ((dt = h.current) == null ? void 0 : dt.getPlanViewZoom()) ?? 1;
            },
            onRotate: dt => {
              var xt;
              return (xt = h.current) == null ? void 0 : xt.rotatePlanView(dt);
            },
            onZoom: dt => {
              var xt;
              return (xt = h.current) == null ? void 0 : xt.zoomPlanView(dt);
            },
            onReset: () => {
              var dt;
              return (dt = h.current) == null ? void 0 : dt.resetPlanView();
            }
          }) : void 0,
          onHelp: () => z(!0),
          onSmartBuild: () => {
            P(!1), u(!0);
          },
          onClose: hn
        }), c.jsxs("div", {
          className: "flex min-h-0 flex-1",
          children: [c.jsx(pqn, {
            objects: y.objects,
            selectedId: y.selectedId,
            aspectRatio: y.aspectRatio,
            panoramaImageUrl: y.settings.panoramaImageUrl,
            onSelect: dt => {
              Re(null), v.select(dt);
            },
            onRename: (dt, xt) => v.updateObject(dt, {
              name: xt
            }),
            onToggleVisible: v.toggleObjectVisible,
            onToggleLocked: v.toggleObjectLocked,
            onDuplicate: v.duplicateObject,
            onDelete: v.deleteObject,
            onAddCharacter: v.addCharacter,
            onAddCrowd: v.addCrowd,
            onAddGeometry: v.addGeometry,
            onAddProp: v.addProp,
            onAddLight: v.addLight,
            onImportCharacterFbx: async dt => {
              const xt = await dt.arrayBuffer(),
                yn = vEa(xt);
              if (!yn.ok) {
                window.alert(x(yn.message));
                return;
              }
              try {
                const mt = new SKn().parse(xt, ""),
                  Xt = [];
                if (mt.traverse(Gn => {
                  Gn.isBone && Xt.push(Gn.name);
                }), !bEa(Xt)) {
                  window.alert(x("角色骨架不兼容，请使用 Mixamo 骨架的 FBX"));
                  return;
                }
              } catch {
                window.alert(x("无法导入该 FBX，请检查文件后重试"));
                return;
              }
              const gn = await new Promise((mt, Xt) => {
                const Gn = new FileReader();
                Gn.onload = () => mt(String(Gn.result)), Gn.onerror = () => Xt(Gn.error), Gn.readAsDataURL(dt);
              });
              v.addCharacter({
                fbxUrl: gn,
                name: dt.name.replace(/\.fbx$/i, "") || "导入角色"
              });
            },
            onAddCamera: (dt = {}) => {
              var yn;
              const xt = Object.keys(dt).length > 1 ? dt : {
                ...dt,
                ...((yn = h.current) == null ? void 0 : yn.getDirectorCamera())
              };
              v.addCamera(xt);
            },
            onAspectRatioChange: v.setAspectRatio,
            onPanoramaChange: dt => v.updateSettings({
              panoramaImageUrl: dt
            }),
            onApplyCameraMove: Yt,
            onStartCustomPath: dt => {
              v.setViewMode("director"), Ee(null), ae(KCa(dt)), v.select(null);
            },
            onIsolate: dt => q(xt => xt === dt ? null : dt)
          }), c.jsxs("div", {
            "data-director-stage": !0,
            className: "relative min-w-0 flex-1 overflow-hidden bg-[#060608]",
            style: {
              paddingBottom: vt
            },
            children: [c.jsxs("div", {
              ref: ge,
              "data-director-viewports": !0,
              className: "flex h-full min-h-0",
              children: [c.jsxs("main", {
                className: "relative min-h-0 min-w-0 overflow-hidden bg-[#060608]",
                style: {
                  flex: pe && !d ? `${we} 1 0` : "1 1 auto"
                },
                children: [w ? c.jsx(qKn, {
                  ref: h,
                  objects: y.objects,
                  selectedId: y.selectedId,
                  settings: Ve,
                  viewMode: y.viewMode,
                  tool: y.tool,
                  aspectRatio: y.aspectRatio,
                  playing: T,
                  playheadFrame: E,
                  totalFrames: It,
                  timelineCameraId: (Ht == null ? void 0 : Ht.id) ?? null,
                  onSelect: dt => {
                    Re(null), v.select(dt);
                  },
                  onObjectTransform: ln,
                  onBlankClick: () => {
                    Re(null), v.select(null);
                  },
                  onStandingReady: () => S(!0),
                  livePreviewCameraId: bt,
                  pipPreviewCanvasRef: C,
                  panelPreviewCanvasRef: I,
                  lockCameraToView: !!y.settings.lockCameraToView,
                  transformSpace: W,
                  isolatedId: Q,
                  hideChrome: ne,
                  controlCharacterId: !d && Ne && (b == null ? void 0 : b.kind) === "character" ? b.id : null,
                  characterAnimationId: !T && Ne ? Ae : null,
                  onControlTick: rn,
                  cameraKeyframes: it.keyframes ?? [],
                  objectKeyframes: it.objectKeyframes ?? [],
                  pathDraft: ie,
                  onPathGesture: dt => ae(xt => xt && YCa(xt, dt)),
                  objectPathDraft: be,
                  onObjectPathGesture: dt => Ee(xt => xt && JCa(xt, dt)),
                  onPathFinish: () => {
                    var dt;
                    ke.current && fat(ke.current) ? Te.current() : ((dt = _e.current) == null ? void 0 : dt.step) === "review" ? ve.current() : ae(xt => xt && n6e(xt) ? mat(xt) : xt);
                  },
                  previewSize: pe ? fe : {
                    w: 320,
                    h: 180
                  }
                }) : c.jsx("div", {
                  className: "grid h-full place-items-center bg-[#060608]",
                  children: c.jsxs("div", {
                    className: "flex flex-col items-center gap-3 text-[11px] text-zinc-600",
                    children: [c.jsx(Ua, {
                      size: 24,
                      className: "animate-spin text-cyan-400"
                    }), x("正在初始化 3D 场景")]
                  })
                }), w && !A && c.jsx("div", {
                  className: "pointer-events-none absolute inset-0 z-40 grid place-items-center bg-[#060608]",
                  children: c.jsxs("div", {
                    className: "flex flex-col items-center gap-3 text-[11px] text-zinc-600",
                    children: [c.jsx(Ua, {
                      size: 24,
                      className: "animate-spin text-cyan-400"
                    }), x("正在加载 3D 角色模型")]
                  })
                }), !d && !T && y.viewMode !== "top" && !(y.viewMode === "camera" && y.aspectRatio !== "auto") && c.jsx(nQn, {
                  activeAxis: null,
                  onAlign: dt => {
                    if (dt === "y") {
                      v.setViewMode("top");
                      return;
                    }
                    v.setViewMode("director"), window.requestAnimationFrame(() => {
                      var xt, yn;
                      dt === "perspective" ? (xt = h.current) == null || xt.resetView() : (yn = h.current) == null || yn.alignViewAxis(dt);
                    });
                  },
                  onReset: () => {
                    var dt;
                    v.setViewMode("director"), (dt = h.current) == null || dt.resetView();
                  },
                  onFrameAll: () => {
                    var dt;
                    return (dt = h.current) == null ? void 0 : dt.frameAll();
                  }
                })]
              }), pe && !d && c.jsxs(c.Fragment, {
                children: [c.jsx("div", {
                  role: "separator",
                  title: x("调整分屏比例"),
                  className: "relative z-40 w-2 shrink-0 cursor-col-resize bg-white/[0.08] hover:bg-cyan-400/50",
                  onPointerDown: Bt
                }), c.jsxs("aside", {
                  className: "flex min-h-0 min-w-[220px] flex-col bg-[#0a0a0c]",
                  style: {
                    flex: `${1 - we} 1 0`
                  },
                  children: [c.jsx("div", {
                    className: "flex h-8 shrink-0 items-center gap-1 overflow-x-auto border-b border-white/[0.06] px-2",
                    children: jt.length === 0 ? c.jsx("span", {
                      className: "text-[10px] text-zinc-600",
                      children: x("还没有机位")
                    }) : jt.map(dt => c.jsx("button", {
                      type: "button",
                      onClick: () => {
                        re(dt.id), v.select(dt.id);
                      },
                      className: `h-6 shrink-0 rounded-md px-2 text-[10px] ${bt === dt.id ? "bg-white/[0.1] text-white" : "text-zinc-500 hover:text-zinc-200"}`,
                      children: dt.name
                    }, dt.id))
                  }), c.jsx("div", {
                    ref: ue,
                    className: "min-h-0 flex-1 bg-[#050509]",
                    children: Ye ? c.jsx("canvas", {
                      ref: C,
                      className: "h-full w-full object-cover"
                    }) : c.jsx("div", {
                      className: "grid h-full place-items-center text-[10px] text-zinc-600",
                      children: x("还没有机位")
                    })
                  })]
                })]
              })]
            }), Q && c.jsx("div", {
              className: "pointer-events-none absolute inset-x-0 top-2 z-20 flex justify-center",
              children: c.jsx("div", {
                className: "pointer-events-auto rounded-full border border-white/10 bg-[#242424]/95 px-3 py-1 text-[10px] text-zinc-300",
                children: x("隔离显示中 · Alt+H 退出")
              })
            }), ie && c.jsx("div", {
              className: "pointer-events-none absolute inset-x-0 z-30 flex justify-center",
              style: {
                bottom: at
              },
              children: c.jsxs("div", {
                className: "pointer-events-auto flex max-w-[720px] items-center gap-2 rounded-xl border border-cyan-400/25 bg-[#191919]/95 px-3 py-2 text-[11px] text-zinc-200 shadow-xl",
                children: [c.jsx("span", {
                  className: "min-w-0 flex-1",
                  children: eEa(ie)
                }), ie.step !== "review" && c.jsx("button", {
                  type: "button",
                  disabled: !n6e(ie),
                  onClick: () => ae(dt => dt && n6e(dt) ? mat(dt) : dt),
                  className: "h-7 rounded-md bg-white/[0.08] px-2 text-[10px] disabled:opacity-40",
                  children: x("下一步")
                }), ie.step === "review" && c.jsx("button", {
                  type: "button",
                  onClick: qe,
                  className: "h-7 rounded-md bg-cyan-400/20 px-2 text-[10px] text-cyan-200",
                  children: x("确认写入")
                }), c.jsx("button", {
                  type: "button",
                  onClick: () => ae(null),
                  className: "h-7 rounded-md px-2 text-[10px] text-zinc-500 hover:text-zinc-100",
                  children: x("取消")
                })]
              })
            }), be && c.jsx("div", {
              className: "pointer-events-none absolute inset-x-0 z-30 flex justify-center",
              style: {
                bottom: at
              },
              children: c.jsxs("div", {
                className: "pointer-events-auto flex max-w-[720px] items-center gap-2 rounded-xl border border-cyan-400/25 bg-[#191919]/95 px-3 py-2 text-[11px] text-zinc-200 shadow-xl",
                children: [c.jsx("span", {
                  className: "min-w-0 flex-1",
                  children: ZCa(be)
                }), c.jsx("button", {
                  type: "button",
                  disabled: !fat(be),
                  onClick: kt,
                  className: "h-7 rounded-md bg-cyan-400/20 px-2 text-[10px] text-cyan-200 disabled:opacity-40",
                  children: x("确认写入")
                }), c.jsx("button", {
                  type: "button",
                  onClick: () => Ee(null),
                  className: "h-7 rounded-md px-2 text-[10px] text-zinc-500 hover:text-zinc-100",
                  children: x("取消")
                })]
              })
            }), !T && !ie && !be && b && b.kind !== "camera" && b.kind !== "crowd" && c.jsx("div", {
              className: "pointer-events-none absolute inset-x-0 z-20 flex justify-center",
              style: {
                bottom: at
              },
              children: c.jsx("button", {
                type: "button",
                onClick: () => St(b.id),
                className: "pointer-events-auto rounded-full border border-white/10 bg-[#242424]/95 px-3 py-1.5 text-[10px] text-zinc-200 shadow-lg hover:bg-[#2c2c2c]",
                children: x("绘制移动路径")
              })
            }), c.jsx(cqn, {
              activeTool: y.tool,
              onSetTool: dt => {
                me(!1), v.setTool(dt);
              },
              onScreenshot: wt,
              bottom: wn,
              hideChrome: ne,
              characterControlOn: Ne,
              canControlCharacter: y.objects.some(dt => dt.kind === "character"),
              animations: RKn,
              activeAnimationId: Ae,
              onSelectAnimation: Pn,
              onToggleCharacterControl: () => {
                if ((b == null ? void 0 : b.kind) === "character") {
                  me(xt => (xt || P(!1), !xt));
                  return;
                }
                const dt = y.objects.find(xt => xt.kind === "character");
                dt && (v.select(dt.id), P(!1), me(!0));
              }
            }), w && A && c.jsxs("div", {
              className: `pointer-events-auto absolute left-4 z-30 flex items-center gap-0.5 rounded-lg bg-[#1c1c1e]/95 px-1 py-1 shadow-sm backdrop-blur-md ${ne ? "border border-transparent" : "border border-white/[0.07]"}`,
              style: {
                bottom: wn
              },
              children: [["auto", "16:9", "9:16", "4:3", "3:4", "2.39:1"].map(dt => c.jsx("button", {
                onClick: () => v.setAspectRatio(dt),
                className: `rounded-md px-2 py-1 text-[9px] transition ${y.aspectRatio === dt ? "bg-white/[0.12] text-white" : "text-zinc-500 hover:text-zinc-200"}`,
                children: dt === "auto" ? "Auto" : dt
              }, dt)), c.jsx("button", {
                type: "button",
                title: x("构图辅助线：关 / 三分 / 中心"),
                onClick: () => {
                  const dt = y.settings.compositionGuides ?? "off",
                    xt = dt === "off" ? "thirds" : dt === "thirds" ? "center" : "off";
                  v.updateSettings({
                    compositionGuides: xt
                  });
                },
                className: `ml-1 rounded-md px-2 py-1 text-[9px] transition ${(y.settings.compositionGuides ?? "off") !== "off" ? "bg-white/[0.12] text-white" : "text-zinc-500 hover:text-zinc-200"}`,
                children: (y.settings.compositionGuides ?? "off") === "thirds" ? x("三分") : (y.settings.compositionGuides ?? "off") === "center" ? x("中心") : x("构图")
              })]
            }), w && A && !pe && c.jsxs("div", {
              className: `pointer-events-auto absolute right-4 z-30 flex flex-col overflow-hidden rounded-lg bg-[#191919]/95 shadow-md backdrop-blur-md ${ne ? "border border-transparent" : "border border-white/[0.07]"}`,
              style: {
                right: 16 + Y.x,
                bottom: wn + Y.y,
                width: U.w,
                height: U.h
              },
              children: [c.jsxs("div", {
                className: `flex h-7 shrink-0 cursor-move select-none items-center justify-between px-2.5 py-1.5 ${ne ? "" : "border-b border-white/[0.06]"}`,
                onPointerDown: ft,
                children: [c.jsx("span", {
                  className: "truncate text-[10px] font-semibold text-zinc-300",
                  children: (Ce == null ? void 0 : Ce.name) ?? x("机位预览")
                }), c.jsxs("span", {
                  className: "shrink-0 text-[9px] text-zinc-500",
                  children: ["FOV ", Math.round((Ce == null ? void 0 : Ce.fov) ?? 45), "° · ", y.aspectRatio]
                })]
              }), c.jsx("div", {
                className: "relative min-h-0 flex-1 bg-[#050509]",
                children: Ye ? c.jsx("canvas", {
                  ref: C,
                  className: "h-full w-full object-cover"
                }) : c.jsx("div", {
                  className: "grid h-full place-items-center text-[9px] text-zinc-600",
                  children: x("无可用机位")
                })
              }), c.jsxs("div", {
                className: `flex shrink-0 items-center gap-1 px-2 py-1.5 ${ne ? "" : "border-t border-white/[0.06]"}`,
                children: [c.jsx("button", {
                  onClick: () => {
                    var dt;
                    y.selectedId && ((dt = h.current) == null || dt.focusObject(y.selectedId));
                  },
                  className: "flex h-6 flex-1 items-center justify-center rounded-md bg-white/[0.055] text-[9px] text-zinc-400 hover:text-zinc-100",
                  children: x("聚焦选中")
                }), c.jsx("button", {
                  onClick: Tt,
                  className: "flex h-6 flex-1 items-center justify-center rounded-md bg-white/[0.055] text-[9px] text-zinc-400 hover:text-zinc-100",
                  children: x("对准")
                }), c.jsx("button", {
                  onClick: Ue,
                  className: "flex h-6 flex-1 items-center justify-center rounded-md bg-white/[0.055] text-[9px] text-zinc-400 hover:text-zinc-100",
                  title: x("用当前导演视角覆盖选中机位"),
                  children: x("覆盖机位")
                }), c.jsx("button", {
                  onClick: et,
                  className: "flex h-6 flex-1 items-center justify-center rounded-md bg-cyan-400/15 text-[9px] text-cyan-300 hover:bg-cyan-400/25",
                  title: x("以当前导演视角新增一台机位"),
                  children: x("加机位")
                })]
              }), c.jsx("div", {
                className: `absolute bottom-0 right-0 h-4 w-4 cursor-se-resize ${ne ? "" : "border-l border-t border-white/[0.18]"}`,
                onPointerDown: ht
              })]
            }), c.jsx(JKn, {
              collapsed: L,
              onToggleCollapsed: () => D(dt => !dt),
              timeline: it,
              frame: E,
              totalFrames: It,
              playing: T,
              objects: y.objects,
              activeCameraId: nn,
              selectedObjectId: (b == null ? void 0 : b.id) ?? null,
              height: vt,
              onFrame: dt => {
                M(dt), R.current = dt, Ut(dt, nn);
              },
              onTogglePlay: () => {
                T || (R.current >= Ze && (R.current = We), M(Math.floor(R.current))), P(dt => !dt);
              },
              onJumpKeyframe: De,
              onMoveKeyframe: (dt, xt, yn) => dt === "camera" ? v.moveCameraKeyframe(xt, yn) : v.moveObjectKeyframe(xt, yn),
              onDeleteKeyframe: (dt, xt) => dt === "camera" ? v.deleteCameraKeyframe(xt) : v.deleteObjectKeyframe(xt),
              onDeleteKeyframes: dt => dt.forEach(xt => xt.kind === "camera" ? v.deleteCameraKeyframe(xt.id) : v.deleteObjectKeyframe(xt.id)),
              onToggleChannel: Yn,
              onUpdateObject: ln,
              onSetParent: v.setObjectParent,
              onUpdateAnimationClip: (dt, xt) => v.setTimeline({
                characterAnimationClips: (it.characterAnimationClips ?? []).map(yn => yn.id === dt ? {
                  ...yn,
                  ...xt
                } : yn)
              }),
              onDeleteAnimationClip: dt => {
                Re(xt => xt === dt ? null : xt), v.setTimeline({
                  characterAnimationClips: (it.characterAnimationClips ?? []).filter(xt => xt.id !== dt)
                });
              },
              selectedAnimationClipId: Me,
              onSelectAnimationClip: Re,
              onResizeHeight: O,
              onSelectObject: v.select,
              onToggleVisible: v.toggleObjectVisible,
              onSetLayerSpan: (dt, xt, yn, gn = 0, mt) => v.setLayerSpan(dt, xt, yn, It, gn, mt),
              onExportFrames: Jn,
              onExportVideo: Kn,
              exporting: F,
              exportAbstractCharacters: y.settings.exportAbstractCharacters === !0,
              onToggleExportAbstract: () => v.updateSettings({
                exportAbstractCharacters: y.settings.exportAbstractCharacters !== !0
              }),
              onCopyKeyframes: en,
              onPasteKeyframes: Vn,
              autoKeyframe: y.settings.autoKeyframe === !0,
              onToggleAutoKeyframe: () => v.updateSettings({
                autoKeyframe: y.settings.autoKeyframe !== !0
              }),
              onChange: dt => {
                if (dt.durationSeconds != null || dt.fps != null) {
                  const xt = dt.fps ?? it.fps ?? 24,
                    yn = dt.durationSeconds ?? it.durationSeconds ?? 15,
                    gn = Math.max(0, Math.round(yn * xt) - 1);
                  dt.workAreaStart = Math.min(We, gn), dt.workAreaEnd = Math.min(Math.max(Ze, We), gn);
                }
                v.setTimeline(dt);
              }
            })]
          }), c.jsx(vqn, {
            selectedObject: b,
            objects: y.objects,
            settings: y.settings,
            aspectRatio: y.aspectRatio,
            shots: y.shots ?? [],
            activeShotId: y.activeShotId ?? null,
            onSelectObject: dt => {
              Re(null), v.select(dt);
            },
            onUpdateObject: ln,
            onUpdateSettings: v.updateSettings,
            onAddShot: v.addShot,
            onDuplicateShot: v.duplicateShot,
            onRenameShot: v.renameShot,
            onDeleteShot: v.deleteShot,
            onSelectShot: v.selectShot,
            activeShot: He,
            onUpdateShotReference: v.updateShotReference,
            onDeleteScreenshot: v.deleteScreenshot,
            onClearScreenshots: v.clearScreenshots,
            onCaptureScreenshot: wt,
            cameraPreviewCanvasRef: I,
            onFocusObject: dt => {
              var xt;
              return (xt = h.current) == null ? void 0 : xt.focusObject(dt);
            },
            onAlignCameraToSelected: Tt,
            onSendScreenshotToCanvas: a,
            onStartObjectPath: St
          })]
        })]
      }), d && c.jsx(WCa, {
        apiConfigs: o,
        chatModel: s,
        globalApiKey: l,
        scene: gat(y),
        onClose: () => u(!1),
        onApply: dt => {
          var xt;
          P(!1), M(0), q(null), ae(null), Ee(null), me(!1), Re(null), ce(!1), (xt = dt.timeline) != null && xt.keyframes.length && J("preview"), v.replaceScene(dt), r == null || r(dt);
        }
      }), c.jsx(zva, {
        open: G,
        onClose: () => z(!1)
      })]
    });
  },
  IEa = Object.freeze(Object.defineProperty({
    __proto__: null,
    Director3DWorkbench: SEa
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  qvt = "qiaodoumayiThreeDOverlay",
  Kvt = new Set();

let SM = {
  isOpen: !1,
  entry: null,
  epoch: 0
};

function IDt() {
  for (const e of Kvt) e();
}

function CEa() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function EEa(e) {
  if (e === null || typeof e != "object" || Array.isArray(e)) return !1;
  const t = e;
  return typeof t.sourceNodeId != "string" || typeof t.title != "string" ? !1 : t.kind === "studio" ? typeof t.studioNodeId == "string" && t.sourceSnapshot !== null && typeof t.sourceSnapshot == "object" && !Array.isArray(t.sourceSnapshot) : t.kind === "panorama-preview" ? typeof t.src == "string" : t.kind !== "asset-preview" ? !1 : (t.resourceKind === "object" || t.resourceKind === "scene") && (t.sourceKind === "world-object" || t.sourceKind === "world-scene") && typeof t.canCreateStudio == "boolean" && kX(t.sourceMeta);
}

function TEa(e) {
  var t, n;
  return {
    kind: "studio",
    studioNodeId: e.studioNodeId,
    sourceNodeId: e.sourceNodeId,
    sourceKind: e.sourceKind,
    sourceSnapshot: e.sourceSnapshot,
    title: ((t = e.title) == null ? void 0 : t.trim()) || ((n = e.sourceSnapshot.display_name) == null ? void 0 : n.trim()) || "3D Studio",
    ...(e.createdAt !== void 0 ? {
      createdAt: e.createdAt
    } : {})
  };
}

function MEa(e) {
  return {
    kind: "panorama-preview",
    ...e
  };
}

function PEa(e) {
  return {
    kind: "asset-preview",
    sourceNodeId: e.sourceNodeId,
    resourceKind: e.resourceKind,
    sourceKind: e.resourceKind === "object" ? "world-object" : "world-scene",
    sourceMeta: e.sourceMeta,
    title: e.title,
    canCreateStudio: e.canCreateStudio ?? !0,
    ...(e.createdAt !== void 0 ? {
      createdAt: e.createdAt
    } : {})
  };
}

function CDt(e) {
  const t = e.title ?? e.sourceMeta.display_name ?? "3D";
  if (e.sourceKind === "panorama") {
    const n = e.sourceMeta.pano_url;
    return n ? MEa({
      sourceNodeId: e.sourceNodeId,
      src: n,
      title: t,
      createdAt: e.createdAt
    }) : null;
  }
  return PEa({
    sourceNodeId: e.sourceNodeId,
    resourceKind: e.sourceKind === "world-object" ? "object" : "scene",
    sourceMeta: e.sourceMeta,
    title: t,
    canCreateStudio: e.canCreateStudio,
    createdAt: e.createdAt
  });
}

function Ptn(e, t) {
  if (e === null || typeof e != "object" || Array.isArray(e)) return null;
  const n = e[qvt];
  if (n === null || typeof n != "object" || Array.isArray(n)) return null;
  const r = n;
  return r.canvasPath !== t || typeof r.sessionId != "string" || !EEa(r.entry) ? null : r;
}

function sQn(e, t) {
  const n = e !== null && typeof e == "object" && !Array.isArray(e) ? {
    ...e
  } : {};
  return t ? {
    ...n,
    [qvt]: t
  } : (delete n[qvt], n);
}

function Rtn() {
  return SM;
}

function REa(e) {
  return Kvt.add(e), () => {
    Kvt.delete(e);
  };
}

function nJ(e) {
  SM = {
    isOpen: !0,
    entry: e,
    epoch: SM.epoch + 1
  }, IDt();
}

function vat() {
  SM.isOpen && (SM = {
    ...SM,
    isOpen: !1
  }, IDt());
}

function Ntn() {
  !SM.isOpen && !SM.entry || (SM = {
    isOpen: !1,
    entry: null,
    epoch: SM.epoch
  }, IDt());
}

function NEa() {
  return g.useSyncExternalStore(REa, Rtn, Rtn);
}

function jEa(e) {
  const t = sQn(window.history.state, e);
  window.history.pushState(t, "", window.location.href);
}

function DEa(e) {
  const t = sQn(window.history.state, e);
  window.history.replaceState(t, "", window.location.href);
}

const DA = {
    bar: "border border-white/10 bg-[rgba(38,38,38,0.5)] text-white shadow-[0_4px_8px_rgba(0,0,0,0.04),inset_0_0.5px_0_rgba(255,255,255,0.12)] backdrop-blur-[28px]",
    statusBubble: "rounded-full border border-white/10 bg-[rgba(30,30,30,0.85)] text-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.16),inset_0_0.5px_0_rgba(255,255,255,0.12)] backdrop-blur-[28px]",
    iconButton: "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[rgba(38,38,38,0.5)] text-white/90 backdrop-blur-[28px] hover:bg-white/10 disabled:opacity-40",
    pillButton: "inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-[rgba(38,38,38,0.5)] px-3 text-sm text-white/90 backdrop-blur-[28px] hover:bg-white/10 disabled:opacity-40"
  },
  jtn = 3,
  LEa = {
    success: 2500,
    info: 2500,
    error: 4e3,
    loading: 0
  };

let lk = [];

const Qvt = new Set();

let OEa = 0;

function lQn() {
  for (const e of Qvt) e();
}

function uze(e) {
  e.timer != null && window.clearTimeout(e.timer);
}

function BEa(e, t) {
  return t ? window.setTimeout(() => BNe.dismiss(e.id), t) : null;
}

function FEa(e) {
  if (e.length <= jtn) return e;
  const t = [...e];
  for (; t.length > jtn;) {
    const n = t.findIndex((i, o) => o < t.length - 1 && i.variant !== "loading"),
      r = n >= 0 ? n : 0,
      [a] = t.splice(r, 1);
    a && uze(a);
  }
  return t;
}

function i6e(e, t, n) {
  const r = (n == null ? void 0 : n.id) ?? `3d-toast-${++OEa}`,
    a = LEa[e],
    i = lk.findIndex(l => l.id === r),
    o = {
      id: r,
      variant: e,
      title: t,
      action: n == null ? void 0 : n.action,
      timer: null
    };
  i >= 0 ? (uze(lk[i]), lk = lk.map((l, d) => d === i ? o : l)) : lk = FEa([...lk, o]);
  const s = lk.find(l => l.id === r);
  return s && (s.timer = BEa(s, a)), lQn(), r;
}

const BNe = {
  success: (e, t) => i6e("success", e, t),
  info: (e, t) => i6e("info", e, t),
  error: (e, t) => i6e("error", e, t),
  loading: (e, t) => i6e("loading", e, t),
  dismiss: e => {
    if (e === void 0) {
      for (const t of lk) uze(t);
      lk = [];
    } else {
      const t = lk.find(n => n.id === e);
      if (!t) return;
      uze(t), lk = lk.filter(n => n.id !== e);
    }
    lQn();
  }
};

function zEa({
  className: e = ""
}) {
  const t = g.useSyncExternalStore(n => (Qvt.add(n), () => Qvt.delete(n)), () => lk, () => lk);
  return t.length === 0 ? null : c.jsx("div", {
    className: `pointer-events-none flex max-w-full flex-col items-center gap-1.5 ${e}`,
    children: t.map(n => c.jsxs("div", {
      className: `pointer-events-auto flex max-w-[min(360px,calc(100vw-2rem))] items-center gap-2 px-3 py-2 text-sm ${DA.statusBubble}`,
      children: [c.jsx("span", {
        className: "min-w-0",
        children: n.title
      }), n.action ? c.jsx("button", {
        type: "button",
        className: "shrink-0 text-white/80 underline",
        onClick: n.action.onClick,
        children: n.action.label
      }) : null]
    }, n.id))
  });
}

function Yvt({
  visible: e,
  failed: t = !1,
  detail: n,
  actions: r,
  baseVisualReady: a = !1
}) {
  return e ? c.jsx("div", {
    className: `absolute inset-0 z-20 flex items-center justify-center px-6 ${r ? "pointer-events-auto" : "pointer-events-none"} ${a ? "bg-black/55" : "bg-black"}`,
    children: c.jsxs("div", {
      className: "flex w-[min(320px,calc(100vw-48px))] flex-col items-center gap-3 text-center",
      children: [c.jsx("div", {
        className: "min-h-5 text-sm font-medium leading-5 text-white/80",
        children: n
      }), t ? null : c.jsxs("div", {
        className: "relative h-px w-56 overflow-hidden bg-white/10",
        children: [c.jsx("div", {
          className: "absolute inset-y-0 w-16 bg-white/70",
          style: {
            animation: "three-d-indeterminate 1.45s ease-in-out infinite"
          }
        }), c.jsx("style", {
          children: "@keyframes three-d-indeterminate { 0% { transform: translateX(-100%); } 100% { transform: translateX(350%); } }"
        })]
      }), r]
    })
  }) : null;
}

const wat = e => `${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

function UEa(e) {
  return String(_X(e) || (e == null ? void 0 : e.source_url) || "").trim();
}

function $Ea(e) {
  const t = wat("camera"),
    n = wat("shot"),
    r = wat("prop"),
    a = {
      id: t,
      kind: "camera",
      name: "机位 1",
      position: [0, 1.8, 4.8],
      rotation: [0, 0, 0],
      color: "#60a5fa",
      labelColor: "#7c83f7",
      lookAt: [0, 1, 0],
      fov: 45,
      screenshots: [],
      lookAtMode: "coordinate",
      followTargetId: null,
      lookAtTargetId: null
    },
    i = {
      id: r,
      kind: "prop",
      prop: "building",
      name: e.name || "导入模型",
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: "#d8d4cc",
      modelUrl: e.modelUrl
    };
  return {
    version: 1,
    settings: {
      scale: 1,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      skyColor: "#060608",
      showLabels: !0,
      gridSnap: !1,
      gaussianGroundSnap: !0,
      showGround: !0,
      showGrid: !0,
      opacity: .4,
      groundHeight: 0,
      panoramaRotation: 0,
      panoramaRadius: 60,
      referenceOpacity: .5,
      referenceScale: 3,
      referenceRotation: 0,
      referenceInExport: !1,
      ambientIntensity: .58,
      keyIntensity: 1.4,
      fillIntensity: .5,
      keyAzimuth: 39,
      keyElevation: 51,
      exposure: 1,
      ambientColor: "#ffffff",
      keyColor: "#ffffff",
      fillColor: "#a9c2c6",
      lockCameraToView: !0,
      autoKeyframe: !1,
      compositionGuides: "off",
      showMotionPaths: !0,
      showHeightLines: !1,
      showCanvasMask: !0,
      exportAbstractCharacters: !1
    },
    objects: [a, i],
    selectedId: r,
    viewMode: "director",
    aspectRatio: "auto",
    shots: [{
      id: n,
      name: a.name,
      cameraId: t,
      aspectRatio: "auto"
    }],
    activeShotId: n,
    timeline: {
      fps: 24,
      durationSeconds: 15,
      loop: !1,
      interpolation: "linear",
      keyframes: []
    },
    tool: "select"
  };
}

function GEa(e) {
  window.dispatchEvent(new CustomEvent("qiaodoumayi-open-director-3d", {
    detail: {
      nodeId: e
    }
  }));
}

function VEa(e) {
  var o, s, l, d, u, h;
  const t = UEa(e.meta);
  if (!t) throw new Error("没有可导入的 3D 模型");
  const n = ((o = e.source) == null ? void 0 : o.id) || e.sourceNodeId || "",
    r = $Ea({
      modelUrl: t,
      name: e.title || ((s = e.source) == null ? void 0 : s.nodeName) || "导入模型"
    }),
    a = n ? e.nodes.find(p => {
      var m;
      return p.type === "director-3d" && ((m = p.settings) == null ? void 0 : m.threeDSourceNodeId) === n;
    }) : void 0;
  return a ? {
    node: {
      ...a,
      settings: {
        ...(a.settings || {}),
        threeDSourceNodeId: n,
        [Vve]: r
      }
    },
    created: !1
  } : {
    node: Ki(e.generateId(), "director-3d", (((l = e.source) == null ? void 0 : l.x) || 120) + (((d = e.source) == null ? void 0 : d.width) || 375) + 40, ((u = e.source) == null ? void 0 : u.y) || 120, (h = e.source) != null && h.nodeName ? `${e.source.nodeName} 导演台` : "3D导演台", {
      ...(n ? {
        threeDSourceNodeId: n
      } : {}),
      [Vve]: r
    }, e.nodes),
    created: !0
  };
}

const HEa = g.lazy(() => Ie(() => Promise.resolve().then(() => Nzt), void 0, import.meta.url).then(e => ({
    default: e.ThreeDPanoramaPreview
  }))),
  WEa = g.lazy(() => Ie(() => Promise.resolve().then(() => Nzt), void 0, import.meta.url).then(e => ({
    default: e.ThreeDAssetPreview
  }))),
  qEa = g.lazy(() => Ie(() => Promise.resolve().then(() => Nzt), void 0, import.meta.url).then(e => ({
    default: e.ThreeDStudioPreview
  })));

function KEa({
  nodes: e,
  setNodes: t,
  generateId: n,
  notifyCanvas: r
}) {
  const {
      isOpen: a,
      entry: i,
      epoch: o
    } = NEa(),
    s = g.useRef(null),
    [l, d] = g.useState(!1),
    [u, h] = g.useState(!1),
    p = g.useCallback(() => {
      const y = s.current !== null;
      s.current = null, vat(), y && window.history.back();
    }, []);
  g.useEffect(() => {
    if (a && i) {
      d(!0);
      return;
    }
    const y = window.setTimeout(() => {
      d(!1), Ntn();
    }, 250);
    return () => window.clearTimeout(y);
  }, [a, i]), g.useEffect(() => {
    const y = Ptn(window.history.state, window.location.pathname);
    y && (s.current = y, a || nJ(y.entry));
    const b = () => {
      const v = Ptn(window.history.state, window.location.pathname);
      if (v) {
        s.current = v, nJ(v.entry);
        return;
      }
      s.current = null, vat();
    };
    return window.addEventListener("popstate", b), () => window.removeEventListener("popstate", b);
  }, [a]), g.useEffect(() => {
    if (!a || !i) return;
    const y = s.current;
    if (!y) {
      const v = {
        canvasPath: window.location.pathname,
        entry: i,
        sessionId: CEa()
      };
      s.current = v, jEa(v);
      return;
    }
    if (y.entry === i) return;
    const b = {
      ...y,
      entry: i
    };
    s.current = b, DEa(b);
  }, [i, a]), g.useEffect(() => {
    if (!a) return;
    const y = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const b = v => {
      v.key === "Escape" && p();
    };
    return window.addEventListener("keydown", b), () => {
      document.body.style.overflow = y, window.removeEventListener("keydown", b);
    };
  }, [p, a]);
  const m = g.useCallback((y, b, v) => {
      const _ = e.find(C => C.id === (i == null ? void 0 : i.sourceNodeId)),
        w = n(),
        k = ((_ == null ? void 0 : _.x) ?? 120) + ((_ == null ? void 0 : _.width) ?? 375) + 80,
        A = (_ == null ? void 0 : _.y) ?? 120,
        S = Ki(w, "input-image", k, A, `${v} capture`, {
          ratio: b
        }, e);
      S.content = y, t(C => [...C, S]), BNe.success("已添加到画布"), r == null || r("已把截图添加到画布", "success");
    }, [i == null ? void 0 : i.sourceNodeId, n, e, r, t]),
    f = g.useCallback(async () => {
      if (!i || i.kind === "panorama-preview" || u) return;
      const y = i.kind === "studio" ? i.sourceSnapshot : i.sourceMeta,
        b = i.sourceNodeId,
        v = e.find(_ => _.id === b);
      if (y) {
        h(!0);
        try {
          const {
            node: _,
            created: w
          } = VEa({
            nodes: e,
            generateId: n,
            source: v,
            sourceNodeId: b,
            meta: y,
            title: (v == null ? void 0 : v.nodeName) || y.display_name || "导入模型"
          });
          t(k => w ? [...k, _] : k.map(A => A.id === _.id ? _ : A)), vat(), window.setTimeout(() => {
            Ntn(), GEa(_.id);
          }, 160), BNe.success("已导入 3D 导演台"), r == null || r("已把 3D 模型导入导演台", "success");
        } catch (_) {
          const w = _ instanceof Error ? _.message : "导入导演台失败";
          BNe.error(w), r == null || r(w, "error");
        } finally {
          h(!1);
        }
      }
    }, [u, i, n, e, r, t]);
  return !l || !i ? null : c.jsx("div", {
    className: `fixed inset-0 z-[240] transition-opacity duration-200 ${a ? "opacity-100" : "opacity-0"}`,
    "data-three-d-overlay": "",
    children: c.jsx(g.Suspense, {
      fallback: c.jsx(Yvt, {
        visible: !0,
        baseVisualReady: !1,
        detail: "正在加载"
      }),
      children: i.kind === "studio" ? c.jsx(qEa, {
        entry: i,
        onClose: p
      }, `three-d-workspace-${o}`) : i.kind === "panorama-preview" ? c.jsx(HEa, {
        entry: i,
        onClose: p,
        onCapture: m
      }, `panorama-preview-${o}`) : c.jsx(WEa, {
        entry: i,
        onClose: p,
        onCreateStudio: f,
        createStudioPending: u,
        onCapture: m
      }, `three-d-asset-preview-${o}`)
    })
  });
}

function QEa(e) {
  e && nJ(e);
}

const YEa = Object.freeze(Object.defineProperty({
  __proto__: null,
  ThreeDOverlayHost: KEa,
  openThreeDNodePreview: QEa
}, Symbol.toStringTag, {
  value: "Module"
}));

function XEa(e, t) {
  switch (t) {
    case "by-type":
      return ED(e.type);
    case "by-time":
      return new Date().toISOString().split("T")[0];
    case "by-group":
      return "default";
    case "flat":
    default:
      return "all";
  }
}

function cQn(e, t, n, r) {
  const a = {},
    i = new Set();
  if (r.mode === "by-group" && n.length > 0) {
    n.forEach(l => {
      const d = e.filter(h => l.nodeIds.includes(h.id)),
        u = t.filter(h => l.nodeIds.includes(h.from) && l.nodeIds.includes(h.to));
      a[l.name] = {
        nodes: d,
        connections: u,
        nodeIds: l.nodeIds
      }, i.add(l.name);
    });
    const o = new Set(n.flatMap(l => l.nodeIds)),
      s = e.filter(l => !o.has(l.id));
    if (s.length > 0) {
      const l = t.filter(d => !o.has(d.from) && !o.has(d.to));
      a.未分组 = {
        nodes: s,
        connections: l,
        nodeIds: s.map(d => d.id)
      }, i.add("未分组");
    }
  } else e.forEach(o => {
    const s = XEa(o, r.mode);
    i.add(s), a[s] || (a[s] = {
      nodes: [],
      connections: [],
      nodeIds: []
    }), a[s].nodes.push(o), a[s].nodeIds.push(o.id);
  }), i.forEach(o => {
    const s = new Set(a[o].nodeIds);
    a[o].connections = t.filter(l => s.has(l.from) && s.has(l.to));
  });
  return {
    structure: a,
    metadata: {
      mode: r.mode,
      totalNodes: e.length,
      totalConnections: t.length,
      categories: Array.from(i).sort(),
      timestamp: new Date().toISOString()
    }
  };
}

function JEa(e) {
  const t = [];
  return t.push(`📦 分类导出结构 (${e.metadata.mode})`), t.push(`生成时间: ${e.metadata.timestamp}`), t.push(`总节点数: ${e.metadata.totalNodes}`), t.push(`总连接数: ${e.metadata.totalConnections}`), t.push(""), t.push("📁 文件夹结构:"), e.metadata.categories.forEach(n => {
    const r = e.structure[n];
    t.push(`├── ${n}/`), t.push(`│   ├── nodes.json (${r.nodes.length} 个节点)`), t.push(`│   ├── connections.json (${r.connections.length} 个连接)`), t.push("│   └── metadata.json");
  }), t.push(""), t.push("📊 分类详情:"), e.metadata.categories.forEach(n => {
    const r = e.structure[n];
    t.push(`  • ${n}: ${r.nodes.length} 个节点, ${r.connections.length} 个连接`);
  }), t.join(`
`);
}

function ZEa(e) {
  const t = {};
  return e.metadata.categories.forEach(n => {
    const r = e.structure[n];
    t[n] = {
      nodes: r.nodes,
      connections: r.connections,
      metadata: {
        nodeCount: r.nodes.length,
        connectionCount: r.connections.length,
        nodeTypes: [...new Set(r.nodes.map(a => a.type))]
      }
    };
  }), {
    _metadata: e.metadata,
    categories: t
  };
}

function eTa(e, t) {
  if (t.length > 0) return "by-group";
  const n = new Map();
  return e.forEach(r => {
    const a = ED(r.type);
    n.set(a, (n.get(a) || 0) + 1);
  }), n.size > 3, "by-type";
}

const tTa = ({
  nodes: e,
  connections: t,
  groups: n,
  canvasTextBoxes: r = [],
  canvasDoodleStrokes: a = [],
  history: i = [],
  chatSessions: o = [],
  characterLibrary: s = [],
  view: l = {
    x: 0,
    y: 0,
    zoom: 1
  },
  projectName: d = "未命名项目",
  viewportSize: u
}) => {
  const h = g.useCallback((v = "by-type") => cQn(e, t, n, {
      mode: v
    }), [e, t, n]),
    p = g.useCallback((v = "by-type") => {
      const _ = h(v);
      return JEa(_);
    }, [h]),
    m = g.useCallback((v = "by-type") => {
      const _ = h(v);
      return ZEa(_);
    }, [h]),
    f = g.useCallback(() => eTa(e, n), [e, n]),
    y = g.useCallback(async (v = "by-type", _) => {
      try {
        const {
            serializeProjectData: w
          } = await Ie(async () => {
            const {
              serializeProjectData: z
            } = await Promise.resolve().then(() => Tle);
            return {
              serializeProjectData: z
            };
          }, void 0, import.meta.url),
          {
            data: k
          } = await w(e),
          {
            data: A
          } = await w(t),
          {
            data: S
          } = await w(n),
          {
            data: C
          } = await w(i),
          {
            data: I
          } = await w(o),
          {
            data: E
          } = await w(s),
          M = new Date().toISOString().split("T")[0],
          P = _ || `${d}_${M}.json`,
          R = {
            version: "V.3.5.1",
            projectName: d,
            nodes: k,
            connections: A,
            groups: S,
            canvasTextBoxes: r,
            canvasDoodleStrokes: a,
            view: {
              ...l,
              viewportSize: u || {
                width: window.innerWidth,
                height: window.innerHeight
              }
            },
            chatSessions: I,
            characterLibrary: E,
            history: C,
            timestamp: new Date().toISOString()
          },
          {
            sanitizeSensitiveData: j
          } = await Ie(async () => {
            const {
              sanitizeSensitiveData: z
            } = await Promise.resolve().then(() => No);
            return {
              sanitizeSensitiveData: z
            };
          }, void 0, import.meta.url),
          B = j(R),
          F = new Blob([JSON.stringify(B, null, 2)], {
            type: "application/json"
          }),
          N = URL.createObjectURL(F),
          G = document.createElement("a");
        G.href = N, G.download = P, document.body.appendChild(G), G.click(), document.body.removeChild(G), URL.revokeObjectURL(N), console.log("[useCategorizedExport] JSON导出完成:", {
          filename: P,
          nodes: k.length,
          connections: A.length,
          history: C.length
        });
      } catch (w) {
        throw console.error("[useCategorizedExport] JSON导出失败:", w), w;
      }
    }, [e, t, n, r, a, i, o, s, l, d, u]),
    b = g.useCallback((v = "by-type") => {
      const _ = h(v),
        w = {};
      return _.metadata.categories.forEach(k => {
        const A = _.structure[k];
        let S;
        try {
          S = JSON.stringify(A.nodes, null, 2);
        } catch (C) {
          if (C instanceof RangeError && C.message.includes("Invalid string length")) console.warn(`分类 ${k} 数据过大，使用紧凑格式`), S = JSON.stringify(A.nodes);else throw C;
        }
        w[k] = {
          "nodes.json": S,
          "connections.json": JSON.stringify(A.connections, null, 2),
          "metadata.json": JSON.stringify({
            category: k,
            nodeCount: A.nodes.length,
            connectionCount: A.connections.length,
            nodeTypes: [...new Set(A.nodes.map(C => C.type))],
            createdAt: new Date().toISOString()
          }, null, 2)
        };
      }), {
        structure: w,
        metadata: _.metadata
      };
    }, [h]);
  return {
    performCategorizedExport: h,
    getCategoryStructure: p,
    getCategoryExportJSON: m,
    getRecommendedMode: f,
    exportCategorizedJSON: y,
    getCategorizedExportStructure: b
  };
};

function nTa(e, ...t) {
  return [e.replace(/\\/g, "/").replace(/\/+$/, ""), ...t].join("/").replace(/\/+/g, "/");
}

function o6e(e) {
  return !e || typeof e != "string" ? !1 : !!(e.startsWith("/") || /^[a-zA-Z]:[\\/]/.test(e));
}

function Zme(e, t) {
  try {
    const n = btoa(unescape(encodeURIComponent(t))).replace(/[^a-zA-Z0-9]/g, "_");
    return `${e}_${n.slice(0, 48)}`;
  } catch {
    return `${e}_${Date.now()}`;
  }
}

function Dtn(e) {
  if (typeof e != "string") return null;
  const t = "content_ref:";
  return e.startsWith(t) && e.slice(t.length).trim() || null;
}

const xat = !1;

function Ltn(e, t) {
  return t != null && t.startsWith("preview_") || t != null && t.startsWith("thumb_") ? "thumbnail" : e.startsWith("video/") ? "video" : e.startsWith("audio/") ? "audio" : "image";
}

async function _at(e, t, n) {
  try {
    const {
        writeBlobToFile: r
      } = await Ie(async () => {
        const {
          writeBlobToFile: o
        } = await Promise.resolve().then(() => hg);
        return {
          writeBlobToFile: o
        };
      }, void 0, import.meta.url),
      a = e.replace(/[^a-zA-Z0-9_-]/g, "_"),
      i = `${n.replace(/\\/g, "/")}/${a}.bin`;
    return await r(i, t), i;
  } catch (r) {
    return console.warn("[Export] 临时资源写盘失败:", e, r), null;
  }
}

function rTa(e) {
  let t;
  try {
    t = typeof structuredClone == "function" ? structuredClone(e) : JSON.parse(JSON.stringify(e));
  } catch {
    return e;
  }
  const n = (r, a) => {
    if (!(a > 20 || r == null)) {
      if (Array.isArray(r)) {
        for (let i = 0; i < r.length; i++) typeof r[i] == "string" && r[i].startsWith("blob:") ? r[i] = "" : r[i] && typeof r[i] == "object" && n(r[i], a + 1);
        return;
      }
      if (typeof r == "object") {
        const i = r;
        for (const o of Object.keys(i)) {
          const s = i[o];
          typeof s == "string" && s.startsWith("blob:") ? i[o] = "" : s && typeof s == "object" && n(s, a + 1);
        }
      }
    }
  };
  return n(t, 0), t;
}

let aTa = class {
  constructor() {
    On(this, "_cancelled", !1);
  }
  cancel() {
    this._cancelled = !0;
  }
  get isCancelled() {
    return this._cancelled;
  }
  throwIfCancelled() {
    if (this._cancelled) throw new Error("操作已取消");
  }
};

function iTa(e) {
  const t = [],
    n = r => {
      for (let a = 0; a < r.length; a++) {
        a > 0 && t.push(",");
        try {
          t.push(JSON.stringify(r[a]));
        } catch (i) {
          console.error(`序列化数组元素 ${a} 失败:`, i), t.push("null");
        }
      }
    };
  try {
    t.push('{"version":'), t.push(JSON.stringify(e.version ?? "3.0-container")), t.push(',"nodes":['), n(Array.isArray(e.nodes) ? e.nodes : []), t.push("]"), t.push(',"connections":'), t.push(JSON.stringify(e.connections ?? [])), t.push(',"groups":'), t.push(JSON.stringify(e.groups ?? [])), t.push(',"canvasTextBoxes":'), t.push(JSON.stringify(e.canvasTextBoxes ?? [])), t.push(',"canvasDoodleStrokes":'), t.push(JSON.stringify(e.canvasDoodleStrokes ?? [])), t.push(',"view":'), t.push(JSON.stringify(e.view ?? {
      x: 0,
      y: 0,
      zoom: 1
    })), t.push(',"projectName":'), t.push(JSON.stringify(e.projectName ?? "")), t.push(',"history":['), n(Array.isArray(e.history) ? e.history : []), t.push("]"), t.push(',"chatSessions":['), n(Array.isArray(e.chatSessions) ? e.chatSessions : []), t.push("]"), t.push(',"timestamp":'), t.push(JSON.stringify(e.timestamp ?? new Date().toISOString())), e._categorization != null && (t.push(',"_categorization":'), t.push(JSON.stringify(e._categorization))), t.push("}");
  } catch (r) {
    throw console.error("分块序列化失败:", r), new Error("数据序列化失败，请尝试减少画布内容或历史记录");
  }
  return t;
}

const oTa = ({
  nodes: e,
  connections: t,
  groups: n,
  canvasTextBoxes: r = [],
  canvasDoodleStrokes: a = [],
  history: i = [],
  selectedNodeIds: o,
  chatSessions: s = []
}) => {
  const l = g.useRef(null),
    d = g.useCallback(() => {
      l.current && (l.current.cancel(), console.log("[useTauriCategorizedExport] 用户取消导出"));
    }, []);
  return {
    exportToTauriContainer: g.useCallback(async (h, p, m, f) => {
      var b, v, _, w, k, A, S;
      const y = new aTa();
      l.current = y;
      try {
        y.throwIfCancelled(), m == null || m(10, "准备导出数据...");
        let C = null;
        if (f != null && f.exportSelectionOnly && o && o.size > 0) {
          const ke = new Set(e.map(Te => Te.id)),
            ve = new Set();
          o.forEach(Te => {
            ke.has(Te) && ve.add(Te);
          }), ve.size > 0 ? C = ve : console.warn("[Export] 仅导出选中开启，但当前选中节点已失效，自动回退为导出全部画布");
        }
        const I = (C ? e.filter(ke => C.has(ke.id)) : e).map(node => ({ ...node })),
          E = C ? t.filter(ke => C.has(ke.from) && C.has(ke.to)) : t,
          M = C && n.length > 0 ? n.filter(ke => ke.nodeIds.some(ve => C.has(ve))) : n;
        if (C && I.length === 0) throw new Error("当前没有选中任何节点，请先框选或点选要导出的节点");
        console.log(C ? `[Export] 导出范围: 选中 ${I.length} 个节点, ${E.length} 条连线` : `[Export] 导出范围: 全部画布 (${I.length} 个节点, ${E.length} 条连线)`);
        // Cache nested storyboard/director originals on clones before categorization.
        for (const node of I) {
          y.throwIfCancelled();
          await aiyouPersistNestedImages(node);
        }
        const T = cQn(I, E, M, {
          mode: h,
          includeAssets: !0
        });
        y.throwIfCancelled(), m == null || m(30, "正在提取资源文件...");
        const P = {},
          R = new Map(),
          j = (f == null ? void 0 : f.canvasOnly) === !0,
          B = (f == null ? void 0 : f.assetsFilter) ?? "all",
          F = Object.values(T.structure).reduce((ke, ve) => ke + ve.nodes.length, 0),
          N = !j && i && Array.isArray(i) ? i.length : 0,
          G = Math.max(1, N + F);
        let z = 0;
        const V = () => {
          z += 1;
          const ke = 30 + Math.floor(20 * z / G);
          m == null || m(ke, `正在提取资源文件... (${z}/${G})`);
        };
        await Ur.ensureManifestLoaded();
        try {
          await Ur.flushPendingAssets(), await Ur.flushManifest();
        } catch (ke) {
          console.warn("[Export] flush 本地缓存失败（继续导出）:", ke);
        }
        const O = Ur.getDirectoryPathTauri(),
          L = Ur.getManifest(),
          D = (f == null ? void 0 : f.skipChecksum) !== !1;
        let U = null;
        const H = async () => U || (U = await Fr("get_export_temp_dir"), U),
          Y = new Map();
        if (L && L.assets) for (const [ke, ve] of Object.entries(L.assets)) {
          const Te = ve == null ? void 0 : ve.remoteUrl;
          typeof Te == "string" && Te && Y.set(Te, ke);
        }
        const K = new Set(),
          W = ke => {
            typeof ke == "string" && ke.trim() && K.add(ke);
          },
          Q = ke => {
            if (typeof ke != "string" || !ke || !(ke.startsWith("http://") || ke.startsWith("https://"))) return;
            const ve = Y.get(ke);
            ve && W(ve);
          },
          q = ke => {
            if (!(typeof ke != "string" || !ke) && (ke.startsWith("http://") || ke.startsWith("https://"))) return Y.get(ke);
          },
          ne = new Set();
        for (const ke of I) {
          for (const assetId of qX(ke)) W(assetId);
          const ve = ke.settings || {},
            Te = ke._contentAssetId || (ve == null ? void 0 : ve._assetId);
          Te && ne.add(Te), W(ve == null ? void 0 : ve._assetId), W(ke._contentAssetId), W(ke._selectedImageAssetId), W(ke._selectedVideoAssetId), W(ke._thumbnailAssetId);
          const Ne = ke._previewMjAssetIds;
          if (Ne && Ne.forEach(W), ve != null && ve._isStoryboardMosaic) {
            const Ae = ve._stitchedFullUrl,
              Fe = ve._stitchedPreviewUrl,
              Me = Dtn(Ae),
              Re = Dtn(Fe);
            Me && (ne.add(Me), W(Me)), Re && W(Re);
          }
          if (Q(ke.content), typeof ke.content == "string") {
            const Ae = q(ke.content);
            Ae && ne.add(Ae);
          }
          Q(ke.thumbnailUrl), Q(ke.selectedPreviewVideo);
          const me = ke.previewMjVideos;
          Array.isArray(me) && me.forEach(Q);
        }
        if (!j && i && Array.isArray(i)) for (const ke of i) {
          W(ke._assetId), W(ke._audioAssetId), W(ke._mjOriginalAssetId), W(ke._thumbnailAssetId);
          const ve = ke._mjAssetIds;
          ve && ve.forEach(W), Q(ke.url);
          const Te = ke._assetId || q(ke.url);
          Te && ne.add(Te);
        }
        ne.forEach(ke => {
          !ke.startsWith("preview_") && !ke.startsWith("thumb_") && K.add(`preview_${ke}`);
        });
        const de = [];
        if (B !== "none" && O && L) for (const ke of K) {
          const ve = (b = L.assets) == null ? void 0 : b[ke];
          if (!(ve != null && ve.fileName)) continue;
          const Te = o6e(ve.fileName) ? ve.fileName : nTa(O, ve.fileName),
            Ne = ve.mimeType || "",
            me = ke.startsWith("preview_") || ke.startsWith("thumb_") ? "thumbnail" : Ne.startsWith("video/") ? "video" : Ne.startsWith("audio/") ? "audio" : "image";
          de.push({
            assetId: ke,
            fullPath: Te,
            type: me,
            filename: ke
          });
        }
        const le = [];
        if (!xat && B !== "none") {
          for (const ke of I) {
            const ve = ke._localFilePath;
            !(ke._contentAssetId || ((v = ke.settings) == null ? void 0 : v._assetId) || q(ke.content)) && ve && typeof ve == "string" && o6e(ve) && le.push({
              assetId: `localpath_node_${ke.id}`,
              fullPath: ve,
              type: ((_ = ke.settings) == null ? void 0 : _.mediaType) === "video" ? "video" : ((w = ke.settings) == null ? void 0 : w.mediaType) === "audio" ? "audio" : "image",
              filename: `${ke.nodeName || ke.id}_local`
            });
          }
          if (!j && i && Array.isArray(i)) for (const ke of i) {
            const ve = ke.localFilePath;
            !(ke._assetId || q(ke.url)) && ve && typeof ve == "string" && o6e(ve) && le.push({
              assetId: `localpath_hist_${ke.id}`,
              fullPath: ve,
              type: ke.type || "image",
              filename: `history_${ke.id}_local`
            });
          }
        }
        if (le.forEach(ke => de.push(ke)), (!O || !L) && console.warn("[Export] 未检测到资源缓存目录或 manifest，将从 IndexedDB(assetStore)、本机绝对路径与内联 blob/data/http 补齐素材"), de.length > 0) {
          y.throwIfCancelled();
          for (const ke of de) P[ke.assetId] = {
            type: ke.type,
            filename: ke.filename,
            sourcePath: ke.fullPath
          };
          m == null || m(42, `已关联本地缓存 ${de.length} 个文件...`), console.log(`[Export] 本地缓存直拷贝: ${de.length} 个资源`);
        }
        if (!xat && B !== "none") {
          const ke = [...K].filter(Te => !P[Te]);
          if (ke.length > 0) {
            y.throwIfCancelled();
            const Te = Object.keys(P).length;
            m == null || m(38, `正在从 IndexedDB 补齐 ${ke.length} 个资源...`);
            const Ne = await H(),
              me = 8;
            for (let Fe = 0; Fe < ke.length; Fe += me) {
              y.throwIfCancelled();
              const Me = ke.slice(Fe, Fe + me);
              (await Promise.all(Me.map(async $e => {
                const rt = await ni.getAssetBlob($e);
                if (!rt) return null;
                const nt = await _at($e, rt, Ne);
                return nt ? {
                  assetId: $e,
                  sourcePath: nt,
                  type: Ltn(rt.type || "", $e),
                  filename: $e,
                  deleteAfterCopy: !0
                } : null;
              }))).forEach($e => {
                $e && (P[$e.assetId] = {
                  sourcePath: $e.sourcePath,
                  type: $e.type,
                  filename: $e.filename,
                  deleteAfterCopy: !0
                });
              });
            }
            const Ae = Object.keys(P).length - Te;
            Ae > 0 && console.log(`[Export] IDB→临时直写: ${Ae} 个资源（无 Base64）`);
          }
          const ve = async (Te, Ne) => {
            if (!Te || !(Te.startsWith("http://") || Te.startsWith("https://")) || P[Ne]) return;
            const me = await ni.getAssetBlobByRemoteUrl(Te);
            if (!me) return;
            const Ae = await H(),
              Fe = await _at(Ne, me, Ae);
            Fe && (P[Ne] = {
              sourcePath: Fe,
              type: Ltn(me.type || "", Ne),
              filename: Ne,
              deleteAfterCopy: !0
            });
          };
          for (const Te of I) {
            if (((k = Te.settings) == null ? void 0 : k.mediaType) === "video" && typeof Te.content == "string" && (await ve(Te.content, Zme("urlvideo_node", Te.content))), typeof Te.selectedPreviewVideo == "string") {
              const Ae = Te.selectedPreviewVideo;
              await ve(Ae, Zme("urlvideo_sel", Ae));
            }
            const me = Te.previewMjVideos;
            if (Array.isArray(me)) for (const Ae of me) typeof Ae == "string" && (await ve(Ae, Zme("urlvideo_mj", Ae)));
          }
        }
        if (!xat && B !== "none") {
          const ke = async (ve, Te, Ne, me) => {
            if (!(!Te || P[ve]) && (Te.startsWith("data:") || Te.startsWith("blob:"))) {
              try {
                const Fe = await (await fetch(Te)).blob();
                if (!Fe || Fe.size <= 0) return;
                const Me = await H(),
                  Re = await _at(ve, Fe, Me);
                if (Re) {
                  P[ve] = {
                    sourcePath: Re,
                    type: Ne,
                    filename: me,
                    deleteAfterCopy: !0
                  };
                  return;
                }
              } catch (Ae) {
                console.warn("[Export] 内联媒体临时落盘失败:", ve, Ae);
              }
              Te.startsWith("data:") && (P[ve] = {
                data: Te,
                type: Ne,
                filename: me
              });
            }
          };
          for (const ve of I) {
            y.throwIfCancelled();
            const Te = (A = ve.settings) == null ? void 0 : A.mediaType,
              Ne = ve.content,
              me = `inline_node_${ve.id}_content`,
              Ae = Te === "video" ? "video" : Te === "audio" ? "audio" : "image",
              Fe = `${ve.nodeName || ve.id}_content`,
              Me = ve._localFilePath,
              Re = ve._contentAssetId || ((S = ve.settings) == null ? void 0 : S._assetId) || q(Ne);
            typeof Ne == "string" && (Re || Me && o6e(Me) || (Ne.startsWith("data:") || Ne.startsWith("blob:")) && (await ke(me, Ne, Ae, Fe)));
            const $e = ve.thumbnailUrl;
            if (!(ve._thumbnailAssetId || q($e)) && typeof $e == "string") {
              const Le = `inline_node_${ve.id}_thumbnail`,
                Ke = `${ve.nodeName || ve.id}_thumbnail`;
              ($e.startsWith("data:") || $e.startsWith("blob:")) && (await ke(Le, $e, "thumbnail", Ke));
            }
            const nt = ve.selectedPreviewVideo;
            if (typeof nt == "string") {
              const Le = `inline_node_${ve.id}_selectedVideo`,
                Ke = `${ve.nodeName || ve.id}_selectedVideo`;
              !(ve._selectedVideoAssetId || q(nt)) && (nt.startsWith("data:") || nt.startsWith("blob:")) && (await ke(Le, nt, "video", Ke));
            }
            const ze = ve.previewMjVideos || [];
            for (let Le = 0; Le < ze.length; Le++) {
              const Ke = ze[Le];
              if (typeof Ke != "string") continue;
              const Xe = `inline_node_${ve.id}_mjVideo_${Le}`,
                De = `${ve.nodeName || ve.id}_mjVideo_${Le}`;
              !q(Ke) && (Ke.startsWith("data:") || Ke.startsWith("blob:")) && (await ke(Xe, Ke, "video", De));
            }
          }
        }
        const J = [];
        if (B !== "none") {
          if (!j && i && Array.isArray(i)) for (const Te of i) {
            y.throwIfCancelled();
            const Ne = {
                ...Te
              },
              me = Ne._assetId || Ne.id,
              Ae = Ne._thumbnailAssetId || (me ? `preview_${me}` : void 0),
              Fe = `localpath_hist_${Ne.id}`;
            me && P[me] && (Ne.url = `@asset:${me}`, Ne.originalUrl && (Ne.originalUrl = `@asset:${me}`)), Ae && P[Ae] && (Ne.thumbnailUrl = `@asset:${Ae}`), (!Ne.url || Ne.url === "") && P[Fe] && (Ne.url = `@asset:${Fe}`), J.push(Ne), V();
          }
          const ke = Te => typeof Te == "string" && (Te.startsWith("data:") || Te.startsWith("blob:")),
            ve = Te => ke(Te) ? "" : Te;
          for (const Te of J) !Te || typeof Te != "object" || ("url" in Te && (Te.url = ve(Te.url)), "originalUrl" in Te && (Te.originalUrl = ve(Te.originalUrl)), "thumbnailUrl" in Te && (Te.thumbnailUrl = ve(Te.thumbnailUrl)), "videoPosterUrl" in Te && (Te.videoPosterUrl = ve(Te.videoPosterUrl)), "audioUrl" in Te && (Te.audioUrl = ve(Te.audioUrl)), Array.isArray(Te.mjImages) && (Te.mjImages = Te.mjImages.map(Ne => ve(Ne))), Array.isArray(Te.mjThumbnails) && (Te.mjThumbnails = Te.mjThumbnails.map(Ne => ve(Ne))));
          console.log(`[Export] 历史记录项: ${J.length}, 来自历史的资源: ${Object.keys(P).length}`);
          for (const Te of Object.values(T.structure)) for (const Ne of Te.nodes) y.throwIfCancelled(), R.set(Ne.id, Ne), V();
        }
        if (B === "none") for (const ke of Object.keys(P)) delete P[ke];else if (B === "images-only") for (const [ke, ve] of Object.entries(P)) (ve.type === "video" || ve.type === "audio") && delete P[ke];
        {
          const ke = Object.values(P),
            ve = ke.filter(Ne => !!Ne.sourcePath).length,
            Te = ke.filter(Ne => !!Ne.data && !Ne.sourcePath).length;
          console.log(`[Export] 本次导出共 ${ke.length} 个资源 (filter: ${B}), 节点: ${I.length}, sourcePath=${ve}, dataUrl=${Te}, skipChecksum=${D}`);
        }
        y.throwIfCancelled(), m == null || m(50, `已提取 ${Object.keys(P).length} 个资源文件...`);
        const pe = [],
          ce = {};
        Object.entries(T.structure).forEach(([ke, ve]) => {
          const Te = ve.nodes.map(Ne => {
            var Le, Ke, Xe;
            const me = {
                ...Ne
              },
              Ae = Ne._contentAssetId || ((Le = Ne.settings) == null ? void 0 : Le._assetId);
            aiyouCloneNestedMedia(me);
            for (const ref of aiyouNestedImageRefs(me)) {
              const assetId = aiyouNestedMediaAssetId(ref);
              if (assetId && P[assetId]) ref.item[ref.key] = `@asset:${assetId}`;
            }
            Ae && P[Ae] && (me.content = `@asset:${Ae}`);
            const Fe = `localpath_node_${Ne.id}`;
            (!me.content || me.content === "" || typeof me.content == "string" && (me.content.startsWith("blob:") || me.content.startsWith("data:"))) && P[Fe] && (me.content = `@asset:${Fe}`);
            const Me = `inline_node_${Ne.id}_content`;
            if ((!me.content || me.content === "" || typeof me.content == "string" && (me.content.startsWith("blob:") || me.content.startsWith("data:"))) && P[Me] && (me.content = `@asset:${Me}`), typeof me.content == "string" && ((Ke = me.settings) == null ? void 0 : Ke.mediaType) === "video" && (me.content.startsWith("http://") || me.content.startsWith("https://"))) {
              const De = Zme("urlvideo_node", me.content);
              P[De] && (me.content = `@asset:${De}`);
            }
            const Re = Ne._thumbnailAssetId || q(Ne.thumbnailUrl),
              $e = `inline_node_${Ne.id}_thumbnail`,
              rt = Ae && !Ae.startsWith("preview_") && !Ae.startsWith("thumb_") ? `preview_${Ae}` : void 0;
            if (Re && P[Re]) me.thumbnailUrl = `@asset:${Re}`;else if (P[$e]) me.thumbnailUrl = `@asset:${$e}`;else if (rt && P[rt]) me.thumbnailUrl = `@asset:${rt}`;else if (Ae && P[Ae]) me.thumbnailUrl = `@asset:${Ae}`;else if (typeof me.content == "string" && me.content.startsWith("@asset:")) {
              const De = me.content.slice(7);
              De && P[De] && (me.thumbnailUrl = `@asset:${De}`);
            }
            if (Ne.videoPosterUrl && typeof Ne.videoPosterUrl == "string") {
              const De = `${Ne.id}_poster`;
              P[De] && (me.videoPosterUrl = `@asset:${De}`);
            }
            if (me.frames && Array.isArray(me.frames) && (me.frames = me.frames.map((De, Ye) => {
              const Ce = `${Ne.id}_frame_${Ye}`;
              return P[Ce] ? {
                ...De,
                url: `@asset:${Ce}`
              } : De;
            })), me.selectedKeyframes && Array.isArray(me.selectedKeyframes) && (me.selectedKeyframes = me.selectedKeyframes.map((De, Ye) => {
              const Ce = `${Ne.id}_keyframe_${Ye}`;
              return P[Ce] ? {
                ...De,
                url: `@asset:${Ce}`
              } : De;
            })), me.previewMjImages && Array.isArray(me.previewMjImages) && (me.previewMjImages = me.previewMjImages.map((De, Ye) => {
              const Ce = Ne._previewMjAssetIds,
                He = Ce == null ? void 0 : Ce[Ye];
              return He && P[He] ? `@asset:${He}` : De;
            })), me.previewMjVideos && Array.isArray(me.previewMjVideos) && (me.previewMjVideos = me.previewMjVideos.map((De, Ye) => {
              const Ce = `inline_node_${Ne.id}_mjVideo_${Ye}`;
              return P[Ce] ? `@asset:${Ce}` : De;
            })), me.type === "preview") {
              const De = Ne._selectedImageAssetId;
              De && P[De] && (me.selectedPreviewImage = `@asset:${De}`);
              const Ye = Ne._selectedVideoAssetId,
                Ce = `inline_node_${Ne.id}_selectedVideo`;
              if (me.selectedPreviewVideo && (Ye && P[Ye] ? me.selectedPreviewVideo = `@asset:${Ye}` : P[Ce] && (me.selectedPreviewVideo = `@asset:${Ce}`)), typeof me.selectedPreviewVideo == "string" && (me.selectedPreviewVideo.startsWith("http://") || me.selectedPreviewVideo.startsWith("https://"))) {
                const He = me.selectedPreviewVideo,
                  Ve = Zme("urlvideo_sel", He);
                P[Ve] && (me.selectedPreviewVideo = `@asset:${Ve}`);
              }
            }
            if (me.type === "storyboard-node" && me.settings && me.settings.shots && Array.isArray(me.settings.shots)) {
              const De = me.settings.shots;
              for (let Ye = 0; Ye < De.length; Ye++) {
                const Ce = De[Ye];
                if (Ce.image_url && typeof Ce.image_url == "string") {
                  const He = `${Ne.id}_shot_${Ye}_image`;
                  P[He] && (Ce.image_url = `@asset:${He}`);
                }
                if (Ce.image_urls && Array.isArray(Ce.image_urls) && (Ce.image_urls = Ce.image_urls.map((He, Ve) => {
                  const it = `${Ne.id}_shot_${Ye}_image_${Ve}`;
                  return P[it] ? `@asset:${it}` : He;
                })), Ce.startFrame && typeof Ce.startFrame == "string") {
                  const He = `${Ne.id}_shot_${Ye}_startFrame`;
                  P[He] && (Ce.startFrame = `@asset:${He}`);
                }
                if (Ce.endFrame && typeof Ce.endFrame == "string") {
                  const He = `${Ne.id}_shot_${Ye}_endFrame`;
                  P[He] && (Ce.endFrame = `@asset:${He}`);
                }
              }
            }
            if (Ne._localFilePath) {
              const De = `${Ne.id}_content`;
              P[De] && (me.content = `@asset:${De}`);
            }
            const nt = De => typeof De == "string" && (De.startsWith("data:") || De.startsWith("blob:")),
              ze = De => nt(De) ? "" : De;
            return me.content = ze(me.content), me.thumbnailUrl = ze(me.thumbnailUrl), typeof me.videoPosterUrl == "string" && (me.videoPosterUrl = ze(me.videoPosterUrl)), typeof me.selectedPreviewImage == "string" && (me.selectedPreviewImage = ze(me.selectedPreviewImage)), typeof me.selectedPreviewVideo == "string" && (me.selectedPreviewVideo = ze(me.selectedPreviewVideo)), Array.isArray(me.previewMjImages) && (me.previewMjImages = me.previewMjImages.map(De => ze(De))), Array.isArray(me.previewMjVideos) && (me.previewMjVideos = me.previewMjVideos.map(De => ze(De))), Array.isArray(me.frames) && (me.frames = me.frames.map(De => ({
              ...De,
              url: ze(De == null ? void 0 : De.url)
            }))), Array.isArray(me.selectedKeyframes) && (me.selectedKeyframes = me.selectedKeyframes.map(De => ({
              ...De,
              url: ze(De == null ? void 0 : De.url)
            }))), me.type === "storyboard-node" && ((Xe = me.settings) != null && Xe.shots) && Array.isArray(me.settings.shots) && me.settings.shots.forEach(De => {
              typeof De.image_url == "string" && (De.image_url = ze(De.image_url)), Array.isArray(De.image_urls) && (De.image_urls = De.image_urls.map(Ye => ze(Ye))), typeof De.startFrame == "string" && (De.startFrame = ze(De.startFrame)), typeof De.endFrame == "string" && (De.endFrame = ze(De.endFrame)), typeof De.video_url == "string" && (De.video_url = ze(De.video_url));
            }), me.settings && typeof me.settings == "object" && (me.settings = rTa(me.settings)), me;
          });
          pe.push(...Te), ce[ke] = {
            nodeCount: ve.nodes.length,
            connectionCount: ve.connections.length
          };
        }), B === "none" && (pe.forEach(ke => {
          var ve;
          ke.content = "", ke.thumbnailUrl = "", ke.videoPosterUrl = "", ke.frames && Array.isArray(ke.frames) && (ke.frames = ke.frames.map(Te => ({
            ...Te,
            url: ""
          }))), ke.selectedKeyframes && Array.isArray(ke.selectedKeyframes) && (ke.selectedKeyframes = ke.selectedKeyframes.map(Te => ({
            ...Te,
            url: ""
          }))), Array.isArray(ke.previewMjImages) && (ke.previewMjImages = []), ke.type === "storyboard-node" && ((ve = ke.settings) != null && ve.shots) && Array.isArray(ke.settings.shots) && ke.settings.shots.forEach(Te => {
            typeof Te.image_url == "string" && (Te.image_url = ""), Array.isArray(Te.image_urls) && (Te.image_urls = []), typeof Te.startFrame == "string" && (Te.startFrame = ""), typeof Te.endFrame == "string" && (Te.endFrame = "");
          });
        }), J.forEach(ke => {
          ke.url = "", ke.originalUrl = "", ke.thumbnailUrl = "", ke.videoPosterUrl = "", ke.audioUrl = "", ke.mjImages = [], ke.mjThumbnails = [];
        }));
        let we = Array.isArray(s) ? s : [];
        if (!j && B !== "none" && Ur.isAvailable()) try {
          const ke = await Ur.loadChatSessions();
          Array.isArray(ke) && (we = ke);
        } catch (ke) {
          console.warn("[useTauriCategorizedExport] loadChatSessions failed:", ke);
        }
        const X = Array.isArray(we) ? we.map(ke => !ke || typeof ke != "object" ? ke : {
            ...ke,
            mode: ke.mode,
            messages: Array.isArray(ke.messages) ? ke.messages.map(ve => !ve || typeof ve != "object" ? ve : {
              ...ve,
              files: Array.isArray(ve.files) ? ve.files.map(Te => ({
                ...Te,
                content: "",
                url: "",
                type: "",
                isImage: !1,
                isVideo: !1,
                isAudio: !1
              })) : ve.files
            }) : ke.messages
          }) : [],
          Z = {
            nodes: pe,
            connections: E,
            groups: M,
            canvasTextBoxes: r,
            canvasDoodleStrokes: a,
            view: {
              x: 0,
              y: 0,
              zoom: 1
            },
            projectName: p,
            history: J,
            chatSessions: X,
            version: "3.0-container",
            timestamp: new Date().toISOString(),
            _categorization: {
              mode: h,
              categories: ce,
              totalNodes: pe.length,
              totalConnections: E.length,
              totalHistoryItems: J.length,
              totalCanvasTextBoxes: Array.isArray(r) ? r.length : 0,
              totalCanvasDoodleStrokes: Array.isArray(a) ? a.length : 0
            }
          };
        console.log("[Export] 画布批注/涂鸦导出计数:", {
          canvasTextBoxes: Array.isArray(r) ? r.length : 0,
          canvasDoodleStrokes: Array.isArray(a) ? a.length : 0
        }), m == null || m(70, "正在处理敏感数据..."), y.throwIfCancelled();
        const {
            sanitizeSensitiveData: re
          } = await Ie(async () => {
            const {
              sanitizeSensitiveData: ke
            } = await Promise.resolve().then(() => No);
            return {
              sanitizeSensitiveData: ke
            };
          }, void 0, import.meta.url),
          fe = re(Z);
        m == null || m(75, "正在序列化数据...");
        let ye = null,
          ie = null;
        const ae = iTa(fe),
          be = await Fr("get_export_temp_file_path");
        await Fr("write_file_chunked", {
          path: be,
          chunks: ae
        }), ie = be;
        const Ee = Object.entries(P),
          xe = Ee.filter(([, ke]) => !!ke.sourcePath).map(([ke, ve]) => ({
            id: ke,
            path: ve.sourcePath,
            assetType: ve.type,
            filename: ve.filename,
            deleteAfterCopy: !!ve.deleteAfterCopy
          })),
          he = Ee.filter(([, ke]) => !!ke.data && !ke.sourcePath),
          ue = xe.length > 0 || he.length > 0;
        let ge = [...xe],
          _e = [];
        if (he.length > 0) {
          m == null || m(78, `正在整理兼容资源（${he.length} 个）...`);
          const ke = await H(),
            ve = 12,
            {
              writeBlobToFile: Te
            } = await Ie(async () => {
              const {
                writeBlobToFile: Ae
              } = await Promise.resolve().then(() => hg);
              return {
                writeBlobToFile: Ae
              };
            }, void 0, import.meta.url),
            Ne = async Ae => (await fetch(Ae)).blob();
          let me = !0;
          for (let Ae = 0; Ae < he.length; Ae += ve) {
            y.throwIfCancelled();
            const Fe = he.slice(Ae, Ae + ve),
              Me = Fe.map(([rt, nt]) => {
                const ze = rt.replace(/[^a-zA-Z0-9_-]/g, "_");
                return {
                  id: rt,
                  path: `${ke}/${ze}.bin`,
                  assetType: nt.type,
                  filename: nt.filename,
                  deleteAfterCopy: !0
                };
              });
            let Re = !me;
            if (me) try {
              await Promise.all(Fe.map(async ([, rt], nt) => {
                await Te(Me[nt].path, await Ne(rt.data));
              }));
            } catch (rt) {
              console.warn("[Export] 二进制 IPC 写盘失败，回退 base64 批量:", rt), me = !1, Re = !0;
            }
            Re && (await Fr("write_base64_to_files_batch", {
              items: Fe.map(([, rt], nt) => ({
                path: Me[nt].path,
                base64Data: rt.data
              }))
            })), ge.push(...Me);
            const $e = Math.min(Ae + ve, he.length);
            m == null || m(78 + Math.floor($e / he.length * 15), `已整理 ${$e}/${he.length} 个兼容资源...`);
          }
        }
        return m == null || m(D ? 88 : 82, D ? "正在复制资源（跳过校验）..." : "正在复制资源并校验..."), await Fr("export_categorized_project", {
          path: p,
          payloadJson: ye,
          payloadJsonPath: ie,
          assets: _e,
          assetFileRefs: ue ? ge : void 0,
          skipChecksum: D
        }), m == null || m(100, "导出完成！"), {
          success: !0,
          message: "导出成功",
          assetCount: Object.keys(P).length,
          nodeCount: I.length,
          historyCount: J.length
        };
      } catch (C) {
        if (C instanceof Error && C.message === "操作已取消") return console.log("[useTauriCategorizedExport] 导出已取消"), {
          success: !1,
          message: "导出已取消",
          cancelled: !0
        };
        throw console.error("[useTauriCategorizedExport] 导出失败:", C), C;
      } finally {
        l.current = null;
      }
    }, [e, t, n, r, a, i, o, s]),
    cancelExport: d
  };
};

function F_e(e) {
  var n;
  if (!e || typeof e != "object" || !Array.isArray(e.nodes)) throw new Error("JSON 格式错误：项目文件必须包含 nodes 数组");
  const t = new Set();
  for (const r of e.nodes) {
    if (!r || typeof r.id != "string" || !r.id || t.has(r.id)) throw new Error("JSON 格式错误：节点 ID 缺失或重复");
    t.add(r.id);
  }
  for (const r of ["connections", "groups", "canvasTextBoxes", "canvasDoodleStrokes", "history", "chatSessions", "characterLibrary"]) if (e[r] != null && !Array.isArray(e[r])) throw new Error(`JSON 格式错误：${r} 必须为数组`);
  if (e.view != null && !["x", "y", "zoom"].every(r => Number.isFinite(e.view[r]))) throw new Error("JSON 格式错误：画布视口无效");
  if (((n = e.view) == null ? void 0 : n.zoom) <= 0) throw new Error("JSON 格式错误：画布缩放必须大于零");
  if (e.projectName != null && typeof e.projectName != "string") throw new Error("JSON 格式错误：项目名称必须为字符串");
}

async function dQn(e, t) {
  var o, s, l;
  t.assertCurrent(), F_e(e);
  const n = await t.hydrate(e);
  t.assertCurrent(), F_e(n);
  const r = [],
    a = n.nodes.length;
  (o = t.progress) == null || o.call(t, 30, `正在处理 ${a} 个节点...`, "import");
  for (let d = 0; d < a; d++) t.assertCurrent(), r.push(await t.processNode(n.nodes[d], d)), t.assertCurrent(), (d % 10 === 0 || d === a - 1) && ((s = t.progress) == null || s.call(t, 30 + d / a * 40, `处理节点 ${d + 1}/${a}`, "import")), (d + 1) % 20 === 0 && (await t.yieldMain(), t.assertCurrent());
  let i = n.history;
  return i && ((l = t.progress) == null || l.call(t, 87, "正在恢复历史记录素材...", "import"), !t.keepAllHistory(i) && i.length > t.historyLimit && (i = i.slice(0, t.historyLimit)), i = await t.restoreHistory(i), t.assertCurrent()), {
    nodes: r,
    connections: n.connections ?? [],
    groups: n.groups ?? [],
    canvasTextBoxes: n.canvasTextBoxes ?? [],
    canvasDoodleStrokes: n.canvasDoodleStrokes ?? [],
    view: n.view,
    history: i,
    chatSessions: n.chatSessions,
    characterLibrary: n.characterLibrary,
    projectName: n.projectName
  };
}

async function sTa(e, t, n) {
  var s;
  n.assertCurrent(), F_e(e);
  let r = e;
  if (n.hasBase64(e)) {
    (s = n.progress) == null || s.call(n, 85, "正在优化图片数据（Base64 → Blob URL）...");
    try {
      r = (await n.hydrate(e)).data;
    } catch (l) {
      n.assertCurrent(), console.warn("[projectImport] Hydration 失败，保留原始素材:", l);
    }
  }
  n.assertCurrent();
  const a = await n.finalizeNodes(r.nodes ?? e.nodes);
  n.assertCurrent();
  const i = r.history ?? e.history,
    o = {
      nodes: a,
      connections: r.connections ?? e.connections,
      groups: r.groups ?? e.groups,
      history: i.length ? i : void 0,
      canvasTextBoxes: Array.isArray(t.canvasTextBoxes) ? t.canvasTextBoxes : [],
      canvasDoodleStrokes: Array.isArray(t.canvasDoodleStrokes) ? t.canvasDoodleStrokes : [],
      chatSessions: Array.isArray(t.chatSessions) ? t.chatSessions : void 0,
      chatMode: "merge",
      projectName: typeof t.projectName == "string" ? t.projectName : void 0
    };
  return F_e(o), o;
}

function XYe() {
  const e = new Set();
  let t = !1,
    n = !1;
  return {
    create(r) {
      const a = URL.createObjectURL(r);
      return n && !t ? (URL.revokeObjectURL(a), a) : (e.add(a), a);
    },
    adopt() {
      t = !0;
    },
    dispose() {
      if (t || n) {
        n = !0;
        return;
      }
      n = !0;
      for (const r of e) try {
        URL.revokeObjectURL(r);
      } catch {}
      e.clear();
    },
    get size() {
      return e.size;
    },
    get adopted() {
      return t;
    }
  };
}

class rJ extends Error {}

const uQn = "操作已取消";

function FNe(e) {
  return e instanceof rJ || e instanceof Error && e.message === uQn;
}

function EDt(e) {
  let t = 0;
  return {
    cancel() {
      t++;
    },
    begin() {
      const n = ++t;
      let r = e == null ? void 0 : e.lease();
      const a = () => n === t && (!r || r.isCurrent());
      return {
        isCurrent: a,
        assertCurrent() {
          if (!a()) throw new rJ("项目导入已失效");
        },
        adoptCommittedDocument() {
          n === t && (r = e == null ? void 0 : e.lease());
        }
      };
    }
  };
}

function ite(e, ...t) {
  const n = e.includes("\\") ? "\\" : "/";
  return [e.replace(/[\\/]+$/, ""), ...t].join(n);
}

function lTa(e, t) {
  if (e.startsWith("preview_") || e.startsWith("thumb_")) return "thumbnails";
  const n = z4e(t);
  return n.startsWith("video/") ? "videos" : n.startsWith("audio/") ? "audio" : "images";
}

let cTa = class {
  constructor(t) {
    On(this, "_cancelled", !1);
    this.current = t;
  }
  cancel() {
    this._cancelled = !0;
  }
  get isCancelled() {
    return this._cancelled;
  }
  throwIfCancelled() {
    if (this._cancelled || !this.current()) throw new Error(uQn);
  }
};

const dTa = ({
  importDocument: e
}) => {
  const t = g.useMemo(() => EDt(e.session), [e.session]),
    n = g.useRef(null),
    r = g.useRef(null);
  g.useEffect(() => () => {
    var s;
    t.cancel(), (s = r.current) == null || s.dispose();
  }, [t]);
  const a = g.useCallback(() => {
      var s;
      t.cancel(), (s = r.current) == null || s.dispose(), n.current && (n.current.cancel(), console.log("[useTauriCategorizedImport] 用户取消导入"));
    }, [t]),
    i = g.useCallback(async (s, l, d = t.begin()) => {
      var m, f;
      const u = (y, b) => {
        d.isCurrent() && (l == null || l(y, b));
      };
      (m = n.current) == null || m.cancel(), (f = r.current) == null || f.dispose();
      const h = new cTa(d.isCurrent),
        p = XYe();
      n.current = h, r.current = p;
      try {
        h.throwIfCancelled(), u == null || u(10, "正在读取项目文件...");
        const y = await Fr("import_categorized_project", {
          path: s,
          streamAssets: !0,
          skipChecksum: !0
        });
        h.throwIfCancelled(), u == null || u(50, "正在处理资源文件...");
        let b = y.data || y;
        console.log("[Import] 读取到画布批注/涂鸦计数:", {
          canvasTextBoxes: Array.isArray(b.canvasTextBoxes) ? b.canvasTextBoxes.length : 0,
          canvasDoodleStrokes: Array.isArray(b.canvasDoodleStrokes) ? b.canvasDoodleStrokes.length : 0
        });
        const v = y.asset_files,
          _ = 16,
          w = 12;
        if (v && v.length > 0) {
          const R = {},
            j = ite(s, "assets"),
            B = Ur.isAvailable(),
            F = Ur.getDirectoryPathTauri();
          B && (await Ur.ensureManifestLoaded());
          let N = !1;
          if (B && F) try {
            u == null || u(52, `正在将资源直拷入本地缓存（${v.length}）...`);
            const D = [],
              U = [];
            for (const {
              id: H,
              fileName: Y
            } of v) {
              if (h.throwIfCancelled(), Ur.hasAsset(H)) {
                const ne = await Ur.getConvertFileSrcForAsset(H);
                if (ne) {
                  R[H] = ne;
                  continue;
                }
              }
              const K = ite(j, Y),
                W = lTa(H, Y),
                Q = `${W}/${Y}`.replace(/\\/g, "/"),
                q = ite(F, W, Y);
              D.push({
                src: K,
                dest: q
              }), U.push({
                assetId: H,
                relativePath: Q,
                mimeType: z4e(Y),
                absolutePath: q
              });
            }
            if (D.length > 0) for (let Y = 0; Y < D.length; Y += 40) {
              h.throwIfCancelled();
              const K = D.slice(Y, Y + 40);
              await Fr("copy_local_files_batch", {
                items: K
              }), h.throwIfCancelled();
              const W = Math.min(Y + 40, D.length);
              u == null || u(52 + Math.floor(W / D.length * 18), `已直拷资源 ${W}/${D.length}...`);
            }
            for (const H of U) {
              h.throwIfCancelled(), await Ur.registerExistingAsset({
                assetId: H.assetId,
                relativePath: H.relativePath,
                mimeType: H.mimeType,
                size: 0,
                absolutePath: H.absolutePath,
                remoteUrl: `file://import/${encodeURIComponent(H.relativePath)}`
              }, {
                skipFlush: !0
              });
              const Y = await Ur.getConvertFileSrcForAsset(H.assetId);
              Y && (R[H.assetId] = Y);
            }
            await Ur.flushManifest().catch(() => {}), N = Object.keys(R).length > 0, console.log(`[Import] 本地缓存直拷快路径: ${Object.keys(R).length}/${v.length}（跳过 WebView Blob/IDB）`);
          } catch (D) {
            if (FNe(D)) throw D;
            console.warn("[Import] 本地缓存直拷失败，回退 Blob 路径:", D), N = !1;
          }
          const G = v.filter(({
            id: D
          }) => !R[D]);
          if (G.length > 0) {
            u == null || u(70, `正在回退加载 ${G.length} 个资源...`);
            const D = async (U, H) => {
              const Y = ite(j, H);
              try {
                const {
                    readFileAsBlob: K
                  } = await Ie(async () => {
                    const {
                      readFileAsBlob: Q
                    } = await Promise.resolve().then(() => hg);
                    return {
                      readFileAsBlob: Q
                    };
                  }, void 0, import.meta.url),
                  W = await K(Y);
                if (h.throwIfCancelled(), W && W.size > 0) {
                  const Q = U.startsWith("preview_") || U.startsWith("thumb_") ? "thumbnails" : U.startsWith("local_") ? "local" : void 0,
                    q = `file://import/${encodeURIComponent(H)}`;
                  await ni.saveBlobAsset(U, W, q, Q, {
                    silent: !0
                  }), h.throwIfCancelled();
                  const ne = await ni.getAssetUrl(U);
                  if (ne) return {
                    assetId: U,
                    blobUrl: ne
                  };
                  const de = p.create(W);
                  return {
                    assetId: U,
                    blobUrl: de
                  };
                }
              } catch (K) {
                if (FNe(K)) throw K;
                console.warn(`[useTauriCategorizedImport] 读取资源失败 ${U}:`, K);
              }
              return null;
            };
            if (G.length <= _) (await Promise.all(G.map(({
              id: H,
              fileName: Y
            }) => D(H, Y)))).forEach(H => {
              H && (R[H.assetId] = H.blobUrl);
            });else for (let U = 0; U < G.length; U += w) {
              h.throwIfCancelled();
              const H = G.slice(U, U + w);
              (await Promise.all(H.map(({
                id: W,
                fileName: Q
              }) => D(W, Q)))).forEach(W => {
                W && (R[W.assetId] = W.blobUrl);
              });
              const K = Math.min(U + w, G.length);
              u == null || u(70 + Math.floor(K / G.length * 5), `已回退加载 ${K}/${G.length}...`);
            }
          }
          const z = {};
          if (!N) {
            const D = new Set(),
              U = H => {
                if (!H || typeof H != "object") return;
                if (Array.isArray(H)) {
                  H.forEach(U);
                  return;
                }
                const Y = H,
                  K = Y.content ?? Y.url,
                  W = Y.thumbnailUrl;
                if (typeof K == "string" && K.startsWith("@asset:") && typeof W == "string" && W.startsWith("@asset:")) {
                  const Q = K.slice(7),
                    q = W.slice(7);
                  Q === q && R[Q] && D.add(Q);
                }
                for (const Q of Object.values(Y)) U(Q);
              };
            if (b.nodes && U(b.nodes), b.history && U(b.history), b.categories && typeof b.categories == "object" && Object.values(b.categories).forEach(H => (H == null ? void 0 : H.nodes) && U(H.nodes)), D.size > 0) {
              u == null || u(76, `正在生成缩略图（${D.size} 张）...`);
              const H = ite(s, "thumbnails");
              for (const Y of D) {
                h.throwIfCancelled();
                try {
                  const K = R[Y];
                  if (!K) continue;
                  const W = await fetch(K).then(le => le.blob());
                  if (!W.type.startsWith("image/")) continue;
                  const Q = await zCn(W);
                  if (!Q) continue;
                  const q = Y.replace(/[^a-zA-Z0-9_-]/g, "_"),
                    ne = ite(H, `thumb_${q}.jpg`),
                    {
                      writeBlobToFile: de
                    } = await Ie(async () => {
                      const {
                        writeBlobToFile: le
                      } = await Promise.resolve().then(() => hg);
                      return {
                        writeBlobToFile: le
                      };
                    }, void 0, import.meta.url);
                  await de(ne, Q), z[Y] = p.create(Q);
                } catch (K) {
                  console.warn("[useTauriCategorizedImport] 生成缩略图失败:", Y, K);
                }
              }
            }
          }
          const V = (D, U) => {
            if (typeof D == "string" && D.startsWith("@asset:")) {
              const H = D.slice(7);
              return U === "thumbnailUrl" && z[H] ? z[H] : R[H] ?? D;
            }
            if (Array.isArray(D)) return D.map(H => V(H, void 0));
            if (D && typeof D == "object") {
              const H = {};
              for (const [Y, K] of Object.entries(D)) H[Y] = V(K, Y);
              return H;
            }
            return D;
          };
          // Bind portable content tokens before resolving them to display URLs.
          // Project serialization removes display URLs and must retain the real asset id.
          const aiyouBindPortableNode = node => {
            if (!node || typeof node !== "object") return;
            aiyouCloneNestedMedia(node);
            for (const ref of aiyouNestedImageRefs(node)) {
              const value = ref.item[ref.key];
              if (typeof value === "string" && value.startsWith("@asset:") && R[value.slice(7)]) aiyouSetNestedMediaAssetId(ref, value.slice(7));
            }
            const token = typeof node.content === "string" && node.content.startsWith("@asset:") ? node.content.slice(7) : "";
            if (token && R[token]) {
              node._contentAssetId = token;
              const settings = {...node.settings, _contentAssetId: token, _assetId: token, _localCacheAssetId: token};
              if (!R[settings._localPreviewAssetId]) settings._localPreviewAssetId = token;
              node.settings = settings;
            }
            const thumbnail = typeof node.thumbnailUrl === "string" && node.thumbnailUrl.startsWith("@asset:") ? node.thumbnailUrl.slice(7) : "";
            if (thumbnail && R[thumbnail]) node._thumbnailAssetId = thumbnail;
          };
          if (Array.isArray(b.nodes)) b.nodes.forEach(aiyouBindPortableNode);
          if (b.categories && typeof b.categories === "object") for (const category of Object.values(b.categories)) {
            if (Array.isArray(category?.nodes)) category.nodes.forEach(aiyouBindPortableNode);
          }
          b = V(b, void 0);
          const O = D => !D || typeof D != "string" ? null : R[D] ?? null,
            L = D => {
              if (!D || typeof D != "object" || !D.settings || typeof D.settings != "object") return;
              const U = de => {
                  if (typeof de != "string" || !de.startsWith("data:")) return null;
                  try {
                    const le = de.indexOf(",");
                    if (le <= 0) return null;
                    const J = de.slice(5, le),
                      pe = J.split(";")[0] || "application/octet-stream",
                      ce = J.includes(";base64"),
                      we = de.slice(le + 1);
                    let X;
                    if (ce) {
                      const Z = atob(we);
                      X = new Uint8Array(Z.length);
                      for (let re = 0; re < Z.length; re++) X[re] = Z.charCodeAt(re);
                    } else X = new TextEncoder().encode(decodeURIComponent(we));
                    return p.create(new Blob([X], {
                      type: pe
                    }));
                  } catch {
                    return null;
                  }
                },
                H = de => {
                  const le = [de.assetId, de.id].map(ce => typeof ce == "string" ? ce.trim() : "").filter(Boolean);
                  let J = null,
                    pe = null;
                  for (const ce of le) if (J = R[ce] ?? null, !!J) {
                    pe = z[ce] ?? J, (typeof de.assetId != "string" || !de.assetId.trim()) && (de.assetId = ce);
                    break;
                  }
                  return J || (J = U(de.dataUrl) || null, pe = pe || J), J ? (typeof de.url == "string" && de.url.startsWith("blob:") && (de.url = J), typeof de.thumbUrl == "string" && de.thumbUrl.startsWith("blob:") && (de.thumbUrl = pe), typeof de.fullUrl == "string" && de.fullUrl.startsWith("blob:") && (de.fullUrl = J), typeof de.content == "string" && de.content.startsWith("blob:") && (de.content = J), !0) : !1;
                },
                Y = de => {
                  if (typeof de == "string") return de.startsWith("blob:") ? "" : de;
                  if (Array.isArray(de)) {
                    for (let le = 0; le < de.length; le++) de[le] = Y(de[le]);
                    return de;
                  }
                  if (de && typeof de == "object") {
                    const le = de;
                    H(le);
                    for (const J of Object.keys(le)) le[J] = Y(le[J]);
                    return le;
                  }
                  return de;
                };
              D.settings = Y(D.settings);
              const K = D.settings,
                W = K._contentAssetId,
                Q = K._assetId,
                q = K._localCacheAssetId,
                ne = O(typeof W == "string" ? W : null) || O(typeof Q == "string" ? Q : null) || O(typeof q == "string" ? q : null);
              ne && (K._blobUrl = ne);
            };
          if (Array.isArray(b.nodes)) for (const D of b.nodes) L(D);
          if (b.categories && typeof b.categories == "object") for (const D of Object.values(b.categories)) {
            const U = D == null ? void 0 : D.nodes;
            if (Array.isArray(U)) for (const H of U) L(H);
          }
        }
        const k = [],
          A = [],
          S = [],
          C = [];
        b.nodes && Array.isArray(b.nodes) && k.push(...b.nodes), b.connections && Array.isArray(b.connections) && A.push(...b.connections), b.allConnections && Array.isArray(b.allConnections) && A.push(...b.allConnections), b.history && Array.isArray(b.history) && S.push(...b.history), b.groups && Array.isArray(b.groups) && C.push(...b.groups), b.categories && typeof b.categories == "object" && Object.entries(b.categories).forEach(([R, j]) => {
          j.nodes && Array.isArray(j.nodes) && k.push(...j.nodes), j.connections && Array.isArray(j.connections) && A.push(...j.connections);
        }), u == null || u(80, `已导入 ${k.length} 个节点...`), h.throwIfCancelled();
        const I = new Map();
        k.forEach(R => {
          I.has(R.id) || I.set(R.id, R);
        });
        const E = new Set(),
          M = [];
        A.forEach(R => {
          const j = `${R.from}-${R.to}-${R.inputType || "default"}`;
          E.has(j) || (E.add(j), M.push(R));
        });
        const T = {
            nodes: Array.from(I.values()),
            connections: M,
            history: S,
            groups: C
          },
          P = await sTa(T, b, {
            assertCurrent: () => h.throwIfCancelled(),
            hasBase64: L4e,
            hydrate: R => yVe(R, 10, p.create),
            finalizeNodes: async R => {
              try {
                const {
                  applyStableLocalPreviewHints: j
                } = await Ie(async () => {
                  const {
                    applyStableLocalPreviewHints: B
                  } = await Promise.resolve().then(() => dga);
                  return {
                    applyStableLocalPreviewHints: B
                  };
                }, void 0, import.meta.url);
                return await j(R, 8);
              } catch {
                return R;
              }
            },
            progress: u
          });
        return h.throwIfCancelled(), u == null || u(95, "正在更新项目..."), e.commit(P), p.adopt(), d.adoptCommittedDocument(), u == null || u(100, "导入完成！"), console.log("[useTauriCategorizedImport] 导入成功:", {
          nodes: I.size,
          connections: M.length,
          history: S.length,
          groups: C.length
        }), {
          success: !0,
          nodeCount: I.size,
          connectionCount: M.length,
          historyCount: S.length,
          groupCount: C.length
        };
      } catch (y) {
        if (FNe(y)) return console.log("[useTauriCategorizedImport] 导入已取消"), {
          success: !1,
          message: "导入已取消",
          cancelled: !0
        };
        throw console.error("[useTauriCategorizedImport] 导入失败:", y), y;
      } finally {
        p.dispose(), n.current === h && (n.current = null), r.current === p && (r.current = null);
      }
    }, [e, t]),
    o = g.useCallback(async s => {
      const l = t.begin(),
        d = (u, h) => {
          l.isCurrent() && (s == null || s(u, h));
        };
      try {
        const {
          open: u
        } = await Ie(async () => {
          const {
            open: m
          } = await Promise.resolve().then(() => Sb);
          return {
            open: m
          };
        }, void 0, import.meta.url);
        d == null || d(5, "打开文件夹选择器...");
        const h = await u({
          directory: !0,
          multiple: !1,
          title: "选择导出的项目文件夹"
        });
        if (l.assertCurrent(), !h) return console.log("[useTauriCategorizedImport] 用户取消选择"), null;
        const p = Array.isArray(h) ? h[0] : h;
        return p ? (console.log("[useTauriCategorizedImport] 选择的文件夹:", p), await i(p, d, l)) : (console.log("[useTauriCategorizedImport] 无效的文件夹路径"), null);
      } catch (u) {
        if (u instanceof rJ || !l.isCurrent()) return null;
        throw console.error("[useTauriCategorizedImport] 文件夹选择失败:", u), u;
      }
    }, [i, t]);
  return {
    importFromTauriContainer: i,
    importFromTauriFolder: o,
    cancelImport: a
  };
};

async function uTa() {
  let e;
  if (typeof window < "u" && "__TAURI__" in window) {
    const {
        open: t
      } = await Ie(async () => {
        const {
          open: i
        } = await Promise.resolve().then(() => Sb);
        return {
          open: i
        };
      }, void 0, import.meta.url),
      n = await t({
        multiple: !1,
        filters: [{
          name: "JSON",
          extensions: ["json"]
        }],
        title: "选择项目 JSON 文件"
      }),
      r = Array.isArray(n) ? n[0] : n;
    if (!r) return null;
    const {
      readTextFile: a
    } = await Ie(async () => {
      const {
        readTextFile: i
      } = await Promise.resolve().then(() => oc);
      return {
        readTextFile: i
      };
    }, void 0, import.meta.url);
    e = await a(r);
  } else {
    const t = await new Promise(n => {
      const r = document.createElement("input");
      r.type = "file", r.accept = ".json", r.onchange = () => {
        var a;
        return n(((a = r.files) == null ? void 0 : a[0]) ?? null);
      }, r.addEventListener("cancel", () => n(null), {
        once: !0
      }), r.click();
    });
    if (!t) return null;
    e = await t.text();
  }
  try {
    return JSON.parse(e);
  } catch (t) {
    throw new Error("JSON 文件格式错误: " + t.message);
  }
}

function w0(e, t) {
  return n => {
    t() && e(r => t() ? typeof n == "function" ? n(r) : n : r);
  };
}

const hTa = ({
  importDocument: e,
  setCharacterLibrary: t
}) => {
  const n = g.useMemo(() => EDt(e.session), [e.session]),
    r = g.useRef(null);
  return g.useEffect(() => () => {
    var i;
    n.cancel(), (i = r.current) == null || i.dispose();
  }, [n]), {
    importFromJsonFile: g.useCallback(async i => {
      var d, u;
      const o = n.begin();
      (d = r.current) == null || d.dispose();
      const s = XYe();
      r.current = s;
      const l = (h, p) => {
        o.isCurrent() && (i == null || i(h, p));
      };
      try {
        l(5, "打开文件选择器...");
        const h = await uTa();
        if (h === null) return null;
        o.assertCurrent();
        const p = await dQn(h, {
          assertCurrent: o.assertCurrent,
          progress: l,
          hydrate: async m => {
            const {
              containsBase64Media: f,
              hydrateProjectData: y
            } = await Ie(async () => {
              const {
                containsBase64Media: b,
                hydrateProjectData: v
              } = await Promise.resolve().then(() => Tle);
              return {
                containsBase64Media: b,
                hydrateProjectData: v
              };
            }, void 0, import.meta.url);
            return o.assertCurrent(), f(m) ? (await y(m, 10, s.create)).data : m;
          },
          processNode: async m => m,
          restoreHistory: async m => m,
          keepAllHistory: () => !0,
          historyLimit: 1 / 0,
          yieldMain: () => new Promise(m => setTimeout(m, 0))
        });
        return o.assertCurrent(), l(95, "正在提交项目..."), e.commit({
          ...p,
          chatMode: "merge"
        }), s.adopt(), o.adoptCommittedDocument(), p.characterLibrary && t && w0(t, o.isCurrent)(p.characterLibrary), l(100, "导入完成！"), {
          success: !0,
          nodeCount: p.nodes.length,
          connectionCount: p.connections.length,
          historyCount: ((u = p.history) == null ? void 0 : u.length) ?? 0
        };
      } catch (h) {
        if (h instanceof rJ || !o.isCurrent()) return null;
        throw h;
      } finally {
        s.dispose(), r.current === s && (r.current = null);
      }
    }, [e, n, t]),
    cancelJsonImport: g.useCallback(() => {
      var i;
      n.cancel(), (i = r.current) == null || i.dispose();
    }, [n])
  };
};

function pTa(e) {
  let t = 0,
    n;
  const r = () => {
    t++, n !== void 0 && e.cancelTimer(n), n = void 0;
  };
  return {
    async run(a) {
      r();
      const i = t;
      e.loading(!0);
      const o = () => t === i;
      try {
        const s = await a((l, d) => {
          o() && e.progress(l, d);
        });
        if (!o()) return;
        if (!(s != null && s.success)) {
          e.progress(0, (s == null ? void 0 : s.message) ?? "导入已取消");
          return;
        }
        e.progress(100, "导入完成！"), n = e.schedule(() => {
          o() && (n = void 0, e.close());
        }, 1e3);
      } catch (s) {
        if (!o()) return;
        e.progress(0, s instanceof Error && s.message === "操作已取消" ? "导入已取消" : `导入失败: ${s}`);
      } finally {
        o() && e.loading(!1);
      }
    },
    cancel() {
      r(), e.cancelWork(), e.progress(0, "导入已取消"), e.loading(!1);
    },
    dispose() {
      r(), e.cancelWork();
    }
  };
}

function mTa(e) {
  const t = g.useRef(e);
  g.useLayoutEffect(() => {
    t.current = e;
  });
  const [n] = g.useState(() => pTa({
    loading: r => t.current.loading(r),
    progress: (r, a) => t.current.progress(r, a),
    close: () => t.current.close(),
    cancelWork: () => t.current.cancelWork(),
    schedule: (r, a) => setTimeout(r, a),
    cancelTimer: r => clearTimeout(r)
  }));
  return g.useEffect(() => () => n.dispose(), [n]), n;
}

const fTa = [{
    id: "folder",
    icon: Sc,
    title: "文件夹导出",
    desc: "画布+历史记录"
  }, {
    id: "canvas",
    icon: ZHe,
    title: "导出当前画布内容",
    desc: "工作流+图片/视频/音频，不含历史"
  }, {
    id: "canvas-images",
    icon: lo,
    title: "仅工作流+图片",
    desc: "不含视频/音频，体积更小",
    recommended: !0
  }, {
    id: "canvas-structure",
    icon: eWe,
    title: "仅工作流节点",
    desc: "仅结构，体积最小、导入最快"
  }],
  gTa = ({
    importDocument: e,
    isOpen: t,
    onClose: n,
    isDark: r = !0,
    nodes: a,
    connections: i,
    groups: o,
    canvasTextBoxes: s = [],
    canvasDoodleStrokes: l = [],
    projectName: d,
    history: u = [],
    selectedNodeIds: h,
    chatSessions: p = [],
    characterLibrary: m = [],
    view: f,
    viewportSize: y,
    setNodes: b,
    setConnections: v,
    setHistory: _,
    setChatSessions: w,
    setCharacterLibrary: k,
    setGroups: A,
    setView: S,
    setProjectName: C,
    setCanvasTextBoxes: I,
    setCanvasDoodleStrokes: E
  }) => {
    on();
    const [M, T] = g.useState(d),
      [P, R] = g.useState("canvas-images"),
      [j, B] = g.useState(!1),
      [F, N] = g.useState("folder"),
      [G, z] = g.useState("export"),
      [V, O] = g.useState(!1),
      [L, D] = g.useState({
        percent: 0,
        message: ""
      });
    g.useEffect(() => {
      T(d);
    }, [d]), g.useEffect(() => {
      t && (!h || h.size === 0) && B(!1);
    }, [t, h]);
    const {
        exportCategorizedJSON: U
      } = tTa({
        nodes: a,
        connections: i,
        groups: o,
        canvasTextBoxes: s,
        canvasDoodleStrokes: l,
        history: u,
        chatSessions: p,
        characterLibrary: m,
        view: f,
        projectName: d,
        viewportSize: y
      }),
      {
        exportToTauriContainer: H,
        cancelExport: Y
      } = oTa({
        nodes: a,
        connections: i,
        groups: o,
        canvasTextBoxes: s,
        canvasDoodleStrokes: l,
        history: u,
        chatSessions: p,
        selectedNodeIds: h
      }),
      {
        importFromTauriFolder: K,
        cancelImport: W
      } = dTa({
        importDocument: e
      }),
      {
        importFromJsonFile: Q,
        cancelJsonImport: q
      } = hTa({
        importDocument: e,
        setCharacterLibrary: k
      }),
      ne = async () => {
        if (!M.trim()) {
          alert(x("请输入项目名称"));
          return;
        }
        O(!0);
        try {
          D({
            percent: 10,
            message: "正在准备导出..."
          }), await U("by-type", `${M}.json`), D({
            percent: 100,
            message: "导出完成！"
          }), setTimeout(() => {
            n();
          }, 1e3);
        } catch (we) {
          console.error("JSON导出失败:", we), we instanceof Error && we.message === "操作已取消" ? D({
            percent: 0,
            message: "导出已取消"
          }) : D({
            percent: 0,
            message: `导出失败: ${we}`
          });
        } finally {
          O(!1);
        }
      },
      de = async () => {
        if (!M.trim()) {
          alert(x("请输入项目名称"));
          return;
        }
        O(!0);
        try {
          const {
              open: we
            } = await Ie(async () => {
              const {
                open: ae
              } = await Promise.resolve().then(() => Sb);
              return {
                open: ae
              };
            }, void 0, import.meta.url),
            X = await we({
              directory: !0,
              multiple: !1,
              title: "选择导出位置"
            });
          if (!X) {
            O(!1);
            return;
          }
          const Z = Array.isArray(X) ? X[0] : X;
          if (!Z) {
            O(!1);
            return;
          }
          const re = `${Z}/${M}`,
            fe = P === "canvas" || P === "canvas-images" || P === "canvas-structure",
            ye = P === "canvas-structure" ? "none" : P === "canvas-images" ? "images-only" : "all",
            ie = !!(j && h && h.size > 0);
          await H("by-type", re, (ae, be) => D({
            percent: ae,
            message: be
          }), {
            canvasOnly: fe,
            assetsFilter: ye,
            exportSelectionOnly: ie,
            skipChecksum: !0
          }), D({
            percent: 100,
            message: "导出完成！"
          }), setTimeout(() => {
            n();
          }, 1e3);
        } catch (we) {
          console.error("导出失败:", we), we instanceof Error && we.message === "操作已取消" ? D({
            percent: 0,
            message: "导出已取消"
          }) : D({
            percent: 0,
            message: `导出失败: ${we}`
          });
        } finally {
          O(!1);
        }
      },
      le = mTa({
        loading: O,
        progress: (we, X) => D({
          percent: we,
          message: X
        }),
        close: n,
        cancelWork: () => {
          W(), q();
        }
      }),
      J = () => le.run(F === "folder" ? K : Q),
      pe = () => {
        G === "export" ? (Y(), D({
          percent: 0,
          message: "导出已取消"
        }), O(!1)) : le.cancel();
      };
    if (!t) return null;
    const ce = ["canvas", "canvas-images", "canvas-structure"].includes(P) ? "不导出" : String(u.length);
    return c.jsx("div", {
      className: "project-io-overlay",
      children: c.jsxs("div", {
        className: `project-io-modal sketch-border-clean sketch-inset-outline ${r ? "project-io-modal-dark" : ""}`,
        children: [c.jsxs("aside", {
          className: "project-io-sidebar",
          "aria-hidden": "true",
          children: [c.jsx("div", {
            className: "project-io-sidebar-top",
            children: G === "export" ? c.jsx(ws, {
              size: 22,
              strokeWidth: 1.6
            }) : c.jsx(ml, {
              size: 22,
              strokeWidth: 1.6
            })
          }), c.jsxs("div", {
            className: "project-io-sidebar-line",
            children: [c.jsx("span", {
              className: "project-io-sidebar-line-bar"
            }), c.jsx("span", {
              className: "project-io-sidebar-line-dot"
            }), c.jsx("span", {
              className: "project-io-sidebar-line-bar"
            })]
          }), c.jsx("div", {
            className: "project-io-sidebar-bottom",
            children: c.jsx(IP, {
              size: 16,
              strokeWidth: 1.6
            })
          })]
        }), c.jsxs("div", {
          className: "project-io-content",
          children: [c.jsxs("header", {
            className: "project-io-header",
            children: [c.jsxs("div", {
              className: "project-io-header-text",
              children: [c.jsx("h2", {
                className: "project-io-title",
                children: x("导出/导入项目")
              }), c.jsx("p", {
                className: "project-io-subtitle",
                children: x(G === "export" ? "将项目内容导出为文件，便于备份或分享" : "将导出文件导入到当前空间，继续您的创作")
              })]
            }), c.jsx("button", {
              type: "button",
              onClick: n,
              disabled: V,
              className: "project-io-close",
              "aria-label": x("关闭"),
              children: c.jsx(Na, {
                size: 18,
                strokeWidth: 1.6
              })
            })]
          }), c.jsxs("div", {
            className: "project-io-tabs",
            children: [c.jsx("button", {
              type: "button",
              onClick: () => {
                z("export"), D({
                  percent: 0,
                  message: ""
                });
              },
              disabled: V,
              className: `project-io-tab ${G === "export" ? "project-io-tab-active" : ""}`,
              children: x("导出")
            }), c.jsx("button", {
              type: "button",
              onClick: () => {
                z("import"), D({
                  percent: 0,
                  message: ""
                });
              },
              disabled: V,
              className: `project-io-tab ${G === "import" ? "project-io-tab-active" : ""}`,
              children: x("导入")
            })]
          }), G === "import" && !V && L.message && c.jsx("div", {
            className: "project-io-progress",
            role: "status",
            children: L.message
          }), V && c.jsxs("div", {
            className: "project-io-progress",
            children: [c.jsxs("div", {
              className: "project-io-progress-row",
              children: [c.jsx(zet, {
                size: 15,
                className: "animate-spin",
                style: {
                  color: "rgba(185, 133, 53, 0.85)"
                }
              }), c.jsx("span", {
                className: "project-io-progress-msg",
                children: L.message
              }), c.jsx("button", {
                type: "button",
                onClick: pe,
                className: "project-io-progress-cancel",
                title: x("取消操作"),
                children: x("取消")
              })]
            }), c.jsx("div", {
              className: "project-io-progress-track",
              children: c.jsx("div", {
                className: "project-io-progress-fill",
                style: {
                  width: `${L.percent}%`
                }
              })
            })]
          }), c.jsx("div", {
            className: "project-io-body minimal-scrollbar",
            children: G === "export" ? c.jsxs(c.Fragment, {
              children: [c.jsxs("div", {
                className: "project-io-field",
                children: [c.jsx("label", {
                  className: "project-io-field-label",
                  htmlFor: "project-io-export-name",
                  children: x("项目名称")
                }), c.jsxs("div", {
                  className: "project-io-field-input-wrap",
                  children: [c.jsx("input", {
                    id: "project-io-export-name",
                    type: "text",
                    value: M,
                    onChange: we => T(we.target.value),
                    disabled: V,
                    placeholder: x("输入导出项目的名称"),
                    className: "project-io-field-input"
                  }), c.jsx(nw, {
                    size: 14,
                    className: "project-io-field-input-icon",
                    strokeWidth: 1.6
                  })]
                })]
              }), c.jsxs("div", {
                className: "project-io-field",
                children: [c.jsx("span", {
                  className: "project-io-field-label",
                  children: x("导出方式")
                }), c.jsx("div", {
                  className: "project-io-option-grid",
                  children: fTa.map(we => {
                    const X = we.icon,
                      Z = P === we.id;
                    return c.jsxs("button", {
                      type: "button",
                      onClick: () => R(we.id),
                      disabled: V,
                      className: `project-io-option-card ${Z ? "project-io-option-card-selected" : ""}`,
                      children: [c.jsx("span", {
                        className: "project-io-option-card-icon",
                        children: c.jsx(X, {
                          size: 16,
                          strokeWidth: 1.6
                        })
                      }), c.jsxs("span", {
                        className: "project-io-option-card-body",
                        children: [c.jsxs("span", {
                          className: "project-io-option-card-title",
                          children: [we.title, we.recommended && c.jsx("span", {
                            className: "project-io-option-card-badge",
                            children: x("推荐")
                          })]
                        }), c.jsx("span", {
                          className: "project-io-option-card-desc",
                          children: we.desc
                        })]
                      }), c.jsx("span", {
                        className: "project-io-option-card-check",
                        children: c.jsx(io, {
                          size: 10,
                          strokeWidth: 2.5
                        })
                      })]
                    }, we.id);
                  })
                })]
              }), c.jsxs("div", {
                className: "project-io-stats",
                children: [c.jsxs("span", {
                  className: "project-io-stat",
                  children: [c.jsx(Hm, {
                    size: 13,
                    className: "project-io-stat-icon",
                    strokeWidth: 1.6
                  }), c.jsx("span", {
                    className: "project-io-stat-value",
                    children: a.length
                  }), c.jsx("span", {
                    children: x("节点")
                  })]
                }), c.jsxs("span", {
                  className: "project-io-stat",
                  children: [c.jsx(_U, {
                    size: 13,
                    className: "project-io-stat-icon",
                    strokeWidth: 1.6
                  }), c.jsx("span", {
                    className: "project-io-stat-value",
                    children: Array.isArray(s) ? s.length : 0
                  }), c.jsx("span", {
                    children: x("文本批注")
                  })]
                }), c.jsxs("span", {
                  className: "project-io-stat",
                  children: [c.jsx(Vue, {
                    size: 13,
                    className: "project-io-stat-icon",
                    strokeWidth: 1.6
                  }), c.jsx("span", {
                    className: "project-io-stat-value",
                    children: Array.isArray(l) ? l.length : 0
                  }), c.jsx("span", {
                    children: x("涂鸦笔迹")
                  })]
                }), c.jsxs("span", {
                  className: "project-io-stat",
                  children: [c.jsx(AP, {
                    size: 13,
                    className: "project-io-stat-icon",
                    strokeWidth: 1.6
                  }), c.jsx("span", {
                    className: "project-io-stat-value",
                    children: ce
                  }), c.jsx("span", {
                    children: x("历史")
                  })]
                }), c.jsxs("span", {
                  className: "project-io-stat",
                  children: [c.jsx(qv, {
                    size: 13,
                    className: "project-io-stat-icon",
                    strokeWidth: 1.6
                  }), c.jsx("span", {
                    className: "project-io-stat-value",
                    children: Array.isArray(p) ? p.length : 0
                  }), c.jsx("span", {
                    children: x("聊天")
                  })]
                }), h && h.size > 0 && c.jsxs("label", {
                  className: "project-io-stat-selection",
                  children: [c.jsx("input", {
                    type: "checkbox",
                    checked: j,
                    onChange: we => B(we.target.checked),
                    disabled: V
                  }), c.jsxs("span", {
                    children: [x("仅导出选中的 "), h.size, x(" 个节点")]
                  })]
                })]
              })]
            }) : c.jsxs(c.Fragment, {
              children: [c.jsxs("div", {
                className: "project-io-field",
                children: [c.jsx("span", {
                  className: "project-io-field-label",
                  children: x("导入方式")
                }), c.jsxs("button", {
                  type: "button",
                  onClick: () => N("folder"),
                  disabled: V,
                  className: `project-io-import-card ${F === "folder" ? "project-io-import-card-selected" : ""}`,
                  children: [c.jsx("span", {
                    className: "project-io-option-card-icon",
                    children: c.jsx(Sc, {
                      size: 16,
                      strokeWidth: 1.6
                    })
                  }), c.jsxs("span", {
                    className: "project-io-option-card-body",
                    children: [c.jsx("span", {
                      className: "project-io-option-card-title",
                      children: x("文件夹导入")
                    }), c.jsx("span", {
                      className: "project-io-option-card-desc",
                      children: x("导入导出的项目文件夹")
                    })]
                  }), c.jsx(ss, {
                    size: 16,
                    className: "project-io-import-card-arrow",
                    strokeWidth: 1.6
                  })]
                })]
              }), c.jsxs("button", {
                type: "button",
                onClick: J,
                disabled: V,
                className: "project-io-dropzone",
                children: [c.jsx(Sc, {
                  size: 28,
                  className: "project-io-dropzone-icon",
                  strokeWidth: 1.4
                }), c.jsx("span", {
                  className: "project-io-dropzone-title",
                  children: x("拖拽文件夹到此处，或点击选择")
                }), c.jsx("span", {
                  className: "project-io-dropzone-hint",
                  children: x("支持导出的项目文件夹")
                })]
              }), c.jsxs("div", {
                className: "project-io-alert",
                children: [c.jsx(c3, {
                  size: 15,
                  className: "project-io-alert-icon",
                  strokeWidth: 1.6
                }), c.jsx("span", {
                  children: x("导入将覆盖同名内容，请确保已备份重要数据")
                })]
              })]
            })
          }), c.jsxs("footer", {
            className: "project-io-footer",
            children: [c.jsx("button", {
              type: "button",
              onClick: n,
              disabled: V,
              className: "project-io-secondary-button",
              children: x("取消")
            }), G === "export" ? c.jsx("button", {
              type: "button",
              onClick: P === "json" ? ne : de,
              disabled: V,
              className: "project-io-primary-button",
              children: V ? c.jsxs(c.Fragment, {
                children: [c.jsx(zet, {
                  size: 16,
                  className: "animate-spin"
                }), x("导出中...")]
              }) : c.jsxs(c.Fragment, {
                children: [c.jsx(ws, {
                  size: 16,
                  strokeWidth: 1.6
                }), x("导出项目")]
              })
            }) : c.jsx("button", {
              type: "button",
              onClick: J,
              disabled: V,
              className: "project-io-primary-button",
              children: V ? c.jsxs(c.Fragment, {
                children: [c.jsx(zet, {
                  size: 16,
                  className: "animate-spin"
                }), x("导入中...")]
              }) : c.jsxs(c.Fragment, {
                children: [c.jsx(ml, {
                  size: 16,
                  strokeWidth: 1.6
                }), x("导入项目")]
              })
            })]
          })]
        })]
      })
    });
  },
  yTa = Object.freeze(Object.defineProperty({
    __proto__: null,
    CategorizedExportModal: gTa
  }, Symbol.toStringTag, {
    value: "Module"
  }));

function hQn(e) {
  const [t, n] = g.useState(() => lY()),
    [r, a] = g.useState(null),
    i = g.useCallback(s => {
      n(l => {
        const d = {
          ...l,
          ...s
        };
        return queueMicrotask(() => xCr(d)), d;
      });
    }, []),
    o = g.useCallback(async () => {
      const s = await ICr(t);
      a(s);
    }, [t]);
  return g.useEffect(() => {
    const s = () => n(lY());
    return window.addEventListener(Ght, s), () => window.removeEventListener(Ght, s);
  }, []), g.useEffect(() => {}, [e == null ? void 0 : e.refreshDiagnostics, t, o]), {
    huyaCorporateProxy: t,
    huyaProxyDiagnostics: r,
    updateHuyaCorporateProxy: i,
    refreshHuyaProxyDiagnostics: o
  };
}

const bTa = ({
  isDark: e,
  config: t,
  diagnostics: n,
  onChange: r,
  variant: a,
  settingsStyle: i
}) => {
  on();
  const o = a === "settings",
    s = o ? c.jsxs("p", {
      className: `${(i == null ? void 0 : i.hint) ?? ""} mb-3`,
      children: [x("公司内网一般应"), c.jsx("strong", {
        className: "font-normal",
        children: x("直连")
      }), x(" art.huya.info；若系统/VPN 代理指向本机（如 127.0.0.1:7897），OpenAPI 常被网关 403。桌面端已自动跳过本机代理并回退直连。")]
    }) : c.jsxs("p", {
      className: "text-xs text-gray-400",
      children: [x("公司内网一般应"), c.jsx("strong", {
        className: "font-normal",
        children: x("直连")
      }), x(" art.huya.info；若系统/VPN 代理指向本机（如 127.0.0.1:7897），OpenAPI 常被网关 403。")]
    }),
    l = `flex items-center ${o ? "gap-3" : "gap-2 flex-wrap"}`,
    d = o ? `${(i == null ? void 0 : i.fieldLabel) ?? ""} shrink-0` : `text-xs shrink-0 ${e ? "text-gray-300" : "text-gray-600"}`,
    u = o ? `${(i == null ? void 0 : i.inp) ?? ""} flex-1 min-w-0` : `flex-1 min-w-0 px-2 py-1 text-xs rounded border ${e ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`,
    h = o ? `sketch-button sketch-button-xs${(i == null ? void 0 : i.btnDark) ?? ""} shrink-0` : `shrink-0 px-2 py-1 text-xs rounded border transition-colors ${e ? "border-gray-600 text-gray-300 hover:bg-gray-600 disabled:opacity-40" : "border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40"}`,
    p = o ? "flex flex-wrap gap-x-4 gap-y-1.5" : "space-y-1.5",
    m = o ? `flex items-center gap-1.5 text-[10px] cursor-pointer select-none ${e ? "text-zinc-400" : "text-zinc-500"}` : `flex items-center gap-1.5 text-xs cursor-pointer select-none ${e ? "text-gray-400" : "text-gray-500"}`,
    f = o ? (i == null ? void 0 : i.checkbox) ?? "" : "rounded",
    y = o ? `text-[10px] ${e ? "text-zinc-500" : "text-zinc-400"}` : `text-xs ${e ? "text-gray-500" : "text-gray-400"}`;
  return c.jsxs("div", {
    className: o ? "space-y-2" : "space-y-2.5",
    children: [s, c.jsxs("div", {
      className: l,
      children: [c.jsx("label", {
        className: d,
        children: x("HTTP 代理")
      }), c.jsx("input", {
        type: "text",
        value: t.proxyUrl,
        onChange: b => r({
          proxyUrl: b.target.value
        }),
        placeholder: x("留空=优先直连；在家办公可填公司代理 http://proxy:8080"),
        className: u
      }), us() && c.jsx("button", {
        type: "button",
        className: h,
        onClick: () => {
          const b = SCr(n == null ? void 0 : n.windowsProxyServer);
          b && r({
            proxyUrl: b
          });
        },
        disabled: !(n != null && n.windowsProxyServer),
        children: x("从系统填充")
      })]
    }), c.jsx("div", {
      className: p,
      children: c.jsxs("label", {
        className: m,
        children: [c.jsx("input", {
          type: "checkbox",
          checked: t.useEnvProxy,
          onChange: b => r({
            useEnvProxy: b.target.checked
          }),
          className: f
        }), x("读取 HTTPS_PROXY / Windows 系统代理（本机 127.0.0.1 代理会自动跳过）")]
      })
    }), n != null && n.hint ? c.jsxs("p", {
      className: y,
      children: [n.hint, n.effectiveProxyUrl ? x(" 当前生效：{0}", n.effectiveProxyUrl) : x(" 当前：直连")]
    }) : null]
  });
};

function vTa({
  onClose: e
}) {
  const [t, n] = g.useState(!1),
    [r, a] = g.useState(""),
    i = ch();
  g.useEffect(() => {
    const s = l => {
      l.key === "Escape" && !t && (l.stopPropagation(), e());
    };
    return window.addEventListener("keydown", s), () => window.removeEventListener("keydown", s);
  }, [t, e]);
  const o = async () => {
    if (!t) {
      n(!0), a("");
      try {
        await hZr();
      } catch (s) {
        a(s instanceof Error ? s.message : "切换失败，当前内容已保留。"), n(!1);
      }
    }
  };
  return c.jsxs("div", {
    className: "space-y-4",
    children: [c.jsxs("div", {
      className: "flex items-center justify-between gap-4",
      children: [c.jsxs("div", {
        children: [c.jsx("h4", {
          className: "font-semibold",
          children: "教学"
        }), c.jsx("p", {
          className: "mt-1 text-sm opacity-70",
          children: i ? "已开启 · 只显示教学内容" : "已关闭 · 显示全部内容"
        })]
      }), c.jsx("button", {
        autoFocus: !0,
        type: "button",
        role: "switch",
        "aria-label": "教学",
        "aria-checked": i,
        disabled: t,
        onClick: () => void o(),
        className: `relative inline-flex h-6 w-11 shrink-0 items-center rounded-full disabled:opacity-50 ${i ? "bg-blue-500" : "bg-gray-500"}`,
        children: c.jsx("span", {
          className: `inline-block h-4 w-4 rounded-full bg-white transition-transform ${i ? "translate-x-6" : "translate-x-1"}`
        })
      })]
    }), c.jsx("p", {
      className: "text-sm opacity-70",
      children: "开启后隐藏原有项目、对话与生成记录，方便录屏。教学内容照常保存；关闭后全部显示，保留原有时间顺序。"
    }), c.jsx("p", {
      className: "text-xs opacity-60",
      children: "切换时会保存当前内容并刷新界面。再次开启可继续之前的教学内容。"
    }), t && c.jsx("p", {
      role: "status",
      className: "text-sm",
      children: "正在保存并切换…"
    }), r && c.jsx("p", {
      role: "alert",
      className: "text-sm text-red-500",
      children: r
    }), c.jsx("div", {
      className: "flex justify-end",
      children: c.jsx("button", {
        type: "button",
        disabled: t,
        onClick: e,
        className: "rounded-lg bg-blue-500 px-6 py-2 text-white disabled:opacity-50",
        children: "关闭面板"
      })
    })]
  });
}

const wTa = ({
    isOpen: e,
    onClose: t,
    isDark: n,
    onAuthenticate: r,
    authMode: a,
    huyaModelsHidden: i,
    onToggleHuyaModels: o
  }) => {
    on();
    const [s, l] = g.useState(!1),
      [d, u] = g.useState(""),
      [h, p] = g.useState(""),
      m = Ia.useRef(null),
      {
        huyaCorporateProxy: f,
        huyaProxyDiagnostics: y,
        updateHuyaCorporateProxy: b,
        refreshHuyaProxyDiagnostics: v
      } = hQn();
    g.useEffect(() => {
      !e || !s || a !== "huyaOnly" || !us() || v();
    }, [e, s, a, v]), g.useEffect(() => {
      e && (l(!1), u(""), p(""));
    }, [e]);
    const _ = g.useCallback(k => {
        var S;
        k.preventDefault();
        const A = ((S = m.current) == null ? void 0 : S.value) ?? d;
        r(A) ? (l(!0), u(""), p("")) : (p("密码错误"), u(""));
      }, [d, r]),
      w = g.useCallback(() => {
        u(""), p(""), l(!1), t();
      }, [t]);
    return e ? c.jsx("div", {
      className: "fixed inset-0 z-[10000] flex items-center justify-center bg-black/60",
      children: c.jsxs("div", {
        className: `
        w-[540px] max-w-[calc(100vw-32px)] max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl
        ${n ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
      `,
        children: [c.jsx("div", {
          className: `
          px-6 py-4 border-b
          ${n ? "border-gray-700" : "border-gray-200"}
        `,
          children: c.jsx("h3", {
            className: "text-lg font-semibold",
            children: x("功能控制面板")
          })
        }), c.jsx("div", {
          className: "p-6",
          children: s ? a === "teachingOnly" ? c.jsx(vTa, {
            onClose: w
          }) : a === "huyaOnly" ? c.jsxs("div", {
            className: "space-y-4",
            children: [c.jsxs("div", {
              className: `
                p-4 rounded-lg border
                ${n ? "bg-gray-700/50 border-gray-600" : "bg-gray-50 border-gray-200"}
              `,
              children: [c.jsxs("div", {
                className: "flex items-center justify-between",
                children: [c.jsxs("div", {
                  className: "flex-1",
                  children: [c.jsx("h4", {
                    className: "font-semibold mb-1",
                    children: x("海艺模型")
                  }), c.jsx("p", {
                    className: "text-sm text-gray-400",
                    children: x("控制 Chat、绘画、视频中的海艺模型在列表中的显示/隐藏")
                  })]
                }), c.jsx("button", {
                  type: "button",
                  onClick: o,
                  className: `
                      relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                      ${i ? "bg-gray-400" : "bg-blue-500"}
                    `,
                  children: c.jsx("span", {
                    className: `
                        inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${i ? "translate-x-1" : "translate-x-6"}
                      `
                  })
                })]
              }), c.jsxs("div", {
                className: "mt-2 text-xs",
                children: [x("当前状态: "), c.jsx("span", {
                  className: i ? "text-gray-400" : "text-green-500",
                  children: x(i ? "已隐藏" : "显示中")
                })]
              }), i ? null : c.jsxs("div", {
                className: `mt-4 pt-4 border-t ${n ? "border-gray-600" : "border-gray-200"}`,
                children: [c.jsxs("div", {
                  className: "flex items-center gap-2 mb-2",
                  children: [c.jsx("span", {
                    className: `inline-block h-2 w-2 rounded-full ${y != null && y.effectiveProxyUrl ? "bg-green-500" : "bg-gray-400"}`
                  }), c.jsx("h5", {
                    className: "text-sm font-medium",
                    children: x("OpenAPI 出站代理")
                  })]
                }), c.jsx(bTa, {
                  isDark: n,
                  config: f,
                  diagnostics: y,
                  onChange: b,
                  variant: "feature"
                })]
              })]
            }), c.jsx("div", {
              className: "flex justify-end pt-2",
              children: c.jsx("button", {
                type: "button",
                onClick: w,
                className: "px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors",
                children: x("关闭")
              })
            })]
          }) : c.jsx("div", {
            className: "flex justify-end",
            children: c.jsx("button", {
              type: "button",
              onClick: w,
              className: "px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors",
              children: x("关闭")
            })
          }) : c.jsxs("form", {
            onSubmit: _,
            onKeyDown: k => {
              k.key === "Escape" && (k.stopPropagation(), w());
            },
            children: [c.jsx("p", {
              className: "text-sm text-gray-400 mb-4",
              children: x("请输入密码以访问功能控制面板")
            }), c.jsx("div", {
              className: "relative w-full mb-2 overflow-hidden rounded-lg",
              children: c.jsx("input", {
                type: "password",
                value: d,
                onChange: k => {
                  u(k.target.value), p("");
                },
                ref: k => {
                  m.current = k;
                },
                placeholder: x("请输入密码"),
                autoComplete: "current-password",
                autoFocus: !0,
                className: `
                    feature-control-password-input
                    px-4 py-2 rounded-lg border
                    ${n ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"}
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                  `,
                style: {
                  width: "calc(100% + 40px)",
                  marginRight: "-40px",
                  paddingRight: "2.5rem"
                }
              })
            }), h && c.jsx("p", {
              className: "text-red-500 text-sm mb-4",
              children: h
            }), c.jsxs("div", {
              className: "flex gap-3",
              children: [c.jsx("button", {
                type: "submit",
                className: "flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors",
                children: x("确认")
              }), c.jsx("button", {
                type: "button",
                onClick: w,
                className: `
                    flex-1 px-4 py-2 rounded-lg transition-colors
                    ${n ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-900"}
                  `,
                children: x("取消")
              })]
            })]
          })
        })]
      })
    }) : null;
  },
  xTa = Object.freeze(Object.defineProperty({
    __proto__: null,
    FeatureControlPanel: wTa
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  Xvt = `你是一个工作流解析器。用户会提供一段「Skill」描述（可能包含技能名称、能力说明、步骤描述等）。你需要根据这段内容，输出一个**唯一的**、符合下方 JSON Schema 的 JSON 对象，不要输出任何其他文字、解释或 markdown 标题，只输出 JSON。

要求：
1. workflowName：为该 Skill 起一个简短的工作流名称（中文，如「电商详情页设计大师工作流」）。
2. workflowInputs：可选。该工作流需要用户事先提供的输入项列表，每项包含 id（英文）、name（中文）、type（text/image/number）、required、default（可选）。
3. steps：必填。将 Skill 拆解为按顺序执行的步骤数组，至少 2 步、建议不超过 12 步。每步包含：
   - id：英文标识，如 step_1、step_2
   - name：该步骤在画布上显示的名称（中文，如「素材接收与编号」「产品深度分析」「AI绘图提示词生成」）
   - description：一句话描述该步骤的职责（中文）
   - systemPrompt：该步骤作为 AI Agent 时的系统提示词（详细说明输入、输出与执行规范，便于后续在画布上执行）

步骤顺序即工作流执行顺序；最后一步应导向「输出提示词」「生成方案文档」等可交付结果。

只输出一个合法的 JSON 对象，不要用 markdown 代码块包裹。若必须用代码块，请使用 \`\`\`json 与 \`\`\` 包裹且保证内容可被直接 JSON.parse。`,
  pQn = "上述内容是一段被截断的 JSON。请仅从截断处继续输出剩余部分，使整体成为合法 JSON。不要重复已有内容，不要输出解释，只输出从截断处开始的续写内容。",
  _Ta = "你是一个工作流格式转换器。用户会提供一段内容，可能是：已符合规范的 JSON、被截断或带尾部说明的 JSON、中文自然语言描述的工作流、或上述混合。你的任务：从内容中识别或推断出完整的工作流结构，输出唯一的、符合下方 JSON Schema 的 JSON 对象。不要输出任何其他文字或解释，只输出 JSON。\n要求：workflowName（中文）；workflowInputs 可选数组，每项含 id、name、type、required、default；steps 必填数组至少2步，每步含 id、name、description、systemPrompt。若内容中已有部分 JSON 请补全修正；若为纯自然语言请根据描述提炼步骤并生成合规 JSON。只输出可直接 JSON.parse 的对象，可用 \\`\\`\\`json 包裹。";

function kTa(e) {
  return e.replace(/\uFEFF/g, "").replace(/\r\n?/g, `
`).replace(/\0/g, "").trim();
}

function Jvt(e) {
  return e.replace(/,\s*]/g, "]").replace(/,\s*}/g, "}");
}

function ATa(e) {
  const t = e.trim().replace(/^【\s*/, "").replace(/\s*】\s*$/, "").trim(),
    n = t.indexOf("```");
  if (n === -1) return null;
  const r = t.slice(n),
    a = r.match(/^```(?:json)?\s*\n?/);
  if (!a) return null;
  const i = r.slice(a[0].length),
    o = i.lastIndexOf("```");
  return o === -1 ? i.trim() : i.slice(0, o).trim();
}

function TDt(e) {
  let t = e.trim();
  const n = t.match(/^【?\s*```(?:json)?\s*\n?/);
  if (n) {
    const h = t.slice(n[0].length),
      p = h.lastIndexOf("```");
    p !== -1 ? t = h.slice(0, p).trim() : t = h.trim();
  } else {
    const h = t.match(/```(?:json)?\s*([\s\S]*?)(?:```|$)/);
    h && (t = h[1].trim());
  }
  t = t.replace(/^【\s*/, "").replace(/\s*】\s*$/, "").trim();
  let r = t.indexOf("{");
  if (r === -1) return t;
  const a = t.indexOf('"workflowName"'),
    i = t.indexOf('"workflow_name"'),
    o = a === -1 ? i : i === -1 ? a : Math.min(a, i);
  if (o !== -1 && o < 600) {
    const h = t.lastIndexOf("{", o);
    h !== -1 && (r = h);
  }
  let s = 0,
    l = !1,
    d = !1,
    u = '"';
  for (let h = r; h < t.length; h++) {
    const p = t[h];
    if (d) {
      d = !1;
      continue;
    }
    if (p === "\\" && l) {
      d = !0;
      continue;
    }
    if (!l) {
      if (p === "{") s++;else if (p === "}") {
        if (s--, s === 0) return t.slice(r, h + 1);
      } else (p === '"' || p === "'") && (l = !0, u = p);
      continue;
    }
    p === u && (l = !1);
  }
  return t.slice(r);
}

function Otn(e) {
  let t = e.trim().replace(/^【\s*/, "").replace(/\s*】\s*$/, "").trim();
  const n = t.match(/```(?:json)?\s*([\s\S]*?)(?:```|$)/),
    r = n ? n[1].trim().replace(/^【\s*/, "").replace(/\s*】\s*$/, "").trim() : t;
  let a = r.indexOf("{");
  if (a === -1) return null;
  const i = r.indexOf('"workflowName"'),
    o = r.indexOf('"workflow_name"'),
    s = i === -1 ? o : o === -1 ? i : Math.min(i, o);
  if (s !== -1 && s < 600) {
    const d = r.lastIndexOf("{", s);
    d !== -1 && (a = d);
  }
  const l = r.match(/\]\s*}\s*$/);
  if (l && l.index != null) {
    const d = l.index + l[0].length;
    if (d > a) return r.slice(a, d);
  }
  return null;
}

function MDt(e) {
  const t = TDt(e),
    n = Jvt(t);
  let r;
  try {
    r = JSON.parse(n);
  } catch {
    throw new Error("返回格式无效：无法解析 JSON，请重试或精简 Skill 内容");
  }
  return Zvt(r);
}

function Zvt(e) {
  if (!e || typeof e != "object") throw new Error("返回格式无效：缺少有效 JSON 对象");
  let t = e;
  t.result && typeof t.result == "object" && t.result !== null ? t = t.result : t.data && typeof t.data == "object" && t.data !== null && (t = t.data);
  const n = typeof t.workflowName == "string" ? t.workflowName : typeof t.workflow_name == "string" ? t.workflow_name : "未命名工作流";
  let r = t.steps;
  if (!Array.isArray(r) && Array.isArray(t.step_list) && (r = t.step_list), !Array.isArray(r) || r.length < 1) throw new Error("返回格式无效：缺少 steps 数组或 steps 为空");
  const a = r.map((i, o) => {
    const s = i && typeof i == "object" ? i : {},
      l = typeof s.name == "string" ? s.name : typeof s.step_name == "string" ? s.step_name : `步骤${o + 1}`,
      d = typeof s.description == "string" ? s.description : typeof s.desc == "string" ? s.desc : "",
      u = typeof s.systemPrompt == "string" ? s.systemPrompt : typeof s.system_prompt == "string" ? s.system_prompt : d;
    return {
      id: typeof s.id == "string" ? s.id : `step_${o + 1}`,
      name: l,
      description: d,
      systemPrompt: u || d
    };
  });
  return {
    workflowName: n || "未命名工作流",
    workflowInputs: Array.isArray(t.workflowInputs) ? t.workflowInputs : Array.isArray(t.workflow_inputs) ? t.workflow_inputs : void 0,
    steps: a
  };
}

function Btn(e) {
  e = kTa(e);
  let t;
  const n = l => {
      try {
        return MDt(l);
      } catch (d) {
        return t = d instanceof Error ? d.message : String(d), null;
      }
    },
    r = ATa(e);
  if (r && r.startsWith("{")) {
    const l = TDt(r),
      d = Jvt(l);
    try {
      return {
        result: Zvt(JSON.parse(d))
      };
    } catch (u) {
      t = u instanceof Error ? u.message : String(u);
    }
  }
  try {
    const l = e.match(/```(?:json)?\s*([\s\S]*?)(?:```|$)/),
      d = l ? l[1].trim().replace(/^【\s*/, "").replace(/\s*】\s*$/, "").trim() : e;
    if (d.startsWith("{")) {
      const u = Jvt(d),
        h = JSON.parse(u);
      return {
        result: Zvt(h)
      };
    }
  } catch (l) {
    t = l instanceof Error ? l.message : String(l);
  }
  let a = n(e);
  if (a) return {
    result: a
  };
  const i = Otn(e);
  if (i && (a = n(i), a)) return {
    result: a
  };
  const o = e.replace(/\s*上述\s*JSON\s*已经[\s\S]*$/i, "").trim();
  if (o !== e) {
    if (a = n(o), a) return {
      result: a
    };
    const l = Otn(o);
    l && (a = n(l));
  }
  const s = z_e(e);
  if (s && (a = n(s), a)) return {
    result: a
  };
  if (i) {
    const l = z_e(i);
    l && (a = n(l));
  }
  return {
    result: a || null,
    errorMessage: t
  };
}

async function STa(e) {
  const {
      content: t,
      apiKey: n,
      baseUrl: r,
      model: a,
      onStreamChunk: i
    } = e,
    o = `${r.replace(/\/+$/, "")}/v1/chat/completions`,
    s = {
      model: a,
      messages: [{
        role: "system",
        content: _Ta
      }, {
        role: "user",
        content: t.slice(0, 12e4)
      }],
      max_tokens: 16384
    };
  return hze(o, n, s, i);
}

async function hze(e, t, n, r) {
  var d, u, h, p, m, f, y, b, v, _;
  const a = await fetch(e, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${t}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...n,
      stream: !0
    })
  });
  if (!a.ok) {
    const w = await a.text();
    throw new Error(w || `请求失败: ${a.status}`);
  }
  if (!a.body) throw new Error("无响应体");
  const i = a.body.getReader(),
    o = new TextDecoder("utf-8");
  let s = "",
    l = "";
  try {
    for (;;) {
      const {
        done: w,
        value: k
      } = await i.read();
      if (w) break;
      const A = o.decode(k, {
        stream: !0
      });
      l += A;
      const S = l.split(`
`);
      l = S.pop() || "";
      for (const C of S) {
        const I = C.trim();
        if (!(!I || I === "data: [DONE]") && I.startsWith("data: ")) try {
          const E = I.slice(6);
          if (E === "[DONE]") continue;
          const M = JSON.parse(E),
            T = ((h = (u = (d = M.choices) == null ? void 0 : d[0]) == null ? void 0 : u.delta) == null ? void 0 : h.content) || ((m = (p = M.choices) == null ? void 0 : p[0]) == null ? void 0 : m.text) || ((f = M.delta) == null ? void 0 : f.content) || M.content || "";
          T && (s += T, r == null || r(s));
        } catch {}
      }
    }
    if (l.trim().startsWith("data: ") && l.trim() !== "data: [DONE]") try {
      const w = JSON.parse(l.trim().slice(6)),
        k = ((v = (b = (y = w.choices) == null ? void 0 : y[0]) == null ? void 0 : b.delta) == null ? void 0 : v.content) || ((_ = w.delta) == null ? void 0 : _.content) || "";
      k && (s += k, r == null || r(s));
    } catch {}
  } finally {
    i.releaseLock();
  }
  return s;
}

function z_e(e) {
  const t = TDt(e).trim();
  let n = t;
  const r = (t.match(/\{/g) || []).length,
    a = (t.match(/\}/g) || []).length,
    i = (t.match(/\[/g) || []).length,
    o = (t.match(/\]/g) || []).length;
  for (let s = 0; s < i - o; s++) n += "]";
  for (let s = 0; s < r - a; s++) n += "}";
  try {
    return JSON.parse(n), n;
  } catch {
    return null;
  }
}

async function ITa(e) {
  const {
      skillText: t,
      apiKey: n,
      baseUrl: r,
      model: a,
      onStreamChunk: i
    } = e,
    o = `${r.replace(/\/+$/, "")}/v1/chat/completions`;
  let l = await hze(o, n, {
    model: a,
    messages: [{
      role: "system",
      content: Xvt
    }, {
      role: "user",
      content: t
    }],
    max_tokens: 16384
  }, i);
  const d = y => {
    try {
      return MDt(y);
    } catch {
      return null;
    }
  };
  let u = d(l);
  if (u) return u;
  const h = z_e(l);
  if (h && (u = d(h), u)) return u;
  const m = await hze(o, n, {
    model: a,
    messages: [{
      role: "system",
      content: Xvt
    }, {
      role: "user",
      content: t
    }, {
      role: "assistant",
      content: l
    }, {
      role: "user",
      content: pQn
    }],
    max_tokens: 8192
  }, y => {
    i == null || i(l + y);
  });
  if (l = l + m, u = d(l), u) return u;
  const f = z_e(l);
  if (f && (u = d(f), u)) return u;
  throw new Error("返回格式无效：无法解析 JSON（可能被截断），请精简 Skill 内容后重试");
}

async function CTa(e) {
  const {
      skillText: t,
      apiKey: n,
      baseUrl: r,
      model: a,
      existingContent: i,
      onStreamChunk: o
    } = e,
    s = `${r.replace(/\/+$/, "")}/v1/chat/completions`,
    d = await hze(s, n, {
      model: a,
      messages: [{
        role: "system",
        content: Xvt
      }, {
        role: "user",
        content: t
      }, {
        role: "assistant",
        content: i
      }, {
        role: "user",
        content: pQn
      }],
      max_tokens: 8192
    }, f => {
      o == null || o(i + f);
    }),
    u = i + d,
    h = f => {
      try {
        return MDt(f);
      } catch {
        return null;
      }
    };
  let p = h(u);
  if (p) return p;
  const m = z_e(u);
  if (m && (p = h(m), p)) return p;
  throw new Error("返回格式无效：续写后仍无法解析 JSON，可再次点击续写或精简 Skill 内容");
}

const ETa = ({
    isOpen: e,
    onClose: t,
    isDark: n,
    initialText: r = "",
    apiConfigs: a,
    chatModel: i,
    globalApiKey: o = "",
    onCreateWorkflow: s,
    onError: l
  }) => {
    on();
    const [d, u] = g.useState(""),
      [h, p] = g.useState(i),
      [m, f] = g.useState(!1),
      [y, b] = g.useState(!1),
      [v, _] = g.useState(""),
      [w, k] = g.useState(!1),
      [A, S] = g.useState([]),
      [C, I] = g.useState(!1),
      [E, M] = g.useState(null),
      T = g.useRef(null),
      P = g.useRef(null),
      [R, j] = g.useState(null),
      B = g.useRef(null),
      F = g.useRef(null);
    g.useEffect(() => {
      e || (k(!1), I(!1));
    }, [e]), g.useLayoutEffect(() => {
      if (!w) {
        j(null);
        return;
      }
      const U = B.current;
      if (U) {
        const Y = U.getBoundingClientRect(),
          K = 8,
          W = window.innerHeight - Y.bottom - K,
          Q = Y.top - K,
          q = 400;
        Q > W && W < 200 ? j({
          bottom: window.innerHeight - Y.top + 4,
          left: Y.left,
          width: Y.width,
          maxHeight: Math.min(q, Q)
        }) : j({
          top: Y.bottom + 4,
          left: Y.left,
          width: Y.width,
          maxHeight: Math.min(q, Math.max(W, 240))
        });
      }
      const H = Y => {
        var K;
        if (Y.type === "resize") {
          k(!1);
          return;
        }
        Y.target && ((K = F.current) != null && K.contains(Y.target)) || k(!1);
      };
      return window.addEventListener("scroll", H, !0), window.addEventListener("resize", H), () => {
        window.removeEventListener("scroll", H, !0), window.removeEventListener("resize", H);
      };
    }, [w]), g.useLayoutEffect(() => {
      !w || !R || P3(F.current);
    }, [w, R, h]), g.useLayoutEffect(() => {
      if (!C) {
        M(null);
        return;
      }
      const U = T.current;
      if (U) {
        const Y = U.getBoundingClientRect(),
          W = window.innerHeight - Y.bottom - 8;
        M({
          top: Y.bottom + 4,
          left: Y.left,
          width: Y.width,
          maxHeight: Math.min(280, Math.max(W, 160))
        });
      }
      const H = Y => {
        var K;
        if (Y.type === "resize") {
          I(!1);
          return;
        }
        Y.target && ((K = P.current) != null && K.contains(Y.target)) || I(!1);
      };
      return window.addEventListener("scroll", H, !0), window.addEventListener("resize", H), () => {
        window.removeEventListener("scroll", H, !0), window.removeEventListener("resize", H);
      };
    }, [C]), g.useEffect(() => {
      if (!w) return;
      const U = H => {
        var K, W;
        const Y = H.target;
        (K = B.current) != null && K.contains(Y) || (W = F.current) != null && W.contains(Y) || k(!1);
      };
      return document.addEventListener("mousedown", U), () => document.removeEventListener("mousedown", U);
    }, [w]), g.useEffect(() => {
      if (!C) return;
      const U = H => {
        var K, W;
        const Y = H.target;
        (K = T.current) != null && K.contains(Y) || (W = P.current) != null && W.contains(Y) || I(!1);
      };
      return document.addEventListener("mousedown", U), () => document.removeEventListener("mousedown", U);
    }, [C]);
    const N = a.filter(U => U.type === "Chat"),
      G = N.find(U => U.id === h) || N[0];
    g.useEffect(() => {
      e && (u(r), p(i), S(vp()));
    }, [e, r, i]), g.useEffect(() => {
      const U = () => S(vp());
      return window.addEventListener(cw, U), () => window.removeEventListener(cw, U);
    }, []);
    const z = g.useCallback(U => {
        const H = U instanceof Error ? U.message : String(U);
        if (!H || H === "[object Object]") return "请求失败，请检查网络或到设置中确认该模型的 API 地址与 Key 后重试。";
        const Y = H.toLowerCase();
        return Y.includes("err_connection_closed") || Y.includes("connection closed") || Y.includes("failed to fetch") || Y.includes("network") ? "当前模型接口连接失败，请检查网络或到设置中确认该模型的 API 地址与 Key 是否正确。" : Y.includes("401") || Y.includes("unauthorized") ? "API Key 无效或已过期，请在设置中检查该模型的 Key。" : Y.includes("404") || Y.includes("not found") ? "当前模型接口地址不可用，请在设置中检查该模型的 API 地址。" : Y.includes("timeout") || Y.includes("timed out") ? "请求超时，请稍后重试或更换模型。" : Y.includes("返回格式") || Y.includes("parse") || Y.includes("json") ? "模型返回格式有误，请重试或精简 Skill 内容后再生成。" : Y.includes("step") || Y.includes("node") || Y.includes("workflow") || Y.includes("create") ? "创建工作流时出错，请重试。若仍失败可尝试精简 Skill 内容或更换模型。" : H.length > 120 ? "请求失败，请检查网络或该模型的 API 设置后重试。" : H;
      }, []),
      V = g.useCallback(async () => {
        const U = d.trim();
        if (!U) {
          l("请先输入 Skill 内容");
          return;
        }
        const H = (G == null ? void 0 : G.key) || o;
        if (!H) {
          l("请先在设置中配置对话模型的 API Key");
          return;
        }
        const Y = ((G == null ? void 0 : G.url) || "https://ai.comfly.chat").replace(/\/+$/, ""),
          K = (G == null ? void 0 : G.modelName) || "gpt-5.5";
        f(!0), _("");
        try {
          const W = await ITa({
            skillText: U,
            apiKey: H,
            baseUrl: Y,
            model: K,
            onStreamChunk: Q => _(Q)
          });
          await Promise.resolve(s(W)), _(""), t();
        } catch (W) {
          l(z(W));
        } finally {
          f(!1);
        }
      }, [d, G, o, s, t, l, z]),
      O = g.useCallback(async () => {
        const U = d.trim();
        if (!U || !v) return;
        const H = (G == null ? void 0 : G.key) || o;
        if (!H) {
          l("请先在设置中配置对话模型的 API Key");
          return;
        }
        const Y = ((G == null ? void 0 : G.url) || "https://ai.comfly.chat").replace(/\/+$/, ""),
          K = (G == null ? void 0 : G.modelName) || "gpt-5.5";
        f(!0);
        try {
          const W = await CTa({
            skillText: U,
            apiKey: H,
            baseUrl: Y,
            model: K,
            existingContent: v,
            onStreamChunk: Q => _(Q)
          });
          await Promise.resolve(s(W)), _(""), t();
        } catch (W) {
          l(z(W));
        } finally {
          f(!1);
        }
      }, [d, v, G, o, s, t, l, z]),
      L = g.useCallback(async () => {
        if (!(v != null && v.trim())) return;
        const U = (G == null ? void 0 : G.key) || o,
          H = ((G == null ? void 0 : G.url) || "https://ai.comfly.chat").replace(/\/+$/, ""),
          Y = (G == null ? void 0 : G.modelName) || "gpt-5.5",
          {
            result: K,
            errorMessage: W
          } = Btn(v);
        if (K) {
          try {
            await Promise.resolve(s(K)), _(""), t();
          } catch (Q) {
            l(z(Q));
          }
          return;
        }
        if (!U || N.length === 0) {
          l(W || "当前解析结果无法识别为有效工作流，可尝试续写或重新生成");
          return;
        }
        b(!0);
        try {
          const Q = await STa({
              content: v,
              apiKey: U,
              baseUrl: H,
              model: Y,
              onStreamChunk: de => _(de)
            }),
            {
              result: q,
              errorMessage: ne
            } = Btn(Q);
          q ? (await Promise.resolve(s(q)), _(""), t()) : (l(ne || "智能转换后仍无法解析为工作流，请尝试续写或精简内容"), _(Q));
        } catch (Q) {
          l(z(Q));
        } finally {
          b(!1);
        }
      }, [v, G, o, N.length, s, t, l, z]),
      D = g.useCallback(() => {
        navigator.clipboard.readText().then(U => {
          U != null && U.trim() && _(U.trim());
        }).catch(() => l("无法读取剪贴板，请确保已允许剪贴板权限"));
      }, [l]);
    return c.jsx(Y6, {
      isOpen: e,
      onClose: t,
      title: x("从 Skill 生成工作流"),
      theme: n ? "dark" : "light",
      children: c.jsxs("div", {
        className: `p-5 flex flex-col gap-4 ${n ? "bg-[#09090b]" : "bg-white"}`,
        children: [c.jsx("div", {
          className: "flex flex-col gap-1",
          children: c.jsxs("div", {
            className: "flex items-center gap-2",
            children: [n ? c.jsxs(c.Fragment, {
              children: [c.jsx("div", {
                ref: T,
                className: "flex-1 min-w-0 relative",
                children: c.jsxs("button", {
                  type: "button",
                  onClick: () => !m && I(U => !U),
                  disabled: m,
                  className: "w-full px-3 py-2 rounded-lg text-sm outline-none flex items-center justify-between gap-2 text-left bg-transparent text-zinc-200 border border-zinc-700 focus:ring-2 focus:ring-zinc-400/60 focus:ring-inset",
                  children: [c.jsx("span", {
                    className: "truncate",
                    children: A.length === 0 ? x("暂无") : x("选择…")
                  }), c.jsx(Mi, {
                    size: 16,
                    className: `shrink-0 transition-transform ${C ? "rotate-180" : ""}`
                  })]
                })
              }), C && E && Da.createPortal(c.jsx("ul", {
                ref: P,
                role: "listbox",
                onWheel: U => U.stopPropagation(),
                style: {
                  position: "fixed",
                  top: E.top,
                  left: E.left,
                  width: E.width,
                  maxHeight: E.maxHeight
                },
                className: "py-1 rounded-lg shadow-xl overflow-y-auto minimal-scrollbar z-[101] bg-black border border-zinc-800",
                children: A.length === 0 ? c.jsx("li", {
                  className: "px-3 py-2 text-sm text-zinc-500",
                  children: x("暂无")
                }) : A.map(U => c.jsx("li", {
                  children: c.jsx("button", {
                    type: "button",
                    role: "option",
                    onClick: () => {
                      u(U.content), I(!1);
                    },
                    className: "w-full px-3 py-2 text-left text-sm text-zinc-200 hover:bg-zinc-900 focus:bg-zinc-900 focus:outline-none",
                    children: U.name
                  })
                }, U.id))
              }), document.body)]
            }) : c.jsxs("select", {
              value: "",
              onChange: U => {
                const H = U.target.value;
                if (!H) return;
                const Y = A.find(K => K.id === H);
                Y && u(Y.content), U.target.value = "";
              },
              disabled: m,
              className: "flex-1 min-w-0 px-3 py-2 rounded-lg text-sm outline-none bg-white border border-zinc-300 text-zinc-900 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30",
              children: [c.jsx("option", {
                value: "",
                children: A.length === 0 ? x("暂无") : x("选择…")
              }), A.map(U => c.jsx("option", {
                value: U.id,
                children: U.name
              }, U.id))]
            }), c.jsx("button", {
              type: "button",
              onClick: () => S(vp()),
              disabled: m,
              title: x("刷新 Skill 库"),
              className: `p-2 rounded-lg shrink-0 ${n ? "text-zinc-400 hover:bg-zinc-800" : "text-zinc-600 hover:bg-zinc-100"}`,
              children: c.jsx(bd, {
                size: 16
              })
            })]
          })
        }), c.jsxs("div", {
          children: [c.jsx("label", {
            className: `block text-xs font-medium mb-1 ${n ? "text-zinc-400" : "text-zinc-600"}`,
            children: x("Skill 内容")
          }), c.jsx("textarea", {
            value: d,
            onChange: U => u(U.target.value),
            placeholder: x("粘贴 Skill 全文或描述"),
            className: `w-full min-h-[200px] px-3 py-2 rounded-lg text-sm resize-y overflow-y-auto minimal-scrollbar outline-none ${n ? "bg-transparent text-zinc-200 placeholder:text-zinc-500 border-0 focus:ring-2 focus:ring-zinc-400/60 focus:ring-inset" : "bg-white border border-zinc-300 text-zinc-900 placeholder:text-zinc-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30"}`,
            disabled: m
          })]
        }), (v || !m) && c.jsxs("div", {
          children: [c.jsxs("div", {
            className: "flex items-center justify-between gap-2 mb-1",
            children: [c.jsx("label", {
              className: `text-xs font-medium ${n ? "text-zinc-400" : "text-zinc-600"}`,
              children: x(m ? "解析中（流式）" : "解析结果")
            }), !m && c.jsxs("div", {
              className: "flex items-center gap-2",
              children: [c.jsx("button", {
                type: "button",
                onClick: D,
                disabled: y,
                className: `text-xs px-2 py-1 rounded ${n ? "text-zinc-300 hover:bg-zinc-800" : "text-blue-600 hover:bg-blue-50"}`,
                children: x("粘贴")
              }), c.jsx("button", {
                type: "button",
                onClick: L,
                disabled: !(v != null && v.trim()) || y,
                className: `text-xs px-2 py-1 rounded flex items-center gap-1 ${n ? "text-zinc-300 hover:bg-zinc-800" : "text-blue-600 hover:bg-blue-50"}`,
                children: y ? c.jsxs(c.Fragment, {
                  children: [c.jsx(Ua, {
                    size: 12,
                    className: "animate-spin shrink-0"
                  }), x("智能转换中…")]
                }) : x("从当前结果创建")
              }), c.jsx("button", {
                type: "button",
                onClick: O,
                disabled: N.length === 0 || !(v != null && v.trim()) || y,
                className: `text-xs px-2 py-1 rounded ${n ? "text-zinc-300 hover:bg-zinc-800" : "text-blue-600 hover:bg-blue-50"}`,
                children: x("续写")
              })]
            })]
          }), c.jsx("div", {
            className: `w-full max-h-[280px] overflow-y-auto rounded-lg px-3 py-2 text-xs font-mono whitespace-pre-wrap break-words minimal-scrollbar ${n ? "bg-transparent text-zinc-300 border-0" : "bg-zinc-50 border border-zinc-300 text-zinc-700"}`,
            children: v || c.jsx("span", {
              className: n ? "text-zinc-500" : "text-zinc-400",
              children: x("解析结果将在此显示")
            })
          })]
        }), c.jsxs("div", {
          ref: B,
          className: "relative",
          children: [c.jsx("label", {
            className: `block text-xs font-medium mb-1 ${n ? "text-zinc-400" : "text-zinc-600"}`,
            children: x("解析用模型")
          }), c.jsxs("button", {
            type: "button",
            onClick: () => !m && k(U => !U),
            disabled: m,
            className: `w-full px-3 py-2 rounded-lg text-sm outline-none flex items-center justify-between gap-2 ${n ? "bg-transparent text-zinc-200 border-0 focus:ring-2 focus:ring-zinc-400/60 focus:ring-inset" : "bg-white border border-zinc-300 text-zinc-900 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30"}`,
            children: [c.jsx("span", {
              className: "truncate",
              children: N.length === 0 ? x("请先在设置中添加对话模型") : G && (G.provider || G.modelName || G.id) || h
            }), c.jsx(Mi, {
              size: 16,
              className: `shrink-0 transition-transform ${w ? "rotate-180" : ""}`
            })]
          }), w && R && N.length > 0 && Da.createPortal(c.jsx("ul", {
            ref: F,
            role: "listbox",
            style: {
              position: "fixed",
              ...(R.top != null ? {
                top: R.top
              } : {
                bottom: R.bottom
              }),
              left: R.left,
              width: R.width,
              maxHeight: R.maxHeight
            },
            className: `py-1 rounded-lg shadow-xl overflow-y-auto minimal-scrollbar z-[101] ${n ? "bg-black border border-zinc-800" : "bg-white border border-zinc-200"}`,
            children: N.map(U => c.jsx("li", {
              children: c.jsx("button", {
                type: "button",
                role: "option",
                ...(U.id === h ? {
                  [Md]: "true"
                } : {}),
                onClick: () => {
                  p(U.id), k(!1);
                },
                className: `w-full px-3 py-2 text-left text-sm ${U.id === h ? n ? "bg-black text-white" : "bg-blue-50 text-blue-700" : n ? "text-zinc-200 hover:bg-black" : "text-zinc-800 hover:bg-zinc-100"}`,
                children: U.provider || U.modelName || U.id
              })
            }, U.id))
          }), document.body)]
        }), c.jsxs("div", {
          className: "flex justify-end gap-2 pt-2",
          children: [c.jsx("button", {
            type: "button",
            onClick: t,
            className: `px-4 py-2 rounded-lg text-sm ${n ? "text-zinc-400 hover:bg-zinc-800" : "text-zinc-600 hover:bg-zinc-100"}`,
            disabled: m,
            children: x("取消")
          }), c.jsx("button", {
            type: "button",
            onClick: V,
            disabled: m || N.length === 0,
            className: `px-4 py-2 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${n ? "text-zinc-300 hover:text-white hover:bg-zinc-800/80" : "bg-blue-600 text-white hover:bg-blue-700"}`,
            children: m ? c.jsxs(c.Fragment, {
              children: [c.jsx(Ua, {
                size: 16,
                className: "animate-spin shrink-0"
              }), x("生成中…")]
            }) : x("生成工作流")
          })]
        })]
      })
    });
  },
  TTa = Object.freeze(Object.defineProperty({
    __proto__: null,
    SkillToWorkflowModal: ETa
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  MTa = ({
    isOpen: e,
    onClose: t,
    isDark: n,
    commonNodeTypeIds: r,
    onSaved: a
  }) => {
    on();
    const [i, o] = g.useState({}),
      [s, l] = g.useState(""),
      d = g.useCallback(() => {
        const v = Wle(r),
          _ = {};
        for (const w of mO) _[w] = v.includes(w);
        o(_), l("");
      }, [r]);
    g.useEffect(() => {
      e && d();
    }, [e, d]);
    const h = mO.filter(v => i[v]).length,
      p = mO.length,
      m = v => {
        o(_ => ({
          ..._,
          [v]: !_[v]
        })), l("");
      },
      f = () => {
        const v = {};
        for (const _ of mO) v[_] = !0;
        o(v), l("");
      },
      y = () => {
        const v = {};
        for (const _ of mO) v[_] = qCn.includes(_);
        o(v), l("");
      },
      b = async () => {
        const v = mO.filter(w => i[w]);
        if (v.length < HH) {
          l(`请至少选择 ${HH} 个节点（当前 ${v.length} 个）`);
          return;
        }
        if (v.length > p) {
          l("超出可选项数量");
          return;
        }
        const _ = await o9r(v);
        a(_), t();
      };
    return e ? c.jsx(Y6, {
      isOpen: e,
      onClose: t,
      title: x("画布常用节点"),
      theme: n ? "dark" : "light",
      children: c.jsxs("div", {
        className: `px-5 py-4 space-y-4 ${n ? "text-zinc-200" : "text-zinc-800"}`,
        children: [c.jsxs("div", {
          className: "flex flex-wrap items-center gap-2 text-xs",
          children: [c.jsxs("span", {
            className: h < HH ? n ? "text-amber-300" : "text-amber-700" : n ? "text-zinc-400" : "text-zinc-600",
            children: [x("已选 "), h, x(" / 最少 "), HH, x(" / 最多 "), p]
          }), c.jsx("button", {
            type: "button",
            onClick: f,
            className: `rounded px-2 py-0.5 border text-xs ${n ? "border-zinc-600 text-zinc-300 hover:bg-zinc-800" : "border-zinc-300 text-zinc-700 hover:bg-zinc-100"}`,
            children: x("全选")
          }), c.jsx("button", {
            type: "button",
            onClick: y,
            className: `rounded px-2 py-0.5 border text-xs ${n ? "border-zinc-600 text-zinc-300 hover:bg-zinc-800" : "border-zinc-300 text-zinc-700 hover:bg-zinc-100"}`,
            children: x("恢复默认（6 项）")
          })]
        }), s ? c.jsx("p", {
          className: "text-sm text-red-500",
          role: "alert",
          children: s
        }) : null, c.jsx("ul", {
          className: `grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5 items-start content-start text-sm max-h-[min(52vh,28rem)] overflow-y-auto custom-scrollbar p-0.5 ${n ? "text-zinc-200" : "text-zinc-800"}`,
          children: WCn.map(({
            type: v,
            label: _
          }) => c.jsx("li", {
            className: "min-w-0",
            children: c.jsxs("label", {
              className: "inline-flex items-center gap-2 cursor-pointer select-none w-fit max-w-full flex-wrap sm:flex-nowrap touch-manipulation",
              children: [c.jsx("input", {
                type: "checkbox",
                className: "rounded border-zinc-500 text-blue-600 focus:ring-blue-500 shrink-0",
                checked: !!i[v],
                onChange: () => m(v)
              }), c.jsx("span", {
                className: "shrink-0",
                children: _
              })]
            })
          }, v))
        }), c.jsxs("div", {
          className: `flex justify-end gap-2 pt-2 border-t ${n ? "border-zinc-800" : "border-zinc-200"}`,
          children: [c.jsx("button", {
            type: "button",
            onClick: t,
            className: `px-3 py-1.5 text-sm rounded-lg border ${n ? "border-zinc-600 text-zinc-200 hover:bg-zinc-800" : "border-zinc-300 text-zinc-800 hover:bg-zinc-100"}`,
            children: x("取消")
          }), c.jsx("button", {
            type: "button",
            onClick: () => void b(),
            className: "px-3 py-1.5 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-500",
            children: x("保存")
          })]
        })]
      })
    }) : null;
  },
  PTa = Object.freeze(Object.defineProperty({
    __proto__: null,
    NodeCustomizationModal: MTa
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  RTa = g.memo(function ({
    modelId: t,
    status: n,
    progress: r,
    isDark: a,
    onTest: i,
    validationOnly: o
  }) {
    on();
    const s = g.useCallback(() => r.getSnapshot().apiTesting === t, [r, t]),
      l = g.useCallback(() => r.getSnapshot().apiTestHints[t], [r, t]),
      d = g.useSyncExternalStore(r.subscribe, s, s),
      u = g.useSyncExternalStore(r.subscribe, l, l),
      h = a ? "sketch-divider-dark" : "sketch-divider",
      p = a ? " sketch-test-btn-dark" : "";
    return c.jsxs(c.Fragment, {
      children: [c.jsx("div", {
        className: `settings-model-test mt-3 pt-2 ${h} flex justify-end`,
        children: c.jsx("button", {
          onClick: () => i(t),
          disabled: d,
          className: `sketch-test-btn${p}${n === "success" ? " sketch-test-btn-success" : n === "error" ? " sketch-test-btn-error" : ""}`,
          children: d ? c.jsxs(c.Fragment, {
            children: [c.jsx(Ua, {
              size: 10,
              className: "animate-spin"
            }), " ", x("测试中...")]
          }) : n === "success" ? c.jsxs(c.Fragment, {
            children: [c.jsx(io, {
              size: 10
            }), " ", x(o ? "配置有效" : "连接成功")]
          }) : n === "error" ? c.jsxs(c.Fragment, {
            children: [c.jsx(Na, {
              size: 10
            }), " ", x(o ? "配置有误" : "连接失败")]
          }) : x(o ? "校验配置" : "测试连接")
        })
      }), u && c.jsx("div", {
        className: `settings-model-test-hint mt-1 text-[10px] text-right whitespace-pre-wrap ${n === "success" ? "text-green-500" : n === "error" ? "text-red-500" : a ? "text-zinc-500" : "text-zinc-400"}`,
        children: u
      })]
    });
  });

function iC(e) {
  var o;
  const t = [],
    n = [],
    r = [];
  if (e.framesMode) return {
    imageUrlsRaw: t,
    videoUrlsRaw: n,
    audioUrlsRaw: r
  };
  const a = new Set(),
    i = (s, l) => {
      const d = String(l || "").trim();
      !d || a.has(d) || (a.add(d), s.push(d));
    };
  e.videoPortRef && i(n, e.videoPortRef), e.audioPortRef && i(r, e.audioPortRef);
  for (const s of e.refImages) {
    if (a.has(s)) continue;
    const l = (o = e.refMetaByRawUrl) == null ? void 0 : o.get(s);
    (l == null ? void 0 : l.type) === "video" || Ey(s) ? i(n, s) : (l == null ? void 0 : l.type) === "audio" || KE(s) ? i(r, s) : i(t, s);
  }
  if (e.refMetaByRawUrl) for (const [s, l] of e.refMetaByRawUrl) a.has(s) || (l.type === "video" ? i(n, s) : l.type === "audio" ? i(r, s) : l.type === "image" && i(t, s));
  return {
    imageUrlsRaw: t,
    videoUrlsRaw: n,
    audioUrlsRaw: r
  };
}

function wne(e) {
  const t = e.startPort || e.framesMode && e.refImages[0] || "" || "",
    n = e.endPort || (e.framesMode && e.refImages.length > 1 ? e.refImages[1] : "") || "";
  return {
    startFrameRaw: t,
    endFrameRaw: n
  };
}

function e1t(e = {}, t = X5e) {
  const n = Qa.getConfigs().find(i => i.id === t),
    r = Qa.getResolvedModelBaseUrl(t) || (n == null ? void 0 : n.url) || "https://metaso.cn/api/minimax",
    a = cu(n == null ? void 0 : n.key, Qa.getGlobalApiKey(), e.savedApiKeyId, {
      modelId: t,
      modelName: n == null ? void 0 : n.modelName,
      baseUrl: r,
      platformGroup: e.platformGroup,
      modelSavedApiKeyId: n == null ? void 0 : n.savedApiKeyId
    });
  if (!a) throw new Error("请先在设置中配置秘塔 H3 的 API Key");
  return {
    baseUrl: r,
    apiKey: a,
    modelName: (n == null ? void 0 : n.modelName) || "MiniMax-H3"
  };
}

async function PDt(e) {
  var a;
  const t = await e.text();
  let n;
  try {
    const i = JSON.parse(t);
    if (!i || typeof i != "object" || Array.isArray(i)) throw new Error("Invalid response");
    n = i;
  } catch {
    const i = t.trimStart().startsWith("<") ? "返回了网页" : "返回的数据格式异常";
    throw new Error(`秘塔接口${i}（HTTP ${e.status}），请检查接口地址或稍后重试`);
  }
  const r = X9t(n);
  if (!e.ok || r || n.type === "error") {
    const i = n.error,
      o = r || (typeof i == "string" ? i : i == null ? void 0 : i.message) || String(n.message || `秘塔请求失败（${e.status}）`);
    throw e.status === 401 || ((a = n.base_resp) == null ? void 0 : a.status_code) === 1004 || /login fail|valid api key/i.test(o) ? new Error("秘塔 Key 验证失败，请检查「设置 → 视频 → 秘塔H3(支持30秒)」或节点所选的 Key") : new Error(o);
  }
  return n;
}

async function mQn(e, t, n) {
  return PDt(await $i(`${e.baseUrl.replace(/\/+$/, "")}/v2/query/video_generation/${encodeURIComponent(t.trim())}`, {
    headers: {
      Authorization: `Bearer ${e.apiKey}`
    },
    signal: n
  }));
}

async function fQn(e, t, n = "generation") {
  var E, M;
  const {
      node: r,
      refImages: a,
      refMetaByRawUrl: i
    } = e,
    o = r.settings || {},
    s = t.baseUrl.replace(/\/+$/, ""),
    l = t.modelName || "MiniMax-H3";
  if (n === "generation" && o.metasoRegenerationMode === "task") {
    const T = xQt({
        model: l,
        sourceTaskId: o.metasoSourceTaskId
      }),
      R = (await mQn(t, String(T.source_task_id))).task;
    if ((R == null ? void 0 : R.status) !== "succeeded" || R.model !== "MiniMax-H3" || ((E = R.resolution) == null ? void 0 : E.toUpperCase()) !== "768P") throw new Error("再生成需要当前账号已成功的 MiniMax H3 768P 任务");
    if (R.created_at && Date.now() / 1e3 - R.created_at > 7 * 86400) throw new Error("源任务已超过 7 天，请使用源视频方式");
    return {
      endpoint: `${s}/v2/video_regeneration`,
      payload: T,
      useMultipart: !1
    };
  }
  const d = !!o.veoFramesMode,
    u = !!o.metasoMixedReferences,
    {
      startFrameRaw: h,
      endFrameRaw: p
    } = wne({
      framesMode: d,
      refImages: a,
      startPort: e.startPort,
      endPort: e.endPort
    }),
    m = iC({
      framesMode: d && !u,
      refImages: a,
      refMetaByRawUrl: i,
      videoPortRef: e.videoPort,
      audioPortRef: e.audioPort
    });
  d && (m.imageUrlsRaw = m.imageUrlsRaw.filter(T => T !== h && T !== p));
  const f = d ? +!!h + +!!p : 0;
  if (m.imageUrlsRaw.length + f > 9 || m.videoUrlsRaw.length > 3 || m.audioUrlsRaw.length > 3) throw new Error("秘塔 H3 最多支持 9 张图片（含首尾帧）、3 个参考视频和 3 个参考音频，请移除超出素材");
  if (!e.prompt.trim()) throw new Error("MiniMax H3 需要提示词");
  if (d && !h) throw new Error("MiniMax H3 首尾帧需要首帧图片");
  if (m.audioUrlsRaw.length && !f && !m.imageUrlsRaw.length && !m.videoUrlsRaw.length) throw new Error("参考音频需要同时提供图片或视频");
  const y = n === "generation" && o.metasoRegenerationMode === "video" ? (M = o.metasoBaseVideo) == null ? void 0 : M.trim() : "";
  if (n === "generation" && o.metasoRegenerationMode === "video" && !y) throw new Error("请填写原始 H3 768P 视频地址");
  const b = (T, P) => {
      var R;
      return dve(T, {
        apiKey: t.apiKey,
        baseUrl: s,
        mediaType: P,
        metasoFileUpload: !0,
        perNodeOss: !!o.genUseAliyunOss,
        assetId: (R = i == null ? void 0 : i.get(T)) == null ? void 0 : R.assetId
      });
    },
    [v, _, w, k, A, S] = await Promise.all([Promise.all(m.imageUrlsRaw.map(T => b(T, "image"))), Promise.all(m.videoUrlsRaw.map(T => b(T, "video"))), Promise.all(m.audioUrlsRaw.map(T => b(T, "audio"))), d && h ? b(h, "image") : Promise.resolve(""), d && p ? b(p, "image") : Promise.resolve(""), y ? b(y, "video") : Promise.resolve("")]),
    C = Uea({
      currentModel: X5e,
      baseUrl: s,
      modelName: l,
      durationNum: parseInt(String(o.duration || "5"), 10),
      ratio: String(o.ratio || "Auto"),
      resolution: String(o.resolution || "768P"),
      framesMode: d,
      hasMedia: v.length + _.length + w.length > 0
    }),
    I = $ea({
      model: l,
      prompt: e.prompt,
      duration: C.duration,
      resolution: C.resolution,
      ratio: u ? "adaptive" : C.ratio,
      framesMode: d,
      mixedReferences: u,
      imageUrls: v,
      videoUrls: _,
      audioUrls: w,
      startImage: k,
      endImage: A,
      fastMode: o.metasoFastMode === !0,
      contextIr: o.metasoContextIr
    });
  return n === "context-ir" ? {
    endpoint: Oea(s),
    payload: {
      model: l,
      content: I.content,
      duration: I.duration,
      ratio: I.ratio || "adaptive"
    },
    useMultipart: !1
  } : S ? {
    endpoint: `${s}/v2/video_regeneration`,
    payload: xQt({
      model: l,
      baseVideo: S,
      content: I.content
    }),
    useMultipart: !1
  } : {
    endpoint: C.endpoint,
    payload: I,
    useMultipart: !1
  };
}

const kat = new Map();

function NTa(e) {
  const t = `${e.baseUrl}
${e.apiKey}`,
    n = kat.get(t);
  if (n) return n;
  const r = (async () => {
    if (!e.apiKey.trim()) throw new Error("请先配置秘塔 H3 的 API Key");
    const a = await PDt(await $i(`${e.baseUrl.replace(/\/+$/, "")}/v2/credits/balance`, {
      headers: {
        Authorization: `Bearer ${e.apiKey}`
      }
    }));
    if (typeof a.balance != "number" || !Number.isFinite(a.balance)) throw new Error("秘塔未返回有效的积分余额");
    return a.balance;
  })().finally(() => kat.delete(t));
  return kat.set(t, r), r;
}

function gQn({
  modelId: e = "minimax-h3-metaso",
  settings: t = {}
}) {
  const [n, r] = g.useState(null),
    [a, i] = g.useState(""),
    [o, s] = g.useState(!1),
    l = g.useRef(!0),
    d = g.useRef(!1);
  g.useEffect(() => (l.current = !0, () => {
    l.current = !1;
  }), []);
  const u = async () => {
    if (!d.current) {
      d.current = !0, s(!0), i("");
      try {
        const h = await NTa(e1t(t, e));
        l.current && r(h);
      } catch (h) {
        l.current && (r(null), i(h.message));
      } finally {
        d.current = !1, l.current && s(!1);
      }
    }
  };
  return c.jsxs("div", {
    className: "text-[11px] leading-relaxed",
    onMouseDown: h => h.stopPropagation(),
    children: [c.jsxs("button", {
      type: "button",
      className: "inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 opacity-80 hover:opacity-100 hover:bg-zinc-500/10 disabled:opacity-40",
      disabled: o,
      onClick: h => {
        h.stopPropagation(), u();
      },
      children: [c.jsx(DNr, {
        size: 12,
        "aria-hidden": !0
      }), o ? "查询中…" : n === null ? "查询秘塔余额" : `余额 ${n.toLocaleString("zh-CN", {
        maximumFractionDigits: 2
      })} 积分 · 刷新`, n !== null && c.jsx(bd, {
        size: 11,
        "aria-hidden": !0
      })]
    }), a && c.jsx("p", {
      role: "alert",
      className: "mt-1 px-2 text-red-400 break-words",
      children: a
    })]
  });
}

const t1t = {
  model: "$model",
  prompt: "$prompt",
  aspect_ratio: "$ratio",
  aspectratio: "$ratio",
  ratio: "$ratio",
  resolution: "$resolution",
  duration: "$duration",
  seconds: "$duration",
  n: "$count",
  num_images: "$count",
  image_urls: "$images",
  images: "$images",
  input_images: "$images",
  image: "$firstImage",
  image_url: "$firstImage",
  first_frame: "$firstImage",
  first_frame_url: "$firstImage",
  last_frame: "$lastImage",
  last_frame_url: "$lastImage",
  mask: "$mask",
  mask_url: "$mask",
  seed: "$seed",
  size: "$size"
};

function Ftn(e, t) {
  const n = t1t[e.toLowerCase()] || {
    quality: "$quality",
    background: "$background",
    output_format: "$outputFormat"
  }[e.toLowerCase()];
  return n === "$duration" && t === "string" ? "$durationText" : n === "$firstImage" && t === "array" ? "$images" : n;
}

function jTa(e) {
  const t = [];
  let n = "",
    r = "",
    a = !1;
  for (let i = 0; i < e.length; i++) {
    const o = e[i];
    if (o === "\\" && r !== "'") {
      const s = e[++i];
      if (s === void 0) throw new Error("cURL 末尾有未完成的转义");
      n += r === '"' && !['"', "\\", "$", "`"].includes(s) ? `\\${s}` : s;
    } else r ? o === r ? r = "" : n += o : o === "'" || o === '"' ? (r = o, a = !0) : /\s/.test(o) ? (n || a) && (t.push(n), n = "", a = !1) : n += o;
  }
  if (r) throw new Error("cURL 引号未闭合，请粘贴完整示例");
  return (n || a) && t.push(n), t;
}

function yQn(e) {
  const t = e.trim().replace(/^```(?:\w+)?\s*\n?/, "").replace(/\n?```$/, "").replace(/(?:\\|`|\^)\r?\n/g, " "),
    n = {
      protocol: bZ()
    };
  let r = {};
  if (t.startsWith("{")) r = JSON.parse(t);else {
    const s = jTa(t);
    if (!/^curl(?:\.exe)?$/i.test(s.shift() || "")) throw new Error("请粘贴 cURL 请求示例或请求体 JSON");
    const l = {},
      d = new Set();
    let u = "",
      h = "POST",
      p = "",
      m = !1;
    const f = b => {
      if (s[b] === void 0) throw new Error("cURL 参数缺少值");
      return s[b];
    };
    for (let b = 0; b < s.length; b++) {
      const v = s[b];
      if (["-X", "--request"].includes(v)) h = f(++b).toUpperCase();else if (["-H", "--header"].includes(v)) {
        const _ = f(++b),
          w = _.indexOf(":");
        if (w < 1) throw new Error("请求头应使用 Header: value 格式");
        const k = _.slice(0, w).trim(),
          A = _.slice(w + 1).trim(),
          S = k.toLowerCase();
        if (d.has(S)) throw new Error(`重复请求头：${k}`);
        if (d.add(S), S === "authorization") {
          if (!/^Bearer\s+/i.test(A)) throw new Error("当前可导入 Bearer 或 x-api-key 认证，请在高级设置调整认证方式");
          n.key = A.replace(/^Bearer\s+/i, "");
        } else if (["x-api-key", "api-key", "x-goog-api-key"].includes(S)) n.protocol.auth = "header", n.protocol.authHeader = k, n.key = A;else if (S !== "content-type") l[k] = A;else if (!/application\/json|multipart\/form-data/i.test(A)) throw new Error("当前支持 JSON 和 multipart 请求体");
      } else if (["-d", "--data", "--data-raw", "--data-binary", "--json"].includes(v)) {
        if (p) throw new Error("请将多个 data 参数合并为一个 JSON 对象");
        if (p = f(++b), p.startsWith("@")) throw new Error("请粘贴 JSON 内容，不读取示例中的本地文件");
      } else if (["-F", "--form"].includes(v)) {
        m = !0;
        const _ = f(++b),
          w = _.indexOf("=");
        if (w < 1) throw new Error("form 参数应为 field=value");
        const k = _.slice(0, w),
          A = _.slice(w + 1);
        if (["__proto__", "constructor", "prototype"].includes(k)) throw new Error("参数包含不允许的字段");
        r[k] = A.startsWith("@") ? k.toLowerCase().includes("mask") ? "$mask" : "$images" : A;
      } else if (v === "--url") u = f(++b);else if (/^https?:\/\//i.test(v)) {
        if (u) throw new Error("一次仅导入一个提交请求");
        u = v;
      } else if (!["-L", "--location", "-s", "--silent", "-S", "--show-error", "--compressed"].includes(v)) throw new Error(`暂不识别 cURL 参数 ${v}；可只粘贴请求体 JSON 并填写地址`);
    }
    if (h !== "POST") throw new Error("这里导入生成用的 POST 请求；查询接口在返回设置中填写");
    if (!u) throw new Error("未找到提交地址");
    const y = new URL(u);
    if (y.username || y.password || y.hash) throw new Error("地址不能包含账号、密码或片段");
    if (/\/models\/[^/]+:generateContent$/.test(y.pathname) && y.searchParams.has("key") && (n.key || (n.key = y.searchParams.get("key") || void 0, n.protocol.auth = "header", n.protocol.authHeader = "x-goog-api-key"), y.searchParams.delete("key")), n.url = y.origin, n.protocol.path = y.pathname + y.search, n.protocol.headers = l, p && m) throw new Error("不能同时导入 JSON 和 multipart 请求体");
    n.protocol.format = m ? "multipart" : "json", p && (r = JSON.parse(p));
  }
  if (!r || typeof r != "object" || Array.isArray(r)) throw new Error("请求体须为 JSON 对象");
  const a = n.protocol.path.match(/\/models\/([^/?]+):generateContent(?:\?|$)/),
    i = !!a || Array.isArray(r.contents) && r.contents.some(s => s && Array.isArray(s.parts));
  if (i) {
    const s = C6n();
    n.protocol = {
      ...n.protocol,
      referenceMode: s.referenceMode,
      resultPaths: s.resultPaths,
      base64Paths: s.base64Paths,
      path: a ? n.protocol.path.replace(/(\/models\/)[^/?]+(:generateContent)/, "$1{model}$2") : s.path
    }, a && !/[{}$<>]/.test(decodeURIComponent(a[1])) && (n.modelName = decodeURIComponent(a[1]));
    const l = r.contents;
    if (!Array.isArray(l)) throw new Error("Gemini 示例须包含 contents 和 parts，请粘贴完整请求");
    const d = l.map(m => !!m && (!m.role || m.role === "user")).lastIndexOf(!0);
    if (d < 0 || !Array.isArray(l[d].parts)) throw new Error("Gemini 示例中未找到用户输入 parts");
    let u = !1,
      h = !1;
    const p = l[d].parts.flatMap(m => {
      const f = m && typeof m == "object" ? m : void 0;
      return m === "$imageParts" || f != null && f.inlineData || f != null && f.inline_data || f != null && f.fileData || f != null && f.file_data ? h ? [] : (h = !0, ["$imageParts"]) : typeof (f == null ? void 0 : f.text) == "string" && !u ? (u = !0, [{
        ...f,
        text: "$prompt"
      }]) : [m];
    });
    u || p.unshift({
      text: "$prompt"
    }), h || p.push("$imageParts"), r.contents = l.map((m, f) => f === d ? {
      ...m,
      parts: p
    } : m);
  }
  const o = (s, l = "") => {
    const d = l.toLowerCase();
    return i && d === "contents" ? s : (d === "model" && typeof s == "string" && (n.modelName = s), d === "resolution" && typeof s == "string" && (n.resolution = s), i && ["imagesize", "image_size"].includes(d) ? (typeof s == "string" && !s.startsWith("$") && (n.resolution = s), "$resolution") : (["duration", "seconds"].includes(d) && ["string", "number"].includes(typeof s) && (n.duration = `${parseFloat(String(s))}s`), typeof s == "string" && s.startsWith("$") ? s : t1t[d] ? d === "duration" || d === "seconds" ? typeof s == "string" ? "$durationText" : "$duration" : t1t[d] : Array.isArray(s) ? s.map(u => o(u)) : s && typeof s == "object" ? Object.fromEntries(Object.entries(s).map(([u, h]) => [u, o(h, u)])) : s));
  };
  return n.protocol.body = o(r), n.key && /\$|^<|YOUR_|API_KEY|替换|你的/i.test(n.key) && (n.key = void 0), n;
}

function vk({
  label: e,
  ...t
}) {
  const n = g.useId();
  return c.jsx(qs, {
    ...t,
    scopeId: n,
    dropdownType: "custom-model",
    ariaLabel: e,
    menuPlacement: "auto",
    maxMenuHeight: 360,
    className: "[&_.node-dropdown-button]:rounded-lg [&_.node-dropdown-button]:px-3 [&_.node-dropdown-button]:py-2 [&_.node-dropdown-button]:text-sm"
  });
}

const DTa = [{
    value: "fixed",
    label: "固定值"
  }, ...Object.entries(xWe).filter(([e]) => e !== "$taskId").map(([e, t]) => ({
    value: e,
    label: t
  }))],
  efe = e => e.split(/[,，\s]+/).filter(Boolean),
  LTa = e => [...new Set(e.split(/[,，]/).map(t => t.trim()).filter(Boolean))],
  zNe = e => {
    const t = JSON.parse(e);
    if (!t || typeof t != "object" || Array.isArray(t)) throw new Error("请填写 JSON 对象");
    return t;
  },
  Aat = e => {
    try {
      zNe(e.value), e.setCustomValidity("");
    } catch {
      e.setCustomValidity("请填写有效的 JSON 对象");
    }
  };

function OTa({
  config: e,
  inputClass: t,
  dropdown: n,
  update: r
}) {
  var k, A, S, C, I, E, M, T, P;
  on();
  const a = e.customProtocol,
    i = /"\$(images|firstImage|lastImage|imageParts)"/.test(JSON.stringify(a.body)),
    [o, s] = g.useState(""),
    [l, d] = g.useState(""),
    [u, h] = g.useState(""),
    [p, m] = g.useState(""),
    [f, y] = g.useState(null),
    b = R => r({
      customProtocol: {
        ...a,
        ...R
      }
    }),
    v = (R, j) => b({
      body: {
        ...a.body,
        [R]: j
      }
    }),
    _ = R => b({
      poll: {
        ...a.poll,
        ...R
      }
    }),
    w = () => {
      try {
        const R = JSON.parse(p),
          j = [],
          B = (V, O, L, D = 0) => {
            D > 12 || (Array.isArray(V) ? V.slice(0, 1).forEach(U => B(U, `${O}.*`, L, D + 1)) : V && typeof V == "object" ? Object.entries(V).forEach(([U, H]) => B(H, O ? `${O}.${U}` : U, U, D + 1)) : j.push({
              path: O,
              key: L,
              value: V
            }));
          };
        B(R, "", "");
        const F = j.filter(V => typeof V.value == "string" && /^https?:\/\//.test(V.value) && /url|image|video|output|result/i.test(V.path)),
          N = j.find(V => /^(task_id|taskId|request_id|id)$/.test(V.key)),
          G = j.find(V => /^(status|state)$/.test(V.key)),
          z = j.filter(V => /^(b64_json|base64)$/.test(V.key) || /\.inline(?:Data|_data)\.data$/.test(V.path));
        b({
          ...(F.length ? {
            resultPaths: F.map(V => V.path)
          } : {}),
          ...(z.length && e.type === "Image" ? {
            base64Paths: z.map(V => V.path)
          } : {}),
          ...(a.poll ? {
            poll: {
              ...a.poll,
              ...(N ? {
                taskIdPath: N.path
              } : {}),
              ...(G ? {
                statusPath: G.path
              } : {})
            }
          } : {})
        }), m(""), d(""), h(F.length || z.length ? "已填入识别到的结果字段，请核对；查询地址和状态值仍以服务商文档为准。" : "示例中没有结果地址。已识别到的任务字段已填入，请补充成功时的图片或视频响应。");
      } catch {
        d("响应示例不是有效 JSON");
      }
    };
  return c.jsxs("div", {
    className: "space-y-4",
    children: [c.jsxs("div", {
      className: "space-y-2 rounded-xl border border-zinc-500/30 p-3",
      children: [c.jsx("label", {
        className: "block text-sm",
        htmlFor: "custom-api-example",
        children: x("粘贴接口示例（cURL 或请求体 JSON）")
      }), c.jsx("textarea", {
        id: "custom-api-example",
        className: `${t} font-mono text-xs`,
        rows: 3,
        value: o,
        onChange: R => s(R.target.value)
      }), c.jsx("button", {
        type: "button",
        className: "rounded-lg border border-zinc-500 px-3 py-1.5 text-xs",
        onClick: () => {
          try {
            const R = yQn(o);
            r({
              customProtocol: {
                ...R.protocol,
                ...(e.type === "Video" ? {
                  base64Paths: []
                } : {})
              },
              ...(R.url ? {
                url: R.url
              } : {}),
              ...(R.modelName ? {
                modelName: R.modelName
              } : {}),
              ...(e.apiProviderId && (R.url || R.key) ? {
                inheritProviderConnection: !1
              } : {}),
              ...(R.key ? {
                key: R.key,
                savedApiKeyId: void 0
              } : {}),
              ...(R.resolution ? {
                resolutions: [R.resolution]
              } : {}),
              ...(R.duration ? {
                durations: [R.duration]
              } : {})
            }), s(""), y(null), d(""), h(JSON.stringify(R.protocol.body).includes('"$imageParts"') ? "已识别 Gemini 原生生图：模型 ID、提示词、全部参考图及返回图片字段已填入，请核对地址和认证方式。" : "已识别请求。请核对参数对应关系；异步接口还需展开下方设置查询地址。");
          } catch (R) {
            d(R instanceof Error ? R.message : "无法解析示例");
          }
        },
        children: x("识别并填入")
      }), c.jsx("p", {
        className: "text-xs opacity-60",
        children: x("只在本机解析示例，不执行 cURL，不会发起生成或读取其中的本地文件。")
      })]
    }), u && c.jsx("p", {
      role: "status",
      className: "text-xs opacity-75",
      children: u
    }), l && c.jsx("p", {
      role: "alert",
      className: "text-xs text-red-400",
      children: l
    }), c.jsx("p", {
      className: `text-xs leading-relaxed ${i ? "opacity-65" : "text-amber-500"}`,
      role: "status",
      children: x(i ? "已配置参考图映射，生成时会读取画布中的参考图。" : "尚未配置参考图：纯文本生成可用；图生图请粘贴含图片的接口示例，或选择 Gemini 原生生图模板。")
    }), c.jsxs("details", {
      className: "rounded-xl border border-zinc-500/30 p-3",
      children: [c.jsxs("summary", {
        className: "cursor-pointer text-sm",
        children: [x("请求地址与参数对应（"), Object.keys(a.body).length, x(" 项）")]
      }), c.jsxs("div", {
        className: "mt-3 space-y-3",
        children: [c.jsxs("label", {
          className: "block space-y-1 text-sm",
          children: [c.jsx("span", {
            children: x("提交路径")
          }), c.jsx("input", {
            "aria-label": x("提交路径"),
            className: t,
            value: a.path,
            onChange: R => b({
              path: R.target.value
            }),
            placeholder: "/v1/image/generations"
          }), c.jsx("small", {
            className: "opacity-65",
            children: x("路径中的 {model} 使用上方模型 ID，与显示名称无关。")
          })]
        }), c.jsxs("div", {
          className: "grid grid-cols-2 gap-3",
          children: [c.jsxs("div", {
            className: "space-y-1 text-sm",
            children: [c.jsx("span", {
              children: x("请求格式")
            }), c.jsx(vk, {
              label: x("请求格式"),
              ...n,
              value: a.format,
              onSelect: R => b({
                format: R
              }),
              options: [{
                value: "json",
                label: "JSON"
              }, {
                value: "multipart",
                label: "文件表单（multipart）"
              }]
            })]
          }), c.jsxs("div", {
            className: "space-y-1 text-sm",
            children: [c.jsx("span", {
              children: x("参考图传递")
            }), c.jsx(vk, {
              label: x("参考图传递"),
              ...n,
              disabled: a.format === "multipart",
              value: a.referenceMode,
              onSelect: R => b({
                referenceMode: R
              }),
              options: [{
                value: "url",
                label: "URL（本地图片沿用 OSS 上传）"
              }, {
                value: "dataUrl",
                label: "Base64 Data URL"
              }]
            })]
          })]
        }), c.jsxs("div", {
          className: "space-y-2",
          children: [c.jsx("p", {
            className: "text-sm",
            children: x("接口参数对应画布")
          }), c.jsx("p", {
            className: "text-xs opacity-60",
            children: x("右侧选择画布值；其他参数保留示例中的固定值。嵌套对象可在高级设置中编辑。")
          }), Object.entries(a.body).map(([R, j]) => {
            const B = typeof j == "string" && Object.prototype.hasOwnProperty.call(xWe, j);
            return c.jsxs("div", {
              className: "grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_24px] items-start gap-2",
              children: [c.jsx("span", {
                className: "truncate pt-2 font-mono text-xs",
                title: R,
                children: R
              }), c.jsxs("div", {
                className: "space-y-1",
                children: [c.jsx(vk, {
                  label: x("{0} 对应画布", R),
                  value: B ? String(j) : "fixed",
                  options: DTa,
                  ...n,
                  onSelect: F => v(R, F === "fixed" ? "" : F)
                }), !B && c.jsx("input", {
                  "aria-label": x("{0} 固定值", R),
                  className: t,
                  defaultValue: typeof j == "string" ? j : JSON.stringify(j),
                  onBlur: F => {
                    try {
                      v(R, JSON.parse(F.target.value));
                    } catch {
                      v(R, F.target.value);
                    }
                  }
                }, JSON.stringify(j))]
              }), c.jsx("button", {
                type: "button",
                className: "pt-2",
                "aria-label": x("删除参数 {0}", R),
                onClick: () => b({
                  body: Object.fromEntries(Object.entries(a.body).filter(([F]) => F !== R))
                }),
                children: "×"
              })]
            }, R);
          }), c.jsx("input", {
            "aria-label": x("添加接口参数"),
            placeholder: x("输入新字段名，按 Enter 添加"),
            className: t,
            onKeyDown: R => {
              if (R.key !== "Enter") return;
              R.preventDefault();
              const j = R.currentTarget.value.trim();
              !j || ["__proto__", "constructor", "prototype"].includes(j) || (v(j, ""), R.currentTarget.value = "");
            }
          })]
        })]
      })]
    }), c.jsxs("details", {
      className: "rounded-xl border border-zinc-500/30 p-3",
      open: !!a.poll,
      children: [c.jsx("summary", {
        className: "cursor-pointer text-sm",
        children: x("任务查询与返回结果")
      }), c.jsxs("div", {
        className: "mt-3 space-y-3",
        children: [c.jsxs("label", {
          className: "flex gap-2 text-sm",
          children: [c.jsx("input", {
            type: "checkbox",
            checked: !!a.poll,
            onChange: R => b({
              poll: R.target.checked ? {
                path: "",
                method: "GET",
                taskIdPath: "data.id",
                statusPath: "data.status",
                successValues: ["SUCCESS", "completed", "succeeded"],
                failureValues: ["FAILED", "FAILURE", "error", "cancelled"]
              } : void 0
            })
          }), x("先返回任务 ID，再查询结果（异步）")]
        }), a.poll && c.jsxs(c.Fragment, {
          children: [c.jsxs("label", {
            className: "block space-y-1 text-sm",
            children: [c.jsxs("span", {
              children: [x("查询路径（任务 ID 用 "), "{id}", "）"]
            }), c.jsx("input", {
              className: t,
              value: a.poll.path,
              onChange: R => _({
                path: R.target.value
              }),
              placeholder: "/v1/image/generations/{id}"
            })]
          }), c.jsxs("div", {
            className: "space-y-1 text-sm",
            children: [c.jsx("span", {
              children: x("查询方式")
            }), c.jsx(vk, {
              label: x("查询方式"),
              ...n,
              value: a.poll.method,
              onSelect: R => _({
                method: R
              }),
              options: [{
                value: "GET",
                label: "GET"
              }, {
                value: "POST",
                label: "POST"
              }]
            })]
          }), ["taskIdPath", "statusPath"].map(R => c.jsxs("label", {
            className: "block space-y-1 text-sm",
            children: [c.jsx("span", {
              children: x(R === "taskIdPath" ? "提交返回的任务 ID 字段" : "查询返回的状态字段")
            }), c.jsx("input", {
              className: t,
              value: a.poll[R],
              onChange: j => _({
                [R]: j.target.value
              })
            })]
          }, R)), ["successValues", "failureValues"].map(R => c.jsxs("label", {
            className: "block space-y-1 text-sm",
            children: [c.jsx("span", {
              children: x(R === "successValues" ? "成功状态值" : "失败状态值")
            }), c.jsx("input", {
              className: t,
              defaultValue: a.poll[R].join(", "),
              onBlur: j => _({
                [R]: efe(j.target.value)
              })
            })]
          }, R))]
        }), c.jsxs("label", {
          className: "block space-y-1 text-sm",
          children: [c.jsx("span", {
            children: x("结果地址字段（多项用逗号分隔）")
          }), c.jsx("input", {
            className: t,
            defaultValue: a.resultPaths.join(", "),
            onBlur: R => b({
              resultPaths: efe(R.target.value)
            }),
            placeholder: "data.images.*.url"
          }, a.resultPaths.join(","))]
        }), e.type === "Image" && c.jsxs("label", {
          className: "block space-y-1 text-sm",
          children: [c.jsx("span", {
            children: x("Base64 图片字段（可选）")
          }), c.jsx("input", {
            className: t,
            defaultValue: ((k = a.base64Paths) == null ? void 0 : k.join(", ")) || "",
            onBlur: R => b({
              base64Paths: efe(R.target.value)
            })
          }, (A = a.base64Paths) == null ? void 0 : A.join(","))]
        }), c.jsxs("label", {
          className: "block space-y-1 text-sm",
          children: [c.jsx("span", {
            children: x("失败原因字段")
          }), c.jsx("input", {
            className: t,
            value: a.errorPath || "",
            onChange: R => b({
              errorPath: R.target.value
            })
          })]
        }), c.jsxs("label", {
          className: "block space-y-1 text-sm",
          children: [c.jsx("span", {
            children: x("粘贴响应 JSON 帮助识别字段")
          }), c.jsx("textarea", {
            rows: 3,
            className: t,
            value: p,
            onChange: R => m(R.target.value)
          })]
        }), c.jsx("button", {
          type: "button",
          className: "text-sm underline",
          onClick: w,
          children: x("识别响应字段")
        })]
      })]
    }), c.jsxs("details", {
      className: "rounded-xl border border-zinc-500/30 p-3",
      children: [c.jsx("summary", {
        className: "cursor-pointer text-sm",
        children: x("画布选项与高级设置")
      }), c.jsxs("div", {
        className: "mt-3 space-y-3",
        children: [c.jsxs("label", {
          className: "block space-y-1 text-sm",
          children: [c.jsx("span", {
            children: x("画布比例选项")
          }), c.jsx("input", {
            className: t,
            defaultValue: ((S = e.ratios) == null ? void 0 : S.join(", ")) || "",
            placeholder: "1:1, 16:9, portrait, landscape",
            onBlur: R => r({
              ratios: LTa(R.target.value)
            })
          }, (C = e.ratios) == null ? void 0 : C.join(",")), c.jsx("small", {
            className: "opacity-65",
            children: x("按服务商实际取值填写，多项用逗号分隔，会原样发送。")
          })]
        }), c.jsxs("label", {
          className: "block space-y-1 text-sm",
          children: [c.jsx("span", {
            children: x("画布分辨率选项（按服务商实际支持填写）")
          }), c.jsx("input", {
            className: t,
            defaultValue: ((I = e.resolutions) == null ? void 0 : I.join(", ")) || "",
            placeholder: x("1k, 2k, 4k 或 720p, 1080p"),
            onBlur: R => r({
              resolutions: efe(R.target.value)
            })
          }, (E = e.resolutions) == null ? void 0 : E.join(","))]
        }), e.type === "Video" && c.jsxs("label", {
          className: "block space-y-1 text-sm",
          children: [c.jsx("span", {
            children: x("画布时长选项")
          }), c.jsx("input", {
            className: t,
            defaultValue: ((M = e.durations) == null ? void 0 : M.join(", ")) || "",
            placeholder: "5s, 10s",
            onBlur: R => r({
              durations: efe(R.target.value).map(j => j.endsWith("s") ? j : `${j}s`)
            })
          }, (T = e.durations) == null ? void 0 : T.join(","))]
        }), c.jsxs("div", {
          className: "space-y-1 text-sm",
          children: [c.jsx("span", {
            children: x("认证方式")
          }), c.jsx(vk, {
            label: x("认证方式"),
            ...n,
            value: a.auth,
            onSelect: R => b({
              auth: R
            }),
            options: [{
              value: "bearer",
              label: "Bearer Key"
            }, {
              value: "header",
              label: "自定义 Key Header"
            }, {
              value: "none",
              label: "无需认证"
            }]
          })]
        }), a.auth === "header" && c.jsxs("label", {
          className: "block space-y-1 text-sm",
          children: [c.jsx("span", {
            children: x("认证 Header 名称")
          }), c.jsx("input", {
            className: t,
            value: a.authHeader || "",
            placeholder: "x-api-key",
            onChange: R => b({
              authHeader: R.target.value
            })
          })]
        }), c.jsxs("label", {
          className: "block space-y-1 text-sm",
          children: [c.jsx("span", {
            children: x("附加 Headers（JSON）")
          }), c.jsx("textarea", {
            className: t,
            rows: 2,
            defaultValue: JSON.stringify(a.headers || {}, null, 2),
            onChange: R => Aat(R.currentTarget),
            onBlur: R => {
              try {
                b({
                  headers: zNe(R.target.value)
                }), d("");
              } catch {
                d("Headers JSON 不合法，尚未应用");
              }
            }
          }, JSON.stringify(a.headers))]
        }), c.jsxs("label", {
          className: "block space-y-1 text-sm",
          children: [c.jsx("span", {
            children: x("完整请求参数（支持嵌套 JSON）")
          }), c.jsx("textarea", {
            className: `${t} font-mono text-xs`,
            rows: 5,
            value: f ?? JSON.stringify(a.body, null, 2),
            onChange: R => {
              y(R.target.value), Aat(R.currentTarget);
            },
            onBlur: R => {
              try {
                b({
                  body: zNe(R.target.value)
                }), y(null), d("");
              } catch {
                d("请求参数 JSON 不合法");
              }
            }
          })]
        }), ((P = a.poll) == null ? void 0 : P.method) === "POST" && c.jsxs("label", {
          className: "block space-y-1 text-sm",
          children: [c.jsx("span", {
            children: x('查询请求体（任务 ID 使用 "$taskId"）')
          }), c.jsx("textarea", {
            className: t,
            rows: 2,
            defaultValue: JSON.stringify(a.poll.body || {
              id: "$taskId"
            }),
            onChange: R => Aat(R.currentTarget),
            onBlur: R => {
              try {
                _({
                  body: zNe(R.target.value)
                }), d("");
              } catch {
                d("查询请求体 JSON 不合法，尚未应用");
              }
            }
          })]
        })]
      })]
    })]
  });
}

function BTa({
  config: e,
  dropdown: t,
  update: n
}) {
  var s;
  on();
  const r = N1.filter(l => l.type === e.type && !l.isCustom),
    a = T6n(e.modelName, e.type, r),
    i = e.canvasUiTemplateId ?? e.templateId ?? "",
    o = l => {
      var d;
      return n({
        canvasUiTemplateId: l,
        ...(e.customProtocol && !((d = e.discoveredMetadata) != null && d.schema) ? {
          ratios: l ? ah(l) : ["1:1", "16:9", "9:16"],
          resolutions: l ? rl(l) : [],
          durations: e.type === "Video" && l ? ih(l) : void 0
        } : {})
      });
    };
  return c.jsxs("div", {
    className: "space-y-2 text-sm",
    children: [c.jsx("span", {
      children: x("画布参数映射")
    }), c.jsx(vk, {
      ...t,
      label: x("画布参数映射"),
      value: i,
      onSelect: o,
      options: [{
        value: "",
        label: "通用参数（手动设置选项）"
      }, ...r.map(l => ({
        value: l.id,
        label: l.provider
      }))]
    }), c.jsx("p", {
      className: "text-xs opacity-65",
      children: x("复用比例、分辨率、时长及画质控件；模型 ID、接口路径和请求字段由上方接口模板决定。")
    }), a && i !== a && c.jsxs("button", {
      type: "button",
      className: "text-xs underline",
      onClick: () => o(a),
      children: [x("按名称推荐："), (s = r.find(l => l.id === a)) == null ? void 0 : s.provider]
    })]
  });
}

function RDt({
  initial: e,
  templates: t,
  editing: n,
  isDark: r,
  onSave: a,
  onClose: i,
  connection: o
}) {
  var k, A, S, C;
  on();
  const s = g.useRef(null),
    [l, d] = g.useState(() => e.type === "Chat" ? {
      ...e,
      chatProtocol: e.chatProtocol || jhe()
    } : e),
    [u, h] = g.useState(null),
    p = {
      isDark: r,
      activeDropdown: u,
      setActiveDropdown: h
    },
    [m, f] = g.useState(((k = e.durations) == null ? void 0 : k.join(", ")) || ""),
    [y, b] = g.useState(""),
    v = l.type === "Image" && !!l.customProtocol && JSON.stringify(l.customProtocol.body).includes('"$imageParts"');
  g.useEffect(() => {
    var I;
    (I = s.current) == null || I.showModal();
  }, []);
  const _ = `w-full rounded-lg border px-3 py-2 text-sm ${r ? "border-zinc-700 bg-zinc-900 text-zinc-100" : "border-zinc-300 bg-white text-zinc-900"}`,
    w = I => {
      d(E => ({
        ...E,
        ...I
      })), b("");
    };
  return Da.createPortal(c.jsx("dialog", {
    ref: s,
    "aria-label": x(n ? "编辑自定义模型" : "添加自定义模型"),
    onCancel: I => {
      u ? (I.preventDefault(), h(null)) : i();
    },
    onClick: I => {
      I.target === I.currentTarget && i();
    },
    className: `settings-custom-model-dialog ${l.customProtocol ? "w-[680px]" : "w-[520px]"} max-w-[calc(100vw-32px)] max-h-[90vh] overflow-y-auto rounded-2xl border p-6 backdrop:bg-black/50 ${r ? "border-zinc-700 bg-zinc-800 text-zinc-100" : "border-zinc-300 bg-white text-zinc-900"}`,
    children: c.jsxs("form", {
      className: "space-y-4",
      onSubmit: I => {
        I.preventDefault();
        const E = {
            ...l,
            provider: l.provider.trim(),
            modelName: l.modelName.trim(),
            url: l.url.trim().replace(/\/+$/, ""),
            key: l.key.trim(),
            followGlobalBaseUrl: !1,
            durations: l.customProtocol ? l.durations : l.type === "Video" ? [...new Set(m.split(/[,，\s]+/).filter(Boolean).map(T => T.endsWith("s") ? T : `${T}s`))] : void 0
          },
          M = sTt(E);
        if (M) {
          b(M);
          return;
        }
        a(E);
      },
      children: [c.jsx("h2", {
        className: "text-lg font-semibold",
        children: x(n ? "编辑自定义模型" : "添加自定义模型")
      }), c.jsxs("label", {
        className: "block space-y-1 text-sm",
        children: [c.jsx("span", {
          children: x("显示名称")
        }), c.jsx("input", {
          "aria-label": x("显示名称"),
          className: _,
          value: l.provider,
          onChange: I => w({
            provider: I.target.value
          }),
          placeholder: x("例如：香蕉修图"),
          required: !0
        }), c.jsx("small", {
          className: "block opacity-65",
          children: x("仅用于界面显示；收起时最多显示 8 个字符，展开可查看完整名称。")
        })]
      }), c.jsxs("label", {
        className: "block space-y-1 text-sm",
        children: [c.jsx("span", {
          children: x("模型 ID")
        }), c.jsx("input", {
          "aria-label": x("模型 ID"),
          className: _,
          value: l.modelName,
          onChange: I => {
            var P;
            const E = I.target.value,
              M = l.autoMatchTemplate && !l.customProtocol && _We(E, l.type),
              T = M ? t.find(R => R.id === M) : void 0;
            if (T) {
              const R = aOe(T, l.id);
              w({
                modelName: E,
                templateId: R.templateId,
                durations: R.durations,
                resolutions: R.resolutions
              }), f(((P = R.durations) == null ? void 0 : P.join(", ")) || "");
            } else w({
              modelName: E
            });
          },
          required: !0
        }), c.jsx("small", {
          className: "block opacity-65",
          children: x("实际发送给服务商的 model，请与服务商模型列表保持一致；修改显示名称不会改变它。")
        })]
      }), c.jsxs("div", {
        className: "space-y-1 text-sm",
        children: [c.jsx("span", {
          children: x("接口模板")
        }), c.jsx(vk, {
          label: x("接口模板"),
          ...p,
          value: l.type === "Chat" ? ((A = l.nativeChat) == null ? void 0 : A.protocol) || l.chatProtocol || "chat" : v ? "gemini-image" : l.customProtocol ? "http" : l.templateId || "",
          options: l.type === "Chat" ? [{
            value: "chat",
            label: "Chat Completions 兼容接口"
          }, {
            value: "responses",
            label: "Responses 兼容接口"
          }, {
            value: "gemini",
            label: "Gemini 原生接口"
          }, {
            value: "anthropic",
            label: "Anthropic Messages 原生接口"
          }, {
            value: "azure",
            label: "Azure OpenAI 原生接口"
          }] : [{
            value: "http",
            label: "通用 HTTP（粘贴接口示例）"
          }, ...(l.type === "Image" ? [{
            value: "gemini-image",
            label: "Gemini 原生生图（generateContent）"
          }] : []), ...t.map(I => ({
            value: I.id,
            label: `${I.provider} 兼容接口`
          }))],
          onSelect: I => {
            var T, P;
            if (l.type === "Chat") {
              w({
                chatProtocol: I === "responses" ? "responses" : "chat",
                nativeChat: ["gemini", "anthropic", "azure"].includes(I) ? {
                  protocol: I,
                  apiVersion: ((T = l.nativeChat) == null ? void 0 : T.apiVersion) || "v1"
                } : void 0
              });
              return;
            }
            if (I === "gemini-image") {
              const R = C6n(),
                j = o && l.inheritProviderConnection !== !1 ? o.url : l.url;
              /\/v1(?:beta)?\/?$/.test(j) && (R.path = "/models/{model}:generateContent"), /^https:\/\/generativelanguage\.googleapis\.com(?:\/|$)/.test(j) && (R.auth = "header", R.authHeader = "x-goog-api-key"), w({
                templateId: void 0,
                autoMatchTemplate: !1,
                customProtocol: R,
                resolutions: [],
                ratios: ["1:1", "16:9", "9:16"]
              });
              return;
            }
            if (I === "http") {
              w({
                templateId: void 0,
                autoMatchTemplate: !1,
                customProtocol: {
                  ...bZ(),
                  ...(l.type === "Video" ? {
                    path: "/v1/videos",
                    base64Paths: []
                  } : {})
                },
                resolutions: [],
                ratios: l.type === "Video" ? ["16:9", "9:16"] : ["1:1", "16:9", "9:16"]
              });
              return;
            }
            const E = t.find(R => R.id === I);
            if (!E) return;
            const M = aOe(E, l.id);
            M.autoMatchTemplate = !1, M.canvasUiTemplateId = l.canvasUiTemplateId, M.discoveredMetadata = l.discoveredMetadata, o && Object.assign(M, {
              apiProviderId: l.apiProviderId,
              inheritProviderConnection: l.inheritProviderConnection,
              url: l.url,
              key: l.key,
              savedApiKeyId: l.savedApiKeyId,
              enabled: l.enabled,
              providerPausedEnabled: l.providerPausedEnabled
            }), d({
              ...M,
              provider: l.provider || M.provider,
              modelName: l.modelName || M.modelName,
              key: l.key,
              savedApiKeyId: l.savedApiKeyId,
              url: l.url
            }), f(((P = M.durations) == null ? void 0 : P.join(", ")) || ""), b("");
          }
        })]
      }), c.jsx("p", {
        className: "text-xs opacity-65 leading-relaxed",
        children: l.nativeChat ? x("使用 {0} 原生格式，自动转换对话、图片和工具调用。", l.nativeChat.protocol === "gemini" ? "Gemini generateContent" : l.nativeChat.protocol === "anthropic" ? "Anthropic Messages" : "Azure OpenAI（模型 ID 填部署名）") : v ? x("已映射画布提示词、全部参考图和返回图片。提交路径及认证方式以服务商文档为准，也可粘贴完整 cURL 自动填入。") : l.customProtocol ? x("自定义提交路径、参数和返回格式。保存后继续在画布原有模型列表中使用。") : l.type === "Chat" ? x("使用 {0} 请求格式。每个模型可单独配置地址和 Key，选择模型时自动使用对应协议。", l.chatProtocol === "responses" ? "Responses（/v1/responses）" : "Chat Completions（/v1/chat/completions）") : l.type === "Image" ? x("沿用 GPT Image 的文生图、参考图和蒙版编辑格式；尺寸按现有比例选项转换。") : x("沿用 Sora 网关的提交、参考图和任务轮询格式。服务商需兼容 /v2/videos/generations。")
      }), l.discoveredMetadata && c.jsxs("details", {
        className: "rounded-xl border border-zinc-500/30 p-3 text-xs",
        children: [c.jsxs("summary", {
          className: "cursor-pointer",
          children: [x("模型目录提供的接口信息 · "), l.discoveredMetadata.parameters.length, x(" 个参数")]
        }), c.jsx("p", {
          className: "mt-2 break-words",
          children: l.discoveredMetadata.endpoints.join("、") || x("未提供接口路径")
        }), c.jsx("p", {
          className: "mt-2 break-words",
          children: l.discoveredMetadata.parameters.join("、") || x("未提供字段说明")
        }), l.discoveredMetadata.note && c.jsx("p", {
          className: "mt-2",
          children: l.discoveredMetadata.note
        }), l.discoveredMetadata.schema && c.jsx("pre", {
          className: "mt-2 max-h-40 overflow-auto whitespace-pre-wrap",
          children: JSON.stringify(l.discoveredMetadata.schema, null, 2)
        })]
      }), l.type === "Chat" && c.jsxs("details", {
        className: "rounded-xl border border-zinc-500/30 p-3 text-sm",
        children: [c.jsx("summary", {
          className: "cursor-pointer",
          children: x("Harness 模型能力")
        }), c.jsx("p", {
          className: "my-2 text-xs opacity-65",
          children: x("按当前渠道的文档填写。留空沿用默认值；不会自动发起付费探测。")
        }), ["contextWindow", "maxOutputTokens"].map(I => {
          var E;
          return c.jsxs("label", {
            className: "block my-2",
            children: [c.jsx("span", {
              children: x(I === "contextWindow" ? "上下文窗口（token）" : "单次最大输出（token）")
            }), c.jsx("input", {
              className: _,
              type: "number",
              min: 1024,
              max: 1e7,
              step: 1,
              value: ((E = l.chatCapabilities) == null ? void 0 : E[I]) ?? "",
              placeholder: x("自动"),
              onChange: M => {
                const T = {
                  ...l.chatCapabilities
                };
                M.target.value ? T[I] = Number(M.target.value) : delete T[I], w({
                  chatCapabilities: T
                });
              }
            })]
          }, I);
        }), c.jsxs("div", {
          className: "my-2",
          children: [c.jsx("span", {
            children: x("工具调用")
          }), c.jsx(vk, {
            label: x("工具调用"),
            ...p,
            value: ((S = l.chatCapabilities) == null ? void 0 : S.tools) === void 0 ? "auto" : String(l.chatCapabilities.tools),
            options: [{
              value: "auto",
              label: "自动（沿用当前支持）"
            }, {
              value: "true",
              label: "支持"
            }, {
              value: "false",
              label: "不支持"
            }],
            onSelect: I => {
              const E = {
                ...l.chatCapabilities
              };
              I === "auto" ? delete E.tools : E.tools = I === "true", w({
                chatCapabilities: E
              });
            }
          })]
        })]
      }), l.type !== "Chat" && c.jsx(BTa, {
        config: l,
        dropdown: p,
        update: w
      }), l.customProtocol && c.jsx(OTa, {
        config: l,
        inputClass: _,
        dropdown: p,
        update: w
      }), ((C = l.nativeChat) == null ? void 0 : C.protocol) === "azure" && c.jsxs("label", {
        className: "block space-y-1 text-sm",
        children: [c.jsx("span", {
          children: x("Azure API 版本")
        }), c.jsx("input", {
          className: _,
          value: l.nativeChat.apiVersion || "v1",
          onChange: I => w({
            nativeChat: {
              protocol: "azure",
              apiVersion: I.target.value
            }
          })
        }), c.jsx("small", {
          children: x("v1 使用新版接口；日期版本使用部署接口。")
        })]
      }), o && c.jsxs("label", {
        className: "flex items-center gap-2 text-sm",
        children: [c.jsx("input", {
          type: "checkbox",
          checked: l.inheritProviderConnection !== !1,
          onChange: I => w({
            inheritProviderConnection: I.target.checked,
            ...(I.target.checked ? {
              url: o.url,
              key: o.key,
              savedApiKeyId: o.savedApiKeyId,
              followGlobalBaseUrl: !1
            } : {})
          })
        }), x("使用「"), o.name, x("」的地址和密钥")]
      }), (!o || l.inheritProviderConnection === !1) && c.jsxs(c.Fragment, {
        children: [c.jsxs("label", {
          className: "block space-y-1 text-sm",
          children: [c.jsx("span", {
            children: x("接口地址（Base URL）")
          }), c.jsx("input", {
            className: _,
            type: "url",
            value: l.url,
            onChange: I => w({
              url: I.target.value
            }),
            required: !0
          })]
        }), c.jsxs("label", {
          className: "block space-y-1 text-sm",
          children: [c.jsx("span", {
            children: x("API Key（留空沿用全局 Key）")
          }), c.jsx("input", {
            className: _,
            type: "password",
            autoComplete: "off",
            value: l.key,
            onChange: I => w({
              key: I.target.value,
              savedApiKeyId: void 0
            })
          })]
        }), l.savedApiKeyId && c.jsx("p", {
          className: "text-xs opacity-65",
          children: x("当前使用已保存的 Key；可在模型卡片的 Key 下拉中切换。")
        })]
      }), l.type === "Image" && !l.customProtocol && c.jsxs("div", {
        className: "space-y-1 text-sm",
        children: [c.jsx("span", {
          children: x("返回方式")
        }), c.jsx(vk, {
          label: x("返回方式"),
          ...p,
          value: l.requestMode || "sync",
          onSelect: I => w({
            requestMode: I
          }),
          options: [{
            value: "sync",
            label: "同步返回图片"
          }, {
            value: "async",
            label: "异步任务（需服务商支持画布现有轮询协议）"
          }]
        })]
      }), l.type === "Video" && !l.customProtocol && c.jsxs(c.Fragment, {
        children: [c.jsxs("label", {
          className: "block space-y-1 text-sm",
          children: [c.jsx("span", {
            children: x("可选时长（秒，用逗号分隔）")
          }), c.jsx("input", {
            className: _,
            value: m,
            onChange: I => f(I.target.value),
            placeholder: "5s, 10s",
            required: !0
          })]
        }), c.jsxs("fieldset", {
          className: "space-y-2 text-sm",
          children: [c.jsx("legend", {
            children: x("可选分辨率")
          }), (l.templateId === "sora-2-pro" ? ["720P", "1080P"] : ["720P"]).map(I => {
            var E;
            return c.jsxs("label", {
              className: "mr-4 inline-flex items-center gap-2",
              children: [c.jsx("input", {
                type: "checkbox",
                checked: ((E = l.resolutions) == null ? void 0 : E.includes(I)) || !1,
                onChange: M => {
                  var T;
                  return w({
                    resolutions: M.target.checked ? [...(l.resolutions || []), I] : (T = l.resolutions) == null ? void 0 : T.filter(P => P !== I)
                  });
                }
              }), I]
            }, I);
          }), c.jsx("p", {
            className: "text-xs opacity-65",
            children: x("分辨率沿用模板能力；Pro 的 1080P 使用高清参数。")
          })]
        })]
      }), y && c.jsx("p", {
        role: "alert",
        className: "text-sm text-red-400",
        children: y
      }), c.jsxs("div", {
        className: "flex justify-end gap-3 pt-2",
        children: [c.jsx("button", {
          type: "button",
          className: "rounded-lg border border-zinc-500 px-4 py-2 text-sm",
          onClick: i,
          children: x("取消")
        }), c.jsx("button", {
          type: "submit",
          className: "rounded-lg bg-zinc-100 px-4 py-2 text-sm text-zinc-900",
          children: x("保存模型")
        })]
      })]
    })
  }), document.body);
}

function JYe() {
  return typeof window < "u" && "__TAURI__" in window;
}

function bQn() {
  return !1;
}

function vQn() {
  const e = bQn(),
    t = JYe();
  let n = "",
    r = "";
  return t ? (n = "http://127.0.0.1:9527", r = "/api/proxy") : (n = "https://dashscope.aliyuncs.com", r = ""), {
    isDevelopment: e,
    isTauri: t,
    proxyUrl: n,
    dashscopeProxyPath: r
  };
}

async function wQn() {
  if (!JYe()) return null;
  try {
    return await Fr("get_proxy_server_status");
  } catch (e) {
    return console.error("[Environment] Failed to get proxy server status:", e), null;
  }
}

async function FTa() {
  const e = vQn();
  if (console.log("[Environment] 初始化环境配置:", {
    isDevelopment: e.isDevelopment,
    isTauri: e.isTauri,
    proxyUrl: e.proxyUrl,
    dashscopeProxyPath: e.dashscopeProxyPath
  }), e.isTauri) {
    console.log("[Environment] 等待代理服务器就绪...");
    let t = 0;
    const n = 10;
    for (; t < n;) {
      try {
        const r = await wQn();
        if (r && r.running) {
          console.log("[Environment] 代理服务器已就绪:", r);
          return;
        }
      } catch (r) {
        console.log(`[Environment] 代理服务器检查失败 (${t + 1}/${n}):`, r);
      }
      t++, await new Promise(r => setTimeout(r, 500));
    }
    console.warn("[Environment] 代理服务器启动超时，继续运行");
  } else console.log("[Environment] 不需要启动代理服务器", {
    isDevelopment: e.isDevelopment,
    isTauri: e.isTauri
  });
}

const zTa = Object.freeze(Object.defineProperty({
    __proto__: null,
    getEnvironmentConfig: vQn,
    getTauriProxyServerStatus: wQn,
    initializeEnvironment: FTa,
    isDevelopmentMode: bQn,
    isTauriApp: JYe
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  UTa = "API settings storage",
  $Ta = "api-settings-cache.json",
  AL = {
    API_CONFIGS: "qiaodoumayi_api_configs",
    API_PROVIDERS: "qiaodoumayi_api_providers_v1",
    GLOBAL_KEY: "qiaodoumayi_global_key",
    GLOBAL_BASE_URL: "qiaodoumayi_global_base_url",
    GLOBAL_BASE_URL_OPTIONS: "qiaodoumayi_global_base_url_options",
    SAVED_API_KEYS: "qiaodoumayi_saved_api_keys",
    CUSTOM_KEY_TAG_PRESETS: "qiaodoumayi_custom_key_tag_presets",
    MODEL_FIELD_HISTORY: "qiaodoumayi_model_field_history_v1"
  };

function ote(e, t) {
  if (!e) return t;
  try {
    return JSON.parse(e);
  } catch {
    return t;
  }
}

function GTa() {
  const e = localStorage.getItem(AL.API_CONFIGS),
    t = ote(e, []),
    n = Array.isArray(t) ? t.filter(r => typeof r == "object" && r !== null).map(r => ({
      id: String(r.id ?? ""),
      provider: String(r.provider ?? ""),
      type: typeof r.type == "string" ? r.type : void 0,
      modelName: String(r.modelName ?? ""),
      url: String(r.url ?? "")
    })).filter(r => r.id) : [];
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    globalBaseUrl: localStorage.getItem(AL.GLOBAL_BASE_URL) || "",
    globalApiKey: localStorage.getItem(AL.GLOBAL_KEY) || "",
    globalBaseUrlOptions: ote(localStorage.getItem(AL.GLOBAL_BASE_URL_OPTIONS), []),
    savedApiKeys: ote(localStorage.getItem(AL.SAVED_API_KEYS), []),
    customKeyTagPresets: ote(localStorage.getItem(AL.CUSTOM_KEY_TAG_PRESETS), []),
    modelFieldHistory: ote(localStorage.getItem(AL.MODEL_FIELD_HISTORY), {}),
    apiProviders: ote(localStorage.getItem(AL.API_PROVIDERS), []),
    models: n
  };
}

let ztn = Promise.resolve();

function ZYe() {
  JYe() && (ztn = ztn.then(async () => {
    const e = GTa(),
      {
        mkdir: t,
        writeTextFile: n,
        BaseDirectory: r
      } = await Ie(async () => {
        const {
          mkdir: o,
          writeTextFile: s,
          BaseDirectory: l
        } = await Promise.resolve().then(() => oc);
        return {
          mkdir: o,
          writeTextFile: s,
          BaseDirectory: l
        };
      }, void 0, import.meta.url),
      a = UTa,
      i = `${a}/${$Ta}`;
    await t(a, {
      baseDir: r.Document,
      recursive: !0
    }), await n(i, JSON.stringify(e, null, 2), {
      baseDir: r.Document
    });
  }).catch(e => {
    console.warn("[apiSettingsDiskCache] 写入 API settings storage 失败:", e);
  }));
}

function VTa(e) {
  const t = kz(),
    n = sE(),
    r = new Set([e.id, ...t.filter(o => o.key === e.key).map(o => o.id)]);
  for (const o of n) (o.key === e.key || r.has(`platform-group-${o.group}`)) && r.add(`platform-group-${o.group}`);
  const a = JSON.parse(localStorage.getItem(zce) || "[]"),
    i = o => {
      var s;
      return ((s = o.key) == null ? void 0 : s.trim()) === e.key || r.has(o.savedApiKeyId || "") ? {
        ...o,
        key: "",
        savedApiKeyId: e.id
      } : o;
    };
  localStorage.setItem(N8t, JSON.stringify([...new Set([...j8t(), ...r])])), localStorage.setItem(sce, JSON.stringify(t.filter(o => !r.has(o.id)))), $jn(n.filter(o => !r.has(`platform-group-${o.group}`))), localStorage.setItem(zce, JSON.stringify(a.map(i))), Qa.getGlobalApiKey().trim() === e.key && Qa.setGlobalApiKey(""), Qa.getJimengSuperResApiKey().trim() === e.key && Qa.setJimengSuperResApiKey(""), Qa.updateConfigs(Qa.getConfigs().map(i)), nqe(), ZYe();
}

const xQn = "qiaodoumayi_hide_nav_balance",
  pze = "qiaodoumayi_hide_nav_balance_changed";

function HTa(e) {
  try {
    return localStorage.getItem(e) === "1";
  } catch {
    return !1;
  }
}

function WTa(e, t, n) {
  try {
    localStorage.setItem(e, n ? "1" : "0");
  } catch {}
  window.dispatchEvent(new CustomEvent(t));
}

function n1t() {
  return HTa(xQn);
}

function qTa(e) {
  WTa(xQn, pze, e);
}

function KTa(e, t, n) {
  const [r, a] = g.useState(e);
  g.useEffect(() => {
    const o = () => a(e());
    return window.addEventListener(n, o), () => window.removeEventListener(n, o);
  }, [n, e]);
  const i = g.useCallback(o => {
    t(o), a(o);
  }, [t]);
  return [r, i];
}

function QTa() {
  const [e, t] = KTa(n1t, qTa, pze);
  return {
    hideNavBalance: e,
    setHideNavBalance: t
  };
}

const YTa = "false",
  Utn = YTa === !0;

function XTa() {
  on();
  const e = PT();
  return c.jsx($u, {
    title: x("隐私模式"),
    description: x("截图或分享屏幕时，隐藏项目名称和封面。"),
    action: c.jsx(Rj, {
      label: x("隐私模式"),
      checked: e,
      onChange: Dfa
    }),
    children: c.jsxs("ul", {
      className: "settings-privacy-notes",
      children: [c.jsx("li", {
        children: x("首页和项目库不显示封面。")
      }), c.jsx("li", {
        children: x("侧栏、画布标题和项目菜单不显示名称。")
      }), c.jsx("li", {
        children: x("画布里的内容仍然可见，项目数据不变。开启后立即生效。")
      })]
    })
  });
}

function JTa() {
  const e = on(),
    [t, n] = g.useState(!1),
    r = async a => {
      n(!1);
      try {
        await YCr(a);
      } catch {
        n(!0);
      }
    };
  return c.jsxs($u, {
    title: x("界面语言"),
    description: x("应用于全局设置、画布节点、言绘和工具界面。切换后立即生效，并自动保存。"),
    children: [c.jsx("div", {
      className: "settings-language-options",
      role: "radiogroup",
      "aria-label": x("界面语言"),
      children: PVe.map(a => c.jsxs("label", {
        className: `settings-language-option${e === a.id ? " is-selected" : ""}`,
        lang: a.id,
        children: [c.jsx("input", {
          className: "settings-language-radio",
          type: "radio",
          name: "app-ui-language",
          value: a.id,
          checked: e === a.id,
          onChange: () => void r(a.id)
        }), c.jsx("span", {
          children: a.name
        }), e === a.id && c.jsx(io, {
          size: 17,
          "aria-hidden": "true"
        })]
      }, a.id))
    }), c.jsx("p", {
      className: "settings-pref-desc settings-language-note",
      children: x("提示词、节点正文、自定义名称和生成内容保持原样。")
    }), t && c.jsx("p", {
      role: "alert",
      className: "settings-pref-desc",
      children: x("语言包加载失败，请重试。")
    })]
  });
}

let _Qn = null;

const r1t = new Set(),
  ZTa = e => (r1t.add(e), () => {
    r1t.delete(e);
  }),
  e8a = e => {
    _Qn = e, r1t.forEach(t => t());
  },
  t8a = () => c.jsx("div", {
    ref: e8a
  }),
  n8a = () => g.useSyncExternalStore(ZTa, () => _Qn, () => null),
  r8a = ({
    isDark: e,
    checkboxClassName: t,
    showHiddenModelsInGenNodes: n = !1,
    onSetShowHiddenModelsInGenNodes: r,
    searchQuery: a,
    onSearchQueryChange: i
  }) => (on(), c.jsx("div", {
    className: "settings-model-filter-bar",
    children: c.jsxs("div", {
      className: "flex flex-wrap items-center gap-3",
      children: [r ? c.jsxs("label", {
        className: `inline-flex items-center gap-2 w-fit shrink-0 select-none cursor-pointer ${e ? "text-zinc-400" : "text-zinc-600"}`,
        children: [c.jsx("input", {
          type: "checkbox",
          className: t,
          checked: n,
          onChange: o => r(o.target.checked),
          title: x("开启后，本列表与绘画/视频/3D 节点模型下拉会包含已勾选「不常用」的模型")
        }), c.jsx("span", {
          className: "text-xs",
          children: x("显示不常用模型")
        })]
      }) : null, c.jsxs("div", {
        className: `flex items-center gap-2 flex-1 min-w-0 px-2.5 py-1.5 rounded-lg text-xs transition-colors ${e ? "bg-zinc-900 border border-zinc-800 text-zinc-300 focus-within:border-zinc-500" : "bg-white border border-zinc-200 text-zinc-700 focus-within:border-zinc-900"}`,
        children: [c.jsx(mc, {
          size: 14,
          className: "shrink-0 opacity-50"
        }), c.jsx("input", {
          value: a,
          onChange: o => i(o.target.value),
          placeholder: x("搜索模型名称，支持简写如 G、Gemini"),
          className: `flex-1 min-w-0 bg-transparent outline-none text-xs ${e ? "placeholder:text-zinc-600" : "placeholder:text-zinc-400"}`
        }), a ? c.jsx("button", {
          type: "button",
          onClick: () => i(""),
          className: `shrink-0 p-0.5 rounded ${e ? "text-zinc-500 hover:text-zinc-300" : "text-zinc-400 hover:text-zinc-600"}`,
          title: x("清空搜索"),
          children: c.jsx(Na, {
            size: 12
          })
        }) : null]
      })]
    })
  }));

async function s6e(e, t) {
  await ahe();
  const n = await fetch(`${IT}/api/jimeng/canvas/auth/${e}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        device_code: t
      }),
      signal: AbortSignal.timeout(35e3)
    }),
    r = await n.json();
  if (!n.ok) throw new Error(r.detail || r.error || "即梦画布账号查询失败");
  if (e === "status" && !(typeof r.userId == "number" && r.userId > 0)) throw new Error("即梦画布未返回有效账号，请重新完成授权");
  return r;
}

function kQn({
  isDark: e,
  layout: t = "card"
}) {
  on();
  const [n, r] = g.useState(),
    [a, i] = g.useState(""),
    [o, s] = g.useState("正在验证画布账号…"),
    [l, d] = g.useState(!0),
    [u, h] = g.useState(),
    [p, m] = g.useState();
  g.useEffect(() => {
    let _ = !0;
    for (const w of ["qiaodoumayi_jimeng_cli_login_ok", "qiaodoumayi_jimeng_cli_credit_cache", "qiaodoumayi_jimeng_cli_credit_cache_time"]) localStorage.removeItem(w);
    if (!Pxe()) {
      s("即梦画布 CLI 仅支持桌面版"), d(!1);
      return;
    }
    return s6e("version").then(w => {
      _ && i(w.version || "");
    }).catch(() => {}), s6e("status").then(w => {
      _ && (r(w), h(Date.now()), s("账号已连接，图片和视频共用此授权"));
    }).catch(w => {
      _ && s(w.message);
    }).finally(() => {
      _ && d(!1);
    }), () => {
      _ = !1;
    };
  }, []);
  const f = async _ => {
      var w;
      d(!0);
      try {
        (_ === "relogin" || _ === "logout") && r(void 0);
        const k = await s6e(_, p == null ? void 0 : p.deviceCode);
        if (_ === "logout") {
          r(void 0), m(void 0), s("已退出画布账号");
          return;
        }
        if (k.challenge) {
          m(k.challenge), s("请完成网页授权，再点击「我已完成授权」"), await sme(k.challenge.verificationUriComplete || k.challenge.verificationUri);
          return;
        }
        if (_ === "wait" && !(k.loggedIn || (w = k.state) != null && w.loggedIn || k.status === "logged_in")) {
          s("正在等待网页授权完成");
          return;
        }
        const A = _ === "status" ? k : await s6e("status");
        r(A), h(Date.now()), m(void 0), s("账号已连接，图片和视频共用此授权");
      } catch (k) {
        r(void 0), s(k instanceof Error ? k.message : String(k));
      } finally {
        d(!1);
      }
    },
    y = `sketch-button sketch-button-muted sketch-button-xs${e ? " sketch-button-dark" : ""}`,
    b = n ? n.isVip === !0 ? n.vipLevel === "standard" ? "标准会员" : `会员${n.vipLevel ? ` · ${n.vipLevel}` : ""}` : n.isVip === !1 ? "普通账号" : "暂未返回" : "等待连接",
    v = l ? "验证中" : n ? "已连接" : "未连接";
  return t === "sheet" ? c.jsxs("div", {
    className: "canvas-tool-sheet",
    "aria-label": x("即梦画布账号"),
    children: [c.jsx($u, {
      title: x("连接状态"),
      description: o,
      action: c.jsx("span", {
        className: "settings-stat-value",
        children: x(v)
      })
    }), c.jsx($u, {
      title: x("账号权益"),
      description: x(n ? "会员身份已验证。图片和视频共用此授权。" : "连接后查询会员身份。"),
      action: c.jsx("span", {
        className: "settings-stat-value",
        children: x(b)
      })
    }), c.jsx($u, {
      title: x("积分余额"),
      description: x("当前画布 CLI 暂不提供余额查询。扣费前按官方报价确认。"),
      action: c.jsx("button", {
        type: "button",
        className: "settings-pill-btn",
        onClick: () => void sme("https://jimeng.jianying.com/").catch(_ => s(String(_.message || _))),
        children: x("官网查看")
      })
    }), c.jsxs("div", {
      className: "canvas-tool-actions",
      children: [c.jsx("button", {
        type: "button",
        className: "settings-pill-btn",
        disabled: l,
        onClick: () => void f("status"),
        children: x("刷新状态")
      }), c.jsx("button", {
        type: "button",
        className: "settings-pill-btn",
        disabled: l,
        onClick: () => void f(n ? "relogin" : "login"),
        children: x(n ? "切换账号" : "授权登录")
      }), n ? c.jsx("button", {
        type: "button",
        className: "settings-pill-btn",
        disabled: l,
        onClick: () => void f("logout"),
        children: x("退出登录")
      }) : null, p ? c.jsxs(c.Fragment, {
        children: [c.jsx("button", {
          type: "button",
          className: "settings-pill-btn",
          disabled: l,
          onClick: () => void sme(p.verificationUriComplete || p.verificationUri),
          children: x("打开授权页")
        }), c.jsx("button", {
          type: "button",
          className: "settings-pill-btn",
          disabled: l,
          onClick: () => void f("wait"),
          children: x(l ? "正在确认…" : "我已完成授权")
        })]
      }) : null]
    })]
  }) : c.jsxs("section", {
    "aria-label": x("即梦画布账号"),
    className: `sketch-section-card jimeng-cli-card ${e ? "sketch-section-card-dark jimeng-cli-dark" : ""}`,
    children: [c.jsxs("header", {
      className: "jimeng-cli-header",
      children: [c.jsx("span", {
        className: "jimeng-cli-icon",
        children: c.jsx(ac, {
          size: 19,
          "aria-hidden": !0
        })
      }), c.jsxs("div", {
        className: "jimeng-cli-heading",
        children: [c.jsx("h3", {
          children: x("即梦画布 CLI")
        }), c.jsxs("span", {
          children: [x("图片 · 视频 · 智能超清"), a ? `　v${a}` : ""]
        })]
      }), c.jsxs("span", {
        className: `jimeng-cli-status${n ? " is-connected" : ""}`,
        children: [c.jsx("i", {}), x(l ? "验证中" : n ? "已连接" : "未连接")]
      })]
    }), c.jsxs("div", {
      className: "jimeng-cli-metrics",
      children: [c.jsxs("div", {
        children: [c.jsxs("span", {
          className: "jimeng-cli-label",
          children: [c.jsx(FRr, {
            size: 13,
            "aria-hidden": !0
          }), x("账号权益")]
        }), c.jsx("strong", {
          children: x(b)
        }), c.jsx("small", {
          children: x(n ? "会员身份已验证" : "连接后查询会员身份")
        })]
      }), c.jsxs("div", {
        children: [c.jsxs("span", {
          className: "jimeng-cli-label",
          children: [c.jsx(BRr, {
            size: 13,
            "aria-hidden": !0
          }), x("积分余额")]
        }), c.jsxs("button", {
          type: "button",
          className: "jimeng-cli-link",
          onClick: () => void sme("https://jimeng.jianying.com/").catch(_ => s(String(_.message || _))),
          children: [x("官网查看 "), c.jsx(S5, {
            size: 12,
            "aria-hidden": !0
          })]
        }), c.jsx("small", {
          children: x("当前画布 CLI 暂不提供余额查询")
        })]
      })]
    }), c.jsx("p", {
      className: "jimeng-cli-message",
      role: "status",
      children: o
    }), c.jsxs("div", {
      className: "jimeng-cli-footer",
      children: [c.jsxs("span", {
        className: "jimeng-cli-note",
        children: [u && n ? x("验证于 {0} · ", new Date(u).toLocaleTimeString(ew(), {
          hour12: !1
        })) : "", x("扣费前按官方报价确认")]
      }), c.jsxs("div", {
        className: "jimeng-cli-actions",
        children: [c.jsxs("button", {
          type: "button",
          className: y,
          disabled: l,
          onClick: () => void f("status"),
          children: [c.jsx(bd, {
            size: 12,
            className: l ? "jimeng-cli-spin" : "",
            "aria-hidden": !0
          }), x("刷新状态")]
        }), c.jsxs("button", {
          type: "button",
          className: y,
          disabled: l,
          onClick: () => void f(n ? "relogin" : "login"),
          children: [c.jsx(wRr, {
            size: 12,
            "aria-hidden": !0
          }), x(n ? "切换账号" : "授权登录")]
        }), n && c.jsxs("button", {
          type: "button",
          className: y,
          disabled: l,
          onClick: () => void f("logout"),
          children: [c.jsx(sNr, {
            size: 12,
            "aria-hidden": !0
          }), x("退出登录")]
        }), p && c.jsxs(c.Fragment, {
          children: [c.jsx("button", {
            type: "button",
            className: y,
            disabled: l,
            onClick: () => void sme(p.verificationUriComplete || p.verificationUri),
            children: x("打开授权页")
          }), c.jsx("button", {
            type: "button",
            className: y,
            disabled: l,
            onClick: () => void f("wait"),
            children: x(l ? "正在确认…" : "我已完成授权")
          })]
        })]
      })]
    })]
  });
}

const a8a = 256;

function AQn(e) {
  const t = String(e || "").trim();
  if (!t.toLowerCase().startsWith("file://")) return t;
  try {
    const n = new URL(t);
    return decodeURIComponent(n.pathname.replace(/^\/([A-Za-z]:)/, "$1"));
  } catch {
    return decodeURIComponent(t.replace(/^file:\/\//i, "").replace(/^\/([A-Za-z]:)/, "$1"));
  }
}

function i8a(e) {
  const t = AQn(e);
  return /^[A-Za-z]:[\\/]/.test(t) || /^\\\\/.test(t) ? !0 : /\.(png|jpe?g|webp|gif|bmp|avif)$/i.test(t) && !/^https?:\/\//i.test(t);
}

function o8a(e) {
  const t = String(e || "").trim();
  return t ? !!(t.includes("/v1/files/") || /^https?:\/\//i.test(t)) : !1;
}

function s8a(e) {
  const t = String(e || "").toLowerCase();
  return t.endsWith(".png") ? "image/png" : t.endsWith(".webp") ? "image/webp" : t.endsWith(".gif") ? "image/gif" : t.endsWith(".bmp") ? "image/bmp" : t.endsWith(".avif") ? "image/avif" : t.endsWith(".jpg") || t.endsWith(".jpeg") ? "image/jpeg" : null;
}

async function UNe(e, t) {
  if (e.type.startsWith("image/") && e.type !== "application/octet-stream") return e;
  const n = await e.arrayBuffer(),
    r = new Uint8Array(n.slice(0, Math.min(n.byteLength, 16))),
    a = zHe(r),
    i = s8a(t == null ? void 0 : t.fileName),
    o = String((t == null ? void 0 : t.source) || "").toLowerCase(),
    s = o.includes(".png") ? "image/png" : o.includes(".webp") ? "image/webp" : o.includes(".gif") ? "image/gif" : o.includes(".jpg") || o.includes(".jpeg") ? "image/jpeg" : null,
    l = a || i || s || "image/png";
  return new Blob([n], {
    type: l
  });
}

function l8a(e, t) {
  const n = String(e || "").trim(),
    r = String(t || "").trim();
  if (!n || !r) return !1;
  if (n === r) return !0;
  try {
    const a = new URL(n),
      i = new URL(r);
    if (a.pathname && i.pathname && a.pathname === i.pathname) return !0;
  } catch {}
  return n.includes(r) || r.includes(n);
}

async function c8a(e) {
  try {
    const t = await FDe(e);
    if (t.size > 0) return t;
  } catch {}
  try {
    const {
        readFile: t
      } = await Ie(async () => {
        const {
          readFile: i
        } = await Promise.resolve().then(() => oc);
        return {
          readFile: i
        };
      }, void 0, import.meta.url),
      n = /^[a-zA-Z]:\//.test(e.replace(/\\/g, "/")) ? e.replace(/\//g, "\\") : e,
      r = await t(n);
    if (!(r != null && r.byteLength)) return null;
    const a = r instanceof Uint8Array ? r : new Uint8Array(r);
    return nU(a, z4e(e));
  } catch {
    return null;
  }
}

async function d8a(e) {
  const t = String(e || "").trim();
  if (!t) return null;
  if (t.startsWith("data:image") || t.startsWith("blob:")) {
    const n = await fetch(t);
    if (!n.ok) return null;
    const r = await UNe(await n.blob(), {
      source: t
    });
    return r.size > 0 ? {
      blob: r,
      source: t
    } : null;
  }
  if (/^https?:\/\//i.test(t)) {
    const n = await UNe(await y5t(t), {
      source: t
    });
    return n.size > 0 ? {
      blob: n,
      source: t
    } : null;
  }
  if (t.toLowerCase().startsWith("file://") || i8a(t)) {
    const n = AQn(t),
      r = await c8a(n);
    if (!(r != null && r.size)) return null;
    const a = await UNe(r, {
      fileName: n,
      source: n
    });
    return a.size > 0 ? {
      blob: a,
      source: n
    } : null;
  }
  return null;
}

async function a1t(e, t, n, r) {
  var l;
  const a = await UNe(e, {
    fileName: typeof t.nodeName == "string" ? t.nodeName : void 0,
    source: r
  });
  if (!(a != null && a.size) || !a.type.startsWith("image/")) return null;
  if (ua()) {
    let d = "";
    try {
      d = URL.createObjectURL(a);
      const {
          resolveLocalUrlForInputImageCanvas: u
        } = await Ie(async () => {
          const {
            resolveLocalUrlForInputImageCanvas: f
          } = await Promise.resolve().then(() => sw);
          return {
            resolveLocalUrlForInputImageCanvas: f
          };
        }, void 0, import.meta.url),
        h = await u(d, {
          nodeName: typeof t.nodeName == "string" ? t.nodeName : void 0
        }),
        p = String(((l = h == null ? void 0 : h.settings) == null ? void 0 : l._ossRemoteUrl) || "").trim(),
        m = String((h == null ? void 0 : h.content) || "").trim();
      if ((h == null ? void 0 : h.mediaType) === "image" && (nr(p) || nr(m))) return U_e(h, t, p || m || r);
    } catch (u) {
      console.warn("[CodexImageBridge] 全局 OSS 上传失败，回退本地 blob:", u);
    } finally {
      if (d) try {
        URL.revokeObjectURL(d);
      } catch {}
    }
  }
  await ni.saveBlobAsset(n, a, r, "local");
  try {
    const {
        resolveLocalUrlForInputImageCanvas: d
      } = await Ie(async () => {
        const {
          resolveLocalUrlForInputImageCanvas: h
        } = await Promise.resolve().then(() => sw);
        return {
          resolveLocalUrlForInputImageCanvas: h
        };
      }, void 0, import.meta.url),
      u = await d(`asset://${n}`, {
        assetId: n,
        nodeName: typeof t.nodeName == "string" ? t.nodeName : void 0
      });
    if ((u == null ? void 0 : u.mediaType) === "image") return U_e(u, t, r);
  } catch (d) {
    console.warn("[CodexImageBridge] 本地稳态预览失败，回退缩略图:", d);
  }
  let i = "",
    o = "";
  try {
    o = URL.createObjectURL(a);
    const {
      url: d
    } = await Ix(o, a8a);
    i = d;
  } catch {
    i = URL.createObjectURL(a);
  } finally {
    if (o) try {
      URL.revokeObjectURL(o);
    } catch {}
  }
  i.startsWith("blob:") && Il(i, n);
  const s = {
    ...(t.settings && typeof t.settings == "object" && !Array.isArray(t.settings) ? t.settings : {}),
    mediaType: "image",
    disableThumbnailCreationOnImport: !0,
    _assetId: n,
    _contentAssetId: n,
    _localCacheAssetId: n,
    _codexSourceUrl: r
  };
  return {
    content: i,
    settings: s,
    nodeName: typeof t.nodeName == "string" ? t.nodeName : void 0,
    _contentAssetId: n
  };
}

function $Ne(...e) {
  for (const t of e) {
    const n = String(t || "").trim();
    if (n && nr(n)) return n;
  }
  return "";
}

function SQn(e) {
  return {
    ...e,
    _globalOssUrlOnly: !0,
    [Cl]: !0,
    _assetId: void 0,
    _contentAssetId: void 0,
    _localCacheAssetId: void 0,
    _thumbnailAssetId: void 0,
    _blobUrl: void 0,
    _canvasDisplayPreviewUrl: void 0,
    _mjAssetIds: void 0,
    _mjPreviewAssetIds: void 0
  };
}

function IQn(e) {
  const t = e.settings || {},
    n = String(t._ossRemoteUrl || "").trim(),
    r = String(e.content || "").trim();
  return (t[Cl] === !0 || t._globalOssUrlOnly === !0) && (nr(n) || nr(r));
}

function U_e(e, t, n) {
  let r = {
    ...(t.settings && typeof t.settings == "object" && !Array.isArray(t.settings) ? t.settings : {}),
    ...e.settings
  };
  n && (r._codexSourceUrl = n);
  const a = {
    content: e.content,
    settings: r,
    nodeName: e.nodeName || (typeof t.nodeName == "string" ? t.nodeName : void 0)
  };
  if (IQn(a)) return r = SQn(r), {
    ...a,
    settings: r,
    _contentAssetId: void 0
  };
  const i = String(r._localCacheAssetId || r._contentAssetId || r._assetId || "").trim();
  return {
    ...a,
    settings: r,
    _contentAssetId: i || void 0
  };
}

async function CQn(e, t, n) {
  const r = String(e || "").trim();
  if (!nr(r)) return null;
  try {
    const {
        resolveUrlForInputImageCanvas: a
      } = await Ie(async () => {
        const {
          resolveUrlForInputImageCanvas: o
        } = await Promise.resolve().then(() => sw);
        return {
          resolveUrlForInputImageCanvas: o
        };
      }, void 0, import.meta.url),
      i = await a(r, {
        nodeName: typeof t.nodeName == "string" ? t.nodeName : void 0,
        assetId: ua() || n == null ? void 0 : n.assetId
      });
    return !i || i.mediaType !== "image" ? null : U_e(i, t, r);
  } catch (a) {
    return console.warn("[CodexImageBridge] OSS input-image 归一化失败:", a), null;
  }
}

async function Sat(e, t) {
  const n = String(e || "").trim();
  if (!n) return null;
  if (ua()) try {
    const r = await ni.getAssetBlob(n);
    if (r != null && r.size) {
      const a = await a1t(r, t, n, `asset://${n}`);
      if (a) return a;
    }
  } catch (r) {
    console.warn("[CodexImageBridge] 全局 OSS 上传本地资产失败，回退本地入图:", n, r);
  }
  try {
    const {
        resolveLocalUrlForInputImageCanvas: r
      } = await Ie(async () => {
        const {
          resolveLocalUrlForInputImageCanvas: i
        } = await Promise.resolve().then(() => sw);
        return {
          resolveLocalUrlForInputImageCanvas: i
        };
      }, void 0, import.meta.url),
      a = await r(`asset://${n}`, {
        assetId: n,
        nodeName: typeof t.nodeName == "string" ? t.nodeName : void 0
      });
    if ((a == null ? void 0 : a.mediaType) === "image") return U_e(a, t, `asset://${n}`);
  } catch (r) {
    console.warn("[CodexImageBridge] assetId 稳态入画布失败，回退读盘:", n, r);
  }
  try {
    const r = await ni.getAssetBlob(n);
    return r != null && r.size ? a1t(r, t, n, `asset://${n}`) : null;
  } catch (r) {
    return console.warn("[CodexImageBridge] 从 assetId 恢复失败:", n, r), null;
  }
}

function u8a(e, t, n, r) {
  if (!(n != null && n.length)) return null;
  const a = String(t.assetId || t._assetId || t._contentAssetId || t._localCacheAssetId || "").trim();
  if (a) {
    const s = n.find(l => l.assetId === a);
    if (s) return s;
  }
  const i = t.imageIndex ?? t.attachmentIndex ?? t.chatImageIndex;
  if (typeof i == "number" && i >= 1 && i <= n.length) return n[i - 1];
  const o = String(e || "").trim();
  if (o) {
    const s = n.find(l => l.url && l8a(o, l.url));
    if (s != null && s.assetId) return s;
    if (o8a(o)) {
      if (r && r.current < n.length) return n[r.current++];
      if (n.length === 1 && n[0].assetId) return n[0];
    }
  }
  return r && r.current < n.length ? n[r.current++] : n.length === 1 && n[0].assetId ? n[0] : null;
}

async function h8a(e, t, n) {
  const r = String(e.assetId || e._assetId || e._contentAssetId || e._localCacheAssetId || "").trim(),
    a = String(e.content || e.url || e.imageUrl || e.filePath || e.path || "").trim(),
    i = u8a(a, e, t, n),
    o = $Ne(i == null ? void 0 : i.url, a, typeof e.url == "string" ? e.url : void 0, typeof e.imageUrl == "string" ? e.imageUrl : void 0, typeof e.content == "string" ? e.content : void 0, i == null ? void 0 : i.displayUrl);
  if (o) {
    if (ua() && (i != null && i.url) && (i != null && i.displayUrl)) try {
      const {
          buildInputImageCanvasDropFromOss: l
        } = await Ie(async () => {
          const {
            buildInputImageCanvasDropFromOss: h
          } = await Promise.resolve().then(() => sw);
          return {
            buildInputImageCanvasDropFromOss: h
          };
        }, void 0, import.meta.url),
        d = gx(i.url) ? i.url : $Ne(i.url, o),
        u = $Ne(i.displayUrl) || d;
      if (u && nr(u)) {
        const h = l(u, d || u, {
          nodeName: typeof e.nodeName == "string" ? e.nodeName : void 0
        });
        if ((h == null ? void 0 : h.mediaType) === "image") return U_e(h, e, d || u);
      }
    } catch (l) {
      console.warn("[CodexImageBridge] Chat OSS 成对入画布失败，回退单 URL:", l);
    }
    const s = await CQn(o, e, {
      assetId: r || (i == null ? void 0 : i.assetId)
    });
    if (s) return s;
  }
  if (r) {
    const s = await Sat(r, e);
    if (s) return s;
  }
  if (i != null && i.assetId) {
    const s = await Sat(i.assetId, e);
    if (s) return s;
  }
  return !a && (i != null && i.assetId) ? Sat(i.assetId, e) : EQn(e);
}

async function EQn(e) {
  var l;
  const t = String(e.content || e.url || e.imageUrl || e.filePath || e.path || "").trim();
  if (!t) return null;
  const n = $Ne(t);
  if (n) {
    const d = String(e.assetId || e._assetId || e._contentAssetId || e._localCacheAssetId || "").trim(),
      u = await CQn(n, e, {
        assetId: d || void 0
      });
    if (u) return u;
  }
  const r = await d8a(t);
  if (!((l = r == null ? void 0 : r.blob) != null && l.size)) return null;
  const a = String(e.assetId || e._assetId || e._contentAssetId || "").trim(),
    i = vm(t),
    o = a || i || `codex_input_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    s = await a1t(r.blob, e, o, r.source);
  return s ? (t.startsWith("blob:") && (s.settings._blobUrl = t), s) : null;
}

const aJ = "codex-image",
  $tn = "QDM_CODEX_RESULT:",
  TQn = {
    id: aJ,
    provider: "Codex",
    modelName: "Codex 生图",
    type: "Image",
    key: "",
    url: "codex://local/imagegen",
    enabled: !0,
    resolutions: ["Auto"]
  };

function p8a(e) {
  const t = e.filter(a => a.id !== aJ),
    n = e.find(a => a.id === aJ) ?? TQn;
  let r = -1;
  for (let a = 0; a < t.length; a += 1) {
    const i = t[a].id;
    i.startsWith("gpt-image") && !i.includes("huya") && (r = a);
  }
  return r < 0 ? [n, ...t] : [...t.slice(0, r + 1), n, ...t.slice(r + 1)];
}

function Gtn(e) {
  return new Promise((t, n) => {
    const r = new FileReader();
    r.onerror = () => n(r.error || new Error("读取参考图失败")), r.onload = () => t(String(r.result || "")), r.readAsDataURL(e);
  });
}

function m8a(e) {
  const t = String(e || "").trim();
  return /^[A-Za-z]:[\\/]/.test(t) || t.startsWith("\\\\") || t.startsWith("file://");
}

async function Vtn(e, t) {
  if (t) try {
    const r = await ni.getAssetBlob(t);
    if (r != null && r.size && r.type.startsWith("image/")) return Gtn(r);
  } catch {}
  const n = String(e || "").trim();
  if (!n) return null;
  if (m8a(n)) return n;
  try {
    const r = await fetch(n);
    if (!r.ok) return null;
    const a = await r.blob();
    return !a.size || !a.type.startsWith("image/") ? null : Gtn(a);
  } catch {
    return null;
  }
}

function MQn(e) {
  const n = String(e || "").split(/\r?\n/).reverse().find(a => a.startsWith($tn));
  if (!n) throw new Error("Codex 没有返回可识别的图片结果");
  const r = JSON.parse(n.slice($tn.length));
  if (!r || typeof r != "object") throw new Error("Codex 返回格式无效");
  return r;
}

function f8a() {
  return new Date().toLocaleTimeString("zh-CN", {
    hour12: !1
  });
}

function g8a(e) {
  const t = String(e.gptImage2Resolution || e.resolution || "Auto"),
    n = String(t.toLowerCase() === "auto" ? "Auto" : e.gptImage2AspectRatio || e.ratio || "Auto"),
    r = t.toLowerCase() === "custom" ? String(e.gptImage2CustomSize || e.ratio || "Custom") : t.toUpperCase();
  return {
    ratio: n,
    resolution: r,
    storedResolution: t
  };
}

function y8a(e) {
  return String(e.gptImageBackground || "auto").toLowerCase() === "transparent" ? "transparent" : "auto";
}

function PQn(e) {
  const t = Date.now() - e;
  return {
    durationMs: t,
    generationTime: `${(t / 1e3).toFixed(1)}s`
  };
}

function Htn(e) {
  var u, h;
  const {
      settings: t,
      ossPack: n,
      ratio: r,
      storedResolution: a,
      background: i,
      worker: o,
      startedAt: s
    } = e,
    l = String(n.displayUrls.find(Boolean) || ((u = n.ossSettings) == null ? void 0 : u._ossThumbnailUrl) || "").trim() || String(n.remoteUrls.find(Boolean) || ((h = n.ossSettings) == null ? void 0 : h._ossRemoteUrl) || "").trim(),
    d = PQn(s);
  return {
    nodeUpdates: {
      content: l,
      _contentAssetId: void 0,
      previewType: "image",
      isGenerating: !1,
      errorMsg: void 0,
      settings: {
        ...SQn({
          ...t,
          ...n.ossSettings
        }),
        model: aJ,
        ratio: r,
        gptImage2AspectRatio: r === "Auto" ? t.gptImage2AspectRatio : r,
        gptImage2Resolution: a.toLowerCase(),
        gptImageBackground: i,
        gptImageOutputFormat: "png",
        generatedImages: n.generatedImages,
        isGenerating: !1,
        progress: 100,
        error: null,
        codexStatus: "已返回画布",
        codexThreadId: o.threadId,
        codexFinalResponse: o.finalResponse
      }
    },
    historyPatch: {
      ..._T(n, {
        type: "image"
      }),
      status: "completed",
      progress: 100,
      ...d,
      remoteTaskId: o.threadId
    }
  };
}

function b8a(e) {
  const {
      settings: t,
      bridged: n,
      assetId: r,
      ratio: a,
      storedResolution: i,
      background: o,
      worker: s,
      taskId: l,
      startedAt: d
    } = e,
    u = PQn(d),
    h = {
      id: `${l}_0`,
      thumbUrl: n.content,
      fullUrl: n.content,
      createdAt: Date.now(),
      assetId: r
    };
  return {
    nodeUpdates: {
      content: n.content,
      _contentAssetId: r,
      previewType: "image",
      isGenerating: !1,
      errorMsg: void 0,
      settings: {
        ...t,
        ...n.settings,
        model: aJ,
        ratio: a,
        gptImage2AspectRatio: a === "Auto" ? t.gptImage2AspectRatio : a,
        gptImage2Resolution: i.toLowerCase(),
        gptImageBackground: o,
        gptImageOutputFormat: "png",
        generatedImages: [h],
        isGenerating: !1,
        progress: 100,
        error: null,
        codexStatus: "已返回画布",
        codexThreadId: s.threadId,
        codexFinalResponse: s.finalResponse
      }
    },
    historyPatch: {
      url: n.content,
      originalUrl: n.content,
      status: "completed",
      progress: 100,
      ...u,
      _assetId: r,
      remoteTaskId: s.threadId
    }
  };
}

async function v8a(e) {
  var m, f;
  const {
      node: t,
      updateNode: n,
      setHistory: r,
      generateId: a
    } = e,
    i = String(t.prompt || "").trim();
  if (!i) throw new Error("请先输入图片提示词");
  const o = t.settings || {},
    {
      ratio: s,
      storedResolution: l
    } = g8a(o),
    d = y8a(o),
    u = ((m = t.settings) == null ? void 0 : m.harnessImageHistoryId) || a(),
    h = Date.now(),
    p = {
      id: u,
      type: "image",
      url: "",
      prompt: i,
      time: f8a(),
      status: "generating",
      progress: 8,
      modelName: "Codex 生图",
      ratio: s,
      sourceNodeId: t.id,
      apiConfig: {
        modelId: aJ,
        baseUrl: TQn.url,
        apiKey: ""
      },
      startTime: h,
      timestamp: h
    };
  n(t.id, {
    isGenerating: !0,
    errorMsg: void 0,
    settings: {
      ...o,
      isGenerating: !0,
      progress: 8,
      error: null,
      codexStatus: "正在整理提示词与参考图"
    }
  }), r(y => [p, ...y]);
  try {
    const b = (((f = e.getConnectedInputItems) == null ? void 0 : f.call(e, t.id)) || []).filter(T => T.type === "image"),
      v = b.length ? [] : e.getConnectedInputImages(t.id),
      _ = (await Promise.all([...b.map(T => Vtn(T.url, T.assetId)), ...v.map(T => Vtn(T))])).filter(T => !!T);
    n(t.id, {
      settings: {
        ...o,
        isGenerating: !0,
        progress: 18,
        error: null,
        codexStatus: "已发送到 Codex，正在生成图片"
      }
    });
    const w = await Fr("run_codex_image_generation", {
        request: {
          prompt: i,
          ratio: s,
          background: d,
          references: _,
          nodeId: t.id,
          taskId: u
        },
        timeoutMs: 6e5
      }),
      k = MQn(w.stdout);
    if (!w.ok || !k.ok || !k.imagePath) throw new Error(k.error || w.stderr || (w.timedOut ? "Codex 生图超时" : "Codex 生图失败"));
    n(t.id, {
      settings: {
        ...o,
        isGenerating: !0,
        progress: 92,
        error: null,
        codexStatus: "图片已生成，正在导入画布"
      }
    });
    const A = T => {
        n(t.id, T.nodeUpdates), r(P => P.map(R => R.id === u ? {
          ...R,
          ...T.historyPatch
        } : R));
      },
      {
        isGlobalOssUploadEnabled: S,
        isOssPublicHttpUrl: C,
        tryResolveGenResultForGlobalOss: I
      } = await Ie(async () => {
        const {
          isGlobalOssUploadEnabled: T,
          isOssPublicHttpUrl: P,
          tryResolveGenResultForGlobalOss: R
        } = await Promise.resolve().then(() => ii);
        return {
          isGlobalOssUploadEnabled: T,
          isOssPublicHttpUrl: P,
          tryResolveGenResultForGlobalOss: R
        };
      }, void 0, import.meta.url);
    if (S()) {
      let T = "";
      try {
        const {
            readFileAsBlob: P
          } = await Ie(async () => {
            const {
              readFileAsBlob: j
            } = await Promise.resolve().then(() => hg);
            return {
              readFileAsBlob: j
            };
          }, void 0, import.meta.url),
          R = await P(k.imagePath);
        if (R != null && R.size) {
          T = URL.createObjectURL(R);
          const j = await I([T], u, !1),
            B = !!j && [...j.displayUrls, ...j.remoteUrls].some(F => C(F));
          if (j && B) {
            A(Htn({
              settings: o,
              ossPack: j,
              ratio: s,
              storedResolution: l,
              background: d,
              worker: k,
              startedAt: h
            }));
            return;
          }
        }
      } catch (P) {
        console.warn("[Codex] 全局 OSS 回传失败，回退本地导入:", P);
      } finally {
        if (T) try {
          URL.revokeObjectURL(T);
        } catch {}
      }
    }
    const E = await EQn({
      filePath: k.imagePath,
      nodeName: t.nodeName || "Codex Image",
      settings: o
    });
    if (!E) throw new Error("图片已生成，但导入画布资产库失败");
    if (IQn(E)) {
      const T = String(E.settings._ossRemoteUrl || E.content || "").trim(),
        P = String(E.content || "").trim();
      A(Htn({
        settings: o,
        ossPack: {
          displayUrls: [P],
          remoteUrls: [T],
          generatedImages: [{
            id: `${u}_0`,
            thumbUrl: P,
            fullUrl: T || P,
            createdAt: Date.now()
          }],
          ossSettings: E.settings
        },
        ratio: s,
        storedResolution: l,
        background: d,
        worker: k,
        startedAt: h
      }));
      return;
    }
    const M = String(E._contentAssetId || E.settings._contentAssetId || E.settings._assetId || u);
    A(b8a({
      settings: o,
      bridged: E,
      assetId: M,
      ratio: s,
      storedResolution: l,
      background: d,
      worker: k,
      taskId: u,
      startedAt: h
    }));
  } catch (y) {
    const b = y instanceof Error ? y.message : String(y);
    throw n(t.id, {
      isGenerating: !1,
      errorMsg: b,
      settings: {
        ...o,
        isGenerating: !1,
        progress: 0,
        error: b,
        codexStatus: "生成失败"
      }
    }), r(v => v.map(_ => _.id === u ? {
      ..._,
      status: "failed",
      progress: 0,
      errorMsg: b,
      durationMs: Date.now() - h
    } : _)), y;
  }
}

const $_e = "codexImageConnectionChanged";

let Hve = null,
  tfe = null;

function RQn() {
  return Hve;
}

function Iat(e) {
  return Hve = e, typeof window < "u" && window.dispatchEvent(new CustomEvent($_e, {
    detail: e
  })), e;
}

async function i1t(e = !1) {
  const t = Date.now();
  return !e && Hve && t - Hve.checkedAt < 6e4 ? Hve : tfe || (us() ? (tfe = (async () => {
    try {
      const n = await Fr("run_codex_image_generation", {
          request: {
            action: "probe"
          },
          timeoutMs: 2e4
        }),
        r = MQn(n.stdout),
        a = r.accountConnected === !0,
        i = r.imagegenAvailable === !0;
      return Iat({
        ok: n.ok && r.ok && a && i,
        probe: !0,
        accountConnected: a,
        imagegenAvailable: i,
        authMode: String(r.authMode || ""),
        message: String(r.message || n.stderr || (n.timedOut ? "Codex 连接检测超时" : "Codex 连接不可用")),
        checkedAt: Date.now()
      });
    } catch (n) {
      return Iat({
        ok: !1,
        probe: !0,
        accountConnected: !1,
        imagegenAvailable: !1,
        authMode: "",
        message: n instanceof Error ? n.message : String(n),
        checkedAt: Date.now()
      });
    } finally {
      tfe = null;
    }
  })(), tfe) : Iat({
    ok: !1,
    probe: !0,
    accountConnected: !1,
    imagegenAvailable: !1,
    authMode: "",
    message: "请在桌面端检测 Codex 生图连接",
    checkedAt: t
  }));
}

const w8a = () => {
    on();
    const e = us(),
      [t, n] = g.useState(RQn()),
      [r, a] = g.useState(!1),
      {
        catalog: i,
        error: o,
        loading: s,
        refresh: l
      } = aQe(e),
      d = B2e.filter(v => i == null ? void 0 : i.models.some(_ => _.model === v.modelName)).length,
      u = !!(i != null && i.connected && d),
      h = r || s,
      p = g.useCallback(async (v = !1) => {
        if (e) {
          a(!0), v && l();
          try {
            n(await i1t(v));
          } finally {
            a(!1);
          }
        }
      }, [e, l]);
    g.useEffect(() => {
      const v = _ => {
        n(_.detail);
      };
      return window.addEventListener($_e, v), p(), () => window.removeEventListener($_e, v);
    }, [p]);
    const m = (t == null ? void 0 : t.accountConnected) === !0,
      f = (t == null ? void 0 : t.imagegenAvailable) === !0,
      y = m && f && u,
      b = o || [t == null ? void 0 : t.message, s && !i ? "正在检测 Chat…" : i != null && i.connected ? `${d} 个 Chat 模型可用` : e ? "Chat 未连接" : null].filter(Boolean).join(" · ");
    return c.jsxs("div", {
      className: "canvas-tool-sheet",
      children: [c.jsx($u, {
        title: x("Codex 账号"),
        description: r && !t ? x("检测中…") : m ? x("{0} 已连接", (t == null ? void 0 : t.authMode) || "Codex") : x("未连接")
      }), c.jsx($u, {
        title: x("生图通道"),
        description: x(f ? "可用" : "不可用")
      }), c.jsx($u, {
        title: x("连接状态"),
        description: x(y ? "可从画布发送生图与 Chat。" : e ? "请先确认 Codex 生图与 Chat 均已连接。" : "仅桌面端可检测。"),
        action: c.jsx("button", {
          type: "button",
          onClick: () => void p(!0),
          disabled: h || !e,
          className: "settings-pill-btn",
          title: x("同时检测 Codex 生图与 Chat 连接"),
          children: x(h ? "检测中…" : "检测连接")
        })
      }), c.jsx($u, {
        title: x("检测结果"),
        description: h && !t && !i ? x("检测中…") : b || x("检测会同时确认生图与 Chat 通道。账号用量请以 Codex 客户端为准。")
      })]
    });
  },
  x8a = [{
    id: "jimeng",
    name: "即梦",
    test: /jimeng/
  }, {
    id: "gemini",
    name: "Gemini",
    test: /gemini|nano-banana|veo|omini|omni[_-]flash/
  }, {
    id: "openai",
    name: "OpenAI",
    test: /gpt|openai|sora|codex|(^|[^a-z0-9])(o1|o3|o4)([^a-z0-9]|$)/
  }, {
    id: "claude",
    name: "Claude",
    test: /claude/
  }, {
    id: "deepseek",
    name: "DeepSeek",
    test: /deepseek/
  }, {
    id: "moonshot",
    name: "Kimi",
    test: /kimi|moonshot/
  }, {
    id: "grok",
    name: "Grok",
    test: /grok/
  }, {
    id: "metaso",
    name: "秘塔H3",
    test: /metaso|秘塔/
  }, {
    id: "minimax",
    name: "MiniMax",
    test: /minimax|hailuo/
  }, {
    id: "zhipu",
    name: "智谱",
    test: /glm|zhipu/
  }, {
    id: "qwen",
    name: "通义",
    test: /qwen|wan-|wan2|(^|[^a-z])wan([^a-z]|$)|happy-?horse|happy horse/
  }, {
    id: "zai",
    name: "Z-Image",
    test: /z-image|zai/
  }, {
    id: "doubao",
    name: "豆包",
    test: /doubao|seedance|seedream|seed-audio|seed-2|seed_2/
  }, {
    id: "xiaomi",
    name: "小米",
    test: /mimo|xiaomi/
  }, {
    id: "flux",
    name: "Flux",
    test: /flux|blackforestlabs/
  }, {
    id: "midjourney",
    name: "Midjourney",
    test: /midjourney|mj-v|mj-video/
  }, {
    id: "meta",
    name: "Meta",
    test: /muse-image/
  }, {
    id: "microsoft",
    name: "Microsoft",
    test: /mai-image|microsoft/
  }, {
    id: "kling",
    name: "可灵",
    test: /kling/
  }, {
    id: "vidu",
    name: "Vidu",
    test: /vidu/
  }, {
    id: "hunyuan",
    name: "混元",
    test: /hunyuan/
  }, {
    id: "tripo",
    name: "Tripo",
    test: /tripo/
  }, {
    id: "suno",
    name: "Suno",
    test: /suno/
  }, {
    id: "elevenlabs",
    name: "ElevenLabs",
    test: /elevenlabs/
  }, {
    id: "jev",
    name: "JEV",
    test: /jev/
  }];

function _8a(e, t, n) {
  return e === "Chat" ? l7t(t, n) : e === "Video" ? aVn(t, n) : e === "Music" || e === "Speech" ? rVn(t, n) : nVn(t, n);
}

const k8a = ["Chat", "Image", "Video", "3D", "Music", "Speech"];

function Cat(e) {
  return k8a.includes(e);
}

const Wtn = new Map();

function Eat(e, t, n) {
  const r = `${t}|${n ? 1 : 0}|${e.id}|${e.modelName || ""}|${e.provider || ""}`,
    a = Wtn.get(r);
  if (a) return a;
  const i = `${e.id} ${e.modelName || ""} ${e.provider || ""}`.toLowerCase(),
    o = x8a.find(l => l.test.test(i)),
    s = {
      id: (o == null ? void 0 : o.id) || "other",
      name: (o == null ? void 0 : o.name) || "其他",
      logoUrl: _8a(t, i, n)
    };
  return Wtn.set(r, s), s;
}

function qtn({
  url: e,
  isDark: t,
  size: n
}) {
  return on(), c.jsx("span", {
    className: `model-brand-logo${t ? " model-brand-logo--dark" : " model-brand-logo--light"}`,
    style: {
      width: n,
      height: n,
      "--model-brand-logo": `url(${JSON.stringify(e)})`
    },
    "aria-hidden": !0
  });
}

const A8a = Ia.lazy(() => Ie(() => Promise.resolve().then(() => _Fi), void 0, import.meta.url).then(e => ({
    default: e.StorageSettingsPane
  }))),
  S8a = Ia.lazy(() => Ie(() => Promise.resolve().then(() => iVi), void 0, import.meta.url).then(e => ({
    default: e.ApiAccessPane
  }))),
  I8a = Ia.lazy(() => Ie(() => Promise.resolve().then(() => cVi), void 0, import.meta.url).then(e => ({
    default: e.DesktopPetToolCardLazy
  }))),
  Ktn = [],
  Tat = 6;

function l6e(e, t, n = 300) {
  const [r, a] = g.useState(e),
    i = g.useRef(e),
    o = g.useRef(!1),
    s = g.useRef(null),
    l = g.useRef(t);
  l.current = t, g.useEffect(() => {
    o.current || (i.current = e, a(e));
  }, [e]), g.useEffect(() => () => {
    s.current !== null && (window.clearTimeout(s.current), s.current = null), o.current && (o.current = !1, l.current(i.current));
  }, []);
  const d = g.useCallback(p => {
      i.current = p, a(p), o.current = !0, s.current !== null && window.clearTimeout(s.current), s.current = window.setTimeout(() => {
        s.current = null, o.current = !1, l.current(i.current);
      }, n);
    }, [n]),
    u = g.useCallback(() => {
      s.current !== null && (window.clearTimeout(s.current), s.current = null), o.current && (o.current = !1, l.current(i.current));
    }, []),
    h = g.useCallback(() => {
      s.current !== null && (window.clearTimeout(s.current), s.current = null), o.current = !1;
    }, []);
  return [r, d, u, h];
}

const Qtn = "qiaodoumayi_custom_key_tag_presets",
  Ytn = "qiaodoumayi_model_field_history_v1",
  Xtn = [{
    value: "z0",
    label: "华东（z0）"
  }, {
    value: "z1",
    label: "华北（z1）"
  }, {
    value: "z2",
    label: "华南-广东（z2）"
  }, {
    value: "na0",
    label: "北美（na0）"
  }, {
    value: "as0",
    label: "东南亚（as0）"
  }, {
    value: "cn-east-2",
    label: "华东-浙江2（cn-east-2）"
  }],
  Tre = e => (e || "").trim().replace(/\/+$/, ""),
  C8a = e => uFe.some(t => Tre(t) === Tre(e)),
  c6e = [{
    color: "#e0e7ff",
    textColor: "#312e81"
  }, {
    color: "#fce7f3",
    textColor: "#9d174d"
  }, {
    color: "#dcfce7",
    textColor: "#365314"
  }, {
    color: "#ffedd5",
    textColor: "#9a3412"
  }, {
    color: "#e0f2fe",
    textColor: "#0c4a6e"
  }, {
    color: "#ede9fe",
    textColor: "#5b21b6"
  }, {
    color: "#fef9c3",
    textColor: "#854d0e"
  }, {
    color: "#fee2e2",
    textColor: "#991b1b"
  }],
  ste = [{
    id: "default",
    label: "default",
    color: "#e5e7eb",
    textColor: "#374151"
  }, {
    id: "claude-official",
    label: "claude优质",
    color: "#dbeafe",
    textColor: "#334155"
  }, {
    id: "ssvip",
    label: "ssvip",
    color: "#dcfce7",
    textColor: "#365314"
  }, {
    id: "openai-hq",
    label: "openai优质-高速",
    color: "#ffedd5",
    textColor: "#9a3412"
  }, {
    id: "origin",
    label: "origin",
    color: "#fce7f3",
    textColor: "#9d174d"
  }, {
    id: "claude-standard",
    label: "claude标准",
    color: "#fef9c3",
    textColor: "#854d0e"
  }, {
    id: "az-hq",
    label: "AZ-优质",
    color: "#f3e8ff",
    textColor: "#6b21a8"
  }, {
    id: "svip",
    label: "svip",
    color: "#fee2e2",
    textColor: "#991b1b"
  }, {
    id: "vvip",
    label: "vvip",
    color: "#fee2e2",
    textColor: "#7f1d1d"
  }, {
    id: "vip",
    label: "vip",
    color: "#cffafe",
    textColor: "#155e75"
  }, {
    id: "domestic-special",
    label: "国内专线",
    color: "#e0f2fe",
    textColor: "#1e3a8a"
  }, {
    id: "gemini-hq",
    label: "gemini优质",
    color: "#fef9c3",
    textColor: "#854d0e"
  }, {
    id: "cc",
    label: "cc",
    color: "#ede9fe",
    textColor: "#5b21b6"
  }, {
    id: "fal",
    label: "fal",
    color: "#dbeafe",
    textColor: "#1e40af"
  }, {
    id: "cc-hq",
    label: "cc优质",
    color: "#ffedd5",
    textColor: "#9a3412"
  }, {
    id: "domestic-special-2",
    label: "国内专线2",
    color: "#e0e7ff",
    textColor: "#312e81"
  }, {
    id: "image-standard",
    label: "image标准",
    color: "#e0f2fe",
    textColor: "#0c4a6e"
  }, {
    id: "sora-vip",
    label: "sora-vip",
    color: "#e0e7ff",
    textColor: "#3730a3"
  }],
  NQn = ({
    isOpen: e,
    onClose: t,
    isDark: n,
    apiConfigs: r,
    globalApiKey: a,
    globalBaseUrl: i,
    activeEndpoint: o,
    apiTestProgress: s,
    apiStatus: l,
    showBaseUrl: d = !0,
    isModelHiddenInList: u,
    onSetModelHiddenInList: h,
    showHiddenModelsInGenNodes: p = !1,
    onSetShowHiddenModelsInGenNodes: m,
    filterModels: f,
    onSetGlobalApiKey: y,
    onSetGlobalBaseUrl: b,
    onApplyGlobalBaseUrlFromPicker: v,
    jimengSuperResUrl: _ = "",
    jimengSuperResApiKey: w = "",
    onSetJimengSuperResUrl: k,
    onSetJimengSuperResApiKey: A,
    onTestJimengSuperResConnection: S,
    onUpdateConfig: C,
    onUpdateConfigs: I,
    onTestApiConnection: E,
    onSwitchEndpoint: M,
    getEndpoints: T,
    history: P = []
  }) => {
    var va;
    on();
    const R = g.useRef(null),
      j = g.useRef(null),
      B = g.useRef(null),
      F = g.useRef(null),
      N = g.useMemo(() => {
        const Kt = Array.isArray(r) ? r : [],
          Pr = f ? f(Kt) : Kt;
        return Array.isArray(Pr) ? Pr : [];
      }, [r, f]),
      [G, z] = g.useState("Chat"),
      V = GTn(),
      O = C7r();
    g.useEffect(() => {
      const Kt = kr => {
        const Mr = kr ?? MWt();
        kr && MWt(), _mt(Mr) && (z(Mr), W(""), q(null));
      };
      e && Kt();
      const Pr = kr => {
        const Mr = kr.detail;
        _mt(Mr) && Kt(Mr);
      };
      return window.addEventListener(Amt, Pr), () => window.removeEventListener(Amt, Pr);
    }, [e]);
    const L = g.useMemo(() => ({
        Chat: N.filter(Kt => Kt.type === "Chat"),
        Image: N.filter(Kt => Kt.type === "Image"),
        Video: N.filter(Kt => Kt.type === "Video"),
        "3D": N.filter(Kt => Kt.type === "3D"),
        Music: N.filter(Kt => Kt.type === "Music"),
        Speech: N.filter(Kt => Kt.type === "Speech")
      }), [N]),
      D = g.useMemo(() => G === "ApiAccess" || G === "Storage" || G === "Canvas" || G === "Privacy" || G === "Language" ? Ktn : (L[G] ?? Ktn).filter(Kt => !Kt.isCustom), [G, L]),
      U = g.useMemo(() => {
        if (G === "Storage") return [];
        if (G !== "Chat") return D;
        const Kt = new Intl.Collator(void 0, {
            numeric: !0,
            sensitivity: "base"
          }),
          Pr = Mr => {
            const Hn = String(Mr.id || "").toLowerCase(),
              je = `${String(Mr.provider || "").toLowerCase()} ${Hn}`;
            return je.includes("gemini") ? 10 : je.includes("gpt") || je.includes("openai") ? 20 : je.includes("deepseek") ? 30 : je.includes("claude") ? 40 : je.includes("kimi") || je.includes("moonshot") ? 50 : je.includes("grok") ? 60 : je.includes("minimax") ? 70 : je.includes("glm") ? 80 : je.includes("qwen") ? 85 : je.includes("doubao") || je.includes("seed") ? 90 : 999;
          },
          kr = Mr => {
            const Hn = String(Mr.modelName || "").trim(),
              $t = String(Mr.id || "").trim();
            return (Hn || $t).toLowerCase().replace(/[_\s]+/g, "-");
          };
        return [...D].sort((Mr, Hn) => {
          const $t = Pr(Mr),
            je = Pr(Hn);
          return $t !== je ? $t - je : Kt.compare(kr(Mr), kr(Hn));
        });
      }, [G, D]),
      H = g.useCallback(Kt => {
        let Pr = Array.isArray(Kt) ? Kt : [];
        return !p && u && (Pr = Pr.filter(kr => !u(kr.id))), Pr;
      }, [p, u]),
      Y = g.useMemo(() => H(U), [U, H]),
      [K, W] = g.useState(""),
      [Q, q] = g.useState(null),
      ne = g.useCallback(Kt => {
        z(Kt), W(""), q(null);
      }, []),
      [de, le] = g.useState(null),
      J = N1.filter(Kt => Kt.type === G && _z(Kt)),
      pe = (Kt, Pr = !1) => {
        const kr = aOe(Kt, `custom-${crypto.randomUUID()}`);
        kr.url = Qa.getEffectiveModelBaseUrl(Kt.id) || Kt.url, Pr && Kt.type !== "Chat" && (kr.templateId = void 0, kr.customProtocol = {
          ...bZ(),
          ...(Kt.type === "Video" ? {
            path: "/v1/videos",
            base64Paths: []
          } : {})
        }, kr.provider = Kt.type === "Video" ? "自定义视频接口" : "自定义图片接口", kr.modelName = "", kr.url = "", kr.resolutions = [], kr.ratios = Kt.type === "Video" ? ["16:9", "9:16"] : ["1:1", "16:9", "9:16"]), le({
          config: kr,
          editing: !1
        });
      },
      ce = g.useMemo(() => {
        const Kt = K.trim().toLowerCase();
        let Pr = H(U);
        return Q && Cat(G) && (Pr = Pr.filter(kr => Eat(kr, G, n).id === Q)), Kt ? Pr.filter(kr => Yh(kr.provider).toLowerCase().includes(Kt)) : Pr;
      }, [U, K, H, Q, G, n]),
      we = g.useMemo(() => {
        if (!Cat(G)) return [];
        const Kt = new Map();
        for (const Pr of Y) {
          const kr = Eat(Pr, G, n);
          Kt.has(kr.id) || Kt.set(kr.id, kr);
        }
        return [...Kt.values()];
      }, [Y, G, n]),
      X = `${G}|${Q ?? ""}|${K}`,
      [Z, re] = g.useState({
        token: X,
        limit: Tat
      });
    Z.token !== X && re({
      token: X,
      limit: Tat
    });
    const fe = Z.token === X ? Z.limit : Tat;
    g.useEffect(() => {
      if (fe >= ce.length) return;
      const Kt = window.requestAnimationFrame(() => {
        g.startTransition(() => {
          re(Pr => {
            if (Pr.token !== X) return Pr;
            const kr = Math.min(ce.length, Pr.limit + 12);
            return kr === Pr.limit ? Pr : {
              token: Pr.token,
              limit: kr
            };
          });
        });
      });
      return () => window.cancelAnimationFrame(Kt);
    }, [X, fe, ce.length]);
    const [ye, ie] = g.useState(() => sc()),
      ae = g.useRef(ye);
    g.useEffect(() => {
      ae.current = ye;
    }, [ye]);
    const [be, Ee] = g.useState(!1),
      [xe, he] = g.useState(() => !Z4t()),
      [ue, ge] = g.useState(() => !e5t()),
      [_e, ke] = g.useState(!1),
      [ve, Te] = g.useState(!1),
      [Ne, me] = g.useState("idle"),
      [Ae, Fe] = g.useState(""),
      [Me, Re, $e, rt] = l6e(i || "", b || (() => {}), 300),
      [nt, ze, Le, Ke] = l6e(a, y, 300),
      [Xe, De, Ye] = l6e(_, k || (() => {}), 300),
      [Ce, He, Ve, it] = l6e(w, A || (() => {}), 300),
      [It, Ft] = g.useState({}),
      We = g.useRef(new Map()),
      Ze = g.useCallback((Kt, Pr, kr) => {
        const Mr = We.current.get(Kt);
        Mr && window.clearTimeout(Mr.timer), We.current.set(Kt, {
          timer: window.setTimeout(() => {
            We.current.delete(Kt), Ft(Hn => {
              if (!(Kt in Hn)) return Hn;
              const $t = {
                ...Hn
              };
              return delete $t[Kt], $t;
            }), kr();
          }, 300),
          commit: kr
        }), Ft(Hn => Hn[Kt] === Pr ? Hn : {
          ...Hn,
          [Kt]: Pr
        });
      }, []),
      Ge = g.useCallback((Kt, Pr) => {
        const kr = We.current.get(Kt);
        kr && (window.clearTimeout(kr.timer), We.current.delete(Kt), Ft(Mr => {
          if (!(Kt in Mr)) return Mr;
          const Hn = {
            ...Mr
          };
          return delete Hn[Kt], Hn;
        }), Pr());
      }, []),
      Oe = g.useCallback(Kt => {
        const Pr = We.current.get(Kt);
        Pr && window.clearTimeout(Pr.timer), We.current.delete(Kt), Ft(kr => {
          if (!(Kt in kr)) return kr;
          const Mr = {
            ...kr
          };
          return delete Mr[Kt], Mr;
        });
      }, []);
    g.useEffect(() => () => {
      We.current.forEach(Kt => {
        window.clearTimeout(Kt.timer), Kt.commit();
      }), We.current.clear();
    }, []);
    const st = g.useCallback(Kt => {
        const Pr = {
          ...ae.current,
          ...Kt
        };
        ae.current = Pr, ie(Pr), b3n(Pr), me("idle"), Fe("");
      }, []),
      vt = g.useCallback(Kt => {
        const Pr = vj(Kt),
          kr = tU(Kt);
        st({
          cloudinaryFolder: Pr,
          materialPrefix: kr
        });
      }, [st]),
      Ht = g.useCallback(Kt => {
        const Pr = y3n(ae.current, Kt);
        ae.current = Pr, ie(Pr), me("idle"), Fe("");
      }, []),
      nn = g.useCallback(async () => {
        Te(!0), me("idle"), Fe("");
        try {
          const Kt = await M3n(ae.current);
          Kt.success ? (me("success"), Fe(Kt.url ? `${Kt.message}
${Kt.url}` : Kt.message)) : (me("error"), Fe(Kt.message));
        } catch (Kt) {
          me("error"), Fe(Kt instanceof Error ? Kt.message : String(Kt));
        } finally {
          Te(!1);
        }
      }, []);
    g.useEffect(() => {
      if (!e || G !== "Canvas" || V !== "media") return;
      const Kt = () => ie(sc());
      return window.addEventListener(go, Kt), Ie(() => Promise.resolve().then(() => yjt), void 0, import.meta.url).then(Pr => Pr.syncHuyaSeedanceOssWithCacheDirectory()).then(Kt).catch(() => {}), () => window.removeEventListener(go, Kt);
    }, [e, G, V]);
    const {
      huyaCorporateProxy: pt,
      refreshHuyaProxyDiagnostics: lt
    } = hQn();
    g.useEffect(() => {
      !e || G !== "Canvas" || V !== "proxy" || us();
    }, [e, G, V, pt, lt]);
    const [gt, Ut] = g.useState(!1),
      [_t, At] = g.useState("idle"),
      [Yt, qe] = g.useState(""),
      [kt, St] = g.useState(!1),
      [hn, Qt] = g.useState(!1),
      [Ot, ln] = g.useState(() => kz()),
      Pn = g.useMemo(() => {
        const Kt = Ot.filter(kr => String(kr.id || "").startsWith("platform-group-")),
          Pr = Ot.filter(kr => !String(kr.id || "").startsWith("platform-group-"));
        return Kt.sort((kr, Mr) => kr.label.localeCompare(Mr.label, "zh-CN")), [...Kt, ...Pr];
      }, [Ot]),
      [rn, Yn] = g.useState(ste[0].id),
      [Ct, Cn] = g.useState(() => {
        try {
          const Kt = localStorage.getItem(Qtn),
            Pr = Kt ? JSON.parse(Kt) : [];
          return Array.isArray(Pr) ? Pr.filter(kr => kr && typeof kr.id == "string" && typeof kr.label == "string" && kr.label.trim()).map((kr, Mr) => ({
            id: String(kr.id || `custom-tag-${Date.now()}-${Mr}`),
            label: String(kr.label || "").trim().slice(0, 32),
            color: String(kr.color || "").trim() || c6e[0].color,
            textColor: String(kr.textColor || "").trim() || c6e[0].textColor
          })) : [];
        } catch {
          return [];
        }
      }),
      [un, Jn] = g.useState(""),
      [Kn, en] = g.useState(!1),
      [Vn, Tt] = g.useState(!1),
      Ue = g.useMemo(() => [...ste, ...Ct], [Ct]),
      [et, ft] = g.useState(!1),
      [ht, wt] = g.useState(!1),
      [jt, bt] = g.useState(null),
      Bt = Kt => ht || jt === Kt,
      [wn, at] = g.useState(Fyt),
      [Pt, dt] = g.useState(!1),
      [xt, yn] = g.useState(null),
      [gn, mt] = g.useState(null),
      [Xt, Gn] = g.useState(null),
      [rr, qn] = g.useState(null),
      [Dn, Ar] = g.useState(() => {
        try {
          const Kt = localStorage.getItem(Ytn),
            Pr = Kt ? JSON.parse(Kt) : {},
            kr = Pr.baseUrls && typeof Pr.baseUrls == "object" && !Array.isArray(Pr.baseUrls) ? Pr.baseUrls : {},
            Mr = Pr.modelIds && typeof Pr.modelIds == "object" && !Array.isArray(Pr.modelIds) ? Pr.modelIds : {},
            Hn = Pr.hiddenBaseUrls && typeof Pr.hiddenBaseUrls == "object" && !Array.isArray(Pr.hiddenBaseUrls) ? Pr.hiddenBaseUrls : {},
            $t = je => {
              const Qe = {};
              for (const [Mt, cn] of Object.entries(je)) Array.isArray(cn) && (Qe[Mt] = Array.from(new Set(cn.map(Qn => String(Qn || "").trim()).filter(Boolean))));
              return Qe;
            };
          return {
            baseUrls: $t(kr),
            modelIds: $t(Mr),
            hiddenBaseUrls: $t(Hn)
          };
        } catch {
          return {
            baseUrls: {},
            modelIds: {},
            hiddenBaseUrls: {}
          };
        }
      }),
      [_r, Pa] = g.useState(() => localStorage.getItem("qiaodoumayi_platform_system_token") || ""),
      [fa, Ca] = g.useState(() => localStorage.getItem("qiaodoumayi_platform_user_id") || ""),
      [$n, yr] = g.useState(!1),
      [Ir, Gr] = g.useState(!1),
      [Zr, La] = g.useState("idle"),
      [sa, Ea] = g.useState(null),
      [ba, ga] = g.useState(""),
      _a = g.useRef(null),
      $a = g.useRef(""),
      Ya = Kt => {
        var Pr, kr;
        (Pr = _a.current) == null || Pr.abort(), (nt.trim() === Kt.key || a.trim() === Kt.key) && (Ke(), ze(""), Ke()), (Ce.trim() === Kt.key || w.trim() === Kt.key) && (it(), He(""), it());
        for (const Mr of r) (Mr.key.trim() === Kt.key || Mr.savedApiKeyId === Kt.id || ((kr = It[`${Mr.id}:key`]) == null ? void 0 : kr.trim()) === Kt.key) && Oe(`${Mr.id}:key`);
        VTa(Kt), ln(kz()), Ea(null);
      },
      {
        hideNavBalance: ta,
        setHideNavBalance: ki
      } = QTa(),
      Wn = g.useMemo(() => YQr(N, String(i || ""), {
        isModelHidden: u,
        onlyWhenPlatformTokens: !1
      }), [N, i, u]),
      wr = g.useCallback(async (Kt = !1) => {
        var $t;
        const Pr = _r.trim(),
          kr = fa.trim(),
          Mr = String(i || "").trim().replace(/\/+$/, "");
        if (!Pr || !kr) {
          ga("请先填写 USER ID 与 TOKEN");
          return;
        }
        if (!Mr) {
          ga("请先填写全局 BASE URL");
          return;
        }
        ($t = _a.current) == null || $t.abort();
        const Hn = new AbortController();
        _a.current = Hn, Gr(!0), La(Kt ? "import" : "generate"), ga("");
        try {
          const je = await rYr({
            baseUrl: Mr,
            systemToken: Pr,
            userId: kr
          }, {
            signal: Hn.signal,
            syncFromPlatform: Kt,
            canvasModelNames: Wn
          });
          if (Ea(je), ln(kz()), je.imported.length > 0 && !String(a || "").trim()) {
            const Qe = sE(),
              Mt = Qe.find(cn => cn.group === "default") || Qe.find(cn => je.imported.includes(cn.group)) || Qe[0];
            Mt != null && Mt.key && y(Mt.key);
          }
          if (Kt) {
            const Qe = je.skippedExisting.length + je.imported.length;
            Qe >= je.remoteGroupCount && je.remoteGroupCount > 0 ? ga("") : je.remoteGroupCount > 0 && Qe < je.remoteGroupCount ? ga(`平台 ${je.remoteGroupCount} 组，已有 ${je.skippedExisting.length} 组跳过，本次新拉 ${je.imported.length} 组${je.failed.length > 0 ? `；仍缺：${je.failed.slice(0, 5).map(Mt => Mt.group).join("、")}${je.failed.length > 5 ? ` 等 ${je.failed.length} 组` : ""}（再点「从平台同步」只补缺的）` : ""}`) : je.failed.length > 0 && ga("平台未找到分组令牌，请确认已在后台创建或改用手动生成");
          } else je.failed.length > 0 && (je.failed.some(Mt => Mt.error.includes("最大") || Mt.error.includes("令牌数量") || Mt.error.includes("令牌上限")) ? ga(`画布 ${je.canvasReady}/${je.totalGroups} 组已就绪；${je.failed.length} 组未创建（平台令牌可能已达上限，可点「从平台同步」拉取已有令牌）`) : je.canvasReady >= je.totalGroups ? ga("") : ga(`画布 ${je.canvasReady}/${je.totalGroups} 组已就绪；${je.failed.length} 组未完成：${je.failed.slice(0, 3).map(Mt => Mt.group).join("、")}${je.failed.length > 3 ? "…" : ""}`));
        } catch (je) {
          if (je instanceof DOMException && je.name === "AbortError") return;
          ga(n2e(je instanceof Error ? je.message : String(je), "分组令牌同步失败，请稍后重试"));
        } finally {
          Gr(!1), La("idle");
        }
      }, [_r, fa, i, a, Wn, y]);
    g.useEffect(() => {
      const Kt = _r.trim(),
        Pr = fa.trim(),
        kr = String(i || "").trim();
      if (!Kt || !Pr || !kr) return;
      const Mr = `${kr}|${Pr}|${Kt.slice(0, 8)}`;
      if ($a.current === Mr) return;
      const Hn = sE();
      if (Hn.length > 0 && Hn.every(je => RU(je.key))) {
        $a.current = Mr;
        return;
      }
      const $t = window.setTimeout(() => {
        $a.current = Mr, wr(!0);
      }, 1800);
      return () => window.clearTimeout($t);
    }, [_r, fa, i, wr]), g.useEffect(() => {
      try {
        localStorage.setItem("qiaodoumayi_platform_system_token", _r || ""), localStorage.setItem("qiaodoumayi_platform_user_id", fa || ""), window.dispatchEvent(new Event("qiaodoumayi_platform_auth_changed"));
      } catch {}
    }, [_r, fa]), g.useEffect(() => {
      try {
        localStorage.setItem(d7t, JSON.stringify(wn)), window.dispatchEvent(new Event(Byt));
      } catch {}
    }, [wn]), g.useEffect(() => {
      try {
        localStorage.setItem(sce, JSON.stringify(Ot)), nqe();
      } catch {}
    }, [Ot]), g.useEffect(() => {
      try {
        localStorage.setItem(Qtn, JSON.stringify(Ct));
      } catch {}
    }, [Ct]), g.useEffect(() => {
      try {
        localStorage.setItem(Ytn, JSON.stringify(Dn));
      } catch {}
    }, [Dn]), g.useEffect(() => {
      const Kt = window.setTimeout(() => ZYe(), 600);
      return () => window.clearTimeout(Kt);
    }, [r, a, i, Ot, Ct, wn, Dn]), g.useEffect(() => {
      e || (wt(!1), bt(null), Gn(null), qn(null));
    }, [e]), g.useEffect(() => {
      if (!et) return;
      const Kt = Pr => {
        R.current && !R.current.contains(Pr.target) && ft(!1);
      };
      return document.addEventListener("mousedown", Kt, !0), () => document.removeEventListener("mousedown", Kt, !0);
    }, [et]), g.useEffect(() => {
      if (!hn) return;
      const Kt = Pr => {
        j.current && !j.current.contains(Pr.target) && Qt(!1);
      };
      return document.addEventListener("mousedown", Kt, !0), () => document.removeEventListener("mousedown", Kt, !0);
    }, [hn]), g.useEffect(() => {
      if (!Kn) return;
      const Kt = Pr => {
        B.current && !B.current.contains(Pr.target) && en(!1);
      };
      return document.addEventListener("mousedown", Kt, !0), () => document.removeEventListener("mousedown", Kt, !0);
    }, [Kn]), g.useEffect(() => {
      if (!Vn) return;
      const Kt = Pr => {
        F.current && !F.current.contains(Pr.target) && Tt(!1);
      };
      return document.addEventListener("mousedown", Kt, !0), () => document.removeEventListener("mousedown", Kt, !0);
    }, [Vn]), g.useEffect(() => {
      e || en(!1);
    }, [e]), g.useEffect(() => {
      e || Tt(!1);
    }, [e]), g.useEffect(() => {
      if (!gn) return;
      const Kt = Pr => {
        var $t;
        const kr = Pr.target,
          Mr = ($t = kr == null ? void 0 : kr.closest) == null ? void 0 : $t.call(kr, "[data-model-api-key-dropdown-id]");
        if (!Mr) {
          mt(null);
          return;
        }
        Mr.getAttribute("data-model-api-key-dropdown-id") !== gn && mt(null);
      };
      return document.addEventListener("mousedown", Kt, !0), () => document.removeEventListener("mousedown", Kt, !0);
    }, [gn]), g.useEffect(() => {
      if (!Xt) return;
      const Kt = Pr => {
        var $t;
        const kr = Pr.target,
          Mr = ($t = kr == null ? void 0 : kr.closest) == null ? void 0 : $t.call(kr, "[data-model-base-url-dropdown-id]");
        if (!Mr) {
          Gn(null);
          return;
        }
        Mr.getAttribute("data-model-base-url-dropdown-id") !== Xt && Gn(null);
      };
      return document.addEventListener("mousedown", Kt, !0), () => document.removeEventListener("mousedown", Kt, !0);
    }, [Xt]), g.useEffect(() => {
      if (!rr) return;
      const Kt = Pr => {
        var $t;
        const kr = Pr.target,
          Mr = ($t = kr == null ? void 0 : kr.closest) == null ? void 0 : $t.call(kr, "[data-model-id-dropdown-id]");
        if (!Mr) {
          qn(null);
          return;
        }
        Mr.getAttribute("data-model-id-dropdown-id") !== rr && qn(null);
      };
      return document.addEventListener("mousedown", Kt, !0), () => document.removeEventListener("mousedown", Kt, !0);
    }, [rr]);
    const jn = g.useCallback(Kt => {
        const Pr = (Kt || "").trim();
        Pr && at(kr => kr.includes(Pr) ? kr : [...kr, Pr]);
      }, []),
      _n = g.useCallback(Kt => {
        const Pr = (Kt || "").trim();
        Pr && at(kr => kr.filter(Mr => Mr !== Pr));
      }, []),
      ar = g.useCallback((Kt, Pr) => {
        const kr = (Pr || "").trim();
        kr && Ar(Mr => {
          var je, Qe;
          const Hn = Mr.baseUrls[Kt] || [],
            $t = (((je = Mr.hiddenBaseUrls) == null ? void 0 : je[Kt]) || []).filter(Mt => Tre(Mt) !== Tre(kr));
          return Hn.includes(kr) ? $t.length === (((Qe = Mr.hiddenBaseUrls) == null ? void 0 : Qe[Kt]) || []).length ? Mr : {
            ...Mr,
            hiddenBaseUrls: {
              ...Mr.hiddenBaseUrls,
              [Kt]: $t
            }
          } : {
            ...Mr,
            baseUrls: {
              ...Mr.baseUrls,
              [Kt]: [...Hn, kr]
            },
            hiddenBaseUrls: {
              ...Mr.hiddenBaseUrls,
              [Kt]: $t
            }
          };
        });
      }, []),
      Vt = g.useCallback((Kt, Pr) => {
        const kr = (Pr || "").trim();
        kr && (Ar(Mr => {
          var Qe;
          const $t = (Mr.baseUrls[Kt] || []).filter(Mt => Mt !== kr),
            je = new Set(((Qe = Mr.hiddenBaseUrls) == null ? void 0 : Qe[Kt]) || []);
          return je.add(kr), {
            ...Mr,
            baseUrls: {
              ...Mr.baseUrls,
              [Kt]: $t
            },
            hiddenBaseUrls: {
              ...Mr.hiddenBaseUrls,
              [Kt]: Array.from(je)
            }
          };
        }), wn.includes(kr) && !C8a(kr) && _n(kr));
      }, [wn, _n]),
      vn = g.useCallback((Kt, Pr) => {
        const kr = (Pr || "").trim();
        kr && Ar(Mr => {
          const Hn = Mr.modelIds[Kt] || [];
          return Hn.includes(kr) ? Mr : {
            ...Mr,
            modelIds: {
              ...Mr.modelIds,
              [Kt]: [...Hn, kr]
            }
          };
        });
      }, []),
      An = g.useCallback((Kt, Pr) => {
        var je;
        const kr = [...uFe, ...wn],
          Mr = Dn.baseUrls[Kt] || [],
          Hn = new Set((((je = Dn.hiddenBaseUrls) == null ? void 0 : je[Kt]) || []).map(Qe => Tre(Qe))),
          $t = [...kr, ...Mr, (Pr || "").trim()].map(Qe => String(Qe || "").trim()).filter(Boolean);
        return Array.from(new Set($t)).filter(Qe => !Hn.has(Tre(Qe)));
      }, [wn, Dn.baseUrls, Dn.hiddenBaseUrls]),
      ur = g.useCallback((Kt, Pr) => {
        const Mr = [...(Dn.modelIds[Kt] || []), (Pr || "").trim()].map(Hn => String(Hn || "").trim()).filter(Boolean);
        return Array.from(new Set(Mr));
      }, [Dn.modelIds]),
      zr = g.useCallback(Kt => {
        const Pr = String(Kt || "").trim();
        if (Pr) return Ot.find(kr => kr.key === Pr);
      }, [Ot]),
      Dr = g.useCallback(Kt => {
        const Pr = String((Kt ?? a) || "").trim();
        if (!Pr) return;
        const kr = Ue.find(je => je.id === rn) || ste[0],
          Mr = kr.label,
          Hn = kr.color,
          $t = kr.textColor;
        ln(je => {
          const Qe = je.findIndex(Mt => Mt.key === Pr);
          if (Qe >= 0) {
            const Mt = [...je];
            return Mt[Qe] = {
              ...Mt[Qe],
              label: Mr,
              color: Hn,
              textColor: $t
            }, Mt;
          }
          return [...je, {
            id: `saved-key-${Date.now()}`,
            key: Pr,
            label: Mr,
            color: Hn,
            textColor: $t
          }];
        });
      }, [a, rn, Ue]),
      Wr = g.useCallback(() => {
        const Kt = un.trim();
        if (!Kt || Ue.some(Mr => Mr.label.trim() === Kt)) return;
        const kr = `custom-tag-${Date.now()}`;
        Cn(Mr => {
          const Hn = c6e[Mr.length % c6e.length];
          return [...Mr, {
            id: kr,
            label: Kt.slice(0, 32),
            ...Hn
          }];
        }), Jn(""), Yn(kr);
      }, [un, Ue]),
      gr = g.useCallback(Kt => {
        Cn(Pr => Pr.filter(kr => kr.id !== Kt)), Yn(Pr => Pr === Kt ? ste[0].id : Pr);
      }, []),
      jr = g.useCallback(async () => {
        if (!S) return;
        const Kt = (_ || iOe).trim().replace(/\/+$/, ""),
          Pr = (w || a || "").trim();
        Ut(!0), At("idle"), qe("");
        try {
          const kr = await S(Kt, Pr);
          At(kr.success ? "success" : "error"), qe(kr.message || (kr.success ? "连接成功" : "连接失败"));
        } catch (kr) {
          At("error"), qe(kr instanceof Error ? kr.message : "测试失败");
        } finally {
          Ut(!1);
        }
      }, [S, _, w, a]);
    if (g.useLayoutEffect(() => {
      l7r();
    }, []), !e) return null;
    const ea = n ? "sketch-section-card sketch-section-card-dark" : "sketch-section-card",
      pa = n ? " sketch-button-dark" : "",
      Br = n ? " sketch-test-btn-dark" : "",
      tn = n ? "sketch-field-label sketch-field-label-dark" : "sketch-field-label",
      Lr = n ? "sketch-section-label sketch-section-label-dark" : "sketch-section-label",
      br = n ? "sketch-input-inline sketch-input-inline-dark" : "sketch-input-inline",
      Jr = n ? "sketch-input-block sketch-input-block-dark" : "sketch-input-block",
      Kr = n ? "sketch-hint sketch-hint-dark" : "sketch-hint",
      ir = n ? "sketch-dropdown sketch-dropdown-dark sketch-scrollbar" : "sketch-dropdown sketch-scrollbar",
      Hr = n ? "sketch-divider-dark" : "sketch-divider",
      ha = n ? "sketch-icon-btn sketch-icon-btn-dark" : "sketch-icon-btn",
      Ga = n ? "sketch-checkbox sketch-checkbox-dark" : "sketch-checkbox",
      Za = n ? "text-zinc-200" : "text-zinc-800";
    return c.jsxs(OTn, {
      isDark: n,
      onClose: t,
      activeId: G,
      onSelect: ne,
      counts: {
        Chat: L.Chat.length,
        Image: L.Image.length,
        Video: L.Video.length,
        "3D": L["3D"].length,
        Music: L.Music.length,
        Speech: L.Speech.length
      },
      children: [O ? Da.createPortal(c.jsxs(c.Fragment, {
        children: [V === "platform" && c.jsxs("div", {
          className: "canvas-tool-sheet",
          children: [c.jsx($u, {
            title: x("隐藏顶栏余额"),
            description: x("顶栏不再显示平台余额。"),
            action: c.jsx(Rj, {
              checked: ta,
              onChange: ki,
              label: x("隐藏顶栏余额")
            })
          }), c.jsx($u, {
            title: "USER ID",
            description: x("平台用户 ID。"),
            children: c.jsx("input", {
              type: "text",
              value: fa,
              onChange: Kt => Ca(Kt.target.value),
              placeholder: x("平台用户 ID"),
              className: `${br} w-full mt-3`
            })
          }), c.jsx($u, {
            title: "TOKEN",
            description: x("平台系统 Token，形如 Bearer …"),
            children: c.jsxs("div", {
              className: "relative mt-3",
              children: [c.jsx("input", {
                type: $n ? "text" : "password",
                value: _r,
                onChange: Kt => Pa(Kt.target.value),
                placeholder: x("平台系统 Token，形如 Bearer ..."),
                className: `${br} w-full pr-8`
              }), c.jsx("button", {
                type: "button",
                onClick: () => yr(Kt => !Kt),
                className: `${ha} right-2`,
                title: x($n ? "隐藏" : "显示"),
                children: $n ? c.jsx($d, {
                  size: 14
                }) : c.jsx(ul, {
                  size: 14
                })
              })]
            })
          }), c.jsxs("div", {
            className: "canvas-tool-actions",
            children: [c.jsx("button", {
              type: "button",
              disabled: Ir,
              onClick: () => void wr(!1),
              className: `sketch-button sketch-button-primary sketch-button-xs${pa}${Ir ? " opacity-60 cursor-not-allowed" : ""}`,
              children: x(Ir && Zr === "generate" ? "正在生成…" : "一键生成全部分组令牌")
            }), c.jsx("button", {
              type: "button",
              disabled: Ir,
              onClick: () => void wr(!0),
              className: `sketch-button sketch-button-muted sketch-button-xs${pa}${Ir ? " opacity-60 cursor-not-allowed" : ""}`,
              title: x("从平台拉取已有分组令牌并刷新本地 Key 列表"),
              children: x(Ir && Zr === "import" ? "正在同步…" : "从平台同步")
            }), sa ? c.jsxs("span", {
              className: `text-[10px] ${n ? "text-zinc-400" : "text-zinc-500"}`,
              children: [x("画布 "), sa.canvasReady, "/", sa.totalGroups, sa.skippedExisting.length > 0 ? x("，已有 {0} 跳过", sa.skippedExisting.length) : "", sa.imported.length > 0 ? x("，新拉 {0}", sa.imported.length) : "", sa.skippedExisting.length + sa.imported.length > 0 ? x("（共 {0}/{1} 组）", sa.skippedExisting.length + sa.imported.length, sa.remoteGroupCount) : sa.remoteGroupCount > 0 ? x("，平台 {0} 组", sa.remoteGroupCount) : "", sa.created.length > 0 ? x("，新建 {0}", sa.created.length) : "", sa.repaired.length > 0 ? x("，修复 {0}", sa.repaired.length) : "", sa.skippedOutOfCanvas > 0 ? x("，略过 {0} 组", sa.skippedOutOfCanvas) : ""]
            }) : sE().length > 0 ? c.jsxs("span", {
              className: `text-[10px] ${n ? "text-zinc-400" : "text-zinc-500"}`,
              children: [x("本地已有 "), sE().length, x(" 个分组令牌")]
            }) : null]
          }), ba ? c.jsx("p", {
            className: `text-[10px] mt-1 ${n ? "text-red-400" : "text-red-600"}`,
            children: ba
          }) : null]
        }), V === "proxy" && us() && Utn, V === "media" && c.jsxs("div", {
          className: "canvas-tool-sheet",
          children: [c.jsx($u, {
            title: x("全局素材上传"),
            description: x("画布素材默认走当前图床。Cloudinary 免费额度有限，建议只在需要的节点单独上传。"),
            action: c.jsx(Rj, {
              checked: !!ye.globalUploadEnabled,
              onChange: Kt => st({
                globalUploadEnabled: Kt
              }),
              label: x("全局素材上传")
            })
          }), c.jsx($u, {
            title: x("提供商"),
            description: mo(ye) === "cloudinary" ? x("使用此方案建议不要开「全局素材上传」；免费版有流量额度，建议仅在节点勾选单链上传即可。") : x("选择图床服务。"),
            action: c.jsx("div", {
              className: "settings-mode-pills settings-media-providers",
              role: "group",
              "aria-label": x("提供商"),
              children: [{
                id: "aliyun-oss",
                label: "阿里云 OSS"
              }, {
                id: "cloudinary",
                label: "Cloudinary（免费）"
              }].map(Kt => {
                const Pr = (ye.provider || "aliyun-oss") === Kt.id;
                return c.jsxs("button", {
                  type: "button",
                  onClick: () => Ht(Kt.id),
                  "aria-pressed": Pr,
                  className: `settings-pill-btn${Pr ? " is-active" : ""}`,
                  children: [c.jsx(io, {
                    size: 11,
                    strokeWidth: 2.5,
                    className: `shrink-0${Pr ? "" : " opacity-0"}`,
                    "aria-hidden": !0
                  }), c.jsx("span", {
                    children: x(Kt.label)
                  })]
                }, Kt.id);
              })
            })
          }), (ye.provider || "aliyun-oss") === "cloudinary" ? c.jsxs("div", {
            className: "space-y-2",
            children: [c.jsxs("div", {
              className: "flex items-center gap-3",
              children: [c.jsx("label", {
                className: `${tn}`,
                children: "Cloud Name"
              }), c.jsx("input", {
                type: "text",
                value: ye.cloudinaryCloudName ?? "",
                onChange: Kt => st({
                  cloudinaryCloudName: Kt.target.value
                }),
                placeholder: x("与控制台 Dashboard 中 Cloud name 完全一致"),
                className: `${br} flex-1`
              })]
            }), c.jsxs("div", {
              className: "flex items-center gap-3",
              children: [c.jsx("label", {
                className: `${tn}`,
                children: "API Key"
              }), c.jsx("input", {
                type: "text",
                value: ye.cloudinaryApiKey ?? "",
                onChange: Kt => st({
                  cloudinaryApiKey: Kt.target.value
                }),
                className: `${br} flex-1`
              })]
            }), c.jsxs("div", {
              className: "flex items-center gap-3",
              children: [c.jsx("label", {
                className: `${tn}`,
                children: "API Secret"
              }), c.jsxs("div", {
                className: "flex-1 relative",
                children: [c.jsx("input", {
                  type: _e ? "text" : "password",
                  value: ye.cloudinaryApiSecret ?? "",
                  onChange: Kt => st({
                    cloudinaryApiSecret: Kt.target.value
                  }),
                  className: `${br} w-full pr-8`
                }), c.jsx("button", {
                  type: "button",
                  onClick: () => ke(Kt => !Kt),
                  className: `${ha} right-2`,
                  children: _e ? c.jsx($d, {
                    size: 14
                  }) : c.jsx(ul, {
                    size: 14
                  })
                })]
              })]
            }), c.jsxs("div", {
              className: "flex items-center gap-3",
              children: [c.jsx("label", {
                className: `${tn}`,
                children: x("API 文件夹")
              }), c.jsx("input", {
                type: "text",
                value: ye.prefix ?? "",
                onChange: Kt => st({
                  prefix: Kt.target.value
                }),
                placeholder: x("图生视频/Agent 等，如 seedance"),
                className: `${br} flex-1`
              })]
            }), c.jsxs("div", {
              className: "flex items-center gap-3",
              children: [c.jsx("label", {
                className: `${tn}`,
                children: x("素材前缀")
              }), c.jsx("input", {
                type: "text",
                value: ye.materialPrefix ?? ye.cloudinaryFolder ?? "",
                onChange: Kt => vt(Kt.target.value),
                placeholder: x("全局拖入素材，如 canvas-materials/"),
                className: `${br} flex-1`
              })]
            }), c.jsx("p", {
              className: `${Kr}`,
              children: x("与阿里云 OSS 的「素材前缀」相同：拖入画布的图片/视频会上传到该目录下的 images、thumbnails、videos 等子文件夹。")
            })]
          }) : (ye.provider || "aliyun-oss") === "qiniu" ? c.jsxs("div", {
            className: "space-y-2",
            children: [c.jsxs("div", {
              className: "flex items-center gap-3",
              children: [c.jsx("label", {
                className: `${tn}`,
                children: "Bucket"
              }), c.jsxs("div", {
                className: "flex-1 relative",
                children: [c.jsx("input", {
                  type: ue ? "text" : "password",
                  value: ye.bucket,
                  onChange: Kt => st({
                    bucket: Kt.target.value
                  }),
                  className: `${br} w-full pr-8`,
                  autoComplete: "off"
                }), c.jsx("button", {
                  type: "button",
                  onClick: () => {
                    ge(Kt => {
                      const Pr = !Kt;
                      return Hht(!Pr), Pr;
                    });
                  },
                  className: `${ha} right-2`,
                  title: x(ue ? "隐藏 Bucket" : "显示 Bucket"),
                  children: ue ? c.jsx($d, {
                    size: 14
                  }) : c.jsx(ul, {
                    size: 14
                  })
                })]
              })]
            }), c.jsxs("div", {
              className: "flex items-center gap-3",
              children: [c.jsx("label", {
                className: `${tn}`,
                children: x("存储区域")
              }), c.jsxs("div", {
                ref: F,
                className: "relative flex-1 min-w-0",
                children: [c.jsxs("button", {
                  type: "button",
                  onClick: () => Tt(Kt => !Kt),
                  className: `${br} w-full flex items-center justify-between gap-2 text-left`,
                  children: [c.jsx("span", {
                    className: "truncate min-w-0",
                    children: ((va = Xtn.find(Kt => Kt.value === (ye.endpoint || "z2"))) == null ? void 0 : va.label) ?? x("华南-广东（z2）")
                  }), c.jsx(Mi, {
                    size: 14,
                    className: `shrink-0 opacity-60 transition-transform ${Vn ? "rotate-180" : ""}`
                  })]
                }), Vn ? c.jsx("div", {
                  className: `${ir} left-0 right-0 top-full z-[130] max-h-48 shadow-lg`,
                  children: Xtn.map(Kt => {
                    const Pr = (ye.endpoint || "z2") === Kt.value;
                    return c.jsxs("button", {
                      type: "button",
                      onMouseDown: kr => kr.preventDefault(),
                      onClick: () => {
                        st({
                          endpoint: Kt.value
                        }), Tt(!1);
                      },
                      className: `sketch-dropdown-item flex items-center justify-between gap-2 ${Pr ? n ? "bg-zinc-800/90 text-zinc-100" : "bg-zinc-100 text-zinc-900" : ""}`,
                      children: [c.jsx("span", {
                        children: x(Kt.label)
                      }), Pr ? c.jsx(io, {
                        size: 12,
                        className: "shrink-0 opacity-80"
                      }) : null]
                    }, Kt.value);
                  })
                }) : null]
              })]
            }), c.jsxs("div", {
              className: "flex items-center gap-3",
              children: [c.jsx("label", {
                className: `${tn}`,
                children: x("外链域名")
              }), c.jsxs("div", {
                className: "flex-1 relative",
                children: [c.jsx("input", {
                  type: xe ? "text" : "password",
                  value: ye.qiniuDomain ?? "",
                  onChange: Kt => st({
                    qiniuDomain: Kt.target.value
                  }),
                  onBlur: Kt => {
                    const Pr = s3(Kt.target.value);
                    Pr !== String(Kt.target.value || "").trim() && st({
                      qiniuDomain: Pr
                    });
                  },
                  placeholder: x("CDN 测试域名，如 th1b3suy7.hn-bkt.clouddn.com"),
                  className: `${br} w-full pr-8`,
                  autoComplete: "off"
                }), c.jsx("button", {
                  type: "button",
                  onClick: () => {
                    he(Kt => {
                      const Pr = !Kt;
                      return n3n(!Pr), Pr;
                    });
                  },
                  className: `${ha} right-2`,
                  title: x(xe ? "隐藏外链域名" : "显示外链域名"),
                  children: xe ? c.jsx($d, {
                    size: 14
                  }) : c.jsx(ul, {
                    size: 14
                  })
                })]
              })]
            }), Mwe(ye.qiniuDomain) ? c.jsx("p", {
              className: `${Kr} ${n ? "text-amber-300/90" : "text-amber-700"}`,
              children: Mwe(ye.qiniuDomain)
            }) : null, c.jsxs("div", {
              className: "flex items-center gap-3",
              children: [c.jsx("label", {
                className: `${tn}`,
                children: x("API 前缀")
              }), c.jsx("input", {
                type: "text",
                value: ye.prefix ?? "",
                onChange: Kt => st({
                  prefix: Kt.target.value
                }),
                placeholder: x("图生视频/Agent 等，如 seedance/"),
                className: `${br} flex-1`
              })]
            }), c.jsxs("div", {
              className: "flex items-center gap-3",
              children: [c.jsx("label", {
                className: `${tn}`,
                children: x("素材前缀")
              }), c.jsx("input", {
                type: "text",
                value: ye.materialPrefix ?? "",
                onChange: Kt => vt(Kt.target.value),
                placeholder: x("全局拖入素材，如 canvas-materials/"),
                className: `${br} flex-1`
              })]
            }), c.jsxs("div", {
              className: "flex items-center gap-3",
              children: [c.jsx("label", {
                className: `${tn}`,
                children: "Access Key"
              }), c.jsx("input", {
                type: "text",
                value: ye.accessKeyId,
                onChange: Kt => st({
                  accessKeyId: Kt.target.value
                }),
                placeholder: x("个人中心 → 密钥管理"),
                className: `${br} flex-1`
              })]
            }), c.jsxs("div", {
              className: "flex items-center gap-3",
              children: [c.jsx("label", {
                className: `${tn}`,
                children: "Secret Key"
              }), c.jsxs("div", {
                className: "flex-1 relative",
                children: [c.jsx("input", {
                  type: be ? "text" : "password",
                  value: ye.accessKeySecret,
                  onChange: Kt => st({
                    accessKeySecret: Kt.target.value
                  }),
                  className: `${br} w-full pr-8`
                }), c.jsx("button", {
                  type: "button",
                  onClick: () => Ee(Kt => !Kt),
                  className: `${ha} right-2`,
                  children: be ? c.jsx($d, {
                    size: 14
                  }) : c.jsx(ul, {
                    size: 14
                  })
                })]
              })]
            })]
          }) : c.jsxs("div", {
            className: "space-y-2",
            children: [c.jsxs("div", {
              className: "flex items-center gap-3",
              children: [c.jsx("label", {
                className: `${tn}`,
                children: "Bucket"
              }), c.jsxs("div", {
                className: "flex-1 relative",
                children: [c.jsx("input", {
                  type: ue ? "text" : "password",
                  value: ye.bucket,
                  onChange: Kt => st({
                    bucket: Kt.target.value
                  }),
                  placeholder: x("填写 Bucket 名称"),
                  className: `${br} w-full pr-8`,
                  autoComplete: "off"
                }), c.jsx("button", {
                  type: "button",
                  onClick: () => {
                    ge(Kt => {
                      const Pr = !Kt;
                      return Hht(!Pr), Pr;
                    });
                  },
                  className: `${ha} right-2`,
                  title: x(ue ? "隐藏 Bucket" : "显示 Bucket"),
                  children: ue ? c.jsx($d, {
                    size: 14
                  }) : c.jsx(ul, {
                    size: 14
                  })
                })]
              })]
            }), c.jsxs("div", {
              className: "flex items-center gap-3",
              children: [c.jsx("label", {
                className: `${tn}`,
                children: "Endpoint"
              }), c.jsx("input", {
                type: "text",
                value: ye.endpoint,
                onChange: Kt => st({
                  endpoint: Kt.target.value
                }),
                placeholder: x("如 oss-cn-beijing.aliyuncs.com"),
                className: `${br} flex-1`
              })]
            }), c.jsxs("div", {
              className: "flex items-center gap-3",
              children: [c.jsx("label", {
                className: `${tn}`,
                children: x("API 前缀")
              }), c.jsx("input", {
                type: "text",
                value: ye.prefix ?? "",
                onChange: Kt => st({
                  prefix: Kt.target.value
                }),
                placeholder: x("图生视频/Agent 等，如 seedance/"),
                className: `${br} flex-1`
              })]
            }), c.jsxs("div", {
              className: "flex items-center gap-3",
              children: [c.jsx("label", {
                className: `${tn}`,
                children: x("素材前缀")
              }), c.jsx("input", {
                type: "text",
                value: ye.materialPrefix ?? "",
                onChange: Kt => vt(Kt.target.value),
                placeholder: x("全局拖入素材，如 canvas-materials/"),
                className: `${br} flex-1`
              })]
            }), c.jsxs("div", {
              className: "flex items-center gap-3",
              children: [c.jsx("label", {
                className: `${tn}`,
                children: "AK ID"
              }), c.jsx("input", {
                type: "text",
                value: ye.accessKeyId,
                onChange: Kt => st({
                  accessKeyId: Kt.target.value
                }),
                className: `${br} flex-1`
              })]
            }), c.jsxs("div", {
              className: "flex items-center gap-3",
              children: [c.jsx("label", {
                className: `${tn}`,
                children: "AK Secret"
              }), c.jsxs("div", {
                className: "flex-1 relative",
                children: [c.jsx("input", {
                  type: be ? "text" : "password",
                  value: ye.accessKeySecret,
                  onChange: Kt => st({
                    accessKeySecret: Kt.target.value
                  }),
                  className: `${br} w-full pr-8`
                }), c.jsx("button", {
                  type: "button",
                  onClick: () => Ee(Kt => !Kt),
                  className: `${ha} right-2`,
                  children: be ? c.jsx($d, {
                    size: 14
                  }) : c.jsx(ul, {
                    size: 14
                  })
                })]
              })]
            })]
          }), c.jsxs("div", {
            className: "canvas-tool-actions",
            children: [Ae ? c.jsx("span", {
              className: `text-[10px] whitespace-pre-wrap break-all max-w-full ${Ne === "success" ? "text-green-500" : "text-red-500"}`,
              children: Ae
            }) : null, c.jsx("button", {
              type: "button",
              onClick: () => void nn(),
              disabled: ve || !P2(ye),
              className: `sketch-test-btn${n ? " sketch-test-btn-dark" : ""}${ve ? "" : Ne === "success" ? " sketch-test-btn-success" : Ne === "error" ? " sketch-test-btn-error" : ""}`,
              title: us() ? x("向{0}上传 1×1 测试图", t9(mo(ye))) : x("测试上传需在桌面端运行"),
              children: ve ? c.jsxs(c.Fragment, {
                children: [c.jsx(Ua, {
                  size: 10,
                  className: "animate-spin"
                }), x(" 测试中...")]
              }) : Ne === "success" ? c.jsxs(c.Fragment, {
                children: [c.jsx(io, {
                  size: 10
                }), x(" 上传成功")]
              }) : Ne === "error" ? c.jsxs(c.Fragment, {
                children: [c.jsx(Na, {
                  size: 10
                }), x(" 上传失败")]
              }) : x("测试上传")
            })]
          })]
        }), V === "pet" && c.jsx(Ia.Suspense, {
          fallback: null,
          children: c.jsx(I8a, {
            isDark: n
          })
        }), V === "jimeng" && c.jsx(kQn, {
          isDark: n,
          layout: "sheet"
        }), V === "codex" && c.jsx(w8a, {
          isDark: n
        }), V === "superRes" && k && A && c.jsxs("div", {
          className: "canvas-tool-sheet",
          children: [c.jsx($u, {
            title: x("凭证格式"),
            description: x("官方火山 API 使用 Access Key ID 与 Secret Access Key，按 AccessKeyId:SecretAccessKey 写入全局或本工具 API Key。")
          }), o3() && c.jsx($u, {
            title: x("桌面转发"),
            description: x("桌面版已内置转发，填写官方地址即可，无需单独启动代理。")
          }), c.jsxs("div", {
            className: "space-y-2",
            children: [c.jsxs("div", {
              className: "flex items-center gap-3",
              children: [c.jsx("label", {
                className: `${tn}`,
                children: "BASE URL"
              }), c.jsx("input", {
                type: "text",
                value: Xe,
                onChange: Kt => De(Kt.target.value),
                onBlur: () => Ye(),
                onKeyDown: Kt => {
                  Kt.key === "Enter" && Ye();
                },
                placeholder: iOe,
                className: `${br} flex-1`
              })]
            }), c.jsxs("div", {
              className: "flex items-center gap-3",
              children: [c.jsx("label", {
                className: `${tn}`,
                children: "API KEY"
              }), c.jsxs("div", {
                className: "flex-1 relative",
                children: [c.jsx("input", {
                  type: Pt ? "text" : "password",
                  value: Ce,
                  onChange: Kt => He(Kt.target.value),
                  onBlur: () => Ve(),
                  onKeyDown: Kt => {
                    Kt.key === "Enter" && Ve();
                  },
                  placeholder: x("填写 AK:SK 或普通 API Key"),
                  className: `${br} w-full pr-8`
                }), c.jsx("button", {
                  type: "button",
                  onClick: () => dt(Kt => !Kt),
                  className: `${ha} right-2`,
                  title: x(Pt ? "隐藏" : "显示"),
                  children: Pt ? c.jsx($d, {
                    size: 14
                  }) : c.jsx(ul, {
                    size: 14
                  })
                })]
              })]
            })]
          }), S && c.jsxs("div", {
            className: "canvas-tool-actions",
            children: [Yt && c.jsx("span", {
              className: `text-[10px] ${_t === "success" ? "text-green-500" : "text-red-500"}`,
              children: Yt
            }), c.jsx("button", {
              onClick: jr,
              disabled: gt,
              className: `sketch-test-btn${Br}${gt ? "" : _t === "success" ? " sketch-test-btn-success" : _t === "error" ? " sketch-test-btn-error" : ""}`,
              children: gt ? c.jsxs(c.Fragment, {
                children: [c.jsx(Ua, {
                  size: 10,
                  className: "animate-spin"
                }), " ", x("测试中...")]
              }) : _t === "success" ? c.jsxs(c.Fragment, {
                children: [c.jsx(io, {
                  size: 10
                }), " ", x("连接成功")]
              }) : _t === "error" ? c.jsxs(c.Fragment, {
                children: [c.jsx(Na, {
                  size: 10
                }), " ", x("连接失败")]
              }) : x("测试连接")
            })]
          })]
        })]
      }), O) : null, G === "Language" ? c.jsx(JTa, {}) : G === "ApiAccess" ? c.jsx(Ia.Suspense, {
        fallback: c.jsx("div", {
          className: "settings-pref-desc",
          children: x("加载 API 接入…")
        }),
        children: c.jsx(S8a, {
          isDark: n
        })
      }) : G === "Privacy" ? c.jsx(XTa, {}) : G === "Canvas" ? c.jsx(t8a, {}) : G === "Storage" ? c.jsx(Ia.Suspense, {
        fallback: c.jsx("div", {
          className: "settings-pref-desc",
          children: x("加载存储设置…")
        }),
        children: c.jsx(A8a, {
          isDark: n,
          history: P,
          active: e
        })
      }) : c.jsx("div", {
        className: "space-y-5 settings-model-config",
        children: c.jsxs(c.Fragment, {
          children: [b && c.jsxs("div", {
            className: "settings-model-global-field",
            children: [c.jsx("label", {
              className: `block ${Lr} mb-2`,
              children: x("全局地址")
            }), c.jsxs("div", {
              className: "relative",
              ref: R,
              children: [c.jsx("input", {
                type: ht ? "text" : "password",
                autoComplete: "off",
                spellCheck: !1,
                "aria-label": x("全局地址"),
                value: Me,
                onChange: Kt => Re(Kt.target.value),
                onBlur: () => {
                  $e(), jn(Me);
                },
                onKeyDown: Kt => {
                  Kt.key === "Enter" && ($e(), jn(Me), ft(!1));
                },
                placeholder: ht ? "https://ai.comfly.chat/" : "••••••••",
                className: `${Jr} pr-16`
              }), c.jsx("button", {
                type: "button",
                onClick: () => ft(Kt => !Kt),
                className: `${ha} right-8`,
                title: x("选择常用 BASE URL"),
                children: c.jsx(Mi, {
                  size: 16
                })
              }), c.jsx("button", {
                type: "button",
                onMouseDown: Kt => Kt.preventDefault(),
                onClick: () => wt(Kt => !Kt),
                className: `${ha} right-2`,
                title: x(ht ? "隐藏" : "显示"),
                "aria-label": `${x(ht ? "隐藏" : "显示")} ${x("全局地址")}`,
                "aria-pressed": ht,
                children: ht ? c.jsx($d, {
                  size: 16
                }) : c.jsx(ul, {
                  size: 16
                })
              }), et && c.jsx("div", {
                className: `${ir} max-h-48`,
                children: wn.length === 0 ? c.jsx("div", {
                  className: `px-3 py-2 text-xs ${n ? "text-zinc-500" : "text-zinc-400"}`,
                  children: x("暂无常用 BASE URL")
                }) : wn.map(Kt => {
                  const Pr = (i || "").trim() === Kt;
                  return c.jsxs("div", {
                    className: `flex items-center ${n ? "hover:bg-zinc-800" : "hover:bg-zinc-100"}`,
                    children: [c.jsxs("button", {
                      type: "button",
                      onMouseDown: kr => kr.preventDefault(),
                      onClick: () => {
                        rt(), v ? v(Kt) : b == null || b(Kt), ft(!1);
                      },
                      className: `flex-1 min-w-0 px-3 py-1.5 text-left text-xs flex items-center justify-between ${n ? "text-zinc-200" : "text-zinc-700"}`,
                      title: ht ? Kt : gre(Kt),
                      children: [c.jsx("span", {
                        className: "truncate",
                        children: ht ? Kt : gre(Kt)
                      }), Pr ? c.jsx(io, {
                        size: 12,
                        className: "shrink-0 ml-2"
                      }) : null]
                    }), c.jsx("button", {
                      type: "button",
                      onMouseDown: kr => kr.preventDefault(),
                      onClick: kr => {
                        kr.stopPropagation(), _n(Kt);
                      },
                      className: `shrink-0 p-1.5 mr-1 rounded transition-colors ${n ? "text-zinc-500 hover:text-red-400 hover:bg-zinc-700" : "text-zinc-400 hover:text-red-600 hover:bg-zinc-200"}`,
                      title: x("从列表中删除"),
                      children: c.jsx(Na, {
                        size: 12
                      })
                    })]
                  }, Kt);
                })
              })]
            })]
          }), c.jsxs("div", {
            className: "settings-model-global-field",
            children: [c.jsx("label", {
              className: `block ${Lr} mb-2`,
              children: x("全局默认Key")
            }), c.jsxs("div", {
              className: "relative",
              ref: j,
              children: [c.jsx("input", {
                type: kt ? "text" : "password",
                value: nt,
                onChange: Kt => ze(Kt.target.value),
                onBlur: () => {
                  Le(), Dr(nt);
                },
                placeholder: "sk-...",
                className: `${Jr} pr-16`
              }), c.jsx("button", {
                type: "button",
                onClick: () => Qt(Kt => !Kt),
                className: `${ha} right-8`,
                title: x("选择常用 API KEY"),
                children: c.jsx(Mi, {
                  size: 16
                })
              }), c.jsx("button", {
                type: "button",
                onClick: () => St(Kt => !Kt),
                className: `${ha} right-2`,
                title: x(kt ? "隐藏" : "显示"),
                children: kt ? c.jsx($d, {
                  size: 16
                }) : c.jsx(ul, {
                  size: 16
                })
              }), hn && c.jsx("div", {
                className: `${ir} max-h-52`,
                children: Pn.length === 0 ? c.jsx("div", {
                  className: `px-3 py-2 text-xs ${n ? "text-zinc-500" : "text-zinc-400"}`,
                  children: x("暂无常用 API KEY")
                }) : Pn.map(Kt => c.jsxs("button", {
                  type: "button",
                  onClick: () => {
                    Ke(), y(Kt.key);
                    const Pr = Ue.find(kr => kr.label === Kt.label && kr.color === Kt.color);
                    Pr && Yn(Pr.id), Qt(!1);
                  },
                  className: "sketch-dropdown-item flex items-center justify-between",
                  children: [c.jsxs("span", {
                    className: "flex items-center gap-2 min-w-0",
                    children: [c.jsx("span", {
                      className: "inline-flex items-center px-2 py-0.5 rounded text-[10px] shrink-0",
                      style: {
                        backgroundColor: Kt.color,
                        color: Kt.textColor || "#111827"
                      },
                      children: Kt.label
                    }), c.jsx("span", {
                      className: "truncate",
                      children: Sft(Kt.key)
                    })]
                  }), c.jsx("span", {
                    className: `ml-2 text-[10px] ${n ? "text-zinc-500" : "text-zinc-400"}`,
                    onClick: Pr => {
                      Pr.preventDefault(), Pr.stopPropagation(), Ya(Kt);
                    },
                    children: x("删除")
                  })]
                }, Kt.id))
              })]
            }), c.jsxs("div", {
              className: "settings-model-key-actions mt-2 flex items-center gap-2 min-w-0 w-full",
              title: x("为当前全局 KEY 选择或保存标签"),
              children: [c.jsxs("div", {
                ref: B,
                className: "relative min-w-[10rem] flex-[2.2]",
                children: [(() => {
                  const Kt = Ue.find(Pr => Pr.id === rn) || ste[0];
                  return c.jsxs("button", {
                    type: "button",
                    onClick: () => en(Pr => !Pr),
                    className: `w-full relative flex items-center justify-center ${br}${Kn ? n ? " border-white/55" : " border-zinc-900" : ""}`,
                    children: [c.jsx("span", {
                      className: "truncate text-center text-xs px-5",
                      children: Kt.label
                    }), c.jsx(Mi, {
                      size: 14,
                      className: "absolute right-2.5 top-1/2 -translate-y-1/2 shrink-0 opacity-60 pointer-events-none"
                    })]
                  });
                })(), Kn ? c.jsxs("div", {
                  className: `${n ? "sketch-dropdown sketch-dropdown-dark" : "sketch-dropdown"} left-0 right-0 top-full z-[130] max-h-52 shadow-lg sketch-scrollbar-hidden`,
                  children: [c.jsx("div", {
                    className: `px-2.5 py-1 text-[10px] font-semibold tracking-wide ${n ? "text-zinc-500" : "text-zinc-400"}`,
                    children: x("常用标签")
                  }), ste.map(Kt => c.jsx("button", {
                    type: "button",
                    onClick: () => {
                      Yn(Kt.id), en(!1);
                    },
                    className: `w-full px-2.5 py-1.5 text-left text-xs flex items-center gap-2 rounded-md ${rn === Kt.id ? n ? "bg-zinc-800 text-zinc-100 ring-1 ring-inset ring-white/55" : "bg-zinc-100 text-zinc-900 ring-1 ring-inset ring-zinc-900/40" : n ? "text-zinc-200 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-50"}`,
                    children: c.jsx("span", {
                      className: "inline-flex max-w-full items-center truncate rounded px-1.5 py-0.5 text-[10px] shrink-0",
                      style: {
                        backgroundColor: Kt.color,
                        color: Kt.textColor
                      },
                      children: Kt.label
                    })
                  }, Kt.id)), Ct.length > 0 ? c.jsxs(c.Fragment, {
                    children: [c.jsx("div", {
                      className: `mx-2 my-1 ${Hr}`
                    }), c.jsx("div", {
                      className: `px-2.5 py-1 text-[10px] font-semibold tracking-wide ${n ? "text-zinc-500" : "text-zinc-400"}`,
                      children: x("自定义标签")
                    }), Ct.map(Kt => c.jsxs("div", {
                      className: `flex items-stretch w-full ${n ? "hover:bg-zinc-800/80" : "hover:bg-zinc-50"}`,
                      children: [c.jsx("button", {
                        type: "button",
                        onClick: () => {
                          Yn(Kt.id), en(!1);
                        },
                        className: `flex-1 min-w-0 px-2 py-1.5 text-left text-xs flex items-center gap-2 rounded-md ${rn === Kt.id ? n ? "bg-zinc-800 text-zinc-100 ring-1 ring-inset ring-white/55" : "bg-zinc-100 text-zinc-900 ring-1 ring-inset ring-zinc-900/40" : n ? "text-zinc-200" : "text-zinc-700"}`,
                        children: c.jsx("span", {
                          className: "inline-flex max-w-full items-center truncate rounded px-1.5 py-0.5 text-[10px] shrink-0",
                          style: {
                            backgroundColor: Kt.color,
                            color: Kt.textColor
                          },
                          children: Kt.label
                        })
                      }), c.jsx("button", {
                        type: "button",
                        title: x("删除标签"),
                        className: `shrink-0 px-2 flex items-center justify-center border-l ${n ? "border-zinc-700 text-zinc-500 hover:bg-red-950/40 hover:text-red-400" : "border-zinc-200 text-zinc-400 hover:bg-red-50 hover:text-red-600"}`,
                        onMouseDown: Pr => Pr.preventDefault(),
                        onClick: Pr => {
                          Pr.stopPropagation(), gr(Kt.id);
                        },
                        children: c.jsx(Na, {
                          size: 14,
                          strokeWidth: 2
                        })
                      })]
                    }, Kt.id))]
                  }) : null]
                }) : null]
              }), c.jsx("input", {
                type: "text",
                value: un,
                onChange: Kt => Jn(Kt.target.value),
                onKeyDown: Kt => {
                  Kt.key === "Enter" && (Kt.preventDefault(), Wr());
                },
                maxLength: 32,
                placeholder: x("自定义标签"),
                title: x("给当前 API Key 添加自定义标签"),
                className: `min-w-[8rem] !flex-[1.6] ${br}`
              }), c.jsx("button", {
                type: "button",
                onClick: Wr,
                className: `shrink-0 flex-none cursor-pointer px-3 ${br}`,
                title: x("添加自定义标签"),
                children: x("添加")
              }), c.jsx("button", {
                type: "button",
                onClick: () => {
                  Le(), Dr(nt);
                },
                className: `shrink-0 flex-none cursor-pointer px-3 ${br}`,
                children: x("保存Key")
              })]
            })]
          }), (we.length > 0 || J.length > 0) && c.jsxs("div", {
            className: "settings-vendor-bar",
            children: [c.jsx("div", {
              className: "settings-vendor-chips",
              role: "tablist",
              "aria-label": x("厂商"),
              children: we.map(Kt => c.jsxs("button", {
                type: "button",
                role: "tab",
                "aria-selected": Q === Kt.id,
                className: `settings-vendor-chip${Q === Kt.id ? " is-active" : ""}`,
                onClick: () => q(Pr => Pr === Kt.id ? null : Kt.id),
                children: [Kt.logoUrl ? c.jsx(qtn, {
                  url: Kt.logoUrl,
                  isDark: n,
                  size: 16
                }) : null, c.jsx("span", {
                  children: Kt.name
                })]
              }, Kt.id))
            }), J.length > 0 && c.jsxs("button", {
              onClick: () => z("ApiAccess"),
              className: `sketch-button sketch-button-primary shrink-0 flex items-center gap-1${pa}`,
              children: [c.jsx(eo, {
                size: 14
              }), x("管理 API 接入")]
            })]
          }), c.jsxs("div", {
            className: "space-y-4",
            children: [c.jsx(r8a, {
              isDark: n,
              checkboxClassName: Ga,
              showHiddenModelsInGenNodes: p,
              onSetShowHiddenModelsInGenNodes: m,
              searchQuery: K,
              onSearchQueryChange: W
            }), Y.length === 0 ? c.jsx("div", {
              className: `text-center py-8 ${n ? "text-zinc-500" : "text-zinc-400"}`,
              children: c.jsxs("p", {
                className: "text-sm",
                children: [x("暂无"), " ", DTn[G], " ", x("类型模型")]
              })
            }) : ce.length === 0 ? c.jsx("div", {
              className: `text-center py-8 ${n ? "text-zinc-500" : "text-zinc-400"}`,
              children: c.jsxs("p", {
                className: "text-sm",
                children: [x("没有匹配「"), K.trim(), x("」的模型")]
              })
            }) : ce.slice(0, fe).map(Kt => c.jsxs("div", {
              className: `${ea} settings-model-card p-4${rr === Kt.id || gn === Kt.id || Xt === Kt.id ? " settings-model-card-menu-open" : ""}`,
              children: [null, c.jsxs("div", {
                className: "settings-model-card-header flex items-center justify-between mb-3",
                children: [c.jsxs("div", {
                  className: "flex items-center gap-2",
                  children: [Cat(G) && (() => {
                    const Pr = Eat(Kt, G, n);
                    return Pr.logoUrl ? c.jsx(qtn, {
                      url: Pr.logoUrl,
                      isDark: n,
                      size: 18
                    }) : null;
                  })(), c.jsx("span", {
                    className: `sketch-section-title text-sm ${Za}`,
                    children: Yh(Kt.provider)
                  })]
                }), c.jsxs("div", {
                  className: "flex items-center gap-2",
                  children: [_z(Kt) && c.jsx("button", {
                    type: "button",
                    className: `text-xs ${n ? "text-zinc-400 hover:text-zinc-100" : "text-zinc-500 hover:text-zinc-900"}`,
                    onClick: () => Kt.isCustom ? le({
                      config: Kt,
                      editing: !0
                    }) : pe(Kt),
                    children: Kt.isCustom ? x("编辑自定义模型") : x("复制为自定义")
                  }), h && u && c.jsxs("label", {
                    className: `flex items-center gap-1 cursor-pointer select-none ${n ? "text-zinc-400" : "text-zinc-500"}`,
                    title: x("勾选后标记为不常用，不在画布各处的模型下拉列表中显示"),
                    onMouseDown: Pr => Pr.stopPropagation(),
                    children: [c.jsx("input", {
                      type: "checkbox",
                      className: Ga,
                      checked: u(Kt.id),
                      onChange: Pr => h(Kt.id, Pr.target.checked)
                    }), c.jsx("span", {
                      className: "text-[10px]",
                      children: x("不常用")
                    })]
                  }), Kt.isCustom && c.jsx("button", {
                    onClick: () => I(r.filter(Pr => Pr.id !== Kt.id)),
                    "aria-label": x("删除自定义模型 {0}", Kt.provider),
                    className: `p-1 rounded ${n ? "text-zinc-500 hover:text-red-400" : "text-zinc-400 hover:text-red-500"}`,
                    children: c.jsx(Na, {
                      size: 14
                    })
                  })]
                })]
              }), c.jsxs("div", {
                className: "settings-model-fields space-y-2",
                children: [c.jsxs("div", {
                  className: "flex items-center gap-3",
                  children: [c.jsx("label", {
                    className: `${tn}`,
                    children: "MODEL ID"
                  }), c.jsxs("div", {
                    className: "flex-1 relative",
                    "data-model-id-dropdown-id": Kt.id,
                    children: [(() => {
                      const Pr = `${Kt.id}:modelName`,
                        kr = It[Pr] ?? Kt.modelName;
                      return c.jsx("input", {
                        type: "text",
                        value: kr,
                        onChange: Mr => {
                          const Hn = Mr.target.value;
                          Ze(Pr, Hn, () => C(Kt.id, {
                            modelName: Hn
                          }));
                        },
                        onBlur: () => {
                          const Mr = It[Pr] ?? Kt.modelName;
                          Ge(Pr, () => C(Kt.id, {
                            modelName: Mr
                          })), vn(Kt.id, Mr);
                        },
                        onKeyDown: Mr => {
                          if (Mr.key === "Enter") {
                            const Hn = It[Pr] ?? Kt.modelName;
                            Ge(Pr, () => C(Kt.id, {
                              modelName: Hn
                            })), vn(Kt.id, Hn), qn(null);
                          }
                        },
                        placeholder: x("模型 ID…"),
                        className: `${br} w-full pr-10`
                      });
                    })(), c.jsx("button", {
                      type: "button",
                      onClick: () => {
                        Gn(null), qn(rr === Kt.id ? null : Kt.id);
                      },
                      className: `${ha} right-2`,
                      title: x("选择已保存的 MODEL ID"),
                      children: c.jsx(Mi, {
                        size: 14
                      })
                    }), rr === Kt.id && c.jsx("div", {
                      className: `${ir} max-h-52`,
                      children: ur(Kt.id, Kt.modelName).length === 0 ? c.jsx("div", {
                        className: `px-3 py-2 text-xs ${n ? "text-zinc-500" : "text-zinc-400"}`,
                        children: x("暂无保存的 MODEL ID")
                      }) : ur(Kt.id, Kt.modelName).map(Pr => {
                        const kr = (Kt.modelName || "").trim() === Pr;
                        return c.jsxs("button", {
                          type: "button",
                          onClick: () => {
                            Oe(`${Kt.id}:modelName`), C(Kt.id, {
                              modelName: Pr
                            }), vn(Kt.id, Pr), qn(null);
                          },
                          className: "sketch-dropdown-item flex items-center justify-between",
                          title: Pr,
                          children: [c.jsx("span", {
                            className: "truncate",
                            children: Pr
                          }), kr ? c.jsx(io, {
                            size: 12,
                            className: "shrink-0 ml-2"
                          }) : null]
                        }, Pr);
                      })
                    })]
                  })]
                }), c.jsxs("div", {
                  className: "flex items-center gap-3",
                  children: [c.jsx("label", {
                    className: `${tn}`,
                    children: "API KEY"
                  }), c.jsxs("div", {
                    className: "flex-1 relative",
                    "data-model-api-key-dropdown-id": Kt.id,
                    children: [(() => {
                      const Pr = Ift(Kt) ? a : IU(Kt, a),
                        kr = zr(Pr),
                        Mr = `${Kt.id}:key`,
                        Hn = It[Mr] ?? (() => {
                          const $t = String(Kt.savedApiKeyId || "").trim();
                          if ($t) {
                            const je = Ot.find(Qe => Qe.id === $t);
                            return (je == null ? void 0 : je.key) || Kt.key;
                          }
                          return Kt.key;
                        })();
                      return c.jsxs("div", {
                        className: `${br} w-full flex items-center gap-1.5 overflow-hidden`,
                        style: {
                          paddingTop: 0,
                          paddingBottom: 0,
                          paddingLeft: 0,
                          paddingRight: "3.5rem"
                        },
                        children: [kr ? c.jsx("span", {
                          className: "shrink-0 ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px]",
                          style: {
                            backgroundColor: kr.color,
                            color: kr.textColor || "#111827"
                          },
                          children: kr.label
                        }) : null, c.jsx("input", {
                          type: xt === Kt.id ? "text" : "password",
                          value: Hn,
                          onChange: $t => {
                            const je = $t.target.value;
                            Ze(Mr, je, () => C(Kt.id, {
                              key: je,
                              savedApiKeyId: void 0
                            }));
                          },
                          placeholder: "sk-...",
                          className: `min-w-0 flex-1 bg-transparent border-0 outline-none py-1.5 text-xs text-inherit ${kr ? "pl-0" : "pl-3"} pr-1`
                        })]
                      });
                    })(), c.jsx("button", {
                      type: "button",
                      onClick: () => {
                        mt(gn === Kt.id ? null : Kt.id);
                      },
                      className: `${ha} right-7`,
                      title: x("选择常用 API KEY"),
                      children: c.jsx(Mi, {
                        size: 14
                      })
                    }), c.jsx("button", {
                      type: "button",
                      onClick: () => yn(xt === Kt.id ? null : Kt.id),
                      className: `${ha} right-2`,
                      title: xt === Kt.id ? x("隐藏") : x("显示"),
                      children: xt === Kt.id ? c.jsx($d, {
                        size: 14
                      }) : c.jsx(ul, {
                        size: 14
                      })
                    }), gn === Kt.id && c.jsxs("div", {
                      className: `${ir} max-h-52`,
                      children: [c.jsxs("button", {
                        type: "button",
                        onClick: () => {
                          Oe(`${Kt.id}:key`), C(Kt.id, {
                            key: "",
                            savedApiKeyId: void 0
                          }), mt(null);
                        },
                        className: "sketch-dropdown-item flex items-center justify-between",
                        title: x("使用全局 KEY"),
                        children: [c.jsx("span", {
                          className: "truncate",
                          children: x("使用全局 KEY（不单独填写）")
                        }), Ift(Kt) ? c.jsx(io, {
                          size: 12,
                          className: "shrink-0 ml-2"
                        }) : null]
                      }), Pn.length === 0 ? c.jsx("div", {
                        className: `px-3 py-2 text-xs ${n ? "text-zinc-500" : "text-zinc-400"}`,
                        children: x("暂无常用 API KEY")
                      }) : Pn.map(Pr => c.jsxs("button", {
                        type: "button",
                        onClick: () => {
                          Oe(`${Kt.id}:key`), C(Kt.id, {
                            savedApiKeyId: Pr.id,
                            key: Pr.key
                          }), mt(null);
                        },
                        className: "sketch-dropdown-item flex items-center justify-between",
                        children: [c.jsxs("span", {
                          className: "flex items-center gap-2 min-w-0",
                          children: [c.jsx("span", {
                            className: "inline-flex items-center px-2 py-0.5 rounded text-[10px] shrink-0",
                            style: {
                              backgroundColor: Pr.color,
                              color: Pr.textColor || "#111827"
                            },
                            children: Pr.label
                          }), c.jsx("span", {
                            className: "truncate",
                            children: Sft(Pr.key)
                          })]
                        }), l9n(Kt, Pr) ? c.jsx(io, {
                          size: 12,
                          className: "shrink-0 ml-2"
                        }) : null]
                      }, Pr.id))]
                    })]
                  })]
                }), d && c.jsxs("div", {
                  children: [c.jsxs("div", {
                    className: "flex items-center gap-3",
                    children: [c.jsx("label", {
                      className: `${tn}`,
                      children: "BASE URL"
                    }), c.jsxs("div", {
                      className: "flex-1 relative",
                      "data-model-base-url-dropdown-id": Kt.id,
                      children: [(() => {
                        const Pr = Qa.modelFollowsGlobalBaseUrl(Kt.id),
                          kr = od(Kt, i || ""),
                          Mr = zyt(Kt, Pr),
                          Hn = `${Kt.id}:url`,
                          $t = It[Hn] ?? (kr ? Kt.url || "" : Mr ? i || Kt.url || "" : Kt.url || "");
                        return c.jsx("input", {
                          type: Bt(Kt.id) ? "text" : "password",
                          autoComplete: "off",
                          spellCheck: !1,
                          "aria-label": "BASE URL",
                          value: $t,
                          onChange: je => {
                            const Qe = je.target.value;
                            Ze(Hn, Qe, () => C(Kt.id, {
                              url: Qe,
                              followGlobalBaseUrl: !1
                            }));
                          },
                          onBlur: () => {
                            const je = (It[Hn] ?? Kt.url) || "";
                            String(je || "").trim() ? Ge(Hn, () => C(Kt.id, {
                              url: je,
                              followGlobalBaseUrl: !1
                            })) : (Oe(Hn), C(Kt.id, {
                              followGlobalBaseUrl: !0,
                              url: i || ""
                            })), ar(Kt.id, je);
                          },
                          onKeyDown: je => {
                            if (je.key === "Enter") {
                              const Qe = (It[Hn] ?? Kt.url) || "";
                              Ge(Hn, () => C(Kt.id, {
                                url: Qe,
                                followGlobalBaseUrl: !1
                              })), ar(Kt.id, Qe), Gn(null);
                            }
                          },
                          placeholder: Bt(Kt.id) ? FS(Kt.id) ? tS : hI(Kt.id) ? Xae : Eb(Kt.id) ? POe : "https://..." : "••••••••",
                          className: `${br} w-full pr-16`
                        });
                      })(), c.jsx("button", {
                        type: "button",
                        onClick: () => {
                          qn(null), Gn(Xt === Kt.id ? null : Kt.id);
                        },
                        className: `${ha} right-8`,
                        title: x("选择常用 BASE URL（含全局列表与本模型历史）"),
                        children: c.jsx(Mi, {
                          size: 14
                        })
                      }), c.jsx("button", {
                        type: "button",
                        onMouseDown: Pr => Pr.preventDefault(),
                        onClick: () => bt(jt === Kt.id ? null : Kt.id),
                        className: `${ha} right-2`,
                        title: jt === Kt.id ? x("隐藏") : x("显示"),
                        "aria-label": `${jt === Kt.id ? x("隐藏") : x("显示")} BASE URL`,
                        "aria-pressed": jt === Kt.id,
                        children: jt === Kt.id ? c.jsx($d, {
                          size: 14
                        }) : c.jsx(ul, {
                          size: 14
                        })
                      }), Xt === Kt.id && c.jsx("div", {
                        className: `${ir} max-h-52`,
                        children: (() => {
                          const Pr = Qa.modelFollowsGlobalBaseUrl(Kt.id),
                            kr = zyt(Kt, Pr);
                          return c.jsxs(c.Fragment, {
                            children: [c.jsxs("button", {
                              type: "button",
                              onMouseDown: Mr => Mr.preventDefault(),
                              onClick: () => {
                                Oe(`${Kt.id}:url`), C(Kt.id, {
                                  followGlobalBaseUrl: !0,
                                  url: i || ""
                                }), Gn(null);
                              },
                              className: "sketch-dropdown-item flex items-center justify-between",
                              title: x("使用全局 BASE URL"),
                              children: [c.jsx("span", {
                                className: "truncate",
                                children: x("使用全局 BASE URL（随全局切换）")
                              }), kr ? c.jsx(io, {
                                size: 12,
                                className: "shrink-0 ml-2"
                              }) : null]
                            }), An(Kt.id, Kt.url).map(Mr => {
                              const Hn = !kr && (Kt.url || "").trim() === Mr;
                              return c.jsxs("div", {
                                className: `flex items-center ${n ? "hover:bg-zinc-800" : "hover:bg-zinc-100"}`,
                                children: [c.jsxs("button", {
                                  type: "button",
                                  onMouseDown: $t => $t.preventDefault(),
                                  onClick: () => {
                                    Oe(`${Kt.id}:url`), C(Kt.id, {
                                      url: Mr,
                                      followGlobalBaseUrl: !1
                                    }), ar(Kt.id, Mr), jn(Mr), Gn(null);
                                  },
                                  className: `flex-1 min-w-0 px-3 py-1.5 text-left text-xs flex items-center justify-between ${n ? "text-zinc-200" : "text-zinc-700"}`,
                                  title: Bt(Kt.id) ? Mr : gre(Mr),
                                  children: [c.jsx("span", {
                                    className: "truncate",
                                    children: Bt(Kt.id) ? Mr : gre(Mr)
                                  }), Hn ? c.jsx(io, {
                                    size: 12,
                                    className: "shrink-0 ml-2"
                                  }) : null]
                                }), c.jsx("button", {
                                  type: "button",
                                  onMouseDown: $t => $t.preventDefault(),
                                  onClick: $t => {
                                    $t.stopPropagation(), Vt(Kt.id, Mr);
                                  },
                                  className: `shrink-0 p-1.5 mr-1 rounded transition-colors ${n ? "text-zinc-500 hover:text-red-400 hover:bg-zinc-700" : "text-zinc-400 hover:text-red-600 hover:bg-zinc-200"}`,
                                  title: x("从列表中删除"),
                                  children: c.jsx(Na, {
                                    size: 12
                                  })
                                })]
                              }, Mr);
                            })]
                          });
                        })()
                      })]
                    })]
                  }), FS(Kt.id) && (o3() || us()) && c.jsx("p", {
                    className: `text-[10px] mt-1 pl-[calc(theme(spacing.20)+0.75rem)] ${n ? "text-zinc-400" : "text-zinc-500"}`,
                    children: x("桌面版已内置方舟转发，填写官方地址即可，无需单独启动代理。")
                  })]
                })]
              }), c.jsx(RTa, {
                modelId: Kt.id,
                validationOnly: !!Kt.customProtocol,
                status: l[Kt.id],
                progress: s,
                isDark: n,
                onTest: E
              }), Kt.id === "minimax-h3-metaso" && c.jsx(gQn, {
                modelId: Kt.id
              })]
            }, Kt.id))]
          }), c.jsxs("div", {
            className: `hidden pt-4 ${Hr}`,
            children: [c.jsx("label", {
              className: `block ${Lr} mb-2`,
              children: x("API 端点切换")
            }), c.jsx("div", {
              className: "flex flex-wrap gap-2",
              children: T().map(Kt => c.jsx("button", {
                onClick: () => M(Kt.id),
                className: `sketch-button sketch-button-xs${pa}${o.id === Kt.id ? " sketch-button-primary" : " sketch-button-muted"}`,
                children: Kt.name
              }, Kt.id))
            })]
          })]
        })
      }), de && c.jsx(RDt, {
        initial: de.config,
        templates: N1.filter(Kt => Kt.type === de.config.type && _z(Kt)),
        editing: de.editing,
        isDark: n,
        onClose: () => le(null),
        onSave: Kt => {
          I(de.editing ? r.map(Pr => Pr.id === Kt.id ? Kt : Pr) : [...r, Kt]), le(null), W("");
        }
      })]
    });
  },
  E8a = g.memo(NQn),
  T8a = Object.freeze(Object.defineProperty({
    __proto__: null,
    SettingsPanel: NQn,
    default: E8a
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  M8a = [{
    id: "all",
    label: "全部"
  }, {
    id: "log",
    label: "日志"
  }, {
    id: "warn",
    label: "警告"
  }, {
    id: "error",
    label: "错误"
  }],
  jQn = "qdm-console-panel-height",
  DQn = 160,
  P8a = 320;

function R8a() {
  try {
    const e = Number(localStorage.getItem(jQn));
    if (Number.isFinite(e) && e >= DQn) return e;
  } catch {}
  return P8a;
}

function Jtn(e) {
  const t = Math.round(window.innerHeight * .85);
  return Math.min(t, Math.max(DQn, Math.round(e)));
}

function N8a(e) {
  return new Date(e).toLocaleTimeString(ew(), {
    hour12: !1
  });
}

function Ztn(e, t) {
  return e === "error" ? t ? "text-red-400" : "text-red-600" : e === "warn" ? t ? "text-amber-400" : "text-amber-600" : e === "info" ? t ? "text-sky-400/90" : "text-sky-600" : t ? "text-zinc-300" : "text-zinc-700";
}

function j8a(e) {
  return e === "error" ? "ERR" : e === "warn" ? "WRN" : e === "info" ? "INF" : "LOG";
}

const enn = ({
    isOpen: e,
    onClose: t,
    isDark: n = !0
  }) => {
    on();
    const r = ava(),
      [a, i] = g.useState("all"),
      [o, s] = g.useState(!1),
      [l, d] = g.useState(R8a),
      u = g.useRef(null),
      h = g.useRef(!0),
      p = g.useRef(null),
      m = g.useMemo(() => a === "all" ? r : a === "log" ? r.filter(T => T.level === "log" || T.level === "info") : r.filter(T => T.level === a), [r, a]);
    g.useEffect(() => {
      if (!e) return;
      const T = P => {
        if (P.key !== "Escape") return;
        const R = P.target;
        R && (R.tagName === "INPUT" || R.tagName === "TEXTAREA" || R.isContentEditable) || t();
      };
      return window.addEventListener("keydown", T), () => window.removeEventListener("keydown", T);
    }, [e, t]), g.useEffect(() => {
      if (!e || !h.current) return;
      const T = u.current;
      T && (T.scrollTop = T.scrollHeight);
    }, [m, e]);
    const f = g.useCallback(() => {
        const T = u.current;
        T && (h.current = T.scrollHeight - T.scrollTop - T.clientHeight < 48);
      }, []),
      y = g.useCallback(async () => {
        const T = ova(a);
        if (T) try {
          await navigator.clipboard.writeText(T), s(!0), window.setTimeout(() => s(!1), 1200);
        } catch {}
      }, [a]),
      b = g.useCallback(T => {
        T.button === 0 && (T.preventDefault(), T.stopPropagation(), p.current = {
          startY: T.clientY,
          startH: l
        }, T.currentTarget.setPointerCapture(T.pointerId));
      }, [l]),
      v = g.useCallback(T => {
        const P = p.current;
        if (!P) return;
        const R = Jtn(P.startH + (P.startY - T.clientY));
        d(R);
      }, []),
      _ = g.useCallback(T => {
        if (p.current) {
          p.current = null;
          try {
            T.currentTarget.releasePointerCapture(T.pointerId);
          } catch {}
          d(P => {
            const R = Jtn(P);
            try {
              localStorage.setItem(jQn, String(R));
            } catch {}
            return R;
          });
        }
      }, []);
    if (!e) return null;
    const w = n ? "border-white/10 bg-[#0c0c0e] text-zinc-300" : "border-zinc-200 bg-white text-zinc-700",
      k = n ? "border-white/[0.06]" : "border-zinc-200",
      A = n ? "text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.06]" : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-900/[0.04]",
      S = n ? "text-zinc-300" : "text-zinc-800",
      C = n ? "text-zinc-500" : "text-zinc-400",
      I = n ? "text-zinc-600" : "text-zinc-400",
      E = n ? "text-zinc-600" : "text-zinc-400",
      M = n ? "bg-white/20" : "bg-zinc-400/70";
    return Da.createPortal(c.jsx("div", {
      className: "fixed bottom-3 left-1/2 z-40 -translate-x-1/2 pointer-events-none",
      role: "complementary",
      "aria-label": x("日志"),
      children: c.jsxs("div", {
        className: `pointer-events-auto w-[min(920px,calc(100vw-24px))] flex flex-col overflow-hidden rounded-xl border shadow-2xl ${w}`,
        style: {
          height: l
        },
        onMouseDown: T => T.stopPropagation(),
        onPointerDown: T => T.stopPropagation(),
        children: [c.jsx("div", {
          className: "shrink-0 h-2 cursor-ns-resize flex items-center justify-center",
          onPointerDown: b,
          onPointerMove: v,
          onPointerUp: _,
          onPointerCancel: _,
          title: x("拖动调整高度"),
          children: c.jsx("span", {
            className: `block h-0.5 w-8 rounded-full ${M}`
          })
        }), c.jsxs("div", {
          className: `flex items-center gap-2 shrink-0 px-3 pb-2 border-b ${k}`,
          children: [c.jsx("svg", {
            width: 8,
            height: 14,
            viewBox: "0 0 8 16",
            fill: "none",
            className: `${C} shrink-0`,
            "aria-hidden": !0,
            children: c.jsx("path", {
              d: "M1.5 3 L6.5 8 L1.5 13",
              stroke: "currentColor",
              strokeWidth: 1.75,
              strokeLinecap: "round",
              strokeLinejoin: "round"
            })
          }), c.jsx("h3", {
            className: `text-[12px] font-medium tracking-wide ${S}`,
            children: x("日志")
          }), c.jsx("div", {
            className: "ml-2 flex items-center gap-0.5",
            children: M8a.map(T => {
              const P = a === T.id;
              return c.jsx("button", {
                type: "button",
                onClick: () => i(T.id),
                className: `px-2 py-0.5 rounded text-[11px] transition-colors ${P ? n ? "text-zinc-200 bg-white/[0.08]" : "text-zinc-800 bg-zinc-100" : n ? "text-zinc-500 hover:text-zinc-300" : "text-zinc-500 hover:text-zinc-700"}`,
                children: x(T.label)
              }, T.id);
            })
          }), c.jsxs("div", {
            className: "ml-auto flex items-center gap-1",
            children: [c.jsxs("button", {
              type: "button",
              onClick: y,
              className: `flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] ${A}`,
              children: [o ? c.jsx(io, {
                size: 12
              }) : c.jsx(Cx, {
                size: 12
              }), x(o ? "已复制" : "复制")]
            }), c.jsxs("button", {
              type: "button",
              onClick: () => iva(),
              className: `flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] ${A}`,
              children: [c.jsx(Qo, {
                size: 12
              }), x("清空")]
            }), c.jsx("button", {
              type: "button",
              onClick: t,
              className: `p-0.5 rounded ${A}`,
              "aria-label": x("关闭"),
              children: c.jsx(Na, {
                size: 14
              })
            })]
          })]
        }), c.jsx("div", {
          ref: u,
          onScroll: f,
          className: "app-console-scroll flex-1 min-h-0 overflow-y-auto px-3 py-2 font-mono text-[11px] leading-[1.55] select-text",
          children: m.length === 0 ? c.jsx("p", {
            className: `pt-8 text-center text-[12px] ${I}`,
            children: x("暂无输出。生成或发送请求后，发送内容会出现在这里。")
          }) : m.map(T => c.jsxs("div", {
            className: "flex gap-2 py-[1px]",
            children: [c.jsx("span", {
              className: `shrink-0 tabular-nums ${E}`,
              children: N8a(T.ts)
            }), c.jsx("span", {
              className: `shrink-0 w-7 ${Ztn(T.level, n)}`,
              children: j8a(T.level)
            }), c.jsx("pre", {
              className: `min-w-0 flex-1 whitespace-pre-wrap break-all m-0 ${Ztn(T.level, n)}`,
              children: T.text
            })]
          }, T.id))
        })]
      })
    }), document.body);
  },
  D8a = Object.freeze(Object.defineProperty({
    __proto__: null,
    ConsolePanel: enn,
    default: enn
  }, Symbol.toStringTag, {
    value: "Module"
  }));

let tnn = Promise.resolve();

const GNe = [];

let d6e = !1;

const o1t = new Set(),
  Mat = new Set();

function LQn(e) {
  return String(e.id || e._assetId || e._ossRemoteUrl || e.originalUrl || e.url || e.thumbnailUrl || "");
}

function OQn(e) {
  if (typeof window < "u" && typeof window.requestIdleCallback == "function") {
    window.requestIdleCallback(() => e(), {
      timeout: 1e3
    });
    return;
  }
  setTimeout(e, 16);
}

function BQn() {
  if (d6e || GNe.length === 0) return;
  d6e = !0;
  const e = GNe.shift();
  if (!e) {
    d6e = !1;
    return;
  }
  GQn(e.item).catch(t => {
    var n;
    (n = e.onError) == null || n.call(e, t);
  }).finally(() => {
    o1t.delete(e.key), d6e = !1, GNe.length > 0 && OQn(BQn);
  });
}

function FQn(e) {
  if (!ua()) return;
  const t = LQn(e);
  t && Mat.has(t) || (t && Mat.add(t), tnn = tnn.then(async () => {
    try {
      const {
        deleteHistoryItemFromOss: n
      } = await Ie(async () => {
        const {
          deleteHistoryItemFromOss: r
        } = await Promise.resolve().then(() => qh);
        return {
          deleteHistoryItemFromOss: r
        };
      }, void 0, import.meta.url);
      await n(e);
    } catch (n) {
      console.warn("[historyCacheDelete] 静默清理云端资源失败:", n);
    }
  }).catch(n => {
    console.warn("[historyCacheDelete] 云端删除队列异常:", n);
  }).finally(() => {
    t && Mat.delete(t);
  }));
}

function L8a(e) {
  var l;
  const t = e._mjAssetIds,
    n = e._audioAssetId;
  e.type === "video" && e.url && (e.url.includes("prod-ss-vidu") || e.url.includes("prod-sa-vidu") || e.url.includes("amazonaws") && e.url.includes("vidu"));
  const r = new Set([e._assetId, e._thumbnailAssetId, e.id, ...(t || []), n].filter(Boolean)),
    a = Math.max(((l = e.mjImages) == null ? void 0 : l.length) ?? 0, 1);
  for (let d = 0; d < a; d++) r.add(`${e.id}_${d}`);
  const i = [...r].flatMap(d => [`thumb_${d}`, `preview_${d}`]),
    o = new Set([...r, ...i]),
    s = [e._ossRemoteUrl, e.originalUrl, e.url, e.thumbnailUrl, e._ossThumbnailUrl, ...(e.mjImages || [])].filter(d => typeof d == "string" && nr(d));
  for (const d of s) o.add(wHe(d));
  return [...o];
}

async function zQn(e) {
  let t = null;
  if (e.type === "video" && e.url && (e.url.includes("prod-ss-vidu") || e.url.includes("prod-sa-vidu") || e.url.includes("amazonaws") && e.url.includes("vidu")) && e.url) {
    const {
      getViduVideoAssetId: i
    } = await Ie(async () => {
      const {
        getViduVideoAssetId: o
      } = await Promise.resolve().then(() => bjt);
      return {
        getViduVideoAssetId: o
      };
    }, void 0, import.meta.url);
    t = i(e.id, e.url);
  }
  const r = L8a(e);
  if (t && r.push(t, `thumb_${t}`, `preview_${t}`), r.length === 0) return;
  const a = [...new Set(r)];
  await ni.deleteAssets(a);
}

async function UQn(e) {
  for (let n = 0; n < e.length; n += 4) await Promise.all(e.slice(n, n + 4).map(r => zQn(r)));
}

function $Qn(e) {
  for (const t of e) FQn(t);
}

async function GQn(e) {
  await zQn(e), FQn(e);
}

function VQn(e, t) {
  const n = LQn(e);
  n && o1t.has(n) || (n && o1t.add(n), GNe.push({
    item: e,
    key: n,
    onError: t
  }), OQn(BQn));
}

async function s1t(e) {
  await UQn(e), $Qn(e);
}

const O8a = Object.freeze(Object.defineProperty({
    __proto__: null,
    deleteCachesForHistoryItem: GQn,
    deleteCachesForHistoryItems: s1t,
    deleteLocalCachesForHistoryItems: UQn,
    enqueueDeleteCachesForHistoryItem: VQn,
    enqueueDeleteOssMaterialsForHistoryItems: $Qn
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  mze = ({
    audioUrl: e,
    isDark: t,
    title: n,
    onDownload: r,
    onDownloadAsMp3: a,
    className: i = "",
    initialDuration: o,
    onDurationResolved: s,
    showToast: l,
    variant: d = "default"
  }) => {
    on();
    const u = g.useRef(null),
      h = g.useRef(s);
    h.current = s;
    const p = g.useRef(o || 0),
      [m, f] = g.useState(!1),
      [y, b] = g.useState(0),
      [v, _] = g.useState(o || 0),
      [w, k] = g.useState(1),
      [A, S] = g.useState(!1),
      C = G => {
        !Number.isFinite(G) || G <= 0 || _(z => Math.max(z, G));
      };
    g.useEffect(() => {
      var G;
      v > p.current && (p.current = v, (G = h.current) == null || G.call(h, v));
    }, [v]), g.useEffect(() => {
      var K;
      const G = u.current;
      if (!G || !(e != null && e.trim())) return;
      const z = () => {
          b(G.currentTime);
          const W = hQ(G);
          W && W > 0 && C(W);
        },
        V = () => {
          const W = hQ(G);
          if (W && W > 0) {
            C(W);
            return;
          }
          o && o > 0 && C(o);
        },
        O = () => {
          f(!1);
          const W = G.currentTime;
          W > 0 && C(W);
        },
        L = W => {
          e != null && e.trim() && console.error("[AudioPlayer] Audio load error:", W), f(!1);
        },
        D = () => {
          V();
        },
        U = () => {
          V();
        };
      G.addEventListener("timeupdate", z), G.addEventListener("loadedmetadata", U), G.addEventListener("durationchange", V), G.addEventListener("progress", V), G.addEventListener("ended", O), G.addEventListener("error", L), G.addEventListener("canplay", D), o && o > 0 && C(o), V();
      const H = ["mp3", "wav", "ogg", "m4a", "aac", "flac", "webm"],
        Y = ((K = e.split(".").pop()) == null ? void 0 : K.toLowerCase()) || "";
      return (!Y || !H.includes(Y)) && G.load(), () => {
        G.removeEventListener("timeupdate", z), G.removeEventListener("loadedmetadata", U), G.removeEventListener("durationchange", V), G.removeEventListener("progress", V), G.removeEventListener("ended", O), G.removeEventListener("error", L), G.removeEventListener("canplay", D);
      };
    }, [e, o]), g.useEffect(() => {
      if (o && o > 0) {
        _(o);
        return;
      }
      if (!/^https?:\/\//i.test(e)) return;
      let G = !1;
      return gQe(e).then(z => {
        !G && z && z > 0 && C(z);
      }), () => {
        G = !0;
      };
    }, [e, o]);
    const I = () => {
        const G = u.current;
        G && (m ? G.pause() : G.play(), f(!m));
      },
      E = G => {
        const z = u.current;
        if (!z) return;
        const V = parseFloat(G.target.value);
        z.currentTime = V, b(V);
      },
      M = G => {
        const z = u.current;
        if (!z) return;
        const V = parseFloat(G.target.value);
        z.volume = V, k(V), S(V === 0);
      },
      T = () => {
        const G = u.current;
        G && (A ? (G.volume = w || .5, S(!1)) : (G.volume = 0, S(!0)));
      },
      P = G => {
        if (isNaN(G) || !isFinite(G) || G < 0) return "0:00";
        const z = Math.floor(G / 60),
          V = Math.floor(G % 60);
        return `${z}:${V.toString().padStart(2, "0")}`;
      },
      R = v > 0 ? y / v * 100 : 0,
      j = (A ? 0 : w) * 100,
      B = [3, 6, 4, 8, 5, 7, 3, 6, 4],
      F = async G => {
        var z;
        if (G.preventDefault(), G.stopPropagation(), r) {
          try {
            await r(), l && l("音频下载成功", "success");
          } catch (V) {
            console.error("[AudioPlayer] Download failed:", V), l && l("音频下载失败", "error");
          }
          return;
        }
        if (e) try {
          const V = await fetch(e, {
            method: "GET",
            mode: "cors"
          });
          if (!V.ok) throw new Error("下载失败");
          const O = await V.blob(),
            L = URL.createObjectURL(O),
            D = `${n || "audio"}.${((z = e.split(".").pop()) == null ? void 0 : z.split("?")[0]) || "mp3"}`,
            U = document.createElement("a");
          U.href = L, U.download = D, U.style.display = "none", document.body.appendChild(U), U.click(), setTimeout(() => {
            document.body.removeChild(U), URL.revokeObjectURL(L);
          }, 100);
        } catch (V) {
          console.error("[AudioPlayer] Fetch download failed:", V), l && l("音频下载失败，请右键播放器另存为", "error");
        }
      },
      N = c.jsx("audio", {
        ref: u,
        src: e != null && e.trim() ? e : void 0,
        preload: "metadata",
        crossOrigin: "anonymous",
        children: c.jsx("p", {
          className: `text-xs ${t ? "text-zinc-400" : "text-zinc-600"}`,
          children: x("您的浏览器不支持音频播放")
        })
      });
    return d === "card" ? c.jsxs("div", {
      className: `group/audio-card relative flex h-full min-h-[120px] w-full items-center justify-center ${i}`,
      onClick: G => G.stopPropagation(),
      children: [N, c.jsxs("div", {
        className: `relative flex h-full w-full items-center justify-center ${t ? "bg-[#2a2a2a]" : "bg-zinc-200"}`,
        children: [c.jsx("div", {
          className: "flex h-6 items-end gap-0.5 opacity-40",
          "aria-hidden": !0,
          children: B.map((G, z) => c.jsx("div", {
            className: `w-0.5 rounded-full ${t ? "bg-white/50" : "bg-zinc-500"}`,
            style: {
              height: `${G * 3}px`
            }
          }, z))
        }), c.jsx("button", {
          type: "button",
          onClick: G => {
            G.stopPropagation(), I();
          },
          onMouseDown: G => G.stopPropagation(),
          className: `absolute flex h-9 w-9 items-center justify-center rounded-full transition-opacity ${m ? "opacity-100" : "pointer-events-none opacity-0 group-hover/audio-card:pointer-events-auto group-hover/audio-card:opacity-100 group-focus-within/audio-card:pointer-events-auto group-focus-within/audio-card:opacity-100"} ${t ? "bg-[#e5e5e5] text-[#1a1a1a] hover:bg-white" : "bg-zinc-900 text-white hover:bg-black"}`,
          title: x(m ? "暂停" : "播放"),
          "aria-label": m ? "pause" : "play",
          children: m ? c.jsx(d3, {
            size: 16,
            fill: "currentColor"
          }) : c.jsx(Ol, {
            size: 16,
            className: "ml-0.5",
            fill: "currentColor"
          })
        })]
      })]
    }) : c.jsxs("div", {
      className: `flex flex-col gap-2 ${i}`,
      onDoubleClick: G => {
        G.stopPropagation();
      },
      onClick: G => {
        G.target === G.currentTarget && G.stopPropagation();
      },
      children: [N, n && c.jsx("div", {
        className: `text-xs font-medium truncate ${t ? "text-zinc-300" : "text-zinc-700"}`,
        children: n
      }), c.jsxs("div", {
        className: `group flex items-center ${d === "compact" ? "gap-1 p-1.5" : "gap-1.5 p-2"} rounded-lg border ${t ? "bg-zinc-800/50 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`,
        onClick: G => G.stopPropagation(),
        onMouseDown: G => G.stopPropagation(),
        children: [c.jsx("button", {
          onClick: G => {
            G.stopPropagation(), I();
          },
          onMouseDown: G => {
            G.stopPropagation();
          },
          className: `${d === "compact" ? "p-1" : "p-1.5"} rounded transition-colors ${t ? "hover:bg-zinc-700 text-zinc-300" : "hover:bg-zinc-200 text-zinc-600"}`,
          title: x(m ? "暂停" : "播放"),
          children: m ? c.jsx(d3, {
            size: d === "compact" ? 14 : 16
          }) : c.jsx(Ol, {
            size: d === "compact" ? 14 : 16
          })
        }), c.jsxs("div", {
          className: "flex-1 flex items-center gap-1.5 min-w-0",
          children: [c.jsx("span", {
            className: `${d === "compact" ? "text-[9px]" : "text-[10px]"} font-mono shrink-0 text-right ${t ? "text-zinc-400" : "text-zinc-500"}`,
            style: {
              minWidth: "32px",
              maxWidth: "40px"
            },
            children: P(y)
          }), c.jsx("input", {
            type: "range",
            min: "0",
            max: v || 0,
            value: y,
            onChange: E,
            className: `flex-1 min-w-0 appearance-none cursor-pointer ${d === "compact" ? "audio-slider-compact" : "audio-slider"}`,
            style: {
              background: `linear-gradient(to right, ${t ? "#3b82f6" : "#2563eb"} 0%, ${t ? "#3b82f6" : "#2563eb"} ${R}%, ${t ? "#27272a" : "#e4e4e7"} ${R}%, ${t ? "#27272a" : "#e4e4e7"} 100%)`
            }
          }), c.jsx("span", {
            className: `${d === "compact" ? "text-[9px]" : "text-[10px]"} font-mono shrink-0 ${t ? "text-zinc-400" : "text-zinc-500"}`,
            style: {
              minWidth: "32px",
              maxWidth: "40px"
            },
            children: P(v)
          })]
        }), c.jsxs("div", {
          className: "flex items-center gap-1 shrink-0",
          children: [c.jsx("button", {
            onClick: G => {
              G.stopPropagation(), T();
            },
            onMouseDown: G => {
              G.stopPropagation();
            },
            className: `p-1 rounded transition-colors ${t ? `${A ? "bg-blue-600/30 text-blue-300" : "text-zinc-300"} hover:bg-zinc-700` : `${A ? "bg-blue-100 text-blue-700" : "text-zinc-600"} hover:bg-zinc-200`}`,
            title: x(A ? "取消静音" : "静音"),
            "aria-pressed": A,
            children: A ? c.jsx(DY, {
              size: d === "compact" ? 13 : 14
            }) : c.jsx(B5, {
              size: d === "compact" ? 13 : 14
            })
          }), d !== "compact" && c.jsx("input", {
            type: "range",
            min: "0",
            max: "1",
            step: "0.1",
            value: A ? 0 : w,
            onChange: M,
            className: "w-12 appearance-none cursor-pointer audio-slider shrink-0",
            style: {
              background: `linear-gradient(to right, ${t ? "#3b82f6" : "#2563eb"} 0%, ${t ? "#3b82f6" : "#2563eb"} ${j}%, ${t ? "#27272a" : "#e4e4e7"} ${j}%, ${t ? "#27272a" : "#e4e4e7"} 100%)`
            }
          })]
        }), c.jsx("button", {
          type: "button",
          onClick: F,
          onMouseDown: G => G.stopPropagation(),
          onDoubleClick: G => G.stopPropagation(),
          className: `${d === "compact" ? "p-1 opacity-0 group-hover:opacity-100" : "p-1.5 opacity-100"} rounded transition-colors audio-player-download inline-flex items-center justify-center ${t ? "hover:bg-zinc-700 text-zinc-300 hover:text-white" : "hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900"}`,
          title: x("下载音频"),
          style: {
            cursor: "pointer"
          },
          children: c.jsx(ws, {
            size: d === "compact" ? 14 : 16
          })
        }), a && d !== "compact" && c.jsx("button", {
          type: "button",
          onClick: G => {
            G.preventDefault(), G.stopPropagation(), a();
          },
          onMouseDown: G => G.stopPropagation(),
          onDoubleClick: G => G.stopPropagation(),
          className: `p-1.5 rounded transition-colors inline-flex items-center justify-center text-xs ${t ? "hover:bg-zinc-700 text-zinc-300 hover:text-white" : "hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900"}`,
          title: x("转为 MP3 并下载"),
          style: {
            cursor: "pointer"
          },
          children: "MP3"
        })]
      })]
    });
  },
  l1t = ({
    visible: e,
    progress: t,
    status: n,
    type: r,
    onCancel: a,
    isDark: i = !0
  }) => (on(), e ? c.jsx("div", {
    className: `fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-[2px] animate-in fade-in duration-300 select-none ${i ? "bg-black/40" : "bg-zinc-900/25"}`,
    style: {
      pointerEvents: a ? "auto" : "none"
    },
    children: c.jsxs("div", {
      className: `relative rounded-2xl p-8 shadow-2xl flex flex-col items-center min-w-[300px] backdrop-blur-xl ${i ? "bg-[#09090b]/90 border border-white/10" : "bg-white/95 border border-zinc-200"}`,
      children: [c.jsx("div", {
        className: `absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 blur-[50px] rounded-full pointer-events-none ${i ? "bg-blue-500/20" : "bg-blue-400/30"}`
      }), a && c.jsx("button", {
        onClick: a,
        className: i ? "absolute top-3 right-3 p-1.5 rounded-lg bg-zinc-800/50 hover:bg-red-500/20 border border-zinc-700 hover:border-red-500/50 text-zinc-400 hover:text-red-400 transition-all duration-200 group" : "absolute top-3 right-3 p-1.5 rounded-lg bg-zinc-100 hover:bg-red-50 border border-zinc-200 hover:border-red-300 text-zinc-600 hover:text-red-600 transition-all duration-200 group",
        title: x("取消操作"),
        children: c.jsx(Na, {
          size: 16,
          className: "group-hover:rotate-90 transition-transform duration-200"
        })
      }), c.jsxs("div", {
        className: "flex flex-col items-center gap-1 mb-6 z-10",
        children: [c.jsx("span", {
          className: "font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500",
          children: r === "import" ? "DATA INGESTION" : "SYSTEM ARCHIVING"
        }), c.jsxs("div", {
          className: `text-4xl font-bold tracking-tighter font-sans ${i ? "text-zinc-200" : "text-zinc-900"}`,
          children: [t.toFixed(0), c.jsx("span", {
            className: "text-sm ml-1 text-zinc-500",
            children: "%"
          })]
        })]
      }), c.jsx("div", {
        className: `relative w-full h-[2px] rounded-full overflow-hidden mb-4 ${i ? "bg-zinc-800" : "bg-zinc-200"}`,
        children: c.jsx("div", {
          className: i ? "absolute top-0 left-0 h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-100 ease-linear" : "absolute top-0 left-0 h-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.45)] transition-all duration-100 ease-linear",
          style: {
            width: `${t}%`
          }
        })
      }), c.jsx("span", {
        className: `text-[10px] font-mono tracking-widest uppercase animate-pulse ${i ? "text-zinc-400" : "text-zinc-600"}`,
        children: n
      })]
    })
  }) : null);

function B8a(e) {
  return !!e && /^https?:\/\//i.test(e) && /aliyuncs\.com/i.test(e);
}

function i5(e, t) {
  const n = String(e || "").trim();
  if (!(!n || n.startsWith("blob:")) && !(vs(n) && ei())) return n;
}

let L0e = null;

async function HQn() {
  return L0e || (L0e = (async () => {
    try {
      await Ur.ensureRestored(), Ur.isAvailable() && (await Ur.registerAssetProtocolScope());
    } catch (e) {
      console.warn("[BatchManageModal] 登记 asset protocol scope 失败:", e);
    }
  })(), L0e);
}

function F8a() {
  L0e = null;
}

function NDt(e) {
  if (!e) return !1;
  if (e.startsWith("data:image") || e.startsWith("blob:")) return !0;
  const t = e.toLowerCase();
  return t.startsWith("data:video/") ? !1 : /\.(jpe?g|png|webp|gif|bmp)(\?|$)/i.test(t) || t.includes("/thumbnails/");
}

function z8a(...e) {
  for (const t of e) if (t && !B8a(t)) return t;
}

function yH(e, ...t) {
  if (vv(e)) {
    for (const r of t) if (r && (nr(r) || NDt(r))) return r;
    for (const r of t) if (r) return r;
    return jg(e) || sZ(e) || void 0;
  }
  return z8a(...t);
}

const WQn = "qiaodoumayi_batch_manage_favorites",
  qQn = "qiaodoumayi_batch_manage_date_layer",
  KQn = "qiaodoumayi_batch_manage_date_sort",
  QQn = "qiaodoumayi_batch_manage_selection_mode",
  nnn = 48;

function U8a() {
  try {
    const e = localStorage.getItem(KQn);
    if (e === "asc" || e === "desc") return e;
  } catch {}
  return "desc";
}

function $8a() {
  try {
    return localStorage.getItem(QQn) === "1";
  } catch {
    return !1;
  }
}

function G8a() {
  try {
    const e = localStorage.getItem(WQn);
    if (!e) return new Set();
    const t = JSON.parse(e);
    return new Set(Array.isArray(t) ? t.map(String) : []);
  } catch {
    return new Set();
  }
}

function V8a(e) {
  try {
    localStorage.setItem(WQn, JSON.stringify([...e]));
  } catch {}
}

function H8a() {
  try {
    const e = localStorage.getItem(qQn);
    if (e === "0") return !1;
    if (e === "1") return !0;
  } catch {}
  return !0;
}

function c1t(e) {
  return ZJ(e);
}

function W8a(e) {
  if (!e) return {
    key: "unknown",
    label: "未知日期"
  };
  const t = new Date(e),
    n = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`,
    r = `${t.getMonth() + 1}月${t.getDate()}日`;
  return {
    key: n,
    label: r
  };
}

function YQn(e) {
  const t = new Map();
  for (const n of e) {
    const {
      key: r,
      label: a
    } = W8a(c1t(n));
    let i = t.get(r);
    i || (i = {
      key: r,
      label: a,
      items: []
    }, t.set(r, i)), i.items.push(n);
  }
  return [...t.values()];
}

function q8a(e, t) {
  const n = t.trim().toLowerCase();
  return n ? `${e.prompt || ""} ${e.modelName || ""} ${e.id} ${e.type} ${e.musicTitle || ""} ${e.time || ""}`.toLowerCase().includes(n) : !0;
}

async function K8a(e) {
  const t = {},
    n = [];
  if (e._globalOssUrlOnly || Nk(e)) {
    let u = await hf(e);
    const h = jg(e) || e._ossThumbnailUrl || e.thumbnailUrl || (e.type !== "video" ? e.url : void 0);
    if (e.type === "video") {
      const _ = await jae(e);
      _ && (u = _);
    } else if (e.type !== "audio") {
      const _ = await Dae(e);
      _ && (u = _);
    } else !u && h && nr(h) && (await h5e(e.id, h)) && (u = await hf(e));
    const p = hLe(e, u) || h,
      m = Bd(e) || e._ossRemoteUrl || e.url;
    e.type === "video" ? (m && (t.main = m), p && (t.poster = p)) : p && (t.main = p), await Ur.ensureRestored();
    const {
        assetStore: f
      } = await Ie(async () => {
        const {
          assetStore: _
        } = await Promise.resolve().then(() => Ri);
        return {
          assetStore: _
        };
      }, void 0, import.meta.url),
      y = [e._assetId, ...(e.type !== "audio" ? [e.id] : [])].filter(Boolean),
      b = e.type !== "video" && e.type !== "audio" && !!t.main;
    let v = null;
    if (!b) for (const _ of y) {
      if (Ur.isAvailable() && Ur.hasAsset(_) && (v = await Ur.readAssetAsUrl(_)), v || (v = await f.getAssetUrl(_)), e.type === "video") {
        if (v && EE(v)) break;
      } else if (v) break;
      v = null;
    }
    if (v && (e.type === "video" ? t.main = v : t.main || (t.main = v)), e.type === "video" ? t.localCached = EE(v || t.main) : t.localCached = !!v || Ur.isAvailable() && y.some(_ => Ur.hasAsset(_)), e.mjImages && e.mjImages.length > 1) {
      const _ = await Promise.all(e.mjImages.map((w, k) => hf({
        ...e,
        id: e.id,
        selectedMjImageIndex: k
      }, k)));
      t.mj = e.mjImages.map((w, k) => {
        const A = OM(e, k);
        return _[k] || A || w;
      });
    }
    return t;
  }
  await HQn();
  const {
      assetStore: r
    } = await Ie(async () => {
      const {
        assetStore: u
      } = await Promise.resolve().then(() => Ri);
      return {
        assetStore: u
      };
    }, void 0, import.meta.url),
    a = u => Ur.isAvailable() && Ur.hasThumbnail(u, "preview") ? Ur.readThumbnail(u, "preview") : Promise.resolve(null),
    i = u => Ur.isAvailable() && Ur.hasAsset(u) ? Ur.readAssetAsUrl(u) : Promise.resolve(null),
    o = e._mjAssetIds,
    s = e._audioAssetId,
    l = [e._assetId, e.id].filter(Boolean);
  let d = !1;
  for (const u of l) {
    const h = await a(u),
      p = e.type === "video" || e.type === "audio" || !h;
    let m = null;
    if (p && (m = await i(u), m || (m = await r.getAssetUrl(u))), m && (d = !0), e.type === "video") {
      if (m) {
        t.main = m, h && (t.poster = h);
        break;
      }
      h && (t.poster = h);
    } else {
      if (h) {
        t.main = h, t.poster = h, d = !0;
        break;
      }
      if (m) {
        t.main = m;
        break;
      }
    }
  }
  if (o != null && o.length) {
    const h = (await Promise.all(o.map(async p => (await i(p)) || r.getAssetUrl(p)))).filter(Boolean);
    h.length && (t.mj = h, t.main || (t.main = h[0]), d = !0);
  }
  if (s) {
    let u = await i(s);
    u || (u = await r.getAssetUrl(s)), u && (t.audio = u, d = !0);
  }
  if (e.type === "video" ? t.localCached = EE(t.main) : t.localCached = await Y3n(e, {
    mjAssetIds: o,
    audioAssetId: s,
    hasResolvedFromStore: d
  }), e.ossUploaded && !e._globalOssUrlOnly && !Nk(e)) {
    const u = await FVe(e, {
      localMainUrl: t.main,
      localPosterUrl: t.poster,
      posterOnly: e.type === "video"
    });
    u.blobUrls.length && n.push(...u.blobUrls), u.mainUrl && (t.main = u.mainUrl), u.posterUrl && (t.poster = u.posterUrl);
  } else if (vv(e)) {
    const u = jg(e) || e._ossThumbnailUrl || e.thumbnailUrl,
      h = Bd(e) || e._ossRemoteUrl || e.url;
    e.type === "video" ? (h && !t.main && (t.main = h), u && !t.poster && (t.poster = u)) : u && !t.main && (t.main = u);
  }
  if (e.type === "video") {
    const u = await jae(e, {
      localVideoPlayUrl: t.main
    });
    u && (t.poster = u);
  } else if (e.type !== "audio") if (e.mjImages && e.mjImages.length > 1) {
    const u = await Promise.all(e.mjImages.slice(0, 4).map((p, m) => {
        var f, y;
        return Dae(e, {
          mjIndex: m,
          localImageUrl: ((f = t.mj) == null ? void 0 : f[m]) || ((y = e.mjImages) == null ? void 0 : y[m])
        });
      })),
      h = e.mjImages.map((p, m) => {
        var f;
        return u[m] || ((f = t.mj) == null ? void 0 : f[m]) || p;
      });
    t.mj = h, t.main || (t.main = h[0]);
  } else {
    const u = await Dae(e, {
      localImageUrl: t.main || t.poster
    });
    u && (t.poster = u, (!t.main || nr(t.main)) && (t.main = u));
  }
  return n.length && (t.blobUrls = n), t;
}

function G_e(e) {
  if (e) return nr(e) ? ya(e) : e;
}

function Q8a(e) {
  const n = (e.url || e.originalUrl || e._ossRemoteUrl || "").match(/\.(jpe?g|png|webp|gif|bmp|mp4|webm|mp3|wav|ogg)(\?|#|$)/i);
  if (n) {
    const r = n[1].toUpperCase();
    return r === "JPEG" ? "JPG" : r;
  }
  return e.type === "video" ? "MP4" : e.type === "audio" ? "MP3" : (e.type === "image", null);
}

const VG = 20,
  Y8a = 220,
  X8a = 54,
  fze = 2,
  XQn = 76,
  u6e = 8,
  VNe = 8,
  JQn = 152,
  d1t = 35.6,
  ZQn = 12,
  Mre = 640,
  eYn = 8.8,
  rnn = 3,
  tYn = "qiaodoumayi_batch_manage_view_mode";

function J8a() {
  try {
    const e = localStorage.getItem(tYn);
    if (e === "list" || e === "grid" || e === "waterfall") return e;
  } catch {}
  return "grid";
}

function nYn(e, t, n, r, a, i, o, s) {
  var C, I, E;
  const l = g.useRef(null),
    d = t;
  g.useEffect(() => {
    if (!d || o || i || s && s.length > 0) return;
    const M = window.setTimeout(() => r(e), 120);
    return () => window.clearTimeout(M);
  }, [d, e.id, r, a, o, i, s]);
  const u = vv(e),
    h = u ? e.thumbnailUrl : i5(e.thumbnailUrl),
    p = u ? e.videoPosterUrl : i5(e.videoPosterUrl),
    m = u ? e.url && !e.url.startsWith("blob:") ? e.url : void 0 : i5(e.url),
    f = u ? jg(e) || e._ossThumbnailUrl || e.thumbnailUrl || (e.type !== "video" ? e.url : void 0) : void 0,
    y = e.type === "video" ? cCt(d && NDt(o) ? o : void 0, f, h, p, u ? e._ossThumbnailUrl : void 0) : void 0,
    b = e.type === "video" && y && d ? G_e(y) : void 0,
    v = e.type === "video" ? yH(e, d ? i : void 0, m, u ? e._ossRemoteUrl : void 0, u ? e.originalUrl : i5(e.originalUrl), u ? Bd(e) : void 0) : void 0,
    _ = e.type === "video" && v && d ? _c(v) || v : void 0,
    w = e.type === "video" ? void 0 : yH(e, f, d ? o : void 0, h, d && u ? i : void 0, m),
    k = (C = e.mjThumbnails) != null && C.length ? e.mjThumbnails.map(M => (u ? M : i5(M)) || "") : (I = e.mjImages) != null && I.length && !((E = e.mjImages[0]) != null && E.startsWith("blob:")) ? e.mjImages.map(M => (u ? M : i5(M)) || "") : [],
    A = (d && (s != null && s.length) ? s : null) ?? k,
    S = d ? G_e(w) : void 0;
  return {
    rowRef: l,
    canLoadMedia: d,
    displayVideoCoverUrl: b,
    displayVideoPlayUrl: _,
    displayMj: A,
    imageSrc: S
  };
}

function jDt(e) {
  const t = g.useRef(e);
  t.current = e;
  const n = g.useRef(0),
    r = g.useRef(1),
    a = g.useRef(null),
    i = g.useCallback(o => {
      r.current = o - n.current >= 0 ? 1 : -1, n.current = o, a.current !== null && window.clearTimeout(a.current), a.current = window.setTimeout(() => {
        a.current = null;
        const s = t.current,
          {
            items: l,
            containerRef: d,
            resolvedMainUrls: u,
            resolvedPosterUrls: h,
            resolvedMjUrls: p,
            onRequestResolve: m,
            getLayout: f
          } = s;
        if (l.length === 0) return;
        const y = d.current;
        if (!y) return;
        const b = y.clientHeight || 500,
          {
            cols: v,
            rowHeight: _
          } = f();
        if (!v || !_) return;
        const w = Math.max(1, Math.ceil(b / _)),
          k = Math.ceil(w * 2),
          A = Math.ceil(w * 1.2),
          S = n.current,
          C = Math.max(0, Math.floor(S / _) - (r.current >= 0 ? A : k)),
          I = Math.max(C, Math.ceil((S + b) / _) + (r.current >= 0 ? k : A)),
          E = Math.min(l.length - 1, C * v),
          M = Math.min(l.length - 1, (I + 1) * v - 1);
        let T = 40;
        for (let P = E; P <= M && T > 0; P++) {
          const R = l[P];
          R && (u[R.id] || h[R.id] || p[R.id] && p[R.id].length > 0 || (m(R), T -= 1));
        }
      }, 160);
    }, []);
  return g.useEffect(() => () => {
    a.current !== null && (window.clearTimeout(a.current), a.current = null);
  }, []), i;
}

let lte = null;

function Pat(e) {
  if (e) try {
    e.pause(), e.currentTime = 0, e.removeAttribute("src"), e.load();
  } catch {}
}

const Z8a = g.memo(function ({
    itemId: t,
    canLoadMedia: n,
    coverUrl: r,
    playUrl: a
  }) {
    on();
    const [i, o] = g.useState(!1),
      s = g.useRef(null),
      l = g.useRef(null),
      d = g.useRef(!1),
      u = g.useRef(() => {}),
      h = g.useCallback(() => {
        d.current && (d.current = !1, o(!1), Pat(l.current), lte === u.current && (lte = null));
      }, []);
    u.current = h;
    const p = g.useCallback(() => {
      if (!a || !n) return;
      const m = u.current;
      lte && lte !== m && lte(), lte = m, d.current = !0, o(!0);
    }, [n, a]);
    return g.useEffect(() => {
      if (!n || !a) {
        h();
        return;
      }
      const m = s.current;
      m != null && m.matches(":hover") && p();
    }, [n, a, p, h]), g.useEffect(() => {
      if (!i) return;
      const m = s.current;
      if (!m) return;
      const f = () => {
        d.current && (m.matches(":hover") || h());
      };
      return window.addEventListener("scroll", f, !0), window.addEventListener("wheel", f, {
        capture: !0,
        passive: !0
      }), window.addEventListener("pointermove", f, {
        passive: !0
      }), () => {
        window.removeEventListener("scroll", f, !0), window.removeEventListener("wheel", f, !0), window.removeEventListener("pointermove", f);
      };
    }, [i, h]), g.useEffect(() => {
      const m = l.current;
      if (m) {
        if (i && a) {
          m.muted = !0, m.play().catch(() => {});
          return;
        }
        Pat(m);
      }
    }, [i, a]), g.useEffect(() => () => {
      h(), Pat(l.current);
    }, [h]), c.jsxs("div", {
      ref: s,
      className: "sketch-asset-video-thumb",
      onPointerEnter: p,
      onPointerLeave: h,
      onMouseEnter: p,
      onMouseLeave: h,
      children: [i && a ? c.jsx("video", {
        ref: l,
        src: a,
        poster: r,
        muted: !0,
        loop: !0,
        playsInline: !0,
        preload: "metadata",
        className: "w-full h-full object-cover"
      }) : r ? c.jsx(UO, {
        src: r,
        enabled: n,
        assetId: t,
        className: "w-full h-full object-cover",
        loading: n ? "eager" : "lazy",
        fetchPriority: n ? "high" : "low"
      }) : c.jsx("div", {
        className: "sketch-asset-thumb-placeholder",
        "aria-hidden": !0,
        children: n ? c.jsx("span", {
          children: x("加载中…")
        }) : null
      }), !(i && a) && c.jsx("div", {
        className: "sketch-asset-play-badge",
        "aria-hidden": !0,
        children: c.jsx(Ol, {
          size: 18,
          fill: "currentColor",
          strokeWidth: 0
        })
      })]
    });
  }),
  rYn = g.memo(function ({
    item: t,
    isDark: n,
    canLoadMedia: r,
    displayVideoCoverUrl: a,
    displayVideoPlayUrl: i,
    displayMj: o,
    imageSrc: s,
    onOpenInLightbox: l,
    onImageError: d
  }) {
    return on(), t.type === "video" ? c.jsx(Z8a, {
      itemId: t.id,
      canLoadMedia: r,
      coverUrl: a,
      playUrl: i
    }) : t.type === "audio" ? c.jsx("div", {
      className: "w-full h-full flex flex-col items-center justify-center p-2",
      children: c.jsx(Qh, {
        size: 22,
        className: n ? "text-zinc-600" : "text-zinc-400"
      })
    }) : o.length > 1 ? c.jsx("div", {
      className: "w-full h-full grid grid-cols-2 grid-rows-2 gap-0",
      children: Array.from({
        length: 4
      }, (u, h) => {
        const p = r ? o[h] : void 0;
        return c.jsx("div", {
          "data-mj-index": h,
          className: "mj-grid-quadrant relative cursor-pointer hover:opacity-90 transition-opacity",
          onDoubleClick: m => {
            m.stopPropagation(), l(t, h);
          },
          children: p ? c.jsx(UO, {
            src: G_e(p),
            enabled: r,
            assetId: `${t.id}_${h}`,
            className: "w-full h-full object-cover",
            loading: r ? "eager" : "lazy",
            fetchPriority: r ? "high" : "low",
            onError: () => d(t.id)
          }) : c.jsx("div", {
            className: "w-full h-full bg-zinc-200/60"
          })
        }, h);
      })
    }) : s ? c.jsx(UO, {
      src: s,
      enabled: r,
      assetId: t.id,
      className: "w-full h-full object-cover",
      loading: r ? "eager" : "lazy",
      fetchPriority: r ? "high" : "low",
      onError: () => d(t.id)
    }) : c.jsx("div", {
      className: "sketch-asset-thumb-placeholder",
      "aria-hidden": !0,
      children: r ? c.jsx("span", {
        children: x("加载中…")
      }) : null
    });
  }),
  aYn = g.memo(function ({
    item: t,
    onSetDetailItem: n,
    favorite: r,
    onToggleFavorite: a,
    onSendItemToCanvas: i
  }) {
    return on(), c.jsxs("div", {
      className: "sketch-asset-hover-actions",
      children: [i && c.jsx("button", {
        type: "button",
        className: "sketch-asset-action-btn",
        title: x("发送到画布"),
        onClick: o => {
          o.stopPropagation(), i(t);
        },
        children: c.jsx(zu, {
          size: 13
        })
      }), a && c.jsx("button", {
        type: "button",
        className: `sketch-asset-action-btn sketch-asset-action-fav${r ? " is-fav" : ""}`,
        title: x(r ? "取消收藏" : "收藏"),
        onClick: o => {
          o.stopPropagation(), a(t);
        },
        children: c.jsx(CP, {
          size: 13,
          fill: r ? "currentColor" : "none",
          strokeWidth: 2
        })
      }), c.jsx("button", {
        type: "button",
        onClick: o => {
          o.stopPropagation(), n(t);
        },
        className: "sketch-asset-action-btn",
        title: x("详细信息"),
        children: c.jsx(JHe, {
          size: 13
        })
      })]
    });
  }),
  iYn = g.memo(function ({
    item: t,
    isDark: n,
    shouldLoadMedia: r,
    scrollRootRef: a,
    gridLayout: i,
    waterfallLayout: o,
    favorite: s,
    onToggleFavorite: l,
    resolvedMainUrl: d,
    resolvedPosterUrl: u,
    resolvedMjUrls: h,
    batchSelectedIds: p,
    selectionMode: m,
    onRequestResolve: f,
    onSelectItem: y,
    onThumbnailDoubleClick: b,
    onOpenInLightbox: v,
    onSetDetailItem: _,
    onImageError: w,
    resolveEpoch: k,
    onSendItemToCanvas: A
  }) {
    on();
    const {
        rowRef: S,
        canLoadMedia: C,
        displayVideoCoverUrl: I,
        displayVideoPlayUrl: E,
        displayMj: M,
        imageSrc: T
      } = nYn(t, r, a, f, k, d, u, h),
      P = !i && !o,
      R = i ? i.row * i.rowHeight + i.gap : 0,
      j = i ? i.col * (i.cardWidth + i.gap) + i.gap / 2 : 0,
      B = p.has(t.id),
      F = t.type === "audio" && t.duration ? `${Math.floor(t.duration)}s` : t.time,
      N = (t.prompt || "无提示词").trim();
    return c.jsxs("div", {
      ref: S,
      style: o ? {
        position: "absolute",
        ...o
      } : P ? void 0 : {
        position: "absolute",
        top: R,
        left: j,
        width: i.cardWidth,
        height: i.cardHeight
      },
      "data-batch-asset-id": t.id,
      onClick: G => y(t, G),
      onDoubleClick: G => {
        G.stopPropagation(), b(t);
      },
      className: `sketch-asset-card group${P ? " sketch-asset-card-flow" : ""}${B ? " selected" : ""}${m ? " selection-mode" : ""}`,
      children: [c.jsxs("div", {
        className: `sketch-asset-thumb ${t.type === "audio" ? "aspect-square" : "aspect-video"}`,
        children: [c.jsx(rYn, {
          item: t,
          isDark: n,
          canLoadMedia: C,
          displayVideoCoverUrl: I,
          displayVideoPlayUrl: E,
          displayMj: M,
          imageSrc: T,
          onOpenInLightbox: v,
          onImageError: w
        }), (m || B) && c.jsx("div", {
          className: "sketch-asset-select-mark",
          "aria-label": x(B ? "已选中" : "未选中"),
          children: c.jsx(io, {
            size: 12,
            strokeWidth: 2.5
          })
        }), c.jsx(aYn, {
          item: t,
          onSetDetailItem: _,
          favorite: s,
          onToggleFavorite: l,
          onSendItemToCanvas: A
        })]
      }), c.jsxs("div", {
        className: "sketch-asset-info",
        children: [c.jsx("p", {
          className: "sketch-asset-title",
          children: N
        }), c.jsxs("p", {
          className: "sketch-asset-meta",
          children: [t.modelName || x("未知模型"), " · ", F]
        })]
      })]
    });
  }),
  e6a = g.memo(function (t) {
    on();
    const {
        items: n,
        isDark: r,
        mediaLoadEnabled: a,
        resolveEpoch: i,
        hasMoreHistory: o,
        onLoadMoreHistory: s,
        favoriteIds: l,
        onToggleFavorite: d,
        resolvedMainUrls: u,
        resolvedPosterUrls: h,
        resolvedMjUrls: p,
        batchSelectedIds: m,
        brokenImageIds: f,
        actionTargetId: y,
        selectionMode: b,
        onRequestResolve: v,
        onSelectItem: _,
        onThumbnailDoubleClick: w,
        onOpenInLightbox: k,
        onSetDetailItem: A,
        onImageError: S,
        onDownloadItem: C,
        isImageLike: I,
        isVideoLike: E,
        onSendItemToCanvas: M,
        onSendItemsToCanvas: T
      } = t,
      P = g.useRef(null),
      R = g.useMemo(() => YQn(n), [n]),
      [j, B] = g.useState(() => new Set()),
      [F, N] = g.useState(0),
      [G, z] = g.useState(500),
      [V, O] = g.useState(600),
      L = g.useRef(0),
      D = g.useRef(null),
      U = g.useRef({}),
      H = g.useRef(!1),
      Y = g.useRef(null),
      [, K] = g.useState(0),
      [W, Q] = g.useState({}),
      q = g.useRef(new Map()),
      ne = g.useRef(0);
    g.useEffect(() => {
      const re = P.current;
      if (!re) return;
      const fe = () => {
        ne.current !== re.clientWidth && (ne.current = re.clientWidth, U.current = {}, Q({})), z(re.clientHeight), O(re.clientWidth);
      };
      fe();
      const ye = new ResizeObserver(fe);
      return ye.observe(re), () => ye.disconnect();
    }, []);
    const de = g.useCallback(re => {
      const fe = re.currentTarget;
      L.current = fe.scrollTop, ce(fe.scrollTop), H.current = !0, Y.current !== null && window.clearTimeout(Y.current), Y.current = window.setTimeout(() => {
        Y.current = null, H.current = !1, K(ye => ye + 1);
      }, 250), o && s && fe.scrollHeight - fe.scrollTop - fe.clientHeight < 640 && s(), D.current && cancelAnimationFrame(D.current), D.current = requestAnimationFrame(() => {
        N(L.current), D.current = null;
      });
    }, [o, s]);
    g.useEffect(() => () => {
      D.current && cancelAnimationFrame(D.current), Y.current !== null && (window.clearTimeout(Y.current), Y.current = null);
    }, []);
    const le = g.useCallback(re => {
        B(fe => {
          const ye = new Set(fe);
          return ye.has(re) ? ye.delete(re) : ye.add(re), ye;
        });
      }, []),
      J = g.useRef("");
    g.useLayoutEffect(() => {
      if (H.current) return;
      const re = [...q.current.keys()].sort().join("|") + "|" + [...j].sort().join("|") + "|" + V + "|" + n.length;
      if (re === J.current) return;
      J.current = re;
      let fe = !1;
      const ye = {};
      q.current.forEach((ie, ae) => {
        const be = ie.offsetHeight;
        be > 0 && Math.abs(be - (U.current[ae] || 0)) > .5 && (ye[ae] = be, fe = !0);
      }), fe && (U.current = {
        ...U.current,
        ...ye
      }, Q(U.current));
    });
    const pe = g.useMemo(() => {
        const re = VNe,
          fe = Math.max(0, V - 2 * eYn),
          ye = Math.max(1, Math.floor((fe + re) / (JQn + re))),
          ie = (fe - re * (ye - 1)) / ye,
          ae = Math.max(40, ie),
          be = ae + re,
          Ee = new Map(R.map(ue => [ue.key, ue])),
          xe = [];
        let he = 0;
        for (const ue of R) {
          const ge = j.has(ue.key),
            _e = W[ue.key],
            ke = ge ? 0 : Math.ceil(ue.items.length / ye),
            ve = d1t + (ke > 0 ? ke * ae + (ke - 1) * re : 0) + ZQn,
            Te = _e ?? ve;
          xe.push({
            key: ue.key,
            top: he,
            height: Te,
            rows: ke,
            collapsed: ge
          }), he += Te;
        }
        return {
          blocks: xe,
          totalHeight: he,
          cols: ye,
          rowH: be,
          cardHeight: ae,
          byKey: Ee
        };
      }, [R, j, W, V]),
      ce = jDt({
        items: n,
        containerRef: P,
        resolvedMainUrls: u,
        resolvedPosterUrls: h,
        resolvedMjUrls: p,
        onRequestResolve: v,
        getLayout: () => ({
          cols: pe.cols,
          rowHeight: pe.rowH
        })
      });
    if (n.length === 0) return c.jsx("div", {
      className: "sketch-assets-empty",
      children: x("当前筛选下暂无素材")
    });
    const we = F - Mre,
      X = F + G + Mre,
      Z = new Set();
    for (const re of pe.blocks) re.top + re.height >= we && re.top <= X && Z.add(re.key);
    return c.jsx("div", {
      ref: P,
      className: "sketch-assets-grid custom-scrollbar",
      tabIndex: 0,
      role: "region",
      "aria-label": x("素材列表"),
      onScroll: de,
      children: c.jsx("div", {
        className: "relative sketch-assets-virtual",
        style: {
          height: pe.totalHeight + VNe
        },
        children: pe.blocks.map(re => {
          const fe = pe.byKey.get(re.key);
          if (!Z.has(re.key)) return c.jsx("div", {
            "aria-hidden": !0,
            style: {
              position: "absolute",
              top: re.top,
              left: 0,
              right: 0,
              height: re.height
            }
          }, `spacer-${re.key}`);
          const ye = re.collapsed,
            ie = VNe,
            ae = pe.cols,
            be = re.rows,
            Ee = pe.cardHeight,
            xe = pe.rowH,
            he = Math.max(0, F - re.top - d1t),
            ue = Math.max(0, Math.floor(he / xe) - rnn),
            ge = Math.min(be - 1, Math.ceil((he + G) / xe) + rnn),
            _e = ue * ae,
            ke = Math.min(fe.items.length - 1, (ge + 1) * ae - 1),
            ve = ue,
            Te = be - 1 - ge,
            Ne = ve > 0 ? ve * Ee + Math.max(0, ve - 1) * ie : 0,
            me = Te > 0 ? Te * Ee + Math.max(0, Te - 1) * ie : 0;
          return c.jsxs("section", {
            ref: Ae => {
              Ae ? q.current.set(re.key, Ae) : q.current.delete(re.key);
            },
            className: "sketch-assets-date-section",
            style: {
              position: "absolute",
              top: re.top,
              left: 0,
              right: 0
            },
            children: [c.jsxs("div", {
              className: "sketch-assets-date-head-row",
              children: [c.jsxs("button", {
                type: "button",
                className: "sketch-assets-date-head",
                onClick: () => le(re.key),
                children: [ye ? c.jsx(ss, {
                  size: 13
                }) : c.jsx(Mi, {
                  size: 13
                }), x(fe.label), c.jsx("span", {
                  children: fe.items.length
                })]
              }), T && c.jsx("button", {
                type: "button",
                className: "sketch-assets-date-send",
                title: x("将 {0} 的 {1} 项发送到画布", fe.label, fe.items.length),
                onClick: () => T(fe.items),
                children: c.jsx(zu, {
                  size: 12
                })
              })]
            }), !ye && c.jsxs("div", {
              className: "sketch-assets-date-grid",
              children: [Ne > 0 && c.jsx("div", {
                "aria-hidden": !0,
                style: {
                  gridRow: `1 / span ${ve}`,
                  gridColumn: "1 / -1",
                  height: Ne
                }
              }, "date-grid-leading-spacer"), fe.items.slice(_e, ke + 1).map(Ae => c.jsx(iYn, {
                item: Ae,
                isDark: r,
                shouldLoadMedia: a,
                scrollRootRef: P,
                resolvedMainUrl: u[Ae.id],
                resolvedPosterUrl: h[Ae.id],
                resolvedMjUrls: p[Ae.id],
                batchSelectedIds: m,
                brokenImageIds: f,
                actionTargetId: y,
                selectionMode: b,
                onRequestResolve: v,
                onSelectItem: _,
                onThumbnailDoubleClick: w,
                onOpenInLightbox: k,
                onSetDetailItem: A,
                onImageError: S,
                onDownloadItem: C,
                isImageLike: I,
                isVideoLike: E,
                resolveEpoch: i,
                favorite: l.has(Ae.id),
                onToggleFavorite: d,
                onSendItemToCanvas: M
              }, Ae.id)), me > 0 && c.jsx("div", {
                "aria-hidden": !0,
                style: {
                  gridRow: `${ge + 2} / span ${Te}`,
                  gridColumn: "1 / -1",
                  height: me
                }
              }, "date-grid-trailing-spacer")]
            })]
          }, re.key);
        })
      })
    });
  }),
  t6a = g.memo(function (t) {
    on();
    const {
        items: n,
        isDark: r,
        mediaLoadEnabled: a,
        resolveEpoch: i,
        hasMoreHistory: o,
        onLoadMoreHistory: s,
        favoriteIds: l,
        onToggleFavorite: d
      } = t,
      u = g.useRef(null),
      [h, p] = g.useState(0),
      [m, f] = g.useState(500),
      [y, b] = g.useState(600),
      v = g.useRef(0),
      _ = g.useRef(null),
      [w, k] = g.useState(() => new Set()),
      A = g.useMemo(() => {
        if (!t.waterfall) return null;
        const V = t.dateLayering ? YQn(n) : [{
            key: "all",
            label: "",
            items: n
          }],
          O = [];
        let L = 0,
          D = 0;
        const U = V.map(H => {
          const Y = L,
            K = !!t.dateLayering && w.has(H.key);
          t.dateLayering && (L += d1t);
          const W = tVn(K ? [] : H.items, Math.max(1, y - 2 * eYn));
          return W.tiles.forEach((Q, q) => O.push({
            item: H.items[q],
            index: D + q,
            rect: {
              ...Q,
              top: L + Q.top
            }
          })), D += H.items.length, L += W.height + ZQn, {
            ...H,
            top: Y,
            height: L - Y,
            collapsed: K
          };
        });
        return {
          tiles: O,
          sections: U,
          height: L
        };
      }, [n, t.waterfall, t.dateLayering, w, y]);
    g.useEffect(() => {
      const V = u.current;
      if (!V) return;
      const O = () => {
        f(V.clientHeight), b(V.clientWidth);
      };
      O();
      const L = new ResizeObserver(O);
      return L.observe(V), () => L.disconnect();
    }, []);
    const S = Math.max(2, Math.floor((y - VG) / (Y8a + VG))),
      C = (y - VG * (S + 1)) / S,
      I = Math.ceil(C) + X8a,
      E = I + VG,
      M = Math.ceil(n.length / S),
      T = M * E + VG,
      P = g.useMemo(() => {
        const V = new Array(n.length);
        for (let O = 0; O < n.length; O++) V[O] = {
          row: Math.floor(O / S),
          col: O % S,
          cols: S,
          cardWidth: C,
          cardHeight: I,
          rowHeight: E,
          gap: VG
        };
        return V;
      }, [n.length, S, C, I, E]),
      R = jDt({
        items: n,
        containerRef: u,
        resolvedMainUrls: t.resolvedMainUrls,
        resolvedPosterUrls: t.resolvedPosterUrls,
        resolvedMjUrls: t.resolvedMjUrls,
        onRequestResolve: t.onRequestResolve,
        getLayout: () => ({
          cols: S,
          rowHeight: E
        })
      }),
      j = Math.max(0, Math.floor(h / E) - fze),
      B = Math.min(M - 1, Math.ceil((h + m) / E) + fze),
      F = j * S,
      N = Math.min(n.length - 1, (B + 1) * S - 1),
      G = g.useCallback(V => {
        const O = V.currentTarget;
        v.current = O.scrollTop, R(O.scrollTop), o && s && O.scrollHeight - O.scrollTop - O.clientHeight < 640 && s(), _.current && cancelAnimationFrame(_.current), _.current = requestAnimationFrame(() => {
          p(v.current), _.current = null;
        });
      }, [o, s]);
    if (g.useEffect(() => () => {
      _.current && cancelAnimationFrame(_.current);
    }, []), n.length === 0) return c.jsx("div", {
      className: "sketch-assets-empty",
      children: x("当前筛选下暂无素材")
    });
    const z = [];
    if (A) z.push(...A.tiles.filter(({
      rect: V
    }) => V.top + V.height >= h - Mre && V.top <= h + m + Mre));else for (let V = F; V <= N && V < n.length; V++) z.push({
      item: n[V],
      index: V
    });
    return c.jsx("div", {
      ref: u,
      className: `sketch-assets-grid custom-scrollbar${A ? " is-waterfall" : ""}`,
      onScroll: G,
      tabIndex: 0,
      role: "region",
      "aria-label": x("素材列表"),
      children: c.jsxs("div", {
        className: "relative sketch-assets-virtual",
        style: {
          height: (A == null ? void 0 : A.height) ?? T + VG
        },
        children: [t.dateLayering && (A == null ? void 0 : A.sections.filter(V => V.top + V.height >= h - Mre && V.top <= h + m + Mre).map(V => c.jsxs("div", {
          className: "sketch-assets-date-head-row",
          style: {
            position: "absolute",
            top: V.top,
            left: 0,
            right: 0
          },
          children: [c.jsxs("button", {
            type: "button",
            className: "sketch-assets-date-head",
            "aria-expanded": !V.collapsed,
            onClick: () => k(O => {
              const L = new Set(O);
              return L.has(V.key) ? L.delete(V.key) : L.add(V.key), L;
            }),
            children: [V.collapsed ? c.jsx(ss, {
              size: 13
            }) : c.jsx(Mi, {
              size: 13
            }), x(V.label), c.jsx("span", {
              children: V.items.length
            })]
          }), t.onSendItemsToCanvas && c.jsx("button", {
            type: "button",
            className: "sketch-assets-date-send",
            title: x("将 {0} 的 {1} 项发送到画布", V.label, V.items.length),
            onClick: () => {
              var O;
              return (O = t.onSendItemsToCanvas) == null ? void 0 : O.call(t, V.items);
            },
            children: c.jsx(zu, {
              size: 12
            })
          })]
        }, V.key))), z.map(({
          item: V,
          index: O,
          rect: L
        }) => c.jsx(iYn, {
          item: V,
          isDark: r,
          shouldLoadMedia: a,
          scrollRootRef: u,
          gridLayout: A ? void 0 : P[O],
          waterfallLayout: L,
          resolvedMainUrl: t.resolvedMainUrls[V.id],
          resolvedPosterUrl: t.resolvedPosterUrls[V.id],
          resolvedMjUrls: t.resolvedMjUrls[V.id],
          batchSelectedIds: t.batchSelectedIds,
          brokenImageIds: t.brokenImageIds,
          actionTargetId: t.actionTargetId,
          selectionMode: t.selectionMode,
          onRequestResolve: t.onRequestResolve,
          onSelectItem: t.onSelectItem,
          onThumbnailDoubleClick: t.onThumbnailDoubleClick,
          onOpenInLightbox: t.onOpenInLightbox,
          onSetDetailItem: t.onSetDetailItem,
          onImageError: t.onImageError,
          onDownloadItem: t.onDownloadItem,
          isImageLike: t.isImageLike,
          isVideoLike: t.isVideoLike,
          resolveEpoch: i,
          favorite: l == null ? void 0 : l.has(V.id),
          onToggleFavorite: d,
          onSendItemToCanvas: t.onSendItemToCanvas
        }, V.id))]
      })
    });
  }),
  n6a = g.memo(function ({
    item: t,
    isDark: n,
    shouldLoadMedia: r,
    scrollRootRef: a,
    listLayout: i,
    resolvedMainUrl: o,
    resolvedPosterUrl: s,
    resolvedMjUrls: l,
    batchSelectedIds: d,
    selectionMode: u,
    onRequestResolve: h,
    onSelectItem: p,
    onThumbnailDoubleClick: m,
    onOpenInLightbox: f,
    onSetDetailItem: y,
    onImageError: b,
    resolveEpoch: v,
    favorite: _,
    onToggleFavorite: w,
    onSendItemToCanvas: k
  }) {
    on();
    const {
        rowRef: A,
        canLoadMedia: S,
        displayVideoCoverUrl: C,
        displayVideoPlayUrl: I,
        displayMj: E,
        imageSrc: M
      } = nYn(t, r, a, h, v, o, s, l),
      T = d.has(t.id),
      P = t.type === "audio" && t.duration ? `${Math.floor(t.duration)}s` : t.time,
      R = (t.prompt || "无提示词").trim(),
      j = t.type === "video" ? "视频" : t.type === "audio" ? "音频" : "图片";
    return c.jsxs("div", {
      ref: A,
      style: {
        position: "absolute",
        top: i.top,
        left: i.gap / 2,
        right: i.gap / 2,
        height: XQn
      },
      "data-batch-asset-id": t.id,
      onClick: B => p(t, B),
      onDoubleClick: B => {
        B.stopPropagation(), m(t);
      },
      className: `sketch-asset-list-row group${T ? " selected" : ""}${u ? " selection-mode" : ""}`,
      children: [c.jsx("div", {
        className: `sketch-asset-list-thumb ${t.type === "audio" ? "is-audio" : ""}`,
        children: c.jsx(rYn, {
          item: t,
          isDark: n,
          canLoadMedia: S,
          displayVideoCoverUrl: C,
          displayVideoPlayUrl: I,
          displayMj: E,
          imageSrc: M,
          onOpenInLightbox: f,
          onImageError: b
        })
      }), c.jsxs("div", {
        className: "sketch-asset-list-body",
        children: [c.jsx("p", {
          className: "sketch-asset-title",
          children: R
        }), c.jsxs("p", {
          className: "sketch-asset-meta",
          children: [t.modelName || x("未知模型"), " · ", x(j), " · ", P]
        })]
      }), c.jsxs("div", {
        className: "sketch-asset-list-side",
        children: [c.jsx(aYn, {
          item: t,
          onSetDetailItem: y,
          favorite: _,
          onToggleFavorite: w,
          onSendItemToCanvas: k
        }), (u || T) && c.jsx("div", {
          className: "sketch-asset-select-mark",
          "aria-label": x(T ? "已选中" : "未选中"),
          children: c.jsx(io, {
            size: 12,
            strokeWidth: 2.5
          })
        })]
      })]
    });
  }),
  r6a = g.memo(function (t) {
    on();
    const {
        items: n,
        isDark: r,
        mediaLoadEnabled: a,
        resolveEpoch: i,
        hasMoreHistory: o,
        onLoadMoreHistory: s,
        favoriteIds: l,
        onToggleFavorite: d
      } = t,
      u = g.useRef(null),
      [h, p] = g.useState(0),
      [m, f] = g.useState(500),
      y = g.useRef(0),
      b = g.useRef(null);
    g.useEffect(() => {
      const E = u.current;
      if (!E) return;
      const M = () => f(E.clientHeight);
      M();
      const T = new ResizeObserver(M);
      return T.observe(E), () => T.disconnect();
    }, []);
    const v = XQn + u6e,
      _ = n.length * v + u6e,
      w = g.useMemo(() => {
        const E = new Array(n.length);
        for (let M = 0; M < n.length; M++) E[M] = {
          top: M * v + u6e / 2,
          rowHeight: v,
          gap: u6e
        };
        return E;
      }, [n.length, v]),
      k = jDt({
        items: n,
        containerRef: u,
        resolvedMainUrls: t.resolvedMainUrls,
        resolvedPosterUrls: t.resolvedPosterUrls,
        resolvedMjUrls: t.resolvedMjUrls,
        onRequestResolve: t.onRequestResolve,
        getLayout: () => ({
          cols: 1,
          rowHeight: v
        })
      }),
      A = Math.max(0, Math.floor(h / v) - fze),
      S = Math.min(n.length - 1, Math.ceil((h + m) / v) + fze),
      C = g.useCallback(E => {
        const M = E.currentTarget;
        y.current = M.scrollTop, k(M.scrollTop), o && s && M.scrollHeight - M.scrollTop - M.clientHeight < 640 && s(), b.current && cancelAnimationFrame(b.current), b.current = requestAnimationFrame(() => {
          p(y.current), b.current = null;
        });
      }, [o, s]);
    if (g.useEffect(() => () => {
      b.current && cancelAnimationFrame(b.current);
    }, []), n.length === 0) return c.jsx("div", {
      className: "sketch-assets-empty",
      children: x("当前筛选下暂无素材")
    });
    const I = [];
    for (let E = A; E <= S && E < n.length; E++) I.push({
      item: n[E],
      index: E
    });
    return c.jsx("div", {
      ref: u,
      className: "sketch-assets-list custom-scrollbar",
      onScroll: C,
      tabIndex: 0,
      role: "region",
      "aria-label": x("素材列表"),
      children: c.jsx("div", {
        className: "relative sketch-assets-virtual",
        style: {
          height: _
        },
        children: I.map(({
          item: E,
          index: M
        }) => c.jsx(n6a, {
          item: E,
          isDark: r,
          shouldLoadMedia: a,
          scrollRootRef: u,
          listLayout: w[M],
          resolvedMainUrl: t.resolvedMainUrls[E.id],
          resolvedPosterUrl: t.resolvedPosterUrls[E.id],
          resolvedMjUrls: t.resolvedMjUrls[E.id],
          batchSelectedIds: t.batchSelectedIds,
          brokenImageIds: t.brokenImageIds,
          actionTargetId: t.actionTargetId,
          selectionMode: t.selectionMode,
          onRequestResolve: t.onRequestResolve,
          onSelectItem: t.onSelectItem,
          onThumbnailDoubleClick: t.onThumbnailDoubleClick,
          onOpenInLightbox: t.onOpenInLightbox,
          onSetDetailItem: t.onSetDetailItem,
          onImageError: t.onImageError,
          onDownloadItem: t.onDownloadItem,
          isImageLike: t.isImageLike,
          isVideoLike: t.isVideoLike,
          resolveEpoch: i,
          favorite: l == null ? void 0 : l.has(E.id),
          onToggleFavorite: d,
          onSendItemToCanvas: t.onSendItemToCanvas
        }, E.id))
      })
    });
  }),
  ann = ({
    isOpen: e,
    onClose: t,
    isDark: n,
    history: r,
    nodes: a,
    batchSelectedIds: i,
    onSetBatchSelectedIds: o,
    onSetHistory: s,
    onSetLightboxItem: l,
    onSetLightboxOpen: d,
    toastSuccess: u,
    toastError: h,
    onSendHistoryItemsToCanvas: p
  }) => {
    const m = on(),
      [f, y] = g.useState(null),
      [b, v] = g.useState(!1),
      [_, w] = g.useState(new Set()),
      [k, A] = g.useState(null),
      S = g.useRef({
        x: 0,
        y: 0
      }),
      [C, I] = g.useState("all"),
      [E, M] = g.useState(J8a),
      [T, P] = g.useState("all"),
      [R, j] = g.useState(!1),
      [B, F] = g.useState(""),
      [N, G] = g.useState(H8a),
      [z, V] = g.useState(U8a),
      [O, L] = g.useState($8a),
      D = g.useRef(null),
      [U, H] = g.useState(G8a),
      [Y, K] = g.useState(!1),
      W = g.useRef(null),
      [Q, q] = g.useState({
        visible: !1,
        progress: 0,
        status: ""
      }),
      ne = g.useRef(!1),
      [de, le] = g.useState(!1),
      J = g.useRef(!1),
      [pe, ce] = g.useState(!1),
      we = g.useRef(!1),
      X = g.useRef(!1),
      [Z, re] = g.useState({
        visible: !1,
        progress: 0,
        status: ""
      }),
      [fe, ye] = g.useState(!1);
    g.useEffect(() => {
      if (!e) {
        ye(!1);
        return;
      }
      let Tt = !1;
      return Id().then(() => {
        Tt || (ye(!0), sT());
      }), () => {
        Tt = !0;
      };
    }, [e]);
    const [ie, ae] = g.useState({}),
      [be, Ee] = g.useState({}),
      [xe, he] = g.useState({}),
      [ue, ge] = g.useState({}),
      [_e, ke] = g.useState(() => new Set()),
      [ve, Te] = g.useState(0),
      Ne = g.useRef([]),
      me = g.useRef(new Set()),
      [Ae, Fe] = g.useState(0),
      [Me, Re] = g.useState(() => ua()),
      [$e, rt] = g.useState([]),
      [nt, ze] = g.useState(!1),
      Le = g.useRef(0),
      Ke = g.useRef(!1),
      Xe = g.useRef(!1),
      De = g.useRef(r);
    De.current = r;
    const Ye = g.useRef(0),
      Ce = g.useRef([]),
      He = 10;
    g.useEffect(() => {
      const Tt = () => Re(ua());
      return window.addEventListener(go, Tt), () => window.removeEventListener(go, Tt);
    }, []);
    const Ve = g.useCallback(async (Tt = !1) => {
        if (e && !Ke.current && !(!Tt && Xe.current)) {
          Ke.current = !0;
          try {
            const {
                loadAllHistoryPages: Ue
              } = await Ie(async () => {
                const {
                  loadAllHistoryPages: wt
                } = await Promise.resolve().then(() => Gu);
                return {
                  loadAllHistoryPages: wt
                };
              }, void 0, import.meta.url),
              {
                sanitizeHistoryItemOnLoad: et
              } = await Ie(async () => {
                const {
                  sanitizeHistoryItemOnLoad: wt
                } = await Promise.resolve().then(() => ii);
                return {
                  sanitizeHistoryItemOnLoad: wt
                };
              }, void 0, import.meta.url),
              ht = (await Ue({
                pageSize: 500
              })).items.map(wt => et(wt));
            iCt(ht), rt(Iv(ht)), Le.current = ht.length, ze(!1), Xe.current = !0;
          } catch (Ue) {
            console.warn("[BatchManageModal] SQLite 分页灌入失败:", Ue), rt(Iv(G1(De.current))), ze(!1), Xe.current = !0;
          } finally {
            Ke.current = !1;
          }
        }
      }, [e]),
      it = g.useCallback(() => {
        !e || !nt || Ke.current || (Ke.current = !0, (async () => {
          try {
            const {
                loadHistoryPage: Tt,
                HISTORY_PAGE_SIZE: Ue
              } = await Ie(async () => {
                const {
                  loadHistoryPage: wt,
                  HISTORY_PAGE_SIZE: jt
                } = await Promise.resolve().then(() => Gu);
                return {
                  loadHistoryPage: wt,
                  HISTORY_PAGE_SIZE: jt
                };
              }, void 0, import.meta.url),
              {
                sanitizeHistoryItemOnLoad: et
              } = await Ie(async () => {
                const {
                  sanitizeHistoryItemOnLoad: wt
                } = await Promise.resolve().then(() => ii);
                return {
                  sanitizeHistoryItemOnLoad: wt
                };
              }, void 0, import.meta.url),
              ft = await Tt({
                offset: Le.current,
                limit: Ue
              }),
              ht = ft.items.map(wt => et(wt));
            rt(wt => {
              const jt = new Map(wt.map(bt => [String(bt.id), bt]));
              for (const bt of ht) jt.has(String(bt.id)) || jt.set(String(bt.id), bt);
              return Iv([...jt.values()]);
            }), Le.current = ft.offset + ft.limit, ze(ft.hasMore);
          } catch (Tt) {
            console.warn("[BatchManageModal] 分页加载失败:", Tt);
          } finally {
            Ke.current = !1;
          }
        })());
      }, [e, nt]);
    g.useEffect(() => {
      if (!e) {
        Xe.current = !1, Le.current = 0, rt([]), ze(!1), Ye.current = 0, Ce.current = [], F8a();
        return;
      }
      rt(Iv(G1(De.current))), HQn(), Ve(!0);
    }, [e, Ve]), g.useEffect(() => {
      if (!e) return;
      const Tt = () => {
        Xe.current = !1, Le.current = 0, Ve(!0);
      };
      return window.addEventListener(go, Tt), () => window.removeEventListener(go, Tt);
    }, [e, Ve]), g.useEffect(() => {
      if (!e || !Xe.current || r.length === 0) return;
      const Tt = G1(r);
      Tt.length !== 0 && rt(Ue => {
        const et = new Map(Ue.map(ht => [String(ht.id), ht]));
        let ft = !1;
        for (const ht of Tt) {
          const wt = String(ht.id),
            jt = et.get(wt);
          if (!jt) {
            et.set(wt, ht), ft = !0;
            continue;
          }
          (jt.status !== ht.status || jt.progress !== ht.progress || jt.url !== ht.url || jt.thumbnailUrl !== ht.thumbnailUrl) && (et.set(wt, {
            ...jt,
            ...ht
          }), ft = !0);
        }
        return ft ? Iv([...et.values()]) : Ue;
      });
    }, [r, e, Me]);
    const It = Tt => Tt.type === "image" || Array.isArray(Tt.mjImages) && Tt.mjImages.length > 0,
      Ft = Tt => Tt.type === "video",
      We = g.useMemo(() => {
        const Tt = G1($e);
        return z === "asc" ? yEr(Tt) : Iv(Tt);
      }, [$e, Me, z]),
      Ze = g.useMemo(() => C === "all" ? We : We.filter(Tt => C === "image" ? It(Tt) : C === "video" ? Tt.type === "video" : Tt.type === "audio"), [We, C]),
      Ge = 10080 * 60 * 1e3,
      Oe = g.useMemo(() => {
        const Tt = Date.now();
        let Ue = 0,
          et = 0,
          ft = 0,
          ht = 0,
          wt = 0;
        const jt = new Map();
        for (const Bt of Ze) {
          const wn = c1t(Bt);
          wn > 0 && Tt - wn <= Ge && (Ue += 1), (Bt.status === "failed" || _.has(Bt.id) || Bt.errorMsg && String(Bt.errorMsg).trim()) && (et += 1), It(Bt) ? ft += 1 : Bt.type === "video" ? ht += 1 : Bt.type === "audio" && (wt += 1);
          const at = String(Bt.modelName || "未知模型").trim() || "未知模型";
          jt.set(at, (jt.get(at) || 0) + 1);
        }
        const bt = [...jt.entries()].sort((Bt, wn) => wn[1] - Bt[1]).map(([Bt, wn]) => ({
          name: Bt,
          count: wn
        }));
        return {
          all: Ze.length,
          favorites: Ze.filter(Bt => U.has(Bt.id)).length,
          recent7: Ue,
          failed: et,
          image: ft,
          video: ht,
          audio: wt,
          models: bt
        };
      }, [Ze, U, _]),
      st = g.useMemo(() => {
        const Tt = Date.now();
        let Ue = We;
        if (T === "favorites") Ue = Ue.filter(et => U.has(et.id));else if (T === "recent7") Ue = Ue.filter(et => {
          const ft = c1t(et);
          return ft > 0 && Tt - ft <= Ge;
        });else if (T === "failed") Ue = Ue.filter(et => et.status === "failed" || _.has(et.id) || !!(et.errorMsg && String(et.errorMsg).trim()));else if (T.startsWith("type:")) {
          const et = T.slice(5);
          et === "image" ? Ue = Ue.filter(It) : et === "video" ? Ue = Ue.filter(ft => ft.type === "video") : et === "audio" && (Ue = Ue.filter(ft => ft.type === "audio"));
        } else if (T.startsWith("model:")) {
          const et = T.slice(6);
          Ue = Ue.filter(ft => String(ft.modelName || "未知模型").trim() === et);
        }
        return C === "image" ? Ue = Ue.filter(It) : C === "video" ? Ue = Ue.filter(et => et.type === "video") : C === "audio" && (Ue = Ue.filter(et => et.type === "audio")), B.trim() && (Ue = Ue.filter(et => q8a(et, B))), Ue;
      }, [We, T, U, C, B, _, Ge]),
      vt = g.useMemo(() => {
        let Tt = "全部素材";
        T === "favorites" ? Tt = "收藏内容" : T === "recent7" ? Tt = "最近 7 天" : T === "failed" ? Tt = "生成失败" : T === "type:image" ? Tt = "图片" : T === "type:video" ? Tt = "视频" : T === "type:audio" ? Tt = "音频" : T.startsWith("model:") && (Tt = T.slice(6));
        let Ue = T.startsWith("model:") ? Tt : x(Tt);
        return (T === "all" || T === "recent7" || T === "favorites") && (C === "image" ? Ue += ` · ${x("图片")}` : C === "video" ? Ue += ` · ${x("视频")}` : C === "audio" && (Ue += ` · ${x("音频")}`)), Ue;
      }, [T, C, m]),
      Ht = g.useCallback(Tt => {
        H(Ue => {
          const et = new Set(Ue);
          return et.has(Tt.id) ? et.delete(Tt.id) : et.add(Tt.id), V8a(et), et;
        });
      }, []);
    g.useEffect(() => {
      try {
        localStorage.setItem(KQn, z);
      } catch {}
    }, [z]), g.useEffect(() => {
      try {
        localStorage.setItem(QQn, O ? "1" : "0");
      } catch {}
    }, [O]);
    const nn = g.useCallback((Tt, Ue) => {
      const et = st.map(ht => ht.id),
        ft = et.findIndex(ht => String(ht) === String(Tt.id));
      if (Ue.shiftKey && D.current != null && ft >= 0) {
        const ht = et.findIndex(wt => String(wt) === String(D.current));
        if (ht >= 0) {
          const wt = Math.min(ht, ft),
            jt = Math.max(ht, ft),
            bt = et.slice(wt, jt + 1);
          o(Bt => {
            if (O) {
              const wn = new Set(Bt);
              for (const at of bt) wn.add(at);
              return wn;
            }
            return new Set(bt);
          }), A(Tt.id);
          return;
        }
      }
      if (D.current = Tt.id, !O) {
        o(new Set([Tt.id])), A(Tt.id);
        return;
      }
      o(ht => {
        const wt = new Set(ht);
        return wt.has(Tt.id) ? (wt.delete(Tt.id), A(jt => jt === Tt.id ? null : jt)) : (wt.add(Tt.id), A(Tt.id)), wt;
      });
    }, [st, O, o]);
    g.useEffect(() => {
      try {
        localStorage.setItem(qQn, N ? "1" : "0");
      } catch {}
    }, [N]), g.useEffect(() => {
      !e || !nt || st.length >= 12 || it();
    }, [e, nt, st.length, C, T, B, it]), g.useEffect(() => {
      try {
        localStorage.setItem(tYn, E);
      } catch {}
    }, [E]), g.useEffect(() => {
      if (!k) return;
      $e.some(Ue => Ue.id === k) || A(null);
    }, [k, $e]), g.useEffect(() => {
      e || (ne.current = !1, q({
        visible: !1,
        progress: 0,
        status: ""
      }), ae({}), Ee({}), he({}), ge({}), ke(new Set()), me.current.clear());
    }, [e]), g.useEffect(() => {
      if (e) return Q5t();
    }, [e]);
    const pt = g.useCallback((Tt, Ue) => {
        var et, ft;
        Ue.main && ae(ht => ({
          ...ht,
          [Tt]: Ue.main
        })), Ue.poster && Ee(ht => ({
          ...ht,
          [Tt]: Ue.poster
        })), (et = Ue.mj) != null && et.length && he(ht => ({
          ...ht,
          [Tt]: Ue.mj
        })), Ue.audio && ge(ht => ({
          ...ht,
          [Tt]: Ue.audio
        })), Ue.localCached && ke(ht => new Set(ht).add(Tt)), (ft = Ue.blobUrls) != null && ft.length && Ne.current.push(...Ue.blobUrls);
      }, []),
      lt = g.useCallback(async Tt => {
        if (!me.current.has(Tt.id)) {
          me.current.add(Tt.id), Ye.current >= He && (await new Promise(Ue => {
            Ce.current.push(Ue);
          })), Ye.current += 1;
          try {
            const Ue = await K8a(Tt);
            pt(Tt.id, Ue);
          } catch (Ue) {
            console.warn("[BatchManageModal] 解析素材失败:", Tt.id, Ue);
          } finally {
            me.current.delete(Tt.id), Ye.current = Math.max(0, Ye.current - 1);
            const Ue = Ce.current.shift();
            Ue && Ue();
          }
        }
      }, [pt]);
    g.useEffect(() => {
      !e || Ae === 0 || ua() || (me.current.clear(), ae({}), Ee({}), he({}), ge({}), ke(new Set()));
    }, [e, Ae]), g.useEffect(() => {
      !e || !f || lt(f);
    }, [e, f == null ? void 0 : f.id, lt, f]), g.useEffect(() => {
      if (!e) return;
      let Tt = null;
      return Ie(async () => {
        const {
          assetStore: Ue
        } = await Promise.resolve().then(() => Ri);
        return {
          assetStore: Ue
        };
      }, void 0, import.meta.url).then(({
        assetStore: Ue
      }) => {
        Tt = Ue.addListener(() => Te(et => et + 1));
      }), () => {
        Tt == null || Tt();
      };
    }, [e]), g.useEffect(() => {
      if (!e) return;
      const Tt = () => Te(Ue => Ue + 1);
      return window.addEventListener(iU, Tt), () => window.removeEventListener(iU, Tt);
    }, [e]), g.useEffect(() => () => {
      Ne.current.forEach(Tt => URL.revokeObjectURL(Tt)), Ne.current = [];
    }, []);
    const gt = ve + Ae;
    g.useEffect(() => {
      if (!e || !fe || st.length === 0) return;
      const Tt = st.slice(0, 24);
      for (const Ue of Tt) lt(Ue);
    }, [e, fe, st, lt, gt]), g.useEffect(() => {
      !e || ve === 0 || (me.current.clear(), !ua() && (ae({}), Ee({}), he({}), ge({}), ke(new Set())));
    }, [e, ve]), g.useEffect(() => {
      if (!Y) return;
      const Tt = Ue => {
        W.current && !W.current.contains(Ue.target) && K(!1);
      };
      return document.addEventListener("mousedown", Tt), () => document.removeEventListener("mousedown", Tt);
    }, [Y]);
    const Ut = async Tt => {
        try {
          await navigator.clipboard.writeText(Tt), v(!0), setTimeout(() => v(!1), 2e3);
        } catch (Ue) {
          console.error("复制失败:", Ue), alert(x("复制失败，请手动复制"));
        }
      },
      _t = Tt => {
        w(Ue => new Set(Ue).add(Tt));
      },
      At = async Tt => {
        const Ue = Bd(Tt);
        if (Ue) return Ue;
        const et = Tt.url || Tt.audioUrl || "";
        if (Tt.type === "audio" && Tt._audioAssetId) try {
          const {
              assetStore: wt
            } = await Ie(async () => {
              const {
                assetStore: bt
              } = await Promise.resolve().then(() => Ri);
              return {
                assetStore: bt
              };
            }, void 0, import.meta.url),
            jt = await wt.getAssetUrl(Tt._audioAssetId);
          if (jt) return jt;
        } catch {}
        const ft = [Tt._assetId, Tt.id].filter(Boolean);
        for (const wt of ft) try {
          const {
              assetStore: jt
            } = await Ie(async () => {
              const {
                assetStore: Bt
              } = await Promise.resolve().then(() => Ri);
              return {
                assetStore: Bt
              };
            }, void 0, import.meta.url),
            bt = await jt.getAssetUrl(wt);
          if (bt) return bt;
        } catch {}
        const ht = Tt._mjAssetIds;
        if (Tt.mjImages && (ht != null && ht.length) && Tt.mjImages.length > 0) {
          const wt = Tt.selectedMjImageIndex ?? 0,
            jt = ht[wt] ?? ht[0];
          if (jt) try {
            const {
                assetStore: bt
              } = await Ie(async () => {
                const {
                  assetStore: wn
                } = await Promise.resolve().then(() => Ri);
                return {
                  assetStore: wn
                };
              }, void 0, import.meta.url),
              Bt = await bt.getAssetUrl(jt);
            if (Bt) return Bt;
          } catch {}
        }
        if (Tt.mjImages && Tt.mjImages.length > 1) {
          const wt = Tt.selectedMjImageIndex ?? 0;
          return Tt.mjImages[wt] || Tt.mjImages[0] || et;
        }
        return et;
      },
      Yt = async Tt => {
        if (Tt.startsWith("data:")) return Tt;
        const Ue = await fetch(Tt);
        if (!Ue.ok) throw new Error(`无法加载: ${Ue.status}`);
        const et = await Ue.blob();
        return new Promise((ft, ht) => {
          const wt = new FileReader();
          wt.onload = () => ft(wt.result), wt.onerror = ht, wt.readAsDataURL(et);
        });
      },
      qe = async (Tt, Ue) => {
        if (Tt.startsWith("data:")) return Tt;
        const et = String(Ue || "").trim();
        if (et) try {
          const {
              assetStore: wt
            } = await Ie(async () => {
              const {
                assetStore: bt
              } = await Promise.resolve().then(() => Ri);
              return {
                assetStore: bt
              };
            }, void 0, import.meta.url),
            jt = await wt.getAssetBlob(et);
          if (jt) return await new Promise((bt, Bt) => {
            const wn = new FileReader();
            wn.onload = () => bt(wn.result), wn.onerror = Bt, wn.readAsDataURL(jt);
          });
        } catch {}
        const {
          isTauriAssetProtocolUrl: ft
        } = await Ie(async () => {
          const {
            isTauriAssetProtocolUrl: wt
          } = await Promise.resolve().then(() => So);
          return {
            isTauriAssetProtocolUrl: wt
          };
        }, void 0, import.meta.url);
        return Tt.startsWith("blob:") || ft(Tt) || Tt.startsWith("/") && !Tt.startsWith("http") || !/^https?:\/\//i.test(Tt) ? Yt(Tt) : Tt;
      },
      kt = (Tt, Ue) => Tt && (Tt.startsWith("image/") || Tt.startsWith("video/") || Tt.startsWith("audio/")) && Tt.split("/")[1] || Ue,
      St = (Tt, Ue) => {
        const et = URL.createObjectURL(Tt),
          ft = document.createElement("a");
        ft.href = et, ft.download = Ue, document.body.appendChild(ft), ft.click(), document.body.removeChild(ft), URL.revokeObjectURL(et);
      },
      hn = async Tt => {
        try {
          const Ue = await At(Tt);
          if (!Ue) {
            (h || alert)("无法解析素材地址（请确认本地缓存有效）");
            return;
          }
          const et = await fetch(Ue);
          if (!et.ok) throw new Error(`下载失败: ${et.status}`);
          const ft = await et.blob(),
            ht = Tt.type === "video" ? "mp4" : Tt.type === "audio" ? "mp3" : "png",
            wt = kt(ft.type, ht),
            jt = `Material-${Tt.id}.${wt}`;
          if (window.__TAURI__) {
            const {
                saveToDisk: bt
              } = await Ie(async () => {
                const {
                  saveToDisk: wn
                } = await Promise.resolve().then(() => Sde);
                return {
                  saveToDisk: wn
                };
              }, void 0, import.meta.url),
              Bt = await bt(ft, jt);
            (u || alert)(`已保存：${Bt}`);
            return;
          }
          St(ft, jt);
        } catch (Ue) {
          (h || alert)(Ue instanceof Error ? Ue.message : "下载失败");
        }
      },
      Qt = () => {
        X.current = !1, we.current = !1, ce(!1), re({
          visible: !1,
          progress: 0,
          status: ""
        });
      },
      Ot = async Tt => {
        const Ue = await At(Tt);
        if (!Ue) return null;
        const et = await fetch(Ue);
        if (!et.ok) return null;
        const ft = await et.blob(),
          ht = Tt.type === "video" ? "mp4" : Tt.type === "audio" ? "mp3" : "png",
          wt = kt(ft.type, ht).replace(/[^a-z0-9]/gi, "") || ht;
        return {
          blob: ft,
          filename: `Material-${Tt.id}.${wt}`
        };
      },
      ln = async () => {
        if (we.current) return;
        const Ue = $e.filter(et => i.has(et.id)).filter(et => {
          var ft;
          return et.type === "image" || et.type === "video" || et.type === "audio" || !!((ft = et.mjImages) != null && ft.length);
        });
        if (Ue.length === 0) {
          (h || alert)("请先勾选要下载的图片、视频或音频");
          return;
        }
        X.current = !1, we.current = !0, ce(!0), re({
          visible: !0,
          progress: 0,
          status: `准备下载 ${Ue.length} 项…`
        }), await Pn();
        try {
          const et = [];
          let ft = 0;
          for (let bt = 0; bt < Ue.length; bt++) {
            if (X.current) return;
            re({
              visible: !0,
              progress: Math.round(bt / Ue.length * 80),
              status: `正在读取素材 (${bt + 1}/${Ue.length})…`
            }), await Pn();
            try {
              const Bt = await Ot(Ue[bt]);
              Bt ? et.push(Bt) : ft += 1;
            } catch {
              ft += 1;
            }
          }
          if (X.current) return;
          if (et.length === 0) {
            (h || alert)("没有可下载的素材（请确认本地缓存或云端地址有效）");
            return;
          }
          if (window.__TAURI__) {
            re({
              visible: !0,
              progress: 88,
              status: `正在保存 ${et.length} 个文件…`
            }), await Pn();
            const {
                saveBatchToDisk: bt
              } = await Ie(async () => {
                const {
                  saveBatchToDisk: at
                } = await Promise.resolve().then(() => Sde);
                return {
                  saveBatchToDisk: at
                };
              }, void 0, import.meta.url),
              Bt = await bt(et);
            if (X.current) return;
            const wn = Bt.length;
            (u || alert)(ft > 0 || wn < et.length ? `已保存 ${wn} 个文件，${ft + (et.length - wn)} 项失败` : `已保存 ${wn} 个文件到下载目录`);
            return;
          }
          re({
            visible: !0,
            progress: 88,
            status: "正在打包…"
          }), await Pn();
          const ht = (await Ie(async () => {
              const {
                default: bt
              } = await Promise.resolve().then(() => wCe);
              return {
                default: bt
              };
            }, void 0, import.meta.url)).default,
            wt = new ht();
          et.forEach(bt => wt.file(bt.filename, bt.blob));
          const jt = await wt.generateAsync({
            type: "blob"
          });
          if (X.current) return;
          St(jt, `materials-${Date.now()}.zip`), u == null || u(ft > 0 ? `已打包 ${et.length} 个文件，${ft} 项失败` : `已打包 ${et.length} 个文件`);
        } catch (et) {
          X.current || (h || alert)(et instanceof Error ? et.message : "批量下载失败");
        } finally {
          Qt();
        }
      },
      Pn = () => new Promise(Tt => {
        requestAnimationFrame(() => Tt());
      }),
      rn = () => {
        ne.current = !1, q({
          visible: !1,
          progress: 0,
          status: ""
        });
      },
      Yn = g.useCallback(Tt => Tt.filter(Ue => {
        var et;
        return Ue.status === "failed" || _.has(Ue.id) ? !1 : Ue.type === "image" || Ue.type === "video" || Ue.type === "audio" || !!((et = Ue.mjImages) != null && et.length);
      }), [_]),
      Ct = g.useCallback(async Tt => {
        if (!p || J.current) return;
        const Ue = Yn(Tt);
        if (Ue.length === 0) {
          (h || alert)("当前没有可发送到画布的图片、视频或音频");
          return;
        }
        if (Ue.length > nnn) {
          (h || alert)(`一次最多发送 ${nnn} 项，请先勾选要发送的素材`);
          return;
        }
        J.current = !0, le(!0);
        try {
          (await p(Ue)) && (u == null || u(`已发送 ${Ue.length} 项到画布`), t());
        } catch (et) {
          (h || alert)(et instanceof Error ? et.message : "发送到画布失败");
        } finally {
          J.current = !1, le(!1);
        }
      }, [t, p, Yn, h, u]),
      Cn = g.useCallback(() => {
        const Tt = i.size > 0 ? st.filter(Ue => i.has(Ue.id)) : st;
        Ct(Tt);
      }, [i, st, Ct]),
      un = g.useCallback(Tt => {
        Ct([Tt]);
      }, [Ct]),
      Jn = async () => {
        var et, ft, ht;
        if (ne.current) return;
        const Ue = (i.size > 0 ? $e.filter(wt => i.has(wt.id)) : $e).filter(wt => {
          var jt;
          return wt.type === "image" || wt.type === "video" || ((jt = wt.mjImages) == null ? void 0 : jt.length);
        });
        if (Ue.length === 0) {
          (h || alert)(i.size > 0 ? "当前选中项中没有可导入的图片/视频" : "暂无图片或视频素材可导入");
          return;
        }
        ne.current = !0, q({
          visible: !0,
          progress: 0,
          status: `准备导入 ${Ue.length} 条素材…`
        }), await Pn();
        try {
          const {
            checkEagleAvailable: wt,
            addItemsToEagle: jt
          } = await Ie(async () => {
            const {
              checkEagleAvailable: Pt,
              addItemsToEagle: dt
            } = await Promise.resolve().then(() => Dwt);
            return {
              checkEagleAvailable: Pt,
              addItemsToEagle: dt
            };
          }, void 0, import.meta.url);
          if (q(Pt => ({
            ...Pt,
            progress: 5,
            status: "正在检测 Eagle…"
          })), await Pn(), !(await wt())) {
            (h || alert)("请先启动 Eagle 应用"), rn();
            return;
          }
          const Bt = [];
          for (let Pt = 0; Pt < Ue.length; Pt++) {
            const dt = Ue[Pt];
            q({
              visible: !0,
              progress: 8 + Math.round((Pt + 1) / Ue.length * 62),
              status: `正在准备素材 (${Pt + 1}/${Ue.length})…`
            }), await Pn();
            const xt = [];
            if (dt.mjImages && dt.mjImages.length > 0) {
              const gn = dt._mjAssetIds;
              if (gn != null && gn.length) {
                const {
                  assetStore: mt
                } = await Ie(async () => {
                  const {
                    assetStore: Xt
                  } = await Promise.resolve().then(() => Ri);
                  return {
                    assetStore: Xt
                  };
                }, void 0, import.meta.url);
                for (let Xt = 0; Xt < dt.mjImages.length; Xt++) try {
                  const Gn = gn[Xt] ?? gn[0],
                    rr = await mt.getAssetBlob(Gn);
                  if (rr) {
                    const Dn = await new Promise((Ar, _r) => {
                      const Pa = new FileReader();
                      Pa.onload = () => Ar(Pa.result), Pa.onerror = _r, Pa.readAsDataURL(rr);
                    });
                    xt.push({
                      url: Dn,
                      assetId: Gn
                    });
                    continue;
                  }
                  const qn = await mt.getAssetUrl(Gn);
                  qn && xt.push({
                    url: qn,
                    assetId: Gn
                  });
                } catch {}
              }
              if (!xt.length) {
                const mt = Math.min(dt.selectedMjImageIndex ?? 0, dt.mjImages.length - 1),
                  Xt = dt.mjImages[mt] || dt.mjImages[0];
                Xt && xt.push({
                  url: Xt
                });
              }
            } else {
              const gn = String(dt._assetId || dt.id || "").trim() || void 0;
              if (gn) try {
                const {
                    assetStore: mt
                  } = await Ie(async () => {
                    const {
                      assetStore: Gn
                    } = await Promise.resolve().then(() => Ri);
                    return {
                      assetStore: Gn
                    };
                  }, void 0, import.meta.url),
                  Xt = await mt.getAssetBlob(gn);
                if (Xt) {
                  const Gn = await new Promise((rr, qn) => {
                    const Dn = new FileReader();
                    Dn.onload = () => rr(Dn.result), Dn.onerror = qn, Dn.readAsDataURL(Xt);
                  });
                  xt.push({
                    url: Gn,
                    assetId: gn
                  });
                }
              } catch {}
              if (!xt.length) {
                const mt = await At(dt);
                mt && xt.push({
                  url: mt,
                  assetId: gn
                });
              }
            }
            const yn = (dt.prompt || dt.positivePrompt || "").trim() || void 0;
            for (let gn = 0; gn < xt.length; gn++) {
              let mt;
              try {
                mt = await qe(xt[gn].url, xt[gn].assetId);
              } catch {
                continue;
              }
              const Xt = ((ft = (et = mt.match(/^data:([^;,]+)/i)) == null ? void 0 : et[1]) == null ? void 0 : ft.toLowerCase()) || "";
              let Gn = dt.type === "video" ? "mp4" : "jpg";
              if (Xt === "image/jpeg" || Xt === "image/jpg") Gn = "jpg";else if (Xt === "image/png") Gn = "png";else if (Xt === "image/webp") Gn = "webp";else if (Xt === "image/gif") Gn = "gif";else if (Xt.startsWith("video/")) Gn = Xt.includes("webm") ? "webm" : "mp4";else {
                const rr = (ht = (mt.split("?")[0] || "").match(/\.([a-z0-9]{2,5})$/i)) == null ? void 0 : ht[1];
                rr && (Gn = rr.toLowerCase() === "jpeg" ? "jpg" : rr.toLowerCase());
              }
              Bt.push({
                url: mt,
                name: `Generated-${dt.id}${xt.length > 1 ? `-${gn + 1}` : ""}.${Gn}`,
                annotation: yn
              });
            }
          }
          if (Bt.length === 0) {
            (h || alert)("无法解析素材地址（请确认本地缓存有效）"), rn();
            return;
          }
          const wn = 3;
          let at = 0;
          for (let Pt = 0; Pt < Bt.length; Pt += wn) {
            const dt = Bt.slice(Pt, Pt + wn);
            q({
              visible: !0,
              progress: 72 + Math.round(at / Bt.length * 26),
              status: `正在导入 Eagle (${at}/${Bt.length})…`
            }), await Pn(), await jt(dt), at += dt.length, q({
              visible: !0,
              progress: 72 + Math.round(at / Bt.length * 26),
              status: `正在导入 Eagle (${at}/${Bt.length})…`
            }), await Pn();
          }
          q({
            visible: !0,
            progress: 100,
            status: `已导入 ${Bt.length} 个素材`
          }), (u || alert)(`已导入 ${Bt.length} 个素材到 Eagle`), window.setTimeout(() => rn(), 600);
        } catch (wt) {
          rn(), (h || alert)(wt instanceof Error ? wt.message : "导入 Eagle 失败");
        }
      },
      Kn = g.useCallback(async (Tt, Ue) => {
        var yn;
        const et = Ue ?? Tt.selectedMjImageIndex ?? 0;
        if (ua()) {
          try {
            const {
              hydrateGlobalOssUploadDedupFromSqlite: gn
            } = await Ie(async () => {
              const {
                hydrateGlobalOssUploadDedupFromSqlite: mt
              } = await Promise.resolve().then(() => mIt);
              return {
                hydrateGlobalOssUploadDedupFromSqlite: mt
              };
            }, void 0, import.meta.url);
            await gn();
          } catch {}
          if (Tt = Cj({
            ...Tt,
            selectedMjImageIndex: et,
            _globalOssUrlOnly: !0,
            ossUploaded: !0
          }), Tt = Fue(Tt, a), !xP(Tt)) {
            const gn = await KIn(Tt, a);
            gn && (Tt = Cj({
              ...gn.item,
              selectedMjImageIndex: et,
              _globalOssUrlOnly: !0,
              ossUploaded: !0
            }));
          }
          xP(Tt) && (s(gn => {
            const mt = gn.map(Xt => String(Xt.id) === String(Tt.id) ? {
              ...Xt,
              ...Tt
            } : Xt);
            return Ie(async () => {
              const {
                persistHistoryToStorage: Xt
              } = await Promise.resolve().then(() => Gu);
              return {
                persistHistoryToStorage: Xt
              };
            }, void 0, import.meta.url).then(({
              persistHistoryToStorage: Xt
            }) => Xt(mt, {
              force: !0
            })).catch(() => {}), mt;
          }), rt(gn => gn.map(mt => String(mt.id) === String(Tt.id) ? {
            ...mt,
            ...Tt
          } : mt)));
        }
        const ft = xe[Tt.id] || [],
          ht = ua() || Tt._globalOssUrlOnly || Nk(Tt),
          wt = ((yn = Tt.mjImages) == null ? void 0 : yn.map((gn, mt) => {
            const Xt = M0(Tt, mt);
            return ht ? Xt || (gn && nr(gn) ? Go(gn) || (/\/thumbnails\//i.test(gn) || /-list\.webp(?:$|\?)/i.test(gn) ? "" : gn.split("?")[0]) : "") || "" : Xt || gn || "";
          })) || [],
          jt = ht ? wt : wt.some(Boolean) ? wt.map((gn, mt) => gn || ft[mt] || "") : ft;
        let bt = "";
        if (jt && jt.length > 1) bt = jt[et] ?? jt.find(Boolean) ?? "";else if (Tt.type === "video") {
          const mt = yH(Tt, ie[Tt.id], Tt.url && !Tt.url.startsWith("blob:") ? Tt.url : void 0) || (await At(Tt));
          bt = mt ? _c(mt) || mt : "";
        } else bt = yH(Tt, ie[Tt.id], Tt.url && !Tt.url.startsWith("blob:") ? Tt.url : void 0) || (await At(Tt));
        if (!bt) {
          (h || alert)(ht ? "无法加载 OSS 原图，请检查对应原图 URL 是否仍然有效" : "无法加载原图，请确认本地缓存有效");
          return;
        }
        const Bt = (jt && jt.length > 1 ? jt[et] || jt.find(Boolean) : void 0) || Tt._ossRemoteUrl || Tt.originalUrl || Bd(Tt) || void 0,
          wn = document.querySelector(`[data-batch-preview-id="${CSS.escape(Tt.id)}"]`) || document.querySelector(`[data-batch-asset-id="${CSS.escape(Tt.id)}"]`),
          at = (wn == null ? void 0 : wn.querySelector(`[data-mj-index="${et}"] img, img[data-mj-index="${et}"]`)) || (wn == null ? void 0 : wn.querySelector("img, video")),
          Pt = at instanceof HTMLImageElement ? at.currentSrc || at.src : at instanceof HTMLVideoElement ? at.poster : "",
          dt = at == null ? void 0 : at.getBoundingClientRect();
        let xt = dt && {
          left: dt.left,
          top: dt.top,
          width: dt.width,
          height: dt.height
        };
        if (xt && at instanceof HTMLImageElement && at.naturalWidth > 0 && (wn != null && wn.hasAttribute("data-batch-preview-id"))) {
          const gn = Math.min(xt.width / at.naturalWidth, xt.height / at.naturalHeight),
            mt = at.naturalWidth * gn,
            Xt = at.naturalHeight * gn;
          xt = {
            left: xt.left + (xt.width - mt) / 2,
            top: xt.top + (xt.height - Xt) / 2,
            width: mt,
            height: Xt
          };
        }
        Vhe(Tt.id, Pt && xt && xt.width > 2 && xt.height > 2 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? {
          nodeId: `batch-${Tt.id}`,
          src: Pt,
          backdropBlur: !1,
          rect: xt
        } : null), l({
          ...Tt,
          url: bt,
          originalUrl: bt,
          _ossRemoteUrl: Bt || Tt._ossRemoteUrl,
          _globalOssUrlOnly: ht ? !0 : Tt._globalOssUrlOnly,
          ossUploaded: Tt.ossUploaded,
          _assetId: ht ? void 0 : Tt._assetId || Tt.id,
          preferDisplayUrls: ht ? !0 : void 0,
          mjImages: jt && jt.length > 1 ? jt : Tt.mjImages,
          selectedMjImageIndex: et
        }), d(!0);
      }, [xe, ie, a, s, l, d, h]),
      en = g.useRef(Kn);
    en.current = Kn;
    const Vn = g.useCallback(Tt => {
      Kn(Tt);
    }, [Kn]);
    return g.useEffect(() => {
      if (!e || !fe) return;
      const Tt = ft => {
          S.current = {
            x: ft.clientX,
            y: ft.clientY
          };
        },
        Ue = () => {
          var Pt, dt;
          const {
              x: ft,
              y: ht
            } = S.current,
            wt = document.elementFromPoint(ft, ht),
            jt = (Pt = wt == null ? void 0 : wt.closest) == null ? void 0 : Pt.call(wt, "[data-batch-asset-id]"),
            bt = (jt == null ? void 0 : jt.getAttribute("data-batch-asset-id")) || null,
            Bt = (dt = wt == null ? void 0 : wt.closest) == null ? void 0 : dt.call(wt, "[data-mj-index]"),
            wn = Bt == null ? void 0 : Bt.getAttribute("data-mj-index"),
            at = wn != null && wn !== "" && Number.isFinite(Number(wn)) ? Number(wn) : void 0;
          return {
            id: bt,
            mjIndex: at
          };
        },
        et = ft => {
          if (ft.code !== "Space" && ft.key !== " " || ft.repeat || ft.defaultPrevented || document.querySelector(".sketch-lightbox-overlay, .sketch-material-detail-overlay")) return;
          const ht = ft.target;
          if (ht && (ht.tagName === "INPUT" || ht.tagName === "BUTTON" || ht.tagName === "SELECT" || ht.tagName === "TEXTAREA" || ht.isContentEditable)) return;
          const wt = Ue(),
            jt = wt.id || k || (i.size === 1 ? [...i][0] : null);
          if (!jt) return;
          ft.preventDefault();
          const bt = st.find(Bt => String(Bt.id) === String(jt)) || $e.find(Bt => String(Bt.id) === String(jt));
          bt && en.current(bt, wt.mjIndex);
        };
      return window.addEventListener("pointermove", Tt, {
        passive: !0
      }), window.addEventListener("keydown", et), () => {
        window.removeEventListener("pointermove", Tt), window.removeEventListener("keydown", et);
      };
    }, [e, fe, k, i, st, $e]), e ? c.jsxs(c.Fragment, {
      children: [c.jsx(l1t, {
        visible: Q.visible,
        progress: Q.progress,
        status: Q.status,
        type: "import",
        isDark: n
      }), c.jsx(l1t, {
        visible: Z.visible,
        progress: Z.progress,
        status: Z.status,
        type: "export",
        isDark: n,
        onCancel: () => {
          X.current = !0, re(Tt => ({
            ...Tt,
            status: "正在取消…"
          }));
        }
      }), c.jsxs("div", {
        className: "studio-materials-page",
        children: [c.jsxs("div", {
          className: `sketch-assets-modal sketch-assets-lib studio-materials-library${n ? " sketch-assets-modal-dark" : ""}`,
          style: {
            "--materials-card-min": `${JQn}px`,
            "--materials-card-gap": `${VNe}px`
          },
          children: [c.jsxs("header", {
            className: "studio-materials-heading",
            children: [c.jsx("h1", {
              children: x("素材管理")
            }), c.jsxs("label", {
              className: "sketch-assets-lib-search sketch-assets-lib-search-top",
              children: [c.jsx(mc, {
                size: 13
              }), c.jsx("input", {
                value: B,
                onChange: Tt => F(Tt.target.value),
                placeholder: x("搜索素材…"),
                title: x("搜索素材、提示词或模型"),
                "aria-label": x("搜索素材")
              })]
            }), c.jsxs("div", {
              className: "sketch-assets-lib-topbar-right",
              children: [c.jsx("button", {
                type: "button",
                onClick: () => {
                  ua() || Fe(Tt => Tt + 1);
                },
                className: "sketch-assets-btn sketch-assets-btn-icon",
                title: x("刷新缩略图"),
                children: c.jsx(bd, {
                  size: 14
                })
              }), O || i.size > 0 ? c.jsxs("button", {
                type: "button",
                onClick: () => void ln(),
                disabled: pe || i.size === 0,
                title: i.size > 0 ? x("下载已选 {0} 项", i.size) : x("请先勾选要下载的素材"),
                className: "sketch-assets-btn",
                children: [c.jsx(ws, {
                  size: 14
                }), pe ? x("下载中…") : i.size > 0 ? x("下载 {0}", i.size) : x("下载")]
              }) : null, c.jsxs("button", {
                type: "button",
                onClick: () => void Cn(),
                disabled: de || !p || st.length === 0,
                title: i.size > 0 ? x("将已选 {0} 项发送到画布", i.size) : x("将当前筛选内容发送到画布"),
                className: "sketch-assets-btn",
                children: [c.jsx(zu, {
                  size: 14
                }), de ? x("发送中…") : i.size > 0 ? x("画布 {0}", i.size) : x("画布")]
              }), c.jsxs("button", {
                type: "button",
                onClick: () => void Jn(),
                disabled: Q.visible,
                title: i.size > 0 ? x("将已选 {0} 项导入 Eagle（支持图片和视频）", i.size) : x("导入到 Eagle"),
                className: "sketch-assets-btn",
                children: [c.jsx(mu, {
                  size: 14
                }), Q.visible ? x("导入中…") : "Eagle", i.size > 0 && c.jsx("span", {
                  className: "studio-materials-action-count",
                  children: i.size
                })]
              }), c.jsxs("div", {
                className: "sketch-assets-more-wrap",
                ref: W,
                children: [c.jsx("button", {
                  type: "button",
                  onClick: () => K(Tt => !Tt),
                  className: "sketch-assets-btn sketch-assets-btn-icon",
                  title: x("更多操作"),
                  children: c.jsx(hw, {
                    size: 15
                  })
                }), Y && c.jsxs("div", {
                  className: "sketch-assets-more-menu",
                  children: [c.jsx("button", {
                    type: "button",
                    className: "sketch-assets-more-item",
                    onClick: () => {
                      const Tt = st.map(et => et.id);
                      Tt.length > 0 && Tt.every(et => i.has(et)) ? (o(new Set()), A(null)) : o(new Set(Tt)), K(!1);
                    },
                    children: st.length > 0 && st.every(Tt => i.has(Tt.id)) ? x("取消全选") : x("全选")
                  }), c.jsx("button", {
                    type: "button",
                    className: "sketch-assets-more-item sketch-assets-more-item-danger",
                    onClick: async () => {
                      K(!1);
                      const Tt = [...We],
                        {
                          clearHistoryStorageMode: Ue,
                          addDeletedHistoryUrls: et,
                          persistHistoryToStorage: ft
                        } = await Ie(async () => {
                          const {
                            clearHistoryStorageMode: jt,
                            addDeletedHistoryUrls: bt,
                            persistHistoryToStorage: Bt
                          } = await Promise.resolve().then(() => Gu);
                          return {
                            clearHistoryStorageMode: jt,
                            addDeletedHistoryUrls: bt,
                            persistHistoryToStorage: Bt
                          };
                        }, void 0, import.meta.url),
                        ht = await Ue(),
                        wt = new Set([...ht.map(String), ...Tt.map(jt => String(jt.id))]);
                      wt.size !== 0 && (Tt.length > 0 && et(Tt), rt([]), Le.current = 0, ze(!1), s(jt => {
                        const bt = jt.filter(Bt => !wt.has(String(Bt.id)));
                        return ft(bt), bt;
                      }), o(new Set()), A(null), w(new Set()), ae({}), Ee({}), he({}), ge({}), ke(new Set()), u == null || u("已清空画布历史记录，本地缓存和 OSS 素材已保留"));
                    },
                    children: x("清空全部")
                  }), c.jsx("button", {
                    type: "button",
                    className: "sketch-assets-more-item sketch-assets-more-item-danger",
                    onClick: () => {
                      K(!1), (async () => {
                        const {
                            deleteFailedHistoryByStorageMode: Tt,
                            addDeletedHistoryIds: Ue,
                            addDeletedHistoryUrls: et,
                            persistHistoryToStorage: ft
                          } = await Ie(async () => {
                            const {
                              deleteFailedHistoryByStorageMode: Bt,
                              addDeletedHistoryIds: wn,
                              addDeletedHistoryUrls: at,
                              persistHistoryToStorage: Pt
                            } = await Promise.resolve().then(() => Gu);
                            return {
                              deleteFailedHistoryByStorageMode: Bt,
                              addDeletedHistoryIds: wn,
                              addDeletedHistoryUrls: at,
                              persistHistoryToStorage: Pt
                            };
                          }, void 0, import.meta.url),
                          ht = await Tt(),
                          wt = $e.filter(Bt => Bt.status === "failed" || _.has(Bt.id) || !!(Bt.errorMsg && String(Bt.errorMsg).trim())),
                          jt = new Set([...ht.map(String), ...wt.map(Bt => String(Bt.id))]);
                        if (jt.size === 0) return;
                        const bt = $e.filter(Bt => jt.has(String(Bt.id)));
                        Ue(jt), bt.length > 0 && et(bt), Ie(async () => {
                          const {
                            removeHistoryItemsFromOssManifest: Bt
                          } = await Promise.resolve().then(() => qh);
                          return {
                            removeHistoryItemsFromOssManifest: Bt
                          };
                        }, void 0, import.meta.url).then(({
                          removeHistoryItemsFromOssManifest: Bt
                        }) => Bt([...jt])), rt(Bt => Bt.filter(wn => !jt.has(String(wn.id)))), s(Bt => {
                          const wn = Bt.filter(at => !jt.has(String(at.id)));
                          return ft(wn), wn;
                        }), bt.length > 0 && s1t(bt).catch(Bt => {
                          console.warn("[BatchManageModal] 删除失败项缓存失败:", Bt);
                        }), o(Bt => {
                          const wn = new Set(Bt);
                          for (const at of jt) wn.delete(at);
                          return wn;
                        }), w(new Set());
                      })();
                    },
                    children: x("删除失败")
                  })]
                })]
              }), c.jsx("button", {
                type: "button",
                disabled: i.size === 0,
                onClick: async () => {
                  if (i.size === 0) return;
                  const Tt = $e.filter(wt => i.has(wt.id)),
                    Ue = new Set(Tt.map(wt => String(wt.id))),
                    {
                      addDeletedHistoryIds: et,
                      addDeletedHistoryUrls: ft,
                      persistHistoryToStorage: ht
                    } = await Ie(async () => {
                      const {
                        addDeletedHistoryIds: wt,
                        addDeletedHistoryUrls: jt,
                        persistHistoryToStorage: bt
                      } = await Promise.resolve().then(() => Gu);
                      return {
                        addDeletedHistoryIds: wt,
                        addDeletedHistoryUrls: jt,
                        persistHistoryToStorage: bt
                      };
                    }, void 0, import.meta.url);
                  et(Ue), ft(Tt), Ie(async () => {
                    const {
                      removeHistoryItemsFromOssManifest: wt
                    } = await Promise.resolve().then(() => qh);
                    return {
                      removeHistoryItemsFromOssManifest: wt
                    };
                  }, void 0, import.meta.url).then(({
                    removeHistoryItemsFromOssManifest: wt
                  }) => wt([...Ue])), rt(wt => wt.filter(jt => !Ue.has(String(jt.id)))), s(wt => {
                    const jt = wt.filter(bt => !Ue.has(String(bt.id)));
                    return ht(jt), jt;
                  }), o(new Set()), A(null), s1t(Tt).catch(wt => {
                    console.warn("[BatchManageModal] 批量删除缓存失败:", wt);
                  });
                },
                className: "sketch-assets-btn sketch-assets-btn-danger",
                children: c.jsx(Qo, {
                  size: 14
                })
              })]
            })]
          }), c.jsxs("div", {
            className: "sketch-assets-lib-shell",
            children: [c.jsxs("aside", {
              className: "sketch-assets-lib-sidebar",
              children: [c.jsx("div", {
                className: "sketch-assets-lib-section",
                children: c.jsxs("div", {
                  className: "sketch-assets-lib-nav",
                  children: [c.jsxs("button", {
                    type: "button",
                    className: `sketch-assets-lib-nav-item${T === "all" ? " active" : ""}`,
                    onClick: () => P("all"),
                    children: [c.jsx(Y2, {
                      size: 14
                    }), c.jsx("span", {
                      className: "lib-nav-label",
                      children: x("全部素材")
                    }), c.jsx("span", {
                      className: "lib-nav-count",
                      children: Oe.all
                    })]
                  }), c.jsxs("button", {
                    type: "button",
                    className: `sketch-assets-lib-nav-item${T === "favorites" ? " active" : ""}`,
                    onClick: () => P("favorites"),
                    children: [c.jsx(CP, {
                      size: 14
                    }), c.jsx("span", {
                      className: "lib-nav-label",
                      children: x("收藏")
                    }), c.jsx("span", {
                      className: "lib-nav-count",
                      children: Oe.favorites
                    })]
                  }), c.jsxs("button", {
                    type: "button",
                    className: `sketch-assets-lib-nav-item${T === "recent7" ? " active" : ""}`,
                    onClick: () => P("recent7"),
                    children: [c.jsx(AP, {
                      size: 14
                    }), c.jsx("span", {
                      className: "lib-nav-label",
                      children: x("最近 7 天")
                    }), c.jsx("span", {
                      className: "lib-nav-count",
                      children: Oe.recent7
                    })]
                  }), c.jsxs("button", {
                    type: "button",
                    className: `sketch-assets-lib-nav-item${T === "failed" ? " active" : ""}`,
                    onClick: () => P("failed"),
                    children: [c.jsx(Qo, {
                      size: 14
                    }), c.jsx("span", {
                      className: "lib-nav-label",
                      children: x("生成失败")
                    }), c.jsx("span", {
                      className: "lib-nav-count",
                      children: Oe.failed
                    })]
                  })]
                })
              }), c.jsxs("div", {
                className: `sketch-assets-lib-section sketch-assets-lib-models${R ? " is-expanded" : ""}`,
                children: [c.jsx("div", {
                  className: "sketch-assets-lib-section-head",
                  children: x("模型")
                }), c.jsxs("div", {
                  className: "sketch-assets-lib-nav custom-scrollbar",
                  "aria-label": x("模型分组"),
                  tabIndex: 0,
                  children: [Oe.models.filter((Tt, Ue) => R || Ue < 6 || T === `model:${Tt.name}`).map(Tt => {
                    const Ue = `model:${Tt.name}`;
                    return c.jsxs("button", {
                      type: "button",
                      className: `sketch-assets-lib-nav-item${T === Ue ? " active" : ""}`,
                      onClick: () => P(Ue),
                      title: Tt.name,
                      children: [c.jsx("span", {
                        className: "lib-nav-label",
                        children: Tt.name
                      }), c.jsx("span", {
                        className: "lib-nav-count",
                        children: Tt.count
                      })]
                    }, Tt.name);
                  }), Oe.models.length === 0 && c.jsx("div", {
                    className: "sketch-assets-lib-empty-hint",
                    children: x("暂无模型分组")
                  })]
                }), Oe.models.length > 6 && c.jsxs("button", {
                  type: "button",
                  className: "studio-materials-model-toggle",
                  "aria-expanded": R,
                  onClick: () => j(Tt => !Tt),
                  children: [R ? x("收起") : x("全部模型 · {0}", Oe.models.length), c.jsx(Mi, {
                    size: 13
                  })]
                })]
              })]
            }), c.jsxs("div", {
              className: "sketch-assets-lib-main",
              children: [c.jsxs("div", {
                className: "sketch-assets-lib-topbar",
                children: [c.jsxs("div", {
                  className: "sketch-assets-lib-type-counts",
                  children: [c.jsx("button", {
                    type: "button",
                    className: `sketch-assets-lib-count-chip${C === "all" ? " active" : ""}`,
                    "aria-pressed": C === "all",
                    onClick: () => I("all"),
                    children: x("全部")
                  }), c.jsxs("button", {
                    type: "button",
                    className: `sketch-assets-lib-count-chip${C === "image" ? " active" : ""}`,
                    "aria-pressed": C === "image",
                    onClick: () => I("image"),
                    title: x("图片"),
                    children: [c.jsx(lo, {
                      size: 13
                    }), x("图片 "), c.jsx("span", {
                      children: Oe.image
                    })]
                  }), c.jsxs("button", {
                    type: "button",
                    className: `sketch-assets-lib-count-chip${C === "video" ? " active" : ""}`,
                    "aria-pressed": C === "video",
                    onClick: () => I("video"),
                    title: x("视频"),
                    children: [c.jsx(Oo, {
                      size: 13
                    }), x("视频 "), c.jsx("span", {
                      children: Oe.video
                    })]
                  }), c.jsxs("button", {
                    type: "button",
                    className: `sketch-assets-lib-count-chip${C === "audio" ? " active" : ""}`,
                    "aria-pressed": C === "audio",
                    onClick: () => I("audio"),
                    title: x("音频"),
                    children: [c.jsx(Qh, {
                      size: 13
                    }), x("音频 "), c.jsx("span", {
                      children: Oe.audio
                    })]
                  })]
                }), c.jsxs("div", {
                  className: "sketch-assets-lib-topbar-mid",
                  children: [c.jsx("button", {
                    type: "button",
                    className: "sketch-assets-lib-chip",
                    title: x(z === "desc" ? "最新在前，点击切换为最早在前" : "最早在前，点击切换为最新在前"),
                    "aria-label": x("切换日期排序"),
                    onClick: () => V(Tt => Tt === "desc" ? "asc" : "desc"),
                    children: z === "desc" ? c.jsx(vRr, {
                      size: 15
                    }) : c.jsx(_Rr, {
                      size: 15
                    })
                  }), c.jsx("button", {
                    type: "button",
                    className: `sketch-assets-lib-chip${N ? " active" : ""}`,
                    onClick: () => G(Tt => !Tt),
                    title: x("按日期分组展示"),
                    "aria-label": x("按日期分组"),
                    "aria-pressed": N,
                    children: c.jsx(IRr, {
                      size: 13
                    })
                  }), c.jsxs("div", {
                    className: "sketch-assets-view-toggle",
                    children: [c.jsx("button", {
                      type: "button",
                      className: `sketch-assets-view-btn${E === "waterfall" ? " active" : ""}`,
                      title: x("瀑布流视图"),
                      "aria-pressed": E === "waterfall",
                      onClick: () => M("waterfall"),
                      children: c.jsx(GEn, {
                        size: 14
                      })
                    }), c.jsx("button", {
                      type: "button",
                      className: `sketch-assets-view-btn${E === "grid" ? " active" : ""}`,
                      title: x("网格视图"),
                      "aria-pressed": E === "grid",
                      onClick: () => M("grid"),
                      children: c.jsx(Od, {
                        size: 14
                      })
                    }), c.jsx("button", {
                      type: "button",
                      className: `sketch-assets-view-btn${E === "list" ? " active" : ""}`,
                      title: x("列表视图"),
                      "aria-pressed": E === "list",
                      onClick: () => M("list"),
                      children: c.jsx(X$, {
                        size: 14
                      })
                    })]
                  })]
                })]
              }), fe ? c.jsxs(c.Fragment, {
                children: [c.jsxs("div", {
                  className: "sketch-assets-lib-status",
                  children: [c.jsxs("div", {
                    className: "sketch-assets-lib-status-line",
                    children: [c.jsx("span", {
                      className: "sketch-assets-lib-status-pill",
                      children: vt
                    }), c.jsx("span", {
                      className: "sketch-assets-lib-status-meta",
                      children: st.length
                    }), O || i.size > 0 ? c.jsxs("span", {
                      className: "sketch-assets-lib-status-sel",
                      children: [x("已选 "), i.size]
                    }) : null]
                  }), c.jsxs("label", {
                    className: "sketch-assets-lib-select-mode",
                    title: x("开启后显示勾选框，可批量多选；Shift 连续选中"),
                    children: [c.jsx("span", {
                      children: x("多选")
                    }), c.jsx("button", {
                      type: "button",
                      role: "switch",
                      "aria-label": x("多选素材"),
                      "aria-checked": O,
                      className: `sketch-assets-lib-switch${O ? " on" : ""}`,
                      onClick: () => L(Tt => !Tt),
                      children: c.jsx("span", {
                        className: "sketch-assets-lib-switch-knob"
                      })
                    })]
                  })]
                }), c.jsx("div", {
                  className: `sketch-assets-grid-wrap${E === "list" ? " is-list" : ""}`,
                  children: st.length === 0 ? c.jsx("div", {
                    className: "sketch-assets-empty",
                    children: $e.length === 0 ? x("暂无生成历史") : x("当前筛选下暂无素材")
                  }) : E === "list" ? c.jsx(r6a, {
                    items: st,
                    isDark: n,
                    mediaLoadEnabled: e,
                    resolvedMainUrls: ie,
                    resolvedPosterUrls: be,
                    resolvedMjUrls: xe,
                    batchSelectedIds: i,
                    brokenImageIds: _,
                    actionTargetId: k,
                    selectionMode: O,
                    onRequestResolve: lt,
                    onSelectItem: nn,
                    onThumbnailDoubleClick: Vn,
                    onOpenInLightbox: Kn,
                    onSetDetailItem: y,
                    onImageError: _t,
                    onDownloadItem: hn,
                    isImageLike: It,
                    isVideoLike: Ft,
                    resolveEpoch: gt,
                    hasMoreHistory: nt,
                    onLoadMoreHistory: it,
                    favoriteIds: U,
                    onToggleFavorite: Ht,
                    onSendItemToCanvas: un,
                    onSendItemsToCanvas: Ct
                  }) : N && E === "grid" ? c.jsx(e6a, {
                    items: st,
                    isDark: n,
                    mediaLoadEnabled: e,
                    resolvedMainUrls: ie,
                    resolvedPosterUrls: be,
                    resolvedMjUrls: xe,
                    batchSelectedIds: i,
                    brokenImageIds: _,
                    actionTargetId: k,
                    selectionMode: O,
                    onRequestResolve: lt,
                    onSelectItem: nn,
                    onThumbnailDoubleClick: Vn,
                    onOpenInLightbox: Kn,
                    onSetDetailItem: y,
                    onImageError: _t,
                    onDownloadItem: hn,
                    isImageLike: It,
                    isVideoLike: Ft,
                    resolveEpoch: gt,
                    hasMoreHistory: nt,
                    onLoadMoreHistory: it,
                    favoriteIds: U,
                    onToggleFavorite: Ht,
                    onSendItemToCanvas: un,
                    onSendItemsToCanvas: Ct
                  }) : c.jsx(t6a, {
                    waterfall: E === "waterfall",
                    dateLayering: N,
                    items: st,
                    isDark: n,
                    mediaLoadEnabled: e,
                    resolvedMainUrls: ie,
                    resolvedPosterUrls: be,
                    resolvedMjUrls: xe,
                    batchSelectedIds: i,
                    brokenImageIds: _,
                    actionTargetId: k,
                    selectionMode: O,
                    onRequestResolve: lt,
                    onSelectItem: nn,
                    onThumbnailDoubleClick: Vn,
                    onOpenInLightbox: Kn,
                    onSetDetailItem: y,
                    onImageError: _t,
                    onDownloadItem: hn,
                    isImageLike: It,
                    isVideoLike: Ft,
                    resolveEpoch: gt,
                    hasMoreHistory: nt,
                    onLoadMoreHistory: it,
                    favoriteIds: U,
                    onToggleFavorite: Ht,
                    onSendItemToCanvas: un,
                    onSendItemsToCanvas: Ct
                  }, E)
                }, `${C}:${T}:${B}:${z}:${Me}`)]
              }) : c.jsx("div", {
                className: "sketch-assets-lib-body-skeleton flex-1 min-h-[280px]",
                "aria-hidden": !0,
                children: c.jsx("div", {
                  className: "sketch-assets-lib-skel-grid",
                  children: Array.from({
                    length: 8
                  }, (Tt, Ue) => c.jsx("div", {
                    className: "sketch-assets-lib-skel-card"
                  }, Ue))
                })
              })]
            })]
          })]
        }), fe && f && (() => {
          var Pt, dt, xt;
          const Tt = f.type === "video" ? "视频" : f.type === "audio" ? "音频" : "图片",
            Ue = Q8a(f),
            et = f.width && f.height ? `${f.width} × ${f.height}` : f.ratio || null,
            ft = CCt(f, {
              isCachedLocally: _e.has(f.id),
              localResolvedUrl: f.type === "video" ? ie[f.id] : void 0,
              localResolvedThumbnail: be[f.id]
            }),
            ht = ICt(f),
            wt = f.type === "image" || f.type === "video" || f.type === "audio" || (((Pt = f.mjImages) == null ? void 0 : Pt.length) ?? 0) > 0,
            jt = vv(f),
            bt = (dt = xe[f.id]) != null && dt.length ? xe[f.id] : ((xt = f.mjImages) == null ? void 0 : xt.map(yn => jt ? yn && !yn.startsWith("blob:") ? yn : void 0 : i5(yn)).filter(Boolean)) ?? [],
            Bt = G_e(yH(f, be[f.id], ie[f.id], jt ? f.thumbnailUrl : i5(f.thumbnailUrl), jt ? f.url && !f.url.startsWith("blob:") ? f.url : void 0 : i5(f.url))),
            wn = (() => {
              const yn = yH(f, ie[f.id], jt ? f.url && !f.url.startsWith("blob:") ? f.url : void 0 : i5(f.url));
              return yn ? _c(yn) || yn : void 0;
            })(),
            at = yH(f, NDt(be[f.id]) ? be[f.id] : void 0, jt ? f.thumbnailUrl : i5(f.thumbnailUrl), jt ? f.videoPosterUrl : i5(f.videoPosterUrl));
          return Da.createPortal(c.jsx("div", {
            className: "sketch-material-detail-overlay",
            onClick: () => y(null),
            children: c.jsxs("div", {
              className: `sketch-material-detail-modal${n ? " sketch-material-detail-modal-dark" : ""}`,
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": "material-detail-title",
              onClick: yn => yn.stopPropagation(),
              children: [c.jsxs("div", {
                className: "sketch-material-detail-header",
                children: [c.jsxs("div", {
                  className: "sketch-material-detail-header-left",
                  children: [c.jsx("div", {
                    className: "sketch-material-detail-header-icon",
                    children: c.jsx(YEn, {
                      size: 17,
                      strokeWidth: 1.75
                    })
                  }), c.jsxs("div", {
                    children: [c.jsx("h4", {
                      id: "material-detail-title",
                      className: "sketch-material-detail-title",
                      children: x("素材详情")
                    }), c.jsx("p", {
                      className: "sketch-material-detail-subtitle",
                      children: [Tt, et, Ue].filter(Boolean).join(" · ")
                    })]
                  })]
                }), c.jsx("button", {
                  type: "button",
                  className: "sketch-material-detail-close",
                  onClick: () => y(null),
                  title: x("关闭"),
                  children: c.jsx(Na, {
                    size: 15
                  })
                })]
              }), c.jsxs("div", {
                className: "sketch-material-detail-body minimal-scrollbar",
                children: [c.jsx("div", {
                  className: "sketch-material-detail-left",
                  children: c.jsx("div", {
                    className: "sketch-material-preview",
                    "data-batch-preview-id": f.id,
                    children: c.jsx("div", {
                      className: "sketch-material-preview-inner",
                      children: f.type === "video" ? c.jsx("video", {
                        src: wn,
                        poster: at,
                        className: "sketch-material-preview-media",
                        controls: !0
                      }) : f.type === "audio" ? c.jsxs("div", {
                        className: "w-full h-full flex flex-col items-center justify-center p-6",
                        children: [c.jsx(Qh, {
                          size: 44,
                          className: n ? "text-zinc-600" : "text-zinc-400"
                        }), c.jsx("div", {
                          className: "w-full mt-4",
                          children: c.jsx(mze, {
                            audioUrl: ue[f.id] || f.audioUrl || f.url,
                            isDark: n,
                            title: f.prompt || x("音频"),
                            initialDuration: f.duration
                          })
                        })]
                      }) : bt.length > 1 ? c.jsx("div", {
                        className: "w-full h-full grid grid-cols-2 grid-rows-2 gap-0 p-2",
                        children: bt.slice(0, 4).map((yn, gn) => c.jsx("img", {
                          src: G_e(yn),
                          "data-mj-index": gn,
                          className: "sketch-material-preview-media w-full h-full object-cover rounded-md",
                          alt: "",
                          loading: "lazy",
                          decoding: "async",
                          onError: () => _t(f.id)
                        }, gn))
                      }) : c.jsx("img", {
                        src: Bt,
                        className: "sketch-material-preview-media",
                        alt: "",
                        loading: "lazy",
                        decoding: "async",
                        onError: () => _t(f.id)
                      })
                    })
                  })
                }), c.jsxs("div", {
                  className: "sketch-material-detail-right minimal-scrollbar",
                  children: [c.jsxs("div", {
                    className: "sketch-material-info-card",
                    children: [c.jsx("h5", {
                      className: "sketch-material-card-title",
                      children: x("基本信息")
                    }), c.jsxs("div", {
                      className: "sketch-material-info-rows",
                      children: [c.jsxs("div", {
                        className: "sketch-material-info-row",
                        children: [c.jsx("span", {
                          className: "sketch-material-info-label",
                          children: x("模型")
                        }), c.jsx("span", {
                          className: "sketch-material-info-value",
                          children: f.modelName || "—"
                        })]
                      }), c.jsxs("div", {
                        className: "sketch-material-info-row",
                        children: [c.jsx("span", {
                          className: "sketch-material-info-label",
                          children: x("类型")
                        }), c.jsx("span", {
                          className: "sketch-material-info-value",
                          children: x(Tt)
                        })]
                      }), c.jsxs("div", {
                        className: "sketch-material-info-row",
                        children: [c.jsx("span", {
                          className: "sketch-material-info-label",
                          children: x("时间")
                        }), c.jsx("span", {
                          className: "sketch-material-info-value",
                          children: f.time
                        })]
                      }), (ft || ht) && c.jsxs("div", {
                        className: "sketch-material-info-row",
                        children: [c.jsx("span", {
                          className: "sketch-material-info-label",
                          children: x("状态")
                        }), c.jsx("span", {
                          className: "sketch-material-info-value",
                          children: c.jsxs("span", {
                            style: {
                              display: "inline-flex",
                              flexWrap: "wrap",
                              gap: "0.35rem",
                              justifyContent: "flex-end"
                            },
                            children: [ft && c.jsxs("span", {
                              className: "sketch-material-status-tag local",
                              children: [c.jsx(axe, {
                                size: 10
                              }), x("本地缓存")]
                            }), ht && c.jsxs("span", {
                              className: "sketch-material-status-tag",
                              children: [c.jsx(Wp, {
                                size: 10
                              }), f._globalOssUrlOnly ? x("云端") : x("云端备份")]
                            })]
                          })
                        })]
                      }), et && c.jsxs("div", {
                        className: "sketch-material-info-row",
                        children: [c.jsx("span", {
                          className: "sketch-material-info-label",
                          children: x("尺寸")
                        }), c.jsx("span", {
                          className: "sketch-material-info-value",
                          children: et
                        })]
                      }), Ue && c.jsxs("div", {
                        className: "sketch-material-info-row",
                        children: [c.jsx("span", {
                          className: "sketch-material-info-label",
                          children: x("格式")
                        }), c.jsx("span", {
                          className: "sketch-material-info-value",
                          children: Ue
                        })]
                      }), f.type === "audio" && f.duration && c.jsxs("div", {
                        className: "sketch-material-info-row",
                        children: [c.jsx("span", {
                          className: "sketch-material-info-label",
                          children: x("时长")
                        }), c.jsxs("span", {
                          className: "sketch-material-info-value",
                          children: [Math.floor(f.duration), x(" 秒")]
                        })]
                      })]
                    })]
                  }), c.jsxs("div", {
                    className: "sketch-material-prompt-card",
                    children: [c.jsxs("div", {
                      className: "sketch-material-prompt-head",
                      children: [c.jsx("h5", {
                        className: "sketch-material-card-title",
                        style: {
                          padding: 0
                        },
                        children: x("历史提示词")
                      }), c.jsx("div", {
                        className: "sketch-material-prompt-actions",
                        children: c.jsx("button", {
                          type: "button",
                          onClick: () => Ut(f.prompt || ""),
                          className: `sketch-material-prompt-btn${b ? " copied" : ""}`,
                          disabled: b,
                          children: b ? c.jsxs(c.Fragment, {
                            children: [c.jsx(MRr, {
                              size: 12
                            }), x("已复制")]
                          }) : c.jsxs(c.Fragment, {
                            children: [c.jsx(Cx, {
                              size: 12
                            }), x("复制")]
                          })
                        })
                      })]
                    }), c.jsx("div", {
                      className: "sketch-material-prompt-body minimal-scrollbar",
                      children: f.prompt || x("无提示词")
                    })]
                  }), c.jsxs("div", {
                    className: "sketch-material-action-card",
                    children: [c.jsx("h5", {
                      className: "sketch-material-card-title",
                      children: x("操作")
                    }), c.jsxs("div", {
                      className: "sketch-material-action-list",
                      children: [c.jsxs("button", {
                        type: "button",
                        className: "sketch-material-action-row is-primary",
                        disabled: de || !p,
                        onClick: () => un(f),
                        children: [c.jsx(zu, {
                          size: 14,
                          strokeWidth: 1.75
                        }), x(de ? "发送中…" : "发送到画布")]
                      }), c.jsxs("button", {
                        type: "button",
                        className: "sketch-material-action-row",
                        onClick: () => void Kn(f),
                        children: [c.jsx(ul, {
                          size: 14,
                          strokeWidth: 1.75
                        }), x("查看大图")]
                      }), c.jsxs("button", {
                        type: "button",
                        className: "sketch-material-action-row",
                        disabled: !wt,
                        onClick: () => void hn(f),
                        children: [c.jsx(ws, {
                          size: 14,
                          strokeWidth: 1.75
                        }), x("下载原图")]
                      })]
                    })]
                  })]
                })]
              }), c.jsx("div", {
                className: "sketch-material-detail-footer",
                children: c.jsx("button", {
                  type: "button",
                  className: "sketch-material-detail-footer-btn",
                  onClick: () => y(null),
                  children: x("关闭")
                })
              })]
            })
          }), document.body);
        })()]
      })]
    }) : null;
  },
  a6a = Object.freeze(Object.defineProperty({
    __proto__: null,
    BatchManageModal: ann,
    default: ann
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  u1t = "material_library_root_path",
  oYn = [["Favorites", "收藏"], ["Character", "角色"], ["Scene", "场景"], ["Item", "物品"], ["Style", "风格"], ["Sound Effect", "音效"], ["Others", "其他"]],
  eXe = oYn.map(([, e]) => e);

function sYn(e) {
  return eXe.includes(e);
}

const i6a = new Set(["png", "jpg", "jpeg", "gif", "webp", "bmp", "svg"]),
  o6a = new Set(["mp4", "mov", "webm", "mkv", "avi", "m4v"]),
  s6a = new Set(["mp3", "wav", "ogg", "flac", "m4a", "aac", "opus"]);

function lYn(e) {
  return (e.split(".").pop() || "").toLowerCase();
}

function DDt(e) {
  const t = lYn(e);
  return i6a.has(t) ? "image" : o6a.has(t) ? "video" : s6a.has(t) ? "audio" : "file";
}

function sCe(e) {
  const t = lYn(e);
  return t === "png" ? "image/png" : t === "jpg" || t === "jpeg" ? "image/jpeg" : t === "webp" ? "image/webp" : t === "gif" ? "image/gif" : t === "bmp" ? "image/bmp" : t === "svg" ? "image/svg+xml" : t === "mp4" ? "video/mp4" : t === "mov" ? "video/quicktime" : t === "webm" ? "video/webm" : t === "mkv" ? "video/x-matroska" : t === "avi" ? "video/x-msvideo" : t === "m4v" ? "video/x-m4v" : t === "mp3" ? "audio/mpeg" : t === "wav" ? "audio/wav" : t === "ogg" ? "audio/ogg" : t === "flac" ? "audio/flac" : t === "m4a" ? "audio/mp4" : t === "aac" ? "audio/aac" : t === "opus" ? "audio/opus" : "application/octet-stream";
}

const cYn = [{
  name: "图片",
  extensions: ["png", "jpg", "jpeg", "gif", "webp", "bmp", "svg"]
}, {
  name: "音频",
  extensions: ["mp3", "wav", "ogg", "flac", "m4a", "aac", "opus"]
}, {
  name: "视频",
  extensions: ["mp4", "mov", "webm", "mkv", "avi", "m4v"]
}, {
  name: "所有文件",
  extensions: ["*"]
}];

function dYn(e) {
  return e.replace(/\.[^/.]+$/, "");
}

function hG(e) {
  return String(e || "").replace(/[\\/:*?"<>|]/g, " ").replace(/[\x00-\x1F\x7F]/g, " ").replace(/\s+/g, " ").trim() || "未命名";
}

function LDt(e, t = 8) {
  const n = String(e || "").trim();
  if (!n) return "";
  const r = Array.from(n);
  return r.length <= t ? n : `${r.slice(0, t).join("")}...`;
}

function lCe() {
  try {
    return localStorage.getItem(_S(u1t));
  } catch {
    return null;
  }
}

function uYn(e) {
  try {
    e ? localStorage.setItem(_S(u1t), e) : localStorage.removeItem(_S(u1t));
  } catch {}
}

async function hYn() {
  const e = await WE({
    directory: !0,
    multiple: !1,
    title: "选择素材库根文件夹"
  });
  return e ? Array.isArray(e) ? e[0] : e : null;
}

async function l6a(e) {
  for (const t of eXe) {
    const n = await Vu(e, t);
    await qc(n, {
      recursive: !0
    });
  }
}

async function c6a(e) {
  for (const [t, n] of oYn) {
    const r = await Vu(e, t),
      a = await Vu(e, n);
    let i = !1,
      o = !1;
    try {
      await oY(r), i = !0;
    } catch {}
    try {
      await oY(a), o = !0;
    } catch {}
    if (i) {
      if (!o) {
        await iY(r, a);
        continue;
      }
      try {
        const s = await i3(r);
        for (const l of s) {
          if (!l.name) continue;
          const d = await Vu(r, l.name),
            u = await Vu(a, l.name);
          try {
            await iY(d, u);
          } catch {}
        }
        await hk(r, {
          recursive: !0
        });
      } catch {}
    }
  }
}

async function pYn(e, t) {
  const n = await i3(e),
    r = [],
    a = [];
  for (const i of n) {
    if (!i.name) continue;
    const o = await Vu(e, i.name);
    if (i.isDirectory) r.push(await pYn(o, i.name));else if (i.isFile) {
      let s, l, d;
      try {
        const u = await oY(o);
        s = typeof u.size == "number" ? u.size : void 0, l = typeof u.birthtime == "number" ? u.birthtime : void 0, d = typeof u.mtime == "number" ? u.mtime : void 0;
      } catch {}
      a.push({
        id: o,
        name: i.name,
        path: o,
        kind: DDt(i.name),
        size: s,
        createdAt: l,
        modifiedAt: d
      });
    }
  }
  return r.sort((i, o) => i.name.localeCompare(o.name, "zh-CN")), a.sort((i, o) => i.name.localeCompare(o.name, "zh-CN")), {
    id: e,
    name: t,
    path: e,
    children: r,
    assets: a
  };
}

async function cCe(e) {
  return await qc(e, {
    recursive: !0
  }), await c6a(e), await l6a(e), pYn(e, "素材库");
}

async function lD(e) {
  const t = await Au(e.path),
    n = new Blob([t], {
      type: sCe(e.name)
    });
  return URL.createObjectURL(n);
}

async function zD(e, t) {
  var l;
  const n = dYn(t),
    r = ((l = t.match(/(\.[^./\\]+)$/)) == null ? void 0 : l[1]) || "",
    a = hG(n),
    i = `${a}${r}`,
    o = await Vu(e, i);
  try {
    await oY(o);
  } catch {
    return i;
  }
  let s = 2;
  for (; s < 1e4;) {
    const d = `${a} (${s})${r}`;
    try {
      await oY(await Vu(e, d)), s += 1;
    } catch {
      return d;
    }
  }
  return `${a}-${Date.now()}${r}`;
}

async function mYn(e, t, n) {
  await qc(e, {
    recursive: !0
  });
  const r = await zD(e, hG(t)),
    a = new Uint8Array(await n.arrayBuffer()),
    i = await Vu(e, r);
  return await wE(i, a), i;
}

async function fYn(e, t) {
  const n = hG(t),
    r = await zD(e, n),
    a = await Vu(e, r);
  return await qc(a, {
    recursive: !0
  }), a;
}

async function gYn(e, t) {
  const n = e.includes("\\") ? e.slice(0, e.lastIndexOf("\\")) : e.slice(0, e.lastIndexOf("/")),
    r = await zD(n, hG(t)),
    a = await Vu(n, r);
  return await iY(e, a), a;
}

async function yYn(e) {
  await hk(e, {
    recursive: !0
  });
}

async function bYn(e, t, n) {
  const r = await zD(t, hG(n)),
    a = await Vu(t, r);
  return await iY(e, a), a;
}

async function vYn(e) {
  await hk(e);
}

async function wYn(e, t, n) {
  const r = await zD(t, hG(n)),
    a = await Vu(t, r);
  return await iY(e, a), a;
}

async function xYn(e, t, n) {
  var o;
  const r = await Au(e),
    a = await zD(t, `${dYn(n)} 副本${((o = n.match(/(\.[^./\\]+)$/)) == null ? void 0 : o[1]) || ""}`),
    i = await Vu(t, a);
  return await wE(i, r), i;
}

async function _Yn(e, t, n) {
  const r = await zD(t, hG(n)),
    a = await Vu(t, r);
  return await iY(e, a), a;
}

async function h1t(e) {
  const t = await WE({
    multiple: !0,
    title: "导入到素材库",
    filters: cYn.map(a => ({
      name: a.name,
      extensions: [...a.extensions]
    }))
  });
  if (t == null) return [];
  const n = Array.isArray(t) ? t : [t],
    r = [];
  for (const a of n) {
    const i = String(a).replace(/^.*[/\\]/, "") || "file",
      o = await zD(e, i),
      s = await Vu(e, o);
    await ESn(a, s), r.push(s);
  }
  return r;
}

async function kYn(e, t, n) {
  const r = await zD(t, `${hG(n)} 副本`),
    a = await Vu(t, r);
  await qc(a, {
    recursive: !0
  });
  const i = async (o, s) => {
    const l = await i3(o);
    for (const d of l) {
      if (!d.name) continue;
      const u = await Vu(o, d.name),
        h = await Vu(s, d.name);
      if (d.isDirectory) await qc(h, {
        recursive: !0
      }), await i(u, h);else if (d.isFile) {
        const p = await Au(u);
        await wE(h, p);
      }
    }
  };
  return await i(e, a), a;
}

const AYn = Object.freeze(Object.defineProperty({
    __proto__: null,
    MATERIAL_LIBRARY_DEFAULT_FOLDERS: eXe,
    MATERIAL_LIBRARY_IMPORT_FILTERS: cYn,
    chooseMaterialLibraryRoot: hYn,
    createMaterialFolder: fYn,
    deleteMaterialAsset: vYn,
    deleteMaterialFolder: yYn,
    duplicateMaterialAsset: xYn,
    duplicateMaterialFolder: kYn,
    formatMaterialLibraryDisplayName: LDt,
    getMaterialLibraryRootPath: lCe,
    importFilesToMaterialFolder: h1t,
    isMaterialLibraryDefaultFolder: sYn,
    loadMaterialLibraryTree: cCe,
    materialKindFromName: DDt,
    materialMimeFromName: sCe,
    moveMaterialAsset: wYn,
    moveMaterialFolder: _Yn,
    readMaterialAssetAsBlobUrl: lD,
    renameMaterialAsset: bYn,
    renameMaterialFolder: gYn,
    setMaterialLibraryRootPath: uYn,
    writeBlobToFolder: mYn
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  p1t = "ai-role-library-synced-from-material",
  d6a = ["AI角色", "角色", "character", "Character"],
  ODt = [{
    id: "all-roles",
    name: "全部角色",
    children: [{
      id: "ancient",
      name: "古代历史",
      children: [{
        id: "ancient-a",
        name: "宫廷朝堂"
      }, {
        id: "ancient-b",
        name: "战乱江湖"
      }]
    }, {
      id: "modern-era",
      name: "近代历史",
      children: [{
        id: "modern-a",
        name: "民国都市"
      }, {
        id: "modern-b",
        name: "革命战争"
      }]
    }, {
      id: "contemporary",
      name: "当代现实",
      children: [{
        id: "cont-a",
        name: "都市生活"
      }, {
        id: "cont-b",
        name: "职场"
      }, {
        id: "cont-c",
        name: "校园青春"
      }]
    }, {
      id: "scifi",
      name: "科幻未来",
      children: [{
        id: "sci-a",
        name: "星际航行"
      }, {
        id: "sci-b",
        name: "赛博都市"
      }]
    }, {
      id: "fantasy",
      name: "架空幻想",
      children: [{
        id: "fan-a",
        name: "玄幻修真"
      }, {
        id: "fan-b",
        name: "西幻史诗"
      }]
    }]
  }],
  SYn = [{
    key: "大类",
    values: ["人物", "动物", "物品", "场景"]
  }, {
    key: "时代",
    values: ["古代", "近代", "现代", "未来", "架空"]
  }, {
    key: "性别",
    values: ["男", "女", "中性"]
  }, {
    key: "年龄段",
    values: ["儿童", "少年", "青年", "中年", "老年"]
  }, {
    key: "物种",
    values: ["人类", "猫科", "犬科", "鸟类", "幻想生物", "其他"]
  }, {
    key: "体格",
    values: ["纤瘦", "匀称", "健壮", "魁梧"]
  }, {
    key: "肤色",
    values: ["白皙", "自然", "小麦", "古铜", "深色"]
  }, {
    key: "发色",
    values: ["黑", "棕", "金", "红", "银白", "染彩"]
  }, {
    key: "身高",
    values: ["矮", "中等", "高", "特高"]
  }, {
    key: "发长",
    values: ["寸发/光头", "短发", "及肩", "长发"]
  }, {
    key: "气质",
    values: ["冷峻", "温和", "活泼", "忧郁", "威严", "亲和"]
  }];

function m1t(e) {
  var t;
  return (t = e.children) != null && t.length ? e.children.flatMap(n => m1t(n).map(r => [e.name, ...r])) : [[e.name]];
}

function u6a(e) {
  var n;
  if (!e.length) return [];
  const t = e[0];
  return t.name === "全部角色" && ((n = t.children) != null && n.length) ? t.children.flatMap(r => m1t(r)) : e.flatMap(r => m1t(r));
}

function HNe(e) {
  return e.map(t => ({
    ...t,
    children: t.children ? HNe(t.children) : void 0
  }));
}

function f1t(e, t) {
  for (const n of e) {
    if (n.id === t) return [n];
    if (n.children) {
      const r = f1t(n.children, t);
      if (r) return [n, ...r];
    }
  }
  return null;
}

function IYn(e, t, n) {
  return e.map(r => r.id === t ? {
    ...r,
    name: n
  } : r.children ? {
    ...r,
    children: IYn(r.children, t, n)
  } : r);
}

function CYn(e, t, n) {
  for (let r = 0; r < e.length; r++) {
    const a = e[r];
    if (a.id === t) {
      const i = [...(a.children || []), n];
      return e.map((o, s) => s === r ? {
        ...o,
        children: i
      } : o);
    }
    if (a.children) {
      const i = CYn(a.children, t, n);
      if (i) return e.map((o, s) => s === r ? {
        ...o,
        children: i
      } : o);
    }
  }
  return null;
}

function EYn(e) {
  var n;
  const t = [e.id];
  if ((n = e.children) != null && n.length) for (const r of e.children) t.push(...EYn(r));
  return t;
}

function TYn(e, t) {
  const n = e.findIndex(i => i.id === t);
  if (n >= 0) {
    const i = e[n];
    return i.id === "all-roles" || i.name === "全部角色" ? {
      tree: e,
      removed: !1
    } : {
      tree: e.filter((o, s) => s !== n),
      removed: !0
    };
  }
  let r = !1;
  return {
    tree: e.map(i => {
      var s;
      if (!((s = i.children) != null && s.length)) return i;
      const o = TYn(i.children, t);
      return o.removed ? (r = !0, {
        ...i,
        children: o.tree.length ? o.tree : void 0
      }) : i;
    }),
    removed: r
  };
}

function h6a(e, t, n) {
  return t.length ? e.map(r => {
    const a = r.categoryPath;
    return a.length < t.length || !t.every((o, s) => a[s] === o) ? r : {
      ...r,
      categoryPath: [...n],
      updatedAt: Date.now()
    };
  }) : e;
}

function p6a(e, t, n) {
  if (!t.length) return e;
  const r = t.length - 1,
    a = t[r],
    i = t.slice(0, r);
  return e.map(o => {
    if (o.categoryPath.length <= r || !i.every((l, d) => o.categoryPath[d] === l) || o.categoryPath[r] !== a) return o;
    const s = [...o.categoryPath];
    return s[r] = n, {
      ...o,
      categoryPath: s,
      updatedAt: Date.now()
    };
  });
}

function IQ(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}

function m6a(e) {
  const t = typeof e == "string" ? e : "";
  return ["main", "front", "side", "back", "expression", "detail", "other"].includes(t) ? t : "other";
}

function g1t(e) {
  if (!Array.isArray(e)) return [];
  const t = [];
  for (const n of e) {
    if (!IQ(n)) continue;
    const r = typeof n.id == "string" && n.id ? n.id : Fi(),
      a = typeof n.name == "string" ? n.name : "未命名",
      i = Array.isArray(n.categoryPath) ? n.categoryPath.filter(p => typeof p == "string") : [],
      o = Array.isArray(n.tags) ? n.tags.filter(p => typeof p == "string") : [],
      s = IQ(n.attributes) ? Object.fromEntries(Object.entries(n.attributes).filter(([, p]) => typeof p == "string")) : {},
      l = [];
    if (Array.isArray(n.assets)) for (const p of n.assets) {
      if (!IQ(p)) continue;
      const m = typeof p.path == "string" ? p.path : "";
      !m || p.kind !== "image" || l.push({
        id: typeof p.id == "string" && p.id ? p.id : Fi(),
        name: typeof p.name == "string" ? p.name : m.split(/[/\\]/).pop() || "image",
        path: m,
        kind: "image",
        roleAssetType: m6a(p.roleAssetType),
        label: typeof p.label == "string" ? p.label : void 0
      });
    }
    const d = Date.now(),
      u = typeof n.createdAt == "number" && Number.isFinite(n.createdAt) ? n.createdAt : d,
      h = typeof n.updatedAt == "number" && Number.isFinite(n.updatedAt) ? n.updatedAt : d;
    t.push({
      id: r,
      name: a,
      categoryPath: i,
      tags: o,
      attributes: s,
      description: typeof n.description == "string" ? n.description : void 0,
      demeanorPrompt: typeof n.demeanorPrompt == "string" ? n.demeanorPrompt : void 0,
      costumePrompt: typeof n.costumePrompt == "string" ? n.costumePrompt : void 0,
      assets: l,
      createdAt: u,
      updatedAt: h
    });
  }
  return t;
}

function f6a(e) {
  if (!Array.isArray(e) || e.length === 0) return !1;
  const t = n => !IQ(n) || typeof n.id != "string" || typeof n.name != "string" ? !1 : n.children !== void 0 ? Array.isArray(n.children) ? n.children.every(t) : !1 : !0;
  return e.every(t);
}

function WNe(e) {
  return f6a(e) ? e : ODt;
}

function xne(e) {
  const t = new Map();
  for (const n of SYn) t.set(n.key, new Set(n.values));
  if (Array.isArray(e)) for (const n of e) {
    if (!IQ(n) || typeof n.key != "string" || !n.key) continue;
    const r = Array.isArray(n.values) ? n.values.filter(a => typeof a == "string") : [];
    t.set(n.key, new Set(r));
  }
  return Array.from(t.entries()).map(([n, r]) => ({
    key: n,
    values: Array.from(r)
  }));
}

function MYn(e) {
  return Array.isArray(e) ? e.filter(t => typeof t == "string") : [];
}

function g6a(e) {
  if (e == null) return {
    roles: [],
    config: {}
  };
  if (Array.isArray(e)) return {
    roles: g1t(e),
    config: {}
  };
  if (!IQ(e)) return {
    roles: [],
    config: {}
  };
  const t = g1t(e.roles),
    n = IQ(e.config) ? e.config : {},
    r = {
      categories: n.categories !== void 0 ? WNe(n.categories) : void 0,
      filterOptions: n.filterOptions !== void 0 ? xne(n.filterOptions) : void 0,
      collapsedCategoryIds: n.collapsedCategoryIds !== void 0 ? MYn(n.collapsedCategoryIds) : void 0
    };
  return {
    roles: t,
    config: r
  };
}

function y6a(e) {
  if (!e) return [];
  const t = [],
    n = r => {
      for (const a of r.assets) a.kind === "image" && t.push(a);
      for (const a of r.children) n(a);
    };
  return n(e), t;
}

function b6a(e) {
  for (const t of d6a) {
    const n = e.find(r => r.name === t);
    if (n) return n;
  }
  return null;
}

function v6a(e) {
  return {
    id: e.id,
    name: e.name,
    path: e.path,
    kind: "image"
  };
}

function Wve(e) {
  const t = e.assets.find(n => n.roleAssetType === "main");
  return t || e.assets[0];
}

function w6a(e) {
  const t = e.match(/^(.*)[/\\][^/\\]+$/);
  return t ? t[1] : e;
}

function qNe(e) {
  return String(e || "").replace(/\\/g, "/").toLowerCase();
}

function x6a(e) {
  return String(e || "").replace(/\.[^/.]+$/, "").trim() || String(e || "").trim();
}

function _6a(e) {
  const t = new Map();
  for (const n of e) for (const r of n.assets) r.kind === "image" && r.path && t.set(qNe(r.path), r);
  return t;
}

function k6a(e, t) {
  let n = !1;
  return {
    roles: e.map(a => {
      const i = [];
      for (const u of a.assets) {
        const h = t.get(qNe(u.path));
        if (!h) {
          n = !0;
          continue;
        }
        const p = u.id === u.path || qNe(u.id) === qNe(u.path),
          m = {
            ...u,
            path: h.path,
            name: h.name,
            id: p ? h.path : u.id
          };
        (m.path !== u.path || m.name !== u.name || m.id !== u.id) && (n = !0), i.push(m);
      }
      const o = i.find(u => u.roleAssetType === "main") || i[0],
        s = o ? x6a(o.name) : a.name.trim(),
        l = !!(o && s && s !== a.name.trim()),
        d = i.length !== a.assets.length;
      return l || d ? (n = !0, {
        ...a,
        name: s || a.name,
        assets: i,
        updatedAt: Date.now()
      }) : i.some((u, h) => {
        var p, m;
        return u.path !== ((p = a.assets[h]) == null ? void 0 : p.path) || u.name !== ((m = a.assets[h]) == null ? void 0 : m.name);
      }) ? (n = !0, {
        ...a,
        assets: i,
        updatedAt: Date.now()
      }) : a;
    }),
    changed: n
  };
}

function A6a(e, t) {
  var i;
  const n = e.trim();
  if (!n) return t;
  const r = /\.[^./\\]+$/.test(n),
    a = ((i = t.match(/(\.[^./\\]+)$/)) == null ? void 0 : i[1]) || "";
  return r ? n : a ? `${n}${a}` : n;
}

function S6a(e) {
  const t = (e.type || "").toLowerCase();
  return t.includes("png") ? "png" : t.includes("jpeg") || t.includes("jpg") ? "jpg" : t.includes("webp") ? "webp" : t.includes("gif") ? "gif" : "png";
}

function I6a(e, t) {
  try {
    const r = new URL(e).pathname.split("/").pop() || "";
    if (r && /\.[a-z0-9]+$/i.test(r)) return r.slice(0, 120);
  } catch {}
  return `image-${t}.png`;
}

async function C6a(e) {
  const t = (e.url || "").trim();
  if (!t || t.toLowerCase().startsWith("asset://")) return null;
  const n = r => r.type.startsWith("image/") || !r.type && r.size > 0;
  if (e.sourceAssetId) {
    const {
      assetStore: r
    } = await Ie(async () => {
      const {
        assetStore: a
      } = await Promise.resolve().then(() => Ri);
      return {
        assetStore: a
      };
    }, void 0, import.meta.url);
    await r.init();
    try {
      const a = await r.getAssetBlob(e.sourceAssetId);
      if (a && n(a)) return a;
    } catch {}
  }
  if (t.startsWith("content_ref:")) {
    try {
      await Er.init();
      const r = Er.extractId(t);
      let a = await Er.get(r);
      if (a || (await new Promise(s => setTimeout(s, 200)), a = await Er.get(r)), !a) return null;
      const i = await fetch(a);
      if (!i.ok) return null;
      const o = await i.blob();
      if (o.type.startsWith("image/") || n(o)) return o;
    } catch {
      return null;
    }
    return null;
  }
  try {
    const r = await fetch(t);
    if (!r.ok) return null;
    const a = await r.blob();
    if (a.type.startsWith("image/") || t.startsWith("blob:") || t.startsWith("data:image") || n(a)) return a;
  } catch {
    return null;
  }
  return null;
}

function E6a(e, t) {
  const n = (t == null ? void 0 : t.enabled) !== !1,
    [r, a] = g.useState([]),
    [i, o] = g.useState(ODt),
    [s, l] = g.useState(SYn),
    [d, u] = g.useState([]),
    [h, p] = g.useState(!1),
    [m, f] = g.useState(!1),
    [y, b] = g.useState(null),
    v = g.useMemo(() => y6a(e.tree), [e.tree]),
    _ = g.useMemo(() => b6a(e.allFolders), [e.allFolders]),
    w = g.useCallback(async (U, H) => {
      f(!0);
      try {
        const Y = {
            categories: (H == null ? void 0 : H.categories) ?? i,
            filterOptions: (H == null ? void 0 : H.filterOptions) ?? s,
            collapsedCategoryIds: (H == null ? void 0 : H.collapsedCategoryIds) ?? d
          },
          K = {
            version: 1,
            roles: U,
            config: Y,
            updatedAt: new Date().toISOString()
          },
          W = await KCt(JSON.stringify(K, null, 2));
        b(W ? null : "未选择资源缓存目录或保存失败");
      } catch (Y) {
        b(Y instanceof Error ? Y.message : "保存失败");
      } finally {
        f(!1);
      }
    }, [i, s, d]),
    k = g.useCallback(async () => {
      p(!0), b(null);
      try {
        const U = await QCt(),
          {
            roles: H,
            config: Y
          } = g6a(U);
        a(g1t(H)), o(WNe(Y.categories)), l(xne(Y.filterOptions)), u(MYn(Y.collapsedCategoryIds));
      } catch (U) {
        b(U instanceof Error ? U.message : "加载失败");
      } finally {
        p(!1);
      }
    }, []),
    A = g.useCallback(async U => {
      const H = U ?? e.allFolders,
        Y = _6a(H),
        {
          roles: K,
          changed: W
        } = k6a(r, Y);
      return W && (a(K), await w(K)), typeof window < "u" && window.dispatchEvent(new Event(p1t)), W;
    }, [e.allFolders, w, r]);
  g.useEffect(() => {
    n && k();
  }, [n, k]);
  const S = g.useCallback(U => {
      a(H => {
        const Y = U(H);
        return w(Y), Y;
      });
    }, [w]),
    C = g.useCallback((U, H) => {
      var Q;
      const Y = Date.now(),
        K = U.map((q, ne) => ({
          id: q.id || Fi(),
          name: q.name,
          path: q.path,
          kind: "image",
          roleAssetType: ne === 0 ? "main" : "other"
        })),
        W = Rat(i);
      return {
        id: Fi(),
        name: H || ((Q = U[0]) == null ? void 0 : Q.name.replace(/\.[^/.]+$/, "")) || "新资源",
        categoryPath: W,
        tags: [],
        attributes: {},
        assets: K,
        createdAt: Y,
        updatedAt: Y
      };
    }, [i]),
    I = g.useCallback(async () => {
      const U = _;
      if (!U) throw new Error("请先在素材库根下创建「AI角色」「角色」或 character 文件夹，并选择素材库目录");
      const H = await e.importImageFiles(U.path);
      if (!H.length) return;
      const Y = C(H);
      S(K => [...K, Y]);
    }, [_, e, C, S]),
    E = g.useCallback(U => {
      const H = U.filter(K => K.kind === "image" && K.path);
      if (!H.length) return;
      const Y = C(H);
      S(K => [...K, Y]);
    }, [C, S]),
    M = g.useCallback(async U => {
      var ne;
      const H = _;
      if (!H) throw new Error("请先在素材库根下创建「AI角色」「角色」或 character 文件夹");
      const Y = [];
      let K = 0;
      for (const de of U) {
        const le = await C6a(de);
        if (!le) continue;
        const J = S6a(le),
          pe = (de.label || I6a(de.url, K)).replace(/[\\/:*?"<>|]/g, "_").slice(0, 80) || `img-${K}`,
          ce = await e.writeBlobToFolder(H.path, `${pe}-${Date.now()}.${J}`, le);
        Y.push({
          id: Fi(),
          name: `${pe}.${J}`,
          path: ce,
          kind: "image",
          roleAssetType: K === 0 ? "main" : "other"
        }), K += 1;
      }
      if (!Y.length) return;
      const W = Date.now(),
        Q = Rat(i),
        q = {
          id: Fi(),
          name: ((ne = Y[0]) == null ? void 0 : ne.name.replace(/\.[^/.]+$/, "")) || "新资源",
          categoryPath: Q,
          tags: [],
          attributes: {},
          assets: Y,
          createdAt: W,
          updatedAt: W
        };
      S(de => [...de, q]);
    }, [_, e, i, S]),
    T = g.useCallback(async (U, H) => {
      var q;
      let Y = {
          ...H
        },
        K = H.assets;
      const W = r.find(ne => ne.id === U),
        Q = (q = H.name) == null ? void 0 : q.trim();
      if (W && Q && Q !== W.name.trim() && e.renameAsset) {
        const ne = H.assets ?? W.assets,
          de = Wve({
            ...W,
            assets: ne
          });
        if (de != null && de.path) {
          const le = A6a(Q, de.name);
          if (le !== de.name) {
            const J = w6a(de.path),
              pe = await e.renameAsset(de.path, J, le);
            K = ne.map(ce => {
              if (ce.path !== de.path) return ce;
              const we = ce.id === de.path || ce.id.replace(/\\/g, "/").toLowerCase() === de.path.replace(/\\/g, "/").toLowerCase();
              return {
                ...ce,
                path: pe,
                name: le,
                id: we ? pe : ce.id
              };
            }), Y = {
              ...Y,
              assets: K,
              name: Q
            };
          }
        }
      }
      S(ne => ne.map(de => de.id === U ? {
        ...de,
        ...Y,
        assets: K ?? de.assets,
        updatedAt: Date.now()
      } : de));
    }, [e, S, r]),
    P = g.useCallback(U => {
      S(H => H.filter(Y => Y.id !== U));
    }, [S]),
    R = g.useCallback(U => e.getPreviewUrl(v6a(U)), [e]),
    j = g.useCallback(U => {
      const H = WNe(U);
      o(H), a(Y => (w(Y, {
        categories: H
      }), Y));
    }, [w]),
    B = g.useCallback(U => {
      const H = xne(U);
      l(H), a(Y => (w(Y, {
        filterOptions: H
      }), Y));
    }, [w]),
    F = g.useCallback(U => {
      u(U), a(H => (w(H, {
        collapsedCategoryIds: U
      }), H));
    }, [w]),
    N = g.useCallback((U, H) => {
      const Y = H.trim();
      if (!Y) return;
      const K = f1t(i, U);
      if (!(K != null && K.length)) return;
      const W = K.map(de => de.name).filter(de => de !== "全部角色"),
        Q = K[K.length - 1].name;
      if (Y === Q) return;
      const q = IYn(HNe(i), U, Y);
      [...W.slice(0, -1)];
      const ne = p6a(r, W, Y);
      o(q), a(ne), w(ne, {
        categories: q
      });
    }, [i, r, w]),
    G = g.useCallback((U, H) => {
      const Y = H.trim();
      if (!Y) return;
      const K = {
          id: Fi(),
          name: Y
        },
        W = CYn(HNe(i), U, K);
      W && (o(W), w(r, {
        categories: W
      }));
    }, [i, r, w]),
    z = g.useCallback(U => {
      var q;
      const H = U.trim();
      if (!H || !((q = i[0]) != null && q.children)) return;
      const Y = {
          id: Fi(),
          name: H
        },
        K = i[0],
        Q = [{
          ...K,
          children: [...(K.children || []), Y]
        }, ...i.slice(1)];
      o(Q), w(r, {
        categories: Q
      });
    }, [i, r, w]),
    V = g.useCallback(U => {
      if (U === "all-roles") return;
      const H = f1t(i, U);
      if (!(H != null && H.length)) return;
      const Y = H[H.length - 1];
      if (Y.name === "全部角色" || Y.id === "all-roles") return;
      const K = H.map(ce => ce.name).filter(ce => ce !== "全部角色"),
        W = new Set(EYn(Y)),
        Q = HNe(i),
        {
          tree: q,
          removed: ne
        } = TYn(Q, U);
      if (!ne) return;
      const de = WNe(q),
        le = Rat(de),
        J = h6a(r, K, le),
        pe = d.filter(ce => !W.has(ce));
      o(de), a(J), u(pe), w(J, {
        categories: de,
        collapsedCategoryIds: pe
      });
    }, [i, r, d, w]),
    O = g.useCallback((U, H, Y) => {
      const K = Y.trim();
      if (!K || H === K) return;
      const W = s.map(ne => ne.key === U ? {
          ...ne,
          values: ne.values.map(de => de === H ? K : de)
        } : ne),
        Q = xne(W),
        q = r.map(ne => ({
          ...ne,
          attributes: ne.attributes[U] === H ? {
            ...ne.attributes,
            [U]: K
          } : ne.attributes,
          updatedAt: Date.now()
        }));
      l(Q), a(q), w(q, {
        filterOptions: Q
      });
    }, [s, r, w]),
    L = g.useCallback((U, H) => {
      const Y = s.map(Q => Q.key === U ? {
          ...Q,
          values: Q.values.filter(q => q !== H)
        } : Q),
        K = xne(Y),
        W = r.map(Q => ({
          ...Q,
          attributes: Q.attributes[U] === H ? {
            ...Q.attributes,
            [U]: ""
          } : Q.attributes,
          updatedAt: Date.now()
        }));
      l(K), a(W), w(W, {
        filterOptions: K
      });
    }, [s, r, w]),
    D = g.useCallback((U, H = []) => {
      const Y = U.trim();
      if (!Y || s.some(Q => Q.key === Y)) return;
      const K = [...s, {
          key: Y,
          values: H
        }],
        W = xne(K);
      l(W), w(r, {
        filterOptions: W
      });
    }, [s, r, w]);
  return {
    roles: r,
    categories: i,
    filterOptions: s,
    collapsedCategoryIds: d,
    imageAssets: v,
    importFolder: _,
    loading: h,
    saving: m,
    error: y,
    refresh: k,
    syncFromMaterialLibrary: A,
    createRoleFromImportedImages: I,
    createRoleFromExistingAssets: E,
    createRoleFromExternalSources: M,
    updateRole: T,
    deleteRole: P,
    getAssetPreviewUrl: R,
    updateCategories: j,
    updateFilterOptions: B,
    updateCollapsedCategoryIds: F,
    renameCategoryById: N,
    addCategoryChildById: G,
    addCategoryEra: z,
    deleteCategoryById: V,
    renameFilterOptionValue: O,
    removeFilterOptionValue: L,
    addFilterDimension: D
  };
}

function Rat(e) {
  var o, s, l;
  const t = e[0];
  if (!((o = t == null ? void 0 : t.children) != null && o.length)) return ["当代现实", "校园青春"];
  const n = t.children.find(d => d.name === "当代现实"),
    r = (s = n == null ? void 0 : n.children) == null ? void 0 : s.find(d => d.name === "校园青春");
  if (n && r) return [n.name, r.name];
  const a = t.children[0],
    i = (l = a.children) == null ? void 0 : l[0];
  return i ? [a.name, i.name] : [t.name, a.name];
}

const XN = new Map();

function PYn(e) {
  return XN.get(e);
}

function y1t(e, t) {
  XN.set(e, t);
}

function iJ() {
  for (const e of XN.values()) if (e.startsWith("blob:")) try {
    URL.revokeObjectURL(e);
  } catch {}
  XN.clear();
}

function BDt(e, t) {
  if (!e && !t) {
    iJ();
    return;
  }
  for (const n of [...XN.keys()]) {
    if (e && n.includes(e)) {
      const r = XN.get(n);
      if (r != null && r.startsWith("blob:")) try {
        URL.revokeObjectURL(r);
      } catch {}
      XN.delete(n);
    }
    if (t && n.includes(t)) {
      const r = XN.get(n);
      if (r != null && r.startsWith("blob:")) try {
        URL.revokeObjectURL(r);
      } catch {}
      XN.delete(n);
    }
  }
}

const T6a = Object.freeze(Object.defineProperty({
    __proto__: null,
    clearAllMaterialPreviewCache: iJ,
    getMaterialPreviewCachedUrl: PYn,
    invalidateMaterialPreviewCache: BDt,
    setMaterialPreviewCachedUrl: y1t
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  RYn = ["大类", "时代", "性别", "年龄段", "物种", "体格", "身高", "肤色", "发长", "发色", "气质"],
  NYn = ["性别", "年龄段", "物种", "体格", "身高", "发长", "气质"],
  jYn = [{
    key: "main",
    label: "主图"
  }, {
    key: "front",
    label: "正面"
  }, {
    key: "side",
    label: "侧面"
  }, {
    key: "back",
    label: "背面"
  }, {
    key: "expression",
    label: "表情"
  }, {
    key: "detail",
    label: "细节"
  }, {
    key: "other",
    label: "其他"
  }],
  inn = {
    main: 0,
    front: 1,
    side: 2,
    back: 3,
    expression: 4,
    detail: 5,
    other: 6
  };

function M6a(e) {
  return [...e].sort((t, n) => (inn[t.roleAssetType] ?? 99) - (inn[n.roleAssetType] ?? 99));
}

const qve = "全部角色",
  P6a = "全部资源";

function b1t(e) {
  return e === qve ? P6a : e;
}

function v1t(e) {
  return e.map(b1t).join("/");
}

function DYn(e, t) {
  return t === qve ? !0 : e.categoryPath.includes(t);
}

function R6a(e, t) {
  if (!t.trim()) return !0;
  const n = t.trim().toLowerCase();
  return [e.name, e.description, e.demeanorPrompt, e.costumePrompt, ...e.tags, ...e.categoryPath, ...Object.values(e.attributes)].filter(Boolean).join(" ").toLowerCase().includes(n);
}

function N6a(e, t) {
  for (const [n, r] of Object.entries(t)) {
    if (!(r != null && r.length)) continue;
    if (!(r.some(i => e.attributes[n] === i) || r.some(i => e.tags.includes(i)))) return !1;
  }
  return !0;
}

function Nat(e, t, n = !0) {
  for (const r of t) {
    const a = e.find(i => i.roleAssetType === r);
    if (a) return a;
  }
  return n ? e[0] ?? null : null;
}

function j6a(e) {
  const t = new Set(),
    n = r => {
      var a;
      for (const i of r) t.add(i.name), (a = i.children) != null && a.length && n(i.children);
    };
  return n(e), t;
}

const tXe = ({
    cacheKey: e,
    load: t,
    loadFallback: n,
    reloadEpoch: r = 0,
    alt: a,
    className: i,
    lazyLoad: o = !1,
    scrollRootRef: s
  }) => {
    on();
    const l = g.useRef(null),
      d = g.useRef(t),
      u = g.useRef(n);
    d.current = t, u.current = n;
    const [h, p] = g.useState(null),
      [m, f] = g.useState(!1),
      [y, b] = g.useState(!o),
      v = g.useRef(!1);
    g.useEffect(() => {
      if (!o) {
        b(!0);
        return;
      }
      b(!1);
      const w = l.current;
      if (!w) return;
      const k = new IntersectionObserver(A => {
        b(A.some(S => S.isIntersecting));
      }, {
        root: (s == null ? void 0 : s.current) ?? null,
        rootMargin: "80px 0px",
        threshold: .01
      });
      return k.observe(w), () => k.disconnect();
    }, [o, s, e]), g.useEffect(() => {
      if (!y) {
        f(!1);
        return;
      }
      let w = !1;
      return v.current = !1, f(!0), p(null), (async () => {
        const A = PYn(e);
        if (A) {
          w || (p(A), f(!1));
          return;
        }
        try {
          let S = await d.current();
          if (!S && u.current && (S = await u.current()), w) return;
          S && (y1t(e, S), p(S));
        } catch {
          w || p(null);
        } finally {
          w || f(!1);
        }
      })(), () => {
        w = !0;
      };
    }, [e, r, y]);
    const _ = g.useCallback(() => {
      const w = u.current;
      v.current || !w || (async () => {
        try {
          const k = await w();
          if (!k || k === h) return;
          v.current = !0, y1t(e, k), p(k);
        } catch {}
      })();
    }, [e, h]);
    return !y || m && !h ? c.jsx("div", {
      ref: l,
      className: "flex h-full w-full items-center justify-center bg-zinc-800/90",
      children: c.jsx(Ua, {
        className: "h-5 w-5 shrink-0 animate-spin text-zinc-500",
        "aria-hidden": !0
      })
    }) : h ? c.jsx("div", {
      ref: l,
      className: "h-full w-full overflow-hidden bg-zinc-950",
      children: c.jsx("img", {
        src: h,
        alt: a,
        className: i,
        onError: _
      })
    }) : c.jsx("div", {
      ref: l,
      className: "h-full w-full bg-zinc-800/90"
    });
  },
  D6a = ({
    isOpen: e,
    isDark: t,
    roles: n,
    categories: r,
    filterOptions: a,
    collapsedCategoryIds: i,
    imageAssets: o,
    loading: s,
    saving: l,
    error: d,
    onClose: u,
    onBackToMaterialLibrary: h,
    onRefresh: p,
    onCreateFromImportedImages: m,
    onCreateFromExistingAssets: f,
    onUpdateRole: y,
    onDeleteRole: b,
    onUpdateCategories: v,
    onUpdateFilterOptions: _,
    onUpdateCollapsedCategoryIds: w,
    getAssetPreviewUrl: k,
    getAssetPreviewFallbackUrl: A,
    getAssetOriginalPreviewUrl: S,
    getMaterialAssetPreviewUrl: C,
    getMaterialAssetPreviewFallbackUrl: I,
    onApplyToCanvas: E,
    onSaved: M,
    renameCategoryById: T,
    addCategoryChildById: P,
    addCategoryEra: R,
    deleteCategoryById: j,
    renameFilterOptionValue: B,
    removeFilterOptionValue: F,
    addFilterDimension: N
  }) => {
    var Ye, Ce;
    on();
    const G = t ? "bg-[#111113] border-zinc-800" : "bg-white border-zinc-200",
      z = "text-zinc-500",
      V = t ? "bg-zinc-100 text-zinc-950" : "bg-zinc-900 text-white",
      O = t ? "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200" : "bg-zinc-200 text-zinc-600 hover:bg-zinc-300 hover:text-zinc-900",
      [L, D] = g.useState(qve),
      [U, H] = g.useState({}),
      [Y, K] = g.useState(""),
      [W, Q] = g.useState(null),
      [q, ne] = g.useState(null),
      [de, le] = g.useState(!1),
      [J, pe] = g.useState(new Set()),
      [ce, we] = g.useState(null),
      [X, Z] = g.useState(!1),
      [re, fe] = g.useState(null),
      [ye, ie] = g.useState(null),
      [ae, be] = g.useState(""),
      Ee = g.useRef(null),
      [xe, he] = g.useState(null),
      [ue, ge] = g.useState({}),
      _e = g.useRef(null),
      [ke, ve] = g.useState(0),
      [Te, Ne] = g.useState(!1),
      me = g.useRef(null),
      Ae = g.useRef(null),
      Fe = g.useCallback(async () => {
        if (!Te) {
          Ne(!0);
          try {
            iJ(), await p(), ve(He => He + 1);
          } finally {
            Ne(!1);
          }
        }
      }, [p, Te]),
      Me = g.useMemo(() => n.find(He => He.id === W) ?? null, [n, W]);
    g.useEffect(() => {
      if (!Me) {
        ne(null);
        return;
      }
      ne({
        ...Me
      });
    }, [Me]), g.useEffect(() => {
      const He = () => {
        iJ(), ve(Ve => Ve + 1);
      };
      return window.addEventListener(p1t, He), () => window.removeEventListener(p1t, He);
    }, []), g.useEffect(() => {
      Z(!1), fe(null);
    }, [W]), g.useEffect(() => {
      if (!ye) return;
      be(ye.initialValue);
      const He = window.setTimeout(() => {
        var Ve;
        return (Ve = Ee.current) == null ? void 0 : Ve.focus();
      }, 0);
      return () => window.clearTimeout(He);
    }, [ye]), g.useEffect(() => {
      if (!e) return;
      const He = document.activeElement,
        Ve = requestAnimationFrame(() => {
          var it;
          return (it = me.current) == null ? void 0 : it.focus();
        });
      return () => {
        cancelAnimationFrame(Ve), He != null && He.isConnected && He.focus({
          preventScroll: !0
        });
      };
    }, [e]), g.useEffect(() => {
      if (!e || !(W || de || xe || ye)) return;
      const He = document.activeElement,
        Ve = requestAnimationFrame(() => {
          var It, Ft, We;
          const it = (It = me.current) == null ? void 0 : It.querySelectorAll('[role="dialog"]');
          (We = (Ft = it == null ? void 0 : it[it.length - 1]) == null ? void 0 : Ft.querySelector("input, button")) == null || We.focus({
            preventScroll: !0
          });
        });
      return () => {
        cancelAnimationFrame(Ve), He != null && He.isConnected && He.focus({
          preventScroll: !0
        });
      };
    }, [e, W, de, xe, ye]);
    const Re = g.useMemo(() => u6a(r), [r]),
      $e = g.useMemo(() => j6a(r), [r]);
    g.useEffect(() => {
      $e.has(L) || D(qve);
    }, [$e, L]);
    const rt = g.useMemo(() => n.filter(He => DYn(He, L) && R6a(He, Y) && N6a(He, U)), [n, L, Y, U]),
      nt = He => {
        const Ve = i.includes(He) ? i.filter(it => it !== He) : [...i, He];
        w(Ve);
      },
      ze = (He, Ve = 0) => He.map(it => {
        var Ge;
        const It = !!((Ge = it.children) != null && Ge.length),
          Ft = !i.includes(it.id),
          We = L === it.name,
          Ze = it.id === "all-roles" || it.name === qve;
        return c.jsxs("div", {
          className: "select-none",
          children: [c.jsxs("div", {
            className: `ai-role-library-category group flex items-center gap-0.5 rounded-lg border border-transparent py-1 pl-1 pr-0.5 ${We ? t ? "bg-white/10 text-white" : "bg-zinc-200 text-zinc-900" : t ? "text-white/55 hover:bg-white/[0.06] hover:text-white/80" : "hover:bg-zinc-200"}`,
            style: {
              marginLeft: Ve * 10
            },
            children: [c.jsxs("button", {
              type: "button",
              "aria-current": We ? "page" : void 0,
              title: b1t(it.name),
              className: "flex min-w-0 flex-1 items-center gap-1 rounded-lg px-1 py-0.5 text-left text-sm",
              onClick: () => {
                It && nt(it.id), D(it.name);
              },
              children: [It ? c.jsx("span", {
                className: "w-4 shrink-0 text-[10px] text-zinc-500",
                children: Ft ? "▾" : "▸"
              }) : c.jsx("span", {
                className: "w-4 shrink-0"
              }), c.jsx("span", {
                className: "truncate",
                children: b1t(it.name)
              })]
            }), !Ze && c.jsxs("div", {
              className: `relative z-10 flex shrink-0 items-center gap-0.5 pr-1 pointer-events-none opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100 ${t ? "text-zinc-400" : "text-zinc-600"}`,
              children: [c.jsx("button", {
                type: "button",
                title: x("添加子分类"),
                className: "rounded p-1 hover:bg-zinc-700/80",
                onMouseDown: Oe => Oe.preventDefault(),
                onClick: Oe => {
                  Oe.preventDefault(), Oe.stopPropagation(), ie({
                    title: "子分类名称",
                    initialValue: "",
                    onConfirm: st => {
                      const vt = st.trim();
                      vt && P(it.id, vt);
                    }
                  });
                },
                children: c.jsx(eo, {
                  size: 13
                })
              }), c.jsx("button", {
                type: "button",
                title: x("重命名"),
                className: "rounded p-1 hover:bg-zinc-700/80",
                onMouseDown: Oe => Oe.preventDefault(),
                onClick: Oe => {
                  Oe.preventDefault(), Oe.stopPropagation(), ie({
                    title: "新名称",
                    initialValue: it.name,
                    onConfirm: st => {
                      const vt = st.trim();
                      vt && T(it.id, vt);
                    }
                  });
                },
                children: c.jsx(nw, {
                  size: 13
                })
              }), c.jsx("button", {
                type: "button",
                title: x("删除此分类"),
                className: "rounded p-1 text-red-400/90 hover:bg-red-950/50 hover:text-red-300",
                onMouseDown: Oe => Oe.preventDefault(),
                onClick: Oe => {
                  var vt;
                  Oe.preventDefault(), Oe.stopPropagation();
                  const st = !!((vt = it.children) != null && vt.length);
                  he({
                    title: "删除分类",
                    message: st ? `确定删除「${it.name}」及其下所有子分类？使用其中任一路径的资源将归入『全部资源』列表展示。` : `确定删除「${it.name}」？使用该路径的资源将归入『全部资源』列表展示。`,
                    onConfirm: () => j(it.id)
                  });
                },
                children: c.jsx(Qo, {
                  size: 13
                })
              })]
            })]
          }), It && Ft && c.jsx("div", {
            className: "mt-0.5",
            children: ze(it.children, Ve + 1)
          })]
        }, it.id);
      }),
      Le = g.useCallback(() => we(null), []),
      Ke = async () => {
        if (!q) return;
        const He = q.categoryPath.join("/"),
          it = Re.some(It => It.join("/") === He) ? q.categoryPath : Re[0] ?? q.categoryPath;
        try {
          await y(q.id, {
            name: q.name,
            categoryPath: it,
            tags: q.tags,
            attributes: q.attributes,
            description: q.description,
            demeanorPrompt: q.demeanorPrompt,
            costumePrompt: q.costumePrompt,
            assets: q.assets
          }), M == null || M();
        } catch {}
      },
      Xe = () => {
        if (W) {
          Q(null);
          return;
        }
        u();
      };
    if (!e) return null;
    const De = t ? "border-zinc-700 bg-[#141416] text-zinc-100" : "border-zinc-200 bg-white text-zinc-900";
    return c.jsx("div", {
      className: `ai-role-library-overlay pose-wall-overlay ${t ? "pose-wall-dark" : "pose-wall-light"}`,
      onMouseDown: He => {
        He.target === He.currentTarget && !de && !xe && !ye && Xe();
      },
      onKeyDown: He => {
        var Ve;
        if (He.stopPropagation(), He.key === "Escape" && (He.preventDefault(), ye ? ie(null) : xe ? he(null) : de ? le(!1) : re ? fe(null) : X ? Z(!1) : W ? Q(null) : ce ? we(null) : u()), He.key === "Tab") {
          const it = (Ve = me.current) == null ? void 0 : Ve.querySelectorAll('[role="dialog"]'),
            It = it != null && it.length ? it[it.length - 1] : me.current,
            Ft = [...((It == null ? void 0 : It.querySelectorAll('button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled), [tabindex="0"]')) ?? [])].filter(Ge => !Ge.closest("[inert]") && Ge.getClientRects().length),
            We = Ft[0],
            Ze = Ft[Ft.length - 1];
          He.shiftKey && (document.activeElement === We || document.activeElement === It) ? (He.preventDefault(), Ze == null || Ze.focus()) : !He.shiftKey && document.activeElement === Ze && (He.preventDefault(), We == null || We.focus());
        }
      },
      children: c.jsxs("div", {
        ref: me,
        className: "pose-wall-dialog ai-role-library-dialog",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "ai-role-library-title",
        tabIndex: -1,
        children: [c.jsxs("div", {
          className: "ai-role-library-content",
          ...(W || de || xe || ye ? {
            inert: ""
          } : {}),
          children: [c.jsxs("header", {
            className: "pose-wall-header ai-role-library-header",
            children: [c.jsxs("div", {
              className: "ai-role-library-titlebar",
              children: [h && c.jsx("button", {
                type: "button",
                className: "pose-wall-icon",
                title: x("返回"),
                "aria-label": x("返回素材库"),
                onClick: h,
                children: c.jsx(Mf, {
                  size: 18
                })
              }), c.jsx("div", {
                className: "pose-wall-heading",
                children: c.jsx("h2", {
                  id: "ai-role-library-title",
                  children: x("资源库")
                })
              })]
            }), c.jsxs("div", {
              className: "ai-role-library-header-actions",
              children: [c.jsxs("button", {
                type: "button",
                className: "ai-role-library-action ai-role-library-action-primary",
                onClick: () => void m().catch(He => console.warn(He)),
                children: [c.jsx(ml, {
                  size: 14
                }), x("导入图片新建")]
              }), c.jsxs("button", {
                type: "button",
                className: "ai-role-library-action",
                onClick: () => {
                  le(!0), pe(new Set());
                },
                children: [c.jsx(eo, {
                  size: 14
                }), x(" 绑定已有素材")]
              }), c.jsx("button", {
                type: "button",
                className: "pose-wall-icon",
                title: x("重新加载素材与资源（清除预览缓存）"),
                disabled: Te || s,
                onClick: () => void Fe(),
                children: c.jsx(bd, {
                  size: 18,
                  className: Te || s ? "animate-spin" : ""
                })
              }), c.jsx("button", {
                type: "button",
                className: "pose-wall-icon",
                onClick: Xe,
                "aria-label": x("关闭资源库"),
                title: x("关闭 · Esc"),
                children: c.jsx(Na, {
                  size: 18
                })
              })]
            })]
          }), c.jsxs("div", {
            className: "pose-wall-body",
            children: [c.jsxs("aside", {
              className: "pose-wall-sidebar ai-role-library-sidebar",
              children: [c.jsxs("div", {
                className: "mb-2 flex items-center justify-between px-1 text-sm font-medium",
                children: [c.jsx("span", {
                  className: t ? "text-white/55" : "",
                  children: x("分类目录")
                }), c.jsxs("div", {
                  className: "flex items-center gap-0.5",
                  children: [c.jsx("button", {
                    type: "button",
                    className: "rounded p-1 hover:bg-zinc-800/50",
                    title: x("添加一级分类（与「古代历史」同级）"),
                    onMouseDown: He => He.preventDefault(),
                    onClick: () => {
                      ie({
                        title: "新的一级分类名称",
                        initialValue: "",
                        onConfirm: He => {
                          const Ve = He.trim();
                          Ve && R(Ve);
                        }
                      });
                    },
                    children: c.jsx(eo, {
                      size: 14
                    })
                  }), c.jsx("button", {
                    type: "button",
                    className: "rounded p-1 hover:bg-zinc-800/50",
                    title: x("恢复默认分类树"),
                    onClick: () => {
                      window.confirm(x("恢复默认分类？将覆盖当前分类树（资源条目分类路径需自行检查）。")) && v(ODt);
                    },
                    children: c.jsx(vd, {
                      size: 14
                    })
                  })]
                })]
              }), c.jsx("div", {
                className: "pose-wall-folders pose-wall-scroll space-y-0.5 pr-1 custom-scrollbar",
                children: ze(r)
              })]
            }), c.jsxs("main", {
              className: "pose-wall-main ai-role-library-main",
              children: [c.jsx("div", {
                className: "pose-wall-toolbar",
                children: c.jsxs("label", {
                  className: "pose-wall-search",
                  children: [c.jsx(mc, {
                    size: 16,
                    className: "shrink-0 opacity-50"
                  }), c.jsx("input", {
                    value: Y,
                    onChange: He => K(He.target.value),
                    placeholder: x("搜索资源名称、标签或属性…"),
                    "aria-label": x("搜索资源"),
                    className: "min-w-0 flex-1 bg-transparent text-sm outline-none"
                  })]
                })
              }), c.jsxs("div", {
                className: "ai-role-library-filters relative mb-4 flex flex-wrap gap-2",
                ref: _e,
                onMouseLeave: () => Le(),
                children: [NYn.map(He => {
                  var Ft;
                  const Ve = a.find(We => We.key === He),
                    it = (Ve == null ? void 0 : Ve.values) ?? [],
                    It = (Ft = U[He]) == null ? void 0 : Ft.length;
                  return c.jsxs("div", {
                    className: "relative",
                    children: [c.jsxs("button", {
                      type: "button",
                      className: `ai-role-library-filter-button rounded-lg px-3 py-1 text-xs font-medium ${ce === He ? V : O}`,
                      "aria-expanded": ce === He,
                      "aria-pressed": !!It,
                      onClick: () => we(We => We === He ? null : He),
                      children: ["+ ", He, It ? ` (${It})` : ""]
                    }), ce === He && c.jsxs("div", {
                      className: `absolute left-0 top-full z-20 mt-1 min-w-[200px] rounded-xl border p-2 shadow-xl ${t ? "border-zinc-800 bg-[#202023]" : "border-zinc-200 bg-white"}`,
                      children: [it.map(We => {
                        var Ge;
                        const Ze = ((Ge = U[He]) == null ? void 0 : Ge.includes(We)) ?? !1;
                        return c.jsxs("div", {
                          className: "group flex items-center gap-0.5 rounded-lg pr-1 hover:bg-zinc-800/60",
                          children: [c.jsxs("label", {
                            className: "flex min-w-0 flex-1 cursor-pointer items-center gap-2 px-2 py-1.5 text-sm",
                            children: [c.jsx("input", {
                              type: "checkbox",
                              checked: Ze,
                              onChange: () => {
                                H(Oe => {
                                  const st = new Set(Oe[He] || []);
                                  return st.has(We) ? st.delete(We) : st.add(We), {
                                    ...Oe,
                                    [He]: Array.from(st)
                                  };
                                });
                              }
                            }), c.jsx("span", {
                              className: "truncate",
                              children: We
                            })]
                          }), c.jsx("button", {
                            type: "button",
                            title: x("重命名选项"),
                            className: "shrink-0 rounded p-1 text-zinc-500 opacity-70 hover:bg-zinc-800 hover:text-zinc-200 group-hover:opacity-100",
                            onMouseDown: Oe => Oe.preventDefault(),
                            onClick: Oe => {
                              Oe.stopPropagation(), ie({
                                title: "修改选项名称",
                                initialValue: We,
                                onConfirm: st => {
                                  const vt = st.trim();
                                  !vt || vt === We || (B(He, We, vt), H(Ht => ({
                                    ...Ht,
                                    [He]: (Ht[He] || []).map(nn => nn === We ? vt : nn)
                                  })));
                                }
                              });
                            },
                            children: c.jsx(nw, {
                              size: 12
                            })
                          }), c.jsx("button", {
                            type: "button",
                            title: x("删除此筛选项"),
                            className: "shrink-0 rounded p-1 text-red-400/80 opacity-70 hover:bg-red-950/40 hover:text-red-300 group-hover:opacity-100",
                            onMouseDown: Oe => Oe.preventDefault(),
                            onClick: Oe => {
                              Oe.stopPropagation(), F(He, We), H(st => {
                                const vt = (st[He] || []).filter(nn => nn !== We),
                                  Ht = {
                                    ...st
                                  };
                                return vt.length ? Ht[He] = vt : delete Ht[He], Ht;
                              });
                            },
                            children: c.jsx(Qo, {
                              size: 12
                            })
                          })]
                        }, We);
                      }), c.jsx("div", {
                        className: `my-2 border-t ${t ? "border-zinc-700" : "border-zinc-200"}`
                      }), c.jsxs("div", {
                        className: "flex gap-2",
                        children: [c.jsx("input", {
                          value: ue[He] || "",
                          onChange: We => ge(Ze => ({
                            ...Ze,
                            [He]: We.target.value
                          })),
                          placeholder: x("添加{0}", He),
                          className: `min-w-0 flex-1 rounded-lg border px-2 py-1 text-xs ${t ? "border-zinc-700 bg-zinc-900" : "border-zinc-300 bg-zinc-50"}`
                        }), c.jsx("button", {
                          type: "button",
                          className: `shrink-0 rounded-lg px-2 py-1 text-xs ${V}`,
                          onClick: () => {
                            const We = (ue[He] || "").trim();
                            if (!We) return;
                            const Ze = a.map(Ge => Ge.key === He ? {
                              ...Ge,
                              values: [...new Set([...Ge.values, We])]
                            } : Ge);
                            a.some(Ge => Ge.key === He) || Ze.push({
                              key: He,
                              values: [We]
                            }), _(Ze), ge(Ge => ({
                              ...Ge,
                              [He]: ""
                            }));
                          },
                          children: x("添加")
                        })]
                      })]
                    })]
                  }, He);
                }), c.jsx("button", {
                  type: "button",
                  className: `ai-role-library-filter-button rounded-lg px-3 py-1 text-xs font-medium ${O}`,
                  onMouseDown: He => He.preventDefault(),
                  onClick: () => {
                    ie({
                      title: "新筛选维度名称（将出现在详情属性中）",
                      initialValue: "",
                      onConfirm: He => {
                        const Ve = He.trim();
                        Ve && N(Ve, []);
                      }
                    });
                  },
                  children: x("+ 维度")
                })]
              }), d && c.jsx("div", {
                className: "mb-2 text-sm text-red-400",
                children: d
              }), s ? c.jsxs("div", {
                className: "flex flex-1 items-center justify-center gap-2 text-zinc-500",
                children: [c.jsx(Ua, {
                  className: "animate-spin",
                  size: 20
                }), x("加载中…")]
              }) : c.jsxs("div", {
                ref: Ae,
                className: "ai-role-library-grid pose-wall-scroll custom-scrollbar",
                children: [rt.map(He => {
                  const Ve = Wve(He);
                  return c.jsxs("div", {
                    className: "group/item min-w-0",
                    children: [c.jsxs("div", {
                      role: "button",
                      tabIndex: 0,
                      onClick: () => Q(He.id),
                      onKeyDown: it => {
                        it.target === it.currentTarget && (it.key === "Enter" || it.key === " ") && (it.preventDefault(), Q(He.id));
                      },
                      "aria-label": x("查看资源 {0}", He.name),
                      className: `relative isolate aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-lg border text-left ${t ? "border-white/[0.08] bg-white/[0.04] hover:border-white/25" : "border-zinc-200 bg-zinc-100 hover:border-zinc-400"}`,
                      children: [Ve ? c.jsx(tXe, {
                        cacheKey: Ve.path,
                        reloadEpoch: ke,
                        load: () => k(Ve),
                        loadFallback: A ? () => A(Ve) : void 0,
                        alt: He.name,
                        className: "h-full w-full object-cover",
                        lazyLoad: !0,
                        scrollRootRef: Ae
                      }) : c.jsxs("div", {
                        className: "flex h-full flex-col items-center justify-center gap-1 text-white/15",
                        children: [c.jsx("span", {
                          className: "text-xl",
                          children: "◼"
                        }), c.jsx(lo, {
                          size: 18
                        })]
                      }), c.jsx("div", {
                        className: "pointer-events-none absolute inset-x-0 bottom-0 truncate px-2 py-1.5 text-left text-xs text-white/85",
                        title: He.name,
                        style: {
                          background: "linear-gradient(transparent, rgba(0,0,0,0.55))"
                        },
                        children: He.name
                      }), c.jsx("div", {
                        className: "absolute left-2 top-2 z-[2] flex items-center gap-0.5 rounded-[10px] bg-black/50 px-0.5 py-0.5 opacity-0 pointer-events-none transition-opacity duration-300 group-hover/item:opacity-100 group-hover/item:pointer-events-auto",
                        children: c.jsx("button", {
                          type: "button",
                          title: x("添加到画布"),
                          className: "flex h-6 w-6 items-center justify-center rounded-md text-white/85 hover:text-white",
                          onClick: it => {
                            it.stopPropagation(), E(He);
                          },
                          children: c.jsx(eo, {
                            size: 13
                          })
                        })
                      })]
                    }), c.jsx("div", {
                      className: `mt-1.5 truncate px-0.5 text-[11px] ${z}`,
                      children: v1t(He.categoryPath)
                    })]
                  }, He.id);
                }), !rt.length && c.jsxs("div", {
                  className: "pose-wall-empty ai-role-library-empty",
                  children: [c.jsx(lo, {
                    size: 36
                  }), c.jsx("h3", {
                    children: n.length ? x("没有匹配的资源") : x("将素材整理到资源库")
                  }), c.jsx("p", {
                    children: n.length ? x("试试其他分类、筛选条件或搜索词。") : x("导入图片或绑定已有素材，开始整理资源。")
                  })]
                })]
              }), c.jsxs("footer", {
                className: "pose-wall-footer",
                children: [c.jsxs("span", {
                  children: [rt.length, x(" 项资源")]
                }), c.jsx("span", {
                  children: x("点击查看详情 · 添加到画布")
                })]
              })]
            })]
          })]
        }), W && q && c.jsx(B6a, {
          isDark: t,
          panelClass: G,
          subtleText: z,
          selectedChip: V,
          draft: q,
          setDraft: ne,
          categoryLeaves: Re,
          categorySelectOpen: X,
          setCategorySelectOpen: Z,
          attributePickKey: re,
          setAttributePickKey: fe,
          filterOptions: a,
          getAssetPreviewUrl: k,
          getAssetPreviewFallbackUrl: A,
          getAssetOriginalPreviewUrl: S,
          neighborIds: {
            prev: ((Ye = rt[rt.findIndex(He => He.id === q.id) - 1]) == null ? void 0 : Ye.id) ?? null,
            next: ((Ce = rt[rt.findIndex(He => He.id === q.id) + 1]) == null ? void 0 : Ce.id) ?? null
          },
          onSelectRole: Q,
          onBack: () => Q(null),
          onHeaderClose: Xe,
          onSave: () => {
            Ke();
          },
          onApply: () => void E(q),
          onDelete: () => {
            b(q.id), Q(null);
          },
          saving: l,
          previewReloadEpoch: ke
        }), de && c.jsx(L6a, {
          isDark: t,
          panelClass: G,
          imageAssets: o,
          previewReloadEpoch: ke,
          pickerSel: J,
          setPickerSel: pe,
          getMaterialAssetPreviewUrl: C,
          getMaterialAssetPreviewFallbackUrl: I,
          onClose: () => le(!1),
          onConfirm: () => {
            const He = o.filter(Ve => J.has(Ve.path));
            f(He), le(!1), pe(new Set());
          }
        }), xe && c.jsx("div", {
          className: "absolute inset-0 z-[112] flex items-center justify-center bg-black/60 p-4",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": "ai-role-confirm-title",
          onMouseDown: He => {
            He.target === He.currentTarget && he(null);
          },
          children: c.jsxs("div", {
            className: `w-full max-w-md rounded-2xl border p-5 shadow-xl ${De}`,
            onMouseDown: He => He.stopPropagation(),
            children: [c.jsx("h2", {
              id: "ai-role-confirm-title",
              className: "text-base font-semibold",
              children: xe.title
            }), c.jsx("p", {
              className: `mt-2 text-sm leading-relaxed ${z}`,
              children: xe.message
            }), c.jsxs("div", {
              className: "mt-5 flex justify-end gap-2",
              children: [c.jsx("button", {
                type: "button",
                className: `rounded-xl px-3 py-1.5 text-sm ${t ? "hover:bg-zinc-800" : "hover:bg-zinc-100"}`,
                onClick: () => he(null),
                children: x("取消")
              }), c.jsx("button", {
                type: "button",
                className: "rounded-xl bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-500",
                onClick: () => {
                  xe.onConfirm(), he(null);
                },
                children: x("删除")
              })]
            })]
          })
        }), ye && c.jsx("div", {
          className: "absolute inset-0 z-[110] flex items-center justify-center bg-black/60 p-4",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": "ai-role-text-prompt-title",
          onMouseDown: He => {
            He.target === He.currentTarget && ie(null);
          },
          children: c.jsxs("div", {
            className: `w-full max-w-sm rounded-2xl border p-4 shadow-xl ${De}`,
            onMouseDown: He => He.stopPropagation(),
            children: [c.jsx("h2", {
              id: "ai-role-text-prompt-title",
              className: "text-sm font-semibold",
              children: ye.title
            }), c.jsx("input", {
              ref: Ee,
              type: "text",
              value: ae,
              onChange: He => be(He.target.value),
              className: `mt-3 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-500/40 ${t ? "border-zinc-600 bg-zinc-900" : "border-zinc-300 bg-zinc-50"}`,
              onKeyDown: He => {
                He.key === "Enter" && (He.preventDefault(), ye.onConfirm(ae), ie(null));
              }
            }), c.jsxs("div", {
              className: "mt-4 flex justify-end gap-2",
              children: [c.jsx("button", {
                type: "button",
                className: `rounded-xl px-3 py-1.5 text-sm ${t ? "hover:bg-zinc-800" : "hover:bg-zinc-100"}`,
                onClick: () => ie(null),
                children: x("取消")
              }), c.jsx("button", {
                type: "button",
                className: `rounded-xl px-3 py-1.5 text-sm font-medium ${V}`,
                onClick: () => {
                  ye.onConfirm(ae), ie(null);
                },
                children: x("确定")
              })]
            })]
          })
        })]
      })
    });
  },
  L6a = ({
    isDark: e,
    panelClass: t,
    imageAssets: n,
    previewReloadEpoch: r,
    pickerSel: a,
    setPickerSel: i,
    getMaterialAssetPreviewUrl: o,
    getMaterialAssetPreviewFallbackUrl: s,
    onClose: l,
    onConfirm: d
  }) => {
    on();
    const u = g.useRef(null);
    return c.jsx("div", {
      className: "absolute inset-0 z-[100] flex items-center justify-center bg-black/70 p-4",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "ai-role-picker-title",
      children: c.jsxs("div", {
        className: `flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-2xl border ${t}`,
        children: [c.jsxs("div", {
          className: "flex items-start justify-between gap-4 border-b p-4",
          children: [c.jsxs("div", {
            children: [c.jsx("h2", {
              id: "ai-role-picker-title",
              className: "text-lg font-semibold",
              children: x("绑定已有素材图片")
            }), c.jsxs("p", {
              className: "mt-1 text-sm text-zinc-500",
              children: [x("从素材库选择图片，可多选（共 "), n.length, x(" 张）")]
            })]
          }), c.jsx("button", {
            type: "button",
            className: "rounded-lg p-2 hover:bg-zinc-800/60",
            "aria-label": x("关闭绑定素材"),
            onClick: l,
            children: c.jsx(Na, {
              size: 18
            })
          })]
        }), c.jsx("div", {
          ref: u,
          className: "min-h-0 flex-1 overflow-y-auto p-4 custom-scrollbar",
          children: c.jsx("div", {
            className: "grid grid-cols-2 gap-3 sm:grid-cols-3",
            children: n.map(h => c.jsx(O6a, {
              selected: a.has(h.path),
              onToggle: () => i(p => {
                const m = new Set(p);
                return m.has(h.path) ? m.delete(h.path) : m.add(h.path), m;
              }),
              label: LDt(h.name),
              children: c.jsx(tXe, {
                cacheKey: `pick-m-${h.path}`,
                reloadEpoch: r,
                load: () => o(h),
                loadFallback: s ? () => s(h) : void 0,
                alt: h.name,
                className: "h-full w-full object-cover",
                lazyLoad: !0,
                scrollRootRef: u
              })
            }, h.path))
          })
        }), c.jsxs("div", {
          className: "flex items-center justify-between border-t p-4",
          children: [c.jsxs("span", {
            className: "text-sm text-zinc-500",
            children: [x("已选择 "), a.size, x(" 张")]
          }), c.jsx("button", {
            type: "button",
            className: `rounded-xl px-6 py-2 text-sm font-medium ${e ? "bg-zinc-200 text-zinc-900" : "bg-zinc-900 text-white"}`,
            onClick: d,
            children: x("创建资源")
          })]
        })]
      })
    });
  },
  O6a = ({
    selected: e,
    onToggle: t,
    label: n,
    children: r
  }) => (on(), c.jsxs("button", {
    type: "button",
    onClick: t,
    className: `overflow-hidden rounded-xl border-2 text-left transition-colors ${e ? "border-white ring-2 ring-white/30" : "border-zinc-700 hover:border-zinc-500"}`,
    children: [c.jsx("div", {
      className: "aspect-square bg-zinc-950",
      children: r
    }), c.jsx("div", {
      className: "truncate px-2 py-1 text-center text-[11px] text-zinc-400",
      children: n
    })]
  })),
  h6e = ({
    asset: e,
    isDark: t,
    isFocus: n,
    onPick: r,
    getAssetPreviewUrl: a,
    getAssetPreviewFallbackUrl: i,
    previewReloadEpoch: o,
    previewCacheKeyPrefix: s = "dcell",
    buttonClassName: l,
    mediaClassName: d,
    imageClassName: u,
    gridStyle: h,
    overlayLabel: p,
    empty: m
  }) => {
    var b;
    on();
    const f = p || (e ? ((b = jYn.find(v => v.key === e.roleAssetType)) == null ? void 0 : b.label) || "其他" : ""),
      y = n ? t ? "border-white/35 ring-2 ring-white/20" : "border-zinc-500 ring-2 ring-zinc-500/40" : t ? "border-white/[0.08] hover:border-white/20" : "border-zinc-200 hover:border-zinc-400";
    return c.jsxs("button", {
      type: "button",
      style: h,
      disabled: !e,
      className: `relative shrink-0 overflow-hidden rounded-xl border bg-white/[0.04] text-left outline-none ${y} ${l}`,
      onClick: r,
      children: [e && !m ? c.jsx("div", {
        className: `${d}`,
        children: c.jsx(tXe, {
          cacheKey: `${s}-${e.path}`,
          reloadEpoch: o,
          load: () => a(e),
          loadFallback: i ? () => i(e) : void 0,
          alt: "",
          className: `h-full w-full ${u}`
        })
      }) : c.jsxs("div", {
        className: "absolute inset-0 flex flex-col items-center justify-center gap-1 text-white/15",
        children: [c.jsx("span", {
          className: "text-xl",
          children: "◼"
        }), f ? c.jsx("span", {
          className: "text-xs",
          children: x(f)
        }) : null]
      }), f && e && !m && c.jsx("span", {
        className: "pointer-events-none absolute inset-x-0 bottom-0 px-2 py-1 text-right text-xs text-white/55",
        style: {
          background: "linear-gradient(transparent, rgba(0,0,0,0.55))"
        },
        children: x(f)
      })]
    });
  },
  B6a = ({
    isDark: e,
    panelClass: t,
    subtleText: n,
    selectedChip: r,
    draft: a,
    setDraft: i,
    categoryLeaves: o,
    categorySelectOpen: s,
    setCategorySelectOpen: l,
    attributePickKey: d,
    setAttributePickKey: u,
    filterOptions: h,
    getAssetPreviewUrl: p,
    getAssetPreviewFallbackUrl: m,
    getAssetOriginalPreviewUrl: f,
    neighborIds: y,
    onSelectRole: b,
    onBack: v,
    onHeaderClose: _,
    onSave: w,
    onApply: k,
    onDelete: A,
    saving: S,
    previewReloadEpoch: C
  }) => {
    on();
    const [I, E] = g.useState(() => {
        var de;
        const ne = Wve(a) || a.assets[0];
        return (ne == null ? void 0 : ne.id) ?? ((de = a.assets[0]) == null ? void 0 : de.id) ?? null;
      }),
      M = a.assets.map(ne => ne.id).join("|");
    g.useEffect(() => {
      if (!a.assets.length) {
        E(null);
        return;
      }
      E(ne => {
        var le;
        if (ne && a.assets.some(J => J.id === ne)) return ne;
        const de = Wve(a) || a.assets[0];
        return (de == null ? void 0 : de.id) ?? ((le = a.assets[0]) == null ? void 0 : le.id) ?? null;
      });
    }, [a.id, M]);
    const T = a.assets.find(ne => ne.id === I) || Wve(a) || a.assets[0] || null,
      P = g.useMemo(() => M6a(a.assets), [a.assets]),
      R = v1t(a.categoryPath),
      j = f ?? p,
      B = {
        isDark: e,
        getAssetPreviewUrl: j,
        getAssetPreviewFallbackUrl: m,
        previewReloadEpoch: C,
        previewCacheKeyPrefix: "dorig"
      },
      F = e ? "hover:bg-zinc-800/50" : "hover:bg-zinc-100",
      N = e ? "hover:bg-white/10" : "hover:bg-zinc-200",
      G = ne => {
        E(ne.id), l(!1), u(null);
      },
      z = Nat(a.assets, ["main", "detail"]),
      V = Nat(a.assets, ["expression"], !1),
      O = ["front", "side", "back"].map(ne => a.assets.find(de => de.roleAssetType === ne)).filter(ne => !!ne),
      L = O.length >= 2 ? null : Nat(a.assets, ["other"], !1),
      D = new Set([z == null ? void 0 : z.id, V == null ? void 0 : V.id, L == null ? void 0 : L.id, ...O.map(ne => ne.id)].filter(Boolean)),
      U = P.filter(ne => !D.has(ne.id)),
      H = ne => ne ? `size-8 rounded-lg ${e ? "text-white/50 hover:bg-white/10 hover:text-white/85" : "text-zinc-500 hover:bg-zinc-200"}` : `size-8 rounded-lg cursor-default ${e ? "text-white/15" : "text-zinc-300"}`,
      Y = e ? "text-white/80" : "text-zinc-800",
      K = e ? "text-white/45" : "text-zinc-500",
      W = e ? "text-white/85" : "text-zinc-800",
      Q = e ? "text-white/55 placeholder:text-white/25" : "text-zinc-600 placeholder:text-zinc-400",
      q = a.description || [a.demeanorPrompt, a.costumePrompt].filter(Boolean).join(" ");
    return c.jsx("div", {
      className: "absolute inset-0 z-[30] flex items-center justify-center bg-black/55 p-4 backdrop-blur-[10px]",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": x("资源详情"),
      onMouseDown: ne => {
        ne.target === ne.currentTarget && v();
      },
      children: c.jsxs("div", {
        className: `flex max-h-full w-full max-w-[980px] flex-col overflow-hidden rounded-2xl border shadow-2xl ${e ? "border-white/[0.08] bg-[#161618] text-white" : "border-zinc-200 bg-white text-zinc-900"}`,
        onMouseDown: ne => ne.stopPropagation(),
        children: [c.jsxs("header", {
          className: "flex shrink-0 items-center gap-3 px-5 pt-4",
          children: [c.jsxs("div", {
            className: "min-w-0 flex-1",
            children: [c.jsx("input", {
              value: a.name,
              onChange: ne => i(de => de && {
                ...de,
                name: ne.target.value
              }),
              className: `w-full bg-transparent text-[17px] font-semibold tracking-[-0.4px] outline-none ${e ? "text-white/90" : "text-zinc-900"}`
            }), c.jsxs("div", {
              className: "relative mt-0.5",
              children: [c.jsx("button", {
                type: "button",
                className: `max-w-full truncate text-left text-xs ${n}`,
                onClick: () => {
                  l(!s), u(null);
                },
                children: R || x("选择分类")
              }), s && c.jsx("div", {
                className: `absolute left-0 top-full z-20 mt-1 max-h-64 min-w-[220px] overflow-y-auto rounded-xl border p-1 ${e ? "border-white/10 bg-[#101012]" : "border-zinc-200 bg-white"}`,
                children: o.map(ne => {
                  const de = ne.join("/"),
                    le = a.categoryPath.join("/") === de;
                  return c.jsx("button", {
                    type: "button",
                    className: `block w-full truncate rounded-lg px-3 py-2 text-left text-sm ${le ? r : F}`,
                    onClick: () => {
                      i(J => J && {
                        ...J,
                        categoryPath: [...ne]
                      }), l(!1);
                    },
                    children: v1t(ne)
                  }, de);
                })
              })]
            })]
          }), c.jsx("button", {
            type: "button",
            disabled: !y.prev,
            className: H(!!y.prev),
            onClick: () => y.prev && b(y.prev),
            "aria-label": x("上一个"),
            children: "‹"
          }), c.jsx("button", {
            type: "button",
            disabled: !y.next,
            className: H(!!y.next),
            onClick: () => y.next && b(y.next),
            "aria-label": x("下一个"),
            children: "›"
          }), c.jsx("button", {
            type: "button",
            className: `flex size-8 items-center justify-center rounded-lg ${N}`,
            onClick: _,
            "aria-label": x("关闭"),
            children: c.jsx(Na, {
              size: 16
            })
          })]
        }), c.jsxs("div", {
          className: "grid min-h-0 flex-1 grid-cols-1 gap-5 overflow-y-auto px-5 py-4 md:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]",
          children: [c.jsxs("div", {
            className: "grid grid-cols-2 gap-3 content-start",
            children: [c.jsx(h6e, {
              asset: z,
              isFocus: z ? (T == null ? void 0 : T.id) === z.id : !1,
              onPick: () => z && G(z),
              ...B,
              buttonClassName: "aspect-[3/4] w-full",
              mediaClassName: "absolute inset-0",
              imageClassName: "object-cover",
              overlayLabel: "肖像特写",
              empty: !z
            }), c.jsx(h6e, {
              asset: V,
              isFocus: V ? (T == null ? void 0 : T.id) === V.id : !1,
              onPick: () => V && G(V),
              ...B,
              buttonClassName: "aspect-[3/4] w-full",
              mediaClassName: "absolute inset-0",
              imageClassName: "object-cover",
              overlayLabel: "表情九宫格",
              empty: !V
            }), O.length >= 2 ? c.jsxs("div", {
              className: "relative col-span-2 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.04]",
              children: [c.jsx("div", {
                className: "grid aspect-[16/6] grid-cols-3",
                children: O.map(ne => c.jsx("button", {
                  type: "button",
                  className: "relative overflow-hidden",
                  onClick: () => G(ne),
                  children: c.jsx(tXe, {
                    cacheKey: `dorig-${ne.path}`,
                    reloadEpoch: C,
                    load: () => j(ne),
                    loadFallback: m ? () => m(ne) : void 0,
                    alt: "",
                    className: "h-full w-full object-cover"
                  })
                }, ne.id))
              }), c.jsx("span", {
                className: "pointer-events-none absolute inset-x-0 bottom-0 px-2 py-1 text-right text-xs text-white/55",
                style: {
                  background: "linear-gradient(transparent, rgba(0,0,0,0.55))"
                },
                children: x("三视图")
              })]
            }) : c.jsx(h6e, {
              asset: L,
              isFocus: !!(L && (T == null ? void 0 : T.id) === L.id),
              onPick: () => L && G(L),
              ...B,
              buttonClassName: "col-span-2 aspect-[16/6] w-full",
              mediaClassName: "absolute inset-0",
              imageClassName: "object-contain",
              overlayLabel: "三视图",
              empty: !L
            }), U.length > 0 && U.map(ne => c.jsx(h6e, {
              asset: ne,
              isFocus: (T == null ? void 0 : T.id) === ne.id,
              onPick: () => G(ne),
              ...B,
              buttonClassName: "aspect-square w-full",
              mediaClassName: "absolute inset-0",
              imageClassName: "object-cover"
            }, ne.id))]
          }), c.jsxs("div", {
            className: "flex min-h-0 flex-col",
            children: [c.jsx("div", {
              className: `mb-3 text-sm font-medium ${Y}`,
              children: x("角色属性")
            }), c.jsxs("dl", {
              className: "grid grid-cols-2 gap-x-6 gap-y-2 text-[13px]",
              children: [c.jsxs("div", {
                className: "relative col-span-2 flex items-baseline gap-3",
                children: [c.jsx("dt", {
                  className: `w-14 shrink-0 ${K}`,
                  children: x("分类")
                }), c.jsx("dd", {
                  className: `min-w-0 truncate ${W}`,
                  children: R || "—"
                })]
              }), RYn.map(ne => {
                const de = h.find(J => J.key === ne),
                  le = a.attributes[ne] || "";
                return c.jsxs("div", {
                  className: "relative flex items-baseline gap-3",
                  children: [c.jsx("dt", {
                    className: `w-14 shrink-0 ${K}`,
                    children: ne
                  }), c.jsx("dd", {
                    className: "min-w-0 flex-1",
                    children: de && de.values.length ? c.jsxs(c.Fragment, {
                      children: [c.jsx("button", {
                        type: "button",
                        className: `max-w-full truncate text-left ${W} hover:opacity-80`,
                        onClick: () => {
                          u(d === ne ? null : ne), l(!1);
                        },
                        children: le || "—"
                      }), d === ne && c.jsx("div", {
                        className: `absolute left-0 right-0 top-full z-20 mt-1 max-h-40 overflow-y-auto rounded-xl border py-1 ${e ? "border-white/10 bg-[#101012]" : "border-zinc-200 bg-white"}`,
                        children: de.values.map(J => c.jsx("button", {
                          type: "button",
                          className: `block w-full px-3 py-1.5 text-left text-sm ${F}`,
                          onClick: () => {
                            i(pe => pe && {
                              ...pe,
                              attributes: {
                                ...pe.attributes,
                                [ne]: J
                              }
                            }), u(null);
                          },
                          children: J
                        }, J))
                      })]
                    }) : c.jsx("input", {
                      value: le,
                      placeholder: "—",
                      onChange: J => i(pe => pe && {
                        ...pe,
                        attributes: {
                          ...pe.attributes,
                          [ne]: J.target.value
                        }
                      }),
                      className: `w-full bg-transparent outline-none placeholder:opacity-40 ${W}`
                    })
                  })]
                }, ne);
              })]
            }), c.jsx("div", {
              className: `mt-4 text-sm font-medium ${Y}`,
              children: x("识别特征")
            }), c.jsx("textarea", {
              value: q,
              onChange: ne => i(de => de && {
                ...de,
                description: ne.target.value
              }),
              rows: 5,
              placeholder: x("外貌、神态、着装等识别特征"),
              className: `mt-1 w-full resize-none bg-transparent text-[13px] leading-6 outline-none ${Q}`
            }), c.jsxs("div", {
              className: "mt-auto flex items-center justify-end gap-2 pt-5",
              children: [c.jsx("button", {
                type: "button",
                className: "rounded-full p-2 text-red-400/80 hover:bg-red-500/10",
                onClick: A,
                "aria-label": x("删除"),
                children: c.jsx(Qo, {
                  size: 15
                })
              }), c.jsx("button", {
                type: "button",
                disabled: S,
                className: `rounded-full px-3 py-1.5 text-xs ${e ? "text-white/45 hover:text-white/80" : "text-zinc-500"}`,
                onClick: w,
                children: x("保存")
              }), c.jsx("button", {
                type: "button",
                className: "h-10 min-w-[168px] rounded-full bg-[#2a2a2c] px-8 text-sm font-medium text-white hover:bg-[#333]",
                onClick: k,
                children: x("应用到画布")
              })]
            })]
          })]
        })]
      })
    });
  },
  F6a = Object.freeze(Object.defineProperty({
    __proto__: null,
    ASSET_TYPE_OPTIONS: jYn,
    AiRoleLibraryFullscreen: D6a,
    DETAIL_ATTRIBUTE_KEYS: RYn,
    TOP_FILTER_KEYS: NYn,
    clearAllMaterialPreviewCache: iJ,
    invalidateMaterialPreviewCache: BDt,
    roleMatchesCategory: DYn
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  z6a = ({
    asset: e,
    depth: t,
    isDark: n,
    getPreviewUrl: r
  }) => {
    on();
    const [a, i] = g.useState(null);
    return g.useEffect(() => {
      if (e.kind !== "image" && e.kind !== "video") return;
      let o = !1;
      return r(e).then(s => {
        o || i(s);
      }), () => {
        o = !0;
      };
    }, [e, r]), c.jsxs("div", {
      className: `flex items-center gap-2 px-2 py-1 rounded-lg ${n ? "text-zinc-300" : "text-zinc-700"}`,
      style: {
        paddingLeft: `${16 + t * 16}px`
      },
      children: [c.jsx("div", {
        className: `relative h-7 w-7 shrink-0 overflow-hidden rounded ${n ? "bg-zinc-800" : "bg-zinc-200"}`,
        children: e.kind === "video" && a ? c.jsxs(c.Fragment, {
          children: [c.jsx("video", {
            src: a,
            className: "h-full w-full object-cover",
            muted: !0,
            playsInline: !0,
            preload: "metadata"
          }), c.jsx("div", {
            className: "pointer-events-none absolute inset-0 flex items-center justify-center bg-black/35",
            children: c.jsx(Ol, {
              size: 10,
              className: "text-white drop-shadow",
              fill: "currentColor"
            })
          })]
        }) : e.kind === "image" && a ? c.jsx("img", {
          src: a,
          alt: "",
          className: "h-full w-full object-cover"
        }) : e.kind === "audio" ? c.jsx("div", {
          className: "flex h-full w-full items-center justify-center",
          children: c.jsx(dEt, {
            size: 14,
            className: n ? "text-zinc-400" : "text-zinc-500"
          })
        }) : e.kind === "video" ? c.jsx("div", {
          className: "flex h-full w-full items-center justify-center",
          children: c.jsx(JEn, {
            size: 14,
            className: n ? "text-zinc-400" : "text-zinc-500"
          })
        }) : c.jsx("div", {
          className: "flex h-full w-full items-center justify-center",
          children: c.jsx(lo, {
            size: 14,
            className: n ? "text-zinc-400" : "text-zinc-500"
          })
        })
      }), c.jsx("span", {
        className: "min-w-0 flex-1 truncate text-xs",
        children: e.name
      })]
    });
  },
  onn = ({
    isOpen: e,
    isDark: t,
    rootPath: n,
    tree: r,
    selectedFolderPath: a,
    onClose: i,
    onSelectFolder: o,
    onChooseRoot: s,
    onCreateFolder: l,
    onRenameFolder: d,
    onDeleteFolder: u,
    onConfirm: h,
    getPreviewUrl: p
  }) => {
    on();
    const [m, f] = g.useState(new Set()),
      [y, b] = g.useState(null),
      [v, _] = g.useState(""),
      w = g.useRef(null);
    g.useEffect(() => {
      if (!e || !n) return;
      (async () => {
        var P, R;
        const E = await Ur.loadMaterialLibrarySidebarState(),
          M = (R = (P = E == null ? void 0 : E.roots) == null ? void 0 : P[n]) == null ? void 0 : R.saveModalExpandedPaths;
        if (Array.isArray(M) && M.length > 0) {
          f(new Set(M));
          return;
        }
        const T = new Set();
        for (const j of (r == null ? void 0 : r.children) || []) sYn(j.name) && T.add(j.path);
        f(T);
      })();
    }, [e, n, r == null ? void 0 : r.path, r == null ? void 0 : r.children]), g.useEffect(() => {
      if (!e || !n) return;
      const I = window.setTimeout(async () => {
        const E = (await Ur.loadMaterialLibrarySidebarState()) || {
            version: 1,
            roots: {}
          },
          M = E.roots[n] || {};
        E.roots[n] = {
          ...M,
          saveModalExpandedPaths: Array.from(m),
          updatedAt: new Date().toISOString()
        }, E.updatedAt = new Date().toISOString(), await Ur.saveMaterialLibrarySidebarState(E);
      }, 250);
      return () => window.clearTimeout(I);
    }, [m, e, n]), g.useEffect(() => {
      if (!y) return;
      _(y.mode === "rename" ? y.initialName : "我的文件夹");
      const I = requestAnimationFrame(() => {
        var E;
        return (E = w.current) == null ? void 0 : E.focus();
      });
      return () => cancelAnimationFrame(I);
    }, [y]);
    const k = g.useCallback(async () => {
      if (!y) return;
      const I = v.trim();
      if (!I) {
        b(null);
        return;
      }
      y.mode === "create" ? await l(y.parentPath, I) : I !== y.initialName && (await d(y.folderPath, I)), b(null);
    }, [v, y, l, d]);
    if (!e) return null;
    const A = I => {
        f(E => {
          const M = new Set(E);
          return M.has(I) ? M.delete(I) : M.add(I), M;
        });
      },
      S = (I, E) => {
        const M = m.has(I.path),
          T = a === I.path;
        return c.jsxs("div", {
          children: [c.jsxs("div", {
            className: `group flex items-center gap-1.5 px-2 py-1.5 rounded-lg cursor-pointer ${T ? t ? "bg-zinc-700/80 text-zinc-100" : "bg-zinc-300/80 text-zinc-900" : t ? "text-zinc-300 hover:bg-zinc-800/70" : "text-zinc-700 hover:bg-zinc-200/60"}`,
            style: {
              paddingLeft: `${8 + E * 16}px`
            },
            onClick: () => o(I.path),
            children: [c.jsx("button", {
              className: `shrink-0 p-0.5 rounded ${t ? "hover:bg-zinc-700" : "hover:bg-zinc-200"}`,
              onClick: P => {
                P.stopPropagation(), A(I.path);
              },
              children: M ? c.jsx(Mi, {
                size: 12
              }) : c.jsx(ss, {
                size: 12
              })
            }), M ? c.jsx(Sc, {
              size: 14
            }) : c.jsx(_h, {
              size: 14
            }), c.jsx("span", {
              className: "text-xs truncate flex-1",
              children: I.name
            }), c.jsx("button", {
              type: "button",
              title: x("在此文件夹下新建"),
              className: `opacity-0 group-hover:opacity-100 shrink-0 rounded px-1 py-0.5 text-[10px] ${t ? "hover:bg-zinc-700 text-zinc-300" : "hover:bg-zinc-300 text-zinc-600"}`,
              onClick: P => {
                P.stopPropagation(), f(R => new Set(R).add(I.path)), b({
                  mode: "create",
                  parentPath: I.path
                });
              },
              children: x("+新建")
            }), c.jsx("button", {
              type: "button",
              title: x("重命名"),
              className: `opacity-0 group-hover:opacity-100 shrink-0 rounded px-1 py-0.5 text-[10px] ${t ? "hover:bg-zinc-700 text-zinc-300" : "hover:bg-zinc-300 text-zinc-600"}`,
              onClick: P => {
                P.stopPropagation(), b({
                  mode: "rename",
                  folderPath: I.path,
                  initialName: I.name
                });
              },
              children: x("改名")
            }), c.jsx("button", {
              type: "button",
              className: `opacity-0 group-hover:opacity-100 text-[10px] px-1.5 py-0.5 rounded ${t ? "hover:bg-zinc-700 text-zinc-400" : "hover:bg-zinc-300 text-zinc-500"}`,
              onClick: async P => {
                P.stopPropagation(), await u(I.path);
              },
              children: x("删")
            })]
          }), M && I.assets.length === 0 && c.jsx("div", {
            className: `text-xs px-2 py-1.5 ${t ? "text-zinc-500" : "text-zinc-400"}`,
            style: {
              paddingLeft: `${30 + E * 16}px`
            },
            children: x("该文件夹暂无素材")
          }), M && I.assets.map(P => p ? c.jsx(z6a, {
            asset: P,
            depth: E,
            isDark: t,
            getPreviewUrl: p
          }, P.path) : c.jsx("div", {
            className: `truncate text-xs px-2 py-1 ${t ? "text-zinc-400" : "text-zinc-600"}`,
            style: {
              paddingLeft: `${24 + E * 16}px`
            },
            children: P.name
          }, P.path)), M && I.children.map(P => S(P, E + 1))]
        }, I.path);
      },
      C = (y == null ? void 0 : y.mode) === "create" ? "新建文件夹" : (y == null ? void 0 : y.mode) === "rename" ? "重命名文件夹" : "";
    return c.jsxs("div", {
      className: "fixed inset-0 z-[120] flex items-center justify-center bg-black/20 backdrop-blur-[1px]",
      children: [c.jsxs("div", {
        className: `w-[400px] max-w-[92vw] max-h-[86vh] rounded-3xl border overflow-hidden ${t ? "bg-zinc-900 border-zinc-700 text-zinc-100" : "bg-[#f5f5f7] border-zinc-200 text-zinc-900"}`,
        children: [c.jsxs("div", {
          className: `h-12 px-4 flex items-center gap-2 border-b ${t ? "border-zinc-800" : "border-zinc-200"}`,
          children: [c.jsx(Sc, {
            size: 16,
            className: t ? "text-zinc-400" : "text-zinc-500"
          }), c.jsx("span", {
            className: "flex-1 text-lg font-semibold leading-none tracking-tight",
            children: x("保存到素材库")
          }), c.jsx("button", {
            type: "button",
            className: `text-sm px-2 py-1 rounded-lg ${t ? "hover:bg-zinc-800 text-zinc-200" : "hover:bg-zinc-200 text-zinc-700"}`,
            onClick: () => {
              if (!(r != null && r.path)) {
                s();
                return;
              }
              b({
                mode: "create",
                parentPath: a || r.path
              });
            },
            children: x("+ 新建文件夹")
          }), c.jsx("button", {
            className: `h-8 w-8 rounded-lg flex items-center justify-center ${t ? "hover:bg-zinc-800" : "hover:bg-zinc-200"}`,
            onClick: i,
            children: c.jsx(Na, {
              size: 16
            })
          })]
        }), !n && c.jsx("div", {
          className: "p-4",
          children: c.jsx("button", {
            className: `w-full text-xs px-3 py-2 rounded-lg border ${t ? "border-zinc-700 hover:bg-zinc-800" : "border-zinc-300 hover:bg-zinc-100"}`,
            onClick: () => void s(),
            children: x("选择素材库根目录")
          })
        }), c.jsx("div", {
          className: "p-4 h-[490px] overflow-y-auto overflow-x-hidden rh-scroll-minimal",
          children: r ? S(r, 0) : c.jsx("div", {
            className: `text-xs ${t ? "text-zinc-500" : "text-zinc-400"}`,
            children: x("暂无素材库目录")
          })
        }), c.jsxs("div", {
          className: `h-20 px-5 flex items-center justify-end gap-2 border-t ${t ? "border-zinc-800" : "border-zinc-200"}`,
          children: [c.jsx("button", {
            className: `h-10 px-5 text-xl rounded-2xl ${t ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-100" : "bg-zinc-200 hover:bg-zinc-300 text-zinc-700"}`,
            onClick: i,
            children: x("取消")
          }), c.jsx("button", {
            className: `h-10 px-5 text-xl rounded-2xl ${t ? "bg-white text-zinc-900 hover:bg-zinc-200" : "bg-zinc-900 text-white hover:bg-black"}`,
            onClick: () => a && void h(a),
            children: x("保存")
          })]
        })]
      }), y && c.jsx("div", {
        className: "fixed inset-0 z-[100002] flex items-center justify-center bg-black/50 p-4",
        role: "presentation",
        onMouseDown: I => {
          I.target === I.currentTarget && b(null);
        },
        children: c.jsxs("div", {
          role: "dialog",
          "aria-modal": "true",
          className: `w-full max-w-sm rounded-2xl border p-4 shadow-2xl ${t ? "border-zinc-600 bg-[#141416] text-zinc-100" : "border-zinc-200 bg-white text-zinc-900"}`,
          onMouseDown: I => I.stopPropagation(),
          children: [c.jsx("div", {
            className: "mb-3 text-sm font-semibold",
            children: x(C)
          }), c.jsx("input", {
            ref: w,
            value: v,
            onChange: I => _(I.target.value),
            onKeyDown: I => {
              I.key === "Enter" && k(), I.key === "Escape" && b(null);
            },
            className: `mb-4 w-full rounded-xl border px-3 py-2 text-sm outline-none ${t ? "border-zinc-600 bg-zinc-900 text-zinc-100" : "border-zinc-300 bg-zinc-50 text-zinc-900"}`,
            placeholder: x("文件夹名称")
          }), c.jsxs("div", {
            className: "flex justify-end gap-2",
            children: [c.jsx("button", {
              type: "button",
              className: `rounded-xl px-4 py-2 text-sm ${t ? "bg-zinc-800 text-zinc-200 hover:bg-zinc-700" : "bg-zinc-200 text-zinc-800 hover:bg-zinc-300"}`,
              onClick: () => b(null),
              children: x("取消")
            }), c.jsx("button", {
              type: "button",
              className: `rounded-xl px-4 py-2 text-sm font-medium ${t ? "bg-white text-zinc-900 hover:bg-zinc-200" : "bg-zinc-900 text-white hover:bg-black"}`,
              onClick: () => void k(),
              children: x("确定")
            })]
          })]
        })
      })]
    });
  },
  U6a = Object.freeze(Object.defineProperty({
    __proto__: null,
    SaveToMaterialLibraryModal: onn,
    default: onn
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  $6a = {
    auto: ["sora-2-pro-fal", "sora-2-fal", "sora-2-pro", "sora-2"],
    fal: ["sora-2-pro-fal", "sora-2-fal", "sora-2-pro", "sora-2"],
    comfly: ["sora-2-pro", "sora-2", "sora-2-pro-fal", "sora-2-fal"]
  };

function LYn(e, t = "auto") {
  for (const n of $6a[t]) {
    const r = e.find(a => a.type === "Video" && a.id === n);
    if (r) return {
      config: r,
      isFal: n.endsWith("-fal")
    };
  }
  return null;
}

function snn(e) {
  return /fal-ai\/sora-2\/characters/i.test(e);
}

function OYn(e, t, n) {
  const r = String(n || "").trim();
  if (r) return r;
  const a = (e || "https://ai.comfly.org").replace(/\/+$/, "");
  return t ? v9n(a) : `${a}/sora/v1/characters`;
}

function BYn(e) {
  const t = String(e.id || "").trim(),
    n = String(e.name || e.username || "").trim();
  if (!t || !n) return null;
  const r = String(e.profile_picture_url || "");
  return {
    id: t,
    name: n,
    imageUrl: r
  };
}

