const vyn = ({
    label: e,
    value: t,
    options: n,
    isDark: r,
    mutedClass: a,
    onChange: i
  }) => {
    var u;
    on();
    const o = g.useRef(null),
      [s, l] = g.useState(!1),
      d = ((u = n.find(h => h.value === t)) == null ? void 0 : u.label) || t;
    return c.jsxs("div", {
      children: [c.jsx("span", {
        className: a,
        children: e
      }), c.jsxs("button", {
        ref: o,
        type: "button",
        onClick: h => {
          h.stopPropagation(), l(p => !p);
        },
        onMouseDown: h => h.stopPropagation(),
        className: `mt-1 flex w-full items-center justify-between gap-2 rounded-[12px] border px-2 py-1.5 text-left text-xs ${r ? "border-white/20 text-white" : "border-zinc-300 text-zinc-900"}`,
        children: [c.jsx("span", {
          className: "truncate",
          children: d
        }), c.jsx(Mi, {
          size: 12,
          className: "shrink-0 opacity-70"
        })]
      }), c.jsx(m1, {
        open: s,
        anchorRef: o,
        isDark: r,
        menuWidth: 220,
        maxHeight: 280,
        scrollKey: t,
        children: n.map(h => c.jsx("button", {
          type: "button",
          onClick: p => {
            p.stopPropagation(), i(h.value), l(!1);
          },
          className: axo(r, h.value === t),
          children: c.jsx("span", {
            className: "truncate",
            children: x(h.label)
          })
        }, h.value || "none"))
      })]
    });
  },
  ixo = ({
    node: e,
    isDark: t,
    view: n,
    updateNode: r,
    apiConfigs: a,
    globalApiKey: i = "",
    generate: o,
    connections: s = [],
    nodes: l = [],
    setConnections: d,
    setSelectedNodeId: u,
    setSelectedNodeIds: h,
    enableGenerationNodeAnimation: p = !0,
    onStartCompactRefCanvasPick: m,
    compactRefCanvasPickTargetId: f = null
  }) => {
    var pa, Br, tn, Lr, br, Jr, Kr, ir, Hr, ha, Ga, Za, va, Kt, Pr, kr, Mr, Hn, $t, je, Qe, Mt, cn, Qn, Lt, ct, Dt, bn, Rt, fn, Zt, Ln, tt, zt, an, Rn, Un, er, Cr, tr, kn, xn, Fn, cr, vr, Wt, Jt, Nn, En, Zn, Sr, Bn, Et, zn, Mn, or, mr, Yr, aa, wa, xa, Aa;
    on();
    const y = f === e.id,
      b = g.useCallback(() => {
        m == null || m(e.id, "default");
      }, [e.id, m]),
      v = g.useRef(null),
      _ = g.useRef(null),
      w = g.useRef(null),
      k = g.useRef(null),
      A = g.useRef(null),
      S = g.useRef(null),
      C = g.useRef(null),
      I = g.useRef(null),
      E = g.useRef(null),
      M = g.useRef(null),
      T = g.useRef(null),
      P = g.useRef(null),
      R = g.useRef(null),
      j = g.useRef(null),
      B = g.useRef(new Map()),
      [F, N] = g.useState(null),
      [G, z] = g.useState(null),
      [V, O] = g.useState(!1),
      [L, D] = g.useState(!1),
      [U, H] = g.useState(!1),
      [Y, K] = g.useState(!1),
      [W, Q] = g.useState(!1),
      [q, ne] = g.useState(null),
      de = g.useRef(q);
    de.current = q;
    const [le, J] = g.useState(null),
      pe = g.useRef(null),
      ce = g.useRef(null),
      we = g.useRef(null),
      X = g.useCallback(() => {
        const pn = R.current;
        pn && (window.removeEventListener("mousemove", pn.move), window.removeEventListener("mouseup", pn.up), R.current = null, P.current = null);
      }, []),
      [Z, re] = g.useState(e.prompt || ""),
      [fe, ye] = g.useState(!1),
      [ie, ae] = g.useState(() => {
        var pn, xr;
        return !!(((pn = e.settings) == null ? void 0 : pn.speechComposerOpen) ?? ((xr = e.settings) == null ? void 0 : xr.speechPromptOpen));
      }),
      be = !!((pa = e.settings) != null && pa.speechPromptExpanded);
    g.useEffect(() => {
      var pn, xr;
      ae(!!(((pn = e.settings) == null ? void 0 : pn.speechComposerOpen) ?? ((xr = e.settings) == null ? void 0 : xr.speechPromptOpen)));
    }, [(Br = e.settings) == null ? void 0 : Br.speechComposerOpen, (tn = e.settings) == null ? void 0 : tn.speechPromptOpen]);
    const Ee = dEe(n, ie),
      xe = Number(Ee.zoom || 1),
      he = eZ(xe),
      ue = g.useRef(null),
      ge = yI({
        hostRef: ue,
        open: ie && !f,
        zoom: Ee.zoom,
        remeasureKey: `${Math.round(Ee.x)}:${Math.round(Ee.y)}:${be ? 1 : 0}`
      }),
      _e = g.useRef(null),
      ke = g.useMemo(() => ({
        transition: "none"
      }), []);
    Qp(_e, "50% 0%", ie);
    const ve = g.useCallback(pn => {
        pn.stopPropagation();
        const xr = pn.currentTarget.querySelector('[data-scrollable="true"]');
        if (!xr) return;
        const Nr = xr.scrollHeight - xr.clientHeight;
        Nr <= 0 || (pn.preventDefault(), xr.scrollTop = Math.max(0, Math.min(Nr, xr.scrollTop + pn.deltaY)));
      }, []),
      {
        connectedUpstreamTextNodes: Te,
        connectedAgentNodes: Ne
      } = g.useMemo(() => {
        const pn = yJe(e.id, s, l);
        return {
          connectedUpstreamTextNodes: pn.textNodes,
          connectedAgentNodes: pn.agentNodes
        };
      }, [s, l, e.id]),
      Ae = g.useMemo(() => {
        const pn = new Map(l.map(qr => [qr.id, qr])),
          xr = [],
          Nr = new Set();
        for (const qr of s) {
          if (qr.to !== e.id || qr.inputType && qr.inputType !== "default" && qr.inputType !== "veo_start" && qr.inputType !== "veo_end" || Nr.has(qr.from)) continue;
          const Oa = pn.get(qr.from);
          if (Oa) {
            if (Oa.type === "text-node" || Oa.type === "novel-input") {
              Nr.add(Oa.id);
              const Fa = RJ(pn.get(Oa.id) || Oa);
              Fa && xr.push(Fa);
            } else if (Oa.type === "custom-agent") {
              Nr.add(Oa.id);
              const Fa = gJe(pn.get(Oa.id) || Oa);
              Fa && xr.push(Fa);
            }
          }
        }
        return xr.join(`

`);
      }, [s, l, e.id]).trim(),
      Fe = (e.prompt || Z).trim(),
      Re = !(!!Fe && !Y4(Fe) && (!Ae || Fe !== Ae)) && (Te.length > 0 || Ne.length > 0);
    g.useEffect(() => {
      Ae || ye(!1);
    }, [Ae]);
    const $e = fe && !!Ae,
      rt = $e ? Ae : Re ? "" : Z,
      nt = Ae.length > 0,
      ze = g.useCallback((pn, xr) => {
        xr == null || xr.preventDefault(), xr == null || xr.stopPropagation();
        const Nr = String(pn || "").trim();
        !Nr || !d || d(qr => qr.filter(Oa => !(Oa.to === e.id && Oa.from === Nr)));
      }, [e.id, d]),
      Le = g.useMemo(() => zke(Fe, Ae, nt), [Fe, Ae, nt]),
      Ke = g.useMemo(() => {
        const pn = new Set();
        return a.filter(xr => {
          if (xr.type !== "Speech" || Qxe.includes(xr.id)) return !1;
          const Nr = Cv(xr.id) || pb(xr.id) || O1(xr.id) || B1(xr.id) || F1(xr.id) || ub(xr.id) ? xr.id : px(xr.id);
          return pn.has(Nr) ? !1 : (pn.add(Nr), !0);
        });
      }, [a]),
      Xe = $Tt((Lr = e.settings) == null ? void 0 : Lr.speechTaskMode),
      De = !!((br = e.settings) != null && br.speechAudioCropMode),
      Ye = typeof ((Jr = e.settings) == null ? void 0 : Jr.speechAudioPlaybackRate) == "number" ? e.settings.speechAudioPlaybackRate : 1,
      Ce = g.useMemo(() => Ke.filter(pn => !oE(pn.id)), [Ke]),
      He = ((Kr = e.settings) == null ? void 0 : Kr.model) || ((ir = Ce[0]) == null ? void 0 : ir.id) || "speech-2.6-hd",
      nativeSpeechModel = window.__AIYOUPLUS_CANVAS_MODEL_ADAPTER__?.getMediaModel(He),
      nativeSpeech = nativeSpeechModel?.type === 'Speech' ? nativeSpeechModel : null,
      nativeSpeechVoices = Array.isArray(nativeSpeech?.voices) ? nativeSpeech.voices.filter(id => typeof id === 'string' && id.trim()) : [],
      nativeSpeechDefaultVoice = typeof nativeSpeech?.defaultVoice === 'string' && (!nativeSpeechVoices.length || nativeSpeechVoices.includes(nativeSpeech.defaultVoice)) ? nativeSpeech.defaultVoice : '',
      nativeSpeechMinimax = nativeSpeech?.nativeService === 'minimax' && (!nativeSpeech.genericProtocol || nativeSpeech.genericProtocol === 'minimax-native'),
      nativeSpeechSupports = key => !nativeSpeech || nativeSpeechMinimax || Object.hasOwn(nativeSpeech.parameters || {}, key) || Object.hasOwn(nativeSpeech.parameterSchema || {}, key) && nativeSpeech.parameterSchema[key]?.mapped !== false,
      nativeSpeechHasParameters = ['speed', 'volume', 'pitch', 'emotion'].some(nativeSpeechSupports),
      Ve = Cv(He),
      it = pb(He),
      It = O1(He),
      Ft = B1(He),
      We = F1(He),
      Ze = Ft || We,
      Ge = ub(He),
      Oe = iPn(He),
      st = r8t(He),
      vt = a8t(He),
      Ht = eQ(He),
      nn = TU(He),
      pt = !!nativeSpeech || Ve || it || It || Ze || Ht,
      lt = !pt && !st && !vt && !nn,
      gt = pt || Ge || nn ? String(He).trim() : px(He),
      Ut = nn ? "voice-clone" : pt ? "tts" : Ge ? EOe(He, Xe) : Xe === "voice-design" ? "tts" : Xe,
      _t = nativeSpeech ? (nativeSpeechVoices.includes(e.settings?.voiceId) ? e.settings.voiceId : nativeSpeechDefaultVoice) : ((Hr = e.settings) == null ? void 0 : Hr.voiceId) || (eQ(He) ? "" : "male-qn-qingse"),
      At = ((ha = e.settings) == null ? void 0 : ha.audioUrl) || e.content || "",
      qe = o9(e.id) || !!(e.isGenerating || (Ga = e.settings) != null && Ga.isGenerating),
      kt = qe,
      St = MF(e.errorMsg || ((Za = e.settings) == null ? void 0 : Za.error) || ""),
      hn = Le.length,
      Qt = DWe(_t),
      Ot = ((va = Iqt.find(pn => pn.id === Qt)) == null ? void 0 : va.name) || "默认",
      ln = ETt(_t),
      Pn = ((Kt = Cqt.find(pn => pn.id === ln)) == null ? void 0 : Kt.name) || ln,
      rn = TTt((Pr = e.settings) == null ? void 0 : Pr.qwenTtsLanguage),
      Yn = ((kr = Eqt.find(pn => pn.id === rn)) == null ? void 0 : kr.name) || "自动",
      Ct = YK(_t),
      Cn = ((Mr = rtt.find(pn => pn.id === Ct)) == null ? void 0 : Mr.name) || Ct,
      un = NTt((Hn = e.settings) == null ? void 0 : Hn.geminiTtsLanguage),
      Jn = (($t = Tqt.find(pn => pn.id === un)) == null ? void 0 : $t.name) || "自动",
      Kn = OWe((je = e.settings) == null ? void 0 : je.geminiTtsStyleInstructions),
      en = bOe((Qe = e.settings) == null ? void 0 : Qe.geminiTtsTemperature),
      Vn = LWe((Mt = e.settings) == null ? void 0 : Mt.geminiTtsOutputFormat),
      Tt = ((cn = Mqt.find(pn => pn.id === Vn)) == null ? void 0 : cn.name) || "MP3",
      Ue = We ? vOe((Qn = e.settings) == null ? void 0 : Qn.geminiTtsSpeakers) : Array.isArray((Lt = e.settings) == null ? void 0 : Lt.geminiTtsSpeakers) ? e.settings.geminiTtsSpeakers.map(pn => ({
        speaker_id: String((pn == null ? void 0 : pn.speaker_id) || ""),
        voice: YK(pn == null ? void 0 : pn.voice)
      })) : [],
      et = Ve ? yce : nn ? nve : Ge ? Txe(He) : wft,
      ft = g.useMemo(() => Ht ? hIe() : [], [Ht, (ct = e.settings) == null ? void 0 : ct.speechClonedVoiceId]),
      ht = (Dt = ft.find(pn => pn.id === _t)) == null ? void 0 : Dt.name,
      wt = nativeSpeech ? {name: _t, gradient: "from-emerald-600 to-teal-800"} : Ht ? {
        name: ht || _t || "选择音色",
        gradient: "from-emerald-600 to-teal-800"
      } : rxo(_t, Ge),
      jt = o8t((bn = e.settings) == null ? void 0 : bn.speechDesignPreviewText),
      bt = ((Rt = e.settings) == null ? void 0 : Rt.emotion) || "",
      Bt = ((fn = e.settings) == null ? void 0 : fn.speechCloneSourceName) || "",
      wn = ((Zt = e.settings) == null ? void 0 : Zt.speechCloneVoiceId) || "",
      at = WDn((Ln = e.settings) == null ? void 0 : Ln.seedAudioFormat),
      Pt = qDn((tt = e.settings) == null ? void 0 : tt.seedAudioSampleRate),
      dt = PRe((zt = e.settings) == null ? void 0 : zt.seedAudioSpeechRate),
      xt = RRe((an = e.settings) == null ? void 0 : an.seedAudioLoudnessRate),
      yn = NRe((Rn = e.settings) == null ? void 0 : Rn.seedAudioPitchRate),
      gn = g.useMemo(() => {
        var Fa, Ra, ui;
        if (!Ve && !it) return [];
        const pn = [];
        for (const pr of s) {
          if (pr.to !== e.id || pr.inputType && pr.inputType !== "default") continue;
          const In = l.find(fr => fr.id === pr.from);
          if (In) {
            if (In.type === "gen-music" || In.type === "gen-speech") {
              const fr = ((Fa = In.settings) == null ? void 0 : Fa.audioUrl) || (typeof In.content == "string" ? In.content.trim() : "");
              if (!fr) continue;
              pn.push({
                imgSrc: fr,
                referenceThumbSrc: fr,
                isResolvingLocalRef: !1,
                mediaType: "audio",
                sourceNode: In
              });
            } else if (In.type === "input-image") {
              if (PRt(In)) {
                const fr = ((Ra = In.settings) == null ? void 0 : Ra.audioUrl) || (typeof In.content == "string" ? In.content.trim() : "");
                if (!fr) continue;
                pn.push({
                  imgSrc: fr,
                  referenceThumbSrc: fr,
                  isResolvingLocalRef: !1,
                  mediaType: "audio",
                  sourceNode: In
                });
              } else {
                const fr = Vv(In);
                if (!fr) continue;
                pn.push({
                  imgSrc: fr,
                  referenceThumbSrc: fr,
                  isResolvingLocalRef: !1,
                  mediaType: "image",
                  sourceNode: In
                });
              }
            } else if (In.type === "gen-image") {
              const fr = Xl(In),
                na = V$(In, "image") || "",
                Ba = (na && !/\/thumbnails\//i.test(na) ? na : "") || (fr == null ? void 0 : fr.url) || (typeof In.content == "string" ? In.content.trim() : "");
              if (!Ba) continue;
              pn.push({
                imgSrc: Ba,
                refAssetId: fr == null ? void 0 : fr.assetId,
                referenceThumbSrc: Ba,
                isResolvingLocalRef: !1,
                mediaType: "image",
                sourceNode: In
              });
            } else if (In.type === "preview") {
              const fr = In.selectedPreviewImage || ((ui = In.previewMjImages) == null ? void 0 : ui[0]) || (typeof In.content == "string" ? In.content.trim() : "");
              if (!fr) continue;
              ((In.previewType === "audio" || In.previewType === "video") && In.previewType === "audio" ? "audio" : "image") === "audio" ? pn.push({
                imgSrc: fr,
                referenceThumbSrc: fr,
                isResolvingLocalRef: !1,
                mediaType: "audio",
                sourceNode: In
              }) : pn.push({
                imgSrc: fr,
                referenceThumbSrc: fr,
                isResolvingLocalRef: !1,
                mediaType: "image",
                sourceNode: In
              });
            }
          }
        }
        if (it) return pn.filter(pr => pr.mediaType === "audio").slice(0, 1);
        const xr = pn.filter(pr => pr.mediaType === "image").slice(0, 1),
          Nr = pn.filter(pr => pr.mediaType === "audio").slice(0, 3),
          qr = new Set(xr.map(pr => pr.imgSrc)),
          Oa = new Set(Nr.map(pr => pr.imgSrc));
        return pn.filter(pr => pr.mediaType === "image" ? qr.has(pr.imgSrc) : Oa.has(pr.imgSrc));
      }, [s, l, e.id, Ve, it]),
      mt = g.useMemo(() => {
        var Fa, Ra, ui;
        const pn = ((Fa = e.settings) == null ? void 0 : Fa.model) || "speech-2.6-hd",
          xr = Cv(pn) || pb(pn) || O1(pn) || B1(pn) || F1(pn) || ub(pn) ? String(pn).trim() : oE(pn) ? "speech-2.6-hd" : px(pn),
          Nr = a.find(pr => pr.id === xr) || (!Cv(xr) && !pb(xr) && !O1(xr) && !B1(xr) && !F1(xr) && !ub(xr) ? a.find(pr => px(pr.id) === xr) : void 0) || a.find(pr => pr.type === "Speech"),
          qr = ((Nr == null ? void 0 : Nr.url) || (tT(xr) ? "https://art.huya.info/openapi/v1/generate/audio" : "https://ai.comfly.org")).replace(/\/+$/, ""),
          Oa = cu(Nr == null ? void 0 : Nr.key, i, (Ra = e.settings) == null ? void 0 : Ra.savedApiKeyId, {
            platformGroup: (ui = e.settings) == null ? void 0 : ui.platformGroup,
            modelName: (Nr == null ? void 0 : Nr.modelName) || xr,
            modelId: xr,
            baseUrl: qr,
            modelSavedApiKeyId: Nr == null ? void 0 : Nr.savedApiKeyId
          });
        return {
          baseUrl: qr,
          apiKey: Oa,
          modelId: xr,
          modelName: Nr == null ? void 0 : Nr.modelName,
          config: Nr
        };
      }, [a, i, (Un = e.settings) == null ? void 0 : Un.model, (er = e.settings) == null ? void 0 : er.platformGroup, (Cr = e.settings) == null ? void 0 : Cr.savedApiKeyId, Ut]),
      Xt = g.useCallback(() => {
        const pn = j.current;
        pn && (pn.pause(), pn.currentTime = 0), z(null);
      }, []);
    g.useEffect(() => () => {
      Xt(), B.current.forEach(pn => {
        pn.startsWith("blob:") && URL.revokeObjectURL(pn);
      });
    }, [Xt]);
    const Gn = g.useCallback(async pn => {
        if (G === pn) {
          Xt();
          return;
        }
        if (Xt(), !mt.apiKey) {
          alert(x("请先配置 API Key"));
          return;
        }
        N(pn);
        try {
          let xr = B.current.get(pn);
          xr || (xr = Ge ? await dUr({
            baseUrl: mt.baseUrl,
            apiKey: mt.apiKey,
            modelId: mt.modelId,
            voice: pn
          }) : We ? await nzr({
            baseUrl: mt.baseUrl,
            apiKey: mt.apiKey,
            modelId: mt.modelId,
            voice: pn,
            styleInstructions: Kn
          }) : Ft ? await ZFr({
            baseUrl: mt.baseUrl,
            apiKey: mt.apiKey,
            voice: pn,
            language: un,
            styleInstructions: Kn
          }) : It ? await VFr({
            baseUrl: mt.baseUrl,
            apiKey: mt.apiKey,
            voice: pn,
            language: rn
          }) : it ? await OFr({
            baseUrl: mt.baseUrl,
            apiKey: mt.apiKey,
            voice: pn
          }) : await Uzr({
            baseUrl: mt.baseUrl,
            apiKey: mt.apiKey,
            modelId: mt.modelId,
            modelName: mt.modelName,
            voiceId: pn
          }), B.current.set(pn, xr));
          const Nr = j.current || new Audio();
          j.current = Nr, Nr.onended = () => z(null), Nr.onerror = () => z(null), Nr.src = xr, await Nr.play(), z(pn);
        } catch (xr) {
          alert(x(MF(xr)));
        } finally {
          N(null);
        }
      }, [Ft, We, un, Kn, it, Ge, It, rn, mt, Xt, G]),
      rr = (le == null ? void 0 : le.nodeId) === e.id && le.type === "audio-model",
      qn = (le == null ? void 0 : le.nodeId) === e.id && le.type === "audio-scene",
      Dn = (le == null ? void 0 : le.nodeId) === e.id && le.type === "speech-task",
      Ar = (le == null ? void 0 : le.nodeId) === e.id && le.type === "speech-voice",
      _r = (le == null ? void 0 : le.nodeId) === e.id && le.type === "speech-language",
      Pa = (le == null ? void 0 : le.nodeId) === e.id && le.type === "speech-settings";
    g.useEffect(() => {
      var pn, xr, Nr;
      if (!Pa) {
        D(!1), H(!1), K(!1), Q(!1), ne(null);
        return;
      }
      Ve && ne({
        speech: PRe((pn = e.settings) == null ? void 0 : pn.seedAudioSpeechRate),
        loudness: RRe((xr = e.settings) == null ? void 0 : xr.seedAudioLoudnessRate),
        pitch: NRe((Nr = e.settings) == null ? void 0 : Nr.seedAudioPitchRate)
      });
    }, [Pa, Ve]);
    const fa = g.useMemo(() => nativeSpeech ? nativeSpeechVoices.map(id => ({id, name: id, gradient: "from-emerald-600 to-teal-800"})) : Ht ? ft.map(pn => ({
        id: pn.id,
        name: pn.name,
        gradient: "from-emerald-600 to-teal-800"
      })) : Ge ? [...n8t] : [...xOe], [ft, Ht, Ge, nativeSpeechVoices]),
      Ca = g.useMemo(() => Oe ? [...byn, nxo] : byn, [Oe]),
      $n = g.useCallback(pn => {
        r(e.id, {
          settings: pn
        });
      }, [e.id, r]),
      yr = g.useCallback(pn => {
        ae(pn), Dd(e.id, pn), $n({
          speechComposerOpen: pn,
          speechPromptOpen: pn
        }), pn || J(xr => (xr == null ? void 0 : xr.nodeId) === e.id ? null : xr);
      }, [e.id, $n, J]),
      [Ir, Gr] = g.useState(!1);
    g.useEffect(() => {
      if (!ie) {
        Gr(!1);
        return;
      }
      let pn = !1;
      return Id().then(() => {
        pn || Gr(!0);
      }), () => {
        pn = !0;
      };
    }, [ie]), g.useEffect(() => () => {
      Dd(e.id, !1);
    }, [e.id]);
    const Zr = g.useCallback(pn => {
        pn.focus({
          preventScroll: !0
        });
        const xr = pn.value.length;
        try {
          pn.setSelectionRange(xr, xr);
        } catch {}
      }, []),
      La = g.useRef(!1),
      sa = g.useCallback((pn = !1) => {
        zb(e.id, u, h, 500, {
          forceSingle: pn
        });
      }, [e.id, u, h]),
      Ea = g.useCallback(() => {
        sa(!0), yr(!0), La.current = !0;
      }, [sa, yr]);
    g.useLayoutEffect(() => {
      if (!ie || !La.current) return;
      let pn = !1,
        xr = 0;
      const Nr = () => {
        if (pn) return;
        const qr = I.current;
        if (!qr) {
          xr++ < 8 && requestAnimationFrame(Nr);
          return;
        }
        La.current = !1, Zr(qr);
      };
      return Nr(), () => {
        pn = !0;
      };
    }, [ie, Zr]), g.useEffect(() => {
      const pn = e.prompt || "";
      I.current && I.current.value !== pn && (I.current.value = pn, re(pn));
    }, [e.prompt]), g.useEffect(() => {
      const pn = Ae,
        xr = (e.prompt || "").trim();
      !pn || !xr || !E1e(xr, pn) || (re(""), r(e.id, {
        prompt: ""
      }));
    }, [e.id, e.prompt, Ae, r]), g.useEffect(() => {
      if (!ie) return;
      const pn = xr => {
        var qr;
        const Nr = xr.target;
        Nr && (y || (qr = v.current) != null && qr.contains(Nr) || Nr.closest(".node-dropdown-menu") || Nr.closest(".node-dropdown-button") || Nr.closest("[data-model-select-area]") || Nr.closest("[data-gen-node-portal-dropdown]") || Nr.closest("[data-speech-external-composer]") || (yr(!1), (le == null ? void 0 : le.nodeId) === e.id && J(null)));
      };
      return window.addEventListener("pointerdown", pn, !0), () => window.removeEventListener("pointerdown", pn, !0);
    }, [ie, le == null ? void 0 : le.nodeId, e.id, yr, J, y]), g.useEffect(() => {
      if (!rr && !qn && !Dn && !Ar && !_r && !Pa && !L && !U && !Y && !W) return;
      const pn = xr => {
        const Nr = xr.target;
        Nr && (Nr.closest(".node-dropdown-menu") || Nr.closest(".node-dropdown-button") || Nr.closest("[data-model-select-area]") || Nr.closest("[data-gen-node-portal-dropdown]") || Nr.closest("[data-speech-external-composer]") || Nr.closest("[data-speech-emotion-picker]") || Nr.closest("[data-speech-seed-audio-settings]") || (J(null), D(!1), H(!1), K(!1), Q(!1)));
      };
      return window.addEventListener("pointerdown", pn, !0), () => window.removeEventListener("pointerdown", pn, !0);
    }, [rr, qn, Dn, Ar, _r, Pa, L, U, Y, W, J]), g.useEffect(() => {
      var qr, Oa, Fa, Ra, ui, pr, In;
      const pn = (qr = e.settings) == null ? void 0 : qr.speechTaskMode,
        xr = (Oa = e.settings) == null ? void 0 : Oa.model,
        Nr = {};
      if (nativeSpeech && !nativeSpeechVoices.includes(e.settings?.voiceId) && e.settings?.voiceId !== (nativeSpeechDefaultVoice || undefined)) Nr.voiceId = nativeSpeechDefaultVoice || undefined;
      if (nativeSpeech && pn !== 'tts') Nr.speechTaskMode = 'tts';
      if ((pn === "music" || pn === "sfx") && (Nr.speechTaskMode = "tts"), xr && oE(xr) && (Nr.model = "speech-2.6-hd"), xr && (Cv(xr) || pb(xr) || O1(xr) || B1(xr) || F1(xr)) && (pn === "voice-clone" || pn === "voice-design") && (Nr.speechTaskMode = "tts"), xr && ub(xr)) {
        const fr = EOe(xr, pn);
        pn !== fr && (Nr.speechTaskMode = fr);
      } else pn === "voice-design" && (Nr.speechTaskMode = "tts");
      xr === "kling-voice-clone-huya" && (Nr.model = "speech-2.6-hd", Nr.speechTaskMode = "tts"), xr && TU(xr) && pn !== "voice-clone" && (Nr.speechTaskMode = "voice-clone"), xr && eQ(xr) && pn && pn !== "tts" && (Nr.speechTaskMode = "tts"), xr && Cv(xr) && (((Fa = e.settings) == null ? void 0 : Fa.seedAudioFormat) == null && (Nr.seedAudioFormat = "wav"), ((Ra = e.settings) == null ? void 0 : Ra.seedAudioSampleRate) == null && (Nr.seedAudioSampleRate = 24e3), ((ui = e.settings) == null ? void 0 : ui.seedAudioSpeechRate) == null && (Nr.seedAudioSpeechRate = 0), ((pr = e.settings) == null ? void 0 : pr.seedAudioLoudnessRate) == null && (Nr.seedAudioLoudnessRate = 0), ((In = e.settings) == null ? void 0 : In.seedAudioPitchRate) == null && (Nr.seedAudioPitchRate = 0)), Object.keys(Nr).length > 0 && $n(Nr);
    }, [nativeSpeech, e.settings?.voiceId, (tr = e.settings) == null ? void 0 : tr.speechTaskMode, (kn = e.settings) == null ? void 0 : kn.model, (xn = e.settings) == null ? void 0 : xn.seedAudioFormat, (Fn = e.settings) == null ? void 0 : Fn.seedAudioSampleRate, (cr = e.settings) == null ? void 0 : cr.seedAudioSpeechRate, (vr = e.settings) == null ? void 0 : vr.seedAudioLoudnessRate, (Wt = e.settings) == null ? void 0 : Wt.seedAudioPitchRate, $n]);
    const ba = pn => {
        if (pt) {
          J(null);
          return;
        }
        const xr = {
          speechTaskMode: pn
        };
        pn === "voice-clone" && !UTt(gt) && !HWe(gt) && (xr.model = "speech-2.6-hd"), !(pn === "voice-design" && !oPn(gt)) && (oE(gt) && (xr.model = "speech-2.6-hd"), $n(xr), J(null));
      },
      ga = async pn => {
        var Ra;
        if (!pn) return;
        let xr;
        try {
          xr = Hbe(pn, pn.name), await KMn(xr, xr.name);
        } catch (ui) {
          alert(x(MF(ui)));
          return;
        }
        const Nr = Gbe(),
          qr = `speech_clone_src_${e.id}`,
          Oa = (Number((Ra = e.settings) == null ? void 0 : Ra.speechCloneSourceRevision) || 0) + 1,
          Fa = {
            speechCloneSourceName: xr.name,
            speechCloneVoiceId: Nr,
            speechClonedVoiceId: void 0,
            speechClonedSourceRevision: void 0,
            speechCloneFileId: void 0,
            speechCloneSourceUrl: void 0,
            speechCloneSourceData: void 0,
            speechCloneSourceAssetId: qr,
            speechCloneSourceRevision: Oa
          };
        $n(Fa);
        try {
          await ni.deleteAsset(qr);
          const ui = `speech-clone://${e.id}/${Oa}/${xr.size}/${xr.name}`;
          if (!(await ni.saveBlobAsset(qr, xr, ui, fbe))) throw new Error("本地缓存写入失败");
        } catch {
          const ui = new FileReader();
          ui.onload = () => {
            $n({
              ...Fa,
              speechCloneSourceAssetId: void 0,
              speechCloneSourceData: String(ui.result || "")
            });
          }, ui.readAsDataURL(xr), alert(x("本地缓存写入失败，已改用内存暂存（生成时将重新上传）"));
          return;
        }
        if (mt.apiKey && !ub(mt.modelId) && !y3(mt.modelId)) try {
          const ui = await lRe({
            baseUrl: mt.baseUrl,
            apiKey: mt.apiKey,
            file: xr,
            filename: xr.name,
            purpose: "voice_clone"
          });
          $n({
            speechCloneFileId: ui
          });
        } catch (ui) {
          alert(x("远端预上传失败，生成时将使用本地缓存重新上传：{0}", MF(ui)));
        }
      },
      _a = g.useCallback(pn => {
        if (pn.button !== 0) return;
        sa(), At && O(!0);
        const xr = pn.target;
        if (xr.closest("[data-audio-strip-interactive]") || xr.closest("[data-input-image-audio-toolbar]") || xr.closest("[data-gen-node-portal-dropdown]") || xr.closest("[data-speech-external-composer]")) return;
        X(), P.current = {
          x: pn.clientX,
          y: pn.clientY
        };
        const Nr = Oa => {
            const Fa = P.current;
            Fa && Math.hypot(Oa.clientX - Fa.x, Oa.clientY - Fa.y) > PPe && (P.current = null);
          },
          qr = Oa => {
            const Fa = P.current;
            X(), Fa && (Math.hypot(Oa.clientX - Fa.x, Oa.clientY - Fa.y) > PPe || Ea());
          };
        R.current = {
          move: Nr,
          up: qr
        }, window.addEventListener("mousemove", Nr), window.addEventListener("mouseup", qr);
      }, [At, X, Ea, sa]);
    g.useEffect(() => {
      const pn = xr => {
        var qr;
        const Nr = xr.target;
        Nr && ((qr = v.current) != null && qr.contains(Nr) || O(!1));
      };
      return document.addEventListener("mousedown", pn), () => document.removeEventListener("mousedown", pn);
    }, []);
    const $a = g.useCallback(async () => {
        if (!At) return;
        const pn = dM(e, At, {
            mediaType: "audio"
          }),
          xr = await p9(e, 0, void 0, "mp3", pn);
        (await VLt(pn, xr)) ? Ai("success", "音频已开始下载（MP3）", 5e3) : Ai("error", "音频下载失败，请重试");
      }, [At, e]),
      Ya = g.useCallback((pn, xr) => {
        const Nr = URL.createObjectURL(pn);
        (e.nodeName || Z.trim() || "speech").replace(/\.[^/.]+$/, ""), $n({
          audioUrl: Nr,
          speechAudioFormat: xr
        }), r(e.id, {
          content: Nr,
          settings: {
            ...e.settings,
            audioUrl: Nr,
            speechAudioFormat: xr
          }
        }), Ai("success", `已转换为 ${xr}`);
      }, [e.id, e.nodeName, e.settings, $n, Z, r]),
      ta = g.useCallback(pn => {
        const xr = URL.createObjectURL(pn);
        $n({
          speechAudioCropMode: !1,
          audioUrl: xr
        }), r(e.id, {
          content: xr,
          settings: {
            ...e.settings,
            speechAudioCropMode: !1,
            audioUrl: xr
          }
        });
      }, [e.id, e.settings, $n, r]);
    g.useEffect(() => () => X(), [X]);
    const ki = pn => {
        pn.length > et || (re(pn), r(e.id, {
          prompt: pn
        }));
      },
      Wn = pn => {
        var Oa, Fa, Ra, ui, pr;
        pn.stopPropagation();
        const xr = (l == null ? void 0 : l.find(In => In.id === e.id)) ?? e;
        if (Ve) {
          if (!Le) {
            alert(x("请输入音频提示词，或连接文字节点"));
            return;
          }
        } else if (It) {
          if (!Le) {
            alert(x("请输入要转换为语音的文本，或连接文字节点"));
            return;
          }
        } else if (Ze) {
          if (!Le) {
            alert(x("请输入要转换为语音的文本，或连接文字节点"));
            return;
          }
        } else if (it) {
          if (!gn.some(fr => fr.mediaType === "audio") && !Le) {
            alert(x("请输入要朗读的文本，或连接一段用户语音"));
            return;
          }
        } else if (nn || Ut === "voice-clone") {
          if (!!!((Oa = xr.settings) != null && Oa.speechCloneSourceAssetId || (Fa = xr.settings) != null && Fa.speechCloneSourceData || (Ra = xr.settings) != null && Ra.speechCloneSourceUrl || (ui = xr.settings) != null && ui.speechCloneFileId)) {
            alert(x("请先上传要复刻的音频（10秒–5分钟）"));
            return;
          }
          if (!Le) {
            alert(x(nn ? "请输入试听文本（1000 字以内）" : "请输入试听预览文本"));
            return;
          }
          if (nn && Le.length > nve) {
            alert(x("试听文本不能超过 {0} 字", nve));
            return;
          }
        } else if (Ht) {
          if (!Le) {
            alert(x("请输入要转换为语音的文本，或连接文字节点"));
            return;
          }
          if (!String(((pr = xr.settings) == null ? void 0 : pr.voiceId) || "").trim()) {
            alert(x("请选择或填写音色 ID。可先用海艺 MiniMax 音色克隆创建"));
            return;
          }
        } else if (Ut === "voice-design") {
          if (!Le) {
            alert(x("请输入音色描述"));
            return;
          }
        } else if (!Le) {
          alert(x("请输入要转换为语音的文本，或连接文字节点"));
          return;
        }
        hu(xr.id, !0);
        const Nr = f5(xr) ? $6(xr) : null,
          qr = {
            ...((Nr == null ? void 0 : Nr.settings) ?? xr.settings),
            isGenerating: !0,
            progress: 0,
            error: null
          };
        r(xr.id, {
          ...(Nr ? {
            content: Nr.content,
            previewType: Nr.previewType,
            errorMsg: Nr.errorMsg
          } : {}),
          isGenerating: !0,
          errorMsg: void 0,
          settings: qr
        }), o == null || o({
          ...xr,
          ...(Nr ? {
            content: Nr.content,
            previewType: Nr.previewType,
            errorMsg: Nr.errorMsg
          } : {}),
          isGenerating: !0,
          settings: qr
        });
      },
      wr = t ? "text-zinc-400" : "text-zinc-500",
      jn = g.useMemo(() => {
        var pn, xr, Nr, qr, Oa;
        return kt ? !1 : It || Ze ? !!Le : it ? !!Le || gn.some(Fa => Fa.mediaType === "audio") : Ht ? !!Le && !!String(((pn = e.settings) == null ? void 0 : pn.voiceId) || "").trim() : Ut === "voice-clone" ? !!((xr = e.settings) != null && xr.speechCloneSourceAssetId || (Nr = e.settings) != null && Nr.speechCloneSourceData || (qr = e.settings) != null && qr.speechCloneSourceUrl || (Oa = e.settings) != null && Oa.speechCloneFileId) && !!Le : !!Le;
      }, [kt, it, Ht, It, Ze, gn, Ut, Le, e.settings]),
      _n = t ? "node-dropdown-button bg-transparent hover:bg-white/5 text-white border-white/30" : "node-dropdown-button bg-transparent hover:bg-black/5 text-gray-900 border-gray-300",
      {
        scrollContainerRef: ar,
        wrapperClass: Vt,
        wrapperStyle: vn,
        onShellTransitionEnd: An,
        armHeightTransition: ur,
        showExpandControl: zr,
        textareaScrollClass: Dr,
        isOverflowing: Wr,
        measureExpandedMaxHeight: gr
      } = n1r({
        textareaRef: I,
        value: rt,
        expanded: be,
        collapsedHeightPx: yyn,
        remeasureKey: `${Math.round(Ee.x)}:${Math.round(Ee.y)}:${Ee.zoom}:${he}:${Ut}-${rt.length}-${ie}-${qe}`
      }),
      jr = `relative block w-full min-w-0 min-h-full resize-none bg-transparent p-2 text-sm leading-6 outline-none whitespace-pre-wrap break-words ${Dr} ${t ? "text-zinc-100 placeholder-zinc-500" : "text-zinc-900 placeholder-zinc-400"}`,
      ea = zr ? c.jsx(kUt, {
        expanded: be,
        isDark: t,
        onToggle: () => {
          const pn = !be;
          ur(), $n({
            speechPromptExpanded: pn
          }), pn && window.requestAnimationFrame(() => {
            window.requestAnimationFrame(gr);
          });
        }
      }) : null;
    return c.jsxs("div", {
      ref: v,
      className: "relative h-full w-full overflow-visible pointer-events-none bg-transparent",
      children: [At && V ? c.jsx("div", {
        className: "pointer-events-auto absolute left-1/2 z-[120] -translate-x-1/2",
        "data-gen-speech-audio-toolbar-wrap": !0,
        style: {
          top: `-${mQe}px`
        },
        onMouseDown: pn => pn.stopPropagation(),
        children: c.jsx(eOt, {
          isDark: t,
          node: e,
          audioUrl: At,
          playbackRate: Ye,
          onPlaybackRateChange: pn => $n({
            speechAudioPlaybackRate: pn
          }),
          onCropClick: () => $n({
            speechAudioCropMode: !0
          }),
          onFormatConverted: Ya,
          onDownload: () => {
            $a();
          }
        })
      }) : null, c.jsxs("div", {
        ref: _,
        "data-aux-gen-preview": !0,
        className: `pointer-events-auto relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl ${At ? "p-0" : "p-3"}`,
        onMouseDown: _a,
        children: [kt ? c.jsx("div", {
          "data-aux-gen-progress-layer": !0,
          className: "absolute inset-0 z-30 overflow-hidden pointer-events-none rounded-2xl",
          "aria-hidden": !0,
          children: c.jsx(Yv, {
            seed: e.id,
            isDark: t,
            label: x("合成中…")
          })
        }) : null, c.jsxs("div", {
          className: "relative flex flex-1 min-h-0 w-full flex-col",
          children: [c.jsx("div", {
            className: `relative flex flex-1 min-h-0 w-full flex-col items-center justify-center ${At ? "" : "select-none"}`,
            children: kt ? null : St && !At ? c.jsxs("div", {
              className: "z-[6] px-3 text-center pointer-events-none",
              children: [c.jsx("div", {
                className: "mb-1 text-xs font-medium text-red-400",
                children: x("合成失败")
              }), c.jsx("div", {
                className: "max-h-full overflow-y-auto text-[11px] leading-relaxed text-red-400/90 whitespace-pre-wrap break-words scrollbar-hide",
                children: St
              })]
            }) : At ? De ? c.jsx(tOt, {
              audioUrl: At,
              isDark: t,
              onCancel: () => $n({
                speechAudioCropMode: !1
              }),
              onConfirm: ta
            }) : c.jsx(CXe, {
              playbackId: e.id,
              audioUrl: At,
              isDark: t,
              className: "h-full min-h-[72px]",
              playbackRate: Ye,
              formatLabel: yQe(At, e.prompt, (Jt = e.settings) == null ? void 0 : Jt.speechAudioFormat)
            }) : c.jsx("div", {
              className: "flex items-end gap-0.5 h-6 opacity-30 pointer-events-none",
              children: [3, 6, 4, 8, 5, 7, 3, 6, 4].map((pn, xr) => c.jsx("div", {
                className: `w-0.5 rounded-full ${t ? "bg-white/50" : "bg-zinc-500"}`,
                style: {
                  height: `${pn * 3}px`
                }
              }, xr))
            })
          }), De ? null : c.jsx("div", {
            "data-gen-speech-preview-overlay": !0,
            className: `absolute inset-0 z-10 ${At ? "pointer-events-none" : "pointer-events-auto cursor-grab active:cursor-grabbing"}`,
            onMouseDown: At ? void 0 : pn => {
              if (pn.button !== 0) return;
              sa(), X();
              const xr = {
                x: pn.clientX,
                y: pn.clientY
              };
              P.current = xr;
              const Nr = Oa => {
                  const Fa = P.current;
                  Fa && Math.hypot(Oa.clientX - Fa.x, Oa.clientY - Fa.y) > PPe && (P.current = null);
                },
                qr = Oa => {
                  X(), Math.hypot(Oa.clientX - xr.x, Oa.clientY - xr.y) <= PPe && Ea();
                };
              R.current = {
                move: Nr,
                up: qr
              }, window.addEventListener("mousemove", Nr), window.addEventListener("mouseup", qr);
            },
            onDoubleClick: pn => {
              pn.stopPropagation(), pn.preventDefault(), X(), Ea();
            }
          })]
        })]
      }), ie ? c.jsx("div", {
        ref: ue,
        "data-gen-prompt-panel-host": !0,
        "data-gen-prompt-panel": "true",
        "data-floating-placement": ge.offset.placement,
        "data-speech-external-composer": !0,
        className: `${M5t}${f ? " hidden" : ""}`,
        style: {
          ...zVe,
          ...ge.style
        },
        onMouseDown: pn => {
          sa(), pn.stopPropagation();
        },
        onWheel: ve,
        children: c.jsx("div", {
          "data-qiaodoumayi-aux-composer": "speech",
          "data-gen-prompt-panel": "true",
          ref: _e,
          className: `qiaodoumayi-aux-gen-composer gen-prompt-panel-enter ${P5t} overflow-hidden ${t ? `${W4e} text-zinc-100` : `${q4e} text-zinc-900`}`,
          style: ke,
          children: Ir ? c.jsxs(c.Fragment, {
            children: [c.jsx(FUt, {
              isDark: t,
              node: e,
              currentModel: Ve || it ? gt : "",
              activeReferenceStripRows: gn,
              genReferenceStripThumbs: {},
              forceShowStrip: !0,
              genPromptExpandControl: ea,
              hasTextEditData: !1,
              hasMoveObjectData: !1,
              lightingNodeCount: 0,
              lightingPromptSummary: "",
              markersFeedback: {
                hasMarkers: !1,
                markerDescriptions: []
              },
              isSeedanceLikeMaterialsModel: !1,
              seedanceMaterialsCount: 0,
              seedanceMaterialInputRef: M,
              seedanceReplaceIndexRef: T,
              onReorderImages: () => {},
              onRemoveImage: pn => {
                var qr;
                const xr = gn.find(Oa => Oa.imgSrc === pn),
                  Nr = (qr = xr == null ? void 0 : xr.sourceNode) == null ? void 0 : qr.id;
                !Nr || !d || ze(Nr);
              },
              onUpdatePrompt: pn => {
                ki(pn), I.current && I.current.value !== pn && (I.current.value = pn), re(pn);
              },
              onOpenSeedanceMaterialLightbox: () => {},
              onSetSeedanceReplaceMenu: () => {},
              upstreamTextNodes: Te,
              upstreamAgentNodes: Ne,
              showUpstreamTextPreview: fe,
              onToggleUpstreamTextPreview: () => ye(pn => !pn),
              onRemoveUpstreamNode: d ? ze : void 0,
              onAddFromCanvas: b,
              canvasPickActive: y
            }), c.jsx("div", {
              className: `qiaodoumayi-aux-prompt-group ${R5t}`,
              children: c.jsx("div", {
                className: `qiaodoumayi-aux-prompt-inner ${N5t}`,
                children: c.jsx(e1r, {
                  wrapperClass: Vt,
                  wrapperStyle: vn,
                  onTransitionEnd: An,
                  scrollContainerRef: ar,
                  showExpandButton: !1,
                  isOverflowing: Wr,
                  expandButton: ea,
                  children: c.jsx("textarea", {
                    ref: I,
                    "data-node-type": "gen-speech",
                    "data-node-id": e.id,
                    "data-prompt-editor-area": "true",
                    value: rt,
                    readOnly: $e,
                    onChange: pn => {
                      $e || ki(pn.target.value);
                    },
                    onMouseDown: pn => {
                      pn.stopPropagation();
                    },
                    onPointerDown: pn => pn.stopPropagation(),
                    placeholder: Re ? x("文字由上游节点提供，可在此补充额外内容") : We ? x("输入要转换为语音的文本，可用 <laugh> <sigh>。双人对话先添加两个说话人，再按「说话人: 台词」分行") : Ze ? x("输入要转换为语音的文本，可用 [laughing] [sigh] 等标签控制语气") : It ? x("输入要转换为语音的文本") : it ? x("输入要朗读的文本；连上用户语音后则做语音对话") : Ve ? x("输入提示词；可连线或粘贴图片/音频参考（参考条可同时显示；生成时图与音频互斥，有音频优先；音频用 @音频1）") : Ht ? x("输入待转换文本，可插入 (laughs) (sighs) 等语气词") : nn ? x("输入试听文本，克隆后的音色会朗读这段内容（1000 字以内）") : Ut === "voice-clone" ? x("输入试听预览文本（复刻后将用此文本合成）") : Ut === "voice-design" ? x("描述想要的音色，例如：年轻活泼的女声，略带气音，热情开朗") : Oe && String(He).includes("2.8") ? x("输入文本；可用 <#0.1#> 停顿，(laughs)(sighs) 等语气标签") : Oe && String(He).includes("2.6") ? x("输入文本；段落换行，可用 <#0.1#> 插入停顿") : x("输入文本将其转换为富有表现力的语音"),
                    className: jr
                  })
                })
              })
            }), c.jsxs("div", {
              "data-node-header-toolbar": !0,
              className: "qiaodoumayi-aux-gen-toolbar mt-2 flex h-14 min-w-0 flex-nowrap items-center gap-1.5 overflow-visible",
              children: [c.jsx(t1r, {
                node: e,
                isDark: t,
                apiConfigs: a,
                updateNode: r,
                disabled: kt,
                activeDropdown: le,
                setActiveDropdown: J,
                dropdownBtnClass: _n
              }), lt ? c.jsxs(c.Fragment, {
                children: [c.jsx("div", {
                  className: `h-4 w-px shrink-0 ${t ? "bg-white/15" : "bg-zinc-300"}`
                }), c.jsxs("div", {
                  className: "relative shrink-0",
                  "data-model-select-area": !0,
                  children: [c.jsxs("button", {
                    ref: w,
                    type: "button",
                    onClick: pn => {
                      pn.stopPropagation(), J(Dn ? null : {
                        nodeId: e.id,
                        type: "speech-task"
                      });
                    },
                    onMouseDown: pn => pn.stopPropagation(),
                    className: `${_n} flex items-center gap-1 rounded border px-2 py-1 text-[10px]`,
                    children: [Ut === "voice-clone" ? c.jsx(lTn, {
                      size: 12,
                      className: "shrink-0"
                    }) : Ut === "voice-design" ? c.jsx(EP, {
                      size: 12,
                      className: "shrink-0"
                    }) : c.jsx(Q2, {
                      size: 12,
                      className: "shrink-0"
                    }), c.jsx("span", {
                      className: "max-w-[72px] truncate",
                      children: ((Nn = Ca.find(pn => pn.id === Ut)) == null ? void 0 : Nn.label) || x("文字转语音")
                    })]
                  }), c.jsx(m1, {
                    open: Dn,
                    anchorRef: w,
                    isDark: t,
                    menuWidth: 260,
                    children: Ca.map(pn => c.jsxs("button", {
                      type: "button",
                      onClick: xr => {
                        xr.stopPropagation(), ba(pn.id);
                      },
                      className: txo(t, pn.id === Ut),
                      children: [c.jsx("span", {
                        className: `mt-0.5 rounded p-1 ${t ? "bg-[#1f1f1f]" : "bg-zinc-100"}`,
                        children: pn.icon
                      }), c.jsxs("span", {
                        className: "min-w-0 flex-1",
                        children: [c.jsx("div", {
                          className: "text-xs font-medium",
                          children: x(pn.label)
                        }), c.jsx("div", {
                          className: `text-[10px] ${t ? "text-white/60" : "text-zinc-500"}`,
                          children: pn.desc
                        })]
                      }), pn.id === Ut ? c.jsx(io, {
                        size: 12,
                        className: "ml-auto shrink-0 text-green-500"
                      }) : null]
                    }, pn.id))
                  })]
                })]
              }) : null, Ve ? c.jsxs(c.Fragment, {
                children: [c.jsx("div", {
                  className: `h-4 w-px shrink-0 ${t ? "bg-white/15" : "bg-zinc-300"}`
                }), c.jsxs("div", {
                  className: "relative shrink-0",
                  "data-model-select-area": !0,
                  children: [c.jsx("button", {
                    ref: S,
                    type: "button",
                    title: x("Seed Audio 参数"),
                    onClick: pn => {
                      pn.stopPropagation(), H(!1), K(!1), J(Pa ? null : {
                        nodeId: e.id,
                        type: "speech-settings"
                      });
                    },
                    onMouseDown: pn => pn.stopPropagation(),
                    className: `rounded border p-1.5 ${_n}`,
                    children: c.jsx(by, {
                      size: 14
                    })
                  }), c.jsx(m1, {
                    open: Pa,
                    anchorRef: S,
                    isDark: t,
                    menuWidth: 240,
                    maxHeight: 360,
                    children: c.jsxs("div", {
                      className: "space-y-3 px-2 py-2",
                      "data-speech-seed-audio-settings": !0,
                      children: [c.jsxs("div", {
                        className: "block text-[11px]",
                        "data-model-select-area": !0,
                        children: [c.jsx("span", {
                          className: `${t ? "text-white/70" : wr} mb-1 block`,
                          children: x("输出格式")
                        }), c.jsxs("button", {
                          ref: pe,
                          type: "button",
                          onClick: pn => {
                            pn.stopPropagation(), K(!1), H(xr => !xr);
                          },
                          onMouseDown: pn => pn.stopPropagation(),
                          className: `flex w-full items-center justify-between rounded border px-2 py-1.5 text-xs ${_n}`,
                          children: [c.jsx("span", {
                            children: at.toUpperCase()
                          }), c.jsx(Mi, {
                            size: 12,
                            className: "opacity-60"
                          })]
                        }), c.jsx(m1, {
                          open: U,
                          anchorRef: pe,
                          isDark: t,
                          menuWidth: 160,
                          scrollKey: at,
                          children: TMt.map(pn => c.jsxs("button", {
                            type: "button",
                            ...(at === pn ? {
                              [Md]: "true"
                            } : {}),
                            onClick: xr => {
                              xr.stopPropagation(), $n({
                                seedAudioFormat: pn
                              }), H(!1);
                            },
                            className: Vte(t, at === pn),
                            children: [c.jsx("span", {
                              className: "text-xs",
                              children: pn.toUpperCase()
                            }), at === pn ? c.jsx(io, {
                              size: 12,
                              className: "text-green-500"
                            }) : null]
                          }, pn))
                        })]
                      }), c.jsxs("div", {
                        className: "block text-[11px]",
                        "data-model-select-area": !0,
                        children: [c.jsx("span", {
                          className: `${t ? "text-white/70" : wr} mb-1 block`,
                          children: x("采样率")
                        }), c.jsxs("button", {
                          ref: ce,
                          type: "button",
                          onClick: pn => {
                            pn.stopPropagation(), H(!1), K(xr => !xr);
                          },
                          onMouseDown: pn => pn.stopPropagation(),
                          className: `flex w-full items-center justify-between rounded border px-2 py-1.5 text-xs ${_n}`,
                          children: [c.jsxs("span", {
                            children: [Pt, " Hz"]
                          }), c.jsx(Mi, {
                            size: 12,
                            className: "opacity-60"
                          })]
                        }), c.jsx(m1, {
                          open: Y,
                          anchorRef: ce,
                          isDark: t,
                          menuWidth: 160,
                          maxHeight: 280,
                          scrollKey: String(Pt),
                          children: MMt.map(pn => c.jsxs("button", {
                            type: "button",
                            ...(Pt === pn ? {
                              [Md]: "true"
                            } : {}),
                            onClick: xr => {
                              xr.stopPropagation(), $n({
                                seedAudioSampleRate: pn
                              }), K(!1);
                            },
                            className: Vte(t, Pt === pn),
                            children: [c.jsxs("span", {
                              className: "text-xs",
                              children: [pn, " Hz"]
                            }), Pt === pn ? c.jsx(io, {
                              size: 12,
                              className: "text-green-500"
                            }) : null]
                          }, pn))
                        })]
                      }), c.jsxs("label", {
                        className: "block text-[11px]",
                        children: [c.jsxs("span", {
                          className: t ? "text-white/70" : wr,
                          children: [x("语速 "), (q == null ? void 0 : q.speech) ?? dt]
                        }), c.jsx("input", {
                          type: "range",
                          min: -50,
                          max: 100,
                          step: 1,
                          value: (q == null ? void 0 : q.speech) ?? dt,
                          onChange: pn => {
                            const xr = PRe(pn.target.value);
                            ne(Nr => ({
                              speech: xr,
                              loudness: (Nr == null ? void 0 : Nr.loudness) ?? xt,
                              pitch: (Nr == null ? void 0 : Nr.pitch) ?? yn
                            }));
                          },
                          onPointerUp: () => {
                            const pn = de.current;
                            pn && $n({
                              seedAudioSpeechRate: pn.speech,
                              seedAudioLoudnessRate: pn.loudness,
                              seedAudioPitchRate: pn.pitch
                            });
                          },
                          className: "mt-1 w-full accent-blue-500",
                          onMouseDown: pn => pn.stopPropagation(),
                          onPointerDown: pn => pn.stopPropagation()
                        })]
                      }), c.jsxs("label", {
                        className: "block text-[11px]",
                        children: [c.jsxs("span", {
                          className: t ? "text-white/70" : wr,
                          children: [x("音量 "), (q == null ? void 0 : q.loudness) ?? xt]
                        }), c.jsx("input", {
                          type: "range",
                          min: -50,
                          max: 100,
                          step: 1,
                          value: (q == null ? void 0 : q.loudness) ?? xt,
                          onChange: pn => {
                            const xr = RRe(pn.target.value);
                            ne(Nr => ({
                              speech: (Nr == null ? void 0 : Nr.speech) ?? dt,
                              loudness: xr,
                              pitch: (Nr == null ? void 0 : Nr.pitch) ?? yn
                            }));
                          },
                          onPointerUp: () => {
                            const pn = de.current;
                            pn && $n({
                              seedAudioSpeechRate: pn.speech,
                              seedAudioLoudnessRate: pn.loudness,
                              seedAudioPitchRate: pn.pitch
                            });
                          },
                          className: "mt-1 w-full accent-blue-500",
                          onMouseDown: pn => pn.stopPropagation(),
                          onPointerDown: pn => pn.stopPropagation()
                        })]
                      }), c.jsxs("label", {
                        className: "block text-[11px]",
                        children: [c.jsxs("span", {
                          className: t ? "text-white/70" : wr,
                          children: [x("音调 "), (q == null ? void 0 : q.pitch) ?? yn]
                        }), c.jsx("input", {
                          type: "range",
                          min: -12,
                          max: 12,
                          step: 1,
                          value: (q == null ? void 0 : q.pitch) ?? yn,
                          onChange: pn => {
                            const xr = NRe(pn.target.value);
                            ne(Nr => ({
                              speech: (Nr == null ? void 0 : Nr.speech) ?? dt,
                              loudness: (Nr == null ? void 0 : Nr.loudness) ?? xt,
                              pitch: xr
                            }));
                          },
                          onPointerUp: () => {
                            const pn = de.current;
                            pn && $n({
                              seedAudioSpeechRate: pn.speech,
                              seedAudioLoudnessRate: pn.loudness,
                              seedAudioPitchRate: pn.pitch
                            });
                          },
                          className: "mt-1 w-full accent-blue-500",
                          onMouseDown: pn => pn.stopPropagation(),
                          onPointerDown: pn => pn.stopPropagation()
                        })]
                      })]
                    })
                  })]
                })]
              }) : it ? c.jsxs(c.Fragment, {
                children: [c.jsx("div", {
                  className: `h-4 w-px shrink-0 ${t ? "bg-white/15" : "bg-zinc-300"}`
                }), c.jsxs("div", {
                  className: "relative max-w-[110px] min-w-[88px] shrink-0",
                  "data-model-select-area": !0,
                  children: [c.jsx("button", {
                    ref: k,
                    type: "button",
                    title: x("回复音色"),
                    onClick: pn => {
                      pn.stopPropagation(), J(Ar ? null : {
                        nodeId: e.id,
                        type: "speech-voice"
                      });
                    },
                    onMouseDown: pn => pn.stopPropagation(),
                    className: `${_n} flex w-full items-center gap-1 rounded border px-1.5 py-1 text-[10px]`,
                    children: c.jsx("span", {
                      className: "truncate",
                      children: x(Ot)
                    })
                  }), c.jsx(m1, {
                    open: Ar,
                    anchorRef: k,
                    isDark: t,
                    menuWidth: 220,
                    maxHeight: 360,
                    scrollKey: Qt || "default",
                    children: Iqt.map(pn => c.jsxs("div", {
                      className: `flex w-full items-center gap-1 rounded px-1 py-0.5 ${Qt === pn.id ? t ? "bg-zinc-800" : "bg-zinc-100" : ""}`,
                      children: [c.jsxs("button", {
                        type: "button",
                        ...(Qt === pn.id ? {
                          [Md]: "true"
                        } : {}),
                        onClick: xr => {
                          xr.stopPropagation(), $n({
                            voiceId: pn.id
                          }), J(null);
                        },
                        className: `flex min-w-0 flex-1 items-center gap-2 rounded px-1.5 py-1.5 text-left transition-colors ${t ? "hover:bg-zinc-800 text-white" : "hover:bg-zinc-100 text-zinc-900"}`,
                        children: [c.jsx("span", {
                          className: "truncate text-xs font-medium",
                          children: pn.name
                        }), Qt === pn.id ? c.jsx(io, {
                          size: 12,
                          className: "ml-auto shrink-0 text-green-500"
                        }) : null]
                      }), c.jsx("button", {
                        type: "button",
                        title: x("试听音色"),
                        onClick: xr => {
                          xr.stopPropagation(), Gn(pn.id || "eve");
                        },
                        onMouseDown: xr => xr.stopPropagation(),
                        className: `shrink-0 rounded p-1.5 transition-colors ${t ? "hover:bg-zinc-700 text-white/80" : "hover:bg-zinc-200 text-zinc-600"}`,
                        children: F === (pn.id || "eve") ? c.jsx(Ua, {
                          size: 12,
                          className: "animate-spin"
                        }) : G === (pn.id || "eve") ? c.jsx(kf, {
                          size: 12
                        }) : c.jsx(Ol, {
                          size: 12
                        })
                      })]
                    }, pn.id || "default"))
                  })]
                })]
              }) : It ? c.jsxs(c.Fragment, {
                children: [c.jsx("div", {
                  className: `h-4 w-px shrink-0 ${t ? "bg-white/15" : "bg-zinc-300"}`
                }), c.jsxs("div", {
                  className: "relative max-w-[110px] min-w-[88px] shrink-0",
                  "data-model-select-area": !0,
                  children: [c.jsx("button", {
                    ref: k,
                    type: "button",
                    title: x("音色"),
                    onClick: pn => {
                      pn.stopPropagation(), J(Ar ? null : {
                        nodeId: e.id,
                        type: "speech-voice"
                      });
                    },
                    onMouseDown: pn => pn.stopPropagation(),
                    className: `${_n} flex w-full items-center gap-1 rounded border px-1.5 py-1 text-[10px]`,
                    children: c.jsx("span", {
                      className: "truncate",
                      children: x(Pn)
                    })
                  }), c.jsx(m1, {
                    open: Ar,
                    anchorRef: k,
                    isDark: t,
                    menuWidth: 240,
                    maxHeight: 360,
                    scrollKey: ln,
                    children: Cqt.map(pn => c.jsxs("div", {
                      className: `flex w-full items-center gap-1 rounded px-1 py-0.5 ${ln === pn.id ? t ? "bg-zinc-800" : "bg-zinc-100" : ""}`,
                      children: [c.jsxs("button", {
                        type: "button",
                        ...(ln === pn.id ? {
                          [Md]: "true"
                        } : {}),
                        onClick: xr => {
                          xr.stopPropagation(), $n({
                            voiceId: pn.id
                          }), J(null);
                        },
                        className: `flex min-w-0 flex-1 items-center gap-2 rounded px-1.5 py-1.5 text-left transition-colors ${t ? "hover:bg-zinc-800 text-white" : "hover:bg-zinc-100 text-zinc-900"}`,
                        children: [c.jsx("span", {
                          className: "truncate text-xs font-medium",
                          children: pn.name
                        }), ln === pn.id ? c.jsx(io, {
                          size: 12,
                          className: "ml-auto shrink-0 text-green-500"
                        }) : null]
                      }), c.jsx("button", {
                        type: "button",
                        title: x("试听音色"),
                        onClick: xr => {
                          xr.stopPropagation(), Gn(pn.id);
                        },
                        onMouseDown: xr => xr.stopPropagation(),
                        className: `shrink-0 rounded p-1.5 transition-colors ${t ? "hover:bg-zinc-700 text-white/80" : "hover:bg-zinc-200 text-zinc-600"}`,
                        children: F === pn.id ? c.jsx(Ua, {
                          size: 12,
                          className: "animate-spin"
                        }) : G === pn.id ? c.jsx(kf, {
                          size: 12
                        }) : c.jsx(Ol, {
                          size: 12
                        })
                      })]
                    }, pn.id))
                  })]
                }), c.jsx("div", {
                  className: `h-4 w-px shrink-0 ${t ? "bg-white/15" : "bg-zinc-300"}`
                }), c.jsxs("div", {
                  className: "relative max-w-[88px] min-w-[64px] shrink-0",
                  "data-model-select-area": !0,
                  children: [c.jsx("button", {
                    ref: A,
                    type: "button",
                    title: x("语言"),
                    onClick: pn => {
                      pn.stopPropagation(), J(_r ? null : {
                        nodeId: e.id,
                        type: "speech-language"
                      });
                    },
                    onMouseDown: pn => pn.stopPropagation(),
                    className: `${_n} flex w-full items-center gap-1 rounded border px-1.5 py-1 text-[10px]`,
                    children: c.jsx("span", {
                      className: "truncate",
                      children: x(Yn)
                    })
                  }), c.jsx(m1, {
                    open: _r,
                    anchorRef: A,
                    isDark: t,
                    menuWidth: 160,
                    maxHeight: 320,
                    scrollKey: rn,
                    children: Eqt.map(pn => c.jsxs("button", {
                      type: "button",
                      ...(rn === pn.id ? {
                        [Md]: "true"
                      } : {}),
                      onClick: xr => {
                        xr.stopPropagation(), $n({
                          qwenTtsLanguage: pn.id
                        }), J(null);
                      },
                      className: Vte(t, rn === pn.id),
                      children: [c.jsx("span", {
                        className: "text-xs",
                        children: pn.name
                      }), rn === pn.id ? c.jsx(io, {
                        size: 12,
                        className: "text-green-500"
                      }) : null]
                    }, pn.id))
                  })]
                })]
              }) : Ze ? c.jsxs(c.Fragment, {
                children: [c.jsx("div", {
                  className: `h-4 w-px shrink-0 ${t ? "bg-white/15" : "bg-zinc-300"}`
                }), c.jsxs("div", {
                  className: "relative max-w-[110px] min-w-[88px] shrink-0",
                  "data-model-select-area": !0,
                  children: [c.jsx("button", {
                    ref: k,
                    type: "button",
                    title: Ue.length > 0 ? x("多人配音开启时忽略单人音色") : x("音色"),
                    onClick: pn => {
                      pn.stopPropagation(), J(Ar ? null : {
                        nodeId: e.id,
                        type: "speech-voice"
                      });
                    },
                    onMouseDown: pn => pn.stopPropagation(),
                    className: `${_n} flex w-full items-center gap-1 rounded border px-1.5 py-1 text-[10px]`,
                    children: c.jsx("span", {
                      className: "truncate",
                      children: Ue.length > 0 ? x("多人 {0}", Ue.length) : Cn
                    })
                  }), c.jsx(m1, {
                    open: Ar,
                    anchorRef: k,
                    isDark: t,
                    menuWidth: 240,
                    maxHeight: 360,
                    scrollKey: Ct,
                    children: rtt.map(pn => c.jsxs("div", {
                      className: `flex w-full items-center gap-1 rounded px-1 py-0.5 ${Ct === pn.id ? t ? "bg-zinc-800" : "bg-zinc-100" : ""}`,
                      children: [c.jsxs("button", {
                        type: "button",
                        ...(Ct === pn.id ? {
                          [Md]: "true"
                        } : {}),
                        onClick: xr => {
                          xr.stopPropagation(), $n({
                            voiceId: pn.id
                          }), J(null);
                        },
                        className: `flex min-w-0 flex-1 items-center gap-2 rounded px-1.5 py-1.5 text-left transition-colors ${t ? "hover:bg-zinc-800 text-white" : "hover:bg-zinc-100 text-zinc-900"}`,
                        children: [c.jsx("span", {
                          className: "truncate text-xs font-medium",
                          children: pn.name
                        }), Ct === pn.id ? c.jsx(io, {
                          size: 12,
                          className: "ml-auto shrink-0 text-green-500"
                        }) : null]
                      }), c.jsx("button", {
                        type: "button",
                        title: x("试听音色"),
                        onClick: xr => {
                          xr.stopPropagation(), Gn(pn.id);
                        },
                        onMouseDown: xr => xr.stopPropagation(),
                        className: `shrink-0 rounded p-1.5 transition-colors ${t ? "hover:bg-zinc-700 text-white/80" : "hover:bg-zinc-200 text-zinc-600"}`,
                        children: F === pn.id ? c.jsx(Ua, {
                          size: 12,
                          className: "animate-spin"
                        }) : G === pn.id ? c.jsx(kf, {
                          size: 12
                        }) : c.jsx(Ol, {
                          size: 12
                        })
                      })]
                    }, pn.id))
                  })]
                }), Ft ? c.jsxs(c.Fragment, {
                  children: [c.jsx("div", {
                    className: `h-4 w-px shrink-0 ${t ? "bg-white/15" : "bg-zinc-300"}`
                  }), c.jsxs("div", {
                    className: "relative max-w-[88px] min-w-[64px] shrink-0",
                    "data-model-select-area": !0,
                    children: [c.jsx("button", {
                      ref: A,
                      type: "button",
                      title: x("语言"),
                      onClick: pn => {
                        pn.stopPropagation(), J(_r ? null : {
                          nodeId: e.id,
                          type: "speech-language"
                        });
                      },
                      onMouseDown: pn => pn.stopPropagation(),
                      className: `${_n} flex w-full items-center gap-1 rounded border px-1.5 py-1 text-[10px]`,
                      children: c.jsx("span", {
                        className: "truncate",
                        children: x(Jn)
                      })
                    }), c.jsx(m1, {
                      open: _r,
                      anchorRef: A,
                      isDark: t,
                      menuWidth: 220,
                      maxHeight: 360,
                      scrollKey: un,
                      children: Tqt.map(pn => c.jsxs("button", {
                        type: "button",
                        ...(un === pn.id ? {
                          [Md]: "true"
                        } : {}),
                        onClick: xr => {
                          xr.stopPropagation(), $n({
                            geminiTtsLanguage: pn.id
                          }), J(null);
                        },
                        className: Vte(t, un === pn.id),
                        children: [c.jsx("span", {
                          className: "text-xs",
                          children: pn.name
                        }), un === pn.id ? c.jsx(io, {
                          size: 12,
                          className: "text-green-500"
                        }) : null]
                      }, pn.id))
                    })]
                  })]
                }) : null, c.jsx("div", {
                  className: `h-4 w-px shrink-0 ${t ? "bg-white/15" : "bg-zinc-300"}`
                }), c.jsxs("div", {
                  className: "relative shrink-0",
                  "data-model-select-area": !0,
                  children: [c.jsx("button", {
                    ref: S,
                    type: "button",
                    title: x("语音参数"),
                    onClick: pn => {
                      pn.stopPropagation(), J(Pa ? null : {
                        nodeId: e.id,
                        type: "speech-settings"
                      });
                    },
                    onMouseDown: pn => pn.stopPropagation(),
                    className: `rounded border p-1.5 ${_n}`,
                    children: c.jsx(by, {
                      size: 14
                    })
                  }), c.jsx(m1, {
                    open: Pa,
                    anchorRef: S,
                    isDark: t,
                    menuWidth: 260,
                    maxHeight: 420,
                    children: c.jsxs("div", {
                      className: "space-y-3 px-2 py-2",
                      "data-speech-seed-audio-settings": !0,
                      children: [c.jsxs("label", {
                        className: "block text-[11px]",
                        children: [c.jsx("span", {
                          className: `${t ? "text-white/70" : wr} mb-1 block`,
                          children: x("风格指令")
                        }), c.jsx("textarea", {
                          value: Kn,
                          placeholder: x("如：用温暖、口语化的语气说"),
                          onChange: pn => $n({
                            geminiTtsStyleInstructions: pn.target.value
                          }),
                          className: `h-14 w-full resize-none rounded border px-2 py-1.5 text-xs outline-none ${t ? "border-white/20 bg-[#1f1f1f] text-white placeholder:text-white/35" : "border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400"}`,
                          onMouseDown: pn => pn.stopPropagation(),
                          onPointerDown: pn => pn.stopPropagation()
                        })]
                      }), Ft ? c.jsxs(c.Fragment, {
                        children: [c.jsxs("label", {
                          className: "block text-[11px]",
                          children: [c.jsxs("span", {
                            className: t ? "text-white/70" : wr,
                            children: [x("随机性 "), en]
                          }), c.jsx("input", {
                            type: "range",
                            min: 0,
                            max: 2,
                            step: .1,
                            value: en,
                            onChange: pn => $n({
                              geminiTtsTemperature: bOe(pn.target.value)
                            }),
                            className: "mt-1 w-full accent-blue-500",
                            onMouseDown: pn => pn.stopPropagation(),
                            onPointerDown: pn => pn.stopPropagation()
                          })]
                        }), c.jsxs("div", {
                          className: "block text-[11px]",
                          "data-model-select-area": !0,
                          children: [c.jsx("span", {
                            className: `${t ? "text-white/70" : wr} mb-1 block`,
                            children: x("输出格式")
                          }), c.jsxs("button", {
                            ref: we,
                            type: "button",
                            onClick: pn => {
                              pn.stopPropagation(), Q(xr => !xr);
                            },
                            onMouseDown: pn => pn.stopPropagation(),
                            className: `flex w-full items-center justify-between rounded border px-2 py-1.5 text-xs ${_n}`,
                            children: [c.jsx("span", {
                              children: x(Tt)
                            }), c.jsx(Mi, {
                              size: 12,
                              className: "opacity-60"
                            })]
                          }), c.jsx(m1, {
                            open: W,
                            anchorRef: we,
                            isDark: t,
                            menuWidth: 160,
                            scrollKey: Vn,
                            children: Mqt.map(pn => c.jsxs("button", {
                              type: "button",
                              ...(Vn === pn.id ? {
                                [Md]: "true"
                              } : {}),
                              onClick: xr => {
                                xr.stopPropagation(), $n({
                                  geminiTtsOutputFormat: pn.id
                                }), Q(!1);
                              },
                              className: Vte(t, Vn === pn.id),
                              children: [c.jsx("span", {
                                className: "text-xs",
                                children: pn.name
                              }), Vn === pn.id ? c.jsx(io, {
                                size: 12,
                                className: "text-green-500"
                              }) : null]
                            }, pn.id))
                          })]
                        })]
                      }) : null, c.jsxs("div", {
                        className: "block text-[11px]",
                        children: [c.jsx("span", {
                          className: `${t ? "text-white/70" : wr} mb-1 block`,
                          children: x(We ? "双人对话" : "多人配音")
                        }), We ? c.jsx("p", {
                          className: `mb-1.5 ${t ? "text-white/45" : "text-zinc-500"}`,
                          children: x("恰好两个说话人。正文每行写成「说话人: 台词」，否则按单人音色朗读。")
                        }) : null, c.jsxs("div", {
                          className: "space-y-1.5",
                          children: [Ue.map((pn, xr) => c.jsxs("div", {
                            className: "flex items-center gap-1",
                            children: [c.jsx("input", {
                              value: pn.speaker_id,
                              placeholder: x("说话人"),
                              onChange: Nr => {
                                const qr = Ue.map((Oa, Fa) => Fa === xr ? {
                                  ...Oa,
                                  speaker_id: Nr.target.value
                                } : Oa);
                                $n({
                                  geminiTtsSpeakers: qr
                                });
                              },
                              className: `min-w-0 flex-1 rounded border px-1.5 py-1 text-xs outline-none ${t ? "border-white/20 bg-[#1f1f1f] text-white" : "border-zinc-200 bg-white text-zinc-900"}`,
                              onMouseDown: Nr => Nr.stopPropagation(),
                              onPointerDown: Nr => Nr.stopPropagation()
                            }), c.jsx("select", {
                              value: pn.voice,
                              onChange: Nr => {
                                const qr = Ue.map((Oa, Fa) => Fa === xr ? {
                                  ...Oa,
                                  voice: YK(Nr.target.value)
                                } : Oa);
                                $n({
                                  geminiTtsSpeakers: qr
                                });
                              },
                              className: `max-w-[92px] rounded border px-1 py-1 text-[10px] outline-none ${t ? "border-white/20 bg-[#1f1f1f] text-white" : "border-zinc-200 bg-white text-zinc-900"}`,
                              onMouseDown: Nr => Nr.stopPropagation(),
                              onPointerDown: Nr => Nr.stopPropagation(),
                              children: rtt.map(Nr => c.jsx("option", {
                                value: Nr.id,
                                children: Nr.id
                              }, Nr.id))
                            }), c.jsx("button", {
                              type: "button",
                              title: x("移除说话人"),
                              onClick: Nr => {
                                Nr.stopPropagation(), $n({
                                  geminiTtsSpeakers: Ue.filter((qr, Oa) => Oa !== xr)
                                });
                              },
                              className: `rounded p-1 ${t ? "hover:bg-zinc-700 text-white/70" : "hover:bg-zinc-100 text-zinc-500"}`,
                              children: c.jsx(Na, {
                                size: 12
                              })
                            })]
                          }, xr)), We && Ue.length >= 2 ? null : c.jsxs("button", {
                            type: "button",
                            onClick: pn => {
                              if (pn.stopPropagation(), We && Ue.length >= 2) return;
                              const xr = [...Ue, {
                                speaker_id: Ue.length === 0 ? "Host" : "Guest",
                                voice: Ct || _Mn
                              }];
                              $n({
                                geminiTtsSpeakers: We ? vOe(xr) : xr
                              });
                            },
                            className: `${_n} flex w-full items-center justify-center gap-1 rounded border px-2 py-1 text-[10px]`,
                            children: [c.jsx(eo, {
                              size: 12
                            }), x("添加说话人")]
                          })]
                        })]
                      })]
                    })
                  })]
                })]
              }) : Ut === "voice-design" ? c.jsxs(c.Fragment, {
                children: [c.jsx("div", {
                  className: `h-4 w-px shrink-0 ${t ? "bg-white/15" : "bg-zinc-300"}`
                }), c.jsxs("div", {
                  className: "relative shrink-0",
                  "data-model-select-area": !0,
                  children: [c.jsx("button", {
                    ref: S,
                    type: "button",
                    title: x("试听文案"),
                    onClick: pn => {
                      pn.stopPropagation(), J(Pa ? null : {
                        nodeId: e.id,
                        type: "speech-settings"
                      });
                    },
                    onMouseDown: pn => pn.stopPropagation(),
                    className: `rounded border p-1.5 ${_n}`,
                    children: c.jsx(by, {
                      size: 14
                    })
                  }), c.jsx(m1, {
                    open: Pa,
                    anchorRef: S,
                    isDark: t,
                    menuWidth: 240,
                    maxHeight: 220,
                    children: c.jsx("div", {
                      className: "space-y-2 px-2 py-2",
                      children: c.jsxs("label", {
                        className: "block text-[11px]",
                        children: [c.jsx("span", {
                          className: t ? "text-white/70" : wr,
                          children: x("试听文案")
                        }), c.jsx("textarea", {
                          value: jt,
                          onChange: pn => $n({
                            speechDesignPreviewText: pn.target.value.slice(0, 500)
                          }),
                          rows: 3,
                          className: `mt-1 w-full resize-none rounded border px-2 py-1.5 text-xs outline-none ${t ? "border-white/20 bg-transparent text-white placeholder-white/40" : "border-zinc-300 bg-transparent text-zinc-900 placeholder-zinc-400"}`,
                          onMouseDown: pn => pn.stopPropagation(),
                          onPointerDown: pn => pn.stopPropagation()
                        })]
                      })
                    })
                  })]
                })]
              }) : Ut === "voice-clone" ? c.jsxs(c.Fragment, {
                children: [c.jsx("div", {
                  className: `h-4 w-px shrink-0 ${t ? "bg-white/15" : "bg-zinc-300"}`
                }), c.jsx("input", {
                  ref: E,
                  type: "file",
                  accept: "audio/*,.mp3,.m4a,.wav",
                  className: "hidden",
                  onChange: pn => {
                    var Nr;
                    const xr = ((Nr = pn.target.files) == null ? void 0 : Nr[0]) || null;
                    ga(xr), pn.target.value = "";
                  }
                }), c.jsxs("button", {
                  type: "button",
                  title: Bt ? x("复刻音频：{0}", Bt) : x("上传复刻音频（10秒–5分钟）"),
                  onClick: pn => {
                    var xr;
                    pn.stopPropagation(), (xr = E.current) == null || xr.click();
                  },
                  onMouseDown: pn => pn.stopPropagation(),
                  className: `${_n} flex max-w-[7.5rem] min-w-[5.5rem] shrink-0 items-center gap-1 rounded border px-1.5 py-1 text-[10px]`,
                  children: [c.jsx(ml, {
                    size: 12,
                    className: "shrink-0"
                  }), c.jsx("span", {
                    className: "truncate",
                    children: Bt || x("上传音频")
                  })]
                }), c.jsx("div", {
                  className: `h-4 w-px shrink-0 ${t ? "bg-white/15" : "bg-zinc-300"}`
                }), c.jsx("span", {
                  title: wn ? x("音色 ID：{0}", wn) : x("音色 ID：上传后自动生成，也可在参数里修改"),
                  className: `shrink-0 font-mono text-[10px] ${t ? "text-white/55" : "text-zinc-500"}`,
                  children: wn ? `id ${wn.slice(0, 5)}...` : "id …"
                }), nn ? c.jsxs("div", {
                  className: "relative shrink-0",
                  "data-model-select-area": !0,
                  children: [c.jsx("button", {
                    ref: S,
                    type: "button",
                    title: x("克隆参数"),
                    onClick: pn => {
                      pn.stopPropagation(), J(Pa ? null : {
                        nodeId: e.id,
                        type: "speech-settings"
                      });
                    },
                    onMouseDown: pn => pn.stopPropagation(),
                    className: `rounded border p-1.5 ${_n}`,
                    children: c.jsx(by, {
                      size: 14
                    })
                  }), c.jsx(m1, {
                    open: Pa,
                    anchorRef: S,
                    isDark: t,
                    menuWidth: 240,
                    maxHeight: 360,
                    children: c.jsxs("div", {
                      className: "space-y-2 px-2 py-2 text-[11px]",
                      children: [c.jsxs("label", {
                        className: "block",
                        children: [c.jsx("span", {
                          className: t ? "text-white/70" : wr,
                          children: x("名称")
                        }), c.jsx("input", {
                          value: String(((En = e.settings) == null ? void 0 : En.huyaCloneName) || ""),
                          placeholder: x("方便以后查找"),
                          onChange: pn => $n({
                            huyaCloneName: pn.target.value
                          }),
                          className: `mt-1 w-full rounded border px-2 py-1 text-xs outline-none ${t ? "border-white/20 bg-transparent text-white" : "border-zinc-300 bg-transparent text-zinc-900"}`,
                          onMouseDown: pn => pn.stopPropagation()
                        })]
                      }), c.jsxs("label", {
                        className: "block",
                        children: [c.jsx("span", {
                          className: t ? "text-white/70" : wr,
                          children: x("音色 ID")
                        }), c.jsx("input", {
                          value: wn,
                          placeholder: x("需保持唯一"),
                          onChange: pn => $n({
                            speechCloneVoiceId: pn.target.value.replace(/[^\w-]/g, "").slice(0, 32)
                          }),
                          className: `mt-1 w-full rounded border px-2 py-1 font-mono text-xs outline-none ${t ? "border-white/20 bg-transparent text-white" : "border-zinc-300 bg-transparent text-zinc-900"}`,
                          onMouseDown: pn => pn.stopPropagation()
                        })]
                      }), c.jsxs("label", {
                        className: "flex items-center justify-between gap-2",
                        children: [c.jsx("span", {
                          className: t ? "text-white/70" : wr,
                          children: x("降噪")
                        }), c.jsx("input", {
                          type: "checkbox",
                          checked: ((Zn = e.settings) == null ? void 0 : Zn.huyaCloneNoiseReduction) === !0,
                          onChange: pn => $n({
                            huyaCloneNoiseReduction: pn.target.checked
                          }),
                          onMouseDown: pn => pn.stopPropagation()
                        })]
                      }), c.jsxs("label", {
                        className: "flex items-center justify-between gap-2",
                        children: [c.jsx("span", {
                          className: t ? "text-white/70" : wr,
                          children: x("音量归一化")
                        }), c.jsx("input", {
                          type: "checkbox",
                          checked: ((Sr = e.settings) == null ? void 0 : Sr.huyaCloneVolumeNormalization) === !0,
                          onChange: pn => $n({
                            huyaCloneVolumeNormalization: pn.target.checked
                          }),
                          onMouseDown: pn => pn.stopPropagation()
                        })]
                      }), c.jsx(vyn, {
                        label: x("试听模型"),
                        value: $Pt((Bn = e.settings) == null ? void 0 : Bn.huyaCloneTrialModel),
                        options: LMt.map(pn => ({
                          value: pn,
                          label: pn
                        })),
                        isDark: t,
                        mutedClass: t ? "text-white/70" : wr,
                        onChange: pn => $n({
                          huyaCloneTrialModel: pn
                        })
                      }), c.jsx(vyn, {
                        label: x("语言增强"),
                        value: String(((Et = e.settings) == null ? void 0 : Et.huyaCloneLanguageBoost) || ""),
                        options: [{
                          value: "",
                          label: "不增强"
                        }, ...FDn.map(pn => ({
                          value: pn,
                          label: pn
                        }))],
                        isDark: t,
                        mutedClass: t ? "text-white/70" : wr,
                        onChange: pn => $n({
                          huyaCloneLanguageBoost: pn
                        })
                      })]
                    })
                  })]
                }) : null]
              }) : c.jsxs(c.Fragment, {
                children: [nativeSpeech && !nativeSpeechVoices.length ? null : c.jsx("div", {
                  className: `h-4 w-px shrink-0 ${t ? "bg-white/15" : "bg-zinc-300"}`
                }), nativeSpeech && !nativeSpeechVoices.length ? null : c.jsxs("div", {
                  className: "relative max-w-[110px] min-w-[88px] shrink-0",
                  "data-model-select-area": !0,
                  children: [c.jsxs("button", {
                    ref: k,
                    type: "button",
                    onClick: pn => {
                      pn.stopPropagation(), J(Ar ? null : {
                        nodeId: e.id,
                        type: "speech-voice"
                      });
                    },
                    onMouseDown: pn => pn.stopPropagation(),
                    className: `${_n} flex w-full items-center gap-1 rounded border px-1.5 py-1 text-[10px]`,
                    children: [c.jsx("span", {
                      className: `h-4 w-4 shrink-0 rounded-full bg-gradient-to-br ${wt.gradient}`
                    }), c.jsx("span", {
                      className: "truncate",
                      children: wt.name
                    })]
                  }), c.jsxs(m1, {
                    open: Ar,
                    anchorRef: k,
                    isDark: t,
                    menuWidth: 220,
                    maxHeight: 360,
                    scrollKey: _t,
                    children: [Ht ? c.jsxs("label", {
                      className: "block px-2 py-1.5 text-[11px]",
                      children: [c.jsx("span", {
                        className: t ? "text-white/60" : "text-zinc-500",
                        children: x("音色 ID")
                      }), c.jsx("input", {
                        value: _t,
                        placeholder: x("克隆后选择，或直接填写"),
                        onChange: pn => $n({
                          voiceId: pn.target.value.trim()
                        }),
                        className: `mt-1 w-full rounded border px-2 py-1 font-mono text-xs outline-none ${t ? "border-white/20 bg-transparent text-white" : "border-zinc-300 bg-transparent text-zinc-900"}`,
                        onMouseDown: pn => pn.stopPropagation()
                      })]
                    }) : null, fa.map(pn => c.jsxs("div", {
                      className: `flex w-full items-center gap-1 rounded px-1 py-0.5 ${_t === pn.id ? t ? "bg-zinc-800" : "bg-zinc-100" : ""}`,
                      children: [c.jsxs("button", {
                        type: "button",
                        ...(_t === pn.id ? {
                          [Md]: "true"
                        } : {}),
                        onClick: xr => {
                          xr.stopPropagation(), $n({
                            voiceId: pn.id
                          }), J(null);
                        },
                        className: `flex min-w-0 flex-1 items-center gap-2 rounded px-1.5 py-1.5 text-left transition-colors ${t ? "hover:bg-zinc-800 text-white" : "hover:bg-zinc-100 text-zinc-900"}`,
                        children: [c.jsx("span", {
                          className: `h-5 w-5 shrink-0 rounded-full bg-gradient-to-br ${pn.gradient}`
                        }), c.jsx("span", {
                          className: "truncate text-xs font-medium",
                          children: pn.name
                        }), _t === pn.id ? c.jsx(io, {
                          size: 12,
                          className: "ml-auto shrink-0 text-green-500"
                        }) : null]
                      }), Ht || nativeSpeech ? null : c.jsx("button", {
                        type: "button",
                        title: x("试听音色"),
                        onClick: xr => {
                          xr.stopPropagation(), Gn(pn.id);
                        },
                        onMouseDown: xr => xr.stopPropagation(),
                        className: `shrink-0 rounded p-1.5 transition-colors ${t ? "hover:bg-zinc-700 text-white/80" : "hover:bg-zinc-200 text-zinc-600"}`,
                        children: F === pn.id ? c.jsx(Ua, {
                          size: 12,
                          className: "animate-spin"
                        }) : G === pn.id ? c.jsx(kf, {
                          size: 12
                        }) : c.jsx(Ol, {
                          size: 12
                        })
                      })]
                    }, pn.id))]
                  })]
                }), nativeSpeechHasParameters ? c.jsx("div", {
                  className: `h-4 w-px shrink-0 ${t ? "bg-white/15" : "bg-zinc-300"}`
                }) : null, nativeSpeechHasParameters ? c.jsxs("div", {
                  className: "relative shrink-0",
                  "data-model-select-area": !0,
                  children: [c.jsx("button", {
                    ref: S,
                    type: "button",
                    title: x("语音参数"),
                    onClick: pn => {
                      pn.stopPropagation(), J(Pa ? null : {
                        nodeId: e.id,
                        type: "speech-settings"
                      });
                    },
                    onMouseDown: pn => pn.stopPropagation(),
                    className: `rounded border p-1.5 ${_n}`,
                    children: c.jsx(by, {
                      size: 14
                    })
                  }), c.jsx(m1, {
                    open: Pa,
                    anchorRef: S,
                    isDark: t,
                    menuWidth: 220,
                    maxHeight: Ht ? 460 : 320,
                    children: c.jsxs("div", {
                      className: "space-y-3 px-2 py-2",
                      children: [nativeSpeechSupports('speed') ? c.jsxs("label", {
                        className: "block text-[11px]",
                        children: [c.jsxs("span", {
                          className: t ? "text-white/70" : wr,
                          children: [x("语速 "), ((zn = e.settings) == null ? void 0 : zn.speechSpeed) ?? 1]
                        }), c.jsx("input", {
                          type: "range",
                          min: .5,
                          max: 2,
                          step: .1,
                          value: ((Mn = e.settings) == null ? void 0 : Mn.speechSpeed) ?? 1,
                          onChange: pn => $n({
                            speechSpeed: parseFloat(pn.target.value)
                          }),
                          className: "mt-1 w-full",
                          onMouseDown: pn => pn.stopPropagation(),
                          onPointerDown: pn => pn.stopPropagation()
                        })]
                      }) : null, nativeSpeechSupports('volume') ? c.jsxs("label", {
                        className: "block text-[11px]",
                        children: [c.jsxs("span", {
                          className: t ? "text-white/70" : wr,
                          children: [x("音量 "), ((or = e.settings) == null ? void 0 : or.speechVol) ?? 1]
                        }), c.jsx("input", {
                          type: "range",
                          min: .1,
                          max: 10,
                          step: .1,
                          value: ((mr = e.settings) == null ? void 0 : mr.speechVol) ?? 1,
                          onChange: pn => $n({
                            speechVol: parseFloat(pn.target.value)
                          }),
                          className: "mt-1 w-full",
                          onMouseDown: pn => pn.stopPropagation(),
                          onPointerDown: pn => pn.stopPropagation()
                        })]
                      }) : null, nativeSpeechSupports('pitch') ? c.jsxs("label", {
                        className: "block text-[11px]",
                        children: [c.jsxs("span", {
                          className: t ? "text-white/70" : wr,
                          children: [x("语调 "), ((Yr = e.settings) == null ? void 0 : Yr.speechPitch) ?? 0]
                        }), c.jsx("input", {
                          type: "range",
                          min: -12,
                          max: 12,
                          step: 1,
                          value: ((aa = e.settings) == null ? void 0 : aa.speechPitch) ?? 0,
                          onChange: pn => $n({
                            speechPitch: parseInt(pn.target.value, 10)
                          }),
                          className: "mt-1 w-full",
                          onMouseDown: pn => pn.stopPropagation(),
                          onPointerDown: pn => pn.stopPropagation()
                        })]
                      }) : null, nativeSpeechSupports('emotion') ? c.jsxs("label", {
                        className: "block text-[11px]",
                        "data-speech-emotion-picker": !0,
                        children: [c.jsx("span", {
                          className: `${t ? "text-white/70" : wr} mb-1 block`,
                          children: x("情绪")
                        }), c.jsx("button", {
                          ref: C,
                          type: "button",
                          onClick: pn => {
                            pn.stopPropagation(), D(xr => !xr);
                          },
                          onMouseDown: pn => pn.stopPropagation(),
                          className: `flex w-full items-center justify-between rounded border px-2 py-1.5 text-xs ${_n}`,
                          children: c.jsx("span", {
                            children: ((wa = (Ht ? Sgt : vft).find(pn => pn.value === (Ht ? $Dn(bt) : bt))) == null ? void 0 : wa.label) || x("自动")
                          })
                        }), c.jsx(m1, {
                          open: L,
                          anchorRef: C,
                          isDark: t,
                          menuWidth: 160,
                          scrollKey: bt || "auto",
                          children: (Ht ? Sgt : vft).map(pn => c.jsxs("button", {
                            type: "button",
                            ...(bt === pn.value ? {
                              [Md]: "true"
                            } : {}),
                            onClick: xr => {
                              xr.stopPropagation(), $n({
                                emotion: pn.value
                              }), D(!1);
                            },
                            className: Vte(t, bt === pn.value),
                            children: [c.jsx("span", {
                              className: "text-xs",
                              children: x(pn.label)
                            }), bt === pn.value ? c.jsx(io, {
                              size: 12,
                              className: "text-green-500"
                            }) : null]
                          }, pn.value || "auto"))
                        })]
                      }) : null, Ht ? c.jsxs(c.Fragment, {
                        children: [c.jsxs("label", {
                          className: "block text-[11px]",
                          children: [c.jsx("span", {
                            className: t ? "text-white/70" : wr,
                            children: x("自定义发音")
                          }), c.jsx("textarea", {
                            value: String(((xa = e.settings) == null ? void 0 : xa.speechPronunciationDict) || ""),
                            placeholder: x(`燕少飞/(yan4)(shao3)(fei1)
"omg/oh my god"`),
                            rows: 3,
                            onChange: pn => $n({
                              speechPronunciationDict: pn.target.value
                            }),
                            className: `mt-1 w-full resize-none rounded border px-2 py-1 text-xs outline-none ${t ? "border-white/20 bg-transparent text-white" : "border-zinc-300 bg-transparent text-zinc-900"}`,
                            onMouseDown: pn => pn.stopPropagation()
                          })]
                        }), c.jsxs("label", {
                          className: "flex items-center justify-between gap-2 text-[11px]",
                          children: [c.jsx("span", {
                            className: t ? "text-white/70" : wr,
                            children: x("英文发音优化")
                          }), c.jsx("input", {
                            type: "checkbox",
                            checked: ((Aa = e.settings) == null ? void 0 : Aa.speechEnglishNormalization) === !0,
                            onChange: pn => $n({
                              speechEnglishNormalization: pn.target.checked
                            }),
                            onMouseDown: pn => pn.stopPropagation()
                          })]
                        })]
                      }) : null]
                    })
                  })]
                }) : null]
              }), c.jsxs("span", {
                className: "qiaodoumayi-aux-submit-wrap ml-auto inline-flex shrink-0 items-center gap-1.5",
                children: [c.jsx("span", {
                  className: `shrink-0 rounded-full px-2 py-0.5 text-[10px] ${wr}`,
                  children: Ve || nn ? `${hn}/${et}` : x("{0}字", hn)
                }), c.jsx("button", {
                  type: "button",
                  disabled: !jn,
                  onClick: Wn,
                  onMouseDown: pn => pn.stopPropagation(),
                  className: `qiaodoumayi-aux-submit rounded-md border p-1.5 transition-all active:scale-95 ${jn ? t ? "border-white/30 bg-transparent text-white hover:bg-white/5" : "border-gray-300 bg-transparent text-gray-900 hover:bg-black/5" : t ? "cursor-not-allowed border-white/15 text-white/40" : "cursor-not-allowed border-zinc-200 text-zinc-400"}`,
                  title: x("运行"),
                  children: kt ? c.jsx(Ua, {
                    size: 12,
                    className: "animate-spin shrink-0"
                  }) : c.jsx(Gc, {
                    size: 16,
                    strokeWidth: 2.4,
                    className: "shrink-0",
                    "aria-hidden": !0
                  })
                })]
              })]
            })]
          }) : c.jsx("div", {
            className: "w-full",
            style: {
              minHeight: yyn
            },
            "aria-hidden": !0
          })
        })
      }) : null]
    });
  },
  xZe = "Prompt words",
  r1r = "prompt_library.json",
  a1r = "saved_skills.json",
  d3t = "qiaodoumayi-prompt-library-restored";

function _Ze(e) {
  const t = e.trim().replace(/^\/+/, "").replace(/\/+$/, "");
  return t === "" ? "" : `${t}/`;
}

function kZe(e, t) {
  const n = e.replace(/^\/+/, "").replace(/\/+$/, ""),
    r = t.replace(/^\/+/, "");
  return `${n}/${r}`.replace(/\/+/g, "/");
}

function i1r(e) {
  return RVe(e);
}

function AZe() {
  return n9();
}

function oxo() {
  try {
    const e = localStorage.getItem(HX);
    if (!e) return [];
    const t = JSON.parse(e);
    return Array.isArray(t) ? t : [];
  } catch {
    return [];
  }
}

function sxo(e) {
  const t = JSON.parse(e);
  if (!Array.isArray(t)) throw new Error("云端提示词库数据格式不正确（须为 JSON 数组）");
  return t;
}

function lxo(e) {
  let t = JSON.parse(e);
  if (!Array.isArray(t)) if (t !== null && typeof t == "object" && Array.isArray(t.skills)) t = t.skills;else throw new Error("云端 Skill 数据格式不正确（须为数组或含 skills 数组的对象）");
  if (!Array.isArray(t)) throw new Error("云端 Skill 数据格式不正确");
  return t;
}

async function cxo(e, t) {
  const n = AZe(),
    r = _Ze(xZe),
    a = t ?? oxo(),
    i = JSON.stringify(a, null, 2),
    o = new TextEncoder().encode(i),
    s = kZe(r, r1r);
  await Pv(s, o, "application/json", n);
}

async function dxo(e) {
  const t = AZe(),
    n = _Ze(xZe),
    r = kZe(n, r1r);
  let a;
  try {
    a = await Hp(r, t);
  } catch (s) {
    throw new Error(`拉取云端提示词库失败（文件可能未备份或不存在）：${i1r(s)}`);
  }
  const i = new TextDecoder().decode(a);
  let o;
  try {
    o = sxo(i);
  } catch (s) {
    throw new Error("解析云端提示词库失败：" + (s instanceof Error ? s.message : String(s)));
  }
  return localStorage.setItem(HX, JSON.stringify(o)), window.dispatchEvent(new CustomEvent(d3t)), o;
}

async function uxo(e) {
  const t = AZe(),
    n = _Ze(xZe),
    r = vp(),
    a = JSON.stringify(r, null, 2),
    i = new TextEncoder().encode(a),
    o = kZe(n, a1r);
  await Pv(o, i, "application/json", t);
}

async function hxo(e) {
  const t = AZe(),
    n = _Ze(xZe),
    r = kZe(n, a1r);
  let a;
  try {
    a = await Hp(r, t);
  } catch (s) {
    throw new Error(`拉取云端 Skill 库失败（文件可能未备份或不存在）：${i1r(s)}`);
  }
  const i = new TextDecoder().decode(a);
  let o;
  try {
    o = lxo(i);
  } catch (s) {
    throw new Error("解析云端 Skill 库失败：" + (s instanceof Error ? s.message : String(s)));
  }
  return localStorage.setItem(tD, JSON.stringify(o)), await QVn(), window.dispatchEvent(new CustomEvent(cw)), o;
}

const RPe = "qiaodoumayi_prompt_library";

function Jct(e) {
  return B$(e) ?? (typeof e == "string" ? e : "");
}

function wyn(e) {
  return e ? e.startsWith("blob:") || e.startsWith("data:image") && e.length > 1e5 : !1;
}

const pxo = 7;

function xyn(e, t) {
  var r;
  const n = String(t ?? "").trim();
  return n || ((r = zs(e)) == null ? void 0 : r.platformGroup) || ko;
}

function mxo(e, t) {
  const n = e.filter(i => i.type === "image" || i.type === "video");
  if (n.length <= t) return n;
  let r = n.slice(0, t);
  const a = new Set(r.map(i => i.url));
  for (const i of n.filter(o => o.type === "video")) {
    if (a.has(i.url)) continue;
    let o = !1;
    for (let s = r.length - 1; s >= 0; s--) if (r[s].type === "image") {
      r = [...r], a.delete(r[s].url), r[s] = i, a.add(i.url), o = !0;
      break;
    }
    if (!o) break;
  }
  return r;
}

const fxo = () => typeof window < "u" && ("__TAURI__" in window || "__TAURI_INTERNALS__" in window);

async function _yn(e, t = "确认删除") {
  if (fxo()) try {
    const {
      ask: n
    } = await Ie(async () => {
      const {
        ask: r
      } = await Promise.resolve().then(() => Sb);
      return {
        ask: r
      };
    }, void 0, import.meta.url);
    return await n(x(e), {
      title: x(t),
      kind: "warning",
      okLabel: x("删除"),
      cancelLabel: x("取消")
    });
  } catch {
    return window.confirm(x(e));
  }
  return window.confirm(x(e));
}

function kyn(e, t) {
  try {
    localStorage.setItem(e, JSON.stringify(t));
  } catch (n) {
    if (n instanceof DOMException && (n.name === "QuotaExceededError" || n.code === 22)) {
      console.warn("[Agent提示词库] 本地存储配额不足，未写入（未自动删减内容）"), alert(x("本地存储空间不足，无法保存常用提示词库。请清理浏览器为本站保留的空间、删除部分条目，或导出备份后删减再试。"));
      return;
    }
    throw n;
  }
}

const Ayn = [{
    id: "template-1",
    name: "【角色板】",
    prompt: "你是一位专业的角色设计师，擅长根据参考图片创建详细的角色描述..."
  }, {
    id: "template-2",
    name: "【分镜版】",
    prompt: "你是一位经验丰富的分镜师，能够将故事情节转化为视觉化的分镜脚本..."
  }, {
    id: "template-3",
    name: "【情绪版】",
    prompt: "你是一位情感设计专家，擅长捕捉和表达情绪氛围..."
  }, {
    id: "template-4",
    name: "【高清放大】",
    prompt: "你是一位图像增强专家，专注于提升图片质量和细节..."
  }, {
    id: "template-5",
    name: "【九宫格分镜脚本】",
    prompt: "你是一位视觉叙事专家，擅长创建九宫格分镜脚本..."
  }],
  gxo = ({
    node: e,
    isDark: t,
    updateNode: n,
    connections: r = [],
    nodes: a = [],
    apiConfigs: i = [],
    globalApiKey: o = "",
    getConnectedInputImages: s,
    getConnectedInputItems: l,
    getOrderedInputItems: d,
    promptLibrary: u,
    setPromptLibrary: h,
    setNodes: p,
    setConnections: m,
    generateId: f,
    view: y,
    canvasRef: b,
    connectingSource: v,
    connectingTarget: _,
    connectingInputType: w,
    setConnectingSource: k,
    setConnectingTarget: A,
    setConnectingInputType: S,
    setMousePos: C,
    getConnectedImageForInput: I,
    dataVersion: E,
    activeDropdown: M = null,
    setActiveDropdown: T = () => {}
  }) => {
    var Ln, tt, zt, an, Rn, Un, er, Cr, tr, kn, xn, Fn, cr, vr, Wt, Jt, Nn, En, Zn, Sr, Bn;
    on();
    const P = Ia.useRef(null),
      R = Ia.useRef(null),
      j = Ia.useRef(null),
      B = Ia.useRef({
        systemPrompt: null,
        userPrompt: null,
        outputContent: null
      }),
      F = Ia.useRef({
        systemPrompt: !1,
        userPrompt: !1,
        outputContent: !1
      }),
      N = g.useMemo(() => VU(i.filter(Et => Et.type === "Chat")), [i]),
      G = g.useMemo(() => new Map(a.map(Et => [Et.id, Et])), [a]),
      z = ((Ln = N.find(Et => !Mu(Et.id))) == null ? void 0 : Ln.id) || ((tt = N[0]) == null ? void 0 : tt.id) || "gemini-3-pro",
      [V, O] = g.useState(((zt = e.settings) == null ? void 0 : zt.modelStage1) || z),
      [L, D] = g.useState(((an = e.settings) == null ? void 0 : an.modelStage2) || z),
      [U, H] = g.useState(!!((Rn = e.settings) != null && Rn.agentWebSearchEnabled)),
      [Y, K] = g.useState(() => {
        var Et;
        return ow((Et = e.settings) == null ? void 0 : Et.agentGeminiApiFormat);
      }),
      [W, Q] = g.useState(() => {
        var Et, zn;
        return Qv((Et = e.settings) == null ? void 0 : Et.modelStage1, (zn = e.settings) == null ? void 0 : zn.agentReasoningEffort);
      }),
      [q, ne] = uYe(),
      [de, le] = g.useState(!!((Un = e.settings) != null && Un.agentUseAliyunOss)),
      [J, pe] = g.useState(!!((er = e.settings) != null && er.ossImageBase64)),
      [ce, we] = g.useState(() => ua()),
      [X, Z] = g.useState(() => Ph()),
      [re, fe] = g.useState(() => mo()),
      ye = t9(re),
      [ie, ae] = g.useState(!1),
      [be, Ee] = g.useState(!1),
      xe = Ia.useRef(!1),
      he = Ia.useRef(null),
      ue = Ia.useRef(0);
    Ia.useEffect(() => () => {
      var Et;
      (Et = he.current) == null || Et.abort(), he.current = null;
    }, []);
    const ge = ((Cr = e.settings) == null ? void 0 : Cr.outputContent) || "",
      [_e, ke] = g.useState(ge),
      ve = Ia.useRef(_e),
      Te = Ia.useRef(null),
      Ne = Ia.useRef(null),
      me = Ia.useRef(0);
    Ia.useEffect(() => {
      ve.current = _e;
    }, [_e]), Ia.useEffect(() => {
      var zn;
      const Et = ((zn = e.settings) == null ? void 0 : zn.outputContent) || "";
      Et !== _e && (Ne.current !== null && (cancelAnimationFrame(Ne.current), Ne.current = null), Te.current = null, ke(Et), j.current && j.current.value !== Et && (j.current.value = Et));
    }, [(tr = e.settings) == null ? void 0 : tr.outputContent, e.id]), Ia.useEffect(() => {
      var zn;
      const Et = ow((zn = e.settings) == null ? void 0 : zn.agentGeminiApiFormat);
      K(Et);
    }, [(kn = e.settings) == null ? void 0 : kn.agentGeminiApiFormat]), Ia.useEffect(() => {
      var Et;
      Q(Qv(V, (Et = e.settings) == null ? void 0 : Et.agentReasoningEffort));
    }, [(xn = e.settings) == null ? void 0 : xn.agentReasoningEffort, V]);
    const Ae = g.useMemo(() => N.map(Et => Et.id).join(","), [N]);
    Ia.useEffect(() => {
      var aa;
      if (N.length === 0) return;
      const Et = ((aa = N.find(wa => !Mu(wa.id))) == null ? void 0 : aa.id) || N[0].id,
        zn = wa => {
          if (N.some(Aa => Aa.id === wa)) return wa;
          const xa = If(wa).id;
          return xa !== wa && N.some(Aa => Aa.id === xa) ? xa : Et;
        },
        Mn = zn(V),
        or = zn(L),
        mr = Mn === V,
        Yr = or === L;
      if (!mr || !Yr) {
        mr || O(Mn), Yr || D(or);
        const wa = If(V).effort || If(L).effort;
        n(e.id, {
          settings: {
            ...Qt.current,
            ...(!mr && {
              modelStage1: Mn
            }),
            ...(!Yr && {
              modelStage2: or
            }),
            ...(wa && {
              agentReasoningEffort: wa
            })
          }
        }), wa && Q(wa);
      }
    }, [Ae]);
    const [Fe, Me] = g.useState(() => {
        var Et;
        return !!((Et = e.settings) != null && Et._agentRunning);
      }),
      [Re, $e] = g.useState(!1),
      [rt, nt] = g.useState(!0),
      [ze, Le] = g.useState(!1),
      [Ke, Xe] = g.useState(!1),
      [De, Ye] = g.useState("cache"),
      [Ce, He] = g.useState([]);
    g.useEffect(() => {
      const Et = () => He(vp());
      return window.addEventListener(cw, Et), () => window.removeEventListener(cw, Et);
    }, []);
    const [Ve, it] = g.useState(null),
      [It, Ft] = g.useState({
        name: "",
        content: ""
      }),
      We = g.useRef(null),
      [Ze, Ge] = g.useState(!1),
      [Oe, st] = g.useState(() => H2());
    g.useEffect(() => {
      const Et = () => st(H2());
      return Et(), window.addEventListener(go, Et), () => window.removeEventListener(go, Et);
    }, []);
    const [vt, Ht] = g.useState(!1),
      [nn, pt] = g.useState(null),
      [lt, gt] = g.useState({
        name: "",
        prompt: ""
      }),
      [Ut, _t] = g.useState(() => {
        try {
          const Et = localStorage.getItem(RPe);
          return Et ? JSON.parse(Et) : Ayn;
        } catch {
          return Ayn;
        }
      }),
      At = u ?? Ut,
      Yt = h ?? _t;
    g.useEffect(() => {
      const Et = () => {
        try {
          const zn = localStorage.getItem(RPe);
          if (zn) {
            const Mn = JSON.parse(zn);
            Array.isArray(Mn) && Yt(Mn);
          }
        } catch {}
      };
      return window.addEventListener(d3t, Et), () => window.removeEventListener(d3t, Et);
    }, [Yt]);
    const qe = g.useCallback(async () => {
        if (!Ze) {
          Ge(!0);
          try {
            await cxo(void 0, At), alert(x("常用提示词库已备份到云端（Prompt words/prompt_library.json）"));
          } catch (Et) {
            alert(x("云端备份失败：{0}", Et instanceof Error ? Et.message : String(Et)));
          } finally {
            Ge(!1);
          }
        }
      }, [Ze, At]),
      kt = g.useCallback(async () => {
        if (!Ze) {
          Ge(!0);
          try {
            const Et = await dxo();
            Yt(Et), alert(x("已从云端恢复常用提示词库（共 {0} 项）", Et.length));
          } catch (Et) {
            alert(x("云端下载失败：{0}", Et instanceof Error ? Et.message : String(Et)));
          } finally {
            Ge(!1);
          }
        }
      }, [Ze, Yt]),
      St = g.useCallback(async () => {
        if (!Ze) {
          Ge(!0);
          try {
            await uxo(), alert(x("Skill 库已备份到云端（Prompt words/saved_skills.json）"));
          } catch (Et) {
            alert(x("云端备份失败：{0}", Et instanceof Error ? Et.message : String(Et)));
          } finally {
            Ge(!1);
          }
        }
      }, [Ze]),
      hn = g.useCallback(async () => {
        if (!Ze) {
          Ge(!0);
          try {
            const Et = await hxo();
            He(Et), alert(x("已从云端恢复 Skill 库（共 {0} 项）", Et.length));
          } catch (Et) {
            alert(x("云端下载失败：{0}", Et instanceof Error ? Et.message : String(Et)));
          } finally {
            Ge(!1);
          }
        }
      }, [Ze]);
    Ia.useEffect(() => {
      var zn;
      if (F.current.systemPrompt) {
        F.current.systemPrompt = !1;
        return;
      }
      const Et = ((zn = e.settings) == null ? void 0 : zn.systemPrompt) || "";
      P.current && P.current.value !== Et && (P.current.value = Et);
    }, [(Fn = e.settings) == null ? void 0 : Fn.systemPrompt]), Ia.useEffect(() => {
      var zn;
      if (F.current.userPrompt) {
        F.current.userPrompt = !1;
        return;
      }
      const Et = ((zn = e.settings) == null ? void 0 : zn.userPrompt) || "";
      R.current && R.current.value !== Et && (R.current.value = Et);
    }, [(cr = e.settings) == null ? void 0 : cr.userPrompt]), Ia.useEffect(() => {
      j.current && j.current.value !== _e && (j.current.value = _e);
    }, [_e]);
    const Qt = Ia.useRef(e.settings);
    Qt.current = e.settings;
    const Ot = Ia.useRef(n);
    Ot.current = n, g.useEffect(() => {
      const Et = () => {
        we(ua()), Z(Ph()), fe(mo());
      };
      return Et(), window.addEventListener(go, Et), () => window.removeEventListener(go, Et);
    }, []);
    const ln = Ia.useCallback(() => {
        B.current.systemPrompt && (clearTimeout(B.current.systemPrompt), B.current.systemPrompt = null), B.current.userPrompt && (clearTimeout(B.current.userPrompt), B.current.userPrompt = null), B.current.outputContent && (clearTimeout(B.current.outputContent), B.current.outputContent = null);
      }, []),
      Pn = Ia.useCallback(() => {
        const Et = {
          ...Qt.current
        };
        return P.current && (Et.systemPrompt = P.current.value), R.current && (Et.userPrompt = R.current.value), j.current && (Et.outputContent = j.current.value), Et;
      }, []),
      rn = Ia.useCallback(Et => {
        var Mn;
        ln(), O(Et);
        const zn = ((Mn = zs(Et)) == null ? void 0 : Mn.platformGroup) || ko;
        n(e.id, {
          settings: {
            ...Pn(),
            modelStage1: Et,
            platformGroup: zn
          }
        });
      }, [Pn, ln, e.id, n]),
      Yn = Ia.useCallback(Et => {
        var Mn;
        ln(), D(Et);
        const zn = ((Mn = zs(Et)) == null ? void 0 : Mn.platformGroup) || ko;
        n(e.id, {
          settings: {
            ...Pn(),
            modelStage2: Et,
            platformGroupStage2: zn
          }
        });
      }, [Pn, ln, e.id, n]),
      Ct = Ia.useCallback(Et => {
        K(Et), n(e.id, {
          settings: {
            ...Pn(),
            agentGeminiApiFormat: Et
          }
        });
      }, [Pn, e.id, n]),
      Cn = Ia.useCallback(Et => {
        Q(Et), n(e.id, {
          settings: {
            ...Pn(),
            agentReasoningEffort: Et
          }
        });
      }, [Pn, e.id, n]),
      un = g.useMemo(() => N.find(Et => Et.id === V), [N, V]),
      Jn = (un == null ? void 0 : un.modelName) || V,
      Kn = Wk(V, Jn),
      en = TT(V, Jn),
      Vn = g.useMemo(() => N.find(Et => Et.id === L), [N, L]),
      Tt = (Vn == null ? void 0 : Vn.modelName) || L,
      Ue = Qa.getGlobalBaseUrl(),
      et = g.useMemo(() => !!un && od(un, Ue), [un, Ue]),
      ft = g.useMemo(() => !!Vn && od(Vn, Ue), [Vn, Ue]),
      ht = g.useMemo(() => {
        var Et;
        return xyn(V, (Et = e.settings) == null ? void 0 : Et.platformGroup);
      }, [V, (vr = e.settings) == null ? void 0 : vr.platformGroup]),
      wt = g.useMemo(() => {
        var Et;
        return xyn(L, (Et = e.settings) == null ? void 0 : Et.platformGroupStage2);
      }, [L, (Wt = e.settings) == null ? void 0 : Wt.platformGroupStage2]),
      jt = Ia.useCallback(Et => {
        n(e.id, {
          settings: {
            ...Pn(),
            platformGroup: Et
          }
        });
      }, [Pn, e.id, n]),
      bt = Ia.useCallback(Et => {
        n(e.id, {
          settings: {
            ...Pn(),
            platformGroupStage2: Et
          }
        });
      }, [Pn, e.id, n]),
      Bt = Ia.useCallback((Et, zn) => {
        const Mn = i.find(wa => wa.type === "Chat" && wa.id === Et),
          or = (Qa.getResolvedModelBaseUrl((Mn == null ? void 0 : Mn.id) || Et) || (Mn == null ? void 0 : Mn.url) || "https://ai.comfly.org").replace(/\/+$/, ""),
          mr = nG(or) || rG((Mn == null ? void 0 : Mn.id) || Et),
          Yr = hI((Mn == null ? void 0 : Mn.id) || Et) || I3(or) || Eb((Mn == null ? void 0 : Mn.id) || Et) || Ny(or),
          aa = cu(Mn == null ? void 0 : Mn.key, o, void 0, {
            platformGroup: mr || Yr ? Hg : zn,
            modelId: (Mn == null ? void 0 : Mn.id) || Et,
            modelName: (Mn == null ? void 0 : Mn.modelName) || Et,
            baseUrl: or,
            modelSavedApiKeyId: Mn == null ? void 0 : Mn.savedApiKeyId
          });
        return {
          chatConfig: Mn,
          apiKey: aa,
          baseUrl: or
        };
      }, [i, o]);
    Ia.useEffect(() => {
      var zn;
      const Et = !!((zn = e.settings) != null && zn._agentRunning);
      Me(Et);
    }, [(Jt = e.settings) == null ? void 0 : Jt._agentRunning]);
    const wn = Ia.useCallback(() => {
        Ne.current = null;
        const Et = Te.current;
        if (Et === null) return;
        if (q5t(me.current)) {
          Ne.current = requestAnimationFrame(wn);
          return;
        }
        me.current = performance.now();
        const zn = j.current;
        zn && (zn.value = Et), ve.current = Et, Et.length > 0 && !xe.current && (xe.current = !0, Ee(!0)), requestAnimationFrame(() => {
          const Mn = j.current;
          Mn && (Mn.scrollTop = Mn.scrollHeight);
        });
      }, []),
      at = Ia.useCallback(Et => {
        Ne.current !== null && (cancelAnimationFrame(Ne.current), Ne.current = null);
        let zn = Et !== void 0 ? Et : Te.current;
        if (Te.current = null, zn == null && j.current && (zn = j.current.value || null), zn == null) return;
        ke(zn), ve.current = zn, zn.length > 0 && !xe.current && (xe.current = !0, Ee(!0));
        const Mn = j.current;
        Mn && (Mn.value !== zn && (Mn.value = zn), Mn.scrollTop = Mn.scrollHeight);
      }, []),
      Pt = Ia.useCallback(Et => {
        Te.current = Et, ve.current = Et, Ne.current === null && (Ne.current = requestAnimationFrame(wn));
      }, [wn]);
    Ia.useEffect(() => () => {
      var wa;
      Ne.current !== null && (cancelAnimationFrame(Ne.current), Ne.current = null), Te.current !== null && (ve.current = Te.current, Te.current = null), Object.values(B.current).forEach(xa => {
        xa && clearTimeout(xa);
      });
      const Et = {};
      let zn = !1;
      const Mn = Qt.current || {};
      if (P.current) {
        const xa = P.current.value,
          Aa = Mn.systemPrompt || "";
        xa !== Aa && (xa.trim() || !Aa.trim()) && (Et.systemPrompt = xa, zn = !0);
      }
      if (R.current) {
        const xa = R.current.value,
          Aa = Mn.userPrompt || "";
        xa !== Aa && (xa.trim() || !Aa.trim()) && (Et.userPrompt = xa, zn = !0);
      }
      const or = Mn.outputContent || "",
        mr = (wa = j.current) == null ? void 0 : wa.value,
        Yr = ve.current || "",
        aa = (typeof mr == "string" && mr.trim() ? mr : "") || (Yr.trim() ? Yr : "") || mr || Yr;
      aa !== or && (String(aa || "").trim() || !or.trim()) && (Et.outputContent = aa, zn = !0), zn && Ot.current(e.id, {
        settings: {
          ...Mn,
          ...Et
        }
      });
    }, [e.id]);
    const dt = Ia.useRef(null),
      xt = Ia.useRef(null);
    g.useEffect(() => {
      if (h) return;
      xt.current = Ut;
      const Et = setTimeout(() => {
        kyn(RPe, Ut), dt.current = null, xt.current = null;
      }, 400);
      return dt.current = Et, () => {
        dt.current && (clearTimeout(dt.current), dt.current = null), xt.current && (kyn(RPe, xt.current), xt.current = null);
      };
    }, [Ut, h]);
    const yn = g.useMemo(() => r.filter(Mn => Mn.to === e.id && (!Mn.inputType || Mn.inputType === "default")).map(Mn => {
        const or = G.get(Mn.from);
        if (!or) return "";
        if (or.type === "preview") {
          if (or.selectedPreviewImage) return `${Mn.from}:${or.selectedPreviewImage}`;
          if (or.previewMjImages && Array.isArray(or.previewMjImages)) return `${Mn.from}:${or.previewMjImages[0] || ""}`;
        }
        return `${Mn.from}:${or.content || ""}`;
      }).join("|"), [r, G, e.id]),
      gn = g.useMemo(() => (d ? d(e.id) : l ? l(e.id) : []).map(zn => {
        const Mn = Jct(zn.url);
        return {
          ...zn,
          url: Mn,
          assetId: yy(Mn, zn.assetId)
        };
      }), [d, l, e.id, yn, E]),
      {
        connectedImages: mt,
        connectedVideos: Xt,
        orderedImageItems: Gn,
        orderedVideoItems: rr
      } = g.useMemo(() => {
        const Et = [],
          zn = [],
          Mn = [],
          or = [];
        for (const mr of gn) mr.url && (mr.type === "image" ? (Et.push(mr.url), Mn.push(mr)) : mr.type === "video" && (zn.push(mr.url), or.push(mr)));
        return {
          connectedImages: Et,
          connectedVideos: zn,
          orderedImageItems: Mn,
          orderedVideoItems: or
        };
      }, [gn]),
      qn = mt.length > 0 || Xt.length > 0,
      Dn = g.useMemo(() => mt.join("|"), [mt]),
      Ar = j1(mt, {
        useThumbnail: !0,
        preferConstantDisplay: !0
      }),
      _r = g.useMemo(() => Ar.map((zn, Mn) => ({
        originalUrl: mt[Mn],
        url: zn.content || mt[Mn],
        isLoading: zn.isLoading,
        hasError: zn.hasError
      })), [Ar, Dn]),
      Pa = g.useMemo(() => Xt.join("|"), [Xt]),
      fa = j1(Xt, {
        shouldLoadContent: !0,
        preferConstantDisplay: !0
      }),
      Ca = g.useMemo(() => fa.map((Et, zn) => ({
        originalUrl: Xt[zn],
        url: Et.content || Xt[zn],
        isLoading: Et.isLoading,
        hasError: Et.hasError
      })), [fa, Pa]),
      [$n, yr] = g.useState({}),
      Ir = g.useRef(new Set()),
      Gr = g.useRef(new Set()),
      Zr = g.useRef(!0);
    g.useEffect(() => (Zr.current = !0, () => {
      Zr.current = !1;
    }), []), g.useEffect(() => {
      _r.forEach(Et => {
        if (!Et.url || Et.isLoading || Et.hasError) return;
        const zn = _c(Et.url) || Et.url;
        if (!wyn(zn)) return;
        const Mn = Et.originalUrl || zn;
        $n[Mn] || Gr.current.has(Mn) || Ir.current.has(Mn) || (Ir.current.add(Mn), xD(() => Ix(zn, 160)).then(({
          url: or
        }) => {
          Gr.current.add(Mn), Zr.current && yr(mr => mr[Mn] ? mr : {
            ...mr,
            [Mn]: or
          });
        }).catch(() => {
          Ir.current.delete(Mn);
        }));
      });
    }, [_r, $n]);
    const La = g.useCallback((Et, zn) => {
        if (zn && $n[zn]) return $n[zn];
        if (Et && $n[Et]) return $n[Et];
        const Mn = Iae(Et);
        return !Mn || !vP(Mn) && !Mn.startsWith("content_ref:") ? "" : wyn(Mn) ? $n[zn || Et] || $n[Et] || "" : Mn;
      }, [$n]),
      sa = g.useMemo(() => gn.filter(Et => Et.type === "image" || Et.type === "video"), [gn]),
      Ea = g.useMemo(() => {
        const Et = new Map();
        return _r.forEach(zn => Et.set(zn.originalUrl, zn)), Et;
      }, [_r]),
      ba = g.useMemo(() => {
        const Et = new Map();
        return Ca.forEach(zn => Et.set(zn.originalUrl, zn)), Et;
      }, [Ca]),
      [ga, _a] = g.useState(null),
      [$a, Ya] = g.useState(null);
    g.useEffect(() => {
      const Et = gn.filter(Mn => Mn.type === "image" && Mn.assetId);
      if (Et.length === 0) return;
      let zn = !1;
      return (async () => {
        for (const Mn of Et) {
          const or = Jct(Mn.url);
          if (or && !Tu(or) && (or.startsWith("content_ref:") || or.startsWith("blob:") || or.startsWith("data:image/"))) continue;
          const mr = or || Mn.assetId || "";
          if (!(!mr || $n[mr])) try {
            let Yr = await ni.getAssetUrl(Mn.assetId);
            if (!Yr) {
              const {
                  resolveLocalCachedDisplayUrls: aa
                } = await Ie(async () => {
                  const {
                    resolveLocalCachedDisplayUrls: xa
                  } = await Promise.resolve().then(() => Ui);
                  return {
                    resolveLocalCachedDisplayUrls: xa
                  };
                }, void 0, import.meta.url),
                wa = await aa(Mn.assetId);
              Yr = (wa == null ? void 0 : wa.displayUrl) || null;
            }
            if (!Yr || zn || !Zr.current) continue;
            yr(aa => aa[mr] ? aa : {
              ...aa,
              [mr]: Yr,
              [Mn.assetId]: Yr
            });
          } catch {}
        }
      })(), () => {
        zn = !0;
      };
    }, [gn, $n]);
    const ta = g.useMemo(() => {
        const Et = new Map();
        return r.filter(Mn => Mn.to === e.id && (!Mn.inputType || Mn.inputType === "default")).forEach(Mn => {
          const or = G.get(Mn.from);
          if (!or) return;
          (() => {
            var wa;
            const Yr = [],
              aa = xa => {
                const Aa = Jct(xa);
                Aa && !Yr.includes(Aa) && Yr.push(Aa);
              };
            if (or.type === "preview") return or.selectedPreviewImage ? (aa(or.selectedPreviewImage), Yr) : or.previewMjImages && Array.isArray(or.previewMjImages) && or.previewMjImages.length > 0 ? (aa(or.previewMjImages[0]), Yr) : (aa(or.content), Yr);
            if (or.type === "input-image" || or.type === "video-input" || or.type === "rh-app") {
              if (aa(or.content), or.type === "input-image") {
                const Aa = or.settings || {};
                aa(Aa[_i]), aa(Aa[Pi]), aa(Aa.videoPosterUrl), aa(or.videoPosterUrl), aa(Vv(or)), aa(_f(or));
              }
              if (or.type === "video-input") {
                const Aa = or.settings || {};
                aa(Aa[_i]), aa(Aa._assetId ? `local-asset://${String(Aa._assetId).trim()}` : "");
              }
              const xa = (wa = or.settings) == null ? void 0 : wa.generatedImages;
              return xa != null && xa.length && xa.forEach(Aa => aa(Aa.fullUrl)), Yr;
            }
            if (or.type === "gen-image" || or.type === "gen-video") {
              const xa = Xl(or);
              aa(xa == null ? void 0 : xa.url), aa(or.content);
              const Aa = or.settings || {};
              aa(Aa[_i]), aa(Aa[Pi]), aa(Aa.videoPosterUrl), aa(or.videoPosterUrl);
              const pn = Aa.generatedImages;
              return pn == null || pn.forEach(xr => {
                aa(xr.fullUrl), aa(xr.thumbUrl), aa(xr.url);
              }), Yr;
            }
            return aa(or.content), Yr;
          })().forEach(Yr => {
            Yr && Et.set(Yr, Mn.from);
          });
        }), Et;
      }, [r, G, e.id]),
      ki = g.useMemo(() => mxo(gn, pxo).map(zn => {
        const Mn = ta.get(zn.url),
          or = Mn ? G.get(Mn) : void 0,
          mr = mU(zn.url, zn.type, or);
        let Yr = zn.url;
        if (mr === "image") {
          const xa = _r.find(pn => pn.originalUrl === zn.url),
            Aa = xa ? _c(xa.url) || xa.url : zn.url;
          Yr = Iae(wk(zn.url, or)) || La(Aa, zn.url) || "";
        } else Yr = wk(zn.url, or);
        const aa = _r.find(xa => xa.originalUrl === zn.url),
          wa = Ca.find(xa => xa.originalUrl === zn.url);
        return {
          rawUrl: zn.url,
          displaySrc: Yr,
          mediaType: mr,
          sourceNode: or,
          assetId: zn.assetId,
          isLoading: mr === "image" ? !!(aa != null && aa.isLoading) : !!(wa != null && wa.isLoading)
        };
      }), [gn, ta, G, _r, Ca, La]),
      Wn = g.useCallback((Et, zn) => {
        if (zn.preventDefault(), zn.stopPropagation(), !m) return;
        const Mn = ta.get(Et);
        Mn && m(or => or.filter(mr => !(mr.from === Mn && mr.to === e.id && (!mr.inputType || mr.inputType === "default"))));
      }, [ta, e.id, m]),
      wr = g.useCallback((Et, zn) => {
        if (Et === zn || Et < 0 || zn < 0 || Et >= sa.length || zn >= sa.length) return;
        const Mn = [...sa],
          [or] = Mn.splice(Et, 1);
        Mn.splice(zn, 0, or);
        const mr = Mn.map(wa => wa.url);
        let Yr = 0;
        const aa = gn.map(wa => wa.type === "image" || wa.type === "video" ? mr[Yr++] ?? wa.url : wa.url);
        n(e.id, {
          settings: {
            ...e.settings,
            inputItemOrder: aa
          }
        }), _a(null);
      }, [sa, gn, e.id, e.settings, n]),
      jn = g.useCallback((Et, zn) => {
        Wn(Et, zn);
      }, [Wn]),
      _n = ((Nn = e.settings) == null ? void 0 : Nn.systemPrompt) || "",
      ar = ((En = e.settings) == null ? void 0 : En.userPrompt) || "",
      Vt = _e,
      vn = ((Zn = e.settings) == null ? void 0 : Zn.isTruncated) || !1;
    Ia.useEffect(() => {
      ae(vn);
    }, [vn]);
    const An = g.useMemo(() => {
        const Et = r.filter(or => or.to === e.id && or.inputType === "agent_meta_prompt"),
          zn = [],
          Mn = new Set();
        for (const or of Et) {
          if (!or.from || Mn.has(or.from)) continue;
          const mr = G.get(or.from);
          mr && (mr.type === "text-node" || mr.type === "custom-agent") && (Mn.add(or.from), zn.push(mr));
        }
        return zn;
      }, [r, G, e.id]),
      ur = g.useMemo(() => {
        const Et = [],
          zn = new Set(),
          Mn = or => {
            if (zn.has(or)) return;
            const mr = G.get(or);
            mr && (mr.type === "text-node" || mr.type === "custom-agent" || mr.type === "novel-input") && (zn.add(or), Et.push(mr));
          };
        for (const or of r) if (or.to === e.id) {
          if (or.inputType === "agent_user_input") {
            Mn(or.from);
            continue;
          }
          if (!or.inputType) {
            const mr = G.get(or.from);
            ((mr == null ? void 0 : mr.type) === "text-node" || (mr == null ? void 0 : mr.type) === "novel-input") && Mn(or.from);
          }
        }
        return Et;
      }, [r, G, e.id]),
      zr = g.useMemo(() => An[0] ?? null, [An]),
      Dr = g.useMemo(() => ur[0] ?? null, [ur]),
      Wr = g.useMemo(() => An.find(Et => Et.type === "custom-agent") ?? null, [An]),
      gr = g.useMemo(() => ur.find(Et => Et.type === "custom-agent") ?? null, [ur]),
      jr = g.useMemo(() => {
        const Et = new Set(["agent_meta_prompt", "agent_user_input", "agent_output", void 0]),
          zn = r.reduce((or, mr) => (mr.to === e.id && Et.has(mr.inputType) && or.push(mr), or), []),
          Mn = [];
        for (const or of zn) {
          const mr = G.get(or.from);
          (mr == null ? void 0 : mr.type) === "custom-agent" && Mn.push(mr);
        }
        return Mn;
      }, [r, G, e.id]),
      ea = g.useMemo(() => {
        var zn, Mn;
        if (An.length === 0) return "";
        const Et = [];
        for (const or of An) {
          const mr = G.get(or.id) || or,
            Yr = mr.type === "custom-agent" ? (((zn = mr.settings) == null ? void 0 : zn.outputContent) || "").trim() : (((Mn = mr.settings) == null ? void 0 : Mn.text) || mr.prompt || mr.content || "").trim();
          Yr && Et.push(Yr);
        }
        return Et.join(`

`);
      }, [An, G]),
      pa = g.useMemo(() => {
        var zn, Mn;
        if (ur.length === 0) return "";
        const Et = [];
        for (const or of ur) {
          const mr = G.get(or.id) || or,
            Yr = mr.type === "custom-agent" ? (((zn = mr.settings) == null ? void 0 : zn.outputContent) || "").trim() : (((Mn = mr.settings) == null ? void 0 : Mn.text) || mr.prompt || mr.content || "").trim();
          Yr && Et.push(Yr);
        }
        return Et.join(`

`);
      }, [ur, G, E]),
      Br = g.useMemo(() => {
        var zn;
        if (jr.length === 0) return "";
        const Et = [];
        for (const Mn of jr) {
          const mr = (((zn = (G.get(Mn.id) || Mn).settings) == null ? void 0 : zn.outputContent) || "").trim();
          mr.length > 0 && Et.push(mr);
        }
        return Et.join(`

`);
      }, [jr, G]),
      tn = g.useCallback(() => {
        const Et = r.reduce((Mn, or) => (or.from === e.id && Mn.add(or.to), Mn), new Set()),
          zn = [];
        return Et.forEach(Mn => {
          const or = G.get(Mn);
          or && zn.push(or);
        }), zn;
      }, [r, G, e.id]),
      Lr = g.useCallback(Et => {
        var or;
        if (!Et.trim() || !p) return;
        const zn = tn(),
          Mn = [];
        for (let mr = 0; mr < zn.length; mr++) zn[mr].type === "text-node" && Mn.push(zn[mr]);
        if (Mn.length === 0) {
          console.log("[CustomAgentNode] No downstream text nodes found");
          return;
        }
        console.log("[CustomAgentNode] Sending output to downstream text nodes:", {
          contentLength: Et.length,
          textNodesCount: Mn.length,
          textNodeIds: Mn.map(mr => mr.id)
        });
        for (const mr of Mn) {
          const Yr = ((or = mr.settings) == null ? void 0 : or.text) || "",
            aa = mr.prompt || "",
            wa = Yr || aa;
          !wa.trim() || wa === Et ? (n(mr.id, {
            settings: {
              ...mr.settings,
              text: Et
            },
            prompt: Et
          }), console.log(`[CustomAgentNode] Updated text node ${mr.id} with output content`)) : console.log(`[CustomAgentNode] Skipped updating text node ${mr.id} as it has manual content`);
        }
      }, [tn, n, p]),
      br = g.useCallback(Et => {
        if (!v || v === e.id) return Et;
        const zn = G.get(v);
        return Lcr(zn, Et);
      }, [v, e.id, G]),
      Jr = g.useCallback((Et, zn) => {
        if (Et.stopPropagation(), Et.preventDefault(), b != null && b.current && y && C) {
          const Mn = b.current.getBoundingClientRect(),
            or = (Et.clientX - Mn.left - y.x) / y.zoom,
            mr = (Et.clientY - Mn.top - y.y) / y.zoom;
          C(hD(or, mr, y.zoom));
        }
        A && A(e.id), S && S(zn);
      }, [e.id, b, y, C, A, S]),
      Kr = g.useCallback((Et, zn) => {
        Et.__handledByCustomAgent = !0, Et.stopPropagation(), Et.preventDefault();
        const Mn = br(zn);
        v && v !== e.id && m && f && (r.some(mr => mr.from === v && mr.to === e.id && (mr.inputType || "default") === Mn) || (Mn === "default" || Mn === "agent_user_input" || Mn === "agent_meta_prompt" || m(Yr => Yr.filter(aa => !(aa.to === e.id && (aa.inputType || "default") === Mn))), m(Yr => [...Yr, {
          id: f(),
          from: v,
          to: e.id,
          inputType: Mn
        }])), k && k(null));
      }, [e.id, v, r, m, f, k, br]),
      ir = g.useCallback((Et, zn) => {
        const Mn = Et.target;
        if (Mn.closest("[data-node-header-toolbar]") || v && Mn.closest("[data-agent-wire-drop-row]") || Mn.closest("[data-input-type]") || (Et.__handledByCustomAgent = !0, !v && (Mn.tagName === "BUTTON" || Mn.tagName === "INPUT" || Mn.tagName === "TEXTAREA" || Mn.tagName === "SELECT" || Mn.closest("button") || Mn.closest("input") || Mn.closest("select")))) return;
        Et.stopPropagation(), Et.preventDefault();
        const mr = br(zn);
        v && v !== e.id && m && f && (r.some(aa => aa.from === v && aa.to === e.id && (aa.inputType || "default") === mr) || (mr === "default" || mr === "agent_user_input" || mr === "agent_meta_prompt" || m(wa => wa.filter(xa => !(xa.to === e.id && (xa.inputType || "default") === mr))), m(wa => [...wa, {
          id: f(),
          from: v,
          to: e.id,
          inputType: mr
        }]), console.log(`[CustomAgentNode] ✅ Connected to ${mr} via Area Drop`)), k && k(null));
      }, [e.id, v, r, m, f, k, br]),
      Hr = g.useCallback(Et => {
        n(e.id, {
          settings: {
            ...Qt.current,
            systemPrompt: Et.prompt
          }
        }), P.current && (P.current.value = Et.prompt, F.current.systemPrompt = !0), $e(!1);
      }, [e.id, n]),
      ha = g.useCallback(Et => {
        n(e.id, {
          settings: {
            ...Qt.current,
            systemPrompt: Et.content
          }
        }), P.current && (P.current.value = Et.content, F.current.systemPrompt = !0), Xe(!1);
      }, [e.id, n]),
      Ga = g.useCallback(async (Et, zn, Mn) => {
        try {
          const or = await _Ye(Et);
          ha({
            id: Mn,
            name: zn,
            content: or,
            createdAt: 0
          });
        } catch (or) {
          alert(or instanceof Error ? x(or.message) : x(String(or)));
        }
      }, [ha]),
      Za = g.useCallback(Et => {
        var zn;
        Et.stopPropagation(), (zn = We.current) == null || zn.click();
      }, []),
      va = g.useCallback(async Et => {
        var Mn;
        Et.stopPropagation();
        const zn = (Mn = Et.target.files) == null ? void 0 : Mn[0];
        if (Et.target.value = "", !!zn) try {
          const or = await zn.text(),
            mr = tHn(zn.name, or);
          if (!mr.ok) {
            alert(x(mr.message));
            return;
          }
          if (He(vp()), typeof window < "u" && window.__toastSuccess) {
            const Yr = zn.name.toLowerCase();
            if (Yr.endsWith(".txt") || Yr.endsWith(".md")) {
              const aa = (new TextEncoder().encode(or).length / 1024).toFixed(1);
              window.__toastSuccess(`已导入 ${zn.name} 为 Skill（约 ${aa} KB，无字数截断）`);
            } else window.__toastSuccess(`已导入 ${mr.added} 项 Skill`);
          }
        } catch {
          alert(x("读取文件失败。"));
        }
      }, []),
      Kt = g.useCallback(() => {
        if (!lt.name.trim() || !lt.prompt.trim()) {
          alert(x("请填写模板名称和内容"));
          return;
        }
        if (nn) Yt(Et => Et.map(zn => zn.id === nn ? {
          ...zn,
          name: lt.name,
          prompt: lt.prompt
        } : zn));else {
          const Et = {
            id: `custom-${Date.now()}`,
            name: lt.name,
            prompt: lt.prompt
          };
          Yt(zn => [...zn, Et]);
        }
        gt({
          name: "",
          prompt: ""
        }), pt(null), Ht(!1);
      }, [lt, nn, Yt]),
      Pr = g.useCallback(async Et => {
        (await _yn("确定要删除这个模板吗？")) && Yt(Mn => Mn.filter(or => or.id !== Et));
      }, [Yt]),
      kr = g.useCallback(Et => {
        gt({
          name: Et.name,
          prompt: Et.prompt
        }), pt(Et.id), Ht(!0);
      }, []),
      Mr = g.useCallback(() => {
        if (!_n.trim()) {
          alert(x("请先输入元提示词"));
          return;
        }
        gt({
          name: "",
          prompt: _n
        }), pt(null), Ht(!0);
      }, [_n]),
      Hn = g.useCallback(async () => {
        var xa, Aa, pn, xr, Nr;
        if (Fe) return;
        B.current.systemPrompt && (clearTimeout(B.current.systemPrompt), B.current.systemPrompt = null), B.current.userPrompt && (clearTimeout(B.current.userPrompt), B.current.userPrompt = null);
        const Et = ((xa = P.current) == null ? void 0 : xa.value) ?? _n,
          zn = ((Aa = R.current) == null ? void 0 : Aa.value) ?? ar;
        (Et !== _n || zn !== ar) && (F.current.systemPrompt = !0, F.current.userPrompt = !0, n(e.id, {
          settings: {
            ...Qt.current,
            systemPrompt: Et,
            userPrompt: zn
          }
        }));
        let Mn = "";
        const or = [];
        Et.trim() && or.push(Et.trim()), ea.trim() && or.push(ea.trim()), Br.trim() && or.push(`[引用Agent输出]:
${Br.trim()}`), Mn = or.join(`

`);
        let mr = "";
        const Yr = [];
        if (zn.trim() && Yr.push(zn.trim()), pa.trim() && Yr.push(pa.trim()), Br.trim() && Yr.push(`[引用Agent输出]:
${Br.trim()}`), mr = Yr.join(`

`), !Mn.trim() && !mr.trim()) {
          alert(x("请至少输入元提示词或用户需求，或连接上游文字节点/Agent节点"));
          return;
        }
        console.log("[CustomAgentNode] Generating with merged prompts:", {
          systemPrompt: Et.length,
          metaPromptFromUpstream: ea.length,
          agentOutputFromUpstream: Br.length,
          finalSystemPrompt: Mn.length,
          userPrompt: zn.length,
          userInputFromUpstream: pa.length,
          finalUserPrompt: mr.length
        }), Me(!0), xe.current = !1, Ne.current !== null && (cancelAnimationFrame(Ne.current), Ne.current = null), Te.current = null;
        const aa = new AbortController();
        he.current = aa;
        const wa = ++ue.current;
        n(e.id, {
          settings: {
            ...Qt.current,
            _agentRunning: !0
          }
        });
        try {
          if (Mu(V)) {
            if (Xt.length > 0) throw new Error("Codex 模型暂不支持视频参考，请断开视频或改用 API 模型");
            const Bi = _r.filter(Ms => !Ms.hasError && !Ms.isLoading && Ms.url).map((Ms, ks) => ({
                name: `参考${ks + 1}`,
                type: "image/png",
                preview: Ms.url,
                isImage: !0
              })),
              Do = await iQe({
                messages: [{
                  id: crypto.randomUUID(),
                  role: "user",
                  content: mr.trim() || "请根据元提示词与参考素材完成任务。",
                  files: Bi
                }],
                modelId: V,
                effort: W,
                webSearch: U,
                instructions: Mn.trim() || "你是专业创作助手。直接输出可用结果，遵守用户的格式要求。",
                placeholder: {
                  id: crypto.randomUUID(),
                  role: "assistant",
                  content: ""
                },
                signal: aa.signal,
                onUpdate: Ms => Pt(Ms.content),
                onFiles: () => {}
              });
            if (wa !== ue.current) return;
            const co = Do.content;
            if (!co.trim()) throw new Error("Codex 未返回有效内容");
            const ls = {
              ...Qt.current,
              outputContent: co,
              modelStage1: V,
              modelStage2: L,
              isTruncated: !1,
              _agentRunning: !1
            };
            Qt.current = ls, n(e.id, {
              settings: ls
            }), at(co), Lr(co);
            return;
          }
          const {
              chatConfig: qr,
              apiKey: Oa,
              baseUrl: Fa
            } = Bt(V, ht),
            Ra = (Bi, Do) => E5(Bi, Do, qr == null ? void 0 : qr.nativeChat);
          if (!Oa) {
            alert(x("请先配置 API Key")), Me(!1);
            return;
          }
          const ui = [],
            pr = _r.filter(Bi => !Bi.hasError).length,
            In = fy.targetSizeBytes,
            fr = fy.maxSizePerImage,
            na = fy.maxDimension;
          if (console.log(`[CustomAgentNode] 图片压缩策略: ${pr}张图片, 目标大小${(In / 1024).toFixed(0)}KB, 上限${(fr / 1024).toFixed(0)}KB, 最大边${na}px`), mt.length > 0) for (let Bi = 0; Bi < _r.length; Bi++) {
            const Do = _r[Bi];
            if (Do.hasError) {
              console.warn(`[CustomAgentNode] Skipping failed image ${Bi}`);
              continue;
            }
            Do.isLoading && (console.log(`[CustomAgentNode] Waiting for image ${Bi} to load...`), await new Promise(ls => setTimeout(ls, 500)));
            let co = Do.originalUrl || Do.url;
            try {
              co = await x3(co, {
                useOss: de,
                targetSizeBytes: In,
                maxSizePerImage: fr,
                maxDimension: na,
                assetId: (pn = Gn[Bi]) == null ? void 0 : pn.assetId,
                purpose: "chat",
                apiKey: Oa,
                baseUrl: Fa,
                imageAsBase64: J
              }), console.log(`[CustomAgentNode] Image ${Bi + 1} processed (${tFn(co)}): ${typeof co == "string" ? co.slice(0, 96) : co}`);
            } catch (ls) {
              console.error(`[CustomAgentNode] Failed to process image ${Bi + 1}:`, ls);
              const Ms = ls instanceof Error ? ls.message : "图片处理失败";
              alert(x("图片{0}处理失败：{1}", Bi + 1, Ms)), Me(!1);
              return;
            }
            ui.push({
              type: "image_url",
              image_url: {
                url: co,
                detail: pr > 4 ? "low" : "high"
              }
            }), J && (await new Promise(ls => setTimeout(ls, 0)));
          }
          if (Xt.length > 0) {
            console.log(`[CustomAgentNode] 添加 ${Xt.length} 个视频到消息内容`);
            const Bi = Eb(V) || Eb(qr == null ? void 0 : qr.id) || Ny(Fa);
            for (let Do = 0; Do < Xt.length; Do++) {
              let co = Xt[Do];
              try {
                co = await Qj(co, {
                  useOss: de,
                  apiKey: Oa,
                  baseUrl: Fa,
                  assetId: (xr = rr[Do]) == null ? void 0 : xr.assetId,
                  forceInline: Bi && rqe(q)
                });
              } catch (ls) {
                console.error(`[CustomAgentNode] Failed to resolve video ${Do + 1} for API:`, ls);
                const Ms = ls instanceof Error ? ls.message : "视频上传失败";
                alert(x("视频{0}处理失败：{1}", Do + 1, Ms)), Me(!1);
                return;
              }
              ui.push(Bi ? Jae("video", co) : {
                type: "image_url",
                image_url: {
                  url: co,
                  detail: "high"
                }
              }), console.log(`[CustomAgentNode] 视频 ${Do + 1} 已添加: ${typeof co == "string" ? `${co.slice(0, 50)}...` : String(co)}`);
            }
          }
          const Ba = o5n(mr, 5e4, 35e3, 1e4);
          Ba.wasTruncated && console.warn(`[CustomAgentNode] 用户需求过长已截断: ${mr.length} → ${Ba.text.length}`);
          const ai = Mn,
            vi = Ba.text;
          let Vi = "";
          vi.trim() && (Vi = vi.trim()), qn && (Vi = `[参考媒体已提供: ${mt.length} 张图片${Xt.length > 0 ? `, ${Xt.length} 个视频` : ""}]

${Vi}`), ui.push({
            type: "text",
            text: Vi || "请分析提供的内容并生成执行方案。"
          });
          const Ti = (qr == null ? void 0 : qr.modelName) || V,
            Gi = ui.some(Bi => Bi.type === "image_url" || Bi.type === "video_url"),
            hi = Vi || "请分析提供的内容并生成执行方案。",
            vo = Ti.startsWith("gpt-5"),
            ci = ai || "You are an intelligent creative director. Analyze the provided content and create a detailed execution plan.";
          let ji;
          if (vo) {
            const Bi = `[指令要求]
${ci}

[用户输入]
${hi}`;
            console.log("[CustomAgentNode] GPT 5.x detected, merging system prompt into user message for model:", Ti), Gi ? ji = [{
              role: "user",
              content: ui.map((co, ls) => ls === ui.length - 1 && co.type === "text" ? {
                type: "text",
                text: Bi
              } : co)
            }] : ji = [{
              role: "user",
              content: Bi
            }];
          } else ji = [{
            role: "system",
            content: ci
          }, {
            role: "user",
            content: Gi ? ui : hi
          }];
          const ts = Xt.length > 0,
            Ts = 1 / 0,
            dc = 1 / 0,
            Tl = async () => {
              let Bi = ji,
                Do = ai,
                co = vi,
                ls = ui.filter(Xh => Xh.type === "image_url"),
                Ms = [],
                ks = !1,
                Yo = {
                  model: Ti,
                  messages: vo ? [{
                    role: "user",
                    content: Gi ? ui.map((Xh, Pp) => Pp === ui.length - 1 && Xh.type === "text" ? {
                      type: "text",
                      text: `[指令要求]
${Do}

[用户输入]
${co}`
                    } : Xh) : `[指令要求]
${Do}

[用户输入]
${co}`
                  }] : [{
                    role: "system",
                    content: Do
                  }, {
                    role: "user",
                    content: Gi ? ui : co
                  }],
                  max_tokens: 16e3,
                  temperature: .7,
                  stream: !0
                },
                Vc = i5n(Yo),
                zd = (Vc / 1024 / 1024).toFixed(2);
              return console.log(`[CustomAgentNode] 初始 payload 大小: ${zd}MB`), {
                requestBody: Yo,
                payloadSize: Vc,
                wasOptimized: ks,
                optimizationSteps: Ms
              };
            },
            {
              requestBody: Ml,
              payloadSize: sr,
              wasOptimized: da,
              optimizationSteps: la
            } = await Tl(),
            Ta = (sr / 1024 / 1024).toFixed(2);
          console.log(`[CustomAgentNode] 最终 payload 大小: ${Ta}MB (streaming模式)`);
          const Wa = !(qr != null && qr.nativeChat) && Kn && Y === "gemini-official",
            pi = U && wM(V),
            wi = F2(V, W, Ti);
          sx(Ml, wi), Ml.max_tokens = Lce(V, typeof Ml.model == "string" ? Ml.model : Ti, wi, Ml.max_tokens);
          const to = !(qr != null && qr.nativeChat) && T0t({
            useGeminiOfficial: Wa,
            webSearchEnabled: pi,
            hasMedia: Gi || ts
          });
          let Ho;
          const jo = (Bi, Do = "[CustomAgentNode]") => qS({
              response: Bi,
              format: Wa ? "gemini-official" : "openai",
              onDelta: Pt,
              onTruncated: ae,
              logPrefix: Do,
              onComplete: co => {
                Ho = co;
              }
            }),
            Ls = () => {
              var Bi;
              return Ra(qw(Fa), {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${Oa}`,
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(Ml),
                signal: (Bi = he.current) == null ? void 0 : Bi.signal
              });
            },
            Pl = await (async () => {
              var ls;
              let Bi,
                Do = !1;
              if (to) {
                const Ms = Ml.messages || ji,
                  ks = Vc => {
                    var zd;
                    return $i($Y(Fa), {
                      method: "POST",
                      headers: {
                        Authorization: `Bearer ${Oa}`,
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify(M0t({
                        modelName: Ti,
                        messages: Ms,
                        webSearch: Vc != null,
                        stream: !0,
                        toolType: Vc || "web_search_preview",
                        reasoningEffort: wi
                      })),
                      signal: (zd = he.current) == null ? void 0 : zd.signal
                    });
                  };
                console.log(`[CustomAgentNode] 跟随侧栏使用 Responses API${pi ? "（联网）" : ""}`);
                let Yo = await ks(pi ? "web_search_preview" : null);
                if (Yo.ok) Bi = Yo, Do = !0;else {
                  let Vc = await Yo.text().catch(() => ""),
                    zd = Yo.status,
                    Xh = !1;
                  if (pi && z2e(zd, Vc)) {
                    console.warn("[CustomAgentNode] 网关不识别 web_search_preview，重试 web_search...");
                    const Pp = await ks("web_search");
                    Pp.ok ? (Bi = Pp, Do = !0, Xh = !0) : (zd = Pp.status, Vc = await Pp.text().catch(() => ""));
                  }
                  if (!Xh) if (pi && F2e(zd, Vc)) console.warn("[CustomAgentNode] 联网工具不可用，Responses 改为无工具重试…"), Yo = await ks(null), Yo.ok ? (Bi = Yo, Do = !0) : (console.warn("[CustomAgentNode] Responses 失败，回退 chat/completions"), Bi = await Ls());else throw Vc && console.error("[CustomAgentNode] API error:", zd, Vc), new Error(Sv(zd));
                }
              } else Wa ? (console.log("[CustomAgentNode] 使用 Gemini 官方格式 streamGenerateContent"), Bi = await mx({
                format: "gemini-official",
                baseUrl: Fa,
                apiKey: Oa,
                modelName: Ti,
                messages: ji,
                signal: (ls = he.current) == null ? void 0 : ls.signal,
                stream: !0,
                reasoningEffort: wi
              })) : Bi = await Ls();
              if (!Bi) throw new Error(Sv(0));
              if (!Bi.ok) {
                const Ms = await Bi.text().catch(() => "");
                let ks = "";
                throw Bi.status === 413 ? ks = `网关拒绝了这次请求（HTTP 413）。本地正文约 ${Ta}MB，图片若是公网原图链接，网关拉取原图后会超出限制。

建议：
1. 减少连接的图片数量（当前 ${pr} 张，建议减少至 1-2 张）
2. 缩短元提示词或用户需求
3. 检查网络连接是否正常` : Bi.status === 429 ? ks = "API 请求频率过高，请稍后重试" : (Ms && console.error("[CustomAgentNode] API error:", Bi.status, Ms), ks = Sv(Bi.status)), new Error(ks);
              }
              let co = "";
              if (Do || Bi.url.includes("/v1/responses")) co = await P0t(Bi, Pt);else if (co = await jo(Bi), co.length > 0 && co.length < 50) console.warn(`[CustomAgentNode] 流式响应较短 (${co.length} 字符)，可能被截断`);else if (co.trim().startsWith("{") || co.trim().startsWith("[")) try {
                JSON.parse(co), ae(!1);
              } catch (Ms) {
                console.warn("[CustomAgentNode] JSON 格式验证失败，可能被截断:", Ms);
                const ks = (co.match(/\{/g) || []).length,
                  Yo = (co.match(/\}/g) || []).length,
                  Vc = (co.match(/\[/g) || []).length,
                  zd = (co.match(/\]/g) || []).length;
                (ks > Yo || Vc > zd) && ae(!0);
              }
              return co;
            })();
          if (!Pl.trim()) throw new Error($be(Ho));
          if (wa !== ue.current) return;
          const xl = {
            ...Qt.current,
            outputContent: Pl,
            modelStage1: V,
            modelStage2: L,
            isTruncated: ie,
            _agentRunning: !1
          };
          Qt.current = xl, n(e.id, {
            settings: xl
          }), at(Pl), Lr(Pl), console.log("[CustomAgentNode] Generation completed:", Pl);
        } catch (qr) {
          if (qr instanceof Error && qr.name === "AbortError") {
            console.log("[CustomAgentNode] Generation cancelled by user"), at();
            return;
          }
          console.error("[CustomAgentNode] Generation failed:", qr), at();
          const Oa = qr instanceof Error ? qr.message : "未知错误";
          let Fa = Oa;
          Oa.includes("Failed to fetch") || Oa.includes("ERR_CONNECTION") || Oa.includes("NetworkError") ? Fa = `网络连接失败（请求内容可能过大）。

建议：
1. 减少连接的图片数量（当前 ${_r.filter(ui => !ui.hasError).length} 张，建议减少至 1-2 张）
2. 缩短元提示词或用户需求
3. 检查网络连接是否正常` : (Oa.includes("请求内容过大") || Oa.includes("Payload")) && (Fa = Oa), alert(x(SU(Fa)));
        } finally {
          he.current === aa && (he.current = null), Me(!1), ((Nr = Qt.current) == null ? void 0 : Nr._agentRunning) !== !1 && n(e.id, {
            settings: {
              ...Qt.current,
              _agentRunning: !1
            }
          });
        }
      }, [e, _n, ar, ea, pa, Br, V, ht, Y, W, Kn, mt, Xt, qn, de, J, Gn, rr, Bt, n, Fe, U, Lr, Pt, at]),
      $t = Ia.useCallback(() => {
        ue.current += 1;
        const Et = he.current;
        he.current = null, Et == null || Et.abort(), at(), Me(!1);
        const zn = {
          ...Qt.current,
          _agentRunning: !1
        };
        Qt.current = zn, n(e.id, {
          settings: zn
        });
      }, [at, e.id, n]),
      je = g.useCallback(async () => {
        var Mn, or, mr, Yr, aa, wa, xa, Aa, pn;
        const Et = (((Mn = j.current) == null ? void 0 : Mn.value) ?? Vt).trim();
        if (!Et) {
          alert(x("请先生成内容后再续写"));
          return;
        }
        if (Mu(V)) {
          alert(x("Codex 模型请重新运行。续写仍使用 API 渠道模型。"));
          return;
        }
        Me(!0), ae(!1), Ne.current !== null && (cancelAnimationFrame(Ne.current), Ne.current = null), Te.current = null;
        const zn = new AbortController();
        he.current = zn;
        try {
          const xr = ((or = P.current) == null ? void 0 : or.value) ?? _n,
            Nr = ((mr = R.current) == null ? void 0 : mr.value) ?? ar;
          let qr = "";
          const Oa = [];
          xr.trim() && Oa.push(xr.trim()), ea.trim() && Oa.push(ea.trim()), Br.trim() && Oa.push(`[引用Agent输出]:
${Br.trim()}`), qr = Oa.join(`

`);
          let Fa = "";
          const Ra = [];
          Nr.trim() && Ra.push(Nr.trim()), pa.trim() && Ra.push(pa.trim()), Br.trim() && Ra.push(`[引用Agent输出]:
${Br.trim()}`), Fa = Ra.join(`

`);
          const {
              chatConfig: ui,
              apiKey: pr,
              baseUrl: In
            } = Bt(V, ht),
            fr = (Wa, pi) => E5(Wa, pi, ui == null ? void 0 : ui.nativeChat);
          if (!pr) {
            alert(x("请先配置 API Key")), Me(!1);
            return;
          }
          const na = [],
            Ba = _r.filter(Wa => !Wa.hasError).length,
            ai = fy.targetSizeBytes,
            vi = fy.maxSizePerImage,
            Vi = fy.maxDimension;
          if (mt.length > 0) for (let Wa = 0; Wa < _r.length; Wa++) {
            const pi = _r[Wa];
            if (pi.hasError) {
              console.warn(`[CustomAgentNode] Skipping failed image ${Wa}`);
              continue;
            }
            pi.isLoading && (console.log(`[CustomAgentNode] Waiting for image ${Wa} to load...`), await new Promise(to => setTimeout(to, 500)));
            let wi = pi.originalUrl || pi.url;
            try {
              wi = await x3(wi, {
                useOss: de,
                targetSizeBytes: ai,
                maxSizePerImage: vi,
                maxDimension: Vi,
                assetId: (Yr = Gn[Wa]) == null ? void 0 : Yr.assetId,
                purpose: "chat",
                apiKey: pr,
                baseUrl: In,
                imageAsBase64: J
              });
            } catch (to) {
              console.error(`[CustomAgentNode] [续写] Failed to process image ${Wa + 1}:`, to);
              continue;
            }
            na.push({
              type: "image_url",
              image_url: {
                url: wi,
                detail: Ba > 4 ? "low" : "high"
              }
            }), J && (await new Promise(to => setTimeout(to, 0)));
          }
          const Ti = (ui == null ? void 0 : ui.modelName) || V,
            Gi = Ti.startsWith("gpt-5"),
            hi = `${qr}

---

【续写指令】
你正在继续完成一个被截断的响应。用户已经提供了完整的上下文（包括元提示词、用户需求和图片），以及当前已生成的部分内容。

请从"当前已生成内容"的末尾无缝继续，完成剩余部分。

要求：
1. **无缝衔接**：从当前内容的最后一个字符或最后一个句子自然继续，不要重复已生成的内容
2. **保持格式**：如果当前内容是 JSON，请继续完成 JSON 结构；如果是文本，请继续文本内容
3. **保持风格**：保持与当前内容相同的风格和语调
4. **完成内容**：确保完成所有未完成的部分，特别是如果当前内容是 JSON，请补全所有缺失的字段和闭合括号
5. **参考上下文**：请参考用户提供的元提示词、用户需求和图片，确保续写的内容符合原始要求

如果当前内容是 JSON 且不完整，请：
- 补全缺失的字段值
- 添加缺失的闭合括号和方括号
- 确保 JSON 格式完整且有效
- 参考元提示词中的 JSON 结构要求

如果当前内容是文本，请：
- 继续完成未完成的句子或段落
- 保持逻辑连贯性
- 确保内容完整`,
            vo = na.length > 0,
            ci = `${Fa ? `[用户需求]
${Fa}

` : ""}[当前已生成内容（请从此处继续完成）]

${Et}`;
          vo && na.push({
            type: "text",
            text: ci
          });
          let ji;
          Gi ? (console.log("[CustomAgentNode] [续写] GPT 5.x detected, merging system prompt into user message"), vo ? ji = [{
            role: "user",
            content: na.map((pi, wi) => wi === na.length - 1 && pi.type === "text" ? {
              type: "text",
              text: `[指令要求]
${hi}

${ci}`
            } : pi)
          }] : ji = [{
            role: "user",
            content: `[指令要求]
${hi}

${ci}`
          }]) : ji = [{
            role: "system",
            content: hi
          }, {
            role: "user",
            content: vo ? na : ci
          }], console.log("[CustomAgentNode] [续写] 使用完整上下文继续生成:", {
            systemPromptLength: qr.length,
            userPromptLength: Fa.length,
            imageCount: na.filter(Wa => Wa.type === "image_url").length,
            currentOutputLength: Et.length
          });
          const ts = !(ui != null && ui.nativeChat) && Kn && Y === "gemini-official",
            Ts = U && wM(V),
            dc = F2(V, W, Ti),
            Tl = Lce(V, Ti, dc),
            Ml = !(ui != null && ui.nativeChat) && T0t({
              useGeminiOfficial: ts,
              webSearchEnabled: Ts,
              hasMedia: vo
            });
          let sr,
            da = !1;
          if (Ml) {
            const Wa = wi => {
              var to;
              return $i($Y(In), {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${pr}`,
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(M0t({
                  modelName: Ti,
                  messages: ji,
                  webSearch: wi != null,
                  stream: !0,
                  toolType: wi || "web_search_preview",
                  reasoningEffort: dc
                })),
                signal: (to = he.current) == null ? void 0 : to.signal
              });
            };
            console.log(`[CustomAgentNode] [续写] 跟随侧栏使用 Responses API${Ts ? "（联网）" : ""}`);
            let pi = await Wa(Ts ? "web_search_preview" : null);
            if (pi.ok) sr = pi, da = !0;else {
              let wi = await pi.text().catch(() => ""),
                to = pi.status,
                Ho = !1;
              if (Ts && z2e(to, wi)) {
                console.warn("[CustomAgentNode] [续写] 网关不识别 web_search_preview，重试 web_search...");
                const jo = await Wa("web_search");
                jo.ok ? (sr = jo, da = !0, Ho = !0) : (to = jo.status, wi = await jo.text().catch(() => ""));
              }
              if (!Ho) if (Ts && F2e(to, wi)) console.warn("[CustomAgentNode] [续写] 联网工具不可用，Responses 改为无工具重试…"), pi = await Wa(null), pi.ok ? (sr = pi, da = !0) : (console.warn("[CustomAgentNode] [续写] Responses 失败，回退 chat/completions"), sr = await fr(qw(In), {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${pr}`,
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(sx({
                  model: Ti,
                  messages: ji,
                  max_tokens: Tl,
                  temperature: .7,
                  stream: !0
                }, dc)),
                signal: (aa = he.current) == null ? void 0 : aa.signal
              }));else throw wi && console.error("[CustomAgentNode] API error:", to, wi), new Error(Sv(to));
            }
          } else ts ? sr = await mx({
            format: "gemini-official",
            baseUrl: In,
            apiKey: pr,
            modelName: Ti,
            messages: ji,
            signal: (wa = he.current) == null ? void 0 : wa.signal,
            stream: !0,
            reasoningEffort: dc
          }) : sr = await fr(qw(In), {
            method: "POST",
            headers: {
              Authorization: `Bearer ${pr}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(sx({
              model: Ti,
              messages: ji,
              max_tokens: Tl,
              temperature: .7,
              stream: !0
            }, dc)),
            signal: (xa = he.current) == null ? void 0 : xa.signal
          });
          if (!sr) throw new Error(Sv(0));
          if (!sr.ok) throw new Error(Sv(sr.status));
          let la = "";
          if (da || sr.url.includes("/v1/responses") ? la = await P0t(sr, Wa => Pt(Et + Wa)) : la = await qS({
            response: sr,
            format: ts ? "gemini-official" : "openai",
            onDelta: Wa => Pt(Et + Wa),
            onTruncated: ae,
            logPrefix: "[CustomAgentNode] [续写]"
          }), !la.trim()) {
            console.warn("[CustomAgentNode] [续写] 正文为空，自动重试一次");
            const Wa = ts ? await mx({
              format: "gemini-official",
              baseUrl: In,
              apiKey: pr,
              modelName: Ti,
              messages: ji,
              signal: (Aa = he.current) == null ? void 0 : Aa.signal,
              stream: !0,
              reasoningEffort: dc
            }) : await fr(qw(In), {
              method: "POST",
              headers: {
                Authorization: `Bearer ${pr}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify(sx({
                model: Ti,
                messages: ji,
                max_tokens: Tl,
                temperature: .7,
                stream: !0
              }, dc)),
              signal: (pn = he.current) == null ? void 0 : pn.signal
            });
            Wa.ok && (la = await qS({
              response: Wa,
              format: ts ? "gemini-official" : "openai",
              onDelta: pi => Pt(Et + pi),
              onTruncated: ae,
              logPrefix: "[CustomAgentNode] [续写重试]"
            }));
          }
          if (!la.trim()) throw new Error($be());
          const Ta = Et + la;
          n(e.id, {
            settings: {
              ...Qt.current,
              outputContent: Ta,
              modelStage1: V,
              modelStage2: L,
              isTruncated: ie
            }
          }), at(Ta), Lr(Ta), console.log("[CustomAgentNode] Continue generation completed");
        } catch (xr) {
          if (xr instanceof Error && xr.name === "AbortError") {
            console.log("[CustomAgentNode] Continue generation cancelled by user"), at();
            return;
          }
          console.error("[CustomAgentNode] Continue generation failed:", xr), at();
          const Nr = xr instanceof Error ? xr.message : "未知错误";
          alert(x(SU(Nr).replace(/^生成失败：/, "继续生成失败：")));
        } finally {
          he.current === zn && (he.current = null), Me(!1);
        }
      }, [Vt, V, ht, Y, W, Kn, _n, ar, ea, pa, Br, mt, _r, de, J, Gn, Bt, n, Lr, ie, Pt, at]),
      Qe = g.useCallback(async () => {
        var zn, Mn, or, mr, Yr;
        if (!Vt.trim()) {
          alert(x("请先生成内容"));
          return;
        }
        if (Mu(L)) {
          alert(x("洗稿请改用 API 渠道模型。Codex 模型请使用运行。"));
          return;
        }
        Me(!0);
        const Et = new AbortController();
        he.current = Et;
        try {
          const {
              chatConfig: aa,
              apiKey: wa,
              baseUrl: xa
            } = Bt(L, wt),
            Aa = (fr, na) => E5(fr, na, aa == null ? void 0 : aa.nativeChat);
          if (!wa) {
            alert(x("请先配置 API Key")), Me(!1);
            return;
          }
          const pn = (aa == null ? void 0 : aa.modelName) || L,
            xr = pn.startsWith("gpt-5"),
            Nr = F2(L, W, pn),
            qr = `你是一位专业的内容改写专家。请对用户提供的文本进行改写，要求：

1. **保持核心意思不变**：确保改写后的内容表达的核心思想、关键信息与原文完全一致
2. **改变表达方式**：使用不同的词汇、句式、结构来表达相同的内容
3. **保持专业性**：如果原文是专业内容（如分镜脚本、技术文档），改写后也要保持专业性
4. **保持格式**：如果原文有特定格式（如表格、列表、编号），改写后也要保持相同格式
5. **保持长度**：改写后的内容长度应与原文相近，不要过度精简或扩充
6. **自然流畅**：改写后的文本要读起来自然流畅，符合中文表达习惯

改写技巧：
- 同义词替换：使用意思相近的词汇
- 句式转换：主动句改被动句，或调整句子结构
- 顺序调整：在不影响逻辑的情况下调整内容顺序
- 细节丰富：适当增加描述性细节，但不改变核心意思

注意：不要添加原文没有的信息，也不要删除重要信息。`,
            Oa = `请改写以下内容，保持相同意思但换一种表达方式：

${Vt}`;
          let Fa;
          xr ? (console.log("[CustomAgentNode] GPT 5.x detected for refine, merging system prompt into user message"), Fa = [{
            role: "user",
            content: `[指令要求]
${qr}

[用户输入]
${Oa}`
          }]) : Fa = [{
            role: "system",
            content: qr
          }, {
            role: "user",
            content: Oa
          }];
          const Ra = !(aa != null && aa.nativeChat) && Wk(L, pn) && Y === "gemini-official",
            ui = Ra ? await mx({
              format: "gemini-official",
              baseUrl: xa,
              apiKey: wa,
              modelName: pn,
              messages: Fa,
              signal: (zn = he.current) == null ? void 0 : zn.signal,
              stream: !1,
              reasoningEffort: Nr
            }) : await Aa(qw(xa), {
              method: "POST",
              headers: {
                Authorization: `Bearer ${wa}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify(sx({
                model: pn,
                messages: Fa,
                max_tokens: 16e3,
                temperature: .7
              }, Nr)),
              signal: (Mn = he.current) == null ? void 0 : Mn.signal
            });
          if (!ui.ok) throw new Error(Sv(ui.status));
          const pr = await ui.json(),
            In = Ra ? PD(pr) : ((Yr = (mr = (or = pr.choices) == null ? void 0 : or[0]) == null ? void 0 : mr.message) == null ? void 0 : Yr.content) || "";
          if (!In) throw new Error($be());
          n(e.id, {
            settings: {
              ...Qt.current,
              outputContent: In
            }
          }), console.log("[CustomAgentNode] Content rewriting completed");
        } catch (aa) {
          if (aa instanceof Error && aa.name === "AbortError") {
            console.log("[CustomAgentNode] Content rewriting cancelled by user");
            return;
          }
          console.error("[CustomAgentNode] Content rewriting failed:", aa), alert(x("改写失败: {0}", aa instanceof Error ? aa.message : "未知错误"));
        } finally {
          he.current === Et && (he.current = null), Me(!1);
        }
      }, [Vt, L, wt, Y, Bt, n, e]);
    g.useCallback(async () => {
      var Et, zn, Mn, or, mr, Yr, aa, wa, xa, Aa, pn, xr, Nr, qr, Oa;
      if (!Vt.trim()) {
        alert(x("请先生成内容"));
        return;
      }
      if (!p || !f || !y) {
        console.warn("[CustomAgentNode] Missing required props for node creation");
        return;
      }
      Me(!0);
      try {
        const Fa = Vt,
          Ra = [/(?:shot|镜头|场景|scene)\s*[:\d]+/gi, /第[一二三四五六七八九十\d]+(?:镜|个镜头|场景)/gi, /\d+\.\s*(?:镜头|场景|shot)/gi, /\*\*\d+\*\*/g, /\|\s*\*\*\d+\*\*/g, /【镜头\s*\d+】/g, /镜头\s*\d+[:：]/g];
        let ui = 0;
        Ra.forEach(Ti => {
          const Gi = Fa.match(Ti);
          Gi && Gi.length > ui && (ui = Gi.length);
        }), console.log("[CustomAgentNode] Detected shot count:", ui);
        const pr = e.x + e.width + 100;
        let In = e.y;
        const fr = [],
          na = [],
          {
            chatConfig: Ba,
            apiKey: ai,
            baseUrl: vi
          } = Bt(V, ht),
          Vi = (Ti, Gi) => E5(Ti, Gi, Ba == null ? void 0 : Ba.nativeChat);
        if (!ai) throw new Error("请先配置 API Key");
        if (ui >= 3) {
          console.log("[CustomAgentNode] Creating storyboard node with LLM formatting...");
          try {
            const Ti = await Vi(qw(vi), {
              method: "POST",
              headers: {
                Authorization: `Bearer ${ai}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                model: (Ba == null ? void 0 : Ba.modelName) || V,
                messages: [{
                  role: "system",
                  content: `你是一位专业的分镜脚本格式化专家。请将用户提供的文本（可能是表格、列表或混乱文本）整理为规范的分镜表格式。

输出要求：
1. 每个镜头必须包含以下字段（用 | 分隔）：
   镜头编号 | 场景描述 | 镜头类型 | 运镜方式 | 时长

2. 格式示例：
   镜头1 | 极近特写男主角眼睛，紫色瞳孔，锐利眼神 | 特写 | 固定镜头 | 3s
   镜头2 | 中景镜头，极斗篷男人坐在未来王座上 | 中景 | 缓慢推进 | 5s

3. 镜头类型选项：特写、近景、中景、全景、远景
4. 运镜方式选项：固定镜头、推进、拉远、横移、跟随、旋转、升降、急剧变焦
5. 时长格式：Xs（如 3s, 5s, 10s）

6. 如果原文是表格格式（如 | **01** | 内容 |），请提取其中的关键信息
7. 如果原文没有明确的镜头类型或运镜，请根据场景描述智能推断
8. 每行一个镜头，不要添加额外的解释文字
9. 保持场景描述简洁清晰，突出视觉重点
10. 去除 HTML 标签（如 <br>）和 Markdown 格式（如 **）`
                }, {
                  role: "user",
                  content: `请将以下内容整理为规范的分镜表格式：

${Fa}`
                }],
                max_tokens: 16e3,
                temperature: .3
              })
            });
            if (!Ti.ok) throw new Error(`LLM 格式化失败: ${Ti.status}`);
            const hi = ((Mn = (zn = (Et = (await Ti.json()).choices) == null ? void 0 : Et[0]) == null ? void 0 : zn.message) == null ? void 0 : Mn.content) || Fa;
            console.log("[CustomAgentNode] Formatted storyboard content:", hi);
            const vo = [];
            hi.split(`
`).filter(ts => ts.trim()).forEach((ts, Ts) => {
              const dc = ts.split("|").map(Tl => Tl.trim());
              if (dc.length >= 5) {
                const Tl = f();
                vo.push({
                  id: Tl,
                  scene_number: "1",
                  shot_number: `${Ts + 1}`,
                  shot_type: dc[2] || "中景",
                  camera_angle: "平视",
                  camera_movement: dc[3] || "固定镜头",
                  description: dc[1] || "",
                  dialogue: "",
                  sound_effects: "",
                  duration: dc[4] || "5s",
                  image_url: "",
                  video_url: "",
                  status: "draft",
                  model: "sora-2",
                  ratio: "16:9",
                  prompt: dc[1] || ""
                });
              } else if (ts.includes("镜头") || ts.includes("Shot")) {
                const Tl = f();
                vo.push({
                  id: Tl,
                  scene_number: "1",
                  shot_number: `${Ts + 1}`,
                  shot_type: "中景",
                  camera_angle: "平视",
                  camera_movement: "固定镜头",
                  description: ts,
                  dialogue: "",
                  sound_effects: "",
                  duration: "5s",
                  image_url: "",
                  video_url: "",
                  status: "draft",
                  model: "sora-2",
                  ratio: "16:9",
                  prompt: ts
                });
              }
            }), console.log("[CustomAgentNode] Parsed shots:", vo);
            const ji = {
              id: f(),
              type: "storyboard-node",
              x: pr,
              y: In,
              width: 600,
              height: 500,
              prompt: hi,
              settings: {
                shots: vo,
                projectTitle: "智能分镜表"
              },
              shots: vo
            };
            fr.push(ji), na.push({
              id: f(),
              from: e.id,
              to: ji.id
            });
          } catch (Ti) {
            console.error("[CustomAgentNode] LLM formatting failed:", Ti);
            const Gi = {
              id: f(),
              type: "storyboard-node",
              x: pr,
              y: In,
              width: 600,
              height: 500,
              prompt: Fa,
              settings: {
                projectTitle: "智能分镜表"
              },
              shots: []
            };
            fr.push(Gi), na.push({
              id: f(),
              from: e.id,
              to: Gi.id
            });
          }
        } else if (ui >= 1 && ui <= 2) {
          console.log("[CustomAgentNode] Creating individual video nodes with LLM extraction...");
          try {
            const Ti = await Vi(qw(vi), {
              method: "POST",
              headers: {
                Authorization: `Bearer ${ai}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                model: (Ba == null ? void 0 : Ba.modelName) || V,
                messages: [{
                  role: "system",
                  content: `你是一位专业的视频提示词提取专家。请从用户提供的文本中提取每个镜头的描述，并转换为适合 AI 视频生成的提示词。

输出要求：
1. 每个镜头一行，使用 "---" 分隔
2. 每行只包含该镜头的视觉描述，去除多余的说明文字
3. 提示词要简洁、清晰、突出视觉重点
4. 不要添加镜头编号或额外的解释

格式示例：
极近特写男主角眼睛，紫色瞳孔，锐利眼神，暗黑风格
---
中景镜头，男人坐在未来王座上，穿着黑色斗篷，赛博朋克风格`
                }, {
                  role: "user",
                  content: `请从以下内容中提取每个镜头的视频生成提示词：

${Fa}`
                }],
                max_tokens: 16e3,
                temperature: .3
              })
            });
            if (!Ti.ok) throw new Error(`LLM 提取失败: ${Ti.status}`);
            const hi = ((Yr = (mr = (or = (await Ti.json()).choices) == null ? void 0 : or[0]) == null ? void 0 : mr.message) == null ? void 0 : Yr.content) || Fa;
            console.log("[CustomAgentNode] Extracted prompts:", hi), hi.split("---").map(ci => ci.trim()).filter(ci => ci.length > 0).slice(0, 2).forEach((ci, ji) => {
              const ts = {
                id: f(),
                type: "gen-video",
                x: pr,
                y: In + ji * 450,
                width: 320,
                height: 420,
                prompt: ci,
                settings: {
                  modelId: "sora-2",
                  ratio: "16:9",
                  duration: "5s"
                }
              };
              fr.push(ts), na.push({
                id: f(),
                from: e.id,
                to: ts.id
              });
            });
          } catch (Ti) {
            console.error("[CustomAgentNode] LLM extraction failed:", Ti), Fa.split(`
`).filter(hi => hi.trim() && (hi.includes("镜头") || hi.includes("Shot") || hi.includes("场景"))).slice(0, 2).forEach((hi, vo) => {
              const ci = hi.replace(/^(?:镜头|Shot|场景)\s*\d*\s*[:：]?\s*/i, "").trim(),
                ji = {
                  id: f(),
                  type: "gen-video",
                  x: pr,
                  y: In + vo * 450,
                  width: 320,
                  height: 420,
                  prompt: ci || Fa,
                  settings: {
                    modelId: "sora-2",
                    ratio: "16:9",
                    duration: "5s"
                  }
                };
              fr.push(ji), na.push({
                id: f(),
                from: e.id,
                to: ji.id
              });
            });
          }
        } else {
          console.log("[CustomAgentNode] No clear shot structure, using LLM to analyze content type...");
          try {
            const Ti = await Vi(qw(vi), {
              method: "POST",
              headers: {
                Authorization: `Bearer ${ai}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                model: (Ba == null ? void 0 : Ba.modelName) || V,
                messages: [{
                  role: "system",
                  content: `你是一位专业的内容分析专家。请判断用户提供的文本内容是关于图片设计还是视频设计。

判断标准：
1. **图片内容**的特征：
   - 描述静态场景、画面、构图
   - 强调光影、色彩、质感、氛围
   - 使用"场景"、"画面"、"构图"、"静态"等词汇
   - 描述多个独立的场景设计方案
   - 强调产品摄影、视觉设计、平面设计

2. **视频内容**的特征：
   - 描述动态过程、运镜、镜头运动
   - 强调时间流程、动作、转场
   - 使用"推进"、"拉远"、"跟随"、"旋转"等运镜词汇
   - 描述连续的故事情节或动作序列
   - 强调视频拍摄、动画制作

输出要求：
- 只输出一个词："图片" 或 "视频"
- 不要添加任何解释或额外文字`
                }, {
                  role: "user",
                  content: `请判断以下内容是关于图片设计还是视频设计：

${Fa.substring(0, 1e3)}`
                }],
                max_tokens: 10,
                temperature: .1
              })
            });
            if (!Ti.ok) throw new Error(`LLM 判断失败: ${Ti.status}`);
            const Gi = await Ti.json(),
              hi = (((xa = (wa = (aa = Gi.choices) == null ? void 0 : aa[0]) == null ? void 0 : wa.message) == null ? void 0 : xa.content) || "").trim().toLowerCase();
            console.log("[CustomAgentNode] LLM detected content type:", hi), console.log("[CustomAgentNode] Full LLM response:", (xr = (pn = (Aa = Gi.choices) == null ? void 0 : Aa[0]) == null ? void 0 : pn.message) == null ? void 0 : xr.content);
            const vo = hi.includes("图片") || hi.includes("图像") || hi.includes("image") || hi.includes("picture") || hi.includes("photo") || Fa.includes("场景") && Fa.includes("画面"),
              ci = hi.includes("视频") || hi.includes("video") || hi.includes("动画");
            if (console.log("[CustomAgentNode] isImage:", vo, "isVideo:", ci), vo || !ci && Fa.includes("场景")) {
              console.log("[CustomAgentNode] Creating image nodes with LLM extraction...");
              try {
                const ji = await Vi(qw(vi), {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${ai}`,
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    model: (Ba == null ? void 0 : Ba.modelName) || V,
                    messages: [{
                      role: "system",
                      content: `你是一位专业的图片提示词提取专家。请从用户提供的文本中提取每个场景的图片生成提示词。

输出要求：
1. **识别文本中所有的场景**（可能是5个、10个、20个或更多）
2. 每个场景一行，使用 "---" 分隔
3. 每行只包含该场景的视觉描述，适合 AI 图片生成
4. 提示词要简洁、清晰、突出视觉重点
5. 包含关键元素：主体、环境、风格、光影、色彩
6. 不要添加场景编号或额外的解释
7. **重要**：如果场景描述中提到产品或主体物品，在提示词末尾标注 [参考:图一]
8. 如果场景描述中明确提到参考其他图片（如"图二"、"参考场景"），在提示词末尾标注对应的引用（如 [参考:图二]）

格式示例：
极简风格产品摄影，金属质感风扇，暗黑背景，聚光灯打光，高级感 [参考:图一]
---
未来科技场景，风扇悬浮在沙漠中，外星地表风格，微光照明 [参考:图一] [参考:图二]
---
极简沙漠场景，风扇立在沙丘上，日落光影，温暖色调 [参考:图一]
---
水下场景，风扇在清澈水中，气泡环绕，蓝色调 [参考:图一]

注意：
- 提取文本中所有的场景，不要遗漏
- 大部分场景都应该包含产品（图一），除非场景描述明确不需要产品
- 保持原文的场景顺序`
                    }, {
                      role: "user",
                      content: `请从以下内容中提取所有场景的图片生成提示词（不要遗漏任何场景）：

${Fa}`
                    }],
                    max_tokens: 16e3,
                    temperature: .7
                  })
                });
                if (!ji.ok) {
                  const Tl = await ji.text();
                  throw console.error("[CustomAgentNode] LLM extraction API error:", ji.status, Tl), new Error(`LLM 提取失败: ${ji.status}`);
                }
                const Ts = ((Oa = (qr = (Nr = (await ji.json()).choices) == null ? void 0 : Nr[0]) == null ? void 0 : qr.message) == null ? void 0 : Oa.content) || "";
                console.log("[CustomAgentNode] Extracted image prompts:", Ts), console.log("[CustomAgentNode] Connected images count:", mt.length), console.log("[CustomAgentNode] Connections to this node:", r.filter(Tl => Tl.to === e.id));
                const dc = Ts.split("---").map(Tl => Tl.trim()).filter(Tl => Tl.length > 0);
                if (console.log(`[CustomAgentNode] Parsed ${dc.length} scenes from LLM response`), dc.length === 0) throw new Error("LLM 未返回有效的场景提示词");
                dc.forEach((Tl, Ml) => {
                  const sr = Tl.match(/\[参考[:：]?图([一二三四五六1-6])\]/g) || [];
                  let da = Tl.replace(/\[参考[:：]?图[一二三四五六1-6]\]/g, "").trim();
                  console.log(`[CustomAgentNode] Scene ${Ml + 1}: Found ${sr.length} references:`, sr);
                  const la = {
                    id: f(),
                    type: "gen-image",
                    x: pr + Ml % 3 * 340,
                    y: In + Math.floor(Ml / 3) * 360,
                    width: 320,
                    height: 340,
                    prompt: da,
                    settings: {
                      modelId: "nano-banana",
                      ratio: "1:1"
                    }
                  };
                  if (fr.push(la), na.push({
                    id: f(),
                    from: e.id,
                    to: la.id
                  }), sr.length > 0 && mt.length > 0) {
                    const Ta = r.filter(Wa => Wa.to === e.id);
                    console.log(`[CustomAgentNode] Scene ${Ml + 1}: Input image connections:`, Ta.length), sr.forEach(Wa => {
                      const pi = Wa.match(/图([一二三四五六1-6])/);
                      if (!pi) return;
                      const wi = pi[1],
                        Ho = ({
                          一: 1,
                          二: 2,
                          三: 3,
                          四: 4,
                          五: 5,
                          六: 6,
                          1: 1,
                          2: 2,
                          3: 3,
                          4: 4,
                          5: 5,
                          6: 6
                        }[wi] || 1) - 1;
                      if (console.log(`[CustomAgentNode] Scene ${Ml + 1}: Processing reference 图${wi}, imageIndex=${Ho}`), Ho >= 0 && Ho < Ta.length) {
                        const jo = Ta[Ho].from;
                        console.log(`[CustomAgentNode] Connecting source node ${jo} to image node ${la.id}`), na.push({
                          id: f(),
                          from: jo,
                          to: la.id,
                          inputType: "default"
                        }), console.log(`[CustomAgentNode] ✅ Connected reference image ${Ho + 1} (图${wi}) to scene ${Ml + 1}`);
                      } else console.warn(`[CustomAgentNode] ⚠️ Image index ${Ho} out of range (have ${Ta.length} connections)`);
                    });
                  } else sr.length > 0 && console.warn(`[CustomAgentNode] ⚠️ Scene ${Ml + 1}: References detected but no connected images`);
                });
              } catch (ji) {
                console.error("[CustomAgentNode] LLM extraction failed:", ji);
                const ts = Fa.replace(/^(?:生成|创建|画|绘制|请|帮我).*?[:：]\s*/gm, "").replace(/\d+\s*[张幅个]\s*(?:图片|图像|画面)\s*[:：]?\s*/gi, "").replace(/^[#\-*]\s*/gm, "").trim();
                for (let Ts = 0; Ts < 5; Ts++) {
                  const dc = {
                    id: f(),
                    type: "gen-image",
                    x: pr + Ts % 3 * 340,
                    y: In + Math.floor(Ts / 3) * 360,
                    width: 320,
                    height: 340,
                    prompt: ts,
                    settings: {
                      modelId: "nano-banana",
                      ratio: "1:1"
                    }
                  };
                  fr.push(dc), na.push({
                    id: f(),
                    from: e.id,
                    to: dc.id
                  });
                }
              }
            } else if (ci) {
              console.log("[CustomAgentNode] Creating video node");
              let ji = Fa.replace(/^(?:生成|创建|制作|请|帮我).*?[:：]\s*/gm, "").replace(/视频\s*[:：]?\s*/gi, "").replace(/^[#\-*]\s*/gm, "").trim();
              const ts = {
                id: f(),
                type: "gen-video",
                x: pr,
                y: In,
                width: 320,
                height: 420,
                prompt: ji,
                settings: {
                  modelId: "sora-2",
                  ratio: "16:9",
                  duration: "5s"
                }
              };
              fr.push(ts), na.push({
                id: f(),
                from: e.id,
                to: ts.id
              });
            } else {
              console.log("[CustomAgentNode] Creating text node (default)");
              const ji = {
                id: f(),
                type: "text-node",
                x: pr,
                y: In,
                width: 300,
                height: 200,
                prompt: Fa,
                settings: {
                  text: Fa
                }
              };
              fr.push(ji), na.push({
                id: f(),
                from: e.id,
                to: ji.id
              });
            }
          } catch (Ti) {
            console.error("[CustomAgentNode] LLM content type detection failed:", Ti);
            const Gi = /场景|画面|构图|光影|色彩|质感/i.test(Fa),
              hi = /运镜|推进|拉远|跟随|旋转|镜头运动/i.test(Fa);
            if (Gi && !hi) {
              console.log("[CustomAgentNode] Fallback: Creating 5 image nodes based on keywords");
              const vo = Fa.replace(/^(?:你好|我是|仔细观察).*?[:：]\s*/gm, "").replace(/^[#\-*]\s*/gm, "").substring(0, 500).trim();
              for (let ci = 0; ci < 5; ci++) {
                const ji = {
                  id: f(),
                  type: "gen-image",
                  x: pr + ci % 3 * 340,
                  y: In + Math.floor(ci / 3) * 360,
                  width: 320,
                  height: 340,
                  prompt: vo,
                  settings: {
                    modelId: "nano-banana",
                    ratio: "1:1"
                  }
                };
                if (fr.push(ji), na.push({
                  id: f(),
                  from: e.id,
                  to: ji.id
                }), ci < 2 && mt.length > ci) {
                  const ts = r.filter(Ts => Ts.to === e.id);
                  if (ts.length > ci) {
                    const Ts = ts[ci].from;
                    na.push({
                      id: f(),
                      from: Ts,
                      to: ji.id,
                      inputType: "default"
                    }), console.log(`[CustomAgentNode] Fallback: Connected reference image ${ci + 1} to image node ${ci + 1}`);
                  }
                }
              }
            } else {
              const vo = {
                id: f(),
                type: "text-node",
                x: pr,
                y: In,
                width: 300,
                height: 200,
                prompt: Fa,
                settings: {
                  text: Fa
                }
              };
              fr.push(vo), na.push({
                id: f(),
                from: e.id,
                to: vo.id
              });
            }
          }
        }
        fr.length > 0 && (p(Ti => [...Ti, ...fr]), m && na.length > 0 && m(Ti => [...Ti, ...na]), console.log("[CustomAgentNode] Smart dispatch completed:", {
          nodesCreated: fr.length,
          connectionsCreated: na.length,
          types: fr.map(Ti => Ti.type)
        }));
      } catch (Fa) {
        console.error("[CustomAgentNode] Smart dispatch failed:", Fa), alert(x("智能分发失败: {0}", Fa instanceof Error ? Fa.message : "未知错误"));
      } finally {
        Me(!1);
      }
    }, [Vt, e, p, m, f, y, r, V, ht, Bt]);
    const Mt = Ia.useRef(0),
      cn = Ia.useRef(!1);
    Ia.useEffect(() => {
      var zn;
      const Et = (zn = e.settings) == null ? void 0 : zn._executeTrigger;
      if (!cn.current) {
        cn.current = !0, Et && (Mt.current = Et);
        return;
      }
      Et && Et !== Mt.current && !Fe && (Mt.current = Et, console.log("[CustomAgentNode] 检测到外部执行触发，开始执行:", e.id), setTimeout(() => {
        Hn();
      }, 100));
    }, [(Sr = e.settings) == null ? void 0 : Sr._executeTrigger, Hn, e.id, Fe]);
    const Qn = !!((Bn = e.settings) != null && Bn.isCollapsed),
      Lt = 800,
      ct = 620,
      Dt = 268,
      bn = Et => Et ? 116 : 92,
      Rt = g.useCallback(() => {
        var Mn, or, mr;
        const Et = !Qn,
          zn = !!((Mn = e.settings) != null && Mn.hasCustomSize);
        if (Et) {
          const Yr = mt.length > 0 || Xt.length > 0,
            aa = bn(Yr),
            wa = zn && e.settings.savedNodeHeight != null ? e.settings.savedNodeHeight : e.height || Lt,
            xa = zn && e.settings.savedNodeWidth != null ? e.settings.savedNodeWidth : e.width || ct;
          n(e.id, {
            width: Dt,
            height: aa,
            settings: {
              ...(e.settings || {}),
              isCollapsed: !0,
              _expandedHeight: wa,
              _expandedWidth: xa,
              savedNodeHeight: aa,
              ...(zn ? {
                savedNodeWidth: Dt
              } : {})
            }
          });
        } else {
          const Yr = ((or = e.settings) == null ? void 0 : or._expandedHeight) || Lt,
            aa = ((mr = e.settings) == null ? void 0 : mr._expandedWidth) || ct,
            wa = Math.max(Yr, 400);
          n(e.id, {
            width: aa,
            height: wa,
            settings: {
              ...(e.settings || {}),
              isCollapsed: !1,
              savedNodeHeight: zn ? wa : void 0,
              ...(zn ? {
                savedNodeWidth: aa
              } : {})
            }
          });
        }
      }, [Qn, e.id, e.height, e.width, e.settings, n, mt.length, Xt.length]);
    g.useEffect(() => {
      if (!Qn || Yi()) return;
      const Et = mt.length > 0 || Xt.length > 0,
        zn = bn(Et);
      e.height !== zn && n(e.id, {
        height: zn,
        settings: {
          ...e.settings,
          savedNodeHeight: zn
        }
      });
    }, [Qn, mt.length, Xt.length]), g.useEffect(() => {
      var zn, Mn, or;
      if (!Qn || Yi()) return;
      const Et = (zn = e.settings) != null && zn.hasCustomSize && e.settings.savedNodeWidth != null ? e.settings.savedNodeWidth : e.width;
      if (typeof Et == "number" && Et > Dt + 8) {
        const mr = !!((Mn = e.settings) != null && Mn.hasCustomSize);
        n(e.id, {
          width: Dt,
          settings: {
            ...(e.settings || {}),
            ...(mr ? {
              savedNodeWidth: Dt
            } : {}),
            ...(((or = e.settings) == null ? void 0 : or._expandedWidth) == null ? {
              _expandedWidth: Et
            } : {})
          }
        });
      }
    }, [Qn, e.id, e.width, e.settings]);
    const fn = Kn || Mxe({
      modelId: V,
      url: un == null ? void 0 : un.url,
      hasVideo: Xt.length > 0
    }) || en || et || wM(V) || !ce && X || ce || de;
    if (Qn) {
      const Et = mt.length > 0 || Xt.length > 0;
      return c.jsxs("div", {
        "data-node-edge-chrome": "true",
        "data-agent-card": "",
        className: `relative w-full h-full flex flex-col pointer-events-auto rounded-2xl overflow-visible px-2.5 py-2 gap-1.5 justify-center ${t ? "bg-[#1f1f1f]/95 border border-zinc-800/80" : "bg-transparent"}`,
        children: [Et && c.jsxs("div", {
          className: "flex items-center gap-1.5 shrink-0 min-w-0",
          children: [c.jsx("div", {
            className: "flex -space-x-1.5 items-center min-w-0 overflow-hidden",
            children: ki.map((zn, Mn) => {
              var or;
              return c.jsxs("div", {
                className: `relative shrink-0 w-6 h-6 rounded-full border-2 overflow-hidden ${t ? "border-zinc-900/95 bg-zinc-800" : "border-white bg-zinc-200"}`,
                style: {
                  zIndex: ki.length - Mn
                },
                children: [c.jsx(ZQ, {
                  rawUrl: zn.rawUrl,
                  displaySrc: zn.displaySrc,
                  mediaType: zn.mediaType,
                  sourceNode: zn.sourceNode,
                  alt: "",
                  className: "h-full w-full object-cover",
                  isDark: t,
                  isLoading: zn.isLoading,
                  useThumbnail: !0,
                  preferConstantDisplay: !0,
                  blobRecoveryAssetIds: zn.assetId ? [zn.assetId] : void 0
                }), zn.mediaType === "video" && c.jsx("div", {
                  className: "pointer-events-none absolute bottom-0 right-0 z-[2] flex h-3 w-3 items-center justify-center rounded-full bg-black/80 ring-1 ring-white/50",
                  children: c.jsx(Ol, {
                    size: 5,
                    className: "ml-px text-white",
                    fill: "white"
                  })
                })]
              }, Eae({
                idx: Mn,
                sourceNodeId: (or = zn.sourceNode) == null ? void 0 : or.id,
                assetId: zn.assetId
              }));
            })
          }), c.jsxs("span", {
            className: `text-[9px] shrink-0 ${t ? "text-zinc-500" : "text-zinc-400"}`,
            children: [mt.length + Xt.length, Xt.length > 0 ? x(" 个") : x(" 张")]
          })]
        }), !Et && c.jsx("div", {
          className: "shrink-0 h-3.5",
          "aria-hidden": "true"
        }), c.jsxs("div", {
          className: "flex flex-col gap-1.5 shrink-0 min-w-0",
          children: [c.jsx(Th, {
            scopeId: e.id,
            dropdownType: "agent-model-collapsed",
            value: V,
            models: N,
            isDark: t,
            activeDropdown: M,
            setActiveDropdown: T,
            onSelect: rn,
            showChannelBar: !0,
            menuPlacement: "below",
            menuMaxHeight: 360,
            buttonTitle: "元提示词预览模型",
            className: "w-full !flex-none"
          }), c.jsxs("div", {
            className: "flex items-center gap-1.5",
            children: [c.jsxs("button", {
              onClick: Hn,
              disabled: Fe,
              className: `flex-1 min-w-0 justify-center px-2 py-1.5 text-[10px] rounded flex items-center gap-1 transition-colors ${Fe ? "bg-zinc-600 text-zinc-400 cursor-not-allowed" : t ? "bg-transparent hover:bg-white/5 text-zinc-200" : "bg-black hover:bg-[#1f1f1f] text-white"}`,
              onMouseDown: zn => zn.stopPropagation(),
              title: x("运行"),
              children: [Fe ? c.jsx(Ua, {
                size: 12,
                className: "animate-spin"
              }) : c.jsx(Ol, {
                size: 12
              }), c.jsx("span", {
                children: x("运行")
              })]
            }), Fe && c.jsxs("button", {
              onClick: $t,
              className: `shrink-0 px-2 py-1.5 text-[10px] rounded flex items-center gap-1 transition-colors ${t ? "bg-zinc-700 text-zinc-400 hover:bg-red-900/50 hover:text-red-400" : "bg-zinc-200 text-zinc-600 hover:bg-red-100 hover:text-red-600"}`,
              onMouseDown: zn => zn.stopPropagation(),
              title: x("取消生成"),
              children: [c.jsx(Na, {
                size: 12
              }), c.jsx("span", {
                children: x("取消")
              })]
            }), c.jsx("button", {
              onClick: Rt,
              className: `shrink-0 p-1 rounded transition-colors ${t ? "text-zinc-500 hover:bg-zinc-700 hover:text-zinc-300" : "text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700"}`,
              onMouseDown: zn => zn.stopPropagation(),
              title: x("展开节点"),
              children: c.jsx(Wm, {
                size: 14
              })
            })]
          })]
        })]
      });
    }
    const Zt = !!(v && v !== e.id);
    return c.jsx("div", {
      "data-agent-card": "",
      className: `relative w-full h-full flex flex-col transition-colors pointer-events-auto rounded-2xl overflow-hidden ${t ? "bg-[#1c1c1c]" : "bg-transparent"}`,
      children: c.jsxs("div", {
        className: "flex-1 min-h-0 flex flex-col overflow-hidden",
        children: [c.jsxs("div", {
          className: "flex-1 px-4 pt-3 pb-2 flex flex-col gap-4 overflow-y-auto rh-scroll-minimal overflow-x-visible",
          children: [c.jsxs("div", {
            className: "flex flex-col gap-2 relative",
            "data-agent-wire-drop-section": "agent_meta_prompt",
            onMouseUpCapture: Et => ir(Et, "agent_meta_prompt"),
            children: [Zt && c.jsx("div", {
              className: "agent-wire-drop-capture",
              "aria-hidden": !0,
              onMouseUpCapture: Et => ir(Et, "agent_meta_prompt")
            }), c.jsxs("div", {
              className: "flex items-center justify-between gap-2 min-w-0",
              children: [c.jsx("div", {
                className: "agent-wire-drop-row-host relative flex items-center shrink-0 min-w-0 gap-1",
                children: c.jsxs("div", {
                  className: `agent-input-port-row relative flex items-center min-w-0 gap-1.5${Zt ? " agent-input-port-row--linking" : ""}`,
                  "data-input-type": "agent_meta_prompt",
                  "data-agent-wire-drop-row": "agent_meta_prompt",
                  onMouseUpCapture: Et => {
                    v && v !== e.id && Kr(Et, "agent_meta_prompt");
                  },
                  children: [c.jsx("div", {
                    className: "agent-input-port-dot-hit",
                    title: x("元提示词输入 - 可连接多个文字/Agent节点，按连接顺序拼接"),
                    "data-input-type": "agent_meta_prompt",
                    onMouseDown: Et => Jr(Et, "agent_meta_prompt"),
                    onMouseUpCapture: Et => Kr(Et, "agent_meta_prompt"),
                    onContextMenu: Et => Et.preventDefault(),
                    children: c.jsx("div", {
                      className: `agent-input-port-dot-visual transition-colors ${zr ? "bg-green-500" : t ? "bg-zinc-600 hover:bg-zinc-500" : "bg-zinc-400 hover:bg-zinc-500"}`
                    })
                  }), c.jsxs("button", {
                    type: "button",
                    className: `inline-flex items-center gap-0.5 border-0 bg-transparent p-0 text-left text-[11px] font-medium tracking-wide${Zt ? " pointer-events-none select-none" : ""} ${t ? "text-zinc-400 hover:text-zinc-200" : "text-zinc-500 hover:text-zinc-800"}`,
                    onClick: Et => {
                      Et.stopPropagation(), nt(zn => !zn);
                    },
                    onMouseDown: Et => Et.stopPropagation(),
                    title: x(rt ? "收起元提示词" : "展开元提示词"),
                    "aria-expanded": rt,
                    children: [c.jsx("span", {
                      title: x("元提示词：设定 AI 的身份、风格与规则"),
                      children: x("角色设定")
                    }), rt ? c.jsx(j2, {
                      size: 10
                    }) : c.jsx(Mi, {
                      size: 10
                    }), An.length > 0 && c.jsxs("span", {
                      className: `ml-1.5 text-[9px] font-normal ${t ? "text-zinc-500" : "text-zinc-400"}`,
                      title: x("已连接{0}个节点{1}，按顺序拼接", An.length, Wr ? "，含Agent" : ""),
                      children: ["· ", An.length, x(" 个连接")]
                    })]
                  })]
                })
              }), c.jsx("div", {
                className: "qiaodoumayi-aux-gen-toolbar relative z-[200] flex min-h-[28px] min-w-0 flex-1 items-center justify-end gap-0.5 overflow-visible",
                "data-node-header-toolbar": !0,
                children: c.jsxs("div", {
                  className: "qiaodoumayi-aux-gen-params flex min-w-0 flex-nowrap items-center gap-0.5 overflow-visible",
                  children: [c.jsx(Th, {
                    scopeId: e.id,
                    dropdownType: "agent-model-stage1",
                    value: V,
                    models: N,
                    isDark: t,
                    activeDropdown: M,
                    setActiveDropdown: T,
                    onSelect: rn,
                    showChannelBar: !0,
                    menuPlacement: "below",
                    menuAlign: "end",
                    menuMaxHeight: 360,
                    leadingIcon: c.jsx(b5e, {
                      size: 13,
                      className: "shrink-0 opacity-80"
                    }),
                    className: "!flex-none shrink-0 min-w-0 max-w-[11rem]"
                  }), fn ? c.jsxs("button", {
                    type: "button",
                    onClick: () => Le(Et => !Et),
                    className: "inline-flex shrink-0 items-center gap-1 whitespace-nowrap",
                    onMouseDown: Et => Et.stopPropagation(),
                    title: x(ze ? "收起模型参数" : "展开模型参数"),
                    "aria-expanded": ze,
                    children: [c.jsx("span", {
                      children: x("参数")
                    }), ze ? c.jsx(j2, {
                      size: 10
                    }) : c.jsx(Mi, {
                      size: 10
                    })]
                  }) : null, c.jsxs("button", {
                    type: "button",
                    onClick: () => $e(!Re),
                    className: "inline-flex shrink-0 items-center gap-1 whitespace-nowrap",
                    onMouseDown: Et => Et.stopPropagation(),
                    title: x("常用提示词库"),
                    children: [c.jsx("span", {
                      children: x("词库")
                    }), Re ? c.jsx(j2, {
                      size: 10
                    }) : c.jsx(Mi, {
                      size: 10
                    })]
                  }), c.jsxs("button", {
                    type: "button",
                    onClick: () => {
                      Xe(!Ke), Ke || He(vp());
                    },
                    className: "inline-flex shrink-0 items-center gap-1 whitespace-nowrap",
                    onMouseDown: Et => Et.stopPropagation(),
                    title: x("本地缓存来自对话保存；本地浏览直接读取电脑文件夹中的 .md，不写入缓存"),
                    children: [c.jsx("span", {
                      children: "Skill"
                    }), Ke ? c.jsx(j2, {
                      size: 10
                    }) : c.jsx(Mi, {
                      size: 10
                    })]
                  }), c.jsx("button", {
                    type: "button",
                    onClick: Et => {
                      Et.stopPropagation(), Rt();
                    },
                    onPointerDown: Et => Et.stopPropagation(),
                    onMouseDown: Et => Et.stopPropagation(),
                    className: "relative z-10 inline-flex shrink-0 items-center justify-center !px-1.5",
                    title: x("折叠节点"),
                    "aria-label": x("折叠节点"),
                    children: c.jsx(AT, {
                      size: 12
                    })
                  })]
                })
              })]
            }), ze && fn ? c.jsx("div", {
              className: "qiaodoumayi-aux-gen-toolbar flex min-h-[28px] flex-wrap items-center gap-0.5",
              "data-node-header-toolbar": !0,
              onMouseDown: Et => Et.stopPropagation(),
              children: c.jsxs("div", {
                className: "qiaodoumayi-aux-gen-params flex min-w-0 flex-1 flex-wrap items-center gap-0.5",
                children: [Kn && c.jsx(_$, {
                  nodeId: e.id,
                  dropdownType: "agent-gemini-api-format",
                  value: Y,
                  isDark: t,
                  activeDropdown: M,
                  setActiveDropdown: T,
                  onSelect: Ct,
                  buttonClassName: "shrink-0 text-xs",
                  menuClassName: "w-44",
                  menuPlacement: "below"
                }), Mxe({
                  modelId: V,
                  url: un == null ? void 0 : un.url,
                  hasVideo: Xt.length > 0
                }) ? c.jsx(hYe, {
                  nodeId: e.id,
                  dropdownType: "agent-mimo-video-send",
                  value: q,
                  isDark: t,
                  activeDropdown: M,
                  setActiveDropdown: T,
                  onSelect: ne,
                  buttonClassName: "shrink-0 text-xs"
                }) : null, en ? c.jsx(dT, {
                  nodeId: e.id,
                  dropdownType: "agent-reasoning-effort",
                  value: W,
                  isDark: t,
                  activeDropdown: M,
                  setActiveDropdown: T,
                  onSelect: Cn,
                  buttonClassName: "shrink-0 text-xs",
                  modelId: V,
                  modelName: Jn,
                  menuPlacement: "below"
                }) : null, et ? c.jsx(Ku, {
                  nodeId: e.id,
                  platformGroup: ht,
                  modelName: Jn,
                  modelId: V,
                  modelConfigId: un == null ? void 0 : un.id,
                  isDark: t,
                  nodeSettings: e.settings,
                  updateNode: n,
                  onGroupChange: jt,
                  compact: !0,
                  buttonVariant: "square",
                  menuPlacement: "below",
                  className: "shrink-0"
                }) : null, wM(V) && c.jsxs("label", {
                  className: `sketch-chat-web-chip shrink-0${t ? " sketch-chat-web-chip--dark" : ""}`,
                  onMouseDown: Et => Et.stopPropagation(),
                  title: x("勾选后启用联网搜索（仅文本场景）"),
                  children: [c.jsx("input", {
                    type: "checkbox",
                    checked: U,
                    onChange: Et => {
                      const zn = Et.target.checked;
                      H(zn);
                      const Mn = {
                        ...Qt.current
                      };
                      n(e.id, {
                        settings: {
                          ...Mn,
                          agentWebSearchEnabled: zn
                        }
                      });
                    },
                    className: "h-3 w-3 cursor-pointer"
                  }), c.jsx("span", {
                    className: "whitespace-nowrap",
                    children: x("联网")
                  })]
                }), !ce && X ? c.jsxs("label", {
                  className: `sketch-chat-web-chip shrink-0${t ? " sketch-chat-web-chip--dark" : ""}`,
                  onMouseDown: Et => Et.stopPropagation(),
                  title: Jk(re),
                  children: [c.jsx("input", {
                    type: "checkbox",
                    checked: de,
                    onChange: Et => {
                      const zn = Et.target.checked;
                      le(zn);
                      const Mn = {
                        ...Qt.current
                      };
                      n(e.id, {
                        settings: {
                          ...Mn,
                          agentUseAliyunOss: zn
                        }
                      });
                    },
                    className: "h-3 w-3 cursor-pointer"
                  }), c.jsx("span", {
                    className: "whitespace-nowrap",
                    children: $g(re)
                  })]
                }) : null, ce || de ? c.jsxs("label", {
                  className: `sketch-chat-web-chip shrink-0${t ? " sketch-chat-web-chip--dark" : ""}`,
                  onMouseDown: Et => Et.stopPropagation(),
                  title: x("图片改用 Base64 发送，视频仍走 OSS 链接"),
                  children: [c.jsx("input", {
                    type: "checkbox",
                    checked: J,
                    onChange: Et => {
                      const zn = Et.target.checked;
                      pe(zn);
                      const Mn = {
                        ...Qt.current
                      };
                      n(e.id, {
                        settings: {
                          ...Mn,
                          ossImageBase64: zn
                        }
                      });
                    },
                    className: "h-3 w-3 cursor-pointer"
                  }), c.jsx("span", {
                    className: "whitespace-nowrap",
                    children: "B64"
                  })]
                }) : null]
              })
            }) : null, Ke && c.jsxs("div", {
              className: `rounded-xl border p-2.5 ${t ? "bg-[#171717] border-white/[0.06]" : "bg-zinc-50 border-black/[0.06]"}`,
              children: [c.jsxs("div", {
                className: "flex items-center justify-between mb-3 gap-2",
                children: [c.jsxs("div", {
                  className: `flex items-center gap-0.5 shrink-0 rounded-lg p-0.5 ${t ? "bg-white/[0.04]" : "bg-black/[0.04]"}`,
                  children: [c.jsx("button", {
                    type: "button",
                    onClick: () => Ye("cache"),
                    className: `px-2 py-1 text-[10px] rounded-md border transition-colors ${De === "cache" ? t ? "bg-white/10 text-zinc-100 border-transparent" : "bg-white text-zinc-900 border-transparent shadow-sm" : t ? "border-transparent text-zinc-300 hover:text-white" : "border-transparent text-zinc-500 hover:text-zinc-800"}`,
                    onMouseDown: Et => Et.stopPropagation(),
                    children: x("本地缓存")
                  }), c.jsx("button", {
                    type: "button",
                    onClick: () => Ye("browse"),
                    className: `px-2 py-1 text-[10px] rounded-md border transition-colors ${De === "browse" ? t ? "bg-white/10 text-zinc-100 border-transparent" : "bg-white text-zinc-900 border-transparent shadow-sm" : t ? "border-transparent text-zinc-300 hover:text-white" : "border-transparent text-zinc-500 hover:text-zinc-800"}`,
                    onMouseDown: Et => Et.stopPropagation(),
                    title: x("直接读取电脑文件夹里的 .md Skill，不写入本地缓存"),
                    children: x("本地浏览")
                  })]
                }), c.jsxs("div", {
                  className: "flex items-center gap-2 flex-wrap justify-end",
                  children: [De === "cache" ? c.jsxs(c.Fragment, {
                    children: [c.jsxs("button", {
                      type: "button",
                      disabled: !Oe || Ze,
                      onClick: () => void St(),
                      className: `px-2 py-1 text-[10px] rounded-md border transition-colors flex items-center gap-1 shrink-0 ${t ? "border-transparent text-zinc-100 hover:bg-white/[0.08] hover:text-white disabled:opacity-30" : "border-transparent text-zinc-500 hover:bg-black/[0.05] hover:text-zinc-900 disabled:opacity-30"}`,
                      onMouseDown: Et => Et.stopPropagation(),
                      title: x(Oe ? "备份到 {0}：Prompt words/saved_skills.json" : "需在桌面端并配置 {0}", ye),
                      children: [c.jsx(Wp, {
                        size: 10
                      }), x("云端备份")]
                    }), c.jsxs("button", {
                      type: "button",
                      disabled: !Oe || Ze,
                      onClick: () => void hn(),
                      className: `px-2 py-1 text-[10px] rounded-md border transition-colors flex items-center gap-1 shrink-0 ${t ? "border-transparent text-zinc-100 hover:bg-white/[0.08] hover:text-white disabled:opacity-30" : "border-transparent text-zinc-500 hover:bg-black/[0.05] hover:text-zinc-900 disabled:opacity-30"}`,
                      onMouseDown: Et => Et.stopPropagation(),
                      title: x(Oe ? "从 {0} 覆盖恢复 Skill 库" : "需在桌面端并配置 {0}", ye),
                      children: [c.jsx(ws, {
                        size: 10
                      }), x("云端下载")]
                    }), c.jsxs("button", {
                      onClick: () => {
                        it("__new__"), Ft({
                          name: "",
                          content: ""
                        });
                      },
                      className: `px-2 py-1 text-[10px] rounded-md border transition-colors flex items-center gap-1 ${t ? "border-transparent text-zinc-100 hover:bg-white/[0.08] hover:text-white" : "border-transparent text-zinc-500 hover:bg-black/[0.05] hover:text-zinc-900"}`,
                      onMouseDown: Et => Et.stopPropagation(),
                      title: x("新建并保存一个 Skill 到库中"),
                      children: [c.jsx(O5, {
                        size: 10
                      }), x("新建保存")]
                    }), c.jsx("input", {
                      ref: We,
                      type: "file",
                      accept: ".json,.txt,.md,application/json,text/plain,text/markdown",
                      className: "hidden",
                      "aria-hidden": !0,
                      onChange: Et => void va(Et),
                      onMouseDown: Et => Et.stopPropagation()
                    }), c.jsxs("button", {
                      type: "button",
                      onClick: Za,
                      className: `px-2 py-1 text-[10px] rounded-md border transition-colors flex items-center gap-1 ${t ? "border-transparent text-zinc-100 hover:bg-white/[0.08] hover:text-white" : "border-transparent text-zinc-500 hover:bg-black/[0.05] hover:text-zinc-900"}`,
                      onMouseDown: Et => Et.stopPropagation(),
                      title: x("从 JSON / TXT / MD 导入到本地 Skill 库（TXT·MD 全文不限字数）"),
                      children: [c.jsx(ml, {
                        size: 10
                      }), x("导入")]
                    })]
                  }) : null, c.jsx("button", {
                    onClick: () => Xe(!1),
                    className: `px-2 py-1 text-[10px] rounded-md border transition-colors ${t ? "border-transparent text-zinc-100 hover:bg-white/[0.08] hover:text-white" : "border-transparent text-zinc-500 hover:bg-black/[0.05] hover:text-zinc-900"}`,
                    onMouseDown: Et => Et.stopPropagation(),
                    children: x("收起")
                  })]
                })]
              }), De === "browse" ? c.jsx(fHn, {
                isDark: t,
                variant: "node",
                onApply: Et => void Ga(Et.absPath, Et.name, Et.id)
              }) : c.jsxs(c.Fragment, {
                children: [c.jsxs("div", {
                  className: `text-[10px] mb-2 ${t ? "text-zinc-300" : "text-zinc-500"}`,
                  children: [x("来自对话保存，共 "), Ce.length, x(" 项（写入本地缓存）")]
                }), c.jsx("div", {
                  className: "grid grid-cols-3 gap-1 max-h-48 overflow-y-auto rh-scroll-minimal mb-1",
                  children: Ce.length === 0 ? c.jsx("div", {
                    className: `col-span-3 py-4 text-center text-[10px] ${t ? "text-zinc-500" : "text-zinc-400"}`,
                    children: x("暂无保存的 Skill。在 Chat 中切换到「Skill」模式，与 AI 制作 Skill 后对助手回复点击「保存为 Skill」即可在此应用。")
                  }) : Ce.map(Et => c.jsxs("div", {
                    className: `group flex items-center justify-between pl-3 pr-1 py-1 rounded-lg border transition-colors ${t ? "border-transparent bg-white/[0.03] hover:bg-white/[0.06]" : "border-transparent bg-black/[0.03] hover:bg-black/[0.05]"}`,
                    children: [c.jsx("span", {
                      className: `text-[11px] truncate flex-1 mr-2 ${t ? "text-zinc-100" : "text-zinc-800"}`,
                      title: Et.name,
                      children: Et.name
                    }), c.jsxs("div", {
                      className: "flex items-center gap-1 shrink-0",
                      children: [c.jsx("button", {
                        "data-gen-prompt-apply": !0,
                        type: "button",
                        onClick: zn => {
                          zn.stopPropagation(), ha(Et);
                        },
                        onPointerDown: zn => zn.stopPropagation(),
                        onMouseDown: zn => zn.stopPropagation(),
                        className: `relative z-10 px-2 py-1 text-[10px] rounded-md border transition-colors shrink-0 ${t ? "border-transparent text-zinc-100 hover:bg-white/[0.08] hover:text-white" : "border-transparent text-zinc-500 hover:bg-black/[0.05] hover:text-zinc-900"}`,
                        children: x("应用")
                      }), c.jsx("button", {
                        onClick: () => {
                          it(Et.id), Ft({
                            name: Et.name,
                            content: Et.content
                          });
                        },
                        className: `p-1 rounded transition-colors ${t ? "text-zinc-200 hover:text-white hover:bg-white/[0.08] opacity-0 group-hover:opacity-100" : "text-zinc-400 hover:text-zinc-900 hover:bg-black/[0.05] opacity-0 group-hover:opacity-100"}`,
                        onMouseDown: zn => zn.stopPropagation(),
                        title: x("编辑"),
                        children: c.jsx(NLe, {
                          size: 12
                        })
                      }), c.jsx("button", {
                        onClick: async () => {
                          (await _yn("确定从 Skill 库中删除该项？")) && (YVn(Et.id), He(vp()));
                        },
                        className: `p-1 rounded transition-colors ${t ? "text-zinc-200 hover:text-white hover:bg-white/[0.08] opacity-0 group-hover:opacity-100" : "text-zinc-400 hover:text-zinc-900 hover:bg-black/[0.05] opacity-0 group-hover:opacity-100"}`,
                        onMouseDown: zn => zn.stopPropagation(),
                        title: x("删除"),
                        children: c.jsx(Qo, {
                          size: 12
                        })
                      })]
                    })]
                  }, Et.id))
                }), Ve && c.jsxs("div", {
                  className: `p-3 rounded-lg border ${t ? "bg-white/[0.03] border-white/[0.06]" : "bg-white border-black/[0.06]"}`,
                  children: [c.jsx("div", {
                    className: `text-[10px] font-medium mb-2 ${t ? "text-zinc-300" : "text-zinc-700"}`,
                    children: x(Ve === "__new__" ? "新建 Skill" : "编辑 Skill")
                  }), c.jsx("input", {
                    type: "text",
                    value: It.name,
                    onChange: Et => Ft({
                      ...It,
                      name: Et.target.value
                    }),
                    placeholder: x("Skill 名称"),
                    className: `w-full px-2 py-1.5 text-[11px] rounded-md border outline-none mb-2 ${t ? "bg-transparent border-white/[0.08] text-zinc-200 placeholder-zinc-600 focus:border-white/20" : "bg-white border-zinc-300 text-zinc-800 placeholder-zinc-400"}`,
                    onMouseDown: Et => Et.stopPropagation()
                  }), c.jsx("textarea", {
                    "data-node-id": e.id,
                    "data-scrollable": "true",
                    value: It.content,
                    onChange: Et => Ft({
                      ...It,
                      content: Et.target.value
                    }),
                    placeholder: x("Skill 内容..."),
                    className: `w-full px-2 py-1.5 text-[12px] rounded-md border outline-none resize-none h-32 rh-scroll-minimal leading-relaxed ${t ? "bg-transparent border-white/[0.08] text-zinc-200 placeholder-zinc-600 focus:border-white/20" : "bg-white border-zinc-300 text-zinc-800 placeholder-zinc-400"}`,
                    onMouseDown: Et => Et.stopPropagation()
                  }), c.jsxs("div", {
                    className: "flex gap-2 mt-2",
                    children: [c.jsx("button", {
                      onClick: () => {
                        if (!It.name.trim() || !It.content.trim()) {
                          alert(x("请填写名称和内容"));
                          return;
                        }
                        Ve === "__new__" ? (Qhe({
                          name: It.name.trim(),
                          content: It.content
                        }), He(vp())) : (A7t(Ve, {
                          name: It.name.trim(),
                          content: It.content
                        }), He(vp())), it(null), Ft({
                          name: "",
                          content: ""
                        });
                      },
                      className: `flex-1 px-2 py-1 text-[10px] rounded-md border transition-colors ${t ? "border-transparent text-zinc-100 hover:bg-white/[0.08] hover:text-white" : "border-transparent text-zinc-500 hover:bg-black/[0.05] hover:text-zinc-900"}`,
                      onMouseDown: Et => Et.stopPropagation(),
                      children: x(Ve === "__new__" ? "保存到 Skill 库" : "保存修改")
                    }), c.jsx("button", {
                      onClick: () => {
                        it(null), Ft({
                          name: "",
                          content: ""
                        });
                      },
                      className: `px-2 py-1 text-[10px] rounded-md border transition-colors ${t ? "border-transparent text-zinc-100 hover:bg-white/[0.08] hover:text-white" : "border-transparent text-zinc-500 hover:bg-black/[0.05] hover:text-zinc-900"}`,
                      onMouseDown: Et => Et.stopPropagation(),
                      children: x("取消")
                    })]
                  })]
                })]
              })]
            }), Re && c.jsxs("div", {
              className: `rounded-xl border p-2.5 ${t ? "bg-[#171717] border-white/[0.06]" : "bg-zinc-50 border-black/[0.06]"}`,
              children: [c.jsxs("div", {
                className: "flex items-center justify-between mb-3",
                children: [c.jsxs("span", {
                  className: `text-[10px] font-medium ${t ? "text-zinc-300" : "text-zinc-700"}`,
                  children: [x("常用提示词库 ("), At.length, x(" 项)")]
                }), c.jsxs("div", {
                  className: "flex items-center gap-2 flex-wrap justify-end",
                  children: [c.jsxs("button", {
                    type: "button",
                    disabled: !Oe || Ze,
                    onClick: () => void qe(),
                    className: `px-2 py-1 text-[10px] rounded-md border transition-colors flex items-center gap-1 shrink-0 ${t ? "border-transparent text-zinc-100 hover:bg-white/[0.08] hover:text-white disabled:opacity-30" : "border-transparent text-zinc-500 hover:bg-black/[0.05] hover:text-zinc-900 disabled:opacity-30"}`,
                    onMouseDown: Et => Et.stopPropagation(),
                    title: x(Oe ? "备份到 {0}：Prompt words/prompt_library.json" : "需在桌面端并配置 {0}", ye),
                    children: [c.jsx(Wp, {
                      size: 10
                    }), x("云端备份")]
                  }), c.jsxs("button", {
                    type: "button",
                    disabled: !Oe || Ze,
                    onClick: () => void kt(),
                    className: `px-2 py-1 text-[10px] rounded-md border transition-colors flex items-center gap-1 shrink-0 ${t ? "border-transparent text-zinc-100 hover:bg-white/[0.08] hover:text-white disabled:opacity-30" : "border-transparent text-zinc-500 hover:bg-black/[0.05] hover:text-zinc-900 disabled:opacity-30"}`,
                    onMouseDown: Et => Et.stopPropagation(),
                    title: x(Oe ? "从 {0} 覆盖恢复常用提示词库" : "需在桌面端并配置 {0}", ye),
                    children: [c.jsx(ws, {
                      size: 10
                    }), x("云端下载")]
                  }), c.jsx("button", {
                    onClick: () => {
                      gt({
                        name: "",
                        prompt: ""
                      }), pt(null), Ht(!0);
                    },
                    className: `px-2 py-1 text-[10px] rounded-md border transition-colors ${t ? "border-transparent text-zinc-100 hover:bg-white/[0.08] hover:text-white" : "border-transparent text-zinc-500 hover:bg-black/[0.05] hover:text-zinc-900"}`,
                    onMouseDown: Et => Et.stopPropagation(),
                    children: x("新建")
                  }), c.jsx("button", {
                    onClick: Mr,
                    className: `px-2 py-1 text-[10px] rounded-md border transition-colors ${t ? "border-transparent text-zinc-100 hover:bg-white/[0.08] hover:text-white" : "border-transparent text-zinc-500 hover:bg-black/[0.05] hover:text-zinc-900"}`,
                    onMouseDown: Et => Et.stopPropagation(),
                    children: x("保存当前")
                  }), c.jsx("button", {
                    onClick: () => $e(!1),
                    className: `px-2 py-1 text-[10px] rounded-md border transition-colors ${t ? "border-transparent text-zinc-100 hover:bg-white/[0.08] hover:text-white" : "border-transparent text-zinc-500 hover:bg-black/[0.05] hover:text-zinc-900"}`,
                    onMouseDown: Et => Et.stopPropagation(),
                    children: x("收起")
                  })]
                })]
              }), c.jsx("div", {
                className: "grid grid-cols-3 gap-1 max-h-48 overflow-y-auto rh-scroll-minimal mb-1",
                children: At.map(Et => c.jsxs("div", {
                  className: `group flex items-center justify-between pl-3 pr-1 py-1 rounded-lg border transition-colors ${t ? "border-transparent bg-white/[0.03] hover:bg-white/[0.06]" : "border-transparent bg-black/[0.03] hover:bg-black/[0.05]"}`,
                  children: [c.jsx("span", {
                    className: `text-[11px] truncate flex-1 mr-2 ${t ? "text-zinc-100" : "text-zinc-800"}`,
                    title: Et.name,
                    children: Et.name
                  }), c.jsxs("div", {
                    className: "flex items-center gap-1 shrink-0",
                    children: [c.jsx("button", {
                      "data-gen-prompt-apply": !0,
                      type: "button",
                      onClick: zn => {
                        zn.stopPropagation(), Hr(Et);
                      },
                      onPointerDown: zn => zn.stopPropagation(),
                      onMouseDown: zn => zn.stopPropagation(),
                      className: `relative z-10 px-2 py-1 text-[10px] rounded-md border transition-colors shrink-0 ${t ? "border-transparent text-zinc-100 hover:bg-white/[0.08] hover:text-white" : "border-transparent text-zinc-500 hover:bg-black/[0.05] hover:text-zinc-900"}`,
                      children: x("应用")
                    }), c.jsx("button", {
                      onClick: () => kr(Et),
                      className: `p-1 rounded transition-colors ${t ? "text-zinc-200 hover:text-white hover:bg-white/[0.08] opacity-0 group-hover:opacity-100" : "text-zinc-400 hover:text-zinc-900 hover:bg-black/[0.05] opacity-0 group-hover:opacity-100"}`,
                      onMouseDown: zn => zn.stopPropagation(),
                      title: x("编辑"),
                      children: c.jsx(NLe, {
                        size: 12
                      })
                    }), c.jsx("button", {
                      onClick: () => Pr(Et.id),
                      className: `p-1 rounded transition-colors ${t ? "text-zinc-200 hover:text-white hover:bg-white/[0.08] opacity-0 group-hover:opacity-100" : "text-zinc-400 hover:text-zinc-900 hover:bg-black/[0.05] opacity-0 group-hover:opacity-100"}`,
                      onMouseDown: zn => zn.stopPropagation(),
                      title: x("删除"),
                      children: c.jsx(Qo, {
                        size: 12
                      })
                    })]
                  })]
                }, Et.id))
              }), vt && c.jsxs("div", {
                className: `p-3 rounded-lg border ${t ? "bg-white/[0.03] border-white/[0.06]" : "bg-white border-black/[0.06]"}`,
                children: [c.jsx("div", {
                  className: `text-[10px] font-medium mb-2 ${t ? "text-zinc-300" : "text-zinc-700"}`,
                  children: x(nn ? "编辑模板" : "新建模板")
                }), c.jsx("input", {
                  type: "text",
                  value: lt.name,
                  onChange: Et => gt({
                    ...lt,
                    name: Et.target.value
                  }),
                  placeholder: x("自定义名称 (例如: 柔光人像)"),
                  className: `w-full px-2 py-1.5 text-[11px] rounded-md border outline-none mb-2 ${t ? "bg-transparent border-white/[0.08] text-zinc-200 placeholder-zinc-600 focus:border-white/20" : "bg-white border-zinc-300 text-zinc-800 placeholder-zinc-400"}`,
                  onMouseDown: Et => Et.stopPropagation()
                }), c.jsx("textarea", {
                  "data-node-id": e.id,
                  "data-scrollable": "true",
                  value: lt.prompt,
                  onChange: Et => gt({
                    ...lt,
                    prompt: Et.target.value
                  }),
                  placeholder: x("输入提示词内容..."),
                  className: `w-full px-2 py-1.5 text-[12px] rounded-md outline-none resize-none h-24 rh-scroll-minimal leading-relaxed ${t ? "bg-[#1f1f1f]/50 text-zinc-200 placeholder-zinc-600" : "bg-transparent text-zinc-800 placeholder-zinc-400"}`,
                  onMouseDown: Et => Et.stopPropagation()
                }), c.jsxs("div", {
                  className: "flex gap-2 mt-2",
                  children: [c.jsx("button", {
                    onClick: Kt,
                    className: `flex-1 px-2 py-1 text-[10px] rounded-md border transition-colors ${t ? "border-transparent text-zinc-100 hover:bg-white/[0.08] hover:text-white" : "border-transparent text-zinc-500 hover:bg-black/[0.05] hover:text-zinc-900"}`,
                    onMouseDown: Et => Et.stopPropagation(),
                    children: x(nn ? "保存修改" : "添加到常用提示词库")
                  }), c.jsx("button", {
                    onClick: () => {
                      Ht(!1), gt({
                        name: "",
                        prompt: ""
                      }), pt(null);
                    },
                    className: `px-2 py-1 text-[10px] rounded-md border transition-colors ${t ? "border-transparent text-zinc-100 hover:bg-white/[0.08] hover:text-white" : "border-transparent text-zinc-500 hover:bg-black/[0.05] hover:text-zinc-900"}`,
                    onMouseDown: Et => Et.stopPropagation(),
                    children: x("取消")
                  })]
                })]
              })]
            }), c.jsx("textarea", {
              ref: P,
              "data-node-id": e.id,
              "data-scrollable": "true",
              "data-agent-body-textarea": "true",
              defaultValue: _n,
              onChange: Et => {
                F.current.systemPrompt = !0, B.current.systemPrompt && clearTimeout(B.current.systemPrompt), B.current.systemPrompt = setTimeout(() => {
                  n(e.id, {
                    settings: {
                      ...Qt.current,
                      systemPrompt: Et.target.value
                    }
                  });
                }, 100);
              },
              placeholder: x(zr ? "输入元提示词（生成时会自动合并上游文字节点内容）..." : "AI 扮演谁、用什么风格？例如：你是资深电商文案，语言简洁有力"),
              className: `resize-y outline-none text-[12px] px-0 py-1 min-h-[56px] rh-scroll-minimal leading-relaxed w-full transition-colors ${rt ? "" : "hidden"} ${t ? "bg-transparent text-zinc-200 placeholder-zinc-600" : "bg-transparent text-zinc-800 placeholder-zinc-400"}`,
              style: {
                maxHeight: "none",
                ...(Zt ? {
                  pointerEvents: "none"
                } : {})
              },
              onMouseDown: Et => Et.stopPropagation()
            })]
          }), qn && c.jsxs("div", {
            className: "relative flex flex-col gap-1.5",
            onMouseUp: Et => {
              v && v !== e.id && ir(Et, "default");
            },
            children: [c.jsxs("div", {
              className: "flex items-center gap-1.5 leading-none",
              title: x("引用媒体：连接的图片/视频会随请求一起发送"),
              children: [c.jsx("span", {
                className: `text-[11px] font-medium tracking-wide ${t ? "text-zinc-400" : "text-zinc-500"}`,
                children: x("参考素材")
              }), c.jsxs("span", {
                className: `text-[9px] tabular-nums ${t ? "text-zinc-500" : "text-zinc-400"}`,
                children: ["· ", mt.length, x(" 图"), Xt.length > 0 && x(" · {0} 视频", Xt.length)]
              })]
            }), c.jsx("div", {
              className: "flex min-w-0 flex-wrap gap-1.5 items-center overflow-visible pt-1",
              onDragOver: Et => {
                Et.preventDefault(), Et.stopPropagation(), Et.dataTransfer.dropEffect = "move";
              },
              children: sa.map((Et, zn) => {
                const Mn = Et.type === "video",
                  or = Et.url;
                if (Mn) {
                  const Aa = ba.get(or),
                    pn = ta.get(or),
                    xr = pn ? G.get(pn) : void 0,
                    Nr = wk(or, xr);
                  return c.jsxs("div", {
                    "data-image-reorder-thumb": !0,
                    className: `relative shrink-0 cursor-grab active:cursor-grabbing touch-none select-none ${ga === zn ? "opacity-60 scale-95" : ""}`,
                    title: x("长按拖拽可调换顺序"),
                    draggable: !0,
                    onMouseEnter: () => Ya(zn),
                    onMouseLeave: () => Ya(null),
                    onDragStart: qr => {
                      if (qr.target.closest("button")) {
                        qr.preventDefault();
                        return;
                      }
                      qr.dataTransfer.setData("text/plain", String(zn)), qr.dataTransfer.effectAllowed = "move", qr.stopPropagation(), _a(zn);
                    },
                    onDragEnd: () => _a(null),
                    onDragEnter: qr => {
                      qr.preventDefault(), qr.stopPropagation(), qr.dataTransfer.dropEffect = "move";
                    },
                    onDragOver: qr => {
                      qr.preventDefault(), qr.stopPropagation(), qr.dataTransfer.dropEffect = "move";
                    },
                    onDrop: qr => {
                      qr.preventDefault(), qr.stopPropagation();
                      const Oa = Number(qr.dataTransfer.getData("text/plain"));
                      !Number.isNaN(Oa) && Oa !== zn && wr(Oa, zn);
                    },
                    children: [c.jsx("span", {
                      className: "absolute -top-1 -left-1 w-3.5 h-3.5 text-[8px] font-semibold rounded-full bg-zinc-700 text-white select-none flex items-center justify-center border border-white/70 shadow-sm leading-none pointer-events-none z-[10]",
                      style: {
                        pointerEvents: "none"
                      },
                      children: zn + 1
                    }), c.jsx("button", {
                      onClick: qr => jn(or, qr),
                      className: `absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center transition-opacity ${$a === zn ? "opacity-100" : "opacity-0"} ${t ? "bg-red-600 hover:bg-red-500" : "bg-red-500 hover:bg-red-600"} text-white shadow-lg`,
                      style: {
                        zIndex: 31
                      },
                      title: x("取消引用"),
                      children: c.jsx("svg", {
                        width: "6",
                        height: "6",
                        viewBox: "0 0 8 8",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: c.jsx("path", {
                          d: "M1 1L7 7M7 1L1 7",
                          stroke: "currentColor",
                          strokeWidth: "1.5",
                          strokeLinecap: "round"
                        })
                      })
                    }), c.jsx("div", {
                      className: `relative w-9 h-9 rounded border overflow-hidden ${t ? "border-zinc-700 bg-zinc-800" : "border-zinc-300 bg-zinc-200"}`,
                      children: c.jsx(ZQ, {
                        rawUrl: or,
                        displaySrc: Nr,
                        mediaType: "video",
                        sourceNode: xr,
                        alt: x("媒体 {0}", zn + 1),
                        className: "w-full h-full object-cover",
                        isDark: t,
                        isLoading: Aa == null ? void 0 : Aa.isLoading,
                        useThumbnail: !0,
                        preferConstantDisplay: !0,
                        blobRecoveryAssetIds: Et.assetId ? [Et.assetId] : void 0
                      })
                    })]
                  }, Eae({
                    idx: zn,
                    sourceNodeId: xr == null ? void 0 : xr.id,
                    assetId: Et.assetId
                  }));
                }
                const mr = Ea.get(or),
                  Yr = ta.get(or),
                  aa = Yr ? G.get(Yr) : void 0,
                  wa = _c((mr == null ? void 0 : mr.url) || or) || (mr == null ? void 0 : mr.url) || or,
                  xa = Iae(wk(or, aa)) || La(wa, or) || "";
                return c.jsxs("div", {
                  "data-image-reorder-thumb": !0,
                  className: `relative shrink-0 cursor-grab active:cursor-grabbing touch-none select-none ${ga === zn ? "opacity-60 scale-95" : ""}`,
                  title: x("长按拖拽可调换顺序"),
                  draggable: !0,
                  onMouseEnter: () => Ya(zn),
                  onMouseLeave: () => Ya(null),
                  onDragStart: Aa => {
                    if (Aa.target.closest("button")) {
                      Aa.preventDefault();
                      return;
                    }
                    Aa.dataTransfer.setData("text/plain", String(zn)), Aa.dataTransfer.effectAllowed = "move", Aa.stopPropagation(), _a(zn);
                  },
                  onDragEnd: () => _a(null),
                  onDragEnter: Aa => {
                    Aa.preventDefault(), Aa.stopPropagation(), Aa.dataTransfer.dropEffect = "move";
                  },
                  onDragOver: Aa => {
                    Aa.preventDefault(), Aa.stopPropagation(), Aa.dataTransfer.dropEffect = "move";
                  },
                  onDrop: Aa => {
                    Aa.preventDefault(), Aa.stopPropagation();
                    const pn = Number(Aa.dataTransfer.getData("text/plain"));
                    !Number.isNaN(pn) && pn !== zn && wr(pn, zn);
                  },
                  children: [c.jsx("span", {
                    className: "absolute -top-1 -left-1 w-3.5 h-3.5 text-[8px] font-semibold rounded-full bg-zinc-700 text-white select-none flex items-center justify-center border border-white/70 shadow-sm leading-none pointer-events-none z-[10]",
                    style: {
                      pointerEvents: "none"
                    },
                    children: zn + 1
                  }), c.jsx("button", {
                    onClick: Aa => Wn(or, Aa),
                    className: `absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center transition-opacity ${$a === zn ? "opacity-100" : "opacity-0"} ${t ? "bg-red-600 hover:bg-red-500" : "bg-red-500 hover:bg-red-600"} text-white shadow-lg`,
                    style: {
                      zIndex: 31
                    },
                    title: x("取消引用"),
                    children: c.jsx("svg", {
                      width: "6",
                      height: "6",
                      viewBox: "0 0 8 8",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: c.jsx("path", {
                        d: "M1 1L7 7M7 1L1 7",
                        stroke: "currentColor",
                        strokeWidth: "1.5",
                        strokeLinecap: "round"
                      })
                    })
                  }), c.jsx("div", {
                    className: `relative w-9 h-9 rounded border overflow-hidden ${t ? "border-zinc-700 bg-zinc-800" : "border-zinc-300 bg-zinc-200"}`,
                    children: c.jsx(ZQ, {
                      rawUrl: or,
                      displaySrc: xa,
                      mediaType: "image",
                      sourceNode: aa,
                      alt: x("媒体 {0}", zn + 1),
                      className: "w-full h-full object-cover",
                      isDark: t,
                      isLoading: !!(mr != null && mr.isLoading) && !xa,
                      useThumbnail: !0,
                      preferConstantDisplay: !0,
                      blobRecoveryAssetIds: Et.assetId ? [Et.assetId] : void 0
                    })
                  })]
                }, Eae({
                  idx: zn,
                  sourceNodeId: Yr,
                  assetId: Et.assetId
                }));
              })
            })]
          }), c.jsxs("div", {
            className: "flex flex-col gap-2 relative",
            "data-agent-wire-drop-section": "agent_user_input",
            onMouseUpCapture: Et => ir(Et, "agent_user_input"),
            children: [Zt && c.jsx("div", {
              className: "agent-wire-drop-capture",
              "aria-hidden": !0,
              onMouseUpCapture: Et => ir(Et, "agent_user_input")
            }), c.jsx("div", {
              className: "agent-wire-drop-row-host relative flex items-center gap-1",
              children: c.jsxs("div", {
                className: `agent-input-port-row relative flex items-center flex-1 min-w-0 gap-1.5${Zt ? " agent-input-port-row--linking" : ""}`,
                "data-input-type": "agent_user_input",
                "data-agent-wire-drop-row": "agent_user_input",
                onMouseUpCapture: Et => {
                  v && v !== e.id && Kr(Et, "agent_user_input");
                },
                children: [c.jsx("div", {
                  className: "agent-input-port-dot-hit",
                  title: x("用户需求输入 - 可连接多个文字/Agent节点，按连接顺序拼接"),
                  "data-input-type": "agent_user_input",
                  onMouseDown: Et => Jr(Et, "agent_user_input"),
                  onMouseUpCapture: Et => Kr(Et, "agent_user_input"),
                  onContextMenu: Et => Et.preventDefault(),
                  children: c.jsx("div", {
                    className: `agent-input-port-dot-visual transition-colors ${Dr ? "bg-green-500" : t ? "bg-zinc-600 hover:bg-zinc-500" : "bg-zinc-400 hover:bg-zinc-500"}`
                  })
                }), c.jsxs("label", {
                  className: `text-[11px] font-medium tracking-wide${Zt ? " pointer-events-none select-none" : ""} ${t ? "text-zinc-400" : "text-zinc-500"}`,
                  children: [c.jsx("span", {
                    title: x("用户需求：这次要 AI 完成的具体任务"),
                    children: x("任务需求")
                  }), ur.length > 0 && c.jsxs("span", {
                    className: `ml-1.5 text-[9px] font-normal ${t ? "text-zinc-500" : "text-zinc-400"}`,
                    title: x("已连接{0}个节点{1}，按顺序拼接", ur.length, gr ? "，含Agent" : ""),
                    children: ["· ", ur.length, x(" 个连接")]
                  })]
                })]
              })
            }), c.jsx("textarea", {
              ref: R,
              "data-node-id": e.id,
              "data-scrollable": "true",
              "data-agent-body-textarea": "true",
              defaultValue: ar,
              onChange: Et => {
                F.current.userPrompt = !0, B.current.userPrompt && clearTimeout(B.current.userPrompt), B.current.userPrompt = setTimeout(() => {
                  n(e.id, {
                    settings: {
                      ...Qt.current,
                      userPrompt: Et.target.value
                    }
                  });
                }, 100);
              },
              placeholder: ur.length > 0 ? x("可继续输入，与上方连接内容按顺序拼接") : x("这次要做什么？例如：为这款手机写 6 页详情页方案（也可连接文字/Agent 节点）"),
              className: `resize-y outline-none text-[12px] px-0 py-1 min-h-[56px] rh-scroll-minimal leading-relaxed w-full transition-colors ${t ? "bg-transparent text-zinc-200 placeholder-zinc-600" : "bg-transparent text-zinc-800 placeholder-zinc-400"}`,
              style: {
                maxHeight: "none",
                ...(Zt ? {
                  pointerEvents: "none"
                } : {})
              },
              onMouseDown: Et => Et.stopPropagation()
            })]
          }), c.jsxs("div", {
            className: "flex flex-col gap-2 flex-1 min-h-0",
            children: [c.jsxs("div", {
              className: "flex items-center justify-between gap-2 flex-shrink-0 min-w-0",
              children: [c.jsx("label", {
                className: `text-[11px] font-medium tracking-wide shrink-0 ${t ? "text-zinc-400" : "text-zinc-500"}`,
                children: x("生成结果")
              }), c.jsx("div", {
                className: "qiaodoumayi-aux-gen-toolbar flex min-h-[28px] min-w-0 flex-1 items-center justify-end gap-0.5 overflow-visible",
                children: c.jsxs("div", {
                  className: "qiaodoumayi-aux-gen-params flex min-w-0 flex-nowrap items-center gap-0.5 overflow-visible",
                  children: [c.jsx(Th, {
                    scopeId: e.id,
                    dropdownType: "agent-model-stage2",
                    value: L,
                    models: N,
                    isDark: t,
                    activeDropdown: M,
                    setActiveDropdown: T,
                    onSelect: Yn,
                    showChannelBar: !0,
                    menuPlacement: "below",
                    menuAlign: "end",
                    menuMaxHeight: 360,
                    leadingIcon: c.jsx(ac, {
                      size: 13,
                      className: "shrink-0 opacity-80"
                    }),
                    className: "!flex-none shrink-0 min-w-0 max-w-[11rem]"
                  }), ft ? c.jsx(Ku, {
                    nodeId: e.id,
                    platformGroup: wt,
                    modelName: Tt,
                    modelId: L,
                    modelConfigId: Vn == null ? void 0 : Vn.id,
                    isDark: t,
                    nodeSettings: e.settings,
                    updateNode: n,
                    onGroupChange: bt,
                    compact: !0,
                    buttonVariant: "square",
                    menuPlacement: "below",
                    className: "shrink-0",
                    truncateHeadLen: 5
                  }) : null, (Vt.trim() || be) && c.jsxs(c.Fragment, {
                    children: [c.jsxs("button", {
                      type: "button",
                      onClick: je,
                      disabled: Fe,
                      className: `inline-flex shrink-0 items-center gap-1 whitespace-nowrap ${Fe ? "opacity-40 cursor-not-allowed" : ""}`,
                      onMouseDown: Et => Et.stopPropagation(),
                      title: x("继续生成内容，从当前内容末尾续写"),
                      children: [c.jsx(Ol, {
                        size: 10
                      }), c.jsx("span", {
                        children: x("续写")
                      })]
                    }), c.jsxs("button", {
                      type: "button",
                      onClick: Qe,
                      disabled: Fe,
                      className: `inline-flex shrink-0 items-center gap-1 whitespace-nowrap ${Fe ? "opacity-40 cursor-not-allowed" : ""}`,
                      onMouseDown: Et => Et.stopPropagation(),
                      title: x("使用 Stage 2 模型改写内容，保持相同意思但换一种表达方式"),
                      children: [c.jsx(ac, {
                        size: 10
                      }), c.jsx("span", {
                        children: x("洗稿")
                      })]
                    })]
                  })]
                })
              })]
            }), c.jsx("textarea", {
              ref: j,
              "data-node-id": e.id,
              "data-scrollable": "true",
              "data-agent-body-textarea": "true",
              defaultValue: ge,
              onChange: Et => {
                const zn = Et.target.value;
                ke(zn), zn.trim() || Ee(!1), B.current.outputContent && clearTimeout(B.current.outputContent), B.current.outputContent = setTimeout(() => {
                  n(e.id, {
                    settings: {
                      ...Qt.current,
                      outputContent: zn
                    }
                  });
                }, 100);
              },
              placeholder: x(`点击下方「运行」后，结果会显示在这里

运行：新结果覆盖 · 续写：在末尾追加`),
              className: `resize-none outline-none text-[12px] px-0 py-1 flex-1 min-h-0 rh-scroll-minimal leading-relaxed w-full transition-colors ${t ? "bg-transparent text-zinc-200 placeholder-zinc-600" : "bg-transparent text-zinc-800 placeholder-zinc-400"}`,
              onMouseDown: Et => Et.stopPropagation()
            })]
          })]
        }), c.jsx("div", {
          className: "flex-shrink-0",
          children: c.jsx("div", {
            className: "px-3.5 pb-3.5 pt-1",
            children: c.jsxs("div", {
              className: "flex gap-2",
              children: [c.jsx("button", {
                onClick: Hn,
                disabled: Fe,
                className: `flex-1 min-w-0 h-9 px-3 text-xs font-medium rounded-xl transition-colors flex items-center justify-center gap-1.5 ${Fe ? t ? "bg-white/[0.06] text-zinc-400 cursor-not-allowed" : "bg-black/[0.06] text-zinc-500 cursor-not-allowed" : t ? "bg-white/[0.06] text-zinc-100 hover:bg-white/[0.1]" : "bg-black/[0.05] text-zinc-900 hover:bg-black/[0.08]"}`,
                onMouseDown: Et => Et.stopPropagation(),
                title: x("使用 Stage 1 模型生成，新结果覆盖输出"),
                children: Fe ? c.jsxs(c.Fragment, {
                  children: [c.jsx(Ua, {
                    size: 14,
                    className: "animate-spin"
                  }), c.jsx("span", {
                    children: x("生成中...")
                  })]
                }) : c.jsxs(c.Fragment, {
                  children: [c.jsx(Ol, {
                    size: 14
                  }), c.jsx("span", {
                    children: x("运行")
                  })]
                })
              }), Fe && c.jsxs("button", {
                onClick: $t,
                className: `flex-shrink-0 h-9 px-3 text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 ${t ? "bg-white/[0.06] text-zinc-300 hover:bg-red-500/15 hover:text-red-400" : "bg-black/[0.05] text-zinc-600 hover:bg-red-50 hover:text-red-600"}`,
                onMouseDown: Et => Et.stopPropagation(),
                title: x("取消生成"),
                children: [c.jsx(Na, {
                  size: 14
                }), c.jsx("span", {
                  children: x("取消")
                })]
              })]
            })
          })
        })]
      })
    });
  },
  yxo = Ia.memo(gxo),
  Syn = ({
    shape: e,
    isSelected: t,
    isInSelectedLayer: n = !1,
    onSelect: r,
    onDragStart: a,
    onResizeStart: i
  }) => {
    const {
        type: o,
        x: s,
        y: l,
        width: d,
        height: u,
        color: h,
        fillMode: p,
        strokeWidth: m,
        opacity: f,
        rotation: y
      } = e,
      b = () => {
        const v = {
          fill: p === "fill" ? h : "none",
          stroke: p === "stroke" ? h : "none",
          strokeWidth: p === "stroke" ? m : 0,
          opacity: f
        };
        switch (o) {
          case "rectangle":
            return c.jsx("rect", {
              x: 0,
              y: 0,
              width: d,
              height: u,
              ...v
            });
          case "circle":
            return c.jsx("ellipse", {
              cx: d / 2,
              cy: u / 2,
              rx: d / 2,
              ry: u / 2,
              ...v
            });
          case "triangle":
            const _ = `${d / 2},0 ${d},${u} 0,${u}`;
            return c.jsx("polygon", {
              points: _,
              ...v
            });
          case "line":
            return c.jsx("line", {
              x1: 0,
              y1: 0,
              x2: d,
              y2: u,
              stroke: h,
              strokeWidth: m,
              opacity: f
            });
          default:
            return null;
        }
      };
    return c.jsxs("g", {
      transform: `translate(${s}, ${l}) rotate(${y}, ${d / 2}, ${u / 2})`,
      style: {
        cursor: "move",
        pointerEvents: "all"
      },
      children: [c.jsx("rect", {
        x: 0,
        y: 0,
        width: d,
        height: u,
        fill: "transparent",
        stroke: "none",
        pointerEvents: "all",
        onClick: v => {
          v.stopPropagation(), r();
        },
        onMouseDown: v => {
          v.stopPropagation(), a(v);
        }
      }), c.jsx("g", {
        pointerEvents: "none",
        children: b()
      }), t && c.jsxs(c.Fragment, {
        children: [c.jsx("rect", {
          x: -2,
          y: -2,
          width: d + 4,
          height: u + 4,
          fill: "none",
          stroke: "#3b82f6",
          strokeWidth: 1,
          strokeDasharray: "4 2",
          pointerEvents: "none"
        }), ["nw", "ne", "sw", "se"].map(v => {
          const _ = v.includes("e") ? d : 0,
            w = v.includes("s") ? u : 0;
          return c.jsx("circle", {
            cx: _,
            cy: w,
            r: 4,
            fill: "#3b82f6",
            stroke: "white",
            strokeWidth: 1,
            style: {
              cursor: `${v}-resize`
            },
            pointerEvents: "all",
            onMouseDown: k => {
              k.stopPropagation(), i(k, v);
            }
          }, v);
        })]
      }), !t && n && c.jsx("rect", {
        x: -2,
        y: -2,
        width: d + 4,
        height: u + 4,
        fill: "none",
        stroke: "#60a5fa",
        strokeWidth: 1,
        strokeDasharray: "4 2",
        opacity: .5,
        pointerEvents: "none"
      })]
    });
  },
  bxo = ({
    stickFigure: e,
    isSelected: t,
    isInSelectedLayer: n = !1,
    onSelect: r,
    onDragStart: a,
    onJointDragStart: i
  }) => {
    const {
        x: o,
        y: s,
        scale: l,
        color: d,
        strokeWidth: u,
        opacity: h,
        joints: p
      } = e,
      m = (y, b) => {
        const v = p[y],
          _ = p[b];
        return c.jsx("line", {
          x1: v.x * l,
          y1: v.y * l,
          x2: _.x * l,
          y2: _.y * l,
          stroke: d,
          strokeWidth: u,
          opacity: h,
          strokeLinecap: "round",
          style: {
            cursor: t ? "move" : "pointer"
          },
          pointerEvents: "all",
          onMouseDown: w => {
            w.stopPropagation(), t ? a(w) : r();
          }
        }, `${y}-${b}`);
      },
      f = y => {
        const b = p[y];
        return c.jsx("circle", {
          cx: b.x * l,
          cy: b.y * l,
          r: t ? 5 : 3,
          fill: t ? "#3b82f6" : d,
          stroke: "white",
          strokeWidth: 1,
          style: {
            cursor: t ? "move" : "pointer"
          },
          pointerEvents: "all",
          onMouseDown: v => {
            v.stopPropagation(), t && i(v, y);
          }
        }, y);
      };
    return c.jsxs("g", {
      transform: `translate(${o}, ${s})`,
      style: {
        pointerEvents: "all"
      },
      children: [c.jsx("rect", {
        x: -50 * l,
        y: -70 * l,
        width: 100 * l,
        height: 140 * l,
        fill: "transparent",
        stroke: "none",
        pointerEvents: "all",
        onClick: y => {
          y.stopPropagation(), r();
        },
        onMouseDown: y => {
          t || (y.stopPropagation(), r());
        }
      }), c.jsx("circle", {
        cx: p.head.x * l,
        cy: p.head.y * l,
        r: 10 * l,
        fill: "none",
        stroke: d,
        strokeWidth: u,
        opacity: h,
        style: {
          cursor: t ? "move" : "pointer"
        },
        pointerEvents: "all",
        onMouseDown: y => {
          y.stopPropagation(), t ? a(y) : r();
        }
      }), c.jsxs("g", {
        children: [m("neck", "waist"), m("neck", "leftShoulder"), m("leftShoulder", "leftElbow"), m("leftElbow", "leftHand"), m("neck", "rightShoulder"), m("rightShoulder", "rightElbow"), m("rightElbow", "rightHand"), m("waist", "leftHip"), m("leftHip", "leftKnee"), m("leftKnee", "leftFoot"), m("waist", "rightHip"), m("rightHip", "rightKnee"), m("rightKnee", "rightFoot")]
      }), t && c.jsxs(c.Fragment, {
        children: [f("head"), f("neck"), f("leftShoulder"), f("rightShoulder"), f("leftElbow"), f("rightElbow"), f("leftHand"), f("rightHand"), f("waist"), f("leftHip"), f("rightHip"), f("leftKnee"), f("rightKnee"), f("leftFoot"), f("rightFoot")]
      }), !t && n && c.jsx("rect", {
        x: -50 * l - 2,
        y: -70 * l - 2,
        width: 100 * l + 4,
        height: 140 * l + 4,
        fill: "none",
        stroke: "#60a5fa",
        strokeWidth: 1,
        strokeDasharray: "4 2",
        opacity: .5,
        pointerEvents: "none"
      })]
    });
  },
  vxo = (e, t) => ({
    id: Date.now().toString(),
    x: e,
    y: t,
    scale: 1,
    color: "#000000",
    strokeWidth: 2,
    opacity: 1,
    joints: {
      head: {
        x: 0,
        y: -60
      },
      neck: {
        x: 0,
        y: -40
      },
      leftShoulder: {
        x: -15,
        y: -35
      },
      rightShoulder: {
        x: 15,
        y: -35
      },
      leftElbow: {
        x: -25,
        y: -15
      },
      rightElbow: {
        x: 25,
        y: -15
      },
      leftHand: {
        x: -30,
        y: 5
      },
      rightHand: {
        x: 30,
        y: 5
      },
      waist: {
        x: 0,
        y: 0
      },
      leftHip: {
        x: -10,
        y: 5
      },
      rightHip: {
        x: 10,
        y: 5
      },
      leftKnee: {
        x: -15,
        y: 30
      },
      rightKnee: {
        x: 15,
        y: 30
      },
      leftFoot: {
        x: -20,
        y: 55
      },
      rightFoot: {
        x: 20,
        y: 55
      }
    }
  });

var p0 = (e => (e.SELECT = "SELECT", e.HAND = "HAND", e.PEN = "PEN", e.ERASER = "ERASER", e.TEXT = "TEXT", e.MASK_PEN = "MASK_PEN", e.SHAPE = "SHAPE", e.STICK_FIGURE = "STICK_FIGURE", e))(p0 || {});

const wxo = Ia.memo(({
    width: e,
    height: t,
    canvasData: n,
    onUpdate: r,
    isDark: a,
    activeTool: i,
    brushSettings: o,
    textSettings: s,
    eraserSettings: l,
    shapeSettings: d = {
      type: "rectangle",
      color: "#3b82f6",
      fillMode: "stroke",
      strokeWidth: 2,
      opacity: 1
    },
    stickFigureSettings: u = {
      color: "#000000",
      strokeWidth: 2,
      opacity: 1
    },
    viewZoom: h,
    activeLayerId: p,
    onSelectLayer: m,
    onSelectImage: f,
    keyboardActive: y = !0
  }) => {
    var ke;
    const b = g.useRef(null),
      [v, _] = g.useState(!1),
      [w, k] = g.useState(!1),
      [A, S] = g.useState([]),
      [C, I] = g.useState(null),
      E = g.useRef(null),
      [M, T] = g.useState(null),
      [P, R] = g.useState(null),
      [j, B] = g.useState(null),
      [F, N] = g.useState(null),
      G = g.useRef(null),
      z = g.useRef(null),
      [V, O] = g.useState(null),
      [L, D] = g.useState("");
    g.useEffect(() => {
      f == null || f(V);
    }, [V, f]);
    const [U, H] = g.useState(null),
      [Y, K] = g.useState(null),
      [W, Q] = g.useState(!1),
      [q, ne] = g.useState(null),
      [de, le] = g.useState(null),
      [J, pe] = g.useState(null),
      [ce, we] = g.useState(null),
      X = g.useRef({
        dx: 0,
        dy: 0
      }),
      Z = g.useRef(null),
      [re, fe] = g.useState(null),
      ye = g.useCallback(ve => {
        var Ne;
        const Te = (Ne = b.current) == null ? void 0 : Ne.getBoundingClientRect();
        return Te ? {
          x: (ve.clientX - Te.left) / h,
          y: (ve.clientY - Te.top) / h
        } : {
          x: 0,
          y: 0
        };
      }, [h]),
      ie = g.useCallback(ve => {
        switch (ve) {
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
      }, []),
      ae = g.useCallback((ve, Te = 1) => {
        let Ne;
        switch (ve) {
          case "XL":
            Ne = 36;
            break;
          case "L":
            Ne = 24;
            break;
          case "S":
            Ne = 14;
            break;
          case "M":
          default:
            Ne = 16;
            break;
        }
        return `${Ne * Te}px`;
      }, []),
      be = g.useCallback(ve => {
        if (ve.stopPropagation(), i === "PEN" || i === "MASK_PEN") _(!0), S([ye(ve)]);else if (i === "ERASER") k(!0);else if (i === "SHAPE" && d) {
          const Te = ye(ve);
          Q(!0), ne(Te);
          const Ne = {
            id: Date.now().toString(),
            type: d.type,
            x: Te.x,
            y: Te.y,
            width: 0,
            height: 0,
            color: d.color,
            fillMode: d.fillMode,
            strokeWidth: d.strokeWidth,
            opacity: d.opacity,
            rotation: 0,
            layerId: p
          };
          le(Ne);
        } else if (i === "STICK_FIGURE" && u) {
          if (ve.detail === 1) {
            K(null);
            return;
          }
          if (ve.detail !== 2) return;
          const Te = ye(ve),
            Ne = vxo(Te.x, Te.y);
          Ne.color = u.color, Ne.strokeWidth = u.strokeWidth, Ne.opacity = u.opacity, Ne.layerId = p, r({
            stickFigures: [...(n.stickFigures || []), Ne]
          }), K(Ne.id);
        } else if (i === "TEXT") {
          ve.preventDefault();
          const Te = ye(ve),
            Ne = Date.now().toString(),
            me = "输入文本",
            Ae = {
              id: Ne,
              x: Te.x,
              y: Te.y,
              content: me,
              color: s.color,
              fontSize: s.fontSize,
              fontFamily: s.fontFamily,
              align: s.align,
              opacity: s.opacity,
              scale: 1,
              layerId: p
            };
          r({
            textElements: [...n.textElements, Ae]
          }), N(Ne), G.current = Ne, I(Ne), D(me);
        } else i === "SELECT" && (B(null), N(null), O(null), H(null), K(null));
      }, [i, ye, s, d, u, n.textElements, n.stickFigures, r]),
      Ee = g.useCallback((ve, Te, Ne, me, Ae) => {
        if (ve.stopPropagation(), i === "SELECT" || i === "HAND" || i === "TEXT") {
          if (Te === "image") {
            O(Ne), N(null), B(null);
            const Re = n.images.find($e => $e.id === Ne);
            Re != null && Re.layerId && m && m(Re.layerId);
          } else if (Te === "text") {
            N(Ne), G.current = Ne, O(null), B(null);
            const Re = n.textElements.find($e => $e.id === Ne);
            Re != null && Re.layerId && m && m(Re.layerId);
          } else if (Te === "stroke") {
            B(Ne), N(null), O(null);
            const Re = n.strokes.find($e => $e.id === Ne);
            Re != null && Re.layerId && m && m(Re.layerId);
          }
          !(Te === "text" && ve.detail >= 2) && (i !== "TEXT" || Te === "text" && C !== Ne) && (T({
            type: Te,
            id: Ne,
            startX: ve.clientX,
            startY: ve.clientY,
            initialX: me,
            initialY: Ae
          }), Te === "image" && (X.current = {
            dx: 0,
            dy: 0
          }, we({
            dx: 0,
            dy: 0
          })));
        }
      }, [i, C, n.images, n.textElements, n.strokes, m]),
      xe = g.useCallback((ve, Te, Ne, me) => {
        ve.stopPropagation(), ve.preventDefault(), R({
          id: Te,
          handle: Ne,
          startX: ve.clientX,
          startY: ve.clientY,
          initial: {
            x: me.x,
            y: me.y,
            w: me.width,
            h: me.height,
            contentW: me.contentWidth,
            contentH: me.contentHeight,
            contentX: me.contentX,
            contentY: me.contentY
          }
        });
      }, []);
    g.useEffect(() => {
      const ve = Ne => {
          if (v) {
            S(me => [...me, ye(Ne)]);
            return;
          }
          if (w) {
            const me = ye(Ne),
              Ae = l.size,
              Fe = [];
            n.strokes.forEach(Me => {
              const Re = Me.points.map(rt => {
                const nt = Me.x + rt.x,
                  ze = Me.y + rt.y;
                return Math.sqrt(Math.pow(nt - me.x, 2) + Math.pow(ze - me.y, 2)) >= Ae + Me.width / 2;
              });
              if (Re.every(rt => rt)) {
                Fe.push(Me);
                return;
              }
              if (Re.every(rt => !rt)) return;
              let $e = [];
              for (let rt = 0; rt < Me.points.length; rt++) if (Re[rt]) $e.push(Me.points[rt]);else {
                if ($e.length >= 2) {
                  const nt = $e.map(Xe => Me.x + Xe.x),
                    ze = $e.map(Xe => Me.y + Xe.y),
                    Le = (Math.min(...nt) + Math.max(...nt)) / 2,
                    Ke = (Math.min(...ze) + Math.max(...ze)) / 2;
                  Fe.push({
                    ...Me,
                    id: `${Me.id}-split-${Fe.length}`,
                    points: $e.map(Xe => ({
                      x: Me.x + Xe.x - Le,
                      y: Me.y + Xe.y - Ke
                    })),
                    x: Le,
                    y: Ke
                  });
                }
                $e = [];
              }
              if ($e.length >= 2) {
                const rt = $e.map(Ke => Me.x + Ke.x),
                  nt = $e.map(Ke => Me.y + Ke.y),
                  ze = (Math.min(...rt) + Math.max(...rt)) / 2,
                  Le = (Math.min(...nt) + Math.max(...nt)) / 2;
                Fe.push({
                  ...Me,
                  id: `${Me.id}-split-${Fe.length}`,
                  points: $e.map(Ke => ({
                    x: Me.x + Ke.x - ze,
                    y: Me.y + Ke.y - Le
                  })),
                  x: ze,
                  y: Le
                });
              }
            }), Fe.length !== n.strokes.length && r({
              strokes: Fe
            });
            return;
          }
          if (W && q && de) {
            const me = ye(Ne),
              Ae = Math.abs(me.x - q.x),
              Fe = Math.abs(me.y - q.y),
              Me = Math.min(me.x, q.x),
              Re = Math.min(me.y, q.y);
            le({
              ...de,
              x: Me,
              y: Re,
              width: Ae,
              height: Fe
            });
            return;
          }
          if (J) {
            const me = ye(Ne),
              Ae = (n.stickFigures || []).map(Fe => Fe.id === J.figureId ? {
                ...Fe,
                joints: {
                  ...Fe.joints,
                  [J.jointName]: {
                    x: (me.x - Fe.x) / Fe.scale,
                    y: (me.y - Fe.y) / Fe.scale
                  }
                }
              } : Fe);
            r({
              stickFigures: Ae
            });
            return;
          }
          if (P) {
            Ne.stopPropagation();
            const me = (Ne.clientX - P.startX) / h,
              Ae = (Ne.clientY - P.startY) / h;
            {
              const {
                  initial: Fe,
                  handle: Me
                } = P,
                Re = Fe.w ?? 1,
                $e = Fe.h ?? 1,
                rt = Fe.contentW ?? Re,
                nt = Fe.contentH ?? $e,
                ze = Fe.contentX ?? 0,
                Le = Fe.contentY ?? 0;
              let Ke = Fe.x,
                Xe = Fe.y,
                De = Re,
                Ye = $e,
                Ce = rt,
                He = nt,
                Ve = ze,
                it = Le;
              if (Me.length === 2) {
                const Ft = Ne.ctrlKey || Ne.metaKey,
                  We = Re / $e;
                let Ze = Re,
                  Ge = $e;
                if (Me.includes("e") && (Ze = Re + me), Me.includes("w") && (Ze = Re - me), Me.includes("s") && (Ge = $e + Ae), Me.includes("n") && (Ge = $e - Ae), Ze = Math.max(20, Ze), Ge = Math.max(20, Ge), Ft) {
                  const vt = Math.abs(Ze - Re) / Re,
                    Ht = Math.abs(Ge - $e) / $e;
                  vt > Ht ? (De = Ze, Ye = De / We) : (Ye = Ge, De = Ye * We);
                } else De = Ze, Ye = Ge;
                Me.includes("w") ? Ke = Fe.x + (Re - De) : Ke = Fe.x, Me.includes("n") ? Xe = Fe.y + ($e - Ye) : Xe = Fe.y;
                const Oe = De / Re,
                  st = Ye / $e;
                Ce = rt * Oe, He = nt * st, Ve = ze * Oe, it = Le * st;
              } else Me === "e" ? De = Math.max(20, Re + me) : Me === "s" ? Ye = Math.max(20, $e + Ae) : Me === "w" ? (De = Math.max(20, Re - me), Ke = Fe.x + (Re - De), Ve = ze - (Ke - Fe.x)) : Me === "n" && (Ye = Math.max(20, $e - Ae), Xe = Fe.y + ($e - Ye), it = Le - (Xe - Fe.y));
              const It = n.images.map(Ft => Ft.id === P.id ? {
                ...Ft,
                x: Ke,
                y: Xe,
                width: De,
                height: Ye,
                contentWidth: Ce,
                contentHeight: He,
                contentX: Ve,
                contentY: it
              } : Ft);
              r({
                images: It
              });
            }
            return;
          }
          if (M) {
            const me = (Ne.clientX - M.startX) / h,
              Ae = (Ne.clientY - M.startY) / h;
            if (M.type === "image") {
              const Fe = n.images.find(Me => Me.id === M.id);
              if (Fe) {
                let Re = M.initialX + me,
                  $e = M.initialY + Ae;
                Re = Math.max(-Fe.width + 40, Math.min(e - 40, Re)), $e = Math.max(-Fe.height + 40, Math.min(t - 40, $e));
                const rt = Re - M.initialX,
                  nt = $e - M.initialY;
                X.current = {
                  dx: rt,
                  dy: nt
                }, Z.current == null && (Z.current = requestAnimationFrame(() => {
                  Z.current = null, we({
                    ...X.current
                  });
                }));
              }
            } else if (M.type === "text") {
              const Fe = n.textElements.map(Me => Me.id === M.id ? {
                ...Me,
                x: M.initialX + me,
                y: M.initialY + Ae
              } : Me);
              r({
                textElements: Fe
              });
            } else if (M.type === "stroke") if ((n.shapes || []).find(Me => Me.id === M.id)) {
              const Me = (n.shapes || []).map(Re => Re.id === M.id ? {
                ...Re,
                x: M.initialX + me,
                y: M.initialY + Ae
              } : Re);
              r({
                shapes: Me
              });
            } else if ((n.stickFigures || []).find(Re => Re.id === M.id)) {
              const Re = (n.stickFigures || []).map($e => $e.id === M.id ? {
                ...$e,
                x: M.initialX + me,
                y: M.initialY + Ae
              } : $e);
              r({
                stickFigures: Re
              });
            } else {
              const Re = n.strokes.map($e => $e.id === M.id ? {
                ...$e,
                x: M.initialX + me,
                y: M.initialY + Ae
              } : $e);
              r({
                strokes: Re
              });
            }
          }
        },
        Te = () => {
          if (v) {
            if (_(!1), A.length > 1) {
              const Ne = A.map(Re => Re.x),
                me = A.map(Re => Re.y),
                Ae = (Math.min(...Ne) + Math.max(...Ne)) / 2,
                Fe = (Math.min(...me) + Math.max(...me)) / 2,
                Me = {
                  id: Date.now().toString(),
                  points: A.map(Re => ({
                    x: Re.x - Ae,
                    y: Re.y - Fe
                  })),
                  color: i === "MASK_PEN" ? "#a855f7" : o.color,
                  width: i === "MASK_PEN" ? 20 : o.width,
                  opacity: i === "MASK_PEN" ? .5 : o.opacity,
                  x: Ae,
                  y: Fe,
                  rotation: 0,
                  scale: 1,
                  layerId: p
                };
              r(i === "MASK_PEN" ? {
                maskStrokes: [...(n.maskStrokes || []), Me]
              } : {
                strokes: [...n.strokes, Me]
              });
            }
            S([]);
          }
          if (w && k(!1), W && de && (de.width > 5 && de.height > 5 && r({
            shapes: [...(n.shapes || []), de]
          }), Q(!1), ne(null), le(null)), J && pe(null), (M == null ? void 0 : M.type) === "image") {
            Z.current != null && (cancelAnimationFrame(Z.current), Z.current = null);
            const Ne = X.current,
              me = n.images.map(Ae => Ae.id === M.id ? {
                ...Ae,
                x: M.initialX + Ne.dx,
                y: M.initialY + Ne.dy
              } : Ae);
            r({
              images: me
            }), we(null), X.current = {
              dx: 0,
              dy: 0
            };
          }
          T(null), R(null);
        };
      return (v || w || M || P || W || J) && (window.addEventListener("mousemove", ve), window.addEventListener("mouseup", Te)), () => {
        window.removeEventListener("mousemove", ve), window.removeEventListener("mouseup", Te);
      };
    }, [v, w, A, M, P, W, q, de, J, n.strokes, n.images, n.shapes, n.stickFigures, i, o, l, d, u, r, ye, h, e, t]), g.useEffect(() => {
      if (C && E.current) {
        const ve = n.textElements.find(Te => Te.id === C);
        ve && (L !== ve.content && D(ve.content), setTimeout(() => {
          if (E.current) if (E.current.focus(), ve.content === "输入文本") E.current.select();else {
            const Te = E.current.value.length;
            E.current.setSelectionRange(Te, Te);
          }
        }, 0));
      } else D("");
    }, [C, n.textElements]), g.useEffect(() => {
      if (i !== "TEXT" || !F) return;
      const ve = n.textElements.find(Ae => Ae.id === F);
      if (!ve) return;
      const Te = {
        ...ve,
        color: s.color,
        fontSize: s.fontSize,
        fontFamily: s.fontFamily,
        align: s.align,
        opacity: s.opacity
      };
      if (Te.color === ve.color && Te.fontSize === ve.fontSize && Te.fontFamily === ve.fontFamily && Te.align === ve.align && Te.opacity === ve.opacity) return;
      const me = n.textElements.map(Ae => Ae.id === F ? Te : Ae);
      r({
        textElements: me
      });
    }, [i, F, s, n.textElements, r]), g.useEffect(() => {
      if (!y) return;
      const ve = Te => {
        var Ae, Fe, Me, Re, $e;
        const Ne = Te.target;
        if (Ne.tagName === "TEXTAREA" || Ne.tagName === "INPUT" || Ne.isContentEditable) return;
        if (Te.key === "Delete" || Te.key === "Del" || Te.code === "Delete" || Te.key === "Backspace" || Te.code === "Backspace") {
          const rt = F || G.current;
          if (rt) {
            Te.preventDefault(), Te.stopPropagation(), (Ae = Te.stopImmediatePropagation) == null || Ae.call(Te);
            const nt = n.textElements.filter(ze => ze.id !== rt);
            r({
              textElements: nt
            }), N(null), G.current = null, z.current = null, I(null), D("");
            return;
          }
          if (V) {
            Te.preventDefault(), Te.stopPropagation(), (Fe = Te.stopImmediatePropagation) == null || Fe.call(Te);
            const nt = n.images.filter(ze => ze.id !== V);
            r({
              images: nt
            }), O(null);
            return;
          }
          if (j) {
            Te.preventDefault(), Te.stopPropagation(), (Me = Te.stopImmediatePropagation) == null || Me.call(Te);
            const nt = n.strokes.filter(ze => ze.id !== j);
            r({
              strokes: nt
            }), B(null);
            return;
          }
          if (U) {
            Te.preventDefault(), Te.stopPropagation(), (Re = Te.stopImmediatePropagation) == null || Re.call(Te);
            const nt = (n.shapes || []).filter(ze => ze.id !== U);
            r({
              shapes: nt
            }), H(null);
            return;
          }
          if (Y) {
            Te.preventDefault(), Te.stopPropagation(), ($e = Te.stopImmediatePropagation) == null || $e.call(Te);
            const nt = (n.stickFigures || []).filter(ze => ze.id !== Y);
            r({
              stickFigures: nt
            }), K(null);
            return;
          }
        }
      };
      return window.addEventListener("keydown", ve, !0), () => {
        window.removeEventListener("keydown", ve, !0);
      };
    }, [y, F, V, j, U, Y, n.textElements, n.images, n.strokes, n.shapes, n.stickFigures, r]), g.useEffect(() => {
      y || (O(null), N(null), B(null), H(null), K(null), G.current = null, z.current = null, I(null), D(""));
    }, [y]);
    const he = i === "PEN" || i === "MASK_PEN" || i === "ERASER" || i === "SHAPE" || i === "STICK_FIGURE",
      ue = g.useCallback(ve => {
        const Te = n.layers || [],
          Ne = new Map(Te.map(me => [me.id, me]));
        return ve.filter(me => {
          if (!me.layerId) return !0;
          const Ae = Ne.get(me.layerId);
          return (Ae == null ? void 0 : Ae.visible) !== !1;
        });
      }, [n.layers]);
    g.useCallback(() => {
      const ve = n.layers || [],
        Te = new Map(ve.map(me => [me.id, me])),
        Ne = [];
      return n.images.forEach(me => {
        const Ae = me.layerId ? Te.get(me.layerId) : null;
        (!me.layerId || (Ae == null ? void 0 : Ae.visible) !== !1) && Ne.push({
          type: "image",
          data: me,
          layerId: me.layerId,
          zIndex: (Ae == null ? void 0 : Ae.zIndex) ?? 0
        });
      }), n.strokes.forEach(me => {
        const Ae = me.layerId ? Te.get(me.layerId) : null;
        (!me.layerId || (Ae == null ? void 0 : Ae.visible) !== !1) && Ne.push({
          type: "stroke",
          data: me,
          layerId: me.layerId,
          zIndex: (Ae == null ? void 0 : Ae.zIndex) ?? 0
        });
      }), n.textElements.forEach(me => {
        const Ae = me.layerId ? Te.get(me.layerId) : null;
        (!me.layerId || (Ae == null ? void 0 : Ae.visible) !== !1) && Ne.push({
          type: "text",
          data: me,
          layerId: me.layerId,
          zIndex: (Ae == null ? void 0 : Ae.zIndex) ?? 0
        });
      }), (n.shapes || []).forEach(me => {
        const Ae = me.layerId ? Te.get(me.layerId) : null;
        (!me.layerId || (Ae == null ? void 0 : Ae.visible) !== !1) && Ne.push({
          type: "shape",
          data: me,
          layerId: me.layerId,
          zIndex: (Ae == null ? void 0 : Ae.zIndex) ?? 0
        });
      }), (n.stickFigures || []).forEach(me => {
        const Ae = me.layerId ? Te.get(me.layerId) : null;
        (!me.layerId || (Ae == null ? void 0 : Ae.visible) !== !1) && Ne.push({
          type: "stickFigure",
          data: me,
          layerId: me.layerId,
          zIndex: (Ae == null ? void 0 : Ae.zIndex) ?? 0
        });
      }), Ne.sort((me, Ae) => me.zIndex - Ae.zIndex);
    }, [n]);
    const ge = g.useCallback(ve => {
        if (!ve) return !0;
        const Ne = (n.layers || []).find(me => me.id === ve);
        return (Ne == null ? void 0 : Ne.locked) !== !0;
      }, [n.layers]),
      _e = g.useCallback(ve => {
        if (ve.points.length === 0) return {
          x: ve.x,
          y: ve.y,
          width: 0,
          height: 0
        };
        const Te = ve.points.map($e => ve.x + $e.x),
          Ne = ve.points.map($e => ve.y + $e.y),
          me = Math.min(...Te),
          Ae = Math.max(...Te),
          Fe = Math.min(...Ne),
          Me = Math.max(...Ne),
          Re = Math.max(ve.width * 2, 10);
        return {
          x: me - Re,
          y: Fe - Re,
          width: Ae - me + Re * 2,
          height: Me - Fe + Re * 2
        };
      }, []);
    return g.useEffect(() => {
      if (!C) return;
      const ve = Ne => {
          const me = Ne.target;
          me.closest("[data-text-editor]") || me.closest(".absolute.inset-0") || (I(null), D(""));
        },
        Te = setTimeout(() => {
          document.addEventListener("mousedown", ve, !0);
        }, 100);
      return () => {
        clearTimeout(Te), document.removeEventListener("mousedown", ve, !0);
      };
    }, [C]), c.jsxs("div", {
      className: "absolute inset-0 w-full h-full",
      style: {
        width: e,
        height: t
      },
      "data-text-editor": "canvas",
      onClick: ve => {
        i === "SELECT" && ve.target === ve.currentTarget && (B(null), N(null), O(null), H(null), K(null));
      },
      children: [ue(n.images).map(ve => {
        const Te = ve.contentWidth ?? ve.width,
          Ne = ve.contentHeight ?? ve.height,
          me = ve.contentX ?? 0,
          Ae = ve.contentY ?? 0,
          Fe = n.layers || [],
          Me = ve.layerId ? Fe.find(nt => nt.id === ve.layerId) : null,
          Re = Me ? Me.zIndex * 10 + 20 : 20,
          $e = p && ve.layerId === p,
          rt = (M == null ? void 0 : M.type) === "image" && M.id === ve.id && ce;
        return c.jsx("div", {
          onMouseDown: nt => {
            ge(ve.layerId) && Ee(nt, "image", ve.id, ve.x, ve.y);
          },
          className: `absolute select-none ${(i === "SELECT" || i === "HAND") && ge(ve.layerId) ? "pointer-events-auto cursor-move" : "pointer-events-none"}`,
          style: {
            left: ve.x,
            top: ve.y,
            width: ve.width,
            height: ve.height,
            opacity: ve.opacity,
            zIndex: Re,
            ...(rt ? {
              transform: `translate(${ce.dx}px, ${ce.dy}px)`,
              willChange: "transform"
            } : {})
          },
          children: c.jsxs("div", {
            className: `w-full h-full relative ${V === ve.id ? "ring-2 ring-blue-500" : $e ? "ring-2 ring-blue-400/50" : ""}`,
            style: {
              transformOrigin: "50% 50%",
              transform: `rotate(${ve.rotation ?? 0}deg) scaleX(${ve.flipHorizontal ? -1 : 1}) scaleY(${ve.flipVertical ? -1 : 1})`
            },
            children: [c.jsx("div", {
              className: "absolute inset-0 overflow-hidden",
              children: c.jsx("img", {
                src: ve.src,
                className: "absolute max-w-none pointer-events-none",
                style: {
                  width: Te,
                  height: Ne,
                  left: me,
                  top: Ae
                },
                alt: "User Element"
              })
            }), V === ve.id && i === "SELECT" && c.jsxs(c.Fragment, {
              children: [c.jsx("div", {
                className: "absolute -top-1 -left-1 w-3 h-3 bg-white border border-blue-500 rounded-full cursor-nw-resize z-50",
                onMouseDown: nt => xe(nt, ve.id, "nw", ve)
              }), c.jsx("div", {
                className: "absolute -top-1 -right-1 w-3 h-3 bg-white border border-blue-500 rounded-full cursor-ne-resize z-50",
                onMouseDown: nt => xe(nt, ve.id, "ne", ve)
              }), c.jsx("div", {
                className: "absolute -bottom-1 -left-1 w-3 h-3 bg-white border border-blue-500 rounded-full cursor-sw-resize z-50",
                onMouseDown: nt => xe(nt, ve.id, "sw", ve)
              }), c.jsx("div", {
                className: "absolute -bottom-1 -right-1 w-3 h-3 bg-white border border-blue-500 rounded-full cursor-se-resize z-50",
                onMouseDown: nt => xe(nt, ve.id, "se", ve)
              }), c.jsx("div", {
                className: "absolute top-1/2 -translate-y-1/2 -left-1 w-3 h-3 bg-white border border-blue-500 rounded-full cursor-ew-resize z-50",
                onMouseDown: nt => xe(nt, ve.id, "w", ve)
              }), c.jsx("div", {
                className: "absolute top-1/2 -translate-y-1/2 -right-1 w-3 h-3 bg-white border border-blue-500 rounded-full cursor-ew-resize z-50",
                onMouseDown: nt => xe(nt, ve.id, "e", ve)
              }), c.jsx("div", {
                className: "absolute left-1/2 -translate-x-1/2 -top-1 w-3 h-3 bg-white border border-blue-500 rounded-full cursor-ns-resize z-50",
                onMouseDown: nt => xe(nt, ve.id, "n", ve)
              }), c.jsx("div", {
                className: "absolute left-1/2 -translate-x-1/2 -bottom-1 w-3 h-3 bg-white border border-blue-500 rounded-full cursor-ns-resize z-50",
                onMouseDown: nt => xe(nt, ve.id, "s", ve)
              })]
            })]
          })
        }, ve.id);
      }), ue(n.strokes).map(ve => {
        const Te = _e(ve),
          Ne = n.layers || [],
          me = ve.layerId ? Ne.find(Me => Me.id === ve.layerId) : null,
          Ae = me ? me.zIndex * 10 + 30 : 30,
          Fe = p && ve.layerId === p;
        return c.jsx("svg", {
          className: "absolute inset-0 w-full h-full pointer-events-none",
          style: {
            zIndex: Ae
          },
          children: c.jsxs("g", {
            children: [i === "SELECT" && ge(ve.layerId) && c.jsx("rect", {
              x: Te.x,
              y: Te.y,
              width: Te.width,
              height: Te.height,
              fill: "transparent",
              stroke: "none",
              className: "cursor-pointer pointer-events-auto",
              onMouseDown: Me => {
                ge(ve.layerId) && (Me.stopPropagation(), Ee(Me, "stroke", ve.id, ve.x, ve.y));
              }
            }), (j === ve.id || Fe) && c.jsx("path", {
              d: `M ${ve.points.map(Me => `${ve.x + Me.x} ${ve.y + Me.y}`).join(" L ")}`,
              fill: "none",
              stroke: j === ve.id ? "#3b82f6" : "#60a5fa",
              strokeWidth: ve.width + 4,
              strokeLinecap: "round",
              opacity: j === ve.id ? .5 : .3,
              pointerEvents: "none"
            }), c.jsx("path", {
              d: `M ${ve.points.map(Me => `${ve.x + Me.x} ${ve.y + Me.y}`).join(" L ")}`,
              fill: "none",
              stroke: ve.color,
              strokeWidth: ve.width,
              strokeLinecap: "round",
              strokeOpacity: ve.opacity,
              pointerEvents: "none"
            })]
          })
        }, ve.id);
      }), ue(n.shapes || []).map(ve => {
        const Te = n.layers || [],
          Ne = ve.layerId ? Te.find(Fe => Fe.id === ve.layerId) : null,
          me = Ne ? Ne.zIndex * 10 + 30 : 30,
          Ae = p && ve.layerId === p;
        return c.jsx("svg", {
          className: "absolute inset-0 w-full h-full pointer-events-none",
          style: {
            zIndex: me
          },
          children: c.jsx(Syn, {
            shape: ve,
            isSelected: U === ve.id,
            isInSelectedLayer: !!Ae,
            onSelect: () => {
              i === "SELECT" && ge(ve.layerId) && (H(ve.id), N(null), O(null), B(null), K(null), ve.layerId && m && m(ve.layerId));
            },
            onDragStart: Fe => {
              i === "SELECT" && ge(ve.layerId) && T({
                type: "stroke",
                id: ve.id,
                startX: Fe.clientX,
                startY: Fe.clientY,
                initialX: ve.x,
                initialY: ve.y
              });
            },
            onResizeStart: (Fe, Me) => {
              Fe.stopPropagation();
            }
          })
        }, ve.id);
      }), ue(n.stickFigures || []).map(ve => {
        const Te = n.layers || [],
          Ne = ve.layerId ? Te.find(Me => Me.id === ve.layerId) : null,
          me = i === "STICK_FIGURE" ? Ne ? Ne.zIndex * 10 + 1100 : 1100 : Ne ? Ne.zIndex * 10 + 30 : 30,
          Ae = p && ve.layerId === p,
          Fe = (i === "SELECT" || i === "STICK_FIGURE") && ge(ve.layerId);
        return c.jsx("svg", {
          className: "absolute inset-0 w-full h-full pointer-events-none",
          style: {
            zIndex: me
          },
          children: c.jsx(bxo, {
            stickFigure: ve,
            isSelected: Y === ve.id,
            isInSelectedLayer: !!Ae,
            onSelect: () => {
              Fe && (K(ve.id), N(null), O(null), B(null), H(null), ve.layerId && m && m(ve.layerId));
            },
            onDragStart: Me => {
              Fe && T({
                type: "stroke",
                id: ve.id,
                startX: Me.clientX,
                startY: Me.clientY,
                initialX: ve.x,
                initialY: ve.y
              });
            },
            onJointDragStart: (Me, Re) => {
              Fe && (Me.stopPropagation(), pe({
                figureId: ve.id,
                jointName: Re
              }));
            }
          })
        }, ve.id);
      }), c.jsxs("svg", {
        ref: b,
        className: `absolute inset-0 w-full h-full z-[1000] ${i === "ERASER" ? "cursor-cell" : i === "SHAPE" || i === "STICK_FIGURE" || he ? "cursor-crosshair" : i === "TEXT" ? "cursor-text" : "cursor-default"} ${he || i === "TEXT" && !C ? "pointer-events-auto" : "pointer-events-none"}`,
        onMouseDown: ve => be(ve),
        onMouseMove: ve => {
          i === "ERASER" && fe(ye(ve));
        },
        onMouseLeave: () => {
          i === "ERASER" && fe(null);
        },
        children: [(ke = n.maskStrokes) == null ? void 0 : ke.map(ve => c.jsx("path", {
          d: `M ${ve.points.map(Te => `${ve.x + Te.x} ${ve.y + Te.y}`).join(" L ")}`,
          fill: "none",
          stroke: "#a855f7",
          strokeWidth: ve.width,
          strokeLinecap: "round",
          strokeOpacity: .4
        }, ve.id)), v && c.jsx("path", {
          d: `M ${A.map(ve => `${ve.x} ${ve.y}`).join(" L ")}`,
          fill: "none",
          stroke: i === "MASK_PEN" ? "#a855f7" : o.color,
          strokeWidth: i === "MASK_PEN" ? 20 : o.width,
          strokeOpacity: i === "MASK_PEN" ? .5 : o.opacity,
          strokeLinecap: "round"
        }), de && c.jsx(Syn, {
          shape: de,
          isSelected: !1,
          isInSelectedLayer: !1,
          onSelect: () => {},
          onDragStart: () => {},
          onResizeStart: () => {}
        }), i === "ERASER" && re && c.jsx("circle", {
          cx: re.x,
          cy: re.y,
          r: l.size,
          fill: "none",
          stroke: "#ef4444",
          strokeWidth: 2,
          strokeDasharray: "4 2",
          opacity: .6,
          pointerEvents: "none"
        })]
      }), ue(n.textElements).map(ve => {
        const Te = n.layers || [],
          Ne = ve.layerId ? Te.find(Fe => Fe.id === ve.layerId) : null,
          me = i === "TEXT" ? Ne ? Ne.zIndex * 10 + 1100 : 1100 : Ne ? Ne.zIndex * 10 + 40 : 40,
          Ae = p && ve.layerId === p;
        return c.jsx("div", {
          onMouseEnter: () => {
            z.current = ve.id;
          },
          onMouseLeave: () => {
            z.current === ve.id && (z.current = null);
          },
          onMouseDown: Fe => {
            ge(ve.layerId) && Ee(Fe, "text", ve.id, ve.x, ve.y);
          },
          onDoubleClick: Fe => {
            (i === "SELECT" || i === "TEXT") && ge(ve.layerId) && (Fe.stopPropagation(), I(ve.id));
          },
          className: `absolute ${F === ve.id && C !== ve.id ? "ring-1 ring-blue-500 bg-blue-500/10 select-none" : Ae && C !== ve.id ? "ring-1 ring-blue-400/50 bg-blue-400/5 select-none" : C === ve.id ? "" : "select-none"} ${C === ve.id ? "pointer-events-auto cursor-text" : (i === "SELECT" || i === "HAND" || i === "TEXT") && ge(ve.layerId) ? "pointer-events-auto cursor-move" : "pointer-events-none"}`,
          style: {
            left: ve.x,
            top: ve.y,
            color: ve.color,
            opacity: ve.opacity,
            zIndex: me,
            transform: `translateX(${ve.align === "center" ? "-50%" : ve.align === "right" ? "-100%" : "0"})`
          },
          children: c.jsx("div", {
            className: "relative inline-block",
            style: {
              transform: `scale(${ve.scale ?? 1})`,
              transformOrigin: ve.align === "center" ? "center" : ve.align === "right" ? "right" : "left"
            },
            children: C === ve.id ? c.jsx("div", {
              "data-text-editor": "container",
              onMouseDown: Fe => Fe.stopPropagation(),
              children: c.jsx("textarea", {
                ref: E,
                value: L,
                onChange: Fe => {
                  Fe.stopPropagation(), D(Fe.target.value);
                },
                onFocus: Fe => {
                  Fe.stopPropagation();
                },
                onClick: Fe => {
                  Fe.stopPropagation(), E.current && E.current.focus();
                },
                onMouseDown: Fe => {
                  Fe.stopPropagation(), Fe.preventDefault();
                },
                "data-text-editor": "textarea",
                className: "bg-transparent border-none outline-none resize-none overflow-hidden whitespace-pre p-0 m-0",
                autoFocus: !0,
                style: {
                  color: ve.color,
                  fontFamily: ie(ve.fontFamily),
                  fontSize: ae(ve.fontSize, ve.scale ?? 1),
                  textAlign: ve.align,
                  minWidth: "100px",
                  height: "auto",
                  lineHeight: "1.2",
                  boxSizing: "content-box",
                  textShadow: "0 1px 2px rgba(0,0,0,0.3)"
                },
                onBlur: Fe => {
                  I(null);
                  const Me = Fe.target.value;
                  if (Me.trim()) {
                    const Re = n.textElements.map($e => $e.id === ve.id ? {
                      ...$e,
                      content: Me
                    } : $e);
                    r({
                      textElements: Re
                    });
                  } else {
                    const Re = n.textElements.filter($e => $e.id !== ve.id);
                    r({
                      textElements: Re
                    });
                  }
                  D("");
                },
                onKeyDown: Fe => {
                  if (Fe.stopPropagation(), Fe.key === "Escape") Fe.preventDefault(), I(null), D("");else if (Fe.key === "Delete" || Fe.key === "Backspace") {
                    const Me = Fe.target,
                      Re = Me.selectionStart || 0,
                      $e = Me.selectionEnd || 0;
                    if (Re === $e) {
                      if (Re > 0 && Fe.key === "Backspace") {
                        Fe.preventDefault();
                        const rt = L.slice(0, Re - 1) + L.slice(Re);
                        D(rt), setTimeout(() => {
                          E.current && (E.current.selectionStart = Re - 1, E.current.selectionEnd = Re - 1);
                        }, 0);
                      } else if (Re < L.length && Fe.key === "Delete") {
                        Fe.preventDefault();
                        const rt = L.slice(0, Re) + L.slice(Re + 1);
                        D(rt);
                      }
                    } else {
                      Fe.preventDefault();
                      const rt = L.slice(0, Re) + L.slice($e);
                      D(rt), setTimeout(() => {
                        E.current && (E.current.selectionStart = Re, E.current.selectionEnd = Re);
                      }, 0);
                    }
                  }
                }
              })
            }) : c.jsx("span", {
              style: {
                fontFamily: ie(ve.fontFamily),
                fontSize: ae(ve.fontSize, 1)
              },
              className: "font-bold drop-shadow-md whitespace-pre",
              children: ve.content
            })
          })
        }, ve.id);
      })]
    });
  }, (e, t) => !(e.width !== t.width || e.height !== t.height || e.isDark !== t.isDark || e.activeTool !== t.activeTool || e.viewZoom !== t.viewZoom || e.activeLayerId !== t.activeLayerId || e.canvasData !== t.canvasData || e.brushSettings !== t.brushSettings || e.textSettings !== t.textSettings || e.eraserSettings !== t.eraserSettings || e.shapeSettings !== t.shapeSettings || e.stickFigureSettings !== t.stickFigureSettings || e.onUpdate !== t.onUpdate || e.onSelectLayer !== t.onSelectLayer || e.onSelectImage !== t.onSelectImage)),
  xxo = ({
    layers: e,
    selectedLayerId: t,
    onSelectLayer: n,
    onUpdateLayer: r,
    onUpdateLayers: a,
    onDeleteLayer: i,
    onMoveLayer: o,
    onCreateLayer: s,
    isDark: l
  }) => {
    on();
    const [d, u] = g.useState(null),
      [h, p] = g.useState(""),
      [m, f] = g.useState(null),
      [y, b] = g.useState(null),
      v = [...e].sort((M, T) => T.zIndex - M.zIndex),
      _ = M => {
        u(M.id), p(M.name);
      },
      w = () => {
        d && h.trim() && r(d, {
          name: h.trim()
        }), u(null), p("");
      },
      k = () => {
        u(null), p("");
      },
      A = (M, T) => {
        M.stopPropagation(), f(T), M.dataTransfer.effectAllowed = "move", M.dataTransfer.setData("text/plain", T);
      },
      S = (M, T) => {
        M.preventDefault(), M.stopPropagation(), M.dataTransfer.dropEffect = "move", m && m !== T && b(T);
      },
      C = () => {
        b(null);
      },
      I = (M, T) => {
        if (M.preventDefault(), M.stopPropagation(), !m || m === T) {
          f(null), b(null);
          return;
        }
        const P = e.find(j => j.id === m),
          R = e.find(j => j.id === T);
        if (P && R) {
          const j = P.zIndex;
          a ? a([{
            layerId: m,
            updates: {
              zIndex: R.zIndex
            }
          }, {
            layerId: T,
            updates: {
              zIndex: j
            }
          }]) : (r(m, {
            zIndex: R.zIndex
          }), setTimeout(() => {
            r(T, {
              zIndex: j
            });
          }, 0));
        }
        f(null), b(null);
      },
      E = () => {
        f(null), b(null);
      };
    return c.jsxs("div", {
      className: `h-32 flex flex-col border-t ${l ? "bg-[#1f1f1f] border-zinc-800" : "bg-zinc-50 border-zinc-200"}`,
      onMouseDown: M => M.stopPropagation(),
      children: [c.jsxs("div", {
        className: `h-8 flex items-center justify-between px-3 border-b ${l ? "border-zinc-800" : "border-zinc-200"}`,
        children: [c.jsx("span", {
          className: `text-xs font-medium ${l ? "text-zinc-300" : "text-zinc-700"}`,
          children: x("图层管理")
        }), c.jsxs("button", {
          onClick: s,
          className: `flex items-center gap-1 px-2 py-0.5 rounded text-[10px] transition-colors ${l ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300" : "bg-zinc-200 hover:bg-zinc-300 text-zinc-700"}`,
          children: [c.jsx(eo, {
            size: 12
          }), x("新建图层")]
        })]
      }), c.jsx("div", {
        className: "flex-1 overflow-x-auto overflow-y-hidden",
        children: v.length === 0 ? c.jsx("div", {
          className: `h-full flex items-center justify-center text-xs ${l ? "text-zinc-500" : "text-zinc-400"}`,
          children: x('暂无图层，点击"新建图层"开始')
        }) : c.jsx("div", {
          className: "h-full flex items-center gap-2 px-3 py-2",
          children: v.map(M => c.jsxs("div", {
            className: `flex-shrink-0 w-32 h-full flex flex-col rounded border-2 transition-all ${t === M.id ? "border-blue-500 bg-blue-500/20" : y === M.id ? "border-blue-500 bg-blue-500/10" : m === M.id ? "border-zinc-500 opacity-50" : l ? "border-zinc-700 bg-zinc-800 hover:border-zinc-600" : "border-zinc-300 bg-white hover:border-zinc-400"}`,
            onClick: () => n == null ? void 0 : n(M.id),
            onDragOver: T => S(T, M.id),
            onDragLeave: C,
            onDrop: T => I(T, M.id),
            children: [c.jsx("div", {
              className: "flex-1 flex items-center justify-center px-2 py-1 cursor-move select-none",
              draggable: !0,
              onDragStart: T => {
                T.stopPropagation(), A(T, M.id);
              },
              onDragEnd: E,
              onMouseDown: T => {
                T.stopPropagation();
              },
              children: d === M.id ? c.jsx("input", {
                type: "text",
                value: h,
                onChange: T => p(T.target.value),
                onKeyDown: T => {
                  T.key === "Enter" && w(), T.key === "Escape" && k(), T.stopPropagation();
                },
                onClick: T => T.stopPropagation(),
                className: `w-full px-1 py-0.5 text-xs text-center rounded border ${l ? "bg-zinc-700 border-zinc-600 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"}`,
                autoFocus: !0
              }) : c.jsx("span", {
                className: `text-xs truncate ${l ? "text-zinc-300" : "text-zinc-700"}`,
                children: M.name
              })
            }), c.jsx("div", {
              className: `flex items-center justify-center gap-1 px-1 py-1 border-t ${l ? "border-zinc-700" : "border-zinc-200"}`,
              draggable: !1,
              onMouseDown: T => T.stopPropagation(),
              children: d === M.id ? c.jsxs(c.Fragment, {
                children: [c.jsx("button", {
                  onClick: T => {
                    T.stopPropagation(), w();
                  },
                  className: "p-0.5 text-green-500 hover:text-green-400",
                  children: c.jsx(io, {
                    size: 12
                  })
                }), c.jsx("button", {
                  onClick: T => {
                    T.stopPropagation(), k();
                  },
                  className: "p-0.5 text-red-500 hover:text-red-400",
                  children: c.jsx(Na, {
                    size: 12
                  })
                })]
              }) : c.jsxs(c.Fragment, {
                children: [c.jsx("button", {
                  onClick: T => {
                    T.stopPropagation(), r(M.id, {
                      visible: !M.visible
                    });
                  },
                  className: `p-0.5 rounded transition-colors ${M.visible ? l ? "text-zinc-400 hover:text-zinc-200" : "text-zinc-600 hover:text-zinc-800" : "text-red-500 hover:text-red-400"}`,
                  title: M.visible ? x("隐藏") : x("显示"),
                  children: M.visible ? c.jsx(ul, {
                    size: 12
                  }) : c.jsx($d, {
                    size: 12
                  })
                }), c.jsx("button", {
                  onClick: T => {
                    T.stopPropagation(), _(M);
                  },
                  className: `p-0.5 ${l ? "text-zinc-500 hover:text-zinc-300" : "text-zinc-400 hover:text-zinc-600"}`,
                  title: x("重命名"),
                  children: c.jsx(bEt, {
                    size: 12
                  })
                }), c.jsx("button", {
                  onClick: T => {
                    T.stopPropagation(), confirm(x('确定要删除图层"{0}"吗？该图层上的所有元素也会被删除。', M.name)) && i(M.id);
                  },
                  className: "p-0.5 rounded text-red-500 hover:text-red-400 transition-colors",
                  title: x("删除"),
                  children: c.jsx(Qo, {
                    size: 12
                  })
                })]
              })
            })]
          }, M.id))
        })
      })]
    });
  },
  eGe = 64;

function u3t(e, t) {
  return {
    width: Math.max(1, Math.round(e)),
    height: Math.max(1, Math.round(t - eGe))
  };
}

const Iyn = Object.freeze(Object.defineProperty({
  __proto__: null,
  CANVAS_NODE_CHROME_H: eGe,
  getCanvasNodeEditorSize: u3t
}, Symbol.toStringTag, {
  value: "Module"
}));

function NPe(e) {
  const t = /^imported-(.+)-(\d+)$/.exec(e);
  return (t == null ? void 0 : t[1]) ?? null;
}

function Cyn(e, t) {
  return e.some(n => n.id.startsWith(`imported-${t}-`));
}

function _xo(e) {
  return new Promise((t, n) => {
    const r = new Image();
    r.onload = () => t({
      width: r.naturalWidth || r.width,
      height: r.naturalHeight || r.height
    }), r.onerror = () => n(new Error("image load failed")), r.src = e;
  });
}

const Hte = ({
    tool: e,
    activeTool: t,
    onClick: n,
    icon: r,
    isDark: a,
    title: i
  }) => {
    on();
    const o = e === t;
    return c.jsx("button", {
      type: "button",
      title: i,
      onClick: s => {
        s.stopPropagation(), n();
      },
      className: `w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${o ? a ? "bg-blue-600 text-white" : "bg-black text-white" : a ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800" : "text-zinc-600 hover:text-zinc-800 hover:bg-zinc-200"}`,
      children: r
    });
  },
  jPe = ({
    color: e,
    onChange: t,
    isDark: n
  }) => {
    on();
    const r = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899", "#ffffff", "#000000"];
    return c.jsx("div", {
      className: "flex items-center gap-1",
      children: r.map(a => c.jsx("button", {
        onClick: i => {
          i.stopPropagation(), t(a);
        },
        className: `w-5 h-5 rounded-full border-2 transition-all ${e === a ? n ? "border-blue-500 scale-110" : "border-black scale-110" : n ? "border-zinc-600 hover:border-zinc-500" : "border-zinc-300 hover:border-zinc-400"}`,
        style: {
          backgroundColor: a
        }
      }, a))
    });
  },
  Eyn = ({
    size: e,
    onChange: t,
    isDark: n
  }) => {
    on();
    const r = [2, 4, 8];
    return c.jsx("div", {
      className: "flex items-center gap-1",
      children: r.map(a => c.jsxs("button", {
        onClick: i => {
          i.stopPropagation(), t(a);
        },
        className: `px-2 py-0.5 rounded text-[10px] transition-colors ${e === a ? n ? "bg-blue-600 text-white" : "bg-black text-white" : n ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700" : "bg-zinc-200 text-zinc-600 hover:bg-zinc-300"}`,
        children: [a, "px"]
      }, a))
    });
  },
  kxo = ({
    node: e,
    isDark: t,
    updateNode: n,
    deleteNode: r,
    viewZoom: a,
    connections: i,
    nodes: o,
    setNodes: s,
    setConnections: l,
    generateId: d,
    selectedNodeId: u = null
  }) => {
    var X;
    on();
    const h = u === e.id,
      p = g.useCallback(async Z => {
        var be;
        if (Z.type === "gen-image") {
          const Ee = Zo(Z);
          if (typeof Ee == "string" && /^https?:\/\//i.test(Ee) && !/\/thumbnails\//i.test(Ee)) return Ee;
          const xe = Xl(Z),
            he = ((be = xe == null ? void 0 : xe.assetId) == null ? void 0 : be.trim()) || "";
          if (ei() && he) try {
            const {
              localCacheManager: ge
            } = await Ie(async () => {
              const {
                localCacheManager: ke
              } = await Promise.resolve().then(() => Ha);
              return {
                localCacheManager: ke
              };
            }, void 0, import.meta.url);
            await ge.ensureRestored();
            const _e = await ge.getConvertFileSrcForAsset(he);
            if (_e) return _e;
          } catch {}
          const ue = String((xe == null ? void 0 : xe.url) || Z.content || "").trim();
          if (!ue) return null;
          if (ue.startsWith("blob:") && he) {
            const ge = await exe(ue, he, null);
            if (ge) return ge;
          }
          return ue;
        }
        const re = Z.settings || {};
        if (String(re.mediaType || "image").toLowerCase() !== "image") return null;
        const ye = Vh(Z);
        if (typeof ye == "string" && /^https?:\/\//i.test(ye)) return ye;
        const ie = typeof re._blobUrl == "string" ? re._blobUrl.trim() : "";
        if (ie.startsWith("blob:")) return ie;
        const ae = typeof Z.content == "string" ? Z.content : "";
        if (ae.startsWith("blob:")) {
          const Ee = Z._contentAssetId || (typeof re._contentAssetId == "string" ? re._contentAssetId : "") || (typeof re._assetId == "string" ? re._assetId : ""),
            xe = typeof re._compactOriginalRelPath == "string" ? re._compactOriginalRelPath : null,
            he = await exe(ae, Ee || null, xe);
          if (he) return he;
        }
        return ae || null;
      }, []),
      m = g.useMemo(() => i.filter(Z => Z.to === e.id).map(Z => {
        const re = o.find(fe => fe.id === Z.from);
        if (re && (re.type === "input-image" || re.type === "gen-image")) return re;
      }).filter(Z => Z != null), [i, o, e.id]),
      f = g.useMemo(() => {
        var re;
        const Z = m[0];
        return Z ? typeof Z.content == "string" && Z.content.trim() ? Z.content.trim() : Z.type === "gen-image" ? String(((re = Xl(Z)) == null ? void 0 : re.url) || "").trim() : "" : "";
      }, [m]),
      y = ((X = e.settings) == null ? void 0 : X.canvasData) || {
        strokes: [],
        maskStrokes: [],
        textElements: [],
        images: [],
        backgroundColor: "transparent",
        aspectRatio: "1:1",
        width: e.width,
        height: e.height
      },
      b = g.useRef(new Set()),
      v = g.useRef(new Set());
    g.useEffect(() => {
      const Z = new Set(),
        re = [],
        fe = new Set();
      let ye = !1;
      for (const ae of y.images) {
        const be = NPe(ae.id);
        if (be) {
          if (b.current.add(be), Z.has(be)) {
            ye = !0, ae.layerId && fe.add(ae.layerId);
            continue;
          }
          Z.add(be);
        }
        re.push(ae);
      }
      if (!ye) return;
      const ie = (y.layers || []).filter(ae => !fe.has(ae.id));
      s(ae => ae.map(be => {
        var xe;
        if (be.id !== e.id) return be;
        const Ee = ((xe = be.settings) == null ? void 0 : xe.canvasData) || y;
        return {
          ...be,
          settings: {
            ...be.settings,
            canvasData: {
              ...Ee,
              images: re,
              layers: ie
            }
          }
        };
      }));
    }, [e.id]), g.useEffect(() => {
      for (const Z of y.images) {
        const re = NPe(Z.id);
        re && b.current.add(re);
      }
    }, [y.images]), g.useEffect(() => {
      if (!m.length) return;
      const Z = e.width,
        re = Math.max(1, e.height - eGe),
        fe = [],
        ye = [],
        ie = [];
      m.forEach((ae, be) => {
        if (!(typeof ae.content == "string" && ae.content.trim() || ae.type === "gen-image")) return;
        if (b.current.has(ae.id) || v.current.has(ae.id) || Cyn(y.images, ae.id)) {
          b.current.add(ae.id);
          return;
        }
        b.current.add(ae.id), v.current.add(ae.id);
        const xe = (async () => {
          var ge, _e;
          let he,
            ue = null;
          try {
            const ke = await p(ae);
            if (!ke) {
              b.current.delete(ae.id);
              return;
            }
            const ve = typeof ((ge = ae.settings) == null ? void 0 : ge._blobUrl) == "string" ? String((_e = ae.settings) == null ? void 0 : _e._blobUrl) : "";
            ue = ke.startsWith("blob:") && ke !== ae.content && ke !== ve ? ke : null;
            try {
              he = await GCn(ke);
            } catch (Te) {
              console.error("[CanvasNode] 图片压缩失败，使用原图:", Te), he = ke;
            }
            await new Promise(Te => {
              const Ne = new Image();
              Ne.onload = () => {
                const me = Z * .7,
                  Ae = re * .7;
                let Fe = Ne.width,
                  Me = Ne.height;
                const Re = me / Ne.width,
                  $e = Ae / Ne.height,
                  rt = Math.min(Re, $e, 1);
                Fe = Ne.width * rt, Me = Ne.height * rt;
                const nt = (Z - Fe) / 2,
                  ze = (re - Me) / 2,
                  Le = be * 30,
                  Ke = be * 30,
                  Xe = Date.now(),
                  De = `layer-image-${ae.id}-${Xe}`,
                  Ye = y.layers || [],
                  Ce = Ye.length > 0 ? Math.max(...Ye.map(it => it.zIndex)) : -1,
                  He = {
                    id: De,
                    name: `图片 ${be + 1}`,
                    visible: !0,
                    locked: !1,
                    zIndex: Ce + 1 + be
                  },
                  Ve = {
                    id: `imported-${ae.id}-${Xe}`,
                    x: nt + Le,
                    y: ze + Ke,
                    width: Fe,
                    height: Me,
                    src: he,
                    opacity: 1,
                    rotation: 0,
                    contentWidth: void 0,
                    contentHeight: void 0,
                    contentX: 0,
                    contentY: 0,
                    layerId: De
                  };
                if (fe.push(Ve), ye.push(He), ue) try {
                  URL.revokeObjectURL(ue);
                } catch {}
                Te();
              }, Ne.onerror = () => {
                if (console.error("[CanvasNode] 图片加载失败:", ae.id), ue) try {
                  URL.revokeObjectURL(ue);
                } catch {}
                Te();
              }, Ne.src = he;
            });
          } finally {
            v.current.delete(ae.id);
          }
        })();
        ie.push(xe);
      }), Promise.all(ie).then(() => {
        fe.length !== 0 && s(ae => ae.map(be => {
          var ke;
          if (be.id !== e.id) return be;
          const Ee = ((ke = be.settings) == null ? void 0 : ke.canvasData) || y,
            xe = Ee.images || [],
            he = Ee.layers || [],
            ue = fe.filter(ve => {
              const Te = NPe(ve.id);
              return !Te || !Cyn(xe, Te);
            });
          if (ue.length === 0) return be;
          const ge = new Set(ue.map(ve => ve.layerId).filter(Boolean)),
            _e = ye.filter(ve => ge.has(ve.id) && !he.some(Te => Te.id === ve.id));
          return {
            ...be,
            settings: {
              ...be.settings,
              canvasData: {
                ...Ee,
                images: [...xe, ...ue],
                layers: [...he, ..._e]
              }
            }
          };
        }));
      });
    }, [m.map(Z => `${Z.id}-${Z.type}-${Z.content || ""}-${Zo(Z) || ""}`).join(","), e.width, e.height, e.id, y.images, y.layers, s, p]), g.useEffect(() => {
      const Z = new Set(m.map(re => re.id));
      b.current.forEach(re => {
        Z.has(re) || (b.current.delete(re), v.current.delete(re));
      });
    }, [m.map(Z => Z.id).join(",")]);
    const _ = g.useMemo(() => i.filter(Z => Z.from === e.id).map(Z => o.find(re => re.id === Z.to && re.type === "input-image")).filter(Z => Z != null), [i, o, e.id]),
      w = g.useRef(new Set());
    g.useEffect(() => {
      if (!_.length) {
        w.current.clear();
        return;
      }
      const Z = _.map(ye => ye.id),
        re = Z.filter(ye => !w.current.has(ye));
      if (re.length > 0) {
        if (!(y.strokes.length > 0 || y.textElements.length > 0 || y.images.length > 0)) {
          re.forEach(ae => w.current.add(ae));
          return;
        }
        re.forEach(ae => w.current.add(ae));
        const ie = _.filter(ae => re.includes(ae.id));
        (async () => {
          try {
            const {
                width: ae,
                height: be
              } = u3t(e.width, e.height),
              Ee = await lue(y, ae, be, !1, !0);
            ie.forEach(xe => {
              n(xe.id, {
                content: Ee
              });
            });
          } catch (ae) {
            console.error("[CanvasNode] 自动更新下游图片输入节点失败:", ae);
          }
        })();
      }
      const fe = new Set(Z);
      w.current.forEach(ye => {
        fe.has(ye) || w.current.delete(ye);
      });
    }, [_.map(Z => Z.id).join(","), e.width, e.height, n]);
    const [k, A] = g.useState(p0.SELECT),
      [S, C] = g.useState(null);
    g.useEffect(() => {
      h || C(null);
    }, [h]);
    const [I, E] = g.useState(!1),
      [M, T] = g.useState(null),
      P = g.useRef(null),
      [R, j] = g.useState({
        color: "#ef4444",
        width: 4,
        opacity: 1
      }),
      [B, F] = g.useState({
        color: "#ffffff",
        fontFamily: "sans",
        fontSize: "M",
        align: "left",
        opacity: 1
      }),
      [N, G] = g.useState({
        size: 20
      }),
      [z, V] = g.useState({
        type: "rectangle",
        color: "#3b82f6",
        fillMode: "stroke",
        strokeWidth: 2,
        opacity: 1
      }),
      [O, L] = g.useState({
        color: "#000000",
        strokeWidth: 2,
        opacity: 1
      });
    g.useEffect(() => {
      const Z = P.current;
      if (!Z) return;
      const re = setTimeout(() => {
        const fe = Z.scrollWidth,
          ye = Z.clientWidth;
        if (fe > ye + 10) {
          const ie = Math.min(fe + 60, 1200);
          ie > e.width && n(e.id, {
            width: ie
          });
        }
      }, 100);
      return () => clearTimeout(re);
    }, [e.id, e.width, n, k, S, I]), g.useEffect(() => {
      const Z = re => {
        var ye;
        if (re.key !== "t" && re.key !== "T") return;
        const fe = re.target;
        (ye = fe == null ? void 0 : fe.closest) != null && ye.call(fe, 'input, textarea, [contenteditable="true"]') || (re.preventDefault(), re.stopPropagation(), A(p0.TEXT));
      };
      return window.addEventListener("keydown", Z, !0), () => window.removeEventListener("keydown", Z, !0);
    }, []);
    const D = g.useCallback(Z => {
      n(e.id, {
        settings: {
          ...e.settings,
          canvasData: {
            ...y,
            ...Z
          }
        }
      });
    }, [e.id, e.settings, y, n]);
    g.useEffect(() => {
      if (!y.layers || y.layers.length === 0) {
        const Z = {
          id: "layer-default",
          name: "图层 1",
          visible: !0,
          locked: !1,
          zIndex: 0
        };
        n(e.id, {
          settings: {
            ...e.settings,
            canvasData: {
              ...y,
              layers: [Z]
            }
          }
        });
      }
    }, []);
    const U = g.useMemo(() => {
        const Z = y.layers || [];
        if (M) {
          const re = Z.find(fe => fe.id === M);
          if (re && re.visible && !re.locked) return re;
        }
        return Z.filter(re => re.visible && !re.locked).sort((re, fe) => fe.zIndex - re.zIndex)[0] || Z[0];
      }, [y.layers, M]),
      H = g.useCallback((Z, re) => {
        const ye = (y.layers || []).map(ie => ie.id === Z ? {
          ...ie,
          ...re
        } : ie);
        D({
          layers: ye
        });
      }, [y.layers, D]),
      Y = g.useCallback(Z => {
        const re = y.layers || [],
          fe = new Map(Z.map(ie => [ie.layerId, ie.updates])),
          ye = re.map(ie => {
            const ae = fe.get(ie.id);
            return ae ? {
              ...ie,
              ...ae
            } : ie;
          });
        D({
          layers: ye
        });
      }, [y.layers, D]),
      K = g.useCallback(Z => {
        const fe = (y.layers || []).filter(xe => xe.id !== Z),
          ye = y.strokes.filter(xe => xe.layerId !== Z),
          ie = y.textElements.filter(xe => xe.layerId !== Z),
          ae = y.images.filter(xe => xe.layerId !== Z),
          be = (y.shapes || []).filter(xe => xe.layerId !== Z),
          Ee = (y.stickFigures || []).filter(xe => xe.layerId !== Z);
        D({
          layers: fe,
          strokes: ye,
          textElements: ie,
          images: ae,
          shapes: be,
          stickFigures: Ee
        });
      }, [y, D]),
      W = g.useCallback((Z, re) => {
        const fe = y.layers || [],
          ye = [...fe].sort((ae, be) => be.zIndex - ae.zIndex),
          ie = ye.findIndex(ae => ae.id === Z);
        if (ie !== -1) {
          if (re === "up" && ie > 0) {
            const ae = ye[ie - 1],
              be = ye[ie],
              Ee = be.zIndex,
              xe = fe.map(he => he.id === be.id ? {
                ...he,
                zIndex: ae.zIndex
              } : he.id === ae.id ? {
                ...he,
                zIndex: Ee
              } : he);
            D({
              layers: xe
            });
          } else if (re === "down" && ie < ye.length - 1) {
            const ae = ye[ie + 1],
              be = ye[ie],
              Ee = be.zIndex,
              xe = fe.map(he => he.id === be.id ? {
                ...he,
                zIndex: ae.zIndex
              } : he.id === ae.id ? {
                ...he,
                zIndex: Ee
              } : he);
            D({
              layers: xe
            });
          }
        }
      }, [y.layers, D]),
      Q = g.useCallback(() => {
        const Z = y.layers || [],
          re = Z.length > 0 ? Math.max(...Z.map(ie => ie.zIndex)) : -1,
          fe = `layer-${Date.now()}`,
          ye = {
            id: fe,
            name: `图层 ${Z.length + 1}`,
            visible: !0,
            locked: !1,
            zIndex: re + 1
          };
        D({
          layers: [...Z, ye]
        }), T(fe);
      }, [y.layers, D]),
      q = g.useCallback(Z => {
        if (!S) return;
        const re = (Z % 360 + 360) % 360,
          fe = y.images.map(ye => ye.id === S ? {
            ...ye,
            rotation: re
          } : ye);
        D({
          images: fe
        });
      }, [S, y.images, D]);
    g.useCallback(Z => {
      if (!S) return;
      const re = y.images.find(fe => fe.id === S);
      q(((re == null ? void 0 : re.rotation) ?? 0) + Z);
    }, [S, y.images, q]);
    const ne = g.useCallback(() => {
        if (!S) return;
        const Z = y.images.map(re => re.id === S ? {
          ...re,
          flipHorizontal: !re.flipHorizontal
        } : re);
        D({
          images: Z
        });
      }, [S, y.images, D]),
      de = g.useCallback(() => {
        if (!S) return;
        const Z = y.images.map(re => re.id === S ? {
          ...re,
          flipVertical: !re.flipVertical
        } : re);
        D({
          images: Z
        });
      }, [S, y.images, D]),
      le = g.useCallback(Z => {
        T(Z);
      }, []),
      J = g.useCallback(() => u3t(e.width, e.height), [e.width, e.height]),
      pe = g.useCallback(async () => {
        var ye;
        const {
          parseImageSizeString: Z
        } = await Ie(async () => {
          const {
            parseImageSizeString: ie
          } = await Promise.resolve().then(() => Pca);
          return {
            parseImageSizeString: ie
          };
        }, void 0, import.meta.url);
        for (const ie of m) {
          const ae = Z((ye = ie.settings) == null ? void 0 : ye.imageSize);
          if (ae) return ae;
        }
        let re = "";
        const fe = (S ? y.images.find(ie => ie.id === S) : void 0) || y.images.find(ie => NPe(ie.id)) || y.images[0];
        if (fe != null && fe.src && (re = fe.src), !re && m[0]) {
          const ie = await p(m[0]);
          ie && (re = ie);
        }
        if (!re) return null;
        try {
          const ie = await _xo(re);
          if (ie.width > 0 && ie.height > 0) return {
            w: Math.round(ie.width),
            h: Math.round(ie.height)
          };
        } catch {}
        return null;
      }, [m, S, y.images, p]),
      ce = g.useCallback(async () => {
        try {
          const Z = await pe();
          if (!Z) {
            console.warn("[CanvasNode] 原尺寸导出：无法解析原尺寸");
            return;
          }
          const {
              w: re,
              h: fe
            } = Z,
            ye = Pvr(y.images, S);
          if (!ye) {
            console.warn("[CanvasNode] 原尺寸导出：画板内没有可导出的图片");
            return;
          }
          const {
              width: ie,
              height: ae
            } = J(),
            be = await Mvr(y, ie, ae, ye, re, fe);
          if (!(be != null && be.size)) return;
          const {
              buildDoodleInputImageBaseSettings: Ee,
              persistDoodleBlobToInputImageNode: xe
            } = await Ie(async () => {
              const {
                buildDoodleInputImageBaseSettings: Te,
                persistDoodleBlobToInputImageNode: Ne
              } = await Promise.resolve().then(() => IAe);
              return {
                buildDoodleInputImageBaseSettings: Te,
                persistDoodleBlobToInputImageNode: Ne
              };
            }, void 0, import.meta.url),
            {
              OSS_UPLOADING_SETTING_KEY: he
            } = await Ie(async () => {
              const {
                OSS_UPLOADING_SETTING_KEY: Te
              } = await Promise.resolve().then(() => ii);
              return {
                OSS_UPLOADING_SETTING_KEY: Te
              };
            }, void 0, import.meta.url),
            {
              isGlobalOssUploadEnabled: ue
            } = await Ie(async () => {
              const {
                isGlobalOssUploadEnabled: Te
              } = await Promise.resolve().then(() => Ah);
              return {
                isGlobalOssUploadEnabled: Te
              };
            }, void 0, import.meta.url),
            ge = kc(re, fe),
            _e = {
              ...Ee(be, re, fe),
              ratio: `${re}:${fe}`,
              imageSize: `${re}×${fe}`
            },
            ke = d(),
            ve = 60;
          s(Te => {
            const Ne = Ki(ke, "input-image", e.x + e.width + ve, e.y, void 0, void 0, Te);
            return Ne.width = ge.width, Ne.height = ge.height, Ne.settings = ue() ? {
              ..._e,
              [he]: !0
            } : _e, [...Te, Ne];
          }), await xe({
            blob: be,
            nodeId: ke,
            wPx: re,
            hPx: fe,
            setNodes: s,
            baseSettings: _e,
            assetId: `canvas_orig_${ke}`,
            ossFileName: `canvas_orig_${ke}.png`,
            sourceLabel: "file://canvas-original-export"
          });
        } catch (Z) {
          console.error("[CanvasNode] 原尺寸导出失败:", Z);
        }
      }, [pe, J, y, S, d, e.x, e.y, e.width, s]),
      we = g.useCallback(async () => {
        try {
          const {
              width: Z,
              height: re
            } = J(),
            fe = await lue(y, Z, re, !1, !0);
          if (!fe) return;
          const ye = document.createElement("a");
          ye.href = fe, ye.download = `canvas-${e.id}.png`, ye.click();
          const ae = await (await fetch(fe)).blob();
          if (!(ae != null && ae.size)) return;
          const {
              buildDoodleInputImageBaseSettings: be,
              persistDoodleBlobToInputImageNode: Ee
            } = await Ie(async () => {
              const {
                buildDoodleInputImageBaseSettings: Ne,
                persistDoodleBlobToInputImageNode: me
              } = await Promise.resolve().then(() => IAe);
              return {
                buildDoodleInputImageBaseSettings: Ne,
                persistDoodleBlobToInputImageNode: me
              };
            }, void 0, import.meta.url),
            {
              OSS_UPLOADING_SETTING_KEY: xe
            } = await Ie(async () => {
              const {
                OSS_UPLOADING_SETTING_KEY: Ne
              } = await Promise.resolve().then(() => ii);
              return {
                OSS_UPLOADING_SETTING_KEY: Ne
              };
            }, void 0, import.meta.url),
            {
              isGlobalOssUploadEnabled: he
            } = await Ie(async () => {
              const {
                isGlobalOssUploadEnabled: Ne
              } = await Promise.resolve().then(() => Ah);
              return {
                isGlobalOssUploadEnabled: Ne
              };
            }, void 0, import.meta.url),
            ue = Z,
            ge = re,
            _e = kc(ue, ge),
            ke = {
              ...be(ae, ue, ge),
              ratio: y.aspectRatio || "1:1"
            },
            ve = d(),
            Te = 60;
          s(Ne => {
            const me = Ki(ve, "input-image", e.x + e.width + Te, e.y, void 0, void 0, Ne);
            return me.width = _e.width, me.height = _e.height, me.settings = he() ? {
              ...ke,
              [xe]: !0
            } : ke, [...Ne, me];
          }), await Ee({
            blob: ae,
            nodeId: ve,
            wPx: ue,
            hPx: ge,
            setNodes: s,
            baseSettings: ke,
            assetId: `canvas_export_${ve}`,
            ossFileName: `canvas_export_${ve}.png`,
            sourceLabel: "file://canvas-export"
          });
        } catch (Z) {
          console.error("[CanvasNode] 下载画板失败:", Z);
        }
      }, [y, J, e.width, e.id, e.x, e.y, d, s]);
    return c.jsxs("div", {
      className: `relative w-full h-full flex flex-col rounded-2xl overflow-hidden ${t ? "bg-[#1f1f1f]" : "bg-zinc-100"}`,
      children: [c.jsx("div", {
        className: `h-6 flex-shrink-0 border-b ${t ? "bg-[#1f1f1f]/90 border-zinc-800" : "bg-zinc-50 border-zinc-200"}`,
        title: x("画板节点")
      }), c.jsxs("div", {
        className: "flex-1 relative overflow-hidden",
        style: {
          backgroundColor: y.backgroundColor === "transparent" ? "transparent" : y.backgroundColor || (t ? "#171717" : "#f4f4f5")
        },
        children: [c.jsx("div", {
          className: "absolute inset-0 opacity-10 pointer-events-none",
          style: {
            backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
            backgroundSize: "20px 20px"
          }
        }), f && y.images.length === 0 && c.jsx("img", {
          src: f,
          className: "absolute inset-0 w-full h-full object-contain opacity-20 pointer-events-none",
          alt: x("源图片背景")
        }), c.jsx(wxo, {
          width: e.width,
          height: Math.max(1, e.height - eGe),
          canvasData: y,
          onUpdate: D,
          isDark: t,
          activeTool: k,
          brushSettings: R,
          textSettings: B,
          eraserSettings: N,
          shapeSettings: z,
          stickFigureSettings: O,
          viewZoom: a,
          activeLayerId: U == null ? void 0 : U.id,
          onSelectLayer: le,
          onSelectImage: C,
          keyboardActive: h
        })]
      }), c.jsxs("div", {
        ref: P,
        "data-canvas-node-toolbar": !0,
        className: `h-10 flex items-center justify-center gap-2 px-3 border-t ${t ? "bg-[#1f1f1f]/90 border-zinc-800" : "bg-zinc-50 border-zinc-200"}`,
        children: [c.jsxs("div", {
          className: "flex items-center gap-1",
          children: [c.jsx(Hte, {
            tool: p0.SELECT,
            activeTool: k,
            onClick: () => A(p0.SELECT),
            icon: c.jsx(x5e, {
              size: 16
            }),
            isDark: t
          }), c.jsx(Hte, {
            tool: p0.PEN,
            activeTool: k,
            onClick: () => A(p0.PEN),
            icon: c.jsx(Vue, {
              size: 16
            }),
            isDark: t
          }), c.jsx(Hte, {
            tool: p0.SHAPE,
            activeTool: k,
            onClick: () => A(p0.SHAPE),
            icon: c.jsx(kf, {
              size: 16
            }),
            isDark: t
          }), c.jsx(Hte, {
            tool: p0.STICK_FIGURE,
            activeTool: k,
            onClick: () => A(p0.STICK_FIGURE),
            icon: c.jsx(jY, {
              size: 16
            }),
            isDark: t
          }), c.jsx(Hte, {
            tool: p0.TEXT,
            activeTool: k,
            onClick: () => A(p0.TEXT),
            icon: c.jsx(_U, {
              size: 16
            }),
            isDark: t,
            title: x("文字注释 (T)")
          }), c.jsx(Hte, {
            tool: p0.ERASER,
            activeTool: k,
            onClick: () => A(p0.ERASER),
            icon: c.jsx(uI, {
              size: 16
            }),
            isDark: t
          })]
        }), S && k === p0.SELECT && (() => {
          const Z = y.images.find(fe => fe.id === S),
            re = Z ? ((Z.rotation ?? 0) + 360) % 360 : 0;
          return c.jsxs("div", {
            className: `flex items-center gap-2 ml-2 pl-2 border-l ${t ? "border-zinc-700" : "border-zinc-300"}`,
            children: [c.jsx("span", {
              className: `text-[10px] shrink-0 ${t ? "text-zinc-400" : "text-zinc-600"}`,
              children: x("旋转")
            }), c.jsx("input", {
              type: "range",
              min: 0,
              max: 360,
              value: re,
              onChange: fe => {
                fe.stopPropagation(), q(Number(fe.target.value));
              },
              onClick: fe => fe.stopPropagation(),
              className: `w-20 h-1.5 rounded-full appearance-none cursor-pointer accent-blue-500 ${t ? "bg-zinc-700" : "bg-zinc-300"}`,
              title: `${Math.round(re)}°`
            }), c.jsxs("span", {
              className: "text-[10px] w-8 shrink-0 text-zinc-500",
              children: [Math.round(re), "°"]
            }), c.jsx("button", {
              type: "button",
              onClick: fe => {
                fe.stopPropagation(), ne();
              },
              className: `w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${t ? "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200" : "text-zinc-600 hover:bg-zinc-200 hover:text-zinc-800"}`,
              title: x("水平翻转"),
              children: c.jsx(tTn, {
                size: 16
              })
            }), c.jsx("button", {
              type: "button",
              onClick: fe => {
                fe.stopPropagation(), de();
              },
              className: `w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${t ? "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200" : "text-zinc-600 hover:bg-zinc-200 hover:text-zinc-800"}`,
              title: x("垂直翻转"),
              children: c.jsx(nTn, {
                size: 16
              })
            })]
          });
        })(), k === p0.PEN && c.jsxs("div", {
          className: `flex items-center gap-2 ml-2 pl-2 border-l ${t ? "border-zinc-700" : "border-zinc-300"}`,
          children: [c.jsx(jPe, {
            color: R.color,
            onChange: Z => j(re => ({
              ...re,
              color: Z
            })),
            isDark: t
          }), c.jsx(Eyn, {
            size: R.width,
            onChange: Z => j(re => ({
              ...re,
              width: Z
            })),
            isDark: t
          })]
        }), k === p0.TEXT && c.jsxs("div", {
          className: `flex items-center gap-2 ml-2 pl-2 border-l ${t ? "border-zinc-700" : "border-zinc-300"}`,
          children: [c.jsx(jPe, {
            color: B.color,
            onChange: Z => F(re => ({
              ...re,
              color: Z
            })),
            isDark: t
          }), c.jsx("div", {
            className: "flex items-center gap-1",
            children: ["S", "M", "L", "XL"].map(Z => c.jsx("button", {
              onClick: re => {
                re.stopPropagation(), F(fe => ({
                  ...fe,
                  fontSize: Z
                }));
              },
              className: `px-2 py-0.5 rounded text-[10px] transition-colors ${B.fontSize === Z ? t ? "bg-blue-600 text-white" : "bg-black text-white" : t ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700" : "bg-zinc-200 text-zinc-600 hover:bg-zinc-300"}`,
              children: Z
            }, Z))
          })]
        }), k === p0.ERASER && c.jsxs("div", {
          className: `flex items-center gap-2 ml-2 pl-2 border-l ${t ? "border-zinc-700" : "border-zinc-300"}`,
          children: [c.jsx("span", {
            className: `text-xs ${t ? "text-zinc-400" : "text-zinc-600"}`,
            children: x("擦除范围:")
          }), c.jsx(Eyn, {
            size: N.size,
            onChange: Z => G(re => ({
              ...re,
              size: Z
            })),
            isDark: t
          })]
        }), k === p0.SHAPE && c.jsxs("div", {
          className: `flex items-center gap-2 ml-2 pl-2 border-l ${t ? "border-zinc-700" : "border-zinc-300"}`,
          children: [c.jsx("div", {
            className: "flex items-center gap-1",
            children: [{
              type: "rectangle",
              label: "□"
            }, {
              type: "circle",
              label: "○"
            }, {
              type: "triangle",
              label: "△"
            }, {
              type: "line",
              label: "/"
            }].map(({
              type: Z,
              label: re
            }) => c.jsx("button", {
              onClick: fe => {
                fe.stopPropagation(), V(ye => ({
                  ...ye,
                  type: Z
                }));
              },
              className: `w-6 h-6 flex items-center justify-center rounded text-sm transition-colors ${z.type === Z ? t ? "bg-blue-600 text-white" : "bg-black text-white" : t ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700" : "bg-zinc-200 text-zinc-600 hover:bg-zinc-300"}`,
              title: Z,
              children: re
            }, Z))
          }), c.jsxs("div", {
            className: "flex items-center gap-1",
            children: [c.jsx("button", {
              onClick: Z => {
                Z.stopPropagation(), V(re => ({
                  ...re,
                  fillMode: "stroke"
                }));
              },
              className: `px-2 py-0.5 rounded text-[10px] transition-colors ${z.fillMode === "stroke" ? t ? "bg-blue-600 text-white" : "bg-black text-white" : t ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700" : "bg-zinc-200 text-zinc-600 hover:bg-zinc-300"}`,
              children: x("描边")
            }), c.jsx("button", {
              onClick: Z => {
                Z.stopPropagation(), V(re => ({
                  ...re,
                  fillMode: "fill"
                }));
              },
              className: `px-2 py-0.5 rounded text-[10px] transition-colors ${z.fillMode === "fill" ? t ? "bg-blue-600 text-white" : "bg-black text-white" : t ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700" : "bg-zinc-200 text-zinc-600 hover:bg-zinc-300"}`,
              children: x("填充")
            })]
          }), c.jsx(jPe, {
            color: z.color,
            onChange: Z => V(re => ({
              ...re,
              color: Z
            })),
            isDark: t
          })]
        }), k === p0.STICK_FIGURE && c.jsxs("div", {
          className: `flex items-center gap-2 ml-2 pl-2 border-l ${t ? "border-zinc-700" : "border-zinc-300"}`,
          children: [c.jsx("span", {
            className: `text-xs ${t ? "text-zinc-400" : "text-zinc-600"}`,
            children: x("空白处双击添加火柴人")
          }), c.jsx(jPe, {
            color: O.color,
            onChange: Z => L(re => ({
              ...re,
              color: Z
            })),
            isDark: t
          })]
        }), c.jsxs("div", {
          className: "flex items-center gap-2",
          children: [c.jsx("button", {
            onClick: Z => {
              Z.stopPropagation(), E(!I);
            },
            className: `p-1 rounded transition-colors ${I ? t ? "bg-blue-600 text-white" : "bg-black text-white" : t ? "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800" : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200"}`,
            title: x("图层管理"),
            children: c.jsx(Y2, {
              size: 14
            })
          }), c.jsx("button", {
            onClick: Z => {
              Z.stopPropagation(), ce();
            },
            className: `p-1 rounded transition-colors ${t ? "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800" : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200"}`,
            title: x("原尺寸导出（按输入图原尺寸创建图片输入节点）"),
            children: c.jsx(Wm, {
              size: 14
            })
          }), c.jsx("button", {
            onClick: Z => {
              Z.stopPropagation(), we();
            },
            className: `px-2 py-1 rounded-lg text-xs transition-colors ${t ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300" : "bg-zinc-200 hover:bg-zinc-300 text-zinc-700"}`,
            children: c.jsx(ws, {
              size: 14
            })
          })]
        })]
      }), I && c.jsx(xxo, {
        layers: y.layers || [],
        selectedLayerId: M || void 0,
        onSelectLayer: le,
        onUpdateLayer: H,
        onUpdateLayers: Y,
        onDeleteLayer: K,
        onMoveLayer: W,
        onCreateLayer: Q,
        isDark: t
      })]
    });
  };

function Axo(e) {
  const t = e.trim();
  if (/^\d+$/.test(t)) return t;
  const n = t.match(/ai-detail\/(\d+)/) || t.match(/(\d{15,})/);
  return n ? n[1] : t;
}

function D6(e) {
  if (e == null) return "";
  if (typeof e == "string") return e;
  if (typeof e == "object") {
    const t = e,
      n = String(t.index ?? t.value ?? t.name ?? t.label ?? t.text ?? t.id ?? "");
    if (n && n !== "[object Object]") return n;
  }
  return typeof e == "object" ? "" : String(e);
}

function Tyn(e) {
  if (e == null) return [];
  if (Array.isArray(e)) return e.length > 0 && Array.isArray(e[0]) ? e[0] : e;
  if (typeof e == "object") {
    const t = e,
      n = t.options ?? t.values ?? t.items ?? t.choices ?? t.data ?? t.list;
    if (Array.isArray(n)) return n;
    const r = Object.keys(t).filter(a => !["options", "values", "items", "choices", "data", "list", "selected", "default"].includes(a));
    if (r.length > 0) return r.map(a => ({
      index: a,
      name: D6(t[a]) || a
    }));
  }
  return [];
}

function Sxo(e) {
  if (e == null) return {
    index: "",
    name: ""
  };
  if (typeof e == "string") return {
    index: e,
    name: e
  };
  if (Array.isArray(e)) {
    const a = String(e[0] ?? ""),
      i = String(e[1] ?? e[0] ?? "");
    return {
      index: a || i,
      name: i || a
    };
  }
  const t = e,
    n = D6(t.index ?? t.value ?? t.id ?? t.text ?? t.key ?? ""),
    r = D6(t.name ?? t.label ?? t.text ?? t.display ?? t.index ?? t.value ?? n);
  return {
    index: n || r,
    name: r || n
  };
}

const Ixo = [{
    index: "1k",
    name: "1k"
  }, {
    index: "2k",
    name: "2k"
  }, {
    index: "4k",
    name: "4k"
  }, {
    index: "8k (Official only)",
    name: "8k (Official only)"
  }],
  Cxo = [{
    index: "Third-party",
    name: "Third-party"
  }, {
    index: "Official",
    name: "Official"
  }];

function Exo(e) {
  const t = (e.fieldName || "").toLowerCase(),
    n = (e.description || "").toLowerCase();
  return t.includes("resolution") || n.includes("分辨率");
}

function Txo(e) {
  const t = (e.description || "").toLowerCase(),
    n = (e.fieldName || "").toLowerCase();
  return t.includes("official") || t.includes("api") || t.includes("第三方") || n.includes("api") || n.includes("type");
}

function Myn(e) {
  if (e == null) return "";
  try {
    const t = typeof e == "string" ? JSON.parse(e.trim()) : e;
    if (Array.isArray(t) && t.length > 1 && t[1] && typeof t[1] == "object") {
      const n = t[1];
      return D6(n.default ?? n.selected ?? n.value ?? "") || "";
    }
  } catch {}
  return "";
}

function Mxo(e, t) {
  if (e == null) return [];
  try {
    let n;
    if (typeof e == "string") {
      const i = e.trim();
      if (i.startsWith("[") || i.startsWith("{")) {
        const o = JSON.parse(i);
        n = Tyn(o), n.length === 0 && Array.isArray(o) && (n = o);
      } else if (i.includes(",")) n = i.split(",").map(o => o.trim()).filter(Boolean);else if (i) n = [i];else return [];
    } else n = Tyn(e), n.length === 0 && Array.isArray(e) && (n = e);
    let r = n.map(Sxo).filter(i => i.index !== "" || i.name !== "");
    const a = new Set();
    if (r = r.filter(i => {
      const o = i.index.toLowerCase();
      return a.has(o) ? !1 : (a.add(o), !0);
    }), t && Exo(t) && r.length < 4) {
      const i = new Set(r.map(s => s.index.toLowerCase())),
        o = [...r];
      for (const s of Ixo) i.has(s.index.toLowerCase()) || (o.push(s), i.add(s.index.toLowerCase()));
      r = o;
    }
    if (t && Txo(t) && r.length < 2) {
      const i = new Set(r.map(s => s.index.toLowerCase())),
        o = [...r];
      for (const s of Cxo) i.has(s.index.toLowerCase()) || (o.push(s), i.add(s.index.toLowerCase()));
      r = o;
    }
    return r;
  } catch {
    return [];
  }
}

function Pxo(e) {
  const t = (e.fieldName || "").toLowerCase(),
    n = (e.description || "").toLowerCase();
  return t.includes("prompt") || t.includes("text") || n.includes("提示") || n.includes("文本") || n.includes("输入");
}

function Pyn(e) {
  const t = e.toLowerCase();
  return t.includes(".mp4") || t.includes(".webm") || t.includes(".mov") || t.includes("video") ? "video" : t.includes(".mp3") || t.includes(".wav") || t.includes(".ogg") || t.includes(".m4a") || t.includes(".aac") || t.includes(".flac") || t.includes("audio") ? "audio" : "image";
}

function Ryn(e) {
  const t = (e.fileType || "").toLowerCase(),
    n = (e.fileUrl || "").toLowerCase();
  return t === "txt" || n.endsWith(".txt");
}

async function Rxo(e) {
  const t = await fetch(e, {
    mode: "cors"
  });
  if (!t.ok) throw new Error(`获取文本失败: ${t.status}`);
  return t.text();
}

const Nxo = ({
    node: e,
    isDark: t,
    updateNode: n,
    connections: r = [],
    nodes: a = [],
    getConnectedInputImages: i,
    getConnectedTextForInput: o,
    dataVersion: s = 0,
    setHistory: l,
    setNodes: d,
    setConnections: u,
    setConnectingTarget: h,
    setConnectingInputType: p,
    setConnectingSource: m,
    connectingSource: f,
    setMousePos: y,
    canvasRef: b,
    view: v,
    generateId: _,
    onSaveToRhLibrary: w
  }) => {
    var Te, Ne, me, Ae, Fe, Me, Re, $e, rt, nt, ze;
    on();
    const [k, A] = g.useState(!1),
      [S, C] = g.useState(!1),
      [I, E] = g.useState(!1),
      [M, T] = g.useState("idle"),
      [P, R] = g.useState(null),
      [j, B] = g.useState(new Set()),
      [F, N] = g.useState(null),
      G = g.useRef({});
    g.useEffect(() => {
      const Le = Ke => {
        j.size > 0 && (Ke.target.closest(".rh-list-dropdown") || B(new Set()));
      };
      return document.addEventListener("mousedown", Le), () => document.removeEventListener("mousedown", Le);
    }, [j.size]);
    const z = ((Te = e.settings) == null ? void 0 : Te.rhApiKey) || typeof localStorage < "u" && localStorage.getItem(Zi.RH_API_KEY) || "",
      V = ((Ne = e.settings) == null ? void 0 : Ne.webappId) || "",
      O = ((me = e.settings) == null ? void 0 : me.webappName) || "",
      L = ((Ae = e.settings) == null ? void 0 : Ae.rhCovers) || [],
      D = ((Fe = e.settings) == null ? void 0 : Fe.nodeInfoListTemplate) || [],
      U = ((Me = e.settings) == null ? void 0 : Me.rhUseOverseas) ?? !1,
      H = ((Re = e.settings) == null ? void 0 : Re.rhInstanceType) ?? "default",
      Y = (($e = e.settings) == null ? void 0 : $e.rhParamValues) || {},
      K = ((rt = e.settings) == null ? void 0 : rt.rhUploadPreviews) || {},
      W = ((nt = e.settings) == null ? void 0 : nt.generatedImages) || [],
      Q = (ze = e.settings) == null ? void 0 : ze.rhLastRunDurationMs,
      q = Axo(V),
      ne = g.useMemo(() => {
        const Le = new Map();
        let Ke = 0;
        for (const Xe of D) (Xe.fieldType || "").toUpperCase() === "STRING" && Le.set(`${Xe.nodeId}:${Xe.fieldName}`, Ke++);
        return Le;
      }, [D]),
      de = g.useMemo(() => i ? i(e.id) : [], [i, e.id, s]),
      {
        textFromDefaultConnectedTextNodes: le,
        defaultConnectedTextNodeCount: J
      } = g.useMemo(() => {
        const Le = r.filter(De => De.to === e.id && (!De.inputType || De.inputType === "default")),
          Ke = [];
        return Le.forEach(De => {
          var Ce, He, Ve;
          const Ye = a.find(it => it.id === De.from);
          if (Ye && (Ye.type === "text-node" || Ye.type === "custom-agent" || Ye.type === "novel-input")) {
            const it = (((Ce = Ye.settings) == null ? void 0 : Ce.text) || Ye.prompt || Ye.content || ((He = Ye.settings) == null ? void 0 : He.outputContent) || ((Ve = Ye.settings) == null ? void 0 : Ve.novelContent) || "").trim();
            it && Ke.push({
              node: Ye,
              text: it
            });
          }
        }), {
          textFromDefaultConnectedTextNodes: Ke.map(De => De.text).filter(Boolean).join(`

`) || null,
          defaultConnectedTextNodeCount: Ke.length
        };
      }, [r, a, e.id, s]);
    g.useEffect(() => {
      le || E(!1);
    }, [le]);
    const pe = g.useMemo(() => {
        const Le = new Map();
        let Ke = 0;
        for (const Xe of D) {
          const De = (Xe.fieldType || "").toUpperCase();
          (De === "IMAGE" || De === "AUDIO" || De === "VIDEO") && Le.set(`${Xe.nodeId}:${Xe.fieldName}`, Ke++);
        }
        return Le;
      }, [D]),
      ce = g.useCallback(async () => {
        if (!z.trim()) {
          R("请输入 RH API Key");
          return;
        }
        if (!q) {
          R("请输入 WebApp ID（或粘贴 RH 应用详情页链接）");
          return;
        }
        A(!0), R(null);
        try {
          const Le = await C_i({
            apiKey: z.trim(),
            webappId: q,
            useOverseas: U
          });
          if (Le.code !== 0) throw new Error(Le.msg || "获取应用信息失败");
          const Ke = Le.data;
          if (!Ke) throw new Error("返回数据为空");
          const Xe = Ke.nodeInfoList || [],
            De = {};
          Xe.forEach(Ce => {
            const He = `${Ce.nodeId}:${Ce.fieldName}`;
            let Ve = D6(Ce.fieldValue) || "";
            (Ce.fieldType || "").toUpperCase() === "LIST" && !Ve && (Ve = Myn(Ce.fieldData) || Ve), De[He] = Ve;
          });
          const Ye = {
            ...Y,
            ...De
          };
          n(e.id, {
            settings: {
              ...e.settings,
              rhApiKey: z.trim(),
              webappId: q,
              webappName: Ke.webappName || "",
              rhCovers: Ke.covers || [],
              nodeInfoListTemplate: Xe,
              rhParamValues: Ye
            }
          });
          try {
            typeof localStorage < "u" && localStorage.setItem(Zi.RH_API_KEY, z.trim());
          } catch {}
          w == null || w({
            webappId: q,
            webappName: Ke.webappName || "",
            covers: Ke.covers || [],
            nodeInfoListTemplate: Xe,
            rhParamValues: Ye
          });
        } catch (Le) {
          const Ke = Le instanceof Error ? Le.message : "获取应用信息失败";
          R(Ke);
        } finally {
          A(!1);
        }
      }, [z, q, U, e.id, e.settings, n, Y, w]),
      we = g.useCallback((Le, Ke) => {
        n(e.id, {
          settings: {
            ...e.settings,
            rhParamValues: {
              ...Y,
              [Le]: Ke
            }
          }
        });
      }, [e.id, e.settings, n, Y]),
      X = g.useCallback(async (Le, Ke) => {
        const Xe = `${Le.nodeId}:${Le.fieldName}`,
          De = K[Xe];
        if (De != null && De.startsWith("blob:")) try {
          URL.revokeObjectURL(De);
        } catch {}
        const Ye = URL.createObjectURL(Ke);
        n(e.id, {
          settings: {
            ...e.settings,
            rhUploadPreviews: {
              ...K,
              [Xe]: Ye
            }
          }
        });
        try {
          R(null);
          const Ce = await vdr({
            apiKey: z.trim(),
            file: Ke,
            useOverseas: U
          });
          n(e.id, {
            settings: {
              ...e.settings,
              rhParamValues: {
                ...Y,
                [Xe]: Ce.fileName
              },
              rhUploadPreviews: {
                ...K,
                [Xe]: Ye
              }
            }
          });
        } catch (Ce) {
          R(Ce instanceof Error ? Ce.message : "上传失败"), URL.revokeObjectURL(Ye);
          const {
            [Xe]: He,
            ...Ve
          } = K;
          n(e.id, {
            settings: {
              ...e.settings,
              rhUploadPreviews: Ve
            }
          });
        }
        N(null);
      }, [z, U, e.id, e.settings, n, Y, K]),
      Z = g.useCallback(async (Le, Ke) => {
        const Xe = `${Le.nodeId}:${Le.fieldName}`,
          De = K[Xe];
        if (De != null && De.startsWith("blob:")) try {
          URL.revokeObjectURL(De);
        } catch {}
        let Ye;
        try {
          Ye = await (await fetch(Ke, {
            mode: "cors"
          })).blob();
        } catch {
          try {
            Ye = await new Promise((it, It) => {
              const Ft = new Image();
              Ft.crossOrigin = "anonymous", Ft.onload = () => {
                const We = document.createElement("canvas");
                We.width = Ft.naturalWidth, We.height = Ft.naturalHeight;
                const Ze = We.getContext("2d");
                if (!Ze) {
                  It(new Error("无法创建画布"));
                  return;
                }
                Ze.drawImage(Ft, 0, 0), We.toBlob(Ge => Ge ? it(Ge) : It(new Error("toBlob 失败")), "image/png");
              }, Ft.onerror = () => It(new Error("图片加载失败，可能受跨域限制")), Ft.src = Ke;
            });
          } catch (it) {
            R(it instanceof Error ? it.message : "获取图片失败"), N(null);
            return;
          }
        }
        const Ce = Ke.includes(".png") ? "png" : Ke.includes(".webp") ? "webp" : "jpg",
          He = new File([Ye], `upload.${Ce}`, {
            type: Ye.type || "image/jpeg"
          });
        await X(Le, He);
      }, [X, K]),
      re = g.useCallback(async (Le, Ke) => {
        var De;
        const Xe = (De = Ke.target.files) == null ? void 0 : De[0];
        Xe && (await X(Le, Xe), Ke.target.value = "");
      }, [X]),
      fe = g.useCallback(async () => {
        const Le = [];
        let Ke = 0;
        for (const Xe of D) {
          const De = `${Xe.nodeId}:${Xe.fieldName}`;
          let Ye = Y[De] ?? Xe.fieldValue ?? "",
            Ce = D6(Ye);
          const He = (Xe.fieldType || "").toUpperCase();
          if (He === "STRING") {
            const it = `rh_str_${ne.get(De) ?? 0}`;
            let It = o == null ? void 0 : o(e.id, it);
            !It && de.length > 0 && le && (It = le), Ce = (e.prompt || It || Ce).trim() || Ce;
          } else if ((He === "IMAGE" || He === "AUDIO" || He === "VIDEO") && de.length > 0) {
            const Ve = de[Ke];
            if (Ve) try {
              let it;
              if (Ve.startsWith("canvas-node:")) throw R("画板节点需先导出图片"), new Error("画板节点需先导出");
              it = await Ns(Ve), Ce = await bdr({
                apiKey: z.trim(),
                file: it,
                useOverseas: U
              }), Ke++;
            } catch (it) {
              throw R(it instanceof Error ? it.message : "参考图上传失败"), it;
            }
          }
          Le.push({
            nodeId: Xe.nodeId,
            fieldName: Xe.fieldName,
            fieldValue: Ce
          });
        }
        return Le;
      }, [D, Y, e.prompt, ne, o, e.id, de, le, z, U]),
      ye = g.useCallback(async () => {
        var De;
        if (!z.trim() || !q) {
          R("请先获取应用信息");
          return;
        }
        C(!0), R(null), T("queued"), n(e.id, {
          isGenerating: !0
        });
        let Le = null,
          Ke = null,
          Xe = null;
        try {
          const Ye = await fe(),
            Ce = await E_i({
              apiKey: z.trim(),
              webappId: q,
              nodeInfoList: Ye,
              useOverseas: U,
              instanceType: H === "plus" ? "plus" : "default"
            });
          Ke = Ce.taskId;
          const {
            promptTips: He
          } = Ce;
          if (l && Ke) {
            Xe = Date.now();
            const _t = {
              id: Ke,
              url: "",
              type: "image",
              prompt: e.prompt || O,
              time: new Date().toLocaleTimeString(),
              status: "generating",
              progress: 0,
              modelName: `RH: ${O}`,
              sourceNodeId: e.id,
              startTime: Xe
            };
            l(Yt => [_t, ...Yt]);
            let At = 0;
            Le = setInterval(() => {
              At = Math.min(95, At + 3), l == null || l(Yt => Yt.map(qe => qe.id === Ke ? {
                ...qe,
                progress: At
              } : qe));
            }, 3e3);
          }
          if (He) try {
            const _t = JSON.parse(He),
              At = _t == null ? void 0 : _t.node_errors;
            if (At && Object.keys(At).length > 0) {
              const Yt = kt => {
                  if (typeof kt == "string") return kt;
                  if (kt && typeof kt == "object") {
                    const St = kt;
                    return St.message ?? St.msg ?? St.error ?? St.detail ?? JSON.stringify(St);
                  }
                  return String(kt);
                },
                qe = Object.entries(At).map(([kt, St]) => `节点 ${kt}: ${Yt(St)}`).join("; ");
              R(qe);
            }
          } catch {}
          const Ve = await kdr({
            apiKey: z.trim(),
            taskId: Ke,
            useOverseas: U,
            onProgress: _t => T(_t === "queued" ? "queued" : "running")
          });
          if (!Ve.success) {
            R(Ve.error || "任务失败"), Le && clearInterval(Le), l == null || l(_t => _t.map(At => At.id === Ke ? {
              ...At,
              status: "failed",
              progress: 0,
              errorMsg: Ve.error
            } : At)), n(e.id, {
              isGenerating: !1
            }), T("idle");
            return;
          }
          Le && clearInterval(Le);
          const it = Ve.outputItems || (Ve.fileUrls || []).map(_t => ({
              fileUrl: _t
            })),
            It = it.filter(_t => !Ryn(_t)).map(_t => _t.fileUrl),
            Ft = it.filter(Ryn),
            We = It,
            Ze = Date.now(),
            Ge = It[0] || "",
            Oe = Ge ? Pyn(Ge) : "image",
            st = Oe === "video" ? "video" : "image",
            vt = It.map((_t, At) => ({
              id: `${Ke}_${At}`,
              thumbUrl: _t,
              fullUrl: _t,
              createdAt: Ze
            })),
            Ht = Xe != null ? Ze - Xe : void 0;
          if (n(e.id, {
            content: Ge,
            previewType: Oe,
            settings: {
              ...e.settings,
              generatedImages: [...W, ...vt],
              rhLastRunDurationMs: Ht
            }
          }), (async () => {
            try {
              const {
                assetStore: _t
              } = await Ie(async () => {
                const {
                  assetStore: At
                } = await Promise.resolve().then(() => Ri);
                return {
                  assetStore: At
                };
              }, void 0, import.meta.url);
              await _t.init();
              for (let At = 0; At < We.length; At++) {
                const Yt = We[At],
                  qe = At === 0 ? Ke : `${Ke}_${At}`;
                qe && (Yt.startsWith("http://") || Yt.startsWith("https://")) && (await _t.saveAsset(qe, Yt), console.log(`[RhApp] ✅ 已保存资源到 assetStore: ${qe}`));
              }
            } catch (_t) {
              console.error("[RhApp] ❌ 保存资源到 assetStore 失败:", _t);
            }
          })(), l && Ge && Ke) {
            const _t = Ke;
            l(At => At.map(Yt => Yt.id === _t ? {
              ...Yt,
              type: Oe,
              url: Ge,
              status: "completed",
              progress: 100,
              mjImages: We.length > 1 ? We : void 0,
              durationMs: Ht,
              _assetId: _t,
              _mjAssetIds: We.length > 1 ? We.map((qe, kt) => kt === 0 ? _t : `${_t}_${kt}`) : void 0
            } : Yt));
          }
          let pt = r.filter(_t => _t.from === e.id && (!_t.inputType || _t.inputType === "default")).map(_t => _t.to);
          const lt = new Map(a.map(_t => [_t.id, _t]));
          if (!pt.some(_t => {
            var At;
            return ((At = lt.get(_t)) == null ? void 0 : At.type) === "preview";
          }) && It.length > 0 && d && u && _) {
            const _t = _(),
              At = Ki(_t, "preview", e.x + e.width + 80, e.y, void 0, void 0, a);
            At.width = 400, At.height = 400, d(Yt => [...Yt, At]), u(Yt => [...Yt, {
              id: _(),
              from: e.id,
              to: _t,
              fromPort: "output",
              toPort: "input"
            }]), pt = [_t];
          }
          if (pt.filter(_t => {
            var At;
            return ((At = lt.get(_t)) == null ? void 0 : At.type) === "preview";
          }).forEach(_t => {
            const At = lt.get(_t),
              Yt = {
                content: Ge,
                previewType: Oe,
                previewMjImages: We.length > 1 && Oe === "image" ? We : void 0,
                selectedPreviewImage: Oe === "image" ? Ge : void 0
              };
            Oe === "audio" && (Yt.settings = {
              ...((At == null ? void 0 : At.settings) || {}),
              musicTitle: e.prompt || O
            }), n(_t, Yt);
          }), Ft.length > 0 && d && u && _) try {
            const _t = [];
            for (const Yt of Ft) {
              const qe = await Rxo(Yt.fileUrl);
              qe.trim() && _t.push(qe.trim());
            }
            const At = _t.join(`

`);
            if (At) {
              const Yt = new Map(a.map(kt => [kt.id, kt])),
                qe = r.filter(kt => kt.from === e.id && (!kt.inputType || kt.inputType === "default")).map(kt => kt.to).filter(kt => {
                  var St;
                  return ((St = Yt.get(kt)) == null ? void 0 : St.type) === "text-node";
                });
              if (qe.length > 0) n(qe[0], {
                settings: {
                  ...(((De = Yt.get(qe[0])) == null ? void 0 : De.settings) || {}),
                  text: At
                }
              });else {
                const kt = _(),
                  St = Ki(kt, "text-node", e.x + e.width + 80, e.y, void 0, void 0, a);
                St.settings = {
                  ...St.settings,
                  text: At
                }, d(hn => [...hn, St]), u(hn => [...hn, {
                  id: _(),
                  from: e.id,
                  to: kt,
                  fromPort: "output",
                  toPort: "input"
                }]);
              }
              n(e.id, {
                settings: {
                  ...e.settings,
                  generatedImages: [...W, ...vt],
                  rhLastRunDurationMs: Ht,
                  rhOutputText: At
                }
              });
            }
          } catch (_t) {
            console.error("[RhApp] 获取 TXT 文本失败:", _t);
          }
          T("done"), n(e.id, {
            isGenerating: !1
          });
        } catch (Ye) {
          R(Ye instanceof Error ? Ye.message : "运行失败"), T("idle"), n(e.id, {
            isGenerating: !1
          }), Le && clearInterval(Le), l && Ke && l(Ce => Ce.map(He => He.id === Ke ? {
            ...He,
            status: "failed",
            progress: 0,
            errorMsg: Ye.message
          } : He));
        } finally {
          C(!1);
        }
      }, [z, q, U, H, e.id, e.settings, e.prompt, e.width, e.x, r, a, n, fe, W, l, d, u, _]),
      ie = g.useCallback(Le => {
        const Ke = Le.target.value;
        n(e.id, {
          settings: {
            ...e.settings,
            rhApiKey: Ke
          }
        });
        try {
          typeof localStorage < "u" && localStorage.setItem(Zi.RH_API_KEY, Ke);
        } catch {}
        R(null);
      }, [e.id, e.settings, n]),
      ae = g.useCallback(Le => {
        n(e.id, {
          settings: {
            ...e.settings,
            webappId: Le.target.value
          }
        }), R(null);
      }, [e.id, e.settings, n]),
      be = g.useCallback(Le => {
        n(e.id, {
          settings: {
            ...e.settings,
            rhUseOverseas: Le.target.checked
          }
        });
      }, [e.id, e.settings, n]),
      Ee = g.useCallback(Le => {
        n(e.id, {
          settings: {
            ...e.settings,
            rhInstanceType: Le
          }
        });
      }, [e.id, e.settings, n]),
      xe = g.useCallback(Le => {
        n(e.id, {
          prompt: Le.target.value
        });
      }, [e.id, n]),
      he = g.useCallback((Le, Ke) => {
        if (Le.stopPropagation(), Le.preventDefault(), b != null && b.current && v && y) {
          const Xe = b.current.getBoundingClientRect(),
            De = (Le.clientX - Xe.left - v.x) / v.zoom,
            Ye = (Le.clientY - Xe.top - v.y) / v.zoom;
          y(hD(De, Ye, v.zoom));
        }
        h == null || h(e.id), p == null || p(Ke);
      }, [e.id, b, v, y, h, p]),
      ue = g.useCallback((Le, Ke) => {
        Le.stopPropagation(), f && f !== e.id && u && _ && (r.some(De => De.from === f && De.to === e.id && (De.inputType || "default") === Ke) || u(De => [...De.filter(Ye => !(Ye.to === e.id && (Ye.inputType || "default") === Ke)), {
          id: _(),
          from: f,
          to: e.id,
          inputType: Ke
        }]), h == null || h(null), p == null || p(null), m == null || m(null));
      }, [e.id, f, r, u, _, h, p, m]),
      ge = t ? "bg-transparent" : "bg-white",
      _e = t ? "border-white/30" : "border-zinc-200",
      ke = t ? "bg-transparent border-white/30 text-white placeholder-white/50" : "bg-zinc-50 border-zinc-300 text-zinc-900 placeholder-zinc-400",
      ve = t ? "text-white" : "text-zinc-600";
    return c.jsx("div", {
      className: `flex flex-col h-full ${ge} ${_e} border rounded-2xl overflow-hidden`,
      children: c.jsxs("div", {
        className: "flex-1 overflow-y-auto p-3 space-y-3 rh-scroll-minimal",
        children: [c.jsxs("div", {
          children: [c.jsxs("label", {
            className: `flex items-center gap-1.5 text-xs font-medium mb-1.5 ${ve}`,
            children: [c.jsx(oTn, {
              size: 14
            }), "RH API Key"]
          }), c.jsx("input", {
            type: "password",
            value: z,
            onChange: ie,
            placeholder: x("在 RH 控制台获取"),
            className: `w-full px-2.5 py-1.5 text-sm rounded-md border ${ke} focus:outline-none focus:ring-1 focus:ring-blue-500`
          })]
        }), c.jsxs("div", {
          children: [c.jsxs("label", {
            className: `flex items-center gap-1.5 text-xs font-medium mb-1.5 ${ve}`,
            children: [c.jsx(aTn, {
              size: 14
            }), "WebApp ID"]
          }), c.jsx("input", {
            type: "text",
            value: V,
            onChange: ae,
            placeholder: x("详情页链接末尾数字或完整链接"),
            className: `w-full px-2.5 py-1.5 text-sm rounded-md border ${ke} focus:outline-none focus:ring-1 focus:ring-blue-500`
          })]
        }), c.jsxs("label", {
          className: `flex items-center gap-2 text-xs cursor-pointer ${ve}`,
          children: [c.jsx("input", {
            type: "checkbox",
            checked: U,
            onChange: be,
            className: `rounded ${t ? "border-white/30" : "border-zinc-500"}`
          }), x("使用海外地址 (runninghub.ai)")]
        }), c.jsx("button", {
          onClick: ce,
          disabled: k,
          className: `w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors border ${k ? t ? "bg-transparent border-white/20 text-white/50 cursor-not-allowed" : "bg-zinc-500/50 text-zinc-400 cursor-not-allowed" : t ? "bg-transparent border-white/30 hover:bg-white/5 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"}`,
          children: k ? c.jsxs(c.Fragment, {
            children: [c.jsx(Ua, {
              size: 16,
              className: "animate-spin"
            }), x("获取中...")]
          }) : c.jsxs(c.Fragment, {
            children: [c.jsx(Wp, {
              size: 16
            }), x("获取应用信息")]
          })
        }), P && c.jsxs("div", {
          className: `flex items-start gap-2 p-2 rounded-md border ${t ? "bg-transparent border-red-500/30 text-red-400" : "bg-red-50 text-red-600"}`,
          children: [c.jsx(c3, {
            size: 16,
            className: "flex-shrink-0 mt-0.5"
          }), c.jsx("span", {
            className: "text-xs",
            children: P
          })]
        }), O && c.jsxs("div", {
          className: `rounded-md p-3 border ${_e} ${t ? "bg-transparent" : "bg-zinc-50"}`,
          children: [c.jsxs("div", {
            className: "flex items-center gap-2 mb-2",
            children: [c.jsx(sEt, {
              size: 16,
              className: "text-green-500"
            }), c.jsx("span", {
              className: "font-medium text-sm",
              children: O
            })]
          }), L.length > 0 && c.jsx("div", {
            className: "flex gap-2 mb-2 overflow-x-auto",
            children: L.slice(0, 3).map((Le, Ke) => c.jsx("img", {
              src: Le.thumbnailUri || Le.url,
              alt: "",
              className: "w-16 h-16 object-cover rounded"
            }, Ke))
          }), c.jsxs("a", {
            href: `https://www.runninghub.cn/ai-detail/${q || V}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex items-center gap-1 text-xs text-blue-500 hover:underline mt-2",
            children: [c.jsx(S5, {
              size: 12
            }), x("在 RH 平台打开")]
          })]
        }), D.length > 0 && c.jsxs("div", {
          className: "space-y-3 min-h-[180px]",
          children: [c.jsx("div", {
            className: `text-xs font-medium ${ve}`,
            children: x("可编辑参数")
          }), D.map(Le => {
            var It;
            const Ke = `${Le.nodeId}:${Le.fieldName}`,
              Xe = Y[Ke] ?? Le.fieldValue ?? "",
              De = (Le.fieldType || "").toUpperCase(),
              Ye = Le.description || Le.fieldName;
            if (De === "STRING" && Pxo(Le)) {
              const We = `rh_str_${ne.get(Ke) ?? 0}`,
                Ze = o == null ? void 0 : o(e.id, We),
                Ge = de.length > 0 && I ? le : null,
                Oe = !!(Ze || Ge),
                st = e.prompt || Ze || Ge || D6(Xe);
              return c.jsxs("div", {
                className: "flex flex-col flex-1 min-h-[80px]",
                children: [c.jsxs("div", {
                  className: "flex items-center justify-between mb-1.5",
                  children: [c.jsx("label", {
                    className: `block text-xs ${ve}`,
                    children: Ye
                  }), c.jsx("span", {
                    "data-input-type": We,
                    onMouseDown: vt => {
                      vt.stopPropagation(), he(vt, We);
                    },
                    onMouseUp: vt => {
                      vt.stopPropagation(), ue(vt, We);
                    },
                    title: x("点击后拖到文本节点可单独连接此框"),
                    className: `cursor-pointer px-1.5 py-0.5 rounded text-[10px] ${Oe ? t ? "text-green-400" : "text-green-600" : t ? "text-zinc-400 hover:text-zinc-300" : "text-zinc-500 hover:text-zinc-600"}`,
                    children: x(Oe ? "已连接" : "链接")
                  })]
                }), de.length > 0 && J > 0 ? c.jsx(m$t, {
                  isDark: t,
                  textNodeCount: J,
                  showPreview: I,
                  onTogglePreview: () => E(vt => !vt),
                  className: "mb-1"
                }) : null, c.jsxs("div", {
                  "data-input-type": We,
                  onMouseUp: vt => ue(vt, We),
                  children: [c.jsx("textarea", {
                    value: st,
                    onChange: vt => {
                      xe(vt), we(Ke, vt.target.value);
                    },
                    placeholder: x("可连接文字节点（图片连接后，default 端口的文字节点会自动识别）"),
                    rows: 5,
                    style: {
                      minHeight: "100px"
                    },
                    className: `w-full px-3 py-2 text-lg rounded-md border ${ke} focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y min-h-[100px] leading-relaxed`
                  }), Oe && c.jsx("span", {
                    className: "text-[10px] text-zinc-500 mt-0.5 block",
                    children: x(Ze ? "已连接文字节点" : "已识别 default 端口文字节点")
                  })]
                })]
              }, Ke);
            }
            if (De === "LIST") {
              const Ft = Mxo(Le.fieldData, Le),
                We = D6(Xe),
                Ze = Myn(Le.fieldData),
                Ge = We || (Ze && Ft.some(st => st.index === Ze) ? Ze : "") || (((It = Ft[0]) == null ? void 0 : It.index) ?? ""),
                Oe = String(Ge ?? "");
              return c.jsxs("div", {
                className: "rh-list-dropdown",
                children: [c.jsx("label", {
                  className: `block text-xs mb-1 ${ve}`,
                  children: Ye
                }), c.jsxs("div", {
                  className: "relative",
                  children: [c.jsxs("button", {
                    type: "button",
                    onMouseDown: st => {
                      st.preventDefault(), st.stopPropagation();
                      const vt = j.has(Ke);
                      B(new Set(vt ? [] : [Ke]));
                    },
                    className: `w-full px-2.5 py-1.5 text-sm rounded-md border text-left flex items-center justify-between ${ke} focus:outline-none focus:ring-1 focus:ring-blue-500`,
                    children: [c.jsx("span", {
                      className: "truncate",
                      children: Oe || x("请选择")
                    }), c.jsx("span", {
                      className: "text-xs",
                      children: "▼"
                    })]
                  }), j.has(Ke) && c.jsx("div", {
                    className: `absolute top-full left-0 right-0 mt-1 border rounded-md shadow-lg z-[9999] max-h-[300px] overflow-y-auto min-w-max rh-scroll-minimal ${t ? "bg-[#1f1f1f] border-zinc-600 text-white" : ke}`,
                    onMouseDown: st => {
                      st.stopPropagation(), st.preventDefault();
                    },
                    children: Ft.length > 0 ? Ft.map(st => c.jsx("div", {
                      role: "option",
                      onMouseDown: vt => {
                        vt.stopPropagation(), vt.preventDefault(), we(Ke, String(st.index)), B(new Set());
                      },
                      className: `px-2.5 py-1.5 text-sm cursor-pointer hover:bg-blue-500/20 select-none ${Oe === String(st.index) ? "bg-blue-500/30 font-medium" : ""}`,
                      title: String(st.name),
                      children: String(st.name)
                    }, st.index)) : c.jsx("div", {
                      className: "px-2.5 py-1.5 text-sm text-zinc-500",
                      children: x("无选项")
                    })
                  })]
                })]
              }, Ke);
            }
            if (De === "IMAGE" || De === "AUDIO" || De === "VIDEO") {
              const Ft = pe.get(Ke) ?? 0,
                We = de[Ft],
                Ze = !!We,
                Ge = D6(Xe),
                Oe = K[Ke],
                st = De === "IMAGE" && (Oe || We),
                vt = Ge && (Ge.startsWith("api/") || Ge.startsWith("openapi/")),
                Ht = F === Ke,
                nn = De === "IMAGE";
              if (De === "AUDIO") {
                const pt = We,
                  lt = Oe || pt;
                return c.jsxs("div", {
                  children: [c.jsx("label", {
                    className: `block text-xs mb-1 ${ve}`,
                    children: Ye
                  }), c.jsxs("div", {
                    className: "flex gap-2 items-center flex-wrap",
                    children: [lt && c.jsxs("div", {
                      className: `w-full rounded-md border p-2 flex items-center gap-2 ${t ? "border-white/30 bg-transparent" : "border-zinc-300 bg-zinc-50"}`,
                      children: [c.jsx(Qh, {
                        size: 20,
                        className: t ? "text-green-400" : "text-green-600"
                      }), c.jsx("audio", {
                        src: Oe || pt,
                        controls: !0,
                        className: "flex-1 h-8",
                        onMouseDown: gt => gt.stopPropagation(),
                        onClick: gt => gt.stopPropagation()
                      })]
                    }), vt && !lt && c.jsxs("div", {
                      className: `w-full rounded-md border p-2 flex items-center gap-2 ${t ? "border-white/30 bg-transparent" : "border-zinc-300 bg-zinc-50"}`,
                      children: [c.jsx(Qh, {
                        size: 20,
                        className: t ? "text-green-400" : "text-green-600"
                      }), c.jsx("span", {
                        className: `text-xs ${t ? "text-white" : "text-zinc-600"}`,
                        children: x("音频已上传")
                      })]
                    }), c.jsxs("div", {
                      className: "flex gap-2 items-center w-full",
                      children: [c.jsx("input", {
                        ref: gt => {
                          G.current[Ke] = gt;
                        },
                        type: "file",
                        accept: "audio/*",
                        className: "hidden",
                        onChange: gt => re(Le, gt)
                      }), c.jsxs("button", {
                        type: "button",
                        onClick: () => {
                          var gt;
                          return (gt = G.current[Ke]) == null ? void 0 : gt.click();
                        },
                        className: `flex items-center gap-1.5 px-2 py-1.5 text-xs rounded-md border ${_e} ${t ? "hover:bg-white/5" : "hover:bg-zinc-100"}`,
                        title: x("上传音频或从画布连接音频节点"),
                        children: [c.jsx(eo, {
                          size: 14,
                          className: "text-blue-500"
                        }), c.jsx(ml, {
                          size: 14
                        }), x("上传音频")]
                      }), Ze && c.jsx("span", {
                        className: `text-[10px] ${t ? "text-green-400" : "text-green-600"}`,
                        children: x("已连接画布音频")
                      })]
                    })]
                  })]
                }, Ke);
              }
              if (De === "VIDEO") {
                const pt = We,
                  lt = Oe || pt;
                return c.jsxs("div", {
                  children: [c.jsx("label", {
                    className: `block text-xs mb-1 ${ve}`,
                    children: Ye
                  }), c.jsxs("div", {
                    className: "flex gap-2 items-center flex-wrap",
                    children: [lt && c.jsx("div", {
                      className: `w-full rounded-md border overflow-hidden ${t ? "border-white/30 bg-transparent" : "border-zinc-300 bg-zinc-50"}`,
                      children: c.jsx("video", {
                        src: Oe || pt,
                        controls: !0,
                        className: "w-full max-h-32",
                        onMouseDown: gt => gt.stopPropagation(),
                        onClick: gt => gt.stopPropagation()
                      })
                    }), vt && !lt && c.jsx("div", {
                      className: `w-16 h-16 rounded-md border flex items-center justify-center flex-shrink-0 ${t ? "border-white/30 bg-transparent" : "border-zinc-400/50 bg-zinc-800/50"}`,
                      children: c.jsx(Oo, {
                        size: 24,
                        className: t ? "text-green-400" : "text-green-600"
                      })
                    }), c.jsxs("div", {
                      className: "flex gap-2 items-center",
                      children: [c.jsx("input", {
                        ref: gt => {
                          G.current[Ke] = gt;
                        },
                        type: "file",
                        accept: "video/*",
                        className: "hidden",
                        onChange: gt => re(Le, gt)
                      }), c.jsxs("button", {
                        type: "button",
                        onClick: () => {
                          var gt;
                          return (gt = G.current[Ke]) == null ? void 0 : gt.click();
                        },
                        className: `flex items-center gap-1.5 px-2 py-1.5 text-xs rounded-md border ${_e} ${t ? "hover:bg-white/5" : "hover:bg-zinc-100"}`,
                        title: x("上传视频或从画布连接视频"),
                        children: [c.jsx(eo, {
                          size: 14,
                          className: "text-blue-500"
                        }), c.jsx(ml, {
                          size: 14
                        }), x("上传视频")]
                      }), Ze && c.jsx("span", {
                        className: `text-[10px] ${t ? "text-green-400" : "text-green-600"}`,
                        children: x("已连接画布视频")
                      }), vt && !Ze && c.jsx("span", {
                        className: `text-[10px] ${t ? "text-white/60" : "text-zinc-500"}`,
                        children: x("已上传")
                      })]
                    })]
                  })]
                }, Ke);
              }
              return c.jsxs("div", {
                children: [c.jsx("label", {
                  className: `block text-xs mb-1 ${ve}`,
                  children: Ye
                }), c.jsxs("div", {
                  className: "flex gap-2 items-center flex-wrap",
                  children: [st && c.jsx("div", {
                    className: `w-16 h-16 rounded-md overflow-hidden border flex-shrink-0 ${t ? "border-white/30 bg-transparent" : "border-zinc-400/50 bg-zinc-800/50"}`,
                    children: c.jsx("img", {
                      src: Oe || We,
                      alt: x("上传预览"),
                      className: "w-full h-full object-cover",
                      onError: pt => {
                        pt.target.style.display = "none";
                      }
                    })
                  }), c.jsxs("div", {
                    "data-rh-upload-zone": "true",
                    className: `flex flex-col gap-1 flex-1 min-w-0 rounded-md border-2 border-dashed transition-colors ${Ht && nn ? "border-blue-500 bg-blue-500/10" : `${_e} ${t ? "hover:border-white/50" : "hover:border-zinc-300"}`}`,
                    onDragEnter: nn ? pt => {
                      pt.preventDefault(), pt.stopPropagation(), pt.dataTransfer.dropEffect = "copy", N(Ke);
                    } : void 0,
                    onDragOver: nn ? pt => {
                      pt.preventDefault(), pt.stopPropagation(), pt.dataTransfer.dropEffect = "copy", N(Ke);
                    } : void 0,
                    onDragLeave: nn ? pt => {
                      pt.preventDefault(), pt.currentTarget.contains(pt.relatedTarget) || N(null);
                    } : void 0,
                    onDrop: nn ? async pt => {
                      var Ut, _t, At;
                      pt.preventDefault(), pt.stopPropagation(), N(null);
                      const lt = pt.dataTransfer.getData("application/json");
                      if (lt) try {
                        const Yt = JSON.parse(lt);
                        if (Yt.type === "history-item" && ((Ut = Yt.item) != null && Ut.url)) {
                          let qe = Yt.item.url;
                          if (((_t = Yt.item.mjImages) == null ? void 0 : _t.length) > 0) {
                            const kt = Yt.item.selectedMjImageIndex ?? 0;
                            qe = Yt.item.mjImages[kt] || qe;
                          }
                          if (qe) {
                            await Z(Le, qe);
                            return;
                          }
                        }
                      } catch {}
                      const gt = (At = pt.dataTransfer.files) == null ? void 0 : At[0];
                      gt && (gt.type.startsWith("image/") || /\.(png|jpg|jpeg|gif|webp)$/i.test(gt.name)) && (await X(Le, gt));
                    } : void 0,
                    children: [c.jsxs("div", {
                      className: "flex gap-2 items-center p-2",
                      children: [c.jsx("input", {
                        ref: pt => {
                          G.current[Ke] = pt;
                        },
                        type: "file",
                        accept: "image/*",
                        className: "hidden",
                        onChange: pt => re(Le, pt)
                      }), c.jsxs("button", {
                        type: "button",
                        onClick: () => {
                          var pt;
                          return (pt = G.current[Ke]) == null ? void 0 : pt.click();
                        },
                        className: `flex items-center gap-1.5 px-2 py-1.5 text-xs rounded-md border ${_e} ${t ? "hover:bg-white/5" : "hover:bg-zinc-100"}`,
                        title: x("点击上传或从生成历史拖入图片"),
                        children: [c.jsx(eo, {
                          size: 14,
                          className: "text-blue-500"
                        }), c.jsx(ml, {
                          size: 14
                        }), x("上传")]
                      }), Ze && c.jsx("span", {
                        className: `text-[10px] ${t ? "text-green-400" : "text-green-600"}`,
                        children: x("已连接画布图片")
                      })]
                    }), Ht && nn && c.jsx("span", {
                      className: `text-[10px] ${t ? "text-blue-400" : "text-blue-500"} px-2 pb-1`,
                      children: x("松开即可上传")
                    }), Ge && (Ge.startsWith("api/") || Ge.startsWith("openapi/")) && c.jsx("span", {
                      className: `text-[10px] ${t ? "text-white/60" : "text-zinc-500"} truncate px-2`,
                      children: x("已上传")
                    })]
                  })]
                })]
              }, Ke);
            }
            const He = `rh_str_${ne.get(Ke) ?? 0}`,
              Ve = o == null ? void 0 : o(e.id, He),
              it = Ve || D6(Xe);
            return c.jsxs("div", {
              children: [c.jsxs("div", {
                className: "flex items-center justify-between mb-1.5",
                children: [c.jsx("label", {
                  className: `block text-xs ${ve}`,
                  children: Ye
                }), c.jsx("span", {
                  "data-input-type": He,
                  onMouseDown: Ft => {
                    Ft.stopPropagation(), he(Ft, He);
                  },
                  onMouseUp: Ft => {
                    Ft.stopPropagation(), ue(Ft, He);
                  },
                  title: x("点击后拖到文本节点可单独连接此框"),
                  className: `cursor-pointer px-1.5 py-0.5 rounded text-[10px] ${Ve ? t ? "text-green-400" : "text-green-600" : t ? "text-zinc-400 hover:text-zinc-300" : "text-zinc-500 hover:text-zinc-600"}`,
                  children: x(Ve ? "已连接" : "链接")
                })]
              }), c.jsxs("div", {
                "data-input-type": He,
                onMouseUp: Ft => ue(Ft, He),
                children: [c.jsx("input", {
                  type: "text",
                  value: it,
                  onChange: Ft => we(Ke, Ft.target.value),
                  placeholder: x("可连接文字节点（点「链接」后拖到文本节点）"),
                  className: `w-full px-3 py-2 text-sm rounded-md border ${ke} focus:outline-none focus:ring-1 focus:ring-blue-500`
                }), Ve && c.jsx("span", {
                  className: "text-[10px] text-zinc-500 mt-0.5 block",
                  children: x("已连接文字节点")
                })]
              })]
            }, Ke);
          })]
        }), O && c.jsxs("div", {
          className: "space-y-1.5",
          children: [c.jsx("div", {
            className: `text-xs font-medium ${ve}`,
            children: x("显存机器")
          }), c.jsxs("div", {
            className: "flex gap-2",
            children: [c.jsx("button", {
              type: "button",
              onClick: () => Ee("default"),
              className: `flex-1 px-3 py-2 text-sm font-medium rounded-md border transition-colors ${H === "default" ? t ? "bg-zinc-700 border-zinc-600 text-white" : "bg-zinc-200 border-zinc-300 text-zinc-900" : t ? "bg-transparent border-white/20 text-white/70 hover:bg-white/5" : "bg-transparent border-zinc-200 text-zinc-600 hover:bg-zinc-50"}`,
              children: "24G"
            }), c.jsx("button", {
              type: "button",
              onClick: () => Ee("plus"),
              className: `flex-1 px-3 py-2 text-sm font-medium rounded-md border transition-colors ${H === "plus" ? t ? "bg-zinc-700 border-zinc-600 text-white" : "bg-zinc-200 border-zinc-300 text-zinc-900" : t ? "bg-transparent border-white/20 text-white/70 hover:bg-white/5" : "bg-transparent border-zinc-200 text-zinc-600 hover:bg-zinc-50"}`,
              children: "48G"
            })]
          })]
        }), O && c.jsx("button", {
          onClick: ye,
          disabled: S,
          className: `w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors border ${S ? t ? "bg-transparent border-white/20 text-white/50 cursor-not-allowed" : "bg-zinc-500/50 text-zinc-400 cursor-not-allowed" : t ? "bg-transparent border-white/30 hover:bg-white/5 text-white" : "bg-green-500 hover:bg-green-600 text-white"}`,
          children: S ? c.jsxs(c.Fragment, {
            children: [c.jsx(Ua, {
              size: 16,
              className: "animate-spin"
            }), x(M === "queued" ? "排队中..." : "运行中...")]
          }) : c.jsxs(c.Fragment, {
            children: [c.jsx(Ol, {
              size: 16
            }), x("运行")]
          })
        }), W.length > 0 && c.jsxs("div", {
          className: "space-y-2",
          children: [c.jsxs("div", {
            className: `flex items-center justify-between gap-2 text-xs font-medium ${ve}`,
            children: [c.jsxs("div", {
              className: "flex items-center gap-1.5",
              children: [c.jsx(lo, {
                size: 14
              }), x("生成结果")]
            }), Q != null && c.jsxs("span", {
              className: `flex items-center gap-1 ${t ? "text-green-400" : "text-green-600"}`,
              children: [c.jsx(AP, {
                size: 12
              }), Q < 1e3 ? `${Q}ms` : `${(Q / 1e3).toFixed(1)}s`]
            })]
          }), c.jsx("div", {
            className: "flex flex-wrap gap-2",
            children: W.slice(-6).reverse().map(Le => {
              const Ke = Pyn(Le.fullUrl);
              return Ke === "audio" ? c.jsxs("div", {
                className: `flex flex-col gap-1 w-full min-w-[200px] p-2 rounded-lg border ${t ? "border-zinc-600 bg-zinc-800/50" : "border-zinc-300 bg-zinc-50"}`,
                children: [c.jsxs("div", {
                  className: "flex items-center gap-1.5 text-xs text-zinc-500",
                  children: [c.jsx(Qh, {
                    size: 12
                  }), x("音频")]
                }), c.jsx("audio", {
                  src: Le.fullUrl,
                  controls: !0,
                  className: "w-full h-8",
                  preload: "metadata",
                  onMouseDown: Xe => Xe.stopPropagation(),
                  onClick: Xe => Xe.stopPropagation()
                })]
              }, Le.id) : Ke === "video" ? c.jsx("div", {
                className: `block w-14 h-14 rounded overflow-hidden border ${t ? "border-zinc-600" : "border-zinc-300"} hover:border-blue-500 transition-colors`,
                children: c.jsx("video", {
                  src: Le.fullUrl,
                  className: "w-full h-full object-cover",
                  muted: !0,
                  preload: "metadata",
                  onMouseDown: Xe => Xe.stopPropagation(),
                  onClick: Xe => Xe.stopPropagation()
                })
              }, Le.id) : c.jsx("a", {
                href: Le.fullUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "block w-14 h-14 rounded overflow-hidden border border-zinc-300 hover:border-blue-500 transition-colors",
                children: c.jsx("img", {
                  src: Le.fullUrl,
                  alt: "",
                  className: "w-full h-full object-cover"
                })
              }, Le.id);
            })
          })]
        })]
      })
    });
  },
  Nyn = [{
    r: 255,
    g: 0,
    b: 0,
    zh: "红色"
  }, {
    r: 255,
    g: 220,
    b: 0,
    zh: "黄色"
  }, {
    r: 0,
    g: 120,
    b: 255,
    zh: "蓝色"
  }];

function jxo(e, t) {
  return (e.r - t.r) ** 2 + (e.g - t.g) ** 2 + (e.b - t.b) ** 2;
}

function Dxo(e) {
  let t = Nyn[0],
    n = 1 / 0;
  for (const r of Nyn) {
    const a = jxo(e, r);
    a < n && (n = a, t = r);
  }
  return t.zh;
}

function Lxo(e) {
  const t = new Set();
  for (const n of e) n.isEraser || !n.markRgb || t.add(Dxo(n.markRgb));
  return t.size === 0 && t.add("红色"), Array.from(t);
}

function jyn(e, t) {
  return `rgba(${e.r}, ${e.g}, ${e.b}, ${t})`;
}

const Oxo = 24,
  Bxo = 40,
  Zct = .25,
  edt = 2,
  Dyn = .25,
  o1r = ({
    imageUrl: e,
    onSave: t,
    onClose: n,
    isDark: r = !0,
    outputType: a = "comfy-alpha",
    initialBrushWidth: i,
    initialEraserWidth: o,
    variant: s = "full",
    externalBrushWidth: l,
    markColor: d = {
      r: 255,
      g: 0,
      b: 0
    }
  }) => {
    on();
    const u = g.useRef(null),
      h = g.useRef(null),
      p = g.useRef(null),
      m = g.useRef(t);
    m.current = t;
    const [f, y] = g.useState([]),
      [b, v] = g.useState(!1),
      [_, w] = g.useState(!1),
      [k, A] = g.useState(i ?? Oxo),
      [S, C] = g.useState(o ?? Bxo),
      [I, E] = g.useState({
        w: 0,
        h: 0
      }),
      [M, T] = g.useState(1),
      P = g.useRef(null);
    g.useEffect(() => {
      p.current = null;
      const z = new Image();
      z.crossOrigin = "anonymous", z.onload = () => {
        p.current = z, E({
          w: z.naturalWidth,
          h: z.naturalHeight
        });
      }, z.onerror = () => {
        p.current = null, E({
          w: 0,
          h: 0
        });
      }, z.src = e;
    }, [e]);
    const R = g.useCallback(z => {
        const V = u.current;
        if (!V || I.w === 0) return null;
        const O = V.getBoundingClientRect(),
          L = z.clientX - O.left,
          D = z.clientY - O.top,
          U = L / O.width * I.w,
          H = D / O.height * I.h;
        return U < 0 || U > I.w || H < 0 || H > I.h ? null : {
          x: U,
          y: H
        };
      }, [I]),
      j = g.useCallback(z => {
        var D, U;
        z.preventDefault(), z.stopPropagation(), (U = (D = z.target).setPointerCapture) == null || U.call(D, z.pointerId);
        const V = R(z);
        if (!V) return;
        v(!0), P.current = V;
        const L = {
          points: [V],
          width: _ ? S : l ?? k,
          isEraser: _
        };
        a === "red-composite" && !_ && (L.markRgb = {
          r: d.r,
          g: d.g,
          b: d.b
        }), y(H => [...H, L]);
      }, [R, _, S, k, l, a, d]),
      B = g.useCallback(z => {
        if (!b) return;
        z.preventDefault();
        const V = R(z);
        if (!V) return;
        const O = P.current;
        O && (Math.abs(V.x - O.x) > .5 || Math.abs(V.y - O.y) > .5) && y(L => {
          const D = L[L.length - 1];
          return D ? (P.current = V, [...L.slice(0, -1), {
            ...D,
            points: [...D.points, V]
          }]) : L;
        });
      }, [b, R]),
      F = g.useCallback(z => {
        var V, O;
        (O = (V = z.target).releasePointerCapture) == null || O.call(V, z.pointerId), v(!1), P.current = null;
      }, []);
    g.useEffect(() => {
      const z = () => {
        v(!1), P.current = null;
      };
      return window.addEventListener("mouseup", z), () => window.removeEventListener("mouseup", z);
    }, []), g.useEffect(() => {
      const z = u.current,
        V = p.current;
      if (!z || !V || I.w === 0) return;
      const O = z.getContext("2d");
      if (O) {
        if ((z.width !== I.w || z.height !== I.h) && (z.width = I.w, z.height = I.h), O.clearRect(0, 0, I.w, I.h), O.drawImage(V, 0, 0), a === "red-composite") {
          const L = I.w,
            D = I.h,
            U = document.createElement("canvas");
          U.width = L, U.height = D;
          const H = U.getContext("2d");
          H && (H.lineCap = "round", H.lineJoin = "round", f.forEach(Y => {
            if (H.beginPath(), Y.points.forEach((K, W) => W === 0 ? H.moveTo(K.x, K.y) : H.lineTo(K.x, K.y)), H.lineWidth = Y.width, Y.isEraser) H.globalCompositeOperation = "destination-out", H.strokeStyle = "rgba(0, 0, 0, 1)", H.stroke(), H.globalCompositeOperation = "source-over";else {
              H.globalCompositeOperation = "source-over";
              const K = Y.markRgb ?? d;
              H.strokeStyle = jyn(K, .85), H.stroke();
            }
          })), O.drawImage(U, 0, 0);
          return;
        }
        O.lineCap = "round", O.lineJoin = "round", f.forEach(L => {
          O.strokeStyle = L.isEraser ? "black" : "white", O.lineWidth = L.width, O.beginPath(), L.points.forEach((D, U) => U === 0 ? O.moveTo(D.x, D.y) : O.lineTo(D.x, D.y)), O.stroke();
        });
      }
    }, [I, f, a, d]);
    const N = g.useCallback(async () => {
      const {
        w: z,
        h: V
      } = I;
      if (z === 0 || V === 0) return;
      const O = document.createElement("canvas");
      O.width = z, O.height = V;
      const L = O.getContext("2d");
      if (!L) return;
      if (L.fillStyle = "black", L.fillRect(0, 0, z, V), L.lineCap = "round", L.lineJoin = "round", f.forEach(W => {
        L.strokeStyle = W.isEraser ? "black" : "white", L.lineWidth = W.width, L.beginPath(), W.points.forEach((Q, q) => q === 0 ? L.moveTo(Q.x, Q.y) : L.lineTo(Q.x, Q.y)), L.stroke();
      }), a === "mask-png") {
        O.toBlob(W => {
          W && m.current(W);
        }, "image/png", .95);
        return;
      }
      if (a === "red-composite") {
        const W = p.current;
        if (!W || W.naturalWidth === 0) return;
        const Q = document.createElement("canvas");
        Q.width = z, Q.height = V;
        const q = Q.getContext("2d");
        if (!q) return;
        q.drawImage(W, 0, 0, z, V);
        const ne = document.createElement("canvas");
        ne.width = z, ne.height = V;
        const de = ne.getContext("2d");
        if (!de) return;
        de.lineCap = "round", de.lineJoin = "round";
        const le = Lxo(f);
        f.forEach(J => {
          if (de.beginPath(), J.points.forEach((pe, ce) => ce === 0 ? de.moveTo(pe.x, pe.y) : de.lineTo(pe.x, pe.y)), de.lineWidth = J.width, J.isEraser) de.globalCompositeOperation = "destination-out", de.strokeStyle = "rgba(0, 0, 0, 1)", de.stroke(), de.globalCompositeOperation = "source-over";else {
            de.globalCompositeOperation = "source-over";
            const pe = J.markRgb ?? d;
            de.strokeStyle = jyn(pe, .92), de.stroke();
          }
        }), q.drawImage(ne, 0, 0), Q.toBlob(J => {
          J && m.current(J, {
            markColorNamesZh: le
          });
        }, "image/png", .95);
        return;
      }
      const D = L.getImageData(0, 0, z, V),
        U = document.createElement("canvas");
      U.width = z, U.height = V;
      const H = U.getContext("2d");
      if (!H) return;
      const Y = new Image();
      Y.crossOrigin = "anonymous", await new Promise((W, Q) => {
        Y.onload = () => {
          H.drawImage(Y, 0, 0), W();
        }, Y.onerror = Q, Y.src = e;
      });
      const K = H.getImageData(0, 0, z, V);
      for (let W = 0; W < K.data.length; W += 4) {
        const Q = D.data[W];
        K.data[W + 3] = 255 - Q;
      }
      H.putImageData(K, 0, 0), U.toBlob(W => {
        W && m.current(W);
      }, "image/png", .95);
    }, [e, I, f, a, d]);
    g.useEffect(() => {
      s === "canvas-only" && (b || f.length && N());
    }, [s, b, f, N]);
    const G = g.useCallback(() => y([]), []);
    return s === "canvas-only" ? c.jsx("div", {
      ref: h,
      className: "w-full h-full overflow-hidden",
      children: c.jsx("div", {
        className: "w-full h-full select-none touch-none",
        style: {
          width: "100%",
          height: "100%"
        },
        children: c.jsx("canvas", {
          ref: u,
          width: I.w,
          height: I.h,
          className: "w-full h-full touch-none cursor-crosshair",
          style: {
            display: "block"
          },
          onPointerDown: j,
          onPointerMove: B,
          onPointerUp: F,
          onPointerLeave: F,
          onContextMenu: z => z.preventDefault()
        })
      })
    }) : c.jsxs("div", {
      className: `flex flex-col ${r ? "bg-zinc-900 text-white" : "bg-zinc-50 text-zinc-900"}`,
      children: [c.jsxs("div", {
        className: `p-3 border-b ${r ? "border-white/30" : "border-zinc-700/50"} flex items-center justify-between gap-2 flex-wrap`,
        children: [c.jsx("span", {
          className: "text-xs text-zinc-500",
          children: x("白色笔触 = 修改区域（蒙版格式：白=修改，黑=保留）")
        }), c.jsxs("div", {
          className: "flex items-center gap-2 flex-wrap",
          children: [c.jsxs("button", {
            type: "button",
            onClick: () => w(!1),
            className: `flex items-center gap-1 px-2 py-1 rounded text-xs ${r ? _ ? "border border-white/30 text-zinc-500 hover:bg-white/5 hover:text-white" : "border border-white/50 bg-transparent text-white" : _ ? "" : "bg-zinc-600"}`,
            children: [c.jsx(bEt, {
              size: 14
            }), x("画笔")]
          }), c.jsxs("button", {
            type: "button",
            onClick: () => w(!0),
            className: `flex items-center gap-1 px-2 py-1 rounded text-xs ${r ? _ ? "border border-white/50 bg-transparent text-white" : "border border-white/30 text-zinc-500 hover:bg-white/5 hover:text-white" : _ ? "bg-zinc-600" : ""}`,
            children: [c.jsx(uI, {
              size: 14
            }), x("橡皮")]
          }), c.jsxs("button", {
            type: "button",
            onClick: G,
            className: `flex items-center gap-1 px-2 py-1 rounded text-xs ${r ? "border border-white/30 hover:bg-white/5 hover:text-white text-zinc-500" : "hover:bg-zinc-600"}`,
            children: [c.jsx(vd, {
              size: 14
            }), x("清空")]
          }), c.jsxs("div", {
            className: `flex items-center gap-2 border-l ${r ? "border-white/15" : "border-zinc-600"} pl-2`,
            children: [c.jsx("span", {
              className: "text-[10px] text-zinc-400",
              children: x("笔刷")
            }), c.jsx("input", {
              type: "range",
              min: 6,
              max: 120,
              step: 1,
              value: k,
              onChange: z => A(Number(z.target.value)),
              className: "w-20 h-1.5 accent-zinc-500"
            }), c.jsx("span", {
              className: "text-[10px] min-w-[2rem] text-right text-zinc-400",
              children: Math.round(k)
            })]
          }), c.jsxs("div", {
            className: `flex items-center gap-2 border-l ${r ? "border-white/15" : "border-zinc-600"} pl-2`,
            children: [c.jsx("button", {
              type: "button",
              onClick: () => T(z => Math.max(Zct, z - Dyn)),
              disabled: M <= Zct,
              className: `p-1 rounded ${r ? "hover:bg-white/5" : "hover:bg-zinc-600"} disabled:opacity-40`,
              title: x("缩小"),
              children: c.jsx(Wue, {
                size: 14
              })
            }), c.jsx("input", {
              type: "range",
              min: Zct * 100,
              max: edt * 100,
              value: M * 100,
              onChange: z => T(Number(z.target.value) / 100),
              className: "w-20 h-1.5 accent-zinc-500"
            }), c.jsx("button", {
              type: "button",
              onClick: () => T(z => Math.min(edt, z + Dyn)),
              disabled: M >= edt,
              className: `p-1 rounded ${r ? "hover:bg-white/5" : "hover:bg-zinc-600"} disabled:opacity-40`,
              title: x("放大"),
              children: c.jsx(Z$, {
                size: 14
              })
            }), c.jsxs("span", {
              className: "text-xs min-w-[2.5rem] text-center",
              children: [Math.round(M * 100), "%"]
            })]
          })]
        })]
      }), c.jsx("div", {
        ref: h,
        className: "flex-1 overflow-auto p-4 flex items-start justify-center min-h-[360px]",
        style: {
          maxHeight: 560
        },
        children: c.jsx("div", {
          className: "inline-block select-none touch-none",
          style: {
            transform: `scale(${M})`,
            transformOrigin: "top left",
            width: I.w,
            height: I.h
          },
          children: c.jsx("canvas", {
            ref: u,
            width: I.w,
            height: I.h,
            className: `cursor-crosshair border touch-none ${r ? "border-white/20" : "border-zinc-600/50"}`,
            style: {
              display: "block"
            },
            onPointerDown: j,
            onPointerMove: B,
            onPointerUp: F,
            onPointerLeave: F,
            onContextMenu: z => z.preventDefault()
          })
        })
      }), c.jsxs("div", {
        className: `p-3 border-t ${r ? "border-white/30" : "border-zinc-700/50"} flex justify-end gap-2`,
        children: [c.jsx("button", {
          type: "button",
          onClick: n,
          className: `px-3 py-1.5 text-sm rounded border ${r ? "border-white/30 hover:bg-white/5" : "border-zinc-600 hover:bg-zinc-700"}`,
          children: x("取消")
        }), c.jsx("button", {
          type: "button",
          onClick: N,
          className: "px-3 py-1.5 text-sm rounded bg-green-600 hover:bg-green-500 text-white",
          children: x("保存并替换图片")
        })]
      })]
    });
  },
  Fxo = Object.freeze(Object.defineProperty({
    __proto__: null,
    ComfyMaskEditor: o1r
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  w8 = new dr(0, .5, 0),
  tdt = 1.8,
  DPe = 1.4,
  ndt = -.8,
  lge = 15285634,
  rdt = 65488,
  adt = 16758784,
  zxo = ({
    horizontalDeg: e,
    verticalDeg: t,
    zoom: n,
    sourceImage: r,
    isDark: a,
    className: i = "",
    onHorizontalChange: o,
    onVerticalChange: s,
    onZoomChange: l
  }) => {
    on();
    const d = g.useRef(null),
      u = g.useRef(null),
      h = g.useRef(null),
      p = g.useRef(null),
      m = g.useRef(o),
      f = g.useRef(s),
      y = g.useRef(l);
    m.current = o, f.current = s, y.current = l;
    const b = g.useRef({
      target: "none",
      pointerId: -1
    });
    return g.useEffect(() => {
      const v = d.current;
      if (!v) return;
      const _ = 240,
        w = () => Math.max(220, v.clientWidth),
        k = new OD();
      k.background = new so(a ? 657935 : 16053493);
      const A = new lu(45, w() / _, .1, 1e3);
      A.position.set(4, 3.5, 4), A.lookAt(0, .3, 0);
      const S = new FD({
        antialias: !0,
        alpha: !0
      });
      S.setSize(w(), _), S.setPixelRatio(1), S.outputColorSpace = Nl, v.appendChild(S.domElement), k.add(new ope(16777215, a ? .4 : .55));
      const C = new pT(16777215, a ? .85 : .9);
      C.position.set(5, 10, 5), k.add(C);
      const I = new pT(15285634, a ? .28 : .18);
      I.position.set(-5, 5, -5), k.add(I);
      const E = new sKn(5, 20, a ? 4144966 : 13948120, a ? 1710638 : 15000807);
      E.position.y = -.01, k.add(E);
      const M = new ng({
        color: a ? 3816010 : 13948120,
        side: _y,
        roughness: .72
      });
      p.current = M;
      const T = new di(new W5(1.2, 1.75), M);
      T.position.copy(w8), k.add(T);
      const P = new di(new xS(tdt, .04, 16, 100), new uu({
        color: lge,
        transparent: !0,
        opacity: .7
      }));
      P.rotation.x = Math.PI / 2, P.position.y = .02, k.add(P);
      const R = [];
      for (let he = 0; he <= 32; he++) {
        const ge = (-30 + 90 * he / 32) * Math.PI / 180;
        R.push(new dr(ndt, DPe * Math.sin(ge) + w8.y, DPe * Math.cos(ge)));
      }
      const j = new rDt(R),
        B = new di(new qYe(j, 32, .04, 8, !1), new uu({
          color: rdt,
          transparent: !0,
          opacity: .8
        }));
      k.add(B);
      const F = (he, ue) => new di(new qp(.16, 24, 24), new ng({
          color: he,
          emissive: ue,
          emissiveIntensity: .55,
          metalness: .25,
          roughness: .42
        })),
        N = F(lge, lge),
        G = F(rdt, rdt),
        z = F(adt, adt);
      k.add(N, G, z);
      const V = new di(new FP(.15, .4, 4), new ng({
        color: lge,
        emissive: lge,
        emissiveIntensity: .45,
        metalness: .75,
        roughness: .25
      }));
      k.add(V);
      const O = new di(new qp(.38, 10, 10), new uu({
          visible: !1
        })),
        L = O.clone(),
        D = O.clone();
      k.add(O, L, D);
      const U = new Fd(),
        H = new BD({
          color: adt,
          transparent: !0,
          opacity: .85
        }),
        Y = new Qw(U, H);
      k.add(Y);
      const K = new tJ(),
        W = new Qi(),
        Q = new dr(),
        q = new D1(new dr(0, 1, 0), 0),
        ne = new D1();
      ne.setFromNormalAndCoplanarPoint(new dr(1, 0, 0), new dr(ndt, 0, 0));
      const de = (he, ue, ge) => {
        const ke = (he % 360 + 360) % 360 * Math.PI / 180,
          Te = Math.max(kSt, Math.min(ASt, ue)) * Math.PI / 180,
          Ne = Math.max(Tgr, Math.min(cDe, ge)),
          me = 2.6 - Ne / 10 * 2,
          Ae = me * Math.sin(ke) * Math.cos(Te),
          Fe = w8.y + me * Math.sin(Te),
          Me = me * Math.cos(ke) * Math.cos(Te);
        V.position.set(Ae, Fe, Me), V.lookAt(w8.x, w8.y, w8.z), V.rotateX(Math.PI / 2);
        const Re = tdt * Math.sin(ke),
          $e = tdt * Math.cos(ke);
        N.position.set(Re, .16, $e), O.position.copy(N.position);
        const rt = w8.y + DPe * Math.sin(Te),
          nt = DPe * Math.cos(Te);
        G.position.set(ndt, rt, nt), L.position.copy(G.position);
        const ze = new dr(Ae, Fe, Me),
          Le = .15 + (cDe - Ne) / cDe * .7;
        z.position.lerpVectors(w8, ze, Le), D.position.copy(z.position), U.setFromPoints([w8.clone(), ze]);
      };
      u.current = {
        applyPositions: de
      };
      let le = 0,
        J = !0;
      const pe = () => !document.hidden && J,
        ce = () => {
          pe() ? le = requestAnimationFrame(ce) : le = 0, S.render(k, A);
        },
        we = new IntersectionObserver(he => {
          for (const ue of he) J = ue.isIntersecting;
          J && le === 0 && !document.hidden && (le = requestAnimationFrame(ce));
        }, {
          threshold: 0
        });
      we.observe(v);
      const X = () => {
        document.hidden ? (le && cancelAnimationFrame(le), le = 0) : J && le === 0 && (le = requestAnimationFrame(ce));
      };
      document.addEventListener("visibilitychange", X), ce();
      const Z = () => {
          if (!d.current) return;
          const he = Math.max(220, d.current.clientWidth);
          A.aspect = he / _, A.updateProjectionMatrix(), S.setPixelRatio(1), S.setSize(he, _);
        },
        re = new ResizeObserver(Z);
      re.observe(v), window.addEventListener("resize", Z);
      const fe = S.domElement;
      fe.style.touchAction = "none";
      const ye = (he, ue) => {
          const ge = fe.getBoundingClientRect();
          W.x = (he - ge.left) / ge.width * 2 - 1, W.y = -((ue - ge.top) / ge.height) * 2 + 1;
        },
        ie = () => (K.setFromCamera(W, A), K.intersectObject(O, !1).length > 0 ? "azimuth" : K.intersectObject(L, !1).length > 0 ? "elevation" : K.intersectObject(D, !1).length > 0 ? "distance" : "none"),
        ae = he => {
          ye(he.clientX, he.clientY);
          const ue = ie();
          ue !== "none" && (ue === "azimuth" && !m.current || ue === "elevation" && !f.current || ue === "distance" && !y.current || (b.current = {
            target: ue,
            pointerId: he.pointerId
          }, fe.setPointerCapture(he.pointerId), fe.style.cursor = "grabbing"));
        },
        be = he => {
          if (ye(he.clientX, he.clientY), b.current.target === "none") {
            K.setFromCamera(W, A);
            const ge = K.intersectObject(O, !1).length > 0 || K.intersectObject(L, !1).length > 0 || K.intersectObject(D, !1).length > 0;
            fe.style.cursor = ge ? "grab" : "default";
            return;
          }
          K.setFromCamera(W, A);
          const ue = b.current.target;
          if (ue === "azimuth" && m.current) {
            if (K.ray.intersectPlane(q, Q)) {
              let ge = Math.atan2(Q.x, Q.z) * (180 / Math.PI);
              ge < 0 && (ge += 360), m.current(Math.max(0, Math.min(360, Math.round(ge))));
            }
          } else if (ue === "elevation" && f.current) {
            if (K.ray.intersectPlane(ne, Q)) {
              const ge = Q.y - w8.y,
                _e = Q.z;
              let ke = Math.atan2(ge, _e) * (180 / Math.PI);
              ke = Math.max(kSt, Math.min(ASt, ke)), f.current(Math.round(ke));
            }
          } else if (ue === "distance" && y.current) {
            const ge = 5 - W.y * 5;
            y.current(Math.round(Math.max(0, Math.min(10, ge)) * 10) / 10);
          }
        },
        Ee = he => {
          if (b.current.target !== "none") {
            b.current = {
              target: "none",
              pointerId: -1
            }, fe.style.cursor = "default";
            try {
              fe.releasePointerCapture(he.pointerId);
            } catch {}
          }
        };
      return fe.addEventListener("pointerdown", ae), fe.addEventListener("pointermove", be), fe.addEventListener("pointerup", Ee), fe.addEventListener("pointercancel", Ee), () => {
        var he;
        re.disconnect(), we.disconnect(), document.removeEventListener("visibilitychange", X), window.removeEventListener("resize", Z), le && cancelAnimationFrame(le), fe.removeEventListener("pointerdown", ae), fe.removeEventListener("pointermove", be), fe.removeEventListener("pointerup", Ee), fe.removeEventListener("pointercancel", Ee), h.current && (h.current.dispose(), h.current = null), p.current = null, U.dispose(), H.dispose(), (he = S.forceContextLoss) == null || he.call(S), S.dispose(), E.geometry.dispose(), E.material.dispose(), P.geometry.dispose(), P.material.dispose(), B.geometry.dispose(), B.material.dispose(), T.geometry.dispose(), M.dispose(), [N, G, z, V, O, L, D].forEach(ue => {
          ue.geometry.dispose(), ue.material.dispose();
        }), v.contains(S.domElement) && v.removeChild(S.domElement), u.current = null;
      };
    }, [a]), g.useEffect(() => {
      var v;
      (v = u.current) == null || v.applyPositions(e, t, n);
    }, [e, t, n]), g.useEffect(() => {
      const v = p.current;
      if (!v) return;
      const _ = r == null ? void 0 : r.trim();
      if (!_) {
        h.current && (h.current.dispose(), h.current = null), v.map = null, v.color.set(a ? 3816010 : 13948120), v.needsUpdate = !0;
        return;
      }
      new sD().load(_, k => {
        h.current && h.current.dispose(), h.current = k, k.colorSpace = Nl, k.needsUpdate = !0, v.map = k, v.color.set(16777215), v.needsUpdate = !0;
      }, void 0, () => {
        v.map = null, v.color.set(a ? 3816010 : 13948120), v.needsUpdate = !0;
      });
    }, [r, a]), c.jsx("div", {
      ref: d,
      className: `relative w-full min-h-[240px] rounded-2xl overflow-hidden border ${a ? "border-fuchsia-900/50 shadow-[inset_0_0_32px_rgba(236,72,153,0.07)]" : "border-fuchsia-200/90"} ${i}`,
      children: c.jsx("div", {
        className: "pointer-events-none absolute left-2 top-2 z-10 max-w-[72%] text-[9px] font-medium leading-snug text-zinc-500",
        children: x("与 ComfyUI-qwenmultiangle 一致：粉环在地平面 · 拖粉/青/黄球或右侧滑块")
      })
    });
  },
  Uxo = new Set(["horizontal_angle", "vertical_angle", "zoom"]);

function $xo(e) {
  return e.fieldType === "NUMBER" && Uxo.has(e.fieldName);
}

function Gxo(e) {
  var i, o;
  const t = new Map();
  for (const s of e) t.has(s.nodeId) || t.set(s.nodeId, []), t.get(s.nodeId).push(s);
  const n = [],
    r = new Set(),
    a = ["horizontal_angle", "vertical_angle", "zoom"];
  for (const [s, l] of t) {
    const d = l.filter($xo);
    if (d.length < 2) continue;
    const u = l.some(w => w.sourceClassType && /multiangle|multi[-_\s]?angle|qwen.*multi|multangle/i.test(w.sourceClassType)),
      h = new Set(d.map(w => w.fieldName)),
      p = h.has("horizontal_angle") && h.has("vertical_angle"),
      m = h.has("horizontal_angle") && h.has("zoom"),
      f = h.has("vertical_angle") && h.has("zoom");
    if (!p && !m && !f && !u) continue;
    const y = ((i = d[0]) == null ? void 0 : i.description) || "",
      b = y.lastIndexOf(" - "),
      v = b > 0 ? y.slice(0, b) : ((o = l.find(w => w.sourceClassType)) == null ? void 0 : o.sourceClassType) || "多角度机位 (Comfy)",
      _ = [];
    for (const w of a) {
      const k = d.find(A => A.fieldName === w);
      k && _.push(k);
    }
    for (const w of d) _.includes(w) || _.push(w);
    n.push({
      nodeId: s,
      title: v,
      ordered: _
    }), d.forEach(w => r.add(`${w.nodeId}:${w.fieldName}`));
  }
  return {
    blocks: n,
    skipKeys: r
  };
}

function Vxo(e) {
  switch (e) {
    case "horizontal_angle":
      return {
        label: "水平角度 (H)",
        min: 0,
        max: 360,
        step: 1,
        suffix: "°"
      };
    case "vertical_angle":
      return {
        label: "垂直角度 (V)",
        min: -30,
        max: 60,
        step: 1,
        suffix: "°"
      };
    case "zoom":
      return {
        label: "缩放 (Z)",
        min: 0,
        max: 10,
        step: .1,
        suffix: ""
      };
    default:
      return {
        label: e,
        min: 0,
        max: 100,
        step: 1,
        suffix: ""
      };
  }
}

function Hxo(e) {
  const t = e.trim();
  if (/^\d+$/.test(t)) return t;
  const n = t.match(/workflow\/(\d+)/) || t.match(/(\d{15,})/);
  return n ? n[1] : t;
}

function Wxo(e) {
  return Array.isArray(e) && e.length >= 2 && typeof e[0] == "string" && typeof e[1] == "number";
}

function s1r(e) {
  if (e == null) return "";
  if (typeof e == "string") return e;
  try {
    return JSON.stringify(e);
  } catch {
    return "";
  }
}

function l1r(e) {
  for (const t of Object.values(e)) {
    if (!t || typeof t != "object" || Array.isArray(t)) continue;
    const n = t;
    if (typeof n.class_type == "string" && n.inputs !== void 0 && typeof n.inputs == "object" && n.inputs !== null && !Array.isArray(n.inputs)) return !0;
  }
  return !1;
}

function tGe(e) {
  const t = e.nodes;
  if (!Array.isArray(t) || t.length === 0) return null;
  const n = {};
  for (const r of t) {
    if (!r || typeof r != "object" || Array.isArray(r)) continue;
    const a = r,
      i = a.id;
    if (i == null) continue;
    const o = String(i),
      s = String(a.type ?? a.class_type ?? "").trim();
    if (!s) continue;
    let l = {};
    a.inputs && typeof a.inputs == "object" && !Array.isArray(a.inputs) && (l = {
      ...a.inputs
    });
    const d = a.widgets_values;
    if (s === "LoadImage" && !("image" in l) && !("filename" in l) && Array.isArray(d)) {
      const h = d.find(p => typeof p == "string") ?? d[0];
      typeof h == "string" && (l.image = h);
    }
    if (s === "CLIPTextEncode" && !("text" in l) && Array.isArray(d)) {
      const h = d.find(p => typeof p == "string");
      h !== void 0 && (l.text = h);
    }
    s === "KSampler" && (!("seed" in l) && Array.isArray(d) && d.length >= 1 && typeof d[0] == "number" && (l.seed = d[0]), !("steps" in l) && Array.isArray(d) && d.length >= 2 && typeof d[1] == "number" && (l.steps = d[1]));
    const u = typeof a.title == "string" ? a.title : s;
    n[o] = {
      class_type: s,
      inputs: l,
      _meta: {
        title: u
      }
    };
  }
  return Object.keys(n).length > 0 ? n : null;
}

function Lyn(e) {
  const t = [],
    n = new Set();
  try {
    let r;
    if (typeof e == "string") {
      const i = e.trim();
      if (!i) return t;
      r = JSON.parse(i);
    } else r = e;
    if (typeof r != "object" || r === null) return t;
    let a = typeof r.prompt == "object" && r.prompt !== null && !Array.isArray(r.prompt) ? r.prompt : r;
    if (!l1r(a)) {
      let i = tGe(r);
      !i && a !== r && (i = tGe(a)), i && (a = i);
    }
    for (const [i, o] of Object.entries(a)) {
      if (!o || typeof o != "object" || Array.isArray(o)) continue;
      const s = o,
        l = s.class_type || "",
        d = m => {
          const f = `${m.nodeId}:${m.fieldName}`;
          n.has(f) || (n.add(f), t.push({
            ...m,
            sourceClassType: l
          }));
        },
        u = s.inputs || {},
        p = (s._meta || {}).title || l;
      if (l === "CLIPTextEncode" && "text" in u) d({
        nodeId: i,
        fieldName: "text",
        fieldValue: String(u.text ?? ""),
        fieldType: "STRING",
        description: `${p} - 提示词`
      });else if (l === "KSampler") "seed" in u && d({
        nodeId: i,
        fieldName: "seed",
        fieldValue: String(u.seed ?? ""),
        fieldType: "NUMBER",
        description: `${p} - 种子`
      }), "steps" in u && d({
        nodeId: i,
        fieldName: "steps",
        fieldValue: String(u.steps ?? ""),
        fieldType: "NUMBER",
        description: `${p} - 步数`
      }), "cfg" in u && d({
        nodeId: i,
        fieldName: "cfg",
        fieldValue: String(u.cfg ?? ""),
        fieldType: "NUMBER",
        description: `${p} - CFG`
      }), "denoise" in u && d({
        nodeId: i,
        fieldName: "denoise",
        fieldValue: String(u.denoise ?? ""),
        fieldType: "NUMBER",
        description: `${p} - 去噪强度`
      });else if ((l === "LoadImage" || l === "LoadImageFromUrl" || l === "LG_LoadImage" || l.endsWith("LG_LoadImage") || l.includes("LoadImage") || typeof p == "string" && p.includes("LoadImage")) && ("image" in u || "filename" in u)) {
        const m = "image" in u ? "image" : "filename",
          f = u[m];
        let y = "";
        if (typeof f == "string") y = f;else if (Array.isArray(f) && f.length > 0) y = String(f[0]);else if (typeof f == "object" && f !== null) {
          const b = f;
          y = String(b.__value__ ?? b.value ?? "");
        }
        d({
          nodeId: i,
          fieldName: m,
          fieldValue: y,
          fieldType: "IMAGE",
          description: `${p} - 参考图`
        });
      } else if ((l === "LoadAudio" || l === "LoadAudioStandalone" || l === "VHS_LoadAudio" || l === "VHS_LoadAudioUpload" || l === "LoadVHSAudio") && ("audio" in u || "audio_file" in u)) {
        const m = "audio" in u ? "audio" : "audio_file";
        d({
          nodeId: i,
          fieldName: m,
          fieldValue: "",
          fieldType: "AUDIO",
          description: `${p} - 音频`
        });
      } else if ((l === "LoadVideo" || l === "LoadVideoFromUrl") && ("video" in u || "video_path" in u)) {
        const m = "video" in u ? "video" : "video_path";
        d({
          nodeId: i,
          fieldName: m,
          fieldValue: "",
          fieldType: "VIDEO",
          description: `${p} - 视频`
        });
      } else if (l === "EmptyLatentImage") "width" in u && d({
        nodeId: i,
        fieldName: "width",
        fieldValue: String(u.width ?? ""),
        fieldType: "NUMBER",
        description: `${p} - 宽度`
      }), "height" in u && d({
        nodeId: i,
        fieldName: "height",
        fieldValue: String(u.height ?? ""),
        fieldType: "NUMBER",
        description: `${p} - 高度`
      }), "batch_size" in u && d({
        nodeId: i,
        fieldName: "batch_size",
        fieldValue: String(u.batch_size ?? ""),
        fieldType: "NUMBER",
        description: `${p} - 批次`
      });else for (const [m, f] of Object.entries(u)) {
        if (Wxo(f) || m === "clip" || m === "model" || m === "vae" || m === "latent_image" || m === "samples") continue;
        if ((m === "image" || m === "filename") && (typeof f == "string" || Array.isArray(f) && f.length > 0 || typeof f == "object" && f !== null && ("__value__" in f || "value" in f))) {
          let b = "";
          if (typeof f == "string") b = f;else if (Array.isArray(f)) b = String(f[0] ?? "");else if (typeof f == "object" && f !== null) {
            const v = f;
            b = String(v.__value__ ?? v.value ?? "");
          }
          d({
            nodeId: i,
            fieldName: m,
            fieldValue: b,
            fieldType: "IMAGE",
            description: `${p} - ${m === "image" ? "参考图" : m}`
          });
        } else typeof f == "string" && f.length > 0 && f.length < 500 ? d({
          nodeId: i,
          fieldName: m,
          fieldValue: f,
          fieldType: "STRING",
          description: `${p} - ${m}`
        }) : typeof f == "number" && d({
          nodeId: i,
          fieldName: m,
          fieldValue: String(f),
          fieldType: "NUMBER",
          description: `${p} - ${m}`
        });
      }
    }
  } catch {}
  return t;
}

function Oyn(e) {
  const t = (e.fieldName || "").toLowerCase();
  return t === "text" || t.includes("prompt");
}

function qxo(e) {
  const t = [],
    n = s1r(e).trim();
  if (!n) return t;
  try {
    const r = JSON.parse(n);
    let a = typeof r.prompt == "object" && r.prompt !== null && !Array.isArray(r.prompt) ? r.prompt : r;
    if (!l1r(a)) {
      let i = tGe(r);
      !i && a !== r && (i = tGe(a)), i && (a = i);
    }
    for (const [i, o] of Object.entries(a)) {
      if (!o || typeof o != "object" || Array.isArray(o)) continue;
      const d = (o.inputs || {}).crop;
      (d === "0" || typeof d == "string" && d.trim() === "0") && t.push({
        nodeId: i,
        fieldName: "crop",
        fieldValue: 0
      });
    }
  } catch {}
  return t;
}

function c1r(e) {
  if (!e) return !1;
  const t = e.split("?")[0].toLowerCase();
  return /\.(mp4|webm|mov|avi|mkv)(\?|$)/i.test(t);
}

function tH(e) {
  if (!e) return !1;
  const t = e.split("?")[0].toLowerCase();
  return /\.(mp3|wav|ogg|m4a|aac|flac)(\?|$)/i.test(t);
}

function idt(e) {
  return !!(!e || e.startsWith("data:audio/") || e.startsWith("data:video/") || tH(e) || c1r(e));
}

const Kxo = ({
    node: e,
    isDark: t,
    updateNode: n,
    connections: r = [],
    nodes: a = [],
    getConnectedInputImages: i,
    dataVersion: o = 0,
    setHistory: s,
    setNodes: l,
    setConnections: d,
    generateId: u,
    onSaveWorkflowToLibrary: h
  }) => {
    var ae, be, Ee, xe, he, ue, ge, _e, ke, ve;
    on();
    const [p, m] = g.useState(!1),
      [f, y] = g.useState(!1),
      [b, v] = g.useState("idle"),
      [_, w] = g.useState(null),
      [k, A] = g.useState(!1),
      [S, C] = g.useState(null),
      I = g.useRef(null),
      E = g.useRef(null),
      M = g.useRef({}),
      T = ((ae = e.settings) == null ? void 0 : ae.rhApiKey) || typeof localStorage < "u" && localStorage.getItem(Zi.RH_API_KEY) || "",
      P = ((be = e.settings) == null ? void 0 : be.workflowId) || "",
      R = ((Ee = e.settings) == null ? void 0 : Ee.rhUseOverseas) ?? !1,
      j = ((xe = e.settings) == null ? void 0 : xe.comfyEditableParams) || [],
      {
        multiangleBlocks: B,
        multiangleSkipKeys: F
      } = g.useMemo(() => {
        const {
          blocks: Te,
          skipKeys: Ne
        } = Gxo(j);
        return {
          multiangleBlocks: Te,
          multiangleSkipKeys: Ne
        };
      }, [j]),
      N = ((he = e.settings) == null ? void 0 : he.rhComfyParamValues) || {},
      G = s1r((ue = e.settings) == null ? void 0 : ue.comfyRawWorkflowJson),
      z = ((ge = e.settings) == null ? void 0 : ge.rhComfyUploadPreviews) || {},
      V = ((_e = e.settings) == null ? void 0 : _e.generatedImages) || [];
    g.useEffect(() => {
      const Te = G.trim();
      if (!Te || j.length > 0) return;
      const Ne = Lyn(Te);
      if (Ne.length === 0) return;
      const me = {};
      Ne.forEach(Ae => {
        me[`${Ae.nodeId}:${Ae.fieldName}`] = Ae.fieldValue;
      }), n(e.id, {
        settings: {
          ...e.settings,
          comfyEditableParams: Ne,
          rhComfyParamValues: {
            ...N,
            ...me
          },
          comfyRawWorkflowJson: Te
        }
      });
    }, [e.id, G, j.length, n, e.settings, N]);
    const O = (ke = e.settings) == null ? void 0 : ke.rhComfyLastRunDurationMs,
      L = Hxo(P),
      D = g.useMemo(() => {
        const Te = new Map(a.map(me => [me.id, me])),
          Ne = [];
        return r.filter(me => me.to === e.id && (!me.inputType || me.inputType === "default")).forEach(me => {
          var Fe, Me;
          const Ae = Te.get(me.from);
          if (Ae && (Ae.type === "text-node" || Ae.type === "custom-agent")) {
            const Re = ((Fe = Ae.settings) == null ? void 0 : Fe.text) || Ae.prompt || Ae.content || ((Me = Ae.settings) == null ? void 0 : Me.outputContent) || "";
            Re.trim() && Ne.push(Re.trim());
          }
        }), Ne.join(`

`);
      }, [e.id, r, a, o]),
      U = g.useMemo(() => {
        const Te = new Map(a.map(me => [me.id, me])),
          Ne = [];
        return r.filter(me => me.to === e.id && (!me.inputType || me.inputType === "default")).forEach(me => {
          var Me, Re, $e, rt, nt;
          const Ae = Te.get(me.from);
          if (!Ae || Ae.type === "camera-movement" || Ae.type === "professional-camera" || Ae.type === "gen-music") return;
          const Fe = ze => {
            !ze || typeof ze != "string" || idt(ze) || Ne.includes(ze) || Ne.push(ze);
          };
          if (Ae.type === "preview") {
            const ze = Ae.previewType || ((Me = Ae.settings) == null ? void 0 : Me.previewType);
            if (ze === "audio" || ze === "video") return;
            Ae.selectedPreviewImage ? Fe(Ae.selectedPreviewImage) : (Re = Ae.previewMjImages) != null && Re[0] ? Fe(Ae.previewMjImages[0]) : Ae.content && Fe(Ae.content);
          } else if (Ae.type === "canvas-node") Ae.content ? Ne.push(Ae.content) : ($e = Ae.settings) != null && $e.canvasData && Ne.push(`canvas-node:${Ae.id}`);else if (Ae.type === "rh-app") {
            const ze = (rt = Ae.settings) == null ? void 0 : rt.generatedImages;
            ze != null && ze.length ? ze.forEach(Le => Fe(Le.fullUrl)) : Ae.content && Fe(Ae.content);
          } else if (Ae.type === "input-image") {
            const ze = (nt = Ae.settings) == null ? void 0 : nt.mediaType;
            if (ze === "audio" || ze === "video") return;
            Ae.content && Fe(Ae.content);
          } else Ae.type === "rh-comfy" || Ae.type === "gen-image" || Ae.type === "gen-video" || Ae.type === "video-input" ? Ae.content && !idt(Ae.content) && Fe(Ae.content) : Ae.content && Fe(Ae.content);
        }), Ne;
      }, [e.id, r, a, o]),
      H = g.useMemo(() => {
        const Te = new Map(a.map(me => [me.id, me])),
          Ne = [];
        return r.filter(me => me.to === e.id).forEach(me => {
          var Me, Re;
          const Ae = Te.get(me.from);
          if (!Ae) return;
          let Fe = "";
          if (Ae.type === "gen-music") Fe = ((Me = Ae.settings) == null ? void 0 : Me.audioUrl) || "";else if (Ae.type === "rh-comfy" || Ae.type === "rh-app") {
            const $e = Ae.content || "";
            $e && tH($e) && (Fe = $e);
          } else if (Ae.type === "preview") {
            const $e = Ae.previewType || ((Re = Ae.settings) == null ? void 0 : Re.previewType),
              rt = Ae.content || "";
            ($e === "audio" && rt || rt && tH(rt)) && (Fe = rt);
          } else if (Ae.type === "input-image") {
            const $e = Ae.content || "";
            $e && tH($e) && (Fe = $e);
          }
          if (!Fe && Ae.content && typeof Ae.content == "string") {
            const $e = Ae.content;
            (tH($e) || $e.startsWith("data:audio") || $e.startsWith("blob:") && $e.length > 10) && (Fe = $e);
          }
          Fe && !Ne.includes(Fe) && Ne.push(Fe);
        }), Ne;
      }, [e.id, r, a, o]),
      Y = g.useMemo(() => {
        for (const Te of U) if (Te && typeof Te == "string" && !Te.startsWith("canvas-node:")) return Te;
        for (const Te of j) {
          if (Te.fieldType !== "IMAGE") continue;
          const Ne = `${Te.nodeId}:${Te.fieldName}`,
            me = z[Ne];
          if (me && typeof me == "string" && !me.startsWith("canvas-node:")) return me;
        }
      }, [U, j, z]),
      K = g.useCallback(async () => {
        var me;
        if (!T.trim()) {
          w("请输入 RH API Key");
          return;
        }
        if (!L) {
          w("请输入 Workflow ID（或粘贴 RH 工作流链接）");
          return;
        }
        m(!0), w(null);
        const Te = R || S1e(L),
          Ne = Ae => T_i({
            apiKey: T.trim(),
            workflowId: L,
            useOverseas: Ae
          });
        try {
          let Ae = Te,
            Fe;
          try {
            Fe = await Ne(Te);
          } catch (Ke) {
            if (!Te) Fe = await Ne(!0), Ae = !0;else throw Ke;
          }
          if (Fe.code !== 0 && !Te) {
            const Ke = await Ne(!0);
            Ke.code === 0 && (Fe = Ke, Ae = !0);
          }
          if (Fe.code !== 0) throw new Error(Fe.msg || "获取工作流失败");
          const Me = (me = Fe.data) == null ? void 0 : me.prompt;
          if (Me == null || typeof Me == "string" && !String(Me).trim() || typeof Me == "object" && !Array.isArray(Me) && Object.keys(Me).length === 0) throw new Error("返回数据为空");
          const $e = Me,
            rt = typeof Me == "string" ? Me : JSON.stringify(Me),
            nt = Lyn($e),
            ze = {};
          nt.forEach(Ke => {
            const Xe = `${Ke.nodeId}:${Ke.fieldName}`;
            ze[Xe] = Ke.fieldValue;
          });
          const Le = {
            ...N,
            ...ze
          };
          if (n(e.id, {
            settings: {
              ...e.settings,
              rhApiKey: T.trim(),
              workflowId: L,
              comfyEditableParams: nt,
              rhComfyParamValues: Le,
              comfyRawWorkflowJson: rt,
              rhUseOverseas: Ae
            }
          }), typeof localStorage < "u") try {
            localStorage.setItem(Zi.RH_API_KEY, T.trim());
          } catch {}
        } catch (Ae) {
          const Fe = Ae instanceof Error ? Ae.message : "获取工作流失败",
            Me = S1e(L) ? "（MiniMax H3 工作流需 RunningHub 国际站 runninghub.ai）" : "";
          w(`${Fe}${Me}`);
        } finally {
          m(!1);
        }
      }, [T, L, R, e.id, e.settings, n, N]),
      W = g.useRef("");
    g.useEffect(() => {
      if (!L || j.length > 0 || G.trim() || !T.trim()) return;
      const Te = `${e.id}:${L}`;
      W.current !== Te && (W.current = Te, K());
    }, [T, L, j.length, G, e.id, K]);
    const Q = g.useCallback((Te, Ne) => {
        n(e.id, {
          settings: {
            ...e.settings,
            rhComfyParamValues: {
              ...N,
              [Te]: Ne
            }
          }
        });
      }, [e.id, e.settings, n, N]),
      q = g.useCallback(async (Te, Ne) => {
        const me = `${Te.nodeId}:${Te.fieldName}`,
          Ae = z[me];
        if (Ae != null && Ae.startsWith("blob:")) try {
          URL.revokeObjectURL(Ae);
        } catch {}
        const Fe = URL.createObjectURL(Ne);
        n(e.id, {
          settings: {
            ...e.settings,
            rhComfyUploadPreviews: {
              ...z,
              [me]: Fe
            }
          }
        });
        try {
          w(null);
          const Me = await vdr({
            apiKey: T.trim(),
            file: Ne,
            useOverseas: R
          });
          n(e.id, {
            settings: {
              ...e.settings,
              rhComfyParamValues: {
                ...N,
                [me]: Me.fileName
              },
              rhComfyUploadPreviews: {
                ...z,
                [me]: Fe
              }
            }
          });
        } catch (Me) {
          w(Me instanceof Error ? Me.message : "上传失败"), URL.revokeObjectURL(Fe);
          const {
            [me]: Re,
            ...$e
          } = z;
          n(e.id, {
            settings: {
              ...e.settings,
              rhComfyUploadPreviews: $e
            }
          });
        }
      }, [T, R, e.id, e.settings, n, N, z]),
      ne = g.useCallback((Te, Ne) => {
        var Ae;
        const me = (Ae = Ne.target.files) == null ? void 0 : Ae[0];
        me && (q(Te, me), Ne.target.value = "");
      }, [q]),
      de = g.useCallback(Te => {
        n(e.id, {
          prompt: Te.target.value
        });
      }, [e.id, n]),
      le = g.useCallback(async () => {
        const Te = [];
        let Ne = 0;
        for (const Ae of j) {
          const Fe = `${Ae.nodeId}:${Ae.fieldName}`;
          let Me = N[Fe] ?? Ae.fieldValue ?? "";
          if (Ae.fieldType === "STRING" && Oyn(Ae)) Me = (e.prompt || D || String(Me)).trim() || Me;else if (Ae.fieldType === "IMAGE" && U.length > 0) {
            const Re = U[Ne];
            if (Re) try {
              if (Re.startsWith("canvas-node:")) throw w("画板节点需先导出图片"), new Error("画板节点需先导出");
              const $e = await Ns(Re);
              Me = await bdr({
                apiKey: T.trim(),
                file: $e,
                useOverseas: R
              }), Ne++;
            } catch ($e) {
              throw w($e instanceof Error ? $e.message : "参考图上传失败"), $e;
            }
          } else if (Ae.fieldType === "AUDIO" || Ae.fieldType === "VIDEO") {
            const Re = String(Me ?? "");
            Me = Re.startsWith("api/") || Re.startsWith("openapi/") ? Re : Me;
          } else if (Ae.fieldType === "NUMBER") {
            const Re = String(Me ?? "").replace(",", "."),
              $e = ["seed", "steps", "width", "height", "batch_size", "horizontal_angle", "vertical_angle"].includes(Ae.fieldName),
              rt = $e ? parseInt(Re, 10) : Number(Re);
            Me = isNaN(rt) ? $e ? 0 : Me : rt;
          } else Ae.fieldName === "crop" && Me === "0" && (Me = 0);
          Te.push({
            nodeId: Ae.nodeId,
            fieldName: Ae.fieldName,
            fieldValue: Me
          });
        }
        const me = qxo(G);
        for (const Ae of me) Te.some(Fe => Fe.nodeId === Ae.nodeId && Fe.fieldName === Ae.fieldName) || Te.push({
          nodeId: Ae.nodeId,
          fieldName: Ae.fieldName,
          fieldValue: Ae.fieldValue
        });
        return Te;
      }, [j, N, e.prompt, D, U, T, R, G]),
      J = g.useCallback(async () => {
        var me;
        if (!T.trim() || !L) {
          w("请先获取工作流");
          return;
        }
        y(!0), w(null), v("queued"), n(e.id, {
          isGenerating: !0
        }), I.current = new AbortController();
        let Te = null,
          Ne = null;
        try {
          const Ae = j.length > 0 ? await le() : void 0;
          if (Te = (await M_i({
            apiKey: T.trim(),
            workflowId: L,
            nodeInfoList: Ae,
            useOverseas: R
          })).taskId, E.current = Te, n(e.id, {
            settings: {
              ...e.settings,
              rhComfyCurrentTaskId: Te
            }
          }), s && Te) {
            Ne = Date.now();
            const Ve = {
              id: Te,
              url: "",
              type: "image",
              prompt: e.prompt || "ComfyUI 工作流",
              time: new Date().toLocaleTimeString(),
              status: "generating",
              progress: 0,
              modelName: "RH ComfyUI",
              sourceNodeId: e.id,
              startTime: Ne,
              rhUseOverseas: R
            };
            s(it => [Ve, ...it]);
          }
          const Me = await kdr({
            apiKey: T.trim(),
            taskId: Te,
            useOverseas: R,
            onProgress: Ve => v(Ve === "queued" ? "queued" : "running"),
            signal: (me = I.current) == null ? void 0 : me.signal
          });
          if (!Me.success) {
            w(Me.error || "任务失败"), s == null || s(Ve => Ve.map(it => it.id === Te ? {
              ...it,
              status: "failed",
              progress: 0,
              errorMsg: Me.error
            } : it)), n(e.id, {
              isGenerating: !1
            }), v("idle");
            return;
          }
          const Re = (Me.fileUrls || []).filter(Boolean);
          if (Re.length === 0) {
            w(jUe), s == null || s(Ve => Ve.map(it => it.id === Te ? {
              ...it,
              status: "failed",
              progress: 0,
              errorMsg: jUe
            } : it)), n(e.id, {
              isGenerating: !1
            }), v("idle");
            return;
          }
          const $e = Date.now(),
            rt = Re[0] || "",
            nt = c1r(rt),
            ze = tH(rt),
            Le = nt ? "video" : ze ? "audio" : "image",
            Ke = Re.map((Ve, it) => ({
              id: `${Te}_${it}`,
              thumbUrl: Ve,
              fullUrl: Ve,
              createdAt: $e
            })),
            Xe = Ne != null ? $e - Ne : void 0;
          if (n(e.id, {
            content: rt,
            previewType: Le === "audio" ? "image" : Le,
            settings: {
              ...e.settings,
              generatedImages: [...V, ...Ke],
              rhComfyLastRunDurationMs: Xe
            }
          }), (async () => {
            try {
              const {
                assetStore: Ve
              } = await Ie(async () => {
                const {
                  assetStore: it
                } = await Promise.resolve().then(() => Ri);
                return {
                  assetStore: it
                };
              }, void 0, import.meta.url);
              await Ve.init();
              for (let it = 0; it < Re.length; it++) {
                const It = Re[it],
                  Ft = it === 0 ? Te : `${Te}_${it}`;
                Ft && (It.startsWith("http://") || It.startsWith("https://")) && (await Ve.saveAsset(Ft, It), console.log(`[RhComfy] ✅ 已保存资源到 assetStore: ${Ft}`));
              }
            } catch (Ve) {
              console.error("[RhComfy] ❌ 保存资源到 assetStore 失败:", Ve);
            }
          })(), s && rt && Te) {
            const Ve = Te;
            s(it => it.map(It => It.id === Ve ? {
              ...It,
              type: Le,
              url: rt,
              status: "completed",
              progress: 100,
              mjImages: Re.length > 1 ? Re : void 0,
              durationMs: Xe,
              _assetId: Ve,
              _mjAssetIds: Re.length > 1 ? Re.map((Ft, We) => We === 0 ? Ve : `${Ve}_${We}`) : void 0
            } : It));
          }
          let Ye = r.filter(Ve => Ve.from === e.id && (!Ve.inputType || Ve.inputType === "default")).map(Ve => Ve.to);
          const Ce = new Map(a.map(Ve => [Ve.id, Ve]));
          if (!Ye.some(Ve => {
            var it;
            return ((it = Ce.get(Ve)) == null ? void 0 : it.type) === "preview";
          }) && l && d && u) {
            const Ve = u(),
              it = Ki(Ve, "preview", e.x + e.width + 80, e.y, void 0, void 0, a);
            it.width = 400, it.height = 400, l(It => [...It, it]), d(It => [...It, {
              id: u(),
              from: e.id,
              to: Ve,
              fromPort: "output",
              toPort: "input"
            }]), Ye = [Ve];
          }
          Ye.forEach(Ve => {
            n(Ve, {
              content: rt,
              previewType: Le === "audio" ? "image" : Le,
              previewMjImages: Re.length > 1 ? Re : void 0,
              selectedPreviewImage: rt
            });
          }), v("done");
        } catch (Ae) {
          w(Ae instanceof Error ? Ae.message : "运行失败"), s == null || s(Fe => Fe.map(Me => Me.id === Te ? {
            ...Me,
            status: "failed",
            progress: 0,
            errorMsg: Ae.message
          } : Me));
        } finally {
          y(!1), v("idle"), E.current = null, n(e.id, {
            isGenerating: !1,
            settings: {
              ...e.settings,
              rhComfyCurrentTaskId: void 0
            }
          }), I.current = null;
        }
      }, [T, L, R, e.id, e.settings, e.prompt, e.width, e.x, r, a, j, le, V, n, s, l, d, u]),
      pe = g.useCallback(async () => {
        var Ne;
        const Te = E.current;
        if (!(!Te || !T.trim())) {
          try {
            await P_i({
              apiKey: T.trim(),
              taskId: Te,
              useOverseas: R
            });
          } catch {}
          (Ne = I.current) == null || Ne.abort();
        }
      }, [T, R]),
      ce = g.useCallback(Te => {
        const Ne = Te.target.value;
        n(e.id, {
          settings: {
            ...e.settings,
            rhApiKey: Ne
          }
        });
        try {
          typeof localStorage < "u" && localStorage.setItem(Zi.RH_API_KEY, Ne);
        } catch {}
        w(null);
      }, [e.id, e.settings, n]),
      we = g.useCallback(Te => {
        n(e.id, {
          settings: {
            ...e.settings,
            workflowId: Te.target.value
          }
        }), w(null);
      }, [e.id, e.settings, n]),
      X = g.useCallback(Te => {
        n(e.id, {
          settings: {
            ...e.settings,
            rhUseOverseas: Te.target.checked
          }
        });
      }, [e.id, e.settings, n]),
      Z = t ? "bg-transparent" : "bg-white",
      re = t ? "border-white/30" : "border-zinc-200",
      fe = t ? "bg-transparent border-white/30 text-white placeholder-white/50" : "bg-zinc-50 border-zinc-300 text-zinc-900 placeholder-zinc-400",
      ye = t ? "text-white" : "text-zinc-600",
      ie = e.prompt || D || "";
    return c.jsx("div", {
      className: `flex flex-col h-full ${Z} ${re} border rounded-2xl overflow-hidden`,
      children: c.jsxs("div", {
        className: "flex-1 overflow-y-auto p-3 space-y-3 rh-scroll-minimal",
        children: [c.jsxs("div", {
          children: [c.jsxs("label", {
            className: `flex items-center gap-1.5 text-xs font-medium mb-1.5 ${ye}`,
            children: [c.jsx(oTn, {
              size: 14
            }), "RH API Key"]
          }), c.jsx("input", {
            type: "password",
            value: T,
            onChange: ce,
            placeholder: x("在 RH 控制台获取"),
            className: `w-full px-2.5 py-1.5 text-sm rounded-md border ${fe} focus:outline-none focus:ring-1 focus:ring-blue-500`
          })]
        }), c.jsxs("div", {
          children: [c.jsxs("label", {
            className: `flex items-center gap-1.5 text-xs font-medium mb-1.5 ${ye}`,
            children: [c.jsx(aTn, {
              size: 14
            }), "Workflow ID"]
          }), c.jsx("input", {
            type: "text",
            value: P,
            onChange: we,
            placeholder: x("工作流链接末尾数字或完整链接"),
            className: `w-full px-2.5 py-1.5 text-sm rounded-md border ${fe} focus:outline-none focus:ring-1 focus:ring-blue-500`
          })]
        }), c.jsxs("label", {
          className: `flex items-center gap-2 text-xs cursor-pointer ${ye}`,
          children: [c.jsx("input", {
            type: "checkbox",
            checked: R,
            onChange: X,
            className: `rounded ${t ? "border-white/30" : "border-zinc-500"}`
          }), x("使用海外地址 (runninghub.ai)")]
        }), S1e(L) && c.jsx("p", {
          className: `text-[10px] leading-snug ${t ? "text-white/45" : "text-zinc-500"}`,
          children: x("MiniMax H3 多参视频工作流建议走国际站；国内站多数工作流已不可调用。")
        }), c.jsx("button", {
          onClick: K,
          disabled: p,
          className: `w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors border ${p ? t ? "bg-transparent border-white/20 text-white/50 cursor-not-allowed" : "bg-zinc-500/50 text-zinc-400 cursor-not-allowed" : t ? "bg-transparent border-white/30 hover:bg-white/5 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"}`,
          children: p ? c.jsxs(c.Fragment, {
            children: [c.jsx(Ua, {
              size: 16,
              className: "animate-spin"
            }), x("获取工作流")]
          }) : c.jsxs(c.Fragment, {
            children: [c.jsx(mZ, {
              size: 16
            }), x("获取工作流")]
          })
        }), j.length > 0 && L && h && c.jsxs("button", {
          onClick: () => {
            var Fe;
            const Te = window.prompt(x("请输入工作流名称（用于在应用库中识别）"), `工作流 ${L}`);
            if (Te === null) return;
            const Ne = (Te || `工作流 ${L}`).trim(),
              me = {};
            if (z) for (const [Me, Re] of Object.entries(z)) typeof Re == "string" && Re.startsWith("http") && (me[Me] = Re);
            const Ae = [];
            (Fe = V == null ? void 0 : V[0]) != null && Fe.fullUrl && Ae.push({
              url: V[0].fullUrl
            }), h({
              workflowId: L,
              customName: Ne,
              comfyEditableParams: j,
              rhComfyParamValues: N,
              comfyRawWorkflowJson: G,
              rhUseOverseas: R,
              rhComfyUploadPreviews: Object.keys(me).length > 0 ? me : void 0,
              covers: Ae.length > 0 ? Ae : void 0
            });
          },
          className: `w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors border ${t ? "bg-transparent border-white/30 hover:bg-white/5 text-white" : "bg-zinc-200 hover:bg-zinc-300 text-zinc-700"}`,
          title: x("保存到 RH AI 应用库，下次可快速填充到 Comfy 节点"),
          children: [c.jsx(Wp, {
            size: 16
          }), x("保存到应用库")]
        }), _ && c.jsxs("div", {
          className: `flex items-start gap-2 p-2 rounded-md border ${t ? "bg-transparent border-red-500/30 text-red-400" : "bg-red-50 text-red-600"}`,
          children: [c.jsx(c3, {
            size: 16,
            className: "flex-shrink-0 mt-0.5"
          }), c.jsx("span", {
            className: "text-xs",
            children: _
          })]
        }), j.length > 0 && c.jsxs("div", {
          className: `rounded-md p-3 border ${re} ${t ? "bg-transparent" : "bg-zinc-50"}`,
          children: [c.jsxs("div", {
            className: "flex items-center gap-2 mb-2",
            children: [c.jsx(sEt, {
              size: 16,
              className: "text-green-500"
            }), c.jsx("span", {
              className: "font-medium text-sm",
              children: x("可编辑参数")
            })]
          }), c.jsxs("a", {
            href: `https://www.runninghub.cn/workflow/${L}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex items-center gap-1 text-xs text-blue-500 hover:underline mb-2",
            children: [c.jsx(S5, {
              size: 12
            }), x("在 RH 平台打开")]
          })]
        }), B.length > 0 && c.jsx("div", {
          className: "space-y-3",
          children: B.map(Te => {
            const Ne = (Ke, Xe) => {
                if (!Ke) return Xe;
                const De = `${Ke.nodeId}:${Ke.fieldName}`,
                  Ye = N[De] ?? Ke.fieldValue ?? "",
                  Ce = parseFloat(String(Ye).replace(",", "."));
                return Number.isFinite(Ce) ? Ce : Xe;
              },
              me = Te.ordered.find(Ke => Ke.fieldName === "horizontal_angle"),
              Ae = Te.ordered.find(Ke => Ke.fieldName === "vertical_angle"),
              Fe = Te.ordered.find(Ke => Ke.fieldName === "zoom"),
              Me = Ne(me, 0),
              Re = Ne(Ae, 0),
              $e = Ne(Fe, 5),
              nt = `<sks> ${Fao(Me, Re, $e).trim()}`,
              ze = Ke => Ke === "horizontal_angle" ? "#ec4899" : Ke === "vertical_angle" ? "#14b8a6" : "#eab308",
              Le = `w-full text-[11px] rounded-md border px-1.5 py-1 ${t ? "bg-zinc-950/80 border-zinc-600 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"}`;
            return c.jsxs("div", {
              className: `rounded-2xl border p-3 ${re} ${t ? "bg-zinc-950/50 ring-1 ring-fuchsia-950/40" : "bg-gradient-to-br from-fuchsia-50/70 to-teal-50/40"}`,
              children: [c.jsxs("div", {
                className: "flex items-center gap-2 mb-2",
                children: [c.jsx(mNr, {
                  size: 16,
                  className: t ? "text-fuchsia-300" : "text-fuchsia-600"
                }), c.jsx("span", {
                  className: `text-xs font-semibold truncate ${ye}`,
                  children: Te.title
                })]
              }), c.jsx("div", {
                className: `mb-2 rounded-lg px-2.5 py-2 font-mono text-[11px] leading-relaxed border ${t ? "bg-fuchsia-950/40 border-fuchsia-800/50 text-fuchsia-100/95" : "bg-fuchsia-50 border-fuchsia-200/90 text-fuchsia-950"}`,
                title: x("与 Qwen 多角度节点生成的英文标签一致；<sks> 为常见触发前缀（与 Comfy 侧一致时可保留）"),
                children: nt
              }), c.jsxs("div", {
                className: "mb-2 grid grid-cols-1 sm:grid-cols-3 gap-2",
                children: [c.jsxs("div", {
                  children: [c.jsxs("label", {
                    className: `text-[10px] font-medium block mb-0.5 ${ye}`,
                    children: [c.jsx("span", {
                      className: "text-pink-500 font-bold mr-1",
                      children: "H"
                    }), x("水平")]
                  }), c.jsx("select", {
                    className: Le,
                    value: sUt(Me),
                    onChange: Ke => {
                      const Xe = Rmn.find(De => De.label === Ke.target.value);
                      Xe && me && Q(`${me.nodeId}:horizontal_angle`, String(Xe.angle));
                    },
                    onMouseDown: Ke => Ke.stopPropagation(),
                    children: Rmn.map(Ke => c.jsx("option", {
                      value: Ke.label,
                      children: Ke.label
                    }, Ke.label))
                  })]
                }), c.jsxs("div", {
                  children: [c.jsxs("label", {
                    className: `text-[10px] font-medium block mb-0.5 ${ye}`,
                    children: [c.jsx("span", {
                      className: "text-teal-500 font-bold mr-1",
                      children: "V"
                    }), x("垂直")]
                  }), c.jsx("select", {
                    className: Le,
                    value: jgr(Re),
                    onChange: Ke => {
                      const Xe = Nmn.find(De => De.label === Ke.target.value);
                      Xe && Ae && Q(`${Ae.nodeId}:vertical_angle`, String(Xe.angle));
                    },
                    onMouseDown: Ke => Ke.stopPropagation(),
                    children: Nmn.map(Ke => c.jsx("option", {
                      value: Ke.label,
                      children: Ke.label
                    }, Ke.label))
                  })]
                }), c.jsxs("div", {
                  children: [c.jsxs("label", {
                    className: `text-[10px] font-medium block mb-0.5 ${ye}`,
                    children: [c.jsx("span", {
                      className: "text-yellow-500 font-bold mr-1",
                      children: "Z"
                    }), x("景别")]
                  }), c.jsx("select", {
                    className: Le,
                    value: Dgr($e),
                    onChange: Ke => {
                      const Xe = jmn.find(De => De.label === Ke.target.value);
                      Xe && Fe && Q(`${Fe.nodeId}:zoom`, String(Xe.zoom));
                    },
                    onMouseDown: Ke => Ke.stopPropagation(),
                    children: jmn.map(Ke => c.jsx("option", {
                      value: Ke.label,
                      children: Ke.label
                    }, Ke.label))
                  })]
                })]
              }), c.jsxs("div", {
                className: "flex flex-col lg:flex-row gap-3",
                children: [c.jsxs("div", {
                  className: "flex flex-col flex-1 min-w-0 lg:min-w-[280px]",
                  children: [c.jsx("span", {
                    className: "text-[10px] mb-1 text-zinc-500",
                    children: x("机位示意（透视网格 · 对齐 ComfyUI-qwenmultiangle）")
                  }), c.jsx(zxo, {
                    horizontalDeg: Me,
                    verticalDeg: Re,
                    zoom: $e,
                    sourceImage: Y,
                    isDark: t,
                    onHorizontalChange: Ke => {
                      me && Q(`${me.nodeId}:horizontal_angle`, String(Ke));
                    },
                    onVerticalChange: Ke => {
                      Ae && Q(`${Ae.nodeId}:vertical_angle`, String(Ke));
                    },
                    onZoomChange: Ke => {
                      Fe && Q(`${Fe.nodeId}:zoom`, String(Ke));
                    }
                  }), !Y && c.jsx("span", {
                    className: "mt-1 text-[9px] leading-tight text-zinc-500",
                    children: x("连接或上传参考图后，中间立幅为预览贴图")
                  }), c.jsxs("div", {
                    className: `mt-2 flex flex-wrap items-center justify-between gap-2 rounded-lg px-2 py-1.5 border ${t ? "bg-black/40 border-zinc-700/80" : "bg-[#1f1f1f]/[0.04] border-zinc-300/90"}`,
                    children: [c.jsxs("div", {
                      className: "flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-bold tracking-wide",
                      children: [c.jsxs("span", {
                        style: {
                          color: "#ec4899"
                        },
                        children: ["HORIZONTAL ", c.jsxs("span", {
                          className: "tabular-nums font-semibold",
                          children: [Math.round(Me), "°"]
                        })]
                      }), c.jsxs("span", {
                        style: {
                          color: "#14b8a6"
                        },
                        children: ["VERTICAL ", c.jsxs("span", {
                          className: "tabular-nums font-semibold",
                          children: [Math.round(Re), "°"]
                        })]
                      }), c.jsxs("span", {
                        style: {
                          color: "#eab308"
                        },
                        children: ["ZOOM ", c.jsx("span", {
                          className: "tabular-nums font-semibold",
                          children: $e.toFixed(1)
                        })]
                      })]
                    }), c.jsx("button", {
                      type: "button",
                      title: "Reset H0° V0° Z5",
                      onClick: Ke => {
                        Ke.stopPropagation(), me && Q(`${me.nodeId}:horizontal_angle`, "0"), Ae && Q(`${Ae.nodeId}:vertical_angle`, "0"), Fe && Q(`${Fe.nodeId}:zoom`, "5");
                      },
                      onMouseDown: Ke => Ke.stopPropagation(),
                      className: `shrink-0 p-1 rounded-md border ${t ? "border-zinc-600 hover:bg-white/10" : "border-zinc-300 hover:bg-white"}`,
                      children: c.jsx(vd, {
                        size: 14,
                        className: t ? "text-zinc-300" : "text-zinc-600"
                      })
                    })]
                  })]
                }), c.jsx("div", {
                  className: "flex-1 space-y-2.5 min-w-0",
                  children: Te.ordered.map(Ke => {
                    const Xe = `${Ke.nodeId}:${Ke.fieldName}`,
                      De = N[Xe] ?? Ke.fieldValue ?? "",
                      Ye = Vxo(Ke.fieldName),
                      Ce = parseFloat(String(De).replace(",", ".")),
                      He = Number.isFinite(Ce) ? Math.min(Ye.max, Math.max(Ye.min, Ce)) : Ye.min,
                      Ve = ze(Ke.fieldName);
                    return c.jsxs("div", {
                      children: [c.jsxs("div", {
                        className: "flex items-center justify-between gap-2 mb-1",
                        children: [c.jsx("label", {
                          className: `text-xs font-medium ${ye}`,
                          children: Ye.label
                        }), c.jsxs("span", {
                          className: "text-xs tabular-nums",
                          style: {
                            color: Ve
                          },
                          children: [Ye.step < 1 ? He.toFixed(1) : String(Math.round(He)), Ye.suffix]
                        })]
                      }), c.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [c.jsx("input", {
                          type: "range",
                          min: Ye.min,
                          max: Ye.max,
                          step: Ye.step,
                          value: He,
                          onChange: it => Q(Xe, it.target.value),
                          onMouseDown: it => it.stopPropagation(),
                          className: "flex-1 min-w-0 h-2",
                          style: {
                            accentColor: Ve
                          }
                        }), c.jsx("input", {
                          type: "number",
                          min: Ye.min,
                          max: Ye.max,
                          step: Ye.step,
                          value: He,
                          onChange: it => Q(Xe, it.target.value),
                          onMouseDown: it => it.stopPropagation(),
                          className: `w-[4.25rem] shrink-0 px-1 py-1 text-xs rounded-md border text-center ${fe}`
                        })]
                      })]
                    }, Xe);
                  })
                })]
              }), c.jsxs("p", {
                className: `mt-2 text-[10px] leading-relaxed ${t ? "text-zinc-500" : "text-zinc-600"}`,
                children: [x("数值范围与文案划分与"), " ", c.jsx("a", {
                  href: "https://github.com/jtydhr88/ComfyUI-qwenmultiangle",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "text-blue-500 hover:underline",
                  children: "ComfyUI-qwenmultiangle"
                }), " ", x("一致；滑块 / 下拉 / 数字框均写入同一组参数，运行时会提交至 RH。")]
              })]
            }, Te.nodeId);
          })
        }), G && c.jsxs("div", {
          className: `rounded-md border ${re} overflow-hidden`,
          children: [c.jsxs("button", {
            type: "button",
            onClick: () => A(Te => !Te),
            className: `w-full flex items-center gap-2 px-3 py-2 text-left text-xs font-medium border-t ${t ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"}`,
            children: [k ? c.jsx(Mi, {
              size: 14
            }) : c.jsx(ss, {
              size: 14
            }), x("查看 ComfyUI 工作流结构")]
          }), k && c.jsx("pre", {
            className: `p-3 text-[10px] overflow-auto max-h-[300px] rh-scroll-minimal ${t ? "bg-[#1f1f1f] text-zinc-400" : "bg-zinc-50 text-zinc-700"}`,
            children: (() => {
              try {
                const Te = JSON.parse(G);
                return JSON.stringify(Te, null, 2);
              } catch {
                return G;
              }
            })()
          })]
        }), c.jsx("div", {
          className: "grid grid-cols-2 gap-x-3 gap-y-2",
          children: j.map(Te => {
            const Ne = `${Te.nodeId}:${Te.fieldName}`,
              me = N[Ne] ?? Te.fieldValue ?? "";
            if (F.has(Ne)) return null;
            if (Te.fieldType === "STRING" && Oyn(Te)) return c.jsxs("div", {
              className: "flex flex-col flex-1 min-h-[80px] col-span-2",
              children: [c.jsx("label", {
                className: `block text-xs mb-1.5 ${ye}`,
                children: Te.description
              }), c.jsx("textarea", {
                value: ie || me,
                onChange: Ae => {
                  de(Ae), Q(Ne, Ae.target.value);
                },
                placeholder: x("可连接文字节点"),
                rows: 4,
                className: `w-full px-3 py-2 text-sm rounded-md border ${fe} focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y min-h-[80px]`
              }), D && c.jsx("span", {
                className: "text-[10px] text-zinc-500 mt-0.5 block",
                children: x("已连接文字节点")
              })]
            }, Ne);
            if (Te.fieldType === "NUMBER") return c.jsxs("div", {
              children: [c.jsx("label", {
                className: `block text-xs mb-1.5 ${ye}`,
                children: Te.description
              }), c.jsx("input", {
                type: "number",
                value: me,
                onChange: Ae => Q(Ne, Ae.target.value),
                className: `w-full px-3 py-2 text-sm rounded-md border ${fe} focus:outline-none focus:ring-1 focus:ring-blue-500`
              })]
            }, Ne);
            if (Te.fieldType === "IMAGE") {
              const Ae = U.length > 0,
                Fe = z[Ne] || (Ae ? U[0] : ""),
                Me = N[Ne] ?? "",
                Re = !!Fe && !Fe.startsWith("canvas-node:");
              return c.jsxs("div", {
                className: "col-span-2",
                children: [c.jsx("label", {
                  className: `block text-xs mb-1.5 ${ye}`,
                  children: Te.description
                }), c.jsxs("div", {
                  className: "flex gap-2 items-center flex-wrap",
                  children: [Fe && c.jsx("div", {
                    className: `w-16 h-16 rounded-md overflow-hidden border flex-shrink-0 ${t ? "border-white/30 bg-transparent" : "border-zinc-400/50 bg-zinc-800/50"}`,
                    children: c.jsx("img", {
                      src: Fe,
                      alt: x("预览"),
                      className: "w-full h-full object-cover",
                      onError: $e => {
                        $e.target.style.display = "none";
                      }
                    })
                  }), c.jsxs("div", {
                    className: "flex flex-col gap-1",
                    children: [c.jsxs("div", {
                      className: "flex items-center gap-1.5",
                      children: [c.jsxs("label", {
                        className: `flex items-center gap-1.5 px-2 py-1.5 text-xs rounded-md border ${re} cursor-pointer ${t ? "hover:bg-white/5" : "hover:bg-zinc-100"}`,
                        onMouseDown: $e => $e.stopPropagation(),
                        children: [c.jsx(ml, {
                          size: 14
                        }), x("上传图片"), c.jsx("input", {
                          type: "file",
                          accept: "image/*",
                          className: "hidden",
                          onChange: $e => ne(Te, $e)
                        })]
                      }), Re && c.jsxs("button", {
                        type: "button",
                        onClick: () => C(Ne),
                        onMouseDown: $e => $e.stopPropagation(),
                        className: `flex items-center gap-1.5 px-2 py-1.5 text-xs rounded-md border ${re} ${t ? "hover:bg-white/5" : "hover:bg-zinc-100"}`,
                        title: x("在图片上绘制蒙版（ComfyUI 格式：白=修改区域）"),
                        children: [c.jsx(_5e, {
                          size: 14
                        }), x("编辑蒙版")]
                      })]
                    }), c.jsx("span", {
                      className: "text-xs text-zinc-500",
                      children: Ae ? x("已连接 {0} 张图", U.length) : Me.startsWith("api/") || Me.startsWith("openapi/") ? x("已上传") : x("或连接图片节点")
                    })]
                  })]
                })]
              }, Ne);
            }
            if (Te.fieldType === "AUDIO") {
              const Ae = N[Ne] ?? "",
                Fe = z[Ne],
                Me = !!(Ae && (Ae.startsWith("api/") || Ae.startsWith("openapi/") || Ae.includes("/"))) || !!Fe,
                Re = H.length > 0,
                $e = Re ? H[0] : "";
              return c.jsxs("div", {
                className: "col-span-2",
                children: [c.jsx("label", {
                  className: `block text-xs mb-1.5 ${ye}`,
                  children: Te.description
                }), c.jsxs("div", {
                  className: "flex gap-2 items-center flex-wrap",
                  children: [(Me || Re) && c.jsx("div", {
                    className: `w-10 h-10 rounded-md border flex-shrink-0 flex items-center justify-center ${t ? "border-white/30 bg-transparent" : "border-zinc-400/50 bg-zinc-800/50"}`,
                    children: c.jsx(Qh, {
                      size: 20,
                      className: t ? "text-green-400" : "text-green-600"
                    })
                  }), c.jsxs("button", {
                    type: "button",
                    className: `flex items-center gap-1.5 px-2 py-1.5 text-xs rounded-md border ${re} cursor-pointer ${t ? "hover:bg-white/5" : "hover:bg-zinc-100"}`,
                    onMouseDown: rt => rt.stopPropagation(),
                    onClick: rt => {
                      var nt;
                      rt.stopPropagation(), rt.preventDefault(), (nt = M.current[Ne]) == null || nt.click();
                    },
                    children: [c.jsx(ml, {
                      size: 14
                    }), x("上传音频 (mp3/wav/ogg)")]
                  }), c.jsx("input", {
                    ref: rt => {
                      M.current[Ne] = rt;
                    },
                    type: "file",
                    accept: "audio/*,.mp3,.wav,.ogg,.flac",
                    className: "hidden",
                    onChange: rt => ne(Te, rt)
                  }), Me && c.jsx("span", {
                    className: "text-xs text-green-500",
                    children: x("已上传")
                  }), Re && !Me && c.jsx("span", {
                    className: "text-xs text-green-500",
                    children: x("已连接音频")
                  })]
                }), Me && Fe && c.jsx("div", {
                  className: `mt-2 rounded-md border overflow-hidden ${t ? "border-white/30" : "border-zinc-300"}`,
                  children: c.jsx(mze, {
                    audioUrl: Fe,
                    isDark: t,
                    title: x("已上传的音频")
                  })
                }), Re && $e && !Me && c.jsx("div", {
                  className: `mt-2 rounded-md border overflow-hidden ${t ? "border-white/30" : "border-zinc-300"}`,
                  children: c.jsx(mze, {
                    audioUrl: $e,
                    isDark: t,
                    title: x("连接的音频")
                  })
                })]
              }, Ne);
            }
            if (Te.fieldType === "VIDEO") {
              const Ae = N[Ne] ?? "",
                Fe = Ae.startsWith("api/") || Ae.startsWith("openapi/");
              return c.jsxs("div", {
                className: "col-span-2",
                children: [c.jsx("label", {
                  className: `block text-xs mb-1.5 ${ye}`,
                  children: Te.description
                }), c.jsxs("div", {
                  className: "flex gap-2 items-center flex-wrap",
                  children: [Fe && c.jsx("div", {
                    className: `w-10 h-10 rounded-md border flex-shrink-0 flex items-center justify-center ${t ? "border-white/30 bg-transparent" : "border-zinc-400/50 bg-zinc-800/50"}`,
                    children: c.jsx(Oo, {
                      size: 20,
                      className: t ? "text-green-400" : "text-green-600"
                    })
                  }), c.jsxs("button", {
                    type: "button",
                    className: `flex items-center gap-1.5 px-2 py-1.5 text-xs rounded-md border ${re} cursor-pointer ${t ? "hover:bg-white/5" : "hover:bg-zinc-100"}`,
                    onMouseDown: Me => Me.stopPropagation(),
                    onClick: Me => {
                      var Re;
                      Me.stopPropagation(), Me.preventDefault(), (Re = M.current[Ne]) == null || Re.click();
                    },
                    children: [c.jsx(ml, {
                      size: 14
                    }), x("上传视频 (mp4/webm)")]
                  }), c.jsx("input", {
                    ref: Me => {
                      M.current[Ne] = Me;
                    },
                    type: "file",
                    accept: "video/*,.mp4,.webm,.mov",
                    className: "hidden",
                    onChange: Me => ne(Te, Me)
                  }), Fe && c.jsx("span", {
                    className: "text-xs text-green-500",
                    children: x("已上传")
                  })]
                })]
              }, Ne);
            }
            return c.jsxs("div", {
              children: [c.jsx("label", {
                className: `block text-xs mb-1.5 ${ye}`,
                children: Te.description
              }), c.jsx("input", {
                type: "text",
                value: me,
                onChange: Ae => Q(Ne, Ae.target.value),
                className: `w-full px-3 py-2 text-sm rounded-md border ${fe} focus:outline-none focus:ring-1 focus:ring-blue-500`
              })]
            }, Ne);
          })
        }), j.length > 0 && c.jsxs("div", {
          className: "flex gap-2",
          children: [c.jsx("button", {
            onClick: J,
            disabled: f,
            className: `flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors border ${f ? t ? "bg-transparent border-white/20 text-white/50 cursor-not-allowed" : "bg-zinc-500/50 text-zinc-400 cursor-not-allowed" : t ? "bg-transparent border-white/30 hover:bg-white/5 text-white" : "bg-green-500 hover:bg-green-600 text-white"}`,
            children: f ? c.jsxs(c.Fragment, {
              children: [c.jsx(Ua, {
                size: 16,
                className: "animate-spin"
              }), x(b === "queued" ? "排队中..." : "运行中...")]
            }) : c.jsxs(c.Fragment, {
              children: [c.jsx(Ol, {
                size: 16
              }), x("运行")]
            })
          }), f && c.jsxs("button", {
            onClick: pe,
            className: `flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md border ${t ? "bg-transparent border-white/30 hover:bg-white/5 text-white" : "bg-red-500 hover:bg-red-600 text-white"}`,
            children: [c.jsx(kf, {
              size: 16
            }), x("取消")]
          })]
        }), j.length === 0 && L && c.jsx("button", {
          onClick: J,
          disabled: f,
          className: `w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors border ${f ? t ? "bg-transparent border-white/20 text-white/50 cursor-not-allowed" : "bg-zinc-500/50 text-zinc-400 cursor-not-allowed" : t ? "bg-transparent border-white/30 hover:bg-white/5 text-white" : "bg-green-500 hover:bg-green-600 text-white"}`,
          children: f ? c.jsxs(c.Fragment, {
            children: [c.jsx(Ua, {
              size: 16,
              className: "animate-spin"
            }), x("运行（简易模式）")]
          }) : c.jsxs(c.Fragment, {
            children: [c.jsx(Ol, {
              size: 16
            }), x("运行（简易模式）")]
          })
        }), V.length > 0 && c.jsxs("div", {
          className: "space-y-2",
          children: [c.jsxs("div", {
            className: `flex items-center justify-between gap-2 text-xs font-medium ${ye}`,
            children: [c.jsxs("div", {
              className: "flex items-center gap-1.5",
              children: [((ve = e.settings) == null ? void 0 : ve.previewType) === "audio" ? c.jsx(Qh, {
                size: 14
              }) : c.jsx(lo, {
                size: 14
              }), x("生成结果")]
            }), O != null && c.jsxs("span", {
              className: `flex items-center gap-1 ${t ? "text-green-400" : "text-green-600"}`,
              children: [c.jsx(AP, {
                size: 12
              }), O < 1e3 ? `${O}ms` : `${(O / 1e3).toFixed(1)}s`]
            })]
          }), c.jsx("div", {
            className: "flex flex-wrap gap-2",
            children: V.slice(-6).reverse().map(Te => tH(Te.fullUrl) ? c.jsx("div", {
              className: `w-14 h-14 rounded overflow-hidden border flex items-center justify-center ${t ? "border-white/30 bg-transparent" : "border-zinc-300 bg-zinc-800/50"}`,
              children: c.jsx("audio", {
                src: Te.fullUrl,
                controls: !0,
                className: "w-full h-full max-h-14 object-contain",
                preload: "metadata",
                onMouseDown: me => me.stopPropagation(),
                onClick: me => me.stopPropagation()
              })
            }, Te.id) : c.jsx("a", {
              href: Te.fullUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "block w-14 h-14 rounded overflow-hidden border border-zinc-300 hover:border-blue-500 transition-colors",
              children: c.jsx("img", {
                src: Te.fullUrl,
                alt: "",
                className: "w-full h-full object-cover"
              })
            }, Te.id))
          })]
        }), S && (() => {
          const Te = j.find(me => `${me.nodeId}:${me.fieldName}` === S);
          let Ne = z[S];
          if (!Ne && U.length > 0) {
            const Ae = j.filter(Fe => Fe.fieldType === "IMAGE").findIndex(Fe => `${Fe.nodeId}:${Fe.fieldName}` === S);
            Ne = Ae >= 0 ? U[Ae] ?? U[0] : U[0];
          }
          return !Te || !Ne ? null : c.jsx(Y6, {
            isOpen: !0,
            onClose: () => C(null),
            title: x("编辑蒙版（ComfyUI 格式）"),
            theme: t ? "dark" : "light",
            children: c.jsx(o1r, {
              imageUrl: Ne,
              isDark: t,
              onClose: () => C(null),
              onSave: async me => {
                const Ae = new File([me], "masked.png", {
                  type: "image/png"
                });
                await q(Te, Ae), C(null);
              }
            })
          });
        })()]
      })
    });
  },
  Qxo = ["时间段", "镜头类型", "画面描述", "视觉/技术要求", "音效/旁白"];

function Yxo(e, t) {
  if (e.length === 0) return "";
  const n = t ?? Qxo,
    r = "| " + n.join(" | ") + " |",
    a = "| " + n.map(() => "---").join(" | ") + " |",
    i = e.map(o => {
      const s = o;
      return "| " + n.map(l => (s[l] ?? "").replace(/\n/g, " ")).join(" | ") + " |";
    }).join(`
`);
  return r + `
` + a + `
` + i;
}

const Xxo = 60,
  Jxo = 120,
  Byn = 36,
  Zxo = 48,
  e2o = ({
    node: e,
    isDark: t,
    nodes: n,
    connections: r,
    updateNode: a,
    apiConfigs: i,
    globalApiKey: o,
    dataVersion: s,
    activeDropdown: l = null,
    setActiveDropdown: d = hP
  }) => {
    var Xe, De, Ye, Ce, He, Ve, it, It, Ft, We, Ze, Ge, Oe, st, vt, Ht, nn;
    on();
    const u = ((Xe = e.settings) == null ? void 0 : Xe.tableColumns) || [],
      h = ((De = e.settings) == null ? void 0 : De.tableRows) || [],
      p = ((Ye = e.settings) == null ? void 0 : Ye.colWidths) || {},
      m = ((Ce = e.settings) == null ? void 0 : Ce.rowHeights) || {},
      f = g.useMemo(() => u.length > 0 ? u : h.length > 0 ? Object.keys(h[0]).filter(lt => lt !== "id") : [], [u, h]),
      [y, b] = g.useState(() => f),
      [v, _] = g.useState(() => h),
      [w, k] = g.useState(() => p),
      [A, S] = g.useState(() => m),
      [C, I] = g.useState(null),
      [E, M] = g.useState("table"),
      [T, P] = g.useState(!1),
      [R, j] = g.useState(""),
      [B, F] = g.useState(() => {
        var pt;
        return ((pt = e.settings) == null ? void 0 : pt.customPrompt) || "";
      }),
      [N, G] = g.useState(!1),
      z = g.useRef(null),
      V = g.useRef(null),
      O = g.useRef(w),
      L = g.useRef(A),
      D = g.useRef(new Map());
    O.current = w, L.current = A;
    const U = g.useMemo(() => VU(i.filter(pt => pt.type === "Chat")), [i]),
      H = g.useCallback(pt => {
        var Ut, _t;
        const lt = String(pt || "").trim();
        if (!lt) return ((Ut = U[0]) == null ? void 0 : Ut.id) || "";
        if (U.some(At => At.id === lt)) return lt;
        const gt = U.find(At => At.modelName === lt || (At.modelName || At.id) === lt);
        return (gt == null ? void 0 : gt.id) || ((_t = U[0]) == null ? void 0 : _t.id) || lt;
      }, [U]),
      Y = H((He = e.settings) == null ? void 0 : He.selectedChatModel),
      [K, W] = g.useState(() => Y);
    g.useEffect(() => {
      f.length > 0 && b(f), h.length > 0 && _(h), Object.keys(p).length > 0 && k(p), Object.keys(m).length > 0 && S(m);
    }, [(Ve = e.settings) == null ? void 0 : Ve.tableColumns, (it = e.settings) == null ? void 0 : it.tableRows, (It = e.settings) == null ? void 0 : It.colWidths, (Ft = e.settings) == null ? void 0 : Ft.rowHeights, s, f, p, m]), g.useEffect(() => {
      var lt;
      const pt = H((lt = e.settings) == null ? void 0 : lt.selectedChatModel);
      pt && pt !== K && W(pt);
    }, [(We = e.settings) == null ? void 0 : We.selectedChatModel, H, K]);
    const Q = U.find(pt => pt.id === K),
      q = (Q == null ? void 0 : Q.modelName) || K,
      ne = Mu(K),
      de = Wk(K, q),
      le = ne || TT(K, q),
      J = ow((Ze = e.settings) == null ? void 0 : Ze.tableGeminiApiFormat),
      pe = Qv(K, (Ge = e.settings) == null ? void 0 : Ge.tableReasoningEffort, q),
      ce = String(((Oe = e.settings) == null ? void 0 : Oe.platformGroup) || ((st = zs(K)) == null ? void 0 : st.platformGroup) || ko),
      we = !!((vt = e.settings) != null && vt.ossImageBase64),
      X = !ne && !!Q && od(Q, Qa.getGlobalBaseUrl()),
      Z = pt => {
        a(e.id, {
          settings: {
            ...e.settings,
            ...pt
          }
        });
      },
      re = g.useCallback(pt => w[pt] ?? Jxo, [w]),
      fe = g.useCallback(pt => A[pt] ?? Zxo, [A]),
      ye = ((Ht = e.settings) == null ? void 0 : Ht.tableMode) === "generate-list" ? "generate-list" : "organize",
      ie = g.useMemo(() => ye === "generate-list" ? $de(e.id, n, r || []) : [], [ye, e.id, n, r]),
      ae = g.useMemo(() => jkt({
        ...e,
        settings: {
          ...e.settings,
          tableRows: v
        }
      }, ie), [e, v, ie]);
    g.useEffect(() => {
      var lt;
      if (!v.length || !ie.length) return;
      const pt = (lt = e.settings) == null ? void 0 : lt.tableRowImageBindings;
      v.some(gt => ie.some(Ut => {
        var _t;
        return Ut.mode === "sequence" && !Array.isArray((_t = pt == null ? void 0 : pt[gt.id]) == null ? void 0 : _t[Ut.id]);
      })) && a(e.id, {
        settings: {
          ...e.settings,
          tableRowImageBindings: ae
        }
      });
    }, [e.id, e.settings, v, ie, ae, a]);
    const be = g.useCallback((pt, lt, gt, Ut, _t) => {
        var St;
        const At = pt ?? y,
          Yt = lt ?? v,
          qe = gt ?? w,
          kt = Ut ?? A;
        pt && b(pt), lt && _(lt), gt && k(gt), Ut && S(Ut), a(e.id, {
          settings: {
            ...e.settings,
            tableColumns: At,
            tableRows: Yt,
            colWidths: qe,
            rowHeights: kt,
            selectedChatModel: K,
            customPrompt: B.trim() || void 0,
            ..._t,
            tableRowImageBindings: ye === "generate-list" ? jkt({
              ...e,
              settings: {
                ...e.settings,
                tableRows: Yt,
                tableRowImageBindings: (_t == null ? void 0 : _t.tableRowImageBindings) ?? ae
              }
            }, ie) : (St = e.settings) == null ? void 0 : St.tableRowImageBindings
          }
        });
      }, [e, K, B, y, v, w, A, ae, ye, ie, a]),
      Ee = g.useMemo(() => q4i(e.id, n, r || []), [r, n, e.id, s]),
      xe = g.useMemo(() => Y4i(e.id, n, r || []), [r, n, e.id, s]),
      he = g.useCallback(async () => {
        var Yt;
        I(null);
        const pt = Ee || ((Yt = e.settings) == null ? void 0 : Yt.rawText) || "";
        if (!pt.trim()) {
          I("请先连接文本/Agent 节点，或粘贴要解析的内容");
          return;
        }
        const lt = U.find(qe => qe.id === K) || U.find(qe => (qe.modelName || qe.id) === K) || U[0];
        if (!lt) {
          I("请先配置 Chat API");
          return;
        }
        const gt = (Qa.getResolvedModelBaseUrl(lt.id) || lt.url || "https://ai.comfly.org").replace(/\/+$/, ""),
          Ut = nG(gt) || rG(lt.id) || hI(lt.id) || I3(gt) || Eb(lt.id) || Ny(gt),
          _t = cu(lt.key, o, void 0, {
            platformGroup: Ut ? Hg : ce,
            modelId: lt.id,
            modelName: lt.modelName || lt.id,
            baseUrl: gt,
            modelSavedApiKeyId: lt.savedApiKeyId
          });
        if (!_t) {
          I("请先配置 API Key");
          return;
        }
        const At = {
          baseUrl: gt,
          apiKey: _t,
          modelName: lt.modelName || lt.id || "gemini-3-pro-preview",
          modelId: lt.id,
          format: de ? J : "openai",
          reasoningEffort: pe
        };
        P(!0), j(ye === "generate-list" ? "规划中" : "");
        try {
          if (ye === "generate-list") {
            const qe = B.trim() ? null : K4i(pt);
            if (qe) {
              be(qe.columns, qe.rows, void 0, void 0, {
                tablePlan: "已按上游原文拆分",
                tableMode: "generate-list",
                tableRowImageBindings: {}
              });
              return;
            }
            const kt = await H4i(pt, {
              ...At,
              customPrompt: B.trim() || void 0,
              mediaHierarchy: J4i($de(e.id, n, r || []), n),
              onStage: St => j(St === "planning" ? "规划中" : St === "repairing" ? "修正格式" : "生成表格")
            });
            be(kt.columns, kt.rows, void 0, void 0, {
              tablePlan: kt.plan,
              tableMode: "generate-list",
              tableRowImageBindings: {}
            });
          } else {
            const qe = await G4i(pt, {
              ...At,
              customPrompt: B.trim() || void 0
            });
            be(qe.columns, qe.rows);
          }
        } catch (qe) {
          I(qe instanceof Error ? qe.message : "解析失败");
        } finally {
          P(!1), j("");
        }
      }, [Ee, (nn = e.settings) == null ? void 0 : nn.rawText, K, U, o, B, be, ye, e.id, n, r, ce, J, pe, de]),
      ue = g.useCallback(() => {
        const pt = {
          id: `row-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
        };
        y.forEach(lt => {
          pt[lt] = "";
        }), be(void 0, [...v, pt]);
      }, [y, v, be]),
      ge = g.useCallback(pt => {
        be(void 0, v.filter(lt => lt.id !== pt));
      }, [y, v, be]),
      _e = g.useCallback((pt, lt, gt) => {
        be(void 0, v.map(Ut => Ut.id === pt ? {
          ...Ut,
          [lt]: gt
        } : Ut));
      }, [y, v, be]),
      ke = g.useCallback((pt, lt) => {
        lt.preventDefault(), z.current = {
          col: pt,
          startX: lt.clientX,
          startW: re(pt)
        };
        let gt = null,
          Ut = lt.clientX;
        const _t = () => {
            if (gt = null, !z.current) return;
            const qe = Ut - z.current.startX,
              kt = Math.max(Xxo, z.current.startW + qe),
              St = {
                ...O.current,
                [pt]: kt
              };
            O.current = St, k(St);
          },
          At = qe => {
            Ut = qe.clientX, gt === null && (gt = requestAnimationFrame(_t));
          },
          Yt = () => {
            gt !== null && (cancelAnimationFrame(gt), _t()), z.current = null, document.removeEventListener("mousemove", At), document.removeEventListener("mouseup", Yt), be(void 0, void 0, {
              ...O.current
            });
          };
        document.addEventListener("mousemove", At), document.addEventListener("mouseup", Yt);
      }, [re, be]),
      ve = g.useCallback(() => {
        const pt = {};
        for (const lt of v) {
          let gt = Byn;
          for (const Ut of y) {
            const _t = D.current.get(`${lt.id}-${Ut}`);
            if (_t) {
              const At = _t.scrollHeight;
              At > 0 && (gt = Math.max(gt, At + 16));
            }
          }
          pt[lt.id] = gt;
        }
        S(pt), L.current = pt, be(void 0, void 0, void 0, pt);
      }, [v, y, be]),
      Te = g.useCallback((pt, lt) => {
        lt.preventDefault(), V.current = {
          rowId: pt,
          startY: lt.clientY,
          startH: fe(pt)
        };
        let gt = null,
          Ut = lt.clientY;
        const _t = () => {
            if (gt = null, !V.current) return;
            const qe = Ut - V.current.startY,
              kt = Math.max(Byn, V.current.startH + qe),
              St = {
                ...L.current,
                [pt]: kt
              };
            L.current = St, S(St);
          },
          At = qe => {
            Ut = qe.clientY, gt === null && (gt = requestAnimationFrame(_t));
          },
          Yt = () => {
            gt !== null && (cancelAnimationFrame(gt), _t()), V.current = null, document.removeEventListener("mousemove", At), document.removeEventListener("mouseup", Yt), be(void 0, void 0, void 0, {
              ...L.current
            });
          };
        document.addEventListener("mousemove", At), document.addEventListener("mouseup", Yt);
      }, [fe, be]),
      Ne = g.useMemo(() => y.length ? Yxo(v, y) : "", [v, y]),
      me = t,
      Ae = me ? "bg-[#1f1f1f]" : "bg-white",
      Fe = me ? "text-zinc-200" : "text-zinc-800",
      Me = me ? "border-white/[0.06]" : "border-black/[0.06]",
      Re = me ? "bg-transparent border-white/[0.08] text-zinc-200 placeholder-zinc-600 focus:bg-white/[0.03]" : "bg-transparent border-black/[0.08] text-zinc-800 placeholder-zinc-400 focus:bg-black/[0.02]",
      $e = me ? "bg-white/10 text-zinc-100 shadow-sm" : "bg-white text-zinc-900 shadow-sm",
      rt = me ? "text-zinc-500 hover:text-zinc-200" : "text-zinc-500 hover:text-zinc-800",
      nt = me ? "text-zinc-500" : "text-zinc-400",
      ze = `flex items-center gap-0.5 rounded-md p-0.5 ${me ? "bg-white/[0.04]" : "bg-black/[0.04]"}`,
      Le = `flex h-6 items-center gap-1 rounded-md px-1.5 text-[11px] transition-colors disabled:opacity-40 ${me ? "text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-100" : "text-zinc-500 hover:bg-black/[0.05] hover:text-zinc-900"}`,
      Ke = me ? "text-zinc-500" : "text-zinc-400";
    return c.jsxs("div", {
      className: "relative h-full min-h-0 w-full",
      children: [c.jsxs("div", {
        className: `flex min-h-0 h-full w-full flex-col overflow-hidden rounded-2xl ${Ae}`,
        children: [c.jsxs("div", {
          className: "flex flex-shrink-0 items-center gap-2 px-3 pt-2.5 pb-2",
          "data-table-editor-prompt": !0,
          children: [c.jsxs("div", {
            className: `flex-1 min-w-0 flex items-center gap-2 cursor-grab active:cursor-grabbing select-none touch-none ${Fe}`,
            title: x("拖动节点"),
            children: [c.jsx("span", {
              className: "text-[13px] font-medium tracking-tight truncate",
              children: x("表格编辑器")
            }), v.length > 0 ? c.jsxs("span", {
              className: `text-[10px] tabular-nums ${Ke}`,
              children: [v.length, x(" 行")]
            }) : null]
          }), c.jsxs("button", {
            type: "button",
            onClick: () => G(!N),
            onMouseDown: pt => pt.stopPropagation(),
            className: `${Le} ${B.trim() ? me ? "text-zinc-200" : "text-zinc-800" : ""}`,
            children: ["Prompt", N ? c.jsx(j2, {
              className: "w-3 h-3"
            }) : c.jsx(Mi, {
              className: "w-3 h-3"
            })]
          })]
        }), N && c.jsx("div", {
          className: "flex-shrink-0 px-3 pb-2",
          children: c.jsx("textarea", {
            "data-table-editor-textarea": !0,
            value: B,
            onChange: pt => F(pt.target.value),
            onBlur: () => a(e.id, {
              settings: {
                ...e.settings,
                customPrompt: B.trim() || void 0
              }
            }),
            placeholder: x(ye === "generate-list" ? "例如：每行都是白底电商主图，不要文字" : "例如：我需要更加细致的分镜、我不需要xxx镜头等"),
            rows: 3,
            className: `w-full text-[11px] leading-relaxed px-2.5 py-2 rounded-lg border ${Re} resize-none focus:outline-none overflow-y-auto minimal-scrollbar cursor-text`
          })
        }), c.jsxs("div", {
          className: "flex flex-shrink-0 items-center justify-between gap-2 px-3 pb-2",
          "data-table-editor-controls": !0,
          onMouseDown: pt => pt.stopPropagation(),
          children: [c.jsxs("div", {
            className: "flex items-center gap-1.5",
            children: [c.jsxs("div", {
              className: ze,
              children: [c.jsx("button", {
                type: "button",
                onClick: () => a(e.id, {
                  settings: {
                    ...e.settings,
                    tableMode: "organize"
                  }
                }),
                className: `px-2 py-0.5 text-[11px] rounded ${ye === "organize" ? $e : rt}`,
                children: x("整理")
              }), c.jsx("button", {
                type: "button",
                onClick: () => a(e.id, {
                  settings: {
                    ...e.settings,
                    tableMode: "generate-list"
                  }
                }),
                className: `px-2 py-0.5 text-[11px] rounded ${ye === "generate-list" ? $e : rt}`,
                children: x("生成列表")
              })]
            }), c.jsxs("div", {
              className: ze,
              children: [c.jsx("button", {
                type: "button",
                onClick: () => M("table"),
                className: `px-2 py-0.5 text-[11px] rounded ${E === "table" ? $e : rt}`,
                children: x("表格")
              }), c.jsx("button", {
                type: "button",
                onClick: () => M("markdown"),
                className: `px-2 py-0.5 text-[11px] rounded ${E === "markdown" ? $e : rt}`,
                children: "Markdown"
              })]
            })]
          }), c.jsxs("div", {
            className: "flex items-center gap-0.5",
            children: [c.jsx("button", {
              type: "button",
              disabled: y.length === 0 || v.length === 0,
              title: x("导出 CSV"),
              "aria-label": x("导出 CSV"),
              className: Le,
              onClick: async () => {
                I(null);
                try {
                  const csvCell = value => {
                    const text = String(value ?? "");
                    return /[,"\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
                  };
                  const csv = [y.map(csvCell).join(","), ...v.map(row => y.map(column => csvCell(row[column])).join(","))].join("\r\n");
                  const result = await fG(new Blob(["\uFEFF", csv], {
                    type: "text/csv;charset=utf-8"
                  }), `${e.nodeName || "表格"}_${new Date().toISOString().slice(0, 10)}.csv`, "file");
                  I(result.ok ? result.hint : result.error || "CSV 导出失败");
                } catch (error) {
                  I(error instanceof Error ? error.message : "CSV 导出失败");
                }
              },
              children: "CSV"
            }), c.jsx("button", {
              type: "button",
              onClick: ve,
              disabled: v.length === 0,
              title: x("行高自适应：根据内容自动调整所有行高"),
              className: Le,
              children: c.jsx(gRr, {
                className: "w-3.5 h-3.5"
              })
            }), c.jsxs("button", {
              type: "button",
              onClick: ue,
              title: x("添加一行"),
              className: Le,
              children: [c.jsx(eo, {
                className: "w-3.5 h-3.5"
              }), x("行")]
            })]
          })]
        }), xe.length > 0 && c.jsx("div", {
          className: "flex items-center gap-1.5 px-3 pb-2 overflow-x-auto minimal-scrollbar",
          "data-table-editor-controls": !0,
          onMouseDown: pt => pt.stopPropagation(),
          children: xe.map(pt => pt.kind === "image" ? c.jsx("span", {
            className: "shrink-0",
            title: pt.label,
            children: pt.thumb ? c.jsx("img", {
              src: pt.thumb,
              alt: "",
              className: "h-6 w-6 rounded-md object-cover",
              draggable: !1
            }) : c.jsx("span", {
              className: `flex h-6 w-6 items-center justify-center rounded-md text-[10px] ${me ? "bg-zinc-700 text-zinc-300" : "bg-zinc-200 text-zinc-600"}`,
              children: x("图")
            })
          }, pt.id) : c.jsxs("span", {
            className: `shrink-0 max-w-[180px] truncate rounded-md px-2 py-1 text-[10px] ${me ? "bg-white/[0.04] text-zinc-400" : "bg-black/[0.04] text-zinc-500"}`,
            title: pt.snippet || pt.label,
            children: [pt.kind === "agent" ? "Agent" : x("文本"), " · ", pt.snippet || pt.label]
          }, pt.id))
        }), C && c.jsx("div", {
          className: `px-2 py-1.5 text-[11px] text-amber-500 border-b ${Me} bg-amber-500/10`,
          children: C
        }), c.jsxs("div", {
          className: `flex min-h-0 flex-1 flex-col overflow-auto overscroll-contain border-t px-2 pb-1 ${Me}`,
          style: {
            scrollbarWidth: "thin",
            scrollbarColor: me ? "#71717a transparent" : "#a1a1aa transparent",
            scrollbarGutter: "stable"
          },
          "data-table-editor-scroll": !0,
          onPointerDown: pt => {
            pt.target === pt.currentTarget && pt.stopPropagation();
          },
          onMouseDown: pt => {
            pt.target === pt.currentTarget && pt.stopPropagation();
          },
          children: [v.length === 0 && E === "table" ? c.jsx("div", {
            className: `text-center py-6 text-xs ${me ? "text-zinc-500" : "text-zinc-400"}`,
            children: x(Ee ? ye === "generate-list" ? "点击上方刷新，生成可逐行绘画的列表" : "点击上方刷新，调用大模型智能分类" : "连接文本或 Agent 后，点击刷新解析")
          }) : E === "markdown" ? c.jsx("pre", {
            className: `mt-2 shrink-0 text-[11px] leading-relaxed p-3 rounded-lg ${me ? "bg-white/[0.03] text-zinc-300" : "bg-black/[0.02] text-zinc-700"} whitespace-pre-wrap font-mono min-h-[80px]`,
            children: Ne || "（暂无内容）"
          }) : c.jsx("div", {
            className: "shrink-0",
            children: c.jsxs("table", {
              className: "w-full text-[11px] border-collapse",
              style: {
                tableLayout: "fixed",
                minWidth: 36 + ie.length * 72 + y.reduce((pt, lt) => pt + re(lt), 0)
              },
              children: [c.jsxs("colgroup", {
                children: [c.jsx("col", {
                  style: {
                    width: 36
                  }
                }), ie.map(pt => c.jsx("col", {
                  style: {
                    width: 72
                  }
                }, pt.id)), y.map(pt => c.jsx("col", {
                  style: {
                    width: re(pt)
                  }
                }, pt))]
              }), c.jsx("thead", {
                className: `sticky top-0 z-[1] ${Ae}`,
                children: c.jsxs("tr", {
                  children: [c.jsx("th", {
                    className: `w-9 px-1 py-2 border-b ${Me} ${nt} text-[10px] font-normal text-center`,
                    children: "#"
                  }), ie.map((pt, lt) => c.jsx("th", {
                    className: `px-2 py-2 border-b ${Me} ${nt} text-[10px] font-normal text-left`,
                    children: c.jsxs("span", {
                      className: "block truncate",
                      children: [x("输入"), lt + 1, " ", c.jsxs("span", {
                        className: "opacity-60",
                        children: ["· ", x(pt.label)]
                      })]
                    })
                  }, pt.id)), y.map(pt => c.jsxs("th", {
                    className: `px-2 py-2 border-b ${Me} ${nt} text-[10px] font-normal tracking-wide text-left relative group`,
                    style: {
                      width: re(pt)
                    },
                    children: [c.jsx("span", {
                      className: "truncate block",
                      children: pt
                    }), c.jsx("span", {
                      "data-table-resize-handle": !0,
                      onMouseDown: lt => {
                        lt.stopPropagation(), lt.preventDefault(), ke(pt, lt);
                      },
                      className: `absolute right-0 top-2 bottom-2 w-px cursor-col-resize shrink-0 ${me ? "bg-white/[0.06] hover:bg-white/40" : "bg-black/[0.06] hover:bg-black/40"} after:absolute after:-inset-x-1 after:inset-y-0 after:content-['']`,
                      title: x("拖拽调整列宽")
                    })]
                  }, pt))]
                })
              }), c.jsx("tbody", {
                children: v.map((pt, lt) => c.jsxs(Ia.Fragment, {
                  children: [c.jsxs("tr", {
                    className: `relative group/row transition-colors ${me ? "hover:bg-white/[0.02]" : "hover:bg-black/[0.015]"}`,
                    style: {
                      height: fe(pt.id)
                    },
                    children: [c.jsxs("td", {
                      className: "px-1 py-2 text-center align-top",
                      children: [c.jsx("span", {
                        className: `block text-[10px] tabular-nums group-hover/row:hidden ${Ke}`,
                        children: lt + 1
                      }), c.jsx("button", {
                        type: "button",
                        onClick: () => ge(pt.id),
                        className: `hidden group-hover/row:inline-flex p-0.5 rounded ${Ke} hover:text-red-400`,
                        title: x("删除行"),
                        children: c.jsx(Qo, {
                          className: "w-3 h-3"
                        })
                      })]
                    }), ie.map(gt => {
                      var _t;
                      const Ut = ((_t = ae[pt.id]) == null ? void 0 : _t[gt.id]) ?? gt.nodeIds;
                      return c.jsxs("td", {
                        className: "px-2 py-2 align-top",
                        children: [c.jsx("div", {
                          className: "flex flex-wrap gap-0.5",
                          children: Ut.length ? Ut.map(At => {
                            const Yt = YCe(n.find(qe => qe.id === At));
                            return Yt ? c.jsx("img", {
                              src: Yt,
                              alt: "",
                              className: "h-7 w-7 rounded-md object-cover",
                              draggable: !1
                            }, At) : c.jsx("span", {
                              className: `h-7 w-7 rounded-md ${me ? "bg-white/[0.06]" : "bg-black/[0.06]"}`
                            }, At);
                          }) : c.jsx("span", {
                            className: `text-[10px] ${me ? "text-zinc-500" : "text-zinc-400"}`,
                            children: "—"
                          })
                        }), (gt.mode === "sequence" || !Ut.length) && c.jsxs("select", {
                          "aria-label": `第${lt + 1}行${gt.label}素材`,
                          title: x("选择与本行提示词对应的素材图"),
                          value: Ut[0] || "",
                          className: `mt-1 w-full min-w-0 rounded border-0 text-[10px] ${Re}`,
                          onChange: At => be(void 0, void 0, void 0, void 0, {
                            tableRowImageBindings: {
                              ...ae,
                              [pt.id]: {
                                ...ae[pt.id],
                                [gt.id]: At.target.value ? [At.target.value] : []
                              }
                            }
                          }),
                          children: [c.jsx("option", {
                            value: "",
                            children: x("未绑定")
                          }), gt.nodeIds.map((At, Yt) => {
                            var qe;
                            return c.jsxs("option", {
                              value: At,
                              children: [Yt + 1, " · ", ((qe = n.find(kt => kt.id === At)) == null ? void 0 : qe.nodeName) || x("图片")]
                            }, At);
                          })]
                        })]
                      }, gt.id);
                    }), y.map(gt => c.jsx("td", {
                      className: "px-1 py-1 align-top overflow-hidden",
                      style: {
                        width: re(gt)
                      },
                      children: c.jsx("textarea", {
                        "data-table-editor-textarea": !0,
                        ref: Ut => {
                          Ut ? D.current.set(`${pt.id}-${gt}`, Ut) : D.current.delete(`${pt.id}-${gt}`);
                        },
                        value: pt[gt] ?? "",
                        onChange: Ut => _e(pt.id, gt, Ut.target.value),
                        placeholder: gt,
                        rows: 2,
                        className: `w-full min-w-0 px-1 py-1 text-[11px] leading-relaxed border-0 focus:outline-none rounded-md resize-none overflow-y-auto overscroll-contain cursor-text ${Re}`,
                        style: {
                          minHeight: fe(pt.id) - 16,
                          scrollbarWidth: "thin"
                        }
                      })
                    }, gt))]
                  }), c.jsx("tr", {
                    className: "group/resize",
                    children: c.jsx("td", {
                      colSpan: y.length + ie.length + 1,
                      className: `p-0 h-[5px] cursor-row-resize border-b ${Me} ${me ? "hover:bg-white/10" : "hover:bg-black/10"}`,
                      "data-table-resize-handle": !0,
                      title: x("拖拽调整行高"),
                      onMouseDown: gt => {
                        gt.stopPropagation(), gt.preventDefault(), Te(pt.id, gt);
                      }
                    })
                  })]
                }, pt.id))
              })]
            })
          }), c.jsx("div", {
            className: "min-h-3 flex-1",
            "data-table-editor-drag": !0
          })]
        }), c.jsxs("div", {
          "data-node-header-toolbar": !0,
          "data-table-editor-drag": !0,
          title: x("拖动节点"),
          className: `qiaodoumayi-aux-gen-toolbar flex h-14 shrink-0 cursor-grab items-center gap-2 border-t px-3 active:cursor-grabbing ${Me}`,
          children: [c.jsx(Th, {
            scopeId: e.id,
            dropdownType: "table-editor-chat-model",
            value: K,
            models: U,
            isDark: me,
            activeDropdown: l,
            setActiveDropdown: d,
            disabled: T,
            menuPlacement: "above",
            scrollToSelected: !1,
            showChannelBar: !0,
            menuMaxHeight: 360,
            leadingIcon: c.jsx(XE, {
              size: 13
            }),
            onSelect: pt => {
              W(pt);
              const lt = zs(pt);
              Z({
                selectedChatModel: pt,
                platformGroup: (lt == null ? void 0 : lt.platformGroup) || ko
              });
            }
          }), de ? c.jsx(_$, {
            nodeId: e.id,
            dropdownType: "table-editor-gemini-api-format",
            value: J,
            isDark: me,
            activeDropdown: l,
            setActiveDropdown: d,
            onSelect: pt => Z({
              tableGeminiApiFormat: pt
            }),
            buttonClassName: "shrink-0 text-xs",
            menuClassName: "w-44"
          }) : null, le ? c.jsx(dT, {
            nodeId: e.id,
            dropdownType: "table-editor-reasoning-effort",
            value: pe,
            isDark: me,
            activeDropdown: l,
            setActiveDropdown: d,
            onSelect: pt => Z({
              tableReasoningEffort: pt
            }),
            buttonClassName: "shrink-0 text-xs",
            modelId: K,
            modelName: q
          }) : null, X ? c.jsx(Ku, {
            nodeId: e.id,
            platformGroup: ce,
            modelName: q,
            modelId: K,
            modelConfigId: Q == null ? void 0 : Q.id,
            isDark: me,
            onGroupChange: pt => Z({
              platformGroup: pt
            }),
            compact: !0,
            buttonVariant: "square"
          }) : null, ne ? null : c.jsxs("label", {
            className: `sketch-chat-web-chip${me ? " sketch-chat-web-chip--dark" : ""}`,
            title: x("图片改用 Base64 发送"),
            onMouseDown: pt => pt.stopPropagation(),
            children: [c.jsx("input", {
              type: "checkbox",
              checked: we,
              onChange: pt => Z({
                ossImageBase64: pt.target.checked
              }),
              className: "h-3 w-3 cursor-pointer"
            }), c.jsx("span", {
              className: "whitespace-nowrap",
              children: "B64"
            })]
          }), c.jsx("span", {
            className: "ml-auto"
          }), c.jsx("button", {
            type: "button",
            onClick: he,
            disabled: T,
            title: ye === "generate-list" ? R || x("按上游文字拆成列表") : x("调用大模型智能分类"),
            className: `${Le} h-7 w-7 justify-center px-0`,
            children: T ? c.jsx(Ua, {
              className: "w-3.5 h-3.5 animate-spin"
            }) : c.jsx(bd, {
              className: "w-3.5 h-3.5"
            })
          })]
        })]
      }), c.jsx("div", {
        "data-table-editor-drag": !0,
        title: x("拖动节点"),
        className: "absolute left-4 right-4 top-full z-[2] h-10 cursor-grab touch-none active:cursor-grabbing"
      })]
    });
  },
  t2o = 40,
  Fyn = 2,
  zyn = 32,
  n2o = 4,
  d1r = "#000000";

function Uyn(e) {
  if (/^#[0-9A-Fa-f]{6}$/.test(e)) return e;
  if (/^#[0-9A-Fa-f]{3}$/.test(e)) {
    const t = e[1] + e[1],
      n = e[2] + e[2],
      r = e[3] + e[3];
    return `#${t}${n}${r}`;
  }
  return d1r;
}

const r2o = ({
    node: e,
    isDark: t,
    updateNode: n,
    setNodes: r,
    nodes: a,
    generateId: i,
    onDrawingChange: o
  }) => {
    var O, L, D, U, H;
    on();
    const s = g.useRef(null),
      l = g.useRef(null),
      d = g.useRef(null),
      u = g.useRef(!1),
      h = g.useRef([]),
      p = ((O = e.settings) == null ? void 0 : O.doodleStrokes) || [],
      m = ((L = e.settings) == null ? void 0 : L.doodleBrushSize) ?? n2o,
      f = Math.max(Fyn, Math.min(zyn, m)),
      y = ((D = e.settings) == null ? void 0 : D.doodleBrushColor) ?? d1r,
      b = ((U = e.settings) == null ? void 0 : U.doodleBackgroundColor) ?? (t ? "#171717" : "#fafafa"),
      v = ((H = e.settings) == null ? void 0 : H.doodleToolMode) ?? "pen",
      [_, w] = g.useState(null),
      [k, A] = g.useState(!1),
      S = Math.max(80, e.width),
      C = Math.max(80, e.height - t2o);
    g.useEffect(() => {
      const Y = d.current;
      if (!Y) return;
      const K = new ResizeObserver(() => {
        const W = Y.scrollWidth,
          Q = Y.clientWidth;
        if (W > Q + 10) {
          const q = Math.min(W + 40, 900);
          q > e.width && n(e.id, {
            width: q
          });
        }
      });
      return K.observe(Y), () => {
        K.disconnect();
      };
    }, [e.id, e.width, n, k, v]);
    const I = g.useCallback(Y => {
        n(e.id, {
          settings: {
            ...e.settings,
            doodleStrokes: Y
          }
        });
      }, [e.id, e.settings, n]),
      E = g.useCallback(Y => {
        var de, le, J;
        const K = (de = s.current) == null ? void 0 : de.getBoundingClientRect();
        if (!K) return null;
        const W = "touches" in Y ? (le = Y.touches[0]) == null ? void 0 : le.clientX : Y.clientX,
          Q = "touches" in Y ? (J = Y.touches[0]) == null ? void 0 : J.clientY : Y.clientY;
        if (W == null || Q == null) return null;
        const q = S / K.width,
          ne = C / K.height;
        return {
          x: (W - K.left) * q,
          y: (Q - K.top) * ne
        };
      }, [S, C]),
      M = g.useCallback(() => {
        const Y = s.current,
          K = Y == null ? void 0 : Y.getContext("2d");
        if (!Y || !K) return;
        K.fillStyle = b, K.fillRect(0, 0, Y.width, Y.height), (_ ? [...p, _] : p).forEach(Q => {
          if (Q.points.length < 2) return;
          K.beginPath(), K.strokeStyle = Q.color, K.lineWidth = Q.width, K.lineCap = "round", K.lineJoin = "round", K.globalAlpha = Q.opacity ?? 1;
          const q = Q.x ?? 0,
            ne = Q.y ?? 0;
          Q.points.forEach((de, le) => {
            const J = q + de.x,
              pe = ne + de.y;
            le === 0 ? K.moveTo(J, pe) : K.lineTo(J, pe);
          }), K.stroke();
        }), K.globalAlpha = 1;
      }, [p, _, b]);
    g.useEffect(() => {
      const Y = s.current;
      if (!Y) return;
      const K = S,
        W = C;
      (Y.width !== K || Y.height !== W) && (Y.width = K, Y.height = W), M();
    }, [S, C, M]);
    const T = v === "eraser" ? b : y,
      P = g.useCallback(Y => {
        Y.preventDefault();
        const K = E(Y);
        K && (u.current = !0, o == null || o(!0), h.current = [K], w({
          id: `doodle-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          points: [K],
          color: T,
          width: v === "eraser" ? Math.max(f * 2, 16) : f,
          opacity: 1,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1
        }));
      }, [E, T, f, v, o]),
      R = g.useCallback(Y => {
        if (!u.current) return;
        const K = E(Y);
        K && (h.current.push(K), w(W => W ? {
          ...W,
          points: [...h.current]
        } : null));
      }, [E]),
      j = g.useCallback(() => {
        if (!u.current) return;
        u.current = !1, o == null || o(!1);
        const Y = h.current;
        if (Y.length >= 2) {
          const K = {
            id: `doodle-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            points: Y,
            color: T,
            width: v === "eraser" ? Math.max(f * 2, 16) : f,
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1
          };
          I([...p, K]);
        }
        w(null), h.current = [];
      }, [p, T, f, v, I, o]);
    g.useEffect(() => {
      const Y = () => {
        if (u.current) {
          u.current = !1, o == null || o(!1);
          const K = h.current;
          if (K.length >= 2) {
            const W = {
              id: `doodle-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
              points: K,
              color: T,
              width: v === "eraser" ? Math.max(f * 2, 16) : f,
              opacity: 1,
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1
            };
            I([...p, W]);
          }
          w(null), h.current = [];
        }
      };
      return window.addEventListener("mouseup", Y), window.addEventListener("touchend", Y), () => {
        window.removeEventListener("mouseup", Y), window.removeEventListener("touchend", Y);
      };
    }, [T, f, v, p, I, o]);
    const B = g.useCallback(async () => {
        const Y = _ ? [...p, _] : p;
        if (Y.length === 0) return;
        const K = {
          strokes: Y,
          textElements: [],
          images: [],
          layers: [],
          backgroundColor: b,
          aspectRatio: "1:1",
          width: S,
          height: C
        };
        try {
          const W = await lue(K, S, C, !1, !0);
          if (!W) return;
          const q = await (await fetch(W)).blob();
          if (!(q != null && q.size)) return;
          const {
              calcInputImageNodeDisplaySize: ne
            } = await Ie(async () => {
              const {
                calcInputImageNodeDisplaySize: ie
              } = await Promise.resolve().then(() => Rue);
              return {
                calcInputImageNodeDisplaySize: ie
              };
            }, void 0, import.meta.url),
            {
              buildDoodleInputImageBaseSettings: de,
              persistDoodleBlobToInputImageNode: le
            } = await Ie(async () => {
              const {
                buildDoodleInputImageBaseSettings: ie,
                persistDoodleBlobToInputImageNode: ae
              } = await Promise.resolve().then(() => IAe);
              return {
                buildDoodleInputImageBaseSettings: ie,
                persistDoodleBlobToInputImageNode: ae
              };
            }, void 0, import.meta.url),
            {
              OSS_UPLOADING_SETTING_KEY: J
            } = await Ie(async () => {
              const {
                OSS_UPLOADING_SETTING_KEY: ie
              } = await Promise.resolve().then(() => ii);
              return {
                OSS_UPLOADING_SETTING_KEY: ie
              };
            }, void 0, import.meta.url),
            {
              isGlobalOssUploadEnabled: pe
            } = await Ie(async () => {
              const {
                isGlobalOssUploadEnabled: ie
              } = await Promise.resolve().then(() => Ah);
              return {
                isGlobalOssUploadEnabled: ie
              };
            }, void 0, import.meta.url),
            ce = S,
            we = C,
            X = ne(ce, we),
            Z = de(q, ce, we),
            re = e.x + e.width + 60,
            fe = e.y,
            ye = i();
          r(ie => {
            const ae = Ki(ye, "input-image", re, fe, "涂鸦画板", void 0, ie);
            return ae.width = X.width, ae.height = X.height, ae.settings = pe() ? {
              ...Z,
              [J]: !0
            } : Z, [...ie, ae];
          }), await le({
            blob: q,
            nodeId: ye,
            wPx: ce,
            hPx: we,
            setNodes: r,
            baseSettings: Z,
            assetId: `doodle_export_${ye}`,
            ossFileName: `doodle_export_${ye}.png`,
            sourceLabel: "file://doodle-export"
          });
        } catch (W) {
          console.error("[DoodleCanvasNodeInline] 导出失败:", W);
        }
      }, [p, _, S, C, b, e.id, e.x, e.width, e.y, i, r]),
      F = Y => {
        n(e.id, {
          settings: {
            ...e.settings,
            doodleBrushSize: Y
          }
        });
      },
      N = Y => {
        n(e.id, {
          settings: {
            ...e.settings,
            doodleBrushColor: Y
          }
        });
      },
      G = Y => {
        n(e.id, {
          settings: {
            ...e.settings,
            doodleBackgroundColor: Y
          }
        });
      },
      z = Y => {
        n(e.id, {
          settings: {
            ...e.settings,
            doodleToolMode: Y
          }
        });
      },
      V = p.length > 0 || _ != null;
    return c.jsxs("div", {
      ref: l,
      className: `relative w-full h-full flex flex-col rounded-2xl overflow-hidden ${t ? "bg-[#1f1f1f]" : "bg-zinc-100"}`,
      children: [c.jsx("div", {
        className: "flex-1 min-h-0 relative",
        style: {
          touchAction: "none"
        },
        onMouseDown: Y => Y.stopPropagation(),
        onClick: Y => Y.stopPropagation(),
        onPointerDown: Y => Y.stopPropagation(),
        children: c.jsx("canvas", {
          ref: s,
          width: S,
          height: C,
          className: "absolute inset-0 w-full h-full block",
          style: {
            touchAction: "none",
            cursor: v === "eraser" ? "cell" : "crosshair"
          },
          onMouseDown: P,
          onMouseMove: R,
          onMouseLeave: j,
          onMouseUp: j,
          onTouchStart: P,
          onTouchMove: R,
          onTouchEnd: j
        })
      }), c.jsxs("div", {
        ref: d,
        className: `flex-shrink-0 flex flex-wrap items-center gap-2 px-2 py-1.5 border-t min-h-[40px] ${t ? "bg-[#1f1f1f]/95 border-zinc-800" : "bg-zinc-50 border-zinc-200"}`,
        children: [c.jsxs("div", {
          className: "flex items-center gap-1.5 shrink-0 min-w-0 flex-wrap",
          onMouseDown: Y => Y.stopPropagation(),
          onClick: Y => Y.stopPropagation(),
          onPointerDown: Y => Y.stopPropagation(),
          children: [c.jsxs("div", {
            className: "flex items-center gap-0.5",
            children: [c.jsx("button", {
              type: "button",
              title: x("画笔"),
              onClick: Y => {
                Y.stopPropagation(), z("pen");
              },
              className: `w-6 h-6 flex items-center justify-center rounded transition-colors ${v === "pen" ? t ? "bg-blue-600 text-white" : "bg-black text-white" : t ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700" : "bg-zinc-200 text-zinc-600 hover:bg-zinc-300"}`,
              children: c.jsx(Vue, {
                size: 14
              })
            }), c.jsx("button", {
              type: "button",
              title: x("橡皮擦"),
              onClick: Y => {
                Y.stopPropagation(), z("eraser");
              },
              className: `w-6 h-6 flex items-center justify-center rounded transition-colors ${v === "eraser" ? t ? "bg-blue-600 text-white" : "bg-black text-white" : t ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700" : "bg-zinc-200 text-zinc-600 hover:bg-zinc-300"}`,
              children: c.jsx(uI, {
                size: 14
              })
            })]
          }), c.jsxs("div", {
            className: "flex items-center gap-1.5",
            children: [c.jsxs("span", {
              className: `text-[10px] shrink-0 w-6 text-right ${t ? "text-zinc-400" : "text-zinc-500"}`,
              title: v === "eraser" ? x("橡皮擦 {0}px", Math.max(f * 2, 16)) : x("画笔 {0}px", f),
              children: [v === "eraser" ? Math.max(f * 2, 16) : f, "px"]
            }), c.jsx("input", {
              type: "range",
              min: Fyn,
              max: zyn,
              value: f,
              onChange: Y => {
                Y.stopPropagation(), F(Number(Y.target.value));
              },
              onClick: Y => Y.stopPropagation(),
              title: x(v === "eraser" ? "橡皮擦大小" : "画笔大小"),
              className: `w-20 h-1.5 rounded-full appearance-none cursor-pointer accent-blue-500 ${t ? "bg-zinc-700" : "bg-zinc-300"}`
            })]
          }), v === "pen" && c.jsx("label", {
            className: "flex items-center gap-1 cursor-pointer",
            title: x("画笔颜色（自由选色）"),
            children: c.jsx("input", {
              type: "color",
              value: Uyn(y),
              onChange: Y => {
                Y.stopPropagation(), N(Y.target.value);
              },
              onClick: Y => Y.stopPropagation(),
              className: "w-6 h-6 rounded border border-zinc-500 cursor-pointer bg-transparent overflow-hidden",
              style: {
                padding: 0
              }
            })
          }), c.jsx("span", {
            className: `text-[10px] ${t ? "text-zinc-500" : "text-zinc-400"}`,
            children: "|"
          }), c.jsxs("div", {
            className: "flex items-center gap-0.5",
            children: [c.jsxs("button", {
              type: "button",
              onClick: Y => {
                Y.stopPropagation(), A(K => !K);
              },
              title: x("画布背景色（自由选色）"),
              className: `flex items-center gap-0.5 px-1.5 py-0.5 rounded border ${t ? `hover:bg-zinc-800 border-transparent ${k ? "bg-zinc-800" : ""}` : `border-black bg-black text-white hover:bg-zinc-800 ${k ? "bg-zinc-800" : ""}`}`,
              children: [k ? c.jsx(Mi, {
                size: 12,
                className: t ? "text-zinc-400" : "text-white"
              }) : c.jsx(ss, {
                size: 12,
                className: t ? "text-zinc-400" : "text-white"
              }), c.jsx(tw, {
                size: 12,
                className: t ? "text-zinc-400" : "text-white"
              }), c.jsx("span", {
                className: `text-[10px] ${t ? "text-zinc-500" : "text-white"}`,
                children: x("背景")
              }), c.jsx("div", {
                className: `w-4 h-4 rounded border shrink-0 ${b === "#ffffff" || b === "#fafafa" || b === "#fef3c7" ? "border-zinc-400" : "border-transparent"}`,
                style: {
                  backgroundColor: b
                }
              })]
            }), k && c.jsxs("label", {
              className: "flex items-center gap-1 cursor-pointer",
              title: x("背景色（自由选色）"),
              children: [c.jsx("span", {
                className: "text-[10px] text-zinc-500",
                children: x("选色")
              }), c.jsx("input", {
                type: "color",
                value: Uyn(b),
                onChange: Y => {
                  Y.stopPropagation(), G(Y.target.value);
                },
                onClick: Y => Y.stopPropagation(),
                className: "w-6 h-6 rounded border border-zinc-500 cursor-pointer bg-transparent overflow-hidden",
                style: {
                  padding: 0
                }
              })]
            })]
          })]
        }), c.jsxs("button", {
          type: "button",
          onClick: Y => {
            Y.stopPropagation(), B();
          },
          disabled: !V,
          title: x(V ? "导出到画布" : "请先绘制"),
          className: `shrink-0 flex items-center gap-1 px-2 py-1 rounded text-xs ml-auto ${V ? t ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-black text-white hover:bg-zinc-800" : t ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" : "bg-zinc-200 text-zinc-400 cursor-not-allowed"}`,
          children: [c.jsx(ws, {
            size: 14
          }), x("导出")]
        })]
      })]
    });
  },
  a2o = e => e ? "px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer border bg-transparent text-zinc-100 border-zinc-500 hover:bg-zinc-800/60" : "px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer bg-black hover:bg-[#1f1f1f] text-white",
  i2o = ({
    node: e,
    isDark: t,
    onOpenDirector3D: n
  }) => {
    var r, a;
    return on(), c.jsxs("div", {
      className: `flex h-full min-h-0 w-full flex-col items-center justify-center overflow-hidden rounded-2xl ${t ? "bg-[#1f1f1f]" : "bg-white"}`,
      children: [c.jsx("button", {
        type: "button",
        onClick: i => {
          i.stopPropagation(), n == null || n(e.id);
        },
        onMouseDown: i => i.stopPropagation(),
        className: a2o(t),
        children: x("打开")
      }), c.jsxs("div", {
        className: "mt-2 text-center text-[10px] text-zinc-500",
        children: [c.jsx("div", {
          children: (r = e.settings) != null && r.smartBuild ? x("一句话搭建 3D 场景") : x("点击进入全屏 3D 导演台")
        }), c.jsx("div", {
          children: (a = e.settings) != null && a.smartBuild ? x("打开后可继续编辑、取景与截图") : x("支持角色摆位与多机位取景")
        })]
      })]
    });
  },
  u1r = g.memo(function ({
    nodeId: t,
    isDark: n,
    isGeneratingUi: r,
    directorActive: a,
    directorConnecting: i,
    onGenerate: o
  }) {
    return on(), c.jsx("span", {
      className: "qiaodoumayi-gen-submit-wrap inline-flex items-center shrink-0 ml-0.5",
      children: c.jsx("button", {
        type: "button",
        "aria-label": x(a ? i ? "正在连接导演会话" : "发送导演指令" : r ? "生成中" : "生成"),
        "aria-busy": r && !a,
        disabled: r && !a,
        className: `qiaodoumayi-gen-submit p-1.5 rounded-md border shrink-0 ${r && !a ? "" : "active:scale-95"} ${n ? "bg-transparent hover:bg-white/5 text-white border-white/30" : "bg-transparent hover:bg-black/5 text-gray-900 border-gray-300"}`,
        onMouseDown: s => {
          s.stopPropagation(), !(r && !a) && Z7(t);
        },
        onClick: s => {
          s.stopPropagation(), !(r && !a) && o();
        },
        title: x(a ? i ? "正在连接导演会话" : "发送当前提示词作为导演指令" : r ? "生成中" : "生成"),
        children: r && !a ? c.jsx(Ua, {
          size: 16,
          className: "animate-spin",
          "aria-hidden": !0
        }) : i ? c.jsx(Ua, {
          size: 16,
          className: "animate-spin",
          "aria-hidden": !0
        }) : c.jsx(Gc, {
          size: 16,
          strokeWidth: 2.5,
          "aria-hidden": !0
        })
      })
    });
  }),
  o2o = 52;

function s2o(e) {
  window.dispatchEvent(new CustomEvent("qiaodoumayi-edit-node-label", {
    detail: {
      nodeId: e
    }
  }));
}

function l2o({
  nodeId: e,
  isSelected: t,
  isDark: n,
  canvasZoomMediaOpacity: r,
  canPreview: a,
  onPreview: i,
  onDownload: o
}) {
  on();
  const s = Ia.useRef(null);
  Qp(s, "50% 100%", !0);
  const l = $P(n);
  return c.jsx("div", {
    className: "absolute left-1/2 bottom-full z-[120] -translate-x-1/2 transition-opacity duration-200 ease-out",
    "data-three-d-node-toolbar": "",
    onDoubleClick: d => {
      d.preventDefault(), d.stopPropagation();
    },
    style: {
      marginBottom: `${o2o}px`,
      opacity: r,
      pointerEvents: t ? "auto" : "none"
    },
    children: c.jsx("div", {
      ref: s,
      style: {
        transition: "none",
        willChange: "transform"
      },
      children: c.jsx("div", {
        className: `transition-all duration-150 ${t ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-1 scale-[0.98] pointer-events-none"}`,
        onClick: d => d.stopPropagation(),
        onPointerDown: d => d.stopPropagation(),
        onMouseDown: d => d.stopPropagation(),
        children: c.jsxs("div", {
          "data-canvas-float-toolbar": "",
          className: UP(n),
          children: [c.jsx("button", {
            type: "button",
            className: `${l} disabled:opacity-40`,
            "data-tip": x("预览"),
            disabled: !a,
            onClick: d => {
              d.stopPropagation(), i(d);
            },
            children: c.jsx(kT, {
              size: 16
            })
          }), c.jsx("button", {
            type: "button",
            className: l,
            "data-tip": x("标签"),
            onClick: d => {
              d.stopPropagation(), s2o(e);
            },
            children: c.jsx(MNr, {
              size: 16
            })
          }), c.jsx("button", {
            type: "button",
            className: `${l} disabled:opacity-40`,
            "data-tip": x("下载"),
            disabled: !a,
            onClick: d => {
              d.stopPropagation(), o(d);
            },
            children: c.jsx(ws, {
              size: 16
            })
          })]
        })
      })
    })
  });
}

const c2o = {
  x: 0,
  y: 0,
  zoom: 1
};

function d2o({
  node: e,
  nodes: t,
  connections: n,
  isDark: r,
  view: a = c2o,
  selectedNodeId: i,
  setSelectedNodeId: o,
  setSelectedNodeIds: s,
  setConnections: l,
  updateNode: d,
  enableGenerationNodeAnimation: u = !0,
  onStartCompactRefCanvasPick: h,
  compactRefCanvasPickTargetId: p = null,
  globalApiKey: m = "",
  apiConfigs: f = [],
  isModelHiddenInList: y,
  setHistory: b,
  generateId: v
}) {
  var he;
  on();
  const _ = i === e.id,
    [w, k] = g.useState(_),
    [A, S] = g.useState(""),
    [C, I] = g.useState(null),
    E = g.useRef(null),
    M = g.useRef(null),
    T = g.useRef(_),
    P = g.useRef(null),
    R = g.useRef(null),
    j = g.useRef(null),
    B = g.useRef(null),
    F = g.useRef(null),
    N = g.useRef(null),
    G = g.useRef(null),
    z = p === e.id,
    V = w && !p,
    O = dEe(a, V),
    L = yI({
      hostRef: M,
      open: V,
      zoom: O.zoom,
      remeasureKey: `${Math.round(O.x)}:${Math.round(O.y)}`
    }),
    D = xIe(e.settings),
    U = l9t(D.meta, D.outputType),
    H = Mzt({
      node: e,
      meta: D.meta
    }) || U.renderedImageUrl || U.thumbnailUrl,
    Y = g.useMemo(() => P0r(e.id, n, t), [n, e.id, t]),
    K = g.useMemo(() => {
      const ue = new Map(t.map(_e => [_e.id, _e])),
        ge = [];
      for (const _e of n) {
        if (_e.to !== e.id) continue;
        const ke = ue.get(_e.from);
        if (!ke) continue;
        const ve = typeof ke.content == "string" ? ke.content.trim() : "";
        ve && (ke.type === "input-image" || ke.type === "gen-image" || ke.type === "preview" || ke.type === "fal-rembg" || ke.type === "topaz-upscale" || ke.type === "jimeng-super-resolution" || ke.type === "virtual-try-on") && ge.push({
          sourceId: ke.id,
          url: ve
        });
      }
      return ge;
    }, [n, e.id, t]),
    W = PKe(D.model),
    Q = RKe(D.model),
    q = n9t(D.model),
    ne = g.useMemo(() => FLn({
      apiConfigs: f,
      currentModel: D.model,
      isModelHidden: y
    }), [f, y, D.model]),
    de = g.useMemo(() => NKe({
      apiConfigs: f,
      currentModel: D.model,
      isModelHidden: y
    }), [f, y, D.model]),
    le = ne.find(ue => ue.id === D.model) ?? ne[0],
    J = de.find(ue => ue.id === D.model) ?? de[0],
    pe = rve.find(ue => ue.id === D.material) ?? rve[0],
    ce = ave.find(ue => ue.id === D.inputImageType) ?? ave[0],
    we = e.errorMsg || A,
    X = `node-dropdown-button flex shrink-0 items-center whitespace-nowrap rounded border px-2 py-1 text-[13px] font-medium ${r ? "border-transparent bg-transparent text-white hover:bg-white/5" : "border-transparent bg-transparent text-gray-900 hover:bg-black/5"}`;
  Ia.useEffect(() => {
    _ && !T.current && k(!0), _ || k(!1), T.current = _;
  }, [_]), Ia.useEffect(() => (Dd(e.id, V), () => Dd(e.id, !1)), [V, e.id]), Ia.useEffect(() => {
    V || I(null);
  }, [V]);
  const Z = g.useCallback(() => {
    k(!1), I(null), Dd(e.id, !1);
  }, [e.id]);
  Ia.useEffect(() => {
    if (!V) return;
    const ue = ge => {
      var ve;
      const _e = ge.target;
      if (!_e || (ve = E.current) != null && ve.contains(_e)) return;
      const ke = _e instanceof Element ? _e : _e.parentElement;
      ke != null && ke.closest("[data-gen-node-portal-dropdown], .node-dropdown-menu") || bW(_e) || Z();
    };
    return window.addEventListener("pointerdown", ue, !0), () => window.removeEventListener("pointerdown", ue, !0);
  }, [Z, V]);
  const re = g.useCallback(ue => {
      const ge = typeof ue.model == "string" ? r9t(ue.model) : D.model;
      d(e.id, {
        settings: {
          ...(e.settings || {}),
          ...ue,
          model: ge,
          threeDOutputType: vIe(ge),
          isPano: (ue.threeDInputImageType ?? D.inputImageType) === "pano"
        }
      });
    }, [e.id, e.settings, D.inputImageType, D.model, d]),
    fe = g.useCallback(() => {
      if (!D.meta) {
        k(!0);
        return;
      }
      const ue = CDt({
        sourceKind: HLn(D.meta, D.outputType),
        sourceMeta: D.meta,
        sourceNodeId: e.id,
        title: e.nodeName || D.meta.display_name || "3D"
      });
      ue && nJ(ue);
    }, [e.id, e.nodeName, D.meta, D.outputType]),
    ye = g.useCallback(async () => {
      S("");
      const ue = await R0r({
        node: e,
        nodes: t,
        connections: n,
        apiConfigs: f,
        globalApiKey: m,
        updateNode: d,
        setHistory: b,
        generateId: v,
        modelLabel: le == null ? void 0 : le.label
      });
      ue && S(ue);
    }, [f, n, le == null ? void 0 : le.label, v, m, e, t, b, d]),
    ie = g.useCallback(async ue => {
      if (ue.preventDefault(), ue.stopPropagation(), !D.meta) return;
      const ge = Uv("正在下载 3D 模型…", 0);
      try {
        const {
            saveToDisk: _e
          } = await Ie(async () => {
            const {
              saveToDisk: Te
            } = await Promise.resolve().then(() => Sde);
            return {
              saveToDisk: Te
            };
          }, void 0, import.meta.url),
          ke = Pzt(D.meta, e.settings, D.meta.source_url),
          ve = await w0r(ke && ke !== D.meta.source_url ? {
            ...D.meta,
            source_url: ke,
            source_format: D.meta.source_format || "glb"
          } : D.meta, e.nodeName || D.meta.display_name || "3D模型", {
            onProgress: ({
              percent: Te,
              label: Ne
            }) => {
              Q2e(ge, {
                message: Ne,
                progress: Te
              });
            }
          });
        Q2e(ge, {
          message: "正在保存 3D 模型…",
          progress: 96
        }), await _e(ve.blob, ve.fileName), gg(ge), Vs("3D 模型已保存到下载文件夹");
      } catch (_e) {
        gg(ge);
        const ke = _e instanceof Error ? _e.message : "3D 模型下载失败";
        S(ke), qi(ke);
      }
    }, [e.nodeName, e.settings, D.meta]),
    ae = g.useCallback(() => {
      h == null || h(e.id, "default");
    }, [e.id, h]),
    be = g.useCallback((ue, ge) => {
      ge.preventDefault(), ge.stopPropagation(), l == null || l(_e => _e.filter(ke => !(ke.to === e.id && ke.from === ue)));
    }, [e.id, l]),
    Ee = g.useCallback(ue => {
      I(ge => ge === ue ? null : ue);
    }, []),
    xe = ue => `w-full flex items-center gap-2 rounded-lg px-2 py-[7px] text-left transition-colors ${r ? "hover:bg-white/[0.06] text-zinc-300" : "hover:bg-zinc-100 text-zinc-700"} ${ue ? r ? "bg-white/[0.08] text-white" : "bg-zinc-100 text-zinc-900" : ""}`;
  return c.jsxs("div", {
    ref: E,
    className: "relative flex h-full w-full flex-col overflow-visible",
    children: [_ && U.hasContent ? c.jsx(l2o, {
      nodeId: e.id,
      isSelected: _,
      isDark: r,
      canvasZoomMediaOpacity: 1,
      canPreview: U.hasContent,
      onPreview: ue => {
        ue.preventDefault(), fe();
      },
      onDownload: ue => {
        ie(ue);
      }
    }) : null, c.jsxs("div", {
      className: `relative h-full w-full overflow-hidden rounded-2xl ${Sp(r)}`,
      style: {
        minHeight: jLn.height
      },
      onPointerDown: ue => {
        ue.button !== 0 || ue.ctrlKey || ue.metaKey || U.hasContent || k(!0);
      },
      children: [c.jsx(mFi, {
        hasContent: U.hasContent,
        isObject: U.isObject,
        isDark: r,
        renderedImageUrl: H,
        thumbnailUrl: H || U.thumbnailUrl,
        title: e.nodeName || "3D",
        onOpenPreview: fe
      }), e.isGenerating && u ? c.jsx("div", {
        className: "absolute inset-0 z-[60] overflow-hidden pointer-events-none",
        "aria-hidden": !0,
        children: c.jsx(Yv, {
          seed: e.id,
          progressFillRef: N,
          progressThinBarRef: G,
          isDark: r
        })
      }) : null, we ? c.jsx("div", {
        className: "absolute bottom-2 left-2 right-2 z-20 rounded-lg bg-black/55 px-2 py-1 text-[11px] text-red-300",
        children: we
      }) : null]
    }), c.jsx("div", {
      ref: M,
      "data-gen-prompt-panel-host": !0,
      "data-gen-prompt-panel": "true",
      "data-floating-placement": L.offset.placement,
      className: `${wD}${V ? "" : " hidden"}`,
      style: {
        ...zVe,
        ...L.style
      },
      onMouseDown: ue => {
        ue.stopPropagation(), zb(e.id, o, s, 500, {
          forceSingle: !0
        });
      },
      onWheel: ue => ue.stopPropagation(),
      children: c.jsxs("div", {
        "data-gen-prompt-panel": "true",
        className: `gen-prompt-panel-enter box-border flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border px-3 pb-2 pt-3 ${r ? `${W4e} text-zinc-100` : `${q4e} text-zinc-900`}`,
        children: [c.jsx("div", {
          className: "grid w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-1 pt-2.5 pl-2.5 pr-1",
          children: c.jsxs("div", {
            className: "flex min-w-0 flex-nowrap items-center gap-1.5",
            children: [c.jsx(pZe, {
              isDark: r,
              active: z,
              title: x("从画布选择参考图"),
              onClick: ae
            }), K.map(ue => c.jsxs("div", {
              className: "relative h-9 w-9 shrink-0",
              children: [c.jsx("img", {
                src: ue.url,
                alt: "",
                className: `h-9 w-9 rounded-md border object-cover ${r ? "border-white/15" : "border-zinc-200"}`
              }), c.jsx("button", {
                type: "button",
                title: x("移除参考图"),
                onMouseDown: ge => ge.stopPropagation(),
                onClick: ge => be(ue.sourceId, ge),
                className: `absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full ${r ? "bg-black/80 text-white" : "bg-white text-zinc-700 shadow"}`,
                children: c.jsx(Na, {
                  size: 10
                })
              })]
            }, ue.sourceId))]
          })
        }), c.jsx("div", {
          className: "group/prompt relative z-0 mb-1 min-w-0 shrink-0 overflow-hidden",
          children: c.jsx("div", {
            className: "flex w-full min-w-0 flex-col overflow-hidden bg-transparent px-2 py-1",
            children: c.jsx(cEe, {
              nodeId: e.id,
              nodeType: e.type,
              value: e.prompt || "",
              onChange: ue => {
                ue !== (e.prompt || "") && d(e.id, {
                  prompt: ue
                });
              },
              placeholder: x("输入提示词..."),
              isDark: r,
              compactFloatingPromptPanel: !0,
              promptExpanded: !!((he = e.settings) != null && he.promptInputExpanded),
              onPromptExpandedChange: ue => d(e.id, {
                settings: {
                  ...(e.settings || {}),
                  promptInputExpanded: ue
                }
              }),
              onCmdEnterSubmit: () => {
                e.isGenerating || ye();
              },
              disabled: !!e.isGenerating
            })
          })
        }), c.jsxs("div", {
          "data-node-header-toolbar": !0,
          "data-qiaodoumayi-gen-toolbar": "true",
          className: "qiaodoumayi-gen-toolbar relative flex min-h-[36px] w-full min-w-0 shrink-0 flex-nowrap items-center justify-start overflow-visible",
          children: [c.jsxs("div", {
            className: "relative overflow-visible shrink-0",
            "data-model-select-area": !0,
            children: [c.jsxs("button", {
              ref: P,
              type: "button",
              "data-qiaodoumayi-gen-model": "true",
              title: le.description || le.label,
              onMouseDown: ue => {
                ue.preventDefault(), ue.stopPropagation();
              },
              onClick: ue => {
                ue.preventDefault(), ue.stopPropagation(), Ee("model");
              },
              className: `node-dropdown-button flex items-center gap-1 rounded border py-1 pl-1 pr-1 text-[13px] font-medium ${r ? "border-white/30 bg-transparent text-white hover:bg-white/5" : "border-gray-300 bg-transparent text-gray-900 hover:bg-black/5"}`,
              children: [c.jsx(Mp, {
                modelId: D.model,
                kind: "image",
                isDark: r,
                config: f.find(ue => ue.id === D.model),
                isHidden: y == null ? void 0 : y(D.model),
                size: 13,
                fallback: c.jsx(Hm, {
                  size: 13,
                  className: "shrink-0",
                  "aria-hidden": !0
                })
              }), c.jsx("span", {
                className: "min-w-0 truncate font-medium leading-none",
                children: x(le.label)
              })]
            }), c.jsx(Tv, {
              open: C === "model",
              anchorRef: P,
              isDark: r,
              className: "rounded-xl",
              menuWidth: 220,
              maxHeight: 320,
              placement: "above",
              scrollToSelectedKey: D.model,
              orderedOptionKeys: ne.map(ue => ue.id),
              children: ne.map(ue => c.jsx("button", {
                type: "button",
                ...(D.model === ue.id ? {
                  [Md]: "true"
                } : {}),
                [qk]: ue.id,
                onClick: () => {
                  re({
                    model: ue.id
                  }), I(null);
                },
                className: xe(D.model === ue.id),
                children: c.jsxs("span", {
                  className: "flex min-w-0 items-center gap-2 leading-none",
                  children: [c.jsx(Mp, {
                    modelId: ue.id,
                    kind: "image",
                    isDark: r,
                    size: 14,
                    fallback: c.jsx(Hm, {
                      size: 14,
                      className: "shrink-0",
                      "aria-hidden": !0
                    })
                  }), c.jsx("span", {
                    className: "self-center whitespace-nowrap text-[12px] font-medium leading-none",
                    children: ue.label
                  })]
                })
              }, ue.id))
            })]
          }), q || W || Q ? c.jsxs("div", {
            className: "qiaodoumayi-gen-size-beside-model relative flex shrink-0 items-center gap-1 overflow-visible",
            children: [c.jsx("span", {
              className: "qiaodoumayi-gen-model-size-divider",
              "aria-hidden": !0
            }), q ? c.jsxs(c.Fragment, {
              children: [c.jsx("button", {
                ref: R,
                type: "button",
                title: (J == null ? void 0 : J.hint) || x("混元档位"),
                onMouseDown: ue => ue.stopPropagation(),
                onClick: ue => {
                  ue.stopPropagation(), Ee("variant");
                },
                className: `${X} gap-1.5 font-medium leading-none`,
                children: (J == null ? void 0 : J.label) || "Pro"
              }), c.jsx(Tv, {
                open: C === "variant",
                anchorRef: R,
                isDark: r,
                className: "rounded-xl",
                menuWidth: 140,
                placement: "above",
                children: de.map(ue => c.jsx("button", {
                  type: "button",
                  onClick: () => {
                    re({
                      model: ue.id
                    }), I(null);
                  },
                  className: xe(D.model === ue.id),
                  children: c.jsx("span", {
                    className: "self-center whitespace-nowrap text-[12px] font-medium leading-none",
                    children: x(ue.label)
                  })
                }, ue.id))
              }), W || Q ? c.jsx("span", {
                className: "qiaodoumayi-gen-model-size-divider",
                "aria-hidden": !0
              }) : null]
            }) : null, W ? c.jsxs(c.Fragment, {
              children: [c.jsx("button", {
                ref: j,
                type: "button",
                title: x(jRe),
                onMouseDown: ue => ue.stopPropagation(),
                onClick: ue => {
                  ue.stopPropagation(), Ee("material");
                },
                className: `${X} gap-1.5 font-medium leading-none`,
                children: x(pe.label)
              }), Q ? c.jsx("span", {
                className: "qiaodoumayi-gen-model-size-divider",
                "aria-hidden": !0
              }) : null, c.jsx(Tv, {
                open: C === "material",
                anchorRef: j,
                isDark: r,
                className: "rounded-xl",
                menuWidth: 140,
                placement: "above",
                children: rve.map(ue => c.jsx("button", {
                  type: "button",
                  onClick: () => {
                    re({
                      threeDMaterial: ue.id
                    }), I(null);
                  },
                  className: xe(D.material === ue.id),
                  children: c.jsx("span", {
                    className: "self-center whitespace-nowrap text-[12px] font-medium leading-none",
                    children: x(ue.label)
                  })
                }, ue.id))
              })]
            }) : null, Q ? c.jsxs(c.Fragment, {
              children: [c.jsx("button", {
                ref: B,
                type: "button",
                title: x("输入图类型"),
                onMouseDown: ue => ue.stopPropagation(),
                onClick: ue => {
                  ue.stopPropagation(), Ee("input");
                },
                className: `${X} font-medium leading-none`,
                children: x(ce.label)
              }), c.jsx(Tv, {
                open: C === "input",
                anchorRef: B,
                isDark: r,
                className: "rounded-xl",
                menuWidth: 120,
                placement: "above",
                children: ave.map(ue => c.jsx("button", {
                  type: "button",
                  onClick: () => {
                    re({
                      threeDInputImageType: ue.id
                    }), I(null);
                  },
                  className: xe(D.inputImageType === ue.id),
                  children: c.jsx("span", {
                    className: "self-center whitespace-nowrap text-[12px] font-medium leading-none",
                    children: x(ue.label)
                  })
                }, ue.id))
              })]
            }) : null]
          }) : null, c.jsxs("div", {
            className: "qiaodoumayi-gen-params-fold relative",
            "data-gen-params-fold": "true",
            children: [c.jsx("button", {
              ref: F,
              type: "button",
              title: x("更多设置"),
              "aria-expanded": C === "more",
              onMouseDown: ue => ue.stopPropagation(),
              onClick: ue => {
                ue.stopPropagation(), Ee("more");
              },
              className: `${X} qiaodoumayi-gen-params-fold-trigger`,
              children: c.jsx(hw, {
                size: 14,
                strokeWidth: 2,
                className: "qiaodoumayi-gen-params-fold-icon"
              })
            }), c.jsx(Tv, {
              open: C === "more",
              anchorRef: F,
              isDark: r,
              className: "rounded-xl",
              menuWidth: 240,
              placement: "above",
              children: c.jsx("div", {
                className: `px-2 py-2 text-[11px] leading-5 ${r ? "text-zinc-400" : "text-zinc-500"}`,
                children: KWe(D.model) ? x("请先用 Pro / Rapid 生成一个 3D 模型，再点生成优化拓扑。") : UY(D.model) ? c.jsxs(c.Fragment, {
                  children: [x(jRe), c.jsx("div", {
                    className: "mt-1",
                    children: x("可从左侧连入参考图，或只写提示词。1 张走图生 3D，2～4 张按前/左/后/右走多视角。")
                  })]
                }) : c.jsxs(c.Fragment, {
                  children: [x(jRe), c.jsx("div", {
                    className: "mt-1",
                    children: x("可从左侧连入参考图，或只写提示词。Pro 支持多视角。")
                  })]
                })
              })
            })]
          }), c.jsx(XIe, {
            className: "ml-0.5",
            kind: "image",
            value: e.prompt || "",
            onChange: ue => {
              ue !== (e.prompt || "") && d(e.id, {
                prompt: ue
              });
            },
            isDark: r,
            scopeId: e.id,
            mediaCount: Y.length,
            disabled: !!e.isGenerating
          }), c.jsx(JIe, {
            className: "ml-0.5",
            nodeId: e.id,
            value: e.prompt || "",
            onChange: ue => {
              ue !== (e.prompt || "") && d(e.id, {
                prompt: ue
              });
            },
            isDark: r,
            disabled: !!e.isGenerating
          }), c.jsx(u1r, {
            nodeId: e.id,
            isDark: r,
            isGeneratingUi: !!e.isGenerating,
            directorActive: !1,
            directorConnecting: !1,
            onGenerate: () => {
              ye();
            }
          })]
        })]
      })
    })]
  });
}

function u2o({
  node: e,
  viewZoom: t = 1
}) {
  const [n, r] = g.useState(!1),
    a = xIe(e.settings),
    i = a.sourceSnapshot || a.meta,
    o = g.useCallback(() => {
      if (!i || !kX(i)) {
        window.dispatchEvent(new CustomEvent("aiyouplus-open-local", {detail: {tab: "world"}}));
        return;
      }
      r(!0), nJ(TEa({
        studioNodeId: e.id,
        sourceNodeId: a.sourceNodeId || e.id,
        sourceKind: a.sourceKind || "world-scene",
        sourceSnapshot: i,
        title: e.nodeName || i.display_name || "3D Studio"
      })), window.setTimeout(() => r(!1), 400);
    }, [e.id, e.nodeName, i, a.sourceKind, a.sourceNodeId]);
  return c.jsx("div", {
    className: "h-full w-full overflow-hidden rounded-2xl bg-[#0D0D0D]",
    children: c.jsx(fFi, {
      entering: n,
      onEnterStudio: o,
      zoom: t
    })
  });
}

function h2o({
  props: e,
  contentServices: t,
  displayQuality: n
}) {
  const {
      node: r
    } = e,
    {
      presentation: a,
      interaction: i
    } = gEe(t);
  switch (r.type) {
    case "motion-control":
      return TM(n, r, i.selectedNodeId, e.boxSelectLightShell, e.focusEditActiveSourceNodeId, {
        selectedNodeIds: i.selectedNodeIds,
        genPromptPanelOpen: N7(r.id)
      }) ? c.jsx(az, {
        node: r,
        isDark: a.isDark,
        setNodes: e.setNodes,
        boxSelectLightShell: e.boxSelectLightShell,
        enableGenerationNodeAnimation: e.enableGenerationNodeAnimation
      }) : c.jsx(Two, {
        node: r,
        nodes: e.nodes,
        connections: e.connections,
        view: a.view,
        isDark: a.isDark,
        updateNode: e.updateNode,
        generate: e.generate,
        generateId: e.generateId,
        setNodes: e.setNodes,
        setConnections: e.setConnections,
        apiConfigs: e.apiConfigs,
        apiStatus: e.apiStatus,
        globalApiKey: e.globalApiKey,
        klingSubjectLibrary: e.klingSubjectLibrary,
        setKlingSubjectsOpen: e.setKlingSubjectsOpen,
        selectedNodeId: i.selectedNodeId,
        setSelectedNodeId: e.setSelectedNodeId,
        setSelectedNodeIds: e.setSelectedNodeIds,
        onGenPromptPanelUiChange: e.onGenPromptPanelUiChange,
        enableGenerationNodeAnimation: e.enableGenerationNodeAnimation,
        documentSession: e.documentSession
      });
    case "video-relight":
      return TM(n, r, i.selectedNodeId, e.boxSelectLightShell, e.focusEditActiveSourceNodeId, {
        selectedNodeIds: i.selectedNodeIds,
        genPromptPanelOpen: N7(r.id)
      }) ? c.jsx(az, {
        node: r,
        isDark: a.isDark,
        setNodes: e.setNodes,
        boxSelectLightShell: e.boxSelectLightShell,
        enableGenerationNodeAnimation: e.enableGenerationNodeAnimation
      }) : c.jsx(Nwo, {
        node: r,
        nodes: e.nodes,
        connections: e.connections,
        isDark: a.isDark,
        updateNode: e.updateNode,
        setNodes: e.setNodes,
        generateId: e.generateId,
        globalApiKey: e.globalApiKey,
        setHistory: e.setHistory,
        selectedNodeId: i.selectedNodeId,
        setSelectedNodeId: e.setSelectedNodeId,
        setSelectedNodeIds: e.setSelectedNodeIds,
        onGenPromptPanelUiChange: e.onGenPromptPanelUiChange,
        enableGenerationNodeAnimation: e.enableGenerationNodeAnimation
      });
    case "camera-movement":
      return c.jsx(Lwo, {
        node: r,
        nodes: e.nodes,
        connections: e.connections,
        isDark: a.isDark,
        updateNode: e.updateNode
      });
    case "professional-camera":
      return c.jsx(Fwo, {
        node: r,
        isDark: a.isDark,
        updateNode: e.updateNode
      });
    case "gen-music":
      return c.jsx(exo, {
        node: r,
        isDark: a.isDark,
        view: a.view,
        updateNode: e.updateNode,
        setHistory: e.setHistory,
        apiConfigs: e.apiConfigs,
        globalApiKey: e.globalApiKey,
        generateId: e.generateId,
        generate: e.generate,
        connections: e.connections,
        nodes: e.nodes,
        setSelectedNodeId: e.setSelectedNodeId,
        setSelectedNodeIds: e.setSelectedNodeIds,
        enableGenerationNodeAnimation: e.enableGenerationNodeAnimation,
        onStartCompactRefCanvasPick: e.onStartCompactRefCanvasPick,
        compactRefCanvasPickTargetId: e.compactRefCanvasPickTargetId
      });
    case "gen-speech":
      return c.jsx(ixo, {
        node: r,
        isDark: a.isDark,
        view: a.view,
        updateNode: e.updateNode,
        apiConfigs: e.apiConfigs,
        globalApiKey: e.globalApiKey,
        generate: e.generate,
        connections: e.connections,
        nodes: e.nodes,
        setConnections: e.setConnections,
        setSelectedNodeId: e.setSelectedNodeId,
        setSelectedNodeIds: e.setSelectedNodeIds,
        enableGenerationNodeAnimation: e.enableGenerationNodeAnimation,
        onStartCompactRefCanvasPick: e.onStartCompactRefCanvasPick,
        compactRefCanvasPickTargetId: e.compactRefCanvasPickTargetId
      });
    case "custom-agent":
      return c.jsx(yxo, {
        node: r,
        isDark: a.isDark,
        updateNode: e.updateNode,
        connections: e.connections,
        nodes: e.nodes,
        apiConfigs: e.apiConfigs,
        globalApiKey: e.globalApiKey,
        getConnectedInputImages: e.getConnectedInputImages,
        getConnectedInputItems: e.getConnectedInputItems,
        getOrderedInputItems: e.getOrderedInputItems,
        promptLibrary: e.promptLibrary,
        setPromptLibrary: e.setPromptLibrary,
        setNodes: e.setNodes,
        setConnections: e.setConnections,
        generateId: e.generateId,
        view: a.view,
        canvasRef: e.canvasRef,
        connectingSource: e.connectingSource,
        connectingTarget: e.connectingTarget,
        connectingInputType: e.connectingInputType,
        setConnectingSource: e.setConnectingSource,
        setConnectingTarget: e.setConnectingTarget,
        setConnectingInputType: e.setConnectingInputType,
        setMousePos: e.setMousePos,
        getConnectedImageForInput: e.getConnectedImageForInput,
        dataVersion: e.dataVersion,
        activeDropdown: e.activeDropdown,
        setActiveDropdown: e.setActiveDropdown
      });
    case "canvas-node":
      return c.jsx(kxo, {
        node: r,
        isDark: a.isDark,
        updateNode: e.updateNode,
        deleteNode: e.deleteNode,
        viewZoom: a.view.zoom,
        connections: e.connections,
        nodes: e.nodes,
        setNodes: e.setNodes,
        setConnections: e.setConnections,
        generateId: e.generateId,
        selectedNodeId: i.selectedNodeId
      });
    case "rh-app":
      return c.jsx(Nxo, {
        node: r,
        isDark: a.isDark,
        updateNode: e.updateNode,
        connections: e.connections,
        nodes: e.nodes,
        getConnectedInputImages: e.getConnectedInputImages,
        getConnectedTextForInput: e.getConnectedTextForInput,
        dataVersion: e.dataVersion,
        setHistory: e.setHistory,
        setNodes: e.setNodes,
        setConnections: e.setConnections,
        setConnectingTarget: e.setConnectingTarget,
        setConnectingInputType: e.setConnectingInputType,
        setConnectingSource: e.setConnectingSource,
        connectingSource: e.connectingSource,
        setMousePos: e.setMousePos,
        canvasRef: e.canvasRef,
        view: a.view,
        generateId: e.generateId,
        onSaveToRhLibrary: e.onSaveToRhLibrary
      });
    case "table-editor-node":
      return c.jsx(e2o, {
        node: r,
        isDark: a.isDark,
        nodes: e.nodes,
        connections: e.connections,
        updateNode: e.updateNode,
        apiConfigs: e.apiConfigs,
        globalApiKey: e.globalApiKey,
        dataVersion: e.dataVersion,
        activeDropdown: e.activeDropdown,
        setActiveDropdown: e.setActiveDropdown
      });
    case "rh-comfy":
      return c.jsx(Kxo, {
        node: r,
        isDark: a.isDark,
        updateNode: e.updateNode,
        connections: e.connections,
        nodes: e.nodes,
        getConnectedInputImages: e.getConnectedInputImages,
        dataVersion: e.dataVersion,
        setHistory: e.setHistory,
        setNodes: e.setNodes,
        setConnections: e.setConnections,
        generateId: e.generateId,
        onSaveWorkflowToLibrary: e.onSaveWorkflowToLibrary
      });
    case "doodle-canvas":
      return c.jsx(r2o, {
        node: r,
        isDark: a.isDark,
        updateNode: e.updateNode,
        setNodes: e.setNodes,
        nodes: e.nodes,
        generateId: e.generateId,
        onDrawingChange: e.onDoodleDrawingChange ? o => {
          var s;
          return (s = e.onDoodleDrawingChange) == null ? void 0 : s.call(e, o ? r.id : null);
        } : void 0
      });
    case "director-3d":
      return c.jsx(i2o, {
        node: r,
        isDark: a.isDark,
        onOpenDirector3D: e.onOpenDirector3D
      });
    case "gen-3d":
      return c.jsx(d2o, {
        node: r,
        nodes: e.nodes,
        connections: e.connections,
        isDark: a.isDark,
        view: a.view,
        selectedNodeId: i.selectedNodeId,
        setSelectedNodeId: e.setSelectedNodeId,
        setSelectedNodeIds: e.setSelectedNodeIds,
        setConnections: e.setConnections,
        updateNode: e.updateNode,
        enableGenerationNodeAnimation: e.enableGenerationNodeAnimation,
        onStartCompactRefCanvasPick: e.onStartCompactRefCanvasPick,
        compactRefCanvasPickTargetId: e.compactRefCanvasPickTargetId,
        globalApiKey: e.globalApiKey,
        apiConfigs: e.apiConfigs,
        isModelHiddenInList: e.isModelHiddenInList,
        setHistory: e.setHistory,
        generateId: e.generateId
      });
    case "three-d-studio":
      return c.jsx(u2o, {
        node: r,
        isDark: a.isDark,
        viewZoom: a.view.zoom
      });
    default:
      return null;
  }
}

const p2o = Object.freeze(Object.defineProperty({
    __proto__: null,
    IntegrationNodesGroup: h2o
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  m2o = {
    width: 66,
    height: 66
  };

function f2o(e, t) {
  if (!Number.isFinite(e) || !Number.isFinite(t) || e <= 0 || t <= 0) return m2o;
  const n = e / t;
  return n > 1.05 ? {
    width: 112,
    height: Math.max(54, Math.min(92, Math.round(112 / n)))
  } : n < .95 ? {
    width: Math.max(54, Math.min(92, Math.round(104 * n))),
    height: 104
  } : {
    width: 78,
    height: 78
  };
}

const Wne = 180,
  $yn = 420,
  g2o = 520,
  y2o = "qiaodoumayi_project_memory_graph_positions_v1";

function b2o(e, t) {
  return e === "mindmap" ? Array.from({
    length: t
  }, (n, r) => ({
    x: -220,
    y: (r - (t - 1) / 2) * 220
  })) : Array.from({
    length: t
  }, (n, r) => {
    const a = -Math.PI / 2 + Math.PI * 2 * r / t;
    return {
      x: Math.cos(a) * 210,
      y: Math.sin(a) * 210
    };
  });
}

function v2o(e, t, n) {
  const r = e === "mindmap" ? {
      x: -560,
      y: 0
    } : {
      x: 0,
      y: 0
    },
    a = new Map(),
    i = new Map(),
    o = new Map(),
    s = [],
    l = b2o(e, t.length);
  return t.forEach((d, u) => {
    const h = l[u];
    a.set(d.id, h), s.push({
      id: `center:${d.id}`,
      from: r,
      to: h,
      fromKey: "center",
      toKey: `category:${d.id}`,
      category: d.id
    });
    const p = n.filter(m => m.category === d.id);
    p.forEach((m, f) => {
      let y;
      if (e === "mindmap") y = {
        x: 150,
        y: h.y + (f - (p.length - 1) / 2) * 106
      };else {
        const b = h.x - r.x,
          v = h.y - r.y,
          _ = Math.max(1, Math.hypot(b, v)),
          w = b / _,
          k = v / _,
          A = -k,
          S = w,
          C = (f - (p.length - 1) / 2) * 150;
        y = {
          x: h.x + w * 285 + A * C,
          y: h.y + k * 285 + S * C
        };
      }
      i.set(m.id, y), s.push({
        id: `category:${m.id}`,
        from: h,
        to: y,
        fromKey: `category:${d.id}`,
        toKey: `memory:${m.id}`,
        category: d.id,
        itemId: m.id
      }), m.evidence.forEach((b, v) => {
        let _;
        if (e === "mindmap") _ = {
          x: 560,
          y: y.y + (v - (m.evidence.length - 1) / 2) * 90
        };else {
          const k = y.x - r.x,
            A = y.y - r.y,
            S = Math.max(1, Math.hypot(k, A)),
            C = k / S,
            I = A / S,
            E = -I,
            M = C;
          _ = {
            x: y.x + C * 220 + E * (v - (m.evidence.length - 1) / 2) * 90,
            y: y.y + I * 220 + M * (v - (m.evidence.length - 1) / 2) * 90
          };
        }
        const w = `${m.id}:${b.id}`;
        o.set(w, _), s.push({
          id: `evidence:${w}`,
          from: y,
          to: _,
          fromKey: `memory:${m.id}`,
          toKey: `evidence:${w}`,
          category: d.id,
          itemId: m.id
        });
      });
    });
  }), {
    center: r,
    category: a,
    memory: i,
    evidence: o,
    edges: s
  };
}

function w2o(e, t) {
  const n = t.center ?? e.center,
    r = new Map([...e.category].map(([l, d]) => [l, t[`category:${l}`] ?? d])),
    a = new Map([...e.memory].map(([l, d]) => [l, t[`memory:${l}`] ?? d])),
    i = new Map([...e.evidence].map(([l, d]) => [l, t[`evidence:${l}`] ?? d])),
    o = new Map([["center", n]]);
  r.forEach((l, d) => o.set(`category:${d}`, l)), a.forEach((l, d) => o.set(`memory:${d}`, l)), i.forEach((l, d) => o.set(`evidence:${d}`, l));
  const s = e.edges.map(l => ({
    ...l,
    from: o.get(l.fromKey) ?? l.from,
    to: o.get(l.toKey) ?? l.to
  }));
  return {
    center: n,
    category: r,
    memory: a,
    evidence: i,
    edges: s
  };
}

function Gyn(e, t) {
  if (t === "center") return e.center;
  if (t.startsWith("category:")) return e.category.get(t.slice(9));
  if (t.startsWith("memory:")) return e.memory.get(t.slice(7));
  if (t.startsWith("evidence:")) return e.evidence.get(t.slice(9));
}

function x2o(e, t) {
  if (t.itemId) return e.memory.get(t.itemId) ?? e.category.get(t.category) ?? {
    x: 0,
    y: 0
  };
  const n = e.category.get(t.category) ?? {
    x: 0,
    y: 0
  };
  return {
    x: n.x,
    y: n.y + 102
  };
}

function _2o(e, t) {
  const n = [e.center, ...e.category.values(), ...e.memory.values(), ...e.evidence.values(), ...(t ? [t] : [])],
    r = n.map(i => i.x),
    a = n.map(i => i.y);
  return {
    minX: Math.min(...r) - 170,
    minY: Math.min(...a) - 110,
    maxX: Math.max(...r) + 170,
    maxY: Math.max(...a) + 110
  };
}

function Vyn(e) {
  if (typeof localStorage > "u") return {};
  try {
    const n = JSON.parse(localStorage.getItem(y2o) || "{}")[e];
    if (!n || typeof n != "object") return {};
    const r = {};
    return Object.entries(n).slice(0, 2200).forEach(([a, i]) => {
      if (!i || typeof i != "object") return;
      const o = i;
      !Number.isFinite(o.x) || !Number.isFinite(o.y) || (r[a] = {
        x: Number(o.x),
        y: Number(o.y)
      });
    }), r;
  } catch {
    return {};
  }
}

function Hyn(e, t) {
  const n = t.x - e.x,
    r = Math.max(45, Math.abs(n) * .44),
    a = n >= 0 ? 1 : -1;
  return `M ${e.x} ${e.y} C ${e.x + r * a} ${e.y}, ${t.x - r * a} ${t.y}, ${t.x} ${t.y}`;
}

function k2o(e, t, n) {
  if (e < Wne) return null;
  const r = g2o / n.zoom,
    a = t.width / 2,
    i = t.height / 2;
  return {
    minX: (-a - n.x) / n.zoom - r,
    maxX: (a - n.x) / n.zoom + r,
    minY: (-i - n.y) / n.zoom - r,
    maxY: (i - n.y) / n.zoom + r
  };
}

function A2o(e, t) {
  return e === t ? !0 : !e || !t ? !1 : Math.abs(e.minX - t.minX) < 1 && Math.abs(e.maxX - t.maxX) < 1 && Math.abs(e.minY - t.minY) < 1 && Math.abs(e.maxY - t.maxY) < 1;
}

function LPe(e, t) {
  return !!(e && (!t || e.x >= t.minX && e.x <= t.maxX && e.y >= t.minY && e.y <= t.maxY));
}

function Wyn(e, t = "画布节点") {
  if (!e) return t;
  const n = e;
  return String(n.name || n.title || e.type || e.id).trim().slice(0, 80);
}

function nGe(e) {
  return /^(data:|blob:)/i.test(e);
}

function qyn(e) {
  if (!e) return "";
  const t = gd(xf(e));
  if (t && !nGe(t)) return t;
  const n = e.settings || {},
    r = [n._ossThumbnailUrl, e.thumbnailUrl, n._ossRemoteUrl];
  for (const a of r) {
    const i = gd(typeof a == "string" ? a : "");
    if (i && !nGe(i)) return i;
  }
  return "";
}

function odt(e, t) {
  const n = String(e || "").trim();
  return !n || nGe(n) || /^https?:\/\//i.test(n) && n.length > 96 ? t ? "来源已失效" : "图片" : t ? `${n} · 已失效` : n;
}

function WL(e) {
  return String(e || "").replace(/data:image\/[a-z0-9.+-]+;base64,[A-Za-z0-9+/=\s]+/gi, "[图片]");
}

function S2o(e) {
  switch (e) {
    case "brand":
      return c.jsx(ac, {
        size: 15
      });
    case "progress":
      return c.jsx($Rr, {
        size: 15
      });
    case "rules":
      return c.jsx(kNr, {
        size: 15
      });
    case "assets":
      return c.jsx(lo, {
        size: 15
      });
    case "user":
      return c.jsx(kU, {
        size: 15
      });
    case "workflow":
      return c.jsx(mZ, {
        size: 15
      });
    case "projects":
      return c.jsx(qRr, {
        size: 15
      });
    case "corrections":
      return c.jsx(SP, {
        size: 15
      });
    default:
      return c.jsx(rxe, {
        size: 15
      });
  }
}

function I2o(e) {
  switch (e) {
    case "brand":
      return "这个项目已经确认的品牌、风格或视觉方向……";
    case "progress":
      return "项目当前进展、已经完成的内容或下一步……";
    case "rules":
      return "Agent 在这个项目中需要长期遵守的规则……";
    case "assets":
      return "关键素材的用途、身份或与项目的关系……";
    case "user":
      return "描述你的身份、偏好或背景...";
    case "workflow":
      return "希望以后重复使用的工作流程、输出格式或做事顺序...";
    case "projects":
      return "跨项目都需要记住的项目关系...";
    case "corrections":
      return "需要以后避免重复的错误或纠正...";
    default:
      return "写下希望长期记住的内容...";
  }
}

function Kyn({
  isDark: e,
  projectId: t,
  nodes: n,
  history: r,
  selectedNodeIds: a,
  onFocusCanvasNode: i
}) {
  var Ye;
  on();
  const o = gyi(),
    s = Fra(),
    [l, d] = g.useState(null),
    [u, h] = g.useState(null),
    [p, m] = g.useState(!1),
    [f, y] = g.useState(new Set()),
    [b, v] = g.useState(null),
    [_, w] = g.useState(!1),
    [k, A] = g.useState(!1),
    [S, C] = g.useState("usage"),
    [I, E] = g.useState(null),
    [M, T] = g.useState({}),
    [P, R] = g.useState(null),
    j = g.useRef(null),
    B = g.useRef(null),
    F = g.useRef(null),
    N = g.useRef(!1),
    G = g.useRef(null),
    z = g.useRef(null),
    V = g.useRef(null),
    O = g.useRef(null),
    L = g.useRef(new Map()),
    D = g.useRef(null),
    U = g.useRef({
      x: 0,
      y: 0,
      zoom: .88
    }),
    H = g.useRef(null),
    Y = g.useRef(null),
    [memoryScope, setMemoryScope] = g.useState("personal"),
    memoryProjectId = String(t ?? "").trim(),
    hasMemoryProject = !!memoryProjectId && memoryProjectId !== "__unsaved__",
    K = memoryScope === "project" && hasMemoryProject ? "project" : "personal",
    W = s.layout[K],
    Q = K === "project" ? pzn : wRt,
    q = `${K}:${K === "project" ? jIe(memoryProjectId) : "__personal__"}:${W}`,
    [ne, de] = g.useState(() => {
      const Ce = eYt(q);
      return {
        [q]: Object.keys(Ce).length ? Ce : Vyn(q)
      };
    }),
    le = ne[q] ?? s.graphPositions[q] ?? {},
    J = g.useMemo(() => s.items.filter(Ce => Ce.scope === K && (K === "personal" || Ce.projectId === jIe(memoryProjectId))), [s.items, K, memoryProjectId]),
    pe = g.useMemo(() => J.filter(Ce => Ce.status !== "deleted"), [J]),
    ce = () => {
      if (pe.length < Wne) {
        R(Ve => Ve === null ? Ve : null);
        return;
      }
      const Ce = j.current;
      if (!Ce) return;
      const He = k2o(pe.length, {
        width: Ce.clientWidth,
        height: Ce.clientHeight
      }, U.current);
      R(Ve => A2o(Ve, He) ? Ve : He);
    },
    we = g.useMemo(() => new Set(J.filter(Ce => Ce.status !== "deleted").map(Ce => Ce.id)), [J]),
    X = g.useMemo(() => eaa({
      limit: 100
    }).filter(Ce => we.has(Ce.memoryId)), [s.usageRecords, we]),
    Z = g.useMemo(() => new Map(J.map(Ce => [Ce.id, Ce])), [J]),
    re = g.useMemo(() => [...new Set(X.map(Ce => Ce.memoryId))].map(Ce => Z.get(Ce)).filter(Boolean), [X, Z]);
  g.useEffect(() => {
    y(new Set()), m(!1), h(null);
  }, [t, K, o.scope]);
  const fe = Ce => y(He => {
      const Ve = new Set(He);
      return Ve.has(Ce) ? Ve.delete(Ce) : Ve.add(Ce), Ve;
    }),
    ye = (Ce, He = !1) => {
      const Ve = Ce.filter(it => f.has(it.id));
      return c.jsxs("div", {
        className: "project-memory-panel__batch-actions",
        children: [p ? c.jsxs(c.Fragment, {
          children: [c.jsx("button", {
            type: "button",
            onClick: () => y(it => {
              const It = new Set(it);
              for (const Ft of Ce) Ve.length === Ce.length ? It.delete(Ft.id) : It.add(Ft.id);
              return It;
            }),
            children: Ce.length > 0 && Ve.length === Ce.length ? x("取消全选") : x("全选")
          }), c.jsxs("button", {
            type: "button",
            className: "is-danger",
            disabled: !Ve.length,
            onClick: () => He ? v(Ve) : h(Ve),
            children: [c.jsx(Qo, {
              size: 13
            }), " ", x(He ? "永久删除所选" : "删除所选"), " ", Ve.length || ""]
          })]
        }) : null, c.jsx("button", {
          type: "button",
          onClick: () => {
            m(!p), y(new Set());
          },
          children: x(p ? "完成" : "批量管理")
        })]
      });
    },
    ie = (Ye = X.find(Ce => Ce.runId)) == null ? void 0 : Ye.runId,
    ae = g.useMemo(() => J.filter(Ce => Ce.status === "deleted").sort((Ce, He) => (He.deletedAt ?? He.updatedAt) - (Ce.deletedAt ?? Ce.updatedAt)), [J]),
    be = g.useMemo(() => v2o(W, Q, pe), [Q, W, pe]),
    Ee = g.useMemo(() => w2o(be, le), [be, le]),
    xe = g.useMemo(() => P ? pe.filter(Ce => (l == null ? void 0 : l.itemId) === Ce.id || LPe(Ee.memory.get(Ce.id), P)) : pe.length >= Wne ? pe.slice(0, Wne) : pe, [l == null ? void 0 : l.itemId, Ee, P, pe]),
    he = g.useMemo(() => (P || pe.length < Wne ? pe : pe.slice(0, Wne)).flatMap(Ce => Ce.evidence.map(He => ({
      item: Ce,
      source: He,
      key: `${Ce.id}:${He.id}`
    })).filter(He => LPe(Ee.evidence.get(He.key), P))), [Ee, P, pe]),
    ue = g.useMemo(() => P ? Ee.edges.filter(Ce => LPe(Ce.from, P) || LPe(Ce.to, P)) : Ee.edges.length >= $yn ? Ee.edges.slice(0, $yn) : Ee.edges, [Ee, P]),
    ge = g.useRef(Ee);
  ge.current = Ee;
  const _e = g.useMemo(() => new Map(n.map(Ce => [String(Ce.id), Ce])), [n]),
    ke = g.useMemo(() => n.filter(Ce => a.has(String(Ce.id))).slice(0, 12), [n, a]),
    ve = g.useMemo(() => l ? x2o(Ee, l) : void 0, [l, Ee]);
  g.useEffect(() => {
    o.open && _Rt();
  }, [q, o.open]);
  const Te = Ce => {
      U.current = Ce, G.current && (G.current.style.transform = `translate3d(${Ce.x}px, ${Ce.y}px, 0) scale(${Ce.zoom})`);
      const He = j.current;
      if (He) {
        const Ve = 18 * Ce.zoom,
          it = It => (It % Ve + Ve) % Ve;
        He.style.backgroundSize = `${Ve}px ${Ve}px`, He.style.backgroundPosition = `calc(50% + ${it(Ce.x)}px) calc(50% + ${it(Ce.y)}px)`;
      }
      z.current && (z.current.textContent = `${Math.round(Ce.zoom * 100)}%`);
    },
    Ne = () => {
      const Ce = U.current;
      queueMicrotask(() => $ra(q, Ce));
    },
    me = (Ce = 180) => {
      O.current !== null && window.clearTimeout(O.current), O.current = window.setTimeout(() => {
        O.current = null, Ne(), ce();
      }, Ce);
    },
    Ae = (Ce, He, Ve) => {
      const it = j.current;
      if (!it) return;
      const It = U.current,
        Ft = Math.max(.35, Math.min(1.6, It.zoom * Math.exp(-Ve * .0012))),
        We = it.getBoundingClientRect(),
        Ze = Ce - We.left - We.width / 2,
        Ge = He - We.top - We.height / 2,
        Oe = (Ze - It.x) / It.zoom,
        st = (Ge - It.y) / It.zoom;
      Te({
        x: Ze - Oe * Ft,
        y: Ge - st * Ft,
        zoom: Ft
      });
    },
    Fe = g.useRef(Ae);
  Fe.current = Ae, g.useEffect(() => {
    if (!o.open) return;
    const Ce = j.current;
    if (!Ce) return;
    const He = Ve => {
      if (Ve.target instanceof Element && Ve.target.closest(".project-memory-panel__inline-editor")) {
        Ve.stopPropagation();
        return;
      }
      Ve.preventDefault(), !F.current && (Fe.current(Ve.clientX, Ve.clientY, Ve.deltaY), me());
    };
    return Ce.addEventListener("wheel", He, {
      passive: !1
    }), () => Ce.removeEventListener("wheel", He);
  }, [q, o.open]);
  const Me = () => {
    var He, Ve;
    const Ce = F.current;
    F.current = null, B.current && (B.current.style.display = "none"), (He = j.current) == null || He.classList.remove("is-selecting"), Ce && ((Ve = j.current) != null && Ve.hasPointerCapture(Ce.pointerId)) && j.current.releasePointerCapture(Ce.pointerId);
  };
  g.useEffect(() => (window.addEventListener("blur", Me), () => {
    window.removeEventListener("blur", Me), Me();
  }), [q, o.open]), g.useEffect(() => {
    y(new Set()), m(!1);
  }, [o.open, k, S]);
  const Re = (Ce, He, Ve) => {
      const it = Ce.target.closest("button, textarea, input");
      if (Ce.button !== 0 || it && it !== Ce.currentTarget) return;
      Ce.stopPropagation();
      const It = Ce.currentTarget;
      Y.current = {
        key: He,
        pointerId: Ce.pointerId,
        startX: Ce.clientX,
        startY: Ce.clientY,
        origin: Ve,
        current: Ve,
        element: It,
        moved: !1
      }, It.setPointerCapture(Ce.pointerId), It.classList.add("is-dragging");
    },
    $e = Ce => {
      const He = Y.current;
      if (!He || He.pointerId !== Ce.pointerId) return;
      Ce.stopPropagation();
      const Ve = (Ce.clientX - He.startX) / U.current.zoom,
        it = (Ce.clientY - He.startY) / U.current.zoom;
      if (!He.moved && Math.hypot(Ve, it) > 3 && (He.moved = !0), !He.moved) return;
      const It = {
        x: Math.max(-5e3, Math.min(5e3, He.origin.x + Ve)),
        y: Math.max(-5e3, Math.min(5e3, He.origin.y + it))
      };
      He.current = It, He.element.style.left = `${It.x}px`, He.element.style.top = `${It.y}px`;
      const Ft = ge.current;
      Ft.edges.forEach(We => {
        if (We.fromKey !== He.key && We.toKey !== He.key) return;
        const Ze = We.fromKey === He.key ? It : Gyn(Ft, We.fromKey),
          Ge = We.toKey === He.key ? It : Gyn(Ft, We.toKey),
          Oe = L.current.get(We.id);
        Ze && Ge && Oe && Oe.setAttribute("d", Hyn(Ze, Ge));
      });
    },
    rt = Ce => {
      const He = Y.current;
      if (!He || He.pointerId !== Ce.pointerId) return;
      Ce.stopPropagation(), Y.current = null, He.element.classList.remove("is-dragging");
      try {
        He.element.releasePointerCapture(Ce.pointerId);
      } catch {}
      if (!He.moved) return;
      D.current = He.key;
      const it = {
        ...(ne[q] ?? eYt(q)),
        [He.key]: He.current
      };
      de(It => ({
        ...It,
        [q]: it
      })), queueMicrotask(() => tYt(q, it)), window.setTimeout(() => {
        D.current === He.key && (D.current = null);
      }, 0);
    },
    nt = Ce => D.current !== Ce ? !1 : (D.current = null, !0),
    ze = Ce => {
      var He;
      V.current !== null && window.clearTimeout(V.current), (He = G.current) == null || He.classList.add("is-view-animating"), Te(Ce), V.current = window.setTimeout(() => {
        var Ve;
        (Ve = G.current) == null || Ve.classList.remove("is-view-animating"), V.current = null, Ne(), ce();
      }, 260);
    },
    Le = (Ce = !0) => {
      const He = j.current,
        Ve = _2o(Ee, ve),
        it = Math.max(1, Ve.maxX - Ve.minX),
        It = Math.max(1, Ve.maxY - Ve.minY),
        Ft = Math.max(420, ((He == null ? void 0 : He.clientWidth) ?? window.innerWidth) - 180),
        We = Math.max(320, ((He == null ? void 0 : He.clientHeight) ?? window.innerHeight) - 150),
        Ze = Math.max(.42, Math.min(1, Ft / it, We / It)),
        Ge = (Ve.minX + Ve.maxX) / 2,
        Oe = (Ve.minY + Ve.maxY) / 2,
        st = {
          x: -Ge * Ze,
          y: -Oe * Ze + 14,
          zoom: Ze
        };
      Ce ? ze(st) : (Te(st), Ne(), ce());
    };
  if (g.useEffect(() => {
    const Ce = s.graphPositions[q],
      He = Ce && Object.keys(Ce).length ? Ce : Vyn(q);
    de(Ve => Ve[q] === He ? Ve : {
      ...Ve,
      [q]: He
    }), (!Ce || !Object.keys(Ce).length) && Object.keys(He).length && queueMicrotask(() => tYt(q, He));
  }, [q, s.graphPositions]), g.useEffect(() => {
    if (!o.open) return;
    const Ce = window.requestAnimationFrame(() => {
      const He = Ura(q);
      He ? Te(He) : Le(!1), window.requestAnimationFrame(ce);
    });
    return () => window.cancelAnimationFrame(Ce);
  }, [q, s.graphViews, o.open]), g.useEffect(() => {
    if (!o.open) return;
    const Ce = j.current;
    if (!Ce || typeof ResizeObserver > "u") return;
    const He = new ResizeObserver(() => {
      window.requestAnimationFrame(ce);
    });
    He.observe(Ce);
    const Ve = window.requestAnimationFrame(ce);
    return () => {
      He.disconnect(), window.cancelAnimationFrame(Ve);
    };
  }, [Ee, o.open]), g.useEffect(() => {
    o.open && (d(null), h(null), v(null), w(!1), E(null));
  }, [q, o.open]), g.useEffect(() => () => {
    V.current !== null && window.clearTimeout(V.current), O.current !== null && window.clearTimeout(O.current);
  }, []), g.useEffect(() => {
    if (!o.open) return;
    const Ce = He => {
      if (He.key === "Delete") {
        const Ve = He.target;
        if (Ve instanceof HTMLElement && Ve.closest('input, textarea, select, [contenteditable="true"], [role="textbox"]') || (He.preventDefault(), He.stopPropagation(), k || l || u || b || F.current || He.repeat)) return;
        const it = pe.filter(It => f.has(It.id));
        it.length && h(it);
        return;
      }
      He.key === "Escape" && (F.current ? (He.preventDefault(), He.stopPropagation(), Me()) : b ? v(null) : u ? h(null) : l ? d(null) : _ ? w(!1) : I1e());
    };
    return window.addEventListener("keydown", Ce, !0), () => window.removeEventListener("keydown", Ce, !0);
  }, [k, u, l, _, o.open, b, f, pe]), g.useEffect(() => {
    if (!o.open || !ve) return;
    const Ce = window.requestAnimationFrame(() => {
      const He = j.current;
      if (!He) return;
      const Ve = U.current,
        it = He.clientWidth / 2 + Ve.x + ve.x * Ve.zoom,
        It = He.clientHeight / 2 + Ve.y + ve.y * Ve.zoom,
        Ft = 170,
        We = He.clientWidth - 170,
        Ze = 132,
        Ge = He.clientHeight - 126,
        Oe = it < Ft ? Ft - it : it > We ? We - it : 0,
        st = It < Ze ? Ze - It : It > Ge ? Ge - It : 0;
      (Oe || st) && ze({
        ...Ve,
        x: Ve.x + Oe,
        y: Ve.y + st
      });
    });
    return () => window.cancelAnimationFrame(Ce);
  }, [ve == null ? void 0 : ve.x, ve == null ? void 0 : ve.y, l == null ? void 0 : l.category, l == null ? void 0 : l.itemId, o.open]), !o.open) return null;
  const Ke = (Ce, He) => {
      d({
        itemId: He == null ? void 0 : He.id,
        category: Ce,
        content: (He == null ? void 0 : He.content) || "",
        evidenceNodeIds: (He == null ? void 0 : He.evidence.filter(Ve => Ve.type === "canvas_node").map(Ve => Ve.sourceId)) ?? ke.map(Ve => String(Ve.id))
      }), h(null), E({
        category: Ce,
        itemId: He == null ? void 0 : He.id
      });
    },
    Xe = () => {
      if (!(l != null && l.content.trim())) return;
      const Ce = l.itemId ? s.items.find(it => it.id === l.itemId) : void 0,
        He = (Ce == null ? void 0 : Ce.evidence.filter(it => it.type !== "canvas_node")) ?? [],
        Ve = l.evidenceNodeIds.map(it => ({
          id: `evidence-node-${it}`,
          type: "canvas_node",
          sourceId: it,
          label: Wyn(_e.get(it), it)
        }));
      Azn({
        id: l.itemId,
        scope: K,
        projectId: K === "project" ? memoryProjectId : null,
        category: l.category,
        content: l.content,
        evidence: [...He, ...Ve],
        pinned: Ce == null ? void 0 : Ce.pinned,
        enabled: Ce == null ? void 0 : Ce.enabled,
        origin: (Ce == null ? void 0 : Ce.origin) ?? "manual",
        originKey: Ce == null ? void 0 : Ce.originKey,
        markUserEdited: !0
      }), d(null), E(null);
    },
    De = K === "project" ? "当前项目" : "个人偏好";
  return c.jsxs("section", {
    className: `project-memory-panel ${e ? "is-dark" : "is-light"}`,
    "aria-label": x(K === "project" ? "当前项目记忆" : "个人记忆"),
    children: [c.jsx("header", {
      className: "project-memory-panel__header",
      children: c.jsxs("div", {
        className: "project-memory-panel__header-left",
        children: [c.jsx("button", {
          type: "button",
          className: "project-memory-panel__icon-button",
          onClick: I1e,
          "aria-label": x("返回画布"),
          children: c.jsx(uw, {
            size: 17
          })
        }), c.jsxs("div", {
          className: "project-memory-panel__title-pill",
          children: [c.jsx(rxe, {
            size: 16
          }), c.jsx("strong", {
            children: x(K === "project" ? "当前项目记忆" : "个人记忆")
          })]
        }), c.jsxs("div", {
          role: "group",
          "aria-label": x("记忆范围"),
          style: { display: "flex", gap: 6 },
          children: [c.jsx("button", {
            type: "button",
            className: "project-memory-panel__title-pill",
            "aria-pressed": K === "personal",
            onClick: () => setMemoryScope("personal"),
            children: x("个人")
          }), c.jsx("button", {
            type: "button",
            className: "project-memory-panel__title-pill",
            "aria-pressed": K === "project",
            disabled: !hasMemoryProject,
            title: hasMemoryProject ? x("只显示当前画布项目的记忆") : x("先创建或打开一个项目画布"),
            onClick: () => setMemoryScope("project"),
            children: x("当前项目")
          })]
        }), c.jsxs("div", {
          className: "project-memory-panel__help-wrap",
          children: [c.jsx("button", {
            type: "button",
            className: "project-memory-panel__icon-button",
            onClick: () => w(Ce => !Ce),
            "aria-label": x("记忆说明"),
            children: "?"
          }), _ ? c.jsxs("div", {
            className: "project-memory-panel__help",
            children: [c.jsx("strong", {
              children: x(K === "project" ? "项目记忆只属于当前画布项目。" : "Chat 和 Agent 都会用到个人记忆。")
            }), c.jsx("p", {
              children: x(K === "project" ? "在品牌、进展、规则、素材中记录已确认的目标、决策与素材关系；切换项目后分别保存。" : "「用户」写身份、称呼、偏好和背景，会作为站立指令注入普通 Chat 与 Agent，不必每轮再说一遍。")
            }), c.jsx("span", {
              children: x("工作流、项目、纠正分别管做事方式、跨项目关系和不要再犯的错。聊天里说“记住……”也会写进这里。")
            })]
          }) : null]
        }), c.jsx("button", {
          type: "button",
          className: "project-memory-panel__icon-button",
          onClick: () => Gra(K, W === "scatter" ? "mindmap" : "scatter"),
          "aria-label": x(W === "scatter" ? "切到思维导图" : "切到散射"),
          title: x(W === "scatter" ? "切到思维导图" : "切到散射"),
          children: W === "scatter" ? c.jsx(eWe, {
            size: 16
          }) : c.jsx(ITn, {
            size: 16
          })
        }), c.jsx("button", {
          type: "button",
          className: `project-memory-panel__icon-button ${k ? "is-active" : ""}`,
          onClick: () => A(Ce => !Ce),
          "aria-label": x("查看记忆使用记录与回收站"),
          title: x("记忆审计"),
          children: c.jsx(PLe, {
            size: 16
          })
        })]
      })
    }), c.jsxs("div", {
      ref: j,
      className: "project-memory-panel__viewport",
      tabIndex: -1,
      onPointerDownCapture: Ce => {
        if (N.current = !1, Ce.button !== 0 || !Ce.ctrlKey || l || u || b || k || Ce.target.closest('button, textarea, input, select, [contenteditable="true"]')) return;
        Ce.preventDefault(), Ce.stopPropagation();
        const He = Ce.currentTarget;
        F.current = {
          pointerId: Ce.pointerId,
          x: Ce.clientX,
          y: Ce.clientY,
          viewport: He.getBoundingClientRect(),
          cards: Array.from(He.querySelectorAll("[data-memory-id]"), Ve => ({
            id: Ve.dataset.memoryId,
            rect: Ve.getBoundingClientRect()
          }))
        }, N.current = !0, He.focus({
          preventScroll: !0
        }), He.setPointerCapture(Ce.pointerId), He.classList.add("is-selecting");
      },
      onClickCapture: Ce => {
        N.current && (N.current = !1, Ce.preventDefault(), Ce.stopPropagation());
      },
      onPointerDown: Ce => {
        const He = Ce.target;
        Ce.button !== 0 && Ce.button !== 1 || He.closest("button, textarea, input, .project-memory-panel__interactive-node") || (H.current = {
          pointerId: Ce.pointerId,
          x: Ce.clientX,
          y: Ce.clientY,
          viewX: U.current.x,
          viewY: U.current.y,
          moved: !1
        }, Ce.currentTarget.setPointerCapture(Ce.pointerId), Ce.currentTarget.classList.add("is-panning"));
      },
      onPointerMove: Ce => {
        const He = F.current;
        if ((He == null ? void 0 : He.pointerId) === Ce.pointerId) {
          const Ft = B.current;
          Ft && Object.assign(Ft.style, {
            display: "block",
            left: `${Math.min(He.x, Ce.clientX) - He.viewport.left}px`,
            top: `${Math.min(He.y, Ce.clientY) - He.viewport.top}px`,
            width: `${Math.abs(Ce.clientX - He.x)}px`,
            height: `${Math.abs(Ce.clientY - He.y)}px`
          });
          return;
        }
        const Ve = H.current;
        if (!Ve || Ve.pointerId !== Ce.pointerId) return;
        const it = Ce.clientX - Ve.x,
          It = Ce.clientY - Ve.y;
        !Ve.moved && Math.hypot(it, It) > 3 && (Ve.moved = !0), Te({
          ...U.current,
          x: Ve.viewX + it,
          y: Ve.viewY + It
        });
      },
      onPointerUp: Ce => {
        var it;
        const He = F.current;
        if ((He == null ? void 0 : He.pointerId) === Ce.pointerId) {
          const It = Math.min(He.x, Ce.clientX),
            Ft = Math.max(He.x, Ce.clientX),
            We = Math.min(He.y, Ce.clientY),
            Ze = Math.max(He.y, Ce.clientY);
          Math.hypot(Ft - It, Ze - We) > 3 && (y(new Set(He.cards.filter(({
            rect: Ge
          }) => Ge.right >= It && Ge.left <= Ft && Ge.bottom >= We && Ge.top <= Ze).map(({
            id: Ge
          }) => Ge))), m(!0)), Me();
          return;
        }
        if (((it = H.current) == null ? void 0 : it.pointerId) !== Ce.pointerId) return;
        const Ve = H.current.moved;
        H.current = null, Ce.currentTarget.classList.remove("is-panning");
        try {
          Ce.currentTarget.releasePointerCapture(Ce.pointerId);
        } catch {}
        Ve ? (Ne(), ce()) : (d(null), w(!1), E(null));
      },
      onPointerCancel: Ce => {
        Me(), H.current = null, Ce.currentTarget.classList.remove("is-panning"), Ne(), ce();
      },
      onLostPointerCapture: () => {
        F.current && Me();
      },
      onDoubleClick: Ce => {
        Ce.target.closest(".project-memory-panel__interactive-node") || Le();
      },
      children: [c.jsx("div", {
        ref: B,
        className: "project-memory-panel__marquee",
        "aria-hidden": "true"
      }), c.jsxs("div", {
        ref: G,
        className: "project-memory-panel__world",
        style: {
          transform: "translate3d(0px, 0px, 0) scale(.88)"
        },
        children: [c.jsx("svg", {
          className: "project-memory-panel__edges",
          viewBox: "-1600 -1200 3200 2400",
          "aria-hidden": !0,
          children: ue.map(Ce => c.jsx("path", {
            ref: He => {
              He ? L.current.set(Ce.id, He) : L.current.delete(Ce.id);
            },
            className: I && Ce.category === I.category && (!I.itemId || !Ce.itemId || Ce.itemId === I.itemId) ? "is-active" : "",
            d: Hyn(Ce.from, Ce.to)
          }, Ce.id))
        }), c.jsxs("div", {
          className: "project-memory-panel__center-node project-memory-panel__interactive-node",
          style: {
            left: Ee.center.x,
            top: Ee.center.y
          },
          title: x(De),
          onPointerDown: Ce => Re(Ce, "center", Ee.center),
          onPointerMove: $e,
          onPointerUp: rt,
          onPointerCancel: rt,
          children: [c.jsx("span", {
            className: "project-memory-panel__center-dots",
            "aria-hidden": !0
          }), c.jsx("span", {
            className: "project-memory-panel__center-core",
            "aria-hidden": !0
          }), c.jsx("small", {
            children: x(De)
          })]
        }), Q.map(Ce => {
          const He = Ee.category.get(Ce.id),
            Ve = pe.filter(it => it.category === Ce.id).length;
          return c.jsxs("div", {
            className: `project-memory-panel__category project-memory-panel__interactive-node ${(I == null ? void 0 : I.category) === Ce.id ? "is-active" : ""}`,
            style: {
              left: He.x,
              top: He.y
            },
            role: "button",
            tabIndex: 0,
            "aria-label": x("{0}，{1} 条记忆，点击新增", Ce.label, Ve),
            title: Ce.id === "user" ? x("身份、称呼、偏好和背景。Chat 与 Agent 都会遵守。") : void 0,
            onPointerEnter: () => E({
              category: Ce.id
            }),
            onPointerLeave: () => E(it => (it == null ? void 0 : it.category) === Ce.id ? null : it),
            onPointerDown: it => Re(it, `category:${Ce.id}`, He),
            onPointerMove: $e,
            onPointerUp: rt,
            onPointerCancel: rt,
            onClick: () => {
              nt(`category:${Ce.id}`) || Ke(Ce.id);
            },
            onKeyDown: it => {
              it.key !== "Enter" && it.key !== " " || (it.preventDefault(), Ke(Ce.id));
            },
            children: [S2o(Ce.id), c.jsx("strong", {
              children: x(Ce.label)
            }), c.jsx("span", {
              children: Ve
            }), c.jsxs("span", {
              className: "project-memory-panel__category-add",
              children: [c.jsx(eo, {
                size: 11
              }), x(" 新增")]
            })]
          }, Ce.id);
        }), xe.map(Ce => {
          const He = Ee.memory.get(Ce.id);
          return (l == null ? void 0 : l.itemId) === Ce.id ? null : c.jsxs("article", {
            className: `project-memory-panel__memory-card project-memory-panel__interactive-node ${Ce.enabled ? "" : "is-disabled"} ${(I == null ? void 0 : I.itemId) === Ce.id ? "is-active" : ""} ${f.has(Ce.id) ? "is-selected" : ""}`,
            "data-memory-id": Ce.id,
            style: {
              left: He.x,
              top: He.y
            },
            role: "button",
            tabIndex: 0,
            "aria-label": x("记忆：{0}", WL(Ce.content)),
            onPointerEnter: () => E({
              category: Ce.category,
              itemId: Ce.id
            }),
            onPointerLeave: () => E(Ve => (Ve == null ? void 0 : Ve.itemId) === Ce.id ? null : Ve),
            onPointerDown: Ve => Re(Ve, `memory:${Ce.id}`, He),
            onPointerMove: $e,
            onPointerUp: rt,
            onPointerCancel: rt,
            onClick: () => {
              nt(`memory:${Ce.id}`) || (p ? fe(Ce.id) : Ke(Ce.category, Ce));
            },
            onKeyDown: Ve => {
              Ve.key !== "Enter" && Ve.key !== " " || (Ve.preventDefault(), p ? fe(Ce.id) : Ke(Ce.category, Ce));
            },
            children: [p ? c.jsx("input", {
              type: "checkbox",
              className: "project-memory-panel__select",
              "aria-label": x("选择记忆：{0}", WL(Ce.content).slice(0, 40)),
              checked: f.has(Ce.id),
              onChange: () => fe(Ce.id),
              onPointerDown: Ve => Ve.stopPropagation(),
              onClick: Ve => Ve.stopPropagation(),
              onKeyDown: Ve => Ve.stopPropagation()
            }) : null, Ce.status === "superseded" ? c.jsx("span", {
              className: "project-memory-panel__memory-status is-superseded",
              children: x("已被取代")
            }) : Ce.status === "expired" ? c.jsx("span", {
              className: "project-memory-panel__memory-status is-expired",
              children: x("已过期")
            }) : Ce.status === "candidate" || Ce.status === "conflict" ? c.jsx("span", {
              className: `project-memory-panel__memory-status is-${Ce.status}`,
              children: Ce.status === "conflict" ? x("冲突待确认") : x("候选记忆")
            }) : null, c.jsx("p", {
              children: WL(Ce.content)
            }), Ce.pinned ? c.jsx(zM, {
              size: 10,
              className: "project-memory-panel__pinned",
              "aria-label": x("已固定")
            }) : null, c.jsxs("div", {
              className: "project-memory-panel__card-actions",
              onClick: Ve => Ve.stopPropagation(),
              children: [Ce.origin === "agent" ? c.jsxs("span", {
                className: "project-memory-panel__agent-tag",
                children: [c.jsx(ac, {
                  size: 10
                }), " Agent"]
              }) : c.jsx("span", {}), Ce.useCount ? c.jsxs("span", {
                className: "project-memory-panel__use-count",
                children: [x("已用 "), Ce.useCount]
              }) : null, Ce.status === "candidate" || Ce.status === "conflict" ? c.jsxs(c.Fragment, {
                children: [c.jsx("button", {
                  type: "button",
                  onClick: () => Yra(Ce.id),
                  "aria-label": x("确认这条候选记忆"),
                  title: Ce.status === "conflict" ? x("确认并停用冲突旧记忆") : x("确认记忆"),
                  children: c.jsx(io, {
                    size: 13
                  })
                }), c.jsx("button", {
                  type: "button",
                  onClick: () => Xra(Ce.id),
                  "aria-label": x("忽略这条候选记忆"),
                  title: x("忽略候选"),
                  children: c.jsx(Na, {
                    size: 13
                  })
                })]
              }) : null, c.jsx("button", {
                type: "button",
                onClick: () => Kra(Ce.id),
                "aria-label": Ce.pinned ? x("取消固定") : x("固定记忆"),
                title: Ce.pinned ? x("取消固定") : x("固定"),
                children: Ce.pinned ? c.jsx(k5e, {
                  size: 12
                }) : c.jsx(zM, {
                  size: 12
                })
              }), c.jsx("button", {
                type: "button",
                onClick: () => Qra(Ce.id),
                "aria-label": Ce.enabled ? x("停用记忆") : x("启用记忆"),
                title: Ce.enabled ? x("停用") : x("启用"),
                children: Ce.enabled ? c.jsx(ul, {
                  size: 12
                }) : c.jsx($d, {
                  size: 12
                })
              }), c.jsx("button", {
                type: "button",
                onClick: () => Ke(Ce.category, Ce),
                "aria-label": x("编辑记忆"),
                title: x("编辑"),
                children: c.jsx(SP, {
                  size: 12
                })
              }), c.jsx("button", {
                type: "button",
                onClick: () => h([Ce]),
                "aria-label": x("删除记忆"),
                title: x("删除"),
                children: c.jsx(Qo, {
                  size: 12
                })
              })]
            })]
          }, Ce.id);
        }), he.map(({
          item: Ce,
          source: He,
          key: Ve
        }) => {
          var Oe;
          const it = Ee.evidence.get(Ve),
            It = He.type === "canvas_node" ? _e.get(He.sourceId) : void 0,
            Ft = He.thumbnailUrl || qyn(It),
            We = Ft && !nGe(Ft) ? gd(Ft) : "",
            Ze = M[Ve],
            Ge = He.type === "canvas_node" && !It || He.type === "history" && !r.some(st => String(st.id) === He.sourceId) || He.type === "recipe" && !Spe(He.sourceId) || He.type === "production_run" && !Oja(He.sourceId) && ((Oe = hpe()) == null ? void 0 : Oe.id) !== He.sourceId;
          return c.jsxs("button", {
            type: "button",
            className: `project-memory-panel__evidence project-memory-panel__interactive-node ${Ge ? "is-missing" : ""}`,
            style: {
              left: it.x,
              top: it.y,
              ...(Ze ? {
                width: Ze.width,
                height: Ze.height
              } : {})
            },
            title: Ge ? x("{0} · 来源已失效，点击移除证据", odt(He.label, !1)) : odt(He.label, !1),
            onPointerEnter: () => E({
              category: Ce.category,
              itemId: Ce.id
            }),
            onPointerLeave: () => E(st => (st == null ? void 0 : st.itemId) === Ce.id ? null : st),
            onPointerDown: st => Re(st, `evidence:${Ve}`, it),
            onPointerMove: $e,
            onPointerUp: rt,
            onPointerCancel: rt,
            onClick: () => {
              if (!nt(`evidence:${Ve}`)) {
                if (Ge) {
                  qra(Ce.id, He.id);
                  return;
                }
                I1e(), requestAnimationFrame(() => {
                  if (It && i) {
                    i(It);
                    return;
                  }
                  if (He.type === "production_run") qP("history", {
                    runId: He.sourceId
                  });else if (He.type === "recipe") qP("recipes", {
                    recipeId: He.sourceId
                  });else if (He.type === "history") {
                    try {
                      sessionStorage.setItem("projectMemoryHistoryFocus", He.sourceId);
                    } catch {}
                    jga(), window.setTimeout(() => window.dispatchEvent(new CustomEvent("projectMemoryHistoryFocusRequested", {
                      detail: {
                        historyId: He.sourceId
                      }
                    })), 180);
                  } else He.type === "chat" && (OY(), window.dispatchEvent(new CustomEvent("projectMemoryChatFocusRequested", {
                    detail: {
                      messageId: He.sourceId,
                      sessionId: He.sessionId
                    }
                  })));
                });
              }
            },
            children: [c.jsx("span", {
              className: "project-memory-panel__evidence-thumb",
              children: We ? c.jsx("img", {
                src: We,
                alt: "",
                draggable: !1,
                onLoad: st => {
                  const vt = f2o(st.currentTarget.naturalWidth, st.currentTarget.naturalHeight);
                  T(Ht => {
                    const nn = Ht[Ve];
                    return (nn == null ? void 0 : nn.width) === vt.width && nn.height === vt.height ? Ht : {
                      ...Ht,
                      [Ve]: vt
                    };
                  });
                }
              }) : c.jsx(lo, {
                size: 18
              })
            }), c.jsx("span", {
              className: "project-memory-panel__evidence-label",
              children: odt(He.label, Ge)
            })]
          }, Ve);
        }), l && ve ? c.jsxs("div", {
          className: "project-memory-panel__inline-editor project-memory-panel__interactive-node",
          style: {
            left: ve.x,
            top: ve.y
          },
          "aria-label": l.itemId ? x("编辑记忆") : x("新增记忆"),
          onPointerDown: Ce => Ce.stopPropagation(),
          children: [c.jsx("textarea", {
            autoFocus: !0,
            value: l.content,
            placeholder: I2o(l.category),
            onChange: Ce => d({
              ...l,
              content: Ce.target.value.slice(0, 1200)
            }),
            onKeyDown: Ce => {
              if (Ce.key === "Escape") {
                Ce.stopPropagation(), d(null);
                return;
              }
              Ce.key === "Enter" && (Ce.ctrlKey || Ce.metaKey) && (Ce.preventDefault(), Xe());
            }
          }), l.evidenceNodeIds.length > 0 ? c.jsxs("div", {
            className: "project-memory-panel__inline-sources",
            children: [l.evidenceNodeIds.slice(0, 4).map(Ce => {
              const He = _e.get(Ce),
                Ve = qyn(He);
              return c.jsx("span", {
                title: Wyn(He, Ce),
                children: Ve ? c.jsx("img", {
                  src: Ve,
                  alt: "",
                  draggable: !1
                }) : c.jsx(lo, {
                  size: 11
                })
              }, Ce);
            }), l.evidenceNodeIds.length > 4 ? c.jsxs("small", {
              children: ["+", l.evidenceNodeIds.length - 4]
            }) : null]
          }) : null, c.jsxs("div", {
            className: "project-memory-panel__inline-actions",
            children: [c.jsxs("button", {
              type: "button",
              className: ke.length > 0 && ke.every(Ce => l.evidenceNodeIds.includes(String(Ce.id))) ? "is-selected" : "",
              disabled: ke.length === 0,
              onClick: () => {
                const Ce = ke.map(Ve => String(Ve.id)),
                  He = Ce.length > 0 && Ce.every(Ve => l.evidenceNodeIds.includes(Ve));
                d({
                  ...l,
                  evidenceNodeIds: He ? l.evidenceNodeIds.filter(Ve => !Ce.includes(Ve)) : [...new Set([...l.evidenceNodeIds, ...Ce])]
                });
              },
              "aria-label": ke.length ? x("关联当前选中的 {0} 个画布节点", ke.length) : x("返回画布选择素材后可关联"),
              title: ke.length ? x("关联当前选中的 {0} 个画布节点", ke.length) : x("返回画布选择素材后可关联"),
              children: [c.jsx(mu, {
                size: 15
              }), l.evidenceNodeIds.length ? c.jsx("span", {
                children: l.evidenceNodeIds.length
              }) : null]
            }), c.jsx("button", {
              type: "button",
              onClick: () => d(null),
              "aria-label": x("取消"),
              title: x("取消"),
              children: c.jsx(Na, {
                size: 16
              })
            }), c.jsx("button", {
              type: "button",
              className: "is-confirm",
              disabled: !l.content.trim(),
              onClick: Xe,
              "aria-label": x("保存"),
              title: x("保存（Ctrl+Enter）"),
              children: c.jsx(io, {
                size: 17
              })
            })]
          })]
        }) : null]
      }), c.jsxs("div", {
        className: "project-memory-panel__zoom-controls",
        children: [c.jsx("button", {
          type: "button",
          onClick: () => Te({
            ...U.current,
            zoom: Math.min(1.6, U.current.zoom + .1)
          }),
          "aria-label": x("放大"),
          children: c.jsx(eo, {
            size: 15
          })
        }), c.jsx("button", {
          type: "button",
          onClick: () => Te({
            ...U.current,
            zoom: Math.max(.35, U.current.zoom - .1)
          }),
          "aria-label": x("缩小"),
          children: c.jsx(AS, {
            size: 15
          })
        }), c.jsx("button", {
          type: "button",
          onClick: () => Le(),
          "aria-label": x("复位"),
          children: c.jsx(Wm, {
            size: 14
          })
        }), c.jsxs("span", {
          ref: z,
          children: [Math.round(U.current.zoom * 100), "%"]
        })]
      }), pe.length === 0 ? c.jsxs("div", {
        className: "project-memory-panel__empty",
        children: [c.jsx(rxe, {
          size: 20
        }), c.jsx("strong", {
          children: x(K === "project" ? "当前项目还没有记忆" : "还没有个人记忆")
        }), c.jsx("span", {
          children: x(K === "project" ? "点击品牌、进展、规则或素材旁的“+”新增；个人记忆仍单独保留。" : "点击「用户」旁的“+”，或在对话里说“记住……”；Chat 和 Agent 都会遵守。")
        })]
      }) : null]
    }), k ? c.jsxs("aside", {
      className: "project-memory-panel__audit",
      "aria-label": x("记忆审计"),
      children: [c.jsxs("header", {
        children: [c.jsxs("div", {
          children: [c.jsx(PLe, {
            size: 16
          }), c.jsx("strong", {
            children: x("记忆审计")
          })]
        }), c.jsx("button", {
          type: "button",
          onClick: () => A(!1),
          "aria-label": x("关闭记忆审计"),
          children: c.jsx(Na, {
            size: 15
          })
        })]
      }), c.jsxs("div", {
        className: "project-memory-panel__audit-tabs",
        role: "tablist",
        children: [c.jsxs("button", {
          type: "button",
          role: "tab",
          "aria-selected": S === "usage",
          className: S === "usage" ? "is-active" : "",
          onClick: () => C("usage"),
          children: [x("实际使用 "), c.jsx("span", {
            children: X.length
          })]
        }), c.jsxs("button", {
          type: "button",
          role: "tab",
          "aria-selected": S === "trash",
          className: S === "trash" ? "is-active" : "",
          onClick: () => C("trash"),
          children: [x("回收站 "), c.jsx("span", {
            children: ae.length
          })]
        })]
      }), ye(S === "usage" ? re : ae, S === "trash"), c.jsx("div", {
        className: "project-memory-panel__audit-list rh-scroll-minimal",
        children: S === "usage" ? X.length ? X.map(Ce => {
          const He = Z.get(Ce.memoryId);
          return c.jsxs("article", {
            className: Ce.runId && Ce.runId === ie ? "is-latest-run" : "",
            children: [c.jsxs("div", {
              className: "project-memory-panel__audit-row",
              children: [p && He ? c.jsx("input", {
                type: "checkbox",
                className: "project-memory-panel__select",
                "aria-label": x("选择记忆：{0}", WL(He.content).slice(0, 40)),
                checked: f.has(He.id),
                onChange: () => fe(He.id)
              }) : null, c.jsx("span", {
                children: Ce.agent === "local-skill" ? "Local Skill" : "Canvas Agent"
              }), Ce.runId && Ce.runId === ie ? c.jsx("em", {
                children: x("本次任务")
              }) : null, c.jsx("time", {
                children: new Date(Ce.usedAt).toLocaleString()
              }), He ? c.jsx("button", {
                type: "button",
                className: "project-memory-panel__audit-delete",
                "aria-label": x("删除这条记忆"),
                title: x("删除记忆"),
                onClick: () => h([He]),
                children: c.jsx(Qo, {
                  size: 13
                })
              }) : null]
            }), c.jsx("p", {
              children: Ce.memoryContent || (He == null ? void 0 : He.content) || x("该记忆已被永久清理")
            }), Ce.reason ? c.jsxs("small", {
              children: [x("使用原因："), Ce.reason]
            }) : null, Ce.runId ? c.jsxs("code", {
              title: Ce.runId,
              children: ["run · ", Ce.runId.slice(-10)]
            }) : null]
          }, Ce.id);
        }) : c.jsx("div", {
          className: "project-memory-panel__audit-empty",
          children: x("Agent 实际采用记忆后，会在这里记录使用原因和任务。")
        }) : ae.length ? ae.map(Ce => {
          var Ve;
          const He = Math.max(0, Math.ceil(((Ce.restoreUntil ?? Date.now()) - Date.now()) / 864e5));
          return c.jsxs("article", {
            children: [c.jsxs("div", {
              className: "project-memory-panel__audit-row",
              children: [p ? c.jsx("input", {
                type: "checkbox",
                className: "project-memory-panel__select",
                "aria-label": x("选择回收站记忆：{0}", WL(Ce.content).slice(0, 40)),
                checked: f.has(Ce.id),
                onChange: () => fe(Ce.id)
              }) : null, c.jsx("span", {
                children: ((Ve = Q.find(it => it.id === Ce.category)) == null ? void 0 : Ve.label) || Ce.category
              }), c.jsxs("time", {
                children: [He, x(" 天内可恢复")]
              })]
            }), c.jsx("p", {
              children: WL(Ce.content)
            }), c.jsxs("div", {
              className: "project-memory-panel__audit-actions",
              children: [c.jsxs("button", {
                type: "button",
                className: "project-memory-panel__restore",
                onClick: () => Hra(Ce.id),
                children: [c.jsx(vd, {
                  size: 12
                }), x(" 恢复记忆")]
              }), c.jsxs("button", {
                type: "button",
                className: "project-memory-panel__purge",
                onClick: () => v([Ce]),
                children: [c.jsx(Qo, {
                  size: 12
                }), x(" 删除")]
              })]
            })]
          }, Ce.id);
        }) : c.jsx("div", {
          className: "project-memory-panel__audit-empty",
          children: x("回收站为空。遗忘的记忆会保留 30 天。")
        })
      })]
    }) : null, u ? c.jsx("div", {
      className: "project-memory-panel__confirm",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": x("删除记忆"),
      children: c.jsxs("div", {
        children: [c.jsx(Qo, {
          size: 18
        }), c.jsx("strong", {
          children: u.length === 1 ? x("删除这条记忆？") : x("删除选中的 {0} 条记忆？", u.length)
        }), c.jsx("p", {
          children: u.slice(0, 3).map(Ce => WL(Ce.content)).join(`
`)
        }), c.jsx("span", {
          children: x("记忆会进入回收站并保留 30 天，不会删除画布节点或素材文件。")
        }), c.jsxs("footer", {
          children: [c.jsx("button", {
            type: "button",
            onClick: () => h(null),
            children: x("取消")
          }), c.jsx("button", {
            type: "button",
            className: "is-danger",
            onClick: () => {
              Szn(u.map(Ce => Ce.id)), y(new Set()), u.some(Ce => Ce.id === (l == null ? void 0 : l.itemId)) && d(null), h(null);
            },
            children: x("删除")
          })]
        })]
      })
    }) : null, b ? c.jsx("div", {
      className: "project-memory-panel__confirm",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": x("永久删除记忆"),
      children: c.jsxs("div", {
        children: [c.jsx(Qo, {
          size: 18
        }), c.jsx("strong", {
          children: b.length === 1 ? x("永久删除这条记忆？") : x("永久删除选中的 {0} 条记忆？", b.length)
        }), c.jsx("p", {
          children: b.slice(0, 3).map(Ce => WL(Ce.content)).join(`
`)
        }), c.jsx("span", {
          children: x("将从回收站彻底移除，无法再恢复。不会删除画布节点或素材文件。")
        }), c.jsxs("footer", {
          children: [c.jsx("button", {
            type: "button",
            onClick: () => v(null),
            children: x("取消")
          }), c.jsx("button", {
            type: "button",
            className: "is-danger",
            onClick: () => {
              Wra(b.map(Ce => Ce.id)), y(new Set()), v(null);
            },
            children: x("永久删除")
          })]
        })]
      })
    }) : null]
  });
}

const C2o = Object.freeze(Object.defineProperty({
  __proto__: null,
  CanvasProjectMemoryPanel: Kyn,
  default: Kyn
}, Symbol.toStringTag, {
  value: "Module"
}));

class E2o {
  constructor() {
    On(this, "renderState", {
      isFrozen: !1,
      frozenAt: 0,
      qualityLevel: "medium",
      activeRequests: 0
    });
    On(this, "requestMap", new Map());
    On(this, "freezeThreshold", 3);
    On(this, "unfreezeDelay", 2e3);
    On(this, "unfreezeTimeoutId", null);
    On(this, "qualityAdjustmentEnabled", !0);
    this.initNetworkMonitoring();
  }
  initNetworkMonitoring() {
    const t = window.fetch;
    window.fetch = (...n) => {
      const r = n[0],
        a = typeof r == "string" ? r : (r == null ? void 0 : r.url) ?? "",
        i = n[1],
        o = ((i == null ? void 0 : i.method) || (n[0] instanceof Request ? n[0].method : void 0) || "GET").toUpperCase(),
        s = t.apply(window, n);
      return o !== "HEAD" && kjt(a) && (this.requestMap.set(s, Date.now()), this.updateRenderState(), s.then(() => {
        this.requestMap.delete(s), this.updateRenderState();
      }).catch(() => {
        this.requestMap.delete(s), this.updateRenderState();
      })), s;
    }, console.log("[NodeRenderOptimizer] Network monitoring initialized");
  }
  updateRenderState() {
    const t = this.requestMap.size,
      n = this.renderState.isFrozen,
      r = t >= this.freezeThreshold;
    r && !n ? this.freezeNodeContent() : !r && n && this.unfreezeNodeContent(), this.renderState.activeRequests = t;
  }
  freezeNodeContent() {
    this.renderState.isFrozen = !0, this.renderState.frozenAt = Date.now(), this.setQualityLevel("medium"), dH({
      enableImageThumbnails: !1,
      enableVideoLazyLoad: !1
    }), this.dispatchStateChangeEvent(), this.scheduleUnfreeze();
  }
  unfreezeNodeContent() {
    this.renderState.isFrozen = !1, this.setQualityLevel("medium"), dH({
      enableImageThumbnails: !0,
      enableVideoLazyLoad: !0
    }), this.dispatchStateChangeEvent(), this.unfreezeTimeoutId !== null && (clearTimeout(this.unfreezeTimeoutId), this.unfreezeTimeoutId = null);
  }
  scheduleUnfreeze() {
    this.unfreezeTimeoutId !== null && clearTimeout(this.unfreezeTimeoutId), this.unfreezeTimeoutId = window.setTimeout(() => {
      this.renderState.isFrozen && this.requestMap.size === 0 && this.unfreezeNodeContent(), this.unfreezeTimeoutId = null;
    }, this.unfreezeDelay);
  }
  setQualityLevel(t) {
    if (this.renderState.qualityLevel !== t) {
      switch (this.renderState.qualityLevel = t, t) {
        case "high":
          dH({
            enableRenderQuality: !0,
            enableImageThumbnails: !0,
            enableVideoLazyLoad: !0,
            tinyZoomThreshold: .1
          });
          break;
        case "medium":
          dH({
            enableRenderQuality: !0,
            enableImageThumbnails: !1,
            enableVideoLazyLoad: !0,
            tinyZoomThreshold: .15
          });
          break;
        case "low":
          dH({
            enableRenderQuality: !0,
            enableImageThumbnails: !1,
            enableVideoLazyLoad: !1,
            tinyZoomThreshold: .25
          });
          break;
      }
      this.dispatchStateChangeEvent();
    }
  }
  dispatchStateChangeEvent() {
    const t = new CustomEvent("nodeRenderStateChanged", {
      detail: {
        ...this.renderState
      }
    });
    window.dispatchEvent(t);
  }
  getRenderState() {
    return {
      ...this.renderState
    };
  }
  manualFreeze() {
    this.freezeNodeContent();
  }
  manualUnfreeze() {
    this.unfreezeNodeContent();
  }
  setFreezeThreshold(t) {
    this.freezeThreshold = t, console.log(`[NodeRenderOptimizer] Freeze threshold set to: ${t}`);
  }
  setUnfreezeDelay(t) {
    this.unfreezeDelay = t, console.log(`[NodeRenderOptimizer] Unfreeze delay set to: ${t}ms`);
  }
  setQualityAdjustmentEnabled(t) {
    this.qualityAdjustmentEnabled = t, console.log(`[NodeRenderOptimizer] Quality adjustment: ${t ? "enabled" : "disabled"}`);
  }
  isFrozen() {
    return this.renderState.isFrozen;
  }
  getQualityLevel() {
    return this.renderState.qualityLevel;
  }
  getActiveRequests() {
    return this.renderState.activeRequests;
  }
}

const yV = new E2o();

class T2o {
  constructor(t = {}) {
    On(this, "initialized", !1);
    On(this, "config");
    this.config = {
      enableConnectionLineOptimization: t.enableConnectionLineOptimization ?? !0,
      enableNodeRenderOptimization: t.enableNodeRenderOptimization ?? !0,
      busyThreshold: t.busyThreshold ?? 3,
      unfreezeDelay: t.unfreezeDelay ?? 2e3
    };
  }
  initialize() {
    if (this.initialized) {
      console.warn("[PerformanceOptimizationManager] Already initialized");
      return;
    }
    console.log("[PerformanceOptimizationManager] Initializing..."), this.config.enableConnectionLineOptimization && this.initConnectionLineOptimization(), this.config.enableNodeRenderOptimization && this.initNodeRenderOptimization(), this.setupEventListeners(), this.initialized = !0, console.log("[PerformanceOptimizationManager] Initialized successfully");
  }
  initConnectionLineOptimization() {
    console.log("[PerformanceOptimizationManager] Connection line optimization enabled"), window.addEventListener("performancePresetChanged", t => {});
  }
  initNodeRenderOptimization() {
    console.log("[PerformanceOptimizationManager] Node render optimization enabled"), window.addEventListener("nodeRenderStateChanged", t => {});
  }
  setupEventListeners() {
    window.addEventListener("assetDownloadStart", () => {
      console.log("[PerformanceOptimizationManager] Asset download started");
    }), window.addEventListener("allAssetsDownloadComplete", () => {
      console.log("[PerformanceOptimizationManager] All assets downloaded");
    });
  }
  getConnectionLineOptimizer() {
    return sO;
  }
  getNodeRenderOptimizer() {
    return yV;
  }
  getNetworkStatus() {
    return sO.getNetworkStatus();
  }
  getRenderState() {
    return yV.getRenderState();
  }
  getStats() {
    return {
      connectionLine: {
        preset: sO.getCurrentPreset(),
        animationsEnabled: sO.isConnectionAnimationsEnabled(),
        networkStatus: sO.getNetworkStatus()
      },
      nodeRender: {
        isFrozen: yV.isFrozen(),
        qualityLevel: yV.getQualityLevel(),
        activeRequests: yV.getActiveRequests()
      }
    };
  }
  pauseAll() {
    sO.pauseConnectionAnimations(), yV.manualFreeze(), console.log("[PerformanceOptimizationManager] All optimizations paused");
  }
  resumeAll() {
    sO.resumeConnectionAnimations(), yV.manualUnfreeze(), console.log("[PerformanceOptimizationManager] All optimizations resumed");
  }
  reset() {
    this.initialized = !1, console.log("[PerformanceOptimizationManager] Reset");
  }
}

const h1r = new T2o({
  enableConnectionLineOptimization: !0,
  enableNodeRenderOptimization: !0,
  busyThreshold: 3,
  unfreezeDelay: 2e3
});

function M2o() {
  h1r.initialize();
}

const P2o = Object.freeze(Object.defineProperty({
  __proto__: null,
  initializePerformanceOptimization: M2o,
  performanceOptimizationManager: h1r
}, Symbol.toStringTag, {
  value: "Module"
}));

class R2o {
  constructor(t = {}) {
    On(this, "config");
    On(this, "loadingStates", new Map());
    On(this, "optimisticUpdates", new Map());
    On(this, "skeletonScreens", new Map());
    this.config = {
      enableLoadingAnimation: t.enableLoadingAnimation ?? !0,
      enableSkeletonScreen: t.enableSkeletonScreen ?? !0,
      enableOptimisticUpdate: t.enableOptimisticUpdate ?? !0,
      loadingDelay: t.loadingDelay ?? 300,
      skeletonDuration: t.skeletonDuration ?? 2e3
    };
  }
  showLoading(t, n) {
    if (!this.config.enableLoadingAnimation) return;
    this.loadingStates.set(t, !0);
    const r = new CustomEvent("loadingStart", {
      detail: {
        id: t,
        message: n
      }
    });
    window.dispatchEvent(r), console.log(`[UIFeedbackManager] Loading started: ${t}`);
  }
  hideLoading(t) {
    this.loadingStates.delete(t);
    const n = new CustomEvent("loadingEnd", {
      detail: {
        id: t
      }
    });
    window.dispatchEvent(n), console.log(`[UIFeedbackManager] Loading ended: ${t}`);
  }
  isLoading(t) {
    return this.loadingStates.has(t);
  }
  showSkeletonScreen(t, n) {
    if (!this.config.enableSkeletonScreen) return;
    const r = document.createElement("div");
    r.id = `skeleton-${t}`, r.className = "skeleton-screen", r.innerHTML = n, this.skeletonScreens.set(t, r);
    const a = new CustomEvent("skeletonScreenShow", {
      detail: {
        id: t
      }
    });
    window.dispatchEvent(a), console.log(`[UIFeedbackManager] Skeleton screen shown: ${t}`), setTimeout(() => {
      this.hideSkeletonScreen(t);
    }, this.config.skeletonDuration);
  }
  hideSkeletonScreen(t) {
    const n = this.skeletonScreens.get(t);
    if (n) {
      n.remove(), this.skeletonScreens.delete(t);
      const r = new CustomEvent("skeletonScreenHide", {
        detail: {
          id: t
        }
      });
      window.dispatchEvent(r), console.log(`[UIFeedbackManager] Skeleton screen hidden: ${t}`);
    }
  }
  optimisticUpdate(t, n, r, a) {
    if (!this.config.enableOptimisticUpdate) {
      r().catch(o => {
        console.error("[UIFeedbackManager] Sync failed:", o), a == null || a(o);
      });
      return;
    }
    const i = this.captureState(t);
    n(), r().then(() => {
      console.log(`[UIFeedbackManager] Optimistic update confirmed: ${t}`);
      const o = new CustomEvent("optimisticUpdateConfirmed", {
        detail: {
          id: t
        }
      });
      window.dispatchEvent(o);
    }).catch(o => {
      console.error("[UIFeedbackManager] Optimistic update failed:", o), this.rollbackState(t, i);
      const s = new CustomEvent("optimisticUpdateFailed", {
        detail: {
          id: t,
          error: o.message
        }
      });
      window.dispatchEvent(s), a == null || a(o);
    });
  }
  captureState(t) {
    return {
      id: t,
      timestamp: Date.now()
    };
  }
  rollbackState(t, n) {
    console.log(`[UIFeedbackManager] Rolling back state for: ${t}`);
    const r = new CustomEvent("stateRollback", {
      detail: {
        id: t,
        state: n
      }
    });
    window.dispatchEvent(r);
  }
  showProgressBar(t, n = 0) {
    const r = new CustomEvent("progressBarShow", {
      detail: {
        id: t,
        progress: n
      }
    });
    window.dispatchEvent(r), console.log(`[UIFeedbackManager] Progress bar shown: ${t}`);
  }
  updateProgressBar(t, n) {
    const r = Math.max(0, Math.min(100, n)),
      a = new CustomEvent("progressBarUpdate", {
        detail: {
          id: t,
          progress: r
        }
      });
    window.dispatchEvent(a);
  }
  hideProgressBar(t) {
    const n = new CustomEvent("progressBarHide", {
      detail: {
        id: t
      }
    });
    window.dispatchEvent(n), console.log(`[UIFeedbackManager] Progress bar hidden: ${t}`);
  }
  showSuccess(t, n) {
    const r = new CustomEvent("feedbackSuccess", {
      detail: {
        id: t,
        message: n
      }
    });
    window.dispatchEvent(r), console.log(`[UIFeedbackManager] Success: ${n}`);
  }
  showError(t, n) {
    const r = new CustomEvent("feedbackError", {
      detail: {
        id: t,
        message: n
      }
    });
    window.dispatchEvent(r), console.error(`[UIFeedbackManager] Error: ${n}`);
  }
  showWarning(t, n) {
    const r = new CustomEvent("feedbackWarning", {
      detail: {
        id: t,
        message: n
      }
    });
    window.dispatchEvent(r), console.warn(`[UIFeedbackManager] Warning: ${n}`);
  }
  getLoadingStates() {
    return Array.from(this.loadingStates.keys());
  }
  getOptimisticUpdates() {
    return Array.from(this.optimisticUpdates.keys());
  }
  setLoadingAnimationEnabled(t) {
    this.config.enableLoadingAnimation = t, console.log(`[UIFeedbackManager] Loading animation: ${t ? "enabled" : "disabled"}`);
  }
  setSkeletonScreenEnabled(t) {
    this.config.enableSkeletonScreen = t, console.log(`[UIFeedbackManager] Skeleton screen: ${t ? "enabled" : "disabled"}`);
  }
  setOptimisticUpdateEnabled(t) {
    this.config.enableOptimisticUpdate = t, console.log(`[UIFeedbackManager] Optimistic update: ${t ? "enabled" : "disabled"}`);
  }
  cleanup() {
    this.loadingStates.clear(), this.optimisticUpdates.clear(), this.skeletonScreens.forEach(t => t.remove()), this.skeletonScreens.clear(), console.log("[UIFeedbackManager] Cleanup completed");
  }
}

const OPe = new R2o({
  enableLoadingAnimation: !0,
  enableSkeletonScreen: !0,
  enableOptimisticUpdate: !0,
  loadingDelay: 300,
  skeletonDuration: 2e3
});

class N2o {
  constructor(t = {}) {
    On(this, "initialized", !1);
    On(this, "config");
    On(this, "lastMemoryWarningLog", 0);
    On(this, "MEMORY_WARNING_LOG_COOLDOWN_MS", 60 * 1e3);
    this.config = {
      enableMemoryOptimization: t.enableMemoryOptimization ?? !0,
      enableUIFeedbackOptimization: t.enableUIFeedbackOptimization ?? !0,
      enableMemoryMonitoring: t.enableMemoryMonitoring ?? !0
    };
  }
  initialize() {
    if (this.initialized) {
      console.warn("[FinalOptimizationManager] Already initialized");
      return;
    }
    console.log("[FinalOptimizationManager] Initializing..."), this.config.enableMemoryOptimization && this.initMemoryOptimization(), this.config.enableUIFeedbackOptimization && this.initUIFeedbackOptimization(), this.setupEventListeners(), this.initialized = !0, console.log("[FinalOptimizationManager] Initialized successfully");
  }
  initMemoryOptimization() {
    console.log("[FinalOptimizationManager] Memory optimization enabled");
    const t = a9();
    this.config.enableMemoryMonitoring && t.enableMemoryPoolPolling ? TR.startMonitoring() : console.log(`[FinalOptimizationManager] MemoryPool 5s polling disabled (tier=${t.tier}); using MemoryMonitor as the single source of truth`), window.addEventListener("memoryWarning", n => {
      const r = Date.now();
      r - this.lastMemoryWarningLog >= this.MEMORY_WARNING_LOG_COOLDOWN_MS && (this.lastMemoryWarningLog = r, console.warn("[FinalOptimizationManager] Memory warning:", n.detail));
    }), window.addEventListener("memoryCleanup", n => {
      console.log("[FinalOptimizationManager] Memory cleanup:", n.detail);
    });
  }
  initUIFeedbackOptimization() {
    console.log("[FinalOptimizationManager] UI feedback optimization enabled"), window.addEventListener("loadingStart", t => {
      console.log("[FinalOptimizationManager] Loading started:", t.detail);
    }), window.addEventListener("loadingEnd", t => {
      console.log("[FinalOptimizationManager] Loading ended:", t.detail);
    }), window.addEventListener("optimisticUpdateConfirmed", t => {
      console.log("[FinalOptimizationManager] Optimistic update confirmed:", t.detail);
    }), window.addEventListener("optimisticUpdateFailed", t => {
      console.warn("[FinalOptimizationManager] Optimistic update failed:", t.detail);
    }), window.addEventListener("feedbackSuccess", t => {
      console.log("[FinalOptimizationManager] Success:", t.detail);
    }), window.addEventListener("feedbackError", t => {
      console.error("[FinalOptimizationManager] Error:", t.detail);
    });
  }
  setupEventListeners() {
    window.addEventListener("allAssetsDownloadComplete", () => {
      console.log("[FinalOptimizationManager] All assets downloaded");
    }), window.addEventListener("beforeunload", () => {
      this.cleanup();
    });
  }
  getMemoryPoolManager() {
    return TR;
  }
  getUIFeedbackManager() {
    return OPe;
  }
  getStats() {
    return {
      memory: {
        poolStatus: TR.getPoolStatus(),
        memoryUsage: TR.getMemoryUsage(),
        stats: TR.getStats()
      },
      uiFeedback: {
        loadingStates: OPe.getLoadingStates(),
        optimisticUpdates: OPe.getOptimisticUpdates()
      }
    };
  }
  cleanupMemory() {
    TR.cleanup();
  }
  cleanup() {
    TR.stopMonitoring(), OPe.cleanup(), console.log("[FinalOptimizationManager] Cleanup completed");
  }
  reset() {
    this.initialized = !1, this.cleanup(), console.log("[FinalOptimizationManager] Reset");
  }
}

const p1r = new N2o({
  enableMemoryOptimization: !0,
  enableUIFeedbackOptimization: !0,
  enableMemoryMonitoring: !0
});

function j2o() {
  p1r.initialize();
}

const D2o = Object.freeze(Object.defineProperty({
  __proto__: null,
  finalOptimizationManager: p1r,
  initializeFinalOptimization: j2o
}, Symbol.toStringTag, {
  value: "Module"
}));

function L2o(e, t, n, r = .05, a = !0) {
  let i = e,
    o = t,
    s = 0,
    l = 0;
  if (a) {
    const p = Math.max(e, t);
    i = p, o = p, s = (p - e) / 2, l = (p - t) / 2, console.log("[MarkerMask] 调整为正方形:", {
      original: `${e}×${t}`,
      square: `${i}×${o}`,
      offset: `(${s}, ${l})`
    });
  }
  const d = document.createElement("canvas");
  d.width = i, d.height = o;
  const u = d.getContext("2d");
  if (!u) throw new Error("无法创建Canvas上下文");
  u.fillStyle = "black", u.fillRect(0, 0, i, o), u.fillStyle = "white", console.log("[MarkerMask] 开始生成蒙版:", {
    canvasSize: `${i}×${o}`,
    imageSize: `${e}×${t}`,
    markerCount: n.length
  });
  for (const p of n) {
    const m = p.x * e + s,
      f = p.y * t + l,
      y = (p.radius || r) * Math.min(e, t);
    console.log("[MarkerMask] 绘制标记点:", {
      label: p.label,
      relativePos: `(${(p.x * 100).toFixed(1)}%, ${(p.y * 100).toFixed(1)}%)`,
      absolutePos: `(${Math.round(m)}, ${Math.round(f)})`,
      radius: Math.round(y)
    }), u.beginPath(), u.arc(m, f, y, 0, Math.PI * 2), u.fill();
  }
  const h = d.toDataURL("image/png").split(",")[1];
  return console.log("[MarkerMask] ✅ 蒙版生成完成:", {
    size: `${i}×${o}`,
    dataSize: `${(h.length / 1024).toFixed(2)} KB`
  }), h;
}

const O2o = new Set(["未分析", "图片", "部件", "细节", "Region", "Content", "Overall", "Part"]);

function I$t(e) {
  const t = String(e || "").trim();
  return !t || O2o.has(t) ? !0 : /^\d+$/.test(t);
}

function C$t(e) {
  const t = e.activeLevel === "main" ? [e.mainLabel, e.label, e.detailLabel, e.partLabel] : e.activeLevel === "part" ? [e.partLabel, e.label, e.detailLabel, e.mainLabel] : [e.detailLabel, e.label, e.partLabel, e.mainLabel];
  for (const n of t) {
    const r = String(n || "").trim();
    if (!I$t(r)) return r;
  }
  return "";
}

function m1r(e, t, n, r = "zh") {
  const a = e.filter(l => !l.isAnalyzing);
  if (a.length === 0) return "";
  const i = a.map((l, d) => {
    const u = Math.round(l.x / 100 * t),
      h = Math.round(l.y / 100 * n),
      p = C$t(l);
    let m = "";
    return p ? l.activeLevel === "main" ? m = r === "zh" ? `整体: ${p}` : `Overall: ${p}` : l.activeLevel === "part" ? m = r === "zh" ? `部件: ${p}` : `Part: ${p}` : m = r === "zh" ? `细节: ${p}` : `Detail: ${p}` : m = r === "zh" ? "请根据蒙版白色区域进行局部修改" : "Modify only the white mask region", r === "zh" ? `标记${d + 1} [位置: (${u}, ${h})px / (${Math.round(l.x)}%, ${Math.round(l.y)}%)] - ${m}` : `Mark${d + 1} [Position: (${u}, ${h})px / (${Math.round(l.x)}%, ${Math.round(l.y)}%)] - ${m}`;
  }).join(`
`);
  return `${r === "zh" ? `【重要】图片局部修改指令 - 使用蒙版精确定位：

参考图片尺寸：${t}×${n}像素

修改要求：` : `【Important】Image Local Modification Instructions - Using Mask for Precise Positioning:

Reference Image Size: ${t}×${n}px

Modification Requirements:`}
${i}${r === "zh" ? `

蒙版说明：
- 已提供黑白蒙版图（mask），白色区域表示需要修改的位置
- 请严格按照蒙版白色区域进行修改，黑色区域必须保持完全不变
- 蒙版白色区域已精确标记了每个修改点的位置和影响范围

修改规则：
1. 只修改蒙版白色区域内的内容
2. 保持图片整体风格、光影、色调和构图不变
3. 确保修改后的内容与周围环境自然融合
4. 黑色蒙版区域的内容必须保持原样，不做任何改动` : `

Mask Instructions:
- A black and white mask image (mask) is provided, white areas indicate positions to be modified
- Please strictly modify according to the white areas of the mask, black areas must remain completely unchanged
- The white areas of the mask have precisely marked the position and influence range of each modification point

Modification Rules:
1. Only modify content within the white areas of the mask
2. Maintain the overall style, lighting, tone and composition of the image
3. Ensure modified content blends naturally with the surrounding environment
4. Content in black mask areas must remain unchanged`}`;
}

function B2o(e, t = "image/png") {
  const n = atob(e),
    r = new ArrayBuffer(n.length),
    a = new Uint8Array(r);
  for (let i = 0; i < n.length; i++) a[i] = n.charCodeAt(i);
  return new Blob([r], {
    type: t
  });
}

async function F2o(e) {
  return new Promise((t, n) => {
    const r = new Image(),
      a = URL.createObjectURL(e);
    r.onload = () => {
      const i = Math.max(r.width, r.height),
        o = document.createElement("canvas");
      o.width = i, o.height = i;
      const s = o.getContext("2d");
      if (!s) {
        n(new Error("无法创建Canvas上下文"));
        return;
      }
      s.fillStyle = "black", s.fillRect(0, 0, i, i);
      const l = (i - r.width) / 2,
        d = (i - r.height) / 2;
      s.drawImage(r, l, d), o.toBlob(u => {
        URL.revokeObjectURL(a), u ? (console.log("[MarkerMask] 图片已转换为正方形:", {
          original: `${r.width}×${r.height}`,
          square: `${i}×${i}`
        }), t(u)) : n(new Error("转换为Blob失败"));
      }, "image/png");
    }, r.onerror = () => {
      URL.revokeObjectURL(a), n(new Error("加载图片失败"));
    }, r.src = a;
  });
}

const Aoe = Object.freeze(Object.defineProperty({
  __proto__: null,
  base64ToBlob: B2o,
  buildMarkerPrompt: m1r,
  generateMarkerMask: L2o,
  isMarkerPlaceholderLabel: I$t,
  makeImageSquare: F2o,
  resolveMarkerInstruction: C$t
}, Symbol.toStringTag, {
  value: "Module"
}));

function z2o(e, t) {}

const U2o = Object.freeze(Object.defineProperty({
    __proto__: null,
    buildMarkerPrompt: m1r,
    initGeminiMarkerService: z2o,
    isMarkerPlaceholderLabel: I$t,
    resolveMarkerInstruction: C$t
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  $2o = ["/models/director3d/female-standing-pose.fbx", "/models/director3d/female-standing-pose-1.fbx"];

let Qyn = !1;

function G2o() {
  Qyn || typeof window > "u" || (Qyn = !0, $2o.forEach((e, t) => {
    setTimeout(() => {
      fetch(e, {
        cache: "force-cache"
      }).catch(() => {});
    }, t * 200);
  }));
}

const V2o = Object.freeze(Object.defineProperty({
  __proto__: null,
  preloadDirector3dAssets: G2o
}, Symbol.toStringTag, {
  value: "Module"
}));

function Yyn() {
  try {
    const e = performance.memory;
    if (e != null && e.usedJSHeapSize) return e.usedJSHeapSize / 1024 / 1024;
  } catch {}
  return 0;
}

function H2o() {
  try {
    if (KX() || mUe()) return !0;
  } catch {}
  try {
    return !!(typeof document < "u" && document.querySelector(".sketch-lightbox"));
  } catch {
    return !1;
  }
}

async function W2o() {
  var n, r;
  if (typeof window > "u") return 0;
  const e = window.__getVisibleNodeIds,
    t = e == null ? void 0 : e();
  if (!t) return 0;
  try {
    const {
      mediaResourceRegistry: a
    } = await Ie(async () => {
      const {
        mediaResourceRegistry: d
      } = await Promise.resolve().then(() => Kfr);
      return {
        mediaResourceRegistry: d
      };
    }, void 0, import.meta.url);
    if (a.getStats().totalNodes === 0) return 0;
    const o = (n = window.__getCanvasMemoryRoots) == null ? void 0 : n.call(window),
      s = ((r = o == null ? void 0 : o.nodes) == null ? void 0 : r.map(d => d.id)) ?? [];
    let l = 0;
    for (const d of s) t.has(d) || a.getNodeResourceCount(d) > 0 && (a.releaseNode(d, !0), l += 1);
    return l;
  } catch {
    return 0;
  }
}

function Xyn() {
  var t;
  const e = new Set();
  try {
    const n = (t = window.__getCanvasMemoryRoots) == null ? void 0 : t.call(window);
    for (const r of ((n == null ? void 0 : n.history) ?? []).slice(0, 80)) {
      const a = String((r == null ? void 0 : r.id) || "").trim();
      a && e.add(a);
    }
  } catch {}
  return e;
}

async function f1r(e) {
  var u, h, p;
  const t = Yyn();
  try {
    const {
      isCanvasViewInteracting: m,
      getCanvasPanning: f,
      getCanvasZooming: y
    } = await Ie(async () => {
      const {
        isCanvasViewInteracting: b,
        getCanvasPanning: v,
        getCanvasZooming: _
      } = await Promise.resolve().then(() => W2);
      return {
        isCanvasViewInteracting: b,
        getCanvasPanning: v,
        getCanvasZooming: _
      };
    }, void 0, import.meta.url);
    if (m() || f() || y()) return {
      beforeMB: t,
      afterMB: t,
      freedMB: 0,
      offscreenNodesReleased: 0
    };
  } catch {}
  try {
    const {
      isPanelHydrateGraceActive: m
    } = await Ie(async () => {
      const {
        isPanelHydrateGraceActive: f
      } = await Promise.resolve().then(() => aD);
      return {
        isPanelHydrateGraceActive: f
      };
    }, void 0, import.meta.url);
    if (m()) return {
      beforeMB: t,
      afterMB: t,
      freedMB: 0,
      offscreenNodesReleased: 0
    };
  } catch {}
  await $pr({
    deferLazyRestore: !0
  });
  const n = H2o();
  try {
    const m = (u = window.__getCanvasMemoryRoots) == null ? void 0 : u.call(window);
    if (!n && Array.isArray(m == null ? void 0 : m.nodes) && m.nodes.length === 0) {
      const [{
          discardDeferredCanvasReactUpdates: f
        }, {
          releaseAllDisplayUrlBlobMappings: y
        }] = await Promise.all([Ie(() => Promise.resolve().then(() => W2), void 0, import.meta.url), Ie(() => Promise.resolve().then(() => No), void 0, import.meta.url)]),
        b = f(),
        v = y();
    }
  } catch {}
  if (!n) try {
    const m = window.__demoteHistoryEphemeralMedia;
    m == null || m();
  } catch {}
  try {
    const {
      clearProjectMediaResolveCaches: m
    } = await Ie(async () => {
      const {
        clearProjectMediaResolveCaches: f
      } = await Promise.resolve().then(() => I2i);
      return {
        clearProjectMediaResolveCaches: f
      };
    }, void 0, import.meta.url);
    m();
  } catch {}
  try {
    const {
      clearAllMaterialPreviewCache: m
    } = await Ie(async () => {
      const {
        clearAllMaterialPreviewCache: f
      } = await Promise.resolve().then(() => T6a);
      return {
        clearAllMaterialPreviewCache: f
      };
    }, void 0, import.meta.url);
    m();
  } catch {}
  try {
    window.dispatchEvent(new CustomEvent("canvasSessionMemoryReclaimed"));
  } catch {}
  try {
    const {
      clearGlobalOssMaterialMemoryCaches: m
    } = await Ie(async () => {
      const {
        clearGlobalOssMaterialMemoryCaches: f
      } = await Promise.resolve().then(() => ii);
      return {
        clearGlobalOssMaterialMemoryCaches: f
      };
    }, void 0, import.meta.url);
    m(Xyn());
  } catch {}
  try {
    const {
      clearEditImageHistorySyncCache: m
    } = await Ie(async () => {
      const {
        clearEditImageHistorySyncCache: f
      } = await Promise.resolve().then(() => o5e);
      return {
        clearEditImageHistorySyncCache: f
      };
    }, void 0, import.meta.url);
    m();
  } catch {}
  try {
    const {
      clearChatApiImageUrlCache: m
    } = await Ie(async () => {
      const {
        clearChatApiImageUrlCache: f
      } = await Promise.resolve().then(() => Mc);
      return {
        clearChatApiImageUrlCache: f
      };
    }, void 0, import.meta.url);
    m();
  } catch {}
  try {
    const {
      pruneHistoryTaskLifecycle: m
    } = await Ie(async () => {
      const {
        pruneHistoryTaskLifecycle: f
      } = await Promise.resolve().then(() => J7r);
      return {
        pruneHistoryTaskLifecycle: f
      };
    }, void 0, import.meta.url);
    m(Xyn());
  } catch {}
  try {
    bDr();
  } catch {}
  try {
    ADr();
  } catch {}
  try {
    eRr();
  } catch {}
  try {
    const m = (h = window.__getCanvasMemoryRoots) == null ? void 0 : h.call(window);
    (!Array.isArray(m == null ? void 0 : m.nodes) || m.nodes.length === 0) && Qfr();
  } catch {}
  try {
    Yfr(), gSt().clear(), Xfr();
  } catch {}
  try {
    const {
      autoDownloadManager: m
    } = await Ie(async () => {
      const {
        autoDownloadManager: f
      } = await Promise.resolve().then(() => a8o);
      return {
        autoDownloadManager: f
      };
    }, void 0, import.meta.url);
    (p = m.clearBlobUrlCache) == null || p.call(m);
  } catch {}
  let r = 0;
  try {
    const [{
      clearOssUrlLocalMemoryCache: m
    }, {
      clearOssUrlPriorityQueue: f
    }, {
      resetOssThumbPreloadState: y
    }, {
      clearTauriDownloadSessionCache: b
    }] = await Promise.all([Ie(() => Promise.resolve().then(() => l3), void 0, import.meta.url), Ie(() => Promise.resolve().then(() => Zsa), void 0, import.meta.url), Ie(() => Promise.resolve().then(() => wlr), void 0, import.meta.url), Ie(() => Promise.resolve().then(() => El), void 0, import.meta.url)]);
    f();
    const v = m();
    y(), b(), r += v.entries;
  } catch {}
  let a = 0;
  try {
    const {
      purgeIdleLocalObjectUrls: m
    } = await Ie(async () => {
      const {
        purgeIdleLocalObjectUrls: y
      } = await Promise.resolve().then(() => eU);
      return {
        purgeIdleLocalObjectUrls: y
      };
    }, void 0, import.meta.url);
    a = m({
      maxAgeMs: 3e4,
      maxEntries: 16,
      forceBorrowed: !n
    }).purged;
  } catch {}
  try {
    const {
      clearLocalGenApiBlobCache: m
    } = await Ie(async () => {
      const {
        clearLocalGenApiBlobCache: f
      } = await Promise.resolve().then(() => Mc);
      return {
        clearLocalGenApiBlobCache: f
      };
    }, void 0, import.meta.url);
    m();
  } catch {}
  const i = await W2o();
  XJe();
  const o = Math.max(1, Math.min(4, (e == null ? void 0 : e.gcRounds) ?? (e != null && e.devToolsGc ? 2 : 1)));
  (e != null && e.devToolsGc ? await (async () => {
    try {
      const {
        forceDevToolsLikeGc: m
      } = await Ie(async () => {
        const {
          forceDevToolsLikeGc: f
        } = await Promise.resolve().then(() => vzt);
        return {
          forceDevToolsLikeGc: f
        };
      }, void 0, import.meta.url);
      return await m({
        maxRounds: o,
        skipCdp: !0
      }), {
        available: !0,
        invoked: 1
      };
    } catch {
      return {
        available: !1,
        invoked: 0
      };
    }
  })() : await bzt(o)).available || (await new Promise(m => {
    typeof requestAnimationFrame == "function" ? requestAnimationFrame(() => requestAnimationFrame(() => m())) : setTimeout(m, 32);
  }), await new Promise(m => setTimeout(m, 60)));
  const l = Yyn(),
    d = Math.max(0, t - l);
  if (a > 0 || i > 0 || r > 0) try {
    const {
      dispatchMediaBlobUrlsInvalidated: m
    } = await Ie(async () => {
      const {
        dispatchMediaBlobUrlsInvalidated: f
      } = await Promise.resolve().then(() => mjt);
      return {
        dispatchMediaBlobUrlsInvalidated: f
      };
    }, void 0, import.meta.url);
    m();
  } catch {}
  return d > 10 && console.log(`[SessionMemoryReclaim] ${t.toFixed(0)}MB → ${l.toFixed(0)}MB (freed ~${d.toFixed(0)}MB, offscreen nodes ${i})`), {
    beforeMB: t,
    afterMB: l,
    freedMB: d,
    offscreenNodesReleased: i
  };
}

typeof window < "u" && (window.__sessionMemoryReclaim = f1r);

const E$t = Object.freeze(Object.defineProperty({
  __proto__: null,
  sessionMemoryReclaim: f1r
}, Symbol.toStringTag, {
  value: "Module"
}));

class q2o {
  constructor() {
    On(this, "memoryHistory", []);
    On(this, "maxHistoryLength", 100);
    On(this, "cleanupIntervalId", null);
  }
  getMemoryStats() {
    if (typeof performance > "u" || !performance.memory) return null;
    const t = performance.memory,
      n = t.usedJSHeapSize || 0,
      r = t.jsHeapSizeLimit || 0;
    return {
      jsHeapUsed: n,
      jsHeapLimit: r,
      jsHeapUsedMB: n / (1024 * 1024),
      jsHeapLimitMB: r / (1024 * 1024),
      usagePercent: r > 0 ? n / r * 100 : 0,
      timestamp: Date.now()
    };
  }
  recordSnapshot() {
    const t = this.getMemoryStats();
    return t && (this.memoryHistory.push(t), this.memoryHistory.length > this.maxHistoryLength && this.memoryHistory.shift()), t;
  }
  getMemoryHistory() {
    return [...this.memoryHistory];
  }
  getMemoryGrowthRate() {
    if (this.memoryHistory.length < 2) return null;
    const t = this.memoryHistory[this.memoryHistory.length - 1],
      n = this.memoryHistory[0],
      r = (t.timestamp - n.timestamp) / 1e3;
    return r === 0 ? null : (t.jsHeapUsedMB - n.jsHeapUsedMB) / r;
  }
  async cleanupMemory() {
    const t = this.recordSnapshot();
    let n = !1;
    try {
      const {
        sessionMemoryReclaim: o
      } = await Ie(async () => {
        const {
          sessionMemoryReclaim: s
        } = await Promise.resolve().then(() => E$t);
        return {
          sessionMemoryReclaim: s
        };
      }, void 0, import.meta.url);
      await o();
    } catch (o) {
      console.warn("[MemoryCleanup] sessionMemoryReclaim failed, falling back:", o), this.releaseOrphanedCanvases();
    }
    let r = null;
    try {
      const {
        forceDevToolsLikeGc: o,
        isManualGcAvailable: s,
        probeGcEffectiveness: l
      } = await Ie(async () => {
        const {
          forceDevToolsLikeGc: u,
          isManualGcAvailable: h,
          probeGcEffectiveness: p
        } = await Promise.resolve().then(() => vzt);
        return {
          forceDevToolsLikeGc: u,
          isManualGcAvailable: h,
          probeGcEffectiveness: p
        };
      }, void 0, import.meta.url);
      if (n = s(), n) {
        const u = await l().catch(() => null);
        u && u.effective;
      }
      r = (await o()).heapMBAfter;
    } catch {}
    await new Promise(o => setTimeout(o, 100));
    const a = this.recordSnapshot();
    a && r != null && r < a.jsHeapUsedMB && (a.jsHeapUsedMB = r, a.jsHeapUsed = r * 1024 * 1024, a.usagePercent = a.jsHeapLimitMB > 0 ? a.jsHeapUsedMB / a.jsHeapLimitMB * 100 : 0);
    const i = t && a ? t.jsHeapUsedMB - a.jsHeapUsedMB : 0;
    return {
      before: t,
      after: a,
      freedMB: i,
      gcAvailable: n
    };
  }
  releaseOrphanedCanvases() {
    document.querySelectorAll('canvas:not([data-persist="true"])').forEach(n => {
      const r = n.getContext("webgl");
      if (r) {
        const a = r.getExtension("WEBGL_lose_context");
        a && a.loseContext();
      }
    });
  }
  enableAutoMonitoring(t = 5e3) {
    if (this.cleanupIntervalId !== null) {
      console.warn("[MemoryCleanup] Auto monitoring already enabled");
      return;
    }
    this.cleanupIntervalId = window.setInterval(() => {
      this.recordSnapshot();
    }, t), console.log(`[MemoryCleanup] Auto monitoring enabled (interval: ${t}ms)`);
  }
  disableAutoMonitoring() {
    this.cleanupIntervalId !== null && (window.clearInterval(this.cleanupIntervalId), this.cleanupIntervalId = null, console.log("[MemoryCleanup] Auto monitoring disabled"));
  }
  clearHistory() {
    this.memoryHistory = [];
  }
  printStats() {
    const t = this.getMemoryStats();
    if (!t) {
      console.log("[MemoryCleanup] Performance.memory not available");
      return;
    }
    console.group("[MemoryCleanup] Memory Stats"), console.log(`Used: ${t.jsHeapUsedMB.toFixed(2)} MB / ${t.jsHeapLimitMB.toFixed(2)} MB (${t.usagePercent.toFixed(1)}%)`);
    const n = this.getMemoryGrowthRate();
    n !== null && console.log(`Growth rate: ${n.toFixed(2)} MB/s`), console.log(`History length: ${this.memoryHistory.length}`), console.groupEnd();
  }
}

const g1r = new q2o();

typeof window < "u" && (window.__memoryCleanup = g1r);

const K2o = Object.freeze(Object.defineProperty({
  __proto__: null,
  memoryCleanupDebugger: g1r
}, Symbol.toStringTag, {
  value: "Module"
}));

function sdt(e) {
  return e.split(/[/\\]/).pop() || e;
}

function Jyn(e, t) {
  return `${e.replace(/[/\\]+$/, "")}\\${t}`;
}

async function y1r(e) {
  return e.text();
}

function Q2o(e) {
  return `${e}-${Date.now().toString(36)}`;
}

async function Y2o(e, t) {
  const n = URL.createObjectURL(e);
  try {
    const r = await new Promise((i, o) => {
        const s = new Image();
        s.onload = () => i(s), s.onerror = () => o(new BE("无法读取精灵图")), s.src = n;
      }),
      a = sjt(r.naturalWidth, r.naturalHeight, t);
    return {
      width: a.width,
      height: a.height,
      version: a.version
    };
  } finally {
    URL.revokeObjectURL(n);
  }
}

async function b1r(e, t) {
  const n = await Y2o(t, e.spriteVersionNumber),
    r = Q2o(e.id);
  return await J7i(r, t), gba({
    ...e,
    id: r,
    spriteVersionNumber: n.version,
    source: "imported"
  }), $8({
    enabled: !0,
    activePetId: r
  }), {
    id: r,
    displayName: e.displayName,
    spriteVersionNumber: n.version
  };
}

async function X2o(e) {
  const t = e.find(i => uba(i.name)),
    n = e.find(i => CWn(i.name)) || e.find(i => /\.(webp|png)$/i.test(i.name));
  if (!n) throw new BE("请选择 pet.json 与 spritesheet.webp/png");
  const r = n.name.replace(/\.[^.]+$/, ""),
    a = OFe(t ? JSON.parse(await y1r(t)) : {
      displayName: r,
      spriteVersionNumber: 2,
      spritesheetPath: n.name
    }, r);
  return b1r(a, n);
}

async function J2o() {
  if (!us()) throw new BE("浏览器请直接选择 pet.json 和精灵图");
  const {
      open: e
    } = await Ie(async () => {
      const {
        open: s
      } = await Promise.resolve().then(() => Sb);
      return {
        open: s
      };
    }, void 0, import.meta.url),
    t = await e({
      directory: !0,
      multiple: !1,
      title: "选择 Codex 桌宠文件夹"
    });
  if (typeof t != "string" || !t) throw new BE("未选择文件夹");
  let n = null;
  try {
    const s = await FDe(Jyn(t, "pet.json"));
    n = OFe(JSON.parse(await y1r(s)), sdt(t));
  } catch {
    n = OFe({
      displayName: sdt(t),
      spriteVersionNumber: 2,
      spritesheetPath: "spritesheet.webp"
    }, sdt(t));
  }
  const a = [CWn(n.spritesheetPath) ? n.spritesheetPath : "spritesheet.webp", "spritesheet.webp", "spritesheet.png"];
  let i = null,
    o = "";
  for (const s of [...new Set(a)]) try {
    i = await FDe(Jyn(t, s));
    break;
  } catch (l) {
    o = l instanceof Error ? l.message : String(l);
  }
  if (!i) throw new BE(`文件夹里没有 spritesheet.webp/png${o ? `：${o}` : ""}`);
  return b1r(n, i);
}

async function Z2o() {
  return new Promise((e, t) => {
    const n = document.createElement("input");
    n.type = "file", n.accept = ".json,.webp,.png,application/json,image/webp,image/png", n.multiple = !0, n.onchange = () => e(Array.from(n.files || [])), n.oncancel = () => t(new BE("已取消导入")), n.click();
  });
}

const e_o = ["小", "中", "大"],
  t_o = ["全开", "仅生成", "关闭"],
  n_o = ["待机", "跑动", "视线"],
  Zyn = "qiaodoumayi_desktop_pet_prefs_open";

function r_o(e) {
  return e === "小" ? "small" : e === "大" ? "large" : "medium";
}

function a_o(e) {
  return e === "small" ? "小" : e === "large" ? "大" : "中";
}

function i_o(e) {
  return e === "仅生成" ? "generate" : e === "关闭" ? "off" : "all";
}

function o_o(e) {
  return e === "generate" ? "仅生成" : e === "off" ? "关闭" : "全开";
}

function ldt({
  label: e,
  options: t,
  value: n,
  onChange: r
}) {
  return on(), c.jsx("div", {
    className: "settings-mode-pills",
    role: "radiogroup",
    "aria-label": e,
    children: t.map(a => c.jsx("button", {
      type: "button",
      role: "radio",
      "aria-checked": n === a,
      className: `settings-pill-btn${n === a ? " is-active" : ""}`,
      onClick: () => r(a),
      children: a
    }, a))
  });
}

function s_o(e, t) {
  return e === "跑动" ? {
    action: "running"
  } : e === "视线" && t ? {
    action: "look",
    lookIndex: 4
  } : {
    action: "idle"
  };
}

function l_o({
  isDark: e
}) {
  on();
  const t = jYe(),
    n = bba(),
    r = n.find(M => M.id === t.activePetId) ?? n[0],
    [a, i] = g.useState((r == null ? void 0 : r.spritesheetUrl) || null),
    [o, s] = g.useState(null),
    [l, d] = g.useState("待机"),
    [u, h] = g.useState(!1),
    [p, m] = g.useState(null),
    [f, y] = g.useState(null),
    [b, v] = g.useState(!1),
    [_, w] = g.useState(!1),
    [k, A] = g.useState(() => {
      try {
        return localStorage.getItem(Zyn) === "1";
      } catch {
        return !1;
      }
    });
  g.useEffect(() => {
    let M = null,
      T = !1;
    const P = n.find(j => j.id === t.activePetId) ?? n[0];
    return (async () => {
      let j = (P == null ? void 0 : P.spritesheetUrl) || null;
      if ((P == null ? void 0 : P.source) === "imported") {
        const F = await apr(P.id);
        F && !T && (j = URL.createObjectURL(F), M = j);
      }
      if (!j || T) return;
      const B = await new Promise((F, N) => {
        const G = new Image();
        G.onload = () => F(G), G.onerror = () => N(new Error("图集无法预览")), G.src = j;
      });
      T || (i(j), s(sjt(B.naturalWidth, B.naturalHeight, P == null ? void 0 : P.spriteVersionNumber)));
    })().catch(j => {
      T || (i(null), s(null), y(j instanceof Error ? j.message : String(j)));
    }), () => {
      T = !0, M && URL.revokeObjectURL(M);
    };
  }, [n, t.activePetId]), g.useEffect(() => {
    if (!_) return;
    const M = P => {
        P.target.closest(".desktop-pet-card__help-wrap") || w(!1);
      },
      T = P => {
        P.key === "Escape" && w(!1);
      };
    return document.addEventListener("pointerdown", M), document.addEventListener("keydown", T), () => {
      document.removeEventListener("pointerdown", M), document.removeEventListener("keydown", T);
    };
  }, [_]);
  const S = g.useMemo(() => {
      const M = s_o(l, !!(o != null && o.hasLookRows));
      if (M.action === "look") return Mhr({
        mood: "idle",
        dragging: !1,
        dragDir: "none",
        lookIndex: M.lookIndex ?? 4,
        transient: null,
        hasLookRows: !0
      });
      const T = IWn(M.action);
      return {
        action: T.id,
        row: T.row,
        col: 0,
        frames: T.frames,
        fps: T.fps,
        loop: !0
      };
    }, [o == null ? void 0 : o.hasLookRows, l]),
    C = e ? "text-zinc-400" : "text-zinc-500",
    I = e ? " sketch-button-dark" : "",
    E = async () => {
      h(!0), y(null), m(null);
      try {
        const M = us() ? await J2o() : await X2o(await Z2o());
        m(`已导入 ${M.displayName}（v${M.spriteVersionNumber}）`);
      } catch (M) {
        const T = M instanceof Error ? M.message : String(M);
        /取消/.test(T) || y(T);
      } finally {
        h(!1);
      }
    };
  return c.jsxs("div", {
    className: "canvas-tool-sheet",
    children: [c.jsx($u, {
      title: x("显示桌宠"),
      description: x("在画布上显示AIYOU桌面伙伴。单击展开输入，右键打开本页。"),
      action: c.jsxs(c.Fragment, {
        children: [c.jsxs("div", {
          className: "desktop-pet-card__help-wrap",
          children: [c.jsx("button", {
            type: "button",
            className: `desktop-pet-card__help-btn${e ? " desktop-pet-card__help-btn--dark" : ""}`,
            "aria-expanded": _,
            "aria-label": x("桌宠使用说明"),
            onClick: () => w(M => !M),
            children: "?"
          }), _ ? c.jsxs("div", {
            className: `desktop-pet-card__help${e ? " desktop-pet-card__help--dark" : ""}`,
            role: "note",
            children: [c.jsx("strong", {
              children: x("怎么用")
            }), c.jsx("p", {
              children: x("单击桌宠展开输入栏；＋号可换模型、语音输入或开新聊天；右键打开本页设置。生图、读画布、技能直接在输入栏说即可。待机会偶尔动一下；打开「悬停播放动画」后，只有鼠标移到宠物上才播放。任务处理中会继续动，画布上可拖动。")
            }), c.jsx("strong", {
              children: x("对话与通知")
            }), c.jsx("p", {
              children: x("聊天跟随对话中选择的模型；语音转写沿用现有语音配置，朗读使用系统声音。画布 Agent 支持生图、读取画布和技能，本地 Skill 使用你选择的工作目录。关闭画布联动会暂停画布与任务通知。")
            }), c.jsx("strong", {
              children: x("导入与切换")
            }), c.jsx("p", {
              children: x("支持 Codex v1/v2 桌宠包（pet.json + spritesheet.webp/png）。可导入多只，在下方列表点名称切换使用。")
            })]
          }) : null]
        }), c.jsx(Rj, {
          checked: t.enabled,
          onChange: M => $8({
            enabled: M
          }),
          label: x("显示桌宠")
        })]
      })
    }), c.jsx("div", {
      className: `desktop-pet-card__preview${e ? "" : " desktop-pet-card__preview--light"}`,
      onPointerEnter: () => v(!0),
      onPointerLeave: () => v(!1),
      children: a && o ? c.jsx(ipr, {
        src: a,
        atlas: o,
        presentation: S,
        scale: .78,
        paused: !b
      }) : c.jsx("span", {
        className: C,
        children: x("导入 Codex 桌宠后可预览")
      })
    }), c.jsx($u, {
      title: x("快捷预览"),
      description: x("预览待机、跑动或视线动作。"),
      action: c.jsx(ldt, {
        label: x("快捷预览"),
        options: n_o,
        value: l,
        onChange: M => d(M)
      })
    }), c.jsx($u, {
      title: x("显示大小"),
      description: x("画布上桌宠的显示尺寸。"),
      action: c.jsx(ldt, {
        label: x("显示大小"),
        options: e_o,
        value: a_o(t.size),
        onChange: M => $8({
          size: r_o(M)
        })
      })
    }), c.jsx($u, {
      title: x("画布联动"),
      description: x("关闭后暂停画布与任务通知。"),
      action: c.jsx(ldt, {
        label: x("画布联动"),
        options: t_o,
        value: o_o(t.linkMode),
        onChange: M => $8({
          linkMode: i_o(M)
        })
      })
    }), c.jsxs("div", {
      className: "desktop-pet-card__fold",
      children: [c.jsxs("button", {
        type: "button",
        className: `desktop-pet-card__fold-btn${e ? " is-dark" : ""}`,
        "aria-expanded": k,
        onClick: () => {
          const M = !k;
          A(M);
          try {
            localStorage.setItem(Zyn, M ? "1" : "0");
          } catch {}
        },
        children: [c.jsx(ss, {
          size: 13,
          className: `desktop-pet-card__fold-icon${k ? " is-open" : ""}`
        }), x("性格与通知")]
      }), k ? c.jsxs("div", {
        className: "desktop-pet-card__fold-body",
        children: [c.jsxs("label", {
          className: `block mb-3 text-[11px] ${C}`,
          children: [x("性格与称呼"), c.jsx("textarea", {
            "aria-label": x("桌宠性格"),
            className: "desktop-pet-card__personality",
            rows: 3,
            maxLength: 2e3,
            value: t.personality,
            onChange: M => $8({
              personality: M.target.value
            })
          })]
        }), c.jsx("div", {
          className: "canvas-tool-sheet",
          children: [["notifyGeneration", "生成完成通知", "生成完成或失败时提醒。"], ["notifyAgent", "Agent 通知", "处理中或待批准时提醒。"], ["notifyCanvas", "画布通知", "画布操作时提醒。"], ["hourlyChime", "定时提醒", "到点直接朗读。"], ["speakReplies", "朗读回复", "朗读聊天回复。"], ["speakNotifications", "朗读通知", "朗读桌宠通知。"], ["lookAtPointer", "视线跟随", "视线跟着鼠标。"], ["hoverAnimate", "悬停动画", "只有鼠标移到宠物上才播放动画。"]].map(([M, T, P]) => c.jsx($u, {
            title: T,
            description: P,
            action: c.jsx(Rj, {
              checked: t[M],
              label: T,
              onChange: R => {
                $8({
                  [M]: R
                }), M === "hourlyChime" && R && zWn();
              }
            })
          }, M))
        }), t.hourlyChime ? c.jsxs("label", {
          className: `desktop-pet-card__chime-interval ${C}`,
          children: [x("每隔"), c.jsx("input", {
            type: "number",
            min: 1,
            max: 240,
            "aria-label": x("提醒间隔分钟"),
            value: t.chimeIntervalMinutes,
            onChange: M => $8({
              chimeIntervalMinutes: Number(M.target.value)
            })
          }), x("分钟提醒一次，到点会直接朗读")]
        }) : null]
      }) : null]
    }), c.jsxs("div", {
      className: "desktop-pet-card__library",
      children: [c.jsx("div", {
        className: `desktop-pet-card__label ${C}`,
        children: x("当前桌宠")
      }), c.jsx("div", {
        className: "desktop-pet-card__pets",
        children: n.map(M => {
          const T = M.id === t.activePetId;
          return c.jsx("button", {
            type: "button",
            onClick: () => $8({
              activePetId: M.id,
              enabled: !0
            }),
            className: `desktop-pet-card__pet${T ? " is-active" : ""}${e ? " is-dark" : ""}`,
            children: M.displayName
          }, M.id);
        })
      }), c.jsxs("div", {
        className: "desktop-pet-card__library-bar",
        children: [f || p ? c.jsx("span", {
          className: `text-[10px] leading-relaxed ${f ? "text-red-500" : "text-emerald-500"}`,
          children: f || p
        }) : null, c.jsxs("div", {
          className: "flex items-center gap-2",
          children: [(r == null ? void 0 : r.source) === "imported" ? c.jsxs("button", {
            type: "button",
            className: `sketch-button sketch-button-muted sketch-button-xs${I}`,
            onClick: () => {
              Z7i(r.id), yba(r.id);
            },
            title: x("移除当前导入的桌宠"),
            children: [c.jsx(Qo, {
              size: 10
            }), x("移除")]
          }) : null, c.jsxs("button", {
            type: "button",
            className: `sketch-button sketch-button-primary sketch-button-xs${I}`,
            disabled: u,
            onClick: () => void E(),
            children: [u ? c.jsx(Ua, {
              size: 10,
              className: "animate-spin"
            }) : c.jsx(Sc, {
              size: 10
            }), x("导入 Codex 包")]
          })]
        })]
      })]
    })]
  });
}

const c_o = Object.freeze(Object.defineProperty({
  __proto__: null,
  DesktopPetToolCard: l_o
}, Symbol.toStringTag, {
  value: "Module"
}));

function v1r(e, t) {
  if (t) {
    const o = e,
      s = Array.isArray(e == null ? void 0 : e.data) ? e.data : (e == null ? void 0 : e.data) || [],
      l = (o == null ? void 0 : o.progress) || "0";
    return {
      progress: typeof l == "string" ? parseInt(l.replace("%", ""), 10) : l,
      responseData: e,
      songsData: s,
      status: String((o == null ? void 0 : o.status) || "").toUpperCase(),
      taskData: o
    };
  }
  const n = (e == null ? void 0 : e.data) || e,
    r = String((n == null ? void 0 : n.status) || (e == null ? void 0 : e.status) || ""),
    a = n == null ? void 0 : n.progress,
    i = typeof a == "string" ? parseInt(a.replace("%", ""), 10) : typeof a == "number" ? a : 0;
  return {
    progress: _1r(r, Number.isFinite(i) ? i : 0),
    responseData: e,
    songsData: Array.isArray(n == null ? void 0 : n.data) ? n.data : [],
    status: r,
    taskData: n
  };
}

function w1r(e, t) {
  const n = String(e || "").trim().toUpperCase();
  return ["SUCCESS", "COMPLETED", "COMPLETE", "SUCCEEDED", "FINISHED", "DONE"].includes(n);
}

function x1r(e) {
  return ["CREATE_TASK_FAILED", "GENERATE_AUDIO_FAILED", "CALLBACK_EXCEPTION", "SENSITIVE_WORD_ERROR", "ERROR", "FAILED"].includes(String(e || "").trim().toUpperCase());
}

function _1r(e, t) {
  const n = String(e || "").trim().toUpperCase();
  return n === "SUCCESS" || n === "COMPLETE" || n === "COMPLETED" ? 100 : n === "FIRST_SUCCESS" ? 70 : n === "TEXT_SUCCESS" ? 35 : n === "PENDING" || n === "GENERATING" || n === "STREAMING" ? Math.max(t, 10) : t;
}

function ebn(e, t) {
  const n = HU(e);
  if (!!!(n || e != null && e.audio_url || e != null && e.audioUrl || e != null && e.video_url)) return !1;
  const a = String((e == null ? void 0 : e.status) || (e == null ? void 0 : e.state) || "").toLowerCase(),
    i = ["complete", "completed", "success", "succeeded", "finished", "done"].includes(a);
  return t != null && t.splitTask ? i : i ? !0 : !!(t != null && t.taskComplete && !a && !Sk(n));
}

function h3t(e, t) {
  let n = e.filter(r => ebn(r, t));
  return n.length === 0 && (t != null && t.taskComplete) && (n = e.filter(r => ebn(r, {
    taskComplete: !0
  }))), n;
}

function d_o(e) {
  var A, S, C, I, E, M, T, P, R, j, B, F, N;
  const t = ((A = e.settings) == null ? void 0 : A.mode) || "inspiration",
    n = e.prompt || "",
    r = String(((S = e.settings) == null ? void 0 : S.lyrics) || ""),
    a = String(((C = e.settings) == null ? void 0 : C.instrumentalDescription) || ""),
    i = String(((I = e.settings) == null ? void 0 : I.tags) || ""),
    o = String(((E = e.settings) == null ? void 0 : E.title) || ""),
    s = f7(String(((M = e.settings) == null ? void 0 : M.model) || "")),
    l = String(((T = e.settings) == null ? void 0 : T.continueClipId) || ((P = e.settings) == null ? void 0 : P.clipId) || ""),
    d = typeof ((R = e.settings) == null ? void 0 : R.continueAt) == "number" ? e.settings.continueAt : 0,
    u = !!((j = e.settings) != null && j.isInstrumental),
    h = ((B = e.settings) == null ? void 0 : B.refAudioUsage) || "extend",
    p = String(((F = e.settings) == null ? void 0 : F.continueAudioPublicUrl) || ((N = e.settings) == null ? void 0 : N.coverUploadUrl) || "").trim(),
    m = h === "cover" && t !== "extend" && !!(l || /^https:\/\//i.test(p)),
    f = t === "custom" || t === "extend",
    y = f ? [i, u ? a : ""].map(G => G.trim()).filter(Boolean).join(", ") : "",
    b = f ? u ? "" : r : n,
    v = f ? u ? a || i || o : r : n;
  if (!f && !n.trim()) return {
    ok: !1,
    error: "请输入音乐描述"
  };
  if (f && !u && !r.trim()) return {
    ok: !1,
    error: "请输入歌词"
  };
  if (f && !y.trim()) return {
    ok: !1,
    error: u ? "请输入风格或音乐描述" : "请选择或填写风格"
  };
  if (f && !o.trim()) return {
    ok: !1,
    error: "自定义模式请填写标题"
  };
  const _ = aie(s, f);
  if (b.trim().length > _) return {
    ok: !1,
    error: `文案超出上限（最多 ${_} 字符）`
  };
  const w = XH();
  if (f && y.length > w) return {
    ok: !1,
    error: `风格超出上限（最多 ${w} 字符）`
  };
  const k = JH();
  return f && o.trim().length > k ? {
    ok: !1,
    error: `标题超出上限（最多 ${k} 字符）`
  } : {
    ok: !0,
    plan: {
      continueAt: d,
      continueAudioPublicUrl: p,
      continueClipId: l,
      customMode: f,
      duration: VPt(e.settings),
      effectivePrompt: b,
      historyPromptText: v,
      lyrics: r,
      makeInstrumental: u,
      mode: t,
      model: s,
      refAudioUsage: h,
      shouldCover: m,
      styleForRequest: y,
      tags: i,
      title: o
    }
  };
}

async function k1r(e, t, n) {
  return t.mode === "extend" && n ? {
    success: !0,
    data: {
      task_id: n
    }
  } : t.shouldCover ? e.coverMusic({
    prompt: t.effectivePrompt,
    style: t.customMode ? t.styleForRequest : "",
    tags: t.customMode ? t.styleForRequest : "",
    title: t.customMode ? t.title.trim() : "",
    make_instrumental: t.makeInstrumental,
    instrumental: t.makeInstrumental,
    customMode: t.customMode,
    cover_clip_id: t.continueClipId || void 0,
    uploadUrl: /^https:\/\//i.test(t.continueAudioPublicUrl) ? t.continueAudioPublicUrl : void 0,
    model: t.model,
    duration: tQ(t.model) === "V5_5" && t.customMode ? t.duration : void 0
  }) : t.mode === "extend" ? e.extendMusic({
    prompt: t.makeInstrumental ? "" : t.lyrics || t.effectivePrompt || "",
    title: t.title.trim() || "续写音乐",
    tags: t.styleForRequest || t.tags || "",
    continue_at: t.continueAt,
    continue_clip_id: t.continueClipId,
    make_instrumental: t.makeInstrumental,
    model: t.model,
    defaultParamFlag: !0
  }) : e.generateMusic({
    mode: t.customMode ? "custom" : "inspiration",
    customMode: t.customMode,
    prompt: t.effectivePrompt,
    style: t.customMode ? t.styleForRequest : t.tags || "",
    tags: t.customMode ? t.styleForRequest : t.tags || "",
    title: t.customMode ? t.title.trim() : "",
    make_instrumental: t.makeInstrumental,
    instrumental: t.makeInstrumental,
    model: t.model,
    duration: tQ(t.model) === "V5_5" && t.customMode ? t.duration : void 0
  });
}

const u_o = Object.freeze(Object.defineProperty({
  __proto__: null,
  estimateSunoProgressFromStatus: _1r,
  filterSunoReadySongs: h3t,
  isSunoTaskStatusComplete: w1r,
  isSunoTaskStatusFailed: x1r,
  normalizeSunoTaskStatus: v1r,
  resolveSunoGenerationPlan: d_o,
  submitSunoGeneration: k1r
}, Symbol.toStringTag, {
  value: "Module"
}));

function tbn(e, t) {
  return !!(t || e.some(n => {
    var r, a, i, o, s, l;
    return ((r = n.metadata) == null ? void 0 : r.type) === "stem" || ((a = n.metadata) == null ? void 0 : a.stem_from_id) || ((i = n.title) == null ? void 0 : i.includes("Vocals")) || ((o = n.title) == null ? void 0 : o.includes("Instrumental")) || ((s = n.title) == null ? void 0 : s.includes("人声")) || ((l = n.title) == null ? void 0 : l.includes("伴奏"));
  }));
}

function nbn(e, t) {
  const n = e.find(a => {
      var i, o, s, l;
      return t === "record" && ((i = a.metadata) == null ? void 0 : i.stem_type_group_name) === "Vocals" || ((o = a.title) == null ? void 0 : o.includes("Vocals")) || ((s = a.title) == null ? void 0 : s.includes("人声")) || ((l = a.title) == null ? void 0 : l.toLowerCase().includes("vocal"));
    }),
    r = e.find(a => {
      var i, o, s, l;
      return t === "record" && ((i = a.metadata) == null ? void 0 : i.stem_type_group_name) === "Instrumental" || ((o = a.title) == null ? void 0 : o.includes("Instrumental")) || ((s = a.title) == null ? void 0 : s.includes("伴奏")) || ((l = a.title) == null ? void 0 : l.toLowerCase().includes("instrumental"));
    });
  return {
    kind: "stems",
    vocals: n || e[0],
    instrumental: r || e[1] || e[0],
    source: t
  };
}

async function A1r(e, t) {
  var d;
  if ((d = t.clipIds) != null && d.length) {
    const u = await e.getMusicByClipIds(t.clipIds, t.model);
    if (!u.success || !u.data) return {
      kind: "pending"
    };
    const h = u.data,
      p = Array.isArray(h) ? h : Array.isArray(h.data) ? h.data : [];
    if (!p.length) return {
      kind: "pending"
    };
    if (tbn(p, t.splitTaskId)) {
      const f = nbn(p, "feed"),
        y = b => b.status === "complete" && !!(b.audio_url || b.video_url);
      return y(f.vocals) && y(f.instrumental) ? f : {
        kind: "pending"
      };
    }
    const m = h3t(p);
    return m.length ? {
      kind: "songs",
      songs: m
    } : {
      kind: "pending"
    };
  }
  if (!t.taskId) return {
    kind: "pending"
  };
  const n = !!(t.splitTaskId && t.splitTaskId === t.taskId),
    r = n ? await e.getBackendTaskStatus(t.taskId, t.model) : await e.getMusicTaskStatus(t.taskId, t.model);
  if (!r.success || !r.data) return {
    kind: "pending"
  };
  const {
    progress: a,
    songsData: i,
    status: o,
    taskData: s,
    responseData: l
  } = v1r(r.data, n);
  if (w1r(o) && Array.isArray(i) && i.length) {
    const u = h3t(i, {
      splitTask: n,
      taskComplete: !0
    });
    if (u.length) return {
      ...(tbn(u, t.splitTaskId) ? nbn(u, "record") : {
        kind: "songs",
        songs: u
      }),
      progress: a
    };
  }
  return x1r(o) ? {
    kind: "failed",
    progress: a,
    error: (s == null ? void 0 : s.fail_reason) || (s == null ? void 0 : s.errorMessage) || (l == null ? void 0 : l.message) || (l == null ? void 0 : l.msg) || "生成失败"
  } : {
    kind: "pending",
    progress: a
  };
}

async function h_o(e) {
  var f, y, b;
  const {
      api: t,
      services: n
    } = e,
    r = {
      ...e.plan
    },
    a = (f = e.clipIds) == null ? void 0 : f.slice(),
    i = e.splitTaskId;
  if (!e.canSubmit()) return;
  const o = await k1r(t, r, e.existingRemoteTaskId);
  if (!o.success) throw new Error(o.error || "生成失败");
  if (!o.data) throw new Error("API 响应中没有数据");
  const s = o.data.task_id ? {
    taskId: o.data.task_id
  } : (y = o.data.clip_ids) != null && y.length ? {
    clipIds: o.data.clip_ids.slice()
  } : {};
  if (!s.taskId && !((b = s.clipIds) != null && b.length)) throw new Error(`无法获取任务 ID 或 clip IDs。响应数据: ${JSON.stringify(o.data)}`);
  const l = e.submitted(s),
    d = {
      ...s,
      clipIds: a || s.clipIds,
      model: r.model,
      splitTaskId: i
    };
  let u = !1,
    h = !1;
  const p = v => {
      if (u) return;
      const _ = V8({
        attempt: v,
        baseInterval: lz("suno", Math.max(0, v - 1)),
        isDocumentHidden: n.isHidden(),
        scheduleKey: l.scheduleKey
      });
      n.schedule(l.scheduleKey, _, () => m(v));
    },
    m = async v => {
      if (!(u || h)) {
        h = !0;
        try {
          if (await n.yieldToInteraction(), v >= 120) {
            await n.yieldToInteraction(), u = !0, l.failed("生成超时");
            return;
          }
          const {
            progress: _,
            ...w
          } = await n.request(() => A1r(t, d));
          await n.yieldToInteraction(), _ !== void 0 && l.progress(_), w.kind === "failed" ? (l.failed(w.error), u = !0) : w.kind === "songs" || w.kind === "stems" ? (l.completed(w), u = !0) : p(v + 1);
        } catch (_) {
          console.error("[Music Generation] Poll error:", _), p(v + 1);
        } finally {
          h = !1;
        }
      }
    };
  m(0);
}

const p_o = Object.freeze(Object.defineProperty({
  __proto__: null,
  executeSunoGeneration: h_o,
  pollSunoGeneration: A1r
}, Symbol.toStringTag, {
  value: "Module"
}));

function T$t(e, t, n = !1) {
  const r = {
    ...t
  };
  return bX(e, zs(e), r, {
    preserveRatio: n
  }), kh(e) ? MP(e, r) : Pf(e) ? nI(r) : Hh(e) ? WY(r) : Uu(e) ? KY(r) : su(e) ? ZY(r) : Nm(e) ? tX(r) : jm(e) ? rX(r) : nh(e) ? QY(r) : mp(e) && XY(r), r;
}

function rbn(e, t, n) {
  const r = T$t(e, t, n);
  return r.eraserPlatformGroup = r.platformGroup, delete r.platformGroup, r;
}

function m_o(e, t, n, r) {
  const [a, i] = g.useState(""),
    [o, s] = g.useState("Auto"),
    [l, d] = g.useState("Auto"),
    [u, h] = g.useState("high"),
    [p, m] = g.useState({});
  g.useEffect(() => {
    const b = wZ[a];
    b && (i(phe), m(v => ({
      ...(v || {}),
      huyaMjVersion: b
    })));
  }, [a]), g.useEffect(() => {
    if (!r || a) return;
    const b = n.find(w => w.id === "nano-banana-2") || n[0];
    if (!(b != null && b.id)) return;
    i(b.id);
    const v = rbn(b.id, e.settings || {}, !1);
    t(e.id, {
      settings: v
    }), m(v), s("Auto"), d(GE(b.id, String(v.gptImage2Resolution || v.resolution || "")));
    const _ = v.gptImageQuality;
    typeof _ == "string" && _ && h(_);
  }, [r, n, a, e.id, e.settings, t]), g.useEffect(() => {
    r && s("Auto");
  }, [r]);
  const f = g.useMemo(() => rl(a), [a]),
    y = g.useCallback(b => {
      i(b);
      const v = rbn(b, e.settings || {}, !0);
      t(e.id, {
        settings: v
      }), m(v), s("Auto"), d(GE(b, String(v.gptImage2Resolution || v.resolution || "")));
      const _ = v.gptImageQuality;
      typeof _ == "string" && _ && h(_);
    }, [e.id, e.settings, t]);
  return g.useEffect(() => {
    if (!r || !a) return;
    const b = f;
    if (!b.length) {
      l && d("");
      return;
    }
    b.includes(l) || d(GE(a, l));
  }, [r, a, f, l]), {
    eraserModelId: a,
    setEraserModelId: i,
    eraserRatio: o,
    setEraserRatio: s,
    eraserResolution: l,
    setEraserResolution: d,
    eraserGptImageQuality: u,
    setEraserGptImageQuality: h,
    eraserGenSettings: p,
    setEraserGenSettings: m,
    eraserResolutionOptions: f,
    applyEraserModelSelection: y
  };
}

async function f_o({
  layers: e,
  layerId: t,
  mask: n,
  labels: r,
  erase: a,
  persist: i,
  current: o
}) {
  if (!o()) return null;
  const s = await a(n, r);
  if (!o()) return null;
  const l = await i(s.url);
  return o() ? e.map(d => d.id === t ? {
    ...d,
    content: l,
    resultWidth: s.width || d.resultWidth,
    resultHeight: s.height || d.resultHeight
  } : d) : null;
}

const g_o = {
  merge: CUt,
  invalidate: ype
};

async function y_o(e, t = g_o) {
  const {
    layers: n,
    hasCommittedPreview: r,
    source: a,
    safeSource: i,
    width: o,
    height: s,
    opacity: l,
    resolveSource: d,
    commit: u,
    clearPreview: h
  } = e;
  if (!n.length) {
    r && h();
    return;
  }
  const p = n.find(f => f.name === "合并图层");
  if (p != null && p.content) {
    await u({
      contentRef: p.content,
      layers: n,
      width: p.resultWidth || o,
      height: p.resultHeight || s,
      historyPrompt: "合并图层"
    });
    return;
  }
  const m = n[n.length - 1];
  if (!a || !o || !s) {
    m != null && m.content && (await u({
      contentRef: m.content,
      layers: n,
      width: m.resultWidth || o,
      height: m.resultHeight || s
    }));
    return;
  }
  try {
    const f = await d(i || a),
      y = await t.merge(f, o, s, l, n);
    await u({
      ...y,
      layers: n,
      historyPrompt: n.some(b => b.name === "合并图层") ? "合并图层" : "改图合成"
    }), t.invalidate(y.contentRef);
  } catch {
    m != null && m.content && (await u({
      contentRef: m.content,
      layers: n,
      width: m.resultWidth || o,
      height: m.resultHeight || s,
      historyPrompt: "改图合成"
    }));
  }
}

function b_o({
  nodeId: e,
  nodes: t,
  materialLibraryTree: n,
  getMaterialLibraryPreviewUrl: r
}) {
  const a = g.useMemo(() => uCe(n ?? null), [n]),
    i = g.useMemo(() => dCe(n ?? null, {
      kinds: ["image"]
    }), [n]),
    [o, s] = g.useState({});
  g.useEffect(() => {
    if (!r || i.length === 0) {
      s({});
      return;
    }
    let h = !1;
    return (async () => {
      const p = {};
      await Promise.all(i.slice(0, 160).map(async m => {
        try {
          const f = await r(m.materialAsset);
          f && (p[m.id] = f);
        } catch {}
      })), h || s(p);
    })(), () => {
      h = !0;
    };
  }, [r, i]);
  const l = g.useMemo(() => i.map(h => ({
      id: h.id,
      name: h.name,
      category: h.category,
      thumbnailUrl: o[h.id] || "",
      materialAsset: h.materialAsset,
      canvasMediaKind: h.canvasMediaKind
    })), [i, o]),
    d = g.useMemo(() => {
      const h = [];
      for (const p of t ?? []) if (p.id !== e) {
        if (p.type === "input-image") {
          const m = Vv(p);
          if (!m) continue;
          h.push({
            id: `canvas-${p.id}`,
            name: p.nodeName || "画布图片",
            category: "从画布上选择",
            thumbnailUrl: m,
            fromCanvas: !0,
            sourceCanvasNodeId: p.id,
            canvasSourceNodeType: "input-image",
            canvasMediaKind: "image"
          });
          continue;
        }
        if (p.type === "gen-image" || p.type === "gen-video") {
          const m = Xl(p);
          if (!(m != null && m.url) || p.type === "gen-video" || Sh(m.url)) continue;
          h.push({
            id: `canvas-${p.id}`,
            name: p.nodeName || "画布 AI 绘画",
            category: "从画布上选择",
            thumbnailUrl: m.url,
            fromCanvas: !0,
            sourceCanvasNodeId: p.id,
            canvasSourceNodeType: p.type === "gen-image" ? "gen-image" : "gen-video",
            canvasMediaKind: "image"
          });
        }
      }
      return h;
    }, [t, e]),
    u = g.useMemo(() => [...d, ...l], [d, l]);
  return {
    editImageAssetAtMentionCategories: a,
    editImageMergedAtMentionItems: u
  };
}

function v_o({
  nodeId: e,
  editImageModelId: t,
  editImageRatio: n,
  editImageResolution: r,
  editImageConfigList: a,
  activeDropdown: i,
  globalBaseUrl: o,
  editImageGlobalOssEnabled: s,
  editImageOssConfigured: l
}) {
  const d = g.useMemo(() => {
      const S = ah(t);
      return S != null && S.length ? S : [..._oe];
    }, [t]),
    u = g.useMemo(() => rl(t), [t]),
    h = `${e}-edit`,
    p = Pf(t),
    m = p,
    f = oJ((i == null ? void 0 : i.nodeId) === h && (i == null ? void 0 : i.type) === "edit-image-model", t),
    y = (i == null ? void 0 : i.nodeId) === h && (i == null ? void 0 : i.type) === "edit-image-model",
    b = (i == null ? void 0 : i.nodeId) === h && (i == null ? void 0 : i.type) === "edit-gpt2_fmt",
    v = g.useMemo(() => a.find(S => S.id === t), [a, t]),
    _ = g.useMemo(() => a.map(S => S.id), [a]),
    w = g.useMemo(() => FZ(a.map(S => Yh(S.provider ?? S.modelName ?? S.id))), [a]),
    k = !!v && od(v, o),
    A = g.useMemo(() => {
      if (!m) return 0;
      const S = [n, r].map(C => String(C || "").trim()).filter(Boolean);
      return Zkt({
        paramLabels: S,
        ossCheckboxPx: !s && l ? 18 : 0
      });
    }, [m, n, r, s, l]);
  return {
    editImageRatioOptions: d,
    editImageResolutionOptions: u,
    editImageActiveNodeId: h,
    isEditImageGpt2SizeToolbar: p,
    isEditImageToolbarCompact: m,
    editImageModelMenuRef: f,
    isEditImageModelDropdownOpen: y,
    isEditImageGpt2FmtDropdownOpen: b,
    editImageModelConfig: v,
    editImageModelDropdownKeys: _,
    editImageModelDropdownMenuWidth: w,
    showEditImageThirdPartyPlatformUi: k,
    editImageGpt2CustomToolbarReservedPx: A
  };
}

const S1r = {
  read: Ns,
  uploadEnabled: ua,
  upload: _P,
  thumbnail: LT,
  async persist(e, t, n) {
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
    if (await r.ensureRestored(), !n()) return;
    r.isAvailable() && (await r.saveAsset(e, t, t.type || "image/png"));
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
    n() && (await a.saveBlobAsset(e, t, ""));
  }
};

function w_o({
  node: e,
  setHistory: t,
  generateIdProp: n,
  mediaCommands: r
}, a = S1r, i = {
  current: null
}) {
  const o = r.session.checkpoint(),
    s = async (d, u, h) => {
      if (!t || !n || !h()) return;
      const p = n(),
        m = d.isOssBacked && d.thumbnailUrl || d.displayRef,
        f = Date.now(),
        y = d.assetId || Hwe(e.id),
        b = {
          id: p,
          type: "image",
          url: m,
          originalUrl: d.remoteUrl || d.displayRef,
          prompt: u.prompt,
          time: new Date().toLocaleTimeString(),
          timestamp: f,
          status: "completed",
          progress: 100,
          modelName: d.isOssBacked ? `${u.prompt} · 云端备份` : u.prompt,
          sourceNodeId: e.id,
          width: u.width,
          height: u.height,
          ...(d.isOssBacked ? {
            ossUploaded: !0,
            _globalOssUrlOnly: !0,
            _ossRemoteUrl: d.remoteUrl || d.displayRef,
            _ossThumbnailUrl: d.thumbnailUrl || d.displayRef,
            thumbnailUrl: d.thumbnailUrl || d.displayRef
          } : {
            _assetId: y
          })
        },
        v = _ => t(w => h() ? typeof _ == "function" ? _(w) : _ : w);
      if (v(_ => {
        const w = _[0],
          k = (w == null ? void 0 : w.sourceNodeId) === e.id && (w.originalUrl === b.originalUrl || w.url === b.url),
          A = (w == null ? void 0 : w.prompt) === b.prompt;
        return k && A ? _ : [b, ..._];
      }), !d.isOssBacked && u.blob) {
        const _ = new FileReader();
        _.onload = () => {
          typeof _.result == "string" && a.thumbnail(p, _.result, v);
        }, _.readAsDataURL(u.blob);
      } else d.isOssBacked && m.startsWith("http") && a.thumbnail(p, m, v);
    };
  return {
    commitEditImageCompositePreview: async d => {
      var C, I;
      if (!o.valid()) return;
      const u = {};
      i.current = u;
      const h = {
        valid: () => o.valid() && i.current === u
      };
      if (!h.valid()) return;
      const {
        contentRef: p,
        layers: m,
        width: f,
        height: y,
        historyPrompt: b = "改图合成"
      } = d;
      let v = d.blob;
      if (v || (v = await a.read(p, {
        compressForApi: !1
      })), !h.valid()) return;
      const _ = `${Hwe(e.id)}_${Fi()}`,
        w = `${e.nodeName || "改图合成"}-${Date.now()}.png`,
        k = f && y ? `${f}×${y}` : (C = e.settings) == null ? void 0 : C.imageSize;
      if (a.uploadEnabled()) {
        const E = new File([v], w, {
            type: v.type || "image/png"
          }),
          M = await a.upload(E);
        if (!h.valid()) return;
        const T = Hv(M, {
            hasCustomSize: (I = e.settings) == null ? void 0 : I.hasCustomSize
          }),
          P = T.settings,
          R = String(T.content || P[_i] || p);
        if (!(await r.commitGuarded(e, h, {
          settings: {
            editImageLayers: m,
            editImageCommittedPreview: R,
            editImageCommittedOssRemote: P[_i] || R,
            ...P,
            imageSize: k,
            mediaType: "image",
            editImageToolActive: void 0,
            suppressHoverUi: void 0
          }
        }, {
          mediaChange: !1
        })).node || !h.valid()) return;
        const B = {
          displayRef: R,
          remoteUrl: String(P[_i] || R),
          thumbnailUrl: typeof P[Pi] == "string" ? String(P[Pi]) : void 0,
          isOssBacked: !0
        };
        return await s(B, {
          prompt: b,
          width: f,
          height: y,
          blob: v
        }, h.valid), B;
      }
      if (!(await r.commitGuarded(e, h, {
        settings: {
          editImageLayers: m,
          editImageCommittedPreview: p,
          editImageCommittedLocalAssetId: _,
          editImageCommittedOssRemote: void 0,
          imageSize: k,
          mediaType: "image",
          editImageToolActive: void 0,
          suppressHoverUi: void 0
        }
      }, {
        mediaChange: !1
      })).node || !h.valid()) return;
      try {
        await a.persist(_, v, h.valid);
      } catch {}
      if (!h.valid()) return;
      const S = {
        displayRef: p,
        isOssBacked: !1,
        assetId: _
      };
      return await s(S, {
        prompt: b,
        width: f,
        height: y,
        blob: v
      }, h.valid), S;
    }
  };
}

function x_o(e, t = S1r) {
  const n = g.useRef(null);
  let r;
  return g.useLayoutEffect(() => {
    r = w_o(e, t, n);
  }), {
    commitEditImageCompositePreview: (...a) => (r == null ? void 0 : r.commitEditImageCompositePreview(...a)) ?? Promise.resolve(void 0)
  };
}

function __o(e, t, n) {
  var i;
  const r = (((i = e.settings) == null ? void 0 : i.editImageReferenceImages) || []).filter(Boolean),
    a = Math.max(0, w5 - n - r.length);
  return {
    settings: {
      editImageReferenceImages: [...r, ...t.filter(Boolean).slice(0, a)]
    }
  };
}

function k_o({
  node: e,
  nodes: t,
  connections: n,
  getConnectedInputImages: r
}) {
  var l, d;
  const a = g.useMemo(() => {
      var u;
      return (((u = e.settings) == null ? void 0 : u.editImageReferenceImages) || []).filter(Boolean);
    }, [(l = e.settings) == null ? void 0 : l.editImageReferenceImages]),
    i = g.useMemo(() => ((r == null ? void 0 : r(e.id)) || []).filter(Boolean), [r, e.id, n, t]),
    o = g.useMemo(() => {
      var u;
      return Nue({
        fromConnections: i,
        fromSettings: a,
        order: (u = e.settings) == null ? void 0 : u.editImageInputImageOrder
      }).slice(0, w5);
    }, [i, a, (d = e.settings) == null ? void 0 : d.editImageInputImageOrder]),
    s = g.useMemo(() => o.map((u, h) => ({
      position1Based: h + 1,
      mediaType: "image",
      nodeName: `参考图${h + 1}`,
      thumbSrc: u
    })), [o]);
  return {
    editImageUploadedRefs: a,
    editImageConnectedRefs: i,
    editImageAllRefs: o,
    editImagePromptReferenceItems: s
  };
}

const I1r = {
  uploadEnabled: ua,
  store: e => Er.storeImageUrlAsRef(e),
  async paste(e) {
    const t = await fetch(e),
      n = await t.blob();
    return n.type.startsWith("image/") ? new Promise((r, a) => {
      const i = new FileReader();
      i.onload = () => r(String(i.result || "")), i.onerror = () => a(i.error), i.readAsDataURL(n);
    }) : null;
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
  }
};

