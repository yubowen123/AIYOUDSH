const Wbi = ({
    documentSession: e,
    nodesMap: t,
    apiConfigs: n,
    globalApiKey: r,
    getConnectedVideoAnalyzeNode: a,
    updateNodeSettings: i,
    setNodes: o,
    setHistory: s
  }) => {
    const l = g.useRef(t),
      d = g.useRef(new Set());
    g.useLayoutEffect(() => {
      l.current = t;
      for (const I of d.current) t.has(I.id) || (I.alive = !1);
    }, [t]), g.useEffect(() => () => {
      for (const I of d.current) I.alive = !1;
      d.current.clear();
    }, []);
    const u = g.useRef(new Map()),
      h = g.useRef(new Map());
    g.useEffect(() => {
      const I = async (M, T) => {
          const P = M.split("_")[0],
            R = await ni.getAssetUrl(M);
          R && s(j => j.map(B => {
            if (B.id !== P) return B;
            const F = {
                ...B
              },
              N = F._mjAssetIds || [];
            if (M === P && B.url && B.url.startsWith("http") && (F.url = R, F._assetId = M, console.log(`[useStoryboard] ? ???????? URL: ${P}`)), M === `${P}_audio` && B.audioUrl && B.audioUrl.startsWith("http") && (F.audioUrl = R, F._audioAssetId = M, console.log(`[useStoryboard] ? ????????? URL: ${P}`)), M.startsWith(`${P}_mj_`) && B.mjImages) {
              const G = parseInt(M.split("_mj_")[1]);
              !isNaN(G) && B.mjImages[G] && B.mjImages[G].startsWith("http") && (F.mjImages = [...B.mjImages], F.mjImages[G] = R, N.includes(M) || N.push(M), F._mjAssetIds = N, console.log(`[useStoryboard] ? ????????? ${G}: ${P}`));
            }
            return M === `${P}_mj_original` && B.mjOriginalUrl && B.mjOriginalUrl.startsWith("http") && (F.mjOriginalUrl = R, F._mjOriginalAssetId = M, console.log(`[useStoryboard] ? ???????????: ${P}`)), M === `${P}_thumbnail` && B.thumbnailUrl && B.thumbnailUrl.startsWith("http") && (F.thumbnailUrl = R, F._thumbnailAssetId = M, console.log(`[useStoryboard] ? ??????????: ${P}`)), F;
          }));
        },
        E = ni.addListener(I);
      return () => E();
    }, [s]);
    const p = g.useCallback(I => {
        var R;
        const E = t.get(I);
        if (!E || E.type !== "storyboard-node") return;
        const M = a(I);
        if (!M) {
          alert("????????????");
          return;
        }
        const T = ((R = M.settings) == null ? void 0 : R.analysisResults) || M.analysisResults || [];
        if (T.length === 0) {
          alert("???????????????????");
          return;
        }
        const P = T.map((j, B) => {
          var U, H, Y;
          const F = j.keyframes,
            N = (F == null ? void 0 : F.find(K => K.type === "current")) || (F == null ? void 0 : F[0]),
            G = (N == null ? void 0 : N.mj_prompt) || "",
            z = (N == null ? void 0 : N.jimeng_prompt) || "",
            V = (N == null ? void 0 : N.description) || "",
            O = j.global_tags,
            L = [];
          (U = O == null ? void 0 : O.style) != null && U[0] && L.push(O.style[0]), (H = O == null ? void 0 : O.camera) != null && H[0] && L.push(O.camera[0]);
          const D = ((Y = O == null ? void 0 : O.camera) == null ? void 0 : Y[0]) || "";
          return {
            id: `shot-${Date.now()}-${B}`,
            scene_index: B + 1,
            time_range: j.time_range || "",
            image_url: "",
            description: V,
            prompt: G || z,
            camera: D,
            tags: L,
            status: "draft"
          };
        });
        i(I, {
          shots: P
        });
      }, [t, a, i]),
      m = g.useCallback((I, E, M) => {
        o(T => T.map(P => {
          var R;
          if (P.id === I && ((R = P.settings) != null && R.shots)) {
            const j = P.settings.shots.map(B => B.id === E ? {
              ...B,
              ...M
            } : B);
            return {
              ...P,
              settings: {
                ...P.settings,
                shots: j
              }
            };
          }
          return P;
        }));
      }, [o]),
      f = g.useCallback((I, E) => {
        const M = u.current.get(I);
        M && m(M.nodeId, M.shotId, {
          generatingProgress: Math.min(100, Math.max(0, E))
        });
      }, [m]),
      y = g.useCallback(async (I, E) => {
        const M = await Igi(E, I);
        s(P => P.map(R => {
          if (R.id !== I) return R;
          const j = R.startTime ? Date.now() - R.startTime : void 0;
          return {
            ...R,
            ...M.historyUpdate,
            durationMs: j
          };
        }));
        const T = u.current.get(I);
        T && (m(T.nodeId, T.shotId, {
          status: "done",
          generatingProgress: 0,
          ...M.shotMediaPatch
        }), u.current.delete(I), h.current.delete(I));
      }, [s, m]),
      b = g.useCallback((I, E) => {
        o(M => M.map(T => {
          var P, R;
          if (T.id === I) {
            const j = ((P = T.settings) == null ? void 0 : P.shots) || [],
              B = E !== void 0 && E >= 0 ? E : j.length > 0 ? j.length - 1 : -1,
              F = B >= 0 ? j[B] : void 0,
              N = zbi(F),
              G = {
                id: `shot-${Date.now()}`,
                scene_index: E !== void 0 ? (((R = j[E]) == null ? void 0 : R.scene_index) || E + 1) + 1 : j.length + 1,
                time_range: "",
                image_url: "",
                description: "",
                prompt: "",
                status: "draft",
                ...N
              };
            if (E !== void 0 && E >= 0 && E < j.length) {
              const z = [...j];
              z.splice(E + 1, 0, G);
              for (let V = E + 2; V < z.length; V++) z[V] = {
                ...z[V],
                scene_index: z[V].scene_index + 1
              };
              return {
                ...T,
                settings: {
                  ...T.settings,
                  shots: z
                }
              };
            } else return {
              ...T,
              settings: {
                ...T.settings,
                shots: [...j, G]
              }
            };
          }
          return T;
        }));
      }, [o]),
      v = g.useCallback((I, E) => {
        o(M => M.map(T => {
          var P;
          if (T.id === I && ((P = T.settings) != null && P.shots)) {
            const R = T.settings.shots.filter(j => j.id !== E);
            return {
              ...T,
              settings: {
                ...T.settings,
                shots: R
              }
            };
          }
          return T;
        }));
      }, [o]),
      _ = g.useCallback((I, E, M, T, P) => {
        const R = Math.ceil(266.6666666666667),
          j = async (B = 0) => {
            var F, N, G, z, V, O, L, D, U, H, Y, K, W, Q;
            if (B > R) {
              s(ne => ne.map(de => de.id === I ? {
                ...de,
                status: "failed",
                progress: 0,
                errorMsg: "?????1600??"
              } : de));
              const q = u.current.get(I);
              q && (m(q.nodeId, q.shotId, {
                status: "draft",
                generatingProgress: 0
              }), u.current.delete(I), h.current.delete(I));
              return;
            }
            try {
              let q;
              if (zv(P)) q = `${M}/kling/v1/videos/omni-video/${encodeURIComponent(E)}`;else if (fk(P)) {
                const ce = b3(s9(M, P));
                q = gk(ce, String(E));
              } else Dk(P) || Fv(P) || X2(P) ? q = `${M}/v1/videos/${encodeURIComponent(E)}` : Ex(P) || PE(P) || Y1(P) ? q = `${M}/v2/videos/generations/${encodeURIComponent(E)}` : ag(P) ? q = `${String(M || "").replace(/\/+$/, "")}/xai/v1/videos/${encodeURIComponent(E)}` : Tb(P) ? q = `${M}${xce(P)}/${encodeURIComponent(E)}` : q = `${M}/v1/videos/${encodeURIComponent(E)}`;
              const ne = {
                Authorization: `Bearer ${T}`
              };
              ag(P) && (ne.debug_accept_unset_ratio_model = "true");
              const de = await fetch(q, {
                method: "GET",
                headers: ne
              });
              if (!de.ok) {
                setTimeout(() => j(B + 1), 6e3);
                return;
              }
              const le = await de.json();
              if (fk(P)) {
                const {
                    extractHuyaArtPollReadyMediaUrls: ce,
                    isHuyaArtPollFailed: we,
                    parseHuyaArtPollErrorMessage: X
                  } = await Ie(async () => {
                    const {
                      extractHuyaArtPollReadyMediaUrls: ye,
                      isHuyaArtPollFailed: ie,
                      parseHuyaArtPollErrorMessage: ae
                    } = await Promise.resolve().then(() => The);
                    return {
                      extractHuyaArtPollReadyMediaUrls: ye,
                      isHuyaArtPollFailed: ie,
                      parseHuyaArtPollErrorMessage: ae
                    };
                  }, void 0, import.meta.url),
                  Z = ce(le, !0);
                if (we(le, Z.status)) {
                  const ye = X(le, "任务失败");
                  s(ae => ae.map(be => be.id === I ? {
                    ...be,
                    status: "failed",
                    progress: 0,
                    errorMsg: ye
                  } : be));
                  const ie = u.current.get(I);
                  ie && (m(ie.nodeId, ie.shotId, {
                    status: "draft",
                    generatingProgress: 0
                  }), u.current.delete(I), h.current.delete(I));
                  return;
                }
                if (Z.status === "success" && Z.urls.length > 0) {
                  await y(I, Z.urls[0]);
                  return;
                }
                const re = Math.min(10 + B * 2, 90),
                  fe = h.current.get(I) || 0;
                (Math.abs(re - fe) >= 10 || re === 0) && (h.current.set(I, re), s(ye => ye.map(ie => ie.id === I ? {
                  ...ie,
                  progress: re
                } : ie)), f(I, re)), setTimeout(() => j(B + 1), ES);
                return;
              }
              if (Tb(P)) {
                const ce = ZBt(le);
                if (ce.terminal === "success" && ce.videoUrl) {
                  await y(I, ce.videoUrl);
                  return;
                }
                if (ce.terminal === "failed") {
                  const Z = String(ce.errorMsg || "????");
                  s(fe => fe.map(ye => ye.id === I ? {
                    ...ye,
                    status: "failed",
                    progress: 0,
                    errorMsg: Z
                  } : ye));
                  const re = u.current.get(I);
                  re && (m(re.nodeId, re.shotId, {
                    status: "draft",
                    generatingProgress: 0
                  }), u.current.delete(I), h.current.delete(I));
                  return;
                }
                const we = Math.min(10 + B * 2, 90),
                  X = h.current.get(I) || 0;
                (Math.abs(we - X) >= 10 || we === 0) && (h.current.set(I, we), s(Z => Z.map(re => re.id === I ? {
                  ...re,
                  progress: we
                } : re)), f(I, we)), setTimeout(() => j(B + 1), 6e3);
                return;
              }
              const J = ((F = le.data) == null ? void 0 : F.status) || le.status || ((N = le.data) == null ? void 0 : N.task_status) || le.task_status || "",
                pe = ((G = le.data) == null ? void 0 : G.progress) || le.progress || Math.min(10 + B * 2, 90);
              if (J === "SUCCESS" || J === "succeeded" || J === "FINISHED" || J === "completed" || J === "done" || J === "DONE") {
                const we = (le.video && typeof le.video == "object" && !Array.isArray(le.video) ? le.video.url : void 0) || ((z = le.content) == null ? void 0 : z.video_url) || ((V = le.data) == null ? void 0 : V.output) || le.output || ((O = le.data) == null ? void 0 : O.video_url) || ((L = le.data) == null ? void 0 : L.url) || le.video_url || le.url || ((H = (U = (D = le.data) == null ? void 0 : D.video) == null ? void 0 : U[0]) == null ? void 0 : H.url) || ((K = (Y = le.video) == null ? void 0 : Y[0]) == null ? void 0 : K.url);
                if (we) await y(I, we);else {
                  s(Z => Z.map(re => re.id === I ? {
                    ...re,
                    status: "failed",
                    progress: 0,
                    errorMsg: "?????URL"
                  } : re));
                  const X = u.current.get(I);
                  X && (m(X.nodeId, X.shotId, {
                    status: "draft",
                    generatingProgress: 0
                  }), u.current.delete(I), h.current.delete(I));
                }
              } else if (J === "FAILED" || J === "ERROR" || J === "FAILURE" || J === "CANCELLED" || J === "expired" || J === "EXPIRED" || J === "failed") {
                const ce = le.failReason || le.fail_reason || ((W = le.data) == null ? void 0 : W.failReason) || ((Q = le.data) == null ? void 0 : Q.fail_reason) || le.message || le.error || "",
                  we = typeof ce == "string" ? ce || `????: ${J}` : typeof ce == "object" && ce !== null && "message" in ce ? String(ce.message) : `????: ${J}`;
                s(Z => Z.map(re => re.id === I ? {
                  ...re,
                  status: "failed",
                  progress: 0,
                  errorMsg: we
                } : re));
                const X = u.current.get(I);
                X && (m(X.nodeId, X.shotId, {
                  status: "draft",
                  generatingProgress: 0
                }), u.current.delete(I), h.current.delete(I));
              } else {
                const ce = h.current.get(I) || 0;
                (Math.abs(pe - ce) >= 10 || pe === 0 || pe === 100) && (h.current.set(I, pe), s(X => X.map(Z => Z.id === I ? {
                  ...Z,
                  progress: pe
                } : Z)), f(I, pe)), setTimeout(() => j(B + 1), 6e3);
              }
            } catch {
              setTimeout(() => j(B + 1), 6e3);
            }
          };
        j();
      }, [m, s, f, y]),
      w = g.useCallback(async (I, E) => {
        var Q, q, ne, de, le;
        let M = E.prompt || "";
        if (!M && E.description && (M = E.description), E.tags && Array.isArray(E.tags) && E.tags.length > 0) {
          const J = E.tags.join(", ");
          M += `, ${J}`;
        }
        if (E.camera && (M += `, ${E.camera} camera movement`), !M) {
          alert("?????????????");
          return;
        }
        const T = E.model || ((Q = n.find(J => J.type === "Video" && J.id === "sora-2")) == null ? void 0 : Q.id) || ((q = n.find(J => J.type === "Video")) == null ? void 0 : q.id) || "sora-2",
          P = n.find(J => J.id === T);
        if (!P || P.type !== "Video") {
          alert("??????????");
          return;
        }
        const R = P.key || r;
        if (!R) {
          alert("???? API Key");
          return;
        }
        const j = (P.url || "https://ai.comfly.chat").replace(/\/+$/, ""),
          B = [],
          F = E.enableFrames,
          N = E.startFrame,
          G = E.endFrame,
          z = $z(T);
        if (F && (N || G)) N && B.push(N), G && B.push(G);else {
          const J = GCe(E).slice(0, z);
          B.push(...J);
        }
        if (B.length > 0 && M && !PE(T) && !ag(T) && !V1(T) && !Nv(T) && !kp(T) && !Ap(T) && (M = Egi(M, B.length, T)), B.length > 0) {
          const {
              isGlobalOssUploadEnabled: J,
              resolveShotMediaUrlForApi: pe
            } = await Ie(async () => {
              const {
                isGlobalOssUploadEnabled: X,
                resolveShotMediaUrlForApi: Z
              } = await Promise.resolve().then(() => ii);
              return {
                isGlobalOssUploadEnabled: X,
                resolveShotMediaUrlForApi: Z
              };
            }, void 0, import.meta.url),
            {
              resolveContentRefsForGeneration: ce
            } = await Ie(async () => {
              const {
                resolveContentRefsForGeneration: X
              } = await Promise.resolve().then(() => Mc);
              return {
                resolveContentRefsForGeneration: X
              };
            }, void 0, import.meta.url);
          let we = B.map(X => pe(X));
          try {
            we = await ce(we);
          } catch (X) {
            console.warn("[分镜视表] 参考图 content_ref 解析失败:", X);
          }
          if (J()) {
            const {
              resolveGenReferenceUrlsForApi: X
            } = await Ie(async () => {
              const {
                resolveGenReferenceUrlsForApi: Z
              } = await Promise.resolve().then(() => Mc);
              return {
                resolveGenReferenceUrlsForApi: Z
              };
            }, void 0, import.meta.url);
            try {
              we = await X(we, {
                useOss: !0
              });
            } catch (Z) {
              console.warn("[分镜视表] 参考图 OSS 解析失败:", Z);
            }
          }
          B.length = 0, B.push(...we.filter(X => typeof X == "string" && X.trim().length > 0));
        }
        let V = null;
        const O = () => {
          V && (clearInterval(V), V = null);
        };
        m(I, E.id, {
          status: "generating",
          generatingProgress: 10
        });
        let L = 10;
        V = setInterval(() => {
          L += 10, L < 90 && m(I, E.id, {
            generatingProgress: L
          });
        }, 500);
        const D = Date.now().toString(),
          U = E.ratio || "16:9",
          H = E.resolution || "1080P",
          Y = E.duration || Gj(T),
          K = `storyboard-${I}-shot-${E.id}`;
        u.current.set(D, {
          nodeId: I,
          shotId: E.id
        }), console.log("[???] ?????:", {
          taskId: D,
          nodeId: I,
          shotId: E.id,
          model: T
        });
        const W = {
          id: D,
          type: "video",
          url: "",
          prompt: M,
          time: new Date().toLocaleTimeString(),
          status: "generating",
          progress: 0,
          modelName: P.provider || T,
          ratio: U,
          sourceNodeId: K,
          apiConfig: {
            modelId: T,
            baseUrl: j,
            apiKey: R
          }
        };
        s(J => [W, ...J]);
        try {
          const J = parseInt(Y.replace("s", ""), 10) || 8;
          let pe = "",
            ce = {},
            we = !1;
          const X = ae => new Promise((be, Ee) => {
              const xe = new FileReader();
              xe.onloadend = () => be(xe.result), xe.onerror = Ee, xe.readAsDataURL(ae);
            }),
            Z = async (ae, be) => {
              if (ae.startsWith("content_ref:")) {
                const Ee = await Ns(ae);
                return be ? await X(Ee) : Ee;
              }
              if (ae.startsWith("data:")) {
                const {
                  ensureJpegDataUrl: Ee
                } = await Ie(async () => {
                  const {
                    ensureJpegDataUrl: xe
                  } = await Promise.resolve().then(() => pg);
                  return {
                    ensureJpegDataUrl: xe
                  };
                }, void 0, import.meta.url);
                return await Ee(ae);
              }
              if (ae.startsWith("blob:") || ae.startsWith("http")) try {
                const Ee = await Ns(ae),
                  xe = await X(Ee),
                  {
                    ensureJpegDataUrl: he
                  } = await Ie(async () => {
                    const {
                      ensureJpegDataUrl: ue
                    } = await Promise.resolve().then(() => pg);
                    return {
                      ensureJpegDataUrl: ue
                    };
                  }, void 0, import.meta.url);
                return await he(xe);
              } catch (Ee) {
                return console.error("[prepareImageForAPI] ????:", Ee), ae;
              }
              return ae;
            };
          if (ag(T)) {
            const {
                GROK_15_VIDEO_API_MODEL: ae,
                clampGrok15VideoDuration: be,
                convertGrokPromptToOfficialImageTags: Ee,
                grok15VideoSubmitPath: xe,
                resolveGrok15VideoAspectRatio: he,
                resolveGrok15VideoMode: ue,
                resolveGrok15VideoResolution: ge
              } = await Ie(async () => {
                const {
                  GROK_15_VIDEO_API_MODEL: Ae,
                  clampGrok15VideoDuration: Fe,
                  convertGrokPromptToOfficialImageTags: Me,
                  grok15VideoSubmitPath: Re,
                  resolveGrok15VideoAspectRatio: $e,
                  resolveGrok15VideoMode: rt,
                  resolveGrok15VideoResolution: nt
                } = await Promise.resolve().then(() => $qt);
                return {
                  GROK_15_VIDEO_API_MODEL: Ae,
                  clampGrok15VideoDuration: Fe,
                  convertGrokPromptToOfficialImageTags: Me,
                  grok15VideoSubmitPath: Re,
                  resolveGrok15VideoAspectRatio: $e,
                  resolveGrok15VideoMode: rt,
                  resolveGrok15VideoResolution: nt
                };
              }, void 0, import.meta.url),
              _e = ue(B.length);
            pe = xe(j, _e);
            const ke = be(parseInt(String(J), 10)),
              ve = he(U),
              Te = ge(H, _e),
              Ne = Ee((M || "").trim()),
              me = {
                model: P.modelName || ae,
                prompt: Ne || "Animate",
                duration: ke,
                aspect_ratio: ve,
                resolution: Te
              };
            if (_e === "i2v" && B.length >= 1) {
              const Ae = await Z(B[0], !0),
                Fe = typeof Ae == "string" ? Ae : await X(Ae);
              me.image = {
                url: Fe
              };
            } else if (_e === "r2v") {
              const Ae = Math.min(B.length, 7),
                Fe = await Promise.all(B.slice(0, Ae).map(async Me => {
                  const Re = await Z(Me, !0);
                  return typeof Re == "string" ? Re : await X(Re);
                }));
              me.reference_images = Fe.map(Me => ({
                url: Me
              })), Ne || (me.prompt = Array.from({
                length: Ae
              }, (Me, Re) => `<IMAGE_${Re + 1}>`).join(" ") + " ");
            }
            ce = me;
          } else if (PE(T)) {
            pe = `${j}/v2/videos/generations`;
            const ae = parseInt(String(J), 10),
              be = U !== "Auto" ? U : "3:2",
              Ee = H !== "Auto" ? H : "1080P",
              xe = Math.min(B.length, 7),
              {
                convertGrokPromptToImgTags: he
              } = await Ie(async () => {
                const {
                  convertGrokPromptToImgTags: ge
                } = await Promise.resolve().then(() => $qt);
                return {
                  convertGrokPromptToImgTags: ge
                };
              }, void 0, import.meta.url);
            let ue = (M || "").trim();
            if (xe > 0 && !ue ? ue = Array.from({
              length: xe
            }, (ge, _e) => `@img${_e + 1}`).join(" ") + " " : xe > 0 && (ue = he(M || "")), ce = {
              model: P.modelName || "grok-video-3",
              prompt: ue || "????",
              ratio: be,
              resolution: Ee
            }, Number.isFinite(ae) && ae > 0 && (ce.duration = ae), xe > 0) {
              const ge = await Promise.all(B.slice(0, 7).map(async _e => {
                const ke = await Z(_e, !0);
                return typeof ke == "string" ? ke : await X(ke);
              }));
              ce.images = ge, console.log("[???] Grok??????", ge.length, "?????prompt:", ue);
            }
          } else if (Tb(T) && !HM(T)) {
            pe = `${j}${xce(T)}`;
            const ae = U && U !== "Auto" ? U : "adaptive",
              be = [{
                type: "text",
                text: M
              }];
            if (B.length >= 2) {
              const Te = await Z(B[0], !0),
                Ne = await Z(B[1], !0);
              be.push({
                type: "image_url",
                image_url: {
                  url: typeof Te == "string" ? Te : await X(Te)
                },
                role: "first_frame"
              }), be.push({
                type: "image_url",
                image_url: {
                  url: typeof Ne == "string" ? Ne : await X(Ne)
                },
                role: "last_frame"
              });
            } else if (B.length === 1) {
              const Te = await Z(B[0], !0);
              be.push({
                type: "image_url",
                image_url: {
                  url: typeof Te == "string" ? Te : await X(Te)
                }
              });
            }
            const Ee = tG(H || rl(T)[0] || "480p", T),
              xe = qg(T) ? sPt(Ee, T) : Zxe(Ee, T),
              he = OR(T, `${J}s`),
              ue = R0(T) && (he === "自适应" || he === "-1"),
              ge = ue ? -1 : parseInt(he.replace(/s$/i, ""), 10) || 5,
              ke = T.replace(/-api$/, "") === "seedance-1.5-pro" ? 4 : 2,
              ve = R0(T) ? 30 : qg(T) ? 15 : 12;
            if (ce = {
              model: qg(T) ? Hqe(P.modelName, P.id) : P.modelName || "doubao-seedance-1-5-pro-251215",
              content: be,
              ratio: ae,
              duration: ue ? -1 : Math.min(ve, Math.max(ke, ge)),
              ...xe,
              watermark: !1,
              generate_audio: E.seedanceGenerateAudio !== !1
            }, R0(T)) {
              const Te = String(E.seedanceOutputFormat || "mp4").trim().toLowerCase();
              ce.output_format = Te === "mov" ? "mov" : "mp4", ce.generate_audio = E.seedanceGenerateAudio !== !1;
            }
          } else if (Ex(T)) {
            pe = `${j}/v2/videos/generations`;
            const ae = t2e(U);
            let be = H && H !== "Auto" ? H : "720P";
            const Ee = be === "1080P";
            Ee && console.log("[???] 1080P ?????? enable_upsample");
            let xe = P.modelName || "veo3.1-components";
            const he = F && B.length >= 1 && B.length <= 2,
              ue = e2e(T),
              ge = _ce(T),
              _e = kce(T),
              ke = H === "4K" || be === "4K",
              ve = H === "1080P" || be === "1080P";
            if (ge ? (xe = "veo3.1-fast", he ? console.log(`[???] Fast??????${B.length}???+ ${H || "??"}??? MODEL ID: ${xe}`) : B.length > 0 ? console.log(`[???] Fast???????${B.length}?????? MODEL ID: ${xe}`) : console.log(`[???] Fast????????? MODEL ID: ${xe}`)) : _e ? (xe = "veo3.1-lite", he ? console.log(`[???] Lite??????${B.length}???+ ${H || "??"}??? MODEL ID: ${xe}`) : B.length > 0 ? console.log(`[???] Lite???????${B.length}?????? MODEL ID: ${xe}`) : console.log(`[???] Lite????????? MODEL ID: ${xe}`)) : he ? ue ? ke ? (xe = "veo3.1-pro-4k", console.log(`[???] Pro??????${B.length}???+ 4K??? MODEL ID: ${xe}`)) : (xe = "veo3.1-pro", console.log(`[???] Pro??????${B.length}???+ ${H || "??"}??? MODEL ID: ${xe}`)) : ke ? (xe = "veo3.1-4k", console.log(`[???] ??????${B.length}???+ 4K??? MODEL ID: ${xe}`)) : (xe = "veo3.1", console.log(`[???] ??????${B.length}???+ ${H || "??"}??? MODEL ID: ${xe}`)) : B.length > 0 ? ue && B.length === 1 ? (xe = ke ? "veo3.1-pro-4k" : "veo3.1-pro", console.log(`[???] Pro?????1???????: ${H || "Auto"}??? MODEL ID: ${xe}`)) : (xe = ke ? "veo3.1-components-4k" : "veo3.1-components", console.log(`[???] ?????${B.length}???????: ${H || "Auto"}??? MODEL ID: ${xe}`)) : ke ? (xe = ue ? "veo3.1-pro-4k" : "veo3.1-components-4k", console.log(`[???] ???? + 4K??? MODEL ID: ${xe}`)) : (xe = ue ? "veo3.1-pro" : "veo3.1-components", console.log(`[???] ??????? MODEL ID: ${xe}`)), ce = {
              model: xe,
              prompt: M,
              resolution: be,
              ...(ae ? {
                aspect_ratio: ae
              } : {}),
              ...(Ee ? {
                enable_upsample: !0
              } : {}),
              enhance_prompt: !1
            }, B.length > 0) {
              const Te = await Cgi(B, T, async me => {
                const Ae = await Z(me, !0),
                  Fe = typeof Ae == "string" ? Ae : await X(Ae);
                if (!Fe.startsWith("data:image/")) throw new Error(`参考图格式无效: ${Fe.substring(0, 50)}`);
                return Fe;
              });
              ce.images = Te;
              const Ne = _ce(T) || kce(T);
              if (console.log("[分镜] Veo 图生视频 images 数量:", Te.length), console.log("[分镜] Veo 参考图格式:", Te.map((me, Ae) => ({
                index: Ae,
                type: me.startsWith("data:") ? "base64" : me.startsWith("http") ? "http" : "other",
                preview: me.substring(0, 80),
                ...(me.startsWith("data:") ? {
                  sizeMB: (me.length / 1024 / 1024).toFixed(2)
                } : {})
              }))), !Ne) {
                const me = Te.filter(Ae => !Ae.startsWith("data:image/"));
                if (me.length > 0) throw new Error(`${me.length} 张参考图不是 base64 格式`);
              }
            } else console.log("[分镜] Veo 文生视频（无 images）");
          } else if (bx(T)) {
            let ae = j;
            j.includes("t8star") && (console.log("[???] Hailuo???????URL?????? ai.comfly.chat"), ae = "https://ai.comfly.chat"), pe = `${ae}/minimax/v1/video_generation`;
            const be = {
              model: P.modelName || "MiniMax-Hailuo-2.3",
              prompt: M
            };
            U && U !== "Auto" && (be.aspect_ratio = U);
            const Ee = B.length === 2;
            let xe = H;
            if (Ee && H !== "768P" && H !== "1080P" && H !== "Auto" && (xe = "768P", console.log("[???] Hailuo?????????768P?????:", H, "?")), J && (be.duration = J), xe !== "Auto" ? be.resolution = xe : be.resolution = "768P", B.length === 2) {
              console.log("[???] Hailuo??????????:", P.modelName, "???:", be.resolution);
              const [he, ue] = await Promise.all(B.map(async ge => {
                const _e = await Z(ge, !0);
                return typeof _e == "string" ? _e : await X(_e);
              }));
              be.first_frame_image = he, be.last_frame_image = ue;
            } else if (B.length === 1) {
              console.log("[???] Hailuo????????");
              const he = B[0],
                ue = await Z(he, !0),
                ge = typeof ue == "string" ? ue : await X(ue);
              be.first_frame_image = ge;
            } else console.log("[???] Hailuo????????");
            ce = be;
          } else if (Y1(T)) {
            const ae = gX(T),
              be = !!E.wan26MultiShot,
              Ee = E.wan26AudioConfig || "none",
              xe = E.wan26AudioFile,
              he = E.wan26AudioSegment,
              ue = E.resolution || E.wan26Resolution || "720P";
            ae ? pe = `${j}/api/v1/services/aigc/video-generation/video-synthesis` : pe = `${j}/v2/videos/generations`;
            let ge = {
              prompt: M
            };
            if (Ee === "upload" && xe) try {
              const _e = await Q9t(xe, he || void 0, R, j);
              ge.audio_url = _e;
            } catch (_e) {
              throw console.error("[???] Wan 2.6 ??????:", _e), new Error("?????????????????");
            }
            if (B.length > 0) {
              const _e = B[0],
                ke = await Z(_e, !0);
              ge.images = [typeof ke == "string" ? ke : await X(ke)];
            }
            if (ae) {
              const _e = {
                prompt: M
              };
              ge.images && ge.images.length > 0 && (_e.img_url = ge.images[0]), ge.audio_url && (_e.audio_url = ge.audio_url);
              const ke = {
                resolution: ue,
                prompt_extend: !0,
                duration: J
              };
              be && (ke.shot_type = "multi"), ge.audio_url || (Ee === "auto" || !Ee ? ae || (ke.audio = !0) : Ee === "none" && (ke.audio = !1)), ce = {
                model: P.modelName || "wan2.6-i2v-flash",
                input: _e,
                parameters: ke
              };
            } else ce = {
              model: "wan2.6-i2v",
              prompt: M,
              resolution: ue,
              prompt_extend: !0,
              duration: J
            }, be && (ce.shot_type = "multi"), ge.images && (ce.images = ge.images), ge.audio_url ? ce.audio_url = ge.audio_url : Ee === "auto" || !Ee ? ce.audio = !0 : Ee === "none" && (ce.audio = !1);
          } else if (zv(T)) {
            pe = `${j}/kling/v1/videos/omni-video`;
            const ae = E3(T);
            let be = E.klingVideoUrl;
            const Ee = E.klingVideoReferType || "base",
              xe = E.klingVideoKeepSound || "yes",
              he = E.klingVideoSegment;
            let ue = E.klingImages;
            const ge = E.klingSubjects;
            if (((ue == null ? void 0 : ue.length) ?? 0) > 0 || be) {
              const {
                isGlobalOssUploadEnabled: ve
              } = await Ie(async () => {
                const {
                  isGlobalOssUploadEnabled: Te
                } = await Promise.resolve().then(() => Ah);
                return {
                  isGlobalOssUploadEnabled: Te
                };
              }, void 0, import.meta.url);
              if (ve()) try {
                const {
                    resolveKlingO1MediaForApi: Te
                  } = await Ie(async () => {
                    const {
                      resolveKlingO1MediaForApi: me
                    } = await Promise.resolve().then(() => Mc);
                    return {
                      resolveKlingO1MediaForApi: me
                    };
                  }, void 0, import.meta.url),
                  Ne = await Te({
                    images: ue,
                    videoUrl: be,
                    videoFile: E.klingVideoFile
                  });
                Ne.images && (ue = Ne.images), Ne.videoUrl && (be = Ne.videoUrl);
              } catch (Te) {
                console.warn("[分镜视表] 可灵 O1 参考素材 OSS 解析失败:", Te);
              }
            }
            let _e = J;
            be && Ee === "base" && he && (_e = Math.round(he.endTime - he.startTime));
            const ke = {
              model_name: ae ? "kling-v3-omni" : "kling-video-o1",
              prompt: M,
              aspect_ratio: U === "Auto" ? "16:9" : U,
              duration: String(_e)
            };
            if (ae) {
              const ve = E.resolution || "720P";
              ke.mode = ve === "4K" ? "4k" : ve === "1080P" ? "pro" : "std";
              const Te = E.klingV3Sound || "on";
              ke.sound = be ? "off" : Te === "on" ? "on" : "off";
            } else ke.mode = "pro";
            if (ue && ue.length > 0) ke.image_list = ue.map(ve => ({
              image_url: ve.url
            }));else if (B.length > 0) {
              const ve = await Promise.all(B.map(async Te => {
                const Ne = await Z(Te, !0);
                return {
                  image_url: typeof Ne == "string" ? Ne : await X(Ne)
                };
              }));
              ke.image_list = ve;
            }
            ge && ge.length > 0 && (ke.element_list = ge.map(ve => ({
              element_id: String(ve)
            }))), be && (ke.video_list = [{
              video_url: be,
              refer_type: Ee,
              keep_original_sound: xe
            }]), ce = ke;
          } else if (Dk(T)) {
            pe = `${j}/v1/videos`, we = !0;
            const ae = new FormData();
            if (ae.append("model", P.modelName || ZMt), ae.append("prompt", M), ae.append("size", nPt(U)), ae.append("seconds", String(J)), ae.append("watermark", "false"), B.length > 0) {
              const {
                  resolveOminiInputReferenceUrl: be,
                  isLikelyVideoRefUrl: Ee
                } = await Ie(async () => {
                  const {
                    resolveOminiInputReferenceUrl: ge,
                    isLikelyVideoRefUrl: _e
                  } = await Promise.resolve().then(() => Mc);
                  return {
                    resolveOminiInputReferenceUrl: ge,
                    isLikelyVideoRefUrl: _e
                  };
                }, void 0, import.meta.url),
                xe = B[0],
                he = Ee(xe) ? "video" : "image",
                ue = await be(xe, {
                  perNodeOss: !1,
                  apiKey: R,
                  baseUrl: j,
                  mediaType: he
                });
              ae.append("input_reference", ue);
            }
            ce = ae;
          } else if (AZ(T)) {
            const {
                resolveHuyaWan30SubmitEndpoint: ae,
                buildHuyaWan30Parameters: be,
                buildHuyaWan30SubmitPayload: Ee
              } = await Ie(async () => {
                const {
                  resolveHuyaWan30SubmitEndpoint: Xe,
                  buildHuyaWan30Parameters: De,
                  buildHuyaWan30SubmitPayload: Ye
                } = await Promise.resolve().then(() => h0r);
                return {
                  resolveHuyaWan30SubmitEndpoint: Xe,
                  buildHuyaWan30Parameters: De,
                  buildHuyaWan30SubmitPayload: Ye
                };
              }, void 0, import.meta.url),
              {
                endpoint: xe,
                openApiRoot: he
              } = ae(P.url || j, T);
            pe = xe, we = !1;
            const {
                isLikelyVideoRefUrl: ue
              } = await Ie(async () => {
                const {
                  isLikelyVideoRefUrl: Xe
                } = await Promise.resolve().then(() => Mc);
                return {
                  isLikelyVideoRefUrl: Xe
                };
              }, void 0, import.meta.url),
              {
                isLikelyAudioReferenceUrl: ge
              } = await Ie(async () => {
                const {
                  isLikelyAudioReferenceUrl: Xe
                } = await Promise.resolve().then(() => H9e);
                return {
                  isLikelyAudioReferenceUrl: Xe
                };
              }, void 0, import.meta.url),
              {
                ensureHuyaMiniMaxH3MediaHttpUrl: _e
              } = await Ie(async () => {
                const {
                  ensureHuyaMiniMaxH3MediaHttpUrl: Xe
                } = await Promise.resolve().then(() => Q1e);
                return {
                  ensureHuyaMiniMaxH3MediaHttpUrl: Xe
                };
              }, void 0, import.meta.url),
              ke = E || {},
              ve = !!ke.veoFramesMode,
              Te = [],
              Ne = [],
              me = [];
            for (const Xe of B.slice(0, 10)) ue(Xe) ? Ne.push(Xe) : ge(Xe) ? me.push(Xe) : Te.push(Xe);
            const Ae = ve && Te[0] || "",
              Fe = ve && Te[1] || "",
              Me = ve ? [] : Te,
              [Re, $e, rt, nt, ze] = await Promise.all([Promise.all(Me.slice(0, 10).map(Xe => _e(Xe, he, R, "image"))), Promise.all((ve ? [] : Ne).slice(0, 5).map(Xe => _e(Xe, he, R, "video"))), Promise.all((ve ? [] : me).slice(0, 5).map(Xe => _e(Xe, he, R, "audio"))), Ae ? _e(Ae, he, R, "image") : Promise.resolve(""), Fe ? _e(Fe, he, R, "image") : Promise.resolve("")]);
            if (ve && !nt) throw new Error("虎牙万相3.0 首尾帧模式需要首帧图片");
            const Le = Re.length > 0 || $e.length > 0 || rt.length > 0 || !!nt,
              Ke = be({
                framesMode: ve,
                prompt: M || (Le ? "请参考输入素材生成视频" : "生成视频"),
                durationUi: String(Y || "5s"),
                resolutionUi: String(H || rl(T)[0] || "1080P"),
                ratioUi: String(U || "16:9"),
                audio: ke.huyaWanAudio !== !1,
                promptExtend: !!(ke.promptExtend ?? ke.huyaWanPromptExtend),
                watermark: !!ke.huyaWanWatermark,
                imageUrls: Re,
                videoUrls: $e,
                audioUrls: rt,
                startImage: nt || void 0,
                endImage: ze || void 0
              });
            ce = Ee({
              framesMode: ve,
              parameters: Ke,
              model: P.modelName
            });
          } else if (ug(T)) {
            const {
                resolveHuyaMiniMaxH3SubmitEndpoint: ae,
                resolveHuyaMiniMaxH3TaskType: be,
                buildHuyaMiniMaxH3Parameters: Ee,
                buildHuyaMiniMaxH3SubmitPayload: xe
              } = await Ie(async () => {
                const {
                  resolveHuyaMiniMaxH3SubmitEndpoint: Xe,
                  resolveHuyaMiniMaxH3TaskType: De,
                  buildHuyaMiniMaxH3Parameters: Ye,
                  buildHuyaMiniMaxH3SubmitPayload: Ce
                } = await Promise.resolve().then(() => yUt);
                return {
                  resolveHuyaMiniMaxH3SubmitEndpoint: Xe,
                  resolveHuyaMiniMaxH3TaskType: De,
                  buildHuyaMiniMaxH3Parameters: Ye,
                  buildHuyaMiniMaxH3SubmitPayload: Ce
                };
              }, void 0, import.meta.url),
              {
                endpoint: he,
                openApiRoot: ue
              } = ae(P.url || j);
            pe = he, we = !1;
            const ge = E || {},
              _e = !!ge.veoFramesMode,
              ke = J5e(ge.duration != null ? ge.duration : Y),
              {
                isLikelyVideoRefUrl: ve
              } = await Ie(async () => {
                const {
                  isLikelyVideoRefUrl: Xe
                } = await Promise.resolve().then(() => Mc);
                return {
                  isLikelyVideoRefUrl: Xe
                };
              }, void 0, import.meta.url),
              {
                ensureHuyaMiniMaxH3MediaHttpUrl: Te
              } = await Ie(async () => {
                const {
                  ensureHuyaMiniMaxH3MediaHttpUrl: Xe
                } = await Promise.resolve().then(() => Q1e);
                return {
                  ensureHuyaMiniMaxH3MediaHttpUrl: Xe
                };
              }, void 0, import.meta.url),
              Ne = [],
              me = [];
            for (const Xe of B.slice(0, 9)) ve(Xe) ? me.push(Xe) : Ne.push(Xe);
            const Ae = _e && Ne[0] || "",
              Fe = _e && Ne[1] || "",
              Me = _e ? [] : Ne,
              [Re, $e, rt, nt] = await Promise.all([Promise.all(Me.slice(0, 9).map(Xe => Te(Xe, ue, R, "image"))), Promise.all((_e ? [] : me).slice(0, 3).map(Xe => Te(Xe, ue, R, "video"))), Ae ? Te(Ae, ue, R, "image") : Promise.resolve(""), Fe ? Te(Fe, ue, R, "image") : Promise.resolve("")]);
            if (_e && !rt && !nt) throw new Error("虎牙 MiniMax-H3 首尾帧模式需要至少一张首帧或尾帧图片");
            const ze = be({
                imageCount: Re.length,
                videoCount: $e.length
              }),
              Le = Re.length > 0 || $e.length > 0 || !!(rt || nt),
              Ke = Ee({
                type: ze,
                framesMode: _e,
                prompt: M || (Le ? "请参考输入素材生成视频" : "生成视频"),
                durationSec: ke,
                resolutionUi: String(H || rl(T)[0] || "2K"),
                ratioUi: String(U || "16:9"),
                images: Re,
                videos: $e,
                startImage: rt || void 0,
                endImage: nt || void 0
              });
            ce = xe({
              type: ze,
              framesMode: _e,
              parameters: Ke,
              model: P.modelName || lX,
              provider: gce
            });
          } else if (fg(T)) {
            const {
                resolveHuyaKlingSubmitEndpoint: ae,
                resolveHuyaKlingTaskType: be,
                buildHuyaKlingParameters: Ee,
                buildHuyaKlingSubmitPayload: xe
              } = await Ie(async () => {
                const {
                  resolveHuyaKlingSubmitEndpoint: nt,
                  resolveHuyaKlingTaskType: ze,
                  buildHuyaKlingParameters: Le,
                  buildHuyaKlingSubmitPayload: Ke
                } = await Promise.resolve().then(() => bUt);
                return {
                  resolveHuyaKlingSubmitEndpoint: nt,
                  resolveHuyaKlingTaskType: ze,
                  buildHuyaKlingParameters: Le,
                  buildHuyaKlingSubmitPayload: Ke
                };
              }, void 0, import.meta.url),
              {
                endpoint: he,
                openApiRoot: ue
              } = ae(P.url || j, T);
            pe = he, we = !1;
            const {
                ensureHuyaMiniMaxH3MediaHttpUrl: ge
              } = await Ie(async () => {
                const {
                  ensureHuyaMiniMaxH3MediaHttpUrl: nt
                } = await Promise.resolve().then(() => Q1e);
                return {
                  ensureHuyaMiniMaxH3MediaHttpUrl: nt
                };
              }, void 0, import.meta.url),
              {
                isLikelyVideoRefUrl: _e
              } = await Ie(async () => {
                const {
                  isLikelyVideoRefUrl: nt
                } = await Promise.resolve().then(() => Mc);
                return {
                  isLikelyVideoRefUrl: nt
                };
              }, void 0, import.meta.url),
              ke = [];
            let ve = "";
            for (const nt of B.slice(0, 7)) _e(nt) ? ve || (ve = nt) : ke.push(nt);
            const Te = E || {},
              Ne = !!Te.klingV3MultiShot,
              me = String(U || "Auto"),
              [Ae, Fe] = await Promise.all([Promise.all(ke.map(nt => ge(nt, ue, R, "image"))), ve ? ge(ve, ue, R, "video") : Promise.resolve("")]),
              Me = Ae[0] || "",
              Re = Ae[1] || "",
              $e = be({
                configId: T,
                imageCount: L2(T) ? Ae.length : Me ? 1 : 0,
                multiShot: Ne
              });
            if ($e === "image2video" && !L2(T) && !Me) throw new Error($j(T) ? "虎牙可灵 V2.1-大师版需要一张参考图" : "虎牙可灵图生视频需要首帧/参考图");
            const rt = Ee({
              configId: T,
              type: $e,
              prompt: M || (Me || Ae.length || Fe ? "请参考输入素材生成视频" : "生成视频"),
              durationSec: Number.isFinite(J) ? J : 5,
              modeUi: String(H || rl(T)[0] || "std"),
              ratioUi: me,
              sound: !!Te.huyaKlingSound,
              keepOriginalSound: !!Te.huyaKlingKeepOriginalSound || !!Fe && !!Te.huyaKlingSound,
              startImage: Me || void 0,
              endImage: Re || void 0,
              imageList: L2(T) ? Ae : void 0,
              videoUrl: Fe || void 0,
              subjectIds: E.klingSubjects || [],
              multiShot: Ne,
              shotType: Te.klingV3ShotType || "intelligence",
              multiPrompt: Te.klingV3MultiPrompt
            });
            ce = xe({
              configId: T,
              type: $e,
              parameters: rt,
              model: P.modelName
            });
          } else if (Fv(T)) {
            pe = `${j}/v1/videos`, we = !0;
            const ae = Math.min(15, Math.max(5, Number.isFinite(J) ? J : 5)),
              {
                resolveMiniMaxH3MediaUrl: be,
                isLikelyVideoRefUrl: Ee
              } = await Ie(async () => {
                const {
                  resolveMiniMaxH3MediaUrl: $e,
                  isLikelyVideoRefUrl: rt
                } = await Promise.resolve().then(() => Mc);
                return {
                  resolveMiniMaxH3MediaUrl: $e,
                  isLikelyVideoRefUrl: rt
                };
              }, void 0, import.meta.url),
              {
                isLikelyAudioReferenceUrl: xe
              } = await Ie(async () => {
                const {
                  isLikelyAudioReferenceUrl: $e
                } = await Promise.resolve().then(() => H9e);
                return {
                  isLikelyAudioReferenceUrl: $e
                };
              }, void 0, import.meta.url),
              he = [],
              ue = [],
              ge = [];
            for (const $e of B.slice(0, 9)) Ee($e) ? ue.push($e) : xe($e) ? ge.push($e) : he.push($e);
            const _e = he.slice(0, 9),
              ke = ue.slice(0, 3),
              ve = ge.slice(0, 3),
              Te = rPt(U, {
                hasImageRefs: _e.length > 0,
                hasVideoRefs: ke.length > 0,
                hasAudioRefs: ve.length > 0
              }),
              Ne = aPt(String(H || "2K")),
              me = ($e, rt) => be($e, {
                perNodeOss: !1,
                apiKey: R,
                baseUrl: j,
                mediaType: rt
              }),
              [Ae, Fe, Me] = await Promise.all([Promise.all(_e.map($e => me($e, "image"))), Promise.all(ke.map($e => me($e, "video"))), Promise.all(ve.map($e => me($e, "audio")))]),
              Re = new FormData();
            Re.append("model", P.modelName || tPt), Re.append("prompt", M), Re.append("seconds", String(ae)), Re.append("resolution", Ne), Re.append("aspect_ratio", Te);
            for (const $e of Ae) Re.append("imageUrls", $e);
            for (const $e of Fe) Re.append("videoUrls", $e);
            for (const $e of Me) Re.append("audioUrls", $e);
            ce = Re;
          } else if (X2(T)) {
            const {
              buildWan30ApiPayload: ae
            } = await Ie(async () => {
              const {
                buildWan30ApiPayload: nt
              } = await Promise.resolve().then(() => deo);
              return {
                buildWan30ApiPayload: nt
              };
            }, void 0, import.meta.url);
            pe = `${j}/v1/videos`, we = !1;
            const {
                resolveMiniMaxH3MediaUrl: be,
                isLikelyVideoRefUrl: Ee
              } = await Ie(async () => {
                const {
                  resolveMiniMaxH3MediaUrl: nt,
                  isLikelyVideoRefUrl: ze
                } = await Promise.resolve().then(() => Mc);
                return {
                  resolveMiniMaxH3MediaUrl: nt,
                  isLikelyVideoRefUrl: ze
                };
              }, void 0, import.meta.url),
              {
                isLikelyAudioReferenceUrl: xe
              } = await Ie(async () => {
                const {
                  isLikelyAudioReferenceUrl: nt
                } = await Promise.resolve().then(() => H9e);
                return {
                  isLikelyAudioReferenceUrl: nt
                };
              }, void 0, import.meta.url),
              he = E || {},
              ue = !!he.veoFramesMode,
              ge = [],
              _e = [],
              ke = [];
            for (const nt of B.slice(0, 10)) Ee(nt) ? _e.push(nt) : xe(nt) ? ke.push(nt) : ge.push(nt);
            const ve = ue && ge[0] || "",
              Te = ue && ge[1] || "",
              Ne = ue ? [] : ge,
              me = (nt, ze) => be(nt, {
                perNodeOss: !1,
                apiKey: R,
                baseUrl: j,
                mediaType: ze
              }),
              [Ae, Fe, Me, Re, $e] = await Promise.all([Promise.all(Ne.slice(0, 10).map(nt => me(nt, "image"))), Promise.all((ue ? [] : _e).slice(0, 5).map(nt => me(nt, "video"))), Promise.all((ue ? [] : ke).slice(0, 5).map(nt => me(nt, "audio"))), ve ? me(ve, "image") : Promise.resolve(""), Te ? me(Te, "image") : Promise.resolve("")]);
            if (ue && !Re) throw new Error("万相3.0 首尾帧模式需要首帧图片");
            const rt = Ae.length > 0 || Fe.length > 0 || Me.length > 0 || !!Re;
            ce = ae({
              modelId: T,
              modelName: P.modelName,
              prime: Dqe(T, he),
              framesMode: ue,
              prompt: M || (rt ? "请参考输入素材生成视频" : "生成视频"),
              durationUi: String(Y || "5s"),
              resolutionUi: String(H || rl(T)[0] || "1080P"),
              ratioUi: String(U || "16:9"),
              audio: he.huyaWanAudio !== !1,
              promptExtend: !!(he.promptExtend ?? he.huyaWanPromptExtend),
              watermark: !!he.huyaWanWatermark,
              imageUrls: Ae,
              videoUrls: Fe,
              audioUrls: Me,
              startImage: Re || void 0,
              endImage: $e || void 0
            });
          } else {
            const ae = j.includes("api.openai.com"),
              be = t2e(U) || "16:9";
            if (ae) {
              pe = `${j}/videos`, we = !0;
              const xe = be === "9:16" ? "720x1280" : "1280x720",
                he = new FormData();
              if (he.append("model", P.modelName || "sora-2"), he.append("prompt", M), he.append("size", xe), he.append("seconds", String(J)), B.length > 0) {
                const ue = await Ns(B[0]);
                he.append("input_reference", ue, "ref.png"), he.append("image", ue, "ref.png"), console.log("[???] Sora?????????????");
              }
              ce = he;
            } else {
              pe = `${j}/v2/videos/generations`, we = !1;
              const Ee = {
                model: P.modelName || "sora-2",
                prompt: M,
                aspect_ratio: be,
                duration: String(J)
              };
              if (B.length > 0) {
                const xe = await Promise.all(B.slice(0, 1).map(async he => {
                  const ue = await Z(he, !0);
                  return typeof ue == "string" ? ue : await X(ue);
                }));
                Ee.images = xe, console.log("[???] Sora?????????????????????");
              }
              ce = Ee;
            }
          }
          const re = we ? {
            Authorization: `Bearer ${R}`
          } : {
            "Content-Type": "application/json",
            Authorization: `Bearer ${R}`
          };
          ag(T) && (re.debug_accept_unset_ratio_model = "true"), console.log("[???] ??API??:", {
            endpoint: pe,
            model: T,
            useMultipart: we,
            hasImages: B.length > 0,
            imageCount: B.length
          });
          const fe = await fetch(pe, {
            method: "POST",
            headers: re,
            body: we ? ce : await Pg(ce)
          });
          if (!fe.ok) {
            const ae = await fe.text();
            throw console.error("[???] API??:", {
              status: fe.status,
              errorText: ae
            }), new Error(`API????: ${fe.status} - ${ae}`);
          }
          const ye = await fe.json();
          console.log("[???] API??:", ye);
          const ie = ye.request_id ?? ye.requestId ?? ye.task_id ?? ((ne = ye.data) == null ? void 0 : ne.request_id) ?? ((de = ye.data) == null ? void 0 : de.task_id) ?? ye.id ?? ((le = ye.data) == null ? void 0 : le.id);
          if (ie) O(), s(ae => ae.map(be => be.id === D ? {
            ...be,
            status: "generating",
            progress: 10,
            remoteTaskId: ie
          } : be)), f(D, 10), _(D, ie, j, R, T), console.log("[???] ????????????:", {
            taskId: D,
            remoteTaskId: ie,
            model: T
          });else throw new Error("??????ID");
        } catch (J) {
          O(), console.error("[???] ??????:", J);
          const pe = J instanceof Error ? J.message : "????";
          s(ce => ce.map(we => we.id === D ? {
            ...we,
            status: "failed",
            progress: 0,
            errorMsg: pe
          } : we)), m(I, E.id, {
            status: "draft",
            generatingProgress: 0
          }), u.current.delete(D), h.current.delete(D);
        }
      }, [m, n, r, _, s, f]),
      k = g.useCallback(async (I, E, M, T) => {
        var G, z, V, O, L, D, U, H;
        const P = t.get(I);
        if (!P || P.type !== "storyboard-node") throw new Error("??????");
        if (!E.trim()) {
          alert("???????");
          return;
        }
        const R = T || "gemini-3-pro-preview",
          j = n.find(Y => Y.type === "Chat" && (Y.id === R || Y.modelName === R)) || n.find(Y => Y.type === "Chat" && Y.id === "gemini-3-pro") || n.find(Y => Y.type === "Chat");
        if (!j) {
          alert("???? Chat API");
          return;
        }
        const B = j.key || r;
        if (!B) {
          alert("???? API Key");
          return;
        }
        const F = (j.url || "https://ai.comfly.chat").replace(/\/+$/, ""),
          N = BS("agent", {
            id: crypto.randomUUID(),
            label: "分镜脚本",
            modelName: j.modelName || j.id
          });
        try {
          const K = `????????????????????????????????

${M ? `??? ${M.rows * M.cols} ???????? ${M.rows}x${M.cols} ????` : "????????????????????????"}

??JSON??????????
{
  "shots": [
    {
      "shot_number": 1,
      "shot_size": "??",
      "description_zh": "????????",
      "description_en": "Shot description (English)",
      "prompt": "???????????????"
    },
    // ... ????
  ]
}`,
            W = new AbortController(),
            Q = setTimeout(() => W.abort(), 12e4);
          let q;
          try {
            if (q = await fetch(`${F}/v1/chat/completions`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${B}`
              },
              body: JSON.stringify({
                model: j.modelName || "gemini-3-pro-preview",
                messages: [{
                  role: "system",
                  content: K
                }, {
                  role: "user",
                  content: E
                }],
                max_tokens: 16e3,
                temperature: .7,
                stream: !1
              }),
              signal: W.signal
            }), clearTimeout(Q), !q.ok) {
              const ie = await q.text();
              throw new Error(`API????: ${q.status} - ${ie}`);
            }
          } catch (ie) {
            if (clearTimeout(Q), ie instanceof Error) {
              if (ie.name === "AbortError") throw new Error("?????120???????????????");
              if (ie.message.includes("Failed to fetch") || ie.message.includes("ERR_CONNECTION_CLOSED")) throw new Error(`??????: ${ie.message}?????????API??????`);
              if (ie.message.includes("NetworkError")) throw new Error(`????: ${ie.message}????????`);
            }
            throw ie;
          }
          const ne = await q.json(),
            le = (((V = (z = (G = ne.choices) == null ? void 0 : G[0]) == null ? void 0 : z.message) == null ? void 0 : V.content) || ((U = (D = (L = (O = ne.data) == null ? void 0 : O.choices) == null ? void 0 : L[0]) == null ? void 0 : D.message) == null ? void 0 : U.content) || ne.content || "").match(/\{[\s\S]*\}/);
          if (!le) throw new Error("???JSON???????");
          const J = le[0],
            ce = JSON.parse(J).shots || [];
          if (ce.length === 0) throw new Error("?????????");
          const we = ce.map((ie, ae) => ({
              id: `shot-${Date.now()}-${ae}`,
              scene_index: ae + 1,
              time_range: "",
              image_url: "",
              description: ie.description_zh || ie.description_en || "",
              prompt: ie.prompt || ie.description_en || ie.description_zh || "",
              camera: ie.shot_size || "",
              tags: [],
              status: "draft",
              model: "sora-2",
              ratio: "16:9",
              duration: "15s"
            })),
            X = we.length;
          let Z = "auto";
          if (M) Z = `${M.rows}x${M.cols}`;else {
            const ie = Math.ceil(Math.sqrt(X));
            Z = `${Math.ceil(X / ie)}x${ie}`;
          }
          const re = {
              layout_specification: Z,
              total_shots: X,
              shots: ce
            },
            fe = JSON.stringify(re, null, 2),
            ye = ((H = P.settings) == null ? void 0 : H.shots) || [];
          return i(I, {
            shots: [...ye, ...we],
            jsonData: fe
          }), N(), re;
        } catch (Y) {
          throw console.error("[Storyboard] ?????????:", Y), Y;
        }
      }, [t, n, r, i]),
      A = g.useCallback(async (I, E, M, T, P, R) => {
        var H, Y, K, W, Q, q, ne, de, le;
        const j = t.get(I);
        if (!j || j.type !== "storyboard-chart-node") throw new Error("分镜图表节点不存在或类型错误");
        if (!E.trim()) throw new Error("剧本文本为空");
        const B = ((H = j.settings) == null ? void 0 : H.cells) || [],
          F = ((Y = j.settings) == null ? void 0 : Y.gridMode) ?? "grid",
          N = R ?? M * T,
          G = xcr(E);
        if ((G == null ? void 0 : G.kind) === "json") {
          const J = ije({
            existingCells: B,
            parsed: G.data,
            currentRows: M,
            currentCols: T,
            totalShots: R,
            gridMode: F
          });
          i(I, J);
          return;
        }
        if ((G == null ? void 0 : G.kind) === "prompt_array") {
          const J = ije({
            existingCells: B,
            plainPrompts: G.prompts,
            currentRows: M,
            currentCols: T,
            totalShots: R,
            gridMode: F
          });
          i(I, J);
          return;
        }
        const z = P || "gemini-3-pro-preview",
          V = n.find(J => J.type === "Chat" && (J.id === z || J.modelName === z)) || n.find(J => J.type === "Chat");
        if (!V) throw new Error("请先配置 Chat API");
        const O = V.key || r;
        if (!O) throw new Error("请先配置 API Key");
        const L = (V.url || "https://ai.comfly.chat").replace(/\/+$/, ""),
          D = BS("agent", {
            id: crypto.randomUUID(),
            label: "分镜拆分",
            modelName: V.modelName || V.id
          }),
          U = $bi(N);
        try {
          const J = new AbortController(),
            pe = setTimeout(() => J.abort(), 12e4);
          let ce;
          try {
            if (ce = await fetch(`${L}/v1/chat/completions`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${O}`
              },
              body: JSON.stringify({
                model: V.modelName || "gemini-3-pro-preview",
                messages: [{
                  role: "system",
                  content: U
                }, {
                  role: "user",
                  content: E
                }],
                max_tokens: 16e3,
                temperature: .3,
                stream: !1
              }),
              signal: J.signal
            }), clearTimeout(pe), !ce.ok) {
              const fe = await ce.text();
              throw new Error(`API 请求失败: ${ce.status} - ${fe}`);
            }
          } catch (fe) {
            throw clearTimeout(pe), fe instanceof Error && fe.name === "AbortError" ? new Error("请求超时（120秒），请检查网络或稍后重试") : fe;
          }
          const we = await ce.json(),
            X = ((Q = (W = (K = we.choices) == null ? void 0 : K[0]) == null ? void 0 : W.message) == null ? void 0 : Q.content) || ((le = (de = (ne = (q = we.data) == null ? void 0 : q.choices) == null ? void 0 : ne[0]) == null ? void 0 : de.message) == null ? void 0 : le.content) || we.content || "",
            Z = Gbi(X),
            re = ije({
              existingCells: B,
              plainPrompts: Z,
              currentRows: M,
              currentCols: T,
              totalShots: R,
              gridMode: F
            });
          i(I, re), D();
        } catch (J) {
          throw console.error("[Storyboard] 分镜图表从文本生成失败:", J), J;
        }
      }, [t, n, r, i]),
      S = g.useCallback(async (I, E, M, T = () => !0) => {
        var F;
        const P = e == null ? void 0 : e.lease(),
          R = {
            id: I,
            alive: !0
          },
          j = () => R.alive && (!P || P.isCurrent()) && T();
        if (!j()) return;
        d.current.add(R);
        let B = !1;
        try {
          let N = l.current.get(I);
          if (!N || N.type !== "storyboard-node") {
            for (let G = 0; G < 3; G++) {
              if (await new Promise(z => setTimeout(z, 50)), !j()) return;
              if (N = l.current.get(I), N && N.type === "storyboard-node") break;
            }
            if (!N || N.type !== "storyboard-node") throw new Error("???????????????????");
          }
          if (!E) throw new Error("?????");
          try {
            const G = await OCt(E, M.cols, M.rows);
            if (!j()) return;
            const z = ((F = N.settings) == null ? void 0 : F.shots) || [],
              V = z.length,
              O = (H, Y, K, W) => {
                const Q = Math.floor(H / W) + 1,
                  q = H % W + 1,
                  ne = ["??", "??", "??", "??"],
                  de = ["Top Left", "Top Right", "Bottom Left", "Bottom Right"];
                return Y === 4 && K === 2 && W === 2 ? {
                  zh: `${ne[H]}?? - ???? ${H + 1}/${Y}`,
                  en: `${de[H]} Area - Split Sequence ${H + 1}/${Y}`
                } : {
                  zh: `?${Q}??${q}? - ???? ${H + 1}/${Y}`,
                  en: `Row ${Q} Col ${q} - Split Sequence ${H + 1}/${Y}`
                };
              },
              L = G.map((H, Y) => {
                const K = O(Y, G.length, M.rows, M.cols);
                return {
                  id: `shot-${Fi()}`,
                  scene_index: V + Y + 1,
                  time_range: "",
                  image_url: H.url,
                  description: K.zh,
                  description_zh: K.zh,
                  description_en: K.en,
                  prompt: `Cinematic shot, ${K.en.toLowerCase()}, detailed composition, high quality`,
                  tags: [],
                  status: "draft",
                  model: "sora-2",
                  ratio: "16:9",
                  duration: "15s",
                  resolution: "1080P",
                  shot_size: "?? (Medium Shot)"
                };
              }),
              D = z.length + L.length,
              U = `${M.rows}x${M.cols}`;
            return B = Tbi(o, N, j, H => {
              var Y;
              return Ebi(((Y = H.settings) == null ? void 0 : Y.shots) || [], L, M);
            }, () => d.current.delete(R)), console.log("[Storyboard] ??????:", {
              totalShots: D,
              layoutSpec: U,
              newShotsCount: L.length
            }), L;
          } catch (G) {
            if (!j()) return;
            console.error("[Storyboard] ??????:", G);
            const z = G instanceof Error ? G.message : "????";
            throw alert(x("????: {0}", z)), G;
          }
        } finally {
          B || d.current.delete(R);
        }
      }, [e, o]),
      C = g.useCallback(async (I, E, M = 4, T, P, R, j) => {
        var D, U, H, Y, K, W, Q, q;
        const B = t.get(I);
        if (!B || B.type !== "storyboard-node") throw new Error("??????");
        const F = E.prompt || E.description || "";
        if (!F.trim()) {
          alert("??????????????");
          return;
        }
        let N = null;
        if (E.id && j) {
          j(I, E.id, {
            status: "generating",
            generatingProgress: 10
          });
          let ne = 10;
          N = setInterval(() => {
            E.id && j && (ne += 10, ne < 90 && j(I, E.id, {
              generatingProgress: ne
            }));
          }, 500);
        }
        const G = T || "gemini-3-pro-preview",
          z = n.find(ne => ne.type === "Chat" && (ne.id === G || ne.modelName === G)) || n.find(ne => ne.type === "Chat" && ne.id === "gemini-3-pro") || n.find(ne => ne.type === "Chat");
        if (!z) {
          alert("???? Chat API");
          return;
        }
        const V = z.key || r;
        if (!V) {
          alert("???? API Key");
          return;
        }
        const O = (z.url || "https://ai.comfly.chat").replace(/\/+$/, ""),
          L = BS("agent", {
            id: crypto.randomUUID(),
            label: "分镜续写",
            modelName: z.modelName || z.id
          });
        try {
          const ne = `???????????????????????????????????????????

??? ${M} ?????????????
1. ??????????????
2. ???????????
3. ??????????????????????????

??JSON??????????
{
  "shots": [
    {
      "shot_number": 1,
      "shot_size": "??",
      "description_zh": "????????",
      "description_en": "Shot description (English)",
      "prompt": "???????????????"
    },
    // ... ????
  ]
}`,
            de = await fetch(`${O}/v1/chat/completions`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${V}`
              },
              body: JSON.stringify({
                model: z.modelName || "gemini-3-pro-preview",
                messages: [{
                  role: "system",
                  content: ne
                }, {
                  role: "user",
                  content: `????????
${F}

????????? ${M} ?????????`
                }],
                max_tokens: 16e3,
                temperature: .7,
                stream: !1
              })
            });
          if (!de.ok) {
            const ie = await de.text();
            throw new Error(`API????: ${de.status} - ${ie}`);
          }
          const le = await de.json(),
            pe = (((H = (U = (D = le.choices) == null ? void 0 : D[0]) == null ? void 0 : U.message) == null ? void 0 : H.content) || ((Q = (W = (K = (Y = le.data) == null ? void 0 : Y.choices) == null ? void 0 : K[0]) == null ? void 0 : W.message) == null ? void 0 : Q.content) || le.content || "").match(/\{[\s\S]*\}/);
          if (!pe) throw new Error("???JSON???????");
          const ce = pe[0],
            X = JSON.parse(ce).shots || [];
          if (X.length === 0) throw new Error("?????????");
          N && clearInterval(N);
          const Z = ((q = B.settings) == null ? void 0 : q.shots) || [];
          let re, fe;
          P !== void 0 && P >= 0 && P < Z.length ? (re = P + 1, fe = Z[P].scene_index || P + 1) : (re = Z.length, fe = Z.length);
          const ye = X.map((ie, ae) => ({
            id: `shot-${Date.now()}-${ae}`,
            scene_index: fe + ae + 1,
            time_range: "",
            image_url: E.image_url || "",
            description: ie.description_zh || ie.description_en || "",
            prompt: ie.prompt || ie.description_en || ie.description_zh || "",
            camera: ie.shot_size || E.camera || "",
            tags: [],
            status: "draft",
            model: E.model || "sora-2",
            ratio: E.ratio || "16:9",
            duration: E.duration || "15s"
          }));
          if (R) ye.forEach((ie, ae) => {
            ie.scene_index = ae + 1;
          });else {
            const ie = [...Z];
            ie.splice(re, 0, ...ye);
            for (let ae = re + ye.length; ae < ie.length; ae++) ie[ae] = {
              ...ie[ae],
              scene_index: ie[ae].scene_index + ye.length
            };
            i(I, {
              shots: ie
            });
          }
          return E.id && j && (j(I, E.id, {
            status: "draft",
            generatingProgress: 100
          }), setTimeout(() => {
            j && j(I, E.id, {
              generatingProgress: 0
            });
          }, 1e3)), L(), ye;
        } catch (ne) {
          throw console.error("[Storyboard] ??????????:", ne), N && clearInterval(N), E.id && j && j(I, E.id, {
            status: "draft",
            generatingProgress: 0
          }), ne;
        }
      }, [t, n, r, i]);
    return {
      importShotsFromAnalysis: p,
      updateShot: m,
      addEmptyShot: b,
      deleteShot: v,
      generateSingleShot: w,
      startVideoPolling: _,
      storyboardTaskMapRef: u,
      generateFromScript: k,
      generateFromScriptForChart: A,
      splitImageToShots: S,
      generateSequenceFromShot: C
    };
  },
  qbi = ".connector, .node-output-connector-hit, .node-input-connector-hit, .input-point";

function _cr(e) {
  return e.closest(qbi) != null;
}

function Kbi(e) {
  return e.tagName === "INPUT" || e.tagName === "TEXTAREA" || e.tagName === "SELECT" || e.tagName === "BUTTON" || e.isContentEditable || e.closest("input, textarea, select, button") != null;
}

function H_t(e) {
  return e.closest('input, textarea, select, button, [contenteditable="true"]') != null;
}

function Qbi(e) {
  return e.tagName === "TEXTAREA" || e.tagName === "INPUT" || e.isContentEditable || e.closest('textarea, input, [contenteditable="true"]') != null;
}

function Ybi(e) {
  return H_t(e) || e.closest("[data-focus-edit-overlay] button") != null || _cr(e);
}

function Xbi(e) {
  return e.closest('input, textarea, select, button, [contenteditable="true"], [data-focus-edit-overlay] button, .connector, .node-output-connector-hit, .node-input-connector-hit, .input-point, [data-gen-prompt-panel], [data-gen-prompt-panel-host], [data-gen-model-overlay-root], [data-gen-model-overlay-panel]') != null;
}

function Jbi(e) {
  return e.closest("[data-free-split-modal], [data-grid-split-modal]") != null;
}

function Zbi(e) {
  return e.closest('.connector, .node-output-connector-hit, .node-input-connector-hit, .input-point, input, textarea, select, button, [contenteditable="true"], [data-gen-prompt-panel], [data-gen-prompt-panel-host]') != null;
}

function evi(e) {
  return e.closest(".node-dropdown-menu, [data-gen-node-portal-dropdown]") != null || typeof HTMLInputElement < "u" && e instanceof HTMLInputElement && e.type === "range" || e.closest('input[type="range"]') != null;
}

function tvi(e) {
  return e.closest("[data-global-perspective-viewer]") != null;
}

function nvi(e) {
  return e.closest("[data-crop-select-overlay]") != null;
}

function rvi(e) {
  return e.closest('[data-marker-layer], [data-marker-mode="true"]') != null;
}

function avi(e) {
  return e.closest("[data-image-reorder-thumb]") != null;
}

function ivi(e) {
  return e.closest("[data-audio-strip-interactive]") != null;
}

function ovi(e) {
  return e.closest("[data-video-timeline-interactive], [data-video-timeline-workspace]") != null;
}

function svi(e) {
  return e.closest("[data-audio-strip-waveform]") != null;
}

function lvi(e) {
  return e.closest("[data-table-resize-handle]") != null;
}

function cvi(e) {
  return e.closest("[data-table-editor-controls], [data-table-editor-toolbar]") != null;
}

function dvi(e) {
  return e.closest("[data-edit-image-layer-move], [data-edit-image-move-surface]") != null;
}

function kcr(e) {
  return e.closest("[data-node-name-label]") != null;
}

function _ln(e) {
  return e.closest("[data-compact-gen-preview]") != null;
}

function kln(e) {
  return e.closest("[data-simple-video-controls], [data-compact-result-expand]") != null;
}

const uvi = ["[data-one-click-layer-panel]", "[data-layer-split-panel]", "[data-layer-split-submenu]", "[data-portrait-texture-panel]", "[data-mood-adjust-panel]", "[data-color-adjust-panel]", "[data-edit-image-bottom-panel]", "[data-edit-image-tools-toolbar]", "[data-edit-image-layers-panel]", "[data-eraser-tool-panel]", "[data-expand-toolbar]", "[data-move-object-panel]", "[data-text-edit-panel-root]", "[data-input-image-tools-menu]", "[data-gen-media-tools-menu]", "[data-model-select-area]", ".sketch-toolbar", ".node-dropdown-menu"].join(", ");

function TUe(e) {
  return e.closest(uvi) != null;
}

function hvi(e) {
  return e.closest("[data-text-edit-panel-root]") != null;
}

function pvi(e) {
  return e.closest('button[title="下载音频"]') != null || e.closest('button[title*="下载"]') != null || e.closest(".audio-player-download") != null || e.closest("[data-download-button]") != null;
}

function mvi(e, t) {
  return t === "gen-speech" && e.closest("[data-gen-speech-preview-overlay]") != null;
}

function fvi(e, t) {
  return t === "gen-music" && e.closest("[data-gen-music-preview-overlay]") != null;
}

function Acr(e, t) {
  if (t !== "text-node") return !1;
  if (e.closest("[data-text-node-drag-overlay]")) return !0;
  const n = e.closest('textarea[data-node-type="text-node"]');
  return n instanceof HTMLTextAreaElement ? n.getAttribute("data-node-text-editing") !== "1" : !1;
}

function gvi(e, t) {
  const n = document.elementFromPoint(e, t);
  if (!n) return !1;
  const r = n.closest("textarea");
  if (r instanceof HTMLTextAreaElement && r.selectionStart !== r.selectionEnd) return !0;
  const a = n.closest("input");
  if (a instanceof HTMLInputElement && ["text", "search", "url", "tel", "email", "password", ""].includes(a.type || "text") && typeof a.selectionStart == "number" && typeof a.selectionEnd == "number" && a.selectionStart !== a.selectionEnd) return !0;
  const i = typeof document.getSelection == "function" ? document.getSelection() : null;
  if (i && !i.isCollapsed && i.rangeCount > 0) {
    const o = n.closest('[contenteditable="true"]');
    if (o && i.anchorNode && o.contains(i.anchorNode)) return !0;
  }
  return !1;
}

function Aln(e) {
  var n;
  const t = new Set();
  if (!(e != null && e.length)) return t;
  for (const r of e) if (r.collapsed && ((n = r.nodeIds) != null && n.length)) for (const a of r.nodeIds) t.add(a);
  return t;
}

const yvi = !0,
  bvi = 160;

let oje = !1,
  _te = null,
  Hre = null,
  W_t = !1;

const q_t = new Set(),
  K_t = new Set();

function f$() {
  return oje;
}

function Scr(e) {
  return q_t.add(e), () => {
    q_t.delete(e);
  };
}

function bJe(e) {
  return K_t.add(e), () => {
    K_t.delete(e);
  };
}

function vvi(e) {
  return typeof requestAnimationFrame == "function" ? (W_t = !1, requestAnimationFrame(e)) : (W_t = !0, setTimeout(e, 16));
}

function wvi() {
  Hre != null && (W_t ? clearTimeout(Hre) : cancelAnimationFrame(Hre), Hre = null);
}

function Sln(e) {
  for (const t of [...e]) try {
    t();
  } catch (n) {
    console.error("[canvasWindowResize] listener error:", n);
  }
}

function tFt() {
  oje = !0, wvi(), _te != null && clearTimeout(_te), _te = setTimeout(() => {
    _te = null, Sln(q_t), !(!oje || _te != null) && (Hre = vvi(() => {
      Hre = null, _te == null && (oje = !1, Sln(K_t));
    }));
  }, bvi);
}

let Icr = null;

function Iln(e) {
  Icr = e;
}

function hMe() {
  return Icr;
}

const Cln = 6144,
  nFt = .5,
  Eln = 280;

function xvi(e, t) {
  const n = new Set(e);
  for (const a of t) n.has(a) || t.delete(a);
  const r = [];
  for (const a of e) t.has(a) || r.push(a);
  return r;
}

function Tln(e) {
  return 1 - (1 - e) * (1 - e);
}

function _vi(e, t, n, r = nFt) {
  const a = e.zoom > 0 ? e.zoom : 1,
    i = t / a,
    o = n / a,
    s = -e.x / a - i * r,
    l = -e.y / a - o * r,
    d = i * (1 + r * 2),
    u = o * (1 + r * 2);
  return {
    viewX: e.x,
    viewY: e.y,
    zoom: a,
    viewportWidth: t,
    viewportHeight: n,
    worldLeft: s,
    worldTop: l,
    rectW: d,
    rectH: u
  };
}

function kvi(e) {
  return e.layerHandoff || !e.interacting ? !1 : e.zooming ? !0 : !e.nodeMovement;
}

function Avi(e, t) {
  if (!e) return !1;
  for (const n of e.staticIds) if (t.visualIds.has(n) && !t.staticIds.has(n)) return !0;
  for (const n of t.staticIds) if (e.visualIds.has(n) && !e.staticIds.has(n)) return !0;
  return !1;
}

function Ccr(e, t, n, r = nFt) {
  return t <= e.viewportWidth * (1 + r) + .5 && n <= e.viewportHeight * (1 + r) + .5;
}

function Svi(e, t, n, r, a = nFt) {
  if (!e) return !0;
  const i = t.zoom > 0 ? t.zoom : 1;
  if (Math.abs(e.zoom - i) > 1e-6 || !Ccr(e, n, r, a)) return !0;
  const o = n * (a / 2),
    s = r * (a / 2);
  return Math.abs(t.x - e.viewX) > o || Math.abs(t.y - e.viewY) > s;
}

function Mln(e, t = {
  x: e.viewX,
  y: e.viewY,
  zoom: e.zoom
}) {
  const n = e.zoom > 0 ? e.zoom : 1,
    r = t.zoom > 0 ? t.zoom : n,
    a = e.worldLeft * r + t.x,
    i = e.worldTop * r + t.y,
    o = r / n,
    s = `translate(${a}px, ${i}px)`;
  return {
    cssWidth: e.rectW * n,
    cssHeight: e.rectH * n,
    transform: Math.abs(o - 1) < 1e-6 ? s : `${s} scale(${o})`
  };
}

function Ivi(e, t = typeof globalThis.devicePixelRatio == "number" ? globalThis.devicePixelRatio : 1) {
  const n = Math.min(Number.isFinite(t) && t > 0 ? t : 1, 2);
  let r = e.zoom * n,
    a = e.rectW * r,
    i = e.rectH * r;
  const o = Math.max(a, i);
  return o > Cln && (r *= Cln / o, a = e.rectW * r, i = e.rectH * r), {
    sx: r,
    sy: r,
    internalW: Math.max(1, Math.round(a)),
    internalH: Math.max(1, Math.round(i))
  };
}

function Cvi(e, t, n, r, a, i, o, s, l, d, u, h) {
  let p = "",
    m = "",
    f = "",
    y = 0,
    b = 0,
    v = 0;
  const _ = [];
  for (const w of e) {
    const k = t.get(w.from),
      A = t.get(w.to);
    if (!k || !A) continue;
    const S = h3(w, w.from, s, l, "output"),
      C = h3(w, w.to, s, l, "input"),
      {
        pathD: I,
        x0: E,
        y0: M,
        x1: T,
        y1: P,
        x2: R,
        y2: j,
        x3: B,
        y3: F
      } = Xmt(k, A, 0, 0, S ?? {
        x: k.x + k.width,
        y: k.y + k.height / 2
      }, C ?? {
        x: A.x,
        y: A.y + A.height / 2
      }, n, o, r.get(w.to) ?? 1, a.get(w.from) ?? 1, i.get(w.from) ?? 1, w.from, w.to, d == null ? void 0 : d.has(w.id));
    _.push(bLr(w.id, E, M, T, P, R, j, B, F)), u != null && u.has(w.id) ? (m += I, b++) : h != null && h.has(w.id) ? (f += I, v++) : (p += I, y++);
  }
  return {
    idle: y > 0 ? new Path2D(p) : null,
    highlight: b > 0 ? new Path2D(m) : null,
    entering: v > 0 ? new Path2D(f) : null,
    hitIndex: vLr(_)
  };
}

function Pln(e, t, n, r, a, i, o, s = 1) {
  const {
    sx: l,
    sy: d,
    internalW: u,
    internalH: h
  } = Ivi(n);
  e.width !== u && (e.width = u), e.height !== h && (e.height = h);
  const p = e.getContext("2d");
  return p ? (p.clearRect(0, 0, u, h), p.save(), p.setTransform(l, 0, 0, d, -n.worldLeft * l, -n.worldTop * d), p.strokeStyle = r, p.lineWidth = i, p.lineCap = "round", t.idle && (p.strokeStyle = r, p.globalAlpha = o, p.stroke(t.idle)), t.entering && s > 0 && (p.strokeStyle = r, p.globalAlpha = o * s, p.stroke(t.entering)), t.highlight && (p.strokeStyle = a, p.globalAlpha = 1, p.stroke(t.highlight)), p.restore(), {
    sx: l,
    sy: d
  }) : {
    sx: l,
    sy: d
  };
}

const Evi = ({
  connections: e,
  allConnections: t,
  nodesGeometryMap: n,
  view: r,
  viewportWidth: a,
  viewportHeight: i,
  isDark: o,
  connectionLineStrokeWidth: s = jj,
  connectionLineOpacityPercent: l = 100,
  connectionLineColor: d,
  collectionEndpoints: u,
  intraGroupConnectionIds: h,
  forceStraightConnectionIds: p,
  highlightConnectionIds: m,
  singleNodeFocusActive: f = !1,
  skipFocusReveal: y = !1,
  onSelectConnection: b,
  onDeleteConnection: v,
  connectionHitWidth: _
}) => {
  const w = g.useRef(null),
    k = g.useRef(null),
    [A, S] = g.useState(null);
  g.useLayoutEffect(() => {
    S(document.getElementById("canvas-static-connections-host"));
  }, []), g.useEffect(() => (cHt(re => {
    const fe = w.current,
      ye = k.current;
    if (!fe || !ye || fe.style.display === "none") return;
    const ie = Mln(ye, re);
    fe.style.transform !== ie.transform && (fe.style.transform = ie.transform);
  }), () => cHt(null)), []);
  const C = g.useRef(f),
    I = g.useRef(!1),
    E = g.useRef(null),
    [M, T] = g.useState(r.zoom > 0 ? r.zoom : 1),
    P = g.useRef(null),
    R = g.useRef(!1),
    j = g.useRef(!1),
    [B, F] = g.useState(0),
    N = g.useRef(null),
    G = g.useRef(!1),
    z = g.useRef(null),
    V = g.useRef(new Set()),
    O = g.useRef(0),
    L = g.useRef(null),
    [D, U] = g.useState(() => new Set()),
    H = g.useMemo(() => ({
      staticIds: new Set(e.map(re => re.id)),
      visualIds: new Set(t.map(re => re.id))
    }), [e, t]);
  g.useEffect(() => {
    const re = $Ve(() => {
        F(ye => ye + 1);
      }),
      fe = bJe(() => {
        F(ye => ye + 1);
      });
    return () => {
      re(), fe();
    };
  }, []);
  const Y = g.useCallback((re, fe, ye) => {
    const ie = w.current,
      ae = P.current;
    if (!ie || !ae || ie.style.display === "none") return null;
    const be = ae.paths.hitIndex ?? gLr;
    return _Lr(be, re, fe, yLr(ye, _));
  }, [_]);
  g.useEffect(() => (Iln({
    hitTestWorld: Y,
    select: re => b == null ? void 0 : b(re),
    delete: re => v == null ? void 0 : v(re)
  }), () => Iln(null)), [Y, b, v]);
  const K = g.useMemo(() => jEt(t), [t]),
    W = g.useMemo(() => DEt(t), [t]),
    Q = g.useMemo(() => LEt(t), [t]),
    q = g.useSyncExternalStore(BTn, Emt, Emt),
    ne = g.useMemo(() => {
      const re = z8n(q ?? s);
      return N5e(re);
    }, [s, q, M]),
    de = g.useMemo(() => G8n(o, yWe(l)), [o, l]),
    le = Qmt(o, "idle", d),
    J = Qmt(o, "selected", d);
  g.useLayoutEffect(() => {
    const re = w.current,
      fe = C.current;
    if (C.current = f, f) {
      I.current = !1, E.current != null && (cancelAnimationFrame(E.current), E.current = null), !G.current && re && re.style.display !== "none" && re.style.opacity !== "0" && (re.style.transition = "none", re.style.opacity = "1");
      return;
    }
    fe && !y && (I.current = !0), N.current != null && (window.clearTimeout(N.current), N.current = null), G.current = !1;
  }, [f, y]), g.useLayoutEffect(() => () => {
    E.current != null && cancelAnimationFrame(E.current), N.current != null && window.clearTimeout(N.current), z.current != null && (cancelAnimationFrame(z.current), z.current = null), L.current != null && (cancelAnimationFrame(L.current), L.current = null);
  }, []);
  const pe = g.useMemo(() => Cvi(e, n, M, K, W, Q, t.length, u, h, p, m, D), [e, n, M, K, W, Q, t.length, u, h, p, m, D]);
  g.useLayoutEffect(() => {
    var me;
    const re = w.current;
    if (!re) return;
    if (f && !y && !pe.idle && !pe.highlight && !pe.entering) {
      !G.current && re.style.display !== "none" && re.style.opacity !== "0" && (G.current = !0, re.style.transition = "opacity 420ms cubic-bezier(0.22, 1, 0.36, 1)", re.style.opacity = "0", N.current = window.setTimeout(() => {
        N.current = null, G.current = !1, re.style.display = "none";
      }, 460));
      return;
    }
    if ((G.current || N.current != null) && (N.current != null && (window.clearTimeout(N.current), N.current = null), G.current = !1, re.style.transition = "none", re.style.opacity = "1"), !pe.idle && !pe.highlight && !pe.entering) {
      re.style.display = "none", k.current = null, P.current = null;
      return;
    }
    re.style.display = "block";
    const fe = jl() || Rl() || Yi(),
      ye = Avi(((me = P.current) == null ? void 0 : me.layerSnapshot) ?? null, H),
      ie = U4n() || qE().size > 0,
      ae = kvi({
        interacting: fe,
        zooming: Rl(),
        nodeMovement: ie,
        layerHandoff: ye
      });
    if (ae && Rl()) return;
    if (ae) {
      R.current = !0, j.current = !0;
      return;
    }
    if (!ye && !ie && !fe && j.current) {
      j.current = !1, z.current == null && (z.current = requestAnimationFrame(() => {
        z.current = null, F(Ae => Ae + 1);
      }));
      return;
    }
    const be = r.zoom > 0 ? r.zoom : 1;
    if (!fe && M !== be) {
      T(be);
      return;
    }
    if (!ye && f$()) {
      R.current = !0, j.current = !0;
      return;
    }
    const Ee = Svi(k.current, r, a, i),
      xe = !!k.current && !Ccr(k.current, a, i),
      he = !fe && !!k.current && (k.current.viewX !== r.x || k.current.viewY !== r.y || Math.abs(k.current.zoom - (r.zoom > 0 ? r.zoom : 1)) > 1e-6 || xe),
      ue = !k.current || Ee || he ? _vi(r, a, i) : k.current,
      ge = P.current,
      _e = !!(ge && ge.paths === pe && ge.strokeColor === le && ge.highlightStrokeColor === J && ge.strokeWidth === ne.main && ge.idleOpacity === de),
      ke = !!(ge && ge.worldLeft === ue.worldLeft && ge.worldTop === ue.worldTop && ge.rectW === ue.rectW && ge.rectH === ue.rectH && ge.zoom === ue.zoom);
    if (!R.current && _e && ke && (D.size === 0 || L.current != null)) return;
    if (!ye && !ie && ke && !fe && !I.current && !R.current) {
      R.current = !0, z.current == null && (z.current = requestAnimationFrame(() => {
        z.current = null, F(Ae => Ae + 1);
      }));
      return;
    }
    R.current = !1, j.current = !1;
    let ve = 1;
    if (!fe && D.size > 0) {
      const Ae = Math.min(1, (performance.now() - O.current) / Eln);
      ve = Tln(Ae);
    }
    const Te = Mln(ue, r);
    re.style.width = `${Te.cssWidth}px`, re.style.height = `${Te.cssHeight}px`, re.style.transform = Te.transform;
    const Ne = Pln(re, pe, ue, le, J, ne.main, de, ve);
    if (I.current && (I.current = !1, fe ? (re.style.transition = "none", re.style.opacity = "1") : (E.current != null && cancelAnimationFrame(E.current), re.style.transition = "none", re.style.opacity = "0", re.offsetWidth, E.current = requestAnimationFrame(() => {
      E.current = null, re.style.transition = "opacity 420ms cubic-bezier(0.22, 1, 0.36, 1)", re.style.opacity = "1";
    }))), k.current = ue, P.current = {
      paths: pe,
      layerSnapshot: H,
      strokeColor: le,
      highlightStrokeColor: J,
      strokeWidth: ne.main,
      idleOpacity: de,
      worldLeft: ue.worldLeft,
      worldTop: ue.worldTop,
      rectW: ue.rectW,
      rectH: ue.rectH,
      zoom: ue.zoom,
      sx: Ne.sx,
      sy: Ne.sy
    }, !fe && D.size > 0 && ve < 1) {
      const Ae = D,
        Fe = Me => {
          const Re = w.current,
            $e = P.current,
            rt = k.current;
          if (!Re || !$e || !rt) {
            L.current = null;
            return;
          }
          if (jl() || Rl() || Yi()) {
            L.current = null;
            for (const ze of Ae) V.current.add(ze);
            R.current = !0, j.current = !0;
            return;
          }
          const nt = Math.min(1, (Me - O.current) / Eln);
          if (Pln(Re, $e.paths, rt, $e.strokeColor, $e.highlightStrokeColor, $e.strokeWidth, $e.idleOpacity, Tln(nt)), nt < 1) {
            L.current = requestAnimationFrame(Fe);
            return;
          }
          L.current = null;
          for (const ze of Ae) V.current.add(ze);
          U(new Set());
        };
      L.current != null && cancelAnimationFrame(L.current), L.current = requestAnimationFrame(Fe);
    }
  }, [pe, H, M, r.x, r.y, r.zoom, a, i, le, J, ne.main, de, f, B, D]);
  const ce = e.map(re => re.id),
    we = xvi(ce, V.current);
  if (jl() || Rl() || Yi()) {
    for (const re of ce) V.current.add(re);
    L.current != null && (cancelAnimationFrame(L.current), L.current = null), D.size > 0 && U(new Set());
  } else if (we.length > 0) {
    let re = we.length === D.size;
    if (re) {
      for (const fe of we) if (!D.has(fe)) {
        re = !1;
        break;
      }
    }
    re || (O.current = performance.now(), U(new Set(we)));
  } else D.size > 0 && U(new Set());
  const Z = c.jsx("canvas", {
    ref: w,
    "data-static-connections-canvas": !0,
    className: "absolute pointer-events-none",
    "aria-hidden": !0,
    style: {
      display: "none",
      zIndex: 1,
      left: 0,
      top: 0,
      transformOrigin: "0 0"
    }
  });
  return A ? Da.createPortal(Z, A) : Z;
};

let uS = null;

const Q_t = new Set(),
  sje = new Map();

function Tvi() {
  Q_t.forEach(e => e());
}

function Mvi(e) {
  var t;
  (t = sje.get(e)) == null || t.forEach(n => n());
}

function Pvi(e) {
  return Q_t.add(e), () => {
    Q_t.delete(e);
  };
}

function Ecr(e, t) {
  let n = sje.get(e);
  return n || (n = new Set(), sje.set(e, n)), n.add(t), () => {
    n.delete(t), n.size === 0 && sje.delete(e);
  };
}

function Rvi(e) {
  return e.endsWith("-edit") ? e.slice(0, -5) : e.endsWith("-eraser") ? e.slice(0, -7) : e.endsWith("-compose") ? e.slice(0, -8) : e;
}

function Tcr(e, t) {
  return e === t || e === `${t}-edit` || e === `${t}-eraser` || e === `${t}-compose`;
}

function Rln(e) {
  if (!e) return [];
  const t = Rvi(e.nodeId);
  return t === e.nodeId ? [t] : [e.nodeId, t];
}

function Nvi(e, t) {
  new Set([...Rln(e), ...Rln(t)]).forEach(r => Mvi(r)), Tvi();
}

function Nln() {
  return uS;
}

function hP(e) {
  const t = typeof e == "function" ? e(uS) : e;
  if (t === uS || t && uS && t.nodeId === uS.nodeId && t.type === uS.type) return;
  const n = uS;
  uS = t, Nvi(n, t);
}

function jvi(e) {
  return !!uS && Tcr(uS.nodeId, e);
}

function Dvi(e) {
  return g.useSyncExternalStore(t => Ecr(e, t), () => uS && Tcr(uS.nodeId, e) ? uS : null, () => null);
}

function Lvi(e) {
  return g.useSyncExternalStore(t => Ecr(e, t), () => jvi(e), () => !1);
}

function Ovi() {
  return g.useSyncExternalStore(Pvi, Nln, Nln);
}

class Bvi {
  constructor() {
    On(this, "networkStatus", {
      isBusy: !1,
      activeRequests: 0,
      lastUpdateTime: Date.now()
    });
    On(this, "originalFetch", window.fetch);
    On(this, "requestMap", new Map());
    On(this, "busyThreshold", 3);
    On(this, "autoPresetEnabled", !0);
    On(this, "currentPreset", "balanced");
    On(this, "edgeUpdateThrottleId", null);
    On(this, "userManualPreset", null);
    On(this, "idleDebounceTimer", null);
    this.initNetworkMonitoring();
  }
  initNetworkMonitoring() {
    window.fetch = (...t) => {
      const n = t[0];
      let r = typeof n == "string" ? n : n instanceof Request ? n.url : "";
      if (r.startsWith("data:") && r.includes(";base64,")) {
        const s = r.replace(/;base64,\s+/, ";base64,");
        s !== r && (t = xbt(t, s), r = s);
      }
      t = HWn(t), r = VWn(t[0]);
      const a = t[1],
        i = ((a == null ? void 0 : a.method) || (t[0] instanceof Request ? t[0].method : void 0) || "GET").toUpperCase(),
        o = this.originalFetch.apply(window, t);
      return i !== "HEAD" && kjt(r) && (this.requestMap.set(o, Date.now()), this.updateNetworkStatus(), o.then(() => {
        this.requestMap.delete(o), this.updateNetworkStatus();
      }).catch(() => {
        this.requestMap.delete(o), this.updateNetworkStatus();
      })), o;
    };
  }
  updateNetworkStatus() {
    const t = this.requestMap.size,
      n = this.networkStatus.isBusy,
      r = t >= this.busyThreshold;
    this.networkStatus = {
      isBusy: r,
      activeRequests: t,
      lastUpdateTime: Date.now()
    }, n !== r && this.autoPresetEnabled && this.handleNetworkStatusChange(r);
  }
  handleNetworkStatusChange(t) {
    if (this.userManualPreset === null) if (t) this.idleDebounceTimer !== null && (clearTimeout(this.idleDebounceTimer), this.idleDebounceTimer = null), this.switchPreset("speed-first");else {
      if (this.idleDebounceTimer !== null) return;
      this.idleDebounceTimer = window.setTimeout(() => {
        this.idleDebounceTimer = null, this.switchPreset("balanced");
      }, 400);
    }
  }
  switchPreset(t, n = !1) {
    this.currentPreset !== t && (this.currentPreset = t, n || hve(t));
  }
  getNetworkStatus() {
    return {
      ...this.networkStatus
    };
  }
  setAutoPresetEnabled(t) {
    this.autoPresetEnabled = t;
  }
  switchToPreset(t) {
    this.userManualPreset = t, this.switchPreset(t, !1);
  }
  clearUserManualPreset() {
    this.userManualPreset = null;
  }
  pauseConnectionAnimations() {
    oRt().enableConnectionAnimations && hve("speed-first");
  }
  resumeConnectionAnimations() {
    this.networkStatus.isBusy || hve(this.currentPreset);
  }
  throttleEdgeUpdate(t, n = 16) {
    this.edgeUpdateThrottleId !== null && cancelAnimationFrame(this.edgeUpdateThrottleId), this.edgeUpdateThrottleId = requestAnimationFrame(() => {
      t(), this.edgeUpdateThrottleId = null;
    });
  }
  getCurrentPreset() {
    return this.currentPreset;
  }
  isConnectionAnimationsEnabled() {
    return _Fn();
  }
}

const sO = new Bvi();

function jln(e, t = BY) {
  const n = Number.isFinite(t) && t > 0 ? t : BY;
  return Math.round(e / n) * n;
}

function Fvi(e, t, n = BY) {
  return {
    x: jln(e, n),
    y: jln(t, n)
  };
}

const zvi = 8,
  Uvi = 6,
  Got = "#47AEFF";

function $vi(e) {
  return Math.max(Uvi, zvi / Math.max(e, .01));
}

function Y_t(e, t, n, r) {
  return {
    left: e,
    right: e + n,
    top: t,
    bottom: t + r,
    centerX: e + n / 2,
    centerY: t + r / 2
  };
}

function Gvi(e, t) {
  return t === "x" ? [e.left, e.centerX, e.right] : [e.top, e.centerY, e.bottom];
}

function Dln(e, t, n, r) {
  let a = e,
    i = r,
    o = null;
  const s = e + t / 2,
    l = e + t;
  for (const d of n) {
    const u = Math.abs(e - d);
    u < i && (i = u, a = d, o = d);
    const h = Math.abs(l - d);
    h < i && (i = h, a = d - t, o = d);
    const p = Math.abs(s - d);
    p < i && (i = p, a = d - t / 2, o = d);
  }
  return {
    pos: a,
    guide: o
  };
}

function Lln(e, t, n, r) {
  return Math.abs(e - n) <= r || Math.abs(e + t - n) <= r || Math.abs(e + t / 2 - n) <= r;
}

function Oln(e, t, n, r) {
  return e.filter(a => Gvi(a, t).some(i => Math.abs(i - n) <= r));
}

function Vvi(e, t, n) {
  return n === "x" ? e.right <= t.left ? {
    start: e.right,
    end: t.left
  } : t.right <= e.left ? {
    start: t.right,
    end: e.left
  } : null : e.bottom <= t.top ? {
    start: e.bottom,
    end: t.top
  } : t.bottom <= e.top ? {
    start: t.bottom,
    end: e.top
  } : null;
}

function Hvi(e, t, n) {
  let r = null,
    a = 1 / 0;
  for (const i of t) {
    const o = Vvi(e, i, n);
    if (!o) continue;
    const s = o.end - o.start;
    s < a && (a = s, r = o);
  }
  return r;
}

function Bln(e, t, n, r, a) {
  const i = Hvi(t, n, r);
  if (!i) return e;
  const o = Math.round(i.end - i.start);
  if (o <= 0) return e;
  const s = (i.start + i.end) / 2;
  return {
    ...e,
    label: String(o),
    labelX: r === "x" ? s : a,
    labelY: r === "y" ? s : a
  };
}

function Wvi(e, t, n, r, a) {
  const i = [],
    o = t.map(s => Y_t(s.x, s.y, s.width, s.height));
  if (n !== null) {
    const s = Oln(o, "x", n, a);
    let l = e.top,
      d = e.bottom;
    for (const u of s) l = Math.min(l, u.top), d = Math.max(d, u.bottom);
    i.push(Bln({
      x1: n,
      y1: l,
      x2: n,
      y2: d,
      orientation: "vertical"
    }, e, s, "y", n));
  }
  if (r !== null) {
    const s = Oln(o, "y", r, a);
    let l = e.left,
      d = e.right;
    for (const u of s) l = Math.min(l, u.left), d = Math.max(d, u.right);
    i.push(Bln({
      x1: l,
      y1: r,
      x2: d,
      y2: r,
      orientation: "horizontal"
    }, e, s, "x", r));
  }
  return i;
}

function Mcr(e, t, n, r, a, i, o = tce, s) {
  const l = (s == null ? void 0 : s.snapToCells) === !0,
    d = (s == null ? void 0 : s.snapToNodes) !== !1,
    u = s != null && s.cellSize && s.cellSize > 0 ? s.cellSize : BY;
  let h = e,
    p = t;
  if (l) {
    const S = Fvi(h, p, u);
    h = S.x, p = S.y;
  }
  if (!d) return {
    x: h,
    y: p,
    guides: []
  };
  const m = $vi(i.zoom),
    f = [],
    y = [];
  for (const S of a) {
    const C = Y_t(S.x, S.y, S.width, S.height);
    f.push(C.left, C.centerX, C.right), y.push(C.top, C.centerY, C.bottom);
  }
  const b = Dln(h, n, f, m),
    v = Dln(p, r, y, m),
    _ = b.pos,
    w = v.pos,
    k = b.guide !== null && Lln(_, n, b.guide, m) ? b.guide : null,
    A = v.guide !== null && Lln(w, r, v.guide, m) ? v.guide : null;
  return {
    x: _,
    y: w,
    guides: Wvi(Y_t(_, w, n, r), a, k, A, m)
  };
}

function qvi(e, t, n, r, a = tce, i) {
  if (e.size === 0) return {
    positions: e,
    guides: []
  };
  let o = 1 / 0,
    s = 1 / 0,
    l = -1 / 0,
    d = -1 / 0;
  for (const [v, _] of e) {
    const w = t.get(v);
    w && (o = Math.min(o, _.x), s = Math.min(s, _.y), l = Math.max(l, _.x + w.width), d = Math.max(d, _.y + w.height));
  }
  const u = l - o,
    h = d - s,
    p = [];
  for (const v of n) {
    const _ = t.get(v);
    _ && p.push(_);
  }
  const m = Mcr(o, s, u, h, p, r, a, i),
    f = m.x - o,
    y = m.y - s,
    b = new Map();
  for (const [v, _] of e) b.set(v, {
    x: _.x + f,
    y: _.y + y
  });
  return {
    positions: b,
    guides: m.guides
  };
}

const X_t = 64,
  Kvi = 340,
  Qvi = 128,
  Yvi = 1.072,
  Vot = 12,
  Hot = 14,
  Xvi = 36,
  Jvi = 520,
  Zvi = new Set(["director-3d", "three-d-studio"]),
  e1i = new Set(["image-compare", "image-tile", "global-perspective", "gen-music", "gen-speech", "gen-3d", "local-save", "doodle-canvas", "inpaint-stitch"]);

function MUe(e, t, n) {
  return Math.min(n, Math.max(t, e));
}

function t1i(e) {
  return e.type !== "gen-video" ? !1 : !!(e.settings || {}).veoFramesMode;
}

function n1i(e) {
  const t = e.settings || {},
    n = Number(t.savedNodeWidth ?? e.width ?? 260) || 260,
    r = Number(t.savedNodeHeight ?? e.height ?? 200) || 200;
  return {
    w: n,
    h: r
  };
}

function r1i(e, t, n) {
  const r = e.type === "custom-agent" ? Qvi : X_t,
    a = t1i(e),
    i = a ? Math.max(0, (GDe - t) / 2) : 0,
    o = a ? Kvi : 0,
    s = t + i * 2;
  return {
    left: e.x - r - i,
    right: e.x + t + r + i,
    top: e.y - r,
    bottom: e.y + n + r + o,
    tiltW: s,
    tiltH: n + o
  };
}

function a1i() {
  return Jvi;
}

function Pcr(e, t) {
  const n = MUe(e * Hot, -Hot, Hot);
  return {
    tiltX: MUe(-t * Vot, -Vot, Vot),
    tiltY: n
  };
}

function i1i(e, t) {
  return `scale(${Yvi}) rotateX(${e}deg) rotateY(${t}deg) translateZ(${Xvi}px)`;
}

function o1i(e, t, n, r, a, i = r, o = a) {
  const s = e.x + r / 2,
    l = e.y + o / 2,
    d = MUe((t - s) / (i / 2 + X_t), -1, 1),
    u = MUe((n - l) / (o / 2 + X_t), -1, 1);
  return Pcr(d, u);
}

function s1i(e, t, n, r) {
  return t === "left" ? {
    x: e.x,
    y: e.y + r / 2
  } : {
    x: e.x + n,
    y: e.y + r / 2
  };
}

function l1i(e, t) {
  return !(Zvi.has(e.type) || t === "from-input" && e1i.has(e.type));
}

function c1i(e, t, n, r) {
  const a = r.dragKind === "from-output" ? "left" : "right";
  let i = null,
    o = 1 / 0;
  for (const s of e) {
    if (r.excludeNodeIds.has(s.id) || !l1i(s, r.dragKind)) continue;
    const {
        w: l,
        h: d
      } = n1i(s),
      u = r1i(s, l, d);
    if (t < u.left || t > u.right || n < u.top || n > u.bottom) continue;
    const h = s1i(s, a, l, d),
      p = t - h.x,
      m = n - h.y,
      f = p * p + m * m;
    if (f < o) {
      o = f;
      const {
        tiltX: y,
        tiltY: b
      } = o1i(s, t, n, l, d, u.tiltW, u.tiltH);
      i = {
        nodeId: s.id,
        side: a,
        tiltX: y,
        tiltY: b
      };
    }
  }
  return i;
}

function Rcr(e) {
  try {
    window.dispatchEvent(new CustomEvent("nodeConnectHover", {
      detail: e
    }));
  } catch {}
}

function Ncr(e, t, n = "both") {
  try {
    window.dispatchEvent(new CustomEvent("nodeConnectionFlash", {
      detail: {
        nodeId: e,
        mode: t,
        side: n
      }
    }));
  } catch {}
}

const Fln = new Map();

function jcr(e) {
  if (typeof document > "u") return null;
  const t = Fln.get(e);
  if (t && t.isConnected) return t;
  const n = typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e,
    r = document.querySelector(`[data-node-id="${n}"] [data-connect-tilt-host]`);
  return Fln.set(e, r), r;
}

const J_t = new Map();

function Z_t(e, t, n) {
  const r = jcr(e);
  if (!r) return;
  if (r.getAttribute("data-connect-tilt-enabled") !== "true") {
    M1e(e);
    return;
  }
  const a = J_t.get(e);
  a && Math.abs(a.x - t) < .35 && Math.abs(a.y - n) < .35 || (J_t.set(e, {
    x: t,
    y: n
  }), r.setAttribute("data-connect-tilt", "on"), r.style.transformStyle = "preserve-3d", r.style.transform = i1i(t, n));
}

function M1e(e) {
  J_t.delete(e);
  const t = jcr(e);
  t && (t.removeAttribute("data-connect-tilt"), t.style.transform = "", t.style.transformStyle = "");
}

function Dcr(e) {
  M1e(e), Rcr({
    nodeId: e,
    active: !1
  });
}

function PUe(e) {
  e.current && (Dcr(e.current), e.current = null);
}

function d1i(e, t, n, r, a) {
  if (!r) {
    PUe(a);
    return;
  }
  const i = c1i(e, t, n, r);
  if (!i) {
    PUe(a);
    return;
  }
  const o = a.current !== i.nodeId;
  o && a.current && Dcr(a.current), Z_t(i.nodeId, i.tiltX, i.tiltY), o && (a.current = i.nodeId, Rcr({
    nodeId: i.nodeId,
    active: !0,
    side: i.side,
    tiltX: i.tiltX,
    tiltY: i.tiltY
  }), Ncr(i.nodeId, "hover", i.side));
}

function u1i(e, t, n, r, a) {
  const i = new Set();
  if (a) for (const o of a) i.add(o);
  if (e) return i.add(e), {
    dragKind: "from-output",
    excludeNodeIds: i
  };
  if (n != null && n.length) {
    for (const o of n) i.add(o);
    return {
      dragKind: "from-output",
      excludeNodeIds: i
    };
  }
  if (t) return i.add(t), {
    dragKind: "from-input",
    excludeNodeIds: i
  };
  if (r != null && r.length) {
    for (const o of r) i.add(o);
    return {
      dragKind: "from-input",
      excludeNodeIds: i
    };
  }
  return null;
}

const h1i = ".connecting-line, [data-multi-connecting-line], [data-pan-hit-shield]";

function p1i(e, t, n) {
  if (typeof e == "number" && typeof t == "number" && Number.isFinite(e) && Number.isFinite(t) && typeof document < "u" && typeof document.elementsFromPoint == "function") {
    for (const r of document.elementsFromPoint(e, t)) if (r instanceof Element && !r.closest(h1i)) return r;
  }
  return n instanceof Element ? n : null;
}

function m1i(e, t, n) {
  const r = e.getBoundingClientRect();
  return t >= r.left && t <= r.right && n >= r.top && n <= r.bottom;
}

function Tfe(e, t, n, r, a) {
  return !e || e !== t ? !1 : n ? !m1i(n, r, a) : !0;
}

let zln = "",
  pMe = new Map();

function Uln(e, t, n) {
  const r = `${(t == null ? void 0 : t.join(",")) ?? ""}|${(n == null ? void 0 : n.join(",")) ?? ""}`;
  r !== zln && (zln = r, pMe = new Map());
  let a = pMe.get(e) ?? null;
  return (!a || !a.isConnected) && (a = document.querySelector(`[data-multi-connecting-line="${e}"]`), a ? pMe.set(e, a) : pMe.delete(e)), a;
}

function ekt(e) {
  const {
    sourceId: t,
    targetId: n,
    multiSourceIds: r,
    multiTargetIds: a,
    worldX: i,
    worldY: o,
    getNode: s,
    groups: l,
    nodes: d,
    connectingLine: u,
    connectingLineReverse: h,
    updateConnectingLineDOM: p
  } = e;
  if (t) {
    const m = s(t);
    return !m || !u ? !1 : (p(u, m.x + m.width, m.y + m.height / 2, i, o), !0);
  }
  if (n) {
    const m = s(n);
    return !m || !h ? !1 : (p(h, m.x, m.y + m.height / 2, i, o), !0);
  }
  if (r && r.length > 0) {
    const m = UEt(r, l, d);
    if (m && u) {
      const f = l.find(b => b.id === m);
      if (!f) return !1;
      const y = R5e(f, d);
      return p(u, y.x, y.y, i, o), !0;
    }
    for (const f of r) {
      const y = s(f);
      if (!y) continue;
      const b = Uln(f, r, a);
      b && p(b, y.x + y.width, y.y + y.height / 2, i, o);
    }
    return !0;
  }
  if (a && a.length > 0) {
    for (const m of a) {
      const f = s(m);
      if (!f) continue;
      const y = Uln(m, r, a);
      y && p(y, f.x, f.y + f.height / 2, i, o);
    }
    return !0;
  }
  return !1;
}

function f1i({
  connectingSource: e,
  connectingTarget: t,
  connectingInputType: n,
  multiConnectingSourceIds: r,
  multiConnectingTargetIds: a,
  groupsRef: i,
  nodesRef: o,
  canvasRef: s,
  viewRef: l,
  mousePosRef: d,
  connectingLineRef: u,
  connectingLineReverseRef: h,
  handleCanvasMouseMoveRef: p,
  handleCanvasMouseUpRef: m,
  setContextMenu: f,
  updateConnectingLineDOM: y
}) {
  const b = g.useRef(null),
    v = g.useRef(null),
    _ = g.useRef(new Set()),
    w = g.useRef(!1),
    k = g.useRef(e),
    A = g.useRef(t),
    S = g.useRef(n),
    C = g.useRef(r),
    I = g.useRef(a),
    E = g.useRef(!1),
    M = g.useRef(0),
    T = g.useRef(!1);
  k.current = e, A.current = t, S.current = n, C.current = r, I.current = a;
  const P = g.useCallback(() => {
      M.current && (cancelAnimationFrame(M.current), M.current = 0), w.current = !1, T.current = !1, E.current = !1, k.current = null, A.current = null, C.current = null, I.current = null, f(N => N.visible && (N.sourceNodeId || N.targetNodeId || N.sourceNodeIds && N.sourceNodeIds.length > 0) ? {
        visible: !1,
        x: 0,
        y: 0
      } : N);
    }, [f]),
    R = g.useCallback(N => {
      var z;
      const G = N;
      return !!((z = G == null ? void 0 : G.closest) != null && z.call(G, "[data-connection-drop-menu]"));
    }, []),
    j = g.useCallback(N => p1i(N == null ? void 0 : N.clientX, N == null ? void 0 : N.clientY, N == null ? void 0 : N.target), []),
    B = g.useCallback((N, G, z) => {
      ekt({
        multiSourceIds: (z == null ? void 0 : z.sourceNodeIds) ?? r,
        multiTargetIds: (z == null ? void 0 : z.targetNodeIds) ?? a,
        worldX: N,
        worldY: G,
        getNode: V => o.current.find(O => O.id === V),
        groups: (i == null ? void 0 : i.current) ?? [],
        nodes: o.current,
        connectingLine: u.current,
        connectingLineReverse: h.current,
        updateConnectingLineDOM: y
      });
    }, [u, h, i, r, a, o, y]),
    F = g.useCallback((N, G, z) => {
      var L, D, U;
      const V = (L = s.current) == null ? void 0 : L.getBoundingClientRect();
      if (!V) return;
      const O = B8(N, G, {
        left: V.left,
        top: V.top,
        width: V.width,
        height: V.height
      }, l.current, s.current);
      w.current = !0, E.current = !1, T.current = !0, window.setTimeout(() => {
        T.current = !1;
      }, 450), d.current = {
        x: O.x,
        y: O.y
      }, ekt({
        sourceId: (D = z.sourceNodeIds) != null && D.length ? null : z.sourceNodeId ?? ((U = z.sourceNodeIds) == null ? void 0 : U[0]),
        targetId: z.targetNodeId,
        multiSourceIds: z.sourceNodeIds,
        worldX: O.x,
        worldY: O.y,
        getNode: H => o.current.find(Y => Y.id === H),
        groups: (i == null ? void 0 : i.current) ?? [],
        nodes: o.current,
        connectingLine: u.current,
        connectingLineReverse: h.current,
        updateConnectingLineDOM: y
      }), M.current && cancelAnimationFrame(M.current), M.current = requestAnimationFrame(() => {
        M.current = 0, w.current && f({
          visible: !0,
          x: N,
          y: G,
          worldX: O.x,
          worldY: O.y,
          sourceNodeId: z.sourceNodeId,
          targetNodeId: z.targetNodeId,
          sourceNodeIds: z.sourceNodeIds,
          ...(z.inputType && z.inputType !== "default" ? {
            inputType: z.inputType
          } : {}),
          stickyConnectionMenu: !0
        });
      });
    }, [s, u, h, i, d, o, f, y, l]);
  return g.useEffect(() => {
    !!!(e || t || r != null && r.length || a != null && a.length) && w.current && (M.current && (cancelAnimationFrame(M.current), M.current = 0), w.current = !1);
  }, [e, t, r, a]), g.useEffect(() => () => {
    M.current && (cancelAnimationFrame(M.current), M.current = 0), PUe(v);
  }, []), g.useEffect(() => {
    if (!!!(e || t || r != null && r.length || a != null && a.length)) {
      PUe(v), E.current = !1;
      return;
    }
    E.current = !w.current;
    const G = V => {
        w.current || p.current({
          clientX: V.clientX,
          clientY: V.clientY,
          buttons: "buttons" in V && V.buttons || 1
        });
      },
      z = V => {
        m.current({
          clientX: V.clientX,
          clientY: V.clientY,
          target: V.target
        });
      };
    return window.addEventListener("pointermove", G), window.addEventListener("mouseup", z), window.addEventListener("pointerup", z), window.addEventListener("pointercancel", z), () => {
      window.removeEventListener("pointermove", G), window.removeEventListener("mouseup", z), window.removeEventListener("pointerup", z), window.removeEventListener("pointercancel", z);
    };
  }, [e, t, p, m, r, a]), {
    lastConnectingClientPosRef: b,
    lastConnectHoverNodeIdRef: v,
    duplicateBlockedNodeIdsRef: _,
    connectionMenuStickyRef: w,
    connectingSourceRef: k,
    connectingTargetRef: A,
    connectingInputTypeRef: S,
    multiConnectingSourceIdsRef: C,
    multiConnectingTargetIdsRef: I,
    connectingWireDraggingRef: E,
    suppressConnectionMenuDismissClickRef: T,
    clearConnectionDropMenuState: P,
    isConnectionDropMenuHit: R,
    resolveEventTargetElement: j,
    updateMultiConnectingPreviewTips: B,
    stickConnectionDropMenu: F
  };
}

const g1i = new Set(["input-image", "video-input", "preview", "canvas-node", "rh-app", "gen-image", "gen-video"]);

function y1i(e) {
  var r, a;
  if (!e) return !1;
  const t = (r = e.settings) == null ? void 0 : r.mediaType,
    n = Array.isArray((a = e.settings) == null ? void 0 : a.generatedImages) && e.settings.generatedImages.length > 0;
  return g1i.has(e.type) || t === "image" || t === "video" || t === "audio" || n;
}

function Lcr(e, t) {
  return y1i(e) ? "default" : !t || t === "default" ? "agent_user_input" : t;
}

const b1i = new Set(["input-image", "gen-image", "preview"]);

function tkt(e) {
  return e ? !!(b1i.has(e.type) || e.type === "gen-video") : !1;
}

function pP(e) {
  if (!e || e.type !== "gen-video") return !1;
  const t = e.settings,
    n = String((t == null ? void 0 : t.model) || "");
  return !(t != null && t.veoFramesMode) || !J2(n) ? !1 : kp(n) ? dce(t) === "t2v" : Gp(n) ? HY(t) === "t2v" : Ap(n) ? uce(t) === "t2v" : !(Yc(n) && (t != null && t.h3MaxFalTurbo || t != null && t.h3MaxFalDirector || t != null && t.h3MaxFalCameraControls || t != null && t.h3MaxFalLipSync));
}

function Wot(e) {
  var i, o, s, l;
  const t = e.preferred || "default";
  if (t === "veo_start" || t === "veo_end" || t !== "default" && t) return t;
  if (e.sourceNode && !tkt(e.sourceNode) || !pP(e.targetNode)) return t || "default";
  const n = e.targetNode.id,
    r = e.connections.some(d => d.to === n && d.inputType === "veo_start"),
    a = e.connections.some(d => d.to === n && d.inputType === "veo_end");
  return r ? a ? Cu(String((o = (i = e.targetNode) == null ? void 0 : i.settings) == null ? void 0 : o.model)) && ((l = (s = e.targetNode) == null ? void 0 : s.settings) != null && l.metasoMixedReferences) ? "default" : "veo_start" : "veo_end" : "veo_start";
}

function v1i(e, t, n) {
  const r = e.some(u => u.to === t && u.inputType === "veo_start"),
    a = e.some(u => u.to === t && u.inputType === "veo_end");
  if (r && a) {
    const u = new Set(e.filter(h => h.to === t && (h.inputType === "veo_start" || h.inputType === "veo_end")).map(h => h.from));
    return e.filter(h => {
      if (h.to !== t || h.inputType && h.inputType !== "default") return !0;
      const p = n.find(m => m.id === h.from);
      return tkt(p) ? !u.has(h.from) : !0;
    });
  }
  const i = e.filter(u => u.to !== t || u.inputType && u.inputType !== "default" ? !1 : tkt(n.find(h => h.id === u.from)));
  if (i.length === 0) return e;
  const o = [];
  if (!r && i[0] && o.push(i[0]), !a && i[r ? 0 : 1]) {
    const u = i[r ? 0 : 1];
    u && u !== o[0] && o.push(u);
  }
  if (o.length === 0) return e;
  const s = new Set(o.map(u => u.id));
  let l = 0;
  const d = [];
  return r || d.push("veo_start"), a || d.push("veo_end"), e.map(u => {
    if (!s.has(u.id)) return u;
    const h = d[l++];
    return h ? {
      ...u,
      inputType: h
    } : u;
  });
}

function w1i(e, t) {
  return e.map(n => {
    if (n.to !== t || n.inputType !== "veo_start" && n.inputType !== "veo_end") return n;
    const {
      inputType: r,
      ...a
    } = n;
    return a;
  });
}

function x1i(e, t) {
  return e.map(n => n.to !== t ? n : n.inputType === "veo_start" ? {
    ...n,
    inputType: "veo_end"
  } : n.inputType === "veo_end" ? {
    ...n,
    inputType: "veo_start"
  } : n);
}

function RUe(e, t) {
  if (!(e != null && e.length)) return "|";
  let n = "",
    r = "";
  for (const a of e) a.to === t && (a.inputType === "veo_start" ? n = String(a.from) : a.inputType === "veo_end" && (r = String(a.from)));
  return `${n}|${r}`;
}

function mMe(e, t, n, r = "default") {
  return t.filter(a => !kv(e, a, n, r));
}

function _1i({
  connectingSource: e,
  connectingTarget: t,
  connectingInputType: n,
  multiConnectingSourceIds: r,
  multiConnectingTargetIds: a,
  canvasRef: i,
  nodesRef: o,
  nodeMapRef: s,
  connectionsRef: l,
  groupsRef: d,
  isDraggingSelectionBoundsRef: u,
  lastConnectingClientPosRef: h,
  connectionMenuStickyRef: p,
  connectingSourceRef: m,
  multiConnectingSourceIdsRef: f,
  connectingWireDraggingRef: y,
  suppressConnectionMenuDismissClickRef: b,
  resolveEventTargetElement: v,
  stickConnectionDropMenu: _,
  clearConnectionDropMenuState: w,
  setNodes: k,
  setConnections: A,
  setConnectingSource: S,
  setConnectingTarget: C,
  setConnectingInputType: I,
  setMultiConnectingSourceIds: E,
  setMultiConnectingTargetIds: M,
  onAlignmentGuidesChange: T,
  generateId: P
}) {
  const R = g.useCallback((V, O) => {
      if (typeof document > "u" || typeof document.elementsFromPoint != "function") return null;
      const L = document.elementsFromPoint(V, O);
      for (const D of L) {
        if (!(D instanceof HTMLElement)) continue;
        const U = D.closest("[data-agent-wire-drop-row]"),
          H = D.closest("[data-input-type]"),
          Y = D.closest("[data-agent-wire-drop-section]"),
          K = U || H || Y,
          W = K == null ? void 0 : K.closest(".node-wrapper"),
          Q = W == null ? void 0 : W.getAttribute("data-node-id"),
          q = (U == null ? void 0 : U.getAttribute("data-agent-wire-drop-row")) || (H == null ? void 0 : H.getAttribute("data-input-type")) || (Y == null ? void 0 : Y.getAttribute("data-agent-wire-drop-section")) || null;
        if (Q && q) return {
          nodeId: Q,
          inputType: q
        };
      }
      for (const D of L) {
        if (!(D instanceof HTMLElement)) continue;
        const U = D.closest('.node-wrapper[data-node-type="custom-agent"]'),
          H = U == null ? void 0 : U.getAttribute("data-node-id");
        if (H) return {
          nodeId: H,
          inputType: "default"
        };
      }
      return null;
    }, []),
    j = g.useCallback((V, O, L) => {
      const D = R(O, L);
      if (!D || D.nodeId === V) return !1;
      const U = s.current.get(D.nodeId),
        H = s.current.get(V);
      let Y = D.inputType || "default";
      (U == null ? void 0 : U.type) === "custom-agent" && (Y = Lcr(H, Y)), (U == null ? void 0 : U.type) === "gen-video" && (Y === "default" || !Y) && (Y = Wot({
        targetNode: U,
        sourceNode: H,
        connections: l.current || [],
        preferred: Y
      })), Y !== "default" && !(Y === "agent_user_input" || Y === "agent_meta_prompt") && A(Q => Q.filter(q => !(q.to === D.nodeId && (q.inputType || "default") === Y)));
      const W = {
        id: P(),
        from: V,
        to: D.nodeId,
        ...(Y !== "default" ? {
          inputType: Y
        } : {})
      };
      return A(Q => kv(Q, V, D.nodeId, Y) ? Q : [...Q, W]), (U == null ? void 0 : U.type) === "preview" && k(Q => Q.map(q => q.id === V ? {
        ...q,
        settings: {
          ...(q.settings || {}),
          selectedPreviewId: D.nodeId
        }
      } : q)), !0;
    }, [l, P, R, s, A, k]),
    B = g.useCallback((V, O) => {
      var L, D, U, H;
      if (r && r.length > 0 && V && y.current && !p.current && !(u != null && u.current)) {
        const Y = h.current ?? {
            x: V.clientX,
            y: V.clientY
          },
          K = v({
            target: V.target,
            clientX: Y.x,
            clientY: Y.y
          }),
          W = ((L = K == null ? void 0 : K.closest) == null ? void 0 : L.call(K, ".node-wrapper")) ?? null,
          Q = W == null ? void 0 : W.getAttribute("data-node-id"),
          q = !!Q && r.includes(Q) && Tfe(Q, Q, W, Y.x, Y.y);
        if (W && !q) {
          const ne = W.getAttribute("data-node-id");
          if (console.log(`[handleCanvasMouseUp] multi-connect to node: ${ne}`), ne) {
            const de = r.filter(le => le !== ne);
            if (de.length > 0) {
              const le = l.current || [],
                J = UEt(r, (d == null ? void 0 : d.current) ?? [], o.current);
              if (J ? !kv(le, de[0], ne, "default") : mMe(le, de, ne).length > 0) {
                if (J) {
                  const ce = {
                    id: P(),
                    from: de[0],
                    to: ne,
                    fromGroupId: J,
                    fromGroupNodeIds: de
                  };
                  A(we => kv(we, de[0], ne, "default") ? we : [...we, ce]);
                } else A(ce => {
                  const we = mMe(ce, de, ne).map(X => ({
                    id: P(),
                    from: X,
                    to: ne
                  }));
                  return we.length ? [...ce, ...we] : ce;
                });
              } else {
                const ce = h.current ?? {
                  x: V.clientX,
                  y: V.clientY
                };
                if (_(ce.x, ce.y, {
                  sourceNodeId: r[0],
                  sourceNodeIds: r
                }), !O) return !0;
              }
            }
          }
          p.current || (E == null || E(null), M == null || M(null));
        } else {
          console.log("[handleCanvasMouseUp] multi-connect to blank, sticking menu");
          const ne = h.current ?? {
            x: V.clientX,
            y: V.clientY
          };
          _(ne.x, ne.y, {
            sourceNodeId: r[0],
            sourceNodeIds: r
          });
        }
        if (!O) return !0;
      }
      if (e && V && !p.current && y.current && !(u != null && u.current)) {
        const Y = h.current ?? {
            x: V.clientX,
            y: V.clientY
          },
          K = v({
            target: V.target,
            clientX: Y.x,
            clientY: Y.y
          });
        if (V.__handledByCustomAgent) {
          if (!O) return !0;
        } else {
          const W = ((D = K == null ? void 0 : K.closest) == null ? void 0 : D.call(K, "[data-input-type]")) ?? null;
          if (!W && j(e, Y.x, Y.y)) {
            if (w(), S(null), h.current = null, !O) return !0;
          } else if (!W) {
            const Q = ((U = K == null ? void 0 : K.closest) == null ? void 0 : U.call(K, ".node-wrapper")) ?? null;
            if (Q) {
              const q = Q.getAttribute("data-node-id");
              if (Tfe(q, e, Q, Y.x, Y.y)) _(Y.x, Y.y, {
                sourceNodeId: e
              });else if (q && q !== e) {
                const ne = s.current.get(q);
                if ((ne == null ? void 0 : ne.type) !== "custom-agent" && ne) {
                  const de = Wot({
                    targetNode: ne,
                    sourceNode: s.current.get(e),
                    connections: l.current || [],
                    preferred: "default"
                  });
                  if (kv(l.current || [], e, q, de)) _(Y.x, Y.y, {
                    sourceNodeId: e
                  });else {
                    de !== "default" && A(J => J.filter(pe => !(pe.to === q && (pe.inputType || "default") === de)));
                    const le = {
                      id: P(),
                      from: e,
                      to: q,
                      ...(de !== "default" ? {
                        inputType: de
                      } : {})
                    };
                    A(J => [...J, le]), ne.type === "preview" && k(J => J.map(pe => pe.id === e ? {
                      ...pe,
                      settings: {
                        ...(pe.settings || {}),
                        selectedPreviewId: q
                      }
                    } : pe)), w(), S(null);
                  }
                }
              } else {
                const ne = q ? s.current.get(q) : void 0;
                (ne == null ? void 0 : ne.type) !== "custom-agent" && (w(), S(null));
              }
            } else {
              const q = h.current ?? {
                x: V.clientX,
                y: V.clientY
              };
              _(q.x, q.y, {
                sourceNodeId: e
              });
            }
            if (!O) return !0;
          }
        }
      }
      if (t && V && !p.current && y.current && !(u != null && u.current)) {
        const Y = h.current ?? {
            x: V.clientX,
            y: V.clientY
          },
          K = v({
            target: V.target,
            clientX: Y.x,
            clientY: Y.y
          }),
          W = ((H = K == null ? void 0 : K.closest) == null ? void 0 : H.call(K, ".node-wrapper")) ?? null;
        if (W) {
          const Q = W.getAttribute("data-node-id");
          if (Tfe(Q, t, W, Y.x, Y.y)) _(Y.x, Y.y, {
            targetNodeId: t,
            ...(n && n !== "default" ? {
              inputType: n
            } : {})
          });else if (Q && Q !== t) {
            const q = n === "agent_user_input" || n === "agent_meta_prompt";
            if (kv(l.current || [], Q, t, n)) {
              const ne = h.current ?? {
                x: V.clientX,
                y: V.clientY
              };
              _(ne.x, ne.y, {
                targetNodeId: t,
                ...(n && n !== "default" ? {
                  inputType: n
                } : {})
              });
            } else {
              n && n !== "default" && !q && A(le => le.filter(J => !(J.to === t && (J.inputType || "default") === n)));
              const ne = {
                id: P(),
                from: Q,
                to: t,
                ...(n && n !== "default" ? {
                  inputType: n
                } : {})
              };
              A(le => [...le, ne]);
              const de = s.current.get(t);
              (de == null ? void 0 : de.type) === "preview" && k(le => le.map(J => J.id === Q ? {
                ...J,
                settings: {
                  ...(J.settings || {}),
                  selectedPreviewId: t
                }
              } : J)), w(), C(null), I(null);
            }
          } else w(), C(null), I(null);
        } else {
          const Q = R(Y.x, Y.y);
          Q && Q.nodeId === t && Q.inputType === (n || "default") ? (w(), C(null), I(null), h.current = null) : _(Y.x, Y.y, {
            targetNodeId: t,
            inputType: n
          });
        }
        if (!O) return !0;
      }
      return !1;
    }, [w, n, e, t, y, p, l, P, R, d, u, h, r, s, o, v, I, S, C, A, E, M, k, _, j]),
    F = g.useCallback(V => {
      if (!t || !V) return;
      const O = V.target;
      let L = O.closest(".node-wrapper");
      if (!L && O.hasAttribute("data-node-id") && (L = O), !L) {
        let U = O.parentElement;
        for (; U && U !== i.current;) {
          if (U.classList.contains("node-wrapper") || U.hasAttribute("data-node-id")) {
            L = U;
            break;
          }
          U = U.parentElement;
        }
      }
      if (!L) return;
      const D = L.getAttribute("data-node-id");
      if (D && D !== t) {
        n && n !== "default" && !(n === "agent_user_input" || n === "agent_meta_prompt") && A(Y => Y.filter(K => !(K.to === t && (K.inputType || "default") === n)));
        const H = {
          id: P(),
          from: D,
          to: t,
          ...(n && n !== "default" ? {
            inputType: n
          } : {})
        };
        A(Y => kv(Y, D, t, n) ? Y : [...Y, H]);
      }
      C(null), I(null);
    }, [i, n, t, P, I, C, A]),
    N = g.useCallback(() => !!(b.current || p.current && (e || t || r != null && r.length || a != null && a.length)), [e, t, p, r, a, b]),
    G = g.useCallback(V => b.current ? !0 : p.current && (e || t || r != null && r.length || a != null && a.length) && !V.closest(".node-wrapper") ? (w(), S(null), C(null), I(null), E == null || E(null), M == null || M(null), h.current = null, T == null || T([]), !0) : !1, [w, e, t, p, h, r, a, T, I, S, C, E, M, b]),
    z = g.useCallback((V, O) => {
      var D, U, H;
      const L = f.current;
      if (L && L.length > 0 && !p.current && y.current) {
        const Y = O.closest(".node-wrapper");
        if (Y) {
          const K = Y.getAttribute("data-node-id");
          if (K) {
            const W = L.filter(Q => Q !== K);
            if (W.length > 0) {
              if (mMe(l.current || [], W, K).length === 0) {
                const q = h.current ?? {
                  x: V.clientX,
                  y: V.clientY
                };
                return _(q.x, q.y, {
                  sourceNodeId: L[0],
                  sourceNodeIds: L
                }), !0;
              }
              A(q => {
                const ne = mMe(q, W, K).map(de => ({
                  id: P(),
                  from: de,
                  to: K
                }));
                return ne.length ? [...q, ...ne] : q;
              });
            }
          }
          w(), E == null || E(null), M == null || M(null);
        } else {
          const K = h.current ?? {
            x: V.clientX,
            y: V.clientY
          };
          _(K.x, K.y, {
            sourceNodeId: L[0],
            sourceNodeIds: L
          });
        }
        return !0;
      }
      if (m.current && !p.current && y.current) {
        if (V.__handledByCustomAgent || O.closest("[data-input-type]")) return !0;
        const Y = h.current ?? {
            x: V.clientX,
            y: V.clientY
          },
          K = v({
            target: V.target,
            clientX: Y.x,
            clientY: Y.y
          });
        if (j(m.current, Y.x, Y.y)) return w(), S(null), h.current = null, !0;
        const W = ((D = K == null ? void 0 : K.closest) == null ? void 0 : D.call(K, ".node-wrapper")) ?? null;
        if (W) {
          const Q = W.getAttribute("data-node-id");
          if (Q && Q !== e) {
            const q = s.current.get(Q);
            if ((q == null ? void 0 : q.type) === "custom-agent") return !0;
            const ne = Wot({
              targetNode: q,
              sourceNode: s.current.get(m.current),
              connections: l.current || [],
              preferred: "default"
            });
            if (kv(l.current || [], m.current, Q, ne)) return _(Y.x, Y.y, {
              sourceNodeId: m.current
            }), !0;
            ne !== "default" && A(le => le.filter(J => !(J.to === Q && (J.inputType || "default") === ne)));
            const de = {
              id: P(),
              from: m.current,
              to: Q,
              ...(ne !== "default" ? {
                inputType: ne
              } : {})
            };
            A(le => [...le, de]), (q == null ? void 0 : q.type) === "preview" && k(le => le.map(J => J.id === m.current ? {
              ...J,
              settings: {
                ...(J.settings || {}),
                selectedPreviewId: Q
              }
            } : J)), w(), S(null);
          } else {
            if (Tfe(Q, m.current, W, Y.x, Y.y)) return _(Y.x, Y.y, {
              sourceNodeId: m.current
            }), !0;
            const q = Q ? s.current.get(Q) : void 0;
            if ((q == null ? void 0 : q.type) === "custom-agent") return !0;
            w(), S(null);
          }
        } else {
          if (j(m.current, Y.x, Y.y)) return w(), S(null), h.current = null, !0;
          _(Y.x, Y.y, {
            sourceNodeId: m.current
          });
        }
        return !0;
      }
      if (t && !p.current) {
        const Y = h.current ?? {
            x: V.clientX,
            y: V.clientY
          },
          K = v({
            target: V.target,
            clientX: Y.x,
            clientY: Y.y
          }),
          W = ((U = K == null ? void 0 : K.closest) == null ? void 0 : U.call(K, ".node-wrapper")) ?? null;
        if (W) {
          const Q = W.getAttribute("data-node-id");
          if (Tfe(Q, t, W, Y.x, Y.y)) return _(Y.x, Y.y, {
            targetNodeId: t,
            ...(n && n !== "default" ? {
              inputType: n
            } : {})
          }), !0;
          if (Q && Q !== t) {
            if (kv(l.current || [], Q, t, n)) return _(Y.x, Y.y, {
              targetNodeId: t,
              ...(n && n !== "default" ? {
                inputType: n
              } : {})
            }), !0;
            n && n !== "default" && !(n === "agent_user_input" || n === "agent_meta_prompt") && A(le => le.filter(J => !(J.to === t && (J.inputType || "default") === n)));
            const ne = {
              id: P(),
              from: Q,
              to: t,
              ...(n && n !== "default" ? {
                inputType: n
              } : {})
            };
            A(le => [...le, ne]);
            const de = s.current.get(t);
            (de == null ? void 0 : de.type) === "preview" && k(le => le.map(J => J.id === Q ? {
              ...J,
              settings: {
                ...(J.settings || {}),
                selectedPreviewId: t
              }
            } : J));
          }
          w(), C(null), I(null);
        } else {
          if ((H = i.current) != null && H.getBoundingClientRect()) {
            const Q = R(Y.x, Y.y);
            return Q && Q.nodeId === t && Q.inputType === (n || "default") ? (w(), C(null), I(null), h.current = null, !0) : (_(Y.x, Y.y, {
              targetNodeId: t,
              inputType: n
            }), !0);
          }
          w(), C(null), I(null);
        }
        return !0;
      }
      return !1;
    }, [i, w, n, e, m, t, y, p, l, P, R, h, r, f, a, s, T, v, I, S, C, A, E, M, k, _, b, j]);
  return {
    isConnectionMenuActive: N,
    handleConnectionMouseUp: B,
    finalizeReverseConnectionAfterDrag: F,
    handleConnectionBackgroundGuard: G,
    handleConnectionBackgroundClick: z
  };
}

const k1i = {
  x: 12,
  y: 12
};

function hD(e, t, n, r) {
  const a = n > 0 ? n : 1,
    i = jEr(),
    o = a * i,
    {
      x: s,
      y: l
    } = k1i;
  return {
    x: e + s / o,
    y: t + l / o
  };
}

let rR = null;

function A1i(e) {
  var a, i;
  const t = ((a = e.multiSourceIds) == null ? void 0 : a.join(",")) ?? "",
    n = ((i = e.multiTargetIds) == null ? void 0 : i.join(",")) ?? "";
  if (rR && rR.connections === e.connections && rR.sourceId === e.sourceId && rR.targetId === e.targetId && rR.inputType === e.inputType && rR.multiSource === t && rR.multiTarget === n) return rR.blockedIds;
  const r = Ulr({
    connections: e.connections || [],
    connectingSource: e.sourceId,
    connectingTarget: e.targetId,
    connectingInputType: e.inputType,
    multiConnectingSourceIds: e.multiSourceIds,
    multiConnectingTargetIds: e.multiTargetIds
  });
  return rR = {
    connections: e.connections,
    sourceId: e.sourceId,
    targetId: e.targetId,
    inputType: e.inputType,
    multiSource: t,
    multiTarget: n,
    blockedIds: r
  }, r;
}

function S1i(e) {
  const t = hD(e.worldX, e.worldY, e.zoom, e.canvasEl),
    n = A1i(e),
    r = u1i(e.sourceId, e.targetId, e.multiSourceIds, e.multiTargetIds, n);
  return {
    worldX: t.x,
    worldY: t.y,
    blockedIds: n,
    wireState: r
  };
}

const I1i = 80;

function C1i(e) {
  return e.hasRealGesture ? e.stale && !e.pointerButtonsDown : e.blockingClasses;
}

function E1i(e, t) {
  return !!(e && t.button === 0 && t.now <= e.expiresAt && Math.abs(t.clientX - e.clientX) <= 2 && Math.abs(t.clientY - e.clientY) <= 2);
}

function T1i(e) {
  if (e.buttons !== 0) return {
    recover: !1,
    releasedSince: null
  };
  if (e.releaseSettling) return {
    recover: !1,
    releasedSince: null
  };
  if (e.connectionMenuSticky) return {
    recover: !1,
    releasedSince: e.releasedSince
  };
  if (!e.liveGesture && !e.hasBlockingState) return {
    recover: !1,
    releasedSince: null
  };
  if (!e.liveGesture) return {
    recover: !0,
    releasedSince: null
  };
  const t = e.releasedSince ?? e.now;
  return e.now - t < I1i ? {
    recover: !1,
    releasedSince: t
  } : {
    recover: !0,
    releasedSince: null
  };
}

function fMe(e, t, n) {
  if (!e && !t) return !1;
  const r = !!(t != null && t.classList.contains("canvas-viewport-interacting")) && !(n != null && n.panning) && !(n != null && n.zooming);
  return !!(e != null && e.classList.contains("canvas-interacting") || e != null && e.classList.contains("canvas-node-dragging") || e != null && e.classList.contains("canvas-box-select-group-dragging") || n != null && n.panPending || e != null && e.classList.contains("canvas-pan-pending") || t != null && t.classList.contains("canvas-node-dragging") || t != null && t.classList.contains("canvas-local-node-dragging") || t != null && t.classList.contains("canvas-box-select-group-dragging") || t != null && t.classList.contains("canvas-panning") || t != null && t.classList.contains("canvas-local-panning") || t != null && t.classList.contains("canvas-minimap-dragging") || r);
}

function M1i(e) {
  return e.panning || e.viewPanning || e.zoomingState && e.zoomingRef;
}

const Ocr = .001;

function P1i(e, t) {
  const n = (t == null ? void 0 : t.minZoom) ?? Sd.MIN_ZOOM,
    r = (t == null ? void 0 : t.maxZoom) ?? Sd.MAX_ZOOM;
  return Math.min(r, Math.max(n, e));
}

function R1i(e, t, n) {
  return t === 0 && n === 0 ? e : {
    x: e.x + t,
    y: e.y + n,
    zoom: e.zoom
  };
}

function rFt(e, t, n, r, a) {
  if (!Number.isFinite(t) || t === 1) return e;
  let i = P1i(e.zoom * t, a);
  if (i = Math.round(i * 1e4) / 1e4, i === e.zoom) return e;
  const o = i / e.zoom;
  return {
    zoom: i,
    x: Math.round((n - (n - e.x) * o) * 100) / 100,
    y: Math.round((r - (r - e.y) * o) * 100) / 100
  };
}

function N1i(e) {
  return e >= 100 ? 220 : e >= 30 ? 180 : e >= 12 ? 140 : 120;
}

function j1i(e) {
  return !e;
}

function D1i(e, t, n) {
  S4n(e), t && j1i(n) && XEr(t, e);
}

function L1i(e) {
  if (e.isZoomLocked) return {
    type: "apply",
    view: {
      zoom: e.view.zoom,
      x: e.view.x,
      y: Math.round((e.view.y - e.deltaY) * 100) / 100
    }
  };
  const t = Math.exp(-e.deltaY * Ocr),
    n = rFt(e.view, t, e.originX, e.originY, {
      minZoom: e.minZoom,
      maxZoom: e.maxZoom
    });
  return n.zoom === e.view.zoom ? {
    type: "sync-only"
  } : {
    type: "apply",
    view: n
  };
}

const O1i = {
    type: "canvas-zoom"
  },
  B1i = 200;

function F1i(e) {
  return e.portalDropdown || e.splitModal ? {
    type: "ignore"
  } : e.modelDropdown ? {
    type: "hijack-y",
    el: e.modelDropdown
  } : e.modelSelectArea ? {
    type: "hijack-block"
  } : e.genGallery ? {
    type: "hijack-gallery",
    scrollHost: e.genGalleryScrollHost
  } : e.inpaintScroll ? {
    type: "hijack-y",
    el: e.inpaintScroll
  } : e.textNodeScroll ? {
    type: "hijack-y",
    el: e.textNodeScroll
  } : e.tableEditor ? {
    type: "hijack-table",
    el: e.tableEditor
  } : e.genericScrollY ? {
    type: "hijack-y",
    el: e.genericScrollY
  } : e.videoFramesScroll ? {
    type: "hijack-y",
    el: e.videoFramesScroll
  } : e.videoFramesBlock ? {
    type: "hijack-block"
  } : {
    type: "canvas-zoom"
  };
}

function P1e(e) {
  return e.scrollHeight > e.clientHeight + 1;
}

function z1i(e) {
  const t = window.getComputedStyle(e).overflowY,
    n = window.getComputedStyle(e).overflow;
  return t === "auto" || t === "scroll" || n === "auto";
}

function U1i(e) {
  return e.classList.contains("max-h-64") || e.classList.contains("overflow-y-auto");
}

function $1i(e, t) {
  let n = e;
  for (; n && t.contains(n);) {
    if (P1e(n)) {
      const r = window.getComputedStyle(n).overflowY;
      if (r === "auto" || r === "scroll" || n.classList.contains("overflow-y-auto")) return n;
    }
    n = n.parentElement;
  }
  return P1e(t) ? t : null;
}

function G1i(e, t) {
  const n = e.closest(".custom-scrollbar") || e.closest(".rh-scroll-minimal"),
    r = e.closest("[data-gen-version-gallery]"),
    a = e.closest("[data-inpaint-crop-panel]"),
    i = e.closest("[data-text-node-body]"),
    o = i == null ? void 0 : i.querySelector('[data-scrollable="true"]:not(textarea)'),
    s = e.closest("[data-table-editor-scroll]"),
    l = e.closest("[data-table-editor-textarea]"),
    d = e.closest('.overflow-y-auto, .overflow-auto, .custom-scrollbar, [data-scrollable="true"]'),
    h = e.closest(".video-input-container .grid") !== null || e.closest(".grid.overflow-y-auto") !== null || e.closest(".grid.custom-scrollbar") !== null ? e.closest(".grid.overflow-y-auto, .grid.custom-scrollbar") : null;
  return F1i({
    portalDropdown: !!e.closest("[data-gen-node-portal-dropdown]"),
    splitModal: !!(e.closest("[data-free-split-modal], [data-grid-split-modal]") || t.querySelector("[data-free-split-modal], [data-grid-split-modal]")),
    modelDropdown: n && U1i(n) ? n : null,
    modelSelectArea: !!e.closest("[data-model-select-area]"),
    genGallery: !!r,
    genGalleryScrollHost: (r == null ? void 0 : r.querySelector("[data-gen-version-gallery-scroll]")) ?? null,
    inpaintScroll: a ? $1i(e, a) : null,
    textNodeScroll: o && P1e(o) ? o : null,
    tableEditor: s && l && P1e(l) ? l : s,
    genericScrollY: d && z1i(d) && P1e(d) ? d : null,
    videoFramesScroll: h,
    videoFramesBlock: !!e.closest(".grid.overflow-y-auto, .grid.custom-scrollbar, .video-frames-grid, .video-input-container .grid")
  });
}

function Mfe(e, t, n, r) {
  const a = t - n;
  return Math.max(0, Math.min(a, e + r));
}

function $ln(e, t) {
  mY(t == null ? void 0 : t.current, e);
}

function V1i() {
  if (typeof document > "u") return !1;
  const e = document.body;
  return e.classList.contains("canvas-interacting") || e.classList.contains("canvas-node-dragging") || e.classList.contains("canvas-box-select-group-dragging");
}

let $E = null;

function aFt() {
  $E == null || $E.interruptForGesture();
}

function Gln() {
  $E == null || $E.pauseSettleForPointerDown();
}

function qot() {
  $E == null || $E.resumeAfterCancelledPan();
}

function H1i({
  canvasRef: e,
  setView: t,
  viewRef: n,
  canvasContentRef: r,
  onViewFrame: a,
  isZoomLocked: i = !1,
  nodeCount: o = 0,
  canvasMounted: s = !0
}) {
  const l = g.useRef(a);
  l.current = a;
  const d = g.useRef(void 0),
    u = g.useRef(void 0),
    h = g.useRef(void 0),
    p = g.useRef(0),
    m = g.useRef(o);
  m.current = o, g.useEffect(() => {
    if (!s) return;
    const f = e.current;
    if (!f) return;
    const y = {
        current: void 0
      },
      b = () => {
        h.current !== void 0 && (cancelAnimationFrame(h.current), h.current = void 0), y.current !== void 0 && (window.clearTimeout(y.current), y.current = void 0);
      },
      v = () => {
        const F = pY(n.current),
          N = {
            x: F.x,
            y: F.y,
            zoom: F.zoom
          };
        return n.current = N, $ln(N, r), N;
      },
      _ = () => jl() || Av() || V1i(),
      w = () => {
        if (_()) return;
        const F = v();
        u.current !== void 0 && (cancelAnimationFrame(u.current), u.current = void 0), Rl() && xv(!1, {
          skipDeferredFlush: !0,
          skipNotify: !0
        }), g.startTransition(() => {
          _() || t(F);
        });
      },
      k = F => {
        b(), h.current = requestAnimationFrame(() => {
          h.current = requestAnimationFrame(() => {
            h.current = void 0, F === p.current && (_() || (y.current = window.setTimeout(() => {
              if (y.current = void 0, F !== p.current || _()) return;
              V5t(rTr);
              const N = pY(n.current),
                G = {
                  x: N.x,
                  y: N.y,
                  zoom: N.zoom
                };
              n.current = G, Rl() && xv(!1, {
                skipDeferredFlush: !0
              }), g.startTransition(() => {
                _() || t(G);
              }), typeof window < "u" && window.dispatchEvent(new CustomEvent("canvasViewportSettled", {
                detail: {
                  reason: "zoom"
                }
              })), N4n();
            }, HDe)));
          });
        });
      },
      A = () => {
        if (d.current = void 0, _()) {
          Rl() && xv(!1, {
            skipDeferredFlush: !0,
            skipNotify: !0
          }), w();
          return;
        }
        const F = p.current;
        u.current !== void 0 && (cancelAnimationFrame(u.current), u.current = void 0), k(F);
      },
      S = () => {
        d.current !== void 0 && window.clearTimeout(d.current);
        const F = m.current,
          N = N1i(F);
        d.current = window.setTimeout(A, N);
      };
    let C = !1;
    $E = {
      cancelPending: () => {
        d.current !== void 0 && (window.clearTimeout(d.current), d.current = void 0), b();
      },
      interruptForGesture: () => {
        C = !1;
        const F = d.current !== void 0 || h.current !== void 0 || y.current !== void 0 || Rl();
        if (d.current !== void 0 && (window.clearTimeout(d.current), d.current = void 0), b(), !!F) {
          if (jl()) {
            Rl() && xv(!1, {
              skipDeferredFlush: !0,
              skipNotify: !0
            });
            return;
          }
          w();
        }
      },
      pauseSettleForPointerDown: () => {
        const F = d.current !== void 0 || h.current !== void 0 || y.current !== void 0 || Rl();
        d.current !== void 0 && (window.clearTimeout(d.current), d.current = void 0), b(), F && (C = !0);
      },
      resumeAfterCancelledPan: () => {
        C && (C = !1, !_() && w());
      }
    };
    const I = (F, N) => {
      p.current += 1, u.current !== void 0 && (cancelAnimationFrame(u.current), u.current = void 0), b(), n.current = F, xv(!0), l.current ? l.current(F) : $ln(F, r), S();
    };
    let E = 0,
      M = 0,
      T = 0,
      P;
    const R = () => {
      P = void 0;
      const F = E;
      if (E = 0, F === 0) return;
      const N = n.current;
      Rl() || xv(!0);
      const G = L1i({
        view: N,
        deltaY: F,
        isZoomLocked: i,
        originX: M,
        originY: T,
        minZoom: Sd.MIN_ZOOM,
        maxZoom: Sd.MAX_ZOOM
      });
      if (G.type === "sync-only") {
        S();
        return;
      }
      I(G.view);
    };
    let j = 0;
    const B = F => {
      const N = F.target,
        z = F.timeStamp < j ? O1i : G1i(N, document);
      if (j = z.type === "canvas-zoom" ? F.timeStamp + B1i : 0, z.type !== "ignore") {
        if (z.type === "hijack-block") {
          F.preventDefault(), F.stopPropagation(), F.stopImmediatePropagation();
          return;
        }
        if (z.type === "hijack-y") {
          F.preventDefault(), F.stopPropagation(), F.stopImmediatePropagation(), z.el.scrollTop = Mfe(z.el.scrollTop, z.el.scrollHeight, z.el.clientHeight, F.deltaY);
          return;
        }
        if (z.type === "hijack-table") {
          F.preventDefault(), F.stopPropagation(), F.stopImmediatePropagation();
          const V = window.getComputedStyle(z.el);
          (V.overflowY === "auto" || V.overflowY === "scroll" || V.overflow === "auto") && (z.el.scrollTop = Mfe(z.el.scrollTop, z.el.scrollHeight, z.el.clientHeight, F.shiftKey ? 0 : F.deltaY));
          const O = z.el.closest("[data-table-editor-scroll]") || z.el;
          O.scrollLeft = Mfe(O.scrollLeft, O.scrollWidth, O.clientWidth, F.shiftKey && F.deltaY || F.deltaX);
          return;
        }
        if (z.type === "hijack-gallery") {
          F.preventDefault(), F.stopPropagation(), F.stopImmediatePropagation();
          const V = z.scrollHost;
          if (V) {
            const O = Math.abs(F.deltaX) > Math.abs(F.deltaY) ? F.deltaX : F.deltaY;
            V.scrollHeight > V.clientHeight + 1 ? V.scrollTop = Mfe(V.scrollTop, V.scrollHeight, V.clientHeight, O) : V.scrollWidth > V.clientWidth + 1 && (V.scrollLeft = Mfe(V.scrollLeft, V.scrollWidth, V.clientWidth, O));
          }
          return;
        }
        try {
          F.cancelable && F.preventDefault();
        } catch {}
        if (E += F.deltaY, !i) {
          const V = Rl() ? dY(f) : OEr(f);
          if (V) {
            const O = UDe(F.clientX, F.clientY, V, f);
            M = O.x, T = O.y;
          }
        }
        Rl() || xv(!0), P === void 0 && (P = requestAnimationFrame(R));
      }
    };
    return f.addEventListener("wheel", B, {
      passive: !1
    }), () => {
      $E = null, f.removeEventListener("wheel", B), P !== void 0 && (cancelAnimationFrame(P), P = void 0), d.current !== void 0 && window.clearTimeout(d.current), u.current !== void 0 && cancelAnimationFrame(u.current), b(), xv(!1);
    };
  }, [e, r, t, n, i, s]);
}

function Vln(e) {
  if (typeof e != "string") return null;
  const t = e.trim().match(/(\d+)\s*[×x]\s*(\d+)/i);
  if (!t) return null;
  const n = parseInt(t[1], 10),
    r = parseInt(t[2], 10);
  return !Number.isFinite(n) || !Number.isFinite(r) || n <= 0 || r <= 0 ? null : {
    w: n,
    h: r
  };
}

function W1i(e) {
  if (e.type !== "gen-image" && e.type !== "gen-video") return null;
  const t = e.settings;
  return Vln(t == null ? void 0 : t.previewActualSize) ?? Vln(t == null ? void 0 : t.previewSize);
}

function gMe(e, t, n, r) {
  const a = Number.isFinite(n) && n > 0 ? n : 1,
    i = Math.max(0, e),
    o = Math.max(0, t),
    s = a * a;
  let l = (i * s + o * a) / (s + 1);
  l = Math.max(r, l);
  let d = l / a;
  return d < r && (d = r, l = Math.max(r, d * a)), {
    w: l,
    h: d
  };
}

function q1i(e, t) {
  const n = e.style.transform.match(/translate3d\(([^,]+)px,\s*([^,]+)px/);
  return {
    x: n ? parseFloat(n[1]) : t.x,
    y: n ? parseFloat(n[2]) : t.y,
    width: parseInt(e.style.width, 10) || e.offsetWidth || t.width,
    height: parseInt(e.style.height, 10) || e.offsetHeight || t.height
  };
}

function K1i(e, t, n, r) {
  let a = t.x,
    i = t.y;
  return e.horizontal === "right" ? a = t.x + t.width : e.horizontal === "left" ? a = t.x : a = n, e.vertical === "bottom" ? i = t.y + t.height : e.vertical === "top" ? i = t.y : i = r, {
    ...t,
    grabOffsetX: e.horizontal === "none" ? 0 : n - a,
    grabOffsetY: e.vertical === "none" ? 0 : r - i
  };
}

function Q1i(e) {
  return twi({
    resizeDirection: e.resizeDirection,
    startState: e.grabState,
    adjX: e.worldX - e.grabState.grabOffsetX,
    adjY: e.worldY - e.grabState.grabOffsetY,
    node: e.node
  });
}

function Y1i(e, t) {
  e.style.width = `${t.newWidth}px`, e.style.height = `${t.newHeight}px`, e.style.transform = `translate3d(${Math.round(t.newX)}px, ${Math.round(t.newY)}px, 0)`;
}

const X1i = 250,
  J1i = 150,
  Z1i = {
    w: 440,
    h: 96
  };

function ewi(e) {
  var t, n;
  if (e.type === "input-image" && ((t = e.settings) == null ? void 0 : t.mediaType) === "audio") return Z1i;
  if (e.type === "input-image") {
    const r = (n = e.settings) == null ? void 0 : n.imageSize;
    if (!r || typeof r != "string") return null;
    const a = r.match(/^(\d+)[×xX](\d+)$/);
    if (!a) return null;
    const i = parseInt(a[1], 10),
      o = parseInt(a[2], 10);
    return i > 0 && o > 0 ? {
      w: i,
      h: o
    } : null;
  }
  return W1i(e);
}

function twi(e) {
  const {
      resizeDirection: t,
      startState: n,
      adjX: r,
      adjY: a,
      node: i
    } = e,
    o = e.minSize ?? X1i,
    s = n.x + n.width,
    l = n.y + n.height,
    d = n.y,
    u = n.x;
  let h = n.x,
    p = n.y,
    m = n.width,
    f = n.height;
  const y = t.horizontal === "left" && t.vertical === "none" || t.horizontal === "none" && t.vertical === "top" || t.horizontal === "left" && t.vertical === "top" || t.horizontal === "right" && t.vertical === "top",
    b = t.horizontal === "left" && t.vertical === "bottom";
  y ? (t.horizontal === "left" ? (m = Math.max(o, s - r), h = s - m) : t.horizontal === "right" && (m = Math.max(o, r - u), h = u), t.horizontal === "none" && (m = n.width, h = n.x), t.vertical === "top" && (f = Math.max(o, l - a), p = l - f), t.vertical === "none" && (f = n.height, p = n.y)) : b ? (m = Math.max(o, s - r), h = s - m, f = Math.max(o, a - d), p = d) : (t.horizontal === "right" && (m = Math.max(o, r - n.x), h = n.x), t.vertical === "bottom" && (f = Math.max(o, a - n.y), p = n.y));
  const v = ewi(i);
  if (v) {
    const _ = nwi({
      ar: v.w / v.h,
      minDim: J1i,
      resizeDirection: t,
      shouldLockBottomRight: y,
      shouldLockTopRight: b,
      fixedBottomY: l,
      fixedRightX: s,
      fixedTopY: d,
      fixedLeftX: u,
      newWidth: m,
      newHeight: f,
      newX: h,
      newY: p
    });
    m = _.newWidth, f = _.newHeight, h = _.newX, p = _.newY;
  }
  return {
    newX: h,
    newY: p,
    newWidth: m,
    newHeight: f
  };
}

function nwi(e) {
  let {
    newWidth: t,
    newHeight: n,
    newX: r,
    newY: a
  } = e;
  const {
    ar: i,
    minDim: o,
    resizeDirection: s,
    shouldLockBottomRight: l,
    shouldLockTopRight: d,
    fixedBottomY: u,
    fixedRightX: h,
    fixedTopY: p,
    fixedLeftX: m
  } = e;
  if (l) {
    if (s.horizontal === "left" && s.vertical === "none") n = Math.max(o, Math.round(t / i)), a = u - n;else if (s.vertical === "top" && s.horizontal === "none") t = Math.max(o, Math.round(n * i)), r = h - t;else if (s.horizontal === "right" && s.vertical === "top") {
      const {
        w: f,
        h: y
      } = gMe(t, n, i, o);
      t = f, n = y, r = m, a = u - n;
    } else if (s.horizontal === "left" && s.vertical === "top") {
      const {
        w: f,
        h: y
      } = gMe(t, n, i, o);
      t = f, n = y, r = h - t, a = u - n;
    } else (s.horizontal === "left" || s.vertical === "top") && (t = Math.max(o, h - r), n = Math.max(o, Math.round(t / i)), a = u - n, s.horizontal === "left" && (r = h - t));
  } else if (d) {
    const {
      w: f,
      h: y
    } = gMe(t, n, i, o);
    t = f, n = y, r = h - t, a = p;
  } else if (s.horizontal !== "none" && s.vertical !== "none") {
    const {
      w: f,
      h: y
    } = gMe(t, n, i, o);
    t = f, n = y, r = m, a = p;
  } else s.horizontal !== "none" ? (n = Math.max(o, Math.round(t / i)), s.horizontal === "left" && (a = u - n)) : s.vertical !== "none" && (t = Math.max(o, Math.round(n * i)), s.vertical === "top" && (r = h - t));
  return {
    newWidth: t,
    newHeight: n,
    newX: r,
    newY: a
  };
}

const rwi = '[data-gen-prompt-panel], [data-prompt-editor-area], [data-scrollable="true"], [data-node-header-toolbar], [data-model-select-area], [data-edit-image-bottom-panel], [data-edit-image-tools-toolbar], [data-edit-image-layers-panel], [data-eraser-tool-panel], [data-free-split-modal], [data-grid-split-modal], [data-layer-split-panel], [data-one-click-layer-panel], [data-canvas-pin-ui], [contenteditable="true"]';

function lje() {
  return typeof document > "u" ? !1 : document.getElementsByClassName("canvas-fullscreen-tool-modal").length > 0;
}

function yMe(e, t) {
  return typeof document > "u" ? !1 : !!lje();
}

function Hln(e, t, n) {
  const r = i => !!i && (i.closest(rwi) !== null || i.closest('[class*="group/prompt"]') !== null);
  if (r(e)) return !0;
  if (typeof document > "u") return !1;
  const a = document.elementFromPoint(t, n);
  return r(a);
}

function cje(e, t) {
  return !!e && e.isConnected && e.getAttribute("data-node-id") === t;
}

const awi = 'button, input, textarea, select, [contenteditable="true"], .node-dropdown-button, .node-dropdown-menu, [data-model-select-area], [data-canvas-reference-pick-banner], [data-edit-image-bottom-panel], [data-edit-image-tools-toolbar], [data-edit-image-layers-panel], [data-eraser-tool-panel], [data-canvas-pin-ui]',
  iwi = 'button, input, img, .clickable-area, .mj-grid-quadrant, textarea, select, [contenteditable="true"], video, .node-dropdown-button, .node-dropdown-menu, [data-chart-row-col], [data-model-select-area], [data-edit-image-bottom-panel], [data-edit-image-tools-toolbar], [data-edit-image-layers-panel], [data-eraser-tool-panel], [data-canvas-pin-ui], [data-video-aspect-crop-panel], [data-image-aspect-crop-panel]',
  owi = 'input, textarea, select, button, [contenteditable="true"]',
  swi = ".node-wrapper, .connector, [data-box-select-bounds], [data-group-toolbar], [data-group-resize-handle], [data-group-edge-zone]",
  lwi = "[data-group-toolbar], [data-group-label], [data-group-resize-handle], [data-group-edge-zone]";

function cwi(e) {
  return !!e.recoveredNode && !e.originalNode && e.canvasContainsRecovered;
}

function dwi(e) {
  var n;
  if (!e || typeof e != "object") return !1;
  const t = e;
  return t.id === "canvas-pan-hit-shield" || !!((n = t.closest) != null && n.call(t, "#canvas-pan-hit-shield"));
}

function uwi(e) {
  return e.panPending || e.panningClass || e.localPanningClass || e.viewportInteractingClass || e.zooming;
}

function hwi(e) {
  return e.originalNode ? !1 : e.tokenMatch || e.fromShield || e.leftoverBlockers;
}

function pwi(e) {
  return e.overGroupResizeHandle ? !0 : e.hasTextSelection && e.overNode;
}

function Wln(e) {
  return !(e.compactRefPickActive && e.button === 0 && !e.overRefPickBlock) && (e.overGenPrompt || e.overInteractive || e.overFormControl || e.overNode || e.overConnector) ? {
    type: "ignore"
  } : e.overImageReorder ? {
    type: "ignore"
  } : e.button === 0 && e.ctrlOrMeta ? {
    type: "marquee"
  } : e.isDraggingGroup || e.isResizingGroup || e.isDraggingSelectionBounds ? {
    type: "ignore"
  } : e.button === 0 && !e.ctrlOrMeta && e.overBoxSelectHandle && e.insideBoxSelection ? {
    type: "box-drag"
  } : e.button === 0 && !e.ctrlOrMeta && e.groupIdAtEmpty && !e.isResizingGroup && !e.overGroupEmptyBlock ? {
    type: "group-drag",
    groupId: e.groupIdAtEmpty
  } : {
    type: "pending-pan",
    clearNodes: e.hadSelection && !e.insideBoxSelection,
    clearGroups: !e.overGroupUi
  };
}

function mwi(e) {
  return e.draggingSelectionBounds ? {
    type: "ignore"
  } : e.isPanning && !e.isWireDrag ? e.panWindowMoveAttached ? {
    type: "ignore"
  } : {
    type: "pan-live-schedule"
  } : e.pendingPan && !e.isWireDrag && !e.draggingGroup && !e.draggingSelectionBounds ? {
    type: "pan-pending"
  } : {
    type: "continue"
  };
}

function Bcr(e) {
  return !!e.connectingSource || !!e.connectingTarget || !!(e.multiConnectingSourceIds && e.multiConnectingSourceIds.length > 0) || !!(e.multiConnectingTargetIds && e.multiConnectingTargetIds.length > 0);
}

function fwi(e) {
  return e.hasDropHandler && !!e.dragNodeId && e.hasPointer && !e.isDraggingGroup && !e.connectingSource && !e.connectingTarget;
}

function gwi(e, t) {
  return t && t.size > 1 && t.has(e) ? Array.from(t) : [e];
}

function ywi(e) {
  return !!(e.dragNodeIdRef || e.dragNodeId || e.pendingUpdateCount > 0);
}

function bwi(e) {
  return e.bodyHasBoxSelectGroupDraggingClass || e.activeNodeDragCount > 0;
}

function vwi(e) {
  return e.releasedCount === 0 && !e.boxSelectGroupDragActive && !e.completingBoxSelection;
}

function qln(e) {
  var i, o, s, l, d, u, h, p;
  const t = ((i = e.startFromRef) == null ? void 0 : i.startX) ?? ((o = e.selectionBox) == null ? void 0 : o.startX),
    n = ((s = e.startFromRef) == null ? void 0 : s.startY) ?? ((l = e.selectionBox) == null ? void 0 : l.startY);
  if (t == null || n == null) return null;
  const r = ((d = e.endFromRef) == null ? void 0 : d.endX) ?? ((u = e.selectionBox) == null ? void 0 : u.endX) ?? t,
    a = ((h = e.endFromRef) == null ? void 0 : h.endY) ?? ((p = e.selectionBox) == null ? void 0 : p.endY) ?? n;
  return {
    left: Math.min(t, r),
    top: Math.min(n, a),
    right: Math.max(t, r),
    bottom: Math.max(n, a)
  };
}

function Kln(e, t, n, r) {
  const a = new Set();
  for (const i of e) t.has(i.id) || r(i, n) && a.add(i.id);
  return a;
}

function wwi(e) {
  return e.size === 1 ? {
    type: "set",
    nodeId: e.values().next().value ?? null
  } : e.size > 1 ? {
    type: "set",
    nodeId: null
  } : {
    type: "keep"
  };
}

function xwi(e, t) {
  if (!(!t || t.size <= 1)) return new Set(e.filter(n => t.has(n.from) && t.has(n.to)).map(n => n.id));
}

const _wi = "(hover: hover) and (pointer: fine)";

function kwi() {
  return typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(_wi).matches;
}

function Wre(e) {
  return e === "touch" || e === "pen";
}

function Fcr(e, t) {
  return Wre(t) ? !0 : e === 0 || e === 1;
}

function Awi(e) {
  return e.touchGestureActive ? !1 : e.hoverable;
}

const Swi = 10,
  Iwi = 8,
  Cwi = 1e-5,
  Ewi = 1e-4;

function Twi(e, t) {
  return {
    mid: {
      x: (e.x + t.x) / 2,
      y: (e.y + t.y) / 2
    },
    dist: Math.hypot(e.x - t.x, e.y - t.y)
  };
}

function Mwi(e, t, n = Iwi) {
  return !!e && t != null && t >= n;
}

function Pwi(e, t) {
  return !t && Number.isFinite(e) && Math.abs(e - 1) > Cwi;
}

function Rwi(e) {
  return Wre(e.pointerType) ? e.overFullscreen ? {
    type: "ignore"
  } : e.isGestureTarget ? e.isPassthroughTarget ? {
    type: "passthrough-auto"
  } : e.trackedPointerCount >= 1 ? {
    type: "pinch-begin"
  } : e.onNodeOrConnector ? {
    type: "node-passthrough"
  } : e.nodeDragActive || e.selecting || e.connecting || e.draggingGroup || e.draggingSelectionBounds ? {
    type: "blocked"
  } : e.doodleCursor ? {
    type: "doodle"
  } : {
    type: "blank-pan-pending"
  } : {
    type: "ignore"
  } : {
    type: "ignore"
  };
}

function Nwi(e) {
  if (e.pinchPointerCount >= 2) return {
    type: "pinch"
  };
  if (e.isNodePassthrough) return {
    type: "node-passthrough"
  };
  if (e.pending && !e.isPanning) {
    const t = e.pointer.x - e.pending.x,
      n = e.pointer.y - e.pending.y;
    return D5t(t, n, Swi) ? {
      type: "begin-pan",
      dx: t,
      dy: n
    } : {
      type: "wait-slop"
    };
  }
  return e.isPanning ? {
    type: "pan-schedule"
  } : {
    type: "continue"
  };
}

function Qln(e) {
  return e.tracked ? e.remainingCount >= 2 ? {
    type: "pinch-continue"
  } : e.remainingCount === 1 ? {
    type: "pinch-to-one"
  } : e.wasNodePassthrough ? {
    type: "node-passthrough-end"
  } : e.pendingOnly ? {
    type: "pending-tap"
  } : {
    type: "live-release"
  } : e.remainingCount === 0 ? {
    type: "restore-touch-action"
  } : {
    type: "ignore"
  };
}

function jwi(e) {
  const t = e.dist / e.prevDist;
  let n = R1i(e.view, e.mid.x - e.prevMid.x, e.mid.y - e.prevMid.y);
  return Pwi(t, e.isZoomLocked) && (n = rFt(n, t, e.origin.x, e.origin.y, {
    minZoom: e.minZoom,
    maxZoom: e.maxZoom
  })), {
    view: n,
    zooming: Math.abs(n.zoom - e.view.zoom) > Ewi
  };
}

const Yln = ["mouseup", "pointerup", "pointercancel"];

function dje(e, t) {
  const n = r => e(r);
  for (const r of Yln) t.addEventListener(r, n, !0);
  return () => {
    for (const r of Yln) t.removeEventListener(r, n, !0);
  };
}

function Dwi(e) {
  let t = !1;
  const n = a => e.onMove(a),
    r = {
      capture: !0,
      passive: !0
    };
  return {
    attachMove() {
      t || (t = !0, e.target.addEventListener("mousemove", n, r));
    },
    detachMove() {
      t && (t = !1, e.target.removeEventListener("mousemove", n, r));
    },
    isMoveAttached() {
      return t;
    }
  };
}

function Lwi(e) {
  const t = r => {
      const a = r;
      (a.buttons & 1) !== 0 && e.onMove(a);
    },
    n = r => e.onRelease(r);
  return {
    bind() {
      return e.target.addEventListener("mouseup", n, !0), e.target.addEventListener("pointerup", n, !0), e.target.addEventListener("mousemove", t, {
        passive: !1
      }), () => {
        e.target.removeEventListener("mouseup", n, !0), e.target.removeEventListener("pointerup", n, !0), e.target.removeEventListener("mousemove", t);
      };
    }
  };
}

function Xln(e, t) {
  if (e === t) return !0;
  if (!e || !t || e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) {
    const r = e[n],
      a = t[n];
    if (r.x1 !== a.x1 || r.y1 !== a.y1 || r.x2 !== a.x2 || r.y2 !== a.y2 || r.orientation !== a.orientation || r.label !== a.label || r.labelX !== a.labelX || r.labelY !== a.labelY || !!r.hideLine != !!a.hideLine) return !1;
  }
  return !0;
}

function Jln(e, t, n) {
  const r = Math.min(t.startX, n.endX),
    a = Math.min(t.startY, n.endY);
  e.style.left = `${r}px`, e.style.top = `${a}px`, e.style.width = `${Math.abs(n.endX - t.startX)}px`, e.style.height = `${Math.abs(n.endY - t.startY)}px`;
}

const Zln = .5;

function Owi(e) {
  var n, r;
  const t = new Map();
  for (const a of e.ids) {
    const i = e.getNode(a);
    if (!i) continue;
    const o = ((n = e.getPending) == null ? void 0 : n.call(e, a)) ?? ((r = e.getLive) == null ? void 0 : r.call(e, a)) ?? e.readDom(a, {
      x: i.x,
      y: i.y
    });
    (Math.abs(o.x - i.x) > Zln || Math.abs(o.y - i.y) > Zln) && t.set(a, o);
  }
  return t;
}

function ecn(e, t) {
  return t.size === 0 ? e : e.map(n => {
    const r = t.get(n.id);
    return r ? {
      ...n,
      x: r.x,
      y: r.y
    } : n;
  });
}

function uje(e, t, n) {
  e.style.transform = `translate3d(${t}px, ${n}px, 0)`;
}

const Bwi = 6,
  Fwi = 30;

function tcn(e, t, n, r, a) {
  const i = r ? a.x - r.x : 0,
    o = r ? a.y - r.y : 0;
  return {
    x: e - n.x - i,
    y: t - n.y - o
  };
}

function zcr(e, t, n) {
  const r = new Map();
  return e.forEach((a, i) => r.set(i, {
    x: a.x + t,
    y: a.y + n
  })), r;
}

function zwi(e, t, n, r) {
  if (t.size === 0 || e.size === 0) return {
    x: n,
    y: r
  };
  const a = t.keys().next().value,
    i = e.get(a),
    o = t.get(a);
  return !i || !o ? {
    x: n,
    y: r
  } : {
    x: o.x - i.x,
    y: o.y - i.y
  };
}

function Uwi(e) {
  const t = e.startPositions.get(e.rootId),
    n = ((t == null ? void 0 : t.x) ?? e.fallbackRoot.x) + e.deltaX,
    r = ((t == null ? void 0 : t.y) ?? e.fallbackRoot.y) + e.deltaY,
    a = e.snappedRoot.x - n,
    i = e.snappedRoot.y - r;
  return zcr(e.startPositions, e.deltaX + a, e.deltaY + i);
}

function $wi(e) {
  return e > Bwi;
}

function Gwi(e) {
  return e <= Fwi;
}

function Vwi(e) {
  return [...e].sort().join(",");
}

function Hwi(e, t) {
  return e && e.size > 1 && e.has(t) ? e : [t];
}

function BL(e, t) {
  return e != null && e.length ? e : t;
}

function Wwi(e) {
  return e.frozenWorldPerScreenX != null && e.frozenWorldPerScreenY != null ? {
    x: e.screenDelta.x * e.frozenWorldPerScreenX,
    y: e.screenDelta.y * e.frozenWorldPerScreenY
  } : e.fallbackWorld();
}

function qwi(e) {
  e.pending.forEach((t, n) => {
    let r = e.elements.get(n);
    cje(r, n) || (r = e.queryElement(n) ?? void 0, r && (e.elements.set(n, r), e.skipWillChange || (r.style.willChange = "transform"))), r && uje(r, t.x, t.y);
  });
}

function Kwi(e) {
  const t = new Map();
  for (const n of e.ids) {
    const r = e.getNode(n);
    r && t.set(n, e.getLive(n) ?? e.readDom(n, r));
  }
  return t;
}

function Qwi(e, t) {
  if (!t) for (const n of e) n.style.willChange = "transform";
}

const Uke = new Map();

let wye = 0;

const Ywi = 220;

function Ucr(e, t, n) {
  !(t > 0) || !(n > 0) || Uke.set(e, {
    width: t,
    height: n
  });
}

function iFt(e) {
  return Uke.get(e) ?? null;
}

function Xwi(e) {
  if (e) {
    Uke.delete(e);
    return;
  }
  wye += 1, Uke.clear();
}

function Ude(e, t) {
  const n = Array.from(e);
  if (n.length === 0) return;
  const r = wye,
    a = typeof requestAnimationFrame == "function" ? requestAnimationFrame : i => setTimeout(() => i(Date.now()), 0);
  a(() => {
    a(() => {
      r === wye && setTimeout(() => {
        r === wye && r === wye && n.forEach(i => Uke.delete(i));
      }, Ywi);
    });
  });
}

function qC(e) {
  const t = typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e;
  return document.querySelector(`[data-node-id="${t}"]`);
}

function ncn(e) {
  if (!e) return null;
  const t = parseFloat(e);
  return Number.isFinite(t) ? t : null;
}

function nkt(e, t, n) {
  var l;
  const r = n ?? qC(e);
  if (!r) return t;
  const a = ncn(r.style.left),
    i = ncn(r.style.top),
    o = a != null && i != null ? {
      x: a,
      y: i
    } : null,
    s = ((l = r.style.transform) == null ? void 0 : l.trim()) ?? "";
  if (s) {
    const d = s.match(/translate3d\(\s*([-\d.]+)px\s*,\s*([-\d.]+)px/i) || s.match(/translate\(\s*([-\d.]+)px\s*,\s*([-\d.]+)px/i);
    if (d) {
      const u = parseFloat(d[1]),
        h = parseFloat(d[2]);
      if (Number.isFinite(u) && Number.isFinite(h)) return Math.abs(u) < .01 && Math.abs(h) < .01 ? o ?? t : {
        x: u,
        y: h
      };
    }
  }
  return o ?? t;
}

function NJ(e, t, n) {
  const r = JE(e);
  return r ? {
    x: r.x,
    y: r.y
  } : nkt(e, t, n);
}

function rcn(e, t, n) {
  const r = NJ(e.id, {
      x: e.x,
      y: e.y
    }, n),
    a = Number.isFinite(e.width) ? e.width : 260,
    i = Number.isFinite(e.height) ? e.height : 200;
  return r.x < t.right && r.x + a > t.left && r.y < t.bottom && r.y + i > t.top;
}

function $cr(e, t) {
  const n = t ?? qC(e.id);
  n && (n.style.willChange = "", n.classList.remove("node-dragging-self"), n.style.transform = `translate3d(${e.x}px, ${e.y}px, 0)`);
}

function $ke(e) {
  e.forEach((t, n) => {
    const r = qC(n);
    r && (r.style.willChange = "", r.classList.remove("node-dragging-self"), r.style.transform = `translate3d(${t.x}px, ${t.y}px, 0)`);
  });
}

function acn(e) {
  typeof document > "u" || document.body.classList.contains("canvas-box-select-group-dragging") || document.body.classList.contains("canvas-node-dragging") || document.querySelectorAll(".node-dragging-self[data-node-id]").forEach(t => {
    const n = t.getAttribute("data-node-id");
    if (!n) return;
    const r = JE(n);
    if (r) {
      t.style.transform = `translate3d(${r.x}px, ${r.y}px, 0)`;
      return;
    }
    const a = e.find(i => i.id === n);
    a && $cr(a, t);
  });
}

function Kot(e) {
  if (!(typeof document < "u" && (document.body.classList.contains("canvas-box-select-group-dragging") || document.body.classList.contains("canvas-node-dragging")))) for (const t of e) {
    const n = JE(t.id),
      r = qC(t.id);
    if (!r) continue;
    if (n) {
      const l = r.style.transform,
        d = l == null ? void 0 : l.match(/translate3d\(([-\d.]+)px,\s*([-\d.]+)px/),
        u = d ? parseFloat(d[1]) : NaN,
        h = d ? parseFloat(d[2]) : NaN;
      (!Number.isFinite(u) || !Number.isFinite(h) || Math.abs(u - n.x) > .5 || Math.abs(h - n.y) > .5) && (r.style.transform = `translate3d(${n.x}px, ${n.y}px, 0)`);
      continue;
    }
    const a = r.style.transform;
    if (!a) continue;
    const i = a.match(/translate3d\(([-\d.]+)px,\s*([-\d.]+)px/);
    if (!i) continue;
    const o = parseFloat(i[1]),
      s = parseFloat(i[2]);
    !Number.isFinite(o) || !Number.isFinite(s) || (Math.abs(o - t.x) > .5 || Math.abs(s - t.y) > .5) && $cr(t, r);
  }
}

let qre = {
    x: 0,
    y: 0
  },
  VQ = "";

function oFt() {
  qre = {
    x: 0,
    y: 0
  }, VQ = "";
}

function Jwi(e) {
  return e.replace(/^translate3d\([^)]+\)\s*/, "").trim();
}

function Zwi(e) {
  var r;
  const t = ((r = e.style.transform) == null ? void 0 : r.trim()) ?? "";
  if (t) return t.startsWith("translate3d(") ? Jwi(t) : t;
  if (typeof window > "u") return "";
  const n = window.getComputedStyle(e).transform;
  return n === "none" ? "" : n;
}

function Gcr(e, t, n) {
  var a;
  let r = n && !n.startsWith("translate3d(") ? n : "";
  if (!r) if (VQ) r = VQ;else {
    const i = ((a = e.style.transform) == null ? void 0 : a.trim()) ?? "";
    i && !i.startsWith("translate3d(") && (r = i);
  }
  r && (VQ = r), e.style.transform = r ? `${t} ${r}` : t;
}

function R1e() {
  const e = document.querySelector("[data-box-select-bounds]"),
    t = document.querySelector("[data-box-select-toolbar]"),
    n = document.querySelector("[data-box-select-batch-connect]"),
    r = t ? Zwi(t) : "";
  return r && (VQ = r), {
    boundsEl: e,
    toolbarEl: t,
    batchConnectEl: n,
    toolbarBaseTransform: r
  };
}

function Vcr(e, t, n) {
  if (qre = {
    x: t,
    y: n
  }, !e) return;
  const r = `translate3d(${t}px, ${n}px, 0)`;
  e.boundsEl && (e.boundsEl.style.transform = r), e.batchConnectEl && (e.batchConnectEl.style.transform = r), e.toolbarEl && Gcr(e.toolbarEl, r, e.toolbarBaseTransform);
}

function Hcr() {
  if (qre.x === 0 && qre.y === 0) return !1;
  const e = document.querySelector("[data-box-select-bounds]"),
    t = document.querySelector("[data-box-select-toolbar]"),
    n = document.querySelector("[data-box-select-batch-connect]"),
    r = `translate3d(${qre.x}px, ${qre.y}px, 0)`;
  return e && (e.style.transform = r), n && (n.style.transform = r), t && Gcr(t, r, VQ), !0;
}

function exi(e) {
  oFt(), e != null && e.toolbarBaseTransform && (VQ = e.toolbarBaseTransform), e && (e.boundsEl && (e.boundsEl.style.willChange = "transform"), e.toolbarEl && (e.toolbarEl.style.willChange = "transform"), e.batchConnectEl && (e.batchConnectEl.style.willChange = "transform"));
}

function Wcr(e, t, n) {
  const r = Array.from(e),
    a = n.filter(i => r.includes(i.id)).map(i => {
      const o = t.get(i.id);
      return o ? {
        ...i,
        x: o.x,
        y: o.y
      } : i;
    });
  return a.length === 0 ? {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  } : pWe(r, a);
}

function txi(e, t) {
  e.style.left = `${t.x}px`, e.style.top = `${t.y}px`, e.style.width = `${t.width}px`, e.style.height = `${t.height}px`;
}

const qcr = 8,
  Kcr = 40;

function nxi(e, t) {
  e.style.left = `${t.x + t.width + qcr}px`, e.style.top = `${t.y + t.height / 2 - Kcr}px`;
}

function Qcr(e, t) {
  if (oFt(), !e) return;
  const {
    finalBounds: n
  } = t;
  e.boundsEl && (e.boundsEl.style.willChange = "", txi(e.boundsEl, n), e.boundsEl.style.transform = ""), e.batchConnectEl && (e.batchConnectEl.style.willChange = "", nxi(e.batchConnectEl, n), e.batchConnectEl.style.transform = ""), e.toolbarEl && (e.toolbarEl.style.willChange = "", Swt(e.toolbarEl, n));
}

function Pfe(e) {
  oFt(), e && (e.boundsEl && (e.boundsEl.style.willChange = "", e.boundsEl.style.transform = ""), e.batchConnectEl && (e.batchConnectEl.style.willChange = "", e.batchConnectEl.style.transform = ""), e.toolbarEl && (e.toolbarEl.style.willChange = "", e.toolbarEl.style.transform = e.toolbarBaseTransform || ""));
}

function rxi(e) {
  const t = e.replace("#", "");
  return [parseInt(t.slice(0, 2), 16) / 255, parseInt(t.slice(2, 4), 16) / 255, parseInt(t.slice(4, 6), 16) / 255];
}

function axi(e) {
  return Number.isFinite(e) && e > 0 ? 1 : 0;
}

let hje = null;

function icn(e) {
  hje = e;
}

function rkt(e, t) {
  hje == null || hje(e, t);
}

function ixi(e, t) {
  const [n, r, a] = rxi(e ? R7r : P7r),
    i = e ? j7r : N7r,
    o = Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 1;
  return [n, r, a, i * o];
}

function oxi(e, t) {
  const [n, r, a, i] = ixi(e, t);
  return `rgba(${Math.round(n * 255)}, ${Math.round(r * 255)}, ${Math.round(a * 255)}, ${i})`;
}

let Ycr = {
  view: oU(),
  cropSelectModeNodeId: null,
  nodes: [],
  focusEditVisionModelId: A_t().modelId,
  focusEditPlatformGroup: A_t().platformGroup
};

const sFt = {
  current: Ycr.cropSelectModeNodeId
};

new Map(Ycr.nodes.map(e => [e.id, e]));

const sxi = ["button:not(.connector)", "input", "textarea", "select", "a", '[contenteditable="true"]', '[data-scrollable="true"]', "[data-model-select-area]", "[data-gen-prompt-panel]", "[data-prompt-editor-area]", "[data-gen-version-gallery]", "[data-table-editor-scroll]", "[data-edit-image-bottom-panel]", "[data-edit-image-tools-toolbar]", "[data-edit-image-workspace]", "[data-edit-image-layers-panel]", "[data-eraser-tool-panel]", "[data-inpaint-crop-panel]", "[data-canvas-minimap]", "[data-canvas-viewport-bar]", "[data-canvas-bottom-left-dock]", "[data-canvas-navigator-stats]", "[data-free-split-modal]", "[data-grid-split-modal]", '[role="dialog"]', '[role="menu"]', ".node-dropdown-button", ".node-dropdown-menu", ".sidebar", ".toolbar"].join(","),
  lxi = [".connector", ".input-point", ".node-wrapper", ".node-input-connector-hit", ".node-output-connector-hit", "[data-box-select-drag-handle]", "[data-box-select-batch-connect]", "[data-group-output-connector]", "[data-stack-output-connector]", "[data-group-resize-handle]"].join(",");

function lFt(e) {
  return e instanceof Element ? !!e.closest(sxi) : !1;
}

function cxi(e) {
  return !(e instanceof Element) || lFt(e) ? !1 : !!e.closest(lxi);
}

function dxi(e) {
  if (!(e instanceof Element) || lFt(e)) return null;
  const t = e.closest("[data-node-id], .node-wrapper");
  return (t == null ? void 0 : t.getAttribute("data-node-id")) || null;
}

function uxi(e) {
  return e instanceof Element ? !!e.closest("#canvas-bg, .canvas-world, .node-wrapper") : !1;
}

let vJe = !1,
  cFt = !1;

function Qot() {
  vJe = !0;
}

function Yot() {
  vJe = !1;
}

function Xcr() {
  cFt = !0, vJe = !0;
}

function Xot() {
  cFt = !1;
}

function Kre() {
  return vJe || cFt;
}

function akt(e) {
  var t;
  return ((t = e.sourceCapabilities) == null ? void 0 : t.firesTouchEvents) === !0;
}

function Jcr(e, t = Kre()) {
  return !(e.buttons === void 0 || (e.buttons & 1) !== 0 || t || akt(e));
}

function Jot() {
  return sFt.current ? !0 : typeof document > "u" ? !1 : !!document.querySelector('[data-crop-select-mode="true"], [data-video-aspect-crop-panel], [data-image-aspect-crop-panel]');
}

const hxi = (e, t) => {
    VDe(t, e.x, e.y, e.zoom);
  },
  pxi = ({
    view: e,
    viewRef: t,
    selectionBoxDivRef: n,
    nodes: r,
    selectedNodeId: a,
    selectedNodeIds: i,
    selectedNodeIdsRef: o,
    selectedNodeIdRef: s,
    nodesRef: l,
    canvasRef: d,
    canvasContentRef: u,
    mousePosRef: h,
    isSelectingRef: p,
    multiNodeDragStartPos: m,
    connectingLineRef: f,
    connectingLineReverseRef: y,
    updateConnectingLineDOM: b,
    svgContainerRef: v,
    connectionsRef: _,
    visibleConnectionsRef: w,
    freezeAllVideos: k,
    unfreezeVideos: A,
    isDraggingGroupRef: S,
    isResizingGroupFrameRef: C,
    isDraggingSelectionBoundsRef: I,
    isDark: E = !1,
    collectionEndpointsRef: M,
    intraGroupConnectionIdsRef: T,
    groupsRef: P,
    snapToGrid: R = !1,
    canvasGridSpacing: j,
    followDownstreamOnDrag: B = !1,
    onAlignmentGuidesChange: F,
    isPanning: N,
    isSelecting: G,
    selectionBox: z,
    dragNodeId: V,
    resizingNodeId: O,
    resizeDirection: L,
    connectingSource: D,
    connectingTarget: U,
    connectingInputType: H,
    multiConnectingSourceIds: Y,
    multiConnectingTargetIds: K,
    frameContextMenu: W,
    historyContextMenu: Q,
    setView: q,
    setNodes: ne,
    setConnections: de,
    setSelectedNodeId: le,
    setSelectedNodeIds: J,
    setSelectedConnectionId: pe,
    onBoxSelectComplete: ce,
    onSelectionCleared: we,
    onClearGroupSelection: X,
    isPointInsideBoxSelection: Z,
    onBoxSelectionDragStart: re,
    onCancelBoxSelectGroupDrag: fe,
    onForceEndInteraction: ye,
    findGroupAtEmptyPoint: ie,
    onGroupEmptyAreaPointerDown: ae,
    onDropNodeOntoGroup: be,
    setIsPanning: Ee,
    setIsDragging: xe,
    setDragNodeId: he,
    setResizingNodeId: ue,
    setResizeDirection: ge,
    setIsSelecting: _e,
    setSelectionBox: ke,
    setMousePos: ve,
    setConnectingSource: Te,
    setConnectingTarget: Ne,
    setConnectingInputType: me,
    setMultiConnectingSourceIds: Ae,
    setMultiConnectingTargetIds: Fe,
    setContextMenu: Me,
    setSelectionContextMenu: Re,
    setFrameContextMenu: $e,
    setHistoryContextMenu: rt,
    onDismissCompactRefCanvasPick: nt,
    compactRefCanvasPickActive: ze = !1,
    generateId: Le,
    handleNodeDoubleClick: Ke,
    isZoomLocked: Xe = !1
  }) => {
    const De = g.useRef({
        x: 0,
        y: 0
      }),
      Ye = g.useRef(!1),
      Ce = g.useRef({
        x: 0,
        y: 0
      }),
      He = g.useRef(null);
    He.current = e;
    const Ve = g.useRef(null),
      it = g.useRef(!1),
      It = g.useRef(!1),
      Ft = g.useRef(Xe);
    Ft.current = Xe;
    const We = g.useRef(null),
      Ze = g.useRef({
        x: 0,
        y: 0
      }),
      Ge = t,
      Oe = g.useRef(null),
      st = g.useRef(null),
      vt = g.useRef(null),
      Ht = g.useRef(null),
      nn = g.useRef(null),
      pt = g.useRef(null),
      lt = g.useRef(!1),
      gt = g.useRef(null),
      Ut = g.useRef(null),
      _t = g.useRef(null),
      At = g.useRef(!1),
      Yt = g.useRef(new Set()),
      qe = g.useRef(null),
      kt = g.useRef(!1);
    kt.current = ze;
    const St = g.useRef(!1),
      hn = g.useRef(new Map()),
      Qt = g.useRef(null),
      Ot = g.useRef(null),
      ln = g.useRef(null),
      Pn = g.useRef(null),
      rn = g.useRef(new Set()),
      Yn = g.useRef(null),
      Ct = (tt, zt) => {
        Yn.current = tt, Pn.current === null && (Pn.current = requestAnimationFrame(() => {
          Pn.current = null;
          const an = Yn.current;
          Yn.current = null, an == null || an();
        }));
      },
      Cn = g.useRef(null),
      un = g.useRef(null),
      Jn = g.useRef(!1),
      Kn = g.useRef(null),
      en = g.useRef(null),
      Vn = g.useRef(null),
      Tt = g.useRef(() => {}),
      Ue = g.useRef(() => {}),
      et = g.useRef(performance.now()),
      ft = g.useRef(null),
      ht = g.useRef(!1),
      wt = g.useRef(null),
      jt = g.useRef(() => {}),
      {
        lastConnectingClientPosRef: bt,
        lastConnectHoverNodeIdRef: Bt,
        duplicateBlockedNodeIdsRef: wn,
        connectionMenuStickyRef: at,
        connectingSourceRef: Pt,
        connectingTargetRef: dt,
        connectingInputTypeRef: xt,
        multiConnectingSourceIdsRef: yn,
        multiConnectingTargetIdsRef: gn,
        connectingWireDraggingRef: mt,
        suppressConnectionMenuDismissClickRef: Xt,
        clearConnectionDropMenuState: Gn,
        isConnectionDropMenuHit: rr,
        resolveEventTargetElement: qn,
        stickConnectionDropMenu: Dn
      } = f1i({
        connectingSource: D,
        connectingTarget: U,
        connectingInputType: H,
        multiConnectingSourceIds: Y,
        multiConnectingTargetIds: K,
        groupsRef: P,
        nodesRef: l,
        canvasRef: d,
        viewRef: Ge,
        mousePosRef: h,
        connectingLineRef: f,
        connectingLineReverseRef: y,
        handleCanvasMouseMoveRef: Ue,
        handleCanvasMouseUpRef: Tt,
        setContextMenu: Me,
        updateConnectingLineDOM: b
      }),
      {
        isConnectionMenuActive: Ar,
        handleConnectionMouseUp: _r,
        finalizeReverseConnectionAfterDrag: Pa,
        handleConnectionBackgroundGuard: fa,
        handleConnectionBackgroundClick: Ca
      } = _1i({
        connectingSource: D,
        connectingTarget: U,
        connectingInputType: H,
        multiConnectingSourceIds: Y,
        multiConnectingTargetIds: K,
        canvasRef: d,
        nodesRef: l,
        nodeMapRef: hn,
        connectionsRef: _,
        groupsRef: P,
        isDraggingSelectionBoundsRef: I,
        lastConnectingClientPosRef: bt,
        connectionMenuStickyRef: at,
        connectingSourceRef: Pt,
        multiConnectingSourceIdsRef: yn,
        connectingWireDraggingRef: mt,
        suppressConnectionMenuDismissClickRef: Xt,
        resolveEventTargetElement: qn,
        stickConnectionDropMenu: Dn,
        clearConnectionDropMenuState: Gn,
        setNodes: ne,
        setConnections: de,
        setConnectingSource: Te,
        setConnectingTarget: Ne,
        setConnectingInputType: me,
        setMultiConnectingSourceIds: Ae,
        setMultiConnectingTargetIds: Fe,
        onAlignmentGuidesChange: F,
        generateId: Le
      });
    g.useEffect(() => {
      const tt = er => {
          ht.current = er.buttons !== 0 || er.button >= 0, et.current = performance.now();
        },
        zt = er => {
          ht.current = er.buttons !== 0, er.buttons !== 0 && (et.current = performance.now());
        },
        an = er => {
          ht.current = !1, et.current = performance.now();
        },
        Rn = er => {
          ht.current = er.buttons !== 0 || er.button >= 0, et.current = performance.now();
        },
        Un = er => {
          ht.current = !1, et.current = performance.now();
        };
      return window.addEventListener("pointerdown", tt, !0), window.addEventListener("pointermove", zt, !0), window.addEventListener("pointerup", an, !0), window.addEventListener("pointercancel", an, !0), window.addEventListener("mousedown", Rn, !0), window.addEventListener("mouseup", Un, !0), () => {
        window.removeEventListener("pointerdown", tt, !0), window.removeEventListener("pointermove", zt, !0), window.removeEventListener("pointerup", an, !0), window.removeEventListener("pointercancel", an, !0), window.removeEventListener("mousedown", Rn, !0), window.removeEventListener("mouseup", Un, !0);
      };
    }, []);
    const $n = g.useRef(null),
      yr = tt => {
        HVe(tt, tt ? Ge.current : void 0);
      },
      Ir = g.useRef(!1),
      Gr = tt => {
        var zt;
        Ir.current !== tt && (Ir.current = tt, (zt = d.current) == null || zt.querySelectorAll("[data-gen-prompt-panel-host]").forEach(an => {
          an.classList.toggle("canvas-pan-hidden", tt);
        })), typeof document < "u" && !tt && document.body.classList.contains("canvas-pan-lite") && document.body.classList.remove("canvas-pan-lite");
      },
      Zr = tt => {
        yr(tt), Gr(tt);
      },
      La = g.useRef(() => {});
    La.current = (tt, zt) => {
      if (!Ye.current || it.current) return;
      const an = Ge.current,
        Rn = eTr({
          origin: vt.current,
          view: an,
          clientX: tt,
          clientY: zt,
          lastMouse: De.current
        });
      Rn && (an.x = Rn.x, an.y = Rn.y, Rn.lastMouse && (De.current.x = Rn.lastMouse.x, De.current.y = Rn.lastMouse.y), VDe(u.current, an.x, an.y, an.zoom), rkt(an.x, an.y), E4n(an));
    };
    const sa = g.useRef(""),
      Ea = g.useRef(null),
      ba = g.useRef(null),
      ga = () => {
        const tt = ba.current;
        ba.current = null, tt && mt.current && d1i(l.current, tt.worldX, tt.worldY, tt.wireState, Bt);
      };
    g.useEffect(() => () => {
      Ea.current != null && cancelAnimationFrame(Ea.current), Ea.current = null, ba.current = null;
    }, []);
    const _a = (tt, zt, an) => {
        ba.current = {
          worldX: tt,
          worldY: zt,
          wireState: an
        }, Ea.current == null && (Ea.current = requestAnimationFrame(() => {
          Ea.current = null, ga();
        }));
      },
      $a = g.useRef(() => {});
    $a.current = tt => {
      et.current = performance.now();
      const zt = tTr({
        mouseUpFired: it.current,
        isPanning: Ye.current,
        pendingStart: st.current,
        isMiddleMouse: lt.current,
        buttons: tt.buttons,
        clientX: tt.clientX,
        clientY: tt.clientY,
        ignoreReleasedButtons: Kre() || akt(tt)
      });
      if (!(zt.type === "ignore" || zt.type === "wait-slop")) {
        if (zt.type === "release") {
          Tt.current(void 0);
          return;
        }
        if (zt.type === "begin") {
          st.current = null;
          const an = Ht.current;
          Ht.current = null, _n.current({
            clientX: tt.clientX,
            clientY: tt.clientY,
            deltaX: zt.dx,
            deltaY: zt.dy,
            protectedNodeId: an
          });
          return;
        }
        La.current(tt.clientX, tt.clientY);
      }
    };
    const Ya = g.useRef(null);
    Ya.current === null && (Ya.current = Dwi({
      target: window,
      onMove: tt => $a.current(tt)
    }));
    const ta = Ya.current,
      ki = () => ta.attachMove(),
      Wn = () => ta.detachMove(),
      wr = () => {
        Oe.current != null && (cancelAnimationFrame(Oe.current), Oe.current = null);
      },
      jn = tt => {
        GVe(Ge.current), Ye.current = !0, it.current = !1, XC(!0, {
          skipNotify: !0
        }), aFt(), Rl() && xv(!1, {
          skipDeferredFlush: !0,
          skipNotify: !0
        }), $re(!0), nn.current != null && (cancelAnimationFrame(nn.current), nn.current = null), Dsn(pt.current), vt.current || (vt.current = ZEr(Ge.current, {
          x: tt.clientX,
          y: tt.clientY
        }, {
          x: tt.deltaX ?? 0,
          y: tt.deltaY ?? 0
        })), De.current.x = tt.clientX, De.current.y = tt.clientY, Gr(!0), La.current(tt.clientX, tt.clientY), yr(!0), ki(), wr();
        const zt = tt.protectedNodeId ?? null;
        Oe.current = requestAnimationFrame(() => {
          Oe.current = null, !(!Ye.current || it.current) && zt && Iot(zt);
        });
      },
      _n = g.useRef(jn);
    _n.current = jn;
    const ar = g.useRef(!1),
      Vt = g.useRef(0),
      vn = g.useRef(null),
      An = 1200,
      ur = g.useCallback(() => {
        const tt = performance.now();
        Vt.current = tt, vn.current != null && (clearTimeout(vn.current), vn.current = null), vn.current = window.setTimeout(() => {
          vn.current = null, ar.current && Vt.current === tt && (ar.current = !1, Vt.current = 0);
        }, An);
      }, []);
    g.useEffect(() => {
      if (V) {
        ar.current = !1;
        const tt = Ge.current;
        Ve.current = tt ? {
          x: tt.x,
          y: tt.y,
          zoom: tt.zoom
        } : null;
      } else Ve.current = null;
    }, [V]);
    const zr = g.useRef(null),
      Dr = g.useRef(null),
      Wr = g.useRef(new Map()),
      gr = g.useRef(null),
      jr = g.useRef(null),
      ea = g.useRef(null),
      pa = g.useRef(0),
      Br = kFn();
    AFn();
    const tn = g.useCallback(() => Osa(Br), [Br]),
      Lr = g.useCallback(tt => {
        const zt = new Set([tt]),
          an = [tt],
          Rn = [],
          Un = _.current || [];
        for (; an.length > 0;) {
          const er = an.shift();
          for (const Cr of Un) {
            if (Cr.from !== er) continue;
            const tr = Cr.to;
            zt.has(tr) || (zt.add(tr), Rn.push(tr), an.push(tr));
          }
        }
        return Rn;
      }, [_]),
      br = g.useCallback((tt, zt) => {
        if (!!!(un.current || V)) {
          const Un = Date.now(),
            er = tn();
          if (Un - pa.current < er) return;
          pa.current = Un;
        }
        const Rn = BL(w.current, _.current);
        if (tt) {
          zt && R1(tt, zt.x, zt.y), IDr(tt, Rn, Ge.current, v.current, M == null ? void 0 : M.current, zt, T == null ? void 0 : T.current);
          return;
        }
        Nj(Rn, Ge.current, v.current, void 0, tt, zt, M == null ? void 0 : M.current, void 0, T == null ? void 0 : T.current);
      }, [V, tn, w, _, M, T, v]),
      Jr = g.useRef(null),
      Kr = g.useRef(null),
      ir = g.useRef(null),
      Hr = g.useRef(null),
      ha = g.useRef(null),
      Ga = g.useRef(null),
      Za = g.useRef(!1);
    g.useEffect(() => {
      Rl() || jl() || dHt(e, Ge.current) || (Ge.current = {
        x: e.x,
        y: e.y,
        zoom: e.zoom
      });
    }, [e.x, e.y, e.zoom]), g.useEffect(() => {
      Ga.current = O, O && (Za.current = !1), O ? ir.current = qC(O) : ir.current = null;
    }, [O]), g.useEffect(() => {
      const tt = new Map();
      for (const zt of r) tt.set(zt.id, zt);
      hn.current = tt;
    }, [r]);
    const va = g.useCallback((tt, zt) => {
        const an = {
          left: zt.left,
          top: zt.top,
          width: zt.width,
          height: zt.height,
          el: tt
        };
        return qe.current = an, C5t(tt, an), an;
      }, []),
      Kt = g.useCallback((tt = !0) => {
        var er;
        const zt = qe.current;
        if ((er = zt == null ? void 0 : zt.el) != null && er.isConnected) return zt;
        const an = d.current,
          Rn = dY(an);
        if (Rn) return qe.current = Rn, Rn;
        if (!tt || jl() || Yi() || wae() || kbt() || f$()) return null;
        const Un = an == null ? void 0 : an.getBoundingClientRect();
        return an && Un ? va(an, Un) : null;
      }, [d, va]),
      Pr = g.useCallback(() => {
        const tt = qe.current;
        if (tt && tt.el && !tt.el.isConnected && (qe.current = null), qe.current) return;
        const zt = d.current,
          an = zt == null ? void 0 : zt.getBoundingClientRect();
        zt && an && va(zt, an);
      }, [d, va]),
      kr = g.useCallback(() => {
        qe.current = null, LEr();
      }, []);
    g.useEffect(() => {
      var kn;
      let tt = 0;
      const zt = () => {
          if (jl() || Yi() || wae() || Av() || kbt()) return;
          const xn = d.current;
          if (!xn) return;
          const Fn = xn.getBoundingClientRect();
          Fn && va(xn, Fn);
        },
        an = () => {
          tt || (tt = requestAnimationFrame(() => {
            tt = 0, zt();
          }));
        };
      let Rn = null;
      const Un = () => {
          const xn = d.current,
            Fn = Rn;
          Rn = null;
          const cr = qe.current;
          if (xn && Fn && Fn.width > 0 && Fn.height > 0 && (cr == null ? void 0 : cr.el) === xn) {
            va(xn, {
              left: cr.left,
              top: cr.top,
              width: Fn.width,
              height: Fn.height
            });
            return;
          }
          zt();
        },
        er = () => {
          tFt();
        },
        Cr = Scr(Un);
      window.addEventListener("resize", er);
      let tr = null;
      if (typeof ResizeObserver < "u") {
        const xn = ((kn = d.current) == null ? void 0 : kn.parentElement) ?? null;
        xn && (tr = new ResizeObserver(Fn => {
          var vr;
          const cr = (vr = Fn[0]) == null ? void 0 : vr.contentRect;
          if (cr && f$()) {
            Rn = {
              width: cr.width,
              height: cr.height
            };
            return;
          }
          Rn = null, an();
        }), tr.observe(xn));
      }
      return () => {
        window.removeEventListener("resize", er), Cr(), tt && cancelAnimationFrame(tt), tr == null || tr.disconnect();
      };
    }, [d, va]);
    const Mr = g.useCallback(() => {}, []),
      Hn = g.useCallback((tt, zt = !1) => {
        const an = d.current;
        an && (an.classList.toggle("canvas-panning", tt && !zt), an.classList.toggle("canvas-local-panning", tt && zt));
      }, [d]);
    g.useCallback((tt, zt) => {
      const an = qe.current ?? Kt();
      return UDe(tt, zt, {
        left: (an == null ? void 0 : an.left) ?? 0,
        top: (an == null ? void 0 : an.top) ?? 0,
        width: an == null ? void 0 : an.width,
        height: an == null ? void 0 : an.height
      }, d.current);
    }, [d]);
    const $t = g.useCallback((tt, zt) => {
      const an = hMe();
      if (!an) return null;
      const Rn = qe.current ?? Kt();
      if (!Rn) return null;
      const Un = Ge.current,
        er = B8(tt, zt, {
          left: Rn.left,
          top: Rn.top,
          width: Rn.width,
          height: Rn.height
        }, Un, d.current);
      return an.hitTestWorld(er.x, er.y, Un.zoom);
    }, [d, Kt, Ge]);
    g.useEffect(() => {
      if (N) return;
      const tt = Kt(),
        zt = l.current;
      if (!(tt != null && tt.width) || !(zt != null && zt.length)) return;
      const an = requestAnimationFrame(() => {
        kDr(Ge.current, tt.width, tt.height, zt, {});
      });
      return () => cancelAnimationFrame(an);
    }, [N, Kt, l, Ge]);
    const je = g.useCallback(tt => {
        var Rn;
        if (tt.preventDefault(), tt.stopPropagation(), tt.target.closest('.node-wrapper, .connector, button, input, textarea, select, [contenteditable="true"], .node-dropdown-button, .node-dropdown-menu, [data-model-select-area], [data-edit-image-bottom-panel], [data-edit-image-tools-toolbar], [data-edit-image-layers-panel], [data-eraser-tool-panel], [data-connection-drop-menu]') || jl() || Yi()) return;
        const an = $t(tt.clientX, tt.clientY);
        an && ((Rn = hMe()) == null || Rn.delete(an));
      }, [$t]),
      Qe = g.useCallback(() => {
        s && (s.current = null), o.current = new Set(), j5(o.current), le(null), J(new Set()), Yt.current = new Set(), tje(), we == null || we();
      }, [we, s, o, le, J]),
      Mt = g.useCallback(() => {
        nn.current != null && (cancelAnimationFrame(nn.current), nn.current = null);
        const tt = pt.current;
        tt && (pt.current = null, Ypi(), tt.clearNodes && !Jot() && Qe(), tt.clearGroups && (X == null || X()), tt.clearConnection && (pe == null || pe(null)));
      }, [Qe, X, pe]);
    g.useEffect(() => {
      const tt = zt => {
        sFt.current = zt.detail ?? null;
      };
      return window.addEventListener("cropSelectModeChange", tt), () => window.removeEventListener("cropSelectModeChange", tt);
    }, []);
    const cn = g.useCallback((tt, zt) => {
        var kn, xn, Fn;
        At.current = !1, fe == null || fe(), I && (I.current = !1), ar.current = !1, yP({
          force: !0
        }), d7(), document.body.classList.remove("canvas-node-dragging"), document.body.classList.remove("canvas-box-select-group-dragging"), (kn = document.getElementById("canvas-bg")) == null || kn.classList.remove("canvas-node-dragging", "canvas-box-select-group-dragging"), Pfe(R1e());
        const an = new Set();
        un.current && an.add(un.current), V && an.add(V), o.current.forEach(cr => an.add(cr)), (xn = Qt.current) == null || xn.forEach((cr, vr) => an.add(vr));
        const Rn = m.current;
        if ((Fn = Rn == null ? void 0 : Rn.nodes) == null || Fn.forEach((cr, vr) => an.add(vr)), an.size > 0) {
          const cr = new Map(l.current.map(Wt => [Wt.id, Wt])),
            vr = Owi({
              ids: an,
              getNode: Wt => cr.get(Wt),
              getPending: Wt => {
                var Jt;
                return (Jt = Qt.current) == null ? void 0 : Jt.get(Wt);
              },
              getLive: Wt => JE(Wt),
              readDom: (Wt, Jt) => nkt(Wt, Jt)
            });
          vr.size > 0 && (vr.forEach((Wt, Jt) => {
            R1(Jt, Wt.x, Wt.y);
          }), l.current = ecn(l.current, vr), Da.flushSync(() => {
            ne(Wt => ecn(Wt, vr));
          }), $ke(vr));
        }
        HN(), (V || un.current) && (he(null), un.current = null, xe(!1), Cn.current && (Cn.current.style.willChange = "", Cn.current = null), m.current = null, Wr.current.clear(), gr.current && (Pfe(gr.current), gr.current = null), Qt.current = null, document.body.classList.remove("canvas-node-dragging"), d7(), oM()), Ee(!1), Ye.current = !1, _e(!0), p.current = !0, Pr();
        const Un = Kt(),
          er = B8(tt, zt, {
            left: (Un == null ? void 0 : Un.left) ?? 0,
            top: (Un == null ? void 0 : Un.top) ?? 0,
            width: Un == null ? void 0 : Un.width,
            height: Un == null ? void 0 : Un.height
          }, oet(Ge.current), d.current),
          Cr = er.x,
          tr = er.y;
        _t.current = {
          startX: Cr,
          startY: tr
        }, Ut.current = {
          endX: Cr,
          endY: tr
        }, ke({
          startX: Cr,
          startY: tr,
          endX: Cr,
          endY: tr
        }), Qe(), X == null || X(), pe == null || pe(null), k == null || k(), Aj({
          skipBodyClass: ei()
        }), requestAnimationFrame(() => {
          const cr = n == null ? void 0 : n.current,
            vr = _t.current,
            Wt = Ut.current;
          cr && vr && Wt && Jln(cr, vr, Wt);
        });
      }, [Pr, d, Qe, V, k, Kt, p, I, m, l, fe, X, o, n, he, xe, Ee, _e, pe, ke, ne, Ge]),
      Qn = g.useCallback(tt => {
        var kn, xn, Fn, cr, vr;
        if (It.current || Kre()) return;
        const zt = "pointerType" in tt.nativeEvent ? tt.nativeEvent.pointerType : void 0;
        if (!Fcr(tt.button, zt) || yMe(tt.clientX, tt.clientY)) return;
        et.current = performance.now();
        const an = tt.target,
          Rn = dwi(an),
          Un = typeof document < "u" ? document.getElementById("canvas-bg") : null,
          er = uwi({
            panPending: Av(),
            panningClass: !!(Un != null && Un.classList.contains("canvas-panning")),
            localPanningClass: !!(Un != null && Un.classList.contains("canvas-local-panning")),
            viewportInteractingClass: !!(Un != null && Un.classList.contains("canvas-viewport-interacting")),
            zooming: Rl()
          }),
          Cr = $n.current,
          tr = E1i(Cr, {
            button: tt.button,
            clientX: tt.clientX,
            clientY: tt.clientY,
            now: performance.now()
          });
        if (Cr && ($n.current = null), hwi({
          tokenMatch: tr,
          fromShield: Rn,
          originalNode: !!((kn = an == null ? void 0 : an.closest) != null && kn.call(an, ".node-wrapper")),
          leftoverBlockers: er
        })) {
          yr(!1);
          const Wt = qe.current ?? dY(Un),
            Jt = Ge.current,
            Nn = Jt.zoom > 0 ? Jt.zoom : 1;
          let En = null;
          if (Wt && d.current) {
            const Bn = (tt.clientX - Wt.left - Jt.x) / Nn,
              Et = (tt.clientY - Wt.top - Jt.y) / Nn,
              zn = l.current;
            for (let Mn = zn.length - 1; Mn >= 0; Mn--) {
              const or = zn[Mn],
                mr = or.width ?? 260,
                Yr = or.height ?? 200;
              if (Bn < or.x || Bn > or.x + mr || Et < or.y || Et > or.y + Yr) continue;
              const aa = typeof CSS < "u" && CSS.escape ? CSS.escape(or.id) : or.id;
              En = d.current.querySelector(`.node-wrapper[data-node-id="${aa}"]`);
              break;
            }
          }
          const Zn = En,
            Sr = (xn = an == null ? void 0 : an.closest) == null ? void 0 : xn.call(an, ".node-wrapper");
          if (cwi({
            recoveredNode: En,
            originalNode: Sr,
            canvasContainsRecovered: !!((Fn = d.current) != null && Fn.contains(En))
          })) {
            Rl() && !Ye.current && !jl() && xv(!1, {
              skipDeferredFlush: !0
            }), tt.preventDefault(), tt.stopPropagation(), Zn == null || Zn.dispatchEvent(new MouseEvent("mousedown", {
              bubbles: !0,
              cancelable: !0,
              view: window,
              button: 0,
              buttons: 1,
              clientX: tt.clientX,
              clientY: tt.clientY,
              screenX: tt.screenX,
              screenY: tt.screenY,
              ctrlKey: tt.ctrlKey,
              shiftKey: tt.shiftKey,
              altKey: tt.altKey,
              metaKey: tt.metaKey
            }));
            return;
          }
        }
        if (tt.currentTarget.id === "canvas-bg") {
          const Wt = tt.target;
          We.current = {
            x: tt.clientX,
            y: tt.clientY
          };
          const Jt = oet(Ge.current),
            Nn = !!Wt.closest(".node-wrapper"),
            En = !!((cr = window.getSelection()) != null && cr.toString().length);
          if (pwi({
            overGroupResizeHandle: !!Wt.closest("[data-group-resize-handle]"),
            hasTextSelection: En,
            overNode: Nn
          })) {
            typeof window < "u" && window.dispatchEvent(new CustomEvent("canvasActivity"));
            return;
          }
          if (!Nn) {
            const wa = document.activeElement;
            wa && (wa.tagName === "TEXTAREA" || wa.tagName === "INPUT" || wa.tagName === "SELECT" || wa.isContentEditable) && (wa.closest(".node-wrapper") || wa.classList.contains("project-name-input")) && wa.blur(), En && ((vr = window.getSelection()) == null || vr.removeAllRanges());
          }
          const Zn = {
              button: tt.button,
              ctrlOrMeta: tt.ctrlKey || tt.metaKey,
              compactRefPickActive: kt.current,
              overRefPickBlock: !!Wt.closest(awi),
              overGenPrompt: Hln(Wt, tt.clientX, tt.clientY),
              overInteractive: !!Wt.closest(iwi),
              overFormControl: !!(Wt.tagName === "INPUT" || Wt.tagName === "TEXTAREA" || Wt.tagName === "SELECT" || Wt.tagName === "BUTTON" || Wt.isContentEditable || Wt.closest(owi)),
              overNode: Nn,
              overConnector: !!Wt.closest(".connector"),
              overImageReorder: !!Wt.closest("[data-image-reorder-thumb]"),
              isDraggingGroup: !!(S != null && S.current),
              isResizingGroup: !!(C != null && C.current),
              isDraggingSelectionBounds: !!(I != null && I.current),
              overBoxSelectHandle: !!Wt.closest("[data-box-select-drag-handle]"),
              overGroupUi: !!Wt.closest(lwi),
              overGroupEmptyBlock: !!Wt.closest(swi)
            },
            Sr = Wln({
              ...Zn,
              insideBoxSelection: !1,
              groupIdAtEmpty: null,
              hadSelection: !1
            });
          if (Sr.type === "ignore") return;
          if (Sr.type === "marquee") {
            const wa = Osn();
            wa && Iot(wa), hP(null), tt.preventDefault(), cn(tt.clientX, tt.clientY);
            return;
          }
          Pr();
          const Bn = qe.current,
            Et = (tt.clientX - ((Bn == null ? void 0 : Bn.left) ?? 0) - Jt.x) / Jt.zoom,
            zn = (tt.clientY - ((Bn == null ? void 0 : Bn.top) ?? 0) - Jt.y) / Jt.zoom,
            Mn = !!(Z && Z(Et, zn)),
            or = ie ? ie(Et, zn) : null,
            mr = a != null || i.size > 0 || o.current.size > 0,
            Yr = Wln({
              ...Zn,
              insideBoxSelection: Mn,
              groupIdAtEmpty: or,
              hadSelection: mr
            });
          if (Yr.type === "ignore") return;
          const aa = Osn();
          if (aa && Iot(aa), hP(null), Yr.type === "marquee") {
            tt.preventDefault(), cn(tt.clientX, tt.clientY);
            return;
          }
          if (Yr.type === "box-drag" && re) {
            re(tt.clientX, tt.clientY, {
              altKey: tt.altKey
            }), tt.preventDefault();
            return;
          }
          if (Yr.type === "group-drag" && ae) {
            ae(Yr.groupId, tt.clientX, tt.clientY), tt.preventDefault();
            return;
          }
          tt.preventDefault(), it.current = !1, st.current = {
            x: tt.clientX,
            y: tt.clientY
          }, Ht.current = null, De.current.x = tt.clientX, De.current.y = tt.clientY, vt.current = {
            viewX: Ge.current.x,
            viewY: Ge.current.y,
            clientX: tt.clientX,
            clientY: tt.clientY
          }, Pr(), Gln(), yr(!0), ki(), kt.current || (nn.current != null && (cancelAnimationFrame(nn.current), nn.current = null), pt.current = {
            clearNodes: Jot() ? !1 : Yr.type === "pending-pan" ? Yr.clearNodes : mr && !Mn,
            clearGroups: Yr.type === "pending-pan" ? Yr.clearGroups : !Zn.overGroupUi,
            clearConnection: !0
          }, Dsn(pt.current));
        }
      }, [d, p, S, C, I, a, i, o, V, xe, he, _e, ke, pe, Pr, Z, re, fe, ie, ae, cn]);
    g.useEffect(() => {
      const tt = zt => {
        zt.button === 1 && (lje() || yMe(zt.clientX, zt.clientY) || (zt.preventDefault(), zt.stopPropagation(), lt.current = !0, st.current = null, Ht.current = null, p.current && (p.current = !1, _t.current = null, Ut.current = null, Yt.current = new Set(), tje(), _e(!1), ke(null)), Pr(), _n.current({
          clientX: zt.clientX,
          clientY: zt.clientY
        })));
      };
      return window.addEventListener("mousedown", tt, !0), () => window.removeEventListener("mousedown", tt, !0);
    }, [Pr, _e, ke]), g.useEffect(() => {
      const tt = () => {
          lje() && (st.current || lt.current || Ye.current) && Tt.current(void 0);
        },
        zt = an => {
          an.detail && tt();
        };
      return window.addEventListener("freeSplitModalChange", zt), window.addEventListener("gridSplitModalChange", zt), () => {
        window.removeEventListener("freeSplitModalChange", zt), window.removeEventListener("gridSplitModalChange", zt);
      };
    }, []);
    const Lt = g.useCallback(tt => {
      var an, Rn, Un;
      if (D || U || tt.__handledByNode || tt.__handledByContent || tt.nativeEvent.__handledByContent || tt.defaultPrevented || tt.isPropagationStopped()) return;
      const zt = tt.target;
      if (!(Hln(zt, tt.clientX, tt.clientY) || zt.closest(".sidebar") || zt.closest(".toolbar") || zt.closest(".sketch-toolbar") || TUe(zt) || zt.closest(".panel") || zt.closest("button") || zt.closest("input") || zt.closest("select") || zt.closest("textarea") || zt.closest('[role="dialog"]') || zt.closest('[role="menu"]')) && tt.currentTarget.id === "canvas-bg") {
        const er = tt.target,
          Cr = er.closest(".node-wrapper"),
          tr = er.closest("[data-node-id]"),
          kn = er.closest("[data-node-type]");
        if (Cr || tr || kn) {
          const Jt = (Cr == null ? void 0 : Cr.getAttribute("data-node-id")) || (tr == null ? void 0 : tr.getAttribute("data-node-id")) || (kn == null ? void 0 : kn.getAttribute("data-node-id"));
          if (Jt) {
            const Nn = hn.current.get(Jt),
              En = (Nn == null ? void 0 : Nn.settings) || {},
              Zn = Nn && (Nn.type === "gen-image" || Nn.type === "gen-video") && En.compactImageWidget !== !1,
              Sr = (Nn == null ? void 0 : Nn.type) === "preview",
              Bn = (Nn == null ? void 0 : Nn.type) === "input-image";
            if (Zn && (er.closest("[data-compact-gen-preview]") || er.closest("[data-gen-version-gallery]")) || (Zn || Sr || Bn) && y2e()) return;
            if (Zn && Nn && Ke) {
              Ke({
                id: Nn.id,
                type: Nn.type,
                content: Nn.content,
                settings: Nn.settings
              });
              return;
            }
            if (Bn && Nn.content && Ke) {
              Ke({
                id: Nn.id,
                type: Nn.type,
                content: Nn.content,
                settings: Nn.settings
              });
              return;
            }
            if (Sr && Nn.content && Ke) {
              Ke({
                id: Nn.id,
                type: Nn.type,
                content: Nn.content,
                settings: Nn.settings
              });
              return;
            }
          }
          return;
        }
        if (er === tt.currentTarget || er.id === "canvas-bg") {
          const Jt = (an = d.current) == null ? void 0 : an.getBoundingClientRect();
          if (!Jt) return;
          const Nn = B8(tt.clientX, tt.clientY, {
              left: Jt.left,
              top: Jt.top,
              width: Jt.width,
              height: Jt.height
            }, Ge.current, d.current),
            En = Nn.x,
            Zn = Nn.y;
          let Sr;
          for (const Bn of hn.current.values()) if (En >= Bn.x && En <= Bn.x + Bn.width && Zn >= Bn.y && Zn <= Bn.y + Bn.height) {
            Sr = Bn;
            break;
          }
          if (Sr) {
            const Bn = Sr.settings || {},
              Et = (Sr.type === "gen-image" || Sr.type === "gen-video") && Bn.compactImageWidget !== !1,
              zn = Sr.type === "preview",
              Mn = Sr.type === "input-image";
            if ((Et || zn || Mn) && y2e()) return;
            Sr.content && Ke && Ke({
              id: Sr.id,
              type: Sr.type,
              content: Sr.content,
              settings: Sr.settings
            });
            return;
          }
        }
        const xn = $t(tt.clientX, tt.clientY);
        if (xn) {
          tt.preventDefault(), tt.stopPropagation(), (Rn = hMe()) == null || Rn.delete(xn);
          return;
        }
        const Fn = (Un = d.current) == null ? void 0 : Un.getBoundingClientRect();
        if (!Fn) return;
        const cr = B8(tt.clientX, tt.clientY, {
            left: Fn.left,
            top: Fn.top,
            width: Fn.width,
            height: Fn.height
          }, Ge.current, d.current),
          vr = cr.x,
          Wt = cr.y;
        Me({
          visible: !0,
          x: tt.clientX,
          y: tt.clientY,
          worldX: vr,
          worldY: Wt
        });
      }
    }, [d, Me, l, D, U, $t, Ge]);
    d.current;
    const ct = g.useCallback(tt => {
      var Cr, tr;
      if (yMe(tt.clientX, tt.clientY)) return;
      et.current = performance.now();
      const zt = Ge.current,
        an = Bcr({
          connectingSource: Pt.current,
          connectingTarget: dt.current,
          multiConnectingSourceIds: yn.current ?? null,
          multiConnectingTargetIds: gn.current ?? null
        }),
        Rn = mwi({
          draggingSelectionBounds: !!(I != null && I.current),
          isPanning: Ye.current,
          isWireDrag: an,
          panWindowMoveAttached: ta.isMoveAttached(),
          pendingPan: !!st.current,
          draggingGroup: !!(S != null && S.current)
        });
      if (Rn.type === "ignore") return;
      if (Rn.type === "pan-live-schedule") {
        La.current(tt.clientX, tt.clientY);
        return;
      }
      if (Rn.type === "pan-pending") {
        const kn = st.current;
        if (!kn) return;
        const xn = tt.clientX - kn.x,
          Fn = tt.clientY - kn.y;
        if (D5t(xn, Fn)) {
          st.current = null;
          const cr = Ht.current;
          Ht.current = null, _n.current({
            clientX: tt.clientX,
            clientY: tt.clientY,
            deltaX: xn,
            deltaY: Fn,
            protectedNodeId: cr
          });
        }
        return;
      }
      const Un = Kt(!1);
      if (Un) {
        const kn = B8(tt.clientX, tt.clientY, {
          left: Un.left,
          top: Un.top,
          width: Un.width,
          height: Un.height
        }, zt, d.current);
        let xn = kn.x,
          Fn = kn.y;
        const cr = Pt.current,
          vr = dt.current,
          Wt = xt.current,
          Jt = yn.current,
          Nn = gn.current;
        if (an && !at.current) {
          const En = `${tt.clientX}|${tt.clientY}`;
          if (sa.current === En) return;
          sa.current = En;
          const Zn = S1i({
            worldX: xn,
            worldY: Fn,
            zoom: zt.zoom,
            canvasEl: d.current,
            nodes: l.current,
            connections: _.current || [],
            sourceId: cr ?? null,
            targetId: vr ?? null,
            inputType: Wt ?? null,
            multiSourceIds: Jt,
            multiTargetIds: Nn
          });
          xn = Zn.worldX, Fn = Zn.worldY, h.current = {
            x: xn,
            y: Fn
          }, wn.current = Zn.blockedIds, _a(xn, Fn, Zn.wireState);
        } else at.current || (h.current = {
          x: xn,
          y: Fn
        });
        !at.current && ekt({
          sourceId: cr,
          targetId: vr,
          multiSourceIds: Jt,
          multiTargetIds: Nn,
          worldX: xn,
          worldY: Fn,
          getNode: En => hn.current.get(En),
          groups: (P == null ? void 0 : P.current) ?? [],
          nodes: l.current,
          connectingLine: f.current,
          connectingLineReverse: y.current,
          updateConnectingLineDOM: b
        }) && (bt.current = {
          x: tt.clientX,
          y: tt.clientY
        });
      }
      if (G || p.current) {
        const kn = tt;
        if (kn.buttons !== void 0 && (kn.buttons & 1) === 0 && !Kre() && !akt(kn)) {
          Tt.current(void 0);
          return;
        }
        const xn = Kt(),
          Fn = B8(tt.clientX, tt.clientY, {
            left: (xn == null ? void 0 : xn.left) ?? 0,
            top: (xn == null ? void 0 : xn.top) ?? 0,
            width: xn == null ? void 0 : xn.width,
            height: xn == null ? void 0 : xn.height
          }, oet(Ge.current), d.current);
        if (Ut.current = {
          endX: Fn.x,
          endY: Fn.y
        }, n != null && n.current) gt.current || (gt.current = requestAnimationFrame(() => {
          gt.current = null;
          const cr = Ut.current,
            vr = _t.current,
            Wt = n == null ? void 0 : n.current;
          if (!cr || !vr || !Wt) return;
          Jln(Wt, vr, cr);
          const Jt = qln({
            startFromRef: vr,
            endFromRef: cr,
            selectionBox: null
          });
          if (!Jt) return;
          const Nn = Pyt(Kln(l.current, Aln(P == null ? void 0 : P.current), Jt, rcn), l.current, (P == null ? void 0 : P.current) ?? [], Jt);
          Yt.current = rmi(Yt.current, Nn);
        }));else if (z) ke({
          ...z,
          endX: Fn.x,
          endY: Fn.y
        });else {
          const cr = _t.current;
          cr && ke({
            startX: cr.startX,
            startY: cr.startY,
            endX: Fn.x,
            endY: Fn.y
          });
        }
        return;
      }
      const er = un.current || V;
      if (er) {
        const kn = tt,
          xn = tt.nativeEvent;
        if (Jcr({
          buttons: kn.buttons,
          sourceCapabilities: (xn == null ? void 0 : xn.sourceCapabilities) ?? kn.sourceCapabilities
        }, It.current || Kre())) {
          Tt.current(void 0);
          return;
        }
        if (kn.buttons !== void 0 && (kn.buttons & 1) === 0) return;
        const Fn = Ge.current.zoom,
          cr = o.current,
          vr = Hwi(cr, er),
          Wt = BL(w.current, _.current),
          Jt = Vwi(vr);
        Vn.current !== Jt && (Vn.current = Jt, Kn.current = vr, en.current = Wt ?? null, Jn.current || (Jn.current = !0, requestAnimationFrame(() => {
          Jn.current = !1, C8n(Kn.current ?? [], en.current ?? [], v.current);
        })));
        const Nn = Ve.current,
          En = Ge.current,
          Zn = tcn(tt.clientX, tt.clientY, Ce.current, Nn, En),
          Sr = uY(Zn.x, Zn.y, Fn, d.current),
          Bn = Sr.dx,
          Et = Sr.dy;
        if (cr && cr.size > 1 && cr.has(er)) {
          if (!m.current) {
            Wr.current.clear();
            const Oa = Kwi({
              ids: cr,
              getNode: pr => hn.current.get(pr) ?? l.current.find(In => In.id === pr),
              getLive: JE,
              readDom: (pr, In) => nkt(pr, In)
            });
            cr.forEach(pr => {
              const In = document.querySelector(`[data-node-id="${pr}"]`);
              In && Wr.current.set(pr, In);
            });
            const Fa = $wi(Wr.current.size);
            Qwi(Wr.current.values(), Fa);
            const Ra = a4n(Fn, d.current);
            m.current = {
              mouseX: Ce.current.x,
              mouseY: Ce.current.y,
              nodes: Oa,
              skipWillChange: Fa,
              worldPerScreenX: Ra.dx,
              worldPerScreenY: Ra.dy
            }, Oa.forEach((pr, In) => {
              VN(In, pr.x, pr.y), R1(In, pr.x, pr.y);
            }), gr.current = R1e();
            const ui = BL(_.current, w.current);
            ui != null && ui.length && fxe(cr, ui, v.current, M == null ? void 0 : M.current, T == null ? void 0 : T.current, {
              zoom: Ge.current.zoom,
              startPositions: Oa
            }), cU(cr);
          }
          const Mn = m.current,
            or = Ve.current,
            mr = Ge.current,
            Yr = tcn(tt.clientX, tt.clientY, {
              x: Mn.mouseX,
              y: Mn.mouseY
            }, or, mr),
            aa = Wwi({
              frozenWorldPerScreenX: Mn.worldPerScreenX,
              frozenWorldPerScreenY: Mn.worldPerScreenY,
              screenDelta: Yr,
              fallbackWorld: () => {
                const Oa = uY(Yr.x, Yr.y, Fn, d.current);
                return {
                  x: Oa.dx,
                  y: Oa.dy
                };
              }
            }),
            wa = aa.x,
            xa = aa.y;
          Qt.current || (Qt.current = new Map());
          let Aa = zcr(Mn.nodes, wa, xa),
            pn = [];
          if (R && Aa.size > 0) {
            const Oa = new Set(Aa.keys()),
              Fa = new Set(hn.current.keys());
            Oa.forEach(ui => Fa.delete(ui));
            const Ra = qvi(Aa, hn.current, Fa, Ge.current, j, {
              snapToNodes: !0,
              snapToCells: !0,
              cellSize: BY
            });
            Aa = Ra.positions, pn = Ra.guides;
          }
          jr.current = pn, Aa.forEach((Oa, Fa) => Qt.current.set(Fa, Oa)), Aa.forEach((Oa, Fa) => {
            VN(Fa, Oa.x, Oa.y);
          });
          const {
              x: xr,
              y: Nr
            } = zwi(Mn.nodes, Aa, wa, xa),
            qr = Qt.current;
          if (qr) {
            qwi({
              pending: qr,
              elements: Wr.current,
              skipWillChange: !!((Cr = m.current) != null && Cr.skipWillChange),
              queryElement: qC
            }), qr.forEach((Fa, Ra) => R1(Ra, Fa.x, Fa.y));
            const Oa = BL(w.current, _.current);
            if (Oa != null && Oa.length && v.current) {
              const Fa = v.current,
                Ra = M == null ? void 0 : M.current,
                ui = xr,
                pr = Nr;
              Ct(() => {
                qae(Oa, Ge.current, Fa, {
                  x: ui,
                  y: pr
                }, Ra);
              });
            }
          }
          gr.current && Vcr(gr.current, xr, Nr), ln.current === null && (ln.current = requestAnimationFrame(() => {
            ln.current = null;
            const Oa = jr.current ?? [];
            Xln(ea.current, Oa) || (ea.current = Oa, F == null || F(Oa));
          }));
        } else {
          if (cje(Cn.current, er) || (Cn.current = qC(er), (tr = Cn.current) == null || tr.classList.add("node-dragging-self")), Qt.current || (Qt.current = new Map()), B && (!cr || cr.size <= 1)) {
            if (!Dr.current || Dr.current.rootId !== er) {
              const Aa = Lr(er),
                pn = [er, ...Aa],
                xr = new Map(),
                Nr = new Map();
              pn.forEach(qr => {
                const Oa = hn.current.get(qr);
                if (!Oa) return;
                xr.set(qr, {
                  x: Oa.x,
                  y: Oa.y
                });
                const Fa = document.querySelector(`[data-node-id="${qr}"]`);
                Fa && Nr.set(qr, Fa);
              }), Gwi(Nr.size) && Nr.forEach(qr => {
                qr.style.willChange = "transform";
              }), Dr.current = {
                rootId: er,
                nodeStartPositions: xr,
                nodeElements: Nr
              }, cU(pn);
            }
          } else Dr.current = null;
          const Mn = Dr.current;
          let or = Ze.current.x + Bn,
            mr = Ze.current.y + Et,
            Yr = [];
          if (R) {
            const Aa = hn.current.get(er);
            if (Aa) {
              const pn = Array.from(hn.current.values()).filter(Nr => Nr.id !== er),
                xr = Mcr(or, mr, Aa.width, Aa.height, pn, Ge.current, j, {
                  snapToNodes: !0,
                  snapToCells: !0,
                  cellSize: BY
                });
              or = xr.x, mr = xr.y, Yr = xr.guides;
            }
          }
          jr.current = Yr;
          const aa = BL(_.current, w.current),
            wa = v.current;
          if (Mn && Mn.nodeStartPositions.size > 1) {
            const Aa = Uwi({
              startPositions: Mn.nodeStartPositions,
              rootId: er,
              fallbackRoot: Ze.current,
              deltaX: Bn,
              deltaY: Et,
              snappedRoot: {
                x: or,
                y: mr
              }
            });
            Qt.current.clear(), Aa.forEach((pn, xr) => {
              Qt.current.set(xr, pn), VN(xr, pn.x, pn.y);
              const Nr = Mn.nodeElements.get(xr);
              Nr && uje(Nr, pn.x, pn.y);
            });
          } else if (Qt.current.set(er, {
            x: or,
            y: mr
          }), VN(er, or, mr), Cn.current) {
            const Aa = Cn.current;
            Aa.style.willChange = "transform", uje(Aa, or, mr);
          }
          const xa = Qt.current;
          if (xa && xa.size > 0) {
            if (xa.forEach((Aa, pn) => R1(pn, Aa.x, Aa.y)), aa != null && aa.length && (wa || !Xge())) {
              const Aa = (Mn == null ? void 0 : Mn.nodeStartPositions.get(er)) ?? Ze.current,
                pn = or - Aa.x,
                xr = mr - Aa.y,
                Nr = M == null ? void 0 : M.current,
                qr = T == null ? void 0 : T.current;
              if (Xge()) wa && Ct(() => {
                qae(aa, Ge.current, wa, {
                  x: pn,
                  y: xr
                }, Nr);
              });else {
                const Oa = Mn && Mn.nodeStartPositions.size > 1 ? Array.from(Mn.nodeStartPositions.keys()) : [er],
                  Fa = new Map();
                Mn && Mn.nodeStartPositions.size > 1 ? Mn.nodeStartPositions.forEach((Ra, ui) => {
                  Fa.set(ui, Ra);
                }) : Fa.set(er, {
                  x: Ze.current.x,
                  y: Ze.current.y
                }), requestAnimationFrame(() => {
                  var fr;
                  if (!un.current || Xge()) return;
                  const Ra = v.current;
                  if (!(Ra != null && Ra.isConnected)) return;
                  const ui = BL(_.current, w.current) ?? aa,
                    pr = (fr = Qt.current) == null ? void 0 : fr.get(er),
                    In = pr ? {
                      x: pr.x - Aa.x,
                      y: pr.y - Aa.y
                    } : {
                      x: pn,
                      y: xr
                    };
                  fxe(Oa, ui, Ra, (M == null ? void 0 : M.current) ?? Nr, (T == null ? void 0 : T.current) ?? qr, {
                    zoom: Fn,
                    startPositions: Fa
                  }), qae(ui, Ge.current, Ra, In, (M == null ? void 0 : M.current) ?? Nr);
                });
              }
            } else if (wa) {
              const Aa = Array.from(xa.keys()),
                pn = M == null ? void 0 : M.current,
                xr = T == null ? void 0 : T.current;
              Ct(() => {
                Hmt(Aa, aa ?? [], Ge.current, wa, pn, void 0, void 0, xr);
              });
            }
          }
          ln.current === null && (ln.current = requestAnimationFrame(() => {
            ln.current = null;
            const Aa = jr.current ?? [];
            Xln(ea.current, Aa) || (ea.current = Aa, F == null || F(Aa));
          }));
        }
      }
      if (O && L) {
        const kn = Kt();
        if (kn) {
          const xn = Ge.current,
            Fn = (tt.clientX - kn.left - xn.x) / xn.zoom,
            cr = (tt.clientY - kn.top - xn.y) / xn.zoom;
          let vr = ir.current;
          (!vr || vr.getAttribute("data-node-id") !== O) && (vr = qC(O), ir.current = vr);
          const Wt = hn.current.get(O);
          if (vr && Wt) {
            Kr.current || (Kr.current = K1i(L, q1i(vr, Wt), Fn, cr), Hr.current = {
              horizontal: L.horizontal,
              vertical: L.vertical
            });
            const Jt = Q1i({
              resizeDirection: L,
              grabState: Kr.current,
              worldX: Fn,
              worldY: cr,
              node: Wt
            });
            Y1i(vr, Jt), R1(O, Jt.newX, Jt.newY), mWe(O, Jt.newWidth, Jt.newHeight), Ucr(O, Jt.newWidth, Jt.newHeight), VN(O, Jt.newX, Jt.newY), ha.current = {
              x: Jt.newX,
              y: Jt.newY,
              width: Jt.newWidth,
              height: Jt.newHeight
            }, br(O, {
              x: Jt.newX,
              y: Jt.newY
            });
          }
        }
      }
    }, [V, G, O, L, z, n, d, h, p, o, l, m, D, U, H, Y, K, b, _, w, v, Kt, Ee, k, M, u, R, j, B, Lr, F, Mr, Hn, Qe, I]);
    g.useEffect(() => {
      if (!O) return;
      Pr(), Aj({
        skipBodyClass: !0,
        skipNotify: !0
      }), xpt(!0);
      const tt = qC(O),
        zt = [];
      tt == null || tt.querySelectorAll("[data-table-editor-scroll] table").forEach(Un => {
        Un.style.width = `${Un.offsetWidth}px`, zt.push(Un);
      });
      const an = document.getElementById("canvas-node-drag-hit-shield"),
        Rn = tt == null ? void 0 : tt.querySelector(".resize-handle:hover");
      return an && (Rn && an.style.setProperty("cursor", getComputedStyle(Rn).cursor, "important"), an.classList.add("canvas-node-drag-hit-shield--active")), () => {
        zt.forEach(Un => {
          Un.style.width = "";
        }), an && (an.style.removeProperty("cursor"), qE().size === 0 && an.classList.remove("canvas-node-drag-hit-shield--active")), xpt(!1), lU();
      };
    }, [O, Pr]), g.useEffect(() => () => {
      Ot.current && cancelAnimationFrame(Ot.current), ln.current && cancelAnimationFrame(ln.current), Pn.current && cancelAnimationFrame(Pn.current), Yn.current = null, nn.current != null && (cancelAnimationFrame(nn.current), nn.current = null), pt.current = null, wr(), Wn(), Zr(!1), vt.current = null, Jr.current && (clearTimeout(Jr.current), Jr.current = null), HN();
    }, []), g.useEffect(() => dje(() => {
      uHt(!!st.current, Ye.current) && (st.current = null, Ht.current = null, vt.current = null, Zr(!1), Wn(), qot(), Mt());
    }, window), [Mt]);
    const Dt = g.useCallback(() => {
      var tr;
      const tt = Ga.current;
      if (!tt || Za.current) return;
      Za.current = !0;
      const zt = document.querySelector(`[data-node-id="${tt}"]`),
        an = ha.current;
      let Rn, Un, er, Cr;
      if (an) Rn = an.width, Un = an.height, er = an.x, Cr = an.y;else if (zt) {
        Rn = parseInt(zt.style.width) || 250, Un = parseInt(zt.style.height) || 250;
        const kn = (tr = zt.style.transform) == null ? void 0 : tr.match(/translate3d\(([^,]+)px,\s*([^,]+)px/);
        er = kn ? parseFloat(kn[1]) : void 0, Cr = kn ? parseFloat(kn[2]) : void 0;
      } else Rn = 250, Un = 250;
      (zt || an) && (ne(kn => kn.map(xn => {
        var Fn;
        return xn.id !== tt ? xn : {
          ...xn,
          ...(er !== void 0 && {
            x: er
          }),
          ...(Cr !== void 0 && {
            y: Cr
          }),
          width: Rn,
          height: Un,
          settings: {
            ...xn.settings,
            hasCustomSize: !0,
            ...(xn.type === "text-node" && ((Fn = xn.settings) == null ? void 0 : Fn.textNodeAutoHeight) === !0 ? {
              textNodeAutoHeight: !1
            } : {}),
            savedNodeWidth: Rn,
            savedNodeHeight: Un
          }
        };
      })), Ude([tt])), ue(null), ge(null), Kr.current = null, Hr.current = null, ha.current = null, Za.current = !1;
    }, [ne, ue, ge]);
    g.useEffect(() => {
      if (O) return dje(() => {
        Dt();
      }, window);
    }, [O, Dt]);
    const bn = g.useCallback(tt => {
      var Wt, Jt;
      if (ar.current) return;
      const zt = ywi({
        dragNodeIdRef: un.current,
        dragNodeId: V,
        pendingUpdateCount: ((Wt = Qt.current) == null ? void 0 : Wt.size) ?? 0
      });
      zt && (ar.current = !0, ur());
      const an = Ye.current;
      an && tt && Number.isFinite(tt.clientX) && Number.isFinite(tt.clientY) && La.current(tt.clientX, tt.clientY);
      const Rn = Qt.current ? new Set(Qt.current.keys()) : null;
      an || A == null || A();
      const Un = (() => {
        const Nn = {
          hasDropHandler: !!be,
          dragNodeId: un.current || V,
          hasPointer: !!tt,
          isDraggingGroup: !!(S != null && S.current),
          connectingSource: D,
          connectingTarget: U
        };
        if (!fwi(Nn) || !tt) return null;
        const En = Kt(!1);
        if (!En) return null;
        const Zn = B8(tt.clientX, tt.clientY, {
          left: En.left,
          top: En.top,
          width: En.width,
          height: En.height
        }, Ge.current, d.current);
        return {
          worldX: Zn.x,
          worldY: Zn.y,
          nodeIds: gwi(Nn.dragNodeId, o.current)
        };
      })();
      Pn.current !== null && (cancelAnimationFrame(Pn.current), Pn.current = null), Yn.current = null, rn.current.clear();
      const er = uHt(!!st.current, an);
      if (st.current = null, Ht.current = null, er && (vt.current = null, Zr(!1), Wn(), qot(), Mt()), _r(tt, zt)) {
        ar.current = !1;
        return;
      }
      let Cr = !1;
      Ye.current ? (kt.current && (St.current = !0, window.setTimeout(() => {
        St.current = !1;
      }, 0)), Cr = !0, it.current = !0, Wn(), wr(), hxi(Ge.current, u.current), C4n(Ge.current), window.requestAnimationFrame(() => {
        Rle(Ge.current);
      }), Ye.current = !1, vt.current = null, XC(!1), yr(!1), Mt(), O4n(), requestAnimationFrame(() => {
        Hn(!1), Zr(!1), wpt();
      }), requestAnimationFrame(() => {
        I8n(), requestAnimationFrame(() => {
          oM(), ar.current = !1;
        });
      })) : (Ee(!1), Ye.current = !1, vt.current = null, Hn(!1), Zr(!1)), lt.current = !1, xe(!1);
      let tr;
      const kn = gr.current,
        xn = o.current;
      if (Qt.current && Qt.current.size > 0) {
        const Nn = Qt.current;
        tr = new Map(Nn);
        const En = Et => Et.map(zn => {
          const Mn = Nn.get(zn.id);
          return Mn ? {
            ...zn,
            x: Mn.x,
            y: Mn.y
          } : zn;
        });
        l.current = En(l.current), Nn.forEach((Et, zn) => {
          R1(zn, Et.x, Et.y);
          const Mn = Wr.current.get(zn),
            or = Cn.current,
            mr = (cje(Mn, zn) ? Mn : null) ?? (cje(or, zn) ? or : null) ?? qC(zn);
          mr && uje(mr, Et.x, Et.y);
        }), Da.flushSync(() => {
          ne(Et => En(Et)), he(null), xe(!1);
        }), Qt.current = null;
        const Zn = Ge.current,
          Sr = He.current;
        Zn && Sr && dHt(Sr, Zn) && g.startTransition(() => {
          q({
            x: Zn.x,
            y: Zn.y,
            zoom: Zn.zoom
          });
        });
        const Bn = BL(w.current, _.current);
        Xge() ? gxe(Bn ?? [], Ge.current, v.current, M == null ? void 0 : M.current, T == null ? void 0 : T.current) : Hmt(tr.keys(), Bn ?? [], Ge.current, v.current, M == null ? void 0 : M.current, void 0, void 0, T == null ? void 0 : T.current);
      }
      if (kn && tr && xn && xn.size > 1) {
        Wr.current.forEach(En => {
          En.style.willChange = "";
        });
        const Nn = Wcr(xn, tr, l.current);
        Qcr(kn, {
          finalBounds: Nn,
          zoom: Ge.current.zoom
        });
      }
      gr.current = null, O && Dt(), Un && (be == null || be(Un.worldX, Un.worldY, Un.nodeIds, tr)), (!tr || tr.size === 0) && (he(null), xe(!1)), ue(null), ge(null), jr.current = null, ea.current = null, F == null || F([]), Kr.current = null, Hr.current = null, ha.current = null, m.current = null, gr.current = null, Cn.current && (Cn.current.style.willChange = ""), (Jt = Cn.current) == null || Jt.classList.remove("node-dragging-self"), Cn.current = null, un.current = null, Dr.current && Dr.current.nodeElements.forEach(Nn => {
        Nn.style.willChange = "";
      }), Dr.current = null;
      const Fn = tr ? new Set(tr.keys()) : void 0;
      Wr.current.clear(), zr.current = null, Pfe(gr.current);
      const cr = bwi({
          bodyHasBoxSelectGroupDraggingClass: typeof document < "u" && document.body.classList.contains("canvas-box-select-group-dragging"),
          activeNodeDragCount: qE().size
        }),
        vr = G || p.current;
      if (vwi({
        releasedCount: (Fn == null ? void 0 : Fn.size) ?? 0,
        boxSelectGroupDragActive: cr,
        completingBoxSelection: vr
      }) && (Kot(l.current), acn(l.current)), Pa(tt), G || p.current) {
        const Nn = !At.current;
        Nn && (At.current = !0, requestAnimationFrame(() => {
          At.current = !1;
        }));
        const En = Nn ? _t.current : null,
          Zn = Nn ? Ut.current : null;
        if (Nn && (_t.current = null, Ut.current = null), _e(!1), p.current = !1, ke(null), Pfe(R1e()), Nn && (En || (Nn ? z : null))) {
          const Bn = qln({
            startFromRef: En,
            endFromRef: Zn,
            selectionBox: z
          });
          if (Bn) {
            const Et = Aln(P == null ? void 0 : P.current),
              zn = Pyt(Kln(l.current, Et, Bn, rcn), l.current, (P == null ? void 0 : P.current) ?? [], Bn);
            o.current = zn, j5(zn), J(zn), pe == null || pe(null), zn.size > 0 && (ce == null || ce(Array.from(zn)));
            const Mn = wwi(zn);
            Mn.type === "set" && (s && (s.current = Mn.nodeId), le(Mn.nodeId));
          }
        }
      }
      Cr ? (HN(), ar.current = !1) : requestAnimationFrame(() => {
        var Zn;
        Kae();
        const Nn = BL(w.current, _.current),
          En = xwi(Nn ?? [], Rn && Rn.size > 1 ? Rn : null);
        $Et(Nn ?? [], Ge.current, v.current, M == null ? void 0 : M.current, Rn ?? void 0, T == null ? void 0 : T.current, En), E8n(v.current), lU(), document.body.classList.remove("canvas-node-dragging"), (Zn = document.getElementById("canvas-bg")) == null || Zn.classList.remove("canvas-node-dragging"), d7(), Fn && Fn.size > 0 ? g8n(Fn, () => {
          const Sr = tr;
          if (!Sr || Sr.size === 0) return;
          const Bn = Et => Et.map(zn => {
            const Mn = Sr.get(zn.id);
            return !Mn || zn.x === Mn.x && zn.y === Mn.y ? zn : {
              ...zn,
              x: Mn.x,
              y: Mn.y
            };
          });
          l.current = Bn(l.current), Da.flushSync(() => {
            ne(Et => Bn(Et));
          }), $ke(Sr);
        }) : (Kot(l.current), acn(l.current), HN()), requestAnimationFrame(() => {
          oM(), sO.resumeConnectionAnimations(), ar.current = !1;
        });
      });
    }, [G, i, V, O, Dt, D, U, H, Y, p, o, s, m, l, z, Ee, xe, he, ue, ge, _e, ke, le, J, pe, ne, de, Te, Ne, me, Ae, Me, q, A, Le, kr, d, Ge, Hn, ce, be, S, P, rr, Dn, Gn, _r, Pa, qn, Mt, Kt]);
    Tt.current = bn, Ue.current = ct;
    const Rt = g.useCallback((tt = "external-request") => {
      var tr;
      const zt = typeof document < "u" ? document.body : null,
        an = !!un.current || !!V,
        Rn = Ye.current,
        Un = !!st.current || !!Ht.current;
      It.current = !1, Xot(), Yot();
      const er = p.current || G || z != null || _t.current != null || Ut.current != null;
      if (an || Rn || Un || er) try {
        console.warn("[CanvasEvents] forceEnd 清理交互残留", {
          reason: tt,
          dragNodeIdRef: un.current,
          dragNodeId: V,
          isPanningRef: Ye.current,
          isSelectingRef: p.current,
          isSelecting: G,
          selectionBox: z,
          pendingPan: !!st.current,
          isDraggingSelectionBounds: I == null ? void 0 : I.current,
          isDraggingGroup: S == null ? void 0 : S.current,
          isResizingGroupFrame: C == null ? void 0 : C.current,
          pointerButtonsDown: ht.current,
          bodyClasses: (zt == null ? void 0 : zt.className) ?? null,
          canvasBgClasses: typeof document < "u" ? ((tr = document.getElementById("canvas-bg")) == null ? void 0 : tr.className) ?? null : null
        });
      } catch {}
      an && (Cn.current && (Cn.current.style.willChange = "", Cn.current.classList.remove("node-dragging-self"), Cn.current = null), Qt.current = null, m.current = null, Wr.current.size > 0 && Wr.current.forEach(kn => {
        kn && typeof kn.style < "u" && (kn.style.willChange = "");
      }), Wr.current.clear(), gr.current && (Pfe(gr.current), gr.current = null), Dr.current && Dr.current.nodeElements.forEach(kn => {
        kn.style.willChange = "";
      }), Dr.current = null, Kot(l.current), HN(), he(null), un.current = null), Ye.current = !1, vt.current = null, st.current = null, Ht.current = null, it.current = !0, Wn(), wr(), XC(!1), Hn(!1), Zr(!1), wpt(), (Rn || Un) && Mt(), er && (p.current = !1, _t.current = null, Ut.current = null, Yt.current = new Set(), tje(), gt.current != null && (cancelAnimationFrame(gt.current), gt.current = null), _e(!1), ke(null)), zt == null || zt.classList.remove("canvas-node-dragging"), zt == null || zt.classList.remove("canvas-box-select-group-dragging");
      const Cr = typeof document < "u" ? document.getElementById("canvas-bg") : null;
      Cr == null || Cr.classList.remove("canvas-node-dragging"), Cr == null || Cr.classList.remove("canvas-local-node-dragging"), Cr == null || Cr.classList.remove("canvas-box-select-group-dragging"), Cr == null || Cr.classList.remove("canvas-panning"), Cr == null || Cr.classList.remove("canvas-local-panning"), Cr == null || Cr.classList.remove("canvas-minimap-dragging"), Cr == null || Cr.classList.remove("canvas-viewport-interacting"), Hn(!1), yP({
        force: !0
      }), d7(), ar.current = !1, Vt.current = 0, vn.current != null && (clearTimeout(vn.current), vn.current = null), Ee(!1), xe(!1), XC(!1), xv(!1), (an || Rn || Un || er) && oM(), ye == null || ye();
    }, [V, un, Ye, p, G, z, Cn, Qt, m, Wr, gr, Dr, l, he, vt, st, Ht, it, Wn, wr, XC, Hn, xv, Zr, Mt, _e, ke, xe, ye]);
    jt.current = Rt, g.useEffect(() => {
      const tt = zt => {
        if (It.current && Wre(zt.pointerType) || jl() || Av() || wae()) return;
        const an = typeof document < "u" ? document.body : null,
          Rn = typeof document < "u" ? document.getElementById("canvas-bg") : null,
          Un = !!(un.current || Ye.current || p.current || st.current || Ht.current || I != null && I.current || S != null && S.current || C != null && C.current),
          er = Un || G || z != null || fMe(an, Rn, {
            panning: jl(),
            zooming: Rl(),
            panPending: Av()
          }),
          Cr = T1i({
            buttons: zt.buttons,
            connectionMenuSticky: at.current,
            liveGesture: Un,
            hasBlockingState: er,
            releaseSettling: ar.current || !!(an != null && an.classList.contains("canvas-release-settle")),
            now: performance.now(),
            releasedSince: ft.current
          });
        ft.current = Cr.releasedSince, Cr.recover && jt.current("released-pointer-move");
      };
      return window.addEventListener("pointermove", tt, !0), () => window.removeEventListener("pointermove", tt, !0);
    }, [G, z, I]), g.useEffect(() => {
      const tt = zt => {
        if (!Wre(zt.pointerType) && zt.button !== 0 || Wre(zt.pointerType) && It.current) return;
        const an = typeof document < "u" ? document.body : null;
        if (ar.current || an != null && an.classList.contains("canvas-release-settle")) return;
        if (!!(un.current || Ye.current || p.current || st.current || Ht.current || I != null && I.current || S != null && S.current || C != null && C.current || V || G || z != null)) {
          $n.current = {
            clientX: zt.clientX,
            clientY: zt.clientY,
            expiresAt: performance.now() + 250
          }, jt.current("pointerdown-stale-gesture");
          return;
        }
        if (at.current) return;
        const Un = typeof document < "u" ? document.getElementById("canvas-bg") : null;
        (Rl() || Un != null && Un.classList.contains("canvas-viewport-interacting")) && ($n.current = {
          clientX: zt.clientX,
          clientY: zt.clientY,
          expiresAt: performance.now() + 250
        }), fMe(an, Un, {
          panning: jl(),
          zooming: Rl(),
          panPending: Av()
        }) && ($n.current = {
          clientX: zt.clientX,
          clientY: zt.clientY,
          expiresAt: performance.now() + 250
        }, jt.current("pointerdown-blocking-class"));
      };
      return window.addEventListener("pointerdown", tt, !0), () => window.removeEventListener("pointerdown", tt, !0);
    }, [I, S, C, V, G, z]), g.useEffect(() => {
      const tt = new Map(),
        zt = new Set();
      let an = null,
        Rn = null,
        Un = null,
        er = !1;
      const Cr = () => d.current ?? (typeof document < "u" ? document.getElementById("canvas-bg") : null),
        tr = () => {
          if (!er) return;
          const En = Cr();
          En && (En.style.touchAction = "none"), er = !1;
        },
        kn = (En, Zn) => {
          if (Ge.current = En, Zn) {
            Rl() || xv(!0, {
              skipNotify: !0
            }), mY(u == null ? void 0 : u.current, En), Rle(En);
            return;
          }
          VDe(u == null ? void 0 : u.current, En.x, En.y, En.zoom), rkt(En.x, En.y), L5t(En);
        },
        xn = () => {
          an = null, Rn = null;
        },
        Fn = En => {
          var Sr;
          const Zn = Cr();
          try {
            (Sr = Zn == null ? void 0 : Zn.setPointerCapture) == null || Sr.call(Zn, En);
          } catch {}
        },
        cr = En => {
          Un = null, zt.clear(), st.current = null, vt.current = null, xn(), En.preventDefault(), Fn(En.pointerId), Tt.current(void 0), Ye.current || _n.current({
            clientX: En.clientX,
            clientY: En.clientY
          });
        },
        vr = () => {
          tt.clear(), zt.clear(), xn(), Un = null, It.current = !1, Xot(), Yot(), tr(), (Ye.current || st.current) && Tt.current(void 0), Rl() && xv(!1, {
            skipNotify: !0
          });
        },
        Wt = En => {
          var Sr, Bn, Et;
          const Zn = Rwi({
            pointerType: En.pointerType,
            overFullscreen: lje() || yMe(En.clientX, En.clientY),
            isGestureTarget: uxi(En.target),
            isPassthroughTarget: lFt(En.target),
            trackedPointerCount: tt.size,
            onNodeOrConnector: cxi(En.target),
            nodeDragActive: !!un.current,
            selecting: !!p.current,
            connecting: !!(Pt.current || dt.current),
            draggingGroup: !!(S != null && S.current),
            draggingSelectionBounds: !!(I != null && I.current),
            doodleCursor: !!((Sr = Cr()) != null && Sr.classList.contains("canvas-doodle-cursor"))
          });
          if (!(Zn.type === "ignore" || Zn.type === "blocked" || Zn.type === "doodle")) {
            if (Zn.type === "passthrough-auto") {
              const zn = Cr();
              zn && (zn.style.touchAction = "auto", er = !0);
              return;
            }
            if (Zn.type === "pinch-begin") {
              tt.set(En.pointerId, {
                x: En.clientX,
                y: En.clientY
              }), It.current = !0, Qot(), cr(En);
              return;
            }
            if (Zn.type === "node-passthrough") {
              tt.set(En.pointerId, {
                x: En.clientX,
                y: En.clientY
              }), zt.add(En.pointerId), It.current = !0, Qot(), Xcr();
              return;
            }
            En.preventDefault(), tt.set(En.pointerId, {
              x: En.clientX,
              y: En.clientY
            });
            try {
              (Et = (Bn = En.target) == null ? void 0 : Bn.releasePointerCapture) == null || Et.call(Bn, En.pointerId);
            } catch {}
            Fn(En.pointerId), It.current = !0, Qot(), Un = dxi(En.target), it.current = !1, st.current = {
              x: En.clientX,
              y: En.clientY
            }, Ht.current = null, De.current.x = En.clientX, De.current.y = En.clientY, vt.current = {
              viewX: Ge.current.x,
              viewY: Ge.current.y,
              clientX: En.clientX,
              clientY: En.clientY
            }, Gln(), yr(!0);
          }
        },
        Jt = En => {
          if (!Wre(En.pointerType) || !tt.has(En.pointerId)) return;
          tt.set(En.pointerId, {
            x: En.clientX,
            y: En.clientY
          });
          const Zn = [...tt.values()];
          et.current = performance.now();
          const Sr = Nwi({
            pinchPointerCount: Zn.length,
            isNodePassthrough: zt.has(En.pointerId),
            pending: st.current,
            isPanning: Ye.current,
            pointer: Zn[0] ?? {
              x: En.clientX,
              y: En.clientY
            }
          });
          if (Sr.type === "pinch") {
            En.preventDefault(), Un = null, zt.clear();
            const Et = Zn[0],
              zn = Zn[1];
            if (!Et || !zn) return;
            const {
                mid: Mn,
                dist: or
              } = Twi(Et, zn),
              mr = an,
              Yr = Rn;
            if (an = Mn, Rn = or, !Mwi(mr, Yr) || Yr == null) return;
            Ye.current || _n.current({
              clientX: Mn.x,
              clientY: Mn.y
            });
            const aa = Cr(),
              wa = aa == null ? void 0 : aa.getBoundingClientRect(),
              xa = wa ? UDe(Mn.x, Mn.y, wa, aa) : {
                x: Mn.x,
                y: Mn.y
              },
              Aa = jwi({
                view: Ge.current,
                mid: Mn,
                prevMid: mr,
                dist: or,
                prevDist: Yr,
                origin: xa,
                isZoomLocked: Ft.current,
                minZoom: Sd.MIN_ZOOM,
                maxZoom: Sd.MAX_ZOOM
              });
            kn(Aa.view, Aa.zooming);
            return;
          }
          if (Sr.type === "node-passthrough") {
            En.cancelable && En.preventDefault();
            return;
          }
          if (En.preventDefault(), Sr.type === "wait-slop" || Sr.type === "continue") return;
          const Bn = Zn[0];
          if (Bn) {
            if (Sr.type === "begin-pan") {
              Un = null, st.current = null, _n.current({
                clientX: Bn.x,
                clientY: Bn.y,
                deltaX: Sr.dx,
                deltaY: Sr.dy
              });
              return;
            }
            Sr.type === "pan-schedule" && La.current(Bn.x, Bn.y);
          }
        },
        Nn = En => {
          var mr;
          if (!tt.has(En.pointerId)) {
            Qln({
              tracked: !1,
              remainingCount: tt.size,
              wasNodePassthrough: !1,
              pendingOnly: !1
            }).type === "restore-touch-action" && tr();
            return;
          }
          const Sr = zt.has(En.pointerId);
          tt.delete(En.pointerId), zt.delete(En.pointerId);
          const Bn = Cr();
          try {
            (mr = Bn == null ? void 0 : Bn.releasePointerCapture) == null || mr.call(Bn, En.pointerId);
          } catch {}
          const Et = tt.size,
            zn = !!st.current && !Ye.current,
            Mn = Qln({
              tracked: !0,
              remainingCount: Et,
              wasNodePassthrough: Sr,
              pendingOnly: zn
            });
          if (Mn.type === "pinch-continue") {
            xn();
            return;
          }
          if (Mn.type === "pinch-to-one") {
            const Yr = [...tt.values()][0];
            if (xn(), !Yr) return;
            vt.current = {
              viewX: Ge.current.x,
              viewY: Ge.current.y,
              clientX: Yr.x,
              clientY: Yr.y
            }, De.current.x = Yr.x, De.current.y = Yr.y;
            return;
          }
          const or = Un;
          if (Un = null, It.current = !1, Xot(), Yot(), tr(), Mn.type === "node-passthrough-end") {
            st.current = null, vt.current = null, Zr(!1), Wn();
            return;
          }
          if (Mn.type === "pending-tap") {
            st.current = null, vt.current = null, Zr(!1), Wn(), qot(), or ? (pt.current = null, nmi(), s && (s.current = or), o.current = new Set([or]), j5(o.current), le(or), J(new Set([or]))) : (pt.current = {
              clearNodes: !Jot(),
              clearGroups: !0,
              clearConnection: !0
            }, Mt());
            return;
          }
          Rl() && xv(!1, {
            skipNotify: !0
          }), Tt.current(void 0);
        };
      return window.addEventListener("pointerdown", Wt, {
        capture: !0,
        passive: !1
      }), window.addEventListener("pointermove", Jt, {
        capture: !0,
        passive: !1
      }), window.addEventListener("pointerup", Nn, {
        capture: !0,
        passive: !1
      }), window.addEventListener("pointercancel", Nn, {
        capture: !0,
        passive: !1
      }), () => {
        window.removeEventListener("pointerdown", Wt, !0), window.removeEventListener("pointermove", Jt, !0), window.removeEventListener("pointerup", Nn, !0), window.removeEventListener("pointercancel", Nn, !0), It.current && vr();
      };
    }, [d, u, Ge, le, J, Mt, S, I]), g.useEffect(() => {
      const tt = zt => {
        if (zt.key !== "Escape") return;
        const an = typeof document < "u" ? document.body : null;
        (un.current || V || Ye.current || p.current || st.current || an != null && an.classList.contains("canvas-node-dragging") || an != null && an.classList.contains("canvas-box-select-group-dragging")) && jt.current("escape-key");
      };
      return window.addEventListener("keydown", tt, !0), () => window.removeEventListener("keydown", tt, !0);
    }, [V]), g.useEffect(() => {
      const tt = Rn => {
          const Un = typeof document < "u" ? document.body : null;
          (un.current || Ye.current || p.current || st.current || Un != null && Un.classList.contains("canvas-node-dragging") || Un != null && Un.classList.contains("canvas-box-select-group-dragging") || Un != null && Un.classList.contains("canvas-interacting")) && (!Rn && ht.current || window.setTimeout(() => jt.current("lost-pointer-context"), 0));
        },
        zt = () => {
          typeof document < "u" && document.hidden && tt(!0);
        },
        an = () => tt(!1);
      return window.addEventListener("blur", an), document.addEventListener("visibilitychange", zt), () => {
        window.removeEventListener("blur", an), document.removeEventListener("visibilitychange", zt);
      };
    }, []), g.useEffect(() => {
      const an = () => {
        const Rn = typeof document < "u" ? document.body : null,
          Un = typeof document < "u" ? document.getElementById("canvas-bg") : null,
          er = performance.now() - et.current > 2500,
          Cr = !!un.current || !!Ye.current || !!Rl() || !!p.current || !!(S != null && S.current) || !!(C != null && C.current) || !!(I != null && I.current) || !!st.current || It.current,
          tr = fMe(Rn, Un, {
            panning: jl(),
            zooming: Rl(),
            panPending: Av()
          });
        !Cr && !tr || C1i({
          hasRealGesture: Cr,
          blockingClasses: tr,
          stale: er,
          pointerButtonsDown: ht.current
        }) && jt.current(Cr ? "watchdog-stale-gesture" : "watchdog-blocking-class");
      };
      return wt.current = window.setInterval(an, 1e3), () => {
        wt.current != null && (window.clearInterval(wt.current), wt.current = null);
      };
    }, []), g.useEffect(() => {
      if (!(!G && !p.current)) return Lwi({
        target: window,
        onMove: tt => {
          Ue.current({
            clientX: tt.clientX,
            clientY: tt.clientY,
            buttons: tt.buttons
          });
        },
        onRelease: tt => {
          Tt.current({
            clientX: tt.clientX,
            clientY: tt.clientY,
            target: tt.target
          });
        }
      }).bind();
    }, [G, p]), g.useEffect(() => {
      const tt = () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const zt = typeof document < "u" ? document.body : null;
            if (ar.current || zt != null && zt.classList.contains("canvas-release-settle") || ht.current) return;
            if (un.current) {
              jt.current("pointerup-orphan-node-drag");
              return;
            }
            if (Ye.current || p.current || st.current || I != null && I.current || S != null && S.current || C != null && C.current) {
              jt.current("pointerup-orphan-gesture");
              return;
            }
            const an = typeof document < "u" ? document.getElementById("canvas-bg") : null;
            fMe(zt, an, {
              panning: jl(),
              zooming: Rl(),
              panPending: Av()
            }) && jt.current("pointerup-blocking-class");
          });
        });
      };
      return window.addEventListener("pointerup", tt, !0), window.addEventListener("pointercancel", tt, !0), () => {
        window.removeEventListener("pointerup", tt, !0), window.removeEventListener("pointercancel", tt, !0);
      };
    }, []), g.useEffect(() => dje(() => {
      nTr(lt.current, Ye.current, !!st.current) && bn(void 0);
    }, window), [bn]);
    const fn = g.useCallback(tt => {
        const zt = tt.target,
          an = hMe(),
          Rn = We.current;
        We.current = null;
        const Un = Ar();
        if (an && Rn && !Un && !jl()) {
          const er = tt.clientX - Rn.x,
            Cr = tt.clientY - Rn.y;
          if (er * er + Cr * Cr < 16 && !zt.closest('.node-wrapper, .connector, button, input, textarea, select, [contenteditable="true"], .node-dropdown-button, .node-dropdown-menu, [data-model-select-area], [data-edit-image-bottom-panel], [data-edit-image-tools-toolbar], [data-edit-image-layers-panel], [data-eraser-tool-panel], [data-connection-drop-menu]')) {
            const kn = $t(tt.clientX, tt.clientY);
            if (kn) {
              an.select(kn);
              return;
            }
          }
        }
        if (!(zt.closest(".node-dropdown-button") || zt.closest(".node-dropdown-menu") || zt.closest("[data-model-select-area]") || zt.closest("[data-edit-image-bottom-panel], [data-edit-image-tools-toolbar]") || zt.closest("[data-edit-image-layers-panel]") || zt.closest("[data-eraser-tool-panel]") || zt.closest("[data-connection-drop-menu]")) && !fa(zt)) {
          if (hP(null), nt) {
            if (St.current) return;
            zt.closest(".node-wrapper") || nt();
          }
          W.visible && $e({
            visible: !1,
            x: 0,
            y: 0,
            nodeId: null,
            frame: null
          }), Q.visible && rt({
            visible: !1,
            x: 0,
            y: 0,
            worldX: 0,
            worldY: 0,
            item: null
          }), Ca(tt, zt);
        }
      }, [W.visible, Ca, fa, Q.visible, $t, Ar, nt, $e, rt]),
      Zt = g.useCallback(tt => {
        tt.preventDefault(), tt.stopPropagation();
      }, []),
      Ln = g.useCallback((tt, zt, an) => {
        Ce.current = {
          x: zt.clientX,
          y: zt.clientY
        }, Ze.current = {
          x: an.x,
          y: an.y
        };
      }, []);
    return {
      handleCanvasContextMenu: je,
      handleCanvasMouseDown: Qn,
      handleCanvasDoubleClick: Lt,
      handleCanvasMouseMove: ct,
      handleCanvasMouseUp: bn,
      handleBackgroundClick: fn,
      handleSelectionContextMenu: Zt,
      initNodeDrag: Ln,
      lastMousePos: De,
      isPanningRef: Ye,
      dragStartPos: Ce,
      nodeStartPos: Ze,
      dragElementRef: Cn,
      dragNodeIdRef: un,
      clearConnectionDropMenuState: Gn,
      forceEndStuckInteraction: Rt
    };
  },
  mxi = new Set(["text-node", "novel-input", "custom-agent", "gen-speech", "gen-music", "director-3d", "gen-3d", "three-d-studio", "storyboard-chart-node", "script-parse", "jimeng-super-resolution", "topaz-upscale", "fal-rembg", "virtual-try-on", "motion-control", "video-relight", "rh-app", "rh-comfy"]);

function fxi(e, t) {
  const n = new Map(t.map(i => [i.id, i])),
    r = new Set(),
    a = new Set();
  for (const i of e) {
    const o = n.get(i);
    (!o || mxi.has(o.type) ? a : r).add(i);
  }
  return {
    groupIds: r,
    directIds: a
  };
}

function Zcr(e, t, n) {
  const r = new Map();
  for (const a of t) e.has(a.id) && r.set(a.id, n(a.id, {
    x: a.x,
    y: a.y
  }));
  return r;
}

function gxi(e, t) {
  return new Map([...e].map(([n, r]) => [n, {
    x: r.x + t.x,
    y: r.y + t.y
  }]));
}

function yxi(e, t, n) {
  if (!Number.isFinite(n.snapGrid) || n.snapGrid <= 0 || t.size === 0) return e;
  const r = t.values().next().value;
  if (!r) return e;
  const a = r.x + e.x,
    i = r.y + e.y,
    o = Math.round(a / n.snapGrid) * n.snapGrid,
    s = Math.round(i / n.snapGrid) * n.snapGrid,
    l = o - a,
    d = s - i;
  return l === 0 && d === 0 ? e : {
    x: e.x + l,
    y: e.y + d
  };
}

function ocn(e, t) {
  let n = !1;
  const r = e.map(a => {
    const i = t.get(a.id);
    return !i || a.x === i.x && a.y === i.y ? a : (n = !0, {
      ...a,
      x: i.x,
      y: i.y
    });
  });
  return n ? r : e;
}

const scn = "data-box-select-drag-group",
  bxi = 12,
  vxi = .45,
  wxi = 4;

function xxi(e, t = 1) {
  const n = t > 0 && t < vxi ? wxi : bxi;
  return e >= n;
}

let K5 = null;

function edr(e) {
  const t = typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e;
  return document.querySelector(`[data-node-id="${t}"]`);
}

function lcn(e) {
  if (e.membersDirty = !0, e.repairRafId != null) return;
  const t = typeof requestAnimationFrame == "function" ? requestAnimationFrame : n => setTimeout(() => n(Date.now()), 0);
  e.repairRafId = t(() => {
    e.repairRafId = null, !(K5 !== e || !e.membersDirty) && Ixi();
  });
}

function ikt() {
  return document.querySelector('[data-canvas-world-layer="front"]') ?? document.querySelector(".canvas-world");
}

function _xi(e) {
  const t = e.querySelector(`[${scn}]`);
  t && t.remove();
  const n = document.createElement("div");
  return n.setAttribute(scn, "true"), n.style.cssText = ["position:absolute", "left:0", "top:0", "width:0", "height:0", "z-index:60", "pointer-events:none", "will-change:transform", "transform:translate3d(0px, 0px, 0)"].join(";"), e.appendChild(n), n;
}

function okt(e, t) {
  e.style.transform = `translate3d(${t.x}px, ${t.y}px, 0)`, e.style.willChange = "";
}

function dFt(e, t, n, r) {
  if (!n.isConnected) return;
  n.classList.add("node-dragging-self");
  const a = e.homes.get(t);
  if ((a == null ? void 0 : a.el) === n && n.parentElement === e.layer) {
    okt(n, r), e.anchors.set(t, r);
    return;
  }
  (!e.homes.has(t) || (a == null ? void 0 : a.el) !== n) && e.homes.set(t, {
    parent: n.parentNode,
    nextSibling: n.nextSibling,
    el: n
  }), e.anchors.set(t, r), okt(n, r), n.parentElement !== e.layer && e.layer.appendChild(n);
}

function kxi(e) {
  return (K5 == null ? void 0 : K5.anchors.get(e)) ?? null;
}

function Axi(e) {
  var r;
  const t = K5;
  if (!(t != null && t.anchors.has(e))) return !1;
  const n = t.homes.get(e);
  return (r = n == null ? void 0 : n.el) != null && r.isConnected ? n.el.parentElement === t.layer : !1;
}

function Sxi(e, t) {
  uFt(null);
  const n = ikt();
  if (!n || t.size === 0) return !1;
  const a = {
    layer: _xi(n),
    homes: new Map(),
    anchors: new Map(),
    delta: {
      x: 0,
      y: 0
    },
    membersDirty: !1,
    observer: null,
    repairRafId: null
  };
  return K5 = a, t.forEach((i, o) => {
    const s = e.get(o);
    s && dFt(a, o, s, i);
  }), typeof MutationObserver < "u" && (a.observer = new MutationObserver(i => {
    if (K5 === a) for (const o of i) {
      const s = [...o.addedNodes, ...o.removedNodes];
      for (const l of s) {
        if (!(l instanceof HTMLElement)) continue;
        const d = l.getAttribute("data-node-id");
        if (d && a.anchors.has(d)) {
          lcn(a);
          return;
        }
        const u = l.querySelector("[data-node-id]"),
          h = u == null ? void 0 : u.getAttribute("data-node-id");
        if (h && a.anchors.has(h)) {
          lcn(a);
          return;
        }
      }
    }
  }), a.observer.observe(n, {
    childList: !0,
    subtree: !0
  })), !0;
}

function Ixi() {
  const e = K5;
  e && (e.membersDirty = !1, e.anchors.forEach((t, n) => {
    var i;
    const r = e.homes.get(n);
    let a = (i = r == null ? void 0 : r.el) != null && i.isConnected && r.el.getAttribute("data-node-id") === n ? r.el : null;
    (!a || a.parentElement !== e.layer) && (a = edr(n)), a && (a.parentElement !== e.layer ? dFt(e, n, a, t) : (e.anchors.set(n, t), okt(a, t)));
  }));
}

function Cxi(e, t) {
  const n = K5;
  n && (n.observer && !n.membersDirty || (n.membersDirty = !1, t.forEach((r, a) => {
    let i = e.get(a);
    (!(i != null && i.isConnected) || i.getAttribute("data-node-id") !== a) && (i = edr(a) ?? void 0, i && e.set(a, i)), i && (i.parentElement !== n.layer ? dFt(n, a, i, r) : n.anchors.set(a, r));
  })));
}

function Exi(e, t) {
  const n = K5;
  n && (n.delta = {
    x: e,
    y: t
  }, n.layer.style.transform = `translate3d(${e}px, ${t}px, 0)`);
}

function Txi(e) {
  const {
    parent: t,
    nextSibling: n,
    el: r
  } = e;
  if (!(!r.isConnected && !t)) try {
    if (n && n.parentNode === t && n !== r) t.insertBefore(r, n);else if (t && t.isConnected) t.appendChild(r);else {
      const a = ikt();
      a == null || a.appendChild(r);
    }
  } catch {
    const a = ikt();
    a == null || a.appendChild(r);
  }
}

function uFt(e) {
  var n;
  const t = K5;
  t && (K5 = null, (n = t.observer) == null || n.disconnect(), t.repairRafId != null && (typeof cancelAnimationFrame == "function" ? cancelAnimationFrame(t.repairRafId) : clearTimeout(t.repairRafId), t.repairRafId = null), t.homes.forEach((r, a) => {
    const i = r.el;
    if (!i.isConnected) return;
    const o = (e == null ? void 0 : e.get(a)) ?? t.anchors.get(a) ?? null;
    o && (i.style.transform = `translate3d(${o.x}px, ${o.y}px, 0)`), i.style.willChange = "", i.classList.remove("node-dragging-self");
  }), t.layer.style.transform = "translate3d(0px, 0px, 0)", t.delta = {
    x: 0,
    y: 0
  }, t.homes.forEach(r => {
    r.el.isConnected && Txi(r);
  }), t.layer.remove());
}

function ccn(e) {
  for (const t of [document.body, document.getElementById("canvas-bg")]) t == null || t.classList.toggle("canvas-node-dragging", e), t == null || t.classList.toggle("canvas-box-select-group-dragging", e);
}

function dcn(e, t) {
  const n = t.get(e);
  if (n != null && n.isConnected && n.getAttribute("data-node-id") === e) return n;
  const r = qC(e);
  return r ? t.set(e, r) : t.delete(e), r;
}

function Mxi(e, t, n, r) {
  const a = new Map();
  e.forEach(f => {
    var y;
    return (y = dcn(f, a)) == null ? void 0 : y.classList.add("node-dragging-self");
  });
  const {
      groupIds: i,
      directIds: o
    } = fxi(e, n),
    s = new Map(),
    l = new Map();
  i.forEach(f => {
    const y = t.get(f),
      b = a.get(f);
    y && l.set(f, y), b && s.set(f, b);
  });
  const d = xxi(i.size, r) && Sxi(s, l),
    u = d ? o : e;
  let h = R1e();
  exi(h);
  const p = (f = !1) => {
      !f && !(h.boundsEl && !h.boundsEl.isConnected || h.toolbarEl && !h.toolbarEl.isConnected || h.batchConnectEl && !h.batchConnectEl.isConnected) || (h = R1e());
    },
    m = {
      hasMissingElements: () => a.size < e.size || !h.boundsEl,
      refresh(f) {
        p(!0), m.paint(f);
      },
      paint(f) {
        d && (Cxi(s, l), Exi(f.x, f.y), l.forEach((y, b) => VN(b, y.x + f.x, y.y + f.y))), u.forEach(y => {
          const b = t.get(y);
          if (!b) return;
          const v = b.x + f.x,
            _ = b.y + f.y;
          VN(y, v, _);
          const w = dcn(y, a);
          w && (w.classList.add("node-dragging-self"), u.size <= 6 && (w.style.willChange = "transform"), w.style.transform = `translate3d(${v}px, ${_}px, 0)`);
        }), p(), Vcr(h, f.x, f.y);
      },
      releaseNodes(f) {
        d && uFt(f), $ke(f);
      },
      finishChrome(f, y, b) {
        p(), Qcr(h, {
          finalBounds: Wcr(e, f, y)
        });
      }
    };
  return m;
}

function Pxi(e, t, n) {
  return {
    begin() {
      var o, s, l, d;
      const r = n(),
        a = ((o = r.getConnections) == null ? void 0 : o.call(r)) ?? [],
        i = ((s = r.svgContainerRef) == null ? void 0 : s.current) ?? null;
      a.length && (C8n(e, a, i), t.forEach((u, h) => R1(h, u.x, u.y)), fxe(e, a, i, (l = r.collectionEndpointsRef) == null ? void 0 : l.current, (d = r.intraGroupConnectionIdsRef) == null ? void 0 : d.current, {
        zoom: r.viewRef.current.zoom || 1,
        startPositions: t
      }));
    },
    paint(r) {
      var o, s, l;
      const a = n(),
        i = ((o = a.getConnections) == null ? void 0 : o.call(a)) ?? [];
      i.length && ((s = a.svgContainerRef) != null && s.current) && qae(i, a.viewRef.current, a.svgContainerRef.current, r, (l = a.collectionEndpointsRef) == null ? void 0 : l.current);
    },
    finish(r, a) {
      var l, d, u, h, p, m;
      const i = n(),
        o = ((l = i.getConnections) == null ? void 0 : l.call(i)) ?? [],
        s = ((d = i.svgContainerRef) == null ? void 0 : d.current) ?? null;
      if (r.forEach((f, y) => R1(y, f.x, f.y)), gxe(o, i.viewRef.current, s, (u = i.collectionEndpointsRef) == null ? void 0 : u.current, (h = i.intraGroupConnectionIdsRef) == null ? void 0 : h.current), a) {
        const f = new Set(o.filter(y => e.has(y.from) && e.has(y.to)).map(y => y.id));
        $Et(o, i.viewRef.current, s, (p = i.collectionEndpointsRef) == null ? void 0 : p.current, void 0, (m = i.intraGroupConnectionIdsRef) == null ? void 0 : m.current, f);
      }
    },
    clear() {
      var r;
      E8n(((r = n().svgContainerRef) == null ? void 0 : r.current) ?? null);
    }
  };
}

function Rxi(e) {
  return e.button === 0 && !e.ctrlKey && !e.metaKey;
}

function Nxi(e, t, n) {
  return {
    x: (t.x - e.x) * n.x,
    y: (t.y - e.y) * n.y
  };
}

function jxi(e, t, n, r) {
  let a = !0,
    i = !1,
    o = {
      x: 0,
      y: 0
    },
    s = null,
    l = null;
  const d = () => {
      s !== null && r.cancelFrame(s), l !== null && r.cancelFrame(l), s = l = null;
    },
    u = p => {
      let m = Nxi(e, p, t);
      return r.snapDelta && (m = r.snapDelta(m)), m.x === o.x && m.y === o.y ? !1 : (o = m, r.paint(o), !0);
    },
    h = (p, m) => {
      if (!a || i) return;
      i = !0, d();
      let f = !1,
        y = new Map();
      try {
        p && r.current() ? (r.edges(o), y = gxi(n, o), r.commit(y), r.current() ? (r.complete(y), f = !0) : r.rollback(!0)) : r.rollback(!r.current());
      } catch (b) {
        r.report(b);
        try {
          r.rollback(!0);
        } catch (v) {
          r.report(v);
        }
      } finally {
        a = !1;
        try {
          r.release();
        } catch (b) {
          r.report(b);
        }
      }
      if (f && r.current()) try {
        r.settle(y);
      } catch (b) {
        r.report(b);
      }
    };
  return {
    finish: h,
    move(p) {
      if (!(!a || i)) {
        if (!r.current()) {
          h(!1);
          return;
        }
        try {
          if (!u(p)) return;
          s === null && (s = r.frame(() => {
            if (s = null, !(!a || i)) {
              if (!r.current()) {
                h(!1);
                return;
              }
              try {
                r.edges(o);
              } catch (f) {
                r.report(f), h(!1);
              }
            }
          }));
        } catch (m) {
          r.report(m), h(!1);
        }
      }
    },
    refreshAfterMount() {
      !a || l !== null || (l = r.frame(() => {
        if (l = null, !(!a || i)) {
          if (!r.current()) {
            h(!1);
            return;
          }
          try {
            r.refresh ? r.refresh(o) : r.paint(o);
          } catch (p) {
            r.report(p), h(!1);
          }
        }
      }));
    }
  };
}

function Dxi(e, t = window) {
  let n = "mouse";
  const r = s => {
      n === "mouse" && ((s.buttons & 1) === 0 ? e.finish(!0, {
        x: s.clientX,
        y: s.clientY
      }) : e.move({
        x: s.clientX,
        y: s.clientY
      }));
    },
    a = s => {
      n = s.pointerType || "mouse", (s.buttons & 1) === 0 ? n !== "mouse" && e.finish(!0, {
        x: s.clientX,
        y: s.clientY
      }) : e.move({
        x: s.clientX,
        y: s.clientY
      });
    },
    i = s => e.finish(!0, {
      x: s.clientX,
      y: s.clientY
    }),
    o = () => e.finish(!0);
  return t.addEventListener("mousemove", r), t.addEventListener("pointermove", a, {
    capture: !0,
    passive: !0
  }), t.addEventListener("mouseup", i, !0), t.addEventListener("pointerup", i, !0), t.addEventListener("pointercancel", o, !0), t.addEventListener("blur", o), () => {
    t.removeEventListener("mousemove", r), t.removeEventListener("pointermove", a, !0), t.removeEventListener("mouseup", i, !0), t.removeEventListener("pointerup", i, !0), t.removeEventListener("pointercancel", o, !0), t.removeEventListener("blur", o);
  };
}

function Lxi(e, t, n, r, a, i) {
  var w, k;
  const o = r(),
    s = o.viewRef.current.zoom || 1,
    l = a4n(s, document.getElementById("canvas-bg")),
    d = A => console.warn("[SelectionDrag] 框选拖拽异常:", A);
  let u = () => {},
    h = () => {},
    p = !1,
    m;
  const f = Pxi(t, n, r),
    y = () => {
      var A, S;
      u(), u = () => {}, p && (p = !1, lU()), ccn(!1), d7(), f.clear(), o.isDraggingRef.current = !1, (S = (A = r()).onDragActiveChange) == null || S.call(A, !1);
    },
    b = !!o.snapToGrid,
    v = o.snapGrid ?? BY,
    _ = jxi(e, {
      x: l.dx,
      y: l.dy
    }, n, {
      current: a,
      frame: A => window.requestAnimationFrame(A),
      cancelFrame: A => window.cancelAnimationFrame(A),
      paint: A => m == null ? void 0 : m.paint(A),
      refresh: A => m == null ? void 0 : m.refresh(A),
      edges: A => f.paint(A),
      snapDelta: b ? A => yxi(A, n, {
        snapGrid: v
      }) : void 0,
      commit: A => {
        m == null || m.releaseNodes(A), h = g8n(t, () => {
          if (a()) try {
            r().onCommitPositions(A, a), a() && $ke(A);
          } catch (S) {
            d(S);
          }
        }), r().onCommitPositions(A, a);
      },
      complete: A => {
        const S = r();
        f.finish(A, !0), m == null || m.finishChrome(A, S.nodesRef.current, S.viewRef.current.zoom || 1), Kae();
      },
      rollback: A => {
        h();
        const S = r(),
          C = A ? Zcr(t, S.nodesRef.current, (I, E) => E) : n;
        m ? m.releaseNodes(C) : (uFt(C), $ke(C)), m == null || m.finishChrome(C, S.nodesRef.current, S.viewRef.current.zoom || 1), HN(), f.finish(C, !1);
      },
      release: y,
      settle: () => {
        oM(), a() || h();
      },
      report: d
    });
  try {
    if (HN(), o.isDraggingRef.current = !0, cU(t), ccn(!0), m = Mxi(t, n, o.nodesRef.current, s), p = !0, Aj(), (k = (w = r()).onDragActiveChange) == null || k.call(w, !0), !a()) return _.finish(!1), {
      finish: _.finish,
      dispose: () => _.finish(!1)
    };
    m.paint({
      x: 0,
      y: 0
    }), Kae(), f.begin(), u = Dxi(_), (i || m.hasMissingElements()) && _.refreshAfterMount();
  } catch (A) {
    d(A), _.finish(!1);
  }
  return {
    finish: _.finish,
    dispose() {
      _.finish(!1), h();
    }
  };
}

function Oxi(e) {
  const t = g.useRef(e),
    n = g.useRef(null),
    r = g.useRef(0);
  g.useLayoutEffect(() => {
    t.current = e;
  });
  const a = g.useCallback(() => {
    var o;
    (o = n.current) == null || o.dispose(), n.current = null, r.current++;
  }, []);
  return g.useLayoutEffect(() => {
    const o = e.document.subscribe(a);
    return () => {
      o(), a();
    };
  }, [e.document, a]), {
    startDrag: g.useCallback((o, s, l) => {
      var f;
      a();
      const d = t.current,
        u = d.document.lease(),
        h = ++r.current,
        p = () => r.current === h && u.isCurrent();
      if (!p() || d.selectedNodeIdsRef.current.size < 2) return !1;
      aFt();
      let m = new Set(d.selectedNodeIdsRef.current);
      d.isDraggingRef.current = !0;
      try {
        const y = l != null && l.altKey ? (f = d.onDuplicateForAltDrag) == null ? void 0 : f.call(d) : null;
        if (!p()) return d.isDraggingRef.current = !1, !1;
        y && (m = y.copyIds);
        const b = (y == null ? void 0 : y.initialPositions) ?? Zcr(m, d.nodesRef.current, NJ);
        return b.size ? (n.current = Lxi({
          x: o,
          y: s
        }, m, b, () => t.current, p, !!(l != null && l.altKey)), d.isDraggingRef.current) : (d.isDraggingRef.current = !1, !1);
      } catch (y) {
        return d.isDraggingRef.current = !1, console.warn("[SelectionDrag] 框选拖拽启动失败:", y), !1;
      }
    }, [a]),
    cancelDrag: a
  };
}

const tdr = new Set(["gen-image", "gen-video", "image-wash", "fal-rembg", "virtual-try-on", "video-relight"]),
  Bxi = new Set(["progress", "status", "isGenerating", "error", "errorMsg", "_agentRunning", "_executeTrigger", "washOriginalUrl", "washOriginalAssetId", "generatedImages", "generatedImageUrl", "mjImages", "previewMjImages", "batchImages", "selectedMjImageIndex", "_mjAssetIds", "_mjPreviewAssetIds", "_contentAssetId", "_selectedImageAssetId", "_selectedVideoAssetId", "_localCacheAssetId", "_assetId", "_blobUrl", "_canvasDisplayPreviewUrl", "_pendingRemoteResultUrl", "_thumbnailAssetId", "_compactOriginalRelPath", "_projectFullAssetKey", "_projectId", _i, Pi, Cl, T0, "previewSize", "previewActualSize", "imageSize", "previewSourceModel", "previewGridRows", "previewGridCols", "previewSourceNodeId", "previewSourceNodeType", "disableThumbnailCreationOnImport", "outputContent", "pendingVideoFile", "showVideoSegmentSelector", "klingVideoSegment", "wan26AudioSegment", "_autoCreatedPreviewId", "selectedPreviewId", "referenceImages", "mjOrefUrl", "mjSrefUrl", "lastSavedUrls", "savedFiles", "hasCustomSize", "savedNodeWidth", "savedNodeHeight", "generationVersions", "activeGenerationVersionIndex", "compactResultsExpanded", "_preGenerateSnapshot", "_batchOutputInputImageIds", "mjNeedsSplit", "mjSplitError", "generatedImageUrl", "videoPosterUrl", "_localVideoPlaybackUrl", "_useCanvasPreviewDisplay", "_globalOssUrlOnly", "_compactPreviewUrl", "_localPreviewUrl", "_originalUrl", "selectedPreviewImage", "selectedPreviewVideo", "previewMjVideos", "thumbnailUrl", "remoteTaskId", "previewOssRemoteUrl", EY, kD, "videoUrl", OS, "lastSaved"]);

function Fxi(e) {
  if (!e) return;
  const t = {
    ...e
  };
  for (const n of Bxi) delete t[n];
  return Object.keys(t).length > 0 ? t : void 0;
}

function zxi(e) {
  return tdr.has(e.type) ? {
    ...e,
    content: "",
    previewType: void 0,
    isGenerating: !1,
    extractingFrames: !1,
    isMasking: !1,
    errorMsg: void 0,
    thumbnailUrl: void 0,
    videoPosterUrl: void 0,
    videoFileName: void 0,
    videoMeta: void 0,
    previewMjImages: void 0,
    previewMjVideos: void 0,
    selectedPreviewImage: void 0,
    selectedPreviewVideo: void 0,
    _contentAssetId: void 0,
    _previewMjAssetIds: void 0,
    _selectedImageAssetId: void 0,
    _selectedVideoAssetId: void 0,
    _localFilePath: void 0,
    frames: void 0,
    selectedKeyframes: void 0,
    settings: Fxi(e.settings)
  } : e;
}

function Uxi(e) {
  const t = e.settings || {};
  return String(e._contentAssetId || t._localCacheAssetId || t._contentAssetId || t._assetId || "").trim();
}

function $xi(e) {
  const t = e.settings || {},
    n = [_f(e), typeof e.content == "string" ? e.content : "", typeof t[Pi] == "string" ? t[Pi] : "", typeof t[_i] == "string" ? t[_i] : ""];
  for (const r of n) {
    const a = String(r || "").trim();
    if (!nr(a)) continue;
    const i = DIn(a);
    if (i) return i;
  }
  return null;
}

function Gxi(e) {
  if (e.type !== "input-image") return e;
  const t = e.settings || {},
    n = Uxi(e),
    r = typeof t._blobUrl == "string" ? t._blobUrl.trim() : "";
  if (r.startsWith("blob:") || r.startsWith("data:")) return {
    ...e,
    content: r,
    ...(n ? {
      _contentAssetId: n
    } : {})
  };
  const a = typeof e.content == "string" ? e.content.trim() : "";
  if (a.startsWith("blob:") || a.startsWith("data:")) {
    const o = a.startsWith("blob:") ? vm(a) : null,
      s = n || o || void 0;
    return s ? {
      ...e,
      _contentAssetId: s
    } : e;
  }
  const i = $xi(e);
  return i ? {
    ...e,
    content: i,
    ...(n ? {
      _contentAssetId: n
    } : {})
  } : e;
}

function Gke(e, t) {
  let n = zxi(e);
  if (n = Gxi(n), e.type === "text-node" || e.type === "gen-speech" || e.type === "gen-music") {
    const a = {
      ...(n.settings || {})
    };
    delete a.textNodeComposerOpen, delete a.speechComposerOpen, delete a.speechPromptOpen, delete a.musicComposerOpen, n = {
      ...n,
      settings: a
    };
  }
  if (e.type === "custom-agent") {
    const a = {
      ...(n.settings || {})
    };
    a._agentRunning = !1, a._executeTrigger = void 0, delete a.outputContent, delete a.progress, delete a.status, delete a.isGenerating, n = {
      ...n,
      isGenerating: !1,
      errorMsg: void 0,
      settings: a
    };
  }
  const r = String((t == null ? void 0 : t.sourceId) || e.id || "").trim();
  return r && sbi({
    ...n,
    id: r,
    prompt: n.prompt ?? e.prompt
  }, t == null ? void 0 : t.connections, t == null ? void 0 : t.nodes) && (n = {
    ...n,
    prompt: ""
  }), n;
}

const Vxi = /^seedance-conn-(.+)-(\d+)$/;

function ucn(e, t) {
  const n = Vxi.exec(String(e || "").trim());
  if (!n) return e;
  const r = t.get(n[1]);
  return r ? `seedance-conn-${r}-${n[2]}` : e;
}

function hcn(e) {
  const t = e.settings || {},
    n = [],
    r = a => {
      const i = String(a || "").trim();
      i && n.push(i);
    };
  return r(e.content), r(_f(e)), r(t._blobUrl), r(t[Pi]), r(t[_i]), n;
}

function hFt(e, t, n) {
  if (e.length === 0 || n.size === 0) return e;
  const r = new Map();
  for (const a of t) {
    const i = n.get(a.id);
    if (!i) continue;
    const o = e.find(u => u.id === i);
    if (!o || a.type !== "input-image" && a.type !== "video-input" && a.type !== "gen-image" && a.type !== "gen-video" && a.type !== "preview") continue;
    const s = hcn(a),
      d = hcn(o)[0];
    if (d) for (const u of s) u && u !== d && r.set(u, d);
  }
  return e.map(a => {
    if (!tdr.has(a.type)) return a;
    const i = {
      ...(a.settings || {})
    };
    let o = !1;
    const s = i.seedanceMaterials;
    if (Array.isArray(s) && s.length > 0) {
      const u = s.map(h => {
        const p = String(h.id || ""),
          m = ucn(p, n),
          f = String(h.url || "").trim(),
          y = f && r.get(f) || f;
        return m === p && y === f ? h : (o = !0, {
          ...h,
          id: m,
          ...(y ? {
            url: y
          } : null)
        });
      });
      i.seedanceMaterials = u;
    }
    const l = i.seedanceDismissedMaterialIds;
    if (Array.isArray(l) && l.length > 0) {
      const u = l.map(h => ucn(h, n));
      u.some((h, p) => h !== l[p]) && (i.seedanceDismissedMaterialIds = u, o = !0);
    }
    const d = i.inputImageOrder;
    if (Array.isArray(d) && d.length > 0 && r.size > 0) {
      const u = d.map(h => {
        const p = String(h || "").trim();
        return p && r.get(p) || h;
      });
      u.some((h, p) => h !== d[p]) && (i.inputImageOrder = u, o = !0);
    }
    return o ? {
      ...a,
      settings: i
    } : a;
  });
}

function pje(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function Hxi(e, t) {
  const n = (e || "").trim();
  if (!n) return "";
  const r = n.match(/^(.+)_(\d+)$/);
  if (r) {
    const s = r[1],
      l = parseInt(r[2], 10),
      d = t.filter(h => h === s || h.startsWith(s + "_")).map(h => {
        if (h === s) return 0;
        const p = h.match(new RegExp(`^${pje(s)}_(\\d+)$`));
        return p ? parseInt(p[1], 10) : -1;
      }).filter(h => h >= 0),
      u = Math.max(l, ...d, 0) + 1;
    return `${s}_${u}`;
  }
  const a = n.match(/^(.+?)(\d+)$/);
  if (a) {
    const s = a[1],
      l = parseInt(a[2], 10),
      d = new RegExp(`^${pje(s)}(\\d+)$`),
      u = t.map(p => {
        const m = p.match(d);
        return m ? parseInt(m[1], 10) : -1;
      }).filter(p => p >= 0),
      h = Math.max(l, ...u, 0) + 1;
    return s + h;
  }
  const i = t.filter(s => s === n || s.startsWith(n + "_")).map(s => {
      if (s === n) return 0;
      const l = s.match(new RegExp(`^${pje(n)}_(\\d+)$`));
      return l ? parseInt(l[1], 10) : -1;
    }).filter(s => s >= 0),
    o = i.length > 0 ? Math.max(...i) + 1 : 1;
  return `${n}_${o}`;
}

function wJe(e, t) {
  const n = t.map(a => (a.nodeName || "").trim()).filter(Boolean),
    r = t;
  return e.map(a => {
    const i = (a.nodeName || "").trim();
    let o;
    if (i) o = Hxi(i, n), n.push(o);else {
      const s = ED(a.type),
        l = r.filter(d => d.type === a.type);
      if (o = s, l.length > 0) {
        const d = l.map(p => {
            const m = p.nodeName || "",
              f = m.match(new RegExp(`^${pje(s)}_(\\d+)$`));
            return f ? parseInt(f[1], 10) : m === s ? 0 : -1;
          }).filter(p => p >= 0),
          h = (d.length > 0 ? Math.max(...d) : -1) + 1;
        h > 0 && (o = `${s}_${h}`);
      }
      n.push(o);
    }
    return o;
  });
}

function Wxi(e, t, n, r, a = []) {
  if (e.size < 2) return null;
  const i = t.filter(u => e.has(u.id));
  if (!i.length) return null;
  const o = i.map(u => {
      var p;
      const h = r(u.id, {
        x: u.x,
        y: u.y
      });
      return Gke({
        ...u,
        id: n(),
        x: h.x,
        y: h.y,
        isGenerating: !1,
        extractingFrames: !1,
        isMasking: !1,
        errorMsg: void 0,
        markers: (p = u.markers) == null ? void 0 : p.map(m => ({
          ...m,
          id: n()
        }))
      }, {
        connections: a,
        nodes: t,
        sourceId: u.id
      });
    }),
    s = wJe(o, t),
    l = new Map(i.map((u, h) => [u.id, o[h].id])),
    d = hFt(o.map((u, h) => ({
      ...u,
      nodeName: s[h]
    })), i, l);
  return {
    nodes: d,
    idMap: l,
    copyIds: new Set(d.map(u => u.id)),
    initialPositions: new Map(d.map(u => [u.id, {
      x: u.x,
      y: u.y
    }]))
  };
}

function qxi(e, t, n) {
  return e.filter(r => t.has(r.from) || t.has(r.to)).map(r => ({
    ...r,
    id: n(),
    from: t.get(r.from) ?? r.from,
    to: t.get(r.to) ?? r.to
  }));
}

function Kxi(e, t, n) {
  n() && (t.forEach((r, a) => R1(a, r.x, r.y)), e.nodesRef.current = ocn(e.nodesRef.current, t), Da.flushSync(() => e.setNodes(r => n() ? ocn(r, t) : r)));
}

function Qxi(e) {
  const t = e.document.lease();
  if (!t.isCurrent()) return null;
  const n = Wxi(e.selectedNodeIdsRef.current, e.nodesRef.current, e.generateId, NJ, e.connectionsRef.current);
  if (!n) return null;
  hlr(n.copyIds);
  const r = qxi(e.connectionsRef.current, n.idMap, e.generateId);
  return Da.flushSync(() => {
    e.setNodes(a => {
      if (!t.isCurrent()) return a;
      const i = [...a, ...n.nodes];
      return e.nodesRef.current = i, i;
    }), e.setConnections(a => t.isCurrent() && r.length ? [...a, ...r] : a), e.setSelectedNodeIds(a => t.isCurrent() ? n.copyIds : a), e.setSelectedNodeId(a => t.isCurrent() ? null : a), n.copyIds.size >= 2 && (e.setShowBoxSelectBounds(a => t.isCurrent() ? !0 : a), e.setShowCollectionForBoxSelect(a => t.isCurrent() ? !0 : a));
  }), t.isCurrent() ? (e.selectedNodeIdsRef.current = n.copyIds, n) : null;
}

function Yxi(e) {
  const t = g.useRef(e),
    n = g.useRef(null);
  g.useLayoutEffect(() => {
    t.current = e;
  });
  const r = g.useCallback(() => {
      n.current !== null && window.cancelAnimationFrame(n.current), n.current = null;
    }, []),
    a = Oxi({
      ...e,
      onCommitPositions: (i, o) => Kxi(t.current, i, o),
      onDuplicateForAltDrag: () => Qxi(t.current),
      getConnections: () => {
        const i = t.current;
        return i.connectionsRef.current.length ? i.connectionsRef.current : i.visibleConnectionsRef.current;
      },
      onDragActiveChange: i => {
        r();
        const o = t.current;
        !o.connectionsRef.current.length && !o.visibleConnectionsRef.current.length || (i ? n.current = window.requestAnimationFrame(() => {
          n.current = null, t.current.setMountTick(s => s + 1);
        }) : o.setMountTick(s => s + 1));
      }
    });
  return g.useLayoutEffect(() => r, [r]), a;
}

const Qre = 50,
  Xxi = 15,
  pcn = 3;

function Jxi(e) {
  return (e.isDragging || e.connectingSource !== null) && !e.isPanning;
}

function bMe(e) {
  if (e >= Qre) return 0;
  const t = 1 - e / Qre;
  return pcn + (Xxi - pcn) * t;
}

function Zxi(e) {
  const t = e.mouseX,
    n = e.windowWidth - e.mouseX,
    r = e.mouseY,
    a = e.windowHeight - e.mouseY;
  let i = 0,
    o = 0;
  return t < Qre ? i = bMe(t) : n < Qre && (i = -bMe(n)), r < Qre ? o = bMe(r) : a < Qre && (o = -bMe(a)), i === 0 && o === 0 ? null : {
    x: i,
    y: o
  };
}

function e2i({
  isDragging: e,
  connectingSource: t,
  isPanning: n = !1,
  view: r,
  setView: a,
  onPanDelta: i,
  enabled: o = !0
}) {
  const s = g.useRef(null),
    l = g.useRef(null),
    d = g.useRef(!1);
  return g.useEffect(() => {
    if (!o) return;
    const u = Jxi({
      isDragging: e,
      connectingSource: t,
      isPanning: n
    });
    if (d.current = u, !u) {
      s.current !== null && (cancelAnimationFrame(s.current), s.current = null);
      return;
    }
    const h = m => {
      l.current = {
        x: m.clientX,
        y: m.clientY
      };
    };
    window.addEventListener("mousemove", h, {
      passive: !0
    });
    const p = () => {
      if (!d.current || !l.current) {
        s.current = null;
        return;
      }
      const m = Zxi({
        mouseX: l.current.x,
        mouseY: l.current.y,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      });
      m && (i ? i(m.x, m.y) : a(f => ({
        ...f,
        x: f.x + m.x,
        y: f.y + m.y
      }))), s.current = requestAnimationFrame(p);
    };
    return s.current = requestAnimationFrame(p), () => {
      window.removeEventListener("mousemove", h), s.current !== null && (cancelAnimationFrame(s.current), s.current = null);
    };
  }, [e, t, n, o, a, i]), {
    isActive: d.current
  };
}

function t2i(e) {
  return e.selectedConnectionId ? "connection" : e.selectedGroupId && e.canDeleteCollapsedStack && e.groupIsCollapsedStackCard ? "collapsed-stack" : e.selectedNodeId ? "primary-node" : e.selectedNodeIdsCount > 0 ? "multi-nodes" : "none";
}

function HCe(e) {
  return !!(e != null && e.collapsed && e.stackMode === "card");
}

function n2i(e) {
  const t = new Map(),
    n = new Map();
  for (const r of e ?? []) if (HCe(r)) {
    t.set(r.id, [...r.nodeIds]);
    for (const a of r.nodeIds) n.set(a, r.id);
  }
  return {
    membersByPileId: t,
    pileIdByNodeId: n
  };
}

function r2i(e, t) {
  return n2i(e).pileIdByNodeId.has(t);
}

function a2i(e) {
  const t = new Set(e.selectedNodeIds.filter(Boolean)),
    n = [],
    r = e.selectedGroupId ? (e.groups ?? []).find(a => a.id === e.selectedGroupId) : void 0;
  if (HCe(r) && r) {
    for (const a of r.nodeIds) t.add(a);
    n.push(r);
  }
  return {
    nodeIds: [...t],
    groups: n
  };
}

function i2i(e, t) {
  var a;
  if (!t.size) return e;
  let n = !1;
  const r = [];
  for (const i of e) {
    const o = i.nodeIds.filter(l => !t.has(l));
    if (o.length === 0 || HCe(i) && o.length < 2) {
      n = !0;
      continue;
    }
    if (o.length === i.nodeIds.length) {
      r.push(i);
      continue;
    }
    n = !0;
    const s = (a = i.stackRestoreLayout) == null ? void 0 : a.filter(l => !t.has(l.nodeId));
    r.push({
      ...i,
      nodeIds: o,
      stackRestoreLayout: s != null && s.length ? s : void 0,
      updatedAt: Date.now()
    });
  }
  return n ? r : e;
}

function o2i(e, t, n) {
  if (!(e != null && e.length)) return [];
  const r = new Set(t.values()),
    a = Date.now();
  return e.flatMap(i => {
    var d;
    if (!HCe(i)) return [];
    const o = new Set(),
      s = [];
    for (const u of i.nodeIds) {
      const h = t.get(u);
      !h || !r.has(h) || o.has(h) || (o.add(h), s.push(h));
    }
    if (s.length < 2) return [];
    const l = (d = i.stackRestoreLayout) == null ? void 0 : d.map(u => {
      const h = t.get(u.nodeId);
      return h ? {
        ...u,
        nodeId: h,
        x: u.x + n.x,
        y: u.y + n.y
      } : null;
    }).filter(u => !!u);
    return [{
      ...i,
      id: WK(),
      nodeIds: s,
      collapsedX: (i.collapsedX ?? 0) + n.x,
      collapsedY: (i.collapsedY ?? 0) + n.y,
      stackRestoreLayout: l,
      createdAt: a,
      updatedAt: a
    }];
  });
}

const s2i = ({
  nodesRef: e,
  connectionsRef: t,
  selectedNodeIdRef: n,
  selectedNodeIdsRef: r,
  selectedConnectionIdRef: a,
  mousePosRef: i,
  deleteNode: o,
  deleteNodes: s,
  setSelectedNodeId: l,
  setSelectedNodeIds: d,
  setSelectedConnectionId: u,
  setNodes: h,
  setConnections: p,
  setGroups: m,
  onSave: f,
  tryConsumeUndoForDoodle: y,
  onUndo: b,
  onRedo: v,
  tryConsumeDoodleSubToolKey: _,
  selectedGroupIdRef: w,
  groupsRef: k,
  onDeleteCollapsedStackGroup: A,
  onClearGroupSelection: S,
  setSelectedGroupId: C
}) => {
  const I = g.useRef(null);
  return g.useEffect(() => {
    const E = async M => {
      if (!(M.ctrlKey || M.metaKey) || M.shiftKey || M.key.toLowerCase() !== "s") return;
      if (document.body.dataset.director3dControl === "1") {
        M.preventDefault(), M.stopPropagation();
        return;
      }
      const T = M.target;
      T.tagName === "INPUT" || T.tagName === "TEXTAREA" || T.isContentEditable || (M.preventDefault(), M.stopPropagation(), f && (console.log("[Keyboard] Ctrl+S triggered, saving project..."), await f()));
    };
    return window.addEventListener("keydown", E), () => window.removeEventListener("keydown", E);
  }, [f]), g.useEffect(() => {
    const E = M => {
      const T = bfa(M);
      if (T && document.body.dataset.director3dControl !== "1") {
        if (T === "undo" && (y != null && y())) {
          M.preventDefault(), M.stopPropagation();
          return;
        }
        if (T === "undo" && b) {
          M.preventDefault(), b();
          return;
        }
        T === "redo" && v && (M.preventDefault(), v());
      }
    };
    return window.addEventListener("keydown", E), () => window.removeEventListener("keydown", E);
  }, [v, b, y]), g.useEffect(() => {
    const E = M => {
      const T = M.target;
      if (!(T.tagName === "INPUT" || T.tagName === "TEXTAREA" || T.isContentEditable) && (M.key === "Delete" || M.key === "Del")) {
        M.preventDefault(), M.stopPropagation();
        const P = a.current,
          R = (w == null ? void 0 : w.current) ?? null,
          j = R && k ? k.current.find(G => G.id === R) : void 0,
          B = n.current,
          F = r.current,
          N = t2i({
            selectedConnectionId: P,
            selectedGroupId: R,
            canDeleteCollapsedStack: !!(A && k),
            groupIsCollapsedStackCard: !!(j != null && j.collapsed && j.stackMode === "card"),
            selectedNodeId: B,
            selectedNodeIdsCount: (F == null ? void 0 : F.size) ?? 0
          });
        if (N === "connection" && P) {
          p(G => G.filter(z => z.id !== P)), u(null);
          return;
        }
        if (N === "collapsed-stack" && R) {
          A == null || A(R), S == null || S();
          return;
        }
        if (N === "primary-node" && B) {
          o(B), l(null);
          return;
        }
        if (N === "multi-nodes" && F && F.size > 0) {
          const G = [...F];
          s ? s(G) : G.forEach(z => o(z)), d(new Set());
        }
      }
    };
    return window.addEventListener("keydown", E), () => window.removeEventListener("keydown", E);
  }, [o, s, n, r, a, w, k, A, S, l, d, u, p]), g.useEffect(() => {
    let E = null;
    const M = () => {
        E && (clearTimeout(E), E = null);
      },
      T = () => {
        const j = GVn();
        return j || n.current;
      },
      P = j => {
        const B = T(),
          F = B ? yFe(B) : "idle";
        if (F === "recording" && VXt(j)) {
          j.preventDefault(), j.stopPropagation(), Wyt(B);
          return;
        }
        if (F === "processing" && VXt(j)) {
          j.preventDefault(), j.stopPropagation();
          return;
        }
        const N = j.target;
        if (N.tagName === "INPUT" || N.tagName === "TEXTAREA" || N.tagName === "SELECT" || !!N.closest("dialog[open]") || N.isContentEditable || j.ctrlKey || j.metaKey || j.altKey || j.repeat) return;
        const z = j.key;
        if (!z || z.length !== 1) return;
        const V = z.toLowerCase();
        if (!(V !== "v" && V !== "b" && V !== "e")) {
          if (_ != null && _(j)) {
            j.preventDefault(), j.stopPropagation();
            return;
          }
          if (V === "v" && xfa(j)) {
            const O = n.current,
              L = O ? e.current.find(D => D.id === O) : void 0;
            L && wfa(L.type) && (M(), E = setTimeout(() => {
              E = null, wFe(L.id);
            }, vfa));
          }
        }
      },
      R = j => {
        j.key.toLowerCase() === "v" && M();
      };
    return window.addEventListener("keydown", P, !0), window.addEventListener("keyup", R, !0), () => {
      M(), window.removeEventListener("keydown", P, !0), window.removeEventListener("keyup", R, !0);
    };
  }, [e, n, _]), g.useEffect(() => {
    const E = B => {
        if (B instanceof HTMLInputElement || B instanceof HTMLTextAreaElement) {
          const F = B.selectionStart,
            N = B.selectionEnd;
          if (F != null && N != null && F !== N) return !0;
        }
        if (B.isContentEditable) {
          const F = window.getSelection();
          if (F && F.toString().trim()) return !0;
        }
        return !1;
      },
      M = B => !!B.closest("[data-chat-copy-zone]"),
      T = B => {
        if (!((B.ctrlKey || B.metaKey) && B.key === "c")) return;
        const F = window.getSelection();
        if (F && F.toString().trim()) return;
        const N = B.target,
          G = N.tagName === "INPUT" || N.tagName === "TEXTAREA" || N.isContentEditable;
        if (M(N)) return;
        if (G) {
          if (E(N)) return;
          B.preventDefault();
          return;
        }
        const z = n.current,
          V = r.current,
          O = z ? [z] : V && V.size > 0 ? Array.from(V) : [],
          L = a2i({
            groups: k == null ? void 0 : k.current,
            selectedNodeIds: O,
            selectedGroupId: w == null ? void 0 : w.current
          });
        if (L.nodeIds.length > 0) {
          B.preventDefault(), B.stopPropagation();
          const D = e.current.filter(K => L.nodeIds.includes(K.id)),
            H = t.current.filter(K => L.nodeIds.includes(K.from) || L.nodeIds.includes(K.to)).filter(K => L.nodeIds.includes(K.from) && L.nodeIds.includes(K.to)),
            Y = D.map(K => {
              let W = K.width,
                Q = K.height;
              const q = KLe(K.id);
              if (q) W = q.width, Q = q.height;else {
                const ne = document.querySelector(`[data-node-id="${K.id}"]`);
                if (ne) {
                  const de = ne.style.width,
                    le = ne.style.height;
                  if (de && le) W = parseInt(de) || K.width, Q = parseInt(le) || K.height;else {
                    const J = ne.offsetWidth || K.width,
                      pe = ne.offsetHeight || K.height;
                    (J !== K.width || pe !== K.height) && (W = J, Q = pe);
                  }
                }
              }
              return Gke({
                ...K,
                width: W,
                height: Q
              }, {
                connections: t.current,
                nodes: e.current,
                sourceId: K.id
              });
            });
          I.current = {
            nodes: Y,
            connections: H.map(K => ({
              ...K
            })),
            groups: L.groups.map(K => {
              var W;
              return {
                ...K,
                nodeIds: [...K.nodeIds],
                stackRestoreLayout: (W = K.stackRestoreLayout) == null ? void 0 : W.map(Q => ({
                  ...Q
                }))
              };
            }),
            timestamp: Date.now()
          }, console.log(`已复制 ${D.length} 个节点`);
        }
      },
      P = async () => {
        var X;
        const B = I.current;
        if (!((X = B == null ? void 0 : B.nodes) != null && X.length)) return;
        const {
            contentStore: F
          } = await Ie(async () => {
            const {
              contentStore: Z
            } = await Promise.resolve().then(() => Ly);
            return {
              contentStore: Z
            };
          }, void 0, import.meta.url),
          {
            warmContentCacheForPaste: N
          } = await Ie(async () => {
            const {
              warmContentCacheForPaste: Z
            } = await Promise.resolve().then(() => MXe);
            return {
              warmContentCacheForPaste: Z
            };
          }, void 0, import.meta.url),
          G = [];
        B.nodes.forEach((Z, re) => {
          (Z.type === "input-image" || Z.type === "video-input") && Z.content && F.isContentRef(Z.content) && G.push({
            index: re,
            ref: Z.content
          });
        }), G.length > 0 && (await F.init(), (await Promise.all(G.map(async ({
          ref: re
        }) => {
          try {
            const fe = F.extractId(re),
              ye = await F.get(fe);
            return {
              id: fe,
              data: ye
            };
          } catch (fe) {
            return console.warn("Failed to resolve content_ref for paste:", fe), {
              id: "",
              data: null
            };
          }
        }))).forEach(({
          id: re,
          data: fe
        }) => {
          re && fe && N(re, fe);
        }));
        const z = i.current.x,
          V = i.current.y,
          O = B.nodes;
        if (O.length === 0) return;
        const L = Math.min(...O.map(Z => Z.x || 0)),
          D = Math.min(...O.map(Z => Z.y || 0)),
          U = Math.max(...O.map(Z => (Z.x || 0) + (Z.width || 0))),
          H = Math.max(...O.map(Z => (Z.y || 0) + (Z.height || 0))),
          Y = (L + U) / 2,
          K = (D + H) / 2,
          W = z - Y,
          Q = V - K,
          q = new Map(),
          ne = Date.now();
        B.nodes.forEach((Z, re) => {
          const fe = `node-${ne}-${re}-${Math.random().toString(36).substr(2, 9)}`;
          q.set(Z.id, fe);
        });
        const de = e.current,
          le = wJe(B.nodes, de),
          J = B.nodes.map((Z, re) => {
            const fe = le[re],
              ye = q.get(Z.id);
            return Gke({
              ...Z,
              id: ye,
              x: Z.x + W,
              y: Z.y + Q,
              nodeName: fe,
              isGenerating: !1,
              errorMsg: void 0
            }, {
              connections: t.current,
              nodes: e.current,
              sourceId: Z.id
            });
          }),
          pe = hFt(J, B.nodes, q),
          ce = (B.connections || []).filter(Z => Z && q.has(Z.from) && q.has(Z.to)).map((Z, re) => ({
            ...Z,
            id: `conn-${ne}-${re}-${Math.random().toString(36).substr(2, 9)}`,
            from: q.get(Z.from),
            to: q.get(Z.to)
          }));
        h(Z => [...Z, ...pe]), p(Z => [...Z, ...ce]);
        const we = m ? o2i(B.groups, q, {
          x: W,
          y: Q
        }) : [];
        we.length > 0 ? (m == null || m(Z => [...Z, ...we]), l(null), d(new Set()), C == null || C(we[0].id)) : pe.length === 1 ? (l(pe[0].id), d(new Set([pe[0].id]))) : pe.length > 1 && (l(null), d(new Set(pe.map(Z => Z.id)))), console.log(`已粘贴 ${pe.length} 个节点`);
      },
      R = async B => {
        var L;
        const F = B.target;
        if ((F == null ? void 0 : F.tagName) === "INPUT" || (F == null ? void 0 : F.tagName) === "TEXTAREA" || !!(F != null && F.isContentEditable)) return;
        const G = B.clipboardData,
          z = (((L = G == null ? void 0 : G.files) == null ? void 0 : L.length) || 0) > 0,
          V = Array.from((G == null ? void 0 : G.items) || []).some(D => D.kind === "file");
        if (z || V) return;
        const O = n.current;
        if (O) {
          const D = e.current.find(U => U.id === O);
          if (D && (D.type === "input-image" || D.type === "video-input")) return;
        }
        B.preventDefault(), B.stopPropagation(), await P();
      },
      j = async B => {
        var V, O;
        if (!((B.ctrlKey || B.metaKey) && B.shiftKey && ((V = B.key) == null ? void 0 : V.toLowerCase()) === "v")) return;
        const N = B.target;
        if ((N == null ? void 0 : N.tagName) === "INPUT" || (N == null ? void 0 : N.tagName) === "TEXTAREA" || !!(N != null && N.isContentEditable)) return;
        const z = I.current;
        (O = z == null ? void 0 : z.nodes) != null && O.length && (B.preventDefault(), B.stopPropagation(), await P());
      };
    return window.addEventListener("keydown", T), window.addEventListener("keydown", j), window.addEventListener("paste", R), () => {
      window.removeEventListener("keydown", T), window.removeEventListener("keydown", j), window.removeEventListener("paste", R);
    };
  }, [e, t, n, r, w, k, i, h, p, m, l, d, C]), {
    copiedNodesRef: I
  };
};

function l2i(e, t) {
  if (e === t) return !0;
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) {
    const r = e[n],
      a = t[n];
    if (r !== a) {
      if (r.id !== a.id || r.nodeName !== a.nodeName) return !1;
      // Opening/closing a text composer is view state. Its mount-time reset
      // must not turn an undo restoration into a new edit that discards redo.
      const i = r.type === "text-node" && r.settings?.textNodeComposerOpen !== a.settings?.textNodeComposerOpen,
        o = i ? { ...r, settings: { ...r.settings, textNodeComposerOpen: void 0 } } : r,
        s = i ? { ...a, settings: { ...a.settings, textNodeComposerOpen: void 0 } } : a;
      if (!(YEt(o, s) || QEt(o, s))) return !1;
    }
  }
  return !0;
}

function c2i(e, t) {
  if (e === t) return !0;
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) {
    const r = e[n],
      a = t[n];
    if (r === a) continue;
    if (r.id !== a.id || r.from !== a.from || r.to !== a.to || r.inputType !== a.inputType || r.fromGroupId !== a.fromGroupId) return !1;
    const i = r.fromGroupNodeIds,
      o = a.fromGroupNodeIds;
    if (i !== o) {
      if (!i || !o || i.length !== o.length) return !1;
      for (let s = 0; s < i.length; s++) if (i[s] !== o[s]) return !1;
    }
  }
  return !0;
}

function d2i(e, t) {
  if (e === t) return !0;
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) {
    const r = e[n],
      a = t[n];
    if (r !== a) {
      if (r.id !== a.id || r.name !== a.name || r.color !== a.color || r.collapsed !== a.collapsed || r.stackMode !== a.stackMode || r.collapsedX !== a.collapsedX || r.collapsedY !== a.collapsedY || r.frameX !== a.frameX || r.frameY !== a.frameY || r.frameWidth !== a.frameWidth || r.frameHeight !== a.frameHeight || r.nodeIds.length !== a.nodeIds.length) return !1;
      for (let i = 0; i < r.nodeIds.length; i++) if (r.nodeIds[i] !== a.nodeIds[i]) return !1;
    }
  }
  return !0;
}

function u2i(e, t) {
  if (e === t) return !0;
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) {
    const r = e[n],
      a = t[n];
    if (r !== a && (r.id !== a.id || r.x !== a.x || r.y !== a.y || r.width !== a.width || r.height !== a.height || r.text !== a.text || r.fontSize !== a.fontSize || r.color !== a.color || r.bold !== a.bold || r.italic !== a.italic || r.underline !== a.underline || r.strike !== a.strike || r.align !== a.align || r.fontFamily !== a.fontFamily)) return !1;
  }
  return !0;
}

function ndr(e, t) {
  return l2i(e.nodes, t.nodes) && c2i(e.connections, t.connections) && d2i(e.groups, t.groups) && u2i(e.textBoxes, t.textBoxes);
}

function h2i(e, t) {
  return e.nodes.length !== t.nodes.length || e.connections.length !== t.connections.length || e.groups.length !== t.groups.length || e.textBoxes.length !== t.textBoxes.length;
}

class p2i {
  constructor(t = 20) {
    On(this, "entries", []);
    On(this, "index", -1);
    this.maxSize = t;
  }
  reset(t) {
    this.entries = [{
      state: t,
      timestamp: Date.now()
    }], this.index = 0;
  }
  push(t) {
    var r;
    const n = (r = this.entries[this.index]) == null ? void 0 : r.state;
    return n && ndr(n, t) ? !1 : (this.entries = this.entries.slice(0, this.index + 1), this.entries.push({
      state: t,
      timestamp: Date.now()
    }), this.entries.length > this.maxSize && (this.entries = this.entries.slice(-this.maxSize)), this.index = this.entries.length - 1, !0);
  }
  get canUndo() {
    return this.index > 0;
  }
  get canRedo() {
    return this.index < this.entries.length - 1;
  }
  get size() {
    return this.entries.length;
  }
  get currentIndex() {
    return this.index;
  }
  undo() {
    var t;
    return this.canUndo ? (this.index -= 1, ((t = this.entries[this.index]) == null ? void 0 : t.state) ?? null) : null;
  }
  redo() {
    var t;
    return this.canRedo ? (this.index += 1, ((t = this.entries[this.index]) == null ? void 0 : t.state) ?? null) : null;
  }
  peek() {
    var t;
    return ((t = this.entries[this.index]) == null ? void 0 : t.state) ?? null;
  }
}

const m2i = 20,
  f2i = 1e3;

function Zot(e) {
  return {
    nodes: e.nodes,
    connections: e.connections,
    groups: e.groups,
    textBoxes: e.canvasTextBoxes
  };
}

function g2i(e) {
  const t = e.enabled !== !1,
    n = g.useRef(new p2i(m2i)),
    r = g.useRef(Zot(e)),
    a = g.useRef(!1),
    i = g.useRef(null),
    o = g.useRef(null),
    s = g.useRef(e);
  s.current = e;
  const [, l] = g.useState(0),
    d = g.useCallback(() => l(v => v + 1), []),
    u = g.useCallback(() => {
      o.current !== null && (window.clearTimeout(o.current), o.current = null);
    }, []),
    h = g.useCallback(v => {
      n.current.push(v) && d();
    }, [d]),
    p = g.useCallback(() => {
      u();
      const v = i.current;
      i.current = null, v && h(v);
    }, [u, h]),
    m = g.useCallback(v => {
      const _ = n.current.peek(),
        w = !!(i.current && _ && !ndr(_, i.current)),
        k = !_ || !ndr(_, v);
      i.current = v, u(), w !== k && d(), o.current = window.setTimeout(() => {
        o.current = null;
        const _ = i.current;
        i.current = null, _ && h(_);
      }, f2i);
    }, [u, h, d]),
    f = g.useCallback(v => {
      if (!v) return;
      a.current = !0, u(), i.current = null, r.current = v;
      const _ = s.current;
      _.nodesRef.current = v.nodes, _.connectionsRef.current = v.connections, _.groupsRef.current = v.groups, _.canvasTextBoxesRef.current = v.textBoxes, _.setNodes(v.nodes), _.setConnections(v.connections), _.setGroups(v.groups), _.setCanvasTextBoxes(v.textBoxes), d(), window.setTimeout(() => {
        a.current = !1;
      }, 0);
    }, [u, d]),
    y = g.useCallback(() => {
      if (!t || a.current) return !1;
      p();
      const v = n.current.undo();
      return v ? (f(v), !0) : !1;
    }, [f, t, p]),
    b = g.useCallback(() => {
      if (!t || a.current) return !1;
      p();
      const v = n.current.redo();
      return v ? (f(v), !0) : !1;
    }, [f, t, p]);
  return g.useEffect(() => {
    const v = Zot(e);
    if (!t) {
      u(), i.current = null, r.current = v;
      return;
    }
    const _ = r.current;
    if (r.current = v, a.current || ndr(_, v)) return;
    const w = h2i(_, v);
    // Flush the previous gesture before a structural change, then let the new
    // node's mount-time defaults settle into its creation entry. Undo flushes
    // this pending state immediately, so it also works before the idle timer.
    w && p(), m(v);
  }, [u, t, p, e.canvasTextBoxes, e.connections, e.groups, e.nodes, m]), g.useEffect(() => {
    if (u(), i.current = null, !t) return;
    const v = Zot(s.current);
    r.current = v, n.current.reset(v), d();
  }, [u, t, e.revision, d]), g.useEffect(() => () => {
    o.current !== null && window.clearTimeout(o.current);
  }, []), {
    undo: y,
    redo: b,
    canUndo: t && (n.current.canUndo || !!(i.current && !ndr(n.current.peek(), i.current))),
    canRedo: t && !(i.current && !ndr(n.current.peek(), i.current)) && n.current.canRedo
  };
}

function y2i(e) {
  return {
    tryConsumeUndoForDoodle() {
      const t = e(),
        n = t.strokesRef.current;
      if (t.activeTool !== "doodle" || !n.length) return !1;
      const r = n[n.length - 1],
        a = n.slice(0, -1);
      return t.strokesRef.current = a, t.setStrokes(a), t.setSelectedIds(i => i.filter(o => o !== r.id)), !0;
    },
    tryConsumeDoodleSubToolKey(t) {
      var i;
      const n = e();
      if (n.activeTool !== "doodle" || t.isComposing) return !1;
      const r = (i = t.key) == null ? void 0 : i.toLowerCase(),
        a = r === "v" ? "select" : r === "b" ? "brush" : r === "e" ? "eraser" : null;
      return a ? (n.setSubTool(a), !0) : !1;
    }
  };
}

function mcn(e) {
  return e.code === "Equal" || e.code === "NumpadAdd" || e.key === "+" ? 1 : e.code === "Minus" || e.code === "NumpadSubtract" ? -1 : null;
}

function b2i(e, t) {
  let n = null;
  const r = () => {
      n !== null && t.clear(n), n = null;
    },
    a = () => {
      const o = e();
      return o.activeTool === "doodle" && (o.subTool === "brush" || o.subTool === "eraser");
    },
    i = o => {
      if (!a()) {
        r();
        return;
      }
      const s = e();
      s.subTool === "brush" ? s.setBrushWidth(l => Math.max(1, Math.min(16, Math.round((l + o * .5) * 2) / 2))) : s.setEraserWidth(l => Math.max(4, Math.min(48, l + o)));
    };
  return {
    cancel: r,
    keydown(o) {
      if ($Z(o.target) || o.isComposing || o.ctrlKey || o.metaKey || o.altKey) {
        r();
        return;
      }
      if (!a()) {
        r();
        return;
      }
      const s = mcn(o);
      s === null || o.repeat || (gNe(o), r(), i(s), n = t.every(() => i(s), 55));
    },
    keyup(o) {
      mcn(o) !== null && r();
    }
  };
}

const v2i = {
  every: (e, t) => window.setInterval(e, t),
  clear: e => window.clearInterval(e)
};

function w2i(e) {
  const t = g.useRef(e);
  g.useLayoutEffect(() => {
    t.current = e;
  });
  const [n] = g.useState(() => y2i(() => t.current)),
    [r] = g.useState(() => b2i(() => t.current, v2i));
  return g.useLayoutEffect(() => {
    const a = () => {
        document.hidden && r.cancel();
      },
      i = o => {
        $Z(o.target) && r.cancel();
      };
    return window.addEventListener("keydown", r.keydown, !0), window.addEventListener("keyup", r.keyup, !0), window.addEventListener("blur", r.cancel), window.addEventListener("focusin", i), document.addEventListener("visibilitychange", a), () => {
      r.cancel(), window.removeEventListener("keydown", r.keydown, !0), window.removeEventListener("keyup", r.keyup, !0), window.removeEventListener("blur", r.cancel), window.removeEventListener("focusin", i), document.removeEventListener("visibilitychange", a);
    };
  }, [r]), g.useLayoutEffect(() => {
    r.cancel();
  }, [r, e.activeTool, e.subTool]), n;
}

async function fcn(e) {
  return new Promise((t, n) => {
    const r = new FileReader();
    r.onload = () => t(String(r.result || "")), r.onerror = () => n(r.error), r.readAsDataURL(e);
  });
}

function pFt(e) {
  if (typeof e != "string" || !e.trim()) return !1;
  const t = e.trim();
  return Tu(t) ? !1 : ua() ? /^https?:\/\//i.test(t) : nr(t);
}

function f2(e) {
  return pFt(e) ? !1 : !!(typeof e != "string" || !e.trim() || Tu(e) || Er.isContentRef(e) || e.startsWith("blob:"));
}

const mje = new Map(),
  _H = new Map();

let skt = !1;

function mFt() {
  mje.clear(), y6n();
}

function xJe() {
  for (const e of _H.values()) if (!(!e.owned || !e.url.startsWith("blob:"))) try {
    URL.revokeObjectURL(e.url);
  } catch {}
  _H.clear(), skt = !1;
}

function fFt() {
  mFt(), xJe();
}

function rdr(e) {
  xJe(), jCt();
  try {
    Ur.clearBlobUrlCache();
  } catch {}
  try {
    ni.clearBlobUrlCache();
  } catch {}
  try {
    Twe({
      force: !0
    });
  } catch {}
  (e == null ? void 0 : e.notifyUi) !== !1 && qWn();
}

async function adr() {
  if (!skt) {
    try {
      await ni.init();
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
      await e.ensureRestored();
    } catch {}
    skt = !0;
  }
}

function x2i(e) {
  return e.type === "gen-video";
}

function _2i(e, t) {
  const n = e.generatedImages,
    r = n == null ? void 0 : n[0],
    a = [r == null ? void 0 : r.assetId, typeof e.assetId == "string" ? e.assetId : void 0, r == null ? void 0 : r.id].filter(i => typeof i == "string" && i.trim().length > 0);
  return a.length > 0 ? [...new Set(a)] : [...new Set(t.filter(i => typeof i == "string" && i.trim().length > 0))];
}

async function est(e, t, n) {
  if (e && !f2(e) && (!n || tl(e)) || !t) return e;
  const {
      readLocalPreviewThumbnailAsUrl: r
    } = await Ie(async () => {
      const {
        readLocalPreviewThumbnailAsUrl: o
      } = await Promise.resolve().then(() => Ui);
      return {
        readLocalPreviewThumbnailAsUrl: o
      };
    }, void 0, import.meta.url),
    a = await r(t);
  if (a) return a;
  const i = await IO(`${t}_thumbnail`);
  return i && tl(i) ? i : e;
}

async function idr(e) {
  const t = String(e || "").trim();
  if (!t) return null;
  const n = mje.get(t);
  if (n) return n;
  try {
    const r = await _D(t);
    if (r && r.size > 0) {
      const a = await fcn(r);
      return mje.set(t, a), a;
    }
  } catch {}
  try {
    await ni.init();
    const r = await ni.getAssetBlob(t);
    if (r && r.size > 0) {
      const a = await fcn(r);
      return mje.set(t, a), a;
    }
  } catch {}
  return null;
}

function k2i(e) {
  const t = e.settings || {},
    n = t._mjAssetIds,
    r = [e._contentAssetId, t[dg], t._localCacheAssetId, t._contentAssetId, t._assetId, e.type === "gen-image" || e.type === "gen-video" || e.type === "input-image" ? e.id : void 0, ...(Array.isArray(n) ? n : [])].filter(i => typeof i == "string" && i.length > 0),
    a = t.generatedImages;
  if (Array.isArray(a)) for (const i of a) i != null && i.id && r.push(i.id);
  return [...new Set(r)];
}

async function IO(e) {
  if (!e || typeof e != "string") return null;
  const t = _H.get(e);
  if (t) return t.url;
  await adr();
  const n = Hfa(e);
  if (n) {
    try {
      const r = await eOe(n.projectId, n.assetKey);
      if (r) return Il(r, e), _H.set(e, {
        url: r,
        owned: r.startsWith("blob:")
      }), r;
    } catch {}
    try {
      const r = await wWe(n.projectId, n.assetKey);
      if (r && r.size > 0) {
        const a = URL.createObjectURL(r);
        return Il(a, e), _H.set(e, {
          url: a,
          owned: !0
        }), a;
      }
    } catch {}
  }
  try {
    const r = await ni.getAssetUrl(e);
    if (r) return r.startsWith("blob:") && Il(r, e), _H.set(e, {
      url: r,
      owned: !1
    }), r;
  } catch {}
  try {
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
    if (r.isAvailable()) {
      const a = await r.readAssetAsUrl(e);
      if (a) return a.startsWith("blob:") && Il(a, e), _H.set(e, {
        url: a,
        owned: !1
      }), a;
    }
  } catch {}
  return null;
}

function odr(e) {
  var n, r;
  if (e.type === "image-wash" && ((n = e.settings) != null && n.washOriginalAssetId) && f2((r = e.settings) == null ? void 0 : r.washOriginalUrl)) return !1;
  const t = typeof e.content == "string" ? e.content : "";
  if (!t || Tu(t) || Er.isContentRef(t) || t.startsWith("blob:") && !Nd(t)) return !1;
  if (t.startsWith("data:") || t.startsWith("blob:") || pFt(t)) {
    const i = (e.settings || {}).generatedImages;
    if (Array.isArray(i)) {
      for (const o of i) if (f2(o == null ? void 0 : o.fullUrl) || f2(o == null ? void 0 : o.url)) return !1;
    }
    return !f2(e.selectedPreviewImage);
  }
  return !1;
}

async function A2i(e, t) {
  var h;
  if (((h = e.settings) == null ? void 0 : h._projectOmitMedia) === !0) return e;
  if (odr(e)) {
    const p = e.settings || {};
    return typeof p._blobUrl == "string" && p._blobUrl.startsWith("blob:") && typeof e.content == "string" && e.content.startsWith("blob:") ? {
      ...e,
      settings: {
        ...p,
        _blobUrl: e.content
      }
    } : e;
  }
  const r = {
      ...e,
      settings: {
        ...(e.settings || {})
      }
    },
    a = r.settings;
  r.type === "image-wash" && a.washOriginalAssetId && f2(a.washOriginalUrl) && (a.washOriginalUrl = (await IO(String(a.washOriginalAssetId))) || "");
  const i = typeof a._blobUrl == "string" && a._blobUrl.startsWith("blob:") ? a._blobUrl : "",
    o = typeof r.content == "string" ? r.content : "";
  if (!o || o.startsWith("blob:") || Er.isContentRef(o) || Tu(o)) {
    const p = [r._contentAssetId, a[dg], a._localCacheAssetId, a._contentAssetId, a._projectFullAssetKey ? kM(String(a._projectId || t), String(a._projectFullAssetKey)) : void 0, a._assetId, r.type === "gen-image" || r.type === "gen-video" || r.type === "input-image" ? r.id : void 0].filter(m => typeof m == "string" && m.length > 0);
    for (const m of [...new Set(p)]) {
      const f = await IO(m);
      if (f) {
        r.content = f, r.type === "input-image" && f.startsWith("blob:") && (a._blobUrl = f);
        break;
      }
    }
  }
  i && a._blobUrl === i && (typeof r.content == "string" && r.content.startsWith("blob:") ? a._blobUrl = r.content : a._blobUrl = "");
  const l = a.generatedImages,
    d = x2i(r);
  if (l != null && l.length) {
    let p = !1;
    const m = await Promise.all(l.map(async (f, y) => {
      const b = f.fullUrl || f.url || "",
        v = f.thumbUrl || "",
        _ = a._projectAssetKeys,
        w = a._mjAssetIds,
        k = f.assetId || f.id || (w == null ? void 0 : w[y]) || (_ != null && _[y] ? kM(t, _[y]) : void 0),
        A = f2(b),
        S = f2(v) || d && !v;
      let C = b,
        I = v,
        E = !1;
      if (k && A) {
        const M = await IO(k);
        M && (C = M, E = !0);
      }
      if (S) {
        const M = await est(v, k, d);
        M && M !== v && (I = M, E = !0);
      }
      return E ? (p = !0, {
        ...f,
        fullUrl: A ? C : b,
        url: A ? C : f.url,
        thumbUrl: S ? I : v
      }) : f;
    }));
    p && (r.settings = {
      ...a,
      generatedImages: m
    });
  }
  const u = a.generationVersions;
  if (Array.isArray(u) && u.length > 0) {
    let p = !1;
    const m = await Promise.all(u.map(async f => {
      var A;
      if (!f || typeof f != "object") return f;
      const y = {
          ...f
        },
        b = d || y.mediaType === "gen-video",
        v = _2i(y, k2i(r)),
        _ = y.generatedImages || [];
      let w = !1;
      const k = await Promise.all(_.map(async S => {
        if (!S || typeof S != "object") return S;
        const C = {
            ...S
          },
          I = typeof C.assetId == "string" && C.assetId || typeof C.id == "string" && C.id || v[0],
          E = C.fullUrl || C.url || "",
          M = C.thumbUrl || "",
          T = f2(E),
          P = f2(M);
        if (I && T) {
          const R = await IO(I);
          R && (C.fullUrl = R, typeof C.url == "string" && f2(C.url) && (C.url = R), w = !0);
        }
        if (P || b && !M) {
          const R = await est(M, I, b);
          R && R !== M && (C.thumbUrl = R, w = !0);
        }
        return C;
      }));
      if (w && (y.generatedImages = k, p = !0), f2(y.ossThumbnailUrl)) {
        const S = await est("", v[0], b);
        S && (y.ossThumbnailUrl = S, p = !0);
      }
      if (b && typeof y.content == "string" && f2(y.content) && tl(y.content)) {
        const S = ((A = k[0]) == null ? void 0 : A.fullUrl) || (await IO(v[0]));
        S && !tl(S) && (y.content = S, p = !0);
      }
      return y;
    }));
    p && (r.settings = {
      ...a,
      generationVersions: m
    });
  }
  if (Array.isArray(r.previewMjImages)) {
    const p = r._previewMjAssetIds;
    let m = !1;
    const f = await Promise.all(r.previewMjImages.map(async (y, b) => {
      if (!f2(y)) return y;
      const v = (p == null ? void 0 : p[b]) || `${r.id}_mj_${b}`,
        _ = await IO(v);
      return _ ? (m = !0, _) : y;
    }));
    m && (r.previewMjImages = f);
  }
  return r;
}

function gFt(e) {
  var t;
  for (const n of e) if (((t = n.settings) == null ? void 0 : t._projectOmitMedia) !== !0 && !odr(n)) return !0;
  return !1;
}

function S2i(e) {
  if (e.type !== "input-image") return e;
  const t = e.settings || {};
  return typeof t._blobUrl == "string" && t._blobUrl.startsWith("blob:") && typeof e.content == "string" && e.content.startsWith("blob:") ? {
    ...e,
    settings: {
      ...t,
      _blobUrl: e.content
    }
  } : e;
}

async function Vke(e, t, n) {
  if (n != null && n.preserveOpenCache || xJe(), !gFt(e)) return e.map(S2i);
  await adr();
  const r = 8,
    a = new Array(e.length);
  for (let i = 0; i < e.length; i += r) {
    const o = e.slice(i, i + r),
      s = await Promise.all(o.map(l => A2i(l, t)));
    for (let l = 0; l < s.length; l++) a[i + l] = s[l];
    i + r < e.length && (await new Promise(l => setTimeout(l, 0)));
  }
  return a;
}

const I2i = Object.freeze(Object.defineProperty({
  __proto__: null,
  clearProjectMediaResolveCaches: fFt,
  clearProjectOpenBlobDisplayCaches: rdr,
  clearProjectOpenMediaResolveCache: xJe,
  clearProjectSaveMediaResolveCache: mFt,
  isPersistableRemoteMediaUrl: pFt,
  mediaUrlNeedsResolve: f2,
  projectNodesNeedMediaReviveAfterOpen: gFt,
  resolveAssetIdToDataUrl: idr,
  reviveProjectNodesMediaAfterOpen: Vke,
  tryResolveAssetUrlForProjectOpen: IO
}, Symbol.toStringTag, {
  value: "Module"
}));

async function C2i(e) {
  return await new Promise((t, n) => {
    const r = new FileReader();
    r.onload = () => t(String(r.result || "")), r.onerror = () => n(r.error), r.readAsDataURL(e);
  });
}

async function E2i(e) {
  const t = (e || "").trim();
  if (!t) return null;
  try {
    const {
      localCacheManager: n
    } = await Ie(async () => {
      const {
        localCacheManager: r
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: r
      };
    }, void 0, import.meta.url);
    if (await n.ensureRestored(), n.isAvailable() && n.hasAsset(t)) {
      const r = await n.readAsset(t);
      if (r != null && r.blob && r.blob.size > 0) return r.blob;
    }
  } catch {}
  try {
    await ni.init();
    const n = await ni.getAssetBlob(t);
    if (n && n.size > 0) return n;
  } catch {}
  return null;
}

async function T2i(e) {
  try {
    const {
      localCacheManager: t
    } = await Ie(async () => {
      const {
        localCacheManager: r
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: r
      };
    }, void 0, import.meta.url);
    if (await t.ensureRestored(), !t.isAvailable()) return null;
    const n = t.getManifest();
    if (!(n != null && n.assets)) return null;
    for (const [r, a] of Object.entries(n.assets)) if (a.remoteUrl === e) return r;
  } catch {}
  return null;
}

function _Je() {
  return async e => {
    if (!e) return null;
    try {
      let t = null;
      if (e.startsWith("blob:")) t = vm(e);else if (e.startsWith("http://") || e.startsWith("https://")) t = await T2i(e);else return null;
      if (!t) return null;
      const n = await idr(t);
      if (n) return n;
      const r = await E2i(t);
      if (!r) return null;
      const a = await C2i(r);
      if (typeof a == "string" && a.startsWith("data:")) return a;
    } catch {}
    return null;
  };
}

const M2i = async (e, t) => {
    if (!e || e.startsWith("blob:")) return e;
    try {
      if (e.startsWith("data:")) {
        const o = await (await fetch(e)).blob(),
          s = `character_${t}`;
        await ni.saveBlobAsset(s, o, e);
        await Ur.ensureManifestLoaded();
        return await Ur.getConvertFileSrcForAsset(s) || URL.createObjectURL(o);
      }
      const n = await fetch(e);
      if (!n.ok) return console.warn("无法获取角色缩略图:", e), e;
      const r = await n.blob(),
        a = `character_${t}`;
      await ni.saveBlobAsset(a, r, e);
      await Ur.ensureManifestLoaded();
      return await Ur.getConvertFileSrcForAsset(a) || URL.createObjectURL(r);
    } catch (n) {
      return console.warn("转换角色缩略图失败:", e, n), e;
    }
  },
  sdr = async (e, t, n, r = () => !0) => {
    try {
      if (!r()) return;
      const a = (() => {
          try {
            const d = localStorage.getItem("qiaodoumayi_characters");
            return d ? JSON.parse(d) : [];
          } catch {
            return [];
          }
        })(),
        i = new Set(a.map(d => d.id)),
        o = e.filter(d => !i.has(d.id));
      if (o.length === 0) {
        n == null || n(95, "角色库已是最新，无需更新", "import"), t(a);
        return;
      }
      n == null || n(92, `发现 ${o.length} 个新角色，正在保存到本地缓存...`, "import");
      const s = [];
      for (let d = 0; d < o.length; d++) {
        const u = o[d];
        n == null || n(92 + d / o.length * 3, `正在处理角色 ${d + 1}/${o.length}: ${u.name}`, "import");
        const h = await M2i(u.imageUrl, u.id);
        if (!r()) return;
        s.push({
          ...u,
          imageUrl: h,
          _assetId: `character_${u.id}`
        });
      }
      if (!r()) return;
      const l = [...a, ...s];
      try {
        localStorage.setItem("qiaodoumayi_characters", JSON.stringify(l));
      } catch (d) {
        console.error("保存角色库到 localStorage 失败:", d);
      }
      t(l), n == null || n(95, `成功添加 ${o.length} 个新角色到本地角色库`, "import");
    } catch (a) {
      if (!r()) return;
      console.error("合并角色库失败:", a);
      try {
        const i = (() => {
            try {
              const l = localStorage.getItem("qiaodoumayi_characters");
              return l ? JSON.parse(l) : [];
            } catch {
              return [];
            }
          })(),
          o = new Set(i.map(l => l.id)),
          s = e.filter(l => !o.has(l.id));
        if (s.length > 0) {
          const l = [...i, ...s];
          localStorage.setItem("qiaodoumayi_characters", JSON.stringify(l)), t(l);
        } else t(i);
      } catch (i) {
        console.error("降级处理也失败:", i), t(e);
      }
    }
  },
  P2i = 20,
  R2i = 20;

function N2i(e, t) {
  const n = e && typeof e == "object" ? e : null;
  if (!n || !Array.isArray(n.nodes)) return null;
  const r = new Map(),
    a = n.nodes.map(s => {
      const l = t();
      r.set(s.id, l);
      const d = s.settings ? {
        ...s.settings
      } : {};
      "_executeTrigger" in d && delete d._executeTrigger;
      const u = B$(s.content) ?? (typeof s.content == "string" ? s.content : ""),
        h = {
          ...s,
          id: l,
          content: u,
          x: s.x + P2i,
          y: s.y + R2i,
          settings: d
        };
      return h.type === "custom-agent" && ("isGenerating" in h && delete h.isGenerating, "generationProgress" in h && delete h.generationProgress), h;
    }),
    i = (Array.isArray(n.connections) ? n.connections : []).map(s => ({
      ...s,
      id: t(),
      from: r.get(s.from) || s.from,
      to: r.get(s.to) || s.to
    })),
    o = (Array.isArray(n.groups) ? n.groups : []).map(s => ({
      ...s,
      id: t(),
      nodeIds: s.nodeIds.map(l => r.get(l) || l),
      updatedAt: Date.now()
    }));
  return {
    nodes: a,
    connections: i,
    groups: o
  };
}

function ldr(e, t, n) {
  n() && (w0(t.setNodes, n)(r => [...r, ...e.nodes]), w0(t.setConnections, n)(r => [...r, ...e.connections]), e.groups.length > 0 && w0(t.setGroups, n)(r => [...r, ...e.groups]));
}

function j2i({
  setNodes: e,
  setConnections: t,
  setCharacterLibrary: n,
  setGroups: r,
  onProgress: a,
  importRequests: i
}) {
  return g.useCallback(() => {
    const s = i.begin(),
      l = (...u) => {
        s.isCurrent() && (a == null || a(...u));
      },
      d = document.createElement("input");
    d.type = "file", d.accept = ".json", d.onchange = async u => {
      var p;
      const h = (p = u.target.files) == null ? void 0 : p[0];
      if (h) try {
        s.assertCurrent();
        const m = await h.text();
        s.assertCurrent();
        const f = JSON.parse(m),
          y = N2i(f, Fi);
        if (!y) {
          console.error("[useProjectIO] ❌ 无效的工作流文件"), l(0, "", "import");
          return;
        }
        let b = y.nodes;
        const v = cM(b);
        if (v > 0) {
          l(5, `检测到 ${v} 个外部资源，正在转换...`, "import");
          const _ = [],
            k = await wS(b, 0, (A, S) => l(5 + A * .1, S, "import"), {
              count: v,
              current: 0
            }, _, {
              onFailedBehavior: "placeholder",
              silentFail: !0,
              localCacheFallback: _Je()
            });
          _.length > 0 && console.log(`[useProjectIO] 工作流导入: ${_.length} 个资源不可用，已替换为占位符`), s.assertCurrent(), b = k;
        }
        ldr({
          ...y,
          nodes: b
        }, {
          setNodes: e,
          setConnections: t,
          setGroups: r
        }, s.isCurrent), f.characterLibrary && Array.isArray(f.characterLibrary) && (await sdr(f.characterLibrary, n, l, s.isCurrent)), l(100, "加载完成！", "import"), setTimeout(() => l(0, "", "import"), 100), console.log(`[useProjectIO] ✅ 成功导入 ${b.length} 个节点、${y.connections.length} 条连接和 ${y.groups.length} 个分组`);
      } catch (m) {
        if (m instanceof rJ || !s.isCurrent()) return;
        console.error("导入工作流失败:", m), console.error("[useProjectIO] ❌ 导入工作流失败，请检查文件格式"), l(0, "", "import");
      }
    }, d.click();
  }, [e, t, n, r, a, i]);
}

async function D2i(e, t, n, r) {
  if (!t) {
    const i = cM(e);
    if (i > 0) {
      n == null || n(5, `检测到 ${i} 个外部资源，正在转换...`, "import");
      const o = [];
      e = await wS(e, 0, (l, d) => n == null ? void 0 : n(5 + l * .08, d, "import"), {
        count: i,
        current: 0
      }, o, {
        onFailedBehavior: "placeholder",
        silentFail: !0,
        localCacheFallback: _Je()
      }), o.length > 0 && console.log(`[useProjectIO] 项目导入: ${o.length} 个资源不可用，已替换为占位符`);
    }
  }
  if (L4e(e)) {
    const i = VSn(e);
    if (console.log(`[useProjectIO] 检测到 Base64 数据，估计大小: ${(i / 1024 / 1024).toFixed(2)}MB`), i > 20 * 1024 * 1024) {
      console.log("[useProjectIO] 大型项目检测，使用流式 Hydration..."), n == null || n(15, "正在优化大型项目（流式处理）...", "import");
      const {
          hydrateProjectDataStreaming: o
        } = await Ie(async () => {
          const {
            hydrateProjectDataStreaming: d
          } = await Promise.resolve().then(() => Tle);
          return {
            hydrateProjectDataStreaming: d
          };
        }, void 0, import.meta.url),
        {
          data: s,
          stats: l
        } = await o(e, (d, u) => {
          n == null || n(15 + d * .1, u, "import");
        }, 10, r);
      e = s, console.log("[useProjectIO] ✅ 流式 Hydration 完成！"), console.log(`  - 转换图片: ${l.converted} 张`), console.log(`  - 节省内存: ${(l.totalSize / 1024 / 1024).toFixed(2)}MB`), console.log(`  - 跳过项目: ${l.skipped} 个`), n == null || n(25, `已优化 ${l.converted} 张图片，节省 ${(l.totalSize / 1024 / 1024).toFixed(2)}MB 内存`, "import");
    } else {
      console.log("[useProjectIO] 开始 Hydration（Base64 → Blob URL）..."), n == null || n(15, "正在优化内存数据（Base64 → Blob URL）...", "import");
      const {
          hydrateProjectData: o
        } = await Ie(async () => {
          const {
            hydrateProjectData: d
          } = await Promise.resolve().then(() => Tle);
          return {
            hydrateProjectData: d
          };
        }, void 0, import.meta.url),
        {
          data: s,
          stats: l
        } = await o(e, 10, r);
      e = s, console.log("[useProjectIO] ✅ Hydration 完成！"), console.log(`  - 转换图片: ${l.converted} 张`), console.log(`  - 节省内存: ${(l.totalSize / 1024 / 1024).toFixed(2)}MB`), console.log(`  - 跳过项目: ${l.skipped} 个`), n == null || n(25, `已优化 ${l.converted} 张图片，节省 ${(l.totalSize / 1024 / 1024).toFixed(2)}MB 内存`, "import");
    }
  } else console.log("[useProjectIO] 未检测到 Base64 数据，跳过 Hydration");
  return e;
}

function L2i() {
  let e = 8;
  try {
    const t = window.__qdmSystemMemoryGB,
      n = navigator.deviceMemory;
    typeof t == "number" && t > 0 ? e = t : typeof n == "number" && n > 0 && (e = n);
  } catch {}
  return Math.max(2, Math.min(8, e >= 16 ? 8 : e >= 8 ? 5 : 3));
}

const O2i = e => new Promise(t => setTimeout(t, e));

function B2i(e, t, n, r) {
  const a = (i, o) => setTimeout(() => {
    n() && i();
  }, o);
  a(() => {
    console.log("[useProjectIO] ✅ 项目加载成功！"), a(async () => {
      var i;
      try {
        const o = Ur.isAvailable();
        let s = 0;
        for (const d of t) {
          if (!n()) return;
          if (d.content && typeof d.content == "string" && d.content.startsWith("blob:")) try {
            const u = await fetch(d.content);
            if (!u.ok) continue;
            const h = await u.blob();
            if (!n()) return;
            const p = ((i = d.settings) == null ? void 0 : i._assetId) || d.id;
            await ni.saveBlobAsset(p, h, d.content), o && n() && (await Ur.saveAsset(p, h, h.type || "application/octet-stream"), s++);
          } catch {}
        }
        const l = e.history || [];
        for (const d of l) {
          if (!n()) return;
          const u = d._assetId;
          if (u && d.url && d.url.startsWith("blob:")) try {
            const h = await fetch(d.url);
            if (!h.ok) continue;
            const p = await h.blob();
            if (!n()) return;
            await ni.saveBlobAsset(u, p, d.url), o && n() && (await Ur.saveAsset(u, p, p.type || "application/octet-stream"), s++);
          } catch {}
        }
        n() && o && l.length > 0 && (await Ur.syncHistory(l)), s > 0 && console.log(`[useProjectIO] ✅ 导入后缓存了 ${s} 个资源到本地目录`);
      } catch (o) {
        console.warn("[useProjectIO] 导入后资源缓存失败（不影响使用）:", o);
      }
    }, 2e3), a(() => {
      const i = t.filter(o => {
        if (!o.content || typeof o.content != "string" || !o.content.startsWith("data:image")) return !1;
        const s = EIt(o.content);
        return s !== "small" && s !== "8k";
      });
      if (i.length > 0) {
        const o = L2i(),
          s = i.slice(0, o);
        console.log(`[useProjectIO] 🖼️ 开始后台生成 ${s.length}/${i.length} 张图片的缩略图...`), (async () => {
          let l = 0;
          for (const d of s) {
            if (!n()) return;
            try {
              d.content && !Wd.hasThumbnail(d.id) && (await Wd.storeWithThumbnails(d.id, d.content), l++);
            } catch {}
            await O2i(120);
          }
          console.log(`[useProjectIO] ✅ 缩略图生成完成: ${l}/${s.length}`);
        })();
      }
    }, 1e3);
  }, 500);
}

async function F2i(e, t) {
  var r;
  let n = 0;
  for (const a of e) {
    t.assertCurrent();
    try {
      const i = await t.readFile(a.fileName);
      if (!i) continue;
      t.assertCurrent();
      const o = new Blob([i], {
          type: a.mimeType
        }),
        s = a.assetId.startsWith("preview_") || a.assetId.startsWith("thumb_");
      s || (await t.saveAsset(a.assetId, o, a.remoteUrl || "")), t.saveCache && t.isCurrent() && (await t.saveCache(a.assetId, o, a.mimeType, a.remoteUrl, s ? "thumbnails" : void 0)), n++, (n % 5 === 0 || n === e.length) && ((r = t.progress) == null || r.call(t, n, e.length));
    } catch (i) {
      if (FNe(i)) throw i;
      console.warn(`[useProjectIO] ⚠️ ZIP 资源恢复失败: ${a.assetId}`, i);
    }
  }
  return n;
}

async function Rfe(e, t, n, r) {
  if (!t || e && e !== "") return;
  n.assertCurrent();
  const a = await n.resolve(t);
  n.assertCurrent(), a && r(a);
}

async function z2i(e, t) {
  for (const n of e) {
    t.assertCurrent(), await Rfe(n.url, n._assetId, t, a => {
      n.url = a;
    });
    const r = n._mjAssetIds;
    if (r && n.mjImages) for (let a = 0; a < r.length; a++) {
      const i = r[a];
      await Rfe(n.mjImages[a], i, t, o => {
        n.mjImages[a] = o;
      });
    }
    await Rfe(n.audioUrl, n._audioAssetId, t, a => {
      n.audioUrl = a;
    }), await Rfe(n.mjOriginalUrl, n._mjOriginalAssetId, t, a => {
      n.mjOriginalUrl = a;
    }), await Rfe(n.thumbnailUrl, n._thumbnailAssetId, t, a => {
      n.thumbnailUrl = a;
    });
  }
}

function U2i(e, t) {
  if (e.videoFileName) return WS(e.videoFileName);
  if (e.prompt && typeof e.prompt == "string") {
    const r = e.prompt.trim();
    if (r.match(/\.(jpg|jpeg|png|gif|webp|bmp|mp4|mov|avi|mkv|webm|mp3|wav|ogg|m4a|aac|flac)$/i) || r.length < 100 && !r.includes(" ") && !r.includes(`
`)) return WS(r);
  }
  return `${ED(e.type)}${t + 1}`;
}

const $2i = async e => {
  const t = e._localFilePath;
  if (!t || typeof t != "string") return null;
  try {
    console.warn(`[useProjectIO] ⚠️ 不支持从本地文件系统恢复: ${t}`);
  } catch (n) {
    console.warn(`[useProjectIO] ⚠️ 恢复本地文件失败: ${t}`, n);
  }
  return null;
};

async function yE(e) {
  if (!e || typeof e != "string") return null;
  try {
    const {
        assetStore: t
      } = await Ie(async () => {
        const {
          assetStore: r
        } = await Promise.resolve().then(() => Ri);
        return {
          assetStore: r
        };
      }, void 0, import.meta.url),
      n = await t.getAssetUrl(e);
    if (n) return n;
  } catch {}
  if (!Ur.isAvailable()) return null;
  try {
    return await Ur.readAssetAsUrl(e);
  } catch {
    return null;
  }
}

async function gcn(e) {
  var s;
  const t = (await Ie(async () => {
    const {
      sanitizeCanvasNodeOnLoad: l
    } = await Promise.resolve().then(() => ii);
    return {
      sanitizeCanvasNodeOnLoad: l
    };
  }, void 0, import.meta.url)).sanitizeCanvasNodeOnLoad(e);
  Object.assign(e, t), t.settings && (e.settings = t.settings);
  const n = e.settings || {},
    r = e.content;
  if (typeof r == "string" && (!r || r.startsWith("blob:"))) {
    const l = [e._contentAssetId, n._assetId, n._contentAssetId, e.type === "gen-image" || e.type === "gen-video" ? e.id : void 0].filter(d => typeof d == "string" && d.length > 0);
    for (const d of l) {
      const u = await yE(d);
      if (u) {
        e.content = u;
        break;
      }
    }
  }
  const a = n.generatedImages;
  if (a != null && a.length) {
    let l = !1;
    const d = h => {
        if (typeof h != "string" || !h.startsWith("data:")) return null;
        try {
          const p = h.indexOf(",");
          if (p <= 0) return null;
          const m = h.slice(5, p),
            f = m.split(";")[0] || "application/octet-stream",
            y = m.includes(";base64"),
            b = h.slice(p + 1);
          let v;
          if (y) {
            const _ = atob(b);
            v = new Uint8Array(_.length);
            for (let w = 0; w < _.length; w++) v[w] = _.charCodeAt(w);
          } else v = new TextEncoder().encode(decodeURIComponent(b));
          return URL.createObjectURL(new Blob([v], {
            type: f
          }));
        } catch {
          return null;
        }
      },
      u = await Promise.all(a.map(async h => {
        const p = h.fullUrl || h.url || "",
          m = h.thumbUrl || "",
          f = !p || p.startsWith("blob:"),
          y = !m || m.startsWith("blob:"),
          b = e.type === "gen-video";
        if (!f && !y) return h;
        const v = [];
        typeof h.assetId == "string" && h.assetId && v.push(h.assetId), typeof h.id == "string" && h.id && v.push(h.id);
        let _ = null,
          w = null;
        if (f) {
          for (const k of v) {
            const A = await yE(k);
            if (A) {
              _ = A;
              break;
            }
          }
          _ || (_ = d(h.dataUrl));
        }
        if (y || b && !m) {
          const {
            readLocalPreviewThumbnailAsUrl: k
          } = await Ie(async () => {
            const {
              readLocalPreviewThumbnailAsUrl: A
            } = await Promise.resolve().then(() => Ui);
            return {
              readLocalPreviewThumbnailAsUrl: A
            };
          }, void 0, import.meta.url);
          for (const A of v) {
            const S = await k(A);
            if (S) {
              w = S;
              break;
            }
          }
          !w && !b ? w = _ || d(h.dataUrl) : !w && typeof h.dataUrl == "string" && h.dataUrl.startsWith("data:image") && (w = d(h.dataUrl));
        }
        return !_ && !w ? h : (l = !0, {
          ...h,
          fullUrl: f && _ ? _ : p,
          thumbUrl: (y || b && !m) && w ? w : m,
          url: typeof h.url == "string" && h.url.startsWith("blob:") && _ ? _ : h.url
        });
      }));
    l && (e.settings = {
      ...n,
      generatedImages: u
    });
  }
  if (e.type === "gen-image") {
    const l = e.settings || {},
      d = l.generatedImages || [],
      u = [String(((s = d[0]) == null ? void 0 : s.assetId) || "").trim(), String(e._contentAssetId || "").trim(), String(l._contentAssetId || "").trim()].filter(Boolean),
      h = Array.isArray(l._mjPreviewAssetIds) ? l._mjPreviewAssetIds.map(m => String(m || "").trim()).filter(Boolean) : Array.isArray(e._previewMjAssetIds) ? (e._previewMjAssetIds || []).map(m => String(m || "").trim()).filter(Boolean) : [],
      p = [...new Set([...u, ...h])];
    if (p.length > 0) {
      const {
          readLocalPreviewThumbnailAsUrl: m
        } = await Ie(async () => {
          const {
            readLocalPreviewThumbnailAsUrl: S
          } = await Promise.resolve().then(() => Ui);
          return {
            readLocalPreviewThumbnailAsUrl: S
          };
        }, void 0, import.meta.url),
        {
          isOssPublicHttpUrl: f
        } = await Ie(async () => {
          const {
            isOssPublicHttpUrl: S
          } = await Promise.resolve().then(() => ii);
          return {
            isOssPublicHttpUrl: S
          };
        }, void 0, import.meta.url);
      let y = null;
      for (const S of p) if (y = await m(S), y) break;
      const b = typeof e.content == "string" ? e.content.trim() : "",
        v = b.startsWith("http") && (/\/images\//i.test(b) || !/\/thumbnails\//i.test(b) && !f(b)),
        _ = !b || b.startsWith("blob:"),
        w = v && Array.isArray(l._mjAssetIds) && l._mjAssetIds.length > 1 && h.length === 0;
      y && (v || _ || w) && (e.content = y);
      const k = ["mjImages", "previewMjImages"];
      let A = null;
      for (const S of k) {
        const C = l[S];
        if (!Array.isArray(C) || C.length === 0) continue;
        const I = [...C];
        let E = !1;
        for (let M = 0; M < I.length; M++) {
          const T = String(I[M] || "").trim(),
            P = h[M];
          if (!P || !(!T || T.startsWith("blob:") || T.startsWith("http") && /\/images\//i.test(T))) continue;
          const j = await m(P);
          j && (I[M] = j, E = !0);
        }
        E && (A = {
          ...(A || l),
          [S]: I
        });
      }
      A && (e.settings = {
        ...(e.settings || {}),
        ...A
      });
    }
  }
  const i = n.generationVersions;
  if (Array.isArray(i) && i.length > 0) {
    const l = h => {
      if (typeof h != "string" || !h.startsWith("data:")) return null;
      try {
        const p = h.indexOf(",");
        if (p <= 0) return null;
        const m = h.slice(5, p),
          f = m.split(";")[0] || "application/octet-stream",
          y = m.includes(";base64"),
          b = h.slice(p + 1);
        let v;
        if (y) {
          const _ = atob(b);
          v = new Uint8Array(_.length);
          for (let w = 0; w < _.length; w++) v[w] = _.charCodeAt(w);
        } else v = new TextEncoder().encode(decodeURIComponent(b));
        return URL.createObjectURL(new Blob([v], {
          type: f
        }));
      } catch {
        return null;
      }
    };
    let d = !1;
    const u = await Promise.all(i.map(async h => {
      if (!h || typeof h != "object") return h;
      const p = h.generatedImages || [];
      let m = !1;
      const f = await Promise.all(p.map(async b => {
        if (!b || typeof b != "object") return b;
        const v = b.fullUrl || b.url || "",
          _ = b.thumbUrl || "",
          w = !v || v.startsWith("blob:"),
          k = !_ || _.startsWith("blob:"),
          A = e.type === "gen-video" || h.mediaType === "gen-video";
        if (!w && !k && !(A && !_)) return b;
        const S = [];
        typeof b.assetId == "string" && b.assetId && S.push(b.assetId), typeof b.id == "string" && b.id && S.push(b.id);
        let C = null,
          I = null;
        if (w) {
          for (const E of S) {
            const M = await yE(E);
            if (M) {
              C = M;
              break;
            }
          }
          C || (C = l(b.dataUrl));
        }
        if (k || A && !_) {
          const {
            readLocalPreviewThumbnailAsUrl: E
          } = await Ie(async () => {
            const {
              readLocalPreviewThumbnailAsUrl: M
            } = await Promise.resolve().then(() => Ui);
            return {
              readLocalPreviewThumbnailAsUrl: M
            };
          }, void 0, import.meta.url);
          for (const M of S) {
            const T = await E(M);
            if (T) {
              I = T;
              break;
            }
          }
          !I && !A ? I = C || l(b.dataUrl) : !I && typeof b.dataUrl == "string" && b.dataUrl.startsWith("data:image") && (I = l(b.dataUrl));
        }
        return !C && !I ? b : (m = !0, {
          ...b,
          fullUrl: w && C ? C : v,
          thumbUrl: (k || A && !_) && I ? I : _,
          url: typeof b.url == "string" && b.url.startsWith("blob:") && C ? C : b.url
        });
      }));
      let y = h;
      if (m && (y = {
        ...y,
        generatedImages: f
      }, d = !0), typeof y.content == "string" && y.content.startsWith("blob:")) {
        const b = f[0],
          v = (b == null ? void 0 : b.fullUrl) || (b == null ? void 0 : b.url);
        v && (y = {
          ...y,
          content: v
        }, d = !0);
      }
      return y;
    }));
    d && (e.settings = {
      ...(e.settings || {}),
      generationVersions: u
    });
  }
  const o = n.seedanceMaterials;
  if (o != null && o.length) {
    let l = !1;
    const d = await Promise.all(o.map(async u => {
      var h;
      if (u._cacheAssetId && ((h = u.url) != null && h.startsWith("blob:"))) {
        const p = await yE(u._cacheAssetId);
        if (p) return l = !0, {
          ...u,
          url: p
        };
      }
      return u;
    }));
    l && (e.settings = {
      ...(e.settings || {}),
      seedanceMaterials: d
    });
  }
}

async function G2i(e) {
  return Promise.all(e.map(async t => {
    var a, i, o;
    let n = {
      ...t
    };
    const r = t._assetId;
    if (r && t.url && (t.url.startsWith("blob:") || t.url === "")) {
      const s = await yE(r);
      s && (n = {
        ...n,
        url: s
      });
    }
    if ((a = n.mjImages) != null && a.length) {
      const s = [...n.mjImages];
      let l = !1;
      for (let d = 0; d < s.length; d++) if ((i = s[d]) != null && i.startsWith("blob:")) {
        const u = await yE(`${t.id}_mj_${d}`);
        u && (s[d] = u, l = !0);
      }
      l && (n = {
        ...n,
        mjImages: s
      });
    }
    if ((o = n.thumbnailUrl) != null && o.startsWith("blob:")) {
      const s = await yE(`${t.id}_thumbnail`);
      s && (n = {
        ...n,
        thumbnailUrl: s
      });
    }
    return n;
  }));
}

const V2i = async (e, t = 0) => {
    var u;
    const {
      sanitizeCanvasNodeOnLoad: n
    } = await Ie(async () => {
      const {
        sanitizeCanvasNodeOnLoad: h
      } = await Promise.resolve().then(() => ii);
      return {
        sanitizeCanvasNodeOnLoad: h
      };
    }, void 0, import.meta.url);
    e = n(e);
    const r = e.settings ? {
      ...e.settings
    } : {};
    "_executeTrigger" in r && delete r._executeTrigger;
    const a = {
      ...e,
      settings: r
    };
    a.type === "custom-agent" && ("isGenerating" in a && delete a.isGenerating, "generationProgress" in a && delete a.generationProgress), (!a.nodeName || a.nodeName.trim() === "") && (a.nodeName = U2i(a, t), console.log(`[useProjectIO] 为旧版本节点 ${a.id} (${a.type}) 自动生成名称: ${a.nodeName}`));
    const i = (u = e.settings) == null ? void 0 : u._assetId;
    if (i) {
      const h = await yE(i);
      if (h) return a.content = h, await gcn(a), a;
    }
    const o = e._contentAssetId,
      s = e._previewMjAssetIds,
      l = e._selectedImageAssetId;
    if (o || s != null && s.length || l) try {
      if (o && (!a.content || a.content === "" || typeof a.content == "string" && a.content.startsWith("blob:"))) {
        const h = await yE(o);
        h && (a.content = h);
      }
      if (s && a.previewMjImages) {
        const h = [...a.previewMjImages];
        for (let p = 0; p < s.length; p++) {
          const m = h[p];
          if (s[p] && (!m || m === "" || typeof m == "string" && m.startsWith("blob:"))) {
            const f = await yE(s[p]);
            f && (h[p] = f);
          }
        }
        a.previewMjImages = h;
      }
      if (l && (!a.selectedPreviewImage || a.selectedPreviewImage === "" || String(a.selectedPreviewImage).startsWith("blob:"))) {
        const h = await yE(l);
        h && (a.selectedPreviewImage = h);
      }
    } catch (h) {
      console.warn("[useProjectIO] 预览节点资源恢复失败:", h);
    }
    const d = await $2i(e);
    return d ? (a.content = d, a._localFilePath = e._localFilePath, a) : (await gcn(a), a);
  },
  H2i = async (e, t, n, r, a, i, o, s, l, d, u, h) => {
    var le;
    try {
      await Ur.flushPendingAssets(), await Ur.flushManifest();
    } catch {}
    const p = Ur.getManifest(),
      m = new Set(),
      f = J => {
        J && typeof J == "string" && m.add(J);
      };
    for (const J of e) {
      if (S0(J)) continue;
      f((le = J.settings) == null ? void 0 : le._assetId), f(J._contentAssetId), f(J._selectedImageAssetId);
      const pe = J._previewMjAssetIds;
      pe && pe.forEach(ce => f(ce));
    }
    for (const J of t) {
      for (const ce of ["_assetId", "_audioAssetId", "_mjOriginalAssetId", "_thumbnailAssetId"]) f(J[ce]);
      const pe = J._mjAssetIds;
      pe && pe.forEach(ce => f(ce));
    }
    if ([...m].filter(J => !J.startsWith("preview_") && !J.startsWith("thumb_")).forEach(J => m.add(`preview_${J}`)), m.size === 0) return console.log("[useProjectIO] 没有匹配的缓存资源，回退到 JSON 导出"), !1;
    const b = p != null && p.assets ? Object.keys(p.assets).length : 0;
    (!p || b === 0) && console.log("[useProjectIO] 本地 manifest 为空，ZIP 内资源将主要从 IndexedDB(assetStore) 读取"), h == null || h(2, "请选择保存位置...", "export");
    const v = RCt("standard"),
      _ = `${d || "未命名项目"}_${v}.zip`;
    let w = null;
    if ("showSaveFilePicker" in window) try {
      w = await (await window.showSaveFilePicker({
        suggestedName: _,
        types: [{
          description: "ZIP 项目包",
          accept: {
            "application/zip": [".zip"]
          }
        }]
      })).createWritable();
    } catch (J) {
      if (J.name === "AbortError") return h == null || h(0, "", "export"), !0;
      throw J;
    }
    const k = (await Ie(async () => {
        const {
          default: J
        } = await Promise.resolve().then(() => wCe);
        return {
          default: J
        };
      }, void 0, import.meta.url)).default,
      A = new k(),
      S = {},
      C = (J, pe) => {
        const ce = pe.type || "application/octet-stream",
          we = J.startsWith("preview_") || J.startsWith("thumb_") ? "thumbnails" : ce.startsWith("image/") ? "images" : ce.startsWith("video/") ? "videos" : ce.startsWith("audio/") ? "audio" : "other",
          X = ce.startsWith("image/") ? ce.includes("jpeg") ? "jpg" : ce.split("/")[1] || "png" : ce.startsWith("video/") ? "mp4" : ce.startsWith("audio/") ? "mp3" : "bin",
          re = (J.length > 16 ? `${J.slice(0, 8)}_${J.slice(-8)}` : J).replace(/[^a-zA-Z0-9_-]/g, "_"),
          fe = new Date().toISOString().slice(0, 10).replace(/-/g, "");
        return {
          fileName: `${we}/${fe}_${re}.${X}`,
          mimeType: ce,
          size: pe.size,
          cachedAt: Date.now()
        };
      };
    h == null || h(5, "正在读取缓存资源...", "export");
    let I = 0;
    const E = m.size,
      M = [...m],
      T = 8;
    for (let J = 0; J < M.length; J += T) {
      const pe = M.slice(J, J + T);
      await Promise.all(pe.map(async ce => {
        var re, fe;
        let we = null,
          X = (re = p == null ? void 0 : p.assets) == null ? void 0 : re[ce];
        const Z = await Ur.readAsset(ce);
        if (Z && (we = Z.blob, X = (fe = p == null ? void 0 : p.assets) == null ? void 0 : fe[ce]), !we && !ce.startsWith("preview_") && !ce.startsWith("thumb_")) {
          const ye = await ni.getAssetBlob(ce);
          ye && (we = ye, X = C(ce, we));
        }
        we && X && (A.file(X.fileName, we), S[ce] = X);
      })), I = Math.min(J + T, E), h == null || h(5 + I / Math.max(1, E) * 20, `读取缓存资源 ${I}/${E}...`, "export");
    }
    console.log(`[useProjectIO] 📦 ZIP: 已读取 ${Object.keys(S).length}/${E} 个资源（含缩略图），并行批次=${T}`), h == null || h(28, "正在处理项目数据...", "export");
    const R = e.map(J => ECn({
        ...J
      })).map(J => {
        var re;
        const pe = {
          ...J
        };
        if (S0(J)) return pe;
        const ce = (re = J.settings) == null ? void 0 : re._assetId;
        if (ce && S[ce] && pe.content && typeof pe.content == "string") {
          const fe = pe.content;
          (fe.startsWith("blob:") || fe.startsWith("data:") || fe.startsWith("http://") || fe.startsWith("https://")) && (pe.content = "");
        }
        const we = J._contentAssetId;
        if (we && S[we] && pe.content && typeof pe.content == "string") {
          const fe = pe.content;
          (fe.startsWith("blob:") || fe.startsWith("data:") || fe.startsWith("http://") || fe.startsWith("https://")) && (pe.content = "");
        }
        const X = J._selectedImageAssetId;
        X && S[X] && pe.selectedPreviewImage && typeof pe.selectedPreviewImage == "string" && (pe.selectedPreviewImage.startsWith("blob:") || pe.selectedPreviewImage.startsWith("data:")) && (pe.selectedPreviewImage = "");
        const Z = J._previewMjAssetIds;
        return Z && pe.previewMjImages && (pe.previewMjImages = pe.previewMjImages.map((fe, ye) => Z[ye] && S[Z[ye]] && fe && (fe.startsWith("blob:") || fe.startsWith("data:")) ? "" : fe)), pe;
      }),
      j = t.map(J => {
        const pe = {
            ...J
          },
          ce = J._assetId;
        ce && S[ce] && pe.url && (pe.url.startsWith("blob:") || pe.url.startsWith("data:")) && (pe.url = "");
        const we = J._mjAssetIds;
        we && pe.mjImages && (pe.mjImages = pe.mjImages.map((X, Z) => we[Z] && S[we[Z]] && X && (X.startsWith("blob:") || X.startsWith("data:")) ? "" : X));
        for (const [X, Z] of [["_audioAssetId", "audioUrl"], ["_mjOriginalAssetId", "mjOriginalUrl"], ["_thumbnailAssetId", "thumbnailUrl"]]) {
          const re = J[X];
          re && S[re] && pe[Z] && (pe[Z] = "");
        }
        return pe;
      });
    h == null || h(32, "正在转换未缓存的资源...", "export");
    const B = [],
      N = {
        count: cM(R.filter(J => !S0(J))) + cM(l) + cM(s) + cM(j),
        current: 0
      },
      G = {
        preserveOriginalFields: ["content", "previewMjImages", "previewMjVideos", "selectedPreviewImage", "selectedPreviewVideo", "fullUrl", "thumbUrl", "url", "ossThumbnailUrl", "_ossThumbnailUrl", "videoPosterUrl"],
        timeoutMs: 3e4,
        localCacheFallback: _Je()
      },
      z = [],
      V = 3;
    for (let J = 0; J < R.length; J += V) {
      const pe = R.slice(J, J + V),
        ce = await Promise.all(pe.map(we => S0(we) ? Promise.resolve(we) : wS(we, 0, h, N, B, G)));
      z.push(...ce), h == null || h(32 + J / R.length * 12, `处理节点 ${J + 1}/${R.length}...`, "export"), await zwe();
    }
    h == null || h(46, "正在处理角色库...", "export");
    const O = await wS(l, 0, h, N, B);
    h == null || h(50, "正在处理聊天会话...", "export");
    const D = await wS(s, 0, h, N, B, {
      preserveOriginalFields: ["content", "url", "imageUrl", "files"]
    });
    h == null || h(55, "正在处理历史记录...", "export");
    const H = typeof navigator < "u" && (navigator.platform.toLowerCase().includes("mac") || navigator.platform.toLowerCase().includes("win") || navigator.userAgent.toLowerCase().includes("mac") || navigator.userAgent.toLowerCase().includes("win")) ? 500 : 200;
    let Y = j;
    const {
      shouldKeepAllHistory: K
    } = await Ie(async () => {
      const {
        shouldKeepAllHistory: J
      } = await Promise.resolve().then(() => Gu);
      return {
        shouldKeepAllHistory: J
      };
    }, void 0, import.meta.url);
    !K(j) && Y.length > H && (Y = Y.slice(0, H));
    const Q = await wS(Y, 0, h, N, B, {
      preserveOriginalFields: ["mjImages", "originalUrl", "mjOriginalUrl", "url", "videoPosterUrl", "localCacheUrl", "audioUrl"]
    });
    h == null || h(65, "正在生成项目文件...", "export");
    const q = {
        version: "V.3.5.1",
        format: "zip-container",
        projectName: d,
        nodes: z,
        connections: n,
        groups: r,
        canvasTextBoxes: a,
        canvasDoodleStrokes: i,
        view: {
          ...o,
          viewportSize: u || {
            width: window.innerWidth,
            height: window.innerHeight
          }
        },
        chatSessions: D,
        characterLibrary: O,
        history: Q,
        timestamp: DO()
      },
      ne = u5(q);
    A.file("project.json", JSON.stringify(ne)), A.file("manifest.json", JSON.stringify({
      version: "1.0",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assets: S
    }, null, 2)), h == null || h(68, "正在压缩文件...", "export");
    const de = await A.generateAsync({
      type: "blob",
      compression: "STORE"
    }, J => {
      h == null || h(68 + J.percent / 100 * 22, `打包中... ${J.percent.toFixed(0)}%`, "export");
    });
    if (h == null || h(92, "正在保存文件...", "export"), w) await w.write(de), await w.close();else {
      const J = URL.createObjectURL(de),
        pe = document.createElement("a");
      pe.href = J, pe.download = _, document.body.appendChild(pe), pe.click(), document.body.removeChild(pe), URL.revokeObjectURL(J);
    }
    return B.length > 0 ? (console.warn(`[useProjectIO] ⚠️ ZIP 导出有 ${B.length} 个非缓存资源转换失败`), h == null || h(100, "保存完成（ZIP，部分资源未缓存）", "export")) : h == null || h(100, "保存完成！（ZIP 格式）", "export"), Ur.isAvailable() && Ur.syncHistory(t).catch(() => {}), setTimeout(() => {
      h == null || h(0, "", "export"), console.log(`[useProjectIO] ✅ ZIP 导出成功！包含 ${Object.keys(S).length} 个缓存资源。`);
    }, 500), !0;
  },
  W2i = ({
    importDocument: e,
    projectName: t,
    nodes: n,
    connections: r,
    view: a,
    history: i,
    chatSessions: o,
    characterLibrary: s,
    klingSubjectLibrary: l,
    selectedNodeId: d,
    selectedNodeIds: u,
    groups: h,
    canvasTextBoxes: p = [],
    canvasDoodleStrokes: m = [],
    setNodes: f,
    setConnections: y,
    setCharacterLibrary: b,
    setKlingSubjectLibrary: v,
    setGroups: _,
    setSelectionContextMenu: w,
    onProgress: k,
    viewportSize: A
  }) => {
    const S = g.useMemo(() => EDt(e.session), [e.session]);
    g.useEffect(() => () => S.cancel(), [S]);
    const C = typeof window < "u" && "__TAURI__" in window,
      I = g.useRef(void 0);
    I.current = k, g.useEffect(() => {
      if (!C) return;
      let B;
      return JM("project-progress", F => {
        var V;
        const N = F.payload,
          G = typeof N.percent == "number" ? N.percent : 0,
          z = N.message || "";
        (V = I.current) == null || V.call(I, G, z, "export");
      }).then(F => {
        B = F;
      }), () => {
        B == null || B();
      };
    }, [C]);
    const E = g.useCallback(async B => {
        if (!C) return null;
        try {
          const {
              open: F
            } = await Ie(async () => {
              const {
                open: G
              } = await Promise.resolve().then(() => Sb);
              return {
                open: G
              };
            }, void 0, import.meta.url),
            N = await F({
              directory: !0,
              multiple: !1,
              defaultPath: B.replace(/\.json$/i, "")
            });
          return N ? Array.isArray(N) ? N[0] ? `${N[0]}/${B.replace(/\.json$/i, "")}` : null : `${N}/${B.replace(/\.json$/i, "")}` : null;
        } catch (F) {
          return console.error("[useProjectIO] Tauri 目录选择失败:", F), null;
        }
      }, [C]),
      M = g.useCallback(async (B, F) => {
        if (!C) return console.log("[useProjectIO] 非 Tauri 环境，跳过容器导出"), !1;
        console.log("[useProjectIO] 🚀 开始 Tauri 容器导出..."), k == null || k(1, "请选择保存目录（容器格式）...", "export");
        const N = await E(F);
        if (!N) return console.log("[useProjectIO] 用户取消选择目录"), k == null || k(0, "", "export"), !0;
        console.log("[useProjectIO] 📁 选择的容器路径:", N), k == null || k(10, "正在写入容器格式...", "export");
        try {
          const G = await Fr("export_project", {
            path: N,
            payloadJson: B,
            options: {
              chunk_size: 65536,
              hash: !0,
              separate_assets: !0
            }
          });
          return console.log("[useProjectIO] ✅ 容器导出成功:", G), k == null || k(100, "保存完成！（容器格式）", "export"), setTimeout(() => k == null ? void 0 : k(0, "", "export"), 500), !0;
        } catch (G) {
          return console.error("[useProjectIO] ❌ Tauri export 失败:", G), console.error("[useProjectIO] 错误详情:", JSON.stringify(G, null, 2)), k == null || k(-1, `容器导出失败: ${G.message || "未知错误"}，将回退到传统格式`, "export"), !1;
        }
      }, [C, k, E]),
      T = g.useCallback(async () => {
        var B, F, N;
        try {
          const {
              memoryMonitor: G
            } = await Ie(async () => {
              const {
                memoryMonitor: de
              } = await Promise.resolve().then(() => eEe);
              return {
                memoryMonitor: de
              };
            }, void 0, import.meta.url),
            z = G.canSafeSave();
          if (!z.canSave) {
            console.error("[useProjectIO] 内存不足，无法保存:", z.reason), k == null || k(-1, `${z.reason}。${z.suggestion}`, "export");
            return;
          }
          if (z.suggestion && console.warn("[useProjectIO] 内存警告:", z.reason, z.suggestion), await G.cleanupBeforeSave(), k == null || k(0, "正在准备保存...", "export"), !C && Ur.isAvailable()) {
            try {
              if (await H2i(n, i, r, h, p, m, a, o, s, t, A, k)) return;
              console.log("[useProjectIO] ZIP 导出未成功，回退到 JSON 格式");
            } catch (de) {
              console.warn("[useProjectIO] ZIP 导出失败，回退到 JSON:", de);
            }
            k == null || k(0, "正在准备保存...", "export");
          }
          const V = RCt("standard"),
            O = `${t || "未命名项目"}_${V}.json`;
          let L = null,
            D = null,
            U = !1;
          if ("showSaveFilePicker" in window) try {
            k == null || k(1, "请选择保存位置...", "export"), L = await window.showSaveFilePicker({
              suggestedName: O,
              types: [{
                description: "JSON File",
                accept: {
                  "application/json": [".json"]
                }
              }]
            }), D = await L.createWritable(), k == null || k(5, "正在准备数据...", "export");
          } catch (de) {
            if (de.name === "AbortError") {
              k == null || k(0, "", "export");
              return;
            }
            console.error("File System API 打开失败:", de), L = null, D = null;
          }
          if (!L && "__TAURI__" in window) try {
            console.log("[useProjectIO] 尝试使用Tauri dialog API (Mac兼容)");
            const {
                save: de
              } = await Ie(async () => {
                const {
                  save: pe
                } = await Promise.resolve().then(() => Sb);
                return {
                  save: pe
                };
              }, void 0, import.meta.url),
              {
                writeTextFile: le
              } = await Ie(async () => {
                const {
                  writeTextFile: pe
                } = await Promise.resolve().then(() => oc);
                return {
                  writeTextFile: pe
                };
              }, void 0, import.meta.url);
            k == null || k(1, "请选择保存位置...", "export");
            const J = await de({
              defaultPath: O,
              filters: [{
                name: "JSON",
                extensions: ["json"]
              }]
            });
            if (J) U = !0, console.log("[useProjectIO] Tauri dialog 选择路径:", J), L = {
              tauriPath: J
            }, k == null || k(5, "正在准备数据...", "export");else {
              k == null || k(0, "", "export");
              return;
            }
          } catch (de) {
            console.error("[useProjectIO] Tauri dialog 失败:", de);
          }
          let H = n,
            Y = i;
          if (Ur.isAvailable()) {
            k == null || k(7, "正在从本地缓存预加载资源...", "export"), await Ur.flushPendingAssets(), await Ur.flushManifest();
            const de = [];
            for (const J of n) {
              const pe = (B = J.settings) == null ? void 0 : B._assetId;
              if (pe && J.content && typeof J.content == "string" && J.content.startsWith("blob:")) try {
                if (!(await fetch(J.content, {
                  method: "HEAD"
                })).ok) throw new Error("dead");
                de.push(J);
              } catch {
                const ce = await Ur.readAsset(pe);
                ce ? (de.push({
                  ...J,
                  content: URL.createObjectURL(ce.blob)
                }), console.log(`[useProjectIO] ♻️ Restored dead blob URL from cache: ${pe}`)) : de.push(J);
              } else de.push(J);
            }
            H = de;
            const le = [];
            for (const J of i) {
              const pe = J._assetId;
              if (pe && J.url && J.url.startsWith("blob:")) try {
                if (!(await fetch(J.url, {
                  method: "HEAD"
                })).ok) throw new Error("dead");
                le.push(J);
              } catch {
                const ce = await Ur.readAsset(pe);
                ce ? (le.push({
                  ...J,
                  url: URL.createObjectURL(ce.blob)
                }), console.log(`[useProjectIO] ♻️ Restored history blob URL from cache: ${pe}`)) : le.push(J);
              } else le.push(J);
            }
            Y = le;
          }
          if (H.some(de => typeof de.content == "string" && (de.content.startsWith("http") || de.content.startsWith("blob:") || de.content.startsWith("data:"))) || Y.some(de => de.url && (de.url.startsWith("http") || de.url.startsWith("blob:")))) {
            console.log("[useProjectIO] 检测到 URL，开始转换为 Base64..."), k == null || k(10, "正在将所有图片转换为本地数据格式...", "export");
            const le = {
                count: cM(H) + cM(s) + cM(o) + cM(Y),
                current: 0
              },
              J = [],
              pe = 3,
              ce = [],
              we = {
                preserveOriginalFields: ["content", "previewMjImages", "previewMjVideos", "selectedPreviewImage", "selectedPreviewVideo", "_contentAssetId", "_previewMjAssetIds", "_selectedImageAssetId", "fullUrl", "thumbUrl", "url", "ossThumbnailUrl", "_ossThumbnailUrl", "videoPosterUrl"],
                timeoutMs: 3e4,
                localCacheFallback: _Je()
              };
            for (let xe = 0; xe < H.length; xe += pe) {
              const he = H.slice(xe, xe + pe),
                ue = await wS(he, 0, k, le, J, we);
              ce.push(...ue), k == null || k(10 + xe / H.length * 30, `正在处理节点 ${xe + 1}/${H.length}...`, "export"), await zwe(), xe % (pe * 3) === 0 && xe > 0 && (await zwe());
            }
            k == null || k(40, "正在处理角色库...", "export");
            const X = await wS(s, 0, k, le, J);
            await new Promise(xe => setTimeout(xe, 0)), k == null || k(50, "正在处理聊天会话...", "export");
            const re = await wS(o, 0, k, le, J, {
              preserveOriginalFields: ["content", "url", "imageUrl", "files"]
            });
            await new Promise(xe => setTimeout(xe, 0)), k == null || k(60, "正在处理历史记录...", "export");
            const ye = typeof navigator < "u" && (navigator.platform.toLowerCase().includes("mac") || navigator.platform.toLowerCase().includes("win") || navigator.userAgent.toLowerCase().includes("mac") || navigator.userAgent.toLowerCase().includes("win")) ? 500 : 200;
            let ie = Y;
            const {
              shouldKeepAllHistory: ae
            } = await Ie(async () => {
              const {
                shouldKeepAllHistory: xe
              } = await Promise.resolve().then(() => Gu);
              return {
                shouldKeepAllHistory: xe
              };
            }, void 0, import.meta.url);
            !ae(Y) && ie.length > ye && (console.warn(`[useProjectIO] ⚠️ 历史记录过多 (${ie.length})，只保存最新 ${ye} 条`), ie = ie.slice(0, ye));
            const Ee = await wS(ie, 0, k, le, J, {
              preserveOriginalFields: ["mjImages", "originalUrl", "mjOriginalUrl", "url", "videoPosterUrl", "localCacheUrl", "audioUrl"]
            });
            if (await new Promise(xe => setTimeout(xe, 0)), k == null || k(70, "正在生成项目文件...", "export"), U && L && L.tauriPath) {
              k == null || k(70, "正在生成项目文件...", "export");
              const xe = {
                version: "V.3.5.1",
                projectName: t,
                nodes: ce,
                connections: r,
                groups: h,
                canvasTextBoxes: p,
                canvasDoodleStrokes: m,
                view: {
                  ...a,
                  viewportSize: A || {
                    width: window.innerWidth,
                    height: window.innerHeight
                  }
                },
                chatSessions: re,
                characterLibrary: X,
                history: Ee,
                timestamp: DO()
              };
              console.log(`[useProjectIO] 📦 项目包含 ${h.length} 个分组:`, h.map(_e => `${_e.name}(${_e.nodeIds.length}个节点)`).join(", ")), k == null || k(85, "正在生成JSON文件...", "export");
              const he = u5(xe);
              let ue;
              try {
                ue = JSON.stringify(he, null, 2);
              } catch (_e) {
                if (_e instanceof RangeError && _e.message.includes("Invalid string length")) {
                  console.warn("项目数据过大，使用紧凑格式"), k == null || k(87, "数据较大，使用紧凑格式...", "export");
                  try {
                    ue = JSON.stringify(he);
                  } catch (ke) {
                    throw console.error("紧凑格式序列化也失败:", ke), new Error("项目数据过大，无法序列化。请尝试减少画布内容或历史记录。");
                  }
                } else throw _e;
              }
              if (await M(ue, O)) return;
              if (U && L && L.tauriPath) {
                k == null || k(95, "正在写入文件...", "export");
                try {
                  const {
                    writeTextFile: _e
                  } = await Ie(async () => {
                    const {
                      writeTextFile: ke
                    } = await Promise.resolve().then(() => oc);
                    return {
                      writeTextFile: ke
                    };
                  }, void 0, import.meta.url);
                  await _e(L.tauriPath, ue), console.log("[useProjectIO] Tauri文件写入成功");
                } catch (_e) {
                  throw console.error("[useProjectIO] Tauri文件写入失败:", _e), new Error("文件写入失败: " + _e.message);
                }
              } else if (D && L) k == null || k(95, "正在写入文件...", "export"), await D.write(ue), await D.close();else {
                k == null || k(95, "正在创建下载...", "export");
                const _e = new Blob([ue], {
                    type: "application/json"
                  }),
                  ke = URL.createObjectURL(_e),
                  ve = document.createElement("a");
                ve.href = ke, ve.download = O, document.body.appendChild(ve), ve.click(), document.body.removeChild(ve), URL.revokeObjectURL(ke);
              }
            } else if (D && L) {
              k == null || k(95, "正在写入文件...", "export");
              const xe = {
                  version: "V.3.5.1",
                  projectName: t,
                  nodes: ce,
                  connections: r,
                  groups: h,
                  canvasTextBoxes: p,
                  canvasDoodleStrokes: m,
                  view: {
                    ...a,
                    viewportSize: A || {
                      width: window.innerWidth,
                      height: window.innerHeight
                    }
                  },
                  chatSessions: re,
                  characterLibrary: X,
                  history: Ee,
                  timestamp: DO()
                },
                he = u5(xe),
                ue = JSON.stringify(he, null, 2);
              await D.write(ue), await D.close();
            } else {
              k == null || k(95, "正在创建下载...", "export");
              const xe = {
                  version: "V.3.5.1",
                  projectName: t,
                  nodes: ce,
                  connections: r,
                  groups: h,
                  canvasTextBoxes: p,
                  canvasDoodleStrokes: m,
                  view: {
                    ...a,
                    viewportSize: A || {
                      width: window.innerWidth,
                      height: window.innerHeight
                    }
                  },
                  chatSessions: re,
                  characterLibrary: X,
                  history: Ee,
                  timestamp: DO()
                },
                he = u5(xe),
                ue = JSON.stringify(he, null, 2),
                ge = new Blob([ue], {
                  type: "application/json"
                }),
                _e = URL.createObjectURL(ge),
                ke = document.createElement("a");
              ke.href = _e, ke.download = O, document.body.appendChild(ke), ke.click(), document.body.removeChild(ke), URL.revokeObjectURL(_e);
            }
            if (J.length > 0) {
              console.warn(`[useProjectIO] ⚠️ 有 ${J.length} 个资源转换失败，已保留原URL`), console.warn("[useProjectIO] 失败资源列表:", J.slice(0, 10)), k == null || k(100, "保存完成（含部分离线资源，见下载报告）", "export"), setTimeout(() => {
                k == null || k(0, "", "export"), console.log("[useProjectIO] ⚠️ 项目保存完成，但有部分资源未能下载（已生成报告）。");
              }, 500);
              return;
            }
            k == null || k(100, "保存完成！", "export"), Ur.isAvailable() && Ur.syncHistory(i).catch(() => {}), setTimeout(() => {
              k == null || k(0, "", "export"), console.log("[useProjectIO] ✅ 项目保存成功！所有图片和视频已包含在文件中。");
            }, 500);
            return;
          }
          console.log("[useProjectIO] 未检测到 URL，直接保存..."), k == null || k(85, "正在生成JSON文件...", "export");
          const W = {
              version: "V.3.5.1",
              projectName: t,
              nodes: n,
              connections: r,
              groups: h,
              canvasTextBoxes: p,
              canvasDoodleStrokes: m,
              view: {
                ...a,
                viewportSize: A || {
                  width: window.innerWidth,
                  height: window.innerHeight
                }
              },
              chatSessions: o,
              characterLibrary: s,
              history: i,
              timestamp: DO()
            },
            Q = u5(W);
          let q;
          try {
            q = JSON.stringify(Q, null, 2);
          } catch (de) {
            if (de instanceof RangeError && de.message.includes("Invalid string length")) {
              console.warn("项目数据过大，使用紧凑格式"), k == null || k(87, "数据较大，使用紧凑格式...", "export");
              try {
                q = JSON.stringify(Q);
              } catch (le) {
                throw console.error("紧凑格式序列化也失败:", le), new Error("项目数据过大，无法序列化。请尝试减少画布内容或历史记录。");
              }
            } else throw de;
          }
          if (await M(q, O)) return;
          if (U && L && L.tauriPath) {
            k == null || k(95, "正在写入文件...", "export");
            try {
              const {
                writeTextFile: de
              } = await Ie(async () => {
                const {
                  writeTextFile: le
                } = await Promise.resolve().then(() => oc);
                return {
                  writeTextFile: le
                };
              }, void 0, import.meta.url);
              await de(L.tauriPath, q), console.log("[useProjectIO] Tauri文件写入成功");
            } catch (de) {
              throw console.error("[useProjectIO] Tauri文件写入失败:", de), new Error("文件写入失败: " + de.message);
            }
          } else if (D && L) k == null || k(95, "正在写入文件...", "export"), await D.write(q), await D.close();else {
            k == null || k(95, "正在创建下载...", "export");
            const de = new Blob([q], {
                type: "application/json"
              }),
              le = URL.createObjectURL(de),
              J = document.createElement("a");
            J.href = le, J.download = O, document.body.appendChild(J), J.click(), document.body.removeChild(J), URL.revokeObjectURL(le);
          }
          k == null || k(100, "保存完成！", "export"), Ur.isAvailable() && Ur.syncHistory(i).catch(() => {}), setTimeout(() => {
            k == null || k(0, "", "export"), console.log("[useProjectIO] ✅ 项目保存成功！");
          }, 500);
        } catch (G) {
          console.error("保存项目失败:", G), k == null || k(0, "", "export");
          const z = "保存项目失败: " + (G.message || "未知错误");
          (F = G.message) != null && F.includes("memory") || (N = G.message) != null && N.includes("allocation") ? console.error("[useProjectIO]", z + " - 建议：减少节点数量、关闭其他标签页、或使用性能更好的设备") : console.error("[useProjectIO]", z), k == null || k(-1, z, "export");
        }
      }, [t, n, r, a, i, o, s, h, p, m, k, A]),
      P = g.useCallback(() => {
        const B = S.begin(),
          F = (...z) => {
            var V;
            B.isCurrent() && ((V = I.current) == null || V.call(I, ...z));
          },
          N = async z => {
            const V = XYe();
            try {
              B.assertCurrent();
              const {
                  shouldKeepAllHistory: O
                } = await Ie(async () => {
                  const {
                    shouldKeepAllHistory: U
                  } = await Promise.resolve().then(() => Gu);
                  return {
                    shouldKeepAllHistory: U
                  };
                }, void 0, import.meta.url),
                L = typeof navigator < "u" && /mac|win/i.test(navigator.platform + navigator.userAgent),
                D = await dQn(z, {
                  assertCurrent: B.assertCurrent,
                  hydrate: U => D2i(U, C, F, V.create),
                  processNode: V2i,
                  restoreHistory: G2i,
                  keepAllHistory: O,
                  historyLimit: L ? 500 : 200,
                  yieldMain: () => new Promise(U => setTimeout(U, 0)),
                  progress: F
                });
              B.assertCurrent(), D.characterLibrary && (await sdr(D.characterLibrary, b, F, B.isCurrent)), B.assertCurrent(), F(95, "正在提交项目到画布...", "import"), e.commit(D), V.adopt(), B.adoptCommittedDocument(), F(100, "加载完成！", "import"), B2i(D, D.nodes, B.isCurrent);
            } finally {
              V.dispose();
            }
          };
        if (C) {
          (async () => {
            try {
              const {
                  open: z
                } = await Ie(async () => {
                  const {
                    open: U
                  } = await Promise.resolve().then(() => Sb);
                  return {
                    open: U
                  };
                }, void 0, import.meta.url),
                V = await z({
                  directory: !0,
                  multiple: !1,
                  title: "选择项目文件夹或项目JSON文件"
                });
              if (!V || !B.isCurrent()) return;
              let O = Array.isArray(V) ? V[0] : V;
              console.log("[useProjectIO] 选择的路径:", O), console.log("[useProjectIO] 路径类型:", typeof O), Cde(), F == null || F(2, "正在读取文件...", "import");
              const L = await Fr("import_project", {
                path: O,
                options: {
                  lazy_assets: !1,
                  batch_size: 200,
                  max_memory_mb: 512
                }
              });
              console.log("[useProjectIO] 导入结果:", L);
              const D = L.project_json;
              await N(D);
            } catch (z) {
              if (z instanceof rJ || !B.isCurrent()) return;
              console.error("加载项目失败:", z), F == null || F(0, "", "import");
              const V = z.message || "未知错误";
              let O = "加载项目失败: ";
              V.includes("JSON 格式错误") || V.includes("JSON 解析失败") ? O += V + " - 可能的原因：文件在保存时被截断、文件编码不正确、或文件不是有效的项目文件" : V.includes("内存不足") || V.includes("memory") ? O += V + " - 建议：关闭其他应用、重启后重试" : V.includes("读取数据文件失败") || V.includes("project.data.json") ? O += V + " - 可能的原因：选择的不是有效的项目文件夹，或文件夹结构不正确。请确保选择的是导出的项目文件夹（包含 project.data.json 文件）或项目 JSON 文件" : V.includes("文件读取失败") || V.includes("文件读取失败") ? O += V + " - 可能的原因：文件权限问题、文件正在被其他程序使用、或磁盘读取错误" : O += V, console.error("[useProjectIO]", O), F == null || F(-1, O, "import");
            }
          })();
          return;
        }
        const G = document.createElement("input");
        G.type = "file", G.accept = ".json,.zip", G.onchange = async z => {
          var O;
          const V = (O = z.target.files) == null ? void 0 : O[0];
          if (!(!V || !B.isCurrent())) try {
            Cde(), F == null || F(2, "正在读取文件...", "import");
            const L = V.size / 1024 / 1024;
            if (console.log(`[useProjectIO] Loading project file: ${L.toFixed(2)} MB`), L > 100 && console.warn(`[useProjectIO] ⚠️ 文件大小为 ${L.toFixed(1)} MB，加载可能需要较长时间`), V.name.toLowerCase().endsWith(".zip") || V.type === "application/zip" || V.type === "application/x-zip-compressed") {
              console.log("[useProjectIO] 检测到 ZIP 文件，开始解压..."), F == null || F(5, "正在解压 ZIP 文件...", "import");
              const H = await (await Ie(async () => {
                  const {
                    default: q
                  } = await Promise.resolve().then(() => wCe);
                  return {
                    default: q
                  };
                }, void 0, import.meta.url)).default.loadAsync(V),
                Y = H.file("project.json");
              if (!Y) throw new Error("ZIP 文件中未找到 project.json，请确认这是有效的项目 ZIP 包");
              const K = await Y.async("string"),
                W = JSON.parse(K);
              B.assertCurrent(), F_e(W);
              const Q = H.file("manifest.json");
              if (Q) {
                const q = await Q.async("string"),
                  ne = JSON.parse(q),
                  de = Object.entries(ne.assets || {});
                F == null || F(8, `正在恢复 ${de.length} 个资源文件...`, "import");
                const le = Ur.isAvailable(),
                  J = await F2i(de.map(([pe, ce]) => ({
                    assetId: pe,
                    fileName: ce.fileName,
                    mimeType: ce.mimeType,
                    remoteUrl: ce.remoteUrl
                  })), {
                    assertCurrent: B.assertCurrent,
                    isCurrent: B.isCurrent,
                    readFile: async pe => {
                      const ce = H.file(pe);
                      return ce ? ce.async("arraybuffer") : void 0;
                    },
                    saveAsset: (pe, ce, we) => ni.saveBlobAsset(pe, ce, we),
                    saveCache: le ? (pe, ce, we, X, Z) => Ur.saveAsset(pe, ce, we, X, Z) : void 0,
                    progress: (pe, ce) => {
                      F == null || F(8 + pe / ce * 14, `恢复资源 ${pe}/${ce}...`, "import");
                    }
                  });
                console.log(`[useProjectIO] ✅ 从 ZIP 恢复了 ${J}/${de.length} 个资源`);
              }
              W.history && Array.isArray(W.history) && (F == null || F(23, "正在恢复历史记录 URL...", "import"), await z2i(W.history, {
                assertCurrent: B.assertCurrent,
                resolve: q => ni.getAssetUrl(q)
              })), F == null || F(25, "正在加载项目数据...", "import"), await N(W);
            } else {
              let U;
              try {
                U = await V.text();
              } catch (Y) {
                throw new Error(`文件读取失败: ${Y.message}`);
              }
              F == null || F(10, "正在解析项目数据...", "import");
              let H;
              try {
                H = JSON.parse(U), U = "";
              } catch (Y) {
                console.error("[useProjectIO] JSON parse error:", Y);
                const K = Y.message;
                throw K.includes("Unexpected token") || K.includes("JSON") ? new Error("JSON 格式错误，文件可能已损坏或不是有效的项目文件") : K.includes("memory") || K.includes("allocation") ? new Error("文件过大，内存不足。请尝试关闭其他标签页后重试") : new Error(`JSON 解析失败: ${K}`);
              }
              await N(H);
            }
          } catch (L) {
            if (L instanceof rJ || !B.isCurrent()) return;
            console.error("加载项目失败:", L), F == null || F(0, "", "import");
            const D = L.message || "未知错误";
            let U = "加载项目失败: ";
            D.includes("ZIP") || D.includes("project.json") ? U += D + " - 请确认选择的是有效的项目 ZIP 包（需包含 project.json）" : D.includes("JSON 格式错误") || D.includes("JSON 解析失败") ? U += D + " - 可能的原因：文件在保存时被截断、文件编码不正确、或文件不是有效的项目文件" : D.includes("内存不足") || D.includes("memory") ? U += D + " - 建议：关闭其他浏览器标签页、重启浏览器、或使用性能更好的设备" : D.includes("文件读取失败") ? U += D + " - 可能的原因：文件权限问题、文件正在被其他程序使用、或磁盘读取错误" : U += D, console.error("[useProjectIO]", U), F == null || F(-1, U, "import");
          }
        }, G.click();
      }, [f, y, b, _, k, C, S, e]),
      R = j2i({
        setNodes: f,
        setConnections: y,
        setCharacterLibrary: b,
        setGroups: _,
        onProgress: k,
        importRequests: S
      }),
      j = g.useCallback(async () => {
        const B = u.size > 0 ? Array.from(u) : d ? [d] : [];
        if (B.length === 0) return;
        const F = n.filter(Y => B.includes(Y.id)),
          N = r.filter(Y => B.includes(Y.from) && B.includes(Y.to));
        console.log("[useProjectIO] 当前所有分组:", h), console.log("[useProjectIO] 选中的节点ID:", B);
        const G = h.filter(Y => Y.nodeIds.some(K => B.includes(K))).map(Y => ({
          ...Y,
          nodeIds: Y.nodeIds.filter(K => B.includes(K))
        })).filter(Y => Y.nodeIds.length > 0);
        console.log(`[useProjectIO] 📦 准备导出 ${G.length} 个分组:`, G.map(Y => `${Y.name}(${Y.nodeIds.length}个节点)`).join(", ")), console.log("[useProjectIO] 分组详细数据:", JSON.stringify(G, null, 2)), console.log("正在转换工作流中的图片和视频为本地数据...");
        const O = {
          type: "workflow",
          version: "1.0",
          nodes: await wS(F, 0, void 0, void 0, void 0, {
            preserveOriginalFields: ["content", "previewMjImages", "previewMjVideos", "selectedPreviewImage", "selectedPreviewVideo", "_contentAssetId", "_previewMjAssetIds", "_selectedImageAssetId"]
          }),
          connections: N,
          groups: G,
          exportedAt: DO()
        };
        console.log("[useProjectIO] 📄 工作流数据:", {
          节点数: O.nodes.length,
          连接数: O.connections.length,
          分组数: O.groups.length,
          分组详情: O.groups
        }), w == null || w({
          visible: !1,
          x: 0,
          y: 0
        });
        const L = new Date(),
          U = `工作流_${`${L.getFullYear()}${String(L.getMonth() + 1).padStart(2, "0")}${String(L.getDate()).padStart(2, "0")}_${String(L.getHours()).padStart(2, "0")}${String(L.getMinutes()).padStart(2, "0")}`}.json`,
          H = u5(O);
        if ("showSaveFilePicker" in window) try {
          const K = await (await window.showSaveFilePicker({
            suggestedName: U,
            types: [{
              description: "JSON 工作流文件",
              accept: {
                "application/json": [".json"]
              }
            }]
          })).createWritable();
          await K.write(JSON.stringify(H, null, 2)), await K.close(), console.log("[useProjectIO] ✅ 工作流保存成功！所有图片和视频已包含在文件中。");
        } catch (Y) {
          if (Y.name === "AbortError") return;
          console.error("保存工作流失败:", Y), console.error("[useProjectIO] ❌ 保存失败: " + (Y.message || "未知错误"));
        } else {
          const Y = new Blob([JSON.stringify(H, null, 2)], {
              type: "application/json"
            }),
            K = URL.createObjectURL(Y),
            W = document.createElement("a");
          W.href = K, W.download = U, W.click(), URL.revokeObjectURL(K), console.log("[useProjectIO] ✅ 工作流保存成功！所有图片和视频已包含在文件中。");
        }
      }, [u, d, n, r, h, w]);
    return {
      handleSaveProject: T,
      handleLoadProject: P,
      handleImportWorkflow: R,
      handleSaveSelectedWorkflow: j
    };
  };

function cdr(e, t) {
  if (Yi()) {
    t != null && t.immediate || !(t != null && t.nodeId) ? O$(e) : vae(e, t.nodeId);
    return;
  }
  if (t != null && t.immediate) {
    e();
    return;
  }
  g.startTransition(e);
}

function ddr(e, t, n) {
  cdr(() => e(t), n);
}

function q2i(e, t, n) {
  cdr(() => e(t), n);
}

function K2i(e, t) {
  if (typeof e != "function") return t;
  const n = Function.prototype.toString.call(e);
  return /\bstatus:\s*['"]completed['"]/.test(n) || /\bstatus:\s*['"]failed['"]/.test(n) ? {
    ...t,
    immediate: !0
  } : t;
}

function Q2i(e, t) {
  if (typeof e != "function") return t;
  const n = Function.prototype.toString.call(e);
  return /isGenerating:\s*false/.test(n) ? {
    ...t,
    immediate: !0
  } : t;
}

function lkt(e, t) {
  return String(e) === String(t);
}

function ycn(e, t) {
  if (lkt(e.id, t)) return !0;
  const n = String(e._audioAssetId || ""),
    r = String(e._assetId || "");
  return n === t || r === t;
}

function Y2i(e) {
  return e ? e.includes("_") ? /_?(?:audio|thumbnail|video)$/.test(e) ? e.replace(/_(?:audio|thumbnail|video)$/, "") : /_\d+$/.test(e) ? e.replace(/_\d+$/, "") : /_preview_\d+$/.test(e) ? e.replace(/_preview_\d+$/, "") : /_mj_\d+$/.test(e) ? e.replace(/_mj_\d+$/, "") : /_split_\d+$/.test(e) ? e.replace(/_split_\d+$/, "") : "" : e : "";
}

function X2i({
  setHistory: e
}) {
  g.useEffect(() => {
    const t = ni.addListener(async (n, r) => {
      const a = Y2i(n);
      ddr(e, i => {
        if (!i.find(d => lkt(d.id, a) || ycn(d, n))) return i;
        let s = !1;
        const l = i.map(d => {
          if (!(lkt(d.id, a) || ycn(d, n))) return d;
          const h = {
            ...d
          };
          let p = !1;
          const m = !!(d._globalOssUrlOnly || d.ossUploaded);
          !m && (n === a || n === d.id || n === String(d._assetId || "")) && !d._assetId && (h._assetId = n, p = !0);
          const f = String(d._audioAssetId || "");
          if (!m && (n === `${a}_audio` || d.type === "audio" && (n === f || n === String(d._assetId || ""))) && !d._audioAssetId && (h._audioAssetId = n, p = !0), n === `${a}_thumbnail` && !d._thumbnailAssetId && (h._thumbnailAssetId = n, p = !0), !p) {
            if (d.status === "generating") {
              const y = u3(d);
              if (y !== d) return s = !0, y;
            }
            return d;
          }
          return s = !0, h.status === "generating" ? u3(h) : h;
        });
        return s ? l : i;
      });
    });
    return () => t();
  }, [e]);
}

function J2i(e, t, n) {
  X2i({
    setHistory: t
  }), g.useEffect(() => {
    const r = window,
      a = () => {
        const i = KX();
        n(o => {
          const s = g5e(o);
          return i ? s : HHe(s);
        });
      };
    return r.__demoteHistoryEphemeralMedia = a, () => {
      r.__demoteHistoryEphemeralMedia === a && delete r.__demoteHistoryEphemeralMedia;
    };
  }, [n]);
}

const Z2i = new Set(["gen-image", "gen-video", "generate-character-image", "generate-scene-image", "generate-character-video", "generate-scene-video", "storyboard-chart-node"]),
  e_i = ["inputImageOrder", "inputItemOrder", "editImageInputImageOrder"],
  t_i = ["referenceImages", "editImageReferenceImages"];

function udr(e) {
  const t = e.settings || {},
    n = [],
    r = i => {
      const o = String(i || "").trim();
      !o || o === "undefined" || o === "null" || n.push(o);
    };
  r(e.content);
  try {
    r(Vv(e));
  } catch {}
  try {
    r(_f(e));
  } catch {}
  r(t._blobUrl), r(t._localOriginalUrlHint), r(t._canvasDisplayPreviewUrl), r(t.imageUrl), r(t[_i]), r(t[Pi]);
  const a = r9(e);
  return a && (r(a), r(`${N2}${a}`), r(`${Ld}${a}`)), [...new Set(n)];
}

function bcn(e, t, n) {
  if (!Array.isArray(e) || e.length === 0) return null;
  let r = !1;
  const a = e.map(i => {
    const o = String(i || "").trim();
    return o && t.has(o) ? (r = !0, n) : i;
  });
  return r ? a : null;
}

function n_i(e, t, n, r, a) {
  const i = String(n || "").trim();
  if (!i) return a;
  const o = new Set((t || []).map(u => String(u || "").trim()).filter(u => u && u !== i));
  if (o.size === 0) return a;
  const s = r.filter(u => u.from === e && (!u.inputType || u.inputType === "default")).map(u => u.to);
  if (s.length === 0) return a;
  const l = new Set(s),
    d = a.map(u => {
      if (!l.has(u.id) || !(Z2i.has(u.type) || u.type === "text-node" || u.type === "custom-agent" || u.type === "input-image")) return u;
      const p = {
        ...(u.settings || {})
      };
      let m = !1;
      for (const y of e_i) {
        const b = bcn(p[y], o, i);
        b && (p[y] = b, m = !0);
      }
      for (const y of t_i) {
        const b = bcn(p[y], o, i);
        b && (p[y] = b, m = !0);
      }
      const f = p.seedanceMaterials;
      if (Array.isArray(f) && f.length > 0) {
        let y = !1;
        const b = f.map(v => {
          const _ = String((v == null ? void 0 : v.url) || "").trim();
          return _ && o.has(_) ? (y = !0, {
            ...v,
            url: i
          }) : v;
        });
        y && (p.seedanceMaterials = b, m = !0);
      }
      return m ? {
        ...u,
        settings: p
      } : u;
    });
  return d.some((u, h) => u !== a[h]) ? d : a;
}

function fje(e, t) {
  const n = {
    ...e.settings,
    ...t.settings
  };
  for (const [r, a] of Object.entries(t.settings || {})) a === void 0 && delete n[r];
  return {
    ...e,
    ...t,
    settings: n
  };
}

function vcn(e, t, n, r, a = [], i = !0) {
  const o = e.findIndex(u => u.id === t);
  if (o < 0) return e;
  const s = e[o],
    l = fje(s, r(s)),
    d = e.slice();
  return d[o] = l, i ? n_i(t, [...a, ...udr(s)], Vv(l), n, d) : d;
}

function rc(e) {
  const t = e.settings || {};
  return JSON.stringify([e.id, e.content, e._contentAssetId, t._localCacheAssetId, t._assetId, t._ossRemoteUrl, t.mediaRevision, t.mediaType]);
}

const nM = e => e.map(t => ({
    ...t,
    bounds: {
      ...t.bounds
    }
  })),
  tst = (e, t) => JSON.stringify(e) === JSON.stringify(t);

function r_i(e, t, n) {
  const r = new Map(t.map(u => [u.id, u])),
    a = new Map(n.map(u => [u.id, u]));
  let i = !1;
  const o = [];
  for (const u of e) {
    const h = r.get(u.id),
      p = a.get(u.id);
    h && tst(u, h) && !tst(h, p) ? (i = !0, p && o.push(...nM([p]))) : o.push(u);
  }
  for (let u = 0; u < n.length; u++) {
    const h = n[u];
    if (r.has(h.id) || o.some(f => f.id === h.id)) continue;
    const p = n.slice(u + 1).find(f => o.some(y => y.id === f.id)),
      m = p ? o.findIndex(f => f.id === p.id) : o.length;
    o.splice(m, 0, ...nM([h])), i = !0;
  }
  const s = new Set(t.filter(u => a.has(u.id)).map(u => u.id)),
    l = t.filter(u => s.has(u.id)).map(u => u.id),
    d = e.filter(u => s.has(u.id)).map(u => u.id);
  if (tst(l, d)) {
    const u = new Map(o.map(m => [m.id, m])),
      h = n.filter(m => u.has(m.id)).map(m => u.get(m.id));
    let p = 0;
    for (let m = 0; m < o.length; m++) if (a.has(o[m].id)) {
      const f = h[p++];
      o[m] !== f && (o[m] = f, i = !0);
    }
  }
  return i ? o : e;
}

const vMe = (e, t) => JSON.stringify(e) === JSON.stringify(t);

function ckt(e, t, n) {
  const r = new Map(e.map(l => [l.id, l])),
    a = new Map(t.map(l => [l.id, l])),
    i = new Map(n.map(l => [l.id, l]));
  for (const l of new Set([...a.keys(), ...i.keys()])) if (!vMe(a.get(l), i.get(l)) && !vMe(r.get(l), a.get(l))) return {
    layers: e,
    conflict: !0
  };
  const o = new Set(t.filter(l => i.has(l.id)).map(l => l.id)),
    s = l => l.filter(d => o.has(d.id)).map(d => d.id);
  return !vMe(s(t), s(n)) && !vMe(s(t), s(e)) ? {
    layers: e,
    conflict: !0
  } : {
    layers: r_i(e, t, n),
    conflict: !1
  };
}

const wcn = Object.freeze({
    canUndo: !1,
    canRedo: !1,
    pending: !1,
    error: null
  }),
  gje = e => {
    var t;
    return ((t = e.settings) == null ? void 0 : t.editImageLayers) || [];
  },
  Nfe = (e, t) => JSON.stringify(e) === JSON.stringify(t);

function hdr(e) {
  const t = new Map(),
    n = new Map(),
    r = new Map(),
    a = l => {
      for (const d of Array.from(r.get(l) || [])) d();
    };
  e == null || e.subscribe(() => {
    const l = [...t.keys()];
    t.clear(), n.clear(), l.forEach(a);
  });
  const i = l => {
      const d = rc(l);
      let u = t.get(l.id);
      return (!u || u.media !== d) && (u = {
        media: d,
        past: [],
        future: [],
        status: wcn,
        pending: new Set(),
        error: null
      }, t.set(l.id, u)), n.set(l.id, d), u;
    },
    o = l => {
      const d = t.get(l);
      if (!d) return;
      const u = !!d.pending.size,
        h = {
          canUndo: !u && !!d.past.length,
          canRedo: !u && !!d.future.length,
          pending: u,
          error: d.error
        };
      Nfe(h, d.status) || (d.status = Object.freeze(h), a(l));
    },
    s = {
      retainNodes(l) {
        for (const d of n.keys()) l.has(d) || (n.delete(d), t.delete(d) && a(d));
      },
      memoryRoots() {
        return [...t.values()].flatMap(l => [...l.past, ...l.future].flatMap(d => [nM(d.before), nM(d.after)]));
      },
      accepts(l) {
        const d = n.get(l.id);
        return d === void 0 || d === rc(l);
      },
      read(l, d) {
        const u = t.get(l);
        return (u == null ? void 0 : u.media) === d ? u.status : wcn;
      },
      subscribe(l, d) {
        let u = r.get(l);
        return u || (u = new Set(), r.set(l, u)), u.add(d), () => {
          u.delete(d), !u.size && r.get(l) === u && r.delete(l);
        };
      },
      reconcile(l) {
        const d = t.get(l.id);
        n.set(l.id, rc(l)), d && d.media !== rc(l) && (t.delete(l.id), a(l.id));
      },
      record(l, d, u, h) {
        if (Nfe(d, u)) return;
        const p = i(l),
          m = p.past[p.past.length - 1];
        h && (m == null ? void 0 : m.group) === h && Nfe(m.after, d) ? (m.after = nM(u), Nfe(m.before, m.after) && p.past.pop()) : p.past.push({
          before: nM(d),
          after: nM(u),
          group: h
        }), p.past.length > 40 && p.past.shift(), p.future = [], p.error = null, o(l.id);
      },
      peek(l, d) {
        const u = t.get(l.id);
        if (!u || u.media !== rc(l) || u.pending.size) return null;
        const h = d === "undo" ? u.past : u.future;
        return h[h.length - 1] || null;
      },
      begin(l, d, u, h) {
        const p = i(l),
          m = {};
        return p.pending.add(m), p.error = null, o(l.id), f => {
          if (!(t.get(l.id) !== p || !p.pending.delete(m))) {
            if (f.error) p.error = f.error;else if (!f.ignored && !Nfe(f.before, f.after)) {
              if (d === "edit") s.record(l, f.before, f.after, h);else if (d === "undo" || d === "redo") {
                const y = d === "undo" ? p.past : p.future,
                  b = d === "undo" ? p.future : p.past;
                y[y.length - 1] === u && (y.pop(), b.push(u));
              }
            }
            o(l.id);
          }
        };
      },
      take(l, d) {
        const u = s.peek(l, d);
        if (!u) return null;
        const h = d === "undo" ? u.after : u.before,
          p = d === "undo" ? u.before : u.after,
          m = gje(l),
          f = ckt(m, h, p);
        return f.conflict || f.layers === m ? null : (s.begin(l, d, u)({
          before: m,
          after: f.layers
        }), b => ckt(b, h, p).layers);
      }
    };
  return s;
}

const NUe = new WeakMap();

function a_i(e, t) {
  var n;
  (n = NUe.get(e)) == null || n.retainNodes(t);
}

function i_i(e) {
  var t;
  return ((t = NUe.get(e)) == null ? void 0 : t.memoryRoots()) ?? [];
}

function o_i(e) {
  let t = NUe.get(e);
  return t || (t = hdr(e), NUe.set(e, t)), t;
}

function s_i({
  source: e,
  readDocument: t,
  savedSignatureRef: n,
  ...r
}) {
  const a = g.useRef(t);
  g.useLayoutEffect(() => {
    a.current = t;
  });
  const i = g.useCallback(() => _re(a.current()), []),
    o = g.useCallback(() => {
      n.current = i();
    }, [i, n]),
    {
      flushNow: s,
      hasPendingChanges: l
    } = Vya({
      ...r,
      ...e,
      onSaved: o,
      debounceMs: 600
    });
  return {
    markProjectClean: o,
    flushProjectAutosave: s,
    hasPendingProjectAutosaveChanges: l
  };
}

function xye(e) {
  var n;
  if (e.defaultPrevented || zX() && FX() !== "canvas") return !1;
  const t = e.target;
  return !((n = t == null ? void 0 : t.closest) != null && n.call(t, "[data-chat-file-drop-zone], [data-studio-workspace], [data-node-file-drop-zone]"));
}

function l_i(e = {}) {
  const {
    onFileDrop: t,
    onExternalFileDragStart: n,
    enabled: r = !0
  } = e;
  g.useEffect(() => {
    if (!r) return;
    const a = p => p instanceof HTMLElement && p.closest('[data-node-file-drop-zone="video-input"]') != null,
      i = p => p instanceof HTMLElement && p.closest("[data-chat-file-drop-zone]") != null;
    let o = !1;
    const s = p => {
        var m;
        return Array.from(((m = p.dataTransfer) == null ? void 0 : m.types) ?? []).includes("Files");
      },
      l = p => {
        xye(p) && (a(p.target) || i(p.target) || (p.preventDefault(), p.stopPropagation(), p.dataTransfer && (p.dataTransfer.dropEffect = "copy")));
      },
      d = p => {
        xye(p) && (a(p.target) || i(p.target) || (s(p) && !o && (o = !0, n == null || n()), p.preventDefault(), p.stopPropagation()));
      },
      u = p => {
        xye(p) && (a(p.target) || i(p.target) || (p.preventDefault(), p.stopPropagation()));
      },
      h = async p => {
        if (!xye(p) || a(p.target) || i(p.target) || !p.dataTransfer) return;
        o = !1;
        const m = p.dataTransfer.getData("application/json");
        if (m) try {
          const y = JSON.parse(m);
          if (y.type === "history-item" || y.type === "material-library-asset" || y.type === "pose-reference") return;
        } catch {}
        p.preventDefault(), p.stopPropagation(), n == null || n();
        const f = Array.from(p.dataTransfer.files);
        f.length !== 0 && t && f.length > 0 && t(f, {
          clientX: p.clientX,
          clientY: p.clientY
        });
      };
    return document.addEventListener("dragover", l), document.addEventListener("dragenter", d), document.addEventListener("dragleave", u), document.addEventListener("drop", h), () => {
      document.removeEventListener("dragover", l), document.removeEventListener("dragenter", d), document.removeEventListener("dragleave", u), document.removeEventListener("drop", h);
    };
  }, [t, n, r]);
}

const xcn = t5e("LocalCache");

function c_i() {
  if (typeof window > "u") return !1;
  const e = window;
  return !!(e.__LINGO_ELECTRON_NATIVE_SHELL__ || e.__LINGO_SIDECAR__ || /\bElectron\b/i.test(navigator.userAgent) || us());
}

const wMe = {
    INITIAL_DELAY: 1e3,
    MAX_DELAY: 3e4,
    MULTIPLIER: 2,
    MAX_FAILURES: 5
  },
  d_i = () => {
    const [e, t] = g.useState(!1),
      [n, r] = g.useState({
        imageSavePath: "",
        videoSavePath: "",
        convertPngToJpg: !0,
        pilAvailable: !1,
        jpgQuality: 95
      }),
      [a, i] = g.useState(!1),
      o = g.useRef(0),
      s = g.useRef(null),
      l = g.useRef(null);
    return g.useEffect(() => {
      if (c_i()) return;
      let d = !0;
      const u = async () => {
          if (d) try {
            const m = new AbortController(),
              f = setTimeout(() => m.abort(), 2e3),
              y = await fetch(`${Xft.SERVER_URL}/ping`, {
                method: "GET",
                signal: m.signal
              });
            if (clearTimeout(f), y.ok && d) {
              const b = await y.json();
              t(!0), r(v => ({
                ...v,
                imageSavePath: b.image_save_path || "",
                videoSavePath: b.video_save_path || "",
                convertPngToJpg: b.convert_png_to_jpg !== !1,
                pilAvailable: b.pil_available || !1
              })), o.current = 0, l.current !== !0 && (xcn.info("本地缓存服务器已连接"), l.current = !0), p(Xft.PING_INTERVAL);
            } else h();
          } catch {
            d && h();
          }
        },
        h = () => {
          if (!d) return;
          t(!1), o.current = Math.min(o.current + 1, wMe.MAX_FAILURES), l.current !== !1 && (xcn.info("本地缓存服务器未连接"), l.current = !1);
          const m = Math.min(wMe.INITIAL_DELAY * Math.pow(wMe.MULTIPLIER, o.current - 1), wMe.MAX_DELAY);
          p(m);
        },
        p = m => {
          d && (s.current && clearTimeout(s.current), s.current = setTimeout(() => {
            d && u();
          }, m));
        };
      return p(3e3), () => {
        d = !1, s.current && (clearTimeout(s.current), s.current = null);
      };
    }, []), {
      localCacheServerConnected: e,
      setLocalCacheServerConnected: t,
      localServerConfig: n,
      setLocalServerConfig: r,
      localCacheSettingsOpen: a,
      setLocalCacheSettingsOpen: i
    };
  };

function nst(e) {
  return e || jl() || Rl();
}

function u_i({
  nodes: e,
  view: t,
  viewportWidth: n,
  viewportHeight: r,
  isCanvasInteracting: a,
  forceVisibleNodeIds: i
}) {
  const [o, s] = g.useState(0),
    l = E0();
  g.useEffect(() => {
    const _ = () => s(w => w + 1);
    return window.addEventListener(go, _), () => window.removeEventListener(go, _);
  }, []);
  const d = g.useRef(e);
  d.current = e;
  const u = g.useMemo(() => `${clr(e)}|${JSON.stringify(e.filter(_ => cLe(_).length > 0).map(_ => _.id))}`, [e]),
    h = g.useMemo(() => l ? vlr(d.current, t, n, r) : new Map(), [u, t.x, t.y, t.zoom, n, r, o, l]),
    p = g.useRef(new Map()),
    m = g.useMemo(() => {
      let _ = h;
      for (const w of i ?? []) {
        const k = h.get(w);
        k !== "far" && k !== "preload" || (_ === h && (_ = new Map(h)), _.set(w, "visible"));
      }
      return p.current = plr(p.current, _), p.current;
    }, [h, i]),
    f = g.useRef(new Map()),
    y = g.useRef(nst(a)),
    b = g.useRef(a);
  b.current = a;
  const v = g.useRef(null);
  return g.useEffect(() => {
    if (!l) {
      b_t();
      return;
    }
    (nst(a) || Lle()) && $re(!0);
    const _ = [],
      w = [],
      k = new Set();
    for (const A of e) {
      const S = m.get(A.id),
        C = S === "visible" ? _ : S === "preload" ? w : null;
      if (!C) continue;
      const I = f.current.get(A.id),
        E = iHe(t.zoom, A.width, A.height, void 0, I);
      f.current.set(A.id, E), k.add(A.id);
      for (const M of cLe(A)) X5n(M) && C.push(NIt(M, t.zoom, {
        worldWidth: A.width,
        worldHeight: A.height
      }, void 0, I));
    }
    for (const A of f.current.keys()) k.has(A) || f.current.delete(A);
    flr({
      visible: _,
      preload: w
    });
  }, [l, o, e, m, t.zoom, a]), g.useEffect(() => {
    if (!l) return;
    const _ = () => {
      if (v.current != null && (clearTimeout(v.current), v.current = null), nst(b.current)) {
        $re(!0), y.current = !0;
        return;
      }
      if (Lle()) {
        $re(!0), v.current = setTimeout(() => _(), $5t() + 8);
        return;
      }
      y.current ? (y.current = !1, glr()) : $re(!1);
    };
    _();
    const w = tZ(() => _());
    return () => {
      w(), v.current != null && (clearTimeout(v.current), v.current = null);
    };
  }, [a, l, o, e, m]), g.useEffect(() => () => b_t(), []), m;
}

function h_i({
  nodes: e,
  forceIncludeNodeIds: t,
  selectedNodeIds: n,
  dragNodeId: r,
  resizingNodeId: a
}, i) {
  const o = new Set(t);
  n.forEach(s => o.add(s)), r && o.add(r), a && o.add(a);
  for (const s of e) s.isGenerating && o.add(s.id);
  return i && i.size === o.size && [...o].every(s => i.has(s)) ? i : o;
}

function p_i(e) {
  const {
      nodes: t,
      forceIncludeNodeIds: n,
      selectedNodeIds: r,
      dragNodeId: a,
      resizingNodeId: i
    } = e,
    o = g.useRef(),
    s = g.useMemo(() => {
      const l = h_i(e, o.current);
      return o.current = l, l;
    }, [t, n, r, a, i]);
  return u_i({
    ...e,
    forceVisibleNodeIds: s
  });
}

function m_i({
  nodes: e,
  view: t,
  isInteracting: n,
  canvasWidth: r,
  canvasHeight: a
}) {
  const i = g.useRef(t.zoom),
    o = g.useRef(),
    s = g.useCallback(() => {
      const u = -t.x / t.zoom,
        h = -t.y / t.zoom,
        p = u + r / t.zoom,
        m = h + a / t.zoom,
        f = 200;
      return e.filter(y => {
        const b = y.x + y.width,
          v = y.y + y.height;
        return !(y.x > p + f || b < u - f || y.y > m + f || v < h - f);
      });
    }, [e, t, r, a]),
    l = g.useCallback(() => {
      const h = s().filter(m => m.type === "input-image" && m.content && m.content.startsWith("data:image"));
      if (h.length === 0) return;
      const p = h.map(m => ({
        nodeId: m.id,
        dataUrl: m.content
      }));
      D5n(p).catch(m => {
        console.warn("Failed to preload thumbnails:", m);
      });
    }, [s]);
  return g.useEffect(() => (Math.abs(t.zoom - i.current) > .1 && !n && (i.current = t.zoom, o.current && clearTimeout(o.current), o.current = window.setTimeout(() => {
    l();
  }, 500)), () => {
    o.current && clearTimeout(o.current);
  }), [t.zoom, n, l]), g.useEffect(() => {
    const u = setTimeout(() => {
      l();
    }, 1e3);
    return () => clearTimeout(u);
  }, []), {
    renderQuality: g.useCallback(() => n || t.zoom < .3 ? "low" : t.zoom < .8 ? "medium" : "high", [t.zoom, n])(),
    preloadVisibleThumbnails: l
  };
}

function f_i() {
  const [e, t] = g.useState({
      visible: !1,
      x: 0,
      y: 0
    }),
    [n, r] = g.useState({
      visible: !1,
      x: 0,
      y: 0,
      nodeId: null,
      frame: null
    }),
    [a, i] = g.useState({
      visible: !1,
      x: 0,
      y: 0,
      worldX: 0,
      worldY: 0,
      item: null
    }),
    [o, s] = g.useState({
      visible: !1,
      x: 0,
      y: 0
    }),
    [l, d] = g.useState({
      visible: !1,
      x: 0,
      y: 0,
      item: null
    }),
    [u, h] = g.useState({
      visible: !1,
      x: 0,
      y: 0,
      nodeId: null
    }),
    [p, m] = g.useState(null),
    f = g.useCallback(() => {
      t({
        visible: !1,
        x: 0,
        y: 0
      }), r({
        visible: !1,
        x: 0,
        y: 0,
        nodeId: null,
        frame: null
      }), i({
        visible: !1,
        x: 0,
        y: 0,
        worldX: 0,
        worldY: 0,
        item: null
      }), s({
        visible: !1,
        x: 0,
        y: 0
      }), d({
        visible: !1,
        x: 0,
        y: 0,
        item: null
      }), h({
        visible: !1,
        x: 0,
        y: 0,
        nodeId: null
      });
    }, []);
  return {
    contextMenu: e,
    frameContextMenu: n,
    historyContextMenu: a,
    selectionContextMenu: o,
    previewContextMenu: l,
    inputImageContextMenu: u,
    setContextMenu: t,
    setFrameContextMenu: r,
    setHistoryContextMenu: i,
    setSelectionContextMenu: s,
    setPreviewContextMenu: d,
    setInputImageContextMenu: h,
    croppingNodeId: p,
    setCroppingNodeId: m,
    closeAllMenus: f
  };
}

function g_i() {
  let e = null,
    t = 0,
    n;
  const r = new Set(),
    a = () => {
      for (const s of r) s();
    },
    i = s => e === s && s.lease.isCurrent(),
    o = s => {
      s && e !== s || (n == null || n(), n = void 0, e && (e = null, a()));
    };
  return {
    getSnapshot: () => e,
    subscribe(s) {
      return r.add(s), () => {
        r.delete(s);
      };
    },
    isCurrent: i,
    close: o,
    open(s, l) {
      const d = l.lease();
      if (!d.isCurrent()) return;
      n == null || n();
      const u = {
        id: ++t,
        initialText: s,
        lease: d
      };
      e = u, n = l.subscribe(() => {
        d.isCurrent() || o(u);
      }), a();
    }
  };
}

function y_i() {
  const [e, t] = g.useState(null),
    [n, r] = g.useState(!1),
    [a, i] = g.useState(!1),
    [o, s] = g.useState(!1),
    [l] = g.useState(g_i),
    [d, u] = g.useState(!1),
    h = g.useCallback(f => {
      t(f), r(!0);
    }, []),
    p = g.useCallback(() => {
      r(!1), setTimeout(() => t(null), 300);
    }, []),
    m = g.useCallback(() => {
      r(!1), o7r(), o6n(), b_e(!1), fUe(!1), i(!1), s(!1), l.close(), u(!1);
    }, [l]);
  return {
    lightboxItem: e,
    lightboxOpen: n,
    setLightboxItem: t,
    setLightboxOpen: r,
    openLightbox: h,
    closeLightbox: p,
    setSettingsOpen: IEt,
    setStorageManageOpen: r7r,
    setHistoryOpen: b_e,
    setBatchManageOpen: fUe,
    promptLibraryEditorOpen: a,
    setPromptLibraryEditorOpen: i,
    createCharacterOpen: o,
    setCreateCharacterOpen: s,
    skillWorkflowSession: l,
    localCacheSettingsOpen: d,
    setLocalCacheSettingsOpen: u,
    closeAllModals: m
  };
}

class b_i {
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
}

function v_i() {
  const [e, t] = g.useState(!1),
    [n, r] = g.useState({
      current: 0,
      total: 0
    }),
    a = g.useRef(null),
    i = g.useCallback(() => {
      a.current && (a.current.cancel(), console.log("[useDownload] 用户取消下载")), t(!1), r({
        current: 0,
        total: 0
      });
    }, []),
    o = g.useCallback(async (p, m, f) => {
      t(!0), r({
        current: 0,
        total: 1
      });
      try {
        let y = p;
        if (/^https?:\/\//i.test(y)) {
          const {
            resolvePreviewDownloadUrl: w
          } = await Ie(async () => {
            const {
              resolvePreviewDownloadUrl: k
            } = await Promise.resolve().then(() => ii);
            return {
              resolvePreviewDownloadUrl: k
            };
          }, void 0, import.meta.url);
          y = w(y, {
            mediaType: f
          });
        }
        let b;
        if (y.startsWith("blob:") && f === "image") {
          const {
              getFullBlobForDisplayUrl: w
            } = await Ie(async () => {
              const {
                getFullBlobForDisplayUrl: A
              } = await Promise.resolve().then(() => No);
              return {
                getFullBlobForDisplayUrl: A
              };
            }, void 0, import.meta.url),
            k = await w(y);
          k ? b = k : b = await (await fetch(y)).blob();
        } else if (y.startsWith("data:")) b = await (await fetch(y)).blob();else if (y.startsWith("blob:")) b = await (await fetch(y)).blob();else if (f === "video" && /^https?:\/\//i.test(y)) {
          const {
            downloadWithFallback: w
          } = await Ie(async () => {
            const {
              downloadWithFallback: k
            } = await Promise.resolve().then(() => El);
            return {
              downloadWithFallback: k
            };
          }, void 0, import.meta.url);
          b = await w(y, 3e5), b.type || (b = new Blob([await b.arrayBuffer()], {
            type: "video/mp4"
          }));
        } else b = await (await fetch(y)).blob();
        if (f === "video") {
          const {
            isPlausibleVideoDownloadBlob: w
          } = await Ie(async () => {
            const {
              isPlausibleVideoDownloadBlob: k
            } = await Promise.resolve().then(() => W_i);
            return {
              isPlausibleVideoDownloadBlob: k
            };
          }, void 0, import.meta.url);
          if (!(await w(b))) throw new Error(`视频数据无效（${(b.size / 1024).toFixed(1)}KB），可能下载到了封面缩略图，请重试`);
        }
        const v = URL.createObjectURL(b),
          _ = document.createElement("a");
        _.href = v, _.download = m, document.body.appendChild(_), _.click(), document.body.removeChild(_), URL.revokeObjectURL(v), r({
          current: 1,
          total: 1
        });
      } catch (y) {
        console.error(`下载失败: ${m}`, y), alert(x("下载失败: {0}", y instanceof Error ? y.message : "未知错误"));
      } finally {
        t(!1), r({
          current: 0,
          total: 0
        });
      }
    }, []),
    s = g.useCallback((p = 0) => {
      const m = new b_i();
      a.current = m, t(!0), r({
        current: 0,
        total: p
      });
    }, []),
    l = g.useCallback((p, m) => {
      r(f => ({
        current: p,
        total: m ?? f.total
      }));
    }, []),
    d = g.useCallback(() => {
      t(!1), r({
        current: 0,
        total: 0
      }), a.current = null;
    }, []),
    u = g.useCallback(() => {
      t(!1), r({
        current: 0,
        total: 0
      }), a.current = null;
    }, []),
    h = g.useCallback(() => a.current, []);
  return {
    isDownloading: e,
    downloadProgress: n,
    setIsDownloading: t,
    setDownloadProgress: r,
    handleDownloadFile: o,
    startDownload: s,
    updateDownloadProgress: l,
    finishDownload: d,
    resetDownload: u,
    cancelDownload: i,
    getCancellationToken: h
  };
}

function w_i(e) {
  return new Promise((t, n) => {
    const r = new FileReader();
    r.onloadend = () => t(r.result), r.onerror = n, r.readAsDataURL(e);
  });
}

const Bne = "https://ai.comfly.chat";

function Yre(e) {
  return !e || typeof e != "object" ? e : {
    ...e,
    id: e.id,
    audio_url: e.audio_url || e.audioUrl || "",
    source_audio_url: e.source_audio_url || e.sourceAudioUrl || "",
    stream_audio_url: e.stream_audio_url || e.streamAudioUrl || "",
    source_stream_audio_url: e.source_stream_audio_url || e.sourceStreamAudioUrl || "",
    image_url: e.image_url || e.imageUrl || "",
    source_image_url: e.source_image_url || e.sourceImageUrl || "",
    prompt: e.prompt,
    model_name: e.model_name || e.modelName,
    title: e.title,
    tags: e.tags,
    createTime: e.createTime,
    duration: e.duration,
    status: e.status || e.state || ""
  };
}

function _cn(e) {
  if (!(typeof e != "number" || !Number.isFinite(e)) && !(e < 10 || e > 360)) return Math.round(e);
}

function x_i(e) {
  if (!e || typeof e != "object") return [];
  const t = e.response;
  if (t && typeof t == "object") {
    if (Array.isArray(t.sunoData)) return t.sunoData.map(Yre);
    if (Array.isArray(t.data)) return t.data.map(Yre);
  }
  return Array.isArray(e.data) ? e.data.map(Yre) : Array.isArray(e.sunoData) ? e.sunoData.map(Yre) : [];
}

class __i {
  constructor(t = Bne, n = "", r = []) {
    On(this, "baseUrl");
    On(this, "apiKey");
    On(this, "configs");
    this.baseUrl = t.replace(/\/+$/, ""), this.apiKey = n, this.configs = r;
  }
  updateConfig(t, n, r) {
    t && (this.baseUrl = t.replace(/\/+$/, "")), n && (this.apiKey = n), r && (this.configs = r);
  }
  getModelConfig(t) {
    return this.configs.find(n => n.id === t);
  }
  getApiKey(t) {
    const n = this.getModelConfig(t);
    return (n == null ? void 0 : n.key) || this.apiKey;
  }
  getBaseUrl(t) {
    const n = this.getModelConfig(t);
    return ((n == null ? void 0 : n.url) || this.baseUrl).replace(/\/+$/, "");
  }
  async request(t, n = {}, r) {
    const a = r ? this.getBaseUrl(r) : this.baseUrl,
      i = r ? this.getApiKey(r) : this.apiKey;
    try {
      const o = await fetch(`${a}${t}`, {
        ...n,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${i}`,
          ...n.headers
        }
      });
      if (!o.ok) {
        const l = await o.text();
        return {
          success: !1,
          error: `HTTP ${o.status}: ${l}`
        };
      }
      return {
        success: !0,
        data: await o.json()
      };
    } catch (o) {
      return {
        success: !1,
        error: String(o)
      };
    }
  }
  async imageToBase64(t) {
    if (t.startsWith("data:")) return t;
    try {
      const r = await (await fetch(t)).blob();
      return new Promise((a, i) => {
        const o = new FileReader();
        o.onload = () => a(o.result), o.onerror = i, o.readAsDataURL(r);
      });
    } catch (n) {
      return console.error("图片转 Base64 失败:", n), t;
    }
  }
  fileToBase64(t) {
    return new Promise((n, r) => {
      const a = new FileReader();
      a.onload = () => n(a.result), a.onerror = r, a.readAsDataURL(t);
    });
  }
  async chatCompletion(t) {
    return this.request("/v1/chat/completions", {
      method: "POST",
      body: JSON.stringify(t)
    }, t.model);
  }
  async generateImage(t) {
    const n = this.getModelConfig(t.model);
    return this.getBaseUrl(t.model), this.getApiKey(t.model), this.request("/v1/images/generations", {
      method: "POST",
      body: JSON.stringify({
        model: (n == null ? void 0 : n.modelName) || t.model,
        prompt: t.prompt,
        size: t.size || "1024x1024",
        n: t.n || 1
      })
    }, t.model);
  }
  async generateImageAsync(t) {
    const n = this.getModelConfig(t.model);
    return this.request("/v1/images/generations", {
      method: "POST",
      body: JSON.stringify({
        model: (n == null ? void 0 : n.modelName) || t.model,
        prompt: t.prompt,
        size: t.size || "1024x1024",
        n: t.n || 1
      })
    }, t.model);
  }
  async generateVideo(t) {
    var a, i;
    const n = this.getModelConfig(t.model),
      r = this.getBaseUrl(t.model);
    if (t.model.startsWith("sora")) {
      if (r.includes("api.openai.com")) return this.request("/videos", {
        method: "POST",
        body: JSON.stringify({
          model: (n == null ? void 0 : n.modelName) || t.model,
          prompt: t.prompt,
          seconds: parseInt(((i = t.duration) == null ? void 0 : i.replace("s", "")) || "5"),
          size: t.size || "1920x1080"
        })
      }, t.model);
      {
        const s = {
          model: (n == null ? void 0 : n.modelName) || t.model,
          prompt: t.prompt,
          aspect_ratio: t.size || "16:9",
          duration: ((a = t.duration) == null ? void 0 : a.replace("s", "")) || "10"
        };
        if (t.referenceImages && t.referenceImages.length > 0) {
          const l = await Promise.all(t.referenceImages.map(async d => {
            if (d.startsWith("data:") || d.startsWith("http://") || d.startsWith("https://")) return d;
            try {
              const u = await Ns(d);
              return await w_i(u);
            } catch (u) {
              return console.error("[API Service] 图片转换失败:", u), d;
            }
          }));
          s.images = l, console.log("[API Service] 图生视频，已添加图片数据");
        }
        return this.request("/v2/videos/generations", {
          method: "POST",
          body: JSON.stringify(s)
        }, t.model);
      }
    }
    if (t.model.includes("veo")) {
      const o = [];
      return t.firstFrame && o.push(t.firstFrame), t.lastFrame && o.push(t.lastFrame), this.request("/v1/video/generations", {
        method: "POST",
        body: JSON.stringify({
          model: (n == null ? void 0 : n.modelName) || t.model,
          prompt: t.prompt,
          duration: t.duration || "8s",
          images: o.length > 0 ? o : void 0
        })
      }, t.model);
    }
    return this.request("/v1/video/generations", {
      method: "POST",
      body: JSON.stringify({
        model: (n == null ? void 0 : n.modelName) || t.model,
        prompt: t.prompt,
        duration: t.duration,
        size: t.size
      })
    }, t.model);
  }
  async getTaskStatus(t, n) {
    n && this.getModelConfig(n);
    const r = n ? this.getBaseUrl(n) : this.baseUrl;
    return n != null && n.startsWith("sora") ? r.includes("api.openai.com") ? this.request(`/videos/${t}`, {
      method: "GET"
    }, n) : this.request(`/v2/videos/generations/${t}`, {
      method: "GET"
    }, n) : this.request(`/v1/tasks/${t}`, {
      method: "GET"
    }, n);
  }
  async pollTaskUntilComplete(t, n, r, a = 120, i = 5e3) {
    for (let o = 0; o < a; o++) {
      const s = await this.getTaskStatus(t, n);
      if (!s.success) return s;
      const l = s.data;
      if (l != null && l.progress && r && r(l.progress), (l == null ? void 0 : l.status) === "completed") return s;
      if ((l == null ? void 0 : l.status) === "failed") return {
        success: !1,
        error: l.error || "任务失败"
      };
      await new Promise(d => setTimeout(d, i));
    }
    return {
      success: !1,
      error: "任务超时"
    };
  }
  async generateMusic(t) {
    const n = f7(t.model),
      r = this.getBaseUrl(n),
      a = this.getApiKey(n),
      i = !!(t.instrumental ?? t.make_instrumental),
      o = typeof t.customMode == "boolean" ? t.customMode : t.mode === "custom" || t.mode === "extend",
      s = String(t.style ?? t.tags ?? "").trim(),
      l = String(t.title ?? "").trim();
    let d = String(t.prompt ?? "").trim();
    o && i ? d = "" : !o && d && (d = ljn(d, s));
    const u = aie(n, o),
      h = XH(),
      p = JH();
    if (!o && !d) return {
      success: !1,
      error: "灵感模式需要填写音乐描述（prompt）"
    };
    if (o && !i && !d) return {
      success: !1,
      error: "自定义模式需要填写歌词（prompt）"
    };
    if (o && !s) return {
      success: !1,
      error: "自定义模式需要填写风格（style）"
    };
    if (o && !l) return {
      success: !1,
      error: "自定义模式需要填写标题（title）"
    };
    if (d.length > u) if (!o) d = d.slice(0, u);else return {
      success: !1,
      error: `prompt 超出上限（${u} 字符）`
    };
    if (o && s.length > h) return {
      success: !1,
      error: `style 超出上限（${h} 字符）`
    };
    if (o && l.length > p) return {
      success: !1,
      error: `title 超出上限（${p} 字符）`
    };
    const m = YH(r);
    let f, y;
    if (m) {
      const w = tQ(n);
      y = "/api/v1/generate", f = {
        customMode: o,
        instrumental: i,
        model: w,
        callBackUrl: t.callBackUrl || wRe,
        prompt: o && i ? "" : d,
        style: o ? s : "",
        title: o ? l : ""
      }, t.negativeTags && (f.negativeTags = t.negativeTags), t.vocalGender && !i && (f.vocalGender = t.vocalGender), typeof t.styleWeight == "number" && (f.styleWeight = t.styleWeight), typeof t.weirdnessConstraint == "number" && (f.weirdnessConstraint = t.weirdnessConstraint), typeof t.audioWeight == "number" && (f.audioWeight = t.audioWeight), t.personaId && o && (f.personaId = t.personaId, t.personaModel && (f.personaModel = t.personaModel));
      const k = o ? _cn(t.duration) : void 0;
      k !== void 0 && (f.duration = k);
    } else {
      const w = xRe(n);
      y = "/suno/generate", o ? i ? f = {
        prompt: "",
        tags: s,
        mv: w,
        title: l,
        make_instrumental: !0
      } : f = {
        prompt: d,
        mv: w,
        title: l,
        tags: s,
        make_instrumental: !1
      } : f = {
        gpt_description_prompt: d,
        mv: w,
        prompt: "",
        make_instrumental: i
      };
    }
    const b = await this.request(y, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${a}`
      },
      body: JSON.stringify(f)
    }, n);
    if (!b.success) return {
      success: !1,
      error: b.error || "生成请求失败"
    };
    const v = b.data;
    if (v && typeof v == "object" && typeof v.code == "number" && v.code !== 200) return {
      success: !1,
      error: v.msg || v.message || `API 错误 code=${v.code}`
    };
    const _ = this.parseSunoGenerateResponse(v);
    return _ || (console.error("[generateMusic] Failed to parse response:", b.data), {
      success: !1,
      error: `无法解析 API 响应: ${JSON.stringify(b.data).substring(0, 200)}...`
    });
  }
  parseSunoGenerateResponse(t) {
    if (!t) return null;
    if (typeof t == "object" && Array.isArray(t.clips)) {
      const n = t.clips.map(Yre),
        r = n.map(a => a.id).filter(Boolean);
      if (r.length > 0) return {
        success: !0,
        data: {
          task_id: "",
          clip_ids: r,
          clips: n
        }
      };
    }
    if (typeof t == "object" && "data" in t) {
      const n = t.data;
      if (Array.isArray(n)) return {
        success: !0,
        data: {
          task_id: "",
          clip_ids: n.map(String)
        }
      };
      if (typeof n == "string") return {
        success: !0,
        data: {
          task_id: n
        }
      };
      if (n && typeof n == "object") {
        const r = n.taskId || n.task_id || n.id;
        if (r) return {
          success: !0,
          data: {
            task_id: String(r)
          }
        };
      }
    }
    if (typeof t == "string") return {
      success: !0,
      data: {
        task_id: t
      }
    };
    if (Array.isArray(t)) return {
      success: !0,
      data: {
        task_id: "",
        clip_ids: t.map(String)
      }
    };
    if (typeof t == "object") {
      const n = t.task_id || t.taskId || t.id,
        r = t.clip_ids || t.clipIds || t.ids;
      if (n) return {
        success: !0,
        data: {
          task_id: String(n)
        }
      };
      if (Array.isArray(r) && r.length > 0) return {
        success: !0,
        data: {
          task_id: "",
          clip_ids: r
        }
      };
    }
    return null;
  }
  async getMusicTaskStatus(t, n) {
    const r = n ? this.getApiKey(n) : this.apiKey,
      a = n ? this.getBaseUrl(n) : this.baseUrl,
      o = YH(a) ? `/api/v1/generate/record-info?taskId=${encodeURIComponent(t)}` : `/suno/fetch/${encodeURIComponent(t)}`,
      s = await this.request(o, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${r}`
        }
      }, n);
    if (!s.success || !s.data) return s;
    const l = s.data,
      d = l != null && l.data && typeof l.data == "object" && !Array.isArray(l.data) ? l.data : l,
      u = x_i(d),
      h = Array.isArray(d == null ? void 0 : d.data) ? d.data.map(Yre) : [],
      p = u.length > 0 ? u : h,
      m = String((d == null ? void 0 : d.status) || (l == null ? void 0 : l.status) || "");
    return {
      success: !0,
      data: {
        code: (l == null ? void 0 : l.code) ?? 200,
        message: (l == null ? void 0 : l.msg) || (l == null ? void 0 : l.message) || "success",
        msg: (l == null ? void 0 : l.msg) || (l == null ? void 0 : l.message),
        data: {
          task_id: (d == null ? void 0 : d.taskId) || (d == null ? void 0 : d.task_id) || t,
          taskId: (d == null ? void 0 : d.taskId) || (d == null ? void 0 : d.task_id) || t,
          status: m,
          progress: d == null ? void 0 : d.progress,
          fail_reason: (d == null ? void 0 : d.errorMessage) || (d == null ? void 0 : d.fail_reason),
          errorMessage: d == null ? void 0 : d.errorMessage,
          data: p,
          response: d == null ? void 0 : d.response
        }
      }
    };
  }
  async getMusicByClipIds(t, n) {
    const r = n ? this.getApiKey(n) : this.apiKey,
      a = t.join(",");
    return this.request(`/suno/feed/${a}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${r}`
      }
    }, n);
  }
  async getBackendTaskStatus(t, n) {
    const r = n ? this.getApiKey(n) : this.apiKey;
    return this.request(`/v1/tasks/${t}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${r}`
      }
    }, n);
  }
  async getAudioUploadSignature(t = "mp3", n) {
    const r = n ? this.getApiKey(n) : this.apiKey,
      a = await this.request("/suno/uploads/audio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${r}`
        },
        body: JSON.stringify({
          extension: t
        })
      }, n);
    if (!a.success) return {
      success: !1,
      error: a.error
    };
    const i = a.data,
      o = i && typeof i == "object" && i.data && typeof i.data == "object" && (i.data.id || i.data.url) ? i.data : i;
    return !(o != null && o.id) || !(o != null && o.url) || !(o != null && o.fields) ? {
      success: !1,
      error: `无法解析上传签名: ${JSON.stringify(i).slice(0, 200)}`
    } : {
      success: !0,
      data: o
    };
  }
  async uploadAudioToS3(t, n, r, a) {
    try {
      const i = new FormData();
      return Object.keys(n).forEach(o => {
        i.append(o, n[o]);
      }), i.append("file", r), new Promise((o, s) => {
        const l = new XMLHttpRequest();
        l.upload.addEventListener("progress", d => {
          if (d.lengthComputable && a) {
            const u = Math.round(d.loaded / d.total * 100);
            a(u);
          }
        }), l.addEventListener("load", () => {
          l.status >= 200 && l.status < 300 ? o(!0) : s(new Error(`Upload failed with status ${l.status}`));
        }), l.addEventListener("error", () => {
          s(new Error("Upload failed"));
        }), l.addEventListener("abort", () => {
          s(new Error("Upload aborted"));
        }), l.open("POST", t), l.send(i);
      });
    } catch (i) {
      return console.error("[Upload Audio] Error:", i), !1;
    }
  }
  async reportUploadFinish(t, n, r) {
    const a = r ? this.getApiKey(r) : this.apiKey;
    return this.request(`/suno/uploads/audio/${t}/upload-finish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${a}`
      },
      body: JSON.stringify({
        upload_type: "file_upload",
        upload_filename: n
      })
    }, r);
  }
  async getUploadStatus(t, n) {
    const r = n ? this.getApiKey(n) : this.apiKey,
      a = await this.request(`/suno/uploads/audio/${t}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${r}`
        }
      }, n);
    if (!a.success) return {
      success: !1,
      error: a.error
    };
    const i = a.data,
      o = i && typeof i == "object" && i.data && typeof i.data == "object" && (i.data.status != null || i.data.id != null) ? i.data : i;
    return !o || typeof o != "object" ? {
      success: !1,
      error: `无法解析上传状态: ${JSON.stringify(i).slice(0, 200)}`
    } : {
      success: !0,
      data: {
        id: String(o.id ?? t),
        status: String(o.status ?? "").trim(),
        error_message: o.error_message ?? o.error ?? null,
        s3_id: String(o.s3_id ?? ""),
        title: String(o.title ?? ""),
        image_url: String(o.image_url ?? "")
      }
    };
  }
  async initializeAudioClip(t, n) {
    const r = n ? this.getApiKey(n) : this.apiKey,
      a = await this.request(`/suno/uploads/audio/${t}/initialize-clip`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${r}`
        },
        body: JSON.stringify({})
      }, n);
    if (!a.success) return {
      success: !1,
      error: a.error
    };
    const i = a.data,
      o = i && typeof i == "object" && i.data && typeof i.data == "object" ? i.data : i,
      s = (o == null ? void 0 : o.clip_id) || (o == null ? void 0 : o.clipId) || (o == null ? void 0 : o.id);
    return s ? {
      success: !0,
      data: {
        clip_id: String(s)
      }
    } : {
      success: !1,
      error: `无法解析 clip_id: ${JSON.stringify(i).slice(0, 200)}`
    };
  }
  async generateLyrics(t, n) {
    const r = n ? this.getApiKey(n) : this.apiKey;
    return this.request("/suno/submit/lyrics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${r}`
      },
      body: JSON.stringify({
        prompt: t
      })
    }, n);
  }
  async extendMusic(t) {
    const n = f7(t.model),
      r = this.getBaseUrl(n),
      a = this.getApiKey(n),
      i = !!t.make_instrumental,
      o = t.continue_clip_id;
    if (!o) return {
      success: !1,
      error: "续写需要 audioId（continue_clip_id）"
    };
    const s = YH(r);
    let l, d;
    if (s) {
      const m = tQ(n),
        f = t.defaultParamFlag !== !1;
      d = "/api/v1/generate/extend", l = {
        defaultParamFlag: f,
        audioId: o,
        model: m,
        callBackUrl: t.callBackUrl || wRe,
        instrumental: i
      }, f && (l.continueAt = t.continue_at, l.style = t.tags || "", l.title = t.title || "", i || (l.prompt = t.prompt || ""));
    } else d = "/suno/submit/music", l = {
      prompt: i ? "" : t.prompt || "",
      mv: t.mv || xRe(n),
      title: t.title || "",
      tags: t.tags || "",
      continue_at: t.continue_at,
      continue_clip_id: o,
      task: "extend",
      make_instrumental: i
    };
    const u = await this.request(d, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${a}`
      },
      body: JSON.stringify(l)
    }, n);
    if (!u.success) return {
      success: !1,
      error: u.error || "续写请求失败"
    };
    const h = u.data;
    if (h && typeof h == "object" && typeof h.code == "number" && h.code !== 200) return {
      success: !1,
      error: h.msg || h.message || `API 错误 code=${h.code}`
    };
    if (h && typeof h == "object" && "data" in h) {
      const m = h.data;
      if (typeof m == "string") return {
        success: !0,
        data: {
          task_id: m
        }
      };
      if (m && typeof m == "object") {
        const f = m.taskId || m.task_id || m.id;
        if (f) return {
          success: !0,
          data: {
            task_id: String(f)
          }
        };
      }
    }
    if (typeof h == "string") return {
      success: !0,
      data: {
        task_id: h
      }
    };
    const p = (h == null ? void 0 : h.task_id) || (h == null ? void 0 : h.taskId) || (h == null ? void 0 : h.id);
    return p ? {
      success: !0,
      data: {
        task_id: String(p)
      }
    } : {
      success: !1,
      error: "无法解析续写任务 ID"
    };
  }
  async coverMusic(t) {
    const n = f7(t.model),
      r = this.getBaseUrl(n),
      a = this.getApiKey(n),
      i = !!(t.make_instrumental ?? t.instrumental),
      o = !!t.customMode,
      s = String(t.cover_clip_id || "").trim(),
      l = String(t.uploadUrl || "").trim(),
      d = String(t.prompt || ""),
      u = String(t.style || t.tags || ""),
      h = String(t.title || ""),
      p = YH(r);
    let m, f;
    if (p) {
      if (!l || !/^https:\/\//i.test(l)) return {
        success: !1,
        error: "官方翻唱需要公网 HTTPS 音频地址（uploadUrl）。请连接可访问的 https 音频，或开启全局 OSS 后重新上传参考音频。"
      };
      if (f = "/api/v1/generate/upload-cover", m = {
        uploadUrl: l,
        customMode: o,
        instrumental: i,
        model: tQ(n),
        callBackUrl: t.callBackUrl || wRe
      }, o) {
        i || (m.prompt = d), m.style = u, m.title = h;
        const _ = _cn(t.duration);
        _ !== void 0 && (m.duration = _);
      } else m.prompt = d;
    } else {
      if (!s) return {
        success: !1,
        error: "翻唱缺少 cover_clip_id（请先上传参考音频）"
      };
      f = "/suno/generate";
      const _ = xRe(n);
      o ? m = {
        task: "cover",
        cover_clip_id: s,
        prompt: i ? "" : d,
        tags: u,
        title: h,
        mv: _,
        make_instrumental: i
      } : m = {
        task: "cover",
        cover_clip_id: s,
        gpt_description_prompt: d,
        prompt: "",
        mv: _,
        make_instrumental: i
      };
    }
    console.log("[API] Cover Music Request:", JSON.stringify(m, null, 2));
    const y = await this.request(f, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${a}`
      },
      body: JSON.stringify(m)
    }, n);
    if (!y.success) return {
      success: !1,
      error: y.error || "翻唱请求失败"
    };
    const b = y.data;
    if (b && typeof b == "object" && typeof b.code == "number" && b.code !== 200) return {
      success: !1,
      error: b.msg || b.message || `API 错误 code=${b.code}`
    };
    if (b && typeof b == "object" && "data" in b) {
      const _ = b.data;
      if (typeof _ == "string") return {
        success: !0,
        data: {
          task_id: _
        }
      };
      if (_ && typeof _ == "object") {
        const w = _.taskId || _.task_id || _.id;
        if (w) return {
          success: !0,
          data: {
            task_id: String(w)
          }
        };
      }
    }
    if (typeof b == "string") return {
      success: !0,
      data: {
        task_id: b
      }
    };
    const v = (b == null ? void 0 : b.task_id) || (b == null ? void 0 : b.taskId) || (b == null ? void 0 : b.id);
    return v ? {
      success: !0,
      data: {
        task_id: String(v)
      }
    } : {
      success: !1,
      error: "无法解析翻唱任务 ID"
    };
  }
  async splitMusic(t) {
    const n = f7(t.model);
    this.getBaseUrl(n);
    const r = this.getApiKey(n),
      a = {
        task: t.task,
        generation_type: t.generation_type,
        title: t.title,
        mv: t.mv,
        prompt: t.prompt,
        make_instrumental: t.make_instrumental,
        continue_clip_id: t.continue_clip_id,
        continued_aligned_prompt: t.continued_aligned_prompt,
        continue_at: t.continue_at,
        stem_type_id: t.stem_type_id,
        stem_type_group_name: t.stem_type_group_name,
        stem_task: t.stem_task
      },
      i = await this.request("/suno/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${r}`
        },
        body: JSON.stringify(a)
      }, n);
    if (i.success && i.data) {
      const o = i.data;
      if (typeof o == "object" && Array.isArray(o.clips)) {
        const s = o.clips,
          l = s.map(d => d.id).filter(d => d);
        if (l.length > 0) return {
          success: !0,
          data: {
            task_id: "",
            clip_ids: l,
            clips: s
          }
        };
      }
      if (typeof o == "object" && "data" in o) {
        const s = o.data;
        if (Array.isArray(s)) return {
          success: !0,
          data: {
            task_id: "",
            clip_ids: s
          }
        };
        if (typeof s == "string") return {
          success: !0,
          data: {
            task_id: s
          }
        };
      }
      if (typeof o == "string") return {
        success: !0,
        data: {
          task_id: o
        }
      };
      if (Array.isArray(o)) return {
        success: !0,
        data: {
          task_id: "",
          clip_ids: o
        }
      };
      if (typeof o == "object") {
        const s = o.task_id || o.taskId || o.id,
          l = o.clip_ids || o.clipIds || o.ids;
        if (s) return {
          success: !0,
          data: {
            task_id: String(s)
          }
        };
        if (Array.isArray(l) && l.length > 0) return {
          success: !0,
          data: {
            task_id: "",
            clip_ids: l
          }
        };
      }
    }
    return {
      success: !1,
      error: `无法解析声曲分离 API 响应: ${JSON.stringify(i.data).substring(0, 200)}...`
    };
  }
  async getMusicTiming(t, n) {
    const r = n ? this.getApiKey(n) : this.apiKey;
    return this.request(`/suno/act/timing/${t}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${r}`
      }
    }, n);
  }
  async testConnection(t) {
    try {
      return (await this.request("/v1/models", {
        method: "GET"
      }, t)).success;
    } catch {
      return !1;
    }
  }
}

const _1 = new __i();

function Hke(e) {
  return typeof e.generationEffect == "function";
}

function j7(e, t, n) {
  var r;
  return ((r = e.generationEffect) == null ? void 0 : r.call(e, t, n)) ?? !1;
}

function kJe(e, t) {
  return Hke(e) ? e : (n, r, a) => {
    t() && e(n, r, a);
  };
}

function k_i(e, t, n) {
  return Hke(e) ? {
    updateNode: e,
    setNodes: t
  } : {
    updateNode: kJe(e, n),
    setNodes: AJe(t, n)
  };
}

function yje(e, t, n) {
  var a, i;
  const r = (a = e.getIndex) == null ? void 0 : a.call(e, n);
  return r != null && ((i = t[r]) == null ? void 0 : i.id) === n ? r : t.findIndex(o => o.id === n);
}

function AJe(e, t) {
  return r => {
    if (t()) return e(a => t(a) ? typeof r == "function" ? r(a) : r : a);
  };
}

function A_i(e, t) {
  const n = AJe(e, () => t()),
    r = Object.assign((a, i, o) => {
      n(s => s.map(l => l.id !== a || o && !o(l) ? l : LBt(l, i)));
    }, {
      generationEffect(a, i) {
        return t() ? (i(), !0) : !1;
      }
    });
  return {
    setNodes: n,
    updateNode: r,
    isCurrent: t
  };
}

function KO(e, t) {
  const n = t == null ? void 0 : t.lease();
  return A_i(e, () => !n || n.isCurrent());
}

function S_i(e, t) {
  const n = String(t || "");
  return n ? [...new Set(e.filter(r => r.from === n).map(r => r.to))] : [];
}

function pdr(e) {
  const {
    updateNode: t,
    videoUrl: n,
    sourceNodeId: r,
    previewNodeIds: a,
    previewSourceModel: i
  } = e;
  if (!(!t || !n)) {
    for (const o of a ?? []) j7(t, o, () => t(o, {
      isGenerating: !1,
      content: n,
      previewType: "video",
      ...(i ? {
        settings: {
          previewSourceModel: i
        }
      } : {})
    }, s => s.type === "preview"));
    r && j7(t, r, () => t(r, {
      isGenerating: !1,
      content: n,
      errorMsg: void 0,
      settings: {
        isGenerating: !1,
        progress: 100,
        error: null,
        ...(i ? {
          previewSourceModel: i
        } : {})
      }
    }));
  }
}

function mdr(e, t) {
  if (!(typeof window > "u")) try {
    window.dispatchEvent(new CustomEvent(e, {
      detail: e === "previewGenerateFailed" ? {
        previewNodeId: t
      } : {
        targetPreviewId: t
      }
    }));
  } catch {}
}

function el(e, t, n) {
  j7(e, t, () => hu(t, n));
}

function rz(e, t, n) {
  j7(e, t, () => mdr(n, t));
}

function dkt(e, t) {
  const n = String(t || "").trim();
  n && rz(e, n, "previewGenerateFailed");
}

function Wke(e, t, n) {
  const r = String(t || "").trim();
  r && (e && !e.isCurrent() || mdr(n, r));
}

const I_i = Object.freeze(Object.defineProperty({
    __proto__: null,
    dispatchGenerationPreviewEvent: rz,
    notifyPreviewEventForLease: Wke,
    notifyPreviewGenerateFailed: dkt,
    setGenerationNodeVisual: el
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  HD = "https://www.runninghub.cn",
  WD = "https://www.runninghub.ai";

function fdr(e, t, n) {
  const r = String(t || "").trim();
  let a = "";
  try {
    const o = JSON.parse(r),
      s = o.detail;
    typeof s == "object" && s && (a = String(s.message || "").trim()), a || (a = String(o.msg || o.message || o.error || "").trim());
  } catch {
    a = r.slice(0, 400);
  }
  const i = a ? `：${a}` : "";
  return new Error(`${n}（HTTP ${e}）${i}`);
}

async function C_i(e) {
  const {
      apiKey: t,
      webappId: n,
      useOverseas: r = !1
    } = e,
    i = `${r ? WD : HD}/api/webapp/apiCallDemo?apiKey=${encodeURIComponent(t)}&webappId=${encodeURIComponent(n)}`,
    o = await fetch(i, {
      method: "GET",
      headers: {
        Host: r ? "www.runninghub.ai" : "www.runninghub.cn",
        Accept: "application/json"
      }
    });
  if (!o.ok) throw new Error(`请求失败: ${o.status} ${o.statusText}`);
  return await o.json();
}

async function gdr(e) {
  var u;
  const {
      apiKey: t,
      file: n,
      useOverseas: r = !1
    } = e,
    a = r ? WD : HD,
    i = new FormData();
  i.append("file", n);
  const o = await fetch(`${a}/openapi/v2/media/upload/binary`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${t}`
    },
    body: i
  });
  if (!o.ok) throw new Error(`上传失败: ${o.status} ${o.statusText}`);
  const s = await o.json(),
    l = s.msg || s.message || "上传失败";
  if (s.code !== 0) throw new Error(l);
  if (!((u = s.data) != null && u.fileName)) throw new Error("上传返回格式异常，缺少 fileName");
  return {
    fileName: s.data.fileName,
    previewUrl: s.data.download_url
  };
}

async function ydr(e) {
  var d;
  const {
      apiKey: t,
      file: n,
      useOverseas: r = !1
    } = e,
    a = r ? WD : HD,
    i = r ? "www.runninghub.ai" : "www.runninghub.cn",
    o = new FormData();
  o.append("apiKey", t), o.append("fileType", "input"), o.append("file", n);
  const s = await fetch(`${a}/task/openapi/upload`, {
    method: "POST",
    headers: {
      Host: i
    },
    body: o
  });
  if (!s.ok) throw new Error(`上传失败: ${s.status} ${s.statusText}`);
  const l = await s.json();
  if (l.code !== 0) throw new Error(l.msg || "上传失败");
  if (!((d = l.data) != null && d.fileName)) throw new Error("上传返回格式异常");
  return {
    fileName: l.data.fileName,
    previewUrl: l.data.download_url
  };
}

async function bdr(e) {
  try {
    return (await gdr(e)).fileName;
  } catch (t) {
    try {
      return (await ydr(e)).fileName;
    } catch {
      throw t;
    }
  }
}

async function vdr(e) {
  try {
    return await gdr(e);
  } catch (t) {
    try {
      return await ydr(e);
    } catch {
      throw t;
    }
  }
}

async function E_i(e) {
  var u;
  const {
      apiKey: t,
      webappId: n,
      nodeInfoList: r,
      useOverseas: a = !1,
      instanceType: i
    } = e,
    o = a ? WD : HD,
    s = a ? "www.runninghub.ai" : "www.runninghub.cn",
    l = await fetch(`${o}/task/openapi/ai-app/run`, {
      method: "POST",
      headers: {
        Host: s,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        apiKey: t,
        webappId: n,
        nodeInfoList: r,
        ...(i ? {
          instanceType: i
        } : {})
      })
    });
  if (!l.ok) throw new Error(`提交任务失败: ${l.status} ${l.statusText}`);
  const d = await l.json();
  if (d.code !== 0) throw new Error(d.msg || "提交任务失败");
  if (!((u = d.data) != null && u.taskId)) throw new Error("返回格式异常，缺少 taskId");
  return {
    taskId: String(d.data.taskId),
    promptTips: d.data.promptTips
  };
}

async function wdr(e) {
  const {
      apiKey: t,
      taskId: n,
      useOverseas: r = !1
    } = e,
    a = r ? WD : HD,
    i = r ? "www.runninghub.ai" : "www.runninghub.cn",
    o = await fetch(`${a}/task/openapi/outputs`, {
      method: "POST",
      headers: {
        Host: i,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        apiKey: t,
        taskId: n
      })
    });
  if (!o.ok) throw new Error(`查询失败: ${o.status} ${o.statusText}`);
  return o.json();
}

async function T_i(e) {
  const {
      apiKey: t,
      workflowId: n,
      useOverseas: r = !1
    } = e,
    a = r ? WD : HD,
    i = r ? "www.runninghub.ai" : "www.runninghub.cn",
    o = await fetch(`${a}/api/openapi/getJsonApiFormat`, {
      method: "POST",
      headers: {
        Host: i,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        apiKey: t,
        workflowId: n
      })
    }),
    s = await o.text();
  if (!o.ok) throw fdr(o.status, s, "获取工作流失败");
  try {
    return JSON.parse(s);
  } catch {
    throw new Error(`获取工作流失败：返回不是 JSON（${s.slice(0, 200)}）`);
  }
}

async function M_i(e) {
  var _;
  const {
      apiKey: t,
      workflowId: n,
      nodeInfoList: r,
      workflow: a,
      addMetadata: i = !0,
      webhookUrl: o,
      instanceType: s,
      usePersonalQueue: l = !1,
      useOverseas: d = !1
    } = e,
    u = d ? WD : HD,
    h = d ? "www.runninghub.ai" : "www.runninghub.cn",
    p = s ?? "plus",
    m = p === "default" || p === "standard",
    f = {
      apiKey: t,
      workflowId: n,
      addMetadata: i
    };
  r && r.length > 0 && (f.nodeInfoList = r), a && (f.workflow = a), o && (f.webhookUrl = o), !m && p && (f.instanceType = p), l && (f.usePersonalQueue = l);
  const y = await fetch(`${u}/task/openapi/create`, {
      method: "POST",
      headers: {
        Host: h,
        "Content-Type": "application/json"
      },
      body: await Pg(f)
    }),
    b = await y.text();
  if (!y.ok) throw fdr(y.status, b, "提交任务失败");
  let v;
  try {
    v = JSON.parse(b);
  } catch {
    throw new Error(`提交任务失败：返回不是 JSON（${b.slice(0, 200)}）`);
  }
  if (v.code !== 0) throw new Error(v.msg || `提交任务失败（code ${v.code}）`);
  if (!((_ = v.data) != null && _.taskId)) throw new Error(v.msg || "RunningHub 未返回 taskId");
  return {
    taskId: String(v.data.taskId),
    promptTips: v.data.promptTips
  };
}

async function P_i(e) {
  const {
      apiKey: t,
      taskId: n,
      useOverseas: r = !1
    } = e,
    a = r ? WD : HD,
    i = r ? "www.runninghub.ai" : "www.runninghub.cn",
    o = await fetch(`${a}/task/openapi/cancel`, {
      method: "POST",
      headers: {
        Host: i,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        apiKey: t,
        taskId: n
      })
    });
  if (!o.ok) throw new Error(`取消任务失败: ${o.status} ${o.statusText}`);
  return o.json();
}

async function xdr(e) {
  const {
      apiKey: t,
      taskId: n,
      useOverseas: r = !1
    } = e,
    a = r ? WD : HD,
    i = r ? "www.runninghub.ai" : "www.runninghub.cn",
    o = await fetch(`${a}/task/openapi/status`, {
      method: "POST",
      headers: {
        Host: i,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        apiKey: t,
        taskId: n
      })
    });
  if (!o.ok) throw new Error(`查询状态失败: ${o.status} ${o.statusText}`);
  return o.json();
}

const jUe = "RunningHub 标记任务成功，但未返回任何图片/视频链接（results 为空）。请检查：① 工作流是否有 Save Image（或视频保存）且输出会被 API 采集；② 提示词节点是否为空（如 CLIP Text Encode 的 text）；③ 参考图是否已上传/连线并成功写入 nodeInfo；④ 到 RH 网页该任务详情查看「生成结果」与 node_errors。";

function _dr(e) {
  if (!e) return [];
  if (Array.isArray(e)) {
    const t = [];
    for (const n of e) {
      if (!n || typeof n != "object") continue;
      const r = n,
        a = r.fileUrl || r.file_url || r.url;
      a && typeof a == "string" && t.push({
        fileUrl: a,
        fileType: typeof r.fileType == "string" ? r.fileType : void 0
      });
    }
    return t;
  }
  if (typeof e == "object" && e !== null && "results" in e) {
    const t = e.results;
    if (!Array.isArray(t)) return [];
    const n = [];
    for (const r of t) if (typeof r == "string" && /^https?:\/\//i.test(r)) n.push({
      fileUrl: r
    });else if (r && typeof r == "object") {
      const a = r,
        i = a.fileUrl || a.file_url || a.url;
      i && typeof i == "string" && n.push({
        fileUrl: i,
        fileType: typeof a.fileType == "string" ? a.fileType : void 0
      });
    }
    return n;
  }
  return [];
}

function R_i(e) {
  return e == null ? "" : typeof e == "string" ? e.trim().toUpperCase() : typeof e == "object" && "status" in e ? String(e.status ?? "").trim().toUpperCase() : "";
}

async function kdr(e) {
  const {
      apiKey: t,
      taskId: n,
      useOverseas: r = !1,
      pollInterval: a = 5e3,
      timeout: i = 27e5,
      onProgress: o,
      signal: s
    } = e,
    l = Date.now();
  for (;;) {
    if (s != null && s.aborted) return {
      success: !1,
      error: "已取消"
    };
    const d = await wdr({
      apiKey: t,
      taskId: n,
      useOverseas: r
    });
    if (d.code === 805) {
      const h = d.failedReason;
      return {
        success: !1,
        error: (h == null ? void 0 : h.exception_message) || d.msg || "任务失败"
      };
    }
    const u = _dr(d.data);
    if (d.code === 0 && u.length > 0) return {
      success: !0,
      fileUrls: u.map(p => p.fileUrl).filter(Boolean),
      outputItems: u
    };
    if (d.code === 0 && u.length === 0) try {
      const h = await xdr({
        apiKey: t,
        taskId: n,
        useOverseas: r
      });
      if (h.code === 0) {
        const p = R_i(h.data);
        if (p === "SUCCESS" || p === "SUCCEEDED" || p === "COMPLETED" || p === "DONE" || p === "FINISHED") return {
          success: !1,
          error: jUe
        };
      }
    } catch {}
    if (d.code === 804 ? o == null || o("running") : d.code === 813 && (o == null || o("queued")), Date.now() - l > i) return {
      success: !1,
      error: "等待超时"
    };
    await new Promise(h => setTimeout(h, a));
  }
}

const rst = new Set(),
  bje = new Set();

let kcn = !1;

const N_i = 512,
  eV = new Map();

function j_i(e, t) {
  const n = String(e || "").trim();
  if (!n) return;
  const r = eV.get(n);
  r && (x0(r), eV.delete(n));
  const a = String(t || "").trim();
  if (a.startsWith("blob:") && (eV.set(n, a), eV.size > N_i)) {
    const i = eV.keys().next().value;
    if (i) {
      const o = eV.get(i);
      eV.delete(i), o && x0(o);
    }
  }
}

function D_i() {
  kcn || typeof window > "u" || (window.addEventListener("cancelPolling", e => {
    var n;
    const t = (n = e == null ? void 0 : e.detail) == null ? void 0 : n.taskId;
    t && bje.add(String(t));
  }), kcn = !0);
}

function L_i(e) {
  return new Promise(t => setTimeout(t, e));
}

function ast(e, t) {
  if (!t || !e.provider) return !1;
  const n = ZOe(t);
  return e.provider === t || ZOe(e.provider) === n;
}

function O_i(e, t) {
  var o, s, l, d;
  const n = String(((o = e.apiConfig) == null ? void 0 : o.modelId) || e.modelName || "").trim(),
    r = WM(n) || /enhance-video|(?:虎牙|海艺)视频放大|(?:虎牙|海艺)\s*\/\s*enhance-video/i.test(`${((s = e.apiConfig) == null ? void 0 : s.modelId) || ""} ${e.modelName || ""} ${e.prompt || ""}`);
  let a = t.find(u => u.id === n) || t.find(u => ast(u, n)) || (e.modelName ? t.find(u => ast(u, e.modelName)) : void 0);
  if (!a && r && (a = t.find(u => WM(u.id))), !a && ((l = e.apiConfig) != null && l.baseUrl) && Ace(e.apiConfig.baseUrl)) {
    const u = String(e.apiConfig.baseUrl);
    (/video-tool/i.test(u) || r) && (a = t.find(h => WM(h.id))), a || (a = t.find(h => fk(h.id)));
  }
  const i = (r ? Sz : "") || (a == null ? void 0 : a.id) || ((d = e.apiConfig) == null ? void 0 : d.modelId) || n || "sora-2";
  return a || (a = t.find(u => u.id === i || ast(u, e.modelName))), {
    modelId: i,
    config: a
  };
}

function B_i(e, t, n) {
  var r;
  return fk(e) || WM(e) || Ace((r = t.apiConfig) == null ? void 0 : r.baseUrl) || Ace(n == null ? void 0 : n.url);
}

async function F_i(e) {
  var f, y, b, v;
  const {
    item: t,
    modelId: n,
    pollUrl: r,
    headers: a,
    setHistory: i,
    setNodes: o,
    connections: s,
    dispatchPreviewGenerateFailed: l,
    singleShot: d = !1
  } = e;
  D_i(), rst.delete(t.id), rst.add(t.id), bje.delete(t.id);
  const u = d ? 1 : p7({
    isVideo: !0,
    isImage2Image: !1,
    isLongVideo: Ih(n) || AZ(n)
  });
  let h = t.progress ?? 0,
    p = 0;
  const m = () => {
    rst.delete(t.id);
  };
  try {
    for (let _ = 0; _ < u; _++) {
      if (bje.has(t.id)) {
        bje.delete(t.id);
        return;
      }
      _ > 0 && (await L_i(ES));
      let w = {},
        k;
      try {
        k = await $i(r, {
          headers: a
        });
        const R = await k.text(),
          j = R.trim().toLowerCase();
        if (j.startsWith("<!") || j.startsWith("<?xml")) throw console.error("[RefreshVideo] Huya 接口返回 HTML 而非 JSON:", R.slice(0, 300)), new Error("接口返回了错误页面（非 JSON），请检查 API 配置");
        try {
          await vb(), w = R ? JSON.parse(R) : {};
        } catch {
          const B = Math.min(Math.max(h, 10 + _ * 2), 90);
          B !== h && (h = B, i(F => F.map(N => N.id === t.id ? {
            ...N,
            status: "generating",
            progress: B
          } : N)));
          continue;
        }
      } catch (R) {
        console.warn("[RefreshVideo] Huya 轮询请求异常，继续重试:", R);
        const j = Math.min(Math.max(h, 10 + _ * 2), 90);
        j !== h && (h = j, i(B => B.map(F => F.id === t.id ? {
          ...F,
          status: "generating",
          progress: j
        } : F)));
        continue;
      }
      if (!k.ok && (k.status === 401 || k.status === 403 || k.status >= 500)) {
        const R = hd(w, `HTTP ${k.status}`);
        console.error("[RefreshVideo] Huya HTTP错误:", k.status, R), l(t), i(j => j.map(B => B.id === t.id ? {
          ...B,
          status: "failed",
          progress: 0,
          errorMsg: R
        } : B));
        return;
      }
      const A = fv(w, !0),
        S = A.status,
        C = A.urls,
        I = E1(w, S);
      if (C.length > 0) {
        const R = C[0],
          j = Date.now(),
          B = t.startTime || j,
          F = ((j - B) / 1e3).toFixed(1),
          {
            tryResolveGenResultForGlobalOss: N,
            buildHistoryItemPatchFromGlobalOss: G,
            pickGenVideoPlaybackUrl: z
          } = await Ie(async () => {
            const {
              tryResolveGenResultForGlobalOss: H,
              buildHistoryItemPatchFromGlobalOss: Y,
              pickGenVideoPlaybackUrl: K
            } = await Promise.resolve().then(() => ii);
            return {
              tryResolveGenResultForGlobalOss: H,
              buildHistoryItemPatchFromGlobalOss: Y,
              pickGenVideoPlaybackUrl: K
            };
          }, void 0, import.meta.url),
          {
            isCanvasLocalCacheMode: V
          } = await Ie(async () => {
            const {
              isCanvasLocalCacheMode: H
            } = await Promise.resolve().then(() => So);
            return {
              isCanvasLocalCacheMode: H
            };
          }, void 0, import.meta.url),
          O = await N([R], t.id, !0),
          L = V();
        if (!O) {
          const H = t.model || t.modelName || "";
          Ie(() => Promise.resolve().then(() => No), void 0, import.meta.url).then(async ({
            downloadUrlToLocal: Y
          }) => {
            const {
              buildLocalGenVideoCacheFileName: K
            } = await Ie(async () => {
              const {
                buildLocalGenVideoCacheFileName: W
              } = await Promise.resolve().then(() => rYe);
              return {
                buildLocalGenVideoCacheFileName: W
              };
            }, void 0, import.meta.url);
            Y(R, t.id, K(t.id, H)).catch(() => {});
          }), oy({
            url: R,
            type: "video"
          }, t.id).catch(() => {});
        }
        let D = "";
        if (O) D = z(O, R, null);else if (L) try {
          const {
            assetStore: H
          } = await Ie(async () => {
            const {
              assetStore: Y
            } = await Promise.resolve().then(() => Ri);
            return {
              assetStore: Y
            };
          }, void 0, import.meta.url);
          await H.init();
          for (let Y = 0; Y < 30; Y++) {
            try {
              const W = await H.getAssetUrl(t.id),
                {
                  isRemoteHttpUrl: Q
                } = await Ie(async () => {
                  const {
                    isRemoteHttpUrl: q
                  } = await Promise.resolve().then(() => So);
                  return {
                    isRemoteHttpUrl: q
                  };
                }, void 0, import.meta.url);
              if (W && !Q(W)) {
                D = W;
                break;
              }
            } catch {}
            const K = await H.getAssetBlob(t.id);
            if (K != null && K.size) {
              D = URL.createObjectURL(K);
              break;
            }
            await new Promise(W => setTimeout(W, 200));
          }
        } catch {} else {
          let H = null;
          try {
            const {
              assetStore: Y
            } = await Ie(async () => {
              const {
                assetStore: K
              } = await Promise.resolve().then(() => Ri);
              return {
                assetStore: K
              };
            }, void 0, import.meta.url);
            await Y.init(), H = await Y.getAssetUrl(t.id);
          } catch {}
          D = z(null, R, H);
        }
        j_i(t.id, D), i(H => H.map(Y => Y.id === t.id ? {
          ...Y,
          status: "completed",
          progress: 100,
          generationTime: `${F}s`,
          durationMs: j - B,
          _assetId: O ? void 0 : t.id,
          errorMsg: void 0,
          ...(O ? G(O, {
            type: "video"
          }) : D ? {
            url: D
          } : {})
        } : Y));
        const U = t.sourceNodeId;
        if (U) {
          const {
              pickOssVideoImagePosterUrl: H
            } = await Ie(async () => {
              const {
                pickOssVideoImagePosterUrl: Q
              } = await Promise.resolve().then(() => ii);
              return {
                pickOssVideoImagePosterUrl: Q
              };
            }, void 0, import.meta.url),
            Y = O ? H((f = O.displayUrls) == null ? void 0 : f[0], (y = O.ossSettings) == null ? void 0 : y._ossThumbnailUrl, (v = (b = O.generatedImages) == null ? void 0 : b[0]) == null ? void 0 : v.thumbUrl) : "",
            K = typeof (O == null ? void 0 : O.imageWidth) == "number" && typeof (O == null ? void 0 : O.imageHeight) == "number" && O.imageWidth > 0 && O.imageHeight > 0 ? `${O.imageWidth}×${O.imageHeight}` : void 0,
            W = Y || (O ? "" : D);
          o(Q => Q.map(q => {
            var ne;
            return q.id === U ? {
              ...q,
              isGenerating: !1,
              content: W,
              ...(Y ? {
                videoPosterUrl: Y
              } : O ? {
                videoPosterUrl: void 0
              } : {}),
              errorMsg: void 0,
              _contentAssetId: O ? void 0 : t.id,
              settings: {
                ...q.settings,
                isGenerating: !1,
                progress: 100,
                error: null,
                ...((O == null ? void 0 : O.ossSettings) || {}),
                ...((ne = O == null ? void 0 : O.generatedImages) != null && ne.length ? {
                  generatedImages: O.generatedImages
                } : {}),
                ...(Y ? {
                  videoPosterUrl: Y
                } : {}),
                ...(K ? {
                  previewActualSize: K,
                  previewSize: K
                } : {}),
                ...(L && !O ? {
                  _pendingRemoteResultUrl: D ? void 0 : R,
                  _assetId: t.id,
                  _localCacheAssetId: t.id,
                  _contentAssetId: t.id
                } : {})
              }
            } : D && q.type === "preview" && s.some(de => de.from === U && de.to === q.id) ? {
              ...q,
              content: D,
              previewType: "video",
              settings: {
                ...q.settings,
                previewSourceModel: n
              }
            } : q;
          }));
        }
        return;
      }
      if (I) {
        let R = hd(w, S || "任务失败");
        (Ip(n) || Ih(n)) && (Nke(R) ? R = `${R}

素材报备未完成，请保持「真人素材」开启并等待 1～2 分钟后重试。` : bBt(R) && (R = `${R}

参考图含真人脸：请勾选「真人素材」(isUploadAsset:true)，参考图仍须为 OSS 公网 https URL。`)), l(t), i(j => j.map(B => B.id === t.id ? {
          ...B,
          status: "failed",
          progress: 0,
          errorMsg: R
        } : B));
        return;
      }
      if (Kj(S)) {
        if (p += 1, p >= 24) {
          const R = hd(w, "任务已成功但未返回结果 URL，请稍后在虎牙后台查看或重试");
          l(t), i(j => j.map(B => B.id === t.id ? {
            ...B,
            status: "failed",
            progress: 0,
            errorMsg: R
          } : B));
          return;
        }
      } else p = 0;
      const E = eP(w, _),
        T = typeof w.progress == "number" || w.data && typeof w.data == "object" && typeof w.data.progress == "number" ? E : Kj(S) ? 90 : Math.min(10 + _ * 2, 90),
        P = Math.max(h, T);
      P !== h && (h = P, i(R => R.map(j => j.id === t.id ? {
        ...j,
        status: "generating",
        progress: P,
        errorMsg: void 0
      } : j))), (_ === 0 || _ % 12 === 0) && console.log("[RefreshVideo] Huya 轮询中:", {
        taskId: t.remoteTaskId,
        attempt: _,
        huyaStatus: S,
        progress: P
      });
    }
    d || (l(t), i(_ => _.map(w => w.id === t.id ? {
      ...w,
      status: "failed",
      progress: 0,
      errorMsg: "虎牙 视频任务查询超时，请稍后重试"
    } : w)));
  } finally {
    m();
  }
}

function z_i({
  apiConfigs: e,
  globalApiKey: t,
  setHistory: n,
  setNodes: r,
  connections: a,
  documentSession: i
}) {
  const o = g.useCallback(v => {
      q2i(r, v, Q2i(v));
    }, [r]),
    s = g.useCallback(v => {
      ddr(n, v, K2i(v));
    }, [n]),
    l = v => String(v || "").replace(/^\/+/, "").split("/").map(_ => encodeURIComponent(_)).join("/"),
    d = g.useCallback(async v => {
      var T, P, R, j, B, F, N, G, z, V, O, L, D, U, H, Y;
      const {
          setNodes: _,
          updateNode: w
        } = KO(o, i),
        k = K => {
          dkt(w, K.targetPreviewId);
        };
      if ((P = (T = v.apiConfig) == null ? void 0 : T.modelId) != null && P.startsWith("jimeng-cli-") && v.remoteTaskId) {
        try {
          const {
            refreshJimengCliHistory: K
          } = await Ie(async () => {
            const {
              refreshJimengCliHistory: W
            } = await Promise.resolve().then(() => vUt);
            return {
              refreshJimengCliHistory: W
            };
          }, void 0, import.meta.url);
          await K(v, s, _, a);
        } catch (K) {
          alert(K instanceof Error ? x(K.message) : x(String(K)));
        }
        return;
      }
      if (!v.remoteTaskId) {
        alert(x(`无法刷新：缺少任务ID（remoteTaskId）

该历史记录可能是旧版本生成的，请重新生成视频。`));
        return;
      }
      const {
          modelId: A,
          config: S
        } = O_i(v, e),
        C = (R = v.apiConfig) == null ? void 0 : R.customProtocol;
      FS(A) && (await ace());
      const I = dft(A, ((j = v.apiConfig) == null ? void 0 : j.baseUrl) || (S == null ? void 0 : S.url) || Bne).replace(/\/+$/, ""),
        E = ((B = v.apiConfig) == null ? void 0 : B.apiKey) || cu(S == null ? void 0 : S.key, t, void 0, {
          modelId: A,
          modelName: (S == null ? void 0 : S.modelName) || A,
          baseUrl: I
        });
      if (!E && (C == null ? void 0 : C.auth) !== "none") {
        alert(x("无法刷新：缺少API Key"));
        return;
      }
      const M = B_i(A, v, S);
      console.log("[RefreshVideo] Config:", {
        modelId: A,
        modelName: v.modelName,
        effectiveBaseUrl: I,
        hasKey: !!E,
        taskId: v.remoteTaskId,
        isHuyaVolcVideoModel: M
      }), s(K => K.map(W => W.id === v.id ? {
        ...W,
        status: "generating",
        progress: M ? W.progress ?? 0 : 0
      } : W));
      try {
        let K;
        const W = C ? wxe(C, I, E, v.remoteTaskId) : void 0;
        if (W) K = W.url;else if (U5(A)) {
          const _e = v.mjMode || "fast";
          K = `${I}/${_e}/mj/task/${encodeURIComponent(v.remoteTaskId)}/fetch`, console.log("[RefreshVideo] MJ Video 查询 URL:", K);
        } else if (zv(A)) K = `${I}/kling/v1/videos/omni-video/${encodeURIComponent(v.remoteTaskId)}`;else if (v.klingTaskType === "motion-control") K = `${I}/kling/v1/videos/motion-control/${encodeURIComponent(v.remoteTaskId)}`;else if (Lk(A) || O2(A) || jv(A)) {
          const _e = v.klingTaskType === "image2video" ? "image2video" : "text2video";
          K = `${I}/kling/v1/videos/${_e}/${encodeURIComponent(v.remoteTaskId)}`;
        } else if (Dv(A)) K = `${I}/v1beta/${l(v.remoteTaskId)}`;else if (Ex(A) || PE(A)) K = `${I}/v2/videos/generations/${encodeURIComponent(v.remoteTaskId)}`;else if (ag(A)) K = w8t(I, String(v.remoteTaskId), {
          openAiCompat: v8t(Yjn(void 0, S == null ? void 0 : S.modelName))
        });else if (Tb(A)) K = `${I}${xce(A)}/${encodeURIComponent(v.remoteTaskId)}`;else if (gX(A)) K = `${I}/api/v1/tasks/${encodeURIComponent(v.remoteTaskId)}`, console.log("[RefreshVideo] Wan 2.6 Official 查询 URL:", K);else if (Y1(A)) K = `${I}/v2/videos/generations/${encodeURIComponent(v.remoteTaskId)}`, console.log("[RefreshVideo] Wan 2.6 查询 URL:", K);else if (bx(A)) K = `${I}/minimax/v1/query/video_generation?task_id=${encodeURIComponent(v.remoteTaskId)}`;else if (_b(A)) K = `${I}/vidu/ent/v2/tasks/${encodeURIComponent(v.remoteTaskId)}/creations`;else if (M) {
          const _e = b3(WM(A) ? Mqe(I) : s9(I, A));
          K = gk(_e, String(v.remoteTaskId)), console.log("[RefreshVideo] Huya 视频查询 URL:", K);
        } else Cu(A) ? K = `${I.replace(/\/+$/, "")}/v2/query/video_generation/${encodeURIComponent(v.remoteTaskId)}` : Dk(A) || Fv(A) || X2(A) ? K = `${I}/v1/videos/${encodeURIComponent(v.remoteTaskId)}` : (A.includes("sora") || String(v.modelName || "").toLowerCase().includes("sora")) && !wy(A) ? (K = I.includes("api.openai.com") ? `${I}/videos/${encodeURIComponent(v.remoteTaskId)}` : `${I}/v2/videos/generations/${encodeURIComponent(v.remoteTaskId)}`, console.log("[RefreshVideo] Sora 查询 URL:", K)) : K = `${I}/v1/videos/${encodeURIComponent(v.remoteTaskId)}`;
        const Q = Dv(A) || K.includes("generativelanguage.googleapis.com"),
          q = _b(A) ? "Token" : "Bearer",
          de = Dv(A) && K.includes("generativelanguage.googleapis.com") ? {
            "x-goog-api-key": E
          } : {
            Authorization: `${q} ${E}`
          };
        if (ag(A) && !oce(K) && (de.debug_accept_unset_ratio_model = "true"), M) {
          const _e = v.status === "generating";
          await F_i({
            item: v,
            modelId: A,
            pollUrl: K,
            headers: de,
            setHistory: s,
            setNodes: _,
            connections: a,
            dispatchPreviewGenerateFailed: k,
            singleShot: _e
          });
          return;
        }
        const le = W ? await $i(W.url, W.options) : _b(A) || Q ? await $i(K, {
            headers: de
          }) : await fetch(K, {
            headers: de
          }),
          J = await le.text(),
          pe = J.trim().toLowerCase();
        if (pe.startsWith("<!") || pe.startsWith("<?xml")) throw console.error("[RefreshVideo] 接口返回了 HTML 而非 JSON:", J.slice(0, 300)), new Error("接口返回了错误页面（非 JSON），请检查 API 配置");
        let ce = {};
        try {
          await vb(), ce = J ? JSON.parse(J) : {};
        } catch {
          throw console.error("[RefreshVideo] JSON 解析失败:", J.slice(0, 300)), new Error("接口返回格式异常，无法解析为 JSON");
        }
        if (!le.ok) throw console.error("[RefreshVideo] HTTP错误:", le.status, J.slice(0, 500)), new Error(`HTTP ${le.status}: ${J.slice(0, 200)}`);
        if (C && (ce = TF(ce, C, !0)), zv(A)) {
          let _e;
          if (ce.task_status) _e = ce;else if (ce.data && typeof ce.data == "object") {
            const Ne = ce.data;
            Ne.task_status ? _e = Ne : Ne.data && typeof Ne.data == "object" && (_e = Ne.data);
          }
          if (!_e) {
            console.error("[RefreshVideo] Kling O1 无法识别数据格式，rawData:", ce), k(v), s(Ne => Ne.map(me => me.id === v.id ? {
              ...me,
              status: "failed",
              errorMsg: "无法解析响应数据格式"
            } : me));
            return;
          }
          const ke = String(_e.task_status || "").toLowerCase(),
            ve = _e.task_result,
            Te = ve == null ? void 0 : ve.videos;
          if (ke === "succeed" || ke === "success") {
            if (Te && Te.length > 0 && Te[0].url) {
              const Ne = Te[0].url,
                me = Date.now(),
                Ae = v.startTime || me,
                Me = ((me - Ae) / 1e3).toFixed(1),
                Re = new CustomEvent("klingO1VideoComplete", {
                  detail: {
                    taskId: v.id,
                    videoUrl: Ne,
                    generationTime: Me + "s"
                  }
                });
              window.dispatchEvent(Re), s(rt => rt.map(ze => ze.id === v.id ? {
                ...ze,
                status: "completed",
                url: Ne,
                progress: 100,
                generationTime: Me + "s"
              } : ze));
              const $e = v.sourceNodeId;
              pdr({
                taskId: v.id,
                videoUrl: Ne,
                sourceNodeId: $e,
                previewNodeIds: S_i(a, $e),
                previewSourceModel: (F = v.apiConfig) == null ? void 0 : F.modelId,
                updateNode: w
              }), oy({
                url: Ne,
                type: "video"
              }, v.id);
              return;
            } else {
              const Ne = "未返回视频URL";
              console.error("[RefreshVideo] Kling O1 错误:", Ne), console.error("[RefreshVideo] Kling O1 videos:", Te), k(v), s(me => me.map(Ae => Ae.id === v.id ? {
                ...Ae,
                status: "failed",
                errorMsg: Ne
              } : Ae));
              return;
            }
          } else if (ke === "failed" || ke === "failure" || ke === "error") {
            const Ne = String((_e == null ? void 0 : _e.task_status_msg) || (_e == null ? void 0 : _e.message) || "生成失败");
            console.error("[RefreshVideo] Kling O1 生成失败:", Ne), k(v), s(me => me.map(Ae => Ae.id === v.id ? {
              ...Ae,
              status: "failed",
              errorMsg: Ne
            } : Ae));
            return;
          } else if (ke === "processing" || ke === "submitted") {
            console.log("[RefreshVideo] Kling O1 任务进行中, 状态:", ke), s(Ne => Ne.map(me => me.id === v.id ? {
              ...me,
              status: "generating",
              progress: 50
            } : me));
            return;
          } else console.warn("[RefreshVideo] Kling O1 未知状态:", ke), console.warn("[RefreshVideo] Kling O1 将继续执行通用逻辑");
        }
        if (U5(A)) {
          const _e = String(ce.status || "").toUpperCase(),
            ke = ce.progress ? parseInt(String(ce.progress).replace("%", "")) : 0;
          let ve = [];
          if (ce.videoUrls && Array.isArray(ce.videoUrls) ? ve = ce.videoUrls.map(Te => typeof Te == "string" ? Te : Te == null ? void 0 : Te.url).filter(Boolean) : ce.videos && Array.isArray(ce.videos) ? ve = ce.videos.map(Te => typeof Te == "string" ? Te : Te == null ? void 0 : Te.url).filter(Boolean) : ce.videoUrl ? ve = [typeof ce.videoUrl == "string" ? ce.videoUrl : (N = ce.videoUrl) == null ? void 0 : N.url].filter(Boolean) : ce.imageUrl && typeof ce.imageUrl == "string" && ce.imageUrl.includes(".mp4") && (ve = [ce.imageUrl]), console.log("[RefreshVideo] MJ Video 解析结果:", {
            mjStatus: _e,
            mjProgress: ke,
            videoUrls: ve.length,
            firstUrl: (G = ve[0]) == null ? void 0 : G.substring(0, 50)
          }), _e === "SUCCESS" || _e === "COMPLETED" || _e === "FINISHED") {
            if (ve.length > 0) {
              const Te = ve[0];
              console.log("[RefreshVideo] MJ Video 完成，视频数量:", ve.length);
              const Ne = Date.now(),
                me = v.startTime || Ne,
                Ae = ((Ne - me) / 1e3).toFixed(1);
              s(Me => Me.map(Re => Re.id === v.id ? {
                ...Re,
                status: "completed",
                url: Te,
                progress: 100,
                generationTime: Ae + "s",
                mjImages: ve.length > 1 ? ve : void 0,
                _assetId: v.id,
                _mjAssetIds: ve.length > 1 ? ve.map(($e, rt) => `${v.id}_mj_${rt}`) : void 0
              } : Re));
              const Fe = v.sourceNodeId;
              if (Fe) {
                _(Re => Re.map($e => $e.id === Fe ? {
                  ...$e,
                  isGenerating: !1
                } : $e));
                const Me = a.filter(Re => Re.from === Fe).map(Re => Re.to);
                Me.length > 0 && _(Re => Re.map($e => Me.includes($e.id) && $e.type === "preview" ? {
                  ...$e,
                  content: Te,
                  previewType: "video",
                  settings: ve.length > 1 ? {
                    ...$e.settings,
                    previewMjVideos: ve
                  } : $e.settings
                } : $e));
              }
              oy({
                url: Te,
                type: "video",
                mjImages: ve.length > 1 ? ve : void 0
              }, v.id);
              return;
            } else {
              s(Te => Te.map(Ne => Ne.id === v.id ? {
                ...Ne,
                status: "failed",
                errorMsg: "未返回视频URL"
              } : Ne));
              return;
            }
          } else if (_e === "FAILED" || _e === "FAILURE" || _e === "ERROR") {
            const Te = ce.failReason || ce.fail_reason || ce.message || "生成失败";
            console.error("[RefreshVideo] MJ Video 生成失败:", Te), s(Ne => Ne.map(me => me.id === v.id ? {
              ...me,
              status: "failed",
              errorMsg: String(Te)
            } : me));
            return;
          } else {
            console.log("[RefreshVideo] MJ Video 任务进行中, 状态:", _e, "进度:", ke), s(Te => Te.map(Ne => Ne.id === v.id ? {
              ...Ne,
              status: "generating",
              progress: ke || 50
            } : Ne));
            return;
          }
        }
        if (Tb(A)) {
          const _e = ZBt(ce);
          if (_e.terminal === "success" && _e.videoUrl) {
            const ke = _e.videoUrl;
            s(Te => Te.map(Ne => Ne.id === v.id ? {
              ...Ne,
              status: "completed",
              url: ke,
              progress: 100
            } : Ne));
            const ve = v.sourceNodeId;
            if (ve) {
              _(Ne => Ne.map(me => me.id === ve ? {
                ...me,
                isGenerating: !1
              } : me));
              const Te = a.filter(Ne => Ne.from === ve).map(Ne => Ne.to);
              Te.length > 0 && _(Ne => Ne.map(me => Te.includes(me.id) && me.type === "preview" ? {
                ...me,
                content: ke,
                previewType: "video"
              } : me));
            }
            oy({
              url: ke,
              type: "video"
            }, v.id);
            return;
          }
          if (_e.terminal === "failed") {
            s(ke => ke.map(ve => ve.id === v.id ? {
              ...ve,
              status: "failed",
              errorMsg: String(_e.errorMsg || "生成失败")
            } : ve));
            return;
          }
        }
        if (Lk(A) || O2(A) || jv(A)) {
          let _e;
          if (ce.task_status) _e = ce;else if (ce.data && typeof ce.data == "object") {
            const Ne = ce.data;
            Ne.task_status ? _e = Ne : Ne.data && typeof Ne.data == "object" && (_e = Ne.data);
          }
          if (!_e) {
            console.error("[RefreshVideo] Kling v2.5 Turbo 无法识别数据格式"), s(Ne => Ne.map(me => me.id === v.id ? {
              ...me,
              status: "failed",
              errorMsg: "无法解析响应数据格式"
            } : me));
            return;
          }
          const ke = String(_e.task_status || "").toLowerCase(),
            ve = _e.task_result,
            Te = ve == null ? void 0 : ve.videos;
          if (ke === "succeed" || ke === "success") {
            if (Te && Te.length > 0 && Te[0].url) {
              const Ne = Te[0].url,
                me = Date.now(),
                Ae = v.startTime || me,
                Fe = ((me - Ae) / 1e3).toFixed(1);
              s(Re => Re.map($e => $e.id === v.id ? {
                ...$e,
                status: "completed",
                url: Ne,
                progress: 100,
                generationTime: Fe + "s"
              } : $e));
              const Me = v.sourceNodeId;
              if (Me) {
                _($e => $e.map(rt => rt.id === Me ? {
                  ...rt,
                  isGenerating: !1
                } : rt));
                const Re = a.filter($e => $e.from === Me).map($e => $e.to);
                Re.length > 0 && _($e => $e.map(rt => Re.includes(rt.id) && rt.type === "preview" ? {
                  ...rt,
                  content: Ne,
                  previewType: "video"
                } : rt));
              }
              oy({
                url: Ne,
                type: "video"
              }, v.id);
              return;
            } else {
              console.error("[RefreshVideo] Kling v2.5 Turbo 未返回视频URL"), s(Ne => Ne.map(me => me.id === v.id ? {
                ...me,
                status: "failed",
                errorMsg: "未返回视频URL"
              } : me));
              return;
            }
          } else if (ke === "failed" || ke === "failure" || ke === "error") {
            const Ne = String((_e == null ? void 0 : _e.task_status_msg) || (_e == null ? void 0 : _e.message) || "生成失败");
            console.error("[RefreshVideo] Kling v2.5 Turbo 生成失败:", Ne), s(me => me.map(Ae => Ae.id === v.id ? {
              ...Ae,
              status: "failed",
              errorMsg: Ne
            } : Ae));
            return;
          } else if (ke === "processing" || ke === "submitted") {
            s(Ne => Ne.map(me => me.id === v.id ? {
              ...me,
              status: "generating",
              progress: 50
            } : me));
            return;
          }
        }
        let we = ce;
        if (ce.data && typeof ce.data == "object" && !ce.status ? (console.log("[RefreshVideo] 检测到包装格式，尝试解包"), we = ce.data) : ce.result && typeof ce.result == "object" && (console.log("[RefreshVideo] 检测到result包装格式，尝试解包"), we = ce.result), Cu(A) && (we = JBn(ce)), console.log("[RefreshVideo] Model:", A), console.log("[RefreshVideo] After unwrap (keys):", Object.keys(we)), console.log("[RefreshVideo] ========== 字段检查 =========="), console.log("[RefreshVideo] data.status:", we.status, "(type:", typeof we.status, ")"), console.log("[RefreshVideo] data.data:", we.data, "(type:", typeof we.data, ")"), console.log("[RefreshVideo] data.output:", we.output, "(type:", typeof we.output, ")"), console.log("[RefreshVideo] data.data?.output:", (z = we.data) == null ? void 0 : z.output), console.log("[RefreshVideo] data.fail_reason:", we.fail_reason), console.log("[RefreshVideo] data.progress:", we.progress), console.log("[RefreshVideo] data.task_id:", we.task_id), console.log("[RefreshVideo] data.platform:", we.platform), console.log("[RefreshVideo] ========== 完整响应结束 =========="), bx(A)) {
          const _e = we.base_resp;
          if (_e && _e.status_code !== 0) {
            const ve = String(_e.status_msg ?? "Hailuo query failed");
            s(Te => Te.map(Ne => Ne.id === v.id ? {
              ...Ne,
              status: "failed",
              errorMsg: ve
            } : Ne));
            return;
          }
          const ke = String(we.status ?? "").toLowerCase();
          if (ke === "success") {
            const ve = we.file_id;
            if (!ve) {
              s(Fe => Fe.map(Me => Me.id === v.id ? {
                ...Me,
                status: "failed",
                errorMsg: "未返回file_id"
              } : Me));
              return;
            }
            console.log("[RefreshVideo] Hailuo file_id:", ve);
            const Te = `${I}/minimax/v1/files/retrieve?file_id=${encodeURIComponent(String(ve))}`,
              Ne = await fetch(Te, {
                headers: {
                  Authorization: `Bearer ${E}`
                }
              });
            if (!Ne.ok) throw new Error(`获取下载链接失败: HTTP ${Ne.status}`);
            const me = await Ne.json();
            if (console.log("[RefreshVideo] Hailuo download data:", me), ((V = me.base_resp) == null ? void 0 : V.status_code) !== 0) {
              const Fe = ((O = me.base_resp) == null ? void 0 : O.status_msg) || "获取下载链接失败";
              s(Me => Me.map(Re => Re.id === v.id ? {
                ...Re,
                status: "failed",
                errorMsg: Fe
              } : Re));
              return;
            }
            const Ae = (L = me.file) == null ? void 0 : L.download_url;
            if (Ae) {
              console.log("[RefreshVideo] Hailuo 视频链接获取成功:", Ae), s(Me => Me.map(Re => Re.id === v.id ? {
                ...Re,
                status: "completed",
                url: Ae,
                progress: 100
              } : Re));
              let Fe = v.sourceNodeId;
              if (Fe || (console.log("[RefreshVideo] No sourceNodeId, searching by history id:", v.id), _(Me => {
                const Re = Me.find($e => $e.content === v.url || $e.settings && "videoUrl" in $e.settings && $e.settings.videoUrl === v.url);
                return Re && (Fe = Re.id, console.log("[RefreshVideo] Found source node:", Fe)), Me;
              })), Fe) {
                const Me = a.filter(Re => Re.from === Fe).map(Re => Re.to);
                console.log("[RefreshVideo] Source node:", Fe, "Connected previews:", Me), Me.length > 0 ? (console.log("[RefreshVideo] Updating connected preview nodes:", Me), _(Re => Re.map($e => Me.includes($e.id) && $e.type === "preview" ? (console.log("[RefreshVideo] Updating preview node:", $e.id, "with URL:", Ae.substring(0, 50)), {
                  ...$e,
                  content: Ae,
                  previewType: "video"
                }) : $e))) : console.warn("[RefreshVideo] No connected preview nodes found for source:", Fe);
              } else console.warn("[RefreshVideo] Could not find source node for history item:", v.id);
              oy({
                url: Ae,
                type: "video"
              }, v.id);
            } else s(Fe => Fe.map(Me => Me.id === v.id ? {
              ...Me,
              status: "failed",
              errorMsg: "未返回download_url"
            } : Me));
          } else if (ke === "failed") {
            const ve = String(we.error ?? "生成失败");
            s(Te => Te.map(Ne => Ne.id === v.id ? {
              ...Ne,
              status: "failed",
              errorMsg: ve
            } : Ne));
          } else {
            const ve = we.progress ?? 0,
              Te = typeof ve == "number" ? ve : parseInt(String(ve), 10) || 0;
            s(Ne => Ne.map(me => me.id === v.id ? {
              ...me,
              status: "generating",
              progress: Te
            } : me));
          }
          return;
        }
        if (Y1(A)) {
          console.log("[RefreshVideo] Wan 2.6 开始处理");
          let _e = "",
            ke = null,
            ve = null,
            Te = 0;
          if (ce.status) {
            _e = String(ce.status).toUpperCase();
            const Ne = (D = ce.data) == null ? void 0 : D.output;
            if (ke = typeof Ne == "string" ? Ne : null, ve = ce.fail_reason != null ? String(ce.fail_reason) : null, ce.progress) {
              const me = String(ce.progress).replace("%", "");
              Te = parseInt(me, 10) || 0;
            }
            console.log("[RefreshVideo] Wan 2.6 使用方案1（rawData）:", {
              wanStatus: _e,
              videoUrl: ke == null ? void 0 : ke.substring(0, 50),
              errorMsg: ve,
              progressValue: Te
            });
          } else if (we.status) {
            _e = String(we.status).toUpperCase();
            const Ne = (U = we.data) == null ? void 0 : U.output;
            if (ke = typeof Ne == "string" ? Ne : null, ve = we.fail_reason != null ? String(we.fail_reason) : null, we.progress) {
              const me = String(we.progress).replace("%", "");
              Te = parseInt(me, 10) || 0;
            }
            console.log("[RefreshVideo] Wan 2.6 使用方案2（data）:", {
              wanStatus: _e,
              videoUrl: ke == null ? void 0 : ke.substring(0, 50),
              errorMsg: ve,
              progressValue: Te
            });
          } else if (ce.output && typeof ce.output == "object") {
            const Ne = ce.output;
            _e = String(Ne.task_status || "").toUpperCase(), ke = String(Ne.video_url || ""), ve = String(Ne.message || ""), console.log("[RefreshVideo] Wan 2.6 使用方案3（标准格式）:", {
              wanStatus: _e,
              videoUrl: ke == null ? void 0 : ke.substring(0, 50),
              errorMsg: ve
            });
          } else if (we.output && typeof we.output == "object") {
            const Ne = we.output;
            _e = String(Ne.task_status || "").toUpperCase(), ke = String(Ne.video_url || ""), ve = String(Ne.message || ""), console.log("[RefreshVideo] Wan 2.6 使用方案4（data.output）:", {
              wanStatus: _e,
              videoUrl: ke == null ? void 0 : ke.substring(0, 50),
              errorMsg: ve
            });
          }
          if (_e || (_e = String(ce.task_status || we.task_status || ce.state || we.state || "").toUpperCase(), console.log("[RefreshVideo] Wan 2.6 fallback状态:", _e)), !ke) {
            const Ne = ce.video_url ?? we.video_url ?? ce.url ?? we.url ?? ce.output ?? we.output ?? null;
            ke = typeof Ne == "string" ? Ne : null, ke && ke.startsWith("http") ? console.log("[RefreshVideo] Wan 2.6 fallback视频URL:", ke.substring(0, 50)) : ke = null;
          }
          if (console.log("[RefreshVideo] Wan 2.6 最终提取结果:", {
            wanStatus: _e,
            hasVideoUrl: !!ke,
            videoUrlPreview: ke == null ? void 0 : ke.substring(0, 50),
            errorMsg: ve,
            progressValue: Te
          }), _e === "SUCCESS" || _e === "SUCCEEDED") {
            if (ke) {
              console.log("[RefreshVideo] Wan 2.6 视频链接获取成功:", ke), s(me => me.map(Ae => Ae.id === v.id ? {
                ...Ae,
                status: "completed",
                url: ke,
                progress: 100
              } : Ae));
              let Ne = v.sourceNodeId;
              if (Ne || (console.log("[RefreshVideo] No sourceNodeId, searching by history id:", v.id), _(me => {
                const Ae = me.find(Fe => Fe.content === v.url || Fe.settings && "videoUrl" in Fe.settings && Fe.settings.videoUrl === v.url);
                return Ae && (Ne = Ae.id, console.log("[RefreshVideo] Found source node:", Ne)), me;
              })), Ne) {
                const me = a.filter(Ae => Ae.from === Ne).map(Ae => Ae.to);
                console.log("[RefreshVideo] Source node:", Ne, "Connected previews:", me), me.length > 0 && (console.log("[RefreshVideo] Updating connected preview nodes:", me), _(Ae => Ae.map(Fe => me.includes(Fe.id) && Fe.type === "preview" ? (console.log("[RefreshVideo] Updating preview node:", Fe.id, "with URL:", ke.substring(0, 50)), {
                  ...Fe,
                  content: ke,
                  previewType: "video"
                }) : Fe)));
              }
              oy({
                url: ke,
                type: "video"
              }, v.id);
            } else s(Ne => Ne.map(me => me.id === v.id ? {
              ...me,
              status: "failed",
              errorMsg: "未返回视频 URL"
            } : me));
          } else if (_e === "FAILED" || _e === "FAILURE" || _e === "ERROR") {
            const Ne = ve || "生成失败";
            console.error("[RefreshVideo] Wan 2.6 生成失败:", Ne), s(me => me.map(Ae => Ae.id === v.id ? {
              ...Ae,
              status: "failed",
              errorMsg: Ne
            } : Ae));
          } else if (_e === "UNKNOWN") {
            const Ne = "任务已过期或不存在（24小时有效期）";
            console.error("[RefreshVideo] Wan 2.6 任务查询失败:", Ne), s(me => me.map(Ae => Ae.id === v.id ? {
              ...Ae,
              status: "failed",
              errorMsg: Ne
            } : Ae));
          } else {
            const Ne = Te || (_e === "RUNNING" ? 50 : 10);
            console.log("[RefreshVideo] Wan 2.6 任务进行中, 状态:", _e, "进度:", Ne), s(me => me.map(Ae => Ae.id === v.id ? {
              ...Ae,
              status: "generating",
              progress: Ne
            } : Ae));
          }
          return;
        }
        if (_b(A)) {
          const _e = ce.data && typeof ce.data == "object" ? ce.data : we,
            ke = String(_e.state ?? we.state ?? ce.state ?? "").toLowerCase(),
            ve = _e.creations ?? we.creations ?? ce.creations,
            Te = ve == null ? void 0 : ve[0],
            Ne = Te == null ? void 0 : Te.video;
          let me = (Te == null ? void 0 : Te.url) ?? (Te == null ? void 0 : Te.download_url) ?? (Te == null ? void 0 : Te.video_url) ?? (Ne == null ? void 0 : Ne.url) ?? (Ne == null ? void 0 : Ne.download_url) ?? (Te == null ? void 0 : Te.output_url) ?? (Te == null ? void 0 : Te.play_url) ?? "";
          if (!me && Te && typeof Te == "object") {
            for (const Me of Object.values(Te)) if (typeof Me == "string" && Me.startsWith("http") && (Me.includes(".mp4") || /\/video[\/?]/.test(Me) || Me.includes("prod-ss-vidu") || Me.includes("s3") && Me.includes("amazonaws"))) {
              me = Me;
              break;
            }
          }
          if (me || (me = we.video_url ?? we.download_url ?? we.output_url ?? ce.video_url ?? ce.download_url ?? ce.output_url ?? ""), ke === "success" && me) {
            const Me = DYe(v.id, me);
            s($e => $e.map(rt => rt.id === v.id ? {
              ...rt,
              status: "completed",
              url: me,
              _assetId: Me,
              progress: 100
            } : rt));
            const Re = v.sourceNodeId;
            if (Re) {
              const $e = a.filter(rt => rt.from === Re).map(rt => rt.to);
              $e.length > 0 && _(rt => rt.map(nt => $e.includes(nt.id) && nt.type === "preview" ? {
                ...nt,
                content: me,
                previewType: "video"
              } : nt));
            }
            oy({
              url: me,
              type: "video"
            }, v.id);
            return;
          }
          if (ke === "failed") {
            const Me = String(we.err_code ?? ce.err_code ?? "任务失败");
            k(v), s(Re => Re.map($e => $e.id === v.id ? {
              ...$e,
              status: "failed",
              errorMsg: Me
            } : $e));
            return;
          }
          const Ae = we.progress ?? 50,
            Fe = typeof Ae == "number" ? Ae : parseInt(String(Ae), 10) || 50;
          s(Me => Me.map(Re => Re.id === v.id ? {
            ...Re,
            status: "generating",
            progress: Fe
          } : Re));
          return;
        }
        const X = we.data,
          Z = String(we.status ?? (X == null ? void 0 : X.status) ?? "").toUpperCase(),
          re = we.progress ?? (X == null ? void 0 : X.progress) ?? 0,
          fe = typeof re == "number" ? re : parseInt(String(re), 10) || 0;
        console.log("[RefreshVideo] Status:", Z, "Progress:", fe);
        const ie = (ce.data && typeof ce.data == "object" ? ce.data : we).creations ?? we.creations ?? ce.creations,
          ae = ie == null ? void 0 : ie[0],
          be = ae ? ae.url ?? ae.video_url ?? ((H = ae.video) == null ? void 0 : H.url) ?? ae.output_url ?? ae.play_url : void 0,
          Ee = (X == null ? void 0 : X.generations) ?? [],
          xe = (Y = Ee == null ? void 0 : Ee[0]) == null ? void 0 : Y.url,
          ue = [...(C && Array.isArray(we.data) ? we.data.map(_e => _e.url) : []), be, we.video_url, we.url, X == null ? void 0 : X.video_url, X == null ? void 0 : X.url, X == null ? void 0 : X.output, we.output, xe];
        let ge = "";
        for (const _e of ue) if (typeof _e == "string" && _e) {
          ge = _e;
          break;
        }
        if (console.log("[RefreshVideo] Extracted video URL:", ge), Z === "COMPLETED" || Z === "SUCCESS" || Z === "SUCCEEDED" || Z === "FINISHED" || Z === "DONE") {
          if (ge) {
            s(ke => ke.map(ve => ve.id === v.id ? {
              ...ve,
              status: "completed",
              url: ge,
              progress: 100
            } : ve));
            let _e = v.sourceNodeId;
            if (_e || (console.log("[RefreshVideo] No sourceNodeId, searching by history id:", v.id), _(ke => {
              const ve = ke.find(Te => Te.content === v.url || Te.settings && "videoUrl" in Te.settings && Te.settings.videoUrl === v.url);
              return ve && (_e = ve.id, console.log("[RefreshVideo] Found source node:", _e)), ke;
            })), _e) {
              const ke = a.filter(ve => ve.from === _e).map(ve => ve.to);
              console.log("[RefreshVideo] Source node:", _e, "Connected previews:", ke), ke.length > 0 ? (console.log("[RefreshVideo] Updating connected preview nodes:", ke), _(ve => ve.map(Te => ke.includes(Te.id) && Te.type === "preview" ? (console.log("[RefreshVideo] Updating preview node:", Te.id, "with URL:", ge.substring(0, 50)), {
                ...Te,
                content: ge,
                previewType: "video"
              }) : Te))) : console.warn("[RefreshVideo] No connected preview nodes found for source:", _e);
            } else console.warn("[RefreshVideo] Could not find source node for history item:", v.id);
            oy({
              url: ge,
              type: "video"
            }, v.id);
          } else s(_e => _e.map(ke => ke.id === v.id ? {
            ...ke,
            status: "failed",
            errorMsg: "任务完成但未返回视频URL"
          } : ke));
        } else if (Z === "FAILED" || Z === "ERROR") {
          const _e = we.error || we.message || "视频生成失败",
            ke = typeof _e == "string" ? _e : typeof _e == "object" && _e !== null && "message" in _e ? String(_e.message) : JSON.stringify(_e);
          k(v), s(ve => ve.map(Te => Te.id === v.id ? {
            ...Te,
            status: "failed",
            errorMsg: ke
          } : Te));
        } else s(_e => _e.map(ke => ke.id === v.id ? {
          ...ke,
          status: "generating",
          progress: typeof fe == "number" ? fe : parseInt(fe) || 0
        } : ke));
      } catch (K) {
        console.error("[RefreshVideo] Error:", K), k(v), s(W => W.map(Q => Q.id === v.id ? {
          ...Q,
          status: "failed",
          errorMsg: String(K)
        } : Q));
      }
    }, [t, e, s, o, a, i]),
    u = g.useCallback(async v => {
      var M;
      const {
          setNodes: _
        } = KO(o, i),
        w = (() => {
          const T = String(v.clipId || "").trim();
          if (T) return [T];
          const P = String(v._audioAssetId || "").trim();
          if (/^[0-9a-f-]{36}$/i.test(P)) return [P];
          const R = String(v.remoteTaskId || "").trim();
          return R ? R.includes(",") ? R.split(",").map(j => j.trim()).filter(j => /^[0-9a-f-]{36}$/i.test(j)) : /^[0-9a-f-]{36}$/i.test(R) ? [R] : [] : [];
        })(),
        k = String(v.remoteTaskId || "").trim(),
        A = k.length > 0 && !k.includes(",") && !/^[0-9a-f-]{36}$/i.test(k);
      if (w.length === 0 && !A) {
        alert(x(`无法刷新：缺少任务 ID（remoteTaskId）或 clipId

该历史记录可能是旧版本生成的，请重新生成音乐。`));
        return;
      }
      const S = v.modelName || "suno-v6",
        C = e.find(T => T.id === S || T.id.includes("suno")),
        I = (C == null ? void 0 : C.key) || t,
        E = ((C == null ? void 0 : C.url) || Bne).replace(/\/+$/, "");
      if (!I) {
        alert(x("无法刷新：缺少API Key"));
        return;
      }
      console.log("[RefreshAudio] Config:", {
        modelId: S,
        effectiveBaseUrl: E,
        hasKey: !!I,
        taskId: A ? k : void 0,
        clipIds: w
      }), s(T => T.map(P => P.id === v.id ? {
        ...P,
        status: "generating",
        progress: 0
      } : P));
      try {
        _1.updateConfig(E, I, e);
        let T = [],
          P = "",
          R = 0,
          j = "";
        if (w.length > 0) {
          const F = await _1.getMusicByClipIds(w, S);
          if (!F.success || !F.data) throw new Error(F.error || "查询 clip 失败");
          const N = F.data;
          Array.isArray(N) ? T = N : Array.isArray(N.data) && (T = N.data), P = "complete", R = 100;
        } else {
          const F = await _1.getMusicTaskStatus(k, S);
          if (!F.success || !F.data) throw new Error(F.error || "查询任务状态失败");
          const N = F.data,
            G = N.data ?? N;
          P = String(G.status || "").toLowerCase(), R = parseInt(String(G.progress || "0").replace("%", ""), 10), T = Array.isArray(G.data) ? G.data : [], j = String(G.fail_reason || N.message || "");
        }
        if (console.log("[RefreshAudio] Status:", {
          status: P,
          progress: R,
          songsCount: T == null ? void 0 : T.length
        }), (P === "complete" || P === "completed" || P === "success" || P === "finished") && T && Array.isArray(T) && T.length > 0) {
          const {
            getSunoSongAudioUrl: F,
            isSunoStreamingAudioUrl: N,
            resolveSunoSongDuration: G,
            probeAudioDurationSeconds: z
          } = await Ie(async () => {
            const {
              getSunoSongAudioUrl: O,
              isSunoStreamingAudioUrl: L,
              resolveSunoSongDuration: D,
              probeAudioDurationSeconds: U
            } = await Promise.resolve().then(() => yve);
            return {
              getSunoSongAudioUrl: O,
              isSunoStreamingAudioUrl: L,
              resolveSunoSongDuration: D,
              probeAudioDurationSeconds: U
            };
          }, void 0, import.meta.url);
          let V = T.filter(O => {
            const L = String(O.status || O.state || "").toLowerCase(),
              D = F(O);
            return !!!(D || O.audio_url || O.audioUrl || O.video_url) || N(D) ? !1 : L === "complete" || L === "completed" || L === "success" || L === "finished";
          });
          if (V.length === 0 && (V = T.filter(O => {
            const L = String(O.status || O.state || "").toLowerCase();
            return !!(F(O) || O.audio_url || O.audioUrl || O.video_url) && (!L || L === "complete" || L === "completed" || L === "success" || L === "finished");
          })), V.length > 0) {
            const O = V[0],
              L = F(O),
              D = O.id || O.clip_id || O.clipId,
              U = O.title || v.musicTitle;
            let H = G(O);
            if (L) {
              const Q = await z(L);
              Q && Q > 0 && (!H || Math.abs(Q - H) > .8) && (H = Q);
            }
            const Y = ((M = O.metadata) == null ? void 0 : M.prompt) || O.lyrics || v.lyrics,
              K = v.remoteTaskId || w.join(",") || (A ? k : D);
            s(Q => Q.map(q => q.id === v.id ? {
              ...q,
              status: "completed",
              url: L,
              audioUrl: L,
              progress: 100,
              clipId: D,
              musicTitle: U,
              duration: H,
              lyrics: Y,
              remoteTaskId: K,
              _assetId: D || q._assetId,
              _audioAssetId: D || q._audioAssetId
            } : q));
            const {
              isGlobalOssUploadEnabled: W
            } = await Ie(async () => {
              const {
                isGlobalOssUploadEnabled: Q
              } = await Promise.resolve().then(() => Ah);
              return {
                isGlobalOssUploadEnabled: Q
              };
            }, void 0, import.meta.url);
            W() || oy({
              url: L,
              audioUrl: L,
              type: "audio",
              _assetId: D,
              _audioAssetId: D
            }, v.id), v.sourceNodeId && _(Q => {
              const q = Q.find(ne => ne.id === v.sourceNodeId);
              return q && q.type === "gen-music" ? Q.map(ne => ne.id === v.sourceNodeId ? {
                ...ne,
                isGenerating: !1,
                content: String(L || ""),
                settings: {
                  ...ne.settings,
                  clipId: D,
                  audioUrl: L,
                  generatedLyrics: Y,
                  musicTitle: U,
                  duration: H,
                  _audioAssetId: D
                }
              } : ne) : Q;
            });
          } else s(O => O.map(L => L.id === v.id ? {
            ...L,
            status: "failed",
            errorMsg: "任务完成但未返回音频URL"
          } : L));
        } else if (P === "error" || P === "failed") {
          const F = j || "音乐生成失败";
          s(N => N.map(G => G.id === v.id ? {
            ...G,
            status: "failed",
            errorMsg: F
          } : G));
        } else s(F => F.map(N => N.id === v.id ? {
          ...N,
          status: "generating",
          progress: R
        } : N));
      } catch (T) {
        console.error("[RefreshAudio] Error:", T), s(P => P.map(R => R.id === v.id ? {
          ...R,
          status: "failed",
          errorMsg: String(T)
        } : R));
      }
    }, [t, e, s, o, i]),
    h = g.useCallback(async v => {
      if (v.modelName !== "RH ComfyUI" || !v.id) return;
      const _ = typeof localStorage < "u" && localStorage.getItem(Zi.RH_API_KEY) || "";
      if (!_.trim()) {
        alert(x("无法刷新：请先在 RH Comfy 节点中配置 API Key"));
        return;
      }
      const w = String(v.id);
      s(k => k.map(A => String(A.id) === w ? {
        ...A,
        status: "generating",
        progress: 0
      } : A));
      try {
        const k = v.rhUseOverseas ?? !1,
          A = await wdr({
            apiKey: _.trim(),
            taskId: w,
            useOverseas: k
          }),
          S = _dr(A.data);
        if (A.code === 0 && S.length > 0) {
          const C = S.map(R => R.fileUrl).filter(Boolean),
            I = C[0] || "",
            E = (I || "").split("?")[0].toLowerCase(),
            M = /\.(mp4|webm|mov|avi|mkv)(\?|$)/i.test(E),
            T = /\.(mp3|wav|ogg|m4a|aac|flac)(\?|$)/i.test(E),
            P = M ? "video" : T ? "audio" : "image";
          s(R => R.map(j => String(j.id) === w ? {
            ...j,
            type: P,
            url: I,
            audioUrl: P === "audio" ? I : j.audioUrl,
            status: "completed",
            progress: 100,
            mjImages: C.length > 1 ? C : void 0,
            errorMsg: void 0,
            rhUseOverseas: j.rhUseOverseas,
            _assetId: w
          } : j)), I && oy({
            url: I,
            type: P,
            audioUrl: P === "audio" ? I : void 0
          }, w);
        } else if (A.code === 0 && S.length === 0) {
          const C = await xdr({
              apiKey: _.trim(),
              taskId: w,
              useOverseas: k
            }),
            I = C.data,
            E = typeof I == "string" ? I.trim().toUpperCase() : I && typeof I == "object" && "status" in I ? String(I.status ?? "").trim().toUpperCase() : "",
            M = E === "SUCCESS" || E === "SUCCEEDED" || E === "COMPLETED" || E === "DONE" || E === "FINISHED";
          s(T => T.map(P => String(P.id) === w ? {
            ...P,
            status: "failed",
            progress: 0,
            errorMsg: M ? jUe : C.msg || A.msg || "暂无输出文件"
          } : P));
        } else if (A.code === 805) {
          const C = A.data,
            I = (C == null ? void 0 : C.failedReason) ?? A.failedReason,
            E = (I == null ? void 0 : I.exception_message) || A.msg || "任务失败";
          s(M => M.map(T => String(T.id) === w ? {
            ...T,
            status: "failed",
            progress: 0,
            errorMsg: E
          } : T));
        } else A.code === 804 || A.code === 813 ? s(C => C.map(I => String(I.id) === w ? {
          ...I,
          status: "generating",
          progress: A.code === 804 ? 50 : 10
        } : I)) : s(C => C.map(I => String(I.id) === w ? {
          ...I,
          status: "failed",
          progress: 0,
          errorMsg: A.msg || "查询失败"
        } : I));
      } catch (k) {
        const A = k instanceof Error ? k.message : "刷新失败";
        s(S => S.map(C => String(C.id) === w ? {
          ...C,
          status: "failed",
          progress: 0,
          errorMsg: A
        } : C));
      }
    }, [s]),
    p = g.useCallback(v => {
      if (!(typeof localStorage < "u" && localStorage.getItem(Zi.RH_API_KEY) || "").trim()) return;
      const w = v.filter(k => k.modelName === "RH ComfyUI" && k.id && (k.status === "generating" || k.status === "failed" || k.status === "completed" && (!k.url || !k.url.trim())));
      w.length !== 0 && w.forEach((k, A) => {
        setTimeout(() => {
          h(k);
        }, A * 600);
      });
    }, [h]),
    m = g.useCallback(async v => {
      var R, j, B, F, N, G, z, V, O, L, D, U;
      const {
          setNodes: _,
          updateNode: w
        } = KO(o, i),
        k = H => {
          dkt(w, H.targetPreviewId);
        };
      if (!v.remoteTaskId) {
        alert(x(`无法刷新：缺少任务ID（remoteTaskId）

该历史记录可能是旧版本生成的，请重新生成图片。`));
        return;
      }
      const A = v.modelName || "",
        S = ((R = v.apiConfig) == null ? void 0 : R.modelId) || v.modelName || "nano-banana",
        C = A.toLowerCase();
      if (!(!!((B = (j = v.apiConfig) == null ? void 0 : j.customProtocol) != null && B.poll) || C.includes("nano banana") || C.includes("nano-banana") || S.includes("nano-banana") || S.includes("gemini-3.1-flash-image-preview") || S.includes("gemini-3.1-flash-lite-image") || qM(S) || C.includes("grok 4.1 image") || C.includes("grok 4.2 image") || C.includes("grok-imagine") || C.includes("grok-quality") || C.includes("grok imagine") || C.includes("grok quality") || S.includes("gpt-image") || C.includes("gpt image") || C.includes("gpt-4o") || S.includes("qwen-image-edit") || C.includes("qwen image") || S.includes("flux-kontext") || C.includes("flux"))) {
        console.warn("[RefreshNanoBanana] 不是 /v1/images/tasks 绘画任务，跳过刷新");
        return;
      }
      try {
        const {
          assetStore: H
        } = await Ie(async () => {
          const {
            assetStore: W
          } = await Promise.resolve().then(() => Ri);
          return {
            assetStore: W
          };
        }, void 0, import.meta.url);
        await H.init();
        const Y = [v._assetId, v.id, v.remoteTaskId].filter(Boolean);
        let K = null;
        for (const W of Y) {
          const Q = await H.getAssetUrl(W);
          if (Q) {
            K = Q, console.log("[RefreshNanoBanana] ✅ 从本地缓存获取到图片:", W, Q);
            break;
          }
        }
        if (K) {
          const W = {
            ...v,
            status: "completed",
            progress: 100,
            url: K,
            _assetId: v._assetId || v.id
          };
          s(Q => Q.map(q => q.id === v.id ? W : q)), _ && v.sourceNodeId && _(Q => {
            const q = Q.filter(ne => ne.type === "preview" && a.some(de => de.from === v.sourceNodeId && de.to === ne.id));
            return q.length > 0 ? Q.map(ne => q.some(le => le.id === ne.id) ? {
              ...ne,
              content: K
            } : ne) : Q;
          }), console.log("[RefreshNanoBanana] ✅ 使用本地缓存图片完成");
          return;
        }
      } catch (H) {
        console.warn("[RefreshNanoBanana] 从本地缓存获取失败，尝试从API获取:", H);
      }
      const E = e.find(H => H.id === S || H.provider === v.modelName || H.modelName === S),
        M = (F = v.apiConfig) == null ? void 0 : F.customProtocol,
        T = ((N = v.apiConfig) == null ? void 0 : N.apiKey) || (E == null ? void 0 : E.key) || t;
      FS(S) && (await ace());
      const P = dft(S, ((G = v.apiConfig) == null ? void 0 : G.baseUrl) || (E == null ? void 0 : E.url) || Bne).replace(/\/+$/, "");
      if (!T && (M == null ? void 0 : M.auth) !== "none") {
        alert(x("无法刷新：缺少API Key"));
        return;
      }
      s(H => H.map(Y => Y.id === v.id ? {
        ...Y,
        status: "generating",
        progress: 0
      } : Y));
      try {
        const H = M ? wxe(M, P, T, v.remoteTaskId) : void 0,
          Y = (H == null ? void 0 : H.url) || `${P}/v1/images/tasks/${encodeURIComponent(v.remoteTaskId)}`,
          K = await $i(Y, (H == null ? void 0 : H.options) || {
            headers: {
              Authorization: `Bearer ${T}`
            }
          });
        if (!K.ok) {
          const pe = await K.text();
          throw console.error("[RefreshNanoBanana] HTTP错误:", K.status, pe), new Error(`HTTP ${K.status}: ${pe}`);
        }
        const W = await K.json(),
          Q = M ? TF(W, M, !0) : W;
        console.log("[RefreshNanoBanana] 查询结果:", Q);
        const q = Q && typeof Q == "object" ? Q : {},
          ne = IX(q),
          de = eP(q, 0),
          le = FU(ne),
          J = !le && (ZM(ne) || CIe(q, ne));
        if (le && !J) {
          let pe = [];
          if ((z = Q.data) != null && z.data) {
            if (console.log("[RefreshNanoBanana] 找到 data.data，类型:", typeof Q.data.data, "是否为数组:", Array.isArray(Q.data.data)), Array.isArray(Q.data.data) && Q.data.data.length > 0) {
              console.log("[RefreshNanoBanana] data.data 是数组，长度:", Q.data.data.length);
              const ce = Q.data.data.map((we, X) => {
                if (console.log(`[RefreshNanoBanana] 处理图片 ${X}:`, we, "类型:", typeof we), typeof we == "string") return console.log(`[RefreshNanoBanana] 图片 ${X} 是字符串，直接返回`), we;
                if (typeof we == "object" && we !== null) {
                  const Z = we.url || "";
                  return console.log(`[RefreshNanoBanana] 图片 ${X} 是对象，提取的URL:`, Z), Z;
                }
                return "";
              }).filter(we => {
                const X = !!(we && we.trim().length > 0);
                return X || console.warn("[RefreshNanoBanana] 过滤掉无效URL:", we), X;
              });
              ce.length > 0 && (pe = ce, console.log("[RefreshNanoBanana] 方式1提取到的URLs:", pe));
            } else if (typeof Q.data.data == "object" && Q.data.data !== null && !Array.isArray(Q.data.data)) {
              const ce = Q.data.data.url;
              ce && (console.log("[RefreshNanoBanana] data.data 是对象，提取URL:", ce), pe.push(ce));
            }
          }
          if (pe.length === 0 && ((V = Q.data) != null && V.images) && Array.isArray(Q.data.images) && Q.data.images.length > 0) {
            const ce = Q.data.images.map(we => typeof we == "string" ? we : (we == null ? void 0 : we.url) || "").filter(Boolean);
            ce.length > 0 && (pe = ce, console.log("[RefreshNanoBanana] 方式2提取到的URLs:", pe));
          }
          if (pe.length === 0 && Q.images && Array.isArray(Q.images) && Q.images.length > 0) {
            const ce = Q.images.map(we => typeof we == "string" ? we : (we == null ? void 0 : we.url) || "").filter(Boolean);
            ce.length > 0 && (pe = ce, console.log("[RefreshNanoBanana] 方式3提取到的URLs:", pe));
          }
          if (pe.length === 0 && Q.data && Array.isArray(Q.data) && Q.data.length > 0) {
            const ce = Q.data.map(we => typeof we == "string" ? we : (we == null ? void 0 : we.url) || "").filter(Boolean);
            ce.length > 0 && (pe = ce, console.log("[RefreshNanoBanana] 方式4提取到的URLs:", pe));
          }
          if (pe.length === 0 && ((O = Q.data) != null && O.url) && (pe = [Q.data.url], console.log("[RefreshNanoBanana] 方式5提取到的URL:", pe)), pe.length === 0 ? (console.error("[RefreshNanoBanana] 无法提取图片URL，完整响应结构:", JSON.stringify(Q, null, 2)), console.error("[RefreshNanoBanana] result.data:", Q.data), console.error("[RefreshNanoBanana] result.data?.data:", (L = Q.data) == null ? void 0 : L.data), (D = Q.data) != null && D.data && Array.isArray(Q.data.data) && (console.error("[RefreshNanoBanana] result.data.data[0]:", Q.data.data[0]), Q.data.data[0] && console.error("[RefreshNanoBanana] result.data.data[0].url:", Q.data.data[0].url))) : console.log("[RefreshNanoBanana] ✅ 成功提取到URL:", pe), pe.length > 0) try {
            const {
              assetStore: ce
            } = await Ie(async () => {
              const {
                assetStore: Z
              } = await Promise.resolve().then(() => Ri);
              return {
                assetStore: Z
              };
            }, void 0, import.meta.url);
            await ce.init();
            const we = pe[0],
              X = v._assetId || v.id || v.remoteTaskId;
            if (X && we) {
              await oy({
                url: we,
                type: "image"
              }, X);
              const Z = await ce.getAssetUrl(X),
                re = Z || we;
              console.log("[RefreshNanoBanana] 图片已保存到本地缓存，assetId:", X), console.log("[RefreshNanoBanana] 本地缓存URL:", Z), console.log("[RefreshNanoBanana] 最终使用URL:", re);
              const fe = {
                ...v,
                status: "completed",
                progress: 100,
                url: re,
                mjImages: pe.length > 1 ? pe : void 0,
                _assetId: X
              };
              s(ye => ye.map(ie => ie.id === v.id ? fe : ie)), _ && v.sourceNodeId && _(ye => {
                const ie = ye.filter(ae => ae.type === "preview" && a.some(be => be.from === v.sourceNodeId && be.to === ae.id));
                return ie.length > 0 ? ye.map(ae => ie.some(Ee => Ee.id === ae.id) ? {
                  ...ae,
                  content: re,
                  previewMjImages: pe.length > 1 ? pe : void 0
                } : ae) : ye;
              }), console.log("[RefreshNanoBanana] ✅ 刷新成功，使用本地缓存图片:", re);
            } else {
              const Z = {
                ...v,
                status: "completed",
                progress: 100,
                url: we,
                mjImages: pe.length > 1 ? pe : void 0
              };
              s(re => re.map(fe => fe.id === v.id ? Z : fe)), console.log("[RefreshNanoBanana] ✅ 刷新成功，图片URL:", we);
            }
          } catch (ce) {
            console.warn("[RefreshNanoBanana] 保存到本地缓存失败，使用原始URL:", ce);
            const we = {
              ...v,
              status: "completed",
              progress: 100,
              url: pe[0],
              mjImages: pe.length > 1 ? pe : void 0
            };
            s(X => X.map(Z => Z.id === v.id ? we : Z)), console.log("[RefreshNanoBanana] ✅ 刷新成功（使用原始URL）:", pe[0]);
          } else console.warn("[RefreshNanoBanana] 任务已成功但尚未返回图片URL，保持生成中:", JSON.stringify(Q, null, 2)), s(ce => ce.map(we => we.id === v.id ? {
            ...we,
            status: "generating",
            progress: de
          } : we));
        } else if (BU(q) || OU(ne)) {
          const pe = LF(Q, ne || "FAILED") || Q.error || Q.message || Q.fail_reason || ((U = Q.data) == null ? void 0 : U.fail_reason) || "生成失败";
          k(v), s(ce => ce.map(we => we.id === v.id ? {
            ...we,
            status: "failed",
            errorMsg: pe
          } : we)), console.error("[RefreshNanoBanana] 任务失败:", pe);
        } else s(pe => pe.map(ce => ce.id === v.id ? {
          ...ce,
          status: "generating",
          progress: de
        } : ce)), console.log("[RefreshNanoBanana] 任务处理中，进度:", de);
      } catch (H) {
        if (console.error("[RefreshNanoBanana] 刷新失败:", H), F_t(String(v.id))) {
          console.warn("[RefreshNanoBanana] 生成会话仍在进行，忽略刷新异常以免覆盖状态");
          return;
        }
        k(v), s(Y => Y.map(K => K.id === v.id ? {
          ...K,
          status: "failed",
          errorMsg: H instanceof Error ? H.message : "刷新失败"
        } : K));
      }
    }, [e, t, s, o, a, i]),
    f = g.useCallback(v => {
      const _ = v.filter(w => {
        var S, C, I;
        if (w.status !== "generating" || !w.remoteTaskId || F_t(String(w.id))) return !1;
        const k = String(((S = w.apiConfig) == null ? void 0 : S.modelId) || w.modelName || "").toLowerCase(),
          A = String(w.modelName || "").toLowerCase();
        return w.type === "image" && !!((I = (C = w.apiConfig) == null ? void 0 : C.customProtocol) != null && I.poll) || k.includes("gpt-image") || A.includes("gpt image") || A.includes("gpt-4o") || k.includes("nano-banana") || A.includes("nano banana") || k.includes("grok") || A.includes("grok") || k.includes("qwen-image-edit") || k.includes("flux-kontext");
      });
      _.length !== 0 && _.forEach((w, k) => {
        setTimeout(() => {
          m(w);
        }, k * 400);
      });
    }, [m]),
    y = g.useCallback(async v => {
      var M, T, P;
      const {
          setNodes: _
        } = KO(o, i),
        {
          recoverThreeDFalHistoryItem: w
        } = await Ie(async () => {
          const {
            recoverThreeDFalHistoryItem: R
          } = await Promise.resolve().then(() => Zmn);
          return {
            recoverThreeDFalHistoryItem: R
          };
        }, void 0, import.meta.url);
      let k = w(v);
      _(R => {
        const j = v.sourceNodeId ? R.find(F => F.id === v.sourceNodeId) : R.find(F => {
          var N;
          return F.type === "gen-3d" && ((N = F.settings) == null ? void 0 : N.threeDFalRequestId);
        });
        if (k = w(v, j == null ? void 0 : j.settings), !v.sourceNodeId && !j) return R;
        const B = v.sourceNodeId || (j == null ? void 0 : j.id);
        return R.map(F => F.id === B && F.type === "gen-3d" ? {
          ...F,
          isGenerating: !0,
          errorMsg: ""
        } : F);
      });
      const A = String(k.remoteTaskId || "").trim(),
        S = String(((M = k.apiConfig) == null ? void 0 : M.modelId) || v.modelName || "").trim(),
        C = e.find(R => R.id === S),
        I = IU(C, t) || String(((T = k.apiConfig) == null ? void 0 : T.apiKey) || "").trim(),
        E = String((C == null ? void 0 : C.url) || ((P = k.apiConfig) == null ? void 0 : P.baseUrl) || Bne).replace(/\/+$/, "");
      if (!I) {
        v.sourceNodeId && _(R => R.map(j => j.id === v.sourceNodeId && j.type === "gen-3d" ? {
          ...j,
          isGenerating: !1
        } : j)), alert(x("无法刷新：缺少 API Key"));
        return;
      }
      s(R => R.map(j => j.id === v.id ? {
        ...j,
        status: "generating",
        progress: 12,
        errorMsg: "",
        remoteTaskId: A,
        falModelPath: k.falModelPath || j.falModelPath,
        apiConfig: k.apiConfig || j.apiConfig
      } : j));
      try {
        const {
            refreshHunyuan3dFalHistory: R
          } = await Ie(async () => {
            const {
              refreshHunyuan3dFalHistory: F
            } = await Promise.resolve().then(() => Zmn);
            return {
              refreshHunyuan3dFalHistory: F
            };
          }, void 0, import.meta.url),
          {
            applyThreeDGenerationResult: j
          } = await Ie(async () => {
            const {
              applyThreeDGenerationResult: F
            } = await Promise.resolve().then(() => YLn);
            return {
              applyThreeDGenerationResult: F
            };
          }, void 0, import.meta.url),
          B = await R(k, {
            apiKey: I,
            baseUrl: E
          });
        s(F => F.map(N => {
          var G;
          return N.id === v.id ? {
            ...N,
            status: "completed",
            progress: 100,
            url: B.source_url || "",
            originalUrl: B.source_url || "",
            thumbnailUrl: B.src_thumbnail_url || B.rendered_image_url || "",
            threeDFormat: B.source_format || "glb",
            threeDFiles: (G = B.lod_assets) == null ? void 0 : G.map(z => ({
              format: z.format,
              url: z.url,
              fileName: z.level
            })),
            remoteTaskId: A,
            falModelPath: k.falModelPath || N.falModelPath,
            errorMsg: ""
          } : N;
        })), v.sourceNodeId && _(F => F.map(N => N.id === v.sourceNodeId && N.type === "gen-3d" ? {
          ...N,
          content: B.rendered_image_url || B.src_thumbnail_url || N.content,
          thumbnailUrl: B.src_thumbnail_url || B.rendered_image_url || N.thumbnailUrl,
          isGenerating: !1,
          errorMsg: "",
          settings: j(N.settings, B)
        } : N)), Ie(async () => {
          const {
            persistThreeDAssetsToOss: F
          } = await Promise.resolve().then(() => zmr);
          return {
            persistThreeDAssetsToOss: F
          };
        }, void 0, import.meta.url).then(({
          persistThreeDAssetsToOss: F
        }) => F(B, `3d-${v.id}`).then(N => {
          N && (s(G => G.map(z => z.id === v.id ? {
            ...z,
            url: N.modelUrl || z.url,
            originalUrl: N.modelUrl || z.originalUrl,
            thumbnailUrl: N.displayUrl,
            _ossThumbnailUrl: N.displayUrl,
            _ossRemoteUrl: N.remoteThumbUrl || N.displayUrl,
            ossUploaded: !0,
            _globalOssUrlOnly: !0
          } : z)), v.sourceNodeId && _(G => G.map(z => z.id === v.sourceNodeId && z.type === "gen-3d" ? {
            ...z,
            content: N.displayUrl || z.content,
            thumbnailUrl: N.displayUrl || z.thumbnailUrl,
            settings: {
              ...j(z.settings, N.meta),
              _ossThumbnailUrl: N.displayUrl,
              _ossRemoteUrl: N.remoteThumbUrl || N.displayUrl,
              _ossModelUrl: N.modelUrl,
              _ossUrlOnlyMode: !0
            }
          } : z)));
        }));
      } catch (R) {
        const j = R instanceof Error ? R.message : "3D 刷新失败";
        s(B => B.map(F => F.id === v.id ? {
          ...F,
          status: "failed",
          progress: 0,
          errorMsg: j
        } : F)), v.sourceNodeId && _(B => B.map(F => F.id === v.sourceNodeId && F.type === "gen-3d" ? {
          ...F,
          isGenerating: !1,
          errorMsg: j
        } : F));
      }
    }, [e, o, i, t, s]),
    b = g.useCallback(async v => {
      var T, P, R;
      const {
          setNodes: _
        } = KO(o, i),
        {
          recoverFalImageHistoryItem: w,
          refreshFalImageHistory: k
        } = await Ie(async () => {
          const {
            recoverFalImageHistoryItem: j,
            refreshFalImageHistory: B
          } = await Promise.resolve().then(() => b0r);
          return {
            recoverFalImageHistoryItem: j,
            refreshFalImageHistory: B
          };
        }, void 0, import.meta.url);
      let A = w(v);
      _(j => {
        const B = v.sourceNodeId ? j.find(N => N.id === v.sourceNodeId) : j.find(N => {
          var G;
          return (G = N.settings) == null ? void 0 : G.falImageRequestId;
        });
        if (A = w(v, B == null ? void 0 : B.settings), !v.sourceNodeId && !B) return j;
        const F = v.sourceNodeId || (B == null ? void 0 : B.id);
        return j.map(N => N.id === F ? {
          ...N,
          isGenerating: !0,
          errorMsg: ""
        } : N);
      });
      const S = String(A.remoteTaskId || "").trim(),
        C = String(((T = A.apiConfig) == null ? void 0 : T.modelId) || v.modelName || "").trim(),
        I = e.find(j => j.id === C || j.provider === v.modelName),
        E = IU(I, t) || String(((P = A.apiConfig) == null ? void 0 : P.apiKey) || "").trim(),
        M = String((I == null ? void 0 : I.url) || ((R = A.apiConfig) == null ? void 0 : R.baseUrl) || Bne).replace(/\/+$/, "");
      if (!E) {
        v.sourceNodeId && _(j => j.map(B => B.id === v.sourceNodeId ? {
          ...B,
          isGenerating: !1
        } : B)), alert(x("无法刷新：缺少 API Key"));
        return;
      }
      s(j => j.map(B => B.id === v.id ? {
        ...B,
        status: "generating",
        progress: 12,
        errorMsg: "",
        remoteTaskId: S,
        falModelPath: A.falModelPath || B.falModelPath,
        apiConfig: A.apiConfig || B.apiConfig
      } : B));
      try {
        const j = await k(A, {
            apiKey: E,
            baseUrl: M
          }),
          B = j.urls,
          F = B[0] || "";
        if (!F) throw new Error("任务仍在处理，请稍后再刷新");
        s(N => N.map(G => G.id === v.id ? {
          ...G,
          status: "completed",
          progress: 100,
          url: F,
          mjImages: B.length > 1 ? B : G.mjImages,
          remoteTaskId: j.requestId || S,
          falModelPath: j.falModelPath || A.falModelPath || G.falModelPath,
          errorMsg: ""
        } : G)), v.sourceNodeId && _(N => N.map(G => G.id === v.sourceNodeId ? {
          ...G,
          content: F,
          isGenerating: !1,
          errorMsg: ""
        } : G.type === "preview" && a.some(z => z.from === v.sourceNodeId && z.to === G.id) ? {
          ...G,
          content: F,
          previewMjImages: B.length > 1 ? B : G.previewMjImages
        } : G));
      } catch (j) {
        const B = j instanceof Error ? j.message : "Fal 图片刷新失败";
        s(F => F.map(N => N.id === v.id ? {
          ...N,
          status: "failed",
          progress: 0,
          errorMsg: B
        } : N)), v.sourceNodeId && _(F => F.map(N => N.id === v.sourceNodeId ? {
          ...N,
          isGenerating: !1,
          errorMsg: B
        } : N));
      }
    }, [e, o, a, i, t, s]);
  return {
    handleRefreshVideo: d,
    handleRefreshAudio: u,
    handleRefresh3d: y,
    handleRefreshFalImage: b,
    handleRefreshComfyTask: h,
    handleRefreshNanoBanana: m,
    autoRefreshRhComfyOnMount: p,
    autoRefreshInFlightImageTasksOnMount: f
  };
}

function lO(e) {
  const t = String(e || "").trim();
  return t.startsWith("blob:") ? /^blob:https?:\/\//i.test(t) : !1;
}

async function qke(e) {
  if (!e) return "";
  if (Er.isContentRef(e)) try {
    const t = await Er.get(Er.extractId(e));
    return t ? t.startsWith("data:image") && t.length > 2 * 1024 * 1024 ? NS(t) : t : "";
  } catch {
    return "";
  }
  return e.startsWith("data:image") && e.length > 2 * 1024 * 1024 ? NS(e) : e;
}

function U_i(e, t) {
  var n;
  return typeof t._localCacheAssetId == "string" && t._localCacheAssetId.trim() || typeof t._contentAssetId == "string" && t._contentAssetId.trim() || typeof t._assetId == "string" && t._assetId.trim() || ((n = e._contentAssetId) == null ? void 0 : n.trim()) || "";
}

function $_i(e) {
  return typeof e.colorAdjustLocalAssetId == "string" ? e.colorAdjustLocalAssetId.trim() : "";
}

function G_i(e) {
  return typeof e.rembgLocalAssetId == "string" ? e.rembgLocalAssetId.trim() : "";
}

function ist(e) {
  return G$(e) || Vh(e) || "";
}

function V_i(e, t) {
  if (S0(e) || Oue(e) || t[Cl]) return !0;
  const n = typeof t._ossRemoteUrl == "string" ? t._ossRemoteUrl.trim() : "";
  if (n && nr(n)) return !0;
  const r = typeof e.content == "string" ? e.content.trim() : "";
  return !!(r && nr(r) || (typeof t._materialLibraryPath == "string" ? t._materialLibraryPath.trim() : "") && (t[Cl] || S0(e)));
}

function H_i(e) {
  const t = Go(e) || EHe(e);
  return t ? ya(t) || t : e;
}

async function Acn(e) {
  const t = typeof e._materialLibraryPath == "string" ? e._materialLibraryPath.trim() : "";
  if (!t) return "";
  try {
    const {
        getMaterialBackupOssOriginalUrl: n
      } = await Ie(async () => {
        const {
          getMaterialBackupOssOriginalUrl: s
        } = await Promise.resolve().then(() => vHe);
        return {
          getMaterialBackupOssOriginalUrl: s
        };
      }, void 0, import.meta.url),
      r = n(t);
    if (r && nr(r)) return ya(r) || r;
    const {
        getMaterialLibraryRemoteOriginalUrl: a
      } = await Ie(async () => {
        const {
          getMaterialLibraryRemoteOriginalUrl: s
        } = await Promise.resolve().then(() => U1);
        return {
          getMaterialLibraryRemoteOriginalUrl: s
        };
      }, void 0, import.meta.url),
      i = {
        id: t,
        path: t,
        name: t.replace(/^.*[/\\]/, "") || "image.png",
        kind: "image"
      },
      o = await a(i);
    if (o && nr(o)) return ya(o) || o;
  } catch {}
  return "";
}

async function DUe(e, t) {
  const n = e.settings || {},
    a = !!(typeof n.colorAdjustOriginal == "string" ? n.colorAdjustOriginal.trim() : ""),
    i = $_i(n),
    o = Oue(e),
    s = U_i(e, n);
  let l = "";
  if (a && i) try {
    const w = await lM(i);
    w && (l = w);
  } catch {}
  const d = typeof n._historySelectedOriginalUrl == "string" ? n._historySelectedOriginalUrl.trim() : "";
  if (!l && d && (l = ya(d) || d), !l && !a && V_i(e, n)) {
    try {
      await sLe();
    } catch {}
    const w = ist(e);
    w && (l = ya(w) || w);
  }
  if (!l && !a) {
    const w = await Acn(n);
    w && (l = w);
  }
  if (!l && s && !a && !o && ei()) try {
    const {
      localCacheManager: w
    } = await Ie(async () => {
      const {
        localCacheManager: E
      } = await Promise.resolve().then(() => Ha);
      return {
        localCacheManager: E
      };
    }, void 0, import.meta.url);
    await w.ensureRestored();
    let k = null;
    if (w.isAvailable() && w.hasAsset(s) && (k = await w.getConvertFileSrcForAsset(s)), !k) {
      const E = (await lM(s)) || (await Ipt(s, (t == null ? void 0 : t.displayHintUrl) || ""));
      E && (vs(E) || !lO(E)) && (k = E);
    }
    const A = [t == null ? void 0 : t.displayHintUrl, typeof e.content == "string" ? e.content : ""].map(E => String(E || "").trim()).find(E => lO(E)) || "";
    A && Il(A, s);
    const S = typeof n._localDiskFileName == "string" ? n._localDiskFileName.trim() : "",
      C = S || e.prompt || "",
      I = (k && vs(k) ? k : null) || (k && !lO(k) ? k : null) || A || jU(s);
    return {
      id: e.id,
      url: jU(s),
      type: "image",
      originalUrl: I,
      prompt: C,
      title: S || void 0,
      preferDisplayUrls: !1,
      _assetId: s
    };
  } catch {}
  if (!l && s && !a && !o) try {
    const w = (await lM(s)) || (await Ipt(s, (t == null ? void 0 : t.displayHintUrl) || ""));
    w && (l = w, w.startsWith("blob:") && Il(w, s));
  } catch {}
  if (!l && e.content) {
    const w = String(e.content);
    !(lO(w) && !Nd(w)) && !(ei() && s && lO(w)) && (l = await qke(w));
  }
  if (!l && (t != null && t.displayHintUrl)) {
    const w = t.displayHintUrl;
    !(lO(w) && !Nd(w)) && !(ei() && s && lO(w)) && (l = await qke(w));
  }
  const u = G_i(n);
  if (!l && u) try {
    const w = await lM(u);
    w && (l = w);
  } catch {}
  if (!l && !a) {
    const w = ist(e);
    w && (l = ya(w) || w);
  }
  if (!l) return null;
  if (!a && l && nr(l) && (/\/thumbnails\//i.test(l) || /-list\.(webp|jpe?g|png)(?:$|\?)/i.test(l))) {
    try {
      const {
        hydrateGlobalOssUploadDedupFromSqlite: w
      } = await Ie(async () => {
        const {
          hydrateGlobalOssUploadDedupFromSqlite: k
        } = await Promise.resolve().then(() => mIt);
        return {
          hydrateGlobalOssUploadDedupFromSqlite: k
        };
      }, void 0, import.meta.url);
      await w();
    } catch {}
    try {
      await sLe();
    } catch {}
    l = H_i(l);
  }
  l.startsWith("data:image") && (l = NS(l));
  const h = ist(e) || (await Acn(n)) || "",
    p = !a && l && nr(l) && !/\/thumbnails\//i.test(l) && !/-list\.(webp|jpe?g|png)(?:$|\?)/i.test(l) ? l : "",
    m = a ? void 0 : d || h || p || void 0,
    f = !a && (h || p) ? ya(h || p) || h || p : l,
    y = a && i || void 0,
    b = a && !y || !!(s && l && Fwe(l, s)),
    v = typeof n._localDiskFileName == "string" ? n._localDiskFileName.trim() : "",
    _ = v || e.prompt || "";
  return {
    id: e.id,
    url: l,
    type: "image",
    originalUrl: f,
    prompt: _,
    title: v || void 0,
    preferDisplayUrls: b || o && m ? !0 : void 0,
    _ossRemoteUrl: a ? void 0 : m,
    _globalOssUrlOnly: a ? void 0 : o || S0(e) || void 0,
    _assetId: a ? y : o ? void 0 : s || void 0
  };
}

const Adr = Object.freeze(Object.defineProperty({
    __proto__: null,
    buildInputImageLightboxPayload: DUe,
    isEphemeralSessionBlobUrl: lO,
    resolveInputImageContentForLightbox: qke
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  Sdr = 48 * 1024;

function ukt(e) {
  return e >= Sdr;
}

async function vje(e, t) {
  if (!e || !e.size) return !1;
  const n = (t || e.type || "").toLowerCase();
  if (n.startsWith("image/") || e.size < Sdr) return !1;
  if (n.startsWith("video/") && e.size >= 256 * 1024) return !0;
  const r = new Uint8Array(await e.slice(0, 12).arrayBuffer());
  return r.length >= 8 && r[4] === 102 && r[5] === 116 && r[6] === 121 && r[7] === 112 || r.length >= 4 && r[0] === 26 && r[1] === 69 && r[2] === 223 && r[3] === 163 || r[0] === 71 ? !0 : e.size >= 512 * 1024 && n.startsWith("video/");
}

function Idr(e, t) {
  if (t !== "video") return !1;
  const n = String(e || "").trim();
  return /^https?:\/\//i.test(n) ? n.includes("/videos/") || /\.(mp4|webm|mov|m4v)(\?|$)/i.test(n.split("?")[0] || "") : !1;
}

function SJe(e, t) {
  if (t !== "image") return !1;
  const n = String(e || "").trim();
  return /^https?:\/\//i.test(n) ? n.includes("/images/") && !/\/thumbnails\//i.test(n) : !1;
}

function Cdr(e, t, n) {
  if (!SJe(e, "image") || (n || t.type || "").toLowerCase() !== "image/webp") return !1;
  const a = String(e || "").split("?")[0] || "";
  return /\.(png|jpe?g|gif|bmp)(\?|$)/i.test(a);
}

const W_i = Object.freeze(Object.defineProperty({
    __proto__: null,
    isOssOriginalUrlWithPreviewWebpBlob: Cdr,
    isPlausibleVideoDownloadBlob: vje,
    isPlausibleVideoDownloadSize: ukt,
    shouldPreferNetworkImageDownload: SJe,
    shouldPreferNetworkVideoDownload: Idr
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  q_i = {
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "image/webp": ".webp",
    "image/gif": ".gif",
    "video/mp4": ".mp4",
    "video/webm": ".webm",
    "audio/mpeg": ".mp3",
    "audio/mp3": ".mp3",
    "audio/wav": ".wav"
  };

function Edr(e, t, n) {
  const r = s_(e);
  if (/\.[a-zA-Z0-9]{2,5}$/.test(r)) return r;
  const a = t ? q_i[(t.type || "").toLowerCase()] : void 0;
  return a ? `${r}${a}` : `${r}${{
    image: ".png",
    video: ".mp4",
    audio: ".mp3"
  }[n]}`;
}

function hkt(e) {
  const t = String(e || "").trim();
  if (!t || !vs(t)) return null;
  try {
    if (t.startsWith("asset:")) {
      const a = t.replace(/^asset:\/\//i, ""),
        i = a.indexOf("/"),
        o = i >= 0 ? a.slice(i) : a;
      let s = decodeURIComponent(o).replace(/\\/g, "/");
      return s.startsWith("/") && /^\/[A-Za-z]:/.test(s) && (s = s.slice(1)), s || null;
    }
    const n = new URL(t);
    let r = decodeURIComponent(n.pathname || "").replace(/\\/g, "/");
    return r.startsWith("/") && /^\/[A-Za-z]:/.test(r) && (r = r.slice(1)), r || null;
  } catch {
    return null;
  }
}

async function K_i() {
  var s;
  const {
      join: e,
      documentDir: t
    } = await Ie(async () => {
      const {
        join: l,
        documentDir: d
      } = await Promise.resolve().then(() => wT);
      return {
        join: l,
        documentDir: d
      };
    }, void 0, import.meta.url),
    {
      mkdir: n,
      exists: r
    } = await Ie(async () => {
      const {
        mkdir: l,
        exists: d
      } = await Promise.resolve().then(() => oc);
      return {
        mkdir: l,
        exists: d
      };
    }, void 0, import.meta.url),
    a = typeof window < "u" && ((s = localStorage.getItem("qiaodoumayi_download_directory")) == null ? void 0 : s.trim()) || "",
    i = !!a && (a.startsWith("/") || /^[A-Za-z]:[/\\]/.test(a) || a.startsWith("\\\\"));
  let o;
  if (i) o = a;else {
    const l = await t();
    o = await e(l, a || "AIYOUPLUS_Media");
  }
  return (await r(o)) || (await n(o, {
    recursive: !0
  })), o;
}

async function yFt(e, t) {
  const {
      join: n
    } = await Ie(async () => {
      const {
        join: h
      } = await Promise.resolve().then(() => wT);
      return {
        join: h
      };
    }, void 0, import.meta.url),
    {
      writeFile: r,
      exists: a,
      remove: i
    } = await Ie(async () => {
      const {
        writeFile: h,
        exists: p,
        remove: m
      } = await Promise.resolve().then(() => oc);
      return {
        writeFile: h,
        exists: p,
        remove: m
      };
    }, void 0, import.meta.url),
    o = await K_i(),
    s = s_(e),
    l = s.lastIndexOf("."),
    d = l > 0 ? s.slice(0, l) : s,
    u = l > 0 ? s.slice(l) : "";
  for (let h = 0;; h++) {
    const p = h ? `${d} (${h})${u}` : s,
      m = await n(o, p);
    try {
      await r(m, new Uint8Array(), {
        createNew: !0
      });
    } catch (f) {
      if (await a(m)) continue;
      throw f;
    }
    try {
      return await t(m), {
        path: m,
        filename: p,
        folder: o
      };
    } catch (f) {
      throw await i(m).catch(() => {}), f;
    }
  }
}

async function Q_i(e, t, n) {
  const {
      copyFile: r,
      exists: a
    } = await Ie(async () => {
      const {
        copyFile: s,
        exists: l
      } = await Promise.resolve().then(() => oc);
      return {
        copyFile: s,
        exists: l
      };
    }, void 0, import.meta.url),
    i = String(e || "").trim();
  if (!i) throw new Error("本地文件路径为空");
  if (!(await a(i))) throw new Error("本地文件不存在");
  const o = Edr(t, null, n);
  return yFt(o, s => r(i, s));
}

function S1(e) {
  const t = String(e || "").trim();
  if (!t.startsWith("local-asset://")) return null;
  const n = t.slice(14).trim();
  if (!n) return null;
  try {
    return decodeURIComponent(n) || null;
  } catch {
    return n || null;
  }
}

function n7(e) {
  const t = String(e || "").trim();
  if (!t) return !1;
  const n = t.replace(/\\/g, "/").toLowerCase();
  return !!(n.includes("/thumbnails/") || /(?:^|\/)thumbnails\//.test(n));
}

function Y_i(e, t, n) {
  if (t === e || t.startsWith(`${e}_`)) return !0;
  if (!n) return !1;
  const r = n.replace(/\\/g, "/").toLowerCase(),
    a = e.toLowerCase(),
    i = a.slice(0, Math.min(8, a.length)),
    o = a.slice(Math.max(0, a.length - 6));
  return !!(i && r.includes(i) || o && r.includes(o));
}

async function X_i(e, t) {
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
      isThumbnailAssetId: r
    } = await Ie(async () => {
      const {
        isThumbnailAssetId: s
      } = await Promise.resolve().then(() => Ui);
      return {
        isThumbnailAssetId: s
      };
    }, void 0, import.meta.url);
  if (await n.ensureRestored(), !n.isAvailable()) {
    const s = hkt(t);
    return s && !n7(s) ? s : null;
  }
  let a = String(e || "").trim() || S1(t) || "";
  if (a && r(a) && a.startsWith("preview_")) {
    const s = a.slice(8).trim();
    s && n.hasAsset(s) && (a = s);
  }
  const i = async s => {
    if (!s || !n.hasAsset(s) || r(s)) return null;
    const l = n.getAssetManifestMeta(s);
    if (n7(l == null ? void 0 : l.fileName)) return null;
    const d = await n.getAssetSourcePath(s);
    return !d || n7(d) ? null : d;
  };
  if (a) {
    const s = await i(a);
    if (s) return s;
    const l = [];
    for (const d of n.getCachedAssetIds()) {
      if (r(d)) continue;
      const u = n.getAssetManifestMeta(d);
      if (!Y_i(a, d, u == null ? void 0 : u.fileName) || n7(u == null ? void 0 : u.fileName)) continue;
      const h = ((u == null ? void 0 : u.fileName) || "").replace(/\\/g, "/");
      h && !h.startsWith("images/") && !h.startsWith("local/") && !h.startsWith("videos/") && !h.startsWith("audio/") || l.push({
        key: d,
        sizeHint: Number((u == null ? void 0 : u.size) || 0)
      });
    }
    l.sort((d, u) => u.sizeHint - d.sizeHint);
    for (const d of l.slice(0, 6)) {
      const u = await i(d.key);
      if (u) return u;
    }
  }
  const o = hkt(t);
  return o && !n7(o) ? o : null;
}

async function LUe(e) {
  if (!us()) return null;
  const t = String(e.url || "").trim(),
    n = String(e.assetId || "").trim() || S1(t) || "";
  let r = null;
  try {
    r = await X_i(n, t);
  } catch {
    r = null;
  }
  if (!r) return null;
  try {
    return await Q_i(r, e.filename, e.type);
  } catch (a) {
    return console.warn("[Download] 本地直拷失败，将回退 Blob 通道:", a), null;
  }
}

function pkt(e, t) {
  const n = String(e || "").trim();
  return !/^https?:\/\//i.test(n) || vs(n) ? !1 : t === "audio" ? /\.mp3(\?|$)/i.test(n.split("?")[0] || "") : !0;
}

async function wje(e, t) {
  if (!us()) return null;
  const n = String(e || "").trim();
  if (!/^https?:\/\//i.test(n) || vs(n)) return null;
  const r = s_(t),
    {
      invoke: a
    } = await Ie(async () => {
      const {
        invoke: i
      } = await Promise.resolve().then(() => sd);
      return {
        invoke: i
      };
    }, void 0, import.meta.url);
  try {
    let i = 0;
    return {
      ...(await yFt(r, async s => {
        var u, h, p;
        const l = await a("download_url_to_file_batch", {
            args: {
              items: [{
                url: n,
                path: s
              }],
              concurrency: 1
            }
          }),
          d = (u = l == null ? void 0 : l.succeeded) == null ? void 0 : u.find(m => m.path === s || m.url === n);
        if (!d || d.bytes <= 0) throw new Error(((p = (h = l == null ? void 0 : l.failed) == null ? void 0 : h[0]) == null ? void 0 : p.error) || "下载失败");
        i = d.bytes;
      })),
      bytes: i
    };
  } catch (i) {
    const o = i instanceof Error ? i.message : String(i);
    if (/unknown command|command .+ not found|not allowed/i.test(o)) return null;
    throw i instanceof Error ? i : new Error(o);
  }
}

async function J_i(e, t) {
  if (e.startsWith("blob:") || e.startsWith("data:")) {
    const r = await fetch(e, {
      cache: "no-store"
    });
    if (!r.ok) throw new Error("读取本地资源失败");
    return r.blob();
  }
  if (vs(e)) {
    const r = await fetch(e, {
      cache: "no-store"
    });
    if (!r.ok) throw new Error(`本地资源读取失败 HTTP ${r.status}`);
    return r.blob();
  }
  if (e.startsWith("http://") || e.startsWith("https://")) return QWn(e, t === "video" || t === "audio" ? 12e4 : 6e4);
  const n = await fetch(e, {
    cache: "no-store"
  });
  if (!n.ok) throw new Error(`HTTP ${n.status}`);
  return n.blob();
}

function Z_i(e, t) {
  const n = URL.createObjectURL(e),
    r = document.createElement("a");
  r.href = n, r.download = t, document.body.appendChild(r), r.click(), r.remove(), URL.revokeObjectURL(n);
}

async function fG(e, t, n) {
  try {
    if (!e.size) throw new Error("文件为空");
    const r = Edr(t, e, n);
    if (us()) {
      const {
          writeFile: a
        } = await Ie(async () => {
          const {
            writeFile: s
          } = await Promise.resolve().then(() => oc);
          return {
            writeFile: s
          };
        }, void 0, import.meta.url),
        i = new Uint8Array(await e.arrayBuffer()),
        o = await yFt(r, s => a(s, i));
      return {
        ok: !0,
        path: o.path,
        hint: `已保存到「${o.folder}」`,
        filename: o.filename
      };
    }
    return Z_i(e, r), {
      ok: !0,
      hint: "已交给浏览器下载",
      filename: r
    };
  } catch (r) {
    return {
      ok: !1,
      error: r instanceof Error ? r.message : String(r) || "下载失败"
    };
  }
}

async function bFt(e, t, n, r) {
  try {
    const a = String(e || "").trim();
    if (!a) throw new Error("没有可下载的地址");
    if (us()) {
      const s = await LUe({
        url: a,
        assetId: r == null ? void 0 : r.assetId,
        filename: t,
        type: n
      });
      if (s) return {
        ok: !0,
        path: s.path,
        hint: `已保存到「${s.folder}」`,
        filename: s.filename
      };
    }
    let i = null;
    const o = String((r == null ? void 0 : r.assetId) || "").trim() || S1(a) || "";
    if (o && n === "image") try {
      const {
        readLocalOriginalAssetBlob: s
      } = await Ie(async () => {
        const {
          readLocalOriginalAssetBlob: l
        } = await Promise.resolve().then(() => Ui);
        return {
          readLocalOriginalAssetBlob: l
        };
      }, void 0, import.meta.url);
      i = await s(o, void 0, {
        allowPreviewFallback: !1
      });
    } catch {
      i = null;
    }
    if (!i) {
      if (n7(a)) throw new Error("本地原图不可用，请重试或检查资源缓存目录");
      i = await J_i(a, n);
    }
    return fG(i, t, n);
  } catch (a) {
    return {
      ok: !1,
      error: (a instanceof Error ? a.message : String(a)) || "下载失败"
    };
  }
}

const Cpe = Object.freeze(Object.defineProperty({
    __proto__: null,
    absolutePathFromTauriAssetUrl: hkt,
    canSaveUserDownloadOffThread: pkt,
    downloadBlobToUserFolder: fG,
    downloadLightboxToUserFolder: bFt,
    isLocalCacheThumbnailPathOrUrl: n7,
    parseLocalAssetIdFromUrl: S1,
    tryCopyLocalAssetToUserDownloadFolder: LUe,
    trySaveHttpUrlToUserDownloadFolder: wje
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  eki = 132,
  tki = 56,
  nki = 128,
  OUe = 260,
  Tdr = 96,
  Mdr = .35,
  Pdr = 4.5,
  rki = 1.08,
  aki = .92;

function IJe(e, t = eki, n = tki, r = nki) {
  const a = Number(e == null ? void 0 : e.width),
    i = Number(e == null ? void 0 : e.height);
  if (!(a > 0) || !(i > 0)) return {
    width: r,
    height: r
  };
  const o = t / Math.max(a, i);
  return {
    width: Math.max(n, Math.round(a * o)),
    height: Math.max(n, Math.round(i * o))
  };
}

function HQ(e, t) {
  const n = Math.max(0, t - 1),
    r = typeof e == "number" ? e : Number(e);
  return Number.isFinite(r) ? Math.max(0, Math.min(Math.floor(r), n)) : 0;
}

function iki(e) {
  return Number.isFinite(e) ? Math.min(Pdr, Math.max(Mdr, e)) : 1;
}

function Rdr(e, t) {
  return iki(e * (t > 0 ? aki : rki));
}

function oki(e) {
  const t = [],
    n = new Set();
  for (const r of e) {
    const a = String(r.label || "贴图").trim() || "贴图",
      i = Array.isArray(r.tileScenes) ? r.tileScenes.reduce((u, h, p) => {
        const m = String((h == null ? void 0 : h.url) || "").trim();
        return m && u.push({
          id: (h == null ? void 0 : h.id) || `${r.id}-stored-${p}`,
          label: String((h == null ? void 0 : h.label) || `${a} ${p + 1}`).trim() || `${a} ${p + 1}`,
          url: m,
          thumbnailUrl: (h == null ? void 0 : h.thumbnailUrl) || m,
          width: h == null ? void 0 : h.width,
          height: h == null ? void 0 : h.height,
          sourceNodeId: (h == null ? void 0 : h.sourceNodeId) || r.id
        }), u;
      }, []) : [],
      o = Array.isArray(r.images) ? r.images.filter(u => typeof u == "string" && !!u.trim()) : [],
      s = String(r.imageUrl || "").trim(),
      l = String(r.thumbnailUrl || "").trim(),
      d = i.length ? i : o.length ? o.map((u, h) => ({
        id: `${r.id}-batch-${h}`,
        label: o.length > 1 ? `${a} ${h + 1}` : a,
        url: u,
        thumbnailUrl: l || u,
        sourceNodeId: r.id
      })) : s ? [{
        id: `${r.id}-single`,
        label: a,
        url: s,
        thumbnailUrl: l || s,
        sourceNodeId: r.id
      }] : [];
    for (const u of d) {
      const h = `${u.url}::${u.label}`;
      n.has(h) || (n.add(h), t.push(u));
    }
  }
  return t;
}

function ost(e) {
  return e.map(t => `${t.id}::${t.label}::${t.url}::${t.thumbnailUrl || ""}::${t.width || 0}::${t.height || 0}::${t.sourceNodeId || ""}`).join("|");
}

function ski(e, t) {
  const n = HQ(t, e.length),
    r = e[n] || null;
  return {
    tileScenes: e.map(a => ({
      id: a.id,
      label: a.label,
      url: a.url,
      thumbnailUrl: a.thumbnailUrl,
      width: a.width,
      height: a.height,
      sourceNodeId: a.sourceNodeId
    })),
    tileSceneIndex: r ? n : 0,
    imageUrl: (r == null ? void 0 : r.url) || "",
    thumbnailUrl: (r == null ? void 0 : r.thumbnailUrl) || (r == null ? void 0 : r.url) || "",
    images: e.map(a => a.url),
    generated: e.length > 0
  };
}

function lki(e, t) {
  return JSON.stringify(e) === JSON.stringify(t);
}

function vFt(e, t) {
  return {
    tileScenes: Array.isArray(e == null ? void 0 : e.tileScenes) ? e == null ? void 0 : e.tileScenes : [],
    tileSceneIndex: Number(e == null ? void 0 : e.tileSceneIndex) || 0,
    imageUrl: String((e == null ? void 0 : e.imageUrl) || t || ""),
    thumbnailUrl: String((e == null ? void 0 : e.thumbnailUrl) || ""),
    images: Array.isArray(e == null ? void 0 : e.images) ? e == null ? void 0 : e.images : [],
    generated: !!(e != null && e.generated)
  };
}

function wFt(e) {
  return `url("${String(e).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}")`;
}

const Ndr = 8192;

function cki(e, t = 1, n = Ndr) {
  const r = Number.isFinite(t) && t > 0 ? t : 1;
  let a = Math.max(1, Math.round(e.width * r)),
    i = Math.max(1, Math.round(e.height * r)),
    o = Math.max(1, Math.round(e.tileW * r)),
    s = Math.max(1, Math.round(e.tileH * r)),
    l = e.origin.x * r,
    d = e.origin.y * r;
  const u = Math.max(a, i);
  if (u > n) {
    const h = n / u;
    a = Math.max(1, Math.round(a * h)), i = Math.max(1, Math.round(i * h)), o = Math.max(1, Math.round(o * h)), s = Math.max(1, Math.round(s * h)), l *= h, d *= h;
  }
  return {
    width: a,
    height: i,
    tileW: o,
    tileH: s,
    origin: {
      x: l,
      y: d
    }
  };
}

function mkt(e, t, n, r = Ndr) {
  const a = Math.max(1, Math.round(t)),
    i = Math.max(1, Math.round(n)),
    o = Math.max(1, e.tileW),
    s = Math.max(1, e.tileH),
    l = a / o,
    d = i / s;
  return cki({
    width: e.width * l,
    height: e.height * d,
    tileW: a,
    tileH: i,
    origin: {
      x: e.origin.x * l,
      y: e.origin.y * d
    }
  }, 1, r);
}

function dki(e) {
  const t = vFt(e.settings, e.content),
    n = t.tileScenes[HQ(t.tileSceneIndex, t.tileScenes.length)] || null,
    r = IJe(n),
    a = Math.max(1, Math.round(Number(e.width) || 360)),
    i = Math.max(1, Math.round(Number(e.height) || 280));
  return {
    width: a,
    height: i,
    tileW: r.width,
    tileH: r.height,
    origin: jdr(a, i, r.width, r.height)
  };
}

function Scn(e, t) {
  return !(t > 0) || !Number.isFinite(e) ? 0 : e - Math.ceil(Math.max(0, e) / t) * t;
}

function jdr(e, t, n, r) {
  return {
    x: (e - n) / 2,
    y: (t - r) / 2
  };
}

function uki(e, t, n, r, a, i, o) {
  const s = Scn(o.x, n),
    l = Scn(o.y, r);
  for (let d = l; d < i; d += r) for (let u = s; u < a; u += n) e.drawImage(t, u, d, n, r);
}

function hki(e, t) {
  var a;
  const n = [],
    r = new Set();
  for (const i of mv(e, t)) {
    if (i.inputType && i.inputType !== "default") continue;
    const o = (a = i.fromGroupNodeIds) != null && a.length ? i.fromGroupNodeIds : [i.from];
    for (const s of o) !s || r.has(s) || (r.add(s), n.push(s));
  }
  return n;
}

function pki(e) {
  return Array.isArray(e) ? e.filter(t => typeof t == "string" && !!t.trim()) : [];
}

function mki(e) {
  var i, o, s, l, d, u, h, p;
  const t = String(e.nodeName || "贴图").trim() || "贴图";
  if (e.type === "image-tile") return {
    id: e.id,
    label: t,
    tileScenes: Array.isArray((i = e.settings) == null ? void 0 : i.tileScenes) ? (o = e.settings) == null ? void 0 : o.tileScenes : void 0,
    imageUrl: String(((s = e.settings) == null ? void 0 : s.imageUrl) || e.content || ""),
    thumbnailUrl: String(((l = e.settings) == null ? void 0 : l.thumbnailUrl) || e.thumbnailUrl || "")
  };
  if (e.type === "camera-movement" || e.type === "professional-camera" || e.type === "text-node" || e.type === "gen-music" || e.type === "gen-speech" || e.type === "video-input") return {
    id: e.id,
    label: t
  };
  const n = pki((d = e.settings) == null ? void 0 : d.images),
    r = Array.isArray(e.previewMjImages) ? e.previewMjImages.filter(Boolean) : [];
  if (e.type === "preview") return {
    id: e.id,
    label: t,
    images: n.length ? n : r.length > 1 ? r : [],
    imageUrl: String(e.selectedPreviewImage || r[0] || e.content || ""),
    thumbnailUrl: e.thumbnailUrl
  };
  if (e.type === "rh-app") {
    const m = (((u = e.settings) == null ? void 0 : u.generatedImages) || []).map(f => String(f.fullUrl || "").trim()).filter(Boolean);
    return {
      id: e.id,
      label: t,
      images: m.length ? m : n,
      imageUrl: m[0] || e.content || ""
    };
  }
  if (e.type === "canvas-node") return {
    id: e.id,
    label: t,
    imageUrl: e.content || ((h = e.settings) != null && h.canvasData ? `canvas-node:${e.id}` : ""),
    thumbnailUrl: e.thumbnailUrl
  };
  if (e.type === "inpaint-crop" || e.type === "inpaint-stitch") return {
    id: e.id,
    label: t,
    images: n,
    imageUrl: String(e.content || ""),
    thumbnailUrl: e.thumbnailUrl
  };
  let a = "";
  if (e.type === "input-image") a = Vv(e) || "";else if (e.type === "gen-image") a = ((p = Xl(e)) == null ? void 0 : p.url) || "";else {
    if (e.type === "gen-video") return {
      id: e.id,
      label: t
    };
    a = String(e.content || "");
  }
  return {
    id: e.id,
    label: t,
    images: n.length ? n : r.length > 1 ? r : [],
    imageUrl: a,
    thumbnailUrl: e.thumbnailUrl
  };
}

function fki(e, t, n) {
  const r = new Map(t.map(o => [o.id, o])),
    a = hki(n, e),
    i = a.map(o => r.get(o)).filter(o => !!o).map(mki);
  return {
    scenes: oki(i),
    incomingCount: a.length
  };
}

function Icn(e) {
  if (!e) return;
  const t = e.settings || {},
    n = e,
    r = a => typeof a == "string" && a.trim() ? a.trim() : "";
  return r(t._localCacheAssetId) || r(t._assetId) || r(t._contentAssetId) || r(n._contentAssetId) || r(n._selectedImageAssetId) || void 0;
}

function gki(e, t) {
  const n = vFt(e.settings, e.content),
    r = n.tileScenes[HQ(n.tileSceneIndex, n.tileScenes.length)],
    a = String((r == null ? void 0 : r.url) || n.imageUrl || e.content || "").trim();
  if (!a) return null;
  const i = r != null && r.sourceNodeId ? t.find(d => d.id === r.sourceNodeId) : void 0;
  let o = dM(i || e, a, {
      mediaType: "image"
    }),
    s = Icn(i) || Icn(e) || S1(o) || void 0;
  if ((i == null ? void 0 : i.type) === "gen-image") {
    const d = Xl(i);
    if (d != null && d.assetId && (s = s || d.assetId), d != null && d.url) {
      const u = Go(d.url) || d.url;
      (!o || /\/thumbnails\//i.test(o) || o.startsWith("blob:")) && (o = u);
    }
  }
  const l = Go(o) || o;
  return {
    url: l,
    assetIdHint: s || S1(l) || void 0
  };
}

let fkt = null;

function yki(e) {
  fkt = e;
}

function bki() {
  const e = fkt;
  return fkt = null, e;
}

function Ddr(e) {
  return new Promise((t, n) => {
    const r = new Image();
    /^https?:/i.test(e) && (r.crossOrigin = "anonymous"), r.onload = () => t(r), r.onerror = () => n(new Error("tile export load failed")), r.src = e;
  });
}

async function Ccn(e) {
  const t = URL.createObjectURL(e);
  try {
    return await Ddr(t);
  } finally {
    URL.revokeObjectURL(t);
  }
}

async function vki(e, t) {
  const {
      parseLocalAssetIdFromUrl: n
    } = await Ie(async () => {
      const {
        parseLocalAssetIdFromUrl: o
      } = await Promise.resolve().then(() => Cpe);
      return {
        parseLocalAssetIdFromUrl: o
      };
    }, void 0, import.meta.url),
    r = t || n(e) || void 0;
  if (r) {
    const {
        readLocalOriginalAssetBlob: o
      } = await Ie(async () => {
        const {
          readLocalOriginalAssetBlob: l
        } = await Promise.resolve().then(() => Ui);
        return {
          readLocalOriginalAssetBlob: l
        };
      }, void 0, import.meta.url),
      s = await o(r, /^https?:/i.test(e) ? e : void 0, {
        allowPreviewFallback: !1
      });
    if (s != null && s.size) return Ccn(s);
  }
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
    i = await a(e, r);
  if (i != null && i.size) return Ccn(i);
  if (e.startsWith("local-asset://")) throw new Error("tile export missing original asset");
  return Ddr(e);
}

async function wki(e, t, n) {
  const r = gki(e, t);
  if (!(r != null && r.url)) throw new Error("没有可导出的贴图");
  return Ldr(r.url, bki() || dki(e), r.assetIdHint);
}

async function Ldr(e, t, n) {
  const r = await vki(e, n),
    a = mkt(t, r.naturalWidth, r.naturalHeight),
    i = document.createElement("canvas");
  i.width = a.width, i.height = a.height;
  const o = i.getContext("2d");
  if (!o) throw new Error("tile export canvas failed");
  return uki(o, r, a.tileW, a.tileH, a.width, a.height, a.origin), new Promise((s, l) => {
    i.toBlob(d => d ? s(d) : l(new Error("tile export blob failed")), "image/png");
  });
}

function sst(e) {
  if (Yi()) {
    O$(e);
    return;
  }
  e();
}

function Ecn() {
  return vb();
}

async function lst(e) {
  try {
    console.log("[Download] Attempting to use Tauri backend...");
    const {
      invoke: t
    } = await Ie(async () => {
      const {
        invoke: i
      } = await Promise.resolve().then(() => sd);
      return {
        invoke: i
      };
    }, void 0, import.meta.url);
    console.log("[Download] Tauri API imported successfully"), console.log("[Download] Calling Tauri command: download_file_bypass_cors"), console.log("[Download] URL:", e);
    const n = await t("download_file_bypass_cors", {
        url: e
      }),
      r = n instanceof ArrayBuffer ? new Uint8Array(n) : n instanceof Uint8Array ? n : Array.isArray(n) ? Uint8Array.from(n) : (() => {
        throw new Error("Invalid download response");
      })();
    console.log("[Download] Received bytes from Tauri:", r.length);
    const a = new Blob([r]);
    return console.log(`[Download] ✅ Tauri download successful, size: ${(a.size / 1024 / 1024).toFixed(2)}MB`), a;
  } catch (t) {
    throw console.error("[Download] Tauri download failed:", t), t;
  }
}

function xki(e) {
  const t = e.trim();
  return t ? !!(t.startsWith("/") || /^[A-Za-z]:[/\\]/.test(t) || t.startsWith("\\\\")) : !1;
}

async function Tcn(e, t) {
  var u;
  const n = oc,
    r = wT,
    a = (u = localStorage.getItem("qiaodoumayi_download_directory")) == null ? void 0 : u.trim();
  let i;
  if (a && xki(a)) i = a, console.log("[SaveFile] Using custom absolute directory:", i);else if (a) {
    const h = await r.documentDir();
    i = await r.join(h, a), console.log("[SaveFile] Using custom relative directory:", i);
  } else {
    const h = await r.documentDir();
    i = await r.join(h, "AIYOUPLUS_Media"), console.log("[SaveFile] Using default directory:", i);
  }
  (await n.exists(i)) || (console.log("[SaveFile] Creating directory:", i), await n.mkdir(i, {
    recursive: !0
  }));
  const s = await r.join(i, t);
  console.log("[SaveFile] Target file path:", s);
  const l = await e.arrayBuffer(),
    d = new Uint8Array(l);
  return await n.writeFile(s, d), console.log("[SaveFile] ✅ File saved successfully via Tauri:", s), i;
}

async function xMe(e, t) {
  const n = s_(t);
  try {
    return console.log("[SaveFile] Attempting to use Tauri file system API"), await Tcn(e, n);
  } catch (r) {
    const a = n.match(/(\.[^.]+)$/),
      i = (a == null ? void 0 : a[1]) ?? "",
      o = s_(`download_${Date.now()}${i}`, 40);
    try {
      return console.warn("[SaveFile] Retrying with short filename after error:", r), await Tcn(e, o);
    } catch (d) {
      console.error("[SaveFile] Tauri failed, using browser download. Error:", d);
    }
    const s = URL.createObjectURL(e),
      l = document.createElement("a");
    return l.href = s, l.download = n, document.body.appendChild(l), l.click(), document.body.removeChild(l), URL.revokeObjectURL(s), console.log("[SaveFile] ✅ Browser download triggered"), "";
  }
}

async function _ki(e) {
  return await Ecn(), new Promise((t, n) => {
    const r = new Image();
    r.crossOrigin = "anonymous";
    const a = setTimeout(() => {
      n(new Error("Image loading timeout"));
    }, 3e4);
    r.onload = () => {
      clearTimeout(a), Ecn().then(() => {
        try {
          const i = document.createElement("canvas");
          i.width = r.width, i.height = r.height;
          const o = i.getContext("2d");
          if (!o) throw new Error("Failed to get canvas context");
          o.drawImage(r, 0, 0), i.toBlob(s => {
            s ? t(s) : n(new Error("Failed to create blob from canvas"));
          }, "image/png");
        } catch (i) {
          n(i);
        }
      }, n);
    }, r.onerror = () => {
      clearTimeout(a), n(new Error("Failed to load image"));
    }, r.src = e;
  });
}

function Odr(e) {
  const t = e.split(";")[0].trim().toLowerCase();
  if (!t.startsWith("image/")) return null;
  const n = t.slice(6).split("+")[0];
  return n === "jpeg" || n === "jpg" || n === "pjpeg" ? "jpg" : n === "svg+xml" || n === "svg" ? "svg" : /^[a-z0-9]+$/.test(n) ? n : null;
}

function Bdr(e) {
  const t = /\.([a-zA-Z0-9]+)$/.exec(e.split("?")[0] || "");
  if (!t) return null;
  let n = t[1].toLowerCase();
  return n === "jpeg" && (n = "jpg"), new Set(["jpg", "png", "webp", "gif", "bmp", "svg", "avif", "heic", "heif"]).has(n) ? n : null;
}

function Mcn(e, t) {
  const n = gkt(t);
  return n ? `${e.replace(/\.[^.]+$/, "")}.${n}` : e;
}

function gkt(e) {
  try {
    if (e.startsWith("data:")) {
      const n = e.indexOf(";"),
        r = n > 5 ? e.slice(5, n) : "";
      return Odr(r);
    }
    const t = e.split("?")[0].split("/").pop() || "";
    return Bdr(t);
  } catch {
    return null;
  }
}

async function Pcn(e) {
  if (e.size < 12) return null;
  const t = await e.slice(0, 16).arrayBuffer(),
    n = new Uint8Array(t);
  return n[0] === 255 && n[1] === 216 && n[2] === 255 ? "jpg" : n[0] === 137 && n[1] === 80 && n[2] === 78 && n[3] === 71 ? "png" : n[0] === 71 && n[1] === 73 && n[2] === 70 ? "gif" : n[0] === 82 && n[1] === 73 && n[2] === 70 && n[3] === 70 && n[8] === 87 && n[9] === 69 && n[10] === 66 && n[11] === 80 ? "webp" : null;
}

async function kki(e) {
  const t = l => l ? Odr(l) : null;
  if (SJe(e.sourceUrl, "image")) {
    const l = gkt(e.sourceUrl);
    if (l) return l;
    const d = await Pcn(e.blob);
    if (d) return d;
    const u = t(e.responseMime);
    if (u) return u;
    const h = t(e.blob.type);
    return h || null;
  }
  const n = t(e.cacheReadMime);
  if (n) return n;
  let r = null;
  e.assetIdHint && Ur.hasAsset(e.assetIdHint) && (r = Ur.getAssetManifestMeta(e.assetIdHint));
  const a = t(r == null ? void 0 : r.mimeType);
  if (a) return a;
  const i = await Pcn(e.blob);
  if (i) return i;
  if (r != null && r.fileName) {
    const l = r.fileName.split("/").pop() || r.fileName,
      d = Bdr(l);
    if (d) return d;
  }
  const o = t(e.blob.type);
  if (o) return o;
  const s = t(e.responseMime);
  if (s) return s;
  if (e.assetIdHint) {
    const {
        assetStore: l
      } = await Ie(async () => {
        const {
          assetStore: h
        } = await Promise.resolve().then(() => Ri);
        return {
          assetStore: h
        };
      }, void 0, import.meta.url),
      d = await l.getAssetRecord(e.assetIdHint),
      u = t(d == null ? void 0 : d.mimeType);
    if (u) return u;
  }
  return gkt(e.sourceUrl);
}

const Rcn = {
  image: 6e4,
  video: 18e4,
  audio: 18e4
};

function Ncn(e, t, n, r) {
  return new Promise((a, i) => {
    let o = 0;
    const s = window.setTimeout(() => {
      window.clearInterval(o), i(new Error(`${n}超时（${Math.round(t / 1e3)}秒）`));
    }, t);
    o = window.setInterval(() => {
      r() && (window.clearTimeout(s), window.clearInterval(o), i(new Error("下载已取消")));
    }, 150), e.then(l => {
      window.clearTimeout(s), window.clearInterval(o), a(l);
    }, l => {
      window.clearTimeout(s), window.clearInterval(o), i(l);
    });
  });
}

function Aki({
  nodes: e,
  connections: t,
  selectedNodeId: n,
  selectedNodeIds: r,
  setNodes: a,
  setIsDownloading: i,
  setDownloadProgress: o,
  setLightboxItem: s,
  setLightboxOpen: l,
  onDownloadStart: d,
  onDownloadProgress: u,
  onDownloadComplete: h,
  onDownloadError: p,
  getCancellationToken: m,
  startDownload: f
}) {
  const y = g.useRef(0),
    b = g.useCallback(() => {
      y.current += 1, i(!1), o({
        current: 0,
        total: 0
      });
    }, [i, o]),
    v = g.useCallback(S => {
      var C;
      return S !== y.current || !!((C = m == null ? void 0 : m()) != null && C.isCancelled);
    }, [m]),
    _ = g.useCallback(() => {
      sst(() => {
        i(!1), o({
          current: 0,
          total: 0
        });
      });
    }, [i, o]),
    w = g.useCallback(async S => {
      var Y, K;
      const C = S == null || typeof S != "object" ? null : S instanceof Set ? S : Array.isArray(S) ? new Set(S.map(W => String(W || "").trim()).filter(Boolean)) : null,
        I = C ? new Set(C) : r.size > 0 ? new Set(r) : n ? new Set([n]) : new Set(),
        E = e.filter(W => I.has(W.id));
      if (E.length === 0) {
        p == null || p(C ? "当前节点没有可下载的图片、视频或音频" : "请先选中要下载的节点");
        return;
      }
      const M = ++y.current;
      f == null || f(E.length), i(!0);
      const {
          resolveNodeDownloadUrl: T
        } = await Ie(async () => {
          const {
            resolveNodeDownloadUrl: W
          } = await Promise.resolve().then(() => ii);
          return {
            resolveNodeDownloadUrl: W
          };
        }, void 0, import.meta.url),
        P = W => t.filter(Q => Q.to === W).map(Q => e.find(q => q.id === Q.from)).filter(Q => Q != null),
        R = [],
        j = W => /\.(mp3|wav|ogg|m4a|aac|flac)(\?|$)/i.test((W || "").split("?")[0]) || (W || "").startsWith("data:audio"),
        B = [],
        F = [];
      E.forEach((W, Q) => {
        var q, ne, de, le, J, pe;
        if (W.type === "preview") {
          const ce = P(W.id),
            we = W.settings || {},
            X = we._isStoryboardMosaic && typeof we._stitchedFullUrl == "string" ? we._stitchedFullUrl.trim() : "",
            Z = (fe, ye) => {
              if (!fe) return;
              const ie = W.previewType === "audio" || j(fe),
                ae = W.previewType === "video" || fe.includes(".mp4") || fe.includes("video"),
                be = ie ? "audio" : ae ? "video" : "image",
                Ee = T(W, fe, {
                  upstreamNodes: ce,
                  mediaType: be,
                  imageIndex: ye
                });
              R.push({
                url: Ee,
                node: W,
                nodeIndex: Q,
                fileIndex: ye,
                extension: ie ? "mp3" : ae ? "mp4" : "png",
                type: be
              });
            };
          if (X) {
            Z(X);
            return;
          }
          const re = W.previewMjImages || [];
          if (re.length > 0) re.forEach((fe, ye) => Z(fe, ye));else if (W.selectedPreviewImage) Z(W.selectedPreviewImage);else if (W.content) Z(W.content);else for (const fe of ce) if ((fe.type === "topaz-upscale" || fe.type === "jimeng-super-resolution" || fe.type === "image-wash" || fe.type === "fal-rembg" || fe.type === "virtual-try-on") && typeof fe.content == "string" && fe.content.trim()) {
            Z(fe.content);
            break;
          }
        } else if ((W.type === "topaz-upscale" || W.type === "jimeng-super-resolution" || W.type === "image-wash" || W.type === "fal-rembg" || W.type === "virtual-try-on") && W.content) {
          const ce = W.previewType === "video" || String(((q = W.settings) == null ? void 0 : q.previewType) || "").toLowerCase() === "video" || W.content.includes(".mp4") || W.content.includes("video"),
            we = ce ? "video" : "image",
            X = W.settings || {},
            Z = W,
            re = String(X._localCacheAssetId || X._contentAssetId || X._assetId || Z._contentAssetId || S1(W.content) || "").trim();
          let fe = T(W, W.content, {
            mediaType: we
          });
          re && ei() && Ur.isAvailable() && !/^https?:\/\//i.test(fe) ? fe = `local-asset://${encodeURIComponent(re)}` : re && Ur.isAvailable() && (fe.startsWith("blob:") || fe.startsWith("data:") || n7(fe) || vs(fe)) && (fe = `local-asset://${encodeURIComponent(re)}`), R.push({
            url: fe,
            node: W,
            nodeIndex: Q,
            extension: ce ? "mp4" : "png",
            type: we,
            assetIdHint: re || void 0
          });
        } else if (W.type === "input-image" && W.content) {
          const ce = (ne = W.settings) == null ? void 0 : ne.mediaType,
            we = ce === "audio" || j(W.content),
            X = ce === "video",
            Z = we ? "audio" : X ? "video" : "image",
            re = W.settings || {},
            fe = Z === "image" && typeof re.editImageCommittedPreview == "string" ? String(re.editImageCommittedPreview).trim() : "";
          let ie = (Z === "image" && typeof re.editImageCommittedOssRemote == "string" ? String(re.editImageCommittedOssRemote).trim() : "") || fe || T(W, W.content, {
            mediaType: Z
          });
          const ae = String(re._localCacheAssetId || re._contentAssetId || re._assetId || S1(ie) || S1(W.content) || "").trim();
          ae && Ur.isAvailable() && (ie.startsWith("blob:") || ie.startsWith("data:") || !String(ie || "").trim() || n7(ie) || ei() && !/^https?:\/\//i.test(ie) && vs(ie)) && (ie = `local-asset://${encodeURIComponent(ae)}`), R.push({
            url: ie,
            node: W,
            nodeIndex: Q,
            extension: we ? "mp3" : X ? "mp4" : "png",
            type: Z,
            assetIdHint: ae || void 0
          });
        } else if (W.type === "video-input" && W.content) R.push({
          url: W.content,
          node: W,
          nodeIndex: Q,
          extension: "mp4",
          type: "video",
          assetIdHint: S1(W.content) || void 0
        });else if ((W.type === "generate-character-video" || W.type === "generate-scene-video") && W.content) R.push({
          url: W.content,
          node: W,
          nodeIndex: Q,
          extension: "mp4",
          type: "video",
          assetIdHint: S1(W.content) || void 0
        });else if (W.type === "gen-image" || W.type === "gen-video") {
          const ce = Ij(W),
            we = $It(W);
          we.forEach((X, Z) => {
            const re = String(X.url || "").trim(),
              fe = X.assetId && (!re || re.startsWith("blob:")) ? `local-asset://${encodeURIComponent(X.assetId)}` : re;
            if (!fe) return;
            const ye = (re || fe).split("?")[0] || "",
              ie = /\.(mp4|webm|mov|m4v)(\?|$)/i.test(ye) || W.type === "gen-video" && !/\.(png|jpe?g|webp|gif|bmp|svg)(\?|$)/i.test(ye);
            R.push({
              url: fe,
              node: W,
              nodeIndex: Q,
              fileIndex: we.length > 1 ? Z : void 0,
              extension: ie ? "mp4" : "png",
              type: ie ? "video" : "image",
              assetIdHint: X.assetId || (ce == null ? void 0 : ce.id) || (ce == null ? void 0 : ce._assetId)
            });
          });
        } else if (W.type === "gen-3d" || W.type === "input-image" && String(((de = W.settings) == null ? void 0 : de.mediaType) || "") === "3d") F.push({
          node: W,
          nodeIndex: Q
        });else if ((W.type === "rh-comfy" || W.type === "rh-app") && W.content && j(W.content)) R.push({
          url: W.content,
          node: W,
          nodeIndex: Q,
          extension: "mp3",
          type: "audio"
        });else if ((W.type === "generate-scene-image" || W.type === "generate-character-image") && ((le = W.settings) != null && le.imageUrls)) W.settings.imageUrls.forEach((we, X) => {
          we && R.push({
            url: we,
            node: W,
            nodeIndex: Q,
            fileIndex: X,
            extension: "png",
            type: "image"
          });
        });else if (W.type === "image-tile") B.push({
          node: W,
          nodeIndex: Q
        });else if (W.content) {
          const ce = S1(W.content),
            we = ce ? Ur.getAssetManifestMeta(ce) : null,
            X = j(W.content) || !!((J = we == null ? void 0 : we.mimeType) != null && J.startsWith("audio/")),
            Z = W.content.includes(".mp4") || W.content.includes("video") || W.content.includes(".webm") || !!((pe = we == null ? void 0 : we.mimeType) != null && pe.startsWith("video/")) || !!(we != null && we.fileName && /(?:^|\/)videos\//i.test(we.fileName)),
            re = X ? "audio" : Z ? "video" : "image",
            fe = T(W, W.content, {
              mediaType: re
            });
          R.push({
            url: fe,
            node: W,
            nodeIndex: Q,
            extension: X ? "mp3" : Z ? "mp4" : "png",
            type: re,
            assetIdHint: ce || void 0
          });
        }
      });
      let N = !1,
        G = !1;
      for (const W of F) try {
        const {
            buildThreeDDownloadBlob: Q
          } = await Ie(async () => {
            const {
              buildThreeDDownloadBlob: X
            } = await Promise.resolve().then(() => rso);
            return {
              buildThreeDDownloadBlob: X
            };
          }, void 0, import.meta.url),
          {
            isThreedMeta: q
          } = await Ie(async () => {
            const {
              isThreedMeta: X
            } = await Promise.resolve().then(() => YLn);
            return {
              isThreedMeta: X
            };
          }, void 0, import.meta.url),
          ne = (Y = W.node.settings) == null ? void 0 : Y.threedMeta;
        if (!q(ne)) {
          G = !0;
          continue;
        }
        const {
            toastLoading: de,
            updateToast: le,
            removeToast: J
          } = await Ie(async () => {
            const {
              toastLoading: X,
              updateToast: Z,
              removeToast: re
            } = await Promise.resolve().then(() => Hia);
            return {
              toastLoading: X,
              updateToast: Z,
              removeToast: re
            };
          }, void 0, import.meta.url),
          {
            pickThreeDMeshDisplayUrl: pe
          } = await Ie(async () => {
            const {
              pickThreeDMeshDisplayUrl: X
            } = await Promise.resolve().then(() => tFi);
            return {
              pickThreeDMeshDisplayUrl: X
            };
          }, void 0, import.meta.url),
          ce = pe(ne, W.node.settings, ne.source_url),
          we = de("正在下载 3D 模型…", 0);
        try {
          const X = await Q(ce && ce !== ne.source_url ? {
            ...ne,
            source_url: ce,
            source_format: ne.source_format || "glb"
          } : ne, W.node.nodeName || ne.display_name || "3D模型", {
            onProgress: ({
              percent: re,
              label: fe
            }) => {
              le(we, {
                message: fe,
                progress: re
              });
            }
          });
          J(we);
          const Z = X.fileName.toLowerCase().endsWith(".zip") ? "zip" : "glb";
          R.push({
            url: "",
            readyBlob: X.blob,
            node: W.node,
            nodeIndex: W.nodeIndex,
            extension: Z,
            type: "image"
          });
        } catch (X) {
          throw J(we), X;
        }
      } catch (Q) {
        G = !0, console.error("[Download] 3D 模型打包失败", Q);
      }
      for (const W of B) try {
        const Q = await wki(W.node, e);
        R.push({
          url: "",
          readyBlob: Q,
          node: W.node,
          nodeIndex: W.nodeIndex,
          extension: "png",
          type: "image"
        });
      } catch (Q) {
        N = !0, console.error("[Download] 平铺效果导出失败", Q);
      }
      if (R.length === 0) {
        p == null || p(N ? "平铺效果导出失败" : G ? "3D 模型打包失败" : "选中的节点中没有可下载的图片、视频或音频"), _();
        return;
      }
      if (v(M)) {
        _();
        return;
      }
      const z = [];
      for (const W of R) {
        const Q = await p9(W.node, W.nodeIndex, W.fileIndex, W.extension, W.readyBlob ? void 0 : W.url);
        let q = W.readyBlob ? void 0 : W.assetIdHint;
        const ne = W.node,
          de = W.node.settings || {};
        if (W.node.type === "preview" && de._isStoryboardMosaic && typeof de._stitchedFullUrl == "string") q = typeof de._contentAssetId == "string" && de._contentAssetId.trim() || ne._contentAssetId || q;else if (!q && typeof W.fileIndex == "number" && W.fileIndex >= 0) {
          const J = ne._previewMjAssetIds;
          J && J[W.fileIndex] && (q = J[W.fileIndex]);
        }
        if (!q && !W.readyBlob) {
          const J = W.node.settings || {},
            pe = ce => typeof ce == "string" && ce.trim() ? ce.trim() : "";
          q = pe(J._localCacheAssetId) || pe(J._assetId) || pe(J._contentAssetId) || pe(ne._selectedImageAssetId) || pe(ne._contentAssetId) || S1(W.url) || S1(typeof W.node.content == "string" ? W.node.content : "") || void 0;
        }
        const le = (K = W.node.settings) == null ? void 0 : K._compactOriginalRelPath;
        z.push({
          url: W.url,
          name: Q,
          type: W.type,
          assetIdHint: q,
          compactLocalRelPathHint: le,
          readyBlob: W.readyBlob
        });
      }
      if (v(M)) {
        _();
        return;
      }
      f == null || f(z.length), i(!0), sst(() => o({
        current: 0,
        total: z.length
      })), d == null || d(z.length);
      let V = 0,
        O = 0,
        L = 0;
      const D = async (W, Q) => {
        var de;
        if (v(M)) return "";
        const q = L,
          ne = () => q !== L || v(M);
        try {
          let le = W.readyBlob || null,
            J = W.url,
            pe,
            ce;
          if (le) {
            const ye = await xMe(le, W.name);
            return ne() ? "" : (V++, u == null || u(Q + 1, z.length, W.name), ye || "");
          }
          if (/^https?:\/\//i.test(J)) {
            const {
              resolvePreviewDownloadUrl: ye
            } = await Ie(async () => {
              const {
                resolvePreviewDownloadUrl: ie
              } = await Promise.resolve().then(() => ii);
              return {
                resolvePreviewDownloadUrl: ie
              };
            }, void 0, import.meta.url);
            J = ye(J, {
              mediaType: W.type
            });
          }
          if (Er.isContentRef(W.url)) {
            const ye = Er.extractId(W.url);
            console.log(`[Download] 从 IndexedDB 获取内容: ${ye}`);
            const ie = await Er.get(ye);
            if (ie) J = ie, console.log(`[Download] ✅ 成功获取内容，长度: ${ie.length}`);else throw console.error(`[Download] ❌ 内容未找到: ${ye}`), new Error(`内容未找到: ${ye}`);
          }
          const we = ((de = W.assetIdHint) == null ? void 0 : de.trim()) || S1(J) || void 0,
            X = Idr(J, W.type) || SJe(J, W.type) || W.type === "image" && /\/thumbnails\//i.test(J) && nr(J) && !vs(J),
            Z = !!(we && /^preview_[^_]+_(?:img\d+|selected|video\d+|selected_video|\d+)/i.test(we));
          if (!X && !Z) {
            const ye = await LUe({
              url: J,
              assetId: we,
              filename: W.name,
              type: W.type
            });
            if (ye) return ne() ? "" : (console.log(`[Download] ✅ 本地缓存磁盘直拷: ${ye.filename}`), V++, u == null || u(Q + 1, z.length, ye.filename), ye.folder);
          }
          if (!le && pkt(J, W.type)) {
            const ye = W.type === "image" ? Mcn(W.name, J) : W.name,
              ie = await wje(J, ye);
            if (ie) {
              if (W.type === "video" && !ukt(ie.bytes)) throw new Error(`视频 "${ye}" 数据无效（${(ie.bytes / 1024).toFixed(1)}KB），可能下载到了封面缩略图或错误页，请重试`);
              return ne() ? "" : (console.log(`[Download] ✅ 后台写盘: ${ye}`), V++, u == null || u(Q + 1, z.length, ye), ie.folder);
            }
          }
          if (!X && !Z && we && Ur.isAvailable()) try {
            if (W.type === "image") {
              const {
                  readLocalOriginalAssetBlob: ye
                } = await Ie(async () => {
                  const {
                    readLocalOriginalAssetBlob: ae
                  } = await Promise.resolve().then(() => Ui);
                  return {
                    readLocalOriginalAssetBlob: ae
                  };
                }, void 0, import.meta.url),
                ie = await ye(we, /^https?:\/\//i.test(J) ? J : void 0, {
                  allowPreviewFallback: !1
                });
              ie != null && ie.size && (le = ie, pe = ie.type || void 0, console.log(`[Download] 从本地缓存原图读取: ${W.name}`));
            } else if (Ur.hasAsset(we)) {
              const ye = await Ur.readAsset(we, {
                allowVideoBlob: W.type === "video" || W.type === "audio"
              });
              ye && (W.type === "video" && !(await vje(ye.blob, ye.mimeType)) ? console.warn(`[Download] 本地缓存非有效视频(${(ye.blob.size / 1024).toFixed(1)}KB)，改从网络下载: ${W.name}`) : (le = ye.blob, pe = ye.mimeType, console.log(`[Download] 从本地缓存目录读取: ${W.name}`)));
            }
          } catch (ye) {
            console.warn("[Download] 读取本地缓存失败，退回其他通道:", ye);
          } else X && console.log(`[Download] OSS 原链优先网络下载: ${W.name}`);
          if (!le && W.type === "image" && W.assetIdHint) try {
            const {
                readPreviewWindowAssetOriginalUrl: ye
              } = await Ie(async () => {
                const {
                  readPreviewWindowAssetOriginalUrl: ae
                } = await Promise.resolve().then(() => Ui);
                return {
                  readPreviewWindowAssetOriginalUrl: ae
                };
              }, void 0, import.meta.url),
              ie = await ye(W.assetIdHint, J);
            ie && (le = await fetch(ie).then(ae => ae.blob()), console.log(`[Download] 从预览原图 asset 读取: ${W.name}`));
          } catch {}
          if (!le && J.startsWith("data:")) le = await (await fetch(J)).blob();else if (!le && J.startsWith("blob:")) {
            if (W.type === "image") {
              const {
                  readPreviewWindowAssetOriginalUrl: ye
                } = await Ie(async () => {
                  const {
                    readPreviewWindowAssetOriginalUrl: be
                  } = await Promise.resolve().then(() => Ui);
                  return {
                    readPreviewWindowAssetOriginalUrl: be
                  };
                }, void 0, import.meta.url),
                {
                  getFullBlobForDisplayUrl: ie
                } = await Ie(async () => {
                  const {
                    getFullBlobForDisplayUrl: be
                  } = await Promise.resolve().then(() => No);
                  return {
                    getFullBlobForDisplayUrl: be
                  };
                }, void 0, import.meta.url),
                ae = W.assetIdHint ? await ye(W.assetIdHint, J) : null;
              ae && (le = await fetch(ae).then(be => be.blob())), le || (le = (await ie(J, W.assetIdHint, W.compactLocalRelPathHint)) ?? (await fetch(J).then(Ee => Ee.blob())));
            } else le = await fetch(J).then(ye => ye.blob());
          } else if (!le && /^https?:\/\//i.test(J) && !vs(J)) {
            let ye = null;
            if (!X) {
              const {
                assetStore: ie
              } = await Ie(async () => {
                const {
                  assetStore: ae
                } = await Promise.resolve().then(() => Ri);
                return {
                  assetStore: ae
                };
              }, void 0, import.meta.url);
              if (ye = await ie.getAssetBlob(J), !ye) {
                const ae = [J, J.split("?")[0], J.replace(/^https?:\/\//, "")];
                for (const be of ae) if (ye = await ie.getAssetBlob(be), ye) break;
              }
              !ye && W.assetIdHint && (ye = await ie.getAssetBlob(W.assetIdHint)), !ye && (J.includes("prod-ss-vidu") || J.includes("prod-sa-vidu") || J.includes("amazonaws") && J.includes("vidu")) && (ye = await ie.getAssetBlobByRemoteUrl(J));
            }
            if (ye && (W.type === "video" && !(await vje(ye)) ? console.warn(`[Download] IndexedDB 缓存非有效视频(${(ye.size / 1024).toFixed(1)}KB)，改从网络下载: ${W.name}`) : (console.log(`[Download] 从缓存获取: ${W.name}`), le = ye)), !le) {
              console.log(`[Download] 从网络下载: ${J}`);
              try {
                const ie = W.type === "video" || W.type === "audio",
                  ae = J.includes("prod-ss-vidu") || J.includes("prod-sa-vidu") || J.includes("amazonaws") && J.includes("vidu");
                if (ie || ae) try {
                  const {
                    downloadWithFallback: be
                  } = await Ie(async () => {
                    const {
                      downloadWithFallback: Ee
                    } = await Promise.resolve().then(() => El);
                    return {
                      downloadWithFallback: Ee
                    };
                  }, void 0, import.meta.url);
                  le = await be(J, 12e4), !le.type && W.type === "video" ? le = new Blob([await le.arrayBuffer()], {
                    type: "video/mp4"
                  }) : !le.type && W.type === "audio" && (le = new Blob([await le.arrayBuffer()], {
                    type: "audio/mpeg"
                  })), console.log(`[Download] ✅ Tauri后端下载成功: ${W.name}`);
                } catch (be) {
                  throw console.warn("[Download] Tauri video/audio download failed, trying fallback:", be), be;
                } else try {
                  le = await lst(J), console.log(`[Download] ✅ Tauri后端下载成功: ${W.name}`);
                } catch (be) {
                  throw console.warn("[Download] Tauri backend failed, falling back to fetch:", be), be;
                }
              } catch {
                try {
                  const ae = await fetch(J, {
                    mode: "cors",
                    credentials: "omit"
                  });
                  if (!ae.ok) throw new Error(`HTTP ${ae.status}: ${ae.statusText}`);
                  ce = ae.headers.get("content-type") || void 0, le = await ae.blob(), console.log(`[Download] ✅ CORS下载成功: ${W.name}, 大小: ${(le.size / 1024 / 1024).toFixed(2)}MB`);
                } catch (ae) {
                  console.warn("[Download] CORS fetch failed, trying no-cors mode:", ae);
                  try {
                    if (le = await (await fetch(J, {
                      mode: "no-cors"
                    })).blob(), le.size === 0) throw console.warn("[Download] no-cors mode returned empty blob, trying alternative method"), new Error("no-cors returned empty blob");
                    console.log(`[Download] ✅ 使用no-cors模式下载成功: ${W.name}`);
                  } catch (be) {
                    if (console.error("[Download] no-cors fetch also failed:", be), W.type === "video" || W.type === "audio") throw console.log(`[Download] ${W.type === "audio" ? "Audio" : "Video"} CORS blocked, opening in new tab for manual download`), window.open(J, "_blank"), new Error(`${W.type === "audio" ? "音频" : "视频"} "${W.name}" 因服务器限制无法自动下载，已在新标签页打开，请手动保存`);
                    console.log(`[Download] Trying image element method for: ${J}`);
                    try {
                      le = await _ki(J);
                    } catch (Ee) {
                      throw console.error("[Download] Image element method failed:", Ee), window.open(J, "_blank"), new Error(`图片 "${W.name}" 因服务器限制无法自动下载，已在新标签页打开，请手动保存`);
                    }
                  }
                }
              }
            }
          } else if (!le && J.startsWith("local-asset://")) {
            const ye = we || S1(J);
            if (!ye) throw new Error("本地资源 ID 无效");
            try {
              const ie = await Ur.readAssetAsUrl(ye);
              if (ie) {
                const ae = await fetch(ie, {
                  cache: "no-store"
                });
                if (!ae.ok) throw new Error(`HTTP ${ae.status}`);
                le = await ae.blob(), ce = ae.headers.get("content-type") || void 0, console.log(`[Download] ✅ local-asset convertFileSrc 读取: ${W.name}`);
              }
            } catch (ie) {
              throw console.error(`[Download] ❌ local-asset 下载失败: ${ye}`, ie), new Error(`本地缓存资源不可用: ${ye}`);
            }
            if (!le) throw new Error(`本地缓存资源不可用: ${ye}`);
          } else {
            if (!le && vs(J)) throw new Error("本地原文件不可用，请重试或检查资源缓存目录");
            if (!le) throw console.error(`[Download] ❌ 无效的 URL 格式: ${J.substring(0, 50)}...`), new Error("无效的 URL 格式");
          }
          if (!le) throw new Error("无法获取文件数据");
          if (W.type === "image" && Cdr(J, le, pe || ce)) {
            console.warn(`[Download] OSS images/ 原图误命中 WebP 预览，改从网络重下: ${W.name}`);
            const ye = Mcn(W.name, J),
              ie = await wje(J, ye);
            if (ie) return ne() ? "" : (V++, u == null || u(Q + 1, z.length, ye), ie.folder);
            pe = void 0;
            try {
              le = await lst(J), ce = le.type || void 0;
            } catch {
              const ae = await fetch(J, {
                mode: "cors",
                credentials: "omit"
              });
              if (!ae.ok) throw new Error(`HTTP ${ae.status}: ${ae.statusText}`);
              ce = ae.headers.get("content-type") || void 0, le = await ae.blob();
            }
          }
          if (W.type === "video" && !(await vje(le, pe))) throw new Error(`视频 "${W.name}" 数据无效（${(le.size / 1024).toFixed(1)}KB），可能下载到了封面缩略图或错误页，请重试`);
          if (W.type === "audio") {
            const ye = await Yer(le);
            if (ye) {
              le = ye;
              const ie = W.name.replace(/\.[^.]+$/, "") + ".mp3",
                ae = await xMe(le, ie);
              return ne() ? "" : (V++, u == null || u(Q + 1, z.length, ie), Q === z.length - 1 && ae ? ae : void 0);
            }
          }
          let re = W.name;
          if (W.type === "image") {
            const ye = await kki({
              blob: le,
              assetIdHint: W.assetIdHint,
              cacheReadMime: pe,
              responseMime: ce,
              sourceUrl: J
            });
            ye && (re = `${W.name.replace(/\.[^.]+$/, "")}.${ye}`);
          }
          const fe = await xMe(le, re);
          if (ne()) return "";
          if (V++, u == null || u(Q + 1, z.length, re), Q === z.length - 1 && fe) return fe;
        } catch (le) {
          if (ne()) return "";
          console.error(`下载失败: ${W.name}`, le), O++;
          const J = le instanceof Error ? le.message : String(le);
          J.includes("CORS") || J.includes("服务器限制") ? console.log(`[Download] CORS error for ${W.name}, user notified`) : console.error(`[Download] Unexpected error for ${W.name}:`, J), u == null || u(Q + 1, z.length, W.name);
        }
        return "";
      };
      let U = "",
        H = null;
      try {
        for (let W = 0; W < z.length; W++) {
          if (v(M)) {
            console.log("[Download] 下载已取消");
            break;
          }
          const Q = z[W];
          try {
            const q = await Ncn(D(Q, W), Rcn[Q.type], Q.name, () => v(M));
            q && (U = q);
          } catch (q) {
            if (L += 1, v(M)) break;
            console.error(`下载失败: ${Q.name}`, q), O++, u == null || u(W + 1, z.length, Q.name);
          }
          W < z.length - 1 && !v(M) && (await new Promise(q => setTimeout(q, 0)));
        }
      } catch (W) {
        H = W instanceof Error ? W.message : String(W), console.error("[Download] 批量下载异常:", W);
      } finally {
        _(), v(M) ? h == null || h(V, O) : H ? p == null || p(H) : (U && console.log("[Download] All files saved to:", U), h == null || h(V, O));
      }
    }, [e, t, n, r, i, o, d, u, h, p, m, f, v, _]),
    k = g.useCallback(async S => {
      if (S.length === 0) {
        p == null || p("没有可下载的文件");
        return;
      }
      const C = ++y.current;
      f == null || f(S.length), i(!0), sst(() => o({
        current: 0,
        total: S.length
      })), d == null || d(S.length);
      let I = 0,
        E = 0,
        M = 0;
      const T = async R => {
        if (R.startsWith("data:")) return (await fetch(R)).blob();
        if (R.startsWith("blob:")) return (await fetch(R)).blob();
        if (R.startsWith("local-asset://")) {
          const j = S1(R);
          if (!j) throw new Error("本地资源 ID 无效");
          const B = await Ur.readAsset(j, {
            allowVideoBlob: !0
          });
          if (B != null && B.blob) return B.blob;
          const F = await Ur.readAssetAsUrl(j);
          if (!F) throw new Error(`本地缓存资源不可用: ${j}`);
          const N = await fetch(F, {
            cache: "no-store"
          });
          if (!N.ok) throw new Error(`HTTP ${N.status}`);
          return N.blob();
        }
        if (R.startsWith("http://") || R.startsWith("https://")) {
          const {
            assetStore: j
          } = await Ie(async () => {
            const {
              assetStore: F
            } = await Promise.resolve().then(() => Ri);
            return {
              assetStore: F
            };
          }, void 0, import.meta.url);
          let B = await j.getAssetBlob(R);
          if (!B) {
            const F = [R, R.split("?")[0], R.replace(/^https?:\/\//, "")];
            for (const N of F) if (B = await j.getAssetBlob(N), B) break;
          }
          if (B) return B;
          try {
            return await lst(R);
          } catch {
            const F = await fetch(R, {
              mode: "cors",
              credentials: "omit"
            });
            if (!F.ok) throw new Error(`HTTP ${F.status}`);
            return F.blob();
          }
        }
        throw new Error("无效的 URL 格式");
      };
      let P = null;
      try {
        for (let R = 0; R < S.length && !v(C); R++) {
          const j = S[R],
            B = ++M,
            F = /\.(mp3|wav|ogg|m4a|aac|flac)(\?|$)/i.test(j.name) ? "audio" : /\.(mp4|webm|mov|m4v)(\?|$)/i.test(j.name) ? "video" : "image";
          try {
            await Ncn((async () => {
              const N = await LUe({
                url: j.url,
                filename: j.name,
                type: F
              });
              if (B !== M || v(C)) return;
              if (N) {
                I++;
                return;
              }
              if (pkt(j.url, F)) {
                const V = await wje(j.url, j.name);
                if (B !== M || v(C)) return;
                if (V) {
                  if (F === "video" && !ukt(V.bytes)) throw new Error(`视频 "${j.name}" 数据无效（${(V.bytes / 1024).toFixed(1)}KB）`);
                  I++;
                  return;
                }
              }
              const G = await T(j.url);
              if (B !== M || v(C)) return;
              const z = !G.type && (j.name.endsWith(".mp4") || j.name.endsWith(".webm")) ? new Blob([await G.arrayBuffer()], {
                type: "video/mp4"
              }) : G;
              await xMe(z, j.name), !(B !== M || v(C)) && I++;
            })(), Rcn[F], j.name, () => B !== M || v(C));
          } catch (N) {
            if (M += 1, v(C)) break;
            console.error("[Download] 分镜视频下载失败:", j.name, N), E++;
          }
          v(C) || u == null || u(R + 1, S.length, j.name), R < S.length - 1 && !v(C) && (await new Promise(N => setTimeout(N, 0)));
        }
      } catch (R) {
        P = R instanceof Error ? R.message : String(R), console.error("[Download] 批量 URL 下载异常:", R);
      } finally {
        _(), v(C) ? h == null || h(I, E) : P ? p == null || p(P) : h == null || h(I, E);
      }
    }, [i, o, d, u, h, p, m, f, v, _]),
    A = g.useCallback(async S => {
      var P, R, j, B, F, N, G;
      if (S.type === "gen-music" || S.type === "gen-speech") return;
      const C = e.find(z => z.id === S.id);
      if (C && MZ(C)) {
        if (y2e()) return;
        const z = {
            ...C,
            ...(S.content != null ? {
              content: S.content
            } : {}),
            settings: {
              ...(C.settings || {}),
              ...(S.settings || {})
            }
          },
          V = String(z.content || "").trim(),
          O = Zo(z);
        if (!!V || !!O || !!((P = z.settings) != null && P._ossRemoteUrl)) {
          l(!1), s(null);
          const D = K1(z) || (V && !V.startsWith("local-asset://") && !V.startsWith("content_ref:") ? V : "") || O || "",
            U = G6(z, D),
            H = (U.originalUrl && !/\/thumbnails\//i.test(U.originalUrl) ? U.originalUrl : "") || Vp((R = U.entry) == null ? void 0 : R.ossRemoteUrl, (j = U.entry) == null ? void 0 : j.originalUrl, D),
            Y = z.type === "gen-video" || String(((B = z.settings) == null ? void 0 : B.mediaType) || "") === "video";
          if (!Y && H && !/\/thumbnails\//i.test(H)) {
            s({
              id: `${z.id}_lightbox`,
              url: H,
              type: "image",
              originalUrl: H,
              prompt: (z.prompt || "").trim(),
              modelName: String(((F = z.settings) == null ? void 0 : F.modelName) || ((N = z.settings) == null ? void 0 : N.modelId) || ""),
              time: "",
              status: "completed",
              progress: 100,
              _ossRemoteUrl: H,
              _globalOssUrlOnly: !0,
              ossUploaded: !0,
              preferDisplayUrls: !0
            }), l(!0);
            return;
          }
          const K = await Mce(z, {
            displayFallbackUrl: D || void 0,
            isVideoNode: Y
          });
          if (!String(K.url || "").trim() && !String(K.originalUrl || "").trim()) return;
          s(K), l(!0);
          return;
        }
      }
      const I = e.find(z => z.id === S.id);
      if ((I == null ? void 0 : I.type) === "input-image") {
        if (y2e()) return;
        const z = (G = I.settings) == null ? void 0 : G.mediaType;
        if (z !== "video" && z !== "audio") {
          const O = {
              ...I,
              ...(S.content != null ? {
                content: S.content
              } : {}),
              settings: {
                ...(I.settings || {}),
                ...(S.settings || {})
              }
            },
            L = typeof S.content == "string" && S.content.trim() ? S.content.trim() : void 0,
            D = await DUe(O, {
              displayHintUrl: L
            });
          if (D) {
            s(D), l(!0);
            return;
          }
        }
      }
      const E = async (z, V, O, L, D) => {
          let U = String(z || "").trim();
          if (!U) return U;
          if (Er.isContentRef(U)) try {
            await Er.init();
            const H = await Er.get(Er.extractId(U));
            H && (U = H);
          } catch {}
          if (V === "image" && (D == null ? void 0 : D.type) === "preview") {
            const H = Nae(D, 0, U);
            if (H && nr(H)) return H;
          }
          if (V === "image") {
            const {
                readPreviewWindowAssetOriginalUrl: H
              } = await Ie(async () => {
                const {
                  readPreviewWindowAssetOriginalUrl: K
                } = await Promise.resolve().then(() => Ui);
                return {
                  readPreviewWindowAssetOriginalUrl: K
                };
              }, void 0, import.meta.url),
              Y = await H(O ?? void 0, U);
            if (Y) return Y;
          }
          if (V === "image" && U.startsWith("blob:")) {
            const {
                getFullBlobUrlForDisplayUrl: H
              } = await Ie(async () => {
                const {
                  getFullBlobUrlForDisplayUrl: K
                } = await Promise.resolve().then(() => No);
                return {
                  getFullBlobUrlForDisplayUrl: K
                };
              }, void 0, import.meta.url),
              Y = await H(z, O, L);
            if (Y) return Y;
          }
          return U;
        },
        M = (z, V, O) => {
          const L = String(z || "").trim(),
            D = Go(L) || nr(L) && ya(L) || L,
            U = nr(D) ? {
              id: `node_canvas_${S.id}_${Date.now()}`,
              type: V,
              url: D,
              originalUrl: D,
              _ossRemoteUrl: D,
              _globalOssUrlOnly: ua() || !0,
              ossUploaded: !0,
              status: "completed",
              progress: 100,
              prompt: "",
              modelName: "",
              time: ""
            } : {
              url: L,
              type: V,
              preferDisplayUrls: /^https?:\/\//i.test(L) || L.startsWith("blob:") || L.startsWith("data:"),
              ...(O && !L.startsWith("http") ? {
                _assetId: O
              } : {})
            };
          try {
            s(U), l(!0);
          } catch (H) {
            console.error("[handleNodeDoubleClick] Error:", H);
          }
        };
      if (S.content) {
        const z = (q, ne) => {
            var le, J;
            if (((le = ne == null ? void 0 : ne.settings) == null ? void 0 : le.mediaType) === "video") return !0;
            if (!q) return !1;
            if (q.startsWith("data:video") || q.includes("force_video_display=true")) return !0;
            const de = (J = q.split(".").pop()) == null ? void 0 : J.split("?")[0].toLowerCase();
            return ["mp4", "webm", "ogg", "mov"].includes(de || "");
          },
          V = (q, ne) => {
            var le, J;
            if (((le = ne == null ? void 0 : ne.settings) == null ? void 0 : le.mediaType) === "audio") return !0;
            if (!q) return !1;
            if (q.startsWith("data:audio")) return !0;
            const de = (J = q.split(".").pop()) == null ? void 0 : J.split("?")[0].toLowerCase();
            return ["mp3", "wav", "ogg", "m4a", "aac", "flac"].includes(de || "");
          },
          O = e.find(q => q.id === S.id),
          L = z(S.content, O) ? "video" : V(S.content, O) ? "audio" : "image",
          D = O == null ? void 0 : O.settings,
          H = (O ? Gle(O) : null) || ((O == null ? void 0 : O.type) === "gen-image" || (O == null ? void 0 : O.type) === "gen-video" ? Zo(O) : null) || ((O == null ? void 0 : O.type) === "preview" ? Nae(O, 0, S.content) : null) || (typeof (D == null ? void 0 : D.previewOssRemoteUrl) == "string" && /^https?:\/\//i.test(String(D.previewOssRemoteUrl).trim()) ? String(D.previewOssRemoteUrl).trim() : null) || (typeof (D == null ? void 0 : D._ossRemoteUrl) == "string" && /^https?:\/\//i.test(D._ossRemoteUrl.trim()) ? D._ossRemoteUrl.trim() : null),
          Y = H ? Go(H) || H : null;
        if (Y) {
          M(Y, L);
          return;
        }
        const K = D && Object.prototype.hasOwnProperty.call(D, "_contentAssetId") ? typeof D._contentAssetId == "string" && D._contentAssetId ? D._contentAssetId : null : (O == null ? void 0 : O._contentAssetId) ?? null,
          W = D == null ? void 0 : D._compactOriginalRelPath,
          Q = await E(S.content, L, K, W ?? null, O ?? null);
        M(Q, L, K);
        return;
      }
      const T = e.find(z => z.id === S.id);
      if (T && T.content) {
        const z = (Q, q) => {
            var de, le;
            if (((de = q == null ? void 0 : q.settings) == null ? void 0 : de.mediaType) === "video") return !0;
            if (!Q) return !1;
            if (Q.startsWith("data:video") || Q.includes("force_video_display=true")) return !0;
            const ne = (le = Q.split(".").pop()) == null ? void 0 : le.split("?")[0].toLowerCase();
            return ["mp4", "webm", "ogg", "mov"].includes(ne || "");
          },
          V = (Q, q) => {
            var de, le;
            if (((de = q == null ? void 0 : q.settings) == null ? void 0 : de.mediaType) === "audio") return !0;
            if (!Q) return !1;
            if (Q.startsWith("data:audio")) return !0;
            const ne = (le = Q.split(".").pop()) == null ? void 0 : le.split("?")[0].toLowerCase();
            return ["mp3", "wav", "ogg", "m4a", "aac", "flac"].includes(ne || "");
          },
          O = z(T.content, T) ? "video" : V(T.content, T) ? "audio" : "image",
          L = T.settings,
          U = Gle(T) || (T.type === "gen-image" || T.type === "gen-video" ? Zo(T) : null) || (T.type === "preview" ? Nae(T, 0, T.content) : null) || (typeof (L == null ? void 0 : L.previewOssRemoteUrl) == "string" && /^https?:\/\//i.test(String(L.previewOssRemoteUrl).trim()) ? String(L.previewOssRemoteUrl).trim() : null) || (typeof (L == null ? void 0 : L._ossRemoteUrl) == "string" && /^https?:\/\//i.test(L._ossRemoteUrl.trim()) ? L._ossRemoteUrl.trim() : null),
          H = U ? Go(U) || U : null;
        if (H) {
          M(H, O);
          return;
        }
        const Y = L && Object.prototype.hasOwnProperty.call(L, "_contentAssetId") ? typeof L._contentAssetId == "string" && L._contentAssetId ? L._contentAssetId : null : T._contentAssetId ?? null,
          K = L == null ? void 0 : L._compactOriginalRelPath,
          W = await E(T.content, O, Y, K ?? null, T);
        M(W, O, Y);
      } else console.warn("[handleNodeDoubleClick] Node not found or has no content:", S.id);
    }, [e, s, l]);
  return {
    handleDownloadSelected: w,
    handleDownloadUrlList: k,
    handleNodeDoubleClick: A,
    abortDownload: b
  };
}

function Ski({
  cancelDownload: e,
  ...t
}) {
  const n = g.useRef(null),
    r = g.useRef();
  r.current || (r.current = FGn(() => n.current));
  const a = r.current,
    i = Aki({
      ...t,
      onDownloadStart: a.onDownloadStart,
      onDownloadProgress: a.onDownloadProgress,
      onDownloadComplete: a.onDownloadComplete,
      onDownloadError: a.onDownloadError
    });
  return g.useLayoutEffect(() => {
    n.current = {
      loading: Uv,
      update: Q2e,
      remove: gg,
      success: (o, s) => iT(o, {
        duration: s,
        noticeKey: "download"
      }),
      error: (o, s) => iT(o, {
        type: "error",
        duration: s,
        noticeKey: "download"
      }),
      isCancelled: () => {
        var o, s;
        return !!((s = (o = t.getCancellationToken) == null ? void 0 : o.call(t)) != null && s.isCancelled);
      },
      cancel: () => {
        e(), i.abortDownload();
      },
      folderHint: () => tYe(localStorage.getItem("qiaodoumayi_download_directory"), navigator.userAgent)
    };
  }), g.useEffect(() => {
    const o = s => {
      var l;
      return a.close((l = s.detail) == null ? void 0 : l.id);
    };
    return window.addEventListener("qdm-loading-toast-closed", o), () => window.removeEventListener("qdm-loading-toast-closed", o);
  }, [a]), {
    ...i,
    abortActiveDownloadUi: a.abort
  };
}

function Iki({
  view: e,
  canvasRef: t,
  connectingSource: n,
  connectingTarget: r,
  connectingInputType: a,
  setMousePos: i,
  setConnectingSource: o,
  setConnectingTarget: s,
  setConnectingInputType: l,
  setConnections: d,
  setNodes: u,
  nodes: h,
  generateId: p,
  onSingleNodeWireStart: m
}) {
  const f = g.useCallback((A, S) => {
      u(C => {
        const I = C.find(z => z.id === A),
          E = C.find(z => z.id === S);
        if (!I || !E || E.type !== "preview") return C;
        const M = I.settings || {},
          T = (I.prompt || "").trim(),
          P = typeof I.content == "string" ? I.content : "",
          R = typeof I.selectedPreviewImage == "string" ? I.selectedPreviewImage : "",
          j = typeof M.previewActualSize == "string" ? M.previewActualSize : typeof M.previewSize == "string" ? M.previewSize : void 0,
          B = Array.isArray(I.previewMjImages) ? I.previewMjImages : Array.isArray(M.mjImages) ? M.mjImages : [],
          F = R || P || B[0] || "",
          N = I.type === "input-image",
          G = I.type === "gen-image";
        return C.map(z => {
          var V, O;
          return z.id === A ? {
            ...z,
            settings: {
              ...(z.settings || {}),
              selectedPreviewId: S
            }
          } : z.id !== S ? z : N || G ? {
            ...z,
            prompt: T || z.prompt,
            previewType: "image",
            settings: {
              ...(z.settings || {}),
              ...(j ? {
                previewActualSize: j,
                previewSize: j
              } : {}),
              previewSourceModel: M.model || ((V = z.settings) == null ? void 0 : V.previewSourceModel),
              sourceNodeName: I.nodeName || z.nodeName
            }
          } : F ? {
            ...z,
            content: F,
            prompt: T || z.prompt,
            previewType: "image",
            previewMjImages: B.length > 0 ? B : z.previewMjImages,
            settings: {
              ...(z.settings || {}),
              ...(j ? {
                previewActualSize: j,
                previewSize: j
              } : {}),
              previewSourceModel: M.model || ((O = z.settings) == null ? void 0 : O.previewSourceModel),
              sourceNodeName: I.nodeName || z.nodeName
            }
          } : z;
        });
      });
    }, [u]),
    y = g.useRef(r),
    b = g.useRef(a);
  g.useEffect(() => {
    y.current = r, b.current = a;
  }, [r, a]);
  const v = g.useCallback((A, S) => {
      var I;
      A.stopPropagation(), A.preventDefault(), m == null || m();
      const C = (I = t.current) == null ? void 0 : I.getBoundingClientRect();
      if (C) {
        const E = (A.clientX - C.left - e.x) / e.zoom,
          M = (A.clientY - C.top - e.y) / e.zoom;
        i(hD(E, M, e.zoom));
      }
      o(S);
    }, [e, t, i, o, m]),
    _ = g.useCallback((A, S) => {
      var I;
      A.stopPropagation(), A.preventDefault(), m == null || m();
      const C = (I = t.current) == null ? void 0 : I.getBoundingClientRect();
      if (C) {
        const E = (A.clientX - C.left - e.x) / e.zoom,
          M = (A.clientY - C.top - e.y) / e.zoom;
        i(hD(E, M, e.zoom));
      }
      s(S);
    }, [e, t, i, s, m]),
    w = g.useCallback((A, S) => {
      if (A.stopPropagation(), n && n !== S) {
        const C = b.current,
          I = C === "default" || C === "agent_user_input" || C === "agent_meta_prompt";
        d(M => [...(C && !I ? M.filter(P => !(P.to === S && (P.inputType || "default") === C)) : M), {
          id: p(),
          from: n,
          to: S
        }]);
        try {
          window.dispatchEvent(new CustomEvent("nodeConnectionFlash", {
            detail: {
              nodeId: S,
              mode: "commit",
              side: "left"
            }
          }));
        } catch {}
        const E = h.find(M => M.id === S);
        (E == null ? void 0 : E.type) === "preview" && f(n, S), o(null);
      }
      if (r && r !== S) {
        const C = {
          id: p(),
          from: S,
          to: r,
          ...(a && a !== "default" ? {
            inputType: a
          } : {})
        };
        d(E => [...E, C]);
        try {
          window.dispatchEvent(new CustomEvent("nodeConnectionFlash", {
            detail: {
              nodeId: r,
              mode: "commit",
              side: "right"
            }
          }));
        } catch {}
        const I = h.find(E => E.id === r);
        (I == null ? void 0 : I.type) === "preview" && f(S, r), s(null), l(null);
      }
    }, [n, r, a, p, d, h, o, s, l, f]),
    k = g.useCallback((A, S) => {
      A.stopPropagation();
      const C = y.current,
        I = b.current;
      if (C && C !== S) {
        const E = {
          id: p(),
          from: S,
          to: C,
          inputType: I || void 0
        };
        d(I && !(I === "default" || I === "agent_user_input" || I === "agent_meta_prompt") ? P => [...P.filter(j => !(j.to === C && j.inputType === I)), E] : P => [...P, E]);
        try {
          window.dispatchEvent(new CustomEvent("nodeConnectionFlash", {
            detail: {
              nodeId: C,
              mode: "commit",
              side: "left"
            }
          }));
        } catch {}
        const T = h.find(P => P.id === C);
        (T == null ? void 0 : T.type) === "preview" && f(S, C), s(null), l(null);
      }
    }, [p, d, h, s, l, f]);
  return {
    handleStartConnectFromOutput: v,
    handleStartConnectFromInput: _,
    handleConnectToInput: w,
    handleConnectToOutput: k
  };
}

let N1e = [];

function Cki(e) {
  if (e.length === 0) return;
  const t = new Set(N1e.map(n => n.id));
  N1e = N1e.concat(e.filter(n => n.id && !t.has(n.id) && (t.add(n.id), !0)));
}

function ykt(e) {
  if (N1e.length === 0) return e;
  const t = new Set(e.map(r => r.id)),
    n = N1e.filter(r => !t.has(r.id));
  return n.length === 0 ? e : [...e, ...n];
}

function Eki({
  connections: e,
  nodesMap: t,
  dataVersion: n
}) {
  const r = g.useCallback(f => {
      for (const y of mv(e, f)) {
        if (y.to !== f) continue;
        const b = t.get(y.from);
        if (b && (b.type === "video-input" || fcr(b))) return b;
      }
      return null;
    }, [e, t, n]),
    a = g.useCallback(f => {
      for (const y of mv(e, f)) if (y.to === f) {
        const b = t.get(y.from);
        if ((b == null ? void 0 : b.type) === "video-analyze") return b;
      }
      return null;
    }, [e, t, n]),
    i = g.useCallback((f, y) => {
      if (!f || f.length === 0) return [];
      const b = [...f].sort((k, A) => k.time - A.time),
        v = [];
      let _ = [],
        w = b[0].time;
      return b.forEach(k => {
        k.time - w >= y && _.length > 0 ? (v.push([..._]), _ = [k], w = k.time) : _.push(k);
      }), _.length > 0 && v.push(_), v;
    }, []),
    o = g.useCallback(f => {
      const y = ykt(e),
        b = mv(y, f).filter(w => !w.inputType || w.inputType === "default"),
        v = [],
        _ = new Set();
      return b.forEach(w => {
        var A;
        ((A = w.fromGroupNodeIds) != null && A.length ? w.fromGroupNodeIds : [w.from]).forEach(S => {
          var I, E, M;
          if (!S || _.has(S)) return;
          const C = t.get(S);
          if (C && !(C.type === "camera-movement" || C.type === "professional-camera")) if (_.add(S), C.type === "preview") C.selectedPreviewImage ? v.push(C.selectedPreviewImage) : C.previewMjImages && C.previewMjImages.length > 0 ? v.push(C.previewMjImages[0]) : C.content && v.push(C.content);else if (C.type === "canvas-node") C.content ? v.push(C.content) : (I = C.settings) != null && I.canvasData && v.push(`canvas-node:${C.id}`);else if (C.type === "rh-app") {
            const T = (E = C.settings) == null ? void 0 : E.generatedImages;
            T && T.length > 0 ? T.forEach(P => v.push(P.fullUrl)) : C.content && v.push(C.content);
          } else if (C.type === "gen-music" || C.type === "gen-speech") {
            const T = (M = C.settings) == null ? void 0 : M.audioUrl;
            T ? v.push(T) : C.content && v.push(C.content);
          } else if (C.type === "inpaint-crop" || C.type === "inpaint-stitch") C.content && v.push(C.content);else if (C.type === "input-image") {
            const T = Vv(C);
            T && v.push(T);
          } else if (C.type === "gen-image" || C.type === "gen-video") {
            const T = Xl(C);
            T && v.push(T.url);
          } else {
            if (C.type === "text-node") return;
            C.content && v.push(C.content);
          }
        });
      }), v;
    }, [e, t, n]),
    s = g.useCallback(f => {
      const y = ykt(e),
        b = mv(y, f).filter(A => !A.inputType || A.inputType === "default"),
        v = [],
        _ = new Set(),
        w = A => {
          if (!A) return !1;
          if (A.startsWith("data:video/")) return !0;
          if (A.startsWith("data:image/") || A.startsWith("data:audio/")) return !1;
          const S = A.toLowerCase();
          return S.includes(".mp4") || S.includes(".webm") || S.includes(".mov") || S.includes("/v1/videos/");
        },
        k = A => {
          if (!A) return !1;
          if (A.startsWith("data:audio/")) return !0;
          if (A.startsWith("data:video/") || A.startsWith("data:image/")) return !1;
          const S = A.toLowerCase();
          return S.includes(".mp3") || S.includes(".wav") || S.includes(".ogg") || S.includes(".m4a") || S.includes(".aac");
        };
      return b.forEach(A => {
        var C;
        ((C = A.fromGroupNodeIds) != null && C.length ? A.fromGroupNodeIds : [A.from]).forEach(I => {
          var M, T, P, R, j, B, F, N, G, z, V, O;
          if (!I || _.has(I)) return;
          const E = t.get(I);
          if (E && !(E.type === "camera-movement" || E.type === "professional-camera")) if (_.add(I), E.type === "preview") {
            let L, D;
            E.selectedPreviewImage ? (L = E.selectedPreviewImage, D = E._selectedImageAssetId) : (M = E.previewMjImages) != null && M[0] ? (L = E.previewMjImages[0], D = (T = E._previewMjAssetIds) == null ? void 0 : T[0]) : E.content && (L = E.content, D = E._contentAssetId), L && v.push({
              url: L,
              type: E.previewType === "video" ? "video" : "image",
              assetId: D
            });
          } else if (E.type === "canvas-node") {
            const L = E.content ? E.content : (P = E.settings) != null && P.canvasData ? `canvas-node:${E.id}` : void 0,
              D = (R = E.settings) == null ? void 0 : R._assetId;
            L && v.push({
              url: L,
              type: "image",
              assetId: D
            });
          } else if (E.type === "rh-app") {
            const L = (j = E.settings) == null ? void 0 : j.generatedImages;
            L != null && L.length ? L.forEach(D => v.push({
              url: D.fullUrl,
              type: "image",
              assetId: D.assetId
            })) : E.content && v.push({
              url: E.content,
              type: "image",
              assetId: (B = E.settings) == null ? void 0 : B._assetId
            });
          } else if (E.type === "gen-music" || E.type === "gen-speech") {
            const L = ((F = E.settings) == null ? void 0 : F.audioUrl) || (typeof E.content == "string" ? E.content.trim() : ""),
              D = (N = E.settings) == null ? void 0 : N._audioAssetId;
            L && v.push({
              url: L,
              type: "audio",
              assetId: D
            });
          } else if (E.type === "video-input") {
            const L = (G = E.settings) == null ? void 0 : G._assetId,
              U = (typeof E.content == "string" ? E.content.trim() : "") || (L ? `${Ld}${L}` : "");
            U && v.push({
              url: U,
              type: "video",
              assetId: L
            });
          } else if (E.type === "gen-image" || E.type === "gen-video") {
            const L = Xl(E);
            if (L) {
              const D = L.url,
                U = L.assetId || ((z = E.settings) == null ? void 0 : z._assetId);
              let H = E.type === "gen-video" ? "video" : "image";
              w(D) ? H = "video" : k(D) ? H = "audio" : E.type === "gen-image" ? H = "image" : ((V = E.settings) == null ? void 0 : V.mediaType) === "audio" && (H = "audio"), v.push({
                url: D,
                type: H,
                assetId: U
              });
            }
          } else if (E.type === "input-image") {
            const L = hHe(E);
            if (L) {
              const D = r9(E);
              v.push({
                url: L.url,
                type: L.type,
                assetId: D
              });
            }
          } else {
            if (E.type === "text-node") return;
            if (E.content) {
              const L = E.content,
                D = E.settings,
                U = (D == null ? void 0 : D._assetId) || (D == null ? void 0 : D._contentAssetId),
                H = (O = E.settings) == null ? void 0 : O.mediaType;
              let Y = "image";
              H ? Y = H : w(L) ? Y = "video" : k(L) && (Y = "audio"), v.push({
                url: L,
                type: Y,
                assetId: U
              });
            }
          }
        });
      }), v;
    }, [e, t, n]),
    l = g.useCallback(f => {
      const y = mv(e, f).filter(b => !b.inputType || b.inputType === "default");
      for (const b of y) {
        const v = t.get(b.from);
        if ((v == null ? void 0 : v.type) === "preview") {
          const _ = v.previewMjImages;
          if (_ && _.length > 1 && !v.selectedPreviewImage) return !0;
        }
      }
      return !1;
    }, [e, t, n]),
    d = g.useCallback((f, y) => {
      var _, w, k;
      const b = mv(e, f).find(A => (A.inputType || "default") === y);
      if (!b) return null;
      const v = t.get(b.from);
      return v && (v.type === "text-node" || v.type === "custom-agent" || v.type === "novel-input") && (((_ = v.settings) == null ? void 0 : _.text) || v.prompt || v.content || ((w = v.settings) == null ? void 0 : w.outputContent) || ((k = v.settings) == null ? void 0 : k.novelContent) || "").trim() || null;
    }, [e, t, n]),
    u = g.useCallback((f, y) => {
      const b = mv(e, f).find(_ => (_.inputType || "default") === y);
      if (!b) return null;
      const v = t.get(b.from);
      if (!v) return null;
      if (v.type === "preview") {
        if (v.selectedPreviewImage) return v.selectedPreviewImage;
        if (v.previewMjImages && v.previewMjImages.length > 0) return v.previewMjImages[0];
      }
      if (v.type === "gen-image" || v.type === "gen-video") {
        const _ = Xl(v);
        if (_) return _.url;
      }
      return v.type === "input-image" ? Vv(v) || null : v.content || null;
    }, [e, t, n]),
    h = g.useCallback(f => {
      const y = mv(e, f).filter(_ => !_.inputType || _.inputType === "default"),
        b = [],
        v = new Set();
      return y.forEach(_ => {
        const w = _.from;
        if (!w || v.has(w)) return;
        const k = t.get(w);
        k && (k.type === "camera-movement" || k.type === "professional-camera") && (v.add(w), b.push(k));
      }), b;
    }, [e, t, n]),
    p = g.useCallback(f => {
      const y = mv(e, f).filter(_ => !_.inputType || _.inputType === "default"),
        b = [],
        v = new Set();
      return y.forEach(_ => {
        const w = _.from;
        if (!w || v.has(w)) return;
        const k = t.get(w);
        k && k.type === "text-node" && (v.add(w), b.push(k));
      }), b;
    }, [e, t, n]),
    m = g.useCallback(f => {
      const y = mv(e, f).filter(_ => !_.inputType || _.inputType === "default"),
        b = [],
        v = new Set();
      return y.forEach(_ => {
        const w = _.from;
        if (!w || v.has(w)) return;
        const k = t.get(w);
        k && k.type === "custom-agent" && (v.add(w), b.push(k));
      }), b;
    }, [e, t, n]);
  return {
    getConnectedVideoInputNode: r,
    getConnectedVideoAnalyzeNode: a,
    groupKeyframesByTime: i,
    getConnectedInputImages: o,
    getConnectedInputItems: s,
    hasMultiImageSource: l,
    getConnectedImageForInput: u,
    getConnectedTextForInput: d,
    getConnectedDirectorNodes: h,
    getConnectedTextNodes: p,
    getConnectedAgentNodes: m
  };
}

function Epe({
  connections: e,
  nodesMap: t,
  dataVersion: n
}) {
  const {
      getConnectedVideoInputNode: r,
      getConnectedVideoAnalyzeNode: a,
      groupKeyframesByTime: i,
      getConnectedInputImages: o,
      getConnectedInputItems: s,
      hasMultiImageSource: l,
      getConnectedImageForInput: d,
      getConnectedTextForInput: u,
      getConnectedDirectorNodes: h
    } = Eki({
      connections: e,
      nodesMap: t,
      dataVersion: n
    }),
    p = g.useCallback(b => {
      var k, A;
      const v = o(b),
        _ = t.get(b),
        w = (A = (k = _ == null ? void 0 : _.settings) == null ? void 0 : k.inputImageOrder) == null ? void 0 : A.map(S => String(S || "").trim()).filter(Boolean);
      return xY(v, w);
    }, [o, t]),
    m = g.useCallback(b => {
      var C, I;
      const v = s(b),
        _ = t.get(b),
        w = (I = (C = _ == null ? void 0 : _.settings) == null ? void 0 : C.inputItemOrder) == null ? void 0 : I.map(E => String(E || "").trim()).filter(Boolean),
        k = xY(v.map(({
          url: E
        }) => E), w);
      if (!(w != null && w.length) || k.length === 0) return v;
      const A = new Map();
      v.forEach(E => {
        const M = String(E.url || "").trim(),
          T = A.get(M) ?? [];
        T.push(E), A.set(M, T);
      });
      const S = [];
      for (const E of k) {
        const M = A.get(E),
          T = M == null ? void 0 : M.shift();
        T && S.push(T);
      }
      return S.length > 0 ? S : v;
    }, [s, t]),
    f = g.useMemo(() => ({
      getConnectedVideoAnalyzeNode: a,
      getConnectedInputImages: p,
      getConnectedInputItems: s,
      getOrderedInputItems: m,
      getConnectedImageForInput: d,
      getConnectedTextForInput: u,
      getConnectedDirectorNodes: h,
      hasMultiImageSource: l
    }), [a, p, s, m, d, u, h, l]),
    y = g.useMemo(() => ({
      getConnectedVideoInputNode: r,
      groupKeyframesByTime: i
    }), [r, i]);
  return {
    connections: f,
    videoAnalysis: y
  };
}

function Tki() {
  const [e, t] = g.useState(() => n$a()),
    [n, r] = g.useState(!1),
    [a, i] = g.useState({
      name: "",
      prompt: ""
    });
  return g.useEffect(() => {
    try {
      localStorage.setItem(HX, JSON.stringify(e));
    } catch {}
  }, [e]), g.useEffect(() => {
    const o = s => {
      if (s.key === HX && s.newValue) try {
        const l = JSON.parse(s.newValue);
        Array.isArray(l) && t(l);
      } catch {}
    };
    return window.addEventListener("storage", o), () => window.removeEventListener("storage", o);
  }, []), g.useMemo(() => ({
    promptLibrary: e,
    setPromptLibrary: t,
    promptLibraryCollapsed: n,
    setPromptLibraryCollapsed: r,
    promptLibraryForm: a,
    setPromptLibraryForm: i
  }), [e, n, a]);
}

let Kke = 0,
  xFt = !1;

function Mki() {
  Kke += 1;
}

function Pki() {
  Kke > 0 && (Kke -= 1);
}

function Rki() {
  return Kke > 0;
}

function Nki() {
  xFt = !0;
}

function jcn() {
  xFt = !1;
}

function cst() {
  return Kke === 0 && !xFt;
}

const jki = new Set(["input-image", "gen-image", "gen-video", "preview", "topaz-upscale", "jimeng-super-resolution", "fal-rembg", "motion-control", "virtual-try-on", "video-relight", "gen-3d"]),
  Dki = new Set(["input-image", "gen-image", "gen-video", "preview", "topaz-upscale", "jimeng-super-resolution", "fal-rembg", "motion-control", "virtual-try-on", "video-relight", "gen-3d"]);

function Lki(e) {
  return Dki.has(e);
}

function Fdr(e) {
  if (e.type !== "input-image") return !1;
  const t = K2(e);
  return t !== "video" && t !== "audio";
}

function zdr(e) {
  return e.type === "gen-image";
}

const Oki = 8;

function Bki(e, t, n = Oki) {
  return e * e + t * t >= n * n;
}

function Fki(e, t, n) {
  return e && t && !n;
}

function zki(e) {
  return !e.editorInFocus || e.isBoxSelectMulti || e.dragSwapsToLightShell ? "light" : e.latched ? "mount" : "defer";
}

function Udr(e) {
  var t;
  return e.type === "gen-video" || e.type === "video-input" ? !0 : e.type === "topaz-upscale" ? ((t = e.settings) == null ? void 0 : t.superResMode) === "video" : e.type === "input-image" ? K2(e) === "video" : !1;
}

function Uki(e, t, n) {
  var r;
  return n != null && n.boxSelectLightShell ? !1 : !!(t === e || n != null && n.genPromptPanelOpen || (r = n == null ? void 0 : n.selectedNodeIds) != null && r.has(e));
}

function TM(e, t, n, r = !1, a = null, i) {
  if (!jki.has(t.type)) return !1;
  const o = t.settings;
  return o != null && o.editImageToolActive || o != null && o.eraserToolActive || o != null && o.textEditToolActive || sFt.current === t.id || o != null && o._expandSourceHidden || (o == null ? void 0 : o.compactResultsExpanded) === !0 && !r || !r && t.type === "preview" && Array.isArray(t.previewMjImages) && t.previewMjImages.length > 1 || !r && t.type === "input-image" && aCe(t) || t._expandPending || (o == null ? void 0 : o._expandPending) === !0 || t.type === "input-image" && !t.content && ((o == null ? void 0 : o._expandResultNode) === !0 || (o == null ? void 0 : o._eraseResultNode) === !0 || String(t.nodeName || "").includes("智能扩图") || String(t.nodeName || "").includes("智能擦除")) || a === t.id ? !1 : TBt() || r ? !0 : Uki(t.id, n, {
    boxSelectLightShell: r,
    selectedNodeIds: i == null ? void 0 : i.selectedNodeIds,
    genPromptPanelOpen: i == null ? void 0 : i.genPromptPanelOpen
  }) ? !1 : ei() ? e !== "high" : e === "low" || e === "medium";
}

let bkt = null,
  jfe = null;

function $ki(e) {
  jfe == null || jfe(), bkt = e;
  const t = () => {
    bkt = null;
    for (const n of ["pointerup", "mouseup", "pointercancel", "blur"]) window.removeEventListener(n, t, !0);
    jfe = null;
  };
  jfe = t;
  for (const n of ["pointerup", "mouseup", "pointercancel", "blur"]) window.addEventListener(n, t, !0);
}

function Gki(e, t) {
  let n = 0,
    r = !1;
  const a = () => {
      r || n || (n = requestAnimationFrame(() => {
        n = 0, !(r || bkt === e || Yi()) && (r = !0, t());
      }));
    },
    i = $v(o => {
      o || a();
    });
  for (const o of ["pointerup", "mouseup", "pointercancel", "blur"]) window.addEventListener(o, a);
  return () => {
    r = !0, n && cancelAnimationFrame(n), i();
    for (const o of ["pointerup", "mouseup", "pointercancel", "blur"]) window.removeEventListener(o, a);
  };
}

function Vki(e) {
  return Udr(e) || Fdr(e) || zdr(e);
}

let _ye = null;

function dst() {
  _ye == null || _ye(), _ye = null;
}

function Hki({
  selectedNodeIds: e,
  connectingSource: t,
  connectingTarget: n,
  connectingInputType: r,
  multiConnectingSourceIds: a,
  multiConnectingTargetIds: i,
  dragStartPos: o,
  nodeStartPos: s,
  dragElementRef: l,
  dragNodeIdRef: d,
  setSelectedNodeId: u,
  setSelectedNodeIds: h,
  onSelectionNotFromBoxSelect: p,
  onClearGroupSelection: m,
  setDragNodeId: f,
  setResizingNodeId: y,
  setResizeDirection: b,
  setConnections: v,
  setConnectingSource: _,
  setConnectingTarget: w,
  setConnectingInputType: k,
  setMultiConnectingSourceIds: A,
  setMultiConnectingTargetIds: S,
  generateId: C,
  setNodes: I,
  nodesRef: E,
  connectionsRef: M,
  selectedNodeIdsRef: T,
  onMultiSelectionDragStart: P,
  canvasDoodleBrushOrEraserPassthrough: R = !1,
  onNodeDragGestureStart: j
}) {
  const B = g.useCallback((G, z) => {
      if (G.button !== 0) return;
      const V = G.target;
      if (!(z.type === "text-node" && (V.closest("[data-text-node-drag-overlay]") != null || (() => {
        const le = V.closest('textarea[data-node-type="text-node"]');
        return le instanceof HTMLTextAreaElement && le.getAttribute("data-node-text-editing") !== "1";
      })())) && (V.tagName === "INPUT" || V.tagName === "TEXTAREA" || V.tagName === "SELECT" || V.tagName === "BUTTON" || V.classList.contains("connector") || V.closest(".connector"))) return;
      if (R) return G.target.closest('button, input, textarea, select, [contenteditable="true"], .node-dropdown-button, .node-dropdown-menu'), void 0;
      if (Rki()) {
        if (G.stopPropagation(), G.ctrlKey || G.metaKey) return;
        m == null || m(), p == null || p(), eje(z.id), u(z.id), h(le => le.size === 1 && le.has(z.id) ? le : new Set([z.id])), T && (T.current = new Set([z.id])), j5(new Set([z.id]));
        return;
      }
      G.stopPropagation(), aFt(), $ki(z.id);
      const L = T == null ? void 0 : T.current,
        D = L && L.size > 0 ? L : e,
        U = D.has(z.id);
      if (!(G.ctrlKey || G.metaKey) && U && D.size > 1 && (P != null && P(G.clientX, G.clientY, {
        altKey: G.altKey
      }))) {
        G.preventDefault();
        return;
      }
      const H = U && D.size > 1 ? D : new Set([z.id]),
        Y = new Map();
      if (H.forEach(le => {
        const J = le === z.id ? z : E.current.find(pe => pe.id === le);
        J && Y.set(le, NJ(le, {
          x: J.x,
          y: J.y
        }));
      }), HN(), G.ctrlKey || G.metaKey) {
        p == null || p(), h(le => {
          const J = new Set(le);
          return J.has(z.id) ? J.delete(z.id) : J.add(z.id), T && (T.current = J), J.size === 1 ? u(Array.from(J)[0]) : u(null), J;
        });
        return;
      } else {
        m == null || m();
        const le = U && D.size > 1;
        le || p == null || p();
        const J = le ? new Set(D) : new Set([z.id]);
        if (U && D.size > 1 ? (u(null), T && (T.current = D), j5(D)) : (eje(z.id), u(z.id), h(pe => pe.size === 1 && pe.has(z.id) ? pe : new Set([z.id])), T && (T.current = new Set([z.id])), j5(new Set([z.id]))), G.altKey) {
          const pe = E.current,
            ce = pe.filter(we => J.has(we.id));
          if (ce.length > 0) {
            const we = new Set(ce.map(be => be.id)),
              X = ce.map(be => {
                const Ee = Y.get(be.id) ?? {
                  x: be.x,
                  y: be.y
                };
                return Gke({
                  ...be,
                  id: C(),
                  x: Ee.x,
                  y: Ee.y,
                  isGenerating: !1,
                  extractingFrames: !1,
                  isMasking: !1,
                  errorMsg: void 0,
                  markers: be.markers ? be.markers.map(he => ({
                    ...he,
                    id: C()
                  })) : void 0
                }, {
                  connections: M == null ? void 0 : M.current,
                  nodes: pe,
                  sourceId: be.id
                });
              }),
              Z = wJe(X, pe),
              re = new Map();
            ce.forEach((be, Ee) => {
              re.set(be.id, X[Ee].id);
            });
            const fe = hFt(X.map((be, Ee) => ({
                ...be,
                nodeName: Z[Ee]
              })), ce, re),
              ye = new Map();
            ce.forEach((be, Ee) => {
              ye.set(be.id, fe[Ee]);
            });
            const ie = ye.get(z.id),
              ae = new Set(fe.map(be => be.id));
            hlr(ae), Da.flushSync(() => {
              I(be => {
                const Ee = [...be, ...fe];
                return E.current = Ee, Ee;
              }), f(ie.id), u(ie.id), h(ae);
            }), j5(ae), v(be => {
              const Ee = be.filter(he => we.has(he.from) || we.has(he.to));
              if (Ee.length === 0) return be;
              const xe = Ee.map(he => ({
                ...he,
                id: C(),
                from: re.get(he.from) || he.from,
                to: re.get(he.to) || he.to
              }));
              return [...be, ...xe];
            }), eje(ie.id), T && (T.current = ae), d.current = ie.id, s.current = {
              x: ie.x,
              y: ie.y
            }, o.current = {
              x: G.clientX,
              y: G.clientY
            }, l.current = null, ae.forEach(be => {
              const Ee = fe.find(xe => xe.id === be);
              Ee && VN(be, Ee.x, Ee.y);
            }), yP({
              force: !0
            }), Aj({
              skipBodyClass: !0
            }), ei() || document.body.classList.add("canvas-node-dragging"), cU(Array.from(ae)), j == null || j(), requestAnimationFrame(() => Kae());
            return;
          }
        }
      }
      const K = G.clientX,
        W = G.clientY,
        Q = G.currentTarget.closest("[data-node-id]");
      dst();
      const q = () => {
          var X;
          o.current = {
            x: K,
            y: W
          };
          const le = Y.get(z.id) ?? {
            x: z.x,
            y: z.y
          };
          s.current = le, Y.forEach((Z, re) => {
            VN(re, Z.x, Z.y), R1(re, Z.x, Z.y);
          }), l.current = Q, Q == null || Q.classList.add("node-dragging-self"), yP({
            force: !0
          }), Aj({
            skipBodyClass: !0,
            skipNotify: !0
          }), ei() || (document.body.classList.add("canvas-node-dragging"), (X = document.getElementById("canvas-bg")) == null || X.classList.add("canvas-node-dragging")), cU(Array.from(H)), d.current = z.id, j == null || j();
          const J = z.id,
            pe = M == null ? void 0 : M.current,
            we = !pe || pe.some(Z => H.has(Z.from) || H.has(Z.to)) || Vki(z);
          requestAnimationFrame(() => {
            if (d.current === J) {
              if (!we) {
                requestAnimationFrame(() => Kae());
                return;
              }
              f(J), requestAnimationFrame(() => {
                d.current === J && (A4n(), Kae());
              });
            }
          });
        },
        ne = le => {
          Bki(le.clientX - K, le.clientY - W) && (dst(), q());
        },
        de = () => {
          dst();
        };
      window.addEventListener("mousemove", ne, !0), window.addEventListener("mouseup", de, !0), _ye = () => {
        window.removeEventListener("mousemove", ne, !0), window.removeEventListener("mouseup", de, !0);
      };
    }, [e, u, h, f, I, E, M, o, s, l, d, C, p, T, P, R, m, v, j]),
    F = g.useCallback((G, z) => {
      if (i && i.length > 0) {
        const V = i.filter(L => L !== z.id);
        let O = !1;
        if (V.length > 0 && v(L => {
          const D = V.filter(U => !kv(L, z.id, U, "default")).map(U => ({
            id: C(),
            from: z.id,
            to: U
          }));
          return D.length && (O = !0), D.length ? [...L, ...D] : L;
        }), !O) return;
        G.stopPropagation(), S && S(null);
        return;
      }
      if (a && a.length > 0) {
        const V = a.filter(L => L !== z.id);
        let O = !1;
        if (V.length > 0 && v(L => {
          const D = V.filter(U => !kv(L, U, z.id, "default")).map(U => ({
            id: C(),
            from: U,
            to: z.id
          }));
          return D.length && (O = !0), D.length ? [...L, ...D] : L;
        }), !O) return;
        G.stopPropagation(), A && A(null), S && S(null);
        return;
      }
      if (t && t !== z.id) {
        let V = !1;
        const O = {
          id: C(),
          from: t,
          to: z.id
        };
        if (v(L => kv(L, t, z.id, "default") ? L : (V = !0, [...L, O])), !V) return;
        G.stopPropagation(), _(null);
        return;
      }
      if (n && n !== z.id) {
        let V = !1;
        const O = {
          id: C(),
          from: z.id,
          to: n,
          ...(r && r !== "default" ? {
            inputType: r
          } : {})
        };
        if (v(L => kv(L, z.id, n, r) ? L : (V = !0, [...L, O])), !V) return;
        G.stopPropagation(), w(null), k(null);
        return;
      }
    }, [t, n, r, a, i, C, v, _, w, k, A, S]),
    N = g.useCallback((G, z) => {
      const V = (T == null ? void 0 : T.current) ?? e;
      V.size >= 2 && V.has(G) || (y(G), b(z));
    }, [e, T, y, b]);
  return {
    handleNodeMouseDown: B,
    handleNodeMouseUp: F,
    handleStartResize: N
  };
}

function Wki(e) {
  return {
    ...{
      canvasRef: e.canvasRef,
      setView: e.setView,
      viewRef: e.viewRef,
      canvasContentRef: e.canvasContentRef,
      onViewFrame: e.onViewFrame
    },
    ...{
      isZoomLocked: e.isZoomLocked
    },
    ...{
      nodeCount: e.nodeCount,
      canvasMounted: e.canvasMounted
    }
  };
}

function qki(e) {
  return {
    ...{
      nodesRef: e.nodesRef,
      connectionsRef: e.connectionsRef,
      mousePosRef: e.mousePosRef,
      deleteNode: e.deleteNode,
      deleteNodes: e.deleteNodes,
      setNodes: e.setNodes,
      setConnections: e.setConnections,
      setGroups: e.setGroups,
      onSave: e.onSave
    },
    ...{
      selectedNodeIdRef: e.selectedNodeIdRef,
      selectedNodeIdsRef: e.selectedNodeIdsRef,
      selectedConnectionIdRef: e.selectedConnectionIdRef,
      setSelectedNodeId: e.setSelectedNodeId,
      setSelectedNodeIds: e.setSelectedNodeIds,
      setSelectedConnectionId: e.setSelectedConnectionId,
      selectedGroupIdRef: e.selectedGroupIdRef,
      groupsRef: e.groupsRef,
      onDeleteCollapsedStackGroup: e.onDeleteCollapsedStackGroup,
      onClearGroupSelection: e.onClearGroupSelection,
      setSelectedGroupId: e.setSelectedGroupId
    },
    ...{
      tryConsumeUndoForDoodle: e.tryConsumeUndoForDoodle,
      tryConsumeDoodleSubToolKey: e.tryConsumeDoodleSubToolKey
    },
    ...{
      onUndo: e.onUndo,
      onRedo: e.onRedo
    }
  };
}

function Kki(e) {
  if (e.selectedNodeType === "input-image" || e.selectedNodeType === "video-input") {
    if (e.hasImageItem) return "into-media-image";
    if (e.hasVideoItem) return "into-media-video";
    if (e.hasAudioItem && e.selectedNodeType === "input-image") return "into-media-audio";
    if (e.selectedNodeType === "input-image" && e.singleAudioFile) return "into-media-audio-file";
  }
  return e.hasCanvasFiles ? "canvas-files" : "none";
}

function Qki(e) {
  return e.type.startsWith("audio/") || /\.(mp3|wav|ogg|m4a|aac|flac)$/i.test(e.name);
}

function _Me(e, t, n) {
  const r = `local_clip_${e}_${Date.now()}`;
  (async () => {
    try {
      await ni.init();
      const a = t.type.startsWith("video/") ? "pasted-video.mp4" : t.type.startsWith("audio/") ? "pasted-audio.mp3" : "pasted.png",
        i = t.name || a;
      if (!(await ni.saveBlobAsset(r, t, `file://clipboard-paste/${encodeURIComponent(i)}`, "local"))) return;
      n(s => s.map(l => l.id === e ? {
        ...l,
        _contentAssetId: r,
        settings: jue(l.settings, r)
      } : l));
    } catch (a) {
      console.warn("[usePasteHandler] local cache for paste failed:", a);
    }
  })();
}

function Yki({
  selectedNodeIdRef: e,
  nodesRef: t,
  setNodes: n,
  onFilesPasted: r
}) {
  g.useEffect(() => {
    let a = !1;
    const i = async o => {
      var A, S;
      if (!xye(o)) return;
      const s = o.target;
      if (s.tagName === "INPUT" || s.tagName === "TEXTAREA" || s.isContentEditable || a) return;
      const d = o.clipboardData,
        u = (((A = d == null ? void 0 : d.files) == null ? void 0 : A.length) || 0) > 0,
        h = Array.from((d == null ? void 0 : d.items) || []).filter(C => C.kind === "file").map(C => C.getAsFile()).filter(C => !!C),
        p = u ? Array.from((d == null ? void 0 : d.files) || []) : h,
        m = e.current,
        f = m ? t.current.find(C => C.id === m) ?? null : null,
        y = Array.from(((S = o.clipboardData) == null ? void 0 : S.items) || []),
        b = y.find(C => C.type.startsWith("image/")),
        v = y.find(C => C.type.startsWith("video/")),
        _ = y.find(C => C.type.startsWith("audio/")),
        w = f && (f.type === "input-image" || f.type === "video-input") ? f.type : null,
        k = Kki({
          selectedNodeType: w,
          hasImageItem: !!b,
          hasVideoItem: !!v,
          hasAudioItem: !!_,
          singleAudioFile: p.length === 1 && Qki(p[0]),
          hasCanvasFiles: p.length > 0 && !!r
        });
      if (!(k === "ignore" || k === "none")) {
        if (k === "into-media-image" && f && b) {
          o.preventDefault(), a = !0;
          const C = f.id,
            I = f.type,
            E = b.getAsFile();
          if (E) {
            const M = URL.createObjectURL(E);
            n(T => {
              const P = t.current.find(R => R.id === C);
              return P ? (P.content && typeof P.content == "string" && P.content.startsWith("blob:") && URL.revokeObjectURL(P.content), I === "input-image" ? T.map(R => R.id === C && R.type === "input-image" ? {
                ...R,
                content: M,
                _tick: Date.now(),
                settings: {
                  ...(R.settings || {}),
                  _blobUrl: M,
                  _originalFile: E
                }
              } : R) : I === "video-input" ? T.map(R => R.id === C && R.type === "video-input" ? {
                ...R,
                content: M,
                _tick: Date.now(),
                settings: {
                  ...(R.settings || {}),
                  _blobUrl: M,
                  _originalFile: E
                }
              } : R) : T) : T;
            }), _Me(C, E, n), a = !1;
          } else a = !1;
          return;
        }
        if (k === "into-media-video" && f && v) {
          o.preventDefault(), a = !0;
          const C = f.id,
            I = f.type,
            E = v.getAsFile();
          if (E) {
            const M = URL.createObjectURL(E);
            n(T => {
              const P = t.current.find(R => R.id === C);
              return P ? (P.content && typeof P.content == "string" && P.content.startsWith("blob:") && URL.revokeObjectURL(P.content), I === "video-input" ? T.map(R => R.id === C && R.type === "video-input" ? {
                ...R,
                content: M,
                videoFileName: E.name || "pasted-video.mp4",
                _tick: Date.now(),
                settings: {
                  ...(R.settings || {}),
                  _blobUrl: M,
                  _originalFile: E
                }
              } : R) : I === "input-image" ? T.map(R => R.id === C && R.type === "input-image" ? {
                ...R,
                content: M,
                settings: {
                  ...(R.settings || {}),
                  mediaType: "video",
                  videoFileName: E.name || "pasted-video.mp4",
                  _blobUrl: M,
                  _originalFile: E
                },
                _tick: Date.now()
              } : R) : T) : T;
            }), _Me(C, E, n), a = !1;
          } else a = !1;
          return;
        }
        if (k === "into-media-audio" && f && _) {
          o.preventDefault(), a = !0;
          const C = f.id,
            I = _.getAsFile();
          if (I) {
            const E = URL.createObjectURL(I);
            n(M => {
              const T = t.current.find(P => P.id === C);
              return T ? (T.content && typeof T.content == "string" && T.content.startsWith("blob:") && URL.revokeObjectURL(T.content), M.map(P => {
                var R;
                return P.id === C && P.type === "input-image" ? {
                  ...P,
                  content: E,
                  prompt: I.name || "pasted-audio",
                  nodeName: I.name ? I.name.replace(/\.[^/.]+$/, "") : P.nodeName,
                  _tick: Date.now(),
                  settings: {
                    ...(P.settings || {}),
                    mediaType: "audio",
                    musicTitle: I.name ? I.name.replace(/\.[^/.]+$/, "") : (R = P.settings) == null ? void 0 : R.musicTitle,
                    _blobUrl: E,
                    _originalFile: I
                  }
                } : P;
              })) : M;
            }), _Me(C, I, n), a = !1;
          } else a = !1;
          return;
        }
        if (k === "into-media-audio-file" && f && p.length === 1) {
          const C = p[0];
          if (C.type.startsWith("audio/") || /\.(mp3|wav|ogg|m4a|aac|flac)$/i.test(C.name)) {
            o.preventDefault(), a = !0;
            const E = f.id,
              M = URL.createObjectURL(C);
            n(T => {
              const P = t.current.find(R => R.id === E);
              return P ? (P.content && typeof P.content == "string" && P.content.startsWith("blob:") && URL.revokeObjectURL(P.content), T.map(R => {
                var j;
                return R.id === E && R.type === "input-image" ? {
                  ...R,
                  content: M,
                  prompt: C.name || "pasted-audio",
                  nodeName: C.name ? C.name.replace(/\.[^/.]+$/, "") : R.nodeName,
                  _tick: Date.now(),
                  settings: {
                    ...(R.settings || {}),
                    mediaType: "audio",
                    musicTitle: C.name ? C.name.replace(/\.[^/.]+$/, "") : (j = R.settings) == null ? void 0 : j.musicTitle,
                    _blobUrl: M,
                    _originalFile: C
                  }
                } : R;
              })) : T;
            }), _Me(E, C, n), a = !1;
          }
          return;
        }
        if (k === "canvas-files" && r) {
          o.preventDefault(), a = !0;
          try {
            await r(p);
          } finally {
            a = !1;
          }
        }
      }
    };
    return window.addEventListener("paste", i), () => window.removeEventListener("paste", i);
  }, [e, t, n, r]);
}

function Xki() {
  let e = {
    apiTesting: null,
    apiTestHints: {}
  };
  const t = new Set(),
    n = () => t.forEach(r => r());
  return {
    getSnapshot: () => e,
    subscribe(r) {
      return t.add(r), () => {
        t.delete(r);
      };
    },
    setApiTesting(r) {
      e.apiTesting !== r && (e = {
        ...e,
        apiTesting: r
      }, n());
    },
    setApiTestHints(r) {
      const a = r(e.apiTestHints);
      a !== e.apiTestHints && (e = {
        ...e,
        apiTestHints: a
      }, n());
    }
  };
}

function Dcn(e) {
  return tT(e) || C3(e) || y3(e);
}

function Jki({
  apiConfigs: e,
  globalApiKey: t
}) {
  const [n] = g.useState(Xki),
    {
      setApiTesting: r,
      setApiTestHints: a
    } = n,
    [i, o] = g.useState({}),
    s = g.useCallback(async d => {
      r(d), o(f => ({
        ...f,
        [d]: "idle"
      })), a(f => {
        const y = {
          ...f
        };
        return delete y[d], y;
      });
      const u = e.find(f => f.id === d);
      if (u != null && u.customProtocol) {
        const f = sTt(u);
        o(y => ({
          ...y,
          [d]: f ? "error" : "success"
        })), a(y => ({
          ...y,
          [d]: f || "配置格式有效；未调用生成接口。实际连通性与返回字段请通过画布生成验证。"
        })), r(null);
        return;
      }
      const h = Qa.getResolvedModelBaseUrl(d),
        p = cu(u == null ? void 0 : u.key, t, void 0, {
          modelId: d,
          modelName: (u == null ? void 0 : u.modelName) || d,
          baseUrl: h,
          modelSavedApiKeyId: u == null ? void 0 : u.savedApiKeyId,
          platformGroup: Hg
        });
      if (!p && !Hk(u, h)) {
        console.log(`[API Test] ${d} 缺少 API Key`), o(f => ({
          ...f,
          [d]: "error"
        })), r(null);
        return;
      }
      if (mm(d) && !us()) {
        console.warn("[API Test] 虎牙接口需在 Tauri 桌面端测试连接（纯浏览器会因 CORS 无法访问 art.huya.info；桌面内绘画仍会走后端代理）"), a(f => ({
          ...f,
          [d]: "请在 Tauri 桌面端测试（浏览器无法直连 art.huya.info）"
        })), o(f => ({
          ...f,
          [d]: "error"
        })), r(null);
        return;
      }
      if ((fk(d) || WM(d) || Dcn(d)) && !us()) {
        console.warn("[API Test] 虎牙 视频/音频接口需在 Tauri 桌面端测试连接（纯浏览器会因 CORS 无法访问 art.huya.info）"), a(f => ({
          ...f,
          [d]: "请在 Tauri 桌面端测试（浏览器无法直连 art.huya.info）"
        })), o(f => ({
          ...f,
          [d]: "error"
        })), r(null);
        return;
      }
      if (GY(d)) {
        try {
          await ahe();
          const f = !0;
          o(y => ({
            ...y,
            [d]: "success"
          })), a(y => ({
            ...y,
            [d]: f ? "内置即梦 CLI 代理已就绪" : "127.0.0.1:9531 未响应，请重启 tauri dev"
          }));
        } catch (f) {
          o(y => ({
            ...y,
            [d]: "error"
          })), a(y => ({
            ...y,
            [d]: f instanceof Error ? f.message : String(f)
          }));
        } finally {
          r(null);
        }
        return;
      }
      if (Qa.getResolvedModelBaseUrl(d).replace(/\/+$/, "").includes("copilot.huya.info") && !us()) {
        console.warn("[API Test] 虎牙 Copilot 需在 Tauri 桌面端测试（浏览器无法直连 copilot.huya.info）"), a(f => ({
          ...f,
          [d]: "请在 Tauri 桌面端测试（浏览器无法直连 copilot.huya.info）"
        })), o(f => ({
          ...f,
          [d]: "error"
        })), r(null);
        return;
      }
      try {
        FS(d) && (o3() || Ple()) && (await ace());
        const f = Qa.getResolvedModelBaseUrl(d).replace(/\/+$/, "");
        console.log(`[API Test] 测试 ${d}:`, {
          baseUrl: f,
          apiKey: p ? "***已设置***" : "未设置"
        });
        let y,
          b = "GET",
          v,
          _ = p ? {
            Authorization: `Bearer ${p}`
          } : {};
        KM(d) || Dv(d) ? (y = `${f}/v1beta/models`, _ = {
          "x-goog-api-key": p
        }) : qg(d) ? (y = ltt(f), b = "GET") : $5(d) ? (y = `${WM(d) ? b3(Mqe(f)) : sMt(d) ? cMt(lMt(f)) : fk(d) ? b3(s9(f, d)) : Dcn(d) ? yhe(nIe(f)) : EU(sX(d, f))}/generate/result/0`, b = "GET", _ = {
          Authorization: `Bearer ${p}`
        }) : m5(d) ? y = `${f}/v1/draw/result` : d === "z-image-official" || d === "wan-2.6-official" || d === "wan-2.6-image-official" ? y = `${f}/api/v1/services/aigc/text-generation/qwen-turbo` : oIe(d) ? y = ltt(f) : Tb(d) || mX(d) || d === "doubao-seed-2-0-pro-260215" ? y = `${f.replace(/\/+$/, "")}/health` : y = ltt(f), console.log(`[API Test] 请求 URL: ${y}`);
        const w = m5(d),
          k = await $i(y, {
            method: w ? "POST" : b,
            headers: {
              ..._,
              ...(w ? {
                "Content-Type": "application/json"
              } : {})
            },
            ...(w ? {
              body: JSON.stringify({
                id: "test-connection"
              })
            } : v ? {
              body: v
            } : {})
          });
        if (($5(d) || y.includes("copilot.huya.info")) && (k.status === 404 || k.status === 400) ? console.log(`[API Test] ${d} 响应状态: ${k.status}（占位 task_id，鉴权/链路正常）`) : console.log(`[API Test] ${d} 响应状态:`, k.status), KM(d) || Dv(d)) {
          if (k.ok) o(S => ({
            ...S,
            [d]: "success"
          }));else {
            const S = await k.text();
            console.log(`[API Test] Gemini 官方 ${d} 响应:`, k.status, S == null ? void 0 : S.slice(0, 200)), o(C => ({
              ...C,
              [d]: "error"
            }));
          }
        } else if ($5(d) || y.includes("copilot.huya.info")) {
          const S = await k.text();
          if (k.status === 403) {
            const I = nH(k.status, S) || qSn(S.trim().toLowerCase().startsWith("<!doctype"));
            console.warn("[API Test] 虎牙返回 HTTP 403：", I), a(E => ({
              ...E,
              [d]: I
            })), o(E => ({
              ...E,
              [d]: "error"
            }));
          } else if (k.status === 401) {
            const C = q7(p) ? "HTTP 401：请检查 Bearer Token" : "HTTP 401：请填写海艺 OpenAPI Token（格式 AI-xxx），勿使用 default 等占位 Key";
            a(I => ({
              ...I,
              [d]: C
            })), o(I => ({
              ...I,
              [d]: "error"
            }));
          } else if (k.status >= 500) {
            let C = S;
            try {
              const E = JSON.parse(S);
              typeof (E == null ? void 0 : E.error) == "string" && (C = E.error);
            } catch {}
            const I = V4t(C);
            I && a(E => ({
              ...E,
              [d]: I
            })), o(E => ({
              ...E,
              [d]: "error"
            }));
          } else {
            const C = k.status === 404 || k.status === 400 ? `鉴权通过（占位 task 返回 HTTP ${k.status}，未创建计费任务）` : k.status === 200 ? "接口可达" : `连通正常（HTTP ${k.status}）`;
            a(I => ({
              ...I,
              [d]: C
            })), o(I => ({
              ...I,
              [d]: "success"
            }));
          }
        } else if (Tb(d) || mX(d)) k.ok ? o(S => ({
          ...S,
          [d]: "success"
        })) : o(S => ({
          ...S,
          [d]: "error"
        }));else if (m5(d)) {
          const S = await k.json().catch(() => ({})),
            C = S == null ? void 0 : S.code;
          k.status === 401 || k.status === 403 ? o(I => ({
            ...I,
            [d]: "error"
          })) : k.ok && (C === 0 || C === -22) ? o(I => ({
            ...I,
            [d]: "success"
          })) : o(I => ({
            ...I,
            [d]: "error"
          }));
        } else if (d === "z-image-official" || d === "wan-2.6-official" || d === "wan-2.6-image-official") k.status === 401 || k.status === 403 ? (console.log(`[API Test] ${d} API Key 无效`), o(S => ({
          ...S,
          [d]: "error"
        }))) : k.status >= 500 ? (console.log(`[API Test] ${d} 服务器错误`), o(S => ({
          ...S,
          [d]: "error"
        }))) : (console.log(`[API Test] ${d} 连接成功`), o(S => ({
          ...S,
          [d]: "success"
        })));else if (k.ok) o(S => ({
          ...S,
          [d]: "success"
        }));else {
          if (k.status === 401 || k.status === 403) {
            const S = await k.text().catch(() => "");
            let C = "";
            try {
              const E = JSON.parse(S);
              typeof (E == null ? void 0 : E.error) == "string" ? C = E.error : E != null && E.error && typeof E.error == "object" && E.error.message ? C = E.error.message : E != null && E.message && (C = E.message);
            } catch {
              C = S.slice(0, 120);
            }
            const I = C ? `HTTP ${k.status}：${C}` : `HTTP ${k.status}：请检查该 BASE URL 下 API KEY 是否有效（域名需与 Key 所属站点一致）`;
            console.log(`[API Test] ${d} 鉴权失败:`, I), a(E => ({
              ...E,
              [d]: I
            }));
          }
          o(S => ({
            ...S,
            [d]: "error"
          }));
        }
      } catch (f) {
        console.error(`[API Test] ${d} 测试失败:`, f);
        const y = f instanceof Error ? f.message : String(f);
        if (FS(d) && /failed to fetch|connection refused|econnrefused|err_connection_refused|network/i.test(y) && a(b => ({
          ...b,
          [d]: o3() ? "内置方舟代理（127.0.0.1:9530）未响应。请完全退出终端里的 electron:dev 后重新运行（主进程改动不能靠页面刷新）。" : Ple() ? "内置方舟代理（127.0.0.1:9530）未响应。请完全退出 tauri dev 后重新运行（Rust 主进程改动不能靠页面刷新）。" : "方舟官款需在 Tauri / Electron 桌面版中使用；纯浏览器无法连接内置代理。"
        })), qg(d)) try {
          const b = Qa.getResolvedModelBaseUrl(d).replace(/\/+$/, "");
          await fetch(`${b}/`, {
            method: "GET",
            mode: "no-cors"
          }), o(v => ({
            ...v,
            [d]: "success"
          }));
        } catch (b) {
          console.error(`[API Test] ${d} 兜底检测失败:`, b), o(v => ({
            ...v,
            [d]: "error"
          }));
        } else o(b => ({
          ...b,
          [d]: "error"
        }));
      }
      r(null);
    }, [e, t, r, a]),
    l = g.useCallback(d => {
      if (!d) return "bg-zinc-600";
      const u = i[d];
      if (u === "success") return "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]";
      if (u === "error") return "bg-red-500";
      const h = e.find(m => m.id === d);
      return IU(h, t) ? "bg-zinc-400" : "bg-zinc-700";
    }, [i, e, t]);
  return {
    apiTestProgress: n,
    apiStatus: i,
    testApiConnection: s,
    getStatusColor: l
  };
}

const Dfe = new Set(),
  Zki = 2;

let kMe = 0;

const Lcn = [];

async function eAi() {
  kMe >= Zki && (await new Promise(t => Lcn.push(t))), kMe += 1;
  let e = !1;
  return () => {
    var t;
    e || (e = !0, kMe = Math.max(0, kMe - 1), (t = Lcn.shift()) == null || t());
  };
}

function tAi({
  history: e
}) {
  const t = g.useRef(new Set());
  g.useEffect(() => {
    const n = new Set(e.map(i => i.id)),
      r = t.current,
      a = new Set();
    r.forEach(i => {
      n.has(i) || (a.add(i), Dfe.delete(i));
    }), t.current = n, e.forEach(async i => {
      if (!a.has(i.id) && !Dfe.has(i.id) && i.status === "completed") {
        Dfe.add(i.id);
        const o = await eAi();
        try {
          const s = [],
            l = !!i._assetId,
            d = i._mjAssetIds;
          i.url && typeof i.url == "string" && i.url.startsWith("blob:") && (l || i.thumbnailUrl && i.thumbnailUrl !== i.url && i.url.startsWith("blob:") || s.push({
            url: i.url,
            id: i.id
          })), i.mjImages && Array.isArray(i.mjImages) && i.mjImages.forEach((u, h) => {
            u && typeof u == "string" && u.startsWith("blob:") && (d != null && d[h] || s.push({
              url: u,
              id: `${i.id}_mj_${h}`
            }));
          }), i.audioUrl && typeof i.audioUrl == "string" && i.audioUrl !== i.url && i.audioUrl.startsWith("blob:") && s.push({
            url: i.audioUrl,
            id: `${i.id}_audio`
          }), i.url && typeof i.url == "string" && (i.url.startsWith("http://") || i.url.startsWith("https://")) && Promise.all([Ie(() => Promise.resolve().then(() => ii), void 0, import.meta.url), Ie(() => Promise.resolve().then(() => So), void 0, import.meta.url)]).then(([{
            historyItemSkipsLocalAssetRestore: u
          }, {
            isCanvasLocalCacheMode: h
          }]) => {
            u(i) || h() && (i.type === "video" || /\.mp4(\?|$)/i.test(i.url || "")) || oy(i, i.id).catch(() => {
              Dfe.delete(i.id);
            });
          });
          for (const {
            url: u,
            id: h
          } of s) try {
            if (await ni.hasAsset(h)) continue;
            try {
              const m = await fetch(u);
              if (!m.ok) throw new Error(`HTTP ${m.status}`);
              const f = await m.blob(),
                y = await ni.saveBlobAsset(h, f, u);
            } catch {
              Dfe.delete(i.id);
            }
          } catch {}
        } finally {
          o();
        }
      }
    });
  }, [e]);
}

const nAi = ({
    nodes: e,
    nodesRef: t,
    handleNodeMouseDown: n,
    handleNodeMouseUp: r,
    deleteNode: a,
    handleStartResize: i,
    handleStartConnectFromOutput: o,
    handleStartConnectFromInput: s,
    onBeginConnectGesture: l,
    handleConnectToInput: d,
    handleConnectToOutput: u
  }) => {
    const h = g.useRef(new Map()),
      p = g.useRef({
        handleNodeMouseDown: n,
        handleNodeMouseUp: r,
        deleteNode: a,
        handleStartResize: i,
        handleStartConnectFromOutput: o,
        handleStartConnectFromInput: s,
        onBeginConnectGesture: l,
        handleConnectToInput: d,
        handleConnectToOutput: u
      });
    p.current = {
      handleNodeMouseDown: n,
      handleNodeMouseUp: r,
      deleteNode: a,
      handleStartResize: i,
      handleStartConnectFromOutput: o,
      handleStartConnectFromInput: s,
      onBeginConnectGesture: l,
      handleConnectToInput: d,
      handleConnectToOutput: u
    };
    const m = g.useRef(new Map()),
      f = g.useCallback(y => {
        const b = y.id;
        m.current.set(b, y);
        const v = h.current.get(b);
        if (v) return v;
        const _ = {
          onMouseDown: w => {
            var A;
            const k = ((A = t.current) == null ? void 0 : A.find(S => S.id === b)) ?? m.current.get(b);
            k && p.current.handleNodeMouseDown(w, k);
          },
          onMouseUp: w => {
            var A;
            const k = ((A = t.current) == null ? void 0 : A.find(S => S.id === b)) ?? m.current.get(b);
            k && p.current.handleNodeMouseUp(w, k);
          },
          onDelete: () => p.current.deleteNode(b),
          onStartResize: w => p.current.handleStartResize(b, w),
          onStartConnectFromOutput: w => p.current.handleStartConnectFromOutput(w, b),
          onStartConnectFromInput: w => p.current.handleStartConnectFromInput(w, b),
          onBeginConnectGesture: () => {
            var w, k;
            return (k = (w = p.current).onBeginConnectGesture) == null ? void 0 : k.call(w);
          },
          onConnectToInput: w => p.current.handleConnectToInput(w, b),
          onConnectToOutput: w => p.current.handleConnectToOutput(w, b)
        };
        return h.current.set(b, _), _;
      }, [t]);
    return g.useEffect(() => {
      const y = new Set(e.map(b => b.id));
      h.current.forEach((b, v) => {
        y.has(v) || (h.current.delete(v), m.current.delete(v));
      });
    }, [e]), {
      getNodeCallbacks: f
    };
  },
  rAi = ({
    lightboxItem: e,
    setLightboxItem: t,
    setHistory: n
  }) => ({
    handleNavigate: g.useCallback(a => {
      if (e && "mjImages" in e && e.mjImages && e.mjImages.length > a && a >= 0 && e.type !== "audio") {
        const i = Math.max(0, Math.min(a, e.mjImages.length - 1));
        "id" in e && e.id && n(o => o.map(s => s.id === e.id ? {
          ...s,
          selectedMjImageIndex: i
        } : s)), t({
          ...e,
          selectedMjImageIndex: i
        });
      }
    }, [e, t, n])
  });

function aAi(e, t, n = {}) {
  const {
      spacing: r = 100,
      columns: a = 3,
      direction: i = "horizontal"
    } = n,
    o = e.filter(p => t.has(p.id));
  if (o.length === 0) return e;
  const s = o.reduce((p, m) => p + m.x, 0) / o.length,
    l = o.reduce((p, m) => p + m.y, 0) / o.length,
    d = 320,
    u = 280;
  return e.map(p => {
    if (!t.has(p.id)) return p;
    const m = o.indexOf(p);
    let f, y;
    if (i === "horizontal") {
      const b = Math.floor(m / a),
        v = m % a;
      f = s - a * (d + r) / 2 + v * (d + r), y = l - Math.ceil(o.length / a) * (u + r) / 2 + b * (u + r);
    } else {
      const b = Math.floor(m / a),
        v = m % a;
      f = s - Math.ceil(o.length / a) * (d + r) / 2 + b * (d + r), y = l - a * (u + r) / 2 + v * (u + r);
    }
    return {
      ...p,
      x: Math.round(f),
      y: Math.round(y)
    };
  });
}

function iAi(e, t, n) {
  const r = e.filter(I => t.has(I.id));
  if (r.length === 0) return e;
  const a = new Map(),
    i = new Map();
  r.forEach(I => {
    a.set(I.id, []), i.set(I.id, 0);
  }), n.forEach(I => {
    if (t.has(I.from) && t.has(I.to)) {
      const E = a.get(I.from) || [];
      E.push(I.to), a.set(I.from, E), i.set(I.to, (i.get(I.to) || 0) + 1);
    }
  });
  const o = [],
    s = new Set();
  function l(I) {
    const E = new Set(),
      M = [I];
    for (; M.length > 0;) {
      const T = M.shift();
      if (E.has(T)) continue;
      E.add(T), (a.get(T) || []).forEach(R => {
        E.has(R) || M.push(R);
      }), n.forEach(R => {
        t.has(R.from) && t.has(R.to) && R.to === T && !E.has(R.from) && M.push(R.from);
      });
    }
    return E;
  }
  r.forEach(I => {
    if (!s.has(I.id)) {
      const E = l(I.id);
      o.push(E), E.forEach(M => s.add(M));
    }
  }), console.log(`[autoAlignNodes] 检测到 ${o.length} 个独立工作流`);
  const d = r.reduce((I, E) => I + E.x, 0) / r.length,
    u = r.reduce((I, E) => I + E.y, 0) / r.length,
    h = 380,
    p = 280,
    m = 60,
    f = 100,
    y = new Map();
  o.forEach((I, E) => {
    const M = Array.from(I),
      T = new Map();
    M.forEach(R => {
      T.set(R, 0);
    }), n.forEach(R => {
      I.has(R.from) && I.has(R.to) && T.set(R.to, (T.get(R.to) || 0) + 1);
    });
    const P = (R, j) => {
      if (y.has(R)) return;
      y.set(R, j), (a.get(R) || []).forEach(F => {
        I.has(F) && P(F, j + 1);
      });
    };
    M.forEach(R => {
      T.get(R) === 0 && P(R, 0);
    }), M.forEach(R => {
      y.has(R) || P(R, 0);
    });
  });
  const b = new Map(),
    v = new Map();
  y.forEach((I, E) => {
    b.set(I, (b.get(I) || 0) + 1), v.has(I) || v.set(I, []), v.get(I).push(E);
  });
  const _ = new Map();
  b.forEach((I, E) => {
    const M = I * h + Math.max(0, I - 1) * m;
    _.set(E, M);
  });
  const w = Math.max(...Array.from(y.values()), 0),
    k = (p + f) * w + p,
    A = u - k / 2,
    S = new Map();
  return v.forEach((I, E) => {
    I.forEach((M, T) => {
      S.set(M, T);
    });
  }), e.map(I => {
    if (!t.has(I.id)) return I;
    const E = y.get(I.id) || 0,
      M = b.get(E) || 1,
      T = S.get(I.id) || 0,
      P = _.get(E) || 0,
      j = d - P / 2 + T * (h + m),
      B = A + E * (p + f);
    return console.log(`[autoAlignNodes] 节点 ${I.id.substring(0, 8)}: 层=${E}, 位置=${T}/${M}, X=${Math.round(j)}, Y=${Math.round(B)}`), {
      ...I,
      x: Math.round(j),
      y: Math.round(B)
    };
  });
}

const oAi = ({
  nodes: e,
  connections: t,
  selectedNodeIds: n,
  setNodes: r
}) => {
  const a = g.useCallback(() => {
      if (n.size === 0) {
        console.warn("[useNodeLayout] 没有选中任何节点");
        return;
      }
      const s = aAi(e, n, {
        spacing: 100,
        columns: 3,
        direction: "horizontal"
      });
      r(s), console.log(`[useNodeLayout] 已整理 ${n.size} 个节点`);
    }, [e, n, r]),
    i = g.useCallback(() => {
      if (n.size === 0) {
        console.warn("[useNodeLayout] 没有选中任何节点");
        return;
      }
      const s = iAi(e, n, t);
      r(s), console.log(`[useNodeLayout] 已对齐 ${n.size} 个节点`);
    }, [e, n, t, r]),
    o = g.useCallback(() => {
      if (n.size === 0) {
        console.warn("[useNodeLayout] 没有选中任何节点");
        return;
      }
      let s = 0;
      t.forEach(u => {
        n.has(u.from) && n.has(u.to) && s++;
      });
      const l = n.size * (n.size - 1),
        d = l > 0 ? s / l : 0;
      console.log(`[useNodeLayout] 连接数: ${s}, 连接密度: ${(d * 100).toFixed(2)}%`), d > .2 || s > n.size * .5 ? (console.log("[useNodeLayout] 检测到工作流结构，使用树形布局"), i()) : (console.log("[useNodeLayout] 使用网格布局"), a());
    }, [e, n, t, r, a, i]);
  return {
    autoLayout: a,
    autoAlign: i,
    smartAutoLayout: o
  };
};

function Ocn() {
  const e = k7();
  return Array.isArray(e.customStyles) ? e.customStyles : [];
}

function sAi() {
  const [e, t] = g.useState(Ocn);
  return g.useEffect(() => {
    const n = () => t(Ocn()),
      r = a => {
        (a.key === OYe || a.key === null) && n();
      };
    return window.addEventListener("storage", r), window.addEventListener("focus", n), window.addEventListener(WFe, n), () => {
      window.removeEventListener("storage", r), window.removeEventListener("focus", n), window.removeEventListener(WFe, n);
    };
  }, []), g.useMemo(() => [...Rze, ...e], [e]);
}

function lAi(e) {
  return async t => {
    const n = e(),
      r = n.document.lease(),
      a = () => n.active() && r.isCurrent(),
      i = String((t == null ? void 0 : t.nodePrompt) ?? "").trim() || String((t == null ? void 0 : t.zh) ?? "").trim();
    if (!i || !a()) return;
    const {
        view: o,
        size: s
      } = n.viewport(),
      l = s ? (s.width / 2 - o.x) / o.zoom : 200,
      d = s ? (s.height / 2 - o.y) / o.zoom : 200,
      u = n.generateId();
    let h = {};
    try {
      h = n.defaultSettings();
    } catch {}
    const p = (Array.isArray(t.referenceImages) ? t.referenceImages : []).map((b, v) => {
        var _;
        return {
          url: b,
          label: String(((_ = t.referenceImageNames) == null ? void 0 : _[v]) ?? "").trim() || `参考图${v + 1}`
        };
      }).filter(({
        url: b
      }) => typeof b == "string" && b.trim()),
      m = await Promise.all(p.map(async ({
        url: b,
        label: v
      }) => {
        const _ = await n.resolve(b, {
          nodeName: v
        });
        return _ ? {
          drop: _,
          label: v,
          id: n.generateId()
        } : null;
      }));
    if (!a()) return;
    const f = m.filter(b => b !== null),
      y = f.map(({
        id: b
      }) => ({
        id: n.generateId(),
        from: b,
        to: u
      }));
    n.setNodes(b => {
      if (!a()) return b;
      const v = [];
      f.forEach(({
        id: w,
        label: k,
        drop: A
      }, S) => {
        var E, M;
        const C = Ki(w, "input-image", l - 160 - 332 - S % 3 * 28, d - 160 + Math.floor(S / 3) * 98, k, void 0, [...b, ...v]);
        C.content = A.content, C.settings = {
          ...C.settings,
          ...A.settings
        };
        const I = String(((E = A.settings) == null ? void 0 : E._localCacheAssetId) || ((M = A.settings) == null ? void 0 : M._assetId) || "").trim();
        I && (C._contentAssetId = I), C.width = 260, C.height = 280, v.push(C);
      });
      const _ = Ki(u, "gen-image", l - 160, d - 160, "生成图片", h, [...b, ...v]);
      return _.width = 320, _.height = 320, _.prompt = i, _.settings = {
        ..._.settings,
        compactImageWidget: !0,
        isCollapsed: !1
      }, [...b, ...v, _];
    }), y.length && n.setConnections(b => a() ? [...b, ...y] : b), n.select(b => a() ? u : b);
  };
}

function Bcn(e, t) {
  const n = dh(e) || N1.find(r => r.id === e);
  return n != null && n.resolutions && n.resolutions.length > 0 ? n.resolutions[0] : t === "Image" ? "1K" : "1080P";
}

function cAi(e, t) {
  var a, i, o;
  const n = dh(e),
    r = n != null && n.customProtocol && ((a = n.ratios) != null && a.length) ? n.ratios[0] : t === "Image" ? "1:1" : "16:9";
  try {
    const s = localStorage.getItem("modelSettings");
    if (s) {
      const d = JSON.parse(s);
      if (d[e]) return {
        model: e,
        ...d[e],
        ...(n != null && n.customProtocol ? {
          ratio: (i = n.ratios) != null && i.length && !n.ratios.includes(d[e].ratio) ? r : d[e].ratio,
          resolution: (o = n.resolutions) != null && o.length && !n.resolutions.includes(d[e].resolution) ? n.resolutions[0] : d[e].resolution
        } : {})
      };
    }
    const l = Bcn(e, t);
    return {
      model: e,
      resolution: l,
      ratio: r
    };
  } catch (s) {
    console.error("[ModelSettings] Failed to get model settings:", s);
    const l = Bcn(e, t);
    return {
      model: e,
      resolution: l,
      ratio: r
    };
  }
}

function WCe(e) {
  try {
    const t = e === "Image" ? "selectedImageModel" : "selectedVideoModel",
      n = localStorage.getItem(t);
    if (!n) return null;
    const r = JSON.parse(n);
    return cAi(r, e);
  } catch (t) {
    return console.error("[ModelSettings] Failed to get current model settings:", t), null;
  }
}

function dAi() {
  try {
    if (localStorage.getItem("modelSettingsMigrated") === "true") return;
    console.log("[ModelSettings] Starting migration from old settings...");
    const t = {},
      n = localStorage.getItem("globalImageDefaults");
    if (n) try {
      const a = JSON.parse(n);
      a.model && (t[a.model] = {
        resolution: a.resolution || "1K",
        ratio: a.ratio || "1:1"
      }, localStorage.setItem("selectedImageModel", JSON.stringify(a.model)), console.log("[ModelSettings] Migrated image settings for model:", a.model));
    } catch (a) {
      console.error("[ModelSettings] Failed to migrate image settings:", a);
    }
    const r = localStorage.getItem("globalVideoDefaults");
    if (r) try {
      const a = JSON.parse(r);
      a.model && (t[a.model] = {
        resolution: a.resolution || "1080P",
        ratio: a.ratio || "16:9"
      }, localStorage.setItem("selectedVideoModel", JSON.stringify(a.model)), console.log("[ModelSettings] Migrated video settings for model:", a.model));
    } catch (a) {
      console.error("[ModelSettings] Failed to migrate video settings:", a);
    }
    Object.keys(t).length > 0 && (localStorage.setItem("modelSettings", JSON.stringify(t)), console.log("[ModelSettings] Migration completed. Settings:", t)), localStorage.setItem("modelSettingsMigrated", "true");
  } catch (e) {
    console.error("[ModelSettings] Migration failed:", e);
  }
}

function uAi(e) {
  const t = g.useRef(e);
  t.current = e;
  const n = g.useRef({}),
    r = g.useRef(!1),
    [a] = g.useState(() => lAi(() => {
      const i = t.current,
        o = n.current;
      return {
        ...i,
        select: i.setSelectedNodeId,
        active: () => r.current && n.current === o,
        viewport: () => {
          var s;
          return {
            view: i.view,
            size: ((s = i.canvasRef.current) == null ? void 0 : s.getBoundingClientRect()) ?? null
          };
        },
        defaultSettings: () => WCe("Image") ?? {},
        resolve: async (...s) => {
          const {
            resolveUrlForInputImageCanvas: l
          } = await Ie(async () => {
            const {
              resolveUrlForInputImageCanvas: d
            } = await Promise.resolve().then(() => sw);
            return {
              resolveUrlForInputImageCanvas: d
            };
          }, void 0, import.meta.url);
          return l(...s);
        }
      };
    }));
  return g.useLayoutEffect(() => (r.current = !0, () => {
    r.current = !1, n.current = {};
  }), []), a;
}

function hAi(e, t, n, r) {
  const a = e.width / Math.max(1, e.height),
    i = Math.max(120, Math.round(a >= 1 ? Math.min(360, e.width) : Math.min(360 * a, e.width))),
    o = Math.max(90, Math.round(a >= 1 ? Math.min(300 / a, e.height) : Math.min(300, e.height)));
  return {
    width: i,
    height: o,
    x: t ? t.x + t.width + 48 : (r.width / 2 - n.x) / n.zoom - i / 2,
    y: t ? t.y + Math.max(0, (t.height - o) / 2) : (r.height / 2 - n.y) / n.zoom - o / 2
  };
}

function pAi(e) {
  return async (t, n) => {
    const r = e(),
      a = r.document.lease(),
      i = r.directorId,
      o = () => r.active() && a.isCurrent() && (!i || r.nodes().some(s => s.id === i));
    if (o()) try {
      const s = await r.dimensions(t);
      if (!o()) return;
      const l = `${s.width}×${s.height}`,
        d = (n || "director3d").replace(/[^\w\u4e00-\u9fa5-]+/g, "_") || "director3d",
        u = await r.prepare(t, d, l);
      if (!o()) return;
      const h = r.generateId();
      r.setNodes(p => {
        if (!o()) return p;
        const m = p.find(b => b.id === i);
        if (i && !m) return p;
        const f = hAi(s, m, r.view, r.screen),
          y = Ki(h, "input-image", f.x, f.y, n ? `3D分镜·${n}` : "3D分镜截图", void 0, p);
        return [...p, {
          ...y,
          ...f,
          content: u.content,
          settings: {
            ...y.settings,
            mediaType: "image",
            hasCustomSize: !0,
            imageSize: l,
            ...u.settings
          },
          ...(u.assetId ? {
            _contentAssetId: u.assetId
          } : {})
        }];
      }), r.select(p => o() ? h : p), o() && r.success("截图已发送到画布");
    } catch (s) {
      o() && r.error((s == null ? void 0 : s.message) || "发送到画布失败");
    }
  };
}

function mAi(e) {
  const t = g.useRef(e);
  t.current = e;
  const n = g.useRef({}),
    r = g.useRef(!1),
    [a] = g.useState(() => pAi(() => {
      const i = t.current,
        o = n.current;
      return {
        ...i,
        directorId: i.directorIdRef.current,
        nodes: () => t.current.nodesRef.current,
        active: () => r.current && o === n.current,
        screen: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        dimensions: uXe,
        prepare: async (s, l, d) => {
          if (ua()) {
            const p = await Uk(s, `${l}_${Date.now()}.png`);
            if (p) {
              const m = Hv(p, {
                hasCustomSize: !0,
                imageSize: d
              });
              return {
                content: m.content || p.displayUrl,
                settings: m.settings ?? {}
              };
            }
          }
          const u = await i.prepareLocal(s),
            h = u.settingsExtras._assetId;
          return {
            content: u.url,
            settings: u.settingsExtras,
            assetId: typeof h == "string" && h ? h : void 0
          };
        }
      };
    }));
  return g.useLayoutEffect(() => (r.current = !0, () => {
    r.current = !1, n.current = {};
  }), []), a;
}

function fAi(e) {
  return async (t, n, r) => {
    const a = e(),
      i = a.document.lease(),
      o = () => a.active() && i.isCurrent();
    if (o()) try {
      const s = await a.prepare(t, n, r);
      if (!o()) return;
      const l = a.generateId(),
        d = (320 - a.view.x) / a.view.zoom,
        u = -a.view.y / a.view.zoom + 100;
      a.setNodes(h => {
        if (!o()) return h;
        const p = Ki(l, "input-image", d, u, n, void 0, h);
        return [...h, {
          ...p,
          width: 320,
          height: 280,
          content: s.url,
          settings: {
            ...p.settings,
            ...s.settingsExtras
          },
          ...(s.contentAssetId ? {
            _contentAssetId: s.contentAssetId
          } : {})
        }];
      }), a.select(h => o() ? l : h);
    } catch (s) {
      o() && a.error((s == null ? void 0 : s.message) || "素材插入失败");
    }
  };
}

function gAi(e) {
  const t = async r => {
    const a = {
      url: r,
      settingsExtras: {
        mediaType: "image"
      }
    };
    if (!/^(https?:|data:|blob:)/.test(r)) return a;
    try {
      const i = await e.store(),
        o = e.id();
      if (!(/^https?:/.test(r) ? await i.saveAsset(o, r) : await i.saveBlobAsset(o, await e.blob(r), r, "local"))) return e.warn("姿势素材缓存未保存，保留来源", new Error("asset save returned false")), a;
      let l = null;
      try {
        l = await i.getAssetUrl(o);
      } catch (u) {
        e.warn("读取姿势素材缓存预览失败", u);
      }
      const d = l || r;
      return {
        url: d,
        contentAssetId: o,
        settingsExtras: {
          mediaType: "image",
          _assetId: o,
          _localCacheAssetId: o,
          _contentAssetId: o,
          _blobUrl: d
        }
      };
    } catch (i) {
      return e.warn("姿势素材缓存准备失败", i), a;
    }
  };
  return {
    local: t,
    resolve: async (r, a) => {
      const i = (a || "pose").replace(/[^\w\u4e00-\u9fa5-]+/g, "_").slice(0, 48) || "pose";
      if (e.ossEnabled()) {
        if (e.publicOss(r)) {
          const s = e.normalizeOss(r) || r,
            l = e.ossPatch({
              remoteUrl: s,
              displayUrl: s,
              mediaType: "image"
            });
          return {
            url: String(l.content || s),
            settingsExtras: {
              mediaType: "image",
              ...l.settings
            }
          };
        }
        const o = await e.upload(r, `${i}_${e.now()}.png`);
        if (o) {
          const s = e.ossPatch(o);
          return {
            url: String(s.content || o.displayUrl),
            settingsExtras: {
              mediaType: "image",
              ...s.settings
            }
          };
        }
      }
      return t(r);
    }
  };
}

const $dr = gAi({
    store: async () => (await Ie(async () => {
      const {
        assetStore: e
      } = await Promise.resolve().then(() => Ri);
      return {
        assetStore: e
      };
    }, void 0, import.meta.url)).assetStore,
    blob: async e => {
      const t = await fetch(e);
      if (!t.ok) throw new Error(`素材读取失败 (${t.status})`);
      return t.blob();
    },
    id: () => `pose_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    now: Date.now,
    ossEnabled: ua,
    publicOss: nr,
    normalizeOss: e => ya(e) || e,
    upload: Uk,
    ossPatch: Hv,
    warn: (e, t) => console.warn("[PoseInput] " + e, t)
  }),
  yAi = $dr.local;

async function Gdr(e, t, n = "image") {
  if (n === "image") return $dr.resolve(e, t);
  const {
      resolveMaterialLibraryAssetForCanvas: r
    } = await Ie(async () => {
      const {
        resolveMaterialLibraryAssetForCanvas: i
      } = await Promise.resolve().then(() => U1);
      return {
        resolveMaterialLibraryAssetForCanvas: i
      };
    }, void 0, import.meta.url),
    a = await r({
      id: e,
      path: e,
      name: e.split(/[/\\]/).pop() || t || "Eagle",
      kind: n
    });
  if (!a) throw new Error("无法读取 Eagle 原文件");
  return {
    url: a.content,
    settingsExtras: {
      ...a.settingsExtras,
      mediaType: n
    }
  };
}

function bAi(e) {
  const t = g.useRef(e);
  t.current = e;
  const n = g.useRef(!1),
    r = g.useRef({}),
    [a] = g.useState(() => fAi(() => {
      const i = t.current,
        o = r.current;
      return {
        ...i,
        prepare: i.prepare ?? Gdr,
        active: () => n.current && o === r.current
      };
    }));
  return g.useLayoutEffect(() => (n.current = !0, () => {
    n.current = !1, r.current = {};
  }), []), a;
}

function vAi(e, t) {
  if (t.windowDragging() || t.panning() || t.panPending() || (t.move(e), t.hotInteraction()) || e.clientX == null || e.clientY == null || (t.client.current = {
    x: e.clientX,
    y: e.clientY
  }, !t.candidateEnabled)) return;
  const n = t.toWorld(e.clientX, e.clientY);
  n && (t.world.current = {
    x: n.x,
    y: n.y
  }, t.syncCandidate());
}

function wAi(e, t) {
  var n;
  !t.wireConnecting && !((n = t.nodeResizing) != null && n.call(t)) && (t.panning() || t.isPanning || t.panPending() || t.viewInteracting() && !t.isSelecting()) || (t.erasing && t.setEraserHud({
    x: e.clientX,
    y: e.clientY
  }), !(t.selection.isActive() || t.doodle.isActive() || t.text.isCreating()) && t.fallback(e));
}

function xAi(e, t) {
  if (t.selection.isActive()) t.selection.finish(e.nativeEvent);else if (t.doodle.isActive()) t.doodle.finish(e.nativeEvent);else if (t.text.isCreating()) t.text.finish({
    x: e.clientX,
    y: e.clientY
  }, !0);else {
    t.fallback(e);
    return;
  }
  e.preventDefault(), e.stopPropagation();
}

function _Ai(e, t) {
  t.editingProjectName && t.finishProjectName();
  const n = e.nativeEvent;
  if (t.activeTool === "doodle" && !(n instanceof PointerEvent) && n.type === "mousedown" && t.now() - t.lastPenDownAt < 500) return;
  if (e.button !== 0) {
    t.fallback(e);
    return;
  }
  const r = e.target,
    a = r.id === "canvas-bg" || r === e.currentTarget;
  t.focusEditing && !r.closest(".node-wrapper, [data-gen-prompt-panel], [data-focus-edit-mode-banner]") && t.cancelFocusAnalysis();
  const i = 'button, input, textarea, select, [contenteditable="true"], .node-dropdown-button, .node-dropdown-menu, .connector',
    o = t.activeTool === "doodle" && (t.subTool === "brush" || t.subTool === "eraser"),
    s = a || !r.closest(o ? i : `.node-wrapper, ${i}`);
  if (t.activeTool === "doodle" && s) {
    if (t.subTool === "select") {
      t.beginMarquee(e);
      return;
    }
    t.dismissEmptyState(), t.beginDoodle(n), e.preventDefault(), e.stopPropagation();
    return;
  }
  if (t.activeTool === "text-create") {
    a && t.beginText({
      x: e.clientX,
      y: e.clientY
    }) && (e.preventDefault(), e.stopPropagation());
    return;
  }
  t.fallback(e);
}

function kAi(e) {
  let t = !1,
    n = null,
    r = {};
  const a = () => {
    r = {}, n !== null && e().cancel(n), n = null;
  };
  return {
    activate() {
      t = !0;
    },
    cancel: a,
    dispose() {
      t = !1, a();
    },
    start(i, o = 380) {
      const s = e().view.current;
      if (s.x === i.x && s.y === i.y && s.zoom === i.zoom) return;
      a();
      const l = e(),
        d = l.document.lease(),
        u = r,
        h = () => t && r === u && d.isCurrent();
      if (!h()) return;
      const p = {
          ...l.view.current
        },
        m = {
          ...i
        },
        f = l.now(),
        y = Number.isFinite(o) && o >= 0 ? o : 380;
      if (y === 0) {
        l.view.current = m, l.setView(v => h() ? m : v);
        return;
      }
      const b = v => {
        if (!h()) return;
        n = null;
        const _ = Math.min(1, Math.max(0, (v - f) / y)),
          w = _ < .5 ? 4 * _ ** 3 : 1 - (-2 * _ + 2) ** 3 / 2,
          k = _ === 1 ? m : {
            x: p.x + (m.x - p.x) * w,
            y: p.y + (m.y - p.y) * w,
            zoom: p.zoom + (m.zoom - p.zoom) * w
          };
        l.view.current = k, l.setView(A => h() ? k : A), _ < 1 && h() && (n = l.request(b));
      };
      n = l.request(b);
    }
  };
}

function AAi(e) {
  const t = g.useRef(e);
  t.current = e;
  const [n] = g.useState(() => kAi(() => ({
    ...t.current,
    view: t.current.viewRef,
    now: () => performance.now(),
    request: r => requestAnimationFrame(r),
    cancel: r => cancelAnimationFrame(r)
  })));
  return g.useLayoutEffect(() => {
    n.activate();
    const r = e.document.subscribe(n.cancel);
    return vpt(() => n.cancel()), () => {
      vpt(null), r(), n.dispose();
    };
  }, [n, e.document]), n;
}

const SAi = 600,
  IAi = 100;

function CAi(e, t) {
  return e.x === t.x && e.y === t.y && e.zoom === t.zoom;
}

