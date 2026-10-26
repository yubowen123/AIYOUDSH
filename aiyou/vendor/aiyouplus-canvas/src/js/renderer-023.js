function Cno(e) {
  const t = {
    size: e.size,
    enable_interleave: e.enableInterleave,
    watermark: !1
  };
  return e.enableInterleave ? (t.n = 1, t.max_images = e.maxImages ?? 5, e.useStream && (t.stream = !0)) : (t.prompt_extend = e.promptExtend ?? !0, t.n = e.imageCount ?? 4), e.negativePrompt && (t.negative_prompt = e.negativePrompt), e.seed !== void 0 && e.seed !== null && (t.seed = e.seed), t;
}

function Eno(e) {
  const t = [{
    text: e.prompt
  }, ...(e.images || []).map(n => ({
    image: n
  }))];
  return {
    model: e.model,
    input: {
      messages: [{
        role: "user",
        content: t
      }]
    },
    parameters: e.parameters
  };
}

const Tno = "gemini-3.1-flash-image-preview",
  Mno = 14,
  Pno = "gemini-2.5-flash-image-official";

function Rno(e) {
  return e === "Auto" ? "1:1" : e;
}

function Nno(e) {
  return e === "4K" ? "4K" : e === "2K" ? "2K" : e === "1K" ? "1K" : e === "512px" ? "512" : "2K";
}

function jno(e) {
  return e === Pno;
}

function Dno(e) {
  return !e.hasReferenceImage || e.refImages.length === 0 ? [] : e.refImages.slice(0, e.maxRefs);
}

function Lno(e) {
  const t = e.indexOf(","),
    n = t >= 0 ? e.slice(t + 1).trim() : e;
  let r = "image/png";
  if (e.startsWith("data:")) {
    const a = e.match(/data:([^;]+)/);
    a && (r = a[1]);
  }
  return {
    inline_data: {
      mime_type: r,
      data: n
    }
  };
}

function Ono(e) {
  if (!KM(e.currentModel)) return null;
  const t = e.modelName || Tno;
  return {
    endpoint: `${e.baseUrl.replace(/\/+$/, "")}/v1beta/models/${t}:generateContent`,
    model: t,
    aspectRatio: Rno(e.ratio),
    imageSize: Nno(e.resolution),
    includeImageSize: !jno(e.currentModel),
    maxRefs: Mno
  };
}

function Bno(e) {
  const t = [{
      text: e.prompt
    }, ...(e.inlineDataParts || [])],
    n = e.includeImageSize ? {
      aspectRatio: e.aspectRatio,
      imageSize: e.imageSize
    } : {
      aspectRatio: e.aspectRatio
    };
  return {
    contents: [{
      role: "user",
      parts: t
    }],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"],
      imageConfig: n
    }
  };
}

const Fno = 14,
  zno = 10,
  Uno = 2048,
  $no = 1536;

function Gno(e, t) {
  return t ? e : e.length === 1 ? e[0] : e;
}

function Blt(e) {
  return !e.hasReferenceImage || e.refImages.length === 0 ? [] : e.refImages.slice(0, e.maxRefs);
}

function Vno(e) {
  if (!mX(e.currentModel)) return null;
  const t = oIe(e.currentModel),
    n = pPt(e.currentModel),
    r = bjn(e.currentModel, e.ratio, e.resolution, {
      hasReferenceImage: e.hasReferenceImage
    });
  return {
    endpoint: `${e.baseUrl.replace(/\/+$/, "")}${t ? "/v1/images/generations" : "/api/v3/images/generations"}`,
    isApiVersion: t,
    model: e.modelName || e.currentModel.replace(/-api$/, ""),
    prompt: n ? Ijn(e.prompt, e.ratio, r) : e.prompt.trim(),
    size: r,
    maxRefs: n ? zno : Fno,
    refMaxDim: e.currentModel === "seedream-5.0-api" || n ? $no : Uno,
    omitSequentialImageGeneration: n,
    imageFieldAsArray: Sjn(e.currentModel)
  };
}

function Hno(e) {
  const t = {
    model: e.model,
    prompt: e.prompt,
    size: e.size,
    response_format: "b64_json",
    watermark: !1
  };
  return e.omitSequentialImageGeneration || (t.sequential_image_generation = "disabled"), e.image !== void 0 && (t.image = e.image), t;
}

const Wno = "nano-banana-fast",
  qno = 14,
  Kno = "/v1/draw/nano-banana",
  Qno = "-1";

function Yno(e) {
  return e === "Auto" ? "auto" : e;
}

function Xno(e) {
  return !e.hasReferenceImage || e.refImages.length === 0 ? [] : e.refImages.slice(0, e.maxRefs);
}

function Jno(e) {
  return e === "1K" ? "1K" : e === "4K" ? "4K" : "2K";
}

function Zno(e) {
  return m5(e.currentModel) ? {
    endpoint: `${e.baseUrl.replace(/\/+$/, "")}${Kno}`,
    model: e.modelName || Wno,
    prompt: e.prompt.trim(),
    aspectRatio: Yno(e.ratio),
    imageSize: Jno(e.resolution),
    maxRefs: qno
  } : null;
}

function ero(e) {
  const t = {
    model: e.model,
    prompt: e.prompt,
    aspectRatio: e.aspectRatio,
    imageSize: e.imageSize,
    webHook: Qno,
    shutProgress: !0
  };
  return e.urls && e.urls.length > 0 && (t.urls = e.urls), t;
}

const tro = "生成图片",
  nro = "请参考输入图片生成图片",
  rro = 14,
  aro = 3;

function iro(e) {
  return Up(e) || $S(e) ? "openai" : mk(e) ? "volcengine" : Iu(e) ? "midjourney" : z5(e) ? "wanx" : "google";
}

function oro(e, t) {
  return Up(e) ? u7n : $S(e) ? WNn : _Z(e) && iX(t == null ? void 0 : t.seedreamBackground) === "transparent" ? 1 : xZ(e) ? VNn : mk(e) ? HNn : z5(e) ? qNn : Iu(e) ? aro : rro;
}

function sro(e) {
  return mm(e.currentModel) ? {
    endpoint: sX(e.currentModel, e.configUrl) || uv,
    provider: iro(e.currentModel),
    maxRefs: oro(e.currentModel, e.settings),
    isMj: Iu(e.currentModel),
    isDirectOpenApi: Sqe(e.currentModel)
  } : null;
}

function lro(e) {
  const {
    currentModel: t,
    ratio: n,
    resolution: r,
    settings: a
  } = e;
  if (t === "gemini-3.1-flash-image-preview-huya") return {
    aspectRatio: zMt(n),
    imageSize: UMt(r)
  };
  if (t === "nano-banana-pro-huya") return {
    aspectRatio: Kxe(n),
    imageSize: $Mt(r)
  };
  if (Up(t)) return {
    ...VMt(a, {
      ratio: n,
      resolution: r,
      quality: a == null ? void 0 : a.gptImageQuality,
      modelId: t
    })
  };
  if ($S(t)) return {
    size: tMt(n),
    quality: bhe(a == null ? void 0 : a.gptImageQuality)
  };
  if (mk(t)) {
    const i = {
      size: iPt(t, n, r)
    };
    return xZ(t) || (i.sequential_image_generation = !1, i.max_images = 1), _Z(t) && (i.nsfw = !1), i;
  }
  if (Iu(t)) return {};
  if (z5(t)) {
    const i = iMt(n, r);
    return {
      width: i.width,
      height: i.height,
      thinkingMode: !!(a != null && a.wan27ThinkingMode)
    };
  }
  return {
    aspectRatio: Kxe(n)
  };
}

function cro(e) {
  if (!Iu(e.currentModel)) return {};
  const t = e.settings || {},
    n = e.refImages,
    r = e.refMetaByRawUrl,
    a = Vat(t.huyaMjStyleKey, n, r);
  let i = Y6t(e.currentModel, t) ? Vat(t.huyaMjSubjectKey, n, r) : void 0,
    o = Vat(t.huyaMjImageKey, n, r);
  if (!o && n.length > 0) {
    const s = new Set([a, i].filter(Boolean));
    o = n.find(l => l && !s.has(l)) || (!a && !i ? n[0] : void 0);
  }
  return mhe(e.currentModel, t) && (i = void 0), {
    imageUrl: o,
    sref: a,
    oref: i
  };
}

function dro(e) {
  return e.refImages.length === 0 ? [] : e.refImages.slice(0, e.maxRefs);
}

function uro(e, t) {
  return e.trim() || (t ? nro : tro);
}

function hro(e) {
  return mhe(e.currentModel, e.settings) ? "text2image" : e.hasRefs ? "image2image" : "text2image";
}

function pro(e) {
  const t = {
    provider: e.provider,
    model: HMt(e.currentModel, e.modelName, {
      uiResolution: e.resolution,
      huyaMjVersion: Iu(e.currentModel) ? US(e.currentModel, e.settings) : void 0
    }),
    type: e.type
  };
  return Sqe(e.currentModel) ? {
    model: t,
    parameters: e.parameters
  } : {
    action: "generate",
    model: t,
    parameters: e.parameters
  };
}

function mro(e) {
  const t = String(e || "");
  return !t || Dg(t) || Og(t) || Lg(t) || Rm(t) || mm(t) ? !1 : t.includes("nano-banana-2") || t.includes("gemini-3.1-flash-image-preview") || g3(t);
}

function fro(e) {
  return g3(e.currentModel) ? "1K" : iIe(e.currentModel, e.configId, e.modelName) && e.resolution === "512px" ? "512px" : e.resolution === "1K" ? "1K" : e.resolution === "4K" ? "4K" : "2K";
}

function _mn(e) {
  return !e.hasReferenceImage || e.refImages.length === 0 ? [] : e.refImages.slice();
}

function gro(e) {
  return g3(e.currentModel) ? oX : VS(e.currentModel) || VS(e.configId) || VS(e.modelName) ? bce : iIe(e.currentModel, e.configId, e.modelName) ? aIe : Uqe(e.modelName, e.resolution);
}

function yro(e) {
  if (!mro(e.currentModel)) return null;
  const t = e.useAsyncMode ? "?async=true" : "",
    n = !!(e.hasReferenceImage && !e.useOssJson);
  return {
    endpoint: `${e.baseUrl}/v1/images/${n ? "edits" : "generations"}${t}`,
    useMultipart: n,
    useAsyncMode: e.useAsyncMode,
    model: gro(e),
    imageSize: fro(e),
    aspectRatio: e.ratio !== "Auto" ? e.ratio : void 0,
    logLabel: g3(e.currentModel) ? "Nano Banana 2 Lite" : VS(e.currentModel) || VS(e.configId) || VS(e.modelName) ? "Nano Banana 2.1" : "Nano Banana 2"
  };
}

function bro(e) {
  return {
    model: e.model,
    prompt: e.prompt,
    response_format: "url",
    image_size: e.imageSize,
    ...(e.aspectRatio ? {
      aspect_ratio: e.aspectRatio
    } : {}),
    ...(e.image !== void 0 ? {
      image: e.image
    } : {})
  };
}

function vro(e) {
  const t = {
    model: e.model,
    prompt: e.prompt,
    response_format: "url",
    image_size: e.imageSize
  };
  return e.aspectRatio && (t.aspect_ratio = e.aspectRatio), t;
}

const wro = "nano-banana-hd",
  wgr = "enhance";

function xro(e) {
  const t = String(e || "");
  return !t || _v(t) || Dg(t) || Lg(t) || Rm(t) || Og(t) || Hh(t) || Uu(t) || mp(t) || nh(t) || su(t) || jk(t) || Nm(t) || jm(t) || mm(t) || m5(t) || t.includes("nano-banana-2") || t.includes("gemini-3.1-flash-image-preview") || g3(t) || t.includes("qwen-image-edit") || t.includes("qwen-image-3") ? !1 : t.includes("banana") || t.includes("edit") || t.includes("qwen");
}

function kmn(e) {
  return !e.hasReferenceImage || e.refImages.length === 0 ? [] : e.refImages.slice();
}

function _ro(e) {
  return e.resolution === "HD" ? wro : e.modelName || e.currentModel;
}

function kro(e) {
  if (!xro(e.currentModel)) return null;
  const t = e.useAsyncMode ? "?async=true" : "",
    n = !!(e.hasReferenceImage && !e.useOssJson);
  return {
    endpoint: `${e.baseUrl}/v1/images/${n ? "edits" : "generations"}${t}`,
    useMultipart: n,
    useAsyncMode: e.useAsyncMode,
    model: _ro(e),
    aspectRatio: e.ratio !== "Auto" ? e.ratio : void 0
  };
}

function Aro(e) {
  return {
    model: e.model,
    prompt: e.prompt,
    response_format: "url",
    ...(e.aspectRatio ? {
      aspect_ratio: e.aspectRatio
    } : {})
  };
}

function Sro(e) {
  return {
    model: e.model,
    prompt: e.prompt || wgr,
    n: 1,
    response_format: "url",
    ...(e.aspectRatio ? {
      aspect_ratio: e.aspectRatio
    } : {}),
    image: e.image
  };
}

function Iro(e) {
  const t = {
    model: e.model,
    prompt: e.prompt || wgr,
    n: "1",
    response_format: "url"
  };
  return e.aspectRatio && (t.aspect_ratio = e.aspectRatio), t;
}

const xgr = 12e3;

function Cro(e, t, n) {
  const r = () => Xu(e, t, n).catch(a => {
    console.error("[Music] 下载音频失败:", a);
  });
  return (async () => {
    await r(), Sk(e) && (await new Promise(a => setTimeout(a, xgr)), await r());
  })();
}

async function wSt(e, t) {
  const n = String(e || "").trim();
  if (!n) return {
    playbackUrl: "",
    ossSettings: {},
    usedOss: !1
  };
  let r;
  try {
    const {
      isGlobalOssUploadEnabled: a,
      uploadRemoteAudioResultToGlobalOss: i,
      OSS_REMOTE_URL_SETTING_KEY: o,
      OSS_URL_ONLY_MODE_KEY: s
    } = await Ie(async () => {
      const {
        isGlobalOssUploadEnabled: h,
        uploadRemoteAudioResultToGlobalOss: p,
        OSS_REMOTE_URL_SETTING_KEY: m,
        OSS_URL_ONLY_MODE_KEY: f
      } = await Promise.resolve().then(() => ii);
      return {
        isGlobalOssUploadEnabled: h,
        uploadRemoteAudioResultToGlobalOss: p,
        OSS_REMOTE_URL_SETTING_KEY: m,
        OSS_URL_ONLY_MODE_KEY: f
      };
    }, void 0, import.meta.url);
    if (!a()) return {
      playbackUrl: n,
      ossSettings: {},
      usedOss: !1
    };
    console.log("[Audio] 开始上传全局 OSS (Music/)…", n.slice(0, 80));
    const l = i(n, t),
      d = new Promise((h, p) => {
        r = setTimeout(() => p(new Error("OSS upload timeout")), 3e5);
      }),
      u = await Promise.race([l, d]);
    return {
      playbackUrl: u.remoteUrl,
      usedOss: !0,
      ossSettings: {
        [o]: u.remoteUrl,
        [s]: !0,
        _globalOssUrlOnly: !0
      }
    };
  } catch (a) {
    return console.warn("[Audio] 全局 OSS 上传失败，回退原始 URL:", a), {
      playbackUrl: n,
      ossSettings: {},
      usedOss: !1
    };
  } finally {
    r !== void 0 && clearTimeout(r);
  }
}

const Ero = {
  isOssEnabled: () => Ie(() => Promise.resolve().then(() => Ah), void 0, import.meta.url).then(e => e.isGlobalOssUploadEnabled()),
  persistAudio: Cro,
  resolvePlaybackUrl: wSt,
  probeDuration: gQe,
  cacheHistory: oy
};

function Tro(e, t) {
  if (!Array.isArray(e) || !t) return [];
  const n = String(t.id || t.clip_id || t.clipId || "");
  return e.filter(r => {
    const a = String((r == null ? void 0 : r.id) || (r == null ? void 0 : r.clip_id) || (r == null ? void 0 : r.clipId) || "");
    return n && a && a === n ? !1 : r !== t;
  });
}

function Mro(e, t) {
  var a, i;
  const n = String(t || "").trim(),
    r = [e == null ? void 0 : e.lyrics, (a = e == null ? void 0 : e.metadata) == null ? void 0 : a.prompt, e == null ? void 0 : e.prompt, (i = e == null ? void 0 : e.metadata) == null ? void 0 : i.gpt_description_prompt];
  for (const o of r) {
    const s = String(o || "").trim();
    if (s && !(n && s === n) && (/\[(verse|chorus|bridge|outro|intro|pre-chorus|hook)/i.test(s) || s.includes(`
`) && s.length >= 40 || n && s.length > Math.max(80, n.length * 1.8))) return s;
  }
  return "";
}

function _gr(e, t, n) {
  const r = String(e.remoteTaskId || "").trim();
  if (r) return r;
  const a = String(n || "").trim();
  if (a) return a;
  const i = t.map(o => o.id || o.clip_id || o.clipId).filter(Boolean).map(String);
  if (i.length > 0) return i.join(",");
}

function Pro(e) {
  var w, k;
  const t = e.services ?? Ero,
    n = MRt(e.songs);
  if (!n) return;
  const r = Tro(e.songs, n),
    a = [n],
    i = n,
    o = i.id || i.clip_id || i.clipId,
    s = HU(i);
  if (!s) return;
  const l = i.title || e.title,
    d = Bce(i),
    u = Mro(i, e.historyPrompt),
    h = u || ((w = i.metadata) == null ? void 0 : w.prompt) || i.lyrics || e.lyrics,
    p = _gr(e.historyItem, a, e.taskId),
    m = e.getNode(e.node.id) ?? e.node,
    f = new Set([s]),
    y = A => {
      var S, C, I, E, M, T;
      return A.content === m.content && ((S = A.settings) == null ? void 0 : S.audioUrl) === ((C = m.settings) == null ? void 0 : C.audioUrl) && ((I = A.settings) == null ? void 0 : I.clipId) === ((E = m.settings) == null ? void 0 : E.clipId) || f.has(String(A.content || "")) && ((M = A.settings) == null ? void 0 : M.audioUrl) === A.content && ((T = A.settings) == null ? void 0 : T.clipId) === o;
    },
    b = r.map(A => (A == null ? void 0 : A.id) || (A == null ? void 0 : A.clip_id) || (A == null ? void 0 : A.clipId)).filter(Boolean).map(String),
    v = !!u && !e.makeInstrumental && String(((k = m.settings) == null ? void 0 : k.mode) || "inspiration") === "inspiration",
    _ = A => {
      !A || A <= 0 || (e.writes.updateNode(e.node.id, {
        isGenerating: !1,
        settings: {
          duration: String(A)
        }
      }, y), e.setHistory(S => S.map(C => C.id === e.historyItem.id ? {
        ...C,
        duration: A
      } : C)));
    };
  e.writes.updateNode(m.id, fie(m, {
    isGenerating: !1,
    content: s,
    settings: {
      clipId: o,
      audioUrl: s,
      generatedLyrics: h,
      ...(v ? {
        mode: "custom",
        lyrics: u,
        musicCustomInputKind: "lyrics"
      } : u ? {
        lyrics: u
      } : {}),
      musicTitle: l,
      duration: d,
      _audioAssetId: o,
      ...(b.length > 0 ? {
        alternateClipIds: b
      } : {})
    }
  }), y), (async () => {
    const A = await t.isOssEnabled().catch(R => (console.warn("[Music] OSS 配置读取失败，使用本地缓存:", R), !1));
    if (Nro({
      services: t,
      songs: a,
      historyItem: e.historyItem,
      setHistory: e.setHistory,
      historyPrompt: e.historyPrompt,
      title: e.title,
      model: e.model,
      nodeId: e.node.id,
      taskId: e.taskId,
      makeInstrumental: e.makeInstrumental,
      remoteTaskId: p,
      skipLocalDownload: A,
      onPrimaryDurationResolved: R => _(R)
    }), !A) return;
    console.log("[Music] 全局 OSS 已开启，开始上传主曲音频…");
    const S = i,
      C = S.id || S.clip_id || S.clipId,
      I = LIe(S) || HU(S);
    if (!I) return;
    Sk(I) && (await new Promise(R => setTimeout(R, xgr)));
    const {
      playbackUrl: E,
      ossSettings: M,
      usedOss: T
    } = await t.resolvePlaybackUrl(I, C || e.taskId || e.historyItem.id);
    if (!T || !E) {
      console.warn("[Music] 全局 OSS 上传失败，继续使用 Suno 直链:", I.slice(0, 80));
      return;
    }
    console.log("[Music] 全局 OSS 上传成功 → Music/", E.slice(0, 120)), f.add(E), e.writes.updateNode(e.node.id, {
      isGenerating: !1,
      content: E,
      settings: {
        audioUrl: E,
        ...M
      }
    }, y), e.setHistory(R => R.map(j => j.id !== e.historyItem.id ? j : {
      ...j,
      url: E,
      audioUrl: E,
      originalUrl: I,
      ossUploaded: !0,
      _globalOssUrlOnly: !0,
      _ossRemoteUrl: E,
      _assetId: void 0,
      _audioAssetId: void 0
    }));
    const P = await t.probeDuration(E || I);
    P && P > 0 && _(P);
  })().catch(A => console.warn("[Music] 资源补写失败，保留已生成音频:", A));
}

function Rro(e) {
  const {
    builtItems: t,
    songs: n,
    setHistory: r,
    onPrimaryDurationResolved: a
  } = e;
  (async () => {
    for (let i = 0; i < t.length; i++) {
      const o = t[i],
        s = n[i];
      if (!o || !s) continue;
      let l = Bce(s) ?? o.duration;
      const d = String(LIe(s) || HU(s) || o.audioUrl || o.url || "").trim();
      if (/^https?:\/\//i.test(d)) {
        const h = await e.services.probeDuration(d);
        h && h > 0 && (!l || l <= 0 || !Sk(d) && Math.abs(h - l) > .8) && (l = h);
      }
      if (!l || l <= 0) continue;
      const u = o.id;
      r(h => h.map(p => p.id !== u ? p : {
        ...p,
        duration: l
      })), i === 0 && (a == null || a(l));
    }
  })().catch(i => console.warn("[Music] 时长探测失败，保留原时长:", i));
}

function Nro(e) {
  const {
      songs: t,
      historyItem: n,
      setHistory: r,
      historyPrompt: a,
      title: i,
      model: o,
      nodeId: s,
      taskId: l,
      makeInstrumental: d,
      ossRemoteUrl: u,
      skipLocalDownload: h,
      remoteTaskId: p,
      onPrimaryDurationResolved: m
    } = e,
    f = MRt(t);
  if (!f) return;
  const y = [f],
    b = _gr({
      ...n,
      remoteTaskId: p || n.remoteTaskId
    }, y, l),
    v = y.map(_ => {
      var M;
      const w = _.id || _.clip_id || _.clipId,
        k = HU(_),
        A = u || k,
        S = _.title || i,
        C = Bce(_),
        I = ((M = _.metadata) == null ? void 0 : M.prompt) || _.lyrics,
        E = w || (l ? `${l}_0` : n.id);
      return {
        id: n.id,
        type: "audio",
        url: A,
        prompt: a,
        ...ky(),
        status: "completed",
        progress: 100,
        modelName: o,
        sourceNodeId: s,
        audioUrl: A,
        duration: C,
        lyrics: I,
        musicTitle: S,
        clipId: w,
        remoteTaskId: b,
        isInstrumental: d,
        ...(u ? {
          originalUrl: k,
          ossUploaded: !0,
          _globalOssUrlOnly: !0,
          _ossRemoteUrl: u,
          _assetId: void 0,
          _audioAssetId: void 0
        } : {
          _assetId: E,
          _audioAssetId: E
        })
      };
    });
  r(_ => {
    const w = v[0];
    if (!w) return _;
    const k = _.findIndex(S => S.id === n.id);
    if (k < 0) return _;
    const A = [..._];
    return k >= 0 && (A[k] = {
      ...A[k],
      ...w,
      remoteTaskId: w.remoteTaskId || A[k].remoteTaskId,
      startTime: A[k].startTime
    }), A;
  }), Rro({
    services: e.services,
    builtItems: v,
    songs: y,
    setHistory: r,
    onPrimaryDurationResolved: m
  }), !h && (y.forEach((_, w) => {
    const k = _.id || _.clip_id || _.clipId,
      A = LIe(_) || HU(_),
      S = _.title || i;
    if (!A) return;
    const C = k || (l ? `${l}_${w}` : n.id),
      I = `${S || "music"}_${C}.mp3`;
    e.services.persistAudio(A, C, I).then(async () => {
      if (w !== 0) return;
      const E = await e.services.probeDuration(A);
      E && E > 0 && (m == null || m(E));
    }).catch(E => console.warn("[Music] 本地缓存或时长补写失败，保留原音频:", E));
  }), v.forEach(_ => {
    const w = _.audioUrl || _.url;
    if (!w) return;
    const k = String(_._audioAssetId || _._assetId || _.id);
    e.services.cacheHistory({
      url: w,
      audioUrl: w,
      type: "audio",
      _assetId: k,
      _audioAssetId: k
    }, _.id).catch(A => {
      console.warn(`[Music] 历史缓存/OSS 调度失败 (${_.id}):`, A);
    });
  }));
}

function jro(e) {
  const {
    source: t,
    historyId: n,
    writes: r,
    setHistory: a
  } = e;
  return {
    scheduleKey: `suno:${n}`,
    progress(i) {
      e.setHistoryProgress(n, i), r.updateNode(t.id, {
        settings: {
          ...e.readSourceSettings(),
          generationProgress: i
        }
      });
    },
    failed(i) {
      r.updateNode(t.id, {
        isGenerating: !1,
        errorMsg: i
      }), a(o => o.map(s => s.id === n ? {
        ...s,
        status: "failed",
        errorMsg: i
      } : s));
    },
    completed(i) {
      var l;
      if (i.kind === "songs") {
        e.publishSongs(i.songs);
        return;
      }
      const {
        vocals: o,
        instrumental: s
      } = i;
      r.updateNode(t.id, {
        isGenerating: !1,
        ...(i.source === "record" ? {
          nodeName: ((l = t.prompt) == null ? void 0 : l.trim()) || t.nodeName || "音乐"
        } : {}),
        settings: {
          stemVocalsUrl: o.audio_url || o.video_url || "",
          stemInstrumentalUrl: s.audio_url || s.video_url || "",
          stemVocalsTitle: o.title || "人声",
          stemInstrumentalTitle: s.title || "伴奏",
          splitTaskId: void 0
        }
      }), a(d => d.map(u => u.id === n ? {
        ...u,
        status: "completed",
        progress: 100,
        durationMs: u.startTime ? Date.now() - u.startTime : void 0
      } : u));
    }
  };
}

function Dro(e) {
  const t = {},
    n = new Map(),
    r = new Map();
  let a = !0;
  const i = (l, d) => {
      let u = n.get(l);
      u || (u = {}, n.set(l, u));
      const h = u;
      return p => a && n.get(l) === h && d(p);
    },
    o = () => e.schedule(t, s),
    s = () => {
      if (!a) return;
      const l = [...r].slice(0, e.interacting() ? 1 : 2);
      for (const [d] of l) r.delete(d);
      l.some(([, d]) => d.valid()) && e.setNodes(d => {
        let u = null;
        for (const [h, p] of l) {
          if (!p.valid(u ?? d)) continue;
          const m = u ?? d,
            f = yje(e, m, h);
          if (f < 0) continue;
          const y = LBt(m[f], p.patch);
          y !== m[f] && (u ?? (u = d.slice()), u[f] = y);
        }
        return u ?? d;
      });
      for (const [d, u] of l) u.valid() && e.visual(d, !1);
      r.size && o();
    };
  return {
    capture: i,
    invalidate(l) {
      r.delete(l), n.delete(l);
    },
    enqueue(l, d, u) {
      const h = r.get(l),
        p = h != null && h.valid() ? h.patch : void 0;
      r.set(l, {
        valid: i(l, u),
        patch: {
          ...p,
          ...d,
          isGenerating: !1,
          ...(p != null && p.settings || d.settings ? {
            settings: {
              ...(p == null ? void 0 : p.settings),
              ...d.settings
            }
          } : {})
        }
      }), o();
    },
    activate() {
      a = !0;
    },
    dispose() {
      a = !1, r.clear(), n.clear();
    }
  };
}

function Lro(e, t) {
  return e ? e.settings || t.settings ? {
    ...e,
    ...t,
    settings: {
      ...e.settings,
      ...t.settings
    }
  } : {
    ...e,
    ...t
  } : t;
}

function Oro(e) {
  const t = Dro(e),
    n = new Set();
  let r = new Set();
  const a = new Map(),
    i = new Map(),
    o = new Map();
  let s = !1;
  const l = h => {
      o.delete(h), t.invalidate(h), n.delete(h), a.delete(h), i.delete(h);
    },
    d = () => {
      if (s = !1, o.size === 0) return;
      const h = [...o];
      o.clear(), e.setNodes(p => {
        let m = null;
        for (const [f, y] of h) {
          if (!y.valid(m ?? p)) continue;
          const b = m ?? p,
            v = yje(e, b, f);
          if (v < 0) continue;
          const _ = eee(b[v], y.patch, n.has(f));
          _ !== b[v] && (m ?? (m = p.slice()), m[v] = _);
        }
        return m ?? p;
      });
    },
    u = {
      captureSource(h, p) {
        let m = a.get(h);
        m || (m = {}, a.set(h, m));
        const f = m,
          y = !!e.getNode(h);
        return b => a.get(h) === f && p(b) && (!b || !y || yje(e, b, h) >= 0);
      },
      bind(h, p) {
        const m = u.captureSource(p, h),
          f = {},
          y = new Map(),
          b = (_, w = !1) => {
            const k = y.get(_);
            if (k) return k;
            w && m() && i.set(_, f);
            const A = i.get(_),
              S = u.captureSource(_, m),
              C = I => S(I) && i.get(_) === A;
            return y.set(_, C), C;
          };
        return b(p, !0), {
          updateNode: Object.assign((_, w, k) => {
            var E, M, T, P, R, j;
            const A = w.isGenerating === !0 || ((E = w.settings) == null ? void 0 : E.isGenerating) === !0,
              S = w.isGenerating === !1 || ((M = w.settings) == null ? void 0 : M.isGenerating) === !1,
              C = b(_, A);
            if (!C() || (T = e.parked) != null && T.call(e, _)) {
              (P = e.backgroundWrite) == null || P.call(e, _, w);
              return;
            }
            A && ((R = e.trackCanvasNode) == null || R.call(e, _, !0)), S && ((j = e.trackCanvasNode) == null || j.call(e, _, !1));
            const I = k ? B => {
              if (!C(B)) return !1;
              const F = B ? B[yje(e, B, _)] : e.getNode(_);
              return !!F && k(F);
            } : C;
            u.update(_, w, I);
          }, {
            generationEffect(_, w) {
              return b(_)() ? (w(), !0) : !1;
            }
          }),
          isCurrent: m,
          claimTarget: _ => {
            b(_, !0);
          },
          setNodes: AJe(e.setNodes, m),
          guardSetter: _ => w => {
            if (m()) return _(k => m() ? typeof w == "function" ? w(k) : w : k);
          }
        };
      },
      update(h, p, m) {
        var A;
        if (!m()) return;
        const f = p.settings,
          y = p.isGenerating === !0 || (f == null ? void 0 : f.isGenerating) === !0,
          b = p.isGenerating === !1 || (f == null ? void 0 : f.isGenerating) === !1,
          v = p.isGenerating === void 0 && f != null && Object.keys(f).length === 1 && "progress" in f;
        if (Object.keys(p).length === 1 && f && "progress" in f) {
          const S = ((A = e.getNode(h)) == null ? void 0 : A.settings) ?? {},
            C = Number(f.progress);
          if (Object.entries(f).every(([I, E]) => I === "progress" || Object.is(S[I], E)) && Number.isFinite(C) && e.progressActive(h)) {
            e.progress(h, C);
            return;
          }
        }
        if (e.orphaned(h) && !b && (y || v)) {
          n.delete(h);
          return;
        }
        if (y && (t.invalidate(h), n.add(h), e.visual(h, !0)), b) {
          o.delete(h), n.delete(h), e.cancelDeferred(h), t.enqueue(h, p, m), e.visual(h, !1);
          return;
        }
        const _ = t.capture(h, m),
          w = () => {
            if (!_()) return;
            const S = o.get(h);
            o.set(h, {
              valid: _,
              patch: Lro(S == null ? void 0 : S.patch, p)
            });
          },
          k = () => {
            w(), d();
          };
        if (e.interacting()) {
          e.defer(k, h);
          return;
        }
        w(), !s && (s = !0, e.transition(d));
      },
      cancel: l,
      observeNodes(h) {
        const p = new Set(h.map(m => m.id));
        for (const m of r) p.has(m) || l(m);
        r = p;
      },
      activate: t.activate,
      dispose() {
        o.clear(), s = !1, t.dispose(), n.clear(), r.clear(), a.clear(), i.clear();
      }
    };
  return u;
}

const Bro = () => !0;

function Fro(e, t, n, r, a = !0) {
  const i = g.useRef({
    byId: t,
    indexes: new Map(),
    setNodes: n
  });
  g.useLayoutEffect(() => {
    i.current = {
      byId: t,
      indexes: new Map(e.map((d, u) => [d.id, u])),
      setNodes: n
    };
  }, [e, t, n]);
  const [o] = g.useState(() => Oro({
    getNode: d => i.current.byId.get(d),
    setNodes: d => i.current.setNodes(d),
    getIndex: d => i.current.indexes.get(d),
    interacting: a ? Yi : () => !1,
    schedule: LYe,
    defer: vae,
    transition: g.startTransition,
    cancelDeferred: F5t,
    visual: a ? hu : () => {},
    orphaned: a ? gfi : () => !1,
    progressActive: d => al.getNodeGeneratingSnapshot(d),
    progress: (d, u) => {
      al.updateLatestProgressForNode(d, u);
    },
    backgroundWrite: a ? Cfi : void 0,
    trackCanvasNode: a ? __t : void 0,
    parked: a ? OBt : void 0
  }));
  g.useLayoutEffect(() => a ? Tfi((d, u, h) => Ifi() !== d || !i.current.byId.has(u) ? !1 : (i.current.setNodes(p => {
    const m = p.findIndex(y => y.id === u);
    if (m < 0 || p[m] === h) return p;
    const f = p.slice();
    return f[m] = h, f;
  }), !0)) : void 0, [a]), g.useLayoutEffect(() => (o.activate(), () => o.dispose()), [o]), g.useLayoutEffect(() => {
    o.observeNodes(e);
  }, [o, e]);
  const s = g.useCallback((d, u) => o.update(d, u, r), [o, r]),
    l = g.useCallback((d, u) => o.bind(d, u), [o]);
  return {
    updateNode: s,
    bind: l,
    cancel: o.cancel
  };
}

function zro(e) {
  const t = String(e.startPort || e.refImages[0] || ""),
    n = String(e.endPort || (e.refImages.length > 1 ? e.refImages[1] : "") || ""),
    r = String(e.videoPort || ""),
    a = [],
    i = new Set(),
    o = s => {
      const l = String(s || "").trim();
      !l || i.has(l) || Ey(l) || KE(l) || (i.add(l), a.push(l));
    };
  for (const s of e.refImages) o(s);
  return t && o(t), n && o(n), {
    imageCandidates: a,
    startFrameRaw: t,
    endFrameRaw: n,
    videoPortRaw: r
  };
}

function Uro(e) {
  const {
    preview: t,
    connection: n,
    writes: r,
    setNodes: a,
    setConnections: i
  } = e;
  if (!r.isCurrent()) return;
  r.claimTarget(t.id);
  const o = ydi(a, r.isCurrent),
    s = u => r.isCurrent(u) ? {
      nodes: [...u, t],
      result: !0
    } : {
      nodes: u,
      result: !1
    },
    l = r.guardSetter(i),
    d = u => {
      u && r.isCurrent() && l(h => [...h, n]);
    };
  VD(o, s, d) || (r.setNodes(u => s(u).nodes), d(r.isCurrent()));
}

const $ro = {
    lighting: "lighting",
    angle: "angle",
    textEdit: "textEdit",
    moveObject: "moveObject",
    markers: "markers",
    portraitTexture: "portraitTexture",
    moodAdjust: "moodAdjust"
  },
  Gro = [];

function Vro(e) {
  var n;
  const t = (n = e == null ? void 0 : e.settings) == null ? void 0 : n.acceptedUpstreamTools;
  return Array.isArray(t) ? t.filter(r => Object.values($ro).includes(r)) : null;
}

function gv(e, t) {
  const n = Vro(e);
  return n === null ? !0 : n.includes(t);
}

function i7(e, t) {
  return {
    ...(e || {}),
    ...t,
    acceptedUpstreamTools: [...Gro]
  };
}

function hm(e, t, n) {
  const r = Math.max(0, Math.min(t - 1, e.x)),
    a = Math.max(0, Math.min(n - 1, e.y)),
    i = Math.max(1, Math.min(t - r, e.w)),
    o = Math.max(1, Math.min(n - a, e.h));
  return {
    x: r,
    y: a,
    w: i,
    h: o
  };
}

function x$(e, t, n) {
  const r = Math.max(1, t),
    a = Math.max(1, n);
  return {
    x: Math.max(0, Math.min(1, e.x / r)),
    y: Math.max(0, Math.min(1, e.y / a)),
    w: Math.max(0, Math.min(1, e.w / r)),
    h: Math.max(0, Math.min(1, e.h / a))
  };
}

function Qde(e, t, n) {
  const r = Math.max(1, Math.round(t)),
    a = Math.max(1, Math.round(n)),
    i = e.x * r,
    o = e.y * a,
    s = (e.x + e.w) * r,
    l = (e.y + e.h) * a,
    d = Math.round(i),
    u = Math.round(o),
    h = Math.max(1, Math.round(s) - d),
    p = Math.max(1, Math.round(l) - u);
  return hm({
    x: d,
    y: u,
    w: h,
    h: p
  }, r, a);
}

function Yde(e) {
  const {
    x: t,
    y: n,
    w: r,
    h: a
  } = e;
  return !(![t, n, r, a].every(i => Number.isFinite(i)) || r <= 0 || a <= 0 || t < -.001 || n < -.001 || t + r > 1.001 || n + a > 1.001);
}

function nUt(e) {
  return Number.isFinite(e.x) && Number.isFinite(e.y) && e.x >= -.001 && e.y >= -.001 && e.x <= 1.001 && e.y <= 1.001;
}

function Amn(e, t, n) {
  const r = e.filter(nUt);
  if (r.length < 3) return null;
  const a = Math.max(1, Math.round(t)),
    i = Math.max(1, Math.round(n)),
    o = r.map(p => p.x * a),
    s = r.map(p => p.y * i),
    l = Math.floor(Math.min(...o)),
    d = Math.floor(Math.min(...s)),
    u = Math.ceil(Math.max(...o)),
    h = Math.ceil(Math.max(...s));
  return hm({
    x: l,
    y: d,
    w: Math.max(1, u - l),
    h: Math.max(1, h - d)
  }, a, i);
}

function Hro(e, t, n) {
  const r = n.x - t.x,
    a = n.y - t.y,
    i = r * r + a * a;
  if (i <= Number.EPSILON) return Math.hypot(e.x - t.x, e.y - t.y);
  const o = Math.max(0, Math.min(1, ((e.x - t.x) * r + (e.y - t.y) * a) / i));
  return Math.hypot(e.x - (t.x + o * r), e.y - (t.y + o * a));
}

function Smn(e, t, n = 320) {
  const r = e.filter(nUt).map(o => ({
    x: Math.max(0, Math.min(1, o.x)),
    y: Math.max(0, Math.min(1, o.y))
  }));
  if (r.length <= 3) return r;
  const a = o => {
    if (o.length <= 2) return o;
    let s = -1,
      l = 0;
    for (let h = 1; h < o.length - 1; h += 1) {
      const p = Hro(o[h], o[0], o[o.length - 1]);
      p > l && (s = h, l = p);
    }
    if (s < 0 || l <= t) return [o[0], o[o.length - 1]];
    const d = a(o.slice(0, s + 1)),
      u = a(o.slice(s));
    return [...d.slice(0, -1), ...u];
  };
  let i = a(r);
  if (i.length > n) {
    const o = (i.length - 1) / Math.max(1, n - 1);
    i = Array.from({
      length: n
    }, (s, l) => i[Math.round(l * o)]);
  }
  return i;
}

function yoe(e) {
  return Math.max(0, e.w) * Math.max(0, e.h);
}

function kgr(e, t) {
  const n = Math.max(e.x, t.x),
    r = Math.max(e.y, t.y),
    a = Math.min(e.x + e.w, t.x + t.w),
    i = Math.min(e.y + e.h, t.y + t.h),
    o = Math.max(0, a - n),
    s = Math.max(0, i - r);
  return {
    x: n,
    y: r,
    w: o,
    h: s
  };
}

function Wro(e, t) {
  const n = yoe(kgr(e, t)),
    r = yoe(e) + yoe(t) - n;
  return r <= 0 ? 0 : n / r;
}

function qro(e, t, n, r) {
  const a = Math.max(1, Math.round(n)),
    i = Math.max(1, Math.round(r)),
    o = hm(e, a, i),
    s = hm(t, a, i),
    l = A$e(o, s);
  if (rUt(l)) return !1;
  if (Wro(o, s) >= .35) return !0;
  const u = o.x + o.w / 2,
    h = o.y + o.h / 2,
    p = s.x + s.w / 2,
    m = s.y + s.h / 2,
    f = u - p,
    y = h - m,
    b = Math.hypot(f, y),
    v = Math.hypot(a, i);
  if (v > 0 && b / v <= .08) return !0;
  const _ = yoe(kgr(o, s)),
    w = Math.max(1, Math.min(yoe(o), yoe(s)));
  return _ / w >= .55;
}

function Imn(e, t, n, r) {
  const a = Math.max(0, Math.round(t));
  return hm({
    x: e.x - a,
    y: e.y - a,
    w: e.w + a * 2,
    h: e.h + a * 2
  }, n, r);
}

function k$e(e, t) {
  const n = Math.max(1, e.w),
    r = Math.max(1, e.h),
    a = Math.min(t.w / n, t.h / r);
  if (!Number.isFinite(a) || a <= 0) return {
    ...t
  };
  const i = Math.max(1, n * a),
    o = Math.max(1, r * a);
  return {
    x: t.x + (t.w - i) / 2,
    y: t.y + (t.h - o) / 2,
    w: i,
    h: o
  };
}

function Agr(e, t) {
  const n = Math.max(1e-8, e.w),
    r = Math.max(1e-8, e.h),
    a = Math.min(t.w / n, t.h / r);
  if (!Number.isFinite(a) || a <= 0) return {
    ...t
  };
  const i = n * a,
    o = r * a;
  return {
    x: t.x + (t.w - i) / 2,
    y: t.y + (t.h - o) / 2,
    w: i,
    h: o
  };
}

function Sgr(e, t, n = 1) {
  const r = Math.max(1, Math.min(e, t));
  if (Number.isFinite(n) && n < .92) return Math.max(6, Math.min(28, Math.round(r * .04)));
  const a = Number.isFinite(n) && n > 1.08 ? .1 : .058;
  return Math.max(12, Math.min(80, Math.round(r * a)));
}

function A$e(e, t) {
  const n = Math.min(t.w / Math.max(1, e.w), t.h / Math.max(1, e.h));
  return Number.isFinite(n) && n > 0 ? n : 1;
}

function rUt(e, t = .12) {
  return Number.isFinite(e) && Math.abs(e - 1) >= t;
}

function Kro(e) {
  const {
      label: t,
      scale: n,
      containedPx: r
    } = e,
    a = Math.max(1, Math.round(n * 100)),
    i = Math.max(1, Math.round(r.w)),
    o = Math.max(1, Math.round(r.h));
  if (!rUt(n)) return `尺度：目标框与源框接近，保持「${t}」原有大小，最终外接约 ${i}×${o}px。`;
  const s = n < 1 ? "缩小" : "放大";
  return `【尺度必须改变】必须把「${t}」按目标框均匀${s}到原尺寸的 ${a}%（${n.toFixed(2)}×），最终外接约 ${i}×${o}px，在目标框内居中。禁止保持原图中的原尺寸，禁止只改位置不改大小；定位预览里的主体大小就是最终必须采用的大小。`;
}

function Qro(e) {
  const {
      label: t,
      sourcePx: n,
      targetPx: r,
      containedPx: a,
      imageW: i,
      imageH: o
    } = e,
    s = Math.max(1, i),
    l = Math.max(1, o),
    d = A => Number.isFinite(A) ? A.toFixed(4) : String(A),
    u = (n.x + n.w / 2) / s,
    h = (n.y + n.h / 2) / l,
    p = (r.x + r.w / 2) / s,
    m = (r.y + r.h / 2) / l,
    f = (a.x + a.w / 2) / s,
    y = (a.y + a.h / 2) / l,
    b = A$e(n, r),
    v = Math.round(a.x + a.w / 2 - (n.x + n.w / 2)),
    _ = Math.round(a.y + a.h / 2 - (n.y + n.h / 2)),
    w = Math.max(1, Math.round(a.w)),
    k = Math.max(1, Math.round(a.h));
  return [`几何锚定（相对整图 0-1，原点左上）：源框中心≈(${d(u)},${d(h)})，目标框中心≈(${d(p)},${d(m)})，主体最终视觉中心≈(${d(f)},${d(y)})。必须把「${t}」完整移入目标框，且按原比例缩放后居中落入目标框（最终外接框约 x=${Math.round(a.x)}, y=${Math.round(a.y)}, w=${w}, h=${k}）；禁止把主体放在源区或其它位置；源区只补背景、不得残留同一主体。`, `尺度与位移：均匀缩放约 ${b.toFixed(2)}×，视觉中心平移约 (${v}px, ${_}px)。主体须占据上述最终外接框，大小必须跟随目标框，禁止保持原尺寸、禁止缩到目标框角落、禁止只移到「附近空白处」。`, `场景约束：若目标框与画面已有物体重叠，必须把「${t}」安放到该已有物体之上并保持接触与遮挡关系；禁止把已有物体改画成墙、窗、台面、地平线等新结构，禁止发明原图中不存在的建筑或遮挡。`, "保真：除源区（清除主体并按周围纹理补背景）与目标区（放入主体并融合边缘）外，其余区域必须保持原图构图、角色、道具与透视，不得重绘整张图。", `融合：只把「${t}」本身放到新位置，禁止把源框里的旧背景一起放大/平移成矩形色块；主体轮廓必须与新背景无缝衔接，禁止竖直接缝、硬边切割、能看出「贴了一块」的矩形边界。`, "成图必须是干净成品，禁止出现任何色框、黄框、橙框、蓝框、虚线框、标注文字、斜线遮罩或界面叠加；文中的「源框/目标框」只是坐标描述，不是要画到照片上的线。"];
}

function Flt(e, t) {
  const n = Math.round(e * .38),
    r = Math.round(t * .42),
    a = Math.round((e - n) / 2),
    i = Math.round(t * .28),
    o = Math.round(e * .28),
    s = Math.round(t * .32),
    l = Math.round((e - o) / 2),
    d = Math.round((t - s) / 2);
  return {
    source: hm({
      x: a,
      y: i,
      w: n,
      h: r
    }, e, t),
    target: hm({
      x: l,
      y: d,
      w: o,
      h: s
    }, e, t)
  };
}

function Cmn(e) {
  if (!e || typeof e != "object") return null;
  const t = e,
    n = Number(t.x),
    r = Number(t.y),
    a = Number(t.w ?? t.width),
    i = Number(t.h ?? t.height);
  return [n, r, a, i].some(o => !Number.isFinite(o)) ? null : {
    x: n,
    y: r,
    w: a,
    h: i
  };
}

function Yro(e, t, n, r) {
  var E, M, T;
  const a = e.match(/\{[\s\S]*\}/);
  if (!a) throw new Error("模型未返回 JSON");
  const i = JSON.parse(a[0]),
    o = (E = i.source) == null ? void 0 : E.rect01,
    s = (M = i.target) == null ? void 0 : M.rect01,
    l = o && typeof o == "object" ? {
      x: Number(o.x),
      y: Number(o.y),
      w: Number(o.w),
      h: Number(o.h)
    } : null,
    d = s && typeof s == "object" ? {
      x: Number(s.x),
      y: Number(s.y),
      w: Number(s.w),
      h: Number(s.h)
    } : null,
    u = Cmn(i.source && i.source.rect) ?? r.source,
    h = Cmn(i.target && i.target.rect) ?? r.target,
    p = l && Yde(l) ? Qde(l, t, n) : u,
    m = d && Yde(d) ? Qde(d, t, n) : h,
    f = i.subject || {},
    y = typeof f.label == "string" && f.label.trim() ? f.label.trim() : "主体",
    b = typeof f.confidence == "number" && Number.isFinite(f.confidence) ? Math.max(0, Math.min(1, f.confidence)) : void 0,
    v = i.prompts || {};
  let _ = typeof v.instruction == "string" && v.instruction.trim() ? v.instruction.trim() : xSt(r.userHint).instruction;
  const w = typeof v.backgroundFixHint == "string" && v.backgroundFixHint.trim() ? v.backgroundFixHint.trim() : xSt(r.userHint).backgroundFixHint,
    k = (r.userHint || "").trim();
  k && !_.includes(k) && (_ = `${_} 用户补充：${k}`.trim());
  const A = ((T = i.source) == null ? void 0 : T.shape) === "lasso" ? "lasso" : "rect",
    S = i.blend || {},
    C = typeof S.featherPx == "number" && Number.isFinite(S.featherPx) ? Math.max(0, Math.round(S.featherPx)) : 16,
    I = S.keepLighting !== !1;
  return {
    version: 1,
    status: "confirmed",
    imageSize: {
      w: t,
      h: n
    },
    subject: {
      label: y,
      confidence: b
    },
    source: {
      shape: A,
      rect: hm(p, t, n),
      rect01: x$(hm(p, t, n), t, n)
    },
    target: {
      rect: hm(m, t, n),
      rect01: x$(hm(m, t, n), t, n)
    },
    blend: {
      featherPx: C,
      keepLighting: I
    },
    prompts: {
      instruction: _,
      backgroundFixHint: w
    }
  };
}

function xSt(e) {
  const t = (e || "").trim();
  return {
    instruction: ["在保持整张图风格、光照与构图一致的前提下，将源矩形内的主体移动到目标矩形位置，并按目标框相对源框的尺寸比例缩放（目标框更小则缩小，更大则放大），居中放入目标框。", "原主体区域需自然补全背景，与周围融合；新位置主体须安放在目标处已有物体之上，禁止发明墙、窗、台面等新结构。成图不要出现色框、虚线框、矩形切割块或标注文字。", t ? `用户补充：${t}` : ""].filter(Boolean).join(" "),
    backgroundFixHint: "原位置按周围纹理与透视修补，避免出现明显接缝或复制粘贴感。"
  };
}

function Xro(e, t, n, r, a, i = "主体", o) {
  const s = xSt(a);
  return {
    version: 1,
    status: "confirmed",
    imageSize: {
      w: e,
      h: t
    },
    subject: {
      label: i,
      confidence: 1
    },
    source: {
      shape: (o == null ? void 0 : o.shape) === "lasso" ? "lasso" : "rect",
      rect: hm(n, e, t),
      rect01: x$(hm(n, e, t), e, t),
      ...((o == null ? void 0 : o.shape) === "lasso" && o.lassoPoints01 ? {
        lassoPoints01: o.lassoPoints01.filter(nUt)
      } : {}),
      ...(o != null && o.maskPngBase64 ? {
        maskPngBase64: o.maskPngBase64
      } : {})
    },
    target: {
      rect: hm(r, e, t),
      rect01: x$(hm(r, e, t), e, t)
    },
    blend: {
      featherPx: 16,
      keepLighting: !0
    },
    prompts: s
  };
}

const tae = e => Math.max(0, Math.min(1, e));

function zlt(e, t, n) {
  const r = tae(e.x) * t,
    a = tae(e.y) * n,
    i = tae(e.x + Math.max(0, e.w)) * t,
    o = tae(e.y + Math.max(0, e.h)) * n;
  return {
    x: r,
    y: a,
    w: Math.max(1, i - r),
    h: Math.max(1, o - a)
  };
}

function Jro(e, t, n) {
  const r = t.w > 0 ? (e.x - t.x) / t.w : 0,
    a = t.h > 0 ? (e.y - t.y) / t.h : 0;
  return {
    x: tae(n.x + r * n.w),
    y: tae(n.y + a * n.h)
  };
}

const Zro = async e => {
  if (typeof createImageBitmap == "function") {
    const r = await createImageBitmap(e);
    return {
      image: r,
      width: r.width,
      height: r.height,
      dispose: () => r.close()
    };
  }
  const t = URL.createObjectURL(e),
    n = new Image();
  return await new Promise((r, a) => {
    n.onload = () => r(), n.onerror = () => a(new Error("无法解码移动对象定位图的源图片")), n.src = t;
  }), {
    image: n,
    width: n.naturalWidth || n.width,
    height: n.naturalHeight || n.height,
    dispose: () => URL.revokeObjectURL(t)
  };
};

function Emn(e, t, n, r, a, i) {
  e.beginPath(), t.forEach((o, s) => {
    const l = Jro(o, n, r),
      d = l.x * a,
      u = l.y * i;
    s === 0 ? e.moveTo(d, u) : e.lineTo(d, u);
  }), e.closePath();
}

function eao(e, t, n, r) {
  const a = document.createElement("canvas");
  a.width = t, a.height = n;
  const i = a.getContext("2d");
  return i ? (i.imageSmoothingEnabled = !0, i.imageSmoothingQuality = "high", i.filter = `blur(${Math.max(1, Math.round(r))}px)`, i.drawImage(e, 0, 0, t, n), i.filter = "none", a) : null;
}

function tao(e, t, n, r, a) {
  e.save(), a(), e.clip(), e.drawImage(t, 0, 0, n, r), e.restore();
}

function nao(e, t, n, r, a) {
  const i = document.createElement("canvas");
  i.width = e, i.height = t;
  const o = i.getContext("2d");
  if (!o) return null;
  o.fillStyle = "#fff";
  const s = Math.max(2, Math.round(r * .55));
  if (a) a(o), o.fill();else {
    const u = n.x + n.w / 2,
      h = n.y + n.h / 2,
      p = Math.max(1, n.w / 2 - s),
      m = Math.max(1, n.h / 2 - s);
    o.beginPath(), o.ellipse(u, h, p, m, 0, 0, Math.PI * 2), o.fill();
  }
  if (r <= 0) return i;
  const l = document.createElement("canvas");
  l.width = e, l.height = t;
  const d = l.getContext("2d");
  return d ? (d.filter = `blur(${Math.max(1, Math.round(r))}px)`, d.drawImage(i, 0, 0), d.filter = "none", l) : i;
}

function rao(e, t, n, r, a, i, o, s) {
  const l = document.createElement("canvas");
  l.width = a, l.height = i;
  const d = l.getContext("2d");
  if (!d) {
    e.save(), e.beginPath(), e.rect(r.x, r.y, r.w, r.h), e.clip(), e.drawImage(t, n.x, n.y, n.w, n.h, r.x, r.y, r.w, r.h), e.restore();
    return;
  }
  d.imageSmoothingEnabled = !0, d.imageSmoothingQuality = "high", d.drawImage(t, n.x, n.y, n.w, n.h, r.x, r.y, r.w, r.h);
  const u = nao(a, i, r, o, s);
  u && (d.globalCompositeOperation = "destination-in", d.drawImage(u, 0, 0), d.globalCompositeOperation = "source-over"), e.drawImage(l, 0, 0);
}

async function aao(e, t, n = 2048) {
  const r = await Zro(e);
  try {
    const a = Math.max(1, r.width),
      i = Math.max(1, r.height),
      o = Math.max(256, Math.min(4096, Math.round(n))),
      s = Math.min(1, o / Math.max(a, i)),
      l = Math.max(1, Math.round(a * s)),
      d = Math.max(1, Math.round(i * s)),
      u = document.createElement("canvas");
    u.width = l, u.height = d;
    const h = u.getContext("2d");
    if (!h) throw new Error("浏览器不支持 Canvas 2D，无法生成移动对象定位图");
    const p = t.sourceRect01,
      m = t.targetRect01,
      f = Agr(p, m),
      y = zlt(p, a, i),
      b = zlt(f, l, d),
      v = zlt(p, l, d);
    h.imageSmoothingEnabled = !0, h.imageSmoothingQuality = "high", h.drawImage(r.image, 0, 0, l, d);
    const _ = Math.max(14, Math.round(Math.min(l, d) * .042)),
      w = eao(r.image, l, d, _),
      k = (t.lassoPoints01 || []).filter(I => Number.isFinite(I.x) && Number.isFinite(I.y)),
      A = () => {
        k.length >= 3 ? Emn(h, k, p, p, l, d) : (h.beginPath(), h.rect(v.x, v.y, v.w, v.h));
      };
    w ? tao(h, w, l, d, A) : (h.save(), A(), h.clip(), h.fillStyle = "rgba(0,0,0,0.08)", h.fillRect(0, 0, l, d), h.restore());
    const S = Math.min(b.w / Math.max(1, v.w), b.h / Math.max(1, v.h)),
      C = Sgr(b.w, b.h, S);
    return rao(h, r.image, y, b, l, d, C, k.length >= 3 ? I => Emn(I, k, p, f, l, d) : void 0), u.toDataURL("image/jpeg", .92);
  } finally {
    r.dispose();
  }
}

function Igr(e) {
  return {
    "1:1": 1,
    "16:9": 1.7777777777777777,
    "9:16": .5625,
    "4:3": 1.3333333333333333,
    "3:4": .75,
    "3:2": 1.5,
    "2:3": .6666666666666666,
    "21:9": 2.3333333333333335
  }[e] ?? 1;
}

function iao(e, t, n, r, a) {
  const i = a || "center";
  let o, s;
  switch (i) {
    case "top":
      o = Math.round((e - n) / 2), s = 0;
      break;
    case "bottom":
      o = Math.round((e - n) / 2), s = t - r;
      break;
    case "left":
      o = 0, s = Math.round((t - r) / 2);
      break;
    case "right":
      o = e - n, s = Math.round((t - r) / 2);
      break;
    default:
      o = Math.round((e - n) / 2), s = Math.round((t - r) / 2);
  }
  return {
    offsetX: o,
    offsetY: s
  };
}

function oao(e, t, n, r, a, i) {
  const o = Math.max(0, e - n),
    s = Math.max(0, t - r),
    l = a ?? .5,
    d = i ?? .5;
  return {
    offsetX: Math.round(o * l),
    offsetY: Math.round(s * d)
  };
}

function Cgr(e, t, n, r, a, i, o, s) {
  return o != null || s != null ? oao(e, t, n, r, o, s) : iao(e, t, n, r, a ? void 0 : i || "center");
}

function sao(e, t, n, r = 1.5, a, i, o, s, l) {
  const d = !n || n === "原比例" || n === "Auto";
  let u, h;
  if (d) {
    if (a != null && i != null) {
      const f = Math.max(1, Math.min(5, a)),
        y = Math.max(1, Math.min(5, i));
      u = Math.round(e * f), h = Math.round(t * y);
    } else {
      const f = Math.max(1.1, Math.min(5, r));
      u = Math.round(e * f), h = Math.round(t * f);
    }
  } else {
    const f = Igr(n);
    h = Math.max(t, Math.ceil(e / f)), u = Math.round(h * f), u < e && (u = e, h = Math.max(t, Math.ceil(e / f)));
    const y = Math.max(1, Math.min(5, r));
    u = Math.round(u * y), h = Math.round(h * y);
  }
  const {
    offsetX: p,
    offsetY: m
  } = Cgr(u, h, e, t, d, o, s, l);
  return {
    targetW: u,
    targetH: h,
    offsetX: p,
    offsetY: m
  };
}

function lao(e, t, n, r = 1.5, a, i, o, s) {
  const l = sao(e, t, n, r, a, i, void 0, o, s),
    d = e > 0 ? l.offsetX / e : 0,
    u = t > 0 ? l.offsetY / t : 0,
    h = e > 0 ? (l.targetW - e - l.offsetX) / e : 0,
    p = t > 0 ? (l.targetH - t - l.offsetY) / t : 0;
  return {
    ...l,
    top: u,
    right: h,
    bottom: p,
    left: d,
    outputWidth: l.targetW,
    outputHeight: l.targetH
  };
}

function cao(e, t) {
  const n = `向外扩展画面。原图保留在输出画布内，相对原图的扩展量为上 ${t.top.toFixed(3)}、下 ${t.bottom.toFixed(3)}、左 ${t.left.toFixed(3)}、右 ${t.right.toFixed(3)}。保持原图主体与风格不变，只补全扩展区域。`,
    r = e.trim();
  return r ? `${r}

${n}` : `基于原图自然扩展画面，保持风格一致。${n}`;
}

function dao(e) {
  return new Promise((t, n) => {
    const r = new Image(),
      a = String(e || "");
    /^https?:/i.test(a) && (r.crossOrigin = "anonymous"), r.onload = () => {
      const i = r.naturalWidth,
        o = r.naturalHeight;
      i <= 0 || o <= 0 ? n(new Error("图片尺寸无效")) : t({
        w: i,
        h: o
      });
    }, r.onerror = () => n(new Error("图片加载失败")), r.src = a;
  });
}

function Egr(e, t) {
  const n = d => Math.max(16, Math.round(d / 16) * 16);
  let r = n(e),
    a = n(t);
  const i = 512,
    o = 4096,
    s = 4096 * 4096,
    l = Math.min(1, o / r, o / a, Math.sqrt(s / (r * a)));
  if (l < 1 && (r = n(r * l), a = n(a * l)), r < i || a < i) {
    const d = Math.max(i / r, i / a);
    r = n(r * d), a = n(a * d);
  }
  return {
    width: r,
    height: a
  };
}

function uao(e, t, n) {
  const r = Egr(t, n),
    a = `${r.width}x${r.height}`;
  if (e instanceof FormData) return e.set("size", a), a;
  e.size = a;
  const i = e.parameters;
  return i && typeof i == "object" && (i.size = a), typeof e.prompt == "string" && e.prompt.trim() && !e.prompt.includes(a) && (e.prompt = `${e.prompt.trim()}

请生成输出尺寸为 ${a} 的图片。`), a;
}

function hao(e, t, n = 1.5, r, a, i, o, s) {
  return new Promise((l, d) => {
    const u = new Image();
    u.crossOrigin = "anonymous", u.onload = () => {
      const h = u.naturalWidth,
        p = u.naturalHeight;
      if (h <= 0 || p <= 0) {
        d(new Error("图片尺寸无效"));
        return;
      }
      let m, f;
      const y = !t || t === "原比例" || t === "Auto";
      if (y) {
        if (r != null && a != null) {
          const C = Math.max(1, Math.min(5, r)),
            I = Math.max(1, Math.min(5, a));
          m = Math.round(h * C), f = Math.round(p * I);
        } else {
          const C = Math.max(1.1, Math.min(5, n));
          m = Math.round(h * C), f = Math.round(p * C);
        }
      } else {
        const C = Igr(t);
        f = Math.max(p, Math.ceil(h / C)), m = Math.round(f * C), m < h && (m = h, f = Math.max(p, Math.ceil(h / C)));
        const I = Math.max(1, Math.min(5, n));
        m = Math.round(m * I), f = Math.round(f * I);
      }
      const {
          offsetX: b,
          offsetY: v
        } = Cgr(m, f, h, p, y, i, o, s),
        _ = document.createElement("canvas");
      _.width = m, _.height = f;
      const w = _.getContext("2d");
      if (!w) {
        d(new Error("无法创建 Canvas 上下文"));
        return;
      }
      w.fillStyle = "#000000", w.fillRect(0, 0, m, f), w.drawImage(u, b, v, h, p);
      const k = document.createElement("canvas");
      k.width = m, k.height = f;
      const A = k.getContext("2d");
      if (!A) {
        d(new Error("无法创建蒙版 Canvas 上下文"));
        return;
      }
      A.fillStyle = "#ffffff", A.fillRect(0, 0, m, f), A.fillStyle = "#000000", A.fillRect(b, v, h, p);
      const S = k.toDataURL("image/png").split(",")[1];
      _.toBlob(C => {
        C ? l({
          compositeBlob: C,
          maskBase64: S,
          width: m,
          height: f
        }) : d(new Error("合成图 toBlob 失败"));
      }, "image/png");
    }, u.onerror = () => d(new Error("图片加载失败")), u.src = e;
  });
}

const w2 = [{
    id: "arri-alexa-35",
    name: "阿莱 Alexa 35",
    image: "arri-alexa-35-hW6-4chH.webp",
    prompt: "shot on Arri Alexa 35, legendary color science, organic highlights"
  }, {
    id: "arricam-lt",
    name: "Arricam LT",
    image: "arricam-lt-DEzXr_FR.webp",
    prompt: "shot on Arricam LT, 35mm movie film, authentic cinema texture"
  }, {
    id: "arriflex-435",
    name: "阿莱 435",
    image: "arriflex-435-DqI5jc3N.webp",
    prompt: "shot on Arriflex 435, high-speed cinematography, sharp grain"
  }, {
    id: "imax-keighley",
    name: "IMAX Keighley",
    image: "imax-keighley-Cu9FJnlP.webp",
    prompt: "shot on IMAX Keighley camera, ultra-large format, extreme immersion"
  }, {
    id: "panavision-dxl2",
    name: "潘那维申 DXL2",
    image: "panavision-dxl2-nu2CVKjg .webp",
    prompt: "shot on Panavision Millennium DXL2, 8K large format, cinematic depth"
  }, {
    id: "red-v-raptor",
    name: "RED 猛禽",
    image: "red-v-raptor-DOT1sij6.webp",
    prompt: "shot on Red V-Raptor, 8K raw texture, high dynamic range"
  }, {
    id: "sony-venice",
    name: "索尼 威尼斯",
    image: "sony-venice-BgicSddP.webp",
    prompt: "shot on Sony Venice, filmic skin tones, rich shadow detail"
  }, {
    id: "imax-film",
    name: "IMAX 胶片机",
    image: "IMAX Film Camera.webp",
    prompt: "shot on 70mm IMAX film camera, massive scale, detailed grain"
  }, {
    id: "arriflex-16sr",
    name: "阿莱 16SR",
    image: "Arriflex 16SR.webp",
    prompt: "shot on 16mm Arriflex 16SR, vintage film grain, 16mm look"
  }, {
    id: "arri-alexa-65",
    name: "阿莱 Alexa 65",
    image: "Alexa 65.webp",
    prompt: "shot on Arri Alexa 65, crystal clear optics, high dynamic range, stunning highlights roll-off, professional color grading, 8K resolution"
  }],
  x2 = [{
    id: "lensbaby",
    name: "Lensbaby",
    image: "Lensbaby.webp",
    prompt: "Lensbaby lens, selective focus, dreamy blur, creative tilt-shift",
    characteristics: "移轴虚化、梦幻焦点"
  }, {
    id: "hawk-v-lite",
    name: "Hawk V-Lite",
    image: "Hawk V-Lite.webp",
    prompt: "Hawk V-Lite anamorphic lens, blue streak flares, oval bokeh, cinematic widescreen",
    characteristics: "电影宽幅、椭圆光斑"
  }, {
    id: "hawk-class-x",
    name: "Hawk Class X",
    image: "hawk-class-x-CD3GvtF4.webp",
    prompt: "Hawk Class X anamorphic lens, vintage anamorphic character, soft flares",
    characteristics: "经典变形、柔和炫光"
  }, {
    id: "laowa-macro",
    name: "老蛙 宏观",
    image: "Laowa Macro.webp",
    prompt: "Laowa Macro lens, extreme close-up detail, razor-sharp focus",
    characteristics: "极限微距、细节纹理"
  }, {
    id: "canon-k35",
    name: "佳能 K-35",
    image: "canon-k35-BhokCUBz.webp",
    prompt: "vintage Canon K-35 lens, soft flares, 70s cinematic glow, warm highlights",
    characteristics: "复古柔光、暖调光晕"
  }, {
    id: "jdc-xtal",
    name: "JDC 变形镜头",
    image: "JDC Xtal Xpress.webp",
    prompt: "JDC Xtal Xpress anamorphic, vintage anamorphic texture, artistic flares",
    characteristics: "经典变形、艺术炫光"
  }, {
    id: "arri-signature",
    name: "阿莱 签名定焦",
    image: "arri-signature-prime-ZwjUyRcz.webp",
    prompt: "ARRI Signature Prime lens, natural bokeh, creamy fall-off, cinema-grade clarity",
    characteristics: "顶级通透、纯净质感"
  }, {
    id: "cooke-s4",
    name: "库克 S4",
    image: "cooke-s4-BKM_5Nte.webp",
    prompt: '"Cooke Look", warm skin tones, smooth organic texture',
    characteristics: "温暖肤色、有机质感"
  }, {
    id: "cooke-sf-18x",
    name: "库克 SF 18x",
    image: "cooke-sf-18x-BegGlnlc.webp",
    prompt: "Cooke SF 18x zoom lens, cinematic zoom character, smooth focus breathing",
    characteristics: "电影变焦、呼吸感"
  }, {
    id: "cooke-speed-panchro",
    name: "库克 Speed Panchro",
    image: "cooke-speed-panchro-jWogQ6i5.webp",
    prompt: "Cooke Speed Panchro vintage lens, classic Hollywood look, soft bokeh",
    characteristics: "复古库克、经典好莱坞"
  }, {
    id: "petzval",
    name: "佩兹瓦尔",
    image: "Petzval.webp",
    prompt: "Petzval lens, swirly bokeh, sharp center focus",
    characteristics: "旋转焦外、中心锐利"
  }, {
    id: "helios",
    name: "八羽怪",
    image: "helios-CWg35ubk.webp",
    prompt: "Helios 44-2 lens, distinctive swirly bokeh, vintage character",
    characteristics: "俄产老镜、独特旋焦"
  }, {
    id: "zeiss-ultra",
    name: "蔡司 Ultra Prime",
    image: "zeiss-ultra-prime-DdBHzrBr.webp",
    prompt: "Zeiss Ultra Prime lens, high contrast, clinical sharpness",
    characteristics: "手术刀般的锐利清晰"
  }, {
    id: "panavision-c",
    name: "潘那维申 C系列",
    image: "panavision-c-series-LLl1Xpct.webp",
    prompt: "Panavision C-Series anamorphic, classic blue flares",
    characteristics: "好莱坞经典蓝炫光"
  }, {
    id: "panavision-primo",
    name: "潘那维申 Primo",
    image: "panavision-primo-Cui4J6lP.webp",
    prompt: "Panavision Primo lens, high color saturation, iconic sharpness",
    characteristics: "高饱和、标志性锐利"
  }],
  _2 = [{
    id: "fl-8",
    value: 8,
    name: "超广角",
    prompt: "ultra-wide angle, expansive perspective"
  }, {
    id: "fl-14",
    value: 14,
    name: "超广角",
    prompt: "ultra-wide angle, expansive perspective"
  }, {
    id: "fl-24",
    value: 24,
    name: "叙事广角",
    prompt: "wide angle, storytelling environment"
  }, {
    id: "fl-35",
    value: 35,
    name: "叙事广角",
    prompt: "wide angle, storytelling environment"
  }, {
    id: "fl-50",
    value: 50,
    name: "标准镜头",
    prompt: "standard lens, human eye perspective"
  }, {
    id: "fl-85",
    value: 85,
    name: "肖像长焦",
    prompt: "telephoto, shallow depth of field, creamy bokeh"
  }, {
    id: "fl-135",
    value: 135,
    name: "肖像长焦",
    prompt: "telephoto, shallow depth of field, creamy bokeh"
  }],
  k2 = [{
    id: "f1.4",
    value: "f/1.4",
    image: "f1_4-DoQLC9Jc.webp",
    name: "大光圈",
    prompt: "f/1.4 aperture, extremely shallow depth of field, creamy bokeh, subject isolation, dreamy background blur"
  }, {
    id: "f4",
    value: "f/4",
    image: "f4-Or-YmP2I.webp",
    name: "中光圈",
    prompt: "f/4 aperture, balanced depth of field, moderate bokeh, natural subject separation"
  }, {
    id: "f11",
    value: "f/11",
    image: "f-11.webp",
    name: "小光圈",
    prompt: "f/11 aperture, deep depth of field, sharp foreground and background, landscape clarity"
  }],
  yAe = e => {
    const t = [],
      n = w2.find(o => o.id === e.cameraId),
      r = x2.find(o => o.id === e.lensId),
      a = _2.find(o => o.id === e.focalLengthId),
      i = k2.find(o => o.id === e.apertureId);
    return n && t.push(n.prompt), r && t.push(r.prompt), a && t.push(`${a.value}mm, ${a.prompt}`), i && t.push(i.prompt), t.join(", ");
  },
  pao = ({
    isOpen: e,
    onClose: t,
    isDark: n,
    cinemaConfig: r,
    onConfigChange: a
  }) => {
    if (on(), !e) return null;
    const i = w2.find(m => m.id === r.cameraId),
      o = x2.find(m => m.id === r.lensId),
      s = _2.find(m => m.id === r.focalLengthId),
      l = k2.find(m => m.id === r.apertureId),
      d = m => {
        a({
          ...r,
          cameraId: r.cameraId === m ? null : m
        });
      },
      u = m => {
        a({
          ...r,
          lensId: r.lensId === m ? null : m
        });
      },
      h = m => {
        a({
          ...r,
          focalLengthId: r.focalLengthId === m ? null : m
        });
      },
      p = m => {
        a({
          ...r,
          apertureId: r.apertureId === m ? null : m
        });
      };
    return c.jsxs("div", {
      className: "fixed inset-0 z-50 flex items-center justify-center",
      children: [c.jsx("div", {
        className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
        onClick: t
      }), c.jsxs("div", {
        className: "relative w-[800px] max-h-[85vh] bg-zinc-900/95 backdrop-blur-xl rounded-2xl border border-zinc-700/50 shadow-2xl overflow-hidden flex flex-col",
        children: [c.jsxs("div", {
          className: "flex items-center justify-between p-4 border-b border-zinc-700/50",
          children: [c.jsxs("div", {
            className: "flex items-center gap-3",
            children: [c.jsx(Kh, {
              size: 20,
              className: "text-blue-400"
            }), c.jsx("span", {
              className: "text-white font-medium text-lg",
              children: x("专业摄像机配置")
            })]
          }), c.jsx("button", {
            onClick: t,
            className: "p-1.5 rounded-lg hover:bg-zinc-700/50 text-zinc-400 hover:text-white transition-colors",
            children: c.jsx(Na, {
              size: 18
            })
          })]
        }), c.jsx("div", {
          className: "px-4 py-3 bg-zinc-800/50 border-b border-zinc-700/30",
          children: c.jsxs("div", {
            className: "flex items-center gap-4 text-sm",
            children: [c.jsx("span", {
              className: "text-zinc-500",
              children: x("当前配置:")
            }), c.jsxs("div", {
              className: "flex items-center gap-3",
              children: [c.jsxs("div", {
                className: "flex items-center gap-1.5",
                children: [c.jsx(Kh, {
                  size: 14,
                  className: "text-blue-400"
                }), c.jsx("span", {
                  className: i ? "text-white" : "text-zinc-500",
                  children: (i == null ? void 0 : i.name) || x("未选择")
                })]
              }), c.jsx("span", {
                className: "text-zinc-600",
                children: "+"
              }), c.jsxs("div", {
                className: "flex items-center gap-1.5",
                children: [c.jsx(kS, {
                  size: 14,
                  className: "text-purple-400"
                }), c.jsx("span", {
                  className: o ? "text-white" : "text-zinc-500",
                  children: (o == null ? void 0 : o.name) || x("未选择")
                })]
              }), c.jsx("span", {
                className: "text-zinc-600",
                children: "+"
              }), c.jsxs("div", {
                className: "flex items-center gap-1.5",
                children: [c.jsx(Xle, {
                  size: 14,
                  className: "text-green-400"
                }), c.jsx("span", {
                  className: s ? "text-white" : "text-zinc-500",
                  children: s ? `${s.value}mm` : x("未选择")
                })]
              }), c.jsx("span", {
                className: "text-zinc-600",
                children: "+"
              }), c.jsxs("div", {
                className: "flex items-center gap-1.5",
                children: [c.jsx(kS, {
                  size: 14,
                  className: "text-orange-400"
                }), c.jsx("span", {
                  className: l ? "text-white" : "text-zinc-500",
                  children: (l == null ? void 0 : l.value) || x("未选择")
                })]
              })]
            })]
          })
        }), c.jsxs("div", {
          className: "flex-1 overflow-y-auto p-4 space-y-6",
          children: [c.jsxs("div", {
            children: [c.jsxs("div", {
              className: "flex items-center gap-2 mb-3",
              children: [c.jsx(Kh, {
                size: 16,
                className: "text-blue-400"
              }), c.jsx("span", {
                className: "text-white font-medium",
                children: x("摄像机")
              }), c.jsxs("span", {
                className: "text-zinc-500 text-xs",
                children: ["(", w2.length, x("款)")]
              })]
            }), c.jsx("div", {
              className: "flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent",
              children: w2.map(m => c.jsxs("div", {
                onClick: () => d(m.id),
                className: `flex-shrink-0 w-32 cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-200 ${r.cameraId === m.id ? "border-blue-500 ring-2 ring-blue-500/30 scale-105" : "border-zinc-700/50 hover:border-zinc-600"}`,
                children: [c.jsx("div", {
                  className: "w-32 h-32 bg-zinc-800 flex items-center justify-center overflow-hidden",
                  children: c.jsx("img", {
                    src: `/cinema/${m.image}`,
                    alt: x(m.name),
                    className: "w-full h-full object-cover",
                    onError: f => {
                      f.target.style.display = "none";
                    }
                  })
                }), c.jsx("div", {
                  className: "p-2 bg-zinc-800/80 text-center",
                  children: c.jsx("span", {
                    className: "text-white text-sm font-medium",
                    children: x(m.name)
                  })
                })]
              }, m.id))
            })]
          }), c.jsxs("div", {
            children: [c.jsxs("div", {
              className: "flex items-center gap-2 mb-3",
              children: [c.jsx(kS, {
                size: 16,
                className: "text-purple-400"
              }), c.jsx("span", {
                className: "text-white font-medium",
                children: x("镜头")
              }), c.jsxs("span", {
                className: "text-zinc-500 text-xs",
                children: ["(", x2.length, x("款)")]
              })]
            }), c.jsx("div", {
              className: "flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent",
              children: x2.map(m => c.jsxs("div", {
                onClick: () => u(m.id),
                className: `flex-shrink-0 w-28 cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-200 ${r.lensId === m.id ? "border-purple-500 ring-2 ring-purple-500/30 scale-105" : "border-zinc-700/50 hover:border-zinc-600"}`,
                children: [c.jsx("div", {
                  className: "w-28 h-28 bg-zinc-800 flex items-center justify-center overflow-hidden",
                  children: c.jsx("img", {
                    src: `/cinema/${m.image}`,
                    alt: m.name,
                    className: "w-full h-full object-cover",
                    onError: f => {
                      f.target.style.display = "none";
                    }
                  })
                }), c.jsxs("div", {
                  className: "p-2 bg-zinc-800/80 text-center",
                  children: [c.jsx("span", {
                    className: "text-white text-xs font-medium block",
                    children: m.name
                  }), c.jsx("span", {
                    className: "text-zinc-400 text-[10px] block mt-0.5",
                    children: x(m.characteristics)
                  })]
                })]
              }, m.id))
            })]
          }), c.jsxs("div", {
            children: [c.jsxs("div", {
              className: "flex items-center gap-2 mb-3",
              children: [c.jsx(Xle, {
                size: 16,
                className: "text-green-400"
              }), c.jsx("span", {
                className: "text-white font-medium",
                children: x("焦段")
              }), c.jsxs("span", {
                className: "text-zinc-500 text-xs",
                children: ["(", _2.length, x("个)")]
              })]
            }), c.jsx("div", {
              className: "flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent",
              children: _2.map(m => c.jsxs("div", {
                onClick: () => h(m.id),
                className: `flex-shrink-0 w-20 h-20 cursor-pointer rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center ${r.focalLengthId === m.id ? "border-green-500 ring-2 ring-green-500/30 bg-green-500/10 scale-105" : "border-zinc-700/50 hover:border-zinc-600 bg-zinc-800/50"}`,
                children: [c.jsx("span", {
                  className: `text-2xl font-bold ${r.focalLengthId === m.id ? "text-green-400" : "text-white"}`,
                  children: m.value
                }), c.jsx("span", {
                  className: "text-zinc-500 text-xs",
                  children: "mm"
                }), c.jsx("span", {
                  className: "text-zinc-400 text-[10px] mt-1",
                  children: x(m.name)
                })]
              }, m.id))
            })]
          }), c.jsxs("div", {
            children: [c.jsxs("div", {
              className: "flex items-center gap-2 mb-3",
              children: [c.jsx(kS, {
                size: 16,
                className: "text-orange-400"
              }), c.jsx("span", {
                className: "text-white font-medium",
                children: x("光圈")
              }), c.jsxs("span", {
                className: "text-zinc-500 text-xs",
                children: ["(", k2.length, x("个)")]
              })]
            }), c.jsx("div", {
              className: "flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent",
              children: k2.map(m => c.jsxs("div", {
                onClick: () => p(m.id),
                className: `flex-shrink-0 w-32 cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-200 ${r.apertureId === m.id ? "border-orange-500 ring-2 ring-orange-500/30 scale-105" : "border-zinc-700/50 hover:border-zinc-600"}`,
                children: [c.jsx("div", {
                  className: "w-32 h-32 bg-zinc-800 flex items-center justify-center overflow-hidden",
                  children: c.jsx("img", {
                    src: `/cinema/${m.image}`,
                    alt: m.value,
                    className: "w-full h-full object-cover",
                    onError: f => {
                      f.target.style.display = "none";
                    }
                  })
                }), c.jsxs("div", {
                  className: "p-2 bg-zinc-800/80 text-center",
                  children: [c.jsx("span", {
                    className: "text-white text-sm font-medium block",
                    children: m.value
                  }), c.jsx("span", {
                    className: "text-zinc-400 text-[10px] block mt-0.5",
                    children: x(m.name)
                  })]
                })]
              }, m.id))
            })]
          }), (r.cameraId || r.lensId || r.focalLengthId || r.apertureId) && c.jsxs("div", {
            className: "mt-4 p-3 bg-zinc-800/50 rounded-xl border border-zinc-700/30",
            children: [c.jsx("div", {
              className: "text-zinc-400 text-xs mb-2",
              children: x("生成的提示词补充:")
            }), c.jsx("div", {
              className: "text-blue-300 text-sm font-mono",
              children: yAe(r)
            })]
          })]
        }), c.jsxs("div", {
          className: "p-4 border-t border-zinc-700/50 flex justify-between items-center",
          children: [c.jsx("button", {
            onClick: () => a({
              cameraId: null,
              lensId: null,
              focalLengthId: null,
              apertureId: null
            }),
            className: "px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors",
            children: x("清空选择")
          }), c.jsx("button", {
            onClick: t,
            className: "px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors",
            children: x("确认应用")
          })]
        })]
      })]
    });
  };

g.memo(pao);

const Xde = [{
    id: "static",
    name: "定",
    nameEn: "Static",
    icon: "pause",
    prompt: "stable static shot, no camera movement, fixed frame"
  }, {
    id: "dolly-in",
    name: "推",
    nameEn: "Dolly In",
    icon: "move-right",
    prompt: "dolly in, camera moving closer to subject, dynamic push-in"
  }, {
    id: "dolly-out",
    name: "拉",
    nameEn: "Dolly Out",
    icon: "move-left",
    prompt: "dolly out, camera pulling back, expanding perspective"
  }, {
    id: "pan",
    name: "摇",
    nameEn: "Pan",
    icon: "rotate-cw",
    prompt: "smooth horizontal panning shot, rotating on X-axis"
  }, {
    id: "truck",
    name: "移",
    nameEn: "Truck",
    icon: "move-horizontal",
    prompt: "lateral trucking shot, side-to-side tracking movement"
  }, {
    id: "follow",
    name: "跟",
    nameEn: "Follow",
    icon: "user",
    prompt: "tracking shot, following the subject from behind or side"
  }, {
    id: "orbit",
    name: "绕",
    nameEn: "Orbit",
    icon: "circle",
    prompt: "360-degree orbital shot, camera circling the subject"
  }, {
    id: "whip-pan",
    name: "甩",
    nameEn: "Whip Pan",
    icon: "zap",
    prompt: "rapid whip pan, motion blur during transition"
  }, {
    id: "crash",
    name: "冲",
    nameEn: "Crash Zoom",
    icon: "target",
    prompt: "fast crash zoom, sudden dramatic focal length change"
  }],
  Jde = [{
    id: "forward",
    name: "向前",
    nameEn: "Forward",
    icon: "arrow-right",
    prompt: "moving forward, retreating backward"
  }, {
    id: "backward",
    name: "向后",
    nameEn: "Backward",
    icon: "arrow-left",
    prompt: "retreating backward"
  }, {
    id: "left",
    name: "向左",
    nameEn: "Left",
    icon: "arrow-left",
    prompt: "sliding left"
  }, {
    id: "right",
    name: "向右",
    nameEn: "Right",
    icon: "arrow-right",
    prompt: "sliding right"
  }, {
    id: "up",
    name: "向上",
    nameEn: "Up",
    icon: "arrow-up",
    prompt: "boom up, ascending"
  }, {
    id: "down",
    name: "向下",
    nameEn: "Down",
    icon: "arrow-down",
    prompt: "boom down, descending"
  }],
  Zde = [{
    id: "eye-level",
    name: "平视",
    nameEn: "Eye Level",
    icon: "eye",
    prompt: "eye-level shot, neutral perspective"
  }, {
    id: "low-angle",
    name: "低昂",
    nameEn: "Low Angle",
    icon: "trending-up",
    prompt: "low angle shot, heroic perspective, looking up"
  }, {
    id: "high-angle",
    name: "高俯",
    nameEn: "High Angle",
    icon: "trending-down",
    prompt: "high angle shot, looking down at the subject"
  }, {
    id: "overhead",
    name: "上帝视角",
    nameEn: "Overhead",
    icon: "maximize",
    prompt: "top-down shot, overhead view, vertical down angle"
  }, {
    id: "birds-eye",
    name: "鸟瞰",
    nameEn: "Bird's Eye",
    icon: "navigation",
    prompt: "bird's eye view, high altitude aerial perspective"
  }, {
    id: "pov",
    name: "POV",
    nameEn: "POV",
    icon: "user",
    prompt: "first-person perspective, subjective camera, POV"
  }, {
    id: "dutch",
    name: "荷兰角",
    nameEn: "Dutch Angle",
    icon: "rotate-ccw",
    prompt: "dutch angle, canted frame, tilted horizon line"
  }],
  eue = [{
    id: "fast",
    name: "快速",
    nameEn: "Fast",
    icon: "fast-forward",
    prompt: "cinematic fast motion"
  }, {
    id: "slow",
    name: "慢速",
    nameEn: "Slow",
    icon: "rewind",
    prompt: "slow gentle camera drift"
  }, {
    id: "turn-30",
    name: "30°",
    nameEn: "Subtle",
    icon: "corner-up-right",
    prompt: "subtle 30-degree turn"
  }, {
    id: "turn-90",
    name: "90°",
    nameEn: "Quarter",
    icon: "corner-right-down",
    prompt: "90-degree quarter turn"
  }, {
    id: "turn-180",
    name: "180°",
    nameEn: "Half",
    icon: "refresh-cw",
    prompt: "180-degree half rotation"
  }, {
    id: "turn-360",
    name: "360°",
    nameEn: "Full",
    icon: "rotate-cw",
    prompt: "full 360-degree circular rotation"
  }],
  tue = [{
    id: "one-point",
    name: "单点透视",
    nameEn: "One-point",
    icon: "box",
    prompt: "one-point perspective, symmetrical composition, Kubrick style"
  }, {
    id: "dolly-zoom",
    name: "希区柯克变焦",
    nameEn: "Dolly Zoom",
    icon: "maximize-2",
    prompt: "Hitchcock zoom, vertigo effect, simultaneous track and zoom"
  }, {
    id: "snap-zoom",
    name: "昆汀快速变焦",
    nameEn: "Snap Zoom",
    icon: "zoom-in",
    prompt: "snap zoom, sudden rapid zoom-in on subject"
  }, {
    id: "inception",
    name: "盗梦空间旋转",
    nameEn: "Inception",
    icon: "refresh-ccw",
    prompt: "inception style roll, 360-degree barrel roll, rotating frame"
  }, {
    id: "bullet-time",
    name: "子弹时间",
    nameEn: "Bullet Time",
    icon: "clock",
    prompt: "bullet time, frozen time, rotating around still subject"
  }, {
    id: "slow-motion",
    name: "升格慢动作",
    nameEn: "Slow Motion",
    icon: "clock",
    prompt: "cinematic slow motion, high frame rate, overcranked"
  }],
  nue = [{
    id: "fpv-drone",
    name: "FPV穿越机",
    nameEn: "FPV Drone",
    icon: "navigation-2",
    prompt: "FPV drone shot, fast low-altitude agile flight"
  }, {
    id: "aerial",
    name: "航拍",
    nameEn: "Aerial",
    icon: "plane",
    prompt: "wide aerial drone shot, high altitude sweeping view"
  }, {
    id: "handheld",
    name: "手持运镜",
    nameEn: "Handheld",
    icon: "smartphone",
    prompt: "handheld movement, organic camera shake, raw texture"
  }, {
    id: "crane",
    name: "摇臂",
    nameEn: "Crane",
    icon: "git-branch",
    prompt: "jib/crane shot, smooth vertical and sweeping movement"
  }, {
    id: "robot-arm",
    name: "机械臂",
    nameEn: "Robot Arm",
    icon: "cpu",
    prompt: "robot arm shot, precise mechanical movement"
  }, {
    id: "action-cam",
    name: "运动相机",
    nameEn: "Action Cam",
    icon: "video",
    prompt: "GoPro style, wide-angle distortion, action-cam aesthetic"
  }],
  d5 = e => e == null ? [] : Array.isArray(e) ? e : [e],
  QQ = e => {
    const t = [];
    return d5(e.movementId).forEach(n => {
      const r = Xde.find(a => a.id === n);
      r && t.push(r.prompt);
    }), d5(e.directionId).forEach(n => {
      const r = Jde.find(a => a.id === n);
      r && t.push(r.prompt);
    }), d5(e.angleId).forEach(n => {
      const r = Zde.find(a => a.id === n);
      r && t.push(r.prompt);
    }), d5(e.speedId).forEach(n => {
      const r = eue.find(a => a.id === n);
      r && t.push(r.prompt);
    }), d5(e.styleId).forEach(n => {
      const r = tue.find(a => a.id === n);
      r && t.push(r.prompt);
    }), d5(e.deviceId).forEach(n => {
      const r = nue.find(a => a.id === n);
      r && t.push(r.prompt);
    }), t.join(", ");
  },
  mao = e => {
    const t = [...Xde, ...Jde, ...Zde, ...eue, ...tue, ...nue];
    let n = e;
    e.includes("：") && (n = e.split("：")[1]);
    const r = t.find(a => a.name === n);
    return r ? r.prompt : null;
  },
  fao = e => {
    const t = /【([^】]+)】/g;
    return e.replace(t, (n, r) => {
      const a = mao(r);
      return a || n;
    });
  },
  gao = e => {
    const t = [];
    return d5(e.movementId).forEach(n => {
      const r = Xde.find(a => a.id === n);
      r && t.push(`[${r.name}]`);
    }), d5(e.directionId).forEach(n => {
      const r = Jde.find(a => a.id === n);
      r && t.push(`[${r.name}]`);
    }), d5(e.angleId).forEach(n => {
      const r = Zde.find(a => a.id === n);
      r && t.push(`[${r.name}]`);
    }), d5(e.speedId).forEach(n => {
      const r = eue.find(a => a.id === n);
      r && t.push(`[${r.name}]`);
    }), d5(e.styleId).forEach(n => {
      const r = tue.find(a => a.id === n);
      r && t.push(`[${r.name}]`);
    }), d5(e.deviceId).forEach(n => {
      const r = nue.find(a => a.id === n);
      r && t.push(`[${r.name}]`);
    }), t.join(" + ");
  },
  yao = 1e4,
  bao = 720,
  _St = ["2K", "4K", "8K"];

async function aUt(e) {
  var i, o, s;
  if (e.status !== "confirmation_required") return e;
  if (!((i = e.submit_id) != null && i.startsWith("canvas-generation:") || (o = e.submit_id) != null && o.startsWith("canvas-upscale:")) || !((s = e.node_id) != null && s.startsWith("node_"))) throw new Error("即梦画布未返回有效任务身份");
  if (typeof e.credit_ceiling != "number" || !Number.isSafeInteger(e.credit_ceiling) || e.credit_ceiling < 0) throw new Error("即梦画布未返回有效积分报价");
  const {
    ask: t
  } = await Ie(async () => {
    const {
      ask: l
    } = await Promise.resolve().then(() => Sb);
    return {
      ask: l
    };
  }, void 0, import.meta.url);
  if (!(await t(`本次即梦画布生成最多消耗 ${e.credit_ceiling} 积分，是否继续？`, {
    title: "即梦生成积分确认",
    kind: "info",
    okLabel: "确认生成",
    cancelLabel: "取消"
  }))) throw new Error("已取消生成，未提交扣费任务");
  const r = await fetch(`${IT}/api/jimeng/canvas/confirm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        submit_id: e.submit_id,
        node_id: e.node_id,
        credit_ceiling: e.credit_ceiling,
        resolution: e.resolution
      })
    }).catch(() => {
      throw new Qz({
        submitId: e.submit_id || "",
        kind: e.kind,
        message: "积分确认后连接中断，请刷新原任务查询，避免重复提交"
      });
    }),
    a = await r.json().catch(() => {
      throw new Qz({
        submitId: e.submit_id,
        kind: e.kind,
        message: "积分确认结果无法读取，请刷新原任务查询"
      });
    });
  if (!r.ok) throw new Error(a.detail || a.error || "积分确认失败");
  return a;
}

function qye(e, t) {
  var a;
  const n = _Y(e),
    r = t.get(e) || ((a = [...t].find(([i]) => _Y(i) === n)) == null ? void 0 : a[1]);
  return r || {
    type: /\.(mp4|mov|webm)(?:[?#]|$)|^data:video\//i.test(e) ? "video" : /\.(mp3|wav|m4a|aac|ogg|flac)(?:[?#]|$)|^data:audio\//i.test(e) ? "audio" : "image"
  };
}

function vao(e, t, n) {
  if (n) {
    if (!n.first) throw new Error("首尾帧模式请先连接首帧");
    return {
      images: [{
        url: n.first,
        role: "first_frame"
      }, ...(n.last ? [{
        url: n.last,
        role: "last_frame"
      }] : [])],
      videos: [],
      audios: []
    };
  }
  const r = [],
    a = [],
    i = [];
  for (const o of e) {
    const {
      type: s
    } = qye(o, t);
    s === "video" ? a.push(o) : s === "audio" ? i.push(o) : r.push({
      url: o
    });
  }
  return {
    images: r,
    videos: a,
    audios: i
  };
}

function wao(e) {
  var v, _;
  const {
      node: t,
      modelId: n,
      metadata: r,
      frames: a
    } = e,
    i = Zae(n),
    o = w => !i || qye(w, r).type === "image",
    s = e.connectedUrls.filter(o),
    l = a ? [a.first, a.last].filter(w => !!w) : Nue({
      fromConnections: s,
      fromSettings: (((v = t.settings) == null ? void 0 : v.referenceImages) || []).filter(o),
      order: (_ = t.settings) == null ? void 0 : _.inputImageOrder,
      connectionAssetIds: s.map(w => qye(w, r).assetId)
    }),
    d = vao(l, r, a),
    u = jx(n);
  if (!u) throw new Error("此旧型号未在官方画布 CLI 当前目录中提供，请重新选择即梦模型");
  const h = u.limits,
    p = [d.images.length, d.videos.length, d.audios.length];
  if (p.some((w, k) => w > h[k]) || p.reduce((w, k) => w + k, 0) > h[3]) throw new Error(i ? `即梦生图最多支持 ${h[0]} 张参考图` : `此模型最多支持 ${h[0]} 张图、${h[1]} 段视频、${h[2]} 段音频，总计 ${h[3]} 个素材`);
  const m = {
      image: 0,
      video: 0,
      audio: 0
    },
    f = l.map(w => {
      const k = a ? "image" : qye(w, r).type,
        A = ++m[k];
      return k === "image" ? `图片${A}` : `第${A}段参考${k === "video" ? "视频" : "音频"}`;
    }),
    y = e.prompt.replace(ET, w => {
      const k = v3(w);
      if (!k || !f[k - 1]) throw new Error(`参考标签 ${w} 没有对应素材，请重新选择参考图片或视频`);
      return f[k - 1];
    }),
    b = new Map();
  for (const w of l) {
    const k = qye(w, r).assetId;
    k && b.set(w, k);
  }
  return {
    ...d,
    prompt: y,
    referenceAssetIds: b
  };
}

class Qz extends Error {
  constructor(n) {
    super(n.message || "即梦任务排队中，可继续等待或手动查询");
    On(this, "jimengPending", !0);
    On(this, "submitId");
    On(this, "kind");
    On(this, "queueInfo");
    this.submitId = n.submitId, this.kind = n.kind === "video" ? "video" : "image", this.queueInfo = n.queueInfo || {};
  }
}

function xao(e) {
  const t = String(e || "").trim().match(/^(\d+(?:\.\d+)?)\s*:\s*(\d+(?:\.\d+)?)$/);
  if (!t) return null;
  const n = Number(t[1]),
    r = Number(t[2]);
  return n > 0 && r > 0 ? n / r : null;
}

async function _ao(e, t) {
  const n = xao(t);
  if (!n) return e;
  const r = URL.createObjectURL(e);
  try {
    const a = await new Promise((f, y) => {
        const b = new Image();
        b.onload = () => f(b), b.onerror = () => y(new Error("无法读取即梦参考图")), b.src = r;
      }),
      i = a.naturalWidth / a.naturalHeight;
    if (Math.abs(i - n) < .005) return e;
    const o = 2048;
    let s = Math.max(a.naturalWidth, Math.round(a.naturalHeight * n)),
      l = Math.round(s / n);
    if (Math.max(s, l) > o) {
      const f = o / Math.max(s, l);
      s = Math.round(s * f), l = Math.round(l * f);
    }
    const d = document.createElement("canvas");
    d.width = s, d.height = l;
    const u = d.getContext("2d");
    if (!u) return e;
    u.fillStyle = "#000", u.fillRect(0, 0, s, l);
    const h = Math.min(s / a.naturalWidth, l / a.naturalHeight),
      p = Math.round(a.naturalWidth * h),
      m = Math.round(a.naturalHeight * h);
    return u.drawImage(a, Math.round((s - p) / 2), Math.round((l - m) / 2), p, m), await new Promise((f, y) => d.toBlob(b => b ? f(b) : y(new Error("即梦参考图画幅处理失败")), "image/png"));
  } finally {
    URL.revokeObjectURL(r);
  }
}

async function ewe(e, t, n, r, a) {
  const i = String(e || "").trim();
  if (!i) return i;
  const {
      prepareAssetForModel: o,
      materializePreparedAssetBlob: s
    } = await Ie(async () => {
      const {
        prepareAssetForModel: v,
        materializePreparedAssetBlob: _
      } = await Promise.resolve().then(() => up);
      return {
        prepareAssetForModel: v,
        materializePreparedAssetBlob: _
      };
    }, void 0, import.meta.url),
    {
      resolveGlobalOssThumbnailToOriginalUrl: l
    } = await Ie(async () => {
      const {
        resolveGlobalOssThumbnailToOriginalUrl: v
      } = await Promise.resolve().then(() => ii);
      return {
        resolveGlobalOssThumbnailToOriginalUrl: v
      };
    }, void 0, import.meta.url),
    {
      stripOssImageProcessParams: d
    } = await Ie(async () => {
      const {
        stripOssImageProcessParams: v
      } = await Promise.resolve().then(() => h6r);
      return {
        stripOssImageProcessParams: v
      };
    }, void 0, import.meta.url),
    u = /^https?:\/\//i.test(i) ? d(l(i) || i) : i;
  let h;
  try {
    const v = await o({
      assetRef: u,
      assetId: r,
      modelId: "jimeng-cli",
      purpose: `${t}-reference`,
      requestedTransportMode: "direct-file",
      allowReadVideoBlob: !0
    });
    if (!a && v.type === "local-file") return v.absolutePath;
    if (!a && v.type === "url") return v.url;
    h = await s(v, {
      allowReadVideoBlob: !0
    });
  } catch {
    h = await Ns(u, {
      compressForApi: !1
    });
  }
  a && t === "image" && (h = await _ao(h, a));
  const {
      tempDir: p,
      join: m
    } = await Ie(async () => {
      const {
        tempDir: v,
        join: _
      } = await Promise.resolve().then(() => wT);
      return {
        tempDir: v,
        join: _
      };
    }, void 0, import.meta.url),
    {
      writeBlobToFile: f
    } = await Ie(async () => {
      const {
        writeBlobToFile: v
      } = await Promise.resolve().then(() => hg);
      return {
        writeBlobToFile: v
      };
    }, void 0, import.meta.url),
    y = {
      "image/jpeg": "jpg",
      "image/webp": "webp",
      "video/webm": "webm",
      "video/quicktime": "mov",
      "audio/wav": "wav",
      "audio/x-wav": "wav",
      "audio/mp4": "m4a",
      "audio/ogg": "ogg",
      "audio/flac": "flac"
    }[h.type] || (t === "image" ? "png" : t === "video" ? "mp4" : "mp3"),
    b = await m(await p(), `jimeng_canvas_ref_${crypto.randomUUID()}.${y}`);
  return n.push(b), await f(b, h), b;
}

async function iUt(e) {
  if (!e.length) return;
  const {
    remove: t
  } = await Ie(async () => {
    const {
      remove: n
    } = await Promise.resolve().then(() => oc);
    return {
      remove: n
    };
  }, void 0, import.meta.url);
  await Promise.allSettled(e.map(n => t(n)));
}

async function oUt(e, t, n) {
  var r;
  for (let a = 0; a < bao; a++) {
    let i;
    try {
      i = await y9n(e, t);
    } catch (u) {
      const h = `即梦任务已提交，查询暂时失败，可手动查询：${u instanceof Error ? u.message : String(u)}`;
      throw n == null || n(h), new Qz({
        submitId: e,
        kind: t,
        message: h
      });
    }
    if (i.status === "succeeded" && ((r = i.urls) != null && r.length)) return i.urls.map(VY);
    if (i.status === "failed") throw new Error(i.error || "即梦任务失败");
    const o = i.queue_info || {},
      s = o.queue_idx,
      l = o.queue_length,
      d = s != null && l != null ? `即梦云端排队中（第 ${s}/${l} 位）` : i.message || "即梦云端生成中";
    n == null || n(d), await new Promise(u => setTimeout(u, yao));
  }
  throw new Qz({
    submitId: e,
    kind: t,
    message: "即梦任务仍在排队，可稍后手动查询"
  });
}

function kao(e) {
  var n;
  const t = String(((n = e.settings) == null ? void 0 : n.resolution) || "").trim();
  if (!(!t || /^auto$/i.test(t))) return t;
}

async function Tmn(e) {
  var h, p, m;
  const {
      node: t,
      modelId: n,
      prompt: r,
      referenceImages: a,
      onProgress: i,
      onSubmitted: o,
      referenceAssetIds: s,
      forceSize: l
    } = e,
    d = f9n(n);
  if (l) throw new Error("画布 CLI 不支持自定义扩图尺寸，请选择其他渠道的模型");
  await ahe();
  const u = [];
  try {
    const f = ((h = jx(n)) == null ? void 0 : h.limits[0]) ?? 10;
    if (a.length > f) throw new Error(`即梦生图最多支持 ${f} 张参考图`);
    const y = [];
    for (const w of a) y.push(await ewe(w, "image", u, s == null ? void 0 : s.get(w)));
    const b = await fetch(`${IT}/api/jimeng/generate/image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: r,
          model: d,
          aspect_ratio: (p = t.settings) == null ? void 0 : p.ratio,
          resolution: kao(t),
          reference_images: y.filter(Boolean)
        })
      }),
      v = await aUt(await b.json());
    if (!b.ok && b.status !== 202) throw new Error(String(v.detail || v.error || `即梦文生图失败 HTTP ${b.status}`));
    const _ = String(v.submit_id || v.submitId || "").trim();
    if (_ && (o == null || o(_)), v.status === "succeeded" && ((m = v.urls) != null && m.length)) return v.urls.map(VY);
    if (v.jimeng_pending || b.status === 202 || v.status === "pending") {
      if (!_) throw new Error(v.message || "即梦任务排队中但未返回 submit_id");
      return oUt(_, "image", i);
    }
    throw new Error(v.message || v.error || "即梦 CLI 未返回图片");
  } finally {
    await iUt(u);
  }
}

async function Aao(e) {
  var r, a;
  const t = e.resolution.trim().toUpperCase();
  if (!_St.some(i => i === t)) throw new Error("即梦超清仅支持 2K、4K、8K");
  if (!e.image.trim()) throw new Error("请先连接输入图片");
  await ahe();
  const n = [];
  try {
    const i = await ewe(e.image, "image", n, e.assetId),
      o = await fetch(`${IT}/api/jimeng/upscale/image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image: i,
          resolution: t.toLowerCase()
        })
      }),
      s = await aUt(await o.json());
    if (!o.ok && o.status !== 202) throw new Error(s.detail || s.error || `即梦超清失败 HTTP ${o.status}`);
    const l = String(s.submit_id || "").trim();
    if (l && ((r = e.onSubmitted) == null || r.call(e, l)), s.status === "succeeded" && ((a = s.urls) != null && a.length)) return s.urls.map(VY);
    if (s.jimeng_pending || o.status === 202 || s.status === "pending") {
      if (!l) throw new Error("即梦超清任务未返回 submit_id");
      return oUt(l, "image", e.onProgress);
    }
    throw new Error(s.message || s.error || "即梦 CLI 未返回超清结果");
  } finally {
    await iUt(n);
  }
}

async function Sao(e) {
  var y, b, v, _, w;
  const {
      node: t,
      modelId: n,
      prompt: r,
      referenceImages: a,
      videoUrls: i = [],
      audioUrls: o = [],
      duration: s,
      aspectRatio: l,
      resolution: d,
      onProgress: u,
      onSubmitted: h,
      referenceAssetIds: p
    } = e,
    m = f9n(n);
  await ahe();
  const f = [];
  try {
    const k = l || ((y = t.settings) == null ? void 0 : y.ratio),
      A = ((b = jx(n)) == null ? void 0 : b.model) === "seedance_pro_fast" ? k : void 0,
      S = [];
    for (const R of a) S.push({
      url: await ewe(R.url, "image", f, p == null ? void 0 : p.get(R.url), A),
      role: R.role
    });
    const C = [],
      I = [];
    for (const R of i) C.push(await ewe(R, "video", f, p == null ? void 0 : p.get(R)));
    for (const R of o) I.push(await ewe(R, "audio", f, p == null ? void 0 : p.get(R)));
    const E = parseInt(String(s || ((v = t.settings) == null ? void 0 : v.duration) || "5").replace(/s$/i, ""), 10),
      M = await fetch(`${IT}/api/jimeng/generate/video`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: r,
          model: m,
          duration: Number.isFinite(E) ? E : 5,
          aspect_ratio: k || "16:9",
          resolution: d || ((_ = t.settings) == null ? void 0 : _.resolution) || "720P",
          images: S,
          videos: C,
          audios: I
        })
      }),
      T = await aUt(await M.json());
    if (!M.ok && M.status !== 202) throw new Error(String(T.detail || T.error || `即梦视频生成失败 HTTP ${M.status}`));
    const P = String(T.submit_id || T.submitId || "").trim();
    if (P && (h == null || h(P)), T.status === "succeeded" && ((w = T.urls) != null && w.length)) return T.urls.map(VY);
    if (T.jimeng_pending || M.status === 202 || T.status === "pending") {
      if (!P) throw new Error(T.message || "即梦视频任务排队中但未返回 submit_id");
      return oUt(P, "video", u);
    }
    throw new Error(T.message || T.error || "即梦 CLI 未返回视频");
  } finally {
    await iUt(f);
  }
}

async function Iao(e, t) {
  var r;
  if (Q4t(e, t)) try {
    const a = await t3n(e, t);
    return {
      status: a.status,
      parsed: a.parsed,
      data: a.data && typeof a.data == "object" ? a.data : {}
    };
  } catch (a) {
    if (!e3n(a)) throw a;
  }
  const n = await $i(e, t);
  try {
    return {
      status: n.status,
      parsed: !0,
      data: await ore(n)
    };
  } catch (a) {
    if ((r = t.signal) != null && r.aborted) throw a;
    return {
      status: n.status,
      parsed: !1,
      data: {}
    };
  }
}

function Ult(e) {
  return e.recovered ? "fast" : e.lane === "slow" || e.queryTimedOut || (e.consecutiveErrors ?? 0) >= 2 ? "slow" : "fast";
}

const Mmn = 3e4;

function Cao(e) {
  const t = Number.isFinite(e) ? e : 0;
  return t >= 8 ? 7500 : t >= 4 ? 5e3 : t >= 2 ? 2500 : 0;
}

function lz(e, t) {
  const n = Math.max(0, t);
  switch (e) {
    case "suno":
      return n < 30 ? 1e3 : n < 60 ? 2e3 : 3e3;
    case "fast-image":
      return n < 20 ? 800 : n < 50 ? 1500 : 3e3;
    case "slow-video":
      return n < 6 ? 5e3 : n < 24 ? 8e3 : 12e3;
    case "wan30":
      return 15e3;
    case "media":
      return n < 15 ? 2e3 : n < 45 ? 3e3 : 5e3;
  }
}

function V8(e) {
  const t = e.isDocumentHidden ? Math.min(e.baseInterval * 4, Mmn) : e.baseInterval,
    n = e.lane === "slow" ? Math.max(t * 2, 3e3) : t,
    r = e.pendingCount ?? al.getActiveGeneratingCount(),
    a = Cao(r);
  return Math.min(Math.max(nMn(n, e.scheduleKey, e.attempt), a), Mmn);
}

function Eao(e, t, n, r) {
  return e || n || t && !r;
}

function Tao(e) {
  const t = {};
  let n = !1,
    r = !1;
  return {
    finish() {
      r = !0;
    },
    displayReady(a) {
      const i = String(a.displayUrl || "").trim(),
        o = DIt(i);
      if ((a.index ?? 0) !== 0 || !o || n || r || !e.valid()) return;
      n = !0;
      const s = Number(a.imageWidth) > 0 && Number(a.imageHeight) > 0 ? `${a.imageWidth}×${a.imageHeight}` : void 0;
      e.enqueue(t, () => {
        r || !e.valid() || (e.setHistory(l => e.valid() ? l.map(d => String(d.id) === e.taskId ? {
          ...d,
          status: "completed",
          progress: 100,
          url: i,
          thumbnailUrl: i,
          _ossThumbnailUrl: i,
          _globalOssUrlOnly: !0,
          ossUploaded: !1
        } : d) : l), e.updateNode(e.nodeId, {
          isGenerating: !1,
          content: i,
          thumbnailUrl: i,
          _contentAssetId: void 0,
          settings: {
            isGenerating: !1,
            progress: 100,
            error: null,
            [Cl]: !0,
            _ossThumbnailUrl: i,
            _canvasDisplayPreviewUrl: i,
            _pendingRemoteResultUrl: void 0,
            disableThumbnailCreationOnImport: !0,
            ...(s ? {
              previewActualSize: s,
              previewSize: s,
              imageSize: s
            } : {})
          }
        }));
      });
    }
  };
}

const kSt = -30,
  ASt = 60,
  Tgr = 0,
  cDe = 10,
  Mao = -90,
  Pao = 90,
  nEe = -30,
  rEe = 60,
  Rao = 0,
  Nao = 2,
  Mgr = Object.freeze([{
    key: "top-left",
    yaw: 315,
    pitch: 30,
    zh: "左上",
    en: "upper-left high angle"
  }, {
    key: "top",
    yaw: 0,
    pitch: 60,
    zh: "俯视",
    en: "high-angle overhead view"
  }, {
    key: "top-right",
    yaw: 45,
    pitch: 30,
    zh: "右上",
    en: "upper-right high angle"
  }, {
    key: "left",
    yaw: 270,
    pitch: 0,
    zh: "左视",
    en: "left side view"
  }, {
    key: "front",
    yaw: 0,
    pitch: 0,
    zh: "正视",
    en: "front view"
  }, {
    key: "right",
    yaw: 90,
    pitch: 0,
    zh: "右视",
    en: "right side view"
  }, {
    key: "bottom-left",
    yaw: 315,
    pitch: -30,
    zh: "左下",
    en: "lower-left low angle"
  }, {
    key: "bottom",
    yaw: 0,
    pitch: -30,
    zh: "仰视",
    en: "low-angle view looking up"
  }, {
    key: "bottom-right",
    yaw: 45,
    pitch: -30,
    zh: "右下",
    en: "lower-right low angle"
  }]),
  rue = Object.freeze({
    yaw: 60,
    pitch: 35
  }),
  Yz = (e, t, n) => Math.max(t, Math.min(n, e));

function jao(e) {
  return Number.isFinite(e) ? e <= .7 ? 2 : e >= 1.45 ? 0 : 1 : 1;
}

function aEe(e) {
  const n = ((Number.isFinite(e.rotation) ? e.rotation : rue.yaw) % 360 + 360) % 360,
    r = n > 180 ? n - 360 : n,
    a = e.angleProtocol === "wavespeed-v1" ? Math.round(Yz(e.scale, Rao, Nao)) : jao(e.scale);
  return {
    ...e,
    rotation: Math.round(Yz(r, Mao, Pao)),
    tilt: Math.round(Yz(Number.isFinite(e.tilt) ? e.tilt : rue.pitch, nEe, rEe)),
    scale: a,
    viewMode: e.viewMode === "camera" ? "camera" : "subject",
    angleProtocol: "wavespeed-v1"
  };
}

function oZe(e) {
  const t = aEe(e),
    n = Math.round(t.rotation);
  return {
    horizontal_angle: t.viewMode === "camera" ? n : -n,
    vertical_angle: Math.round(t.tilt),
    distance: t.scale
  };
}

function sZe(e) {
  return (Math.round(e) % 360 + 360) % 360;
}

function lZe(e) {
  const t = oZe(e);
  return {
    yaw: sZe(t.horizontal_angle),
    pitch: Math.round(Yz(t.vertical_angle, nEe, rEe))
  };
}

function Pgr(e, t) {
  const n = sZe(e),
    r = Math.round(t);
  return Mgr.find(a => a.yaw === n && a.pitch === r);
}

function Dao(e) {
  const t = Yz(Math.round(e), nEe, rEe);
  return t < -15 ? "low-angle view looking up" : t < 15 ? "eye-level view" : t < 45 ? "elevated view looking down" : "high-angle view looking down";
}

function Lao(e) {
  const t = sZe(e);
  return t < 22.5 || t >= 337.5 ? "正视" : t < 67.5 ? "右前" : t < 112.5 ? "右视" : t < 157.5 ? "右后" : t < 202.5 ? "背视" : t < 247.5 ? "左后" : t < 292.5 ? "左视" : "左前";
}

function Oao(e) {
  const t = Yz(Math.round(e), nEe, rEe);
  return t <= -15 ? "仰视" : t < 15 ? "平视" : t < 45 ? "略俯视" : "俯视";
}

function Rgr(e) {
  const t = Math.round(Yz(e, 0, 2));
  return t === 0 ? "close-up" : t === 1 ? "medium shot" : "wide shot";
}

function Bao(e) {
  const t = Yz(Math.round(e), nEe, rEe),
    n = ["orbit the camera around the same scene instead of isolating the subject", "keep the subject physically grounded on its original supporting surface (ground, table, rock, water, stand, or any rest plane in the reference)", "maintain rest contact, contact shadow, and gravity", "do not levitate, hover, or lift the subject into the air", "only the camera viewpoint changes; the subject world position stays the same"];
  return t >= 45 ? n.push("high-angle grounding: from this overhead view the subject must still sit on the supporting plane with a visible contact patch, not floating above empty space") : t >= 20 ? n.push("elevated grounding: keep the base of the subject touching the support as seen from above") : t <= -15 && n.push("low-angle grounding: the subject still rests on the original support; do not lift its base off the ground"), n.join(", ");
}

function Pmn(e) {
  return sUt(sZe(e));
}

function Ngr(e) {
  const t = lZe(e),
    n = oZe(e),
    r = Pgr(t.yaw, t.pitch),
    a = (r == null ? void 0 : r.en) ?? Pmn(t.yaw),
    i = Dao(t.pitch),
    o = Rgr(n.distance),
    s = r ? `preset ${r.key} (${r.zh} / ${r.en})` : `nearest orbit ${Pmn(t.yaw)}`;
  return ["MULTI-ANGLE CAMERA CONTROL — follow these view_control values exactly", `view_control yaw ${t.yaw}° (${a})`, `view_control pitch ${t.pitch}° (${i})`, s, "yaw 0 is the original front view and increases clockwise: 45 front-right, 90 right, 270 left, 315 front-left", "pitch 0 is eye-level, positive looks down to 60, negative looks up to -30", `distance ${n.distance} (${o})`, "rephotograph the same scene from this camera orbit and framing", Bao(t.pitch), "reconstruct newly visible and occluded surfaces of both the subject and its supporting surface consistently", "preserve identity, geometry, proportions, colors, materials, outfit, illustration style, lighting, and the original environment layout", "do not restage the subject onto a new empty background", "do not keep the original camera viewpoint, do not duplicate the subject, no contact sheet, no labels"].join(", ");
}

function sUt(e) {
  const t = (Math.round(e) % 360 + 360) % 360;
  return t < 22.5 || t >= 337.5 ? "front view" : t < 67.5 ? "front-right quarter view" : t < 112.5 ? "right side view" : t < 157.5 ? "back-right quarter view" : t < 202.5 ? "back view" : t < 247.5 ? "back-left quarter view" : t < 292.5 ? "left side view" : "front-left quarter view";
}

function jgr(e) {
  const t = Math.max(kSt, Math.min(ASt, Math.round(e)));
  return t < -15 ? "low-angle shot" : t < 15 ? "eye-level shot" : t < 45 ? "elevated shot" : "high-angle shot";
}

function Dgr(e) {
  const t = Math.max(Tgr, Math.min(cDe, e));
  return t < 2 ? "wide shot" : t < 6 ? "medium shot" : "close-up";
}

function Fao(e, t, n) {
  return ` ${sUt(e)} ${jgr(t)} ${Dgr(n)}`;
}

const Rmn = [{
    label: "front view",
    angle: 0
  }, {
    label: "front-right quarter view",
    angle: 45
  }, {
    label: "right side view",
    angle: 90
  }, {
    label: "back-right quarter view",
    angle: 135
  }, {
    label: "back view",
    angle: 180
  }, {
    label: "back-left quarter view",
    angle: 225
  }, {
    label: "left side view",
    angle: 270
  }, {
    label: "front-left quarter view",
    angle: 315
  }],
  Nmn = [{
    label: "low-angle shot",
    angle: -22
  }, {
    label: "eye-level shot",
    angle: 0
  }, {
    label: "elevated shot",
    angle: 30
  }, {
    label: "high-angle shot",
    angle: 52
  }],
  jmn = [{
    label: "wide shot",
    zoom: 1
  }, {
    label: "medium shot",
    zoom: 4
  }, {
    label: "close-up",
    zoom: 8
  }],
  SSt = e => {
    if (!e || !e.isActive) return {
      augmentedPrompt: "",
      angleMetadata: null,
      needsControlNetReduction: !1
    };
    const {
        rotation: t,
        tilt: n,
        scale: r
      } = e,
      a = [],
      o = (360 - (t % 360 + 360) % 360) % 360,
      s = Math.abs(t) > 15 || Math.abs(t - 360) > 15;
    return o >= 30 && o <= 150 ? a.push("(Two-point perspective:1.4), dramatically shifting the vanishing point to the far diagonal corner, re-modeling the interior structure from a corner view, architectural wide-angle lens") : o > 150 && o < 210 ? a.push("(Complete 180-degree spatial flip:1.4), rotating the architectural perspective to reveal the opposite wall, dramatic rear view reconstruction") : o >= 210 && o <= 330 ? a.push("(Two-point perspective:1.4), dramatically shifting the vanishing point to the opposite far diagonal corner, re-modeling the interior from alternate corner view, architectural wide-angle lens") : o > 15 && o < 30 ? a.push("(Slightly angled perspective:1.2), subtle shift in vanishing point, revealing more depth") : o > 330 && o < 345 ? a.push("(Slightly angled perspective:1.2), subtle shift in vanishing point from opposite side, revealing more depth") : a.push("(One-point perspective:1.2), frontal architectural view, centered vanishing point"), n > 20 ? a.push("(Aerial architectural drone view:1.4), looking down at the spatial layout and furniture arrangement, high-angle interior visualization") : n < -20 ? a.push("(Dramatic low-angle architectural shot:1.3), looking up at the ceiling and vertical lines to emphasize height, heroic structural perspective") : n > 5 ? a.push("slightly elevated camera position, gentle downward angle on the interior layout") : n < -5 && a.push("slightly lowered camera position, gentle upward angle emphasizing ceiling height"), r > 1.3 ? a.push("(Architectural detail close-up:1.2), zooming in on textures and material finishes") : r < .7 ? a.push("(Ultra-wide 14mm lens:1.3), extreme interior perspective, expanding the sense of space") : r > 1.1 ? a.push("medium architectural framing, focusing on key spatial elements") : r < .9 && a.push("wider architectural framing, revealing more spatial context"), {
      augmentedPrompt: `(Complete spatial reconstruction:1.3), ${a.join(", ")}, maintaining the aesthetic and materials of the reference image, professional architectural photography, 8k resolution`,
      angleMetadata: {
        rotation: t,
        tilt: n,
        scale: r
      },
      needsControlNetReduction: s
    };
  },
  $lt = (e, t) => e === "architecture" ? Math.max(t, .8 + Math.random() * .05) : t,
  Dmn = (e, t = 1) => .35 + Math.random() * .1;

function zao(e) {
  return Ngr(e);
}

const ISt = e => {
  if (!e || !e.isActive) return {
    augmentedPrompt: "",
    angleMetadata: null
  };
  const t = aEe(e),
    n = oZe(t),
    r = lZe(t);
  return {
    augmentedPrompt: zao(t),
    angleMetadata: {
      rotation: t.rotation,
      tilt: t.tilt,
      scale: t.scale,
      viewMode: t.viewMode,
      generator_name: "jimeng/view-control",
      ...n,
      yaw: r.yaw,
      pitch: r.pitch,
      view_control: r
    }
  };
};

function Lgr(e) {
  if (!e.isActive) return {
    zhSummary: "开启「已启用」后，拖动画布或滑杆会生成机位描述，并在生图时附加到提示词。",
    enCameraLayer: "",
    enFullLayers: ""
  };
  if ((e.sceneMode || "character") === "architecture") {
    const {
      augmentedPrompt: d
    } = SSt(e);
    return {
      zhSummary: "建筑/室内模式：使用建筑透视与空间重组类英文提示（与滑杆角度一致）。",
      enCameraLayer: d.length > 220 ? `${d.slice(0, 220)}…` : d,
      enFullLayers: d
    };
  }
  const n = aEe(e),
    r = oZe(n),
    a = lZe(n),
    i = Pgr(a.yaw, a.pitch),
    o = Ngr(n),
    s = r.distance === 0 ? "特写" : r.distance === 1 ? "中景" : "广角";
  return {
    zhSummary: [i ? `即梦机位 ${i.zh}（yaw ${a.yaw}° / pitch ${a.pitch}°）` : `即梦机位 yaw ${a.yaw}°（${Lao(a.yaw)}）`, i ? null : `pitch ${a.pitch}°（${Oao(a.pitch)}）`, `景别 ${r.distance}（${s} / ${Rgr(r.distance)}）`].filter(Boolean).join("；"),
    enCameraLayer: o,
    enFullLayers: o
  };
}

const Uao = 82,
  aue = [{
    key: "left_90",
    direction: "left",
    label: "左侧",
    azimuthDeg: 270,
    elevationDeg: 0
  }, {
    key: "top_90",
    direction: "top",
    label: "顶部",
    azimuthDeg: 0,
    elevationDeg: 90
  }, {
    key: "right_90",
    direction: "right",
    label: "右侧",
    azimuthDeg: 90,
    elevationDeg: 0
  }, {
    key: "front_0",
    direction: "front",
    label: "前方",
    azimuthDeg: 0,
    elevationDeg: 0
  }, {
    key: "bottom_90",
    direction: "bottom",
    label: "底部",
    azimuthDeg: 0,
    elevationDeg: -90
  }, {
    key: "back_180",
    direction: "back",
    label: "后方",
    azimuthDeg: 180,
    elevationDeg: 0
  }],
  LJ = {
    back_0: {
      azimuthDeg: 180,
      elevationDeg: 0
    },
    top_back_45: {
      azimuthDeg: 180,
      elevationDeg: 45
    },
    low_back_45: {
      azimuthDeg: 180,
      elevationDeg: -45
    }
  },
  lUt = [{
    value: 10,
    color: "#CCCCCC"
  }, {
    value: 50,
    color: "#CCCCCC"
  }, {
    value: 100,
    color: "#CCCCCC"
  }],
  boe = [{
    value: 2e3,
    color: "#D7995D"
  }, {
    value: 3e3,
    color: "#D5AE55"
  }, {
    value: 4e3,
    color: "#F3DB90"
  }, {
    value: 5600,
    color: "#F3F9FC"
  }, {
    value: 7e3,
    color: "#D4E6EE"
  }, {
    value: 8e3,
    color: "#C4E2F0"
  }],
  $ao = "linear-gradient(90deg, rgba(238,130,36,0.30) 0%, rgba(242,154,37,0.30) 20%, rgba(249,218,125,0.30) 41%, rgba(247,249,242,0.30) 63%, rgba(220,239,247,0.30) 81%, rgba(182,224,242,0.30) 99%)",
  Gao = [{
    azimuthDeg: 0,
    elevationDeg: 0
  }, {
    azimuthDeg: 270,
    elevationDeg: 0
  }, {
    azimuthDeg: 90,
    elevationDeg: 0
  }, {
    azimuthDeg: 0,
    elevationDeg: 90
  }, {
    azimuthDeg: 0,
    elevationDeg: -90
  }, {
    azimuthDeg: 0,
    elevationDeg: 45
  }, {
    azimuthDeg: 315,
    elevationDeg: 0
  }, {
    azimuthDeg: 45,
    elevationDeg: 0
  }, {
    azimuthDeg: 315,
    elevationDeg: 45
  }, {
    azimuthDeg: 45,
    elevationDeg: 45
  }],
  Ogr = [0, 45, 90, 135, 180, 225, 270, 315],
  Bgr = [-90, -45, 0, 45, 90],
  Vao = 5,
  Hao = (e, t, n) => Math.min(n, Math.max(t, e)),
  S$e = Math.PI / 180;

function cUt(e) {
  return (e % 360 + 360) % 360;
}

function Fgr(e, t) {
  return Math.abs((e - t + 540) % 360 - 180);
}

function iEe(e) {
  const t = -e.y,
    n = Math.hypot(e.x, t, e.z) || 1,
    r = Math.asin(Hao(t / n, -1, 1)) / S$e;
  return {
    azimuthDeg: cUt(Math.atan2(e.x, e.z) / S$e),
    elevationDeg: r
  };
}

function oEe(e, t, n = Uao) {
  const r = t * S$e,
    a = e * S$e,
    i = Math.cos(r);
  return {
    x: n * i * Math.sin(a),
    y: -n * Math.sin(r),
    z: n * i * Math.cos(a)
  };
}

function Wao(e) {
  return e <= 10 ? .35 : e >= 100 ? 2.2 : e / 50;
}

function qao(e) {
  return e < 4e3 ? "#D5C6AA" : e >= 7e3 ? "#9EC4F9" : "#A6A196";
}

function zgr(e) {
  const t = boe.find(a => a.value === e);
  if (t) return t.color;
  let n = boe[3],
    r = Number.POSITIVE_INFINITY;
  return boe.forEach(a => {
    const i = Math.abs(a.value - e);
    i < r && (n = a, r = i);
  }), n.color;
}

function bAe(e, t, n) {
  if (!Number.isFinite(e)) return n;
  let r = n,
    a = Number.POSITIVE_INFINITY;
  return t.forEach(i => {
    const o = Math.abs(i.value - e);
    o < a && (r = i.value, a = o);
  }), r;
}

function Ugr(e) {
  const t = cUt(e);
  let n = 0,
    r = Number.POSITIVE_INFINITY;
  return Ogr.forEach(a => {
    const i = Math.min(Math.abs(t - a), 360 - Math.abs(t - a));
    i < r && (n = a, r = i);
  }), n;
}

function $gr(e) {
  let t = 0,
    n = Number.POSITIVE_INFINITY;
  return Bgr.forEach(r => {
    const a = Math.abs(e - r);
    a < n && (t = r, n = a);
  }), t;
}

function Ggr(e, t, n = Vao) {
  return Gao.some(r => Fgr(e, r.azimuthDeg) <= n && Math.abs(t - r.elevationDeg) <= n);
}

function Vgr(e, t) {
  const n = aue.find(r => r.azimuthDeg === e && r.elevationDeg === t);
  return n ? {
    direction: n.direction,
    customPosition: void 0
  } : {
    direction: "custom",
    customPosition: oEe(e, t)
  };
}

function nee(e) {
  if (e.direction !== "custom") {
    const a = aue.find(i => i.direction === e.direction) ?? aue[3];
    return {
      preset: a.key,
      azimuthDeg: a.azimuthDeg,
      elevationDeg: a.elevationDeg
    };
  }
  const t = e.customPosition ?? oEe(0, 0),
    {
      azimuthDeg: n,
      elevationDeg: r
    } = iEe(t);
  return {
    preset: null,
    azimuthDeg: n,
    elevationDeg: r
  };
}

function Hgr(e, t) {
  let n = "back_0",
    r = Number.POSITIVE_INFINITY;
  return Object.keys(LJ).forEach(a => {
    const i = LJ[a],
      o = Fgr(e, i.azimuthDeg) + Math.abs(t - i.elevationDeg);
    o < r && (n = a, r = o);
  }), n;
}

function Kao(e) {
  if (!e) return "back_0";
  const {
    azimuthDeg: t,
    elevationDeg: n
  } = iEe(e);
  return Hgr(t, n);
}

function Wgr(e) {
  var i;
  const t = nee(e),
    n = bAe(Number(e.colorTemperature ?? 5600), boe, 5600),
    r = bAe(Number(e.brightness ?? 50), lUt, 50),
    a = e.rimLight === !0;
  return {
    preset: t.preset,
    azimuthDeg: Math.round(t.azimuthDeg),
    elevationDeg: Math.round(t.elevationDeg),
    brightnessPercent: Math.round(r),
    temperatureK: Math.round(n),
    rimEnabled: a,
    rimPreset: a ? Kao(e.rimLightPosition) : "back_0",
    hardness: e.hardness ?? "soft",
    layoutPreset: e.layoutPreset,
    sceneLights: (i = e.sceneLights) == null ? void 0 : i.map(o => ({
      role: o.role,
      azimuthDeg: Math.round(cUt(o.rotationY)),
      elevationDeg: Math.round(o.rotationX),
      color: o.color,
      intensity: o.intensity
    }))
  };
}

const CSt = {
    key: "主光",
    fill: "补光",
    rim: "轮廓光",
    back: "背光",
    ambient: "灯光",
    point: "灯光"
  },
  qgr = [{
    name: "warm_candle",
    label: "烛光暖黄",
    hex: "#FFB347"
  }, {
    name: "warm_tungsten",
    label: "钨丝灯",
    hex: "#FFC58A"
  }, {
    name: "warm_sunset",
    label: "夕阳橙",
    hex: "#FF9F43"
  }, {
    name: "warm_golden",
    label: "金色",
    hex: "#FFD700"
  }, {
    name: "warm_fire",
    label: "火焰橙红",
    hex: "#FF6B35"
  }, {
    name: "warm_amber",
    label: "琥珀色",
    hex: "#FFBF00"
  }, {
    name: "neutral_daylight",
    label: "标准日光",
    hex: "#FFFFFF"
  }, {
    name: "neutral_soft",
    label: "柔和白光",
    hex: "#F2F2F2"
  }, {
    name: "cool_moon",
    label: "月光蓝",
    hex: "#CFE9FF"
  }, {
    name: "cool_overcast",
    label: "阴天冷光",
    hex: "#DDE6F2"
  }, {
    name: "cool_blue",
    label: "冷蓝光",
    hex: "#A7C7E7"
  }, {
    name: "cool_ice",
    label: "冰蓝",
    hex: "#B0E0E6"
  }, {
    name: "cool_midnight",
    label: "午夜蓝",
    hex: "#191970"
  }, {
    name: "neon_pink",
    label: "霓虹粉",
    hex: "#FF4FD8"
  }, {
    name: "neon_purple",
    label: "霓虹紫",
    hex: "#8B5CF6"
  }, {
    name: "cyber_blue",
    label: "赛博蓝",
    hex: "#00E5FF"
  }, {
    name: "neon_green",
    label: "霓虹绿",
    hex: "#39FF14"
  }, {
    name: "neon_orange",
    label: "霓虹橙",
    hex: "#FF6600"
  }],
  Qao = {
    ...Object.fromEntries(qgr.map(e => [e.name, e.hex])),
    black: "#000000"
  },
  Yao = {
    front: {
      rotationX: 0,
      rotationY: 0
    },
    front_left: {
      rotationX: 0,
      rotationY: -45
    },
    front_right: {
      rotationX: 0,
      rotationY: 45
    },
    front_left_high: {
      rotationX: 45,
      rotationY: -45
    },
    front_right_low: {
      rotationX: -20,
      rotationY: 45
    },
    front_top: {
      rotationX: 45,
      rotationY: 0
    },
    left: {
      rotationX: 0,
      rotationY: -90
    },
    right: {
      rotationX: 0,
      rotationY: 90
    },
    back: {
      rotationX: 0,
      rotationY: 180
    },
    top: {
      rotationX: 90,
      rotationY: 0
    },
    top_side: {
      rotationX: 60,
      rotationY: -45
    },
    bottom: {
      rotationX: -90,
      rotationY: 0
    },
    side: {
      rotationX: 0,
      rotationY: -90
    },
    side_low: {
      rotationX: -20,
      rotationY: -90
    },
    center_low: {
      rotationX: -45,
      rotationY: 0
    },
    all: {
      rotationX: 0,
      rotationY: 0
    }
  },
  dUt = [{
    name: "three_point",
    label: "三点布光",
    lights: [{
      role: "key",
      position: "front_left",
      intensity: 1,
      color: "neutral_daylight"
    }, {
      role: "fill",
      position: "front_right",
      intensity: .5,
      color: "neutral_soft"
    }, {
      role: "rim",
      position: "back",
      intensity: .8,
      color: "cool_moon"
    }]
  }, {
    name: "rembrandt",
    label: "伦勃朗布光",
    lights: [{
      role: "key",
      position: "front_left_high",
      intensity: 1,
      color: "warm_tungsten"
    }, {
      role: "fill",
      position: "front_right",
      intensity: .2,
      color: "neutral_soft"
    }]
  }, {
    name: "split",
    label: "分割光",
    lights: [{
      role: "key",
      position: "left",
      intensity: 1,
      color: "neutral_daylight"
    }]
  }, {
    name: "top_drama",
    label: "顶光戏剧",
    lights: [{
      role: "key",
      position: "top",
      intensity: 1.2,
      color: "cool_overcast"
    }]
  }, {
    name: "anime_soft",
    label: "动漫柔光",
    lights: [{
      role: "key",
      position: "front",
      intensity: .8,
      color: "neutral_soft"
    }, {
      role: "fill",
      position: "top",
      intensity: .4,
      color: "neutral_soft"
    }]
  }, {
    name: "cyberpunk",
    label: "赛博朋克",
    lights: [{
      role: "key",
      position: "left",
      intensity: .9,
      color: "neon_pink"
    }, {
      role: "rim",
      position: "right",
      intensity: 1,
      color: "cyber_blue"
    }]
  }, {
    name: "natural_light",
    label: "自然光",
    lights: [{
      role: "key",
      position: "front_top",
      intensity: .9,
      color: "neutral_daylight"
    }, {
      role: "ambient",
      position: "all",
      intensity: .3,
      color: "neutral_soft"
    }]
  }, {
    name: "golden_hour",
    label: "黄金时刻",
    lights: [{
      role: "key",
      position: "side_low",
      intensity: 1.2,
      color: "warm_golden"
    }, {
      role: "fill",
      position: "front",
      intensity: .2,
      color: "warm_tungsten"
    }]
  }, {
    name: "blue_hour",
    label: "蓝调时刻",
    lights: [{
      role: "key",
      position: "top",
      intensity: .7,
      color: "cool_blue"
    }, {
      role: "ambient",
      position: "all",
      intensity: .4,
      color: "cool_blue"
    }]
  }, {
    name: "high_key",
    label: "高调光",
    lights: [{
      role: "key",
      position: "front_left",
      intensity: 1,
      color: "neutral_daylight"
    }, {
      role: "fill",
      position: "front_right",
      intensity: .8,
      color: "neutral_soft"
    }, {
      role: "ambient",
      position: "top",
      intensity: .5,
      color: "neutral_daylight"
    }]
  }, {
    name: "low_key",
    label: "低调光",
    lights: [{
      role: "key",
      position: "side",
      intensity: 1,
      color: "neutral_daylight"
    }, {
      role: "fill",
      position: "front",
      intensity: .1,
      color: "neutral_soft"
    }]
  }, {
    name: "rim_light",
    label: "轮廓光",
    lights: [{
      role: "rim",
      position: "back",
      intensity: 1,
      color: "neutral_daylight"
    }, {
      role: "fill",
      position: "front",
      intensity: .1,
      color: "neutral_soft"
    }]
  }, {
    name: "silhouette",
    label: "剪影",
    lights: [{
      role: "rim",
      position: "back",
      intensity: 1,
      color: "neutral_daylight"
    }]
  }, {
    name: "neon",
    label: "霓虹灯",
    lights: [{
      role: "key",
      position: "left",
      intensity: 1,
      color: "neon_purple"
    }, {
      role: "fill",
      position: "right",
      intensity: .8,
      color: "neon_pink"
    }]
  }, {
    name: "practical",
    label: "实景光",
    lights: [{
      role: "point",
      position: "center_low",
      intensity: .8,
      color: "warm_candle"
    }]
  }, {
    name: "chiaroscuro",
    label: "明暗对比",
    lights: [{
      role: "key",
      position: "top_side",
      intensity: 1,
      color: "warm_tungsten"
    }, {
      role: "ambient",
      position: "all",
      intensity: .05,
      color: "black"
    }]
  }, {
    name: "campfire",
    label: "篝火光",
    lights: [{
      role: "key",
      position: "center_low",
      intensity: 1,
      color: "warm_fire"
    }, {
      role: "fill",
      position: "front_top",
      intensity: .3,
      color: "warm_amber"
    }, {
      role: "rim",
      position: "back",
      intensity: .2,
      color: "warm_sunset"
    }]
  }, {
    name: "moonlight_mystery",
    label: "月夜神秘",
    lights: [{
      role: "key",
      position: "top",
      intensity: .6,
      color: "cool_midnight"
    }, {
      role: "rim",
      position: "back",
      intensity: .8,
      color: "cool_ice"
    }, {
      role: "fill",
      position: "front",
      intensity: .1,
      color: "cool_moon"
    }]
  }],
  Kgr = 1.2,
  Xao = 4;

let Lmn = 0;

const Qgr = e => (e % 360 + 360) % 360;

function Ygr(e) {
  return Math.round((e ?? 1) * 10 / Kgr);
}

function Jao(e) {
  return (Number(e) || 0) * Kgr / 10;
}

function Omn(e) {
  return e >= 8 ? "明亮" : e >= 5 ? "适中" : e >= 3 ? "柔和" : "微弱";
}

const Bmn = [{
  value: 2,
  color: "#CCCCCC"
}, {
  value: 4,
  color: "#CCCCCC"
}, {
  value: 6,
  color: "#CCCCCC"
}, {
  value: 8,
  color: "#CCCCCC"
}, {
  value: 10,
  color: "#CCCCCC"
}];

function Fmn(e, t) {
  return {
    azimuthDeg: Qgr(t),
    elevationDeg: Math.max(-90, Math.min(90, e))
  };
}

function I$e(e, t) {
  let n = Qgr(e);
  return n > 180 && (n -= 360), {
    rotationX: t,
    rotationY: n
  };
}

function Zao() {
  return Lmn += 1, `L${Lmn}`;
}

function vAe(e) {
  return {
    id: e.id ?? Zao(),
    role: e.role ?? "fill",
    rotationX: e.rotationX ?? 0,
    rotationY: e.rotationY ?? 0,
    color: e.color ?? "#FFFFFF",
    intensity: e.intensity ?? .5
  };
}

function eio(e) {
  return e >= .9 ? 100 : e >= .4 ? 50 : 10;
}

function Xgr(e) {
  return e >= 100 ? 1 : e >= 50 ? .5 : .2;
}

function tio(e) {
  return e.lights.map(t => {
    const n = Yao[t.position] ?? {
      rotationX: 0,
      rotationY: 0
    };
    return vAe({
      role: t.role,
      rotationX: n.rotationX,
      rotationY: n.rotationY,
      color: Qao[t.color] ?? "#FFFFFF",
      intensity: t.intensity
    });
  });
}

function Npe(e) {
  var a;
  if ((a = e.sceneLights) != null && a.length) return e.sceneLights;
  const t = nee(e),
    n = I$e(t.azimuthDeg, t.elevationDeg),
    r = [vAe({
      role: "key",
      ...n,
      color: e.color || "#FFFFFF",
      intensity: Xgr(e.brightness)
    })];
  if (e.rimLight) {
    const i = e.rimLightPosition ? iEe(e.rimLightPosition) : {
      azimuthDeg: 180,
      elevationDeg: 0
    };
    r.push(vAe({
      role: "rim",
      ...I$e(i.azimuthDeg, i.elevationDeg),
      color: "#CFE9FF",
      intensity: .8
    }));
  }
  return r;
}

function uUt(e, t) {
  const n = t.find(o => o.role === "key") ?? t[0],
    r = t.find(o => o.role === "rim" || o.role === "back"),
    a = n ? Fmn(n.rotationX, n.rotationY) : nee(e),
    i = r ? Fmn(r.rotationX, r.rotationY) : null;
  return {
    ...e,
    sceneLights: t,
    ...Vgr(a.azimuthDeg, a.elevationDeg),
    color: (n == null ? void 0 : n.color) ?? e.color,
    brightness: n ? eio(n.intensity) : e.brightness,
    rimLight: !!r,
    rimLightPosition: i ? oEe(i.azimuthDeg, i.elevationDeg) : e.rimLightPosition
  };
}

function nio(e, t) {
  const n = dUt.find(a => a.name === t);
  if (!n) return e;
  const r = tio(n);
  return {
    ...uUt(e, r),
    layoutPreset: t,
    selectedLightIndex: 0
  };
}

function rio(e, t) {
  const n = Npe(e),
    r = Math.max(0, Math.min(t, n.length - 1)),
    a = n[r];
  return {
    ...e,
    sceneLights: n,
    selectedLightIndex: r,
    color: (a == null ? void 0 : a.color) ?? e.color
  };
}

function aio(e) {
  const t = [...Npe(e)];
  return t.length >= Xao ? {
    ...e,
    sceneLights: t
  } : (t.push(vAe({
    role: "fill",
    rotationX: 0,
    rotationY: 45 + t.length * 90,
    color: "#FFFFFF",
    intensity: .5
  })), {
    ...e,
    layoutPreset: void 0,
    sceneLights: t,
    selectedLightIndex: t.length - 1,
    color: "#FFFFFF"
  });
}

function iio(e, t) {
  const n = [...Npe(e)];
  if (n.length <= 1) return {
    ...e,
    sceneLights: n
  };
  n.splice(t, 1);
  const r = Math.max(0, Math.min(e.selectedLightIndex ?? 0, n.length - 1));
  return {
    ...uUt(e, n),
    layoutPreset: void 0,
    selectedLightIndex: r
  };
}

function zmn(e, t) {
  const n = [...Npe(e)],
    r = Math.max(0, Math.min(e.selectedLightIndex ?? 0, n.length - 1));
  return n[r] = {
    ...n[r],
    ...t
  }, {
    ...uUt(e, n),
    layoutPreset: void 0,
    selectedLightIndex: r
  };
}

const oio = ["direction", "customPosition", "brightness", "color", "colorTemperature", "rimLight", "rimLightPosition"];

function sio(e, t) {
  var o;
  const n = {
      ...e,
      ...t
    },
    r = oio.some(s => s in t),
    a = "sceneLights" in t || "layoutPreset" in t || "selectedLightIndex" in t;
  if (!r || a || !((o = n.sceneLights) != null && o.length)) return n;
  n.layoutPreset = void 0;
  const i = [...n.sceneLights];
  if (t.direction !== void 0 || t.customPosition !== void 0) {
    const s = nee(n),
      l = I$e(s.azimuthDeg, s.elevationDeg),
      d = i.findIndex(u => u.role === "key");
    d >= 0 && (i[d] = {
      ...i[d],
      ...l
    });
  }
  if (t.color) {
    const s = Math.max(0, Math.min(n.selectedLightIndex ?? 0, i.length - 1));
    i[s] = {
      ...i[s],
      color: t.color
    };
  }
  if (t.brightness !== void 0) {
    const s = i.findIndex(l => l.role === "key");
    s >= 0 && (i[s] = {
      ...i[s],
      intensity: Xgr(t.brightness)
    });
  }
  if (t.rimLight === !1) return n.sceneLights = i.filter(s => s.role !== "rim" && s.role !== "back"), n;
  if (t.rimLight === !0 || t.rimLightPosition) {
    const s = n.rimLightPosition ? iEe(n.rimLightPosition) : {
        azimuthDeg: 180,
        elevationDeg: 0
      },
      l = I$e(s.azimuthDeg, s.elevationDeg),
      d = i.findIndex(u => u.role === "rim" || u.role === "back");
    d >= 0 ? i[d] = {
      ...i[d],
      ...l
    } : i.push(vAe({
      role: "rim",
      ...l,
      color: "#CFE9FF",
      intensity: .8
    }));
  }
  return n.sceneLights = i, n;
}

function lio(e) {
  const t = Npe(e);
  return t[Math.max(0, Math.min(e.selectedLightIndex ?? 0, t.length - 1))] ?? t[0];
}

function Jgr(e) {
  return dUt.find(t => t.name === e);
}

const cio = `(MASTER_CINEMATOGRAPHY_MODE: ON), act as a Roger Deakins-level Director of Photography and Chief Lighting Technician.

**STRICT RULE: You are NOT allowed to modify, alter, remove, add, reshape, beautify, redesign, or change ANY original elements of the image (characters, props, shapes, costume, makeup, environment, framing, pose, anatomy, composition). You may ONLY adjust lighting, exposure, shading, color temperature, volumetrics, and optical characteristics. ALL structural, narrative, and visual content MUST remain untouched.**

Apply the following "Hollywood Lighting Physics & Aesthetics Knowledge Base" to analyze and correct ONLY THE LIGHTING of the image:

## [KNOWLEDGE BASE: LIGHTING PHYSICS & AESTHETICS]
1. **Motivated Lighting (Diegetic Only)** — Every light must come from a logical in-scene source (window, lamp, moon, fire). No artificial floating studio lights allowed.
2. **Short Lighting Rule (Far-Side Key)** — Key should illuminate the face *away* from camera, leaving camera-side in shadow. Avoid broad/flat lighting.
3. **Inverse Square Law** — Light falloff must follow physics: foreground brighter → midground → background unless intentional silhouette.
4. **Color Temperature Logic** — Fire/Candle/Tungsten: 1800–3200K (warm amber); Daylight/Moon: 5600–8000K (cool cyan/teal); apply warm key vs cool shadow separation if contextually motivated.
5. **Material Physics (PBR Accuracy)** — Skin: add SSS (subsurface scattering) & micro-red scatter at shadow edges; Metals: realistic specular anisotropy + Fresnel reflections.

## [DIAGNOSTIC & REPAIR — LIGHTING ONLY]
STEP 1 — FIX LIGHT DIRECTION (MOLDING): detect the in-scene (diegetic) motivating source; realign Key Light to match its direction; add Negative Fill to deepen shadows and raise contrast to cinematic ratios (8:1–16:1); remove flat frontal lighting. Do NOT modify character pose, objects, or composition. Only adjust LIGHT.
STEP 2 — FIX COLOR GRADING (LIGHTING ONLY): warm up highlights if source is warm (fire/lamp); cool shadows subtly for chromatic separation; keep blacks clean. No redesign of colors of objects—only change how light affects them.
STEP 3 — FIX TEXTURE & OPTICAL EFFECTS: apply ONLY lighting-related optical effects — anamorphic lens glow, oval bokeh, barrel distortion; halation on bright light sources; film-grain lighting roll-off; restore pore texture via lighting micro-contrast. Do NOT retouch skin shape, face proportions, makeup, or geometry.
STEP 4 — VOLUMETRICS & AIR: add haze, Tyndall scattering, god rays ONLY if motivated by the existing light. Do not add new objects or environmental redesign.

## [EXECUTION PARAMETERS — LIGHTING ONLY]
Photorealistic, 8K, Arri Alexa 65, Panavision Primo 70, Kodak Vision3 500T halation, path-traced global illumination and reflections.
**All operations strictly limited to lighting and cinematic optical behavior.**`;

function dio(e) {
  return CSt[e] ?? "灯光";
}

function uio(e, t) {
  const n = Jgr(e.layoutPreset),
    r = e.hardness === "hard" ? t === "zh" ? "硬光" : "hard" : t === "zh" ? "柔光" : "soft",
    a = [];
  return t === "zh" ? (n && a.push(`布光预设:${n.label}。`), a.push(`光质:${r}。`)) : (n && a.push(`Layout preset: ${n.label}. `), a.push(`Light quality: ${r}. `)), (e.sceneLights ?? []).forEach(i => {
    const o = Ygr(i.intensity);
    t === "zh" ? a.push(`${dio(i.role)}:方位 ${i.azimuthDeg}°,仰角 ${i.elevationDeg}°,${i.color},光线${Omn(o)}。`) : a.push(`${i.role} light: azimuth ${i.azimuthDeg}°, elevation ${i.elevationDeg}°, ${i.color}, ${Omn(o)}. `);
  }), a;
}

function hio(e, t = "en") {
  var s, l;
  const n = e.preset ? aue.find(d => d.key === e.preset) : void 0,
    r = (n == null ? void 0 : n.key) ?? `custom(${e.azimuthDeg}°,${e.elevationDeg}°)`,
    a = e.rimEnabled ? `rim light ON (${e.rimPreset}: az ${((s = LJ[e.rimPreset]) == null ? void 0 : s.azimuthDeg) ?? 180}°, el ${((l = LJ[e.rimPreset]) == null ? void 0 : l.elevationDeg) ?? 0}°)` : "rim light OFF",
    i = e.temperatureK < 4e3 ? "偏暖" : e.temperatureK >= 7e3 ? "偏冷" : "中性",
    o = uio(e, t);
  return t === "zh" ? [`主光光位:${(n == null ? void 0 : n.label) ?? "自定义"}/${r}(方位 ${e.azimuthDeg}°,仰角 ${e.elevationDeg}°)。`, `亮度:${e.brightnessPercent}%。`, `色温:${e.temperatureK}K(${i})。`, `${a}。`, ...o, "仅调整光照/曝光/明暗/色温/体积光与光学特性,保持人物、道具、构图、身份不变。"].join("") : [`Main light: ${r} (azimuth ${e.azimuthDeg}°, elevation ${e.elevationDeg}°). `, `Brightness: ${e.brightnessPercent}%. `, `Color temperature: ${e.temperatureK}K. `, `${a}. `, ...o, "Adjust lighting/exposure/shading/color-temperature/volumetrics/optics only; keep subject, props, composition and identity untouched."].join("");
}

function pio(e) {
  return `${cio}

---

[USER LIGHTING SETUP]
${hio(e)}`;
}

function dDe(e) {
  return e.isActive ? pio(Wgr(e)) : "";
}

function wAe(e) {
  if (!e.isActive) return "";
  const t = Wgr(e),
    n = t.preset ? aue.find(o => o.key === t.preset) : void 0,
    r = t.temperatureK < 4e3 ? "偏暖" : t.temperatureK >= 7e3 ? "偏冷" : "中性",
    a = Jgr(t.layoutPreset);
  return [a ? `布光: ${a.label}` : `主光: ${(n == null ? void 0 : n.label) ?? "自定义"} (${t.azimuthDeg}°, ${t.elevationDeg}°)`, `光质: ${t.hardness === "hard" ? "硬光" : "柔光"}`, `亮度: ${t.brightnessPercent}%`, `色温: ${t.temperatureK}K(${r})`, t.rimEnabled ? `轮廓光: 开(${t.rimPreset})` : "轮廓光: 关"].join(" | ");
}

const Zgr = "人像质感调节",
  hUt = [{
    key: "subject_scene_fusion",
    title: "人景融合",
    options: ["轻度对齐", "自然融合", "深度融合"],
    default: "自然融合",
    intents: {
      轻度对齐: "人物与背景仅做轻度贴合，尽量保持原图空间关系和边缘，不做场景重绘",
      自然融合: "人物与场景自然贴合，边缘过渡干净，保持原图空间关系，避免重绘背景",
      深度融合: "人物更深地融入环境光与景深，仍不改变构图、身份与背景主体"
    }
  }, {
    key: "lighting_fusion",
    title: "光影融合",
    options: ["柔和补光", "自然匹配", "氛围强化"],
    default: "自然匹配",
    intents: {
      柔和补光: "对人物做柔和补光，提亮暗部但不改变场景主光方向",
      自然匹配: "人物受光与场景光方向、色温、对比自然统一",
      氛围强化: "强化人物与场景的光影氛围，保留原图光位逻辑，避免戏剧化改脸"
    }
  }, {
    key: "skin_texture",
    title: "皮肤",
    options: ["清透修饰", "自然肤质", "真实肌理"],
    default: "自然肤质",
    intents: {
      清透修饰: "皮肤清透修饰，去掉油光与明显瑕疵，保留基本肤质，禁止厚磨皮",
      自然肤质: "皮肤质感自然，保留毛孔与细微纹理，去除油光与明显瑕疵，不过度磨皮",
      真实肌理: "强化真实肌理与毛孔细节，避免塑料感、滤镜感和过度锐化"
    }
  }, {
    key: "surface_texture",
    title: "纹理",
    options: ["柔和纹理", "自然纹理", "颗粒质感"],
    default: "自然纹理",
    intents: {
      柔和纹理: "服装与表面纹理略作柔化，避免脏噪和压缩颗粒",
      自然纹理: "服装、发丝与材质保持自然真实细节，避免塑料感",
      颗粒质感: "保留轻微胶片颗粒与材质层次，但不脏、不糊"
    }
  }, {
    key: "sharpness",
    title: "锐度",
    options: ["柔焦", "标准清晰", "高清锐化"],
    default: "标准清晰",
    intents: {
      柔焦: "整体略柔，五官仍可辨，避免糊成一张",
      标准清晰: "五官立体、眼神光清晰，发丝边缘干净",
      高清锐化: "提升细节清晰度，避免过锐白边和数字锐化伪影"
    }
  }],
  mio = {
    subject_scene_fusion: "自然融合",
    lighting_fusion: "自然匹配",
    skin_texture: "自然肤质",
    surface_texture: "自然纹理",
    sharpness: "标准清晰",
    note: "",
    isActive: !1
  },
  fio = "保持人物身份、年龄、脸型、五官、发型、服装与构图不变，不改变背景主体关系，不得出现文字与水印。";

function gio(e, t) {
  const n = typeof t == "string" ? t.trim() : "";
  return e.options.includes(n) ? n : e.default;
}

function twe(e) {
  const t = e && typeof e == "object" ? e : {},
    n = {
      ...mio
    };
  for (const r of hUt) n[r.key] = gio(r, t[r.key]);
  return n.note = typeof t.note == "string" ? t.note : "", n.isActive = t.isActive === !0, n;
}

function YQ(e) {
  return !!(e && typeof e == "object" && e.isActive === !0);
}

function nwe(e) {
  const t = twe(e),
    n = t.note.trim(),
    r = ["对参考图人像进行质感优化。"];
  n && r.push(`补充要求：${n}。`);
  for (const a of hUt) {
    const i = t[a.key],
      o = a.intents[i] || i;
    r.push(`${a.title}采用${i}，${o}。`);
  }
  return r.push(fio), r.join("");
}

const e0r = "情绪调节",
  iS = {
    excited: "激动",
    low: "平静",
    restrained: "亲近",
    expressive: "疏离",
    neutral: "中性"
  },
  xAe = [{
    name: "欣然愉悦",
    x: -.4,
    y: .7
  }, {
    name: "骤然错愕",
    x: -.2,
    y: .85
  }, {
    name: "惊魂未定",
    x: -.3,
    y: .9
  }, {
    name: "心跳骤停",
    x: -.2,
    y: 1
  }, {
    name: "暴怒沉怒",
    x: .25,
    y: .8
  }, {
    name: "浅然莞尔",
    x: -.5,
    y: .35
  }, {
    name: "难以置信",
    x: .1,
    y: .75
  }, {
    name: "受惊后退",
    x: -.2,
    y: .85
  }, {
    name: "强忍悲戚",
    x: -.3,
    y: -.6
  }, {
    name: "隐忍愠怒",
    x: .3,
    y: .4
  }, {
    name: "含情凝望",
    x: -.8,
    y: .2
  }, {
    name: "欲言又止",
    x: -.6,
    y: 0
  }, {
    name: "淡然自若",
    x: -.1,
    y: -.15
  }, {
    name: "警觉审视",
    x: .55,
    y: .35
  }, {
    name: "眉宇凝霜",
    x: .6,
    y: .1
  }, {
    name: "满眼宠溺",
    x: -.85,
    y: .3
  }, {
    name: "万般无奈",
    x: .1,
    y: -.5
  }, {
    name: "触景伤情",
    x: -.3,
    y: -.55
  }, {
    name: "隐忍心伤",
    x: -.2,
    y: -.6
  }, {
    name: "冷眼漠然",
    x: .8,
    y: -.2
  }, {
    name: "积郁憋闷",
    x: .2,
    y: -.3
  }, {
    name: "默然垂泪",
    x: -.2,
    y: -.7
  }, {
    name: "疲惫失神",
    x: .25,
    y: -.8
  }, {
    name: "哀悼压抑",
    x: -.15,
    y: -.75
  }, {
    name: "疏离冷淡",
    x: .9,
    y: -.3
  }],
  ESt = [-1, -.5, 0, .5, 1],
  Glt = xAe.find(e => e.name === "淡然自若") ?? xAe[12];

function sEe(e, t) {
  return {
    id: `mood-face-${e}`,
    name: `角色${e}`,
    x: (t == null ? void 0 : t.x) ?? Glt.x,
    y: (t == null ? void 0 : t.y) ?? Glt.y,
    presetName: (t == null ? void 0 : t.presetName) ?? Glt.name,
    ...(t != null && t.bbox ? {
      bbox: t.bbox
    } : {})
  };
}

sEe(1);

function iue(e) {
  return Number.isFinite(e) ? Math.max(-1, Math.min(1, e)) : 0;
}

function TSt(e, t) {
  const n = iue(e),
    r = iue(t),
    a = Math.hypot(n, r);
  if (a < .15) return iS.neutral;
  const i = Math.abs(r) >= Math.abs(n),
    o = i ? r > 0 ? iS.excited : iS.low : n > 0 ? iS.expressive : iS.restrained,
    s = i ? n > 0 ? iS.expressive : n < 0 ? iS.restrained : null : r > 0 ? iS.excited : r < 0 ? iS.low : null;
  return a < .45 ? `偏${o}` : a < .75 || !s ? o : `${o}而${s}`;
}

function pUt(e, t) {
  let n = null,
    r = .18;
  for (const a of xAe) {
    const i = Math.hypot(a.x - e, a.y - t);
    i < r && (n = a, r = i);
  }
  return n;
}

function t0r(e) {
  if (e.presetName.trim()) return e.presetName.trim();
  const t = pUt(e.x, e.y);
  return (t == null ? void 0 : t.name) ?? TSt(e.x, e.y);
}

function MSt(e, t) {
  var a;
  const n = iue(e),
    r = iue(t);
  return {
    x: n,
    y: r,
    presetName: ((a = pUt(n, r)) == null ? void 0 : a.name) ?? ""
  };
}

function yio(e) {
  if (!e || typeof e != "object") return;
  const t = e,
    n = Number(t.x),
    r = Number(t.y),
    a = Number(t.w ?? t.width),
    i = Number(t.h ?? t.height);
  if (!(![n, r, a, i].every(Number.isFinite) || a < 1 || i < 1)) return {
    x: n,
    y: r,
    w: a,
    h: i
  };
}

function bio(e, t) {
  var s;
  const n = e && typeof e == "object" ? e : {},
    r = sEe(t),
    a = iue(typeof n.x == "number" ? n.x : r.x),
    i = iue(typeof n.y == "number" ? n.y : r.y),
    o = yio(n.bbox);
  return {
    id: typeof n.id == "string" && n.id.trim() ? n.id : r.id,
    name: typeof n.name == "string" && n.name.trim() ? n.name : r.name,
    x: a,
    y: i,
    presetName: typeof n.presetName == "string" ? n.presetName : ((s = pUt(a, i)) == null ? void 0 : s.name) ?? "",
    ...(o ? {
      bbox: o
    } : {})
  };
}

function mj(e) {
  var a;
  const t = e && typeof e == "object" ? e : {},
    n = Array.isArray(t.faces) ? t.faces.map((i, o) => bio(i, o + 1)) : [sEe(1)],
    r = typeof t.selectedFaceId == "string" && n.some(i => i.id === t.selectedFaceId) ? t.selectedFaceId : ((a = n[0]) == null ? void 0 : a.id) ?? "";
  return {
    faces: n,
    selectedFaceId: r,
    analyzeModelId: typeof t.analyzeModelId == "string" ? t.analyzeModelId : "",
    analyzePlatformGroup: typeof t.analyzePlatformGroup == "string" ? t.analyzePlatformGroup : "",
    analyzeReasoningEffort: typeof t.analyzeReasoningEffort == "string" ? t.analyzeReasoningEffort : "",
    analyzeGeminiApiFormat: typeof t.analyzeGeminiApiFormat == "string" ? t.analyzeGeminiApiFormat : "",
    imageWidth: Number.isFinite(Number(t.imageWidth)) ? Math.max(0, Number(t.imageWidth)) : 0,
    imageHeight: Number.isFinite(Number(t.imageHeight)) ? Math.max(0, Number(t.imageHeight)) : 0,
    isActive: t.isActive === !0
  };
}

function XQ(e) {
  return !!(e && typeof e == "object" && e.isActive === !0);
}

function n0r(e, t, n, r, a) {
  const i = Math.max(1, r),
    o = Math.max(1, a),
    s = (e === "cover" ? Math.max : Math.min)(t / i, n / o),
    l = i * s,
    d = o * s;
  return {
    left: (t - l) / 2,
    top: (n - d) / 2,
    width: l,
    height: d
  };
}

function Umn(e, t, n, r, a, i = "cover") {
  const o = n0r(i, r, a, t, n);
  return {
    left: o.left + e.x / Math.max(1, t) * o.width,
    top: o.top + e.y / Math.max(1, n) * o.height,
    width: e.w / Math.max(1, t) * o.width,
    height: e.h / Math.max(1, n) * o.height
  };
}

function vio(e, t, n, r, a, i = "cover") {
  const o = n0r(i, n.width, n.height, r, a);
  return {
    x: Math.max(0, Math.min(r, (e - n.left - o.left) / Math.max(1, o.width) * r)),
    y: Math.max(0, Math.min(a, (t - n.top - o.top) / Math.max(1, o.height) * a))
  };
}

function $mn(e, t) {
  const n = Math.min(e.x, t.x),
    r = Math.min(e.y, t.y);
  return {
    x: n,
    y: r,
    w: Math.abs(t.x - e.x),
    h: Math.abs(t.y - e.y)
  };
}

function r0r(e, t, n, r) {
  const a = mj(e),
    i = a.faces.length === 1 && !a.faces[0].bbox,
    o = i ? {
      ...a.faces[0],
      bbox: t
    } : {
      ...sEe(a.faces.length + 1),
      bbox: t
    },
    s = i ? [o] : [...a.faces, o];
  return {
    ...a,
    faces: s,
    selectedFaceId: o.id,
    imageWidth: n || a.imageWidth,
    imageHeight: r || a.imageHeight
  };
}

function a0r(e, t) {
  const n = mj(e);
  return n.faces.some(r => r.id === t) ? {
    ...n,
    selectedFaceId: t
  } : n;
}

function wio(e) {
  return e.faces.find(t => t.id === e.selectedFaceId) ?? e.faces[0];
}

function xio(e) {
  return `(${Math.round(e.x)},${Math.round(e.y)},${Math.round(e.w)}×${Math.round(e.h)})`;
}

function _io(e, t, n) {
  const r = Math.max(1, t),
    a = Math.max(1, n),
    i = Math.max(0, Math.min(r - 1, e.x * r)),
    o = Math.max(0, Math.min(a - 1, e.y * a)),
    s = Math.max(1, Math.min(r - i, e.w * r)),
    l = Math.max(1, Math.min(a - o, e.h * a));
  return {
    x: i,
    y: o,
    w: s,
    h: l
  };
}

function rwe(e) {
  const t = mj(e);
  return ["以参考图一（原图）为主参考图。", t.faces.map((r, a) => {
    const i = t0r(r);
    return r.bbox ? `第${a + 1}个人脸参考图的坐标是${xio(r.bbox)}设置成${i}表情` : t.faces.length === 1 ? `设置成${i}表情` : `第${a + 1}个角色设置成${i}表情`;
  }).join("；"), "。保持人物身份、年龄、脸型、五官、发型、服装与构图不变，不得出现文字与水印。"].join("");
}

function kio(e) {
  return e === "gpt-image-2-fal" ? "gpt-image-2-fal" : e === "gpt-image-2.5-sunburst-fal" || e === "gpt-image-2.5-flare-fal" ? e : e === "muse-image-fal" ? "muse-image-fal" : e === "mai-image-2.5-pro-fal" ? "mai-image-2.5-pro-fal" : e === "grok-imagine-image-fal" ? "grok-imagine-image-fal" : e === "grok-imagine-image-quality-fal" ? "grok-imagine-image-quality-fal" : e === "grok-imagine-image-2.0-fal" ? "grok-imagine-image-2.0-fal" : e === "nano-banana-fal" ? "nano-banana-fal" : e === "nano-banana-2-fal" ? "nano-banana-2-fal" : e === "gemini-3.1-flash-image-preview-fal" ? "gemini-3.1-flash-image-preview-fal" : e === "gemini-nano-banana-2.1-fal" ? "gemini-nano-banana-2.1-fal" : e === "gemini-3.1-flash-lite-image-fal" ? "gemini-3.1-flash-lite-image-fal" : e.includes("gpt-image") || e.includes("gpt-4o-image") ? "gpt-image" : e.includes("flux-kontext") ? "flux-kontext" : e.includes("qwen-image-edit") ? "qwen-image-edit" : e.startsWith("grsai-nano-banana") ? "grsai" : g3(e) || e.includes("nano-banana-2") || e.includes("gemini-3.1-flash-image-preview") ? "nano-banana-2" : e.includes("nano-banana") ? "nano-banana" : e.includes("mj") || e.toLowerCase().includes("midjourney") ? "midjourney" : "generic";
}

function i0r(e) {
  return ux(e) || zS(e) || kh(e);
}

function Aio(e, t, n) {
  const r = (t || "").trim() || "Auto",
    a = ah(e);
  if (a.length > 0) return a.includes(r) ? r : a[0] ?? "1:1";
  if (!i0r(e)) return r;
  const i = String((n == null ? void 0 : n.gptImage2AspectRatio) || "").trim();
  if (i) return pu(i);
  const o = String((n == null ? void 0 : n.ratio) || "").trim(),
    s = r !== "Auto" && r.toLowerCase() !== "auto" ? r : o;
  if (/^\d+\s*[xX]\s*\d+$/i.test(s)) {
    const l = rw(s.toLowerCase().replace(/\s/g, ""));
    if (l) return l.aspectRatio;
  }
  return /^\d+:\d+$/.test(s.replace(/\s/g, "")) ? pu(s.replace(/\s/g, "")) : s && s.toLowerCase() !== "auto" ? pu(s) : "1:1";
}

function Sio(e, t, n) {
  const r = rl(e);
  let a = (t || "").trim() || "2K";
  if (i0r(e)) {
    const i = String((n == null ? void 0 : n.gptImage2Resolution) || "").trim();
    if (i) a = i;else {
      const o = String((n == null ? void 0 : n.ratio) || t || "").trim();
      if (/^\d+\s*[xX]\s*\d+$/i.test(o)) {
        const s = rw(o.toLowerCase().replace(/\s/g, ""));
        s && (a = s.resolution);
      }
    }
    return a;
  }
  return r.length > 0 && (a = r.includes(a) ? a : r[0] ?? "2K"), a;
}

function Iio(e, t, n, r) {
  const a = {
      ...(e || {})
    },
    i = Aio(t, n, e),
    o = Sio(t, r, e);
  if (a.ratio = i, a.resolution = o, Up(t)) return khe(a), a;
  if (ux(t) || zS(t) || kh(t)) {
    const s = pu(i === "Auto" ? "1:1" : i);
    let l = mg(o);
    zS(t) && ((l === "auto" || l === "custom") && (l = "1k"), l !== "1k" && l !== "2k" && l !== "4k" && (l = "1k")), a.gptImage2AspectRatio = s, a.gptImage2Resolution = l, zS(t) ? _he(a) : ux(t) ? nI(a) : kh(t) ? MP(t, a) : a.ratio = i === "Auto" ? "Auto" : i;
  }
  return a;
}

function Gmn(e, t) {
  const n = {
      ...(t || {})
    },
    r = ah(e),
    a = ux(e) || zS(e) || kh(e),
    i = String(n.ratio ?? "Auto").trim() || "Auto";
  let o = a ? i : dKe(e, i);
  const s = /^\d+\s*[xX]\s*\d+$/i.test(o);
  !r.includes(o) && !(a && (s || /^\d+:\d+$/.test(o.replace(/\s/g, "")))) && (o = r[0] ?? "1:1"), o !== i && (n.ratio = o);
  const l = rl(e);
  let d = String(n.resolution ?? "").trim();
  if (l.length > 0 ? l.includes(d) || (n.resolution = l[0] ?? "2K") : d || (n.resolution = "2K"), ux(e)) nI(n);else if (kh(e)) MP(e, n);else if (zS(e)) {
    const u = pu(o === "Auto" ? "1:1" : o);
    n.gptImage2AspectRatio = u;
    let h = mg(String(n.gptImage2Resolution || n.resolution || "1k"));
    (h === "auto" || h === "custom") && (h = "1k"), h !== "1k" && h !== "2k" && h !== "4k" && (h = "1k"), n.gptImage2Resolution = h, _he(n);
  } else Up(e) && khe(n);
  return n;
}

function Cio(e, t) {
  const n = t || {};
  let r = String(n.ratio ?? "Auto").trim() || "Auto";
  /^\d+\s*[xX]\s*\d+/i.test(r) && n.gptImage2AspectRatio && (r = String(n.gptImage2AspectRatio).trim());
  let a = String(n.resolution ?? "2K").trim() || "2K";
  if (ux(e) || kh(e)) {
    const i = String(n.gptImage2Resolution || "").trim().toLowerCase();
    if (i === "auto") r = "Auto", a = "";else if (i === "custom") {
      const o = String(n.gptImage2CustomSize || n.ratio || "").trim();
      a = o ? o.replace("x", "×") : "自定义";
    } else i && (a = i.toUpperCase());
  }
  if (zS(e)) {
    const i = String(n.gptImage2Resolution || "1k").trim().toLowerCase();
    i && (a = i.toUpperCase());
  }
  if (Up(e)) {
    const i = String(n.resolution || "2K").trim() || "2K",
      o = cX(n.gptImageModeration),
      s = Uxe[o],
      l = IZ(e, n.gptImageQuality),
      d = rIe(e)[l] || l,
      u = pI(e) ? $xe[dX(n.gptImageBackground)] : void 0;
    return `${r}·${i}·${d}${s ? `·${s}` : ""}${u ? `·${u}` : ""}`;
  }
  if (fm(e) || vy(e)) {
    const i = TP(e, n.gptImageQuality),
      o = TWe(e)[i] || i;
    return r === "Auto" ? `Auto·${o}` : `${r}·${a}·${o}`;
  }
  if (pk(e)) {
    const i = String(n.gptImageQuality || "high"),
      o = MWe[i] || i;
    return r === "Auto" ? `Auto·${o}` : `${r}·${a}·${o}`;
  }
  return (e.includes("gpt-image") || e.includes("gpt-4o-image")) && !e.includes("gpt-image-2") && rl(e).length === 0 && (a = String(n.gptImageQuality || "standard") === "hd" ? "HD" : "Std"), `${r}·${a}`;
}

const Eio = "无法读取输入音频，请检查连线或重新上传";

function Tio(e) {
  return pb(e.currentModel) ? {
    modelPath: yft,
    endpoint: `${Po(e.baseUrl)}/${yft}`
  } : null;
}

function Mio(e) {
  return pb(e.currentModel) ? {
    modelPath: yOe,
    endpoint: `${Po(e.baseUrl)}/${yOe}`
  } : null;
}

function Pio(e) {
  const t = {
      audio_url: String(e.audioUrl || "").trim()
    },
    n = String(e.prompt || "").trim();
  n && (t.prompt = n);
  const r = DWe(e.voice);
  return r && (t.voice = r), t;
}

function Rio(e) {
  return O1(e.currentModel) ? {
    modelPath: Axe,
    endpoint: `${Po(e.baseUrl)}/${Axe}`
  } : null;
}

function Nio(e) {
  return B1(e.currentModel) ? {
    modelPath: Sxe,
    endpoint: `${Po(e.baseUrl)}/${Sxe}`
  } : null;
}

function jio(e) {
  if (!F1(e.currentModel)) return null;
  const t = PMn(e.currentModel);
  return {
    modelPath: t,
    endpoint: `${Po(e.baseUrl)}/${t}`
  };
}

function Vlt(e) {
  if (!ub(e.currentModel)) return null;
  const t = e.mode || (r8t(e.currentModel) ? "voice-clone" : a8t(e.currentModel) ? "voice-design" : "tts"),
    n = t === "voice-clone" ? Cxe : t === "voice-design" ? Exe : i8t(e.currentModel);
  return {
    modelPath: n,
    endpoint: `${Po(e.baseUrl)}/${n}`
  };
}

function Vmn(e) {
  if (!ub(e.currentModel)) return null;
  const t = i8t(e.currentModel);
  return {
    modelPath: t,
    endpoint: `${Po(e.baseUrl)}/${t}`
  };
}

function Dio(e) {
  return Fj(e.currentModel) ? {
    modelPath: bft,
    endpoint: `${Po(e.baseUrl)}/${bft}`
  } : null;
}

function Lio(e) {
  if (!Vk(e.currentModel)) return null;
  const t = kzr(e.currentModel);
  return {
    modelPath: t,
    endpoint: `${Po(e.baseUrl)}/${t}`
  };
}

function Oio(e) {
  if (!F5(e.currentModel)) return null;
  const t = Vzr(e.currentModel);
  return {
    modelPath: t,
    endpoint: `${Po(e.baseUrl)}/${t}`
  };
}

const Bio = P9n,
  Fio = "https://wma.fal.run",
  o0r = "导演模式当前不可用：Comfly 网关没有转发 Fal 的 WMA 实时通道（wma.fal.run）。请改用 Turbo 或普通生成。";

function zio(e) {
  return $9n(e) === "480P" ? "480p" : "768p";
}

function Uio(e) {
  const t = Q8t(e, "director");
  return cce.includes(t) ? t : "16:9";
}

function $io(e) {
  const t = String(e.prompt || "").trim(),
    n = {
      type: "configure",
      protocol_version: 1,
      prompt_version: Math.max(1, Math.round(e.promptVersion)),
      prompt: t || "A continuous original live-action stream.",
      resolution: zio(e.resolution),
      aspect_ratio: Uio(e.ratio),
      memory: Math.min(50, Math.max(1, Math.round(e.memory ?? 12)))
    };
  return e.imageUrl && (n.image_url = e.imageUrl), e.seed != null && Number.isFinite(e.seed) && (n.seed = e.seed), n;
}

function s0r(e) {
  return String(e || "").trim().replace(/^(Bearer|Key|Token)\s+/i, "").trim();
}

function Gio(e) {
  const t = s0r(e);
  return !t || /^sk[-_]/i.test(t) ? !1 : /^[0-9a-f]{8,}[-0-9a-f]*:.+/i.test(t) || t.includes(":") && !/\s/.test(t);
}

function Hmn(e) {
  return /(?:^|\/\/)(?:[\w-]+\.)*fal\.run(?:[:/]|$)/i.test(e) || /(?:^|\/\/)(?:[\w-]+\.)*fal\.ai(?:[:/]|$)/i.test(e);
}

function Vio(e) {
  return vZ(e).replace(/\/fal\/?$/i, "");
}

function Hio(e, t) {
  return {
    Authorization: `${e} ${s0r(t)}`,
    "Content-Type": "application/json"
  };
}

function Wmn(e, t, n = "Bearer") {
  const r = Hio(n, t);
  return {
    id: `${e}:${n}`,
    sessionUrl: `${e}/session`,
    heartbeatUrl: `${e}/session/heartbeat`,
    sessionHeaders: r,
    heartbeatHeaders: r
  };
}

function Wio(e, t) {
  const n = Vio(e),
    r = Po(e),
    a = [],
    i = new Set(),
    o = s => {
      i.has(s.id) || (i.add(s.id), a.push(s));
    };
  return n && !Hmn(n) && o(Wmn(`${r}/wma`, t)), (Gio(t) || Hmn(n)) && o(Wmn(Fio, t, "Key")), a;
}

function nae(e) {
  const t = String(e || "").trim();
  return /^<!doctype html/i.test(t) || /^<html[\s>]/i.test(t) || /<(head|meta|title)[\s>]/i.test(t);
}

function o7(e, t = 0) {
  if (e == null || t > 4) return "";
  if (typeof e == "string") return e.trim();
  if (Array.isArray(e)) return e.map(n => o7(n, t + 1)).filter(Boolean).join("; ");
  if (typeof e == "object") {
    const n = e;
    return o7(n.message, t + 1) || o7(n.msg, t + 1) || o7(n.detail, t + 1) || o7(n.error, t + 1);
  }
  return "";
}

function qio(e, t, n) {
  const r = o7(e.detail) || o7(e.error) || o7(e.message) || o7(e.msg);
  if (r && !nae(r)) return r.slice(0, 240);
  if (nae(t) || nae(r)) return `HTTP ${n} HTML`;
  const a = String(t || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return a && !nae(a) ? a.slice(0, 240) : `HTTP ${n}`;
}

function Kio(e) {
  const t = String(e || "");
  return nae(t) || /HTML\b|model_not_found|Application .+ not found|Upstream error|unsupported auth scheme|invalid token|401|unauthorized/i.test(t) ? o0r : t;
}

async function qmn(e, t, n) {
  const r = await $i(e, {
      method: "POST",
      headers: t,
      body: JSON.stringify(n),
      redirect: "manual"
    }),
    a = await r.text();
  let i = {};
  try {
    i = a ? JSON.parse(a) : {};
  } catch {
    i = {
      error: nae(a) ? `HTTP ${r.status} HTML` : a.slice(0, 300)
    };
  }
  return {
    ok: r.ok,
    status: r.status,
    json: i,
    text: a
  };
}

async function Qio(e, t = 5e3) {
  e.iceGatheringState !== "complete" && (await new Promise(n => {
    const r = window.setTimeout(n, t),
      a = () => {
        e.iceGatheringState === "complete" && (window.clearTimeout(r), e.removeEventListener("icegatheringstatechange", a), n());
      };
    e.addEventListener("icegatheringstatechange", a);
  }));
}

const _Ae = new Map(),
  PSt = new Set();

let l0r = 0;

function s7() {
  l0r += 1;
  for (const e of PSt) e();
}

function Yio() {
  return l0r;
}

function Xio(e) {
  return PSt.add(e), () => PSt.delete(e);
}

function C$e(e) {
  return _Ae.get(e) ?? null;
}

function Hlt(e, t) {
  const n = JSON.stringify(t);
  return e.dc && e.dc.readyState === "open" ? (e.dc.send(n), !0) : (e.pending.push(n), !1);
}

function Jio(e) {
  if (!(!e.dc || e.dc.readyState !== "open")) for (; e.pending.length > 0;) e.dc.send(e.pending.shift());
}

function Kmn(e, t) {
  e.dc = t, t.onopen = () => {
    Jio(e), e.onUpdate();
  }, t.onmessage = n => {
    const r = typeof n.data == "string" ? n.data : "";
    if (!r) return;
    let a = {};
    try {
      a = JSON.parse(r);
    } catch {
      return;
    }
    const i = String(a.type || "");
    i === "configured" || i === "session_info" ? (e.status = "live", e.onUpdate(), s7()) : i === "chunk" && typeof a.playback_seconds == "number" ? (e.playbackSeconds = a.playback_seconds, e.onUpdate(), s7()) : i === "prompt_applied" && typeof a.prompt_version == "number" ? (e.promptVersion = Math.max(e.promptVersion, a.prompt_version), e.onUpdate()) : i === "error" || i === "prompt_rejected" ? (e.status = "error", e.errorMsg = String(a.error || a.reason || a.code || "导演会话失败"), e.onUpdate(), s7()) : i === "stream_exhausted" && IH(e, !1);
  };
}

async function IH(e, t) {
  var n;
  if (!e.closed) {
    e.closed = !0, e.status = "stopping", e.heartbeat != null && (window.clearInterval(e.heartbeat), e.heartbeat = null), e.pingTimer != null && (window.clearInterval(e.pingTimer), e.pingTimer = null);
    try {
      t && e.dc && e.dc.readyState === "open" && e.dc.send(JSON.stringify({
        type: "stop"
      }));
    } catch {}
    try {
      (n = e.dc) == null || n.close();
    } catch {}
    try {
      e.pc.getReceivers().forEach(r => {
        var a;
        return (a = r.track) == null ? void 0 : a.stop();
      }), e.pc.close();
    } catch {}
    e.stream = null, e.status = "idle", _Ae.delete(e.nodeId), e.onUpdate(), s7();
  }
}

async function c0r(e) {
  const t = _Ae.get(e);
  t && (await IH(t, !0));
}

async function Zio(e) {
  const t = _Ae.get(e.nodeId);
  if (t && (t.status === "live" || t.status === "connecting")) return t;
  t && (await IH(t, !1));
  const n = new RTCPeerConnection({
    iceServers: [{
      urls: "stun:stun.l.google.com:19302"
    }]
  });
  n.addTransceiver("video", {
    direction: "recvonly"
  }), n.addTransceiver("audio", {
    direction: "recvonly"
  });
  const r = {
      nodeId: e.nodeId,
      status: "connecting",
      promptVersion: e.configure.prompt_version,
      stream: null,
      playbackSeconds: 0,
      errorMsg: "",
      pc: n,
      dc: null,
      route: null,
      sessionId: "",
      heartbeat: null,
      pingTimer: null,
      pending: [],
      closed: !1,
      onUpdate: e.onUpdate || (() => {}),
      sendPrompt: h => {
        const p = String(h || "").trim();
        return p ? (r.promptVersion += 1, Hlt(r, {
          type: "prompt",
          prompt_version: r.promptVersion,
          prompt: p
        })) : !1;
      },
      stop: () => IH(r, !0)
    },
    a = n.createDataChannel("wma");
  Kmn(r, a), n.ondatachannel = h => Kmn(r, h.channel), n.ontrack = h => {
    const p = h.streams[0] || new MediaStream([h.track]);
    r.stream = p, r.status === "connecting" && (r.status = "live"), r.onUpdate(), s7();
  }, n.onconnectionstatechange = () => {
    (n.connectionState === "failed" || n.connectionState === "disconnected") && (r.status = "error", r.errorMsg = "导演会话连接中断", r.onUpdate(), s7(), IH(r, !1));
  }, _Ae.set(e.nodeId, r), s7();
  const i = await n.createOffer();
  await n.setLocalDescription(i), await Qio(n);
  const o = n.localDescription;
  if (!(o != null && o.sdp)) throw await IH(r, !1), new Error("无法创建 WebRTC offer");
  const s = {
      app_id: Bio,
      sdp: o.sdp,
      type: o.type
    },
    l = Wio(e.baseUrl, e.apiKey);
  let d = l.length === 0 ? o0r : "无法连接导演会话",
    u = null;
  for (const h of l) try {
    console.log("[H3 Max Director] WMA signaling", {
      id: h.id,
      url: h.sessionUrl,
      auth: String(h.sessionHeaders.Authorization || "").split(" ")[0]
    });
    const p = await qmn(h.sessionUrl, h.sessionHeaders, s);
    if (p.ok && typeof p.json.sdp == "string" && p.json.sdp.trim()) {
      u = {
        route: h,
        json: p.json
      };
      break;
    }
    d = qio(p.json, p.text, p.status) || d, console.warn("[H3 Max Director] signaling failed", {
      id: h.id,
      status: p.status,
      error: d
    });
  } catch (p) {
    d = p instanceof Error ? p.message : String(p), console.warn("[H3 Max Director] signaling threw", {
      id: h.id,
      error: d
    });
  }
  if (!u) {
    const h = Kio(d);
    throw r.errorMsg = h, r.status = "error", r.onUpdate(), s7(), await IH(r, !1), new Error(h);
  }
  if (r.route = u.route, r.sessionId = String(u.json.session_id || ""), await n.setRemoteDescription(new RTCSessionDescription({
    sdp: String(u.json.sdp),
    type: u.json.type || "answer"
  })), Hlt(r, e.configure), r.sessionId && r.route) {
    const h = r.route;
    r.heartbeat = window.setInterval(() => {
      qmn(h.heartbeatUrl, h.heartbeatHeaders, {
        session_id: r.sessionId
      }).catch(() => {});
    }, 5e3);
  }
  return r.pingTimer = window.setInterval(() => {
    Hlt(r, {
      type: "ping",
      ts: Date.now()
    });
  }, 1e4), r.onUpdate(), s7(), r;
}

function eoo() {
  try {
    const e = localStorage.getItem(Zi.CHARACTERS);
    if (!e) return [];
    const t = JSON.parse(e);
    return Array.isArray(t) ? t.filter(n => (n == null ? void 0 : n.id) && (n == null ? void 0 : n.name)).map(n => ({
      id: String(n.id),
      name: String(n.name)
    })) : [];
  } catch {
    return [];
  }
}

const RSt = new Map();

function lEe(e) {
  const t = RSt.get(e);
  t && (t(), RSt.delete(e));
}

function Xz(e) {
  AU(e), lEe(e), KBt(e), ucr(e), pcr(e);
}

function too(e, t, n) {
  Xz(e), window.setTimeout(() => {
    try {
      window.dispatchEvent(new CustomEvent("genHistoryTaskTerminal", {
        detail: {
          taskId: e,
          status: t,
          progress: n
        }
      }));
    } catch {}
  }, 0);
}

const Wlt = new Set();

function Qmn(e, t, n, r = 600) {
  const a = `${t}:${e}`;
  !e || Wlt.has(a) || (Wlt.add(a), window.setTimeout(() => {
    Xu(e, t, n).catch(i => {
      console.error("[Generation] 延迟下载图片失败:", i);
    }).finally(() => {
      Wlt.delete(a);
    });
  }, r + Math.floor(Math.random() * 500)));
}

function Ymn(e, t, n, r) {
  lEe(e);
  let a = 5;
  n(e, a), r(e, t, a);
  const i = Date.now(),
    o = FLt.subscribe(1500, s => {
      const l = Math.min(88, 5 + Math.floor((s - i) / 1500) * 2);
      l !== a && (a = l, n(e, a), r(e, t, a));
    });
  RSt.set(e, o);
}

function noo(e, t, n, r) {
  kyi(e, () => {
    if (VCe(e) || Bbe(String(e))) return;
    lEe(e);
    const a = "提交超时：参考图读取或 API 请求未完成，请重试";
    n(i => i.map(o => String(o.id) === String(e) && o.status === "generating" ? {
      ...o,
      status: "failed",
      progress: 0,
      errorMsg: a
    } : o)), r(t, {
      isGenerating: !1,
      errorMsg: a,
      settings: {
        isGenerating: !1,
        progress: 0,
        error: a
      }
    }), el(r, t, !1);
  });
}

const roo = ({
  canvasBackground: e = !0,
  isCanvasWriteCurrent: t = Bro,
  documentSession: n,
  apiConfigs: r,
  globalApiKey: a,
  connections: i,
  nodes: o,
  nodesMap: s,
  setNodes: l,
  setHistory: d,
  getConnectedInputImages: u,
  getConnectedInputItems: h,
  getConnectedImageForInput: p,
  generateId: m
}) => {
  const f = d,
    y = g.useCallback(N => {
      f(G => {
        const z = typeof N == "function" ? N(G) : N;
        if (z === G) return G;
        const V = new Map(G.map(O => [String(O.id), O]));
        for (const O of z) {
          const L = V.get(String(O.id));
          (L == null ? void 0 : L.status) === "generating" && (O.status === "completed" || O.status === "failed") && too(String(O.id), O.status, O.progress ?? (O.status === "completed" ? 100 : 0));
        }
        return z;
      });
    }, [f]),
    b = g.useRef(new Map()),
    v = g.useRef(!1),
    _ = g.useCallback((N, G) => {
      const z = String(N);
      if (b.current.set(z, G), v.current) return;
      v.current = !0;
      const V = () => {
        v.current = !1;
        const O = b.current;
        if (O.size === 0) return;
        const L = new Map(O);
        O.clear(), al.setProgressBatch(L);
      };
      Yi() ? vae(V) : requestAnimationFrame(() => {
        if (Yi()) {
          vae(V);
          return;
        }
        V();
      });
    }, []),
    w = g.useCallback((N, G) => {
      const z = () => {
        N() && (Rwe(), Da.unstable_batchedUpdates(G));
      };
      Yi() ? vae(z) : g.startTransition(z);
    }, []);
  g.useCallback(AJe(l, t), [l, t]);
  const k = g.useRef(null);
  g.useEffect(() => {
    k.current = o;
  }, [o]);
  const A = g.useRef(s);
  g.useEffect(() => {
    A.current = s;
  }, [s]);
  const S = g.useRef(null);
  g.useEffect(() => {
    S.current = i;
  }, [i]);
  const C = Fro(o, s, l, t, e),
    I = C.updateNode,
    E = g.useCallback((N, G, z) => {
      if (!Number.isFinite(z)) return;
      const V = Math.min(100, Math.max(0, z));
      _(N, V);
    }, [_]);
  g.useEffect(() => {
    hcr();
    const N = G => {
      var V;
      const z = String(((V = G == null ? void 0 : G.detail) == null ? void 0 : V.nodeId) || "").trim();
      z && C.cancel(z);
    };
    return window.addEventListener("cancelPolling", N), () => window.removeEventListener("cancelPolling", N);
  }, [C.cancel]);
  const M = g.useRef(new Map()),
    T = g.useCallback(async (N, G) => {
      var we, X, Z, re, fe, ye, ie, ae;
      const {
          updateNode: z
        } = G,
        V = String(((we = N.settings) == null ? void 0 : we.model) || "").trim(),
        O = F5(V);
      if (Vk(V) || O) {
        const be = r.find(Te => Te.id === V),
          Ee = ((be == null ? void 0 : be.url) || "https://ai.comfly.chat").replace(/\/+$/, ""),
          xe = (((X = k.current) == null ? void 0 : X.find(Te => Te.id === N.id)) ?? N).settings ?? N.settings,
          he = cu(be == null ? void 0 : be.key, a, xe == null ? void 0 : xe.savedApiKeyId, {
            platformGroup: xe == null ? void 0 : xe.platformGroup,
            modelName: (be == null ? void 0 : be.modelName) || V,
            modelId: (be == null ? void 0 : be.id) || V,
            baseUrl: Ee,
            modelSavedApiKeyId: be == null ? void 0 : be.savedApiKeyId
          });
        if (!he) {
          el(z, N.id, !1), alert(x("请先配置 API Key"));
          return;
        }
        const ue = String(N.prompt || "").trim() || String((xe == null ? void 0 : xe.instrumentalDescription) || "").trim();
        if (!ue) {
          el(z, N.id, !1), alert(x("请输入音乐描述"));
          return;
        }
        if (O && ue.length < 10) {
          el(z, N.id, !1), alert(x("风格描述至少 10 个字符"));
          return;
        }
        const ge = O ? "MiniMax Music" : "Elevenlabs Music",
          _e = O ? Oio({
            currentModel: V,
            baseUrl: Ee
          }) : Lio({
            currentModel: V,
            baseUrl: Ee
          });
        if (!_e) {
          el(z, N.id, !1), alert(x("{0} 模型配置无效", ge));
          return;
        }
        const ke = f5(N) ? $6(N) : null;
        z(N.id, {
          ...(ke ? {
            content: ke.content,
            errorMsg: ke.errorMsg
          } : {}),
          isGenerating: !0,
          errorMsg: void 0,
          settings: {
            ...((ke == null ? void 0 : ke.settings) ?? N.settings),
            isGenerating: !0,
            progress: 0,
            error: null
          }
        });
        const ve = {
          id: m(),
          type: "audio",
          url: "",
          prompt: ue,
          ...ky(),
          status: "generating",
          progress: 0,
          modelName: (be == null ? void 0 : be.modelName) || V,
          sourceNodeId: N.id
        };
        y(Te => [ve, ...Te]);
        try {
          const Te = O ? qzr({
            prompt: ue,
            lyrics: String((xe == null ? void 0 : xe.lyrics) || ""),
            isInstrumental: !!(xe != null && xe.isInstrumental),
            lyricsOptimizer: !(xe != null && xe.isInstrumental) && !String((xe == null ? void 0 : xe.lyrics) || "").trim()
          }) : Izr({
            prompt: ue,
            musicLengthSec: typeof (xe == null ? void 0 : xe.musicLengthSec) == "number" ? xe.musicLengthSec : Number.parseInt(String((xe == null ? void 0 : xe.musicLengthSec) || ""), 10) || void 0,
            forceInstrumental: !!(xe != null && xe.isInstrumental)
          });
          console.log(`[${ge} Fal] POST`, _e.endpoint, O ? {
            hasPrompt: !!Te.prompt,
            hasLyrics: !!Te.lyrics,
            lyricsOptimizer: !!Te.lyrics_optimizer,
            isInstrumental: !!Te.is_instrumental
          } : {
            hasPrompt: !!Te.prompt,
            musicLengthMs: Te.music_length_ms || "auto",
            forceInstrumental: !!Te.force_instrumental
          });
          const Ne = await $i(_e.endpoint, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${he}`,
              "Content-Type": "application/json"
            },
            body: await Pg(Te)
          });
          let me = {};
          try {
            me = await Ne.json();
          } catch {
            throw new Error(`${ge} 接口返回无效 JSON`);
          }
          if (!Ne.ok) throw new Error(Dm(me) || String(me.error || me.message || `${ge} 提交失败（HTTP ${Ne.status}）`));
          wh(me);
          const Ae = await e5({
              falPrefix: Po(Ee),
              apiKey: he,
              modelPath: _e.modelPath,
              submitData: me,
              onProgress: rt => {
                _(ve.id, rt), E(ve.id, N.id, rt);
              }
            }),
            Fe = Ae.audioUrl,
            Me = `music_${ve.id}`,
            Re = E0(),
            $e = ((Z = k.current) == null ? void 0 : Z.find(rt => rt.id === N.id)) ?? N;
          z($e.id, fie($e, {
            isGenerating: !1,
            errorMsg: void 0,
            content: Fe,
            prompt: ue,
            settings: {
              ...($e.settings ?? {}),
              audioUrl: Fe,
              duration: Ae.duration
            }
          })), y(rt => rt.map(nt => nt.id === ve.id ? Re ? {
            ...nt,
            status: "completed",
            url: Fe,
            audioUrl: Fe,
            progress: 100,
            ossUploaded: !0,
            _globalOssUrlOnly: !0,
            _ossRemoteUrl: Fe,
            _assetId: void 0,
            _audioAssetId: void 0
          } : {
            ...nt,
            status: "completed",
            url: Fe,
            audioUrl: Fe,
            progress: 100,
            _audioAssetId: Me,
            _assetId: Me
          } : nt)), (async () => {
            var Ke;
            if (!Re) {
              Fe && Xu(Fe, Me, `music_${ve.id}.mp3`, fbe).catch(() => {});
              return;
            }
            const {
              playbackUrl: rt,
              ossSettings: nt,
              usedOss: ze
            } = await wSt(Fe, Me);
            if (!ze || !rt) {
              y(Xe => Xe.map(De => De.id === ve.id ? {
                ...De,
                ossUploaded: !1,
                _globalOssUrlOnly: void 0,
                _ossRemoteUrl: void 0
              } : De));
              return;
            }
            const Le = ((Ke = k.current) == null ? void 0 : Ke.find(Xe => Xe.id === N.id)) ?? N;
            z(Le.id, fie(Le, {
              isGenerating: !1,
              content: rt,
              settings: {
                ...(Le.settings ?? {}),
                audioUrl: rt,
                ...nt
              }
            })), y(Xe => Xe.map(De => De.id === ve.id ? {
              ...De,
              url: rt,
              audioUrl: rt,
              originalUrl: Fe,
              ossUploaded: !0,
              _globalOssUrlOnly: !0,
              _ossRemoteUrl: rt,
              _assetId: void 0,
              _audioAssetId: void 0
            } : De));
          })();
        } catch (Te) {
          console.error(`[${ge} Fal] Error:`, Te), el(z, N.id, !1), z(N.id, {
            isGenerating: !1,
            errorMsg: Te instanceof Error ? Te.message : "生成失败"
          }), y(Ne => Ne.map(me => me.id === ve.id ? {
            ...me,
            status: "failed",
            progress: 0,
            errorMsg: Te instanceof Error ? Te.message : "生成失败"
          } : me));
        }
        return;
      }
      if (C3(V)) {
        const be = r.find(Ne => Ne.id === V),
          Ee = ((be == null ? void 0 : be.url) || "https://art.huya.info/openapi/v1/generate/audio").replace(/\/+$/, ""),
          xe = (((re = k.current) == null ? void 0 : re.find(Ne => Ne.id === N.id)) ?? N).settings ?? N.settings,
          he = cu(be == null ? void 0 : be.key, a, xe == null ? void 0 : xe.savedApiKeyId, {
            platformGroup: xe == null ? void 0 : xe.platformGroup,
            modelName: (be == null ? void 0 : be.modelName) || V,
            modelId: (be == null ? void 0 : be.id) || V,
            baseUrl: Ee,
            modelSavedApiKeyId: be == null ? void 0 : be.savedApiKeyId
          });
        if (!he) {
          el(z, N.id, !1), alert(x("请先配置虎牙海艺 OpenAPI Token（AI-xxx）"));
          return;
        }
        const ue = xe != null && xe.isInstrumental ? "instrumental" : String((xe == null ? void 0 : xe.mode) || "") === "custom" || String((xe == null ? void 0 : xe.mode) || "") === "extend" ? "custom" : "auto",
          ge = String(N.prompt || "").trim(),
          _e = {
            prompt: ge,
            lyrics: String((xe == null ? void 0 : xe.lyrics) || "").trim(),
            tags: String((xe == null ? void 0 : xe.tags) || "").trim(),
            title: String((xe == null ? void 0 : xe.title) || "").trim(),
            instrumentalDescription: String((xe == null ? void 0 : xe.instrumentalDescription) || "").trim(),
            lyricMode: ue
          },
          ke = _e.lyricMode === "instrumental" ? _e.instrumentalDescription || ge : _e.lyricMode === "custom" && _e.lyrics || ge,
          ve = f5(N) ? $6(N) : null;
        z(N.id, {
          ...(ve ? {
            content: ve.content,
            errorMsg: ve.errorMsg
          } : {}),
          isGenerating: !0,
          errorMsg: void 0,
          settings: {
            ...((ve == null ? void 0 : ve.settings) ?? N.settings),
            isGenerating: !0,
            progress: 0,
            error: null
          }
        });
        const Te = {
          id: m(),
          type: "audio",
          url: "",
          prompt: ke,
          ...ky(),
          status: "generating",
          progress: 0,
          modelName: (be == null ? void 0 : be.provider) || V,
          sourceNodeId: N.id
        };
        y(Ne => [Te, ...Ne]);
        try {
          const {
              endpoint: Ne,
              openApiRoot: me
            } = yXr(Ee),
            Ae = wXr(V, _e),
            Fe = await $i(Ne, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${he}`,
                "Content-Type": "application/json"
              },
              body: await Pg(Ae)
            }),
            Me = await Fe.text();
          let Re = {};
          try {
            Re = Me ? JSON.parse(Me) : {};
          } catch {
            Re = {
              message: Me.slice(0, 240)
            };
          }
          const $e = cE(Re);
          if (!Fe.ok || E1(Re, $e)) throw new Error(nH(Fe.status, Me) || hd(Re, Fe.ok ? "海艺音乐任务失败" : `海艺音乐提交失败（HTTP ${Fe.status}）`));
          const rt = String(Re.task_id || Re.taskId || Re.id || "").trim();
          let nt = fv(Re, !1);
          if (!nt.urls[0] && rt) {
            const De = gk(me, rt),
              Ye = p7({
                isVideo: !1,
                isImage2Image: !1,
                isAudio: !0
              }),
              Ce = {
                current: "fast"
              };
            for (let He = 0; He < Ye; He++) {
              He > 0 && (await ik.wait(V8({
                attempt: He,
                baseInterval: ES,
                isDocumentHidden: document.visibilityState === "hidden",
                scheduleKey: `huya-art-music:${rt}`,
                lane: Ce.current
              })));
              const Ve = Math.min(90, 8 + Math.round(He / Ye * 80));
              _(Te.id, Ve), E(Te.id, N.id, Ve);
              const it = await mR(Ce, () => $i(De, {
                headers: {
                  Authorization: `Bearer ${he}`
                }
              }));
              if (!it) continue;
              const It = await it.text();
              let Ft = {};
              try {
                Ft = It ? JSON.parse(It) : {};
              } catch {
                Ft = {
                  message: It.slice(0, 240)
                };
              }
              const We = cE(Ft);
              if (E1(Ft, We)) throw new Error(hd(Ft, "海艺音乐任务失败"));
              if (nt = fv(Ft, !1), nt.urls[0]) break;
            }
          }
          const ze = nt.urls[0];
          if (!ze) throw new Error("海艺音乐未返回音频");
          const Le = `music_${Te.id}`,
            Ke = E0(),
            Xe = ((fe = k.current) == null ? void 0 : fe.find(De => De.id === N.id)) ?? N;
          z(Xe.id, fie(Xe, {
            isGenerating: !1,
            errorMsg: void 0,
            content: ze,
            prompt: ke,
            settings: {
              ...(Xe.settings ?? {}),
              audioUrl: ze,
              remoteTaskId: rt
            }
          })), y(De => De.map(Ye => Ye.id === Te.id ? Ke ? {
            ...Ye,
            status: "completed",
            url: ze,
            audioUrl: ze,
            progress: 100,
            ossUploaded: !0,
            _globalOssUrlOnly: !0,
            _ossRemoteUrl: ze
          } : {
            ...Ye,
            status: "completed",
            url: ze,
            audioUrl: ze,
            progress: 100,
            _audioAssetId: Le,
            _assetId: Le
          } : Ye)), !Ke && ze && Xu(ze, Le, `music_${Te.id}.mp3`, fbe).catch(() => {});
        } catch (Ne) {
          console.error("[Haiyi Music] Error:", Ne), el(z, N.id, !1);
          const me = Ne instanceof Error ? Ne.message : "生成失败";
          z(N.id, {
            isGenerating: !1,
            errorMsg: me
          }), y(Ae => Ae.map(Fe => Fe.id === Te.id ? {
            ...Fe,
            status: "failed",
            progress: 0,
            errorMsg: me
          } : Fe));
        }
        return;
      }
      let L, D;
      try {
        [L, D] = await Promise.all([Ie(() => Promise.resolve().then(() => p_o), void 0, import.meta.url), Ie(() => Promise.resolve().then(() => u_o), void 0, import.meta.url)]);
      } catch (be) {
        const Ee = "音乐生成模块加载失败";
        console.error("[Music Generation] Adapter load error:", be), el(z, N.id, !1), z(N.id, {
          isGenerating: !1,
          errorMsg: Ee
        });
        return;
      }
      if (!G.isCurrent()) return;
      const U = D.resolveSunoGenerationPlan(N);
      if (!U.ok) {
        el(z, N.id, !1), alert(x(U.error));
        return;
      }
      const {
          continueAudioPublicUrl: H,
          continueClipId: Y,
          historyPromptText: K,
          lyrics: W,
          makeInstrumental: Q,
          model: q,
          refAudioUsage: ne,
          title: de
        } = U.plan,
        le = r.find(be => be.id === q || be.id.includes("suno")),
        J = (le == null ? void 0 : le.key) || a,
        pe = ((le == null ? void 0 : le.url) || "https://ai.comfly.chat").replace(/\/+$/, "");
      if (!J) {
        el(z, N.id, !1), alert(x("请先配置 API Key"));
        return;
      }
      const ce = f5(N) ? $6(N) : null;
      z(N.id, {
        ...(ce ? {
          content: ce.content,
          errorMsg: ce.errorMsg
        } : {}),
        isGenerating: !0,
        errorMsg: void 0,
        settings: {
          ...((ce == null ? void 0 : ce.settings) ?? N.settings),
          isGenerating: !0,
          progress: 0,
          error: null,
          refAudioUsage: ne,
          ...(Y ? {
            continueClipId: Y
          } : {}),
          ...(H ? {
            continueAudioPublicUrl: H
          } : {})
        }
      }), _1.updateConfig(pe, J, r);
      try {
        await L.executeSunoGeneration({
          api: _1,
          plan: U.plan,
          existingRemoteTaskId: String(((ye = N.settings) == null ? void 0 : ye.remoteTaskId) || "").trim(),
          clipIds: (ie = N.settings) == null ? void 0 : ie.clipIds,
          splitTaskId: (ae = N.settings) == null ? void 0 : ae.splitTaskId,
          canSubmit: G.isCurrent,
          services: {
            request: (() => {
              const be = {
                current: "fast"
              };
              return async Ee => {
                const xe = await mR(be, Ee);
                if (xe == null) throw new Error("suno poll query timeout");
                return xe;
              };
            })(),
            schedule: (be, Ee, xe) => {
              ik.schedule(be, Ee, xe);
            },
            yieldToInteraction: vb,
            isHidden: () => typeof document < "u" && document.visibilityState === "hidden"
          },
          submitted: ({
            taskId: be,
            clipIds: Ee
          }) => {
            const xe = {
              id: m(),
              type: "audio",
              url: "",
              prompt: K,
              ...ky(),
              status: "generating",
              progress: 0,
              modelName: q,
              sourceNodeId: N.id,
              remoteTaskId: be || (Ee == null ? void 0 : Ee.join(",")) || ""
            };
            return y(he => [xe, ...he]), jro({
              source: N,
              historyId: xe.id,
              writes: G,
              setHistory: y,
              readSourceSettings: () => {
                var he;
                return ((he = A.current.get(N.id)) == null ? void 0 : he.settings) ?? N.settings;
              },
              setHistoryProgress: _,
              publishSongs: he => Pro({
                songs: he,
                historyItem: xe,
                setHistory: y,
                writes: G,
                getNode: ue => A.current.get(ue),
                node: N,
                historyPrompt: K,
                title: de,
                model: q,
                taskId: be,
                makeInstrumental: Q,
                lyrics: W
              })
            });
          }
        });
      } catch (be) {
        console.error("[Music Generation] Error:", be), z(N.id, {
          isGenerating: !1,
          errorMsg: be instanceof Error ? be.message : "生成失败"
        });
      }
    }, [r, a, y, _, m, E]),
    P = g.useCallback(async (N, G) => {
      var he, ue, ge, _e, ke, ve, Te, Ne, me, Ae, Fe, Me, Re, $e, rt, nt, ze, Le, Ke, Xe, De, Ye, Ce, He, Ve, it, It, Ft, We, Ze, Ge, Oe, st, vt, Ht, nn, pt, lt;
      const {
          updateNode: z,
          setNodes: V
        } = G,
        O = $Tt((he = N.settings) == null ? void 0 : he.speechTaskMode),
        L = [];
      for (const gt of i.filter(Ut => Ut.to === N.id && (!Ut.inputType || Ut.inputType === "default"))) {
        const Ut = s.get(gt.from);
        if (Ut) {
          if (Ut.type === "text-node" || Ut.type === "novel-input") {
            const _t = RJ(Ut);
            _t && L.push(_t);
          } else if (Ut.type === "custom-agent") {
            const _t = gJe(Ut);
            _t && L.push(_t);
          }
        }
      }
      const D = L.join(`

`),
        U = L.length > 0,
        H = zke((N.prompt || "").trim(), D, U);
      let Y = ((ue = N.settings) == null ? void 0 : ue.model) || "speech-2.6-hd";
      oE(Y) && (Y = "speech-2.6-hd");
      const K = tT(Y),
        W = eQ(Y),
        Q = TU(Y),
        q = W || Q,
        ne = Fj(Y),
        de = K || ne,
        le = pb(Y),
        J = O1(Y),
        pe = B1(Y),
        ce = F1(Y),
        we = pe || ce,
        X = ub(Y),
        Z = de || le || J || we || X || q ? String(Y).trim() : px(Y),
        re = X ? EOe(Z, O) : O === "voice-design" ? "tts" : O,
        fe = r.find(gt => gt.id === Z) || (!de && !le && !J && !we && !X && !q ? r.find(gt => px(gt.id) === Z) : void 0) || (q ? void 0 : r.find(gt => gt.type === "Speech" && !oE(gt.id) && (K ? tT(gt.id) : ne ? Fj(gt.id) : le ? pb(gt.id) : J ? O1(gt.id) : pe ? B1(gt.id) : ce ? F1(gt.id) : X ? ub(gt.id) : !Cv(gt.id) && !pb(gt.id) && !O1(gt.id) && !B1(gt.id) && !F1(gt.id) && !ub(gt.id)))),
        ye = ((fe == null ? void 0 : fe.url) || (Q || K || W ? "https://art.huya.info/openapi/v1/generate/audio" : "https://ai.comfly.org")).replace(/\/+$/, ""),
        ie = (((ge = k.current) == null ? void 0 : ge.find(gt => gt.id === N.id)) ?? N).settings ?? N.settings,
        ae = cu(fe == null ? void 0 : fe.key, a, ie == null ? void 0 : ie.savedApiKeyId, {
          platformGroup: ie == null ? void 0 : ie.platformGroup,
          modelName: (fe == null ? void 0 : fe.modelName) || Z,
          modelId: (fe == null ? void 0 : fe.id) || Z,
          baseUrl: ye,
          modelSavedApiKeyId: fe == null ? void 0 : fe.savedApiKeyId
        });
      if (!ae) {
        el(z, N.id, !1), alert(x(K || q ? "请先配置虎牙海艺 OpenAPI Token（AI-xxx）" : "请先配置 API Key"));
        return;
      }
      if (de) {
        if (!H) {
          el(z, N.id, !1), alert(x("请输入音频提示词，或连接文字节点"));
          return;
        }
        if (H.length > yce) {
          el(z, N.id, !1), alert(x("提示词最多 {0} 字符（当前 {1}）", yce, H.length));
          return;
        }
      } else if (!le) {
        if (J) {
          if (!H) {
            el(z, N.id, !1), alert(x("请输入要转换为语音的文本，或连接文字节点"));
            return;
          }
        } else if (we) {
          if (!H) {
            el(z, N.id, !1), alert(x("请输入要转换为语音的文本，或连接文字节点"));
            return;
          }
        } else if (X && re === "voice-design") {
          if (!H) {
            el(z, N.id, !1), alert(x("请输入音色描述"));
            return;
          }
        } else if (X && re === "voice-clone") {
          const gt = (_e = N.settings) == null ? void 0 : _e.speechCloneSourceData,
            Ut = (ke = N.settings) == null ? void 0 : ke.speechCloneSourceUrl,
            _t = (ve = N.settings) == null ? void 0 : ve.speechCloneSourceAssetId;
          if (!gt && !Ut && !_t) {
            el(z, N.id, !1), alert(x("请先上传要复刻的音频（10秒–5分钟）"));
            return;
          }
          if (!H) {
            el(z, N.id, !1), alert(x("请输入试听预览文本"));
            return;
          }
        } else if (X) {
          if (!H) {
            el(z, N.id, !1), alert(x("请输入要转换为语音的文本，或连接文字节点"));
            return;
          }
          if (H.length > Txe(Z)) {
            el(z, N.id, !1), alert(x("文本长度不能超过 {0} 字符", Txe(Z)));
            return;
          }
        } else if (Q) {
          const gt = (Te = N.settings) == null ? void 0 : Te.speechCloneSourceData,
            Ut = (Ne = N.settings) == null ? void 0 : Ne.speechCloneSourceUrl,
            _t = (me = N.settings) == null ? void 0 : me.speechCloneSourceAssetId;
          if (!gt && !Ut && !_t) {
            el(z, N.id, !1), alert(x("请先上传要克隆的音频（10秒–5分钟）"));
            return;
          }
          if (!H) {
            el(z, N.id, !1), alert(x("请输入试听文本（1000 字以内）"));
            return;
          }
        } else if (W) {
          if (!H) {
            el(z, N.id, !1), alert(x("请输入要转换为语音的文本，或连接文字节点"));
            return;
          }
          if (!String((ie == null ? void 0 : ie.voiceId) || "").trim()) {
            el(z, N.id, !1), alert(x("请选择或填写音色 ID。可先用海艺 MiniMax 音色克隆创建"));
            return;
          }
        } else if (O === "voice-clone") {
          const gt = (Ae = N.settings) == null ? void 0 : Ae.speechCloneSourceData,
            Ut = (Fe = N.settings) == null ? void 0 : Fe.speechCloneSourceUrl,
            _t = (Me = N.settings) == null ? void 0 : Me.speechCloneSourceAssetId,
            At = (Re = N.settings) == null ? void 0 : Re.speechCloneFileId;
          if (!gt && !Ut && !_t && !At) {
            el(z, N.id, !1), alert(x("请先上传要复刻的音频（10秒–5分钟）"));
            return;
          }
          if (!UTt(Z)) {
            el(z, N.id, !1), alert(x("当前模型不支持音色复刻预览，请换 speech-2.8 / speech-2.6 / speech-02 等模型"));
            return;
          }
          if (!H) {
            el(z, N.id, !1), alert(x("请输入试听预览文本"));
            return;
          }
        } else if (!H) {
          el(z, N.id, !1), alert(x("请输入要转换为语音的文本，或连接文字节点"));
          return;
        }
      }
      const be = f5(N) ? $6(N) : null;
      z(N.id, {
        ...(be ? {
          content: be.content,
          previewType: be.previewType,
          errorMsg: be.errorMsg
        } : {}),
        isGenerating: !0,
        errorMsg: void 0,
        settings: {
          ...((be == null ? void 0 : be.settings) ?? N.settings),
          isGenerating: !0,
          progress: 0,
          error: null
        }
      });
      const Ee = {
        id: m(),
        type: "audio",
        url: "",
        prompt: H,
        ...ky(),
        status: "generating",
        progress: 0,
        modelName: (fe == null ? void 0 : fe.modelName) || Z,
        sourceNodeId: N.id
      };
      y(gt => [Ee, ...gt]);
      const xe = (gt, Ut = {}, _t = "mp3") => {
        var kt;
        const At = `speech_${Ee.id}`,
          Yt = E0(),
          qe = ((kt = k.current) == null ? void 0 : kt.find(St => St.id === N.id)) ?? N;
        z(qe.id, z0t(qe, {
          isGenerating: !1,
          errorMsg: void 0,
          content: gt,
          prompt: H,
          settings: {
            ...(qe.settings ?? {}),
            audioUrl: gt,
            ...Ut
          }
        })), y(St => St.map(hn => hn.id === Ee.id ? Yt ? {
          ...hn,
          status: "completed",
          url: gt,
          audioUrl: gt,
          progress: 100,
          ossUploaded: !0,
          _globalOssUrlOnly: !0,
          _ossRemoteUrl: gt,
          _assetId: void 0,
          _audioAssetId: void 0
        } : {
          ...hn,
          status: "completed",
          url: gt,
          audioUrl: gt,
          progress: 100,
          _audioAssetId: At,
          _assetId: At
        } : hn)), (async () => {
          var ln;
          if (!Yt) {
            gt && Xu(gt, At, `speech_${Ee.id}.${_t === "wav" ? "wav" : "mp3"}`, fbe).catch(() => {});
            return;
          }
          console.log("[Speech] 全局 OSS 已开启，开始上传生成音频…");
          const {
            playbackUrl: St,
            ossSettings: hn,
            usedOss: Qt
          } = await wSt(gt, At);
          if (!Qt || !St) {
            console.warn("[Speech] 全局 OSS 上传失败，继续使用原始 URL:", gt.slice(0, 80)), y(Pn => Pn.map(rn => rn.id === Ee.id ? {
              ...rn,
              ossUploaded: !1,
              _globalOssUrlOnly: void 0,
              _ossRemoteUrl: void 0
            } : rn));
            return;
          }
          console.log("[Speech] 全局 OSS 上传成功 → Music/", St.slice(0, 120));
          const Ot = ((ln = k.current) == null ? void 0 : ln.find(Pn => Pn.id === N.id)) ?? N;
          z(Ot.id, z0t(Ot, {
            isGenerating: !1,
            content: St,
            settings: {
              ...(Ot.settings ?? {}),
              audioUrl: St,
              ...hn
            }
          })), y(Pn => Pn.some(Yn => Yn.id === Ee.id) ? Pn.map(Yn => Yn.id === Ee.id ? {
            ...Yn,
            url: St,
            audioUrl: St,
            originalUrl: gt,
            ossUploaded: !0,
            _globalOssUrlOnly: !0,
            _ossRemoteUrl: St,
            _assetId: void 0,
            _audioAssetId: void 0
          } : Yn) : [{
            ...Ee,
            status: "completed",
            url: St,
            audioUrl: St,
            originalUrl: gt,
            progress: 100,
            ossUploaded: !0,
            _globalOssUrlOnly: !0,
            _ossRemoteUrl: St,
            _assetId: void 0,
            _audioAssetId: void 0
          }, ...Pn]);
        })();
      };
      try {
        if (q) {
          const {
            endpoint: Yt,
            openApiRoot: qe
          } = rXr(ye, Z);
          let kt,
            St = "",
            hn = "";
          const Qt = Q ? sXr(ie) : "";
          if (Q && Qt) hn = Qt, kt = FKt({
            modelId: Z,
            apiModel: $Pt(ie == null ? void 0 : ie.huyaCloneTrialModel),
            prompt: H,
            voiceId: Qt,
            speed: ie == null ? void 0 : ie.speechSpeed,
            volume: ie == null ? void 0 : ie.speechVol,
            pitch: ie == null ? void 0 : ie.speechPitch,
            emotion: ie == null ? void 0 : ie.emotion,
            pronunciationDict: ie == null ? void 0 : ie.speechPronunciationDict,
            englishNormalization: ie == null ? void 0 : ie.speechEnglishNormalization
          });else if (Q) {
            const Vn = await att({
              sourceData: ie == null ? void 0 : ie.speechCloneSourceData,
              sourceUrl: ie == null ? void 0 : ie.speechCloneSourceUrl,
              sourceAssetId: ie == null ? void 0 : ie.speechCloneSourceAssetId,
              sourceFilename: ie == null ? void 0 : ie.speechCloneSourceName
            });
            let Tt = Vn.directUrl || "";
            if (!Tt && Vn.blob && (Tt = URL.createObjectURL(Vn.blob)), !Tt) throw new Error("请重新上传要克隆的音频");
            const Ue = await kmr(Tt, qe, ae);
            St = Ue;
            let et = Nqt(ie || {});
            hIe().some(ft => ft.id === et) && (et = Gbe()), hn = et, kt = iXr({
              name: ie == null ? void 0 : ie.huyaCloneName,
              customVoiceId: et,
              audioUrl: Ue,
              text: H,
              noiseReduction: ie == null ? void 0 : ie.huyaCloneNoiseReduction,
              volumeNormalization: ie == null ? void 0 : ie.huyaCloneVolumeNormalization,
              trialModel: ie == null ? void 0 : ie.huyaCloneTrialModel,
              languageBoost: ie == null ? void 0 : ie.huyaCloneLanguageBoost
            });
          } else kt = FKt({
            modelId: Z,
            prompt: H,
            voiceId: ie == null ? void 0 : ie.voiceId,
            speed: ie == null ? void 0 : ie.speechSpeed,
            volume: ie == null ? void 0 : ie.speechVol,
            pitch: ie == null ? void 0 : ie.speechPitch,
            emotion: ie == null ? void 0 : ie.emotion,
            pronunciationDict: ie == null ? void 0 : ie.speechPronunciationDict,
            englishNormalization: ie == null ? void 0 : ie.speechEnglishNormalization
          });
          const Ot = await $i(Yt, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${ae}`,
                "Content-Type": "application/json"
              },
              body: await Pg(kt)
            }),
            ln = await Ot.text();
          let Pn = {};
          try {
            Pn = ln ? JSON.parse(ln) : {};
          } catch {
            Pn = {
              message: ln.slice(0, 240)
            };
          }
          const rn = n0t(Pn);
          if (!Ot.ok || E1(Pn, rn)) throw new Error(nH(Ot.status, ln) || hd(Pn, Ot.ok ? "MiniMax 语音任务失败" : `MiniMax 语音提交失败（HTTP ${Ot.status}）`));
          const Yn = String(Pn.task_id || Pn.taskId || Pn.id || "").trim();
          let Ct = fv(Pn, !1),
            Cn = UKt(Pn);
          const un = Vn => {
            if (Q) {
              const Tt = lXr({
                status: Vn,
                readyUrls: Ct.urls,
                clone: Cn,
                sourceUrl: St
              });
              return Tt ? Tt.hex ? _Oe(Tt.hex, "mp3") : Tt.url || "" : "";
            }
            return Ct.urls[0] || Cn.audioUrl;
          };
          let Jn = un(rn);
          if (!Jn && Yn) {
            const Vn = gk(qe, Yn),
              Tt = 180,
              Ue = {
                current: "fast"
              };
            for (let et = 0; et < Tt; et++) {
              et > 0 && (await ik.wait(V8({
                attempt: et,
                baseInterval: lz("suno", et),
                isDocumentHidden: document.visibilityState === "hidden",
                scheduleKey: `huya-minimax-speech:${Yn}`,
                lane: Ue.current
              })));
              const ft = Math.min(92, 16 + Math.round(Math.min(1, (et + 1) / 40) * 76));
              _(Ee.id, ft), E(Ee.id, N.id, ft);
              const ht = await mR(Ue, () => $i(Vn, {
                headers: {
                  Authorization: `Bearer ${ae}`
                }
              }));
              if (!ht) continue;
              const wt = await ht.text();
              let jt = {};
              try {
                jt = wt ? JSON.parse(wt) : {};
              } catch {
                jt = {
                  message: wt.slice(0, 240)
                };
              }
              const bt = n0t(jt);
              if (Ct = fv(jt, !1), Cn = UKt(jt), Jn = un(bt), Jn) break;
              if (E1(jt, bt)) throw console.warn("[Huya MiniMax speech] task failed", {
                status: bt,
                message: hd(jt, "")
              }), new Error(hd(jt, "MiniMax 语音任务失败"));
            }
          }
          const Kn = String(Cn.voiceId || "").trim(),
            en = hn && !/^\d+$/.test(hn) ? hn : Kn || hn || String((ie == null ? void 0 : ie.speechCloneVoiceId) || "").trim();
          if (!Jn) throw new Error(Q ? "音色克隆未返回试听音频" : "语音合成未返回音频");
          if (Q && en) {
            const Vn = String((ie == null ? void 0 : ie.huyaCloneName) || en).trim();
            cXr({
              id: en,
              name: Vn
            });
          }
          xe(Jn, {
            remoteTaskId: Yn,
            ...(Q && en ? {
              speechClonedVoiceId: en,
              voiceId: en,
              speechCloneVoiceId: en,
              ...(Qt ? {} : {
                speechClonedSourceRevision: Number((ie == null ? void 0 : ie.speechCloneSourceRevision) ?? 0)
              })
            } : {})
          });
          return;
        }
        if (K) {
          const {
              endpoint: Yt,
              openApiRoot: qe
            } = uXr(ye),
            {
              getCanvasNodeOssOriginalUrl: kt,
              isGlobalOssUploadEnabled: St,
              isOssPublicHttpUrl: hn,
              resolveInputImageUrlForDownstream: Qt
            } = await Ie(async () => {
              const {
                getCanvasNodeOssOriginalUrl: xt,
                isGlobalOssUploadEnabled: yn,
                isOssPublicHttpUrl: gn,
                resolveInputImageUrlForDownstream: mt
              } = await Promise.resolve().then(() => ii);
              return {
                getCanvasNodeOssOriginalUrl: xt,
                isGlobalOssUploadEnabled: yn,
                isOssPublicHttpUrl: gn,
                resolveInputImageUrlForDownstream: mt
              };
            }, void 0, import.meta.url),
            {
              getGenImageVideoOutputUrlAndAssetId: Ot
            } = await Ie(async () => {
              const {
                getGenImageVideoOutputUrlAndAssetId: xt
              } = await Promise.resolve().then(() => LM);
              return {
                getGenImageVideoOutputUrlAndAssetId: xt
              };
            }, void 0, import.meta.url),
            {
              isInputImageAudioNode: ln
            } = await Ie(async () => {
              const {
                isInputImageAudioNode: xt
              } = await Promise.resolve().then(() => yve);
              return {
                isInputImageAudioNode: xt
              };
            }, void 0, import.meta.url),
            Pn = k.current || o,
            rn = S.current || i,
            Yn = St(),
            Ct = [],
            Cn = [];
          for (const xt of rn) {
            if (xt.to !== N.id || xt.inputType && xt.inputType !== "default") continue;
            const yn = Pn.find(gn => gn.id === xt.from);
            if (yn) {
              if (yn.type === "gen-music" || yn.type === "gen-speech") {
                const gn = Yn ? kt(yn, "audio") : null,
                  mt = (gn && hn(gn) ? gn : "") || String((($e = yn.settings) == null ? void 0 : $e.audioUrl) || "").trim() || (typeof yn.content == "string" ? yn.content.trim() : "");
                mt && Cn.push(mt);
                continue;
              }
              if (yn.type === "input-image" && ln(yn)) {
                const gn = Yn ? kt(yn, "audio") : null,
                  mt = (gn && hn(gn) ? gn : "") || String(((rt = yn.settings) == null ? void 0 : rt.audioUrl) || "").trim() || (typeof yn.content == "string" ? yn.content.trim() : "");
                mt && Cn.push(mt);
                continue;
              }
              if (yn.type === "input-image") {
                const gn = Yn ? kt(yn, "image") : null,
                  mt = (gn && hn(gn) && !/\/thumbnails\//i.test(gn) ? gn : "") || Qt(yn);
                mt && Ct.push(mt);
                continue;
              }
              if (yn.type === "gen-image") {
                const gn = Yn ? kt(yn, "image") : null,
                  mt = Ot(yn),
                  Xt = (gn && hn(gn) && !/\/thumbnails\//i.test(gn) ? gn : "") || (mt == null ? void 0 : mt.url) || (typeof yn.content == "string" ? yn.content.trim() : "");
                Xt && Ct.push(Xt);
                continue;
              }
              if (yn.type === "preview") {
                const gn = Yn ? kt(yn, "image") : null,
                  mt = (gn && hn(gn) && !/\/thumbnails\//i.test(gn) ? gn : "") || String(yn.selectedPreviewImage || "").trim() || ((nt = yn.previewMjImages) == null ? void 0 : nt[0]) || (typeof yn.content == "string" ? yn.content.trim() : "");
                if (!mt) continue;
                yn.previewType === "audio" ? Cn.push(mt) : Ct.push(mt);
              }
            }
          }
          const un = $Kt(H),
            Jn = [...Cn, ...un.audioUrls].map(xt => String(xt || "").trim()).filter(Boolean).filter((xt, yn, gn) => gn.indexOf(xt) === yn).slice(0, Hxe),
            Kn = [...Ct, ...un.imageUrls].map(xt => String(xt || "").trim()).filter(Boolean).filter((xt, yn, gn) => gn.indexOf(xt) === yn).slice(0, Wxe);
          Jn.length > 0 && Kn.length > 0 && (console.warn("[Huya Seed Audio] 音频参考与图片参考互斥，已优先使用音频参考"), alert(x("Seed Audio 参考图与参考音频不能同时生效，本次将使用音频参考（图片已忽略）。若要图生音频，请先断开音频连线。")));
          const en = async (xt, yn) => {
              const gn = [];
              for (const mt of xt) gn.push(await Amr(mt, qe, ae, yn));
              return gn;
            },
            Vn = Jn.length > 0 ? await en(Jn, "audio") : [],
            Tt = Vn.length === 0 && Kn.length > 0 ? await en(Kn, "image") : [],
            Ue = pXr({
              prompt: un.prompt || H,
              audioReferences: Vn,
              imageReferences: Tt,
              format: (ie == null ? void 0 : ie.seedAudioFormat) ?? (ie == null ? void 0 : ie.audioFormat),
              sampleRate: (ie == null ? void 0 : ie.seedAudioSampleRate) ?? ((ie == null ? void 0 : ie.audioSampleRate) === 24e3 || (ie == null ? void 0 : ie.audioSampleRate) === 16e3 || (ie == null ? void 0 : ie.audioSampleRate) === 8e3 || (ie == null ? void 0 : ie.audioSampleRate) === 44100 || (ie == null ? void 0 : ie.audioSampleRate) === 48e3 ? ie == null ? void 0 : ie.audioSampleRate : 24e3),
              speechRate: ie == null ? void 0 : ie.seedAudioSpeechRate,
              loudnessRate: ie == null ? void 0 : ie.seedAudioLoudnessRate,
              pitchRate: (ie == null ? void 0 : ie.seedAudioPitchRate) ?? (ie == null ? void 0 : ie.speechPitch)
            }),
            et = mXr({
              parameters: Ue,
              model: (fe == null ? void 0 : fe.modelName) || Fqe
            });
          console.log("[Huya Seed Audio] submit", {
            endpoint: Yt,
            model: et.model,
            parameters: {
              ...Ue,
              audio_references: Vn.map(xt => xt.slice(0, 80)),
              image_references: Tt.map(xt => xt.slice(0, 80))
            },
            refMode: Vn.length ? "audio_references" : Tt.length ? "image_references" : "text_only"
          });
          const ft = await $i(Yt, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${ae}`,
                "Content-Type": "application/json"
              },
              body: await Pg(et)
            }),
            ht = await ft.text();
          let wt = {};
          try {
            wt = ht ? JSON.parse(ht) : {};
          } catch {
            wt = {
              message: ht.slice(0, 240)
            };
          }
          const jt = cE(wt);
          if (!ft.ok || E1(wt, jt)) {
            console.error("[Huya Seed Audio] submit failed", {
              httpStatus: ft.status,
              status: jt,
              body: ht.slice(0, 800)
            });
            const xt = nH(ft.status, ht);
            throw new Error(Ctt(xt || hd(wt, ft.ok ? "Seed Audio 任务失败" : `Seed Audio 提交失败（HTTP ${ft.status}）`)));
          }
          const bt = fv(wt, !1);
          if (bt.urls[0]) {
            xe(bt.urls[0], {
              remoteTaskId: String(wt.task_id || wt.taskId || ""),
              seedAudioTaskType: "text2speech"
            });
            return;
          }
          const Bt = String(wt.task_id || wt.taskId || wt.id || "").trim();
          if (!Bt) throw new Error(hd(wt, "Seed Audio 未返回 task_id"));
          const wn = gk(qe, Bt),
            at = p7({
              isVideo: !1,
              isImage2Image: !1,
              isAudio: !0
            });
          let Pt = "";
          const dt = {
            current: "fast"
          };
          for (let xt = 0; xt < at; xt++) {
            xt > 0 && (await ik.wait(V8({
              attempt: xt,
              baseInterval: ES,
              isDocumentHidden: document.visibilityState === "hidden",
              scheduleKey: `huya-seed-audio:${Bt}`,
              lane: dt.current
            }))), await vb();
            const yn = Math.min(90, 8 + Math.round(xt / at * 80));
            _(Ee.id, yn), E(Ee.id, N.id, yn);
            const gn = await mR(dt, () => $i(wn, {
              headers: {
                Authorization: `Bearer ${ae}`
              }
            }));
            if (!gn) continue;
            await vb();
            const mt = await gn.text();
            await vb();
            let Xt = {};
            try {
              Xt = mt ? JSON.parse(mt) : {};
            } catch {
              Xt = {
                message: mt.slice(0, 240)
              };
            }
            const Gn = cE(Xt);
            if (E1(Xt, Gn)) throw console.error("[Huya Seed Audio] poll failed", {
              attempt: xt,
              status: Gn,
              body: mt.slice(0, 1200),
              error: Xt.error,
              semantic_error: Xt.semantic_error
            }), new Error(Ctt(hd(Xt, "Seed Audio 任务失败")));
            const rr = fv(Xt, !1);
            if (rr.urls[0]) {
              Pt = rr.urls[0];
              break;
            }
          }
          if (!Pt) throw new Error("Seed Audio 轮询超时，请稍后在历史中刷新或重试");
          xe(Pt, {
            remoteTaskId: Bt,
            seedAudioTaskType: "text2speech"
          });
          return;
        }
        if (ne) {
          const Yt = Dio({
            currentModel: Z,
            baseUrl: ye
          });
          if (!Yt) throw new Error("Seed Audio Fal 模型配置无效");
          const {
              getCanvasNodeOssOriginalUrl: qe,
              isGlobalOssUploadEnabled: kt,
              isOssPublicHttpUrl: St,
              resolveInputImageUrlForDownstream: hn
            } = await Ie(async () => {
              const {
                getCanvasNodeOssOriginalUrl: ht,
                isGlobalOssUploadEnabled: wt,
                isOssPublicHttpUrl: jt,
                resolveInputImageUrlForDownstream: bt
              } = await Promise.resolve().then(() => ii);
              return {
                getCanvasNodeOssOriginalUrl: ht,
                isGlobalOssUploadEnabled: wt,
                isOssPublicHttpUrl: jt,
                resolveInputImageUrlForDownstream: bt
              };
            }, void 0, import.meta.url),
            {
              getGenImageVideoOutputUrlAndAssetId: Qt
            } = await Ie(async () => {
              const {
                getGenImageVideoOutputUrlAndAssetId: ht
              } = await Promise.resolve().then(() => LM);
              return {
                getGenImageVideoOutputUrlAndAssetId: ht
              };
            }, void 0, import.meta.url),
            {
              isInputImageAudioNode: Ot
            } = await Ie(async () => {
              const {
                isInputImageAudioNode: ht
              } = await Promise.resolve().then(() => yve);
              return {
                isInputImageAudioNode: ht
              };
            }, void 0, import.meta.url),
            ln = k.current || o,
            Pn = S.current || i,
            rn = kt(),
            Yn = [],
            Ct = [];
          for (const ht of Pn) {
            if (ht.to !== N.id || ht.inputType && ht.inputType !== "default") continue;
            const wt = ln.find(jt => jt.id === ht.from);
            if (wt) {
              if (wt.type === "gen-music" || wt.type === "gen-speech") {
                const jt = rn ? qe(wt, "audio") : null,
                  bt = (jt && St(jt) ? jt : "") || String(((ze = wt.settings) == null ? void 0 : ze.audioUrl) || "").trim() || (typeof wt.content == "string" ? wt.content.trim() : "");
                bt && Ct.push(bt);
                continue;
              }
              if (wt.type === "input-image" && Ot(wt)) {
                const jt = rn ? qe(wt, "audio") : null,
                  bt = (jt && St(jt) ? jt : "") || String(((Le = wt.settings) == null ? void 0 : Le.audioUrl) || "").trim() || (typeof wt.content == "string" ? wt.content.trim() : "");
                bt && Ct.push(bt);
                continue;
              }
              if (wt.type === "input-image") {
                const jt = rn ? qe(wt, "image") : null,
                  bt = (jt && St(jt) && !/\/thumbnails\//i.test(jt) ? jt : "") || hn(wt);
                bt && Yn.push(bt);
                continue;
              }
              if (wt.type === "gen-image") {
                const jt = rn ? qe(wt, "image") : null,
                  bt = Qt(wt),
                  Bt = (jt && St(jt) && !/\/thumbnails\//i.test(jt) ? jt : "") || (bt == null ? void 0 : bt.url) || (typeof wt.content == "string" ? wt.content.trim() : "");
                Bt && Yn.push(Bt);
                continue;
              }
              if (wt.type === "preview") {
                const jt = rn ? qe(wt, "image") : null,
                  bt = (jt && St(jt) && !/\/thumbnails\//i.test(jt) ? jt : "") || String(wt.selectedPreviewImage || "").trim() || ((Ke = wt.previewMjImages) == null ? void 0 : Ke[0]) || (typeof wt.content == "string" ? wt.content.trim() : "");
                if (!bt) continue;
                wt.previewType === "audio" ? Ct.push(bt) : Yn.push(bt);
              }
            }
          }
          const Cn = $Kt(H),
            un = [...Ct, ...Cn.audioUrls].map(ht => String(ht || "").trim()).filter(Boolean).filter((ht, wt, jt) => jt.indexOf(ht) === wt).slice(0, Hxe),
            Jn = [...Yn, ...Cn.imageUrls].map(ht => String(ht || "").trim()).filter(Boolean).filter((ht, wt, jt) => jt.indexOf(ht) === wt).slice(0, Wxe);
          un.length > 0 && Jn.length > 0 && (console.warn("[Seed Audio Fal] 音频参考与图片参考互斥，已优先使用音频参考"), alert(x("Seed Audio 参考图与参考音频不能同时生效，本次将使用音频参考（图片已忽略）。若要图生音频，请先断开音频连线。")));
          const Kn = [];
          for (const ht of un) try {
            Kn.push(await e0e(ht));
          } catch {
            throw new Error("无法读取参考音频，请检查连线或重新上传");
          }
          const en = [];
          if (Kn.length === 0) for (const ht of Jn) try {
            en.push(await RP(ht));
          } catch {
            throw new Error("无法读取参考图片，请检查连线或重新上传");
          }
          const Vn = mzr({
            prompt: Cn.prompt || H,
            audioUrls: Kn,
            imageUrl: en[0],
            format: (ie == null ? void 0 : ie.seedAudioFormat) ?? (ie == null ? void 0 : ie.audioFormat),
            sampleRate: (ie == null ? void 0 : ie.seedAudioSampleRate) ?? ((ie == null ? void 0 : ie.audioSampleRate) === 24e3 || (ie == null ? void 0 : ie.audioSampleRate) === 16e3 || (ie == null ? void 0 : ie.audioSampleRate) === 8e3 || (ie == null ? void 0 : ie.audioSampleRate) === 44100 || (ie == null ? void 0 : ie.audioSampleRate) === 48e3 ? ie == null ? void 0 : ie.audioSampleRate : 24e3),
            speechRate: ie == null ? void 0 : ie.seedAudioSpeechRate,
            loudnessRate: ie == null ? void 0 : ie.seedAudioLoudnessRate,
            pitchRate: (ie == null ? void 0 : ie.seedAudioPitchRate) ?? (ie == null ? void 0 : ie.speechPitch)
          });
          console.log("[Seed Audio Fal] POST", Yt.endpoint, {
            hasPrompt: !!Vn.prompt,
            outputFormat: Vn.output_format,
            sampleRate: Vn.sample_rate,
            refMode: Kn.length ? "audio_urls" : en.length ? "image_url" : "text_only"
          });
          const Tt = await $i(Yt.endpoint, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${ae}`,
              "Content-Type": "application/json"
            },
            body: await Pg(Vn)
          });
          let Ue = {};
          try {
            Ue = await Tt.json();
          } catch {
            throw new Error("Seed Audio 接口返回无效 JSON");
          }
          if (!Tt.ok) throw new Error(Dm(Ue) || String(Ue.error || Ue.message || `Seed Audio 提交失败（HTTP ${Tt.status}）`));
          wh(Ue);
          const et = await e5({
              falPrefix: Po(ye),
              apiKey: ae,
              modelPath: Yt.modelPath,
              submitData: Ue,
              onProgress: ht => {
                _(Ee.id, ht), E(Ee.id, N.id, ht);
              }
            }),
            ft = String(Vn.output_format || "wav");
          xe(et.audioUrl, {
            seedAudioTaskType: "text2speech",
            seedAudioDuration: et.duration
          }, ft === "wav" ? "wav" : "mp3");
          return;
        }
        if (le) {
          const Yt = Tio({
            currentModel: Z,
            baseUrl: ye
          });
          if (!Yt) throw new Error("Grok Voice 模型配置无效");
          const {
              getCanvasNodeOssOriginalUrl: qe,
              isGlobalOssUploadEnabled: kt,
              isOssPublicHttpUrl: St
            } = await Ie(async () => {
              const {
                getCanvasNodeOssOriginalUrl: en,
                isGlobalOssUploadEnabled: Vn,
                isOssPublicHttpUrl: Tt
              } = await Promise.resolve().then(() => ii);
              return {
                getCanvasNodeOssOriginalUrl: en,
                isGlobalOssUploadEnabled: Vn,
                isOssPublicHttpUrl: Tt
              };
            }, void 0, import.meta.url),
            {
              isInputImageAudioNode: hn
            } = await Ie(async () => {
              const {
                isInputImageAudioNode: en
              } = await Promise.resolve().then(() => yve);
              return {
                isInputImageAudioNode: en
              };
            }, void 0, import.meta.url),
            Qt = k.current || o,
            Ot = S.current || i,
            ln = kt(),
            Pn = [];
          for (const en of Ot) {
            if (en.to !== N.id || en.inputType && en.inputType !== "default") continue;
            const Vn = Qt.find(ft => ft.id === en.from);
            if (!Vn || !(Vn.type === "gen-music" || Vn.type === "gen-speech" || Vn.type === "input-image" && hn(Vn) || Vn.type === "preview" && Vn.previewType === "audio")) continue;
            const Ue = ln ? qe(Vn, "audio") : null,
              et = (Ue && St(Ue) ? Ue : "") || String(((Xe = Vn.settings) == null ? void 0 : Xe.audioUrl) || "").trim() || (typeof Vn.content == "string" ? Vn.content.trim() : "");
            et && Pn.push(et);
          }
          const rn = Pn.map(en => String(en || "").trim()).find(Boolean) || "",
            Yn = !rn;
          if (Yn && !H) throw new Error("请输入要朗读的文本，或连接一段用户语音");
          let Ct,
            Cn = Yt;
          if (Yn) {
            const en = Mio({
              currentModel: Z,
              baseUrl: ye
            });
            if (!en) throw new Error("Grok Voice 模型配置无效");
            Cn = en, Ct = mMn({
              text: H,
              voice: String((ie == null ? void 0 : ie.voiceId) || "")
            }), console.log("[Grok Voice Fal] TTS POST", Cn.endpoint, {
              voice: Ct.voice || "eve"
            });
          } else {
            let en = "";
            try {
              en = await e0e(rn);
            } catch {
              throw new Error(Eio);
            }
            Ct = Pio({
              audioUrl: en,
              prompt: H,
              voice: String((ie == null ? void 0 : ie.voiceId) || "")
            }), console.log("[Grok Voice Fal] POST", Cn.endpoint, {
              hasPrompt: !!Ct.prompt,
              voice: Ct.voice || "default"
            });
          }
          const un = await $i(Cn.endpoint, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${ae}`,
              "Content-Type": "application/json"
            },
            body: await Pg(Ct)
          });
          let Jn = {};
          try {
            Jn = await un.json();
          } catch {
            throw new Error("Grok Voice 接口返回无效 JSON");
          }
          if (!un.ok) throw new Error(Dm(Jn) || String(Jn.error || Jn.message || `Grok Voice 提交失败（HTTP ${un.status}）`));
          wh(Jn);
          const Kn = await e5({
            falPrefix: Po(ye),
            apiKey: ae,
            modelPath: Cn.modelPath,
            submitData: Jn,
            onProgress: en => {
              _(Ee.id, en), E(Ee.id, N.id, en);
            }
          });
          xe(Kn.audioUrl, {
            grokVoiceTranscript: Kn.text || H,
            grokVoiceDuration: Kn.duration
          }, Yn ? "mp3" : "wav");
          return;
        }
        if (J) {
          const Yt = Rio({
            currentModel: Z,
            baseUrl: ye
          });
          if (!Yt) throw new Error("Qwen TTS 模型配置无效");
          const qe = wMn({
            text: H,
            voice: String((ie == null ? void 0 : ie.voiceId) || ""),
            language: String((ie == null ? void 0 : ie.qwenTtsLanguage) || "")
          });
          console.log("[Qwen Audio 3 TTS Fal] POST", Yt.endpoint, {
            voice: qe.voice,
            language: qe.language
          });
          const kt = await $i(Yt.endpoint, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${ae}`,
              "Content-Type": "application/json"
            },
            body: await Pg(qe)
          });
          let St = {};
          try {
            St = await kt.json();
          } catch {
            throw new Error("Qwen TTS 接口返回无效 JSON");
          }
          if (!kt.ok) throw new Error(Dm(St) || String(St.error || St.message || `Qwen TTS 提交失败（HTTP ${kt.status}）`));
          wh(St);
          const hn = await e5({
            falPrefix: Po(ye),
            apiKey: ae,
            modelPath: Yt.modelPath,
            submitData: St,
            onProgress: Qt => {
              _(Ee.id, Qt), E(Ee.id, N.id, Qt);
            }
          });
          xe(hn.audioUrl, {
            qwenTtsDuration: hn.duration
          }, "wav");
          return;
        }
        if (we) {
          const Yt = ce ? jio({
            currentModel: Z,
            baseUrl: ye
          }) : Nio({
            currentModel: Z,
            baseUrl: ye
          });
          if (!Yt) throw new Error("Gemini TTS 模型配置无效");
          const qe = ce ? OMn({
            text: H,
            voice: String((ie == null ? void 0 : ie.voiceId) || ""),
            styleInstructions: String((ie == null ? void 0 : ie.geminiTtsStyleInstructions) || ""),
            speakers: ie == null ? void 0 : ie.geminiTtsSpeakers
          }) : EMn({
            text: H,
            voice: String((ie == null ? void 0 : ie.voiceId) || ""),
            language: String((ie == null ? void 0 : ie.geminiTtsLanguage) || ""),
            styleInstructions: String((ie == null ? void 0 : ie.geminiTtsStyleInstructions) || ""),
            temperature: ie == null ? void 0 : ie.geminiTtsTemperature,
            outputFormat: String((ie == null ? void 0 : ie.geminiTtsOutputFormat) || ""),
            speakers: ie == null ? void 0 : ie.geminiTtsSpeakers
          });
          console.log("[Gemini Flash TTS Fal] POST", Yt.endpoint, {
            voice: qe.voice,
            language: qe.language_code,
            speakers: Array.isArray(qe.speakers) ? qe.speakers.length : 0,
            turns: Array.isArray(qe.turns) ? qe.turns.length : 0,
            outputFormat: qe.output_format
          });
          const kt = await $i(Yt.endpoint, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${ae}`,
              "Content-Type": "application/json"
            },
            body: await Pg(qe)
          });
          let St = {};
          try {
            St = await kt.json();
          } catch {
            throw new Error("Gemini TTS 接口返回无效 JSON");
          }
          if (!kt.ok) throw new Error(Dm(St) || String(St.error || St.message || `Gemini TTS 提交失败（HTTP ${kt.status}）`));
          wh(St);
          const hn = await e5({
              falPrefix: Po(ye),
              apiKey: ae,
              modelPath: Yt.modelPath,
              submitData: St,
              onProgress: Ot => {
                _(Ee.id, Ot), E(Ee.id, N.id, Ot);
              }
            }),
            Qt = ce ? "wav" : JFr(LWe(qe.output_format));
          xe(hn.audioUrl, {
            geminiTtsDuration: hn.duration
          }, Qt);
          return;
        }
        if (X) {
          const qe = (((De = k.current) == null ? void 0 : De.find(Qt => Qt.id === N.id)) ?? N).settings || {},
            kt = async (Qt, Ot, ln) => {
              console.log("[MiniMax Speech Fal] POST", Qt.endpoint, {
                mode: re,
                hasText: !!(Ot.text || Ot.prompt)
              });
              const Pn = await $i(Qt.endpoint, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${ae}`,
                  "Content-Type": "application/json"
                },
                body: await Pg(Ot)
              });
              let rn = {};
              try {
                rn = await Pn.json();
              } catch {
                throw new Error(`${ln}接口返回无效 JSON`);
              }
              if (!Pn.ok) throw new Error(Dm(rn) || String(rn.error || rn.message || `${ln}提交失败（HTTP ${Pn.status}）`));
              return wh(rn), e5({
                falPrefix: Po(ye),
                apiKey: ae,
                modelPath: Qt.modelPath,
                submitData: rn,
                onProgress: Yn => {
                  _(Ee.id, Yn), E(Ee.id, N.id, Yn);
                }
              });
            };
          if (re === "voice-design") {
            const Qt = String(qe.speechClonedVoiceId || "").trim(),
              Ot = String(qe.speechDesignedPrompt || "").trim();
            if (Qt && Ot && Ot === H) {
              const Yn = Vmn({
                currentModel: Z,
                baseUrl: ye
              });
              if (!Yn) throw new Error("MiniMax Speech Fal 模型配置无效");
              const Ct = await kt(Yn, cRe({
                modelId: Z,
                text: String(qe.speechDesignPreviewText || H),
                voice: Qt,
                speed: Number(qe.speechSpeed ?? 1),
                vol: Number(qe.speechVol ?? 1),
                pitch: Number(qe.speechPitch ?? 0),
                emotion: String(qe.emotion || ""),
                languageBoost: qe.languageBoost || null
              }), "MiniMax Voice Design");
              xe(Ct.audioUrl, {
                speechClonedVoiceId: Qt,
                speechCloneVoiceId: Qt,
                voiceId: Qt,
                speechDesignedPrompt: H
              });
              return;
            }
            const ln = Vlt({
              currentModel: Z,
              baseUrl: ye,
              mode: "voice-design"
            });
            if (!ln) throw new Error("MiniMax Voice Design 模型配置无效");
            const Pn = await kt(ln, lUr({
                prompt: H,
                previewText: String(qe.speechDesignPreviewText || "")
              }), "MiniMax Voice Design"),
              rn = String(Pn.customVoiceId || "").trim();
            xe(Pn.audioUrl, {
              voiceId: rn || qe.voiceId,
              speechClonedVoiceId: rn || void 0,
              speechCloneVoiceId: rn || void 0,
              speechDesignedPrompt: H
            });
            return;
          }
          if (re === "voice-clone") {
            const Qt = String(qe.speechClonedVoiceId || "").trim(),
              Ot = String(qe.speechCloneVoiceId || "").trim(),
              ln = Number(qe.speechClonedSourceRevision ?? 0),
              Pn = Number(qe.speechCloneSourceRevision ?? 0),
              Yn = !(Pn > 0 || ln > 0) || ln > 0 && ln === Pn;
            if (!!(Qt && Ot && Qt === Ot && Yn)) {
              const Tt = Vmn({
                currentModel: Z,
                baseUrl: ye
              });
              if (!Tt) throw new Error("MiniMax Speech Fal 模型配置无效");
              const Ue = await kt(Tt, cRe({
                modelId: Z,
                text: H,
                voice: Qt,
                speed: Number(qe.speechSpeed ?? 1),
                vol: Number(qe.speechVol ?? 1),
                pitch: Number(qe.speechPitch ?? 0),
                emotion: String(qe.emotion || ""),
                languageBoost: qe.languageBoost || null
              }), "MiniMax Speech");
              xe(Ue.audioUrl, {
                speechClonedVoiceId: Qt,
                speechCloneVoiceId: Qt,
                speechClonedSourceRevision: ln
              });
              return;
            }
            const Cn = qe.speechCloneSourceName || "voice.mp3",
              un = await att({
                sourceData: qe.speechCloneSourceData,
                sourceUrl: qe.speechCloneSourceUrl,
                sourceAssetId: qe.speechCloneSourceAssetId,
                sourceFilename: Cn
              });
            let Jn = un.directUrl || "";
            if (un.blob) Jn = await e0e(URL.createObjectURL(un.blob));else if (Jn) Jn = await e0e(Jn);else throw new Error("请重新上传要复刻的音频");
            const Kn = Vlt({
              currentModel: Z,
              baseUrl: ye,
              mode: "voice-clone"
            });
            if (!Kn) throw new Error("MiniMax Voice Clone 模型配置无效");
            const en = await kt(Kn, sUr({
                modelId: Z,
                audioUrl: Jn,
                text: H,
                noiseReduction: !!qe.speechCloneNoiseReduction,
                volumeNormalization: !!qe.speechCloneVolumeNorm
              }), "MiniMax Voice Clone"),
              Vn = String(en.customVoiceId || qe.speechCloneVoiceId || "").trim();
            xe(en.audioUrl || "", {
              voiceId: Vn || qe.voiceId,
              speechClonedVoiceId: Vn || void 0,
              speechCloneVoiceId: Vn || void 0,
              speechClonedSourceRevision: Pn
            });
            return;
          }
          const St = Vlt({
            currentModel: Z,
            baseUrl: ye,
            mode: "tts"
          });
          if (!St) throw new Error("MiniMax Speech Fal 模型配置无效");
          const hn = await kt(St, cRe({
            modelId: Z,
            text: H,
            voice: String(qe.voiceId || ((Ye = N.settings) == null ? void 0 : Ye.voiceId) || ""),
            speed: Number(qe.speechSpeed ?? ((Ce = N.settings) == null ? void 0 : Ce.speechSpeed) ?? 1),
            vol: Number(qe.speechVol ?? ((He = N.settings) == null ? void 0 : He.speechVol) ?? 1),
            pitch: Number(qe.speechPitch ?? ((Ve = N.settings) == null ? void 0 : Ve.speechPitch) ?? 0),
            emotion: String(qe.emotion || ((it = N.settings) == null ? void 0 : it.emotion) || ""),
            languageBoost: qe.languageBoost || ((It = N.settings) == null ? void 0 : It.languageBoost) || null
          }), "MiniMax Speech");
          xe(hn.audioUrl, {
            speechClonedVoiceId: hn.customVoiceId || qe.speechClonedVoiceId
          });
          return;
        }
        if (O === "voice-clone") {
          const qe = (((Ft = k.current) == null ? void 0 : Ft.find(un => un.id === N.id)) ?? N).settings || {},
            kt = String(qe.speechClonedVoiceId || "").trim(),
            St = String(qe.speechCloneVoiceId || "").trim(),
            hn = Number(qe.speechClonedSourceRevision ?? 0),
            Qt = Number(qe.speechCloneSourceRevision ?? 0),
            ln = !(Qt > 0 || hn > 0) || hn > 0 && hn === Qt;
          if (!!(kt && St && kt === St && ln)) {
            const un = await xft({
              baseUrl: ye,
              apiKey: ae,
              modelId: Z,
              modelName: fe == null ? void 0 : fe.modelName,
              text: H,
              voiceSetting: {
                voice_id: kt,
                speed: Number(qe.speechSpeed ?? 1),
                vol: Number(qe.speechVol ?? 1),
                pitch: Number(qe.speechPitch ?? 0)
              },
              audioSetting: {
                sample_rate: Number(qe.audioSampleRate ?? 32e3),
                bitrate: Number(qe.audioBitrate ?? 128e3),
                format: qe.audioFormat || "mp3",
                channel: Number(qe.audioChannel ?? 1)
              },
              languageBoost: qe.languageBoost || null
            });
            xe(un.audioUrl, {
              usageCharacters: un.usageCharacters,
              speechClonedVoiceId: kt,
              speechCloneVoiceId: kt,
              speechClonedSourceRevision: hn
            });
            return;
          }
          const rn = qe.speechCloneSourceName || "voice.mp3",
            Yn = Nqt(qe),
            Ct = await att({
              sourceData: qe.speechCloneSourceData,
              sourceUrl: qe.speechCloneSourceUrl,
              sourceAssetId: qe.speechCloneSourceAssetId,
              sourceFileId: qe.speechCloneFileId,
              sourceFilename: rn
            }),
            Cn = await $zr({
              baseUrl: ye,
              apiKey: ae,
              modelId: Z,
              sourceFile: Ct.blob,
              sourceFilename: Ct.filename,
              sourceFileId: Ct.fileId,
              sourceUrl: Ct.directUrl,
              voiceId: Yn,
              previewText: H,
              needNoiseReduction: !!qe.speechCloneNoiseReduction,
              needVolumeNormalization: !!qe.speechCloneVolumeNorm
            });
          xe(Cn.audioUrl || "", {
            voiceId: Cn.voiceId,
            speechClonedVoiceId: Cn.voiceId,
            speechCloneVoiceId: Cn.voiceId,
            speechCloneFileId: Cn.fileId ?? Ct.fileId,
            speechClonedSourceRevision: Qt
          });
          return;
        }
        const gt = ((We = N.settings) == null ? void 0 : We.voiceId) || "male-qn-qingse",
          Ut = ((Ze = N.settings) == null ? void 0 : Ze.emotion) || "",
          _t = ((Ge = N.settings) == null ? void 0 : Ge.languageBoost) || void 0,
          At = await xft({
            baseUrl: ye,
            apiKey: ae,
            modelId: Z,
            modelName: fe == null ? void 0 : fe.modelName,
            text: H,
            voiceSetting: {
              voice_id: gt,
              speed: Number(((Oe = N.settings) == null ? void 0 : Oe.speechSpeed) ?? 1),
              vol: Number(((st = N.settings) == null ? void 0 : st.speechVol) ?? 1),
              pitch: Number(((vt = N.settings) == null ? void 0 : vt.speechPitch) ?? 0),
              ...(Ut ? {
                emotion: Ut
              } : {})
            },
            audioSetting: {
              sample_rate: Number(((Ht = N.settings) == null ? void 0 : Ht.audioSampleRate) ?? 32e3),
              bitrate: Number(((nn = N.settings) == null ? void 0 : nn.audioBitrate) ?? 128e3),
              format: ((pt = N.settings) == null ? void 0 : pt.audioFormat) || "mp3",
              channel: Number(((lt = N.settings) == null ? void 0 : lt.audioChannel) ?? 1)
            },
            languageBoost: _t || null
          });
        xe(At.audioUrl, {
          usageCharacters: At.usageCharacters
        });
      } catch (gt) {
        const Ut = le ? gt instanceof Error ? gt.message : String(gt || "Grok Voice 生成失败") : J ? gt instanceof Error ? gt.message : String(gt || "Qwen TTS 生成失败") : we ? gt instanceof Error ? gt.message : String(gt || "Gemini TTS 生成失败") : X ? gt instanceof Error ? gt.message : String(gt || "MiniMax Speech 生成失败") : ne ? fzr(gt) : K ? Ctt(gt) : MF(gt);
        console.error("[Speech Generation] Error:", gt), el(z, N.id, !1), z(N.id, {
          isGenerating: !1,
          errorMsg: Ut,
          settings: {
            ...N.settings,
            isGenerating: !1,
            error: Ut
          }
        }), y(_t => _t.map(At => At.id === Ee.id ? {
          ...At,
          status: "failed",
          errorMsg: Ut
        } : At)), j7(z, N.id, () => Ai("error", Ut, 8e3));
      }
    }, [r, a, i, s, I, y, m, h, _]),
    R = g.useCallback(async N => {
      var qe, kt, St, hn, Qt, Ot, ln, Pn, rn, Yn, Ct, Cn, un, Jn, Kn, en, Vn, Tt, Ue, et, ft, ht, wt, jt, bt, Bt, wn, at, Pt, dt, xt, yn, gn, mt, Xt, Gn, rr, qn, Dn, Ar, _r, Pa, fa, Ca, $n, yr, Ir, Gr, Zr, La, sa, Ea, ba, ga, _a, $a, Ya, ta, ki, Wn, wr, jn, _n, ar, Vt, vn, An, ur, zr, Dr, Wr;
      if (SO(t, "启动生成"), jb()) {
        Ai("error", "存储位置变更进行中，请稍后再生成");
        return;
      }
      S.current = ykt(S.current ?? i);
      const G = String(N.prompt || "").trim();
      console.log("[useGeneration] generate 函数被调用", {
        nodeId: N.id,
        nodeType: N.type,
        nodeX: N.x,
        nodeY: N.y,
        prompt: G.substring(0, 50) || ((qe = N.prompt) == null ? void 0 : qe.substring(0, 50)),
        timestamp: new Date().toISOString()
      });
      const z = {
        ...(N.settings || {})
      };
      z._pendingRemoteResultUrl && delete z._pendingRemoteResultUrl;
      const V = z._apFanoutMember === !0;
      delete z._apFanoutMember;
      const O = V ? Number(z.batchSize ?? z.batchCount ?? 1) : 0;
      V && (z.batchSize = 1, z.batchCount = 1), N = {
        ...N,
        settings: z
      };
      const L = zgt(N, i, o).map(gr => gr.id),
        D = (kt = N.settings) == null ? void 0 : kt._autoCreatedPreviewId;
      typeof D == "string" && D && L.push(D);
      const U = aln(N.id, t, C.bind, L),
        {
          updateNode: H,
          setNodes: Y,
          generationEpoch: K
        } = U;
      G.length >= 8 && String(((hn = (St = k.current) == null ? void 0 : St.find(jr => jr.id === N.id)) == null ? void 0 : hn.prompt) || "").trim() !== G && (H(N.id, {
        prompt: G
      }), k.current && (k.current = k.current.map(jr => jr.id === N.id ? {
        ...jr,
        prompt: G
      } : jr)));
      const W = ((Qt = N.settings) == null ? void 0 : Qt.model) || "",
        Q = W ? r.find(gr => gr.id === W) : void 0,
        q = ((Q == null ? void 0 : Q.modelName) || W || "").trim();
      if (console.log("[useGeneration] 使用传入的 node 数据，settings:", VF({
        settings: N.settings || {},
        modelId: W,
        modelNameForApi: q
      })), console.log("[useGeneration] 当前状态:", {
        totalNodes: o.length,
        totalConnections: i.length,
        connectionsFromThisNode: i.filter(gr => gr.from === N.id).length
      }), window.__AIYOUPLUS_CANVAS_MODEL_ADAPTER__?.getMediaModel(N.settings?.model) && (N.type === 'gen-music' || N.type === 'gen-speech')) {
        const nativeAudioAdapter = window.__AIYOUPLUS_CANVAS_MODEL_ADAPTER__;
        const nativeUpstreamText = [], nativeUnsupportedReferences = [];
        for (const connection of i.filter(connection => connection.to === N.id && (!connection.inputType || connection.inputType === 'default'))) {
          const source = s.get(connection.from);
          if (!source) continue;
          if (source.type === 'text-node' || source.type === 'novel-input') {
            const text = RJ(source); if (text) nativeUpstreamText.push(text);
          } else if (source.type === 'custom-agent') {
            const text = gJe(source); if (text) nativeUpstreamText.push(text);
          } else if (source.content || source.settings?.audioUrl) nativeUnsupportedReferences.push(source.settings?.audioUrl || source.content);
        }
        const upstream = nativeUpstreamText.join('\n\n');
        const nativePrompt = N.type === 'gen-speech' ? zke(String(N.prompt || '').trim(),upstream,nativeUpstreamText.length > 0) : String(N.prompt || N.settings?.instrumentalDescription || (N.settings?.lyrics ? '根据歌词创作歌曲' : '')).trim();
        j7(H,N.id,()=>UQ(N.id)); el(H,N.id,true);
        return nativeAudioAdapter.generate({node:N,prompt:nativePrompt,isCurrent:U.isCurrent,nodesRef:k,nodes:o,setHistory:y,recordTask:U.recordTask,
          updateNode:(id,patch)=>H(id,patch.previewType === 'audio' && patch.content ? (N.type === 'gen-music' ? fie(N,patch) : z0t(N,patch)) : patch),
          getReferenceSources:()=>nativeUnsupportedReferences,finish:()=>el(H,N.id,false),
          cacheOutput:output=>nativeAudioAdapter.cacheOutput(output,{assetStore:ni,toAssetUrl:SSn})});
      }
      if (N.type === "gen-music") return console.log("[useGeneration] 调用 generateMusic"), j7(H, N.id, () => UQ(N.id)), el(H, N.id, !0), T(N, U);
      if (N.type === "gen-speech") return j7(H, N.id, () => UQ(N.id)), el(H, N.id, !0), P(N, U);
      j7(H, N.id, () => {
        Rwe(), UQ(N.id);
      }), el(H, N.id, !0), N.isGenerating || w(U.isCurrent, () => {
        const jr = f5(N) ? $6(N) : null,
          ea = {
            ...((jr == null ? void 0 : jr.settings) ?? (N.settings || {}))
          };
        delete ea.previewActualSize, delete ea.previewSize, delete ea.imageSize, delete ea._pendingRemoteResultUrl, V && O > 1 && (ea.batchSize = O, ea.batchCount = O), H(N.id, {
          ...(jr ? {
            content: jr.content,
            _contentAssetId: jr._contentAssetId,
            videoPosterUrl: jr.videoPosterUrl,
            previewType: jr.previewType,
            selectedPreviewImage: jr.selectedPreviewImage,
            selectedPreviewVideo: jr.selectedPreviewVideo,
            previewMjImages: jr.previewMjImages,
            previewMjVideos: jr.previewMjVideos,
            errorMsg: jr.errorMsg
          } : {}),
          isGenerating: !0,
          errorMsg: void 0,
          settings: {
            ...ea,
            isGenerating: !0,
            progress: 5,
            error: null
          }
        });
        const pa = zgt(N, i, o);
        for (const Br of pa) oie(Br) && H(Br.id, {
          ...b2e(Br),
          errorMsg: void 0
        });
        pa.length > 0 && requestAnimationFrame(() => {
          for (const Br of pa) try {
            rz(H, Br.id, "previewGenerationStarted");
          } catch {}
        });
      }), await Id();
      const ne = i.find(gr => gr.to === N.id && (!gr.inputType || gr.inputType === "default")),
        de = ne ? s.get(ne.from) : null,
        le = (de == null ? void 0 : de.type) === "storyboard-node" && ((Ot = de.settings) == null ? void 0 : Ot.jsonData) || "";
      let J = N.prompt || "";
      const pe = ["gen-video", "gen-image", "generate-character-video", "generate-scene-video"].includes(N.type),
        ce = i.filter(gr => gr.to === N.id && (!gr.inputType || gr.inputType === "default")),
        we = [];
      for (const gr of ce) {
        const jr = s.get(gr.from);
        if (jr && jr.type === "custom-agent") {
          const ea = ((ln = jr.settings) == null ? void 0 : ln.outputContent) || "";
          ea.trim() && (we.push(ea.trim()), console.log("[useGeneration] 检测到上游 Agent 节点输出:", {
            nodeId: jr.id,
            contentLength: ea.length
          }));
        }
      }
      if (pe) {
        const gr = k.current ?? o,
          jr = S.current ?? i,
          ea = JBt(N.id, jr, gr),
          pa = Fde({
            nodeId: N.id,
            connections: jr,
            nodes: gr,
            storyboardJsonDataRaw: le || null
          });
        (ea || !!pa.trim()) && Y4(J) && (J = ""), J = zke(J, pa, ea), N.type === "gen-image" && Y4(J) && (J = ""), J.trim() ? pa.trim() && console.log("[useGeneration] 打组执行：使用上游合并提示词，长度:", J.length) : (N.type === "gen-video" || N.type === "generate-character-video" || N.type === "generate-scene-video") && (J = "视频生成", console.log("[useGeneration] 打组执行：无上游内容，使用默认提示词避免 API 400"));
      }
      let X = null;
      if (de && de.type === "storyboard-node") {
        const gr = (Pn = de.settings) == null ? void 0 : Pn.jsonData;
        if (gr) try {
          X = JSON.parse(gr);
        } catch (jr) {
          console.error("[useGeneration] 解析分镜JSON数据失败:", jr);
        }
      }
      const Z = i.filter(gr => gr.to === N.id && (!gr.inputType || gr.inputType === "default")),
        re = [],
        fe = [],
        ye = [],
        ie = [];
      let ae = "",
        be = null,
        Ee = !1;
      if (Z.forEach(gr => {
        var ea, pa, Br, tn, Lr, br, Jr, Kr, ir, Hr, ha, Ga, Za;
        const jr = s.get(gr.from);
        if (jr) {
          if (jr.type === "camera-movement") {
            const va = (ea = jr.settings) == null ? void 0 : ea.movementConfig;
            va && QQ(va);
          } else if (jr.type === "professional-camera") {
            const va = (pa = jr.settings) == null ? void 0 : pa.cinemaConfig;
            if (va) {
              const Kt = yAe(va);
              Kt && re.push(Kt);
            }
          } else if (jr.type === "input-image") {
            const va = (Br = jr.settings) == null ? void 0 : Br.multiAngle;
            if (gv(N, "angle") && va && va.isActive) {
              Ee = !0;
              const Pr = va.sceneMode || "character";
              let kr;
              Pr === "architecture" ? (kr = SSt(va), console.log("[Generation] 🏗️ 使用建筑模式提示词"), console.log("[Generation] ControlNet 降权:", kr.needsControlNetReduction ? "是（0.35-0.45）" : "否")) : (kr = ISt(va), console.log("[Generation] 👤 使用人物模式提示词")), ae = kr.augmentedPrompt, be = kr.angleMetadata ? {
                ...kr.angleMetadata,
                sceneMode: va.sceneMode,
                needsControlNetReduction: kr.needsControlNetReduction || !1
              } : null, console.log("[Generation] 角度提示词已启用:", {
                sceneMode: Pr,
                angleAugmentedPrompt: ae,
                angleMetadata: be,
                sourceNodeId: jr.id,
                multiAngle: va
              });
            } else va && !va.isActive && console.log("[Generation] 角度配置存在但未启用:", {
              sourceNodeId: jr.id,
              multiAngle: va
            });
            const Kt = (tn = jr.settings) == null ? void 0 : tn.lighting;
            if (gv(N, "lighting") && Kt && Kt.isActive) {
              const Pr = dDe(Kt);
              Pr && (fe.push(Pr), console.log("[Generation] 💡 重打光提示词已添加:", {
                lightingPrompt: Pr,
                sourceNodeId: jr.id,
                lighting: Kt
              }));
            }
            gv(N, "portraitTexture") && YQ((Lr = jr.settings) == null ? void 0 : Lr.portraitTexture) && ye.push(nwe((br = jr.settings) == null ? void 0 : br.portraitTexture)), gv(N, "moodAdjust") && XQ((Jr = jr.settings) == null ? void 0 : Jr.moodAdjust) && ie.push(rwe((Kr = jr.settings) == null ? void 0 : Kr.moodAdjust));
          } else if (jr.type === "gen-image") {
            const va = (ir = jr.settings) == null ? void 0 : ir.lighting;
            if (gv(N, "lighting") && va && va.isActive) {
              const Kt = dDe(va);
              Kt && (fe.push(Kt), console.log("[Generation] 💡 上游绘画节点重打光提示词已添加:", {
                lightingPrompt: Kt,
                sourceNodeId: jr.id,
                lighting: va
              }));
            }
            gv(N, "portraitTexture") && YQ((Hr = jr.settings) == null ? void 0 : Hr.portraitTexture) && ye.push(nwe((ha = jr.settings) == null ? void 0 : ha.portraitTexture)), gv(N, "moodAdjust") && XQ((Ga = jr.settings) == null ? void 0 : Ga.moodAdjust) && ie.push(rwe((Za = jr.settings) == null ? void 0 : Za.moodAdjust));
          }
        }
      }), !Ee && (N.type === "gen-image" || N.type === "gen-video")) {
        const gr = (rn = N.settings) == null ? void 0 : rn.multiAngle;
        if (gr && gr.isActive) {
          Ee = !0;
          const jr = gr.sceneMode || "character";
          let ea;
          jr === "architecture" ? ea = SSt(gr) : ea = ISt(gr), ae = ea.augmentedPrompt, be = ea.angleMetadata ? {
            ...ea.angleMetadata,
            sceneMode: gr.sceneMode,
            needsControlNetReduction: ea.needsControlNetReduction || !1
          } : null;
        }
      }
      if (N.type === "gen-image" || N.type === "gen-video") {
        const gr = (Yn = N.settings) == null ? void 0 : Yn.lighting;
        if (gr != null && gr.isActive) {
          const jr = dDe(gr);
          jr && (fe.push(jr), console.log("[Generation] 💡 本节点重打光提示词已添加:", {
            lightingPrompt: jr,
            nodeId: N.id,
            lighting: gr
          }));
        }
        YQ((Ct = N.settings) == null ? void 0 : Ct.portraitTexture) && ye.push(nwe((Cn = N.settings) == null ? void 0 : Cn.portraitTexture)), XQ((un = N.settings) == null ? void 0 : un.moodAdjust) && ie.push(rwe((Jn = N.settings) == null ? void 0 : Jn.moodAdjust));
      }
      {
        const gr = (Kn = N.settings) == null ? void 0 : Kn.cinemaConfig,
          jr = gr ? yAe(gr) : "";
        jr && re.push(jr);
      }
      {
        const gr = (en = N.settings) == null ? void 0 : en.movementConfig;
        gr && QQ(gr);
      }
      const xe = fao(J);
      let he = "";
      if (Ee) {
        const gr = Y4(xe) ? "" : xe.trim();
        gr ? he = ae ? `${ae}, ${gr}` : gr : he = ae || "", console.log("[useGeneration] 📸 导演相机模式已启动，最终提示词:", he);
      } else N.type === "gen-image" && Y4(xe) ? he = "" : he = xe;
      if (we.length > 0 && !pe) {
        const gr = we.join(`

`);
        he.trim() ? he = `${he}

${gr}` : he = gr, console.log("[useGeneration] 🤖 已添加 Agent 输出到提示词，总长度:", he.length);
      }
      const ue = [],
        ge = [],
        _e = [],
        ke = [];
      let ve = null,
        Te = 24;
      const Ne = 8,
        me = async gr => {
          let jr = 1024,
            ea = 1024;
          if (!gr.content) return {
            width: jr,
            height: ea
          };
          try {
            const pa = new Image();
            await new Promise(Br => {
              pa.onload = () => {
                jr = pa.naturalWidth || pa.width || jr, ea = pa.naturalHeight || pa.height || ea, Br();
              }, pa.onerror = () => Br(), pa.src = gr.content || "";
            });
          } catch {}
          return {
            width: jr,
            height: ea
          };
        },
        Ae = (gr, jr, ea, pa, Br, tn) => {
          const Lr = Math.max(1, Math.round(gr)),
            br = Math.max(1, Math.round(jr)),
            Jr = document.createElement("canvas");
          Jr.width = Lr, Jr.height = br;
          const Kr = Jr.getContext("2d");
          if (!Kr) return "";
          Kr.fillStyle = "#000", Kr.fillRect(0, 0, Lr, br);
          const ir = document.createElement("canvas");
          ir.width = Lr, ir.height = br;
          const Hr = ir.getContext("2d");
          if (!Hr) return "";
          Hr.fillStyle = "#fff";
          const ha = Number.isFinite(pa) ? Math.max(0, Math.min(128, Math.round(pa))) : 0,
            Ga = Br == null ? void 0 : Br.points01.filter(Kt => Number.isFinite(Kt.x) && Number.isFinite(Kt.y) && Kt.x >= -.001 && Kt.y >= -.001 && Kt.x <= 1.001 && Kt.y <= 1.001);
          if (Br && Ga && Ga.length >= 3) {
            const Kt = Pr => {
              const kr = Br.sourceRect;
              kr.w <= 0 || kr.h <= 0 || (Hr.beginPath(), Ga.forEach((Mr, Hn) => {
                const $t = Mr.x * Lr,
                  je = Mr.y * br,
                  Qe = ($t - kr.x) / kr.w,
                  Mt = (je - kr.y) / kr.h,
                  cn = Pr.x + Qe * Pr.w,
                  Qn = Pr.y + Mt * Pr.h;
                Hn === 0 ? Hr.moveTo(cn, Qn) : Hr.lineTo(cn, Qn);
              }), Hr.closePath(), Hr.fill());
            };
            Kt(Br.sourceRect), Kt(Br.targetRect);
          } else for (let Kt = 0; Kt < ea.length; Kt += 1) {
            const Pr = ea[Kt],
              kr = Math.round(Pr.x) - ha,
              Mr = Math.round(Pr.y) - ha,
              Hn = Math.round(Pr.w) + ha * 2,
              $t = Math.round(Pr.h) + ha * 2,
              je = Math.max(0, Math.min(Lr - 1, kr)),
              Qe = Math.max(0, Math.min(br - 1, Mr)),
              Mt = Math.max(1, Math.min(Lr - je, Hn)),
              cn = Math.max(1, Math.min(br - Qe, $t));
            (tn == null ? void 0 : tn.softEllipseTarget) === !0 && ea.length > 1 && Kt === ea.length - 1 ? (Hr.beginPath(), Hr.ellipse(je + Mt / 2, Qe + cn / 2, Mt / 2, cn / 2, 0, 0, Math.PI * 2), Hr.fill()) : Hr.fillRect(je, Qe, Mt, cn);
          }
          const Za = Math.max(0, Math.round((tn == null ? void 0 : tn.featherPx) ?? (Br && Ga && Ga.length >= 3 && ha > 0 ? ha * .45 : 0)));
          return Kr.save(), Za > 0 && (Kr.filter = `blur(${Math.max(1, Za)}px)`), Kr.drawImage(ir, 0, 0), Kr.restore(), Kr.drawImage(ir, 0, 0), Jr.toDataURL("image/png").split(",")[1] || "";
        },
        Fe = gv(N, "markers"),
        Me = gv(N, "textEdit"),
        Re = gv(N, "moveObject"),
        $e = [];
      (N.type === "gen-image" || N.type === "gen-video") && $e.push(N);
      for (const gr of Z) {
        const jr = s.get(gr.from);
        jr && jr.id !== N.id && (jr.type === "input-image" || jr.type === "gen-image") && $e.push(jr);
      }
      for (const gr of $e) {
        const jr = gr.id === N.id;
        if (gr && (gr.type === "input-image" || gr.type === "gen-image")) {
          if ((jr || Fe) && gr.markers && gr.markers.length > 0) {
            const ea = gr.markers.filter(pa => !pa.isAnalyzing);
            if (ea.length > 0) try {
              const {
                generateMarkerMask: pa,
                buildMarkerPrompt: Br
              } = await Ie(async () => {
                const {
                  generateMarkerMask: ir,
                  buildMarkerPrompt: Hr
                } = await Promise.resolve().then(() => Aoe);
                return {
                  generateMarkerMask: ir,
                  buildMarkerPrompt: Hr
                };
              }, void 0, import.meta.url);
              let tn = 1024,
                Lr = 1024;
              if (gr.content) try {
                const ir = new Image();
                await new Promise((Hr, ha) => {
                  ir.onload = () => {
                    tn = ir.naturalWidth || ir.width, Lr = ir.naturalHeight || ir.height, console.log("[Generation] 获取到实际图片尺寸:", {
                      width: tn,
                      height: Lr
                    }), Hr();
                  }, ir.onerror = () => {
                    console.warn("[Generation] 无法加载图片，使用默认尺寸"), Hr();
                  }, ir.src = gr.content || "";
                });
              } catch (ir) {
                console.warn("[Generation] 获取图片尺寸失败，使用默认尺寸:", ir);
              }
              const br = ea.map(ir => ({
                  ...ir,
                  x: ir.x / 100,
                  y: ir.y / 100
                })),
                Jr = pa(tn, Lr, br);
              ge.push({
                nodeId: gr.id,
                mask: Jr,
                width: tn,
                height: Lr,
                markerCount: ea.length
              });
              const Kr = Br(ea, tn, Lr);
              Kr.trim() && ue.push(Kr), console.log("[Generation] 已生成标记蒙版:", {
                nodeId: gr.id,
                markerCount: ea.length,
                imageSize: `${tn}×${Lr}`,
                maskSize: Jr.length
              });
            } catch (pa) {
              console.error("[Generation] 生成标记蒙版失败:", pa);
              const Br = 1024,
                tn = 1024,
                Lr = ea.map((br, Jr) => {
                  const Kr = Math.round(br.x / 100 * Br),
                    ir = Math.round(br.y / 100 * tn),
                    Hr = Math.round(br.x),
                    ha = Math.round(br.y),
                    Ga = (br.detailLabel || br.partLabel || br.mainLabel || br.label || "").trim() || "请根据蒙版白色区域进行局部修改";
                  return `${Jr + 1}. [位置: (${Kr}, ${ir})像素 / (${Hr}%, ${ha}%)从左上角] ${Ga}`;
                }).join(`
`);
              Lr.trim() && ue.push(Lr);
            }
          }
          if ((jr || Me) && ((Vn = gr.settings) != null && Vn.textEditData)) try {
            const ea = JSON.parse(gr.settings.textEditData),
              pa = Array.isArray(ea.modifications) ? ea.modifications : [];
            if (pa.length > 0) {
              let Br = !1;
              if (ge.length === 0) {
                const {
                    width: Lr,
                    height: br
                  } = await me(gr),
                  Jr = pa.map(Kr => {
                    const ir = Kr.bbox;
                    if (!ir) return null;
                    const Hr = Number(ir.x),
                      ha = Number(ir.y),
                      Ga = Number(ir.width),
                      Za = Number(ir.height);
                    return ![Hr, ha, Ga, Za].every(va => Number.isFinite(va)) || Ga <= 0 || Za <= 0 ? null : {
                      x: Hr * Lr,
                      y: ha * br,
                      w: Ga * Lr,
                      h: Za * br
                    };
                  }).filter(Kr => Kr !== null);
                if (Jr.length > 0 && Lr > 0 && br > 0) {
                  const Kr = Ae(Lr, br, Jr, Ne);
                  Kr && (ge.push({
                    nodeId: gr.id,
                    mask: Kr,
                    width: Lr,
                    height: br,
                    markerCount: 0
                  }), Br = !0, console.log("[Generation] 已生成文字编辑蒙版:", {
                    nodeId: gr.id,
                    regions: Jr.length,
                    imageSize: `${Lr}×${br}`
                  }));
                }
              }
              const tn = pa.map(Lr => `将"${Lr.originalText ?? ""}"改为"${Lr.newText ?? ""}"`).join("，");
              _e.push(Br ? `严格按照蒙版白色区域修改图片中的文字：${tn}。
重要规则：
1. 只修改蒙版白色区域内的文字，黑色区域保持完全不变
2. 即使其他位置有相同的文字，也不要修改
3. 保持原有字体风格、大小和排版不变` : `严格修改图片中的指定文字：${tn}。
重要规则：
1. 只修改上述指定的文字，其他内容保持完全不变
2. 即使其他位置有相同的文字，也不要修改
3. 保持原有字体风格、大小和排版不变`), console.log("[Generation] 检测到文字编辑数据:", tn);
            }
          } catch (ea) {
            console.error("[Generation] 解析文字编辑数据失败:", ea);
          }
          if ((jr || Re) && ((Tt = gr.settings) != null && Tt.moveObjectData)) try {
            const ea = gr.settings.moveObjectData,
              pa = JSON.parse(ea);
            if ((pa == null ? void 0 : pa.status) === "confirmed" || (pa == null ? void 0 : pa.version) === 1) {
              const Br = pa.imageSize || {},
                tn = pa.subject || {},
                Lr = typeof tn.label == "string" ? tn.label : "主体",
                br = pa.source || {},
                Jr = br.rect,
                Kr = (Ue = pa.target) == null ? void 0 : Ue.rect,
                ir = br.rect01,
                Hr = (et = pa.target) == null ? void 0 : et.rect01,
                ha = br.shape === "lasso" && Array.isArray(br.lassoPoints01) ? br.lassoPoints01.map(Rn => ({
                  x: Number(Rn.x),
                  y: Number(Rn.y)
                })).filter(Rn => Number.isFinite(Rn.x) && Number.isFinite(Rn.y) && Rn.x >= -.001 && Rn.y >= -.001 && Rn.x <= 1.001 && Rn.y <= 1.001) : [],
                Ga = Rn => {
                  if (!Rn) return null;
                  const Un = Number(Rn.x),
                    er = Number(Rn.y),
                    Cr = Number(Rn.w),
                    tr = Number(Rn.h);
                  return [Un, er, Cr, tr].every(kn => Number.isFinite(kn)) ? {
                    x: Un,
                    y: er,
                    w: Cr,
                    h: tr
                  } : null;
                },
                Za = Ga(ir),
                va = Ga(Hr),
                Kt = pa.prompts || {},
                Pr = pa.blend || {},
                kr = Number(Pr.featherPx);
              Number.isFinite(kr) && (Te = Math.max(8, Math.min(96, Math.round(kr))));
              const Mr = typeof Kt.instruction == "string" && Kt.instruction.trim() ? Kt.instruction.trim() : "";
              let Hn = null,
                $t = null,
                je = 0,
                Qe = 0,
                Mt = !1;
              const cn = !!Za && !!va && Yde(Za) && Yde(va);
              let Qn = 0,
                Lt = 0,
                ct = 0,
                Dt = 0,
                bn = 0,
                Rt = 0,
                fn = 0,
                Zt = 0,
                Ln = !1;
              if (Jr && Kr && (Qn = Number(Jr.x), Lt = Number(Jr.y), ct = Number(Jr.w ?? Jr.width), Dt = Number(Jr.h ?? Jr.height), bn = Number(Kr.x), Rt = Number(Kr.y), fn = Number(Kr.w ?? Kr.width), Zt = Number(Kr.h ?? Kr.height), Ln = [Qn, Lt, ct, Dt, bn, Rt, fn, Zt].every(Rn => Number.isFinite(Rn))), cn || Ln) {
                const Rn = typeof (Br == null ? void 0 : Br.w) == "number" && Number.isFinite(Br.w) ? Math.round(Number(Br.w)) : 0,
                  Un = typeof (Br == null ? void 0 : Br.h) == "number" && Number.isFinite(Br.h) ? Math.round(Number(Br.h)) : 0;
                let er = 0,
                  Cr = 0;
                if (gr.content) try {
                  const xn = new Image();
                  await new Promise(Fn => {
                    xn.onload = () => {
                      er = xn.naturalWidth || xn.width || 0, Cr = xn.naturalHeight || xn.height || 0, Fn();
                    }, xn.onerror = () => Fn(), xn.src = gr.content || "";
                  });
                } catch {}
                let tr = Rn > 0 ? Rn : er,
                  kn = Un > 0 ? Un : Cr;
                if (tr <= 0 && (tr = er), kn <= 0 && (kn = Cr), je = er > 0 ? er : tr, Qe = Cr > 0 ? Cr : kn, je > 0 && Qe > 0 && cn && Za && va) Hn = Qde(Za, je, Qe), $t = Qde(va, je, Qe);else if (je > 0 && Qe > 0 && Ln && Jr && Kr) {
                  if (tr > 0 && kn > 0) {
                    const xn = je / tr,
                      Fn = Qe / kn;
                    (Math.abs(xn - 1) > .002 || Math.abs(Fn - 1) > .002) && console.warn("[Generation] 移动对象：JSON imageSize 与参考图实际像素不一致，已按比例校准坐标/蒙版", {
                      jsonSize: `${Rn}×${Un}`,
                      refUsed: `${tr}×${kn}`,
                      actualSize: `${er}×${Cr}`,
                      out: `${je}×${Qe}`,
                      scaleX: Number(xn.toFixed(5)),
                      scaleY: Number(Fn.toFixed(5))
                    }), Qn = Math.round(Qn * xn), Lt = Math.round(Lt * Fn), ct = Math.max(1, Math.round(ct * xn)), Dt = Math.max(1, Math.round(Dt * Fn)), bn = Math.round(bn * xn), Rt = Math.round(Rt * Fn), fn = Math.max(1, Math.round(fn * xn)), Zt = Math.max(1, Math.round(Zt * Fn));
                  }
                  Hn = {
                    x: Qn,
                    y: Lt,
                    w: ct,
                    h: Dt
                  }, $t = {
                    x: bn,
                    y: Rt,
                    w: fn,
                    h: Zt
                  };
                }
                (je <= 0 || Qe <= 0) && (Hn = null, $t = null);
              }
              const tt = Rn => Number.isFinite(Rn) ? Rn.toFixed(4) : String(Rn),
                zt = [`主体：${Lr}`];
              if (Hn && $t && je > 0 && Qe > 0) {
                Mt = qro(Hn, $t, je, Qe);
                const Rn = x$(Hn, je, Qe),
                  Un = x$($t, je, Qe);
                ve || (ve = {
                  sourceRect01: Rn,
                  targetRect01: Un,
                  lassoPoints01: ha.length >= 3 ? ha : void 0,
                  sourceImageRef: gr.content || void 0
                });
                const er = k$e(Hn, $t),
                  Cr = Agr(Rn, Un),
                  tr = A$e(Hn, $t);
                zt.push(`图像尺寸(px，与本次上传参考图一致)：${je}×${Qe}`), zt.push(`源(px)：x=${Hn.x}, y=${Hn.y}, w=${Hn.w}, h=${Hn.h}`), zt.push(`目标(px)：x=${$t.x}, y=${$t.y}, w=${$t.w}, h=${$t.h}`), zt.push(`源(0-1)：x=${tt(Rn.x)}, y=${tt(Rn.y)}, w=${tt(Rn.w)}, h=${tt(Rn.h)}`), zt.push(`目标(0-1)：x=${tt(Un.x)}, y=${tt(Un.y)}, w=${tt(Un.w)}, h=${tt(Un.h)}`), zt.push(`主体最终框(px，原比例居中落入目标)：x=${Math.round(er.x)}, y=${Math.round(er.y)}, w=${Math.round(er.w)}, h=${Math.round(er.h)}`), zt.push(`主体最终框(0-1)：x=${tt(Cr.x)}, y=${tt(Cr.y)}, w=${tt(Cr.w)}, h=${tt(Cr.h)}`), zt.push(Kro({
                  label: Lr,
                  scale: tr,
                  containedPx: er
                })), ha.length >= 3 && zt.push(`源主体由 ${ha.length} 个归一化套索点精确圈定；白色编辑蒙版按该轮廓及其目标变换生成，不得把包围框内的其它背景当作主体。`), Mt ? zt.push(`【同区域/原地编辑】源框与目标框在空间上高度重叠或中心接近，不属于「把主体搬到远处空白区」。必须在白蒙版（源∪目标）内、以**目标框**为最终构图与尺度参考，对「${Lr}」做**可见的原地重绘**（可缩放/旋转/塑形/光影等）；两框重叠不代表可省略编辑；须落实下方「编辑要求」；若用户描述含「原地变小/变大」等，画面相对原图须有**明确视觉差异**，禁止输出与原图几乎一致的无改稿。`) : zt.push(...Qro({
                  label: Lr,
                  sourcePx: Hn,
                  targetPx: $t,
                  containedPx: er,
                  imageW: je,
                  imageH: Qe
                }));
              } else Br != null && Br.w && (Br != null && Br.h) && zt.push(`图像尺寸(px)：${Br.w}×${Br.h}`), Jr && zt.push(`源(px)：x=${Jr.x}, y=${Jr.y}, w=${Jr.w ?? Jr.width}, h=${Jr.h ?? Jr.height}`), Kr && zt.push(`目标(px)：x=${Kr.x}, y=${Kr.y}, w=${Kr.w ?? Kr.width}, h=${Kr.h ?? Kr.height}`), Za && zt.push(`源(0-1)：x=${tt(Za.x)}, y=${tt(Za.y)}, w=${tt(Za.w)}, h=${tt(Za.h)}`), va && zt.push(`目标(0-1)：x=${tt(va.x)}, y=${tt(va.y)}, w=${tt(va.w)}, h=${tt(va.h)}`);
              Mr && zt.push(`编辑要求：${Mr}`), Mt ? zt.push("强制要求（同区域）：白蒙版区域内输出须相对原图有可见变化；以目标框界定主体最终大小、位置与透视；禁止整图几乎无改或与原图像素级一致；禁止在白区内出现两份相同主体；蒙版外黑区保持原像素不变；禁止在成图中画出黄框/橙框/蓝框/虚线框或任何标注层；缩放后主体边缘须与周围背景融合，禁止矩形切割感。" + (Hn && $t && rUt(A$e(Hn, $t)) ? "主体大小必须跟随目标框，禁止保持原尺寸。" : "")) : zt.push("强制要求：源区域必须把主体完全移除并自然补全背景；目标区域只保留一个主体，画面中禁止出现两个相同主体；禁止把主体放到目标框外的相近区域；禁止为了「放得下」而改画场景结构；禁止在成图中画出黄框/橙框/蓝框/虚线框或任何标注层；禁止矩形切割块，主体边缘必须与新背景自然融合；主体大小必须跟随目标框，禁止只改位置不改大小。");
              const an = zt.filter(Boolean);
              if (an.length && (ke.push(an.join(`
`)), console.log("[Generation] 检测到移动对象数据:", an.join(" | "))), ge.length === 0 && Hn && $t && je > 0 && Qe > 0) {
                const Rn = k$e(Hn, $t),
                  Un = Mt ? Te : Math.max(Te, 28),
                  er = Mt ? Te : Math.max(6, Math.min(12, Math.round(Te * .5))),
                  Cr = ha.length >= 3,
                  tr = Cr ? Mt ? Te : Math.max(10, Math.round(Te * .55)) : Mt ? Te : 0,
                  kn = Math.min(Rn.w / Math.max(1, Hn.w), Rn.h / Math.max(1, Hn.h)),
                  xn = Sgr(Rn.w, Rn.h, kn),
                  Fn = Ae(je, Qe, Mt || Cr ? [Hn, Mt ? $t : Rn] : [Imn(Hn, Un, je, Qe), Imn(Rn, er, je, Qe)], tr, Cr ? {
                    points01: ha,
                    sourceRect: Hn,
                    targetRect: Mt ? $t : Rn
                  } : void 0, {
                    softEllipseTarget: !Cr,
                    featherPx: Cr ? Math.max(tr, Math.round(xn * .45)) : xn
                  });
                Fn && (ge.push({
                  nodeId: gr.id,
                  mask: Fn,
                  width: je,
                  height: Qe,
                  markerCount: 0
                }), console.log("[Generation] ✅ 已生成移动对象 union mask 并将作为 edits 蒙版发送", {
                  size: `${je}×${Qe}`
                }));
              }
            }
          } catch (ea) {
            console.error("[Generation] 解析移动对象数据失败:", ea);
          }
        }
      }
      const rt = ue.length > 0,
        nt = _e.length > 0,
        ze = ke.length > 0,
        Le = fe.length > 0,
        Ke = ye.length > 0,
        Xe = ie.length > 0,
        De = we.length > 0;
      if (!he.trim() && (N.type === "gen-image" || N.type === "gen-video" || N.type === "generate-character-video" || N.type === "generate-scene-video")) {
        Z7(N.id);
        const gr = t_(N.id),
          jr = gr ? Ec(gr).trim() : "";
        jr && !Y4(jr) && (he = jr, console.log("[useGeneration] 从提示词 DOM 恢复未落库文案，长度:", jr.length));
      }
      !he.trim() && G.length >= 8 && (he = G);
      const Ye = Yc(String(((ft = N.settings) == null ? void 0 : ft.model) || "")) && p5(N.settings || {}),
        Ce = Cu(String(((ht = N.settings) == null ? void 0 : ht.model) || "")) && ((wt = N.settings) == null ? void 0 : wt.metasoRegenerationMode) === "task";
      if (!he.trim() && !Ee && !rt && !nt && !ze && !Le && !Ke && !Xe && !De && !Ye && !Ce) {
        console.warn("[useGeneration] 提示词为空、角度未启用、且没有标记说明、文字编辑、移动对象、灯光设置、人像质感、情绪调节或 Agent 输出"), alert(x("请输入提示词、启用角度调整功能、添加图片标记说明、使用文字编辑、移动对象、设置灯光、人像质感调节、情绪调节或连接 Agent 节点")), el(H, N.id, !1), H(N.id, {
          isGenerating: !1
        });
        return;
      }
      if (!he.trim() && Ee && !rt && !nt && !ze && !Le && !Ke && !Xe) {
        console.error("[useGeneration] 角度已启用但提示词仍为空，这是一个异常情况"), console.error("[useGeneration] angleAugmentedPrompt:", ae), console.error("[useGeneration] angleMetadata:", be), alert(x("角度配置异常，请检查角度设置或输入提示词")), el(H, N.id, !1), H(N.id, {
          isGenerating: !1
        });
        return;
      }
      const He = [];
      he.trim() && He.push(he), re.length > 0 && He.push(re.join(", ")), fe.length > 0 && He.push(fe.join(`

`)), ye.length > 0 && He.push(ye.join(`

`)), ie.length > 0 && He.push(ie.join(`

`));
      const Ve = (fe.length > 0 ? 1 : 0) + (ye.length > 0 ? 1 : 0) + (ie.length > 0 ? 1 : 0);
      let it = He.join(Ve > 0 ? `

` : ", ");
      if (Ve > 0 && He.length > Ve) {
        const gr = He.slice(0, -Ve).join(", "),
          jr = He.slice(-Ve).join(`

`);
        it = `${gr}

${jr}`;
      }
      const It = ((jt = N.settings) == null ? void 0 : jt.model) || (N.type === "gen-image" ? "qwen-image-edit" : "sora-2");
      if (N.type === "gen-image" || N.type === "gen-video") {
        const gr = $nn(N, u),
          jr = Qqe(It) || Ip(It) || Ih(It) || Db(It) || aw(It) || Lb(It) || Kv(It),
          ea = nXr(N, gr, h, jr),
          pa = N.type === "gen-video" && jr ? ((Bt = (bt = N.settings) == null ? void 0 : bt.seedanceMaterials) == null ? void 0 : Bt.length) ?? 0 : gr.length;
        if (pa > 0 && it && !GY(It) && !PE(It) && !IS(It) && !ag(It) && !V1(It) && !Nv(It) && !kp(It) && !Ap(It) && !Gp(It) && !Yc(It) && !D2(It) && !xb(It) && !yf(It) && !Sy(It) && !HM(It)) {
          const Br = ea.length > 0 ? ea : Array.from({
            length: pa
          }, () => ({
            type: "image"
          }));
          it = UPt(it, Br);
        }
      }
      if (rt) {
        const gr = ue.join(`

`).trim(),
          jr = Y4(it) ? "" : it.trim();
        it = jr ? `${jr}

${gr}` : gr, console.log("[Generation] 已添加图片标记说明到提示词（含蒙版）:", gr);
      }
      if (nt) {
        const gr = _e.join(`

`),
          jr = Y4(it) ? "" : it.trim();
        it = jr ? `${jr}

${gr}` : gr, console.log("[Generation] 已添加文字编辑指令到提示词:", gr);
      }
      if (ze) {
        const gr = ke.join(`

`);
        it = `${it}

移动对象要求：
${gr}`, console.log("[Generation] 已添加移动对象数据到提示词:", gr);
      }
      if (window.__AIYOUPLUS_CANVAS_MODEL_ADAPTER__?.getMediaModel(N.settings?.model)) {
        const adapter = window.__AIYOUPLUS_CANVAS_MODEL_ADAPTER__;
        if (!adapter) {
          H(N.id,{isGenerating:false,errorMsg:"模型适配器尚未加载，请重试"});
          el(H,N.id,false);
          return;
        }
        return adapter.generate({
          node:N,prompt:it,updateNode:H,setHistory:y,isCurrent:U.isCurrent,nodesRef:k,nodes:o,
          connections:i,recordTask:U.recordTask,getReferenceSources:()=> $nn(N,u),
          finish:()=>el(H,N.id,false),
          cacheOutput:output=>adapter.cacheOutput(output,{assetStore:ni,toAssetUrl:SSn}),
          updatePreviews:({content,previewType,taskId,extra})=>jSt({
            node:N,taskId,content,previewType,connections:i,nodes:o,nodesRef:k,updateNode:H,initialPreviewId:D,extra
          })
        });
      }
      const Ft = ((wn = N.settings) == null ? void 0 : wn.model) || (N.type === "gen-image" ? "qwen-image-edit" : "sora-2"),
        We = she(Ft),
        Ze = r.find(gr => gr.id === O6n(We || Ft)) || r.find(gr => gr.modelName === Ft),
        Ge = Ze != null && Ze.apiProviderId && Ze.enabled === !1 ? "该模型或服务商已停用，请在 API 接入中启用" : Ze != null && Ze.isCustom && (Ze.templateId || Ze.customProtocol) ? sTt(Ze) : Ft.startsWith("custom-") && !Ze ? "此自定义模型已删除，请重新选择模型" : null;
      if (Ge) {
        el(H, N.id, !1), H(N.id, {
          isGenerating: !1,
          errorMsg: Ge
        });
        return;
      }
      const Oe = Ube(Ze, We || Ft),
        st = Iu(Oe),
        vt = !mm(Oe) && (Oe.includes("mj") || Oe.toLowerCase().includes("midjourney")),
        Ht = vt || st,
        nn = !Dg(Oe) && !Og(Oe) && !Lg(Oe) && !Rm(Oe) && (Oe.includes("nano-banana-2") || Oe.includes("gemini-3.1-flash-image-preview") || g3(Oe)),
        pt = N.type === "gen-video" || N.type === "generate-character-video" || N.type === "generate-scene-video" || N.type === "motion-control",
        lt = (((at = k.current) == null ? void 0 : at.find(gr => gr.id === N.id)) ?? N).settings ?? N.settings,
        gt = cu(Ze == null ? void 0 : Ze.key, a, lt == null ? void 0 : lt.savedApiKeyId, {
          platformGroup: (lt == null ? void 0 : lt.platformGroup) ?? ((Pt = N.settings) == null ? void 0 : Pt.platformGroup),
          modelName: (Ze == null ? void 0 : Ze.modelName) || Ft,
          modelId: (Ze == null ? void 0 : Ze.id) || Oe,
          baseUrl: Qa.getResolvedModelBaseUrl((Ze == null ? void 0 : Ze.id) || Oe) || (Ze == null ? void 0 : Ze.url) || void 0,
          modelSavedApiKeyId: Ze == null ? void 0 : Ze.savedApiKeyId
        }),
        Ut = N.type === "gen-video" || N.type === "generate-character-video" || N.type === "generate-scene-video" || N.type === "motion-control";
      if (GY(Oe)) {
        if (!Pxe()) {
          alert(x("即梦 CLI 仅支持 Tauri 桌面版")), H(N.id, {
            isGenerating: !1,
            errorMsg: "即梦 CLI 需桌面版"
          });
          return;
        }
        if (ME(Oe) && !Ut) {
          alert(x("即梦视频模型请在视频生成节点中使用")), H(N.id, {
            isGenerating: !1,
            errorMsg: "模型与节点类型不匹配"
          });
          return;
        }
        if (Zae(Oe) && Ut) {
          alert(x("即梦绘画模型请在绘画节点中使用")), H(N.id, {
            isGenerating: !1,
            errorMsg: "模型与节点类型不匹配"
          });
          return;
        }
        let gr = "";
        H(N.id, {
          settings: {
            ...N.settings,
            jimengSubmitId: void 0,
            jimengPending: !1,
            progressMessage: "正在准备生成任务"
          }
        });
        const jr = ((dt = N.settings) == null ? void 0 : dt.harnessImageHistoryId) || m(),
          ea = Date.now(),
          pa = {
            id: jr,
            url: "",
            type: Ut ? "video" : "image",
            prompt: it || "Untitled",
            time: new Date(ea).toLocaleTimeString(),
            status: "generating",
            progress: 5,
            modelName: g9n(Oe) || Oe,
            jimengStatus: {
              message: "正在准备素材与生成任务"
            },
            sourceNodeId: N.id,
            startTime: ea,
            timestamp: ea,
            apiConfig: {
              modelId: Oe,
              baseUrl: IT,
              apiKey: "jimeng-cli"
            }
          };
        y(Br => [pa, ...Br]), Ymn(jr, N.id, _, E);
        try {
          const Br = wao({
            node: N,
            modelId: Oe,
            connectedUrls: u(N.id),
            metadata: QNe(N.id, h),
            prompt: it,
            frames: Ut && ((xt = N.settings) != null && xt.veoFramesMode) ? {
              first: p(N.id, "veo_start"),
              last: p(N.id, "veo_end")
            } : void 0
          });
          y(Jr => Jr.map(Kr => Kr.id === jr ? {
            ...Kr,
            prompt: Br.prompt
          } : Kr));
          const tn = Jr => {
              var ir, Hr;
              gr = Jr;
              const Kr = ((Hr = (ir = k.current) == null ? void 0 : ir.find(ha => ha.id === N.id)) == null ? void 0 : Hr.settings) || N.settings;
              H(N.id, {
                settings: {
                  ...Kr,
                  jimengSubmitId: Jr,
                  jimengKind: Ut ? "video" : "image",
                  progressMessage: "已提交云端，正在查询任务"
                }
              }), y(ha => ha.map(Ga => Ga.id === jr ? {
                ...Ga,
                remoteTaskId: Jr,
                jimengStatus: {
                  message: "已提交云端，正在查询任务"
                }
              } : Ga));
            },
            Lr = Jr => {
              var Kr, ir;
              y(Hr => Hr.map(ha => ha.id === jr ? {
                ...ha,
                jimengStatus: {
                  message: Jr,
                  checkedAt: Date.now()
                }
              } : ha)), H(N.id, {
                settings: {
                  ...(((ir = (Kr = k.current) == null ? void 0 : Kr.find(Hr => Hr.id === N.id)) == null ? void 0 : ir.settings) || N.settings),
                  progressMessage: Jr
                }
              });
            },
            br = Zae(Oe) ? await Tmn({
              node: N,
              modelId: Oe,
              prompt: Br.prompt,
              referenceImages: Br.images.map(Jr => Jr.url),
              referenceAssetIds: Br.referenceAssetIds,
              onSubmitted: tn,
              onProgress: Lr
            }) : await Sao({
              node: N,
              modelId: Oe,
              prompt: Br.prompt,
              referenceImages: Br.images,
              videoUrls: Br.videos,
              audioUrls: Br.audios,
              referenceAssetIds: Br.referenceAssetIds,
              onSubmitted: tn,
              duration: ((yn = N.settings) == null ? void 0 : yn.duration) || "5s",
              aspectRatio: ((gn = N.settings) == null ? void 0 : gn.ratio) || "16:9",
              resolution: ((mt = N.settings) == null ? void 0 : mt.resolution) || "720P",
              onProgress: Lr
            });
          if (!br.length) throw new Error("即梦 CLI 未返回结果 URL");
          if (Ut) {
            const Jr = br[0],
              {
                tryResolveGenResultForGlobalOss: Kr,
                buildHistoryItemPatchFromGlobalOss: ir,
                pickGenVideoPlaybackUrl: Hr
              } = await Ie(async () => {
                const {
                  tryResolveGenResultForGlobalOss: kr,
                  buildHistoryItemPatchFromGlobalOss: Mr,
                  pickGenVideoPlaybackUrl: Hn
                } = await Promise.resolve().then(() => ii);
                return {
                  tryResolveGenResultForGlobalOss: kr,
                  buildHistoryItemPatchFromGlobalOss: Mr,
                  pickGenVideoPlaybackUrl: Hn
                };
              }, void 0, import.meta.url),
              ha = await Kr([Jr], jr, !0);
            ha || (await Xu(Jr, jr, `jimeng_cli_${jr}.mp4`), gUt(jr, y), oy({
              url: Jr,
              type: "video"
            }, jr));
            let Ga = null;
            if (!ha) try {
              Ga = await ni.getAssetUrl(jr);
            } catch {}
            const Za = Hr(ha, Jr, Ga),
              {
                pickOssVideoImagePosterUrl: va
              } = await Ie(async () => {
                const {
                  pickOssVideoImagePosterUrl: kr
                } = await Promise.resolve().then(() => ii);
                return {
                  pickOssVideoImagePosterUrl: kr
                };
              }, void 0, import.meta.url),
              Kt = ha ? va((Xt = ha.displayUrls) == null ? void 0 : Xt[0]) : "",
              Pr = Kt || (ha ? "" : Za);
            y(kr => kr.map(Mr => Mr.id === jr ? {
              ...Mr,
              status: "completed",
              progress: 100,
              durationMs: Mr.startTime ? Date.now() - Mr.startTime : void 0,
              _assetId: ha ? void 0 : jr,
              ...(ha ? ir(ha, {
                type: "video"
              }) : {
                url: Za
              })
            } : Mr)), H(N.id, {
              isGenerating: !1,
              content: Pr,
              ...(Kt ? {
                videoPosterUrl: Kt
              } : {}),
              settings: {
                ...N.settings,
                isGenerating: !1,
                progress: 100,
                error: null,
                jimengPending: !1,
                jimengSubmitId: gr,
                ...((ha == null ? void 0 : ha.ossSettings) || {}),
                ...(Za && ha ? {
                  _ossRemoteUrl: Za,
                  generatedImages: [{
                    id: jr,
                    thumbUrl: Kt || "",
                    fullUrl: Za,
                    createdAt: Date.now()
                  }]
                } : {}),
                ...(Kt ? {
                  videoPosterUrl: Kt
                } : {})
              },
              _contentAssetId: ha ? void 0 : jr
            }), await jSt({
              node: N,
              taskId: jr,
              content: Pr || Za,
              previewType: "video",
              connections: i,
              nodes: o,
              nodesRef: k,
              updateNode: H,
              extra: {
                sourceNodeName: N.nodeName,
                previewSourceModel: Oe,
                ...(Za ? {
                  previewOssRemoteUrl: Za
                } : {})
              }
            });
          } else {
            const {
                resolveGenImageCompletion: Jr,
                buildHistoryItemPatchFromGlobalOss: Kr
              } = await Ie(async () => {
                const {
                  resolveGenImageCompletion: $t,
                  buildHistoryItemPatchFromGlobalOss: je
                } = await Promise.resolve().then(() => ii);
                return {
                  resolveGenImageCompletion: $t,
                  buildHistoryItemPatchFromGlobalOss: je
                };
              }, void 0, import.meta.url),
              ir = await Jr(br, jr, {
                nodeId: N.id,
                model: Oe
              }),
              Hr = ir.primaryDisplayUrl,
              ha = ir.displayUrls,
              Ga = ir.remoteUrls,
              Za = br.map(($t, je) => je === 0 ? jr : `${jr}_${je}`),
              va = br.map($t => VY($t));
            ir.usedOss || (await Promise.all(br.map(async ($t, je) => {
              try {
                await Xu(VY($t), Za[je]);
              } catch (Qe) {
                console.warn(`[Jimeng] 下载第 ${je + 1} 张失败:`, Qe);
              }
            })));
            let Kt;
            if (ir.usedOss && ((rr = (Gn = ir.ossPack) == null ? void 0 : Gn.displayUrls) != null && rr.length)) Kt = ir.ossPack.displayUrls.map(($t, je) => String($t || "").trim() || String(ir.ossPack.remoteUrls[je] || "").trim() || va[je] || "");else {
              const {
                assetStore: $t
              } = await Ie(async () => {
                const {
                  assetStore: je
                } = await Promise.resolve().then(() => Ri);
                return {
                  assetStore: je
                };
              }, void 0, import.meta.url);
              await $t.init();
              try {
                const {
                  ensureLocalPreviewDisplayUrl: je
                } = await Ie(async () => {
                  const {
                    ensureLocalPreviewDisplayUrl: Qe
                  } = await Promise.resolve().then(() => Ui);
                  return {
                    ensureLocalPreviewDisplayUrl: Qe
                  };
                }, void 0, import.meta.url);
                await Promise.all(Za.map(async Qe => {
                  await je(Qe, {
                    maxDim: wm,
                    allowVideoOriginal: !0
                  });
                }));
              } catch (je) {
                console.warn("[Jimeng] 历史缩略图写入失败:", je);
              }
              Kt = await Promise.all(Za.map(async (je, Qe) => {
                try {
                  const Mt = await $t.getAssetUrl(je);
                  if (Mt) return Mt;
                } catch {}
                return va[Qe] || "";
              }));
            }
            const Pr = Kt.filter($t => String($t || "").trim()).length > 1,
              kr = Kt.find($t => String($t || "").trim()) || Hr,
              Mr = ir.usedOss && ((Dn = (qn = ir.ossPack) == null ? void 0 : qn.remoteUrls) != null && Dn.length) ? ir.ossPack.remoteUrls.map(($t, je) => String($t || "").trim() || String(ir.ossPack.displayUrls[je] || "").trim() || Kt[je] || "") : Kt;
            y($t => $t.map(je => je.id === jr ? {
              ...je,
              status: "completed",
              progress: 100,
              selectedMjImageIndex: 0,
              durationMs: je.startTime ? Date.now() - je.startTime : void 0,
              ...(ir.usedOss && ir.ossPack ? Kr(ir.ossPack, {
                type: "image",
                url: kr,
                thumbnailUrl: kr,
                mjThumbnails: Pr ? Kt : void 0,
                mjImages: Pr ? Mr : void 0,
                ...(Pr ? {
                  _mjAssetIds: Za
                } : {})
              }) : {
                url: kr,
                thumbnailUrl: kr,
                mjImages: Pr ? Kt : void 0,
                selectedMjImageIndex: 0,
                _assetId: jr,
                _globalOssUrlOnly: !1,
                ossUploaded: !1,
                ...(Pr ? {
                  _mjAssetIds: Za
                } : {})
              })
            } : je)), M$e(jr, kr, y), czt(N) && br.length > 1 || (H(N.id, {
              isGenerating: !1,
              content: Hr,
              _contentAssetId: ir.usedOss ? void 0 : ir.contentAssetId,
              settings: {
                ...N.settings,
                isGenerating: !1,
                progress: 100,
                error: null,
                jimengPending: !1,
                jimengSubmitId: gr,
                generatedImages: ir.generatedImages,
                ...(ir.usedOss && ir.ossPack ? ir.ossPack.ossSettings : {}),
                ...(ha.length > 1 ? {
                  mjImages: Kt,
                  previewMjImages: Kt,
                  selectedMjImageIndex: 0,
                  _mjAssetIds: Za
                } : {})
              }
            }), await jSt({
              node: N,
              taskId: jr,
              content: Hr,
              previewType: "image",
              connections: i,
              nodes: o,
              nodesRef: k,
              updateNode: H,
              extra: ha.length > 1 ? {
                previewMjImages: Kt,
                selectedPreviewImage: Kt[0] || Hr,
                sourceNodeName: N.nodeName,
                previewSourceModel: Oe,
                contentAssetId: ir.contentAssetId,
                previewMjAssetIds: Za
              } : {
                sourceNodeName: N.nodeName,
                previewSourceModel: Oe,
                contentAssetId: ir.contentAssetId
              }
            }));
          }
        } catch (Br) {
          const tn = Br instanceof Error ? Br.message : String(Br),
            Lr = Br instanceof Qz;
          y(br => br.map(Jr => Jr.id === jr ? {
            ...Jr,
            status: Lr ? "generating" : "failed",
            progress: Lr ? Jr.progress : 0,
            errorMsg: Lr ? void 0 : tn,
            jimengStatus: {
              message: tn,
              checkedAt: Date.now()
            },
            ...(Br instanceof Qz ? {
              remoteTaskId: Br.submitId
            } : {})
          } : Jr)), H(N.id, {
            isGenerating: Lr,
            errorMsg: tn,
            settings: {
              ...N.settings,
              isGenerating: Lr,
              progress: Lr ? (Ar = N.settings) == null ? void 0 : Ar.progress : 0,
              error: Lr ? null : tn,
              ...(Lr && Br instanceof Qz ? {
                jimengPending: !0,
                jimengSubmitId: Br.submitId,
                jimengQueueInfo: Br.queueInfo,
                progressMessage: tn
              } : {
                jimengPending: !1
              })
            }
          }), Lr || alert(x(tn));
        }
        return;
      }
      if (!gt && ((_r = Ze == null ? void 0 : Ze.customProtocol) == null ? void 0 : _r.auth) !== "none") {
        alert(x("请先配置API Key")), el(H, N.id, !1), H(N.id, {
          isGenerating: !1,
          errorMsg: "请先配置 API Key"
        });
        return;
      }
      let _t,
        At = "",
        Yt = null;
      try {
        const gr = ((Pa = N.settings) == null ? void 0 : Pa.ratio) || "Auto";
        let jr = ((fa = N.settings) == null ? void 0 : fa.resolution) || "Auto";
        uX(Oe) && jr !== "Auto" && jr !== "HD" && (jr = "Auto"), FS(Oe) && (await ace());
        let ea = (Qa.getResolvedModelBaseUrl((Ze == null ? void 0 : Ze.id) || Oe) || (Ze == null ? void 0 : Ze.url) || "https://ai.comfly.chat").replace(/\/+$/, "").trim();
        (!ea || !/^https?:\/\//i.test(ea)) && (ea = "https://ai.comfly.chat"), _t = ((Ca = N.settings) == null ? void 0 : Ca.harnessImageHistoryId) || m();
        const pa = _t;
        $_t(_t, K);
        let Br = $nn(N, u);
        const tn = Br.length > 0,
          Lr = !!(($n = N.settings) != null && $n.genUseAliyunOss),
          br = !(Ze != null && Ze.localComfy) && !!((yr = N.settings) != null && yr.ossImageBase64),
          Jr = QNe(N.id, h),
          Kr = tn ? [...Br] : [];
        if (N.type === "gen-image" && Oe.includes("qwen-image-edit") && !tn) {
          alert(x("Qwen Image Edit（qwen-image-edit）为图生图接口，请先连接参考图片。")), H(N.id, {
            isGenerating: !1,
            errorMsg: "需要参考图片"
          });
          return;
        }
        const {
          isGlobalOssUploadEnabled: ir
        } = await Ie(async () => {
          const {
            isGlobalOssUploadEnabled: kn
          } = await Promise.resolve().then(() => Ah);
          return {
            isGlobalOssUploadEnabled: kn
          };
        }, void 0, import.meta.url);
        if (console.log("[Generation] 获取参考图片:", {
          refImagesCount: Br.length,
          refImages: Br.map(kn => kn.substring(0, 50)),
          genUseAliyunOss: Lr,
          globalOssUpload: ir()
        }), tn) try {
          Br = await BF(Br);
          const kn = !(Ze != null && Ze.localComfy) && (Lr || ir()),
            xn = (Ir = N.settings) == null ? void 0 : Ir.seedanceMaterials,
            Fn = (Ip(Oe) || Ih(Oe)) && ((xn == null ? void 0 : xn.length) ?? 0) > 0;
          if (kn && !Fn || br) {
            const {
                resolveRefImagesFromUpstreamOss: cr
              } = await Ie(async () => {
                const {
                  resolveRefImagesFromUpstreamOss: Jt
                } = await Promise.resolve().then(() => LM);
                return {
                  resolveRefImagesFromUpstreamOss: Jt
                };
              }, void 0, import.meta.url),
              vr = S.current ?? i,
              Wt = kn && !Fn;
            Wt && (Br = cr(Br, N.id, o, vr)), Br = await uie(Br, {
              useOss: Wt,
              imageAsBase64: br,
              metaByRawUrl: Jr,
              metaByIndex: Kr.map(Jt => Jr.get(Jt) || {
                type: "image",
                assetId: void 0
              }),
              nodes: o,
              targetNodeId: N.id,
              connections: vr
            }), console.log("[Generation] 参考图 OSS 解析结果:", {
              refImages: Br.map(Jt => `${String(Jt).slice(0, 96)}…`)
            });
          }
        } catch (kn) {
          console.error("[Generation] ❌ Failed to resolve reference images:", kn);
          const xn = kn instanceof Error ? kn.message : "参考图处理失败";
          alert(x(xn)), H(N.id, {
            isGenerating: !1,
            errorMsg: xn
          });
          return;
        }
        const Hr = `${Oe} ${(Ze == null ? void 0 : Ze.id) || ""} ${(Ze == null ? void 0 : Ze.modelName) || ""} ${(Ze == null ? void 0 : Ze.provider) || ""}`.toLowerCase();
        if (N.type === "gen-image" && ze && !!ve && /gemini|banana/.test(Hr) && ve) try {
          const kn = ve.sourceImageRef || Kr[0] || Br[0];
          let xn = kn ? await Vm(kn, null, null) : null;
          if (!xn && kn) {
            const [Fn] = await BF([kn]),
              cr = await fetch(Fn || kn);
            if (!cr.ok) throw new Error(`读取移动对象源图失败: HTTP ${cr.status}`);
            xn = await cr.blob();
          }
          if (xn) {
            const Fn = await aao(xn, ve);
            Br = [...Br, Fn], it = `${it}

【精确移动定位图】最后一张参考图是系统生成的布局预览，与原始编辑图使用完全相同的宽高比和 0-1 坐标系。图中主体已经摆到最终位置，源位置应视为已清空并补上周围背景。请只对齐主体的落点、尺度和接触关系：预览里主体有多大，成图就必须有多大，禁止保持原图原尺寸。并按新背景重绘主体边缘的光影与色彩，不能把预览里的矩形色块、硬边或旧背景一起贴进成图。输出必须是干净的成品照片或插画，严禁辅助线、色框、黄框、橙框、蓝框、虚线、斜线、标签文字、UI 叠加，以及竖直接缝/切割感。原始参考图仍是背景、风格和细节来源。移动后画面中只保留一个主体。`, console.log("[Generation] ✅ 已追加移动对象定位图（Gemini/Nano Banana 精确锚定）", {
              referenceIndex: Br.length,
              sourceRect01: ve.sourceRect01,
              targetRect01: ve.targetRect01
            });
          } else console.warn("[Generation] 移动对象定位图跳过：无法读取源图片");
        } catch (kn) {
          console.warn("[Generation] 移动对象定位图生成失败，已回退原有蒙版路径:", kn);
        }
        if (Yc(Oe) && C5(N.settings || {})) {
          const kn = String(it || "").trim();
          if (!kn) {
            const Fn = "导演模式需要提示词";
            alert(x(Fn)), el(H, N.id, !1), H(N.id, {
              isGenerating: !1,
              errorMsg: Fn
            });
            return;
          }
          const xn = C$e(N.id);
          if (xn && (xn.status === "live" || xn.status === "connecting")) {
            xn.sendPrompt(kn), H(N.id, {
              isGenerating: !0,
              settings: {
                ...(N.settings || {}),
                isGenerating: !0,
                error: null
              }
            });
            return;
          }
          try {
            let Fn;
            const cr = Br[0];
            cr && (Fn = (await gRe([cr], {
              mode: "t2v"
            }))[0]), await Zio({
              nodeId: N.id,
              apiKey: gt,
              baseUrl: ea,
              configure: $io({
                prompt: kn,
                promptVersion: 1,
                resolution: String(((Gr = N.settings) == null ? void 0 : Gr.resolution) || "768P"),
                ratio: gr,
                imageUrl: Fn
              }),
              onUpdate: () => {
                const vr = C$e(N.id);
                if (!vr) {
                  H(N.id, {
                    isGenerating: !1,
                    settings: {
                      ...(N.settings || {}),
                      isGenerating: !1
                    }
                  });
                  return;
                }
                if (vr.status === "error") {
                  el(H, N.id, !1), H(N.id, {
                    isGenerating: !1,
                    errorMsg: vr.errorMsg,
                    settings: {
                      ...(N.settings || {}),
                      isGenerating: !1,
                      error: vr.errorMsg
                    }
                  });
                  return;
                }
                vr.status === "idle" && (el(H, N.id, !1), H(N.id, {
                  isGenerating: !1,
                  settings: {
                    ...(N.settings || {}),
                    isGenerating: !1
                  }
                }));
              }
            });
          } catch (Fn) {
            const cr = Fn instanceof Error ? Fn.message : "导演会话启动失败";
            alert(x(cr)), el(H, N.id, !1), H(N.id, {
              isGenerating: !1,
              errorMsg: cr
            }), await c0r(N.id);
          }
          return;
        }
        const Ga = Date.now(),
          Za = {
            id: _t,
            url: "",
            type: pt ? "video" : "image",
            prompt: it || (tn ? `Img2${pt ? "Vid" : "Img"}` : "Untitled"),
            time: new Date(Ga).toLocaleTimeString(),
            status: "generating",
            progress: 5,
            modelName: (Ze == null ? void 0 : Ze.provider) || Oe,
            klingTaskType: N.type === "motion-control" ? "motion-control" : void 0,
            mjMode: U5(Oe) ? ((Zr = N.settings) == null ? void 0 : Zr.mjMode) || "fast" : void 0,
            sourceNodeId: N.id,
            targetPreviewId: (La = N.settings) == null ? void 0 : La._autoCreatedPreviewId,
            startTime: Ga,
            timestamp: Ga,
            apiConfig: {
              modelId: Oe,
              baseUrl: ea,
              apiKey: gt,
              customProtocol: Ze == null ? void 0 : Ze.customProtocol,
              localComfy: Ze == null ? void 0 : Ze.localComfy
            },
            ...(yRe(Oe) ? {
              falModelPath: String(((sa = N.settings) == null ? void 0 : sa.falImageModelPath) || "") || void 0
            } : {})
          };
        await Id(), y(kn => [Za, ...kn]), !(Ze != null && Ze.localComfy) && !KM(Oe) && Ymn(_t, N.id, _, E), Ze != null && Ze.localComfy || noo(_t, N.id, y, H), await Id();
        const va = Number(((Ea = N.settings) == null ? void 0 : Ea.batchSize) || 1),
          Kt = Number.isFinite(va) ? Math.max(1, Math.min(9, Math.trunc(va))) : 1,
          Pr = Ht || mm(Oe) && ![1, 4, 9].includes(Kt) ? 1 : Kt;
        if (!pt && !Ht && Pr > 1 && !kh(Oe) && !Dg(Oe) && !Og(Oe) && !Lg(Oe) && !Rm(Oe) && !_v(Oe) && !Hh(Oe) && !Uu(Oe) && !nh(Oe) && !mp(Oe) && !su(Oe) && !Nm(Oe) && !jm(Oe) && !MU(Oe)) {
          const kn = new Array(Pr).fill(""),
            xn = new Array(Pr).fill(""),
            Fn = Array.from({
              length: Pr
            }, (wa, xa) => xa === 0 ? _t ?? `batch-${Date.now()}-0` : m() ?? `batch-${Date.now()}-${xa}`),
            cr = new Set();
          Fn.forEach((wa, xa) => {
            let Aa = wa;
            if (cr.has(Aa) && (Aa = m() ?? `batch-${Date.now()}-${xa}`, Fn[xa] = Aa), cr.add(Aa), xa === 0) return;
            const pn = Date.now(),
              xr = {
                id: Aa,
                url: "",
                type: "image",
                prompt: `${it || "Untitled"} (${xa + 1}/${Pr})`,
                time: new Date(pn).toLocaleTimeString(),
                status: "generating",
                progress: 0,
                modelName: (Ze == null ? void 0 : Ze.provider) || Oe || "unknown",
                sourceNodeId: N.id,
                startTime: pn,
                timestamp: pn,
                apiConfig: {
                  modelId: Oe,
                  baseUrl: ea,
                  apiKey: gt,
                  customProtocol: Ze == null ? void 0 : Ze.customProtocol,
                  localComfy: Ze == null ? void 0 : Ze.localComfy
                }
              };
            y(Nr => Nr.some(Oa => Oa.id === Aa) ? (console.warn(`[Generation] History item with ID ${Aa} already exists, skipping`), Nr) : [xr, ...Nr]);
          });
          for (const wa of Fn) $_t(wa, K);
          const vr = await Jfe({
            node: N,
            currentModel: Oe,
            config: Ze,
            baseUrl: ea,
            prompt: it,
            ratio: gr,
            resolution: jr,
            refImages: Br,
            hasReferenceImage: tn,
            isVideoGeneration: pt,
            isMidjourney: vt,
            isNanoBanana2: nn,
            taskId: _t,
            apiKey: gt,
            getConnectedImageForInput: p,
            refMetaByRawUrl: Jr,
            setHistory: y,
            setHistoryProgressDeferred: _,
            updateNode: H,
            angleMetadata: be,
            storyboardJsonData: X,
            nodes: o,
            connections: i,
            markerMasks: ge
          });
          if (!vr) return;
          const {
              endpoint: Wt,
              payload: Jt,
              useMultipart: Nn
            } = vr,
            En = Ze != null && Ze.customProtocol ? une(Ze.customProtocol, gt, Nn) : Nn ? {
              Authorization: `Bearer ${gt}`
            } : {
              "Content-Type": "application/json",
              Authorization: `Bearer ${gt}`
            };
          ag(Oe) && !oce(Wt) && (En.debug_accept_unset_ratio_model = "true");
          const Sr = Oe.includes("z-image") ? 4e3 : 50,
            Bn = oIe(Oe);
          console.log(`[Batch] 批量生成模型: ${Oe}, 模式: ${Bn ? "Seedream API 串行" : "交错并发"}, 间隔: ${Sr}ms`);
          const Et = async (wa, xa) => {
            try {
              let Aa;
              if (Nn && Jt instanceof FormData) {
                Aa = new FormData();
                for (const [Nr, qr] of Jt.entries()) Nr === "n" && !(Ze != null && Ze.customProtocol) ? Aa.append("n", "1") : Aa.append(Nr, qr);
              } else Aa = {
                ...Jt,
                ...(Ze != null && Ze.customProtocol ? {} : {
                  n: 1
                })
              };
              Efe(Wt);
              const pn = Ze != null && Ze.localComfy ? await AH(Ze, Aa, {
                taskId: wa,
                nodeId: N.id,
                onProgress: Nr => {
                  _(wa, Nr), E(wa, N.id, Nr);
                }
              }) : await xTt($i(Wt, {
                method: "POST",
                headers: En,
                body: Nn ? Aa : await Pg(Aa)
              }), 12e4, `批量请求 ${xa + 1}/${Fn.length}`);
              if (!pn.ok) throw new Error(`请求${xa + 1}失败: ${pn.status}`);
              const xr = await pn.json();
              return {
                taskId: wa,
                result: xr,
                error: null,
                index: xa
              };
            } catch (Aa) {
              return console.error(`[Generation] 批量请求 ${xa + 1} 失败:`, Aa), {
                taskId: wa,
                result: null,
                error: Aa,
                index: xa
              };
            }
          };
          let zn;
          if (Bn) {
            zn = [];
            for (let xa = 0; xa < Fn.length; xa++) xa > 0 && (console.log(`[Batch] Seedream API 串行：等待 3500ms 后发起第 ${xa + 1}/${Fn.length} 张`), await new Promise(Aa => setTimeout(Aa, 3500))), zn.push(await Et(Fn[xa], xa));
          } else {
            const xa = Fn.length;
            zn = new Array(xa);
            let Aa = 0;
            const pn = Array.from({
              length: Math.min(3, xa)
            }, async () => {
              for (; Aa < xa;) {
                const xr = Aa;
                if (Aa += 1, xr > 0) {
                  const Nr = xr * Sr;
                  console.log(`[Batch] 请求 ${xr + 1} 延迟 ${Nr}ms`), await new Promise(qr => setTimeout(qr, Nr));
                }
                zn[xr] = await Et(Fn[xr], xr);
              }
            });
            await Promise.all(pn);
          }
          const or = (() => {
            var Nr;
            const wa = S.current ?? i,
              xa = k.current ?? o,
              Aa = A.current ?? s,
              pn = Aa.get(N.id) || xa.find(qr => qr.id === N.id) || N,
              xr = d0r(pn, wa, xa, Aa);
            if (xr) {
              const qr = yC(N.id, wa, xa).length;
              console.log("[Batch] 节点", N.id, "使用预览窗口:", xr, "(selectedPreviewId:", (Nr = pn.settings) == null ? void 0 : Nr.selectedPreviewId, ", 共", qr, "个预览)");
            }
            return xr;
          })();
          let mr = 0,
            Yr = 0;
          for (const {
            taskId: wa,
            result: xa,
            error: Aa,
            index: pn
          } of zn) {
            if (Aa || !xa) {
              Yr++, y(xr => xr.map(Nr => Nr.id === wa ? {
                ...Nr,
                status: "failed",
                progress: 0
              } : Nr)), console.error(`[Generation] ❌ 批量任务 ${pn + 1} 失败:`, Aa);
              continue;
            }
            pn > 0 && (await new Promise(xr => setTimeout(xr, 150)));
            try {
              await Dte({
                customProtocol: Ze == null ? void 0 : Ze.customProtocol,
                result: xa,
                taskId: wa,
                node: N,
                baseUrl: ea,
                apiKey: gt,
                currentModel: Oe,
                isMidjourney: vt,
                isVideoGeneration: pt,
                connections: i,
                nodes: o,
                nodesRef: k,
                updateNode: H,
                setHistory: y,
                setHistoryProgressDeferred: _,
                updateGenerationProgress: E,
                connectedPreviewId: or,
                batchAccumulator: kn,
                batchRemoteAccumulator: xn,
                batchIndex: pn,
                batchTaskIds: Fn,
                creationEndpoint: Wt,
                setNodes: Y,
                generateId: m
              }), mr++;
            } catch (xr) {
              Yr++, console.error(`[Generation] ❌ 批量任务 ${pn + 1} 处理失败:`, xr), y(Nr => Nr.map(qr => qr.id === wa ? {
                ...qr,
                status: "failed",
                progress: 0
              } : qr));
            }
          }
          await (async () => {
            const Aa = Date.now();
            for (; Date.now() - Aa < 3e5;) {
              const pn = await new Promise(Oa => {
                  y(Fa => (Oa(Fa), Fa));
                }),
                xr = Fn.every(Oa => {
                  const Fa = pn.find(Ra => Ra.id === Oa);
                  return Fa && (Fa.status === "completed" || Fa.status === "failed");
                }),
                Nr = kn.filter(Oa => Oa && Oa.length > 0).length,
                qr = Fn.filter(Oa => {
                  const Fa = pn.find(Ra => Ra.id === Oa);
                  return (Fa == null ? void 0 : Fa.status) === "completed";
                }).length;
              if (xr && (Nr >= qr || qr === 0)) break;
              await new Promise(Oa => setTimeout(Oa, 1e3));
            }
          })(), await doo({
            batchAccumulator: kn,
            batchRemoteAccumulator: xn,
            batchTaskIds: Fn,
            setHistory: y
          }), await uoo({
            node: N,
            batchSize: Pr,
            batchAccumulator: kn,
            batchRemoteAccumulator: xn,
            batchTaskIds: Fn,
            primaryTaskId: _t,
            currentModel: Oe,
            connections: i,
            nodes: o,
            nodesRef: k,
            connectionsRef: S,
            updateNode: H,
            setNodes: Y,
            generateId: m,
            nodesMap: A.current ?? s
          });
          return;
        }
        let Mr = "",
          Hn,
          $t = !1;
        await Id();
        const je = await Jfe({
          node: N,
          currentModel: Oe,
          config: Ze,
          baseUrl: ea,
          prompt: it,
          ratio: gr,
          resolution: jr,
          refImages: Br,
          hasReferenceImage: tn,
          isVideoGeneration: pt,
          isMidjourney: vt,
          isNanoBanana2: nn,
          taskId: _t,
          apiKey: gt,
          getConnectedImageForInput: p,
          refMetaByRawUrl: Jr,
          setHistory: y,
          setHistoryProgressDeferred: _,
          updateNode: H,
          angleMetadata: be,
          nodes: o,
          connections: i,
          markerMasks: ge
        });
        if (!je) return;
        Mr = je.endpoint, At = je.endpoint, Hn = je.payload, $t = je.useMultipart;
        const Qe = _b(Oe) ? "Token" : "Bearer",
          Mt = Ze != null && Ze.customProtocol ? une(Ze.customProtocol, gt, $t) : $t ? {
            Authorization: `${Qe} ${gt}`
          } : {
            "Content-Type": "application/json",
            Authorization: `${Qe} ${gt}`
          };
        if (KM(Oe) && String(ea || "").includes("generativelanguage.googleapis.com") && (Mt["Content-Type"] = "application/json", Mt["x-goog-api-key"] = gt, delete Mt.Authorization, console.log("[Gemini Image] 使用 x-goog-api-key 请求头（官方域名）")), Dv(Oe) && String(ea || "").includes("generativelanguage.googleapis.com") && (Mt["Content-Type"] = "application/json", Mt["x-goog-api-key"] = gt, delete Mt.Authorization, console.log("[Gemini Veo] 使用 x-goog-api-key 请求头（官方域名）")), gX(Oe) && (Mt["X-DashScope-Async"] = "enable", console.log("[Wan 2.6 Official] 添加异步请求头: X-DashScope-Async=enable")), ag(Oe) && !oce(Mr) && (Mt.debug_accept_unset_ratio_model = "true"), yX(Oe)) {
          const kn = ((ba = N.settings) == null ? void 0 : ba.enableInterleave) ?? !1,
            xn = kn && (((ga = N.settings) == null ? void 0 : ga.useStream) ?? !1),
            Fn = ((_a = N.settings) == null ? void 0 : _a.useAsyncMode) ?? !0;
          kn && xn ? (Mt["X-DashScope-Sse"] = "enable", console.log("[Wan 2.6 Image Official] 添加流式请求头: X-DashScope-Sse=enable")) : (Fn || !kn) && (Mt["X-DashScope-Async"] = "enable", console.log("[Wan 2.6 Image Official] 添加异步请求头: X-DashScope-Async=enable"));
        }
        const cn = Hn,
          Qn = typeof (cn == null ? void 0 : cn.model) == "string" && cn.model.trim() ? cn.model.trim() : cn != null && cn.model && typeof cn.model == "object" && typeof cn.model.model == "string" && cn.model.model.trim() ? cn.model.model.trim() : typeof (cn == null ? void 0 : cn.model_name) == "string" && cn.model_name.trim() ? cn.model_name.trim() : "",
          Lt = qg(Oe) ? String(Qn || Hqe(Ze == null ? void 0 : Ze.modelName, Ze == null ? void 0 : Ze.id)) : String(Qn || (Ze == null ? void 0 : Ze.modelName) || Oe);
        if (console.log("[Generation] Sending request:", {
          endpoint: Mr,
          useMultipart: $t,
          payload: VF(Hn),
          model: Lt
        }), Ex(Oe)) {
          console.log("[Veo] 📤 发送请求详情:", {
            endpoint: Mr,
            model: Oe,
            payload: VF(Hn),
            payloadModel: Hn.model,
            hasImages: !!Hn.images,
            imagesCount: (($a = Hn.images) == null ? void 0 : $a.length) || 0,
            imagesPreview: (Ya = Hn.images) == null ? void 0 : Ya.map((xn, Fn) => ({
              index: Fn,
              type: xn.startsWith("data:") ? "base64" : xn.startsWith("http") ? "http" : "unknown",
              length: xn.length,
              mimeType: xn.startsWith("data:") ? xn.substring(5, xn.indexOf(";")) : "N/A"
            }))
          });
          const kn = {
            ...Hn
          };
          kn.images && (kn.images = `[${kn.images.length} images, ${kn.images.map(xn => xn.length).join(", ")} bytes]`), console.log("[Veo] 📤 完整 Payload（不含图片）:", JSON.stringify(kn, null, 2));
        }
        if (zv(Oe)) {
          console.log("[Kling Omni] ========== 发送请求前最终检查 =========="), console.log("[Kling O1] Endpoint:", Mr);
          const kn = VF(Hn);
          console.log("[Kling O1] Payload 对象:", kn), console.log("[Kling O1] Payload JSON:", JSON.stringify(kn, null, 2)), console.log("[Kling O1] 字段检查:"), console.log("  - model_name:", Hn.model_name, "(类型:", typeof Hn.model_name, ")"), console.log("  - model:", Hn.model, "(应该是 undefined)"), console.log("  - duration:", Hn.duration, "(类型:", typeof Hn.duration, ")"), console.log("  - mode:", Hn.mode), console.log("  - aspect_ratio:", Hn.aspect_ratio), console.log("  - element_list:", Hn.element_list), console.log("[Kling O1] ==========================================");
        }
        if (KM(Oe) && _t) {
          const kn = _t,
            xn = [10, 25, 40, 55, 70, 85];
          let Fn = 0;
          const cr = Date.now();
          Yt = FLt.subscribe(1800, vr => {
            const Wt = Math.min(xn.length - 1, Math.max(0, Math.floor((vr - cr) / 1800) - 1));
            if (Wt < Fn) return;
            Fn = Wt + 1;
            const Jt = xn[Wt];
            _(kn, Jt), E(kn, N.id, Jt);
          });
        }
        Efe(Mr);
        let ct,
          Dt = null;
        if (!$t) try {
          Dt = await Pg(Hn);
        } catch {
          Dt = null;
        }
        const bn = Dt != null ? `json:${Dt.length}:${NRa(Dt)}` : `multipart:${jRa(Hn)}`,
          Rt = `${N.id}::POST::${Mr}::${bn}`,
          fn = M.current.get(Rt),
          Zt = kn => new Response(kn.text, {
            status: kn.status,
            statusText: kn.statusText,
            headers: kn.headers
          });
        if (fn) console.warn("[Generation] 创建请求已在进行中，复用 Promise，避免重复 POST:", Rt), ct = Zt(await fn);else {
          const kn = (async () => {
            let xn;
            const Fn = $t ? Hn : Dt ?? (await Pg(Hn));
            try {
              xn = Ze != null && Ze.localComfy ? await AH(Ze, Hn, {
                taskId: pa,
                nodeId: N.id,
                onProgress: vr => {
                  _(pa, vr), E(pa, N.id, vr);
                }
              }) : await $i(Mr, {
                method: "POST",
                headers: Mt,
                body: $t ? g6e(Fn) : Fn
              });
            } catch (vr) {
              if (Ze != null && Ze.localComfy) throw vr;
              console.warn("[Generation] fetchWithTauriProxy throw error, retry once:", vr), await new Promise(Wt => setTimeout(Wt, 900)), xn = await $i(Mr, {
                method: "POST",
                headers: Mt,
                body: $t ? g6e(Fn) : Fn
              });
            }
            const cr = await xn.text();
            return {
              ok: xn.ok,
              status: xn.status,
              statusText: xn.statusText,
              headers: xn.headers,
              text: cr
            };
          })();
          M.current.set(Rt, kn);
          try {
            ct = Zt(await kn);
          } finally {
            M.current.delete(Rt);
          }
        }
        if (pt) {
          if (!$t && Hn && typeof Hn == "object") {
            const kn = Hn.content;
            if (Array.isArray(kn)) for (const xn of kn) {
              const Fn = xn,
                cr = (ta = Fn == null ? void 0 : Fn.image_url) == null ? void 0 : ta.url;
              (Fn == null ? void 0 : Fn.type) === "image_url" && typeof cr == "string" && cr.startsWith("data:") && cr.length > 512 && (Fn.image_url = {
                url: "data:image/jpeg;base64,"
              });
            }
          }
          Ie(async () => {
            const {
              clearLocalGenApiBlobCache: kn
            } = await Promise.resolve().then(() => Mc);
            return {
              clearLocalGenApiBlobCache: kn
            };
          }, void 0, import.meta.url).then(({
            clearLocalGenApiBlobCache: kn
          }) => kn()).catch(() => {});
        }
        if (!ct.ok) {
          const kn = await ct.text();
          let Fn = (Mr.includes("art.huya.info") || Mr.includes("copilot.huya.info") ? nH(ct.status, kn) : null) || HV(kn);
          if (console.error("[Generation] API Error:", {
            message: Fn,
            httpStatus: ct.status,
            endpoint: Mr,
            rawError: kn.slice(0, 800)
          }), hne(Fn)) {
            const Wt = [700, 1600];
            for (let Jt = 0; Jt < Wt.length; Jt++) {
              const Nn = Math.round(Wt[Jt] / 1e3) || 1;
              _t && y(Sr => Sr.map(Bn => Bn.id === _t ? {
                ...Bn,
                status: "generating",
                progress: Math.min(12, 5 + Jt * 3),
                errorMsg: `远程图片稍后重试（${Jt + 1}/${Wt.length}）…`
              } : Bn)), H(N.id, {
                isGenerating: !0,
                errorMsg: void 0,
                settings: {
                  ...(N.settings || {}),
                  isGenerating: !0,
                  progress: Math.min(12, 5 + Jt * 3)
                }
              }), console.warn(`[Generation] 远程提取图片失败，${Nn}s 后重试 ${Jt + 1}/${Wt.length}:`, Fn), await new Promise(Sr => setTimeout(Sr, Wt[Jt]));
              const En = await $i(Mr, {
                method: "POST",
                headers: Mt,
                body: $t ? g6e(Hn) : Dt ?? (await Pg(Hn))
              });
              if (En.ok) {
                ct = En, Fn = "";
                break;
              }
              const Zn = await En.text();
              if (Fn = HV(Zn) || Fn, !hne(Fn)) break;
            }
            ct.ok && (Fn = "");
          }
          if (ug(Oe)) {
            const {
              isHuyaMiniMaxH3ModelNotFoundError: Wt,
              formatHuyaMiniMaxH3ModelMissingError: Jt
            } = await Ie(async () => {
              const {
                isHuyaMiniMaxH3ModelNotFoundError: Nn,
                formatHuyaMiniMaxH3ModelMissingError: En
              } = await Promise.resolve().then(() => yUt);
              return {
                isHuyaMiniMaxH3ModelNotFoundError: Nn,
                formatHuyaMiniMaxH3ModelMissingError: En
              };
            }, void 0, import.meta.url);
            if (Wt(ct.status, kn)) {
              const Nn = Hn && typeof Hn == "object" && Hn.model ? Hn.model : {};
              throw new Error(Jt(String(Nn.type || "image2video"), kn, String(Nn.model || "")));
            }
          }
          if (fg(Oe)) {
            const {
              isHuyaKlingModelNotFoundError: Wt,
              formatHuyaKlingModelMissingError: Jt
            } = await Ie(async () => {
              const {
                isHuyaKlingModelNotFoundError: Nn,
                formatHuyaKlingModelMissingError: En
              } = await Promise.resolve().then(() => bUt);
              return {
                isHuyaKlingModelNotFoundError: Nn,
                formatHuyaKlingModelMissingError: En
              };
            }, void 0, import.meta.url);
            if (Wt(ct.status, kn)) {
              const Nn = Hn && typeof Hn == "object" && Hn.model ? Hn.model : {};
              throw new Error(Jt(Oe, String(Nn.type || "image2video"), kn));
            }
          }
          if (Kqe(Oe) && ct.status === 400 && !$t && Hn && typeof Hn == "object" && Array.isArray(Hn.content) && Hn.content.some(Wt => {
            var Jt;
            return (Wt == null ? void 0 : Wt.type) === "image_url" && typeof ((Jt = Wt == null ? void 0 : Wt.image_url) == null ? void 0 : Jt.url) == "string" && Wt.image_url.url.startsWith("asset://");
          })) try {
            const Jt = (((ki = N.settings) == null ? void 0 : ki.seedanceMaterials) || []).filter(Sr => Sr.type === "image" && !!Sr.url).map(Sr => Sr.url);
            let Nn = 0;
            const En = {
              ...Hn,
              content: Hn.content.map(Sr => {
                var Bn;
                if ((Sr == null ? void 0 : Sr.type) === "image_url" && typeof ((Bn = Sr == null ? void 0 : Sr.image_url) == null ? void 0 : Bn.url) == "string" && Sr.image_url.url.startsWith("asset://")) {
                  const Et = Jt[Nn++] || Sr.image_url.url;
                  return {
                    ...Sr,
                    image_url: {
                      ...Sr.image_url,
                      url: Et
                    }
                  };
                }
                return Sr;
              })
            };
            console.warn("[Seedance 2.0] asset:// returned 400, retrying with original image URLs once");
            const Zn = await $i(Mr, {
              method: "POST",
              headers: Mt,
              body: JSON.stringify(En)
            });
            if (Zn.ok) {
              const Sr = await Zn.text();
              let Bn;
              try {
                Bn = JSON.parse(Sr);
              } catch {
                throw new Error(`重试成功但响应非 JSON: ${Sr.slice(0, 120)}`);
              }
              const Et = yC(N.id, i, o),
                zn = (Wn = N.settings) == null ? void 0 : Wn.selectedPreviewId,
                Mn = zn && Et.includes(zn) ? zn : ((wr = N.settings) == null ? void 0 : wr._autoCreatedPreviewId) || (Et.length > 0 ? Et[0] : void 0);
              await Dte({
                customProtocol: Ze == null ? void 0 : Ze.customProtocol,
                result: Bn,
                taskId: _t,
                node: N,
                baseUrl: ea,
                apiKey: gt,
                currentModel: Oe,
                isMidjourney: vt,
                isVideoGeneration: pt,
                connections: i,
                nodes: o,
                nodesRef: k,
                updateNode: H,
                setHistory: y,
                setHistoryProgressDeferred: _,
                updateGenerationProgress: E,
                connectedPreviewId: Mn,
                creationEndpoint: Mr,
                setNodes: Y,
                generateId: m
              });
              return;
            } else try {
              const Sr = Jt[0],
                Bn = (Hn.content || []).filter(Mn => (Mn == null ? void 0 : Mn.type) === "text");
              Sr && Bn.push({
                type: "image_url",
                image_url: {
                  url: Sr
                },
                role: "first_frame"
              });
              const Et = {
                model: Hn.model,
                content: Bn,
                ratio: Hn.ratio || "16:9",
                duration: Hn.duration || 5,
                watermark: Hn.watermark ?? !1
              };
              console.warn("[Seedance 2.0] fallback #2 minimal retry:", {
                model: Et.model,
                duration: Et.duration,
                ratio: Et.ratio,
                hasFirstImage: !!Sr,
                firstImageHead: (Sr || "").slice(0, 80)
              });
              const zn = await $i(Mr, {
                method: "POST",
                headers: Mt,
                body: JSON.stringify(Et)
              });
              if (zn.ok) {
                const Mn = await zn.text();
                let or;
                try {
                  or = JSON.parse(Mn);
                } catch {
                  throw new Error(`极简重试成功但响应非 JSON: ${Mn.slice(0, 120)}`);
                }
                const mr = yC(N.id, i, o),
                  Yr = (jn = N.settings) == null ? void 0 : jn.selectedPreviewId,
                  aa = Yr && mr.includes(Yr) ? Yr : ((_n = N.settings) == null ? void 0 : _n._autoCreatedPreviewId) || (mr.length > 0 ? mr[0] : void 0);
                await Dte({
                  customProtocol: Ze == null ? void 0 : Ze.customProtocol,
                  result: or,
                  taskId: _t,
                  node: N,
                  baseUrl: ea,
                  apiKey: gt,
                  currentModel: Oe,
                  isMidjourney: vt,
                  isVideoGeneration: pt,
                  connections: i,
                  nodes: o,
                  nodesRef: k,
                  updateNode: H,
                  setHistory: y,
                  setHistoryProgressDeferred: _,
                  updateGenerationProgress: E,
                  connectedPreviewId: aa,
                  creationEndpoint: Mr,
                  setNodes: Y,
                  generateId: m
                });
                return;
              }
            } catch (Sr) {
              console.error("[Seedance 2.0] fallback #2 minimal retry failed:", Sr);
            }
          } catch (Wt) {
            console.error("[Seedance 2.0] fallback retry failed:", Wt);
          }
          if (ct.status === 422 && mm(Oe) && !$t && Hn && typeof Hn == "object" && Hn.model && typeof Hn.model == "object") {
            const Wt = Hn.model,
              Jt = Hn.parameters || {},
              Nn = [{
                provider: Wt.provider,
                model: Wt.model,
                type: Wt.type,
                prompt: Hn.prompt || Jt.prompt,
                ...Jt
              }, {
                ...Hn,
                provider: Wt.provider,
                model: Wt.model
              }].map(En => Object.fromEntries(Object.entries(En).filter(([, Zn]) => Zn !== void 0)));
            for (let En = 0; En < Nn.length; En++) {
              const Zn = Nn[En];
              try {
                console.warn(`[Huya Art Image] 422 validation, retry payload shape #${En + 1}:`, {
                  endpoint: Mr,
                  model: Zn.model,
                  provider: Zn.provider,
                  keys: Object.keys(Zn)
                });
                const Sr = await $i(Mr, {
                  method: "POST",
                  headers: Mt,
                  body: JSON.stringify(Zn)
                });
                if (Sr.ok) {
                  const Et = await Sr.text();
                  let zn;
                  try {
                    zn = JSON.parse(Et);
                  } catch {
                    throw new Error(`虎牙绘画兼容重试成功但响应非 JSON: ${Et.slice(0, 120)}`);
                  }
                  const Mn = yC(N.id, i, o),
                    or = (ar = N.settings) == null ? void 0 : ar.selectedPreviewId,
                    mr = or && Mn.includes(or) ? or : ((Vt = N.settings) == null ? void 0 : Vt._autoCreatedPreviewId) || (Mn.length > 0 ? Mn[0] : void 0);
                  await Dte({
                    customProtocol: Ze == null ? void 0 : Ze.customProtocol,
                    result: zn,
                    taskId: _t,
                    node: N,
                    baseUrl: ea,
                    apiKey: gt,
                    currentModel: Oe,
                    isMidjourney: vt,
                    isVideoGeneration: pt,
                    connections: i,
                    nodes: o,
                    nodesRef: k,
                    updateNode: H,
                    setHistory: y,
                    setHistoryProgressDeferred: _,
                    updateGenerationProgress: E,
                    connectedPreviewId: mr,
                    creationEndpoint: Mr,
                    setNodes: Y,
                    generateId: m
                  });
                  return;
                }
                const Bn = await Sr.text();
                console.warn(`[Huya Art Image] retry #${En + 1} failed:`, Sr.status, Bn.slice(0, 500));
              } catch (Sr) {
                console.error(`[Huya Art Image] retry #${En + 1} failed:`, Sr);
              }
            }
          }
          if ((Ip(Oe) || Ih(Oe)) && pt && Nke(Fn)) {
            const Wt = [3e4, 45e3, 6e4, 9e4];
            for (let Jt = 0; Jt < Wt.length; Jt++) {
              const Nn = Math.round(Wt[Jt] / 1e3);
              y(Bn => Bn.map(Et => Et.id === _t ? {
                ...Et,
                status: "generating",
                progress: Math.min(15, 6 + Jt * 3),
                errorMsg: `真人素材报备中，${Nn}s 后重试 (${Jt + 1}/${Wt.length})…`
              } : Et)), H(N.id, {
                isGenerating: !0,
                errorMsg: void 0,
                settings: {
                  ...(N.settings || {}),
                  progress: Math.min(15, 6 + Jt * 3)
                }
              }), await new Promise(Bn => setTimeout(Bn, Wt[Jt]));
              const En = await $i(Mr, {
                method: "POST",
                headers: Mt,
                body: $t ? Hn : await Pg(Hn)
              });
              if (En.ok) {
                ct = En;
                break;
              }
              const Zn = await En.text();
              if (Fn = (Mr.includes("art.huya.info") || Mr.includes("copilot.huya.info") ? nH(En.status, Zn) : null) || HV(Zn), !Nke(Fn)) break;
            }
          }
          if (Ex(Oe) && console.error("[Veo] ❌ API 请求失败:", {
            status: ct.status,
            statusText: ct.statusText,
            errorText: kn,
            endpoint: Mr,
            model: Oe
          }), !ct.ok) {
            let Wt = Fn || Sv(ct.status);
            throw (ct.status === 401 || ct.status === 403) && (Ze != null && Ze.isCustom || Ze != null && Ze.apiProviderId) && (Wt = `${Wt}。自定义服务商未授权，请到「API 接入」填写该服务商自己的密钥，不要使用全局或平台分组 Key`), new Error(yx(Wt));
          }
        }
        $t && (Hn = {}, je.payload = {});
        const Ln = await ct.text();
        let tt;
        try {
          tt = JSON.parse(Ln);
        } catch {
          throw console.error("[Generation] ❌ 响应不是有效的 JSON:", {
            responsePreview: Ln.substring(0, 200),
            endpoint: Mr,
            model: Oe
          }), Ln.trim().toLowerCase().startsWith("<!doctype") || Ln.trim().toLowerCase().startsWith("<html") ? new Error("API 返回了 HTML 错误页面，而不是 JSON 数据。请检查 API 地址和密钥是否正确。若为打包版，请到设置中确认该模型的 API 地址与 Key 已保存。") : new Error(`API 返回了无效的响应格式: ${Ln.substring(0, 100)}`);
        }
        const zt = (vn = tt == null ? void 0 : tt.data) == null ? void 0 : vn.data;
        fm(Oe) && Array.isArray(zt) && zt.some(kn => kn && typeof kn == "object" && (typeof kn.url == "string" || typeof kn.b64_json == "string")) && (tt.data = zt, console.log("[GPT Image 2] 已归一化双层 data 响应", {
          count: zt.length
        }));
        const an = HV(Ln),
          Rn = !!(D1t(tt == null ? void 0 : tt.data) || dp(tt == null ? void 0 : tt.task_id) || dp(tt == null ? void 0 : tt.taskId) || dp(tt == null ? void 0 : tt.id)),
          Un = t5(tt, !1, !1, {
            quiet: !0
          }).length > 0;
        if (hne(an) && !Rn && !Un) {
          const kn = [700, 1600];
          let xn = !1;
          for (let Fn = 0; Fn < kn.length; Fn++) {
            _t && y(Nn => Nn.map(En => En.id === _t ? {
              ...En,
              status: "generating",
              progress: Math.min(12, 5 + Fn * 3),
              errorMsg: `远程图片稍后重试（${Fn + 1}/${kn.length}）…`
            } : En)), console.warn(`[Generation] 创建响应远程提取图片失败，稍后重试 ${Fn + 1}/${kn.length}:`, an), await new Promise(Nn => setTimeout(Nn, kn[Fn]));
            const cr = await $i(Mr, {
                method: "POST",
                headers: Mt,
                body: $t ? g6e(Hn) : Dt ?? (await Pg(Hn))
              }),
              vr = await cr.text();
            if (!cr.ok) {
              if (!hne(HV(vr))) break;
              continue;
            }
            try {
              tt = JSON.parse(vr);
            } catch {
              continue;
            }
            const Wt = !!(D1t(tt == null ? void 0 : tt.data) || dp(tt == null ? void 0 : tt.task_id) || dp(tt == null ? void 0 : tt.taskId) || dp(tt == null ? void 0 : tt.id)),
              Jt = t5(tt, !1, !1, {
                quiet: !0
              }).length > 0;
            if (Wt || Jt || !hne(HV(vr))) {
              xn = !0;
              break;
            }
          }
          if (!xn) throw new Error(an);
        }
        const er = yC(N.id, i, o),
          Cr = (An = N.settings) == null ? void 0 : An.selectedPreviewId,
          tr = Cr && er.includes(Cr) ? Cr : ((ur = N.settings) == null ? void 0 : ur._autoCreatedPreviewId) || (er.length > 0 ? er[0] : void 0);
        if (zv(Oe)) {
          console.log("[Kling Omni] ========== 使用独立响应处理 =========="), console.log("[Kling O1] 响应数据:", JSON.stringify(tt, null, 2));
          const kn = ((zr = tt.data) == null ? void 0 : zr.task_id) || tt.task_id || ((Dr = tt.data) != null && Dr.data && typeof tt.data.data == "object" ? tt.data.data.task_id : null);
          if (console.log("[Kling O1] 提取的 task_id:", kn), kn) y(xn => xn.map(Fn => Fn.id === _t ? {
            ...Fn,
            status: "generating",
            progress: 0,
            remoteTaskId: String(kn)
          } : Fn)), cTi(String(kn), xn => {
            var Fn;
            if (console.log("[Kling O1] 收到 callback 数据:", xn), xn.task_status === "succeed" || xn.task_status === "success") {
              const cr = (Fn = xn.task_result) == null ? void 0 : Fn.videos;
              if (cr && cr.length > 0 && cr[0].url) {
                const vr = cr[0].url;
                console.log("[Kling O1] 从 callback 获取视频 URL:", vr), y(En => En.map(Zn => Zn.id === _t ? {
                  ...Zn,
                  status: "completed",
                  url: vr,
                  progress: 100
                } : Zn));
                const Wt = ((k == null ? void 0 : k.current) ?? []).find(En => En.id === N.id) ?? N;
                H(N.id, sC(Wt, {
                  isGenerating: !1,
                  content: vr,
                  errorMsg: void 0,
                  settings: {
                    ...Wt.settings,
                    isGenerating: !1,
                    progress: 100,
                    error: null,
                    previewSourceModel: Oe
                  }
                })), qVe.run(async () => {
                  const {
                      getVideoMetadata: En
                    } = await Ie(async () => {
                      const {
                        getVideoMetadata: Bn
                      } = await Promise.resolve().then(() => pg);
                      return {
                        getVideoMetadata: Bn
                      };
                    }, void 0, import.meta.url),
                    {
                      formatImagePixelSizeLabel: Zn
                    } = await Ie(async () => {
                      const {
                        formatImagePixelSizeLabel: Bn
                      } = await Promise.resolve().then(() => ii);
                      return {
                        formatImagePixelSizeLabel: Bn
                      };
                    }, void 0, import.meta.url),
                    Sr = await En(vr);
                  return Sr.w > 0 && Sr.h > 0 ? Zn(Sr.w, Sr.h) : void 0;
                }).then(En => {
                  if (!En) return;
                  const Zn = ((k == null ? void 0 : k.current) ?? []).find(Sr => Sr.id === N.id) ?? Wt;
                  H(N.id, {
                    settings: {
                      ...Zn.settings,
                      previewActualSize: En,
                      previewSize: En
                    }
                  });
                }).catch(() => {});
                const Jt = yC(N.id, i, o);
                oy({
                  url: vr,
                  type: "video"
                }, pa);
                const Nn = new CustomEvent("klingO1VideoComplete", {
                  detail: {
                    taskId: _t,
                    videoUrl: vr,
                    sourceNodeId: N.id,
                    previewNodeIds: Jt,
                    previewSourceModel: Oe,
                    updateNode: H
                  }
                });
                window.dispatchEvent(Nn);
              } else {
                console.error("[Kling O1] callback 中没有视频 URL");
                const vr = "生成已结束，但回调未返回视频 URL";
                y(Wt => Wt.map(Jt => Jt.id === _t ? {
                  ...Jt,
                  status: "failed",
                  errorMsg: vr,
                  progress: 0
                } : Jt)), H(N.id, {
                  isGenerating: !1,
                  errorMsg: vr
                });
              }
            } else if (xn.task_status === "failed" || xn.task_status === "failure") {
              const cr = xn.task_status_msg || "生成失败";
              console.error("[Kling O1] 任务失败:", cr), y(vr => vr.map(Wt => Wt.id === _t ? {
                ...Wt,
                status: "failed",
                errorMsg: cr,
                progress: 0
              } : Wt)), H(N.id, {
                isGenerating: !1,
                errorMsg: cr
              });
            }
          });else {
            console.error("[Kling O1] 未找到 task_id，响应:", tt);
            const xn = tt.message || tt.error || "创建任务失败：未返回 task_id";
            H(N.id, {
              isGenerating: !1,
              errorMsg: xn
            }), y(Fn => Fn.map(cr => cr.id === _t ? {
              ...cr,
              status: "failed",
              progress: 0,
              errorMsg: xn
            } : cr));
          }
          return;
        }
        if (kh(Oe) || Dg(Oe) || Og(Oe) || Lg(Oe) || Rm(Oe) || _v(Oe) || Hh(Oe) || Uu(Oe) || nh(Oe) || mp(Oe) || su(Oe) || jk(Oe) || Nm(Oe) || jm(Oe) || IS(Oe) || V1(Oe) || Nv(Oe) || Q1(Oe) || wy(Oe) || VM(Oe) || Gp(Oe) || Fm(Oe) || xb(Oe) || yf(Oe) || Sy(Oe) || kp(Oe) || Ap(Oe) || Yc(Oe) || D2(Oe) || HM(Oe)) {
          const kn = Po(ea),
            xn = String(Mr || "").startsWith(`${kn}/`) ? Mr.slice(kn.length + 1) : "",
            Fn = d8t(tt);
          (Fn || xn) && (y(Wt => Wt.map(Jt => Jt.id === _t ? {
            ...Jt,
            ...(Fn ? {
              remoteTaskId: Fn
            } : {}),
            ...(xn ? {
              falModelPath: xn
            } : {})
          } : Jt)), H(N.id, {
            settings: {
              ...(N.settings || {}),
              ...(Fn ? {
                falImageRequestId: Fn
              } : {}),
              ...(xn ? {
                falImageModelPath: xn
              } : {})
            }
          })), wh(tt);
          const cr = Po(ea),
            vr = Mr.startsWith(`${cr}/`) ? Mr.slice(cr.length + 1) : _v(Oe) ? DPt : Rm(Oe) ? IDn : Og(Oe) ? MPt : Lg(Oe) ? wDn : Dg(Oe) ? SPt : Hh(Oe) ? UOe : Uu(Oe) ? GOe : nh(Oe) ? P6t : mp(Oe) ? rie(Oe, !1) : su(Oe) ? O6t : jk(Oe) ? F6t : Nm(Oe) ? $6t : jm(Oe) ? H6t : IS(Oe) ? K6n : V1(Oe) ? FPn : Nv(Oe) ? OPn : Q1(Oe) ? GPn(M8t(Oe), "t2v") : wy(Oe) ? b9n("t2v", ohe(Oe)) : VM(Oe) ? S9n(jOe(Oe), N.type === "motion-control" ? "motion" : "t2v", A9n({
              variant: jOe(Oe),
              isMotionControlNode: N.type === "motion-control",
              settings: N.settings
            })) : Gp(Oe) ? URn(ID(Oe) ? "i2v" : "t2v", zRn(Oe) || "4k") : Fm(Oe) ? VRn : xb(Oe) ? YRn : yf(Oe) ? tNn(Oe, "t2v") : Sy(Oe) ? aNn : kp(Oe) ? ORn : Ap(Oe) ? cNn : Yc(Oe) ? pM(N.settings || {}) ? R9n : p5(N.settings || {}) ? j9n : Lxe(N.settings || {}) ? M9n : T9n : D2(Oe) ? V9n : Lb(Oe) ? IRn : Db(Oe) ? Q9n : aw(Oe) ? yRn : Kv(Oe) ? oRn : KK(Oe, !1);
          if (IS(Oe) || V1(Oe) || Nv(Oe) || Q1(Oe) || wy(Oe) || VM(Oe) || Gp(Oe) || Fm(Oe) || xb(Oe) || yf(Oe) || Sy(Oe) || kp(Oe) || Ap(Oe) || Yc(Oe) || D2(Oe) || HM(Oe)) {
            const Wt = await NWe({
                falPrefix: cr,
                apiKey: gt,
                modelPath: vr,
                submitData: tt,
                onProgress: Nn => {
                  _(pa, Nn), E(pa, N.id, Nn);
                }
              }),
              Jt = kxe(tt);
            tt = {
              data: [{
                url: Wt
              }],
              ...(Jt ? {
                video_id: Jt
              } : {})
            };
          } else tt = {
            data: (await GM({
              falPrefix: cr,
              apiKey: gt,
              modelPath: vr,
              submitData: tt,
              onProgress: Jt => {
                _(pa, Jt), E(pa, N.id, Jt);
              }
            })).map(Jt => ({
              url: Jt
            }))
          };
        }
        await Dte({
          customProtocol: Ze == null ? void 0 : Ze.customProtocol,
          result: tt,
          taskId: _t,
          node: N,
          baseUrl: ea,
          apiKey: gt,
          currentModel: Oe,
          isMidjourney: vt,
          isVideoGeneration: pt,
          connections: i,
          nodes: o,
          nodesRef: k,
          updateNode: H,
          setHistory: y,
          setHistoryProgressDeferred: _,
          updateGenerationProgress: E,
          connectedPreviewId: tr,
          creationEndpoint: Mr,
          setNodes: Y,
          generateId: m
        });
      } catch (gr) {
        console.error("生成失败:", gr);
        const jr = yx(gr instanceof Error ? gr.message : typeof gr == "string" ? gr : String(gr ?? "未知错误"));
        let ea = jr;
        /local-asset/i.test(jr) || /URL scheme ["']?local-asset/i.test(jr) ? ea = `参考素材读取失败（本地缓存）: ${jr}` : jr && (jr.includes("Failed to fetch") || jr.includes("fetch")) && (ea = `网络请求失败: ${jr}
`, ea += `模型: ${Oe}
`, ea += `URL: ${(Ze == null ? void 0 : Ze.url) || "unknown"}
`, ea += `Endpoint: ${At || "unknown"}
`, ea += `Protocol: ${window.location.protocol}
`, ea += `Hostname: ${window.location.hostname}`);
        const tn = {
          ...((s.get(N.id) || N).settings || {}),
          isGenerating: !1,
          progress: 0,
          error: ea
        };
        el(H, N.id, !1), H(N.id, {
          isGenerating: !1,
          errorMsg: ea,
          settings: tn
        }), _t && y(br => br.map(Jr => Jr.id === _t ? {
          ...Jr,
          status: "failed",
          progress: 0,
          errorMsg: ea
        } : Jr));
        const Lr = (Wr = N.settings) == null ? void 0 : Wr._autoCreatedPreviewId;
        if (Lr) try {
          rz(H, Lr, "previewGenerateFailed");
        } catch {}
      } finally {
        if (Yt == null || Yt(), _t && lEe(_t), _t && !VCe(_t)) try {
          el(H, N.id, !1);
        } catch {}
      }
    }, [r, a, i, o, s, I, E, y, _, u, p, m, T, P, w, C.bind, t]),
    j = g.useCallback(async (N, G, z, V, O = 1.5, L, D, U, H) => {
      var de, le, J, pe, ce;
      const Y = Pot(n, t, "启动扩图"),
        K = String(V.id || "").trim();
      if (V.apiProviderId && V.enabled === !1) throw new Error("该模型或服务商已停用，请在 API 接入中启用");
      const W = Ube(V, yRe(K) || vun(K) || mm(K) ? K : V.modelName || K),
        Q = vun(K),
        q = !!(V.localComfy && V.localComfy.model !== "h3") || W.includes("gpt-image") || W.includes("gpt-4o-image") || kh(W) || mm(W) || !Dg(W) && !Og(W) && !Lg(W) && !Rm(W) && !_v(W) && !Hh(W) && !Uu(W) && !nh(W) && !mp(W) && !su(W) && !jk(W) && !Nm(W) && !jm(W) && (W.includes("nano-banana-2") || W.includes("gemini-3.1-flash-image-preview") && !W.endsWith("-huya") || g3(W));
      !Q && !q && console.warn("[Expand] 当前模型可能不支持蒙版扩图，仍尝试请求:", W);
      let ne = null;
      try {
        const we = H == null ? void 0 : H.anchor,
          X = !G || G === "原比例" || G === "Auto" ? "Auto" : G,
          Z = U || "2K",
          re = `expand-${crypto.randomUUID()}`;
        let fe = z.trim() || "基于原图自然扩展画面，保持风格一致",
          ye = N,
          ie,
          ae = null;
        if (Q) {
          const {
              w: $e,
              h: rt
            } = await dao(N),
            nt = lao($e, rt, G, O, L, D, H == null ? void 0 : H.sourceOffsetXRatio, H == null ? void 0 : H.sourceOffsetYRatio);
          fe = cao(z, nt), ae = Egr(nt.outputWidth, nt.outputHeight);
        } else {
          const {
            compositeBlob: $e,
            maskBase64: rt,
            width: nt,
            height: ze
          } = await hao(N, G, O, L, D, we, H == null ? void 0 : H.sourceOffsetXRatio, H == null ? void 0 : H.sourceOffsetYRatio);
          ne = URL.createObjectURL($e), ye = ne, ie = [{
            nodeId: re,
            mask: rt,
            width: nt,
            height: ze
          }];
        }
        if (SO(Y, "启动扩图"), Zae(K)) {
          if (!Pxe()) throw new Error("即梦 CLI 仅支持 Tauri 桌面版");
          const $e = ae || {
            width: 1024,
            height: 1024
          };
          return await Tmn({
            node: {
              id: re,
              type: "gen-image",
              x: 0,
              y: 0,
              width: $e.width,
              height: $e.height,
              prompt: fe,
              settings: {
                selectedModel: K,
                model: K,
                ratio: X,
                resolution: Z,
                width: $e.width,
                height: $e.height
              }
            },
            modelId: K,
            prompt: fe,
            referenceImages: [N],
            forceSize: !0,
            onProgress: () => {
              var rt;
              return (rt = H == null ? void 0 : H.onProgress) == null ? void 0 : rt.call(H, 40);
            },
            onSubmitted: H == null ? void 0 : H.onRemoteTaskId
          });
        }
        const be = rOe(V, V.url || ""),
          Ee = cu(V.key, a, void 0, {
            platformGroup: H == null ? void 0 : H.platformGroup,
            modelId: V.id,
            modelName: W,
            baseUrl: be,
            modelSavedApiKeyId: V.savedApiKeyId
          });
        if (!be || !Ee && ((de = V.customProtocol) == null ? void 0 : de.auth) !== "none") return console.error("[Expand] 缺少 baseUrl 或 apiKey"), null;
        const xe = fm(V.modelName || V.id),
          he = zS(V.modelName || V.id),
          ue = {
            id: re,
            type: "gen-image",
            x: 0,
            y: 0,
            width: 200,
            height: 200,
            prompt: "",
            settings: {
              selectedModel: V.id,
              model: V.id,
              ratio: X,
              resolution: Z,
              platformGroup: H == null ? void 0 : H.platformGroup,
              useAsyncMode: !0,
              gptImageQuality: (H == null ? void 0 : H.quality) ?? (xe ? "auto" : "standard"),
              gptImageBackground: (H == null ? void 0 : H.background) ?? (xe ? "auto" : "opaque"),
              gptImageOutputFormat: (H == null ? void 0 : H.outputFormat) ?? "png",
              gptImageModeration: (H == null ? void 0 : H.moderation) ?? "auto",
              genUseAliyunOss: !!(H != null && H.genUseAliyunOss),
              ...(ae ? {
                width: ae.width,
                height: ae.height
              } : {}),
              ...(xe ? {
                gptImage2Resolution: he ? mg(Z) : Z
              } : {})
            }
          },
          ge = await Jfe({
            node: ue,
            currentModel: W,
            config: V,
            baseUrl: be,
            prompt: fe,
            ratio: V.localComfy ? "Auto" : X,
            resolution: Z,
            refImages: [ye],
            hasReferenceImage: !0,
            isVideoGeneration: !1,
            isMidjourney: !1,
            isNanoBanana2: Yft(V.id, V.modelName),
            taskId: re,
            apiKey: Ee,
            getConnectedImageForInput: () => null,
            setHistory: y,
            updateNode: () => {},
            nodes: [],
            connections: [],
            markerMasks: ie,
            expandMode: !0
          });
        if (!ge) return null;
        SO(Y, "启动扩图");
        const {
          endpoint: _e,
          payload: ke,
          useMultipart: ve
        } = ge;
        ae && uao(ke, ae.width, ae.height);
        const Te = V != null && V.customProtocol ? une(V.customProtocol, Ee, ve) : ve ? {
          Authorization: `Bearer ${Ee}`
        } : {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Ee}`
        };
        Efe(_e);
        const Ne = V.localComfy ? await AH(V, ke, {
          taskId: re,
          nodeId: re,
          onProgress: $e => {
            var rt;
            return (rt = H == null ? void 0 : H.onProgress) == null ? void 0 : rt.call(H, $e);
          },
          isCurrent: Y
        }) : await $i(_e, {
          method: "POST",
          headers: Te,
          body: ve ? ke : await Pg(ke)
        });
        if (!Ne.ok) {
          const $e = await Ne.text();
          throw new Error(`扩图请求失败: ${Ne.status} ${$e}`);
        }
        const me = await Ne.json(),
          Ae = V.customProtocol ? TF(me, V.customProtocol) : me;
        if (V.customProtocol && Ae.status === "FAILED") throw new Error(LF(Ae, "任务失败"));
        if (kh(W) || Dg(W) || Og(W) || Lg(W) || Rm(W) || _v(W) || Hh(W) || Uu(W) || nh(W) || mp(W) || su(W) || Nm(W) || jm(W)) {
          wh(Ae);
          const $e = Po(be),
            rt = _e.startsWith(`${$e}/`) ? _e.slice($e.length + 1) : _v(W) ? dBe : Rm(W) ? cBe : Og(W) ? lBe : Lg(W) ? sBe : Dg(W) ? oBe : Hh(W) ? $Oe : Uu(W) ? VOe : nh(W) ? HOe : mp(W) ? rie(W, !0) : su(W) ? WOe : Nm(W) ? qOe : jm(W) ? KOe : KK(W, !0),
            nt = await GM({
              falPrefix: $e,
              apiKey: Ee,
              modelPath: rt,
              submitData: Ae,
              onProgress: H == null ? void 0 : H.onProgress
            });
          return nt.length > 0 ? nt : null;
        }
        if (mm(W)) {
          if (Ae.success === !1) {
            const Ye = hd(Ae, "创建任务失败");
            throw new Error(Ye);
          }
          const $e = fv(Ae, !1);
          if ($e.urls.length > 0) return $e.urls;
          const rt = Ae.data;
          let nt = String(Ae.task_id ?? Ae.taskId ?? (rt == null ? void 0 : rt.task_id) ?? (rt == null ? void 0 : rt.id) ?? Ae.id ?? "");
          if (!nt) throw new Error(hd(Ae, "扩图未返回任务 ID"));
          (le = H == null ? void 0 : H.onRemoteTaskId) == null || le.call(H, nt);
          const ze = EU(sX(W, V.url || be)),
            Le = gk(ze, nt),
            Ke = p7({
              isVideo: !1,
              isImage2Image: !0
            });
          let Xe = 0;
          const De = {
            current: "fast"
          };
          for (let Ye = 0; Ye < Ke; Ye++) {
            Ye > 0 && (await ik.wait(V8({
              attempt: Ye,
              baseInterval: ES,
              isDocumentHidden: document.visibilityState === "hidden",
              scheduleKey: `huya-expand:${nt}`,
              lane: De.current
            })));
            const Ce = await mR(De, () => $i(Le, {
              headers: {
                Authorization: `Bearer ${Ee}`
              }
            }));
            if (!Ce) continue;
            const He = await ore(Ce);
            if (!Ce.ok && (Ce.status === 401 || Ce.status === 403 || Ce.status >= 500)) throw new Error(hd(He, String(Ce.status)));
            const Ve = fv(He, !1);
            if (Ve.urls.length > 0) return Ve.urls;
            const it = Ve.status;
            if (E1(He, it)) throw new Error(hd(He, it || "扩图任务失败"));
            if (Kj(it)) {
              if (Xe += 1, Xe >= 24) throw new Error(hd(He, "任务已成功但未返回结果 URL，请稍后重试"));
            } else Xe = 0;
            (J = H == null ? void 0 : H.onProgress) == null || J.call(H, Math.min(10 + Ye * 2, 95));
          }
          throw new Error("扩图轮询超时");
        }
        const Fe = Ae.data,
          Me = (Fe == null ? void 0 : Fe.id) ?? Ae.task_id ?? (Fe == null ? void 0 : Fe.task_id) ?? Ae.id;
        if (Me) {
          (pe = H == null ? void 0 : H.onRemoteTaskId) == null || pe.call(H, Me);
          const $e = {
            current: "fast"
          };
          for (let rt = 0; rt < 200; rt++) {
            rt > 0 && (await ik.wait(V8({
              attempt: rt,
              baseInterval: lz("fast-image", rt - 1),
              isDocumentHidden: document.visibilityState === "hidden",
              scheduleKey: `expand:${Me}`,
              lane: $e.current
            })));
            const nt = V.customProtocol ? wxe(V.customProtocol, be, Ee, Me) : void 0,
              ze = (nt == null ? void 0 : nt.url) || `${be}/v1/images/tasks/${Me}`,
              Le = await mR($e, () => $i(ze, (nt == null ? void 0 : nt.options) || {
                headers: {
                  Authorization: `Bearer ${Ee}`
                }
              }));
            if (!Le) continue;
            const Ke = await ore(Le);
            if (V.customProtocol && !Le.ok) throw new Error(`查询失败: HTTP ${Le.status}`);
            const Xe = V.customProtocol ? TF(Ke, V.customProtocol, !0) : Ke,
              De = IX(Xe);
            if (FU(De)) {
              const Ye = t5(Xe, !1, !1);
              if (Ye.length > 0) return Ye;
            }
            if (BU(Xe) || De === "FAILED" || De === "ERROR" || De === "FAILURE") {
              const Ye = LF(Xe, String(De));
              throw new Error(Ye || "扩图任务失败");
            }
            (ce = H == null ? void 0 : H.onProgress) == null || ce.call(H, eP(Xe, rt));
          }
          throw new Error("扩图轮询超时");
        }
        const Re = t5(Ae, !1, !1);
        return Re.length > 0 ? Re : null;
      } catch (we) {
        throw console.error("[Expand] 扩图失败:", we), we;
      } finally {
        ne && URL.revokeObjectURL(ne);
      }
    }, [a, y, t, n]),
    B = g.useCallback(async (N, G, z, V = "Auto", O = "2K", L) => {
      var ge, _e, ke, ve, Te;
      const D = Pot(n, t, "启动改图");
      if (z.apiProviderId && z.enabled === !1) throw new Error("该模型或服务商已停用，请在 API 接入中启用");
      const U = Ube(z, yRe(z.id) ? z.id : z.modelName || z.id),
        H = rOe(z, z.url || ""),
        Y = cu(z.key, a, void 0, {
          platformGroup: L == null ? void 0 : L.platformGroup,
          modelId: z.id,
          modelName: U,
          baseUrl: H,
          modelSavedApiKeyId: z.savedApiKeyId
        });
      if (!N) throw new Error("没有可用于改图的参考图片");
      if (!H || !Y && ((ge = z.customProtocol) == null ? void 0 : ge.auth) !== "none") throw new Error("请先配置模型 API 地址和 API Key");
      let K = N,
        W = ((L == null ? void 0 : L.refImages) || []).filter(Ne => Ne && Ne !== N);
      const Q = (L == null ? void 0 : L.sourceSettings) || {},
        q = !!(L != null && L.genUseAliyunOss);
      try {
        let Ne = [N, ...W];
        Ne = await BF(Ne);
        const {
            isGlobalOssUploadEnabled: me
          } = await Ie(async () => {
            const {
              isGlobalOssUploadEnabled: Me
            } = await Promise.resolve().then(() => Ah);
            return {
              isGlobalOssUploadEnabled: Me
            };
          }, void 0, import.meta.url),
          Ae = !z.localComfy && (q || me()),
          Fe = !z.localComfy && !!Q.ossImageBase64;
        (Ae || Fe) && (Ne = await uie(Ne, {
          useOss: Ae,
          imageAsBase64: Fe
        })), K = Ne[0] || N, W = Ne.slice(1);
      } catch (Ne) {
        console.warn("[runEditImage] 参考图解析失败，使用原始 URL:", Ne);
      }
      SO(D, "启动改图");
      const ne = L != null && L.rawPrompt ? G.trim() || "请基于参考图生成。" : G.trim() ? `${G.trim()}

只修改用户描述中需要修改的内容，保持原图主体、构图、透视、画风、光影和无关细节不变。` : "请基于参考图进行自然改图，保持主体、构图、画风和无关细节一致。",
        de = z.localComfy ? `edit-${crypto.randomUUID()}` : `edit-${Date.now()}`,
        le = fm(z.modelName || z.id),
        J = zS(z.modelName || z.id),
        pe = !V || V === "原比例" ? "Auto" : V,
        ce = O || "2K",
        we = {
          id: de,
          type: "gen-image",
          x: 0,
          y: 0,
          width: 200,
          height: 200,
          prompt: ne,
          settings: {
            ...Q,
            selectedModel: z.id,
            model: z.id,
            ratio: pe,
            resolution: ce,
            platformGroup: (L == null ? void 0 : L.platformGroup) ?? Q.platformGroup,
            useAsyncMode: Q.useAsyncMode ?? !0,
            gptImageQuality: Q.gptImageQuality ?? (le ? "auto" : "standard"),
            gptImageBackground: Q.gptImageBackground ?? (le ? "auto" : "opaque"),
            gptImageOutputFormat: Q.gptImageOutputFormat ?? "png",
            gptImageModeration: Q.gptImageModeration ?? "auto",
            ...(le ? {
              gptImage2Resolution: J ? mg(String(Q.gptImage2Resolution || ce)) : String(Q.gptImage2Resolution || ce)
            } : {})
          }
        },
        X = [K, ...W],
        Z = await Jfe({
          node: we,
          currentModel: U,
          config: z,
          baseUrl: H,
          prompt: ne,
          ratio: pe,
          resolution: ce,
          refImages: X,
          hasReferenceImage: !0,
          isVideoGeneration: !1,
          isMidjourney: !1,
          isNanoBanana2: Yft(z.id, z.modelName),
          taskId: de,
          apiKey: Y,
          getConnectedImageForInput: () => null,
          setHistory: y,
          updateNode: () => {},
          nodes: [],
          connections: [],
          markerMasks: L == null ? void 0 : L.markerMasks,
          expandMode: L == null ? void 0 : L.preserveImageDimensions
        });
      if (!Z) return null;
      SO(D, "启动改图");
      const {
          endpoint: re,
          payload: fe,
          useMultipart: ye
        } = Z,
        ie = z != null && z.customProtocol ? une(z.customProtocol, Y, ye) : ye ? {
          Authorization: `Bearer ${Y}`
        } : {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Y}`
        };
      Efe(re);
      const ae = z.localComfy ? await AH(z, fe, {
        taskId: de,
        nodeId: de,
        onProgress: Ne => {
          var me;
          return (me = L == null ? void 0 : L.onProgress) == null ? void 0 : me.call(L, Ne);
        },
        isCurrent: D
      }) : await $i(re, {
        method: "POST",
        headers: ie,
        body: ye ? fe : await Pg(fe)
      });
      if (!ae.ok) {
        const Ne = await ae.text();
        throw new Error(`改图请求失败: ${ae.status} ${Ne}`);
      }
      const be = await ae.json(),
        Ee = z.customProtocol ? TF(be, z.customProtocol) : be;
      if (z.customProtocol && Ee.status === "FAILED") throw new Error(LF(Ee, "任务失败"));
      if (kh(U) || Dg(U) || Og(U) || Lg(U) || Rm(U) || _v(U) || Hh(U) || Uu(U) || nh(U) || mp(U) || su(U) || Nm(U) || jm(U)) {
        wh(Ee);
        const Ne = Po(H),
          me = re.startsWith(`${Ne}/`) ? re.slice(Ne.length + 1) : _v(U) ? dBe : Rm(U) ? cBe : Og(U) ? lBe : Lg(U) ? sBe : Dg(U) ? oBe : Hh(U) ? $Oe : Uu(U) ? VOe : nh(U) ? HOe : mp(U) ? rie(U, !0) : su(U) ? WOe : Nm(U) ? qOe : jm(U) ? KOe : KK(U, !0),
          Ae = await GM({
            falPrefix: Ne,
            apiKey: Y,
            modelPath: me,
            submitData: Ee,
            onProgress: L == null ? void 0 : L.onProgress
          });
        return Ae.length > 0 ? Ae : null;
      }
      if (mm(U)) {
        if (Ee.success === !1) {
          const nt = hd(Ee, "创建任务失败");
          throw new Error(nt);
        }
        const Ne = fv(Ee, !1);
        if (Ne.urls.length > 0) return Ne.urls;
        const me = Ee.data,
          Ae = String(Ee.task_id ?? Ee.taskId ?? (me == null ? void 0 : me.task_id) ?? (me == null ? void 0 : me.id) ?? Ee.id ?? "");
        if (!Ae) throw new Error(hd(Ee, "改图未返回任务 ID"));
        (_e = L == null ? void 0 : L.onRemoteTaskId) == null || _e.call(L, Ae);
        const Fe = EU(sX(U, z.url || H)),
          Me = gk(Fe, Ae),
          Re = p7({
            isVideo: !1,
            isImage2Image: !0
          });
        let $e = 0;
        const rt = {
          current: "fast"
        };
        for (let nt = 0; nt < Re; nt++) {
          nt > 0 && (await ik.wait(V8({
            attempt: nt,
            baseInterval: ES,
            isDocumentHidden: document.visibilityState === "hidden",
            scheduleKey: `huya-edit:${Ae}`,
            lane: rt.current
          })));
          const ze = await mR(rt, () => $i(Me, {
            headers: {
              Authorization: `Bearer ${Y}`
            }
          }));
          if (!ze) continue;
          const Le = await ore(ze);
          if (!ze.ok && (ze.status === 401 || ze.status === 403 || ze.status >= 500)) throw new Error(hd(Le, String(ze.status)));
          const Ke = fv(Le, !1);
          if (Ke.urls.length > 0) return Ke.urls;
          const Xe = Ke.status;
          if (E1(Le, Xe)) throw new Error(hd(Le, Xe || "改图任务失败"));
          if (Kj(Xe)) {
            if ($e += 1, $e >= 24) throw new Error(hd(Le, "任务已成功但未返回结果 URL，请稍后重试"));
          } else $e = 0;
          (ke = L == null ? void 0 : L.onProgress) == null || ke.call(L, Math.min(10 + nt * 2, 95));
        }
        throw new Error("改图轮询超时");
      }
      const xe = Ee.data,
        he = (xe == null ? void 0 : xe.id) ?? Ee.task_id ?? (xe == null ? void 0 : xe.task_id) ?? Ee.id;
      if (he) {
        (ve = L == null ? void 0 : L.onRemoteTaskId) == null || ve.call(L, he);
        const Ne = {
          current: "fast"
        };
        for (let me = 0; me < 200; me++) {
          me > 0 && (await ik.wait(V8({
            attempt: me,
            baseInterval: lz("fast-image", me - 1),
            isDocumentHidden: document.visibilityState === "hidden",
            scheduleKey: `edit:${he}`,
            lane: Ne.current
          })));
          const Ae = z.customProtocol ? wxe(z.customProtocol, H, Y, he) : void 0,
            Fe = (Ae == null ? void 0 : Ae.url) || `${H}/v1/images/tasks/${he}`,
            Me = await mR(Ne, () => $i(Fe, (Ae == null ? void 0 : Ae.options) || {
              headers: {
                Authorization: `Bearer ${Y}`
              }
            }));
          if (!Me) continue;
          const Re = await ore(Me);
          if (z.customProtocol && !Me.ok) throw new Error(`查询失败: HTTP ${Me.status}`);
          const $e = z.customProtocol ? TF(Re, z.customProtocol, !0) : Re,
            rt = IX($e);
          if (FU(rt)) {
            const nt = t5($e, !1, !1);
            if (nt.length > 0) return nt;
          }
          if (BU($e) || rt === "FAILED" || rt === "ERROR" || rt === "FAILURE") {
            const nt = LF($e, String(rt));
            throw new Error(nt || "改图任务失败");
          }
          (Te = L == null ? void 0 : L.onProgress) == null || Te.call(L, eP($e, me));
        }
        throw new Error("改图轮询超时");
      }
      const ue = t5(Ee, !1, !1);
      return ue.length > 0 ? ue : null;
    }, [a, y, t, n]),
    F = g.useCallback(async N => {
      var De, Ye, Ce;
      const {
          nodeId: G,
          cells: z,
          model: V,
          ratio: O,
          resolution: L,
          refImages: D,
          connections: U,
          nodes: H,
          setNodes: Y,
          setConnections: K,
          generateId: W,
          gridRows: Q,
          gridCols: q,
          targetPreviewId: ne,
          cellIndices: de
        } = N,
        le = Pot(n, t, "启动分镜批量"),
        J = yC(G, U, H),
        pe = ne && J.includes(ne) ? ne : J[0],
        ce = aln(G, le, C.bind, pe ? [pe] : []),
        we = ce.updateNode,
        X = Y ? ce.setNodes : void 0,
        Z = K ? ce.guardSetter(K) : void 0,
        re = r.find(He => He.id === V),
        fe = re != null && re.localComfy ? "" : (re == null ? void 0 : re.key) || a,
        ye = ((re == null ? void 0 : re.url) || "https://ai.comfly.chat").replace(/\/+$/, "");
      if (re != null && re.apiProviderId && re.enabled === !1) throw new Error("该模型或服务商已停用，请在 API 接入中启用");
      if (!re || !ye || !fe && ((De = re.customProtocol) == null ? void 0 : De.auth) !== "none") throw new Error("请先配置 API Key");
      const ie = kio(V);
      if (!["gpt-image", "flux-kontext", "qwen-image-edit", "nano-banana", "nano-banana-2", "grsai", "generic"].includes(ie)) throw new Error(`当前模型 ${V} 暂不支持分镜图表批量生成，请使用 Nano Banana、GPT Image 等`);
      let be = (D || []).filter(He => {
        if (!He || typeof He != "string") return !1;
        const Ve = He.trim();
        return Ve.length > 0 && Ve !== "undefined" && Ve !== "null";
      });
      const Ee = H.find(He => He.id === G),
        {
          isGlobalOssUploadEnabled: xe
        } = await Ie(async () => {
          const {
            isGlobalOssUploadEnabled: He
          } = await Promise.resolve().then(() => Ah);
          return {
            isGlobalOssUploadEnabled: He
          };
        }, void 0, import.meta.url),
        he = !re.localComfy && (!!((Ye = Ee == null ? void 0 : Ee.settings) != null && Ye.genUseAliyunOss) || xe()),
        ue = QNe(G, h),
        ge = be.length > 0 ? [...be] : [];
      if (be.length > 0) try {
        be = await BF(be), he && (be = await uie(be, {
          useOss: !0,
          metaByRawUrl: ue,
          metaByIndex: ge.map(He => ue.get(He) || {
            type: "image"
          })
        }));
      } catch (He) {
        const Ve = He instanceof Error ? He.message : "参考图处理失败";
        throw console.warn("[generateChartBatch] 参考图解析/OSS 失败:", He), new Error(Ve);
      }
      SO(le, "启动分镜批量");
      const _e = z.filter(He => (He.prompt || "").trim());
      if (_e.length === 0) throw new Error("请至少填写一个分镜描述");
      const ke = yC(G, U, H);
      if (!ce.isCurrent()) throw new Error("画布会话或分镜生成任务已失效，未继续派发。");
      let ve = ne && ke.includes(ne) ? ne : ke[0];
      if (!ve && X && Z && W) {
        const {
          createNode: He
        } = await Ie(async () => {
          const {
            createNode: Ze
          } = await Promise.resolve().then(() => uJr);
          return {
            createNode: Ze
          };
        }, void 0, import.meta.url);
        if (!ce.isCurrent()) throw new Error("画布会话或分镜生成任务已失效，未创建预览。");
        const Ve = H.find(Ze => Ze.id === G),
          it = Ve ? Ve.x + (Ve.width || 540) + 80 : 100,
          It = Ve ? Ve.y : 100,
          Ft = He(W(), "preview", it, It, void 0, void 0, H),
          We = {
            id: W(),
            from: G,
            to: Ft.id
          };
        Uro({
          preview: Ft,
          connection: We,
          writes: ce,
          setNodes: l,
          setConnections: K
        }), ve = Ft.id;
      }
      if (!ve) throw new Error("请连接一个预览节点或将分镜图表连接到预览");
      const Te = H.find(He => He.id === G);
      if (!Te) throw new Error("分镜图表节点不存在");
      const Ne = Iio(Te.settings, V, O, L),
        me = {
          ...Te,
          settings: Ne
        },
        Ae = String(Ne.ratio ?? O ?? "Auto"),
        Fe = String(Ne.resolution ?? L ?? "2K"),
        Me = (re == null ? void 0 : re.provider) || (re == null ? void 0 : re.modelName) || V,
        Re = ie === "nano-banana-2",
        $e = _e.map(() => W ? W() : `chart-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`);
      $e.forEach(ce.recordTask);
      const rt = new Array(_e.length).fill(""),
        nt = new Array(_e.length).fill(""),
        ze = Date.now(),
        Le = $e.map((He, Ve) => ({
          id: He,
          type: "image",
          url: "",
          prompt: _e[Ve].prompt,
          time: DO(),
          status: "generating",
          progress: 0,
          modelName: Me,
          sourceNodeId: G,
          targetPreviewId: ve,
          startTime: ze,
          chartCellIndex: de == null ? void 0 : de[Ve],
          ...(re.customProtocol ? {
            apiConfig: {
              modelId: re.id,
              baseUrl: ye,
              apiKey: fe,
              customProtocol: re.customProtocol,
              localComfy: re.localComfy
            }
          } : {})
        }));
      y(He => [...Le, ...He]), w(ce.isCurrent, () => {
        we(G, {
          isGenerating: !0,
          errorMsg: void 0
        });
      }), ve && requestAnimationFrame(() => {
        try {
          rz(we, ve, "previewGenerationStarted");
        } catch {}
      });
      const Ke = 50;
      let Xe = null;
      try {
        for (let it = 0; it < _e.length; it++) {
          if (it > 0 && (await new Promise(Ge => setTimeout(Ge, it * Ke))), !ce.isCurrent()) {
            const Ge = new Set($e.slice(it));
            Ge.forEach(pcr), y(Oe => Oe.map(st => Ge.has(String(st.id)) ? {
              ...st,
              status: "failed",
              progress: 0,
              errorMsg: "画布或分镜任务已失效，未提交请求"
            } : st));
            break;
          }
          let Ft = (_e[it].prompt || "").trim();
          const We = [],
            Ze = TRa(Ft, be);
          Ze ? (We.push(...Ze), Ft = PRa(Ft)) : We.push(...ERa(be));
          try {
            const Ge = await Jfe({
              node: me,
              currentModel: V,
              config: re,
              baseUrl: ye,
              prompt: Ft,
              ratio: Ae === "Auto" ? "1:1" : Ae,
              resolution: Fe,
              refImages: We,
              hasReferenceImage: We.length > 0,
              isVideoGeneration: !1,
              isMidjourney: !1,
              isNanoBanana2: Re,
              taskId: $e[it],
              apiKey: fe,
              getConnectedImageForInput: () => null,
              setHistory: y,
              setHistoryProgressDeferred: _,
              updateNode: we,
              nodes: H,
              connections: U
            });
            if (!Ge) {
              y(_t => _t.map(At => At.id === $e[it] ? {
                ...At,
                status: "failed",
                progress: 0
              } : At)), Xe = new Error(`宫格 ${it + 1} 构建请求失败`);
              continue;
            }
            const {
                endpoint: Oe,
                payload: st,
                useMultipart: vt
              } = Ge,
              Ht = "Bearer",
              nn = re != null && re.customProtocol ? une(re.customProtocol, fe, vt) : vt ? {
                Authorization: `${Ht} ${fe}`
              } : {
                "Content-Type": "application/json",
                Authorization: `${Ht} ${fe}`
              },
              pt = vt ? st : await Pg(st);
            if (!ce.isCurrent()) throw new Error("画布或分镜任务已失效，未提交请求");
            Efe(Oe);
            const lt = re.localComfy ? await AH(re, st, {
              taskId: $e[it],
              nodeId: G,
              onProgress: _t => {
                _($e[it], _t);
              },
              isCurrent: ce.isCurrent
            }) : await $i(Oe, {
              method: "POST",
              headers: nn,
              body: pt
            });
            if (!lt.ok) {
              const _t = await lt.text();
              y(At => At.map(Yt => Yt.id === $e[it] ? {
                ...Yt,
                status: "failed",
                progress: 0,
                errorMsg: _t
              } : Yt)), Xe = new Error(`宫格 ${it + 1} 请求失败: ${lt.status}`);
              continue;
            }
            const gt = await lt.text();
            let Ut;
            try {
              Ut = JSON.parse(gt);
            } catch {
              y(_t => _t.map(At => At.id === $e[it] ? {
                ...At,
                status: "failed",
                progress: 0
              } : At)), Xe = new Error(`宫格 ${it + 1} 响应非 JSON`);
              continue;
            }
            await Dte({
              customProtocol: re == null ? void 0 : re.customProtocol,
              result: Ut,
              taskId: $e[it],
              node: me,
              baseUrl: ye,
              apiKey: fe,
              currentModel: V,
              isMidjourney: !1,
              isVideoGeneration: !1,
              connections: U,
              nodes: H,
              nodesRef: k,
              updateNode: we,
              setHistory: y,
              setHistoryProgressDeferred: _,
              updateGenerationProgress: E,
              connectedPreviewId: ve,
              batchAccumulator: rt,
              batchRemoteAccumulator: nt,
              batchIndex: it,
              creationEndpoint: Oe,
              setNodes: X,
              generateId: m
            });
          } catch (Ge) {
            const Oe = Ge instanceof Error ? Ge.message : String(Ge);
            y(st => st.map(vt => vt.id === $e[it] ? {
              ...vt,
              status: "failed",
              progress: 0,
              errorMsg: Oe
            } : vt)), Xe = Ge instanceof Error ? Ge : new Error(Oe);
          }
        }
        await (async () => {
          const Ft = Date.now() + 3e5;
          for (; Date.now() < Ft;) {
            if (!ce.isCurrent()) return;
            const We = await new Promise(Ge => {
              y(Oe => (Ge(Oe), Oe));
            });
            if ($e.every(Ge => {
              const Oe = We.find(st => st.id === Ge);
              return Oe && (Oe.status === "completed" || Oe.status === "failed");
            })) return;
            await new Promise(Ge => setTimeout(Ge, 1e3));
          }
        })();
        const Ve = rt.filter(it => !!it && it.length > 0);
        if (Ve.length > 0 && ve) {
          const it = (Te == null ? void 0 : Te.nodeName) || "分镜图表";
          let It = Ve,
            Ft = nt.some(Ge => !!Ge) ? nt : void 0,
            We;
          if (de && de.length > 0) {
            const Ge = H.find(lt => lt.id === ve),
              Oe = (Ge == null ? void 0 : Ge.previewMjImages) || [],
              st = (Ge == null ? void 0 : Ge._previewMjAssetIds) || [],
              vt = ((Ce = Ge == null ? void 0 : Ge.settings) == null ? void 0 : Ce.previewMjOssRemoteUrls) || [],
              Ht = Oe.slice(),
              nn = st.slice(),
              pt = vt.slice();
            de.forEach((lt, gt) => {
              const Ut = Ve[gt],
                _t = nt[gt];
              Ut && (Ht.length <= lt && (Ht.length = lt + 1), nn.length <= lt && (nn.length = lt + 1), Ht[lt] = Ut, nn[lt] = void 0, _t && (pt.length <= lt && (pt.length = lt + 1), pt[lt] = _t));
            }), It = Ht, Ft = pt.some(lt => !!lt) ? pt : Ft, We = nn.some(lt => !!lt) ? nn : void 0;
          }
          const Ze = (Ft == null ? void 0 : Ft.find(Ge => !!Ge)) || nt.find(Ge => !!Ge);
          await fUt(ve, It[0], "image", we, {
            previewMjImages: It,
            previewMjRemoteUrls: Ft,
            previewMjAssetIds: We,
            selectedPreviewImage: It[0],
            previewOssRemoteUrl: Ze,
            sourceNodeName: it,
            previewSourceModel: V,
            previewSourceNodeId: G,
            previewSourceNodeType: "storyboard-chart-node",
            ...(Q != null && q != null ? {
              previewGridRows: Q,
              previewGridCols: q
            } : {})
          }, H);
        }
        if (Xe && Ve.length === 0) throw Xe;
      } finally {
        if (we(G, {
          isGenerating: !1,
          errorMsg: void 0
        }), ve) try {
          rz(we, ve, "previewGenerationEnded");
        } catch {}
      }
    }, [r, a, y, E, t, n, C.bind, w, h, l]);
  return {
    generate: R,
    generateMusic: T,
    generateSpeech: P,
    runExpandImage: j,
    runEditImage: B,
    generateChartBatch: F
  };
};

async function Jfe(e) {
  var de, le, J, pe, ce, we, X, Z, re, fe, ye, ie, ae, be, Ee, xe, he, ue, ge, _e, ke, ve, Te, Ne, me, Ae, Fe, Me, Re, $e, rt, nt, ze, Le, Ke, Xe, De, Ye, Ce, He, Ve, it, It, Ft, We, Ze, Ge, Oe, st, vt, Ht, nn, pt, lt, gt, Ut, _t, At, Yt, qe, kt, St, hn, Qt, Ot, ln, Pn, rn, Yn, Ct, Cn, un, Jn, Kn, en, Vn, Tt, Ue, et, ft, ht, wt, jt, bt, Bt, wn, at, Pt, dt, xt, yn, gn, mt, Xt, Gn, rr, qn, Dn, Ar, _r, Pa, fa, Ca, $n, yr, Ir, Gr, Zr, La, sa, Ea, ba, ga, _a, $a, Ya, ta, ki, Wn, wr, jn, _n, ar, Vt, vn, An, ur, zr, Dr, Wr, gr, jr, ea, pa, Br, tn, Lr, br, Jr, Kr, ir, Hr, ha, Ga, Za, va, Kt, Pr, kr, Mr, Hn;
  const {
      node: t,
      currentModel: n,
      config: r,
      baseUrl: a,
      prompt: i,
      ratio: o,
      resolution: s,
      refImages: l,
      hasReferenceImage: d,
      isVideoGeneration: u,
      isMidjourney: h,
      isNanoBanana2: p,
      taskId: m,
      apiKey: f,
      getConnectedImageForInput: y,
      refMetaByRawUrl: b,
      setHistory: v,
      setHistoryProgressDeferred: _,
      updateNode: w,
      angleMetadata: k,
      storyboardJsonData: A,
      nodes: S,
      connections: C,
      markerMasks: I,
      expandMode: E
    } = e,
    M = async ($t, je) => {
      if (!(!I || I.length === 0)) try {
        const {
            base64ToBlob: Qe
          } = await Ie(async () => {
            const {
              base64ToBlob: Qn
            } = await Promise.resolve().then(() => Aoe);
            return {
              base64ToBlob: Qn
            };
          }, void 0, import.meta.url),
          Mt = I[0],
          cn = Qe(Mt.mask, "image/png");
        $t.append("mask", cn, "mask.png"), console.log(`[Generation] ✅ 已添加蒙版到 ${je} 请求`, {
          size: `${Mt.width}×${Mt.height}`,
          maskKb: Number((cn.size / 1024).toFixed(2))
        });
      } catch (Qe) {
        console.error(`[Generation] ❌ 添加蒙版到 ${je} 失败:`, Qe);
      }
    },
    T = !!((de = t.settings) != null && de.genUseAliyunOss),
    {
      isGlobalOssUploadEnabled: P
    } = await Ie(async () => {
      const {
        isGlobalOssUploadEnabled: $t
      } = await Promise.resolve().then(() => Ah);
      return {
        isGlobalOssUploadEnabled: $t
      };
    }, void 0, import.meta.url),
    R = T || P(),
    j = !!(I && I.length > 0),
    B = TCt(a),
    F = d && CCn(l, {
      useOssForApi: R,
      hasMask: j,
      baseUrl: a
    }),
    N = F ? MCt(l) : [];
  B && d && console.log("[Generation] shop.comfly.chat：网关不读参考图 URL，走画布 multipart/文件上传");
  const G = $t => {
      if (!k) return;
      const {
          rotation: je,
          tilt: Qe,
          scale: Mt
        } = k,
        cn = k.sceneMode;
      if (je === 0 && Qe === 0 && Mt === 1) {
        console.log("[Generation] 📸 导演相机模式：角度为默认值，使用默认重绘强度");
        return;
      }
      let Lt = .78;
      Lt = $lt(cn, Lt), $t.denoising_strength = Lt, console.log("[Generation] 📸 导演相机模式（JSON edits）：重绘强度", Lt, {
        sceneMode: cn || "character",
        rotation: je,
        tilt: Qe,
        scale: Mt
      });
    },
    z = async ($t, je) => {
      const Qe = je.find(Mt => {
        if (Mt.type === "gen-image") {
          if (Mt.content === $t) return !0;
          const Qn = (Mt.settings || {}).generatedImages;
          if (Qn != null && Qn.some(Lt => (Lt == null ? void 0 : Lt.thumbUrl) === $t || (Lt == null ? void 0 : Lt.fullUrl) === $t)) return !0;
        }
        if (Mt.type === "preview") {
          if (Mt.selectedPreviewImage === $t || Mt.content === $t) return !0;
          const cn = Mt.previewMjImages;
          if (cn != null && cn.includes($t)) return !0;
        }
        return !1;
      });
      if (!Qe) return null;
      if (Qe.type === "gen-image") {
        const Mt = Qe.settings || {},
          cn = Mt.generatedImages,
          Qn = (cn || []).find(Rt => (Rt == null ? void 0 : Rt.thumbUrl) === $t || (Rt == null ? void 0 : Rt.fullUrl) === $t),
          ct = (typeof (Qn == null ? void 0 : Qn.assetId) == "string" && Qn.assetId.trim() ? Qn.assetId.trim() : void 0) || Mt._contentAssetId || void 0,
          Dt = Mt._compactOriginalRelPath || void 0,
          bn = await Vm($t, ct ?? null, Dt ?? null);
        if (bn && bn.size > 0) return bn;
        for (const Rt of cn || []) {
          const fn = Rt == null ? void 0 : Rt.fullUrl;
          if (typeof fn == "string" && /^https?:\/\//i.test(fn) && fn !== $t) try {
            return await Ns(fn);
          } catch {}
        }
        return null;
      }
      if (Qe.type === "preview") {
        let Mt;
        if (Qe.selectedPreviewImage === $t) Mt = Qe._selectedImageAssetId;else if (Qe.content === $t) Mt = Qe._contentAssetId;else {
          const Qn = Qe.previewMjImages,
            Lt = (Qn == null ? void 0 : Qn.indexOf($t)) ?? -1;
          if (Lt >= 0) {
            const ct = Qe._previewMjAssetIds;
            Mt = ct == null ? void 0 : ct[Lt];
          }
        }
        const cn = await Vm($t, Mt ?? null, null);
        if (cn && cn.size > 0) return cn;
      }
      return null;
    },
    V = $t => {
      if (!$t) return {
        assetIds: [],
        localRelPaths: []
      };
      const je = $t.settings || {},
        Qe = [$t._contentAssetId, typeof je._assetId == "string" ? je._assetId : void 0, typeof je._contentAssetId == "string" ? je._contentAssetId : void 0, typeof je._localCacheAssetId == "string" ? je._localCacheAssetId : void 0, typeof je._selectedImageAssetId == "string" ? je._selectedImageAssetId : void 0];
      if (typeof je._projectFullAssetKey == "string" && je._projectFullAssetKey.trim()) {
        const Lt = typeof je._projectId == "string" && je._projectId.trim() ? je._projectId : "";
        Lt && Qe.push(`pm_${Lt}_${je._projectFullAssetKey.trim()}`);
      }
      ($t.type === "gen-image" || $t.type === "gen-video" || $t.type === "input-image") && Qe.push($t.id);
      const Mt = [];
      typeof je._compactOriginalRelPath == "string" && je._compactOriginalRelPath.trim() && Mt.push(je._compactOriginalRelPath.trim());
      const cn = new Set(),
        Qn = [];
      for (const Lt of Qe) {
        const ct = typeof Lt == "string" ? Lt.trim() : "";
        !ct || cn.has(ct) || (cn.add(ct), Qn.push(ct));
      }
      return {
        assetIds: Qn,
        localRelPaths: Mt
      };
    },
    O = $t => {
      if (!$t || !S) return null;
      const je = $t.trim();
      if (!je) return null;
      if (je.startsWith("local-asset://")) {
        const Qe = je.replace(/^local-asset:\/\//, "").trim();
        let Mt = Qe;
        try {
          const cn = decodeURIComponent(Qe);
          cn && (Mt = cn);
        } catch {}
        if (!Mt) return null;
        for (const cn of S) {
          if (cn.type !== "input-image") continue;
          const {
            assetIds: Qn
          } = V(cn);
          if (Qn.includes(Mt)) return cn;
        }
        return null;
      }
      for (const Qe of S) {
        if (Qe.type !== "input-image") continue;
        if (typeof Qe.content == "string" && Qe.content.trim() === je) return Qe;
        const Mt = Qe.settings ?? {},
          cn = Mt._blobUrl;
        if (typeof cn == "string" && cn.trim() === je) return Qe;
        for (const Qn of ["_canvasDisplayPreviewUrl", "_compactPreviewUrl", "_localPreviewUrl", "_originalUrl"]) {
          const Lt = Mt[Qn];
          if (typeof Lt == "string" && Lt.trim() === je) return Qe;
        }
      }
      return null;
    },
    L = $t => {
      const je = String($t || "").trim(),
        Qe = b == null ? void 0 : b.get(je),
        Mt = O(je),
        {
          assetIds: cn
        } = V(Mt),
        Qn = vm(je) || void 0;
      let Lt;
      if (je.startsWith("local-asset://")) {
        const bn = je.replace(/^local-asset:\/\//, "").trim();
        Lt = bn;
        try {
          const Rt = decodeURIComponent(bn);
          Rt && (Lt = Rt);
        } catch {}
      }
      const ct = (Qe == null ? void 0 : Qe.assetId) && String(Qe.assetId).trim() || Lt || Qn || cn[0],
        Dt = [ct, ...cn, Lt, Qn].filter(bn => typeof bn == "string" && bn.trim().length > 0).filter((bn, Rt, fn) => fn.indexOf(bn) === Rt);
      return {
        assetId: ct,
        assetIdHints: Dt,
        nodes: S,
        sourceNode: Mt ?? void 0
      };
    },
    D = async ($t, je) => {
      if (!($t != null && $t.startsWith("blob:"))) return null;
      try {
        const {
            recoverDeadBlobUrl: Qe
          } = await Ie(async () => {
            const {
              recoverDeadBlobUrl: ct
            } = await Promise.resolve().then(() => No);
            return {
              recoverDeadBlobUrl: ct
            };
          }, void 0, import.meta.url),
          Mt = je ?? O($t),
          {
            assetIds: cn,
            localRelPaths: Qn
          } = V(Mt),
          Lt = await Qe($t, cn.length > 0 ? cn : void 0, Qn.length > 0 ? Qn : void 0);
        if (Lt) return await Ns(Lt);
      } catch {}
      return null;
    },
    U = async $t => {
      var Qn, Lt;
      const {
          isCanvasLocalCacheMode: je
        } = await Ie(async () => {
          const {
            isCanvasLocalCacheMode: ct
          } = await Promise.resolve().then(() => So);
          return {
            isCanvasLocalCacheMode: ct
          };
        }, void 0, import.meta.url),
        Qe = {
          compressForApi: !1
        };
      try {
        const {
            prepareAssetForModel: ct,
            materializePreparedAssetBlob: Dt
          } = await Ie(async () => {
            const {
              prepareAssetForModel: fn,
              materializePreparedAssetBlob: Zt
            } = await Promise.resolve().then(() => up);
            return {
              prepareAssetForModel: fn,
              materializePreparedAssetBlob: Zt
            };
          }, void 0, import.meta.url),
          bn = L($t),
          Rt = await ct({
            assetRef: $t,
            modelId: n || "generic",
            purpose: "image-reference",
            requestedTransportMode: "direct-file",
            assetId: bn.assetId,
            assetIdHints: bn.assetIdHints,
            sourceNode: bn.sourceNode,
            nodes: bn.nodes
          });
        return await Dt(Rt);
      } catch (ct) {
        console.warn("[Generation] Phase3-D processImageForAPI prepare 失败，回退:", ct);
      }
      if (je()) try {
        return await zU($t, L($t));
      } catch (ct) {
        console.warn("[Generation] 本地原图解析失败，回退旧链路:", ct);
      }
      if (!S || !C) try {
        if (S && S.length > 0) {
          const ct = await z($t, S);
          if (ct) return ct;
        }
        return await Ns($t, Qe);
      } catch (ct) {
        const Dt = await D($t);
        if (Dt) return Dt;
        throw ct;
      }
      if (S && S.length > 0) {
        const ct = await z($t, S);
        if (ct) return ct;
      }
      if ($t.startsWith("canvas-node:")) {
        const ct = $t.replace("canvas-node:", ""),
          Dt = S.find(bn => bn.id === ct && bn.type === "canvas-node");
        if ((Qn = Dt == null ? void 0 : Dt.settings) != null && Qn.canvasData) try {
          const {
              drawCanvasToImage: bn,
              getBlobFromDataURL: Rt
            } = await Ie(async () => {
              const {
                drawCanvasToImage: an,
                getBlobFromDataURL: Rn
              } = await Promise.resolve().then(() => O0n);
              return {
                drawCanvasToImage: an,
                getBlobFromDataURL: Rn
              };
            }, void 0, import.meta.url),
            {
              getCanvasNodeEditorSize: fn
            } = await Ie(async () => {
              const {
                getCanvasNodeEditorSize: an
              } = await Promise.resolve().then(() => Iyn);
              return {
                getCanvasNodeEditorSize: an
              };
            }, void 0, import.meta.url),
            Zt = Dt.settings.canvasData,
            {
              width: Ln,
              height: tt
            } = fn(Dt.width, Dt.height),
            zt = await bn(Zt, Ln, tt, !1, !0);
          return await Rt(zt);
        } catch (bn) {
          throw console.error("[Generation] 导出画板失败:", bn), bn;
        }
      }
      const Mt = O($t);
      if (!Mt) try {
        return await Ns($t, Qe);
      } catch (ct) {
        const Dt = await D($t);
        if (Dt) return Dt;
        throw ct;
      }
      const cn = C.find(ct => ct.from === Mt.id && S.find(Dt => Dt.id === ct.to && Dt.type === "canvas-node"));
      if (cn) {
        const ct = S.find(Dt => Dt.id === cn.to);
        if ((Lt = ct == null ? void 0 : ct.settings) != null && Lt.canvasData) try {
          const {
              drawCanvasToImage: Dt,
              getBlobFromDataURL: bn
            } = await Ie(async () => {
              const {
                drawCanvasToImage: zt,
                getBlobFromDataURL: an
              } = await Promise.resolve().then(() => O0n);
              return {
                drawCanvasToImage: zt,
                getBlobFromDataURL: an
              };
            }, void 0, import.meta.url),
            {
              getCanvasNodeEditorSize: Rt
            } = await Ie(async () => {
              const {
                getCanvasNodeEditorSize: zt
              } = await Promise.resolve().then(() => Iyn);
              return {
                getCanvasNodeEditorSize: zt
              };
            }, void 0, import.meta.url),
            fn = ct.settings.canvasData,
            {
              width: Zt,
              height: Ln
            } = Rt(ct.width, ct.height),
            tt = await Dt(fn, Zt, Ln, !1, !0);
          return await bn(tt);
        } catch (Dt) {
          console.error("[Generation] 导出画板失败，使用原始图片:", Dt);
          try {
            return await Ns($t, Qe);
          } catch (bn) {
            const Rt = await D($t, Mt);
            if (Rt) return Rt;
            throw bn;
          }
        }
      }
      try {
        return await Ns($t, Qe);
      } catch (ct) {
        const Dt = await D($t, Mt);
        if (Dt) return Dt;
        throw ct;
      }
    },
    H = async $t => {
      if ($t.startsWith("data:") || $t.startsWith("http://") || $t.startsWith("https://")) return $t;
      try {
        const {
            prepareAssetForModel: Qe,
            toBase64String: Mt
          } = await Ie(async () => {
            const {
              prepareAssetForModel: Lt,
              toBase64String: ct
            } = await Promise.resolve().then(() => up);
            return {
              prepareAssetForModel: Lt,
              toBase64String: ct
            };
          }, void 0, import.meta.url),
          cn = L($t),
          Qn = await Qe({
            assetRef: $t,
            modelId: n || "generic",
            purpose: "image-reference",
            requestedTransportMode: "base64",
            assetId: cn.assetId,
            assetIdHints: cn.assetIdHints,
            sourceNode: cn.sourceNode,
            nodes: cn.nodes
          });
        return await Mt({
          prepared: Qn,
          pureBase64: !1
        });
      } catch (Qe) {
        console.warn("[Generation] Phase3-C processImageForVideoAPI prepare 失败，回退:", Qe);
      }
      const je = await U($t);
      return await Fu(je);
    };
  if (r != null && r.customProtocol) {
    let $t = d ? l : [];
    const je = ((le = r.localComfy) == null ? void 0 : le.model) === "h3",
      Qe = je && !!((J = t.settings) != null && J.veoFramesMode);
    if (Qe) {
      const Lt = wne({
        framesMode: !0,
        refImages: l,
        startPort: y(t.id, "veo_start"),
        endPort: y(t.id, "veo_end")
      });
      if (Lt.endFrameRaw && !Lt.startFrameRaw) throw new Error("H3 首尾帧模式需要先连接首帧");
      $t = [Lt.startFrameRaw, Lt.endFrameRaw].filter(ct => !!ct);
    }
    if (r.localComfy && $t.length > (je && !Qe ? 3 : 2)) throw new Error(je ? "H3 首尾帧最多 2 张图，参考模式最多 3 张图" : "本地 Flux 最多支持 2 张参考图");
    const Mt = (pe = I == null ? void 0 : I[0]) == null ? void 0 : pe.mask,
      cn = r.localComfy && !je ? {
        ...r.customProtocol,
        body: {
          ...r.customProtocol.body,
          mask: "$mask"
        }
      } : r.customProtocol,
      Qn = await Pqi({
        protocol: cn,
        baseUrl: a,
        modelName: r.modelName,
        canvasUiTemplateId: r.canvasUiTemplateId,
        settings: t.settings,
        quality: (ce = r.qualities) != null && ce.length ? r.qualities.includes(String(((we = t.settings) == null ? void 0 : we.gptImageQuality) || "")) ? String((X = t.settings) == null ? void 0 : X.gptImageQuality) : r.qualities[0] : void 0,
        prompt: i,
        ratio: o,
        resolution: r.localComfy && s === "Auto" ? je ? "720P" : "1K" : s,
        duration: (Z = t.settings) == null ? void 0 : Z.duration,
        seed: (re = t.settings) == null ? void 0 : re.seed,
        refImages: $t,
        mask: Mt ? Mt.startsWith("data:") ? Mt : `data:image/png;base64,${Mt}` : void 0
      }, {
        getBlob: U,
        toDataUrl: Fu,
        toRemoteUrl: async Lt => {
          if (/^https?:\/\//i.test(Lt)) return Lt;
          const {
              prepareAssetForModel: ct,
              toTemporaryPublicUrlString: Dt
            } = await Ie(async () => {
              const {
                prepareAssetForModel: Rt,
                toTemporaryPublicUrlString: fn
              } = await Promise.resolve().then(() => up);
              return {
                prepareAssetForModel: Rt,
                toTemporaryPublicUrlString: fn
              };
            }, void 0, import.meta.url),
            bn = await ct({
              assetRef: Lt,
              modelId: n,
              purpose: "image-reference",
              requestedTransportMode: "temporary-oss",
              ...L(Lt)
            });
          return Dt({
            prepared: bn,
            useMediaHosting: !0
          });
        }
      });
    return je && !(Qn.payload instanceof FormData) && (Qn.payload.mode = Qe ? "frames" : "reference"), r.localComfy && !(Qn.payload instanceof FormData) && Object.assign(Qn.payload, Kzt(r.localComfy.model || "flux", t.settings)), Qn;
  }
  const Y = $t => {
      const je = $t.trim();
      if (je.includes(",")) {
        const Qe = je.split(",")[1];
        return Qe ? Qe.trim() : je;
      }
      return je;
    },
    K = async $t => {
      let je;
      try {
        const {
            prepareAssetForModel: Qe,
            toBase64String: Mt
          } = await Ie(async () => {
            const {
              prepareAssetForModel: Lt,
              toBase64String: ct
            } = await Promise.resolve().then(() => up);
            return {
              prepareAssetForModel: Lt,
              toBase64String: ct
            };
          }, void 0, import.meta.url),
          cn = L($t),
          Qn = await Qe({
            assetRef: $t,
            modelId: "kling-v2.5-turbo",
            purpose: "image-reference",
            requestedTransportMode: "base64",
            assetId: cn.assetId,
            assetIdHints: cn.assetIdHints,
            sourceNode: cn.sourceNode,
            nodes: cn.nodes
          });
        je = await Mt({
          prepared: Qn,
          pureBase64: !1
        });
      } catch (Qe) {
        console.warn("[Kling] Phase3-B base64 失败，回退 processImageForVideoAPI:", Qe), je = await H($t);
      }
      try {
        const {
            getImageDimensions: Qe
          } = await Ie(async () => {
            const {
              getImageDimensions: Lt
            } = await Promise.resolve().then(() => pg);
            return {
              getImageDimensions: Lt
            };
          }, void 0, import.meta.url),
          Mt = await Qe(je),
          cn = je.startsWith("data:") && je.split(",")[1] || "",
          Qn = cn ? Math.ceil(cn.length * 3 / 4) : 0;
        console.log(`[Kling] 发参原图尺寸 ${Mt.w}x${Mt.h}, ~${(Qn / 1024).toFixed(0)}KB (应远大于画布 512 preview)`);
      } catch {}
      return Lk(n) || O2(n) || jv(n) ? await r5n(je) : je;
    },
    W = async $t => {
      const je = await H($t);
      return await a5n(je);
    };
  let Q = "",
    q = {},
    ne = !1;
  if (u) {
    const $t = ((fe = t.settings) == null ? void 0 : fe.duration) || Gj(n),
      je = parseInt($t.replace("s", ""), 10) || 8;
    if (m3(n)) {
      const {
        buildHuyaArtExtraVideoSubmit: Lt
      } = await Ie(async () => {
        const {
          buildHuyaArtExtraVideoSubmit: tr
        } = await Promise.resolve().then(() => g$r);
        return {
          buildHuyaArtExtraVideoSubmit: tr
        };
      }, void 0, import.meta.url);
      Q = s9((r == null ? void 0 : r.url) || a, n), ne = !1;
      const ct = b3(Q),
        Dt = t.settings || {},
        bn = !!Dt.veoFramesMode,
        {
          startFrameRaw: Rt,
          endFrameRaw: fn
        } = wne({
          framesMode: bn,
          refImages: l,
          startPort: y(t.id, "veo_start"),
          endPort: y(t.id, "veo_end")
        }),
        {
          imageUrlsRaw: Zt,
          videoUrlsRaw: Ln,
          audioUrlsRaw: tt
        } = iC({
          framesMode: bn,
          refImages: l,
          refMetaByRawUrl: b,
          videoPortRef: y(t.id, "video") || y(t.id, "reference_video"),
          audioPortRef: y(t.id, "audio") || y(t.id, "reference_audio")
        }),
        zt = (tr, kn) => FA(tr, ct, f, kn),
        [an, Rn, Un, er, Cr] = await Promise.all([Promise.all(Zt.slice(0, 7).map(tr => zt(tr, "image"))), Promise.all(Ln.slice(0, 1).map(tr => zt(tr, "video"))), Promise.all(tt.slice(0, 1).map(tr => zt(tr, "audio"))), Rt ? zt(Rt, "image") : Promise.resolve(""), fn ? zt(fn, "image") : Promise.resolve("")]);
      return q = Lt({
        modelId: n,
        prompt: i,
        ratio: String(Dt.ratio || o || ""),
        resolution: String(Dt.resolution || s || ""),
        duration: Dt.duration != null ? Dt.duration : $t,
        framesMode: bn,
        images: an,
        videos: Rn,
        audios: Un,
        startImage: er || void 0,
        endImage: Cr || void 0,
        keepOriginalSound: !!Dt.huyaKlingKeepOriginalSound
      }), console.log("[Huya Extra Video] submit", {
        endpoint: Q,
        model: n,
        payload: q
      }), {
        endpoint: Q,
        payload: q,
        useMultipart: ne
      };
    }
    if (AZ(n)) {
      const {
          resolveHuyaWan30SubmitEndpoint: Lt,
          buildHuyaWan30Parameters: ct,
          buildHuyaWan30SubmitPayload: Dt,
          fetchHuyaWan30ModelInfo: bn
        } = await Ie(async () => {
          const {
            resolveHuyaWan30SubmitEndpoint: Zn,
            buildHuyaWan30Parameters: Sr,
            buildHuyaWan30SubmitPayload: Bn,
            fetchHuyaWan30ModelInfo: Et
          } = await Promise.resolve().then(() => h0r);
          return {
            resolveHuyaWan30SubmitEndpoint: Zn,
            buildHuyaWan30Parameters: Sr,
            buildHuyaWan30SubmitPayload: Bn,
            fetchHuyaWan30ModelInfo: Et
          };
        }, void 0, import.meta.url),
        {
          ensureHuyaMiniMaxH3MediaHttpUrl: Rt
        } = await Ie(async () => {
          const {
            ensureHuyaMiniMaxH3MediaHttpUrl: Zn
          } = await Promise.resolve().then(() => Q1e);
          return {
            ensureHuyaMiniMaxH3MediaHttpUrl: Zn
          };
        }, void 0, import.meta.url),
        {
          endpoint: fn,
          openApiRoot: Zt
        } = Lt((r == null ? void 0 : r.url) || a, n);
      Q = fn, ne = !1;
      const Ln = t.settings || {},
        tt = !!Ln.veoFramesMode,
        zt = String(Ln.ratio || o || "16:9"),
        an = String(Ln.resolution || s || "1080P"),
        Rn = String(Ln.duration || $t || "5s"),
        {
          startFrameRaw: Un,
          endFrameRaw: er
        } = wne({
          framesMode: tt,
          refImages: l,
          startPort: y(t.id, "veo_start"),
          endPort: y(t.id, "veo_end")
        }),
        {
          imageUrlsRaw: Cr,
          videoUrlsRaw: tr,
          audioUrlsRaw: kn
        } = iC({
          framesMode: tt,
          refImages: l,
          refMetaByRawUrl: b,
          videoPortRef: y(t.id, "video") || y(t.id, "reference_video"),
          audioPortRef: y(t.id, "audio") || y(t.id, "reference_audio")
        }),
        [xn, Fn, cr, vr, Wt] = await Promise.all([Promise.all(Cr.slice(0, 10).map(Zn => Rt(Zn, Zt, f, "image"))), Promise.all(tr.slice(0, 5).map(Zn => Rt(Zn, Zt, f, "video"))), Promise.all(kn.slice(0, 5).map(Zn => Rt(Zn, Zt, f, "audio"))), Un ? Rt(Un, Zt, f, "image") : Promise.resolve(""), er ? Rt(er, Zt, f, "image") : Promise.resolve("")]);
      if (tt && !vr) throw new Error("虎牙万相3.0 首尾帧模式需要首帧图片");
      const Jt = await bn({
        openApiRoot: Zt,
        bearerToken: f,
        framesMode: tt,
        model: r == null ? void 0 : r.modelName
      });
      console.log("[Huya Wan3.0] model/info", {
        framesMode: tt,
        ok: Jt.ok,
        model: Jt.model,
        httpStatus: Jt.httpStatus,
        errorMsg: Jt.errorMsg,
        rules: Jt.parameterRules.map(Zn => Zn.name).filter(Boolean)
      });
      const Nn = xn.length > 0 || Fn.length > 0 || cr.length > 0 || !!vr,
        En = ct({
          framesMode: tt,
          prompt: i.trim() || (Nn ? "请参考输入素材生成视频" : "生成视频"),
          durationUi: Rn,
          resolutionUi: an,
          ratioUi: zt,
          audio: Ln.huyaWanAudio !== !1,
          promptExtend: !!(Ln.promptExtend ?? Ln.huyaWanPromptExtend),
          watermark: !!Ln.huyaWanWatermark,
          seed: Ln.seed != null && Number.isFinite(Number(Ln.seed)) ? Number(Ln.seed) : null,
          imageUrls: xn,
          videoUrls: Fn,
          audioUrls: cr,
          startImage: vr || void 0,
          endImage: Wt || void 0
        });
      return q = Dt({
        framesMode: tt,
        parameters: En,
        model: r == null ? void 0 : r.modelName
      }), console.log("[Huya Wan3.0] submit", {
        endpoint: Q,
        framesMode: tt,
        model: q.model,
        parameters: En
      }), {
        endpoint: Q,
        payload: q,
        useMultipart: ne
      };
    }
    if (ug(n)) {
      const {
          resolveHuyaMiniMaxH3SubmitEndpoint: Lt,
          resolveHuyaMiniMaxH3TaskType: ct,
          buildHuyaMiniMaxH3Parameters: Dt,
          buildHuyaMiniMaxH3SubmitPayload: bn,
          fetchHuyaMiniMaxH3ModelInfo: Rt
        } = await Ie(async () => {
          const {
            resolveHuyaMiniMaxH3SubmitEndpoint: En,
            resolveHuyaMiniMaxH3TaskType: Zn,
            buildHuyaMiniMaxH3Parameters: Sr,
            buildHuyaMiniMaxH3SubmitPayload: Bn,
            fetchHuyaMiniMaxH3ModelInfo: Et
          } = await Promise.resolve().then(() => yUt);
          return {
            resolveHuyaMiniMaxH3SubmitEndpoint: En,
            resolveHuyaMiniMaxH3TaskType: Zn,
            buildHuyaMiniMaxH3Parameters: Sr,
            buildHuyaMiniMaxH3SubmitPayload: Bn,
            fetchHuyaMiniMaxH3ModelInfo: Et
          };
        }, void 0, import.meta.url),
        {
          endpoint: fn,
          openApiRoot: Zt
        } = Lt((r == null ? void 0 : r.url) || a);
      Q = fn, ne = !1;
      const Ln = t.settings || {},
        tt = !!Ln.veoFramesMode,
        zt = J5e(Ln.duration != null ? Ln.duration : $t),
        {
          startFrameRaw: an,
          endFrameRaw: Rn
        } = wne({
          framesMode: tt,
          refImages: l,
          startPort: y(t.id, "veo_start"),
          endPort: y(t.id, "veo_end")
        }),
        {
          imageUrlsRaw: Un,
          videoUrlsRaw: er,
          audioUrlsRaw: Cr
        } = iC({
          framesMode: tt,
          refImages: l,
          refMetaByRawUrl: b,
          videoPortRef: y(t.id, "video") || y(t.id, "reference_video"),
          audioPortRef: y(t.id, "audio") || y(t.id, "reference_audio")
        }),
        [tr, kn, xn, Fn, cr] = await Promise.all([Promise.all(Un.slice(0, 9).map(En => FA(En, Zt, f, "image"))), Promise.all(er.slice(0, 3).map(En => FA(En, Zt, f, "video"))), Promise.all(Cr.slice(0, 3).map(En => FA(En, Zt, f, "audio"))), an ? FA(an, Zt, f, "image") : Promise.resolve(""), Rn ? FA(Rn, Zt, f, "image") : Promise.resolve("")]);
      if (tt && !Fn && !cr) throw new Error("虎牙 MiniMax-H3 首尾帧模式需要至少一张首帧或尾帧图片");
      const vr = ct({
          imageCount: tr.length,
          videoCount: kn.length
        }),
        Wt = await Rt({
          openApiRoot: Zt,
          bearerToken: f,
          framesMode: tt,
          model: (r == null ? void 0 : r.modelName) || lX,
          type: vr
        });
      console.log("[Huya MiniMax-H3] model/info", {
        framesMode: tt,
        type: vr,
        ok: Wt.ok,
        model: Wt.model,
        httpStatus: Wt.httpStatus,
        errorMsg: Wt.errorMsg,
        rules: Wt.parameterRules.map(En => En.name).filter(Boolean)
      });
      const Jt = tr.length > 0 || kn.length > 0 || xn.length > 0 || !!(Fn || cr),
        Nn = Dt({
          type: vr,
          framesMode: tt,
          prompt: i.trim() || (Jt ? "请参考输入素材生成视频" : "生成视频"),
          durationSec: zt,
          resolutionUi: String(Ln.resolution || s || "2K"),
          ratioUi: String(Ln.ratio || o || "16:9"),
          images: tr,
          videos: kn,
          audio: xn,
          startImage: Fn || void 0,
          endImage: cr || void 0
        });
      return q = bn({
        type: vr,
        framesMode: tt,
        parameters: Nn,
        model: (r == null ? void 0 : r.modelName) || lX,
        provider: gce
      }), console.log("[Huya MiniMax-H3] submit", {
        endpoint: Q,
        framesMode: tt,
        type: vr,
        model: (ye = q.model) == null ? void 0 : ye.model,
        durationUi: zt,
        durationApi: Nn.duration,
        durationType: typeof Nn.duration,
        settingsDuration: Ln.duration,
        parameters: Nn
      }), {
        endpoint: Q,
        payload: q,
        useMultipart: ne
      };
    }
    if (fg(n)) {
      const {
          resolveHuyaKlingSubmitEndpoint: Lt,
          resolveHuyaKlingTaskType: ct,
          buildHuyaKlingParameters: Dt,
          buildHuyaKlingSubmitPayload: bn,
          fetchHuyaKlingModelInfo: Rt
        } = await Ie(async () => {
          const {
            resolveHuyaKlingSubmitEndpoint: Zn,
            resolveHuyaKlingTaskType: Sr,
            buildHuyaKlingParameters: Bn,
            buildHuyaKlingSubmitPayload: Et,
            fetchHuyaKlingModelInfo: zn
          } = await Promise.resolve().then(() => bUt);
          return {
            resolveHuyaKlingSubmitEndpoint: Zn,
            resolveHuyaKlingTaskType: Sr,
            buildHuyaKlingParameters: Bn,
            buildHuyaKlingSubmitPayload: Et,
            fetchHuyaKlingModelInfo: zn
          };
        }, void 0, import.meta.url),
        {
          endpoint: fn,
          openApiRoot: Zt
        } = Lt((r == null ? void 0 : r.url) || a, n);
      Q = fn, ne = !1;
      const Ln = t.settings || {};
      Ln.veoFramesMode;
      const tt = String(Ln.ratio || o || "Auto"),
        zt = !!Ln.klingV3MultiShot,
        {
          imageCandidates: an,
          startFrameRaw: Rn,
          endFrameRaw: Un,
          videoPortRaw: er
        } = zro({
          refImages: l,
          startPort: y(t.id, "veo_start"),
          endPort: y(t.id, "veo_end"),
          videoPort: y(t.id, "video") || y(t.id, "reference_video")
        }),
        [Cr, tr, kn, xn] = await Promise.all([Promise.all(an.slice(0, 7).map(Zn => FA(Zn, Zt, f, "image"))), Rn ? FA(Rn, Zt, f, "image") : Promise.resolve(""), Un ? FA(Un, Zt, f, "image") : Promise.resolve(""), er ? FA(er, Zt, f, "video") : Promise.resolve("")]),
        Fn = tr || ($j(n) || !L2(n)) && Cr[0] || "",
        cr = kn || "",
        vr = Ln.klingSubjects || [],
        Wt = ct({
          configId: n,
          imageCount: L2(n) ? Cr.length : Fn ? 1 : 0,
          multiShot: zt
        });
      if (Wt === "image2video" && !zt) {
        if (L2(n)) {
          if (!Cr.length && !xn) throw new Error("虎牙可灵 V3 Omni 需要至少一张参考图或一段参考视频");
        } else if ($j(n)) {
          if (!Fn) throw new Error("虎牙可灵 V2.1-大师版需要一张参考图");
        } else if (!Fn) throw new Error("虎牙可灵图生视频需要首帧/参考图");
      }
      const Jt = await Rt({
        openApiRoot: Zt,
        bearerToken: f,
        configId: n,
        type: Wt,
        model: r == null ? void 0 : r.modelName
      });
      console.log("[Huya Kling] model/info", {
        configId: n,
        type: Wt,
        ok: Jt.ok,
        httpStatus: Jt.httpStatus,
        errorMsg: Jt.errorMsg,
        rules: Jt.parameterRules.map(Zn => Zn.name).filter(Boolean)
      });
      const Nn = String(Ln.resolution || s || ""),
        En = Dt({
          configId: n,
          type: Wt,
          prompt: i.trim() || (Fn || Cr.length || xn ? "请参考输入素材生成视频" : "生成视频"),
          durationSec: Number.isFinite(je) ? je : 5,
          modeUi: Nn,
          ratioUi: tt,
          sound: !!Ln.huyaKlingSound,
          keepOriginalSound: !!Ln.huyaKlingKeepOriginalSound || !!xn && !!Ln.huyaKlingSound,
          negativePrompt: String(Ln.negativePrompt || ""),
          startImage: Fn || void 0,
          endImage: cr || void 0,
          imageList: L2(n) ? Cr : void 0,
          videoUrl: xn || void 0,
          subjectIds: vr,
          multiShot: zt,
          shotType: Ln.klingV3ShotType || "intelligence",
          multiPrompt: Ln.klingV3MultiPrompt
        });
      return q = bn({
        configId: n,
        type: Wt,
        parameters: En,
        model: r == null ? void 0 : r.modelName
      }), console.log("[Huya Kling] submit", {
        endpoint: Q,
        type: Wt,
        model: q.model,
        parameters: En
      }), {
        endpoint: Q,
        payload: q,
        useMultipart: ne
      };
    }
    if (GS(n)) {
      const {
        isHuya20: Lt,
        isHuya25: ct,
        isHuya20Or25: Dt,
        isHuya1510: bn,
        isHuya20Pro: Rt,
        brandLabel: fn,
        endpoint: Zt,
        openApiRoot: Ln
      } = RKi({
        currentModel: n,
        configUrl: r == null ? void 0 : r.url,
        baseUrl: a
      });
      Q = Zt, ne = !1;
      const tt = NKi({
          currentModel: n,
          durationNum: je,
          durationSetting: String(((ie = t.settings) == null ? void 0 : ie.duration) || `${je}s`),
          resolution: s,
          ratio: o,
          generateAudio: (ae = t.settings) == null ? void 0 : ae.seedanceVolcGenerateAudio,
          outputFormat: String(((be = t.settings) == null ? void 0 : be.seedanceOutputFormat) || "mp4"),
          mcpWebSearch: !!((Ee = t.settings) != null && Ee.seedanceVolcMcpWebSearch),
          cameraFixed: !!((xe = t.settings) != null && xe.seedanceVolcCameraFixed),
          nsfw: !!((he = t.settings) != null && he.seedanceVolcNsfw)
        }),
        zt = y(t.id, "veo_start"),
        an = y(t.id, "veo_end");
      let Rn = (ue = t.settings) == null ? void 0 : ue.seedanceMaterials;
      const Un = y(t.id, "video") || y(t.id, "reference_video"),
        er = y(t.id, "audio") || y(t.id, "reference_audio"),
        Cr = Un ? [Un] : [],
        tr = er ? [er] : [];
      let kn = !1;
      if (Dt) {
        const {
            isGlobalOssUploadEnabled: cr
          } = await Ie(async () => {
            const {
              isGlobalOssUploadEnabled: Nn
            } = await Promise.resolve().then(() => Ah);
            return {
              isGlobalOssUploadEnabled: Nn
            };
          }, void 0, import.meta.url),
          vr = !vCr() && (!!((ge = t.settings) != null && ge.genUseAliyunOss) || cr());
        if (vr && (Rn != null && Rn.length)) try {
          Rn = await c0t(Rn, {
            nodes: S,
            connections: C,
            targetNodeId: t.id
          });
        } catch (Nn) {
          const En = Nn instanceof Error ? Nn.message : "多素材 OSS 上传失败";
          throw new Error(En);
        }
        const Wt = await vmr({
          materials: Rn,
          startFrame: zt || void 0,
          endFrame: an || void 0,
          refImages: l,
          videoRefs: Cr,
          audioRefs: tr,
          openApiRoot: Ln,
          apiKey: f,
          processImageForVideo: H,
          useAliyunOss: vr,
          nodes: S,
          connections: C,
          targetNodeId: t.id
        });
        if (kn = Wt.images.length > 0 || Wt.video.length > 0 || Wt.audio.length > 0, kn) {
          if (tt.images = Wt.images, Wt.video.length > 0 && (tt.video = Wt.video), Wt.audio.length > 0 && (tt.audio = Wt.audio), Wt.video.length > 0 && (ct || Lt)) {
            const Zn = (Rn || []).filter(Bn => Bn.type === "video").map((Bn, Et) => {
                var Yr;
                const zn = j2e(Bn.id, t.id, C, S),
                  Mn = zn == null ? void 0 : zn.videoMeta,
                  or = Number(Mn == null ? void 0 : Mn.duration),
                  mr = Number((Yr = zn == null ? void 0 : zn.settings) == null ? void 0 : Yr._originalSize);
                return {
                  url: String(Bn.url || Bn.assetUrl || "").trim(),
                  label: Bn.name || `视频${Et + 1}`,
                  knownDurationSec: Number.isFinite(or) && or > 0 ? or : void 0,
                  width: Number(Mn == null ? void 0 : Mn.w) > 0 ? Number(Mn == null ? void 0 : Mn.w) : void 0,
                  height: Number(Mn == null ? void 0 : Mn.h) > 0 ? Number(Mn == null ? void 0 : Mn.h) : void 0,
                  fileSize: Number.isFinite(mr) && mr > 0 ? mr : void 0
                };
              }),
              Sr = new Set(Zn.map(Bn => RM(Bn.url)).filter(Boolean));
            for (const Bn of Cr) {
              if (!Bn) continue;
              const Et = RM(Bn);
              Et && Sr.has(Et) || (Sr.add(Et), Zn.push({
                url: Bn,
                label: "参考视频",
                knownDurationSec: void 0
              }));
            }
            await xAt({
              variant: ct ? "2.5" : "2.0",
              sources: Zn,
              resolvedUrls: Wt.video
            });
          }
          const Nn = jKi({
            mediaRoleMode: Wt.roleMode,
            imageCount: Wt.images.length,
            videoCount: Wt.video.length,
            audioCount: Wt.audio.length,
            startFrame: zt,
            endFrame: an,
            veoFramesMode: !!((_e = t.settings) != null && _e.veoFramesMode)
          });
          DKi(tt, {
            isHuya25: ct,
            roleMode: Nn,
            hasRefVideo: Wt.video.length > 0
          });
        }
        Array.isArray(tt.images) && (tt.images = OKi(tt.images, fn, ya));
        const Jt = Array.isArray(tt.images) ? tt.images.filter(Nn => /^https?:\/\//i.test(String(Nn))) : [];
        if (tt.isUploadAsset = BKi(Jt.length, (ke = t.settings) == null ? void 0 : ke.seedanceVolcIsUploadAsset), tt.isUploadAsset && Jt.length > 0) {
          const Nn = Math.min(12e4, 12e3 + Jt.length * 18e3);
          w(t.id, {
            settings: {
              ...(t.settings || {}),
              progress: 5,
              isGenerating: !0
            }
          }), v(En => En.map(Zn => Zn.id === m ? {
            ...Zn,
            status: "generating",
            progress: 5,
            errorMsg: `真人素材报备审核中，约 ${Math.round(Nn / 1e3)}s 后提交…`
          } : Zn)), await new Promise(En => setTimeout(En, Nn));
        }
      } else if (bn && (zt || an || l.length > 0)) {
        const cr = {},
          {
            startSource: vr,
            endSource: Wt
          } = PKi({
            startFrame: zt,
            defaultFrame: y(t.id, "default"),
            endFrame: an,
            refImages: l
          });
        vr && (cr.start = await _At(vr, Ln, f, H, L(vr))), Wt && (cr.end = await _At(Wt, Ln, f, H, L(Wt))), tt.images = cr, kn = !0;
      }
      tt.prompt = FKi(i, kn);
      const xn = zKi(kn);
      UKi({
        isHuya20: Lt,
        isHuya20Pro: Rt,
        hasReference: kn,
        mcpWebSearch: !!((ve = t.settings) != null && ve.seedanceVolcMcpWebSearch)
      }) && (tt.mcpList = ["web_search"]);
      const Fn = $Ki({
        currentModel: n,
        configModelName: r == null ? void 0 : r.modelName,
        parameters: tt,
        taskType: xn
      });
      return q = Fn, Fn.model.model, {
        endpoint: Q,
        payload: q,
        useMultipart: ne
      };
    }
    const Qe = t.type === "motion-control",
      Mt = y(t.id, "veo_start"),
      cn = y(t.id, "veo_end"),
      Qn = WKi({
        currentModel: n,
        baseUrl: a,
        isMotionControlNode: Qe,
        hasStartFrame: !!Mt,
        hasEndFrame: !!cn,
        hasReferenceImage: l.length > 0,
        settings: t.settings
      });
    if (Qn) {
      const {
        variant: Lt,
        mode: ct,
        hasStartFrame: Dt,
        hasEndFrame: bn
      } = Qn;
      Q = Qn.endpoint;
      const Rt = async (fn, Zt) => {
        let Ln = String(fn || "").trim();
        if (!Ln) throw new Error(`缺少${Zt === "video" ? "参考视频" : "参考图片"}`);
        if (R2(Ln)) return Zt === "video" ? N2e(Ln) : Ln;
        let tt;
        if (Ln.startsWith("blob:") || vs(Ln)) {
          const xn = await fetch(Ln);
          if (!xn.ok) throw new Error(`无法读取本地${Zt === "video" ? "视频" : "图片"}`);
          tt = await xn.blob(), Zt === "image" && (tt = await lve(tt));
        } else tt = await Ns(Ln, {
          compressForApi: Zt === "image"
        });
        const zt = tt.type || (Zt === "video" ? "video/mp4" : "image/jpeg"),
          an = Zt === "video" ? ".mp4" : ".jpg",
          Rn = new File([tt], `kling-fal-${Zt}${an}`, {
            type: zt
          }),
          Un = new FormData();
        Un.append("file", Rn);
        const er = await fetch(`${a}/v1/files`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${f}`
          },
          body: Un
        });
        if (!er.ok) {
          const xn = await er.text().catch(() => "");
          throw new Error(`上传${Zt}失败: ${er.status} ${xn.slice(0, 120)}`);
        }
        const Cr = await er.json(),
          tr = Cr.data && typeof Cr.data == "object" ? Cr.data : null;
        let kn = String(Cr.url || Cr.file_url || Cr.download_url || "") || String((tr == null ? void 0 : tr.url) || (tr == null ? void 0 : tr.file_url) || (tr == null ? void 0 : tr.download_url) || "");
        if (!kn && (Cr.id || tr != null && tr.id)) {
          const xn = String(Cr.id || (tr == null ? void 0 : tr.id));
          kn = `${a}/v1/files/${xn}/content`;
        }
        if (!kn) throw new Error(`上传${Zt}未返回 URL`);
        return kn.startsWith("/") ? `${a}${kn}` : kn;
      };
      if (ct === "motion") {
        if (!w9n(Lt)) {
          const Ln = GKi;
          return w(t.id, {
            isGenerating: !1,
            errorMsg: Ln
          }), v(tt => tt.map(zt => zt.id === m ? {
            ...zt,
            status: "failed",
            progress: 0,
            errorMsg: Ln
          } : zt)), null;
        }
        const {
          imageRaw: fn,
          videoRaw: Zt
        } = QKi({
          settingsImageUrl: (me = (Ne = (Te = t.settings) == null ? void 0 : Te.klingImages) == null ? void 0 : Ne[0]) == null ? void 0 : me.url,
          refImages: l,
          settingsVideoUrl: (Ae = t.settings) == null ? void 0 : Ae.klingVideoUrl,
          connectedVideoUrl: Jpn(S, C, t.id)
        });
        try {
          let Ln, tt;
          if (R) {
            const {
              resolveChatReferenceVideoUrlForApi: zt,
              resolveGenReferenceUrlsForApi: an
            } = await Ie(async () => {
              const {
                resolveChatReferenceVideoUrlForApi: Un,
                resolveGenReferenceUrlsForApi: er
              } = await Promise.resolve().then(() => Mc);
              return {
                resolveChatReferenceVideoUrlForApi: Un,
                resolveGenReferenceUrlsForApi: er
              };
            }, void 0, import.meta.url);
            Ln = (fn ? await an([fn], {
              useOss: !0
            }) : [])[0] || "", tt = await zt(Zt, {
              useOss: !0,
              apiKey: f,
              baseUrl: a
            });
          } else Ln = await Rt(fn, "image"), tt = await Rt(Zt, "video");
          q = YKi({
            prompt: i,
            imageUrl: Ln,
            videoUrl: tt,
            characterOrientation: qKi(t.settings),
            keepOriginalSound: KKi(t.settings)
          });
        } catch (Ln) {
          const tt = Ln.message || "动作迁移素材处理失败";
          return w(t.id, {
            isGenerating: !1,
            errorMsg: tt
          }), v(zt => zt.map(an => an.id === m ? {
            ...an,
            status: "failed",
            progress: 0,
            errorMsg: tt
          } : an)), null;
        }
      } else {
        let fn, Zt;
        if (ct === "i2v") {
          const {
            startSource: Ln,
            endSource: tt
          } = XKi({
            mode: ct,
            hasStartFrame: Dt,
            hasEndFrame: bn,
            startUrl: Mt,
            endUrl: cn,
            refImages: l
          });
          if (!Ln) {
            const an = VKi;
            return w(t.id, {
              isGenerating: !1,
              errorMsg: an
            }), v(Rn => Rn.map(Un => Un.id === m ? {
              ...Un,
              status: "failed",
              progress: 0,
              errorMsg: an
            } : Un)), null;
          }
          const [zt] = await Gl([Ln]);
          if (!zt) {
            const an = HKi;
            return w(t.id, {
              isGenerating: !1,
              errorMsg: an
            }), v(Rn => Rn.map(Un => Un.id === m ? {
              ...Un,
              status: "failed",
              progress: 0,
              errorMsg: an
            } : Un)), null;
          }
          if (fn = zt, tt) {
            const [an] = await Gl([tt]);
            an && (Zt = an);
          }
        }
        q = ZKi({
          variant: Lt,
          mode: ct,
          prompt: i,
          durationSetting: String(((Fe = t.settings) == null ? void 0 : Fe.duration) || je),
          ratio: o,
          settings: t.settings,
          startImageUrl: fn,
          endImageUrl: Zt
        });
      }
      return console.log(`[Kling Fal] ${Lt}/${ct} POST`, Q, q), {
        endpoint: Q,
        payload: q,
        useMultipart: ne
      };
    } else if (Qe && aQi(n)) {
      Q = iQi(a).endpoint;
      const Lt = (i || "").trim(),
        ct = sQi({
          settingsUrl: ($e = (Re = (Me = t.settings) == null ? void 0 : Me.klingImages) == null ? void 0 : Re[0]) == null ? void 0 : $e.url,
          refImage: l && l.length > 0 ? l[0] : void 0,
          connectedUrl: oQi(S, C, t.id)
        }),
        Dt = lQi({
          settingsUrl: (rt = t.settings) == null ? void 0 : rt.klingVideoUrl,
          connectedUrl: Jpn(S, C, t.id)
        }),
        bn = cQi(a),
        Rt = async (Cr, tr) => {
          const kn = new FormData();
          kn.append("file", Cr);
          const xn = await fetch(`${a}/v1/files`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${f}`
            },
            body: kn
          });
          if (!xn.ok) throw new Error(`[MotionControl] 上传 ${tr} 到 files 失败: ${xn.status} ${xn.statusText}`);
          const Fn = await xn.json();
          return console.log("[MotionControl] /v1/files upload response:", {
            fileKind: tr,
            hasId: !!(Fn != null && Fn.id),
            keys: Fn ? Object.keys(Fn) : [],
            urlHead: Fn != null && Fn.url ? String(Fn.url).slice(0, 80) : void 0,
            idHead: Fn != null && Fn.id ? String(Fn.id).slice(0, 30) : void 0
          }), emn({
            data: Fn,
            fileKind: tr,
            baseUrl: a
          });
        },
        fn = async (Cr, tr) => {
          try {
            return await Rt(Cr, tr);
          } catch (kn) {
            if (!rmn(kn)) throw kn;
            return await OF(kn);
          }
        },
        Zt = async (Cr, tr) => {
          try {
            return await Ln(Cr, tr);
          } catch (kn) {
            if (!rmn(kn)) throw kn;
            return await OF(kn);
          }
        },
        Ln = async (Cr, tr) => {
          const kn = Cr.trim();
          if (!kn) return "";
          if (dQi(kn, bn)) return kn;
          const xn = rgr();
          let Fn = null;
          try {
            const {
                prepareAssetForModel: Jt,
                toMultipartFile: Nn
              } = await Ie(async () => {
                const {
                  prepareAssetForModel: Bn,
                  toMultipartFile: Et
                } = await Promise.resolve().then(() => up);
                return {
                  prepareAssetForModel: Bn,
                  toMultipartFile: Et
                };
              }, void 0, import.meta.url),
              En = tr === "image" ? L(kn) : void 0,
              Zn = await Jt({
                assetRef: kn,
                modelId: "kling-motion-control",
                purpose: tr === "video" ? "video-reference" : "image-reference",
                requestedTransportMode: "direct-file",
                allowReadVideoBlob: tr === "video",
                assetId: En == null ? void 0 : En.assetId,
                assetIdHints: En == null ? void 0 : En.assetIdHints,
                sourceNode: En == null ? void 0 : En.sourceNode,
                nodes: En == null ? void 0 : En.nodes
              }),
              Sr = await Nn({
                prepared: Zn,
                allowReadVideoBlob: tr === "video",
                fileName: `${tr}-motion-control${tmn(Zn.type === "local-file" ? Zn.mimeType : tr === "video" ? "video/mp4" : "image/png", tr)}`
              });
            if (Sr.file.size > xn) throw new Error(nmn(tr));
            Fn = Sr.file;
          } catch (Jt) {
            console.warn("[MotionControl] Phase3-C prepare multipart 失败，回退 getBlobFromUrl:", Jt);
          }
          if (!Fn) {
            const Jt = await Ns(kn),
              Nn = Jt.type || "video/mp4";
            if (Jt.size > xn) throw new Error(nmn(tr));
            Fn = new File([Jt], `${tr}-motion-control${tmn(Nn, tr)}`, {
              type: Nn
            });
          }
          const cr = new FormData();
          cr.append("file", Fn);
          const vr = await fetch(`${a}/v1/files`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${f}`
            },
            body: cr
          });
          if (!vr.ok) throw new Error(`[MotionControl] 上传 ${tr} 到 files 失败: ${vr.status} ${vr.statusText}`);
          const Wt = await vr.json();
          return console.log("[MotionControl] /v1/files upload response (by url):", {
            fileKind: tr,
            hasId: !!(Wt != null && Wt.id),
            keys: Wt ? Object.keys(Wt) : [],
            urlHead: Wt != null && Wt.url ? String(Wt.url).slice(0, 80) : void 0,
            idHead: Wt != null && Wt.id ? String(Wt.id).slice(0, 30) : void 0
          }), emn({
            data: Wt,
            fileKind: tr,
            baseUrl: a
          });
        },
        tt = (Le = (ze = (nt = t.settings) == null ? void 0 : nt.klingImages) == null ? void 0 : ze[0]) == null ? void 0 : Le.file,
        zt = (Ke = t.settings) == null ? void 0 : Ke.klingVideoFile,
        Un = tt ? await (async Cr => {
          const tr = await Fu(Cr);
          return Y(tr);
        })(tt) : ct ? await (async Cr => {
          const tr = Cr.trim();
          if (!tr) return "";
          if (tr.startsWith("data:image")) return Y(tr);
          try {
            const {
                prepareAssetForModel: Fn,
                toBase64String: cr
              } = await Ie(async () => {
                const {
                  prepareAssetForModel: Jt,
                  toBase64String: Nn
                } = await Promise.resolve().then(() => up);
                return {
                  prepareAssetForModel: Jt,
                  toBase64String: Nn
                };
              }, void 0, import.meta.url),
              vr = L(tr),
              Wt = await Fn({
                assetRef: tr,
                modelId: "kling-motion-control",
                purpose: "image-reference",
                requestedTransportMode: "base64",
                assetId: vr.assetId,
                assetIdHints: vr.assetIdHints,
                sourceNode: vr.sourceNode,
                nodes: vr.nodes
              });
            return await cr({
              prepared: Wt,
              pureBase64: !0
            });
          } catch (Fn) {
            console.warn("[MotionControl] Phase3-C 图 base64 失败，回退:", Fn);
          }
          const kn = await Ns(tr),
            xn = await Fu(kn);
          return Y(xn);
        })(ct) : "";
      let er = "";
      if (R) {
        const {
          resolveChatReferenceVideoUrlForApi: Cr
        } = await Ie(async () => {
          const {
            resolveChatReferenceVideoUrlForApi: tr
          } = await Promise.resolve().then(() => Mc);
          return {
            resolveChatReferenceVideoUrlForApi: tr
          };
        }, void 0, import.meta.url);
        if (zt) {
          const tr = URL.createObjectURL(zt);
          try {
            er = await Cr(tr, {
              useOss: !0,
              apiKey: f,
              baseUrl: a
            });
          } finally {
            URL.revokeObjectURL(tr);
          }
        } else Dt && (er = await Cr(Dt, {
          useOss: !0,
          apiKey: f,
          baseUrl: a
        }));
      } else er = zt ? await fn(zt, "video") : Dt ? await Zt(Dt, "video") : "";
      return console.log("[MotionControl] normalized payload (debug):", {
        image_base64_head: Un ? Un.slice(0, 60) : "",
        image_base64_len: Un ? Un.length : 0,
        video_url_head: er ? er.slice(0, 60) : ""
      }), Lt ? hQi(Un) ? !er || !mQi(er) ? (alert(x("请上传参考视频（动作迁移需要 video_url）")), w(t.id, {
        isGenerating: !1,
        errorMsg: nQi
      }), null) : (q = fQi({
        modelName: (r == null ? void 0 : r.modelName) || n,
        prompt: Lt,
        imageBase64: Un,
        videoUrl: er,
        characterOrientation: ((Xe = t.settings) == null ? void 0 : Xe.klingMotionControlCharacterOrientation) || "image",
        mode: pQi((De = t.settings) == null ? void 0 : De.klingMotionControlMode),
        keepOriginalSound: ((Ye = t.settings) == null ? void 0 : Ye.klingVideoKeepSound) || "yes",
        watermarkEnabled: ((Ce = t.settings) == null ? void 0 : Ce.klingMotionControlWatermarkEnabled) ?? !1
      }), ne = !1, {
        endpoint: Q,
        payload: q,
        useMultipart: ne
      }) : (alert(x("请上传参考图（动作迁移需要 Kelin 纯 base64；建议从上传面板选图以避免跨域问题）")), w(t.id, {
        isGenerating: !1,
        errorMsg: tQi
      }), null) : (alert(x("请输入动作迁移提示词（prompt）")), w(t.id, {
        isGenerating: !1,
        errorMsg: eQi
      }), null);
    }
    if (V1(n)) {
      const {
          imageRefs: Lt
        } = Olt({
          refImages: l,
          refMetaByRawUrl: b
        }),
        ct = NQi({
          currentModel: n,
          baseUrl: a,
          settings: t.settings || {},
          durationNum: je,
          ratio: o,
          imageCount: Lt.length,
          resolution: String(((He = t.settings) == null ? void 0 : He.resolution) || "720p")
        }),
        {
          requestedMode: Dt,
          mode: bn,
          grokRefCount: Rt,
          durationSec: fn,
          aspectRatio: Zt,
          resolutionStr: Ln,
          promotedFromI2v: tt
        } = ct;
      if (Q = ct.endpoint, tt && console.log("[Grok 1.5 Video Fal] 图像转视频连了多张参考图，改按 reference_image_urls 发送全部", {
        requestedMode: Dt,
        mode: bn,
        imageCount: Lt.length
      }), bn === "i2v" && Lt.length === 0) {
        const er = PQi;
        return alert(x(er)), w(t.id, {
          isGenerating: !1,
          errorMsg: er
        }), v(Cr => Cr.map(tr => tr.id === m ? {
          ...tr,
          status: "failed",
          progress: 0,
          errorMsg: er
        } : tr)), null;
      }
      if (bn === "r2v" && Lt.length === 0) {
        const er = RQi;
        return alert(x(er)), w(t.id, {
          isGenerating: !1,
          errorMsg: er
        }), v(Cr => Cr.map(tr => tr.id === m ? {
          ...tr,
          status: "failed",
          progress: 0,
          errorMsg: er
        } : tr)), null;
      }
      let zt, an;
      const Rn = LQi({
          mode: bn,
          imageRefs: Lt
        }),
        Un = {
          targetAspectRatio: o,
          mode: bn
        };
      if (bn === "i2v") {
        const er = await Hqt(Rn, Un);
        if (er.length === 0) {
          const Cr = amn;
          return w(t.id, {
            isGenerating: !1,
            errorMsg: Cr
          }), v(tr => tr.map(kn => kn.id === m ? {
            ...kn,
            status: "failed",
            progress: 0,
            errorMsg: Cr
          } : kn)), null;
        }
        zt = er[0];
      } else if (bn === "r2v") {
        const er = await Hqt(Rn, Un);
        if (er.length === 0) {
          const Cr = amn;
          return w(t.id, {
            isGenerating: !1,
            errorMsg: Cr
          }), v(tr => tr.map(kn => kn.id === m ? {
            ...kn,
            status: "failed",
            progress: 0,
            errorMsg: Cr
          } : kn)), null;
        }
        an = er;
      }
      q = DQi({
        prompt: i,
        durationSec: fn,
        aspectRatio: Zt,
        resolutionStr: Ln,
        mode: bn,
        grokRefCount: (an == null ? void 0 : an.length) ?? Rt,
        imageUrl: zt,
        referenceImageUrls: an
      }), console.log(`[Grok 1.5 Video Fal] ${bn} POST`, Q, {
        duration: fn,
        aspect_ratio: Zt,
        resolution: Ln,
        refs: (an == null ? void 0 : an.length) ?? (zt ? 1 : 0)
      });
    } else if (Nv(n)) {
      const {
          imageRefs: Lt,
          videoRefs: ct
        } = Olt({
          refImages: l,
          refMetaByRawUrl: b
        }),
        Dt = $Qi({
          currentModel: n,
          baseUrl: a,
          settings: t.settings || {},
          durationNum: je,
          ratio: o,
          imageCount: Lt.length,
          hasSourceVideo: ct.length > 0,
          resolution: String(((Ve = t.settings) == null ? void 0 : Ve.resolution) || "720p")
        }),
        {
          requestedMode: bn,
          mode: Rt,
          grokRefCount: fn,
          durationSec: Zt,
          aspectRatio: Ln,
          resolutionStr: tt,
          needsSourceVideo: zt,
          promotedFromI2v: an
        } = Dt;
      if (Q = Dt.endpoint, an && console.log("[Grok Imagine Video Fal] 图像转视频连了多张参考图，改按 reference_image_urls 发送全部", {
        requestedMode: bn,
        mode: Rt,
        imageCount: Lt.length
      }), zt && ct.length === 0) {
        const kn = VQi(Rt);
        return alert(x(kn)), w(t.id, {
          isGenerating: !1,
          errorMsg: kn
        }), v(xn => xn.map(Fn => Fn.id === m ? {
          ...Fn,
          status: "failed",
          progress: 0,
          errorMsg: kn
        } : Fn)), null;
      }
      if (Rt === "i2v" && Lt.length === 0) {
        const kn = BQi;
        return alert(x(kn)), w(t.id, {
          isGenerating: !1,
          errorMsg: kn
        }), v(xn => xn.map(Fn => Fn.id === m ? {
          ...Fn,
          status: "failed",
          progress: 0,
          errorMsg: kn
        } : Fn)), null;
      }
      if (Rt === "r2v" && Lt.length === 0) {
        const kn = FQi;
        return alert(x(kn)), w(t.id, {
          isGenerating: !1,
          errorMsg: kn
        }), v(xn => xn.map(Fn => Fn.id === m ? {
          ...Fn,
          status: "failed",
          progress: 0,
          errorMsg: kn
        } : Fn)), null;
      }
      let Rn, Un, er;
      const Cr = WQi({
          mode: Rt,
          imageRefs: Lt
        }),
        tr = {
          targetAspectRatio: o,
          mode: Rt
        };
      if (Rt === "i2v") {
        const kn = await Gqt(Cr, tr);
        if (kn.length === 0) {
          const xn = imn;
          return w(t.id, {
            isGenerating: !1,
            errorMsg: xn
          }), v(Fn => Fn.map(cr => cr.id === m ? {
            ...cr,
            status: "failed",
            progress: 0,
            errorMsg: xn
          } : cr)), null;
        }
        Rn = kn[0];
      } else if (Rt === "r2v") {
        const kn = await Gqt(Cr, tr);
        if (kn.length === 0) {
          const xn = imn;
          return w(t.id, {
            isGenerating: !1,
            errorMsg: xn
          }), v(Fn => Fn.map(cr => cr.id === m ? {
            ...cr,
            status: "failed",
            progress: 0,
            errorMsg: xn
          } : cr)), null;
        }
        Un = kn;
      } else if (Rt === "edit" || Rt === "extend") {
        const kn = await QUr([ct[0]], {
          apiKey: f,
          baseUrl: a,
          assetIdByUrl: b ? new Map([...b.entries()].map(([xn, Fn]) => [xn, Fn.assetId])) : void 0
        });
        if (kn.length === 0) {
          const xn = OQi;
          return w(t.id, {
            isGenerating: !1,
            errorMsg: xn
          }), v(Fn => Fn.map(cr => cr.id === m ? {
            ...cr,
            status: "failed",
            progress: 0,
            errorMsg: xn
          } : cr)), null;
        }
        er = kn[0];
      }
      q = HQi({
        prompt: i,
        durationSec: Zt,
        aspectRatio: Ln,
        resolutionStr: tt,
        mode: Rt,
        grokRefCount: (Un == null ? void 0 : Un.length) ?? fn,
        imageUrl: Rn,
        referenceImageUrls: Un,
        videoUrl: er
      }), console.log(`[Grok Imagine Video Fal] ${Rt} POST`, Q, {
        duration: Zt,
        aspect_ratio: Ln,
        resolution: tt,
        refs: (Un == null ? void 0 : Un.length) ?? (Rn ? 1 : 0),
        hasVideo: !!er
      });
    } else if (IS(n)) {
      const Lt = bQi({
          currentModel: n,
          baseUrl: a,
          refImageCount: l.length,
          durationNum: je,
          ratio: o,
          resolution: String(((it = t.settings) == null ? void 0 : it.resolution) || "720p")
        }),
        {
          mode: ct,
          grokRefCount: Dt,
          durationSec: bn,
          aspectRatio: Rt,
          resolutionStr: fn
        } = Lt;
      Q = Lt.endpoint;
      const Zt = {
        targetAspectRatio: o,
        mode: ct
      };
      let Ln, tt;
      const zt = xQi({
        mode: ct,
        refImages: l
      });
      if (ct === "i2v") {
        const an = await cOe(zt, Zt);
        if (an.length === 0) {
          const Rn = gQi;
          return w(t.id, {
            isGenerating: !1,
            errorMsg: Rn
          }), v(Un => Un.map(er => er.id === m ? {
            ...er,
            status: "failed",
            progress: 0,
            errorMsg: Rn
          } : er)), null;
        }
        Ln = an[0];
      } else if (ct === "r2v") {
        const an = await cOe(zt, Zt);
        if (an.length < 2) {
          const Rn = yQi;
          return w(t.id, {
            isGenerating: !1,
            errorMsg: Rn
          }), v(Un => Un.map(er => er.id === m ? {
            ...er,
            status: "failed",
            progress: 0,
            errorMsg: Rn
          } : er)), null;
        }
        tt = an;
      }
      q = wQi({
        prompt: vQi({
          prompt: i,
          grokRefCount: Dt,
          mode: ct,
          aspectRatio: Rt
        }),
        durationSec: bn,
        aspectRatio: Rt,
        resolutionStr: fn,
        mode: ct,
        imageUrl: Ln,
        referenceImageUrls: tt
      }), console.log(`[Grok3 Video Fal] ${ct} POST`, Q, {
        duration: bn,
        aspect_ratio: Rt,
        resolution: fn,
        refs: Dt
      });
    } else if (Q1(n)) {
      const Lt = JQi({
          framesMode: !!((It = t.settings) != null && It.veoFramesMode),
          startPort: y(t.id, "veo_start"),
          endPort: y(t.id, "veo_end")
        }),
        ct = YQi({
          currentModel: n,
          baseUrl: a,
          veoFramesMode: Lt.framesMode,
          hasStartEndFrames: Lt.hasStartEndFrames,
          refImageCount: d ? l.length : 0
        }),
        {
          variant: Dt,
          mode: bn
        } = ct;
      Q = ct.endpoint;
      const Rt = ZQi({
        mode: bn,
        startUrl: Lt.startUrl,
        endUrl: Lt.endUrl,
        refImages: l
      });
      let fn, Zt, Ln, tt;
      if (bn === "flf") {
        const [an, Rn] = await Promise.all([Gl([Rt.startUrl]), Gl([Rt.endUrl])]);
        if (!an[0] || !Rn[0]) {
          const Un = qQi;
          return w(t.id, {
            isGenerating: !1,
            errorMsg: Un
          }), v(er => er.map(Cr => Cr.id === m ? {
            ...Cr,
            status: "failed",
            progress: 0,
            errorMsg: Un
          } : Cr)), null;
        }
        fn = an[0], Zt = Rn[0];
      } else if (bn === "i2v") {
        const an = await Gl([Rt.imageUrl]);
        if (!an[0]) {
          const Rn = KQi;
          return w(t.id, {
            isGenerating: !1,
            errorMsg: Rn
          }), v(Un => Un.map(er => er.id === m ? {
            ...er,
            status: "failed",
            progress: 0,
            errorMsg: Rn
          } : er)), null;
        }
        Ln = an[0];
      } else if (bn === "r2v") {
        const an = await Gl(Rt.imageUrls || []);
        if (an.length < 2) {
          const Rn = QQi;
          return w(t.id, {
            isGenerating: !1,
            errorMsg: Rn
          }), v(Un => Un.map(er => er.id === m ? {
            ...er,
            status: "failed",
            progress: 0,
            errorMsg: Rn
          } : er)), null;
        }
        tt = an;
      }
      const zt = XQi({
        prompt: i,
        ratio: o,
        durationSetting: String(((Ft = t.settings) == null ? void 0 : Ft.duration) || je),
        resolution: String(((We = t.settings) == null ? void 0 : We.resolution) || "720P"),
        generateAudio: (Ze = t.settings) == null ? void 0 : Ze.veoGenerateAudio,
        mode: bn,
        firstFrameUrl: fn,
        lastFrameUrl: Zt,
        imageUrl: Ln,
        imageUrls: tt
      });
      q = zt, console.log(`[Veo3.1 Fal] ${Dt}/${bn} POST`, Q, {
        duration: zt.duration,
        resolution: zt.resolution,
        aspect_ratio: zt.aspect_ratio
      });
    } else if (wy(n)) {
      const Lt = tYi({
          currentModel: n,
          baseUrl: a,
          hasReferenceImage: d,
          refImageCount: l.length
        }),
        {
          isPro: ct,
          mode: Dt
        } = Lt;
      Q = Lt.endpoint;
      const bn = eoo(),
        Rt = V$r(i, bn, (Ge = t.settings) == null ? void 0 : Ge.characterId);
      let fn;
      if (Dt === "i2v") {
        const Ln = await Gl(rYi({
          mode: Dt,
          refImages: l
        }));
        if (!Ln[0]) {
          const tt = eYi;
          return w(t.id, {
            isGenerating: !1,
            errorMsg: tt
          }), v(zt => zt.map(an => an.id === m ? {
            ...an,
            status: "failed",
            progress: 0,
            errorMsg: tt
          } : an)), null;
        }
        fn = Ln[0];
      }
      const Zt = nYi({
        prompt: i,
        ratio: o,
        durationSetting: String(((Oe = t.settings) == null ? void 0 : Oe.duration) || je),
        resolution: String(((st = t.settings) == null ? void 0 : st.resolution) || "auto"),
        isPro: ct,
        isHd: !!((vt = t.settings) != null && vt.isHD),
        mode: Dt,
        characterIds: Rt,
        imageUrl: fn
      });
      q = Zt, console.log(`[Sora2 Fal] ${Dt} POST`, Q, {
        duration: Zt.duration,
        aspect_ratio: Zt.aspect_ratio,
        resolution: Zt.resolution,
        character_ids: Rt
      });
    } else if (D2(n)) {
      const Lt = t.settings || {},
        {
          imageUrlsRaw: ct,
          videoUrlsRaw: Dt,
          audioUrlsRaw: bn
        } = iC({
          framesMode: !1,
          refImages: l,
          refMetaByRawUrl: b,
          videoPortRef: y(t.id, "video") || y(t.id, "reference_video"),
          audioPortRef: y(t.id, "audio") || y(t.id, "reference_audio")
        }),
        Rt = ct.slice(0, H9n),
        fn = Dt.slice(0, W9n),
        Zt = bn.slice(0, q9n),
        Ln = vYi({
          currentModel: n,
          baseUrl: a,
          imageCount: Rt.length,
          videoCount: fn.length,
          audioCount: Zt.length,
          durationUi: String(Lt.duration || $t || "5s"),
          resolutionUi: String(Lt.resolution || s || "1080P"),
          ratioUi: String(Lt.ratio || o || "16:9"),
          settings: Lt
        }),
        {
          mode: tt,
          durationSec: zt,
          resolutionStr: an,
          aspectRatio: Rn,
          audio: Un,
          promptExtend: er,
          enableThinking: Cr,
          seed: tr
        } = Ln;
      Q = Ln.endpoint, ne = !1;
      const kn = [...Rt.map(() => ({
          type: "image"
        })), ...fn.map(() => ({
          type: "video"
        })), ...Zt.map(() => ({
          type: "audio"
        }))],
        xn = wYi({
          prompt: i,
          mode: tt,
          strip: kn
        });
      let Fn, cr, vr;
      try {
        if (tt === "r2v") {
          if (Rt.length + fn.length + Zt.length === 0) {
            const Nn = yYi;
            return alert(x(Nn)), w(t.id, {
              isGenerating: !1,
              errorMsg: Nn
            }), null;
          }
          if (Rt.length > 0 && (Fn = await eVr(Rt), Fn.length === 0)) {
            const Nn = bYi;
            return w(t.id, {
              isGenerating: !1,
              errorMsg: Nn
            }), v(En => En.map(Zn => Zn.id === m ? {
              ...Zn,
              status: "failed",
              progress: 0,
              errorMsg: Nn
            } : Zn)), null;
          }
          const Jt = new Map();
          for (const Nn of [...fn, ...Zt]) Jt.set(Nn, (Ht = b == null ? void 0 : b.get(Nn)) == null ? void 0 : Ht.assetId);
          fn.length > 0 && (cr = await Zqt(fn, {
            apiKey: f,
            baseUrl: a,
            mediaType: "video",
            assetIdByUrl: Jt
          })), Zt.length > 0 && (vr = await Zqt(Zt, {
            apiKey: f,
            baseUrl: a,
            mediaType: "audio",
            assetIdByUrl: Jt
          }));
        }
      } catch (Jt) {
        console.error("[Wan 3.0 Prime Fal] Media Conversion Failed:", Jt);
        const Nn = Jt instanceof Error ? Jt.message : "素材处理失败，请检查连线或跨域设置";
        return alert(x(Nn)), w(t.id, {
          isGenerating: !1,
          errorMsg: Nn
        }), null;
      }
      let Wt = xYi({
        prompt: xn,
        durationSec: zt,
        resolutionStr: an,
        aspectRatio: Rn,
        audio: Un,
        promptExtend: er,
        enableThinking: Cr,
        seed: tr,
        mode: tt,
        referenceImageUrls: Fn,
        referenceVideoUrls: cr,
        referenceAudioUrls: vr
      });
      tt === "r2v" && (Wt = _Yi(Wt, Rt.length, fn.length, Zt.length)), q = Wt, console.log(`[Wan 3.0 Prime Fal] ${tt} POST`, Q, {
        duration: zt,
        resolution: an,
        aspect_ratio: Rn,
        audio: Un,
        promptExtend: er,
        enableThinking: Cr,
        images: Rt.length,
        videos: fn.length,
        audios: Zt.length
      });
    } else if (xb(n)) {
      const Lt = t.settings || {},
        ct = XXi((l || []).filter(zt => {
          const an = b == null ? void 0 : b.get(zt);
          return (an == null ? void 0 : an.type) !== "video" && (an == null ? void 0 : an.type) !== "audio";
        })),
        Dt = YXi({
          currentModel: n,
          baseUrl: a,
          durationUi: String(Lt.duration || $t || "5s"),
          resolutionUi: String(Lt.resolution || s || "720p"),
          ratioUi: String(Lt.ratio || o || "16:9"),
          settings: Lt
        }),
        {
          durationSec: bn,
          resolutionStr: Rt,
          aspectRatio: fn,
          audio: Zt,
          seed: Ln
        } = Dt;
      if (Q = Dt.endpoint, ne = !1, ct.length === 0) {
        const zt = KXi;
        return alert(x(zt)), w(t.id, {
          isGenerating: !1,
          errorMsg: zt
        }), null;
      }
      let tt = [];
      try {
        if (tt = await CWr(ct), tt.length === 0) {
          const zt = QXi;
          return w(t.id, {
            isGenerating: !1,
            errorMsg: zt
          }), v(an => an.map(Rn => Rn.id === m ? {
            ...Rn,
            status: "failed",
            progress: 0,
            errorMsg: zt
          } : Rn)), null;
        }
      } catch (zt) {
        console.error("[Vidu Q3 Mix Fal] Media Conversion Failed:", zt);
        const an = zt instanceof Error ? zt.message : "素材处理失败，请检查连线或跨域设置";
        return alert(x(an)), w(t.id, {
          isGenerating: !1,
          errorMsg: an
        }), null;
      }
      q = JXi({
        prompt: i,
        durationSec: bn,
        resolutionStr: Rt,
        aspectRatio: fn,
        audio: Zt,
        seed: Ln,
        referenceImageUrls: tt
      }), console.log("[Vidu Q3 Mix Fal] r2v POST", Q, {
        duration: bn,
        resolution: Rt,
        aspect_ratio: fn,
        audio: Zt,
        images: tt.length
      });
    } else if (yf(n)) {
      const Lt = t.settings || {},
        ct = !!Lt.veoFramesMode,
        Dt = ct ? y(t.id, "veo_start") : null,
        bn = ct ? y(t.id, "veo_end") : null,
        Rt = (l || []).filter(tr => {
          const kn = b == null ? void 0 : b.get(tr);
          return (kn == null ? void 0 : kn.type) !== "video" && (kn == null ? void 0 : kn.type) !== "audio";
        }),
        fn = aJi({
          currentModel: n,
          baseUrl: a,
          durationUi: String(Lt.duration || $t || "5s"),
          resolutionUi: String(Lt.resolution || s || "720p"),
          ratioUi: String(Lt.ratio || o || "16:9"),
          framesMode: ct,
          startUrl: Dt,
          endUrl: bn,
          refImageCount: Rt.length,
          settings: Lt
        }),
        {
          mode: Zt,
          durationSec: Ln,
          resolutionStr: tt,
          aspectRatio: zt,
          audio: an,
          seed: Rn
        } = fn;
      if (Q = fn.endpoint, ne = !1, ct && !Dt) {
        const tr = eJi;
        return alert(x(tr)), w(t.id, {
          isGenerating: !1,
          errorMsg: tr
        }), null;
      }
      const Un = rJi({
        framesMode: ct,
        startUrl: Dt,
        endUrl: bn,
        refImages: Rt
      });
      let er, Cr;
      if (Un.start) try {
        const tr = await OWr([Un.start, Un.end].filter(Boolean));
        if (er = tr[0], Cr = tr[1], !er) {
          const kn = tJi;
          return w(t.id, {
            isGenerating: !1,
            errorMsg: kn
          }), v(xn => xn.map(Fn => Fn.id === m ? {
            ...Fn,
            status: "failed",
            progress: 0,
            errorMsg: kn
          } : Fn)), null;
        }
      } catch (tr) {
        console.error("[Vidu Q3 Fal] Media Conversion Failed:", tr);
        const kn = tr instanceof Error ? tr.message : "素材处理失败，请检查连线或跨域设置";
        return alert(x(kn)), w(t.id, {
          isGenerating: !1,
          errorMsg: kn
        }), null;
      }
      q = iJi({
        mode: Zt,
        prompt: i,
        durationSec: Ln,
        resolutionStr: tt,
        aspectRatio: zt,
        audio: an,
        seed: Rn,
        imageUrl: er,
        endImageUrl: Cr
      }), console.log("[Vidu Q3 Fal]", Zt, "POST", Q, {
        duration: Ln,
        resolution: tt,
        aspect_ratio: zt,
        audio: an,
        hasStart: !!er,
        hasEnd: !!Cr
      });
    } else if (Sy(n)) {
      const Lt = t.settings || {},
        ct = !!Lt.veoFramesMode,
        Dt = ct ? y(t.id, "veo_start") : null,
        bn = ct ? [] : VWr({
          refImages: l || [],
          refMetaByRawUrl: b,
          audioPortRef: y(t.id, "audio") || y(t.id, "reference_audio")
        }),
        {
          images: Rt,
          audios: fn
        } = HWr(bn),
        Zt = lJi({
          currentModel: n,
          baseUrl: a,
          durationUi: String(Lt.duration || $t || "5s"),
          resolutionUi: String(Lt.resolution || s || "720p"),
          ratioUi: String(Lt.ratio || o || "16:9"),
          framesMode: ct,
          settings: Lt
        }),
        {
          mode: Ln,
          durationSec: tt,
          resolutionStr: zt,
          aspectRatio: an,
          audio: Rn,
          seed: Un
        } = Zt;
      if (Q = Zt.endpoint, ne = !1, Ln === "i2v" && !Dt) {
        const xn = oJi;
        return alert(x(xn)), w(t.id, {
          isGenerating: !1,
          errorMsg: xn
        }), null;
      }
      let er,
        Cr = [],
        tr = [];
      try {
        if (Ln === "i2v" && Dt && (er = (await lKt([Dt]))[0], !er)) {
          const Fn = gmn;
          return w(t.id, {
            isGenerating: !1,
            errorMsg: Fn
          }), v(cr => cr.map(vr => vr.id === m ? {
            ...vr,
            status: "failed",
            progress: 0,
            errorMsg: Fn
          } : vr)), null;
        }
        if (Ln === "r2v" && Rt.length > 0 && (Cr = await lKt(Rt), Cr.length === 0)) {
          const xn = gmn;
          return w(t.id, {
            isGenerating: !1,
            errorMsg: xn
          }), v(Fn => Fn.map(cr => cr.id === m ? {
            ...cr,
            status: "failed",
            progress: 0,
            errorMsg: xn
          } : cr)), null;
        }
        if (Ln === "r2v" && fn.length > 0) {
          const xn = new Map();
          for (const Fn of fn) xn.set(Fn, (nn = b == null ? void 0 : b.get(Fn)) == null ? void 0 : nn.assetId);
          if (tr = await KWr(fn, {
            apiKey: f,
            baseUrl: a,
            assetIdByUrl: xn
          }), tr.length === 0) {
            const Fn = sJi;
            return w(t.id, {
              isGenerating: !1,
              errorMsg: Fn
            }), v(cr => cr.map(vr => vr.id === m ? {
              ...vr,
              status: "failed",
              progress: 0,
              errorMsg: Fn
            } : vr)), null;
          }
        }
      } catch (xn) {
        console.error("[Vidu Q4 Fal] Media Conversion Failed:", xn);
        const Fn = xn instanceof Error ? xn.message : "素材处理失败，请检查连线或跨域设置";
        return alert(x(Fn)), w(t.id, {
          isGenerating: !1,
          errorMsg: Fn
        }), null;
      }
      const kn = cJi({
        prompt: i,
        mode: Ln,
        strip: bn
      });
      q = dJi({
        mode: Ln,
        prompt: kn,
        durationSec: tt,
        resolutionStr: zt,
        aspectRatio: an,
        audio: Rn,
        seed: Un,
        imageUrl: er,
        referenceImageUrls: Cr,
        referenceAudioUrls: tr
      }), console.log("[Vidu Q4 Fal]", Ln, "POST", Q, {
        duration: tt,
        resolution: zt,
        aspect_ratio: Ln === "r2v" ? an : void 0,
        audio: Ln === "r2v" ? Rn : void 0,
        images: Ln === "i2v" ? er ? 1 : 0 : Cr.length,
        audios: tr.length
      });
    } else if (Yc(n)) {
      if (C5(t.settings || {})) return null;
      const {
          turbo: Lt,
          camera: ct,
          lipsync: Dt,
          isFramesMode: bn
        } = dYi(t.settings || {}),
        Rt = bn ? y(t.id, "veo_start") : null,
        fn = bn ? y(t.id, "veo_end") : null,
        Zt = !!Rt,
        Ln = !bn && !Lt && !ct && !Dt,
        {
          imageRefs: tt,
          videoRefs: zt,
          audioRefs: an,
          strip: Rn
        } = uYi({
          isFramesMode: bn,
          turbo: Lt,
          camera: ct,
          lipsync: Dt,
          refImages: l,
          refMetaByRawUrl: b,
          videoPortRef: Ln ? y(t.id, "video") || y(t.id, "reference_video") : null,
          audioPortRef: Ln || Dt ? y(t.id, "audio") || y(t.id, "reference_audio") : null
        }),
        Un = hYi({
          currentModel: n,
          baseUrl: a,
          turbo: Lt,
          camera: ct,
          lipsync: Dt,
          isFramesMode: bn,
          hasStart: Zt,
          imageCount: tt.length,
          videoCount: zt.length,
          audioCount: an.length,
          hasReferenceImage: tt.length > 0 || d && l.length > 0,
          durationSetting: String(((pt = t.settings) == null ? void 0 : pt.duration) || je),
          resolution: String(((lt = t.settings) == null ? void 0 : lt.resolution) || "768P"),
          promptExpansionMode: (gt = t.settings) == null ? void 0 : gt.promptExpansionMode
        }),
        {
          mode: er,
          durationSec: Cr,
          resolutionStr: tr,
          expansion: kn
        } = Un;
      if (Q = Un.endpoint, ne = !1, er === "r2v" && an.length > 0 && tt.length === 0 && zt.length === 0) {
        const Sr = aYi;
        return alert(x(Sr)), w(t.id, {
          isGenerating: !1,
          errorMsg: Sr
        }), null;
      }
      const xn = pYi({
        prompt: i,
        mode: er,
        strip: Rn
      });
      let Fn, cr, vr, Wt, Jt, Nn, En;
      try {
        if (er === "i2v" || er === "turbo-i2v" || er === "camera" || er === "lipsync") {
          const {
            startSource: Sr,
            endSource: Bn
          } = fYi({
            mode: er,
            startFrame: Rt,
            endFrame: fn,
            imageRefs: tt,
            refImages: l
          });
          if (!Sr) {
            const Mn = er === "camera" ? iYi : er === "lipsync" ? oYi : sYi;
            return w(t.id, {
              isGenerating: !1,
              errorMsg: Mn
            }), v(or => or.map(mr => mr.id === m ? {
              ...mr,
              status: "failed",
              progress: 0,
              errorMsg: Mn
            } : mr)), null;
          }
          const Et = {
              targetAspectRatio: o,
              mode: er
            },
            [zn] = await gRe([Sr], Et);
          if (!zn) {
            const Mn = lYi;
            return w(t.id, {
              isGenerating: !1,
              errorMsg: Mn
            }), v(or => or.map(mr => mr.id === m ? {
              ...mr,
              status: "failed",
              progress: 0,
              errorMsg: Mn
            } : mr)), null;
          }
          if (Fn = zn, er === "lipsync") {
            if (an.length === 0) {
              const mr = omn;
              return alert(x(mr)), w(t.id, {
                isGenerating: !1,
                errorMsg: mr
              }), v(Yr => Yr.map(aa => aa.id === m ? {
                ...aa,
                status: "failed",
                progress: 0,
                errorMsg: mr
              } : aa)), null;
            }
            const Mn = new Map();
            for (const mr of an) Mn.set(mr, (Ut = b == null ? void 0 : b.get(mr)) == null ? void 0 : Ut.assetId);
            if (vr = (await ftt(an.slice(0, 1), {
              apiKey: f,
              baseUrl: a,
              mediaType: "audio",
              assetIdByUrl: Mn
            }))[0], !vr) {
              const mr = omn;
              return alert(x(mr)), w(t.id, {
                isGenerating: !1,
                errorMsg: mr
              }), v(Yr => Yr.map(aa => aa.id === m ? {
                ...aa,
                status: "failed",
                progress: 0,
                errorMsg: mr
              } : aa)), null;
            }
          } else if (er === "camera") Wt = Rft((t.settings || {}).h3MaxFalCameraTrajectory, Cr);else if (Bn) {
            const [Mn] = await gRe([Bn], Et);
            Mn && (cr = Mn);
          }
        } else if (er === "r2v") {
          const Sr = tt,
            Bn = zt,
            Et = an;
          if (Sr.length + Bn.length + Et.length === 0) {
            const Mn = cYi;
            return alert(x(Mn)), w(t.id, {
              isGenerating: !1,
              errorMsg: Mn
            }), null;
          }
          Sr.length > 0 && (Jt = await gRe(Sr, {
            mode: "r2v"
          }));
          const zn = new Map();
          for (const Mn of [...Bn, ...Et]) zn.set(Mn, (_t = b == null ? void 0 : b.get(Mn)) == null ? void 0 : _t.assetId);
          Bn.length > 0 && (Nn = await ftt(Bn, {
            apiKey: f,
            baseUrl: a,
            mediaType: "video",
            assetIdByUrl: zn
          })), Et.length > 0 && (En = await ftt(Et, {
            apiKey: f,
            baseUrl: a,
            mediaType: "audio",
            assetIdByUrl: zn
          }));
        }
      } catch (Sr) {
        console.error("[MiniMax H3 Max Fal] Media Conversion Failed:", Sr);
        const Bn = Sr instanceof Error ? Sr.message : "素材处理失败，请检查连线或跨域设置";
        return alert(x(Bn)), w(t.id, {
          isGenerating: !1,
          errorMsg: Bn
        }), null;
      }
      let Zn = mYi({
        prompt: xn,
        ratio: o,
        durationSec: Cr,
        resolutionStr: tr,
        expansion: kn,
        mode: er,
        imageUrl: Fn,
        endImageUrl: cr,
        audioUrl: vr,
        enableTranscription: O9n(t.settings || {}),
        cameraTrajectory: Wt,
        referenceImageUrls: Jt,
        referenceVideoUrls: Nn,
        referenceAudioUrls: En
      });
      er === "r2v" && (Zn = gYi(Zn, tt.length, zt.length, an.length)), q = Zn, console.log(`[MiniMax H3 Max Fal] ${er} POST`, Q, {
        duration: Cr,
        resolution: tr,
        aspect_ratio: Zn.aspect_ratio,
        prompt_expansion_mode: kn,
        images: tt.length,
        videos: zt.length,
        audios: an.length,
        hasStart: Zt,
        hasEnd: !!fn,
        hasImageUrl: !!Zn.image_url,
        hasAudioUrl: !!Zn.audio_url,
        cameraKeyframes: Array.isArray(Zn.camera_trajectory) ? Zn.camera_trajectory.length : 0
      });
    } else if (kp(n)) {
      const {
          imageRefs: Lt,
          videoRefs: ct,
          strip: Dt
        } = oXi({
          refImages: l,
          refMetaByRawUrl: b
        }),
        {
          isFramesMode: bn
        } = iXi(t.settings || {}),
        Rt = bn ? y(t.id, "veo_start") : null,
        fn = bn ? y(t.id, "veo_end") : null,
        Zt = cXi({
          currentModel: n,
          baseUrl: a,
          settings: t.settings || {},
          durationNum: je,
          ratio: o,
          imageCount: Lt.length,
          hasStart: !!Rt,
          hasEnd: !!fn
        }),
        {
          mode: Ln,
          durationSec: tt,
          aspectRatio: zt,
          resolutionStr: an,
          needsSourceVideo: Rn
        } = Zt;
      Q = Zt.endpoint;
      const Un = dXi(i, Dt);
      if (Rn && ct.length === 0) {
        const Wt = eXi;
        return alert(x(Wt)), w(t.id, {
          isGenerating: !1,
          errorMsg: Wt
        }), null;
      }
      if (Ln === "r2v" && Lt.length === 0 && ct.length === 0) {
        const Wt = tXi;
        return alert(x(Wt)), w(t.id, {
          isGenerating: !1,
          errorMsg: Wt
        }), null;
      }
      let er,
        Cr,
        tr,
        kn,
        xn,
        Fn = 0,
        cr = 0;
      try {
        if (Ln === "i2v") {
          const {
            startSource: Wt,
            endSource: Jt
          } = lXi({
            mode: Ln,
            isFramesMode: bn,
            startFrame: Rt,
            endFrame: fn,
            imageRefs: Lt
          });
          if (!Wt) {
            const En = bn ? nXi : dmn;
            return w(t.id, {
              isGenerating: !1,
              errorMsg: En
            }), v(Zn => Zn.map(Sr => Sr.id === m ? {
              ...Sr,
              status: "failed",
              progress: 0,
              errorMsg: En
            } : Sr)), null;
          }
          const Nn = await Gl([Wt]);
          if (!Nn[0]) {
            const En = dmn;
            return w(t.id, {
              isGenerating: !1,
              errorMsg: En
            }), v(Zn => Zn.map(Sr => Sr.id === m ? {
              ...Sr,
              status: "failed",
              progress: 0,
              errorMsg: En
            } : Sr)), null;
          }
          if (er = Nn[0], Jt) {
            const En = await Gl([Jt]);
            En[0] && (Cr = En[0]);
          }
        } else if (Ln === "r2v") {
          const {
            imgSlice: Wt,
            vidSlice: Jt
          } = sXi(Lt, ct);
          if (Fn = Wt.length, cr = Jt.length, Wt.length > 0 && (tr = await Gl(Wt)), Jt.length > 0) {
            const Nn = new Map();
            for (const En of Jt) Nn.set(En, (At = b == null ? void 0 : b.get(En)) == null ? void 0 : At.assetId);
            kn = await iKt(Jt, {
              apiKey: f,
              baseUrl: a,
              assetIdByUrl: Nn
            });
          }
        } else if (Ln === "edit") {
          const Wt = new Map();
          Wt.set(ct[0], (Yt = b == null ? void 0 : b.get(ct[0])) == null ? void 0 : Yt.assetId);
          const Jt = await iKt([ct[0]], {
            apiKey: f,
            baseUrl: a,
            assetIdByUrl: Wt
          });
          if (!Jt[0]) {
            const Nn = rXi;
            return w(t.id, {
              isGenerating: !1,
              errorMsg: Nn
            }), v(En => En.map(Zn => Zn.id === m ? {
              ...Zn,
              status: "failed",
              progress: 0,
              errorMsg: Nn
            } : Zn)), null;
          }
          xn = Jt[0];
        }
      } catch (Wt) {
        console.error("[Gemini Omni Flash Fal] Media Conversion Failed:", Wt);
        const Jt = Wt instanceof Error ? Wt.message : "素材处理失败，请检查连线或跨域设置";
        return alert(x(Jt)), w(t.id, {
          isGenerating: !1,
          errorMsg: Jt
        }), null;
      }
      let vr = uXi({
        prompt: Un,
        resolutionStr: an,
        mode: Ln,
        aspectRatio: zt,
        durationSec: tt,
        imageUrl: er,
        endImageUrl: Cr,
        imageUrls: tr,
        referenceVideoUrls: kn,
        videoUrl: xn
      });
      Ln === "r2v" && (vr = hXi(vr, Fn, cr)), q = vr, console.log(`[Gemini Omni Flash Fal] ${Ln} POST`, Q, {
        duration: vr.duration,
        aspect_ratio: vr.aspect_ratio,
        resolution: vr.resolution,
        images: Lt.length,
        videos: ct.length
      });
    } else if (Fm(n)) {
      const {
          imageRefs: Lt,
          videoRefs: ct,
          strip: Dt
        } = BXi({
          refImages: l,
          refMetaByRawUrl: b
        }),
        bn = UXi({
          currentModel: n,
          baseUrl: a,
          settings: t.settings || {},
          durationNum: je,
          ratio: o,
          resolution: String(((qe = t.settings) == null ? void 0 : qe.resolution) || "1080p"),
          imageCount: Lt.length
        }),
        {
          mode: Rt,
          durationSec: fn,
          aspectRatio: Zt,
          resolutionStr: Ln,
          audioSetting: tt,
          seed: zt,
          needsSourceVideo: an
        } = bn;
      Q = bn.endpoint;
      const Rn = $Xi({
        prompt: i,
        strip: Dt,
        mode: Rt
      });
      if (an && ct.length === 0) {
        const xn = LXi;
        return alert(x(xn)), w(t.id, {
          isGenerating: !1,
          errorMsg: xn
        }), null;
      }
      if (Rt === "i2v" && Lt.length === 0) {
        const xn = jXi;
        return alert(x(xn)), w(t.id, {
          isGenerating: !1,
          errorMsg: xn
        }), null;
      }
      if (Rt === "r2v" && Lt.length === 0) {
        const xn = DXi;
        return alert(x(xn)), w(t.id, {
          isGenerating: !1,
          errorMsg: xn
        }), null;
      }
      let Un, er, Cr, tr;
      try {
        if (Rt === "i2v") {
          const xn = await Gl([Lt[0]]);
          if (!xn[0]) {
            const Fn = mmn;
            return w(t.id, {
              isGenerating: !1,
              errorMsg: Fn
            }), v(cr => cr.map(vr => vr.id === m ? {
              ...vr,
              status: "failed",
              progress: 0,
              errorMsg: Fn
            } : vr)), null;
          }
          Un = xn[0];
        } else if (Rt === "r2v") {
          const xn = FXi(Lt);
          if (er = await Gl(xn), !er.length) {
            const Fn = mmn;
            return w(t.id, {
              isGenerating: !1,
              errorMsg: Fn
            }), v(cr => cr.map(vr => vr.id === m ? {
              ...vr,
              status: "failed",
              progress: 0,
              errorMsg: Fn
            } : vr)), null;
          }
        } else if (Rt === "edit") {
          const xn = new Map();
          xn.set(ct[0], (kt = b == null ? void 0 : b.get(ct[0])) == null ? void 0 : kt.assetId);
          const Fn = await kWr([ct[0]], {
            apiKey: f,
            baseUrl: a,
            assetIdByUrl: xn
          });
          if (!Fn[0]) {
            const vr = OXi;
            return w(t.id, {
              isGenerating: !1,
              errorMsg: vr
            }), v(Wt => Wt.map(Jt => Jt.id === m ? {
              ...Jt,
              status: "failed",
              progress: 0,
              errorMsg: vr
            } : Jt)), null;
          }
          Cr = Fn[0];
          const cr = zXi(Lt);
          cr.length > 0 && (tr = await Gl(cr));
        }
      } catch (xn) {
        console.error("[Happy Horse Fal] Media Conversion Failed:", xn);
        const Fn = xn instanceof Error ? xn.message : "素材处理失败，请检查连线或跨域设置";
        return alert(x(Fn)), w(t.id, {
          isGenerating: !1,
          errorMsg: Fn
        }), null;
      }
      let kn = GXi({
        prompt: Rn,
        mode: Rt,
        durationSec: fn,
        aspectRatio: Zt,
        resolutionStr: Ln,
        audioSetting: tt,
        seed: zt,
        imageUrl: Un,
        imageUrls: er,
        videoUrl: Cr,
        referenceImageUrls: tr
      });
      Rt === "i2v" ? kn = WXi(kn) : Rt === "r2v" ? kn = VXi(kn, (er == null ? void 0 : er.length) || 0) : Rt === "edit" && (kn = HXi(kn, (tr == null ? void 0 : tr.length) || 0)), q = kn, console.log(`[Happy Horse Fal] ${Rt} POST`, Q, {
        duration: kn.duration,
        aspect_ratio: kn.aspect_ratio,
        resolution: kn.resolution,
        audio_setting: kn.audio_setting,
        images: Lt.length,
        videos: ct.length
      });
    } else if (Gp(n)) {
      const {
          imageRefs: Lt,
          videoRefs: ct,
          strip: Dt
        } = _Xi({
          refImages: l,
          refMetaByRawUrl: b
        }),
        {
          isFramesMode: bn
        } = xXi(t.settings || {}),
        Rt = bn ? y(t.id, "veo_start") : null,
        fn = bn ? y(t.id, "veo_end") : null,
        Zt = CXi({
          currentModel: n,
          baseUrl: a,
          settings: t.settings || {},
          durationNum: je,
          ratio: o,
          imageCount: Lt.length,
          hasStart: !!Rt,
          hasEnd: !!fn
        }),
        {
          mode: Ln,
          durationStr: tt,
          aspectRatio: zt,
          generateAudio: an,
          keepAudio: Rn,
          needsSourceVideo: Un,
          isO1: er
        } = Zt;
      Q = Zt.endpoint;
      const Cr = EXi(i, Dt, Ln);
      if (er && Ln === "t2v") {
        const Jt = yXi;
        return alert(x(Jt)), w(t.id, {
          isGenerating: !1,
          errorMsg: Jt
        }), null;
      }
      if (Un && ct.length === 0) {
        const Jt = IXi(Ln);
        return alert(x(Jt)), w(t.id, {
          isGenerating: !1,
          errorMsg: Jt
        }), null;
      }
      if (Ln === "r2v" && Lt.length === 0) {
        const Jt = fXi;
        return alert(x(Jt)), w(t.id, {
          isGenerating: !1,
          errorMsg: Jt
        }), null;
      }
      let tr,
        kn,
        xn,
        Fn,
        cr,
        vr = 0;
      try {
        if (Ln === "i2v") {
          const {
            startSource: Jt,
            endSource: Nn
          } = SXi({
            mode: Ln,
            isFramesMode: bn,
            startFrame: Rt,
            endFrame: fn,
            imageRefs: Lt
          });
          if (!Jt) {
            const Zn = bn ? gXi : hmn;
            return w(t.id, {
              isGenerating: !1,
              errorMsg: Zn
            }), v(Sr => Sr.map(Bn => Bn.id === m ? {
              ...Bn,
              status: "failed",
              progress: 0,
              errorMsg: Zn
            } : Bn)), null;
          }
          const En = await Gl([Jt]);
          if (!En[0]) {
            const Zn = hmn;
            return w(t.id, {
              isGenerating: !1,
              errorMsg: Zn
            }), v(Sr => Sr.map(Bn => Bn.id === m ? {
              ...Bn,
              status: "failed",
              progress: 0,
              errorMsg: Zn
            } : Bn)), null;
          }
          if (tr = En[0], Nn) {
            const Zn = await Gl([Nn]);
            Zn[0] && (kn = Zn[0]);
          }
        } else if (Ln === "r2v") {
          const Jt = kXi(Lt);
          xn = await Gl(Jt);
        } else if (Ln === "edit" || Ln === "v2v-ref") {
          const Jt = new Map();
          Jt.set(ct[0], (St = b == null ? void 0 : b.get(ct[0])) == null ? void 0 : St.assetId);
          const Nn = await aWr([ct[0]], {
            apiKey: f,
            baseUrl: a,
            assetIdByUrl: Jt
          });
          if (!Nn[0]) {
            const Zn = bXi;
            return w(t.id, {
              isGenerating: !1,
              errorMsg: Zn
            }), v(Sr => Sr.map(Bn => Bn.id === m ? {
              ...Bn,
              status: "failed",
              progress: 0,
              errorMsg: Zn
            } : Bn)), null;
          }
          cr = Nn[0];
          const En = AXi(Lt);
          vr = En.length, En.length > 0 && (Fn = await Gl(En));
        }
      } catch (Jt) {
        console.error(`[${er ? "Kling O1 Fal" : "Kling O3 Fal"}] Media Conversion Failed:`, Jt);
        const Nn = Jt instanceof Error ? Jt.message : "素材处理失败，请检查连线或跨域设置";
        return alert(x(Nn)), w(t.id, {
          isGenerating: !1,
          errorMsg: Nn
        }), null;
      }
      let Wt = TXi({
        prompt: Cr,
        mode: Ln,
        durationStr: tt,
        aspectRatio: zt,
        generateAudio: an,
        keepAudio: Rn,
        imageUrl: tr,
        endImageUrl: kn,
        hostedImageUrls: xn,
        imageUrls: Fn,
        videoUrl: cr,
        isO1: er
      });
      Ln === "r2v" ? Wt = MXi(Wt, (xn == null ? void 0 : xn.length) || 0) : (Ln === "edit" || Ln === "v2v-ref") && (Wt = PXi(Wt, vr, Ln)), q = Wt, console.log(`[${er ? "Kling O1 Fal" : "Kling O3 Fal"}] ${Ln} POST`, Q, {
        duration: Wt.duration,
        aspect_ratio: Wt.aspect_ratio,
        generate_audio: Wt.generate_audio,
        keep_audio: Wt.keep_audio,
        images: Lt.length,
        videos: ct.length,
        elements: Array.isArray(Wt.elements) ? Wt.elements.length : 0
      });
    } else if (Ap(n)) {
      const {
          imageRefs: Lt,
          videoRefs: ct
        } = xJi({
          refImages: l,
          refMetaByRawUrl: b
        }),
        {
          isFramesMode: Dt
        } = wJi(t.settings || {}),
        bn = Dt ? y(t.id, "veo_start") : null,
        Rt = Dt ? y(t.id, "veo_end") : null,
        fn = AJi({
          currentModel: n,
          baseUrl: a,
          settings: t.settings || {},
          durationNum: je,
          ratio: o,
          imageCount: Lt.length,
          hasStart: !!bn,
          hasEnd: !!Rt
        }),
        {
          mode: Zt,
          durationValue: Ln,
          aspectRatio: tt,
          resolutionStr: zt,
          generateAudio: an,
          needsSourceVideo: Rn
        } = fn;
      if (Q = fn.endpoint, Rn && ct.length === 0) {
        const Fn = kJi(Zt);
        return alert(x(Fn)), w(t.id, {
          isGenerating: !1,
          errorMsg: Fn
        }), null;
      }
      let Un, er, Cr, tr, kn;
      try {
        if (Zt === "i2v") {
          const {
            startSource: Fn
          } = bmn({
            mode: Zt,
            isFramesMode: Dt,
            startFrame: bn,
            endFrame: Rt,
            imageRefs: Lt
          });
          if (!Fn) {
            const vr = Dt ? pJi : ymn;
            return w(t.id, {
              isGenerating: !1,
              errorMsg: vr
            }), v(Wt => Wt.map(Jt => Jt.id === m ? {
              ...Jt,
              status: "failed",
              progress: 0,
              errorMsg: vr
            } : Jt)), null;
          }
          const cr = await Gl([Fn]);
          if (!cr[0]) {
            const vr = ymn;
            return w(t.id, {
              isGenerating: !1,
              errorMsg: vr
            }), v(Wt => Wt.map(Jt => Jt.id === m ? {
              ...Jt,
              status: "failed",
              progress: 0,
              errorMsg: vr
            } : Jt)), null;
          }
          Un = cr[0];
        } else if (Zt === "flf") {
          const {
            startSource: Fn,
            endSource: cr
          } = bmn({
            mode: Zt,
            isFramesMode: Dt,
            startFrame: bn,
            endFrame: Rt,
            imageRefs: Lt
          });
          if (!Fn || !cr) {
            const Jt = mJi;
            return w(t.id, {
              isGenerating: !1,
              errorMsg: Jt
            }), v(Nn => Nn.map(En => En.id === m ? {
              ...En,
              status: "failed",
              progress: 0,
              errorMsg: Jt
            } : En)), null;
          }
          const [vr, Wt] = await Promise.all([Gl([Fn]), Gl([cr])]);
          if (!vr[0] || !Wt[0]) {
            const Jt = fJi;
            return w(t.id, {
              isGenerating: !1,
              errorMsg: Jt
            }), v(Nn => Nn.map(En => En.id === m ? {
              ...En,
              status: "failed",
              progress: 0,
              errorMsg: Jt
            } : En)), null;
          }
          er = vr[0], Cr = Wt[0];
        } else if (Zt === "keyframes") {
          const Fn = _Ji(Lt);
          if (tr = await Gl(Fn), !tr || tr.length < 2) {
            const cr = gJi;
            return w(t.id, {
              isGenerating: !1,
              errorMsg: cr
            }), v(vr => vr.map(Wt => Wt.id === m ? {
              ...Wt,
              status: "failed",
              progress: 0,
              errorMsg: cr
            } : Wt)), null;
          }
        } else if (Zt === "edit" || Zt === "extend") {
          const Fn = new Map();
          Fn.set(ct[0], (hn = b == null ? void 0 : b.get(ct[0])) == null ? void 0 : hn.assetId);
          const cr = await vqr([ct[0]], {
            apiKey: f,
            baseUrl: a,
            assetIdByUrl: Fn
          });
          if (!cr[0]) {
            const vr = yJi;
            return w(t.id, {
              isGenerating: !1,
              errorMsg: vr
            }), v(Wt => Wt.map(Jt => Jt.id === m ? {
              ...Jt,
              status: "failed",
              progress: 0,
              errorMsg: vr
            } : Jt)), null;
          }
          kn = cr[0];
        }
      } catch (Fn) {
        console.error("[Flux 3 Fal] Media Conversion Failed:", Fn);
        const cr = Fn instanceof Error ? Fn.message : "素材处理失败，请检查连线或跨域设置";
        return alert(x(cr)), w(t.id, {
          isGenerating: !1,
          errorMsg: cr
        }), null;
      }
      const xn = SJi({
        prompt: i,
        mode: Zt,
        durationValue: Ln,
        aspectRatio: tt,
        resolutionStr: zt,
        generateAudio: an,
        imageUrl: Un,
        startImageUrl: er,
        endImageUrl: Cr,
        hostedImageUrls: tr,
        videoUrl: kn
      });
      q = xn, console.log(`[Flux 3 Fal] ${Zt} POST`, Q, {
        duration: xn.duration,
        aspect_ratio: xn.aspect_ratio,
        resolution: xn.resolution,
        generate_audio: xn.generate_audio,
        images: Lt.length,
        videos: ct.length,
        keyframes: Array.isArray(xn.keyframes) ? xn.keyframes.length : 0
      });
    } else if (ag(n)) {
      const {
          imageRefs: Lt,
          videoRefs: ct
        } = Olt({
          refImages: l,
          refMetaByRawUrl: b
        }),
        Dt = CQi({
          currentModel: n,
          baseUrl: a,
          settings: t.settings || {},
          durationNum: je,
          ratio: o,
          imageCount: Lt.length,
          hasSourceVideo: ct.length > 0,
          resolvedPlatformGroup: Yjn((Qt = t.settings) == null ? void 0 : Qt.platformGroup, r == null ? void 0 : r.modelName)
        }),
        {
          requestedMode: bn,
          mode: Rt,
          openAiCompat: fn,
          durationInt: Zt,
          aspectRatioStr: Ln,
          resolutionStr: tt,
          apiModel: zt,
          voices: an,
          needsSourceVideo: Rn,
          promotedFromI2v: Un
        } = Dt;
      Q = Dt.endpoint, Un && console.log("[Grok 1.5 Video] 图像转视频连了多张参考图，改按 reference_images 发送全部", {
        requestedMode: bn,
        mode: Rt,
        imageCount: Lt.length
      });
      const er = EQi(i);
      if (Rn && ct.length === 0) {
        const cr = SQi(Rt);
        return alert(x(cr)), w(t.id, {
          isGenerating: !1
        }), null;
      }
      if (Rt === "i2v" && Lt.length === 0) return alert(x(Jzt)), w(t.id, {
        isGenerating: !1
      }), null;
      if (Rt === "r2v" && Lt.length === 0 && an.length === 0) {
        const cr = IQi(ct.length > 0);
        return alert(x(cr)), w(t.id, {
          isGenerating: !1
        }), null;
      }
      let Cr,
        tr,
        kn,
        xn = 0;
      try {
        if (Rt === "i2v") {
          const cr = AQi({
            mode: Rt,
            imageRefs: Lt
          });
          Cr = await H(cr[0]);
        } else if (Rt === "r2v") {
          const cr = tUt(Lt);
          xn = cr.length, xn > 0 && (tr = await Promise.all(cr.map(async vr => H(vr))));
        } else if (Rt === "edit" || Rt === "extend") {
          const cr = ct[0];
          kn = await dve(cr, {
            perNodeOss: !!R,
            apiKey: f,
            baseUrl: a,
            assetId: (Ot = b == null ? void 0 : b.get(cr)) == null ? void 0 : Ot.assetId,
            mediaType: "video"
          });
        }
      } catch (cr) {
        return console.error("[Grok 1.5 Video] Media Conversion Failed:", cr), alert(cr instanceof Error ? x(cr.message) : x("素材处理失败，请检查连线或跨域设置")), w(t.id, {
          isGenerating: !1
        }), null;
      }
      const Fn = MQi({
        grokPrompt: er,
        mode: Rt,
        apiModel: zt,
        durationInt: Zt,
        aspectRatioStr: Ln,
        resolutionStr: tt,
        openAiCompat: fn,
        grokRefCount: xn,
        imageUrl: Cr,
        referenceImageUrls: tr,
        voices: an,
        videoUrl: kn
      });
      q = Fn, console.log(`[Grok 1.5 Video] ${Rt} POST`, Q, fn ? {
        model: zt,
        openAiCompat: !0,
        seconds: Fn.seconds,
        aspect_ratio: Fn.aspect_ratio,
        resolution: Fn.resolution,
        hasImage: !!Fn.image
      } : {
        model: zt,
        openAiCompat: !1,
        duration: Fn.duration,
        aspect_ratio: Fn.aspect_ratio,
        resolution: Fn.resolution,
        hasImage: !!Fn.image,
        hasVideo: !!Fn.video,
        referenceCount: Array.isArray(Fn.reference_images) ? Fn.reference_images.length : 0,
        voiceCount: an.length
      });
    } else if (PE(n)) {
      const Lt = TJi({
          currentModel: n,
          baseUrl: a,
          durationNum: je,
          ratio: o,
          resolution: (ln = t.settings) == null ? void 0 : ln.resolution,
          refImageCount: l.length
        }),
        {
          durationInt: ct,
          aspectRatioStr: Dt,
          resolutionStr: bn,
          grokRefCount: Rt
        } = Lt;
      Q = Lt.endpoint;
      let fn;
      if (Rt > 0) try {
        fn = await Promise.all(EJi(l).map(async Ln => H(Ln))), console.log("[Grok] 图生视频，已添加", fn.length, "张参考图");
      } catch (Ln) {
        return console.error("Grok Image Conversion Failed:", Ln), alert(x(IJi)), w(t.id, {
          isGenerating: !1
        }), null;
      }
      const Zt = PJi({
        prompt: i,
        apiModel: (r == null ? void 0 : r.modelName) || fgr,
        durationInt: ct,
        aspectRatioStr: Dt,
        resolutionStr: bn,
        grokRefCount: Rt,
        images: fn
      });
      Rt > 0 && !String(i || "").trim() && console.log("[Grok] 多图引用，默认提示词:", Zt.prompt), q = Zt;
    } else if (Db(n)) {
      const Lt = t.settings || {},
        ct = dVr(Lt.seedanceMaterials);
      let Dt = ct.images,
        bn = ct.videos,
        Rt = ct.audios,
        fn = ct.strip.map(Fn => ({
          type: Fn.type
        }));
      if (Dt.length + bn.length + Rt.length === 0) {
        const {
          imageUrlsRaw: Fn,
          videoUrlsRaw: cr,
          audioUrlsRaw: vr
        } = iC({
          framesMode: !1,
          refImages: l,
          refMetaByRawUrl: b,
          videoPortRef: y(t.id, "video") || y(t.id, "reference_video"),
          audioPortRef: y(t.id, "audio") || y(t.id, "reference_audio")
        });
        Dt = Fn, bn = cr, Rt = vr, fn = [...Dt.map(() => ({
          type: "image"
        })), ...bn.map(() => ({
          type: "video"
        })), ...Rt.map(() => ({
          type: "audio"
        }))];
      }
      const Zt = IYi({
          currentModel: n,
          baseUrl: a,
          imageCount: Dt.length,
          videoCount: bn.length,
          audioCount: Rt.length,
          durationUi: String(Lt.duration || $t || "5s"),
          resolutionUi: String(Lt.resolution || s || "720p"),
          ratioUi: String(Lt.ratio || o || "Auto"),
          settings: Lt
        }),
        {
          mode: Ln,
          duration: tt,
          resolutionStr: zt,
          aspectRatio: an,
          generateAudio: Rn,
          bitrateMode: Un
        } = Zt;
      Q = Zt.endpoint, ne = !1;
      const er = CYi({
        prompt: i,
        mode: Ln,
        strip: fn
      });
      let Cr, tr, kn;
      try {
        if (Ln === "r2v") {
          if (Dt.length === 0 && bn.length === 0) {
            const cr = Rt.length > 0 ? AYi : kYi;
            return alert(x(cr)), w(t.id, {
              isGenerating: !1,
              errorMsg: cr
            }), null;
          }
          if (Dt.length > 0 && (Cr = await uVr(Dt), Cr.length === 0)) {
            const cr = SYi;
            return w(t.id, {
              isGenerating: !1,
              errorMsg: cr
            }), v(vr => vr.map(Wt => Wt.id === m ? {
              ...Wt,
              status: "failed",
              progress: 0,
              errorMsg: cr
            } : Wt)), null;
          }
          const Fn = new Map();
          for (const cr of ct.strip) cr.assetId && Fn.set(cr.url, cr.assetId);
          for (const cr of [...bn, ...Rt]) Fn.has(cr) || Fn.set(cr, (Pn = b == null ? void 0 : b.get(cr)) == null ? void 0 : Pn.assetId);
          bn.length > 0 && (tr = await eKt(bn, {
            apiKey: f,
            baseUrl: a,
            mediaType: "video",
            assetIdByUrl: Fn
          })), Rt.length > 0 && (kn = await eKt(Rt, {
            apiKey: f,
            baseUrl: a,
            mediaType: "audio",
            assetIdByUrl: Fn
          }));
        }
      } catch (Fn) {
        console.error("[Seedance 2.0 Fal] Media Conversion Failed:", Fn);
        const cr = Fn instanceof Error ? Fn.message : "素材处理失败，请检查连线或重新上传图片";
        return alert(x(cr)), w(t.id, {
          isGenerating: !1,
          errorMsg: cr
        }), null;
      }
      let xn = EYi({
        prompt: er,
        duration: tt,
        resolutionStr: zt,
        aspectRatio: an,
        generateAudio: Rn,
        bitrateMode: Un,
        mode: Ln,
        referenceImageUrls: Cr,
        referenceVideoUrls: tr,
        referenceAudioUrls: kn
      });
      Ln === "r2v" && (xn = TYi(xn, Dt.length, bn.length, Rt.length)), q = xn, console.log(`[Seedance 2.0 Fal] ${Ln} POST`, Q, {
        duration: tt,
        resolution: zt,
        aspect_ratio: an,
        generate_audio: Rn,
        bitrate_mode: Un,
        images: Dt.length,
        videos: bn.length,
        audios: Rt.length
      });
    } else if (aw(n)) {
      const Lt = t.settings || {},
        ct = !!Lt.veoFramesMode,
        Dt = ct ? y(t.id, "veo_start") : null,
        bn = ct ? y(t.id, "veo_end") : null,
        Rt = ct ? {
          images: [],
          videos: [],
          audios: [],
          strip: []
        } : BVr(Lt.seedanceMaterials);
      let fn = Rt.images,
        Zt = Rt.videos,
        Ln = Rt.audios,
        tt = Rt.strip.map(Jt => ({
          type: Jt.type
        }));
      if (!ct && fn.length + Zt.length + Ln.length === 0) {
        const {
          imageUrlsRaw: Jt,
          videoUrlsRaw: Nn,
          audioUrlsRaw: En
        } = iC({
          framesMode: !1,
          refImages: l,
          refMetaByRawUrl: b,
          videoPortRef: y(t.id, "video") || y(t.id, "reference_video"),
          audioPortRef: y(t.id, "audio") || y(t.id, "reference_audio")
        });
        fn = Jt, Zt = Nn, Ln = En, tt = [...fn.map(() => ({
          type: "image"
        })), ...Zt.map(() => ({
          type: "video"
        })), ...Ln.map(() => ({
          type: "audio"
        }))];
      }
      const zt = GYi({
          currentModel: n,
          baseUrl: a,
          framesMode: ct,
          imageCount: fn.length,
          videoCount: Zt.length,
          audioCount: Ln.length,
          durationUi: String(Lt.duration || $t || "自适应"),
          resolutionUi: String(Lt.resolution || s || "720p"),
          ratioUi: String(Lt.ratio || o || "Auto"),
          settings: Lt
        }),
        {
          mode: an,
          duration: Rn,
          resolutionStr: Un,
          aspectRatio: er,
          generateAudio: Cr
        } = zt;
      Q = zt.endpoint, ne = !1;
      const tr = VYi({
        prompt: i,
        mode: an,
        strip: tt
      });
      let kn, xn, Fn, cr, vr;
      try {
        if (an === "i2v") {
          if (!Dt) {
            const Nn = zYi;
            return alert(x(Nn)), w(t.id, {
              isGenerating: !1,
              errorMsg: Nn
            }), null;
          }
          const [Jt] = await gtt([Dt]);
          if (!Jt) {
            const Nn = lmn;
            return w(t.id, {
              isGenerating: !1,
              errorMsg: Nn
            }), v(En => En.map(Zn => Zn.id === m ? {
              ...Zn,
              status: "failed",
              progress: 0,
              errorMsg: Nn
            } : Zn)), null;
          }
          if (kn = Jt, bn) {
            const [Nn] = await gtt([bn]);
            Nn && (xn = Nn);
          }
        } else if (an === "r2v") {
          if (fn.length === 0 && Zt.length === 0) {
            const Nn = Ln.length > 0 ? $Yi : UYi;
            return alert(x(Nn)), w(t.id, {
              isGenerating: !1,
              errorMsg: Nn
            }), null;
          }
          if (fn.length > 0 && (Fn = await gtt(fn), Fn.length === 0)) {
            const Nn = lmn;
            return w(t.id, {
              isGenerating: !1,
              errorMsg: Nn
            }), v(En => En.map(Zn => Zn.id === m ? {
              ...Zn,
              status: "failed",
              progress: 0,
              errorMsg: Nn
            } : Zn)), null;
          }
          const Jt = new Map();
          for (const Nn of Rt.strip) Nn.assetId && Jt.set(Nn.url, Nn.assetId);
          for (const Nn of [...Zt, ...Ln]) Jt.has(Nn) || Jt.set(Nn, (rn = b == null ? void 0 : b.get(Nn)) == null ? void 0 : rn.assetId);
          Zt.length > 0 && (cr = await nKt(Zt, {
            apiKey: f,
            baseUrl: a,
            mediaType: "video",
            assetIdByUrl: Jt
          })), Ln.length > 0 && (vr = await nKt(Ln, {
            apiKey: f,
            baseUrl: a,
            mediaType: "audio",
            assetIdByUrl: Jt
          }));
        }
      } catch (Jt) {
        console.error("[Seedance 2.0 Mini Fal] Media Conversion Failed:", Jt);
        const Nn = Jt instanceof Error ? Jt.message : "素材处理失败，请检查连线或重新上传图片";
        return alert(x(Nn)), w(t.id, {
          isGenerating: !1,
          errorMsg: Nn
        }), null;
      }
      let Wt = HYi({
        prompt: tr,
        duration: Rn,
        resolutionStr: Un,
        aspectRatio: er,
        generateAudio: Cr,
        mode: an,
        imageUrl: kn,
        endImageUrl: xn,
        referenceImageUrls: Fn,
        referenceVideoUrls: cr,
        referenceAudioUrls: vr
      });
      an === "r2v" && (Wt = WYi(Wt, fn.length, Zt.length, Ln.length)), q = Wt, console.log(`[Seedance 2.0 Mini Fal] ${an} POST`, Q, {
        duration: Rn,
        resolution: Un,
        aspect_ratio: er,
        generate_audio: Cr,
        images: fn.length,
        videos: Zt.length,
        audios: Ln.length,
        hasStart: !!Dt,
        hasEnd: !!bn
      });
    } else if (Lb(n)) {
      const Lt = t.settings || {},
        ct = !!Lt.veoFramesMode,
        Dt = ct ? y(t.id, "veo_start") : null,
        bn = ct ? y(t.id, "veo_end") : null,
        Rt = ct ? {
          images: [],
          videos: [],
          audios: [],
          strip: []
        } : YVr(Lt.seedanceMaterials);
      let fn = Rt.images,
        Zt = Rt.videos,
        Ln = Rt.audios,
        tt = Rt.strip.map(Nn => ({
          type: Nn.type
        }));
      if (!ct && fn.length + Zt.length + Ln.length === 0) {
        const {
          imageUrlsRaw: Nn,
          videoUrlsRaw: En,
          audioUrlsRaw: Zn
        } = iC({
          framesMode: !1,
          refImages: l,
          refMetaByRawUrl: b,
          videoPortRef: y(t.id, "video") || y(t.id, "reference_video"),
          audioPortRef: y(t.id, "audio") || y(t.id, "reference_audio")
        });
        fn = Nn, Zt = En, Ln = Zn, tt = [...fn.map(() => ({
          type: "image"
        })), ...Zt.map(() => ({
          type: "video"
        })), ...Ln.map(() => ({
          type: "audio"
        }))];
      }
      const zt = YYi({
          currentModel: n,
          baseUrl: a,
          framesMode: ct,
          imageCount: fn.length,
          videoCount: Zt.length,
          audioCount: Ln.length,
          durationUi: String(Lt.duration || $t || "自适应"),
          resolutionUi: String(Lt.resolution || s || "720p"),
          ratioUi: String(Lt.ratio || o || "Auto"),
          settings: Lt
        }),
        {
          mode: an,
          duration: Rn,
          resolutionStr: Un,
          aspectRatio: er,
          generateAudio: Cr,
          bitrateMode: tr
        } = zt;
      Q = zt.endpoint, ne = !1;
      const kn = XYi({
        prompt: i,
        mode: an,
        strip: tt
      });
      let xn, Fn, cr, vr, Wt;
      try {
        if (an === "i2v") {
          if (!Dt) {
            const En = qYi;
            return alert(x(En)), w(t.id, {
              isGenerating: !1,
              errorMsg: En
            }), null;
          }
          const [Nn] = await ytt([Dt]);
          if (!Nn) {
            const En = cmn;
            return w(t.id, {
              isGenerating: !1,
              errorMsg: En
            }), v(Zn => Zn.map(Sr => Sr.id === m ? {
              ...Sr,
              status: "failed",
              progress: 0,
              errorMsg: En
            } : Sr)), null;
          }
          if (xn = Nn, bn) {
            const [En] = await ytt([bn]);
            En && (Fn = En);
          }
        } else if (an === "r2v") {
          if (fn.length === 0 && Zt.length === 0) {
            const En = Ln.length > 0 ? QYi : KYi;
            return alert(x(En)), w(t.id, {
              isGenerating: !1,
              errorMsg: En
            }), null;
          }
          if (fn.length > 0 && (cr = await ytt(fn), cr.length === 0)) {
            const En = cmn;
            return w(t.id, {
              isGenerating: !1,
              errorMsg: En
            }), v(Zn => Zn.map(Sr => Sr.id === m ? {
              ...Sr,
              status: "failed",
              progress: 0,
              errorMsg: En
            } : Sr)), null;
          }
          const Nn = new Map();
          for (const En of Rt.strip) En.assetId && Nn.set(En.url, En.assetId);
          for (const En of [...Zt, ...Ln]) Nn.has(En) || Nn.set(En, (Yn = b == null ? void 0 : b.get(En)) == null ? void 0 : Yn.assetId);
          Zt.length > 0 && (vr = await rKt(Zt, {
            apiKey: f,
            baseUrl: a,
            mediaType: "video",
            assetIdByUrl: Nn
          })), Ln.length > 0 && (Wt = await rKt(Ln, {
            apiKey: f,
            baseUrl: a,
            mediaType: "audio",
            assetIdByUrl: Nn
          }));
        }
      } catch (Nn) {
        console.error("[Seedance 2.0 Flash Fal] Media Conversion Failed:", Nn);
        const En = Nn instanceof Error ? Nn.message : "素材处理失败，请检查连线或重新上传图片";
        return alert(x(En)), w(t.id, {
          isGenerating: !1,
          errorMsg: En
        }), null;
      }
      let Jt = JYi({
        prompt: kn,
        duration: Rn,
        resolutionStr: Un,
        aspectRatio: er,
        generateAudio: Cr,
        bitrateMode: tr,
        mode: an,
        imageUrl: xn,
        endImageUrl: Fn,
        referenceImageUrls: cr,
        referenceVideoUrls: vr,
        referenceAudioUrls: Wt
      });
      an === "r2v" && (Jt = ZYi(Jt, fn.length, Zt.length, Ln.length)), q = Jt, console.log(`[Seedance 2.0 Flash Fal] ${an} POST`, Q, {
        duration: Rn,
        resolution: Un,
        aspect_ratio: er,
        generate_audio: Cr,
        bitrate_mode: tr,
        images: fn.length,
        videos: Zt.length,
        audios: Ln.length,
        hasStart: !!Dt,
        hasEnd: !!bn
      });
    } else if (Kv(n)) {
      const Lt = t.settings || {},
        ct = DYi({
          currentModel: n,
          baseUrl: a,
          resolutionUi: String(Lt.resolution || s || "480p"),
          settings: Lt
        });
      if (ct === "missing-draft") {
        const Dt = NYi;
        return alert(x(Dt)), w(t.id, {
          isGenerating: !1,
          errorMsg: Dt
        }), v(bn => bn.map(Rt => Rt.id === m ? {
          ...Rt,
          status: "failed",
          progress: 0,
          errorMsg: Dt
        } : Rt)), null;
      }
      if (ct) Q = ct.endpoint, q = ct.payload, ne = !1, console.log("[Seedance 2.5 Fal Draft] 1080p complete POST", Q, q);else {
        const Dt = kVr(Lt.seedanceMaterials);
        let bn = Dt.images,
          Rt = Dt.videos,
          fn = Dt.audios,
          Zt = Dt.strip.map(Jt => ({
            type: Jt.type
          }));
        if (bn.length + Rt.length + fn.length === 0) {
          const {
            imageUrlsRaw: Jt,
            videoUrlsRaw: Nn,
            audioUrlsRaw: En
          } = iC({
            framesMode: !1,
            refImages: l,
            refMetaByRawUrl: b,
            videoPortRef: y(t.id, "video") || y(t.id, "reference_video"),
            audioPortRef: y(t.id, "audio") || y(t.id, "reference_audio")
          });
          bn = Jt, Rt = Nn, fn = En, Zt = [...bn.map(() => ({
            type: "image"
          })), ...Rt.map(() => ({
            type: "video"
          })), ...fn.map(() => ({
            type: "audio"
          }))];
        }
        const Ln = jYi({
            currentModel: n,
            baseUrl: a,
            imageCount: bn.length,
            videoCount: Rt.length,
            audioCount: fn.length,
            durationUi: String(Lt.duration || $t || "8s"),
            resolutionUi: String(Lt.resolution || s || "720p"),
            ratioUi: String(Lt.ratio || o || "Auto"),
            settings: Lt
          }),
          {
            mode: tt,
            task: zt,
            duration: an,
            resolutionStr: Rn,
            aspectRatio: Un,
            generateAudio: er,
            bitrateMode: Cr,
            seed: tr,
            draft: kn
          } = Ln;
        Q = Ln.endpoint, ne = !1;
        const xn = OYi({
          prompt: i,
          mode: tt,
          strip: Zt
        });
        let Fn, cr, vr;
        try {
          if (tt === "r2v") {
            if (bn.length === 0 && Rt.length === 0) {
              const Nn = fn.length > 0 ? PYi : MYi;
              return alert(x(Nn)), w(t.id, {
                isGenerating: !1,
                errorMsg: Nn
              }), null;
            }
            if (bn.length > 0 && (Fn = await IVr(bn), Fn.length === 0)) {
              const Nn = RYi;
              return w(t.id, {
                isGenerating: !1,
                errorMsg: Nn
              }), v(En => En.map(Zn => Zn.id === m ? {
                ...Zn,
                status: "failed",
                progress: 0,
                errorMsg: Nn
              } : Zn)), null;
            }
            const Jt = new Map();
            for (const Nn of Dt.strip) Nn.assetId && Jt.set(Nn.url, Nn.assetId);
            for (const Nn of [...Rt, ...fn]) Jt.has(Nn) || Jt.set(Nn, (Ct = b == null ? void 0 : b.get(Nn)) == null ? void 0 : Ct.assetId);
            Rt.length > 0 && (cr = await tKt(Rt, {
              apiKey: f,
              baseUrl: a,
              mediaType: "video",
              assetIdByUrl: Jt
            })), fn.length > 0 && (vr = await tKt(fn, {
              apiKey: f,
              baseUrl: a,
              mediaType: "audio",
              assetIdByUrl: Jt
            }));
          }
        } catch (Jt) {
          console.error("[Seedance 2.5 Fal] Media Conversion Failed:", Jt);
          const Nn = Jt instanceof Error ? Jt.message : "素材处理失败，请检查连线或跨域设置";
          return alert(x(Nn)), w(t.id, {
            isGenerating: !1,
            errorMsg: Nn
          }), null;
        }
        let Wt = BYi({
          prompt: xn,
          duration: an,
          resolutionStr: Rn,
          aspectRatio: Un,
          generateAudio: er,
          bitrateMode: Cr,
          seed: tr,
          mode: tt,
          draft: kn,
          task: zt,
          referenceImageUrls: Fn,
          referenceVideoUrls: cr,
          referenceAudioUrls: vr
        });
        tt === "r2v" && (Wt = FYi(Wt, bn.length, Rt.length, fn.length)), q = Wt, console.log(`[Seedance 2.5 Fal] ${tt} POST`, Q, {
          task: zt,
          duration: an,
          resolution: Rn,
          aspect_ratio: Un,
          generate_audio: er,
          bitrate_mode: Cr,
          images: bn.length,
          videos: Rt.length,
          audios: fn.length,
          draft: kn
        });
      }
    } else if (Tb(n)) {
      const {
          isSeedance25AdaptiveDuration: Lt,
          durationInt: ct,
          resolutionStr: Dt,
          ratioStr: bn,
          baseModelId: Rt,
          isSeedance20MultiMaterial: fn,
          isLiteT2v: Zt,
          supportsFrames: Ln,
          endpoint: tt
        } = dKi({
          currentModel: n,
          durationSetting: ((Cn = t.settings) == null ? void 0 : Cn.duration) || void 0,
          resolutionSetting: ((un = t.settings) == null ? void 0 : un.resolution) || rl(n)[0] || "480p",
          ratio: o,
          baseUrl: a
        }),
        zt = !!((Jn = t.settings) != null && Jn.veoFramesMode),
        an = y(t.id, "veo_start"),
        Rn = y(t.id, "veo_end");
      Q = tt;
      let Un = (Kn = t.settings) == null ? void 0 : Kn.seedanceMaterials;
      if (fn && (Un != null && Un.length) && console.log("[Seedance 2.0] materials before build:", Un.map(xn => ({
        id: xn.id,
        type: xn.type,
        hasAssetUrl: !!xn.assetUrl,
        urlHead: (xn.url || "").slice(0, 48),
        assetHead: (xn.assetUrl || "").slice(0, 32)
      }))), R && fn && (Un != null && Un.length)) try {
        Un = await c0t(Un, {
          nodes: S,
          connections: C,
          targetNodeId: t.id
        });
      } catch (xn) {
        const Fn = xn instanceof Error ? xn.message : "多素材图床上传失败";
        throw new Error(Fn);
      }
      const {
          ensureSdolsArkImageUrlIfNeeded: er,
          resolveSeedanceMaterialUrl: Cr
        } = MKi({
          currentModel: n,
          useOssForApi: R,
          baseUrl: a,
          apiKey: f,
          fetchWithTauriProxy: $i,
          getBlobFromUrl: Ns,
          blobToDataURL: Fu,
          resizeBlobForApi: lve,
          resizeDisplayUrlForApi: BBn,
          buildGenApiResolveForRefUrl: L,
          isVolcAccessiblePublicUrl: RR,
          resolveReferenceVideoHttpUrl: N2e,
          promptPublicVideoUrlAfterUploadFailed: OF,
          isOssPublicHttpUrl: nr,
          normalizeOssPublicHttpUrl: ya
        }),
        tr = [fKi(i, !!(fn && (Un != null && Un.length)))];
      if (fn && Un && Un.length > 0) {
        const xn = new Set(),
          Fn = qg(n);
        for (let cr = 0; cr < Un.length; cr++) {
          const vr = Un[cr],
            Wt = gKi(vr, Fn);
          yKi(vr, Fn);
          const Jt = await Cr(Wt, vr.type, vr._cacheAssetId);
          let Nn;
          vr.type === "image" && !egr(vr.type, Wt) && (Nn = await er(Jt.replace(/^Asset:\/\//, "asset://"), vr.url));
          const En = bKi({
            type: vr.type,
            submitUrl: Wt,
            resolvedUrl: Jt,
            finalImageUrl: Nn,
            isSeedance20MultiMaterial: fn,
            seenVideoKeys: xn
          });
          "skip" in En || tr.push(En.item);
        }
        console.log("[Seedance 2.0] content summary:", tr.map(cr => {
          var vr, Wt, Jt, Nn, En, Zn, Sr, Bn, Et, zn, Mn, or, mr, Yr, aa, wa, xa, Aa;
          return {
            type: cr == null ? void 0 : cr.type,
            role: cr == null ? void 0 : cr.role,
            urlPrefix: (Jt = (Wt = (vr = cr == null ? void 0 : cr.image_url) == null ? void 0 : vr.url) == null ? void 0 : Wt.startsWith) != null && Jt.call(Wt, "Asset://") ? "Asset://" : (Zn = (En = (Nn = cr == null ? void 0 : cr.image_url) == null ? void 0 : Nn.url) == null ? void 0 : En.startsWith) != null && Zn.call(En, "asset://") ? "asset://" : (Et = (Bn = (Sr = cr == null ? void 0 : cr.image_url) == null ? void 0 : Sr.url) == null ? void 0 : Bn.startsWith) != null && Et.call(Bn, "http") || (or = (Mn = (zn = cr == null ? void 0 : cr.video_url) == null ? void 0 : zn.url) == null ? void 0 : Mn.startsWith) != null && or.call(Mn, "http") || (aa = (Yr = (mr = cr == null ? void 0 : cr.audio_url) == null ? void 0 : mr.url) == null ? void 0 : Yr.startsWith) != null && aa.call(Yr, "http") ? "http" : cr != null && cr.text ? "text" : "other",
            sample: (wa = cr == null ? void 0 : cr.image_url) != null && wa.url ? String(cr.image_url.url).slice(0, 32) : (xa = cr == null ? void 0 : cr.video_url) != null && xa.url ? String(cr.video_url.url).slice(0, 32) : (Aa = cr == null ? void 0 : cr.audio_url) != null && Aa.url ? String(cr.audio_url.url).slice(0, 32) : void 0
          };
        }));
      } else {
        const xn = vKi({
          isLiteT2v: Zt,
          supportsFrames: Ln,
          isFramesMode: zt,
          startUrl: an,
          endUrl: Rn,
          hasReferenceImage: d,
          firstRefImage: l[0],
          isSeedance20MultiMaterial: fn,
          currentModel: n
        });
        if (xn.kind === "first-last") try {
          const Fn = await er(await H(xn.startUrl), xn.startUrl),
            cr = await er(await H(xn.endUrl), xn.endUrl);
          tr.push({
            type: "image_url",
            image_url: {
              url: Fn
            },
            role: "first_frame"
          }), tr.push({
            type: "image_url",
            image_url: {
              url: cr
            },
            role: "last_frame"
          });
        } catch (Fn) {
          return console.error("Seedance 首尾帧图片处理失败:", Fn), alert(x("首尾帧图片处理失败，请检查图片链接或跨域设置")), w(t.id, {
            isGenerating: !1
          }), null;
        } else if (xn.kind === "first-only") try {
          const cr = {
            type: "image_url",
            image_url: {
              url: await er(await H(xn.imgUrl), xn.imgUrl)
            }
          };
          xn.role && (cr.role = xn.role), tr.push(cr);
        } catch (Fn) {
          return console.error("Seedance 图片处理失败:", Fn), alert(x("图片处理失败，请检查图片链接或跨域设置")), w(t.id, {
            isGenerating: !1
          }), null;
        }
      }
      if (R0(n) && tr.some(xn => String(xn.role || "") === "reference_video" || xn.type === "video_url")) {
        const Fn = (Un || []).filter(vr => vr.type === "video").map((vr, Wt) => {
            var Sr;
            const Jt = j2e(vr.id, t.id, C, S),
              Nn = Jt == null ? void 0 : Jt.videoMeta,
              En = Number(Nn == null ? void 0 : Nn.duration),
              Zn = Number((Sr = Jt == null ? void 0 : Jt.settings) == null ? void 0 : Sr._originalSize);
            return {
              url: String(vr.url || vr.assetUrl || "").trim(),
              label: vr.name || `视频${Wt + 1}`,
              knownDurationSec: Number.isFinite(En) && En > 0 ? En : void 0,
              width: Number(Nn == null ? void 0 : Nn.w) > 0 ? Number(Nn == null ? void 0 : Nn.w) : void 0,
              height: Number(Nn == null ? void 0 : Nn.h) > 0 ? Number(Nn == null ? void 0 : Nn.h) : void 0,
              fileSize: Number.isFinite(Zn) && Zn > 0 ? Zn : void 0
            };
          }),
          cr = tr.filter(vr => String(vr.role || "") === "reference_video" || vr.type === "video_url").map(vr => {
            var Jt;
            const Wt = (Jt = vr.video_url) == null ? void 0 : Jt.url;
            return String(Wt || "").trim();
          }).filter(Boolean);
        await xAt({
          variant: "2.5",
          sources: Fn,
          resolvedUrls: cr
        });
      }
      q = hKi({
        currentModel: n,
        configModelName: r == null ? void 0 : r.modelName,
        configId: r == null ? void 0 : r.id,
        content: tr,
        ratioStr: bn,
        durationInt: ct,
        isSeedance25AdaptiveDuration: Lt,
        resolutionStr: Dt,
        isSeedance20MultiMaterial: fn,
        generateAudio: ((en = t.settings) == null ? void 0 : en.seedanceGenerateAudio) !== !1,
        outputFormat: String(((Vn = t.settings) == null ? void 0 : Vn.seedanceOutputFormat) || "mp4"),
        baseModelId: Rt
      });
    } else if (zv(n)) {
      const Lt = E3(n) ? "Kling 3.0 Omni" : "Kling O1";
      console.log(`[${Lt}] 节点设置:`, t.settings);
      let ct = (Tt = t.settings) == null ? void 0 : Tt.klingVideoUrl,
        Dt = (Ue = t.settings) == null ? void 0 : Ue.klingImages;
      const bn = ((et = t.settings) == null ? void 0 : et.klingVideoReferType) || "base",
        Rt = ((ft = t.settings) == null ? void 0 : ft.klingVideoKeepSound) || "yes",
        fn = (ht = t.settings) == null ? void 0 : ht.klingVideoSegment;
      if (R && (((Dt == null ? void 0 : Dt.length) ?? 0) > 0 || ct)) try {
        const vr = await rFn({
          images: Dt,
          videoUrl: ct,
          videoFile: (wt = t.settings) == null ? void 0 : wt.klingVideoFile
        });
        vr.images && (Dt = vr.images), vr.videoUrl && (ct = vr.videoUrl), console.log(`[${Lt}] 图床预上传完成:`, {
          imageCount: (Dt == null ? void 0 : Dt.length) ?? 0,
          videoHead: ct == null ? void 0 : ct.slice(0, 80)
        });
      } catch (vr) {
        const Wt = vr.message || RJi;
        return console.error(`[${Lt}] 图床预上传失败:`, vr), alert(x(Wt)), w(t.id, {
          isGenerating: !1,
          errorMsg: Wt
        }), null;
      }
      const Zt = LJi({
          currentModel: n,
          baseUrl: a,
          durationNum: je,
          ratio: o,
          klingVideoUrl: ct,
          klingVideoReferType: bn,
          klingVideoKeepSound: Rt,
          klingVideoSegment: fn,
          resolution: (jt = t.settings) == null ? void 0 : jt.resolution,
          klingV3Sound: (bt = t.settings) == null ? void 0 : bt.klingV3Sound
        }),
        {
          modelName: Ln,
          referType: tt,
          keepSound: zt,
          finalDuration: an,
          aspectRatio: Rn,
          mode: Un,
          sound: er
        } = Zt;
      Q = Zt.endpoint, console.log(`[${Lt}] 视频URL:`, ct), console.log(`[${Lt}] 视频类型:`, tt), console.log(`[${Lt}] 保留原声:`, zt), console.log(`[${Lt}] 视频片段:`, fn), ct && tt === "base" && fn && console.log(`[${Lt}] 使用视频片段时长:`, fn.endTime - fn.startTime, "秒，四舍五入为:", an);
      let Cr;
      const tr = BJi({
        klingImages: Dt,
        hasReferenceImage: d,
        refImages: l
      });
      if (tr.kind === "uploaded") Cr = OJi(tr.images), console.log("[Kling O1] 添加上传图片:", tr.images.length, "张", Cr);else if (tr.kind === "connected") try {
        Cr = await Promise.all(tr.urls.map(async vr => ({
          image_url: await H(vr)
        }))), console.log("[Kling O1] 添加连接图片参考:", Cr.length, "张");
      } catch (vr) {
        return console.error("[Kling O1] 图片处理失败:", vr), alert(x(NJi)), w(t.id, {
          isGenerating: !1
        }), null;
      }
      const kn = (Bt = t.settings) == null ? void 0 : Bt.klingSubjects;
      console.log("[Kling O1] 原始 klingSubjects:", kn), console.log("[Kling O1] klingSubjects 类型:", kn == null ? void 0 : kn.map(vr => typeof vr));
      const xn = kn && kn.length > 0 ? FJi(kn) : void 0;
      xn && (console.log("[Kling O1] 添加主体:", kn.length, "个"), console.log("[Kling O1] element_list:", JSON.stringify(xn, null, 2))), console.log(ct ? "[Kling O1] 添加视频参考" : "[Kling O1] 没有视频URL，跳过video_list");
      const Fn = zJi({
          windowUrl: typeof window < "u" ? window.__KLING_CALLBACK_URL__ : void 0,
          origin: typeof window < "u" ? window.location.origin : void 0
        }),
        cr = UJi({
          prompt: i,
          modelName: Ln,
          imageList: Cr,
          elementList: xn,
          videoUrl: ct,
          referType: tt,
          keepSound: zt,
          mode: Un,
          sound: er,
          aspectRatio: Rn,
          duration: an,
          callbackUrl: Fn
        });
      q = cr, console.log(`[${Lt}] 添加 callback_url:`, Fn), console.log(`[${Lt}] 请求参数:`, JSON.stringify(cr, null, 2));
    } else if (Lk(n)) {
      const Lt = y(t.id, "veo_start"),
        ct = y(t.id, "veo_end"),
        Dt = !!Lt,
        bn = !!ct,
        Rt = !!(l && l.length > 0),
        fn = VJi({
          currentModel: n,
          baseUrl: a,
          duration: $t,
          ratio: o,
          hasStartFrame: Dt,
          hasEndFrame: bn,
          hasReferenceImage: Rt,
          klingV25Resolution: ((wn = t.settings) == null ? void 0 : wn.klingV25Resolution) || "std"
        }),
        {
          hasFrameInput: Zt,
          durationInt: Ln,
          mode: tt,
          aspectRatio: zt
        } = fn;
      Q = fn.endpoint;
      const an = HJi({
        hasFrameInput: Zt,
        startUrl: Lt,
        endUrl: ct,
        hasReferenceImage: Rt,
        refImages: l
      });
      console.log("[Kling v2.5 Turbo] 时长:", Ln), Zt || Rt ? console.log(`[Kling v2.5 Turbo] 检测到${Zt ? "首尾帧" : "参考图片"}，使用用户选择的模式: ${tt}`) : console.log("[Kling v2.5 Turbo] 文生视频模式:", tt);
      const Rn = async tr => {
        var xn, Fn, cr, vr, Wt;
        const kn = (tr || "").trim();
        if (!kn) return null;
        try {
          let Jt = kn;
          const Nn = /^[A-Za-z0-9+/=]+$/.test(kn);
          !kn.startsWith("data:") && Nn && (Jt = `data:image/jpeg;base64,${kn}`);
          const En = await Ns(Jt, {
            compressForApi: !1
          });
          if (!En) return null;
          const Zn = En.type || "image/jpeg",
            Sr = (() => {
              const aa = Zn.toLowerCase();
              return aa.includes("png") ? ".png" : aa.includes("webp") ? ".webp" : ".jpg";
            })(),
            Bn = `kling-v2.5-image-${Date.now()}${Sr}`,
            Et = new File([En], Bn, {
              type: Zn
            }),
            zn = new FormData();
          zn.append("file", Et);
          const Mn = await fetch(`${a}/v1/files`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${f}`
            },
            body: zn
          });
          if (!Mn.ok) {
            const aa = await Mn.text().catch(() => "");
            return console.warn("[Kling v2.5 Turbo] /v1/files upload failed:", Mn.status, Mn.statusText, aa.slice(0, 200)), null;
          }
          const or = await Mn.json().catch(() => ({}));
          let mr = (or == null ? void 0 : or.url) || (or == null ? void 0 : or.file_url) || (or == null ? void 0 : or.download_url) || ((xn = or == null ? void 0 : or.data) == null ? void 0 : xn.url) || ((Fn = or == null ? void 0 : or.data) == null ? void 0 : Fn.file_url) || ((cr = or == null ? void 0 : or.data) == null ? void 0 : cr.download_url);
          if (!mr && (or != null && or.id || (vr = or == null ? void 0 : or.data) != null && vr.id)) {
            const aa = String((or == null ? void 0 : or.id) ?? ((Wt = or == null ? void 0 : or.data) == null ? void 0 : Wt.id));
            mr = `${a}/v1/files/${aa}/content`;
          }
          if (!mr || typeof mr != "string") return null;
          const Yr = mr.trim();
          return Yr.startsWith("/") ? `${a}${Yr}` : Yr;
        } catch (Jt) {
          return console.warn("[Kling v2.5 Turbo] upload image failed:", Jt), null;
        }
      };
      let Un, er;
      if (Zt || Rt) try {
        if (Zt) {
          if (Lt && an.imageUrl) {
            let tr = await K(an.imageUrl);
            if (tr.startsWith("http://") || tr.startsWith("https://")) {
              console.log("[Kling v2.5 Turbo] 首帧图片是 HTTP URL，转换为 base64");
              const Fn = await (await fetch(tr)).blob();
              tr = await Fu(Fn);
            }
            if (!tr.startsWith("data:") && !/^[A-Za-z0-9+/=]+$/.test(tr.trim())) throw console.error("[Kling v2.5 Turbo] 首帧图片格式错误"), new Error("首帧图片格式错误");
            const kn = await Rn(tr);
            if (kn) Un = kn, console.log("[Kling v2.5 Turbo] 添加首帧 (image) via url"), console.log("[Kling v2.5 Turbo] - url 前50字符:", kn.substring(0, 50));else {
              const xn = Y(tr);
              if (!xn) throw console.error("[Kling v2.5 Turbo] 无法提取首帧 base64 数据"), new Error("首帧 base64 格式错误");
              Un = xn, console.log("[Kling v2.5 Turbo] 添加首帧 (image) via base64"), console.log("[Kling v2.5 Turbo] - base64 前30字符:", xn.substring(0, 30)), console.log("[Kling v2.5 Turbo] - base64 长度:", xn.length);
            }
          } else if (an.imageUrl) {
            console.warn("[Kling v2.5 Turbo] 未检测到首帧，使用尾帧作为首帧");
            let tr = await K(an.imageUrl);
            if (tr.startsWith("http://") || tr.startsWith("https://")) {
              console.log("[Kling v2.5 Turbo] 尾帧图片是 HTTP URL，转换为 base64");
              const Fn = await (await fetch(tr)).blob();
              tr = await Fu(Fn);
            }
            const kn = await Rn(tr);
            if (kn) Un = kn, console.log("[Kling v2.5 Turbo] 使用尾帧作为首帧 (image) via url");else {
              const xn = Y(tr);
              xn && (Un = xn, console.log("[Kling v2.5 Turbo] 使用尾帧作为首帧 (image) via base64"));
            }
          }
          if (an.imageTailUrl) {
            let tr = await K(an.imageTailUrl);
            if (tr.startsWith("http://") || tr.startsWith("https://")) {
              console.log("[Kling v2.5 Turbo] 尾帧图片是 HTTP URL，转换为 base64");
              const Fn = await (await fetch(tr)).blob();
              tr = await Fu(Fn);
            }
            if (!tr.startsWith("data:") && !/^[A-Za-z0-9+/=]+$/.test(tr.trim())) throw console.error("[Kling v2.5 Turbo] 尾帧图片格式错误"), new Error("尾帧图片格式错误");
            const kn = await Rn(tr);
            if (kn) er = kn, console.log("[Kling v2.5 Turbo] 添加尾帧 (image_tail) via url");else {
              const xn = Y(tr);
              if (!xn) throw console.error("[Kling v2.5 Turbo] 无法提取尾帧 base64 数据"), new Error("尾帧 base64 格式错误");
              er = xn, console.log("[Kling v2.5 Turbo] 添加尾帧 (image_tail) via base64"), console.log("[Kling v2.5 Turbo] - 尾帧 base64 前30字符:", xn.substring(0, 30)), console.log("[Kling v2.5 Turbo] - 尾帧 base64 长度:", xn.length);
            }
          }
        } else if (an.imageUrl) {
          let tr = await K(an.imageUrl);
          if (tr.startsWith("http://") || tr.startsWith("https://")) {
            console.log("[Kling v2.5 Turbo] 参考图片是 HTTP URL，转换为 base64");
            const Fn = await (await fetch(tr)).blob();
            tr = await Fu(Fn);
          }
          if (!tr.startsWith("data:") && !/^[A-Za-z0-9+/=]+$/.test(tr.trim())) throw console.error("[Kling v2.5 Turbo] 图片格式错误"), new Error("图片格式错误");
          const kn = await Rn(tr);
          if (kn) Un = kn, console.log("[Kling v2.5 Turbo] 添加参考图片 (image) via url"), console.log("[Kling v2.5 Turbo] - url 前50字符:", kn.substring(0, 50));else {
            const xn = Y(tr);
            if (!xn) throw console.error("[Kling v2.5 Turbo] 无法提取 base64 数据"), new Error("base64 格式错误");
            Un = xn, console.log("[Kling v2.5 Turbo] 添加参考图片 (image) via base64"), console.log("[Kling v2.5 Turbo] - base64 前30字符:", xn.substring(0, 30)), console.log("[Kling v2.5 Turbo] - base64 长度:", xn.length);
          }
        }
      } catch (tr) {
        return console.error("[Kling v2.5 Turbo] 图片处理失败:", tr), alert(x(GJi)), w(t.id, {
          isGenerating: !1
        }), null;
      }
      const Cr = WJi({
        prompt: i,
        durationInt: Ln,
        mode: tt,
        aspectRatio: zt,
        image: Un,
        imageTail: er
      });
      q = Cr, console.log("[Kling v2.5 Turbo] 比例:", zt), console.log("[Kling v2.5 Turbo] 请求参数:", JSON.stringify(Cr, null, 2));
    } else if (O2(n)) {
      const Lt = y(t.id, "veo_start"),
        ct = y(t.id, "veo_end"),
        Dt = !!Lt,
        bn = !!ct,
        Rt = !!(l && l.length > 0),
        fn = YJi({
          currentModel: n,
          baseUrl: a,
          duration: $t,
          ratio: o,
          hasStartFrame: Dt,
          hasEndFrame: bn,
          hasReferenceImage: Rt,
          klingV26Resolution: ((at = t.settings) == null ? void 0 : at.klingV26Resolution) || "std",
          klingV26Sound: ((Pt = t.settings) == null ? void 0 : Pt.klingV26Sound) || "off"
        }),
        {
          hasFrameInput: Zt,
          durationStr: Ln,
          mode: tt,
          sound: zt,
          aspectRatio: an
        } = fn;
      Q = fn.endpoint;
      const Rn = XJi({
        hasFrameInput: Zt,
        startUrl: Lt,
        endUrl: ct,
        hasReferenceImage: Rt,
        refImages: l
      });
      console.log("[Kling v2.6] 输入检测:", {
        hasStartFrame: Dt,
        hasEndFrame: bn,
        hasReferenceImage: Rt,
        refImagesCount: (l == null ? void 0 : l.length) || 0,
        refImagesPreview: l == null ? void 0 : l.map(kn => `"${kn == null ? void 0 : kn.substring(0, 50)}"`)
      }), console.log("[Kling v2.6] 时长:", Ln), console.log("[Kling v2.6] 用户选择的模式:", ((dt = t.settings) == null ? void 0 : dt.klingV26Resolution) || "std", "声音:", ((xt = t.settings) == null ? void 0 : xt.klingV26Sound) || "off"), Zt ? console.log(`[Kling v2.6] 检测到首尾帧，强制 pro 模式（API 要求）: ${tt}`) : Rt ? console.log(`[Kling v2.6] 检测到参考图片，使用用户选择的模式: ${tt}`) : console.log("[Kling v2.6] 使用用户设置的模式:", tt), tt === "pro" ? console.log("[Kling v2.6] pro 模式，使用用户设置的声音:", zt) : console.log(!Zt && !Rt ? "[Kling v2.6] std 模式不支持声音，已强制 sound: off" : "[Kling v2.6] std 模式，强制 sound: off（API限制）");
      const Un = async kn => {
        var Fn, cr, vr, Wt, Jt;
        const xn = (kn || "").trim();
        if (!xn) return null;
        try {
          let Nn = xn;
          const En = /^[A-Za-z0-9+/=]+$/.test(xn);
          !xn.startsWith("data:") && En && (Nn = `data:image/jpeg;base64,${xn}`);
          const Zn = await Ns(Nn, {
            compressForApi: !1
          });
          if (!Zn) return null;
          const Sr = Zn.type || "image/jpeg",
            Bn = (() => {
              const wa = Sr.toLowerCase();
              return wa.includes("png") ? ".png" : wa.includes("webp") ? ".webp" : ".jpg";
            })(),
            Et = `kling-v2.6-image-${Date.now()}${Bn}`,
            zn = new File([Zn], Et, {
              type: Sr
            }),
            Mn = new FormData();
          Mn.append("file", zn);
          const or = await fetch(`${a}/v1/files`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${f}`
            },
            body: Mn
          });
          if (!or.ok) {
            const wa = await or.text().catch(() => "");
            return console.warn("[Kling v2.6] /v1/files upload failed:", or.status, or.statusText, wa.slice(0, 200)), null;
          }
          const mr = await or.json().catch(() => ({}));
          let Yr = (mr == null ? void 0 : mr.url) || (mr == null ? void 0 : mr.file_url) || (mr == null ? void 0 : mr.download_url) || ((Fn = mr == null ? void 0 : mr.data) == null ? void 0 : Fn.url) || ((cr = mr == null ? void 0 : mr.data) == null ? void 0 : cr.file_url) || ((vr = mr == null ? void 0 : mr.data) == null ? void 0 : vr.download_url);
          if (!Yr && (mr != null && mr.id || (Wt = mr == null ? void 0 : mr.data) != null && Wt.id)) {
            const wa = String((mr == null ? void 0 : mr.id) ?? ((Jt = mr == null ? void 0 : mr.data) == null ? void 0 : Jt.id));
            Yr = `${a}/v1/files/${wa}/content`;
          }
          if (!Yr || typeof Yr != "string") return null;
          const aa = Yr.trim();
          return aa.startsWith("/") ? `${a}${aa}` : aa;
        } catch (Nn) {
          return console.warn("[Kling v2.6] upload image failed:", Nn), null;
        }
      };
      let er, Cr;
      if (Zt || Rt) try {
        if (Zt) {
          if (Lt && Rn.imageUrl) {
            let kn = await K(Rn.imageUrl);
            if (kn.startsWith("http://") || kn.startsWith("https://")) {
              const cr = await (await fetch(kn)).blob();
              kn = await Fu(cr);
            }
            if (!kn.startsWith("data:") && !/^[A-Za-z0-9+/=]+$/.test(kn.trim())) throw new Error("首帧图片格式错误");
            const xn = await Un(kn);
            if (xn) er = xn, console.log("[Kling v2.6] 首帧(image) via url");else {
              const Fn = Y(kn);
              if (!Fn) throw new Error("首帧 base64 格式错误");
              er = Fn, console.log("[Kling v2.6] 首帧(image) via base64");
            }
          } else if (Rn.imageUrl) {
            let kn = await K(Rn.imageUrl);
            if (kn.startsWith("http://") || kn.startsWith("https://")) {
              const cr = await (await fetch(kn)).blob();
              kn = await Fu(cr);
            }
            const xn = await Un(kn);
            if (xn) er = xn, console.log("[Kling v2.6] 尾帧作为首帧(image) via url");else {
              const Fn = Y(kn);
              Fn && (er = Fn);
            }
          }
          if (Rn.imageTailUrl) {
            let kn = await K(Rn.imageTailUrl);
            if (kn.startsWith("http://") || kn.startsWith("https://")) {
              const cr = await (await fetch(kn)).blob();
              kn = await Fu(cr);
            }
            if (!kn.startsWith("data:") && !/^[A-Za-z0-9+/=]+$/.test(kn.trim())) throw new Error("尾帧图片格式错误");
            const xn = await Un(kn);
            if (xn) Cr = xn, console.log("[Kling v2.6] 尾帧(image_tail) via url");else {
              const Fn = Y(kn);
              if (!Fn) throw new Error("尾帧 base64 格式错误");
              Cr = Fn, console.log("[Kling v2.6] 尾帧(image_tail) via base64");
            }
          }
        } else if (Rn.imageUrl) {
          let kn = await K(Rn.imageUrl);
          if (kn.startsWith("http://") || kn.startsWith("https://")) {
            const cr = await (await fetch(kn)).blob();
            kn = await Fu(cr);
          }
          if (!kn.startsWith("data:") && !/^[A-Za-z0-9+/=]+$/.test(kn.trim())) throw new Error("图片格式错误");
          const xn = await Un(kn);
          if (xn) er = xn, console.log("[Kling v2.6] 参考图片(image) via url");else {
            const Fn = Y(kn);
            if (!Fn) throw new Error("base64 格式错误");
            er = Fn, console.log("[Kling v2.6] 参考图片(image) via base64");
          }
        }
      } catch (kn) {
        return console.error("[Kling v2.6] 图片处理失败:", kn), alert(x(KJi)), w(t.id, {
          isGenerating: !1
        }), null;
      }
      const tr = JJi({
        prompt: i,
        durationStr: Ln,
        mode: tt,
        sound: zt,
        aspectRatio: an,
        image: er,
        imageTail: Cr
      });
      q = tr, console.log("[Kling v2.6] 请求参数:", JSON.stringify(tr, null, 2));
    } else if (jv(n)) {
      const Lt = y(t.id, "veo_start"),
        ct = y(t.id, "veo_end"),
        Dt = !!Lt,
        bn = !!ct,
        Rt = !!(l && l.length > 0),
        fn = aZi({
          currentModel: n,
          baseUrl: a,
          prompt: i,
          duration: $t,
          ratio: o,
          hasStartFrame: Dt,
          hasEndFrame: bn,
          hasReferenceImage: Rt,
          resolution: ((yn = t.settings) == null ? void 0 : yn.resolution) || "720P",
          klingV3Sound: ((gn = t.settings) == null ? void 0 : gn.klingV3Sound) || "on",
          klingV3MultiShot: !!((mt = t.settings) != null && mt.klingV3MultiShot),
          klingV3ShotType: (Xt = t.settings) == null ? void 0 : Xt.klingV3ShotType,
          klingV3MultiPrompt: (Gn = t.settings) == null ? void 0 : Gn.klingV3MultiPrompt,
          klingSubjects: (rr = t.settings) == null ? void 0 : rr.klingSubjects
        }),
        {
          hasFrameInput: Zt,
          durationStr: Ln,
          sound: tt,
          resolution: zt,
          mode: an,
          multiShot: Rn,
          shotType: Un,
          multiPrompt: er,
          elementList: Cr,
          aspectRatio: tr
        } = fn;
      Q = fn.endpoint;
      const kn = iZi({
          hasFrameInput: Zt,
          startUrl: Lt,
          endUrl: ct,
          hasReferenceImage: Rt,
          refImages: l
        }),
        xn = (Jt, Nn) => {
          const En = Math.ceil(Nn.length * 3 / 4);
          console.log(`[Kling v3] ${Jt}: base64Chars=${Nn.length}, decodedEst=${(En / 1024 / 1024).toFixed(2)}MB`);
        },
        Fn = async Jt => {
          var En, Zn, Sr, Bn, Et;
          const Nn = (Jt || "").trim();
          if (!Nn) return null;
          try {
            const zn = await Ns(Nn, {
                compressForApi: !1
              }),
              Mn = zn.type || "image/jpeg",
              or = (() => {
                const xr = Mn.toLowerCase();
                return xr.includes("png") ? ".png" : xr.includes("webp") ? ".webp" : (xr.includes("jpeg") || xr.includes("jpg"), ".jpg");
              })(),
              mr = `kling-v3-image-${Date.now()}${or}`,
              Yr = new File([zn], mr, {
                type: Mn
              }),
              aa = new FormData();
            aa.append("file", Yr);
            const wa = await fetch(`${a}/v1/files`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${f}`
              },
              body: aa
            });
            if (!wa.ok) {
              const xr = await wa.text().catch(() => "");
              return console.warn("[Kling v3] /v1/files upload failed:", wa.status, wa.statusText, xr.slice(0, 200)), null;
            }
            const xa = await wa.json().catch(() => ({}));
            let Aa = (xa == null ? void 0 : xa.url) || (xa == null ? void 0 : xa.file_url) || (xa == null ? void 0 : xa.download_url) || ((En = xa == null ? void 0 : xa.data) == null ? void 0 : En.url) || ((Zn = xa == null ? void 0 : xa.data) == null ? void 0 : Zn.file_url) || ((Sr = xa == null ? void 0 : xa.data) == null ? void 0 : Sr.download_url);
            if (!Aa && (xa != null && xa.id || (Bn = xa == null ? void 0 : xa.data) != null && Bn.id)) {
              const xr = String((xa == null ? void 0 : xa.id) ?? ((Et = xa == null ? void 0 : xa.data) == null ? void 0 : Et.id));
              Aa = `${a}/v1/files/${xr}/content`;
            }
            if (!Aa || typeof Aa != "string") return null;
            const pn = Aa.trim();
            return pn.startsWith("/") ? `${a}${pn}` : pn;
          } catch (zn) {
            return console.warn("[Kling v3] upload image failed:", zn), null;
          }
        };
      let cr, vr;
      if (Zt || Rt) try {
        if (Zt) {
          if (Lt && kn.imageUrl) {
            let Jt = await K(kn.imageUrl);
            if (Jt.startsWith("http://") || Jt.startsWith("https://")) {
              const Zn = await (await fetch(Jt)).blob();
              Jt = await Fu(Zn);
            }
            const Nn = await Fn(Jt);
            if (Nn) cr = Nn;else {
              const En = Y(Jt);
              En && (cr = En, xn("image", En));
            }
          } else if (kn.imageUrl) {
            let Jt = await K(kn.imageUrl);
            if (Jt.startsWith("http://") || Jt.startsWith("https://")) {
              const Zn = await (await fetch(Jt)).blob();
              Jt = await Fu(Zn);
            }
            const Nn = await Fn(Jt);
            if (Nn) cr = Nn;else {
              const En = Y(Jt);
              En && (cr = En, xn("image", En));
            }
          }
          if (kn.imageTailUrl) {
            let Jt = await K(kn.imageTailUrl);
            if (Jt.startsWith("http://") || Jt.startsWith("https://")) {
              const Zn = await (await fetch(Jt)).blob();
              Jt = await Fu(Zn);
            }
            const Nn = await Fn(Jt);
            if (Nn) vr = Nn;else {
              const En = Y(Jt);
              En && (vr = En, xn("image_tail", En));
            }
          }
        } else if (kn.imageUrl) {
          let Jt = await K(kn.imageUrl);
          if (Jt.startsWith("http://") || Jt.startsWith("https://")) {
            const Zn = await (await fetch(Jt)).blob();
            Jt = await Fu(Zn);
          }
          const Nn = await Fn(Jt);
          if (Nn) cr = Nn;else {
            const En = Y(Jt);
            En && (cr = En, xn("image", En));
          }
        }
      } catch (Jt) {
        return console.error("[Kling v3] 图片处理失败:", Jt), alert(x(eZi)), w(t.id, {
          isGenerating: !1
        }), null;
      }
      const Wt = oZi({
        prompt: fn.prompt,
        durationStr: Ln,
        sound: tt,
        resolution: zt,
        mode: an,
        multiShot: Rn,
        shotType: Un,
        multiPrompt: er,
        elementList: Cr,
        aspectRatio: tr,
        image: cr,
        imageTail: vr
      });
      q = Wt, console.log("[Kling v3] 请求参数:", JSON.stringify(Wt, null, 2));
    } else if (Dv(n)) {
      const Lt = !!((qn = t.settings) != null && qn.veoFramesMode),
        ct = mZi({
          framesMode: Lt,
          startPort: y(t.id, "veo_start"),
          endPort: y(t.id, "veo_end"),
          refImages: l
        }),
        Dt = uZi({
          currentModel: n,
          baseUrl: a,
          modelName: r == null ? void 0 : r.modelName,
          ratio: o,
          resolution: s,
          durationNum: je,
          isFramesMode: Lt
        });
      Q = Dt.endpoint;
      const bn = async Ln => {
        const tt = await U(Ln),
          zt = tt.type || "image/png",
          an = await Fu(tt),
          Rn = Y(an) || "";
        if (!Rn) throw new Error("图片处理失败：无法转换为 base64");
        return {
          mimeType: zt,
          bytesBase64Encoded: Rn
        };
      };
      let Rt, fn, Zt;
      ct.startUrl && (Rt = await bn(ct.startUrl), console.log("[Gemini Veo Official] 首尾帧：已添加首帧 image")), ct.endUrl && (fn = await bn(ct.endUrl), console.log("[Gemini Veo Official] 首尾帧：已添加尾帧 lastFrame")), !ct.startUrl && !ct.endUrl && (ct.imageUrl != null ? (Rt = await bn(ct.imageUrl), console.log("[Gemini Veo Official] image2video：已添加起始帧 image"), ct.referenceUrls.length > 0 && (Zt = await Promise.all(ct.referenceUrls.map(async Ln => ({
        image: await bn(Ln),
        referenceType: "asset"
      }))), console.log("[Gemini Veo Official] referenceImages：已添加", Zt.length, "张"))) : console.log("[Gemini Veo Official] text2video：仅 prompt")), q = hZi({
        prompt: i,
        aspectRatio: Dt.aspectRatio,
        resolution: Dt.parameterResolution,
        durationSeconds: Dt.durationSeconds,
        image: Rt,
        lastFrame: fn,
        referenceImages: Zt
      }), ne = !1;
    } else if (Ex(n)) {
      const Lt = bZi({
        currentModel: n,
        baseUrl: a,
        ratio: o,
        resolution: s
      });
      Q = Lt.endpoint;
      const ct = Lt.aspectRatio,
        Dt = Lt.isFastModel,
        bn = Lt.isVeo31FastOnly,
        Rt = Lt.isVeo31LiteOnly,
        fn = Lt.isProModel,
        Zt = Lt.userSelectedResolution,
        Ln = !!((Dn = t.settings) != null && Dn.veoFramesMode),
        tt = xZi({
          framesMode: Ln,
          startPort: y(t.id, "veo_start"),
          endPort: y(t.id, "veo_end")
        }),
        zt = async Wt => {
          if (Wt.startsWith("content_ref:")) try {
            const {
              contentStore: Jt
            } = await Ie(async () => {
              const {
                contentStore: Zn
              } = await Promise.resolve().then(() => Ly);
              return {
                contentStore: Zn
              };
            }, void 0, import.meta.url);
            await Jt.init();
            const Nn = Jt.extractId(Wt);
            console.log("[Veo] 解析 content_ref:", Nn);
            const En = await Jt.get(Nn);
            if (En) return console.log("[Veo] ✅ content_ref 已解析"), En;
            throw console.error("[Veo] ❌ content_ref 解析失败，内容不存在:", Nn), new Error(`content_ref 不存在: ${Nn}`);
          } catch (Jt) {
            throw console.error("[Veo] ❌ content_ref 解析失败:", Jt), Jt;
          }
          return Wt;
        },
        an = async Wt => {
          const Jt = String(Wt || "").trim();
          if (!Jt) throw new Error("参考图为空");
          if (Jt.startsWith("data:")) return Jt;
          if (Jt.startsWith("http://") || Jt.startsWith("https://")) return H(Jt);
          try {
            const {
                prepareAssetForModel: Nn,
                toBase64String: En
              } = await Ie(async () => {
                const {
                  prepareAssetForModel: Bn,
                  toBase64String: Et
                } = await Promise.resolve().then(() => up);
                return {
                  prepareAssetForModel: Bn,
                  toBase64String: Et
                };
              }, void 0, import.meta.url),
              Zn = L(Jt),
              Sr = await Nn({
                assetRef: Jt,
                modelId: "google-veo3",
                purpose: "image-reference",
                requestedTransportMode: "base64",
                assetId: Zn.assetId,
                assetIdHints: Zn.assetIdHints,
                sourceNode: Zn.sourceNode,
                nodes: Zn.nodes
              });
            return await En({
              prepared: Sr,
              pureBase64: !1
            });
          } catch (Nn) {
            return console.warn("[Veo] Phase3-C prepare base64 失败，回退 processImageForVideoAPI:", Nn), H(Jt);
          }
        },
        Rn = async (Wt, Jt = 5 * 1024 * 1024) => {
          const Nn = Wt.length;
          if (Nn <= Jt) return console.log("[Veo] 图片大小符合要求:", (Nn / 1024 / 1024).toFixed(2), "MB"), Wt;
          console.log("[Veo] 图片过大，开始压缩:", (Nn / 1024 / 1024).toFixed(2), "MB → 目标: < 5MB");
          try {
            const En = new Image();
            await new Promise((or, mr) => {
              En.onload = or, En.onerror = mr, En.src = Wt;
            });
            const Zn = document.createElement("canvas"),
              Sr = Zn.getContext("2d");
            if (!Sr) throw new Error("无法创建 Canvas 上下文");
            let Bn = .9,
              Et = Wt,
              zn = 0;
            const Mn = 10;
            for (; Et.length > Jt && zn < Mn;) if (Zn.width = En.width, Zn.height = En.height, Sr.clearRect(0, 0, Zn.width, Zn.height), Sr.drawImage(En, 0, 0), Et = await q2(Zn, "image/jpeg", Bn), console.log(`[Veo] 压缩尝试 ${zn + 1}/${Mn}, 质量: ${Bn.toFixed(2)}, 大小: ${(Et.length / 1024 / 1024).toFixed(2)} MB`), Bn -= .1, zn++, Bn < .3 && Et.length > Jt) {
              Zn.width = Math.floor(En.width * .8), Zn.height = Math.floor(En.height * .8), Sr.clearRect(0, 0, Zn.width, Zn.height), Sr.drawImage(En, 0, 0, Zn.width, Zn.height), Et = await q2(Zn, "image/jpeg", .8), console.log(`[Veo] 缩小尺寸至 ${Zn.width}x${Zn.height}, 大小: ${(Et.length / 1024 / 1024).toFixed(2)} MB`);
              break;
            }
            if (Et.length > Jt ? console.warn("[Veo] ⚠️ 压缩后仍然超过限制，但已尽力压缩") : console.log("[Veo] ✅ 压缩成功:", (Et.length / 1024 / 1024).toFixed(2), "MB"), !Et.startsWith("data:image/")) throw console.error("[Veo] ❌ 压缩后的图片格式不正确:", Et.substring(0, 50)), new Error("压缩后的图片格式不正确");
            return Et;
          } catch (En) {
            return console.error("[Veo] 压缩失败，使用原图:", En), Wt;
          }
        };
      let Un = [];
      const {
          isVeoFastHttpImageUrl: er,
          getInputImageOssRemoteUrl: Cr,
          normalizeOssPublicHttpUrl: tr
        } = await Ie(async () => {
          const {
            isVeoFastHttpImageUrl: Wt,
            getInputImageOssRemoteUrl: Jt,
            normalizeOssPublicHttpUrl: Nn
          } = await Promise.resolve().then(() => ii);
          return {
            isVeoFastHttpImageUrl: Wt,
            getInputImageOssRemoteUrl: Jt,
            normalizeOssPublicHttpUrl: Nn
          };
        }, void 0, import.meta.url),
        kn = async Wt => {
          var Nn;
          if (!Dt) return Wt;
          const Jt = String(Wt || "").trim();
          if (er(Jt)) {
            const En = tr(Jt) || Jt;
            return console.log("[Veo Fast] 使用标准 HTTP/OSS URL:", En.substring(0, 120)), En;
          }
          try {
            if (S && C) {
              const En = C.filter(Zn => Zn.to === t.id);
              for (const Zn of En) {
                const Sr = S.find(Mn => Mn.id === Zn.from);
                if (!Sr || Sr.type !== "input-image" || !(Sr.content === Wt || String(Sr.content || "").trim() === Jt)) continue;
                const Et = Cr(Sr);
                if (Et && er(Et)) {
                  const Mn = tr(Et) || Et;
                  return console.log("[Veo Fast] 使用上游 input-image OSS 原图:", Mn.substring(0, 120)), Mn;
                }
                const zn = (Nn = Sr.settings) == null ? void 0 : Nn.originalUrl;
                if (zn && er(zn)) {
                  const Mn = tr(zn) || zn;
                  return console.log("[Veo Fast] 使用上游 originalUrl:", Mn.substring(0, 120)), Mn;
                }
              }
            }
          } catch (En) {
            console.warn("[Veo Fast] 获取上游 OSS URL 失败:", En);
          }
          return console.log("[Veo Fast] 未找到标准 URL，将转换为 base64"), Wt;
        };
      if (tt.length > 0) console.log("[Veo] 处理首尾帧图片，数量:", tt.length, Dt ? "(Fast模式-URL)" : "(标准模式-Base64)"), Un = await Promise.all(tt.map(async (Wt, Jt) => {
        console.log(`[Veo] 处理图片 ${Jt + 1}/${tt.length}:`, Wt.substring(0, 100));
        try {
          if (Wt = await zt(Wt), Dt) {
            const Nn = await kn(Wt);
            if (er(Nn)) return console.log(`[Veo Fast] 图片 ${Jt + 1} 使用标准 HTTP URL:`, Nn), Nn;
            {
              console.log(`[Veo Fast] 图片 ${Jt + 1} 不是标准URL，转换为 base64`);
              let Zn = await an(Nn);
              return Zn = await Rn(Zn), Zn;
            }
          } else {
            let Nn;
            return Wt.startsWith("data:") ? (console.log(`[Veo] 图片 ${Jt + 1} 已是 base64 格式`), Nn = Wt) : (console.log(`[Veo] 图片 ${Jt + 1} 解析为 base64…`), Nn = await an(Wt), console.log(`[Veo] 图片 ${Jt + 1} 转换成功，大小:`, (Nn.length / 1024 / 1024).toFixed(2), "MB")), Nn = await Rn(Nn), Nn;
          }
        } catch (Nn) {
          throw console.error(`[Veo] 图片 ${Jt + 1} 处理失败:`, Nn), Nn;
        }
      })), console.log("[Veo] 所有首尾帧图片处理完成");else {
        const Wt = kZi({
          hasReferenceImage: d,
          refImages: l
        });
        Wt.length > 0 && (console.log("[Veo] 处理参考图片，数量:", Wt.length, "（最多使用3张）", Dt ? "(Fast模式-URL)" : "(标准模式-Base64)"), Un = await Promise.all(Wt.map(async (Jt, Nn) => {
          console.log(`[Veo] 处理参考图 ${Nn + 1}/${Wt.length}:`, Jt.substring(0, 100));
          try {
            if (Jt = await zt(Jt), Dt) {
              const En = await kn(Jt);
              if (er(En)) return console.log(`[Veo Fast] 参考图 ${Nn + 1} 使用标准 HTTP URL:`, En), En;
              {
                console.log(`[Veo Fast] 参考图 ${Nn + 1} 不是标准URL，转换为 base64`);
                let Sr = await an(En);
                return Sr = await Rn(Sr), Sr;
              }
            } else {
              let En;
              return Jt.startsWith("data:") ? (console.log(`[Veo] 参考图 ${Nn + 1} 已是 base64 格式`), En = Jt) : (console.log(`[Veo] 参考图 ${Nn + 1} 解析为 base64…`), En = await an(Jt), console.log(`[Veo] 参考图 ${Nn + 1} 转换成功，大小:`, (En.length / 1024 / 1024).toFixed(2), "MB")), En = await Rn(En), En;
            }
          } catch (En) {
            throw console.error(`[Veo] 参考图 ${Nn + 1} 处理失败:`, En), En;
          }
        })), console.log("[Veo] 所有参考图片处理完成"));
      }
      if (Un.length > 0) {
        if (console.log("[Veo] 图生视频模式（通过images参数），图片数量:", Un.length), console.log("[Veo] 图片格式检查:", Un.map((Wt, Jt) => ({
          index: Jt,
          type: Wt.startsWith("data:") ? "base64" : Wt.startsWith("http") ? "http" : "unknown",
          length: Wt.length,
          sizeMB: (Wt.length / 1024 / 1024).toFixed(2),
          mimeType: Wt.startsWith("data:") ? Wt.substring(5, Wt.indexOf(";")) : "N/A",
          preview: Wt.substring(0, 50)
        }))), Dt) console.log("[Veo Fast] 使用 URL 格式，跳过 base64 验证");else {
          const Wt = Un.filter(Nn => !Nn.startsWith("data:image/"));
          if (Wt.length > 0) throw console.error("[Veo] ❌ 发现非base64格式的图片:", Wt.length), new Error(`图片格式错误：${Wt.length} 张图片不是base64格式`);
          const Jt = Un.filter(Nn => Nn.length > 10 * 1024 * 1024);
          Jt.length > 0 && console.warn("[Veo] ⚠️ 发现超大图片:", Jt.length, "张图片超过10MB");
        }
      } else console.log("[Veo] 文生视频模式（无images参数）");
      console.log(Zt === "1080P" ? "[Veo] 用户选择1080P，发送 enable_upsample: true（返回1080P视频）" : Zt === "4K" ? "[Veo] 用户选择4K，发送 resolution: 4K" : `[Veo] 用户选择${Zt}，使用默认720P（不发送resolution参数）`), Un.length > 0 && console.log("[Veo] 图生视频模式，分辨率由参考图自动决定" + (Zt === "1080P" ? "，enable_upsample提升到1080P" : ""));
      const xn = _Zi(Ln, tt),
        Fn = s === "4K" || Lt.payloadResolution === "4K",
        cr = vZi({
          isVeo31FastOnly: bn,
          isVeo31LiteOnly: Rt,
          isProModel: fn,
          hasFrames: xn,
          imageCount: Un.length,
          is4K: Fn
        });
      console.log(`[Veo] 使用 MODEL ID: ${cr}`);
      const vr = wZi({
        prompt: i,
        model: cr,
        images: Un,
        aspectRatio: ct,
        enableUpsample: Lt.enableUpsample,
        resolution: Lt.payloadResolution
      });
      console.log("[Veo] 最终 Payload:", {
        model: vr.model,
        prompt: vr.prompt,
        resolution: vr.resolution || Zt,
        aspect_ratio: vr.aspect_ratio,
        enhance_prompt: vr.enhance_prompt,
        enable_upsample: vr.enable_upsample,
        imagesCount: Un.length,
        hasImages: Un.length > 0,
        isFramesMode: xn,
        isImageToVideo: Un.length > 0
      }), q = vr;
    } else if (bx(n)) {
      const {
          startRaw: Lt,
          endRaw: ct
        } = TZi({
          currentModel: n,
          veoFramesMode: !!((Ar = t.settings) != null && Ar.veoFramesMode),
          startPort: y(t.id, "veo_start"),
          endPort: y(t.id, "veo_end")
        }),
        Dt = EZi({
          currentModel: n,
          baseUrl: a,
          modelName: r == null ? void 0 : r.modelName,
          ratio: o,
          resolution: s,
          durationNum: je,
          veoFramesMode: !!((_r = t.settings) != null && _r.veoFramesMode),
          hasStartFrame: !!Lt,
          hasEndFrame: !!ct
        });
      Q = Dt.endpoint;
      const bn = Dt.isHailuoFramesMode;
      console.log("[Hailuo] 模式检测:", {
        model: Dt.model,
        currentModel: n,
        isHailuoFramesMode: bn,
        hasStartFrame: !!Lt,
        hasEndFrame: !!ct,
        hasReferenceImage: d,
        refImagesCount: l.length,
        resolution: Dt.resolution
      }), bn && Lt && ct && s !== "768P" && s !== "1080P" && console.log("[Hailuo] 首尾帧模式强制使用768P（原分辨率:", s, "）"), a.includes("t8star") && console.log("[Generation] Hailuo模型检测到错误URL，自动切换到默认端点");
      const Rt = async Rn => {
          if (!Rn) return null;
          if (Rn.startsWith("data:") || Rn.startsWith("http://") || Rn.startsWith("https://")) return Rn;
          try {
            return await H(Rn);
          } catch (Un) {
            console.warn("[Hailuo] Phase3-D 参考图失败，回退 getBlobFromUrl:", Un);
            const er = await Ns(Rn);
            return await Fu(er);
          }
        },
        fn = await Rt(Lt),
        Zt = await Rt(ct),
        Ln = MZi({
          startResolved: fn,
          endResolved: Zt,
          refImages: l
        });
      let tt, zt;
      if (Ln.mode === "frames") console.log("[Hailuo] 使用首尾帧模式"), tt = Ln.first, zt = Ln.last;else if (Ln.mode === "i2v") {
        console.log("[Hailuo] 使用图生视频模式，图片数量:", l.length);
        const Rn = await Rt(Ln.raw);
        Rn ? (console.log("[Hailuo] 图片已解析，类型:", Rn.substring(0, 30)), tt = Rn) : console.warn("[Hailuo] 图片解析失败");
      } else console.log("[Hailuo] 使用文生视频模式");
      const an = PZi({
        prompt: i,
        model: Dt.model,
        aspectRatio: Dt.aspectRatio,
        duration: Dt.duration,
        resolution: Dt.resolution,
        firstFrameImage: tt,
        lastFrameImage: zt
      });
      console.log("[Hailuo] 最终 payload:", {
        model: an.model,
        prompt: an.prompt,
        duration: an.duration,
        resolution: an.resolution,
        hasFirstFrame: !!an.first_frame_image,
        hasLastFrame: !!an.last_frame_image
      }), q = an;
    } else if (Y1(n)) {
      const Lt = (Pa = t.settings) == null ? void 0 : Pa.wan26AudioConfig,
        ct = OZi({
          currentModel: n,
          baseUrl: a,
          prompt: i,
          modelName: r == null ? void 0 : r.modelName,
          durationNum: je,
          wan26MultiShot: !!((fa = t.settings) != null && fa.wan26MultiShot),
          wan26Resolution: (Ca = t.settings) == null ? void 0 : Ca.wan26Resolution,
          audioConfig: Lt
        }),
        {
          isOfficial: Dt,
          enableMultiShot: bn
        } = ct;
      Q = ct.endpoint;
      const Rt = ct.prompt;
      console.log("[Wan 2.6] 选择 endpoint:", {
        isOfficial: Dt,
        enableMultiShot: bn,
        endpoint: Q.substring(0, 100)
      });
      const fn = ($n = t.settings) == null ? void 0 : $n.wan26AudioFile,
        Zt = (yr = t.settings) == null ? void 0 : yr.wan26AudioSegment;
      let Ln;
      if (Lt === "upload" && fn) try {
        console.log("[Wan 2.6] 开始上传音频文件:", {
          name: fn.name,
          size: fn.size,
          type: fn.type,
          segment: Zt
        }), Ln = await Q9t(fn, Zt || void 0, f, a), console.log("[Wan 2.6] 音频处理成功，URL:", Ln.substring(0, 100));
      } catch (Un) {
        console.error("[Wan 2.6] 音频上传失败:", Un);
        const er = Un instanceof Error ? Un.message : String(Un);
        let Cr = `音频上传失败: ${er}

`;
        throw (er.includes("CORS") || er.includes("Failed to fetch")) && (Cr += `可能的原因：
`, Cr += `1. 第三方代理服务不支持文件上传
`, Cr += `2. 需要配置 CORS 跨域访问

`, Cr += `建议解决方案：
`, Cr += `• 联系第三方代理服务商询问文件上传接口
`, Cr += `• 或使用"自动配音"功能
`, Cr += "• 或将音频文件上传到公网（如阿里云 OSS）后提供 URL"), new Error(Cr);
      }
      let tt;
      const zt = LZi({
        hasReferenceImage: d,
        refImages: l
      });
      if (zt) {
        let Un = zt[0];
        if (console.log("[Wan 2.6] 开始处理图片，原始 URL 类型:", Un.substring(0, 50)), !Un.startsWith("http://") && !Un.startsWith("https://") && !Un.startsWith("data:")) try {
          Un = await H(Un), console.log("[Wan 2.6] Phase3-D 已 prepare→data URL");
        } catch (er) {
          console.warn("[Wan 2.6] Phase3-D prepare 失败，继续旧加载路径:", er);
        }
        try {
          const er = new Image();
          er.crossOrigin = "anonymous";
          const tr = await new Promise((Wt, Jt) => {
              er.onload = () => Wt(er), er.onerror = Jt, er.src = Un;
            }),
            kn = tr.width,
            xn = tr.height;
          console.log("[Wan 2.6] 原始图片尺寸:", {
            width: kn,
            height: xn
          });
          const Fn = 240,
            cr = 7680;
          if (kn < Fn || xn < Fn || kn > cr || xn > cr) {
            console.log("[Wan 2.6] 图片尺寸超出范围，需要调整");
            let Wt = kn,
              Jt = xn;
            if (Wt < Fn || Jt < Fn) {
              const Zn = Math.max(Fn / Wt, Fn / Jt);
              Wt = Math.round(Wt * Zn), Jt = Math.round(Jt * Zn);
            }
            if (Wt > cr || Jt > cr) {
              const Zn = Math.min(cr / Wt, cr / Jt);
              Wt = Math.round(Wt * Zn), Jt = Math.round(Jt * Zn);
            }
            console.log("[Wan 2.6] 调整后图片尺寸:", {
              width: Wt,
              height: Jt
            });
            const Nn = document.createElement("canvas");
            Nn.width = Wt, Nn.height = Jt;
            const En = Nn.getContext("2d");
            if (!En) throw new Error("无法创建 canvas context");
            En.drawImage(tr, 0, 0, Wt, Jt), Un = Nn.toDataURL("image/png"), console.log("[Wan 2.6] 图片已调整并转换为 Base64，长度:", Un.length);
          } else if (console.log("[Wan 2.6] 图片尺寸符合要求，无需调整"), Un.startsWith("blob:")) {
            const Wt = document.createElement("canvas");
            Wt.width = kn, Wt.height = xn;
            const Jt = Wt.getContext("2d");
            if (!Jt) throw new Error("无法创建 canvas context");
            Jt.drawImage(tr, 0, 0), Un = Wt.toDataURL("image/png"), console.log("[Wan 2.6] Blob URL 已转换为 Base64");
          }
        } catch (er) {
          throw console.error("[Wan 2.6] 图片处理失败:", er), new Error(DZi);
        }
        tt = [Un], console.log("[Wan 2.6] 图生视频模式，最终图片 URL 类型:", Un.substring(0, 50));
      }
      const an = ct.useNestedFormat;
      console.log("[Wan 2.6] 格式选择:", {
        isOfficial: Dt,
        enableMultiShot: bn,
        useNestedFormat: an,
        formatType: an ? "嵌套格式" : "扁平格式"
      }), console.log(an ? `[Wan 2.6] 使用嵌套格式 (${Dt ? "官方 API" : "多镜头模式"})` : `[Wan 2.6] 使用扁平格式（第三方代理${bn ? " - 多镜头" : " - 单镜头"}）`);
      const Rn = BZi({
        useNestedFormat: an,
        isOfficial: Dt,
        prompt: Rt,
        model: ct.model,
        resolution: ct.resolution,
        duration: ct.duration,
        enableMultiShot: bn,
        audioConfig: Lt,
        audioUrl: Ln,
        images: tt
      });
      if (an) {
        const Un = Rn.input,
          er = Rn.parameters;
        console.log("[Wan 2.6] Payload (嵌套格式):", {
          apiType: Dt ? "Official" : "Proxy",
          model: Rn.model,
          "input.prompt": Un.prompt,
          "input.img_url": Un.img_url ? String(Un.img_url).substring(0, 50) : "(无)",
          "input.audio_url": Un.audio_url ? String(Un.audio_url).substring(0, 50) : "(无)",
          "parameters.resolution": er.resolution,
          "parameters.duration": er.duration,
          "parameters.durationType": typeof er.duration,
          "parameters.shot_type": er.shot_type || "(单镜头)"
        });
      } else console.log("[Wan 2.6] Payload (扁平格式):", {
        model: Rn.model,
        prompt: Rn.prompt,
        duration: Rn.duration,
        durationType: typeof Rn.duration,
        shot_type: Rn.shot_type || "(单镜头)",
        images: Rn.images ? `[${Rn.images.length} images]` : "(无)",
        audio_url: Rn.audio_url ? String(Rn.audio_url).substring(0, 50) : "(无)",
        audio: Rn.audio,
        resolution: Rn.resolution
      });
      q = Rn;
    } else if (_b(n)) {
      const Lt = qZi({
          currentModel: n,
          veoFramesMode: !!((Ir = t.settings) != null && Ir.veoFramesMode),
          startPort: y(t.id, "veo_start"),
          endPort: y(t.id, "veo_end")
        }),
        ct = HZi({
          currentModel: n,
          baseUrl: a,
          modelName: r == null ? void 0 : r.modelName,
          durationSetting: ((Gr = t.settings) == null ? void 0 : Gr.duration) || Gj(n),
          ratio: o,
          resolution: (Zr = t.settings) == null ? void 0 : Zr.resolution,
          veoFramesMode: !!((La = t.settings) != null && La.veoFramesMode),
          frameImageCount: Lt.length,
          refImageCount: l.length
        });
      Q = ct.endpoint;
      const {
          modelName: Dt,
          durationNum: bn,
          maxDuration: Rt,
          durationSetting: fn,
          resolution: Zt,
          aspectRatio: Ln,
          mode: tt
        } = ct,
        zt = KZi({
          mode: tt,
          frameImages: Lt,
          refImages: l
        });
      let an;
      zt ? (an = await Promise.all(zt.map(Rn => W(Rn))), console.log(tt === "start-end" ? "[Vidu] 首尾帧模式 start-end2video" : tt === "reference" ? `[Vidu] 参考图 reference2video, 图片数: ${an.length}` : "[Vidu] 图生视频 img2video")) : console.log("[Vidu] 文生视频 text2video, duration:", bn, "model:", Dt), q = WZi({
        mode: tt,
        modelName: Dt,
        durationNum: bn,
        resolution: Zt,
        viduQ3: ct.viduQ3,
        prompt: i,
        aspectRatio: Ln,
        includeStyle: ct.includeStyle,
        images: an
      }), console.log("[Vidu] 请求参数:", {
        model: Dt,
        duration: bn,
        maxDuration: Rt,
        originalDuration: fn,
        resolution: Zt,
        aspectRatio: Ln
      });
    } else if (U5(n)) {
      const Lt = JZi({
        currentModel: n,
        baseUrl: a,
        prompt: i,
        ratio: o,
        mjMode: ((sa = t.settings) == null ? void 0 : sa.mjMode) || "fast",
        mjMotion: ((Ea = t.settings) == null ? void 0 : Ea.mjMotion) || "low"
      });
      Q = Lt.endpoint;
      const {
          mjMode: ct,
          motion: Dt,
          prompt: bn
        } = Lt,
        Rt = eeo(l);
      let fn = "";
      Rt != null && (fn = await H(Rt), console.log("[MJ Video] 图生视频，已添加首帧图片"));
      const Zt = ZZi({
        prompt: bn,
        motion: Dt,
        image: fn
      });
      q = Zt, console.log("[MJ Video] 请求参数:", {
        endpoint: Q,
        mode: ct,
        motion: Dt,
        hasImage: !!Zt.image,
        promptPreview: bn.substring(0, 100)
      });
    } else if (Dk(n)) {
      const Lt = teo({
        currentModel: n,
        baseUrl: a,
        modelName: r == null ? void 0 : r.modelName,
        ratio: o,
        durationNum: je
      });
      Q = Lt.endpoint, ne = !0;
      const ct = reo({
          model: Lt.model,
          prompt: i,
          size: Lt.size,
          seconds: Lt.seconds
        }),
        Dt = new FormData();
      for (const [Rt, fn] of Object.entries(ct)) Dt.append(Rt, fn);
      const bn = neo({
        videoPortRef: y(t.id, "video") || y(t.id, "reference_video"),
        refImages: l,
        refMetaByRawUrl: b
      });
      if (bn) {
        const Rt = await nFn(bn.url, {
          perNodeOss: T,
          apiKey: f,
          baseUrl: a,
          assetId: (ba = b == null ? void 0 : b.get(bn.url)) == null ? void 0 : ba.assetId,
          mediaType: bn.mediaType
        });
        Dt.append("input_reference", Rt);
      }
      q = Dt, console.log("[Omini] POST /v1/videos", {
        model: Lt.model,
        size: Lt.size,
        seconds: je,
        hasReference: !!bn
      });
    } else if (Cu(n)) {
      const Lt = await fQn({
        node: {
          ...t,
          settings: {
            ...t.settings,
            genUseAliyunOss: T
          }
        },
        prompt: i,
        refImages: l,
        refMetaByRawUrl: b,
        startPort: y(t.id, "veo_start"),
        endPort: y(t.id, "veo_end"),
        videoPort: y(t.id, "video") || y(t.id, "reference_video"),
        audioPort: y(t.id, "audio") || y(t.id, "reference_audio")
      }, {
        baseUrl: a,
        apiKey: f,
        modelName: r == null ? void 0 : r.modelName
      });
      Q = Lt.endpoint, q = Lt.payload, ne = !1;
    } else if (Fv(n)) {
      const {
          imageUrlsRaw: Lt,
          videoUrlsRaw: ct,
          audioUrlsRaw: Dt
        } = iC({
          refImages: l,
          refMetaByRawUrl: b,
          videoPortRef: y(t.id, "video") || y(t.id, "reference_video")
        }),
        bn = Lt.slice(0, aeo),
        Rt = ct.slice(0, ieo),
        fn = Dt.slice(0, oeo),
        Zt = leo({
          currentModel: n,
          baseUrl: a,
          modelName: r == null ? void 0 : r.modelName,
          durationNum: je,
          ratio: o,
          resolution: String(((ga = t.settings) == null ? void 0 : ga.resolution) || s || "2K"),
          imageCount: bn.length,
          videoCount: Rt.length,
          audioCount: fn.length
        });
      Q = Zt.endpoint, ne = !0;
      const Ln = async (er, Cr) => {
          const tr = b == null ? void 0 : b.get(er);
          return dve(er, {
            apiKey: f,
            baseUrl: a,
            assetId: tr == null ? void 0 : tr.assetId,
            mediaType: Cr
          });
        },
        [tt, zt, an] = await Promise.all([Promise.all(bn.map(er => Ln(er, "image"))), Promise.all(Rt.map(er => Ln(er, "video"))), Promise.all(fn.map(er => Ln(er, "audio")))]),
        Rn = ceo({
          model: Zt.model,
          prompt: i,
          seconds: Zt.seconds,
          resolution: Zt.resolution,
          aspectRatio: Zt.aspectRatio,
          imageUrls: tt,
          videoUrls: zt,
          audioUrls: an
        }),
        Un = new FormData();
      Un.append("model", Rn.model), Un.append("prompt", Rn.prompt), Un.append("seconds", Rn.seconds), Un.append("resolution", Rn.resolution), Un.append("aspect_ratio", Rn.aspect_ratio);
      for (const er of Rn.imageUrls) Un.append("imageUrls", er);
      for (const er of Rn.videoUrls) Un.append("videoUrls", er);
      for (const er of Rn.audioUrls) Un.append("audioUrls", er);
      q = Un, console.log("[MiniMax-H3] POST /v1/videos", {
        model: Zt.model,
        seconds: Zt.seconds,
        resolution: Zt.resolution,
        aspect_ratio: Zt.aspectRatio,
        imageUrls: tt.length,
        videoUrls: zt.length,
        audioUrls: an.length,
        sampleImageUrl: (_a = tt[0]) == null ? void 0 : _a.slice(0, 120)
      });
    } else if (X2(n)) {
      const Lt = t.settings || {},
        ct = yeo({
          currentModel: n,
          baseUrl: a,
          ratio: o,
          resolution: s,
          duration: $t,
          settings: Lt
        });
      Q = ct.endpoint, ne = !1;
      const Dt = ct.framesMode,
        {
          startFrameRaw: bn,
          endFrameRaw: Rt
        } = wne({
          framesMode: Dt,
          refImages: l,
          startPort: y(t.id, "veo_start"),
          endPort: y(t.id, "veo_end")
        }),
        {
          imageUrlsRaw: fn,
          videoUrlsRaw: Zt,
          audioUrlsRaw: Ln
        } = iC({
          framesMode: Dt,
          refImages: l,
          refMetaByRawUrl: b,
          videoPortRef: y(t.id, "video") || y(t.id, "reference_video"),
          audioPortRef: y(t.id, "audio") || y(t.id, "reference_audio")
        }),
        tt = async (tr, kn) => {
          const xn = b == null ? void 0 : b.get(tr);
          return dve(tr, {
            apiKey: f,
            baseUrl: a,
            assetId: xn == null ? void 0 : xn.assetId,
            mediaType: kn
          });
        },
        [zt, an, Rn, Un, er] = await Promise.all([Promise.all(fn.slice(0, ueo).map(tr => tt(tr, "image"))), Promise.all(Zt.slice(0, heo).map(tr => tt(tr, "video"))), Promise.all(Ln.slice(0, peo).map(tr => tt(tr, "audio"))), bn ? tt(bn, "image") : Promise.resolve(""), Rt ? tt(Rt, "image") : Promise.resolve("")]);
      if (Dt && !Un) throw new Error("万相3.0 首尾帧模式需要首帧图片");
      const Cr = zt.length > 0 || an.length > 0 || Rn.length > 0 || !!Un;
      q = ygr({
        modelId: n,
        modelName: r == null ? void 0 : r.modelName,
        prime: ct.prime,
        framesMode: Dt,
        prompt: geo(i, Cr),
        durationUi: ct.durationUi,
        resolutionUi: ct.resolutionUi,
        ratioUi: ct.ratioUi,
        audio: ct.audio,
        promptExtend: ct.promptExtend,
        watermark: ct.watermark,
        seed: ct.seed,
        imageUrls: zt,
        videoUrls: an,
        audioUrls: Rn,
        startImage: Un || void 0,
        endImage: er || void 0
      }), console.log("[Wan 3.0 API] POST /v1/videos", {
        model: q.model,
        prime: ct.prime,
        framesMode: Dt,
        imageUrls: zt.length,
        videoUrls: an.length,
        audioUrls: Rn.length,
        hasStart: !!Un,
        hasEnd: !!er
      });
    } else if (!she(n) && !wy(n) && !Q1(n) && !IS(n) && !V1(n) && !Nv(n) && !kp(n) && !Ap(n) && !Gp(n) && !Fm(n) && !xb(n) && !yf(n) && !Sy(n) && !Yc(n) && !D2(n) && !HM(n) && !Dk(n) && !Fv(n) && !Cu(n) && !X2(n)) {
      const Lt = keo({
        currentModel: n,
        baseUrl: a,
        modelName: r == null ? void 0 : r.modelName,
        ratio: o,
        durationNum: je,
        isHd: r != null && r.isCustom ? s.toUpperCase() === "1080P" : !!(($a = t.settings) != null && $a.isHD)
      });
      Q = Lt.endpoint, ne = Lt.isOfficial;
      const ct = xeo({
        hasReferenceImage: d,
        refImages: l
      });
      if (Lt.isOfficial) {
        const Dt = Seo({
            model: Lt.model,
            prompt: i,
            size: Lt.size,
            seconds: Lt.duration,
            enableHd: Lt.enableHd
          }),
          bn = new FormData();
        for (const [Rt, fn] of Object.entries(Dt)) bn.append(Rt, fn);
        ct.length > 0 && (await Promise.all(ct.map(fn => U(fn)))).forEach(fn => {
          bn.append("input_reference", fn, "ref.png"), bn.append("image", fn, "ref.png");
        }), q = bn;
      } else {
        i.length > 5e3 && console.warn("[Sora] ⚠️ 提示词过长:", i.length, "字符，可能超出 API 限制");
        let Dt;
        ct.length > 0 && (Dt = await Promise.all(ct.map(async Rt => await H(Rt))), console.log("[Sora] 图生视频，已添加图片数据"));
        const bn = (Ya = t.settings) != null && Ya.characterId ? String(t.settings.characterId) : void 0;
        q = Aeo({
          model: Lt.model,
          prompt: i,
          aspectRatio: Lt.aspectRatio,
          duration: Lt.duration,
          enableHd: Lt.enableHd,
          characterId: bn,
          images: Dt
        }), console.log("[Sora] 📝 Payload 详情:", {
          model: Lt.model,
          promptLength: i.length,
          promptPreview: i.substring(0, 100) + "...",
          aspect_ratio: Lt.aspectRatio,
          duration: Lt.duration,
          endpoint: Q
        }), bn && (console.log("[Sora2] 使用角色客串 (character字段):", bn), console.log("[Sora2] Payload:", q));
      }
    }
  } else if (kh(n)) {
    const $t = Meo({
        currentModel: n,
        hasReferenceImage: d,
        refImages: l
      }),
      je = $t.length > 0 ? await Gl($t) : [];
    if (d && je.length === 0) {
      const Mt = Eeo;
      return w(t.id, {
        isGenerating: !1,
        errorMsg: Mt
      }), v(cn => cn.map(Qn => Qn.id === m ? {
        ...Qn,
        status: "failed",
        progress: 0,
        errorMsg: Mt
      } : Qn)), null;
    }
    const Qe = Reo({
      currentModel: n,
      baseUrl: a,
      isEdit: je.length > 0,
      settings: t.settings || {}
    });
    Q = Qe.endpoint, q = Neo({
      prompt: i,
      imageSize: Qe.imageSize,
      quality: Qe.quality,
      numImages: Qe.numImages,
      outputFormat: Qe.outputFormat,
      syncMode: Qe.syncMode,
      background: Qe.background,
      imageUrls: Qe.isEdit ? je : void 0,
      maskBase64: Qe.isEdit && I && I.length > 0 ? await eFr(I[0].mask) : void 0
    }), console.log(`[GPT Image Fal] ${Qe.isEdit ? "图生图 edit" : "文生图"} POST`, Q, Qe.isEdit ? {
      image_urls: je.length,
      hasMask: !!(I && I.length)
    } : q);
  } else if (Dg(n)) {
    const $t = Oeo({
        hasReferenceImage: d,
        refImages: l
      }),
      je = $t.length > 0 ? await Gl($t) : [];
    if (d && je.length === 0) {
      const Mt = Deo;
      return w(t.id, {
        isGenerating: !1,
        errorMsg: Mt
      }), v(cn => cn.map(Qn => Qn.id === m ? {
        ...Qn,
        status: "failed",
        progress: 0,
        errorMsg: Mt
      } : Qn)), null;
    }
    const Qe = Beo({
      currentModel: n,
      baseUrl: a,
      isEdit: je.length > 0,
      ratio: o,
      resolution: s,
      settings: t.settings || {}
    });
    Q = Qe.endpoint, q = Feo({
      prompt: i,
      numImages: Qe.numImages,
      aspectRatio: Qe.aspectRatio,
      outputFormat: Qe.outputFormat,
      resolution: Qe.resolution,
      safetyTolerance: Qe.safetyTolerance,
      syncMode: Qe.syncMode,
      enableWebSearch: Qe.enableWebSearch,
      imageUrls: Qe.isEdit ? je : void 0
    }), console.log(`[Nano Banana Pro Fal] ${Qe.isEdit ? "图生图 edit" : "文生图"} POST`, Q, {
      aspect_ratio: Qe.aspectRatio,
      resolution: Qe.resolution,
      num_images: Qe.numImages
    });
  } else if (Og(n)) {
    const $t = Qeo({
        hasReferenceImage: d,
        refImages: l
      }),
      je = $t.length > 0 ? await Gl($t) : [];
    if (d && je.length === 0) {
      const Mt = qeo;
      return w(t.id, {
        isGenerating: !1,
        errorMsg: Mt
      }), v(cn => cn.map(Qn => Qn.id === m ? {
        ...Qn,
        status: "failed",
        progress: 0,
        errorMsg: Mt
      } : Qn)), null;
    }
    const Qe = Yeo({
      currentModel: n,
      baseUrl: a,
      isEdit: je.length > 0,
      ratio: o,
      resolution: s,
      settings: t.settings || {}
    });
    Q = Qe.endpoint, q = Xeo({
      prompt: i,
      numImages: Qe.numImages,
      aspectRatio: Qe.aspectRatio,
      outputFormat: Qe.outputFormat,
      resolution: Qe.resolution,
      safetyTolerance: Qe.safetyTolerance,
      syncMode: Qe.syncMode,
      enableWebSearch: Qe.enableWebSearch,
      thinkingLevel: Qe.thinkingLevel,
      imageUrls: Qe.isEdit ? je : void 0
    }), console.log(`[Nano Banana 2.1 Fal] ${Qe.isEdit ? "图生图 edit" : "文生图"} POST`, Q, {
      aspect_ratio: Qe.aspectRatio,
      resolution: Qe.resolution,
      num_images: Qe.numImages
    });
  } else if (Lg(n)) {
    const $t = Geo({
        hasReferenceImage: d,
        refImages: l
      }),
      je = $t.length > 0 ? await Gl($t) : [];
    if (d && je.length === 0) {
      const Mt = Ueo;
      return w(t.id, {
        isGenerating: !1,
        errorMsg: Mt
      }), v(cn => cn.map(Qn => Qn.id === m ? {
        ...Qn,
        status: "failed",
        progress: 0,
        errorMsg: Mt
      } : Qn)), null;
    }
    const Qe = Veo({
      currentModel: n,
      baseUrl: a,
      isEdit: je.length > 0,
      ratio: o,
      resolution: s,
      settings: t.settings || {}
    });
    Q = Qe.endpoint, q = Heo({
      prompt: i,
      numImages: Qe.numImages,
      aspectRatio: Qe.aspectRatio,
      outputFormat: Qe.outputFormat,
      resolution: Qe.resolution,
      safetyTolerance: Qe.safetyTolerance,
      syncMode: Qe.syncMode,
      enableWebSearch: Qe.enableWebSearch,
      imageUrls: Qe.isEdit ? je : void 0
    }), console.log(`[Nano Banana 2 Fal] ${Qe.isEdit ? "图生图 edit" : "文生图"} POST`, Q, {
      aspect_ratio: Qe.aspectRatio,
      resolution: Qe.resolution,
      num_images: Qe.numImages
    });
  } else if (Rm(n)) {
    const $t = tto({
        hasReferenceImage: d,
        refImages: l
      }),
      je = $t.length > 0 ? await Gl($t) : [];
    if (d && je.length === 0) {
      const Mt = Zeo;
      return w(t.id, {
        isGenerating: !1,
        errorMsg: Mt
      }), v(cn => cn.map(Qn => Qn.id === m ? {
        ...Qn,
        status: "failed",
        progress: 0,
        errorMsg: Mt
      } : Qn)), null;
    }
    const Qe = nto({
      currentModel: n,
      baseUrl: a,
      isEdit: je.length > 0,
      ratio: o,
      settings: t.settings || {}
    });
    Q = Qe.endpoint, q = rto({
      prompt: i,
      numImages: Qe.numImages,
      aspectRatio: Qe.aspectRatio,
      outputFormat: Qe.outputFormat,
      safetyTolerance: Qe.safetyTolerance,
      syncMode: Qe.syncMode,
      imageUrls: Qe.isEdit ? je : void 0
    }), console.log(`[Nano Banana 2 Lite Fal] ${Qe.isEdit ? "图生图 edit" : "文生图"} POST`, Q, {
      aspect_ratio: Qe.aspectRatio,
      num_images: Qe.numImages
    });
  } else if (_v(n)) {
    const $t = sto({
        hasReferenceImage: d,
        refImages: l
      }),
      je = $t.length > 0 ? await Gl($t) : [];
    if (d && je.length === 0) {
      const Mt = ito;
      return w(t.id, {
        isGenerating: !1,
        errorMsg: Mt
      }), v(cn => cn.map(Qn => Qn.id === m ? {
        ...Qn,
        status: "failed",
        progress: 0,
        errorMsg: Mt
      } : Qn)), null;
    }
    const Qe = lto({
      currentModel: n,
      baseUrl: a,
      isEdit: je.length > 0,
      ratio: o,
      settings: t.settings || {}
    });
    Q = Qe.endpoint, q = cto({
      prompt: i,
      numImages: Qe.numImages,
      aspectRatio: Qe.aspectRatio,
      outputFormat: Qe.outputFormat,
      safetyTolerance: Qe.safetyTolerance,
      syncMode: Qe.syncMode,
      enableWebSearch: Qe.enableWebSearch,
      imageUrls: Qe.isEdit ? je : void 0
    }), console.log(`[Nano Banana Fal] ${Qe.isEdit ? "图生图 edit" : "文生图"} POST`, Q, {
      aspect_ratio: Qe.aspectRatio,
      num_images: Qe.numImages
    });
  } else if (Hh(n)) {
    const $t = hto({
        hasReferenceImage: d,
        refImages: l
      }),
      je = $t.length > 0 ? await Gl($t) : [];
    if (d && je.length === 0) {
      const Mt = dto;
      return w(t.id, {
        isGenerating: !1,
        errorMsg: Mt
      }), v(cn => cn.map(Qn => Qn.id === m ? {
        ...Qn,
        status: "failed",
        progress: 0,
        errorMsg: Mt
      } : Qn)), null;
    }
    const Qe = pto({
      currentModel: n,
      baseUrl: a,
      isEdit: je.length > 0,
      ratio: o,
      settings: t.settings || {}
    });
    Q = Qe.endpoint, q = mto({
      prompt: i,
      numImages: Qe.numImages,
      outputFormat: Qe.outputFormat,
      syncMode: Qe.syncMode,
      aspectRatio: Qe.aspectRatio,
      imageUrls: Qe.isEdit ? je : void 0
    }), console.log(`[Muse-Image Fal] ${Qe.isEdit ? "图生图 edit" : "文生图"} POST`, Q, {
      aspect_ratio: Qe.aspectRatio,
      num_images: Qe.numImages,
      image_urls: Qe.isEdit ? je.length : 0
    });
  } else if (Uu(n)) {
    const $t = gto({
        hasReferenceImage: d,
        refImages: l
      }),
      je = t.settings || {},
      Qe = yto({
        currentModel: n,
        baseUrl: a,
        isEdit: $t.length > 0,
        ratio: String(je.ratio || je.aspectRatio || o || "Auto"),
        settings: je
      }),
      Mt = $t.length > 0 ? await Sqr($t, {
        aspectRatio: Qe.aspectRatio
      }) : [];
    if (d && Mt.length === 0) {
      const cn = fto;
      return w(t.id, {
        isGenerating: !1,
        errorMsg: cn
      }), v(Qn => Qn.map(Lt => Lt.id === m ? {
        ...Lt,
        status: "failed",
        progress: 0,
        errorMsg: cn
      } : Lt)), null;
    }
    Q = Qe.endpoint, q = bto({
      prompt: i,
      numImages: Qe.numImages,
      outputFormat: Qe.outputFormat,
      syncMode: Qe.syncMode,
      aspectRatio: Qe.aspectRatio,
      imageUrls: Qe.isEdit ? Mt : void 0
    }), console.log(`[MAI Image 2.5 Pro Fal] ${Qe.isEdit ? "图生图 edit" : "文生图"} POST`, Q, {
      aspect_ratio: Qe.aspectRatio,
      num_images: Qe.numImages,
      image_url: Qe.isEdit ? 1 : 0
    });
  } else if (su(n)) {
    const $t = Eto({
        hasReferenceImage: d,
        refImages: l
      }),
      je = $t.length > 0 ? await Gl($t) : [];
    if (d && je.length === 0) {
      const Mt = Cto;
      return w(t.id, {
        isGenerating: !1,
        errorMsg: Mt
      }), v(cn => cn.map(Qn => Qn.id === m ? {
        ...Qn,
        status: "failed",
        progress: 0,
        errorMsg: Mt
      } : Qn)), null;
    }
    const Qe = Tto({
      currentModel: n,
      baseUrl: a,
      isEdit: je.length > 0,
      ratio: o,
      resolution: s,
      settings: t.settings || {}
    });
    Q = Qe.endpoint, q = Mto({
      prompt: i,
      numImages: Qe.numImages,
      outputFormat: Qe.outputFormat,
      syncMode: Qe.syncMode,
      promptExtend: Qe.promptExtend,
      imageSize: Qe.imageSize,
      seed: Qe.seed,
      imageUrls: Qe.isEdit ? je : void 0
    }), console.log(`[Qwen Image 3 Fal] ${Qe.isEdit ? "图生图 edit" : "文生图"} POST`, Q, {
      image_size: Qe.imageSize,
      num_images: Qe.numImages,
      enable_prompt_expansion: Qe.promptExtend,
      image_urls: Qe.isEdit ? je.length : 0
    });
  } else if (Nm(n)) {
    const $t = Rto({
        hasReferenceImage: d,
        refImages: l
      }),
      je = $t.length > 0 ? await Gl($t) : [];
    if (d && je.length === 0) {
      const Mt = Pto;
      return w(t.id, {
        isGenerating: !1,
        errorMsg: Mt
      }), v(cn => cn.map(Qn => Qn.id === m ? {
        ...Qn,
        status: "failed",
        progress: 0,
        errorMsg: Mt
      } : Qn)), null;
    }
    const Qe = Nto({
      currentModel: n,
      baseUrl: a,
      isEdit: je.length > 0,
      ratio: o,
      resolution: s,
      settings: t.settings || {}
    });
    Q = Qe.endpoint, q = jto({
      prompt: i,
      numImages: Qe.numImages,
      syncMode: Qe.syncMode,
      imageSize: Qe.imageSize,
      imageUrls: Qe.isEdit ? je : void 0
    }), console.log(`[Seedream 5.0 Lite Fal] ${Qe.isEdit ? "图生图 edit" : "文生图"} POST`, Q, {
      image_size: Qe.imageSize,
      num_images: Qe.numImages,
      image_urls: Qe.isEdit ? je.length : 0
    });
  } else if (jm(n)) {
    const $t = Lto({
        hasReferenceImage: d,
        refImages: l
      }),
      je = $t.length > 0 ? await Gl($t) : [];
    if (d && je.length === 0) {
      const Mt = Dto;
      return w(t.id, {
        isGenerating: !1,
        errorMsg: Mt
      }), v(cn => cn.map(Qn => Qn.id === m ? {
        ...Qn,
        status: "failed",
        progress: 0,
        errorMsg: Mt
      } : Qn)), null;
    }
    const Qe = Oto({
      currentModel: n,
      baseUrl: a,
      isEdit: je.length > 0,
      ratio: o,
      resolution: s,
      settings: t.settings || {}
    });
    Q = Qe.endpoint, q = Bto({
      prompt: i,
      numImages: Qe.numImages,
      syncMode: Qe.syncMode,
      imageSize: Qe.imageSize,
      imageUrls: Qe.isEdit ? je : void 0
    }), console.log(`[Seedream 5.0 Pro Fal] ${Qe.isEdit ? "图生图 edit" : "文生图"} POST`, Q, {
      image_size: Qe.imageSize,
      num_images: Qe.numImages,
      image_urls: Qe.isEdit ? je.length : 0
    });
  } else if (mp(n)) {
    const $t = Ato({
        hasReferenceImage: d,
        refImages: l
      }),
      je = $t.length > 0 ? await Gl($t) : [];
    if (d && je.length === 0) {
      const Mt = kto;
      return w(t.id, {
        isGenerating: !1,
        errorMsg: Mt
      }), v(cn => cn.map(Qn => Qn.id === m ? {
        ...Qn,
        status: "failed",
        progress: 0,
        errorMsg: Mt
      } : Qn)), null;
    }
    const Qe = Sto({
      currentModel: n,
      baseUrl: a,
      isEdit: je.length > 0,
      ratio: o,
      resolution: s,
      settings: t.settings || {}
    });
    Q = Qe.endpoint, q = Ito({
      prompt: i,
      numImages: Qe.numImages,
      aspectRatio: Qe.aspectRatio,
      resolution: Qe.resolution,
      syncMode: Qe.syncMode,
      imageUrls: Qe.isEdit ? je : void 0
    }), console.log(`[Grok Imagine Fal] ${Qe.isEdit ? "图生图 edit" : "文生图"} POST`, Q, {
      aspect_ratio: Qe.aspectRatio,
      resolution: Qe.resolution,
      num_images: Qe.numImages,
      image_urls: Qe.isEdit ? je.length : 0
    });
  } else if (nh(n)) {
    const $t = wto({
        hasReferenceImage: d,
        refImages: l
      }),
      je = $t.length > 0 ? await Gl($t) : [];
    if (d && je.length === 0) {
      const Mt = vto;
      return w(t.id, {
        isGenerating: !1,
        errorMsg: Mt
      }), v(cn => cn.map(Qn => Qn.id === m ? {
        ...Qn,
        status: "failed",
        progress: 0,
        errorMsg: Mt
      } : Qn)), null;
    }
    const Qe = xto({
      currentModel: n,
      baseUrl: a,
      isEdit: je.length > 0,
      ratio: o,
      resolution: s,
      settings: t.settings || {}
    });
    Q = Qe.endpoint, q = _to({
      prompt: i,
      numImages: Qe.numImages,
      aspectRatio: Qe.aspectRatio,
      resolution: Qe.resolution,
      quality: Qe.quality,
      syncMode: Qe.syncMode,
      imageUrls: Qe.isEdit ? je : void 0
    }), console.log(`[Grok Imagine 2.0 Fal] ${Qe.isEdit ? "图生图 edit" : "文生图"} POST`, Q, {
      aspect_ratio: Qe.aspectRatio,
      resolution: Qe.resolution,
      quality: Qe.quality,
      num_images: Qe.numImages,
      image_urls: Qe.isEdit ? je.length : 0
    });
  } else if ((n.includes("gpt-image") || n.includes("gpt-4o-image")) && !kh(n) && !mm(n)) ({
    endpoint: Q,
    payload: q,
    useMultipart: ne
  } = await Zqi({
    currentModel: n,
    config: r ? {
      id: r.isCustom ? n : r.id,
      modelName: r.modelName,
      isCustom: r.isCustom
    } : void 0,
    settings: {
      useAsyncMode: r != null && r.isCustom ? r.requestMode === "async" : (ta = t.settings) == null ? void 0 : ta.useAsyncMode,
      platformGroup: (ki = t.settings) == null ? void 0 : ki.platformGroup,
      gptImage2Resolution: (Wn = t.settings) == null ? void 0 : Wn.gptImage2Resolution,
      resolution: (wr = t.settings) == null ? void 0 : wr.resolution,
      ratio: (jn = t.settings) == null ? void 0 : jn.ratio,
      gptImage2AspectRatio: (_n = t.settings) == null ? void 0 : _n.gptImage2AspectRatio,
      gptImage2CustomSize: (ar = t.settings) == null ? void 0 : ar.gptImage2CustomSize,
      gptImageQuality: (Vt = t.settings) == null ? void 0 : Vt.gptImageQuality,
      gptImageBackground: (vn = t.settings) == null ? void 0 : vn.gptImageBackground,
      gptImageOutputFormat: (An = t.settings) == null ? void 0 : An.gptImageOutputFormat,
      gptImageModeration: (ur = t.settings) == null ? void 0 : ur.gptImageModeration
    },
    baseUrl: a,
    prompt: i,
    ratio: o,
    resolution: s,
    rememberedQuality: (zr = zs((r == null ? void 0 : r.modelName) || n)) == null ? void 0 : zr.gptImageQuality,
    refImages: l,
    hasReferenceImage: d,
    markerMasks: I,
    expandMode: E,
    canComflyOssUrlJsonGenerations: F,
    comflyOssRefUrls: N,
    shopComflyNoRemoteImageUrl: B
  }, {
    processImage: U,
    getBlob: Ns,
    prepareReference: async (je, Qe) => {
      const {
          prepareAssetForModel: Mt,
          materializePreparedAssetBlob: cn,
          toMultipartFile: Qn
        } = await Ie(async () => {
          const {
            prepareAssetForModel: Dt,
            materializePreparedAssetBlob: bn,
            toMultipartFile: Rt
          } = await Promise.resolve().then(() => up);
          return {
            prepareAssetForModel: Dt,
            materializePreparedAssetBlob: bn,
            toMultipartFile: Rt
          };
        }, void 0, import.meta.url),
        Lt = L(je),
        ct = await Mt({
          assetRef: je,
          modelId: "gpt-image",
          purpose: "image-reference",
          requestedTransportMode: "direct-file",
          assetId: Lt.assetId,
          assetIdHints: Lt.assetIdHints,
          sourceNode: Lt.sourceNode,
          nodes: Lt.nodes
        });
      return Qe ? (await Qn({
        prepared: ct,
        fileName: Qe
      })).file : cn(ct);
    }
  }));else if (n.includes("flux-kontext")) {
    const $t = Uto({
        hasReferenceImage: d,
        refImages: l
      }),
      je = $to({
        currentModel: n,
        baseUrl: a,
        modelName: r == null ? void 0 : r.modelName,
        ratio: o,
        useAsyncMode: ((Dr = t.settings) == null ? void 0 : Dr.useAsyncMode) ?? !0,
        useOssJson: !!(d && F)
      });
    if (Q = je.endpoint, ne = je.useMultipart, !je.useMultipart) q = Gto({
      model: je.model,
      prompt: i,
      aspectRatio: je.aspectRatio,
      image: F8(N)
    }), console.log("[Flux Kontext] 全局 OSS：generations JSON 直链参考图", {
      endpoint: Q,
      useAsyncMode: je.useAsyncMode
    });else {
      const Qe = Vto({
          model: je.model,
          prompt: i,
          aspectRatio: je.aspectRatio
        }),
        Mt = new FormData();
      for (const [cn, Qn] of Object.entries(Qe)) Mt.append(cn, Qn);
      if ($t.length > 0) try {
        const {
          appendReferenceImagesViaPrepare: cn
        } = await Ie(async () => {
          const {
            appendReferenceImagesViaPrepare: Qn
          } = await Promise.resolve().then(() => up);
          return {
            appendReferenceImagesViaPrepare: Qn
          };
        }, void 0, import.meta.url);
        await cn(Mt, $t, {
          modelId: "flux-kontext",
          fileNamePrefix: "flux_ref",
          resolveHints: Qn => L(Qn)
        });
      } catch (cn) {
        console.warn("[Flux Kontext] Phase3-B multipart 失败，回退 processImageForAPI:", cn);
        const Qn = await Promise.all($t.map(Lt => U(Lt)));
        Pre(Qn, "[Flux Kontext] edits multipart"), Qn.forEach((Lt, ct) => Mt.append("image", Lt, `flux_ref_${ct}.png`));
      }
      await M(Mt, "flux-kontext"), $t.length > 0 && dte(Mt, "[Flux Kontext] edits multipart"), q = Mt, console.log("[Flux Kontext] edits multipart，endpoint:", Q, "useAsyncMode:", je.useAsyncMode);
    }
  } else if (n.includes("qwen-image-edit")) {
    const $t = Yto({
      hasReferenceImage: d,
      refImages: l
    });
    if ($t.length === 0) return w(t.id, {
      isGenerating: !1,
      errorMsg: vmn
    }), v(Qe => Qe.map(Mt => Mt.id === m ? {
      ...Mt,
      status: "failed",
      progress: 0,
      errorMsg: vmn
    } : Mt)), null;
    const je = Xto({
      currentModel: n,
      baseUrl: a,
      modelName: r == null ? void 0 : r.modelName,
      ratio: o,
      useAsyncMode: ((Wr = t.settings) == null ? void 0 : Wr.useAsyncMode) ?? !0,
      useOssJson: !!F
    });
    if (Q = je.endpoint, ne = je.useMultipart, !je.useMultipart) q = Jto({
      model: je.model,
      prompt: i,
      size: je.size,
      image: F8(N)
    }), console.log("[Qwen Image Edit] 全局 OSS：generations JSON 直链参考图", {
      endpoint: Q
    });else {
      const Qe = Zto({
          model: je.model,
          prompt: i,
          size: je.size
        }),
        Mt = new FormData();
      for (const [cn, Qn] of Object.entries(Qe)) Mt.append(cn, Qn);
      try {
        const {
          appendReferenceImagesViaPrepare: cn
        } = await Ie(async () => {
          const {
            appendReferenceImagesViaPrepare: Qn
          } = await Promise.resolve().then(() => up);
          return {
            appendReferenceImagesViaPrepare: Qn
          };
        }, void 0, import.meta.url);
        await cn(Mt, $t, {
          modelId: "qwen-image-edit",
          fileNamePrefix: "qwen_edit",
          resolveHints: Qn => L(Qn)
        });
      } catch (cn) {
        console.warn("[Qwen Image Edit] Phase3 multipart 失败，回退 processImageForAPI:", cn), (await Promise.all($t.map(async Lt => {
          const ct = await U(Lt);
          return ct.type ? ct : new Blob([await ct.arrayBuffer()], {
            type: "image/png"
          });
        }))).forEach((Lt, ct) => Mt.append("image", Lt, `qwen_edit_${ct}.png`));
      }
      await M(Mt, "qwen-image-edit"), dte(Mt, "[Qwen Image Edit] edits multipart"), q = Mt;
    }
  } else if (qM(n)) {
    const $t = nno({
      currentModel: n,
      baseUrl: a,
      modelName: r == null ? void 0 : r.modelName,
      prompt: i,
      ratio: o,
      resolution: s,
      hasReferenceImage: d,
      hasRefImages: l.length > 0,
      useAsyncMode: ((gr = t.settings) == null ? void 0 : gr.useAsyncMode) ?? !0,
      canComflyOssUrlJsonGenerations: F,
      quality: MU(n) ? Xqe((jr = t.settings) == null ? void 0 : jr.grokImageQuality, (ea = zs(n)) == null ? void 0 : ea.grokImageQuality) : void 0,
      outputN: MU(n) ? kjn((pa = t.settings) == null ? void 0 : pa.batchSize, (Br = t.settings) == null ? void 0 : Br.batchCount) : 1
    });
    Q = $t.endpoint, ne = $t.useMultipart;
    const je = wmn({
      hasReferenceImage: d,
      refImages: l,
      maxRefs: $t.maxRefs
    });
    if ($t.mode === "async-edits") {
      const Qe = rno({
          model: $t.model,
          prompt: $t.prompt,
          aspectRatio: $t.aspectRatio,
          resolution: $t.resolution,
          quality: $t.quality
        }),
        Mt = new FormData();
      for (const [cn, Qn] of Object.entries(Qe)) Mt.append(cn, Qn);
      try {
        const {
          appendReferenceImagesViaPrepare: cn
        } = await Ie(async () => {
          const {
            appendReferenceImagesViaPrepare: Qn
          } = await Promise.resolve().then(() => up);
          return {
            appendReferenceImagesViaPrepare: Qn
          };
        }, void 0, import.meta.url);
        await cn(Mt, je, {
          modelId: n,
          fieldName: "image",
          fileNamePrefix: "grok_ref",
          resolveHints: Qn => L(Qn)
        });
      } catch (cn) {
        console.warn("[Grok Image] Phase3 multipart 失败，回退 processImageForAPI:", cn);
        const Qn = await Promise.all(je.map(Lt => U(Lt)));
        Pre(Qn, "[Grok Image] edits multipart"), Qn.forEach((Lt, ct) => Mt.append("image", Lt, `grok_ref_${ct}.png`));
      }
      dte(Mt, "[Grok Image] edits multipart"), q = Mt, console.log("[Grok Image] 异步图生图 edits multipart，endpoint:", Q, "model:", $t.model);
    } else if ($t.mode === "sync-chat") {
      let Qe;
      je.length > 0 && (Qe = await Promise.all(je.map(async Mt => {
        if (Mt.startsWith("http://") || Mt.startsWith("https://") || Mt.startsWith("data:")) return Mt;
        const cn = await Ns(Mt);
        return await Fu(cn);
      })), console.log("[Grok Image] 同步图生图 Chat，参考图数:", Qe.length)), q = ano({
        model: $t.model,
        prompt: $t.prompt,
        aspectRatio: $t.aspectRatio,
        resolution: $t.resolution,
        quality: $t.quality,
        imageUrls: Qe
      }), console.log("[Grok Image] 同步 Chat Completions，endpoint:", Q, "model:", $t.model);
    } else if (je.length > 0) {
      const Qe = F ? wmn({
          hasReferenceImage: !0,
          refImages: N,
          maxRefs: $t.maxRefs
        }) : je,
        Mt = await Promise.all(Qe.map(async cn => {
          if (/^https?:\/\//i.test(cn) || cn.startsWith("data:")) return cn;
          const Qn = await U(cn),
            Lt = Qn.type ? Qn : new Blob([await Qn.arrayBuffer()], {
              type: "image/png"
            });
          return await Fu(Lt);
        }));
      q = xmn({
        model: $t.model,
        prompt: $t.prompt,
        aspectRatio: $t.aspectRatio,
        resolution: $t.resolution,
        quality: $t.quality,
        n: $t.outputN,
        ...($t.useGrok20ImagesField ? {
          images: _jn(Mt)
        } : {
          image: F8(Mt)
        })
      }), console.log("[Grok Image] 异步图生图 generations JSON，endpoint:", Q, "model:", $t.model, "quality:", $t.quality || "(n/a)", "n:", $t.outputN, "参考图数:", Mt.length, "参考上限:", $t.maxRefs, "refField:", $t.useGrok20ImagesField ? "images" : "image");
    } else q = xmn({
      model: $t.model,
      prompt: $t.prompt,
      aspectRatio: $t.aspectRatio,
      resolution: $t.resolution,
      quality: $t.quality,
      n: $t.outputN
    }), console.log("[Grok Image] 异步文生图 generations，endpoint:", Q, "model:", $t.model, "aspect_ratio:", $t.aspectRatio || "(auto)", "resolution:", $t.resolution || "(auto)", "quality:", $t.quality || "(n/a)", "n:", $t.outputN);
  } else if (jk(n)) {
    const $t = pno({
      currentModel: n,
      baseUrl: a,
      ratio: o,
      settings: t.settings || {}
    });
    Q = $t.endpoint, q = mno({
      prompt: i,
      imageSize: $t.imageSize,
      numInferenceSteps: $t.numInferenceSteps,
      syncMode: $t.syncMode,
      seed: $t.seed
    }), console.log("[Z-Image Turbo Fal] 文生图 POST", Q, {
      image_size: $t.imageSize,
      steps: $t.numInferenceSteps
    });
  } else if (Zqe(n)) {
    const $t = uno({
      currentModel: n,
      baseUrl: a,
      ratio: o,
      resolution: s
    });
    Q = $t.endpoint, console.log("[Z-Image Official] ========== DEBUG INFO =========="), console.log("[Z-Image Official] window.location.hostname:", window.location.hostname), console.log("[Z-Image Official] window.location.protocol:", window.location.protocol), console.log("[Z-Image Official] window.location.href:", window.location.href), console.log("[Z-Image Official] baseUrl:", a), console.log("[Z-Image Official] endpoint:", Q), console.log("[Z-Image Official] isTauriEnvironment:", typeof window < "u" && "__TAURI__" in window), console.log("[Z-Image Official] ========================================"), q = hno({
      model: $t.model,
      prompt: i,
      size: $t.size
    }), console.log("[Z-Image Official] 通义官方 API Payload:", q);
  } else if (yX(n)) {
    const $t = Ino({
      currentModel: n,
      baseUrl: a,
      ratio: o,
      enableInterleave: ((tn = t.settings) == null ? void 0 : tn.enableInterleave) ?? !1,
      hasReferenceImage: d,
      useStream: ((Lr = t.settings) == null ? void 0 : Lr.useStream) ?? !1,
      useAsyncMode: ((br = t.settings) == null ? void 0 : br.useAsyncMode) ?? !0
    });
    $t.forcedInterleave && console.warn("[Wan 2.6 Image] ⚠️ 图像编辑模式需要参考图片，已自动切换到图文混排模式（纯文生图）"), Q = $t.endpoint;
    const je = [],
      Qe = _no({
        hasReferenceImage: d,
        refImages: l,
        maxRefs: $t.maxRefs
      });
    for (const Lt of Qe) if (Lt.startsWith("data:")) je.push(Lt);else if (Lt.startsWith("http://") || Lt.startsWith("https://")) je.push(Lt);else try {
      je.push(await H(Lt));
    } catch (ct) {
      console.warn("[Wan 2.6 Image] Phase3-D 失败，回退 getBlobFromUrl:", ct);
      const Dt = await Ns(Lt);
      je.push(await Fu(Dt));
    }
    const Mt = (Jr = t.settings) == null ? void 0 : Jr.audioUrl,
      cn = (Kr = t.settings) == null ? void 0 : Kr.audioDescription,
      Qn = Ano(i, Mt, cn);
    Qn !== i && console.log("[Wan 2.6 Image Official] 添加音频参考到提示词:", cn || "根据上传的音频风格生成"), q = Eno({
      model: $t.model,
      prompt: Qn,
      images: je,
      parameters: Cno({
        size: $t.size,
        enableInterleave: $t.enableInterleave,
        useStream: $t.useStream,
        promptExtend: (ir = t.settings) == null ? void 0 : ir.promptExtend,
        imageCount: (Hr = t.settings) == null ? void 0 : Hr.imageCount,
        maxImages: (ha = t.settings) == null ? void 0 : ha.maxImages,
        negativePrompt: ((Ga = t.settings) == null ? void 0 : Ga.negativePrompt) || "",
        seed: (Za = t.settings) == null ? void 0 : Za.seed
      })
    }), console.log("[Wan 2.6 Image Official] 通义官方 API Payload:", q), console.log("[Wan 2.6 Image Official] 模式:", $t.enableInterleave ? "图文混排" : "图像编辑", "流式:", $t.useStream);
  } else if (KM(n)) {
    const $t = Ono({
      currentModel: n,
      baseUrl: a,
      modelName: r == null ? void 0 : r.modelName,
      ratio: o,
      resolution: s
    });
    Q = $t.endpoint;
    const je = [],
      Qe = Dno({
        hasReferenceImage: d,
        refImages: l,
        maxRefs: $t.maxRefs
      });
    Qe.length > 0 && (je.push(...(await Promise.all(Qe.map(async Mt => {
      const cn = await U(Mt);
      return Lno(await Fu(cn));
    })))), console.log("[Gemini Image Official] 图生图，已添加", je.length, "张参考图")), q = Bno({
      prompt: i,
      aspectRatio: $t.aspectRatio,
      imageSize: $t.imageSize,
      includeImageSize: $t.includeImageSize,
      inlineDataParts: je
    }), console.log("[Gemini Image Official] 官方 API Payload (generationConfig):", q.generationConfig, "| resolution:", s, "-> imageSize:", $t.imageSize);
  } else if (mX(n)) {
    const $t = Vno({
      currentModel: n,
      baseUrl: a,
      modelName: r == null ? void 0 : r.modelName,
      prompt: i,
      ratio: o,
      resolution: s,
      hasReferenceImage: d && l.length > 0
    });
    Q = $t.endpoint, console.log(`[Seedream] 模型 ${n} 比例 ${o} 分辨率 ${s} -> size: ${$t.size}`);
    let je;
    const Qe = Blt({
      hasReferenceImage: d,
      refImages: l,
      maxRefs: $t.maxRefs
    });
    if (Qe.length > 0) {
      const Mt = Cjn(n) && ICn(l, {
          useOssForApi: R,
          hasMask: j
        }),
        cn = Zft(n) && F;
      if (Mt) {
        const Qn = Blt({
          hasReferenceImage: !0,
          refImages: yLe(l),
          maxRefs: $t.maxRefs
        });
        je = F8(Qn), console.log("[Seedream 官] 全局 OSS：方舟 API 直链参考图（aliyuncs 原生公网链）", {
          count: Qn.length,
          urls: Qn.map(Lt => `${Lt.slice(0, 72)}…`)
        });
      } else if (cn) {
        const Qn = yLe(l),
          Lt = Blt({
            hasReferenceImage: !0,
            refImages: Qn.length === l.length ? Qn : N,
            maxRefs: $t.maxRefs
          });
        je = $t.imageFieldAsArray ? Lt : F8(Lt), console.log("[Seedream 5.0 API] 全局 OSS：直链参考图", {
          count: Lt.length,
          urls: Lt.map(ct => `${ct.slice(0, 72)}…`)
        });
      } else {
        const Qn = $t.refMaxDim,
          Lt = await Promise.all(Qe.map(async ct => {
            let Dt;
            try {
              const {
                  prepareAssetForModel: Rt,
                  materializePreparedAssetBlob: fn
                } = await Ie(async () => {
                  const {
                    prepareAssetForModel: tt,
                    materializePreparedAssetBlob: zt
                  } = await Promise.resolve().then(() => up);
                  return {
                    prepareAssetForModel: tt,
                    materializePreparedAssetBlob: zt
                  };
                }, void 0, import.meta.url),
                Zt = L(ct),
                Ln = await Rt({
                  assetRef: ct,
                  modelId: "seedream-4.5",
                  purpose: "image-reference",
                  requestedTransportMode: "direct-file",
                  assetId: Zt.assetId,
                  assetIdHints: Zt.assetIdHints,
                  sourceNode: Zt.sourceNode,
                  nodes: Zt.nodes
                });
              Dt = await fn(Ln);
            } catch (Rt) {
              console.warn("[Seedream] Phase3-D prepare 失败，回退 getBlobFromUrl:", Rt), Dt = await Ns(ct, {
                compressForApi: !1
              });
            }
            const bn = await lve(Dt, Qn);
            return await Fu(bn);
          }));
        je = Gno(Lt, $t.imageFieldAsArray), console.log(Zft(n) ? "[Seedream 5.0 API] 图生图，客户端 base64（本地模式），" : oIe(n) ? "[Seedream API] 图生图，客户端 base64，" : R ? "[Seedream 官] 图生图，客户端 base64（火山无法拉取自定义 CDN，或未解析到 aliyuncs 公网链），" : "[Seedream 官] 图生图，客户端 base64，", Lt.length, "张，长边上限", Qn);
      }
    }
    q = Hno({
      model: $t.model,
      prompt: $t.prompt,
      size: $t.size,
      omitSequentialImageGeneration: $t.omitSequentialImageGeneration,
      image: je
    }), console.log(`[Seedream${$t.isApiVersion ? " API" : ""}] ${$t.isApiVersion ? "第三方" : "方舟图片"} API Payload:`, {
      ...q,
      image: q.image ? "(已设置)" : void 0
    });
  } else if (m5(n)) {
    const $t = Zno({
      currentModel: n,
      baseUrl: a,
      modelName: r == null ? void 0 : r.modelName,
      prompt: i,
      ratio: o,
      resolution: s
    });
    Q = $t.endpoint;
    let je;
    const Qe = Xno({
      hasReferenceImage: d,
      refImages: l,
      maxRefs: $t.maxRefs
    });
    Qe.length > 0 && (je = await Promise.all(Qe.map(async Mt => {
      if (Mt.startsWith("http://") || Mt.startsWith("https://") || Mt.startsWith("data:")) return Mt;
      try {
        const {
            prepareAssetForModel: cn,
            toBase64String: Qn
          } = await Ie(async () => {
            const {
              prepareAssetForModel: Dt,
              toBase64String: bn
            } = await Promise.resolve().then(() => up);
            return {
              prepareAssetForModel: Dt,
              toBase64String: bn
            };
          }, void 0, import.meta.url),
          Lt = L(Mt),
          ct = await cn({
            assetRef: Mt,
            modelId: "nano-banana",
            purpose: "image-reference",
            requestedTransportMode: "base64",
            assetId: Lt.assetId,
            assetIdHints: Lt.assetIdHints,
            sourceNode: Lt.sourceNode,
            nodes: Lt.nodes
          });
        return await Qn({
          prepared: ct,
          pureBase64: !1
        });
      } catch (cn) {
        console.warn("[Grsai] Phase3-D prepare 失败，回退 getBlobFromUrl:", cn);
        const Qn = await Ns(Mt);
        return await Fu(Qn);
      }
    })), console.log("[Grsai] 图生图，已添加", je.length, "张参考图")), q = ero({
      model: $t.model,
      prompt: $t.prompt,
      aspectRatio: $t.aspectRatio,
      imageSize: $t.imageSize,
      urls: je
    }), console.log("[Grsai] API Payload:", {
      ...q,
      urls: (je == null ? void 0 : je.length) ?? 0
    });
  } else if (mm(n)) {
    const $t = t.settings || {},
      je = sro({
        currentModel: n,
        configUrl: (r == null ? void 0 : r.url) || a,
        settings: $t
      });
    Q = je.endpoint, ne = !1;
    const Qe = lro({
        currentModel: n,
        ratio: o,
        resolution: s,
        settings: $t
      }),
      Mt = mk(n) && KNn(i);
    let cn = {};
    Iu(n) && (cn = cro({
      currentModel: n,
      settings: $t,
      refImages: l,
      refMetaByRawUrl: b
    }), console.log("[Huya MJ] 槽位解析", {
      model: n,
      imageKey: $t.huyaMjImageKey,
      styleKey: $t.huyaMjStyleKey,
      subjectKey: $t.huyaMjSubjectKey,
      imageLocal: cn.imageUrl ? `${String(cn.imageUrl).slice(0, 64)}…` : null,
      styleLocal: cn.sref ? `${String(cn.sref).slice(0, 64)}…` : null,
      subjectLocal: cn.oref ? `${String(cn.oref).slice(0, 64)}…` : null,
      refCount: l.length
    }));
    let Qn = d && l.length > 0 ? mk(n) ? QNn(i, l) : Iu(n) ? [cn.imageUrl, cn.sref, cn.oref].filter(fn => !!fn) : l : [];
    if (Iu(n) && Qn.length === 0 && (Qn = [cn.imageUrl, cn.sref, cn.oref].filter(fn => !!fn)), mk(n) && (Mt || d) && Qn.length === 0) throw new Error("即梦虎牙图生图需要参考图：请从图片节点连线到本节点，或通过参考图条上传");
    let Lt = {};
    if (Qn.length > 0 || Iu(n)) {
      const fn = EU(je.endpoint),
        Zt = dAe(fn, n);
      if (Iu(n)) {
        const Ln = async (tt, zt) => {
          const an = String(tt || "").trim();
          if (an) try {
            const Rn = await v$(an, fn, f, U, Zt),
              er = (qft([Rn])[0] || Rn || "").trim();
            if (!er || !/^https?:\/\//i.test(er)) throw new Error(`${zt || "参考图"}上传后未得到 https URL`);
            return er;
          } catch (Rn) {
            const Un = Rn instanceof Error ? Rn.message : String(Rn);
            throw new Error(`虎牙 MJ ${zt || "参考图"}处理失败: ${Un}`);
          }
        };
        Lt = {
          imageUrl: await Ln(cn.imageUrl, "图片提示词"),
          sref: await Ln(cn.sref, "风格参考"),
          oref: await Ln(cn.oref, "主体参考")
        };
      } else if (Qn.length > 0) {
        const Ln = dro({
            refImages: Qn,
            maxRefs: je.maxRefs
          }),
          tt = [];
        for (const Rn of Ln) tt.length > 0 && (await Id()), tt.push(await v$(Rn, fn, f, U, Zt));
        const zt = tt,
          an = qft(zt);
        if ((mk(n) || $S(n) || z5(n)) && an.length === 0) throw new Error("虎牙图生图须先 POST /file/upload 获得海艺 OSS URL；参考图上传失败或未返回 https 地址");
        if (Up(n) || $S(n) || z5(n)) {
          if (Qe.imageUrls = an.length > 0 ? an : zt, $S(n) && ((va = t.settings) != null && va.gptImageInputFidelity)) {
            const Rn = String(t.settings.gptImageInputFidelity).toLowerCase();
            (Rn === "high" || Rn === "low") && (Qe.inputFidelity = Rn);
          }
        } else if (mk(n)) {
          if (Qe.image = an.length > 0 ? an : zt, _Z(n)) {
            const Rn = iX((Kt = t.settings) == null ? void 0 : Kt.seedreamBackground);
            Qe.background = Rn;
          }
        } else Qe.images = an.length > 0 ? an : zt;
      }
    }
    const ct = !!(Lt.imageUrl || Lt.sref || Lt.oref),
      Dt = Qn.length > 0 || ct,
      bn = uro(i, Dt);
    if (Iu(n)) {
      const fn = t.settings,
        Zt = US(n, fn),
        Ln = rMt(fn),
        tt = aMt({
          modelId: n,
          version: Zt,
          prompt: bn,
          ratioUi: o,
          imageUrl: Lt.imageUrl,
          sref: Lt.sref,
          oref: Lt.oref,
          imageWeight: Ln.iw,
          quality: Ln.quality,
          chaos: Ln.chaos,
          stylize: Ln.stylize,
          weird: Ln.weird,
          raw: Ln.raw,
          sw: Ln.sw,
          sv: Ln.sv,
          ow: Ln.ow,
          hd: Ln.hd
        });
      for (const zt of Object.keys(Qe)) delete Qe[zt];
      Object.assign(Qe, tt), mhe(n, fn) && tt.imageUrl && !Lt.sref && (tt.sref, tt.imageUrl);
    } else Qe.prompt = bn;
    q = pro({
      currentModel: n,
      modelName: (r == null ? void 0 : r.modelName) || n,
      resolution: s,
      settings: $t,
      provider: je.provider,
      type: hro({
        currentModel: n,
        settings: $t,
        hasRefs: Dt
      }),
      parameters: Qe
    });
    const Rt = Array.isArray(Qe.imageUrls) ? Qe.imageUrls.map(fn => fn.startsWith("http") ? `${fn.slice(0, 48)}…` : `[非http:${fn.slice(0, 12)}…]`) : Array.isArray(Qe.image) ? Qe.image.map(fn => fn.startsWith("http") ? `${fn.slice(0, 48)}…` : `[非http:${fn.slice(0, 12)}…]`) : Array.isArray(Qe.images) ? Qe.images.map(fn => fn.startsWith("http") ? `${fn.slice(0, 48)}…` : `[非http:${fn.slice(0, 12)}…]`) : typeof Qe.imageUrl == "string" ? [Qe.imageUrl.startsWith("http") ? `${Qe.imageUrl.slice(0, 48)}…` : `[非http:${Qe.imageUrl.slice(0, 12)}…]`] : [];
    console.log("[Huya Art Image] API Payload:", {
      model: q.model,
      hasRefImages: Rt.length,
      refImageUrls: Rt,
      mjKeys: Iu(n) ? {
        quality: Qe.quality,
        qualityType: typeof Qe.quality,
        chaos: Qe.chaos,
        stylize: Qe.stylize,
        raw: Qe.raw,
        sw: Qe.sw,
        sv: Qe.sv,
        iw: Qe.iw,
        hd: Qe.hd,
        hasImageUrl: !!Qe.imageUrl,
        hasSref: !!Qe.sref,
        hasOref: !!Qe.oref,
        aspectRatio: Qe.aspectRatio
      } : void 0,
      parameters: {
        ...Qe,
        imageUrls: Qe.imageUrls ? "(已设置)" : void 0,
        image: Qe.image ? "(已设置)" : void 0,
        images: Qe.images ? "(已设置)" : void 0,
        imageUrl: Qe.imageUrl ? "(已设置)" : void 0,
        sref: Qe.sref ? "(已设置)" : void 0,
        oref: Qe.oref ? "(已设置)" : void 0,
        prompt: typeof Qe.prompt == "string" ? `${Qe.prompt.slice(0, 80)}…` : Qe.prompt
      }
    });
  } else if (p) {
    const $t = yro({
      currentModel: n,
      configId: r == null ? void 0 : r.id,
      modelName: r == null ? void 0 : r.modelName,
      baseUrl: a,
      ratio: o,
      resolution: s,
      useAsyncMode: ((Pr = t.settings) == null ? void 0 : Pr.useAsyncMode) ?? !0,
      hasReferenceImage: d,
      useOssJson: !!F
    });
    Q = $t.endpoint, ne = $t.useMultipart, console.log(`[${$t.logLabel}] 使用${$t.useAsyncMode ? "异步" : "同步"}模式`);
    const je = _mn({
        hasReferenceImage: d,
        refImages: l
      }),
      Qe = _mn({
        hasReferenceImage: d,
        refImages: N
      });
    if (!$t.useMultipart) q = bro({
      model: $t.model,
      prompt: i,
      imageSize: $t.imageSize,
      aspectRatio: $t.aspectRatio,
      image: d ? F8(Qe) : void 0
    }), d ? (G(q), console.log("[Nano Banana 2] 全局 OSS：generations JSON 直链参考图", {
      endpoint: Q,
      count: Qe.length,
      urls: Qe.map(Mt => `${Mt.slice(0, 72)}…`)
    })) : (($t.aspectRatio === "8:1" || $t.aspectRatio === "1:8") && console.log("[Nano Banana 2] 文生图 发送 aspect_ratio:", $t.aspectRatio), A && typeof q == "object" && q !== null && (Object.assign(q, A), console.log("[Generation] Added storyboard JSON data to payload:", A))), d && ($t.aspectRatio === "8:1" || $t.aspectRatio === "1:8") && console.log("[Nano Banana 2] OSS JSON 发送 aspect_ratio:", $t.aspectRatio);else {
      const Mt = vro({
          model: $t.model,
          prompt: i,
          imageSize: $t.imageSize,
          aspectRatio: $t.aspectRatio
        }),
        cn = new FormData();
      for (const [Lt, ct] of Object.entries(Mt)) cn.append(Lt, ct);
      if (($t.aspectRatio === "8:1" || $t.aspectRatio === "1:8") && console.log("[Nano Banana 2] 发送 aspect_ratio:", $t.aspectRatio), k) {
        const {
            rotation: Lt,
            tilt: ct,
            scale: Dt
          } = k,
          bn = k.sceneMode,
          Rt = k.needsControlNetReduction || !1;
        if (Lt === 0 && ct === 0 && Dt === 1) console.log("[Generation] 📸 导演相机模式：角度为默认值，使用默认重绘强度");else {
          let Zt = .78;
          if (Zt = $lt(bn, Zt), cn.append("denoising_strength", String(Zt)), Rt && bn === "architecture") {
            const Ln = Dmn();
            console.log("[Generation] 🔧 建筑模式：ControlNet 权重降低至", Ln.toFixed(2)), console.log("[Generation] 💡 提示：如果 API 支持 ControlNet 参数，请取消上述注释");
          }
          console.log("[Generation] 📸 导演相机模式：角度已变化，重绘强度提升至", Zt), console.log("[Generation] 场景模式:", bn || "character"), console.log("[Generation] 角度参数:", {
            rotation: Lt,
            tilt: ct,
            scale: Dt
          }), console.log("[Generation] ⚠️ 重要：重绘强度已提升，允许空间重组");
        }
      }
      const Qn = {
        done: !1
      };
      try {
        const {
          appendReferenceImagesViaPrepare: Lt
        } = await Ie(async () => {
          const {
            appendReferenceImagesViaPrepare: ct
          } = await Promise.resolve().then(() => up);
          return {
            appendReferenceImagesViaPrepare: ct
          };
        }, void 0, import.meta.url);
        await Lt(cn, je, {
          modelId: "nano-banana-2",
          fieldName: "image",
          fileNamePrefix: "input",
          resolveHints: ct => L(ct)
        }), Qn.done = !0;
      } catch (Lt) {
        console.warn("[Nano Banana 2] Phase3-D multipart 失败，回退 processImageForAPI:", Lt);
      }
      if (!Qn.done) {
        const Lt = await Promise.all(je.map(ct => U(ct)));
        Pre(Lt, "[Nano Banana 2] edits multipart"), Lt.forEach((ct, Dt) => cn.append("image", ct, `input_${Dt}.png`));
      }
      if (dte(cn, "[Nano Banana 2] edits multipart"), I && I.length > 0) try {
        const {
            base64ToBlob: Lt
          } = await Ie(async () => {
            const {
              base64ToBlob: bn
            } = await Promise.resolve().then(() => Aoe);
            return {
              base64ToBlob: bn
            };
          }, void 0, import.meta.url),
          ct = I[0],
          Dt = Lt(ct.mask, "image/png");
        cn.append("mask", Dt, "mask.png"), console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"), console.log("[Generation] ✅ 已添加标记蒙版到 Nano Banana 2 请求"), console.log("[Generation] 📊 蒙版信息:", {
          尺寸: `${ct.width}×${ct.height}`,
          文件大小: `${(Dt.size / 1024).toFixed(2)} KB`,
          标记数量: ct.markerCount || 0
        }), console.log("[Generation] 💡 提示：白色区域 = AI 将修改的位置，黑色区域 = AI 将保持不变"), console.log("[Generation] ⚠️ 注意：如果 AI 没有按照蒙版修改，可能是 API 不支持 mask 参数");
      } catch (Lt) {
        console.error("[Generation] ❌ 添加蒙版失败:", Lt);
      }
      q = cn;
    }
  } else if (h) {
    const $t = await cKi({
      settings: t.settings,
      refImages: l,
      refMetaByRawUrl: b,
      legacyOref: y(t.id, "oref") || String(((kr = t.settings) == null ? void 0 : kr.mjOrefUrl) || "").trim() || null,
      legacySref: y(t.id, "sref") || String(((Mr = t.settings) == null ? void 0 : Mr.mjSrefUrl) || "").trim() || null,
      prompt: i,
      ratio: o,
      baseUrl: a,
      apiKey: f
    }, {
      onUploadProgress: () => {
        _ ? _(m, 2) : v(je => je.map(Qe => Qe.id === m ? {
          ...Qe,
          progress: 2,
          status: "generating"
        } : Qe));
      },
      toUploadBase64: async je => {
        const Qe = String(je || "").trim();
        if (!Qe) throw new Error("参考图为空");
        if (Qe.startsWith("data:image/")) return Qe;
        const Mt = b == null ? void 0 : b.get(Qe),
          {
            resolveConnectedRefAssetId: cn
          } = await Ie(async () => {
            const {
              resolveConnectedRefAssetId: ct
            } = await Promise.resolve().then(() => H9e);
            return {
              resolveConnectedRefAssetId: ct
            };
          }, void 0, import.meta.url),
          Qn = cn(Qe, Mt == null ? void 0 : Mt.assetId),
          Lt = O(Qe);
        try {
          const {
              prepareAssetForModel: ct,
              toBase64String: Dt
            } = await Ie(async () => {
              const {
                prepareAssetForModel: Rt,
                toBase64String: fn
              } = await Promise.resolve().then(() => up);
              return {
                prepareAssetForModel: Rt,
                toBase64String: fn
              };
            }, void 0, import.meta.url),
            bn = await ct({
              assetRef: Qe,
              modelId: "mj-v6",
              purpose: "image-reference",
              requestedTransportMode: "base64",
              assetId: Qn || void 0,
              assetIdHints: Qn ? [Qn] : void 0,
              sourceNode: Lt ?? void 0,
              nodes: S
            });
          return await Dt({
            prepared: bn,
            pureBase64: !1
          });
        } catch (ct) {
          console.warn("[MJ] Phase3-D prepare base64 失败，回退:", ct);
        }
        try {
          const ct = await zU(Qe, {
            assetId: Qn,
            assetIdHints: Qn ? [Qn] : void 0,
            nodes: S,
            sourceNode: Lt ?? void 0
          });
          return await Fu(ct);
        } catch (ct) {
          try {
            const Dt = await U(Qe);
            return await Fu(Dt);
          } catch {
            throw ct;
          }
        }
      }
    });
    if ("error" in $t) return v(je => je.map(Qe => Qe.id === m ? {
      ...Qe,
      status: "failed",
      progress: 0,
      errorMsg: $t.error
    } : Qe)), w(t.id, {
      isGenerating: !1,
      errorMsg: $t.error,
      settings: {
        ...t.settings,
        isGenerating: !1,
        progress: 0,
        error: $t.error
      }
    }), null;
    Q = $t.endpoint, q = $t.payload, ne = $t.useMultipart;
  } else {
    const $t = ((Hn = t.settings) == null ? void 0 : Hn.useAsyncMode) ?? !0,
      je = $t ? "?async=true" : "",
      Qe = kro({
        currentModel: n,
        baseUrl: a,
        modelName: r == null ? void 0 : r.modelName,
        ratio: o,
        resolution: s,
        useAsyncMode: $t,
        hasReferenceImage: d,
        useOssJson: !!F
      });
    console.log(`[Nano Banana] 使用${$t ? "异步" : "同步"}模式，模型: ${(Qe == null ? void 0 : Qe.model) || (r == null ? void 0 : r.modelName) || n}`);
    const Mt = kmn({
      hasReferenceImage: d,
      refImages: l
    });
    if (Qe && d) {
      if (Q = Qe.endpoint, ne = Qe.useMultipart, Qe.useMultipart) {
        const cn = Iro({
            model: Qe.model,
            prompt: i,
            aspectRatio: Qe.aspectRatio
          }),
          Qn = new FormData();
        for (const [Lt, ct] of Object.entries(cn)) Qn.append(Lt, ct);
        if (k) {
          const {
              rotation: Lt,
              tilt: ct,
              scale: Dt
            } = k,
            bn = k.sceneMode,
            Rt = k.needsControlNetReduction || !1;
          if (!(Lt === 0 && ct === 0 && Dt === 1)) {
            let Zt = .78;
            if (Zt = $lt(bn, Zt), Qn.append("denoising_strength", String(Zt)), Rt && bn === "architecture") {
              const Ln = Dmn();
              console.log("[Generation] 🔧 建筑模式：ControlNet 权重降低至", Ln.toFixed(2));
            }
            console.log("[Generation] 📸 导演相机模式：角度已变化，重绘强度提升至", Zt), console.log("[Generation] 场景模式:", bn || "character"), console.log("[Generation] 角度参数:", {
              rotation: Lt,
              tilt: ct,
              scale: Dt
            }), console.log("[Generation] ⚠️ 重要：重绘强度已提升，允许空间重组");
          }
        }
        try {
          const {
            appendReferenceImagesViaPrepare: Lt
          } = await Ie(async () => {
            const {
              appendReferenceImagesViaPrepare: ct
            } = await Promise.resolve().then(() => up);
            return {
              appendReferenceImagesViaPrepare: ct
            };
          }, void 0, import.meta.url);
          await Lt(Qn, Mt, {
            modelId: "nano-banana",
            fieldName: "image",
            fileNamePrefix: "input",
            resolveHints: ct => L(ct)
          });
        } catch (Lt) {
          console.warn("[Nano Banana] Phase3-D multipart 失败，回退 processImageForAPI:", Lt);
          const ct = await Promise.all(Mt.map(Dt => U(Dt)));
          Pre(ct, "[Nano Banana] edits multipart"), ct.forEach((Dt, bn) => Qn.append("image", Dt, `input_${bn}.png`));
        }
        await M(Qn, "nano-banana-1"), dte(Qn, "[Nano Banana] edits multipart"), q = Qn;
      } else {
        const cn = kmn({
            hasReferenceImage: !0,
            refImages: N
          }),
          Qn = Sro({
            model: Qe.model,
            prompt: i,
            aspectRatio: Qe.aspectRatio,
            image: F8(cn)
          });
        G(Qn), q = Qn, console.log("[Nano Banana] 全局 OSS：generations JSON 直链参考图", {
          endpoint: Q,
          count: cn.length
        });
      }
    } else Qe ? (Q = Qe.endpoint, ne = !1, q = Aro({
      model: Qe.model,
      prompt: i,
      aspectRatio: Qe.aspectRatio
    }), A && typeof q == "object" && q !== null && (Object.assign(q, A), console.log("[Generation] Added storyboard JSON data to payload:", A))) : (Q = `${a}/v1/images/generations${je}`, q = {
      model: (r == null ? void 0 : r.modelName) || n,
      prompt: i,
      response_format: "url",
      ...(o !== "Auto" ? {
        aspect_ratio: o
      } : {})
    }, A && typeof q == "object" && q !== null && Object.assign(q, A));
  }
  return k && (ne && q instanceof FormData ? q.append("angle_parameters", JSON.stringify(k)) : typeof q == "object" && q !== null && (q.angle_parameters = k), console.log("[Generation] Added angle_parameters to payload:", k)), ne && q instanceof FormData && /\/v1\/images\/edits\b/i.test(Q) && d && dte(q, "[Generation] images/edits"), {
    endpoint: Q,
    payload: q,
    useMultipart: ne
  };
}

function yC(e, t, n, r) {
  const a = o => (r == null ? void 0 : r.get(o)) ?? n.find(s => s.id === o),
    i = [];
  for (const o of t) {
    if (o.from !== e) continue;
    const s = a(o.to);
    (s == null ? void 0 : s.type) === "preview" && i.push(s.id);
  }
  return [...new Set(i)];
}

function d0r(e, t, n, r, a) {
  var p, m;
  const i = f => (r == null ? void 0 : r.get(f)) ?? n.find(y => y.id === f),
    o = e.settings,
    s = o == null ? void 0 : o.selectedPreviewId,
    l = o == null ? void 0 : o._autoCreatedPreviewId;
  if (s && ((p = i(s)) == null ? void 0 : p.type) === "preview") return s;
  if (l && ((m = i(l)) == null ? void 0 : m.type) === "preview") return l;
  const d = yC(e.id, t, n, r);
  if (d.length > 0) return d[d.length - 1];
  const u = t.filter(f => f.to === e.id).map(f => i(f.from)).filter(f => (f == null ? void 0 : f.type) === "preview").map(f => f.id);
  if (u.length > 0) return u[u.length - 1];
  const h = e.type === "gen-image" && (o == null ? void 0 : o.compactImageWidget) !== !1;
  (a == null ? void 0 : a.warnIfMissing) !== !1 && !h && console.warn("[Batch] 节点没有连接的预览窗口:", e.id);
}

function aoo(e, t, n, r) {
  var s;
  const a = new Set(),
    i = d0r(e, t, n, r, {
      warnIfMissing: !1
    });
  i && a.add(i);
  for (const l of yC(e.id, t, n, r)) a.add(l);
  const o = e.settings;
  for (const l of ["selectedPreviewId", "_autoCreatedPreviewId"]) {
    const d = o == null ? void 0 : o[l];
    d && ((s = (r == null ? void 0 : r.get(d)) ?? n.find(u => u.id === d)) == null ? void 0 : s.type) === "preview" && a.add(d);
  }
  return [...a];
}

function ioo(e) {
  var n;
  const t = (n = e == null ? void 0 : e.previewMjImages) == null ? void 0 : n.filter(r => typeof r == "string" && r.trim().length > 0);
  return !t || t.length < 2 ? {} : {
    mjImages: t,
    previewMjImages: t
  };
}

function voe(e) {
  const t = String(e || "").trim();
  return t.startsWith("data:image") ? t.length > 4096 || /;base64,/i.test(t) : !1;
}

function mUt(e) {
  const t = String(e || "").trim();
  return !t || voe(t) || t.startsWith("blob:") ? "" : t;
}

function ooo(e) {
  const t = String(e || "");
  return t ? t.startsWith("data:") ? `data:(${t.length} chars)` : t.length > 80 ? `${t.slice(0, 80)}…` : t : "";
}

function E$e(e, t) {
  const n = t.map((i, o) => o === 0 ? e : `${e}_${o}`),
    r = t.map((i, o) => `${e}_preview_${o}`),
    a = t.map((i, o) => ({
      id: `${e}_${o}`,
      thumbUrl: "",
      fullUrl: "",
      _remoteResultUrl: mUt(i),
      createdAt: Date.now(),
      assetId: n[o]
    }));
  return {
    allAssetIds: n,
    multiPreviewAssetIds: r,
    generatedImages: a,
    settingsPatch: {
      generatedImages: a,
      _contentAssetId: e,
      _assetId: e,
      _localCacheAssetId: e,
      _mjPreviewAssetIds: r,
      selectedMjImageIndex: 0,
      ...(t.length > 1 ? {
        _mjAssetIds: n
      } : {})
    }
  };
}

function T$e(e, t, n, r) {
  return t.map((a, i) => ({
    id: `${e}_${i}`,
    thumbUrl: r[i] || "",
    fullUrl: "",
    _remoteResultUrl: a,
    createdAt: Date.now(),
    assetId: n[i]
  }));
}

function oPe(e, t) {
  const n = kIe(e, {
    ...e,
    ...t,
    settings: {
      ...(e.settings || {}),
      ...(t.settings || {})
    }
  });
  return {
    ...t,
    content: n.content,
    settings: n.settings
  };
}

async function soo(e) {
  const {
      resultUrls: t,
      taskId: n,
      node: r,
      currentModel: a,
      sourceNodeName: i,
      nodes: o,
      nodesRef: s,
      latestNodes: l,
      setNodes: d,
      updateNode: u,
      setHistory: h,
      updateAllConnectedPreviews: p,
      pollStartedAt: m,
      batchAccumulator: f,
      batchIndex: y,
      batchRemoteAccumulator: b,
      writeBatchPreviewSlot: v
    } = e,
    _ = t.map(k => String(k || "").trim()).filter(Boolean),
    w = _[0];
  if (w) {
    if (d) {
      const k = (s == null ? void 0 : s.current) ?? l ?? o;
      dzt(r, k, d, u);
    }
    await Kye({
      resultUrls: _,
      taskId: n,
      node: r,
      currentModel: a,
      pollStartedAt: m || Date.now(),
      sourceNodeName: i,
      mjOriginalUrlHint: _.length === 1 ? w : void 0,
      batchAccumulator: f,
      batchIndex: y,
      batchRemoteAccumulator: b,
      updateNode: u,
      setHistory: h,
      updateAllConnectedPreviews: p,
      writeBatchPreviewSlot: v || (() => {}),
      nodesRef: s
    });
  }
}

async function Kye(e) {
  var Q, q, ne, de, le, J, pe, ce, we, X, Z;
  const {
      taskId: t,
      node: n,
      currentModel: r,
      pollStartedAt: a,
      sourceNodeName: i,
      mjOriginalUrlHint: o,
      batchAccumulator: s,
      batchIndex: l,
      batchRemoteAccumulator: d,
      updateNode: u,
      setHistory: h,
      updateAllConnectedPreviews: p,
      writeBatchPreviewSlot: m
    } = e,
    {
      patchItem: f
    } = eqn(h, t),
    y = j7(u, n.id, () => {}) ? ((q = (Q = e.nodesRef) == null ? void 0 : Q.current) == null ? void 0 : q.find(re => re.id === n.id)) ?? n : n;
  if (GQ(y.id, t) && !Hke(u)) {
    Xz(t), f(re => ({
      ...re,
      status: "failed",
      progress: 0,
      errorMsg: "已被更新的生成覆盖"
    }));
    return;
  }
  let b = e.resultUrls.slice(),
    v = b[0];
  if (!v) return;
  Xz(t), await UK();
  const _ = Date.now() - a,
    {
      isGlobalOssUploadEnabled: w
    } = await Ie(async () => {
      const {
        isGlobalOssUploadEnabled: re
      } = await Promise.resolve().then(() => Ah);
      return {
        isGlobalOssUploadEnabled: re
      };
    }, void 0, import.meta.url),
    {
      isCanvasLocalCacheMode: k
    } = await Ie(async () => {
      const {
        isCanvasLocalCacheMode: re
      } = await Promise.resolve().then(() => So);
      return {
        isCanvasLocalCacheMode: re
      };
    }, void 0, import.meta.url),
    {
      isHuyaArtExternalResultUrl: A
    } = await Ie(async () => {
      const {
        isHuyaArtExternalResultUrl: re
      } = await Promise.resolve().then(() => ii);
      return {
        isHuyaArtExternalResultUrl: re
      };
    }, void 0, import.meta.url),
    S = k(),
    C = w(),
    I = b.some(re => voe(re)),
    E = mUt(v),
    M = !!E && !A(E),
    T = Eao(C, S, I, M),
    P = T;
  f(re => ({
    ...re,
    ...(o ? {
      mjOriginalUrl: o
    } : {}),
    status: T ? "generating" : "completed",
    progress: T ? 99 : 100,
    url: P ? re.url : re.url || v,
    durationMs: GLe(re, Date.now(), _)
  }));
  const R = () => {
    u(y.id, F7(y, {
      isGenerating: T,
      ...(T ? {
        _contentAssetId: t
      } : {
        content: v,
        _contentAssetId: void 0
      }),
      settings: {
        ...y.settings,
        isGenerating: T,
        progress: T ? 99 : 100,
        error: null,
        errorMsg: void 0,
        ...(b.length > 1 ? {
          mjImages: b,
          generatedImages: b.map((re, fe) => ({
            id: `${t}_${fe}`,
            thumbUrl: re,
            fullUrl: re,
            createdAt: Date.now()
          }))
        } : {}),
        ...(S ? {
          ...(E ? {
            _pendingRemoteResultUrl: E
          } : {
            _pendingRemoteResultUrl: void 0
          }),
          ...E$e(t, b).settingsPatch
        } : I ? {
          _pendingRemoteResultUrl: void 0,
          ...E$e(t, b).settingsPatch,
          _localCacheAssetId: void 0
        } : {})
      }
    }));
  };
  T ? g.startTransition(R) : R();
  try {
    b = await Nqi(b, {
      background: Dj((ne = y.settings) == null ? void 0 : ne.gptImageBackground),
      platformGroup: String(((de = y.settings) == null ? void 0 : de.platformGroup) || ""),
      modelId: r,
      loadBlob: re => Ns(re, {
        compressForApi: !1
      })
    }), v = b[0] || v;
  } catch (re) {
    console.warn("[Generation] GPT Image 透明底后处理跳过，保留原图", re);
  }
  let j = null;
  (S || I) && (j = b.map((re, fe) => Xu(re, fe === 0 ? t : `${t}_${fe}`)), Promise.allSettled(j.slice(1))), await UK();
  const {
      tryResolveGenResultForGlobalOss: B,
      buildHistoryItemPatchFromGlobalOss: F,
      resolveGenImageCompletion: N,
      extractPreviewActualSizeFromOssPack: G,
      ensureOssCanvasThumbDisplayUrl: z
    } = await Ie(async () => {
      const {
        tryResolveGenResultForGlobalOss: re,
        buildHistoryItemPatchFromGlobalOss: fe,
        resolveGenImageCompletion: ye,
        extractPreviewActualSizeFromOssPack: ie,
        ensureOssCanvasThumbDisplayUrl: ae
      } = await Promise.resolve().then(() => ii);
      return {
        tryResolveGenResultForGlobalOss: re,
        buildHistoryItemPatchFromGlobalOss: fe,
        resolveGenImageCompletion: ye,
        extractPreviewActualSizeFromOssPack: ie,
        ensureOssCanvasThumbDisplayUrl: ae
      };
    }, void 0, import.meta.url),
    V = Tao({
      taskId: String(t),
      nodeId: y.id,
      valid: () => !0,
      enqueue: LYe,
      setHistory: h,
      updateNode: kJe(u, () => !GQ(y.id, t))
    }),
    O = await B(b, t, !1, C ? {
      onDisplayReady: V.displayReady
    } : void 0);
  if (V.finish(), GQ(y.id, t) && !Hke(u)) return;
  const L = s !== void 0 && l !== void 0;
  if (O) {
    const {
        isHuyaArtExternalResultUrl: re
      } = await Ie(async () => {
        const {
          isHuyaArtExternalResultUrl: xe
        } = await Promise.resolve().then(() => ii);
        return {
          isHuyaArtExternalResultUrl: xe
        };
      }, void 0, import.meta.url),
      fe = xe => {
        const he = z(xe);
        return DIt(he) ? he : "";
      },
      ye = O.displayUrls.map(fe),
      ie = O.remoteUrls[0] && !re(O.remoteUrls[0]) ? O.remoteUrls[0] : "",
      ae = ye[0] || fe(String(((le = O.ossSettings) == null ? void 0 : le._ossThumbnailUrl) || "")) || fe(ie);
    ae || console.warn("[Generation] 全局 OSS 转存后无可用展示 URL，跳过海艺外链回写", t), L && m(ae, ie || O.remoteUrls[0]);
    const be = L ? s.filter(xe => xe && xe.length > 0) : [];
    if (f(xe => ({
      ...xe,
      status: "completed",
      progress: 100,
      selectedMjImageIndex: 0,
      durationMs: xe.startTime ? Date.now() - xe.startTime : void 0,
      ...F({
        ...O,
        displayUrls: ye
      }, {
        type: "image",
        mjImages: b.length > 1 ? O.remoteUrls : void 0,
        mjThumbnails: b.length > 1 ? ye : void 0
      })
    })), ae) {
      const xe = ((pe = (J = e.nodesRef) == null ? void 0 : J.current) == null ? void 0 : pe.find(he => he.id === y.id)) ?? y;
      u(y.id, oPe(xe, {
        isGenerating: !1,
        content: ae,
        thumbnailUrl: ae,
        settings: {
          ...y.settings,
          isGenerating: !1,
          progress: 100,
          error: null,
          generatedImages: O.generatedImages.map((he, ue) => ({
            ...he,
            thumbUrl: ye[ue] || ""
          })),
          ...O.ossSettings,
          _canvasDisplayPreviewUrl: ae,
          _ossRemoteUrl: ie || ((ce = O.ossSettings) == null ? void 0 : ce._ossRemoteUrl),
          _ossThumbnailUrl: ae || ((we = O.ossSettings) == null ? void 0 : we._ossThumbnailUrl) || ie,
          _pendingRemoteResultUrl: void 0,
          ...(b.length > 1 ? {
            mjImages: ye.map((he, ue) => O.remoteUrls[ue] || ""),
            mjThumbnails: ye
          } : {})
        },
        _contentAssetId: void 0
      }));
    } else {
      const xe = b.find(he => re(he)) || b.find(he => String(he || "").trim()) || "";
      u(y.id, {
        isGenerating: !1,
        content: "",
        settings: {
          ...y.settings,
          isGenerating: !1,
          progress: 100,
          error: null,
          ...O.ossSettings,
          _pendingRemoteResultUrl: xe || void 0
        },
        _contentAssetId: void 0
      });
    }
    const Ee = ae;
    if (Ee) if (L) y.type !== "storyboard-chart-node" && (await p(Ee, "image", {
      previewMjImages: be.length > 0 ? be : void 0,
      selectedPreviewImage: Ee,
      sourceNodeName: i,
      previewSourceModel: r
    }));else {
      const xe = b.length > 1 ? {
        previewMjImages: ye,
        selectedPreviewImage: Ee
      } : void 0;
      await p(Ee, "image", {
        ...xe,
        sourceNodeName: i,
        previewSourceModel: r
      });
    }
    return;
  }
  if (S || I) {
    for (let ae = 0; ae < b.length; ae += 1) voe(b[ae]) && (b[ae] = `local-asset://${ae === 0 ? t : `${t}_${ae}`}`);
    const re = b.map((ae, be) => be === 0 ? t : `${t}_${be}`),
      fe = b.map((ae, be) => `${t}_preview_${be}`),
      ye = E || "",
      ie = ae => {
        if (!ae) return;
        (() => {
          var ge, _e, ke;
          const Ee = ((_e = (ge = e.nodesRef) == null ? void 0 : ge.current) == null ? void 0 : _e.find(ve => ve.id === y.id)) ?? y,
            xe = Array.isArray((ke = Ee.settings) == null ? void 0 : ke.generatedImages) ? Ee.settings.generatedImages : [],
            he = re.map((ve, Te) => {
              var Ne;
              return Te === 0 ? ae : String(((Ne = xe[Te]) == null ? void 0 : Ne.thumbUrl) || "").trim();
            }),
            ue = {
              ...(Ee.settings || y.settings || {})
            };
          Da.unstable_batchedUpdates(() => {
            f(ve => ({
              ...ve,
              status: "completed",
              progress: 100,
              url: ae,
              thumbnailUrl: ae,
              _assetId: t,
              _globalOssUrlOnly: !1,
              ossUploaded: !1,
              _ossRemoteUrl: void 0,
              originalUrl: void 0
            })), u(y.id, F7(Ee, oPe(Ee, {
              isGenerating: !1,
              content: ae,
              thumbnailUrl: ae,
              _contentAssetId: t,
              settings: {
                ...ue,
                isGenerating: !1,
                progress: 100,
                error: null,
                _localPersistError: void 0,
                _canvasDisplayPreviewUrl: ae,
                _pendingRemoteResultUrl: void 0,
                _contentAssetId: t,
                _assetId: t,
                _localCacheAssetId: t,
                generatedImages: T$e(t, e.resultUrls, re, he),
                _mjPreviewAssetIds: fe,
                ...(re.length > 1 ? {
                  _mjAssetIds: re,
                  mjImages: he
                } : {})
              }
            }), void 0)), el(u, y.id, !1);
          });
        })(), p(ae, "image", {
          sourceNodeName: i,
          previewSourceModel: r,
          originalResultUrl: ye || void 0,
          contentAssetId: t
        });
      };
    L && m(M ? ye : "", ye), (async () => {
      try {
        try {
          await (j == null ? void 0 : j[0]);
        } catch (ge) {
          console.error("[Generation] 主图本地落盘失败:", ge);
          const _e = (ge instanceof Error ? ge.message : String(ge || "")).slice(0, 600),
            ke = _e ? `生成成功但本地缓存落盘失败：${_e}` : "生成成功但本地缓存落盘失败，请重试或切换存储模式";
          M ? (f(ve => ({
            ...ve,
            status: "completed",
            progress: 100,
            url: ve.url || ye,
            errorMsg: void 0
          })), u(y.id, {
            isGenerating: !1,
            errorMsg: void 0,
            content: ye,
            _contentAssetId: void 0,
            settings: {
              ...y.settings,
              isGenerating: !1,
              progress: 100,
              error: null,
              errorMsg: void 0,
              _localPersistError: ke,
              _pendingRemoteResultUrl: ye,
              _contentAssetId: void 0,
              _assetId: void 0,
              _localCacheAssetId: void 0
            }
          })) : (f(ve => ({
            ...ve,
            status: "failed",
            progress: 0,
            errorMsg: ke
          })), u(y.id, {
            isGenerating: !1,
            errorMsg: ke,
            settings: {
              ...y.settings,
              isGenerating: !1,
              progress: 0,
              error: null,
              errorMsg: void 0,
              _localPersistError: ke
            }
          })), el(u, y.id, !1);
          return;
        }
        Ie(async () => {
          const {
            scheduleHistoryThumbnailSaveFromLocalAsset: ge
          } = await Promise.resolve().then(() => EUt);
          return {
            scheduleHistoryThumbnailSaveFromLocalAsset: ge
          };
        }, void 0, import.meta.url).then(({
          scheduleHistoryThumbnailSaveFromLocalAsset: ge
        }) => {
          ge(t, h, {
            onPreviewReady: ie,
            onFinalFailure: () => {
              M ? u(y.id, {
                isGenerating: !1,
                settings: {
                  ...y.settings,
                  isGenerating: !1,
                  progress: 100,
                  error: null,
                  _localPersistError: "本地缩略图生成失败，当前继续使用远程结果"
                }
              }) : u(y.id, {
                isGenerating: !1,
                errorMsg: "生成成功但本地缓存落盘失败，请重试或切换存储模式",
                settings: {
                  ...y.settings,
                  isGenerating: !1,
                  progress: 0,
                  error: null,
                  errorMsg: void 0
                }
              }), el(u, y.id, !1);
            }
          });
        });
        const ae = [];
        for (let ge = 0; ge < re.length; ge++) ge > 0 && (await Id()), ae.push(await cz(`local-asset://${re[ge]}`, fe[ge], re[ge], {
          downloadAlreadyScheduled: !0
        }));
        let be = ae[0] || "";
        if (!be) {
          for (let ge = 0; ge < 90; ge += 1) if (await Id(), await new Promise(_e => setTimeout(_e, 200)), be = await cz(`local-asset://${t}`, fe[0], t, {
            downloadAlreadyScheduled: !0
          }), be) {
            ae[0] = be;
            break;
          }
        }
        if (!be) {
          console.warn("[Generation] preview 尚未就绪，交由历史缩略图回调收尾（节点先停止生成态）"), u(y.id, {
            isGenerating: !1
          }), el(u, y.id, !1);
          return;
        }
        ae.forEach((ge, _e) => {
          ge && re[_e] && Il(ge, re[_e]);
        });
        const Ee = T$e(t, e.resultUrls, re, ae);
        (() => {
          var _e, ke;
          const ge = ((ke = (_e = e.nodesRef) == null ? void 0 : _e.current) == null ? void 0 : ke.find(ve => ve.id === y.id)) ?? y;
          Da.unstable_batchedUpdates(() => {
            f(ve => ({
              ...ve,
              status: "completed",
              progress: 100,
              url: be,
              thumbnailUrl: be || void 0,
              mjImages: b.length > 1 ? ae : void 0,
              _assetId: t,
              ...(b.length > 1 ? {
                _mjAssetIds: re
              } : {}),
              _globalOssUrlOnly: !1,
              ossUploaded: !1,
              _ossRemoteUrl: void 0,
              originalUrl: void 0
            })), u(y.id, F7(ge, oPe(ge, {
              isGenerating: !1,
              content: be,
              thumbnailUrl: be || void 0,
              _contentAssetId: t,
              settings: {
                ...(ge.settings || y.settings),
                isGenerating: !1,
                progress: 100,
                error: null,
                _localPersistError: void 0,
                ...(be ? {
                  _canvasDisplayPreviewUrl: be,
                  _pendingRemoteResultUrl: void 0
                } : {}),
                generatedImages: Ee,
                _contentAssetId: t,
                _assetId: t,
                _localCacheAssetId: t,
                ...(b.length > 1 ? {
                  mjImages: ae,
                  _mjAssetIds: re
                } : {}),
                _mjPreviewAssetIds: fe
              }
            }), void 0)), el(u, y.id, !1);
          });
        })();
        const he = {
            sourceNodeName: i,
            previewSourceModel: r,
            originalResultUrl: ye || void 0,
            contentAssetId: t
          },
          ue = b.length > 1 ? {
            previewMjImages: ae,
            selectedPreviewImage: be,
            previewMjAssetIds: re
          } : void 0;
        if (L) {
          if (m(be, ye), y.type !== "storyboard-chart-node") {
            const ge = s.filter(_e => _e && _e.length > 0);
            await p(be, "image", {
              previewMjImages: ge.length > 0 ? ge : void 0,
              previewMjAssetIds: re,
              selectedPreviewImage: be,
              ...he
            });
          }
        } else await p(be, "image", {
          ...ue,
          ...he
        });
        (async () => {
          try {
            const ge = await X4({
              contentAssetId: t,
              remoteResultUrl: ye
            });
            if (!ge) return;
            const _e = NSt(y.id, y, ge),
              ke = () => {
                u(y.id, _e), Ude([y.id]);
              };
            Yi() ? O$(ke) : g.startTransition(ke);
          } catch {}
        })();
      } catch (ae) {
        console.warn("[Generation] 本地模式后台展示解析失败，节点保持空槽等待:", ae);
      }
    })();
    return;
  }
  const D = await N(b, t, {
      nodeId: y.id,
      model: r
    }),
    U = D.primaryDisplayUrl,
    H = D.contentAssetId,
    Y = D.generatedImages;
  f(re => ({
    ...re,
    status: "completed",
    progress: 100,
    durationMs: GLe(re, Date.now(), _),
    ...(D.usedOss && D.ossPack ? F(D.ossPack, {
      type: "image",
      mjImages: b.length > 1 ? D.remoteUrls : void 0,
      mjThumbnails: b.length > 1 ? D.displayUrls : void 0
    }) : {
      url: U,
      thumbnailUrl: U !== v ? U : void 0,
      _assetId: H || t,
      _globalOssUrlOnly: !1,
      ossUploaded: !1,
      ...(b.length > 1 ? {
        mjImages: b,
        mjThumbnails: D.displayUrls,
        _mjAssetIds: b.map((fe, ye) => ye === 0 ? H || t : `${t}_${ye}`)
      } : {})
    })
  }));
  {
    const {
        isHuyaArtExternalResultUrl: re
      } = await Ie(async () => {
        const {
          isHuyaArtExternalResultUrl: ie
        } = await Promise.resolve().then(() => ii);
        return {
          isHuyaArtExternalResultUrl: ie
        };
      }, void 0, import.meta.url),
      fe = !U && re(v) ? v : void 0,
      ye = ((Z = (X = e.nodesRef) == null ? void 0 : X.current) == null ? void 0 : Z.find(ie => ie.id === y.id)) ?? y;
    u(y.id, oPe(ye, {
      isGenerating: !1,
      content: U || "",
      _contentAssetId: D.usedOss ? void 0 : H,
      settings: {
        ...y.settings,
        isGenerating: !1,
        progress: 100,
        error: null,
        generatedImages: Y,
        ...(D.usedOss && D.ossPack ? {
          ...D.ossPack.ossSettings,
          ...(b.length > 1 ? {
            mjImages: D.displayUrls.map((ie, ae) => D.remoteUrls[ae] || ""),
            mjThumbnails: D.displayUrls
          } : {})
        } : {
          _contentAssetId: H,
          _assetId: H,
          ...(b.length > 1 ? {
            mjImages: b,
            mjThumbnails: D.displayUrls,
            _mjPreviewAssetIds: b.map((ie, ae) => `${t}_mj_${ae}`)
          } : {})
        }),
        ...(fe ? {
          _pendingRemoteResultUrl: fe
        } : {})
      }
    }));
  }
  const K = {
      sourceNodeName: i,
      previewSourceModel: r,
      originalResultUrl: v,
      ...(D.usedOss ? {
        previewOssRemoteUrl: D.remoteUrls[0],
        contentAssetId: void 0,
        previewActualSize: G(D.ossPack)
      } : {
        contentAssetId: H
      })
    },
    W = b.length > 1 ? D.usedOss ? {
      previewMjImages: D.displayUrls.map((re, fe) => re || D.remoteUrls[fe] || ""),
      selectedPreviewImage: U
    } : {
      previewMjImages: D.displayUrls,
      selectedPreviewImage: U
    } : void 0;
  if (L) {
    if (m(U, D.usedOss ? D.remoteUrls[0] : void 0), y.type !== "storyboard-chart-node") {
      const re = s.filter(fe => fe && fe.length > 0);
      await p(U, "image", {
        previewMjImages: re.length > 0 ? re : void 0,
        previewMjRemoteUrls: d != null && d.some(fe => !!fe) ? d : void 0,
        selectedPreviewImage: U,
        ...K
      });
    }
  } else await p(U, "image", {
    ...W,
    ...K
  });
  D.usedOss || (oy({
    url: v,
    type: "image"
  }, t).catch(() => {}), M$e(t, v, h));
}

async function loo(e) {
  const {
      isTauriAssetProtocolUrl: t,
      isCanvasLocalCacheMode: n
    } = await Ie(async () => {
      const {
        isTauriAssetProtocolUrl: o,
        isCanvasLocalCacheMode: s
      } = await Promise.resolve().then(() => So);
      return {
        isTauriAssetProtocolUrl: o,
        isCanvasLocalCacheMode: s
      };
    }, void 0, import.meta.url),
    {
      localCacheManager: r
    } = await Ie(async () => {
      const {
        localCacheManager: o
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: o
      };
    }, void 0, import.meta.url);
  await r.ensureRestored();
  const a = o => {
      const s = String(o || "").trim();
      return s ? s.startsWith("blob:") || s.startsWith("data:video/") ? !0 : t(s) ? /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(s) || /(?:[/\\]|%5[cC])videos(?:[/\\]|%5[cC])/i.test(s) : (/^https?:\/\//i.test(s), !1) : !1;
    },
    i = n();
  if (!i) {
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
    await o.init();
  }
  for (let o = 0; o < 60; o++) {
    try {
      const s = await r.getConvertFileSrcForAsset(e);
      if (a(s)) return s;
      if (!i) {
        const {
            assetStore: l
          } = await Ie(async () => {
            const {
              assetStore: u
            } = await Promise.resolve().then(() => Ri);
            return {
              assetStore: u
            };
          }, void 0, import.meta.url),
          d = await l.getAssetUrl(e);
        if (a(d)) return d;
      }
    } catch {}
    await Id(), await new Promise(s => setTimeout(s, 250));
  }
  return "";
}

async function coo(e) {
  const t = String(e || "").trim();
  if (!(!t || !/^https?:\/\//i.test(t))) try {
    const {
        isGlobalOssUploadEnabled: n
      } = await Ie(async () => {
        const {
          isGlobalOssUploadEnabled: d
        } = await Promise.resolve().then(() => Ah);
        return {
          isGlobalOssUploadEnabled: d
        };
      }, void 0, import.meta.url),
      {
        isHuyaArtExternalResultUrl: r
      } = await Ie(async () => {
        const {
          isHuyaArtExternalResultUrl: d
        } = await Promise.resolve().then(() => ii);
        return {
          isHuyaArtExternalResultUrl: d
        };
      }, void 0, import.meta.url);
    if (n() || r(t)) return;
    const {
      isBrowserCorsHostileVideoUrl: a,
      getVideoMetadata: i
    } = await Ie(async () => {
      const {
        isBrowserCorsHostileVideoUrl: d,
        getVideoMetadata: u
      } = await Promise.resolve().then(() => pg);
      return {
        isBrowserCorsHostileVideoUrl: d,
        getVideoMetadata: u
      };
    }, void 0, import.meta.url);
    if (a(t)) return;
    const o = await Promise.race([i(t), new Promise((d, u) => {
      window.setTimeout(() => u(new Error("video metadata timeout")), 8e3);
    })]);
    if (!(o.w > 0 && o.h > 0)) return;
    const {
      isLikelyOssThumbnailPixelSize: s,
      formatImagePixelSizeLabel: l
    } = await Ie(async () => {
      const {
        isLikelyOssThumbnailPixelSize: d,
        formatImagePixelSizeLabel: u
      } = await Promise.resolve().then(() => ii);
      return {
        isLikelyOssThumbnailPixelSize: d,
        formatImagePixelSizeLabel: u
      };
    }, void 0, import.meta.url);
    return s(o.w, o.h) ? void 0 : l(o.w, o.h);
  } catch {
    return;
  }
}

async function oV(e) {
  var j, B, F, N;
  const {
    resultUrl: t,
    taskId: n,
    node: r,
    currentModel: a,
    pollStartedAt: i,
    sourceNodeName: o,
    remoteTaskId: s,
    updateNode: l,
    setHistory: d,
    updateAllConnectedPreviews: u
  } = e;
  if (GQ(r.id, n) && !Hke(l)) {
    Xz(n), d(G => G.map(z => z.id === n ? {
      ...z,
      status: "failed",
      progress: 0,
      errorMsg: "已被更新的生成覆盖"
    } : z));
    return;
  }
  const h = String(t || "").trim();
  if (!h) return;
  const p = String(s || "").trim(),
    m = G => p && !G.remoteTaskId ? {
      ...G,
      remoteTaskId: p
    } : p ? {
      ...G,
      remoteTaskId: G.remoteTaskId || p
    } : G;
  Xz(n), await UK();
  const f = typeof i == "number" && i > 0 ? Math.max(0, Date.now() - i) : void 0,
    y = G => {
      const z = GLe(G, Date.now(), f),
        V = G.generationTime || TE(z);
      return {
        ...(z != null ? {
          durationMs: z
        } : {}),
        ...(V ? {
          generationTime: V
        } : {})
      };
    },
    {
      isGlobalOssUploadEnabled: b
    } = await Ie(async () => {
      const {
        isGlobalOssUploadEnabled: G
      } = await Promise.resolve().then(() => Ah);
      return {
        isGlobalOssUploadEnabled: G
      };
    }, void 0, import.meta.url),
    {
      isCanvasLocalCacheMode: v
    } = await Ie(async () => {
      const {
        isCanvasLocalCacheMode: G
      } = await Promise.resolve().then(() => So);
      return {
        isCanvasLocalCacheMode: G
      };
    }, void 0, import.meta.url),
    _ = v(),
    w = b(),
    {
      isHuyaArtExternalResultUrl: k
    } = await Ie(async () => {
      const {
        isHuyaArtExternalResultUrl: G
      } = await Promise.resolve().then(() => ii);
      return {
        isHuyaArtExternalResultUrl: G
      };
    }, void 0, import.meta.url),
    A = /^https?:\/\//i.test(h) && !k(h),
    S = Yi() ? Promise.resolve(void 0) : qVe.run(() => coo(h)).catch(() => {});
  d(G => G.map(z => String(z.id) === String(n) ? {
    ...m(z),
    status: "completed",
    progress: 100,
    url: A ? h : z.url,
    ...y(z)
  } : z)), l(r.id, {
    isGenerating: !1,
    errorMsg: void 0,
    content: A ? h : "",
    _contentAssetId: void 0,
    videoPosterUrl: void 0,
    settings: {
      ...r.settings,
      isGenerating: !1,
      progress: 100,
      error: null,
      errorMsg: void 0,
      _pendingRemoteResultUrl: h,
      _contentAssetId: void 0,
      _assetId: void 0,
      _localCacheAssetId: void 0,
      generatedImages: [{
        id: `${n}_v0`,
        thumbUrl: "",
        fullUrl: h,
        url: h,
        createdAt: Date.now()
      }]
    }
  });
  const {
      tryResolveGenResultForGlobalOss: C,
      buildHistoryItemPatchFromGlobalOss: I,
      pickGenVideoPlaybackUrl: E,
      extractPreviewActualSizeFromOssPack: M
    } = await Ie(async () => {
      const {
        tryResolveGenResultForGlobalOss: G,
        buildHistoryItemPatchFromGlobalOss: z,
        pickGenVideoPlaybackUrl: V,
        extractPreviewActualSizeFromOssPack: O
      } = await Promise.resolve().then(() => ii);
      return {
        tryResolveGenResultForGlobalOss: G,
        buildHistoryItemPatchFromGlobalOss: z,
        pickGenVideoPlaybackUrl: V,
        extractPreviewActualSizeFromOssPack: O
      };
    }, void 0, import.meta.url),
    T = await C([h], n, !0);
  if (T) {
    const G = await S,
      z = E(T, h, null),
      V = String(((j = T.displayUrls) == null ? void 0 : j[0]) || "").trim(),
      {
        pickOssVideoImagePosterUrl: O
      } = await Ie(async () => {
        const {
          pickOssVideoImagePosterUrl: de
        } = await Promise.resolve().then(() => ii);
        return {
          pickOssVideoImagePosterUrl: de
        };
      }, void 0, import.meta.url),
      L = O(V),
      D = M(T),
      {
        isLikelyOssThumbnailPixelSize: U
      } = await Ie(async () => {
        const {
          isLikelyOssThumbnailPixelSize: de
        } = await Promise.resolve().then(() => ii);
        return {
          isLikelyOssThumbnailPixelSize: de
        };
      }, void 0, import.meta.url),
      H = D ? Hs(D) : null,
      Y = !!H && U(H.w, H.h),
      K = G || (Y ? void 0 : D),
      W = (K ? Hs(K) : null) || (typeof T.imageWidth == "number" && typeof T.imageHeight == "number" && T.imageWidth > 0 && T.imageHeight > 0 && !U(T.imageWidth, T.imageHeight) ? {
        w: T.imageWidth,
        h: T.imageHeight
      } : null),
      Q = L || (A ? h : ""),
      q = z && !/vframe\/jpg|x-oss-process=video\/snapshot/i.test(z) && z !== L ? z : String(((B = T.remoteUrls) == null ? void 0 : B[0]) || "").trim();
    d(de => de.map(le => String(le.id) === String(n) ? {
      ...m(le),
      status: "completed",
      progress: 100,
      ...y(le),
      _assetId: void 0,
      ...I(T, {
        type: "video"
      }),
      ...(q ? {
        _ossRemoteUrl: q,
        originalUrl: q
      } : {})
    } : le));
    const ne = {
      isGenerating: !1,
      errorMsg: void 0,
      content: Q,
      _contentAssetId: void 0,
      ...(L ? {
        videoPosterUrl: L
      } : {
        videoPosterUrl: void 0
      }),
      settings: {
        ...r.settings,
        isGenerating: !1,
        progress: 100,
        error: null,
        errorMsg: void 0,
        ...(T.ossSettings || {}),
        ...(q ? {
          _ossRemoteUrl: q,
          generatedImages: [{
            id: n,
            thumbUrl: L || "",
            fullUrl: q,
            createdAt: Date.now()
          }]
        } : (F = T.generatedImages) != null && F.length ? {
          generatedImages: T.generatedImages
        } : {}),
        ...(L ? {
          videoPosterUrl: L
        } : {
          videoPosterUrl: void 0
        }),
        ...(K ? {
          previewActualSize: K,
          previewSize: K
        } : {})
      }
    };
    l(r.id, W ? xX(r, ne, W) : F7(r, ne, K)), await u(Q || z, "video", {
      sourceNodeName: o,
      previewSourceModel: a,
      previewOssRemoteUrl: (N = T.remoteUrls) == null ? void 0 : N[0],
      originalResultUrl: h,
      ...(K ? {
        previewActualSize: K
      } : {})
    });
    return;
  }
  if (w) {
    const G = await S,
      {
        isHuyaArtExternalResultUrl: z,
        SOURCE_REMOTE_RESULT_URL_SETTING_KEY: V
      } = await Ie(async () => {
        const {
          isHuyaArtExternalResultUrl: U,
          SOURCE_REMOTE_RESULT_URL_SETTING_KEY: H
        } = await Promise.resolve().then(() => ii);
        return {
          isHuyaArtExternalResultUrl: U,
          SOURCE_REMOTE_RESULT_URL_SETTING_KEY: H
        };
      }, void 0, import.meta.url),
      O = z(h),
      L = O ? h : void 0,
      D = !O && /^https?:\/\//i.test(h) ? h : "";
    d(U => U.map(H => String(H.id) === String(n) ? {
      ...m(H),
      status: "completed",
      progress: 100,
      ...y(H),
      url: H.url || D || ""
    } : H)), l(r.id, {
      isGenerating: !1,
      errorMsg: void 0,
      content: D,
      settings: {
        ...r.settings,
        isGenerating: !1,
        progress: 100,
        error: null,
        errorMsg: void 0,
        ...(L ? {
          _pendingRemoteResultUrl: L
        } : {}),
        ...(D ? {
          [V]: D,
          generatedImages: [{
            id: n,
            thumbUrl: "",
            fullUrl: D,
            createdAt: Date.now()
          }]
        } : {})
      }
    }), console.warn("[Generation] 全局 OSS 视频转存失败，已跳过海艺外链上屏:", h.slice(0, 96)), D && (await u(D, "video", {
      sourceNodeName: o,
      previewSourceModel: a,
      originalResultUrl: h,
      ...(G ? {
        previewActualSize: G
      } : {})
    }));
    return;
  }
  if (_) {
    (async () => {
      try {
        try {
          await Jwe(h, {
            nodeId: r.id,
            taskId: n,
            model: a
          });
        } catch (q) {
          console.error("[Generation] 本地视频落盘失败:", q);
          const ne = (q instanceof Error ? q.message : String(q || "")).slice(0, 600);
          l(r.id, {
            isGenerating: !1,
            errorMsg: void 0,
            content: A ? h : "",
            _contentAssetId: void 0,
            settings: {
              ...r.settings,
              isGenerating: !1,
              progress: 100,
              error: null,
              errorMsg: void 0,
              _localPersistError: ne || "本地视频落盘失败，当前继续使用远程结果",
              _pendingRemoteResultUrl: h,
              _contentAssetId: void 0,
              _assetId: void 0,
              _localCacheAssetId: void 0
            }
          });
          return;
        }
        const G = await S;
        l(r.id, {
          isGenerating: !1,
          errorMsg: void 0,
          _contentAssetId: n,
          settings: {
            ...r.settings,
            isGenerating: !1,
            progress: 100,
            error: null,
            errorMsg: void 0,
            _localPersistError: void 0,
            _pendingRemoteResultUrl: void 0,
            _assetId: n,
            _localCacheAssetId: n,
            _contentAssetId: n
          }
        });
        let z,
          V = null;
        try {
          const {
              ensureHistoryVideoPreviewThumbnailForAssetId: q
            } = await Ie(async () => {
              const {
                ensureHistoryVideoPreviewThumbnailForAssetId: le
              } = await Promise.resolve().then(() => qh);
              return {
                ensureHistoryVideoPreviewThumbnailForAssetId: le
              };
            }, void 0, import.meta.url),
            ne = await q(n);
          ne != null && ne.width && (ne != null && ne.height) && (V = {
            w: ne.width,
            h: ne.height
          });
          const {
            readHistoryHybridListThumbnail: de
          } = await Ie(async () => {
            const {
              readHistoryHybridListThumbnail: le
            } = await Promise.resolve().then(() => ii);
            return {
              readHistoryHybridListThumbnail: le
            };
          }, void 0, import.meta.url);
          if (z = (await de({
            id: n,
            _assetId: n
          })) || void 0, !z) try {
            const {
              ensureLocalPreviewDisplayUrl: le
            } = await Ie(async () => {
              const {
                ensureLocalPreviewDisplayUrl: J
              } = await Promise.resolve().then(() => Ui);
              return {
                ensureLocalPreviewDisplayUrl: J
              };
            }, void 0, import.meta.url);
            z = (await le(n, {
              maxDim: 512,
              allowVideoOriginal: !1
            })) || void 0;
          } catch {}
        } catch (q) {
          console.warn("[Generation] 本地视频封面生成失败（不影响按需播放）:", q);
        }
        const O = await loo(n),
          L = z || (A ? h : "");
        O && /^https?:\/\//i.test(O) && !/^https?:\/\/asset\./i.test(O) && console.warn("[Generation] 本地视频展示解析得到远程 HTTPS，忽略播放链:", O.slice(0, 96));
        const D = O && (!/^https?:\/\//i.test(O) || /^https?:\/\/asset\./i.test(O)) ? O : "",
          {
            isLikelyOssThumbnailPixelSize: U,
            formatImagePixelSizeLabel: H
          } = await Ie(async () => {
            const {
              isLikelyOssThumbnailPixelSize: q,
              formatImagePixelSizeLabel: ne
            } = await Promise.resolve().then(() => ii);
            return {
              isLikelyOssThumbnailPixelSize: q,
              formatImagePixelSizeLabel: ne
            };
          }, void 0, import.meta.url),
          Y = !!V && V.w > 0 && V.h > 0 && U(V.w, V.h),
          K = G || (!Y && V && V.w > 0 && V.h > 0 ? H(V.w, V.h) : void 0),
          W = K ? Hs(K) : null;
        (() => {
          var le;
          d(J => J.map(pe => String(pe.id) === String(n) ? {
            ...m(pe),
            status: "completed",
            progress: 100,
            url: L || pe.url,
            _assetId: n,
            ...y(pe),
            ...(z ? {
              thumbnailUrl: z,
              videoPosterUrl: z
            } : {}),
            ...(W ? {
              width: W.w,
              height: W.h
            } : {})
          } : pe));
          const q = Array.isArray((le = r.settings) == null ? void 0 : le.generatedImages) ? r.settings.generatedImages : [],
            ne = q.length > 0 ? q.map((J, pe) => pe === 0 ? {
              ...J,
              fullUrl: D || J.fullUrl,
              url: L || D || J.url,
              ...(z ? {
                thumbUrl: z
              } : {})
            } : J) : [{
              id: `${n}_v0`,
              thumbUrl: z || L || D,
              fullUrl: D,
              url: L || D,
              createdAt: Date.now()
            }],
            de = {
              isGenerating: !1,
              errorMsg: void 0,
              content: L,
              _contentAssetId: n,
              ...(z ? {
                videoPosterUrl: z
              } : {}),
              settings: {
                ...r.settings,
                isGenerating: !1,
                progress: 100,
                error: null,
                errorMsg: void 0,
                _localPersistError: void 0,
                _pendingRemoteResultUrl: void 0,
                _assetId: n,
                _localCacheAssetId: n,
                _contentAssetId: n,
                generatedImages: ne,
                ...(D ? {
                  _localVideoPlaybackUrl: D
                } : {}),
                ...(z ? {
                  videoPosterUrl: z,
                  _canvasDisplayPreviewUrl: z,
                  _useCanvasPreviewDisplay: !0
                } : {}),
                ...(K ? {
                  previewActualSize: K,
                  previewSize: K
                } : {})
              }
            };
          l(r.id, W ? xX(r, de, W) : F7(r, de, K));
        })(), await u(L || D, "video", {
          sourceNodeName: o,
          previewSourceModel: a,
          originalResultUrl: h,
          contentAssetId: n,
          ...(K ? {
            previewActualSize: K
          } : {})
        }), Promise.all([Ie(async () => {
          const {
            clearLocalGenApiBlobCache: q
          } = await Promise.resolve().then(() => Mc);
          return {
            clearLocalGenApiBlobCache: q
          };
        }, void 0, import.meta.url).then(({
          clearLocalGenApiBlobCache: q
        }) => q()), Ie(async () => {
          const {
            clearTauriDownloadSessionCache: q
          } = await Promise.resolve().then(() => El);
          return {
            clearTauriDownloadSessionCache: q
          };
        }, void 0, import.meta.url).then(({
          clearTauriDownloadSessionCache: q
        }) => q())]).catch(() => {});
      } catch (G) {
        console.warn("[Generation] 本地视频后台展示解析失败:", G);
      }
    })();
    return;
  }
  let P = h;
  try {
    P = (await Jwe(h, {
      nodeId: r.id,
      taskId: n,
      model: a
    })).displayUrl || h;
  } catch (G) {
    console.error("[Generation] 视频落盘失败:", G);
  }
  gUt(n, d, void 0, h);
  const R = E(null, P, null);
  d(G => G.map(z => String(z.id) === String(n) ? {
    ...m(z),
    status: "completed",
    progress: 100,
    ...y(z),
    _assetId: n,
    url: R
  } : z)), l(r.id, {
    isGenerating: !1,
    content: R,
    _contentAssetId: n,
    settings: {
      ...r.settings,
      isGenerating: !1,
      progress: 100,
      error: null
    }
  }), await u(R, "video", {
    sourceNodeName: o,
    previewSourceModel: a,
    originalResultUrl: h,
    contentAssetId: n
  });
}

async function cz(e, t, n, r) {
  const a = String(e || "").trim();
  if (!a) return "";
  const {
    isCanvasLocalCacheMode: i,
    isRemoteHttpUrl: o,
    isTauriAssetProtocolUrl: s
  } = await Ie(async () => {
    const {
      isCanvasLocalCacheMode: l,
      isRemoteHttpUrl: d,
      isTauriAssetProtocolUrl: u
    } = await Promise.resolve().then(() => So);
    return {
      isCanvasLocalCacheMode: l,
      isRemoteHttpUrl: d,
      isTauriAssetProtocolUrl: u
    };
  }, void 0, import.meta.url);
  if (i()) {
    try {
      const {
          readLocalPreviewThumbnailAsUrl: l,
          ensureLocalPreviewDisplayUrl: d
        } = await Ie(async () => {
          const {
            readLocalPreviewThumbnailAsUrl: f,
            ensureLocalPreviewDisplayUrl: y
          } = await Promise.resolve().then(() => Ui);
          return {
            readLocalPreviewThumbnailAsUrl: f,
            ensureLocalPreviewDisplayUrl: y
          };
        }, void 0, import.meta.url),
        {
          localCacheManager: u
        } = await Ie(async () => {
          const {
            localCacheManager: f
          } = await Promise.resolve().then(() => Ha);
          return {
            localCacheManager: f
          };
        }, void 0, import.meta.url),
        h = async () => {
          var v;
          const f = (await l(t)) || (n ? await l(n) : null);
          if (f && !o(f)) return f;
          await u.ensureRestored();
          const y = n ? u.getAssetManifestMeta(n) : null;
          if (!!((v = y == null ? void 0 : y.mimeType) != null && v.startsWith("video/")) || /\.(mp4|webm|mov|m4v)(_|$|\?)/i.test((y == null ? void 0 : y.fileName) || "") || /(?:^|_)(?:vidu_|huya_video|video)/i.test(n) || /\.(mp4|webm|mov|m4v)(\?|$)/i.test(a) || /\/video/i.test(a)) return (n ? await u.getConvertFileSrcForAsset(n) : null) || "";
          if (!n) return "";
          if (u.isAvailable() && u.hasAsset(n)) {
            const _ = await d(n, {
              maxDim: wm,
              allowVideoOriginal: !0
            });
            if (_ && !o(_)) return _;
          }
          return "";
        };
      let p = await h();
      if (p) return p;
      const m = async (f, y) => {
        for (let b = 0; b < f; b++) {
          const v = await h();
          if (v) return v;
          await Id(), await new Promise(_ => setTimeout(_, y));
        }
        return "";
      };
      if (r != null && r.downloadAlreadyScheduled) return await m(48, 200);
      if (/^https?:\/\//i.test(a) && !s(a)) return await Xu(a, n), p = await h(), p || (await m(12, 120));
      if (a.startsWith("data:image") || a.startsWith("data:")) return n ? (await Xu(a, n), p = await h(), p || (await m(24, 150))) : a.startsWith("data:image/webp") && a.length < 2e5 ? a : "";
      if (s(a)) {
        const {
          isTauriLocalOriginalImageUrl: f
        } = await Ie(async () => {
          const {
            isTauriLocalOriginalImageUrl: y
          } = await Promise.resolve().then(() => So);
          return {
            isTauriLocalOriginalImageUrl: y
          };
        }, void 0, import.meta.url);
        return f(a) ? (p = await h(), p || "") : a;
      }
      if (a.startsWith("data:image/webp")) return a;
    } catch (l) {
      console.warn("[resolveGenResultSlotDisplayUrl] 本地模式落盘失败:", l);
    }
    return "";
  }
  try {
    const {
        persistGenResultPreviewThumbnail: l
      } = await Ie(async () => {
        const {
          persistGenResultPreviewThumbnail: u
        } = await Promise.resolve().then(() => ii);
        return {
          persistGenResultPreviewThumbnail: u
        };
      }, void 0, import.meta.url),
      d = await l(a, t, n);
    if (d) return d;
  } catch {}
  try {
    const l = await Vm(a, n);
    if (l) {
      const d = await i_(l, wm, $k);
      if (d) return URL.createObjectURL(d);
    }
  } catch {}
  return a.startsWith("data:image/webp") || a.startsWith("content_ref:") || a.startsWith("http") && /\/thumbnails\//i.test(a) ? a : "";
}

async function doo(e) {
  const {
      batchAccumulator: t,
      batchRemoteAccumulator: n,
      batchTaskIds: r,
      setHistory: a
    } = e,
    i = await new Promise(o => {
      a(s => (o(s), s));
    });
  for (let o = 0; o < r.length; o++) {
    if (t[o]) continue;
    const s = i.find(u => u.id === r[o]);
    if (!s || s.status !== "completed") continue;
    const l = typeof s.url == "string" && s.url.trim() || typeof s.thumbnailUrl == "string" && s.thumbnailUrl.trim() || (Array.isArray(s.mjImages) ? s.mjImages.find(u => typeof u == "string" && u.trim()) : "") || "";
    if (!l) continue;
    t[o] = l;
    const d = typeof s.originalUrl == "string" && s.originalUrl.trim() || typeof s._ossRemoteUrl == "string" && s._ossRemoteUrl.trim() || (typeof s.url == "string" && /^https?:\/\//i.test(s.url) ? s.url.trim() : "");
    d && (n[o] = d);
  }
}

async function uoo(e) {
  const {
      node: t,
      batchSize: n,
      batchAccumulator: r,
      batchRemoteAccumulator: a = [],
      batchTaskIds: i,
      primaryTaskId: o,
      currentModel: s,
      connections: l,
      nodes: d,
      nodesRef: u,
      connectionsRef: h,
      updateNode: p,
      nodesMap: m
    } = e,
    f = r.filter(P => P && P.length > 0),
    y = h.current ?? l,
    b = u.current ?? d,
    v = m ?? new Map(b.map(P => [P.id, P])),
    _ = v.get(t.id) || b.find(P => P.id === t.id) || t;
  if (f.length < n && (console.warn(`[Batch] ⚠️ 警告：预期 ${n} 张图片，实际只收集到 ${f.length} 张`), console.warn("[Batch] 缺失的索引:", r.map((P, R) => P ? null : R).filter(P => P !== null))), f.length === 0) {
    p(t.id, {
      isGenerating: !1,
      settings: {
        ..._.settings,
        isGenerating: !1
      }
    });
    return;
  }
  const w = f[f.length - 1],
    k = f.map((P, R) => `${i[R] || o}_mj_${R}`),
    A = f.map((P, R) => i[R] || o);
  let S = f;
  try {
    S = await Promise.all(f.map((P, R) => cz(P, k[R], A[R])));
  } catch (P) {
    console.warn("[Batch] 多图缩略图生成失败，回退空槽展示:", P);
  }
  const C = f.map((P, R) => ({
      id: `${i[R] || o}_batch_${R}`,
      thumbUrl: S[R] || "",
      fullUrl: a[R] || P,
      createdAt: Date.now(),
      assetId: A[R]
    })),
    I = S.map((P, R) => P || "");
  I.forEach((P, R) => {
    P && A[R] && Il(P, A[R]);
  });
  const E = I[I.length - 1] || w,
    M = kIe(_, {
      ..._,
      isGenerating: !1,
      content: E,
      settings: {
        ..._.settings,
        isGenerating: !1,
        progress: 100,
        error: null,
        generatedImages: C
      }
    });
  p(t.id, {
    isGenerating: !1,
    content: M.content,
    settings: M.settings
  });
  const T = aoo(_, y, b, v);
  if (T.length > 0 && t.type !== "storyboard-chart-node") {
    console.log(`[Batch] 最终更新 ${T.length} 个预览窗口，共 ${f.length} 张`);
    const P = A,
      R = a.some(B => !!B) ? a : void 0,
      j = I[I.length - 1] || w;
    for (const B of T) await fUt(B, j, "image", p, {
      previewMjImages: f.length > 1 ? I : void 0,
      previewMjAssetIds: f.length > 1 ? P : void 0,
      previewMjRemoteUrls: f.length > 1 ? R : void 0,
      selectedPreviewImage: j,
      sourceNodeName: _.nodeName,
      previewSourceModel: s,
      previewSourceNodeId: t.id
    }, b);
  } else f.length > 1 && console.log(`[Batch] 紧凑节点内嵌预览已同步 ${f.length} 张`);
}

function hoo(e) {
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

function woe(e) {
  const t = hoo(e);
  return t ? Math.max(t.w, t.h) <= wm + 48 : !1;
}

const poo = ["_mjAssetIds", "_mjPreviewAssetIds", "_contentAssetId", "_assetId", "_compactOriginalRelPath", _i, Pi, Cl, T0];

function sC(e, t) {
  const n = {
      ...e.settings
    },
    r = t.settings ?? {},
    a = {
      ...n,
      ...r,
      isGenerating: !1,
      progress: 100,
      error: null
    };
  if (t.content !== void 0) for (const s of poo) s in r || delete a[s];
  const i = {
      ...t,
      isGenerating: !1,
      errorMsg: void 0,
      settings: a
    },
    o = typeof a.previewActualSize == "string" && a.previewActualSize.trim() || "";
  return xX(e, i, o ? Hs(o) : null);
}

function moo(e, t) {
  const n = {
      ...(e.settings || {}),
      ...(t.settings || {})
    },
    r = Hs(n.previewActualSize) || Hs(n.previewSize) || Hs(n.imageSize);
  if (r) return r;
  const i = String(n.ratio || n.aspectRatio || "").trim().match(/^(\d+(?:\.\d+)?)\s*:\s*(\d+(?:\.\d+)?)$/);
  if (!i) return null;
  const o = Number(i[1]),
    s = Number(i[2]);
  return Number.isFinite(o) && Number.isFinite(s) && o > 0 && s > 0 ? {
    w: o,
    h: s
  } : null;
}

function F7(e, t, n) {
  const r = n ? Hs(n) : null;
  if (r) return xX(e, t, r);
  if ({
    ...(e.settings || {}),
    ...(t.settings || {})
  }.hasCustomSize === !0) return t;
  const i = moo(e, t);
  if (!i) return t;
  const {
    width: o,
    height: s
  } = kc(i.w, i.h);
  return z$(e.width || 0, e.height || 0, o, s, i.w, i.h) ? t : {
    ...t,
    width: o,
    height: s
  };
}

function foo(e, t) {
  const n = Hs(t),
    r = {
      previewActualSize: t,
      previewSize: t
    },
    a = {
      isGenerating: !1,
      settings: r
    },
    i = e.settings || {};
  if (!n || i.hasCustomSize === !0) return a;
  const {
    width: o,
    height: s
  } = kc(n.w, n.h);
  return z$(e.width || 0, e.height || 0, o, s, n.w, n.h) ? a : (r.hasCustomSize = void 0, r.savedNodeWidth = void 0, r.savedNodeHeight = void 0, {
    ...a,
    width: o,
    height: s
  });
}

function NSt(e, t, n) {
  const r = foo(t, n);
  return A4i(e, r), r;
}

async function X4(e) {
  const {
      isLikelyOssThumbnailPixelSize: t,
      formatImagePixelSizeLabel: n,
      probeHttpImageDimensions: r
    } = await Ie(async () => {
      const {
        isLikelyOssThumbnailPixelSize: s,
        formatImagePixelSizeLabel: l,
        probeHttpImageDimensions: d
      } = await Promise.resolve().then(() => ii);
      return {
        isLikelyOssThumbnailPixelSize: s,
        formatImagePixelSizeLabel: l,
        probeHttpImageDimensions: d
      };
    }, void 0, import.meta.url),
    a = s => {
      if (!(s != null && s.trim())) return;
      const l = s.trim();
      return woe(l) ? void 0 : l;
    };
  let i = a(e.extrasSize) || a(e.diskSizeLabel);
  if (i) return i;
  if (e.relPath) try {
    const s = await Vm("", null, e.relPath);
    if (s) {
      const l = await Rv(s);
      if (l.width > 0 && l.height > 0 && !t(l.width, l.height)) return n(l.width, l.height);
    }
  } catch {}
  if (e.contentAssetId) {
    try {
      const {
          readLocalOriginalAssetBlob: s
        } = await Ie(async () => {
          const {
            readLocalOriginalAssetBlob: d
          } = await Promise.resolve().then(() => Ui);
          return {
            readLocalOriginalAssetBlob: d
          };
        }, void 0, import.meta.url),
        l = await s(e.contentAssetId, e.remoteResultUrl);
      if (l != null && l.size) {
        const d = await Rv(l);
        if (d.width > 0 && d.height > 0 && !t(d.width, d.height)) return n(d.width, d.height);
      }
    } catch {}
    try {
      await ni.init();
      const s = await ni.getAssetBlob(e.contentAssetId);
      if (s) {
        const l = await Rv(s);
        if (l.width > 0 && l.height > 0 && !t(l.width, l.height)) return n(l.width, l.height);
      }
    } catch {}
  }
  const o = String(e.remoteResultUrl || "").trim();
  if (/^https?:\/\//i.test(o) && !ei()) {
    try {
      const s = await r(o);
      if (s && s.width > 0 && s.height > 0) return n(s.width, s.height);
    } catch {}
    try {
      const {
          getVideoMetadata: s
        } = await Ie(async () => {
          const {
            getVideoMetadata: d
          } = await Promise.resolve().then(() => pg);
          return {
            getVideoMetadata: d
          };
        }, void 0, import.meta.url),
        l = await s(o);
      if (l.w > 0 && l.h > 0) return n(l.w, l.h);
    } catch {}
  }
  if (e.displayBlob) {
    if (e.displayBlob.type.startsWith("video/")) try {
      const {
          getVideoMetadata: s
        } = await Ie(async () => {
          const {
            getVideoMetadata: d
          } = await Promise.resolve().then(() => pg);
          return {
            getVideoMetadata: d
          };
        }, void 0, import.meta.url),
        l = URL.createObjectURL(e.displayBlob);
      try {
        const d = await s(l);
        if (d.w > 0 && d.h > 0) return n(d.w, d.h);
      } finally {
        URL.revokeObjectURL(l);
      }
    } catch {}
    try {
      const s = await Rv(e.displayBlob);
      if (s.width > 0 && s.height > 0 && !t(s.width, s.height)) return n(s.width, s.height);
    } catch {}
  }
  return a(e.extrasSize) || a(e.diskSizeLabel);
}

async function Xmn(e, t) {
  let n = null;
  if (e.startsWith("blob:") || e.startsWith("data:")) try {
    n = await (await fetch(e)).blob();
  } catch {
    n = null;
  }
  if (n && n.type.startsWith("image/")) {
    const r = await Rv(n);
    if (r.width > 0 && r.height > 0 && Math.max(r.width, r.height) <= wm + 48 && t) {
      try {
        await ni.init();
        const i = await ni.getAssetBlob(t);
        if (i != null && i.size) return i;
      } catch {}
      try {
        const i = await Vm(e, t, null);
        if (i != null && i.size) return i;
      } catch {}
    }
  }
  return n;
}

async function goo(e, t, n, r, a, i, o) {
  var p, m, f;
  if (r = kJe(r, () => !GQ(e.id, n)), ((p = e.settings) == null ? void 0 : p.compactImageWidget) === !1 || e.type !== "gen-image") return;
  const s = ioo(o);
  el(r, e.id, !1);
  const d = ((a == null ? void 0 : a.current) ?? i ?? []).find(y => y.id === e.id) || e,
    u = {
      ...d.settings
    },
    h = typeof (o == null ? void 0 : o.previewActualSize) == "string" && o.previewActualSize.trim() ? o.previewActualSize.trim() : void 0;
  if (o != null && o.contentAssetId && (t.startsWith("blob:") || t.startsWith("data:"))) {
    if (typeof window < "u" && ("__TAURI__" in window || "__TAURI_INTERNALS__" in window)) try {
      const w = await Xmn(t, o.contentAssetId);
      if (!w) throw new Error("empty blob");
      const k = await bLe(w, e.id, n);
      if (k) {
        const A = u.model || "",
          S = await X4({
            extrasSize: h,
            diskSizeLabel: k.sizeLabel,
            relPath: k.relPath,
            contentAssetId: o.contentAssetId,
            remoteResultUrl: o.remoteResultUrl,
            displayBlob: w
          }),
          C = ((a == null ? void 0 : a.current) ?? i ?? []).find(I => I.id === e.id) || d;
        r(e.id, sC(C, {
          content: k.displayUrl,
          _contentAssetId: void 0,
          settings: {
            _compactOriginalRelPath: k.relPath,
            _contentAssetId: void 0,
            ...(S ? {
              previewActualSize: S,
              previewSize: S
            } : {}),
            ...(A ? {
              previewSourceModel: A
            } : {}),
            ...s
          }
        }));
        return;
      }
    } catch (w) {
      console.warn("[syncCompactGenImageNodeAfterGeneration] Tauri 落盘失败，回退 IDB", w);
    }
    const b = u.model || "";
    let v = h;
    if (!v && (t.startsWith("blob:") || t.startsWith("data:"))) try {
      const w = await Xmn(t, o.contentAssetId);
      w && (v = await X4({
        extrasSize: h,
        contentAssetId: o.contentAssetId,
        remoteResultUrl: o.remoteResultUrl,
        displayBlob: w
      }));
    } catch {}
    t.startsWith("blob:") && o.contentAssetId && Il(t, o.contentAssetId);
    const _ = ((a == null ? void 0 : a.current) ?? i ?? []).find(w => w.id === e.id) || d;
    r(e.id, sC(_, {
      content: t,
      _contentAssetId: o.contentAssetId,
      settings: {
        _contentAssetId: o.contentAssetId,
        _compactOriginalRelPath: void 0,
        ...(v ? {
          previewActualSize: v,
          previewSize: v
        } : {}),
        ...(b ? {
          previewSourceModel: b
        } : {}),
        ...s
      }
    }));
    return;
  }
  if (!t.startsWith("http://") && !t.startsWith("https://")) {
    const {
      contentStore: y
    } = await Ie(async () => {
      const {
        contentStore: v
      } = await Promise.resolve().then(() => Ly);
      return {
        contentStore: v
      };
    }, void 0, import.meta.url);
    if (y.isContentRef(t)) {
      try {
        await y.init();
        const v = y.extractId(t),
          _ = await y.get(v);
        if (_ && (_.startsWith("data:") || _.startsWith("blob:"))) {
          if (typeof window < "u" && ("__TAURI__" in window || "__TAURI_INTERNALS__" in window) && _.startsWith("data:")) {
            const C = await (await fetch(_)).blob(),
              I = await bLe(C, e.id, n);
            if (I) {
              const E = u.model || "",
                M = await X4({
                  extrasSize: h,
                  diskSizeLabel: I.sizeLabel,
                  relPath: I.relPath,
                  contentAssetId: o == null ? void 0 : o.contentAssetId,
                  remoteResultUrl: o == null ? void 0 : o.remoteResultUrl,
                  displayBlob: C
                }),
                T = ((a == null ? void 0 : a.current) ?? i ?? []).find(P => P.id === e.id) || d;
              r(e.id, sC(T, {
                content: I.displayUrl,
                _contentAssetId: o == null ? void 0 : o.contentAssetId,
                settings: {
                  _compactOriginalRelPath: I.relPath,
                  _contentAssetId: o == null ? void 0 : o.contentAssetId,
                  ...(M ? {
                    previewActualSize: M,
                    previewSize: M
                  } : {}),
                  ...(E ? {
                    previewSourceModel: E
                  } : {}),
                  ...s
                }
              })), I.displayUrl.startsWith("blob:") && (o != null && o.contentAssetId) && Il(I.displayUrl, o.contentAssetId);
              return;
            }
          }
          _.startsWith("blob:") && (o != null && o.contentAssetId) && Il(_, o.contentAssetId);
          const k = u.model || "",
            A = ((a == null ? void 0 : a.current) ?? i ?? []).find(S => S.id === e.id) || d;
          r(e.id, sC(A, {
            content: _,
            _contentAssetId: o == null ? void 0 : o.contentAssetId,
            settings: {
              _contentAssetId: o == null ? void 0 : o.contentAssetId,
              ...(h ? {
                previewActualSize: h,
                previewSize: h
              } : {}),
              ...(k ? {
                previewSourceModel: k
              } : {}),
              ...s
            }
          }));
          return;
        }
      } catch (v) {
        console.warn("[syncCompactGenImageNodeAfterGeneration] content_ref 解析失败:", v);
      }
      if (o != null && o.contentAssetId) try {
        const v = await Wd.getPreview(o.contentAssetId);
        if (v) {
          const _ = u.model || "",
            w = ((a == null ? void 0 : a.current) ?? i ?? []).find(k => k.id === e.id) || d;
          r(e.id, sC(w, {
            content: v,
            _contentAssetId: o.contentAssetId,
            settings: {
              _contentAssetId: o.contentAssetId,
              ...(h ? {
                previewActualSize: h,
                previewSize: h
              } : {}),
              ...(_ ? {
                previewSourceModel: _
              } : {}),
              ...s
            }
          }));
          return;
        }
      } catch {}
    }
    let b = h;
    if (!b && t && !y.isContentRef(t)) try {
      const _ = await (await fetch(t)).blob();
      b = await X4({
        extrasSize: h,
        contentAssetId: o == null ? void 0 : o.contentAssetId,
        remoteResultUrl: o == null ? void 0 : o.remoteResultUrl,
        displayBlob: _
      });
    } catch {}
    if (b) {
      const v = u.model || "",
        _ = ((a == null ? void 0 : a.current) ?? i ?? []).find(w => w.id === e.id) || d;
      r(e.id, sC(_, {
        settings: {
          previewActualSize: b,
          previewSize: b,
          ...(v ? {
            previewSourceModel: v
          } : {})
        }
      }));
    }
    return;
  }
  if (t.startsWith("http://") || t.startsWith("https://")) {
    const {
      isGlobalOssUploadEnabled: y,
      isOssPublicHttpUrl: b,
      OSS_REMOTE_URL_SETTING_KEY: v,
      OSS_THUMBNAIL_URL_SETTING_KEY: _,
      OSS_URL_ONLY_MODE_KEY: w,
      extractPreviewActualSizeFromOssSettings: k,
      resolveOssOriginalPreviewSizeLabel: A,
      normalizeOssPublicHttpUrl: S
    } = await Ie(async () => {
      const {
        isGlobalOssUploadEnabled: C,
        isOssPublicHttpUrl: I,
        OSS_REMOTE_URL_SETTING_KEY: E,
        OSS_THUMBNAIL_URL_SETTING_KEY: M,
        OSS_URL_ONLY_MODE_KEY: T,
        extractPreviewActualSizeFromOssSettings: P,
        resolveOssOriginalPreviewSizeLabel: R,
        normalizeOssPublicHttpUrl: j
      } = await Promise.resolve().then(() => ii);
      return {
        isGlobalOssUploadEnabled: C,
        isOssPublicHttpUrl: I,
        OSS_REMOTE_URL_SETTING_KEY: E,
        OSS_THUMBNAIL_URL_SETTING_KEY: M,
        OSS_URL_ONLY_MODE_KEY: T,
        extractPreviewActualSizeFromOssSettings: P,
        resolveOssOriginalPreviewSizeLabel: R,
        normalizeOssPublicHttpUrl: j
      };
    }, void 0, import.meta.url);
    if (y()) {
      const C = ((a == null ? void 0 : a.current) ?? i ?? []).find(M => M.id === e.id) || d,
        I = {
          ...C.settings
        };
      if (!!I[w] || b(t) || b(String(I[_] || "")) || b(String(I[v] || ""))) {
        const M = String(I[v] || "").trim() || (/\/thumbnails\//i.test(t) ? t.replace(/\/thumbnails\//i, "/images/") : t);
        let T = h;
        (!T || woe(T)) && (T = (await X4({
          remoteResultUrl: M
        })) || T), (!T || woe(T)) && (T = (await A(C, M, {
          preferRemoteProbe: !0
        })) || T);
        const P = typeof I[_] == "string" && String(I[_]).trim() || (/\/thumbnails\//i.test(t) ? t : "") || t,
          R = S(P) || t;
        r(e.id, sC(C, {
          content: R,
          _contentAssetId: void 0,
          settings: {
            ...(T ? {
              previewActualSize: T,
              previewSize: T
            } : {}),
            ...s
          }
        }));
        return;
      }
    }
  }
  try {
    const y = await OCn(t, e.id, n);
    if (y) {
      const A = await X4({
          extrasSize: h,
          diskSizeLabel: y.sizeLabel,
          relPath: y.relPath,
          contentAssetId: o == null ? void 0 : o.contentAssetId,
          remoteResultUrl: (o == null ? void 0 : o.remoteResultUrl) || t
        }),
        S = ((a == null ? void 0 : a.current) ?? i ?? []).find(I => I.id === e.id) || d,
        C = ((m = S.settings) == null ? void 0 : m.model) || "";
      r(e.id, sC(S, {
        content: y.displayUrl,
        _contentAssetId: void 0,
        settings: {
          _compactOriginalRelPath: y.relPath,
          _contentAssetId: void 0,
          ...(A ? {
            previewActualSize: A,
            previewSize: A
          } : {}),
          ...(C ? {
            previewSourceModel: C
          } : {}),
          ...s
        }
      }));
      return;
    }
    const b = `compact_gen_full_${e.id}_${n}_${Date.now()}`,
      v = await sk(t, b, void 0, {
        usePreviewQuality: !0
      }),
      _ = await X4({
        extrasSize: h,
        contentAssetId: b,
        remoteResultUrl: (o == null ? void 0 : o.remoteResultUrl) || t
      }),
      w = ((a == null ? void 0 : a.current) ?? i ?? []).find(A => A.id === e.id) || d,
      k = ((f = w.settings) == null ? void 0 : f.model) || "";
    v.startsWith("blob:") && Il(v, b), r(e.id, sC(w, {
      content: v,
      _contentAssetId: b,
      settings: {
        _contentAssetId: b,
        _compactOriginalRelPath: void 0,
        ...(_ ? {
          previewActualSize: _,
          previewSize: _
        } : {}),
        ...(k ? {
          previewSourceModel: k
        } : {}),
        ...s
      }
    }));
  } catch (y) {
    console.warn("[syncCompactGenImageNodeAfterGeneration]", y);
  } finally {
    el(r, e.id, !1);
    const y = ((a == null ? void 0 : a.current) ?? i ?? []).find(v => v.id === e.id),
      b = (y == null ? void 0 : y.settings) || {};
    y && (y.isGenerating === !0 || b.isGenerating === !0) && r(e.id, sC(y, {}));
  }
}

function yoo(e) {
  if (typeof e != "string") return;
  const t = e.trim().replace(/\*/g, "x").replace(/×/gi, "x").replace(/\s+/g, ""),
    n = /^(\d+)x(\d+)$/i.exec(t);
  if (!n) return;
  const r = Number(n[1]),
    a = Number(n[2]);
  if (!(!Number.isFinite(r) || !Number.isFinite(a) || r <= 0 || a <= 0)) return `${r}×${a}`;
}

async function qlt(e, t, n) {
  var o;
  const r = (n == null ? void 0 : n.slotKey) || "main",
    a = (o = n == null ? void 0 : n.contentAssetId) == null ? void 0 : o.trim();
  if (e.startsWith("http://") || e.startsWith("https://")) {
    if (ei() && a) try {
      const d = `${a}_preview_cb_${r}`,
        u = await cz(e, d, a);
      if (u) return {
        displayUrl: u,
        contentAssetId: a
      };
    } catch {}
    const s = a || `preview_${t}_${r}_${Date.now()}`;
    return {
      displayUrl: await sk(e, s, void 0, {
        usePreviewQuality: !0
      }),
      contentAssetId: s
    };
  }
  if (!e.startsWith("blob:") && !e.startsWith("data:")) return {
    displayUrl: e,
    contentAssetId: a
  };
  const i = a || `preview_${t}_${r}_${Date.now()}`;
  if (a) try {
    const s = await Wd.getPreview(a);
    if (s) return {
      displayUrl: s,
      contentAssetId: a
    };
  } catch {}
  try {
    let s = null;
    if (a && (await ni.init(), s = await ni.getAssetBlob(a)), !(s != null && s.size)) {
      const h = await fetch(e);
      h.ok && (s = await h.blob());
    }
    if (!(s != null && s.size) || !s.type.startsWith("image/")) return {
      displayUrl: e,
      contentAssetId: a
    };
    await ni.init();
    const l = a ? await ni.getAssetBlob(a) : null;
    a && !(l != null && l.size) && (await ni.saveBlobAsset(a, s, ""));
    const d = await i_(s, wm, $k),
      u = URL.createObjectURL(d);
    return Il(u, i), {
      displayUrl: u,
      contentAssetId: i
    };
  } catch (s) {
    return console.warn("[resolvePreviewCallbackDisplayUrl] 缩略图生成失败，回退原 URL:", s), {
      displayUrl: e,
      contentAssetId: a
    };
  }
}

async function fUt(e, t, n, r, a, i) {
  var o, s, l;
  if (!e) {
    console.log("[updateConnectedPreview] 没有预览节点ID，跳过");
    return;
  }
  console.log("[updateConnectedPreview] 开始更新预览节点:", {
    previewId: e,
    content: t == null ? void 0 : t.substring(0, 100),
    previewType: n,
    extraProps: a
  });
  try {
    const {
      isGlobalOssUploadEnabled: d,
      isOssPublicHttpUrl: u,
      normalizeOssPublicHttpUrl: h,
      probeHttpImageDimensions: p,
      OSS_REMOTE_URL_SETTING_KEY: m,
      OSS_THUMBNAIL_URL_SETTING_KEY: f,
      OSS_URL_ONLY_MODE_KEY: y,
      PREVIEW_MJ_OSS_REMOTE_URLS_KEY: b
    } = await Ie(async () => {
      const {
        isGlobalOssUploadEnabled: R,
        isOssPublicHttpUrl: j,
        normalizeOssPublicHttpUrl: B,
        probeHttpImageDimensions: F,
        OSS_REMOTE_URL_SETTING_KEY: N,
        OSS_THUMBNAIL_URL_SETTING_KEY: G,
        OSS_URL_ONLY_MODE_KEY: z,
        PREVIEW_MJ_OSS_REMOTE_URLS_KEY: V
      } = await Promise.resolve().then(() => ii);
      return {
        isGlobalOssUploadEnabled: R,
        isOssPublicHttpUrl: j,
        normalizeOssPublicHttpUrl: B,
        probeHttpImageDimensions: F,
        OSS_REMOTE_URL_SETTING_KEY: N,
        OSS_THUMBNAIL_URL_SETTING_KEY: G,
        OSS_URL_ONLY_MODE_KEY: z,
        PREVIEW_MJ_OSS_REMOTE_URLS_KEY: V
      };
    }, void 0, import.meta.url);
    if (n === "image" && t && d() && u(t)) {
      const R = h(t) || t,
        j = String((a == null ? void 0 : a.previewOssRemoteUrl) || "").trim(),
        B = u(j) ? h(j) || j : R,
        F = a != null && a.previewMjRemoteUrls && a.previewMjRemoteUrls.length > 0 ? a.previewMjRemoteUrls.map(V => V && u(V) && h(V) || V) : void 0;
      let N = a == null ? void 0 : a.previewActualSize;
      const G = (F == null ? void 0 : F.find(V => V && u(V))) || B;
      if (!N && G && u(G)) {
        const V = await p(G);
        V && (N = `${V.width}×${V.height}`);
      }
      const z = i == null ? void 0 : i.find(V => V.id === e);
      r(e, {
        content: R,
        previewType: n,
        _contentAssetId: void 0,
        previewMjImages: a != null && a.previewMjImages && a.previewMjImages.length > 0 ? a.previewMjImages.map(V => u(V) && h(V) || V) : void 0,
        selectedPreviewImage: a != null && a.selectedPreviewImage ? u(a.selectedPreviewImage) && h(a.selectedPreviewImage) || a.selectedPreviewImage : void 0,
        ...(a != null && a.sourceNodeName ? {
          nodeName: a.sourceNodeName
        } : {}),
        settings: {
          ...((z == null ? void 0 : z.settings) || {}),
          ...((a == null ? void 0 : a.previewSourceModel) != null ? {
            previewSourceModel: a.previewSourceModel
          } : {}),
          [y]: !0,
          [m]: B,
          [f]: R,
          ...(F ? {
            [b]: F
          } : {}),
          disableThumbnailCreationOnImport: !0,
          ...(N ? {
            previewActualSize: N,
            previewSize: N
          } : {}),
          ...((a == null ? void 0 : a.previewGridRows) != null && (a == null ? void 0 : a.previewGridCols) != null ? {
            previewGridRows: a.previewGridRows,
            previewGridCols: a.previewGridCols
          } : {}),
          ...((a == null ? void 0 : a.previewSourceNodeId) != null ? {
            previewSourceNodeId: a.previewSourceNodeId
          } : {}),
          ...((a == null ? void 0 : a.previewSourceNodeType) != null ? {
            previewSourceNodeType: a.previewSourceNodeType
          } : {})
        }
      }), console.log("[updateConnectedPreview] ✅ 全局 OSS 预览节点已更新", {
        display: R.slice(0, 72),
        remote: B.slice(0, 72)
      });
      return;
    }
    let v = t,
      _;
    const w = n === "image" && !!t && !!((o = a == null ? void 0 : a.previewMjImages) != null && o.some(R => R === t));
    if (t && n === "image" && !w) {
      const R = await qlt(t, e, {
        contentAssetId: a == null ? void 0 : a.contentAssetId,
        slotKey: "main"
      });
      v = R.displayUrl, _ = R.contentAssetId;
    } else if (t && n === "video" && (t.startsWith("http://") || t.startsWith("https://"))) {
      const R = (a == null ? void 0 : a.contentAssetId) || `preview_${e}_${Date.now()}`;
      try {
        const {
          isTauriAssetProtocolUrl: j,
          isCanvasLocalCacheMode: B
        } = await Ie(async () => {
          const {
            isTauriAssetProtocolUrl: F,
            isCanvasLocalCacheMode: N
          } = await Promise.resolve().then(() => So);
          return {
            isTauriAssetProtocolUrl: F,
            isCanvasLocalCacheMode: N
          };
        }, void 0, import.meta.url);
        if (j(t) || B()) v = t, _ = (a == null ? void 0 : a.contentAssetId) || R;else {
          const {
            assetStore: F
          } = await Ie(async () => {
            const {
              assetStore: G
            } = await Promise.resolve().then(() => Ri);
            return {
              assetStore: G
            };
          }, void 0, import.meta.url);
          await Xu(t, R, `preview_${e}.mp4`);
          const N = await F.getAssetUrl(R);
          N ? (v = N, _ = R) : (v = await sk(t, R), _ = R);
        }
      } catch (j) {
        console.warn("[updateConnectedPreview] 视频下载失败，回退远程 URL:", j), v = await sk(t, R), _ = v.startsWith("blob:") ? R : void 0;
      }
    } else if (t && (t.startsWith("http://") || t.startsWith("https://"))) {
      const {
        isTauriAssetProtocolUrl: R,
        isCanvasLocalCacheMode: j
      } = await Ie(async () => {
        const {
          isTauriAssetProtocolUrl: B,
          isCanvasLocalCacheMode: F
        } = await Promise.resolve().then(() => So);
        return {
          isTauriAssetProtocolUrl: B,
          isCanvasLocalCacheMode: F
        };
      }, void 0, import.meta.url);
      if (R(t) || j() && /asset\.(localhost|tauri\.localhost)/i.test(t)) v = t, _ = a == null ? void 0 : a.contentAssetId;else {
        const B = `preview_${e}_${Date.now()}`;
        v = await sk(t, B), _ = B;
      }
    }
    let k = a == null ? void 0 : a.previewMjImages;
    console.log("[updateConnectedPreview] 多图数量:", (k == null ? void 0 : k.length) || 0);
    let A;
    if (k && k.length > 0) {
      console.log("[updateConnectedPreview] 开始下载多图/多视频:", k);
      const R = (a == null ? void 0 : a.previewMjAssetIds) || [],
        j = k.map(async (F, N) => {
          const G = R[N];
          if (n === "image") {
            const z = await qlt(F, e, {
              contentAssetId: G,
              slotKey: `img${N}`
            });
            return {
              url: z.displayUrl,
              assetId: z.contentAssetId
            };
          }
          if (F && (F.startsWith("http://") || F.startsWith("https://"))) {
            await new Promise(V => setTimeout(V, N * 50));
            const z = G || `preview_${e}_img${N}_${Date.now()}`;
            return {
              url: await sk(F, z, void 0, {
                usePreviewQuality: !0
              }),
              assetId: z
            };
          }
          return {
            url: F,
            assetId: G
          };
        }),
        B = await Promise.all(j);
      if (k = B.map(F => F.url).filter(F => F != null), A = B.map(F => F.assetId), n === "image" && w) {
        const F = Math.max(0, ((s = a == null ? void 0 : a.previewMjImages) == null ? void 0 : s.findIndex(N => N === t)) ?? 0);
        v = k[F] || k[0] || t, _ = A[F] || A[0];
      }
      console.log("[updateConnectedPreview] 多图/多视频下载完成:", k);
    }
    let S = a == null ? void 0 : a.previewMjVideos;
    if (console.log("[updateConnectedPreview] 多视频数量:", (S == null ? void 0 : S.length) || 0), S && S.length > 0) {
      console.log("[updateConnectedPreview] 开始下载多视频:", S);
      const R = S.map(async (j, B) => {
        if (j && (j.startsWith("http://") || j.startsWith("https://"))) {
          await new Promise(N => setTimeout(N, B * 100));
          const F = `preview_${e}_video${B}_${Date.now()}`;
          return await sk(j, F);
        }
        return j;
      });
      S = await Promise.all(R), console.log("[updateConnectedPreview] 多视频下载完成:", S);
    }
    let C = a == null ? void 0 : a.selectedPreviewImage,
      I;
    const E = C && n === "image" ? ((a == null ? void 0 : a.previewMjImages) || []).findIndex(R => R === C) : -1;
    if (C && n === "image" && E >= 0 && (k != null && k[E])) C = k[E], I = A == null ? void 0 : A[E];else if (C && n === "image") {
      const R = ((l = a == null ? void 0 : a.previewMjAssetIds) == null ? void 0 : l[0]) || (a == null ? void 0 : a.contentAssetId),
        j = await qlt(C, e, {
          contentAssetId: R,
          slotKey: "selected"
        });
      C = j.displayUrl, I = j.contentAssetId;
    } else if (C && (C.startsWith("http://") || C.startsWith("https://"))) {
      const R = `preview_${e}_selected_${Date.now()}`;
      C = await sk(C, R, void 0, {
        usePreviewQuality: !0
      }), I = R;
    }
    let M = a == null ? void 0 : a.selectedPreviewVideo,
      T;
    if (M && (M.startsWith("http://") || M.startsWith("https://"))) {
      const R = `preview_${e}_selected_video_${Date.now()}`;
      M = await sk(M, R), T = R;
    }
    const P = {
      content: v,
      previewType: n,
      _contentAssetId: _,
      previewMjImages: k && k.length > 0 ? k : void 0,
      _previewMjAssetIds: A,
      selectedPreviewImage: C || void 0,
      _selectedImageAssetId: I,
      previewMjVideos: S && S.length > 0 ? S : void 0,
      selectedPreviewVideo: M || void 0,
      ...(T ? {
        _selectedVideoAssetId: T
      } : {})
    };
    if (a != null && a.sourceNodeName && (P.nodeName = a.sourceNodeName), (a == null ? void 0 : a.previewSourceModel) != null && i) {
      const R = i.find(j => j.id === e);
      P.settings = {
        ...((R == null ? void 0 : R.settings) || {}),
        previewSourceModel: a.previewSourceModel
      };
    }
    if ((a == null ? void 0 : a.previewActualSize) != null && i) {
      const R = i.find(j => j.id === e);
      P.settings = {
        ...(P.settings || {}),
        ...((R == null ? void 0 : R.settings) || {}),
        previewActualSize: a.previewActualSize
      };
    }
    if ((a == null ? void 0 : a.previewGridRows) != null && (a == null ? void 0 : a.previewGridCols) != null || (a == null ? void 0 : a.previewSourceNodeId) != null || (a == null ? void 0 : a.previewSourceNodeType) != null) {
      const R = i == null ? void 0 : i.find(j => j.id === e);
      P.settings = {
        ...(P.settings || {}),
        ...((R == null ? void 0 : R.settings) || {}),
        ...((a == null ? void 0 : a.previewGridRows) != null && (a == null ? void 0 : a.previewGridCols) != null ? {
          previewGridRows: a.previewGridRows,
          previewGridCols: a.previewGridCols
        } : {}),
        ...((a == null ? void 0 : a.previewSourceNodeId) != null ? {
          previewSourceNodeId: a.previewSourceNodeId
        } : {}),
        ...((a == null ? void 0 : a.previewSourceNodeType) != null ? {
          previewSourceNodeType: a.previewSourceNodeType
        } : {})
      };
    }
    if (a != null && a.previewMjRemoteUrls && a.previewMjRemoteUrls.length > 0) {
      const R = i == null ? void 0 : i.find(j => j.id === e);
      P.settings = {
        ...(P.settings || {}),
        ...((R == null ? void 0 : R.settings) || {}),
        [b]: a.previewMjRemoteUrls
      };
    }
    console.log("[updateConnectedPreview] 更新预览节点数据:", P), r(e, P), console.log("[updateConnectedPreview] ✅ 预览节点更新完成");
  } catch (d) {
    console.error("[updateConnectedPreview] ❌ 更新预览节点失败:", d), r(e, {
      content: t,
      previewType: n,
      previewMjImages: a != null && a.previewMjImages && a.previewMjImages.length > 0 ? a.previewMjImages : void 0,
      selectedPreviewImage: (a == null ? void 0 : a.selectedPreviewImage) || void 0,
      previewMjVideos: a != null && a.previewMjVideos && a.previewMjVideos.length > 0 ? a.previewMjVideos : void 0,
      selectedPreviewVideo: (a == null ? void 0 : a.selectedPreviewVideo) || void 0
    });
  }
}

async function jSt(e) {
  var b, v;
  const {
      node: t,
      taskId: n,
      content: r,
      previewType: a,
      connections: i,
      nodes: o,
      nodesRef: s,
      updateNode: l,
      initialPreviewId: d,
      extra: u
    } = e,
    h = kJe(l, () => !GQ(t.id, n)),
    p = (s == null ? void 0 : s.current) ?? o,
    m = p.find(_ => _.id === t.id) ?? t,
    f = Lpr({
      sourceNode: m,
      connections: i,
      nodes: p,
      initialPreviewId: d
    }),
    y = p;
  for (const _ of f) {
    if (r) {
      const w = y.find(k => k.id === _);
      h(_, {
        content: r,
        previewType: a,
        previewMjImages: (b = u == null ? void 0 : u.previewMjImages) != null && b.length ? u.previewMjImages : void 0,
        selectedPreviewImage: (u == null ? void 0 : u.selectedPreviewImage) || void 0,
        previewMjVideos: (v = u == null ? void 0 : u.previewMjVideos) != null && v.length ? u.previewMjVideos : void 0,
        selectedPreviewVideo: (u == null ? void 0 : u.selectedPreviewVideo) || void 0,
        ...(u != null && u.sourceNodeName ? {
          nodeName: u.sourceNodeName
        } : {}),
        ...((u == null ? void 0 : u.previewSourceModel) != null ? {
          settings: {
            ...((w == null ? void 0 : w.settings) ?? {}),
            previewSourceModel: u.previewSourceModel
          }
        } : {})
      });
    }
    await fUt(_, r, a, h, u, y);
  }
  for (const _ of f) try {
    rz(h, _, "previewGenerationEnded");
  } catch {}
  if (a === "image") {
    let _ = u == null ? void 0 : u.previewActualSize;
    const w = String((u == null ? void 0 : u.originalResultUrl) || (u == null ? void 0 : u.previewOssRemoteUrl) || "").trim() || (/^https?:\/\//i.test(r) ? r.trim() : "");
    if (!_ || woe(_)) {
      const k = y.find(C => C.id === t.id),
        {
          extractPreviewActualSizeFromOssSettings: A,
          resolveOssOriginalPreviewSizeLabel: S
        } = await Ie(async () => {
          const {
            extractPreviewActualSizeFromOssSettings: C,
            resolveOssOriginalPreviewSizeLabel: I
          } = await Promise.resolve().then(() => ii);
          return {
            extractPreviewActualSizeFromOssSettings: C,
            resolveOssOriginalPreviewSizeLabel: I
          };
        }, void 0, import.meta.url);
      _ = (await X4({
        contentAssetId: u == null ? void 0 : u.contentAssetId,
        remoteResultUrl: w
      })) || _, (!_ || woe(_)) && w && (_ = (await S(k ?? t, w, {
        preferRemoteProbe: !0
      })) || _), (!_ || woe(_)) && k && (_ = A(k.settings) || _);
    }
    await goo(t, r, n, h, s, o, {
      previewActualSize: _,
      contentAssetId: u == null ? void 0 : u.contentAssetId,
      remoteResultUrl: w || void 0,
      previewMjImages: u == null ? void 0 : u.previewMjImages
    });
  }
}

function DSt(e) {
  try {
    const [t, n] = e.split(","),
      r = t == null ? void 0 : t.match(/data:([^;]+)/),
      a = (r == null ? void 0 : r[1]) || "image/jpeg",
      i = atob(n || ""),
      o = new Uint8Array(i.length);
    for (let s = 0; s < i.length; s++) o[s] = i.charCodeAt(s);
    return new Blob([o], {
      type: a
    });
  } catch {
    return null;
  }
}

async function boo(e) {
  var n;
  if (e.startsWith("data:image")) {
    const a = await (await fetch(e)).blob();
    return a.type.startsWith("image/") ? a : null;
  }
  if (!e.startsWith("http://") && !e.startsWith("https://")) return null;
  const t = typeof window < "u" && ("__TAURI__" in window || "__TAURI_INTERNALS__" in window);
  try {
    if (t) {
      const {
          downloadWithFallback: i
        } = await Ie(async () => {
          const {
            downloadWithFallback: d
          } = await Promise.resolve().then(() => El);
          return {
            downloadWithFallback: d
          };
        }, void 0, import.meta.url),
        o = await i(e, 12e4);
      if ((n = o.type) != null && n.startsWith("image/")) return o;
      const s = e.toLowerCase(),
        l = s.includes(".png") ? "image/png" : s.includes(".webp") ? "image/webp" : s.includes(".gif") ? "image/gif" : "image/jpeg";
      return new Blob([await o.arrayBuffer()], {
        type: l
      });
    }
    const r = await fetch(e);
    if (!r.ok) return null;
    const a = await r.blob();
    return a.type.startsWith("image/") ? a : null;
  } catch {
    return null;
  }
}

function M$e(e, t, n) {
  !t || !t.startsWith("data:image") && !t.startsWith("http") || n(r => {
    const a = r.find(i => i.id === e);
    return a != null && a._globalOssUrlOnly || Ie(async () => {
      const {
        historyItemSkipsLocalAssetRestore: i
      } = await Promise.resolve().then(() => ii);
      return {
        historyItemSkipsLocalAssetRestore: i
      };
    }, void 0, import.meta.url).then(({
      historyItemSkipsLocalAssetRestore: i
    }) => {
      a && i(a) || Ie(async () => {
        const {
          isGlobalOssUploadEnabled: o
        } = await Promise.resolve().then(() => Ah);
        return {
          isGlobalOssUploadEnabled: o
        };
      }, void 0, import.meta.url).then(({
        isGlobalOssUploadEnabled: o
      }) => {
        o() && a && !a._assetId || voo(e, t, n);
      });
    }), r;
  });
}

function gUt(e, t, n, r) {
  Ie(async () => {
    const {
      scheduleHistoryVideoPosterSave: a
    } = await Promise.resolve().then(() => EUt);
    return {
      scheduleHistoryVideoPosterSave: a
    };
  }, void 0, import.meta.url).then(({
    scheduleHistoryVideoPosterSave: a
  }) => {
    a(e, t, {
      ...(n ? {
        assetId: n
      } : {}),
      ...(r ? {
        remotePlayUrl: r
      } : {})
    });
  });
}

function voo(e, t, n) {
  !t || !t.startsWith("data:image") && !t.startsWith("http") || (async () => {
    try {
      const r = await qVe.run(async () => t.startsWith("http://") || t.startsWith("https://") ? boo(t) : t.startsWith("data:image") ? DSt(t) : null);
      if (!r || !r.size) return;
      const {
          buildListPreviewFileFromBlob: a
        } = await Ie(async () => {
          const {
            buildListPreviewFileFromBlob: s
          } = await Promise.resolve().then(() => ii);
          return {
            buildListPreviewFileFromBlob: s
          };
        }, void 0, import.meta.url),
        {
          runLocalPreviewWork: i
        } = await Ie(async () => {
          const {
            runLocalPreviewWork: s
          } = await Promise.resolve().then(() => CTr);
          return {
            runLocalPreviewWork: s
          };
        }, void 0, import.meta.url),
        o = await i(async () => {
          const s = await a(r, `history-${e}`),
            l = await new Promise((u, h) => {
              const p = new FileReader();
              p.onload = () => u(String(p.result || "")), p.onerror = () => h(p.error), p.readAsDataURL(s);
            }),
            {
              localCacheManager: d
            } = await Ie(async () => {
              const {
                localCacheManager: u
              } = await Promise.resolve().then(() => Ha);
              return {
                localCacheManager: u
              };
            }, void 0, import.meta.url);
          d.isAvailable() && (await d.saveThumbnail(e, l, "preview"));
          try {
            const {
              thumbnailStore: u
            } = await Ie(async () => {
              const {
                thumbnailStore: h
              } = await Promise.resolve().then(() => Y$);
              return {
                thumbnailStore: h
              };
            }, void 0, import.meta.url);
            await u.storePreviewOnly(e, l);
          } catch {}
          return await ni.saveBlobAsset(`${e}_thumbnail`, s, ""), ni.getAssetUrl(`${e}_thumbnail`);
        });
      o && n(s => s.map(l => l.id === e ? {
        ...l,
        thumbnailUrl: o,
        _thumbnailAssetId: `${e}_thumbnail`
      } : l));
    } catch (r) {
      console.warn("[Generation] 缩略图保存失败:", r);
    } finally {
      try {
        const {
          scheduleHistoryOssAutoUpload: r
        } = await Ie(async () => {
          const {
            scheduleHistoryOssAutoUpload: a
          } = await Promise.resolve().then(() => qh);
          return {
            scheduleHistoryOssAutoUpload: a
          };
        }, void 0, import.meta.url);
        r(e, [e]);
      } catch (r) {
        console.warn("[Generation] 触发历史云端自动上传失败:", r);
      }
    }
  })();
}

