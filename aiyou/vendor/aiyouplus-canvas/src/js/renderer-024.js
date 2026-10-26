async function Dte(e) {
  var H, Y, K, W, Q, q, ne, de, le, J, pe, ce, we, X, Z, re, fe, ye, ie, ae, be;
  const t = e.customProtocol;
  if (t) {
    const Ee = TF(e.result, t);
    if (Ee.status === "FAILED") throw new Error(String(Ee.error.message));
    e = {
      ...e,
      result: Ee
    };
  }
  const {
      result: n,
      taskId: r,
      node: a,
      baseUrl: i,
      apiKey: o,
      currentModel: s,
      isMidjourney: l,
      isVideoGeneration: d,
      connections: u,
      nodes: h,
      nodesRef: p,
      updateNode: m,
      setHistory: f,
      setHistoryProgressDeferred: y,
      updateGenerationProgress: b,
      connectedPreviewId: v,
      batchAccumulator: _,
      batchRemoteAccumulator: w,
      batchIndex: k,
      batchTaskIds: A,
      creationEndpoint: S,
      setNodes: C,
      generateId: I
    } = e,
    E = f,
    M = Ee => {
      xjt(f, Ee);
    },
    T = Ee => {
      const xe = String(r);
      _jt(f, xe, he => Ee(he.id === xe ? he : {
        ...he,
        id: xe
      }));
    },
    P = !d && (l || Iu(s)),
    R = (Ee, xe) => {
      _ === void 0 || k === void 0 || (_[k] = Ee, w && xe && (w[k] = xe));
    },
    j = (p == null ? void 0 : p.current) ?? h,
    B = yC(a.id, u, j),
    F = (H = a.settings) == null ? void 0 : H.selectedPreviewId,
    N = F && B.includes(F) ? F : v || ((Y = a.settings) == null ? void 0 : Y._autoCreatedPreviewId),
    G = N ? [N] : B.length > 0 ? [B[0]] : [],
    z = G[0],
    V = async (Ee, xe, he) => {
      await jSt({
        node: a,
        taskId: r,
        content: Ee,
        previewType: xe,
        connections: u,
        nodes: h,
        nodesRef: p,
        updateNode: m,
        initialPreviewId: v,
        extra: he
      });
    },
    O = a.nodeName;
  let L = D1t(n.data);
  if (m5(s) && !L && n.code !== void 0 && n.code !== 0) {
    const Ee = String(n.msg ?? "Grsai API 请求失败");
    T(xe => xe.id === r ? {
      ...xe,
      status: "failed",
      progress: 0,
      errorMsg: Ee
    } : xe), m(a.id, {
      isGenerating: !1,
      errorMsg: Ee
    });
    return;
  }
  if (!L && d && Dv(s)) {
    const Ee = (n == null ? void 0 : n.name) ?? ((K = n == null ? void 0 : n.data) == null ? void 0 : K.name) ?? ((W = n == null ? void 0 : n.operation) == null ? void 0 : W.name) ?? ((q = (Q = n == null ? void 0 : n.data) == null ? void 0 : Q.operation) == null ? void 0 : q.name) ?? null;
    typeof Ee == "string" && Ee && (L = String(Ee), console.log("[Gemini Veo Official] 提取 operation.name:", L));
  }
  if (d && String(s).startsWith("sora") && !wy(s)) {
    const Ee = n.data && typeof n.data == "object" ? n.data : null,
      xe = (Ee == null ? void 0 : Ee.task_id) ?? n.task_id ?? (Ee == null ? void 0 : Ee.id) ?? n.id;
    xe && (L = String(xe));
  }
  if (d && Dk(s)) {
    const Ee = n.data && typeof n.data == "object" ? n.data : null,
      xe = n.task_id ?? (Ee == null ? void 0 : Ee.task_id) ?? n.id ?? (Ee == null ? void 0 : Ee.id);
    xe && (L = String(xe));
  }
  if (d && Fv(s)) {
    const Ee = n.data && typeof n.data == "object" ? n.data : null,
      xe = n.task_id ?? (Ee == null ? void 0 : Ee.task_id) ?? n.id ?? (Ee == null ? void 0 : Ee.id);
    xe && (L = String(xe));
  }
  if (d && Cu(s)) {
    const Ee = X9t(n);
    if (Ee) {
      m(a.id, {
        isGenerating: !1,
        errorMsg: Ee
      }), T(he => he.id === r ? {
        ...he,
        status: "failed",
        progress: 0,
        errorMsg: Ee
      } : he);
      return;
    }
    const xe = XBn(n);
    xe && (L = xe);
  }
  if (d && X2(s)) {
    const Ee = n.data && typeof n.data == "object" ? n.data : null,
      xe = n.task_id ?? (Ee == null ? void 0 : Ee.task_id) ?? n.id ?? (Ee == null ? void 0 : Ee.id);
    xe && (L = String(xe));
  }
  if (!L && n.base_resp && typeof n.base_resp == "object") {
    const Ee = n.base_resp;
    if (console.log("[Hailuo] 检查 base_resp:", Ee), Ee.status_code === 0) {
      const xe = dp(n.task_id);
      xe && (L = xe, console.log("[Hailuo] 从 base_resp 提取 task_id:", L));
    } else if (Ee.status_code !== 0) {
      const xe = Ee.status_msg || "请求失败";
      console.error("[Hailuo] 请求失败:", xe, Ee), m(a.id, {
        isGenerating: !1,
        errorMsg: String(xe)
      }), T(he => he.id === r ? {
        ...he,
        status: "failed",
        progress: 0,
        errorMsg: String(xe)
      } : he);
      return;
    }
  }
  if (!L && Y1(s)) {
    console.log("[Wan 2.6] 提取任务 ID，完整响应:", jte(n));
    const Ee = dp(n.task_id);
    if (Ee) L = Ee, console.log("[Wan 2.6] ✓ 从根级别提取 task_id:", L);else if (n.output && typeof n.output == "object") {
      const xe = n.output;
      console.log("[Wan 2.6] 检查 output keys:", Object.keys(xe));
      const he = dp(xe.task_id);
      if (he && (L = he, console.log("[Wan 2.6] ✓ 从 output 提取 task_id:", L)), xe.task_status === "FAILED") {
        const ue = xe.code || "Unknown",
          ge = xe.message || "创建任务失败";
        console.error("[Wan 2.6] ✗ 创建任务失败:", ue, ge), m(a.id, {
          isGenerating: !1,
          errorMsg: `${ue}: ${ge}`
        }), T(_e => _e.id === r ? {
          ..._e,
          status: "failed",
          progress: 0,
          errorMsg: `${ue}: ${ge}`
        } : _e);
        return;
      }
    }
    if (n.status === "FAILED" || n.status === "ERROR") {
      const xe = String(n.fail_reason || "创建任务失败");
      console.error("[Wan 2.6] ✗ 创建任务失败:", xe), m(a.id, {
        isGenerating: !1,
        errorMsg: xe
      }), T(he => he.id === r ? {
        ...he,
        status: "failed",
        progress: 0,
        errorMsg: xe
      } : he);
      return;
    }
    L || console.error("[Wan 2.6] ✗ 未能提取任务ID，响应:", n);
  }
  const U = qM(s) && n.choices && Array.isArray(n.choices) && n.choices.length > 0;
  if (!L && (n.task_id != null || n.taskId != null) && (mm(s) || fk(s)) && (L = String(n.task_id ?? n.taskId)), L = L || (U ? null : dp(n.id)) || dp(n.request_id) || dp(n.requestId) || dp(n.task_id) || dp(n.taskId) || (n.data && typeof n.data == "object" ? dp(n.data.request_id) || dp(n.data.requestId) || dp(n.data.task_id) || dp(n.data.taskId) : null) || (typeof n.data == "string" && n.data.length > 10 ? n.data : null) || (l && (n.code === 1 || n.code === 22) ? dp(n.result) : null), (mm(s) || fk(s)) && n.success === !1 && !L) {
    const Ee = hd(n, "创建任务失败");
    m(a.id, {
      isGenerating: !1,
      errorMsg: Ee
    }), T(xe => xe.id === r ? {
      ...xe,
      status: "failed",
      progress: 0,
      errorMsg: Ee
    } : xe);
    return;
  }
  if (L && !d && !l && t5(n, !1, !1, {
    quiet: !0
  }).length > 0 && (L = null), L) {
    lEe(r), dcr(r);
    const Ee = ((ne = a.settings) == null ? void 0 : ne.mjMode) || "fast",
      xe = a.type === "motion-control" ? "motion-control" : Lk(s) || O2(s) || jv(s) ? S != null && S.includes("/kling/v1/videos/image2video") ? "image2video" : "text2video" : void 0;
    E(rt => rt.map(nt => String(nt.id) === String(r) ? {
      ...nt,
      status: "generating",
      progress: Math.max(nt.progress ?? 0, 5),
      remoteTaskId: String(L),
      ...(xe ? {
        klingTaskType: xe
      } : {}),
      ...(U5(s) ? {
        mjMode: Ee
      } : {})
    } : nt));
    const he = Math.ceil(1600 / .8),
      ue = Date.now(),
      ge = !d && !l ? "fast-image" : Fv(s) || Dk(s) ? "slow-video" : X2(s) ? "wan30" : "media",
      _e = mm(s) || fk(s),
      ke = _e && L ? `huya:${String(a.id)}:${String(L)}` : "";
    if (!Ayi(ke)) return;
    const ve = mm(s) && !d && (Array.isArray((de = a.settings) == null ? void 0 : de.referenceImages) && a.settings.referenceImages.length > 0 || u.some(rt => {
        if (rt.from !== a.id) return !1;
        const nt = h.find(ze => ze.id === rt.to);
        return (nt == null ? void 0 : nt.type) === "input-image" || (nt == null ? void 0 : nt.type) === "preview" && !!nt.content;
      })),
      Te = p7({
        isVideo: d,
        isImage2Image: ve,
        isLongVideo: d && (Ih(s) || AZ(s))
      });
    let Ne = 0,
      me = 0,
      Ae = "fast";
    const Fe = qBt(String(r)),
      Me = (rt, nt = lz(ge, rt)) => V8({
        attempt: rt,
        baseInterval: nt,
        isDocumentHidden: typeof document < "u" && document.visibilityState === "hidden",
        scheduleKey: Fe,
        lane: Ae
      }),
      Re = (rt, nt, ze = 0, Le) => {
        const Ke = Me(rt, Le ?? lz(ge, Math.max(0, rt - 1)));
        ik.schedule(Fe, Ke, () => $e(rt, nt, ze));
      },
      $e = async (rt = 0, nt = -1, ze = 0) => {
        var Ye, Ce, He, Ve, it, It, Ft, We, Ze, Ge;
        const Ke = Oe => String(Oe || "").replace(/^\/+/, "").split("/").map(st => encodeURIComponent(st)).join("/"),
          Xe = () => {
            if (z_t(a.id)) return !0;
            const Oe = p == null ? void 0 : p.current;
            return Array.isArray(Oe) && !Oe.some(st => st.id === a.id);
          },
          De = () => Xe() ? (QBt(a.id), Lot(String(r)), Jx(ke), !0) : !1;
        if (!De()) {
          if (U_t(String(r))) {
            const Oe = "已取消轮询（任务可能仍在后台执行）";
            if (Lot(String(r)), Jx(ke), De()) return;
            T(st => st.id === r ? {
              ...st,
              status: "failed",
              progress: 0,
              errorMsg: Oe
            } : st), m(a.id, {
              isGenerating: !1,
              errorMsg: Oe
            });
            return;
          }
          if (Bbe(String(r))) {
            Jx(ke);
            return;
          }
          if (Date.now() - ue > yyi) {
            const Oe = "生成超时（20分钟）";
            Jx(ke), T(st => st.id === r ? {
              ...st,
              status: "failed",
              progress: 0,
              errorMsg: Oe
            } : st), m(a.id, {
              isGenerating: !1,
              errorMsg: Oe
            });
            return;
          }
          if (_e && rt >= Te) {
            Jx(ke);
            const Oe = "Polling timeout";
            T(st => st.id === r ? {
              ...st,
              status: "failed",
              progress: 0,
              errorMsg: Oe
            } : st), m(a.id, {
              isGenerating: !1,
              errorMsg: Oe
            });
            return;
          }
          if (rt > he) {
            Jx(ke), T(Oe => Oe.id === r ? {
              ...Oe,
              status: "failed",
              progress: 0,
              errorMsg: "生成超时（1600秒）"
            } : Oe), m(a.id, {
              isGenerating: !1,
              errorMsg: "生成超时（1600秒）"
            });
            return;
          }
          try {
            let Oe;
            const st = t ? wxe(t, i, o, String(L)) : void 0;
            if (st) Oe = st.url;else if (l) Oe = `${i}/${Ee}/mj/task/${L}/fetch`;else if (d) {
              if (a.type === "motion-control") Oe = `${i}/kling/v1/videos/motion-control/${encodeURIComponent(L)}`;else if (zv(s)) Oe = `${i}/kling/v1/videos/omni-video/${encodeURIComponent(L)}`;else if (Lk(s)) {
                const qe = S != null && S.includes("/kling/v1/videos/image2video") ? "image2video" : "text2video";
                Oe = `${i}/kling/v1/videos/${qe}/${encodeURIComponent(L)}`;
              } else if (O2(s)) {
                const qe = S != null && S.includes("/kling/v1/videos/image2video") ? "image2video" : "text2video";
                Oe = `${i}/kling/v1/videos/${qe}/${encodeURIComponent(L)}`;
              } else if (jv(s)) {
                const qe = S != null && S.includes("/kling/v1/videos/image2video") ? "image2video" : "text2video";
                Oe = `${i}/kling/v1/videos/${qe}/${encodeURIComponent(L)}`;
              } else if (fk(s)) {
                const qe = b3(s9(S || i, s));
                Oe = gk(qe, String(L));
              } else if (Dv(s)) Oe = `${i.replace(/\/+$/, "")}/v1beta/${Ke(String(L))}`;else if (Ex(s) || PE(s)) Oe = `${i}/v2/videos/generations/${encodeURIComponent(L)}`;else if (ag(s)) Oe = w8t(i, String(L), {
                openAiCompat: oce(S)
              });else if (Tb(s) && !HM(s)) Oe = `${i}${xce(s)}/${encodeURIComponent(L)}`;else if (Y1(s)) gX(s) ? Oe = `${i}/api/v1/tasks/${encodeURIComponent(L)}` : Oe = `${i}/v2/videos/generations/${encodeURIComponent(L)}`;else if (bx(s)) Oe = `${i}/minimax/v1/query/video_generation?task_id=${encodeURIComponent(L)}`;else if (_b(s)) Oe = `${i}/vidu/ent/v2/tasks/${encodeURIComponent(L)}/creations`;else if (U5(s)) {
                const qe = ((Ye = a.settings) == null ? void 0 : Ye.mjMode) || "fast";
                Oe = `${i}/${qe}/mj/task/${encodeURIComponent(L)}/fetch`;
              } else Cu(s) ? Oe = `${i.replace(/\/+$/, "")}/v2/query/video_generation/${encodeURIComponent(L)}` : Dk(s) || Fv(s) || X2(s) ? Oe = `${i}/v1/videos/${encodeURIComponent(L)}` : s.startsWith("sora") && !wy(s) ? i.includes("api.openai.com") ? Oe = `${i}/videos/${encodeURIComponent(L)}` : Oe = `${i}/v2/videos/generations/${encodeURIComponent(L)}` : Oe = `${i}/v1/videos/${encodeURIComponent(L)}`;
            } else if (m5(s)) Oe = `${i.replace(/\/+$/, "")}/v1/draw/result`;else if (qM(s)) Oe = `${i}/v1/images/tasks/${encodeURIComponent(L)}`;else if (mm(s)) {
              const qe = EU(sX(s, S || i));
              Oe = gk(qe, String(L));
            } else yX(s) ? Oe = `${i}/api/v1/tasks/${encodeURIComponent(L)}` : Oe = `${i}/v1/images/tasks/${L}`;
            const vt = {};
            if (Dv(s) || KM(s)) vt["x-goog-api-key"] = o;else {
              const qe = _b(s) ? "Token" : "Bearer";
              vt.Authorization = `${qe} ${o}`;
            }
            ag(s) && !oce(Oe) && (vt.debug_accept_unset_ratio_model = "true"), m5(s) && (vt["Content-Type"] = "application/json");
            const Ht = st ? st.options : m5(s) ? {
                method: "POST",
                headers: vt,
                body: JSON.stringify({
                  id: L
                })
              } : {
                headers: vt
              },
              nn = await iMn(async qe => U_t(String(r)) || z_t(a.id) || Bbe(String(r)) ? null : Iao(Oe, {
                ...Ht,
                signal: qe
              }), Ae, String(r));
            if (!nn) {
              Lot(String(r)), Jx(ke);
              return;
            }
            if (De()) return;
            const pt = nn.status,
              lt = pt >= 200 && pt < 300;
            let gt = {};
            try {
              if (!nn.parsed) throw new SyntaxError("Poll returned non-JSON body");
              gt = t && lt ? TF(nn.data, t, !0) : nn.data, Cu(s) && (gt = JBn(gt));
            } catch {
              const qe = Math.min(10 + rt * 2, 90);
              y(r, qe), b(r, a.id, qe), Re(rt + 1, qe);
              return;
            }
            if (De()) return;
            if (mm(s) || fk(s)) {
              if (!lt) {
                const rn = hd(gt, String(pt));
                if (pt === 401 || pt === 403 || pt >= 500) {
                  Jx(ke), T(Yn => Yn.id === r ? {
                    ...Yn,
                    status: "failed",
                    progress: 0,
                    errorMsg: rn
                  } : Yn), m(a.id, {
                    isGenerating: !1,
                    errorMsg: rn
                  });
                  return;
                }
              }
              const qe = fv(gt, d),
                kt = qe.status,
                St = qe.urls,
                hn = E1(gt, kt);
              if (St.length > 0) {
                Jx(ke);
                const rn = Iu(s) ? q9t(gt, St) : St,
                  Yn = rn[0];
                if (d) {
                  await oV({
                    resultUrl: Yn,
                    taskId: r,
                    node: a,
                    currentModel: s,
                    pollStartedAt: ue,
                    sourceNodeName: O,
                    remoteTaskId: L,
                    updateNode: m,
                    setHistory: E,
                    updateAllConnectedPreviews: V
                  });
                  return;
                }
                if (Iu(s)) {
                  await soo({
                    resultUrls: rn,
                    taskId: r,
                    node: a,
                    currentModel: s,
                    sourceNodeName: O,
                    connectedPreviewId: z,
                    nodes: h,
                    nodesRef: p,
                    latestNodes: j,
                    setNodes: C,
                    generateId: I,
                    pollStartedAt: ue,
                    batchAccumulator: _,
                    batchIndex: k,
                    batchRemoteAccumulator: w,
                    updateNode: m,
                    setHistory: E,
                    updateAllConnectedPreviews: V,
                    writeBatchPreviewSlot: R
                  });
                  return;
                }
                await Kye({
                  resultUrls: rn,
                  taskId: r,
                  node: a,
                  currentModel: s,
                  pollStartedAt: ue,
                  sourceNodeName: O,
                  batchAccumulator: _,
                  batchIndex: k,
                  batchRemoteAccumulator: w,
                  updateNode: m,
                  setHistory: E,
                  updateAllConnectedPreviews: V,
                  writeBatchPreviewSlot: R,
                  nodesRef: p
                });
                return;
              }
              if (hn) {
                Jx(ke);
                let rn = hd(gt, kt || "任务失败");
                (Ip(s) || Ih(s)) && (Nke(rn) ? rn = `${rn}

素材报备未完成，请保持「真人素材」开启并等待 1～2 分钟后重试。` : bBt(rn) && (rn = `${rn}

参考图含真人脸：请勾选「真人素材」(isUploadAsset:true)，参考图仍须为 OSS 公网 https URL。`)), (Ip(s) || Ih(s)) && /taskId missing/i.test(rn) && console.error(`[Huya Seedance ${Ih(s) ? "2.5" : "2.0"}] 火山子任务创建失败：参考图须为 OSS 外网直链。若 images 含 art.huya.info/.../files/.../content 则火山无法下载。详情:`, gt), T(Yn => Yn.id === r ? {
                  ...Yn,
                  status: "failed",
                  progress: 0,
                  errorMsg: rn
                } : Yn), m(a.id, {
                  isGenerating: !1,
                  errorMsg: rn
                });
                return;
              }
              let Qt = ze;
              if (Kj(kt)) {
                if (Qt += 1, Qt >= 24) {
                  Jx(ke);
                  const rn = hd(gt, "任务已成功但未返回结果 URL，请稍后在虎牙后台查看或重试");
                  T(Yn => Yn.id === r ? {
                    ...Yn,
                    status: "failed",
                    progress: 0,
                    errorMsg: rn
                  } : Yn), m(a.id, {
                    isGenerating: !1,
                    errorMsg: rn
                  });
                  return;
                }
              } else Qt = 0;
              const Ot = eP(gt, rt),
                ln = typeof gt.progress == "number" || gt.data && typeof gt.data == "object" && typeof gt.data.progress == "number" ? Ot : Math.min(10 + rt * 2, 90);
              ln !== nt && (y(r, ln), b(r, a.id, ln));
              const Pn = _e ? ES : lz(ge, rt);
              Re(rt + 1, ln, Qt, Pn);
              return;
            }
            if (!lt && _b(s) && d) {
              console.warn("[Vidu] 轮询请求超时或临时错误，继续轮询:", (gt == null ? void 0 : gt.error) || pt);
              const qe = Math.min(10 + rt * 2, 90);
              y(r, qe), b(r, a.id, qe), Re(rt + 1, qe);
              return;
            }
            if (Dv(s) && d) {
              if (!!!(gt != null && gt.done)) {
                const hn = Math.min(10 + rt * 2, 90);
                hn !== nt && (y(r, hn), b(r, a.id, hn)), Re(rt + 1, hn);
                return;
              }
              if (gt != null && gt.error) {
                const hn = typeof gt.error == "string" ? gt.error : JSON.stringify(gt.error);
                T(Qt => Qt.id === r ? {
                  ...Qt,
                  status: "failed",
                  progress: 0,
                  errorMsg: hn
                } : Qt), m(a.id, {
                  isGenerating: !1,
                  errorMsg: hn
                });
                return;
              }
              const St = (hn => {
                var Pn, rn, Yn, Ct, Cn, un, Jn, Kn, en;
                const Qt = (Cn = (Ct = (Yn = (rn = (Pn = hn == null ? void 0 : hn.response) == null ? void 0 : Pn.generateVideoResponse) == null ? void 0 : rn.generatedSamples) == null ? void 0 : Yn[0]) == null ? void 0 : Ct.video) == null ? void 0 : Cn.uri;
                if (typeof Qt == "string" && Qt) return Qt;
                const Ot = (en = (Kn = (Jn = (un = hn == null ? void 0 : hn.response) == null ? void 0 : un.generatedVideos) == null ? void 0 : Jn[0]) == null ? void 0 : Kn.video) == null ? void 0 : en.uri;
                return typeof Ot == "string" && Ot ? Ot : P2e(hn, 0, !0) || null;
              })(gt);
              if (!St) {
                const hn = "Veo 官方接口返回完成，但未找到视频下载地址";
                T(Qt => Qt.id === r ? {
                  ...Qt,
                  status: "failed",
                  progress: 0,
                  errorMsg: hn
                } : Qt), m(a.id, {
                  isGenerating: !1,
                  errorMsg: hn
                });
                return;
              }
              try {
                const hn = await $i(St, {
                  headers: {
                    "x-goog-api-key": o
                  }
                });
                if (!hn.ok) {
                  const Pn = await hn.text();
                  throw new Error(`下载视频失败: HTTP ${hn.status}: ${Pn}`);
                }
                const Qt = await hn.blob(),
                  Ot = `${r}_video`;
                await ni.saveBlobAsset(Ot, Qt, St);
                const ln = await ni.getAssetUrl(Ot);
                if (!ln) throw new Error("保存视频到本地缓存失败（无法获取 blob URL）");
                T(Pn => {
                  if (Pn.id !== r) return Pn;
                  const rn = Pn.startTime ? Date.now() - Pn.startTime : void 0;
                  return {
                    ...Pn,
                    status: "completed",
                    progress: 100,
                    url: ln,
                    _assetId: Ot,
                    durationMs: rn
                  };
                }), m(a.id, {
                  isGenerating: !1,
                  content: ln,
                  settings: {
                    ...a.settings,
                    isGenerating: !1,
                    progress: 100,
                    error: null
                  }
                }), await V(ln, "video", {
                  sourceNodeName: O,
                  previewSourceModel: s
                }), Ie(async () => {
                  const {
                    scheduleHistoryOssAutoUpload: Pn
                  } = await Promise.resolve().then(() => qh);
                  return {
                    scheduleHistoryOssAutoUpload: Pn
                  };
                }, void 0, import.meta.url).then(({
                  scheduleHistoryOssAutoUpload: Pn
                }) => Pn(r, [Ot])).catch(() => {});
                return;
              } catch (hn) {
                const Qt = (hn == null ? void 0 : hn.message) || String(hn);
                T(Ot => Ot.id === r ? {
                  ...Ot,
                  status: "failed",
                  progress: 0,
                  errorMsg: Qt
                } : Ot), m(a.id, {
                  isGenerating: !1,
                  errorMsg: Qt
                });
                return;
              }
            }
            if ((Lk(s) || O2(s) || jv(s)) && d) {
              let qe;
              if (gt.task_status) qe = gt;else if (gt.data && typeof gt.data == "object") {
                const Qt = gt.data;
                Qt.task_status ? qe = Qt : Qt.data && typeof Qt.data == "object" && (qe = Qt.data);
              }
              if (!qe) {
                const Qt = Math.min(10 + rt * 2, 90);
                y(r, Qt), b(r, a.id, Qt), Re(rt + 1, nt);
                return;
              }
              const kt = String(qe.task_status || "").toLowerCase(),
                St = qe.task_result,
                hn = St == null ? void 0 : St.videos;
              if (kt === "succeed" || kt === "success") {
                if (hn && hn.length > 0 && hn[0].url) {
                  const Qt = hn[0].url,
                    Ot = O2(s),
                    ln = jv(s);
                  await oV({
                    resultUrl: Qt,
                    taskId: r,
                    node: a,
                    currentModel: s,
                    pollStartedAt: ue,
                    sourceNodeName: O,
                    updateNode: m,
                    setHistory: E,
                    updateAllConnectedPreviews: V
                  });
                  return;
                } else {
                  const Qt = "未返回视频 URL";
                  console.error("[Kling v2.5 Turbo] 错误:", Qt), T(Ot => Ot.id === r ? {
                    ...Ot,
                    status: "failed",
                    progress: 0,
                    errorMsg: Qt
                  } : Ot), m(a.id, {
                    isGenerating: !1,
                    errorMsg: Qt
                  });
                  return;
                }
              } else if (kt === "failed" || kt === "failure" || kt === "error") {
                const Qt = String(qe.task_status_msg || "任务失败");
                console.error("[Kling v2.5 Turbo] 任务失败:", Qt), T(Ot => Ot.id === r ? {
                  ...Ot,
                  status: "failed",
                  progress: 0,
                  errorMsg: Qt
                } : Ot), m(a.id, {
                  isGenerating: !1,
                  errorMsg: Qt
                });
                return;
              } else if (kt === "processing" || kt === "submitted") {
                const Qt = Math.min(10 + rt * 2, 90);
                y(r, Qt), b(r, a.id, Qt), Re(rt + 1, Qt);
                return;
              } else {
                const Qt = Math.min(10 + rt * 2, 90);
                y(r, Qt), b(r, a.id, Qt), Re(rt + 1, Qt);
                return;
              }
            }
            if (Y1(s) && d) {
              const qe = gX(s);
              console.log(`[Wan 2.6 ${qe ? "Official" : "Proxy"}] 轮询响应:`, jte(gt)), console.log("[Wan 2.6] 响应 keys:", Object.keys(gt));
              let kt,
                St = null,
                hn = null,
                Qt = 0;
              if (qe) {
                const Ot = gt.output && typeof gt.output == "object" ? gt.output : {};
                kt = String(Ot.task_status || "").toUpperCase(), St = dp(Ot.video_url), hn = dp(Ot.message) || dp(Ot.code);
              } else {
                kt = String(gt.status || "").toUpperCase();
                const Ot = gt.data && typeof gt.data == "object" ? gt.data : null;
                if (St = Ot ? dp(Ot.output) : null, hn = dp(gt.fail_reason), gt.progress) {
                  const ln = String(gt.progress).replace("%", "");
                  Qt = parseInt(ln, 10) || 0;
                }
              }
              if (kt || (kt = String(gt.task_status || gt.state || "").toUpperCase(), St || (St = dp(gt.video_url) || dp(gt.url))), kt === "SUCCESS" || kt === "SUCCEEDED") {
                if (St) {
                  await oV({
                    resultUrl: St,
                    taskId: r,
                    node: a,
                    currentModel: s,
                    pollStartedAt: ue,
                    sourceNodeName: O,
                    updateNode: m,
                    setHistory: E,
                    updateAllConnectedPreviews: V
                  });
                  return;
                } else {
                  const Ot = "未返回视频 URL";
                  console.error("[Wan 2.6] 错误:", Ot, gt), T(ln => ln.id === r ? {
                    ...ln,
                    status: "failed",
                    progress: 0,
                    errorMsg: Ot
                  } : ln), m(a.id, {
                    isGenerating: !1,
                    errorMsg: Ot
                  });
                  return;
                }
              } else if (kt === "FAILED" || kt === "FAILURE" || kt === "ERROR") {
                const Ot = hn || "生成失败";
                console.error("[Wan 2.6] 生成失败:", Ot, gt), T(ln => ln.id === r ? {
                  ...ln,
                  status: "failed",
                  progress: 0,
                  errorMsg: Ot
                } : ln), m(a.id, {
                  isGenerating: !1,
                  errorMsg: Ot,
                  settings: {
                    ...a.settings,
                    isGenerating: !1,
                    progress: 0,
                    error: Ot
                  }
                });
                return;
              } else if (kt === "UNKNOWN") {
                const Ot = "任务已过期或不存在";
                console.error("[Wan 2.6] 任务查询失败:", Ot), T(ln => ln.id === r ? {
                  ...ln,
                  status: "failed",
                  progress: 0,
                  errorMsg: Ot
                } : ln), m(a.id, {
                  isGenerating: !1,
                  errorMsg: Ot,
                  settings: {
                    ...a.settings,
                    isGenerating: !1,
                    progress: 0,
                    error: Ot
                  }
                });
                return;
              } else {
                const Ot = Qt || (kt === "RUNNING" ? 50 : 10);
                y(r, Ot), b(r, a.id, Ot), Re(rt + 1, Ot);
                return;
              }
            }
            if (_b(s) && d) {
              const qe = gt.data && typeof gt.data == "object" ? gt.data : gt,
                kt = String(qe.state ?? gt.state ?? "").toLowerCase();
              if (kt === "success") {
                const hn = qe.creations ?? gt.creations,
                  Qt = hn == null ? void 0 : hn[0],
                  Ot = Qt == null ? void 0 : Qt.video;
                let ln = (Qt == null ? void 0 : Qt.url) ?? (Qt == null ? void 0 : Qt.download_url) ?? (Qt == null ? void 0 : Qt.video_url) ?? (Ot == null ? void 0 : Ot.url) ?? (Ot == null ? void 0 : Ot.download_url) ?? (Qt == null ? void 0 : Qt.output_url) ?? (Qt == null ? void 0 : Qt.play_url);
                if (!ln && Qt && typeof Qt == "object") {
                  for (const rn of Object.values(Qt)) if (typeof rn == "string" && rn.startsWith("http") && (rn.includes(".mp4") || /\/video[\/?]/.test(rn) || rn.includes("prod-ss-vidu") || rn.includes("s3") && rn.includes("amazonaws"))) {
                    ln = rn;
                    break;
                  }
                }
                if (ln) {
                  const rn = DYe(r, ln),
                    {
                      tryResolveGenResultForGlobalOss: Yn,
                      buildHistoryItemPatchFromGlobalOss: Ct
                    } = await Ie(async () => {
                      const {
                        tryResolveGenResultForGlobalOss: Kn,
                        buildHistoryItemPatchFromGlobalOss: en
                      } = await Promise.resolve().then(() => ii);
                      return {
                        tryResolveGenResultForGlobalOss: Kn,
                        buildHistoryItemPatchFromGlobalOss: en
                      };
                    }, void 0, import.meta.url),
                    Cn = await Yn([ln], r, !0);
                  Cn || (Xu(ln, rn, `vidu_${r}.mp4`).finally(() => {
                    gUt(r, E, rn);
                  }).catch(Kn => {
                    console.error("[Vidu] 下载视频失败:", Kn);
                  }), oy({
                    url: ln,
                    type: "video"
                  }, r));
                  const {
                      pickGenVideoPlaybackUrl: un
                    } = await Ie(async () => {
                      const {
                        pickGenVideoPlaybackUrl: Kn
                      } = await Promise.resolve().then(() => ii);
                      return {
                        pickGenVideoPlaybackUrl: Kn
                      };
                    }, void 0, import.meta.url),
                    Jn = un(Cn, ln);
                  T(Kn => {
                    if (Kn.id !== r) return Kn;
                    const en = Kn.startTime ? Date.now() - Kn.startTime : void 0;
                    return {
                      ...Kn,
                      status: "completed",
                      progress: 100,
                      _assetId: Cn ? void 0 : rn,
                      durationMs: en,
                      ...(Cn ? Ct(Cn, {
                        type: "video"
                      }) : {
                        url: Jn
                      })
                    };
                  }), m(a.id, {
                    isGenerating: !1,
                    content: Jn,
                    settings: {
                      ...a.settings,
                      isGenerating: !1,
                      progress: 100,
                      error: null,
                      ...((Cn == null ? void 0 : Cn.ossSettings) || {}),
                      ...((Ce = Cn == null ? void 0 : Cn.generatedImages) != null && Ce.length ? {
                        generatedImages: Cn.generatedImages
                      } : {})
                    },
                    _contentAssetId: Cn ? void 0 : a._contentAssetId
                  });
                  try {
                    const Kn = ((He = Cn == null ? void 0 : Cn.displayUrls) == null ? void 0 : He[0]) || Jn;
                    await V(Kn, "video", {
                      sourceNodeName: O,
                      previewSourceModel: s,
                      previewOssRemoteUrl: (Ve = Cn == null ? void 0 : Cn.remoteUrls) == null ? void 0 : Ve[0],
                      originalResultUrl: ln
                    });
                  } catch (Kn) {
                    console.warn("[Vidu] 预览回传失败（生成结果已保存）:", Kn);
                  }
                  return;
                }
                const Pn = "未返回视频 URL";
                T(rn => rn.id === r ? {
                  ...rn,
                  status: "failed",
                  progress: 0,
                  errorMsg: Pn
                } : rn), m(a.id, {
                  isGenerating: !1,
                  errorMsg: Pn
                });
                return;
              }
              if (kt === "failed") {
                const hn = String(qe.err_code ?? gt.err_code ?? "任务失败");
                T(Qt => Qt.id === r ? {
                  ...Qt,
                  status: "failed",
                  progress: 0,
                  errorMsg: hn
                } : Qt), m(a.id, {
                  isGenerating: !1,
                  errorMsg: hn,
                  settings: {
                    isGenerating: !1,
                    progress: 0,
                    error: hn
                  }
                });
                return;
              }
              const St = Math.min(10 + rt * 2, 90);
              y(r, St), b(r, a.id, St), Re(rt + 1, St);
              return;
            }
            if (Tb(s) && !HM(s) && d) {
              const qe = ZBt(gt);
              if (qe.terminal === "success" && qe.videoUrl) {
                const St = qe.videoUrl,
                  {
                    tryResolveGenResultForGlobalOss: hn,
                    buildHistoryItemPatchFromGlobalOss: Qt
                  } = await Ie(async () => {
                    const {
                      tryResolveGenResultForGlobalOss: rn,
                      buildHistoryItemPatchFromGlobalOss: Yn
                    } = await Promise.resolve().then(() => ii);
                    return {
                      tryResolveGenResultForGlobalOss: rn,
                      buildHistoryItemPatchFromGlobalOss: Yn
                    };
                  }, void 0, import.meta.url),
                  Ot = await hn([St], r, !0);
                if (!Ot) {
                  await oV({
                    resultUrl: St,
                    taskId: r,
                    node: a,
                    currentModel: s,
                    pollStartedAt: ue,
                    sourceNodeName: O,
                    updateNode: m,
                    setHistory: E,
                    updateAllConnectedPreviews: V
                  });
                  return;
                }
                const {
                    pickGenVideoPlaybackUrl: ln
                  } = await Ie(async () => {
                    const {
                      pickGenVideoPlaybackUrl: rn
                    } = await Promise.resolve().then(() => ii);
                    return {
                      pickGenVideoPlaybackUrl: rn
                    };
                  }, void 0, import.meta.url),
                  Pn = ln(Ot, St, null);
                T(rn => {
                  if (rn.id !== r) return rn;
                  const Yn = rn.startTime ? Date.now() - rn.startTime : void 0;
                  return {
                    ...rn,
                    status: "completed",
                    progress: 100,
                    durationMs: Yn,
                    ...Qt(Ot, {
                      type: "video"
                    })
                  };
                }), m(a.id, {
                  isGenerating: !1,
                  content: Pn,
                  settings: {
                    ...a.settings,
                    isGenerating: !1,
                    progress: 100,
                    error: null,
                    _pendingRemoteResultUrl: void 0,
                    ...(Ot.ossSettings || {}),
                    ...((it = Ot.generatedImages) != null && it.length ? {
                      generatedImages: Ot.generatedImages
                    } : {})
                  },
                  _contentAssetId: void 0
                }), await V(Pn, "video", {
                  sourceNodeName: O,
                  previewSourceModel: s
                });
                return;
              }
              if (qe.terminal === "failed") {
                const St = String(qe.errorMsg || "生成失败");
                T(hn => hn.id === r ? {
                  ...hn,
                  status: "failed",
                  progress: 0,
                  errorMsg: St
                } : hn), m(a.id, {
                  isGenerating: !1,
                  errorMsg: St,
                  settings: {
                    isGenerating: !1,
                    progress: 0,
                    error: St
                  }
                });
                return;
              }
              const kt = Math.min(10 + rt * 2, 90);
              y(r, kt), b(r, a.id, kt), Re(rt + 1, kt);
              return;
            }
            if (bx(s) && d) {
              const qe = gt.base_resp && typeof gt.base_resp == "object" ? gt.base_resp : null;
              if (qe && qe.status_code !== 0) {
                const hn = String(qe.status_msg || "Hailuo query failed");
                console.error("[Hailuo] 查询失败:", hn, gt), T(Qt => Qt.id === r ? {
                  ...Qt,
                  status: "failed",
                  progress: 0,
                  errorMsg: hn
                } : Qt), m(a.id, {
                  isGenerating: !1,
                  errorMsg: hn
                });
                return;
              }
              const kt = String(gt.status || "").toLowerCase(),
                St = eP(gt, rt);
              if (kt === "success") {
                const hn = gt.file_id;
                if (!hn) {
                  const rn = "未返回file_id";
                  console.error("[Hailuo] 错误:", rn, gt), T(Yn => Yn.id === r ? {
                    ...Yn,
                    status: "failed",
                    progress: 0,
                    errorMsg: rn
                  } : Yn), m(a.id, {
                    isGenerating: !1,
                    errorMsg: rn
                  });
                  return;
                }
                const Qt = `${i}/minimax/v1/files/retrieve?file_id=${encodeURIComponent(String(hn))}`,
                  Ot = await fetch(Qt, {
                    headers: {
                      Authorization: `Bearer ${o}`
                    }
                  });
                if (!Ot.ok) {
                  const rn = `获取下载链接失败: HTTP ${Ot.status}`;
                  console.error("[Hailuo] 错误:", rn), T(Yn => Yn.id === r ? {
                    ...Yn,
                    status: "failed",
                    progress: 0,
                    errorMsg: rn
                  } : Yn), m(a.id, {
                    isGenerating: !1,
                    errorMsg: rn
                  });
                  return;
                }
                const ln = await Ot.json();
                if (((It = ln.base_resp) == null ? void 0 : It.status_code) !== 0) {
                  const rn = ((Ft = ln.base_resp) == null ? void 0 : Ft.status_msg) || "获取下载链接失败";
                  console.error("[Hailuo] 错误:", rn, ln), T(Yn => Yn.id === r ? {
                    ...Yn,
                    status: "failed",
                    progress: 0,
                    errorMsg: rn
                  } : Yn), m(a.id, {
                    isGenerating: !1,
                    errorMsg: rn
                  });
                  return;
                }
                const Pn = (We = ln.file) == null ? void 0 : We.download_url;
                if (Pn) {
                  await oV({
                    resultUrl: Pn,
                    taskId: r,
                    node: a,
                    currentModel: s,
                    pollStartedAt: ue,
                    sourceNodeName: O,
                    updateNode: m,
                    setHistory: E,
                    updateAllConnectedPreviews: V
                  });
                  return;
                } else {
                  const rn = "未返回download_url";
                  console.error("[Hailuo] 错误:", rn, ln), T(Yn => Yn.id === r ? {
                    ...Yn,
                    status: "failed",
                    progress: 0,
                    errorMsg: rn
                  } : Yn), m(a.id, {
                    isGenerating: !1,
                    errorMsg: rn
                  });
                  return;
                }
              } else if (kt === "failed") {
                const hn = String(gt.error ?? (gt.base_resp && typeof gt.base_resp == "object" ? gt.base_resp.status_msg : null) ?? "生成失败");
                console.error("[Hailuo] 生成失败:", hn, gt), T(Qt => Qt.id === r ? {
                  ...Qt,
                  status: "failed",
                  progress: 0,
                  errorMsg: hn
                } : Qt), m(a.id, {
                  isGenerating: !1,
                  errorMsg: hn,
                  settings: {
                    ...a.settings,
                    isGenerating: !1,
                    progress: 0,
                    error: hn
                  }
                });
                return;
              } else {
                (Math.abs(St - nt) >= 10 || St === 0 || St === 100) && (y(r, St), b(r, a.id, St)), Re(rt + 1, St);
                return;
              }
            }
            if (m5(s)) {
              const qe = gt.code;
              if (qe !== void 0 && qe !== 0) {
                const Qt = String(gt.msg ?? (qe === -22 ? "任务不存在或已过期" : "Grsai 轮询失败"));
                T(Ot => Ot.id === r ? {
                  ...Ot,
                  status: "failed",
                  progress: 0,
                  errorMsg: Qt
                } : Ot), m(a.id, {
                  isGenerating: !1,
                  errorMsg: Qt
                });
                return;
              }
              const kt = gt.data,
                St = (kt == null ? void 0 : kt.status) || "";
              if (St === "succeeded") {
                const Qt = kt == null ? void 0 : kt.results,
                  Ot = (Ze = Qt == null ? void 0 : Qt[0]) == null ? void 0 : Ze.url;
                if (Ot) {
                  const {
                      resolveGenImageCompletion: ln,
                      buildHistoryItemPatchFromGlobalOss: Pn
                    } = await Ie(async () => {
                      const {
                        resolveGenImageCompletion: Ct,
                        buildHistoryItemPatchFromGlobalOss: Cn
                      } = await Promise.resolve().then(() => ii);
                      return {
                        resolveGenImageCompletion: Ct,
                        buildHistoryItemPatchFromGlobalOss: Cn
                      };
                    }, void 0, import.meta.url),
                    rn = await ln([Ot], r, {
                      nodeId: a.id,
                      model: s
                    }),
                    Yn = _ !== void 0 && k !== void 0;
                  if (Yn && R(rn.primaryDisplayUrl, rn.usedOss ? rn.remoteUrls[0] : void 0), T(Ct => Ct.id === r ? {
                    ...Ct,
                    status: "completed",
                    progress: 100,
                    durationMs: Ct.startTime ? Date.now() - Ct.startTime : void 0,
                    ...(rn.usedOss && rn.ossPack ? Pn(rn.ossPack, {
                      type: "image"
                    }) : {
                      url: rn.primaryDisplayUrl
                    })
                  } : Ct), m(a.id, {
                    isGenerating: !1,
                    content: Yn ? "" : rn.primaryDisplayUrl,
                    _contentAssetId: rn.usedOss ? void 0 : rn.contentAssetId,
                    settings: {
                      ...a.settings,
                      isGenerating: !1,
                      progress: 100,
                      error: null,
                      ...(Yn ? {} : {
                        generatedImages: rn.generatedImages
                      }),
                      ...(rn.usedOss && rn.ossPack && !Yn ? rn.ossPack.ossSettings : {})
                    }
                  }), Yn) {
                    if (a.type !== "storyboard-chart-node") {
                      const Ct = _.filter(Cn => Cn && Cn.length > 0);
                      await V(rn.primaryDisplayUrl, "image", {
                        previewMjImages: Ct.length > 0 ? Ct : void 0,
                        selectedPreviewImage: rn.primaryDisplayUrl,
                        sourceNodeName: O,
                        previewSourceModel: s,
                        ...(rn.usedOss ? {
                          previewOssRemoteUrl: rn.remoteUrls[0]
                        } : {
                          contentAssetId: rn.contentAssetId
                        })
                      });
                    }
                  } else await V(rn.primaryDisplayUrl, "image", {
                    sourceNodeName: O,
                    previewSourceModel: s,
                    ...(rn.usedOss ? {
                      previewOssRemoteUrl: rn.remoteUrls[0]
                    } : {
                      contentAssetId: rn.contentAssetId
                    })
                  });
                  rn.usedOss || Xu(Ot, r, `grsai_${r}.png`).catch(() => {});
                  return;
                }
              } else if (St === "failed") {
                const Qt = (kt == null ? void 0 : kt.error) || (kt == null ? void 0 : kt.failure_reason) || "Grsai 生成失败";
                T(Ot => Ot.id === r ? {
                  ...Ot,
                  status: "failed",
                  progress: 0,
                  errorMsg: Qt
                } : Ot), m(a.id, {
                  isGenerating: !1,
                  errorMsg: Qt
                });
                return;
              }
              const hn = (kt == null ? void 0 : kt.progress) ?? Math.min(10 + rt * 2, 90);
              y(r, hn), b(r, a.id, hn), Re(rt + 1, hn);
              return;
            }
            const Ut = IX(gt),
              _t = eP(gt, rt),
              At = FU(Ut),
              Yt = At ? !1 : ZM(Ut) || CIe(gt, Ut);
            if (At && !Yt) {
              const qe = t5(gt, d, l, {
                quiet: !0
              });
              if (qe.length === 0) {
                if (Ne += 1, Ne >= 150) {
                  Jx(ke);
                  const St = "任务已成功但未返回图片 URL，请在后台查看或点击历史刷新";
                  T(hn => hn.id === r ? {
                    ...hn,
                    status: "failed",
                    progress: 0,
                    errorMsg: St
                  } : hn), m(a.id, {
                    isGenerating: !1,
                    errorMsg: St
                  }), Xz(r);
                  return;
                }
                const kt = Math.min(_t, 95);
                kt !== nt && y(r, kt), Re(rt + 1, kt, ze);
                return;
              }
              if (Ne = 0, qe.length > 0) {
                const kt = qe[0];
                if (!d && P && !sAt) {
                  if (C) {
                    const en = (p == null ? void 0 : p.current) ?? j ?? h;
                    dzt(a, en, C, m);
                  }
                  await Kye({
                    resultUrls: qe,
                    taskId: r,
                    node: a,
                    currentModel: s,
                    pollStartedAt: ue,
                    sourceNodeName: O,
                    mjOriginalUrlHint: qe.length === 1 ? kt : void 0,
                    batchAccumulator: _,
                    batchIndex: k,
                    batchRemoteAccumulator: w,
                    updateNode: m,
                    setHistory: E,
                    updateAllConnectedPreviews: V,
                    writeBatchPreviewSlot: R,
                    nodesRef: p
                  });
                  return;
                }
                const {
                    isGlobalOssUploadEnabled: St
                  } = await Ie(async () => {
                    const {
                      isGlobalOssUploadEnabled: en
                    } = await Promise.resolve().then(() => Ah);
                    return {
                      isGlobalOssUploadEnabled: en
                    };
                  }, void 0, import.meta.url),
                  {
                    isCanvasLocalCacheMode: hn
                  } = await Ie(async () => {
                    const {
                      isCanvasLocalCacheMode: en
                    } = await Promise.resolve().then(() => So);
                    return {
                      isCanvasLocalCacheMode: en
                    };
                  }, void 0, import.meta.url),
                  Qt = hn(),
                  Ot = St();
                if (Rqi({
                  isVideoGeneration: d,
                  needsMjGridSplit: P,
                  globalOssMode: Ot,
                  localCacheMode: Qt,
                  hasInlineBase64: qe.some(en => voe(en))
                })) {
                  await Kye({
                    resultUrls: qe,
                    taskId: r,
                    node: a,
                    currentModel: s,
                    pollStartedAt: ue,
                    sourceNodeName: O,
                    batchAccumulator: _,
                    batchIndex: k,
                    batchRemoteAccumulator: w,
                    updateNode: m,
                    setHistory: E,
                    updateAllConnectedPreviews: V,
                    writeBatchPreviewSlot: R,
                    nodesRef: p
                  });
                  return;
                }
                const ln = d ? void 0 : qe.map((en, Vn) => ({
                  id: `${r}_remote_${Vn}`,
                  thumbUrl: en,
                  fullUrl: en,
                  createdAt: Date.now(),
                  assetId: Vn === 0 ? r : `${r}_${Vn}`
                }));
                Xz(r), await UK();
                const Pn = Date.now() - ue;
                if (Qt && d && kt) {
                  await oV({
                    resultUrl: kt,
                    taskId: r,
                    node: a,
                    currentModel: s,
                    pollStartedAt: ue,
                    sourceNodeName: O,
                    updateNode: m,
                    setHistory: E,
                    updateAllConnectedPreviews: V
                  });
                  return;
                }
                const rn = P && qe.length === 1,
                  Yn = qe.some(en => voe(en)),
                  Ct = Ot && rn,
                  Cn = rn && (Qt || Ot || Yn),
                  Jn = Ot && d || !d && ((Qt || Yn || Ct) && (!rn || Ct) || Cn),
                  Kn = Ot || Qt || Yn || Cn;
                if (T(en => ({
                  ...en,
                  status: Jn ? "generating" : "completed",
                  progress: Jn ? 99 : 100,
                  url: Kn ? en.url : en.url || kt,
                  durationMs: en.durationMs ?? Pn
                })), (Qt || Yn) && !d && !rn && qe.forEach((en, Vn) => {
                  Xu(en, Vn === 0 ? r : `${r}_${Vn}`).catch(Tt => {
                    console.error("[Generation] 本地落盘失败:", Tt);
                  });
                }), m(a.id, F7(a, {
                  isGenerating: Jn,
                  ...(!d && (!rn || Ct) ? Qt || Yn ? {
                    _contentAssetId: r
                  } : Ct ? {
                    _contentAssetId: void 0
                  } : {
                    content: kt,
                    _contentAssetId: void 0
                  } : {}),
                  settings: {
                    ...a.settings,
                    isGenerating: Jn,
                    progress: Jn ? 99 : 100,
                    error: null,
                    ...(Qt && !d ? {
                      _pendingRemoteResultUrl: mUt(kt) || void 0
                    } : Yn && !d ? {
                      _pendingRemoteResultUrl: void 0
                    } : {}),
                    ...(Qt ? {
                      _assetId: r,
                      _localCacheAssetId: r
                    } : Yn ? {
                      _assetId: r
                    } : {}),
                    ...(ln && !Qt && !Yn && !Ot ? {
                      generatedImages: ln,
                      ...(qe.length > 1 ? {
                        mjImages: qe
                      } : {}),
                      selectedMjImageIndex: 0
                    } : (Qt || Yn) && !d ? {
                      ...E$e(r, qe).settingsPatch,
                      ...(Yn && !Qt ? {
                        _localCacheAssetId: void 0
                      } : {})
                    } : {})
                  }
                })), !(sAt && P && qe.length === 1)) {
                  await UK();
                  const {
                      tryResolveGenResultForGlobalOss: en
                    } = await Ie(async () => {
                      const {
                        tryResolveGenResultForGlobalOss: Tt
                      } = await Promise.resolve().then(() => ii);
                      return {
                        tryResolveGenResultForGlobalOss: Tt
                      };
                    }, void 0, import.meta.url),
                    Vn = await en(qe, r, d);
                  if (Vn) {
                    const Tt = Vn.displayUrls,
                      Ue = Tt[0] || kt,
                      et = Vn.generatedImages,
                      ft = _ !== void 0 && k !== void 0;
                    ft && R(Ue, Vn.remoteUrls[0]);
                    const ht = ft ? _.filter(Bt => Bt && Bt.length > 0) : [],
                      {
                        buildHistoryItemPatchFromGlobalOss: wt
                      } = await Ie(async () => {
                        const {
                          buildHistoryItemPatchFromGlobalOss: Bt
                        } = await Promise.resolve().then(() => ii);
                        return {
                          buildHistoryItemPatchFromGlobalOss: Bt
                        };
                      }, void 0, import.meta.url);
                    T(Bt => Bt.id === r ? {
                      ...Bt,
                      status: "completed",
                      progress: 100,
                      selectedMjImageIndex: 0,
                      durationMs: Bt.startTime ? Date.now() - Bt.startTime : void 0,
                      ...wt(Vn, {
                        type: Bt.type,
                        mjImages: qe.length > 1 ? Vn.remoteUrls : void 0,
                        mjThumbnails: qe.length > 1 ? Tt : void 0
                      })
                    } : Bt);
                    const jt = d && Vn.remoteUrls[0] || Ue;
                    m(a.id, {
                      isGenerating: !1,
                      content: jt,
                      settings: {
                        ...a.settings,
                        isGenerating: !1,
                        progress: 100,
                        error: null,
                        generatedImages: et,
                        ...Vn.ossSettings,
                        ...(qe.length > 1 ? {
                          mjImages: Tt.map((Bt, wn) => Vn.remoteUrls[wn] || ""),
                          mjThumbnails: Tt
                        } : {})
                      },
                      _contentAssetId: void 0
                    });
                    const bt = d ? "video" : "image";
                    if (await UK(), ft) a.type !== "storyboard-chart-node" && (await V(Ue, bt, {
                      previewMjImages: ht.length > 0 ? ht : void 0,
                      selectedPreviewImage: Ue,
                      sourceNodeName: O,
                      previewSourceModel: s
                    }));else {
                      const Bt = qe.length > 1 ? {
                        previewMjImages: Tt,
                        selectedPreviewImage: Ue
                      } : void 0;
                      await V(Ue, bt, {
                        ...Bt,
                        sourceNodeName: O,
                        previewSourceModel: s
                      });
                    }
                  } else {
                    const {
                        isCanvasLocalCacheMode: Tt
                      } = await Ie(async () => {
                        const {
                          isCanvasLocalCacheMode: qn
                        } = await Promise.resolve().then(() => So);
                        return {
                          isCanvasLocalCacheMode: qn
                        };
                      }, void 0, import.meta.url),
                      Ue = Tt();
                    d ? Xu(kt, r).catch(qn => {
                      console.error("[Generation] 下载失败:", qn);
                    }) : Ue ? qe.forEach((qn, Dn) => {
                      Xu(qn, Dn === 0 ? r : `${r}_${Dn}`).catch(Ar => {
                        console.error("[Generation] 本地落盘失败:", Ar);
                      });
                    }) : Qmn(kt, r), qe.length > 1 && !Ue && qe.slice(1).forEach((qn, Dn) => {
                      d ? Xu(qn, `${r}_${Dn + 1}`).catch(Ar => {
                        console.error(`[Generation] 下载第${Dn + 2}张失败:`, Ar);
                      }) : Qmn(qn, `${r}_${Dn + 1}`, void 0, 900 + Dn * 500);
                    });
                    let et = qe,
                      ft = kt;
                    const ht = !d && qe.length > 0,
                      wt = qe.map((qn, Dn) => Dn === 0 ? r : `${r}_${Dn}`),
                      jt = qe.map((qn, Dn) => `${r}_${l ? "mj" : "preview"}_${Dn}`);
                    let bt = !1,
                      Bt = null;
                    if (Ue && ht && (bt = !0, Bt = E$e(r, qe), ft = "", et = qe.map(() => "")), ht && !bt && !Ue) try {
                      et = await Promise.all(qe.map((qn, Dn) => cz(qn, jt[Dn], wt[Dn]))), ft = et[0] || kt;
                    } catch (qn) {
                      et = qe.map(() => ""), console.warn("[Image Generation] 缩略图流程失败，节点宫格保持空槽等待:", qn);
                    }
                    et.forEach((qn, Dn) => {
                      qn && wt[Dn] && Il(qn, wt[Dn]);
                    }), T(qn => {
                      const Dn = qn.startTime ? Date.now() - qn.startTime : void 0,
                        Ar = gt,
                        _r = d && String(s).startsWith("sora") && !wy(s) ? Ar.task_id ?? (Ar.data && typeof Ar.data == "object" ? Ar.data.task_id : null) : null;
                      return {
                        ...qn,
                        status: bt ? "generating" : "completed",
                        progress: bt ? 99 : 100,
                        url: ft,
                        mjImages: qe.length > 1 ? et : void 0,
                        selectedMjImageIndex: 0,
                        durationMs: Dn,
                        _assetId: r,
                        _mjAssetIds: qe.length > 1 ? qe.map((Pa, fa) => fa === 0 ? r : `${r}_${fa}`) : void 0,
                        ...(_r ? {
                          characterSourceTaskId: String(_r),
                          remoteTaskId: String(_r)
                        } : {})
                      };
                    });
                    const wn = _ !== void 0 && k !== void 0,
                      at = wn && czt(a),
                      Pt = wt,
                      dt = jt;
                    bt ? Ie(async () => {
                      const {
                        scheduleHistoryThumbnailSaveFromLocalAsset: qn
                      } = await Promise.resolve().then(() => EUt);
                      return {
                        scheduleHistoryThumbnailSaveFromLocalAsset: qn
                      };
                    }, void 0, import.meta.url).then(({
                      scheduleHistoryThumbnailSaveFromLocalAsset: qn
                    }) => {
                      qn(r, E, {
                        onPreviewReady: Dn => {
                          var fa;
                          const Ar = String(Dn || "").trim();
                          if (!Ar) return;
                          const _r = ((fa = p == null ? void 0 : p.current) == null ? void 0 : fa.find(Ca => Ca.id === a.id)) ?? a,
                            Pa = {
                              ...(_r.settings || a.settings || {})
                            };
                          m(a.id, F7(_r, {
                            isGenerating: !1,
                            content: at ? "" : Ar,
                            thumbnailUrl: Ar,
                            _contentAssetId: at ? void 0 : r,
                            settings: {
                              ...Pa,
                              isGenerating: !1,
                              progress: 100,
                              error: null,
                              _canvasDisplayPreviewUrl: Ar,
                              _pendingRemoteResultUrl: void 0,
                              _contentAssetId: r,
                              _assetId: r,
                              _localCacheAssetId: r
                            }
                          })), el(m, a.id, !1);
                        }
                      });
                    }) : M$e(r, kt, E), wn && R(et[0] || qe[0] || kt, qe[0] || kt);
                    const xt = wn ? _.filter(qn => qn && qn.length > 0) : [],
                      yn = wn && xt.length > 0 ? xt.map((qn, Dn) => ({
                        id: `${r}_batch_${Dn}`,
                        thumbUrl: qn,
                        fullUrl: qe[Dn] || qn,
                        createdAt: Date.now(),
                        assetId: Pt[Dn] || `${r}_batch_${Dn}`
                      })) : Bt ? Bt.generatedImages : Ue && ft ? T$e(r, qe, Pt, et) : et.map((qn, Dn) => ({
                        id: `${r}_${Dn}`,
                        thumbUrl: qn,
                        fullUrl: qe[Dn] || qn,
                        createdAt: Date.now(),
                        assetId: Pt[Dn]
                      })),
                      gn = wn && xt.length > 0 ? xt[xt.length - 1] : bt ? "" : ft,
                      mt = Pt[0],
                      Xt = qe[0] || kt;
                    let Gn;
                    if (!bt) try {
                      if (Gn = await X4({
                        contentAssetId: mt,
                        remoteResultUrl: Xt
                      }), !Gn && d && Xt) try {
                        const {
                            getVideoMetadata: qn
                          } = await Ie(async () => {
                            const {
                              getVideoMetadata: Ar
                            } = await Promise.resolve().then(() => pg);
                            return {
                              getVideoMetadata: Ar
                            };
                          }, void 0, import.meta.url),
                          Dn = await qn(Xt);
                        if (Dn.w > 0 && Dn.h > 0) {
                          const {
                            formatImagePixelSizeLabel: Ar
                          } = await Ie(async () => {
                            const {
                              formatImagePixelSizeLabel: _r
                            } = await Promise.resolve().then(() => ii);
                            return {
                              formatImagePixelSizeLabel: _r
                            };
                          }, void 0, import.meta.url);
                          Gn = Ar(Dn.w, Dn.h);
                        }
                      } catch {}
                    } catch {}
                    const rr = {
                      isGenerating: bt,
                      content: at ? "" : gn,
                      _contentAssetId: at ? void 0 : mt,
                      settings: {
                        ...a.settings,
                        isGenerating: bt,
                        progress: bt ? 99 : 100,
                        error: null,
                        ...(at ? {} : Bt ? {
                          ...Bt.settingsPatch,
                          ...(Gn ? {
                            previewActualSize: Gn,
                            previewSize: Gn
                          } : {})
                        } : {
                          generatedImages: yn,
                          _contentAssetId: mt,
                          ...(Gn ? {
                            previewActualSize: Gn,
                            previewSize: Gn
                          } : {}),
                          ...(qe.length > 1 ? {
                            _mjAssetIds: Pt
                          } : {}),
                          ...(qe.length > 0 ? {
                            _mjPreviewAssetIds: dt
                          } : {}),
                          ...(wn && xt.length > 1 ? {
                            mjImages: xt
                          } : !wn && qe.length > 1 ? {
                            mjImages: et
                          } : {})
                        })
                      }
                    };
                    if (m(a.id, bt ? F7(a, rr, Gn) : xX(a, rr, Gn ? Hs(Gn) : null)), !bt) if (wn) {
                      if (a.type !== "storyboard-chart-node" && !at) {
                        await new Promise(Dn => setTimeout(Dn, 100));
                        const qn = A ? A.slice(0, xt.length) : Pt;
                        await V(et[0] || qe[0] || kt, "image", {
                          previewMjImages: xt.length > 0 ? xt : void 0,
                          selectedPreviewImage: et[0] || qe[0] || kt,
                          previewMjAssetIds: qn,
                          previewMjRemoteUrls: w != null && w.some((Dn, Ar) => Ar < xt.length && !!Dn) ? w.slice(0, xt.length) : void 0,
                          sourceNodeName: O,
                          previewSourceModel: s
                        });
                      }
                    } else {
                      const qn = U5(s),
                        Dn = qe.length > 1 ? qn && d ? {
                          previewMjVideos: et,
                          selectedPreviewVideo: ft
                        } : {
                          previewMjImages: et,
                          selectedPreviewImage: ft,
                          previewMjAssetIds: Pt
                        } : void 0;
                      await V(ft, d ? "video" : "image", {
                        ...Dn,
                        sourceNodeName: O,
                        previewSourceModel: s,
                        contentAssetId: mt,
                        originalResultUrl: Xt,
                        previewActualSize: Gn
                      });
                    }
                    bt && (async () => {
                      try {
                        await Promise.all(qe.map((fa, Ca) => Xu(fa, Ca === 0 ? r : `${r}_${Ca}`).catch($n => {
                          console.error("[Generation] 本地落盘失败:", $n);
                        })));
                        const qn = [];
                        for (let fa = 0; fa < qe.length; fa++) fa > 0 && (await Id()), qn.push(await cz(qe[fa], dt[fa], Pt[fa], {
                          downloadAlreadyScheduled: !0
                        }));
                        const Dn = qn[0] || "";
                        if (!Dn) {
                          console.warn("[Image Generation] 本地 preview 未就绪，交由历史缩略图回调收尾");
                          return;
                        }
                        qn.forEach((fa, Ca) => {
                          fa && Pt[Ca] && Il(fa, Pt[Ca]);
                        });
                        const Ar = T$e(r, qe, Pt, qn),
                          _r = Dn;
                        if ((() => {
                          Da.unstable_batchedUpdates(() => {
                            T(fa => fa.id === r ? {
                              ...fa,
                              status: "completed",
                              progress: 100,
                              url: Dn,
                              thumbnailUrl: Dn || void 0,
                              mjImages: qe.length > 1 ? qn : void 0
                            } : fa), m(a.id, xX(a, {
                              isGenerating: !1,
                              content: at ? "" : _r,
                              thumbnailUrl: Dn || void 0,
                              _contentAssetId: at ? void 0 : mt,
                              settings: {
                                ...a.settings,
                                isGenerating: !1,
                                progress: 100,
                                error: null,
                                ...(at ? {} : {
                                  generatedImages: Ar,
                                  _contentAssetId: mt,
                                  ...(Dn ? {
                                    _canvasDisplayPreviewUrl: Dn,
                                    _pendingRemoteResultUrl: void 0
                                  } : {}),
                                  ...(qe.length > 1 ? {
                                    _mjAssetIds: Pt
                                  } : {}),
                                  ...(qe.length > 0 ? {
                                    _mjPreviewAssetIds: dt
                                  } : {}),
                                  ...(!wn && qe.length > 1 ? {
                                    mjImages: qn
                                  } : {})
                                })
                              }
                            }, null));
                          });
                        })(), !wn) {
                          const fa = qe.length > 1 ? {
                            previewMjImages: qn,
                            selectedPreviewImage: Dn,
                            previewMjAssetIds: Pt
                          } : void 0;
                          await V(Dn, "image", {
                            ...fa,
                            sourceNodeName: O,
                            previewSourceModel: s,
                            contentAssetId: mt,
                            originalResultUrl: Xt
                          });
                        }
                        (async () => {
                          try {
                            const fa = await X4({
                              contentAssetId: mt,
                              remoteResultUrl: Xt
                            });
                            if (!fa) return;
                            const Ca = NSt(a.id, a, fa),
                              $n = () => {
                                m(a.id, Ca), Ude([a.id]);
                              };
                            Yi() ? O$($n) : g.startTransition($n);
                          } catch {}
                        })();
                      } catch (qn) {
                        console.warn("[Image Generation] 本地模式后台展示解析失败，节点保持空槽等待:", qn);
                      }
                    })();
                  }
                }
              }
              Jx(ke);
              return;
            } else if (BU(gt) || OU(Ut) || Ut === "FAILED" || Ut === "ERROR" || Ut === "FAILURE" || Ut === "CANCELLED") {
              Jx(ke), Xz(r);
              const qe = LF(gt, Ut);
              console.error("[Generation] ❌ 任务失败:", {
                status: Ut,
                errorMsg: qe,
                model: s,
                isVideoGeneration: d,
                isMidjourney: l,
                pollData: jte(gt)
              }), Ex(s) && console.error("[Veo] ❌ Veo 生成失败，详细信息:", {
                model: s,
                status: Ut,
                errorMsg: qe,
                data: gt.data,
                message: gt.message,
                error: gt.error,
                failReason: gt.failReason || gt.fail_reason
              }), T(St => St.id === r ? {
                ...St,
                status: "failed",
                progress: 0,
                errorMsg: qe
              } : St), m(a.id, {
                isGenerating: !1,
                errorMsg: qe,
                settings: {
                  ...a.settings,
                  isGenerating: !1,
                  progress: 0,
                  error: qe
                }
              });
              const kt = (Ge = a.settings) == null ? void 0 : Ge._autoCreatedPreviewId;
              if (kt) try {
                rz(m, kt, "previewGenerateFailed");
              } catch {}
              return;
            } else me = 0, Ae = Ult({
              lane: Ae,
              recovered: !0
            }), _t !== nt && (y(r, _t), b(r, a.id, _t)), Re(rt + 1, _t);
          } catch (Oe) {
            if (aMn(Oe)) {
              Ae = Ult({
                lane: Ae,
                queryTimedOut: !0
              });
              const Ut = nt < 0 ? 5 : Math.min(Math.max(nt + 1, 5), 35);
              y(r, Ut), b(r, a.id, Ut), Re(rt + 1, Ut, 0);
              return;
            }
            me += 1, Ae = Ult({
              lane: Ae,
              consecutiveErrors: me
            }), Bbe(String(r)) && e8n(String(r));
            const Ht = Oe instanceof Error ? `${Oe.name}: ${Oe.message}` : String(Oe ?? "未知轮询异常");
            if (me >= 8) {
              Jx(ke), AU(String(r));
              const Ut = `轮询连续失败(${me} 次)：${Ht}`;
              console.warn("[Generation] 轮询连续失败，已停止该任务重试:", Ut, {
                taskId: r,
                attempt: rt
              }), T(_t => _t.id === r ? {
                ..._t,
                status: "failed",
                progress: 0,
                errorMsg: Ut
              } : _t), m(a.id, {
                isGenerating: !1,
                errorMsg: Ut,
                settings: {
                  ...a.settings,
                  isGenerating: !1,
                  progress: 0,
                  error: Ut
                }
              });
              return;
            }
            console.warn("[Generation] 轮询请求异常，将重试:", Ht, {
              taskId: r,
              attempt: rt,
              consecutivePollErrors: me
            });
            const pt = nt < 0 ? 5 : Math.min(Math.max(nt + 2, 5), 35);
            y(r, pt), b(r, a.id, pt);
            const lt = lz(ge, Math.max(0, rt)),
              gt = Math.min(lt * (1 + Math.min(me, 4)), 3e4);
            Re(rt + 1, pt, 0, gt);
          }
        }
      };
    $e();
  } else if (qM(s)) {
    console.log("[Grok Image] 处理同步响应:", jte(n));
    let Ee = [];
    if (n.data && Array.isArray(n.data) && n.data.length > 0 && (Ee = n.data.map(he => {
      if (he.url) return he.url;
      if (he.b64_json) return he.b64_json.startsWith("data:") ? he.b64_json : `data:image/jpeg;base64,${he.b64_json}`;
    }).filter(he => !!he && fu(he))), Ee.length === 0) {
      const xe = n.choices;
      if (xe && xe.length > 0 && xe[0].message) {
        const he = xe[0].message,
          ue = he.content;
        if (typeof ue == "string") {
          const ge = ue.trim();
          if (ge.startsWith("http://") || ge.startsWith("https://") || ge.startsWith("data:")) Ee = [ge];else if (ge) {
            const _e = ge.match(/!\[[^\]]*\]\s*\(\s*(https?:\/\/[^)\s]+|data:[^)\s]+)\s*\)/);
            _e && (Ee = [_e[1]]);
          }
        } else if (Array.isArray(ue)) for (const ge of ue) ge && typeof ge == "object" && (ge.type === "image_url" && ((le = ge.image_url) != null && le.url) ? Ee.push(ge.image_url.url) : ge.type === "image" && ge.image && Ee.push(ge.image));
        if (Ee.length === 0 && he.reasoning_content) {
          const ge = he.reasoning_content,
            _e = [],
            ke = /!\[[^\]]*\]\s*\(\s*(https?:\/\/[^)\s]+|data:[^)\s]+)\s*\)/g;
          let ve = ke.exec(ge);
          for (; ve;) _e.push(ve[1]), ve = ke.exec(ge);
          if (_e.length === 0) {
            const Te = /\]\s*\(\s*(https?:\/\/[^)\s]+|data:[^)\s]+)\s*\)/g;
            for (ve = Te.exec(ge); ve;) _e.push(ve[1]), ve = Te.exec(ge);
          }
          if (_e.length === 0) {
            const Te = /(https?:\/\/[^\s\]\)"']+|data:[^\s\]\)"']+)/g;
            for (ve = Te.exec(ge); ve;) _e.push(ve[1]), ve = Te.exec(ge);
          }
          _e.length > 0 && (Ee = _e, console.log("[Grok Image] 从 reasoning_content 提取到图片 URL 数:", Ee.length));
        }
      }
    }
    if (Ee.length === 0) {
      let xe = function (ge) {
        if (ge) {
          if (typeof ge == "string") {
            const _e = ge.trim();
            if ((_e.startsWith("http://") || _e.startsWith("https://") || _e.startsWith("data:image")) && _e.length > 50) {
              ue.has(_e) || (ue.add(_e), he.push(_e));
              return;
            }
            const ke = ge,
              ve = ke.match(/!\[[^\]]*\]\s*\(\s*(https?:\/\/[^)\s]+|data:[^)\s]+)\s*\)/g);
            ve && ve.forEach(me => {
              const Ae = me.replace(/!\[[^\]]*\]\s*\(\s*|\s*\)$/g, "");
              Ae && !ue.has(Ae) && (ue.add(Ae), he.push(Ae));
            });
            const Te = ke.match(/\]\s*\(\s*(https?:\/\/[^)\s]+)\s*\)/g);
            Te && Te.forEach(me => {
              const Ae = me.replace(/\]\s*\(\s*|\s*\)$/g, "");
              Ae && !ue.has(Ae) && (ue.add(Ae), he.push(Ae));
            });
            const Ne = ke.match(/(https?:\/\/[^\s\]\)"'\n]+)/g);
            Ne && Ne.forEach(me => {
              (/\.(png|jpg|jpeg|webp|gif)(\?|$)/i.test(me) || /file_download|\/image\//.test(me)) && !ue.has(me) && (ue.add(me), he.push(me));
            });
            return;
          }
          if (Array.isArray(ge)) {
            ge.forEach(xe);
            return;
          }
          typeof ge == "object" && Object.values(ge).forEach(xe);
        }
      };
      const he = [],
        ue = new Set();
      xe(n), he.length > 0 && (Ee = he.filter(ge => fu(ge)), console.log("[Grok Image] 从响应深度扫描提取到图片 URL 数:", Ee.length));
    }
    if (Ee.length > 0) {
      const {
          resolveGenImageCompletion: xe,
          buildHistoryItemPatchFromGlobalOss: he
        } = await Ie(async () => {
          const {
            resolveGenImageCompletion: ve,
            buildHistoryItemPatchFromGlobalOss: Te
          } = await Promise.resolve().then(() => ii);
          return {
            resolveGenImageCompletion: ve,
            buildHistoryItemPatchFromGlobalOss: Te
          };
        }, void 0, import.meta.url),
        ue = await xe(Ee, r, {
          nodeId: a.id,
          model: s
        }),
        ge = ue.primaryDisplayUrl,
        _e = ue.displayUrls;
      _ !== void 0 && k !== void 0 && R(ge, ue.usedOss ? ue.remoteUrls[0] : void 0), ue.usedOss || Ee.forEach((ve, Te) => {
        Xu(ve, `${r}_${Te}`, `grok-image_${r}_${Te}.png`).catch(() => {});
      }), T(ve => ve.id === r ? {
        ...ve,
        status: "completed",
        progress: 100,
        selectedMjImageIndex: 0,
        durationMs: ve.startTime ? Date.now() - ve.startTime : void 0,
        ...(ue.usedOss && ue.ossPack ? he(ue.ossPack, {
          type: "image",
          mjImages: _e.length > 1 ? _e : void 0
        }) : {
          url: ge,
          mjImages: _e.length > 1 ? _e : void 0
        })
      } : ve), m(a.id, {
        isGenerating: !1,
        content: ge,
        _contentAssetId: ue.usedOss ? void 0 : ue.contentAssetId,
        settings: {
          ...a.settings,
          isGenerating: !1,
          progress: 100,
          error: null,
          generatedImages: ue.generatedImages,
          ...(ue.usedOss && ue.ossPack ? ue.ossPack.ossSettings : {}),
          ...(_e.length > 1 ? {
            mjImages: _e
          } : {})
        }
      });
      const ke = ue.usedOss ? {
        previewOssRemoteUrl: ue.remoteUrls[0]
      } : {
        contentAssetId: ue.contentAssetId
      };
      if (_ !== void 0 && k !== void 0) {
        if (a.type !== "storyboard-chart-node") {
          const ve = _.filter(Te => Te && Te.length > 0);
          await new Promise(Te => setTimeout(Te, 100)), await V(ge, "image", {
            previewMjImages: ve.length > 0 ? ve : void 0,
            previewMjRemoteUrls: w != null && w.some(Te => !!Te) ? w : void 0,
            selectedPreviewImage: ge,
            sourceNodeName: O,
            previewSourceModel: s,
            ...ke
          });
        }
      } else await V(ge, "image", _e.length > 1 ? {
        previewMjImages: _e,
        selectedPreviewImage: ge,
        sourceNodeName: O,
        previewSourceModel: s,
        ...ke
      } : {
        sourceNodeName: O,
        previewSourceModel: s,
        ...ke
      });
      console.log("[Grok Image] ✅ 图片处理完成");
    } else {
      const xe = String(((J = n.error) == null ? void 0 : J.message) ?? n.message ?? "未返回图片");
      T(ue => ue.id === r ? {
        ...ue,
        status: "failed",
        progress: 0,
        errorMsg: xe
      } : ue), m(a.id, {
        isGenerating: !1,
        errorMsg: xe,
        settings: {
          isGenerating: !1,
          progress: 0,
          error: xe
        }
      });
      const he = n.choices;
      console.warn("[Grok Image] 未从响应中解析到图片 URL。完整 message 键:", (pe = he == null ? void 0 : he[0]) != null && pe.message ? Object.keys(he[0].message) : "无 choices");
    }
  } else if (Zqe(s)) {
    console.log("[Z-Image Official] 处理同步响应:", jte(n));
    let Ee = [];
    const xe = n.output;
    if (xe != null && xe.choices && Array.isArray(xe.choices) && xe.choices.length > 0) {
      const he = xe.choices[0],
        ue = (ce = he == null ? void 0 : he.message) == null ? void 0 : ce.content;
      ue && Array.isArray(ue) && (Ee = ue.filter(_e => _e && typeof _e == "object" && "image" in _e).map(_e => _e.image).filter(_e => typeof _e == "string"));
    }
    if (console.log("[Z-Image Official] 提取的图片 URLs:", Ee), Ee.length > 0) {
      const {
          resolveGenImageCompletion: he,
          buildHistoryItemPatchFromGlobalOss: ue
        } = await Ie(async () => {
          const {
            resolveGenImageCompletion: Te,
            buildHistoryItemPatchFromGlobalOss: Ne
          } = await Promise.resolve().then(() => ii);
          return {
            resolveGenImageCompletion: Te,
            buildHistoryItemPatchFromGlobalOss: Ne
          };
        }, void 0, import.meta.url),
        ge = await he(Ee, r, {
          nodeId: a.id,
          model: s
        }),
        _e = ge.primaryDisplayUrl,
        ke = ge.displayUrls,
        ve = ge.usedOss ? {
          previewOssRemoteUrl: ge.remoteUrls[0]
        } : {
          contentAssetId: ge.contentAssetId
        };
      if (_ !== void 0 && k !== void 0 && (R(_e, ge.usedOss ? ge.remoteUrls[0] : void 0), console.log(`[Z-Image Official] 批量任务 ${k + 1}，写入累加器:`, _e)), ge.usedOss || Ee.forEach((Te, Ne) => {
        Xu(Te, `${r}_${Ne}`, `z-image-official_${r}_${Ne}.png`).catch(me => {
          console.error(`[Z-Image Official] 下载图片 ${Ne} 失败:`, me);
        });
      }), T(Te => Te.id === r ? {
        ...Te,
        status: "completed",
        progress: 100,
        selectedMjImageIndex: 0,
        durationMs: Te.startTime ? Date.now() - Te.startTime : void 0,
        ...(ge.usedOss && ge.ossPack ? ue(ge.ossPack, {
          type: "image",
          mjImages: ke.length > 1 ? ke : void 0
        }) : {
          url: _e,
          mjImages: ke.length > 1 ? ke : void 0
        })
      } : Te), m(a.id, {
        isGenerating: !1,
        content: _e,
        _contentAssetId: ge.usedOss ? void 0 : ge.contentAssetId,
        settings: {
          ...a.settings,
          isGenerating: !1,
          progress: 100,
          error: null,
          generatedImages: ge.generatedImages,
          ...(ge.usedOss && ge.ossPack ? ge.ossPack.ossSettings : {}),
          ...(ke.length > 1 ? {
            mjImages: ke
          } : {})
        }
      }), _ !== void 0 && k !== void 0) {
        if (a.type !== "storyboard-chart-node") {
          const Te = _.filter(Ne => Ne && Ne.length > 0);
          await new Promise(Ne => setTimeout(Ne, 100)), await V(_e, "image", {
            previewMjImages: Te.length > 0 ? Te : void 0,
            previewMjRemoteUrls: w != null && w.some(Ne => !!Ne) ? w : void 0,
            selectedPreviewImage: _e,
            sourceNodeName: O,
            previewSourceModel: s,
            ...ve
          });
        }
      } else await V(_e, "image", ke.length > 1 ? {
        previewMjImages: ke,
        selectedPreviewImage: _e,
        sourceNodeName: O,
        previewSourceModel: s,
        ...ve
      } : {
        sourceNodeName: O,
        previewSourceModel: s,
        ...ve
      });
      console.log(`[Z-Image Official] ✅ 图片处理完成，共 ${Ee.length} 张`);
    } else {
      const he = String(n.message ?? n.error ?? n.code ?? "未返回图片 URL");
      console.error("[Z-Image Official] 生成失败:", he, n), T(ue => ue.id === r ? {
        ...ue,
        status: "failed",
        progress: 0,
        errorMsg: he
      } : ue), m(a.id, {
        isGenerating: !1,
        errorMsg: he,
        settings: {
          ...a.settings,
          isGenerating: !1,
          progress: 0,
          error: he
        }
      });
    }
  } else if (yX(s)) {
    console.log("[Wan 2.6 Image Official] 处理响应:", jte(n));
    let Ee = [],
      xe = [];
    const he = ((we = a.settings) == null ? void 0 : we.enableInterleave) ?? !1,
      ue = n.output;
    if (ue != null && ue.choices && Array.isArray(ue.choices) && ue.choices.length > 0) {
      const ge = ue.choices[0],
        _e = (X = ge == null ? void 0 : ge.message) == null ? void 0 : X.content;
      if (_e && Array.isArray(_e)) for (const ke of _e) ke.type === "image" && ke.image ? Ee.push(ke.image) : ke.type === "text" && ke.text && xe.push(ke.text);
    }
    if (console.log("[Wan 2.6 Image Official] 提取的图片 URLs:", Ee), console.log("[Wan 2.6 Image Official] 提取的文本内容:", xe), Ee.length > 0) {
      const {
          resolveGenImageCompletion: ge,
          buildHistoryItemPatchFromGlobalOss: _e
        } = await Ie(async () => {
          const {
            resolveGenImageCompletion: Ae,
            buildHistoryItemPatchFromGlobalOss: Fe
          } = await Promise.resolve().then(() => ii);
          return {
            resolveGenImageCompletion: Ae,
            buildHistoryItemPatchFromGlobalOss: Fe
          };
        }, void 0, import.meta.url),
        ke = await ge(Ee, r, {
          nodeId: a.id,
          model: s
        }),
        ve = ke.primaryDisplayUrl,
        Te = ke.displayUrls,
        Ne = he && xe.length > 0 ? {
          generatedText: xe.join(`
`)
        } : {},
        me = ke.usedOss ? {
          previewOssRemoteUrl: ke.remoteUrls[0]
        } : {
          contentAssetId: ke.contentAssetId
        };
      if (_ !== void 0 && k !== void 0 && R(ve, ke.usedOss ? ke.remoteUrls[0] : void 0), ke.usedOss || Ee.forEach((Ae, Fe) => {
        Xu(Ae, `${r}_${Fe}`, `wan26-image_${r}_${Fe}.png`).catch(Me => {
          console.error(`[Wan 2.6 Image Official] 下载图片 ${Fe} 失败:`, Me);
        });
      }), T(Ae => Ae.id === r ? {
        ...Ae,
        status: "completed",
        progress: 100,
        selectedMjImageIndex: 0,
        durationMs: Ae.startTime ? Date.now() - Ae.startTime : void 0,
        ...Ne,
        ...(ke.usedOss && ke.ossPack ? _e(ke.ossPack, {
          type: "image",
          mjImages: Te.length > 1 ? Te : void 0
        }) : {
          url: ve,
          mjImages: Te.length > 1 ? Te : void 0
        })
      } : Ae), m(a.id, {
        isGenerating: !1,
        content: ve,
        _contentAssetId: ke.usedOss ? void 0 : ke.contentAssetId,
        settings: {
          ...a.settings,
          isGenerating: !1,
          progress: 100,
          error: null,
          generatedImages: ke.generatedImages,
          ...(ke.usedOss && ke.ossPack ? ke.ossPack.ossSettings : {}),
          ...(Te.length > 1 ? {
            mjImages: Te
          } : {}),
          ...Ne
        }
      }), _ !== void 0 && k !== void 0) {
        const Ae = _.filter(Fe => Fe && Fe.length > 0);
        a.type !== "storyboard-chart-node" && (await new Promise(Fe => setTimeout(Fe, 100)), await V(ve, "image", {
          previewMjImages: Ae.length > 0 ? Ae : void 0,
          previewMjRemoteUrls: w != null && w.some(Fe => !!Fe) ? w : void 0,
          selectedPreviewImage: ve,
          sourceNodeName: O,
          previewSourceModel: s,
          ...me
        }));
      } else await V(ve, "image", Te.length > 1 ? {
        previewMjImages: Te,
        selectedPreviewImage: ve,
        sourceNodeName: O,
        previewSourceModel: s,
        ...me
      } : {
        sourceNodeName: O,
        previewSourceModel: s,
        ...me
      });
      console.log(`[Wan 2.6 Image Official] ✅ 图片处理完成，共 ${Ee.length} 张${he ? `，文本 ${xe.length} 段` : ""}`);
    } else {
      const ge = String(n.message ?? n.error ?? n.code ?? "未返回图片 URL");
      console.error("[Wan 2.6 Image Official] 生成失败:", ge, n), T(_e => _e.id === r ? {
        ..._e,
        status: "failed",
        progress: 0,
        errorMsg: ge
      } : _e), m(a.id, {
        isGenerating: !1,
        errorMsg: ge,
        settings: {
          ...a.settings,
          isGenerating: !1,
          progress: 0,
          error: ge
        }
      });
    }
  } else if (KM(s)) {
    const Ee = n.candidates;
    console.log("[Gemini Image Official] 处理响应摘要", {
      candidateCount: Array.isArray(Ee) ? Ee.length : 0,
      responseKeys: n && typeof n == "object" ? Object.keys(n) : []
    });
    let xe = [];
    if (Ee && Ee.length > 0) {
      const he = Ee[0].content,
        ue = he == null ? void 0 : he.parts;
      if (ue && Array.isArray(ue) && ue.length > 0) {
        const ge = [];
        for (const _e of ue) {
          const ke = _e.inline_data ?? _e.inlineData;
          if (ke && ke.data) {
            const ve = ke.mime_type ?? ke.mimeType ?? "image/png";
            ge.push({
              data: ke.data,
              mime: ve
            });
          }
        }
        ge.length > 0 && (xe = ge.map(_e => `data:${_e.mime};base64,${_e.data}`));
      }
      if (xe.length === 0) {
        const ge = (Z = he == null ? void 0 : he.parts) == null ? void 0 : Z[0],
          _e = ge ? Object.keys(ge) : [];
        console.warn("[Gemini Image Official] 响应中未找到图片 part。candidates[0].content.parts 长度:", (ue == null ? void 0 : ue.length) ?? 0, "首个 part 的 keys:", _e, "content keys:", he && typeof he == "object" ? Object.keys(he) : []);
      }
    }
    if (xe.length > 0) {
      const {
        resolveGenImageCompletion: he,
        buildHistoryItemPatchFromGlobalOss: ue,
        isGlobalOssUploadEnabled: ge
      } = await Ie(async () => {
        const {
          resolveGenImageCompletion: ke,
          buildHistoryItemPatchFromGlobalOss: ve,
          isGlobalOssUploadEnabled: Te
        } = await Promise.resolve().then(() => ii);
        return {
          resolveGenImageCompletion: ke,
          buildHistoryItemPatchFromGlobalOss: ve,
          isGlobalOssUploadEnabled: Te
        };
      }, void 0, import.meta.url);
      let _e = !1;
      if (ge()) {
        const ke = await he(xe, r, {
          nodeId: a.id,
          model: s
        });
        if (ke.usedOss && ke.ossPack) {
          _e = !0;
          const ve = xe.length > 1 ? xe.length - 1 : 0,
            Te = ke.displayUrls,
            Ne = Te[ve] || ke.primaryDisplayUrl,
            me = _ !== void 0 && k !== void 0;
          me && R(Ne, ke.remoteUrls[ve]);
          const Ae = me ? _.filter(Re => Re && Re.length > 0) : [];
          T(Re => Re.id === r ? {
            ...Re,
            status: "completed",
            progress: 100,
            selectedMjImageIndex: 0,
            durationMs: Re.startTime ? Date.now() - Re.startTime : void 0,
            ...ue(ke.ossPack, {
              type: "image",
              mjImages: Te.length > 1 ? Te : void 0
            })
          } : Re);
          const Fe = me && Ae.length > 0 ? Ae[Ae.length - 1] : Ne;
          m(a.id, {
            isGenerating: !1,
            content: Fe,
            _contentAssetId: void 0,
            settings: {
              ...a.settings,
              isGenerating: !1,
              progress: 100,
              error: null,
              generatedImages: ke.generatedImages,
              ...ke.ossPack.ossSettings,
              ...(me && Ae.length > 1 ? {
                mjImages: Ae
              } : Te.length > 1 ? {
                mjImages: Te
              } : {})
            }
          });
          const Me = {
            previewOssRemoteUrl: ke.remoteUrls[ve],
            previewMjRemoteUrls: w != null && w.some(Re => !!Re) ? w : void 0
          };
          me ? a.type !== "storyboard-chart-node" && (await V(Ne, "image", {
            previewMjImages: Ae.length > 0 ? Ae : void 0,
            selectedPreviewImage: Ne,
            sourceNodeName: O,
            previewSourceModel: s,
            ...Me
          })) : await V(Ne, "image", Te.length > 1 ? {
            previewMjImages: Te,
            selectedPreviewImage: Ne,
            sourceNodeName: O,
            previewSourceModel: s,
            ...Me
          } : {
            sourceNodeName: O,
            previewSourceModel: s,
            ...Me
          }), console.log("[Gemini Image Official] ✅ 全局 OSS 完成，共", xe.length, "张");
        }
      }
      if (!_e) {
        const ke = xe.length > 1 ? xe[xe.length - 1] : xe[0],
          ve = xe.length > 1 ? xe.length - 1 : 0,
          Te = `${r}_${ve}`,
          Ne = xe.map((nt, ze) => `${r}_${ze}`),
          me = xe.map((nt, ze) => `${r}_mj_${ze}`);
        await Promise.all(xe.map(async (nt, ze) => {
          const Le = `${r}_${ze}`;
          await Xu(nt, Le, `gemini-official_${r}_${ze}.png`);
          try {
            const {
              persistGenResultPreviewThumbnail: Ke
            } = await Ie(async () => {
              const {
                persistGenResultPreviewThumbnail: Xe
              } = await Promise.resolve().then(() => ii);
              return {
                persistGenResultPreviewThumbnail: Xe
              };
            }, void 0, import.meta.url);
            await Ke(nt, me[ze], Le);
          } catch (Ke) {
            console.warn("[Gemini Image Official] 缩略图生成跳过:", Le, Ke);
          }
        }));
        let Ae = xe.map(() => "");
        try {
          Ae = await Promise.all(xe.map((nt, ze) => cz(nt, me[ze], Ne[ze])));
        } catch {}
        const Fe = Ae[ve] || ke,
          Me = _ !== void 0 && k !== void 0;
        Me && R(Fe, ke);
        const Re = Me ? _.filter(nt => nt && nt.length > 0) : [];
        Il(Fe, Te), xe.length > 1 && Ae.forEach((nt, ze) => {
          nt && Ne[ze] && Il(nt, Ne[ze]);
        }), T(nt => {
          if (nt.id === r) {
            const ze = nt.startTime ? Date.now() - nt.startTime : void 0;
            return {
              ...nt,
              status: "completed",
              progress: 100,
              url: Fe,
              mjImages: xe.length > 1 ? Ae : void 0,
              selectedMjImageIndex: 0,
              durationMs: ze,
              _assetId: Te,
              ...(xe.length > 1 ? {
                _mjAssetIds: Ne
              } : {})
            };
          }
          return nt;
        });
        const $e = Me && Re.length > 0 ? Re.map((nt, ze) => ({
            id: `${r}_batch_${ze}`,
            thumbUrl: nt,
            fullUrl: xe[ze] || nt,
            createdAt: Date.now(),
            assetId: Ne[ze] || `${r}_batch_${ze}`
          })) : xe.map((nt, ze) => ({
            id: `${r}_${ze}`,
            thumbUrl: Ae[ze] || "",
            fullUrl: nt,
            createdAt: Date.now(),
            assetId: `${r}_${ze}`
          })),
          rt = Me && Re.length > 0 ? Re[Re.length - 1] : Fe;
        if (m(a.id, {
          isGenerating: !1,
          content: rt,
          settings: {
            ...a.settings,
            isGenerating: !1,
            progress: 100,
            error: null,
            generatedImages: $e,
            ...(Me && Re.length > 1 ? {
              mjImages: Re
            } : !Me && xe.length > 1 ? {
              mjImages: Ae
            } : {})
          }
        }), Me) a.type !== "storyboard-chart-node" && (await V(Fe, "image", {
          previewMjImages: Re.length > 0 ? Re : void 0,
          selectedPreviewImage: Fe,
          sourceNodeName: O,
          previewSourceModel: s
        }));else {
          let nt;
          try {
            const ze = await fetch(ke).then(Ke => Ke.blob()),
              Le = await Rv(ze);
            Le.width > 0 && Le.height > 0 && (nt = `${Le.width}×${Le.height}`);
          } catch {}
          await V(Fe, "image", xe.length > 1 ? {
            previewMjImages: Ae,
            selectedPreviewImage: Fe,
            sourceNodeName: O,
            previewSourceModel: s,
            previewActualSize: nt,
            contentAssetId: Te,
            previewMjAssetIds: Ne
          } : {
            sourceNodeName: O,
            previewSourceModel: s,
            previewActualSize: nt,
            contentAssetId: Te
          });
        }
        console.log("[Gemini Image Official] ✅ 图片处理完成，共", xe.length, "张");
      }
    } else {
      const he = ((re = n.error) == null ? void 0 : re.message) ?? n.message ?? n.error,
        ue = ((ie = (ye = (fe = Ee == null ? void 0 : Ee[0]) == null ? void 0 : fe.content) == null ? void 0 : ye.parts) == null ? void 0 : ie.map(ke => ke.text ?? ke.text).filter(Boolean).join(" ")) || "",
        ge = ue ? ue.trim() : "",
        _e = String(he ?? (ge ? `未返回图片。模型回复：${ge.length > 120 ? ge.slice(0, 120) + "…" : ge}` : "未返回图片（响应中无图片数据，可能被安全过滤或模型未生成）"));
      console.error("[Gemini Image Official] 生成失败:", _e, {
        candidateCount: Array.isArray(Ee) ? Ee.length : 0,
        responseKeys: n && typeof n == "object" ? Object.keys(n) : []
      }), T(ke => ke.id === r ? {
        ...ke,
        status: "failed",
        progress: 0,
        errorMsg: _e
      } : ke), m(a.id, {
        isGenerating: !1,
        errorMsg: _e,
        settings: {
          isGenerating: !1,
          progress: 0,
          error: _e
        }
      });
    }
  } else if ((IS(s) || V1(s) || Nv(s) || Q1(s) || wy(s) || VM(s) || Gp(s) || Fm(s) || xb(s) || yf(s) || Sy(s) || kp(s) || Ap(s) || Yc(s) || D2(s) || HM(s)) && d) {
    const Ee = QK(n) || (n.data && Array.isArray(n.data) ? String(((ae = n.data[0]) == null ? void 0 : ae.url) || "") : ""),
      xe = kxe(n);
    if (Ee) {
      const he = dhe(s) ? Dft(n) : "",
        ue = he ? {
          ...a,
          settings: {
            ...(a.settings || {}),
            [sRn]: he
          }
        } : a;
      await oV({
        resultUrl: Ee,
        taskId: r,
        node: ue,
        currentModel: s,
        sourceNodeName: O,
        updateNode: m,
        setHistory: E,
        updateAllConnectedPreviews: V
      }), xe && wy(s) && E(ge => ge.map(_e => _e.id === r ? {
        ..._e,
        characterSourceTaskId: xe,
        remoteTaskId: xe
      } : _e));
    } else {
      const he = Dm(n);
      T(ue => ue.id === r ? {
        ...ue,
        status: "failed",
        progress: 0,
        errorMsg: he
      } : ue), m(a.id, {
        isGenerating: !1,
        errorMsg: he
      });
    }
  } else if (n.data && Array.isArray(n.data) && n.data.length > 0) {
    console.log("[Sync Mode] Processing synchronous response, isMidjourney:", l, "isVideoGeneration:", d, "currentModel:", s);
    const xe = n.data.map(ue => {
        const ge = String(ue.b64_json || "").trim();
        return ge ? (console.log("[Sync Mode] ✓ 检测到 base64 图片数据，转换为 data URL（长度）", ge.length), BCt(ge)) : ue.url ? ue.url : null;
      }).filter(Boolean).filter(ue => fu(ue)),
      he = xe[0];
    if (!he) {
      const ue = String(((be = n.error) == null ? void 0 : be.message) ?? n.message ?? "未返回可展示的图片");
      T(ge => ge.id === r ? {
        ...ge,
        status: "failed",
        progress: 0,
        errorMsg: ue
      } : ge), m(a.id, {
        isGenerating: !1,
        errorMsg: ue,
        settings: {
          isGenerating: !1,
          progress: 0,
          error: ue
        }
      });
      return;
    }
    if (console.log("[Sync Mode] Result URLs:", xe.length, "张", ooo(xe[0])), d) {
      const {
          tryResolveGenResultForGlobalOss: ue
        } = await Ie(async () => {
          const {
            tryResolveGenResultForGlobalOss: nt
          } = await Promise.resolve().then(() => ii);
          return {
            tryResolveGenResultForGlobalOss: nt
          };
        }, void 0, import.meta.url),
        ge = await ue(xe, r, d);
      if (ge) {
        const nt = ge.displayUrls,
          ze = ge.generatedImages,
          {
            buildHistoryItemPatchFromGlobalOss: Le
          } = await Ie(async () => {
            const {
              buildHistoryItemPatchFromGlobalOss: Ye
            } = await Promise.resolve().then(() => ii);
            return {
              buildHistoryItemPatchFromGlobalOss: Ye
            };
          }, void 0, import.meta.url);
        T(Ye => Ye.id === r ? {
          ...Ye,
          status: "completed",
          progress: 100,
          selectedMjImageIndex: 0,
          durationMs: Ye.startTime ? Date.now() - Ye.startTime : void 0,
          ...Le(ge, {
            type: Ye.type,
            mjImages: xe.length > 1 ? nt : void 0
          })
        } : Ye);
        const Ke = d ? ge.remoteUrls[0] || he : nt[0] || he;
        m(a.id, {
          isGenerating: !1,
          content: Ke,
          settings: {
            ...a.settings,
            isGenerating: !1,
            progress: 100,
            error: null,
            generatedImages: ze,
            ...ge.ossSettings,
            ...(xe.length > 1 ? {
              mjImages: nt,
              _mjPreviewAssetIds: xe.map((Ye, Ce) => `${r}_mj_${Ce}`)
            } : {})
          },
          _contentAssetId: void 0
        });
        const Xe = ge.remoteUrls[0] || "";
        let De;
        if (Xe) {
          const {
              probeHttpImageDimensions: Ye
            } = await Ie(async () => {
              const {
                probeHttpImageDimensions: He
              } = await Promise.resolve().then(() => ii);
              return {
                probeHttpImageDimensions: He
              };
            }, void 0, import.meta.url),
            Ce = await Ye(Xe);
          Ce && (De = `${Ce.width}×${Ce.height}`);
        }
        await V(nt[0] || he, d ? "video" : "image", xe.length > 1 ? {
          previewMjImages: nt,
          sourceNodeName: O,
          previewSourceModel: s,
          previewOssRemoteUrl: Xe,
          previewActualSize: De
        } : {
          sourceNodeName: O,
          previewSourceModel: s,
          previewOssRemoteUrl: Xe,
          previewActualSize: De
        });
        return;
      }
      Xu(he, r).catch(nt => {
        console.error("[Sync] 下载失败:", nt);
      }), xe.length > 1 && xe.slice(1).forEach((nt, ze) => {
        Xu(nt, `${r}_${ze + 1}`).catch(Le => {
          console.error(`[Sync] 下载第${ze + 2}张失败:`, Le);
        });
      });
      let _e = xe;
      const ke = xe.map((nt, ze) => ze === 0 ? r : `${r}_${ze}`),
        ve = xe.map((nt, ze) => `${r}_mj_${ze}`),
        {
          localCacheManager: Te
        } = await Ie(async () => {
          const {
            localCacheManager: nt
          } = await Promise.resolve().then(() => Ha);
          return {
            localCacheManager: nt
          };
        }, void 0, import.meta.url);
      if (!d && xe.length > 0) try {
        _e = await Promise.all(xe.map((nt, ze) => cz(nt, ve[ze], ke[ze])));
      } catch (nt) {
        console.warn("[Sync Image Generation] 缩略图流程失败，跳过原图直链:", nt);
      }
      const me = mX(s) && !d;
      if (me) try {
        await ni.init(), await Promise.all(xe.map(async (Le, Ke) => {
          const Xe = ke[Ke];
          let De = DSt(Le);
          if (!De && (Le.startsWith("http://") || Le.startsWith("https://"))) try {
            const Ce = await fetch(Le);
            Ce.ok && (De = await Ce.blob());
          } catch {}
          De && (await ni.saveBlobAsset(Xe, De, Le));
          const Ye = ve[Ke];
          if (De) {
            const {
              persistHistoryListThumbnailLocal: Ce
            } = await Ie(async () => {
              const {
                persistHistoryListThumbnailLocal: He
              } = await Promise.resolve().then(() => ii);
              return {
                persistHistoryListThumbnailLocal: He
              };
            }, void 0, import.meta.url);
            await Ce(Ye, De, {
              forceReplace: !0
            }), Xe !== Ye && (await Ce(Xe, De, {
              forceReplace: !0
            }));
          }
        }));
        const {
            readLocalPreviewThumbnailAsUrl: nt
          } = await Ie(async () => {
            const {
              readLocalPreviewThumbnailAsUrl: Le
            } = await Promise.resolve().then(() => Ui);
            return {
              readLocalPreviewThumbnailAsUrl: Le
            };
          }, void 0, import.meta.url),
          ze = await Promise.all(ve.map(async (Le, Ke) => {
            const Xe = ke[Ke];
            return (await nt(Le)) || (Xe ? await nt(Xe) : null);
          }));
        _e = xe.map((Le, Ke) => ze[Ke] || _e[Ke] || "");
      } catch (nt) {
        console.warn("[Seedream] 缩略图/asset 优化失败，节点宫格保持缩略图/空槽:", nt);
      }
      let Ae;
      if (me) {
        const nt = n.data[0];
        if (Ae = yoo(nt == null ? void 0 : nt.size), !Ae && xe[0]) try {
          const ze = xe[0];
          let Le = null;
          if (ze.startsWith("data:")) Le = DSt(ze);else if (ze.startsWith("http://") || ze.startsWith("https://")) {
            const Ke = await fetch(ze);
            Ke.ok && (Le = await Ke.blob());
          }
          if (Le) {
            const Ke = await Rv(Le);
            Ke.width > 0 && Ke.height > 0 && (Ae = `${Ke.width}×${Ke.height}`);
          }
        } catch {}
      }
      T(nt => {
        if (nt.id === r) {
          const ze = nt.startTime ? Date.now() - nt.startTime : void 0;
          return {
            ...nt,
            status: "completed",
            progress: 100,
            url: _e[0] || he,
            mjImages: xe.length > 1 ? _e : void 0,
            selectedMjImageIndex: 0,
            durationMs: ze,
            ...(xe.length > 1 ? {
              _mjAssetIds: ke
            } : {}),
            ...(me && xe.length === 1 ? {
              _assetId: r
            } : {})
          };
        }
        return nt;
      }), M$e(r, he, E);
      const Fe = xe.map((nt, ze) => ({
          id: `${r}_${ze}`,
          thumbUrl: _e[ze] || "",
          fullUrl: nt,
          createdAt: Date.now(),
          assetId: ke[ze]
        })),
        Me = ke[0],
        Re = xe[0] || he;
      let $e = Ae;
      const rt = $e ? null : X4({
        contentAssetId: Me,
        remoteResultUrl: Re
      }).catch(() => {});
      if (m(a.id, F7(a, {
        isGenerating: !1,
        content: _e[0] || he,
        _contentAssetId: Me,
        settings: {
          ...a.settings,
          isGenerating: !1,
          progress: 100,
          error: null,
          generatedImages: Fe,
          _contentAssetId: Me,
          ...($e ? {
            previewActualSize: $e,
            previewSize: $e
          } : {}),
          ...(xe.length > 1 ? {
            _mjAssetIds: ke
          } : {}),
          ...(xe.length > 0 ? {
            _mjPreviewAssetIds: ve
          } : {}),
          ...(xe.length > 1 ? {
            mjImages: _e,
            previewMjImages: _e
          } : {})
        }
      }, $e)), rt && ($e = await rt, $e)) {
        const nt = NSt(a.id, a, $e);
        m(a.id, nt), Ude([a.id]);
      }
      console.log("[Sync] Updating preview, previewIds:", G), await V(_e[0] || he, "image", xe.length > 1 ? {
        previewMjImages: _e,
        sourceNodeName: O,
        previewSourceModel: s,
        previewActualSize: $e,
        contentAssetId: Me,
        originalResultUrl: Re,
        previewMjAssetIds: ke
      } : {
        sourceNodeName: O,
        previewSourceModel: s,
        previewActualSize: $e,
        contentAssetId: Me,
        originalResultUrl: Re
      });
    } else {
      xe.some(ge => voe(ge)) && console.log("[Sync Mode] 内联 base64 回传，走第三方预备落盘链（不直写 data URL 到 content）"), await Kye({
        resultUrls: xe,
        taskId: r,
        node: a,
        currentModel: s,
        pollStartedAt: Date.now(),
        sourceNodeName: O,
        mjOriginalUrlHint: P && xe.length === 1 ? he : void 0,
        batchAccumulator: _,
        batchIndex: k,
        batchRemoteAccumulator: w,
        updateNode: m,
        setHistory: E,
        updateAllConnectedPreviews: V,
        writeBatchPreviewSlot: R,
        nodesRef: p
      });
      try {
        for (const ge of n.data) ge && typeof ge == "object" && ge.b64_json && (ge.b64_json = "");
      } catch {}
    }
  } else throw console.error("[Response] Invalid response format:", n), new Error("未返回图片数据");
}

function woo({
  params: e,
  onReady: t,
  document: n
}) {
  const r = g.useCallback(() => n.current().token, [n]),
    a = g.useSyncExternalStore(n.subscribe, r, r),
    i = g.useMemo(() => () => n.current().ready && n.current().token === a, [n, a]),
    o = roo({
      ...e,
      isCanvasWriteCurrent: i,
      documentSession: n
    });
  return g.useEffect(() => {
    i() && t({
      generate: o.generate,
      runExpandImage: o.runExpandImage,
      runEditImage: o.runEditImage,
      generateChartBatch: o.generateChartBatch
    });
  }, [o, t, i]), null;
}

const xoo = Object.freeze(Object.defineProperty({
  __proto__: null,
  GenerationRunner: woo
}, Symbol.toStringTag, {
  value: "Module"
}));

function _oo(e) {
  return String(e || "").trim().replace(/^Bearer\s+/i, "");
}

function koo(e) {
  const t = e.parameter_rules ?? e.parameterRules;
  return Array.isArray(t) ? t : [];
}

function Aoo(e, t) {
  const n = s9(e, t) || hv,
    r = b3(n) || "https://art.huya.info/openapi/v1";
  return {
    endpoint: n,
    openApiRoot: r
  };
}

async function Soo(e) {
  const t = String(e.provider || Vxe).trim() || Vxe,
    n = SMt(e.framesMode, e.model),
    r = String(e.openApiRoot || "").trim().replace(/\/+$/, ""),
    a = _oo(e.bearerToken),
    i = "image2video",
    o = `${r}/model/info?${new URLSearchParams({
      provider: t,
      model: n,
      type: i
    }).toString()}`;
  try {
    const s = await $i(o, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${a}`
        }
      }),
      l = await s.text();
    let d = {};
    try {
      d = l ? JSON.parse(l) : {};
    } catch {
      d = {
        message: l.slice(0, 200)
      };
    }
    const u = String(d.message || (typeof d.error == "string" ? d.error : "") || d.msg || l || "").slice(0, 240),
      h = koo(d),
      p = s.status === 404 || /not found|RESOURCE_NOT_FOUND|未找到|不存在/i.test(u) || d.error === !0 || String(d.error_code || "") === "RESOURCE_NOT_FOUND";
    return !s.ok || p ? {
      ok: !1,
      httpStatus: s.status,
      provider: t,
      model: n,
      type: i,
      parameterRules: h,
      raw: d,
      errorMsg: u || `HTTP ${s.status}`
    } : {
      ok: !0,
      httpStatus: s.status,
      provider: t,
      model: n,
      type: i,
      parameterRules: h,
      raw: d
    };
  } catch (s) {
    return {
      ok: !1,
      httpStatus: 0,
      provider: t,
      model: n,
      type: i,
      parameterRules: [],
      raw: {},
      errorMsg: s instanceof Error ? s.message : String(s)
    };
  }
}

function u0r(e, t) {
  const n = String(e || "").trim(),
    r = String(t || "").trim();
  if (!n) throw new Error("虎牙万相3.0 首尾帧模式需要首帧图片");
  return r ? {
    start: n,
    end: r
  } : {
    start: n
  };
}

function Ioo(e) {
  const t = {
    prompt: String(e.prompt || "").trim() || "生成视频",
    duration: IMt(e.durationUi),
    resolution: CMt(e.resolutionUi),
    aspectRatio: e.framesMode ? "adaptive" : EMt(e.ratioUi),
    audio: e.audio !== !1,
    promptExtend: !!e.promptExtend,
    watermark: !!e.watermark
  };
  if (e.seed != null && Number.isFinite(Number(e.seed)) && (t.seed = Number(e.seed)), e.framesMode) return t.key_frames = u0r(e.startImage, e.endImage), t;
  const n = (e.imageUrls || []).map(i => String(i || "").trim()).filter(Boolean).slice(0, 10),
    r = (e.videoUrls || []).map(i => String(i || "").trim()).filter(Boolean).slice(0, 5),
    a = (e.audioUrls || []).map(i => String(i || "").trim()).filter(Boolean).slice(0, 5);
  return n.length && (t.imageUrls = n), r.length && (t.videoUrls = r), a.length && (t.audioUrl = a), t;
}

function Coo(e) {
  return {
    action: "generate",
    model: {
      provider: String(e.provider || Vxe).trim() || Vxe,
      model: SMt(e.framesMode, e.model),
      type: "image2video"
    },
    parameters: e.parameters
  };
}

const h0r = Object.freeze(Object.defineProperty({
  __proto__: null,
  buildHuyaWan30KeyFrames: u0r,
  buildHuyaWan30Parameters: Ioo,
  buildHuyaWan30SubmitPayload: Coo,
  fetchHuyaWan30ModelInfo: Soo,
  resolveHuyaWan30SubmitEndpoint: Aoo
}, Symbol.toStringTag, {
  value: "Module"
}));

function Eoo(e) {
  return String(e || "").trim().replace(/^Bearer\s+/i, "");
}

function Too(e) {
  const t = e.parameter_rules ?? e.parameterRules;
  return Array.isArray(t) ? t : [];
}

async function Moo(e) {
  const t = String(e.provider || gce).trim() || gce,
    n = !!e.framesMode,
    r = wMt(n, e.model),
    a = e.type || "image2video",
    i = String(e.openApiRoot || "").trim().replace(/\/+$/, ""),
    o = Eoo(e.bearerToken),
    s = `${i}/model/info?${new URLSearchParams({
      provider: t,
      model: r,
      type: a
    }).toString()}`;
  try {
    const l = await $i(s, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${o}`
        }
      }),
      d = await l.text();
    let u = {};
    try {
      u = d ? JSON.parse(d) : {};
    } catch {
      u = {
        message: d.slice(0, 200)
      };
    }
    const h = String(u.message || (typeof u.error == "string" ? u.error : "") || u.msg || d || "").slice(0, 240),
      p = Too(u),
      m = l.status === 404 || /not found|RESOURCE_NOT_FOUND|未找到|不存在/i.test(h) || u.error === !0 || String(u.error_code || "") === "RESOURCE_NOT_FOUND";
    return !l.ok || m ? {
      ok: !1,
      httpStatus: l.status,
      provider: t,
      model: r,
      type: a,
      parameterRules: p,
      raw: u,
      errorMsg: h || `HTTP ${l.status}`
    } : {
      ok: !0,
      httpStatus: l.status,
      provider: t,
      model: r,
      type: a,
      parameterRules: p,
      raw: u
    };
  } catch (l) {
    return {
      ok: !1,
      httpStatus: 0,
      provider: t,
      model: r,
      type: a,
      parameterRules: [],
      raw: {},
      errorMsg: l instanceof Error ? l.message : String(l)
    };
  }
}

function Poo(e) {
  return "image2video";
}

function Roo(e) {
  const t = s9(e, "minimax-h3-huya") || hv,
    n = b3(t) || "https://art.huya.info/openapi/v1";
  return {
    endpoint: t,
    openApiRoot: n
  };
}

function p0r(e, t) {
  const n = String(e || "").trim(),
    r = String(t || "").trim();
  if (!n && !r) throw new Error("虎牙 MiniMax-H3 首尾帧模式需要至少一张首帧或尾帧图片");
  const a = {};
  return n && (a.start = n), r && (a.end = r), a;
}

function Noo(e) {
  var n, r, a;
  const t = {
    prompt: String(e.prompt || "").trim() || "生成视频",
    duration: A7n(e.durationSec),
    resolution: _7n(e.resolutionUi)
  };
  return e.framesMode ? (t.key_frames = p0r(e.startImage, e.endImage), t) : (t.ratio = S7n(e.ratioUi), (n = e.images) != null && n.length && (t.imageUrls = e.images), (r = e.videos) != null && r.length && (t.videoUrls = e.videos), (a = e.audio) != null && a.length && (t.audioUrls = e.audio), t);
}

function joo(e) {
  const t = !!e.framesMode;
  return {
    model: {
      provider: e.provider || gce,
      model: wMt(t, e.model),
      type: e.type || "image2video"
    },
    parameters: e.parameters
  };
}

function Doo(e, t) {
  return e !== 404 && e !== 400 ? !1 : /not found|RESOURCE_NOT_FOUND|未找到/i.test(t || "");
}

function Loo(e, t, n) {
  const r = String(n || "minimax-h3").trim() || "minimax-h3",
    a = t ? `（${t.slice(0, 180)}）` : "";
  return `海艺返回未找到 ${r}（provider=minimax, type=${e}）${a}。请确认 Token 有效，并用 GET /openapi/v1/model/info?provider=minimax&model=${r}&type=${e} 检查账号是否已开通该模型。`;
}

const yUt = Object.freeze(Object.defineProperty({
  __proto__: null,
  buildHuyaMiniMaxH3KeyFrames: p0r,
  buildHuyaMiniMaxH3Parameters: Noo,
  buildHuyaMiniMaxH3SubmitPayload: joo,
  fetchHuyaMiniMaxH3ModelInfo: Moo,
  formatHuyaMiniMaxH3ModelMissingError: Loo,
  isHuyaMiniMaxH3ModelNotFoundError: Doo,
  resolveHuyaMiniMaxH3SubmitEndpoint: Roo,
  resolveHuyaMiniMaxH3TaskType: Poo
}, Symbol.toStringTag, {
  value: "Module"
}));

function Ooo(e) {
  return String(e || "").trim().replace(/^Bearer\s+/i, "");
}

function Boo(e) {
  const t = e.parameter_rules ?? e.parameterRules;
  return Array.isArray(t) ? t : [];
}

function Foo(e, t) {
  const n = s9(e, t) || hv,
    r = b3(n) || "https://art.huya.info/openapi/v1";
  return {
    endpoint: n,
    openApiRoot: r
  };
}

function zoo(e) {
  return String(e.configId || "").trim() === "kling-3.0-huya" && (e.imageCount <= 0 || e.multiShot) ? "text2video" : "image2video";
}

async function Uoo(e) {
  const t = Lqe(e.configId, e.provider),
    n = Oqe(e.configId, e.model),
    r = String(e.openApiRoot || "").trim().replace(/\/+$/, ""),
    a = Ooo(e.bearerToken),
    i = `${r}/model/info?${new URLSearchParams({
      provider: t,
      model: n,
      type: e.type
    }).toString()}`;
  try {
    const o = await $i(i, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${a}`
        }
      }),
      s = await o.text();
    let l = {};
    try {
      l = s ? JSON.parse(s) : {};
    } catch {
      l = {
        message: s.slice(0, 200)
      };
    }
    const d = String(l.message || (typeof l.error == "string" ? l.error : "") || l.msg || s || "").slice(0, 240),
      u = Boo(l),
      h = o.status === 404 || /not found|RESOURCE_NOT_FOUND|未找到|不存在/i.test(d) || l.error === !0 || String(l.error_code || "") === "RESOURCE_NOT_FOUND";
    return !o.ok || h ? {
      ok: !1,
      httpStatus: o.status,
      provider: t,
      model: n,
      type: e.type,
      parameterRules: u,
      raw: l,
      errorMsg: d || `HTTP ${o.status}`
    } : {
      ok: !0,
      httpStatus: o.status,
      provider: t,
      model: n,
      type: e.type,
      parameterRules: u,
      raw: l
    };
  } catch (o) {
    return {
      ok: !1,
      httpStatus: 0,
      provider: t,
      model: n,
      type: e.type,
      parameterRules: [],
      raw: {},
      errorMsg: o instanceof Error ? o.message : String(o)
    };
  }
}

function m0r(e, t) {
  const n = String(e || "").trim();
  if (n === "kling-v2-6-huya") return "pro";
  const r = String(t || "").trim().toLowerCase();
  return r === "std" || r === "pro" ? r : n === "kling-3.0-huya" || L2(n) ? "std" : "pro";
}

function uDe(e) {
  const t = String(e || "16:9").trim();
  return t === "1:1" || t === "16:9" || t === "9:16" ? t : "16:9";
}

function Klt(e, t) {
  const n = {};
  return e && (n.start = e), t && (n.end = t), n;
}

function f0r(e) {
  if (!(e != null && e.length)) return;
  const t = [];
  for (const n of e.slice(0, 3)) {
    const r = String(n || "").trim();
    if (!/^\d+$/.test(r)) continue;
    const a = Number(r);
    Number.isFinite(a) && t.push(a);
  }
  return t.length ? t : void 0;
}

function $oo(e) {
  var l, d;
  const t = String(e.configId || "").trim(),
    n = !!e.multiShot,
    r = n ? String(e.prompt || "").trim() : String(e.prompt || "").trim() || "生成视频",
    a = String(e.negativePrompt || "").trim(),
    i = m0r(t, e.modeUi),
    o = {
      prompt: r
    },
    s = f0r(e.subjectIds);
  return L2(t) ? (o.mode = i, o.Duration = Math.min(15, Math.max(3, Math.round(e.durationSec) || 8)), o.AspectRatio = uDe(e.ratioUi), o.sound = !!e.sound, o.keep_original_sound = !!e.keepOriginalSound, (l = e.imageList) != null && l.length && (o.imageList = e.imageList.slice(0, 7)), e.videoUrl && (o.video = e.videoUrl), s && (o.elementList = s), o) : t === "kling-3.0-huya" ? (o.mode = i, o.Duration = Math.min(15, Math.max(3, Math.round(e.durationSec) || 8)), o.sound = !!e.sound, a && (o.NegativePrompt = a), s && (o.elementList = s), n ? (o.multi_shot = !0, o.shot_type = e.shotType === "customize" ? "customize" : "intelligence", e.shotType === "customize" && ((d = e.multiPrompt) != null && d.length) && (o.multi_prompt = e.multiPrompt.map(u => ({
    index: u.index,
    prompt: u.prompt,
    duration: String(u.duration || "2")
  }))), o.AspectRatio = uDe(e.ratioUi), e.startImage && (o.key_frames = Klt(e.startImage, e.endImage))) : e.type === "text2video" ? (o.multi_shot = !1, o.AspectRatio = uDe(e.ratioUi)) : (o.multi_shot = !1, o.key_frames = Klt(e.startImage, e.endImage)), o) : (o.duration = e.durationSec >= 8 ? "10" : "5", a && (o.negativePrompt = a), $j(t) ? (e.startImage && (o.image = e.startImage), o) : (o.mode = i, o.key_frames = Klt(e.startImage, e.endImage), o));
}

function Goo(e) {
  return {
    model: {
      provider: Lqe(e.configId, e.provider),
      model: Oqe(e.configId, e.model),
      type: e.type
    },
    parameters: e.parameters
  };
}

function Voo(e, t) {
  return e !== 404 && e !== 400 ? !1 : /not found|RESOURCE_NOT_FOUND|未找到/i.test(t || "");
}

function Hoo(e, t, n) {
  const r = Lqe(e),
    a = Oqe(e),
    i = n ? `（${n.slice(0, 180)}）` : "";
  return `海艺返回未找到 ${a}（provider=${r}, type=${t}）${i}。请确认 Token 有效，并用 GET /openapi/v1/model/info?provider=${r}&model=${a}&type=${t} 检查账号是否已开通该模型。`;
}

const bUt = Object.freeze(Object.defineProperty({
  __proto__: null,
  buildHuyaKlingParameters: $oo,
  buildHuyaKlingSubmitPayload: Goo,
  fetchHuyaKlingModelInfo: Uoo,
  formatHuyaKlingModelMissingError: Hoo,
  isHuyaKlingModelNotFoundError: Voo,
  mapHuyaKlingAspectRatioToApi: uDe,
  mapHuyaKlingElementList: f0r,
  mapHuyaKlingModeToApi: m0r,
  resolveHuyaKlingSubmitEndpoint: Foo,
  resolveHuyaKlingTaskType: zoo
}, Symbol.toStringTag, {
  value: "Module"
}));

async function Woo(e, t, n, r) {
  var _, w, k, A;
  if (!e.remoteTaskId) throw new Error("即梦任务缺少 submit_id");
  const a = e.type === "video" ? "video" : "image",
    i = await y9n(e.remoteTaskId, a),
    o = {
      message: i.message || (i.status === "failed" ? "生成失败" : i.status === "succeeded" ? "生成完成" : "任务已提交，等待云端处理"),
      checkedAt: Date.now()
    };
  if (t(S => S.map(C => C.id === e.id ? {
    ...C,
    jimengStatus: o
  } : C)), i.status === "failed") {
    t(S => S.map(C => C.id === e.id ? {
      ...C,
      status: "failed",
      errorMsg: i.error
    } : C)), n(S => S.map(C => {
      var I;
      return C.id === e.sourceNodeId && ((I = C.settings) == null ? void 0 : I.jimengSubmitId) === e.remoteTaskId ? {
        ...C,
        isGenerating: !1,
        errorMsg: i.error,
        settings: {
          ...C.settings,
          isGenerating: !1,
          jimengPending: !1
        }
      } : C;
    }));
    return;
  }
  if (i.status !== "succeeded" || !((_ = i.urls) != null && _.length)) {
    n(S => S.map(C => {
      var I;
      return C.id === e.sourceNodeId && ((I = C.settings) == null ? void 0 : I.jimengSubmitId) === e.remoteTaskId ? {
        ...C,
        settings: {
          ...C.settings,
          progressMessage: o.message
        }
      } : C;
    }));
    return;
  }
  const {
      resolveGenImageCompletion: s,
      tryResolveGenResultForGlobalOss: l,
      buildHistoryItemPatchFromGlobalOss: d,
      pickGenVideoPlaybackUrl: u,
      pickOssVideoImagePosterUrl: h
    } = await Ie(async () => {
      const {
        resolveGenImageCompletion: S,
        tryResolveGenResultForGlobalOss: C,
        buildHistoryItemPatchFromGlobalOss: I,
        pickGenVideoPlaybackUrl: E,
        pickOssVideoImagePosterUrl: M
      } = await Promise.resolve().then(() => ii);
      return {
        resolveGenImageCompletion: S,
        tryResolveGenResultForGlobalOss: C,
        buildHistoryItemPatchFromGlobalOss: I,
        pickGenVideoPlaybackUrl: E,
        pickOssVideoImagePosterUrl: M
      };
    }, void 0, import.meta.url),
    {
      downloadUrlToLocal: p
    } = await Ie(async () => {
      const {
        downloadUrlToLocal: S
      } = await Promise.resolve().then(() => No);
      return {
        downloadUrlToLocal: S
      };
    }, void 0, import.meta.url),
    {
      assetStore: m
    } = await Ie(async () => {
      const {
        assetStore: S
      } = await Promise.resolve().then(() => Ri);
      return {
        assetStore: S
      };
    }, void 0, import.meta.url);
  let f,
    y,
    b,
    v = "";
  if (a === "image") {
    const S = await s(i.urls, e.id, {
        nodeId: e.sourceNodeId,
        model: (w = e.apiConfig) == null ? void 0 : w.modelId
      }),
      C = i.urls.map((I, E) => E ? `${e.id}_${E}` : e.id);
    if (!S.usedOss) for (let I = 0; I < i.urls.length; I++) await p(i.urls[I], C[I]);
    f = S.ossPack ? d(S.ossPack, {
      type: "image",
      mjImages: S.remoteUrls,
      mjThumbnails: S.displayUrls
    }) : {
      url: S.primaryDisplayUrl,
      _assetId: e.id,
      mjImages: S.displayUrls,
      _mjAssetIds: C
    }, y = {
      content: S.primaryDisplayUrl,
      _contentAssetId: S.contentAssetId
    }, v = S.primaryDisplayUrl, b = {
      ...(((k = S.ossPack) == null ? void 0 : k.ossSettings) || {}),
      generatedImages: S.generatedImages
    };
  } else {
    const S = i.urls[0],
      C = await l([S], e.id, !0);
    let I = null;
    C || (await p(S, e.id, `jimeng_cli_${e.id}.mp4`), I = await m.getAssetUrl(e.id));
    const E = u(C, S, I);
    v = E;
    const M = C ? h((A = C.displayUrls) == null ? void 0 : A[0]) : "";
    f = C ? d(C, {
      type: "video"
    }) : {
      url: E,
      _assetId: e.id
    }, y = {
      content: M || (C ? "" : E),
      _contentAssetId: C ? void 0 : e.id,
      videoPosterUrl: M || void 0
    }, b = {
      ...((C == null ? void 0 : C.ossSettings) || {}),
      ...(C ? {
        _ossRemoteUrl: E,
        videoPosterUrl: M
      } : {})
    };
  }
  t(S => S.map(C => C.id === e.id ? {
    ...C,
    ...f,
    status: "completed",
    progress: 100,
    errorMsg: void 0
  } : C)), n(S => {
    var E;
    const C = S.find(M => M.id === e.sourceNodeId);
    if (!C || ((E = C.settings) == null ? void 0 : E.jimengSubmitId) !== e.remoteTaskId) return S;
    const I = new Set(r.filter(M => M.from === C.id).map(M => M.to));
    return S.map(M => {
      var T;
      return M.id === C.id ? {
        ...M,
        ...y,
        isGenerating: !1,
        errorMsg: void 0,
        settings: {
          ...M.settings,
          ...b,
          isGenerating: !1,
          progress: 100,
          error: null,
          jimengPending: !1
        }
      } : I.has(M.id) && M.type === "preview" ? {
        ...M,
        ...y,
        content: v,
        previewType: a,
        settings: {
          ...M.settings,
          ...b,
          previewSourceModel: (T = e.apiConfig) == null ? void 0 : T.modelId
        }
      } : M;
    });
  });
}

const vUt = Object.freeze(Object.defineProperty({
  __proto__: null,
  refreshJimengCliHistory: Woo
}, Symbol.toStringTag, {
  value: "Module"
}));

function NW(e) {
  return e && typeof e == "object" && !Array.isArray(e) ? e : null;
}

function $ne(...e) {
  for (const t of e) {
    const n = String(t || "").trim();
    if (n) return n;
  }
  return "";
}

function Jmn(e) {
  return e.replace(/\s+/g, " ").trim().toLowerCase();
}

function hDe(e) {
  if (typeof e == "string") {
    const n = e.trim();
    if (!n) return "";
    try {
      return hDe(JSON.parse(n));
    } catch {
      return n;
    }
  }
  const t = NW(e);
  return t ? $ne(t.prompt, t.positive_prompt, t.caption) : "";
}

function qoo(e) {
  const t = String(e || "").trim();
  if (!t) return "";
  const n = "/fal/",
    r = t.toLowerCase().indexOf(n);
  return (r >= 0 ? t.slice(r + n.length) : t.replace(/^https?:\/\/[^/]+\//, "")).replace(/\/requests\/[^/]+(?:\/status)?\/?$/i, "").replace(/^\/+|\/+$/g, "");
}

function Koo(e) {
  const t = NW(e);
  if (!t) return null;
  const n = NW(t.data) || t,
    r = NW(n.data) || n,
    a = NW(t.properties),
    i = $ne(t.task_id, t.taskId, n.request_id, n.requestId, t.request_id);
  if (!i) return null;
  const o = $ne(n.response_url, t.response_url, r.response_url),
    s = $ne(n.status_url, t.status_url),
    l = qoo(o || s),
    d = hDe(a == null ? void 0 : a.input) || hDe(t.prompt) || hDe(r.prompt),
    u = hM(r);
  return {
    taskId: i,
    requestId: $ne(n.request_id, n.requestId, t.request_id, t.requestId, i),
    modelPath: l,
    prompt: d,
    status: $ne(n.status, t.status, r.status).toUpperCase(),
    createdAt: Number(t.created_at || t.submit_time || t.updated_at || 0) || 0,
    imageUrls: u.length ? u : hM(n).length ? hM(n) : hM(t),
    model3d: Yae(r) || Yae(n) || Yae(t),
    raw: t
  };
}

function Qoo(e) {
  const t = NW(e);
  if (Array.isArray(e)) return e;
  if (!t) return [];
  const n = t.data;
  if (Array.isArray(n)) return n;
  const r = NW(n);
  return r ? Array.isArray(r.items) ? r.items : Array.isArray(r.data) ? r.data : Array.isArray(r.records) ? r.records : Array.isArray(r.list) ? r.list : [] : [];
}

function Yoo(e, t) {
  var o;
  const n = Jmn(String(e.prompt || "")),
    r = String(e.falModelPath || "").trim().toLowerCase(),
    a = e.type === "3d";
  return ((o = t.map(s => {
    const l = Jmn(s.prompt),
      d = s.modelPath.toLowerCase();
    if (!(a ? !!(s.model3d || d.includes("3d") || d.includes("hunyuan") || d.includes("tripo")) : s.imageUrls.length > 0 || !d.includes("hunyuan-3d") && !d.includes("/3d/"))) return null;
    let h = 0;
    r && d && (d === r || d.includes(r) || r.includes(d)) && (h += 8), n && l && (l === n ? h += 10 : (l.includes(n.slice(0, 24)) || n.includes(l.slice(0, 24))) && (h += 6)), (s.status === "SUCCESS" || s.status === "COMPLETED" || s.status === "SUCCEEDED") && (h += 3), (s.imageUrls.length || s.model3d) && (h += 2);
    const p = Number(e.startTime || 0);
    return p > 0 && s.createdAt > 0 && Math.abs(s.createdAt * (s.createdAt > 1e12 ? 1 : 1e3) - p) < 900 * 1e3 && (h += 2), h > 0 ? {
      task: s,
      score: h
    } : null;
  }).filter(s => !!s).sort((s, l) => l.score - s.score || l.task.createdAt - s.task.createdAt)[0]) == null ? void 0 : o.task) || null;
}

function Xoo(e, t) {
  let n = "",
    r = "";
  try {
    n = localStorage.getItem("qiaodoumayi_platform_system_token") || "", r = localStorage.getItem("qiaodoumayi_platform_user_id") || "";
  } catch {}
  return {
    baseUrl: e,
    systemToken: n || t,
    userId: r
  };
}

async function Joo(e) {
  const t = String(e.apiKey || "").trim(),
    n = String(e.baseUrl || "").replace(/\/+$/, "");
  if (!t || !n) return [];
  const r = Xoo(n, t),
    a = ["/api/task/self?p=1&page_size=50&platform=fal-ai", "/api/task/self?p=1&page_size=50"];
  for (const i of a) try {
    const o = await B2({
        auth: r,
        path: i,
        assertSuccess: !1
      }),
      s = Qoo(o).map(Koo).filter(l => !!l);
    if (s.length > 0) return s;
  } catch {}
  return [];
}

async function g0r(e, t) {
  const n = await Joo(t);
  return n.length === 0 ? null : Yoo(e, n);
}

function Zoo(e, t) {
  var o, s, l;
  const n = t && typeof t == "object" ? t : {},
    r = String(e.remoteTaskId || n.threeDFalRequestId || "").trim(),
    a = String(e.falModelPath || n.threeDFalModelPath || "").trim(),
    i = String(((o = e.apiConfig) == null ? void 0 : o.modelId) || n.model || e.modelName || "").trim();
  return {
    ...e,
    remoteTaskId: r || e.remoteTaskId,
    falModelPath: a || e.falModelPath,
    apiConfig: e.apiConfig || (i ? {
      modelId: i,
      baseUrl: String(((s = e.apiConfig) == null ? void 0 : s.baseUrl) || ""),
      apiKey: String(((l = e.apiConfig) == null ? void 0 : l.apiKey) || "")
    } : e.apiConfig)
  };
}

function y0r(e) {
  var r;
  const t = String(e.falModelPath || "").trim();
  if (t) return t;
  const n = ((r = e.apiConfig) == null ? void 0 : r.modelId) || e.modelName;
  return UY(n) ? wPn({}) : gPn({
    modelId: n
  });
}

async function eso(e, t) {
  var d, u, h;
  const n = String(t.apiKey || "").trim();
  if (!n) throw new Error("请先在设置里填写 API Key");
  const r = String(t.baseUrl || ((d = e.apiConfig) == null ? void 0 : d.baseUrl) || Qa.getGlobalBaseUrl()).trim();
  let a = String(e.remoteTaskId || "").trim(),
    i = y0r(e),
    o = null;
  if (!a || !i) {
    const p = await g0r(e, {
      apiKey: n,
      baseUrl: r
    });
    p && (a = a || p.requestId || p.taskId, i = i || p.modelPath, o = p.model3d);
  }
  if (!a) throw new Error("无法刷新：第三方未找到对应 Fal 任务");
  if (!i) throw new Error("无法刷新：缺少 3D Fal 路径");
  o || (o = await jWe({
    falPrefix: Po(r),
    apiKey: n,
    modelPath: i,
    submitData: {
      request_id: a
    },
    pickResult: Yae
  }));
  const s = String(e.prompt || "").trim(),
    l = ((u = e.apiConfig) == null ? void 0 : u.modelId) || e.modelName;
  return {
    asset_source: KWe(l) ? "imported" : "generated",
    imported_asset_kind: "object",
    display_name: s.slice(0, 48) || "3D",
    source_url: o.sourceUrl,
    source_format: o.format,
    rendered_image_url: o.thumbnailUrl || void 0,
    src_thumbnail_url: o.thumbnailUrl || void 0,
    caption: s || void 0,
    lod_assets: (h = o.extras) == null ? void 0 : h.map(p => ({
      format: p.format,
      level: p.fileName || p.format,
      url: p.url
    }))
  };
}

const Zmn = Object.freeze(Object.defineProperty({
  __proto__: null,
  recoverThreeDFalHistoryItem: Zoo,
  refreshHunyuan3dFalHistory: eso,
  resolveHunyuan3dFalHistoryModelPath: y0r
}, Symbol.toStringTag, {
  value: "Module"
}));

async function tso(e, t) {
  var s;
  const n = String(t.apiKey || "").trim();
  if (!n) throw new Error("请先在设置里填写 API Key");
  const r = String(t.baseUrl || ((s = e.apiConfig) == null ? void 0 : s.baseUrl) || Qa.getGlobalBaseUrl()).trim();
  let a = String(e.remoteTaskId || "").trim(),
    i = OLt(e);
  if (!a || !i) {
    const l = await g0r(e, {
      apiKey: n,
      baseUrl: r
    });
    if (l && (a = a || l.requestId || l.taskId, i = i || l.modelPath, l.imageUrls.length > 0)) return {
      urls: l.imageUrls,
      requestId: a,
      falModelPath: i
    };
  }
  if (!a) throw new Error("无法刷新：第三方未找到对应 Fal 任务");
  if (!i) throw new Error("无法刷新：缺少 Fal 图片路径");
  return {
    urls: await GM({
      falPrefix: Po(r),
      apiKey: n,
      modelPath: i,
      submitData: {
        request_id: a
      }
    }),
    requestId: a,
    falModelPath: i
  };
}

const b0r = Object.freeze(Object.defineProperty({
  __proto__: null,
  recoverFalImageHistoryItem: JBa,
  refreshFalImageHistory: tso,
  resolveFalImageHistoryModelPath: OLt
}, Symbol.toStringTag, {
  value: "Module"
}));

function nso(e, t) {
  const r = e.split("?")[0].split("#")[0].split("/").pop() || "";
  return r && r.includes(".") ? s_(r) : s_(t);
}

async function efn(e, t) {
  const n = await $i(e, {
    method: "GET"
  });
  if (!n.ok) throw new Error(`下载 3D 文件失败（HTTP ${n.status}）`);
  const r = Number(n.headers.get("content-length") || 0);
  if (!n.body || !t) return n.arrayBuffer();
  const a = n.body.getReader(),
    i = [];
  let o = 0;
  for (;;) {
    const {
      done: d,
      value: u
    } = await a.read();
    if (d) break;
    u && (i.push(u), o += u.byteLength, t(o, r));
  }
  const s = new Uint8Array(o);
  let l = 0;
  for (const d of i) s.set(d, l), l += d.byteLength;
  return s.buffer;
}

function v0r(e) {
  if (!e) return [];
  const t = [],
    n = new Set(),
    r = (i, o) => {
      const s = String(i || "").trim();
      !s || n.has(s) || (n.add(s), t.push({
        url: s,
        fileName: nso(s, o || `model-${t.length + 1}`)
      }));
    },
    a = _X(e) || e.source_url;
  if (a) {
    const i = e.source_format === "obj" && !_X(e) ? "obj" : "glb";
    r(a, `model.${i}`);
  }
  for (const i of e.lod_assets || []) i.format !== "spz" && r(i.url, i.level || `${i.format || "part"}`);
  return t;
}

async function w0r(e, t = "3D", n) {
  const r = v0r(e);
  if (!r.length) throw new Error("没有可下载的 3D 模型文件");
  const a = s_(t || "3D模型", 40),
    i = (l, d) => {
      var u;
      (u = n == null ? void 0 : n.onProgress) == null || u.call(n, {
        percent: Math.max(0, Math.min(100, Math.round(l))),
        label: d
      });
    };
  if (i(4, "正在准备 3D 文件…"), r.length === 1 && /\.glb$/i.test(r[0].fileName)) {
    const l = await efn(r[0].url, (d, u) => {
      const h = u > 0 ? d / u : .5;
      i(8 + h * 86, `正在下载 3D 模型 ${Math.round(8 + h * 86)}%`);
    });
    return i(100, "3D 模型已就绪"), {
      blob: new Blob([l], {
        type: "model/gltf-binary"
      }),
      fileName: `${a}.glb`
    };
  }
  const o = new fOt();
  for (let l = 0; l < r.length; l += 1) {
    const d = r[l],
      u = 8 + l / r.length * 80,
      h = 8 + (l + 1) / r.length * 80;
    i(u, `正在下载 ${l + 1}/${r.length}：${d.fileName}`);
    const p = await efn(d.url, (m, f) => {
      const y = f > 0 ? m / f : .6;
      i(u + (h - u) * y, `正在下载 ${l + 1}/${r.length}：${d.fileName}`);
    });
    o.file(d.fileName, p), i(h, `已下载 ${l + 1}/${r.length}`);
  }
  i(92, "正在打包 3D 模型…");
  const s = await o.generateAsync({
    type: "blob"
  });
  return i(100, "3D 模型已就绪"), {
    blob: s,
    fileName: `${a}.zip`
  };
}

const rso = Object.freeze(Object.defineProperty({
    __proto__: null,
    buildThreeDDownloadBlob: w0r,
    collectThreeDDownloadFiles: v0r
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  xoe = "studio-generation-workspace",
  wUt = "qiaodoumayi_studio_generation_workspace_v1";

function x0r(e) {
  if (!e) return null;
  const t = JSON.parse(e);
  if ((t == null ? void 0 : t.version) !== 1 || !Array.isArray(t.nodes) || !Array.isArray(t.connections)) throw new Error("创作记录格式无法读取，已保留原文件。");
  const n = new Set(t.nodes.map(r => r.id));
  return {
    ...t,
    connections: t.connections.filter(r => n.has(r.from) && n.has(r.to))
  };
}

async function aso(e = wUt, t = xoe) {
  await Ur.ensureRestored();
  const n = await Ur.readDiskLocalStorageEntry(e),
    r = localStorage.getItem(e);
  if (r === "__QDMY_DISK_V1__" && !n) throw new Error("创作记录位于缓存目录，请连接原缓存目录后重新打开。");
  const i = [n, r].filter(d => d && d !== "__QDMY_DISK_V1__").map(d => x0r(d)).sort((d, u) => u.updatedAt - d.updatedAt)[0] || {
    version: 1,
    updatedAt: 0,
    nodes: [],
    connections: []
  };
  i.nodes = i.nodes.filter(Nx);
  const o = new Set(i.nodes.map(d => d.id));
  i.connections = i.connections.filter(d => o.has(d.from) && o.has(d.to)), await AYe(i);
  const s = await Vke(i.nodes.filter(d => {
      var u;
      return !((u = d.settings) != null && u._libraryMedia);
    }).map(m5e), t, {
      preserveOpenCache: !0
    }),
    l = new Map(s.map(d => [d.id, d]));
  return i.nodes = await hWn(i.nodes.map(d => l.get(d.id) || d)), i.nodes = i.nodes.map(d => {
    var u, h, p;
    return !d.isGenerating && !((u = d.settings) != null && u.isGenerating) && !((h = d.settings) != null && h.studioGeneration && !((p = d.settings) != null && p.studioGenerationSettled) && !d.errorMsg && !Cy(d).length) ? d : {
      ...d,
      isGenerating: !1,
      errorMsg: Cy(d).length ? void 0 : "上次任务未完成，可从生成历史找回结果或重试。",
      settings: {
        ...d.settings,
        isGenerating: !1,
        progress: void 0
      }
    };
  }), i;
}

async function iso(e, t, n = wUt) {
  if (ch()) {
    const s = await Ur.readDiskLocalStorageEntry(n),
      l = localStorage.getItem(n),
      d = [s, l].filter(h => h && h !== "__QDMY_DISK_V1__").map(h => x0r(h)).sort((h, p) => p.updatedAt - h.updatedAt)[0],
      u = new Set(d == null ? void 0 : d.nodes.filter(h => !Nx(h)).map(h => h.id));
    e = L4t((d == null ? void 0 : d.nodes) || [], N4e(e, (d == null ? void 0 : d.nodes) || [])), t = [...((d == null ? void 0 : d.connections) || []).filter(h => u.has(h.from) && u.has(h.to)), ...t];
  }
  const r = JSON.parse(JSON.stringify({
      version: 1,
      updatedAt: Date.now(),
      nodes: e,
      connections: t
    })),
    a = new Map(e.filter(s => {
      var l;
      return (l = s.settings) == null ? void 0 : l._libraryMedia;
    }).map(s => [s.id, G0a(s)]));
  r.nodes = r.nodes.filter(s => !a.has(s.id)), ua() ? r.nodes = r.nodes.map(LHe) : await B7t(r);
  const i = new Map(r.nodes.map(s => [s.id, s]));
  r.nodes = e.map(s => a.get(s.id) || i.get(s.id) || s);
  const o = JSON.stringify(r);
  Ur.isAvailable() && (await Ur.writeDiskLocalStorageEntry(n, o)), localStorage.setItem(n, o);
}

function oso(e) {
  const t = new Map();
  for (const n of e) {
    n.studioImageTool && t.set(`studio-image-tool:${n.id}`, n);
    const r = que(n);
    r && !t.has(r) && t.set(r, n), !C5e(n) && n.sourceNodeId && !t.has(n.sourceNodeId) && t.set(n.sourceNodeId, n);
  }
  return t;
}

function kAe(e, t, n) {
  var s, l, d;
  let r = Cy(e);
  const a = n && n.status !== "idle" && (!t || n.taskId === t.id) ? n : t;
  if (!r.length && (t == null ? void 0 : t.status) === "completed" && (t.type === "image" || t.type === "video") && (r = ((s = t.mjImages) != null && s.length ? t.mjImages : [t.originalUrl || t.url]).flatMap((h, p) => {
    var f, y;
    const m = ((f = t._mjAssetIds) == null ? void 0 : f[p]) || t._assetId;
    return !m && !fu(h || "") ? [] : [{
      id: `${t.id}:${p}`,
      createdAt: t.timestamp || t.startTime || 0,
      mediaType: t.type === "video" ? "video" : "image",
      content: h || "",
      originalUrl: h || "",
      thumbnailUrl: ((y = t.mjThumbnails) == null ? void 0 : y[p]) || t.thumbnailUrl || h || "",
      assetId: m,
      videoPosterUrl: t.videoPosterUrl,
      ossRemoteUrl: t._ossRemoteUrl,
      ossThumbnailUrl: t._ossThumbnailUrl,
      globalOssUrlOnly: t._globalOssUrlOnly,
      generatedImages: []
    }];
  })), r.length) return {
    entries: r,
    running: !1,
    error: "",
    label: "生成完成",
    progress: 100
  };
  const i = Math.min(99, Math.max(0, Math.round((a == null ? void 0 : a.progress) || 0)));
  if ((a == null ? void 0 : a.status) === "generating") return {
    entries: r,
    running: !0,
    error: "",
    progress: i,
    label: i > 0 ? `生成中 · ${i}%` : "任务已提交，正在生成"
  };
  if ((a == null ? void 0 : a.status) === "completed") return {
    entries: r,
    running: !1,
    error: "",
    progress: 100,
    label: "生成完成，正在读取作品"
  };
  const o = (a == null ? void 0 : a.status) === "failed" ? a.errorMsg || e.errorMsg || "生成失败，请查看错误详情。" : e.errorMsg || String(((l = e.settings) == null ? void 0 : l.errorMsg) || ((d = e.settings) == null ? void 0 : d.error) || "");
  return {
    entries: r,
    running: !o,
    error: o,
    progress: i,
    label: "正在提交生成任务"
  };
}

function pDe(e) {
  return !e.running && e.entries.length === 0 && e.error.length > 0;
}

function _0r(e) {
  return e.map(t => ({
    id: t.id,
    messageIndex: 0,
    query: t.prompt.replace(/\s+/g, " ").trim().slice(0, 80) || "未命名创作",
    responsePreview: t.running ? "正在生成…" : t.failed ? "生成未完成" : "已完成"
  }));
}

function sso(e, t) {
  return e.some(n => {
    var r, a;
    return sm(n) ? n.isGenerating || ((r = n.settings) == null ? void 0 : r.isGenerating) === !0 || al.getNodeSnapshot(n.id).status === "generating" ? !0 : ((a = sWe(t, n.id)) == null ? void 0 : a.status) === "generating" : !1;
  });
}

let rae = null;

const LSt = new Set();

function xUt(e, t = "image") {
  e.trim() && (rae = {
    id: crypto.randomUUID(),
    prompt: e.trim(),
    kind: t
  }, X1("generation"), LSt.forEach(n => n()));
}

function lso() {
  return rae;
}

function cso(e) {
  return LSt.add(e), () => {
    LSt.delete(e);
  };
}

function dso(e) {
  (rae == null ? void 0 : rae.id) === e && (rae = null);
}

function uso({
  label: e,
  progress: t
}) {
  on();
  const n = g.useRef(null);
  return g.useEffect(() => {
    const r = n.current;
    if (!r) return;
    let a = typeof IntersectionObserver > "u";
    const i = () => {
        r.dataset.active = String(a && !document.hidden);
      },
      o = typeof IntersectionObserver > "u" ? null : new IntersectionObserver(([s]) => {
        a = s.isIntersecting, i();
      });
    return o == null || o.observe(r), document.addEventListener("visibilitychange", i), i(), () => {
      o == null || o.disconnect(), document.removeEventListener("visibilitychange", i);
    };
  }, []), c.jsxs("div", {
    ref: n,
    className: "sg-loading",
    "data-active": "false",
    children: [c.jsxs("div", {
      className: "sg-loading-mark",
      "aria-hidden": "true",
      children: [c.jsx("i", {}), c.jsx("i", {}), c.jsx("i", {})]
    }), c.jsxs("div", {
      className: "sg-loading-caption",
      children: [c.jsx("span", {
        role: "status",
        children: x(e)
      }), t > 0 && c.jsx("span", {
        className: "sg-loading-progress",
        "aria-hidden": "true",
        children: c.jsx("i", {
          style: {
            transform: `scaleX(${Math.min(100, t) / 100})`
          }
        })
      })]
    })]
  });
}

const cZe = "relative min-h-0 flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide bg-transparent",
  _Ut = "relative flex w-full min-w-0 shrink-0 flex-col",
  k0r = "relative flex w-full min-w-0 shrink-0 flex-col",
  A0r = 120,
  tfn = 168,
  nfn = 132,
  S0r = 960,
  rfn = 56;

function hso(e) {
  var i, o;
  const t = e.closest('[class*="group/prompt"]') ?? ((o = (i = e.parentElement) == null ? void 0 : i.parentElement) == null ? void 0 : o.parentElement),
    n = t == null ? void 0 : t.parentElement;
  if (!t || !n) return rfn;
  let r = 0,
    a = !1;
  for (const s of Array.from(n.children)) {
    if (s === t || s instanceof HTMLElement && s.contains(t)) {
      a = !0;
      continue;
    }
    if (!a || !(s instanceof HTMLElement) || s.classList.contains("hidden")) continue;
    const l = s.getBoundingClientRect();
    if (l.height < 1) continue;
    r += l.height;
    const d = getComputedStyle(s);
    r += (parseFloat(d.marginTop) || 0) + (parseFloat(d.marginBottom) || 0);
  }
  return r + rfn;
}

function pso(e) {
  const t = e.getBoundingClientRect(),
    n = window.innerHeight || 720,
    r = hso(e),
    a = n - t.top - r;
  return Math.min(S0r, Math.floor(n * .9), Math.max(A0r, Math.floor(a)));
}

function I0r() {
  const [e, t] = g.useState(() => jl() || Rl());
  return g.useEffect(() => {
    const n = () => {
        t(jl() || Rl());
      },
      r = tZ(n),
      a = X4e(n);
    return n(), () => {
      r(), a();
    };
  }, []), e;
}

const kUt = ({
  expanded: e,
  isDark: t,
  onToggle: n,
  className: r = ""
}) => {
  on();
  const a = e ? "收起提示词区域" : "放大提示词区域";
  return c.jsx("button", {
    type: "button",
    "aria-label": x(a),
    "aria-expanded": e,
    className: `flex h-7 w-7 items-center justify-center rounded-md bg-transparent transition-colors ${t ? "text-zinc-300 hover:text-white" : "text-zinc-600 hover:text-zinc-950"} ${r}`,
    onMouseDown: i => {
      i.preventDefault(), i.stopPropagation();
    },
    onPointerDown: i => {
      i.button === 0 && (i.preventDefault(), i.stopPropagation(), n());
    },
    onClick: i => {
      i.preventDefault(), i.stopPropagation();
    },
    children: e ? c.jsx(AT, {
      size: 15,
      strokeWidth: 2
    }) : c.jsx(Wm, {
      size: 15,
      strokeWidth: 2
    })
  });
};

function mso({
  item: e,
  isDark: t
}) {
  on();
  const n = e.thumbSrc && dx(e.thumbSrc, e.mediaType) ? e.thumbSrc : void 0;
  return n ? c.jsx("img", {
    src: Xg(n),
    alt: "",
    className: "h-7 w-7 shrink-0 rounded object-cover border border-white/10",
    draggable: !1,
    onError: r => {
      Gv(r.currentTarget);
    }
  }) : e.mediaType === "audio" ? c.jsx("div", {
    className: `flex h-7 w-7 shrink-0 items-center justify-center rounded ${t ? "bg-[#1f1f1f] text-zinc-300" : "bg-zinc-100 text-zinc-600"}`,
    children: c.jsx(Qh, {
      size: 12,
      "aria-hidden": !0
    })
  }) : c.jsx("div", {
    className: `flex h-7 w-7 shrink-0 items-center justify-center rounded text-[9px] ${t ? "bg-[#1f1f1f] text-zinc-400" : "bg-zinc-100 text-zinc-500"}`,
    children: e.mediaType === "video" ? "▶" : x("图")
  });
}

function fso({
  isDark: e,
  anchorRect: t,
  items: n,
  currentPosition1Based: r,
  onSelectSlot: a,
  onPointerDownCapture: i,
  onPointerDown: o,
  onMouseDown: s,
  popoverRef: l
}) {
  on();
  const d = t.left + t.width / 2,
    u = t.top - 6;
  return c.jsx("div", {
    ref: l,
    "data-ref-pill-switch-popover": !0,
    className: `fixed z-[10450] min-w-[108px] overflow-hidden rounded-lg border py-1 shadow-xl ${e ? "border-zinc-600 bg-[#1f1f1f] text-zinc-100" : "border-zinc-300 bg-white text-zinc-900"}`,
    style: {
      left: d,
      top: u,
      transform: "translate(-50%, -100%)"
    },
    onPointerDownCapture: i,
    onPointerDown: o,
    onMouseDown: s,
    children: n.map(h => {
      const p = h.position1Based === r,
        m = Ahe(h.mediaType, h.position1Based, h.displayLabel || h.nodeName);
      return c.jsxs("button", {
        type: "button",
        onPointerDown: f => {
          f.preventDefault(), f.stopPropagation(), a(h.position1Based);
        },
        className: `mx-1 flex w-[calc(100%-8px)] items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors ${p ? e ? "border border-zinc-500/80 bg-zinc-800" : "border border-zinc-300 bg-zinc-100" : e ? "border border-transparent hover:bg-zinc-800/80" : "border border-transparent hover:bg-zinc-50"}`,
        children: [c.jsx(mso, {
          item: h,
          isDark: e
        }), c.jsx("span", {
          className: "min-w-0 truncate font-medium",
          children: m
        })]
      }, h.position1Based);
    })
  });
}

function gso({
  editorRef: e,
  references: t,
  suspended: n
}) {
  on();
  const [r, a] = g.useState(null);
  if (g.useEffect(() => {
    const p = e.current;
    if (!p || n || p.closest(".studio-generation")) {
      a(null);
      return;
    }
    let m = null;
    const f = () => {
        m = null, a(null);
      },
      y = v => {
        const _ = v.target instanceof Element ? v.target.closest("[data-prompt-ref]") : null;
        if (!_ || !p.contains(_) || _ === m) return;
        const w = t.find(A => A.position1Based === Number(_.getAttribute("data-ref-position")));
        if (!w) return;
        m = _;
        const k = _.getBoundingClientRect();
        a({
          item: w,
          left: k.left + k.width / 2,
          top: k.top - 6
        });
      },
      b = v => {
        (!(v.relatedTarget instanceof Node) || !(m != null && m.contains(v.relatedTarget))) && f();
      };
    return p.addEventListener("pointerover", y), p.addEventListener("pointerout", b), p.addEventListener("pointerdown", f), p.addEventListener("scroll", f), p.addEventListener("keydown", f), window.addEventListener("scroll", f, !0), window.addEventListener("resize", f), window.addEventListener("blur", f), () => {
      p.removeEventListener("pointerover", y), p.removeEventListener("pointerout", b), p.removeEventListener("pointerdown", f), p.removeEventListener("scroll", f), p.removeEventListener("keydown", f), window.removeEventListener("scroll", f, !0), window.removeEventListener("resize", f), window.removeEventListener("blur", f);
    };
  }, [e, t, n]), !r || n) return null;
  const {
      item: i,
      left: o,
      top: s
    } = r,
    d = `@${Ahe(i.mediaType || "image", i.position1Based, i.displayLabel || i.nodeName)}`,
    u = i.thumbSrc && dx(i.thumbSrc, i.mediaType) ? Xg(i.thumbSrc, vY) : "",
    h = i.mediaType === "video" ? Oo : i.mediaType === "audio" ? Qh : lo;
  return Da.createPortal(c.jsx("div", {
    role: "tooltip",
    "aria-label": x("参考素材：{0}", d),
    className: "pointer-events-none fixed z-[10420]",
    style: {
      left: o,
      top: s,
      transform: "translate(-50%, -100%)"
    },
    children: c.jsxs("div", {
      className: "relative h-[100px] overflow-hidden rounded-[12px] bg-black shadow-[0px_8px_24px_rgba(0,0,0,0.5)]",
      children: [u ? c.jsx("img", {
        src: u,
        alt: "",
        draggable: !1,
        className: "block h-[100px] w-auto object-cover",
        onError: p => {
          const m = p.currentTarget;
          if (Gv(m)) {
            m.onerror = () => {
              m.hidden = !0;
            };
            return;
          }
          m.hidden = !0;
        }
      }) : c.jsx("div", {
        className: "flex h-[100px] w-[100px] items-center justify-center text-white/45",
        children: c.jsx(h, {
          size: 28,
          "aria-hidden": !0
        })
      }), c.jsx("div", {
        className: "absolute inset-x-0 bottom-0 flex h-[40px] items-end justify-center bg-gradient-to-t from-black/60 to-transparent px-2 pb-[6px]",
        children: c.jsx("span", {
          className: "truncate text-[12px] font-medium leading-[20px] text-white/[0.88]",
          children: d
        })
      })]
    })
  }), document.body);
}

function C0r(e, t) {
  const n = Kk(e),
    r = Ec(e),
    {
      text: a,
      cursor: i
    } = oXe(r, n);
  return {
    text: a.slice(0, i) + t + a.slice(i),
    cursor: i + t.length
  };
}

function yso(e, t) {
  const n = Kk(e),
    r = Ec(e),
    {
      text: a,
      cursor: i
    } = oXe(r, n),
    o = JYr(a, i);
  return o ? {
    text: a.slice(0, o.start) + t + a.slice(o.end),
    cursor: o.start + t.length
  } : {
    text: a.slice(0, i) + t + a.slice(i),
    cursor: i + t.length
  };
}

function awe(e, t) {
  e.dataset.cursorPos = String(t.cursor), e.dispatchEvent(new CustomEvent(WX, {
    detail: t
  }));
}

const bso = 150,
  vso = "cubic-bezier(0.2, 0, 0, 1)";

function afn(e) {
  for (const t of e) try {
    t.cancel();
  } catch {}
}

function wso(e, t, n) {
  const r = e.animate([{
      height: `${t}px`
    }, {
      height: `${n}px`
    }], {
      duration: bso,
      easing: vso,
      fill: "forwards"
    }),
    a = r.finished.catch(() => {}).then(() => {
      try {
        r.commitStyles();
      } catch {}
      try {
        r.cancel();
      } catch {}
      e.style.height = `${n}px`;
    });
  return {
    animations: [r],
    finished: a
  };
}

const ifn = !0,
  cEe = ({
    nodeId: e,
    editorLabel: t,
    referenceSectionLabel: n,
    atMentionVariant: r,
    nodeType: a,
    value: i,
    onChange: o,
    onDeleteTag: s,
    placeholder: l,
    isDark: d,
    videoUrl: u,
    seedanceMaterials: h,
    assetAtMentionItems: p,
    assetAtMentionCategories: m,
    onSelectAssetAtMention: f,
    auxiliaryPromptEditMode: y = !1,
    promptExpanded: b = !1,
    onPromptExpandedChange: v,
    compactFloatingPromptPanel: _ = !1,
    compactAutoFocusSeq: w = 0,
    promptOverflowRemeasureKey: k,
    expandControlOnReferenceStrip: A = !1,
    onExpandControlChange: S,
    alwaysShowExpandControl: C = !1,
    focusEditThumbCache: I = {},
    promptReferenceItems: E = [],
    onCmdEnterSubmit: M,
    atMentionPreferAbove: T = !1,
    editorRef: P,
    disabled: R = !1,
    onPasteReferenceUrl: j
  }) => {
    on();
    const B = _7t(e),
      F = B.status !== "idle",
      N = g.useRef(null),
      G = g.useRef(null),
      [z, V] = g.useState(!1),
      [O, L] = g.useState(!1),
      D = g.useRef(null),
      U = g.useRef(null),
      H = g.useRef(!1),
      Y = g.useRef(i),
      K = g.useRef(i);
    K.current = i;
    const W = g.useRef(!1),
      [Q, q] = g.useState(!1),
      [ne, de] = g.useState(!1),
      [le, J] = g.useState({
        left: 24,
        top: 120
      }),
      [pe, ce] = g.useState(!1),
      [we, X] = g.useState(null),
      [Z, re] = g.useState(""),
      [fe, ye] = g.useState(0),
      [ie, ae] = g.useState(0),
      [be, Ee] = g.useState(0),
      xe = g.useRef(null),
      he = g.useRef(null),
      ue = g.useRef(null),
      ge = g.useRef(!1),
      _e = g.useRef(!1),
      ke = g.useRef(!1),
      ve = g.useRef(!1),
      Te = g.useRef(null),
      Ne = g.useRef(null),
      me = g.useRef(0),
      Ae = g.useRef(o);
    Ae.current = o;
    const [Fe, Me] = g.useState(i),
      [Re, $e] = g.useState(null),
      [rt, nt] = g.useState(null),
      ze = g.useRef(null),
      Le = g.useRef(null),
      Ke = g.useRef(!1),
      Xe = g.useRef(!1),
      De = g.useRef(E);
    De.current = E;
    const Ye = g.useRef(!1),
      Ce = g.useCallback(() => {
        if (D.current && (clearTimeout(D.current), D.current = null), U.current != null && (window.cancelAnimationFrame(U.current), U.current = null), W.current || me.current > 0) return;
        const $n = N.current ? Ec(N.current) : Y.current;
        !String($n || "").trim() && String(K.current || "").trim() || !H.current && !Op(K.current, $n) && Op($n, Y.current) || (Y.current = $n, Me($n), Op($n, K.current) ? H.current = !1 : (H.current = !0, Ae.current($n)));
      }, []),
      He = O || y,
      Ve = g.useRef(He),
      it = g.useRef(!1);
    Ve.current = He;
    const It = a === "gen-image" || a === "gen-video" || a === "text-node",
      Ft = g.useMemo(() => {
        const $n = p || [],
          yr = [],
          Ir = $n.filter(Gr => Gr.fromCanvas).length;
        Ir > 0 && yr.push({
          id: "from-canvas",
          label: "从画布上选择",
          count: Ir
        });
        for (const Gr of m || []) yr.push({
          id: Gr,
          label: Gr,
          count: $n.filter(Zr => !Zr.fromCanvas && Zr.category === Gr).length
        });
        return yr;
      }, [p, m]),
      We = g.useCallback(() => {
        ke.current = !1, ce(!1), de(!1), X(null), re(""), ye(0);
      }, []),
      Ze = g.useMemo(() => ZDt({
        categoryView: we,
        connectedNodes: E,
        folderCategories: Ft,
        assetItems: p || [],
        searchQuery: Z
      }), [we, E, Ft, p, Z]);
    g.useEffect(() => {
      ye(0);
    }, [Z, we]), g.useEffect(() => {
      fe < Ze.length || ye(Ze.length > 0 ? Ze.length - 1 : 0);
    }, [fe, Ze.length]);
    const Ge = g.useCallback(($n, yr) => {
        const Ir = N.current;
        if (!Ir) return;
        const {
            text: Gr,
            cursor: Zr
          } = yr != null && yr.replaceAdjacentRef ? yso(Ir, $n) : C0r(Ir, $n),
          La = Ec(Ir);
        Op(Gr, La) || (D.current && (clearTimeout(D.current), D.current = null), awe(Ir, {
          text: Gr,
          cursor: Zr,
          pillUpgrade: yr == null ? void 0 : yr.pillUpgrade
        }), Y.current = Gr, Me(Gr), L(!0), Op(Gr, K.current) || Ae.current(Gr));
      }, []),
      Oe = g.useCallback($n => {
        const yr = RF($n),
          Ir = E.some(Gr => Gr.position1Based === $n);
        Ge(yr, {
          pillUpgrade: Ir,
          replaceAdjacentRef: !0
        }), We(), requestAnimationFrame(() => {
          var Gr;
          (Gr = N.current) == null || Gr.focus({
            preventScroll: !0
          });
        });
      }, [Ge, We, E]),
      st = g.useCallback($n => {
        Ge(""), Promise.resolve(f == null ? void 0 : f($n)), We(), requestAnimationFrame(() => {
          var yr;
          (yr = N.current) == null || yr.focus({
            preventScroll: !0
          });
        });
      }, [Ge, We, f]),
      vt = g.useCallback($n => {
        if ($n.kind === "connected") {
          Oe($n.position1Based);
          return;
        }
        if ($n.kind === "folder") {
          X($n.categoryId), ye(0);
          return;
        }
        if ($n.kind === "asset") {
          st($n.item);
          return;
        }
        $n.kind === "back" && (X(null), ye(0));
      }, [Oe, st]),
      Ht = g.useCallback($n => {
        if (!N.current) return;
        const yr = Ec(N.current),
          Ir = vnt(N.current, $n),
          Gr = ($n.match(new RegExp(TVn.source, "gi")) || []).length,
          Zr = Gr > 0 && N.current.querySelectorAll("[data-smart-edit-protocol]").length < Gr;
        if (!(Op(yr, $n) && !Ir && !Zr)) {
          me.current += 1;
          try {
            const La = BBt($n);
            N.current.innerHTML = "", La.forEach(sa => {
              if (sa.type === "magic_item" && N.current) {
                const Ea = sa.payload,
                  ba = document.createElement("span");
                ba.setAttribute("data-magic-item", "true"), ba.setAttribute("data-magic-raw", sa.content), ba.setAttribute("data-mark-id", Ea._markId), ba.contentEditable = "false", ba.className = `inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[11px] font-medium whitespace-nowrap align-middle ${d ? "bg-[#1f1f1f] text-zinc-100 border border-zinc-600/80" : "bg-white text-zinc-800 border border-zinc-300"}`, ba.style.cssText = "vertical-align: middle; cursor: default; user-select: none; margin: 0 2px;";
                const ga = I[Ea._markId];
                if (ga) {
                  const $a = document.createElement("img");
                  $a.src = Xg(ga), $a.alt = "", $a.className = "h-4 w-4 rounded-full object-cover shrink-0 border border-white/20", $a.draggable = !1, $a.onerror = () => {
                    Gv($a);
                  }, ba.appendChild($a);
                } else {
                  const $a = document.createElement("span");
                  $a.className = `inline-flex h-4 w-4 items-center justify-center rounded-full shrink-0 ${d ? "bg-zinc-700/60 text-zinc-300" : "bg-zinc-200 text-zinc-600"}`, $a.textContent = "✦", ba.appendChild($a);
                }
                const _a = document.createElement("span");
                if (_a.textContent = Ea.label_name, ba.appendChild(_a), Ea.level && k_t[Ea.level]) {
                  const $a = document.createElement("span");
                  $a.className = d ? "text-[9px] text-zinc-500 shrink-0" : "text-[9px] text-zinc-400 shrink-0", $a.textContent = k_t[Ea.level], ba.appendChild($a);
                }
                N.current.appendChild(ba), VX(N.current);
              } else if (sa.type === "text" && N.current) {
                const Ea = MVn(sa.content);
                let ba = N.current.querySelectorAll("[data-smart-edit-protocol]").length;
                for (const ga of Ea) {
                  if (!N.current) break;
                  if (ga.type === "protocol") {
                    ba += 1, N.current.appendChild(NVn(ga.raw, ga.kind, ba)), VX(N.current);
                    continue;
                  }
                  !ifn && Ema(N.current, ga.text, {
                    isDark: d,
                    refItems: E
                  }) || bma(N.current, ga.text, {
                    isDark: d,
                    refItems: E
                  });
                }
              }
            }), gnt(N.current), u_e(N.current, {
              restoreCursor: !1
            });
          } finally {
            me.current = Math.max(0, me.current - 1);
          }
        }
      }, [I, d, E]);
    g.useEffect(() => {
      N.current && i && (Ht(i), Y.current = i);
    }, []), g.useEffect(() => {
      N.current && (Ht(i), Y.current = i);
    }, [ifn, e]), g.useEffect(() => {
      if (W.current) return;
      if (z) {
        const yr = N.current ? Ec(N.current) : Y.current;
        if (Op(i, yr)) {
          Y.current = i;
          return;
        }
        if (!String(yr || "").trim() && i.trim() && N.current) {
          Y.current = i, Ht(i);
          return;
        }
        if (Op(yr, Y.current)) return;
        const Ir = sa => (sa.match(/\{\{magic_item:/g) || []).length,
          Gr = Ir(i) > Ir(yr),
          Zr = !Op(i, yr) && !Op(i, Y.current) && !yr.startsWith(i) && !i.startsWith(yr),
          La = !H.current && !Op(i, yr) && Op(yr, Y.current);
        if ((Zr || La || Gr) && N.current) {
          if (Y.current = i, Ht(i), xe.current !== null) cy(N.current, xe.current), xe.current = null;else if (Gr) {
            const sa = Ec(N.current);
            cy(N.current, sa.length);
          }
        }
        return;
      }
      if (D.current) return;
      if (H.current || U.current != null) {
        const yr = N.current ? Ec(N.current) : Y.current;
        if (!Op(i, yr) && Op(yr, Y.current)) return;
      }
      if (i === Y.current) {
        H.current = !1;
        return;
      }
      const $n = N.current ? Ec(N.current) : Y.current;
      if (Op(i, $n)) {
        Y.current = i, H.current = !1;
        return;
      }
      Op($n, Y.current) && !Op(i, $n) && (H.current || U.current != null || D.current || !i.trim() && String(Y.current || "").trim() || !(!Op(i, Y.current) && !$n.startsWith(i) && !i.startsWith($n))) || (Y.current = i, H.current = !1, N.current && (Ht(i), xe.current !== null && (cy(N.current, xe.current), xe.current = null)));
    }, [i, e, z]), g.useEffect(() => {
      if (!N.current || !i || z || W.current || H.current) return;
      const $n = Ec(N.current);
      if (!(Op($n, Y.current) && !Op(i, $n))) {
        if (Op(i, $n)) {
          St();
          return;
        }
        Ht(i);
      }
    }, [I, E, z]), g.useEffect(() => {
      Y.current = i, Me(i), N.current && (Ht(i), xe.current = null);
    }, [e]), g.useEffect(() => {
      if (!W.current) {
        if (Op(Fe, i)) {
          H.current = !1;
          return;
        }
        Op(Fe, Y.current) || H.current || U.current != null || Me(i);
      }
    }, [i, Fe]);
    const nn = g.useRef(_);
    g.useEffect(() => {
      nn.current && !_ && Ce(), nn.current = _;
    }, [_, Ce]);
    const pt = g.useRef(w);
    g.useEffect(() => {
      if (!_ || w <= 0 || w === pt.current) return;
      pt.current = w, L(!0);
      let $n = 0;
      const yr = window.requestAnimationFrame(() => {
        $n = window.requestAnimationFrame(() => {
          const Ir = N.current;
          if (!Ir) return;
          Ir.focus({
            preventScroll: !0
          }), gnt(Ir);
          const Gr = Ec(Ir);
          cy(Ir, Gr.length), Gw(Ir);
        });
      });
      return () => {
        window.cancelAnimationFrame(yr), $n && window.cancelAnimationFrame($n);
      };
    }, [w, _]), g.useEffect(() => () => {
      U.current != null && (window.cancelAnimationFrame(U.current), U.current = null), Ce();
    }, [e]);
    const lt = () => {
        if (N.current) try {
          Gw(N.current);
        } catch ($n) {
          console.error("Failed to save cursor position:", $n);
        }
      },
      gt = g.useCallback(() => {
        var yr, Ir, Gr;
        const $n = N.current;
        if (!$n) return null;
        ve.current = !0;
        try {
          const Zr = Mpa($n),
            La = $n.getBoundingClientRect(),
            sa = !!$n.closest("[data-edit-image-bottom-panel]"),
            Ea = sa ? (yr = document.querySelector("[data-edit-image-bottom-panel]")) == null ? void 0 : yr.getBoundingClientRect() : null;
          return JDt(Zr, La, ((Ir = Te.current) == null ? void 0 : Ir.offsetWidth) || YDt, XDt, (Gr = Te.current) == null ? void 0 : Gr.offsetHeight, {
            preferAbove: sa || T,
            boundaryRect: Ea
          });
        } finally {
          ve.current = !1;
        }
      }, [T]),
      Ut = g.useCallback(() => {
        const $n = gt();
        $n && J(yr => Math.abs(yr.left - $n.left) < .5 && Math.abs(yr.top - $n.top) < .5 ? yr : $n);
      }, [gt]),
      _t = g.useCallback(() => {
        const $n = gt();
        $n && (ke.current = !0, Da.flushSync(() => {
          J($n), X(null), re(""), ye(0), ce(!0), de(!0);
        }));
      }, [gt]),
      At = () => {
        if (!N.current || me.current > 0 || ve.current || W.current) return;
        zXt(N.current);
        const $n = N.current.getAttribute(See) === "1";
        $n && N.current.removeAttribute(See);
        let yr = Kk(N.current);
        if ($n) {
          const sa = parseInt(N.current.dataset.cursorPos || "", 10);
          Number.isNaN(sa) || (yr = sa);
        }
        const Ir = Ec(N.current);
        if ($n && vnt(N.current, Ir) && (Ht(Ir), cy(N.current, yr)), lt(), (h || []).length > 0 && yr > 0 && Ir[yr - 1] === "@" && a !== "gen-video" ? (q(!0), ae(yr), Ee(0)) : Q || q(!1), It) {
          const sa = r === "studio" && ke.current ? kXn(Ir, yr) : null;
          AXn(Ir, yr) ? (r === "studio" && re(""), ke.current || _t()) : sa ? (re(Ir.slice(sa.start + 1, sa.end)), Ut()) : ke.current && We();
        }
        if (Y.current = Ir, xe.current = yr, Me(Ir), !i.trim() && !!Ir.trim()) {
          L(!0), D.current && (clearTimeout(D.current), D.current = null), Op(Ir, i) || Ae.current(Ir);
          return;
        }
        if (!!i.trim() && !Ir.trim()) {
          D.current && (clearTimeout(D.current), D.current = null), Ae.current("");
          return;
        }
        D.current && clearTimeout(D.current), H.current = !0, D.current = setTimeout(() => {
          D.current = null, Op(Ir, K.current) ? H.current = !1 : Ae.current(Ir);
        }, 220);
      },
      Yt = $n => {
        $n.nativeEvent.isComposing || At();
      },
      qe = $n => {
        if (R || !He) {
          $n.preventDefault(), $n.stopPropagation();
          return;
        }
        $n.preventDefault();
        const yr = N.current;
        if (!yr || W.current) return;
        const Ir = $n.clipboardData.getData("text/plain"),
          Gr = Ir.trim();
        if (j && /^https?:\/\/\S+$/i.test(Gr)) {
          $n.stopPropagation(), Promise.resolve(j(Gr));
          return;
        }
        const Zr = Ir.replace(/\r\n/g, `
`).replace(/\r/g, `
`).replace(/\n{3,}/g, `

`).replace(/[ \t]+/g, " ").trim();
        D.current && (clearTimeout(D.current), D.current = null), U.current != null && (window.cancelAnimationFrame(U.current), U.current = null);
        const La = Ec(yr),
          sa = hW(yr),
          Ea = Rma(Zr);
        me.current += 1;
        let ba = La,
          ga = La.length;
        try {
          if (zXt(yr), Ea) {
            const $a = sa.start < 0 ? La.length : sa.start,
              Ya = sa.end < 0 ? La.length : sa.end;
            ba = La.slice(0, $a) + Zr + La.slice(Ya), ga = $a + Zr.length, Y.current = ba, Ht(ba), cy(yr, ga);
          } else {
            const $a = jma(yr, Zr, sa, La);
            ba = $a.nextText, ga = $a.cursor, Y.current = ba, (Zr.length >= 120 || Math.max(0, (sa.end < 0 ? 0 : sa.end) - (sa.start < 0 ? 0 : sa.start)) >= 120) && cy(yr, ga);
          }
          xe.current = ga, yr.dataset.cursorPos = String(ga);
        } finally {
          me.current = Math.max(0, me.current - 1);
        }
        !i.trim() && ba.trim() && L(!0), Me(ba);
        const _a = ba;
        H.current = !0, U.current = window.requestAnimationFrame(() => {
          U.current = window.requestAnimationFrame(() => {
            U.current = null, g.startTransition(() => {
              Op(_a, K.current) ? H.current = !1 : Ae.current(_a);
            });
          });
        });
      },
      kt = () => {
        W.current = !0, N.current && (Gw(N.current), xe.current = Kk(N.current));
      },
      St = g.useCallback(() => {
        if (!N.current || W.current) return;
        const $n = Ec(N.current),
          yr = hW(N.current);
        if (vnt(N.current, $n)) {
          Ht($n), BR(N.current, yr.start, yr.end);
          return;
        }
        if (fma(N.current, E)) {
          me.current += 1;
          try {
            gma(N.current, E, d), u_e(N.current, {
              restoreCursor: !1
            });
          } finally {
            me.current = Math.max(0, me.current - 1);
          }
          BR(N.current, yr.start, yr.end);
        }
      }, [Ht, E, d]);
    g.useEffect(() => {
      const $n = N.current;
      if (!$n) return;
      const yr = Gr => {
        const Zr = Gr.detail;
        if (typeof (Zr == null ? void 0 : Zr.text) == "string") {
          me.current += 1;
          try {
            Zr.pillUpgrade && $n.setAttribute(See, "1"), Y.current = Zr.text, Me(Zr.text), L(!0), Ht(Zr.text), $n.removeAttribute(See), $n.dataset.cursorPos = String(Zr.cursor), xe.current = Zr.cursor, cy($n, Zr.cursor);
          } finally {
            me.current = Math.max(0, me.current - 1);
          }
        }
      };
      $n.addEventListener(WX, yr);
      const Ir = () => {
        Ce();
      };
      return $n.addEventListener(h_e, Ir), () => {
        $n.removeEventListener(WX, yr), $n.removeEventListener(h_e, Ir);
      };
    }, [Ht, Ce]), g.useEffect(() => {
      var $n;
      !N.current || W.current || ge.current || ($n = N.current.closest(".node-wrapper")) != null && $n.classList.contains("node-dragging-self") || St();
    }, [E, I, St]), g.useEffect(() => {
      const $n = () => {
        ge.current && (ge.current = !1);
      };
      return window.addEventListener("mouseup", $n, !0), window.addEventListener("blur", $n), () => {
        window.removeEventListener("mouseup", $n, !0), window.removeEventListener("blur", $n);
      };
    }, []);
    const hn = g.useCallback($n => {
        if (!$n.isConnected) return;
        const yr = $n.getAttribute("data-ref-raw") || "",
          Ir = N.current,
          Gr = Ir ? Ec(Ir) : K.current,
          Zr = Ir ? SVn(Ir, $n) : null,
          La = ZYr(Gr, Zr ?? -1, yr);
        if (La !== Gr && (Y.current = La, H.current = !0, Me(La), Ae.current(La), Ir)) {
          me.current += 1;
          try {
            Ht(La);
          } finally {
            me.current = Math.max(0, me.current - 1);
          }
        }
      }, [Ht]),
      Qt = g.useCallback(() => {
        Xe.current = !1, ze.current = null, $e(null), N.current && (N.current.style.caretColor = "");
      }, []),
      Ot = g.useCallback($n => {
        const yr = N.current,
          Ir = ze.current;
        yr && (yr.focus({
          preventScroll: !0
        }), Ir && document.contains(Ir) && (bnt(yr, Ir), lt()), $n != null && $n.hideCaret && (yr.style.caretColor = "transparent"));
      }, [lt]),
      ln = g.useCallback($n => {
        if (!$n.isConnected || De.current.length === 0) return;
        const Ir = parseInt($n.getAttribute("data-ref-position") || "", 10) || v3($n.getAttribute("data-ref-raw") || "") || 0;
        if (!Number.isFinite(Ir) || Ir <= 0) return;
        if (ze.current === $n && Xe.current) {
          Qt();
          return;
        }
        const Gr = $n.getBoundingClientRect();
        Ke.current = !0, L(!0), ze.current = $n, Xe.current = !0, Ye.current = !0, $e({
          anchorRect: Gr,
          currentPosition1Based: Ir
        }), requestAnimationFrame(() => {
          document.contains($n) && Ot({
            hideCaret: !0
          });
        });
      }, [Qt, Ot]);
    g.useEffect(() => {
      const $n = N.current;
      if (!$n) return;
      const yr = Gr => {
          if (Gr.button !== 0) return;
          const Zr = Gr.target;
          if (!(Zr instanceof Element)) return;
          const La = Zr.closest("[data-ref-pill-close]");
          if (La && $n.contains(La)) {
            const Ea = La.closest("[data-prompt-ref]");
            if (!Ea || !$n.contains(Ea)) return;
            Gr.preventDefault(), Gr.stopPropagation(), he.current = null, ue.current = null, Ye.current = !1, hn(Ea);
            return;
          }
          const sa = Zr.closest("[data-prompt-ref]");
          !sa || !$n.contains(sa) || (Ye.current = !1, ue.current = {
            x: Gr.clientX,
            y: Gr.clientY,
            pill: sa
          });
        },
        Ir = Gr => {
          if (Gr.button !== 0) return;
          const Zr = ue.current;
          !Zr || !Zr.pill.isConnected || !$n.contains(Zr.pill) || Math.hypot(Gr.clientX - Zr.x, Gr.clientY - Zr.y) > 4 || De.current.length !== 0 && (Gr.stopPropagation(), ue.current = null, ln(Zr.pill));
        };
      return $n.addEventListener("pointerdown", yr, !0), $n.addEventListener("pointerup", Ir, !0), () => {
        $n.removeEventListener("pointerdown", yr, !0), $n.removeEventListener("pointerup", Ir, !0);
      };
    }, [hn, ln]);
    const Pn = g.useCallback($n => {
      const yr = ze.current,
        Ir = N.current;
      if (!yr || !Ir) return;
      const Gr = RF($n),
        Zr = yr.getAttribute("data-ref-raw") || "";
      if (v3(Zr) === $n) {
        Qt();
        return;
      }
      const sa = Pma(Ir, yr, Gr);
      if (!sa) {
        Qt();
        return;
      }
      Qt(), Y.current = sa.text, H.current = !0, Me(sa.text), Op(sa.text, K.current) || Ae.current(sa.text);
      const Ea = sa.cursor;
      me.current += 1;
      try {
        Ir.setAttribute(See, "1"), Ht(sa.text), Ir.removeAttribute(See), cy(Ir, Ea), Ir.dataset.cursorPos = String(Ea);
      } finally {
        me.current = Math.max(0, me.current - 1);
      }
      requestAnimationFrame(() => {
        Ir.focus({
          preventScroll: !0
        }), Ir.style.caretColor = "", cy(Ir, Ea), Ir.dataset.cursorPos = String(Ea);
      });
    }, [Qt, Ht]);
    g.useEffect(() => {
      if (!Re) return;
      const $n = () => {
        const yr = ze.current;
        if (!yr || !document.contains(yr)) {
          Qt();
          return;
        }
        $e(Ir => Ir ? {
          ...Ir,
          anchorRect: yr.getBoundingClientRect()
        } : null);
      };
      return window.addEventListener("scroll", $n, !0), window.addEventListener("resize", $n), () => {
        window.removeEventListener("scroll", $n, !0), window.removeEventListener("resize", $n);
      };
    }, [Re, Qt]), g.useEffect(() => {
      if (!Re) return;
      const $n = yr => {
        var La;
        const Ir = yr.target;
        if (!Ir || (La = ze.current) != null && La.contains(Ir) || bW(Ir)) return;
        const Gr = ze.current,
          Zr = N.current;
        Qt(), Gr && Zr && document.contains(Gr) && requestAnimationFrame(() => {
          Zr.focus({
            preventScroll: !0
          }), bnt(Zr, Gr), lt();
        });
      };
      return document.addEventListener("pointerdown", $n, !0), () => document.removeEventListener("pointerdown", $n, !0);
    }, [Re, Qt, lt]), g.useEffect(() => {
      if (!rt) return;
      const $n = yr => {
        const Ir = yr.target;
        Ir != null && Ir.closest("[data-smart-edit-protocol], [data-smart-edit-protocol-tip]") || nt(null);
      };
      return window.addEventListener("pointerdown", $n, !0), () => window.removeEventListener("pointerdown", $n, !0);
    }, [rt]);
    const rn = () => {
        W.current = !1, N.current && window.requestAnimationFrame(() => {
          !N.current || W.current || At();
        });
      },
      Yn = $n => {
        var yr;
        if (R) {
          $n.preventDefault(), $n.stopPropagation();
          return;
        }
        if (($n.ctrlKey || $n.metaKey) && $n.key.toLowerCase() === "a") {
          He || Da.flushSync(() => L(!0)), requestAnimationFrame(() => {
            N.current && Gw(N.current);
          });
          return;
        }
        if (!He) {
          $n.preventDefault(), $n.stopPropagation();
          return;
        }
        if (($n.metaKey || $n.ctrlKey) && $n.key === "Enter" && M) {
          $n.preventDefault(), M();
          return;
        }
        if (!(It && $n.key === "@")) {
          if (ne && $n.key === "Escape") {
            $n.preventDefault(), We();
            return;
          }
          if (ne && Ze.length > 0) {
            if ($n.key === "ArrowDown") {
              $n.preventDefault(), ye(Ir => (Ir + 1) % Ze.length);
              return;
            }
            if ($n.key === "ArrowUp") {
              $n.preventDefault(), ye(Ir => (Ir - 1 + Ze.length) % Ze.length);
              return;
            }
            if ($n.key === "Enter") {
              $n.preventDefault();
              const Ir = Ze[fe];
              Ir && vt(Ir);
              return;
            }
          }
          if (!Q && $n.key === "@" && h && h.length > 0 && e.startsWith("gen-video") && !It) {
            const Ir = parseInt(((yr = N.current) == null ? void 0 : yr.dataset.cursorPos) || "0", 10);
            q(!0), ae(Ir + 1), Ee(0);
            return;
          }
          if (Q) {
            if ($n.key === "Escape") {
              q(!1);
              return;
            }
            if (h && h.length > 0) {
              if ($n.key === "ArrowDown") {
                $n.preventDefault(), Ee(Ir => (Ir + 1) % h.length);
                return;
              }
              if ($n.key === "ArrowUp") {
                $n.preventDefault(), Ee(Ir => (Ir - 1 + h.length) % h.length);
                return;
              }
              if ($n.key === "Enter") {
                $n.preventDefault();
                const Ir = be < h.length ? be : 0;
                Ge(RF(Ir + 1), {
                  pillUpgrade: !0
                }), q(!1);
                return;
              }
            }
          }
        }
      },
      Ct = Fe.trim().length > 0;
    it.current = Ct;
    const Cn = Ct || He,
      [un, Jn] = g.useState(!1),
      [Kn, en] = g.useState(S0r),
      Vn = I0r(),
      Tt = g.useRef(null),
      Ue = g.useRef(!1),
      et = g.useRef(null),
      ft = g.useRef(0),
      ht = g.useRef([]),
      [wt, jt] = g.useState(!!b),
      bt = g.useRef(wt);
    bt.current = wt, g.useEffect(() => {
      et.current === null && jt(!!b);
    }, [b]);
    const Bt = g.useRef(v);
    g.useLayoutEffect(() => {
      Bt.current = v;
    }, [v]);
    const wn = !!v,
      at = g.useMemo(() => wn ? $n => {
        var yr;
        return (yr = Bt.current) == null ? void 0 : yr.call(Bt, $n);
      } : void 0, [wn]),
      Pt = g.useCallback($n => {
        et.current = null, at && !!b !== $n && g.startTransition(() => {
          at($n);
        });
      }, [at, b]),
      dt = Math.min(KEr, Kn),
      xt = _ ? H4e : A0r,
      yn = _ ? dt : Kn,
      gn = g.useCallback($n => {
        const yr = Tt.current;
        if (!yr) return;
        const Ir = $n ? yn : xt;
        yr.style.transition = "none", yr.style.clipPath = "", yr.style.transform = "", yr.style.height = `${Ir}px`, yr.style.overflow = "hidden", _ ? yr.style.maxHeight = "" : yr.style.maxHeight = `${Ir}px`;
      }, [xt, _, yn]);
    g.useLayoutEffect(() => {
      Ue.current || gn(wt);
    }, [gn, wt]), g.useEffect(() => () => {
      ft.current += 1, afn(ht.current), ht.current = [];
    }, []);
    const mt = g.useCallback(() => {
      const $n = G.current;
      $n && en(pso($n));
    }, []);
    g.useLayoutEffect(() => {
      if (!wt || Vn || Ue.current) return;
      mt();
      const $n = () => mt();
      window.addEventListener("resize", $n);
      const yr = window.requestAnimationFrame(() => mt());
      return () => {
        window.removeEventListener("resize", $n), window.cancelAnimationFrame(yr);
      };
    }, [wt, k, mt, Vn]), g.useEffect(() => {
      const $n = G.current,
        yr = N.current;
      if (!$n || !yr) return;
      const Ir = () => {
          if (Ue.current) return;
          const $a = $n.clientHeight;
          if (!Number.isFinite($a) || $a <= 1) {
            Jn(!1);
            return;
          }
          const Ya = Math.max($n.scrollHeight, yr.scrollHeight) - $a;
          Jn(ta => ta ? Ya > 1 : Ya > 6);
        },
        Gr = _ ? 160 : 0;
      let Zr = !_,
        La = null;
      const sa = () => {
          !Zr || La !== null || Ue.current || (La = window.requestAnimationFrame(() => {
            La = null, Ir();
          }));
        },
        Ea = window.setTimeout(() => {
          Zr = !0, sa();
        }, Gr);
      sa();
      const ba = window.setTimeout(sa, Gr + 80),
        ga = typeof ResizeObserver < "u" ? new ResizeObserver(sa) : null;
      ga && (ga.observe(yr), ga.observe($n));
      const _a = sa;
      return yr.addEventListener("input", _a), () => {
        window.clearTimeout(Ea), La !== null && window.cancelAnimationFrame(La), window.clearTimeout(ba), ga && ga.disconnect(), yr.removeEventListener("input", _a);
      };
    }, [wt, _, k]), g.useEffect(() => {
      const $n = G.current;
      if (!$n) return;
      const yr = Ir => {
        Ir.stopPropagation(), Ir.preventDefault(), $n.scrollTop += Ir.deltaY;
      };
      return $n.addEventListener("wheel", yr, {
        passive: !1,
        capture: !0
      }), () => {
        $n.removeEventListener("wheel", yr, {
          capture: !0
        });
      };
    }, []);
    const Xt = g.useCallback(() => {
      typeof window > "u" || (window.scrollTo(0, 0), document.documentElement.scrollTop = 0, document.body.scrollTop = 0);
    }, []);
    g.useEffect(() => {
      const $n = N.current;
      if (!$n) return;
      const yr = Ir => {
        it.current || Ve.current || Ir.preventDefault();
      };
      return $n.addEventListener("selectstart", yr), () => $n.removeEventListener("selectstart", yr);
    }, []);
    const Gn = g.useCallback($n => {
      var sa;
      const yr = window.getSelection();
      if (!yr || yr.rangeCount === 0 || yr.isCollapsed) return;
      const Ir = yr.getRangeAt(0);
      if (!((sa = N.current) != null && sa.contains(Ir.commonAncestorContainer))) return;
      const Gr = Ir.cloneContents(),
        Zr = document.createElement("div");
      Zr.appendChild(Gr);
      const La = Ec(Zr);
      La && ($n.clipboardData.setData("text/plain", La), $n.preventDefault());
    }, []);
    g.useEffect(() => {
      if (!ne) return;
      const $n = yr => {
        var Gr, Zr;
        const Ir = yr.target;
        !Ir || !(Ir instanceof Element) || bW(Ir) || (Gr = Te.current) != null && Gr.contains(Ir) || (Zr = G.current) != null && Zr.contains(Ir) || We();
      };
      return window.addEventListener("pointerdown", $n, !0), () => window.removeEventListener("pointerdown", $n, !0);
    }, [ne, We]), g.useLayoutEffect(() => {
      if (!ne || !T) return;
      Ut();
      const $n = Te.current;
      if (!$n || typeof ResizeObserver > "u") return;
      const yr = new ResizeObserver(Ut);
      return yr.observe($n), N.current && yr.observe(N.current), () => yr.disconnect();
    }, [ne, T, Ut]), g.useEffect(() => {
      if (!ne) return;
      const $n = () => {
        Ne.current || (Ne.current = setTimeout(() => {
          Ne.current = null, Ut();
        }, 150));
      };
      return window.addEventListener("resize", $n, {
        passive: !0
      }), window.addEventListener("scroll", $n, {
        passive: !0,
        capture: !0
      }), () => {
        window.removeEventListener("resize", $n), window.removeEventListener("scroll", $n, !0), Ne.current && (clearTimeout(Ne.current), Ne.current = null);
      };
    }, [ne, Ut]), g.useEffect(() => {
      ke.current && Ut();
    }, [k, Ut]);
    const rr = _Ut,
      qn = _ ? "relative flex w-full min-w-0 shrink-0 flex-col" : k0r,
      Dn = cZe,
      Ar = g.useCallback(($n, yr) => {
        if (ft.current !== yr) return;
        const Ir = G.current;
        Ir && (Ir.style.overflow = ""), Ue.current = !1, bt.current = $n, gn($n), jt($n), Pt($n), $n && mt();
      }, [gn, mt, Pt]),
      _r = g.useCallback(() => {
        if (!at || Ue.current) return;
        const $n = !bt.current;
        if (et.current = $n, Vn) {
          Ar($n, ++ft.current);
          return;
        }
        const yr = Tt.current;
        if (!yr || typeof yr.animate != "function") {
          Ar($n, ++ft.current);
          return;
        }
        const Ir = bt.current ? yn : xt,
          Gr = $n ? yn : xt;
        if (Math.abs(Gr - Ir) < 1) {
          Ar($n, ++ft.current);
          return;
        }
        const La = ++ft.current;
        Ue.current = !0, afn(ht.current), ht.current = [];
        const sa = G.current;
        sa && (sa.style.overflow = "hidden"), yr.style.transition = "none", yr.style.clipPath = "", yr.style.overflow = "hidden", yr.style.height = `${Ir}px`, _ || (yr.style.maxHeight = `${Math.max(Ir, Gr)}px`);
        const {
          animations: Ea,
          finished: ba
        } = wso(yr, Ir, Gr);
        ht.current = Ea, ba.then(() => {
          Ar($n, La);
        });
      }, [xt, _, yn, Ar, Vn, at]),
      Pa = (C || un || wt) && at,
      fa = g.useMemo(() => Pa ? c.jsx(kUt, {
        expanded: wt,
        isDark: d,
        onToggle: _r
      }) : null, [Pa, wt, d, _r]);
    g.useEffect(() => {
      if (S) {
        if (!A) {
          S(null);
          return;
        }
        Ue.current || S(fa);
      }
    }, [A, fa, S, wt]);
    const Ca = !A && fa;
    return c.jsxs("div", {
      ref: Tt,
      "data-prompt-shell": "true",
      className: wt ? qn : rr,
      style: {
        overflow: "hidden",
        contain: "layout style paint"
      },
      children: [Ca ? c.jsx("div", {
        className: "flex h-7 shrink-0 items-center justify-end pr-0.5",
        children: fa
      }) : null, c.jsxs("div", {
        ref: G,
        "data-scrollable": "true",
        className: Dn,
        style: {
          overscrollBehavior: "contain"
        },
        children: [c.jsx("div", {
          ref: $n => {
            N.current = $n, typeof P == "function" ? P($n) : P && (P.current = $n);
          },
          "data-node-type": "gen-node",
          "data-node-id": e,
          "data-has-overflow": un ? "true" : "false",
          "data-prompt-editor-area": "true",
          role: t ? "textbox" : void 0,
          "aria-label": t,
          "aria-multiline": t ? !0 : void 0,
          contentEditable: !R,
          onInput: Yt,
          onKeyDown: Yn,
          onPaste: qe,
          onCopy: Gn,
          onKeyUp: lt,
          onMouseUp: lt,
          onMouseDownCapture: $n => {
            var Zr, La, sa, Ea;
            if (R) {
              $n.preventDefault(), $n.stopPropagation();
              return;
            }
            const yr = $n.target,
              Ir = yr.closest("[data-ref-pill-close]");
            if (Ir) {
              $n.preventDefault(), $n.stopPropagation(), he.current = null, ue.current = null;
              const ba = Ir.closest("[data-prompt-ref]");
              ba && ((Zr = N.current) != null && Zr.contains(ba)) && hn(ba);
              return;
            }
            if (yr.closest("button") || $n.button !== 0) return;
            $n.stopPropagation(), Xt(), Ve.current = !0, ge.current = !0, N.current && (N.current.style.webkitUserModify = "read-write-plaintext-only", N.current.style.caretColor = "");
            const Gr = yr.closest("[data-prompt-ref], [data-magic-item], [data-smart-edit-protocol]");
            if (Gr != null && Gr.hasAttribute("data-smart-edit-protocol") && ((La = N.current) != null && La.contains(Gr))) {
              $n.preventDefault();
              const ba = Gr.getBoundingClientRect(),
                ga = Gr.getAttribute("data-smart-edit-raw") || "";
              nt({
                raw: ga,
                left: ba.left,
                bottom: window.innerHeight - ba.top + 8
              }), he.current = null, ue.current = null;
              return;
            }
            if (Gr != null && Gr.hasAttribute("data-prompt-ref") && ((sa = N.current) != null && sa.contains(Gr))) {
              he.current = null, ue.current = {
                x: $n.clientX,
                y: $n.clientY,
                pill: Gr
              }, He || L(!0);
              return;
            }
            if (Gr && ((Ea = N.current) != null && Ea.contains(Gr))) {
              he.current = null, ue.current = null, He || L(!0);
              return;
            }
            ue.current = null, he.current = {
              clientX: $n.clientX,
              clientY: $n.clientY
            }, He || L(!0);
          },
          onClick: $n => {
            const yr = $n.clientX,
              Ir = $n.clientY;
            lt(), window.requestAnimationFrame(() => {
              if (!N.current || !Ve.current) return;
              if (Xe.current) {
                Ot({
                  hideCaret: !0
                }), he.current = null, ue.current = null;
                return;
              }
              const Gr = N.current,
                Zr = window.getSelection();
              if (!!Zr && !Zr.isCollapsed && Zr.rangeCount > 0 && !!Zr.getRangeAt(0).commonAncestorContainer && Gr.contains(Zr.getRangeAt(0).commonAncestorContainer)) {
                Gw(Gr), he.current = null, ue.current = null;
                return;
              }
              const sa = ue.current;
              if (ue.current = null, sa && sa.pill.isConnected && Gr.contains(sa.pill) && !(Math.hypot(yr - sa.x, Ir - sa.y) > 4)) {
                if (Ye.current) {
                  Ye.current = !1;
                  return;
                }
                if (De.current.length > 0) {
                  ln(sa.pill);
                  return;
                }
                bnt(Gr, sa.pill), lt();
                return;
              }
              const Ea = hW(Gr),
                ba = Ec(Gr).length,
                ga = Ea.start >= 0 && Ea.start === Ea.end && (Ea.start < ba || !he.current);
              if (jpa(Gr), ga && Ea.start < ba) {
                BR(Gr, Ea.start, Ea.end), Gw(Gr), he.current = null;
                return;
              }
              const _a = he.current;
              _a ? (Jcn(Gr, _a.clientX, _a.clientY) && Gw(Gr), he.current = null) : ga && (BR(Gr, Ea.start, Ea.end), Gw(Gr));
            });
          },
          onDoubleClick: $n => {
            $n.stopPropagation(), $n.nativeEvent.__handledByContent = !0, Xt(), he.current = {
              clientX: $n.clientX,
              clientY: $n.clientY
            }, He || Da.flushSync(() => L(!0));
          },
          onCompositionStart: kt,
          onCompositionEnd: rn,
          onFocus: () => {
            if (V(!0), Xt(), N.current) {
              try {
                document.execCommand("defaultParagraphSeparator", !1, "br");
              } catch {}
              const $n = N.current,
                yr = hW($n),
                Ir = Ec($n).length;
              gnt($n);
              const Gr = he.current;
              Gr ? (!Jcn($n, Gr.clientX, Gr.clientY) && yr.start >= 0 && yr.start === yr.end && yr.start < Ir && BR($n, yr.start, yr.end), Gw($n)) : yr.start >= 0 && yr.end >= 0 && (BR($n, yr.start, yr.end), Gw($n));
            }
          },
          onBlur: $n => {
            if (lt(), Ce(), V(!1), Ke.current) {
              Ke.current = !1, requestAnimationFrame(() => {
                Ot({
                  hideCaret: !0
                });
              });
              return;
            }
            if (_e.current) {
              _e.current = !1, requestAnimationFrame(() => {
                var Ir;
                (Ir = N.current) == null || Ir.focus({
                  preventScroll: !0
                });
              });
              return;
            }
            const yr = $n.relatedTarget;
            yr instanceof Element && bW(yr) || (he.current = null, window.setTimeout(() => {
              bW(document.activeElement) || Xe.current || ke.current || (y || L(!1), q(!1), We(), Qt(), lt(), Ce(), N.current && St());
            }, 0));
          },
          className: `relative w-full min-h-full resize-none outline-none p-2 bg-transparent overflow-x-hidden overflow-y-hidden ${_ ? "text-sm leading-6" : "text-lg leading-relaxed"} ${d ? "text-zinc-200" : "text-zinc-800"} ${R ? "opacity-60 cursor-not-allowed" : ""}`,
          style: {
            overflowWrap: "break-word",
            wordWrap: "break-word",
            wordBreak: "normal",
            whiteSpace: "pre-wrap",
            lineHeight: _ ? "24px" : 1.5,
            fontFamily: "inherit",
            letterSpacing: "normal",
            cursor: Cn ? "text" : "grab",
            userSelect: Cn ? "text" : "none",
            WebkitUserSelect: Cn ? "text" : "none",
            caretColor: Re || !He ? "transparent" : void 0,
            WebkitUserModify: Cn ? "read-write-plaintext-only" : void 0
          },
          suppressContentEditableWarning: !0
        }), (!Ct && !He || F && !Ct) && c.jsx("div", {
          className: `absolute inset-0 p-2 pointer-events-none z-[1] ${_ ? "text-sm leading-6" : "text-lg"} ${d ? "text-zinc-500" : "text-zinc-400"} ${F ? "voice-input-breathing" : ""}`,
          style: {
            lineHeight: _ ? "24px" : 1.5,
            height: "100%"
          },
          children: F ? B.status === "recording" ? x("正在听…") : x("正在识别你的想法…") : l
        }), F && Ct ? c.jsx("div", {
          className: `voice-input-breathing pointer-events-none absolute right-2 top-1 z-[2] text-[11px] ${d ? "text-zinc-400" : "text-zinc-500"}`,
          children: B.status === "recording" ? x("正在听…") : x("正在识别你的想法…")
        }) : null, ne && pe && It && Da.createPortal(c.jsx(_Xn, {
          isDark: d,
          position: le,
          searchQuery: Z,
          onSearchQueryChange: re,
          connectedNodes: E,
          referenceSectionLabel: n,
          variant: r,
          onSelectConnectedSlot: Oe,
          folderCategories: Ft,
          assetItems: p || [],
          categoryView: we,
          onCategoryViewChange: X,
          onSelectAsset: st,
          activeNavIndex: fe,
          dropdownRef: Te,
          onPointerDownCapture: $n => {
            $n.stopPropagation(), _e.current = !0;
          },
          onMouseDown: $n => {
            $n.stopPropagation();
          }
        }), document.body), Q && h && h.length > 0 && c.jsx("div", {
          className: `absolute left-0 right-0 bottom-full mb-1 rounded-lg border shadow-xl overflow-hidden z-[100] max-h-48 overflow-y-auto ${d ? "bg-zinc-800 border-zinc-600" : "bg-white border-zinc-200"}`,
          onMouseDown: $n => $n.preventDefault(),
          children: h.map(($n, yr) => {
            const Ir = gKe($n.type, yr + 1),
              Gr = RF(yr + 1);
            return c.jsxs("button", {
              type: "button",
              className: `w-full flex items-center gap-2 px-3 py-2 text-left text-sm ${yr === be ? d ? "bg-zinc-700 text-zinc-50" : "bg-zinc-100 text-zinc-900" : d ? "hover:bg-zinc-700 text-zinc-200" : "hover:bg-zinc-100 text-zinc-800"}`,
              onClick: () => {
                Ge(Gr, {
                  pillUpgrade: !0,
                  replaceAdjacentRef: !0
                }), q(!1);
              },
              children: [$n.type === "image" && $n.url && c.jsx("img", {
                src: $n.url,
                alt: "",
                className: "w-10 h-10 rounded object-cover shrink-0"
              }), $n.type === "video" && c.jsx("div", {
                className: `w-10 h-10 rounded shrink-0 flex items-center justify-center ${d ? "bg-zinc-700" : "bg-zinc-200"}`,
                children: c.jsx(Oo, {
                  size: 18,
                  className: d ? "text-zinc-400" : "text-zinc-500"
                })
              }), $n.type === "audio" && c.jsx("div", {
                className: `w-10 h-10 rounded shrink-0 flex items-center justify-center ${d ? "bg-zinc-700" : "bg-zinc-200"}`,
                children: c.jsx(Qh, {
                  size: 18,
                  className: d ? "text-green-400" : "text-green-600"
                })
              }), c.jsx("span", {
                className: "truncate",
                children: Ir
              }), c.jsx("span", {
                className: `shrink-0 text-[10px] ${d ? "text-zinc-500" : "text-zinc-400"}`,
                children: Gr
              })]
            }, $n.id);
          })
        })]
      }), Re && E.length > 0 ? Da.createPortal(c.jsx(fso, {
        isDark: d,
        anchorRect: Re.anchorRect,
        items: E,
        currentPosition1Based: Re.currentPosition1Based,
        onSelectSlot: Pn,
        popoverRef: Le,
        onPointerDownCapture: () => {
          Ke.current = !0;
        },
        onPointerDown: $n => {
          $n.stopPropagation();
        },
        onMouseDown: $n => {
          $n.stopPropagation();
        }
      }), document.body) : null, rt ? Da.createPortal(c.jsxs("button", {
        type: "button",
        "data-smart-edit-protocol-tip": !0,
        className: "fixed z-[10140] max-w-[320px] rounded-xl bg-[#202022] px-3 py-2 text-left text-[12px] text-white shadow-[0_8px_28px_rgba(0,0,0,.35)]",
        style: {
          left: rt.left,
          bottom: rt.bottom
        },
        onClick: () => nt(null),
        children: [c.jsx("div", {
          className: "mb-1 text-[10px] text-white/45",
          children: x("提示词")
        }), c.jsx("div", {
          className: "break-all font-mono leading-5",
          children: rt.raw
        })]
      }), document.body) : null, c.jsx(gso, {
        editorRef: N,
        references: E,
        suspended: Vn || !!Re
      })]
    });
  };

function xso({
  editorRef: e,
  references: t
}) {
  on();
  const [n, r] = g.useState(null);
  if (g.useEffect(() => {
    const h = e.current;
    if (!h) return;
    let p = null;
    const m = () => {
        p = null, r(null);
      },
      f = b => {
        const v = b.target instanceof Element ? b.target.closest("[data-prompt-ref]") : null;
        if (!v || v === p) return;
        const _ = t.find(k => k.position1Based === Number(v.getAttribute("data-ref-position")));
        if (!_) return;
        p = v;
        const w = v.getBoundingClientRect();
        r({
          item: _,
          left: w.left + w.width / 2,
          top: w.top - 6
        });
      },
      y = b => {
        (!(b.relatedTarget instanceof Node) || !(p != null && p.contains(b.relatedTarget))) && m();
      };
    return m(), h.addEventListener("pointerover", f), h.addEventListener("pointerout", y), h.addEventListener("pointerdown", m), h.addEventListener("keydown", m), window.addEventListener("scroll", m, !0), window.addEventListener("resize", m), window.addEventListener("blur", m), () => {
      h.removeEventListener("pointerover", f), h.removeEventListener("pointerout", y), h.removeEventListener("pointerdown", m), h.removeEventListener("keydown", m), window.removeEventListener("scroll", m, !0), window.removeEventListener("resize", m), window.removeEventListener("blur", m);
    };
  }, [e, t]), !n) return null;
  const {
      item: a,
      left: i,
      top: o
    } = n,
    s = Ahe(a.mediaType || "image", a.position1Based, a.displayLabel || a.nodeName),
    l = `@${s}`,
    d = a.mediaType === "video" ? Oo : a.mediaType === "audio" ? Qh : lo,
    u = a.thumbSrc && dx(a.thumbSrc, a.mediaType) ? a.thumbSrc : "";
  return Da.createPortal(c.jsx("div", {
    className: "pointer-events-none fixed z-[10420]",
    role: "tooltip",
    "aria-label": x("参考素材：{0}", l),
    style: {
      left: i,
      top: o,
      transform: "translate(-50%, -100%)"
    },
    children: c.jsxs("div", {
      className: "relative h-[100px] overflow-hidden rounded-[12px] bg-black shadow-[0px_8px_24px_rgba(0,0,0,0.5)]",
      children: [u ? c.jsx("img", {
        src: u,
        alt: s,
        className: "block h-[100px] w-auto object-cover",
        onError: h => {
          h.currentTarget.hidden = !0;
        }
      }) : c.jsx("div", {
        className: "flex h-[100px] w-[100px] items-center justify-center text-white/45",
        children: c.jsx(d, {
          size: 28,
          "aria-hidden": !0
        })
      }), c.jsx("div", {
        className: "absolute inset-x-0 bottom-0 flex h-[40px] items-end justify-center bg-gradient-to-t from-black/60 to-transparent px-2 pb-[6px]",
        children: c.jsx("span", {
          className: "truncate text-[12px] font-medium leading-[20px] text-white/[0.88]",
          children: l
        })
      })]
    })
  }), document.body);
}

function _so({
  draft: e,
  nodes: t,
  editorRef: n,
  onChange: r,
  onSubmit: a,
  isDark: i
}) {
  on();
  const o = g.useMemo(() => e.references.flatMap(u => {
      const h = t.find(y => y.id === u.nodeId);
      if (!h) return [];
      const p = Cy(h)[0],
        m = oS(h),
        f = m === "video" ? p == null ? void 0 : p.videoPosterUrl : m === "image" ? (p == null ? void 0 : p.thumbnailUrl) || (p == null ? void 0 : p.content) : "";
      return [{
        position1Based: u.label,
        mediaType: m,
        nodeName: h.nodeName || `${m === "image" ? "图片" : m === "video" ? "视频" : "音频"}${u.label}`,
        thumbSrc: f && fu(f) ? f : "",
        assetId: p == null ? void 0 : p.assetId
      }];
    }), [e.references, t]),
    [s, l] = g.useState({});
  g.useEffect(() => {
    let u = !0;
    const h = [],
      p = [...new Set(o.filter(m => m.mediaType === "image").map(m => m.assetId).filter(m => !!m))];
    return Promise.all(p.map(async m => {
      const f = await vIt(m, {
        allowOriginalAsDisplay: !0
      }).catch(() => null);
      return f ? u ? (h.push(f.release), [m, f.displayUrl]) : (f.release(), [m, ""]) : [m, ""];
    })).then(m => {
      u && l(Object.fromEntries(m));
    }), () => {
      u = !1, h.forEach(m => m());
    };
  }, [o]);
  const d = g.useMemo(() => o.map(({
    assetId: u,
    ...h
  }) => ({
    ...h,
    displayLabel: h.nodeName,
    thumbSrc: u && s[u] || h.thumbSrc
  })), [o, s]);
  return c.jsxs("div", {
    className: "sg-rich-prompt",
    onKeyDownCapture: u => {
      u.nativeEvent.isComposing && u.key === "Enter" && (u.ctrlKey || u.metaKey) && u.stopPropagation();
    },
    children: [c.jsx(cEe, {
      nodeId: "studio-generation-prompt",
      nodeType: `gen-${e.kind}`,
      value: e.prompt,
      onChange: r,
      placeholder: e.kind === "music" ? e.lyricMode === "custom" ? x("输入歌词。未填标题时会用第一行作为标题…") : e.lyricMode === "instrumental" ? x("描述纯音乐，例如轻快的夏日城市流行乐…") : x("描述风格、情绪和乐器，例如温暖的钢琴与轻柔弦乐…") : e.kind === "3d" ? x("描述要生成的物体，或添加一张参考图…") : e.kind === "image" ? x("描述画面，输入 @ 引用图片，或直接拖入参考素材…") : x("描述镜头与动作，输入 @ 引用参考素材…"),
      isDark: i,
      editorRef: n,
      editorLabel: x("创作提示词"),
      atMentionVariant: "studio",
      atMentionPreferAbove: !0,
      promptReferenceItems: d,
      compactFloatingPromptPanel: !0,
      expandControlOnReferenceStrip: !0,
      onCmdEnterSubmit: a
    }), c.jsx(xso, {
      editorRef: n,
      references: d
    })]
  });
}

function ofn({
  value: e
}) {
  on();
  const t = e.match(/^(\d+(?:\.\d+)?)\s*[:x×]\s*(\d+(?:\.\d+)?)$/i),
    n = t ? Number(t[1]) / Number(t[2]) : 1;
  return c.jsx("span", {
    className: "sg-ratio-icon",
    "aria-hidden": "true",
    children: c.jsx("i", {
      style: {
        width: `${Math.max(4, Math.min(18, 18 * n))}px`,
        height: `${Math.max(4, Math.min(18, 18 / n))}px`
      }
    })
  });
}

function E0r({
  draft: e,
  model: t,
  activeDropdown: n,
  setActiveDropdown: r,
  onChange: a,
  scopeId: i = "studio-generation",
  options: o,
  counts: s = [1, 2, 4],
  isDark: l = !0
}) {
  var A;
  on();
  const d = g.useRef(null),
    u = g.useRef(null),
    h = (n == null ? void 0 : n.nodeId) === i && n.type === "parameters",
    p = o ?? (t ? iG(t) : {
      ratios: [],
      resolutions: [],
      durations: [],
      modes: []
    }),
    m = p.modes || [],
    f = p9t({
      videoMode: e.videoMode || "",
      references: e.references || []
    }, m),
    y = f === "regeneration",
    b = `${i}-parameters`;
  g.useEffect(() => {
    var I, E;
    if (!h) return;
    const S = M => {
        var T, P;
        !((T = d.current) != null && T.contains(M.target)) && !((P = u.current) != null && P.contains(M.target)) && r(null);
      },
      C = M => {
        var T;
        M.key === "Escape" && (r(null), (T = d.current) == null || T.focus());
      };
    return window.addEventListener("pointerdown", S, !0), window.addEventListener("keydown", C), (E = (I = u.current) == null ? void 0 : I.querySelector('button[aria-pressed="true"]')) == null || E.focus(), () => {
      window.removeEventListener("pointerdown", S, !0), window.removeEventListener("keydown", C);
    };
  }, [h, r]);
  const v = g.useRef(null),
    _ = e.kind === "video" && p.durations.length > 8;
  g.useEffect(() => {
    const S = v.current;
    if (!h || !S) return;
    const C = () => {
      const M = S.querySelector('[aria-pressed="true"]');
      M && S.clientWidth && (S.scrollLeft = Math.max(0, M.offsetLeft - (S.clientWidth - M.offsetWidth) / 2));
    };
    C();
    const I = requestAnimationFrame(C),
      E = M => {
        if (S.scrollWidth <= S.clientWidth) return;
        const T = Math.abs(M.deltaY) >= Math.abs(M.deltaX) ? M.deltaY : M.deltaX;
        T && (M.preventDefault(), S.scrollLeft += T);
      };
    return S.addEventListener("wheel", E, {
      passive: !1
    }), () => {
      cancelAnimationFrame(I), S.removeEventListener("wheel", E);
    };
  }, [h, e.duration, _]);
  const w = S => /^(auto|自适应)$/i.test(S) ? "自动" : S,
    k = (S, C, I) => C.length > 0 && c.jsxs("fieldset", {
      children: [c.jsx("legend", {
        children: I
      }), c.jsx("div", {
        ref: S === "duration" && _ ? v : void 0,
        className: `sg-param-options${S === "duration" && _ ? " is-scroll" : ""}`,
        children: C.map(E => c.jsx("button", {
          type: "button",
          "aria-label": `${I} ${w(E)}`,
          "aria-pressed": e[S] === E,
          onClick: () => a({
            [S]: E
          }),
          children: w(E)
        }, E))
      })]
    });
  return c.jsxs(c.Fragment, {
    children: [c.jsxs("button", {
      ref: d,
      type: "button",
      className: "sg-parameter-summary",
      "aria-label": x("生成参数"),
      "aria-haspopup": "dialog",
      "aria-expanded": h,
      "aria-controls": h ? b : void 0,
      disabled: !t,
      onClick: () => r(h ? null : {
        nodeId: i,
        type: "parameters"
      }),
      children: [e.kind === "video" && m.length > 0 && c.jsx("span", {
        children: (A = m.find(S => S.value === f)) == null ? void 0 : A.label
      }), !y && p.ratios.length ? c.jsxs(c.Fragment, {
        children: [e.kind === "video" && m.length > 0 && c.jsx("b", {
          children: "·"
        }), c.jsx(ofn, {
          value: e.ratio
        }), c.jsx("span", {
          children: w(e.ratio)
        })]
      }) : !m.length && c.jsx(by, {
        size: 13
      }), !y && !!p.resolutions.length && c.jsxs(c.Fragment, {
        children: [c.jsx("b", {
          children: "·"
        }), c.jsx("span", {
          children: w(e.resolution)
        })]
      }), !y && e.kind === "video" && !!p.durations.length && c.jsxs(c.Fragment, {
        children: [c.jsx("b", {
          children: "·"
        }), c.jsx(ORr, {
          size: 12
        }), c.jsx("span", {
          children: w(e.duration)
        })]
      }), c.jsx("b", {
        children: "·"
      }), c.jsxs("span", {
        children: [e.count, x(" 个")]
      }), c.jsx(Mi, {
        size: 12
      })]
    }), c.jsx(yg, {
      open: h,
      anchorRef: d,
      isDark: l,
      placement: "above",
      gap: 10,
      minWidth: 0,
      className: "sg-popup sg-parameter-menu",
      children: c.jsxs("div", {
        ref: u,
        id: b,
        role: "dialog",
        "aria-label": x("生成参数设置"),
        children: [e.kind === "video" && m.length > 0 && c.jsxs("fieldset", {
          children: [c.jsx("legend", {
            children: x("生成方式")
          }), c.jsx("div", {
            className: `sg-param-options${m.length >= 4 && m.some(S => [...S.label].length >= 6) ? " is-grid" : m.length >= 4 ? " is-compact" : ""}`,
            children: m.map(S => c.jsx("button", {
              type: "button",
              "aria-label": x("生成方式 {0}", S.label),
              "aria-pressed": f === S.value,
              onClick: () => a({
                videoMode: S.value
              }),
              children: S.label
            }, S.value))
          })]
        }), !y && !!p.ratios.length && c.jsxs("fieldset", {
          children: [c.jsx("legend", {
            children: e.kind === "video" ? x("比例") : x("选择比例")
          }), c.jsx("div", {
            className: "sg-ratio-options",
            children: p.ratios.map(S => c.jsxs("button", {
              type: "button",
              "aria-label": x("比例 {0}", w(S)),
              "aria-pressed": e.ratio === S,
              onClick: () => a({
                ratio: S
              }),
              children: [c.jsx(ofn, {
                value: S
              }), c.jsx("span", {
                children: w(S)
              })]
            }, S))
          })]
        }), !y && k("resolution", p.resolutions, e.kind === "video" ? "清晰度" : "分辨率"), !y && e.kind === "video" && k("duration", p.durations, "生成时长"), c.jsxs("fieldset", {
          children: [c.jsx("legend", {
            children: x("生成数量")
          }), c.jsx("div", {
            className: "sg-param-options",
            children: s.map(S => c.jsx("button", {
              type: "button",
              "aria-label": x("生成 {0} 个作品", S),
              "aria-pressed": e.count === S,
              onClick: () => a({
                count: S
              }),
              children: S
            }, S))
          })]
        })]
      })
    })]
  });
}

const kso = [30, 60, 120, 180];

function Aso({
  draft: e,
  model: t,
  models: n,
  activeDropdown: r,
  setActiveDropdown: a,
  onChange: i,
  onSelectModel: o,
  isDark: s
}) {
  if (on(), !t || e.kind !== "music" && e.kind !== "3d") return null;
  const l = (m, f, y, b, v) => c.jsx(qs, {
    scopeId: "studio-generation",
    dropdownType: m,
    value: f,
    options: y,
    isDark: s,
    activeDropdown: r,
    setActiveDropdown: a,
    onSelect: b,
    ariaLabel: v,
    menuPlacement: "above",
    buttonVariant: "bare",
    menuClassName: "sg-popup",
    maxMenuHeight: 280,
    className: "sg-kind-picker"
  });
  if (e.kind === "3d") {
    const m = n9t(t.id) ? NKe({
        currentModel: t.id,
        apiConfigs: n
      }).filter(b => b.id === t.id || n.some(v => v.id === b.id)) : [],
      f = PKe(t.id),
      y = RKe(t.id);
    return !m.length && !f && !y ? null : c.jsxs("div", {
      className: "sg-kind-controls",
      role: "group",
      "aria-label": x("3D 生成参数"),
      children: [m.length > 1 && l("3d-variant", t.id, m.map(b => ({
        value: b.id,
        label: b.label
      })), b => {
        const v = n.find(_ => _.id === b);
        v && o(v);
      }, "混元档位"), f && l("3d-material", e.threeDMaterial, rve.map(b => ({
        value: b.id,
        label: b.label
      })), b => i({
        threeDMaterial: b
      }), "材质"), y && l("3d-input", e.threeDInputImageType, ave.map(b => ({
        value: b.id,
        label: b.label
      })), b => i({
        threeDInputImageType: b
      }), "输入图类型")]
    });
  }
  const d = Ugt(t.id),
    u = Cgt.filter(m => !Vk(t.id) || m.id !== "custom"),
    h = e.musicStyleCustom ? "__custom__" : e.musicTags,
    p = [{
      value: "",
      label: "请选择风格"
    }, ...ZKt.map(m => ({
      value: m.value,
      label: m.label
    })), {
      value: "__custom__",
      label: "自定义"
    }];
  return c.jsxs("div", {
    className: "sg-kind-controls",
    role: "group",
    "aria-label": x("音乐生成参数"),
    children: [l("music-lyric", e.lyricMode, u.map(m => ({
      value: m.id,
      label: m.label
    })), m => i({
      lyricMode: m
    }), "歌词模式"), !d && e.lyricMode !== "auto" && l("music-style", h, p, m => {
      i(m === "__custom__" ? {
        musicStyleCustom: !0,
        musicTags: ZKt.some(f => f.value === e.musicTags) ? "" : e.musicTags
      } : {
        musicStyleCustom: !1,
        musicTags: m
      });
    }, "音乐风格"), !d && e.lyricMode !== "auto" && e.musicStyleCustom && c.jsx("input", {
      className: "sg-kind-input",
      "aria-label": x("自定义风格"),
      placeholder: x("例如 pop, electronic"),
      value: e.musicTags,
      onChange: m => i({
        musicTags: m.target.value,
        musicStyleCustom: !0
      })
    }), !d && e.lyricMode !== "auto" && c.jsx("input", {
      className: "sg-kind-input",
      "aria-label": x("音乐标题"),
      placeholder: x("标题（可选）"),
      value: e.musicTitle,
      onChange: m => i({
        musicTitle: m.target.value
      })
    }), Vk(t.id) && l("music-length", e.musicLengthSec ? String(e.musicLengthSec) : "", [{
      value: "",
      label: "自动"
    }, ...kso.map(m => ({
      value: String(m),
      label: `${m}s`
    }))], m => i({
      musicLengthSec: m ? Number(m) : null
    }), "音乐时长")]
  });
}

function T0r(e) {
  if (!l8t(e.currentModel)) return null;
  const t = c8t({
      modelId: e.currentModel,
      imageCount: e.imageCount
    }),
    n = gPn({
      modelId: e.currentModel,
      mode: t,
      imageCount: e.imageCount
    });
  return {
    mode: t,
    modelPath: n,
    endpoint: `${Po(e.baseUrl)}/${n}`
  };
}

function M0r(e) {
  if (!UY(e.currentModel)) return null;
  const t = h8t({
      imageCount: e.imageCount
    }),
    n = wPn({
      mode: t,
      imageCount: e.imageCount
    });
  return {
    mode: t,
    modelPath: n,
    endpoint: `${Po(e.baseUrl)}/${n}`
  };
}

function P0r(e, t, n) {
  const r = new Map(n.map(i => [i.id, i])),
    a = [];
  for (const i of t.filter(o => o.to === e)) {
    const o = r.get(i.from);
    if (!o) continue;
    const s = typeof o.content == "string" ? o.content.trim() : "";
    s && (o.type === "input-image" || o.type === "gen-image" || o.type === "preview" || o.type === "fal-rembg" || o.type === "topaz-upscale" || o.type === "jimeng-super-resolution" || o.type === "virtual-try-on") && a.push(s);
  }
  return a;
}

function Sso(e, t, n) {
  const r = new Map(n.map(i => [i.id, i])),
    a = [];
  for (const i of t.filter(o => o.to === e)) {
    const o = r.get(i.from);
    if (!o || o.type !== "text-node") continue;
    const s = (o.prompt || o.content || "").trim();
    s && a.push(s);
  }
  return a;
}

async function Iso(e) {
  const t = String(e || "").trim();
  if (!t) throw new Error("没有可优化的 3D 文件");
  return /^https?:\/\//i.test(t) || t.startsWith("data:") ? t : RP(t);
}

async function Cso(e, t) {
  var m, f;
  const n = String(t.apiKey || "").trim();
  if (!n) throw new Error("请先在设置里填写 API Key");
  const r = Qa.getGlobalBaseUrl(),
    a = T0r({
      currentModel: e.model,
      baseUrl: r,
      imageCount: e.imageUrls.length
    });
  if (!a) throw new Error("Hunyuan 3D 模型配置无效");
  const i = [];
  for (const y of e.imageUrls) i.push(await RP(y));
  const o = e.sourceFileUrl ? await Iso(e.sourceFileUrl) : "",
    s = [e.prompt, ...e.textContents].filter(Boolean).join(`
`).trim(),
    l = wUr({
      modelId: e.model,
      mode: a.mode,
      prompt: s,
      material: e.material,
      imageUrls: i,
      sourceFileUrl: o
    }),
    d = await $i(a.endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${n}`,
        "Content-Type": "application/json"
      },
      body: await Pg(l)
    });
  let u = {};
  try {
    u = await d.json();
  } catch {
    throw new Error("Hunyuan 3D 接口返回无效 JSON");
  }
  const h = d8t(u);
  if (h && ((m = t.onQueued) == null || m.call(t, {
    requestId: h,
    modelPath: a.modelPath
  })), !d.ok) throw new Error(Dm(u) || String(u.error || u.message || `Hunyuan 3D 提交失败（HTTP ${d.status}）`));
  wh(u);
  const p = await jWe({
    falPrefix: Po(r),
    apiKey: n,
    modelPath: a.modelPath,
    submitData: u,
    pickResult: Yae
  });
  return {
    asset_source: KWe(e.model) ? "imported" : "generated",
    imported_asset_kind: "object",
    display_name: s.slice(0, 48) || "3D",
    source_url: p.sourceUrl,
    source_format: p.format,
    rendered_image_url: p.thumbnailUrl || void 0,
    src_thumbnail_url: p.thumbnailUrl || void 0,
    caption: s || void 0,
    lod_assets: (f = p.extras) == null ? void 0 : f.map(y => ({
      format: y.format,
      level: y.fileName || y.format,
      url: y.url
    }))
  };
}

async function Eso(e, t) {
  var p, m;
  const n = String(t.apiKey || "").trim();
  if (!n) throw new Error("请先在设置里填写 API Key");
  const r = Qa.getGlobalBaseUrl(),
    a = M0r({
      currentModel: e.model,
      baseUrl: r,
      imageCount: e.imageUrls.length
    });
  if (!a) throw new Error("Tripo 3D 模型配置无效");
  const i = [];
  for (const f of e.imageUrls) i.push(await RP(f));
  const o = [e.prompt, ...e.textContents].filter(Boolean).join(`
`).trim(),
    s = EUr({
      mode: a.mode,
      prompt: o,
      material: e.material,
      imageUrls: i
    }),
    l = await $i(a.endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${n}`,
        "Content-Type": "application/json"
      },
      body: await Pg(s)
    });
  let d = {};
  try {
    d = await l.json();
  } catch {
    throw new Error("Tripo 3D 接口返回无效 JSON");
  }
  const u = d8t(d);
  if (u && ((p = t.onQueued) == null || p.call(t, {
    requestId: u,
    modelPath: a.modelPath
  })), !l.ok) throw new Error(Dm(d) || String(d.error || d.message || `Tripo 3D 提交失败（HTTP ${l.status}）`));
  wh(d);
  const h = await jWe({
    falPrefix: Po(r),
    apiKey: n,
    modelPath: a.modelPath,
    submitData: d,
    pickResult: Yae
  });
  return {
    asset_source: "generated",
    imported_asset_kind: "object",
    display_name: o.slice(0, 48) || "3D",
    source_url: h.sourceUrl,
    source_format: h.format,
    rendered_image_url: h.thumbnailUrl || void 0,
    src_thumbnail_url: h.thumbnailUrl || void 0,
    caption: o || void 0,
    lod_assets: (m = h.extras) == null ? void 0 : m.map(f => ({
      format: f.format,
      level: f.fileName || f.format,
      url: f.url
    }))
  };
}

async function Tso(e, t) {
  var f;
  const n = String(t.apiKey || "").trim();
  if (!n) throw new Error("请先配置虎牙海艺 OpenAPI Token（AI-xxx）");
  const {
      endpoint: r,
      openApiRoot: a
    } = rJr(t.submitUrl || ""),
    i = [e.prompt, ...e.textContents].filter(Boolean).join(`
`).trim(),
    o = [];
  for (const y of e.imageUrls) o.push(await v$(y, a, n));
  const s = iJr({
      modelId: e.model,
      prompt: i,
      imageUrls: o,
      enablePbr: e.material === "pbr"
    }),
    l = await $i(r, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${n}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams(s).toString()
    }),
    d = await l.text();
  let u = {};
  try {
    u = d ? JSON.parse(d) : {};
  } catch {
    u = {
      message: d.slice(0, 240)
    };
  }
  const h = cE(u);
  if (!l.ok || E1(u, h)) throw new Error(nH(l.status, d) || hd(u, l.ok ? "海艺 3D 任务失败" : `海艺 3D 提交失败（HTTP ${l.status}）`));
  const p = String(u.task_id || u.taskId || u.id || "").trim();
  p && ((f = t.onQueued) == null || f.call(t, {
    requestId: p
  }));
  let m = QKt(u);
  if (!m && p) {
    const y = gk(a, p),
      b = p7({
        isVideo: !0,
        isImage2Image: !1
      });
    for (let v = 0; v < b; v++) {
      v > 0 && (await ik.wait(V8({
        attempt: v,
        baseInterval: ES,
        isDocumentHidden: document.visibilityState === "hidden",
        scheduleKey: `huya-art-3d:${p}`,
        lane: "fast"
      })));
      const w = await (await $i(y, {
        headers: {
          Authorization: `Bearer ${n}`
        }
      })).text();
      let k = {};
      try {
        k = w ? JSON.parse(w) : {};
      } catch {
        k = {
          message: w.slice(0, 240)
        };
      }
      const A = cE(k);
      if (E1(k, A)) throw new Error(hd(k, "海艺 3D 任务失败"));
      const S = fv(k, !1);
      if (m = QKt(k) || (S.urls[0] ? {
        modelUrl: S.urls[0],
        previewUrl: "",
        format: "glb"
      } : null), m) break;
    }
  }
  if (!m) throw new Error("海艺 3D 未返回模型文件");
  return {
    asset_source: "generated",
    imported_asset_kind: "object",
    display_name: MLn(e.model),
    source_url: m.modelUrl,
    source_format: m.format,
    rendered_image_url: m.previewUrl || void 0,
    src_thumbnail_url: m.previewUrl || void 0,
    lod_assets: [{
      format: m.format,
      level: "full_res",
      url: m.modelUrl
    }]
  };
}

async function R0r(e) {
  var f, y, b, v;
  const {
      node: t,
      updateNode: n,
      setHistory: r
    } = e,
    a = qLn({
      nodeId: t.id,
      prompt: t.prompt,
      settings: t.settings,
      imageUrls: P0r(t.id, e.connections, e.nodes),
      textContents: Sso(t.id, e.connections, e.nodes)
    }),
    i = KLn(a);
  if (!i.ok) return n(t.id, {
    errorMsg: i.message
  }), i.message;
  const o = ((f = e.generateId) == null ? void 0 : f.call(e)) || `3d-${t.id}-${Date.now()}`,
    s = e.apiConfigs.find(_ => _.id === a.model),
    l = eG(a.model),
    d = l ? cu(s == null ? void 0 : s.key, e.globalApiKey, (y = t.settings) == null ? void 0 : y.savedApiKeyId, {
      platformGroup: (b = t.settings) == null ? void 0 : b.platformGroup,
      modelName: (s == null ? void 0 : s.modelName) || a.model,
      modelId: (s == null ? void 0 : s.id) || a.model,
      baseUrl: s == null ? void 0 : s.url,
      modelSavedApiKeyId: s == null ? void 0 : s.savedApiKeyId
    }) : IU(s, e.globalApiKey);
  if (l && !d) {
    const _ = "请先配置虎牙海艺 OpenAPI Token（AI-xxx）";
    return n(t.id, {
      errorMsg: _
    }), alert(x(_)), _;
  }
  const u = Qa.getGlobalBaseUrl(),
    h = T0r({
      currentModel: a.model,
      baseUrl: u,
      imageCount: a.imageUrls.length
    }) || M0r({
      currentModel: a.model,
      baseUrl: u,
      imageCount: a.imageUrls.length
    }),
    p = [a.prompt, ...a.textContents].filter(Boolean).join(`
`).trim(),
    m = _ => {
      r == null || r(w => w.map(k => k.id === o ? {
        ...k,
        ..._
      } : k));
    };
  r && r(_ => [{
    id: o,
    type: "3d",
    url: "",
    prompt: p,
    ...ky(),
    status: "generating",
    progress: 8,
    modelName: e.modelLabel || (s == null ? void 0 : s.provider) || a.model,
    sourceNodeId: t.id,
    falModelPath: h == null ? void 0 : h.modelPath,
    apiConfig: {
      modelId: a.model,
      baseUrl: u,
      apiKey: d
    }
  }, ..._]), n(t.id, {
    isGenerating: !0,
    errorMsg: "",
    settings: {
      ...(t.settings || {}),
      pendingThreeDRequest: a,
      threeDFalModelPath: h == null ? void 0 : h.modelPath,
      model: a.model,
      threeDOutputType: a.outputType,
      threeDMaterial: a.material,
      threeDInputImageType: a.inputImageType,
      isPano: a.inputImageType === "pano"
    }
  });
  try {
    const _ = ({
        requestId: k,
        modelPath: A
      }) => {
        m({
          remoteTaskId: k,
          falModelPath: A,
          progress: 18
        }), n(t.id, {
          settings: {
            ...(t.settings || {}),
            pendingThreeDRequest: a,
            threeDFalRequestId: k,
            threeDFalModelPath: A
          }
        });
      },
      w = l8t(a.model) ? await Cso(a, {
        apiKey: d,
        onQueued: _
      }) : UY(a.model) ? await Eso(a, {
        apiKey: d,
        onQueued: _
      }) : l ? await Tso(a, {
        apiKey: d,
        submitUrl: s == null ? void 0 : s.url,
        onQueued: ({
          requestId: k
        }) => _({
          requestId: k,
          modelPath: "huya-art-3d"
        })
      }) : await (async () => {
        const k = DLn();
        if (!k) throw new Error("3D 生成接口尚未接入。请求已写入 pendingThreeDRequest，接上 API 后会自动走这里。");
        return k(a);
      })();
    n(t.id, {
      content: w.rendered_image_url || w.src_thumbnail_url || t.content,
      thumbnailUrl: w.src_thumbnail_url || w.rendered_image_url || t.thumbnailUrl,
      isGenerating: !1,
      errorMsg: "",
      settings: Ogt(t.settings, w)
    }), m({
      status: "completed",
      progress: 100,
      url: w.source_url || "",
      originalUrl: w.source_url || "",
      thumbnailUrl: w.src_thumbnail_url || w.rendered_image_url || "",
      threeDFormat: w.source_format || "glb",
      threeDFiles: (v = w.lod_assets) == null ? void 0 : v.map(k => ({
        format: k.format,
        url: k.url,
        fileName: k.level
      }))
    }), Fmr(w, `3d-${o}`).then(k => {
      var A;
      k && (n(t.id, {
        content: k.displayUrl || t.content,
        thumbnailUrl: k.displayUrl || t.thumbnailUrl,
        settings: {
          ...Ogt(t.settings, k.meta),
          _ossThumbnailUrl: k.displayUrl,
          _ossRemoteUrl: k.remoteThumbUrl || k.displayUrl,
          _ossModelUrl: k.modelUrl,
          _ossUrlOnlyMode: !0
        }
      }), m({
        url: k.modelUrl || w.source_url || "",
        originalUrl: k.modelUrl || w.source_url || "",
        thumbnailUrl: k.displayUrl,
        _ossThumbnailUrl: k.displayUrl,
        _ossRemoteUrl: k.remoteThumbUrl || k.displayUrl,
        ossUploaded: !0,
        _globalOssUrlOnly: !0,
        threeDFiles: (A = k.meta.lod_assets) == null ? void 0 : A.map(S => ({
          format: S.format,
          url: S.url,
          fileName: S.level
        }))
      }));
    }).catch(k => {
      console.warn("[3D][OSS] 结果转存失败，继续使用原地址显示", k);
    });
    return;
  } catch (_) {
    const w = _ instanceof Error ? _.message : "3D 生成失败";
    return n(t.id, {
      isGenerating: !1,
      errorMsg: w
    }), m({
      status: "failed",
      progress: 0,
      errorMsg: w
    }), w;
  }
}

function jpe({
  items: e,
  expanded: t = !1,
  disabled: n = !1,
  onAdd: r
}) {
  return on(), e.length ? c.jsxs("div", {
    className: `sg-reference-deck${t ? " is-expanded" : ""}`,
    style: {
      "--sg-deck-width": `${Math.min(370, e.length * 72 + 68)}px`
    },
    role: "group",
    "aria-label": x("{0} 个参考素材，悬停展开", e.length),
    children: [c.jsxs("div", {
      className: "sg-references",
      children: [e.map(a => c.jsxs("div", {
        className: "sg-reference",
        title: a.title,
        children: [c.jsxs("button", {
          type: "button",
          className: "sg-reference-thumb",
          "aria-label": a.selectLabel,
          onMouseDown: i => i.preventDefault(),
          onClick: a.onSelect,
          children: [a.preview, c.jsx("span", {
            children: a.label
          })]
        }), c.jsx("div", {
          className: "sg-reference-info",
          children: a.details
        }), c.jsx("button", {
          type: "button",
          className: "sg-reference-remove",
          "aria-label": a.removeLabel,
          onClick: a.onRemove,
          children: c.jsx(Na, {
            size: 12
          })
        })]
      }, a.id)), c.jsx("button", {
        type: "button",
        className: "sg-reference-add",
        "aria-label": x("继续添加参考素材"),
        disabled: n,
        onClick: r,
        children: c.jsx(eo, {
          size: 18
        })
      })]
    }), c.jsx("span", {
      className: "sg-reference-count",
      children: x("{0} 个参考", e.length)
    })]
  }) : null;
}

function Mso({
  node: e,
  entry: t,
  history: n,
  modelName: r,
  groupLabel: a,
  nodes: i,
  onClose: o
}) {
  on();
  const s = g.useRef(null);
  g.useEffect(() => {
    var p;
    (p = s.current) == null || p.showModal();
  }, []);
  const l = sm(e),
    d = e.settings || {},
    u = l == null ? void 0 : l.draft,
    h = [["模型", r], ["模型标识", (u == null ? void 0 : u.model) || d.model], ["比例", (u == null ? void 0 : u.ratio) || d.ratio], ["分辨率档位", (u == null ? void 0 : u.resolution) || d.resolution], ["实际尺寸", t.previewActualSize], ["时长", (u == null ? void 0 : u.duration) || d.duration], ["本轮数量", u == null ? void 0 : u.count], ["平台分组", a], ["生成时间", l ? new Date(l.createdAt).toLocaleString(ew()) : ""], ["任务编号", (n == null ? void 0 : n.remoteTaskId) || (n == null ? void 0 : n.id)]].filter(([, p]) => typeof p == "string" && p.length > 0 || typeof p == "number");
  return Da.createPortal(c.jsx("dialog", {
    ref: s,
    className: "sg-result-info",
    "aria-labelledby": "sg-result-info-title",
    onCancel: p => {
      p.preventDefault(), o();
    },
    onClick: p => {
      p.target === p.currentTarget && o();
    },
    children: c.jsxs("div", {
      className: "sg-result-info-body",
      children: [c.jsxs("header", {
        children: [c.jsx("strong", {
          id: "sg-result-info-title",
          children: x("生成信息")
        }), c.jsx("button", {
          type: "button",
          "aria-label": x("关闭生成信息"),
          onClick: o,
          children: c.jsx(Na, {
            size: 17
          })
        })]
      }), c.jsx("dl", {
        children: h.map(([p, m]) => c.jsxs("div", {
          children: [c.jsx("dt", {
            children: x(p)
          }), c.jsx("dd", {
            children: String(m)
          })]
        }, String(p)))
      }), c.jsx("h4", {
        children: x("提示词")
      }), c.jsx("p", {
        children: (l == null ? void 0 : l.prompt) || e.prompt || x("未填写提示词")
      }), !!(l != null && l.references.length) && c.jsxs(c.Fragment, {
        children: [c.jsx("h4", {
          children: x("参考素材")
        }), c.jsx("ul", {
          children: l.references.map(p => {
            var m;
            return c.jsxs("li", {
              children: ["@", p.label, " · ", ((m = i.find(f => f.id === p.nodeId)) == null ? void 0 : m.nodeName) || x("参考素材"), p.port === "veo_start" ? x(" · 首帧") : p.port === "veo_end" ? x(" · 尾帧") : ""]
            }, p.nodeId);
          })
        })]
      })]
    })
  }), document.body);
}

const OSt = e => e.assetId || e.id;

function sfn(e, t) {
  var r, a;
  const n = (r = e.settings) == null ? void 0 : r.studioGenerationFavoriteIds;
  return Array.isArray(n) ? n.includes(OSt(t)) : ((a = e.settings) == null ? void 0 : a.studioGenerationFavorite) === !0;
}

function Pso(e, t, n) {
  var o, s;
  const r = (o = e.settings) == null ? void 0 : o.studioGenerationFavoriteIds,
    a = new Set(Array.isArray(r) ? r : (s = e.settings) != null && s.studioGenerationFavorite ? n.map(OSt) : []),
    i = OSt(t);
  return a.has(i) ? a.delete(i) : a.add(i), {
    ...e,
    settings: {
      ...e.settings,
      studioGenerationFavorite: a.size > 0,
      studioGenerationFavoriteIds: [...a]
    }
  };
}

function Rso(e, t, n) {
  const r = sm(e),
    a = e.type === "gen-music",
    i = t.ossRemoteUrl || t.originalUrl || t.content;
  return {
    id: t.assetId || t.id,
    type: a ? "audio" : t.mediaType,
    url: i,
    originalUrl: i,
    thumbnailUrl: t.thumbnailUrl,
    videoPosterUrl: t.videoPosterUrl,
    _assetId: t.assetId,
    _ossRemoteUrl: t.ossRemoteUrl,
    _ossThumbnailUrl: t.ossThumbnailUrl,
    _globalOssUrlOnly: t.globalOssUrlOnly,
    ...(a ? {
      audioUrl: i
    } : {}),
    prompt: (r == null ? void 0 : r.prompt) || e.prompt,
    modelName: n,
    sourceNodeId: e.id,
    time: new Date((r == null ? void 0 : r.createdAt) || t.createdAt).toLocaleString("zh-CN"),
    timestamp: (r == null ? void 0 : r.createdAt) || t.createdAt,
    status: "completed",
    progress: 100
  };
}

const AUt = [{
    id: "upscale",
    label: "智能超清",
    hint: "选择增强方式与放大倍率，提升图片清晰度。"
  }, {
    id: "smart",
    label: "智能改图",
    hint: "标记、涂画或添加文字，再描述你想修改的内容。"
  }, {
    id: "region",
    label: "局部重绘",
    hint: "框选要重绘的区域，确认后填写修改说明。"
  }, {
    id: "expand",
    label: "扩图",
    hint: "选择比例或拖动边框，保留原图并扩展画面。"
  }, {
    id: "eraser",
    label: "消除笔",
    hint: "涂抹需要消除的内容，生成后自动补全背景。"
  }, {
    id: "angle",
    label: "多角度",
    hint: "调整镜头方向，确认后生成新的视角。"
  }, {
    id: "repair",
    label: "细节修复",
    hint: "框选有瑕疵的区域，确认后可补充修复说明。"
  }],
  N0r = e => {
    var t;
    return ((t = AUt.find(n => n.id === e)) == null ? void 0 : t.label) || "图片编辑";
  },
  Nso = e => `studio-image-tool:${e}`;

function jso(e, t, n) {
  const r = new Map(e.map(a => [a.id, a]));
  return t.map(a => {
    const i = r.get(a.id),
      o = a.studioImageTool || (i == null ? void 0 : i.studioImageTool) || (i ? void 0 : n);
    return o && o !== a.studioImageTool ? {
      ...a,
      studioImageTool: o
    } : a;
  });
}

async function j0r(e, t) {
  const [{
      buildCompactGenResultEntryLightboxSource: n
    }, {
      resolveGenNodeOriginalUrlForCropExpand: r
    }, {
      readLocalOriginalAssetAsUrl: a
    }] = await Promise.all([Ie(() => Promise.resolve().then(() => SOn), void 0, import.meta.url), Ie(() => Promise.resolve().then(() => LM), void 0, import.meta.url), Ie(() => Promise.resolve().then(() => Ui), void 0, import.meta.url)]),
    i = n(e, t),
    s = (t.assetId && !t.globalOssUrlOnly ? await a(t.assetId) : null) || (await r(i, t.content || t.originalUrl || t.thumbnailUrl, 0));
  if (!s) throw new Error("原图暂不可用，请检查素材存储位置后重试。");
  return s;
}

async function Dso(e, t) {
  const [{
      getImageDimensions: n
    }, {
      fetchMediaUrlAsBlobForChat: r
    }, a] = await Promise.all([Ie(() => Promise.resolve().then(() => pg), void 0, import.meta.url), Ie(() => Promise.resolve().then(() => MD), void 0, import.meta.url), j0r(e, t)]),
    i = await r(a);
  if (!i.size) throw new Error("原图内容为空，请重新导入素材。");
  const o = URL.createObjectURL(i);
  try {
    const s = await n(o);
    if (!s.w || !s.h) throw new Error("原图尺寸无法读取，请重新导入素材。");
    return {
      original: o,
      size: s,
      ownedUrl: o
    };
  } catch (s) {
    throw URL.revokeObjectURL(o), s;
  }
}

function Lso(e, t) {
  return {
    sessionId: e.sessionId,
    roundId: t.id,
    createdAt: e.createdAt,
    prompt: `${N0r(e.tool)} · ${t.prompt || "原图编辑"}`,
    references: [{
      nodeId: e.sourceId,
      label: 1,
      port: "default"
    }]
  };
}

function Oso(e, t, n) {
  const r = new Set(e.map(a => a.id));
  return t.map(a => r.has(a.id) || sm(a) ? a : a.type !== "gen-image" ? {
    ...a,
    settings: {
      ...a.settings,
      studioImageToolAux: !0
    }
  } : {
    ...a,
    settings: {
      ...a.settings,
      studioGeneration: Lso(n, a),
      studioImageToolRequestId: n.id,
      studioImageTool: n.tool,
      studioImageToolSourceId: n.sourceId
    }
  });
}

function Bso(e, t) {
  var a, i, o, s, l;
  const n = new Map(e.map(d => [d.id, d]));
  let r = !1;
  for (const d of t) {
    const u = d.studioImageTool;
    if (!u || d.type !== "image" || u.dismissed) continue;
    const h = Nso(d.id),
      p = n.get(h),
      m = p || Ki(h, "gen-image", 0, 0),
      f = kAe({
        ...m,
        content: "",
        settings: {
          generationVersions: []
        }
      }, d).entries,
      y = `${N0r(u.tool)} · ${d.prompt || "原图编辑"}`,
      b = {
        sessionId: u.sessionId,
        roundId: h,
        createdAt: d.startTime || d.timestamp || Date.now(),
        prompt: y,
        references: [{
          nodeId: u.sourceNodeId,
          label: 1,
          port: "default"
        }]
      },
      v = d.status === "failed" ? d.errorMsg || "编辑未完成，请重试。" : "",
      _ = d.status === "generating",
      w = d.ratio || d.mjRatio;
    p && p.isGenerating === _ && p.errorMsg === v && ((a = p.settings) == null ? void 0 : a.studioImageToolProgress) === d.progress && ((i = p.settings) == null ? void 0 : i.ratio) === w && ((o = p.settings) == null ? void 0 : o.resolution) === void 0 && p.prompt === y && JSON.stringify((s = p.settings) == null ? void 0 : s.generationVersions) === JSON.stringify(f) || (r = !0, n.set(h, {
      ...m,
      content: "",
      prompt: y,
      isGenerating: _,
      errorMsg: v,
      settings: {
        ...m.settings,
        model: ((l = d.apiConfig) == null ? void 0 : l.modelId) || u.modelId,
        ratio: w,
        resolution: void 0,
        generationVersions: f,
        studioGeneration: b,
        studioImageTool: u.tool,
        studioImageToolHistoryId: d.id,
        studioImageToolSourceId: u.sourceNodeId,
        studioImageToolProgress: d.progress
      }
    }));
  }
  return r ? [...n.values()] : e;
}

const Fso = {
  upscale: xTn,
  smart: EP,
  region: Xle,
  expand: kT,
  eraser: uI,
  angle: tWe,
  repair: ac
};

function zso({
  disabled: e,
  onOpen: t
}) {
  return on(), c.jsx("div", {
    className: "sg-image-tool-bar",
    role: "toolbar",
    "aria-label": x("图片编辑工具"),
    onDoubleClick: n => n.stopPropagation(),
    children: AUt.map(n => {
      const r = Fso[n.id];
      return c.jsx("button", {
        type: "button",
        "aria-label": x(n.label),
        title: x(n.label),
        disabled: e,
        onClick: a => {
          a.stopPropagation(), t(n.id);
        },
        children: c.jsx(r, {
          size: 15
        })
      }, n.id);
    })
  });
}

function Uso(e) {
  var t;
  try {
    const n = localStorage.getItem(_S(`qiaodoumayi_generation_session:${e}`)) || "",
      r = new Set(e ? f9t(e) : []);
    return n && !r.has(n) ? n : ((t = (e ? m9t(e).filter(i => !r.has(i.id)).sort((i, o) => o.time - i.time) : [])[0]) == null ? void 0 : t.id) || crypto.randomUUID();
  } catch {
    return crypto.randomUUID();
  }
}

const Qlt = e => e ? Yh(e.provider) || e.modelName : "模型不可用",
  lfn = e => dk(e) ? "模型 Key" : e === ko ? "自动分组" : PU(e),
  $so = e => fu(e) ? e : "",
  Gso = e => {
    var t, n;
    return $so(String(((t = e.settings) == null ? void 0 : t.audioUrl) || ((n = e.settings) == null ? void 0 : n._ossRemoteUrl) || e.content || ""));
  },
  Vso = e => e === "video" ? "视频模型" : e === "music" ? "音乐模型" : e === "3d" ? "3D 模型" : "图片模型",
  Hso = 500;

function cfn(e) {
  var n, r, a, i;
  const t = oS(e);
  return Cy(e)[0] || {
    id: e.id,
    createdAt: 0,
    mediaType: t === "video" ? "video" : "image",
    content: e.content || "",
    originalUrl: String(((n = e.settings) == null ? void 0 : n._ossRemoteUrl) || e.content || ""),
    thumbnailUrl: String(((r = e.settings) == null ? void 0 : r._ossThumbnailUrl) || e.content || ""),
    assetId: String(e._contentAssetId || ((a = e.settings) == null ? void 0 : a._assetId) || ((i = e.settings) == null ? void 0 : i._localCacheAssetId) || "") || void 0,
    videoPosterUrl: e.videoPosterUrl,
    generatedImages: []
  };
}

function Wso({
  feed: e,
  roundId: t,
  eager: n,
  children: r
}) {
  on();
  const [a, i] = g.useState(null),
    [o, s] = g.useState(n || typeof IntersectionObserver > "u"),
    l = g.useRef(360);
  return g.useLayoutEffect(() => {
    if (!a || !o) return;
    const d = () => {
      l.current = a.getBoundingClientRect().height;
    };
    d();
    const u = new ResizeObserver(d);
    return u.observe(a), () => u.disconnect();
  }, [a, o]), g.useLayoutEffect(() => {
    if (!a || !e.current || typeof IntersectionObserver > "u") return;
    const d = new IntersectionObserver(([u]) => s(u.isIntersecting), {
      root: e.current,
      rootMargin: "640px 0px"
    });
    return d.observe(a), () => d.disconnect();
  }, [e, a]), c.jsx("article", {
    ref: i,
    className: `sg-round${o ? "" : " is-held"}`,
    style: o ? void 0 : {
      height: l.current
    },
    "data-round-id": t,
    children: o ? r() : null
  });
}

function qso({
  node: e,
  history: t,
  onEdit: n,
  onRetry: r,
  onDismiss: a
}) {
  on();
  const i = E5e(e.id),
    o = kAe(e, t, i),
    s = o.error && pDe(o) ? XJr(o.error) : null;
  return c.jsx("div", {
    className: `sg-placeholder${s ? " is-error" : " is-generating"}`,
    "aria-busy": !s,
    children: s ? c.jsxs(c.Fragment, {
      children: [c.jsx(vd, {
        size: 24
      }), c.jsx("strong", {
        children: x(s.title)
      }), c.jsx("p", {
        children: x(s.hint)
      }), c.jsxs("div", {
        className: "sg-error-actions",
        children: [c.jsx("button", {
          onClick: n,
          children: x("编辑后重试")
        }), c.jsx("button", {
          onClick: r,
          children: x("重试本张")
        }), c.jsx("button", {
          className: "sg-error-dismiss",
          "aria-label": x("删除失败任务"),
          title: x("只去掉这条失败显示，生成历史里的图片会保留"),
          onClick: a,
          children: x("删除")
        })]
      }), c.jsxs("details", {
        children: [c.jsx("summary", {
          children: x("错误详情")
        }), c.jsx("pre", {
          children: s.detail
        })]
      })]
    }) : c.jsx(uso, {
      label: x(o.label),
      progress: o.progress
    })
  });
}

function Kso(e) {
  var Yn;
  on();
  const {
      isDark: t
    } = Oy(),
    {
      nodes: n,
      models: r,
      loading: a,
      document: i
    } = e,
    o = e.workspaceId || xoe,
    s = g.useRef(e);
  s.current = e;
  const l = g.useMemo(() => r.filter(Ct => Ct.enabled !== !1 && (Ct.type === "Image" || Ct.type === "Video" || Ct.type === "Music" || Ct.type === "3D")), [r]),
    [d, u] = g.useState(() => Uso(o)),
    [h, p] = g.useState(() => eQt(o, d) || eW(l.find(Ct => Ct.type === "Image"))),
    m = g.useRef({
      draft: h,
      sessionId: d
    });
  m.current = {
    draft: h,
    sessionId: d
  };
  const [f, y] = g.useState(""),
    [b, v] = g.useState(!1),
    _ = g.useRef(!1),
    w = g.useRef(new Set()),
    k = g.useRef(!0),
    [A, S] = g.useState("all"),
    [C, I] = g.useState(""),
    [E, M] = g.useState(!1),
    [T, P] = g.useState("materials"),
    [R, j] = g.useState(""),
    [B, F] = g.useState("all"),
    [N, G] = g.useState(null),
    [z, V] = g.useState(!1),
    O = g.useRef(0),
    [L, D] = g.useState(null),
    [U, H] = g.useState(20),
    [Y, K] = g.useState(0),
    [W, Q] = g.useState(80),
    [q, ne] = g.useState({}),
    [de, le] = g.useState(null),
    [J, pe] = g.useState(""),
    ce = g.useRef(!1),
    we = g.useRef(new Set()),
    X = g.useRef(null),
    Z = g.useRef(null),
    re = g.useRef(null),
    fe = g.useRef(null),
    ye = g.useRef(null),
    ie = g.useRef(!0),
    ae = g.useRef(!1),
    be = g.useRef(null),
    [Ee, xe] = g.useState(!0),
    he = l.find(Ct => Ct.id === h.model),
    ue = !!he && od(he, Qa.getGlobalBaseUrl()),
    ge = he ? iG(he) : {
      frames: !1
    },
    _e = g.useMemo(() => n.filter(Ct => (Ct.type === "gen-image" || Ct.type === "gen-video" || Ct.type === "gen-music" || Ct.type === "gen-3d") && sm(Ct)), [n]),
    ke = g.useMemo(() => new Set(f9t(o)), [o, Y]),
    ve = g.useMemo(() => {
      const Ct = new Map();
      for (const Cn of m9t(o)) ke.has(Cn.id) || Ct.set(Cn.id, Cn);
      for (const Cn of _e) {
        const un = sm(Cn);
        if (ke.has(un.sessionId)) continue;
        const Jn = Ct.get(un.sessionId);
        (!Jn || un.createdAt < Jn.time) && Ct.set(un.sessionId, {
          id: un.sessionId,
          title: un.prompt.slice(0, 24) || "未命名创作",
          time: un.createdAt
        });
      }
      return [...Ct.values()].sort((Cn, un) => un.time - Cn.time);
    }, [_e, o, ke]),
    Te = [...new Set([d, ...ve.map(Ct => Ct.id)])].filter(Ct => !ke.has(Ct)),
    Ne = g.useMemo(() => {
      var Cn;
      const Ct = new Map();
      for (const un of _e) {
        const Jn = sm(un);
        if (Jn.sessionId !== d || A === "favorites" && !((Cn = un.settings) != null && Cn.studioGenerationFavorite) || A === "image" && un.type !== "gen-image" || A === "video" && un.type !== "gen-video" || C && !Jn.prompt.toLocaleLowerCase().includes(C.toLocaleLowerCase())) continue;
        const Kn = Ct.get(Jn.roundId) || [];
        Kn.push(un), Ct.set(Jn.roundId, Kn);
      }
      return [...Ct.values()].sort((un, Jn) => sm(un[0]).createdAt - sm(Jn[0]).createdAt);
    }, [_e, d, A, C]),
    me = T5e(),
    Ae = g.useMemo(() => oso(e.history), [e.history]),
    Fe = Ct => {
      var Cn, un;
      return (Cn = Ct.settings) != null && Cn.studioImageTool ? (un = Ae.get(Ct.id)) == null ? void 0 : un.modelName : void 0;
    },
    Me = g.useMemo(() => new Map(n.map(Ct => [Ct.id, Ct])), [n]),
    Re = g.useMemo(() => new Map(_e.map(Ct => [Ct.id, kAe(Ct, Ae.get(Ct.id), al.getNodeSnapshot(Ct.id))])), [_e, Ae, me]),
    $e = Ct => Re.get(Ct.id) || kAe(Ct, Ae.get(Ct.id), al.getNodeSnapshot(Ct.id)),
    rt = g.useMemo(() => _e.filter(Ct => {
      var Cn;
      return ((Cn = sm(Ct)) == null ? void 0 : Cn.sessionId) === d;
    }), [_e, d]),
    nt = rt.filter(Ct => $e(Ct).running).length,
    ze = rt.filter(Ct => pDe($e(Ct))).length,
    Le = g.useMemo(() => !E || T !== "materials" ? [] : n.filter(Ct => {
      var Cn, un;
      return !((Cn = Ct.settings) != null && Cn.studioImageToolSource) && !((un = Ct.settings) != null && un.studioImageToolAux) && ["input-image", "video-input", "gen-image", "gen-video", "preview"].includes(Ct.type) && (Ct.content || Cy(Ct).length) && !Ct.isGenerating && (B === "all" || oS(Ct) === B) && (Ct.nodeName || "").toLocaleLowerCase().includes(R.trim().toLocaleLowerCase());
    }), [n, E, T, B, R]),
    Ke = g.useMemo(() => !E || T !== "history" ? [] : e.history.filter(Ct => Ct.type !== "3d" && (B === "all" || Ct.type === B) && `${Ct.prompt || ""} ${Ct.modelName || ""}`.toLocaleLowerCase().includes(R.trim().toLocaleLowerCase())), [e.history, E, T, B, R]),
    Xe = g.useMemo(() => new Set(h.references.map(Ct => {
      var Cn, un;
      return (un = (Cn = Me.get(Ct.nodeId)) == null ? void 0 : Cn.settings) == null ? void 0 : un.studioHistoryId;
    })), [Me, h.references]);
  g.useEffect(() => {
    Q(80);
  }, [T, B, R]), g.useEffect(() => {
    if (!E) return;
    const Ct = Cn => {
      Cn.key === "Escape" && M(!1);
    };
    return window.addEventListener("keydown", Ct), () => window.removeEventListener("keydown", Ct);
  }, [E]), g.useEffect(() => (k.current = !0, () => {
    k.current = !1, Z.current && window.clearTimeout(Z.current);
  }), []), g.useEffect(() => {
    try {
      u0e(o, d, h), localStorage.setItem(_S(`qiaodoumayi_generation_session:${o}`), d);
    } catch {
      y("草稿暂时无法保存，请保留当前页面。");
    }
  }, [o, d, h]), g.useEffect(() => {
    !h.model && l.length && p(Ct => pne(Ct, l.find(Cn => Cn.type === OV(Ct.kind)) || l[0]));
  }, [h.model, l]), g.useEffect(() => {
    if (a || b) return;
    const Ct = () => {
      const Cn = lso();
      if (!(!Cn || _.current)) {
        try {
          u0e(o, d, {
            ...h,
            prompt: re.current ? Ec(re.current) : h.prompt
          });
        } catch {
          y("当前草稿未能保存，请稍后重试接收剧本。");
          return;
        }
        u(Cn.id), p({
          ...eW(l.find(un => un.type === OV(Cn.kind))),
          kind: Cn.kind,
          prompt: Cn.prompt
        }), H(20), S("all"), I(""), G(null), y("已接收提示词，可调整模型和内容后生成。"), dso(Cn.id);
      }
    };
    return Ct(), cso(Ct);
  }, [a, b, o, d, h, l]), g.useLayoutEffect(() => {
    const Ct = fe.current,
      Cn = ye.current;
    if (!Ct || !Cn) return;
    const un = () => {
      var Kn;
      ie.current ? Ct.scrollTop = Ct.scrollHeight : (Kn = be.current) != null && Kn.element.isConnected && (Ct.scrollTop += be.current.element.getBoundingClientRect().top - be.current.top);
    };
    un();
    const Jn = new ResizeObserver(un);
    return Jn.observe(Cn), Jn.observe(Ct), () => Jn.disconnect();
  }, [Ne.length, d, a]);
  const De = Ct => {
      y(""), p(Cn => ({
        ...Cn,
        ...Ct
      }));
    },
    Ye = (Ct, Cn, un) => {
      y(""), D(GX(Cn, un, {
        title: Ct.nodeName,
        prompt: Ct.prompt
      }));
    },
    Ce = Ct => {
      Z.current && window.clearTimeout(Z.current), Z.current = window.setTimeout(() => {
        Z.current = null, k.current && Ct();
      }, Hso);
    },
    He = (Ct, Cn, un) => {
      Z.current && (window.clearTimeout(Z.current), Z.current = null), y(""), D(GX(Ct, Cn, un));
    },
    Ve = Ct => {
      _.current || (be.current = null, ae.current = !1, Da.flushSync(() => De({
        prompt: We()
      })), G(null), M(!1), u(Ct), H(20), S("all"), I(""), y(""), ie.current = !0, xe(!0), p(eQt(o, Ct) || eW(l.find(Cn => Cn.type === "Image"))));
    },
    it = Ct => {
      if (Ct === d && _.current) {
        y("当前页面正在提交，请稍后再移除。");
        return;
      }
      try {
        eZr(o, Ct);
      } catch {
        y("页面暂时无法从列表移除。");
        return;
      }
      if (K(un => un + 1), Ct !== d) return;
      const Cn = ve.find(un => un.id !== Ct);
      Ve((Cn == null ? void 0 : Cn.id) || crypto.randomUUID());
    },
    It = Ct => {
      p(Cn => Cn.references.some(un => un.nodeId === Ct) ? Cn : {
        ...Cn,
        references: [...Cn.references, {
          nodeId: Ct,
          label: Math.max(0, ...Cn.references.map(un => un.label)) + 1,
          port: "default"
        }]
      });
    },
    Ft = Ct => {
      if (Ct === h.kind) return;
      const Cn = l.find(un => un.type === OV(Ct));
      p(un => Cn ? pne(un, Cn) : {
        ...un,
        kind: Ct,
        model: ""
      }), y(Cn ? "" : "请先在设置中启用对应类型的模型。");
    },
    We = () => re.current ? Ec(re.current) : h.prompt;
  g.useEffect(() => {
    const Ct = Cn => Ve(Cn.detail);
    return window.addEventListener(cUe, Ct), () => window.removeEventListener(cUe, Ct);
  });
  const Ze = () => {
      var Ct;
      return X6({
        mode: "save",
        source: {
          kind: "generation",
          sourceId: `${o}:${d}`,
          name: ((Ct = ve.find(Cn => Cn.id === d)) == null ? void 0 : Ct.title) || h.prompt.slice(0, 32) || "言绘创作",
          capture: async () => {
            var Kn;
            (Kn = re.current) == null || Kn.dispatchEvent(new Event(h_e));
            const Cn = m.current,
              un = {
                ...Cn.draft,
                prompt: We()
              };
            return u0e(o, Cn.sessionId, un), {
              content: Pli(o, Cn.sessionId, s.current.nodes, s.current.connections, s.current.history, un),
              sourceStamp: yKe("generation", `${o}:${Cn.sessionId}`)
            };
          }
        }
      });
    },
    Ge = () => {
      const Ct = {
        ...m.current.draft,
        prompt: We()
      };
      u0e(o, m.current.sessionId, Ct), p(Ct);
    },
    Oe = Ct => {
      const Cn = re.current;
      if (!Cn) return;
      const un = w7t(Cn, `@${Ct} `);
      Cn.focus({
        preventScroll: !0
      }), awe(Cn, {
        ...un,
        pillUpgrade: !0
      }), De({
        prompt: un.text
      });
    },
    st = Ct => {
      const Cn = ZJr({
        ...h,
        prompt: We()
      }, Ct);
      re.current && awe(re.current, {
        text: Cn.prompt,
        cursor: Cn.prompt.length,
        pillUpgrade: !0
      }), p(Cn);
    },
    vt = (Ct = {
      ...h,
      prompt: We()
    }) => {
      var Tt;
      if (_.current) return;
      const Cn = s.current,
        un = JSON.stringify(Ct),
        Jn = `${d}:${un}`;
      if (w.current.has(Jn) || Cn.nodes.some(Ue => {
        var et, ft;
        return ((et = sm(Ue)) == null ? void 0 : et.sessionId) === d && ((ft = sm(Ue)) == null ? void 0 : ft.requestKey) === un && $e(Ue).running;
      })) {
        y("这组参数的作品仍在生成，请等待完成或调整提示词后再提交。");
        return;
      }
      const Kn = Cn.models.find(Ue => Ue.id === Ct.model),
        en = EOn(Ct, Kn, Cn.nodes);
      if (en) {
        y(en);
        return;
      }
      if (Cn.loading) {
        y("创作记录正在读取，请稍候。");
        return;
      }
      _.current = !0;
      let Vn = [];
      try {
        const Ue = Cn.document.lease();
        Ue.assertCurrent();
        const et = TOn({
          draft: Ct,
          model: Kn,
          nodes: Cn.nodes,
          sessionId: d,
          id: () => crypto.randomUUID()
        });
        Vn = et.nodes, Da.flushSync(() => {
          Cn.setNodes(jt => (Ue.assertCurrent(), [...jt, ...et.nodes])), Cn.setConnections(jt => (Ue.assertCurrent(), [...jt, ...et.connections]));
        }), Ue.assertCurrent();
        const ft = ((Tt = Cn.beforeGenerate) == null ? void 0 : Tt.call(Cn)) || Promise.resolve(),
          ht = (jt, bt) => Cn.setNodes(Bt => Ue.isCurrent() ? Bt.map(wn => wn.id === jt ? {
            ...wn,
            ...bt,
            settings: bt.settings ?? wn.settings
          } : wn) : Bt),
          wt = Vn.map(jt => {
            const bt = () => {
              var Bt;
              return Ue.assertCurrent(), Ct.kind !== "3d" ? s.current.generate(jt) : R0r({
                node: jt,
                nodes: s.current.nodes,
                connections: s.current.connections,
                apiConfigs: (Bt = s.current.apiConfigs) != null && Bt.length ? s.current.apiConfigs : s.current.models,
                globalApiKey: s.current.globalApiKey || "",
                updateNode: ht,
                setHistory: s.current.setHistory,
                generateId: () => crypto.randomUUID(),
                modelLabel: Kn == null ? void 0 : Kn.provider
              });
            };
            return ft.then(bt).catch(Bt => {
              Ue.isCurrent() && Cn.setNodes(wn => Ue.isCurrent() ? wn.map(at => at.id === jt.id ? {
                ...at,
                isGenerating: !1,
                errorMsg: Bt instanceof Error ? Bt.message : "生成未能启动",
                settings: {
                  ...at.settings,
                  isGenerating: !1
                }
              } : at) : wn);
            });
          });
        w.current.add(Jn), Promise.allSettled(wt).finally(() => w.current.delete(Jn)), y(""), S("all"), I(""), ie.current = !0, ae.current = !1, xe(!0), fe.current && (fe.current.scrollTop = fe.current.scrollHeight);
      } catch (Ue) {
        y(Ue instanceof Error ? Ue.message : "未能启动生成");
      } finally {
        _.current = !1;
      }
    },
    Ht = Ct => {
      var Kn, en, Vn, Tt, Ue, et, ft, ht;
      const Cn = sm(Ct),
        un = l.find(wt => {
          var jt;
          return wt.id === ((jt = Ct.settings) == null ? void 0 : jt.model);
        }),
        Jn = {
          ...eW(un),
          prompt: Cn.prompt,
          model: String(((Kn = Ct.settings) == null ? void 0 : Kn.model) || ""),
          ratio: String(((en = Ct.settings) == null ? void 0 : en.gptImage2AspectRatio) || ((Vn = Ct.settings) == null ? void 0 : Vn.ratio) || ""),
          resolution: String(((Tt = Ct.settings) == null ? void 0 : Tt.resolution) || ""),
          duration: String(((Ue = Ct.settings) == null ? void 0 : Ue.duration) || ""),
          platformGroup: String(((et = Ct.settings) == null ? void 0 : et.platformGroup) || ko),
          kind: dme(Ct),
          references: Cn.references || [],
          ...Cn.draft,
          count: 1
        };
      return (ft = re.current) == null || ft.dispatchEvent(new CustomEvent(h_e)), p(Jn), re.current && awe(re.current, {
        text: Jn.prompt,
        cursor: Jn.prompt.length,
        pillUpgrade: !0
      }), y("已载入本轮提示词和参考素材，编辑后生成会保留原作品。"), (ht = re.current) == null || ht.focus(), Jn;
    },
    nn = (Ct, Cn, un = Cy(Ct)[0]) => {
      var Vn;
      const Jn = l.find(Tt => Tt.type === OV(Cn));
      if (!Jn) {
        y("请先在设置中启用对应类型的模型。");
        return;
      }
      if (!un) {
        y("作品尚未完成，暂时无法用作参考。");
        return;
      }
      const Kn = s.current.document.lease();
      if (!Kn.isCurrent()) return;
      const en = COn({
        source: Ct,
        entry: un,
        id: crypto.randomUUID(),
        existingNodes: s.current.nodes
      });
      s.current.setNodes(Tt => Kn.isCurrent() ? [...Tt, en] : Tt), p({
        ...pne(h, Jn),
        count: 1,
        references: [{
          nodeId: en.id,
          label: 1,
          port: "default"
        }],
        prompt: Cn === "video" ? "以 @1 为画面参考，保持主体和场景一致，镜头缓慢推进，加入自然细腻的动态。" : Cn === "3d" ? "以 @1 为参考，生成对应的三维模型。" : "在 @1 的基础上，"
      }), D(null), y("已将当前作品作为参考，填写提示词后即可继续创作。"), (Vn = re.current) == null || Vn.focus();
    },
    pt = async (Ct, Cn, un) => {
      if (ce.current || !e.onImageTool) return;
      ce.current = !0, pe(un.id), y("");
      const Jn = i.lease();
      let Kn;
      try {
        Ge();
        const en = await Dso(Cn, un);
        if (Kn = en.ownedUrl, !k.current || !Jn.isCurrent() || m.current.sessionId !== d) return;
        e.onImageTool({
          tool: Ct,
          node: Cn,
          entry: un,
          ...en,
          sessionId: d
        }), Kn = void 0;
      } catch (en) {
        k.current && y(en instanceof Error ? en.message : "无法打开图片工具。");
      } finally {
        Kn && URL.revokeObjectURL(Kn), ce.current = !1, k.current && pe("");
      }
    },
    lt = Ct => {
      var Jn;
      const Cn = s.current.nodes.find(Kn => {
          var en;
          return Kn.id === ((en = Ct.settings) == null ? void 0 : en.studioImageToolSourceId);
        }),
        un = Cn && Cy(Cn)[0];
      if (!Cn || !un) {
        y("编辑原图暂不可用，请从作品的悬浮工具栏重新打开。");
        return;
      }
      pt((Jn = Ct.settings) == null ? void 0 : Jn.studioImageTool, Cn, un);
    },
    gt = async (Ct, Cn, un, Jn) => {
      var en;
      if (Ct === "edit" && e.onImageTool) {
        await pt("smart", Cn, un);
        return;
      }
      if (Ct === "favorite") {
        e.setNodes(Vn => Vn.map(Tt => Tt.id === Cn.id ? Pso(Tt, un, Jn) : Tt));
        return;
      }
      if (Ct === "info") {
        le({
          node: Cn,
          entry: un
        });
        return;
      }
      if (ce.current) return;
      ce.current = !0, pe(un.id), y("");
      const Kn = i.lease();
      try {
        if (Ge(), Ct === "canvas") {
          const Vn = Rso(Cn, un, Fe(Cn) || Qlt(l.find(Ue => {
              var et;
              return Ue.id === ((et = Cn.settings) == null ? void 0 : et.model);
            }))),
            Tt = await ((en = e.onSendToCanvas) == null ? void 0 : en.call(e, [Vn]));
          Tt && k.current && Kn.isCurrent() && m.current.sessionId === d ? (Ge(), Dx()) : !Tt && k.current && Kn.isCurrent() && y("作品未发送，请检查素材是否可用后重试。");
        } else if (Ct === "edit") {
          const Vn = await j0r(Cn, un);
          if (!k.current || !Kn.isCurrent() || m.current.sessionId !== d) return;
          Ge(), Rya(Vn, Vn);
        }
      } catch (Vn) {
        k.current && y(Vn instanceof Error ? Vn.message : "作品操作失败，请重试。");
      } finally {
        ce.current = !1, k.current && pe("");
      }
    },
    Ut = async (Ct, Cn, un) => {
      if (!Cn.length || we.current.has(Ct)) return;
      we.current.add(Ct);
      let Jn = !1;
      const Kn = FGn(() => ({
          loading: () => "",
          update: (Ue, et) => {
            k.current && ne(ft => ({
              ...ft,
              [Ct]: et.progress
            }));
          },
          remove: () => {},
          success: () => {},
          error: Ue => {
            Ue && iT(Ue, {
              type: "error",
              duration: 4e3,
              noticeKey: "download"
            });
          },
          isCancelled: () => Jn,
          cancel: () => {
            Jn = !0;
          },
          folderHint: () => tYe(localStorage.getItem("qiaodoumayi_download_directory"), navigator.userAgent)
        })),
        en = Ue => {
          var et;
          return Kn.close((et = Ue.detail) == null ? void 0 : et.id);
        };
      window.addEventListener("qdm-loading-toast-closed", en), ne(Ue => ({
        ...Ue,
        [Ct]: 0
      })), Kn.onDownloadStart(Cn.length);
      let Vn = 0,
        Tt = 0;
      try {
        const {
          downloadLightboxToUserFolder: Ue
        } = await Ie(async () => {
          const {
            downloadLightboxToUserFolder: et
          } = await Promise.resolve().then(() => Cpe);
          return {
            downloadLightboxToUserFolder: et
          };
        }, void 0, import.meta.url);
        for (let et = 0; et < Cn.length; et++) {
          if (Jn) return;
          const ft = Cn[et],
            ht = await Ue(ft.originalUrl || ft.content, `言绘-${Date.now()}${Cn.length > 1 ? `-${et + 1}` : ""}`, un || ft.mediaType, {
              assetId: ft.assetId
            });
          if (Jn) return;
          ht.ok ? Vn++ : Tt++, Kn.onDownloadProgress(et + 1, Cn.length, ht.ok ? ht.filename : "下载失败");
        }
        Jn || Kn.onDownloadComplete(Vn, Tt);
      } catch (Ue) {
        Jn || Kn.onDownloadError(Ue instanceof Error ? Ue.message : "下载失败，请重试。");
      } finally {
        window.removeEventListener("qdm-loading-toast-closed", en), we.current.delete(Ct), k.current && ne(Ue => {
          const et = {
            ...Ue
          };
          return delete et[Ct], et;
        });
      }
    },
    _t = async Ct => {
      if (_.current || a) return;
      const Cn = i.lease();
      _.current = !0, v(!0), y("");
      try {
        for (const un of Ct) {
          if (Cn.assertCurrent(), !/^(image|video|audio)\//.test(un.type)) throw new Error(`${un.name} 不是支持的图片、视频或音频。`);
          if (un.size > 200 * 1024 * 1024) throw new Error(`${un.name} 超过 200 MB，请压缩后导入。`);
          const Jn = crypto.randomUUID(),
            Kn = `studio-reference-${Jn}`,
            en = un.type.startsWith("video/") ? "video" : un.type.startsWith("audio/") ? "audio" : "image";
          let Vn;
          if (ua()) Vn = Hv(await _P(un));else {
            if (!(await ni.saveBlobAsset(Kn, un, un.name, "local"))) throw new Error(`${un.name} 保存失败，请重试。`);
            const et = await ni.getAssetUrl(Kn);
            if (!et) throw new Error(`${un.name} 无法读取。`);
            const ft = en === "image" ? await Fce(et, {
              assetId: Kn,
              nodeName: un.name
            }) : null;
            Vn = {
              content: (ft == null ? void 0 : ft.content) || et,
              _contentAssetId: Kn,
              settings: {
                _assetId: Kn,
                _localCacheAssetId: Kn,
                ...(ft == null ? void 0 : ft.settings),
                mediaType: en
              }
            };
          }
          Cn.assertCurrent();
          const Tt = s.current.nodes,
            Ue = {
              ...Ki(Jn, "input-image", -280, Math.max(80, ...Tt.map(et => et.y + et.height + 30)), un.name),
              ...Vn
            };
          Da.flushSync(() => s.current.setNodes(et => (Cn.assertCurrent(), [...et, Ue]))), k.current && It(Jn);
        }
      } catch (un) {
        k.current && y(un instanceof Error ? un.message : "素材导入失败");
      } finally {
        _.current = !1, k.current && v(!1);
      }
    },
    At = async Ct => {
      var Jn;
      if (_.current || a) return;
      const Cn = s.current.nodes.find(Kn => {
        var en;
        return ((en = Kn.settings) == null ? void 0 : en.studioHistoryId) === Ct.id;
      });
      if (Cn) {
        It(Cn.id);
        return;
      }
      _.current = !0, v(!0);
      const un = i.lease();
      try {
        const Kn = await URt(Ct);
        if (un.assertCurrent(), !Kn) throw new Error("原始素材暂不可用，请检查缓存目录或 OSS 连接。");
        const en = {
          ...Ki(crypto.randomUUID(), "input-image", -280, 80, ((Jn = Ct.prompt) == null ? void 0 : Jn.slice(0, 40)) || "历史素材"),
          content: Kn.content,
          settings: {
            ...Kn.settings,
            studioHistoryId: Ct.id
          }
        };
        Da.flushSync(() => s.current.setNodes(Vn => un.isCurrent() ? [...Vn, en] : Vn)), k.current && (It(en.id), y("已添加历史作品作为参考。"));
      } catch (Kn) {
        k.current && y(Kn instanceof Error ? Kn.message : "历史素材读取失败");
      } finally {
        _.current = !1, k.current && v(!1);
      }
    },
    Yt = Ct => {
      var un, Jn;
      if (!pDe($e(Ct))) return;
      const Cn = s.current.document.lease();
      Cn.isCurrent() && ((un = Ct.settings) != null && un.studioImageToolHistoryId && ((Jn = e.setHistory) == null || Jn.call(e, Kn => Kn.map(en => {
        var Vn;
        return en.id === ((Vn = Ct.settings) == null ? void 0 : Vn.studioImageToolHistoryId) && en.studioImageTool ? {
          ...en,
          studioImageTool: {
            ...en.studioImageTool,
            dismissed: !0
          }
        } : en;
      }))), s.current.setNodes(Kn => Cn.isCurrent() ? Kn.filter(en => en.id !== Ct.id) : Kn), s.current.setConnections(Kn => Cn.isCurrent() ? Kn.filter(en => en.from !== Ct.id && en.to !== Ct.id) : Kn));
    },
    qe = (Ct, Cn, un, Jn, Kn, en = "above", Vn) => c.jsx(qs, {
      scopeId: "studio-generation",
      dropdownType: Ct,
      value: Cn,
      options: un.map((Tt, Ue) => ({
        value: Tt,
        label: (Vn == null ? void 0 : Vn[Ue]) || Tt
      })),
      translateLabels: Ct !== "session",
      isDark: t,
      activeDropdown: N,
      setActiveDropdown: G,
      onSelect: Jn,
      onOptionDismiss: Ct === "session" ? it : void 0,
      disabled: Ct === "session" && b,
      ariaLabel: x(Kn),
      menuPlacement: en,
      buttonVariant: "bare",
      menuClassName: "sg-popup",
      maxMenuHeight: 280
    }),
    kt = Ct => {
      P(Ct), M(!0), G(null);
    },
    St = Ct => oS(Ct) === "audio" ? c.jsx(sne, {
      size: 22
    }) : c.jsx(Qg, {
      entry: cfn(Ct)
    }),
    hn = Ne.slice(-U),
    Qt = g.useMemo(() => _0r(Ne.map(Ct => {
      const Cn = Ct.map(Jn => Re.get(Jn.id)),
        un = Cn.some(Jn => Jn.running);
      return {
        id: sm(Ct[0]).roundId,
        prompt: sm(Ct[0]).prompt,
        running: un,
        failed: !un && Cn.every(Jn => Jn.entries.length === 0 && !!Jn.error)
      };
    })), [Ne, Re]),
    Ot = Ct => {
      var Jn, Kn;
      be.current = null, ie.current = !1, xe(!1);
      const Cn = Ne.findIndex(en => {
        var Vn;
        return ((Vn = sm(en[0])) == null ? void 0 : Vn.roundId) === Ct;
      });
      if (Cn < 0) return;
      const un = Ne.length - Cn;
      un > U && Da.flushSync(() => H(un)), (Kn = (Jn = fe.current) == null ? void 0 : Jn.querySelector(`[data-round-id="${CSS.escape(Ct)}"]`)) == null || Kn.scrollIntoView({
        block: "start",
        behavior: "instant"
      });
    },
    ln = Ct => {
      var Kn, en;
      const Cn = [...rt].reverse().find(Vn => Ct ? pDe($e(Vn)) : $e(Vn).running);
      if (!Cn) return;
      be.current = null, ie.current = !1, xe(!1);
      const un = sm(Cn).createdAt,
        Jn = new Set(rt.filter(Vn => sm(Vn).createdAt >= un).map(Vn => sm(Vn).roundId)).size;
      Da.flushSync(() => {
        S("all"), I(""), H(Math.max(20, Jn));
      }), (en = (Kn = fe.current) == null ? void 0 : Kn.querySelector(`[data-round-id="${CSS.escape(sm(Cn).roundId)}"]`)) == null || en.scrollIntoView({
        block: "start",
        behavior: "instant"
      });
    },
    Pn = () => {
      const Ct = fe.current,
        Cn = Ct && Array.from(Ct.querySelectorAll("[data-round-id]")).find(un => un.getBoundingClientRect().bottom > Ct.getBoundingClientRect().top);
      be.current = Cn ? {
        element: Cn,
        top: Cn.getBoundingClientRect().top
      } : null, ie.current = !1, xe(!1), Da.flushSync(() => H(un => un + 20)), Ct && be.current && (Ct.scrollTop += be.current.element.getBoundingClientRect().top - be.current.top);
    },
    rn = () => {
      be.current = null, ae.current = !0;
    };
  return c.jsxs("section", {
    className: "studio-generation",
    "aria-label": x("言绘"),
    "data-chat-file-drop-zone": "studio-generation",
    onDragOver: Ct => {
      Ct.preventDefault(), Ct.stopPropagation();
    },
    onDrop: Ct => {
      Ct.preventDefault(), Ct.stopPropagation(), _t(Array.from(Ct.dataTransfer.files));
    },
    children: [c.jsxs("header", {
      className: "sg-header",
      children: [c.jsxs("div", {
        className: "sg-heading",
        children: [c.jsx("div", {
          id: "studio-generation-switch-slot",
          className: "sg-switch-slot"
        }), qe("session", d, Te, Ve, "创作会话", "below", Te.map(Ct => {
          var Cn;
          return ((Cn = ve.find(un => un.id === Ct)) == null ? void 0 : Cn.title) || x("新的创作");
        })), c.jsx("button", {
          "aria-label": x("新建创作会话"),
          title: x("新建创作"),
          disabled: b,
          onClick: () => Ve(crypto.randomUUID()),
          children: c.jsx(eo, {
            size: 15
          })
        })]
      }), c.jsxs("div", {
        className: "sg-header-actions",
        children: [o === xoe && c.jsx("button", {
          type: "button",
          className: "scl-save-entry",
          disabled: a,
          onClick: Ze,
          children: "保存到项目库"
        }), c.jsxs("label", {
          className: "sg-search",
          children: [c.jsx(mc, {
            size: 14
          }), c.jsx("input", {
            "aria-label": x("搜索创作记录"),
            placeholder: x("搜索创作"),
            value: C,
            onChange: Ct => I(Ct.target.value)
          })]
        }), qe("filter", A, ["all", "image", "video", "favorites"], S, "筛选作品", "below", ["全部作品", "图片", "视频", "已收藏"]), c.jsxs("button", {
          className: "sg-history-trigger",
          "aria-label": x("生成历史"),
          "aria-expanded": E && T === "history",
          "aria-controls": "sg-asset-sidebar",
          onClick: () => E && T === "history" ? M(!1) : kt("history"),
          children: [c.jsx(Wv, {
            size: 15
          }), x("生成历史")]
        })]
      })]
    }), c.jsxs("div", {
      className: "sg-workspace",
      children: [c.jsxs("div", {
        className: "sg-main",
        children: [c.jsxs("div", {
          className: "sg-feed-wrap",
          children: [c.jsx("div", {
            className: "sg-feed",
            ref: fe,
            onWheel: Ct => {
              rn(), Ct.deltaY < 0 && (ie.current = !1);
            },
            onPointerDown: rn,
            onTouchStart: rn,
            onKeyDown: rn,
            onScroll: Ct => {
              const Cn = Ct.currentTarget,
                un = Cn.scrollHeight - Cn.scrollTop - Cn.clientHeight < 80;
              ae.current && (ie.current = un, un && (ae.current = !1)), xe(un);
            },
            children: a ? c.jsxs("div", {
              className: "sg-empty",
              children: [c.jsx(Ua, {
                className: "sg-spin"
              }), c.jsx("h2", {
                children: x("正在读取创作记录")
              }), e.storageError && c.jsx("p", {
                role: "alert",
                children: x(e.storageError)
              })]
            }) : Ne.length ? c.jsxs("div", {
              className: "sg-rounds",
              ref: ye,
              children: [Ne.length > U && c.jsx("button", {
                className: "sg-load-more",
                onClick: Pn,
                children: x("加载更早的创作")
              }), hn.map((Ct, Cn) => {
                var et, ft, ht, wt, jt, bt, Bt, wn, at, Pt;
                const un = sm(Ct[0]),
                  Jn = (et = un.references) != null && et.length ? un.references : ((ft = un.draft) == null ? void 0 : ft.references) || [],
                  Kn = l.find(dt => {
                    var xt;
                    return dt.id === ((xt = Ct[0].settings) == null ? void 0 : xt.model);
                  }),
                  en = String(((ht = un.draft) == null ? void 0 : ht.ratio) || ((wt = Ct[0].settings) == null ? void 0 : wt.ratio) || ""),
                  Vn = String(((jt = un.draft) == null ? void 0 : jt.resolution) || ((bt = Ct[0].settings) == null ? void 0 : bt.resolution) || ""),
                  Tt = Ct[0].type === "gen-video" ? String(((Bt = un.draft) == null ? void 0 : Bt.duration) || ((wn = Ct[0].settings) == null ? void 0 : wn.duration) || "") : "",
                  Ue = String(((at = un.draft) == null ? void 0 : at.platformGroup) || ((Pt = Ct[0].settings) == null ? void 0 : Pt.platformGroup) || "");
                return c.jsx(Wso, {
                  feed: fe,
                  roundId: un.roundId,
                  eager: Cn >= hn.length - 4,
                  children: () => {
                    var dt, xt;
                    return c.jsxs(c.Fragment, {
                      children: [c.jsxs("div", {
                        className: "sg-sent-header",
                        children: [Jn.length > 0 && c.jsx("div", {
                          className: "sg-sent-refs",
                          "aria-label": x("参考图"),
                          children: Jn.map(yn => {
                            const gn = Me.get(yn.nodeId);
                            return c.jsx("span", {
                              className: "sg-sent-ref",
                              title: (gn == null ? void 0 : gn.nodeName) || x("参考 {0}", yn.label),
                              children: gn ? St(gn) : c.jsx(mu, {
                                size: 14
                              })
                            }, `${yn.nodeId}-${yn.label}`);
                          })
                        }), c.jsxs("div", {
                          className: "sg-sent-description",
                          children: [c.jsx("p", {
                            className: "sg-prompt-copy",
                            children: un.prompt
                          }), c.jsxs("div", {
                            className: "sg-round-meta",
                            children: [c.jsx("span", {
                              className: "sg-model-kind",
                              children: x(Vso(dme(Ct[0])))
                            }), c.jsxs("span", {
                              className: "sg-model-name",
                              children: [c.jsx(Mp, {
                                modelId: (Kn == null ? void 0 : Kn.id) || String(((dt = Ct[0].settings) == null ? void 0 : dt.model) || ""),
                                config: Kn,
                                kind: dme(Ct[0]) === "3d" ? "image" : dme(Ct[0]) === "music" ? "music" : dme(Ct[0]) === "video" ? "video" : "image",
                                isDark: t,
                                size: 14,
                                fallback: Ct[0].type === "gen-music" ? c.jsx(sne, {
                                  size: 14
                                }) : Ct[0].type === "gen-3d" ? c.jsx(Hm, {
                                  size: 14
                                }) : Ct[0].type === "gen-video" ? c.jsx(Oo, {
                                  size: 14
                                }) : c.jsx(FM, {
                                  size: 14
                                })
                              }), Fe(Ct[0]) || (Kn ? Qlt(Kn) : String(((xt = Ct[0].settings) == null ? void 0 : xt.model) || "模型不可用"))]
                            }), en && c.jsx("span", {
                              children: en
                            }), Vn && c.jsx("span", {
                              children: Vn
                            }), Tt && c.jsx("span", {
                              children: Tt
                            }), Ue && c.jsx("span", {
                              children: lfn(Ue)
                            })]
                          })]
                        })]
                      }), c.jsx("div", {
                        className: "sg-results",
                        style: {
                          "--sg-result-count": Ct.length
                        },
                        children: Ct.map(yn => {
                          var qn, Dn;
                          const {
                              entries: gn
                            } = $e(yn),
                            mt = yn.type === "gen-music" ? Gso(yn) : "",
                            Xt = mt ? [{
                              id: yn.id,
                              createdAt: un.createdAt,
                              mediaType: "image",
                              content: mt,
                              originalUrl: mt,
                              thumbnailUrl: mt,
                              assetId: String(((qn = yn.settings) == null ? void 0 : qn._assetId) || ((Dn = yn.settings) == null ? void 0 : Dn._localCacheAssetId) || yn._contentAssetId || "") || void 0,
                              generatedImages: []
                            }] : [],
                            Gn = yn.type === "gen-music" ? Xt : gn,
                            rr = A === "favorites" ? Gn.filter(Ar => sfn(yn, Ar)) : Gn;
                          return c.jsx("div", {
                            className: "sg-result",
                            children: rr.length ? c.jsx("div", {
                              className: "sg-result-media",
                              children: rr.map(Ar => {
                                const _r = q[Ar.id],
                                  Pa = sfn(yn, Ar);
                                return c.jsxs("div", {
                                  className: "sg-result-item",
                                  "data-result-id": Ar.id,
                                  children: [yn.type === "gen-music" ? c.jsxs("div", {
                                    className: "sg-audio",
                                    children: [c.jsx(sne, {
                                      size: 18
                                    }), c.jsx("audio", {
                                      src: mt,
                                      controls: !0,
                                      preload: "metadata"
                                    })]
                                  }) : c.jsxs("div", {
                                    className: "sg-image-result",
                                    children: [c.jsx("button", {
                                      className: "sg-media-button",
                                      "data-node-id": `studio-${Ar.id}`,
                                      "aria-label": x("放大查看作品"),
                                      onPointerEnter: sT,
                                      onFocus: sT,
                                      onClick: fa => {
                                        (Ar.mediaType === "video" || fa.detail === 0) && Ye(yn, Ar, fa.currentTarget);
                                      },
                                      onDoubleClick: fa => {
                                        Ar.mediaType === "image" && Ye(yn, Ar, fa.currentTarget);
                                      },
                                      children: c.jsx(Qg, {
                                        entry: Ar,
                                        suspended: !!(L || de)
                                      })
                                    }), yn.type === "gen-image" && Ar.mediaType === "image" && c.jsx(zso, {
                                      disabled: !!J || !e.onImageTool,
                                      onOpen: fa => void pt(fa, yn, Ar)
                                    })]
                                  }), c.jsxs("div", {
                                    className: "sg-result-actions",
                                    children: [yn.type !== "gen-music" && c.jsxs("button", {
                                      onClick: () => nn(yn, h.kind, Ar),
                                      children: [c.jsx(mu, {
                                        size: 14
                                      }), x("用作参考")]
                                    }), yn.type === "gen-image" && c.jsxs("button", {
                                      onClick: () => nn(yn, "video", Ar),
                                      children: [c.jsx(Oo, {
                                        size: 14
                                      }), x("转视频")]
                                    }), c.jsx("button", {
                                      "aria-label": _r === void 0 ? x("下载作品") : x("下载中 {0}%", _r),
                                      disabled: _r !== void 0,
                                      onClick: () => void Ut(Ar.id, [Ar], yn.type === "gen-music" ? "audio" : void 0),
                                      children: _r === void 0 ? c.jsx(ws, {
                                        size: 14
                                      }) : c.jsxs(c.Fragment, {
                                        children: [c.jsx(Ua, {
                                          size: 14,
                                          className: "sg-spin"
                                        }), _r > 0 ? `${_r}%` : null]
                                      })
                                    }), c.jsx(RFe, {
                                      className: `sg-result-more${Pa ? " is-favorite" : ""}`,
                                      label: x("作品更多操作"),
                                      icon: J === Ar.id ? c.jsx(Ua, {
                                        size: 14,
                                        className: "sg-spin"
                                      }) : void 0,
                                      items: [...(yn.type === "gen-image" ? [{
                                        id: "edit",
                                        label: "去改图",
                                        icon: c.jsx(_5e, {
                                          size: 14
                                        }),
                                        disabled: !!J
                                      }] : []), ...(e.onSendToCanvas && yn.type !== "gen-3d" ? [{
                                        id: "canvas",
                                        label: "发送到画布",
                                        icon: c.jsx(zu, {
                                          size: 14
                                        }),
                                        disabled: !!J
                                      }] : []), {
                                        id: "favorite",
                                        label: Pa ? "取消收藏" : "收藏",
                                        icon: c.jsx(CP, {
                                          size: 14,
                                          fill: Pa ? "currentColor" : "none"
                                        })
                                      }, {
                                        id: "info",
                                        label: "生成信息",
                                        icon: c.jsx(JHe, {
                                          size: 14
                                        })
                                      }],
                                      onChoose: fa => void gt(fa, yn, Ar, Gn)
                                    }), Pa && c.jsx(CP, {
                                      className: "sg-favorite-mark",
                                      size: 11,
                                      fill: "currentColor",
                                      "aria-label": x("已收藏")
                                    }), c.jsx("time", {
                                      children: new Date(un.createdAt).toLocaleString(ew(), {
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit"
                                      })
                                    })]
                                  }), _r !== void 0 && c.jsx("div", {
                                    className: `sg-download-track${_r > 0 ? "" : " is-wait"}`,
                                    role: "progressbar",
                                    "aria-valuemin": 0,
                                    "aria-valuemax": 100,
                                    "aria-valuenow": _r,
                                    "aria-label": x("下载进度"),
                                    children: c.jsx("i", {
                                      style: {
                                        width: `${_r}%`
                                      }
                                    })
                                  })]
                                }, Ar.id);
                              })
                            }) : c.jsx(qso, {
                              node: yn,
                              history: Ae.get(yn.id),
                              onEdit: () => {
                                var Ar;
                                return (Ar = yn.settings) != null && Ar.studioImageTool ? lt(yn) : Ht(yn);
                              },
                              onRetry: () => {
                                var Ar;
                                return (Ar = yn.settings) != null && Ar.studioImageTool ? lt(yn) : vt(Ht(yn));
                              },
                              onDismiss: () => Yt(yn)
                            })
                          }, yn.id);
                        })
                      }), c.jsxs("div", {
                        className: "sg-round-actions",
                        children: [c.jsx("button", {
                          onClick: () => {
                            var yn;
                            return (yn = Ct[0].settings) != null && yn.studioImageTool ? lt(Ct[0]) : Ht(Ct[0]);
                          },
                          children: x("重新编辑")
                        }), c.jsxs("button", {
                          disabled: Ct.some(yn => $e(yn).running),
                          onClick: () => {
                            var yn, gn;
                            return (yn = Ct[0].settings) != null && yn.studioImageTool ? lt(Ct[0]) : vt({
                              ...Ht(Ct[0]),
                              count: ((gn = un.draft) == null ? void 0 : gn.count) || Ct.length
                            });
                          },
                          children: [c.jsx(vd, {
                            size: 12
                          }), x("再次生成")]
                        })]
                      })]
                    });
                  }
                }, un.roundId);
              })]
            }) : c.jsxs("div", {
              className: "sg-empty",
              children: [c.jsx("h2", {
                children: C || A !== "all" ? x("还没有匹配的作品") : h.kind === "music" ? x("把一段描述，写成音乐") : h.kind === "3d" ? x("把一句话，做成模型") : h.kind === "video" ? x("把一句话，拍成视频") : x("把一句话，绘成画面")
              }), c.jsx("p", {
                children: h.kind === "music" ? x("写下风格、情绪和乐器。") : h.kind === "3d" ? x("写下物体，也可以拖入一张参考图。") : h.kind === "video" ? x("写下镜头与动作，也可以拖入参考素材。") : x("写下画面，也可以直接拖入参考素材。")
              }), !C && A === "all" && h.kind === "image" && c.jsx("div", {
                className: "sg-starters",
                children: ["电影感的雨夜街头，霓虹光映在积水中，低机位，宽银幕构图", "设计一张奇幻游戏角色设定图，统一呈现正面、侧面与背面，细腻材质", "极简产品摄影，暖白背景，柔和侧光，突出产品的质感与轮廓"].map((Ct, Cn) => c.jsxs("button", {
                  onClick: () => {
                    var un;
                    De({
                      prompt: Ct
                    }), (un = re.current) == null || un.focus();
                  },
                  children: [c.jsx("span", {
                    children: x(["电影画面", "角色设定", "产品视觉"][Cn])
                  }), c.jsx("span", {
                    children: x("试试这个想法 ↗")
                  })]
                }, Ct))
              })]
            })
          }), c.jsx(eYe, {
            items: Qt,
            isDark: t,
            onJump: Ct => Ot(Ct.id)
          }), !Ee && Ne.length > 0 && c.jsxs("button", {
            className: "sg-latest",
            onClick: () => {
              be.current = null, ae.current = !1, ie.current = !0, xe(!0), fe.current && (fe.current.scrollTop = fe.current.scrollHeight);
            },
            children: [c.jsx($ue, {
              size: 14
            }), x("回到最新作品")]
          })]
        }), c.jsxs("div", {
          className: "sg-bottom",
          children: [(nt > 0 || ze > 0) && c.jsxs("div", {
            className: "sg-task-dock",
            "aria-label": x("当前会话任务"),
            children: [c.jsx("span", {
              role: "status",
              children: nt > 0 ? x("{0} 个作品正在生成", nt) : x("有作品需要处理")
            }), c.jsxs("div", {
              children: [nt > 0 && c.jsxs("button", {
                onClick: () => ln(!1),
                children: [c.jsx(Ua, {
                  size: 13,
                  className: "sg-spin"
                }), x("查看进度")]
              }), ze > 0 && c.jsxs("button", {
                className: "sg-task-failed",
                onClick: () => ln(!0),
                children: [ze, x(" 个未完成 · 查看")]
              })]
            })]
          }), c.jsxs("div", {
            className: "sg-composer-shell",
            children: [c.jsxs("div", {
              "data-chat-file-drop-zone": "studio-generation",
              className: `sg-composer${z ? " is-dragging" : ""}`,
              onPasteCapture: Ct => {
                const Cn = Array.from(Ct.clipboardData.files);
                Cn.length && (Ct.preventDefault(), Ct.stopPropagation(), _t(Cn));
              },
              onDragEnd: () => {
                O.current = 0, V(!1);
              },
              onDragEnter: Ct => {
                Array.from(Ct.dataTransfer.types).includes("Files") && (Ct.preventDefault(), O.current++, V(!0));
              },
              onDragLeave: Ct => {
                Ct.preventDefault(), --O.current <= 0 && (O.current = 0, V(!1));
              },
              onDragOver: Ct => {
                Ct.preventDefault(), Ct.stopPropagation();
              },
              onDrop: Ct => {
                Ct.preventDefault(), Ct.stopPropagation(), O.current = 0, V(!1), _t(Array.from(Ct.dataTransfer.files));
              },
              children: [z && c.jsxs("div", {
                className: "sg-drop-hint",
                children: [c.jsx(ml, {
                  size: 22
                }), x("松开，添加为参考素材")]
              }), c.jsxs("div", {
                className: "sg-composer-content",
                children: [c.jsx(jpe, {
                  expanded: N == null ? void 0 : N.type.startsWith("ref-"),
                  disabled: b || a,
                  onAdd: () => {
                    var Ct;
                    return (Ct = X.current) == null ? void 0 : Ct.click();
                  },
                  items: h.references.map(Ct => {
                    const Cn = Me.get(Ct.nodeId);
                    return {
                      id: Ct.nodeId,
                      title: x("{0} · 点击插入 @{1}", (Cn == null ? void 0 : Cn.nodeName) || x("素材已删除"), Ct.label),
                      label: `@${Ct.label}`,
                      selectLabel: x("插入参考 {0}", Ct.label),
                      onSelect: () => Oe(Ct.label),
                      removeLabel: x("移除参考 {0}", Ct.label),
                      onRemove: () => st(Ct.nodeId),
                      preview: Cn ? St(Cn) : c.jsx(mu, {
                        size: 20
                      }),
                      details: c.jsxs(c.Fragment, {
                        children: [c.jsx("span", {
                          title: Cn == null ? void 0 : Cn.nodeName,
                          children: (Cn == null ? void 0 : Cn.nodeName) || x("素材已删除")
                        }), (h.videoMode === "frames" || h.videoMode === "mixed" || !h.videoMode && ge.frames) && Cn && oS(Cn) === "image" ? qe(`ref-${Ct.label}`, Ct.port, ["default", "veo_start", "veo_end"], un => De({
                          references: h.references.map(Jn => Jn.nodeId === Ct.nodeId ? {
                            ...Jn,
                            port: un
                          } : Jn)
                        }), x("参考 {0} 的用途", Ct.label), "above", ["普通参考", "首帧", "尾帧"]) : c.jsx("small", {
                          children: x(Cn ? {
                            image: "图片参考",
                            video: "视频参考",
                            audio: "音频参考"
                          }[oS(Cn)] : "请移除后重新添加")
                        })]
                      })
                    };
                  })
                }), c.jsx(_so, {
                  isDark: t,
                  draft: h,
                  nodes: n,
                  editorRef: re,
                  onChange: Ct => De({
                    prompt: Ct
                  }),
                  onSubmit: () => vt()
                }, d)]
              }), c.jsxs("div", {
                className: "sg-composer-bar",
                children: [c.jsxs("div", {
                  className: "sg-bar-left",
                  children: [c.jsx("button", {
                    className: "sg-icon-button",
                    "aria-label": x("添加本地素材"),
                    title: x("上传参考图片、视频或音频"),
                    onClick: () => {
                      var Ct;
                      return (Ct = X.current) == null ? void 0 : Ct.click();
                    },
                    disabled: b || a,
                    children: b ? c.jsx(Ua, {
                      size: 17,
                      className: "sg-spin"
                    }) : c.jsx(eo, {
                      size: 18
                    })
                  }), c.jsx("button", {
                    className: "sg-icon-button",
                    "aria-label": x("参考素材库"),
                    title: x("已导入素材与生成历史"),
                    onClick: () => kt("materials"),
                    children: c.jsx(FM, {
                      size: 16
                    })
                  }), c.jsx("span", {
                    className: "sg-toolbar-divider"
                  }), c.jsx(Th, {
                    scopeId: "studio-generation",
                    dropdownType: "model",
                    value: h.model,
                    models: l.filter(Ct => Ct.type === OV(h.kind)),
                    isDark: t,
                    activeDropdown: N,
                    setActiveDropdown: G,
                    onSelect: Ct => {
                      const Cn = l.find(un => un.id === Ct);
                      Cn && (p(un => pne(un, Cn)), y(""));
                    },
                    logoKind: h.kind === "3d" ? "image" : h.kind,
                    showChannelBar: !0,
                    channelKind: "gen",
                    menuPlacement: "above",
                    buttonVariant: "transparent",
                    buttonTitle: x("选择生成模型"),
                    className: "sg-model-picker",
                    menuClassName: "sg-popup sg-model-popup",
                    menuMaxHeight: 330
                  }), c.jsx(Aso, {
                    isDark: t,
                    draft: h,
                    model: he,
                    models: l,
                    activeDropdown: N,
                    setActiveDropdown: G,
                    onChange: De,
                    onSelectModel: Ct => {
                      p(Cn => pne(Cn, Ct)), y("");
                    }
                  })]
                }), c.jsxs("div", {
                  className: "sg-bar-right",
                  children: [nt > 0 && c.jsxs("span", {
                    className: "sg-muted",
                    children: [nt, x(" 个生成中")]
                  }), c.jsx("button", {
                    className: "sg-submit",
                    "aria-label": x("开始生成"),
                    disabled: a || b || !he || !h.prompt.trim() && !(h.kind === "3d" && h.references.length > 0),
                    onClick: () => vt(),
                    children: c.jsx(Gc, {
                      size: 18
                    })
                  })]
                })]
              })]
            }), c.jsxs("div", {
              className: "sg-composer-dock",
              children: [c.jsxs("div", {
                className: "sg-parameters",
                children: [c.jsx(E0r, {
                  isDark: t,
                  draft: h,
                  model: he,
                  activeDropdown: N,
                  setActiveDropdown: G,
                  onChange: Ct => Ct.videoMode ? p(Cn => (y(""), JJr(Cn, Ct.videoMode))) : De(Ct)
                }), (h.kind === "image" || h.kind === "video") && c.jsxs("label", {
                  className: "sg-b64-toggle",
                  title: x("图片改用 Base64 发送到 API，视频仍走链接"),
                  children: [c.jsx("input", {
                    type: "checkbox",
                    checked: h.ossImageBase64,
                    onChange: Ct => De({
                      ossImageBase64: Ct.target.checked
                    })
                  }), c.jsx("span", {
                    children: "B64"
                  })]
                }), he && he.id !== "codex-image" && c.jsxs("div", {
                  className: "sg-key-picker",
                  role: "group",
                  "aria-label": x("模型 Key 与平台分组"),
                  children: [c.jsx(fEt, {
                    size: 12
                  }), ue ? c.jsx(Ku, {
                    platformGroup: h.platformGroup || ko,
                    modelId: he.id,
                    modelConfigId: he.id,
                    modelName: he.modelName || he.id,
                    uiResolution: h.resolution,
                    isDark: t,
                    onGroupChange: Ct => De({
                      platformGroup: Ct
                    }),
                    persistModelSettings: !1,
                    buttonVariant: "bare",
                    menuPlacement: "above",
                    menuClassName: "sg-popup"
                  }) : c.jsx("button", {
                    type: "button",
                    title: x("在模型设置中管理此接口的 Key"),
                    onClick: () => gZ(OV(h.kind)),
                    children: x("模型 Key")
                  })]
                })]
              }), c.jsxs("div", {
                className: "sg-mode",
                role: "group",
                "aria-label": x("创作类型"),
                children: [c.jsxs("button", {
                  "aria-pressed": h.kind === "image",
                  onClick: () => Ft("image"),
                  children: [c.jsx(FM, {
                    size: 14
                  }), x("图片")]
                }), c.jsxs("button", {
                  "aria-pressed": h.kind === "video",
                  onClick: () => Ft("video"),
                  children: [c.jsx(Oo, {
                    size: 14
                  }), x("视频")]
                }), c.jsxs("button", {
                  "aria-pressed": h.kind === "music",
                  onClick: () => Ft("music"),
                  children: [c.jsx(sne, {
                    size: 14
                  }), x("音乐")]
                }), c.jsxs("button", {
                  "aria-pressed": h.kind === "3d",
                  onClick: () => Ft("3d"),
                  children: [c.jsx(Hm, {
                    size: 14
                  }), "3D"]
                })]
              })]
            }), c.jsx("input", {
              ref: X,
              type: "file",
              accept: "image/*,video/*,audio/*",
              multiple: !0,
              hidden: !0,
              onChange: Ct => {
                _t(Array.from(Ct.target.files || [])), Ct.target.value = "";
              }
            })]
          }), (e.storageError || f) && c.jsx("div", {
            className: "sg-footer",
            "aria-live": "polite",
            children: c.jsx("span", {
              className: "sg-notice",
              role: "status",
              children: x(e.storageError || f)
            })
          })]
        })]
      }), E && c.jsxs("aside", {
        id: "sg-asset-sidebar",
        className: "sg-asset-sidebar",
        "aria-label": x("参考素材库"),
        children: [c.jsxs("div", {
          className: "sg-asset-picker-head",
          children: [c.jsxs("div", {
            className: "sg-asset-tabs",
            children: [c.jsx("button", {
              "aria-pressed": T === "materials",
              onClick: () => P("materials"),
              children: x("我的素材")
            }), c.jsx("button", {
              "aria-pressed": T === "history",
              onClick: () => P("history"),
              children: x("生成历史")
            })]
          }), c.jsx("button", {
            "aria-label": x("关闭素材选择"),
            onClick: () => M(!1),
            children: c.jsx(Na, {
              size: 16
            })
          })]
        }), c.jsxs("label", {
          className: "sg-asset-search",
          children: [c.jsx(mc, {
            size: 14
          }), c.jsx("input", {
            "aria-label": x("搜索参考素材"),
            placeholder: x("搜索素材或提示词"),
            value: R,
            onChange: Ct => j(Ct.target.value)
          }), R && c.jsx("button", {
            "aria-label": x("清空素材搜索"),
            onClick: () => j(""),
            children: c.jsx(Na, {
              size: 13
            })
          })]
        }), c.jsx("div", {
          className: "sg-asset-types",
          role: "group",
          "aria-label": x("素材类型"),
          children: ["all", "image", "video", "audio"].map((Ct, Cn) => c.jsx("button", {
            "aria-pressed": B === Ct,
            onClick: () => F(Ct),
            children: x(["全部", "图片", "视频", "音频"][Cn])
          }, Ct))
        }), c.jsx("p", {
          className: "sg-muted",
          children: x(T === "history" ? "与画布共用历史，点击添加为参考，双击查看大图" : "独立保存的素材，点击添加为参考，双击查看大图")
        }), c.jsxs("div", {
          className: "sg-asset-scroll",
          children: [c.jsx("div", {
            className: "sg-asset-grid",
            children: T === "materials" ? c.jsxs(c.Fragment, {
              children: [c.jsxs("button", {
                className: "sg-import-tile",
                disabled: b || a,
                onClick: () => {
                  var Ct;
                  return (Ct = X.current) == null ? void 0 : Ct.click();
                },
                children: [c.jsx(eo, {
                  size: 22
                }), c.jsx("span", {
                  children: x("本地上传")
                })]
              }), Le.slice(0, W).map(Ct => {
                const Cn = h.references.some(Kn => Kn.nodeId === Ct.id),
                  un = cfn(Ct),
                  Jn = un.mediaType === "image" || un.mediaType === "video";
                return c.jsxs("button", {
                  title: Ct.nodeName || x("未命名素材"),
                  "aria-label": x("引用素材：{0}", Ct.nodeName || "未命名素材"),
                  "aria-pressed": Cn,
                  onClick: Kn => {
                    if (Kn.detail >= 2 && Jn) {
                      He(un, Kn.currentTarget, {
                        title: Ct.nodeName,
                        prompt: Ct.prompt
                      });
                      return;
                    }
                    Ce(() => It(Ct.id));
                  },
                  children: [St(Ct), c.jsx("span", {
                    className: "sg-asset-caption",
                    children: Ct.nodeName || x("未命名素材")
                  }), Cn && c.jsx("i", {
                    className: "sg-asset-selected",
                    children: c.jsx(io, {
                      size: 12
                    })
                  })]
                }, Ct.id);
              })]
            }) : Ke.slice(0, W).map(Ct => {
              const Cn = Xe.has(Ct.id),
                un = Ct.type === "image" || Ct.type === "video";
              return c.jsxs("button", {
                title: Ct.prompt || x("生成作品"),
                "aria-label": x("引用历史：{0}", Ct.prompt || "生成作品"),
                "aria-pressed": Cn,
                disabled: Ct.status !== "completed" || b || a,
                onClick: Jn => {
                  if (Jn.detail >= 2 && un) {
                    He(Ct.type === "video" ? i_e(Ct) : oFe(Ct), Jn.currentTarget, {
                      title: Ct.modelName,
                      prompt: Ct.prompt
                    });
                    return;
                  }
                  Ce(() => void At(Ct));
                },
                children: [Ct.type === "audio" ? c.jsx(sne, {
                  size: 24
                }) : c.jsx(Qg, {
                  entry: {
                    id: Ct.id,
                    createdAt: 0,
                    mediaType: Ct.type === "video" ? "video" : "image",
                    content: Ct.url,
                    originalUrl: Ct.originalUrl || Ct.url,
                    thumbnailUrl: Ct.thumbnailUrl || Ct.url,
                    videoPosterUrl: Ct.videoPosterUrl,
                    assetId: Ct._assetId,
                    generatedImages: []
                  }
                }), c.jsx("span", {
                  className: "sg-asset-caption",
                  children: Ct.prompt || x("生成作品")
                }), Cn ? c.jsx("i", {
                  className: "sg-asset-selected",
                  children: c.jsx(io, {
                    size: 12
                  })
                }) : Ct.status !== "completed" && c.jsx("small", {
                  className: "sg-asset-status",
                  children: Ct.status === "generating" ? x("生成中") : x("生成失败")
                })]
              }, Ct.id);
            })
          }), !(T === "history" ? Ke : Le).length && c.jsx("p", {
            className: "sg-asset-empty",
            children: x(R || B !== "all" ? "没有匹配的素材" : T === "history" ? "完成的作品会出现在这里" : "从电脑拖入图片、视频或音频")
          }), (T === "history" ? Ke : Le).length > W && c.jsx("button", {
            className: "sg-load-more",
            onClick: () => Q(Ct => Ct + 80),
            children: x("加载更多")
          })]
        })]
      })]
    }), L && Da.createPortal(c.jsx(h9, {
      item: L.item,
      openingMotion: L.motion,
      quickOpen: !0,
      showPromptCopy: !1,
      onClose: () => D(null),
      toastLoading: Uv,
      toastSuccess: Vs,
      toastError: qi,
      removeToast: gg
    }, L.item.id), document.body), de && c.jsx(Mso, {
      ...de,
      nodes: n,
      history: Ae.get(de.node.id),
      modelName: Fe(de.node) || Qlt(l.find(Ct => {
        var Cn;
        return Ct.id === ((Cn = de.node.settings) == null ? void 0 : Cn.model);
      })),
      groupLabel: lfn(String(((Yn = de.node.settings) == null ? void 0 : Yn.platformGroup) || ko)),
      onClose: () => le(null)
    })]
  });
}

const Qso = g.lazy(() => Ie(() => Promise.resolve().then(() => ISo), void 0, import.meta.url));

function Yso({
  host: e,
  models: t,
  apiConfigs: n,
  globalApiKey: r,
  history: a,
  setHistory: i,
  onSendToCanvas: o,
  workspaceId: s = xoe
}) {
  const l = s === xoe ? wUt : s,
    [d, u] = g.useState([]),
    [h, p] = g.useState([]),
    [m, f] = g.useState(!0),
    [y, b] = g.useState(""),
    [v] = g.useState(Ape),
    [_, w] = g.useState([]),
    k = g.useRef(_);
  k.current = _;
  const A = g.useRef(new Set()),
    S = g.useRef(new Set()),
    C = g.useRef(new Set());
  g.useEffect(() => () => {
    for (const H of C.current) URL.revokeObjectURL(H);
    C.current.clear();
  }, []);
  const I = g.useRef({
    nodes: d,
    connections: h
  });
  I.current = {
    nodes: d,
    connections: h
  };
  const E = g.useRef(Promise.resolve()),
    M = g.useRef(!1),
    T = g.useRef(new Map()),
    P = g.useCallback(() => {
      if (!M.current) return Promise.resolve();
      const H = I.current,
        Y = E.current.catch(() => {}).then(() => iso(H.nodes, H.connections, l));
      return E.current = Y, Y.then(() => b(""), K => b(`创作记录保存失败：${K instanceof Error ? K.message : String(K)}`)), Y;
    }, [l]);
  g.useEffect(() => gVe(P), [P]), g.useEffect(() => {
    let H = !0;
    v.activate(), aso(l, s).then(K => {
      H && (I.current = {
        nodes: K.nodes,
        connections: K.connections
      }, u(K.nodes), p(K.connections), M.current = !0, v.commit(s, !1), f(!1));
    }).catch(K => {
      H && b(`创作记录读取失败：${K instanceof Error ? K.message : String(K)}`);
    });
    const Y = () => {
      P().catch(() => {});
    };
    return window.addEventListener("pagehide", Y), () => {
      H = !1, v.dispose(), Y(), window.removeEventListener("pagehide", Y);
    };
  }, [v, P, l, s]), g.useEffect(() => {
    var K;
    if (m) return;
    const H = new Map();
    for (const W of d) {
      const Q = (K = sm(W)) == null ? void 0 : K.sessionId;
      Q && H.set(Q, [...(H.get(Q) || []), W]);
    }
    for (const [W, Q] of H) {
      const q = T.current.get(W);
      q && (q.length !== Q.length || Q.some((ne, de) => ne !== q[de])) && c2e("generation", `${s}:${W}`);
    }
    for (const W of T.current.keys()) H.has(W) || c2e("generation", `${s}:${W}`);
    T.current = H;
    const Y = window.setTimeout(() => {
      P().catch(() => {});
    }, 500);
    return () => window.clearTimeout(Y);
  }, [d, h, m, P]), g.useEffect(() => {
    if (!(m || s !== xoe)) return Msr(async (H, Y) => {
      const K = Rli(H, s);
      K.nodes = await hWn(K.nodes);
      const W = {
        nodes: [...I.current.nodes, ...K.nodes],
        connections: [...I.current.connections, ...K.connections]
      };
      I.current = W, u(W.nodes), p(W.connections), await P(), u0e(s, K.sessionId, K.draft);
      const Q = `qiaodoumayi_generation_sessions:${s}`,
        q = JSON.parse(localStorage.getItem(Q) || "[]");
      localStorage.setItem(Q, JSON.stringify([...q.filter(ne => ne.id !== K.sessionId), {
        id: K.sessionId,
        title: Y,
        time: Date.now()
      }])), localStorage.setItem(`qiaodoumayi_generation_session:${s}`, K.sessionId), i(ne => [...K.history, ...ne]), window.dispatchEvent(new CustomEvent(cUe, {
        detail: K.sessionId
      }));
    });
  }, [m, s, P, i]), g.useEffect(() => {
    let H = [];
    return fhr({
      deferIfBusy: !0,
      getNodes: () => H = I.current.nodes,
      setNodes: Y => {
        const K = typeof Y == "function" ? Y(H) : Y,
          W = new Map(H.map(q => [q.id, q])),
          Q = new Map(K.map(q => [q.id, q]));
        u(q => q.map(ne => ne === W.get(ne.id) && Q.get(ne.id) || ne));
      },
      toast: {
        error: Y => b(Y)
      }
    });
  }, []), T5e();
  const R = !!e,
    j = sso(d, a),
    B = g.useMemo(() => new Map(d.map(H => [H.id, H])), [d]),
    F = Epe({
      connections: h,
      nodesMap: B,
      dataVersion: 0
    }),
    N = g.useCallback((H, Y) => u(K => K.map(W => W.id === H ? eee(W, Y, !1) : W)), []),
    {
      generate: G,
      generationRunner: z,
      runEditImage: V,
      runExpandImage: O
    } = Ipe({
      apiConfigs: n,
      globalApiKey: r,
      nodes: d,
      nodesMap: B,
      connections: h,
      setNodes: u,
      setHistory: i,
      updateNode: N,
      getConnectedInputImages: F.connections.getConnectedInputImages,
      getConnectedInputItems: F.connections.getConnectedInputItems,
      getConnectedImageForInput: F.connections.getConnectedImageForInput,
      generateId: () => crypto.randomUUID(),
      canvasBackground: !1
    }, v);
  g.useEffect(() => u(H => Bso(H, a)), [a]);
  const L = g.useCallback(({
      tool: H,
      node: Y,
      entry: K,
      original: W,
      size: Q,
      ownedUrl: q,
      sessionId: ne
    }) => {
      var Z, re, fe;
      const de = v.lease();
      de.assertCurrent();
      const le = crypto.randomUUID(),
        J = COn({
          source: Y,
          entry: K,
          id: crypto.randomUUID(),
          existingNodes: I.current.nodes
        }),
        pe = Q.w / Q.h,
        ce = Math.min(620, 390 * pe);
      Object.assign(J, {
        content: W,
        x: 0,
        y: 0,
        width: ce,
        height: ce / pe
      }), J.settings = {
        ...J.settings,
        model: (Z = Y.settings) == null ? void 0 : Z.model,
        ratio: ((re = Y.settings) == null ? void 0 : re.ratio) || `${Q.w}:${Q.h}`,
        imageSize: `${Q.w}×${Q.h}`,
        _originalWidth: Q.w,
        _originalHeight: Q.h,
        studioImageToolSource: le
      };
      const we = H === "upscale" ? Ki(crypto.randomUUID(), "topaz-upscale", 0, 0, "图片增强", void 0, I.current.nodes) : null;
      we && (we.settings = {
        ...we.settings,
        superResMode: "image",
        ...(String(((fe = Y.settings) == null ? void 0 : fe.model) || "").startsWith("jimeng-cli-") ? {
          imageEnhanceProvider: "jimeng-cli"
        } : {})
      });
      const X = {
        id: le,
        tool: H,
        sourceId: J.id,
        toolNodeId: (we == null ? void 0 : we.id) || J.id,
        sessionId: ne,
        createdAt: Date.now(),
        ownedUrl: q
      };
      q && C.current.add(q), A.current.add(le), u(ye => de.isCurrent() ? [...ye, J, ...(we ? [we] : [])] : ye), we && p(ye => de.isCurrent() ? [...ye, {
        id: crypto.randomUUID(),
        from: J.id,
        to: we.id
      }] : ye), w(ye => [...ye.map(ie => ({
        ...ie,
        closed: !0
      })), X]);
    }, [v]),
    D = g.useCallback((H, Y) => {
      const K = k.current.find(W => W.id === H);
      if (!Y && K) {
        const W = new Set([K.sourceId, K.toolNodeId]);
        u(Q => Q.filter(q => !W.has(q.id))), p(Q => Q.filter(q => !W.has(q.from) && !W.has(q.to))), A.current.delete(H), K.ownedUrl && (URL.revokeObjectURL(K.ownedUrl), C.current.delete(K.ownedUrl));
      }
      w(W => W.flatMap(Q => Q.id !== H ? [Q] : Y && Q.tool !== "smart" && Q.tool !== "angle" ? [{
        ...Q,
        closed: !0
      }] : []));
    }, []),
    U = g.useCallback(H => w(Y => Y.filter(K => K.id !== H)), []);
  return g.useEffect(() => {
    if (!R) for (const H of k.current) {
      if (H.closed) continue;
      const Y = a.some(K => {
        var W;
        return ((W = K.studioImageTool) == null ? void 0 : W.requestId) === H.id;
      }) || I.current.nodes.some(K => {
        var W;
        return ((W = K.settings) == null ? void 0 : W.studioImageToolRequestId) === H.id || K.id === H.toolNodeId && K.isGenerating;
      });
      D(H.id, Y);
    }
  }, [R, D, a]), g.useEffect(() => {
    var H;
    for (const Y of d) {
      const K = String(((H = Y.settings) == null ? void 0 : H.studioImageToolRequestId) || "");
      if (!A.current.has(K) || S.current.has(Y.id) || Y.isGenerating || Cy(Y).length || Y.errorMsg) continue;
      S.current.add(Y.id);
      const W = v.lease();
      P().then(() => (W.assertCurrent(), G(Y))).catch(Q => {
        W.isCurrent() && N(Y.id, {
          isGenerating: !1,
          errorMsg: Q instanceof Error ? Q.message : "编辑任务未能启动"
        });
      });
    }
  }, [d, h, v, P, G, N]), c.jsxs(c.Fragment, {
    children: [R || j || _.length > 0 ? z : null, c.jsx(g.Suspense, {
      fallback: null,
      children: _.map(H => c.jsx(Qso, {
        request: R ? H : {
          ...H,
          closed: !0
        },
        nodes: d,
        connections: h,
        history: a,
        document: v,
        setNodes: u,
        setConnections: p,
        setHistory: i,
        models: t.filter(Y => Y.type === "Image" && Y.enabled !== !1),
        apiConfigs: n,
        globalApiKey: r,
        generate: G,
        runEditImage: V,
        runExpandImage: O,
        getConnectedInputImages: F.connections.getConnectedInputImages,
        onClose: D,
        onFinished: U
      }, H.id))
    }), e && Da.createPortal(c.jsx(Kso, {
      nodes: d,
      connections: h,
      history: a,
      models: t,
      workspaceId: s,
      loading: m,
      storageError: y,
      document: v,
      setNodes: u,
      setConnections: p,
      generate: G,
      beforeGenerate: P,
      apiConfigs: n,
      globalApiKey: r,
      setHistory: i,
      onSendToCanvas: o,
      onImageTool: L
    }), e)]
  });
}

const Xso = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: Yso
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  _oe = ["Auto", "1:1", "16:9", "9:16", "4:3", "3:4", "3:2", "2:3"],
  w5 = 5;

function D0r(e, t) {
  if (t <= 0) return !1;
  const n = e.trim();
  return /@\d+/.test(n) || /替换|换成|换为|改为|换掉|换走/.test(n);
}

function Jso(e, t) {
  const n = Math.max(2, Number(e) || 0),
    r = Math.max(0, Number(t) || 0);
  return r <= 0 ? n : n + r * 2;
}

function Zso(e, t, n) {
  const r = Math.max(1e-4, Number(n) || 1);
  return {
    width: Math.max(.5, Number(e) * r),
    feather: Math.max(0, Number(t) * r)
  };
}

function elo(e) {
  const t = Math.max(.5, Number(e) / 2);
  return Math.max(2, Math.min(t * 1.15, 74));
}

function tlo(e) {
  return Number.isFinite(e) ? Math.min(1, Math.max(0, e)) : 0;
}

const Zfe = new Map();

function nlo(e, t, n) {
  const r = Math.max(.5, Number(e) || .5),
    a = Math.max(0, Number(t) || 0),
    i = Math.min(1, Math.max(.05, Number(n) || 1)),
    o = `out:${Math.round(r)}:${Math.round(a)}:${Math.round(i * 20)}`,
    s = Zfe.get(o);
  if (s) return {
    canvas: s,
    drawSize: s._drawSize || s.width
  };
  const l = r + a,
    d = Math.max(2, Math.ceil(l * 2)),
    u = Math.min(d, 512),
    h = u / d,
    p = r * h,
    m = l * h,
    f = document.createElement("canvas");
  f.width = u, f.height = u, f._drawSize = d;
  const y = f.getContext("2d");
  if (!y) return {
    canvas: f,
    drawSize: d
  };
  const b = u / 2,
    v = u / 2;
  if (a > .25) {
    const _ = tlo(p / Math.max(1, m)),
      w = y.createRadialGradient(b, v, 0, b, v, m);
    w.addColorStop(0, `rgba(0,0,0,${i})`), w.addColorStop(Math.min(.995, _), `rgba(0,0,0,${i})`), w.addColorStop(1, "rgba(0,0,0,0)"), y.fillStyle = w, y.beginPath(), y.arc(b, v, m, 0, Math.PI * 2), y.fill();
  } else y.globalAlpha = i, y.fillStyle = "#000000", y.beginPath(), y.arc(b, v, p, 0, Math.PI * 2), y.fill();
  if (Zfe.set(o, f), Zfe.size > 24) {
    const _ = Zfe.keys().next().value;
    _ && Zfe.delete(_);
  }
  return {
    canvas: f,
    drawSize: d
  };
}

function rlo(e, t, n, r, a, i) {
  const {
    canvas: o,
    drawSize: s
  } = nlo(r, a, i);
  e.drawImage(o, t - s / 2, n - s / 2, s, s);
}

function alo(e) {
  let t = 0,
    n = !1,
    r = null,
    a = null;
  function i(l, d, u) {
    rlo(l, d.x, d.y, Math.max(.5, u.width / 2), Math.max(0, u.feather), Math.min(1, Math.max(.05, u.opacity / 100)));
  }
  function o(l) {
    var u;
    const d = (u = e()) == null ? void 0 : u.getContext("2d");
    if (d) {
      d.save();
      try {
        d.globalCompositeOperation = "destination-out", l(d);
      } finally {
        d.restore();
      }
    }
  }
  const s = {
    reset() {
      t++, n = !1, r = null, a = null;
    },
    load(l, d, u) {
      s.reset();
      const h = e();
      if (!h) return !1;
      h.width = d, h.height = u;
      const p = h.getContext("2d");
      return p ? (p.drawImage(l, 0, 0, d, u), n = !0, !0) : !1;
    },
    begin(l, d) {
      return n ? (t++, r = l, a = {
        ...d
      }, o(u => i(u, l, a)), !0) : !1;
    },
    move(l) {
      if (!n || !r || !a) return !1;
      const d = r,
        u = a,
        h = Math.hypot(l.x - d.x, l.y - d.y);
      return h < 1 ? !1 : (t++, r = l, o(p => {
        const m = Math.max(1, Math.ceil(h / elo(u.width)));
        for (let f = 1; f <= m; f++) {
          const y = f / m;
          i(p, {
            x: d.x + (l.x - d.x) * y,
            y: d.y + (l.y - d.y) * y
          }, u);
        }
      }), !0);
    },
    isDrawing() {
      return !!r;
    },
    finish() {
      const l = !!r;
      return r = null, a = null, l;
    },
    snapshotCurrent() {
      const l = t;
      return () => n && !r && t === l;
    }
  };
  return s;
}

async function ilo(e, t, n) {
  try {
    const r = await new Promise(a => e.toBlob(a, "image/png", .95));
    if (!r) throw new Error("橡皮图层导出失败");
    t ? await t.save(r) : n == null || n(r);
  } catch (r) {
    t ? t.fail(r) : console.error("Eraser canvas export failed", r);
  }
}

function olo(e, t) {
  const n = g.useRef(null),
    r = g.useRef({
      layer: e,
      ports: t
    }),
    [a, i] = g.useState(null),
    o = g.useRef(null),
    s = g.useMemo(() => alo(() => n.current), []),
    {
      content: l,
      isLoading: d
    } = Kp(e.content, {
      useThumbnail: !1,
      useOriginal: !0,
      preferConstantDisplay: !0,
      allowDirectOssUrl: !0,
      allowSessionBlob: !0,
      nodeType: "input-image"
    });
  g.useLayoutEffect(() => {
    r.current = {
      layer: e,
      ports: t
    };
  });
  const u = () => {
    o.current !== null && clearTimeout(o.current), o.current = null;
  };
  return g.useLayoutEffect(() => {
    let h = !1;
    if (u(), s.reset(), i(null), !l || d) return;
    const p = new Image();
    return p.crossOrigin = "anonymous", p.onload = () => {
      if (h) return;
      const m = r.current.layer,
        f = Math.max(1, Math.round(m.resultWidth || p.naturalWidth || p.width || m.bounds.width)),
        y = Math.max(1, Math.round(m.resultHeight || p.naturalHeight || p.height || m.bounds.height));
      s.load(p, f, y) && i({
        width: f,
        height: y
      });
    }, p.src = l, () => {
      h = !0, p.onload = null, u(), s.reset();
    };
  }, [e.id, e.content, e.resultWidth, e.resultHeight, l, d, s]), g.useEffect(() => {
    var h, p;
    a && ((p = (h = r.current.ports).onReady) == null || p.call(h));
  }, [a]), {
    canvas: n,
    size: a,
    session: s,
    cancelSave: u,
    scheduleSave() {
      u();
      const h = r.current.ports,
        p = s.snapshotCurrent();
      o.current = setTimeout(() => {
        var f;
        if (o.current = null, !p() || !n.current) return;
        const m = (f = h.prepareSave) == null ? void 0 : f.call(h, p);
        ilo(n.current, m, y => {
          var b;
          p() && ((b = h.onSave) == null || b.call(h, y));
        });
      }, 120);
    }
  };
}

function slo(e) {
  var m, f;
  const t = olo(e.layer, e),
    n = g.useRef(null),
    r = ((m = t.size) == null ? void 0 : m.width) || 1,
    a = ((f = t.size) == null ? void 0 : f.height) || 1,
    i = XFt(e.layer.bounds, r, a),
    o = GRi(i, e.nodeWidth, e.nodeHeight, e.naturalWidth, e.naturalHeight),
    s = Zso(e.eraserBrushWidth, e.eraserBrushFeather, r / Math.max(1, i.width)),
    l = Math.max(8, s.width / r * o.width),
    d = Math.max(l, Jso(l, s.feather / r * o.width));
  function u() {
    n.current && (n.current.style.display = "none");
  }
  function h(y) {
    if (!t.size) return null;
    const b = y.currentTarget.getBoundingClientRect(),
      v = y.clientX - b.left,
      _ = y.clientY - b.top;
    if (v < 0 || _ < 0 || v > b.width || _ > b.height) return u(), null;
    const w = v / Math.max(1, b.width),
      k = _ / Math.max(1, b.height);
    return n.current && (n.current.style.display = "block", n.current.style.left = `${w * 100}%`, n.current.style.top = `${k * 100}%`), {
      x: w * r,
      y: k * a
    };
  }
  function p() {
    t.session.finish() && t.scheduleSave();
  }
  return c.jsxs("div", {
    className: "absolute z-40 overflow-hidden rounded-2xl",
    style: {
      visibility: t.size ? "visible" : "hidden",
      pointerEvents: t.size ? "auto" : "none",
      left: `${o.left / e.nodeWidth * 100}%`,
      top: `${o.top / e.nodeHeight * 100}%`,
      width: `${o.width / e.nodeWidth * 100}%`,
      height: `${o.height / e.nodeHeight * 100}%`
    },
    onMouseDown: y => y.stopPropagation(),
    onContextMenu: y => y.preventDefault(),
    onPointerDown: y => {
      var v, _;
      if (y.button !== 0) return;
      const b = h(y);
      b && (y.preventDefault(), y.stopPropagation(), (_ = (v = y.currentTarget).setPointerCapture) == null || _.call(v, y.pointerId), t.cancelSave(), t.session.begin(b, {
        width: s.width,
        feather: s.feather,
        opacity: e.eraserBrushOpacity
      }));
    },
    onPointerMove: y => {
      const b = h(y);
      !b || !t.session.isDrawing() || (y.preventDefault(), t.session.move(b));
    },
    onPointerUp: y => {
      var b, v;
      (v = (b = y.currentTarget).releasePointerCapture) == null || v.call(b, y.pointerId), p();
    },
    onPointerCancel: p,
    onPointerLeave: () => {
      u(), p();
    },
    children: [c.jsx("canvas", {
      ref: t.canvas,
      className: "block h-full w-full max-w-none"
    }), c.jsxs("div", {
      ref: n,
      className: "pointer-events-none absolute",
      style: {
        display: "none"
      },
      children: [d > l + 1 && c.jsx("div", {
        className: "absolute rounded-full border border-dashed border-white/55",
        style: {
          width: d,
          height: d,
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 0 1px rgba(0,0,0,0.35)"
        }
      }), c.jsx("div", {
        className: "absolute rounded-full border border-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.65)]",
        style: {
          width: l,
          height: l,
          transform: "translate(-50%, -50%)",
          backgroundColor: `rgba(255,255,255,${Math.max(.06, Math.min(.28, e.eraserBrushOpacity / 250))})`
        }
      })]
    })]
  });
}

const AAe = ({
    inline: e = !1,
    open: t,
    anchorRef: n,
    isDark: r,
    placement: a = "above",
    align: i = "left",
    gap: o = 4,
    className: s = "",
    menuMinWidth: l,
    matchAnchorWidth: d = !0,
    dataPortalAttr: u,
    unstyled: h = !1,
    header: p,
    children: m
  }) => {
    on();
    const f = g.useRef(null),
      y = p != null,
      b = g.useCallback(() => {
        const k = n.current,
          A = f.current;
        if (!k || !A || !t) return;
        const S = k.getBoundingClientRect();
        if (A.style.position = "fixed", A.style.zIndex = "10200", A.style.minWidth = `${d ? Math.max(S.width, l ?? 192) : l ?? 192}px`, l != null ? A.style.width = `${Math.max(S.width, l)}px` : A.style.width = "", A.style.maxWidth = "calc(100vw - 16px)", i === "center" ? (A.style.left = `${S.left + S.width / 2}px`, A.style.transform = "translateX(-50%)") : (A.style.left = `${S.left}px`, A.style.transform = ""), a === "left" ? (A.style.right = `${window.innerWidth - S.left + o}px`, A.style.left = "", A.style.top = `${S.top}px`, A.style.bottom = "", A.style.transform = "") : a === "right" ? (A.style.left = `${S.right + o}px`, A.style.right = "", A.style.top = `${S.top}px`, A.style.bottom = "", A.style.transform = "") : a === "above" ? (A.style.right = "", A.style.bottom = `${window.innerHeight - S.top + o}px`, A.style.top = "") : (A.style.right = "", A.style.top = `${S.bottom + o}px`, A.style.bottom = ""), y && (a === "above" || a === "below")) {
          const I = a === "above" ? S.top - o - 8 : window.innerHeight - S.bottom - o - 8;
          A.style.height = `${Math.round(Math.min(Math.max(I, 120), 360))}px`;
        } else A.style.height = "";
      }, [t, n, a, i, o, l, d, y]);
    if (g.useLayoutEffect(() => {
      if (!t || e) return;
      b();
      let k = 0;
      const A = () => {
        b(), k = requestAnimationFrame(A);
      };
      return k = requestAnimationFrame(A), () => cancelAnimationFrame(k);
    }, [t, e, b]), !t || typeof document > "u") return null;
    const v = u ? {
        [u]: "true"
      } : {},
      _ = p != null,
      w = c.jsxs("div", {
        ref: f,
        ...v,
        className: h ? s : `node-dropdown-menu rounded-lg shadow-xl border ${_ ? "flex min-h-0 flex-col overflow-hidden" : ""} ${r ? "bg-[#1f1f1f] border-zinc-700" : "bg-white border-zinc-200"} ${s}`,
        style: e ? {
          pointerEvents: "auto",
          position: "absolute",
          top: `calc(100% + ${o}px)`,
          left: "50%",
          width: "100%",
          transform: "translateX(-50%)",
          zIndex: 10200
        } : {
          pointerEvents: "auto"
        },
        onClick: k => k.stopPropagation(),
        onPointerDown: k => k.stopPropagation(),
        onMouseDown: k => k.stopPropagation(),
        onDoubleClick: k => {
          k.preventDefault(), k.stopPropagation();
        },
        onWheel: k => k.stopPropagation(),
        children: [_ ? c.jsx("div", {
          className: "shrink-0",
          children: p
        }) : null, _ ? c.jsx("div", {
          "data-dropdown-list-scroll": !0,
          "data-scrollable": "true",
          className: "min-h-0 flex-1 overflow-y-auto overscroll-contain scrollbar-hide",
          children: m
        }) : m]
      });
    return e ? w : Da.createPortal(w, document.body);
  },
  llo = ({
    layer: e,
    boundsOverride: t,
    nodeWidth: n,
    nodeHeight: r,
    naturalWidth: a,
    naturalHeight: i,
    canvasNodeId: o
  }) => {
    on();
    const {
      content: s
    } = Kp(e.content, {
      useThumbnail: !1,
      useOriginal: !0,
      preferConstantDisplay: !0,
      allowDirectOssUrl: !0,
      allowSessionBlob: !0,
      nodeType: "input-image",
      canvasNodeId: o
    });
    if (!s || e.visible === !1) return null;
    const l = t ?? e.bounds,
      d = e.resultWidth || 0,
      u = e.resultHeight || 0,
      h = $Ri(l, d, u, n, r, a, i),
      p = /^https?:\/\//i.test(e.content) ? e.content : "";
    return c.jsx("img", {
      src: s,
      alt: e.name,
      className: "absolute object-contain",
      style: {
        ...h,
        opacity: (e.opacity ?? 100) / 100,
        pointerEvents: "none"
      },
      draggable: !1,
      onError: m => {
        !p || m.currentTarget.src === p || (m.currentTarget.src = p);
      }
    });
  },
  dfn = ({
    containerRef: e,
    bounds: t,
    nodeWidth: n,
    nodeHeight: r,
    naturalWidth: a,
    naturalHeight: i,
    onPreviewBounds: o,
    onCommitBounds: s
  }) => {
    on();
    const l = g.useRef(t);
    l.current = t;
    const d = g.useRef(null);
    g.useEffect(() => () => {
      var m;
      (m = d.current) == null || m.call(d), d.current = null;
    }, []);
    const u = a$e(t, n, r, a, i),
      h = g.useCallback((m, f) => {
        const y = e.current;
        return !y || !n || !r || !a || !i ? null : HRi({
          clientX: m,
          clientY: f
        }, y.getBoundingClientRect(), n, r, a, i);
      }, [e, n, r, a, i]),
      p = m => {
        var w;
        if (m.button !== 0) return;
        m.preventDefault(), m.stopPropagation();
        const f = h(m.clientX, m.clientY);
        if (!f) return;
        (w = d.current) == null || w.call(d);
        const y = {
          ...l.current
        };
        document.body.style.cursor = "move", document.body.style.userSelect = "none";
        const b = k => {
            k.preventDefault(), k.stopPropagation();
            const A = h(k.clientX, k.clientY);
            if (!A) return;
            const S = wun({
              ...y,
              x: y.x + (A.x - f.x),
              y: y.y + (A.y - f.y)
            }, a, i);
            o(S);
          },
          v = () => {
            document.removeEventListener("mousemove", b, !0), document.removeEventListener("mouseup", _, !0), document.body.style.cursor = "", document.body.style.userSelect = "", d.current = null;
          },
          _ = k => {
            k.preventDefault(), k.stopPropagation(), v();
            const A = h(k.clientX, k.clientY);
            if (o(null), !A) return;
            const S = wun({
              ...y,
              x: y.x + (A.x - f.x),
              y: y.y + (A.y - f.y)
            }, a, i);
            (S.x !== y.x || S.y !== y.y) && s(S);
          };
        d.current = () => {
          v(), o(null);
        }, document.addEventListener("mousemove", b, !0), document.addEventListener("mouseup", _, !0);
      };
    return c.jsxs(c.Fragment, {
      children: [c.jsx("div", {
        "data-edit-image-layer-move": "true",
        "data-edit-image-move-surface": "true",
        className: "absolute inset-0 z-[100] cursor-move touch-none",
        style: {
          pointerEvents: "auto"
        },
        title: x("拖动移动当前图层"),
        onMouseDown: p,
        onDoubleClick: m => {
          m.preventDefault(), m.stopPropagation();
        }
      }), c.jsx("div", {
        className: "pointer-events-none absolute z-[101] rounded-sm ring-2 ring-red-500/90 shadow-[0_0_0_1px_rgba(255,255,255,0.35)]",
        style: u,
        "aria-hidden": !0
      })]
    });
  },
  ufn = ({
    isDark: e,
    brushWidth: t,
    brushOpacity: n,
    brushFeather: r,
    onBrushWidth: a,
    onBrushOpacity: i,
    onBrushFeather: o,
    onClear: s,
    compact: l = !1
  }) => (on(), c.jsxs("div", {
    className: `flex items-center gap-3 ${l ? "m-0 flex-nowrap border-0 bg-transparent px-2 py-1" : `mt-2 flex-wrap rounded-full border px-3 py-2 ${e ? "border-white/10 bg-[#1f1f1f]/90" : "border-zinc-200 bg-zinc-50"}`}`,
    onMouseDown: d => d.stopPropagation(),
    onPointerDown: d => d.stopPropagation(),
    children: [c.jsx("button", {
      type: "button",
      className: `flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${e ? "text-zinc-300 hover:bg-white/10" : "text-zinc-600 hover:bg-zinc-200"}`,
      title: x("清空涂抹"),
      onClick: s,
      children: c.jsx(Qo, {
        size: 15
      })
    }), c.jsx("div", {
      className: `h-5 w-px shrink-0 ${e ? "bg-white/15" : "bg-zinc-300"}`
    }), c.jsxs("label", {
      className: `flex ${l ? "w-[132px]" : "min-w-[7rem] flex-1"} items-center gap-2 text-[11px] ${e ? "text-zinc-300" : "text-zinc-600"}`,
      children: [c.jsx("span", {
        className: "shrink-0",
        children: x("大小")
      }), c.jsx("span", {
        className: "w-6 shrink-0 tabular-nums",
        children: t
      }), c.jsx("input", {
        type: "range",
        min: 8,
        max: 120,
        value: t,
        onChange: d => a(Number(d.target.value)),
        className: `h-1.5 min-w-0 flex-1 ${e ? "accent-sky-400" : "accent-sky-600"}`
      })]
    }), c.jsxs("label", {
      className: `flex ${l ? "w-[154px]" : "min-w-[7rem] flex-1"} items-center gap-2 text-[11px] ${e ? "text-zinc-300" : "text-zinc-600"}`,
      children: [c.jsx("span", {
        className: "shrink-0",
        children: x("透明度")
      }), c.jsxs("span", {
        className: "w-8 shrink-0 tabular-nums",
        children: [n, "%"]
      }), c.jsx("input", {
        type: "range",
        min: 5,
        max: 100,
        value: n,
        onChange: d => i(Number(d.target.value)),
        className: `h-1.5 min-w-0 flex-1 ${e ? "accent-sky-400" : "accent-sky-600"}`
      })]
    }), c.jsxs("label", {
      className: `flex ${l ? "w-[132px]" : "min-w-[7rem] flex-1"} items-center gap-2 text-[11px] ${e ? "text-zinc-300" : "text-zinc-600"}`,
      children: [c.jsx("span", {
        className: "shrink-0",
        children: x("羽化")
      }), c.jsx("span", {
        className: "w-6 shrink-0 tabular-nums",
        children: r
      }), c.jsx("input", {
        type: "range",
        min: 0,
        max: 64,
        value: r,
        onChange: d => o(Number(d.target.value)),
        className: `h-1.5 min-w-0 flex-1 ${e ? "accent-sky-400" : "accent-sky-600"}`
      })]
    })]
  })),
  clo = ({
    contentRef: e,
    isDark: t
  }) => {
    on();
    const {
      content: n,
      isLoading: r
    } = Kp(e, {
      useThumbnail: !0,
      preferConstantDisplay: !0,
      allowDirectOssUrl: !0,
      allowSessionBlob: !0,
      nodeType: "input-image"
    });
    return r || !n ? c.jsx("div", {
      className: `flex h-full w-full items-center justify-center ${t ? "bg-zinc-800" : "bg-zinc-200"}`,
      children: c.jsx(Ua, {
        size: 12,
        className: "animate-spin text-zinc-500"
      })
    }) : c.jsx("img", {
      src: n,
      alt: "",
      className: "h-full w-full object-cover",
      draggable: !1,
      onError: a => {
        !/^https?:\/\//i.test(e) || a.currentTarget.src === e || (a.currentTarget.src = e);
      }
    });
  };

function dlo() {
  try {
    const e = localStorage.getItem(Zi.EDIT_IMAGE_LAST_MODEL_ID);
    return (e == null ? void 0 : e.trim()) || null;
  } catch {
    return null;
  }
}

function ulo(e) {
  try {
    e && localStorage.setItem(Zi.EDIT_IMAGE_LAST_MODEL_ID, e);
  } catch {}
}

function SUt(e) {
  var n;
  const t = dlo();
  return t && e.some(r => r.id === t) ? t : (n = e.find(r => r.id === "nano-banana-2") || e.find(r => r.id === "gemini-3.1-flash-image-preview") || e.find(r => r.id === "gpt-image-2") || e[0]) == null ? void 0 : n.id;
}

function GE(e, t) {
  const n = rl(e);
  if (!n.length) return "";
  const r = String(t || "").trim();
  if (r && n.includes(r)) return r;
  const a = zs(e);
  return a != null && a.resolution && n.includes(a.resolution) ? a.resolution : n[0];
}

function IUt(e, t) {
  const n = ah(e),
    r = n != null && n.length ? n : [..._oe],
    a = String(t || "").trim();
  if (a && r.includes(a)) return a;
  const i = zs(e);
  return i != null && i.aspectRatio && r.includes(i.aspectRatio) ? i.aspectRatio : r.includes("Auto") ? "Auto" : r[0];
}

function L0r(e) {
  return `overflow-visible rounded-[18px] border ${e ? "border-zinc-800 bg-[#1f1f1f] text-zinc-100" : "border-[rgba(0,0,0,0.18)] bg-white text-zinc-900"}`;
}

async function hlo(e) {
  const t = await Ns(e, {
      compressForApi: !1
    }),
    n = await createImageBitmap(t),
    r = document.createElement("canvas");
  r.width = n.width, r.height = n.height;
  const a = r.getContext("2d");
  if (!a) throw new Error("无法创建 Canvas");
  a.drawImage(n, 0, 0), n.close();
  const i = r.toDataURL("image/png");
  return new Promise((o, s) => {
    const l = new Image();
    l.onload = () => o(l), l.onerror = () => s(new Error("图片加载失败")), l.src = i;
  });
}

function plo(e, t, n) {
  const r = document.createElement("canvas");
  r.width = e, r.height = t;
  const a = r.getContext("2d");
  if (!a) throw new Error("无法创建蒙版");
  return a.fillStyle = "#000000", a.fillRect(0, 0, e, t), a.fillStyle = "#ffffff", a.fillRect(n.x, n.y, n.width, n.height), r.toDataURL("image/png").split(",")[1] || "";
}

async function mlo(e) {
  const {
      sourceUrl: t,
      selection: n,
      naturalWidth: r,
      naturalHeight: a,
      ratioLabel: i,
      contextPixels: o = 0,
      replaceTargetWithRefs: s = !1,
      exactSelection: l = !1
    } = e,
    d = await hlo(t),
    u = d.naturalWidth || r,
    h = d.naturalHeight || a,
    p = Math.max(0, Math.min(Math.max(0, u - 1), Math.round(n.x))),
    m = Math.max(0, Math.min(Math.max(0, h - 1), Math.round(n.y))),
    f = l ? {
      x0: p,
      y0: m,
      outWidth: Math.max(1, Math.min(u - p, Math.round(n.width))),
      outHeight: Math.max(1, Math.min(h - m, Math.round(n.height))),
      targetRatio: i && i !== "Auto" ? i : void 0
    } : HNt({
      x: n.x,
      y: n.y,
      w: n.width,
      h: n.height,
      contextPixels: o,
      sourceWidth: u,
      sourceHeight: h,
      targetRatio: i && i !== "Auto" ? i : void 0,
      snapToRatio: !0
    }),
    {
      x0: y,
      y0: b,
      outWidth: v,
      outHeight: _
    } = f,
    w = Math.max(1, Math.ceil(300 / Math.max(v, _))),
    k = document.createElement("canvas");
  k.width = v * w, k.height = _ * w;
  const A = k.getContext("2d");
  if (!A) throw new Error("无法创建裁剪画布");
  s ? (A.fillStyle = "#b8b8b8", A.fillRect(0, 0, k.width, k.height)) : (A.imageSmoothingQuality = "high", A.drawImage(d, y, b, v, _, 0, 0, k.width, k.height));
  const S = k.toDataURL("image/png"),
    C = plo(u, h, n),
    I = {
      x: y,
      y: b,
      width: v,
      height: _
    },
    E = s ? `
第1张参考图为待替换的局部占位区域（中性底，不含需保留的原图内容）。请用后续参考图（如 @1）的内容完整替换白色蒙版区域，不要保留占位图中的旧物体；输出尺寸、宽高比、构图边界须与第1张一致，不要扩展成整图，不要补出框选外内容。
只修改白色蒙版区域，保持黑色蒙版区域对应的原图内容、构图、透视、画风和无关细节不变。` : `
第1张参考图就是用户原始框选区域的精确裁剪图。请只基于这张局部裁剪图进行修改，并且输出必须严格保持与该裁剪图相同的尺寸、相同的宽高比、相同的构图边界与主体位置；不要扩展成整图，不要补出框选区域外的内容。
只修改用户描述中需要修改的内容，保持黑色蒙版区域（非选区）对应的原图内容、构图、透视、画风和无关细节不变。`,
    M = i && i !== "Auto" && i !== "自由" ? i : f.targetRatio || "1:1";
  return {
    cropDataUrl: S,
    maskBase64: C,
    maskWidth: u,
    maskHeight: h,
    promptSuffix: E,
    pasteBounds: I,
    apiRatio: M
  };
}

async function BSt(e) {
  const t = String(e.apiUrl || "").trim();
  if (!t) throw new Error("改图未返回有效图片地址");
  let n = e.fallbackWidth,
    r = e.fallbackHeight;
  if (ua()) try {
    const i = await PCt([t], e.taskId, {
      nodeId: e.nodeId
    });
    if (i.usedOss && i.ossPack) {
      const o = _T(i.ossPack, {
          width: i.ossPack.imageWidth ?? n,
          height: i.ossPack.imageHeight ?? r
        }),
        s = i.primaryDisplayUrl || i.displayUrls[0] || t,
        l = i.remoteUrls[0] || s;
      return {
        displayUrl: s,
        layerContent: l,
        width: i.ossPack.imageWidth ?? n,
        height: i.ossPack.imageHeight ?? r,
        historyExtras: o,
        previewSettingsPatch: i.ossPack.ossSettings
      };
    }
  } catch (i) {
    console.warn("[resolveEditImageResult] OSS 回传失败，回退本地缓存:", i);
  }
  const a = await Er.storeImageUrlAsRef(t);
  return {
    displayUrl: t,
    layerContent: a,
    width: n,
    height: r,
    historyExtras: {
      url: t,
      originalUrl: t.startsWith("http") ? t : void 0
    }
  };
}

function flo(e) {
  const t = e.filter(Boolean),
    n = t[0] || "红色";
  return t.length <= 1 ? `基于原图帮我去除${n}区域，然后自然补缺${n}区域，让整体风格保持一致，只去除涂抹区域就行，其他地方不用修改` : `基于原图帮我去除图中${t.join("、")}等颜色标记区域，然后自然补缺这些标记区域，让整体风格保持一致，只去除涂抹区域就行，其他地方不用修改`;
}

async function Gne(e) {
  const t = new Image();
  return t.src = e, await new Promise((n, r) => {
    t.onload = () => n(), t.onerror = () => r(new Error("图片加载失败"));
  }), {
    url: e,
    width: t.naturalWidth,
    height: t.naturalHeight
  };
}

async function O0r(e) {
  const {
      compositeBlob: t,
      promptColorNames: n,
      eraserModelId: r,
      eraserRatio: a,
      eraserResolution: i,
      eraserGptImageQuality: o,
      eraserGenSettings: s,
      eraserPlatformGroup: l,
      apiConfigs: d,
      globalApiKey: u,
      onProgress: h
    } = e,
    p = I => {
      h == null || h(Math.max(0, Math.min(100, Math.round(I))));
    },
    m = d.find(I => I.id === r && I.type === "Image");
  if (!m) throw new Error("未找到可用的图片模型配置");
  const f = (m.url || "").replace(/\/+$/, "");
  if (!f) throw new Error("未配置模型 API 地址");
  const y = cu(m.key, u, void 0, {
    platformGroup: l || void 0,
    modelName: m.modelName || m.id || r,
    modelId: m.id || r,
    baseUrl: f
  });
  if (!y) throw new Error("请先配置 API Key");
  const b = m.id || r,
    v = m.modelName || m.id || r,
    _ = flo(n),
    w = URL.createObjectURL(t);
  p(5);
  const A = (I => {
      const E = String(I || "").trim();
      return !E || E === "Auto" || E.toLowerCase() === "auto" ? "auto" : E;
    })(Pf(r) ? String(s.gptImage2AspectRatio || s.ratio || a || "auto") : a || "auto"),
    S = fm(v) || fm(r) ? TP(r || v, o) : o || "high",
    C = async I => {
      const E = M => M < 20 ? 800 : M < 50 ? 1500 : 3e3;
      for (let M = 0; M < 200; M++) {
        M > 0 && (await new Promise(F => setTimeout(F, E(M - 1))));
        const T = `${f}/v1/images/tasks/${I}`,
          R = await (await $i(T, {
            headers: {
              Authorization: `Bearer ${y}`
            }
          })).json();
        p(eP(R, M));
        const j = IX(R),
          B = ZM(j) || CIe(R, j);
        if (FU(j) && !B) {
          const F = t5(R, !1, !1, {
            quiet: !0
          });
          if (F.length > 0) return p(98), F[0];
        }
        if (BU(R) || OU(j) || j === "FAILED" || j === "ERROR") throw new Error(LF(R, j) || "擦除任务失败");
      }
      throw new Error("擦除轮询超时");
    };
  try {
    if (kh(b) || Dg(b) || Lg(b) || Og(b) || Rm(b) || _v(b) || Hh(b) || Uu(b) || nh(b) || mp(b) || su(b) || Nm(b) || jm(b)) {
      const N = zs(b),
        G = aG(N == null ? void 0 : N.falSafetyTolerance),
        z = xhe(N == null ? void 0 : N.falEnableWebSearch),
        [V] = await Gl([w]);
      if (!V) throw new Error("无法读取合成图");
      const O = Po(f);
      let L, D;
      if (kh(b)) L = `${O}/${KK(b, !0)}`, D = {
        prompt: _,
        image_size: "auto",
        quality: V6n(b, S),
        num_images: 1,
        output_format: "png",
        sync_mode: !1,
        image_urls: [V]
      };else if (Dg(b)) L = `${O}/${oBe}`, D = {
        prompt: _,
        num_images: 1,
        aspect_ratio: bDn(A, !0),
        output_format: "png",
        resolution: vDn(i),
        safety_tolerance: G,
        sync_mode: !1,
        limit_generations: !1,
        enable_web_search: z,
        image_urls: [V]
      };else if (Og(b)) L = `${O}/${lBe}`, D = {
        prompt: _,
        num_images: 1,
        aspect_ratio: ADn(A),
        output_format: "png",
        resolution: SDn(i),
        safety_tolerance: G,
        sync_mode: !1,
        limit_generations: !0,
        enable_web_search: z,
        thinking_level: kDn,
        image_urls: [V]
      };else if (Lg(b)) L = `${O}/${sBe}`, D = {
        prompt: _,
        num_images: 1,
        aspect_ratio: xDn(A),
        output_format: "png",
        resolution: _Dn(i),
        safety_tolerance: G,
        sync_mode: !1,
        limit_generations: !0,
        enable_web_search: z,
        image_urls: [V]
      };else if (Rm(b)) L = `${O}/${cBe}`, D = {
        prompt: _,
        num_images: 1,
        aspect_ratio: CDn(A),
        output_format: "png",
        safety_tolerance: G,
        sync_mode: !1,
        limit_generations: !0,
        image_urls: [V]
      };else if (Hh(b)) {
        L = `${O}/${$Oe}`;
        const W = mNn(A);
        D = {
          prompt: _,
          num_images: 1,
          output_format: "png",
          sync_mode: !1,
          image_urls: [V],
          ...(W ? {
            aspect_ratio: W
          } : {})
        };
      } else if (Uu(b)) L = `${O}/${VOe}`, D = {
        prompt: _,
        num_images: 1,
        aspect_ratio: wqe(A),
        output_format: "png",
        sync_mode: !1,
        image_url: V
      };else if (su(b)) {
        L = `${O}/${WOe}`;
        const W = ANn(A, i, !0);
        D = {
          prompt: _,
          num_images: 1,
          output_format: "png",
          sync_mode: !1,
          enable_prompt_expansion: !0,
          image_urls: [V],
          ...(W != null ? {
            image_size: W
          } : {})
        };
      } else Nm(b) ? (L = `${O}/${qOe}`, D = {
        prompt: _,
        num_images: 1,
        max_images: 1,
        sync_mode: !1,
        enable_safety_checker: !0,
        image_size: INn(A, i, !0),
        image_urls: [V]
      }) : jm(b) ? (L = `${O}/${KOe}`, D = {
        prompt: _,
        num_images: 1,
        max_images: 1,
        sync_mode: !1,
        enable_safety_checker: !0,
        image_size: ENn(A, i, !0),
        image_urls: [V]
      }) : nh(b) ? (L = `${O}/${HOe}`, D = {
        prompt: _,
        num_images: 1,
        aspect_ratio: gNn(A, !0),
        resolution: yNn(i),
        quality: j6t(S),
        sync_mode: !1,
        image_urls: [V]
      }) : mp(b) ? (L = `${O}/${rie(b, !0)}`, D = {
        prompt: _,
        num_images: 1,
        aspect_ratio: vNn(A, !0),
        resolution: wNn(i),
        sync_mode: !1,
        image_urls: [V]
      }) : (L = `${O}/${dBe}`, D = {
        prompt: _,
        num_images: 1,
        aspect_ratio: EDn(A, !0),
        output_format: "png",
        safety_tolerance: G,
        sync_mode: !1,
        image_urls: [V]
      });
      const U = await $i(L, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${y}`
        },
        body: JSON.stringify(D)
      });
      if (!U.ok) {
        const W = await U.text();
        throw console.error("[smartEraseApi] API error:", U.status, W), new Error(Sv(U.status));
      }
      const H = await U.json();
      wh(H), p(12);
      const Y = L.startsWith(`${O}/`) ? L.slice(O.length + 1) : KK(b, !0),
        K = await GM({
          falPrefix: O,
          apiKey: y,
          modelPath: Y,
          submitData: H,
          onProgress: p
        });
      if (K.length === 0) throw new Error("未获取到擦除结果");
      return p(98), Gne(K[0]);
    }
    if (mm(v)) {
      const N = sX(v, m.url || f),
        G = EU(N),
        z = Up(v) || $S(v) || mk(v) || Iu(v) || z5(v),
        V = z ? Uj(G) : void 0,
        L = await v$(w, G, y, void 0, V ? {
          uploadCandidates: V,
          forceOpenApiFileUpload: z
        } : z ? {
          forceOpenApiFileUpload: !0
        } : void 0),
        D = [L],
        U = {
          prompt: _
        };
      if (v === "gemini-3.1-flash-image-preview-huya") U.aspectRatio = zMt(A), U.imageSize = UMt(i), U.images = D;else if (v === "nano-banana-pro-huya") U.aspectRatio = Kxe(A), U.imageSize = $Mt(i), U.images = D;else if (Up(v)) Object.assign(U, VMt(void 0, {
        ratio: A,
        resolution: i,
        quality: o,
        modelId: v
      })), U.imageUrls = D;else if ($S(v)) U.size = tMt(A), U.quality = bhe(o), U.imageUrls = D;else if (mk(v)) U.size = iPt(v, A, i), xZ(v) || (U.sequential_image_generation = !1, U.max_images = 1), _Z(v) && (U.nsfw = !1, U.background = iX(s == null ? void 0 : s.seedreamBackground)), U.image = D;else if (Iu(v)) {
        const we = s,
          X = US(v, we),
          Z = rMt(we),
          re = aMt({
            modelId: v,
            version: X,
            prompt: String(_ || "生成图片"),
            ratioUi: A,
            imageUrl: L,
            imageWeight: Z.iw,
            quality: Z.quality,
            chaos: Z.chaos,
            stylize: Z.stylize,
            weird: Z.weird,
            raw: Z.raw,
            sw: Z.sw,
            sv: Z.sv,
            ow: Z.ow,
            hd: Z.hd
          });
        for (const fe of Object.keys(U)) delete U[fe];
        Object.assign(U, re);
      } else if (z5(v)) {
        const we = iMt(A, i);
        U.width = we.width, U.height = we.height, U.thinkingMode = !1, U.imageUrls = D;
      } else U.aspectRatio = Kxe(A), U.images = D;
      const H = Up(v) || $S(v) ? "openai" : mk(v) ? "volcengine" : Iu(v) ? "midjourney" : z5(v) ? "wanx" : "google",
        Y = s,
        K = {
          provider: H,
          model: HMt(v, m.modelName || v, {
            uiResolution: i,
            huyaMjVersion: Iu(v) ? US(v, Y) : void 0
          }),
          type: mhe(v, Y) ? "text2image" : "image2image"
        },
        W = Sqe(v) ? {
          model: K,
          parameters: U
        } : {
          action: "generate",
          model: K,
          parameters: U
        },
        Q = await $i(N, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${y}`
          },
          body: JSON.stringify(W)
        });
      if (!Q.ok) {
        const we = await Q.text();
        throw console.error("[smartEraseApi] API error:", Q.status, we), new Error(Sv(Q.status));
      }
      const q = await Q.json();
      if (q.success === !1) throw new Error(hd(q, "创建任务失败"));
      const ne = fv(q, !1);
      if (ne.urls.length > 0) return p(98), Gne(ne.urls[0]);
      const de = q.data,
        le = String(q.task_id ?? q.taskId ?? (de == null ? void 0 : de.task_id) ?? (de == null ? void 0 : de.id) ?? q.id ?? "");
      if (!le) throw new Error(hd(q, "擦除未返回任务 ID"));
      p(12);
      const J = gk(G, le),
        pe = p7({
          isVideo: !1,
          isImage2Image: !0
        });
      let ce = 0;
      for (let we = 0; we < pe; we++) {
        we > 0 && (await new Promise(ye => setTimeout(ye, ES)));
        const X = await $i(J, {
            headers: {
              Authorization: `Bearer ${y}`
            }
          }),
          Z = await X.json();
        if (p(eP(Z, we)), !X.ok && (X.status === 401 || X.status === 403 || X.status >= 500)) throw new Error(hd(Z, String(X.status)));
        const re = fv(Z, !1);
        if (re.urls.length > 0) return p(98), Gne(re.urls[0]);
        const fe = re.status;
        if (E1(Z, fe)) throw new Error(hd(Z, fe || "擦除任务失败"));
        if (Kj(fe)) {
          if (ce += 1, ce >= 24) throw new Error(hd(Z, "任务已成功但未返回结果 URL，请稍后重试"));
        } else ce = 0;
      }
      throw new Error("擦除轮询超时");
    }
    const I = new FormData(),
      M = iIe(m.id, m.modelName, r) ? aIe : m.id === "nano-banana-2" ? Uqe(m.modelName, i) : m.modelName || m.id || r;
    I.append("model", M), I.append("prompt", _), I.append("n", "1"), I.append("response_format", "url"), I.append("aspect_ratio", A), i && i !== "Auto" && I.append("image_size", i), I.append("image", t, "composite.png");
    const T = `${f}/v1/images/edits?async=true`,
      P = await $i(T, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${y}`
        },
        body: I
      });
    if (!P.ok) {
      const N = await P.text();
      throw console.error("[smartEraseApi] API error:", P.status, N), new Error(Sv(P.status));
    }
    const R = await P.json();
    p(12);
    const j = R.data,
      B = (j == null ? void 0 : j.id) ?? R.task_id ?? (j == null ? void 0 : j.task_id) ?? R.id;
    if (B) {
      const N = await C(B);
      return p(98), Gne(N);
    }
    const F = t5(R, !1, !1);
    if (F.length > 0) return p(98), Gne(F[0]);
    throw new Error("未获取到擦除结果");
  } finally {
    URL.revokeObjectURL(w);
  }
}

const mDe = {
  prepareRegion: mlo,
  dimensions: Gne,
  resolveResult: BSt,
  now: () => Date.now()
};

async function B0r(e, t, n, r) {
  var b;
  if (!n()) return null;
  const a = {
      ...e,
      refs: [...e.refs],
      settings: {
        ...e.settings
      },
      config: {
        ...e.config
      },
      region: e.region && {
        ...e.region,
        selection: {
          ...e.region.selection
        }
      }
    },
    i = await t.resolveMedia(a.source);
  if (!n()) return null;
  const o = [];
  for (const v of a.refs) if (o.push(await t.resolveMedia(v)), !n()) return null;
  const s = o.length > 0 ? `【图片说明】第一张输入图片是待修改原图；提示词中的图片1${o.length > 1 ? `至图片${o.length}` : ""}，依次指后续 ${o.length} 张额外参考图。
` : "",
    l = a.region ? await t.prepareRegion({
      ...a.region,
      sourceUrl: i,
      ratioLabel: a.ratio
    }) : null;
  if (!n()) return null;
  const d = (l == null ? void 0 : l.apiRatio) ?? a.ratio;
  let u = !0,
    h;
  try {
    h = await t.run((l == null ? void 0 : l.cropDataUrl) ?? i, `${(l == null ? void 0 : l.promptSuffix) ?? ""}${s}${a.prompt}`, a.config, d, a.resolution, {
      refImages: o,
      markerMasks: l && !((b = a.region) != null && b.exactSelection) ? [{
        nodeId: `edit-region-${t.now()}`,
        mask: l.maskBase64,
        width: l.maskWidth,
        height: l.maskHeight
      }] : void 0,
      platformGroup: a.platformGroup || void 0,
      genUseAliyunOss: !!a.settings.genUseAliyunOss,
      sourceSettings: a.settings,
      onProgress: v => {
        u && n() && r(v);
      }
    });
  } finally {
    u = !1;
  }
  if (!n()) return null;
  const p = h == null ? void 0 : h[0];
  if (!p) throw new Error("改图完成但未返回图片地址");
  const {
    width: m,
    height: f
  } = await t.dimensions(p);
  if (!n()) return null;
  const y = await t.resolveResult({
    apiUrl: p,
    taskId: a.historyId,
    nodeId: a.nodeId,
    fallbackWidth: m,
    fallbackHeight: f
  });
  return n() ? {
    resolved: y,
    width: m,
    height: f,
    ratio: d,
    bounds: (l == null ? void 0 : l.pasteBounds) ?? null
  } : null;
}

const JQ = [{
  id: "concentric-circle",
  label: "同心圆",
  description: "调整圆环、描边与渐变，制作环形图案。",
  icon: jRr
}, {
  id: "halftone-dots",
  label: "半调波点",
  description: "用形状、渐变或图片制作半调网点。",
  icon: NRr
}, {
  id: "hud-lines",
  label: "HUD 线条",
  description: "组合圆弧、缺口与刻度，绘制 HUD 图形。",
  icon: xTn
}, {
  id: "scale-circle",
  label: "刻度圆",
  description: "生成放射刻度，调整波浪与噪波节奏。",
  icon: uEt
}, {
  id: "barcode",
  label: "条形码",
  description: "制作条码风格的黑白条带与装饰纹理。",
  icon: kRr
}, {
  id: "waveTexture",
  label: "波浪纹理",
  description: "叠加波浪线条，调整频率、振幅与颜色。",
  icon: LNr
}, {
  id: "linePattern",
  label: "重复线条",
  description: "排列横线、竖线和斜线，制作重复纹样。",
  icon: fRr
}, {
  id: "dot-matrix",
  label: "点阵",
  description: "调整点阵排列，点选或涂抹编辑图案。",
  icon: JRr
}, {
  id: "polygon-grid",
  label: "多边形网格",
  description: "在三角形或六边形网格中填充图案。",
  icon: eNr
}, {
  id: "contour",
  label: "等高线",
  description: "生成地形轮廓，逐层调整线条与填充。",
  icon: pNr
}];

function hfn(e) {
  return new Promise((t, n) => {
    const r = URL.createObjectURL(e),
      a = new Image();
    a.onload = () => {
      URL.revokeObjectURL(r), t(a);
    }, a.onerror = () => {
      URL.revokeObjectURL(r), n(new Error("图层图片加载失败"));
    }, a.src = r;
  });
}

function glo(e, t, n) {
  const r = t.naturalWidth || t.width,
    a = t.naturalHeight || t.height;
  if (!r || !a || n.width <= 0 || n.height <= 0) return;
  const i = XFt(n, r, a);
  e.drawImage(t, 0, 0, r, a, i.x, i.y, i.width, i.height);
}

async function CUt(e, t, n, r, a) {
  if (!t || !n) throw new Error("无法合并：缺少原图尺寸");
  const i = await Ns(e, {
      compressForApi: !1
    }),
    o = await hfn(i),
    s = document.createElement("canvas");
  s.width = t, s.height = n;
  const l = s.getContext("2d");
  if (!l) throw new Error("无法创建合成画布");
  l.globalAlpha = Math.min(1, Math.max(0, r / 100)), l.drawImage(o, 0, 0, t, n);
  for (const h of a) {
    if (h.visible === !1) continue;
    const p = await Ns(h.content, {
        compressForApi: !1
      }),
      m = await hfn(p),
      f = h.bounds;
    l.globalAlpha = Math.min(1, Math.max(0, (h.opacity ?? 100) / 100)), h.fit === "fill" ? l.drawImage(m, 0, 0, m.naturalWidth || m.width, m.naturalHeight || m.height, f.x, f.y, f.width, f.height) : glo(l, m, f);
  }
  l.globalAlpha = 1;
  const d = await new Promise((h, p) => {
      s.toBlob(m => m ? h(m) : p(new Error("合并导出失败")), "image/png", .95);
    }),
    u = URL.createObjectURL(d);
  try {
    return {
      contentRef: await Er.storeImageUrlAsRef(u),
      width: t,
      height: n,
      blob: d
    };
  } finally {
    URL.revokeObjectURL(u);
  }
}

function dZe(e) {
  return e ? e._globalOssUrlOnly ? !0 : Nk(e) : !1;
}

async function F0r(e, t) {
  const {
    isGlobalOssUploadEnabled: n
  } = await Ie(async () => {
    const {
      isGlobalOssUploadEnabled: a
    } = await Promise.resolve().then(() => Ah);
    return {
      isGlobalOssUploadEnabled: a
    };
  }, void 0, import.meta.url);
  if (!n()) return !1;
  let r;
  return t(a => (r = a.find(i => i.id === e), a)), r != null && r._assetId ? !1 : dZe(r);
}

function z0r(e, t, n) {
  const r = (n == null ? void 0 : n.assetId) || e;
  (async () => {
    var a, i;
    try {
      const {
        isCanvasLocalCacheMode: o,
        isRemoteHttpUrl: s
      } = await Ie(async () => {
        const {
          isCanvasLocalCacheMode: f,
          isRemoteHttpUrl: y
        } = await Promise.resolve().then(() => So);
        return {
          isCanvasLocalCacheMode: f,
          isRemoteHttpUrl: y
        };
      }, void 0, import.meta.url);
      if (!o() || (await F0r(e, t))) return;
      const {
          localCacheManager: l
        } = await Ie(async () => {
          const {
            localCacheManager: f
          } = await Promise.resolve().then(() => Ha);
          return {
            localCacheManager: f
          };
        }, void 0, import.meta.url),
        {
          ensureLocalPreviewDisplayUrl: d
        } = await Ie(async () => {
          const {
            ensureLocalPreviewDisplayUrl: f
          } = await Promise.resolve().then(() => Ui);
          return {
            ensureLocalPreviewDisplayUrl: f
          };
        }, void 0, import.meta.url),
        u = 9e4,
        h = 200,
        p = Date.now();
      let m = "";
      for (; Date.now() - p < u && (await l.ensureRestored(), !(l.isAvailable() && l.hasAsset(r) && (m = (await d(r, {
        maxDim: 512,
        allowVideoOriginal: !0
      })) || "", m && !s(m))));) await new Promise(f => setTimeout(f, h));
      if (!m || s(m)) try {
        if (l.isAvailable() && l.hasAsset(r)) {
          const f = await l.getConvertFileSrcForAsset(r);
          f && !s(f) && (m = f);
        }
      } catch {}
      if (!m || s(m)) {
        t(f => f.map(y => y.id === e && y.status === "generating" ? {
          ...y,
          status: "failed",
          progress: 0,
          errorMsg: "生成成功但本地缓存落盘失败，请重试或切换存储模式"
        } : y));
        try {
          (a = n == null ? void 0 : n.onFinalFailure) == null || a.call(n);
        } catch (f) {
          console.warn("[scheduleHistoryThumbnailSaveFromLocalAsset] onFinalFailure failed:", f);
        }
        return;
      }
      t(f => f.map(y => y.id === e && !dZe(y) ? {
        ...y,
        status: y.status === "generating" ? "completed" : y.status,
        progress: 100,
        thumbnailUrl: m,
        url: y.url || m,
        _assetId: String(y._assetId || "").trim() || r,
        _thumbnailAssetId: `preview_${r}`,
        _globalOssUrlOnly: !1,
        ossUploaded: !1
      } : y));
      try {
        (i = n == null ? void 0 : n.onPreviewReady) == null || i.call(n, m);
      } catch (f) {
        console.warn("[scheduleHistoryThumbnailSaveFromLocalAsset] onPreviewReady failed:", f);
      }
    } catch (o) {
      console.warn("[scheduleHistoryThumbnailSaveFromLocalAsset] failed:", o);
    }
  })();
}

function LT(e, t, n) {
  !t || !t.startsWith("data:image") && !t.startsWith("http") || (async () => {
    if (!(await F0r(e, n))) try {
      const r = await PHe(t);
      if (!r) return;
      const a = await xD(async () => {
        const i = await H$(r, `history-${e}`),
          o = await new Promise((l, d) => {
            const u = new FileReader();
            u.onload = () => l(u.result), u.onerror = () => d(u.error), u.readAsDataURL(i);
          }),
          {
            localCacheManager: s
          } = await Ie(async () => {
            const {
              localCacheManager: l
            } = await Promise.resolve().then(() => Ha);
            return {
              localCacheManager: l
            };
          }, void 0, import.meta.url);
        return s.isAvailable() && (await s.saveThumbnail(e, o, "preview")), await ni.saveBlobAsset(`${e}_thumbnail`, i, ""), ni.getAssetUrl(`${e}_thumbnail`);
      });
      a && n(i => i.map(o => o.id === e && !dZe(o) ? {
        ...o,
        thumbnailUrl: a,
        _thumbnailAssetId: `${e}_thumbnail`
      } : o));
    } catch (r) {
      console.warn("[scheduleHistoryThumbnailSave] 缩略图保存失败:", r);
    } finally {
      try {
        const {
          isGlobalOssUploadEnabled: r
        } = await Ie(async () => {
          const {
            isGlobalOssUploadEnabled: i
          } = await Promise.resolve().then(() => Ah);
          return {
            isGlobalOssUploadEnabled: i
          };
        }, void 0, import.meta.url);
        if (!r()) return;
        const {
          scheduleHistoryOssAutoUpload: a
        } = await Ie(async () => {
          const {
            scheduleHistoryOssAutoUpload: i
          } = await Promise.resolve().then(() => qh);
          return {
            scheduleHistoryOssAutoUpload: i
          };
        }, void 0, import.meta.url);
        a(e, [e]);
      } catch (r) {
        console.warn("[scheduleHistoryThumbnailSave] 触发历史云端自动上传失败:", r);
      }
    }
  })();
}

function ylo(e, t, n) {
  const r = (n == null ? void 0 : n.assetId) || e;
  (async () => {
    try {
      const {
        isGlobalOssUploadEnabled: a
      } = await Ie(async () => {
        const {
          isGlobalOssUploadEnabled: y
        } = await Promise.resolve().then(() => Ah);
        return {
          isGlobalOssUploadEnabled: y
        };
      }, void 0, import.meta.url);
      if (a()) return;
      let i = String((n == null ? void 0 : n.remotePlayUrl) || "").trim();
      if (t) {
        let y = !1;
        if (t(b => {
          const v = b.find(_ => _.id === e);
          if (y = dZe(v), !i && v) {
            const _ = v._ossRemoteUrl || v.originalUrl || (v.url && /^https?:\/\//i.test(v.url) && !/asset\.(localhost|tauri\.localhost)/i.test(v.url) ? v.url : "");
            _ && /^https?:\/\//i.test(_) && (i = _);
          }
          return b;
        }), y) return;
      }
      const {
          ensureHistoryVideoPreviewThumbnailForAssetId: o
        } = await Ie(async () => {
          const {
            ensureHistoryVideoPreviewThumbnailForAssetId: y
          } = await Promise.resolve().then(() => qh);
          return {
            ensureHistoryVideoPreviewThumbnailForAssetId: y
          };
        }, void 0, import.meta.url),
        {
          localCacheManager: s
        } = await Ie(async () => {
          const {
            localCacheManager: y
          } = await Promise.resolve().then(() => Ha);
          return {
            localCacheManager: y
          };
        }, void 0, import.meta.url),
        {
          isBrowserCorsHostileVideoUrl: l
        } = await Ie(async () => {
          const {
            isBrowserCorsHostileVideoUrl: y
          } = await Promise.resolve().then(() => pg);
          return {
            isBrowserCorsHostileVideoUrl: y
          };
        }, void 0, import.meta.url);
      await s.ensureRestored();
      const d = 12e4,
        u = 1500,
        h = Date.now(),
        p = !!i && !l(i);
      for (; Date.now() - h < d && !s.hasAsset(r);) {
        const y = await ni.getAssetRecord(r);
        if (y != null && y.blob && y.blob.size > 0 || p) break;
        await new Promise(b => setTimeout(b, u));
      }
      if (await o(r, {
        remotePlayUrl: p ? i : void 0
      }), !t) return;
      const m = `${r}_thumbnail`,
        f = await ni.getAssetUrl(m);
      if (!f) {
        const {
            readHistoryHybridListThumbnail: y
          } = await Ie(async () => {
            const {
              readHistoryHybridListThumbnail: v
            } = await Promise.resolve().then(() => ii);
            return {
              readHistoryHybridListThumbnail: v
            };
          }, void 0, import.meta.url),
          b = await y({
            id: e,
            _assetId: r
          });
        if (!b) return;
        t(v => v.map(_ => _.id === e ? {
          ..._,
          thumbnailUrl: b,
          videoPosterUrl: b
        } : _));
        return;
      }
      t(y => y.map(b => b.id === e ? {
        ...b,
        thumbnailUrl: f,
        videoPosterUrl: f,
        _thumbnailAssetId: m
      } : b));
    } catch (a) {
      console.warn("[scheduleHistoryVideoPosterSave] 视频封面保存失败:", a);
    }
  })();
}

const EUt = Object.freeze(Object.defineProperty({
  __proto__: null,
  scheduleHistoryThumbnailSave: LT,
  scheduleHistoryThumbnailSaveFromLocalAsset: z0r,
  scheduleHistoryVideoPosterSave: ylo
}, Symbol.toStringTag, {
  value: "Module"
}));

function iwe() {
  const e = [],
    t = s => e.push(s & 255),
    n = s => e.push(s >> 8 & 255, s & 255);
  return {
    u8: t,
    u16: n,
    i16: s => n(s < 0 ? 65536 + s : s),
    u32: s => e.push(s >>> 24 & 255, s >>> 16 & 255, s >>> 8 & 255, s & 255),
    ascii: s => {
      for (let l = 0; l < s.length; l += 1) t(s.charCodeAt(l));
    },
    raw: s => {
      for (let l = 0; l < s.length; l += 1) t(s[l]);
    },
    bytes: () => Uint8Array.from(e)
  };
}

function U0r(e) {
  return Uint8Array.from([e >> 8 & 255, e & 255]);
}

function blo(e) {
  return U0r(e < 0 ? 65536 + e : e);
}

function pfn(e) {
  return Uint8Array.from([e >>> 24 & 255, e >>> 16 & 255, e >>> 8 & 255, e & 255]);
}

function vlo(e) {
  const t = Array.from(e || "Layer").map(r => r.charCodeAt(0) >= 32 && r.charCodeAt(0) <= 126 ? r : "_").join("").slice(0, 31),
    n = [t.length];
  for (let r = 0; r < t.length; r += 1) n.push(t.charCodeAt(r));
  for (; n.length % 4 !== 0;) n.push(0);
  return Uint8Array.from(n);
}

function wlo(e) {
  const t = Array.from(e || "图层"),
    n = iwe();
  n.u32((e || "图层").length);
  for (const i of t) {
    const o = i.codePointAt(0) || 0;
    if (o > 65535) {
      const s = o - 65536;
      n.u16(55296 + (s >> 10)), n.u16(56320 + (s & 1023));
    } else n.u16(o);
  }
  const r = n.bytes(),
    a = iwe();
  return a.ascii("8BIM"), a.ascii("luni"), a.u32(r.length), a.raw(r), r.length % 2 && a.u8(0), a.bytes();
}

function ege(e, t, n) {
  const r = e.length / 4,
    a = new Uint8Array((n ? 2 : 0) + r);
  n && (a[0] = 0, a[1] = 0);
  for (let i = 0; i < r; i += 1) a[(n ? 2 : 0) + i] = e[i * 4 + t];
  return a;
}

function $0r(e, t, n, r) {
  const a = [],
    i = [];
  let o = 2;
  for (const m of n) {
    const f = [{
        id: -1,
        data: ege(m.pixels, 3, !0)
      }, {
        id: 0,
        data: ege(m.pixels, 0, !0)
      }, {
        id: 1,
        data: ege(m.pixels, 1, !0)
      }, {
        id: 2,
        data: ege(m.pixels, 2, !0)
      }],
      y = iwe();
    y.u32(0), y.u32(0), y.u32(t), y.u32(e), y.u16(f.length);
    for (const w of f) y.i16(w.id), y.u32(w.data.length);
    y.ascii("8BIM"), y.ascii("norm"), y.u8(Math.round(Math.min(1, Math.max(0, m.opacity)) * 255)), y.u8(0), y.u8(m.visible ? 0 : 2), y.u8(0);
    const b = iwe();
    b.u32(0), b.u32(0), b.raw(vlo(m.name)), b.raw(wlo(m.name));
    const v = b.bytes();
    y.u32(v.length), y.raw(v);
    const _ = y.bytes();
    a.push(_), o += _.length;
    for (const w of f) i.push(w.data), o += w.data.length;
  }
  const s = o % 2 ? 1 : 0,
    l = iwe();
  l.ascii("8BPS"), l.u16(1);
  for (let m = 0; m < 6; m += 1) l.u8(0);
  l.u16(4), l.u32(t), l.u32(e), l.u16(8), l.u16(3), l.u32(0), l.u32(0), l.u32(4 + o + s + 4);
  const d = [l.bytes(), pfn(o + s), blo(-n.length), ...a, ...i];
  s && d.push(Uint8Array.from([0])), d.push(pfn(0), U0r(0));
  for (const m of [0, 1, 2, 3]) d.push(ege(r, m, !1));
  const u = d.reduce((m, f) => m + f.length, 0),
    h = new Uint8Array(u);
  let p = 0;
  for (const m of d) h.set(m, p), p += m.length;
  return new Blob([h], {
    type: "image/vnd.adobe.photoshop"
  });
}

const xlo = ["free", "1:1", "4:3", "3:4", "16:9", "9:16", "3:2", "2:3"],
  Ylt = [{
    id: "image-wash",
    label: "质感增强",
    description: "调整色调与细节质感，保留原尺寸，支持批量处理。",
    icon: ac
  }, {
    id: "image-upscale",
    label: "图像放大",
    description: "本地分块重绘，放大图片，补充纹理与细节。",
    icon: Gue
  }, {
    id: "tile",
    label: "图片平铺",
    description: "预览重复纹理，按原图像素导出当前构图。",
    icon: Bv
  }, {
    id: "product",
    label: "商品合图",
    description: "试穿服装、组合素材，让商品融入画面。",
    icon: VK
  }, {
    id: "relight",
    label: "光照重置",
    description: "用参考图，重塑视频的光照与氛围。",
    icon: AD
  }, {
    id: "script",
    label: "剧本创作",
    description: "从大纲到分镜，发送到画布或言绘。",
    icon: dZ
  }, {
    id: "edit",
    label: "改图",
    description: "按选区、涂抹或整图修改。",
    icon: _5e
  }, {
    id: "cutout-repair",
    label: "智能抠补",
    description: "识别与框选目标，抠图补全，导出分层 PSD。",
    icon: Uae
  }, {
    id: "dual-alpha",
    label: "黑白图抠图",
    description: "用同图黑白双底，恢复透明素材与柔和边缘。",
    icon: rEt
  }, {
    id: "motion",
    label: "动作迁移",
    description: "用角色图演绎参考动作。",
    icon: wb
  }, {
    id: "layers",
    label: "图层拆分",
    description: "把一张图拆成透明图层。",
    icon: ixe
  }, {
    id: "local-edit",
    label: "局部修改",
    description: "标记目标，修改材质、替换物品或调整局部。",
    icon: hZ
  }];

function mfn(e) {
  if (e === "free") return null;
  const [t, n] = e.split(":").map(Number);
  return t > 0 && n > 0 ? t / n : null;
}

function ffn(e, t, n, r, a, i, o) {
  let s = n,
    l = r;
  a && (l = t + Math.sign(r - t || 1) * Math.abs(n - e) / a);
  const d = Math.min(e, s),
    u = Math.min(t, l),
    h = Math.max(0, Math.min(d, i)),
    p = Math.max(0, Math.min(u, o));
  return {
    x: h,
    y: p,
    width: Math.max(0, Math.min(Math.abs(s - e), i - h)),
    height: Math.max(0, Math.min(Math.abs(l - t), o - p)),
    shape: "rect"
  };
}

function _lo(e) {
  return e <= 0 ? "" : `【图片说明】第一张输入图片是待修改原图；提示词中的图片1${e > 1 ? `至图片${e}` : ""}，依次指后续 ${e} 张额外参考图。
`;
}

async function UL(e) {
  if (/^(https?:|blob:|data:)/i.test(e)) return e;
  try {
    if (Er.isContentRef(e)) {
      await Er.init();
      const n = await Er.get(Er.extractId(e));
      if (n) return n;
    }
    const [t] = await BF([e]);
    if (t) return t;
  } catch {}
  return e;
}

function klo(e, t) {
  const n = e.width,
    r = e.height,
    a = e.getContext("2d");
  if (!a || !n || !r) return null;
  const i = a.getImageData(0, 0, n, r);
  let o = !1;
  for (let h = 3; h < i.data.length; h += 4) if (i.data[h] > 8) {
    o = !0;
    break;
  }
  if (!o) return null;
  const s = document.createElement("canvas");
  s.width = n, s.height = r;
  const l = s.getContext("2d");
  if (!l) return null;
  const d = l.createImageData(n, r);
  for (let h = 0; h < i.data.length; h += 4) {
    const p = i.data[h + 3] > 8 ? 255 : 0;
    d.data[h] = d.data[h + 1] = d.data[h + 2] = p, d.data[h + 3] = 255;
  }
  l.putImageData(d, 0, 0);
  const u = t > 0 ? document.createElement("canvas") : s;
  if (t > 0) {
    u.width = n, u.height = r;
    const h = u.getContext("2d");
    if (!h) return null;
    h.filter = `blur(${Math.min(120, t)}px)`, h.drawImage(s, 0, 0);
  }
  return {
    mask: u.toDataURL("image/png").split(",")[1] || "",
    width: n,
    height: r
  };
}

function Alo({
  screen: e,
  setScreen: t,
  apiConfigs: n,
  runEditImage: r,
  history: a,
  setHistory: i
}) {
  var ki;
  on();
  const {
      view: o
    } = M3(),
    s = g.useSyncExternalStore(Eya, Tya, Mya),
    [l, d] = g.useState(""),
    [u, h] = g.useState(RX),
    [p, m] = g.useState("select"),
    [f, y] = g.useState(""),
    [b, v] = g.useState(""),
    [_, w] = g.useState({
      w: 0,
      h: 0
    }),
    [k, A] = g.useState({
      w: 800,
      h: 600
    }),
    [S, C] = g.useState({
      x: 0,
      y: 0,
      zoom: 1
    }),
    {
      zoom: I,
      ...E
    } = S,
    M = g.useRef(S);
  M.current = S;
  const [T, P] = g.useState(!1),
    [R, j] = g.useState(!1),
    [B, F] = g.useState(80),
    [N, G] = g.useState(!1),
    [z, V] = g.useState(null),
    [O, L] = g.useState(!0),
    [D, U] = g.useState(!0),
    [H, Y] = g.useState([]),
    [K, W] = g.useState("base"),
    [Q, q] = g.useState(""),
    [ne, de] = g.useState(!0),
    [le, J] = g.useState(100),
    pe = g.useRef(null),
    [ce, we] = g.useState(null),
    X = g.useRef([]),
    Z = g.useRef("base"),
    re = g.useRef(new Map());
  X.current = H, Z.current = K;
  const [fe, ye] = g.useState(null),
    [ie, ae] = g.useState("free"),
    [be, Ee] = g.useState(!1),
    [xe, he] = g.useState(32),
    [ue, ge] = g.useState(100),
    [_e, ke] = g.useState(24),
    [ve, Te] = g.useState(null),
    [Ne, me] = g.useState(""),
    [Ae, Fe] = g.useState([]),
    [Me, Re] = g.useState(""),
    [$e, rt] = g.useState("Auto"),
    [nt, ze] = g.useState("2K"),
    [Le, Ke] = g.useState(1),
    [Xe, De] = g.useState(ko),
    [Ye, Ce] = g.useState(null),
    [He, Ve] = g.useState("png"),
    [it, It] = g.useState([]),
    [Ft, We] = g.useState(null),
    [Ze, Ge] = g.useState([]),
    [Oe, st] = g.useState([]),
    [vt, Ht] = g.useState(!1),
    [nn, pt] = g.useState(0),
    [lt, gt] = g.useState(""),
    Ut = g.useRef(null),
    _t = g.useRef(null),
    At = g.useRef(null),
    Yt = g.useRef(null),
    qe = g.useRef(null),
    kt = g.useRef(0),
    St = g.useRef(""),
    hn = g.useRef(""),
    Qt = g.useRef(0),
    Ot = g.useRef(s.catalog),
    ln = g.useRef(e);
  ln.current = e;
  const Pn = g.useRef(!1),
    rn = g.useRef(null),
    Yn = g.useRef({
      previewUrl: f,
      sourceUrl: b,
      selection: fe,
      maskActive: be,
      tool: p,
      brushSize: xe,
      opacity: ue,
      feather: _e,
      selectionRatio: ie,
      natural: _
    });
  Yn.current = {
    previewUrl: f,
    sourceUrl: b,
    selection: fe,
    maskActive: be,
    tool: p,
    brushSize: xe,
    opacity: ue,
    feather: _e,
    selectionRatio: ie,
    natural: _
  };
  const Ct = g.useRef({
      generate: () => {},
      undo: () => {},
      redo: () => {},
      clearMask: () => {}
    }),
    Cn = g.useMemo(() => YFt(n.filter(Wn => Wn.enabled !== !1), u), [n, u]),
    un = Cn.find(Wn => Wn.id === Me),
    Jn = !!un && od(un, Qa.getGlobalBaseUrl()),
    Kn = g.useMemo(() => {
      const Wn = ah(Me);
      return Wn.length ? Wn : [..._oe];
    }, [Me]),
    en = g.useMemo(() => rl(Me), [Me]),
    Vn = fe && fe.width >= 8 && fe.height >= 8 && !be ? X7(fe.width, fe.height, Kn) : null,
    Tt = g.useMemo(() => a.filter(Wn => Wn.type === "image"), [a]),
    Ue = _.w > 0 ? Math.min(1, Math.max(1, k.w - 96) / _.w, Math.max(1, k.h - 120) / _.h) : 1,
    et = Math.max(1, Math.round((_.w || 1) * (_.w ? Ue : 1))),
    ft = Math.max(1, Math.round((_.h || 1) * (_.h ? Ue : 1))),
    ht = (ki = it.find(Wn => Wn.url === f && Wn.source === b)) == null ? void 0 : ki.id,
    wt = Ft && it.some(Wn => Wn.id === Ft) ? Ft : ht,
    jt = () => {
      M.current = {
        x: 0,
        y: 0,
        zoom: 1
      }, C(M.current);
    },
    bt = () => {
      var Wn;
      return {
        preview: Yn.current.previewUrl,
        source: Yn.current.sourceUrl,
        label: l,
        mask: ((Wn = _t.current) == null ? void 0 : Wn.toDataURL("image/png")) || "",
        selection: Yn.current.selection,
        maskActive: Yn.current.maskActive,
        patches: X.current.map(wr => ({
          ...wr,
          bounds: {
            ...wr.bounds
          }
        })),
        baseMask: Q
      };
    },
    Bt = Wn => {
      const wr = _t.current;
      if (!wr) {
        St.current = Wn;
        return;
      }
      const jn = wr.getContext("2d");
      if (jn == null || jn.clearRect(0, 0, wr.width, wr.height), !Wn || !jn) return;
      const _n = new Image();
      _n.onload = () => jn.drawImage(_n, 0, 0, wr.width, wr.height), _n.src = Wn;
    },
    wn = Wn => {
      var jn, _n;
      kt.current++;
      const wr = Wn.preview === Yn.current.previewUrl;
      if (St.current = Wn.mask, y(Wn.preview), v(Wn.source), d(Wn.label), Wn.recordChange) {
        const {
          item: ar,
          index: Vt,
          restore: vn
        } = Wn.recordChange;
        It(An => {
          if (!vn) return An.filter(zr => zr.id !== ar.id);
          if (An.some(zr => zr.id === ar.id)) return An;
          const ur = [...An];
          return ur.splice(Math.min(Vt, ur.length), 0, ar), ur;
        });
      }
      ye(Wn.selection), Ee(Wn.maskActive), re.current.clear(), Y(Wn.patches || []), q(Wn.baseMask || ""), W(((_n = (jn = Wn.patches) == null ? void 0 : jn.slice(-1)[0]) == null ? void 0 : _n.id) || "base"), wr && Bt(Wn.mask);
    },
    at = () => {
      const Wn = bt();
      Ge(wr => [...wr.slice(-29), Wn]), st([]);
    },
    Pt = (Wn, wr, jn, _n = !1) => {
      kt.current++, jn && Yn.current.previewUrl && at(), St.current = "", Ee(!1), ye(null), re.current.clear(), Y([]), q(""), de(!0), J(100), W("base"), y(Wn), v(wr), _n || jt();
    };
  Ct.current.undo = () => Ge(Wn => {
    const wr = Wn[Wn.length - 1];
    return wr ? (st(jn => [{
      ...bt(),
      recordChange: wr.recordChange && {
        ...wr.recordChange,
        restore: !wr.recordChange.restore
      }
    }, ...jn].slice(0, 30)), wn(wr), Wn.slice(0, -1)) : Wn;
  }), Ct.current.redo = () => st(Wn => {
    const wr = Wn[0];
    return wr ? (Ge(jn => [...jn, {
      ...bt(),
      recordChange: wr.recordChange && {
        ...wr.recordChange,
        restore: !wr.recordChange.restore
      }
    }].slice(-30)), wn(wr), Wn.slice(1)) : Wn;
  }), Ct.current.clearMask = () => {
    var wr;
    const Wn = _t.current;
    !Wn || !Yn.current.maskActive || (at(), (wr = Wn.getContext("2d")) == null || wr.clearRect(0, 0, Wn.width, Wn.height), Ee(!1));
  }, g.useEffect(() => {
    const Wn = () => h(RX());
    return window.addEventListener(Jj, Wn), () => window.removeEventListener(Jj, Wn);
  }, []), g.useEffect(() => {
    Re(Wn => Wn && Cn.some(wr => wr.id === Wn) ? Wn : SUt(Cn) || "");
  }, [Cn]), g.useEffect(() => {
    Me && (rt(Wn => IUt(Me, Wn)), ze(Wn => GE(Me, Wn)));
  }, [Me]), g.useEffect(() => {
    const Wn = Ut.current;
    if (!Wn) return;
    const wr = () => A({
      w: Wn.clientWidth,
      h: Wn.clientHeight
    });
    wr();
    const jn = new ResizeObserver(wr);
    jn.observe(Wn);
    const _n = ar => {
      if (!Yn.current.previewUrl || rn.current) return;
      ar.preventDefault();
      const Vt = Wn.getBoundingClientRect(),
        vn = ar.deltaY * (ar.deltaMode === 1 ? 16 : ar.deltaMode === 2 ? Wn.clientHeight : 1);
      M.current = rFt(M.current, Math.exp(-vn * Ocr), ar.clientX - Vt.left - Vt.width / 2, ar.clientY - Vt.top - Vt.height / 2, {
        minZoom: .2,
        maxZoom: 6
      }), C(M.current);
    };
    return Wn.addEventListener("wheel", _n, {
      passive: !1
    }), () => {
      jn.disconnect(), Wn.removeEventListener("wheel", _n);
    };
  }, [e, f, o]), g.useEffect(() => {
    try {
      localStorage.removeItem("qdm_studio_connector_source_root"), localStorage.removeItem("qdm_studio_connector_probes");
    } catch {}
  }, []), g.useEffect(() => {
    s.catalog !== Ot.current && (Ot.current = s.catalog, t("home"));
  }, [s]), g.useEffect(() => {
    Ce(null);
  }, [e, o, p]), g.useEffect(() => {
    const Wn = s.request;
    !Wn || Wn.id === Qt.current || (Qt.current = Wn.id, t("edit"), d("当前图片"), (async () => {
      const wr = await UL(Wn.previewUrl || Wn.sourceUrl),
        jn = Wn.sourceUrl || Wn.previewUrl;
      Pt(wr, jn, !0);
      const _n = {
        id: `src-${Wn.id}`,
        url: wr,
        source: jn,
        label: "当前图片"
      };
      It(ar => [_n, ...ar.filter(Vt => Vt.id !== _n.id)]), We(_n.id), gt("");
    })());
  }, [s]), g.useEffect(() => {
    if (o !== "toolbox") return;
    const Wn = jn => {
        if (ln.current !== "edit") return;
        const _n = jn.target,
          ar = !!_n && (_n.tagName === "TEXTAREA" || _n.tagName === "INPUT" || _n.tagName === "SELECT" || _n.isContentEditable);
        if (jn.key === "Escape") {
          j(!1), Ce(null);
          return;
        }
        if ((jn.ctrlKey || jn.metaKey) && jn.key === "Enter") {
          jn.preventDefault(), Ct.current.generate();
          return;
        }
        if (ar) return;
        const Vt = jn.key.toLowerCase();
        (jn.ctrlKey || jn.metaKey) && Vt === "z" ? (jn.preventDefault(), jn.shiftKey ? Ct.current.redo() : Ct.current.undo()) : Vt === "v" ? m("move") : Vt === "m" ? m("select") : Vt === "b" ? m("brush") : Vt === "e" ? m("eraser") : (Vt === "delete" || Vt === "backspace") && Ct.current.clearMask();
      },
      wr = jn => {
        var ar;
        if (ln.current === "image-upscale") return;
        const _n = Array.from(((ar = jn.clipboardData) == null ? void 0 : ar.files) || []).find(Vt => Vt.type.startsWith("image/"));
        _n && (jn.preventDefault(), Ir(_n));
      };
    return window.addEventListener("keydown", Wn), window.addEventListener("paste", wr), () => {
      window.removeEventListener("keydown", Wn), window.removeEventListener("paste", wr);
    };
  }, [o]);
  const dt = () => X.current.find(Wn => Wn.id === Z.current) || null,
    xt = Wn => {
      const wr = re.current.get(Wn.id);
      if (wr) return wr;
      const jn = document.createElement("canvas");
      jn.width = Math.max(1, Math.round(Wn.bounds.width)), jn.height = Math.max(1, Math.round(Wn.bounds.height));
      const _n = jn.getContext("2d");
      if (_n && (_n.fillStyle = "#fff", _n.fillRect(0, 0, jn.width, jn.height), Wn.mask)) {
        const ar = new Image();
        ar.onload = () => {
          _n.clearRect(0, 0, jn.width, jn.height), _n.drawImage(ar, 0, 0, jn.width, jn.height);
        }, ar.src = Wn.mask;
      }
      return re.current.set(Wn.id, jn), jn;
    },
    yn = (Wn, wr) => {
      var jr, ea;
      const jn = xt(Wn),
        _n = jn.getContext("2d"),
        ar = (jr = _t.current) == null ? void 0 : jr.getBoundingClientRect();
      if (!_n || !ar) return;
      const Vt = ar.width > 0 ? (((ea = _t.current) == null ? void 0 : ea.width) || Wn.bounds.width) / ar.width : 1,
        vn = Math.max(1, Yn.current.brushSize * Vt / 2),
        An = Math.max(0, Yn.current.feather * Vt),
        ur = Math.max(.05, Yn.current.opacity / 100),
        zr = wr.x - Wn.bounds.x,
        Dr = wr.y - Wn.bounds.y;
      _n.save(), _n.globalCompositeOperation = Yn.current.tool === "eraser" ? "destination-out" : "source-over";
      const Wr = _n.createRadialGradient(zr, Dr, Math.max(0, vn - An), zr, Dr, vn + An);
      Wr.addColorStop(0, Yn.current.tool === "eraser" ? `rgba(0,0,0,${ur})` : `rgba(255,255,255,${ur})`), Wr.addColorStop(1, "rgba(0,0,0,0)"), _n.fillStyle = Wr, _n.beginPath(), _n.arc(zr, Dr, vn + An, 0, Math.PI * 2), _n.fill(), _n.restore();
      const gr = jn.toDataURL("image/png");
      Y(pa => pa.map(Br => Br.id === Wn.id ? {
        ...Br,
        mask: gr
      } : Br));
    },
    gn = (Wn, wr, jn) => {
      const _n = document.createElement("canvas");
      _n.width = Math.max(1, Math.round(Wn)), _n.height = Math.max(1, Math.round(wr));
      const ar = _n.getContext("2d");
      if (!ar) return "";
      if (jn(ar), _e <= 0) return _n.toDataURL("image/png");
      const Vt = document.createElement("canvas");
      Vt.width = _n.width, Vt.height = _n.height;
      const vn = Vt.getContext("2d");
      return vn ? (vn.filter = `blur(${_e}px)`, vn.drawImage(_n, 0, 0), Vt.toDataURL("image/png")) : _n.toDataURL("image/png");
    },
    mt = () => {
      const Wn = dt(),
        wr = be ? _t.current : null;
      if (!fe && !wr) {
        if (K === "base" && Q) {
          at(), q(""), gt("已清除选中图层蒙版");
          return;
        }
        if (Wn != null && Wn.mask) {
          at(), re.current.delete(Wn.id), Y(jn => jn.map(_n => _n.id === Wn.id ? {
            ..._n,
            mask: void 0
          } : _n)), gt("已清除选中图层蒙版");
          return;
        }
        gt("请先绘制蒙版或框选区域");
        return;
      }
      if (at(), !Wn) q(gn(_.w, _.h, jn => {
        jn.fillStyle = "#fff", fe ? jn.fillRect(fe.x, fe.y, fe.width, fe.height) : wr && jn.drawImage(wr, 0, 0);
      }));else {
        const jn = gn(Wn.bounds.width, Wn.bounds.height, _n => {
          _n.fillStyle = "#fff", fe ? _n.fillRect(fe.x - Wn.bounds.x, fe.y - Wn.bounds.y, fe.width, fe.height) : wr && _n.drawImage(wr, Wn.bounds.x, Wn.bounds.y, Wn.bounds.width, Wn.bounds.height, 0, 0, Wn.bounds.width, Wn.bounds.height);
        });
        re.current.delete(Wn.id), Y(_n => _n.map(ar => ar.id === Wn.id ? {
          ...ar,
          mask: jn
        } : ar));
      }
      ye(null), gt("已应用到选中图层蒙版");
    },
    Xt = Wn => {
      const wr = URL.createObjectURL(Wn),
        jn = new Image();
      jn.onload = () => {
        const _n = crypto.randomUUID();
        at(), Y(ar => [...ar, {
          id: _n,
          name: Wn.name.replace(/\.[a-z0-9]+$/i, "") || "新图层",
          content: wr,
          bounds: {
            x: 0,
            y: 0,
            width: jn.naturalWidth,
            height: jn.naturalHeight
          },
          opacity: 100,
          visible: !0
        }]), W(_n), U(!0);
      }, jn.src = wr;
    },
    Gn = Wn => {
      const wr = _t.current,
        jn = (wr || Wn.currentTarget).getBoundingClientRect(),
        _n = (wr == null ? void 0 : wr.width) || Yn.current.natural.w,
        ar = (wr == null ? void 0 : wr.height) || Yn.current.natural.h;
      return {
        x: Math.max(0, Math.min(_n, (Wn.clientX - jn.left) / jn.width * _n)),
        y: Math.max(0, Math.min(ar, (Wn.clientY - jn.top) / jn.height * ar))
      };
    },
    rr = (Wn, wr, jn = !1) => {
      const _n = _t.current,
        ar = _n == null ? void 0 : _n.getContext("2d");
      if (!_n || !ar) return;
      const Vt = _n.getBoundingClientRect(),
        vn = Vt.width > 0 ? _n.width / Vt.width : 1;
      ar.save(), ar.lineCap = "round", ar.lineJoin = "round", ar.lineWidth = Math.max(1, Yn.current.brushSize * vn), ar.globalAlpha = Yn.current.tool === "eraser" ? 1 : Yn.current.opacity / 100, ar.globalCompositeOperation = Yn.current.tool === "eraser" ? "destination-out" : "source-over", ar.strokeStyle = "rgba(255,45,45,1)", ar.fillStyle = "rgba(255,45,45,1)", ar.beginPath(), jn ? (ar.arc(wr.x, wr.y, ar.lineWidth / 2, 0, Math.PI * 2), ar.fill()) : (ar.moveTo(Wn.x, Wn.y), ar.lineTo(wr.x, wr.y), ar.stroke()), ar.restore(), Ee(!0);
    },
    qn = Wn => {
      if (!f || !Fcr(Wn.button, Wn.pointerType) || Wn.target.closest("button")) return;
      Wn.preventDefault(), j(!1), Wn.currentTarget.setPointerCapture(Wn.pointerId);
      const wr = Gn(Wn),
        jn = Wn.target.closest(".tb-frame"),
        _n = dt();
      if (jn && Yn.current.tool === "move" && _n && wr.x >= _n.bounds.x && wr.y >= _n.bounds.y && wr.x <= _n.bounds.x + _n.bounds.width && wr.y <= _n.bounds.y + _n.bounds.height) {
        rn.current = {
          kind: "layer",
          id: _n.id,
          x: wr.x,
          y: wr.y,
          px: _n.bounds.x,
          py: _n.bounds.y
        };
        return;
      }
      if (jn && (Yn.current.tool === "eraser" || Yn.current.tool === "brush") && _n) {
        at(), rn.current = {
          kind: "paint",
          x: wr.x,
          y: wr.y,
          px: 0,
          py: 0,
          id: _n.id
        }, yn(_n, wr);
        return;
      }
      if (!jn || Yn.current.tool === "move" || Wn.altKey || Wn.button === 1) {
        rn.current = {
          kind: "pan",
          x: Wn.clientX,
          y: Wn.clientY,
          px: M.current.x,
          py: M.current.y
        }, P(!0), Te(null);
        return;
      }
      if (Yn.current.tool === "select") {
        rn.current = {
          kind: "select",
          x: wr.x,
          y: wr.y,
          px: 0,
          py: 0
        }, ye(ffn(wr.x, wr.y, wr.x, wr.y, mfn(Yn.current.selectionRatio), Yn.current.natural.w, Yn.current.natural.h));
        return;
      }
      at(), rn.current = {
        kind: "paint",
        x: wr.x,
        y: wr.y,
        px: 0,
        py: 0
      }, rr(wr, wr, !0);
    },
    Dn = Wn => {
      var _n, ar;
      (p === "brush" || p === "eraser") && (Wn.target.closest(".tb-frame") || ((_n = rn.current) == null ? void 0 : _n.kind) === "paint") && ((ar = rn.current) == null ? void 0 : ar.kind) !== "pan" ? Te({
        x: Wn.clientX,
        y: Wn.clientY
      }) : Te(null);
      const wr = rn.current;
      if (!wr) return;
      if (wr.kind === "pan") {
        M.current = {
          ...M.current,
          x: wr.px + Wn.clientX - wr.x,
          y: wr.py + Wn.clientY - wr.y
        }, C(M.current);
        return;
      }
      const jn = Gn(Wn);
      if (wr.kind === "layer" && wr.id) {
        const Vt = jn.x - wr.x,
          vn = jn.y - wr.y;
        Y(An => An.map(ur => ur.id === wr.id ? {
          ...ur,
          bounds: {
            ...ur.bounds,
            x: wr.px + Vt,
            y: wr.py + vn
          }
        } : ur));
        return;
      }
      if (wr.kind === "paint" && wr.id) {
        const Vt = X.current.find(vn => vn.id === wr.id);
        Vt && yn(Vt, jn), rn.current = {
          ...wr,
          x: jn.x,
          y: jn.y
        };
        return;
      }
      if (wr.kind === "select") {
        const Vt = ffn(wr.x, wr.y, jn.x, jn.y, mfn(Yn.current.selectionRatio), Yn.current.natural.w, Yn.current.natural.h);
        Yn.current.selection = Vt, ye(Vt);
        return;
      }
      rr({
        x: wr.x,
        y: wr.y
      }, jn), rn.current = {
        ...wr,
        x: jn.x,
        y: jn.y
      };
    },
    Ar = () => {
      var wr;
      const Wn = Yn.current.selection;
      ((wr = rn.current) == null ? void 0 : wr.kind) === "select" && Wn && (Wn.width < 8 || Wn.height < 8) && (Yn.current.selection = null, ye(null)), rn.current = null, P(!1), Te(null);
    },
    _r = (Wn, wr, jn) => {
      const _n = {
        id: crypto.randomUUID(),
        url: Wn,
        source: wr,
        label: jn.slice(0, 24) || "图片"
      };
      It(ar => [_n, ...ar].slice(0, 40)), We(_n.id);
    },
    Pa = Wn => {
      var jn, _n;
      if (Wn.id === wt) {
        U(!0), m("move");
        return;
      }
      const wr = X.current.map(ar => ({
        ...ar,
        bounds: {
          ...ar.bounds
        }
      }));
      It(ar => ar.map(Vt => Vt.id === wt ? {
        ...Vt,
        patches: wr
      } : Vt)), Pt(Wn.url, Wn.source, !0), d(Wn.label), Y(Wn.patches || []), W(((_n = (jn = Wn.patches) == null ? void 0 : jn.slice(-1)[0]) == null ? void 0 : _n.id) || "base"), We(Wn.id);
    },
    fa = () => {
      const Wn = `画布 ${it.length + 1}`,
        wr = crypto.randomUUID(),
        jn = X.current.map(_n => ({
          ..._n,
          bounds: {
            ..._n.bounds
          }
        }));
      It(_n => [..._n.map(ar => ar.id === wt ? {
        ...ar,
        patches: jn
      } : ar), {
        id: wr,
        url: "",
        source: "",
        label: Wn
      }]), Pt("", "", !0), d(Wn), We(wr);
    },
    Ca = Wn => {
      const wr = {
        ...bt(),
        recordChange: {
          item: Wn,
          index: it.indexOf(Wn),
          restore: !0
        }
      };
      Ge(_n => [..._n.slice(-29), wr]), st([]);
      const jn = it.filter(_n => _n.id !== Wn.id);
      if (It(jn), Wn.id === wt) {
        const _n = jn[Math.min(it.indexOf(Wn), jn.length - 1)];
        Pt((_n == null ? void 0 : _n.url) || "", (_n == null ? void 0 : _n.source) || "", !1), d((_n == null ? void 0 : _n.label) || ""), Y((_n == null ? void 0 : _n.patches) || []), We((_n == null ? void 0 : _n.id) || null);
      }
      gt("已删除改图记录，可按 Ctrl + Z 撤销");
    },
    $n = Wn => {
      V({
        item: Wn,
        index: a.indexOf(Wn)
      }), i(wr => wr.filter(jn => jn.id !== Wn.id)), gt("已删除生成记录");
    },
    yr = () => {
      if (!z) return;
      const {
        item: Wn,
        index: wr
      } = z;
      APt([Wn]), i(jn => {
        if (jn.some(ar => ar.id === Wn.id)) return jn;
        const _n = [...jn];
        return _n.splice(Math.min(wr, _n.length), 0, Wn), _n;
      }), V(null), gt("已恢复生成记录");
    },
    Ir = Wn => {
      if (!Wn.type.startsWith("image/")) return;
      const wr = URL.createObjectURL(Wn);
      Pt(wr, wr, !0);
      const jn = Wn.name || "上传图片";
      d(jn), t("edit"), _r(wr, wr, jn), gt("");
    },
    Gr = Wn => {
      const wr = Array.from(Wn || []).filter(jn => jn.type.startsWith("image/"));
      wr.length && Fe(jn => [...jn, ...wr.map(_n => URL.createObjectURL(_n))].slice(0, w5));
    },
    Zr = async Wn => {
      if (!(N || Wn.status !== "completed")) {
        G(!0);
        try {
          const wr = await URt(Wn);
          if (!wr) throw new Error("这张历史图片暂时无法读取");
          const jn = String(wr.settings._ossRemoteUrl || wr.settings._blobUrl || wr.content);
          if (Yn.current.previewUrl) {
            const _n = await UL(jn);
            Fe(ar => ar.includes(_n) ? ar : [...ar, _n].slice(0, w5));
          } else {
            const _n = await UL(jn);
            Pt(_n, jn, !0), d(Wn.prompt || "历史图片"), _r(_n, jn, Wn.prompt || "历史图片");
          }
          j(!1), gt("已载入历史图片");
        } catch (wr) {
          gt(wr instanceof Error ? wr.message : String(wr));
        } finally {
          G(!1);
        }
      }
    },
    La = Wn => {
      const wr = qe.current,
        jn = (wr == null ? void 0 : wr.selectionStart) ?? Ne.length,
        _n = (wr == null ? void 0 : wr.selectionEnd) ?? jn,
        ar = `@${Wn + 1} `;
      me(`${Ne.slice(0, jn)}${ar}${Ne.slice(_n)}`.slice(0, 2e3)), requestAnimationFrame(() => {
        wr == null || wr.focus(), wr == null || wr.setSelectionRange(jn + ar.length, jn + ar.length);
      });
    },
    sa = Wn => {
      Fe(wr => wr.filter((jn, _n) => _n !== Wn)), me(wr => wr.replace(ET, jn => {
        const _n = v3(jn);
        return _n === Wn + 1 ? "" : _n && _n > Wn + 1 ? `@${_n - 1}` : jn;
      }));
    },
    Ea = async () => {
      if (Pn.current) return;
      if (!Yn.current.previewUrl || !Yn.current.sourceUrl) {
        gt("先上传或从画布打开一张图片");
        return;
      }
      if (!un) {
        gt("未找到可用的绘画模型，请先在设置里接入");
        return;
      }
      Pn.current = !0, Ht(!0), pt(6), gt(Le > 1 ? `生成中 1/${Le}` : "生成中");
      const Wn = Yn.current.sourceUrl,
        wr = kt.current,
        jn = {
          ...Yn.current.natural
        },
        _n = [...Ae],
        ar = Ne.trim(),
        Vt = UPt(ar, _n.map(() => ({
          type: "image"
        }))),
        vn = !Yn.current.maskActive && Yn.current.selection && Yn.current.selection.width >= 8 && Yn.current.selection.height >= 8 && Yn.current.natural.w > 0 ? {
          ...Yn.current.selection
        } : null,
        An = vn && (!$e || $e.toLowerCase() === "auto") ? X7(vn.width, vn.height, Kn) : $e,
        ur = !vn && Yn.current.maskActive && _t.current ? klo(_t.current, Yn.current.feather) : null,
        zr = {
          selectedModel: un.id,
          model: un.id,
          ratio: An,
          resolution: nt || "2K",
          useAsyncMode: !0,
          genUseAliyunOss: ua(),
          platformGroup: Jn ? Xe : void 0
        };
      Pf(un.id) && (zr.gptImage2AspectRatio = An, zr.gptImage2Resolution = nt || "2K");
      let Dr = "";
      vn && we({
        ...vn
      });
      try {
        const Wr = vn ? await UL(Wn) : Wn,
          gr = vn ? await mDe.dimensions(Wr) : null,
          jr = (gr == null ? void 0 : gr.width) || jn.w,
          ea = (gr == null ? void 0 : gr.height) || jn.h,
          pa = vn ? {
            ...vn,
            x: vn.x * jr / jn.w,
            y: vn.y * ea / jn.h,
            width: vn.width * jr / jn.w,
            height: vn.height * ea / jn.h
          } : null,
          Br = vn ? {
            x: vn.x,
            y: vn.y,
            width: vn.width,
            height: vn.height
          } : null;
        let tn = "",
          Lr = "",
          br = !1;
        for (let Jr = 0; Jr < Le; Jr += 1) {
          Dr = crypto.randomUUID();
          const Kr = Date.now(),
            Hr = {
              id: Dr,
              type: "image",
              url: "",
              prompt: ar || (vn ? "局部改图" : "改图结果"),
              time: new Date(Kr).toLocaleTimeString(),
              timestamp: Kr,
              startTime: Kr,
              status: "generating",
              progress: 6,
              modelName: un.provider || un.modelName || un.id,
              sourceNodeId: "studio-toolbox",
              ratio: An
            };
          i(va => [Hr, ...(ua() ? va : va.slice(0, 99))]);
          const ha = va => {
            pt(Math.round((Jr + va / 100) / Le * 100));
            const Kt = Hr.id;
            i(Pr => Pr.map(kr => kr.id === Kt ? {
              ...kr,
              progress: va
            } : kr));
          };
          gt(Le > 1 ? `生成中 ${Jr + 1}/${Le}` : "生成中");
          let Ga;
          if (pa) {
            const va = await B0r({
              source: Wr,
              refs: _n,
              prompt: Vt || "局部改图",
              config: un,
              ratio: An,
              resolution: nt || "2K",
              platformGroup: Jn ? Xe : void 0,
              settings: zr,
              historyId: Dr,
              nodeId: "studio-toolbox",
              region: {
                selection: pa,
                naturalWidth: jr,
                naturalHeight: ea,
                replaceTargetWithRefs: D0r(Vt, _n.length),
                exactSelection: !0
              }
            }, {
              ...mDe,
              run: r,
              resolveMedia: UL,
              resolveResult: async ({
                apiUrl: Mr
              }) => ({
                displayUrl: Mr,
                layerContent: Mr,
                historyExtras: {}
              })
            }, () => !0, ha);
            if (!va) throw new Error("改图未返回图片");
            if (!va.bounds) throw new Error("缺少选区位置，无法拼回原图");
            const Kt = await UL(va.resolved.layerContent),
              Pr = {
                x: pa.x,
                y: pa.y,
                width: pa.width,
                height: pa.height
              },
              kr = await CUt(Wr, jr, ea, 100, [{
                content: Kt,
                bounds: Pr,
                opacity: 100,
                visible: !0,
                fit: "fill"
              }]);
            Ga = await BSt({
              apiUrl: await UL(kr.contentRef),
              taskId: Dr,
              nodeId: "studio-toolbox",
              fallbackWidth: kr.width,
              fallbackHeight: kr.height
            }), kt.current === wr && (br || (at(), br = !0), Y(Mr => [...Mr, {
              id: Dr,
              name: (ar || "改图结果").slice(0, 24),
              content: Kt,
              bounds: Br || Pr,
              opacity: 100,
              visible: !0
            }]), W(Dr), U(!0));
          } else {
            const va = await r(Wn, `${_lo(_n.length)}${Vt || (ur ? "只修改蒙版标出的区域" : "自然改图")}`, un, An, nt || "2K", {
                refImages: _n,
                markerMasks: ur ? [{
                  nodeId: `toolbox-mask-${Date.now()}`,
                  mask: ur.mask,
                  width: ur.width,
                  height: ur.height
                }] : void 0,
                platformGroup: Jn ? Xe : void 0,
                genUseAliyunOss: ua(),
                sourceSettings: zr,
                onProgress: ha
              }),
              Kt = va == null ? void 0 : va[0];
            if (!Kt) throw new Error("改图完成但未返回图片地址");
            const Pr = await mDe.dimensions(Kt);
            Ga = await BSt({
              apiUrl: Kt,
              taskId: Dr,
              nodeId: "studio-toolbox",
              fallbackWidth: Pr.width,
              fallbackHeight: Pr.height
            });
          }
          tn = await UL(Ga.layerContent || Ga.displayUrl), Lr = Ga.layerContent || Ga.displayUrl;
          const Za = {
            ...Hr,
            ...Ga.historyExtras,
            url: Ga.displayUrl,
            status: "completed",
            progress: 100,
            width: Ga.width,
            height: Ga.height,
            durationMs: Date.now() - Kr
          };
          i(va => va.map(Kt => Kt.id === Hr.id ? Za : Kt)), LT(Hr.id, Ga.displayUrl, i);
        }
        if (kt.current === wr && !pa) {
          const Jr = ar.slice(0, 24) || "改图结果";
          It(Kr => Kr.map(ir => ir.source === Wn || ir.url === Wn ? {
            ...ir,
            url: tn,
            source: Lr,
            label: Jr
          } : ir)), Pt(tn, Lr, !0, !1), d(Jr);
        }
        gt("完成"), pt(100);
      } catch (Wr) {
        const gr = Wr instanceof Error ? Wr.message : String(Wr);
        gt(gr), i(jr => jr.map(ea => ea.id === Dr && ea.status === "generating" ? {
          ...ea,
          status: "failed",
          errorMsg: gr
        } : ea));
      } finally {
        Pn.current = !1, Ht(!1), we(null);
      }
    };
  Ct.current.generate = () => {
    Ea();
  };
  const ba = Wn => new Promise((wr, jn) => {
      const _n = new Image();
      _n.crossOrigin = "anonymous", _n.onload = () => wr(_n), _n.onerror = () => jn(new Error("导出图片读取失败")), _n.src = Wn;
    }),
    ga = async Wn => {
      const wr = await ba(f),
        jn = wr.naturalWidth || _.w,
        _n = wr.naturalHeight || _.h,
        ar = document.createElement("canvas");
      ar.width = jn, ar.height = _n;
      const Vt = ar.getContext("2d");
      if (!Vt) throw new Error("无法创建导出画布");
      const vn = [],
        An = () => {
          const ur = document.createElement("canvas");
          return ur.width = jn, ur.height = _n, ur;
        };
      // PSD plates retain source alpha. Visibility and opacity affect only the
      // merged preview and layer metadata, so a hidden layer stays editable.
      Wn && (Vt.fillStyle = "#fff", Vt.fillRect(0, 0, jn, _n));
      {
        const ur = An(),
          zr = ur.getContext("2d");
        if (zr && (zr.drawImage(wr, 0, 0, jn, _n), Q)) {
          const Dr = await ba(Q);
          zr.globalCompositeOperation = "destination-in", zr.drawImage(Dr, 0, 0, jn, _n);
        }
        vn.push({
          name: l || "原图",
          canvas: ur,
          opacity: le / 100,
          visible: ne
        });
        if (ne) {
          Vt.save(), Vt.globalAlpha = le / 100, Vt.drawImage(ur, 0, 0), Vt.restore();
        }
      }
      for (const ur of H) {
        const zr = An(),
          Dr = zr.getContext("2d");
        if (Dr) {
          const Wr = await ba(ur.content);
          if (Dr.drawImage(Wr, ur.bounds.x, ur.bounds.y, ur.bounds.width, ur.bounds.height), ur.mask) {
            const gr = await ba(ur.mask);
            Dr.globalCompositeOperation = "destination-in", Dr.drawImage(gr, ur.bounds.x, ur.bounds.y, ur.bounds.width, ur.bounds.height);
          }
        }
        vn.push({
          name: ur.name,
          canvas: zr,
          opacity: ur.opacity / 100,
          visible: ur.visible !== !1
        });
        if (ur.visible !== !1) {
          Vt.save(), Vt.globalAlpha = ur.opacity / 100, Vt.drawImage(zr, 0, 0), Vt.restore();
        }
      }
      return {
        canvas: ar,
        plates: vn
      };
    },
    _a = (Wn, wr) => {
      const jn = URL.createObjectURL(Wn),
        _n = document.createElement("a");
      _n.href = jn, _n.download = wr, document.body.appendChild(_n), _n.click(), _n.remove(), setTimeout(() => URL.revokeObjectURL(jn), 1500);
    },
    $a = async () => {
      var jn;
      if (!f) return;
      const Wn = He === "psd" ? "PSD（分层）" : He.toUpperCase(),
        wr = Uv(`正在导出 ${Wn}…`, 12);
      try {
        const {
            canvas: _n,
            plates: ar
          } = await ga(He === "jpg"),
          Vt = `改图-${Date.now()}.${He === "jpg" ? "jpg" : He}`,
          vn = He === "psd" ? $0r(_n.width, _n.height, ar.map(Dr => {
            var gr;
            const Wr = (gr = Dr.canvas.getContext("2d")) == null ? void 0 : gr.getImageData(0, 0, _n.width, _n.height).data;
            if (!Wr) throw new Error("读取图层像素失败");
            return {
              name: Dr.name,
              pixels: Wr,
              opacity: Dr.opacity,
              visible: Dr.visible
            };
          }), ((jn = _n.getContext("2d")) == null ? void 0 : jn.getImageData(0, 0, _n.width, _n.height).data) || (() => {
            throw new Error("读取合成像素失败");
          })()) : await new Promise((Dr, Wr) => _n.toBlob(gr => gr ? Dr(gr) : Wr(new Error("导出编码失败")), He === "jpg" ? "image/jpeg" : He === "webp" ? "image/webp" : "image/png", .92));
        let An = "";
        try {
          const {
            saveToDisk: Dr
          } = await Ie(async () => {
            const {
              saveToDisk: Wr
            } = await Promise.resolve().then(() => Sde);
            return {
              saveToDisk: Wr
            };
          }, void 0, import.meta.url);
          An = await Dr(vn, Vt);
        } catch {
          _a(vn, Vt);
        }
        gg(wr);
        const ur = An ? `文件已保存到「${An}」` : tYe(localStorage.getItem("qiaodoumayi_download_directory"), navigator.userAgent),
          zr = `下载完成！已导出 ${Wn}
${ur}`;
        iT(zr, {
          duration: 6e3,
          noticeKey: "download"
        }), gt(zr.replace(`
`, " · "));
      } catch (_n) {
        gg(wr);
        const ar = _n instanceof Error ? _n.message : "导出失败，请换一张本地图片后再试";
        iT(ar, {
          type: "error",
          duration: 5e3,
          noticeKey: "download"
        }), gt(ar);
      }
    },
    Ya = async () => {
      if (!(!f || !H.length)) try {
        at();
        const {
            canvas: Wn
          } = await ga(!1),
          wr = Wn.toDataURL("image/png");
        y(wr), v(wr), Y([]), q(""), J(100), de(!0), W("base"), gt("已合并为当前画布");
      } catch (Wn) {
        gt(Wn instanceof Error ? Wn.message : "合并图层失败");
      }
    },
    ta = be ? "红色区域会改，其余保持" : fe && fe.width >= 8 ? `选区 ${Math.round(fe.width)} × ${Math.round(fe.height)}` : "整图改图";
  return e !== "home" && e !== "edit" ? null : e === "home" ? c.jsx("section", {
    className: "tb-home",
    "aria-label": x("工具"),
    children: c.jsxs("div", {
      className: "tb-home-inner",
      children: [c.jsxs("header", {
        className: "tb-home-head",
        children: [c.jsxs("div", {
          children: [c.jsx("h1", {
            children: x("工具")
          }), c.jsx("p", {
            children: x("选一件工具，单独做完。")
          })]
        }), c.jsxs("span", {
          className: "tb-home-total",
          children: [Ylt.length + JQ.length, " ", x("个工具")]
        })]
      }), c.jsxs("section", {
        className: "tb-home-section",
        "aria-labelledby": "tb-creation-heading",
        children: [c.jsxs("div", {
          className: "tb-home-section-head",
          children: [c.jsx("h2", {
            id: "tb-creation-heading",
            children: x("图像与创作")
          }), c.jsx("span", {
            children: Ylt.length
          })]
        }), c.jsx("div", {
          className: "tb-home-grid",
          children: Ylt.map(({
            id: Wn,
            label: wr,
            description: jn,
            icon: _n
          }) => c.jsxs("button", {
            type: "button",
            className: "tb-home-card",
            onClick: () => t(Wn),
            children: [c.jsx("span", {
              className: "tb-home-mark",
              "aria-hidden": !0,
              children: c.jsx(_n, {
                size: 21,
                strokeWidth: 1.5
              })
            }), c.jsxs("span", {
              className: "tb-home-copy",
              children: [c.jsx("strong", {
                children: x(wr)
              }), c.jsx("small", {
                children: x(jn)
              })]
            }), c.jsx(eI, {
              className: "tb-home-arrow",
              size: 16,
              "aria-hidden": !0
            })]
          }, Wn))
        })]
      }), c.jsxs("section", {
        className: "tb-home-section tb-home-section--patterns",
        "aria-labelledby": "tb-pattern-heading",
        children: [c.jsxs("div", {
          className: "tb-home-section-head",
          children: [c.jsx("h2", {
            id: "tb-pattern-heading",
            children: x("图形与纹理")
          }), c.jsx("span", {
            children: JQ.length
          })]
        }), c.jsx("div", {
          className: "tb-home-grid",
          children: JQ.map(({
            id: Wn,
            label: wr,
            description: jn,
            icon: _n
          }) => c.jsxs("button", {
            type: "button",
            className: "tb-home-card tb-home-card--pattern",
            onClick: () => t(Wn),
            children: [c.jsx("span", {
              className: "tb-home-mark",
              "aria-hidden": !0,
              children: c.jsx(_n, {
                size: 24,
                strokeWidth: 1.25
              })
            }), c.jsxs("span", {
              className: "tb-home-copy",
              children: [c.jsx("strong", {
                children: x(wr)
              }), c.jsx("small", {
                children: x(jn)
              })]
            }), c.jsx(eI, {
              className: "tb-home-arrow",
              size: 14,
              "aria-hidden": !0
            })]
          }, Wn))
        })]
      })]
    })
  }) : c.jsxs("section", {
    className: "studio-toolbox",
    "aria-label": x("改图"),
    "data-studio-workspace": "toolbox",
    onDragOver: Wn => {
      Wn.preventDefault(), Wn.stopPropagation();
    },
    onDrop: Wn => {
      var jn;
      Wn.preventDefault(), Wn.stopPropagation();
      const wr = (jn = Wn.dataTransfer.files) == null ? void 0 : jn[0];
      wr && Ir(wr);
    },
    children: [c.jsx("div", {
      className: "tb-body",
      children: c.jsxs("div", {
        className: "tb-stage",
        children: [c.jsxs("header", {
          className: "tb-stage-head",
          children: [c.jsx("button", {
            type: "button",
            className: "tb-leave",
            title: x("返回工具"),
            "aria-label": x("返回工具"),
            onClick: () => {
              j(!1), t("home");
            },
            children: c.jsx(uw, {
              size: 15
            })
          }), c.jsx("span", {
            className: "tb-stage-title",
            children: x("改图")
          }), c.jsxs("div", {
            className: "tb-edit-tabs",
            role: "tablist",
            "aria-label": x("改图历史"),
            children: [it.map(Wn => c.jsxs("button", {
              type: "button",
              role: "tab",
              "aria-selected": Wn.id === wt,
              className: `tb-edit-tab${Wn.id === wt ? " is-active" : ""}`,
              title: Wn.label || x("未命名"),
              onClick: () => Pa(Wn),
              children: [c.jsx("span", {
                children: Wn.label || x("未命名")
              }), c.jsx("span", {
                className: "tb-edit-tab-close",
                role: "button",
                "aria-label": x("关闭 {0}", Wn.label || "未命名"),
                onClick: wr => {
                  wr.stopPropagation(), Ca(Wn);
                },
                children: c.jsx(Na, {
                  size: 12
                })
              })]
            }, Wn.id)), c.jsx("button", {
              type: "button",
              className: "tb-edit-tab-add",
              title: x("新建改图"),
              "aria-label": x("新建改图"),
              onClick: fa,
              children: c.jsx(eo, {
                size: 14
              })
            })]
          })]
        }), c.jsxs("aside", {
          className: "tb-rail",
          "aria-label": x("图片切换"),
          children: [c.jsx("button", {
            type: "button",
            className: `tb-rail-button${R ? " is-on" : ""}`,
            title: x("生成历史"),
            "aria-label": x("生成历史"),
            "aria-expanded": R,
            "aria-controls": "tb-history-panel",
            onClick: () => j(Wn => !Wn),
            children: c.jsx(Wv, {
              size: 17
            })
          }), c.jsx("button", {
            type: "button",
            className: `tb-rail-button${D ? " is-on" : ""}`,
            title: x("图层"),
            "aria-label": x("图层"),
            "aria-expanded": D,
            "aria-controls": "tb-layers",
            onClick: () => U(Wn => !Wn),
            children: c.jsx(ixe, {
              size: 17
            })
          }), c.jsxs("button", {
            type: "button",
            className: `tb-rail-button${O ? " is-on" : ""}`,
            title: x("图片列表"),
            "aria-label": x("图片列表"),
            "aria-expanded": O,
            "aria-controls": "tb-image-strip",
            onClick: () => L(Wn => !Wn),
            children: [c.jsx(Y2, {
              size: 17
            }), it.length > 0 ? c.jsx("span", {
              className: "tb-badge",
              children: it.length
            }) : null]
          }), O ? c.jsxs("div", {
            className: "tb-image-strip",
            id: "tb-image-strip",
            children: [c.jsx("div", {
              className: "tb-image-scroll",
              children: it.map((Wn, wr) => c.jsxs("div", {
                className: "tb-image-entry",
                children: [c.jsxs("button", {
                  type: "button",
                  className: `tb-image-thumb${Wn.id === wt ? " is-current" : ""}`,
                  title: `${wr + 1} · ${Wn.label}`,
                  "aria-label": x("切换图片 {0}：{1}", wr + 1, Wn.label),
                  "aria-pressed": Wn.id === wt,
                  onClick: () => Pa(Wn),
                  children: [Wn.url ? c.jsx("img", {
                    src: Wn.url,
                    alt: ""
                  }) : c.jsx("span", {
                    children: x("空")
                  }), c.jsx("span", {
                    children: wr + 1
                  })]
                }), c.jsx("button", {
                  type: "button",
                  className: "tb-image-delete",
                  title: x("删除这条改图记录"),
                  "aria-label": x("删除改图记录 {0}：{1}", wr + 1, Wn.label),
                  onClick: () => Ca(Wn),
                  children: c.jsx(Na, {
                    size: 10
                  })
                })]
              }, Wn.id))
            }), c.jsx("button", {
              type: "button",
              className: "tb-add-image",
              title: x("上传新图片"),
              "aria-label": x("上传新图片"),
              onClick: () => {
                var Wn;
                return (Wn = At.current) == null ? void 0 : Wn.click();
              },
              children: c.jsx(eo, {
                size: 18
              })
            }), c.jsx("button", {
              type: "button",
              className: "tb-add-image",
              title: x("新建空白画布"),
              "aria-label": x("空白画布"),
              onClick: fa,
              children: c.jsx(Uae, {
                size: 14
              })
            }), wt && c.jsx("button", {
              type: "button",
              className: "tb-add-image tb-delete-current",
              title: x("删除当前改图记录"),
              "aria-label": x("删除当前改图记录"),
              onClick: () => {
                const Wn = it.find(wr => wr.id === wt);
                Wn && Ca(Wn);
              },
              children: c.jsx(Qo, {
                size: 14
              })
            })]
          }) : null]
        }), D && f && !R ? c.jsxs("aside", {
          className: "tb-layers",
          id: "tb-layers",
          "aria-label": x("图层"),
          children: [c.jsxs("div", {
            className: "tb-layers-head",
            children: [c.jsx("strong", {
              children: x("图层")
            }), c.jsx("button", {
              type: "button",
              title: x("合并所有图层为当前画布"),
              "aria-label": x("合并图层"),
              disabled: !H.length,
              onClick: () => void Ya(),
              children: c.jsx(ixe, {
                size: 14
              })
            })]
          }), c.jsx("button", {
            type: "button",
            className: "tb-layer-upload",
            onClick: () => {
              var Wn;
              return (Wn = pe.current) == null ? void 0 : Wn.click();
            },
            children: x("+ 上传新图层")
          }), ce ? c.jsxs("div", {
            className: "tb-layer-row is-busy",
            children: [c.jsx("span", {}), c.jsx("span", {
              className: "tb-layer-mark",
              "aria-hidden": !0,
              children: c.jsx(Ua, {
                size: 16
              })
            }), c.jsxs("div", {
              children: [c.jsx("strong", {
                children: x("生成中")
              }), c.jsxs("small", {
                children: [Math.round(ce.width), "×", Math.round(ce.height)]
              }), c.jsxs("small", {
                children: ["X:", Math.round(ce.x), " Y:", Math.round(ce.y)]
              })]
            }), c.jsx("span", {})]
          }) : null, [...H].reverse().map(Wn => c.jsxs("div", {
            className: `tb-layer-row is-region${K === Wn.id ? " is-on" : ""}${Wn.visible === !1 ? " is-hidden" : ""}`,
            onClick: () => W(Wn.id),
            children: [c.jsx("button", {
              type: "button",
              "aria-label": Wn.visible === !1 ? x("显示图层") : x("隐藏图层"),
              onClick: wr => {
                wr.stopPropagation(), Y(jn => jn.map(_n => _n.id === Wn.id ? {
                  ..._n,
                  visible: _n.visible === !1
                } : _n));
              },
              children: Wn.visible === !1 ? c.jsx($d, {
                size: 14
              }) : c.jsx(ul, {
                size: 14
              })
            }), c.jsx("img", {
              src: Wn.content,
              alt: "",
              style: Wn.mask ? {
                WebkitMaskImage: `url(${Wn.mask})`,
                maskImage: `url(${Wn.mask})`,
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%"
              } : void 0
            }), c.jsxs("div", {
              children: [c.jsx("strong", {
                children: Wn.name
              }), c.jsxs("small", {
                children: [Wn.mask ? x("已蒙版 · ") : "", Math.round(Wn.bounds.width), "×", Math.round(Wn.bounds.height), " · X:", Math.round(Wn.bounds.x), " Y:", Math.round(Wn.bounds.y)]
              }), c.jsxs("label", {
                children: [c.jsx("input", {
                  "aria-label": x("{0}透明度", Wn.name),
                  type: "range",
                  min: 0,
                  max: 100,
                  value: Wn.opacity,
                  onPointerDown: wr => wr.stopPropagation(),
                  onClick: wr => wr.stopPropagation(),
                  onChange: wr => {
                    const jn = Number(wr.target.value);
                    Y(_n => _n.map(ar => ar.id === Wn.id ? {
                      ...ar,
                      opacity: jn
                    } : ar));
                  }
                }), c.jsxs("span", {
                  children: [Wn.opacity, "%"]
                })]
              })]
            }), c.jsx("button", {
              type: "button",
              "aria-label": x("删除图层 {0}", Wn.name),
              title: x("删除图层"),
              onClick: wr => {
                wr.stopPropagation(), at(), re.current.delete(Wn.id), Y(jn => jn.filter(_n => _n.id !== Wn.id)), K === Wn.id && W("base");
              },
              children: c.jsx(Qo, {
                size: 14
              })
            })]
          }, Wn.id)), c.jsxs("div", {
            className: `tb-layer-row${K === "base" ? " is-on" : ""}${ne ? "" : " is-hidden"}`,
            onClick: () => W("base"),
            children: [c.jsx("button", {
              type: "button",
              "aria-label": x(ne ? "隐藏原图" : "显示原图"),
              onClick: Wn => {
                Wn.stopPropagation(), de(wr => !wr);
              },
              children: ne ? c.jsx(ul, {
                size: 14
              }) : c.jsx($d, {
                size: 14
              })
            }), c.jsx("img", {
              src: f,
              alt: ""
            }), c.jsxs("div", {
              children: [c.jsx("strong", {
                children: l || x("原图")
              }), c.jsxs("small", {
                children: [Q ? x("已蒙版 · ") : "", _.w || 0, "×", _.h || 0, " · X:0 Y:0"]
              }), c.jsxs("label", {
                children: [c.jsx("input", {
                  "aria-label": x("原图透明度"),
                  type: "range",
                  min: 0,
                  max: 100,
                  value: le,
                  onPointerDown: Wn => Wn.stopPropagation(),
                  onClick: Wn => Wn.stopPropagation(),
                  onChange: Wn => J(Number(Wn.target.value))
                }), c.jsxs("span", {
                  children: [le, "%"]
                })]
              })]
            }), c.jsx("button", {
              type: "button",
              "aria-label": x("原图已锁定"),
              title: x("原图已锁定"),
              disabled: !0,
              children: c.jsx(ece, {
                size: 14
              })
            })]
          })]
        }) : null, R ? c.jsxs("aside", {
          className: "tb-history",
          id: "tb-history-panel",
          "aria-label": x("生成历史列表"),
          children: [c.jsxs("div", {
            className: "tb-history-head",
            children: [c.jsxs("strong", {
              children: [x("生成历史 "), c.jsx("small", {
                children: Tt.length
              })]
            }), c.jsx("button", {
              type: "button",
              "aria-label": x("收起生成历史"),
              onClick: () => j(!1),
              children: c.jsx(Na, {
                size: 14
              })
            })]
          }), c.jsxs("p", {
            className: "tb-history-note",
            children: [x("与画布共用历史，点击"), x(f ? "添加为参考" : "载入改图")]
          }), c.jsxs("div", {
            className: "tb-history-list",
            children: [Tt.length === 0 ? c.jsx("p", {
              className: "tb-empty-note",
              children: x("完成的绘画作品会出现在这里。")
            }) : Tt.slice(0, B).map(Wn => c.jsxs("div", {
              className: "tb-history-entry",
              children: [c.jsxs("button", {
                type: "button",
                className: "tb-history-use",
                "aria-label": x("引用历史：{0}", Wn.prompt || "生成作品"),
                disabled: Wn.status !== "completed" || N || !!f && Ae.length >= w5,
                onClick: () => void Zr(Wn),
                children: [Wn.status === "completed" ? c.jsx(Qg, {
                  entry: {
                    id: Wn.id,
                    createdAt: 0,
                    mediaType: "image",
                    content: Wn.url,
                    originalUrl: Wn.originalUrl || Wn.url,
                    thumbnailUrl: Wn.thumbnailUrl || Wn.url,
                    assetId: Wn._assetId,
                    generatedImages: []
                  }
                }) : c.jsx("span", {
                  className: "tb-history-state",
                  children: Wn.status === "generating" ? x("生成中 {0}%", Math.round(Wn.progress)) : x("生成失败")
                }), c.jsx("small", {
                  children: Wn.prompt || x("生成作品")
                })]
              }), c.jsx("button", {
                type: "button",
                className: "tb-history-delete",
                title: x("删除共用生成历史中的记录"),
                "aria-label": x("删除生成记录：{0}", Wn.prompt || "生成作品"),
                disabled: Wn.status === "generating",
                onClick: () => $n(Wn),
                children: c.jsx(Qo, {
                  size: 12
                })
              })]
            }, Wn.id)), Tt.length > B && c.jsx("button", {
              type: "button",
              className: "tb-history-more",
              onClick: () => F(Wn => Wn + 80),
              children: x("加载更多")
            })]
          })]
        }) : null, c.jsxs("div", {
          ref: Ut,
          className: `tb-viewport${T ? " is-panning" : ""}`,
          onPointerDown: qn,
          onPointerMove: Dn,
          onPointerUp: Ar,
          onPointerCancel: Ar,
          onLostPointerCapture: Ar,
          onPointerLeave: () => Te(null),
          children: [f ? c.jsx("div", {
            className: "tb-world",
            style: {
              transform: `translate(${E.x}px, ${E.y}px) scale(${I})`
            },
            children: c.jsxs("div", {
              className: `tb-frame${p === "brush" || p === "eraser" ? " is-paint" : ""}`,
              style: {
                width: et,
                height: ft,
                cursor: p === "move" ? "grab" : p === "select" ? "crosshair" : "none"
              },
              children: [c.jsx("img", {
                src: f,
                alt: x("改图原图"),
                draggable: !1,
                style: {
                  opacity: ne ? le / 100 : 0,
                  WebkitMaskImage: Q ? `url(${Q})` : void 0,
                  maskImage: Q ? `url(${Q})` : void 0,
                  WebkitMaskSize: "100% 100%",
                  maskSize: "100% 100%"
                },
                onLoad: Wn => {
                  const wr = Wn.currentTarget,
                    jn = wr.naturalWidth,
                    _n = wr.naturalHeight;
                  w({
                    w: jn,
                    h: _n
                  });
                  const ar = _t.current;
                  if (!ar || !jn || !_n) return;
                  const Vt = `${f}|${jn}|${_n}`,
                    vn = St.current;
                  if (hn.current === Vt && !vn || (hn.current = Vt, ar.width = jn, ar.height = _n, St.current = "", !vn)) return;
                  const An = ar.getContext("2d"),
                    ur = new Image();
                  ur.onload = () => An == null ? void 0 : An.drawImage(ur, 0, 0, jn, _n), ur.src = vn;
                }
              }), c.jsx("canvas", {
                ref: _t
              }), H.map(Wn => Wn.visible === !1 ? null : c.jsx("img", {
                className: `tb-patch${K === Wn.id ? " is-on" : ""}`,
                src: Wn.content,
                alt: "",
                style: {
                  left: `${Wn.bounds.x / (_.w || 1) * 100}%`,
                  top: `${Wn.bounds.y / (_.h || 1) * 100}%`,
                  width: `${Wn.bounds.width / (_.w || 1) * 100}%`,
                  height: `${Wn.bounds.height / (_.h || 1) * 100}%`,
                  opacity: Wn.opacity / 100,
                  WebkitMaskImage: Wn.mask ? `url(${Wn.mask})` : void 0,
                  maskImage: Wn.mask ? `url(${Wn.mask})` : void 0,
                  WebkitMaskSize: "100% 100%",
                  maskSize: "100% 100%"
                }
              }, Wn.id)), ce ? c.jsx("div", {
                className: "tb-gen",
                style: {
                  left: `${ce.x / (_.w || 1) * 100}%`,
                  top: `${ce.y / (_.h || 1) * 100}%`,
                  width: `${ce.width / (_.w || 1) * 100}%`,
                  height: `${ce.height / (_.h || 1) * 100}%`
                },
                children: c.jsx(Ua, {
                  size: 22
                })
              }) : null, p === "select" && fe && fe.width >= 2 && !ce ? c.jsx("div", {
                className: "tb-sel",
                style: {
                  left: `${fe.x / (_.w || 1) * 100}%`,
                  top: `${fe.y / (_.h || 1) * 100}%`,
                  width: `${fe.width / (_.w || 1) * 100}%`,
                  height: `${fe.height / (_.h || 1) * 100}%`
                }
              }) : null]
            })
          }) : c.jsxs("button", {
            type: "button",
            className: "tb-upload",
            onClick: () => {
              var Wn;
              return (Wn = At.current) == null ? void 0 : Wn.click();
            },
            children: [c.jsx("span", {
              className: "tb-upload-mark",
              children: c.jsx(ml, {
                size: 25,
                strokeWidth: 1.5
              })
            }), c.jsx("strong", {
              children: x("上传图片开始改图")
            }), c.jsx("small", {
              children: x("拖入图片，或 Ctrl + V 粘贴")
            }), c.jsxs("span", {
              className: "tb-upload-action",
              children: [c.jsx(eo, {
                size: 14
              }), x("选择图片")]
            })]
          }), ve && (p === "brush" || p === "eraser") ? c.jsx("div", {
            className: "tb-cursor",
            style: {
              left: ve.x,
              top: ve.y,
              width: xe,
              height: xe
            }
          }) : null]
        }), f ? c.jsxs(c.Fragment, {
          children: [c.jsxs("button", {
            type: "button",
            className: "tb-zoom",
            "aria-label": x("适应画布"),
            title: x("重置位置并适应画布"),
            onClick: jt,
            children: [c.jsx(Gue, {
              size: 13
            }), c.jsxs("span", {
              children: [Math.round(Ue * I * 100), "%"]
            })]
          }), c.jsxs("div", {
            className: "tb-pill tb-size",
            children: [_.w || "—", " × ", _.h || "—", x(" · 显示 "), Math.round(et * I), " × ", Math.round(ft * I)]
          }), c.jsx("div", {
            className: "tb-pill tb-hint",
            children: x(ta)
          }), c.jsxs("div", {
            className: "tb-export",
            children: [c.jsx(qs, {
              scopeId: "studio-toolbox",
              dropdownType: "export-format",
              ariaLabel: x("导出格式"),
              value: He,
              options: [{
                value: "png",
                label: "PNG"
              }, {
                value: "jpg",
                label: "JPG"
              }, {
                value: "webp",
                label: "WebP"
              }, {
                value: "psd",
                label: "PSD（分层）"
              }],
              isDark: !0,
              activeDropdown: Ye,
              setActiveDropdown: Ce,
              onSelect: Wn => Ve(Wn),
              buttonVariant: "bare",
              menuPlacement: "below",
              minMenuWidth: 132,
              menuClassName: "sg-popup"
            }), c.jsx("button", {
              type: "button",
              "aria-label": x("导出图片"),
              title: x("导出图片"),
              onClick: () => void $a(),
              children: c.jsx(ws, {
                size: 15
              })
            })]
          }), c.jsx("button", {
            type: "button",
            className: "tb-close",
            "aria-label": x("关闭图片"),
            title: x("关闭图片"),
            onClick: () => {
              Pt("", "", !0), d("");
            },
            children: c.jsx(Na, {
              size: 15
            })
          })]
        }) : null, c.jsxs("div", {
          className: "tb-toolbar",
          "aria-label": x("改图工具"),
          children: [c.jsx("button", {
            type: "button",
            title: x("撤销 Ctrl+Z"),
            "aria-label": x("撤销"),
            disabled: !Ze.length || vt,
            onClick: () => Ct.current.undo(),
            children: c.jsx(d_, {
              size: 16
            })
          }), c.jsx("button", {
            type: "button",
            title: x("重做 Ctrl+Shift+Z"),
            "aria-label": x("重做"),
            disabled: !Oe.length || vt,
            onClick: () => Ct.current.redo(),
            children: c.jsx(J$, {
              size: 16
            })
          }), c.jsx("span", {
            className: "tb-split"
          }), c.jsx("button", {
            type: "button",
            className: `tb-tool${p === "move" ? " is-on" : ""}`,
            "aria-pressed": p === "move",
            title: x("移动视图 V"),
            "aria-label": x("移动视图"),
            onClick: () => m("move"),
            children: c.jsx(RY, {
              size: 16
            })
          }), c.jsx("button", {
            type: "button",
            className: `tb-tool${p === "select" ? " is-on" : ""}`,
            "aria-pressed": p === "select",
            title: x("矩形选区 M"),
            "aria-label": x("矩形选区"),
            onClick: () => m("select"),
            children: c.jsx(Uae, {
              size: 16
            })
          }), c.jsx("button", {
            type: "button",
            className: `tb-tool${p === "brush" ? " is-on" : ""}`,
            "aria-pressed": p === "brush",
            title: x("画笔标出要改的区域 B"),
            "aria-label": x("画笔"),
            onClick: () => m("brush"),
            children: c.jsx(_5e, {
              size: 16
            })
          }), c.jsx("button", {
            type: "button",
            className: `tb-tool${p === "eraser" ? " is-on" : ""}`,
            "aria-pressed": p === "eraser",
            title: x("擦除选中图层 E"),
            "aria-label": x("橡皮"),
            onClick: () => m("eraser"),
            children: c.jsx(uI, {
              size: 16
            })
          }), c.jsx("button", {
            type: "button",
            title: x("应用到选区/图层蒙版"),
            "aria-label": x("应用到选区蒙版"),
            onClick: mt,
            children: c.jsx(rEt, {
              size: 16
            })
          }), c.jsx("button", {
            type: "button",
            title: x("清除涂抹"),
            "aria-label": x("清除涂抹"),
            disabled: !be,
            onClick: () => Ct.current.clearMask(),
            children: c.jsx(Qo, {
              size: 16
            })
          }), c.jsx("span", {
            className: "tb-split"
          }), c.jsxs("label", {
            className: "tb-range",
            title: x("笔刷大小"),
            children: [x("大小 "), c.jsx("em", {
              children: xe
            }), c.jsx("input", {
              type: "range",
              min: 2,
              max: 180,
              value: xe,
              onChange: Wn => he(Number(Wn.target.value))
            })]
          }), c.jsxs("label", {
            className: "tb-range",
            title: x("擦除/还原透明度"),
            children: [x("透明度 "), c.jsxs("em", {
              children: [ue, "%"]
            }), c.jsx("input", {
              type: "range",
              min: 10,
              max: 100,
              value: ue,
              onChange: Wn => ge(Number(Wn.target.value))
            })]
          }), c.jsxs("label", {
            className: "tb-range",
            title: x("蒙版羽化"),
            children: [x("羽化 "), c.jsx("em", {
              children: _e
            }), c.jsx("input", {
              type: "range",
              min: 0,
              max: 120,
              value: _e,
              onChange: Wn => ke(Number(Wn.target.value))
            })]
          })]
        }), p === "select" ? c.jsxs("div", {
          className: "tb-selection-ratio",
          children: [c.jsx(Uae, {
            size: 13
          }), c.jsx("span", {
            children: x("选区比例")
          }), Vn && c.jsxs("button", {
            type: "button",
            className: "tb-ratio-recommendation",
            title: x("采用推荐的生成比例"),
            "aria-label": x("采用推荐比例 {0}", Vn),
            "aria-pressed": $e === Vn,
            onClick: () => rt(Vn),
            children: [x("推荐 "), Vn]
          }), c.jsx(qs, {
            scopeId: "studio-toolbox",
            dropdownType: "selection-ratio",
            ariaLabel: x("选区比例"),
            value: ie,
            options: xlo.map(Wn => ({
              value: Wn,
              label: Wn === "free" ? "自由" : Wn
            })),
            isDark: !0,
            activeDropdown: Ye,
            setActiveDropdown: Ce,
            onSelect: Wn => ae(Wn),
            buttonVariant: "bare",
            menuPlacement: "above",
            minMenuWidth: 128,
            maxMenuHeight: 280,
            menuClassName: "sg-popup"
          })]
        }) : null]
      })
    }), c.jsxs("div", {
      className: "tb-dock",
      children: [c.jsxs("div", {
        className: "tb-composer",
        onPasteCapture: Wn => {
          Array.from(Wn.clipboardData.files).some(wr => wr.type.startsWith("image/")) && (Wn.preventDefault(), Wn.stopPropagation(), Gr(Wn.clipboardData.files));
        },
        onDragOver: Wn => {
          Wn.preventDefault(), Wn.stopPropagation();
        },
        onDrop: Wn => {
          Wn.preventDefault(), Wn.stopPropagation(), Gr(Wn.dataTransfer.files);
        },
        children: [c.jsxs("div", {
          className: "tb-composer-content",
          children: [c.jsx(jpe, {
            disabled: Ae.length >= w5,
            onAdd: () => {
              var Wn;
              return (Wn = Yt.current) == null ? void 0 : Wn.click();
            },
            items: [...(f ? [{
              id: "source",
              title: `${l || "当前图片"} · 待修改原图`,
              label: "原图",
              preview: c.jsx("img", {
                src: f,
                alt: x("待修改原图")
              }),
              selectLabel: "查看待修改原图",
              onSelect: jt,
              removeLabel: "移除当前图片",
              onRemove: () => {
                Pt("", "", !0), d("");
              }
            }] : []), ...Ae.map((Wn, wr) => ({
              id: `ref-${wr}`,
              title: `参考图 ${wr + 1} · 点击插入 @${wr + 1}`,
              label: `@${wr + 1}`,
              preview: c.jsx("img", {
                src: Wn,
                alt: x("参考图 {0}", wr + 1)
              }),
              selectLabel: `插入参考 ${wr + 1}`,
              onSelect: () => La(wr),
              removeLabel: `移除参考图 ${wr + 1}`,
              onRemove: () => sa(wr)
            }))]
          }), c.jsx("textarea", {
            ref: qe,
            "aria-label": x("改图描述"),
            maxLength: 2e3,
            rows: 2,
            value: Ne,
            placeholder: x("描述你想修改的内容…"),
            onChange: Wn => me(Wn.target.value)
          })]
        }), c.jsxs("div", {
          className: "tb-composer-bar",
          children: [c.jsxs("div", {
            className: "tb-composer-left",
            children: [c.jsx("button", {
              type: "button",
              className: "tb-icon",
              title: x("添加参考图"),
              "aria-label": x("添加参考图"),
              disabled: Ae.length >= w5,
              onClick: () => {
                var Wn;
                return (Wn = Yt.current) == null ? void 0 : Wn.click();
              },
              children: c.jsx(eo, {
                size: 16
              })
            }), c.jsx("button", {
              type: "button",
              className: "tb-icon",
              title: x("从生成历史添加参考"),
              "aria-label": x("参考素材库"),
              "aria-expanded": R,
              onClick: () => j(Wn => !Wn),
              children: c.jsx(mu, {
                size: 16
              })
            }), Cn.length ? c.jsx(Th, {
              scopeId: "studio-toolbox",
              value: Me,
              models: Cn,
              isDark: !0,
              activeDropdown: Ye,
              setActiveDropdown: Ce,
              onSelect: Re,
              dropdownType: "toolbox-model",
              logoKind: "image",
              showChannelBar: !0,
              channelKind: "gen",
              buttonVariant: "bare",
              menuPlacement: "above",
              className: "tb-model-picker",
              menuClassName: "sg-popup sg-model-popup",
              menuMaxHeight: 330,
              buttonTitle: "选择生成模型"
            }) : c.jsx("span", {
              className: "tb-empty-note",
              children: x("未接入绘画模型")
            })]
          }), c.jsx("button", {
            type: "button",
            className: "tb-send",
            "aria-label": x("生成"),
            disabled: vt || !f || !Me,
            onClick: () => void Ea(),
            children: c.jsx(Gc, {
              size: 16
            })
          })]
        })]
      }), c.jsxs("div", {
        className: "tb-params",
        children: [c.jsx(E0r, {
          scopeId: "studio-toolbox",
          draft: {
            kind: "image",
            ratio: $e,
            resolution: nt,
            count: Le,
            duration: ""
          },
          model: un,
          options: {
            ratios: Kn,
            resolutions: en,
            durations: []
          },
          counts: [1, 2, 3, 4],
          activeDropdown: Ye,
          setActiveDropdown: Ce,
          onChange: Wn => {
            Wn.ratio !== void 0 && rt(Wn.ratio), Wn.resolution !== void 0 && ze(Wn.resolution), Wn.count !== void 0 && Ke(Wn.count);
          }
        }), Jn && un ? c.jsx(Ku, {
          platformGroup: Xe,
          modelId: un.id,
          modelConfigId: un.id,
          modelName: un.modelName || un.id,
          uiResolution: nt,
          isDark: !0,
          buttonVariant: "bare",
          menuPlacement: "above",
          menuClassName: "sg-popup",
          onGroupChange: De
        }) : null, c.jsxs("span", {
          className: "tb-count",
          children: [Ne.length, "/2000"]
        })]
      }), c.jsxs("div", {
        className: "tb-footer",
        children: [c.jsx("p", {
          className: "tb-status",
          role: "status",
          children: lt || x("空白处拖动平移 · 滚轮缩放")
        }), z && c.jsx("button", {
          type: "button",
          onClick: yr,
          children: x("撤销删除生成记录")
        }), c.jsx("span", {
          children: x("Ctrl + Enter 生成")
        })]
      }), vt ? c.jsx("div", {
        className: "tb-progress",
        role: "progressbar",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": nn,
        children: c.jsx("span", {
          style: {
            width: `${nn}%`
          }
        })
      }) : null]
    }), c.jsx("input", {
      ref: At,
      type: "file",
      accept: "image/*",
      hidden: !0,
      onChange: Wn => {
        var jn;
        const wr = (jn = Wn.target.files) == null ? void 0 : jn[0];
        wr && Ir(wr), Wn.target.value = "";
      }
    }), c.jsx("input", {
      ref: pe,
      type: "file",
      accept: "image/*",
      hidden: !0,
      onChange: Wn => {
        var jn;
        const wr = (jn = Wn.target.files) == null ? void 0 : jn[0];
        wr && Xt(wr), Wn.target.value = "";
      }
    }), c.jsx("input", {
      ref: Yt,
      type: "file",
      accept: "image/*",
      multiple: !0,
      hidden: !0,
      onChange: Wn => {
        Gr(Wn.target.files), Wn.target.value = "";
      }
    })]
  });
}

const Slo = g.lazy(() => Ie(() => Promise.resolve().then(() => MSo), void 0, import.meta.url).then(e => ({
    default: e.ScriptWriterHost
  }))),
  Ilo = g.lazy(() => Ie(() => Promise.resolve().then(() => zSo), void 0, import.meta.url)),
  Clo = g.lazy(() => Ie(() => Promise.resolve().then(() => O3o), void 0, import.meta.url)),
  Elo = g.lazy(() => Ie(() => Promise.resolve().then(() => u4o), void 0, import.meta.url)),
  Tlo = g.lazy(() => Ie(() => Promise.resolve().then(() => f4o), void 0, import.meta.url)),
  Mlo = g.lazy(() => Ie(() => Promise.resolve().then(() => k4o), void 0, import.meta.url)),
  Plo = g.lazy(() => Ie(() => Promise.resolve().then(() => t5o), void 0, import.meta.url)),
  Rlo = g.lazy(() => Ie(() => Promise.resolve().then(() => r5o), void 0, import.meta.url)),
  Nlo = g.lazy(() => Ie(() => Promise.resolve().then(() => u5o), void 0, import.meta.url)),
  jlo = g.lazy(() => Ie(() => Promise.resolve().then(() => b5o), void 0, import.meta.url)),
  Dlo = g.lazy(() => Ie(() => Promise.resolve().then(() => R5o), void 0, import.meta.url)),
  Llo = "studio-toolbox";

function Olo({
  host: e,
  apiConfigs: t,
  scriptApiConfigs: n,
  globalApiKey: r,
  history: a,
  setHistory: i,
  getCanvasNodes: o,
  onSendScriptToCanvas: s,
  onSendMediaToCanvas: l
}) {
  var Q;
  on();
  const {
      view: d
    } = M3(),
    {
      isDark: u
    } = Oy(),
    [h, p] = g.useState("home"),
    m = ((Q = JQ.find(q => q.id === h)) == null ? void 0 : Q.id) || null,
    [f, y] = g.useState(!1);
  g.useEffect(() => {
    m && y(!0);
  }, [m]), g.useLayoutEffect(() => {
    if (e) return e.dataset.toolboxScreen = h, () => {
      delete e.dataset.toolboxScreen;
    };
  }, [e, h]);
  const [b, v] = g.useState(!1);
  g.useEffect(() => {
    h === "tile" && v(!0);
  }, [h]);
  const [_, w] = g.useState([]);
  g.useEffect(() => {
    (h === "product" || h === "relight") && w(q => q.includes(h) ? q : [...q, h]);
  }, [h]);
  const [k, A] = g.useState(!1);
  g.useEffect(() => {
    h === "script" && A(!0);
  }, [h]);
  const [S, C] = g.useState(!1),
    [I, E] = g.useState(!1),
    [M, T] = g.useState(!1),
    [P, R] = g.useState(!1);
  g.useEffect(() => {
    h === "local-edit" && R(!0);
  }, [h]);
  const [j, B] = g.useState(!1),
    [F, N] = g.useState(!1);
  g.useEffect(() => {
    h === "image-upscale" && N(!0);
  }, [h]);
  const [G, z] = g.useState(!1);
  g.useEffect(() => {
    h === "dual-alpha" && z(!0);
  }, [h]), g.useEffect(() => {
    h === "image-wash" && B(!0);
  }, [h]), g.useEffect(() => {
    h === "cutout-repair" && T(!0);
  }, [h]), g.useEffect(() => {
    h === "motion" && C(!0);
  }, [h]), g.useEffect(() => {
    h === "layers" && E(!0);
  }, [h]);
  const [V, O] = g.useState([]),
    [L] = g.useState([]),
    [D] = g.useState(() => {
      const q = Ape();
      return q.commit(Llo, !1), q;
    });
  g.useEffect(() => (D.activate(), () => D.dispose()), [D]);
  const U = g.useMemo(() => new Map(V.map(q => [q.id, q])), [V]),
    H = Epe({
      connections: L,
      nodesMap: U,
      dataVersion: 0
    }),
    Y = g.useCallback((q, ne) => {
      O(de => de.map(le => le.id === q ? eee(le, ne, !1) : le));
    }, []),
    {
      runEditImage: K,
      generationRunner: W
    } = Ipe({
      apiConfigs: t,
      globalApiKey: r,
      nodes: V,
      nodesMap: U,
      connections: L,
      setNodes: O,
      setHistory: i,
      updateNode: Y,
      getConnectedInputImages: H.connections.getConnectedInputImages,
      getConnectedInputItems: H.connections.getConnectedInputItems,
      getConnectedImageForInput: H.connections.getConnectedImageForInput,
      generateId: () => crypto.randomUUID(),
      canvasBackground: !1
    }, D);
  return c.jsxs(c.Fragment, {
    children: [W, e ? Da.createPortal(c.jsx(Alo, {
      screen: h,
      setScreen: p,
      apiConfigs: t,
      runEditImage: K,
      history: a,
      setHistory: i
    }), e) : null, P && c.jsx(g.Suspense, {
      fallback: e && h === "local-edit" ? Da.createPortal(c.jsx("div", {
        className: "tb-home",
        role: "status",
        children: x("正在打开局部修改…")
      }), e) : null,
      children: c.jsx(Dlo, {
        host: d === "toolbox" && h === "local-edit" ? e : null,
        runEditImage: K,
        history: a,
        setHistory: i,
        getCanvasNodes: o,
        onSendToCanvas: l,
        onBack: () => p("home")
      })
    }), F && c.jsx(g.Suspense, {
      fallback: e && h === "image-upscale" ? Da.createPortal(c.jsx("div", {
        className: "tb-home",
        role: "status",
        children: x("正在打开图像放大…")
      }), e) : null,
      children: c.jsx(Nlo, {
        host: d === "toolbox" && h === "image-upscale" ? e : null,
        history: a,
        setHistory: i,
        onBack: () => p("home"),
        onSendToCanvas: l
      })
    }), G && c.jsx(g.Suspense, {
      fallback: e && h === "dual-alpha" ? Da.createPortal(c.jsx("div", {
        className: "tb-home",
        role: "status",
        children: x("正在打开黑白图抠图…")
      }), e) : null,
      children: c.jsx(jlo, {
        host: d === "toolbox" && h === "dual-alpha" ? e : null,
        history: a,
        setHistory: i,
        onBack: () => p("home"),
        onSendToCanvas: l
      })
    }), j && c.jsx(g.Suspense, {
      fallback: e && h === "image-wash" ? Da.createPortal(c.jsx("div", {
        className: "tb-home",
        role: "status",
        children: x("正在打开质感增强…")
      }), e) : null,
      children: c.jsx(Rlo, {
        host: d === "toolbox" && h === "image-wash" ? e : null,
        apiConfigs: t,
        history: a,
        setHistory: i,
        onBack: () => p("home"),
        onSendToCanvas: l
      })
    }), M && c.jsx(g.Suspense, {
      fallback: e && h === "cutout-repair" ? Da.createPortal(c.jsx("div", {
        className: "tb-home",
        role: "status",
        children: x("正在打开智能抠补…")
      }), e) : null,
      children: c.jsx(Elo, {
        host: d === "toolbox" && h === "cutout-repair" ? e : null,
        runEditImage: K,
        history: a,
        setHistory: i,
        onSendToCanvas: l,
        onBack: () => p("home")
      })
    }), f && c.jsx(g.Suspense, {
      fallback: e && d === "toolbox" && m ? Da.createPortal(c.jsx("div", {
        className: "tb-home",
        role: "status",
        children: x("正在打开图案工具…")
      }), e) : null,
      children: c.jsx(Plo, {
        host: d === "toolbox" && m ? e : null,
        toolId: m,
        onSelect: p,
        onBack: () => p("home"),
        setHistory: i,
        onSendToCanvas: l
      })
    }), b && c.jsx(g.Suspense, {
      fallback: e && d === "toolbox" && h === "tile" ? Da.createPortal(c.jsx("div", {
        className: "tb-home",
        role: "status",
        children: x("正在打开图片平铺…")
      }), e) : null,
      children: c.jsx(Tlo, {
        host: d === "toolbox" && h === "tile" ? e : null,
        history: a,
        setHistory: i,
        getCanvasNodes: o,
        onSendToCanvas: l,
        onBack: () => p("home")
      })
    }), S && c.jsx(g.Suspense, {
      fallback: e && d === "toolbox" && h === "motion" ? Da.createPortal(c.jsx("div", {
        className: "tb-home",
        role: "status",
        children: x("正在打开动作迁移…")
      }), e) : null,
      children: c.jsx(Ilo, {
        getCanvasNodes: o,
        host: d === "toolbox" && h === "motion" ? e : null,
        apiConfigs: t,
        globalApiKey: r,
        history: a,
        setHistory: i,
        onBack: () => p("home")
      })
    }), I && c.jsx(g.Suspense, {
      fallback: e && d === "toolbox" && h === "layers" ? Da.createPortal(c.jsx("div", {
        className: "tb-home",
        role: "status",
        children: x("正在打开图层拆分…")
      }), e) : null,
      children: c.jsx(Clo, {
        host: d === "toolbox" && h === "layers" ? e : null,
        apiConfigs: t,
        globalApiKey: r,
        history: a,
        setHistory: i,
        onBack: () => p("home")
      })
    }), k && e && Da.createPortal(c.jsx("div", {
      className: "sw-toolbox-host",
      hidden: d !== "toolbox" || h !== "script",
      children: c.jsx(g.Suspense, {
        fallback: c.jsx("div", {
          className: "tb-home",
          role: "status",
          children: x("正在打开剧本创作…")
        }),
        children: c.jsx(Slo, {
          active: d === "toolbox" && h === "script",
          isDark: u,
          onClose: () => p("home"),
          apiConfigs: n,
          globalApiKey: r,
          onSendToCanvas: s
        })
      })
    }), e), ["product", "relight"].filter(q => _.includes(q)).map(q => c.jsx(g.Suspense, {
      fallback: e && d === "toolbox" && h === q ? Da.createPortal(c.jsx("div", {
        className: "tb-home",
        role: "status",
        children: x("正在打开工作台…")
      }), e) : null,
      children: c.jsx(Mlo, {
        kind: q,
        host: d === "toolbox" && h === q ? e : null,
        globalApiKey: r,
        history: a,
        setHistory: i,
        getCanvasNodes: o,
        onSendToCanvas: l,
        onBack: () => p("home")
      })
    }, q))]
  });
}

const Blo = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: Olo
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  gfn = new RegExp("\\b(?:nsfw|porn(?:ography|ographic)?|hentai|nudes?|nudity|naked|topless|bottomless|erotic|sexual(?:ly)?|sex|fetish|masturbat\\w*|genitals?|nipples?|areola|vagina|penis|blowjob|bondage)\\b|(?<!角)色情(?!绪)|情色|淫秽|裸体|全裸|裸露(?:胸|乳|下体|私处)|露乳|露点|(?<![剧探整志造表])性交(?![织锋叉筑流通])|性爱|性行为|性器官|生殖器|阴茎|阴道|自慰|口交(?!易)|肛交|成人内容|成人写真|未成年.*(?:性感|内衣)", "i"),
  Flo = new Set(["flova-skills:747d41c19d2e47f9b9ff5a1df6ce354d", "flova-skills:35cde329596445d5bb80729b5c0c9c32", "jimeng-skills:19492364725004", "lovart-skills:amazon", "lovart-skills:lovart-1788393635-19394822eefe4d4f89fbbce0474059cc", "lovart-skills:cinematic-recipe-ad-generator-1789120372-896a4abc762447ffbdd811e8692b72a3"]),
  yfn = new WeakMap();

function zlo(e) {
  return e.normalize("NFKC").replace(/\bnaked (?:eye|truth|emotion label)\b/gi, "").replace(/\bbottomless(?:\s+\w+){0,4}\s+abyss\b/gi, "").replace(/\b(?:no|without|avoid|exclude|non)[-\s]+(?:any\s+)?(?:nsfw|nudity|nudes?|naked|porn(?:ography|ographic)?|sexual(?:\s+content)?|erotic(?:\s+content)?|nipples?|genitals?)\b/gi, "").replace(/(?:不要|禁止|避免|不得|不含|无|不)(?:(?:[\s*_：:，,、]|任何|形式|的|或){0,8}(?:色情|情色|裸体|全裸|裸露|露点|性暗示|性行为|性器官|成人内容))+/g, "");
}

function tA(e) {
  const t = yfn.get(e);
  if (t !== void 0) return t;
  const n = (e.sourceId === "flova-skills" || e.sourceId === "jimeng-skills" || e.sourceId === "lovart-skills") && Flo.has(e.id),
    r = !e.nsfw && !e.tags.some(a => /^(?:xxx|18\+|r18|adult)$/i.test(a.trim())) && !gfn.test(`${e.title} ${e.tags.join(" ")}`.normalize("NFKC")) && (n || !gfn.test(zlo(`${e.description}
${e.prompt}`)));
  return yfn.set(e, r), r;
}

function Ulo(e) {
  return {
    id: e.id,
    title: e.title,
    category: "灵感",
    text: e.prompt,
    prompt: e.prompt
  };
}

const bC = [["youmind-seedance", "YouMind Seedance 2.0", "YouMind-OpenLab/awesome-seedance-2-prompts", "Seedance", "video", "README_zh.md", "markdown", "CC BY 4.0"], ["banana-quicker", "Banana Prompt Quicker", "glidea/banana-prompt-quicker", "Nano Banana", "image", "prompts.json", "banana", "MIT"], ["freestyle-gpt", "Freestylefly GPT Image 2", "freestylefly/awesome-gpt-image-2", "GPT Image", "image", "data/cases.json", "gpt", "MIT"], ["zerolu-gpt", "Awesome GPT Image", "ZeroLu/awesome-gpt-image", "GPT Image", "image", "README.zh-CN.md", "markdown", "MIT"], ["youmind-gpt", "YouMind GPT Image 2", "YouMind-OpenLab/awesome-gpt-image-2", "GPT Image", "image", "README_zh.md", "markdown", "CC BY 4.0"], ["youmind-banana", "YouMind Nano Banana Pro", "YouMind-OpenLab/awesome-nano-banana-pro-prompts", "Nano Banana", "image", "README_zh.md", "markdown", "CC BY 4.0"], ["zerolu-banana", "Awesome Nano Banana Pro", "ZeroLu/awesome-nanobanana-pro", "Nano Banana", "image", "README.md", "markdown", "见仓库许可"], ["picotrex-banana", "PicoTrex Nano Banana", "PicoTrex/Awesome-Nano-Banana-images", "Nano Banana", "image", "README.md", "markdown", "Apache-2.0"], ["youmind-gemini", "YouMind Gemini 3", "YouMind-OpenLab/awesome-gemini-3-prompts", "Gemini", "image", "README_zh.md", "markdown", "CC BY 4.0"], ["youmind-grok", "YouMind Grok Imagine", "YouMind-OpenLab/awesome-grok-imagine-prompts", "Grok", "video", "README_zh.md", "markdown", "CC BY 4.0"], ["moke-skills", "MOKE 创作精选", "https://www.mokeaigc.com/skill.html", "创作方法", "image", "", "moke", "按原站与作者许可使用"], ["leader-image", "立得生图提示词", "https://www.leaderai.top/#/preset-prompt-page", "Nano Banana", "image", "image_prompt", "leader", "按立得AI原站与作者许可使用"], ["leader-video", "立得视频提示词", "https://www.leaderai.top/#/preset-prompt-page?type=video", "Seedance", "video", "video_prompt", "leader", "按立得AI原站与作者许可使用"], ["minimax-h3", "MiniMax H3", "https://design.minimax.io", "MiniMax H3", "video", "", "h3", "MiniMax Design 官方 Skill，使用时保留出处"], ["metaso-h3", "秘塔 H3", "https://metaso.cn/minimax-h3", "秘塔 H3", "video", "", "metaso", "按秘塔原站与作者许可使用，保留案例及提示词出处"], ["flova-skills", "Flova", "https://flova.tv/zh-CN/skill/", "Flova", "video", "", "flova", "Flova 公开 Skill，使用时保留出处"], ["jimeng-skills", "Jimeng", "https://jimeng.jianying.com/ai-tool/explore", "Jimeng", "video", "", "jimeng", "即梦技能广场公开内容，使用时保留出处"], ["lovart-skills", "Lovart", "https://www.lovart.ai/zh/skills", "Lovart", "image", "", "lovart", "Lovart 技能广场公开内容，使用时保留出处"]].map(([e, t, n, r, a, i, o, s]) => ({
  id: e,
  name: t,
  repo: n,
  model: r,
  kind: a,
  path: i,
  format: o,
  license: s,
  enabled: !0
}));

function G0r() {
  return {
    version: 1,
    sources: bC.map(e => ({
      ...e
    })),
    snapshots: {},
    favorites: []
  };
}

function TUt(e) {
  const t = e.trim().replace(/^https:\/\/github\.com\//i, "").replace(/\/$/, "").replace(/\.git$/, "");
  if (!/^[\w.-]+\/[\w.-]+$/.test(t) || t.split("/").some(n => n === "." || n === "..")) throw new Error("请输入 GitHub 仓库地址，例如 https://github.com/作者/仓库");
  return t;
}

function FSt(e) {
  return e.format === "moke" ? "https://www.mokeaigc.com/skill.html" : e.format === "leader" || e.format === "h3" || e.format === "metaso" || e.format === "flova" || e.format === "jimeng" || e.format === "lovart" ? e.repo : `https://github.com/${TUt(e.repo)}`;
}

function P$e(e) {
  if (!/^[\w./-]+$/.test(e.path) || e.path.includes("..")) throw new Error("来源文件路径无效");
  return `https://raw.githubusercontent.com/${TUt(e.repo)}/HEAD/${e.path}`;
}

function D5(e, t) {
  if (!e.trim()) return "";
  try {
    const n = new URL(e.replace(/&amp;/g, "&"), t);
    return n.protocol === "https:" && !n.username && !n.password ? n.href : "";
  } catch {
    return "";
  }
}

function Xlt(e) {
  return e.replace(/<[^>]+>/g, "").replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/[*_`]/g, "").trim();
}

function $lo(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++) t = Math.imul(t ^ e.charCodeAt(n), 16777619);
  return (t >>> 0).toString(36);
}

function lC(e) {
  return typeof e == "string" ? e.trim() : "";
}

function bfn(e) {
  return Array.isArray(e) ? e.map(lC).filter(Boolean) : [];
}

function V0r(e, t) {
  const n = P$e(e),
    r = FSt(e),
    a = [],
    i = (s, l = s.url + s.title) => {
      !s.title || !s.prompt.trim() || a.push({
        ...s,
        id: `${e.id}:${$lo(l)}`,
        sourceId: e.id,
        images: [...new Set(s.images.map(d => D5(d, n)).filter(Boolean))],
        url: D5(s.url) || r,
        video: D5(s.video, n),
        tags: [...new Set(s.tags.filter(Boolean))]
      });
    };
  if (e.format !== "markdown") {
    const s = JSON.parse(t),
      l = e.format === "gpt" ? s == null ? void 0 : s.cases : s;
    if (!Array.isArray(l)) throw new Error("来源数据格式已变化，未覆盖上次同步");
    for (const d of l) {
      if (!d || typeof d != "object") continue;
      const u = e.format === "gpt" ? lC(d.image).replace(/^\//, "") : lC(d.preview);
      i({
        title: lC(d.title),
        description: "",
        prompt: lC(d.prompt),
        images: u ? [u] : [],
        video: "",
        author: lC(d.sourceLabel || d.author),
        nsfw: d.nsfw === !0 || d.is_nsfw === !0,
        url: lC(d.sourceUrl || d.link || d.githubUrl),
        tags: [lC(d.category), lC(d.sub_category), ...bfn(d.styles), ...bfn(d.scenes)]
      }, String(d.id ?? lC(d.link) + lC(d.title)));
    }
  } else {
    let s = "",
      l = "",
      d = "",
      u = [];
    const h = () => {
      var S, C, I, E, M, T, P;
      if (!u.length || !l || e.repo.startsWith("YouMind-OpenLab/") && !/^####[^\n]*(?:提示词|Prompt)\s*$/mi.test(d)) return;
      const p = [...d.matchAll(new RegExp("(?<!!)\\[([^\\]]+)\\]\\((https?:\\/\\/[^\\s)]+)\\)", "g"))],
        m = d.split(`
`).find(R => /(?:\*?来源|\*?Source)\s*[:：]/i.test(R)),
        f = m == null ? void 0 : m.match(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/),
        y = ((S = d.match(/(?:作者|Author)\s*[:：]\*?\*?\s*\[([^\]]+)\]/i)) == null ? void 0 : S[1]) || ((C = d.match(/(?:by\s*)\[([^\]]+)\]/i)) == null ? void 0 : C[1]) || (f == null ? void 0 : f[1]) || "",
        b = (f == null ? void 0 : f[2]) || ((I = p.find(R => /x\.com|twitter\.com|xiaohongshu\.com/.test(R[2]))) == null ? void 0 : I[2]),
        v = [...d.matchAll(/<img\b[^>]*?\bsrc=["']([^"']+)["']|!\[[^\]]*\]\(([^\s)]+)\)/gi)].map(R => R[1] || R[2]).filter(R => !/shields\.io|badge|awesome\.re/i.test(R));
      e.id === "picotrex-banana" && v.reverse();
      const _ = ((E = d.match(/(?:href|src)=["']([^"']+\.mp4(?:\?[^"']*)?)["']/i)) == null ? void 0 : E[1]) || ((M = p.find(R => /\.mp4(?:\?|$)/i.test(R[2]))) == null ? void 0 : M[2]) || "",
        w = e.kind === "video" ? D5(((T = p.find(R => /^https:\/\/youmind\.com\/(?:[\w-]+\/)?[\w-]+-prompts\?id=\d+$/.test(R[2]))) == null ? void 0 : T[2]) || "") : "",
        k = Xlt(((P = d.match(/####[^\n]*(?:描述|Description)\s*\n([\s\S]*?)(?=\n####|$)/i)) == null ? void 0 : P[1]) || ""),
        A = Xlt(l).replace(/^(?:No\.\s*\d+\s*[:：]|例\s*\d+\s*[:：]|\d+\.\d+\.?\s*)\s*/i, "").replace(/[（(]by\s+.*$/i, "").trim();
      i({
        title: A,
        description: k,
        prompt: u.join(`

`),
        images: v,
        video: _,
        videoPage: w,
        author: y,
        url: b || r,
        tags: [Xlt(s).replace(/^[^\p{L}\p{N}]+/u, ""), /Featured|精选/.test(d) ? "精选" : ""]
      }, (b || r) + A);
    };
    for (const p of rsa(t)) p.type === "heading" && p.depth <= 3 ? (h(), l = p.depth === 3 ? p.text : "", d = p.raw, u = [], p.depth === 2 && (s = p.text)) : (d += p.raw, p.type === "code" && u.push(p.text.trim()));
    h();
  }
  const o = [...new Map(a.map(s => [s.id, s])).values()];
  if (!o.length) throw new Error("未找到可读取的提示词，已保留上次同步。可前往仓库查看原文。");
  return o.filter(tA);
}

function Glo(e) {
  return tA(e) && (e.images.length > 0 || !!e.video || e.sourceId === "minimax-h3" || e.sourceId === "flova-skills" || e.sourceId === "jimeng-skills" || e.sourceId === "lovart-skills");
}

function vfn(e, t) {
  const n = t.query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  return e.sources.filter(r => r.enabled && (!t.model || r.model === t.model) && (!t.source || r.id === t.source)).flatMap(r => {
    var a;
    return ((a = e.snapshots[r.id]) == null ? void 0 : a.items) || [];
  }).filter(r => tA(r) && (!t.favorites || e.favorites.includes(r.id)) && (!t.tag || r.tags.includes(t.tag)) && n.every(a => `${r.title} ${r.description} ${r.prompt} ${r.author} ${r.tags.join(" ")}`.toLocaleLowerCase().includes(a)));
}

const H0r = "https://cdn.leaderai.top/oss/moban-image";

function hS(e) {
  return typeof e == "string" ? e.trim() : "";
}

function W0r(e) {
  if (!e.includes("leaderai.top")) return e;
  try {
    const t = new URL(e),
      n = decodeURIComponent(t.pathname),
      r = n.replace(/预览流视频(?=(?:-\d+)?\.mp4$)/, "缩略视频");
    return r === n ? e : (t.pathname = r, t.href);
  } catch {
    return e;
  }
}

function Vlo(e) {
  const t = e.kind === "video" ? "video_prompt" : "image_prompt",
    n = e.kind === "video" ? "vids_index.json" : "imgs_index.json";
  return `${H0r}/${t}/${n}`;
}

function q0r(e, t) {
  return e.trim() || t.trim();
}

function Jlt(e) {
  const t = Array.isArray(e) ? hS(e[0]) : hS(e);
  return t && !t.includes("/") && !t.includes("\\") && !t.includes("..") ? t : "";
}

function Zlt(e, t, n) {
  return !/^[a-zA-Z0-9_-]+$/.test(t) || !n ? "" : D5(`${H0r}/${e}/${t.charAt(0).toLowerCase()}/${t}/${n}`);
}

function Hlo(e) {
  if (!Array.isArray(e) || !Array.isArray(e[0])) throw new Error("立得提示词目录格式已变化，已保留上次内容");
  const t = e[0].map(n => Array.isArray(n) ? hS(n[0]) : hS(n));
  return e.slice(1).filter(Array.isArray).map(n => {
    const r = {};
    return t.forEach((a, i) => {
      a && (r[a] = n[i]);
    }), r;
  });
}

function Wlo(e, t) {
  const n = e.kind === "video" ? "video_prompt/vids_src" : "image_prompt/imgs_src",
    r = qlo(e),
    a = Hlo(t).flatMap(i => {
      const o = hS(i.uuid);
      if (i.public !== !0 || !o) return [];
      const s = q0r(hS(i.prompt_cn), hS(i.prompt_origin)),
        l = hS(i.title),
        d = (Array.isArray(i.imgs) ? i.imgs : []).map(f => Zlt(n, o, Jlt(f))).filter(Boolean);
      if (!l || !s || !d.length || s.length > 1e5) return [];
      const u = e.kind === "video" ? Jlt(i.vids_thumb) || (Jlt(i.vids) || "预览流视频.mp4").replace(/^预览流视频/, "缩略视频") : "",
        h = hS(i.catalog).replace(/^\d+_/, ""),
        p = Array.isArray(i.model_tags) ? i.model_tags.map(hS).filter(Boolean) : [],
        m = {
          id: `${e.id}:${o}`,
          sourceId: e.id,
          title: l,
          description: "",
          prompt: s,
          images: d,
          video: u ? W0r(Zlt(n, o, u)) : "",
          promptSource: Zlt(n, o, "meta.json"),
          author: hS(i.author),
          url: r,
          tags: [...new Set([h, ...p].filter(Boolean))]
        };
      return tA(m) ? [{
        item: m,
        time: typeof i.timestamp == "number" ? i.timestamp : 0
      }] : [];
    });
  if (!a.length) throw new Error("未找到可读取的立得提示词，已保留上次内容");
  return a.sort((i, o) => o.time - i.time).map(i => i.item);
}

function qlo(e) {
  return e.kind === "video" ? "https://www.leaderai.top/#/preset-prompt-page?type=video" : "https://www.leaderai.top/#/preset-prompt-page";
}

async function wfn(e, t) {
  if (!e.promptSource) return e;
  try {
    const n = await $i(e.promptSource, {
      signal: t,
      credentials: "omit"
    });
    if (t.throwIfAborted(), !n.ok) return e;
    const r = await n.json();
    t.throwIfAborted();
    const a = q0r(hS(r.prompt_cn), hS(r.prompt_origin));
    return a ? {
      ...e,
      prompt: a.length >= e.prompt.length ? a : e.prompt,
      promptSource: void 0
    } : e;
  } catch (n) {
    if (t.aborted) throw n;
    return e;
  }
}

async function Klo(e, t) {
  const n = async r => {
    if (!r.ok) throw new Error(`立得提示词同步失败（HTTP ${r.status}），已保留上次内容`);
    return r.json();
  };
  try {
    return await n(await $i(e, {
      signal: t,
      credentials: "omit"
    }));
  } catch (r) {
    if (t.aborted || r instanceof Error && r.message.includes("已保留上次内容")) throw r;
    const a = await fetch(e, {
      signal: t,
      credentials: "omit"
    });
    t.throwIfAborted();
    try {
      return await n(a);
    } catch (i) {
      throw i instanceof Error && i.message.includes("已保留上次内容") ? i : new Error("立得提示词目录无法读取，已保留上次内容");
    }
  }
}

async function Qlo(e, t) {
  const n = await Klo(Vlo(e), t);
  return t.throwIfAborted(), {
    items: Wlo(e, n),
    syncedAt: Date.now()
  };
}

