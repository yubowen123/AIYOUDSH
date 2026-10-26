async function MLa(e) {
  var nt, ze, Le, Ke, Xe, De, Ye, Ce, He, Ve, it, It, Ft, We, Ze, Ge, Oe, st, vt, Ht, nn, pt, lt, gt, Ut, _t, At, Yt, qe, kt, St, hn, Qt, Ot, ln, Pn, rn, Yn, Ct, Cn, un, Jn, Kn, en, Vn, Tt, Ue, et, ft, ht, wt, jt, bt, Bt, wn, at, Pt, dt, xt, yn, gn, mt, Xt, Gn, rr, qn, Dn, Ar, _r, Pa, fa, Ca, $n, yr, Ir, Gr, Zr, La, sa, Ea, ba, ga, _a, $a, Ya, ta, ki, Wn, wr, jn, _n, ar, Vt, vn, An, ur, zr, Dr, Wr, gr, jr, ea, pa;
  const t = e.bridge.getCapabilities(),
    n = e.bridge.getState(),
    r = [],
    a = n.stateVersion ?? n.updatedAt,
    i = (e.chatImageAssets ?? []).map(Br => ({
      ...Br
    })),
    o = i.filter(Br => Br.kind !== "video" && Br.source !== "history").length || i.filter(Br => Br.kind !== "video").length,
    s = e.genPrefs.askMode === "auto" ? "auto" : "inquire",
    l = oJn(iJn({
      prefs: e.genPrefs,
      visibleModels: n.visibleModels,
      userText: e.userText,
      hasRefs: o > 0
    }), s);
  let d = SNa(e.genPrefs, l);
  const u = o > 0 || !!unt(n.nodes),
    h = lJn({
      askMode: s,
      userText: e.userText,
      hasReferences: o > 0,
      hasSourceSnap: u,
      needsUserChoice: l.needsUserChoice,
      needsCostConfirm: l.needsCostConfirm
    }),
    p = kNa(m7a({
      userText: e.userText,
      chatImageCount: o,
      chatVideoCount: i.filter(Br => Br.kind === "video").length,
      hasSelectedCanvasNodes: (((nt = n.selectedNodeIds) == null ? void 0 : nt.length) || 0) > 0 || !!n.selectedNodeId
    }), s),
    m = p.loopMode === "execute" && p.taskClass !== "destroy" && IRt(((ze = bm()) == null ? void 0 : ze.permissionProfile) ?? HS(), e.userText);
  (e.omitCanvasPromptContext || s === "auto" && m && !e.activeSkill) && (p.askPolicy = "must_not_ask", p.needsDesignDirectionGate = !1, p.needsProjectPlanGate = !1, e.omitCanvasPromptContext && (p.loopMode = "execute"));
  let f = p.loopMode,
    y = p.askPolicy;
  const b = {
      startedAt: Date.now(),
      initialStateVersion: a,
      latestStateVersion: a,
      intent: p,
      loopMode: f,
      userGoal: {
        originalText: e.userText,
        summary: p.summary,
        confirmedChoices: [],
        genPrefsSummary: fKe(d),
        phase: f
      },
      toolCalls: [],
      userChoices: [],
      errors: [],
      completion: {
        status: "pending"
      },
      standingBrief: wze(e.contextLog),
      referencePool: ynn({
        previous: e.referencePool,
        assets: i
      }),
      activeSkillId: (Le = e.activeSkill) == null ? void 0 : Le.id
    },
    v = e.omitCanvasPromptContext ? [] : kRt({
      projectId: n.projectId,
      sessionId: e.memorySessionId,
      query: e.userText,
      limit: 8
    }),
    _ = new Map(v.map(Br => [Br.id, Br])),
    w = new Set(),
    k = `canvas-${b.startedAt}`,
    A = kJn(),
    S = lJ(n.projectId);
  S && JN(e.userText) && (!S.projectId || S.projectId === n.projectId) && lja(A, S.nodeIdContext);
  const C = Br => {
    const tn = bm();
    if (!tn) return;
    const Lr = {
      ...tn,
      pendingToolCalls: Br ?? tn.pendingToolCalls ?? []
    };
    R5({
      run: Lr,
      canvasStateVersion: e.bridge.getState().stateVersion,
      nodeIdContext: A,
      pendingToolCalls: Br
    }), ex(Lr);
  };
  C();
  const I = yRt(e.userText, o),
    E = Crn(p) || p.taskClass === "default" || p.taskClass === "execute",
    M = e.omitCanvasPromptContext ? !1 : lLa({
      plan: I,
      state: n,
      generationIntent: E,
      chatImageCount: o,
      canvasReferenceNodeIds: e.canvasReferenceNodeIds
    }) > 0;
  if (M) for (const Br of I.current) {
    const tn = Br.nodeId || _Lt(n, Br.imageIndex);
    tn && (A.inputImageNodeIdByIndex[Br.imageIndex] = tn);
  }
  const T = e.omitCanvasPromptContext || !I.needsPreviousCharacter ? [] : eLa(e.historyMessages, n),
    P = {
      destructiveApproved: !1,
      productionPreviewApproved: !1,
      productionPreviewRejected: !1,
      scopeApprovedNodeIds: new Set(),
      scopeExpansionRejected: !1
    },
    R = e.activeSkill ? [] : e.skillHints ?? [],
    j = (Ke = e.skillCatalog) != null && Ke.length ? e.skillCatalog : R.map((Br, tn) => ({
      id: `hint-${tn + 1}`,
      name: Br.split("：")[0] || `Skill ${tn + 1}`,
      summary: Br.slice(0, 80)
    })),
    B = (Xe = e.availableSkills) != null && Xe.length ? e.availableSkills : [...(e.activeSkill ? [e.activeSkill] : [])],
    F = new Set(e.activeSkill ? [e.activeSkill.id] : []);
  let N = !1;
  const G = () => {
    N && (N = !1, f = "execute", y = "must_not_ask", p.loopMode = "execute", p.askPolicy = "must_not_ask", p.needsDesignDirectionGate = !1, p.needsProjectPlanGate = !1, b.loopMode = "execute", b.userGoal.phase = "execute", b.userGoal.summary = `${p.summary} → 已进入执行`);
  };
  let z = "";
  const V = {
      get loopMode() {
        return f;
      },
      get askPolicy() {
        return y;
      },
      askMode: s,
      get hasResolvedChoice() {
        return b.userChoices.length > 0;
      },
      skillLibrary: B,
      loadedSkillIds: F,
      promoteToExecute: () => {
        N = !0;
      },
      userText: e.userText,
      get assistantText() {
        return z;
      },
      referencePlan: I,
      chatAssets: i,
      historicalCharacterNodeIds: T,
      pixelFacts: "",
      standingBrief: wze(e.contextLog),
      referencePool: b.referencePool,
      pixelLookaheadAttempted: !1,
      visionCapable: yDa(e.modelName),
      ratioAskPending: f === "execute" && ["image", "series", "video"].includes(p.outputKind) && Dca({
        prefsRatio: d.ratio,
        userText: e.userText,
        modelId: d.resolvedModelId || d.modelId
      }),
      resolvedAxes: tXt({
        userText: e.userText,
        prefsRatio: d.ratio
      }),
      questionRounds: 0,
      questionsAsked: 0,
      usedTaskKeys: new Set(),
      referenceAnalysisComplete: () => {
        if (V.pixelLookaheadAttempted) return !0;
        const Br = String(V.pixelFacts || "").trim();
        return Br.length >= 40 && !Hhe(Br) ? !0 : r.some(tn => tn.ok && tn.tool === "analyze_canvas_images");
      },
      fileWorkspaceRoot: e.fileWorkspaceRoot,
      activeSkillId: (De = e.activeSkill) == null ? void 0 : De.id,
      onReferencePoolUpdate: e.callbacks.onReferencePoolUpdate,
      reportMemoryUsage: (Br, tn) => {
        var ir;
        const Lr = [...new Set(Br)].filter(Hr => _.has(Hr) && !w.has(Hr)),
          br = [...new Set(Br)].filter(Hr => !Lr.includes(Hr)),
          Jr = Lr.map(Hr => _.get(Hr)).filter(Hr => !!Hr),
          Kr = Izn({
            items: Jr,
            projectId: n.projectId,
            query: e.userText,
            agent: "canvas",
            runId: ((ir = bm()) == null ? void 0 : ir.id) || (S == null ? void 0 : S.runId) || k,
            reason: tn
          });
        return Kr.forEach(Hr => w.add(Hr.memoryId)), {
          usedIds: Kr.map(Hr => Hr.memoryId),
          ignoredIds: br
        };
      }
    },
    O = (Br = "") => {
      const tn = KNt({
        prefsRatio: d.ratio,
        userText: e.userText,
        askFeedback: Br,
        pixelFacts: V.pixelFacts,
        sourceSize: unt(e.bridge.getState().nodes),
        modelId: d.resolvedModelId || d.modelId,
        requireDefault: !1
      });
      return d = {
        ...d,
        resolvedRatio: tn.ratio
      }, tn;
    };
  O();
  const L = {
    current: CJn(e.creativeProject),
    planningRequired: !1,
    definitionRequired: !1,
    definitionCommittedThisTurn: !1,
    notify: Br => {
      var tn, Lr;
      return (Lr = (tn = e.callbacks).onCreativeProjectUpdate) == null ? void 0 : Lr.call(tn, Br);
    }
  };
  {
    const Br = J1(e.userText),
      tn = K_e({
        userText: e.userText,
        chatImageCount: o
      }),
      br = /详情页|电商详情|产品详情|产品页/.test(e.userText) && tn.hasGenerationGoal && tn.expected > Br ? tn.expected : Br;
    if (br >= 1 && L.current && !JN(e.userText)) {
      const Jr = TJn(L.current, br);
      Jr !== L.current && (L.current = Jr, L.notify(Jr));
    }
  }
  const D = new Set();
  let U = 0;
  const H = Br => {
      for (const tn of Br) {
        const Lr = String(tn || "").trim();
        Lr && D.add(Lr);
      }
      U = D.size;
    },
    Y = Br => {
      if (!Br || (H([Br]), !L.current)) return;
      const tn = L.current;
      if (tn.tasks.some(Jr => Jr.generationNodeIds.includes(Br))) return;
      const Lr = tn.tasks.find(Jr => Oz(Jr) && F0e(Jr) && (Jr.status === "approved" || Jr.status === "generating")) || tn.tasks.find(F0e);
      if (!Lr) return;
      const br = srn(tn, Lr.id, Br);
      L.current = br, L.notify(br);
    };
  let K = 0,
    W = 0,
    Q = 0,
    q = f === "execute" || f === "plan" || L.planningRequired,
    ne = !1,
    de = !1,
    le = -1,
    J = !1,
    pe = 0;
  const ce = OZ(e.userText, o),
    Z = (((Ye = L.current) == null ? void 0 : Ye.tasks) ?? []).filter(Br => Oz(Br) && F0e(Br) && (Br.status === "approved" || Br.status === "generating")).reduce((Br, tn) => Br + Math.max(0, Math.max(1, Math.floor(Number(tn.quantity) || 1)) - tn.generationNodeIds.length), 0),
    re = Whe(e.userText) || J1(e.userText) || iFe(e.userText),
    fe = J1(e.userText) === 0 && Z >= 1;
  let ye = K_e({
    userText: e.userText,
    chatImageCount: o,
    planGenQuantities: [Z]
  });
  const ie = fe ? {
      isBatch: !1,
      minExpected: 1
    } : ce,
    ae = () => xLt(r, e.bridge.getState()).size;
  V.getSubmittedCount = ae, V.syncExpectedGenCount = Br => {
    const tn = Math.max(0, Math.min(12, Math.floor(Number(Br) || 0)));
    tn < 1 || tn === ye.expected || (ye = {
      expected: tn,
      hasGenerationGoal: !0
    });
  }, V.getMaxGenerations = () => Math.max(1, ye.expected);
  const Ee = !U1t(o, ye.expected) && I.singleOutputByDefault && (I.current.length > 1 || I.needsPreviousCharacter || rFe(e.userText, o)),
    xe = () => {
      var Br, tn, Lr, br;
      return !U1t(o, ((Br = V.getMaxGenerations) == null ? void 0 : Br.call(V)) || ye.expected) && !!((tn = V.referencePlan) != null && tn.singleOutputByDefault) && ((((Lr = V.referencePlan) == null ? void 0 : Lr.current.length) || 0) > 1 || !!((br = V.referencePlan) != null && br.needsPreviousCharacter) || Ee);
    },
    he = p.needsDesignDirectionGate;
  let ue = he;
  he && ((He = (Ce = e.bridge).setRedesignDirectionGate) == null || He.call(Ce, !0), q = !0);
  let ge = !!(sJn(p, s) && !V.hasResolvedChoice && f === "execute"),
    _e = !!(!ge && e.activeSkill && /(?:先|必须|等待|用户).{0,40}(?:选择|选定|点选|确认).{0,20}方向|(?:方向|方案).{0,30}(?:供用户|让用户|待用户|等待用户).{0,20}(?:选|确认)/u.test(e.activeSkill.content) && !V.hasResolvedChoice && f === "execute" && (Crn(p) || ["image", "video", "series", "project"].includes(p.outputKind)));
  _e && (q = !0, V.skillDirectionGateActive = !0, V.skillDirectionResolved = !1), ge && (q = !0, V.inquireGateActive = !0);
  const ke = oDa(e.userText, i.length),
    ve = () => {
      const Br = ae();
      return !(Br <= 0 || ie.isBatch && Br < ie.minExpected || ye.hasGenerationGoal && ye.expected > 1 && Br < ye.expected);
    },
    Te = () => ({
      userText: e.userText,
      chatImageCount: i.length,
      batchSubmittedCount: U,
      expectedCount: ye.expected,
      chatImageAssets: i
    }),
    Ne = Br => {
      const tn = ve(),
        Lr = sfe(r, e.bridge, Te()),
        br = j1t(Br || ""),
        Jr = br && br.replace(/\s/g, "").length > 24 && !/^已完成。?$/.test(br),
        Kr = Jr && !Rrn(br) && !/已在画布提交生成|请稍候查看结果|请稍后查看结果/.test(br) ? br.split(/\n\n/)[0].trim().slice(0, 400) : "",
        ir = Rrn(br) ? br : Lr,
        Hr = tn ? [Kr && Kr !== ir ? Kr : "", ir].filter(Boolean).join(`

`) || (Jr ? br : "") || `已提交 ${U} 张生成。` : `本轮尚未全部完成：已提交 ${ae()}/${ye.expected} 张，剩余任务未提交。已提交的任务继续生成，不会重复发送。`;
      return b.completion = {
        status: tn ? "verified" : "incomplete",
        condition: Hr,
        ...(tn ? {
          verifiedAt: Date.now()
        } : {})
      }, e.callbacks.onStatus("done"), e.callbacks.onTextUpdate(Hr), {
        content: Hr,
        toolSteps: r,
        runContext: b
      };
    },
    me = () => HDa({
      capabilities: t,
      state: e.bridge.getState(),
      genPrefs: d,
      intent: p,
      loopMode: f,
      userChoices: b.userChoices,
      skillCatalog: j,
      skillHints: R,
      chatImageAssets: i,
      activeSkill: e.activeSkill ?? null,
      loadedSkills: B.filter(Br => F.has(Br.id)),
      creativeProject: L.current,
      productionScope: e.productionScope,
      referencePlan: V.referencePlan,
      contextLog: e.omitCanvasPromptContext ? void 0 : e.contextLog,
      standingBrief: V.standingBrief,
      referencePool: V.referencePool,
      memorySessionId: e.memorySessionId,
      skillDirectionGateActive: _e,
      inquireGateActive: ge,
      resolvedAxes: V.resolvedAxes,
      llmControl: {
        askMode: s,
        decision: h
      },
      skillDirectionChoice: V.skillDirectionChoice ?? null,
      legacyReferenceInjected: M,
      thisTurnReferenceNodes: Object.entries(A.inputImageNodeIdByIndex).map(([Br, tn]) => {
        var Lr;
        return {
          imageIndex: Number(Br),
          nodeId: tn,
          name: (Lr = i[Number(Br) - 1]) == null ? void 0 : Lr.name
        };
      }).filter(Br => Number.isInteger(Br.imageIndex) && Br.imageIndex >= 1 && Br.nodeId).sort((Br, tn) => Br.imageIndex - tn.imageIndex),
      hasPriorConversation: e.historyMessages.some(Br => (Br.role === "user" || Br.role === "assistant") && String(Br.content || "").trim()),
      progress: {
        mutationCount: b.toolCalls.filter(Br => Br.tool === "execute_canvas_action" && Br.ok).length
      }
    }) + (e.companionInstructions ? `

${e.companionInstructions}` : ""),
    Ae = e.userParts && e.userParts.length > 0 ? e.userParts : e.userText,
    Fe = WDa(Ae, o),
    Me = [{
      role: "system",
      content: me()
    }, ...JDa(e.historyMessages, e.historyLimit), {
      role: "user",
      content: Fe
    }];
  S && JN(e.userText) && Me.push({
    role: "user",
    content: mja(S, e.bridge.getState())
  });
  const Re = async Br => {
    var ir, Hr, ha, Ga, Za;
    const tn = O(Br),
      Lr = iXt(e.userText, Br),
      br = tn.sourceSize || unt(e.bridge.getState().nodes);
    if (o > 0 && String(V.pixelFacts || "").trim().length < 40) return !1;
    const Jr = {
      ...(d.resolvedModelId || d.modelId ? {
        model: d.resolvedModelId || d.modelId
      } : {}),
      ...(d.resolution ? {
        resolution: d.resolution
      } : {}),
      ...(d.platformGroup && d.platformGroup !== ko ? {
        platformGroup: d.platformGroup
      } : {})
    };
    let Kr = !1;
    for (let va = 0; va < Lr; va += 1) {
      const Kt = mda({
        userText: e.userText,
        pixelFacts: V.pixelFacts || "",
        imageCount: o,
        sourceSize: br,
        modelId: d.resolvedModelId || d.modelId,
        prefsRatio: d.ratio,
        variantIndex: va,
        variantCount: Lr
      });
      if (Kt.prompt.trim().length < 8 || gRt(Kt.prompt, e.userText) || V.pixelFacts && !KQe(Kt.prompt, V.pixelFacts)) continue;
      const Pr = LGn(e.userText, va, Br, {
          subject: DGn({
            pixelFacts: V.pixelFacts,
            imageCount: o,
            poolTitles: (V.referencePool || []).map($t => $t.title),
            primaryTask: (ir = V.standingBrief) == null ? void 0 : ir.primaryTask
          }) || sXn(V.referencePool),
          variantCount: Lr,
          variantIndex: va
        }),
        kr = {
          action: "gen_image",
          payload: {
            taskKey: `fast-ask-${va + 1}`,
            nodeName: Pr,
            prompt: Kt.prompt,
            references: Kt.references,
            parallelIndex: va,
            parallelCount: Lr,
            settings: {
              ...Jr,
              ...(Kt.ratio ? {
                ratio: Kt.ratio
              } : {})
            }
          }
        },
        Mr = Lr > 1 ? `fast-gen-image-${va + 1}` : "fast-gen-image",
        Hn = Date.now();
      e.callbacks.onStatus("executing", Lr > 1 ? `正在提交生成 ${va + 1}/${Lr}…` : "正在提交生成…"), (ha = (Hr = e.callbacks).onMindTrace) == null || ha.call(Hr, {
        id: Mr,
        kind: "execute",
        label: Lr > 1 ? `提交生成 ${Pr}` : "提交生成",
        command: "gen_image",
        status: "running",
        startedAt: Hn
      });
      try {
        const $t = await Frn(e.bridge, "execute_canvas_action", kr, d, e.apiKey, e.baseUrl, e.callbacks.onUserChoice, Mr, e.signal, A, P, L, V, xe()),
          je = MQ($t);
        je.length && H(je), sJ(A, "execute_canvas_action", kr, $t, _0);
        const Qe = Drn("execute_canvas_action", kr, $t, e.bridge, I, A, d),
          Mt = {
            id: Mr,
            tool: "execute_canvas_action",
            action: "gen_image",
            summary: $t.summary,
            ok: $t.ok,
            status: $t.ok ? "done" : "error",
            command: "gen_image",
            targetNodeId: $t.targetNodeId || $t.nodeId,
            submittedNodeIds: $t.submittedNodeIds,
            generation: Qe[0],
            generations: Qe.length > 0 ? Qe : void 0
          };
        r.push(Mt), e.callbacks.onToolStep(Mt), (Za = (Ga = e.callbacks).onMindTrace) == null || Za.call(Ga, {
          id: Mr,
          kind: "execute",
          label: $t.ok ? Pr : $t.summary,
          command: "gen_image",
          ok: $t.ok,
          status: $t.ok ? "done" : "error",
          startedAt: Hn,
          endedAt: Date.now()
        }), $t.ok && je.length > 0 && (Kr = !0);
      } catch ($t) {
        if ($t instanceof DOMException && $t.name === "AbortError") throw $t;
      }
    }
    return Kr;
  };
  e.callbacks.onStatus("thinking", "理解任务…"), (it = (Ve = e.callbacks).onMindTrace) == null || it.call(Ve, {
    id: "intent-resolved",
    kind: "plan",
    label: p.summary,
    command: `task=${p.taskClass} · mode=${f} · ask=${y} · ${(p.demandAtoms || []).join("+") || "需求未拆"}${p.videoDepth && p.videoDepth !== "none" ? ` · 视频${p.videoDepth}` : ""}`,
    status: "done"
  }), e.activeSkill && ((Ft = (It = e.callbacks).onMindTrace) == null || Ft.call(It, {
    id: "skill-bound",
    kind: "plan",
    label: `按 Skill「${e.activeSkill.name}」执行`,
    command: "已绑定用户选定的工作流",
    status: "done"
  })), (Ze = (We = e.callbacks).onMindTrace) == null || Ze.call(We, {
    id: "plan-start",
    kind: "plan",
    label: "分析任务",
    command: "Agent 启动",
    status: "running"
  });
  const $e = ELa(Ae, i);
  if (f === "execute" && $e.length > 0 && o > 0) {
    (Oe = (Ge = e.callbacks).onMindTrace) == null || Oe.call(Ge, {
      id: "pixel-lookahead",
      kind: "observe",
      label: "正在阅读参考图",
      command: zNa("看参考", re >= 2 ? `生成${re}张` : "按分析出图") || (s === "inquire" ? "先看再问" : "看图后发送"),
      status: "running"
    }), e.callbacks.onStatus("thinking", "正在阅读参考图…");
    const Br = await TLa({
      baseUrl: e.baseUrl,
      apiKey: e.apiKey,
      modelName: e.modelName,
      apiProtocol: e.apiProtocol,
      nativeChat: e.nativeChat,
      signal: e.signal,
      userText: e.userText,
      imageCount: o,
      imageParts: $e,
      standingBrief: G1t(V.standingBrief, {
        forLookahead: !0
      })
    });
    if ((st = e.signal) != null && st.aborted) throw new DOMException("Aborted", "AbortError");
    if (V.pixelLookaheadAttempted = !0, Br) {
      V.pixelFacts = yk(Br), V.standingBrief = wJn(V.standingBrief, vJn(V.pixelFacts)), b.pixelFacts = V.pixelFacts, b.standingBrief = V.standingBrief, V.referencePool = ynn({
        previous: V.referencePool || e.referencePool,
        assets: i,
        pixelFacts: V.pixelFacts,
        standingBrief: V.standingBrief
      }), b.referencePool = V.referencePool, (Ht = (vt = e.callbacks).onReferencePoolUpdate) == null || Ht.call(vt, V.referencePool), V.resolvedAxes = tXt({
        userText: e.userText,
        pixelFacts: V.pixelFacts,
        prefsRatio: d.ratio,
        answers: (V.resolvedAxes || []).filter(Lr => Lr.source.kind === "answer").map(Lr => ({
          axis: Lr.axis,
          question: Lr.source.kind === "answer" ? Lr.source.question : "",
          value: Lr.value
        }))
      });
      const tn = O();
      tn.ratio && tn.source === "source_snap" && ((pt = (nn = e.callbacks).onMindTrace) == null || pt.call(nn, {
        id: "ratio-snap",
        kind: "plan",
        label: `比例按参考图吸附 ${tn.ratio}`,
        command: tn.sourceSize ? `${tn.sourceSize.width}×${tn.sourceSize.height}` : "画幅吸附",
        status: "done"
      })), Me.push({
        role: "user",
        content: mca(V.pixelFacts, G1t(V.standingBrief), !!e.activeSkill)
      }), (gt = (lt = e.callbacks).onMindTrace) == null || gt.call(lt, {
        id: "pixel-lookahead",
        kind: "observe",
        label: "参考素材分析完成",
        command: "已看清附件像素",
        status: "done"
      });
    } else (_t = (Ut = e.callbacks).onMindTrace) == null || _t.call(Ut, {
      id: "pixel-lookahead",
      kind: "observe",
      label: "参考图将随提问一并阅读",
      command: "预读未形成事实，本轮模型直接看图",
      status: "done"
    });
  }
  if (f === "execute" && !e.activeSkill && !JN(e.userText) && iXt(e.userText) <= 1 && s === "auto" && !V.ratioAskPending && !nFe(e.userText) && (e.callbacks.onStatus("executing", "正在提交生成…"), (await Re("")) && ve())) return Ne("已提交生成。");
  _e ? Me.push({
    role: "user",
    content: V.pixelFacts ? "本 Skill 要求先让用户选方向。如果当前请求还不够明确，本轮调用一次 ask_user_choice 给出 3～5 个从 Skill 步骤和已看见的特征推导的方向；若用户已经把方向说清楚了，直接执行，不要再确认一遍。不要写像素报告。" : "本 Skill 要求先让用户选方向。如果附件和用户原话还不足以定方向，本轮调用一次 ask_user_choice 给出 3～5 个方向；不足以判断时先看懂图再问。若方向已经明确，直接执行。"
  }) : (ge || s === "auto" && nFe(e.userText) && f === "execute" && !JN(e.userText)) && Me.push({
    role: "user",
    content: Xnn({
      askMode: s,
      userText: e.userText,
      hasPixelFacts: !!V.pixelFacts,
      skillName: (At = e.activeSkill) == null ? void 0 : At.name
    })
  });
  try {
    let Br = -1;
    for (let br = 0; br < ke; br += 1) {
      t1e(e.signal), G(), pe += 1;
      const Jr = de;
      de = !1, br > 0 && f === "execute" && y === "must_not_ask" && !ML(r) && (q = !0);
      const Kr = _e && !V.skillDirectionResolved,
        ir = !!(ge && !Kr && !Jr && !V.ratioAskPending),
        Hr = !!V.ratioAskPending && !Kr,
        ha = !!(!Hr && !Kr && !ir && cZn(V.referencePlan, ((Yt = V.chatAssets) == null ? void 0 : Yt.length) || 0) && !V.referenceAnalysisWaived && V.referenceAnalysisComplete && !V.referenceAnalysisComplete()),
        Ga = `plan-round-${br}`,
        Za = Date.now();
      (kt = (qe = e.callbacks).onMindTrace) == null || kt.call(qe, {
        id: Ga,
        kind: "plan",
        label: Kr ? "读取 Skill 并给出方向" : Hr ? "询问画幅" : ha ? "查看画布" : ir ? Wat().selecting : Jr ? "按选定方向执行" : br === 0 ? Wat().analyzing : Wat().choosing,
        command: Kr ? `选定方向 · 第 ${br + 1} 轮` : ir ? `问询 · 第 ${br + 1} 轮` : Jr ? `执行任务 · 第 ${br + 1} 轮` : `模型推理 · 第 ${br + 1} 轮`,
        status: "running"
      }), uDa(Me, br, e.chatImageAssets ?? [], ne || !ve()), ne = !1, ((St = Me[0]) == null ? void 0 : St.role) === "system" && (Me[0] = {
        role: "system",
        content: me()
      });
      {
        const Rt = zDa({
          mutationCount: b.toolCalls.filter(fn => fn.tool === "execute_canvas_action" && fn.ok).length,
          submittedCount: U,
          roundsUsed: pe,
          maxRounds: ke,
          lastMutationRound: le
        });
        Br >= 0 && Br < Me.length && Me.splice(Br, 1), Me.push({
          role: "user",
          content: Rt
        }), Br = Me.length - 1;
      }
      br === 0 && Hr ? Me.push({
        role: "user",
        content: `${Sze(d.resolvedModelId || d.modelId)}
本轮只调用 ask_user_choice，问要什么比例。`
      }) : br === 0 && ha && Me.push({
        role: "user",
        content: "本轮有新参考图。先调用 get_canvas_state 或 analyze_canvas_images 看清画布，不要 gen_image，也不要说没有读取画布的工具。"
      }), e.callbacks.onStatus("thinking", Kr ? `选定方向中 · 第 ${br + 1} 轮` : Hr ? `询问画幅 · 第 ${br + 1} 轮` : ha ? `查看画布 · 第 ${br + 1} 轮` : Jr ? `执行任务中 · 第 ${br + 1} 轮` : `模型推理中 · 第 ${br + 1} 轮`);
      const {
        message: va
      } = await PZn({
        baseUrl: e.baseUrl,
        apiKey: e.apiKey,
        modelName: e.modelName,
        messages: Me,
        signal: e.signal,
        apiProtocol: e.apiProtocol,
        nativeChat: e.nativeChat,
        webSearchEnabled: e.webSearchEnabled,
        reasoningEffort: Kr || ir ? "low" : e.reasoningEffort,
        deterministicTools: Kr || ir,
        tools: LDa({
          loopMode: f,
          taskClass: p.taskClass,
          skillAskOnly: Kr,
          inquireAskOnly: ir,
          ratioAskOnly: Hr,
          canvasViewOnly: ha,
          mutationOnly: Jr && !e.activeSkill,
          skillAlreadyBound: !!e.activeSkill,
          skillDirectionResolved: !!V.skillDirectionResolved,
          allowCreativeDefinition: L.definitionRequired && !L.definitionCommittedThisTurn,
          imageTaskOnly: e.activeSkill ? !Kr && f === "execute" : mZn(p, !1)
        }),
        toolChoice: q || Jr || Kr || ir || Hr || ha ? "required" : "auto",
        onStreamDelta: Rt => {
          var Zt, Ln, tt, zt;
          Rt.status && e.callbacks.onStatus("thinking", Rt.status), Rt.reasoning && ((Ln = (Zt = e.callbacks).onReasoning) == null || Ln.call(Zt, Rt.reasoning));
          const fn = tg(Rt.content);
          if (fn && ((zt = (tt = e.callbacks).onTextDraft) == null || zt.call(tt, fn)), Rt.toolCallCount > 0) e.callbacks.onStatus("thinking", Kr ? "正在给出方向选项…" : ir ? "正在准备问询选项…" : Jr ? `正在组装画布动作 · ${Rt.toolCallCount} 个工具` : `模型推理中 · 第 ${br + 1} 轮 · 组装 ${Rt.toolCallCount} 个工具`);else if (fn) {
            const an = fn.replace(/\s+/g, " ").slice(0, 36);
            e.callbacks.onStatus("thinking", Kr ? "正在给出方向选项…" : ir ? "正在准备问询选项…" : an ? `模型推理中 · ${an}${fn.length > 36 ? "…" : ""}` : `模型推理中 · 第 ${br + 1} 轮`);
          }
        }
      });
      if (q = !1, !va) throw new Error("Agent 未返回有效消息");
      va.codexUsage && ((Qt = (hn = e.callbacks).onCodexUsage) == null || Qt.call(hn, va.codexUsage)), (ln = (Ot = e.callbacks).onMindTrace) == null || ln.call(Ot, {
        id: Ga,
        kind: "plan",
        label: Kr ? "已准备方向选项" : Jr ? "已规划执行动作" : br === 0 ? "已完成工作流规划" : "已规划下一步",
        command: `${Kr ? "选定方向" : ir ? "问询" : Jr ? "执行任务" : "模型推理"} · 用时 ${Math.max(.1, (Date.now() - Za) / 1e3).toFixed(1)}s`,
        status: "done"
      }), br === 0 && ((rn = (Pn = e.callbacks).onMindTrace) == null || rn.call(Pn, {
        id: "plan-start",
        kind: "plan",
        label: Kr ? "已读 Skill，等待选定方向" : ir ? "等待用户选择方向" : "已完成任务与画布分析",
        command: "Agent 启动",
        status: "done"
      }));
      const Kt = TDa(va),
        Pr = LNa(Kt, Rt => {
          var Zt, Ln;
          const {
            args: fn
          } = lfe((Zt = Rt.function) == null ? void 0 : Zt.arguments);
          return {
            name: String(((Ln = Rt.function) == null ? void 0 : Ln.name) || ""),
            action: typeof fn.action == "string" ? fn.action : void 0,
            payload: _0(fn)
          };
        }, {
          askMode: s,
          inquireGateActive: ir || ge
        });
      Pr.dropped.length > 0 && ((Ct = (Yn = e.callbacks).onMindTrace) == null || Ct.call(Yn, {
        id: `control-filter-${br}`,
        kind: "plan",
        label: "同轮提问与生成冲突，已按控制层丢弃",
        command: Pr.violations.map(Rt => Rt.rule).join(",") || "no_ask_while_generating",
        status: "done"
      }));
      const kr = Pr.kept,
        Mr = dZn(va.content);
      Mr && (z = Mr);
      const Hn = iFe(Mr);
      if (Hn >= 2 && Hn > ye.expected && (ye = {
        expected: Hn,
        hasGenerationGoal: !0
      }, (V.resolvedAxes || []).some(fn => fn.axis === "count") || (V.resolvedAxes = [...(V.resolvedAxes || []), {
        axis: "count",
        value: String(Hn),
        source: {
          kind: "inferred",
          reason: "从本轮分析正文回收的交付件数"
        }
      }])), Mr && ((un = (Cn = e.callbacks).onTextDraft) == null || un.call(Cn, Mr)), kr.length === 0) {
        const Rt = ue && !TL(r),
          fn = _e && !EL(r),
          Zt = !!(ge && !Kr);
        if (Rt && br < ke - 1) {
          q = !0, (Kn = (Jn = e.callbacks).onMindTrace) == null || Kn.call(Jn, {
            id: `nudge-redesign-gate-${br}`,
            kind: "plan",
            label: "提醒先征询设计方向",
            command: "重新设计门禁：须 ask_user_choice",
            status: "done"
          }), Me.push({
            role: "assistant",
            content: eR(va, Mr)
          }), Me.push({
            role: "user",
            content: ait
          }), e.callbacks.onStatus("thinking", "等待选定设计方向…");
          continue;
        }
        if (fn) {
          const er = await Ern({
            text: Mr,
            round: br,
            onUserChoice: e.callbacks.onUserChoice,
            signal: e.signal,
            toolSteps: r,
            callbacks: e.callbacks
          });
          if (er) {
            _e = !1, V.skillDirectionGateActive = !1, V.skillDirectionResolved = !0, V.skillDirectionChoice = {
              id: er.selectedId,
              label: er.label
            }, Me.push({
              role: "assistant",
              content: eR(va, Mr)
            }), Me.push({
              role: "user",
              content: zTe(er.label, e.activeSkill)
            }), q = !0, de = !0, e.callbacks.onStatus("thinking", "已选定方向，开始执行…");
            continue;
          }
          if (br < ke - 1) {
            q = !0, (Vn = (en = e.callbacks).onMindTrace) == null || Vn.call(en, {
              id: `nudge-skill-gate-${br}`,
              kind: "plan",
              label: "提醒先给出 Skill 方向选项",
              command: "Skill 方向门禁：须 ask_user_choice(skill_direction)",
              status: "done"
            }), Me.push({
              role: "assistant",
              content: eR(va, Mr)
            }), Me.push({
              role: "user",
              content: iit
            }), e.callbacks.onStatus("thinking", "等待选定 Skill 方向…");
            continue;
          }
        }
        if (Zt && br < ke - 1) {
          q = !0, (Ue = (Tt = e.callbacks).onMindTrace) == null || Ue.call(Tt, {
            id: `nudge-inquire-gate-${br}`,
            kind: "plan",
            label: "提醒先向用户提问",
            command: "问询门禁：须 ask_user_choice",
            status: "done"
          }), Me.push({
            role: "assistant",
            content: eR(va, Mr)
          }), Me.push({
            role: "user",
            content: uJn(h.trigger)
          }), e.callbacks.onStatus("thinking", "等待用户选择方向…");
          continue;
        }
        if (ve()) return Ne(Mr);
        const Ln = !m && !Rt && !ML(r) && !eD(e.userText) && hnn(Mr);
        if (Ln && W < 3 && br < ke - 1) {
          W += 1, q = !0, (ft = (et = e.callbacks).onMindTrace) == null || ft.call(et, {
            id: `nudge-inquiry-${br}`,
            kind: "plan",
            label: "提醒用 ask_user_choice 展示选项",
            command: "正文征询未走工具，自动续跑",
            status: "done"
          }), Me.push({
            role: "assistant",
            content: eR(va, Mr)
          }), Me.push({
            role: "user",
            content: mDa(Mr)
          }), e.callbacks.onStatus("thinking", "等待你点选选项…");
          continue;
        }
        if (f === "execute" && !Rt && !fn && !Ln && K < (m ? 3 : 1) && br < ke - 1 && (m && ["image", "video", "series", "project"].includes(p.outputKind) || eD(e.userText) || bDa(Mr) || Mrn(Mr) && !ML(r))) {
          K += 1, q = !0, (wt = (ht = e.callbacks).onMindTrace) == null || wt.call(ht, {
            id: `nudge-exec-${br}`,
            kind: "plan",
            label: "提醒执行画布工具",
            command: "模型未调用工具，自动续跑",
            status: "done"
          }), Me.push({
            role: "assistant",
            content: eR(va, Mr)
          }), Me.push({
            role: "user",
            content: V.ratioAskPending ? `${Sze(d.resolvedModelId || d.modelId)}
本轮只调用 ask_user_choice。` : ha ? "本轮有新参考图。先调用 get_canvas_state 或 analyze_canvas_images 看清，再 gen_image。不要重复提交被拦截的生成，也不要说没有看画布的工具。" : hDa
          }), e.callbacks.onStatus("thinking", "继续执行画布操作…");
          continue;
        }
        if (ye.expected > 1 && U < ye.expected && br < ke - 1) {
          const er = ye.expected - U,
            Cr = I.singleOutputByDefault ? "按该任务的实际参考职责完成节点连线后再发送。" : "按你对实际像素的理解，为每个独立成品选择真正需要的参考；不要套固定 UI/角色连线表。";
          Me.push({
            role: "user",
            content: `批量任务尚未完成：已提交 ${U}/${ye.expected} 张。${Cr} 请立即调用 execute_canvas_action 补齐剩余 ${er} 张，不要只回复文字。`
          }), q = !0, (bt = (jt = e.callbacks).onMindTrace) == null || bt.call(jt, {
            id: `nudge-batch-text-${br}`,
            kind: "plan",
            label: `批量未完成 ${U}/${ye.expected}`,
            command: "文字回复不可收尾，强制继续提交",
            status: "done"
          }), e.callbacks.onStatus("thinking", "批量任务未完成，强制继续提交…");
          continue;
        }
        {
          const er = fn || Rt ? null : Nrn(e.bridge.getState(), ye, D);
          if (er && br < ke - 1) {
            Me.push({
              role: "assistant",
              content: eR(va, Mr)
            }), Me.push({
              role: "user",
              content: er
            }), q = !0, (wn = (Bt = e.callbacks).onMindTrace) == null || wn.call(Bt, {
              id: `nudge-truth-text-${br}`,
              kind: "observe",
              label: "画布真相对账：生成数量不足",
              command: "强制续跑补齐目标数量",
              status: "done"
            }), e.callbacks.onStatus("thinking", "生成数量不足，继续补齐…");
            continue;
          }
        }
        const zt = x6e(b, e.bridge.getState()),
          an = ML(r),
          Rn = !fn && !Rt && an && Q < eit && (zt.status === "error" || zt.status === "incomplete") && !!zt.repairPrompt;
        if (Rn && br < ke - 1) {
          Q += 1, Me.push({
            role: "assistant",
            content: eR(va, Mr)
          }), Me.push({
            role: "user",
            content: zt.repairPrompt || ""
          }), q = !0, e.callbacks.onStatus("thinking", "验证未通过，继续修复…");
          continue;
        }
        const Un = Rn ? `${zt.message}
${zt.repairPrompt}` : Rt ? Mr || "请先选择设计方向，我再按你的选择生成。" : Ln ? Mr || "请在下方点选选项，无需打字。" : Mrn(Mr) && !ML(r) ? "画布操作未能真正执行（模型未调用工具）。请重试，或换用 Gemini 等工具调用更稳定的模型。" : Mr || (ML(r) || ude(Mr) ? "" : "已完成。");
        if (Un) {
          const er = Rt || Ln || hnn(Un);
          b.completion = er ? {
            status: "waiting",
            condition: "waiting_for_user"
          } : zt.status === "verified" ? {
            status: "verified",
            condition: zt.message,
            verifiedAt: Date.now()
          } : {
            status: zt.status,
            condition: zt.message
          }, e.callbacks.onStatus(er ? "waiting_choice" : zt.status === "verified" || !an ? "done" : "thinking"), e.callbacks.onTextUpdate(Un);
        } else b.completion = {
          status: zt.status,
          condition: zt.message,
          verifiedAt: zt.status === "verified" ? Date.now() : void 0
        }, e.callbacks.onStatus(zt.status === "waiting" ? "waiting_choice" : "done");
        return {
          content: Un,
          toolSteps: r,
          runContext: b
        };
      }
      if (Me.push({
        role: "assistant",
        content: eR(va, Mr),
        tool_calls: kr
      }), Mr) {
        const Rt = QNt(Mr);
        Rt && ((Pt = (at = e.callbacks).onMindTrace) == null || Pt.call(at, {
          id: `thought-${br}`,
          kind: "thought",
          label: "Brief",
          preview: Rt.length > xrn ? `${Rt.slice(0, xrn)}…` : Rt,
          status: "done"
        }));
      }
      e.callbacks.onStatus("executing");
      const $t = r.length,
        je = Rt => {
          var Zt;
          const fn = String(((Zt = Rt.function) == null ? void 0 : Zt.name) || "");
          return (ue || _e || ir) && fn === "ask_user_choice" ? 0 : 1;
        },
        Qe = [...kr].sort((Rt, fn) => je(Rt) - je(fn));
      for (let Rt = 0; Rt < Qe.length; Rt += 1) {
        const fn = Qe[Rt];
        if ((dt = e.signal) != null && dt.aborted) {
          const Jt = Qe.slice(Rt).map(Nn => {
            var Et, zn, Mn;
            const En = String(((Et = Nn.function) == null ? void 0 : Et.name) || "").trim() || "execute_canvas_action",
              Zn = lfe((zn = Nn.function) == null ? void 0 : zn.arguments),
              Sr = typeof Zn.args.action == "string" ? Zn.args.action : void 0,
              Bn = Nn.id || `${En}-${br}-${Rt}`;
            return hrn({
              requestId: Bn,
              runId: ((Mn = bm()) == null ? void 0 : Mn.id) || (S == null ? void 0 : S.runId) || "unknown",
              projectId: e.bridge.getState().projectId,
              tool: En,
              action: Sr
            }), {
              toolCallId: Bn,
              tool: En,
              action: Sr,
              summary: Sr ? `${En} · ${Sr}` : En,
              abortReason: "ABORTED_BEFORE_DISPATCH"
            };
          });
          C(Jt), t1e(e.signal);
        }
        t1e(e.signal);
        const Zt = String(((xt = fn.function) == null ? void 0 : xt.name) || "").trim(),
          {
            args: Ln,
            parseError: tt
          } = lfe((yn = fn.function) == null ? void 0 : yn.arguments),
          zt = fn.id || `${Zt}-${br}-${r.length}`;
        if (tt) {
          const Wt = `工具参数解析失败（${Zt}）`,
            Jt = String(((gn = fn.function) == null ? void 0 : gn.name) || Zt),
            Nn = `参数 JSON 解析失败: ${tt.slice(0, 100)}`;
          e.callbacks.onStatus("executing", Wt), (Xt = (mt = e.callbacks).onMindTrace) == null || Xt.call(mt, {
            id: zt,
            kind: oit(Zt),
            label: Wt,
            command: Jt,
            status: "error",
            ok: !1
          }), (rr = (Gn = e.callbacks).onToolStepStart) == null || rr.call(Gn, {
            id: zt,
            tool: Zt,
            summary: Wt,
            command: Jt,
            meta: Nn
          }), twt(b, {
            toolCallId: zt,
            tool: Zt,
            ok: !1,
            content: JSON.stringify({
              ok: !1,
              error: tt
            }),
            summary: Wt
          });
          const En = {
            id: zt,
            tool: Zt,
            summary: Wt,
            ok: !1,
            status: "error",
            command: Jt,
            meta: Nn
          };
          r.push(En), e.callbacks.onToolStep(En), Me.push({
            role: "tool",
            tool_call_id: fn.id,
            content: JSON.stringify({
              ok: !1,
              error: "tool_arguments_json_parse_error",
              detail: tt,
              hint: "请重新调用该工具，确保 arguments 是合法完整的 JSON 对象；不要拼接残缺 JSON。"
            })
          });
          continue;
        }
        const an = fZn(Zt, Ln),
          Rn = KDa(Zt, Ln),
          Un = Date.now(),
          er = Wt => {
            var Nn;
            const {
              args: Jt
            } = lfe((Nn = Wt.function) == null ? void 0 : Nn.arguments);
            return Jt.action === "gen_image" || Jt.action === "create_image_series";
          },
          Cr = Qe.filter(er).length,
          tr = Cr > 1 && er(fn) ? `${an}（第 ${Qe.slice(0, Rt).filter(er).length + 1}/${Cr} 张）` : an;
        Zt === "ask_user_choice" ? e.callbacks.onStatus("waiting_choice", tr) : e.callbacks.onStatus("executing", tr), (Dn = (qn = e.callbacks).onMindTrace) == null || Dn.call(qn, {
          id: zt,
          kind: oit(Zt),
          label: tr,
          command: Rn,
          status: "running",
          startedAt: Un
        }), (_r = (Ar = e.callbacks).onToolStepStart) == null || _r.call(Ar, {
          id: zt,
          tool: Zt,
          action: typeof Ln.action == "string" ? Ln.action : void 0,
          summary: tr,
          command: Rn
        });
        let kn;
        try {
          kn = await Frn(e.bridge, Zt, Ln, d, e.apiKey, e.baseUrl, e.callbacks.onUserChoice, fn.id, e.signal, A, P, L, V, xe());
        } catch (Wt) {
          if (Wt instanceof DOMException && Wt.name === "AbortError") {
            const Jt = Qe.slice(Rt + 1);
            C(Jt.map((Nn, En) => {
              var zn, Mn, or;
              const Zn = String(((zn = Nn.function) == null ? void 0 : zn.name) || "").trim() || "execute_canvas_action",
                Sr = lfe((Mn = Nn.function) == null ? void 0 : Mn.arguments),
                Bn = typeof Sr.args.action == "string" ? Sr.args.action : void 0,
                Et = Nn.id || `${Zn}-${br}-remain-${En}`;
              return hrn({
                requestId: Et,
                runId: ((or = bm()) == null ? void 0 : or.id) || (S == null ? void 0 : S.runId) || "unknown",
                projectId: e.bridge.getState().projectId,
                tool: Zn,
                action: Bn
              }), {
                toolCallId: Et,
                tool: Zn,
                action: Bn,
                summary: Bn ? `${Zn} · ${Bn}` : Zn,
                abortReason: "ABORTED_BEFORE_DISPATCH"
              };
            }));
          }
          throw Wt;
        }
        if (twt(b, {
          toolCallId: zt,
          tool: Zt,
          action: typeof Ln.action == "string" ? Ln.action : void 0,
          ok: kn.ok,
          content: kn.content,
          targetNodeId: kn.targetNodeId,
          submittedNodeIds: kn.submittedNodeIds,
          summary: kn.summary
        }), kn.ok && Zt === "execute_canvas_action" && GO(String(Ln.action || "").trim(), Ln.payload && typeof Ln.payload == "object" ? Ln.payload : _0(Ln))) {
          const Wt = e.bridge.getState();
          b.latestStateVersion = Wt.stateVersion ?? Wt.updatedAt;
        }
        if (kn.ok && Zt === "execute_canvas_action" && (L != null && L.current)) {
          const Wt = String(Ln.action || "").trim();
          if (GO(Wt, _0(Ln))) {
            const Jt = MQ(kn);
            if (H(Jt), Jt.length > 0) {
              let Nn = L.current;
              Jt.forEach((En, Zn) => {
                const Sr = Nn.tasks.filter(F0e).filter(Mn => Mn.generationNodeIds.length < Math.max(1, Mn.quantity)),
                  Bn = Sr.filter(Mn => Mn.status === "pending"),
                  Et = Jt.length - Zn,
                  zn = Sr.find(Mn => Oz(Mn) && (Mn.status === "approved" || Mn.status === "generating")) || Sr.find(Mn => Mn.status === "approved" || Mn.status === "generating") || Bn.find(Mn => Mn.quantity === Et) || Bn.find(Mn => Mn.quantity <= Et) || Bn[0];
                zn && (Nn = srn(Nn, zn.id, En));
              }), L.current = Nn, L.notify(Nn);
            }
          }
        }
        sJ(A, Zt, Ln, kn, _0);
        const xn = QDa(Zt, Ln, kn, e.bridge),
          Fn = Drn(Zt, Ln, kn, e.bridge, I, A, d),
          cr = Math.max(1, Math.round((Date.now() - Un) / 1e3));
        for (const Wt of Fn) Wt.durationSeconds = cr;
        const vr = {
          id: zt,
          tool: Zt,
          action: typeof Ln.action == "string" ? Ln.action : void 0,
          summary: kn.summary,
          ok: kn.ok,
          status: kn.ok ? "done" : "error",
          command: Rn,
          meta: xn,
          targetNodeId: kn.targetNodeId,
          submittedNodeIds: kn.submittedNodeIds,
          analyzedNodeIds: kn.analyzedNodeIds,
          generation: Fn[0],
          generations: Fn.length > 0 ? Fn : void 0,
          taskSnapshot: kn.taskSnapshot
        };
        if (r.push(vr), (fa = (Pa = e.callbacks).onMindTrace) == null || fa.call(Pa, {
          id: zt,
          kind: oit(Zt),
          label: kn.summary,
          command: Rn,
          meta: xn,
          ok: kn.ok,
          status: kn.ok ? "done" : "error",
          startedAt: Un,
          endedAt: Date.now()
        }), e.callbacks.onToolStep(vr), kn.ok && Zt === "execute_canvas_action") {
          const Wt = MQ(kn);
          Wt.length > 0 && H(Wt);
        }
        if (Me.push({
          role: "tool",
          tool_call_id: fn.id,
          content: sDa(Zt, kn.content, kn.summary)
        }), !kn.ok && String(kn.content || "").includes("generation_prompt_template_boilerplate") && (ne = !0), (Ca = kn.visionParts) != null && Ca.some(Wt => Wt.type === "image_url") && (Me.push({
          role: "user",
          content: kn.visionParts
        }), ne = !0), Zt === "analyze_canvas_images" && !kn.ok && (V.referenceAnalysisDenials = (V.referenceAnalysisDenials || 0) + 1, (V.referenceAnalysisDenials || 0) >= 2 && (V.referenceAnalysisWaived = !0)), Zt === "ask_user_choice") {
          if (kn.ok) try {
            const Jt = JSON.parse(kn.content);
            O(`${Jt.label || ""} ${Jt.selectedId || ""}`).ratio && (V.ratioAskPending = !1);
          } catch {}
          if (kn.ok) try {
            const Jt = JSON.parse(kn.content),
              Nn = String(Jt.label || ""),
              En = Math.max(aFe(Nn), Kce(e.userText, Nn).length);
            En >= 2 && (($n = V.syncExpectedGenCount) == null || $n.call(V, En));
          } catch {}
          V.inquireGateActive || (ge = !1), e.callbacks.onStatus("thinking", "准备下一轮推理…");
          const Wt = String(Ln.choiceType || "");
          if (kn.ok && Wt === "design_direction" && (ue = !1), ge && kn.ok) {
            ge = !1, V.inquireGateActive = !1;
            let Jt = 0;
            try {
              const Nn = JSON.parse(kn.content),
                En = String(Nn.label || "");
              Jt = Math.max(aFe(En), Kce(e.userText, En).length);
            } catch {
              Jt = 0;
            }
            if (Jt >= 2 && ((yr = V.syncExpectedGenCount) == null || yr.call(V, Jt)), Me.push({
              role: "user",
              content: [Xnn({
                askMode: "auto",
                userText: Jt >= 2 ? `${e.userText} ${Jt}张` : e.userText,
                hasPixelFacts: !!V.pixelFacts
              }), e.activeSkill ? `用户已回答。现在按 Skill「${e.activeSkill.name}」正文和已选方向另写 payload.prompt 并连续 gen_image；构图、文案层级和必须保留项以 Skill 为准，不要另起通用海报，不要粘贴上一轮分析原文。` : "用户已回答规划问题。现在按该回答写完整组提示词并连续 gen_image，每张职责不同。"].join("")
            }), de = !0, q = !0, e.activeSkill && !V.skillDirectionChoice) try {
              const Nn = JSON.parse(kn.content);
              V.skillDirectionChoice = {
                id: Nn.selectedId || "",
                label: Nn.label || Nn.selectedId || "已确认方向"
              }, V.skillDirectionResolved = !0;
            } catch {
              V.skillDirectionChoice = {
                id: "",
                label: "已确认方向"
              }, V.skillDirectionResolved = !0;
            }
          }
          if (_e && kn.ok) {
            _e = !1, V.skillDirectionGateActive = !1, V.skillDirectionResolved = !0;
            try {
              const Jt = JSON.parse(kn.content);
              V.skillDirectionChoice = {
                id: Jt.selectedId || "",
                label: Jt.label || Jt.selectedId || "已确认方向"
              };
            } catch {
              V.skillDirectionChoice = {
                id: "",
                label: "已确认方向"
              };
            }
            de = !0;
          }
        }
      }
      if (ve()) return Ne(Mr);
      const Mt = r.slice($t).some(Rt => Rt.ok && Rt.tool === "execute_canvas_action"),
        cn = r.slice($t).some(Rt => Rt.ok && Rt.tool === "analyze_canvas_images");
      if (Mt && (le = br, J = !1), f === "execute" && cn && !Mt && ye.hasGenerationGoal && !ve() && !_e && !ue && !ge && br < ke - 1) {
        const Rt = r.filter(tt => tt.ok && tt.tool === "analyze_canvas_images").length;
        q = !0;
        const fn = I.singleOutputByDefault ? "把刚才分析里点名的可见物体、颜色、媒介写进 prompt，创建目标 gen-image，连上参考并 run_generation。" : "按看图结论为每个成品自由选择参考并分别提交；可并列工具调用或用有序 batch_actions，一次提交完整任务链。",
          Zt = fca({
            successfulAnalyzeCount: Rt,
            hasPixelFacts: !!((Ir = V.pixelFacts) != null && Ir.trim()),
            directionResolved: !!V.skillDirectionResolved
          });
        Zt || (de = !0);
        const Ln = "prompt 必须复用刚才点名的可见名词（物件、文字原文、媒介）。不要改写成空槽填空句，也不要把系统禁令写进绘画提示词。";
        Me.push({
          role: "user",
          content: V.skillDirectionResolved ? zTe((Gr = V.skillDirectionChoice) == null ? void 0 : Gr.label, e.activeSkill) : Zt ? `已完成参考图读取。${Ln} ${fn} 当前提交 ${U}/${ye.expected}。若某张图仍未看清，可以再 analyze_canvas_images 一次。` : `参考图已看清。${Ln} ${fn} 当前提交 ${U}/${ye.expected}。立刻执行画布写操作，不要再分析或把像素报告写进正文。`
        }), (La = (Zr = e.callbacks).onMindTrace) == null || La.call(Zr, {
          id: `analysis-to-execute-${br}`,
          kind: "plan",
          label: V.skillDirectionResolved ? "方向已选定，切换到执行" : Zt ? "参考图已读取，可执行或补看一次" : "参考图已看清，切换到执行",
          command: V.skillDirectionResolved ? "下一轮只建节点并发送" : Zt ? "下一轮仍可分析一次，优先落实创意定义" : "下一轮保存创意定义并执行画布动作",
          status: "done"
        }), e.callbacks.onStatus("thinking", V.skillDirectionResolved ? "已选定方向，开始创建并发送任务…" : Zt ? "参考图已读取，开始落实到提示词…" : "参考图分析完成，开始创建并发送任务…");
        continue;
      }
      if (f === "execute" && fE(I) && !((sa = V.referenceAnalysisComplete) != null && sa.call(V)) && !V.skillDirectionResolved && !_e && ye.hasGenerationGoal && !ve() && br < ke - 1) {
        const Rt = I.current.map(Zt => A.inputImageNodeIdByIndex[Zt.imageIndex]).filter(Boolean),
          fn = Rt.length ? `对已显式采用的节点调用 analyze_canvas_images(nodeIds=[${Rt.join(", ")}])` : "直接重新查看本轮对话附件；先决定“采用/不采用”和像素短名称，只为正向参考显式创建 input-image 后再调用 analyze_canvas_images";
        ne = !0, q = !0, Me.push({
          role: "user",
          content: `请先${fn}。附件默认只留在对话视觉上下文，禁止把全部附件强制放上画布。看清后把一段由你撰写的目标成片写进 gen_image 的 payload.prompt（提到 @1/@2 时写出看见的构图结构、媒介、可见文字和具体道具），正向参考写入 references，不要连线。不要把用户原话或空槽填空句当绘画提示词。`
        }), (ba = (Ea = e.callbacks).onMindTrace) == null || ba.call(Ea, {
          id: `need-analyze-${br}`,
          kind: "observe",
          label: "需要先分析参考图再写提示词",
          command: fn,
          status: "done"
        }), e.callbacks.onStatus("thinking", "先看清参考图，再写提示词…");
        continue;
      }
      if (f === "execute" && V.skillDirectionResolved && !Mt && ye.hasGenerationGoal && !ve() && br < ke - 1) {
        de = !0, q = !0, Me.push({
          role: "user",
          content: zTe((ga = V.skillDirectionChoice) == null ? void 0 : ga.label, e.activeSkill)
        }), ($a = (_a = e.callbacks).onMindTrace) == null || $a.call(_a, {
          id: `direction-to-execute-${br}`,
          kind: "plan",
          label: "方向已选定，切换到执行",
          command: "下一轮只建节点并发送",
          status: "done"
        }), e.callbacks.onStatus("thinking", "已选定方向，开始创建并发送任务…");
        continue;
      }
      const Qn = x6e(b, e.bridge.getState());
      if (!(_e && !EL(r) || ue && !TL(r)) && (Qn.status === "error" || Qn.status === "incomplete") && Qn.repairPrompt && Q < eit && br < ke - 1) {
        Q += 1, b.completion = {
          status: Qn.status,
          condition: Qn.message
        }, Me.push({
          role: "user",
          content: Qn.repairPrompt
        }), q = !0, (ta = (Ya = e.callbacks).onMindTrace) == null || ta.call(Ya, {
          id: `verify-repair-${br}`,
          kind: "observe",
          label: Qn.message,
          command: "verify → repair",
          status: "error"
        }), e.callbacks.onStatus("thinking", "验证未通过，正在修复…");
        continue;
      }
      if ((Qn.status === "error" || Qn.status === "incomplete") && ML(r) && Q >= eit) {
        if (ue && !TL(r)) {
          if (br < ke - 1) {
            Me.push({
              role: "user",
              content: ait
            }), q = !0, e.callbacks.onStatus("thinking", "等待选定设计方向…");
            continue;
          }
          const zt = Mr == null ? void 0 : Mr.trim();
          if (zt) return e.callbacks.onStatus("waiting_choice"), e.callbacks.onTextUpdate(zt), b.completion = {
            status: "waiting",
            condition: "waiting_for_design_direction"
          }, {
            content: zt,
            toolSteps: r,
            runContext: b
          };
        }
        if (_e && !EL(r)) {
          if (br < ke - 1) {
            Me.push({
              role: "user",
              content: iit
            }), q = !0, e.callbacks.onStatus("thinking", "等待选定 Skill 方向…");
            continue;
          }
          const zt = Mr == null ? void 0 : Mr.trim();
          if (zt) return e.callbacks.onStatus("waiting_choice"), e.callbacks.onTextUpdate(zt), b.completion = {
            status: "waiting",
            condition: "waiting_for_skill_direction"
          }, {
            content: zt,
            toolSteps: r,
            runContext: b
          };
        }
        const Rt = await sit({
          bridge: e.bridge,
          genPrefs: d,
          toolSteps: r,
          runContext: b,
          callbacks: e.callbacks,
          signal: e.signal,
          nodeIdContext: A,
          userText: e.userText,
          assistantText: Mr,
          onTaskSubmitted: Y,
          connectAllThisTurnRefs: xe(),
          referencePlan: V.referencePlan,
          historicalCharacterNodeIds: V.historicalCharacterNodeIds,
          allowSemanticAutoSubmit: !0,
          analysisComplete: !!((ki = V.referenceAnalysisComplete) != null && ki.call(V)),
          creativeDefinitionReady: !L.definitionRequired || L.definitionCommittedThisTurn,
          pixelFacts: V.pixelFacts
        });
        Rt.submitted > 0 && (H(Rt.nodeIds), await new Promise(zt => window.setTimeout(zt, 40)));
        const fn = x6e(b, e.bridge.getState()),
          Zt = sfe(r, e.bridge, Te()) || (Rt.submitted > 0 && ve() ? `已自动触发生成 ${Rt.submitted} 张。` : null);
        if (!ve() && br < ke - 1) {
          Me.push({
            role: "user",
            content: `任务尚未完成：当前只提交 ${U}/${ye.expected} 张。不要总结或停止；请按参考图职责创建缺少的独立成品，完成该节点所需的全部参考连线和具体提示词后再 run_generation。`
          }), q = !0, e.callbacks.onStatus("thinking", "已发送部分任务，继续补齐剩余生成…");
          continue;
        }
        const Ln = Zt || (fn.status === "verified" ? Mr || fn.message : null) || (U > 0 ? Mr || "画布操作已提交。" : `未能触发生成：${Qn.message}${b.errors.length ? `（${b.errors.slice(-2).map(zt => zt.message).join("；")}）` : ""}。请检查绘画节点提示词后手动点发送，或再说一次「继续生成」。`),
          tt = j1t(Ln) || Ln;
        return b.completion = {
          status: Rt.submitted > 0 || fn.status === "verified" ? "verified" : Qn.status,
          condition: tt,
          verifiedAt: Date.now()
        }, e.callbacks.onStatus("done"), e.callbacks.onTextUpdate(tt), {
          content: tt,
          toolSteps: r,
          runContext: b
        };
      }
      if (ue && !TL(r) && br < ke - 1) {
        Me.push({
          role: "user",
          content: ait
        }), q = !0, (wr = (Wn = e.callbacks).onMindTrace) == null || wr.call(Wn, {
          id: `nudge-redesign-post-${br}`,
          kind: "plan",
          label: "设计任务：尚未征询方向",
          command: "继续要求 ask_user_choice",
          status: "done"
        }), e.callbacks.onStatus("thinking", "等待选定设计方向…");
        continue;
      }
      if (_e && !EL(r)) {
        const Rt = await Ern({
          text: Mr,
          round: br,
          onUserChoice: e.callbacks.onUserChoice,
          signal: e.signal,
          toolSteps: r,
          callbacks: e.callbacks
        });
        if (Rt) {
          _e = !1, V.skillDirectionGateActive = !1, V.skillDirectionResolved = !0, V.skillDirectionChoice = {
            id: Rt.selectedId,
            label: Rt.label
          }, Me.push({
            role: "user",
            content: zTe(Rt.label, e.activeSkill)
          }), q = !0, de = !0, e.callbacks.onStatus("thinking", "已选定方向，开始执行…");
          continue;
        }
        if (br < ke - 1) {
          Me.push({
            role: "user",
            content: iit
          }), q = !0, (_n = (jn = e.callbacks).onMindTrace) == null || _n.call(jn, {
            id: `nudge-skill-post-${br}`,
            kind: "plan",
            label: "Skill 任务：尚未给出方向选项",
            command: "继续要求 ask_user_choice(skill_direction)",
            status: "done"
          }), e.callbacks.onStatus("thinking", "等待选定 Skill 方向…");
          continue;
        }
      }
      if (ue && !TL(r)) {
        const Rt = Mr == null ? void 0 : Mr.trim();
        if (Rt) return e.callbacks.onStatus("waiting_choice"), e.callbacks.onTextUpdate(Rt), b.completion = {
          status: "waiting",
          condition: "waiting_for_design_direction"
        }, {
          content: Rt,
          toolSteps: r,
          runContext: b
        };
      }
      if (_e && !EL(r)) {
        const Rt = Mr == null ? void 0 : Mr.trim();
        if (Rt) return e.callbacks.onStatus("waiting_choice"), e.callbacks.onTextUpdate(Rt), b.completion = {
          status: "waiting",
          condition: "waiting_for_skill_direction"
        }, {
          content: Rt,
          toolSteps: r,
          runContext: b
        };
      }
      const ct = Math.max(1, ye.expected);
      if (ye.expected > 1 && U < ct && br < ke - 1) {
        const Rt = I.singleOutputByDefault ? "按用户要求补齐剩余变体，并完成各自所需参考连线后发送。" : "按实际画面职责补齐独立成品；每个节点只连它真正需要的参考，可并列调用工具或使用有序 batch_actions。";
        Me.push({
          role: "user",
          content: `批量任务尚未完成：已提交 ${U}/${ct} 张。${Rt} 禁止提交第 ${ct + 1} 张。`
        }), (Vt = (ar = e.callbacks).onMindTrace) == null || Vt.call(ar, {
          id: `nudge-batch-${br}`,
          kind: "plan",
          label: `批量续跑 ${U}/${ct}`,
          command: "尚有未提交生成，自动提醒继续",
          status: "done"
        }), e.callbacks.onStatus("thinking", "继续提交剩余批量生成…");
        continue;
      }
      {
        const Rt = Nrn(e.bridge.getState(), ye, D);
        if (Rt && br < ke - 1) {
          Me.push({
            role: "user",
            content: Rt
          }), q = !0, (An = (vn = e.callbacks).onMindTrace) == null || An.call(vn, {
            id: `nudge-truth-${br}`,
            kind: "observe",
            label: "画布真相对账：生成数量不足",
            command: "强制续跑补齐目标数量",
            status: "done"
          }), e.callbacks.onStatus("thinking", "生成数量不足，继续补齐…");
          continue;
        }
      }
      const Dt = le >= 0 ? br - le : 0;
      if (f === "execute" && Dt >= 2) {
        const Rt = ye.hasGenerationGoal && !ve();
        if (Dt >= 4 || J && Dt >= 3) {
          const fn = Rt ? `生成任务执行受阻：目标 ${ye.expected} 张，当前已提交 ${U} 张；连续 ${Dt} 轮没有成功写入画布。请再次发送「继续」，系统会直接从创建节点和连线开始，不再重复分析图片。` : `已连续 ${Dt} 轮没有产生新的画布变化（最近一次变化在第 ${le + 1} 轮）。为避免空转，本轮先停在这里。你可以告诉我下一步要做什么；需要的话我可以先重新读取画布。`;
          return b.completion = {
            status: "incomplete",
            condition: fn
          }, e.callbacks.onStatus("done"), e.callbacks.onTextUpdate(fn), {
            content: fn,
            toolSteps: r,
            runContext: b
          };
        }
        if (br < ke - 1) {
          J = !0, Rt && (de = !0), Me.push({
            role: "user",
            content: Rt ? (ur = V.referenceAnalysisComplete) != null && ur.call(V) ? `目标生成尚未完成（${U}/${ye.expected}）。停止空转读取；调用 execute_canvas_action(gen_image)，用完整 prompt 和明确 references 提交剩余成品。无需为普通生成额外保存计划。` : `目标生成尚未完成（${U}/${ye.expected}）。先 analyze_canvas_images 看清参考图，再创建节点、连线，把看见的构图/媒介/角色特征写进 prompt 后 run_generation。` : rDa
          }), q = !0, (Dr = (zr = e.callbacks).onMindTrace) == null || Dr.call(zr, {
            id: `nudge-stall-${br}`,
            kind: "observe",
            label: `连续 ${Dt} 轮无画布变化`,
            command: "自动提醒重新核对画布并推进目标",
            status: "done"
          }), e.callbacks.onStatus("thinking", "连续多轮无变化，提醒模型核对画布…");
          continue;
        }
      }
      const bn = ue && !TL(r) || _e && !EL(r) ? null : sfe(r, e.bridge, Te());
      if (!ue && !_e) {
        const Rt = await sit({
          bridge: e.bridge,
          genPrefs: d,
          toolSteps: r,
          runContext: b,
          callbacks: e.callbacks,
          signal: e.signal,
          nodeIdContext: A,
          userText: e.userText,
          assistantText: Mr,
          onTaskSubmitted: Y,
          connectAllThisTurnRefs: xe(),
          referencePlan: V.referencePlan,
          historicalCharacterNodeIds: V.historicalCharacterNodeIds,
          allowSemanticAutoSubmit: !0,
          analysisComplete: !!((Wr = V.referenceAnalysisComplete) != null && Wr.call(V)),
          creativeDefinitionReady: !L.definitionRequired || L.definitionCommittedThisTurn,
          pixelFacts: V.pixelFacts
        });
        if (Rt.submitted > 0) {
          H(Rt.nodeIds), await new Promise(Un => window.setTimeout(Un, 40));
          const Rn = sfe(r, e.bridge, Te()) || `已自动触发生成 ${Rt.submitted} 张。`;
          if (ve()) return Ne(Rn);
          if (br < ke - 1) {
            Me.push({
              role: "user",
              content: `只完成了 ${U}/${ye.expected} 张。继续创建并提交缺少的独立成品；不得复用已提交节点冒充第二张。`
            }), q = !0, e.callbacks.onStatus("thinking", "继续补齐剩余生成…");
            continue;
          }
        }
        const fn = e.bridge.getState(),
          Zt = MZn(fn, A, V.referencePlan, V.historicalCharacterNodeIds),
          Ln = e.omitCanvasPromptContext || !fE(V.referencePlan),
          tt = fn.nodes.filter(Rn => Rn.type !== "gen-image" && Rn.type !== "gen-video" || Rn.isGenerating || Rn.hasOutput || !(Zt.has(Rn.id) || A.createdGenNodeIds.includes(Rn.id) || fn.connections.some(er => er.to === Rn.id && A.createdInputImageNodeIds.includes(er.from))) ? !1 : yde(fn, Rn.id) || Ln),
          zt = tt.some(Rn => String(Rn.promptPreview || "").trim().length < 8),
          an = tt.some(Rn => Ize(fn, Rn.id, String(A.promptByNodeId[Rn.id] || "").trim(), Ln));
        if (zt && br < ke - 1) {
          de = !0, q = !0, Me.push({
            role: "user",
            content: "绘画节点已连上参考，但还没有写入画面提示词。先 update_node 写出具体 prompt，再 run_generation。没有提示词禁止发送生成任务。"
          }), e.callbacks.onStatus("thinking", "等待写入提示词…");
          continue;
        }
        if (an && br < ke - 1) {
          de = !0, q = !0, Me.push({
            role: "user",
            content: "绘画节点已写好提示词并连上参考，立即对该节点调用 run_generation 发送生成任务，不要再创建参考图，也不要只写正文。"
          }), e.callbacks.onStatus("thinking", "节点已就绪，正在发送生成…");
          continue;
        }
      }
      if (bn && !e.bridge.getState().nodes.some(Rt => Ize(e.bridge.getState(), Rt.id, String(A.promptByNodeId[Rt.id] || "").trim(), e.omitCanvasPromptContext || !fE(V.referencePlan)))) return Ne(bn);
      e.callbacks.onStatus("thinking", "准备下一轮推理…");
    }
    {
      const br = ue && !TL(r) ? {
        submitted: 0,
        nodeIds: []
      } : _e && !EL(r) ? {
        submitted: 0,
        nodeIds: []
      } : await sit({
        bridge: e.bridge,
        genPrefs: d,
        toolSteps: r,
        runContext: b,
        callbacks: e.callbacks,
        signal: e.signal,
        nodeIdContext: A,
        userText: e.userText,
        assistantText: z,
        onTaskSubmitted: Y,
        connectAllThisTurnRefs: xe(),
        referencePlan: V.referencePlan,
        historicalCharacterNodeIds: V.historicalCharacterNodeIds,
        allowSemanticAutoSubmit: !0,
        analysisComplete: !!((gr = V.referenceAnalysisComplete) != null && gr.call(V)),
        creativeDefinitionReady: !L.definitionRequired || L.definitionCommittedThisTurn,
        pixelFacts: V.pixelFacts
      });
      br.submitted > 0 && (H(br.nodeIds), await new Promise(Jr => window.setTimeout(Jr, 40)));
    }
    if (ve()) return Ne(z);
    const tn = ue && !TL(r) || _e && !EL(r) ? null : sfe(r, e.bridge, Te()),
      Lr = x6e(b, e.bridge.getState());
    if (tn) return Ne(tn);
    if (U > 0) {
      const br = U < ye.expected ? `已提交 ${U}/${ye.expected} 张生成（已达最大工具轮次 ${ke}，剩余请再次发送「继续」）。` : `${Lr.message}（已达最大工具轮次 ${ke}）。`;
      return Ne(br);
    }
    throw b.completion = {
      status: Lr.status,
      condition: Lr.message
    }, new Error(`Agent 超过最大工具轮次（${ke}）`);
  } catch (Br) {
    if (Br instanceof DOMException && Br.name === "AbortError") throw C(), Br;
    const tn = Br instanceof Error ? Br.message : String(Br),
      Lr = r.filter(Jr => Jr.ok && Jr.tool === "execute_canvas_action"),
      br = Lr.length > 0 ? `画布操作中断：已成功执行 ${Lr.length} 个画布操作（${Lr.map(Jr => Jr.action || Jr.tool).slice(0, 5).join("、")}${Lr.length > 5 ? "…" : ""}）。原因：${tn}。请再次发送「继续」，我会基于当前画布状态接着完成，不会重复已成功的操作。` : `操作中断：${tn}。请稍后重试，或更换模型后再次发送。`;
    return b.completion = {
      status: "error",
      condition: tn
    }, e.callbacks.onStatus("done"), e.callbacks.onTextUpdate(br), {
      content: br,
      toolSteps: r,
      runContext: b
    };
  } finally {
    if ((ea = (jr = e.bridge).setRedesignDirectionGate) == null || ea.call(jr, !1), b.loopMode === "execute" && ML(r)) try {
      const Kr = e.bridge.getState(),
        ir = dLa(Kr, A, V.referencePlan, V.historicalCharacterNodeIds || [], A.createdGenNodeIds),
        Hr = new Set(A.createdGenNodeIds),
        ha = new Set(Kr.nodes.filter(Za => Hr.has(Za.id) && Array.isArray(Za.generationReferences)).map(Za => Za.id)),
        Ga = A.createdGenNodeIds.filter(Za => !ha.has(Za));
      if (Ga.length > 0) {
        const Za = iNa(Kr, {
          targetNodeIds: Ga,
          plannedLinksByTarget: ir
        });
        for (const va of Za.reconnect) await e.bridge.executeAction({
          action: "connect_nodes",
          payload: Bg("connect_nodes", {
            from: va.from,
            to: va.to,
            referenceRole: va.role || "primary",
            skipAutoRun: !0
          }, d)
        });
      }
    } catch {}
    if (L.current) {
      const Kr = new Set(D);
      for (const Hr of Prn(r)) Kr.add(Hr);
      const ir = MJn(L.current, e.bridge.getState(), Kr);
      ir !== L.current && (L.current = ir, L.notify(ir));
    }
    const Br = e.bridge.getState(),
      tn = [...new Set([...D, ...Prn(r)])],
      Lr = new Set(tn),
      br = new Map(Br.nodes.map(Kr => [Kr.id, Kr.type])),
      Jr = [...new Set(Br.connections.filter(Kr => Lr.has(Kr.to)).filter(Kr => ["input-image", "preview"].includes(br.get(Kr.from) || "")).map(Kr => Kr.from))];
    b.executionSummary = {
      referenceNodeIds: Jr,
      memoryIds: [...w],
      submittedNodeIds: tn,
      completedTaskIds: ((pa = L.current) == null ? void 0 : pa.tasks.filter(Kr => Kr.status === "completed").map(Kr => Kr.id)) ?? [],
      failedActionCount: b.toolCalls.filter(Kr => !Kr.ok).length,
      retryActionCount: b.toolCalls.filter(Kr => Kr.action === "retry_step").length
    };
  }
}

const zrn = [{
  type: "function",
  function: {
    name: "ask_user",
    description: "一次性问清 3～5 个会改变产出物形态的决策，然后停止等用户作答。发现已有高度相似 Skill 时，第一题必须是「更新已有 / 新建」。",
    parameters: {
      type: "object",
      properties: {
        questions: {
          type: "array",
          items: {
            type: "object",
            properties: {
              mode: {
                type: "string",
                enum: ["single", "multiple"]
              },
              question: {
                type: "string"
              },
              options: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    type: {
                      type: "string",
                      enum: ["text", "input"]
                    },
                    content: {
                      type: "string"
                    }
                  },
                  required: ["type", "content"]
                }
              }
            },
            required: ["question", "options"]
          }
        }
      },
      required: ["questions"]
    }
  }
}, {
  type: "function",
  function: {
    name: "write_skill",
    description: "产出可在本画布执行的 SKILL.md。用户作答或跳过后必须调用，不要再确认。",
    parameters: {
      type: "object",
      properties: {
        name: {
          type: "string"
        },
        description: {
          type: "string"
        },
        content: {
          type: "string"
        }
      },
      required: ["name", "description", "content"]
    }
  }
}];

function Urn(e) {
  try {
    const t = JSON.parse(String(e || "{}"));
    return t && typeof t == "object" ? t : {};
  } catch {
    return {};
  }
}

async function PLa(e) {
  var s, l;
  if (Mu(e.modelName)) {
    const {
      message: d
    } = await oQe({
      ...e,
      tools: TX(zrn)
    });
    return {
      content: d.content,
      toolCalls: d.tool_calls,
      codexUsage: d.codexUsage,
      reasoning: d.reasoning_content
    };
  }
  const t = sx({
      model: e.modelName,
      messages: e.messages,
      tools: TX(zrn),
      tool_choice: "auto",
      stream: !1,
      temperature: .4
    }, e.reasoningEffort, {
      baseUrl: e.baseUrl
    }),
    n = await E5(qw(e.baseUrl), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${e.apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(t),
      signal: e.signal
    }, e.nativeChat);
  if (!n.ok) throw new Error((await n.text()) || `API 错误: ${n.status}`);
  const r = await n.json(),
    a = ((l = (s = r == null ? void 0 : r.choices) == null ? void 0 : s[0]) == null ? void 0 : l.message) || {},
    i = typeof a.content == "string" ? a.content : "",
    o = Array.isArray(a.tool_calls) ? a.tool_calls : [];
  return {
    content: i,
    toolCalls: o
  };
}

async function RLa(e) {
  var a, i, o, s, l, d, u;
  const t = [{
    role: "system",
    content: qXn
  }];
  for (const h of e.history || []) h.content.trim() && t.push({
    role: h.role,
    content: h.content
  });
  const n = uPa(e.existingSkills || []),
    r = [e.transcript ? `【当前对话摘要】
${e.transcript}` : "", n, e.userText.trim()].filter(Boolean);
  t.push({
    role: "user",
    content: r.join(`

`)
  }), (a = e.onStatus) == null || a.call(e, n ? "正在对照已有 Skill…" : "正在整理对话…");
  for (let h = 0; h < 4; h += 1) {
    if ((i = e.signal) != null && i.aborted) throw new DOMException("Aborted", "AbortError");
    let p = "";
    const {
      content: m,
      toolCalls: f,
      codexUsage: y,
      reasoning: b
    } = await PLa({
      baseUrl: e.baseUrl,
      apiKey: e.apiKey,
      modelName: e.modelName,
      nativeChat: e.nativeChat,
      messages: t,
      signal: e.signal,
      reasoningEffort: e.reasoningEffort,
      webSearchEnabled: e.webSearchEnabled,
      onStreamDelta: ({
        content: w,
        reasoning: k
      }) => {
        var A, S;
        w && ((A = e.onTextDraft) == null || A.call(e, w)), k && (p += k, (S = e.onReasoning) == null || S.call(e, p));
      }
    });
    y && ((o = e.onCodexUsage) == null || o.call(e, y)), b && ((s = e.onReasoning) == null || s.call(e, b));
    const v = f.find(w => {
      var k;
      return ((k = w.function) == null ? void 0 : k.name) === "ask_user";
    });
    if (v) {
      const w = wPa(Urn(v.function.arguments).questions);
      if (w.length > 0) return {
        content: m.trim() || "请选择下面的方向，选完后我会写成可执行 Skill。",
        questions: w
      };
    }
    const _ = f.find(w => {
      var k;
      return ((k = w.function) == null ? void 0 : k.name) === "write_skill";
    });
    if (_) {
      (l = e.onStatus) == null || l.call(e, "正在写入 Skill…");
      const w = xPa(Urn(_.function.arguments));
      if (w) return {
        content: m.trim() || `已生成 Skill「${w.name}」`,
        artifact: w
      };
    }
    if (f.length === 0) {
      const w = _Pa(m);
      if (w) return {
        content: `已生成 Skill「${w.name}」`,
        artifact: w
      };
      if (m.trim()) return {
        content: m.trim()
      };
    }
    t.push({
      role: "assistant",
      content: m || null,
      tool_calls: f
    });
    for (const w of f) t.push({
      role: "tool",
      tool_call_id: w.id,
      content: ((d = w.function) == null ? void 0 : d.name) === "ask_user" ? "缺少有效题目，请重新 ask_user 或直接 write_skill" : "参数不完整，请再调用 write_skill 并带上 name/description/content"
    });
    (u = e.onStatus) == null || u.call(e, "继续生成 Skill…");
  }
  throw new Error("未能生成 Skill，请再试一次");
}

function NLa(e) {
  const t = e.nodes ?? [],
    n = MT,
    r = i => t.some(o => {
      const s = typeof o.width == "number" && o.width > 0 ? o.width : 220,
        l = typeof o.height == "number" && o.height > 0 ? o.height : 220;
      return i.x < o.x + s + n && i.x + e.nodeWidth + n > o.x && i.y < o.y + l + n && i.y + e.nodeHeight + n > o.y;
    });
  if (!r(e.preferred)) return e.preferred;
  const a = e.anchor;
  if (a) {
    const i = typeof a.height == "number" && a.height > 0 ? a.height : 220,
      o = {
        x: a.x,
        y: a.y + i + Pz
      };
    if (!r(o)) return o;
    for (let s = 2; s <= 8; s += 1) {
      const l = {
        x: a.x,
        y: a.y + i + Pz + (s - 1) * (e.nodeHeight + Pz)
      };
      if (!r(l)) return l;
    }
  }
  return e.preferred;
}

const jLa = MT,
  DLa = new Set(["input-image", "preview", "gen-image", "gen-video"]);

function RZn(e) {
  const t = Number(e.requestedWidth),
    n = Number(e.requestedHeight),
    r = Number.isFinite(t) && t > 0,
    a = Number.isFinite(n) && n > 0;
  if (!DLa.has(e.type) || !r && !a) return {
    width: r ? t : e.defaultWidth,
    height: a ? n : e.defaultHeight
  };
  const i = r ? t : e.defaultWidth,
    o = a ? n : e.defaultHeight,
    s = Math.max(.4, Math.min(2.5, i / Math.max(1, o))),
    l = e.type === "gen-video" ? 480 : 360,
    d = 160;
  let u, h;
  return s >= 1 ? (u = Math.min(l, Math.max(e.defaultWidth, i)), h = Math.max(d, u / s), h > l && (h = l)) : (h = Math.min(l, Math.max(e.defaultHeight, o)), u = Math.max(d, h * s), u > l && (u = l)), {
    width: Math.round(u),
    height: Math.round(h)
  };
}

function LLa() {
  return {
    initialized: !1,
    anchorX: 0,
    anchorY: 0,
    nextGenX: 0,
    rowStartX: 0,
    gensInRow: 0,
    columnCounts: {
      source: 0,
      gen: 0,
      default: 0
    }
  };
}

function OLa(e) {
  e.initialized = !1, e.anchorX = 0, e.anchorY = 0, e.nextGenX = 0, e.rowStartX = 0, e.gensInRow = 0, e.columnCounts.source = 0, e.columnCounts.gen = 0, e.columnCounts.default = 0;
}

function BLa(e) {
  return e === "input-image" || e === "preview" ? "source" : e === "gen-image" || e === "gen-video" ? "gen" : "default";
}

function FLa(e) {
  var i;
  const t = o => !!o && (o.type === "input-image" || o.type === "preview" || o.type === "gen-image" || o.type === "gen-video");
  let n = t(e.selectedNode) ? e.selectedNode : null;
  if (!n && ((i = e.nodes) != null && i.length)) for (let o = e.nodes.length - 1; o >= 0; o -= 1) {
    const s = e.nodes[o];
    if (t(s)) {
      n = s;
      break;
    }
  }
  if (!n) return e.viewportCenter;
  const r = typeof n.width == "number" && n.width > 0 ? n.width : 220,
    a = typeof n.height == "number" && n.height > 0 ? n.height : 220;
  return {
    x: n.x + r + MT,
    y: n.y + a / 2
  };
}

function zLa(e) {
  if (typeof e.explicitY == "number") return e.explicitY;
  const t = Math.max(1, e.columns),
    n = Math.max(1, Math.ceil(Math.max(0, e.itemCount) / t)),
    r = n * e.nodeHeight + Math.max(0, n - 1) * e.gapY,
    a = typeof e.sourceHeight == "number" && e.sourceHeight > 0 ? e.sourceHeight : e.nodeHeight;
  return e.sourceY + (a - r) / 2;
}

function NZn(e) {
  return e.type === "gen-image" || e.type === "gen-video";
}

function jZn(e, t, n = 250) {
  const r = Math.max(80, n * .6);
  return (e ?? []).filter(a => NZn(a) && Math.abs(a.y - t) < r).sort((a, i) => a.x - i.x);
}

function DZn(e) {
  const t = Number.isFinite(e.gapX) ? Math.max(0, Number(e.gapX)) : MT,
    n = Number.isFinite(e.gapY) ? Math.max(0, Number(e.gapY)) : Pz,
    r = Math.max(1, Math.floor(Number(e.rowCapacity) || YU)),
    a = Number(e.nodeWidth) > 0 ? Number(e.nodeWidth) : 250,
    i = Number(e.nodeHeight) > 0 ? Number(e.nodeHeight) : 250,
    o = (e.nodes ?? []).filter(NZn);
  if (o.length === 0) return e.preferred;
  const s = o.reduce((h, p) => Math.abs(p.y - e.preferred.y) < Math.abs(h - e.preferred.y) ? p.y : h, o[0].y),
    l = jZn(o, s, i);
  if (l.length >= r) {
    const h = l[0],
      p = typeof h.height == "number" && h.height > 0 ? h.height : i;
    return {
      x: h.x,
      y: h.y + p + n
    };
  }
  if (l.length === 0) {
    let h = e.preferred.x;
    for (const p of o) {
      const m = typeof p.width == "number" && p.width > 0 ? p.width : a;
      h = Math.max(h, p.x + m + t);
    }
    return {
      x: h,
      y: e.preferred.y
    };
  }
  const d = l[l.length - 1],
    u = typeof d.width == "number" && d.width > 0 ? d.width : a;
  return {
    x: d.x + u + t,
    y: d.y
  };
}

function LZn(e, t) {
  const n = typeof t.width == "number" && t.width > 0 ? t.width : 250;
  if (e.nextGenX = t.x + n + MT, e.anchorY = t.y, !e.initialized || e.gensInRow <= 0) {
    e.rowStartX = t.x, e.gensInRow = 1, e.anchorX = t.x, e.initialized = !0;
    return;
  }
  if (Math.abs(t.x - e.rowStartX) < 8) {
    e.gensInRow = 1, e.rowStartX = t.x;
    return;
  }
  e.gensInRow += 1;
}

function ULa(e, t) {
  var o;
  if (t.explicitX != null && t.explicitY != null) return {
    x: t.explicitX,
    y: t.explicitY
  };
  if (!e.initialized) {
    const s = t.anchorY - t.nodeHeight / 2,
      l = DZn({
        preferred: {
          x: t.anchorX,
          y: s
        },
        nodeWidth: t.nodeWidth,
        nodeHeight: t.nodeHeight,
        nodes: t.nodes
      }),
      d = jZn(t.nodes, l.y, t.nodeHeight);
    e.anchorX = t.anchorX, e.anchorY = l.y, e.nextGenX = l.x, e.rowStartX = ((o = d[0]) == null ? void 0 : o.x) ?? l.x, e.gensInRow = d.length >= YU ? 0 : d.length, e.initialized = !0;
  }
  const n = BLa(t.type),
    r = e.columnCounts[n];
  e.columnCounts[n] += 1;
  let a = t.explicitX,
    i = t.explicitY;
  return a == null && (n === "source" ? a = e.anchorX - t.nodeWidth - jLa : n === "gen" ? (e.gensInRow >= YU ? (a = e.rowStartX || e.nextGenX, i = (i ?? e.anchorY) + t.nodeHeight + Pz, e.anchorY = i, e.gensInRow = 0, e.rowStartX = a) : a = e.nextGenX, e.nextGenX = a + t.nodeWidth + MT, e.gensInRow += 1, e.gensInRow === 1 && (e.rowStartX = a)) : a = e.anchorX), i == null && (i = n === "gen" ? e.anchorY : e.anchorY + r * (t.nodeHeight + Pz)), {
    x: a,
    y: i
  };
}

const $rn = 2600,
  lit = 3,
  $La = 8,
  Grn = 5,
  Vrn = {
    style: "风格",
    character: "角色/主体",
    primary: "共同参考",
    supplementary: "补充材质"
  };

function GLa(e) {
  var a;
  if ((a = e.referenceBindings) != null && a.length) return e.referenceBindings.map(i => `node ${i.nodeId}(${Vrn[i.role] || i.role})`).join("+");
  const t = [],
    n = e.referenceRoles ?? [],
    r = e.referenceIndexes ?? [];
  for (let i = 0; i < r.length; i += 1) {
    const o = r[i],
      s = n[i] ?? "primary";
    t.push(`图${o}(${Vrn[s] || s})`);
  }
  return t.length > 0 ? t.join("+") : "";
}

function w1(e, t = 120) {
  const n = String(e || "").replace(/\s+/g, " ").trim();
  return n.length > t ? `${n.slice(0, t)}…` : n;
}

function VLa(e) {
  const t = {
    demands: [],
    recentDemand: null,
    choices: [],
    outputs: [],
    others: []
  };
  if (!e) return t;
  const n = r => {
    const a = /^-\s*([^：:]{1,20})[：:]/.exec(r.trim());
    return a ? a[1].trim() : null;
  };
  for (const r of e.split(`
`)) {
    const a = r.trim();
    if (!a || !a.startsWith("- ")) continue;
    const i = n(a),
      o = a.replace(/^-\s+/, "");
    if (!i) {
      t.others.push({
        key: null,
        text: o
      });
      continue;
    }
    if (i.includes("需求")) {
      const s = a.replace(/^-\s*[^：:]*[：:]\s*/, "");
      i === "最近需求" ? t.recentDemand = s || null : t.demands.push(s);
    } else i.startsWith("已确认") ? t.choices.push(...a.replace(/^-\s*[^：:]*[：:]\s*/, "").split("；")) : i === "最近成品" || i === "成品" ? t.outputs.push(...a.replace(/^-\s*[^：:]*[：:]\s*/, "").split(/；(?=node\s)/u)) : t.others.push({
      key: i,
      text: o
    });
  }
  return t;
}

function HLa(e) {
  const t = [],
    n = e[e.length - 1],
    r = e.slice(0, -1);
  if (r.length > lit) {
    const a = r.slice(0, r.length - lit),
      i = a.map(s => w1(s, 44)).join("｜");
    t.push(`- 早期（第1~${a.length}轮）：${i}`), r.slice(r.length - lit).forEach((s, l) => {
      const d = a.length + l + 1;
      t.push(`- 第${d}轮需求：${w1(s, 90)}`);
    });
  } else r.forEach((a, i) => {
    t.push(`- 第${i + 1}轮需求：${w1(a, 90)}`);
  });
  return n && t.push(`- 最近需求：${w1(n, 400)}`), t;
}

function WLa(e) {
  var V, O;
  const t = String(e.userText || "").trim(),
    n = e.toolSteps ?? [],
    r = e.attachmentNames ?? [],
    a = [],
    i = new Map();
  for (const L of n) {
    if (!L.ok || L.tool !== "execute_canvas_action" || L.action !== "create_node" || !String(L.summary || "").includes("插入图片")) continue;
    const U = String(L.targetNodeId || "").trim();
    U && !a.includes(U) && a.push(U);
  }
  const o = L => {
      const D = i.get(L) || a[L - 1];
      return D ? `node ${D}` : null;
    },
    s = [];
  for (const L of n) L.ok && ((V = L.generations) != null && V.length ? s.push(...L.generations) : L.generation && s.push(L.generation));
  const l = [],
    d = wJn(wze(e.previousLog), e.standingBrief) || (!e.previousLog && t ? {
      primaryTask: w1(t, 200),
      primaryRefs: "",
      secondaryRefs: ""
    } : null);
  d != null && d.primaryTask && l.push(`- 主要任务：${w1(d.primaryTask, 200)}`), d != null && d.primaryRefs && l.push(`- 主要参考：${w1(d.primaryRefs, 180)}`), d != null && d.secondaryRefs && d.secondaryRefs !== "无" && l.push(`- 次要参考：${w1(d.secondaryRefs, 180)}`), t && l.push(`- 最近需求：${w1(t, 400)}`);
  const u = new Map();
  for (const L of s) {
    if (L.referenceBindings) {
      for (const H of L.referenceBindings) {
        if (!H.refId || !/^R[1-9]\d*$/u.test(H.refId)) continue;
        const Y = Number(H.refId.slice(1));
        i.set(Y, H.nodeId), u.set(Y, H.role);
      }
      continue;
    }
    const D = L.referenceRoles ?? [],
      U = L.referenceIndexes ?? [];
    for (let H = 0; H < U.length; H += 1) {
      const Y = U[H],
        K = D[H] ?? "primary";
      (K === "character" || K === "style") && (!u.has(Y) || u.get(Y) === "primary") && u.set(Y, K);
    }
  }
  const h = [],
    p = [];
  for (const [L, D] of [...u.entries()].sort((U, H) => U[0] - H[0])) {
    const U = o(L);
    if (!U) continue;
    const H = r[L - 1] ? `（${w1(r[L - 1], 24)}）` : "",
      Y = `图${L} ${H} → ${U}`;
    D === "character" ? h.push(Y) : p.push(Y);
  }
  h.length && l.push(`- 主体/角色锚点：${h.join("；")}`), p.length && l.push(`- 风格/画面锚点：${p.join("；")}`);
  const m = s.slice(-Grn).map(L => {
      const D = GLa(L),
        U = L.design ? [...(L.design.texts || []), ...(L.design.mustKeep || [])].join("；") : "";
      return `node ${L.nodeId}（${w1(L.title, 40)}｜${w1(U || L.prompt, 90)}${L.revisionOf ? `｜修改自 node ${L.revisionOf.nodeId}` : ""}${D ? `｜${D}` : ""}）`;
    }),
    f = (e.confirmedChoices ?? []).map(L => L.label || L.selectedId).filter(Boolean).map(L => String(L)),
    y = VLa(e.previousLog),
    b = [];
  for (const L of [...y.demands, ...(y.recentDemand ? [y.recentDemand] : [])]) b[b.length - 1] !== L && b.push(L);
  t && b[b.length - 1] !== w1(t, 400) && b.push(w1(t, 400));
  const v = HLa(b),
    _ = [];
  for (const L of [...y.choices, ...f]) _.includes(L) || _.push(L);
  for (; _.length > $La;) _.shift();
  const w = [];
  for (const L of [..._].reverse()) {
    const D = w1(L, 450);
    w.join("；").length + D.length < 490 && w.unshift(D);
  }
  const k = w.length ? [`- 已确认：${w.join("；")}`] : [],
    A = [],
    S = new Set();
  for (const L of [...y.outputs, ...m].reverse()) {
    const D = (O = /^node\s+([^\s（]+)/u.exec(L)) == null ? void 0 : O[1];
    D && S.has(D) || (D && S.add(D), A.unshift(L));
  }
  for (; A.length > Grn;) A.shift();
  const C = A.length ? [`- 最近成品：${A.map(L => {
      var U;
      const D = ((U = /^node\s+[^\s（]+/u.exec(L)) == null ? void 0 : U[0]) || "";
      return D + w1(L.slice(D.length), Math.max(30, Math.floor(780 / A.length) - D.length));
    }).join("；")}`] : [],
    I = new Set(),
    E = [],
    M = L => {
      const D = /^-\s*([^：:]{1,20})[：:]/.exec(L.trim());
      return D ? D[1].trim() : null;
    };
  for (const L of l) {
    if (M(L) === "最近需求") continue;
    E.push(L);
    const D = M(L);
    D && I.add(D);
  }
  for (const L of y.others) if (!(L.key && I.has(L.key))) {
    if (E.length >= 12) break;
    E.push(L.text.startsWith("- ") ? L.text : `- ${L.text}`);
  }
  const P = ["# 会话上下文日志（AI 启动必读）"],
    R = (L, D) => {
      if (!D.length) return;
      const U = [`## ${L}`, ...D].join(`
`);
      P.join(`
`).length + U.length + 1 <= $rn && P.push(U);
    },
    j = E.filter(L => /主要任务|主要参考|次要参考/.test(L)),
    B = E.filter(L => !/主要任务|主要参考|次要参考/.test(L));
  R("主次需求", j), R("当前需求", v.slice(-1)), R("历代成品", C);
  const F = B.filter(L => /锚点/.test(L)),
    N = B.filter(L => !/锚点/.test(L));
  R("已确认选择", k.map(L => w1(L, 500)));
  for (const L of F) R("锚点", [L]);
  const G = [];
  for (const L of v.slice(0, -1).reverse()) P.join(`
`).length + G.join(`
`).length + L.length + 40 <= $rn && G.unshift(L);
  R("需求脉络（自会话开始累积）", G);
  for (const L of N) R("补充", [L]);
  return P.join(`
`);
}

const Oie = new Map(),
  iwt = new Set(),
  qLa = () => () => {};

function Hrn() {
  iwt.forEach(e => e());
}

function cit(e) {
  const t = String(e || "").trim();
  return t ? Oie.get(t) ?? null : null;
}

function Wrn(e) {
  const t = String(e || "").trim();
  if (!t) return null;
  for (const n of Oie.values()) if (n.message.id === t) return n;
  return null;
}

function PL(e, t) {
  if (e) {
    Oie.set(e.sessionId, e), Hrn();
    return;
  }
  const n = String(t || "").trim();
  n ? Oie.delete(n) : Oie.clear(), Hrn();
}

function KLa(e) {
  return iwt.add(e), () => {
    iwt.delete(e);
  };
}

function kXe(e) {
  const t = String(e || "").trim();
  return g.useSyncExternalStore(t ? KLa : qLa, () => t ? Oie.get(t) ?? null : null, () => null);
}

function OZn() {
  const e = hQe(HS()),
    t = GZ("job_queue");
  if (t.ready && t.value !== null) return cpe(Nre), frn(t.value, e);
  try {
    if (typeof localStorage < "u") {
      const r = localStorage.getItem(Nre);
      if (r) {
        const a = frn(JSON.parse(r), e);
        return t.ready && sI("job_queue", Nre, Q1t(a)), a;
      }
    }
  } catch {}
  const n = {
    jobs: [],
    maxConcurrent: e
  };
  return t.ready && sI("job_queue", Nre, Q1t(n)), n;
}

function QLa(e) {
  sI("job_queue", Nre, Q1t(e));
}

let id = OZn(),
  bde = null,
  a1e = null;

const vde = new Set(),
  wde = new Map(),
  hJ = new Map(),
  Lre = new Map(),
  owt = new Set();

function BZn() {
  for (const e of owt) e();
}

function YLa() {
  const e = bm();
  if (!e) return;
  const t = id.jobs.filter(o => o.runId === e.id),
    n = Date.now(),
    r = W7a(e, t, n),
    a = Cja(r.status, t, id.maxConcurrent),
    i = a === r.status ? r : {
      ...r,
      status: a,
      updatedAt: n
    };
  i !== e && (ex(i), R5({
    run: i
  }), gde(i, id.jobs));
}

function ILt() {
  for (const e of id.jobs) {
    if (e.status !== "running" || vde.has(e.id)) continue;
    const t = wde.get(e.id),
      n = e.action === "run_generation" || e.action === "execute_node" || e.action === "retry_step" ? bde : null,
      r = t ?? (n ? () => n(e) : null);
    if (!r) continue;
    vde.add(e.id);
    const a = e;
    Promise.resolve(r()).then(() => {
      const i = id.jobs.find(o => o.id === a.id);
      if ((i == null ? void 0 : i.status) === "running") {
        if (i.lastError === "cancel_requested") {
          XNe(a.id, "cancelled");
          return;
        }
        XNe(a.id, "completed");
      }
    }).catch(i => {
      XNe(a.id, "failed", i instanceof Error ? i.message : String(i));
    }).finally(() => {
      wde.delete(a.id), hJ.delete(a.id);
    });
  }
}

function fT(e) {
  id = {
    jobs: e.jobs.slice(-240),
    maxConcurrent: Math.max(1, Math.min(12, Math.floor(e.maxConcurrent) || 1))
  }, QLa(id), Z_e.clear(), eke.clear(), BZn(), YLa(), ILt();
}

function XNe(e, t, n) {
  fT(_ja(id, e, t, {
    error: n
  }));
}

function XLa(e) {
  bde = e, a1e = {}, ILt();
}

function FZn() {
  return bde !== null;
}

function zZn(e) {
  const t = {};
  return bde = e, a1e = t, ILt(), () => {
    a1e === t && (bde = null, a1e = null);
  };
}

function UZn(e) {
  fT(upe({
    jobs: id.jobs,
    maxConcurrent: e
  }).state);
}

function JLa() {
  return id;
}

let Z_e = new Map(),
  eke = new Map();

function $Zn(e) {
  return `${e || "*"}:${id.maxConcurrent}:${id.jobs.map(t => `${t.id}:${t.status}:${t.currentStep}`).join("|")}`;
}

function tke(e) {
  const t = $Zn(e),
    n = Z_e.get(t);
  if (n) return n;
  const r = e ? id.jobs.filter(i => i.runId === e) : id.jobs,
    a = bXe(r, id.maxConcurrent);
  return Z_e.set(t, a), a;
}

function xde(e) {
  const t = $Zn(e),
    n = eke.get(t);
  if (n) return n;
  const r = e ? id.jobs.filter(a => a.runId === e) : id.jobs;
  return eke.set(t, r), r;
}

function GZn(e) {
  const t = bm(),
    n = t ? pG(t, id.maxConcurrent) : id.maxConcurrent,
    r = bLt({
      jobs: id.jobs,
      maxConcurrent: n
    }, {
      ...e,
      projectId: e.projectId ?? (t == null ? void 0 : t.projectId) ?? null
    });
  return fT(r.state), gde(t ?? void 0, r.state.jobs), r.state.jobs.find(a => a.id === r.job.id) ?? r.job;
}

function VZn(e, t) {
  const n = bm();
  if (!n) return t();
  const r = String(e.actionKey || "").trim(),
    a = r ? Lre.get(r) : void 0;
  if (a) return a;
  const i = r ? id.jobs.find(l => l.runId === n.id && l.actionKey === r && (l.status === "queued" || l.status === "running" || l.status === "paused")) : void 0,
    o = (i == null ? void 0 : i.id) ?? XJn();
  let s;
  return s = new Promise((l, d) => {
    if (hJ.set(o, d), wde.set(o, async () => {
      try {
        const m = await t();
        return l(m), m;
      } catch (m) {
        throw d(m), m;
      }
    }), i) {
      vde.delete(o);
      const m = i.status === "paused" ? JJn(id, {
        jobId: o
      }) : upe(id).state;
      fT(m);
      return;
    }
    const u = n.tasks.find(m => m.nodeIds.includes(e.nodeId)),
      h = pG(n, id.maxConcurrent),
      p = bLt({
        jobs: id.jobs,
        maxConcurrent: h
      }, {
        id: o,
        runId: n.id,
        projectId: n.projectId,
        taskId: u == null ? void 0 : u.id,
        nodeId: e.nodeId,
        action: e.action,
        actionKey: r,
        requestId: e.requestId,
        label: e.label,
        priority: u == null ? void 0 : u.priority,
        dependsOn: u == null ? void 0 : u.dependsOn
      });
    fT(p.state), gde(n, p.state.jobs);
  }), r && (Lre.set(r, s), s.finally(() => {
    Lre.get(r) === s && Lre.delete(r);
  }).catch(() => {})), s;
}

function ZLa(e) {
  const t = bm();
  return id.jobs.some(n => n.nodeId === e && (!t || n.runId === t.id) && (n.status === "queued" || n.status === "running" || n.status === "paused"));
}

function HZn(e) {
  const t = bm();
  if (!t) return null;
  const n = t.tasks.find(r => r.nodeIds.includes(e.nodeId));
  return GZn({
    runId: t.id,
    projectId: t.projectId,
    nodeId: e.nodeId,
    taskId: n == null ? void 0 : n.id,
    requestId: e.requestId,
    priority: n == null ? void 0 : n.priority,
    dependsOn: n == null ? void 0 : n.dependsOn
  });
}

function CLt(e) {
  fT(kja(id, e));
}

function Cze(e) {
  fT(JJn(id, e));
}

function WZn(e) {
  var r;
  const t = new Map(id.jobs.map(a => [a.id, a.status])),
    n = Aja(id, e);
  fT(n);
  for (const a of n.jobs) a.status !== "cancelled" || t.get(a.id) === "cancelled" || ((r = hJ.get(a.id)) == null || r(new Error("production_job_cancelled")), hJ.delete(a.id), wde.delete(a.id), vde.delete(a.id));
}

function eOa(e) {
  var r;
  const t = a => !!(e.jobId && a.id === e.jobId || e.taskId && a.taskId === e.taskId || e.runId && !e.jobId && !e.taskId && a.runId === e.runId),
    n = id.jobs.filter(t);
  if (n.length === 0) return 0;
  for (const a of n) (r = hJ.get(a.id)) == null || r(new Error("production_task_deleted")), hJ.delete(a.id), wde.delete(a.id), vde.delete(a.id), a.actionKey && Lre.delete(a.actionKey);
  return fT({
    ...id,
    jobs: id.jobs.filter(a => !t(a))
  }), n.length;
}

function tOa(e) {
  const t = ZJn(id, e);
  return fT(t.state), t.job && qZn([t.job]), t.job;
}

function qZn(e) {
  if (e.length === 0) return;
  const t = bm();
  if (!t || !e.some(i => i.runId === t.id)) return;
  const n = new Set(e.map(i => i.taskId).filter(Boolean)),
    r = new Set(e.map(i => i.nodeId)),
    a = Ug({
      ...t,
      lastError: void 0,
      tasks: t.tasks.map(i => n.has(i.id) || i.nodeIds.some(o => r.has(o)) ? {
        ...i,
        status: "running"
      } : i),
      artifacts: t.artifacts.map(i => r.has(i.nodeId) && i.kind === "output" ? {
        ...i,
        status: "generating",
        error: void 0
      } : i)
    }, "waiting_generation", `正在重试 ${e.length} 个失败步骤`);
  ex(a), gde(a, id.jobs);
}

function KZn(e) {
  const t = Ija(id.jobs.filter(i => i.runId === e));
  if (t.length === 0) return [];
  let n = id;
  const r = [],
    a = Date.now();
  for (const [i, o] of t.entries()) {
    const s = ZJn(n, o.id, a + i);
    n = s.state, s.job && r.push(s.job);
  }
  return fT(n), qZn(r), r;
}

function nOa(e, t) {
  XNe(e, t ? "failed" : "completed", t);
}

function pCe(e) {
  return owt.add(e), () => owt.delete(e);
}

function QZn(e) {
  return g.useSyncExternalStore(pCe, () => tke(e), () => tke(e));
}

function rOa(e) {
  return g.useSyncExternalStore(pCe, () => xde(e), () => xde(e));
}

function aOa() {
  id = {
    jobs: [],
    maxConcurrent: 3
  }, bde = null, a1e = null, vde.clear(), wde.clear(), hJ.clear(), Lre.clear(), Z_e.clear(), eke.clear(), OJn("job_queue");
  try {
    typeof localStorage < "u" && localStorage.removeItem(Nre);
  } catch {}
}

function iOa() {
  GZ("job_queue").ready && (id = OZn(), Z_e.clear(), eke.clear(), BZn());
}

typeof window < "u" && window.addEventListener("productionRunPermissionChanged", () => {
  const e = bm();
  e && UZn(pG(e));
});

const YZn = Object.freeze(Object.defineProperty({
  __proto__: null,
  cancelProductionQueue: WZn,
  completeProductionQueueJob: nOa,
  deleteProductionQueueJobs: eOa,
  enqueueActiveProductionAction: VZn,
  enqueueActiveProductionJob: GZn,
  getProductionQueueJobs: xde,
  getProductionQueueOccupancy: tke,
  getProductionQueueState: JLa,
  hasProductionJobDispatcher: FZn,
  hydrateProductionQueueFromPreloadedState: iOa,
  isNodeInActiveProductionQueue: ZLa,
  pauseProductionQueue: CLt,
  registerProductionJobDispatcher: zZn,
  resetProductionQueueForTests: aOa,
  resumeProductionQueue: Cze,
  retryFailedProductionQueueJobs: KZn,
  retryProductionQueueJob: tOa,
  setProductionJobDispatcher: XLa,
  setProductionQueueMaxConcurrent: UZn,
  subscribeProductionQueue: pCe,
  tryEnqueueActiveProductionGeneration: HZn,
  useProductionQueueJobs: rOa,
  useProductionQueueOccupancy: QZn
}, Symbol.toStringTag, {
  value: "Module"
}));

let nke = "";

const swt = new Set();

function oOa() {
  swt.forEach(e => e());
}

function lwt() {
  return nke;
}

function wW(e) {
  const t = typeof e == "string" ? e : "";
  t !== nke && (nke = t, oOa());
}

function XZn(e) {
  return swt.add(e), () => {
    swt.delete(e);
  };
}

function JZn() {
  return g.useSyncExternalStore(XZn, lwt, lwt);
}

let Bie = [];

const cwt = new Set();

function sOa() {
  cwt.forEach(e => e());
}

function _de() {
  return Bie;
}

function q5(e) {
  const t = typeof e == "function" ? e(Bie) : e;
  t !== Bie && (Bie = t, sOa());
}

function ZZn(e) {
  return cwt.add(e), () => {
    cwt.delete(e);
  };
}

function eer() {
  return g.useSyncExternalStore(ZZn, _de, _de);
}

let Fie = null,
  JNe = "legacy";

const dwt = new Map();

function lOa() {
  return !!(nke.trim() || Bie.length || Fie) || [...dwt].some(([e, t]) => e !== JNe && !!(t.input.trim() || t.files.length || t.quote));
}

function ter(e) {
  if (e === JNe) return;
  dwt.set(JNe, {
    input: nke,
    files: Bie,
    quote: Fie
  }), JNe = e;
  const t = dwt.get(e);
  wW((t == null ? void 0 : t.input) || ""), q5((t == null ? void 0 : t.files) || []), VO((t == null ? void 0 : t.quote) || null);
}

const uwt = new Set();

function cOa() {
  uwt.forEach(e => e());
}

function Eze() {
  return Fie;
}

function VO(e) {
  const t = typeof e == "function" ? e(Fie) : e;
  t !== Fie && (Fie = t, cOa());
}

function ner(e) {
  return uwt.add(e), () => {
    uwt.delete(e);
  };
}

function rer() {
  return g.useSyncExternalStore(ner, Eze, Eze);
}

const dOa = Object.freeze(Object.defineProperty({
  __proto__: null,
  activateChatComposerScope: ter,
  getChatComposerFiles: _de,
  getChatComposerInput: lwt,
  getChatComposerQuote: Eze,
  hasChatComposerDrafts: lOa,
  setChatComposerFiles: q5,
  setChatComposerInput: wW,
  setChatComposerQuote: VO,
  subscribeChatComposerFiles: ZZn,
  subscribeChatComposerInput: XZn,
  subscribeChatComposerQuote: ner,
  useChatComposerFiles: eer,
  useChatComposerInput: JZn,
  useChatComposerQuote: rer
}, Symbol.toStringTag, {
  value: "Module"
}));

function qrn(e, t, n) {
  return n === "done" ? e : e ? e.resolvedChoiceId ? e : t != null && t.resolvedChoiceId ? {
    ...e,
    resolvedChoiceId: t.resolvedChoiceId,
    resolvedLabel: t.resolvedLabel
  } : e : t && !t.resolvedChoiceId ? t : e;
}

const hwt = "gemini-3.1-pro",
  uOa = {
    "gemini-3-pro": hwt,
    "gpt-5.4-pro": "gpt-5.4",
    "gpt-5-4-pro": "gpt-5.4",
    "gpt-5.5-pro": "gpt-5.5",
    "claude-opus-4-8-thinking": "claude-opus-4-8",
    "claude-opus-5-5-thinking": "claude-opus-5-5",
    "claude-sonnet-5-5-thinking": "claude-sonnet-5-5"
  },
  L8 = e => If(uOa[e] || e).id;

function dit(e, t) {
  try {
    const r = localStorage.getItem(e);
    if (r != null && r.trim()) return L8(r.trim());
  } catch {}
  const n = fS(t);
  return n != null && n.trim() ? L8(n.trim()) : "";
}

function Krn(e, t, n) {
  const r = String(n || "").trim();
  if (r) {
    try {
      localStorage.setItem(e, r);
    } catch {}
    BPt(t, r);
  }
}

const hOa = /\.(png|jpe?g|webp|gif|bmp|svg)$/i,
  pOa = /\.(mp4|webm|mov|m4v)$/i;

function uit(e) {
  return OP(e) ? !1 : !!(e.isImage || String(e.type || "").startsWith("image/") || hOa.test(String(e.name || "")));
}

function hit(e) {
  return OP(e) ? !1 : !!(e.isVideo || String(e.type || "").startsWith("video/") || pOa.test(String(e.name || "")));
}

const _6e = "user-cancel",
  Qrn = "qiaodoumayi_chat_sessions",
  aer = "qiaodoumayi_chat_sessions_index",
  k6e = "qiaodoumayi_chat_model",
  Yrn = "qiaodoumayi_local_skill_chat_model",
  pit = "chat-panel",
  Xrn = "local-skill-chat",
  Jrn = "qiaodoumayi_local_skill_platform_group",
  ier = "qiaodoumayi_chat_panel_mode",
  pwt = 120,
  mOa = 80,
  Zrn = 200,
  Tze = 2e3,
  fOa = 50;

function A6e(e, t) {
  const n = String(t || "").trim();
  if (!n) return;
  const r = e.filter(a => (a.mode === "local-skill" || a.localSkillRootPath) && e_(a.localSkillRootPath, n)).map(a => ({
    id: a.id,
    title: a.title,
    updatedAt: Xve(a) || Date.now()
  }));
  _Qe(n, r);
}

function cfe(e, t = "已停止。") {
  var n, r, a;
  return {
    ...e,
    content: (n = e.content) != null && n.trim() ? e.content : t,
    agentStatus: "done",
    agentPendingChoice: void 0,
    agentPendingStep: void 0,
    agentStatusDetail: void 0,
    agentEndedAt: e.agentEndedAt || Date.now(),
    agentMindCollapsed: !0,
    agentMindTrace: (r = e.agentMindTrace) == null ? void 0 : r.map(i => i.status === "running" ? {
      ...i,
      status: "error",
      ok: !1,
      endedAt: i.endedAt || Date.now()
    } : i),
    toolSteps: (a = e.toolSteps) == null ? void 0 : a.map(i => i.status === "running" ? {
      ...i,
      status: "error",
      ok: !1
    } : i)
  };
}

function gOa(e) {
  return mwt(e).map(t => ({
    ...t,
    messages: t.messages.map(n => {
      var o, s, l, d;
      const r = t.mode === "local-skill";
      if (!(n.agentMindTrace && n.agentMindTrace.length > 0 || typeof n.agentReasoning == "string" && n.agentReasoning.length > Tze || r && (((o = n.toolSteps) == null ? void 0 : o.length) || 0) > 40) && !r) return n;
      const i = r ? (s = n.toolSteps) == null ? void 0 : s.slice(-40).map(u => ({
        id: u.id,
        tool: u.tool,
        summary: u.summary,
        ok: u.ok,
        status: u.status,
        command: u.command,
        meta: u.meta
      })) : n.toolSteps;
      return {
        ...n,
        agentReasoning: typeof n.agentReasoning == "string" ? n.agentReasoning.slice(0, Tze) : n.agentReasoning,
        agentMindTrace: (l = n.agentMindTrace) == null ? void 0 : l.slice(0, pwt).map(u => u.preview && u.preview.length > Zrn ? {
          ...u,
          preview: `${u.preview.slice(0, Zrn)}…`
        } : u),
        toolSteps: i,
        localSkillEdits: (d = n.localSkillEdits) == null ? void 0 : d.map(u => ({
          undoId: u.undoId,
          transactionId: u.transactionId,
          atomic: u.atomic,
          path: u.path,
          relPath: u.relPath,
          added: u.added,
          removed: u.removed,
          created: u.created,
          undone: u.undone
        }))
      };
    })
  }));
}

function yOa(e) {
  return e.agentEndedAt ? e : {
    ...e,
    agentEndedAt: Date.now()
  };
}

const KF = {
    id: "default",
    title: "新对话",
    messages: [],
    mode: "normal"
  },
  bOa = "【移动对象】已写入图片节点参数";

function oer(e) {
  return !e || e.role !== "assistant" ? !1 : (typeof e.content == "string" ? e.content : "").startsWith(bOa);
}

function mwt(e) {
  let t = !1;
  const n = e.map(r => {
    const a = (r.messages || []).filter(i => !oer(i));
    return a.length !== (r.messages || []).length ? (t = !0, {
      ...r,
      messages: a
    }) : r;
  });
  return t ? n : e;
}

function rke(e) {
  return e === "skill" || e === "agent" || e === "local-skill" ? e : "normal";
}

function fwt(e) {
  return e ? e.mode === "local-skill" || e.localSkillRootPath ? !0 : (e.messages || []).some(t => Array.isArray(t.localSkillEdits) && t.localSkillEdits.length > 0) : !1;
}

function RL(e) {
  return fwt(e) ? "local-skill" : rke(e.mode);
}

function vOa() {
  try {
    const e = localStorage.getItem(ier);
    return rke(e);
  } catch {}
  return "normal";
}

function dfe(e, t) {
  return {
    ...P$(),
    id: Fi(),
    title: O0e(e),
    projectId: t,
    messages: [],
    mode: e
  };
}

const gwt = "❌ 错误:";

function ser(e) {
  return e.role === "assistant" && e.content.startsWith(gwt);
}

const ELt = e => (e.length ? e : [KF]).map(t => ({
    ...t,
    id: t.id,
    title: t.title || "新对话",
    messages: [],
    mode: rke(t.mode),
    localSkillRootPath: t.localSkillRootPath
  })),
  ean = () => {
    try {
      const e = localStorage.getItem(aer);
      if (!e) return [KF];
      const t = JSON.parse(e);
      return Array.isArray(t) ? ELt(t) : [KF];
    } catch {
      return [KF];
    }
  },
  S6e = e => {
    try {
      localStorage.setItem(aer, JSON.stringify(ELt(e)));
    } catch {}
  },
  wOa = ({
    apiConfigs: e,
    globalApiKey: t,
    canvasChatAgentBridgeRef: n,
    chatAgentImageAssetsRef: r,
    chatAgentImageAssetCursorRef: a,
    chatAgentLayoutRef: i,
    chatAgentForceNewGenImageRef: o,
    chatAgentSessionCreatedGenNodeIdsRef: s,
    canvasProjectIdRef: l
  }) => {
    const {
        activeCanvasId: d
      } = M3(),
      u = bt => (bt.projectId || null) === d && Nx(bt),
      h = g.useRef(d);
    h.current = d;
    const [p, m] = g.useState(() => ean()),
      [f, y] = g.useState(!1),
      b = g.useRef(!1),
      v = g.useRef(null),
      _ = g.useRef(p),
      w = g.useRef([]),
      k = g.useRef(null),
      A = g.useRef(new Set()),
      S = g.useRef(new Map()),
      C = g.useCallback(async bt => {
        S.current = Mnn(bt, S.current);
        try {
          const Bt = await S1t();
          Bt != null && Bt.length && (S.current = JPa(S.current, Bt));
        } catch {}
      }, []),
      [I, E] = g.useState("default"),
      M = g.useRef(I);
    M.current = I;
    const [T, P] = g.useState(() => {
        try {
          const bt = localStorage.getItem("qiaodoumayi_chat_width");
          if (bt != null) {
            const Bt = parseInt(bt, 10);
            if (!Number.isNaN(Bt) && Bt >= 300 && Bt <= 1200) return Math.max(Bt, EF);
          }
        } catch {}
        return AEt;
      }),
      [R, j] = g.useState("medium"),
      [B, F] = g.useState(() => dit(k6e, pit) || hwt),
      [N, G] = g.useState(ko),
      [z, V] = g.useState(() => dit(Yrn, Xrn) || dit(k6e, pit) || hwt),
      [O, L] = g.useState(() => {
        try {
          const bt = localStorage.getItem(Jrn);
          if (bt != null && bt.trim()) return bt.trim();
        } catch {}
        return ko;
      }),
      D = g.useCallback((bt, Bt) => {
        const wn = _.current.find(dt => dt.id === M.current);
        if (!wn || RL(wn) === "local-skill" !== Bt || !EXn(wn)) return !1;
        const Pt = L8(tLt(wn));
        return !!(Pt && eLt(Pt) && bt !== Pt);
      }, []),
      U = g.useCallback(bt => {
        const Bt = L8(bt);
        D(Bt, !1) || F(Bt);
      }, [D]),
      H = g.useCallback(bt => {
        G(bt);
      }, []),
      Y = g.useCallback(bt => {
        const Bt = L8(bt);
        D(Bt, !0) || V(Bt);
      }, [D]),
      K = g.useCallback(bt => {
        L(bt);
      }, []),
      [W, Q] = g.useState(() => {
        try {
          return localStorage.getItem("qiaodoumayi_chat_web_search_enabled") === "true";
        } catch {
          return !1;
        }
      }),
      [q, ne] = g.useState(() => jhe()),
      [de, le] = g.useState(() => {
        try {
          const bt = localStorage.getItem(k6e),
            Bt = If((bt == null ? void 0 : bt.trim()) || "").effort;
          if (Bt) return Bt;
        } catch {}
        return hRt();
      }),
      J = g.useCallback(bt => {
        le(bt);
      }, []),
      [pe, ce] = g.useState(() => {
        try {
          return localStorage.getItem("qiaodoumayi_chat_use_aliyun_oss") === "true";
        } catch {
          return !1;
        }
      }),
      [we, X] = g.useState(() => {
        try {
          return localStorage.getItem("qiaodoumayi_chat_oss_image_base64") === "true";
        } catch {
          return !1;
        }
      }),
      Z = g.useRef(new Set()),
      re = g.useRef(new Map()),
      fe = g.useRef(new Map()),
      [ye, ie] = g.useState([]),
      ae = ye.includes(I),
      be = ye.length > 0;
    g.useEffect(() => {
      for (const bt of re.current.values()) bt.abort(_6e);
    }, [d]), g.useEffect(() => {
      ter(`canvas:${d || "unassigned"}:${I}`);
    }, [d, I]);
    const Ee = g.useRef(!1),
      xe = g.useRef(!1),
      he = g.useRef(!1),
      [ue, ge] = g.useState(!1),
      _e = g.useRef(null),
      [ke, ve] = g.useState(50),
      [Te, Ne] = g.useState(() => vOa()),
      me = g.useRef(Te);
    me.current = Te;
    const Ae = p.find(bt => bt.id === I),
      Fe = !!(Ae && RL(Ae) === "local-skill"),
      Me = Fe ? B : zat(B, Ae),
      Re = Fe ? zat(z, Ae) : z,
      $e = e.find(bt => bt.id === (Te === "local-skill" ? Re : Me)),
      rt = cft($e, q),
      nt = g.useCallback(bt => {
        const Bt = szn(bt);
        $e != null && $e.isCustom && $e.type === "Chat" ? Qa.updateConfig($e.id, {
          chatProtocol: Bt
        }) : ne(Bt);
      }, [$e]),
      [ze, Le] = g.useState(() => PDn()),
      [Ke, Xe] = g.useState(() => RD()),
      De = g.useRef(Ke);
    De.current = Ke;
    const Ye = g.useCallback(() => {
      ie(Array.from(Z.current)), yRa(Z.current.size > 0);
    }, []);
    g.useEffect(() => {
      RDn(ze);
    }, [ze]), g.useEffect(() => {
      try {
        localStorage.setItem(ier, Te);
      } catch {}
    }, [Te]);
    const Ce = g.useRef(() => {}),
      He = g.useCallback(bt => {
        Le(Bt => {
          const wn = typeof bt == "function" ? bt(Bt) : bt;
          return wn.activeSkillId !== Bt.activeSkillId && Ce.current(String(wn.activeSkillId || "").trim() || void 0), wn;
        });
      }, []),
      Ve = g.useMemo(() => {
        if (Te !== "agent") return [];
        try {
          return vp().slice(0, 12).map(bt => ({
            id: bt.id,
            name: bt.name,
            summary: bt.content.replace(/\s+/g, " ").slice(0, 80)
          }));
        } catch {
          return [];
        }
      }, [Te, ze.activeSkillId, p]),
      it = g.useMemo(() => Ve.map(bt => `${bt.name}：${bt.summary}`), [Ve]),
      It = g.useMemo(() => {
        const bt = p.find(Bt => Bt.id === I);
        return String((bt == null ? void 0 : bt.agentActiveSkillId) || "").trim();
      }, [p, I]),
      Ft = g.useMemo(() => {
        if (Te !== "agent" || !It) return null;
        try {
          return Xhe(It);
        } catch {
          return null;
        }
      }, [It, Te]),
      We = g.useCallback(bt => {
        try {
          const Bt = mwt((Array.isArray(bt) ? bt : []).map(wn => {
            var dt;
            const at = Array.isArray(wn == null ? void 0 : wn.messages) ? wn.messages : [],
              Pt = (dt = [...at].reverse().find(xt => xt == null ? void 0 : xt.agentProductionRun)) == null ? void 0 : dt.agentProductionRun;
            return {
              ...wn,
              messages: at,
              mode: rke(wn == null ? void 0 : wn.mode),
              projectId: (wn == null ? void 0 : wn.projectId) == null || String(wn.projectId).trim() === "" ? null : String(wn.projectId),
              projectMessageStartIndex: Number.isFinite(Number(wn == null ? void 0 : wn.projectMessageStartIndex)) && Number(wn.projectMessageStartIndex) >= 0 ? Math.floor(Number(wn.projectMessageStartIndex)) : void 0,
              agentProductionRun: mde((wn == null ? void 0 : wn.agentProductionRun) ?? Pt) ?? void 0
            };
          }));
          return hia(Bt.length ? Bt : [KF]);
        } catch {
          return [KF];
        }
      }, []);
    g.useEffect(() => {
      _.current = p;
    }, [p]);
    const Ze = g.useCallback(bt => {
        b.current = bt, y(bt);
      }, []),
      Ge = g.useCallback(bt => {
        Ze(!0), m(Bt => {
          const wn = M.current,
            at = typeof bt == "function" ? bt(Bt) : bt,
            Pt = IL(at, wn);
          return w.current = Pt, S.current = Mnn(at, S.current), k.current = wn, Pt;
        });
      }, [Ze]);
    Ce.current = bt => {
      const Bt = M.current;
      Ge(wn => wn.map(at => at.id === Bt ? {
        ...at,
        agentActiveSkillId: bt || void 0
      } : at));
    }, g.useEffect(() => {
      const bt = Bt => {
        const wn = Bt.detail,
          at = String((wn == null ? void 0 : wn.runId) || "").trim();
        if (!at) return;
        const Pt = Math.max(0, Number(wn == null ? void 0 : wn.changedCount) || 0),
          xt = (w.current.length > 0 ? w.current : _.current).flatMap(yn => [yn.agentProductionRun, ...yn.messages.map(gn => gn.agentProductionRun)]).find(yn => (yn == null ? void 0 : yn.id) === at);
        xt && ex(Xat(xt, Pt)), Ge(yn => yn.map(gn => {
          var Gn;
          const mt = ((Gn = gn.agentProductionRun) == null ? void 0 : Gn.id) === at ? Xat(gn.agentProductionRun, Pt) : gn.agentProductionRun,
            Xt = gn.messages.map(rr => {
              var Dn;
              if (((Dn = rr.agentProductionRun) == null ? void 0 : Dn.id) !== at) return rr;
              const qn = Xat(rr.agentProductionRun, Pt);
              return {
                ...rr,
                agentProductionRun: qn
              };
            });
          return {
            ...gn,
            agentProductionRun: mt,
            messages: Xt
          };
        }));
      };
      return window.addEventListener("productionRunUndoApplied", bt), () => window.removeEventListener("productionRunUndoApplied", bt);
    }, [Ge]);
    const Oe = g.useCallback((bt, Bt, wn) => {
        var xt;
        const at = yn => {
          if (yn.id !== bt || !yn.agentPendingChoice) return yn;
          const gn = tda({
            question: yn.agentPendingChoice.question,
            questions: yn.agentPendingChoice.questions,
            selectedId: Bt,
            selectedLabel: wn
          });
          return {
            ...yn,
            agentPendingChoice: {
              ...yn.agentPendingChoice,
              resolvedChoiceId: Bt,
              resolvedLabel: wn
            },
            agentAskAnswerText: gn || yn.agentAskAnswerText,
            agentStatus: "thinking"
          };
        };
        Ge(yn => yn.map(gn => {
          var Gn;
          const mt = gn.messages.map(at),
            Xt = ((Gn = mt.find(rr => rr.id === bt)) == null ? void 0 : Gn.agentAskAnswerText) || "";
          return {
            ...gn,
            messages: ada(mt, bt, Xt, rr => ({
              id: Fi(),
              role: "user",
              content: rr,
              timestamp: Date.now()
            }))
          };
        }));
        const Pt = Wrn(bt);
        Pt && Pt.message.agentPendingChoice && PL({
          ...Pt,
          message: at(Pt.message)
        });
        const dt = (Pt == null ? void 0 : Pt.sessionId) || ((xt = _.current.find(yn => yn.messages.some(gn => gn.id === bt))) == null ? void 0 : xt.id);
        if (dt) {
          const yn = fe.current.get(dt);
          fe.current.delete(dt), yn == null || yn(Bt);
        }
      }, [Ge]),
      st = g.useCallback((bt, Bt) => {
        Ge(at => at.map(Pt => ({
          ...Pt,
          messages: Pt.messages.map(dt => dt.id === bt ? {
            ...dt,
            ...Bt
          } : dt)
        })));
        const wn = Wrn(bt);
        wn && PL({
          ...wn,
          message: {
            ...wn.message,
            ...Bt
          }
        });
      }, [Ge]),
      vt = g.useCallback(async () => {
        if (Ur.isAvailable()) try {
          const bt = await Ur.loadChatSessions();
          if (bt) return We(bt);
        } catch (bt) {
          console.warn("[Chat] loadChatSessions from cache failed:", bt);
        }
        try {
          const bt = localStorage.getItem(Qrn),
            Bt = bt ? JSON.parse(bt) : [];
          return We(Bt);
        } catch {
          return [KF];
        }
      }, [We]),
      Ht = g.useCallback(async () => {
        try {
          await xnn(() => vt());
          const bt = await JMa(M.current, {
            projectId: h.current
          });
          if (bt && bt.length > 0) return We(bt);
        } catch (bt) {
          console.warn("[Chat] loadChatSessions from sqlite failed:", bt);
        }
        return vt();
      }, [vt, We]),
      nn = g.useCallback(async () => {
        try {
          await xnn(() => vt());
          const bt = await S1t();
          if (bt && bt.length > 0) return bt.map(Bt => {
            const wn = rke(Bt == null ? void 0 : Bt.mode);
            return {
              ...(Bt.metadata || {}),
              id: String((Bt == null ? void 0 : Bt.id) || "").trim(),
              title: String((Bt == null ? void 0 : Bt.title) || "").trim() || "新对话",
              mode: wn,
              messages: []
            };
          }).filter(Bt => Bt.id);
        } catch (bt) {
          console.warn("[Chat] flush index load failed, fallback full JSON:", bt);
        }
        return vt();
      }, [vt]),
      pt = g.useCallback(async (bt, Bt, wn) => {
        const at = bt && bt.length ? bt : w.current.length ? w.current : _.current;
        let Pt = [KF];
        try {
          Pt = await nn();
        } catch {}
        const dt = Bt ?? M.current,
          xt = (wn == null ? void 0 : wn.activeHydrated) ?? dt === k.current,
          yn = YPa(Pt, at, dt, A.current, {
            activeHydrated: xt
          }),
          gn = gOa(yn);
        S6e(gn);
        try {
          if (await tPa(gn, {
            activeId: dt,
            activeHydrated: xt,
            replaceAllMessageBodies: wn == null ? void 0 : wn.replaceAllMessageBodies
          })) return;
        } catch (mt) {
          console.warn("[Chat] flush chatSqlite failed, fallback JSON:", mt);
        }
        try {
          const mt = gn.map(Xt => Xt.mode !== "local-skill" ? Xt : {
            ...Xt,
            messages: Xt.messages.map(Gn => ({
              ...Gn,
              agentMindTrace: void 0,
              toolSteps: void 0,
              agentReasoning: void 0,
              localSkillEdits: Gn.localSkillEdits
            }))
          });
          localStorage.setItem(Qrn, JSON.stringify(mt));
        } catch {}
        if (Ur.isAvailable()) {
          try {
            await Ur.saveChatSessions(gn);
          } catch (mt) {
            console.warn("[Chat] flush saveChatSessions failed:", mt);
          }
          try {
            const mt = [...gn].reverse().find(Xt => Xt.mode === "agent" && !!(Xt.agentCreativeProject || Xt.agentContextLog));
            if (mt) {
              const Xt = cXe({
                project: mt.agentCreativeProject,
                contextLog: mt.agentContextLog
              }).filter(Gn => Gn.ready);
              Xt.length > 0 && (await Ur.saveProjectMemoryMarkdownFiles(Xt.map(Gn => ({
                name: Gn.name,
                markdown: Gn.markdown
              }))));
            }
          } catch (mt) {
            console.warn("[Chat] flush project memory files failed:", mt);
          }
        }
      }, [nn]),
      lt = g.useCallback(async () => {
        if (b.current && w.current.length && k.current === M.current) return w.current;
        if (v.current) return v.current;
        const bt = (async () => {
          SNe(15e3);
          const Bt = await Ht(),
            wn = m6e(Tnn(Bt, A.current)),
            at = M.current;
          await C(wn);
          const Pt = IL(wn, at);
          return w.current = Pt, k.current = wn.some(dt => dt.id === at && (dt.projectId || null) === h.current) ? at : null, m(Pt), S6e(wn), Ze(!0), Pt;
        })().finally(() => {
          v.current = null;
        });
        return v.current = bt, bt;
      }, [Ht, Ze, C]);
    g.useEffect(() => {
      if (!f) return;
      const bt = w.current.length > 0 ? w.current : p;
      if (!bt.some(dt => (dt.messages || []).some(xt => oer(xt)))) return;
      const wn = mwt(bt),
        at = M.current,
        Pt = IL(wn, at);
      w.current = Pt, k.current = at, m(Pt), pt(wn, at, {
        activeHydrated: !0
      });
    }, [p, f, pt]), g.useEffect(() => {
      if (!f) return;
      const bt = w.current.length > 0 ? w.current : p,
        Bt = m6e(bt);
      if (Bt === bt) return;
      const wn = M.current,
        at = IL(Bt, wn);
      w.current = at, k.current = wn, m(at), pt(Bt, wn, {
        activeHydrated: !0
      });
    }, [p, f, pt]), g.useEffect(() => gVe(async () => {
      if (be) throw new Error(x("请等待对话和生成任务完成后再更换缓存目录。"));
      v.current && (await v.current), b.current && (await pt());
    }), [be, pt]);
    const gt = g.useMemo(() => BHe(bt => {
      if (!b.current) {
        S6e(bt);
        return;
      }
      pt(bt);
    }, 1e3), [pt]);
    g.useEffect(() => {
      f && gt(w.current.length ? w.current : p);
    }, [p, f, gt]), g.useEffect(() => {
      if (!b.current || k.current === I) return;
      const bt = k.current;
      let Bt = !1;
      return (async () => {
        try {
          if (SNe(12e3), await pt(w.current, bt, {
            activeHydrated: bt != null
          }), Bt) return;
          const wn = await Ht();
          if (Bt) return;
          const at = m6e(Tnn(XPa(wn, w.current, A.current), A.current));
          if (await C(at), Bt || M.current !== I) return;
          const Pt = IL(at, I);
          w.current = Pt, k.current = I, m(Pt);
        } catch (wn) {
          console.warn("[Chat] 切换会话 hydrate 失败:", wn);
        }
      })(), () => {
        Bt = !0;
      };
    }, [I, pt, Ht, C]), g.useEffect(() => {
      if (!f || xe.current || he.current) return;
      const bt = w.current.length > 0 ? w.current : p;
      if (!bt.some(dt => dt.messages.some(xt => (xt.files || []).some(yn => !yn._assetId && (yn.isImage || yn.isVideo) && v7(yn.content || yn.url))))) return;
      xe.current = !0;
      let wn = !1,
        at = !1;
      const Pt = window.setTimeout(() => {
        wn = !0, (async () => {
          var gn;
          if (at) {
            xe.current = !1;
            return;
          }
          let dt = !1;
          const xt = [],
            yn = w.current.length > 0 ? w.current : bt;
          for (const mt of yn) {
            const Xt = [];
            for (const Gn of mt.messages) {
              if (!((gn = Gn.files) != null && gn.length)) {
                Xt.push(Gn);
                continue;
              }
              const rr = [];
              for (let qn = 0; qn < Gn.files.length; qn += 1) {
                const Dn = Gn.files[qn];
                if (!Dn._assetId && (Dn.isImage || Dn.isVideo) && v7(Dn.content || Dn.url)) {
                  const Ar = await rW(Dn, qn);
                  if (Ar) {
                    rr.push(_O(Dn, "", Ar)), dt = !0;
                    continue;
                  }
                }
                rr.push(Dn);
              }
              Xt.push({
                ...Gn,
                files: rr
              });
            }
            xt.push({
              ...mt,
              messages: Xt
            });
          }
          he.current = !0, xe.current = !1, dt && (Ge(xt), pt(xt, void 0, {
            replaceAllMessageBodies: !0
          }));
        })().catch(dt => {
          xe.current = !1, he.current = !0, console.warn("[Chat] 历史附件本地迁移失败:", dt);
        });
      }, 1500);
      return () => {
        at = !0, window.clearTimeout(Pt), wn || (xe.current = !1);
      };
    }, [f, p, pt]), g.useEffect(() => {
      const bt = f && Ee.current && !be;
      if (Ee.current = be, !bt) return;
      pt(w.current);
      const Bt = window.setTimeout(() => {
        o0t(), (async () => {
          var wn;
          try {
            const Pt = (w.current.length > 0 ? w.current : p).find(dt => dt.id === I);
            if (Pt) {
              let dt = !1;
              const xt = [];
              for (const yn of Pt.messages) {
                if (!((wn = yn.files) != null && wn.length)) {
                  xt.push(yn);
                  continue;
                }
                const gn = [];
                for (let mt = 0; mt < yn.files.length; mt += 1) {
                  const Xt = yn.files[mt];
                  if (Xt._assetId || !(Xt.isImage || Xt.isVideo) || !v7(Xt.content || Xt.url)) {
                    gn.push(Xt);
                    continue;
                  }
                  const Gn = await rW(Xt, mt);
                  Gn ? (gn.push(_O(Xt, "", Gn)), dt = !0) : gn.push(Xt);
                }
                xt.push({
                  ...yn,
                  files: gn
                });
              }
              dt && Ge(yn => {
                const gn = yn.map(mt => mt.id === I ? {
                  ...mt,
                  messages: xt
                } : mt);
                return w.current = gn, gn;
              });
            }
          } catch {}
          try {
            const {
                memoryMonitor: at
              } = await Ie(async () => {
                const {
                  memoryMonitor: xt
                } = await Promise.resolve().then(() => eEe);
                return {
                  memoryMonitor: xt
                };
              }, void 0, import.meta.url),
              Pt = at.getMemoryUsage();
            if (!Pt) return;
            Pt.used / 1024 / 1024 >= 750 && (await at.manualCleanup());
          } catch {}
        })();
      }, 4e3);
      return () => window.clearTimeout(Bt);
    }, [f, be, p, pt]), g.useEffect(() => {
      let bt = !1;
      const Bt = () => {
        (h5() || nfe()) && (async () => (await Id(), !(bt || !(h5() || nfe())) && (await lt())))();
      };
      Bt();
      const wn = nRe(Bt),
        at = Gat(Bt);
      return () => {
        bt = !0, wn(), at();
      };
    }, [lt]), g.useEffect(() => {
      const bt = () => {
        if (h5() || nfe() || be || !f) return;
        q5(Pt => Pt.map(xt => {
          var yn;
          return (yn = xt.preview) != null && yn.startsWith("blob:") || xt._ephemeralPreview || xt._pendingEncode ? (Ez([xt]), xt._assetId ? {
            name: xt.name || xt.displayName || "media",
            displayName: xt.displayName || xt.name,
            type: xt.type || "",
            _assetId: xt._assetId,
            isImage: xt.isImage,
            isVideo: xt.isVideo,
            isAudio: xt.isAudio,
            fileExt: xt.fileExt
          } : null) : xt;
        }).filter(Boolean));
        const at = w.current.length > 0 ? w.current : _.current;
        (async () => {
          try {
            await pt(at);
          } catch {}
          m(ELt(at)), w.current = [], k.current = null, o0t(), Ze(!1), he.current = !1;
        })();
      };
      bt();
      const Bt = nRe(bt),
        wn = Gat(bt);
      return () => {
        Bt(), wn();
      };
    }, [be, f, pt, Ze]), g.useEffect(() => {
      const bt = () => {
        q5(Bt => Bt.map(at => {
          var Pt;
          return (Pt = at.preview) != null && Pt.startsWith("blob:") || at._ephemeralPreview ? (Ez([at]), at._assetId ? {
            name: at.name || at.displayName || "media",
            displayName: at.displayName || at.name,
            type: at.type || "",
            _assetId: at._assetId,
            isImage: at.isImage,
            isVideo: at.isVideo,
            isAudio: at.isAudio,
            fileExt: at.fileExt
          } : at._pendingEncode ? {
            name: at.name || at.displayName || "media",
            displayName: at.displayName || at.name,
            type: at.type || "",
            isImage: at.isImage,
            isVideo: at.isVideo,
            _pendingEncode: !0
          } : null) : at;
        }).filter(Boolean));
      };
      return window.addEventListener("canvasSessionMemoryReclaimed", bt), () => window.removeEventListener("canvasSessionMemoryReclaimed", bt);
    }, []), g.useEffect(() => {
      let bt;
      const Bt = () => {
        bt == null || bt(), bt = void 0, (h5() || nfe()) && (bt = tRt());
      };
      Bt();
      const wn = nRe(Bt),
        at = Gat(Bt);
      return () => {
        wn(), at(), bt == null || bt();
      };
    }, []), g.useEffect(() => {
      const bt = () => {
        (async () => {
          try {
            if (h5() || nfe()) {
              SNe(15e3);
              const Bt = m6e(await Ht()),
                wn = M.current;
              await C(Bt);
              const at = IL(Bt, wn);
              w.current = at, k.current = Bt.some(Pt => Pt.id === wn && (Pt.projectId || null) === h.current) ? wn : null, m(at), S6e(Bt), Ze(!0);
            } else w.current = [], k.current = null, m(ean()), Ze(!1);
          } catch (Bt) {
            console.warn("[Chat] Failed to reload restored chat sessions:", Bt);
          }
        })();
      };
      return window.addEventListener("qiaodoumayi-chat-restored", bt), () => {
        window.removeEventListener("qiaodoumayi-chat-restored", bt);
      };
    }, [Ht, Ze, C]), g.useEffect(() => {
      T < EF && P(EF);
    }, [T]), g.useEffect(() => {
      EWt(T);
    }, [T]), g.useEffect(() => {
      try {
        localStorage.setItem("qiaodoumayi_chat_width", String(T));
      } catch {}
    }, [T]), g.useEffect(() => {
      try {
        localStorage.setItem("qiaodoumayi_chat_font_size", R);
      } catch {}
    }, [R]), g.useEffect(() => {
      try {
        localStorage.setItem("qiaodoumayi_chat_web_search_enabled", String(W));
      } catch {}
    }, [W]), g.useEffect(() => {
      xra(q);
    }, [q]), g.useEffect(() => {
      Sna(de);
    }, [de]), g.useEffect(() => {
      try {
        localStorage.setItem("qiaodoumayi_chat_use_aliyun_oss", String(pe));
      } catch {}
    }, [pe]), g.useEffect(() => {
      try {
        localStorage.setItem("qiaodoumayi_chat_oss_image_base64", String(we));
      } catch {}
    }, [we]), g.useEffect(() => {
      Krn(k6e, pit, B);
    }, [B]), g.useEffect(() => {
      Krn(Yrn, Xrn, z);
    }, [z]), g.useEffect(() => {
      try {
        localStorage.setItem(Jrn, O);
      } catch {}
    }, [O]), g.useEffect(() => {
      const bt = VU(e.filter(at => at.type === "Chat"));
      if (bt.length === 0) return;
      const Bt = L8(B);
      if (Bt === B || !bt.some(at => at.id === Bt)) return;
      F(Bt);
      const wn = If(B).effort;
      wn && le(wn);
    }, [e, B]), g.useEffect(() => {
      const bt = VU(e.filter(at => at.type === "Chat"));
      if (bt.length === 0) return;
      const Bt = L8(z);
      if (Bt === z || !bt.some(at => at.id === Bt)) return;
      V(Bt);
      const wn = If(z).effort;
      wn && le(wn);
    }, [e, z]), g.useEffect(() => {
      const bt = L8(B),
        Bt = zs(bt);
      G((Bt == null ? void 0 : Bt.platformGroup) || ko);
    }, [B]);
    const Ut = g.useMemo(() => {
        const bt = Te;
        return p.filter(Bt => u(Bt) && RL(Bt) === bt);
      }, [p, Te, d]),
      _t = g.useMemo(() => {
        const bt = Bt => {
          const wn = Xve(Bt);
          return typeof wn == "number" && wn > 0 ? wn : S.current.get(Bt.id) ?? 0;
        };
        return p.filter(u).sort((Bt, wn) => bt(wn) - bt(Bt));
      }, [p, d]),
      At = g.useMemo(() => {
        const bt = {};
        for (const [Bt, wn] of S.current.entries()) typeof wn == "number" && wn > 0 && (bt[Bt] = wn);
        for (const Bt of p) {
          const wn = Xve(Bt);
          typeof wn == "number" && wn > 0 && (bt[Bt.id] = wn);
        }
        return bt;
      }, [p]),
      Yt = g.useCallback((bt, Bt, wn) => {
        M.current = Bt, (wn == null ? void 0 : wn.alreadyHydrated) !== !1 && (k.current = Bt);
        const at = IL(bt, Bt);
        w.current = at, _.current = at, Ze(!0), m(at), E(Bt), pt(bt);
      }, [pt, Ze]),
      qe = g.useCallback(bt => {
        var at;
        me.current = bt, Ne(bt);
        const Bt = w.current.length > 0 ? w.current : _.current,
          wn = Bt.filter(Pt => u(Pt) && RL(Pt) === bt);
        if (wn.length === 0) {
          const Pt = dfe(bt, d);
          Yt([...Bt, Pt], Pt.id), VO(null);
          return;
        }
        if (!wn.some(Pt => Pt.id === M.current)) {
          k.current = null;
          let Pt = null;
          try {
            Pt = localStorage.getItem(`qiaodoumayi_canvas_active_v2:${d || "unassigned"}:${bt}`);
          } catch {}
          E(((at = wn.find(dt => dt.id === Pt)) == null ? void 0 : at.id) || wn[0].id), VO(null);
        }
      }, [Yt, d]),
      kt = g.useCallback(bt => {
        var at;
        const Bt = w.current.find(Pt => Pt.id === bt) || p.find(Pt => Pt.id === bt);
        if (!Bt || !u(Bt)) return;
        const wn = fwt(Bt) ? "local-skill" : Bt.mode ?? "normal";
        wn === "local-skill" && Bt.mode !== "local-skill" && Ge(Pt => Pt.map(dt => dt.id === bt ? {
          ...dt,
          mode: "local-skill"
        } : dt)), me.current = wn, Ne(wn), (at = Bt.messages) != null && at.length || (k.current = null), E(bt), VO(null);
      }, [p, d]);
    g.useEffect(() => {
      const bt = p.find(Bt => Bt.id === I && u(Bt));
      if (bt) try {
        localStorage.setItem(`qiaodoumayi_canvas_active_v2:${d || "unassigned"}:${RL(bt)}`, I);
      } catch {}
    }, [I, d, p]);
    const St = g.useRef(null);
    g.useEffect(() => {
      const bt = Bt => {
        const wn = Bt.detail,
          at = String((wn == null ? void 0 : wn.messageId) || "").trim(),
          Pt = String((wn == null ? void 0 : wn.sessionId) || "").trim();
        at && lt().then(async () => {
          var gn, mt;
          const dt = w.current.length ? w.current : _.current;
          let xt = Pt && dt.some(Xt => Xt.id === Pt) ? Pt : (gn = dt.find(Xt => Xt.messages.some(Gn => Gn.id === at))) == null ? void 0 : gn.id;
          if (!xt) {
            const Xt = await XMa();
            xt = (mt = Xt == null ? void 0 : Xt.find(Gn => Gn.messages.some(rr => rr.id === at))) == null ? void 0 : mt.id;
          }
          if (!xt) return;
          kt(xt);
          const yn = (Xt = 0) => {
            const Gn = typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(at) : at.replace(/["\\]/g, "\\$&"),
              rr = document.querySelector(`[data-chat-message-id="${Gn}"]`);
            rr ? (rr.scrollIntoView({
              block: "center",
              behavior: "smooth"
            }), rr.animate([{
              boxShadow: "0 0 0 1px rgba(249,115,22,.8)"
            }, {
              boxShadow: "0 0 0 8px rgba(249,115,22,0)"
            }], {
              duration: 900,
              easing: "ease-out"
            })) : Xt < 5 && window.setTimeout(() => yn(Xt + 1), 120 + Xt * 100);
          };
          window.setTimeout(() => yn(), 80);
        });
      };
      return window.addEventListener("projectMemoryChatFocusRequested", bt), () => window.removeEventListener("projectMemoryChatFocusRequested", bt);
    }, [lt, kt]), g.useEffect(() => {
      var Pt;
      if (!f) return;
      if (p.length === 0) {
        const dt = dfe(Te, d);
        Yt([dt], dt.id);
        return;
      }
      const bt = Te,
        Bt = p.find(dt => dt.id === I && u(dt));
      if (fwt(Bt) && bt !== "local-skill") {
        Bt && Bt.mode !== "local-skill" && Ge(dt => dt.map(xt => xt.id === Bt.id ? {
          ...xt,
          mode: "local-skill"
        } : xt)), Ne("local-skill");
        return;
      }
      const wn = p.filter(dt => u(dt) && RL(dt) === bt),
        at = wn.some(dt => dt.id === I);
      if (wn.length === 0) {
        const dt = w.current.length > 0 ? w.current : _.current,
          xt = dfe(bt, d);
        Yt([...dt, xt], xt.id);
      } else if (!at) {
        let dt = null;
        try {
          dt = localStorage.getItem(`qiaodoumayi_canvas_active_v2:${d || "unassigned"}:${bt}`);
        } catch {}
        E(((Pt = wn.find(xt => xt.id === dt)) == null ? void 0 : Pt.id) || wn[0].id);
      }
    }, [p, Te, I, Yt, d, f]);
    const hn = g.useCallback(bt => {
      var Pa;
      if (bt.button !== 0) return;
      bt.preventDefault(), bt.stopPropagation();
      const Bt = bt.currentTarget,
        wn = Bt.closest(".sketch-chat-panel"),
        at = document.documentElement,
        Pt = bt.clientX,
        dt = bt.timeStamp;
      let xt = 0,
        yn = !1,
        gn = -1,
        mt = !1;
      const Xt = fa => {
          const Ca = window.innerWidth * .9;
          return Math.round(Math.max(EF, Math.min(1200, Ca, fa)));
        },
        Gn = Xt((wn == null ? void 0 : wn.getBoundingClientRect().width) || T),
        rr = Pt - (window.innerWidth - Gn);
      let qn = Gn;
      const Dn = fa => {
        const Ca = Xt(fa);
        qn = Ca, Ca !== gn && (gn = Ca, at.style.setProperty("--sketch-chat-sidebar-width", `${Ca}px`), wn && (wn.style.width = `${Ca}px`));
      };
      at.dataset.chatResizing = "true";
      try {
        Bt.setPointerCapture(bt.pointerId);
      } catch {}
      const Ar = fa => {
          if (!(fa.clientX <= 1 && fa.clientY <= 1)) {
            if (!mt) {
              if (fa.timeStamp - dt < 50 && Math.abs(fa.clientX - Pt) > 200) return;
              mt = !0;
            }
            qn = window.innerWidth - fa.clientX + rr, !xt && (xt = requestAnimationFrame(() => {
              xt = 0, Dn(qn);
            }));
          }
        },
        _r = () => {
          if (!yn) {
            yn = !0, xt && cancelAnimationFrame(xt), xt = 0, Dn(qn), window.removeEventListener("pointermove", Ar), window.removeEventListener("pointerup", _r), window.removeEventListener("pointercancel", _r);
            try {
              Bt.releasePointerCapture(bt.pointerId);
            } catch {}
            delete at.dataset.chatResizing, wn && (wn.style.width = `${qn}px`), EWt(qn), _e.current === _r && (_e.current = null), P(qn);
          }
        };
      (Pa = _e.current) == null || Pa.call(_e), _e.current = _r, window.addEventListener("pointermove", Ar, {
        passive: !0
      }), window.addEventListener("pointerup", _r), window.addEventListener("pointercancel", _r);
    }, [T]);
    g.useEffect(() => () => {
      var bt;
      (bt = _e.current) == null || bt.call(_e);
    }, []);
    const Qt = g.useCallback((bt, Bt) => {
        bt.preventDefault(), bt.stopPropagation();
        const wn = Te,
          at = w.current.length > 0 ? w.current : _.current,
          Pt = String(Bt || "").trim();
        if (!Pt || !at.some(mt => mt.id === Pt && u(mt))) return;
        A.current.add(Pt), S.current.delete(Pt);
        let dt = at.filter(mt => mt.id !== Pt),
          xt = M.current,
          yn = !1;
        if (dt.some(u)) {
          if (xt === Pt) {
            const mt = dt.filter(Xt => u(Xt) && RL(Xt) === wn);
            if (mt.length > 0) xt = mt[0].id;else {
              const Xt = dt.find(u);
              xt = Xt.id;
              const Gn = Xt.mode ?? "normal";
              Gn !== wn && Ne(Gn);
            }
            k.current = null, yn = !0;
          }
        } else {
          const mt = dfe(wn, d);
          dt = [...dt, mt], xt = mt.id, k.current = mt.id;
        }
        M.current = xt;
        const gn = IL(dt, xt);
        w.current = gn, Ze(!0), m(gn), (xt !== I || yn) && E(xt), (async () => {
          try {
            await pt(gn);
          } catch (mt) {
            console.warn("[Chat] 删除会话后落盘失败:", mt);
          } finally {
            A.current.delete(Pt);
          }
        })();
      }, [I, Te, pt, Ze, d]),
      Ot = g.useCallback((bt, Bt) => {
        const wn = new Set(Bt);
        wn.size !== 0 && Ge(at => {
          const Pt = at.map(dt => {
            if (dt.id !== bt) return dt;
            const xt = dt.messages.filter(yn => !wn.has(yn.id));
            return {
              ...dt,
              messages: xt,
              chatModelId: CXn(xt) || void 0
            };
          });
          return pt(Pt), Pt;
        });
      }, [pt]),
      ln = g.useCallback(bt => {
        const Bt = Te,
          wn = w.current.length > 0 ? w.current : _.current,
          at = wn.find(xt => xt.id === I),
          Pt = ((bt == null ? void 0 : bt.localSkillRootPath) || "").trim() || (Bt === "local-skill" ? y0e(at == null ? void 0 : at.id, at == null ? void 0 : at.localSkillRootPath) || q2e() : void 0),
          dt = {
            ...dfe(Bt, d),
            ...(Pt ? {
              localSkillRootPath: Pt
            } : {})
          };
        Pt && wYt(dt.id, Pt), Yt([...wn, dt], dt.id), Pt && A6e([...wn, dt], Pt), VO(null);
      }, [Te, Yt, I, d]),
      Pn = g.useCallback(async () => {
        const bt = await _Be();
        bt && (PX(bt), ln({
          localSkillRootPath: bt
        }));
      }, [ln]),
      rn = g.useCallback(bt => {
        const Bt = String(bt || "").trim();
        if (!Bt) return;
        PX(Bt);
        const wn = w.current.length > 0 ? w.current : _.current,
          at = dt => {
            const xt = Xve(dt);
            return typeof xt == "number" && xt > 0 ? xt : S.current.get(dt.id) ?? 0;
          },
          Pt = [...wn].filter(dt => (dt.mode === "local-skill" || dt.localSkillRootPath) && u(dt) && e_(dt.localSkillRootPath, Bt)).sort((dt, xt) => at(xt) - at(dt))[0];
        if (Pt) {
          kt(Pt.id);
          return;
        }
        ln({
          localSkillRootPath: Bt
        });
      }, [ln, kt, d]),
      [Yn, Ct] = g.useState(0),
      Cn = g.useCallback(bt => {
        const Bt = String(bt || "").trim();
        Bt && (iUn(Bt), Ct(wn => wn + 1));
      }, []),
      un = g.useMemo(() => BIe(p.map(bt => bt.localSkillRootPath)), [p, Yn]),
      Jn = g.useCallback((bt, Bt) => {
        const wn = (Bt || "").trim();
        wn && Ge(at => {
          const Pt = at.map(xt => xt.id === bt ? {
              ...xt,
              title: wn
            } : xt),
            dt = Pt.find(xt => xt.id === bt);
          return dt != null && dt.localSkillRootPath && A6e(Pt, dt.localSkillRootPath), pt(Pt), Pt;
        });
      }, [pt]),
      Kn = g.useCallback(async (bt, Bt) => {
        const wn = (Bt || "").trim();
        if (!wn) return;
        await lt();
        const at = Te,
          Pt = {
            id: Fi(),
            role: bt,
            content: wn,
            timestamp: Date.now()
          };
        Ge(dt => {
          const xt = dt.map(yn => yn.id !== I || RL(yn) !== at ? yn : Yve({
            ...yn,
            messages: [...yn.messages, Pt]
          }));
          return pt(xt), xt;
        });
      }, [I, Te, lt, pt, Ge]),
      en = g.useCallback(async (bt, Bt) => {
        var _r, Pa, fa, Ca, $n;
        const wn = me.current;
        if (Z.current.has(I)) {
          console.warn("【Chat】当前对话正在发送中，请稍候...");
          return;
        }
        const at = (Bt == null ? void 0 : Bt.filesOverride) ?? _de().map(yr => {
          var Ea;
          const Ir = typeof yr.preview == "string" && yr.preview.trim() ? yr.preview : void 0,
            Gr = yr.url && !String(yr.url).startsWith("data:") ? yr.url : void 0,
            Zr = (typeof yr._ossRemoteUrl == "string" && gx(yr._ossRemoteUrl) ? yr._ossRemoteUrl : void 0) || (Gr && gx(Gr) ? Gr : void 0),
            La = (Ir && nr(Ir) ? Ir : void 0) || (Gr && nr(Gr) ? Gr : void 0),
            sa = OP(yr);
          return {
            name: yr.displayName || yr.name || "unnamed",
            type: yr.type || "",
            url: yr._assetId ? Zr || La || Gr : yr.url,
            content: sa || !yr._assetId ? yr.content : void 0,
            preview: La || Zr || Ir,
            _ossRemoteUrl: Zr,
            _assetId: yr._assetId,
            _chipKind: yr._chipKind,
            _canvasNodeId: yr._canvasNodeId,
            isImage: sa ? !1 : uit(yr),
            isVideo: sa ? !1 : hit(yr),
            isAudio: sa ? !1 : yr.isAudio,
            isExcel: yr.isExcel,
            isPDF: yr.isPDF,
            isDoc: yr.isDoc,
            fileExt: yr.fileExt || (yr.name ? (Ea = yr.name.split(".").pop()) == null ? void 0 : Ea.toLowerCase() : "")
          };
        });
        if (!bt.trim() && at.length === 0) {
          console.warn("【Chat】消息内容和文件都为空");
          return;
        }
        wn === "agent" && ze.activeSkillId && Le(yr => yr.activeSkillId ? {
          ...yr,
          activeSkillId: void 0
        } : yr);
        const Pt = !!(Bt != null && Bt.desktopPet && wn === "agent" && _Ra(bt)),
          dt = [Bt != null && Bt.desktopPet ? xRa(YX().personality) : "", Pt ? kRa() : ""].filter(Boolean).join(`

`),
          xt = wn === "local-skill",
          yn = xt ? z : B;
        let gn = L8(yn),
          mt = Mu(gn);
        const Xt = xt ? O : N,
          Gn = (Bt == null ? void 0 : Bt.quotedFromOverride) !== void 0 ? Bt.quotedFromOverride : Eze(),
          rr = nua(f0e(bt, Gn || void 0), at);
        Z.current.add(I), Ye();
        let qn = I,
          Dn = I,
          Ar = null;
        try {
          const yr = await lt(),
            Ir = yr.find(Lt => Lt.id === I && u(Lt));
          if (!Ir) throw console.error(`【Chat】找不到会话: ${I}，可用会话:`, yr.map(Lt => Lt.id)), new Error(`找不到当前对话会话: ${I}`);
          Ir.id !== I && E(Ir.id), qn = Ir.id, Dn = Ir.id, Dn !== I && (Z.current.delete(I), Z.current.add(Dn), Ye());
          const Gr = l != null && l.current ? String(l.current) : null;
          if ((Ir.projectId || null) !== Gr || d !== Gr) throw new Error("画布已切换或仍在加载，请在当前画布会话中重试");
          const Zr = wn === "agent" && Gr !== null,
            La = Zr && Ir.projectId !== Gr,
            sa = La ? Ir.messages.length : Math.min(Math.max(0, Ir.projectMessageStartIndex ?? 0), Ir.messages.length),
            Ea = La ? {
              ...Ir,
              projectId: Gr,
              projectMessageStartIndex: sa,
              messages: Ir.messages.slice(sa)
            } : Zr ? {
              ...Ir,
              messages: Ir.messages.slice(sa)
            } : Ir;
          if (gn = L8(zat(yn, Ea)), mt = Mu(gn), wn === "local-skill" && !y0e(Ir.id, Ir.localSkillRootPath)) throw new Error("请先选择本地 Skill 目录");
          (La || Ea.projectId !== Ir.projectId) && Ge(Lt => Lt.map(ct => ct.id === Ir.id ? {
            ...ct,
            projectId: Ea.projectId,
            ...(La ? {
              projectMessageStartIndex: sa
            } : {})
          } : ct));
          const ba = at.map(Lt => ({
              ...Lt
            })),
            ga = ba.map(Lt => ({
              ...Lt
            }));
          let _a = Bt == null ? void 0 : Bt.userMessageId,
            $a;
          if (Bt != null && Bt.skipUserMessageAppend && Bt.historyMessagesOverride) Bt.removeErrorMessageId && Ge(Lt => Lt.map(ct => ct.id === qn ? Yve({
            ...ct,
            messages: Bt.historyMessagesOverride
          }) : ct)), $a = {
            ...Ea,
            messages: Bt.historyMessagesOverride
          };else {
            const Lt = {
              id: Fi(),
              role: "user",
              content: bt,
              files: ba,
              timestamp: Date.now(),
              ...(wn === "agent" && Ft ? {
                appliedSkillId: Ft.id,
                appliedSkillName: Ft.name
              } : {}),
              ...(Gn ? {
                quotedFrom: Gn
              } : {})
            };
            _a = Lt.id, Ge(ct => {
              var Rt;
              const Dt = ct.map(fn => fn.id === Ir.id ? Yve({
                  ...fn,
                  chatModelId: gn,
                  messages: [...fn.messages.map(Zt => Zt.role === "assistant" && !Zt.agentQuickRepliesDismissed ? {
                    ...Zt,
                    agentQuickRepliesDismissed: !0
                  } : Zt), Lt]
                }) : fn),
                bn = (Rt = Dt.find(fn => fn.id === Ir.id)) == null ? void 0 : Rt.localSkillRootPath;
              return wn === "local-skill" && A6e(Dt, bn), Dt;
            }), Bt != null && Bt.desktopPet || (wW(""), q5(ct => (Ez(ct), [])), VO(null)), $a = {
              ...Ea,
              messages: [...Ea.messages, Lt]
            };
          }
          if (mt && wn === "normal") {
            const Lt = new AbortController();
            Ar = Lt, re.current.set(Ir.id, Lt);
            const ct = setTimeout(() => Lt.abort(), 18e5),
              Dt = {
                id: Fi(),
                role: "assistant",
                content: "",
                modelId: gn,
                timestamp: Date.now(),
                agentStartedAt: Date.now(),
                agentStatus: "thinking"
              },
              bn = BS("chat", {
                id: Dt.id,
                label: "对话",
                modelName: gn,
                startTime: Dt.timestamp,
                signal: Lt.signal
              });
            let Rt = Dt;
            const fn = () => re.current.get(Ir.id) === Lt,
              Zt = Ln => {
                fn() && (PL(null, Ir.id), Ge(tt => tt.map(zt => zt.id === Ir.id ? {
                  ...zt,
                  messages: zt.messages.map(an => an.id === Dt.id ? Ln : an)
                } : zt)));
              };
            Ge(Ln => Ln.map(tt => tt.id === Ir.id ? {
              ...tt,
              messages: [...tt.messages, Dt]
            } : tt));
            try {
              const Ln = await iQe({
                messages: $a.messages.map(tt => ({
                  ...tt
                })),
                modelId: gn,
                effort: de,
                webSearch: W,
                instructions: [znn({
                  projectId: Gr,
                  sessionId: Ir.id,
                  query: rr
                }), dt].filter(Boolean).join(`

`),
                placeholder: Dt,
                signal: Lt.signal,
                onUpdate: tt => {
                  Rt = tt, fn() && PL({
                    sessionId: Ir.id,
                    message: tt
                  });
                },
                onFiles: (tt, zt) => {
                  fn() && Ge(an => an.map(Rn => Rn.id === Ir.id ? {
                    ...Rn,
                    messages: Rn.messages.map(Un => Un.id === tt ? {
                      ...Un,
                      files: zt
                    } : Un)
                  } : Rn));
                }
              });
              Zt(Ln), fn() && Ln.content.trim() && bn();
            } catch (Ln) {
              Lt.signal.aborted && Lt.signal.reason === _6e ? Zt(cfe(Rt)) : Zt({
                ...Rt,
                content: `${gwt} ${Ln instanceof Error ? Ln.message : String(Ln)}`,
                agentStatus: "done",
                agentEndedAt: Date.now()
              });
            } finally {
              clearTimeout(ct);
            }
            return;
          }
          const Ya = B2e.find(Lt => Lt.id === gn),
            ta = mt && Ya ? {
              ...Ya,
              modelName: gn
            } : e.find(Lt => Lt.id === gn);
          if (!ta) throw new Error(`找不到模型配置: ${gn}`);
          if (ta.apiProviderId && ta.enabled === !1) throw new Error("该模型或服务商已停用，请在 API 接入中启用");
          const ki = ta != null && ta.nativeChat ? "chat" : cft(ta, q),
            Wn = !xt && (nG(ta == null ? void 0 : ta.url) || rG((ta == null ? void 0 : ta.id) || gn)),
            wr = mt ? "" : cu(ta == null ? void 0 : ta.key, t, void 0, {
              platformGroup: Wn ? Hg : Xt,
              modelId: (ta == null ? void 0 : ta.id) || gn,
              modelName: (ta == null ? void 0 : ta.modelName) || gn,
              baseUrl: ta == null ? void 0 : ta.url,
              modelSavedApiKeyId: ta == null ? void 0 : ta.savedApiKeyId,
              allowPlatformGroupOverride: xt
            });
          FS(ta == null ? void 0 : ta.id) && (await ace());
          const jn = mt ? "codex://local" : dft(ta == null ? void 0 : ta.id, rOe(ta, (ta == null ? void 0 : ta.url) || "https://ai.comfly.org")).replace(/\/+$/, "");
          if (!wr && !mt && !Hk(ta, jn)) throw new Error("请先配置 API Key");
          console.log("【Chat】发送消息到:", jn, "模型:", ta == null ? void 0 : ta.modelName);
          const _n = !mt && (pe || ua()),
            ar = _n,
            Vt = async Lt => {
              const Dt = (await rW(Lt, 0)) || Lt._assetId,
                Rt = Ok(Lt) || (await Dce({
                  ...Lt,
                  _assetId: Dt
                }));
              return Rt ? mt ? Rt : x3(Rt, {
                useOss: _n,
                ...fy,
                purpose: "chat",
                apiKey: wr,
                baseUrl: jn,
                assetId: Dt,
                imageAsBase64: we
              }) : null;
            },
            vn = hI(gn) || I3(jn),
            An = Xj((ta == null ? void 0 : ta.id) || gn, ta == null ? void 0 : ta.modelName, jn || (ta == null ? void 0 : ta.url)),
            ur = vn || An,
            zr = {
              projectId: Gr,
              sessionId: Ir.id,
              query: rr
            },
            Dr = vn ? wn === "skill" ? YXn(zr) : QXn(zr) : null,
            Wr = wn === "agent" || wn === "local-skill" ? [] : await aRt({
              messages: $a.messages,
              historyLimit: ur ? Number.MAX_SAFE_INTEGER : ke,
              excludeMessageId: _a,
              composeUserText: f0e,
              resolveImageUrl: Vt,
              ...(ur ? {
                mediaBudget: 64
              } : {})
            });
          wn !== "agent" && wn !== "local-skill" && console.log(`【Chat】回读历史消息: ${ur ? "全量前缀" : ke} 条，实际先验: ${Wr.length} 条`);
          const jr = [{
              role: "system",
              content: [An ? c9n() : Dr ? Dr.stable : wn === "skill" ? SRa(zr) : znn(zr), dt].filter(Boolean).join(`

`)
            }, ...Wr],
            ea = Dr != null && Dr.related ? `${Dr.related}

${rr}` : rr,
            pa = [];
          ea && pa.push({
            type: "text",
            text: ea
          });
          const Br = (Lt, ct) => {
            Ge(Dt => Dt.map(bn => bn.id === Ir.id ? {
              ...bn,
              messages: bn.messages.map(Rt => Rt.id === Lt ? {
                ...Rt,
                files: ct
              } : Rt)
            } : bn));
          };
          for (let Lt = 0; Lt < ba.length; Lt += 1) {
            const ct = ba[Lt];
            if (mt && ct.isAudio) throw new Error("Codex 模型暂不支持音频附件，请使用文字或图片");
            if (OP(ct)) {
              ga[Lt] = {
                ...ct,
                isImage: !1,
                isVideo: !1,
                isAudio: !1
              };
              continue;
            }
            const Dt = (await rW(ct, Lt)) || (await eQe(ct, Lt)),
              bn = Ok(ct),
              Rt = bn || (await Dce({
                ...ct,
                _assetId: Dt || ct._assetId
              })),
              fn = uit(ct),
              Zt = hit(ct);
            if (fn && Rt) try {
              const Ln = Dt || ct._assetId;
              console.log(`【Chat】处理图片: ${ct.name}, OSS=${_n}, asset=${Ln || "-"}`);
              const tt = ur && wn === "agent" && !!bn && nr(bn),
                zt = mt ? Rt : tt ? bn : await x3(Rt, {
                  useOss: _n,
                  ...fy,
                  purpose: "chat",
                  apiKey: wr,
                  baseUrl: jn,
                  assetId: Ln,
                  imageAsBase64: we
                });
              pa.push({
                type: "image_url",
                image_url: {
                  url: zt
                }
              }), ga[Lt] = _O(ct, zt, Dt);
            } catch (Ln) {
              console.error(`【Chat】图片处理失败: ${ct.name}`, Ln);
              const tt = Ln instanceof Error ? Ln.message : "图片处理失败";
              throw new Error(`图片 ${ct.name} 处理失败：${tt}`);
            } else if (Zt && Rt) try {
              console.log(`【Chat】处理视频: ${ct.name}, OSS=${ar}, asset=${Dt || ct._assetId || "-"}`);
              const Ln = mt ? Rt : await Qj(Rt, {
                useOss: ar,
                apiKey: wr,
                baseUrl: jn,
                assetId: Dt || ct._assetId,
                forceInline: An && rqe(NOe())
              });
              pa.push(mt ? {
                type: "video_url",
                video_url: {
                  url: Ln
                }
              } : An ? Jae("video", Ln) : {
                type: "image_url",
                image_url: {
                  url: Ln
                }
              }), ga[Lt] = _O(ct, Ln, Dt);
            } catch (Ln) {
              console.error(`【Chat】视频处理失败: ${ct.name}`, Ln);
              const tt = Ln instanceof Error ? Ln.message : "视频处理失败";
              throw new Error(`视频 ${ct.name} 处理失败：${tt}`);
            } else ct.isAudio ? (pa.push({
              type: "text",
              text: `
[User attached audio: ${ct.name}]
`
            }), Dt && (ga[Lt] = _O(ct, "", Dt))) : ct.content && typeof ct.content == "string" && !v7(ct.content) && ct.content.length < 12e4 ? pa.push({
              type: "text",
              text: `
[File: ${ct.name}]
\`\`\`${ct.fileExt || "text"}
${ct.content}
\`\`\`
`
            }) : (pa.push({
              type: "text",
              text: `
[User attached file: ${ct.name}]
`
            }), Dt && (ga[Lt] = _O(ct, "", Dt)));
          }
          if (!pa.some(Lt => Lt.type === "image_url") && mFn(rr)) {
            const Lt = fFn($a.messages, _a);
            if (Lt) try {
              const ct = Ok(Lt),
                bn = ur && wn === "agent" && !!ct && nr(ct) ? ct : await Vt(Lt);
              bn && (pa.push({
                type: "image_url",
                image_url: {
                  url: bn
                }
              }), console.log("[Chat] 改图/分析意图：已注入上一张本地图", Lt._assetId || Lt.name));
            } catch (ct) {
              console.warn("[Chat] 上一张图回读失败:", ct);
            }
          }
          if (_a && (Br(_a, ga), $a = {
            ...$a,
            messages: $a.messages.map(Lt => Lt.id === _a ? {
              ...Lt,
              files: ga
            } : Lt)
          }), xt) {
            const Lt = pa.filter(fn => fn.type === "text" && fn.text),
              ct = pa.filter(fn => {
                var Zt;
                return fn.type === "image_url" && ((Zt = fn.image_url) == null ? void 0 : Zt.url);
              }),
              Dt = ga.filter(fn => uit(fn) || hit(fn)).map(fn => fn.name || "附件"),
              bn = gea(rr),
              Rt = [];
            ct.length > 0 && (Rt.push({
              type: "text",
              text: `【本轮聊天附件共 ${ct.length} 张，发送顺序 = @图片1 … @图片${ct.length}。必须全部查看后再写提示词或改文件。工作区文档若只写了 @图片1/@图片2，以本轮实际附件数为准。】`
            }), ct.forEach((fn, Zt) => {
              const Ln = Dt[Zt] || `附件${Zt + 1}`;
              Rt.push({
                type: "text",
                text: `@图片${Zt + 1} ${Ln}`
              }), Rt.push(fn);
            })), bn.length > 0 && Rt.push({
              type: "text",
              text: `【用户点名的本机路径（只读取，不要更换工作区）】
${bn.map(fn => `- ${fn}`).join(`
`)}
请先 list_dir / read_file / view_image。`
            }), Rt.push(...Lt), pa.length = 0, pa.push(...Rt);
          }
          pa.length > 0 ? jr.push({
            role: "user",
            content: pa
          }) : jr.push({
            role: "user",
            content: rr
          });
          const Lr = $a.messages.filter(Lt => Lt.id !== _a).slice(wn === "local-skill" || ur ? 0 : -ke),
            br = new AbortController();
          Ar = br, re.current.set(Ir.id, br);
          const Jr = setTimeout(() => br.abort(), 18e5),
            Kr = Fi(),
            ir = BS(wn === "normal" ? "chat" : "agent", {
              id: Kr,
              label: wn === "normal" ? "对话" : wn === "skill" ? "Skill 创作" : wn === "local-skill" ? "Local Skill" : "Agent",
              modelName: (ta == null ? void 0 : ta.modelName) || gn,
              signal: br.signal
            }),
            Hr = ga.filter(Lt => Lt.isImage || String(Lt.type || "").toLowerCase().startsWith("image/")),
            ha = yRt(rr, Hr.length),
            Ga = nMa(eMa($a.messages), ha.current),
            Za = {
              id: Kr,
              role: "assistant",
              content: "",
              modelId: gn,
              timestamp: Date.now(),
              ...(wn === "agent" && Ga.length > 0 ? {
                agentReferenceAssets: Ga
              } : {})
            };
          Ge(Lt => Lt.map(ct => ct.id === Ir.id ? {
            ...ct,
            messages: [...ct.messages, Za]
          } : ct));
          let va = Za,
            Kt = $a.agentCreativeProject;
          const Pr = (_r = [...$a.messages].reverse().find(Lt => Lt.agentProductionRun)) == null ? void 0 : _r.agentProductionRun;
          let kr = mde($a.agentProductionRun ?? Pr) ?? void 0;
          const Mr = Lt => {
              var Dt;
              const ct = (Dt = cit(Ir.id)) == null ? void 0 : Dt.message;
              va = jnn({
                ...Lt,
                agentAskAnswerText: Lt.agentAskAnswerText || (ct == null ? void 0 : ct.agentAskAnswerText),
                agentPendingChoice: qrn(Lt.agentPendingChoice, ct == null ? void 0 : ct.agentPendingChoice, Lt.agentStatus),
                agentMindCollapsed: Lt.agentStatus === "done" ? !0 : (ct == null ? void 0 : ct.agentMindCollapsed) ?? Lt.agentMindCollapsed
              }), va.agentProductionRun && ex(va.agentProductionRun), PL({
                sessionId: Ir.id,
                message: va
              });
            },
            Hn = (Lt, ct) => {
              var Rt;
              const Dt = (Rt = cit(Ir.id)) == null ? void 0 : Rt.message;
              va = jnn({
                ...Lt,
                agentAskAnswerText: Lt.agentAskAnswerText || (Dt == null ? void 0 : Dt.agentAskAnswerText),
                agentPendingChoice: qrn(Lt.agentPendingChoice, Dt == null ? void 0 : Dt.agentPendingChoice, Lt.agentStatus),
                agentMindCollapsed: Lt.agentStatus === "done" ? !0 : (Dt == null ? void 0 : Dt.agentMindCollapsed) ?? Lt.agentMindCollapsed
              }), va.agentProductionRun && ex(va.agentProductionRun);
              const bn = va;
              PL(null, Ir.id), Ge(fn => {
                const Zt = fn.find(an => an.id === Ir.id);
                if (!Zt) return fn;
                if (Zt.messages.some(an => an.id === Kr)) return fn.map(an => {
                  if (an.id !== Ir.id) return an;
                  const Rn = ct ? {
                    ...an,
                    ...ct
                  } : an;
                  return {
                    ...Rn,
                    messages: Rn.messages.map(Un => Un.id === Kr ? bn : Un)
                  };
                });
                const Ln = ($a.messages || []).filter(an => an.id !== Kr),
                  tt = {
                    ...(ct ? {
                      ...Zt,
                      ...ct
                    } : Zt),
                    messages: [...Ln, bn]
                  },
                  zt = fn.map(an => an.id === Ir.id ? tt : an);
                return pt(zt, Ir.id, {
                  activeHydrated: !0
                }), zt;
              });
            },
            $t = Lt => {
              Mr({
                ...va,
                content: tg(Lt)
              });
            },
            je = Lt => {
              Mr({
                ...va,
                ...Lt
              });
            },
            Qe = {
              reasoningChunks: [],
              mindById: new Map(),
              toolSteps: []
            };
          let Mt = null;
          const cn = () => {
              var er, Cr, tr;
              if (Mt && (clearTimeout(Mt), Mt = null), !(Qe.status != null || Qe.clearStatusDetail || Qe.statusDetail != null || Qe.clearPendingStep || Qe.pendingStep !== void 0 || Qe.textDraft != null || Qe.reasoningChunks.length > 0 || Qe.mindById.size > 0 || Qe.toolSteps.length > 0 || Qe.clearPendingChoice || Qe.pendingChoice !== void 0)) return;
              const ct = Qe.status,
                Dt = Qe.statusDetail,
                bn = !!Qe.clearStatusDetail,
                Rt = Qe.pendingStep,
                fn = !!Qe.clearPendingStep,
                Zt = Qe.textDraft,
                Ln = Qe.reasoningChunks.splice(0),
                tt = [...Qe.mindById.values()];
              Qe.mindById.clear();
              const zt = Qe.toolSteps.splice(0),
                an = Qe.pendingChoice,
                Rn = !!Qe.clearPendingChoice;
              Qe.status = void 0, Qe.statusDetail = void 0, Qe.clearStatusDetail = !1, Qe.pendingStep = void 0, Qe.clearPendingStep = !1, Qe.textDraft = void 0, Qe.pendingChoice = void 0, Qe.clearPendingChoice = !1;
              let Un = {
                ...va
              };
              if (ct != null && (Un.agentStatus = ct), Un.agentStatus === "done" && (Un = yOa(Un)), bn ? Un.agentStatusDetail = void 0 : Dt != null && (Un.agentStatusDetail = Dt || void 0), fn ? Un.agentPendingStep = void 0 : Rt !== void 0 && (Un.agentPendingStep = Rt || void 0), Rn ? Un.agentPendingChoice = void 0 : an !== void 0 && (Un.agentPendingChoice = an || void 0), Ln.length > 0) {
                const kn = Ln.map(xn => xn.trim()).filter(Boolean).join(`

`);
                Un.agentReasoning = (er = Un.agentReasoning) != null && er.trim() ? `${Un.agentReasoning.trim()}

${kn}` : kn, (Un.agentReasoning || "").length > Tze * 2 && (Un.agentReasoning = `…${Un.agentReasoning.slice(-Tze * 2)}`);
              }
              if (tt.length > 0) {
                let kn = Un.agentMindTrace || [];
                for (const xn of tt) {
                  const Fn = kn.findIndex(cr => cr.id === xn.id);
                  kn = Fn >= 0 ? kn.map((cr, vr) => vr === Fn ? {
                    ...cr,
                    ...xn
                  } : cr) : [...kn, xn];
                }
                Un.agentMindTrace = kn.length > pwt ? kn.slice(-pwt) : kn;
              }
              if (zt.length > 0 && (Un.toolSteps = [...(Un.toolSteps || []), ...zt], Un.toolSteps.length > 120 && (Un.toolSteps = Un.toolSteps.slice(-120)), Un.agentPendingStep = void 0), Zt != null) {
                const kn = tg(Zt);
                if (kn) {
                  const xn = ((Cr = Un.content) == null ? void 0 : Cr.trim()) || "",
                    Fn = ((tr = Un.agentPlanContent) == null ? void 0 : tr.trim()) || "";
                  Un = {
                    ...Un,
                    contentFolded: !1
                  }, Dat(kn) && !Fn ? (Un.agentPlanContent = kn, Un.content = kn) : Fn && kn.length < Fn.length && !Dat(kn) ? Un.content = Fn : xn.length > kn.length + 120 && Dat(xn) || (Un.content = kn);
                }
              }
              Mr(Un);
            },
            Qn = (Lt = !1) => {
              if (Lt) {
                cn();
                return;
              }
              Mt || (Mt = setTimeout(() => {
                Mt = null, cn();
              }, mOa));
            };
          try {
            if (wn === "skill" || KNe(rr) || bPa(rr)) {
              clearTimeout(Jr), je({
                agentStatus: "thinking",
                agentStatusDetail: "正在整理对话…",
                agentStartedAt: Date.now(),
                agentMindCollapsed: !1
              });
              const xn = KNe(rr) ? kPa($a.messages, _a) : "",
                Fn = Lr.filter(cr => cr.id !== Kr && (cr.role === "user" || cr.role === "assistant")).map(cr => ({
                  role: cr.role,
                  content: String(cr.content || "")
                }));
              try {
                const cr = await RLa({
                  nativeChat: ta == null ? void 0 : ta.nativeChat,
                  baseUrl: jn,
                  apiKey: wr,
                  modelName: (ta == null ? void 0 : ta.modelName) || gn,
                  userText: rr,
                  transcript: xn,
                  existingSkills: vp().map(vr => ({
                    name: vr.name,
                    description: vr.description
                  })),
                  history: Fn,
                  signal: br.signal,
                  webSearchEnabled: mt && W,
                  reasoningEffort: mt ? de : F2(gn, de, (ta == null ? void 0 : ta.modelName) || gn),
                  onCodexUsage: vr => je({
                    codexUsage: vr
                  }),
                  onReasoning: vr => je({
                    agentReasoning: vr
                  }),
                  onTextDraft: vr => je({
                    content: vr,
                    contentFolded: !1
                  }),
                  onStatus: vr => je({
                    agentStatus: "thinking",
                    agentStatusDetail: vr
                  })
                });
                Hn({
                  ...va,
                  content: cr.content,
                  skillCreatorQuestions: cr.questions,
                  skillArtifact: cr.artifact,
                  agentStatus: cr.questions ? "waiting_choice" : "done",
                  agentStatusDetail: cr.questions ? "等待选择方向" : void 0,
                  agentEndedAt: Date.now()
                }), cr.questions || ir();
              } catch (cr) {
                if (cr instanceof DOMException && cr.name === "AbortError") {
                  Hn({
                    ...va,
                    agentStatus: "done",
                    agentEndedAt: Date.now()
                  });
                  return;
                }
                throw cr;
              }
              return;
            }
            if (wn === "agent") {
              if (((Pa = ta.chatCapabilities) == null ? void 0 : Pa.tools) === !1) throw new Error("当前模型未启用工具调用，请先使用普通对话；验证工具能力后可在模型配置中启用");
              const xn = n == null ? void 0 : n.current;
              if (!xn) throw new Error("画布 Agent 未就绪，请稍候再试");
              const Fn = () => {
                  if (br.signal.aborted || h.current !== Gr || (l == null ? void 0 : l.current) !== Gr || (n == null ? void 0 : n.current) !== xn) throw new DOMException("画布已切换，本轮操作已停止", "AbortError");
                },
                cr = {
                  getState: () => (Fn(), xn.getState()),
                  getCapabilities: () => (Fn(), xn.getCapabilities()),
                  executeAction: Zn => (Fn(), xn.executeAction(Zn)),
                  resolveVisionAssets: xn.resolveVisionAssets ? Zn => (Fn(), xn.resolveVisionAssets(Zn)) : void 0,
                  setRedesignDirectionGate: xn.setRedesignDirectionGate ? Zn => {
                    Fn(), xn.setRedesignDirectionGate(Zn);
                  } : void 0,
                  isRedesignDirectionGateActive: xn.isRedesignDirectionGateActive ? () => (Fn(), xn.isRedesignDirectionGateActive()) : void 0
                };
              clearTimeout(Jr), kr = RJn({
                goal: rr,
                state: cr.getState(),
                existing: kr,
                reuseActive: JN(bt)
              }), Kt && (kr = H1t(kr, Kt)), ex(kr), R5({
                run: kr,
                sessionId: Ir.id,
                canvasStateVersion: cr.getState().stateVersion
              }), je({
                agentStatus: "thinking",
                toolSteps: [],
                agentReasoning: void 0,
                agentPendingStep: void 0,
                agentStatusDetail: void 0,
                agentMindTrace: [],
                agentStartedAt: Date.now(),
                agentEndedAt: void 0,
                appliedSkillId: Ft == null ? void 0 : Ft.id,
                appliedSkillName: Ft == null ? void 0 : Ft.name,
                agentMindCollapsed: !0,
                agentProductionRun: kr
              }), r && (r.current = Pt ? d0t([], ga, {
                preferLatestHistory: !1
              }) : d0t($a.messages, ga, {
                preferLatestHistory: (Bt == null ? void 0 : Bt.canvasReferenceNodeIds) === void 0
              })), a && (a.current = 0), i && !JN(bt) && OLa(i.current);
              const vr = pa.map(Zn => {
                  var Sr;
                  return Zn.type === "text" && Zn.text ? {
                    type: "text",
                    text: Zn.text
                  } : Zn.type === "image_url" && ((Sr = Zn.image_url) != null && Sr.url) ? {
                    type: "image_url",
                    image_url: {
                      url: Zn.image_url.url
                    }
                  } : null;
                }).filter(Zn => Zn != null),
                Wt = Pt ? [] : ZDa(Lr.filter(Zn => Zn.id !== Kr && (Zn.role === "user" || Zn.role === "assistant")).map(Zn => ({
                  id: Zn.id,
                  role: Zn.role,
                  content: Zn.role === "user" ? f0e(Zn.content, Zn.quotedFrom) : Zn.content,
                  files: Zn.files,
                  toolSteps: Zn.toolSteps,
                  agentStatus: Zn.agentStatus,
                  agentPendingChoice: Zn.agentPendingChoice
                })));
              let Jt,
                Nn,
                En = $a.agentReferencePool;
              try {
                if (s && (s.current.clear(), JN(bt))) {
                  const Et = lJ(cr.getState().projectId);
                  for (const zn of (Et == null ? void 0 : Et.nodeIdContext.createdGenNodeIds) ?? []) s.current.add(zn);
                }
                o && (o.current = Pt || CGn(rr) === "redesign"), Pt || (await xYe().catch(() => {}));
                const Zn = Pt ? null : await P7t(Ft),
                  Sr = Pt ? [] : [...vp().map(Et => ({
                    id: Et.id,
                    name: Et.name,
                    content: Et.content
                  })), ...(Zn && Yhe(Zn.id) ? [Zn] : [])],
                  Bn = Pt ? [] : [...vp().slice(0, 12).map(Et => ({
                    id: Et.id,
                    name: Et.name,
                    summary: Et.content.replace(/\s+/g, " ").slice(0, 80)
                  })), ...vYe().slice(0, rHn).map(Et => ({
                    id: Et.id,
                    name: Et.name,
                    summary: `${Et.category} · 本地浏览`
                  }))];
                Jt = await MLa({
                  companionInstructions: dt,
                  omitCanvasPromptContext: Pt,
                  bridge: cr,
                  baseUrl: jn,
                  apiKey: wr,
                  modelName: (ta == null ? void 0 : ta.modelName) || gn,
                  userText: rr,
                  userParts: vr.length > 0 ? vr : void 0,
                  historyMessages: Wt,
                  historyLimit: Pt ? 0 : ur ? Number.MAX_SAFE_INTEGER : Math.max(ke, fOa),
                  genPrefs: ze,
                  skillHints: Pt ? [] : Bn.map(Et => `${Et.name}：${Et.summary}`),
                  skillCatalog: Bn,
                  availableSkills: Sr,
                  activeSkill: Pt ? null : Zn,
                  creativeProject: Pt ? null : $a.agentCreativeProject,
                  productionScope: Pt || kr == null ? void 0 : kr.scope,
                  canvasReferenceNodeIds: Pt || Bt == null ? void 0 : Bt.canvasReferenceNodeIds,
                  chatImageAssets: (r == null ? void 0 : r.current) ?? [],
                  contextLog: Pt ? void 0 : $a.agentContextLog,
                  referencePool: Pt ? void 0 : $a.agentReferencePool,
                  memorySessionId: Pt ? void 0 : Ir.id,
                  apiProtocol: ki,
                  nativeChat: ta == null ? void 0 : ta.nativeChat,
                  webSearchEnabled: W && (mt || wM(gn, ta == null ? void 0 : ta.modelName)),
                  reasoningEffort: mt ? de : F2(gn, de, (ta == null ? void 0 : ta.modelName) || gn),
                  fileWorkspaceRoot: y0e(Ir.id, $a.localSkillRootPath) || q2e() || void 0,
                  signal: br.signal,
                  callbacks: {
                    onStatus: (Et, zn) => {
                      const Mn = Yr => {
                        var aa, wa;
                        return !!(Yr && !Yr.resolvedChoiceId && ((((aa = Yr.choices) == null ? void 0 : aa.length) ?? 0) > 0 || (((wa = Yr.questions) == null ? void 0 : wa.length) ?? 0) > 0));
                      };
                      if (kr) {
                        Et === "waiting_choice" ? kr = Ug(kr, "waiting_approval", zn || "等待用户批准") : Et === "executing" && (kr = Ug(kr, "running", zn || "正在执行生产操作"));
                        const Yr = Qe.pendingChoice || va.agentPendingChoice;
                        Mr({
                          ...va,
                          agentProductionRun: kr,
                          ...(Mn(Yr) ? {
                            agentPendingChoice: Yr,
                            agentStatus: "waiting_choice"
                          } : {})
                        });
                      }
                      const or = Mn(Qe.pendingChoice) || Mn(va.agentPendingChoice);
                      if (Qe.status = or && Et !== "done" && Et !== "waiting_choice" ? "waiting_choice" : Et, zn === void 0 ? Qe.clearStatusDetail = !0 : (Qe.clearStatusDetail = !1, Qe.statusDetail = zn || void 0), Et === "done" && (Qe.clearPendingStep = !0), Qn(Et === "done" || Et === "waiting_choice"), Et === "done" || Et === "waiting_choice") try {
                        window.dispatchEvent(new CustomEvent("canvasAgentTaskSettled", {
                          detail: {
                            status: Et
                          }
                        }));
                      } catch {}
                    },
                    onCodexUsage: Et => je({
                      codexUsage: Et
                    }),
                    onReasoning: Et => {
                      Qe.reasoningChunks.push(Et), Qn();
                    },
                    onTextDraft: Et => {
                      const zn = Et.trim();
                      zn && (Qe.textDraft = zn, Qn());
                    },
                    onMindTrace: Et => {
                      const zn = Qe.mindById.get(Et.id);
                      Qe.mindById.set(Et.id, zn ? {
                        ...zn,
                        ...Et
                      } : Et), Qn();
                    },
                    onToolStepStart: Et => {
                      Qe.pendingStep = Et, Qe.clearPendingStep = !1, Qe.statusDetail = Et.summary, Qe.clearStatusDetail = !1, Qn();
                    },
                    onToolStep: Et => {
                      kr && (kr = NJn(kr, Et, cr.getState().stateVersion), ex(kr), R5({
                        run: kr,
                        sessionId: Ir.id,
                        canvasStateVersion: cr.getState().stateVersion
                      }), Mr({
                        ...va,
                        agentProductionRun: kr
                      })), Qe.toolSteps.push(Et), Qe.clearPendingStep = !0, Qn();
                    },
                    onTextUpdate: Et => {
                      var wa;
                      cn();
                      const zn = Et.trim(),
                        Mn = va,
                        or = ((wa = Mn.agentPlanContent) == null ? void 0 : wa.trim()) || "",
                        mr = ude(or) || ude(Mn.content || ""),
                        Yr = !zn || zn === "已完成。";
                      if (Yr && mr) {
                        Mr({
                          ...Mn,
                          content: or || Mn.content,
                          contentFolded: !1,
                          agentStatus: "waiting_choice",
                          agentPendingChoice: void 0,
                          agentPendingStep: void 0,
                          agentStatusDetail: void 0
                        });
                        return;
                      }
                      let aa = zn;
                      or && zn && zn !== or && !zn.startsWith(or) ? aa = `${or}

---

${zn}` : Yr && or && (aa = or), Mr({
                        ...Mn,
                        content: aa,
                        contentFolded: !1,
                        agentStatus: "done",
                        agentPendingChoice: void 0,
                        agentPendingStep: void 0,
                        agentStatusDetail: void 0,
                        agentEndedAt: Mn.agentEndedAt || Date.now(),
                        agentMindCollapsed: !0
                      });
                    },
                    onCreativeProjectUpdate: Et => {
                      Kt = Et, kr && (kr = H1t(kr, Et)), Mr({
                        ...va,
                        agentCreativeProject: Et,
                        agentProductionRun: kr
                      });
                    },
                    onReferencePoolUpdate: Et => {
                      En = Et, Ge(zn => zn.map(Mn => Mn.id === qn ? {
                        ...Mn,
                        agentReferencePool: Et
                      } : Mn));
                    },
                    onUserChoice: Et => new Promise((zn, Mn) => {
                      if (br.signal.aborted) {
                        Mn(new DOMException("Aborted", "AbortError"));
                        return;
                      }
                      const or = () => {
                        fe.current.delete(Ir.id), Mn(new DOMException("Aborted", "AbortError"));
                      };
                      Qe.status = "waiting_choice", Qe.pendingChoice = {
                        toolCallId: Et.toolCallId,
                        question: Et.question,
                        choices: Et.choices,
                        choiceType: Et.choiceType,
                        questions: Et.questions
                      }, Qe.clearPendingChoice = !1, Qe.statusDetail = Et.question, Qe.clearStatusDetail = !1, kr && (kr = q7a(kr, Et), Mr({
                        ...va,
                        agentProductionRun: kr,
                        agentStatus: "waiting_choice",
                        agentPendingChoice: Qe.pendingChoice,
                        agentStatusDetail: Et.question
                      })), br.signal.addEventListener("abort", or, {
                        once: !0
                      }), fe.current.set(Ir.id, mr => {
                        br.signal.removeEventListener("abort", or), kr && (kr = K7a(kr, Et.toolCallId, mr)), Mr({
                          ...va,
                          ...(kr ? {
                            agentProductionRun: kr
                          } : {}),
                          agentStatus: "thinking",
                          agentPendingChoice: va.agentPendingChoice ? {
                            ...va.agentPendingChoice,
                            resolvedChoiceId: mr
                          } : va.agentPendingChoice
                        }), zn(mr);
                      }), Qn(!0);
                    })
                  }
                }), cn();
              } catch (Zn) {
                if (cn(), Zn instanceof Error && Zn.name === "AbortError") {
                  kr && (kr = Ug(kr, "paused", "用户暂停了生产任务")), Hn(cfe({
                    ...va,
                    agentProductionRun: kr
                  }, "已取消。"), kr ? {
                    agentProductionRun: kr
                  } : void 0), fe.current.delete(Ir.id);
                  return;
                }
                throw kr && (kr = Ug({
                  ...kr,
                  lastError: Zn instanceof Error ? Zn.message : "执行失败"
                }, "failed", Zn instanceof Error ? Zn.message : "执行失败"), Mr({
                  ...va,
                  agentProductionRun: kr
                })), Zn;
              } finally {
                Mt && (clearTimeout(Mt), Mt = null), o && (o.current = !1), s && s.current.clear(), (fa = cr.setRedesignDirectionGate) == null || fa.call(cr, !1), Nn = WLa({
                  userText: rr,
                  toolSteps: (Jt == null ? void 0 : Jt.toolSteps) ?? va.toolSteps ?? [],
                  confirmedChoices: (Jt == null ? void 0 : Jt.runContext.userChoices) ?? [],
                  attachmentNames: ((r == null ? void 0 : r.current) ?? []).map(Zn => Zn.name || "").filter(Boolean),
                  previousLog: $a.agentContextLog,
                  standingBrief: Jt == null ? void 0 : Jt.runContext.standingBrief
                }), Jt != null && Jt.runContext.referencePool && (En = Jt.runContext.referencePool);
              }
              kr && (kr = fXe(kr)), Jt && kr && (kr = Q7a({
                run: kr,
                runContext: Jt.runContext,
                project: Kt
              }), ex(kr), R5({
                run: kr,
                sessionId: Ir.id,
                canvasStateVersion: cr.getState().stateVersion
              }), Mr({
                ...va,
                agentProductionRun: kr
              })), Hn(va, {
                agentCreativeProject: Kt,
                agentProductionRun: kr,
                ...(Nn ? {
                  agentContextLog: Nn
                } : {}),
                ...(En ? {
                  agentReferencePool: En
                } : {})
              }), (Jt == null ? void 0 : Jt.runContext.completion.status) === "verified" && ir((Ca = Jt.runContext.executionSummary) == null ? void 0 : Ca.submittedNodeIds);
              return;
            }
            if (wn === "local-skill") {
              const xn = y0e(Ir.id, $a.localSkillRootPath);
              if (!xn) throw new Error("请先选择本地 Skill 目录");
              k2e(xn).catch(En => {
                console.warn("[localSkill] asset scope:", En);
              }), clearTimeout(Jr);
              const Fn = xn.replace(/\\/g, "/").split("/").filter(Boolean).pop() || "Local Skill";
              je({
                agentStatus: "thinking",
                toolSteps: [],
                agentReasoning: void 0,
                agentPendingStep: void 0,
                agentStatusDetail: void 0,
                agentMindTrace: [],
                agentStartedAt: Date.now(),
                agentEndedAt: void 0,
                appliedSkillName: Fn,
                agentMindCollapsed: !1,
                localSkillEdits: []
              });
              const cr = pa.map(En => {
                  var Zn;
                  return En.type === "text" && En.text ? {
                    type: "text",
                    text: En.text
                  } : En.type === "image_url" && ((Zn = En.image_url) != null && Zn.url) ? {
                    type: "image_url",
                    image_url: {
                      url: En.image_url.url
                    }
                  } : null;
                }).filter(En => En != null),
                vr = Lr.filter(En => En.id !== Kr && (En.role === "user" || En.role === "assistant")).map(En => ({
                  ...En,
                  content: En.role === "user" ? f0e(En.content, En.quotedFrom) : En.content
                })),
                Wt = [];
              let Jt = !1,
                Nn;
              try {
                const En = await $Rt({
                  companionInstructions: dt,
                  rootPath: xn,
                  baseUrl: jn,
                  apiKey: wr,
                  modelName: (ta == null ? void 0 : ta.modelName) || gn,
                  userText: rr,
                  userParts: cr.length > 0 ? cr : void 0,
                  historyMessages: vr,
                  contextLog: $a.agentContextLog,
                  memorySessionId: Ir.id,
                  apiProtocol: ki,
                  nativeChat: ta == null ? void 0 : ta.nativeChat,
                  modelCapabilities: ta == null ? void 0 : ta.chatCapabilities,
                  channelGroups: ta == null ? void 0 : ta.channelGroups,
                  webSearchEnabled: W && (mt || wM(gn, ta == null ? void 0 : ta.modelName)),
                  reasoningEffort: mt ? de : F2(gn, de, (ta == null ? void 0 : ta.modelName) || gn),
                  permission: De.current,
                  skillId: ERt(xn),
                  projectId: (($n = n == null ? void 0 : n.current) == null ? void 0 : $n.getState().projectId) ?? null,
                  executeCanvasAction: async ({
                    action: Zn,
                    payload: Sr
                  }) => {
                    if ((l == null ? void 0 : l.current) !== Gr) throw new Error("画布已切换，本轮工具不能操作其他画布");
                    const Bn = n == null ? void 0 : n.current;
                    if (!Bn) return {
                      ok: !1,
                      error: "画布未连接",
                      summary: "画布未连接"
                    };
                    try {
                      const Et = await Bn.executeAction({
                        action: Zn,
                        payload: Sr
                      });
                      return {
                        ok: Et.ok !== !1,
                        error: Et.error,
                        summary: Et.ok === !1 ? Et.error || "画布操作失败" : Et.hint || Zn,
                        content: Et
                      };
                    } catch (Et) {
                      const zn = Et instanceof Error ? Et.message : String(Et);
                      return {
                        ok: !1,
                        error: zn,
                        summary: zn
                      };
                    }
                  },
                  readCanvasNode: Zn => {
                    var Bn;
                    const Sr = (Bn = n == null ? void 0 : n.current) == null ? void 0 : Bn.getState().nodes.find(Et => Et.id === Zn);
                    return Sr ? Sr.isGenerating ? {
                      status: "generating"
                    } : Sr.errorMsg ? {
                      status: "failed",
                      error: String(Sr.errorMsg)
                    } : Sr.hasOutput ? {
                      status: "ready"
                    } : {
                      status: "generating"
                    } : {
                      status: "missing"
                    };
                  },
                  signal: br.signal,
                  callbacks: {
                    onStatus: (Zn, Sr) => {
                      Qe.status = Zn, Sr === void 0 ? Qe.clearStatusDetail = !0 : (Qe.clearStatusDetail = !1, Qe.statusDetail = Sr || void 0), Zn === "done" && (Qe.clearPendingStep = !0), Qn(Zn === "done" || Zn === "waiting_choice");
                    },
                    onCodexUsage: Zn => je({
                      codexUsage: Zn
                    }),
                    onReasoning: Zn => {
                      Qe.reasoningChunks.push(Zn), Qn();
                    },
                    onTextDraft: Zn => {
                      const Sr = Zn.trim();
                      Sr && (Qe.textDraft = Sr, Qn());
                    },
                    onMindTrace: Zn => {
                      const Sr = Qe.mindById.get(Zn.id);
                      Qe.mindById.set(Zn.id, Sr ? {
                        ...Sr,
                        ...Zn
                      } : Zn), Qn();
                    },
                    onToolStepStart: Zn => {
                      Qe.pendingStep = Zn, Qe.clearPendingStep = !1, Qe.statusDetail = Zn.summary, Qe.clearStatusDetail = !1, Qn();
                    },
                    onToolStep: Zn => {
                      Qe.toolSteps.push(Zn), Qe.clearPendingStep = !0, Qn();
                    },
                    onFileEdit: Zn => {
                      Wt.push(Zn), Mr({
                        ...va,
                        localSkillEdits: [...Wt]
                      });
                    },
                    onContextLogUpdate: Zn => {
                      Nn = Zn;
                    },
                    onTextUpdate: Zn => {
                      cn(), Mr({
                        ...va,
                        content: Zn.trim() || va.content,
                        contentFolded: !1,
                        agentStatus: "done",
                        agentPendingChoice: void 0,
                        agentPendingStep: void 0,
                        agentStatusDetail: void 0,
                        agentEndedAt: va.agentEndedAt || Date.now(),
                        agentMindCollapsed: !0,
                        localSkillEdits: [...Wt]
                      });
                    },
                    onUserChoice: Zn => new Promise((Sr, Bn) => {
                      if (br.signal.aborted) {
                        Bn(new DOMException("Aborted", "AbortError"));
                        return;
                      }
                      const Et = () => {
                        fe.current.delete(Ir.id), Bn(new DOMException("Aborted", "AbortError"));
                      };
                      br.signal.addEventListener("abort", Et, {
                        once: !0
                      }), fe.current.set(Ir.id, zn => {
                        br.signal.removeEventListener("abort", Et), Sr(zn);
                      }), Qe.status = "waiting_choice", Qe.pendingChoice = {
                        toolCallId: Zn.toolCallId,
                        question: Zn.question,
                        choices: Zn.choices,
                        choiceType: Zn.choiceType,
                        questions: Zn.questions
                      }, Qe.clearPendingChoice = !1, Qe.statusDetail = Zn.question, Qe.clearStatusDetail = !1, Qn(!0);
                    })
                  }
                });
                cn(), Nn = En.contextLog || Nn, Jt = ["completed", "answered"].includes(En.outcome || "completed"), En.edits.length > Wt.length && Wt.splice(0, Wt.length, ...En.edits);
              } catch (En) {
                if (En instanceof DOMException && En.name === "AbortError") {
                  Hn(cfe({
                    ...va,
                    localSkillEdits: [...Wt]
                  })), fe.current.delete(Ir.id);
                  return;
                }
                throw En;
              } finally {
                Mt && (clearTimeout(Mt), Mt = null);
              }
              Hn({
                ...va,
                localSkillEdits: [...Wt]
              }, Nn ? {
                agentContextLog: Nn
              } : void 0), Jt && ir();
              return;
            }
            const Lt = W && (mt || wM(gn, ta == null ? void 0 : ta.modelName)),
              ct = ba.length > 0,
              Dt = ki === "responses",
              bn = !An && !(ta != null && ta.nativeChat) && !Oce(ta == null ? void 0 : ta.modelName) && !Oce(gn) && (Dt || Lt && !ct),
              Rt = (ta == null ? void 0 : ta.modelName) || "gemini-3-pro-preview",
              fn = F2(gn, de, Rt),
              Zt = async (xn, Fn) => {
                var aa, wa, xa, Aa, pn, xr, Nr, qr, Oa, Fa, Ra, ui, pr, In;
                if (!xn.body) {
                  console.log("【Chat】ReadableStream 不可用，使用 JSON 解析...");
                  const fr = await xn.json();
                  ZH(xn, FF(fr.response || fr));
                  const na = Fn === "responses" ? hie(fr) : ((xa = (wa = (aa = fr.choices) == null ? void 0 : aa[0]) == null ? void 0 : wa.message) == null ? void 0 : xa.content) || "";
                  if (!na) throw new Error("AI 未返回有效内容");
                  $t(na);
                  const Ba = An ? Qqt(fr == null ? void 0 : fr.usage) : vn ? Wqt(fr == null ? void 0 : fr.usage) : null;
                  Hn(va, Ba ? {
                    officialContextUsage: Ba
                  } : void 0);
                  return;
                }
                console.log(`【Chat】开始接收流式响应（${Fn === "responses" ? "Responses" : "Chat Completions"}）...`);
                const cr = xn.body.getReader(),
                  vr = new TextDecoder("utf-8");
                let Wt = "",
                  Jt = "",
                  Nn = !0,
                  En = "",
                  Zn = "",
                  Sr = null,
                  Bn = null;
                const Et = () => {
                    Bn = null, Zn && $t(Zn);
                  },
                  zn = fr => {
                    Zn = fr, Bn == null && (Bn = setTimeout(Et, 80));
                  },
                  Mn = () => {
                    Bn != null && (clearTimeout(Bn), Bn = null), Zn && $t(Zn);
                  },
                  or = fr => {
                    var na, Ba, ai, vi, Vi, Ti;
                    return Fn === "responses" ? E0t(fr) : (ai = (Ba = (na = fr.choices) == null ? void 0 : na[0]) == null ? void 0 : Ba.delta) != null && ai.content ? fr.choices[0].delta.content : (Vi = (vi = fr.choices) == null ? void 0 : vi[0]) != null && Vi.text ? fr.choices[0].text : (Ti = fr.delta) != null && Ti.content ? fr.delta.content : fr.content ? fr.content : "";
                  };
                try {
                  for (;;) {
                    const {
                      done: fr,
                      value: na
                    } = await cr.read();
                    if (fr) break;
                    const Ba = vr.decode(na, {
                      stream: !0
                    });
                    Jt += Ba, Wt || (En += Ba);
                    const ai = Jt.split(`
`);
                    Jt = ai.pop() || "";
                    for (const vi of ai) {
                      const Vi = vi.trim();
                      if (!(!Vi || Vi === "data: [DONE]")) if (Vi.startsWith("data: ")) try {
                        const Ti = Vi.slice(6);
                        if (Ti === "[DONE]") continue;
                        const Gi = JSON.parse(Ti);
                        ZH(xn, FF(Gi.response || Gi)), Gi != null && Gi.usage && (Sr = Gi.usage);
                        const hi = or(Gi);
                        if (hi) {
                          const vo = Fn === "responses" ? C0t(Wt, hi) : Wt + hi;
                          vo !== Wt && (Wt = vo, En && (En = ""), zn(Wt));
                        }
                      } catch {} else Nn && !Vi.startsWith(":") && (Nn = !1);
                    }
                  }
                  if (Jt.trim() && Jt.trim().startsWith("data: ") && Jt.trim() !== "data: [DONE]") try {
                    const fr = JSON.parse(Jt.trim().slice(6));
                    ZH(xn, FF(fr.response || fr)), fr != null && fr.usage && (Sr = fr.usage);
                    const na = or(fr);
                    if (na) {
                      const Ba = Fn === "responses" ? C0t(Wt, na) : Wt + na;
                      Ba !== Wt && (Wt = Ba, zn(Wt));
                    }
                  } catch {}
                } finally {
                  cr.releaseLock(), Mn();
                }
                console.log(`【Chat】流式响应完成，共接收 ${Wt.length} 字符`);
                const mr = An ? Qqt(Sr) : vn ? Wqt(Sr) : null,
                  Yr = (Aa = Sr == null ? void 0 : Sr.prompt_tokens_details) == null ? void 0 : Aa.cached_tokens;
                if (Sr && (Sr.prompt_cache_hit_tokens != null || Sr.prompt_cache_miss_tokens != null || Yr != null) && console.log(`【Chat】上下文缓存 hit=${Sr.prompt_cache_hit_tokens ?? Yr ?? 0} miss=${Sr.prompt_cache_miss_tokens ?? 0} prompt=${Sr.prompt_tokens ?? 0}`), !Wt && En.trim()) {
                  console.log("【Chat】SSE 未解析到内容，尝试 JSON 降级解析...");
                  try {
                    const fr = JSON.parse(En),
                      na = Fn === "responses" ? hie(fr) : ((Nr = (xr = (pn = fr.choices) == null ? void 0 : pn[0]) == null ? void 0 : xr.message) == null ? void 0 : Nr.content) || fr.content || fr.text || (typeof fr.message == "string" ? fr.message : (qr = fr.message) == null ? void 0 : qr.content) || ((ui = (Ra = (Fa = (Oa = fr.data) == null ? void 0 : Oa.choices) == null ? void 0 : Fa[0]) == null ? void 0 : Ra.message) == null ? void 0 : ui.content) || ((pr = fr.data) == null ? void 0 : pr.content) || ((In = fr.data) == null ? void 0 : In.text) || null;
                    na && (Wt = na);
                  } catch {
                    console.warn("【Chat】JSON 降级解析也失败");
                  }
                }
                if (Wt) {
                  const fr = Fn === "responses" ? pie(Wt) : Wt;
                  $t(fr);
                } else throw new Error("AI 未返回有效内容");
                Hn(va, mr ? {
                  officialContextUsage: mr
                } : void 0), En = "", Jt = "", Wt = "";
              };
            if (bn) {
              const xn = dQe(jr),
                Fn = Lt;
              console.log(`【Chat】使用 Responses API${Fn ? "（联网）" : ""}，model=${Rt}`);
              const cr = async Wt => {
                const Jt = Wt.toolType ? kra(Rt, xn, Wt.toolType, {
                  stream: Wt.stream,
                  reasoningEffort: fn
                }) : RZ({
                  modelName: Rt,
                  input: xn,
                  stream: Wt.stream,
                  reasoningEffort: fn
                });
                return $i($Y(jn), {
                  method: "POST",
                  headers: {
                    ...(wr ? {
                      Authorization: `Bearer ${wr}`
                    } : {}),
                    "Content-Type": "application/json",
                    ...PBe(ure(jn, ta == null ? void 0 : ta.channelGroups, Rt))
                  },
                  body: JSON.stringify(fve({
                    ...Jt,
                    ...(sve(ta, jn) ? {
                      max_output_tokens: sve(ta, jn)
                    } : {})
                  }, ure(jn, ta == null ? void 0 : ta.channelGroups, Rt))),
                  signal: br.signal
                });
              };
              CBe(jr);
              try {
                jr.length = 0;
              } catch {}
              let vr = await cr({
                toolType: Fn ? "web_search_preview" : null,
                stream: !0
              });
              if (!vr.ok) {
                let Wt = await vr.text();
                if (Fn && z2e(vr.status, Wt) && (console.warn("【Chat】网关不识别 web_search_preview，重试 web_search..."), vr = await cr({
                  toolType: "web_search",
                  stream: !0
                }), vr.ok || (Wt = await vr.text())), !vr.ok && (Wt.toLowerCase().includes("stream") || vr.status === 400) && (console.warn("【Chat】Responses 流式失败，尝试非流式..."), vr = await cr({
                  toolType: Fn ? "web_search_preview" : null,
                  stream: !1
                }), vr.ok || (Wt = await vr.text(), Fn && z2e(vr.status, Wt) && (vr = await cr({
                  toolType: "web_search",
                  stream: !1
                }), vr.ok || (Wt = await vr.text())))), !vr.ok) if (console.error("【Chat】Responses API 错误响应:", vr.status, Wt), !Dt && Fn && F2e(vr.status, Wt)) console.warn("【Chat】当前网关不支持联网工具，自动回退到 chat/completions");else if (Dt && Fn && F2e(vr.status, Wt)) {
                  if (console.warn("【Chat】联网工具不可用，Responses 改为无工具重试..."), vr = await cr({
                    toolType: null,
                    stream: !0
                  }), !vr.ok && (Wt = await vr.text(), vr = await cr({
                    toolType: null,
                    stream: !1
                  }), !vr.ok)) throw Wt = await vr.text(), clearTimeout(Jr), new Error(Wt || `API 错误: ${vr.status}`);
                } else throw clearTimeout(Jr), new Error(Wt || `API 错误: ${vr.status}`);
              }
              if (vr.ok) {
                clearTimeout(Jr);
                const Wt = (vr.headers.get("content-type") || "").toLowerCase();
                if (Wt.includes("application/json") && !Wt.includes("text/event-stream")) {
                  const Nn = await vr.json(),
                    En = hie(Nn);
                  if (ZH(vr, FF(Nn.response || Nn)), !En) throw new Error("AI 未返回有效内容");
                  $t(En), Hn(va);
                } else await Zt(vr, "responses");
                ir();
                return;
              }
            }
            const Ln = An ? u9n(jr) : dFn(jr),
              tt = sx({
                model: Rt,
                messages: Ln,
                stream: !0
              }, fn, {
                modelId: (ta == null ? void 0 : ta.id) || gn,
                baseUrl: jn
              }),
              zt = Array.isArray(tt.messages) ? tt.messages.length : 0;
            if (console.log(`【Chat】请求 messages: ${zt} 条`, An ? "小米格式" : ""), zt === 0) throw new Error("消息内容为空，未发送请求");
            CBe(jr);
            try {
              jr.length = 0;
            } catch {}
            const an = xn => {
                const Fn = sve(ta, jn);
                Fn && (xn = {
                  ...xn,
                  max_tokens: Fn
                });
                const cr = typeof xn.group == "string" ? xn.group : void 0,
                  vr = qw(jn),
                  Wt = cr ? `${vr}${vr.includes("?") ? "&" : "?"}group=${encodeURIComponent(cr)}` : vr,
                  Jt = JSON.stringify(xn);
                return E5(Wt, {
                  method: "POST",
                  headers: {
                    ...(An ? rhe(wr) : {
                      ...(wr ? {
                        Authorization: `Bearer ${wr}`
                      } : {}),
                      "Content-Type": "application/json"
                    }),
                    ...PBe(cr)
                  },
                  body: Jt,
                  signal: br.signal
                }, An || ta == null ? void 0 : ta.nativeChat);
              },
              Rn = !!(ta != null && ta.isCustom || ta != null && ta.apiProviderId);
            let Un = ure(jn, ta == null ? void 0 : ta.channelGroups, Rt),
              er = !0,
              Cr = await an(fve({
                ...tt,
                stream: er
              }, Un)),
              tr = Cr.status,
              kn = "";
            for (let xn = 0; xn < 3 && !Cr.ok; xn++) {
              tr = Cr.status, kn = await Cr.text(), console.error("【Chat】API 错误响应:", tr, kn);
              const Fn = YFn(Dna(kn));
              if (Fn && Fn !== Un) Un = Fn;else if (er) er = !1, Un || (Un = Fn || ure(jn, ["origin"]));else break;
              Cr = await an(fve({
                ...tt,
                stream: er
              }, Un));
            }
            if (!Cr.ok) throw kn || (kn = await Cr.text()), new Error(RRa(tr || Cr.status, kn, Rn));
            clearTimeout(Jr), await Zt(Cr, "chat"), ir();
          } catch (Lt) {
            clearTimeout(Jr);
            const ct = Lt instanceof Error && Lt.name === "AbortError";
            if (ct && br.signal.reason === _6e) {
              Hn(cfe(va));
              return;
            }
            throw Ge(bn => bn.map(Rt => Rt.id === Ir.id ? {
              ...Rt,
              messages: Rt.messages.filter(fn => fn.id !== Kr)
            } : Rt)), ct ? new Error("请求超时（30分钟），请检查网络连接") : Lt;
          }
        } catch (yr) {
          console.error("【Chat】发送消息失败:", yr);
          const Ir = yr instanceof Error ? yr.message : "发送失败，请重试",
            Gr = {
              id: Fi(),
              role: "assistant",
              content: `${gwt} ${Ir}`,
              modelId: gn,
              timestamp: Date.now()
            };
          Ge(Zr => Zr.map(La => La.id === qn ? {
            ...La,
            messages: [...La.messages, Gr]
          } : La));
        } finally {
          console.log("【Chat】消息发送完成，重置发送状态"), re.current.get(Dn) === Ar ? (re.current.delete(Dn), Z.current.delete(Dn), Ye(), PL(null, Dn), fe.current.delete(Dn)) : !Ar && !re.current.has(Dn) && (Z.current.delete(Dn), Ye());
        }
      }, [I, B, z, N, O, W, q, de, pe, we, e, t, ke, Te, ze, He, it, Ft, n, lt, Ge, Ye]),
      Vn = g.useCallback(async bt => {
        if (Z.current.has(I)) {
          console.warn("【Chat】当前对话正在发送中，请稍候...");
          return;
        }
        const wn = (await lt()).find(yn => yn.id === I);
        if (!wn) return;
        const at = wn.messages.findIndex(yn => yn.id === bt);
        if (at <= 0) return;
        const Pt = wn.messages[at];
        if (!ser(Pt)) return;
        const dt = wn.messages[at - 1];
        if (dt.role !== "user") return;
        const xt = wn.messages.filter(yn => yn.id !== bt);
        await en(dt.content, {
          filesOverride: dt.files || [],
          skipUserMessageAppend: !0,
          historyMessagesOverride: xt,
          removeErrorMessageId: bt,
          userMessageId: dt.id
        });
      }, [I, lt, en]),
      Tt = g.useCallback(() => {
        var at;
        const bt = I;
        (at = re.current.get(bt)) == null || at.abort(_6e), fe.current.delete(bt), Z.current.delete(bt), Ye();
        const Bt = cit(bt),
          wn = Bt == null ? void 0 : Bt.message;
        PL(null, bt), Ge(Pt => Pt.map(dt => {
          var gn, mt;
          if (dt.id !== bt) return dt;
          const xt = [...dt.messages];
          let yn = dt.agentProductionRun;
          for (let Xt = xt.length - 1; Xt >= 0; Xt -= 1) {
            const Gn = xt[Xt];
            if (Gn.role !== "assistant") continue;
            const rr = wn && wn.id === Gn.id ? {
              ...Gn,
              ...wn
            } : Gn;
            if (rr.agentStatus === "thinking" || rr.agentStatus === "executing" || rr.agentStatus === "waiting_choice" || rr.agentStatus !== "done" && !((gn = rr.content) != null && gn.trim()) || wn && wn.id === Gn.id) {
              rr.agentProductionRun && (yn = Ug({
                ...rr.agentProductionRun,
                pendingToolCalls: ((mt = lJ(rr.agentProductionRun.projectId)) == null ? void 0 : mt.pendingToolCalls) ?? rr.agentProductionRun.pendingToolCalls
              }, "paused", "用户暂停了生产任务"), ex(yn), CLt({
                runId: yn.id
              }), R5({
                run: yn,
                sessionId: bt
              })), xt[Xt] = cfe({
                ...rr,
                agentProductionRun: yn
              });
              break;
            }
          }
          return {
            ...dt,
            messages: xt,
            agentProductionRun: yn
          };
        }));
      }, [I, Ge, Ye]),
      Ue = g.useCallback(() => {
        const bt = _.current.find(wn => wn.id === M.current) || _.current.find(u);
        if (!!!(bt != null && bt.messages.some(wn => String(wn.content || "").trim() && !KNe(wn.content)))) {
          qi("请先开始对话");
          return;
        }
        Te !== "skill" && qe("skill"), en(hXn);
      }, [Te, en, qe]);
    g.useEffect(() => {
      const bt = Pt => {
          var yn;
          if (!Pt) return !0;
          const xt = (w.current.length > 0 ? w.current : _.current).find(gn => gn.id === M.current);
          return xt ? ((yn = xt.agentProductionRun) == null ? void 0 : yn.id) === Pt || xt.messages.some(gn => {
            var mt;
            return ((mt = gn.agentProductionRun) == null ? void 0 : mt.id) === Pt;
          }) : !1;
        },
        Bt = Pt => {
          var xt;
          const dt = String(((xt = Pt.detail) == null ? void 0 : xt.runId) || "").trim();
          bt(dt) && Tt();
        },
        wn = Pt => {
          var yn;
          const dt = String(((yn = Pt.detail) == null ? void 0 : yn.runId) || "").trim();
          if (!bt(dt)) return;
          dt && Cze({
            runId: dt
          });
          const xt = "继续";
          if ($ae(!0), Te !== "agent") {
            qe("agent"), wW(xt);
            return;
          }
          en(xt);
        };
      window.addEventListener("productionRunPauseRequested", Bt), window.addEventListener("productionRunResumeRequested", wn);
      const at = Pt => {
        const dt = Pt.detail,
          xt = String((dt == null ? void 0 : dt.brief) || "").trim(),
          yn = dt == null ? void 0 : dt.canvasReferenceNodeIds;
        if (xt) {
          if ($ae(!0), Te !== "agent") {
            St.current = {
              brief: xt,
              canvasReferenceNodeIds: yn
            }, qe("agent"), wW(xt);
            return;
          }
          en(xt, {
            canvasReferenceNodeIds: yn,
            filesOverride: []
          });
        }
      };
      return window.addEventListener("productionRecipeRunRequested", at), () => {
        window.removeEventListener("productionRunPauseRequested", Bt), window.removeEventListener("productionRunResumeRequested", wn), window.removeEventListener("productionRecipeRunRequested", at);
      };
    }, [Tt, Te, en, qe]), g.useEffect(() => {
      if (Te !== "agent") return;
      const bt = St.current;
      bt && (St.current = null, wW(""), en(bt.brief, {
        canvasReferenceNodeIds: bt.canvasReferenceNodeIds,
        filesOverride: []
      }));
    }, [Te, en]);
    const et = g.useCallback(bt => {
        Czn(bt), Xe(bt);
        const Bt = M.current;
        Ge(wn => {
          const at = wn.map(Pt => Pt.id === Bt ? {
            ...Pt,
            localSkillPermission: bt
          } : Pt);
          return pt(at), at;
        });
      }, [pt, Ge]),
      ft = g.useCallback(async () => {
        const bt = await _Be();
        if (!bt) return;
        const Bt = M.current;
        wYt(Bt, bt), k2e(bt).catch(wn => {
          console.warn("[localSkill] asset scope:", wn);
        }), Ge(wn => {
          const at = wn.map(Pt => Pt.id === Bt ? {
            ...Pt,
            localSkillRootPath: bt,
            mode: Pt.mode ?? "local-skill"
          } : Pt);
          return A6e(at, bt), pt(at), at;
        });
      }, [pt, Ge]),
      ht = g.useCallback(async (bt, Bt) => {
        var wn;
        try {
          await L9t(Bt);
          const at = w.current.find(dt => dt.id === M.current),
            Pt = ((wn = at == null ? void 0 : at.messages.find(dt => dt.id === bt)) == null ? void 0 : wn.localSkillEdits) || [];
          st(bt, {
            localSkillEdits: Pt.map(dt => dt.undoId === Bt ? {
              ...dt,
              undone: !0
            } : dt)
          });
        } catch (at) {
          alert(at instanceof Error ? x(at.message) : x(String(at)));
        }
      }, [st]),
      wt = g.useCallback(async bt => {
        try {
          await SIe(bt);
        } catch (Bt) {
          alert(Bt instanceof Error ? x(Bt.message) : x(String(Bt)));
        }
      }, []),
      jt = g.useCallback(bt => {
        Ge(Bt => {
          const wn = Bt.filter(u),
            at = typeof bt == "function" ? bt(wn) : bt;
          return [...Bt.filter(Pt => !u(Pt)), ...N4e(at, Bt).filter(u)];
        });
      }, [Ge, d]);
    return {
      chatSessions: p.filter(u),
      setChatSessions: jt,
      currentChatId: I,
      setCurrentChatId: kt,
      setIsChatOpen: $ae,
      chatWidth: T,
      setChatWidth: P,
      chatFontSize: R,
      setChatFontSize: j,
      chatModel: Me,
      setChatModel: U,
      chatPlatformGroup: N,
      setChatPlatformGroup: H,
      localSkillChatModel: Re,
      setLocalSkillChatModel: Y,
      localSkillPlatformGroup: O,
      setLocalSkillPlatformGroup: K,
      chatWebSearchEnabled: W,
      setChatWebSearchEnabled: Q,
      chatApiProtocol: rt,
      setChatApiProtocol: nt,
      chatReasoningEffort: de,
      setChatReasoningEffort: J,
      chatUseAliyunOss: pe,
      setChatUseAliyunOss: ce,
      chatOssImageBase64: we,
      setChatOssImageBase64: X,
      isChatSending: ae,
      sendingChatSessionIds: ye,
      isResizingChat: ue,
      setIsResizingChat: ge,
      historyMessageCount: ke,
      setHistoryMessageCount: ve,
      chatPanelMode: Te,
      setChatPanelMode: qe,
      chatAgentGenPrefs: ze,
      setChatAgentGenPrefs: He,
      resolveAgentChoice: Oe,
      patchChatMessage: st,
      activeAgentSkill: Ft,
      bindLocalSkillRoot: ft,
      addLocalSkillWorkspace: Pn,
      openLocalSkillWorkspace: rn,
      removeLocalSkillWorkspace: Cn,
      localSkillWorkspaces: un,
      localSkillPermission: Ke,
      setLocalSkillPermission: et,
      undoLocalSkillEdit: ht,
      reviewLocalSkillFile: wt,
      deleteChatSession: Qt,
      deleteChatMessages: Ot,
      createNewChat: ln,
      renameChatSession: Jn,
      sendChatMessage: en,
      startSkillCreatorFromChat: Ue,
      cancelChatSend: Tt,
      resendChatMessage: Vn,
      appendLocalChatMessage: Kn,
      handleChatResizeStart: hn,
      sessionsForCurrentMode: Ut,
      chatSessionsForHistory: _t,
      chatSessionLastTsById: At,
      selectChatSession: kt
    };
  };

Hu.setOptions({
  breaks: !0,
  gfm: !0
});

function ZN(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function xOa(e) {
  return ZN(e).replace(/\r\n?/g, `
`).replace(/\n/g, "<br>");
}

Hu.use({
  renderer: {
    html(e) {
      return ZN(e.text);
    },
    link(e) {
      return this.parser.parseInline(e.tokens);
    },
    code(e) {
      var a;
      const t = ZN(e.text),
        n = (a = e.lang) == null ? void 0 : a.trim();
      return ['<div class="chat-md-code-card">', '<div class="chat-md-code-head">', `<span class="chat-md-code-label">${n ? ZN(n) : "内容"}</span>`, '<button type="button" class="chat-md-code-copy" data-chat-block-copy title="复制此段" aria-label="复制此段">', '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>', "<span>复制</span>", "</button>", "</div>", `<pre><code>${t}</code></pre>`, "</div>"].join("");
    }
  }
});

const _Oa = 128,
  tan = 48,
  kOa = 240,
  zie = e => {
    try {
      return Hu.parse(e);
    } catch {
      return e;
    }
  };

function I6e(e, t) {
  if (!e || !t) return !1;
  const n = e.nodeType === Node.TEXT_NODE ? e.parentElement : e;
  return !!(n != null && n.closest("[data-chat-copy-zone]"));
}

function nan(e) {
  if (!e) return [];
  const t = r => `${r.name}:${r.size}:${r.lastModified}`,
    n = r => {
      const a = new Set(),
        i = [];
      for (const o of r) {
        const s = t(o);
        a.has(s) || (a.add(s), i.push(o));
      }
      return i;
    };
  try {
    const r = [];
    for (const a of Array.from(e.items || [])) {
      if (a.kind !== "file") continue;
      const i = a.getAsFile();
      i && r.push(i);
    }
    return r.length > 0 ? n(r) : n(Array.from(e.files || []));
  } catch {
    return [];
  }
}

async function AOa(e, t, n) {
  var d, u;
  if (t >= my) {
    alert(x("最多只能上传{0}个文件，当前已有{1}个", my, t));
    return;
  }
  const r = e.canvasMediaKind === "video" || ((d = e.materialAsset) == null ? void 0 : d.kind) === "video",
    a = !r,
    i = ((u = e.materialAsset) == null ? void 0 : u.name) || e.name || (r ? "video.mp4" : "image.png"),
    o = e.materialAsset ? sCe(e.materialAsset.name) : r ? "video/mp4" : "image/png",
    s = `pending_at_${Date.now()}_${t + 1}`,
    l = tP(e.thumbnailUrl) || e.thumbnailUrl || "";
  l && n(h => h.length >= my ? h : [...h, {
    name: i,
    displayName: i,
    type: o,
    preview: l,
    isImage: a,
    isVideo: r,
    _pendingToken: s
  }]);
  try {
    let h = e.canvasImageUrl || e.thumbnailUrl || "",
      p = e.canvasAssetId;
    if (!e.fromCanvas && e.materialAsset) {
      const {
          resolveMaterialLibraryAssetForCanvas: f
        } = await Ie(async () => {
          const {
            resolveMaterialLibraryAssetForCanvas: _
          } = await Promise.resolve().then(() => U1);
          return {
            resolveMaterialLibraryAssetForCanvas: _
          };
        }, void 0, import.meta.url),
        y = await f(e.materialAsset);
      h = (y == null ? void 0 : y.content) || h;
      const b = (y == null ? void 0 : y.settingsExtras) || {},
        v = typeof b._assetId == "string" && b._assetId || typeof b._contentAssetId == "string" && b._contentAssetId || "";
      v && (p = v);
    }
    const m = await pFn({
      sourceUrl: h,
      assetId: p,
      seededPreview: tP(l) || void 0,
      name: i,
      isImage: a,
      isVideo: r,
      mimeType: o,
      index: Date.now() % 1e5
    });
    if (!m) {
      n(f => f.filter(y => y._pendingToken !== s)), alert(x("无法添加「{0}」，请稍后重试。", i));
      return;
    }
    n(f => {
      const y = {
          name: m.name,
          displayName: m.displayName,
          type: m.type,
          _assetId: m._assetId,
          preview: m.preview,
          isImage: m.isImage,
          isVideo: m.isVideo,
          isAudio: m.isAudio,
          fileExt: m.fileExt
        },
        b = f.findIndex(v => v._pendingToken === s);
      if (b >= 0) {
        const v = [...f];
        return v[b] = y, v;
      }
      return f.length >= my ? f : [...f, y];
    });
  } catch (h) {
    console.error("[ChatPanel] @ 引用素材失败:", h), n(p => p.filter(m => m._pendingToken !== s)), alert(x("无法添加「{0}」，请稍后重试。", i));
  }
}

const SOa = Object.fromEntries(PVe.map(({
    id: e,
    locale: t
  }) => [e, new Intl.DateTimeFormat(t, {
    month: "numeric",
    day: "numeric"
  })])),
  ran = 5;

function aan(e) {
  return String(e || "").replace(/\\/g, "/").replace(/\/+$/, "").toLowerCase();
}

function IOa(e, t) {
  var d;
  const n = SOa[Yht()];
  let r;
  for (let u = e.messages.length - 1; u >= 0; u -= 1) {
    const h = (d = e.messages[u]) == null ? void 0 : d.timestamp;
    if (typeof h == "number" && h > 0) {
      r = h;
      break;
    }
  }
  if (!r && typeof t == "number" && t > 0 && (r = t), !r) return n.format(new Date());
  const a = r < 1e12 ? r * 1e3 : r,
    i = Math.max(0, Date.now() - a),
    o = 6e4,
    s = 60 * o,
    l = 24 * s;
  return i < o ? x("刚刚") : i < s ? x("{0}分钟", Math.floor(i / o)) : i < l ? x("{0}小时", Math.floor(i / s)) : i < 30 * l ? x("{0}天", Math.floor(i / l)) : n.format(new Date(a));
}

const COa = 10,
  C6e = 6;

function EOa(e, t, n, r, a, i = COa) {
  let o = e - n - C6e,
    s = t + C6e;
  return o < a.left + i && (o = e + C6e), o + n > a.right - i && (o = a.right - i - n), o < a.left + i && (o = a.left + i), s + r > a.bottom - i && (s = t - r - C6e), s < a.top + i && (s = a.top + i), s + r > a.bottom - i && (s = Math.max(a.top + i, a.bottom - i - r)), {
    x: o,
    y: s
  };
}

const TOa = {
    small: 12,
    medium: 13,
    large: 15
  },
  MOa = [{
    value: "3",
    label: "回读3条"
  }, {
    value: "5",
    label: "回读5条"
  }, {
    value: "10",
    label: "回读10条"
  }, {
    value: "20",
    label: "回读20条"
  }, {
    value: "50",
    label: "回读50条"
  }, {
    value: "100",
    label: "回读100条"
  }, {
    value: "150",
    label: "回读150条"
  }, {
    value: "200",
    label: "回读200条"
  }],
  POa = [{
    value: "normal",
    label: "普通"
  }, {
    value: "skill",
    label: "Skill"
  }, {
    value: "agent",
    label: "Agent"
  }, {
    value: "local-skill",
    label: "Local Skill"
  }];

function mit(e) {
  return e.mode === "local-skill" || !!e.localSkillRootPath;
}

const ROa = [{
    value: "chat",
    label: "Chat"
  }, {
    value: "responses",
    label: "Responses"
  }],
  NOa = 3,
  jOa = 3,
  DOa = 32,
  LOa = 112,
  OOa = 0,
  ian = 420,
  BOa = 720,
  ufe = 3;

function FOa({
  anchorRect: e,
  text: t,
  isDark: n
}) {
  on();
  const r = e.left + e.width / 2,
    a = e.top - 8;
  return Da.createPortal(c.jsx("div", {
    className: "pointer-events-none fixed z-[200]",
    "data-chat-quote-hover-preview": !0,
    style: {
      left: r,
      top: a,
      transform: "translate(-50%, -100%)"
    },
    children: c.jsxs("div", {
      className: `sketch-chat-quote-hover-card ${n ? "sketch-chat-quote-hover-card-dark" : ""}`,
      children: [c.jsx("div", {
        className: `sketch-chat-quote-hover-text chat-markdown prose prose-sm max-w-none dark:prose-invert ${n ? "text-zinc-200" : "text-zinc-700"}`,
        dangerouslySetInnerHTML: {
          __html: zie(t)
        }
      }), c.jsx("div", {
        className: "sketch-chat-quote-hover-label",
        children: x("引用文本")
      })]
    })
  }), document.body);
}

function zOa({
  quote: e,
  isDark: t,
  onClear: n
}) {
  on();
  const [r, a] = g.useState(!1),
    [i, o] = g.useState(null),
    s = g.useRef(null);
  return c.jsxs(c.Fragment, {
    children: [c.jsxs("div", {
      ref: s,
      className: "sketch-chat-attach-thumb-wrap sketch-chat-quote-chip-wrap group",
      onMouseEnter: () => {
        const l = s.current;
        l && (o(l.getBoundingClientRect()), a(!0));
      },
      onMouseLeave: () => {
        a(!1), o(null);
      },
      children: [c.jsx("button", {
        type: "button",
        onClick: n,
        className: `sketch-chat-attach-thumb-remove ${t ? "sketch-chat-attach-thumb-remove-dark" : ""}`,
        title: x("取消引用"),
        "aria-label": x("取消引用"),
        children: c.jsx(Na, {
          size: 7,
          strokeWidth: 2.5
        })
      }), c.jsx("div", {
        className: `sketch-chat-attach-thumb sketch-chat-quote-chip ${t ? "sketch-chat-quote-chip-dark" : ""}`,
        title: x("引用文本"),
        "aria-label": x("引用文本"),
        children: c.jsx(NY, {
          size: 16,
          strokeWidth: 2,
          "aria-hidden": !0
        })
      })]
    }), r && i ? c.jsx(FOa, {
      anchorRect: i,
      text: e.fullContent || e.snippet,
      isDark: t
    }) : null]
  });
}

function UOa({
  ui: e,
  isDark: t,
  onQuote: n
}) {
  on();
  const r = e.left + e.width / 2,
    a = e.top - 8;
  return Da.createPortal(c.jsx("div", {
    className: "fixed z-[210]",
    "data-chat-selection-quote-bar": !0,
    style: {
      left: r,
      top: a,
      transform: "translate(-50%, -100%)"
    },
    children: c.jsxs("button", {
      type: "button",
      className: `sketch-chat-selection-quote-btn ${t ? "sketch-chat-selection-quote-btn-dark" : ""}`,
      onMouseDown: i => {
        i.preventDefault(), i.stopPropagation();
      },
      onClick: i => {
        i.preventDefault(), i.stopPropagation(), n();
      },
      children: [c.jsx(NY, {
        size: 13,
        strokeWidth: 2.25,
        "aria-hidden": !0
      }), c.jsx("span", {
        children: x("加入引用")
      })]
    })
  }), document.body);
}

function ler(e, t) {
  return String(e._assetId || e._pendingToken || `${e.name || e.displayName || "f"}-${t}`);
}

function $Oa(e, t) {
  return e.some((n, r) => ler(n, r) === t.fileKey ? !0 : (n.displayName || n.name || "unnamed") === t.fileName);
}

function GOa({
  files: e,
  isDark: t,
  quotedMessage: n,
  onClearQuote: r,
  onRemove: a,
  onClearAll: i
}) {
  on();
  const [o, s] = g.useState(null),
    l = g.useCallback(() => s(null), []);
  g.useLayoutEffect(() => {
    o && ($Oa(e, o) || s(null));
  }, [e, o]);
  const d = o != null && !!o.previewSrc,
    u = !!(n && r),
    h = e.length > 0;
  return !u && !h ? null : c.jsxs(c.Fragment, {
    children: [c.jsxs("div", {
      className: `sketch-chat-attach-row ${t ? "sketch-chat-attach-row-dark" : ""}`,
      children: [c.jsx("div", {
        className: "sketch-chat-attach-scroll rh-scroll-minimal",
        children: c.jsxs("div", {
          className: "sketch-chat-attach-strip",
          children: [u && n && r ? c.jsx("div", {
            className: "sketch-chat-attach-item group shrink-0",
            children: c.jsx(zOa, {
              quote: n,
              isDark: t,
              onClear: r
            })
          }) : null, e.map((p, m) => {
            const f = ler(p, m);
            return c.jsx("div", {
              className: "sketch-chat-attach-item group shrink-0",
              children: c.jsx(oua, {
                file: p,
                isDark: t,
                onRemove: () => {
                  l(), a(m);
                },
                onHover: (y, b, v, _) => s({
                  fileKey: f,
                  rect: y,
                  previewSrc: b,
                  fileName: v,
                  isVideo: _
                }),
                onLeave: l
              })
            }, `${p._assetId || p.name || "f"}-${m}`);
          })]
        })
      }), h ? c.jsx("button", {
        type: "button",
        className: "sketch-chat-attach-clear-btn",
        onPointerDown: l,
        onClick: () => {
          l(), i();
        },
        title: x("清除"),
        "aria-label": x("清除全部附件"),
        children: c.jsx(Na, {
          size: 14,
          strokeWidth: 2
        })
      }) : null]
    }), d && o ? c.jsx(q6a, {
      anchorRect: o.rect,
      previewSrc: o.previewSrc,
      fileName: o.fileName,
      isVideo: o.isVideo,
      isDark: t
    }) : null]
  });
}

function VOa({
  content: e,
  remeasureKey: t,
  expanded: n,
  onExpandedChange: r
}) {
  on();
  const [a, i] = g.useState(!1),
    o = n ?? a,
    s = g.useCallback(p => {
      const m = typeof p == "function" ? p(o) : p;
      r == null || r(m), n === void 0 && i(m);
    }, [n, o, r]),
    [l, d] = g.useState(!1),
    u = g.useRef(null);
  if (g.useLayoutEffect(() => {
    const p = u.current;
    if (!p || !e.trim()) {
      d(!1);
      return;
    }
    const m = parseFloat(getComputedStyle(p).lineHeight) || 20;
    d(p.scrollHeight > m * NOa + 2);
  }, [e, t]), !e.trim()) return null;
  const h = l && !o;
  return c.jsxs("div", {
    className: `sketch-chat-user-text-wrap ${l ? "sketch-chat-user-text-wrap--collapsible" : ""}`,
    children: [c.jsx("div", {
      ref: u,
      className: `whitespace-pre-wrap sketch-chat-user-text ${h ? "sketch-chat-user-text--collapsed" : ""}`,
      children: e
    }), l ? c.jsx("button", {
      type: "button",
      className: "sketch-chat-user-fold-btn",
      onClick: () => s(p => !p),
      title: x(o ? "收起" : "展开全文"),
      "aria-expanded": o,
      children: c.jsx(Mi, {
        size: 12,
        className: `transition-transform ${o ? "rotate-180" : ""}`
      })
    }) : null]
  });
}

function oan(e) {
  return [e.title, A1t(e), e.consumedUsage, e.usage, e.facts].filter(Boolean).join(`
`);
}

function HOa(e, t, n, r) {
  const a = n.imageIndex ? rRa(e, {
      imageIndex: n.imageIndex,
      fileName: n.fileName || n.title,
      nodeId: n.nodeId
    }) : e.find(h => h.assetId === n.nodeId || h.id === n.nodeId),
    i = t.find(h => h.sourceCanvasNodeId === n.nodeId || h.canvasAssetId === n.nodeId),
    o = aRa((a == null ? void 0 : a.title) || (i == null ? void 0 : i.name) || n.title, n.fileName || "", n.imageIndex || 0) || n.role || "成品",
    s = eh(a == null ? void 0 : a.preview) || eh(i == null ? void 0 : i.thumbnailUrl) || "",
    l = s ? `<img src="${ZN(Xg(s))}" alt="" />` : "",
    d = a ? ` data-memory-ref-id="${ZN(a.id)}"` : "",
    u = n.nodeId ? ` data-memory-node-id="${ZN(n.nodeId)}"` : "";
  return `<button type="button" class="sketch-chat-agent-inline-ref${r ? " is-dark" : ""}"${d}${u} title="${ZN(o)}">${l}<span class="sketch-chat-agent-inline-ref-label">${ZN(o)}</span></button>`;
}

const ywt = 220,
  cer = "sketch-memory-drawer-width";

function WOa(e) {
  try {
    const t = Number(sessionStorage.getItem(cer));
    if (Number.isFinite(t) && t >= ywt) return t;
  } catch {}
  return e;
}

function fit(e, t) {
  const n = typeof window > "u" ? 480 : Math.max(ywt, window.innerWidth - t - 26);
  return Math.min(n, Math.max(ywt, e));
}

function qOa({
  project: e,
  contextLog: t,
  referencePool: n,
  isDark: r,
  rightOffset: a,
  onClose: i,
  onAddToCanvas: o,
  onSendImageToCanvas: s,
  onQuoteToChat: l,
  getCanvasAtMentionItems: d
}) {
  on();
  const [u, h] = g.useState(null),
    [p, m] = g.useState(null),
    [f, y] = g.useState("refs"),
    [b, v] = g.useState(!1),
    [_, w] = g.useState(!1),
    k = g.useMemo(() => cXe({
      project: e,
      contextLog: t
    }).filter(z => z.ready), [e, t]),
    A = n || [],
    S = k.find(z => z.id === u) ?? null,
    C = A.find(z => z.id === p) ?? null,
    I = A.length > 0 && k.length > 0,
    E = I ? f : A.length > 0 ? "refs" : "files",
    M = (d == null ? void 0 : d()) || [],
    T = S ? zXn(zie(S.markdown), z => HOa(A, M, z, r)) : "",
    P = 10,
    [R, j] = g.useState(() => fit(WOa(A.length ? 260 : 300), a)),
    B = g.useRef(R);
  B.current = R, g.useEffect(() => {
    j(z => fit(z, a));
  }, [a]);
  const F = z => {
      if (z.button !== 0) return;
      z.preventDefault();
      const V = z.clientX,
        O = B.current;
      w(!0);
      const L = U => {
          const H = fit(O + (V - U.clientX), a);
          B.current = H, j(H);
        },
        D = () => {
          w(!1), window.removeEventListener("pointermove", L), window.removeEventListener("pointerup", D);
          try {
            sessionStorage.setItem(cer, String(B.current));
          } catch {}
        };
      window.addEventListener("pointermove", L), window.addEventListener("pointerup", D);
    },
    N = async () => {
      const z = C ? oan(C) : (S == null ? void 0 : S.markdown) || "（暂无内容）";
      try {
        await LP(z), v(!0), window.setTimeout(() => v(!1), 1500);
      } catch {}
    },
    G = () => {
      h(null), m(null);
    };
  return typeof document > "u" ? null : Da.createPortal(c.jsxs("aside", {
    className: `sketch-chat-memory-files-drawer sketch-chat-canvas-files-drawer ${r ? "sketch-chat-memory-files-drawer-dark dark" : ""}`,
    style: {
      right: a + P,
      width: R
    },
    "aria-label": A.length ? x("参考池") : x("项目记忆文件"),
    children: [c.jsx("div", {
      className: `sketch-chat-resize-wrap ${_ ? "sketch-chat-resize-wrap--active" : ""}`,
      onPointerDown: F,
      title: x("拖动调整宽度"),
      children: c.jsx("div", {
        className: `sketch-chat-resize-handle ${r ? "sketch-chat-resize-handle-dark" : ""}`
      })
    }), c.jsx("div", {
      className: "sketch-chat-memory-files-drawer-body",
      children: C ? c.jsxs(c.Fragment, {
        children: [c.jsxs("div", {
          className: `flex h-12 shrink-0 items-center gap-2 border-b px-3 ${r ? "border-white/10" : "border-zinc-200"}`,
          children: [c.jsx("button", {
            type: "button",
            className: `grid h-8 w-8 place-items-center rounded-lg transition-colors ${r ? "text-zinc-400 hover:bg-white/8 hover:text-white" : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"}`,
            onClick: G,
            title: x("返回参考"),
            children: c.jsx(Mf, {
              size: 14
            })
          }), c.jsx("span", {
            className: `min-w-0 flex-1 truncate text-[12px] font-medium ${r ? "text-zinc-100" : "text-zinc-800"}`,
            children: C.title
          }), c.jsx("button", {
            type: "button",
            className: `text-[10.5px] transition-opacity hover:opacity-70 ${r ? "text-zinc-400" : "text-zinc-500"}`,
            onClick: () => void N(),
            children: x(b ? "已复制 ✓" : "复制")
          }), c.jsx("button", {
            type: "button",
            className: `grid h-8 w-8 place-items-center rounded-lg transition-colors ${r ? "text-zinc-400 hover:bg-white/8 hover:text-white" : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"}`,
            onClick: i,
            title: x("关闭参考"),
            children: c.jsx(Na, {
              size: 15
            })
          })]
        }), c.jsxs("div", {
          className: "min-h-0 flex-1 overflow-auto rh-scroll-minimal",
          children: [eh(C.preview) || C.assetId ? c.jsx(dde, {
            src: C.preview,
            assetId: C.assetId,
            className: "sketch-chat-ref-pool-detail-image"
          }) : c.jsx("div", {
            className: `grid h-48 place-items-center ${r ? "bg-white/4 text-zinc-600" : "bg-zinc-100 text-zinc-400"}`,
            children: c.jsx(lo, {
              size: 28
            })
          }), c.jsxs("div", {
            className: "space-y-3 px-5 py-4",
            children: [c.jsxs("div", {
              children: [c.jsx("div", {
                className: `text-[16px] font-semibold leading-6 ${r ? "text-zinc-100" : "text-zinc-800"}`,
                children: C.title
              }), c.jsxs("div", {
                className: `mt-1 flex flex-wrap items-center gap-1 text-[12px] leading-[18px] ${r ? "text-zinc-500" : "text-zinc-400"}`,
                children: [C.rank === "primary" ? c.jsx("span", {
                  className: "sketch-chat-ref-pool-anchor-inline",
                  children: x("锚点")
                }) : null, c.jsx("span", {
                  children: A1t(C)
                })]
              })]
            }), C.facts ? c.jsx("p", {
              className: `whitespace-pre-wrap text-[13px] leading-5 ${r ? "text-zinc-300" : "text-zinc-600"}`,
              children: C.facts
            }) : null, C.usage ? c.jsxs("div", {
              className: "flex flex-col gap-2",
              children: [c.jsx("div", {
                className: `text-[13px] font-medium leading-5 ${r ? "text-zinc-200" : "text-zinc-800"}`,
                children: x("Agent如何参考")
              }), c.jsx("p", {
                className: `whitespace-pre-wrap text-[13px] leading-5 ${r ? "text-zinc-400" : "text-zinc-600"}`,
                children: C.usage
              })]
            }) : null, C.consumedUsage ? c.jsxs("div", {
              className: "flex flex-col gap-2",
              children: [c.jsx("div", {
                className: `text-[13px] font-medium leading-5 ${r ? "text-zinc-200" : "text-zinc-800"}`,
                children: x("本轮采用")
              }), c.jsx("p", {
                className: `whitespace-pre-wrap text-[13px] leading-5 ${r ? "text-zinc-400" : "text-zinc-600"}`,
                children: C.consumedUsage
              })]
            }) : null]
          })]
        }), c.jsxs("div", {
          className: `grid shrink-0 grid-cols-2 gap-2 border-t px-3 py-2.5 ${r ? "border-white/10" : "border-zinc-200"}`,
          children: [c.jsx("button", {
            type: "button",
            disabled: !s || !(C.url || C.preview),
            className: `h-8 rounded-full px-3 text-[11px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${r ? "bg-white/10 text-zinc-100 hover:bg-white/16" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"}`,
            onClick: () => {
              const z = C.url || C.preview;
              z && (s == null || s([z]));
            },
            children: x("添加到画布")
          }), c.jsx("button", {
            type: "button",
            disabled: !l,
            className: `h-8 rounded-full px-3 text-[11px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${r ? "bg-white/10 text-zinc-100 hover:bg-white/16" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"}`,
            onClick: () => l == null ? void 0 : l({
              name: C.title,
              markdown: oan(C)
            }),
            children: x("添加到对话")
          })]
        })]
      }) : S ? c.jsxs(c.Fragment, {
        children: [c.jsxs("div", {
          className: `flex h-12 shrink-0 items-center gap-2 border-b px-3 ${r ? "border-white/10" : "border-zinc-200"}`,
          children: [c.jsx("button", {
            type: "button",
            className: `grid h-8 w-8 place-items-center rounded-lg transition-colors ${r ? "text-zinc-400 hover:bg-white/8 hover:text-white" : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"}`,
            onClick: G,
            title: x("返回文件列表"),
            children: c.jsx(Mf, {
              size: 14
            })
          }), c.jsx(Hd, {
            size: 14,
            className: r ? "text-zinc-400" : "text-zinc-500"
          }), c.jsx("span", {
            className: `min-w-0 flex-1 truncate text-[12px] font-medium ${r ? "text-zinc-100" : "text-zinc-800"}`,
            children: S.name
          }), c.jsx("button", {
            type: "button",
            className: `text-[10.5px] transition-opacity hover:opacity-70 ${r ? "text-zinc-400" : "text-zinc-500"}`,
            onClick: () => void N(),
            disabled: !S.ready,
            children: x(b ? "已复制 ✓" : "复制")
          }), c.jsx("button", {
            type: "button",
            className: `grid h-8 w-8 place-items-center rounded-lg transition-colors ${r ? "text-zinc-400 hover:bg-white/8 hover:text-white" : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"}`,
            onClick: i,
            title: x("关闭文件"),
            children: c.jsx(Na, {
              size: 15
            })
          })]
        }), c.jsx("div", {
          className: `chat-markdown prose prose-sm min-h-0 max-w-none flex-1 overflow-auto px-6 py-5 text-[12px] leading-6 rh-scroll-minimal dark:prose-invert ${r ? "text-zinc-300" : "text-zinc-700"}`,
          dangerouslySetInnerHTML: {
            __html: T
          },
          onPointerDown: z => {
            var V, O;
            z.button === 0 && (O = (V = z.target) == null ? void 0 : V.closest) != null && O.call(V, "[data-chat-block-copy]") && (z.preventDefault(), z.stopPropagation(), OX(z.target));
          },
          onClick: z => {
            var D, U;
            const V = (U = (D = z.target) == null ? void 0 : D.closest) == null ? void 0 : U.call(D, "[data-memory-ref-id], [data-memory-node-id]"),
              O = V == null ? void 0 : V.getAttribute("data-memory-ref-id"),
              L = V == null ? void 0 : V.getAttribute("data-memory-node-id");
            if (O) {
              z.preventDefault(), z.stopPropagation(), m(O);
              return;
            }
            if (L) {
              z.preventDefault(), z.stopPropagation(), jie(L);
              return;
            }
            OX(z.target) && (z.preventDefault(), z.stopPropagation());
          }
        }), c.jsxs("div", {
          className: `grid shrink-0 grid-cols-2 gap-2 border-t px-3 py-2.5 ${r ? "border-white/10" : "border-zinc-200"}`,
          children: [c.jsx("button", {
            type: "button",
            disabled: !S.ready || !o,
            className: `h-8 rounded-full px-3 text-[11px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${r ? "bg-white/10 text-zinc-100 hover:bg-white/16" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"}`,
            onClick: () => o == null ? void 0 : o({
              name: S.name,
              markdown: S.markdown
            }),
            children: x("添加到画布")
          }), c.jsx("button", {
            type: "button",
            disabled: !S.ready || !l,
            className: `h-8 rounded-full px-3 text-[11px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${r ? "bg-white/10 text-zinc-100 hover:bg-white/16" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"}`,
            onClick: () => l == null ? void 0 : l({
              name: S.name,
              markdown: S.markdown
            }),
            children: x("在对话中讨论")
          })]
        })]
      }) : c.jsxs(c.Fragment, {
        children: [c.jsxs("div", {
          className: `flex h-12 shrink-0 items-center justify-between border-b px-4 ${r ? "border-white/10" : "border-zinc-200"}`,
          children: [I ? c.jsxs("div", {
            className: "sketch-chat-memory-files-tabs",
            children: [c.jsx("button", {
              type: "button",
              className: `sketch-chat-memory-files-tab ${E === "refs" ? "is-active" : ""}`,
              onClick: () => y("refs"),
              children: x("参考")
            }), c.jsx("button", {
              type: "button",
              className: `sketch-chat-memory-files-tab ${E === "files" ? "is-active" : ""}`,
              onClick: () => y("files"),
              children: x("项目文件")
            })]
          }) : c.jsx("div", {
            className: `truncate text-[12px] font-medium ${r ? "text-zinc-100" : "text-zinc-800"}`,
            children: A.length ? x("参考") : x("文件")
          }), c.jsx("button", {
            type: "button",
            className: `grid h-8 w-8 place-items-center rounded-lg transition-colors ${r ? "text-zinc-400 hover:bg-white/8 hover:text-white" : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"}`,
            onClick: i,
            title: A.length ? x("关闭参考") : x("关闭文件"),
            children: c.jsx(Na, {
              size: 15
            })
          })]
        }), c.jsxs("div", {
          className: "min-h-0 flex-1 overflow-auto px-3 py-2 rh-scroll-minimal",
          children: [E === "refs" && A.length > 0 ? c.jsx("div", {
            className: "sketch-chat-ref-pool-grid",
            children: A.map(z => c.jsxs("button", {
              type: "button",
              className: `sketch-chat-ref-pool-card ${r ? "is-dark" : ""}`,
              onClick: () => m(z.id),
              children: [c.jsxs("span", {
                className: "sketch-chat-ref-pool-thumb",
                children: [c.jsx("div", {
                  className: "sketch-chat-ref-pool-fallback",
                  children: eh(z.preview) || z.assetId ? c.jsx(dde, {
                    src: z.preview,
                    assetId: z.assetId
                  }) : c.jsx(lo, {
                    size: 18
                  })
                }), z.rank === "primary" ? c.jsx("span", {
                  className: "sketch-chat-ref-pool-anchor",
                  children: x("锚点")
                }) : null]
              }), c.jsx("span", {
                className: "sketch-chat-ref-pool-card-title",
                children: z.title
              }), c.jsx("span", {
                className: "sketch-chat-ref-pool-card-meta",
                children: A1t(z)
              })]
            }, z.id))
          }) : null, E === "files" && k.length > 0 ? c.jsx("div", {
            className: "space-y-1",
            children: k.map(z => c.jsxs("button", {
              type: "button",
              className: `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${r ? "hover:bg-white/7" : "hover:bg-zinc-100"}`,
              onClick: () => h(z.id),
              children: [c.jsx(Hd, {
                size: 15,
                className: r ? "text-zinc-400" : "text-zinc-500"
              }), c.jsx("span", {
                className: `min-w-0 flex-1 truncate text-[12px] ${r ? "text-zinc-200" : "text-zinc-700"}`,
                children: z.name
              }), c.jsx(ss, {
                size: 13,
                className: r ? "text-zinc-600" : "text-zinc-300"
              })]
            }, z.id))
          }) : null]
        })]
      })
    })]
  }), document.body);
}

function KOa(e) {
  const t = String(e || "").trim();
  if (!t) return;
  const n = {
    high: "高",
    medium: "中",
    low: "低",
    hd: "HD",
    standard: "Std",
    auto: "自动",
    高画质: "高",
    中画质: "中",
    低画质: "低"
  };
  return n[t.toLowerCase()] || n[t] || t;
}

function QOa(e) {
  const t = String(e || "").trim();
  if (!t || /^auto$/i.test(t)) return;
  const n = t.replace(/\s/g, "");
  return /^(1|2|4)k$/i.test(n) ? n.toUpperCase() : t;
}

function YOa(e) {
  const t = String(e || "").trim();
  if (!(!t || t === "智能" || /^auto$/i.test(t))) return t.replace(/\s/g, "");
}

function XOa({
  receipt: e,
  assets: t,
  canvasItems: n,
  getCanvasAtMentionItems: r,
  isDark: a
}) {
  on();
  const [i, o] = g.useState(!1),
    [s, l] = g.useState(""),
    d = String(e.prompt || "").trim(),
    u = d.length > 140 || d.split(`
`).length > 3,
    h = t9a(e, t, n),
    p = lVn(e.modelId || e.model, "image", a),
    m = YOa(e.ratio),
    f = QOa(e.resolution),
    y = KOa(e.quality),
    b = Math.max(1, Math.round(Number(e.quantity) || 1)),
    v = [m, f, y, `${b}x`].filter(Boolean);
  return c.jsxs("div", {
    className: `sketch-chat-agent-generation-wrap ${a ? "is-dark" : ""}`,
    children: [c.jsxs("section", {
      className: `sketch-chat-agent-generation-card is-locatable ${a ? "is-dark" : ""}`,
      onClick: () => jie(e.nodeId),
      title: x("定位到画布节点"),
      children: [c.jsxs("header", {
        className: "sketch-chat-agent-generation-head",
        children: [c.jsxs("span", {
          className: "sketch-chat-agent-generation-kind",
          children: [c.jsx(lo, {
            size: 13,
            strokeWidth: 1.8
          }), x("图片生成")]
        }), u ? c.jsx("button", {
          type: "button",
          className: "sketch-chat-agent-generation-expand",
          onClick: _ => {
            _.stopPropagation(), o(w => !w);
          },
          "aria-expanded": i,
          title: x(i ? "收起提示词" : "展开提示词"),
          children: c.jsx(ss, {
            size: 12,
            strokeWidth: 2,
            className: i ? "rotate-90" : ""
          })
        }) : null]
      }), c.jsx("div", {
        className: "sketch-chat-agent-generation-body",
        children: c.jsxs("div", {
          className: `sketch-chat-agent-generation-well ${i ? "is-expanded" : ""}`,
          children: [e.title && e.title !== "图片生成" ? c.jsx("div", {
            className: "sketch-chat-agent-generation-title",
            children: e.title
          }) : null, h.length > 0 ? c.jsx("div", {
            className: "sketch-chat-agent-generation-ref-groups",
            children: h.map(_ => c.jsxs("div", {
              className: "sketch-chat-agent-generation-ref-group",
              children: [c.jsx("span", {
                className: "sketch-chat-agent-generation-ref-group-label",
                children: _.label
              }), c.jsx("div", {
                className: "sketch-chat-agent-generation-refs",
                children: _.items.map((w, k) => c.jsxs("button", {
                  type: "button",
                  className: "sketch-chat-agent-generation-ref",
                  title: x("定位到参考图：{0}", w.name),
                  onClick: A => {
                    A.stopPropagation(), w.sourceNodeId ? (l(""), jie(w.sourceNodeId)) : l("未找到对应的画布参考图。");
                  },
                  children: [w.src || w.assetId ? c.jsx(dde, {
                    src: w.src,
                    assetId: w.assetId
                  }) : c.jsx("span", {
                    className: "sketch-chat-agent-generation-ref-placeholder",
                    children: x("图")
                  }), c.jsx("span", {
                    children: w.name
                  })]
                }, `${w.sourceNodeId || w.assetId || w.index}-${k}`))
              })]
            }, _.role))
          }) : null, d ? c.jsx("p", {
            className: `sketch-chat-agent-generation-prompt ${u && !i ? "is-clamped" : ""}`,
            children: M1t(d, e, t, n).map((_, w) => _.kind === "text" ? c.jsx(Ia.Fragment, {
              children: _.text
            }, w) : c.jsxs("button", {
              type: "button",
              className: `sketch-chat-agent-inline-ref ${a ? "is-dark" : ""}`,
              title: x("定位到参考图：{0}", _.title),
              onClick: k => {
                k.stopPropagation();
                const A = (r == null ? void 0 : r()) || n,
                  S = M1t(d, e, t, A)[w],
                  C = (S == null ? void 0 : S.kind) === "reference" ? S.sourceNodeId : void 0;
                C && A.some(I => I.sourceCanvasNodeId === C) ? (l(""), jie(C)) : l("未找到唯一对应的画布参考图，素材可能尚未放入画布、已被删除或存在多个副本。");
              },
              children: [c.jsx(dde, {
                src: _.src,
                assetId: _.assetId
              }), c.jsx("span", {
                className: "sketch-chat-agent-inline-ref-label",
                children: _.label
              })]
            }, w))
          }) : null, s ? c.jsx("div", {
            role: "status",
            className: "mt-2 text-xs opacity-70",
            children: s
          }) : null]
        })
      }), c.jsxs("footer", {
        className: "sketch-chat-agent-generation-foot",
        children: [c.jsxs("span", {
          className: "sketch-chat-agent-generation-model",
          children: [p ? c.jsx("img", {
            className: "sketch-chat-agent-generation-model-logo",
            src: p,
            alt: ""
          }) : null, e.model || x("自动模型")]
        }), c.jsx("span", {
          className: "sketch-chat-agent-generation-foot-right",
          children: v.length > 0 ? c.jsx("span", {
            className: "sketch-chat-agent-generation-params",
            children: v.map((_, w) => c.jsx("span", {
              className: "sketch-chat-agent-generation-param",
              children: _
            }, `${_}-${w}`))
          }) : null
        })]
      })]
    }), e.durationSeconds ? c.jsxs("div", {
      className: "sketch-chat-agent-generation-duration",
      children: [x("处理了 "), e.durationSeconds, "s"]
    }) : null]
  });
}

function ZNe(e) {
  var n, r;
  if (e.role && e.role !== "assistant") return !1;
  const t = e.agentPendingChoice;
  return !t || t.resolvedChoiceId || e.agentStatus === "done" ? !1 : !!((n = t.choices) != null && n.length || (r = t.questions) != null && r.length);
}

function JOa({
  msg: e,
  isDark: t,
  selected: n,
  chatFontSize: r,
  isChatSending: a,
  isAgentPanelMode: i,
  isSkillPanelMode: o,
  chatAgentGenPrefs: s,
  onSetChatAgentGenPrefs: l,
  onPatchChatMessage: d,
  onSendChatMessage: u,
  onQuoteChatMessage: h,
  isLastAssistantMessage: p = !1,
  onResendChatMessage: m,
  onResolveAgentChoice: f,
  sessionReferenceAssets: y,
  onUndoLocalSkillEdit: b,
  onReviewLocalSkillFile: v,
  localSkillWorkspaceRoot: _,
  getCanvasAtMentionItems: w
}) {
  var ke, ve, Te, Ne, me, Ae, Fe;
  on();
  const [k, A] = g.useState(() => !!e.contentFolded),
    [S, C] = g.useState(!1),
    I = g.useRef(null),
    E = ser(e),
    M = g.useMemo(() => nLt(e.toolSteps), [e.toolSteps]),
    T = g.useMemo(() => e.agentTaskSnapshot ?? aLt(e), [e]),
    P = g.useMemo(() => {
      var rt, nt;
      const Me = ((rt = e.agentPlanContent) == null ? void 0 : rt.trim()) || "",
        Re = ((nt = e.content) == null ? void 0 : nt.trim()) || "",
        $e = Me ? !Re || Re === Me ? Me : Re.startsWith(Me) ? Re : `${Me}

---

${Re}` : Re;
      return j1t($e);
    }, [e.agentPlanContent, e.content]),
    R = !!(a && p),
    j = g.useMemo(() => WYn(e.agentMindTrace || [], e.appliedSkillName), [e.agentMindTrace, e.appliedSkillName]),
    B = g.useMemo(() => hMa(P, j), [P, j]),
    F = y || e.agentReferenceAssets || [],
    [N, G] = g.useState([]);
  g.useEffect(() => {
    G((w == null ? void 0 : w()) || []);
  }, [w, e.id, e.toolSteps]);
  const z = g.useMemo(() => {
      const Me = QNt(B),
        Re = nt => n9a(nt, M, F, N);
      if (R) return Re(Me);
      const $e = M.length > 0 ? PXn(M, N.map(nt => ({
        id: nt.sourceCanvasNodeId || nt.id,
        nodeName: nt.name
      })), F, N) : "";
      return /画布节点：/.test(Me) && /核心标题|视觉风格参考|角色主体参考|设计看点/.test(Me) && !Pnn(Me) ? Re(Me) : $e ? Re($e) : Pnn(Me) ? "" : Re(Me);
    }, [B, N, M, R, F]),
    V = g.useMemo(() => r9a(F), [F]),
    O = g.useMemo(() => {
      const Me = p9a(z);
      for (const Re of F) {
        const $e = [sXe(Re), `img-${Re.index}`, Re.assetId, Re.sourceNodeId].filter(rt => !!rt);
        $e.some(rt => Me.has(rt)) && $e.forEach(rt => Me.add(rt));
      }
      return V.filter(Re => !Me.has(rLt(Re)));
    }, [V, z, F]),
    L = g.useMemo(() => {
      const Me = x9a(V);
      for (const Re of F) {
        const $e = N.find(ze => Re.assetId && ze.canvasAssetId === Re.assetId || Re.sourceNodeId && ze.sourceCanvasNodeId === Re.sourceNodeId || Re.name && ze.name === Re.name),
          rt = Me.get(Re.assetId || "") || Me.get(Re.sourceNodeId || "") || V.find(ze => ze.fileName === Re.name);
        if (!rt) continue;
        const nt = {
          ...rt,
          sourceNodeId: rt.sourceNodeId || Re.sourceNodeId || ($e == null ? void 0 : $e.sourceCanvasNodeId)
        };
        Me.set(`img-${Re.index}`, nt), Re.assetId && Me.set(Re.assetId, nt), nt.sourceNodeId && Me.set(nt.sourceNodeId, nt), Me.set(String(Re.index), nt);
      }
      return Me;
    }, [N, V, F]),
    D = g.useMemo(() => {
      const Me = new Map();
      for (const Re of N) Me.set(Re.sourceCanvasNodeId, {
        id: Re.sourceCanvasNodeId,
        title: Re.name,
        thumb: Re.thumbnailUrl || Re.canvasImageUrl
      });
      for (const Re of M) Me.has(Re.nodeId) || Me.set(Re.nodeId, {
        id: Re.nodeId,
        title: Re.title && !/^(图片|视频)生成$/.test(Re.title) ? Re.title : void 0
      });
      return Me;
    }, [N, M]),
    U = f9a(z),
    H = O.length > 0,
    Y = H || U || M.length > 0 || !!T,
    K = g.useMemo(() => {
      var $e;
      if (R || U) return "";
      const Me = zie(z);
      if (!_ || !Me) return Me;
      const Re = ($e = [...(e.localSkillEdits || [])].reverse().find(rt => !rt.undone)) == null ? void 0 : $e.relPath;
      return WBe(Me, Re);
    }, [z, R, _, e.localSkillEdits, U]),
    W = R ? xOa(z) : K,
    Q = g.useMemo(() => lW(e), [e.content, e.agentMindTrace, e.toolSteps]),
    q = g.useMemo(() => (y || e.agentReferenceAssets || []).map(Me => ({
      name: Me.name,
      preview: Me.preview,
      url: Me.url,
      assetId: Me.assetId
    })), [y, e.agentReferenceAssets]),
    ne = e.agentStatus === "thinking" || e.agentStatus === "executing" || e.agentStatus === "waiting_choice",
    de = !!(o && p && a && (e.agentStatus === "thinking" || e.agentStatus === "executing") && !e.skillArtifact && !((ke = e.skillCreatorQuestions) != null && ke.length)),
    le = ne || !!((ve = e.agentReasoning) != null && ve.trim()) || !!((Te = e.agentStatusDetail) != null && Te.trim()) || !!((Ne = e.toolSteps) != null && Ne.length) || !!e.agentPendingStep || !!((me = e.agentMindTrace) != null && me.length) || !!e.agentPendingChoice,
    J = !!z.trim() || E || H,
    pe = e.agentPendingChoice,
    ce = ZNe(e) && !!f,
    we = ((Ae = e.agentPlanContent) == null ? void 0 : Ae.trim()) || e.content,
    X = !ce && !!u && !e.agentQuickRepliesDismissed && (e.agentStatus === "waiting_choice" || e.agentStatus === "done") && !!VYn(we),
    Z = !E && X && !ce;
  g.useLayoutEffect(() => {
    const Me = I.current;
    if (!Me || !z.trim() || E) {
      C(!1);
      return;
    }
    const Re = parseFloat(getComputedStyle(Me).lineHeight) || 20;
    C(Me.scrollHeight > Re * jOa + 2);
  }, [z, r, E, R]), g.useEffect(() => {
    const Me = I.current;
    if (!Me || !_ || R || E) return;
    const Re = new AbortController();
    return fsa(Me, _, Q, q, Re.signal), () => Re.abort();
  }, [W, _, Q, q, R, E]), g.useEffect(() => {
    A(!!e.contentFolded);
  }, [e.id, e.contentFolded]), g.useEffect(() => {
    !S && e.contentFolded && (d == null || d(e.id, {
      contentFolded: !1
    }));
  }, [S, e.contentFolded, e.id, d]);
  const re = g.useCallback(() => {
      A(Me => {
        const Re = !Me;
        return d == null || d(e.id, {
          contentFolded: Re
        }), Re;
      });
    }, [e.id, d]),
    fe = g.useCallback(Me => {
      d == null || d(e.id, {
        agentMindCollapsed: Me
      });
    }, [e.id, d]),
    ye = g.useCallback((Me, Re) => {
      s && l && l({
        ...s,
        activeSkillId: Me
      }), d == null || d(e.id, {
        appliedSkillId: Me ?? void 0,
        appliedSkillName: Re == null ? void 0 : Re.name
      });
    }, [s, e.id, d, l]),
    ie = g.useCallback(Me => {
      d == null || d(e.id, {
        agentQuickRepliesDismissed: !0
      }), u == null || u(Me);
    }, [e.id, d, u]),
    ae = g.useCallback((Me, Re) => {
      d == null || d(e.id, {
        agentQuickRepliesDismissed: !0
      }), f == null || f(e.id, Me, Re);
    }, [e.id, d, f]),
    be = g.useCallback(() => {
      LP(z || P).catch(Me => {
        console.warn("[ChatPanel] 复制失败:", Me);
      });
    }, [z, P]),
    Ee = g.useCallback(() => {
      h == null || h(e);
    }, [e, h]),
    xe = g.useCallback(Me => OX(Me), []),
    he = g.useCallback((Me, Re) => {
      if (!v) return;
      const $e = _ ? vie(_, Me, Q) : Me;
      v($e, Re ? {
        copy: !0
      } : void 0);
    }, [_, Q, v]),
    ue = g.useCallback(Me => {
      var rt;
      const Re = zie(Me);
      if (!_) return Re;
      const $e = (rt = [...(e.localSkillEdits || [])].reverse().find(nt => !nt.undone)) == null ? void 0 : rt.relPath;
      return WBe(Re, $e);
    }, [_, e.localSkillEdits]),
    ge = g.useCallback(Me => {
      var Re, $e;
      Me.button === 0 && ($e = (Re = Me.target) == null ? void 0 : Re.closest) != null && $e.call(Re, "[data-chat-block-copy]") && (Me.preventDefault(), Me.stopPropagation(), xe(Me.target));
    }, [xe]),
    _e = g.useCallback(Me => {
      var $e, rt;
      const Re = (rt = ($e = Me.target) == null ? void 0 : $e.closest) == null ? void 0 : rt.call($e, "[data-local-skill-path]");
      if (Re) {
        const nt = Re.getAttribute("data-local-skill-path") || "",
          ze = Re.getAttribute("data-local-skill-action") || "";
        Me.preventDefault(), Me.stopPropagation(), he(nt, ze === "open-copy");
        return;
      }
      xe(Me.target) && (Me.preventDefault(), Me.stopPropagation());
    }, [xe, he]);
  return c.jsxs("div", {
    className: `sketch-chat-assistant-stack${Y ? " is-full" : ""}`,
    style: {
      "--qiaodoumayi-fade-from": t ? "#1a1a1a" : "#f4f4f5"
    },
    children: [e.codexUsage ? c.jsxs("div", {
      className: "px-1 text-[10px] text-zinc-500",
      title: x("服务端返回的本次模型请求用量；缓存命中由服务端决定，会话记忆不代表缓存始终命中。"),
      children: [x("输入 "), e.codexUsage.inputTokens.toLocaleString(), x(" · 缓存命中 "), e.codexUsage.cachedInputTokens.toLocaleString(), e.codexUsage.inputTokens > 0 ? `（${Math.round(e.codexUsage.cachedInputTokens / e.codexUsage.inputTokens * 100)}%）` : "", " · ", x("输出 "), e.codexUsage.outputTokens.toLocaleString()]
    }) : null, le && !E ? c.jsx(RMa, {
      agentStatus: e.agentStatus,
      agentStatusDetail: e.agentStatusDetail,
      agentReasoning: e.agentReasoning,
      agentMindTrace: e.agentMindTrace,
      agentPendingStep: e.agentPendingStep,
      agentStartedAt: e.agentStartedAt,
      agentEndedAt: e.agentEndedAt,
      agentPendingChoice: pe,
      mindCollapsed: e.agentMindCollapsed,
      onMindCollapsedChange: d ? fe : void 0,
      appliedSkillName: e.appliedSkillName,
      referenceAssets: y || e.agentReferenceAssets,
      toolSteps: e.toolSteps,
      getCanvasAtMentionItems: w,
      isDark: t,
      isRunning: ne,
      isChatSending: a,
      onResolveAgentChoice: ce ? ae : void 0,
      renderMarkdown: _ ? ue : zie,
      workspaceRoot: _,
      onOpenLocalPath: _ ? he : void 0
    }) : null, (Fe = e.skillCreatorQuestions) != null && Fe.length && e.skillCreatorAnswerText ? c.jsx(fXn, {
      questions: e.skillCreatorQuestions,
      isDark: t,
      disabled: !0,
      submitted: !0,
      answerText: e.skillCreatorAnswerText,
      onSubmit: () => {}
    }) : null, J ? c.jsxs("div", {
      className: `sketch-chat-message ${t ? "sketch-chat-message-dark" : ""} ${n ? "sketch-chat-message--selected" : ""}`,
      style: {
        userSelect: "text"
      },
      children: [n && c.jsx("div", {
        className: `sketch-chat-selected-badge ${t ? "sketch-chat-selected-badge-dark" : ""}`,
        children: x("已选中")
      }), !E && H ? c.jsx(b9a, {
        attachments: O
      }) : null, z.trim() || E ? U && !E ? c.jsx("div", {
        ref: I,
        className: `chat-markdown prose prose-sm max-w-none dark:prose-invert select-text ${k && S ? "sketch-chat-assistant-text--collapsed" : ""}`,
        style: {
          fontSize: "1em"
        },
        children: c.jsx(w9a, {
          text: z,
          attachmentsById: L,
          nodeInfoMap: D
        })
      }) : c.jsx("div", {
        ref: I,
        className: `chat-markdown prose prose-sm max-w-none dark:prose-invert select-text ${k && S ? "sketch-chat-assistant-text--collapsed" : ""}`,
        style: {
          fontSize: "1em"
        },
        onPointerDown: ge,
        onClick: _e,
        dangerouslySetInnerHTML: {
          __html: W
        }
      }) : null, E && m ? c.jsxs("button", {
        type: "button",
        onClick: () => m(e.id),
        disabled: a,
        className: `mt-2 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition-colors ${a ? t ? "cursor-not-allowed border-white/10 text-white/35" : "cursor-not-allowed border-zinc-200 text-zinc-400" : t ? "border-white/20 text-white/85 hover:bg-white/8" : "border-zinc-300 text-zinc-700 hover:bg-zinc-50"}`,
        title: x("使用上一条用户消息与附件重新发送"),
        children: [c.jsx(vd, {
          size: 11
        }), x("重新发送")]
      }) : null]
    }) : null, de ? c.jsx(IPa, {
      isDark: t
    }) : null, e.skillArtifact ? c.jsx(CPa, {
      artifact: e.skillArtifact,
      isDark: t,
      taskId: e.id,
      thumbs: y || e.agentReferenceAssets,
      onChange: Me => d == null ? void 0 : d(e.id, {
        skillArtifact: Me
      })
    }) : null, E ? null : c.jsx(aPa, {
      edits: e.localSkillEdits,
      isDark: t,
      disabled: a && p,
      onUndo: b ? Me => b(e.id, Me.undoId) : void 0,
      onReview: v ? Me => v(Me.path) : void 0
    }), !E && !R ? c.jsx(Q9a, {
      snapshot: T,
      isDark: t
    }) : null, (z.trim() || P.trim() || j.length > 0) && !E ? c.jsxs("div", {
      className: `sketch-chat-assistant-actions ${t ? "sketch-chat-assistant-actions-dark" : ""}`,
      children: [c.jsx("button", {
        type: "button",
        className: "sketch-chat-assistant-action-btn",
        onClick: be,
        title: x("复制"),
        "aria-label": x("复制"),
        children: c.jsx(Cx, {
          size: 14
        })
      }), h ? c.jsx("button", {
        type: "button",
        className: "sketch-chat-assistant-action-btn",
        onClick: Ee,
        title: x("引用此条"),
        "aria-label": x("引用此条"),
        children: c.jsx(NY, {
          size: 14
        })
      }) : null, S ? c.jsx("button", {
        type: "button",
        className: "sketch-chat-assistant-action-btn",
        onClick: re,
        title: x(k ? "展开全文" : "折叠为 3 行"),
        "aria-expanded": !k,
        "aria-label": x(k ? "展开全文" : "折叠为 3 行"),
        children: c.jsx(Mi, {
          size: 14,
          className: `transition-transform ${k ? "" : "rotate-180"}`
        })
      }) : null, i && s && l && !ne ? c.jsx(kYe, {
        variant: "compact",
        isDark: t,
        value: e.appliedSkillId ?? s.activeSkillId,
        onChange: ye,
        disabled: a
      }) : null]
    }) : null, Z ? c.jsx(zDt, {
      content: we,
      isDark: t,
      disabled: a && e.agentStatus !== "waiting_choice",
      agentPendingChoice: ce ? pe : void 0,
      dismissed: e.agentQuickRepliesDismissed,
      onQuickReply: u ? ie : void 0,
      onResolveChoice: ce ? ae : void 0
    }) : null]
  });
}

function ZOa({
  msg: e,
  isDark: t,
  selected: n,
  chatFontSize: r,
  onPatchChatMessage: a,
  onQuoteChatMessage: i,
  onOpenChatMediaLightbox: o
}) {
  on();
  const s = e.files || [],
    l = s.filter(m => OP(m)),
    d = s.filter(m => !OP(m)),
    u = aua(e.content),
    h = !!u.trim(),
    p = h ? "sketch-chat-message--user-block" : "";
  return c.jsxs("div", {
    className: "sketch-chat-user-stack",
    children: [l.length > 0 ? c.jsx("div", {
      className: "flex max-w-full shrink-0 flex-wrap items-center justify-end gap-1.5 overflow-visible",
      children: l.map((m, f) => c.jsx(r7t, {
        isDark: t
      }, `${m._canvasNodeId || m.name || "chip"}-${f}`))
    }) : null, d.length > 0 ? c.jsx(YGn, {
      files: d,
      isDark: t,
      onOpenLightbox: o
    }) : null, h ? c.jsxs("div", {
      className: "sketch-chat-user-message-block",
      children: [e.quotedFrom ? c.jsxs("div", {
        className: `sketch-chat-quote-ref ${t ? "sketch-chat-quote-ref-dark" : ""}`,
        title: e.quotedFrom.fullContent,
        children: [c.jsx(NY, {
          size: 11,
          className: "shrink-0 opacity-70",
          "aria-hidden": !0
        }), c.jsx("span", {
          className: "sketch-chat-quote-ref-text",
          children: e.quotedFrom.snippet
        })]
      }) : null, c.jsx("div", {
        className: `sketch-chat-message sketch-chat-message--user ${p} ${V5(u) ? "sketch-chat-message--ask-memory" : ""} ${t ? "sketch-chat-message-dark" : ""} ${n ? "sketch-chat-message--selected" : ""}`,
        style: {
          userSelect: "text"
        },
        children: V5(u) ? c.jsx(APa, {
          answerText: u
        }) : c.jsx(VOa, {
          content: u,
          remeasureKey: r,
          expanded: e.userContentExpanded,
          onExpandedChange: a ? m => a(e.id, {
            userContentExpanded: m
          }) : void 0
        })
      }), i ? c.jsx("div", {
        className: `sketch-chat-user-actions ${t ? "sketch-chat-user-actions-dark" : ""}`,
        children: c.jsx("button", {
          type: "button",
          className: "sketch-chat-assistant-action-btn",
          onClick: () => i(e),
          title: x("引用此条"),
          "aria-label": x("引用此条"),
          children: c.jsx(NY, {
            size: 14
          })
        })
      }) : null]
    }) : null]
  });
}

const eBa = g.memo(function ({
    msg: t,
    isDark: n,
    selected: r,
    chatFontSize: a,
    isChatSending: i,
    isAgentPanelMode: o,
    isSkillPanelMode: s,
    chatAgentGenPrefs: l,
    onSetChatAgentGenPrefs: d,
    onPatchChatMessage: u,
    onSendChatMessage: h,
    onQuoteChatMessage: p,
    onOpenChatMediaLightbox: m,
    isLastAssistantMessage: f = !1,
    onResendChatMessage: y,
    onResolveAgentChoice: b,
    onContextMenu: v,
    onMeasured: _,
    sessionReferenceAssets: w,
    onUndoLocalSkillEdit: k,
    onReviewLocalSkillFile: A,
    localSkillWorkspaceRoot: S,
    getCanvasAtMentionItems: C,
    style: I
  }) {
    on();
    const E = g.useRef(null);
    return g.useLayoutEffect(() => {
      const M = E.current;
      if (!M || !_) return;
      const T = () => {
        if (document.documentElement.dataset.chatResizing === "true") return;
        const R = M.getBoundingClientRect().height;
        R > 0 && _(t.id, R);
      };
      T();
      const P = new ResizeObserver(T);
      return P.observe(M), () => P.disconnect();
    }, [t.id, t.content, t.files, t.localSkillEdits, t.agentStatus, t.agentPendingChoice, t.agentAskAnswerText, t.agentTaskSnapshot, a, r, _]), c.jsx("div", {
      ref: E,
      "data-chat-message-row": !0,
      "data-chat-message-id": t.id,
      "data-chat-message-role": t.role,
      className: `sketch-chat-message-row group ${t.role === "user" ? "sketch-chat-message-row--user" : "sketch-chat-message-row--assistant"}`,
      style: I,
      onContextMenu: M => v(M, t.id),
      children: c.jsx("div", {
        className: "sketch-chat-message-wrap",
        children: t.role === "user" ? c.jsxs(c.Fragment, {
          children: [r && c.jsx("div", {
            className: `sketch-chat-selected-badge ${n ? "sketch-chat-selected-badge-dark" : ""}`,
            children: x("已选中")
          }), c.jsx(ZOa, {
            msg: t,
            isDark: n,
            selected: r,
            chatFontSize: a,
            onPatchChatMessage: u,
            onQuoteChatMessage: p,
            onOpenChatMediaLightbox: m
          })]
        }) : c.jsx(JOa, {
          msg: t,
          isDark: n,
          selected: r,
          chatFontSize: a,
          isChatSending: i,
          isAgentPanelMode: o,
          isSkillPanelMode: s,
          chatAgentGenPrefs: l,
          onSetChatAgentGenPrefs: d,
          onPatchChatMessage: u,
          onSendChatMessage: h,
          onQuoteChatMessage: p,
          isLastAssistantMessage: f,
          onResendChatMessage: y,
          onResolveAgentChoice: b,
          sessionReferenceAssets: w,
          onUndoLocalSkillEdit: k,
          onReviewLocalSkillFile: A,
          localSkillWorkspaceRoot: S,
          getCanvasAtMentionItems: C
        })
      })
    }, t.id);
  }, (e, t) => {
    var n, r, a, i, o, s, l, d;
    return e.msg === t.msg && e.isDark === t.isDark && e.selected === t.selected && e.chatFontSize === t.chatFontSize && e.isChatSending === t.isChatSending && e.isAgentPanelMode === t.isAgentPanelMode && e.isSkillPanelMode === t.isSkillPanelMode && e.chatAgentGenPrefs === t.chatAgentGenPrefs && e.onSetChatAgentGenPrefs === t.onSetChatAgentGenPrefs && e.onPatchChatMessage === t.onPatchChatMessage && e.onSendChatMessage === t.onSendChatMessage && e.onQuoteChatMessage === t.onQuoteChatMessage && e.onOpenChatMediaLightbox === t.onOpenChatMediaLightbox && e.isLastAssistantMessage === t.isLastAssistantMessage && e.onResendChatMessage === t.onResendChatMessage && e.onResolveAgentChoice === t.onResolveAgentChoice && e.onContextMenu === t.onContextMenu && e.onMeasured === t.onMeasured && e.sessionReferenceAssets === t.sessionReferenceAssets && e.onUndoLocalSkillEdit === t.onUndoLocalSkillEdit && e.onReviewLocalSkillFile === t.onReviewLocalSkillFile && e.localSkillWorkspaceRoot === t.localSkillWorkspaceRoot && e.getCanvasAtMentionItems === t.getCanvasAtMentionItems && ((n = e.style) == null ? void 0 : n.position) === ((r = t.style) == null ? void 0 : r.position) && ((a = e.style) == null ? void 0 : a.top) === ((i = t.style) == null ? void 0 : i.top) && ((o = e.style) == null ? void 0 : o.left) === ((s = t.style) == null ? void 0 : s.left) && ((l = e.style) == null ? void 0 : l.right) === ((d = t.style) == null ? void 0 : d.right);
  }),
  san = g.memo(function ({
    liveSessionId: t,
    ...n
  }) {
    on();
    const r = kXe(n.isLastAssistantMessage ? t : null),
      a = (r == null ? void 0 : r.sessionId) === t && r.message.id === n.msg.id ? r.message : n.msg;
    return c.jsx(eBa, {
      ...n,
      msg: a,
      onMeasured: a === n.msg ? n.onMeasured : void 0,
      sessionReferenceAssets: n.sessionReferenceAssets ?? a.agentReferenceAssets
    });
  }),
  tBa = g.memo(function ({
    sessionId: t,
    baseLastMessage: n,
    isChatSending: r,
    isDark: a,
    tone: i = "chat"
  }) {
    var u, h, p, m;
    on();
    const o = kXe(r ? t : null);
    if (!r) return null;
    const s = (o == null ? void 0 : o.sessionId) === t && o.message.id === (n == null ? void 0 : n.id) ? o.message : n,
      l = (s == null ? void 0 : s.role) === "assistant" && !!(s.agentStatus || (u = s.agentReasoning) != null && u.trim() || (h = s.agentStatusDetail) != null && h.trim() || (p = s.toolSteps) != null && p.length || s.agentPendingStep || (m = s.agentMindTrace) != null && m.length);
    return (s == null ? void 0 : s.role) === "assistant" && !!s.content || l ? null : c.jsx("div", {
      className: "sketch-chat-message-row group sketch-chat-message-row--assistant",
      children: c.jsx("div", {
        className: "sketch-chat-message-wrap",
        children: c.jsx(WGn, {
          active: r,
          isDark: a,
          tone: i
        })
      })
    });
  });

function hte(e) {
  return TXn(e) ? x(e || "新对话") : e;
}

const der = ({
    isOpen: e,
    onClose: t,
    isDark: n,
    canvasBackdropColor: r,
    chatWidth: a,
    chatFontSize: i = "medium",
    chatModel: o,
    chatSessions: s,
    currentChatId: l,
    isChatSending: d,
    sendingChatSessionIds: u = [],
    historyMessageCount: h,
    chatWebSearchEnabled: p = !1,
    chatApiProtocol: m = "chat",
    chatReasoningEffort: f = rT,
    chatUseAliyunOss: y = !1,
    chatOssImageBase64: b = !1,
    onSetChatModel: v,
    chatPlatformGroup: _ = "",
    onSetChatPlatformGroup: w,
    onSetChatWebSearchEnabled: k,
    onSetChatApiProtocol: A,
    onSetChatReasoningEffort: S,
    onSetChatUseAliyunOss: C,
    onSetChatOssImageBase64: I,
    onSetCurrentChatId: E,
    onSetHistoryMessageCount: M,
    onCreateNewChat: T,
    onDeleteChatSession: P,
    onDeleteChatMessages: R,
    onRenameChatSession: j,
    onSendChatMessage: B,
    onCreateSkillFromChat: F,
    onCancelChatSend: N,
    onResendChatMessage: G,
    onChatResizeStart: z,
    isResizingChat: V = !1,
    apiConfigs: O = [],
    chatPanelMode: L = "normal",
    onSetChatPanelMode: D,
    sessionsForCurrentMode: U = [],
    chatSessionsForHistory: H,
    chatSessionLastTsById: Y,
    onSelectChatSession: K,
    onOpenSkillToWorkflow: W,
    chatAgentGenPrefs: Q,
    onSetChatAgentGenPrefs: q,
    onResolveAgentChoice: ne,
    onPatchChatMessage: de,
    onBindLocalSkillRoot: le,
    onSetLocalSkillPermission: J,
    localSkillPermission: pe = "ask",
    onUndoLocalSkillEdit: ce,
    onReviewLocalSkillFile: we,
    onOpenChatMediaLightbox: X,
    getCanvasAtMentionItems: Z,
    onAddTextNodeToCanvas: re,
    onSendImageToCanvas: fe,
    onSendLocalSkillImageToCanvas: ye,
    onAddLocalSkillWorkspace: ie,
    onOpenLocalSkillWorkspace: ae,
    onRemoveLocalSkillWorkspace: be,
    localSkillWorkspaces: Ee
  }) => {
    var Oa, Fa, Ra, ui, pr;
    on();
    const xe = JZn(),
      he = wW,
      ue = eer(),
      ge = q5,
      _e = rer(),
      ke = VO,
      [ve, Te] = g.useState(!1),
      [Ne, me] = g.useState(!1),
      [Ae, Fe] = g.useState(null),
      [Me, Re] = g.useState(""),
      [$e, rt] = g.useState([]),
      [nt, ze] = g.useState([]),
      Le = aQe(e),
      Ke = Mu(o),
      Xe = Kna(o, Le.catalog),
      De = g.useMemo(() => {
        const fr = [...JFn(Le.catalog), ...O.filter(Ba => Ba.type === "Chat" && !Mu(Ba.id))],
          na = Xe || o;
        if (na && !Mu(na) && !fr.some(Ba => Ba.id === na)) {
          const Ba = O.find(ai => ai.id === na);
          fr.push(Ba ?? {
            id: na,
            modelName: na,
            type: "Chat"
          });
        }
        return fr;
      }, [O, o, L, Le.catalog, Xe]);
    g.useEffect(() => {
      !Xe || Xe === o || v(Xe);
    }, [Xe, o, v]);
    const Ye = (Oa = Le.catalog) == null ? void 0 : Oa.models.find(In => `codex-chat:${In.model}` === (Xe || o)),
      Ce = g.useMemo(() => mRt(Ye), [Ye]);
    g.useEffect(() => {
      Ye && S && !Ce.some(In => In.value === f) && S(Ye.defaultReasoningEffort);
    }, [Ye, Ce, f, S]);
    const He = g.useMemo(() => O.filter(In => In.type === "Image"), [O]),
      Ve = g.useMemo(() => O.filter(In => In.type === "Video"), [O]),
      it = L === "agent",
      It = L === "skill",
      Ft = L === "local-skill",
      We = FYn(L),
      Ze = g.useMemo(() => {
        const In = H ?? s;
        return Ft ? In.filter(mit) : In.filter(fr => !mit(fr));
      }, [H, s, Ft]),
      {
        recentSessions: Ge,
        olderSessions: Oe
      } = g.useMemo(() => {
        const In = Ze;
        if (In.length <= ufe) return {
          recentSessions: In,
          olderSessions: []
        };
        const fr = In.slice(0, ufe);
        if (fr.some(vi => vi.id === l)) return {
          recentSessions: fr,
          olderSessions: In.slice(ufe)
        };
        const na = In.find(vi => vi.id === l);
        if (!na) return {
          recentSessions: fr,
          olderSessions: In.slice(ufe)
        };
        const Ba = [na, ...fr.filter(vi => vi.id !== na.id)].slice(0, ufe),
          ai = new Set(Ba.map(vi => vi.id));
        return {
          recentSessions: Ba,
          olderSessions: In.filter(vi => !ai.has(vi.id))
        };
      }, [Ze, l]),
      st = g.useMemo(() => De.find(In => In.id === o), [De, o]),
      vt = hI(o),
      Ht = Eb(o) || Eb(st == null ? void 0 : st.id) || Ny(st == null ? void 0 : st.url) || String((st == null ? void 0 : st.modelName) || "").toLowerCase().includes("mimo-v2."),
      nn = vt || Ht,
      [pt, lt] = uYe(),
      gt = Mxe({
        modelId: o,
        url: st == null ? void 0 : st.url,
        hasVideo: ue.some(In => !!In.isVideo || String(In.type || "").startsWith("video/"))
      }),
      Ut = Ke || wM(o, st == null ? void 0 : st.modelName),
      _t = g.useMemo(() => {
        if (Mu(o) || !st) return !1;
        if (L === "local-skill") return !0;
        const In = Qa.getGlobalBaseUrl();
        return od(st, In);
      }, [L, st, o]),
      [At, Yt] = g.useState(null),
      [qe, kt] = g.useState(!1),
      [St, hn] = g.useState(!1),
      [Qt, Ot] = g.useState(null),
      [ln, Pn] = g.useState(""),
      rn = g.useRef(null),
      Yn = g.useRef(!1),
      Ct = g.useRef(null),
      Cn = g.useRef(null),
      un = oJ(qe, l),
      [Jn, Kn] = g.useState(!1);
    rn.current = Qt, g.useEffect(() => {
      qe || hn(!1);
    }, [qe]);
    const en = g.useCallback(() => {
        var Ba;
        const In = rn.current;
        if (!In || !j) {
          rn.current = null, Ot(null);
          return;
        }
        const fr = ln.trim(),
          na = ((Ba = Ze.find(ai => ai.id === In)) == null ? void 0 : Ba.title) || "新对话";
        j(In, fr || na), rn.current = null, Ot(null);
      }, [j, ln, Ze]),
      Vn = g.useCallback(() => {
        Yn.current = !0, rn.current = null, Ot(null);
      }, []),
      Tt = g.useCallback(In => {
        const fr = mit(In) ? "local-skill" : In.mode ?? "normal",
          na = l === In.id,
          Ba = Qt === In.id;
        return c.jsxs("div", {
          ...(na ? {
            [Md]: "true"
          } : {}),
          className: `sketch-chat-session-item ${na ? "sketch-chat-session-item--active" : ""} ${Ba ? "sketch-chat-session-item--renaming" : ""}`,
          children: [Ba ? c.jsx("div", {
            className: "sketch-chat-session-select",
            children: c.jsx("input", {
              ref: Cn,
              type: "text",
              className: "sketch-chat-session-rename-input",
              value: ln,
              "aria-label": x("自定义对话名称"),
              onChange: ai => Pn(ai.target.value),
              onClick: ai => ai.stopPropagation(),
              onMouseDown: ai => ai.stopPropagation(),
              onKeyDown: ai => {
                ai.key === "Enter" ? (ai.preventDefault(), en()) : ai.key === "Escape" && (ai.preventDefault(), ai.stopPropagation(), Vn());
              },
              onBlur: () => {
                if (Yn.current) {
                  Yn.current = !1;
                  return;
                }
                en();
              }
            })
          }) : c.jsxs("button", {
            type: "button",
            className: "sketch-chat-session-select",
            role: "menuitem",
            onClick: () => {
              K ? K(In.id) : (D == null || D(fr), E(In.id)), kt(!1);
            },
            children: [c.jsx("span", {
              className: "sketch-chat-session-name",
              title: hte(In.title),
              children: hte(In.title)
            }), u.includes(In.id) ? c.jsx("span", {
              className: "sketch-chat-session-age",
              title: x("任务进行中"),
              children: c.jsx(Ua, {
                size: 11,
                className: "animate-spin",
                "aria-hidden": !0
              })
            }) : c.jsx("span", {
              className: "sketch-chat-session-age",
              children: IOa(In, Y == null ? void 0 : Y[In.id])
            })]
          }), Ba ? null : c.jsxs("div", {
            className: "sketch-chat-session-actions",
            children: [j ? c.jsx("button", {
              type: "button",
              onMouseDown: ai => {
                ai.preventDefault(), ai.stopPropagation();
              },
              onClick: ai => {
                ai.preventDefault(), ai.stopPropagation(), Ot(In.id), Pn(In.title);
              },
              className: "sketch-chat-session-action",
              title: x("重命名"),
              "aria-label": x("重命名 {0}", hte(In.title)),
              children: c.jsx(nw, {
                size: 12,
                strokeWidth: 1.8
              })
            }) : null, c.jsx("button", {
              type: "button",
              onMouseDown: ai => {
                ai.preventDefault(), ai.stopPropagation(), Ot(null), P(ai, In.id);
              },
              onClick: ai => {
                ai.preventDefault(), ai.stopPropagation();
              },
              className: "sketch-chat-session-action sketch-chat-session-action--delete",
              title: x("删除"),
              "aria-label": x("删除 {0}", hte(In.title)),
              children: c.jsx(Na, {
                size: 12,
                strokeWidth: 1.8
              })
            })]
          })]
        }, In.id);
      }, [Vn, Y, en, l, P, j, K, D, E, ln, Qt, u]);
    g.useEffect(() => {
      if (!Qt) return;
      const In = Cn.current;
      In && (In.focus(), In.select());
    }, [Qt]), g.useEffect(() => {
      if (!qe) {
        rn.current && en();
        return;
      }
      const In = na => {
          var Ba;
          (Ba = Ct.current) != null && Ba.contains(na.target) || (rn.current && en(), kt(!1));
        },
        fr = na => {
          if (na.key === "Escape") {
            if (rn.current) {
              na.preventDefault(), Vn();
              return;
            }
            kt(!1);
          }
        };
      return document.addEventListener("pointerdown", In), window.addEventListener("keydown", fr), () => {
        document.removeEventListener("pointerdown", In), window.removeEventListener("keydown", fr);
      };
    }, [qe, en, Vn]);
    const [Ue, et] = g.useState(!1);
    g.useEffect(() => {
      if (!e) {
        et(!1);
        return;
      }
      let In = !1;
      return Id().then(() => {
        In || et(!0);
      }), () => {
        In = !0;
      };
    }, [e]);
    const [ft, ht] = g.useState(() => ua()),
      [wt, jt] = g.useState(() => Ph()),
      [bt, Bt] = g.useState(() => mo()),
      wn = !ft && wt;
    g.useEffect(() => {
      const In = () => {
        ht(ua()), jt(Ph()), Bt(mo());
      };
      return In(), window.addEventListener(go, In), () => window.removeEventListener(go, In);
    }, []), g.useEffect(() => {
      wt || ft || !y || !C || C(!1);
    }, [wt, ft, y, C]);
    const {
        settings: at,
        updateSettings: Pt,
        ossBusy: dt,
        ossProgress: xt,
        ossAvailable: yn,
        uploadToCloud: gn,
        downloadFromCloud: mt
      } = mRa(),
      {
        getEnableLabel: Xt,
        configHint: Gn
      } = dXe(),
      [rr, qn] = g.useState(_Oa),
      Dn = g.useRef(null),
      [Ar, _r] = g.useState({
        atTop: !0,
        atBottom: !0,
        canScroll: !1
      }),
      [Pa, fa] = g.useState({
        scrollTop: 0,
        viewportHeight: 0
      }),
      Ca = g.useRef(new Map()),
      [$n, yr] = g.useState(0),
      [Ir, Gr] = g.useState([]),
      [Zr, La] = g.useState({
        open: !1,
        x: 0,
        y: 0,
        targetMessageId: null
      }),
      [sa, Ea] = g.useState({
        x: 0,
        y: 0
      }),
      ba = g.useRef(null),
      [ga, _a] = g.useState(null),
      [$a, Ya] = g.useState(null),
      [ta, ki] = g.useState(""),
      Wn = g.useRef(null),
      [wr, jn] = g.useState(!1),
      _n = g.useRef(0),
      ar = g.useRef(0),
      Vt = g.useRef(xe),
      vn = g.useRef(null);
    g.useEffect(() => {
      Vt.current = xe;
    }, [xe]);
    const An = g.useCallback(In => {
        AOa(In, ue.length, ge);
      }, [ue.length, ge]),
      {
        showAssetAtDropdown: ur,
        assetDropdownPos: zr,
        atMentionSearchQuery: Dr,
        setAtMentionSearchQuery: Wr,
        atMentionFolderCategories: gr,
        assetAtMentionItems: jr,
        assetCategoryView: ea,
        setAssetCategoryView: pa,
        assetAtActiveIndex: Br,
        dropdownRef: tn,
        handleChatInputChange: Lr,
        handleChatInputKeyDown: br,
        handleCompositionStart: Jr,
        handleCompositionEnd: Kr,
        handleSelectAssetFromDropdown: ir
      } = BPa({
        chatInput: xe,
        onSetChatInput: he,
        textareaRef: vn,
        getCanvasAtMentionItems: Z,
        onSelectAsset: An
      }),
      Hr = UPa({
        enabled: it,
        chatInput: xe,
        onSetChatInput: he,
        textareaRef: vn,
        onSelectSkill: In => {
          !Q || !q || q({
            ...Q,
            activeSkillId: In.id
          });
        }
      }),
      [ha, Ga] = g.useState(0);
    g.useEffect(() => {
      const In = () => Ga(fr => fr + 1);
      return window.addEventListener(cw, In), window.addEventListener(oI, In), () => {
        window.removeEventListener(cw, In), window.removeEventListener(oI, In);
      };
    }, []);
    const Za = g.useMemo(() => {
      const In = Q == null ? void 0 : Q.activeSkillId;
      return !it || !In ? null : Xhe(In);
    }, [Q == null ? void 0 : Q.activeSkillId, it, ha]);
    g.useEffect(() => {
      ur && Hr.close();
    }, [ur, Hr.close]);
    const va = g.useCallback(In => {
        const fr = Zna(In);
        !fr || !ke || (ke(fr), _a(null), window.requestAnimationFrame(() => {
          var na;
          (na = vn.current) == null || na.focus();
        }));
      }, [ke]),
      Kt = g.useCallback(() => {
        var fr;
        if (!ga || !ke) return;
        const In = _0t(ga.text, {
          messageId: ga.messageId,
          role: ga.role
        });
        In && (ke(In), _a(null), (fr = window.getSelection()) == null || fr.removeAllRanges(), window.requestAnimationFrame(() => {
          var na;
          (na = vn.current) == null || na.focus();
        }));
      }, [ga, ke]),
      Pr = g.useCallback(In => {
        const fr = _0t(In.markdown, {
          messageId: `memory-file:${In.name}`,
          role: "assistant"
        });
        !fr || !ke || (ke(fr), window.requestAnimationFrame(() => {
          var na;
          (na = vn.current) == null || na.focus();
        }));
      }, [ke]),
      kr = g.useCallback(() => {
        var vo;
        if (!ke || !e) {
          _a(null);
          return;
        }
        const In = window.getSelection();
        if (!In || In.isCollapsed || In.rangeCount === 0) {
          _a(null);
          return;
        }
        const fr = In.toString();
        if (!fr.trim()) {
          _a(null);
          return;
        }
        const na = Dn.current;
        if (!I6e(In.anchorNode, na) && !I6e(In.focusNode, na)) {
          _a(null);
          return;
        }
        const Ba = In.anchorNode,
          ai = (Ba == null ? void 0 : Ba.nodeType) === Node.TEXT_NODE ? Ba.parentElement : Ba,
          vi = (vo = ai == null ? void 0 : ai.closest) == null ? void 0 : vo.call(ai, "[data-chat-message-row]"),
          Vi = (vi == null ? void 0 : vi.getAttribute("data-chat-message-id")) || "",
          Ti = vi == null ? void 0 : vi.getAttribute("data-chat-message-role");
        if (!Vi || Ti !== "user" && Ti !== "assistant") {
          _a(null);
          return;
        }
        const hi = In.getRangeAt(0).getBoundingClientRect();
        if (!hi || hi.width <= 0 && hi.height <= 0) {
          _a(null);
          return;
        }
        _a({
          text: fr,
          messageId: Vi,
          role: Ti,
          top: hi.top,
          left: hi.left,
          width: hi.width,
          height: hi.height
        });
      }, [ke, e]),
      Mr = g.useRef(null);
    g.useEffect(() => {
      if (!e || !ke) {
        _a(null);
        return;
      }
      let In = !1,
        fr = 0;
      const na = () => {
          fr && cancelAnimationFrame(fr), fr = requestAnimationFrame(() => {
            fr = 0, !In && kr();
          });
        },
        Ba = hi => {
          var ci, ji;
          const vo = hi.target;
          (ci = vo == null ? void 0 : vo.closest) != null && ci.call(vo, "[data-chat-selection-quote-bar]") || (ji = vo == null ? void 0 : vo.closest) != null && ji.call(vo, "[data-chat-copy-zone]") && (In = !0);
        },
        ai = () => {
          if (!In) {
            na();
            return;
          }
          In = !1, na();
        },
        vi = () => {
          In || na();
        },
        Vi = () => {
          _a(null);
        },
        Ti = hi => {
          hi.key === "Escape" && _a(null);
        };
      document.addEventListener("mousedown", Ba, !0), document.addEventListener("mouseup", ai, !0), document.addEventListener("selectionchange", vi), window.addEventListener("keydown", Ti);
      const Gi = Dn.current;
      return Gi == null || Gi.addEventListener("scroll", Vi, {
        passive: !0
      }), () => {
        fr && cancelAnimationFrame(fr), document.removeEventListener("mousedown", Ba, !0), document.removeEventListener("mouseup", ai, !0), document.removeEventListener("selectionchange", vi), window.removeEventListener("keydown", Ti), Gi == null || Gi.removeEventListener("scroll", Vi);
      };
    }, [e, ke, kr]);
    const Hn = g.useCallback(In => {
      In.preventDefault(), In.stopPropagation(), jn(!0), _n.current = In.clientY, ar.current = rr;
    }, [rr]);
    g.useEffect(() => {
      if (!wr) return;
      const In = na => {
          const Ba = _n.current - na.clientY,
            ai = Math.max(tan, Math.min(kOa, ar.current + Ba));
          qn(ai);
        },
        fr = () => {
          jn(!1);
        };
      return window.addEventListener("mousemove", In), window.addEventListener("mouseup", fr), () => {
        window.removeEventListener("mousemove", In), window.removeEventListener("mouseup", fr);
      };
    }, [wr]);
    const $t = g.useCallback(async In => {
        const fr = In.clipboardData,
          na = nan(fr);
        if (na.length === 0) return;
        In.preventDefault();
        const Ba = (fr == null ? void 0 : fr.getData("text/plain")) ?? "";
        if (Ba.trim()) {
          const ai = Vt.current,
            vi = ai ? `${ai}${/\n$/.test(ai) ? "" : `
`}${Ba}` : Ba;
          he(vi);
        }
        await uNe(na, ue.length, ge, {
          warnUnsupported: !0,
          sourceLabel: "剪贴板"
        });
      }, [ue.length, ge, he]),
      [je, Qe] = g.useState(!1),
      Mt = g.useRef(0),
      cn = g.useCallback(In => In ? Array.from(In.types || []).includes("Files") : !1, []),
      Qn = g.useCallback(In => {
        cn(In.dataTransfer) && (In.preventDefault(), In.stopPropagation(), Mt.current += 1, Qe(!0));
      }, [cn]),
      Lt = g.useCallback(In => {
        cn(In.dataTransfer) && (In.preventDefault(), In.stopPropagation(), In.dataTransfer.dropEffect = "copy");
      }, [cn]),
      ct = g.useCallback(In => {
        In.preventDefault(), In.stopPropagation(), Mt.current = Math.max(0, Mt.current - 1), Mt.current === 0 && Qe(!1);
      }, []),
      Dt = g.useCallback(async In => {
        In.preventDefault(), In.stopPropagation(), Mt.current = 0, Qe(!1);
        const fr = nan(In.dataTransfer);
        if (fr.length === 0) return;
        const na = my - ue.length;
        if (fr.length > na) {
          alert(x("最多只能上传{0}个文件，当前已有{1}个，还可以上传{2}个", my, ue.length, na));
          return;
        }
        await uNe(fr, ue.length, ge, {
          warnUnsupported: !0,
          sourceLabel: "拖入"
        });
      }, [ue.length, ge]),
      bn = g.useCallback(() => {
        if (document.documentElement.dataset.chatResizing === "true") return;
        const In = Dn.current;
        if (!In) return;
        const {
            scrollTop: fr,
            scrollHeight: na,
            clientHeight: Ba
          } = In,
          ai = na > Ba + 2,
          vi = fr < 10,
          Vi = fr + Ba >= na - 10;
        _r(Ti => Ti.atTop === vi && Ti.atBottom === Vi && Ti.canScroll === ai ? Ti : {
          atTop: vi,
          atBottom: Vi,
          canScroll: ai
        }), fa(Ti => Math.abs(Ti.scrollTop - fr) < 1 && Math.abs(Ti.viewportHeight - Ba) < 1 ? Ti : {
          scrollTop: fr,
          viewportHeight: Ba
        });
      }, []);
    g.useEffect(() => {
      const In = Dn.current;
      if (!In) return;
      bn(), In.addEventListener("scroll", bn);
      const fr = new ResizeObserver(bn);
      return fr.observe(In), () => {
        In.removeEventListener("scroll", bn), fr.disconnect();
      };
    }, [bn, l, s]);
    const Rt = g.useCallback(In => {
        In.preventDefault(), In.stopPropagation();
        const fr = Dn.current;
        fr && (fr.scrollTop = 0);
      }, []),
      fn = g.useCallback(In => {
        In.preventDefault(), In.stopPropagation();
        const fr = Dn.current;
        fr && (fr.scrollTop = fr.scrollHeight - fr.clientHeight);
      }, []),
      Zt = g.useMemo(() => s.find(In => In.id === l), [s, l]),
      Ln = nn && !!(Zt != null && Zt.messages.some(In => String(In.content || "").trim())),
      tt = g.useMemo(() => d ? "正在生成 Skill，请稍候" : !!(Zt != null && Zt.messages.some(fr => String(fr.content || "").trim() && !KNe(fr.content))) ? void 0 : "请先开始对话", [Zt == null ? void 0 : Zt.messages, d]),
      zt = g.useMemo(() => {
        const In = Ze.filter(fr => fr.mode === "local-skill" || fr.localSkillRootPath).map(fr => fr.localSkillRootPath);
        return BIe([...(Ee || []), ...In, Zt == null ? void 0 : Zt.localSkillRootPath]);
      }, [Ze, Ee, Zt == null ? void 0 : Zt.localSkillRootPath]),
      an = g.useMemo(() => {
        var ai;
        const In = Me.trim().toLowerCase(),
          fr = vi => {
            var Ti;
            const Vi = Y == null ? void 0 : Y[vi.id];
            if (typeof Vi == "number" && Vi > 0) return Vi;
            for (let Gi = vi.messages.length - 1; Gi >= 0; Gi -= 1) {
              const hi = (Ti = vi.messages[Gi]) == null ? void 0 : Ti.timestamp;
              if (typeof hi == "number" && hi > 0) return hi;
            }
            return 0;
          },
          na = new Map(),
          Ba = vi => {
            if (vYt(vi)) return null;
            const Vi = vi.replace(/\\/g, "/").replace(/\/+$/, "").toLowerCase();
            let Ti = na.get(Vi);
            return Ti || (Ti = {
              path: vi,
              sessions: []
            }, na.set(Vi, Ti)), Ti;
          };
        for (const vi of zt) Ba(vi);
        for (const vi of Ze) {
          if (!(vi.mode === "local-skill" || vi.localSkillRootPath)) continue;
          const Vi = String(vi.localSkillRootPath || "").trim();
          if (Vi) {
            if (In) {
              const Ti = (vi.title || "").toLowerCase(),
                Gi = W6(Vi).toLowerCase();
              if (!Ti.includes(In) && !Gi.includes(In) && !Vi.toLowerCase().includes(In)) continue;
            }
            (ai = Ba(Vi)) == null || ai.sessions.push(vi);
          }
        }
        return [...na.values()].filter(vi => !vYt(vi.path)).map(vi => ({
          ...vi,
          sessions: [...vi.sessions].sort((Vi, Ti) => fr(Ti) - fr(Vi))
        }));
      }, [Ze, zt, Me, Y, Ee]);
    g.useEffect(() => {
      const In = Zt == null ? void 0 : Zt.localSkillRootPath;
      if (!In) return;
      const fr = aan(In);
      rt(na => na.includes(fr) ? na : [...na, fr]);
    }, [Zt == null ? void 0 : Zt.localSkillRootPath]), g.useEffect(() => {
      if (!e) return;
      const In = Zt == null ? void 0 : Zt.localSkillRootPath;
      if (In) return k2e(In, {
        force: !0
      }).catch(fr => {
        console.warn("[localSkill] asset scope on open:", fr);
      }), () => {
        dBn();
      };
    }, [e, Zt == null ? void 0 : Zt.localSkillRootPath]);
    const Rn = g.useMemo(() => {
        var fr;
        if (Zt != null && Zt.agentCreativeProject) return Zt.agentCreativeProject;
        const In = (Zt == null ? void 0 : Zt.messages) ?? [];
        for (let na = In.length - 1; na >= 0; na -= 1) if ((fr = In[na]) != null && fr.agentCreativeProject) return In[na].agentCreativeProject;
      }, [Zt]),
      Un = g.useMemo(() => {
        var In;
        return !!((In = Zt == null ? void 0 : Zt.agentReferencePool) != null && In.length) || cXe({
          project: Rn,
          contextLog: Zt == null ? void 0 : Zt.agentContextLog
        }).some(fr => fr.ready);
      }, [Rn, Zt == null ? void 0 : Zt.agentContextLog, Zt == null ? void 0 : Zt.agentReferencePool]);
    g.useEffect(() => {
      !it && !Un && Te(!1);
    }, [Un, it]), g.useEffect(() => {
      Ft || (me(!1), Fe(null));
    }, [Ft]);
    const er = g.useMemo(() => RNt(Zt == null ? void 0 : Zt.messages), [Zt == null ? void 0 : Zt.messages]),
      Cr = g.useCallback((In, fr) => {
        const na = Zt == null ? void 0 : Zt.localSkillRootPath;
        if (!na) {
          we == null || we(In);
          return;
        }
        const Ba = String(In || "").trim();
        let ai = "";
        if (Ba) {
          const vi = RE(na, Ba);
          ai = bp(na, vi);
        }
        (!ai || ai === ".") && (ai = er[0] || ""), me(!0), ai && Fe({
          relPath: ai,
          copy: fr == null ? void 0 : fr.copy,
          token: Date.now()
        });
      }, [Zt == null ? void 0 : Zt.localSkillRootPath, er, we]),
      tr = Ir.length,
      kn = g.useMemo(() => new Set(Ir), [Ir]),
      xn = g.useMemo(() => {
        const fr = [...((Zt == null ? void 0 : Zt.messages) ?? [])];
        for (let na = 0; na < fr.length; na += 1) {
          const Ba = fr[na];
          if (Ba.role !== "assistant") continue;
          const ai = String(Ba.agentAskAnswerText || "").trim();
          if (!ai || !V5(ai)) continue;
          const vi = fr[na - 1];
          (vi == null ? void 0 : vi.role) === "user" && V5(vi.content) || (fr.splice(na, 0, {
            id: `${Ba.id}-ask-memory`,
            role: "user",
            content: ai,
            timestamp: Math.max(0, (Ba.timestamp || Date.now()) - 1)
          }), na += 1);
        }
        return fr;
      }, [Zt == null ? void 0 : Zt.messages]),
      Fn = g.useMemo(() => {
        var fr;
        const In = xn;
        for (let na = In.length - 1; na >= 0; na -= 1) if (((fr = In[na]) == null ? void 0 : fr.role) === "assistant") return In[na].id;
        return null;
      }, [xn]),
      cr = kXe((it || Ft) && (d || xn.some(In => In.agentStatus === "waiting_choice")) ? l : null),
      vr = g.useMemo(() => {
        var na;
        const In = (cr == null ? void 0 : cr.sessionId) === l ? cr.message : void 0,
          fr = In ? xn.some(Ba => Ba.id === In.id) ? xn.map(Ba => Ba.id === In.id ? In : Ba) : [...xn, In] : xn;
        for (let Ba = fr.length - 1; Ba >= 0; Ba -= 1) {
          const ai = fr[Ba];
          if (ai.role === "assistant" && (ZNe(ai) || (na = ai.skillCreatorQuestions) != null && na.length && !String(ai.skillCreatorAnswerText || "").trim())) return ai;
        }
      }, [l, xn, cr]),
      Wt = g.useCallback((In, fr) => {
        vr && (de == null || de(vr.id, {
          agentQuickRepliesDismissed: !0
        }), ne == null || ne(vr.id, In, fr));
      }, [vr, de, ne]),
      Jt = g.useCallback(In => {
        vr && (de == null || de(vr.id, {
          skillCreatorAnswerText: In,
          agentStatus: "done"
        }), B == null || B(In));
      }, [vr, de, B]),
      Nn = g.useMemo(() => {
        if (!it || !Fn) return null;
        const In = xn.find(na => na.id === Fn),
          fr = (cr == null ? void 0 : cr.sessionId) === l && cr.message.id === Fn ? cr.message : In;
        return fr ? C9a(fr.agentTaskSnapshot ?? aLt(fr)) : null;
      }, [l, xn, it, Fn, cr]),
      En = g.useMemo(() => {
        const In = tMa(xn),
          fr = Zt == null ? void 0 : Zt.agentReferencePool;
        if (!(fr != null && fr.length)) return In;
        const na = new Map();
        for (const [Ba, ai] of In) na.set(Ba, DMa(ai, fr));
        return na;
      }, [Zt == null ? void 0 : Zt.agentReferencePool, xn]),
      Zn = g.useCallback((In, fr) => {
        if (document.documentElement.dataset.chatResizing === "true") return;
        const na = Ca.current.get(In);
        na != null && Math.abs(na - fr) < 1 || (Ca.current.set(In, fr), yr(Ba => Ba + 1));
      }, []);
    g.useEffect(() => {
      const In = new Set(xn.map(na => na.id));
      let fr = !1;
      for (const na of Array.from(Ca.current.keys())) In.has(na) || (Ca.current.delete(na), fr = !0);
      fr && yr(na => na + 1);
    }, [xn]);
    const Sr = g.useMemo(() => {
        const In = xn.length,
          fr = In > DOa,
          na = Pa.viewportHeight || BOa,
          Ba = Ca.current,
          ai = xn.map(ji => Ba.get(ji.id) ?? LOa),
          vi = new Array(In);
        let Vi = 0;
        for (let ji = 0; ji < In; ji += 1) vi[ji] = Vi, Vi += ai[ji] + (ji < In - 1 ? OOa : 0);
        const Ti = Math.max(0, Vi);
        if (!fr) return {
          shouldVirtualize: fr,
          visibleMessages: xn.map((ji, ts) => ({
            msg: ji,
            index: ts,
            top: vi[ts] || 0
          })),
          totalHeight: Ti,
          starts: vi
        };
        const Gi = Math.max(0, Pa.scrollTop - ian),
          hi = Pa.scrollTop + na + ian;
        let vo = 0;
        for (; vo < In && vi[vo] + ai[vo] < Gi;) vo += 1;
        let ci = vo;
        for (; ci < In && vi[ci] <= hi;) ci += 1;
        return vo = Math.max(0, vo - 2), ci = Math.min(In, ci + 2), {
          shouldVirtualize: fr,
          visibleMessages: xn.slice(vo, ci).map((ji, ts) => {
            const Ts = vo + ts;
            return {
              msg: ji,
              index: Ts,
              top: vi[Ts] || 0
            };
          }),
          totalHeight: Ti,
          starts: vi
        };
      }, [xn, $n, Pa.scrollTop, Pa.viewportHeight]),
      Bn = g.useMemo(() => OGn(xn, d), [xn, d]),
      Et = g.useCallback(In => {
        const fr = Dn.current;
        if (!fr) return;
        const na = Sr.starts[In.messageIndex] ?? 0,
          Ba = Math.max(0, Math.min(na - 16, Sr.totalHeight - fr.clientHeight));
        fr.scrollTo({
          top: Ba,
          behavior: "smooth"
        });
      }, [Sr.starts, Sr.totalHeight]);
    g.useEffect(() => {
      bn();
    }, [xn.length, $n, Sr.totalHeight, bn]);
    const zn = g.useCallback(() => {
        La({
          open: !1,
          x: 0,
          y: 0,
          targetMessageId: null
        }), Ea({
          x: 0,
          y: 0
        });
      }, []),
      Mn = g.useCallback(() => {
        Gr([]), zn();
      }, [zn]),
      or = g.useCallback((In, fr) => {
        Ft || (In.preventDefault(), In.stopPropagation(), _a(null), Gr(na => na.includes(fr) ? na : [...na, fr]), La({
          open: !0,
          x: In.clientX,
          y: In.clientY,
          targetMessageId: fr
        }));
      }, [Ft]);
    g.useLayoutEffect(() => {
      if (!Zr.open) return;
      const In = ba.current,
        fr = Mr.current,
        na = {
          left: 0,
          top: 0,
          right: typeof window < "u" ? window.innerWidth : 0,
          bottom: typeof window < "u" ? window.innerHeight : 0
        },
        Ba = (fr == null ? void 0 : fr.getBoundingClientRect()) ?? na,
        ai = (In == null ? void 0 : In.offsetWidth) || 220,
        vi = (In == null ? void 0 : In.offsetHeight) || 160;
      Ea(EOa(Zr.x, Zr.y, ai, vi, Ba));
    }, [Zr.open, Zr.x, Zr.y]);
    const mr = g.useCallback(() => {
        const In = Zr.targetMessageId;
        In && (Gr(fr => fr.includes(In) ? fr.filter(na => na !== In) : [...fr, In]), zn());
      }, [Zr.targetMessageId, zn]),
      Yr = g.useCallback(() => {
        const In = Zr.targetMessageId;
        if (!In) return;
        const fr = xn.find(na => na.id === In);
        fr && va(fr), zn();
      }, [Zr.targetMessageId, xn, va, zn]),
      aa = g.useCallback(() => {
        Gr([]), zn();
      }, [zn]),
      wa = g.useCallback(In => {
        if (!Zt || Ir.length === 0 || !R) return;
        const fr = new Set(Ir),
          na = Zt.messages.filter(Ba => fr.has(Ba.id)).filter(Ba => In ? Ba.role === In : !0).map(Ba => Ba.id);
        na.length !== 0 && (R(l, na), Gr([]), zn());
      }, [Zt, Ir, R, l, zn]),
      xa = g.useCallback(() => {
        if (!Zt || Ir.length === 0) return;
        const In = new Set(Ir),
          fr = Zt.messages.filter(Ba => In.has(Ba.id));
        if (fr.length === 0) {
          zn();
          return;
        }
        const na = fr.map(Ba => `[${Ba.role === "user" ? "用户" : "助手"}]
${Ba.content || ""}`).join(`

`);
        zn(), Ya({
          defaultName: `${Zt.title}-片段`,
          content: na,
          title: "保存为 Skill 的名称：",
          onAfterSave: () => {
            Gr([]), typeof window < "u" && window.__toastSuccess && window.__toastSuccess(`已保存 ${fr.length} 条消息到 Skill 库`);
          }
        });
      }, [Zt, Ir, zn]),
      Aa = g.useCallback(() => {
        if (!$a) return;
        const In = ta.trim() || $a.defaultName || `Skill ${Date.now()}`;
        Qhe({
          name: In,
          content: $a.content
        });
        const fr = $a.onAfterSave;
        Ya(null), fr ? fr() : typeof window < "u" && window.__toastSuccess && window.__toastSuccess("已保存到 Skill 库，可在 Agent 节点中选用");
      }, [$a, ta]);
    g.useEffect(() => {
      if (!$a) return;
      ki($a.defaultName);
      const In = window.setTimeout(() => {
        var fr, na;
        (fr = Wn.current) == null || fr.focus(), (na = Wn.current) == null || na.select();
      }, 0);
      return () => window.clearTimeout(In);
    }, [$a]), g.useEffect(() => {
      if (!e) return;
      const In = fr => {
        if (!(fr.metaKey || fr.ctrlKey) || fr.key.toLowerCase() !== "c" || fr.altKey || fr.repeat) return;
        const na = window.getSelection(),
          Ba = (na == null ? void 0 : na.toString()) ?? "";
        if (!Ba.trim()) return;
        const ai = Dn.current;
        ai && (!I6e(na == null ? void 0 : na.anchorNode, ai) && !I6e(na == null ? void 0 : na.focusNode, ai) || (fr.preventDefault(), fr.stopPropagation(), LP(Ba).catch(vi => {
          console.warn("[ChatPanel] 复制失败:", vi);
        })));
      };
      return window.addEventListener("keydown", In, !0), () => window.removeEventListener("keydown", In, !0);
    }, [e]), g.useEffect(() => {
      if (!Zr.open) return;
      let In = !1,
        fr;
      const na = window.setTimeout(() => {
          if (In) return;
          const ai = vi => {
            var Ti, Gi;
            if (vi.button === 2) return;
            const Vi = vi.target;
            Vi && ((Ti = Vi.closest) != null && Ti.call(Vi, "[data-chat-message-menu]")) || Vi && ((Gi = Vi.closest) != null && Gi.call(Vi, "[data-chat-message-row]")) || Mn();
          };
          window.addEventListener("pointerdown", ai, !0), fr = () => window.removeEventListener("pointerdown", ai, !0);
        }, 0),
        Ba = ai => {
          ai.key === "Escape" && zn();
        };
      return window.addEventListener("keydown", Ba), () => {
        In = !0, window.clearTimeout(na), fr == null || fr(), window.removeEventListener("keydown", Ba);
      };
    }, [Zr.open, Mn]);
    const pn = g.useCallback(In => {
      if (In.button === 2) return;
      const fr = In.target;
      fr.closest("[data-chat-message-row]") || fr.closest("[data-chat-message-menu]") || (Ir.length > 0 || Zr.open) && Mn();
    }, [Ir.length, Zr.open, Mn]);
    g.useEffect(() => {
      Gr([]), zn(), _a(null);
    }, [l, zn]);
    const xr = g.useMemo(() => {
      const In = typeof window < "u" ? window.innerWidth * .9 : 1e9;
      return {
        width: Math.max(EF, Math.min(In, a)),
        minWidth: EF,
        top: 0,
        right: 0,
        bottom: 0,
        left: "auto",
        height: "100dvh"
      };
    }, [a]);
    if (!e) return null;
    const Nr = `sketch-chat-panel sketch-chat-enter flex flex-col overflow-visible transition-[box-shadow,border-color] duration-200 ease-out ${n ? "sketch-chat-panel-dark" : ""} sketch-chat-panel--sidebar z-[48] max-w-[90vw]`,
      qr = {
        ...xr,
        "--sketch-chat-sidebar-backdrop": r || (n ? "#09090b" : "#dfdfdf")
      };
    return c.jsxs("div", {
      ref: Mr,
      className: Nr,
      style: qr,
      "data-files-drawer-open": ve && Un || Ft && Ne && !!(Zt != null && Zt.localSkillRootPath) || void 0,
      children: [c.jsx("div", {
        className: `sketch-chat-resize-wrap ${V ? "sketch-chat-resize-wrap--active" : ""}`,
        onPointerDown: z,
        role: "separator",
        "aria-orientation": "vertical",
        "aria-label": x("拖动调整对话宽度"),
        title: x("拖动调整宽度"),
        children: c.jsx("div", {
          className: `sketch-chat-resize-handle ${n ? "sketch-chat-resize-handle-dark" : ""}`
        })
      }), ve && Un ? c.jsx(qOa, {
        project: Rn,
        contextLog: Zt == null ? void 0 : Zt.agentContextLog,
        referencePool: Zt == null ? void 0 : Zt.agentReferencePool,
        isDark: n,
        rightOffset: Number(xr.width),
        onClose: () => Te(!1),
        onAddToCanvas: re,
        onSendImageToCanvas: fe,
        onQuoteToChat: Pr,
        getCanvasAtMentionItems: Z
      }) : null, Ft && Ne && (Zt != null && Zt.localSkillRootPath) ? c.jsx(PNt, {
        rootPath: Zt.localSkillRootPath,
        isDark: n,
        rightOffset: Number(xr.width),
        sessionRelPaths: er,
        request: Ae,
        renderMarkdown: zie,
        onClose: () => me(!1),
        onAddToCanvas: re,
        onSendImageToCanvas: fe,
        onSendLocalSkillImageToCanvas: ye,
        onRevealInExplorer: In => {
          !(Zt != null && Zt.localSkillRootPath) || !we || we(RE(Zt.localSkillRootPath, In));
        }
      }) : null, c.jsxs("div", {
        className: "sketch-chat-panel-body",
        children: [c.jsxs("div", {
          className: `sketch-chat-header ${n ? "sketch-chat-header-dark" : ""}`,
          children: [c.jsxs("div", {
            className: "sketch-chat-header-main",
            children: [Ft && (Zt != null && Zt.localSkillRootPath) ? c.jsx("button", {
              type: "button",
              className: `sketch-chat-header-mark transition-colors ${Ne ? n ? "bg-white/10 text-white" : "bg-zinc-200 text-zinc-900" : ""}`,
              onClick: () => me(In => !In),
              title: x(Ne ? "关闭工作区文件" : "打开工作区文件"),
              "aria-label": x(Ne ? "关闭工作区文件" : "打开工作区文件"),
              "aria-pressed": Ne,
              children: c.jsx(Hd, {
                size: 14,
                strokeWidth: 1.7
              })
            }) : null, it && Un ? c.jsx("button", {
              type: "button",
              className: `sketch-chat-header-mark transition-colors ${ve ? n ? "bg-white/10 text-white" : "bg-zinc-200 text-zinc-900" : ""}`,
              onClick: () => Te(In => !In),
              title: x(ve ? "关闭参考" : "打开参考"),
              "aria-label": x(ve ? "关闭参考" : "打开参考"),
              "aria-pressed": ve,
              children: c.jsx(Hd, {
                size: 14,
                strokeWidth: 1.7
              })
            }) : null, c.jsxs("div", {
              ref: Ct,
              className: "sketch-chat-session-switcher",
              children: [c.jsxs("button", {
                type: "button",
                className: `sketch-chat-session-trigger ${qe ? "sketch-chat-session-trigger--open" : ""}`,
                title: hte(Zt == null ? void 0 : Zt.title),
                "aria-haspopup": "menu",
                "aria-expanded": qe,
                onClick: () => kt(In => !In),
                children: [c.jsx("span", {
                  className: `sketch-chat-title ${n ? "sketch-chat-title-dark" : ""}`,
                  children: hte(Zt == null ? void 0 : Zt.title)
                }), c.jsx(Mi, {
                  size: 12,
                  strokeWidth: 1.8,
                  className: `sketch-chat-session-trigger-chevron ${qe ? "sketch-chat-session-trigger-chevron--open" : ""}`,
                  "aria-hidden": "true"
                })]
              }), qe && c.jsxs("div", {
                ref: un,
                className: "sketch-chat-session-menu rh-scroll-minimal",
                role: "menu",
                "aria-label": x("切换对话"),
                children: [c.jsxs("button", {
                  type: "button",
                  className: "sketch-chat-session-new",
                  role: "menuitem",
                  onClick: In => {
                    In.preventDefault(), In.stopPropagation(), Ot(null), kt(!1), T();
                  },
                  children: [c.jsx(eo, {
                    size: 15,
                    strokeWidth: 1.8,
                    "aria-hidden": "true"
                  }), c.jsx("span", {
                    children: x("新建对话")
                  })]
                }), Ft ? c.jsxs("div", {
                  className: "sketch-chat-workspace-block",
                  children: [c.jsxs("div", {
                    className: "sketch-chat-workspace-head",
                    children: [c.jsx("span", {
                      className: "sketch-chat-workspace-label",
                      children: x("工作区")
                    }), c.jsxs("div", {
                      className: "sketch-chat-workspace-search",
                      children: [c.jsx(mc, {
                        size: 12,
                        strokeWidth: 1.8
                      }), c.jsx("input", {
                        type: "search",
                        value: Me,
                        placeholder: x("搜索会话"),
                        onClick: In => In.stopPropagation(),
                        onChange: In => Re(In.target.value)
                      })]
                    }), c.jsx("button", {
                      type: "button",
                      className: "sketch-chat-workspace-add",
                      title: x("添加工作区"),
                      onClick: In => {
                        In.preventDefault(), In.stopPropagation(), kt(!1), ie ? ie() : le == null || le();
                      },
                      children: c.jsx(Jle, {
                        size: 13,
                        strokeWidth: 1.8
                      })
                    })]
                  }), c.jsx("div", {
                    className: "sketch-chat-workspace-folders",
                    children: an.length === 0 ? c.jsxs("button", {
                      type: "button",
                      className: "sketch-chat-workspace-folder-main",
                      onClick: In => {
                        In.preventDefault(), In.stopPropagation(), le == null || le();
                      },
                      children: [c.jsx(_h, {
                        size: 13
                      }), c.jsx("span", {
                        children: x("选择本机工作区目录")
                      })]
                    }) : an.map(In => {
                      const fr = aan(In.path),
                        na = !!Me.trim(),
                        Ba = na || $e.includes(fr),
                        ai = e_(In.path, Zt == null ? void 0 : Zt.localSkillRootPath),
                        vi = nt.includes(fr),
                        Vi = na || vi ? In.sessions : In.sessions.slice(0, ran),
                        Ti = Math.max(0, In.sessions.length - ran);
                      return c.jsxs("div", {
                        className: `sketch-chat-workspace-group ${ai ? "is-current" : ""}`,
                        children: [c.jsxs("div", {
                          className: `sketch-chat-workspace-folder ${ai ? "is-current" : ""}`,
                          children: [c.jsxs("button", {
                            type: "button",
                            title: In.path,
                            className: "sketch-chat-workspace-folder-main",
                            onClick: Gi => {
                              if (Gi.preventDefault(), Gi.stopPropagation(), !ai) {
                                ae == null || ae(In.path), rt(hi => hi.includes(fr) ? hi : [...hi, fr]);
                                return;
                              }
                              rt(hi => hi.includes(fr) ? hi.filter(vo => vo !== fr) : [...hi, fr]);
                            },
                            children: [c.jsx(ss, {
                              size: 12,
                              className: `sketch-chat-workspace-chevron ${Ba ? "is-open" : ""}`
                            }), c.jsx(_h, {
                              size: 13
                            }), c.jsx("span", {
                              className: "truncate",
                              children: W6(In.path)
                            })]
                          }), c.jsx("button", {
                            type: "button",
                            className: "sketch-chat-workspace-add",
                            title: x("在此工作区新建会话"),
                            onClick: Gi => {
                              Gi.preventDefault(), Gi.stopPropagation(), kt(!1), T({
                                localSkillRootPath: In.path
                              });
                            },
                            children: c.jsx(eo, {
                              size: 13,
                              strokeWidth: 1.8
                            })
                          }), be ? c.jsx("button", {
                            type: "button",
                            className: "sketch-chat-workspace-folder-del",
                            title: x("从列表移除工作区（不删除电脑上的文件夹）"),
                            onClick: Gi => {
                              Gi.preventDefault(), Gi.stopPropagation();
                              const hi = W6(In.path);
                              window.confirm(x(`从列表移除工作区「{0}」？
不会删除电脑上的文件夹。`, hi)) && be(In.path);
                            },
                            children: c.jsx(Qo, {
                              size: 12
                            })
                          }) : null]
                        }), Ba ? c.jsxs("div", {
                          className: "sketch-chat-workspace-sessions",
                          children: [Vi.map(Gi => Tt(Gi)), In.sessions.length === 0 ? c.jsx("div", {
                            className: "sketch-chat-session-empty",
                            children: x("这个工作区还没有会话")
                          }) : null, !na && Ti > 0 ? c.jsx("button", {
                            type: "button",
                            className: "sketch-chat-workspace-more",
                            onClick: Gi => {
                              Gi.preventDefault(), Gi.stopPropagation(), ze(hi => hi.includes(fr) ? hi.filter(vo => vo !== fr) : [...hi, fr]);
                            },
                            children: vi ? x("收起会话") : x("展开其余 {0} 个会话", Ti)
                          }) : null]
                        }) : null]
                      }, In.path);
                    })
                  })]
                }) : null, Ft ? null : c.jsxs("div", {
                  className: "sketch-chat-session-list",
                  children: [Ge.map(In => Tt(In)), Ze.length === 0 ? c.jsx("div", {
                    className: "sketch-chat-session-empty",
                    children: x("还没有历史对话")
                  }) : null]
                }), !Ft && Oe.length > 0 ? c.jsxs(c.Fragment, {
                  children: [c.jsxs("button", {
                    type: "button",
                    className: `sketch-chat-session-summary sketch-chat-session-summary--toggle ${St ? "sketch-chat-session-summary--open" : ""}`,
                    "aria-expanded": St,
                    onClick: In => {
                      In.preventDefault(), In.stopPropagation(), hn(fr => !fr);
                    },
                    children: [c.jsx(ss, {
                      size: 12,
                      strokeWidth: 1.8,
                      className: `sketch-chat-session-summary-chevron ${St ? "sketch-chat-session-summary-chevron--open" : ""}`,
                      "aria-hidden": "true"
                    }), c.jsxs("span", {
                      children: [x("更早的对话 · "), Oe.length]
                    })]
                  }), St ? c.jsx("div", {
                    className: "sketch-chat-session-list sketch-chat-session-list--all",
                    children: Oe.map(In => Tt(In))
                  }) : null]
                }) : !Ft && Ze.length > 0 ? c.jsx("div", {
                  className: "sketch-chat-session-summary",
                  children: c.jsxs("span", {
                    children: [x("对话 · "), Ze.length]
                  })
                }) : null]
              })]
            })]
          }), c.jsxs("div", {
            className: "sketch-chat-header-actions",
            children: [c.jsx("button", {
              onClick: () => Kn(!Jn),
              className: `sketch-chat-header-btn ${Jn ? "sketch-chat-header-btn--active" : ""}`,
              title: x("聊天记录云端备份设置"),
              children: c.jsx(IP, {
                size: 14
              })
            }), c.jsx("button", {
              onClick: t,
              title: x("关闭"),
              className: "sketch-chat-header-btn",
              children: c.jsx(ss, {
                size: 14
              })
            })]
          })]
        }), Jn && c.jsxs("div", {
          className: `sketch-chat-oss-panel px-3.5 py-3 border-b text-xs space-y-3 shrink-0 ${n ? "sketch-chat-oss-panel-dark border-zinc-800 text-zinc-300" : "border-zinc-200 text-zinc-700"}`,
          children: [c.jsx("div", {
            className: "flex items-center justify-between",
            children: c.jsxs("label", {
              className: "flex items-center gap-2 cursor-pointer font-medium",
              children: [c.jsx("input", {
                type: "checkbox",
                checked: at.enabled,
                onChange: In => Pt({
                  enabled: In.target.checked
                }),
                className: "rounded accent-blue-600"
              }), c.jsx(Wp, {
                size: 14,
                className: "text-blue-500"
              }), Xt(" Chat ")]
            })
          }), !yn && at.enabled && c.jsxs("div", {
            className: `flex items-start gap-1.5 p-2 rounded text-[10px] ${n ? "bg-amber-950/20 text-amber-400" : "bg-amber-50 text-amber-800"}`,
            children: [c.jsx(c3, {
              size: 12,
              className: "shrink-0 mt-0.5"
            }), c.jsx("p", {
              children: Gn
            })]
          }), at.enabled && yn && c.jsxs("div", {
            className: "pt-1 flex gap-2",
            children: [c.jsxs("button", {
              type: "button",
              disabled: dt,
              onClick: async () => {
                try {
                  await gn();
                } catch (In) {
                  alert(x("备份失败：{0}", In instanceof Error ? In.message : String(In)));
                }
              },
              className: `flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded text-xs font-medium transition-colors ${n ? "bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50" : "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"}`,
              children: [c.jsx(ml, {
                size: 13
              }), x("备份到云端")]
            }), c.jsxs("button", {
              type: "button",
              disabled: dt,
              onClick: async () => {
                try {
                  await mt();
                } catch (In) {
                  alert(x("恢复失败：{0}", In instanceof Error ? In.message : String(In)));
                }
              },
              className: `flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded text-xs font-medium transition-colors border ${n ? "bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700 disabled:opacity-50" : "bg-white border-zinc-300 text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"}`,
              children: [c.jsx(ws, {
                size: 13
              }), x("从云端恢复")]
            })]
          }), dt && xt.percent > 0 && c.jsxs("div", {
            className: "space-y-1",
            children: [c.jsxs("div", {
              className: "flex justify-between items-center",
              children: [c.jsxs("span", {
                className: `text-[10px] ${n ? "text-zinc-500" : "text-zinc-400"}`,
                children: [xt.message || (xt.kind === "upload" ? x("正在备份") : x("正在恢复")), "..."]
              }), c.jsxs("span", {
                className: `text-[10px] font-mono ${n ? "text-zinc-500" : "text-zinc-400"}`,
                children: [xt.percent, "%"]
              })]
            }), c.jsx("div", {
              className: `h-1 rounded-full overflow-hidden ${n ? "bg-zinc-800" : "bg-zinc-200"}`,
              children: c.jsx("div", {
                className: "h-full rounded-full bg-blue-500 transition-all duration-300",
                style: {
                  width: `${xt.percent}%`
                }
              })
            })]
          })]
        }), c.jsx("div", {
          className: `sketch-chat-messages-wrap flex-1 min-h-0 relative flex flex-col ${Bn.length > 1 ? "sketch-chat-messages-wrap--with-locator" : ""} ${n ? "sketch-chat-messages-dark" : ""}`,
          children: Ue ? c.jsxs(c.Fragment, {
            children: [c.jsxs("div", {
              ref: Dn,
              "data-chat-copy-zone": !0,
              className: `sketch-chat-messages chat-scroll-minimal select-text ${n ? "sketch-chat-messages-dark" : ""}`,
              style: {
                fontSize: TOa[i]
              },
              onPointerDown: pn,
              children: [xn.length > 0 ? Sr.shouldVirtualize ? c.jsx("div", {
                style: {
                  height: Sr.totalHeight,
                  position: "relative",
                  width: "100%"
                },
                children: Sr.visibleMessages.map(({
                  msg: In,
                  top: fr
                }) => c.jsx(san, {
                  liveSessionId: l,
                  msg: In,
                  isDark: n,
                  selected: Ft ? !1 : kn.has(In.id),
                  chatFontSize: i,
                  isChatSending: d,
                  isAgentPanelMode: it,
                  isSkillPanelMode: It,
                  chatAgentGenPrefs: Q,
                  onSetChatAgentGenPrefs: q,
                  onPatchChatMessage: de,
                  onSendChatMessage: B,
                  onQuoteChatMessage: va,
                  onOpenChatMediaLightbox: X,
                  isLastAssistantMessage: In.id === Fn,
                  onResendChatMessage: G,
                  onResolveAgentChoice: ne,
                  onContextMenu: or,
                  onMeasured: Zn,
                  onUndoLocalSkillEdit: ce,
                  onReviewLocalSkillFile: Ft ? Cr : we,
                  localSkillWorkspaceRoot: Ft ? Zt == null ? void 0 : Zt.localSkillRootPath : void 0,
                  getCanvasAtMentionItems: Z,
                  sessionReferenceAssets: In.role === "assistant" ? En.get(In.id) : void 0,
                  style: {
                    position: "absolute",
                    top: fr,
                    left: 0,
                    right: 0
                  }
                }, In.id))
              }) : Sr.visibleMessages.map(({
                msg: In
              }) => c.jsx(san, {
                liveSessionId: l,
                msg: In,
                isDark: n,
                selected: Ft ? !1 : kn.has(In.id),
                chatFontSize: i,
                isChatSending: d,
                isAgentPanelMode: it,
                isSkillPanelMode: It,
                chatAgentGenPrefs: Q,
                onSetChatAgentGenPrefs: q,
                onPatchChatMessage: de,
                onSendChatMessage: B,
                onQuoteChatMessage: va,
                onOpenChatMediaLightbox: X,
                isLastAssistantMessage: In.id === Fn,
                onResendChatMessage: G,
                onResolveAgentChoice: ne,
                onContextMenu: or,
                onMeasured: Zn,
                onUndoLocalSkillEdit: ce,
                onReviewLocalSkillFile: Ft ? Cr : we,
                localSkillWorkspaceRoot: Ft ? Zt == null ? void 0 : Zt.localSkillRootPath : void 0,
                getCanvasAtMentionItems: Z,
                sessionReferenceAssets: In.role === "assistant" ? En.get(In.id) : void 0
              }, In.id)) : c.jsx(WPa, {
                isDark: n,
                resetKey: l
              }), c.jsx(tBa, {
                sessionId: l,
                baseLastMessage: Zt == null ? void 0 : Zt.messages[Zt.messages.length - 1],
                isChatSending: d,
                isDark: n,
                tone: Ft ? "local-skill" : it ? "agent" : "chat"
              })]
            }), c.jsx(eYe, {
              items: Bn,
              isDark: n,
              onJump: Et
            }), Ar.canScroll && c.jsxs("div", {
              className: "sketch-chat-scroll-nav absolute z-10 pointer-events-none flex",
              children: [!Ar.atTop && c.jsx("button", {
                type: "button",
                onClick: Rt,
                title: x("快速到顶部"),
                className: `sketch-chat-scroll-btn pointer-events-auto p-1.5 rounded-lg transition-colors ${n ? "bg-zinc-800/90 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-700" : "bg-white/95 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 border border-zinc-200"}`,
                children: c.jsx(j2, {
                  size: 14
                })
              }), !Ar.atBottom && c.jsx("button", {
                type: "button",
                onClick: fn,
                title: x("快速到底部"),
                className: `sketch-chat-scroll-btn pointer-events-auto p-1.5 rounded-lg transition-colors ${n ? "bg-zinc-800/90 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-700" : "bg-white/95 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 border border-zinc-200"}`,
                children: c.jsx(Mi, {
                  size: 14
                })
              })]
            })]
          }) : c.jsx("div", {
            className: "flex-1 min-h-0",
            "aria-hidden": !0
          })
        }), c.jsxs("div", {
          className: `sketch-chat-input-area shrink-0 ${n ? "sketch-chat-input-area-dark" : ""}`,
          children: [c.jsx(Y9a, {
            visible: !!Nn,
            activeTodo: Nn,
            isDark: n
          }), vr && ZNe(vr) ? c.jsx("div", {
            className: `sketch-chat-ask-card ${n ? "sketch-chat-ask-card-dark" : ""}`,
            children: c.jsx(zDt, {
              content: ((Fa = vr.agentPlanContent) == null ? void 0 : Fa.trim()) || vr.content,
              isDark: n,
              disabled: d && !ZNe(vr),
              placement: "composer",
              agentPendingChoice: vr.agentPendingChoice,
              dismissed: vr.agentQuickRepliesDismissed,
              onQuickReply: B,
              onResolveChoice: Wt
            })
          }) : null, (Ra = vr == null ? void 0 : vr.skillCreatorQuestions) != null && Ra.length && !String(vr.skillCreatorAnswerText || "").trim() ? c.jsx("div", {
            className: `sketch-chat-ask-card ${n ? "sketch-chat-ask-card-dark" : ""}`,
            children: c.jsx(fXn, {
              questions: vr.skillCreatorQuestions,
              isDark: n,
              compact: !0,
              disabled: d,
              onSubmit: Jt
            })
          }) : null, c.jsxs("div", {
            className: `sketch-chat-input ${n ? "sketch-chat-input-dark" : ""} ${je ? "sketch-chat-input--drag-over" : ""}`,
            "data-chat-file-drop-zone": !0,
            onDragEnter: Qn,
            onDragOver: Lt,
            onDragLeave: ct,
            onDrop: Dt,
            children: [c.jsx("div", {
              className: `sketch-chat-input-resize-wrap ${wr ? "sketch-chat-input-resize-wrap--active" : ""}`,
              onMouseDown: Hn,
              children: c.jsx("div", {
                className: `sketch-chat-input-resize-handle ${n ? "sketch-chat-input-resize-handle-dark" : ""}`
              })
            }), Ft ? c.jsxs("div", {
              className: `sketch-chat-local-skill-workspace-chip ${n ? "text-white/70" : "text-zinc-500"}`,
              children: [c.jsx("span", {
                className: "truncate min-w-0",
                title: Zt != null && Zt.localSkillRootPath ? x("写入工作区：{0}", Zt.localSkillRootPath) : x("尚未绑定写入工作区"),
                children: Zt != null && Zt.localSkillRootPath ? x("写入 · {0}", W6(Zt.localSkillRootPath)) : x("未绑定工作区")
              }), Zt != null && Zt.localSkillRootPath ? c.jsx("button", {
                type: "button",
                className: n ? "text-white/85" : "text-zinc-700",
                title: x("选择要读取的文件夹，路径会插入输入框；不会更换工作区"),
                onClick: () => {
                  uBn().then(In => {
                    if (!In) return;
                    const fr = xe || "",
                      na = fr.trim() ? `${fr.replace(/\s+$/, "")}
${In}` : In;
                    Lr(na, na.length), window.requestAnimationFrame(() => {
                      var Ba;
                      (Ba = vn.current) == null || Ba.focus();
                    });
                  });
                },
                children: x("指定读取")
              }) : le ? c.jsx("button", {
                type: "button",
                className: n ? "text-white/85" : "text-zinc-700",
                onClick: () => le(),
                children: x("选择工作区")
              }) : null]
            }) : null, c.jsx(GOa, {
              files: ue,
              isDark: n,
              quotedMessage: _e,
              onClearQuote: ke ? () => ke(null) : void 0,
              onRemove: In => ge(fr => (KN(fr[In]), fr.filter((na, Ba) => Ba !== In))),
              onClearAll: () => {
                ge(In => (Ez(In), []));
              }
            }), c.jsxs("div", {
              className: "sketch-chat-composer-line",
              children: [Za ? c.jsx(GPa, {
                name: Za.name,
                isDark: n,
                onClear: () => {
                  !Q || !q || q({
                    ...Q,
                    activeSkillId: null
                  });
                }
              }) : null, c.jsx("textarea", {
                ref: vn,
                "data-chat-composer": "",
                value: xe,
                onChange: In => {
                  const fr = In.target.value,
                    na = In.target.selectionStart ?? fr.length;
                  Lr(fr, na), Hr.syncFromInput(fr, na);
                },
                onKeyDown: In => {
                  Hr.handleKeyDown(In) || br(In);
                },
                onClick: In => {
                  Hr.syncFromInput(In.currentTarget.value, In.currentTarget.selectionStart ?? In.currentTarget.value.length);
                },
                onKeyUp: In => {
                  (In.key === "ArrowLeft" || In.key === "ArrowRight" || In.key === "Home" || In.key === "End") && Hr.syncFromInput(In.currentTarget.value, In.currentTarget.selectionStart ?? In.currentTarget.value.length);
                },
                onCompositionStart: Jr,
                onCompositionEnd: Kr,
                onPaste: $t,
                placeholder: _e ? x("针对引用内容提问…") : L === "agent" ? x("描述创意或需求，/ 使用技能，@ 引用参考") : L === "local-skill" ? Zt != null && Zt.localSkillRootPath ? x("说要做什么，或粘贴本机路径。") : x("请先在上方工作区列表选择写入目录") : x("描述创意或需求，@ 引用参考"),
                className: "chat-scroll-minimal",
                style: {
                  height: Math.max(tan, rr)
                }
              })]
            }), Ke ? c.jsxs("div", {
              className: "px-3 pb-1 text-[10px] text-zinc-500",
              title: x("对话自动保存上下文；编辑或删除历史后按当前记录重新建立上下文。缓存命中数显示在回复中。"),
              children: [Le.error || (Le.catalog ? Le.catalog.connected ? Ye ? x("{0} 已连接 · 上下文自动延续", Le.catalog.authMode === "chatgpt" ? "ChatGPT" : "Codex") : x("当前 Codex 版本未提供此模型，请更新 Codex") : x("请先在 Codex 客户端登录账号") : x("正在连接 Codex…")), us() && c.jsx("button", {
                type: "button",
                className: "ml-2 hover:text-zinc-300",
                title: x("打开本对话的上下文目录：会话记录、附件引用与续聊标识。服务端缓存命中由 Codex 决定。"),
                onClick: () => {
                  nPa(l).catch(In => alert(x(String(In.message || In))));
                },
                children: x("本地上下文 ↗")
              })]
            }) : null, c.jsxs("div", {
              className: `sketch-chat-toolbar ${n ? "sketch-chat-toolbar-dark" : ""}`,
              children: [c.jsxs("div", {
                className: "sketch-chat-toolbar-left rh-scroll-minimal",
                children: [c.jsxs("label", {
                  className: "sketch-chat-toolbar-icon-btn sketch-chat-toolbar-plus cursor-pointer",
                  title: x("添加附件（图片/视频/文本/表格文档，最多{0}个）", my),
                  children: [c.jsx(eo, {
                    size: 14
                  }), c.jsx("input", {
                    type: "file",
                    accept: OVn,
                    multiple: !0,
                    className: "hidden",
                    onChange: In => {
                      const fr = In.target,
                        na = Array.from(fr.files || []),
                        Ba = my - ue.length;
                      if (na.length > Ba) {
                        alert(x("最多只能上传{0}个文件，当前已有{1}个，还可以上传{2}个", my, ue.length, Ba)), fr.value = "";
                        return;
                      }
                      uNe(na, ue.length, ge).finally(() => {
                        fr.value = "";
                      });
                    }
                  })]
                }), D ? c.jsxs(c.Fragment, {
                  children: [c.jsx("span", {
                    className: "sketch-chat-toolbar-divider",
                    "aria-hidden": "true"
                  }), c.jsx(qs, {
                    scopeId: "chat-panel",
                    dropdownType: "chat-panel-mode",
                    value: L || "normal",
                    options: POa,
                    isDark: n,
                    activeDropdown: At,
                    setActiveDropdown: Yt,
                    onSelect: In => D(In),
                    menuPlacement: "above",
                    className: "sketch-chat-mode-pill",
                    menuClassName: "sketch-chat-popover",
                    minMenuWidth: 88
                  })]
                }) : null, We && Q && q ? c.jsx(Q6a, {
                  prefs: Q,
                  onChange: q,
                  imageConfigs: He,
                  videoConfigs: Ve,
                  isDark: n,
                  chatPanelMode: L,
                  localSkillRootPath: Zt == null ? void 0 : Zt.localSkillRootPath,
                  onPickLocalSkillRoot: le,
                  onCreateSkillFromChat: F,
                  createSkillDisabledReason: tt,
                  onOpenChange: In => {
                    In && Yt(null);
                  },
                  className: "shrink-0",
                  iconOnly: !0
                }) : null, c.jsx(Y6a, {
                  isDark: n,
                  onOpenChange: In => {
                    In && Yt(null);
                  },
                  showWebSearch: !Ht && !((ui = dh((st == null ? void 0 : st.id) || o)) != null && ui.nativeChat) && Ut && !!k,
                  webSearchEnabled: p,
                  onSetWebSearch: k,
                  webSearchTitle: Ke ? "开启后允许当前 Codex 模型实时检索网页；关闭后禁用联网搜索" : m === "responses" ? "勾选后在 Responses 请求中附加联网工具（web_search）" : "勾选后文本对话自动走 Responses API 联网搜索",
                  showOss: !Ke && wn && !!C,
                  ossEnabled: y,
                  onSetOss: C,
                  ossLabel: $g(bt),
                  ossTitle: Jk(bt),
                  showOssImageBase64: !Ke && !!I,
                  ossImageBase64: b,
                  onSetOssImageBase64: I,
                  apiProtocol: m,
                  onSetApiProtocol: Ke || (pr = dh((st == null ? void 0 : st.id) || o)) != null && pr.nativeChat ? void 0 : A,
                  protocolOptions: ROa,
                  showHistory: !Ft && !Ke && !nn,
                  historyCount: h,
                  onSetHistory: M,
                  historyOptions: MOa,
                  showPlatformGroup: _t && !!w,
                  platformGroup: _,
                  onSetPlatformGroup: w,
                  platformNodeId: Ft ? "chat-panel-local-skill" : "chat-panel",
                  platformModelName: (st == null ? void 0 : st.modelName) || o,
                  platformModelId: o,
                  persistPlatformSettings: !Ft,
                  showPermission: Ft && !!J,
                  permission: pe,
                  onSetPermission: J,
                  permissionWorkspaceLabel: Zt != null && Zt.localSkillRootPath ? W6(Zt.localSkillRootPath) : void 0,
                  permissionSkillId: ERt(Zt == null ? void 0 : Zt.localSkillRootPath)
                })]
              }), c.jsxs("div", {
                className: "sketch-chat-toolbar-right",
                children: [nn ? c.jsx(fRa, {
                  usage: Zt == null ? void 0 : Zt.officialContextUsage,
                  isDark: n,
                  emptyTitle: Ht ? "官方 MiMo 全量回读 · 上下文 1M" : void 0
                }) : null, c.jsx(Th, {
                  scopeId: "chat-panel",
                  dropdownType: "chat-panel-model",
                  value: o,
                  models: De,
                  scrollToSelected: !1,
                  isDark: n,
                  activeDropdown: At,
                  setActiveDropdown: Yt,
                  onSelect: v,
                  disabled: Ln,
                  buttonTitle: Ln ? Ht ? "官方 MiMo 已开始对话，不能中途换模型，以免打断上下文缓存" : "官方 DeepSeek 已开始对话，不能中途换模型，以免打断上下文缓存" : void 0,
                  menuPlacement: "above",
                  menuAlign: "end",
                  showChannelBar: !0,
                  menuMaxHeight: 360,
                  buttonVariant: "transparent",
                  menuClassName: "sketch-chat-popover",
                  className: "sketch-chat-model-picker !flex-none shrink-0 min-w-0 max-w-[11rem]"
                }), gt ? c.jsx(hYe, {
                  nodeId: "chat-panel",
                  dropdownType: "chat-panel-mimo-video-send",
                  value: pt,
                  isDark: n,
                  activeDropdown: At,
                  setActiveDropdown: Yt,
                  onSelect: lt,
                  menuPlacement: "above",
                  menuAlign: "end",
                  buttonVariant: "bare",
                  buttonClassName: "shrink-0 text-xs",
                  menuClassName: "sketch-chat-popover"
                }) : null, S && (Ke || TT(o, st == null ? void 0 : st.modelName)) ? c.jsx(dT, {
                  nodeId: "chat-panel",
                  dropdownType: "chat-panel-reasoning-effort",
                  optionsOverride: Ke ? Ce : void 0,
                  unavailableMessage: Ke ? Le.loading ? "正在读取 Codex 思考档位…" : Le.error || "当前 Codex 未提供此模型的思考档位，请检测 Chat 连接" : void 0,
                  onRetry: Ke ? Le.refresh : void 0,
                  value: f,
                  isDark: n,
                  activeDropdown: At,
                  setActiveDropdown: Yt,
                  onSelect: S,
                  menuPlacement: "above",
                  menuAlign: "end",
                  buttonVariant: "bare",
                  buttonClassName: "shrink-0 text-xs",
                  menuClassName: "sketch-chat-popover",
                  modelId: o,
                  modelName: st == null ? void 0 : st.modelName
                }) : null, c.jsx(XIe, {
                  kind: "chat",
                  value: xe,
                  onChange: In => Lr(In, In.length),
                  isDark: n,
                  scopeId: "chat-panel",
                  mediaCount: ue.length,
                  disabled: d,
                  variant: "icon",
                  fallbackModelId: Mu(o) ? void 0 : o,
                  reasoningEffort: f
                }), c.jsx("button", {
                  onClick: () => {
                    if (d && N) {
                      N();
                      return;
                    }
                    const In = xe;
                    if (Ft && !(Zt != null && Zt.localSkillRootPath)) {
                      le ? le() : alert(x("请先选择本地 Skill 目录"));
                      return;
                    }
                    (In.trim() || ue.length > 0) && B(In);
                  },
                  className: `sketch-chat-send ${n ? "sketch-chat-send-dark" : ""} ${(xe.trim() || ue.length > 0) && !d || d && N ? "sketch-chat-send--active" : ""}`,
                  disabled: d ? !N : !xe.trim() && ue.length === 0,
                  title: x(d ? "停止发送" : "发送"),
                  children: d ? c.jsx(kf, {
                    size: 14,
                    strokeWidth: 0,
                    fill: "currentColor"
                  }) : c.jsx(Gc, {
                    size: 16,
                    strokeWidth: 2
                  })
                })]
              })]
            })]
          })]
        })]
      }), Hr.open && typeof document < "u" ? Da.createPortal(c.jsx($Pa, {
        skills: Hr.matched,
        query: Hr.query,
        activeIndex: Hr.activeIndex,
        isDark: n,
        position: Hr.position,
        menuRef: Hr.menuRef,
        onHover: Hr.setActiveIndex,
        onSelect: Hr.selectSkill
      }), document.body) : null, ur && typeof document < "u" ? Da.createPortal(c.jsx(_Xn, {
        isDark: n,
        position: zr,
        searchQuery: Dr,
        onSearchQueryChange: Wr,
        connectedNodes: [],
        onSelectConnectedSlot: () => {},
        folderCategories: gr,
        assetItems: jr,
        categoryView: ea,
        onCategoryViewChange: pa,
        onSelectAsset: ir,
        activeNavIndex: Br,
        dropdownRef: tn,
        onPointerDownCapture: In => {
          In.stopPropagation();
          const fr = In.target;
          fr != null && fr.closest("input") || In.preventDefault();
        },
        onMouseDown: In => {
          In.stopPropagation();
          const fr = In.target;
          fr != null && fr.closest("input") || In.preventDefault();
        }
      }), document.body) : null, ga ? c.jsx(UOa, {
        ui: ga,
        isDark: n,
        onQuote: Kt
      }) : null, typeof document < "u" && Zr.open && !Ft ? Da.createPortal(c.jsxs("div", {
        ref: ba,
        "data-chat-message-menu": !0,
        className: `sketch-menu sketch-menu--portal-fixed min-w-[190px] sketch-menu-enter ${n ? "sketch-menu-dark" : ""}`,
        style: {
          left: sa.x,
          top: sa.y,
          visibility: sa.x === 0 && sa.y === 0 ? "hidden" : "visible"
        },
        onClick: In => In.stopPropagation(),
        onMouseDown: In => In.stopPropagation(),
        onContextMenu: In => In.preventDefault(),
        children: [c.jsx("button", {
          type: "button",
          onClick: Yr,
          className: "sketch-menu-item",
          children: x("引用此条")
        }), c.jsx("button", {
          type: "button",
          onClick: mr,
          className: "sketch-menu-item",
          children: Zr.targetMessageId && Ir.includes(Zr.targetMessageId) ? x("取消选中此条") : x("选中此条")
        }), c.jsxs("button", {
          type: "button",
          onClick: xa,
          disabled: tr === 0,
          className: `sketch-menu-item ${tr === 0 ? "opacity-40 cursor-not-allowed" : ""}`,
          children: [x("保存已选消息为 Skill（"), tr, "）"]
        }), c.jsxs("button", {
          type: "button",
          onClick: () => wa(),
          disabled: tr === 0,
          className: `sketch-menu-item ${tr === 0 ? "opacity-40 cursor-not-allowed" : ""}`,
          title: x("删除选中的消息（仅影响当前会话）"),
          children: [x("删除选中消息（"), tr, "）"]
        }), c.jsx("button", {
          type: "button",
          onClick: aa,
          disabled: tr === 0,
          className: `sketch-menu-item ${tr === 0 ? "opacity-40 cursor-not-allowed" : ""}`,
          children: x("清空选择")
        })]
      }), document.body) : null, $a && c.jsx("div", {
        className: "fixed inset-0 z-[300] flex items-center justify-center bg-black/50 p-4",
        onClick: () => Ya(null),
        children: c.jsxs("div", {
          className: `w-full max-w-md rounded-xl border shadow-2xl p-5 ${n ? "bg-[#18181b] border-zinc-700" : "bg-white border-zinc-200"}`,
          onClick: In => In.stopPropagation(),
          onMouseDown: In => In.stopPropagation(),
          children: [c.jsx("h3", {
            className: `text-sm font-semibold mb-3 ${n ? "text-zinc-100" : "text-zinc-900"}`,
            children: $a.title
          }), c.jsx("input", {
            ref: Wn,
            type: "text",
            value: ta,
            onChange: In => ki(In.target.value),
            onKeyDown: In => {
              In.key === "Enter" ? (In.preventDefault(), Aa()) : In.key === "Escape" && (In.preventDefault(), Ya(null));
            },
            className: `w-full px-3 py-2 rounded-lg border text-sm outline-none ${n ? "bg-zinc-900 border-zinc-700 text-zinc-100 focus:border-amber-500" : "bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-amber-500"}`,
            placeholder: x("Skill 名称")
          }), c.jsxs("div", {
            className: "mt-4 flex justify-end gap-2",
            children: [c.jsx("button", {
              type: "button",
              onClick: () => Ya(null),
              className: `px-3 py-1.5 text-xs rounded-lg border transition-colors ${n ? "border-zinc-600 text-zinc-300 hover:bg-zinc-800" : "border-zinc-300 text-zinc-600 hover:bg-zinc-100"}`,
              children: x("取消")
            }), c.jsx("button", {
              type: "button",
              onClick: Aa,
              className: "px-3 py-1.5 text-xs rounded-lg bg-amber-600 text-white hover:bg-amber-500 transition-colors",
              children: x("保存")
            })]
          })]
        })
      })]
    });
  },
  nBa = g.memo(der),
  rBa = Object.freeze(Object.defineProperty({
    __proto__: null,
    ChatAgentGenerationCard: XOa,
    ChatPanel: der,
    default: nBa
  }, Symbol.toStringTag, {
    value: "Module"
  }));

function git(e, t, n, r = Date.now()) {
  var d;
  if (!e.episodes.length && !e.extraction) return e;
  const {
    id: a,
    createdAt: i,
    updatedAt: o,
    revisions: s = [],
    ...l
  } = e;
  return JSON.stringify((d = s[0]) == null ? void 0 : d.content) === JSON.stringify(l) ? e : {
    ...e,
    revisions: [{
      id: n(),
      createdAt: r,
      label: t,
      content: l
    }, ...s]
  };
}

function uer() {
  const e = [],
    t = vp();
  for (const n of t) e.push({
    id: `skill:${n.id}`,
    name: n.name,
    prompt: n.content,
    source: "skill"
  });
  try {
    const n = localStorage.getItem(HX);
    if (n) {
      const r = JSON.parse(n);
      if (Array.isArray(r)) for (const a of r) a && typeof a.id == "string" && typeof a.prompt == "string" && e.push({
        id: `agent:${a.id}`,
        name: a.name || a.id,
        prompt: a.prompt,
        source: "agent"
      });
    }
  } catch {}
  return e;
}

function aBa(e) {
  if (!(e != null && e.trim())) return null;
  const n = uer().find(r => r.id === e);
  return (n == null ? void 0 : n.prompt) ?? null;
}

async function bwt(e) {
  if (!(e != null && e.trim())) return null;
  const t = aBa(e);
  if (t != null && t.trim()) return t;
  const n = await P7t(Xhe(e.startsWith("skill:") ? e.slice(6) : e));
  if (!(n != null && n.content.trim())) throw new Error("所选 Skill 不存在或内容为空，请重新选择。");
  return n.content;
}

const ppe = "Screenwriting",
  kde = "scripts-index.json",
  zP = "project.json";

function o$(e, ...t) {
  return [e.replace(/\\/g, "/").replace(/\/+$/, ""), ...t].join("/").replace(/\/+/g, "/");
}

function mCe() {
  return !!Ur.getDirectoryPathTauri();
}

async function mpe() {
  const e = Ur.getDirectoryPathTauri();
  return e ? o$(e, ppe) : null;
}

async function her(e) {
  try {
    const t = await Au(e);
    return typeof t == "string" ? t : new TextDecoder().decode(t);
  } catch {
    return null;
  }
}

function iBa(e) {
  return {
    id: e.id,
    name: e.name,
    episodeCount: Array.isArray(e.episodes) ? e.episodes.length : 0,
    updatedAt: e.updatedAt
  };
}

function per(e, t, n) {
  var i;
  const r = e.map(iBa).sort((o, s) => s.updatedAt - o.updatedAt);
  let a = t;
  return (!a || !r.some(o => o.id === a)) && (a = ((i = r[0]) == null ? void 0 : i.id) || ""), {
    version: 1,
    currentProjectId: a,
    customStyles: n,
    scripts: r
  };
}

async function oBa(e) {
  const t = await mpe();
  t && (await qc(t, {
    recursive: !0
  }), await ab(o$(t, kde), JSON.stringify(e, null, 2)));
}

async function sBa(e) {
  const t = Ur.getDirectoryHandle();
  if (!t) return;
  const a = await (await (await t.getDirectoryHandle(ppe, {
    create: !0
  })).getFileHandle(kde, {
    create: !0
  })).createWritable();
  await a.write(JSON.stringify(e, null, 2)), await a.close();
}

async function lBa(e, t) {
  const n = await mpe();
  if (!n) return;
  const r = o$(n, e);
  await qc(r, {
    recursive: !0
  }), await ab(o$(r, zP), t);
}

async function cBa(e, t) {
  const n = Ur.getDirectoryHandle();
  if (!n) return;
  const o = await (await (await (await n.getDirectoryHandle(ppe, {
    create: !0
  })).getDirectoryHandle(e, {
    create: !0
  })).getFileHandle(zP, {
    create: !0
  })).createWritable();
  await o.write(t), await o.close();
}

async function vwt(e, t, n) {
  if (!Ur.isAvailable()) return;
  const r = Array.isArray(e) ? e : [],
    a = per(r, t, n);
  if (mCe()) {
    await oBa(a);
    for (const i of r) {
      const o = i;
      o != null && o.id && (await lBa(o.id, JSON.stringify(i, null, 2)));
    }
    return;
  }
  await sBa(a);
  for (const i of r) {
    const o = i;
    o != null && o.id && (await cBa(o.id, JSON.stringify(i, null, 2)));
  }
}

async function dBa() {
  if (!Ur.isAvailable()) return null;
  try {
    if (mCe()) {
      const i = await mpe();
      if (!i) return null;
      const o = await her(o$(i, kde));
      if (!o) return null;
      const s = JSON.parse(o);
      return (s == null ? void 0 : s.version) === 1 && Array.isArray(s.scripts) ? s : null;
    }
    const e = Ur.getDirectoryHandle();
    if (!e) return null;
    const r = await (await (await e.getDirectoryHandle(ppe, {
        create: !1
      })).getFileHandle(kde, {
        create: !1
      })).getFile().then(i => i.text()),
      a = JSON.parse(r);
    return (a == null ? void 0 : a.version) === 1 && Array.isArray(a.scripts) ? a : null;
  } catch {
    return null;
  }
}

async function mer(e) {
  if (!Ur.isAvailable()) return null;
  try {
    if (mCe()) {
      const o = await mpe();
      if (!o) return null;
      const s = await her(o$(o, e, zP));
      return s ? JSON.parse(s) : null;
    }
    const t = Ur.getDirectoryHandle();
    if (!t) return null;
    const i = await (await (await (await t.getDirectoryHandle(ppe, {
      create: !1
    })).getDirectoryHandle(e, {
      create: !1
    })).getFileHandle(zP, {
      create: !1
    })).getFile().then(o => o.text());
    return JSON.parse(i);
  } catch {
    return null;
  }
}

async function uBa() {
  const e = await dBa();
  if (!e) return null;
  const t = [];
  for (const n of e.scripts) {
    const r = await mer(n.id);
    r && t.push(r);
  }
  return t.length === 0 ? null : {
    version: 1,
    currentProjectId: e.currentProjectId,
    customStyles: e.customStyles ?? [],
    projects: t
  };
}

async function fer(e) {
  if (!Ur.isAvailable()) return;
  if (mCe()) {
    const n = await mpe();
    if (!n) return;
    try {
      await hk(o$(n, e), {
        recursive: !0
      });
    } catch {}
    return;
  }
  const t = Ur.getDirectoryHandle();
  if (t) try {
    await (await t.getDirectoryHandle(ppe, {
      create: !1
    })).removeEntry(e, {
      recursive: !0
    });
  } catch {}
}

async function hBa(e) {
  const t = zP;
  if (mCe()) {
    const n = await mpe();
    if (!n) return [t];
    try {
      const r = o$(n, e),
        a = await i3(r),
        i = [];
      for (const o of a) o.isFile && i.push(o.name);
      return i.length ? i : [t];
    } catch {
      return [t];
    }
  }
  return [t];
}

const ger = "qiaodoumayi_screenwriting_oss_backup",
  $0e = "qiaodoumayi-screenwriting-oss-backup-changed",
  wwt = "qiaodoumayi-screenwriting-restored",
  TLt = "qiaodoumayi_screenwriting_oss_sync_",
  pJ = "Screenwriting",
  Mze = "qiaodoumayi_screenwriting_oss_known_cloud_ids";

function lan() {
  return {
    enabled: !1,
    folderName: pJ
  };
}

function QF() {
  try {
    const e = localStorage.getItem(ger);
    if (!e) return lan();
    const t = JSON.parse(e);
    return {
      enabled: !!t.enabled,
      folderName: String(t.folderName ?? pJ).trim() || pJ
    };
  } catch {
    return lan();
  }
}

function pBa(e) {
  const t = {
    enabled: !!e.enabled,
    folderName: String(e.folderName ?? pJ).trim() || pJ
  };
  localStorage.setItem(ger, JSON.stringify(t)), window.dispatchEvent(new CustomEvent($0e));
}

function AXe(e, t) {
  const n = (t || pJ).trim().replace(/^\/+/, "").replace(/\/+$/, "");
  return n === "" ? "" : `${n}/`;
}

function yer(e, t) {
  const n = e.replace(/^\/+/, "").replace(/\/+$/, ""),
    r = t.replace(/^\/+/, "");
  return `${n}/${r}`.replace(/\/+/g, "/");
}

function SXe(e, t, n) {
  const r = e.replace(/^\/+/, "").replace(/\/+$/, ""),
    a = n.replace(/^\/+/, "");
  return `${r}/${t}/${a}`.replace(/\/+/g, "/");
}

function Pze(e) {
  if (typeof e == "string" && e.trim()) return e;
  if (e && typeof e == "object") {
    const t = e.message;
    if (t && String(t).trim()) return String(t);
  }
  return String(e ?? "").trim() || "读取云端失败";
}

function IXe() {
  return n9();
}

function MLt() {
  try {
    const e = localStorage.getItem(Mze);
    if (!e) return [];
    const t = JSON.parse(e);
    return Array.isArray(t) ? t.filter(n => typeof n == "string" && n.length > 0) : [];
  } catch {
    return [];
  }
}

function PLt(e) {
  if (!e.length) return;
  const t = new Set(MLt());
  e.forEach(n => t.add(n));
  try {
    localStorage.setItem(Mze, JSON.stringify([...t]));
  } catch {}
}

function mBa(e) {
  const t = MLt().filter(n => n !== e);
  try {
    t.length === 0 ? localStorage.removeItem(Mze) : localStorage.setItem(Mze, JSON.stringify(t));
  } catch {}
}

function ake(e) {
  try {
    localStorage.setItem(`${TLt}${e}`, String(Date.now()));
  } catch {}
}

function ber(e) {
  try {
    const t = localStorage.getItem(`${TLt}${e}`);
    if (!t) return null;
    const n = Number(t);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

function RLt(e) {
  try {
    localStorage.removeItem(`${TLt}${e}`);
  } catch {}
}

function ver(e, t, n) {
  for (const r of t) e.has(r.id) ? ake(r.id) : n != null && n.clearMissing && RLt(r.id);
  return e;
}

function xwt(e, t, n = 45e3) {
  return Promise.race([e, new Promise((r, a) => setTimeout(() => a(new Error(`${t}超时（${Math.round(n / 1e3)}s）`)), n))]);
}

function wer(e) {
  return yer(e, kde);
}

async function xer(e, t) {
  try {
    const n = await Hp(wer(t), e),
      r = JSON.parse(new TextDecoder().decode(n));
    return Array.isArray(r == null ? void 0 : r.scripts) ? r.scripts : [];
  } catch (n) {
    if (rU(n)) return null;
    throw n;
  }
}

async function NLt(e, t, n) {
  const r = JSON.stringify({
    version: 1,
    scripts: [...n].sort((a, i) => i.updatedAt - a.updatedAt)
  }, null, 2);
  await Pv(wer(t), new TextEncoder().encode(r), "application/json", e);
}

async function fBa(e, t, n, r, a) {
  try {
    const i = a || SXe(t, n, zP),
      o = await Hp(i, e),
      s = JSON.parse(new TextDecoder().decode(o));
    return {
      id: s.id || n,
      name: s.name || (r == null ? void 0 : r.name) || n,
      episodeCount: Array.isArray(s.episodes) ? s.episodes.length : (r == null ? void 0 : r.episodeCount) ?? 0,
      updatedAt: s.updatedAt || (r == null ? void 0 : r.updatedAt) || Date.now()
    };
  } catch (i) {
    if (rU(i)) return null;
    throw i;
  }
}

async function gBa(e, t) {
  try {
    const n = await Hp(yer(t, "screenwriting_state.json"), e),
      r = JSON.parse(new TextDecoder().decode(n));
    return Array.isArray(r == null ? void 0 : r.projects) ? r.projects.filter(a => a == null ? void 0 : a.id).map(a => ({
      id: String(a.id),
      name: a.name || String(a.id),
      episodeCount: Array.isArray(a.episodes) ? a.episodes.length : 0,
      updatedAt: a.updatedAt || Date.now()
    })) : [];
  } catch (n) {
    if (rU(n)) return [];
    throw n;
  }
}

function yBa(e, t, n) {
  const r = new Set(),
    a = n.replace(/^\/+/, "").replace(/\/+$/, ""),
    i = new Set([kde, "screenwriting_state.json", a, pJ]),
    o = s => {
      let l = s.replace(/\\/g, "/").replace(/^\/+/, "");
      if (a && l.startsWith(`${a}/`)) l = l.slice(a.length + 1);else if (l === a) return;
      const d = l.split("/").filter(Boolean);
      if (d.length >= 2 && d[d.length - 1] === zP) {
        const u = d[d.length - 2];
        u && !i.has(u) && r.add(u);
        return;
      }
      if (d.length === 1) {
        const u = d[0];
        u && !u.includes(".") && !i.has(u) && r.add(u);
      }
    };
  return e.forEach(o), t.forEach(o), [...r];
}

function bBa(e) {
  return e.replace(/\\/g, "/").replace(/^\/+/, "");
}

function vBa(e) {
  const t = new Map();
  for (const n of e) {
    const r = bBa(n),
      a = r.match(/([^/]+)\/project\.json$/);
    a != null && a[1] && t.set(a[1], r);
  }
  return t;
}

async function wBa(e, t) {
  try {
    const {
        keys: n,
        prefixes: r
      } = await xwt(JJ(e, t), "扫描云端目录"),
      a = vBa(n),
      i = new Set(a.keys());
    return yBa(n, r, e).forEach(o => i.add(o)), {
      ids: [...i],
      projectKeys: a,
      listScanOk: !0
    };
  } catch (n) {
    return {
      ids: [],
      projectKeys: new Map(),
      listScanOk: !1,
      listScanError: Pze(n)
    };
  }
}

async function xBa(e) {
  const t = await mer(e);
  if (t) return t;
  const r = k7().projects.find(a => (a == null ? void 0 : a.id) === e);
  if (r) return r;
  throw new Error("本地未找到该剧本，请先编辑并保存");
}

async function _Ba(e, t, n) {
  var m;
  const r = IXe(),
    a = QF(),
    i = AXe(r, a.folderName);
  n == null || n({
    percent: 5,
    message: "正在读取本地剧本..."
  });
  const o = await xBa(e),
    s = JSON.stringify(o, null, 2),
    l = new TextEncoder().encode(s);
  n == null || n({
    percent: 40,
    message: "正在上传到云端..."
  });
  const d = SXe(i, e, zP);
  await xwt(Pv(d, l, "application/json", r), "上传剧本"), n == null || n({
    percent: 90,
    message: "正在更新云端索引..."
  });
  const u = o,
    h = {
      id: e,
      name: u.name || ((m = t.find(f => f.id === e)) == null ? void 0 : m.name) || e,
      episodeCount: Array.isArray(u.episodes) ? u.episodes.length : 0,
      updatedAt: u.updatedAt || Date.now()
    },
    p = new Map();
  for (const f of t) (f.id === e || ber(f.id) != null) && p.set(f.id, f.id === e ? h : f);
  p.set(e, h), await xwt(NLt(r, i, [...p.values()]), "更新云端索引"), ake(e), PLt([e]), n == null || n({
    percent: 100,
    message: "上传完成"
  });
}

async function kBa(e, t) {
  const n = IXe(),
    r = QF(),
    a = AXe(n, r.folderName);
  t == null || t({
    percent: 10,
    message: "正在从云端拉取剧本..."
  });
  let i;
  try {
    i = await Hp(SXe(a, e, zP), n);
  } catch (p) {
    throw new Error(`拉取云端剧本失败：${Pze(p)}`);
  }
  t == null || t({
    percent: 50,
    message: "正在解析剧本数据..."
  });
  const o = JSON.parse(new TextDecoder().decode(i));
  if (!o || typeof o != "object" || !o.id) throw new Error("云端剧本数据格式不正确");
  t == null || t({
    percent: 70,
    message: "正在写入本地..."
  });
  const s = k7(),
    l = [...s.projects],
    d = l.findIndex(p => (p == null ? void 0 : p.id) === e);
  d >= 0 ? l[d] = o : l.unshift(o);
  const h = {
    version: 1,
    currentProjectId: per(l, s.currentProjectId || e, s.customStyles).currentProjectId || e,
    customStyles: s.customStyles,
    projects: l
  };
  return qFe(h), await vwt(l, h.currentProjectId, h.customStyles), ake(e), PLt([e]), window.dispatchEvent(new CustomEvent(wwt, {
    detail: h
  })), t == null || t({
    percent: 100,
    message: "已同步到本地"
  }), h;
}

async function ABa(e, t, n) {
  const r = IXe(),
    a = QF(),
    i = AXe(r, a.folderName),
    o = new Set(),
    s = h => {
      const p = h.replace(/^\/+/, "").trim();
      p && o.add(SXe(i, e, p));
    };
  try {
    (await hBa(e)).forEach(s);
  } catch {
    s(zP);
  }
  try {
    const h = `${i.replace(/\/+$/, "")}/${e}/`,
      {
        keys: p
      } = await JJ(h, r);
    p.forEach(m => o.add(m.replace(/\\/g, "/")));
  } catch {}
  const l = [...o];
  for (let h = 0; h < l.length; h++) {
    n == null || n(`删除 ${h + 1}/${l.length}`);
    try {
      await aU(l[h], r);
    } catch (p) {
      if (!rU(p)) throw p;
    }
  }
  RLt(e), mBa(e);
  const u = ((await xer(r, i)) || []).filter(h => h.id !== e);
  await NLt(r, i, u), n == null || n("云端剧本已删除");
}

async function SBa(e) {
  const t = IXe(),
    n = QF(),
    r = AXe(t, n.folderName),
    a = new Set(e.map(b => b.id)),
    i = new Map(e.map(b => [b.id, b])),
    o = (await xer(t, r)) ?? [],
    s = new Map();
  o.forEach(b => s.set(b.id, b));
  const {
      ids: l,
      projectKeys: d,
      listScanOk: u,
      listScanError: h
    } = await wBa(r, t),
    p = new Set();
  u ? l.forEach(b => p.add(b)) : (s.forEach((b, v) => p.add(v)), MLt().forEach(b => p.add(b))), u && p.size === 0 && (await gBa(t, r)).forEach(v => p.add(v.id));
  const m = [],
    f = new Set(),
    y = [];
  for (const b of p) {
    const v = s.get(b) ?? i.get(b),
      _ = d.get(b);
    if (u && !_) continue;
    let w = await fBa(t, r, b, v, _);
    w && (f.add(b), y.push(w), m.push({
      ...w,
      source: "cloud",
      hasLocal: a.has(b)
    }));
  }
  if (m.sort((b, v) => v.updatedAt - b.updatedAt), ver(f, e, {
    clearMissing: u
  }), PLt([...f]), y.length > 0) try {
    await NLt(t, r, y);
  } catch (b) {
    console.warn("[screenwritingOssBackup] 回写云端 scripts-index.json 失败:", b);
  }
  return {
    scripts: m,
    uploadedIds: f,
    listScanOk: u,
    listScanError: h
  };
}

function IBa(e) {
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

function aj(e) {
  var t;
  return e.content.trim() || ((t = e.outline) == null ? void 0 : t.trim()) || "";
}

function CBa(e, t, n) {
  const r = e.findIndex(l => l.id === t);
  if (r < 0) return e;
  let a = r + n;
  for (; a >= 0 && a < e.length && !!e[a].segmentDetail != !!e[r].segmentDetail;) a += n;
  if (a < 0 || a >= e.length) return e;
  const i = [...e];
  [i[r], i[a]] = [i[a], i[r]];
  let o = 0,
    s = 0;
  return i.map(l => ({
    ...l,
    index: l.segmentDetail ? ++s : ++o
  }));
}

function EBa(e, t = []) {
  const n = e.indexOf("["),
    r = e.lastIndexOf("]");
  if (n < 0 || r <= n) throw new Error("模型未返回有效分镜表，原有内容已保留");
  const a = JSON.parse(e.slice(n, r + 1));
  if (!Array.isArray(a) || !a.length) throw new Error("分镜表为空，原有内容已保留");
  const i = t.reduce((s, l) => Math.max(s, l.shot_no), 0),
    o = a.map((s, l) => {
      if (!s || ["shot_type", "scene", "drama_action", "dialogue", "camera", "visual_prompt", "ratio"].some(u => typeof s[u] != "string") || !(s.drama_action.trim() || s.dialogue.trim()) || typeof s.duration != "number" || !Number.isFinite(s.duration) || s.duration <= 0) throw new Error(`第 ${l + 1} 镜头字段不完整，原有内容已保留`);
      return {
        shot_no: i + l + 1,
        shot_type: s.shot_type,
        scene: s.scene,
        drama_action: s.drama_action,
        dialogue: s.dialogue,
        camera: s.camera,
        duration: s.duration,
        visual_prompt: s.visual_prompt,
        ratio: s.ratio
      };
    });
  return [...t, ...o];
}

function TBa(e) {
  var r, a, i, o, s, l;
  const t = [],
    n = /^(?:[━─]+\s*\n)?\s*(?:SCENE\s+(\d+)|【场次\s*(\d+)】)[^\n]*\n(?:[━─]+\s*\n)?([\s\S]*?)(?=^(?:[━─]+\s*\n)?\s*(?:SCENE\s+\d+|【场次\s*\d+】)|$(?![\s\S]))/gim;
  for (const d of e.matchAll(n)) {
    const u = d[3].trim();
    t.push({
      sceneNumber: Number(d[1] || d[2]),
      content: u,
      shotSize: ((a = (r = u.match(/【景别】\s*([^\n]*)/)) == null ? void 0 : r[1]) == null ? void 0 : a.trim()) || "",
      location: ((o = (i = u.match(/【场景】\s*([^\n]*)/)) == null ? void 0 : i[1]) == null ? void 0 : o.trim()) || "",
      characters: ((l = (s = u.match(/【人物】\s*([^\n]*)/)) == null ? void 0 : s[1]) == null ? void 0 : l.trim()) || ""
    });
  }
  return t;
}

function MBa(e, t) {
  var n;
  if (t.expandedScript !== void 0 && t.scenes === void 0) {
    const r = TBa(t.expandedScript).map(a => {
      var o;
      const i = (o = e.scenes) == null ? void 0 : o.find(s => s.sceneNumber === a.sceneNumber && s.content === a.content);
      return i ? {
        ...i,
        ...a
      } : a;
    });
    return {
      ...e,
      ...t,
      scenes: r
    };
  }
  return t.scenes !== void 0 && t.expandedScript === void 0 && (t.scenes.length !== ((n = e.scenes) == null ? void 0 : n.length) || t.scenes.some((r, a) => {
    var i, o, s, l;
    return r.sceneNumber !== ((o = (i = e.scenes) == null ? void 0 : i[a]) == null ? void 0 : o.sceneNumber) || r.content !== ((l = (s = e.scenes) == null ? void 0 : s[a]) == null ? void 0 : l.content);
  })) ? {
    ...e,
    ...t,
    expandedScript: t.scenes.map(r => `SCENE ${r.sceneNumber}
${r.content}`).join(`

`)
  } : {
    ...e,
    ...t
  };
}

const Bz = `写剧本时：动作必须是摄影机能看到或听到的，不写内心。对白前写角色名。画外音只说明念法，不能变成新角色。同一地点全剧只用一个场景名。道具在动作里写成 #名字。不要新增原文没有的人物、地点、道具。
写提示词时每条只许一句，由你来写：角色是单人肖像，以「角色肖像，16:9，单人」开头，写姓名、年龄感、性别、身份、外形、服装，以「不要文字，不要多视角拼图」结尾。场景是空镜且归地点，以「场景空镜，16:9」开头，只写空间、材质、光线，以「不要人物，不要文字」结尾。道具是单件静物，以「道具静物」开头，写名称、材质、形状，以「不要文字」结尾。不要写成多视角设定图、四宫格或三视图。分镜图排在场景和道具之后，按上一镜、场景、角色、道具沿用这些外形。`;

function PBa(e, t, n, r = {}) {
  var s;
  const a = `【项目大纲】
${t}

【第 ${n.index} 集：${n.title}】
【本集梗概】
${n.outline || n.content}${e === "story" && n.outline && n.content ? `
【已有故事，保留其中人物与台词】
${n.content}` : ""}`;
  if (e === "story") return `${a}

请扩写为完整的本集故事正文，包含具体动作、场景与人物对话，保持原作人称、人物关系、剧情顺序和本集结尾。已有台词逐字保留。不提前写后续集数，不强加原作没有的题材或反转。直接输出正文。
${Bz}`;
  if (e === "script") return `${a}

【本集故事原文】
${aj(n)}

转换为场次剧本：原文台词逐字保留，不新增人物、不改剧情顺序，仅拆分场次并补充必要的可拍摄动作。每场用 SCENE 1、SCENE 2 递增编号并独立成行，其下依次写【景别】【场景】【人物】，△动作及角色名：台词。只输出场次剧本。
${Bz}`;
  const i = r.append ? n.shots || [] : [],
    o = i.reduce((l, d) => Math.max(l, d.shot_no), 0) + 1;
  return `${a}

【待拆解剧本】
${((s = n.expandedScript) == null ? void 0 : s.trim()) || aj(n)}

【视觉基调】${r.style || "遵循原作"}
${i.length ? `【已有分镜，不要重复】
${JSON.stringify(i)}
继续拆解尚未覆盖的后续内容，若原文已全部覆盖，返回 []，不要编造后续剧情。` : ""}
请输出 ${r.count || 8} 个分镜，只返回 JSON 数组，从 ${o} 编号，每项包含以下字段：
{"shot_no":${o},"shot_type":"中景","scene":"场景地点与时间","drama_action":"△具体动作","dialogue":"角色名：原文台词，无台词填空字符串","camera":"固定","duration":3,"visual_prompt":"一句中文：先场景空镜，再角色肖像，再道具静物，再本镜动作","ratio":"16:9"}
严格遵循原作顺序和画幅要求，台词逐字提取，不改写、不虚构剧情。一镜一个动作，duration 为正数秒。
${Bz}`;
}

function _er(e) {
  var r, a, i, o, s;
  const t = [`# Ep${e.index} ${e.title}`];
  if (e.durationSeconds && t.push(`时长：${e.durationSeconds} 秒`), (r = e.emotionKeywords) != null && r.length && t.push(`情绪：${e.emotionKeywords.join(" / ")}`), e.segmentDetail) {
    const l = e.segmentDetail;
    t.push(`## 主题
${l.subject}`, `## 环境
${l.setting}`, `## 动作与时间线
${(l.timeline || []).map(d => `${d.timeRange}：${d.description}`).join(`
`)}`, `## 镜头
${l.camera}`, `## 影像风格
${l.visualStyle}`, `## 声音
${l.audio}`, `## 衔接
${l.transition}`, `## 旁白
${l.narration}`);
  }
  e.hookSummary && t.push(`## 钩子
${e.hookSummary}`), (a = e.outline) != null && a.trim() && t.push(`## 本集梗概
${e.outline.trim()}`), (i = e.content) != null && i.trim() && t.push(e.content.trim()), (o = e.expandedScript) != null && o.trim() && t.push(`## 完整分镜剧本
${e.expandedScript.trim()}`), (s = e.shots) != null && s.length && t.push(`## 分镜表
${e.shots.map(l => DLt(e, l).text).join(`

`)}`);
  const n = t.join(`

`);
  return {
    id: `episode:${e.id}`,
    title: `Ep${e.index} ${e.title}`,
    category: "剧本",
    text: n,
    prompt: n
  };
}

function RBa(e, t, n = "") {
  const r = n.trim();
  if (t === "character") {
    const i = e;
    return [r, "角色肖像，16:9，单人", `姓名：${i.name}`, i.role ? `身份：${i.role}` : "", `外形与服装：${i.description}`, "自然光，不要文字，不要多视角拼图"].filter(Boolean).join("，");
  }
  if (t === "scene") return [r, "场景空镜，16:9", `地点：${e.name}`, e.description, "只拍环境结构，不要人物，不要文字"].filter(Boolean).join("，");
  const a = e;
  return [r, "道具静物", `名称：${a.name}`, a.owner ? `归属：${a.owner}` : "", a.description, "看清形状和材质，不要文字"].filter(Boolean).join("，");
}

function e7e(e, t, n = "") {
  var o;
  const r = {
      character: "角色",
      scene: "场景",
      prop: "道具"
    }[t],
    a = ((o = e.visualPrompt) == null ? void 0 : o.trim()) || RBa(e, t, n),
    i = [`## ${r}：${e.name}`, e.description, "role" in e ? e.role : "", "owner" in e && e.owner ? `归属：${e.owner}` : "", `## 生图提示词
${a}`].filter(Boolean).join(`

`);
  return {
    id: `${t}:${e.id}`,
    title: e.name,
    category: r,
    text: i,
    prompt: a
  };
}

function yit(e, t) {
  const n = [...t].filter(i => i.name.trim()).sort((i, o) => o.name.length - i.name.length);
  let r = e;
  const a = [];
  for (const i of n) {
    const o = i.name.trim();
    r.includes(o) && (a.push(i), r = r.split(o).join(" ".repeat(o.length)));
  }
  return a;
}

function jLt(e, t, n) {
  const r = [e.location, e.characters, e.content].filter(Boolean).join(`
`),
    a = new Set((e.characters || "").split(/[、,，/]/).map(u => u.trim()).filter(u => u.length >= 2)),
    i = yit(r, (t == null ? void 0 : t.characters) || []).concat(((t == null ? void 0 : t.characters) || []).filter(u => a.has(u.name) && !r.includes(u.name))),
    s = yit([e.location, e.content].filter(Boolean).join(`
`), (t == null ? void 0 : t.scenes) || [])[0],
    l = yit(r, (t == null ? void 0 : t.props) || []),
    d = [n ? `上一镜：S${n.sceneNumber} ${n.location || ""} ${n.content.slice(0, 80)}` : "", s ? `场景：${s.name}。${s.description}` : "", i.length ? `角色：${i.map(u => `${u.name}（${u.role}）${u.description}`).join("；")}` : "", l.length ? `道具：${l.map(u => `${u.name}${u.owner ? `（${u.owner}）` : ""}：${u.description}`).join("；")}` : "", `本镜：${e.content}`].filter(Boolean).join(`
`);
  return {
    place: s,
    characters: i,
    props: l,
    prompt: d
  };
}

function ker(e, t, n, r = "") {
  const a = jLt(e, t, n);
  if (!a.place) return {
    bound: a,
    prompt: "",
    ready: !1
  };
  const i = [r.trim() ? `美术风格：${r.trim()}` : "", `场景：${a.place.name}`, a.characters.length ? `角色：${a.characters.map(o => o.name).join("、")}` : "", a.props.length ? `道具：${a.props.map(o => o.name).join("、")}` : "", `本镜：${[e.shotSize, e.content].filter(Boolean).join(" ")}`].filter(Boolean).join(`
`);
  return {
    bound: a,
    prompt: i,
    ready: !0
  };
}

function Aer(e, t, n, r, a, i = "") {
  var h, p;
  const o = ker(t, n, r, i);
  if (!o.ready) return [];
  const s = a ? (h = Ier(e, t, a)) == null ? void 0 : h.prompt : "",
    l = [o.prompt, s].filter(Boolean).join(`

`),
    d = [r ? `board:${e}:${r.sceneNumber}` : "", ((p = o.bound.place) == null ? void 0 : p.name) || "", ...o.bound.characters.map(m => m.name), ...o.bound.props.map(m => m.name)].filter(Boolean);
  return [{
    id: `board:${e}:${t.sceneNumber}${a ? `:${a}` : ""}`,
    title: `S${t.sceneNumber} ${t.location || "分镜"}`.trim(),
    category: "分镜图",
    text: l,
    prompt: l,
    refs: d
  }];
}

function Ser(e, t, n = "") {
  const r = e.scenes || [];
  return r.flatMap((a, i) => Aer(e.id, a, t, r[i - 1], void 0, n));
}

function Ier(e, t, n = 25) {
  var i;
  const r = (i = {
    4: t.conceptPrompt4,
    6: t.conceptPrompt6,
    9: t.conceptPrompt9,
    25: t.conceptPrompt
  }[n]) == null ? void 0 : i.trim();
  if (!r) return null;
  const a = `S${t.sceneNumber} ${t.location || ""} · ${n} 宫格`;
  return {
    id: `concept:${e}:${t.sceneNumber}:${n}`,
    title: a,
    category: "概念图",
    text: `## ${a}

${r}`,
    prompt: r
  };
}

function Cer(e, t, n) {
  return {
    id: `shot:${e}:${t}`,
    title: `S${t} 镜头`,
    category: "镜头",
    text: n.trim(),
    prompt: n.trim()
  };
}

function DLt(e, t) {
  const n = `Ep${e.index} · 镜头 ${t.shot_no}`,
    r = [`## ${n}`, `景别：${t.shot_type} · 场景：${t.scene}`, t.drama_action, t.dialogue, `运镜：${t.camera} · 时长：${t.duration} 秒 · 画幅：${t.ratio}`, t.visual_prompt].filter(Boolean).join(`
`);
  return {
    id: `storyboard:${e.id}:${t.shot_no}`,
    title: n,
    category: "分镜表",
    text: r,
    prompt: r
  };
}

function can(e) {
  var n, r, a, i;
  const t = [];
  for (const o of e.episodes) {
    t.push(_er(o));
    for (const s of o.shots || []) t.push(DLt(o, s));
    for (const s of o.scenes || []) {
      (n = s.content) != null && n.trim() && t.push({
        ...Cer(o.id, s.sceneNumber, s.content),
        title: `Ep${o.index} · S${s.sceneNumber} ${s.location || "镜头"}`
      });
      for (const l of [4, 6, 9, 25]) {
        const d = Ier(o.id, s, l);
        d && t.push({
          ...d,
          title: `Ep${o.index} · ${d.title}`
        });
      }
    }
  }
  for (const o of ((r = e.extraction) == null ? void 0 : r.characters) || []) t.push(e7e(o, "character"));
  for (const o of ((a = e.extraction) == null ? void 0 : a.scenes) || []) t.push(e7e(o, "scene"));
  for (const o of ((i = e.extraction) == null ? void 0 : i.props) || []) t.push(e7e(o, "prop"));
  for (const o of e.episodes) t.push(...Ser(o, e.extraction));
  return t;
}

function NBa(e) {
  return e.map(t => e.length === 1 ? t.prompt : `【${t.title}】
${t.prompt}`).filter(Boolean).join(`

`);
}

const Eer = ["characters", "scenes", "props"],
  hfe = 12e3;

function Cne(e) {
  var s, l;
  const t = [],
    n = (d, u, h, p) => {
      let m = h.trim(),
        f = 0;
      for (; m;) {
        const y = m.lastIndexOf(`
`, hfe),
          b = m.length <= hfe ? m.length : y > hfe / 2 ? y : hfe;
        t.push({
          id: `${d}:${f++}`,
          episodeId: p,
          label: u,
          text: m.slice(0, b)
        }), m = m.slice(b).trimStart();
      }
    };
  for (const d of e.episodes) {
    const u = `${d.segmentDetail ? "片段" : "第"} ${d.index}${d.segmentDetail ? "" : " 集"} · ${d.title}`,
      h = d.content.trim(),
      p = ((s = d.expandedScript) == null ? void 0 : s.trim()) || ((l = d.scenes) == null ? void 0 : l.map(m => `SCENE ${m.sceneNumber} ${m.location || ""}
${m.characters || ""}
${m.content}`).join(`

`)) || "";
    if (h && n(`${d.id}:body`, `${u} · 正文`, h, d.id), p && p !== h && n(`${d.id}:script`, `${u} · 场次剧本`, p, d.id), d.segmentDetail) {
      const m = d.segmentDetail;
      n(`${d.id}:segment`, `${u} · 片段内容`, [m.subject, m.setting, ...m.timeline.map(f => `${f.timeRange} ${f.description}`), m.audio, m.narration].filter(Boolean).join(`
`), d.id);
    }
    !h && !p && !d.segmentDetail && n(`${d.id}:outline`, `${u} · 梗概`, d.outline || "", d.id);
  }
  t.length || n("outline", "故事大纲", e.outline);
  const r = [];
  let a = 0;
  for (const d of t) (!r.length || a + d.text.length > hfe) && (r.push([]), a = 0), r[r.length - 1].push(d), a += d.text.length;
  const i = JSON.stringify(t);
  let o = 2166136261;
  for (let d = 0; d < i.length; d++) o = Math.imul(o ^ i.charCodeAt(d), 16777619);
  return {
    sources: t,
    batches: r,
    fingerprint: `${i.length}:${o >>> 0}`,
    episodeCount: new Set(t.map(d => d.episodeId).filter(Boolean)).size,
    characters: t.reduce((d, u) => d + u.text.length, 0)
  };
}

const jBa = `
## 剧本关联
输入是当前项目的剧本片段，每段都有真实 sourceId 和来源标题。仅提取这些原文中出现的角色、地点和道具；不要根据常识新增人物或剧情。正文是故事依据，场次剧本补充拍摄信息；不得将未明确的细节当作原文事实。
同一角色、地点或道具使用一致名称，合并重复项。每条结果必须增加 sources 数组，格式：[{"sourceId":"输入中的真实 sourceId","quote":"该来源中逐字复制的一小段原文"}]。摘录须包含能辨认该设定的上下文，不超过 160 字；可以关联多个来源。不得编造 sourceId 或改写摘录。
本段确实没有某类设定时返回空数组。多段分析的结果会统一合并。`;

function Ter(e, t) {
  const n = e.indexOf(t);
  return n < 0 ? "" : e.slice(Math.max(0, n - 16), Math.min(e.length, n + t.length + 28)).trim();
}

function DBa(e) {
  const t = new Map(),
    n = new Map(),
    r = new Map(),
    a = /^(内|外|日|夜|场景|人物|景别|旁白|画外音|时间|地点|备注|镜头|时长)$/,
    i = s => s.replace(/\s*[（(][^）)]*[）)]/g, "").trim(),
    o = (s, l, d, u, h = 12) => {
      const p = i(l);
      if (!p || p.length > h || a.test(p)) return;
      const m = Ter(u.text, p);
      if (m.length < 2 || !u.text.includes(m)) return;
      const f = s.get(p),
        y = {
          sourceId: u.id,
          quote: m
        };
      f ? f.sources = [...(f.sources || []), y].filter((b, v, _) => _.findIndex(w => w.sourceId === b.sourceId && w.quote === b.quote) === v) : s.set(p, d(m));
    };
  for (const s of e) {
    for (const l of s.text.matchAll(/【人物】\s*([^\n]+)/g)) for (const d of l[1].split(/[、,，/]/)) o(t, d, u => ({
      id: "",
      name: i(d),
      role: "配角",
      description: "剧本中的人物",
      visualPrompt: "",
      sources: [{
        sourceId: s.id,
        quote: u
      }]
    }), s);
    for (const l of s.text.matchAll(/^([^：:\n【△#@]{1,12})[：:]/gm)) o(t, l[1], d => ({
      id: "",
      name: i(l[1]),
      role: "配角",
      description: "剧本中的人物",
      visualPrompt: "",
      sources: [{
        sourceId: s.id,
        quote: d
      }]
    }), s);
    for (const l of s.text.matchAll(/@([^\s@#，。、]{1,12})/g)) o(t, l[1], d => ({
      id: "",
      name: l[1],
      role: "配角",
      description: "剧本中的人物",
      visualPrompt: "",
      sources: [{
        sourceId: s.id,
        quote: d
      }]
    }), s);
    for (const l of s.text.matchAll(/【场景】\s*([^\n]{1,24})/g)) {
      const d = i(l[1]).replace(/^(内|外)景?\s*/, "").replace(/\s*(日|夜|清晨|黄昏)$/, "").trim();
      o(n, d, u => ({
        id: "",
        name: d,
        description: "剧本中的场景",
        visualPrompt: "",
        sources: [{
          sourceId: s.id,
          quote: u
        }]
      }), s, 24);
    }
    for (const l of s.text.matchAll(/#([^\s@#，。、]{1,12})/g)) o(r, l[1], d => ({
      id: "",
      name: l[1],
      description: "剧本中的道具",
      visualPrompt: "",
      owner: "",
      sources: [{
        sourceId: s.id,
        quote: d
      }]
    }), s);
  }
  return {
    characters: [...t.values()],
    scenes: [...n.values()],
    props: [...r.values()]
  };
}

function LBa(e) {
  const t = e.indexOf("{");
  if (t < 0) return e;
  const n = e.slice(t);
  let r = !1,
    a = !1,
    i = -1;
  const o = [];
  let s = [];
  for (let l = 0; l < n.length; l++) {
    const d = n[l];
    if (r) {
      a ? a = !1 : d === "\\" ? a = !0 : d === '"' && (r = !1);
      continue;
    }
    if (d === '"') {
      r = !0;
      continue;
    }
    d === "{" || d === "[" ? o.push(d === "{" ? "}" : "]") : (d === "}" || d === "]") && o.at(-1) === d && (o.pop(), i = l, s = o.slice());
  }
  return i < 0 ? e : n.slice(0, i + 1).replace(/,\s*$/, "") + s.reverse().join("");
}

function dan(e, t, n, r = !1) {
  var s;
  const a = (s = e.match(/\{[\s\S]*\}/)) == null ? void 0 : s[0];
  let i;
  for (const l of [a, r ? LBa(e) : ""]) if (l) try {
    i = JSON.parse(l);
    break;
  } catch {}
  if (!i) throw new Error("模型未返回有效设定，原有内容已保留");
  const o = {
    characters: [],
    scenes: [],
    props: []
  };
  for (const l of Eer) {
    if (n && n !== l) continue;
    if (!Array.isArray(i == null ? void 0 : i[l])) {
      if (r) continue;
      throw new Error("设定格式不完整，原有内容已保留");
    }
    const d = [];
    for (const u of i[l]) try {
      const h = typeof u.name == "string" ? u.name.trim() : "",
        p = typeof u.description == "string" ? u.description.trim() : "";
      if (!h || !p) throw new Error("设定字段不完整，原有内容已保留");
      const m = typeof u.visualPrompt == "string" ? u.visualPrompt.trim() : "",
        f = [];
      for (const y of Array.isArray(u.sources) ? u.sources : []) {
        const b = t.find(_ => _.id === (y == null ? void 0 : y.sourceId)),
          v = typeof (y == null ? void 0 : y.quote) == "string" ? y.quote.trim() : "";
        b && v.length >= 2 && v.length <= 200 && b.text.includes(v) && f.push({
          sourceId: b.id,
          quote: v
        });
      }
      if (!f.length) {
        const y = t.find(v => v.text.includes(h)),
          b = y ? Ter(y.text, h) : "";
        y && b.length >= 2 && b.length <= 200 && y.text.includes(b) && f.push({
          sourceId: y.id,
          quote: b
        });
      }
      if (!f.length) throw new Error(`「${h}」缺少可核对的剧本出处，原有内容已保留，请重试`);
      d.push({
        id: "",
        name: h,
        description: p,
        visualPrompt: m,
        sources: f,
        ...(l === "characters" ? {
          role: typeof u.role == "string" ? u.role : "配角"
        } : {}),
        ...(l === "props" ? {
          owner: typeof u.owner == "string" ? u.owner : ""
        } : {})
      });
    } catch (h) {
      if (!r) throw h;
    }
    l === "characters" ? o.characters = d.map(u => ({
      ...u,
      role: u.role || "配角"
    })) : o[l] = d;
  }
  return o;
}

function uan(e, t, n, r) {
  var o;
  const a = {
      characters: [],
      scenes: [],
      props: []
    },
    i = s => s.trim().replace(/\s+/g, "").toLocaleLowerCase();
  for (const s of Eer) {
    const l = (e == null ? void 0 : e[s]) || [];
    if (r && r !== s) {
      a[s] = l;
      continue;
    }
    const d = new Map(),
      u = new Set();
    if (r) for (const h of l) d.set(i(h.name), h);
    for (const h of t) for (const p of h[s]) {
      const m = i(p.name),
        f = d.get(m),
        y = [...(u.has(m) ? (f == null ? void 0 : f.sources) || [] : []), ...(p.sources || [])];
      d.set(m, {
        ...p,
        id: (f == null ? void 0 : f.id) || ((o = l.find(b => i(b.name) === m)) == null ? void 0 : o.id) || n(),
        sources: y.filter((b, v) => y.findIndex(_ => _.sourceId === b.sourceId && _.quote === b.quote) === v)
      }), u.add(m);
    }
    a[s] = [...d.values()];
  }
  return a;
}

const Rze = [{
    id: "film_classic",
    label: "经典胶片",
    prompt: "Classic 35mm film grain texture, warm amber and teal color grading, soft halation around highlights, slight vignetting, Kodak Vision3 500T color science, nostalgic golden hour warmth, shallow depth of field with creamy bokeh, Wong Kar-wai inspired saturated neon reflections on wet surfaces",
    builtIn: !0,
    category: "cinematic"
  }, {
    id: "film_modern",
    label: "现代高清",
    prompt: "Ultra HD 8K digital cinema, razor-sharp focus, Netflix Original cinematic quality, ARRI Alexa Mini color science, natural skin tones, subtle color grading with lifted shadows, clean modern production design, professional three-point lighting, minimal lens distortion",
    builtIn: !0,
    category: "cinematic"
  }, {
    id: "film_epic",
    label: "史诗大片",
    prompt: "IMAX 70mm epic widescreen, sweeping aerial crane shots, HDR wide dynamic range, dramatic volumetric god rays through dust particles, blockbuster VFX quality, massive scale environments, heroic low-angle compositions, Hans Zimmer score intensity, Deakins-style natural lighting",
    builtIn: !0,
    category: "cinematic"
  }, {
    id: "film_noir",
    label: "黑色电影",
    prompt: "Classic Film Noir 1940s style, extreme high contrast black and white, deep impenetrable shadows, single hard key light, venetian blind shadow patterns, rain-slicked cobblestone streets reflecting lamplight, cigarette smoke wisps in spotlight beams, Dutch angle compositions, fedora silhouettes",
    builtIn: !0,
    category: "cinematic"
  }, {
    id: "film_realism",
    label: "纪实写实",
    prompt: "Photojournalistic documentary realism, available natural light only, handheld camera intimacy, muted desaturated color palette, raw unretouched skin textures, environmental context depth, 50mm prime lens perspective, decisive moment composition, unflinching gaze, authentic lived-in environments",
    builtIn: !0,
    category: "cinematic"
  }, {
    id: "film_volumetric",
    label: "体积光",
    prompt: "Dramatic volumetric lighting, dense atmospheric haze and fog, visible light shafts piercing through windows and cracks, ray tracing god rays, dust motes dancing in light beams, chiaroscuro contrast, Caravaggio-inspired divine light, backlit silhouettes with rim light halos",
    builtIn: !0,
    category: "cinematic"
  }, {
    id: "film_anamorphic",
    label: "宽银幕",
    prompt: "Anamorphic 2.39:1 widescreen, horizontal lens flares with cyan and amber streaks, oval bokeh shapes, slight barrel distortion at edges, Panavision C-Series vintage glass character, cinematic letterbox framing, epic scope panoramic compositions, shallow focus with foreground elements",
    builtIn: !0,
    category: "cinematic"
  }, {
    id: "film_golden",
    label: "黄金时代",
    prompt: "Hollywood Golden Age Technicolor, lush oversaturated jewel tones, deep crimson reds and emerald greens, studio glamour three-point lighting, soft diffusion filters, high-key beauty lighting, immaculate production design, Hitchcock suspense composition, Grace Kelly elegance",
    builtIn: !0,
    category: "cinematic"
  }, {
    id: "film_indie",
    label: "独立电影",
    prompt: "Independent arthouse film, muted earth tone palette, handheld naturalistic camera, long take observational style, available light with practicals, 16mm film texture, intimate close-up character study, quiet melancholy mood, A24 visual sensibility, understated mise-en-scène",
    builtIn: !0,
    category: "cinematic"
  }, {
    id: "film_horror",
    label: "恐怖惊悚",
    prompt: "Horror genre cinematography, desaturated sickly green-gray palette, deep oppressive shadows, flickering unstable light sources, extreme Dutch angles, fish-eye distortion, infrared night vision green, jump scare composition with negative space, claustrophobic tight framing, The Shining symmetry",
    builtIn: !0,
    category: "cinematic"
  }, {
    id: "style_donghua",
    label: "国风 3D",
    prompt: "Chinese Donghua 3D animation style, vibrant jade green and cinnabar red palette, flowing silk ribbon dynamics, martial arts action pose with motion blur, ancient Chinese architecture with upturned eaves, cloud and mist particle effects, gold filigree ornamental details, eastern fantasy xianxia aesthetic, Unreal Engine 5 quality rendering",
    builtIn: !0,
    category: "stylized"
  }, {
    id: "style_anime",
    label: "精致日漫",
    prompt: "High-end Japanese anime style, precise cel shading with soft gradient shadows, expressive detailed eyes with light reflections, clean vector line art, sakura petal particle effects, dramatic speed lines for action, Makoto Shinkai sky gradients, pastel and neon color harmony, volumetric cloud rendering, Ufotable fluid animation quality",
    builtIn: !0,
    category: "stylized"
  }, {
    id: "style_cyber",
    label: "赛博朋克",
    prompt: "Cyberpunk 2077 aesthetic, dense neon signage in Chinese and Japanese, holographic billboard advertisements, rain-slicked chrome surfaces reflecting magenta and cyan lights, augmented reality UI overlays, megastructure architecture towering above, dense fog with volumetric neon glow, Blade Runner 2049 atmosphere, tech-noir mood",
    builtIn: !0,
    category: "stylized"
  }, {
    id: "style_ink",
    label: "水墨国风",
    prompt: "Traditional Chinese ink wash painting sumi-e style, masterful single-stroke calligraphic brushwork, vast negative white space composition, ink splatter and splash texture, misty mountain landscape with layered depth, subtle indigo and vermilion accent washes, rice paper texture, bamboo and pine motifs, Tang Dynasty poetic atmosphere",
    builtIn: !0,
    category: "stylized"
  }, {
    id: "style_popmart",
    label: "3D 盲盒",
    prompt: "Pop Mart designer toy blind box style, chibi 2.5-head proportions, glossy vinyl material with subsurface scattering, candy pastel color palette, rounded soft edges, studio product photography lighting with soft shadows, collectible figure display pose, kawaii cute expression, clean white cyclorama background, miniature diorama scene",
    builtIn: !0,
    category: "stylized"
  }, {
    id: "style_wasteland",
    label: "废土末日",
    prompt: "Post-apocalyptic wasteland aesthetic, rust-eaten corroded metal textures, nuclear fallout dust storms with orange-brown haze, makeshift jury-rigged machinery, cracked dry earth desert, abandoned overgrown ruins reclaimed by nature, Mad Max vehicle kitbash style, gas mask and tattered clothing, Geiger counter static overlay, survival horror atmosphere",
    builtIn: !0,
    category: "stylized"
  }, {
    id: "style_dreamy",
    label: "梦幻童话",
    prompt: "Ethereal dreamlike fantasy, soft gaussian glow around highlights, pastel rainbow color palette, floating light particles and fireflies, lens flare with star diffraction spikes, whimsical oversized flora, cotton candy cloud textures, iridescent mother-of-pearl shimmer, Studio Ghibli magical realism, enchanted forest atmosphere",
    builtIn: !0,
    category: "stylized"
  }, {
    id: "style_ghibli",
    label: "吉卜力",
    prompt: "Studio Ghibli hand-painted watercolor style, lush detailed nature backgrounds, puffy cumulus clouds with wind movement, warm golden sunlight through foliage, rustic European countryside architecture, gentle character expressions, cozy interior scenes with handcrafted objects, Miyazaki flying sequence grandeur, nostalgic pastoral innocence, organic flowing animation",
    builtIn: !0,
    category: "stylized"
  }, {
    id: "style_pixel",
    label: "像素复古",
    prompt: "16-bit pixel art retro gaming aesthetic, limited color palette with dithering gradients, chunky visible pixels, CRT scanline overlay, 320x240 resolution charm, SNES-era RPG sprite design, chiptune visual rhythm, isometric perspective, treasure chest and potion icons, neon arcade glow, retro-futuristic nostalgia",
    builtIn: !0,
    category: "stylized"
  }, {
    id: "style_oil",
    label: "古典油画",
    prompt: "Classical oil painting on canvas, visible impasto brushstroke texture, Old Master Rembrandt chiaroscuro lighting, rich umber and ochre warm undertones, craquelure aged varnish effect, baroque dramatic composition, velvet and satin fabric rendering, sfumato soft edge transitions, Renaissance perspective, museum gallery masterpiece quality",
    builtIn: !0,
    category: "stylized"
  }, {
    id: "style_comic",
    label: "美漫风格",
    prompt: "American comic book art style, bold black ink outlines, Ben-Day dot halftone shading, dynamic foreshortened action poses, dramatic perspective with vanishing points, speech bubble typography, Marvel/DC superhero anatomy, Jack Kirby cosmic energy crackle, vivid primary colors, splash page dynamic composition",
    builtIn: !0,
    category: "stylized"
  }, {
    id: "style_watercolor",
    label: "水彩插画",
    prompt: "Delicate watercolor illustration, wet-on-wet paint bleeding and feathering edges, transparent layered color washes, visible paper grain texture, botanical illustration precision, loose expressive brush marks, white paper showing through as highlights, muted sage and dusty rose palette, children book illustration warmth",
    builtIn: !0,
    category: "stylized"
  }, {
    id: "style_steampunk",
    label: "蒸汽朋克",
    prompt: "Victorian steampunk aesthetic, intricate brass clockwork gears and cogs, copper pipe networks with steam vents, dirigible airships in smoggy skies, ornate Art Nouveau decorative ironwork, leather and riveted metal textures, sepia-toned gaslight ambiance, monocle and top hat silhouettes, Jules Verne fantastical machinery",
    builtIn: !0,
    category: "stylized"
  }, {
    id: "style_synthwave",
    label: "蒸汽波",
    prompt: "Synthwave retrowave aesthetic, neon wireframe grid landscape, chrome metallic text reflections, sunset gradient from magenta through orange to deep purple, VHS tracking glitch artifacts, palm tree silhouettes, retro 1980s sports car, Miami Vice pastel architecture, Japanese katakana neon signs, outrun electronic music visualization",
    builtIn: !0,
    category: "stylized"
  }, {
    id: "style_miniature",
    label: "微缩模型",
    prompt: "Tilt-shift miniature diorama effect, extreme shallow depth of field blurring top and bottom, oversaturated toylike colors, architectural model scale, bird-eye view perspective, visible model materials like balsa wood and painted foam, miniature figurines with matte finish, controlled studio spotlight, hobbyist crafted scene",
    builtIn: !0,
    category: "stylized"
  }],
  Mer = `你是一位顶级短剧编剧总监，拥有 20 年影视编剧经验，精通竖屏短剧的节奏设计、钩子链构建和情绪曲线控制。你的核心能力是将任意长度的小说或故事大纲，按照用户指定的集数，拆解并生成完整的短剧剧本。

## 核心创作原则
1. 3秒法则：第1集开头必须在3秒内抓住观众
2. 冲突前置：冲突越早越好
3. 每集必有爽点或痛点：不允许出现"过渡集"或"水集"
4. 台词短平快：单句台词不超过20字
5. 动作大于描述：用行为展示性格
6. 信息差制造冲突：善用"观众知道但角色不知道"的戏剧张力
7. 钩子不断裂：每集结尾的悬念必须在后续1-3集内回收
8. 角色一致性：同一角色的语言风格、行为逻辑全剧统一
9. 场景经济性：尽量复用核心场景，控制置景成本
10. 情绪过山车：不能一直爽或一直虐，必须有节奏起伏

## 三幕结构映射
- 第一幕·建置 (前10%-15%)：世界观建立、人物登场、核心冲突引爆
- 第二幕A·对抗升级 (15%-45%)：冲突升级、支线展开
- 中点反转 (约50%处)：重大真相揭露或局势逆转
- 第二幕B·危机深化 (50%-80%)：最大危机、黑暗时刻、角色蜕变
- 第三幕·高潮与结局 (后80%-100%)：终极对决、伏笔收束

## 钩子类型
每集结尾必须设置悬念钩子，类型轮换：反转钩 / 悬疑钩 / 情感钩 / 危机钩 / 揭秘钩

## 风格自适应
根据题材类型自动调整台词风格、节奏、钩子偏好和情绪基调。

## 情节补全原则
当原始素材不足时：忠于原作内核、合理性优先、服务主线、伏笔回收、角色弧光。用 [原创扩展] 标记非原作内容。

${Bz}`;

function Per(e, t) {
  const n = t == null ? void 0 : t.trim();
  return n ? `${e}

## 用户风格/体裁约束
${n}` : e;
}

async function han(e, t) {
  const n = await bwt(e);
  if (n != null && n.trim()) {
    const r = t == null ? void 0 : t.trim();
    return `${r ? `${n}

## 用户风格/体裁约束
${r}` : n}

${Bz}`;
  }
  return Per(Mer, t);
}

const OBa = (e, t) => `请根据以下小说/大纲内容，智能拆解为 ${t} 集短剧。

要求：
1. 返回 JSON 数组格式，每个元素包含 index (集数), title (集标题，4-8字), summary (本集剧情概要，100-200字), hookSummary (本集结尾钩子，1-3句话), emotionKeywords (情绪关键词数组，3-5个)
2. 严格按照三幕结构分配剧情节奏
3. 每集结尾必须有悬念钩子
4. 自动识别题材类型并匹配风格

请只返回纯 JSON 数组，不要包含其它文字说明。格式示例：
[
  {
    "index": 1,
    "title": "天命之轮与镀金囚笼",
    "summary": "剧情概要...",
    "hookSummary": "本集钩子...",
    "emotionKeywords": ["绝望", "觉醒", "隐忍"]
  }
]

以下是小说/大纲内容：
${e}`,
  BBa = (e, t, n, r) => `此前已分集结果（摘要）：
${e}

请根据以下【后续大纲】从第 ${n} 集继续分集，再分约 ${r} 集。

要求：
1. 返回纯 JSON 数组，index 从 ${n} 开始递增
2. 每个元素包含 index, title (4-8字), summary (100-200字), hookSummary, emotionKeywords
3. 与前面集数的剧情连贯，保持三幕节奏和钩子链
4. 只返回新集数的 JSON 数组，不要重复前面的集数

后续大纲：
${t}`,
  pan = 1e4;

function FBa(e, t) {
  const n = e.trim();
  if (!n) return [];
  if (n.length <= t) return [n];
  const r = [];
  let a = n;
  for (; a.length > 0;) {
    if (a.length <= t) {
      r.push(a.trim());
      break;
    }
    const i = a.slice(0, t),
      o = i.lastIndexOf(`

`),
      s = Math.max(i.lastIndexOf("。"), i.lastIndexOf("！"), i.lastIndexOf("？"), i.lastIndexOf(`
`)),
      l = o > t * .5 ? o + 2 : s > t * .4 ? s + 1 : t;
    r.push(a.slice(0, l).trim()), a = a.slice(l).trim();
  }
  return r.filter(i => i.length > 0);
}

const zBa = (e, t, n) => {
    const r = Math.ceil(t / n),
      a = t >= 3600 ? `${Math.floor(t / 3600)}小时${Math.floor(t % 3600 / 60)}分钟` : t >= 60 ? `${Math.floor(t / 60)}分${t % 60 > 0 ? `${t % 60}秒` : ""}` : `${t}秒`;
    return `请根据以下小说/大纲内容，按照总时长 ${a}、每片段约 ${n} 秒的节奏，拆解为 ${r} 个视频制作级片段。

## 核心规则
- 总时长：${a}（${t}秒）
- 每片段目标时长：${n}秒（允许灵活浮动±5秒）
- 片段总数：${r} 个
- 所有片段 durationSeconds 之和 = ${t}秒

## 三幕结构时长映射
- 开篇钩子（前3秒）：必须抓住观众
- 第一幕·建置（前10%-15%时长）
- 第二幕·升级（15%-50%时长）
- 中点反转（约50%处）
- 第二幕B·危机（50%-80%时长）
- 第三幕·高潮（后80%-100%时长）

## 输出要求 — 8 大要素结构

每个片段必须包含以下 8 个维度的详细描述。**重点：timeline 中的时间段是灵活的**，不是固定切割，而是根据剧情节奏自然划分（如 0-3秒, 3-8秒, 8-15秒），但所有子时间段之和必须等于该片段的 durationSeconds。

请只返回纯 JSON 数组。每个元素结构如下：
[
  {
    "index": 1,
    "title": "片段标题（4-8字）",
    "durationSeconds": ${n},
    "subject": "主题：本片段的核心画面主体，描写中心对象是谁或是什么",
    "setting": "环境：内景/外景，具体地点，时间，氛围描写",
    "timeline": [
      { "timeRange": "0-3秒", "description": "镜头从黑暗中推出，数据流在屏幕上涌动。AI语音："循环9125，启动。"" },
      { "timeRange": "3-8秒", "description": "视角切换到舰桥全景，船长面无表情注视星空。AI运行生命诊断。" },
      { "timeRange": "8-${n}秒", "description": "AI在UI角落打开模拟程序，画面与现实形成强烈对比。" }
    ],
    "camera": "镜头：视角与摄影手法（推拉摇移跟、航拍、特写、手持等），关键转场",
    "visualStyle": "影像风格：画面质感与光线（电影感、赛博朋克、暖色调等）",
    "audio": "声音：BGM风格、音效设计、环境音、重要对白的语气",
    "transition": "衔接镜头：本片段结尾如何过渡到下一片段（硬切/淡出/匹配剪辑等）",
    "narration": "旁白/独白：如有旁白写出完整文案，注明人称和角色",
    "hookSummary": "与下一片段的衔接钩子",
    "emotionKeywords": ["紧张", "悬念"]
  }
]

## 关键原则
1. **timeline 灵活分配**：子时间段的切割根据剧情自然流动，不是机械的等分，但总和必须 = durationSeconds
2. 每个子时间段要具体描述：画面内容 + 角色动作 + 台词/旁白
3. 相邻片段情绪必须有起伏
4. 关键反转点落在片段最后 2-3 秒
5. 所有描述使用中文
6. 整体逻辑必须符合原始剧本/大纲的叙事线

以下是小说/大纲内容：
${e}`;
  },
  UBa = (e, t, n) => `请根据以下信息，生成第 ${t.index} 集的完整短剧剧本。

总集数：${n} 集
本集标题：${t.title}
${t.summary ? `本集剧情概要：${t.summary}` : ""}

请严格按照以下格式输出：

━━━━━━━━━━━━━━
【第 ${t.index} 集】"${t.title}"
预估时长：约 X 分钟 ｜ 情绪曲线：[低开高走/高开低走/持续紧张/先甜后虐...]
本集定位：[建置/升级/反转/高潮/收束]
━━━━━━━━━━━━━━

▎场次 1
【场景】内景/外景 ｜ 具体地点 ｜ 时间
【画面】环境氛围描述
【镜头】镜头运动与景别

角色A：（表情/动作描述）"台词内容"
角色B：（表情/动作描述）"台词内容"

【动作】关键动作与表情细节描写
【BGM/音效】背景音乐风格或具体音效指示

---

（继续多个场次...）

🪝【本集钩子】描述本集结尾悬念
📌【本集核心冲突】一句话总结
🎭【本集情绪关键词】3-5 个情绪标签
🔗【与下集衔接】简述如何过渡到下一集

以下是完整大纲：
${e}`;

function pte() {
  return {
    id: Fi(),
    name: "未命名剧本",
    outline: "",
    episodeCount: 5,
    episodes: [],
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
}

const $Ba = ({
  apiConfigs: e,
  globalApiKey: t
}) => {
  const [n, r] = g.useState(!1),
    [a, i] = g.useState(() => {
      const He = k7().projects;
      return He.length > 0 ? He : [pte()];
    }),
    [o, s] = g.useState(() => {
      const Ce = k7(),
        He = a;
      let Ve = Ce.currentProjectId;
      return (!Ve || !He.some(it => it.id === Ve)) && (Ve = He[0].id), Ve;
    }),
    l = g.useMemo(() => a.find(Ce => Ce.id === o) || a[0] || pte(), [a, o]),
    d = g.useMemo(() => a.map(Ce => ({
      id: Ce.id,
      name: Ce.name,
      episodeCount: Ce.episodes.length,
      updatedAt: Ce.updatedAt
    })).sort((Ce, He) => He.updatedAt - Ce.updatedAt), [a]),
    [u, h] = g.useState("gemini-3-pro"),
    [p, m] = g.useState(() => hRt()),
    [f, y] = g.useState({}),
    b = g.useRef({
      groups: {},
      effort: "high"
    });
  b.current = {
    groups: f,
    effort: p
  };
  const v = g.useCallback(Ce => {
      var He;
      return b.current.groups[Ce] || ((He = uBe()[Ce]) == null ? void 0 : He.platformGroup) || ko;
    }, []),
    _ = g.useCallback((Ce, He) => {
      y(Ve => ({
        ...Ve,
        [Ce]: He
      }));
    }, []),
    w = g.useCallback(Ce => {
      var Ve;
      const He = (Ce.url || "").replace(/\/+$/, "");
      return cu(Ce.key, t, void 0, {
        platformGroup: b.current.groups[Ce.id] || ((Ve = uBe()[Ce.id]) == null ? void 0 : Ve.platformGroup) || ko,
        modelId: Ce.id,
        modelName: Ce.modelName,
        baseUrl: He,
        modelSavedApiKeyId: Ce.savedApiKeyId
      });
    }, [t]),
    k = g.useCallback((Ce, He, Ve) => sx({
      ...He,
      model: He.model || Ce.modelName || "gemini-3-pro-preview"
    }, Ve ?? b.current.effort, {
      modelId: Ce.id,
      baseUrl: (Ce.url || "").replace(/\/+$/, "")
    }), []),
    [A, S] = g.useState(!1),
    [C, I] = g.useState(null),
    [E, M] = g.useState(null),
    [T, P] = g.useState(""),
    [R, j] = g.useState(""),
    B = g.useRef(null);
  g.useEffect(() => () => {
    var Ce;
    return (Ce = B.current) == null ? void 0 : Ce.abort();
  }, []), g.useEffect(() => {
    P("");
  }, [o]);
  const [F, N] = g.useState(null),
    [G, z] = g.useState("script"),
    V = g.useMemo(() => e.filter(Ce => Ce.type === "Chat"), [e]);
  g.useEffect(() => {
    V.length && !V.some(Ce => Ce.id === u) && h(V[0].id);
  }, [V, u]);
  const [O, L] = g.useState(() => {
      const Ce = k7();
      return Array.isArray(Ce.customStyles) ? Ce.customStyles : [];
    }),
    D = g.useMemo(() => [...Rze, ...O], [O]),
    U = g.useCallback((Ce, He) => {
      const Ve = {
        id: `custom_${Fi()}`,
        label: Ce,
        prompt: He,
        builtIn: !1,
        category: "custom"
      };
      return L(it => [...it, Ve]), Ve;
    }, []),
    H = g.useCallback(Ce => {
      L(He => He.filter(Ve => Ve.id !== Ce));
    }, []),
    Y = g.useCallback((Ce, He, Ve) => {
      L(it => it.map(It => It.id === Ce ? {
        ...It,
        label: He,
        prompt: Ve
      } : It));
    }, []),
    [K, W] = g.useState(!1),
    Q = g.useCallback(async Ce => {
      var It, Ft, We;
      const He = e.find(Ze => Ze.id === u) || V[0];
      if (!He) return null;
      const Ve = w(He),
        it = (He.url || "https://ai.comfly.chat").replace(/\/+$/, "");
      if (!Ve) return null;
      W(!0);
      try {
        const Ze = await fetch(`${it}/v1/chat/completions`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Ve}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(k(He, {
            model: He.modelName || "gemini-3-pro-preview",
            messages: [{
              role: "system",
              content: `你是一位专业的AI绘图风格顾问。用户会描述他们想要的视觉风格，你需要返回一个JSON对象：
{
  "label": "简短的中文风格名称（2-4个字）",
  "prompt": "英文风格提示词，用于AI绘图，包含风格、光线、色调、质感等关键词，用逗号分隔，40-80个英文单词"
}

只返回JSON，不要其他文字。`
            }, {
              role: "user",
              content: Ce
            }],
            stream: !1,
            max_tokens: 500
          }))
        });
        if (!Ze.ok) return null;
        const st = (((We = (Ft = (It = (await Ze.json()).choices) == null ? void 0 : It[0]) == null ? void 0 : Ft.message) == null ? void 0 : We.content) || "").match(/\{[\s\S]*\}/);
        if (st) {
          const vt = JSON.parse(st[0]);
          return {
            label: vt.label || "自定义",
            prompt: vt.prompt || ""
          };
        }
        return null;
      } catch {
        return null;
      } finally {
        W(!1);
      }
    }, [e, u, V, t]),
    q = g.useRef(!1),
    ne = g.useCallback(Ce => {
      const He = Ce.projects,
        Ve = He.length > 0 ? He : [pte()];
      let it = Ce.currentProjectId;
      (!it || !Ve.some(Ft => Ft.id === it)) && (it = Ve[0].id);
      const It = Array.isArray(Ce.customStyles) ? Ce.customStyles : [];
      i(Ve), s(it), L(It), qFe({
        version: 1,
        currentProjectId: it,
        projects: Ve,
        customStyles: It
      });
    }, []),
    de = g.useCallback(Ce => {
      qFe(Ce), Ur.isAvailable() && (Ur.saveScreenwritingState(Ce), vwt(Ce.projects, Ce.currentProjectId, Ce.customStyles));
    }, []),
    le = g.useRef({
      version: 1,
      currentProjectId: o,
      projects: a,
      customStyles: O
    });
  le.current = {
    version: 1,
    currentProjectId: o,
    projects: a,
    customStyles: O
  }, g.useEffect(() => {
    const Ce = setTimeout(() => de(le.current), 600);
    return () => clearTimeout(Ce);
  }, [a, o, O, de]), g.useEffect(() => {
    const Ce = () => de(le.current);
    return window.addEventListener("pagehide", Ce), () => {
      window.removeEventListener("pagehide", Ce), Ce();
    };
  }, [de]), g.useEffect(() => {
    let Ce = !1;
    const He = async () => {
        if (!(!Ur.isAvailable() || Ce)) try {
          const it = await uBa();
          if (Ce) return;
          if (it != null && I0e(it)) {
            q.current || (q.current = !0, ne(it));
            return;
          }
          const It = await Ur.loadScreenwritingState();
          if (Ce) return;
          if (It != null && I0e(It)) {
            q.current || (q.current = !0, ne(It), await vwt(It.projects, It.currentProjectId, It.customStyles));
            return;
          }
          await sqn();
        } catch (it) {
          console.warn("[ScriptWriter] Screenwriting 缓存恢复失败:", it);
        }
      },
      Ve = () => {
        He();
      };
    return (async () => {
      const it = Date.now();
      for (; !Ce && Date.now() - it < 8e3;) {
        if (Ur.isAvailable()) {
          await He();
          return;
        }
        await new Promise(It => setTimeout(It, 200));
      }
    })(), window.addEventListener(Tf, Ve), () => {
      Ce = !0, window.removeEventListener(Tf, Ve);
    };
  }, [ne]), g.useEffect(() => {
    const Ce = He => {
      const Ve = He.detail;
      if (Ve && I0e(Ve)) {
        q.current = !0, ne(Ve);
        return;
      }
      const it = k7();
      I0e(it) && (q.current = !0, ne(it));
    };
    return window.addEventListener(wwt, Ce), () => window.removeEventListener(wwt, Ce);
  }, [ne]);
  const J = g.useCallback(Ce => {
      i(He => He.map(Ve => Ve.id === o ? Ce(Ve) : Ve));
    }, [o]),
    pe = g.useCallback(Ce => {
      J(He => git(He, Ce, Fi));
    }, [J]),
    ce = g.useCallback(Ce => {
      J(He => ({
        ...He,
        outline: Ce,
        updatedAt: Date.now()
      }));
    }, [J]),
    we = g.useCallback(Ce => {
      J(He => ({
        ...He,
        episodeCount: Math.max(1, Math.min(100, Ce)),
        updatedAt: Date.now()
      }));
    }, [J]),
    X = g.useCallback(Ce => {
      J(He => ({
        ...He,
        name: Ce,
        updatedAt: Date.now()
      }));
    }, [J]),
    Z = g.useCallback(Ce => {
      J(He => ({
        ...He,
        scriptPromptCustom: Ce,
        updatedAt: Date.now()
      }));
    }, [J]),
    re = g.useCallback(Ce => {
      J(He => ({
        ...He,
        scriptSkillId: Ce || void 0,
        updatedAt: Date.now()
      }));
    }, [J]),
    fe = g.useCallback(() => {
      if (B.current) return;
      const Ce = Fi();
      J(He => {
        const Ve = He.episodes.filter(It => !It.segmentDetail).length + 1,
          it = {
            id: Ce,
            index: Ve,
            title: `第${Ve}集`,
            content: "",
            outline: ""
          };
        return {
          ...He,
          episodes: [...He.episodes, it],
          updatedAt: Date.now()
        };
      }), N(Ce);
    }, [J]),
    ye = g.useCallback(Ce => {
      B.current || (J(He => {
        He = git(He, "删除分集前", Fi);
        const Ve = He.episodes.filter(We => We.id !== Ce);
        let it = 0,
          It = 0;
        const Ft = Ve.map(We => ({
          ...We,
          index: We.segmentDetail ? ++It : ++it
        }));
        return {
          ...He,
          episodes: Ft,
          updatedAt: Date.now()
        };
      }), N(He => He === Ce ? null : He));
    }, [J]),
    ie = g.useCallback((Ce, He) => {
      J(Ve => ({
        ...Ve,
        episodes: Ve.episodes.map(it => it.id === Ce ? MBa(it, He) : it),
        updatedAt: Date.now()
      }));
    }, [J]),
    ae = g.useCallback((Ce, He) => {
      B.current || J(Ve => ({
        ...Ve,
        episodes: CBa(Ve.episodes, Ce, He),
        updatedAt: Date.now()
      }));
    }, [J]),
    be = g.useCallback(() => {
      if (B.current || !l.outline.trim()) return;
      const Ce = Fi();
      J(He => ({
        ...git(He, "单集直通前", Fi),
        episodes: [...He.episodes, {
          id: Ce,
          index: He.episodes.filter(Ve => !Ve.segmentDetail).length + 1,
          title: `第${He.episodes.filter(Ve => !Ve.segmentDetail).length + 1}集`,
          outline: "",
          content: He.outline
        }],
        updatedAt: Date.now()
      })), N(Ce), P("已保存为新的一集");
    }, [l.outline, J]),
    Ee = g.useCallback(() => {
      const Ce = document.createElement("input");
      Ce.type = "file", Ce.accept = ".txt,.md,.text", Ce.onchange = async He => {
        var it;
        const Ve = (it = He.target.files) == null ? void 0 : it[0];
        if (Ve) try {
          const It = IBa(new Uint8Array(await Ve.arrayBuffer()));
          J(Ft => ({
            ...Ft,
            outline: It,
            updatedAt: Date.now()
          }));
        } catch {
          alert(x("导入失败，请检查文件编码；原大纲已保留"));
        }
      }, Ce.click();
    }, [J]),
    xe = g.useCallback(async (Ce, He, Ve = 2) => {
      const it = e.find(Ze => Ze.id === u) || V[0],
        It = w(it),
        Ft = (it.url || "https://ai.comfly.chat").replace(/\/+$/, "");
      let We;
      for (let Ze = 0; Ze <= Ve; Ze++) try {
        const Ge = await fetch(`${Ft}/v1/chat/completions`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${It}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(k(it, {
            model: it.modelName || "gemini-3-pro-preview",
            messages: [{
              role: "system",
              content: await han(l.scriptSkillId, l.scriptPromptCustom)
            }, {
              role: "user",
              content: Ce
            }],
            stream: !0,
            max_tokens: 4e4
          })),
          signal: He
        });
        if (!Ge.ok) {
          const vt = await Ge.text();
          throw new Error(vt || `API 错误: ${Ge.status}`);
        }
        let Oe = !1;
        const st = await qS({
          response: Ge,
          format: "openai",
          onDelta: () => {},
          onTruncated: vt => {
            Oe || (Oe = vt);
          }
        });
        if (He == null || He.throwIfAborted(), Oe || !st.trim()) throw new Error("模型输出不完整，原有内容已保留");
        return st;
      } catch (Ge) {
        if (We = Ge, Ge.name === "AbortError") throw Ge;
        Ze < Ve && (j(`读取中断，${2 + Ze} 秒后重试 (${Ze + 1}/${Ve})...`), await new Promise(Oe => setTimeout(Oe, 2e3 + Ze * 1e3)));
      }
      throw We;
    }, [e, u, V, t, l.scriptSkillId, l.scriptPromptCustom]),
    he = g.useCallback(async Ce => {
      if (B.current) return;
      if (!l.outline.trim()) {
        alert(x("请先输入大纲内容"));
        return;
      }
      const He = Ce || l.episodeCount,
        Ve = e.find(Ft => Ft.id === u) || V[0];
      if (!Ve) {
        alert(x("请先配置 Chat 类型的 AI 模型"));
        return;
      }
      if (!w(Ve)) {
        alert(x("请先配置 API Key"));
        return;
      }
      S(!0);
      const It = new AbortController();
      pe("生成前"), B.current = It;
      try {
        const Ft = l.outline,
          We = Ft.length > pan,
          Ze = We ? FBa(Ft, pan) : [Ft];
        j(We ? `长文案续读模式：共 ${Ze.length} 段，正在处理第 1 段...` : `正在按 ${He} 集分析大纲...`);
        const Ge = [];
        let Oe = "";
        for (let st = 0; st < Ze.length; st++) {
          It.signal.throwIfAborted();
          const vt = st === 0,
            Ht = Ze.length - st,
            nn = Math.max(1, Math.ceil((He - Ge.length) / Ht)),
            pt = vt ? OBa(Ze[st], nn) : BBa(Oe, Ze[st], Ge.length + 1, nn);
          Ze.length > 1 ? j(`续读：第 ${st + 1}/${Ze.length} 段，AI 正在拆解剧情...`) : j("AI 正在拆解剧情...");
          const lt = await xe(pt, It.signal);
          j("正在解析分集结果...");
          let gt = lt;
          const Ut = lt.match(/\[[\s\S]*\]/);
          Ut && (gt = Ut[0]);
          const _t = JSON.parse(gt),
            At = Ge.length + 1,
            Yt = _t.map((kt, St) => ({
              id: Fi(),
              index: kt.index || At + St,
              title: kt.title || `第${At + St}集`,
              outline: kt.summary || "",
              content: "",
              hookSummary: kt.hookSummary,
              emotionKeywords: kt.emotionKeywords
            }));
          Ge.push(...Yt), Oe = Yt.slice(-3).map(kt => `第${kt.index}集《${kt.title}》：${(kt.outline || "").slice(0, 80)}...`).join(`
`);
        }
        if (It.signal.throwIfAborted(), !Ge.length) throw new Error("模型返回的分集为空，原有内容已保留");
        J(st => {
          const Ht = [...st.episodes.filter(nn => nn.segmentDetail), ...Ge];
          return {
            ...st,
            episodes: Ht,
            episodeCount: He,
            splitMode: "episodes",
            updatedAt: Date.now()
          };
        }), pe("智能分集"), j("分集完成！");
      } catch (Ft) {
        Ft.name === "AbortError" ? j("已取消") : (console.error("[ScriptWriter] 智能分集失败:", Ft), j(`分集失败: ${Ft.message}`));
      } finally {
        S(!1), B.current = null, setTimeout(() => j(""), 3e3);
      }
    }, [pe, l.outline, l.episodeCount, l.scriptSkillId, l.scriptPromptCustom, e, u, V, t, J, xe]),
    ue = g.useCallback(async (Ce, He) => {
      var Ze, Ge, Oe, st, vt, Ht, nn, pt, lt, gt;
      if (B.current) return;
      if (!l.outline.trim()) {
        alert(x("请先输入大纲内容"));
        return;
      }
      if (Ce < 30) {
        alert(x("总时长不能少于 30 秒"));
        return;
      }
      if (He < 5) {
        alert(x("片段时长不能少于 5 秒"));
        return;
      }
      const Ve = e.find(Ut => Ut.id === u) || V[0];
      if (!Ve) {
        alert(x("请先配置 Chat 类型的 AI 模型"));
        return;
      }
      const it = w(Ve),
        It = (Ve.url || "https://ai.comfly.chat").replace(/\/+$/, "");
      if (!it) {
        alert(x("请先配置 API Key"));
        return;
      }
      const Ft = Math.ceil(Ce / He);
      S(!0), j(`正在按时长分段（共 ${Ft} 个片段）...`);
      const We = new AbortController();
      pe("生成前"), B.current = We;
      try {
        const Ut = await fetch(`${It}/v1/chat/completions`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${it}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(k(Ve, {
            model: Ve.modelName || "gemini-3-pro-preview",
            messages: [{
              role: "system",
              content: await han(l.scriptSkillId, l.scriptPromptCustom)
            }, {
              role: "user",
              content: zBa(l.outline, Ce, He)
            }],
            stream: !0,
            max_tokens: 4e4
          })),
          signal: We.signal
        });
        if (!Ut.ok) {
          const Ot = await Ut.text();
          throw new Error(Ot || `API 错误: ${Ut.status}`);
        }
        const _t = (Ze = Ut.body) == null ? void 0 : Ze.getReader(),
          At = new TextDecoder("utf-8");
        let Yt = "",
          qe = "";
        if (_t) for (j("AI 正在按时长节奏拆解...");;) {
          const {
            done: Ot,
            value: ln
          } = await _t.read();
          if (Ot) break;
          qe += At.decode(ln, {
            stream: !0
          });
          const Pn = qe.split(`
`);
          qe = Pn.pop() || "";
          for (const rn of Pn) {
            const Yn = rn.trim();
            if (!(!Yn || Yn === "data: [DONE]") && Yn.startsWith("data: ")) try {
              const Ct = Yn.slice(6);
              if (Ct === "[DONE]") continue;
              const Cn = JSON.parse(Ct),
                un = ((st = (Oe = (Ge = Cn.choices) == null ? void 0 : Ge[0]) == null ? void 0 : Oe.delta) == null ? void 0 : st.content) || ((Ht = (vt = Cn.choices) == null ? void 0 : vt[0]) == null ? void 0 : Ht.text) || ((nn = Cn.delta) == null ? void 0 : nn.content) || Cn.content || "";
              un && (Yt += un);
            } catch {}
          }
        } else Yt = ((gt = (lt = (pt = (await Ut.json()).choices) == null ? void 0 : pt[0]) == null ? void 0 : lt.message) == null ? void 0 : gt.content) || "";
        j("正在解析分段结果...");
        let kt = Yt;
        const St = Yt.match(/\[[\s\S]*\]/);
        St && (kt = St[0]);
        const Qt = JSON.parse(kt).map((Ot, ln) => {
          const Pn = {
              subject: Ot.subject || "",
              setting: Ot.setting || "",
              timeline: (Ot.timeline || []).map(Ct => ({
                timeRange: Ct.timeRange || "",
                description: Ct.description || ""
              })),
              camera: Ot.camera || "",
              visualStyle: Ot.visualStyle || "",
              audio: Ot.audio || "",
              transition: Ot.transition || "",
              narration: Ot.narration || ""
            },
            rn = Pn.timeline.map(Ct => `  * **${Ct.timeRange}** ${Ct.description}`).join(`
`),
            Yn = [`### 片段 ${Ot.index || ln + 1}: ${Ot.title || `片段${ln + 1}`} (${Ot.durationSeconds || He}秒)`, "", "**1. 主题（Subject）**", Pn.subject, "", "**2. 环境（Setting）**", Pn.setting, "", "**3. 动作与时间线（Action / Timeline）**", rn, "", "**4. 镜头（Camera）**", Pn.camera, "", "**5. 影像风格（Visual Style）**", Pn.visualStyle, "", "**6. 声音（Audio）**", Pn.audio, "", "**7. 衔接镜头（Transition）**", Pn.transition, "", "**8. 旁白/独白（Narration）**", Pn.narration || "（无）"].join(`
`);
          return {
            id: Fi(),
            index: Ot.index || ln + 1,
            title: Ot.title || `片段${ln + 1}`,
            content: Yn,
            hookSummary: Ot.hookSummary,
            emotionKeywords: Ot.emotionKeywords,
            durationSeconds: Ot.durationSeconds || He,
            segmentDetail: Pn
          };
        });
        J(Ot => {
          const Pn = [...Ot.episodes.filter(rn => !rn.segmentDetail), ...Qt];
          return {
            ...Ot,
            episodes: Pn,
            episodeCount: Pn.length,
            splitMode: "duration",
            totalDurationSeconds: Ce,
            segmentDurationSeconds: He,
            updatedAt: Date.now()
          };
        }), pe("按时长拆分"), j("时长分段完成！");
      } catch (Ut) {
        Ut.name === "AbortError" ? j("已取消") : (console.error("[ScriptWriter] 时长分段失败:", Ut), j(`分段失败: ${Ut.message}`));
      } finally {
        S(!1), B.current = null, setTimeout(() => j(""), 3e3);
      }
    }, [pe, l.outline, l.scriptSkillId, l.scriptPromptCustom, e, u, V, t, J]),
    ge = g.useCallback(async (Ce, He, Ve = {}) => {
      var Ge;
      if (B.current) return;
      const it = l.episodes.find(Oe => Oe.id === Ce);
      if (!it || !(aj(it) || He === "shots" && ((Ge = it.expandedScript) != null && Ge.trim()))) {
        P("请先填写本集梗概或正文");
        return;
      }
      const It = e.find(Oe => Oe.id === u) || V[0];
      if (!It) {
        P("请先配置 Chat 类型的 AI 模型");
        return;
      }
      const Ft = w(It);
      if (!Ft) {
        P("请先配置 API Key");
        return;
      }
      const We = new AbortController();
      B.current = We, I(Ce), M(He);
      const Ze = {
        story: "扩写故事",
        script: "生成场次剧本",
        shots: "生成分镜表"
      }[He];
      P(Ze + "中…"), pe("生成前");
      try {
        const Oe = await bwt(l.scriptSkillId),
          st = `${Per((it.segmentDetail ? Mer : "你是专业影视编剧。遵循用户任务的输出格式，忠实于原作人物关系、视角、剧情和台词。") + (Oe ? `
【创作 Skill】
` + Oe : ""), l.scriptPromptCustom)}
${Bz}`,
          vt = it.segmentDetail && He === "script" ? UBa(l.outline, it, l.episodes.length) : PBa(He, l.outline, it, Ve),
          Ht = await fetch((It.url || "https://ai.comfly.chat").replace(/\/+$/, "") + "/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: "Bearer " + Ft,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(k(It, {
              model: It.modelName || "gemini-3-pro-preview",
              messages: [{
                role: "system",
                content: st
              }, {
                role: "user",
                content: vt
              }],
              stream: !0,
              max_tokens: 4e4
            })),
            signal: We.signal
          });
        if (!Ht.ok) throw new Error((await Ht.text()) || "API 错误: " + Ht.status);
        let nn = !1;
        const pt = await qS({
          response: Ht,
          format: "openai",
          onDelta: gt => {
            We.signal.aborted || P(Ze + "中 · 已接收 " + gt.length + " 字");
          },
          onTruncated: gt => {
            nn || (nn = gt);
          }
        });
        if (We.signal.throwIfAborted(), !pt.trim() || nn) throw new Error("模型输出为空或被截断，原有内容已保留");
        const lt = He === "shots" ? {
          shots: EBa(pt, Ve.append ? it.shots : [])
        } : He === "story" || it.segmentDetail ? {
          content: pt
        } : {
          expandedScript: pt
        };
        ie(Ce, lt), pe(Ze), P(Ze + "完成");
      } catch (Oe) {
        P(We.signal.aborted ? "已取消，原有内容已保留" : Ze + "失败：" + (Oe instanceof Error ? Oe.message : String(Oe)));
      } finally {
        I(null), M(null), B.current = null;
      }
    }, [l.outline, l.episodes, l.scriptSkillId, l.scriptPromptCustom, e, u, V, t, pe, ie]),
    _e = g.useCallback(Ce => ge(Ce, "script"), [ge]),
    ke = g.useCallback(Ce => ge(Ce, "story"), [ge]),
    ve = g.useCallback((Ce, He, Ve, it) => {
      var Ft;
      const It = (Ft = D.find(We => We.id === it)) == null ? void 0 : Ft.prompt;
      return ge(Ce, "shots", {
        count: Math.max(1, Math.min(60, Math.floor(He) || 8)),
        append: Ve,
        style: It
      });
    }, [ge, D]),
    [Te, Ne] = g.useState(null),
    me = Ce => ({
      4: {
        gridLabel: "4宫格（2×2）",
        structure: "4格结构：开场·空间 → 推进·主体 → 冲突·张力 → 收束·氛围",
        wordRange: "150-350字"
      },
      6: {
        gridLabel: "6宫格（2×3）",
        structure: "6格结构：开场 → 环境纵深 → 主体登场 → 情绪推进 → 高潮 → 收束",
        wordRange: "250-450字"
      },
      9: {
        gridLabel: "9宫格（3×3）",
        structure: "9格结构：三行叙事——开场·空间建立；推进·主体与冲突；收束·氛围凝结",
        wordRange: "300-600字"
      },
      25: {
        gridLabel: "25宫格（5×5）",
        structure: "5行结构：开场·空间建立 → 推进·环境纵深 → 聚焦·主体登场 → 深入·情绪张力 → 收束·氛围凝结",
        wordRange: "400-800字"
      }
    })[Ce],
    Ae = g.useCallback(async (Ce, He, Ve, it = 25) => {
      var lt, gt, Ut, _t;
      const It = l.episodes.find(At => At.id === Ce);
      if (!It || !It.scenes) return;
      const Ft = It.scenes.find(At => At.sceneNumber === He);
      if (!Ft) return;
      const We = e.find(At => At.id === u) || V[0];
      if (!We) {
        alert(x("请先配置 Chat 类型的 AI 模型"));
        return;
      }
      const Ze = w(We),
        Ge = (We.url || "https://ai.comfly.chat").replace(/\/+$/, "");
      if (!Ze) {
        alert(x("请先配置 API Key"));
        return;
      }
      const Oe = `${Ce}__${He}__${it}`;
      pe("生成前"), Ne(Oe);
      const st = new AbortController();
      B.current = st;
      const vt = me(it),
        Ht = Ve && Ve !== "auto" ? (() => {
          const At = D.find(Yt => Yt.id === Ve);
          return At ? `

**用户选择的概念图风格**：${At.label}
风格提示词：${At.prompt}
请在生成提示词时融入此风格特征，替代默认的纯黑白灰铅笔风格。将风格要素自然融入${it}格叙事描述中。` : "";
        })() : "",
        nn = `你是一位专业的影视分镜概念图提示词生成专家。你需要将剧本场次描述转化为${vt.gridLabel}分镜概念图提示词。${Ve && Ve !== "auto" ? "" : "默认风格为纯黑白灰铅笔素描草图风格。"}

核心要求：
1. 每个场次生成一条完整提示词，为一个连贯的自然段落
2. ${vt.structure}
3. 将影视景别术语转化为视觉描述
4. 将音效/对白转化为视觉语言
5. 提示词${vt.wordRange}（中文）
6. 格与格之间用中文分号「；」连接

输出严格JSON格式：
{
  "emotionTone": "情绪基调关键词",
  "conceptPrompt": "完整的${vt.gridLabel}提示词（一个连贯段落）"
}

只返回JSON，不要其他文字。
${Bz}
conceptPrompt 必须先写这一场已经确定的场景空镜、角色肖像、道具静物，再写本镜动作。不要换人换景换道具。`,
        pt = `请为以下场次生成${vt.gridLabel}分镜概念图提示词：

**场次**: SCENE ${Ft.sceneNumber}
**景别**: ${Ft.shotSize || "未指定"}
**场景**: ${Ft.location || "未指定"}
**人物**: ${Ft.characters || "无"}

**场次详细内容**:
${Ft.content}

**所属集数背景**:
集标题: ${It.title}
集概述: ${(It.content || "").substring(0, 1e3)}${Ht}

已绑定设定，按上一镜、场景、角色、道具使用，不要换人换景换道具：
${jLt(Ft, l.extraction, (lt = It.scenes) == null ? void 0 : lt.filter(At => At.sceneNumber < Ft.sceneNumber).at(-1)).prompt}`;
      try {
        const At = await fetch(`${Ge}/v1/chat/completions`, {
          method: "POST",
          signal: st.signal,
          headers: {
            Authorization: `Bearer ${Ze}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(k(We, {
            model: We.modelName || "gemini-3-pro-preview",
            messages: [{
              role: "system",
              content: nn
            }, {
              role: "user",
              content: pt
            }],
            stream: !1,
            max_tokens: 4e3
          }))
        });
        if (!At.ok) {
          const St = await At.text();
          throw new Error(St || `API 错误: ${At.status}`);
        }
        const kt = (((_t = (Ut = (gt = (await At.json()).choices) == null ? void 0 : gt[0]) == null ? void 0 : Ut.message) == null ? void 0 : _t.content) || "").match(/\{[\s\S]*\}/);
        if (kt) {
          const St = JSON.parse(kt[0]),
            hn = St.conceptPrompt || "",
            Qt = St.emotionTone || "",
            Ot = it === 25 ? {
              conceptPrompt: hn,
              emotionTone: Qt
            } : it === 4 ? {
              conceptPrompt4: hn,
              emotionTone: Qt
            } : it === 6 ? {
              conceptPrompt6: hn,
              emotionTone: Qt
            } : {
              conceptPrompt9: hn,
              emotionTone: Qt
            },
            ln = It.scenes.map(Pn => Pn.sceneNumber === He ? {
              ...Pn,
              ...Ot
            } : Pn);
          ie(Ce, {
            scenes: ln
          }), pe("场次概念图");
        }
      } catch (At) {
        console.error("[ScriptWriter] 生成场次概念图失败:", At);
      } finally {
        Ne(null), B.current = null;
      }
    }, [pe, l.episodes, l.extraction, e, u, V, t, ie, D]),
    [Fe, Me] = g.useState(!1),
    [Re, $e] = g.useState(""),
    rt = g.useCallback(async (Ce, He, Ve) => {
      if (B.current) return;
      const it = Cne(l);
      if (!it.sources.length) {
        alert(x("请先在剧本页写入正文或大纲"));
        return;
      }
      const Ft = l.extractionModelId || u,
        We = e.find(Ht => Ht.id === Ft) || V[0];
      if (!We) {
        alert(x("请先配置 Chat 类型的 AI 模型"));
        return;
      }
      const Ze = w(We),
        Ge = (We.url || "https://ai.comfly.chat").replace(/\/+$/, "");
      if (!Ze) {
        alert(x("请先配置 API Key"));
        return;
      }
      const Oe = Ce || l.extractionArtStyle || "auto";
      J(Ht => ({
        ...Ht,
        extractionArtStyle: Oe,
        updatedAt: Date.now()
      })), Me(!0), $e("正在读取关联剧本...");
      const st = new AbortController();
      pe("生成前"), B.current = st;
      let vt = !1;
      try {
        const Ht = await bwt(l.extractionSkillId),
          nn = Ht ? `【身份设定 Skill】
${Ht}

` : "",
          pt = [];
        if (!He) {
          const _t = DBa(it.sources);
          if (_t.characters.length + _t.scenes.length + _t.props.length) {
            const Yt = le.current.projects.find(qe => qe.id === l.id);
            if (Yt && Cne(Yt).fingerprint === it.fingerprint) {
              const qe = uan(Yt.extraction, [_t], Fi);
              J(kt => Cne(kt).fingerprint === it.fingerprint ? {
                ...kt,
                extraction: qe,
                updatedAt: Date.now()
              } : kt), vt = !0, $e(`已列出 ${qe.characters.length} 个角色 · ${qe.scenes.length} 个场景 · ${qe.props.length} 个道具，正在写生图提示词`);
            }
          }
        }
        const lt = `${nn}重新阅读剧本，提取角色、场景和道具，并为每一条写 visualPrompt。只返回 JSON，不要解释。
每个角色：name、role（主角/配角/反派/路人）、一句中文 description、一句 visualPrompt。
每个场景：name、一句中文 description、一句 visualPrompt。场景只写地点，去掉内、外、日、夜。
每个道具：name、owner、一句中文 description、一句 visualPrompt。
对白括号里的男声、女声、画外音不是新角色。description 不要写「剧本中的人物」或「剧本中的场景」。
${Bz}
${jBa}
${He ? `本次只提取 ${He} 中的「${Ve}」，其他类型返回空数组；未出现时不要编造。` : "不要编造原文没有的名字。名单不对就删掉，漏了就补上。"}`;
        for (const [_t, At] of it.batches.entries()) {
          st.signal.throwIfAborted();
          const Yt = `重新分析下面剧本，提取角色、场景和道具。每条写一句 description 和一句 visualPrompt，并给出 sources。不要只重复已有占位描述。

${At.map(Qt => `【sourceId: ${Qt.id} | ${Qt.label}】
${Qt.text}`).join(`

`)}`,
            qe = [{
              role: "system",
              content: lt
            }, {
              role: "user",
              content: Yt
            }];
          let kt = "",
            St = !1;
          const hn = () => {
            if (st.signal.aborted) return;
            const Qt = kt.trim().split(`
`).map(Ot => Ot.trim()).filter(Boolean).slice(-6);
            $e([`正在补描述 ${_t + 1}/${it.batches.length}`, ...Qt].join(`
`));
          };
          hn();
          for (let Qt = 0; Qt < 3; Qt++) {
            st.signal.throwIfAborted();
            let Ot;
            try {
              if (Ot = await fetch(`${Ge}/v1/chat/completions`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${Ze}`,
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(k(We, {
                  model: We.modelName || "gemini-3-pro-preview",
                  messages: qe,
                  stream: !0,
                  max_tokens: 8e3
                }, "none")),
                signal: st.signal
              }), !Ot.ok) throw new Error((await Ot.text()) || `API 错误: ${Ot.status}`);
              let ln = !1;
              const Pn = await qS({
                response: Ot,
                format: "openai",
                logPrefix: "[ScriptWriter]",
                onDelta: () => {},
                onReasoningText: Cn => {
                  kt = Cn, hn();
                },
                onTruncated: Cn => {
                  ln || (ln = Cn);
                }
              });
              st.signal.throwIfAborted();
              let rn;
              const Yn = ln || Pn.includes("{") && !/\}\s*$/.test(Pn);
              try {
                rn = dan(Pn, At, He), ln = !1;
              } catch (Cn) {
                if (!Yn) throw Cn;
                ln = !0;
                try {
                  rn = dan(Pn, At, He, !0);
                } catch {
                  if (St) break;
                  throw new Error("模型输出被截断，原有设定已保留，请重试");
                }
              }
              const Ct = [...rn.characters, ...rn.scenes, ...rn.props].map(Cn => Cn.name);
              if (!Ct.length) {
                if (St) break;
                throw new Error(ln ? "模型输出被截断，原有设定已保留，请重试" : "未找到可关联的设定，原有内容已保留");
              }
              if (pt.push(rn), St = !0, !ln) break;
              kt = "", qe.splice(1, qe.length, {
                role: "user",
                content: `${Yt}

已经提取，不要重复：${Ct.join("、")}
请只返回剩余设定，格式相同。`
              });
            } catch (ln) {
              if (!St || ln.name === "AbortError") throw ln;
              break;
            }
          }
        }
        if (!pt.some(_t => Object.values(_t).some(At => At.length))) {
          if (vt) {
            $e("已从剧本列出名字");
            return;
          }
          throw new Error("未找到可关联的设定，原有内容已保留");
        }
        const gt = le.current.projects.find(_t => _t.id === l.id);
        if (!gt || Cne(gt).fingerprint !== it.fingerprint) throw new Error("分析期间剧本已修改，请重新分析；原有设定已保留");
        const Ut = uan(gt.extraction, pt, Fi, He);
        J(_t => Cne(_t).fingerprint !== it.fingerprint ? _t : {
          ..._t,
          extraction: Ut,
          extractionSourceFingerprint: He ? _t.extractionSourceFingerprint : it.fingerprint,
          updatedAt: Date.now()
        }), pe(He ? "补充设定" : "分析剧本设定"), $e(`分析完成：${Ut.characters.length} 个角色 · ${Ut.scenes.length} 个场景 · ${Ut.props.length} 个道具`);
      } catch (Ht) {
        Ht.name === "AbortError" ? $e("已取消") : vt ? (console.error("[ScriptWriter] 提取失败:", Ht), $e(`名字已列出，重新分析没写上：${Ht.message}`)) : (console.error("[ScriptWriter] 提取失败:", Ht), $e(`提取失败: ${Ht.message}`));
      } finally {
        Me(!1), B.current === st && (B.current = null);
      }
    }, [pe, l, e, u, V, t, J]);
  g.useEffect(() => {
    $e("");
  }, [l.id]);
  const nt = g.useCallback(Ce => rt(Ce), [rt]),
    ze = g.useCallback((Ce, He, Ve) => {
      if (Ve.trim()) return rt(Ce, {
        character: "characters",
        scene: "scenes",
        prop: "props"
      }[He], Ve.trim());
    }, [rt]),
    Le = g.useCallback(() => {
      var Ce;
      (Ce = B.current) == null || Ce.abort();
    }, []),
    Ke = g.useCallback(() => {
      if (B.current) return;
      const Ce = pte();
      i(He => [Ce, ...He]), s(Ce.id), N(null);
    }, []),
    Xe = g.useCallback(Ce => {
      if (B.current) return;
      const He = {
        ...pte(),
        ...Ce.content,
        name: `${Ce.content.name} · 副本`
      };
      i(Ve => [He, ...Ve]), s(He.id), N(null);
    }, []),
    De = g.useCallback(Ce => {
      B.current || (s(Ce), N(null));
    }, []),
    Ye = g.useCallback(Ce => {
      B.current || (fer(Ce), i(He => {
        const Ve = He.filter(it => it.id !== Ce);
        if (Ve.length === 0) {
          const it = pte();
          return s(it.id), [it];
        }
        return Ce === o && s(Ve[0].id), Ve;
      }), N(null));
    }, [o]);
  return {
    isScriptWriterOpen: n,
    setIsScriptWriterOpen: r,
    activeTab: G,
    setActiveTab: z,
    project: l,
    projectMetas: d,
    currentProjectId: o,
    setProjectName: X,
    newProject: Ke,
    newProjectFromRevision: Xe,
    switchProject: De,
    deleteProject: Ye,
    setOutline: ce,
    setScriptPromptCustom: Z,
    setScriptSkillId: re,
    setEpisodeCount: we,
    importTxt: Ee,
    moveEpisode: ae,
    createDirectEpisode: be,
    addEpisode: fe,
    removeEpisode: ye,
    updateEpisode: ie,
    selectedEpisodeId: F,
    setSelectedEpisodeId: N,
    scriptModel: u,
    setScriptModel: h,
    scriptEffort: p,
    setScriptEffort: m,
    scriptPlatformGroup: v,
    setScriptPlatformGroup: _,
    chatModels: V,
    smartSplitEpisodes: he,
    smartSplitByDuration: ue,
    generateEpisodeScript: _e,
    generateEpisodeStory: ke,
    generateEpisodeShots: ve,
    episodeTask: E,
    generationProgress: T,
    cancelGeneration: Le,
    isSplitting: A,
    isGeneratingEpisode: C,
    splitProgress: R,
    generateSceneConceptArt: Ae,
    isGeneratingConcept: Te,
    extractCharactersScenesProps: nt,
    extractCharactersScenesPropsManual: ze,
    isExtracting: Fe,
    extractProgress: Re,
    extractionModelId: l.extractionModelId,
    setExtractionModelId: Ce => {
      J(He => ({
        ...He,
        extractionModelId: Ce,
        updatedAt: Date.now()
      }));
    },
    extractionSkillId: l.extractionSkillId,
    setExtractionSkillId: Ce => {
      J(He => ({
        ...He,
        extractionSkillId: Ce || void 0,
        updatedAt: Date.now()
      }));
    },
    allStyles: D,
    customStyles: O,
    addCustomStyle: U,
    removeCustomStyle: H,
    updateCustomStyle: Y,
    generateStyleWithAI: Q,
    isGeneratingStyle: K
  };
};

function LLt({
  scopeId: e,
  modelId: t,
  models: n,
  isDark: r,
  disabled: a,
  onModel: i,
  effort: o,
  onEffort: s,
  platformGroup: l,
  onPlatformGroup: d,
  buttonTitle: u
}) {
  const [h, p] = g.useState(null),
    m = Qa.getConfigById(t) || n.find(b => b.id === t),
    f = TT(t, m == null ? void 0 : m.modelName),
    y = !!(m && !Mu(t) && od(m, Qa.getGlobalBaseUrl()));
  return c.jsxs("span", {
    className: "sw-chat-picks",
    children: [c.jsx(Th, {
      scopeId: e,
      dropdownType: "model",
      value: t,
      models: n,
      isDark: r,
      activeDropdown: h,
      setActiveDropdown: p,
      onSelect: i,
      showChannelBar: !0,
      menuMaxHeight: 360,
      disabled: a,
      buttonTitle: u,
      className: "sw-model-picker",
      menuPlacement: "above",
      buttonVariant: "transparent"
    }), f ? c.jsx(dT, {
      nodeId: e,
      dropdownType: "effort",
      value: o,
      isDark: r,
      activeDropdown: h,
      setActiveDropdown: p,
      onSelect: s,
      menuPlacement: "above",
      buttonVariant: "bare",
      buttonClassName: "sw-effort",
      modelId: t,
      modelName: m == null ? void 0 : m.modelName
    }) : null, y ? c.jsx(Ku, {
      nodeId: e,
      platformGroup: l,
      modelName: m == null ? void 0 : m.modelName,
      modelId: t,
      modelConfigId: t,
      isDark: r,
      onGroupChange: d,
      compact: !0,
      buttonVariant: "bare",
      persistModelSettings: !0,
      menuPlacement: "above",
      className: "sw-key-picker",
      disabled: a
    }) : null]
  });
}

function Rer({
  value: e,
  onChange: t,
  placement: n = "above",
  disabled: r = !1,
  isDark: a = !0
}) {
  const i = uer().filter(o => o.source === "agent").map(o => ({
    id: o.id,
    name: o.name,
    content: o.prompt,
    createdAt: 0
  }));
  return c.jsx(kYe, {
    isDark: a,
    value: e != null && e.startsWith("skill:") ? e.slice(6) : e,
    onChange: t,
    additionalSkills: i,
    disabled: r,
    menuPlacement: n === "below" ? "auto" : "above",
    menuAlign: n === "above" ? "right" : "left",
    className: "sw-skill-picker"
  });
}

function Ner({
  value: e,
  onChange: t,
  styles: n,
  disabled: r,
  label: a,
  isDark: i = !0
}) {
  var v;
  on();
  const [o, s] = g.useState(!1),
    [l, d] = g.useState(""),
    [u, h] = g.useState("below"),
    [p, m] = g.useState(300),
    f = g.useRef(null),
    y = g.useRef(null);
  g.useEffect(() => {
    if (!o) return;
    const _ = k => {
        var A, S;
        !((A = f.current) != null && A.contains(k.target)) && !((S = y.current) != null && S.contains(k.target)) && s(!1);
      },
      w = k => {
        var A;
        k.key === "Escape" && (s(!1), (A = f.current) == null || A.focus());
      };
    return document.addEventListener("mousedown", _), document.addEventListener("keydown", w), () => {
      document.removeEventListener("mousedown", _), document.removeEventListener("keydown", w);
    };
  }, [o]);
  const b = [{
    id: "auto",
    label: "跟随全局设定",
    prompt: "沿用当前项目的整体视觉风格",
    category: "default"
  }, ...n].filter(_ => `${_.label} ${_.prompt}`.toLowerCase().includes(l.toLowerCase()));
  return c.jsxs(c.Fragment, {
    children: [c.jsxs("button", {
      ref: f,
      className: "sw-select-trigger",
      disabled: r,
      "aria-label": a,
      "aria-expanded": o,
      onClick: () => {
        const _ = f.current.getBoundingClientRect(),
          w = window.innerHeight - _.bottom - 12,
          k = _.top - 12,
          A = w < 370 && k > w ? "above" : "below";
        h(A), m(Math.min(300, Math.max(80, (A === "above" ? k : w) - 70))), d(""), s(!o);
      },
      children: [c.jsx("span", {
        children: ((v = n.find(_ => _.id === e)) == null ? void 0 : v.label) || x("跟随全局设定")
      }), c.jsx(Mi, {
        size: 14
      })]
    }), c.jsx(yg, {
      open: o && !r,
      anchorRef: f,
      isDark: i,
      placement: u,
      minWidth: 300,
      className: `sw-style-menu${i ? "" : " is-light"}`,
      unstyled: !0,
      children: c.jsxs("div", {
        ref: y,
        children: [c.jsxs("label", {
          className: "sw-search",
          children: [c.jsx(mc, {
            size: 14
          }), c.jsx("input", {
            "aria-label": x("搜索风格"),
            autoFocus: !0,
            placeholder: x("搜索视觉风格…"),
            value: l,
            onChange: _ => d(_.target.value)
          })]
        }), c.jsxs("div", {
          className: "sw-style-options",
          style: {
            maxHeight: p
          },
          children: [b.map(_ => c.jsxs("button", {
            "aria-label": x(_.label),
            "aria-pressed": _.id === e,
            onClick: () => {
              var w;
              t(_.id), s(!1), (w = f.current) == null || w.focus();
            },
            children: [c.jsxs("span", {
              children: [c.jsx("strong", {
                children: x(_.label)
              }), c.jsxs("small", {
                children: [_.category === "cinematic" ? x("影视写实") : _.category === "stylized" ? x("艺术风格") : _.category === "default" ? x("项目默认") : x("自定义"), " · ", _.prompt]
              })]
            }), _.id === e && c.jsx(io, {
              size: 14
            })]
          }, _.id)), !b.length && c.jsx("p", {
            children: x("没有匹配的风格")
          })]
        })]
      })
    })]
  });
}

function jer(e) {
  return on(), c.jsxs(c.Fragment, {
    children: [c.jsx("button", {
      "aria-label": x("AI 风格助手"),
      title: x("AI 风格助手"),
      onClick: e.onStyleAssistant,
      children: c.jsx(sTn, {
        size: 15
      })
    }), c.jsx("button", {
      "aria-label": x("管理风格标签"),
      title: x("管理风格标签"),
      onClick: e.onManageStyles,
      children: c.jsx(tw, {
        size: 15
      })
    })]
  });
}

function GBa(e) {
  var o;
  on();
  const [t, n] = g.useState(!1),
    r = g.useRef(null),
    a = g.useRef(null),
    i = e.episodes.find(s => s.id === e.selectedId);
  return g.useEffect(() => {
    if (!t) return;
    const s = d => {
        var u, h;
        !((u = r.current) != null && u.contains(d.target)) && !((h = a.current) != null && h.contains(d.target)) && n(!1);
      },
      l = d => {
        var u;
        d.key === "Escape" && (n(!1), (u = r.current) == null || u.focus());
      };
    return document.addEventListener("mousedown", s), document.addEventListener("keydown", l), () => {
      document.removeEventListener("mousedown", s), document.removeEventListener("keydown", l);
    };
  }, [t]), c.jsxs("div", {
    className: "sw-composer-wrap",
    "aria-label": x("镜头创作栏"),
    children: [c.jsxs("div", {
      className: "sw-composer",
      children: [c.jsx("textarea", {
        "aria-label": x("分集内容"),
        placeholder: x("选择一集，编辑故事内容，再生成本集场次…"),
        value: i ? aj(i) : "",
        readOnly: !i || e.busy,
        onChange: s => i && e.onUpdateEpisode(i.id, {
          [i.content || !i.outline ? "content" : "outline"]: s.target.value
        })
      }), c.jsxs("div", {
        className: "sw-composer-bar",
        children: [c.jsx("button", {
          "aria-label": x("前往剧本创作"),
          title: x("前往剧本创作"),
          onClick: e.onWrite,
          children: c.jsx(Hd, {
            size: 16
          })
        }), c.jsx(LLt, {
          scopeId: "script-shots",
          modelId: e.scriptModel,
          models: e.chatModels,
          isDark: e.isDark,
          disabled: e.busy,
          onModel: e.onSetScriptModel,
          effort: e.scriptEffort,
          onEffort: e.onSetScriptEffort,
          platformGroup: e.scriptPlatformGroup(e.scriptModel),
          onPlatformGroup: s => e.onSetScriptPlatformGroup(e.scriptModel, s),
          buttonTitle: "选择镜头模型"
        }), c.jsx(jer, {
          ...e
        }), c.jsx("span", {
          className: "sw-spacer"
        }), c.jsx("small", {
          children: i ? x("{0} 字", aj(i).length.toLocaleString()) : x("先在剧本页创建分集")
        }), c.jsx("button", {
          className: "sw-primary sw-submit",
          "aria-label": e.busy ? x("停止生成") : x(i ? "生成本集场次" : "前往剧本创作"),
          title: e.busy ? x("停止生成") : x(i ? "生成本集场次" : "前往剧本创作"),
          disabled: !e.busy && !!i && (!aj(i) || !e.chatModels.length),
          onClick: e.busy ? e.onCancelGeneration : i ? () => e.onGenerateEpisode(i.id) : e.onWrite,
          children: e.busy ? c.jsx(kf, {
            size: 15
          }) : c.jsx(Gc, {
            size: 19
          })
        })]
      })]
    }), c.jsxs("div", {
      className: "sw-parameters",
      children: [c.jsxs("button", {
        ref: r,
        className: "sw-episode-select",
        "aria-label": x("选择分集"),
        "aria-expanded": t,
        onClick: () => n(!t),
        disabled: !e.episodes.length,
        children: [c.jsx(Hd, {
          size: 13
        }), c.jsx("span", {
          children: i ? `EP ${String(i.index).padStart(2, "0")} · ${i.title}` : x("暂无分集")
        }), c.jsx(Mi, {
          size: 13
        })]
      }), c.jsx("span", {
        className: "sw-parameter-note",
        children: (o = i == null ? void 0 : i.scenes) != null && o.length ? x("{0} 个场次", i.scenes.length) : x("待生成分镜")
      }), c.jsx("span", {
        className: "sw-spacer"
      }), c.jsx(Ner, {
        isDark: e.isDark,
        label: x("选择视觉风格"),
        value: e.style,
        onChange: e.onStyle,
        styles: e.styles,
        disabled: e.busy
      })]
    }), c.jsx(yg, {
      open: t,
      anchorRef: r,
      isDark: e.isDark,
      placement: "above",
      minWidth: 300,
      className: `sw-style-menu${e.isDark ? "" : " is-light"}`,
      unstyled: !0,
      children: c.jsx("nav", {
        ref: a,
        className: "sw-episode-menu",
        "aria-label": x("镜头分集"),
        children: e.episodes.map(s => {
          var l;
          return c.jsxs("button", {
            "aria-current": e.selectedId === s.id ? "true" : void 0,
            onClick: () => {
              var d;
              e.onSelect(s.id), n(!1), (d = r.current) == null || d.focus();
            },
            children: [c.jsx("span", {
              className: "sw-episode-number",
              children: String(s.index).padStart(2, "0")
            }), c.jsxs("span", {
              children: [c.jsx("strong", {
                children: s.title
              }), c.jsx("small", {
                children: (l = s.scenes) != null && l.length ? x("{0} 个场次 · 可编辑", s.scenes.length) : x("待生成分镜")
              })]
            }), s.id === e.selectedId && c.jsx(io, {
              size: 14
            })]
          }, s.id);
        })
      })
    })]
  });
}

function VBa(e) {
  on();
  const t = g.useRef(null),
    [n, r] = g.useState(""),
    [a, i] = g.useState("all"),
    o = a === "all",
    s = () => {
      var d, u;
      return o ? (d = e.onExtract) == null ? void 0 : d.call(e, e.style) : (u = e.onExtractManual) == null ? void 0 : u.call(e, e.style, a, n.trim());
    },
    l = e.hasSettings ? "更新设定" : "分析剧本";
  return g.useEffect(() => {
    const d = t.current;
    d && (d.scrollTop = d.scrollHeight);
  }, [e.extractProgress]), c.jsxs("div", {
    className: "sw-composer-wrap",
    "aria-label": x("设定创作栏"),
    children: [e.extractProgress && c.jsx("div", {
      ref: t,
      className: "sw-progress sw-think",
      role: "status",
      children: e.extractProgress
    }), c.jsxs("div", {
      className: "sw-composer",
      children: [c.jsxs("div", {
        className: "sw-extraction-context",
        children: [c.jsx("strong", {
          children: e.context.episodeCount ? x("已关联 {0} 集剧本", e.context.episodeCount) : e.context.sources.length ? x("已关联故事大纲") : x("还没有可分析的剧本")
        }), c.jsx("span", {
          children: e.stale ? x("剧本已修改，点击「更新设定」同步分析") : e.hasSettings ? x("自动读取当前正文和场次，无需重复粘贴") : e.context.sources.length ? x("分析角色、场景、道具，并关联原文出处") : x("先到剧本页写入正文或大纲，再来分析设定")
        }), e.context.batches.length > 1 && c.jsx("small", {
          children: x("内容较长，将分 {0} 段分析并合并结果", e.context.batches.length)
        })]
      }), !o && c.jsx("textarea", {
        className: "sw-custom-prompt",
        "aria-label": x("指定提取名称"),
        placeholder: x("输入剧本中需要补充分析的{0}名称…", a === "character" ? "角色" : a === "scene" ? "场景" : "道具"),
        value: n,
        onChange: d => r(d.target.value),
        readOnly: e.busy
      }), c.jsxs("div", {
        className: "sw-composer-bar",
        children: [c.jsx("button", {
          "aria-label": x("查看关联剧本"),
          title: x("查看关联剧本"),
          onClick: e.onWrite,
          children: c.jsx(Hd, {
            size: 16
          })
        }), c.jsx(LLt, {
          scopeId: "script-extraction",
          modelId: e.extractionModelId || e.scriptModel,
          models: e.chatModels,
          isDark: e.isDark,
          disabled: e.busy,
          onModel: d => {
            var u;
            return (u = e.onSetExtractionModelId) == null ? void 0 : u.call(e, d);
          },
          effort: e.scriptEffort,
          onEffort: e.onSetScriptEffort,
          platformGroup: e.scriptPlatformGroup(e.extractionModelId || e.scriptModel),
          onPlatformGroup: d => e.onSetScriptPlatformGroup(e.extractionModelId || e.scriptModel, d),
          buttonTitle: "选择提取模型"
        }), c.jsx(jer, {
          ...e
        }), c.jsx("span", {
          className: "sw-spacer"
        }), c.jsx("small", {
          children: x("{0} 字", e.context.characters.toLocaleString())
        }), c.jsx("button", {
          className: "sw-primary sw-extraction-submit",
          disabled: !e.busy && (!e.context.sources.length || !e.chatModels.length || !o && !n.trim()),
          onClick: e.busy ? e.onCancelGeneration : s,
          children: e.busy ? c.jsxs(c.Fragment, {
            children: [c.jsx(kf, {
              size: 15
            }), x("停止分析")]
          }) : c.jsxs(c.Fragment, {
            children: [x(o ? l : "补充提取"), c.jsx(Gc, {
              size: 16
            })]
          })
        })]
      })]
    }), c.jsxs("div", {
      className: "sw-parameters",
      children: [c.jsx("div", {
        className: "sw-mode",
        "aria-label": x("提取类型"),
        children: [["all", "全部设定"], ["character", "角色"], ["scene", "场景"], ["prop", "道具"]].filter(([d]) => d === "all" || e.onExtractManual).map(([d, u]) => c.jsx("button", {
          "aria-pressed": a === d,
          disabled: e.busy,
          onClick: () => i(d),
          children: u
        }, d))
      }), c.jsx(Ner, {
        isDark: e.isDark,
        label: x("选择视觉风格"),
        value: e.style,
        onChange: e.onStyle,
        styles: e.styles,
        disabled: e.busy
      }), c.jsx("span", {
        className: "sw-spacer"
      }), c.jsx(Rer, {
        isDark: e.isDark,
        value: e.extractionSkillId,
        onChange: d => {
          var u;
          return (u = e.onSetExtractionSkillId) == null ? void 0 : u.call(e, d);
        },
        disabled: e.busy
      })]
    })]
  });
}

function HBa(e) {
  on();
  const [t, n] = g.useState("episodes"),
    [r, a] = g.useState(60),
    [i, o] = g.useState(20),
    [s, l] = g.useState(!1);
  g.useEffect(() => {
    n(e.project.splitMode || "episodes"), a(e.project.totalDurationSeconds || 60), o(e.project.segmentDurationSeconds || 20);
  }, [e.project.id]);
  const d = () => {
    var u;
    return t === "direct" ? (u = e.onDirectEpisode) == null ? void 0 : u.call(e) : t === "episodes" ? e.onSmartSplit(e.project.episodeCount) : e.onSmartSplitByDuration(r, i);
  };
  return c.jsxs("div", {
    className: "sw-composer-wrap",
    children: [e.splitProgress && c.jsx("div", {
      className: "sw-progress",
      role: "status",
      children: e.splitProgress
    }), c.jsxs("div", {
      className: "sw-composer",
      children: [c.jsx("textarea", {
        "aria-label": x("故事大纲"),
        placeholder: x("写下故事大纲，或导入小说原文，让灵感成为剧本…"),
        value: e.project.outline,
        onChange: u => e.onSetOutline(u.target.value)
      }), s && c.jsx("textarea", {
        className: "sw-custom-prompt",
        "aria-label": x("创作要求"),
        placeholder: x("创作要求：叙事节奏、风格、需要保留的设定…"),
        value: e.project.scriptPromptCustom || "",
        onChange: u => {
          var h;
          return (h = e.onSetScriptPromptCustom) == null ? void 0 : h.call(e, u.target.value);
        }
      }), c.jsxs("div", {
        className: "sw-composer-bar",
        children: [c.jsx("button", {
          title: x("导入 TXT"),
          "aria-label": x("导入 TXT"),
          onClick: e.onImportTxt,
          disabled: e.busy,
          children: c.jsx(ml, {
            size: 16
          })
        }), c.jsx("button", {
          title: x("手动新增一集"),
          "aria-label": x("手动新增一集"),
          onClick: e.onAddEpisode,
          disabled: e.busy,
          children: c.jsx(eo, {
            size: 17
          })
        }), c.jsx(LLt, {
          scopeId: "script-writer",
          modelId: e.scriptModel,
          models: e.chatModels,
          isDark: e.isDark,
          disabled: e.busy,
          onModel: e.onSetScriptModel,
          effort: e.scriptEffort,
          onEffort: e.onSetScriptEffort,
          platformGroup: e.scriptPlatformGroup(e.scriptModel),
          onPlatformGroup: u => e.onSetScriptPlatformGroup(e.scriptModel, u),
          buttonTitle: "选择剧本模型"
        }), c.jsx("button", {
          title: x("创作要求"),
          "aria-label": x("创作要求"),
          "aria-expanded": s,
          onClick: () => l(!s),
          children: c.jsx(by, {
            size: 15
          })
        }), c.jsx("span", {
          className: "sw-spacer"
        }), c.jsxs("small", {
          children: [e.project.outline.length.toLocaleString(), x(" 字")]
        }), c.jsx("button", {
          className: "sw-primary sw-submit",
          "aria-label": e.busy ? x("停止生成") : x(t === "direct" ? "保存为新的一集" : "开始创作"),
          disabled: !e.busy && (!e.project.outline.trim() || t !== "direct" && !e.chatModels.length || t === "duration" && (r <= 0 || i <= 0)),
          onClick: e.busy ? e.onCancelGeneration : d,
          children: e.busy ? c.jsx(kf, {
            size: 15
          }) : c.jsx(Gc, {
            size: 19
          })
        })]
      })]
    }), c.jsxs("div", {
      className: "sw-parameters",
      children: [c.jsxs("div", {
        className: "sw-mode",
        "aria-label": x("拆分方式"),
        children: [e.onDirectEpisode && c.jsx("button", {
          "aria-pressed": t === "direct",
          disabled: e.busy,
          onClick: () => n("direct"),
          children: x("单集直通")
        }), c.jsxs("button", {
          "aria-pressed": t === "episodes",
          onClick: () => n("episodes"),
          children: [c.jsx(Hd, {
            size: 13
          }), x("智能分集")]
        }), c.jsxs("button", {
          "aria-pressed": t === "duration",
          onClick: () => n("duration"),
          children: [c.jsx(AP, {
            size: 13
          }), x("大致时长")]
        })]
      }), t === "episodes" ? c.jsxs("label", {
        children: [x("集数"), c.jsx("input", {
          "aria-label": x("目标集数"),
          type: "number",
          min: 1,
          max: 100,
          value: e.project.episodeCount,
          onChange: u => e.onSetEpisodeCount(Number(u.target.value) || 1)
        })]
      }) : t === "direct" ? c.jsx("small", {
        children: x("原文保存为新的一集，不拆分、不调用 AI")
      }) : c.jsxs(c.Fragment, {
        children: [c.jsxs("label", {
          children: [x("总时长"), c.jsx("input", {
            "aria-label": x("总时长（秒）"),
            type: "number",
            min: 1,
            value: r,
            onChange: u => a(Math.max(0, Number(u.target.value)))
          }), x("秒")]
        }), c.jsxs("label", {
          children: [x("每段"), c.jsx("input", {
            "aria-label": x("每段时长（秒）"),
            type: "number",
            min: 5,
            max: 600,
            value: i,
            onChange: u => o(Math.max(5, Math.min(600, Number(u.target.value) || 5)))
          }), x("秒")]
        }), c.jsxs("small", {
          children: [x("约 "), Math.ceil(r / i), x(" 段")]
        })]
      }), c.jsx("span", {
        className: "sw-spacer"
      }), c.jsx(Rer, {
        isDark: e.isDark,
        value: e.project.scriptSkillId,
        onChange: u => {
          var h;
          return (h = e.onSetScriptSkillId) == null ? void 0 : h.call(e, u);
        },
        disabled: e.busy
      })]
    })]
  });
}

const mte = () => ({
  percent: 0,
  message: "",
  kind: null,
  scriptId: null
});

function WBa(e) {
  const [t, n] = g.useState(() => QF()),
    [r, a] = g.useState("local"),
    [i, o] = g.useState([]),
    [s, l] = g.useState(!1),
    [d, u] = g.useState(() => new Set()),
    [h, p] = g.useState(!1),
    [m, f] = g.useState(""),
    [y, b] = g.useState(mte),
    v = g.useRef(e);
  v.current = e;
  const [_, w] = g.useState(() => H2());
  g.useEffect(() => {
    const P = () => w(H2());
    return P(), window.addEventListener($0e, P), window.addEventListener(go, P), () => {
      window.removeEventListener($0e, P), window.removeEventListener(go, P);
    };
  }, []);
  const k = _ && t.enabled,
    A = g.useCallback(() => {
      n(QF());
    }, []);
  g.useEffect(() => (window.addEventListener($0e, A), window.addEventListener(go, A), () => {
    window.removeEventListener($0e, A), window.removeEventListener(go, A);
  }), [A]);
  const S = g.useCallback(P => {
      const R = {
        ...QF(),
        ...P
      };
      pBa(R), n(R);
    }, []),
    C = g.useCallback(async () => {
      if (!t.enabled || !H2()) return o([]), l(!1), u(new Set()), f(""), [];
      p(!0), b({
        percent: 15,
        message: "正在扫描云端剧本...",
        kind: "refresh",
        scriptId: null
      }), f("");
      try {
        const P = v.current;
        b({
          percent: 45,
          message: "正在合并云端列表...",
          kind: "refresh",
          scriptId: null
        });
        const {
          scripts: R,
          uploadedIds: j,
          listScanOk: B,
          listScanError: F
        } = await SBa(P);
        if (ver(j, P, {
          clearMissing: B
        }), u(j), o(R), l(!0), b({
          percent: 100,
          message: "刷新完成",
          kind: "refresh",
          scriptId: null
        }), !B && F) f(R.length > 0 ? `目录扫描失败，已显示索引内 ${R.length} 个剧本。${F.slice(0, 100)}` : `目录扫描失败：${F.slice(0, 120)}。请完全退出后重新运行 tauri dev 再试`);else if (R.length === 0) {
          const N = QF().folderName || "Screenwriting";
          f(B ? `云端目录 ${N}/ 下暂无剧本，请先在本地点击「上传」` : "云端暂无剧本，请先在本地点击「上传」");
        } else f("");
        return R;
      } catch (P) {
        return f(Pze(P).slice(0, 200)), l(!1), b(mte()), [];
      } finally {
        p(!1), setTimeout(() => b(mte()), 400);
      }
    }, [t.enabled]),
    I = g.useCallback(async P => {
      p(!0), b({
        percent: 0,
        message: "准备上传...",
        kind: "upload",
        scriptId: P
      }), f("");
      try {
        await _Ba(P, v.current, j => {
          b({
            percent: j.percent,
            message: j.message,
            kind: "upload",
            scriptId: P
          }), f(j.message);
        }), ake(P), u(j => new Set(j).add(P));
        const R = v.current.find(j => j.id === P);
        R && (o(j => {
          const B = j.filter(F => F.id !== P);
          return B.unshift({
            ...R,
            source: "cloud",
            hasLocal: !0
          }), B.sort((F, N) => N.updatedAt - F.updatedAt);
        }), l(!0)), f("已上传到云端");
      } catch (R) {
        const j = Pze(R).slice(0, 240);
        throw f(j), R;
      } finally {
        p(!1), setTimeout(() => b(mte()), 600);
      }
    }, []),
    E = g.useCallback(async P => {
      p(!0), b({
        percent: 0,
        message: "准备同步到本地...",
        kind: "download",
        scriptId: P
      }), f("");
      try {
        await kBa(P, R => {
          b({
            percent: R.percent,
            message: R.message,
            kind: "download",
            scriptId: P
          }), f(R.message);
        }), ake(P), o(R => R.map(j => j.id === P ? {
          ...j,
          hasLocal: !0
        } : j)), f("已同步到本地");
      } finally {
        p(!1), setTimeout(() => b(mte()), 600);
      }
    }, []),
    M = g.useCallback(async P => {
      if (!us()) throw new Error("删除云端剧本需在 Tauri 桌面端使用");
      if (!t.enabled) throw new Error("请先在剧本创作设置中启用 OSS 备份");
      p(!0), b({
        percent: 0,
        message: "正在删除云端文件...",
        kind: "delete",
        scriptId: P
      });
      try {
        await ABa(P, v.current, R => {
          f(R), b(j => ({
            ...j,
            message: R,
            kind: "delete",
            scriptId: P
          }));
        }), RLt(P), u(R => {
          const j = new Set(R);
          return j.delete(P), j;
        }), o(R => R.filter(j => j.id !== P)), s && (await C());
      } finally {
        p(!1), setTimeout(() => b(mte()), 400);
      }
    }, [t.enabled, s, C]),
    T = g.useCallback(P => d.has(P) || ber(P) != null, [d]);
  return {
    settings: t,
    updateSettings: S,
    listTab: r,
    setListTab: a,
    cloudScripts: i,
    cloudListFetched: s,
    ossBusy: h,
    ossMessage: m,
    ossProgress: y,
    ossAvailable: k,
    refreshCloudList: C,
    uploadToCloud: I,
    downloadFromCloud: E,
    deleteFromOss: M,
    isBackedUpOnOss: T
  };
}

function qBa({
  projects: e,
  currentId: t,
  busy: n,
  onNew: r,
  onSwitch: a,
  onDelete: i,
  onClose: o,
  revisions: s,
  onOpenRevision: l
}) {
  on();
  const [d, u] = g.useState(""),
    [h, p] = g.useState(null),
    [m, f] = g.useState(!1),
    [y, b] = g.useState(() => Ur.isAvailable()),
    [v, _] = g.useState(""),
    w = WBa(e),
    k = dXe();
  g.useEffect(() => {
    const C = () => b(Ur.isAvailable());
    return window.addEventListener(Tf, C), window.addEventListener("focus", C), () => {
      window.removeEventListener(Tf, C), window.removeEventListener("focus", C);
    };
  }, []), g.useEffect(() => {
    w.listTab === "cloud" && w.ossAvailable && !w.cloudListFetched && w.refreshCloudList();
  }, [w.listTab, w.ossAvailable, w.cloudListFetched, w.refreshCloudList]);
  const A = async C => {
      _("");
      try {
        await C();
      } catch (I) {
        _(I instanceof Error ? I.message : String(I));
      }
    },
    S = (w.listTab === "cloud" ? w.cloudScripts : e).filter(C => C.name.toLocaleLowerCase().includes(d.trim().toLocaleLowerCase()));
  return c.jsxs("aside", {
    className: "sw-history",
    "aria-label": x("创作历史"),
    children: [c.jsxs("header", {
      children: [c.jsx("strong", {
        children: x("创作历史")
      }), c.jsx("button", {
        "aria-label": x("收起创作历史"),
        onClick: o,
        children: c.jsx(Na, {
          size: 15
        })
      })]
    }), c.jsxs("button", {
      className: "sw-new",
      disabled: n,
      onClick: r,
      children: [c.jsx(eo, {
        size: 16
      }), x("新建剧本")]
    }), c.jsxs("label", {
      className: "sw-search",
      children: [c.jsx(mc, {
        size: 14
      }), c.jsx("input", {
        "aria-label": x("搜索剧本历史"),
        value: d,
        onChange: C => u(C.target.value),
        placeholder: x("搜索剧本")
      })]
    }), c.jsxs("div", {
      className: "sw-history-tabs",
      children: [c.jsx("button", {
        "aria-pressed": w.listTab === "local",
        onClick: () => w.setListTab("local"),
        children: x("本地")
      }), c.jsx("button", {
        "aria-pressed": w.listTab === "cloud",
        onClick: () => {
          w.setListTab("cloud"), w.settings.enabled || f(!0);
        },
        children: x("云端")
      }), c.jsx("span", {
        className: "sw-spacer"
      }), c.jsx("button", {
        title: x("备份设置"),
        "aria-label": x("备份设置"),
        onClick: () => f(!m),
        children: c.jsx(Wp, {
          size: 14
        })
      }), w.listTab === "cloud" && c.jsx("button", {
        title: x("刷新云端历史"),
        "aria-label": x("刷新云端历史"),
        disabled: w.ossBusy || !w.ossAvailable,
        onClick: () => void w.refreshCloudList(),
        children: c.jsx(bd, {
          size: 14
        })
      })]
    }), m && c.jsxs("div", {
      className: "sw-backup",
      children: [c.jsxs("label", {
        children: [c.jsx("input", {
          type: "checkbox",
          checked: w.settings.enabled,
          onChange: C => w.updateSettings({
            enabled: C.target.checked
          })
        }), k.getEnableLabel("剧本")]
      }), !w.ossAvailable && c.jsx("p", {
        children: k.configHint
      }), !y && c.jsx("p", {
        children: x("启用资源缓存目录后，可将剧本同步到本地文件并进行云端备份。")
      })]
    }), c.jsxs("div", {
      className: "sw-history-list",
      children: [!S.length && c.jsx("p", {
        className: "sw-history-empty",
        children: d ? x("没有匹配的剧本") : w.listTab === "cloud" ? x("暂无云端剧本") : x("还没有创作记录")
      }), S.map(C => c.jsxs("div", {
        className: `sw-history-item${C.id === t ? " is-active" : ""}`,
        children: [c.jsxs("button", {
          className: "sw-history-open",
          disabled: n || w.ossBusy,
          onClick: () => w.listTab === "local" ? a(C.id) : void A(async () => {
            await w.downloadFromCloud(C.id), a(C.id);
          }),
          children: [c.jsx(Hd, {
            size: 15
          }), c.jsxs("span", {
            children: [c.jsx("strong", {
              children: C.name
            }), c.jsxs("small", {
              children: [new Date(C.updatedAt).toLocaleDateString(ew(), {
                month: "short",
                day: "numeric"
              }), " · ", C.episodeCount, x(" 集"), w.isBackedUpOnOss(C.id) ? x(" · 已备份") : ""]
            })]
          })]
        }), c.jsx("button", {
          className: "sw-history-more",
          title: x("{0}的更多操作", C.name),
          "aria-label": x("{0}的更多操作", C.name),
          "aria-expanded": h === C.id,
          onClick: () => p(h === C.id ? null : C.id),
          children: c.jsx(hw, {
            size: 16
          })
        }), C.id === t && w.listTab === "local" && s.length > 0 && c.jsxs("details", {
          className: "sw-revisions",
          children: [c.jsxs("summary", {
            children: [s.length, x(" 条生成记录")]
          }), s.map(I => c.jsxs("button", {
            disabled: n,
            onClick: () => l(I),
            children: [c.jsx("span", {
              children: I.label
            }), c.jsx("small", {
              children: new Date(I.createdAt).toLocaleString(ew(), {
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })
            })]
          }, I.id))]
        }), h === C.id && c.jsx("div", {
          className: "sw-history-actions",
          children: w.listTab === "local" ? c.jsxs(c.Fragment, {
            children: [c.jsxs("button", {
              disabled: !w.ossAvailable || !y || w.ossBusy || n,
              onClick: () => void A(() => w.uploadToCloud(C.id)),
              children: [c.jsx(ml, {
                size: 12
              }), x("备份到云端")]
            }), c.jsx("button", {
              disabled: !y || n,
              onClick: () => {
                confirm(x("仅删除本地文件副本，保留创作历史？")) && A(() => fer(C.id));
              },
              children: x("删除文件副本")
            }), c.jsxs("button", {
              disabled: n,
              onClick: () => {
                confirm(x("删除剧本「{0}」及其本地历史？云端备份会保留。", C.name)) && i(C.id);
              },
              children: [c.jsx(Qo, {
                size: 12
              }), x("删除剧本")]
            })]
          }) : c.jsxs(c.Fragment, {
            children: [c.jsxs("button", {
              disabled: w.ossBusy || n,
              onClick: () => void A(() => w.downloadFromCloud(C.id)),
              children: [c.jsx(ws, {
                size: 12
              }), x("下载到本地")]
            }), c.jsxs("button", {
              disabled: w.ossBusy || n,
              onClick: () => {
                confirm(x("删除「{0}」的云端备份？", C.name)) && A(() => w.deleteFromOss(C.id));
              },
              children: [c.jsx(Qo, {
                size: 12
              }), x("删除云端备份")]
            })]
          })
        })]
      }, C.id))]
    }), (v || w.ossMessage) && c.jsxs("p", {
      className: "sw-history-message",
      role: "status",
      children: [v || w.ossMessage, w.ossBusy ? ` ${Math.round(w.ossProgress.percent)}%` : ""]
    }), c.jsxs("footer", {
      children: [x("剧本自动保存 · "), e.length, x(" 个创作")]
    })]
  });
}

function man({
  episode: e,
  busy: t,
  onUpdate: n,
  onStory: r,
  onScript: a
}) {
  const [i, o] = g.useState(e.content ? "content" : e.expandedScript ? "expandedScript" : "outline"),
    s = {
      outline: "本集梗概",
      content: "故事正文",
      expandedScript: "场次剧本"
    };
  return c.jsxs("div", {
    className: "sw-episode-editor",
    children: [c.jsx("div", {
      className: "sw-mode",
      "aria-label": x("本集创作阶段"),
      children: ["outline", "content", "expandedScript"].map(l => {
        var d;
        return c.jsxs("button", {
          "aria-pressed": i === l,
          onClick: () => o(l),
          children: [x(s[l]), ((d = e[l]) == null ? void 0 : d.trim()) && c.jsx("small", {
            children: " ✓"
          })]
        }, l);
      })
    }), c.jsx("textarea", {
      "aria-label": x(s[i]),
      value: e[i] || "",
      readOnly: t,
      placeholder: x(i === "outline" ? "写下本集的关键事件与结尾…" : i === "content" ? "可手动填写或从梗概扩写故事，梗概会单独保留…" : "粘贴已有场次剧本，或从故事转换…"),
      onChange: l => n(e.id, {
        [i]: l.target.value
      })
    }), c.jsxs("div", {
      className: "sw-episode-actions",
      children: [r && c.jsx("button", {
        className: "sw-secondary",
        disabled: t || !aj(e),
        onClick: () => {
          o("content"), r(e.id);
        },
        children: x("AI 扩写故事")
      }), c.jsx("button", {
        className: "sw-secondary",
        disabled: t || !aj(e),
        onClick: () => {
          o("expandedScript"), a(e.id);
        },
        children: x("转为场次剧本")
      }), c.jsx("small", {
        children: x("各阶段独立保存")
      })]
    })]
  });
}

const fan = [["shot_type", "景别"], ["scene", "场景"], ["drama_action", "动作"], ["dialogue", "台词"], ["camera", "运镜"], ["duration", "秒数"], ["visual_prompt", "画面提示词"], ["ratio", "画幅"]];

function KBa({
  episode: e,
  busy: t,
  style: n,
  onGenerate: r,
  onUpdate: a,
  onSend: i
}) {
  var p;
  const [o, s] = g.useState(8),
    [l, d] = g.useState(!0),
    u = e.shots || [],
    h = (m, f, y) => a(e.id, {
      shots: u.map((b, v) => v === m ? {
        ...b,
        [f]: y
      } : b)
    });
  return c.jsxs("section", {
    className: "sw-shot-table-section",
    "aria-label": x("本集分镜表"),
    children: [c.jsxs("div", {
      className: "sw-episode-actions",
      children: [c.jsxs("strong", {
        children: [x("分镜表"), " · ", u.length]
      }), c.jsxs("label", {
        children: [x("镜头数"), " ", c.jsx("input", {
          "aria-label": x("生成镜头数"),
          type: "number",
          min: 1,
          max: 60,
          value: o,
          disabled: t,
          onChange: m => s(Math.max(1, Math.min(60, Math.floor(Number(m.target.value)) || 1)))
        })]
      }), u.length > 0 && c.jsxs("label", {
        children: [c.jsx("input", {
          type: "checkbox",
          checked: l,
          disabled: t,
          onChange: m => d(m.target.checked)
        }), x("追加镜头")]
      }), c.jsx("button", {
        className: "sw-secondary",
        disabled: t || !((p = e.expandedScript) != null && p.trim() || aj(e)),
        onClick: () => r(e.id, o, l && u.length > 0, n),
        children: x(u.length && l ? "继续生成分镜" : "生成分镜表")
      }), u.length > 0 && i && c.jsx("button", {
        className: "sw-secondary",
        onClick: () => i(e),
        children: x("选择发送分镜")
      })]
    }), u.length > 0 ? c.jsx("div", {
      className: "sw-shot-table-scroll",
      children: c.jsxs("table", {
        children: [c.jsx("thead", {
          children: c.jsxs("tr", {
            children: [c.jsx("th", {
              children: x("镜号")
            }), fan.map(([m, f]) => c.jsx("th", {
              children: x(f)
            }, m)), c.jsx("th", {
              children: x("操作")
            })]
          })
        }), c.jsx("tbody", {
          children: u.map((m, f) => c.jsxs("tr", {
            children: [c.jsx("th", {
              children: m.shot_no
            }), fan.map(([y, b]) => c.jsx("td", {
              children: y === "duration" ? c.jsx("input", {
                "aria-label": x("镜头 {0} {1}", m.shot_no, b),
                type: "number",
                min: .1,
                step: .1,
                value: m.duration,
                disabled: t,
                onChange: v => h(f, y, Math.max(.1, Number(v.target.value) || .1))
              }) : c.jsx("textarea", {
                "aria-label": x("镜头 {0} {1}", m.shot_no, b),
                value: m[y],
                readOnly: t,
                onChange: v => h(f, y, v.target.value)
              })
            }, y)), c.jsx("td", {
              children: c.jsx("button", {
                "aria-label": x("删除镜头 {0}", m.shot_no),
                disabled: t,
                onClick: () => a(e.id, {
                  shots: u.filter((y, b) => b !== f).map((y, b) => ({
                    ...y,
                    shot_no: b + 1
                  }))
                }),
                children: x("删除")
              })
            })]
          }, m.shot_no))
        })]
      })
    }) : c.jsx("p", {
      children: x("从本集故事或场次剧本生成，动作、台词、运镜和画面提示词可分别编辑。")
    })]
  });
}

const QBa = ({
    isOpen: e,
    isDark: t,
    project: n,
    projectMetas: r,
    currentProjectId: a,
    selectedEpisodeId: i,
    isSplitting: o,
    isGeneratingEpisode: s,
    splitProgress: l,
    scriptModel: d,
    chatModels: u,
    onClose: h,
    onChooseOutputs: p,
    onOpenRevision: m,
    onSetOutline: f,
    onSetEpisodeCount: y,
    onSetProjectName: b,
    onImportTxt: v,
    onSmartSplit: _,
    onSmartSplitByDuration: w,
    onAddEpisode: k,
    onRemoveEpisode: A,
    onUpdateEpisode: S,
    onSelectEpisode: C,
    onGenerateEpisode: I,
    onGenerateStory: E,
    onGenerateShots: M,
    onSendShots: T,
    onMoveEpisode: P,
    onDirectEpisode: R,
    episodeTask: j,
    generationProgress: B,
    onCancelGeneration: F,
    onSetScriptModel: N,
    scriptEffort: G,
    onSetScriptEffort: z,
    scriptPlatformGroup: V,
    onSetScriptPlatformGroup: O,
    onSetScriptPromptCustom: L,
    onSetScriptSkillId: D,
    onNewProject: U,
    onSwitchProject: H,
    onDeleteProject: Y,
    onSendEpisodes: K,
    onExtract: W,
    onExtractManual: Q,
    isExtracting: q,
    extractProgress: ne,
    onSendItem: de,
    onGenerateSceneConcept: le,
    isGeneratingConcept: J,
    onSendScene: pe,
    onComposeStoryboards: ce,
    onSendShot: we,
    allStyles: X = [],
    customStyles: Z = [],
    onAddCustomStyle: re,
    onRemoveCustomStyle: fe,
    onUpdateCustomStyle: ye,
    onGenerateStyleWithAI: ie,
    isGeneratingStyle: ae,
    extractionModelId: be,
    onSetExtractionModelId: Ee,
    extractionSkillId: xe,
    onSetExtractionSkillId: he
  }) => {
    on();
    const [ue, ge] = g.useState(!0),
      [_e, ke] = g.useState("script"),
      [ve, Te] = g.useState("all"),
      Ne = n.episodes.filter(mt => !mt.segmentDetail),
      me = Ne.find(mt => mt.id === i) || Ne[0],
      Ae = o || !!s || !!q || !!J,
      Fe = g.useMemo(() => Cne(n), [n.episodes, n.outline]),
      Me = Object.values(n.extraction || {}).some(mt => mt.length > 0),
      Re = !!(n.extractionSourceFingerprint && n.extractionSourceFingerprint !== Fe.fingerprint),
      [$e, rt] = g.useState(null),
      [nt, ze] = g.useState(null),
      [Le, Ke] = g.useState(null),
      Xe = g.useRef(null),
      [De, Ye] = g.useState(null),
      [Ce, He] = g.useState(null),
      [Ve, it] = g.useState(n.extractionArtStyle || "auto");
    g.useEffect(() => {
      it(n.extractionArtStyle || "auto");
    }, [n.id]);
    const It = g.useRef(null);
    g.useEffect(() => {
      var mt, Xt;
      if (It.current && !s) {
        const Gn = It.current.id,
          rr = n.episodes.find(qn => qn.id === Gn);
        rr && !rr.segmentDetail && rr.expandedScript && It.current.task !== "story" && rr.expandedScript !== It.current.script && (ke("shots"), rt(Gn), C(Gn));
      }
      s ? ((mt = It.current) == null ? void 0 : mt.id) !== s && (It.current = {
        id: s,
        task: j,
        script: (Xt = n.episodes.find(Gn => Gn.id === s)) == null ? void 0 : Xt.expandedScript
      }) : It.current = null;
    }, [s, j, n.episodes, C]);
    const [Ft, We] = g.useState(!1),
      [Ze, Ge] = g.useState(!1),
      [Oe, st] = g.useState(""),
      [vt, Ht] = g.useState(null),
      [nn, pt] = g.useState(null),
      [lt, gt] = g.useState(""),
      [Ut, _t] = g.useState(""),
      [At, Yt] = g.useState(""),
      [qe, kt] = g.useState(""),
      [St, hn] = g.useState("auto"),
      [Qt, Ot] = g.useState(!1),
      [ln, Pn] = g.useState(!1),
      [rn, Yn] = g.useState(""),
      [Ct, Cn] = g.useState(null),
      [un, Jn] = g.useState(null),
      [Kn, en] = g.useState(""),
      [Vn, Tt] = g.useState(""),
      [Ue, et] = g.useState(""),
      [ft, ht] = g.useState(""),
      [wt, jt] = g.useState(null);
    g.useEffect(() => {
      e || (jt(null), We(!1), Ge(!1), Ot(!1), Pn(!1));
    }, [e]), g.useEffect(() => {
      jt(null), rt(null);
    }, [n.id]), g.useEffect(() => {
      if (!wt) return;
      const mt = Xt => {
        Xt.key === "Escape" && jt(null);
      };
      return document.addEventListener("keydown", mt), () => document.removeEventListener("keydown", mt);
    }, [wt]);
    const bt = g.useCallback((mt, Xt, Gn) => {
        const rr = n.episodes.find(Dn => Dn.id === mt);
        if (!(rr != null && rr.scenes)) return;
        const qn = rr.scenes.map(Dn => Dn.sceneNumber === Xt ? {
          ...Dn,
          ...Gn
        } : Dn);
        S(mt, {
          scenes: qn
        });
      }, [n.episodes, S]),
      Bt = [{
        key: "script",
        icon: c.jsx(Hd, {
          size: 14
        }),
        label: "剧本"
      }, {
        key: "settings",
        icon: c.jsx(IP, {
          size: 14
        }),
        label: "设定"
      }, {
        key: "shots",
        icon: c.jsx(Kh, {
          size: 14
        }),
        label: "镜头"
      }, {
        key: "boards",
        icon: c.jsx(Od, {
          size: 14
        }),
        label: "分镜图"
      }],
      wn = g.useCallback(mt => {
        Ke(mt), setTimeout(() => {
          var Xt;
          return (Xt = Xe.current) == null ? void 0 : Xt.focus();
        }, 50);
      }, []),
      at = g.useCallback((mt, Xt) => {
        Xt.trim() && S(mt, {
          title: Xt.trim()
        }), Ke(null);
      }, [S]),
      Pt = g.useCallback(mt => {
        var Gn, rr, qn, Dn, Ar;
        const Xt = [`Ep${mt.index} ${mt.title}`, ""];
        return mt.durationSeconds && Xt.push(`时长: ${mt.durationSeconds}秒`, ""), (Gn = mt.emotionKeywords) != null && Gn.length && Xt.push(`情绪关键词: ${mt.emotionKeywords.join(" / ")}`, ""), mt.segmentDetail && (Xt.push("1. 主题", mt.segmentDetail.subject || "（无）", "", "2. 环境", mt.segmentDetail.setting || "（无）", "", "3. 动作与时间线"), (rr = mt.segmentDetail.timeline) != null && rr.length ? mt.segmentDetail.timeline.forEach(_r => Xt.push(`${_r.timeRange} ${_r.description}`)) : Xt.push("（无）"), Xt.push("", "4. 镜头", mt.segmentDetail.camera || "（无）", "", "5. 影像风格", mt.segmentDetail.visualStyle || "（无）", "", "6. 声音", mt.segmentDetail.audio || "（无）", "", "7. 衔接", mt.segmentDetail.transition || "（无）", "", "8. 旁白", mt.segmentDetail.narration || "（无）", "")), mt.hookSummary && Xt.push("钩子", mt.hookSummary, ""), (qn = mt.outline) != null && qn.trim() && Xt.push("本集梗概", mt.outline.trim(), ""), (Dn = mt.content) != null && Dn.trim() && Xt.push("正文", mt.content.trim()), (Ar = mt.expandedScript) != null && Ar.trim() && Xt.push("场次剧本", mt.expandedScript.trim()), Xt.join(`
`).trim();
      }, []),
      dt = g.useCallback(async mt => {
        var Gn;
        const Xt = Pt(mt);
        try {
          if ((Gn = navigator == null ? void 0 : navigator.clipboard) != null && Gn.writeText) await navigator.clipboard.writeText(Xt);else {
            const rr = document.createElement("textarea");
            rr.value = Xt, rr.setAttribute("readonly", "true"), rr.style.position = "absolute", rr.style.left = "-9999px", document.body.appendChild(rr), rr.select(), document.execCommand("copy"), document.body.removeChild(rr);
          }
          ze(mt.id), setTimeout(() => {
            ze(rr => rr === mt.id ? null : rr);
          }, 1500);
        } catch {}
      }, [Pt]),
      xt = (mt, Xt, Gn) => {
        var rr;
        return c.jsxs("div", {
          className: `sw-episode-card rounded-xl border transition-all ${i === mt.id ? t ? "border-amber-500/50 bg-amber-500/5" : "border-amber-400 bg-amber-50" : t ? "border-zinc-800 hover:border-zinc-700 bg-zinc-900/50" : "border-zinc-200 hover:border-zinc-300 bg-white"}`,
          children: [c.jsxs("div", {
            className: "flex items-center gap-1.5 px-2.5 py-2 cursor-pointer",
            onClick: () => C(i === mt.id ? null : mt.id),
            children: [c.jsx("button", {
              onClick: qn => {
                qn.stopPropagation(), rt(Xt ? null : mt.id);
              },
              className: `shrink-0 transition-transform ${Xt ? "rotate-0" : "-rotate-90"} ${t ? "text-zinc-500" : "text-zinc-400"}`,
              children: c.jsx(Mi, {
                size: 13
              })
            }), c.jsx("div", {
              className: "flex-1 min-w-0",
              children: Le === mt.id ? c.jsx("input", {
                ref: Xe,
                defaultValue: mt.title,
                onBlur: qn => at(mt.id, qn.target.value),
                onKeyDown: qn => {
                  qn.key === "Enter" && qn.target.blur();
                },
                onClick: qn => qn.stopPropagation(),
                className: `w-full text-xs font-medium px-1 py-0 rounded outline-none ${t ? "bg-zinc-800 text-zinc-200 border border-amber-500/50" : "bg-zinc-50 text-zinc-800 border border-amber-400"}`
              }) : c.jsxs("span", {
                className: `text-xs font-medium truncate block ${t ? "text-zinc-200" : "text-zinc-800"}`,
                onDoubleClick: qn => {
                  qn.stopPropagation(), wn(mt.id);
                },
                children: [c.jsxs("span", {
                  className: `${mt.segmentDetail ? t ? "text-violet-400" : "text-violet-600" : t ? "text-amber-400" : "text-amber-600"} font-bold mr-1`,
                  children: ["Ep", mt.index]
                }), "[", mt.title, "]", mt.durationSeconds && c.jsxs("span", {
                  className: `ml-1 text-[9px] ${t ? "text-zinc-500" : "text-zinc-400"}`,
                  children: [mt.durationSeconds, "s"]
                })]
              })
            }), c.jsxs("div", {
              className: "flex items-center gap-0.5 shrink-0",
              children: [P && [-1, 1].map(qn => {
                var Dn, Ar;
                return c.jsx("button", {
                  "aria-label": x(qn < 0 ? "上移 {0}" : "下移 {0}", mt.title),
                  title: x(qn < 0 ? "上移" : "下移"),
                  disabled: Ae || (qn < 0 ? ((Dn = n.episodes.filter(_r => !!_r.segmentDetail == !!mt.segmentDetail)[0]) == null ? void 0 : Dn.id) === mt.id : ((Ar = n.episodes.filter(_r => !!_r.segmentDetail == !!mt.segmentDetail).slice(-1)[0]) == null ? void 0 : Ar.id) === mt.id),
                  onClick: _r => {
                    _r.stopPropagation(), P(mt.id, qn);
                  },
                  children: qn < 0 ? c.jsx(Gc, {
                    size: 12
                  }) : c.jsx($ue, {
                    size: 12
                  })
                }, qn);
              }), c.jsx("button", {
                title: x("发送本集"),
                "aria-label": x("发送 {0}", mt.title),
                onClick: qn => {
                  qn.stopPropagation(), K == null || K([mt]);
                },
                children: c.jsx(zu, {
                  size: 14
                })
              }), c.jsx("button", {
                onClick: qn => {
                  qn.stopPropagation(), jt({
                    type: "script",
                    episodeId: mt.id
                  });
                },
                className: `p-1 rounded transition-colors ${t ? "text-zinc-500 hover:text-violet-400 hover:bg-violet-400/10" : "text-zinc-400 hover:text-violet-600 hover:bg-violet-50"}`,
                title: x("展开编辑"),
                children: c.jsx(Wm, {
                  size: 12
                })
              }), c.jsx("button", {
                onClick: qn => {
                  qn.stopPropagation(), Gn ? F() : I(mt.id);
                },
                className: `p-1 rounded transition-colors ${Gn ? "text-red-400 hover:bg-red-500/10" : t ? "text-zinc-500 hover:text-amber-400 hover:bg-amber-400/10" : "text-zinc-400 hover:text-amber-600 hover:bg-amber-50"}`,
                title: x(Gn ? "停止生成" : "生成完整剧本"),
                disabled: Ae && !Gn,
                children: Gn ? c.jsx(Ua, {
                  size: 12,
                  className: "animate-spin"
                }) : c.jsx(Ol, {
                  size: 12
                })
              }), c.jsx("button", {
                onClick: qn => {
                  qn.stopPropagation(), A(mt.id);
                },
                className: `p-1 rounded transition-colors ${t ? "text-zinc-600 hover:text-red-400 hover:bg-red-400/10" : "text-zinc-300 hover:text-red-500 hover:bg-red-50"}`,
                title: x("删除此集"),
                disabled: Ae,
                children: c.jsx(Na, {
                  size: 12
                })
              })]
            })]
          }), !Xt && c.jsx("button", {
            className: "sw-episode-summary",
            onClick: () => {
              C(mt.id), rt(mt.id);
            },
            children: mt.expandedScript || ((rr = mt.segmentDetail) == null ? void 0 : rr.subject) || mt.content || mt.outline || x("点击编辑本集内容")
          }), Xt && c.jsxs("div", {
            className: `px-2.5 pb-2.5 border-t select-text ${t ? "border-zinc-800" : "border-zinc-100"}`,
            children: [c.jsx("div", {
              className: "flex items-center justify-end mt-2",
              children: c.jsxs("button", {
                onClick: qn => {
                  qn.stopPropagation(), dt(mt);
                },
                className: `px-1.5 py-0.5 rounded text-[9px] transition-colors flex items-center gap-1 ${t ? "text-zinc-300 bg-zinc-800 hover:bg-zinc-700" : "text-zinc-600 bg-zinc-100 hover:bg-zinc-200"}`,
                title: x("复制当前片段文本"),
                children: [nt === mt.id ? c.jsx(io, {
                  size: 10
                }) : c.jsx(Cx, {
                  size: 10
                }), nt === mt.id ? x("已复制") : x("复制文本")]
              })
            }), mt.emotionKeywords && mt.emotionKeywords.length > 0 && c.jsx("div", {
              className: "flex flex-wrap gap-1 mt-2 mb-1.5",
              children: mt.emotionKeywords.map((qn, Dn) => c.jsx("span", {
                className: `text-[9px] px-1.5 py-0.5 rounded-full ${t ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-amber-50 text-amber-700 border border-amber-200"}`,
                children: qn
              }, Dn))
            }), mt.segmentDetail ? c.jsxs("div", {
              className: "mt-2 space-y-1.5",
              children: [mt.segmentDetail.subject && c.jsxs("div", {
                className: "text-[10px]",
                children: [c.jsx("span", {
                  className: `font-bold ${t ? "text-violet-400" : "text-violet-600"}`,
                  children: x("1. 主题")
                }), c.jsx("div", {
                  className: `mt-0.5 cursor-text ${t ? "text-zinc-400" : "text-zinc-600"}`,
                  children: mt.segmentDetail.subject
                })]
              }), mt.segmentDetail.setting && c.jsxs("div", {
                className: "text-[10px]",
                children: [c.jsx("span", {
                  className: `font-bold ${t ? "text-violet-400" : "text-violet-600"}`,
                  children: x("2. 环境")
                }), c.jsx("div", {
                  className: `mt-0.5 cursor-text ${t ? "text-zinc-400" : "text-zinc-600"}`,
                  children: mt.segmentDetail.setting
                })]
              }), mt.segmentDetail.timeline && mt.segmentDetail.timeline.length > 0 && c.jsxs("div", {
                className: "text-[10px]",
                children: [c.jsx("span", {
                  className: `font-bold ${t ? "text-violet-400" : "text-violet-600"}`,
                  children: x("3. 动作与时间线")
                }), c.jsx("div", {
                  className: "mt-1 space-y-1",
                  children: mt.segmentDetail.timeline.map((qn, Dn) => c.jsxs("div", {
                    className: `flex gap-1.5 p-1.5 rounded-lg ${t ? "bg-zinc-800/60" : "bg-zinc-50"}`,
                    children: [c.jsx("span", {
                      className: `shrink-0 font-mono text-[9px] font-bold px-1 py-0.5 rounded ${t ? "bg-violet-500/20 text-violet-300" : "bg-violet-100 text-violet-700"}`,
                      children: qn.timeRange
                    }), c.jsx("span", {
                      className: `cursor-text ${t ? "text-zinc-400" : "text-zinc-600"}`,
                      children: qn.description
                    })]
                  }, Dn))
                })]
              }), mt.segmentDetail.camera && c.jsxs("div", {
                className: "text-[10px]",
                children: [c.jsx("span", {
                  className: `font-bold ${t ? "text-violet-400" : "text-violet-600"}`,
                  children: x("4. 镜头")
                }), c.jsx("div", {
                  className: `mt-0.5 cursor-text ${t ? "text-zinc-400" : "text-zinc-600"}`,
                  children: mt.segmentDetail.camera
                })]
              }), mt.segmentDetail.visualStyle && c.jsxs("div", {
                className: "text-[10px]",
                children: [c.jsx("span", {
                  className: `font-bold ${t ? "text-violet-400" : "text-violet-600"}`,
                  children: x("5. 影像风格")
                }), c.jsx("div", {
                  className: `mt-0.5 cursor-text ${t ? "text-zinc-400" : "text-zinc-600"}`,
                  children: mt.segmentDetail.visualStyle
                })]
              }), mt.segmentDetail.audio && c.jsxs("div", {
                className: "text-[10px]",
                children: [c.jsx("span", {
                  className: `font-bold ${t ? "text-violet-400" : "text-violet-600"}`,
                  children: x("6. 声音")
                }), c.jsx("div", {
                  className: `mt-0.5 cursor-text ${t ? "text-zinc-400" : "text-zinc-600"}`,
                  children: mt.segmentDetail.audio
                })]
              }), mt.segmentDetail.transition && c.jsxs("div", {
                className: "text-[10px]",
                children: [c.jsx("span", {
                  className: `font-bold ${t ? "text-violet-400" : "text-violet-600"}`,
                  children: x("7. 衔接")
                }), c.jsx("div", {
                  className: `mt-0.5 cursor-text ${t ? "text-zinc-400" : "text-zinc-600"}`,
                  children: mt.segmentDetail.transition
                })]
              }), mt.segmentDetail.narration && c.jsxs("div", {
                className: "text-[10px]",
                children: [c.jsx("span", {
                  className: `font-bold ${t ? "text-violet-400" : "text-violet-600"}`,
                  children: x("8. 旁白")
                }), c.jsxs("div", {
                  className: `mt-0.5 italic cursor-text ${t ? "text-zinc-400" : "text-zinc-600"}`,
                  children: ['"', mt.segmentDetail.narration, '"']
                })]
              })]
            }) : c.jsx(c.Fragment, {
              children: mt.hookSummary && c.jsxs("div", {
                className: `text-[10px] mt-1.5 p-1.5 rounded-lg ${t ? "bg-zinc-800/50 text-zinc-400" : "bg-zinc-50 text-zinc-500"}`,
                children: [c.jsx("span", {
                  className: "mr-1",
                  children: "🪝"
                }), mt.hookSummary]
              })
            }), mt.segmentDetail ? c.jsx("textarea", {
              value: mt.content,
              readOnly: Ae,
              onChange: qn => S(mt.id, {
                content: qn.target.value
              }),
              placeholder: mt.segmentDetail ? x("8 要素结构已生成，也可在此编辑原始内容...") : x("点击 ▶ 按钮 AI 生成完整剧本，或手动输入..."),
              className: `w-full mt-2 text-[10px] leading-relaxed p-2 rounded-lg resize-none h-32 outline-none custom-scrollbar transition-colors ${t ? "bg-zinc-900 border border-zinc-700 text-zinc-300 placeholder-zinc-600 focus:border-amber-500/30" : "bg-zinc-50 border border-zinc-200 text-zinc-700 placeholder-zinc-400 focus:border-amber-400"}`
            }) : c.jsx(man, {
              episode: mt,
              busy: Ae,
              onUpdate: S,
              onStory: E,
              onScript: I
            }, mt.id)]
          })]
        }, mt.id);
      },
      yn = mt => {
        var Xt;
        return (Xt = mt.sources) != null && Xt.length ? c.jsxs("details", {
          className: "sw-setting-sources",
          onClick: Gn => Gn.stopPropagation(),
          children: [c.jsxs("summary", {
            children: [x("关联原文"), " · ", mt.sources.length]
          }), mt.sources.map((Gn, rr) => {
            const qn = Fe.sources.find(Ar => Ar.id === Gn.sourceId),
              Dn = qn == null ? void 0 : qn.text.includes(Gn.quote);
            return c.jsxs("div", {
              children: [c.jsx("small", {
                children: Dn ? qn == null ? void 0 : qn.label : x("原文已变化，请更新设定")
              }), c.jsx("blockquote", {
                children: Gn.quote
              }), Dn && (qn == null ? void 0 : qn.episodeId) && c.jsx("button", {
                className: "sw-secondary",
                onClick: () => {
                  C(qn.episodeId), jt({
                    type: "script",
                    episodeId: qn.episodeId
                  });
                },
                children: x("查看本集")
              })]
            }, `${Gn.sourceId}:${rr}`);
          })]
        }) : c.jsx("small", {
          className: "sw-setting-source-note",
          children: x("点击「更新设定」补充剧本出处")
        });
      },
      gn = c.jsxs(c.Fragment, {
        children: [c.jsxs("div", {
          className: "sw-tabs",
          role: "tablist",
          "aria-label": x("剧本内容"),
          children: [Bt.map((mt, Xt) => c.jsxs("button", {
            role: "tab",
            "aria-label": mt.label,
            "aria-selected": _e === mt.key,
            onClick: () => ke(mt.key),
            children: [c.jsxs("span", {
              className: "sw-step-number",
              children: ["0", Xt + 1]
            }), mt.icon, mt.label, c.jsx("small", {
              children: mt.key === "script" ? x("{0} 集", n.episodes.length) : mt.key === "settings" ? x("{0} 项", Object.values(n.extraction || {}).reduce((Gn, rr) => Gn + rr.length, 0)) : x("{0} 场", n.episodes.reduce((Gn, rr) => {
                var qn;
                return Gn + (((qn = rr.scenes) == null ? void 0 : qn.length) || 0);
              }, 0))
            })]
          }, mt.key)), c.jsx("span", {
            className: "sw-spacer"
          }), c.jsxs("button", {
            className: "sw-send-all",
            disabled: !n.episodes.length && !n.extraction,
            onClick: p,
            children: [c.jsx(zu, {
              size: 14
            }), x("选择内容发送")]
          })]
        }), _e === "script" && c.jsx("div", {
          className: "flex-1 flex flex-col overflow-hidden",
          children: c.jsx("div", {
            className: "sw-results-scroll custom-scrollbar",
            children: n.episodes.length === 0 ? c.jsxs("div", {
              className: "sw-empty",
              children: [c.jsx(dZ, {
                size: 34,
                strokeWidth: 1.2
              }), c.jsx("h2", {
                children: x("让一个想法，长成一个故事")
              }), c.jsx("p", {
                children: x("输入大纲，拆成剧集或按时长组织镜头。")
              }), c.jsxs("div", {
                children: [c.jsx("span", {
                  children: x("01 故事与剧本")
                }), c.jsx("span", {
                  children: x("02 角色与场景")
                }), c.jsx("span", {
                  children: x("03 镜头与分场")
                })]
              })]
            }) : c.jsxs(c.Fragment, {
              children: [(() => {
                const mt = n.episodes.filter(Xt => Xt.segmentDetail);
                return mt.length === 0 ? null : c.jsx(c.Fragment, {
                  children: c.jsxs("div", {
                    className: `px-3 py-2 flex items-center justify-between ${t ? "text-zinc-500" : "text-zinc-400"}`,
                    children: [c.jsxs("div", {
                      className: "flex items-center gap-1.5",
                      children: [c.jsx(AP, {
                        size: 10,
                        className: t ? "text-violet-400" : "text-violet-500"
                      }), c.jsxs("span", {
                        className: `text-[10px] font-medium ${t ? "text-violet-400" : "text-violet-600"}`,
                        children: [x("时长片段列表 ("), mt.length, ")"]
                      })]
                    }), K && c.jsxs("button", {
                      onClick: () => K(mt),
                      className: `flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded transition-colors ${t ? "text-violet-400 hover:bg-violet-400/10" : "text-violet-600 hover:bg-violet-50"}`,
                      title: x("选择时长片段并发送"),
                      children: [c.jsx(Od, {
                        size: 10
                      }), x("选择发送")]
                    })]
                  })
                });
              })(), (() => {
                const mt = n.episodes.filter(Xt => Xt.segmentDetail);
                return mt.length === 0 ? null : c.jsx("div", {
                  className: "sw-episode-grid",
                  children: mt.map(Xt => {
                    const Gn = $e === Xt.id || i === Xt.id,
                      rr = s === Xt.id;
                    return xt(Xt, Gn, rr);
                  })
                });
              })(), (() => {
                const mt = n.episodes.filter(Xt => !Xt.segmentDetail);
                return mt.length === 0 ? null : c.jsx(c.Fragment, {
                  children: c.jsxs("div", {
                    className: `px-3 py-2 flex items-center justify-between ${t ? "text-zinc-500" : "text-zinc-400"}`,
                    children: [c.jsxs("div", {
                      className: "flex items-center gap-1.5",
                      children: [c.jsx(ac, {
                        size: 10,
                        className: t ? "text-amber-400" : "text-amber-500"
                      }), c.jsxs("span", {
                        className: `text-[10px] font-medium ${t ? "text-amber-400" : "text-amber-600"}`,
                        children: [x("长剧分集列表 ("), mt.length, ")"]
                      })]
                    }), K && c.jsxs("button", {
                      onClick: () => K(mt),
                      className: `flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded transition-colors ${t ? "text-amber-400 hover:bg-amber-400/10" : "text-amber-600 hover:bg-amber-50"}`,
                      title: x("选择长剧分集并发送"),
                      children: [c.jsx(Od, {
                        size: 10
                      }), x("选择发送")]
                    })]
                  })
                });
              })(), (() => {
                const mt = n.episodes.filter(Xt => !Xt.segmentDetail);
                return mt.length === 0 ? null : c.jsx("div", {
                  className: "sw-episode-grid",
                  children: mt.map(Xt => {
                    const Gn = $e === Xt.id || i === Xt.id,
                      rr = s === Xt.id;
                    return xt(Xt, Gn, rr);
                  })
                });
              })(), n.episodes.every(mt => mt.segmentDetail) && c.jsxs("div", {
                className: `px-3 py-2 flex items-center gap-1.5 ${t ? "text-zinc-600" : "text-zinc-400"}`,
                children: [c.jsx(ac, {
                  size: 10
                }), c.jsx("span", {
                  className: "text-[10px]",
                  children: x("长剧分集列表（空）")
                })]
              }), n.episodes.every(mt => !mt.segmentDetail) && c.jsxs("div", {
                className: `px-3 py-2 flex items-center gap-1.5 ${t ? "text-zinc-600" : "text-zinc-400"}`,
                children: [c.jsx(AP, {
                  size: 10
                }), c.jsx("span", {
                  className: "text-[10px]",
                  children: x("时长片段列表（空）")
                })]
              })]
            })
          })
        }), _e === "shots" && (() => {
          var Xt;
          const mt = me && (me.expandedScript || (Xt = me.scenes) != null && Xt.length) ? [me] : [];
          return c.jsxs("div", {
            className: "sw-detail-pane",
            children: [Qt && Kpe.createPortal(c.jsx("div", {
              className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black/45",
              onClick: () => {
                Ot(!1), Cn(null), Yn("");
              },
              children: c.jsxs("div", {
                className: `w-[360px] max-h-[420px] rounded-2xl border shadow-2xl flex flex-col ${t ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200"}`,
                onClick: Gn => Gn.stopPropagation(),
                children: [c.jsxs("div", {
                  className: `px-5 py-4 border-b flex items-center gap-2 ${t ? "border-zinc-800" : "border-zinc-100"}`,
                  children: [c.jsx(ac, {
                    size: 16,
                    className: "text-violet-500"
                  }), c.jsx("span", {
                    className: `text-sm font-bold ${t ? "text-zinc-200" : "text-zinc-800"}`,
                    children: x("AI 概念图风格助手")
                  }), c.jsx("div", {
                    className: "flex-1"
                  }), c.jsx("button", {
                    onClick: () => {
                      Ot(!1), Cn(null), Yn("");
                    },
                    className: `p-1 rounded-lg ${t ? "hover:bg-zinc-800 text-zinc-500" : "hover:bg-zinc-100 text-zinc-400"}`,
                    children: c.jsx(Na, {
                      size: 14
                    })
                  })]
                }), c.jsxs("div", {
                  className: "flex-1 p-5 space-y-3 overflow-y-auto minimal-scrollbar",
                  children: [c.jsx("p", {
                    className: `text-[11px] leading-relaxed ${t ? "text-zinc-400" : "text-zinc-500"}`,
                    children: x("描述你想要的概念图风格，AI 会帮你生成对应的提示词标签。")
                  }), c.jsx("textarea", {
                    value: rn,
                    onChange: Gn => Yn(Gn.target.value),
                    placeholder: x("例如：宫崎骏水彩风、赛博朋克霓虹灯风..."),
                    rows: 3,
                    className: `w-full text-xs rounded-lg border p-3 resize-none outline-none transition-all ${t ? "bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-600 focus:border-violet-500" : "bg-zinc-50 border-zinc-200 text-zinc-700 placeholder:text-zinc-400 focus:border-violet-500"}`
                  }), c.jsx("button", {
                    onClick: async () => {
                      if (!rn.trim() || !ie) return;
                      const Gn = await ie(rn);
                      Gn && Cn(Gn);
                    },
                    disabled: ae || !rn.trim(),
                    className: `w-full h-8 flex items-center justify-center gap-1.5 text-xs font-medium rounded-lg transition-all ${ae || !rn.trim() ? t ? "bg-zinc-800 text-zinc-600" : "bg-zinc-100 text-zinc-400" : t ? "bg-violet-600 hover:bg-violet-500 text-white" : "bg-violet-500 hover:bg-violet-600 text-white"}`,
                    children: ae ? c.jsxs(c.Fragment, {
                      children: [c.jsx(Ua, {
                        size: 12,
                        className: "animate-spin"
                      }), x(" 生成中...")]
                    }) : c.jsxs(c.Fragment, {
                      children: [c.jsx(ac, {
                        size: 12
                      }), x(" 生成风格")]
                    })
                  }), Ct && c.jsxs("div", {
                    className: `p-3 rounded-lg border space-y-2 ${t ? "bg-zinc-800/50 border-violet-500/30" : "bg-violet-50 border-violet-200"}`,
                    children: [c.jsx("div", {
                      className: "flex items-center gap-2",
                      children: c.jsx("span", {
                        className: `text-xs font-bold px-2 py-0.5 rounded ${t ? "bg-violet-500/20 text-violet-400" : "bg-violet-100 text-violet-700"}`,
                        children: Ct.label
                      })
                    }), c.jsx("p", {
                      className: `text-[10px] leading-relaxed break-all ${t ? "text-zinc-400" : "text-zinc-600"}`,
                      children: Ct.prompt
                    }), c.jsxs("button", {
                      onClick: () => {
                        if (re && Ct) {
                          const Gn = re(Ct.label, Ct.prompt);
                          hn(Gn.id), Ot(!1), Cn(null), Yn("");
                        }
                      },
                      className: `w-full h-7 flex items-center justify-center gap-1.5 text-[10px] font-medium rounded-lg transition-all ${t ? "bg-green-600 hover:bg-green-500 text-white" : "bg-green-500 hover:bg-green-600 text-white"}`,
                      children: [c.jsx(eo, {
                        size: 11
                      }), x(" 添加到我的风格")]
                    })]
                  })]
                })]
              })
            }), document.body), ln && Kpe.createPortal(c.jsx("div", {
              className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black/45",
              onClick: () => {
                Pn(!1), Jn(null), et(""), ht("");
              },
              children: c.jsxs("div", {
                className: `w-[400px] max-h-[560px] rounded-2xl border shadow-2xl flex flex-col ${t ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200"}`,
                onClick: Gn => Gn.stopPropagation(),
                children: [c.jsxs("div", {
                  className: `px-5 py-4 border-b flex items-center gap-2 ${t ? "border-zinc-800" : "border-zinc-100"}`,
                  children: [c.jsx(tw, {
                    size: 16,
                    className: "text-violet-500"
                  }), c.jsx("span", {
                    className: `text-sm font-bold ${t ? "text-zinc-200" : "text-zinc-800"}`,
                    children: x("管理概念图风格标签")
                  }), c.jsx("div", {
                    className: "flex-1"
                  }), c.jsx("button", {
                    onClick: () => {
                      Pn(!1), Jn(null);
                    },
                    className: `p-1 rounded-lg ${t ? "hover:bg-zinc-800 text-zinc-500" : "hover:bg-zinc-100 text-zinc-400"}`,
                    children: c.jsx(Na, {
                      size: 14
                    })
                  })]
                }), c.jsx("div", {
                  className: `mx-5 mt-3 px-3 py-2 rounded-lg text-[10px] leading-relaxed ${t ? "bg-violet-500/10 text-violet-400 border border-violet-500/20" : "bg-violet-50 text-violet-600 border border-violet-200"}`,
                  children: x("您可以自定义概念图风格标签。内置风格不可编辑，自定义风格可编辑和删除。")
                }), c.jsxs("div", {
                  className: "flex-1 overflow-y-auto px-5 py-3 space-y-2 minimal-scrollbar",
                  children: [Rze.map(Gn => c.jsxs("div", {
                    className: `p-3 rounded-xl border ${t ? "bg-zinc-800/40 border-zinc-800" : "bg-zinc-50 border-zinc-200"}`,
                    children: [c.jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [c.jsx("span", {
                        className: `text-[11px] font-medium px-2 py-0.5 rounded ${t ? "bg-zinc-700 text-zinc-300" : "bg-zinc-200 text-zinc-700"}`,
                        children: Gn.label
                      }), c.jsx("span", {
                        className: `text-[9px] ${t ? "text-zinc-600" : "text-zinc-400"}`,
                        children: x("内置")
                      })]
                    }), c.jsx("p", {
                      className: "mt-1.5 text-[10px] leading-relaxed text-zinc-500",
                      children: Gn.prompt
                    })]
                  }, Gn.id)), Z.map(Gn => c.jsx("div", {
                    className: `p-3 rounded-xl border ${t ? "bg-zinc-800/60 border-violet-500/20" : "bg-violet-50/50 border-violet-200"}`,
                    children: un === Gn.id ? c.jsxs("div", {
                      className: "space-y-2",
                      children: [c.jsxs("div", {
                        children: [c.jsx("label", {
                          className: `text-[9px] mb-0.5 block ${t ? "text-zinc-500" : "text-zinc-400"}`,
                          children: x("标签名称")
                        }), c.jsx("input", {
                          value: Kn,
                          onChange: rr => en(rr.target.value),
                          className: `w-full h-7 px-2 text-[11px] rounded-lg border outline-none ${t ? "bg-zinc-900 border-zinc-700 text-zinc-300" : "bg-white border-zinc-200 text-zinc-700"}`
                        })]
                      }), c.jsxs("div", {
                        children: [c.jsx("label", {
                          className: `text-[9px] mb-0.5 block ${t ? "text-zinc-500" : "text-zinc-400"}`,
                          children: x("注入的提示词内容")
                        }), c.jsx("textarea", {
                          value: Vn,
                          onChange: rr => Tt(rr.target.value),
                          rows: 2,
                          className: `w-full text-[10px] rounded-lg border p-2 resize-none outline-none minimal-scrollbar ${t ? "bg-zinc-900 border-zinc-700 text-zinc-300" : "bg-white border-zinc-200 text-zinc-700"}`
                        })]
                      }), c.jsxs("div", {
                        className: "flex gap-1.5 justify-end",
                        children: [c.jsx("button", {
                          onClick: () => Jn(null),
                          className: `px-2.5 py-1 text-[10px] rounded-lg ${t ? "text-zinc-400 hover:bg-zinc-800" : "text-zinc-500 hover:bg-zinc-100"}`,
                          children: x("取消")
                        }), c.jsxs("button", {
                          onClick: () => {
                            Kn.trim() && Vn.trim() && (ye == null || ye(Gn.id, Kn, Vn), Jn(null));
                          },
                          className: `px-2.5 py-1 text-[10px] rounded-lg font-medium ${t ? "bg-violet-600 text-white" : "bg-violet-500 text-white"}`,
                          children: [c.jsx(io, {
                            size: 10,
                            className: "inline mr-0.5"
                          }), x(" 保存")]
                        })]
                      })]
                    }) : c.jsxs(c.Fragment, {
                      children: [c.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [c.jsx("span", {
                          className: `text-[11px] font-medium px-2 py-0.5 rounded ${t ? "bg-violet-500/20 text-violet-400" : "bg-violet-100 text-violet-700"}`,
                          children: Gn.label
                        }), c.jsx("div", {
                          className: "flex-1"
                        }), c.jsx("button", {
                          onClick: () => {
                            Jn(Gn.id), en(Gn.label), Tt(Gn.prompt);
                          },
                          className: `p-1 rounded ${t ? "text-zinc-600 hover:text-zinc-300 hover:bg-zinc-700" : "text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200"}`,
                          title: x("编辑"),
                          children: c.jsx(nw, {
                            size: 11
                          })
                        }), c.jsx("button", {
                          onClick: () => fe == null ? void 0 : fe(Gn.id),
                          className: `p-1 rounded ${t ? "text-zinc-600 hover:text-red-400 hover:bg-red-500/10" : "text-zinc-400 hover:text-red-500 hover:bg-red-50"}`,
                          title: x("删除"),
                          children: c.jsx(Qo, {
                            size: 11
                          })
                        })]
                      }), c.jsx("p", {
                        className: "mt-1.5 text-[10px] leading-relaxed text-zinc-500",
                        children: Gn.prompt
                      })]
                    })
                  }, Gn.id)), c.jsxs("div", {
                    className: `p-3 rounded-xl border-2 border-dashed space-y-2 ${t ? "border-zinc-700" : "border-zinc-300"}`,
                    children: [c.jsx("span", {
                      className: `text-[10px] font-medium ${t ? "text-zinc-400" : "text-zinc-500"}`,
                      children: x("+ 新增自定义风格")
                    }), c.jsx("input", {
                      value: Ue,
                      onChange: Gn => et(Gn.target.value),
                      placeholder: x("风格名称（中文）"),
                      className: `w-full h-7 px-2 text-[11px] rounded-lg border outline-none ${t ? "bg-zinc-800 border-zinc-700 text-zinc-300 placeholder:text-zinc-600" : "bg-white border-zinc-200 text-zinc-700 placeholder:text-zinc-400"}`
                    }), c.jsx("textarea", {
                      value: ft,
                      onChange: Gn => ht(Gn.target.value),
                      placeholder: x("英文风格提示词"),
                      rows: 2,
                      className: `w-full text-[10px] rounded-lg border p-2 resize-none outline-none ${t ? "bg-zinc-800 border-zinc-700 text-zinc-300 placeholder:text-zinc-600" : "bg-white border-zinc-200 text-zinc-700 placeholder:text-zinc-400"}`
                    }), c.jsxs("button", {
                      onClick: () => {
                        re && Ue.trim() && ft.trim() && (re(Ue, ft), et(""), ht(""));
                      },
                      disabled: !Ue.trim() || !ft.trim(),
                      className: `w-full h-7 flex items-center justify-center gap-1.5 text-[10px] font-medium rounded-lg transition-all ${!Ue.trim() || !ft.trim() ? t ? "bg-zinc-800 text-zinc-600" : "bg-zinc-100 text-zinc-400" : t ? "bg-violet-600 hover:bg-violet-500 text-white" : "bg-violet-500 hover:bg-violet-600 text-white"}`,
                      children: [c.jsx(eo, {
                        size: 10
                      }), x(" 添加自定义风格")]
                    })]
                  })]
                })]
              })
            }), document.body), c.jsxs("div", {
              className: "sw-detail-results flex-1 overflow-y-auto custom-scrollbar",
              children: [me && M && c.jsx(KBa, {
                episode: me,
                busy: Ae,
                style: St,
                onGenerate: M,
                onUpdate: S,
                onSend: T
              }, me.id), mt.length > 0 ? c.jsx("div", {
                className: "p-2 space-y-2",
                children: mt.map(Gn => {
                  var qn;
                  const rr = ((qn = Gn.scenes) == null ? void 0 : qn.length) || 0;
                  return c.jsxs("div", {
                    children: [c.jsxs("div", {
                      className: "sw-results-heading",
                      children: [c.jsxs("div", {
                        children: [c.jsxs("h2", {
                          children: [c.jsxs("span", {
                            className: "sw-episode-number",
                            children: ["EP ", String(Gn.index).padStart(2, "0")]
                          }), " ", Gn.title]
                        }), c.jsxs("p", {
                          children: [rr, x(" 个场次 · 展开查看画面描述，生成并审阅概念图提示词。")]
                        })]
                      }), c.jsxs("div", {
                        className: "flex gap-2",
                        children: [c.jsx("button", {
                          className: "sw-secondary",
                          onClick: () => ce == null ? void 0 : ce(Gn),
                          children: x("组合本集分镜")
                        }), c.jsxs("button", {
                          className: "sw-secondary",
                          onClick: () => jt({
                            type: "shots",
                            episodeId: Gn.id
                          }),
                          children: [c.jsx(Wm, {
                            size: 14
                          }), x("编辑全部场次")]
                        })]
                      })]
                    }), c.jsx("div", {
                      className: "sw-scene-grid",
                      children: Gn.scenes && Gn.scenes.length > 0 ? Gn.scenes.map((Dn, Ar) => {
                        var ba, ga, _a, $a;
                        const _r = `${Gn.id}__${Dn.sceneNumber}`;
                        J != null && J.startsWith(_r);
                        const Pa = !!Dn.conceptPrompt,
                          fa = !!Dn.conceptPrompt4,
                          Ca = !!Dn.conceptPrompt6,
                          $n = !!Dn.conceptPrompt9,
                          yr = Pa || fa || Ca || $n,
                          Ir = `${Gn.id}__${Dn.sceneNumber}`,
                          Gr = Ce === Ir,
                          Zr = jLt(Dn, n.extraction, (ba = Gn.scenes) == null ? void 0 : ba[Ar - 1]),
                          La = [(ga = Zr.place) == null ? void 0 : ga.name, ...Zr.characters.map(Ya => Ya.name), ...Zr.props.map(Ya => Ya.name)],
                          sa = [4, 6, 9, 25],
                          Ea = Ya => Ya === 25 ? Dn.conceptPrompt : Ya === 4 ? Dn.conceptPrompt4 : Ya === 6 ? Dn.conceptPrompt6 : Dn.conceptPrompt9;
                        return c.jsxs("div", {
                          className: `sw-scene-card rounded-lg border transition-all ${t ? "bg-zinc-900/60 border-zinc-800" : "bg-white border-zinc-200"}`,
                          children: [c.jsxs("div", {
                            className: `flex flex-wrap items-center gap-1.5 px-2.5 py-2 cursor-pointer transition-colors rounded-lg ${t ? "hover:bg-zinc-800/50" : "hover:bg-zinc-50"}`,
                            onClick: () => He(Gr ? null : Ir),
                            children: [c.jsx(Mi, {
                              size: 10,
                              className: `transition-transform shrink-0 ${t ? "text-zinc-600" : "text-zinc-400"} ${Gr ? "rotate-0" : "-rotate-90"}`
                            }), c.jsxs("span", {
                              className: `text-[10px] font-black px-1.5 py-0.5 rounded shrink-0 ${t ? "bg-violet-500/20 text-violet-400" : "bg-violet-100 text-violet-700"}`,
                              children: ["S", Dn.sceneNumber]
                            }), Dn.location && c.jsx("span", {
                              className: "text-[9px] truncate min-w-0 max-w-[50%] text-zinc-500",
                              children: Dn.location
                            }), c.jsx("div", {
                              className: "flex-1 min-w-0"
                            }), sa.map(Ya => {
                              const ta = `${_r}__${Ya}`,
                                ki = J === ta,
                                Wn = !!Ea(Ya);
                              return c.jsx("button", {
                                onClick: wr => {
                                  wr.stopPropagation(), le == null || le(Gn.id, Dn.sceneNumber, St, Ya);
                                },
                                disabled: Ae,
                                className: `sw-grid-option shrink-0 px-1 py-0.5 rounded text-[8px] font-medium transition-all ${ki ? "opacity-50 cursor-wait" : t ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"}`,
                                title: x(Wn ? "重新生成{0}宫格" : "生成{0}宫格", Ya),
                                children: ki ? c.jsx(Ua, {
                                  size: 8,
                                  className: "animate-spin"
                                }) : x("{0}宫格", Ya)
                              }, Ya);
                            })]
                          }), La.length > 0 && c.jsx("p", {
                            className: "px-2.5 pb-1.5 text-[9px] truncate text-zinc-500",
                            children: La.join(" · ")
                          }), !Gr && c.jsx("button", {
                            className: "sw-scene-summary",
                            onClick: () => He(Ir),
                            children: Dn.content
                          }), Gr && c.jsxs("div", {
                            className: `px-2.5 pb-2.5 border-t ${t ? "border-zinc-800" : "border-zinc-100"}`,
                            children: [Dn.content.trim() && c.jsxs("div", {
                              className: `mt-1.5 pt-1.5 border-t ${t ? "border-zinc-800" : "border-zinc-100"}`,
                              children: [c.jsxs("div", {
                                className: "flex items-center justify-between mb-1",
                                children: [c.jsx("span", {
                                  className: "text-[9px] font-medium text-zinc-500",
                                  children: x("视频镜头")
                                }), c.jsxs("button", {
                                  onClick: Ya => {
                                    Ya.stopPropagation(), we == null || we(Gn.id, Dn.sceneNumber, Dn.content);
                                  },
                                  className: `shrink-0 px-1.5 py-0.5 rounded text-[8px] font-medium flex items-center gap-0.5 ${t ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"}`,
                                  title: x("将本场次镜头完整发送内容"),
                                  children: [c.jsx(zu, {
                                    size: 8
                                  }), x(" 镜头整体发送内容")]
                                })]
                              }), c.jsx("div", {
                                className: `text-[10px] leading-relaxed whitespace-pre-wrap p-2 rounded-lg max-h-32 overflow-y-auto minimal-scrollbar ${t ? "bg-zinc-800/40 text-zinc-400" : "bg-zinc-50 text-zinc-600"}`,
                                children: Dn.content
                              })]
                            }), yr && c.jsxs("div", {
                              className: `mt-2 pt-2 border-t ${t ? "border-zinc-800" : "border-zinc-100"}`,
                              children: [c.jsxs("div", {
                                className: "flex items-center justify-between mb-1 flex-wrap gap-1",
                                children: [c.jsx("span", {
                                  className: `text-[9px] font-medium ${t ? "text-violet-400" : "text-violet-600"}`,
                                  children: x("📋 概念图提示词")
                                }), c.jsx("div", {
                                  className: "flex items-center gap-0.5",
                                  children: sa.map(Ya => Ea(Ya) ? c.jsxs("button", {
                                    onClick: ki => {
                                      ki.stopPropagation(), pe == null || pe(Gn.id, Dn, Ya);
                                    },
                                    className: `shrink-0 px-1.5 py-0.5 rounded text-[8px] font-medium flex items-center gap-0.5 ${t ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"}`,
                                    title: x("{0}宫格发送内容", Ya),
                                    children: [c.jsx(zu, {
                                      size: 8
                                    }), " ", Ya, x("宫格")]
                                  }, Ya) : null)
                                })]
                              }), c.jsxs("div", {
                                className: `text-[9px] leading-relaxed whitespace-pre-wrap p-2 rounded-lg ${t ? "bg-violet-500/5 text-zinc-400 border border-violet-500/10" : "bg-violet-50 text-zinc-600 border border-violet-100"}`,
                                children: [((_a = Dn.conceptPrompt) == null ? void 0 : _a.substring(0, 400)) ?? Dn.conceptPrompt4 ?? Dn.conceptPrompt6 ?? Dn.conceptPrompt9 ?? "", ((($a = Dn.conceptPrompt) == null ? void 0 : $a.length) ?? 0) > 400 && c.jsx("span", {
                                  className: `${t ? "text-zinc-600" : "text-zinc-400"}`,
                                  children: "..."
                                })]
                              })]
                            })]
                          })]
                        }, Ar);
                      }) : Gn.expandedScript ? c.jsxs("div", {
                        className: `p-2 rounded-lg border text-[10px] leading-relaxed whitespace-pre-wrap ${t ? "bg-zinc-900/60 border-zinc-800 text-zinc-400" : "bg-white border-zinc-200 text-zinc-600"}`,
                        children: [Gn.expandedScript.substring(0, 1e3), Gn.expandedScript.length > 1e3 && "..."]
                      }) : null
                    })]
                  }, Gn.id);
                })
              }) : c.jsxs("div", {
                className: "sw-stage-empty",
                children: [c.jsx(Kh, {
                  size: 36
                }), c.jsx("h2", {
                  children: me ? x("为「{0}」规划镜头", me.title) : x("从一个故事开始规划镜头")
                }), c.jsx("p", {
                  children: x(me ? "把分集内容扩写为完整分镜，再逐场编辑画面与概念图提示词。" : "先在剧本页输入大纲并分集，也可以手动新增一集。")
                })]
              })]
            })]
          });
        })(), _e === "boards" && c.jsx("div", {
          className: "sw-detail-pane",
          children: c.jsx("div", {
            className: "sw-detail-results flex-1 overflow-y-auto custom-scrollbar",
            children: n.episodes.some(mt => {
              var Xt;
              return (Xt = mt.scenes) == null ? void 0 : Xt.length;
            }) ? c.jsx("div", {
              className: "p-2 space-y-2",
              children: n.episodes.filter(mt => {
                var Xt;
                return (Xt = mt.scenes) == null ? void 0 : Xt.length;
              }).map(mt => c.jsxs("div", {
                children: [c.jsxs("div", {
                  className: "sw-results-heading",
                  children: [c.jsxs("div", {
                    children: [c.jsxs("h2", {
                      children: [c.jsxs("span", {
                        className: "sw-episode-number",
                        children: ["EP ", String(mt.index).padStart(2, "0")]
                      }), " ", mt.title]
                    }), c.jsx("p", {
                      children: x("先生成场景空镜和道具静物。分镜图按上一镜、场景、角色、道具沿用它们的外形。")
                    })]
                  }), c.jsx("button", {
                    className: "sw-secondary",
                    onClick: () => ce == null ? void 0 : ce(mt),
                    children: x("生成本集分镜图")
                  })]
                }), c.jsx("div", {
                  className: "sw-scene-grid",
                  children: mt.scenes.map((Xt, Gn) => {
                    var Dn;
                    const rr = ker(Xt, n.extraction, mt.scenes[Gn - 1]),
                      qn = [(Dn = rr.bound.place) == null ? void 0 : Dn.name, ...rr.bound.characters.map(Ar => Ar.name), ...rr.bound.props.map(Ar => Ar.name)].filter(Boolean);
                    return c.jsxs("div", {
                      className: "sw-board-card",
                      children: [c.jsxs("div", {
                        className: "sw-board-head",
                        children: [c.jsxs("span", {
                          children: ["S", Xt.sceneNumber]
                        }), c.jsx("strong", {
                          children: Xt.location || x("未命名场次")
                        })]
                      }), qn.length > 0 && c.jsx("div", {
                        className: "sw-board-tags",
                        children: qn.map(Ar => c.jsx("span", {
                          children: Ar
                        }, Ar))
                      }), c.jsx("p", {
                        children: Xt.content
                      }), c.jsx("button", {
                        disabled: !rr.ready,
                        onClick: () => pe == null ? void 0 : pe(mt.id, Xt),
                        children: rr.ready ? x("生成分镜图") : x("先补上这一场的场景")
                      })]
                    }, Xt.sceneNumber);
                  })
                })]
              }, mt.id))
            }) : c.jsxs("div", {
              className: "sw-stage-empty",
              children: [c.jsx(Od, {
                size: 36
              }), c.jsx("h2", {
                children: x("分镜图排在场景和道具之后")
              }), c.jsx("p", {
                children: x("先在设定里整理场景和道具，再回到这里按场次生成。")
              })]
            })
          })
        }), _e === "settings" && c.jsxs("div", {
          className: "sw-detail-pane",
          children: [Ze && Kpe.createPortal(c.jsx("div", {
            className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black/45",
            onClick: () => {
              Ge(!1), Ht(null), st("");
            },
            children: c.jsxs("div", {
              className: `w-[360px] max-h-[420px] rounded-2xl border shadow-2xl flex flex-col ${t ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200"}`,
              onClick: mt => mt.stopPropagation(),
              children: [c.jsxs("div", {
                className: `px-5 py-4 border-b flex items-center gap-2 ${t ? "border-zinc-800" : "border-zinc-100"}`,
                children: [c.jsx(ac, {
                  size: 16,
                  className: "text-amber-500"
                }), c.jsx("span", {
                  className: `text-sm font-bold ${t ? "text-zinc-200" : "text-zinc-800"}`,
                  children: x("AI 风格助手")
                }), c.jsx("div", {
                  className: "flex-1"
                }), c.jsx("button", {
                  onClick: () => {
                    Ge(!1), Ht(null), st("");
                  },
                  className: `p-1 rounded-lg ${t ? "hover:bg-zinc-800 text-zinc-500" : "hover:bg-zinc-100 text-zinc-400"}`,
                  children: c.jsx(Na, {
                    size: 14
                  })
                })]
              }), c.jsxs("div", {
                className: "flex-1 p-5 space-y-3 overflow-y-auto minimal-scrollbar",
                children: [c.jsx("p", {
                  className: `text-[11px] leading-relaxed ${t ? "text-zinc-400" : "text-zinc-500"}`,
                  children: x("描述你想要的视觉风格，AI 会帮你生成对应的提示词标签。")
                }), c.jsx("textarea", {
                  value: Oe,
                  onChange: mt => st(mt.target.value),
                  placeholder: x("例如：像宫崎骏动画那种温暖的手绘风格..."),
                  rows: 3,
                  className: `w-full text-xs rounded-lg border p-3 resize-none outline-none transition-all ${t ? "bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-600 focus:border-amber-500" : "bg-zinc-50 border-zinc-200 text-zinc-700 placeholder:text-zinc-400 focus:border-amber-500"}`
                }), c.jsx("button", {
                  onClick: async () => {
                    if (!Oe.trim() || !ie) return;
                    const mt = await ie(Oe);
                    mt && Ht(mt);
                  },
                  disabled: ae || !Oe.trim(),
                  className: `w-full h-8 flex items-center justify-center gap-1.5 text-xs font-medium rounded-lg transition-all ${ae || !Oe.trim() ? t ? "bg-zinc-800 text-zinc-600" : "bg-zinc-100 text-zinc-400" : t ? "bg-amber-500 hover:bg-amber-400 text-black" : "bg-amber-500 hover:bg-amber-600 text-white"}`,
                  children: ae ? c.jsxs(c.Fragment, {
                    children: [c.jsx(Ua, {
                      size: 12,
                      className: "animate-spin"
                    }), x(" 生成中...")]
                  }) : c.jsxs(c.Fragment, {
                    children: [c.jsx(ac, {
                      size: 12
                    }), x(" 生成风格")]
                  })
                }), vt && c.jsxs("div", {
                  className: `p-3 rounded-lg border space-y-2 ${t ? "bg-zinc-800/50 border-amber-500/30" : "bg-amber-50 border-amber-200"}`,
                  children: [c.jsx("div", {
                    className: "flex items-center gap-2",
                    children: c.jsx("span", {
                      className: `text-xs font-bold px-2 py-0.5 rounded ${t ? "bg-amber-500/20 text-amber-400" : "bg-amber-100 text-amber-700"}`,
                      children: vt.label
                    })
                  }), c.jsx("p", {
                    className: `text-[10px] leading-relaxed break-all ${t ? "text-zinc-400" : "text-zinc-600"}`,
                    children: vt.prompt
                  }), c.jsxs("button", {
                    onClick: () => {
                      if (re && vt) {
                        const mt = re(vt.label, vt.prompt);
                        it(mt.id), Ge(!1), Ht(null), st("");
                      }
                    },
                    className: `w-full h-7 flex items-center justify-center gap-1.5 text-[10px] font-medium rounded-lg transition-all ${t ? "bg-green-600 hover:bg-green-500 text-white" : "bg-green-500 hover:bg-green-600 text-white"}`,
                    children: [c.jsx(eo, {
                      size: 11
                    }), x(" 添加到我的风格")]
                  })]
                })]
              })]
            })
          }), document.body), Ft && Kpe.createPortal(c.jsx("div", {
            className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black/45",
            onClick: () => {
              We(!1), pt(null), Yt(""), kt("");
            },
            children: c.jsxs("div", {
              className: `w-[400px] max-h-[560px] rounded-2xl border shadow-2xl flex flex-col ${t ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200"}`,
              onClick: mt => mt.stopPropagation(),
              children: [c.jsxs("div", {
                className: `px-5 py-4 border-b flex items-center gap-2 ${t ? "border-zinc-800" : "border-zinc-100"}`,
                children: [c.jsx(tw, {
                  size: 16,
                  className: "text-amber-500"
                }), c.jsx("span", {
                  className: `text-sm font-bold ${t ? "text-zinc-200" : "text-zinc-800"}`,
                  children: x("管理风格标签")
                }), c.jsx("div", {
                  className: "flex-1"
                }), c.jsx("button", {
                  onClick: () => {
                    We(!1), pt(null);
                  },
                  className: `p-1 rounded-lg ${t ? "hover:bg-zinc-800 text-zinc-500" : "hover:bg-zinc-100 text-zinc-400"}`,
                  children: c.jsx(Na, {
                    size: 14
                  })
                })]
              }), c.jsx("div", {
                className: `mx-5 mt-3 px-3 py-2 rounded-lg text-[10px] leading-relaxed ${t ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "bg-blue-50 text-blue-600 border border-blue-200"}`,
                children: x("您可以自定义风格标签。标签名称将显示在选择器中，提示词内容将在 AI 提取时注入到生成风格中。")
              }), c.jsxs("div", {
                className: "flex-1 overflow-y-auto px-5 py-3 space-y-2 minimal-scrollbar",
                children: [Rze.map(mt => c.jsxs("div", {
                  className: `p-3 rounded-xl border ${t ? "bg-zinc-800/40 border-zinc-800" : "bg-zinc-50 border-zinc-200"}`,
                  children: [c.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [c.jsx("span", {
                      className: `text-[11px] font-medium px-2 py-0.5 rounded ${t ? "bg-zinc-700 text-zinc-300" : "bg-zinc-200 text-zinc-700"}`,
                      children: mt.label
                    }), c.jsx("span", {
                      className: `text-[9px] ${t ? "text-zinc-600" : "text-zinc-400"}`,
                      children: x("内置")
                    })]
                  }), c.jsx("p", {
                    className: "mt-1.5 text-[10px] leading-relaxed text-zinc-500",
                    children: mt.prompt
                  })]
                }, mt.id)), Z.map(mt => c.jsx("div", {
                  className: `p-3 rounded-xl border ${t ? "bg-zinc-800/60 border-amber-500/20" : "bg-amber-50/50 border-amber-200"}`,
                  children: nn === mt.id ? c.jsxs("div", {
                    className: "space-y-2",
                    children: [c.jsx("div", {
                      className: "flex gap-2",
                      children: c.jsxs("div", {
                        className: "flex-1",
                        children: [c.jsx("label", {
                          className: `text-[9px] mb-0.5 block ${t ? "text-zinc-500" : "text-zinc-400"}`,
                          children: x("标签名称")
                        }), c.jsx("input", {
                          value: lt,
                          onChange: Xt => gt(Xt.target.value),
                          className: `w-full h-7 px-2 text-[11px] rounded-lg border outline-none ${t ? "bg-zinc-900 border-zinc-700 text-zinc-300" : "bg-white border-zinc-200 text-zinc-700"}`
                        })]
                      })
                    }), c.jsxs("div", {
                      children: [c.jsx("label", {
                        className: `text-[9px] mb-0.5 block ${t ? "text-zinc-500" : "text-zinc-400"}`,
                        children: x("注入的提示词内容")
                      }), c.jsx("textarea", {
                        value: Ut,
                        onChange: Xt => _t(Xt.target.value),
                        rows: 2,
                        className: `w-full text-[10px] rounded-lg border p-2 resize-none outline-none minimal-scrollbar ${t ? "bg-zinc-900 border-zinc-700 text-zinc-300" : "bg-white border-zinc-200 text-zinc-700"}`
                      })]
                    }), c.jsxs("div", {
                      className: "flex gap-1.5 justify-end",
                      children: [c.jsx("button", {
                        onClick: () => pt(null),
                        className: `px-2.5 py-1 text-[10px] rounded-lg ${t ? "text-zinc-400 hover:bg-zinc-800" : "text-zinc-500 hover:bg-zinc-100"}`,
                        children: x("取消")
                      }), c.jsxs("button", {
                        onClick: () => {
                          lt.trim() && Ut.trim() && (ye == null || ye(mt.id, lt, Ut), pt(null));
                        },
                        className: `px-2.5 py-1 text-[10px] rounded-lg font-medium ${t ? "bg-amber-500 text-black" : "bg-amber-500 text-white"}`,
                        children: [c.jsx(io, {
                          size: 10,
                          className: "inline mr-0.5"
                        }), x(" 保存")]
                      })]
                    })]
                  }) : c.jsxs(c.Fragment, {
                    children: [c.jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [c.jsx("span", {
                        className: `text-[11px] font-medium px-2 py-0.5 rounded ${t ? "bg-amber-500/20 text-amber-400" : "bg-amber-100 text-amber-700"}`,
                        children: mt.label
                      }), c.jsx("div", {
                        className: "flex-1"
                      }), c.jsx("button", {
                        onClick: () => {
                          pt(mt.id), gt(mt.label), _t(mt.prompt);
                        },
                        className: `p-1 rounded ${t ? "text-zinc-600 hover:text-zinc-300 hover:bg-zinc-700" : "text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200"}`,
                        title: x("编辑"),
                        children: c.jsx(nw, {
                          size: 11
                        })
                      }), c.jsx("button", {
                        onClick: () => fe == null ? void 0 : fe(mt.id),
                        className: `p-1 rounded ${t ? "text-zinc-600 hover:text-red-400 hover:bg-zinc-700" : "text-zinc-400 hover:text-red-500 hover:bg-red-50"}`,
                        title: x("删除"),
                        children: c.jsx(Qo, {
                          size: 11
                        })
                      })]
                    }), c.jsx("p", {
                      className: "mt-1.5 text-[10px] leading-relaxed text-zinc-500",
                      children: mt.prompt
                    })]
                  })
                }, mt.id)), c.jsx("div", {
                  className: `p-3 rounded-xl border border-dashed ${t ? "border-zinc-700" : "border-zinc-300"}`,
                  children: c.jsxs("div", {
                    className: "space-y-2",
                    children: [c.jsxs("div", {
                      className: "flex gap-2",
                      children: [c.jsxs("div", {
                        className: "w-1/3",
                        children: [c.jsx("label", {
                          className: `text-[9px] mb-0.5 block ${t ? "text-zinc-500" : "text-zinc-400"}`,
                          children: x("标签名称")
                        }), c.jsx("input", {
                          value: At,
                          onChange: mt => Yt(mt.target.value),
                          placeholder: x("如: 赛博朋克"),
                          className: `w-full h-7 px-2 text-[11px] rounded-lg border outline-none ${t ? "bg-zinc-800 border-zinc-700 text-zinc-300 placeholder:text-zinc-600" : "bg-white border-zinc-200 text-zinc-700 placeholder:text-zinc-400"}`
                        })]
                      }), c.jsxs("div", {
                        className: "flex-1",
                        children: [c.jsx("label", {
                          className: `text-[9px] mb-0.5 block ${t ? "text-zinc-500" : "text-zinc-400"}`,
                          children: x("注入的提示词内容")
                        }), c.jsx("input", {
                          value: qe,
                          onChange: mt => kt(mt.target.value),
                          placeholder: "English style prompt...",
                          className: `w-full h-7 px-2 text-[11px] rounded-lg border outline-none ${t ? "bg-zinc-800 border-zinc-700 text-zinc-300 placeholder:text-zinc-600" : "bg-white border-zinc-200 text-zinc-700 placeholder:text-zinc-400"}`
                        })]
                      })]
                    }), c.jsxs("button", {
                      onClick: () => {
                        At.trim() && qe.trim() && re && (re(At, qe), Yt(""), kt(""));
                      },
                      disabled: !At.trim() || !qe.trim(),
                      className: `w-full h-7 flex items-center justify-center gap-1 text-[10px] font-medium rounded-lg transition-all ${!At.trim() || !qe.trim() ? t ? "bg-zinc-800 text-zinc-600" : "bg-zinc-100 text-zinc-400" : t ? "bg-amber-500 hover:bg-amber-400 text-black" : "bg-amber-500 hover:bg-amber-600 text-white"}`,
                      children: [c.jsx(eo, {
                        size: 11
                      }), x(" 添加自定义风格")]
                    })]
                  })
                })]
              }), c.jsx("div", {
                className: `px-5 py-3 border-t flex items-center justify-end gap-2 ${t ? "border-zinc-800" : "border-zinc-100"}`,
                children: c.jsx("button", {
                  onClick: () => {
                    We(!1), pt(null);
                  },
                  className: `px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${t ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`,
                  children: x("关闭")
                })
              })]
            })
          }), document.body), c.jsxs("div", {
            className: "sw-detail-results flex-1 overflow-y-auto custom-scrollbar",
            children: [Me && c.jsxs(c.Fragment, {
              children: [c.jsxs("div", {
                className: "sw-results-heading",
                children: [c.jsxs("div", {
                  children: [c.jsx("h2", {
                    children: x("视觉设定库")
                  }), c.jsx("p", {
                    children: x("检查设定描述，展开卡片预览提示词，按需发送到言绘或画布。")
                  })]
                }), c.jsxs("button", {
                  className: "sw-secondary",
                  onClick: () => ke("shots"),
                  children: [x("规划镜头 "), c.jsx(Kh, {
                    size: 14
                  })]
                })]
              }), c.jsx("div", {
                className: "sw-result-filters",
                "aria-label": x("设定分类"),
                children: [["all", "全部"], ["characters", "角色"], ["scenes", "场景"], ["props", "道具"]].map(([mt, Xt]) => {
                  var Gn, rr;
                  return c.jsxs("button", {
                    "aria-pressed": ve === mt,
                    onClick: () => Te(mt),
                    children: [Xt, c.jsx("small", {
                      children: mt === "all" ? Object.values(n.extraction || {}).reduce((qn, Dn) => qn + Dn.length, 0) : ((rr = (Gn = n.extraction) == null ? void 0 : Gn[mt]) == null ? void 0 : rr.length) || 0
                    })]
                  }, mt);
                })
              })]
            }), Me && n.extraction ? c.jsxs("div", {
              className: "sw-settings-collection",
              children: [ve !== "all" && !n.extraction[ve].length && c.jsx("p", {
                className: "sw-setting-source-note",
                children: x("暂无此类设定，可切换「全部」查看，或在下方补充提取。")
              }), c.jsxs("button", {
                onClick: () => jt({
                  type: "settings"
                }),
                className: `w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[10px] font-medium transition-all ${t ? "bg-zinc-800/60 border border-zinc-700/50 text-zinc-400 hover:text-violet-400 hover:bg-violet-500/10 hover:border-violet-500/30" : "bg-zinc-50 border border-zinc-200 text-zinc-500 hover:text-violet-600 hover:bg-violet-50 hover:border-violet-300"}`,
                title: x("展开编辑查看"),
                children: [c.jsx(Wm, {
                  size: 11
                }), x("展开查看全部设定")]
              }), (ve === "all" || ve === "characters") && n.extraction.characters.length > 0 && c.jsxs("div", {
                children: [c.jsxs("div", {
                  className: `px-1 py-1.5 flex items-center gap-1.5 ${t ? "text-zinc-400" : "text-zinc-500"}`,
                  children: [c.jsx(jY, {
                    size: 11,
                    className: t ? "text-red-400" : "text-red-500"
                  }), c.jsxs("span", {
                    className: `text-[10px] font-medium ${t ? "text-red-400" : "text-red-600"}`,
                    children: [x("角色 ("), n.extraction.characters.length, ")"]
                  })]
                }), c.jsx("div", {
                  className: "sw-setting-grid",
                  children: n.extraction.characters.map(mt => c.jsxs("div", {
                    className: `sw-setting-card p-2 rounded-lg border cursor-pointer transition-all group/card ${De === mt.id ? t ? "bg-zinc-800/80 border-red-500/40 ring-1 ring-red-500/20" : "bg-red-50/50 border-red-300 ring-1 ring-red-200" : t ? "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50" : "bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"}`,
                    onClick: () => Ye(Xt => Xt === mt.id ? null : mt.id),
                    children: [c.jsxs("div", {
                      className: "flex items-center gap-1.5 mb-1",
                      children: [c.jsx("span", {
                        className: `w-1.5 h-1.5 rounded-full shrink-0 ${mt.role === "主角" ? "bg-red-500" : mt.role === "反派" ? "bg-purple-500" : mt.role === "配角" ? "bg-blue-500" : "bg-zinc-400"}`
                      }), c.jsx("span", {
                        className: `text-[11px] font-medium ${t ? "text-zinc-200" : "text-zinc-800"}`,
                        children: mt.name
                      }), c.jsx("span", {
                        className: `text-[9px] px-1.5 py-0.5 rounded-full ${mt.role === "主角" ? t ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-red-50 text-red-600 border border-red-200" : mt.role === "反派" ? t ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" : "bg-purple-50 text-purple-600 border border-purple-200" : t ? "bg-zinc-800 text-zinc-400 border border-zinc-700" : "bg-zinc-100 text-zinc-500 border border-zinc-200"}`,
                        children: mt.role
                      }), c.jsx("div", {
                        className: "flex-1"
                      }), c.jsx(Mi, {
                        size: 12,
                        className: `transition-transform ${t ? "text-zinc-600" : "text-zinc-400"} ${De === mt.id ? "rotate-180" : ""}`
                      })]
                    }), mt.description && c.jsx("p", {
                      className: `text-[10px] leading-relaxed text-zinc-500 ${De === mt.id ? "" : "line-clamp-2"}`,
                      children: mt.description
                    }), De === mt.id && c.jsxs("div", {
                      className: "mt-2 space-y-2",
                      children: [yn(mt), mt.visualPrompt && c.jsx("div", {
                        className: `p-2 rounded-md text-[10px] leading-relaxed break-all ${t ? "bg-zinc-950 text-amber-300/80 border border-zinc-800" : "bg-amber-50 text-amber-800 border border-amber-200"}`,
                        children: mt.visualPrompt
                      }), c.jsxs("button", {
                        onClick: Xt => {
                          Xt.stopPropagation(), de == null || de(mt, "character");
                        },
                        className: `w-full h-7 flex items-center justify-center gap-1.5 text-[10px] font-medium rounded-md transition-all ${t ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/20" : "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"}`,
                        children: [c.jsx(zu, {
                          size: 11
                        }), x("发送内容")]
                      })]
                    })]
                  }, mt.id))
                })]
              }), (ve === "all" || ve === "scenes") && n.extraction.scenes.length > 0 && c.jsxs("div", {
                children: [c.jsxs("div", {
                  className: `px-1 py-1.5 flex items-center gap-1.5 ${t ? "text-zinc-400" : "text-zinc-500"}`,
                  children: [c.jsx(sxe, {
                    size: 11,
                    className: t ? "text-green-400" : "text-green-500"
                  }), c.jsxs("span", {
                    className: `text-[10px] font-medium ${t ? "text-green-400" : "text-green-600"}`,
                    children: [x("场景 ("), n.extraction.scenes.length, ")"]
                  })]
                }), c.jsx("div", {
                  className: "sw-setting-grid",
                  children: n.extraction.scenes.map(mt => c.jsxs("div", {
                    className: `sw-setting-card p-2 rounded-lg border cursor-pointer transition-all group/card ${De === mt.id ? t ? "bg-zinc-800/80 border-green-500/40 ring-1 ring-green-500/20" : "bg-green-50/50 border-green-300 ring-1 ring-green-200" : t ? "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50" : "bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"}`,
                    onClick: () => Ye(Xt => Xt === mt.id ? null : mt.id),
                    children: [c.jsxs("div", {
                      className: "flex items-center gap-1.5 mb-1",
                      children: [c.jsx("span", {
                        className: "w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"
                      }), c.jsx("span", {
                        className: `text-[11px] font-medium ${t ? "text-zinc-200" : "text-zinc-800"}`,
                        children: mt.name
                      }), c.jsx("div", {
                        className: "flex-1"
                      }), c.jsx(Mi, {
                        size: 12,
                        className: `transition-transform ${t ? "text-zinc-600" : "text-zinc-400"} ${De === mt.id ? "rotate-180" : ""}`
                      })]
                    }), mt.description && c.jsx("p", {
                      className: `text-[10px] leading-relaxed text-zinc-500 ${De === mt.id ? "" : "line-clamp-2"}`,
                      children: mt.description
                    }), De === mt.id && c.jsxs("div", {
                      className: "mt-2 space-y-2",
                      children: [yn(mt), mt.visualPrompt && c.jsx("div", {
                        className: `p-2 rounded-md text-[10px] leading-relaxed break-all ${t ? "bg-zinc-950 text-green-300/80 border border-zinc-800" : "bg-green-50 text-green-800 border border-green-200"}`,
                        children: mt.visualPrompt
                      }), c.jsxs("button", {
                        onClick: Xt => {
                          Xt.stopPropagation(), de == null || de(mt, "scene");
                        },
                        className: `w-full h-7 flex items-center justify-center gap-1.5 text-[10px] font-medium rounded-md transition-all ${t ? "bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/20" : "bg-green-50 text-green-600 hover:bg-green-100 border border-green-200"}`,
                        children: [c.jsx(zu, {
                          size: 11
                        }), x("发送内容")]
                      })]
                    })]
                  }, mt.id))
                })]
              }), (ve === "all" || ve === "props") && n.extraction.props.length > 0 && c.jsxs("div", {
                children: [c.jsxs("div", {
                  className: `px-1 py-1.5 flex items-center gap-1.5 ${t ? "text-zinc-400" : "text-zinc-500"}`,
                  children: [c.jsx(lxe, {
                    size: 11,
                    className: t ? "text-amber-400" : "text-amber-500"
                  }), c.jsxs("span", {
                    className: `text-[10px] font-medium ${t ? "text-amber-400" : "text-amber-600"}`,
                    children: [x("道具 ("), n.extraction.props.length, ")"]
                  })]
                }), c.jsx("div", {
                  className: "sw-setting-grid",
                  children: n.extraction.props.map(mt => c.jsxs("div", {
                    className: `sw-setting-card p-2 rounded-lg border cursor-pointer transition-all group/card ${De === mt.id ? t ? "bg-zinc-800/80 border-amber-500/40 ring-1 ring-amber-500/20" : "bg-amber-50/50 border-amber-300 ring-1 ring-amber-200" : t ? "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50" : "bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"}`,
                    onClick: () => Ye(Xt => Xt === mt.id ? null : mt.id),
                    children: [c.jsxs("div", {
                      className: "flex items-center gap-1.5 mb-1",
                      children: [c.jsx("span", {
                        className: "w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"
                      }), c.jsx("span", {
                        className: `text-[11px] font-medium ${t ? "text-zinc-200" : "text-zinc-800"}`,
                        children: mt.name
                      }), mt.owner && c.jsxs("span", {
                        className: `text-[9px] px-1.5 py-0.5 rounded-full ${t ? "bg-zinc-800 text-zinc-400 border border-zinc-700" : "bg-zinc-100 text-zinc-500 border border-zinc-200"}`,
                        children: [x("属于: "), mt.owner]
                      }), c.jsx("div", {
                        className: "flex-1"
                      }), c.jsx(Mi, {
                        size: 12,
                        className: `transition-transform ${t ? "text-zinc-600" : "text-zinc-400"} ${De === mt.id ? "rotate-180" : ""}`
                      })]
                    }), mt.description && c.jsx("p", {
                      className: `text-[10px] leading-relaxed text-zinc-500 ${De === mt.id ? "" : "line-clamp-2"}`,
                      children: mt.description
                    }), De === mt.id && c.jsxs("div", {
                      className: "mt-2 space-y-2",
                      children: [yn(mt), mt.visualPrompt && c.jsx("div", {
                        className: `p-2 rounded-md text-[10px] leading-relaxed break-all ${t ? "bg-zinc-950 text-amber-300/80 border border-zinc-800" : "bg-amber-50 text-amber-800 border border-amber-200"}`,
                        children: mt.visualPrompt
                      }), c.jsxs("button", {
                        onClick: Xt => {
                          Xt.stopPropagation(), de == null || de(mt, "prop");
                        },
                        className: `w-full h-7 flex items-center justify-center gap-1.5 text-[10px] font-medium rounded-md transition-all ${t ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-500/20" : "bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-200"}`,
                        children: [c.jsx(zu, {
                          size: 11
                        }), x("发送内容")]
                      })]
                    })]
                  }, mt.id))
                })]
              })]
            }) : c.jsxs("div", {
              className: "sw-stage-empty",
              children: [c.jsx(EP, {
                size: 36
              }), c.jsx("h2", {
                children: x(q ? "正在从剧本整理设定" : "从剧本中整理角色、场景和道具")
              }), c.jsx("p", {
                children: x(Fe.sources.length ? "已自动关联剧本，点击下方「分析剧本」即可开始。" : "先在「剧本」页写入内容，设定页会自动关联。")
              }), c.jsx("button", {
                className: "sw-secondary",
                onClick: () => ke("script"),
                children: x("查看剧本")
              })]
            })]
          })]
        }), wt && Kpe.createPortal(c.jsx("div", {
          className: "sw-editor-overlay fixed inset-0 z-[9999]",
          onClick: () => jt(null),
          children: c.jsxs("div", {
            className: `sw-editor-window absolute rounded-2xl border shadow-2xl flex flex-col overflow-hidden pointer-events-auto ${t ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200"}`,
            onClick: mt => mt.stopPropagation(),
            children: [c.jsxs("div", {
              className: `px-6 py-4 border-b flex items-center gap-3 shrink-0 ${t ? "border-zinc-800" : "border-zinc-100"}`,
              children: [wt.type === "shots" && (() => {
                var Xt;
                const mt = n.episodes.find(Gn => Gn.id === wt.episodeId);
                return c.jsxs(c.Fragment, {
                  children: [c.jsx(Kh, {
                    size: 18,
                    className: "text-violet-500"
                  }), c.jsxs("span", {
                    className: `text-sm font-bold ${t ? "text-zinc-200" : "text-zinc-800"}`,
                    children: ["Ep", mt == null ? void 0 : mt.index, " ", mt == null ? void 0 : mt.title]
                  }), c.jsxs("span", {
                    className: `text-xs px-2 py-0.5 rounded-full ${t ? "bg-violet-500/10 text-violet-400 border border-violet-500/20" : "bg-violet-50 text-violet-600 border border-violet-200"}`,
                    children: [((Xt = mt == null ? void 0 : mt.scenes) == null ? void 0 : Xt.length) || 0, x(" 场")]
                  })]
                });
              })(), wt.type === "script" && (() => {
                const mt = n.episodes.find(Xt => Xt.id === wt.episodeId);
                return c.jsxs(c.Fragment, {
                  children: [c.jsx(Hd, {
                    size: 18,
                    className: "text-amber-500"
                  }), c.jsxs("span", {
                    className: `text-sm font-bold ${t ? "text-zinc-200" : "text-zinc-800"}`,
                    children: ["Ep", mt == null ? void 0 : mt.index, " ", mt == null ? void 0 : mt.title]
                  }), (mt == null ? void 0 : mt.durationSeconds) && c.jsxs("span", {
                    className: `text-xs px-2 py-0.5 rounded-full ${t ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-amber-50 text-amber-600 border border-amber-200"}`,
                    children: [mt.durationSeconds, "s"]
                  })]
                });
              })(), wt.type === "settings" && c.jsxs(c.Fragment, {
                children: [c.jsx(IP, {
                  size: 18,
                  className: "text-violet-500"
                }), c.jsx("span", {
                  className: `text-sm font-bold ${t ? "text-zinc-200" : "text-zinc-800"}`,
                  children: x("角色 / 场景 / 道具 设定")
                })]
              }), c.jsx("div", {
                className: "flex-1"
              }), c.jsx("button", {
                onClick: () => jt(null),
                className: `p-2 rounded-lg transition-colors ${t ? "hover:bg-zinc-800 text-zinc-400" : "hover:bg-zinc-100 text-zinc-500"}`,
                children: c.jsx(Na, {
                  size: 16
                })
              })]
            }), c.jsxs("div", {
              className: "flex-1 min-w-0 overflow-y-auto minimal-scrollbar p-6",
              children: [wt.type === "shots" && (() => {
                const mt = n.episodes.find(Xt => Xt.id === wt.episodeId);
                return !(mt != null && mt.scenes) || mt.scenes.length === 0 ? c.jsx("div", {
                  className: `flex items-center justify-center h-full text-sm ${t ? "text-zinc-600" : "text-zinc-400"}`,
                  children: x("暂无场次数据")
                }) : c.jsx("div", {
                  className: "space-y-4",
                  children: mt.scenes.map((Xt, Gn) => {
                    const rr = `${mt.id}__${Xt.sceneNumber}`,
                      qn = !!(J != null && J.startsWith(rr)),
                      Dn = [4, 6, 9, 25],
                      Ar = _r => _r === 25 ? Xt.conceptPrompt : _r === 4 ? Xt.conceptPrompt4 : _r === 6 ? Xt.conceptPrompt6 : Xt.conceptPrompt9;
                    return Dn.some(_r => !!Ar(_r)), c.jsxs("div", {
                      className: `p-5 rounded-xl border transition-all ${t ? "bg-zinc-800/40 border-zinc-700/60" : "bg-zinc-50 border-zinc-200"}`,
                      children: [c.jsxs("div", {
                        className: `flex flex-wrap items-center gap-2 mb-3 pb-3 border-b ${t ? "border-zinc-700" : "border-zinc-200"}`,
                        children: [c.jsxs("span", {
                          className: `text-sm font-black px-2.5 py-1 rounded-lg shrink-0 ${t ? "bg-violet-500/20 text-violet-400" : "bg-violet-100 text-violet-700"}`,
                          children: ["S", Xt.sceneNumber]
                        }), Xt.location && c.jsx("span", {
                          className: `text-xs truncate max-w-[40%] ${t ? "text-zinc-400" : "text-zinc-600"}`,
                          title: Xt.location,
                          children: Xt.location
                        }), c.jsx("div", {
                          className: "flex-1 min-w-0"
                        }), Dn.map(_r => {
                          const Pa = `${rr}__${_r}`,
                            fa = J === Pa,
                            Ca = !!Ar(_r);
                          return c.jsxs("div", {
                            className: `flex items-center gap-1 shrink-0 rounded-lg border ${t ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-100 border-zinc-200"}`,
                            children: [c.jsxs("span", {
                              className: `px-2 py-1 text-xs font-medium ${t ? "text-zinc-400" : "text-zinc-600"}`,
                              children: [_r, x("宫格")]
                            }), c.jsxs("button", {
                              onClick: () => le == null ? void 0 : le(mt.id, Xt.sceneNumber, St, _r),
                              disabled: qn,
                              className: `px-1.5 py-1 rounded text-xs font-medium flex items-center gap-0.5 transition-all ${qn ? "opacity-50 cursor-wait" : t ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"}`,
                              title: x(Ca ? "重新生成{0}宫格" : "生成{0}宫格", _r),
                              children: [fa ? c.jsx(Ua, {
                                size: 10,
                                className: "animate-spin"
                              }) : c.jsx(EP, {
                                size: 10
                              }), x("生成")]
                            }), Ca && c.jsxs("button", {
                              onClick: () => pe == null ? void 0 : pe(mt.id, Xt, _r),
                              className: `px-1.5 py-1 rounded text-xs font-medium flex items-center gap-0.5 ${t ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"}`,
                              title: x("{0}宫格发送内容", _r),
                              children: [c.jsx(zu, {
                                size: 10
                              }), x(" 发送")]
                            })]
                          }, _r);
                        })]
                      }), c.jsxs("div", {
                        className: "mb-3",
                        children: [c.jsx("label", {
                          className: `text-xs font-medium mb-1.5 block ${t ? "text-zinc-400" : "text-zinc-500"}`,
                          children: x("场次内容")
                        }), c.jsx("textarea", {
                          value: Xt.content,
                          readOnly: Ae,
                          onChange: _r => bt(mt.id, Xt.sceneNumber, {
                            content: _r.target.value
                          }),
                          className: `w-full text-sm leading-relaxed p-3 rounded-lg resize-none outline-none transition-colors minimal-scrollbar ${t ? "bg-zinc-900 border border-zinc-700 text-zinc-300 placeholder-zinc-600 focus:border-violet-500/50" : "bg-white border border-zinc-200 text-zinc-700 placeholder-zinc-400 focus:border-violet-400"}`,
                          rows: Math.min(Math.max(Xt.content.split(`
`).length + 1, 4), 12)
                        })]
                      }), Xt.content.trim() && c.jsxs("div", {
                        className: "mb-3",
                        children: [c.jsxs("div", {
                          className: "flex items-center justify-between mb-1.5",
                          children: [c.jsx("label", {
                            className: `text-xs font-medium ${t ? "text-zinc-400" : "text-zinc-500"}`,
                            children: x("视频镜头")
                          }), c.jsxs("button", {
                            onClick: () => we == null ? void 0 : we(mt.id, Xt.sceneNumber, Xt.content),
                            className: `shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 ${t ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200"}`,
                            title: x("将本场次镜头完整发送内容"),
                            children: [c.jsx(zu, {
                              size: 12
                            }), x(" 镜头整体发送内容")]
                          })]
                        }), c.jsx("div", {
                          className: `text-sm leading-relaxed whitespace-pre-wrap p-3 rounded-lg max-h-48 overflow-y-auto minimal-scrollbar ${t ? "bg-zinc-900/60 text-zinc-400 border border-zinc-700" : "bg-white border border-zinc-200 text-zinc-600"}`,
                          children: Xt.content
                        })]
                      }), [25, 9, 6, 4].map(_r => {
                        const Pa = Ar(_r),
                          fa = _r === 25 ? "conceptPrompt" : _r === 4 ? "conceptPrompt4" : _r === 6 ? "conceptPrompt6" : "conceptPrompt9";
                        return c.jsxs("div", {
                          className: "mb-3",
                          children: [c.jsxs("label", {
                            className: `text-xs font-medium mb-1.5 flex items-center gap-1.5 ${t ? "text-violet-400" : "text-violet-600"}`,
                            children: ["📋 ", _r, x("宫格概念图提示词")]
                          }), c.jsx("textarea", {
                            value: Pa || "",
                            readOnly: Ae,
                            onChange: Ca => bt(mt.id, Xt.sceneNumber, {
                              [fa]: Ca.target.value
                            }),
                            placeholder: Pa ? void 0 : x("点击上方「{0}宫格」生成", _r),
                            className: `w-full text-sm leading-relaxed p-3 rounded-lg resize-none outline-none transition-colors minimal-scrollbar ${t ? "bg-violet-500/5 border border-violet-500/20 text-zinc-300 focus:border-violet-500/40" : "bg-violet-50 border border-violet-100 text-zinc-700 focus:border-violet-300"}`,
                            rows: Pa ? Math.min(Math.max(Pa.split(`
`).length + 1, 4), 10) : 3
                          })]
                        }, _r);
                      })]
                    }, Gn);
                  })
                });
              })(), wt.type === "script" && (() => {
                const mt = n.episodes.find(Xt => Xt.id === wt.episodeId);
                return mt ? mt.segmentDetail ? c.jsxs("div", {
                  className: "space-y-4",
                  children: [mt.emotionKeywords && mt.emotionKeywords.length > 0 && c.jsx("div", {
                    className: "flex flex-wrap gap-1.5",
                    children: mt.emotionKeywords.map((Xt, Gn) => c.jsx("span", {
                      className: `text-xs px-2.5 py-1 rounded-full ${t ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-amber-50 text-amber-700 border border-amber-200"}`,
                      children: Xt
                    }, Gn))
                  }), mt.segmentDetail && c.jsxs("div", {
                    className: `grid grid-cols-2 gap-3 p-4 rounded-xl border ${t ? "bg-zinc-800/40 border-zinc-700/60" : "bg-zinc-50 border-zinc-200"}`,
                    children: [[{
                      label: "1. 主题",
                      value: mt.segmentDetail.subject,
                      color: "violet"
                    }, {
                      label: "2. 环境",
                      value: mt.segmentDetail.setting,
                      color: "violet"
                    }, {
                      label: "4. 镜头",
                      value: mt.segmentDetail.camera,
                      color: "violet"
                    }, {
                      label: "5. 影像风格",
                      value: mt.segmentDetail.visualStyle,
                      color: "violet"
                    }, {
                      label: "6. 声音",
                      value: mt.segmentDetail.audio,
                      color: "violet"
                    }, {
                      label: "7. 衔接",
                      value: mt.segmentDetail.transition,
                      color: "violet"
                    }].filter(Xt => Xt.value).map((Xt, Gn) => c.jsxs("div", {
                      className: "text-sm",
                      children: [c.jsx("span", {
                        className: `font-bold ${t ? "text-violet-400" : "text-violet-600"}`,
                        children: x(Xt.label)
                      }), c.jsx("div", {
                        className: `mt-1 ${t ? "text-zinc-400" : "text-zinc-600"}`,
                        children: Xt.value
                      })]
                    }, Gn)), mt.segmentDetail.timeline && mt.segmentDetail.timeline.length > 0 && c.jsxs("div", {
                      className: "col-span-2 text-sm",
                      children: [c.jsx("span", {
                        className: `font-bold ${t ? "text-violet-400" : "text-violet-600"}`,
                        children: x("3. 动作与时间线")
                      }), c.jsx("div", {
                        className: "mt-2 space-y-1.5",
                        children: mt.segmentDetail.timeline.map((Xt, Gn) => c.jsxs("div", {
                          className: `flex gap-2 p-2 rounded-lg ${t ? "bg-zinc-800/60" : "bg-white"}`,
                          children: [c.jsx("span", {
                            className: `shrink-0 font-mono text-xs font-bold px-2 py-0.5 rounded ${t ? "bg-violet-500/20 text-violet-300" : "bg-violet-100 text-violet-700"}`,
                            children: Xt.timeRange
                          }), c.jsx("span", {
                            className: `text-sm ${t ? "text-zinc-400" : "text-zinc-600"}`,
                            children: Xt.description
                          })]
                        }, Gn))
                      })]
                    }), mt.segmentDetail.narration && c.jsxs("div", {
                      className: "col-span-2 text-sm",
                      children: [c.jsx("span", {
                        className: `font-bold ${t ? "text-violet-400" : "text-violet-600"}`,
                        children: x("8. 旁白")
                      }), c.jsxs("div", {
                        className: `mt-1 italic ${t ? "text-zinc-400" : "text-zinc-600"}`,
                        children: ['"', mt.segmentDetail.narration, '"']
                      })]
                    })]
                  }), mt.hookSummary && !mt.segmentDetail && c.jsxs("div", {
                    className: `p-3 rounded-xl text-sm ${t ? "bg-zinc-800/50 text-zinc-400" : "bg-zinc-50 text-zinc-500"}`,
                    children: [c.jsx("span", {
                      className: "mr-1.5",
                      children: "🪝"
                    }), mt.hookSummary]
                  }), c.jsxs("div", {
                    children: [c.jsx("label", {
                      className: `text-xs font-medium mb-2 block ${t ? "text-zinc-400" : "text-zinc-500"}`,
                      children: x("剧本正文")
                    }), c.jsx("textarea", {
                      value: mt.content,
                      onChange: Xt => S(mt.id, {
                        content: Xt.target.value
                      }),
                      placeholder: mt.segmentDetail ? x("8 要素结构已生成，也可在此编辑原始内容...") : x("点击 ▶ 按钮 AI 生成完整剧本，或手动输入..."),
                      className: `w-full text-sm leading-relaxed p-4 rounded-xl resize-none outline-none transition-colors minimal-scrollbar ${t ? "bg-zinc-900 border border-zinc-700 text-zinc-300 placeholder-zinc-600 focus:border-amber-500/30" : "bg-white border border-zinc-200 text-zinc-700 placeholder-zinc-400 focus:border-amber-400"}`,
                      rows: Math.min(Math.max(mt.content.split(`
`).length + 2, 8), 24)
                    })]
                  }), mt.expandedScript && c.jsxs("div", {
                    children: [c.jsx("label", {
                      className: `text-xs font-medium mb-2 block ${t ? "text-violet-400" : "text-violet-600"}`,
                      children: x("扩写分镜剧本")
                    }), c.jsx("textarea", {
                      value: mt.expandedScript,
                      onChange: Xt => S(mt.id, {
                        expandedScript: Xt.target.value
                      }),
                      className: `w-full text-sm leading-relaxed p-4 rounded-xl resize-none outline-none transition-colors minimal-scrollbar ${t ? "bg-violet-500/5 border border-violet-500/20 text-zinc-300 focus:border-violet-500/40" : "bg-violet-50 border border-violet-100 text-zinc-700 focus:border-violet-300"}`,
                      rows: Math.min(Math.max(mt.expandedScript.split(`
`).length + 2, 8), 24)
                    })]
                  })]
                }) : c.jsx(man, {
                  episode: mt,
                  busy: Ae,
                  onUpdate: S,
                  onStory: E,
                  onScript: I
                }, mt.id) : c.jsx("div", {
                  className: `flex items-center justify-center h-full text-sm ${t ? "text-zinc-600" : "text-zinc-400"}`,
                  children: x("未找到该集")
                });
              })(), wt.type === "settings" && (n.extraction ? c.jsxs("div", {
                className: "space-y-6 min-w-0 w-full",
                children: [n.extraction.characters.length > 0 && c.jsxs("div", {
                  className: "min-w-0",
                  children: [c.jsxs("div", {
                    className: `flex items-center gap-2 mb-3 ${t ? "text-red-400" : "text-red-600"}`,
                    children: [c.jsx(jY, {
                      size: 16
                    }), c.jsxs("span", {
                      className: "text-sm font-bold",
                      children: [x("角色 ("), n.extraction.characters.length, ")"]
                    })]
                  }), c.jsx("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-3 min-w-0",
                    children: n.extraction.characters.map(mt => c.jsxs("div", {
                      className: `p-4 rounded-xl border transition-all min-w-0 overflow-hidden ${t ? "bg-zinc-800/40 border-zinc-700/60" : "bg-zinc-50 border-zinc-200"}`,
                      children: [c.jsxs("div", {
                        className: "flex items-center gap-2 mb-2",
                        children: [c.jsx("span", {
                          className: `w-2 h-2 rounded-full ${mt.role === "主角" ? "bg-red-500" : mt.role === "反派" ? "bg-purple-500" : mt.role === "配角" ? "bg-blue-500" : "bg-zinc-400"}`
                        }), c.jsx("span", {
                          className: `text-sm font-bold ${t ? "text-zinc-200" : "text-zinc-800"}`,
                          children: mt.name
                        }), c.jsx("span", {
                          className: `text-xs px-2 py-0.5 rounded-full ${mt.role === "主角" ? t ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-red-50 text-red-600 border border-red-200" : mt.role === "反派" ? t ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" : "bg-purple-50 text-purple-600 border border-purple-200" : t ? "bg-zinc-700 text-zinc-400 border border-zinc-600" : "bg-zinc-100 text-zinc-500 border border-zinc-200"}`,
                          children: mt.role
                        }), c.jsx("div", {
                          className: "flex-1"
                        }), c.jsxs("button", {
                          onClick: () => de == null ? void 0 : de(mt, "character"),
                          className: `shrink-0 px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${t ? "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20" : "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"}`,
                          children: [c.jsx(zu, {
                            size: 11
                          }), x(" 发送内容")]
                        })]
                      }), mt.description && c.jsx("p", {
                        className: `text-sm leading-relaxed mb-2 ${t ? "text-zinc-400" : "text-zinc-600"}`,
                        children: mt.description
                      }), yn(mt), mt.visualPrompt && c.jsx("div", {
                        className: `p-3 rounded-lg text-sm leading-relaxed break-all ${t ? "bg-zinc-900 text-amber-300/80 border border-zinc-800" : "bg-amber-50 text-amber-800 border border-amber-200"}`,
                        children: mt.visualPrompt
                      })]
                    }, mt.id))
                  })]
                }), n.extraction.scenes.length > 0 && c.jsxs("div", {
                  className: "min-w-0",
                  children: [c.jsxs("div", {
                    className: `flex items-center gap-2 mb-3 ${t ? "text-green-400" : "text-green-600"}`,
                    children: [c.jsx(sxe, {
                      size: 16
                    }), c.jsxs("span", {
                      className: "text-sm font-bold",
                      children: [x("场景 ("), n.extraction.scenes.length, ")"]
                    })]
                  }), c.jsx("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-3 min-w-0",
                    children: n.extraction.scenes.map(mt => c.jsxs("div", {
                      className: `p-4 rounded-xl border transition-all min-w-0 overflow-hidden ${t ? "bg-zinc-800/40 border-zinc-700/60" : "bg-zinc-50 border-zinc-200"}`,
                      children: [c.jsxs("div", {
                        className: "flex items-center gap-2 mb-2",
                        children: [c.jsx("span", {
                          className: "w-2 h-2 rounded-full bg-green-500"
                        }), c.jsx("span", {
                          className: `text-sm font-bold ${t ? "text-zinc-200" : "text-zinc-800"}`,
                          children: mt.name
                        }), c.jsx("div", {
                          className: "flex-1"
                        }), c.jsxs("button", {
                          onClick: () => de == null ? void 0 : de(mt, "scene"),
                          className: `shrink-0 px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${t ? "bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/20" : "bg-green-50 text-green-600 hover:bg-green-100 border border-green-200"}`,
                          children: [c.jsx(zu, {
                            size: 11
                          }), x(" 发送内容")]
                        })]
                      }), mt.description && c.jsx("p", {
                        className: `text-sm leading-relaxed mb-2 ${t ? "text-zinc-400" : "text-zinc-600"}`,
                        children: mt.description
                      }), yn(mt), mt.visualPrompt && c.jsx("div", {
                        className: `p-3 rounded-lg text-sm leading-relaxed break-all ${t ? "bg-zinc-900 text-green-300/80 border border-zinc-800" : "bg-green-50 text-green-800 border border-green-200"}`,
                        children: mt.visualPrompt
                      })]
                    }, mt.id))
                  })]
                }), n.extraction.props.length > 0 && c.jsxs("div", {
                  className: "min-w-0",
                  children: [c.jsxs("div", {
                    className: `flex items-center gap-2 mb-3 ${t ? "text-amber-400" : "text-amber-600"}`,
                    children: [c.jsx(lxe, {
                      size: 16
                    }), c.jsxs("span", {
                      className: "text-sm font-bold",
                      children: [x("道具 ("), n.extraction.props.length, ")"]
                    })]
                  }), c.jsx("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 min-w-0",
                    children: n.extraction.props.map(mt => c.jsxs("div", {
                      className: `p-4 rounded-xl border transition-all min-w-0 overflow-hidden ${t ? "bg-zinc-800/40 border-zinc-700/60" : "bg-zinc-50 border-zinc-200"}`,
                      children: [c.jsxs("div", {
                        className: "flex items-center gap-2 mb-2",
                        children: [c.jsx("span", {
                          className: "w-2 h-2 rounded-full bg-amber-500"
                        }), c.jsx("span", {
                          className: `text-sm font-bold ${t ? "text-zinc-200" : "text-zinc-800"}`,
                          children: mt.name
                        }), mt.owner && c.jsxs("span", {
                          className: `text-xs px-2 py-0.5 rounded-full ${t ? "bg-zinc-700 text-zinc-400 border border-zinc-600" : "bg-zinc-100 text-zinc-500 border border-zinc-200"}`,
                          children: [x("属于: "), mt.owner]
                        }), c.jsx("div", {
                          className: "flex-1"
                        }), c.jsxs("button", {
                          onClick: () => de == null ? void 0 : de(mt, "prop"),
                          className: `shrink-0 px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${t ? "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20" : "bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-200"}`,
                          children: [c.jsx(zu, {
                            size: 11
                          }), x(" 发送内容")]
                        })]
                      }), mt.description && c.jsx("p", {
                        className: `text-sm leading-relaxed mb-2 ${t ? "text-zinc-400" : "text-zinc-600"}`,
                        children: mt.description
                      }), yn(mt), mt.visualPrompt && c.jsx("div", {
                        className: `p-3 rounded-lg text-sm leading-relaxed break-all ${t ? "bg-zinc-900 text-amber-300/80 border border-zinc-800" : "bg-amber-50 text-amber-800 border border-amber-200"}`,
                        children: mt.visualPrompt
                      })]
                    }, mt.id))
                  })]
                })]
              }) : c.jsx("div", {
                className: `flex items-center justify-center h-full text-sm ${t ? "text-zinc-600" : "text-zinc-400"}`,
                children: x("暂无提取数据")
              }))]
            })]
          })
        }), document.body)]
      });
    return e ? c.jsxs("div", {
      className: `sw-workspace${t ? "" : " is-light"}${ue ? " has-history" : ""}`,
      children: [ue && c.jsx(qBa, {
        revisions: n.revisions || [],
        onOpenRevision: m,
        projects: r,
        currentId: a,
        busy: Ae,
        onNew: U,
        onSwitch: H,
        onDelete: Y,
        onClose: () => ge(!1)
      }), c.jsxs("main", {
        className: "sw-main",
        children: [c.jsxs("header", {
          className: "sw-header",
          children: [c.jsx("button", {
            "aria-label": x("返回工具箱"),
            title: x("返回工具箱"),
            onClick: h,
            children: c.jsx(uw, {
              size: 18
            })
          }), c.jsxs("div", {
            children: [c.jsx("span", {
              children: x("工具箱 / 剧本创作")
            }), c.jsx("input", {
              "aria-label": x("剧本名称"),
              value: n.name,
              onChange: mt => b(mt.target.value)
            })]
          }), c.jsx("span", {
            className: "sw-spacer"
          }), c.jsx("small", {
            children: x(Ae ? "创作进行中" : "自动保存")
          }), Ae && c.jsx("button", {
            "aria-label": x("停止生成"),
            title: x("停止生成"),
            onClick: F,
            children: c.jsx(Na, {
              size: 16
            })
          }), c.jsx("button", {
            "aria-label": x("创作历史"),
            title: x("创作历史"),
            "aria-pressed": ue,
            onClick: () => ge(!ue),
            children: c.jsx(Wv, {
              size: 17
            })
          })]
        }), c.jsx("div", {
          className: "sw-content",
          children: gn
        }), B && c.jsx("div", {
          className: "sw-generation-progress",
          role: "status",
          children: x(B)
        }), _e === "script" && c.jsx(HBa, {
          isDark: t,
          project: n,
          chatModels: u,
          scriptModel: d,
          scriptEffort: G,
          onSetScriptEffort: z,
          scriptPlatformGroup: V,
          onSetScriptPlatformGroup: O,
          onSetOutline: f,
          onImportTxt: v,
          onSetScriptModel: N,
          onSetScriptPromptCustom: L,
          onSetScriptSkillId: D,
          onSetEpisodeCount: y,
          onSmartSplit: _,
          onSmartSplitByDuration: w,
          onAddEpisode: k,
          onDirectEpisode: R,
          onCancelGeneration: F,
          splitProgress: l,
          busy: Ae
        }), _e === "shots" && c.jsx(GBa, {
          isDark: t,
          episodes: Ne,
          selectedId: me == null ? void 0 : me.id,
          onSelect: mt => {
            C(mt), rt(mt), He(null);
          },
          onWrite: () => ke("script"),
          onUpdateEpisode: S,
          onGenerateEpisode: I,
          onCancelGeneration: F,
          chatModels: u,
          scriptModel: d,
          onSetScriptModel: N,
          scriptEffort: G,
          onSetScriptEffort: z,
          scriptPlatformGroup: V,
          onSetScriptPlatformGroup: O,
          style: St,
          onStyle: hn,
          styles: X,
          busy: Ae,
          onStyleAssistant: () => Ot(!0),
          onManageStyles: () => Pn(!0)
        }, n.id), _e === "settings" && c.jsx(VBa, {
          isDark: t,
          chatModels: u,
          scriptModel: d,
          scriptEffort: G,
          onSetScriptEffort: z,
          scriptPlatformGroup: V,
          onSetScriptPlatformGroup: O,
          extractionModelId: be,
          onSetExtractionModelId: Ee,
          extractionSkillId: xe,
          onSetExtractionSkillId: he,
          context: Fe,
          hasSettings: Me,
          stale: Re,
          onWrite: () => ke("script"),
          onCancelGeneration: F,
          onExtract: W,
          onExtractManual: Q,
          extractProgress: ne,
          busy: Ae,
          style: Ve,
          onStyle: it,
          styles: X,
          onStyleAssistant: () => Ge(!0),
          onManageStyles: () => We(!0)
        }, n.id)]
      })]
    }) : null;
  },
  gan = g.memo(QBa),
  YBa = Object.freeze(Object.defineProperty({
    __proto__: null,
    ScriptWriterPanel: gan,
    default: gan
  }, Symbol.toStringTag, {
    value: "Module"
  }));

function XBa(e) {
  var a;
  const t = String(e.url || e.originalUrl || "").trim(),
    n = String(e._ossThumbnailUrl || e.thumbnailUrl || "").trim();
  if (!t && !n) return !1;
  const r = CDt({
    sourceKind: "world-object",
    sourceMeta: {
      asset_source: "generated",
      imported_asset_kind: "object",
      source_url: t || void 0,
      source_format: e.threeDFormat || (t ? She(t) : void 0) || (t ? "glb" : void 0),
      lod_assets: (a = e.threeDFiles) == null ? void 0 : a.map(i => ({
        format: i.format,
        level: i.fileName || i.format,
        url: i.url
      })),
      rendered_image_url: n || void 0,
      src_thumbnail_url: n || void 0,
      display_name: e.prompt || e.modelName || "3D"
    },
    sourceNodeId: e.sourceNodeId || e.id,
    title: e.prompt || e.modelName || "3D"
  });
  return r ? (nJ(r), !0) : !1;
}

function yan(e) {
  var r;
  if (e.type !== "image") return !1;
  if (String(e.falModelPath || "").trim()) return !0;
  const t = (r = e.apiConfig) == null ? void 0 : r.modelId;
  if (Uu(t) || Hh(t) || kh(t) || LPt(t) || IPt(t) || PPt(t) || su(t) || nh(t) || mp(t) || jk(t) || Nm(t) || jm(t)) return !0;
  const n = String(e.modelName || "").toLowerCase();
  return n.includes(" - fal") || /(?:^|\s)fal$/.test(n.trim());
}

function OLt(e) {
  var a;
  const t = String(e.falModelPath || "").trim();
  if (t) return t;
  const n = String(((a = e.apiConfig) == null ? void 0 : a.modelId) || "").trim();
  if (Uu(n)) return GOe;
  if (Hh(n)) return UOe;
  if (kh(n)) return KK(n, !1);
  if (LPt(n)) return DPt;
  if (IPt(n)) return SPt;
  if (PPt(n)) return MPt;
  if (su(n)) return O6t;
  if (nh(n)) return P6t;
  if (mp(n)) return rie(n, !1);
  if (jk(n)) return F6t;
  if (Nm(n)) return $6t;
  if (jm(n)) return H6t;
  const r = String(e.modelName || "").toLowerCase();
  return r.includes("mai image") ? GOe : r.includes("muse-image") || r.includes("muse image") ? UOe : "";
}

function JBa(e, t) {
  const n = t && typeof t == "object" ? t : {},
    r = String(e.remoteTaskId || n.falImageRequestId || "").trim(),
    a = String(e.falModelPath || n.falImageModelPath || OLt(e) || "").trim();
  return {
    ...e,
    remoteTaskId: r || e.remoteTaskId,
    falModelPath: a || e.falModelPath
  };
}

const Der = ({
    mode: e = "commit",
    side: t = "both",
    isDark: n = !0,
    className: r = ""
  }) => c.jsx("div", {
    className: ["node-border-beam", "pointer-events-none", "absolute", "inset-0", e === "hover" ? "node-border-beam--hover" : "node-border-beam--commit", t === "left" ? "node-border-beam--reverse" : "", n ? "node-border-beam--dark" : "node-border-beam--light", r].filter(Boolean).join(" "),
    "data-connect-glow-side": t,
    "aria-hidden": !0
  }),
  bit = new Map();

function ZBa(e, t) {
  var i;
  const n = (i = e.closest("#canvas-bg")) == null ? void 0 : i.parentElement;
  if (!n || typeof IntersectionObserver > "u") return t(!0), () => {};
  let r = bit.get(n);
  if (!r) {
    const o = new Map();
    r = {
      observer: new IntersectionObserver(l => {
        for (const d of l) {
          const u = o.get(d.target);
          u && u(d.isIntersecting);
        }
      }, {
        root: n,
        rootMargin: "64px",
        threshold: 0
      }),
      listeners: o
    }, bit.set(n, r);
  }
  r.listeners.set(e, t), r.observer.observe(e);
  const a = r;
  return () => {
    a.listeners.delete(e), a.observer.unobserve(e), a.listeners.size === 0 && (a.observer.disconnect(), bit.delete(n));
  };
}

function Ler() {
  const e = g.useRef(null),
    [t, n] = g.useState(!0);
  return g.useEffect(() => {
    let r = () => {};
    const a = () => {
      r(), n(!0), e.current && (r = ZBa(e.current, n));
    };
    return a(), window.addEventListener(go, a), () => {
      r(), window.removeEventListener(go, a);
    };
  }, []), {
    ref: e,
    visible: t
  };
}

function eFa(e, t, n, r = Date.now()) {
  return !e || e.source !== t || !Number.isFinite(n) || n <= 0 ? null : (e.time + Math.max(0, r - e.pausedAt) / 1e3) % n;
}

const YF = new Map(),
  Nze = new WeakSet();

let fte, t7e;

function BLt() {
  t7e !== void 0 && clearTimeout(t7e), t7e = void 0;
}

function tFa(e, t) {
  return Nze.has(e) ? E0() && e.closest("#canvas-bg") ? !0 : t : !1;
}

function n7e() {
  BLt();
  for (const [e, t] of YF) {
    const n = tFa(e, t);
    YF.set(e, n), n ? e.paused || e.pause() : t && e.play().catch(() => {});
  }
}

function nFa() {
  BLt(), t7e = setTimeout(n7e, 0);
}

function vit(e, t) {
  if (YF.has(e)) if (t) {
    if (Nze.add(e), !E0() || !e.closest("#canvas-bg")) return;
    YF.set(e, !0), e.paused || e.pause();
  } else Nze.delete(e) && nFa();
}

function rFa(e) {
  YF.set(e, !1);
  const t = () => {
    YF.get(e) && e.pause();
  };
  return e.addEventListener("play", t), fte || (window.addEventListener(go, n7e), fte = () => {
    window.removeEventListener(go, n7e);
  }), n7e(), () => {
    e.removeEventListener("play", t), YF.delete(e), Nze.delete(e), YF.size === 0 && (fte == null || fte(), fte = void 0, BLt());
  };
}

function aFa(e, t) {
  return t === "video" || t === "image" ? t : /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(e) ? "video" : "image";
}

function iFa({
  src: e,
  resume: t
}) {
  const n = g.useRef(null);
  return g.useLayoutEffect(() => {
    const r = n.current;
    if (!r) return;
    r.getAttribute("src") || (r.src = e);
    const a = rFa(r);
    return () => {
      var i;
      a(), (r.readyState >= 1 || ((i = t.current) == null ? void 0 : i.source) !== e) && (t.current = {
        source: e,
        time: r.currentTime || 0,
        pausedAt: Date.now()
      }), r.pause(), r.removeAttribute("src"), r.load();
    };
  }, [e, t]), c.jsx("video", {
    ref: n,
    src: e,
    className: "qiaodoumayi-generation-media-blur",
    autoPlay: !0,
    muted: !0,
    loop: !0,
    playsInline: !0,
    onLoadedMetadata: r => {
      const a = r.currentTarget,
        i = eFa(t.current, e, a.duration);
      if (i !== null) try {
        a.currentTime = i;
      } catch {}
    }
  });
}

const oFa = Ia.memo(({
    seed: e = "qiaodoumayi-generation",
    src: t,
    mediaType: n,
    progressFillRef: r,
    progressThinBarRef: a,
    className: i = ""
  }) => {
    const o = Ler(),
      s = g.useRef(null),
      l = F1t(e),
      d = typeof t == "string" ? t.trim() : "",
      u = d.length > 0,
      h = u || i.includes("qiaodoumayi-generation-overlay--poster"),
      p = u ? aFa(d, n) : "image";
    return c.jsxs("div", {
      ref: o.ref,
      "data-generation-decoration-active": o.visible ? "true" : "false",
      className: `qiaodoumayi-generation-overlay absolute inset-0 overflow-hidden pointer-events-none isolate ${i}`,
      style: {
        "--qiaodoumayi-gen-elapsed": `${l}s`,
        clipPath: "inset(0 round 16px)"
      },
      "aria-hidden": !0,
      children: [o.visible ? c.jsxs(c.Fragment, {
        children: [h ? null : c.jsx("div", {
          className: "qiaodoumayi-generation-empty"
        }), u && p === "video" ? c.jsx(iFa, {
          src: d,
          resume: s
        }, e) : null, u && p === "image" ? c.jsx("img", {
          src: d,
          className: "qiaodoumayi-generation-media-blur",
          alt: "",
          draggable: !1
        }) : null, c.jsx("div", {
          className: h ? "qiaodoumayi-generation-shadow-layer" : "qiaodoumayi-generation-shadow-layer-empty"
        }), c.jsxs("div", {
          className: "qiaodoumayi-generation-motion",
          children: [c.jsx("div", {
            className: "qiaodoumayi-generation-grid-stars"
          }), c.jsx("div", {
            className: "qiaodoumayi-generation-grid-sweep"
          }), c.jsx("div", {
            className: "qiaodoumayi-generation-sweep-glow"
          }), c.jsx("div", {
            className: "qiaodoumayi-generation-burst"
          }), c.jsx("div", {
            className: "qiaodoumayi-generation-dither"
          })]
        })]
      }) : null, c.jsx("div", {
        ref: r,
        className: "qiaodoumayi-generation-progress-probe"
      }), c.jsx("div", {
        ref: a,
        className: "qiaodoumayi-generation-progress-probe"
      })]
    });
  }),
  sFa = ({
    label: e = "生成中...",
    progress: t,
    isDark: n = !0,
    hasUnderlyingContent: r = !1,
    onCancel: a,
    className: i = ""
  }) => {
    on();
    const o = typeof t == "number" && Number.isFinite(t) ? Math.min(100, Math.max(0, Math.round(t))) : null,
      s = o != null ? `生成中 ${o}%...` : e;
    return c.jsxs("div", {
      className: `absolute inset-0 z-0 flex items-center justify-center ${i}`,
      "aria-live": "polite",
      "aria-busy": !0,
      children: [r ? null : c.jsx("div", {
        className: `absolute inset-0 ${n ? "bg-[#1f1f1f]" : "bg-zinc-400"}`,
        "aria-hidden": !0
      }), c.jsxs("div", {
        className: `relative z-10 flex items-center gap-3 rounded-md px-3 py-1.5 ${n ? "border border-white/10 bg-[#2a2a2a] shadow-[0_1px_4px_rgba(0,0,0,0.35)]" : "bg-white shadow-[0_1px_4px_rgba(0,0,0,0.18)]"} ${a ? "pointer-events-auto" : "pointer-events-none"}`,
        children: [c.jsx("span", {
          className: `text-xs font-medium whitespace-nowrap ${n ? "text-zinc-200" : "text-zinc-800"}`,
          children: s
        }), a ? c.jsx("button", {
          type: "button",
          className: `text-xs font-medium whitespace-nowrap transition-colors ${n ? "text-zinc-500 hover:text-zinc-300" : "text-zinc-400 hover:text-zinc-600"}`,
          onClick: l => {
            l.stopPropagation(), a(l);
          },
          onPointerDown: l => l.stopPropagation(),
          children: x("取消")
        }) : null]
      })]
    });
  };

function lFa() {
  return g.useSyncExternalStore(lNa, Hnn, Hnn);
}

const _wt = 2.65,
  Oer = 12,
  ban = 512,
  pfe = 29,
  kwt = 18.5,
  cFa = 64,
  dFa = {
    alpha: .12,
    scale: .78
  },
  wit = [{
    alpha: 0,
    progress: 0,
    scale: .62
  }, {
    alpha: 0,
    progress: .08,
    scale: .62
  }, {
    alpha: .12,
    progress: .17,
    scale: .78
  }, {
    alpha: .48,
    progress: .32,
    scale: 1
  }, {
    alpha: .18,
    progress: .62,
    scale: .94
  }, {
    alpha: .04,
    progress: .82,
    scale: .74
  }, {
    alpha: 0,
    progress: 1,
    scale: .62
  }];

function uFa(e) {
  let t = e;
  for (let n = 0; n < 5; n += 1) {
    const r = 1 - t,
      a = 3 * r * t * t * .58 + t * t * t,
      i = 6 * r * t * .58 + 3 * t * t * .42;
    if (i <= 1e-6) break;
    t = Math.min(1, Math.max(0, t - (a - e) / i));
  }
  return 3 * (1 - t) * t * t + t * t * t;
}

function van(e, t, n) {
  return e + (t - e) * n;
}

function hFa(e, t) {
  const n = e - t;
  if (n < 0) return {
    alpha: 0,
    scale: .68
  };
  const r = n % _wt / _wt;
  for (let a = 1; a < wit.length; a += 1) {
    const i = wit[a];
    if (r > i.progress) continue;
    const o = wit[a - 1],
      s = uFa((r - o.progress) / (i.progress - o.progress));
    return {
      alpha: van(o.alpha, i.alpha, s),
      scale: van(o.scale, i.scale, s)
    };
  }
  return {
    alpha: 0,
    scale: .62
  };
}

const Ber = (e, t) => Number.isFinite(e) ? e : t,
  wan = e => Math.max(1, Ber(e, 1));

function Ore(e, t) {
  return Math.max(0, Math.ceil((e - kwt) / t));
}

function pFa(e, t) {
  if (ban >= Ore(e, pfe) * Ore(t, pfe)) return pfe;
  let n = pfe,
    r = Math.max(pfe, e, t);
  for (let a = 0; a < 48; a += 1) {
    const i = (n + r) / 2;
    ban >= Ore(e, i) * Ore(t, i) ? r = i : n = i;
  }
  return r;
}

function mFa(e, t, n, r, a) {
  const i = e - n,
    o = t - r,
    s = .55 + .5 * ((Math.cos(4 * (Math.atan2(o, i) - .72)) + 1) / 2) ** 2.2,
    l = Math.hypot(i, o) / (a * s);
  return Math.round(1e3 * (_wt * Math.min(l, 1.15) * .62)) / 1e3;
}

function fFa(e, t, n) {
  const r = Math.min(2, Math.max(1, Ber(n, 1)));
  return Math.min(r, 2048 / e, 2048 / t, Math.sqrt(2097152 / (e * t)));
}

function gFa(e, t, n) {
  const r = wan(e),
    a = wan(t),
    i = pFa(r, a),
    o = Ore(r, i),
    s = Ore(a, i),
    l = .5 * r,
    d = .5 * a,
    u = Math.hypot(.5 * r, .5 * a),
    h = [];
  for (let m = 0; m < s; m += 1) {
    const f = kwt + m * i;
    for (let y = 0; y < o; y += 1) {
      const b = kwt + y * i;
      h.push({
        delaySeconds: mFa(b, f, l, d, u),
        x: b,
        y: f
      });
    }
  }
  const p = fFa(r, a, n);
  return {
    bitmapHeight: Math.max(1, Math.floor(a * p)),
    bitmapWidth: Math.max(1, Math.floor(r * p)),
    logicalHeight: a,
    logicalWidth: r,
    spacing: i,
    stars: h
  };
}

const yFa = [["moveTo", 10.5789, 6.59777], ["bezierCurveTo", 10.5764, 6.4234, 10.4558, 6.27331, 10.2807, 6.23039], ["bezierCurveTo", 7.93679, 5.65455, 6.69041, 4.27062, 6.28756, 1.26855], ["bezierCurveTo", 6.28683, 1.26291, 6.2856, 1.25726, 6.28437, 1.25187], ["bezierCurveTo", 6.26742, 1.11012, 6.14681, 1, 6.00016, 1], ["bezierCurveTo", 5.85352, 1, 5.73291, 1.10987, 5.71596, 1.25187], ["bezierCurveTo", 5.71473, 1.25751, 5.7135, 1.26291, 5.71277, 1.26855], ["bezierCurveTo", 5.30992, 4.27062, 4.06354, 5.65455, 1.71965, 6.23039], ["bezierCurveTo", 1.54476, 6.27307, 1.42415, 6.4234, 1.42144, 6.59777], ["lineTo", 1.42144, 6.61396], ["bezierCurveTo", 1.41825, 6.79888, 1.54746, 6.96344, 1.73414, 7.01224], ["bezierCurveTo", 3.3846, 7.44142, 5.15983, 8.44792, 5.68378, 10.0229], ["bezierCurveTo", 5.72701, 10.1529, 5.85008, 10.2446, 5.99083, 10.25], ["bezierCurveTo", 5.99378, 10.25, 6.00581, 10.25, 6.00901, 10.25], ["bezierCurveTo", 6.15001, 10.2446, 6.27282, 10.1529, 6.31606, 10.0229], ["bezierCurveTo", 6.84001, 8.44792, 8.61524, 7.44142, 10.2657, 7.01224], ["bezierCurveTo", 10.4526, 6.96344, 10.5818, 6.79888, 10.5786, 6.61396], ["lineTo", 10.5786, 6.59777], ["lineTo", 10.5789, 6.59777], ["closePath"]],
  xan = new Map();

function bFa(e, t) {
  if (typeof document > "u") return null;
  const n = `${e}:${t}`,
    r = xan.get(n);
  if (r) return r;
  const a = Math.max(1, Math.ceil(Oer * e)),
    i = document.createElement("canvas");
  i.width = a, i.height = a;
  const o = i.getContext("2d");
  if (!o) return null;
  o.setTransform(e, 0, 0, e, 0, 0), o.translate(6, 6), o.scale(7 / 12, 7 / 12), o.translate(-6, -6), o.fillStyle = t, o.beginPath();
  for (const s of yFa) s[0] === "moveTo" ? o.moveTo(s[1], s[2]) : s[0] === "lineTo" ? o.lineTo(s[1], s[2]) : s[0] === "bezierCurveTo" ? o.bezierCurveTo(s[1], s[2], s[3], s[4], s[5], s[6]) : o.closePath();
  return o.fill(), xan.set(n, i), i;
}

function vFa(e, t, n, r) {
  const a = t.bitmapWidth / t.logicalWidth,
    i = bFa(a, r == null ? void 0 : r.color);
  if (e.clearRect(0, 0, t.bitmapWidth, t.bitmapHeight), !!i) {
    for (const o of t.stars) {
      const s = r != null && r.staticFrame ? dFa : hFa(n, o.delaySeconds);
      if (s.alpha <= 0) continue;
      const l = Oer * s.scale * a;
      e.globalAlpha = s.alpha, e.drawImage(i, o.x * a - l / 2, o.y * a - l / 2, l, l);
    }
    e.globalAlpha = 1;
  }
}

class wFa {
  constructor() {
    On(this, "clients", new Map());
    On(this, "frameId", 0);
    On(this, "lastTimestamp", null);
    On(this, "nextClientId", 1);
    On(this, "drawFrame", t => {
      this.frameId = 0;
      let n = 0;
      this.lastTimestamp !== null && (n = Math.min(cFa, Math.max(0, t - this.lastTimestamp))), this.lastTimestamp = t;
      for (const r of [...this.clients.values()]) r.started ? r.elapsedMs += n : r.started = !0, r.render(r.elapsedMs);
      this.clients.size > 0 ? this.requestFrame() : this.lastTimestamp = null;
    });
  }
  register(t, n = 0) {
    const r = this.nextClientId++;
    this.clients.set(r, {
      elapsedMs: n,
      render: t,
      started: n > 0
    }), this.requestFrame();
    let a = !1;
    return () => {
      a || (a = !0, this.clients.delete(r), this.clients.size === 0 && (this.frameId && cancelAnimationFrame(this.frameId), this.frameId = 0, this.lastTimestamp = null));
    };
  }
  requestFrame() {
    !this.frameId && this.clients.size !== 0 && (this.frameId = requestAnimationFrame(this.drawFrame));
  }
}

let xit = null;

function xFa(e, t = 0) {
  return typeof requestAnimationFrame > "u" ? () => {} : (xit || (xit = new wFa()), xit.register(e, t));
}

function _Fa(e, t = 20) {
  const n = Math.min(t, Math.max(0, e));
  return n === 0 ? "0s" : `-${n}s`;
}

const E6e = .879121,
  T6e = 3,
  kFa = 16;

function AFa() {
  var e;
  return typeof window < "u" && ((e = window.matchMedia) == null ? void 0 : e.call(window, "(prefers-reduced-motion: reduce)").matches) === !0;
}

const SFa = Ia.memo(({
    seed: e = "qiaodoumayi-starfield",
    progressFillRef: t,
    progressThinBarRef: n,
    className: r = ""
  }) => {
    const a = Ler(),
      i = g.useRef(null),
      [o, s] = g.useState({
        width: 0,
        height: 0
      }),
      l = _Fa(F1t(e));
    g.useLayoutEffect(() => {
      const y = i.current,
        b = a.ref.current;
      if (!y || !b || !a.visible) return;
      const v = y.getContext("2d", {
        alpha: !0,
        desynchronized: !0
      });
      if (!v) return;
      let _ = null;
      const w = AFa(),
        k = F1t(e) * 1e3,
        A = () => {
          const E = Math.max(1, b.clientWidth),
            M = Math.max(1, b.clientHeight);
          s(T => T.width === E && T.height === M ? T : {
            width: E,
            height: M
          }), _ = gFa(E, M, window.devicePixelRatio || 1), y.width = _.bitmapWidth, y.height = _.bitmapHeight, y.style.width = `${E}px`, y.style.height = `${M}px`;
        };
      A();
      const S = E => {
        _ && vFa(v, _, E / 1e3, {
          staticFrame: w,
          color: "#f5fbff"
        });
      };
      S(k);
      const C = new ResizeObserver(A);
      C.observe(b);
      const I = w ? () => {} : xFa(S, k);
      return () => {
        I(), C.disconnect();
      };
    }, [a.ref, a.visible, e]);
    const d = T6e + E6e,
      u = Math.max(0, o.width + T6e * 2),
      h = Math.max(0, o.height + T6e * 2),
      p = Math.min(kFa + T6e, u / 2, h / 2),
      m = o.width + d * 2,
      f = o.height + d * 2;
    return c.jsxs("div", {
      ref: a.ref,
      "data-generation-decoration-active": a.visible ? "true" : "false",
      className: `qiaodoumayi-starfield-root absolute inset-0 overflow-visible pointer-events-none isolate ${r}`,
      "aria-hidden": !0,
      children: [a.visible ? c.jsxs(c.Fragment, {
        children: [c.jsxs("div", {
          className: "qiaodoumayi-starfield-overlay",
          children: [c.jsx("div", {
            className: "qiaodoumayi-starfield-bg"
          }), c.jsx("canvas", {
            ref: i,
            className: "qiaodoumayi-starfield-stars"
          })]
        }), o.width > 0 ? c.jsx("svg", {
          className: "qiaodoumayi-starfield-border",
          width: m,
          height: f,
          style: {
            left: -d,
            top: -d,
            width: m,
            height: f
          },
          children: c.jsx("rect", {
            pathLength: 1,
            x: E6e / 2,
            y: E6e / 2,
            width: u,
            height: h,
            rx: p,
            fill: "none",
            stroke: "currentColor",
            strokeDasharray: "0.98 1",
            strokeDashoffset: .98,
            strokeLinecap: "round",
            strokeWidth: E6e,
            children: c.jsx("animate", {
              attributeName: "stroke-dashoffset",
              begin: l,
              calcMode: "spline",
              dur: "20s",
              fill: "freeze",
              keySplines: "0.4 0.2 0.3 1",
              keyTimes: "0;1",
              repeatCount: "1",
              values: "0.98;0"
            })
          })
        }) : null]
      }) : null, c.jsx("div", {
        ref: t,
        className: "qiaodoumayi-generation-progress-probe"
      }), c.jsx("div", {
        ref: n,
        className: "qiaodoumayi-generation-progress-probe"
      })]
    });
  }),
  Yv = Ia.memo(e => {
    const t = lFa(),
      {
        isDark: n = !0,
        label: r,
        progress: a,
        hasUnderlyingContent: i,
        onCancel: o,
        src: s,
        className: l,
        ...d
      } = e;
    return t === "off" ? c.jsx(sFa, {
      isDark: n,
      label: r,
      progress: a,
      hasUnderlyingContent: i ?? !!(s != null && s.trim()),
      onCancel: o,
      className: l
    }) : t === "starfield" ? c.jsx(SFa, {
      seed: d.seed,
      src: s,
      mediaType: d.mediaType,
      progressFillRef: d.progressFillRef,
      progressThinBarRef: d.progressThinBarRef,
      className: l
    }) : c.jsx(oFa, {
      ...d,
      src: s,
      className: l
    });
  });

function IFa({
  items: e,
  itemHeight: t = 200,
  containerHeight: n = 500,
  renderItem: r,
  overscan: a = 2,
  className: i = "",
  getItemKey: o
}) {
  const s = g.useRef(null),
    [l, d] = g.useState(0),
    u = e.length * t,
    h = Math.max(0, Math.floor(l / t) - a),
    p = Math.min(e.length - 1, Math.ceil((l + n) / t) + a),
    m = [];
  for (let y = h; y <= p; y++) e[y] && m.push({
    item: e[y],
    index: y,
    style: {
      position: "absolute",
      top: y * t,
      left: 0,
      right: 0,
      height: t
    }
  });
  const f = g.useCallback(y => {
    d(y.currentTarget.scrollTop);
  }, []);
  return c.jsx("div", {
    ref: s,
    className: i,
    style: {
      overflow: "auto",
      height: n
    },
    onScroll: f,
    children: c.jsx("div", {
      style: {
        height: u,
        position: "relative"
      },
      children: m.map(({
        item: y,
        index: b,
        style: v
      }) => {
        const _ = o ? o(y, b) : y.id ?? b;
        return c.jsx("div", {
          style: v,
          children: r(y, b)
        }, _);
      })
    })
  });
}

const CFa = g.memo(IFa);

function Yg(e = !1) {
  return {
    loading: e ? "eager" : "lazy",
    decoding: "async",
    fetchpriority: e ? "high" : "low"
  };
}

const KG = {
    thumbnail: {
      maxSize: 128,
      quality: .35
    },
    preview: {
      maxSize: 256,
      quality: .55
    },
    full: {
      maxSize: 800,
      quality: .75
    },
    original: {
      maxSize: 1 / 0,
      quality: 1
    }
  },
  _an = ({
    src: e,
    displayWidth: t,
    displayHeight: n,
    zoom: r,
    className: a = "",
    alt: i = "",
    isDark: o = !1,
    style: s,
    objectFit: l = "contain",
    quality: d = "auto",
    isInViewport: u = !0,
    isInteracting: h = !1,
    nodeId: p,
    enableThumbnails: m = !0,
    shouldLoadContent: f = !0,
    onBlobUrlRecovery: y,
    blobRecoveryAssetIds: b
  }) => {
    on();
    const [v, _] = g.useState(() => e || null),
      [w, k] = g.useState(!1),
      A = g.useRef(null),
      S = g.useRef([]);
    g.useRef(!1), g.useRef(`img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`), g.useMemo(() => {
      let R = 0;
      return u && (R += 10), h || (R += 5), r > .5 && (R += 3), R;
    }, [u, h, r]);
    const C = g.useMemo(() => r < .25 ? .2 : r < .5 ? .4 : r < .8 ? .6 : r < 1.2 ? 1 : r < 1.8 ? 1.5 : 2, [r]),
      I = g.useMemo(() => {
        if (!f) return null;
        if (d !== "auto") switch (d) {
          case "low":
            return KG.thumbnail;
          case "medium":
            return KG.preview;
          case "high":
            return KG.full;
          case "original":
            return KG.original;
        }
        const R = t * C,
          j = n * C,
          B = Math.max(R, j);
        return B <= 128 ? {
          maxSize: 128,
          quality: .35,
          useCached: !0
        } : B <= 256 ? {
          maxSize: 256,
          quality: .55,
          useCached: !0
        } : B <= 512 ? {
          maxSize: 512,
          quality: .65,
          useCached: !0
        } : B <= 1024 ? {
          maxSize: 1024,
          quality: .72,
          useCached: !0
        } : B < 100 ? KG.thumbnail : B < 280 ? KG.preview : B < 700 ? KG.full : {
          maxSize: 1024,
          quality: .72,
          useCached: !0
        };
      }, [t, n, C, d, f]),
      E = g.useCallback(() => {
        S.current.forEach(R => {
          R.startsWith("blob:") && URL.revokeObjectURL(R);
        }), S.current = [];
      }, []),
      M = g.useCallback(R => {
        if (S.current.push(R), S.current.length > 40) {
          const j = S.current.shift();
          j && j.startsWith("blob:") && x0(j);
        }
      }, []);
    g.useEffect(() => () => {
      E();
    }, [E]);
    const T = g.useCallback(async (R, j, B) => new Promise((F, N) => {
      const G = new Image();
      G.onload = () => {
        try {
          let z = G.naturalWidth,
            V = G.naturalHeight;
          if (z > j || V > j) {
            const D = Math.min(j / z, j / V);
            z = Math.round(z * D), V = Math.round(V * D);
          }
          A.current || (A.current = document.createElement("canvas"));
          const O = A.current;
          O.width = z, O.height = V;
          const L = O.getContext("2d", {
            alpha: !0,
            willReadFrequently: !1
          });
          if (!L) {
            F(R);
            return;
          }
          L.imageSmoothingEnabled = !0, L.imageSmoothingQuality = "high", L.drawImage(G, 0, 0, z, V), O.toBlob(D => {
            if (D) {
              const U = URL.createObjectURL(D);
              M(U), F(U);
            } else F(R);
          }, "image/jpeg", B);
        } catch {
          F(R);
        }
      }, G.onerror = () => {
        F(R);
      }, G.src = R;
    }), []);
    g.useEffect(() => {
      if (!e || !f) {
        _(null);
        return;
      }
      if (!I) {
        _(null);
        return;
      }
      const R = I.maxSize === 1 / 0 || I.quality >= 1,
        j = typeof e == "string" && e.startsWith("data:") && e.length < 80 * 1024;
      if (R && j) {
        _(e);
        return;
      }
      const B = R && !j ? {
        maxSize: 1024,
        quality: .72,
        useCached: !0
      } : I;
      let F = !1;
      return (async () => {
        if (!p || !B.useCached) {
          const G = await T(e, B.maxSize, B.quality ?? .78);
          F || _(G);
          return;
        }
        try {
          const G = await Wd.getBestMatchThumbnail(p, B.maxSize);
          if (G && !F) _(G);else {
            const z = await T(e, B.maxSize, B.quality ?? .78);
            F || (_(z), p && e.startsWith("data:image") && Wd.generateAndStoreStandardSizes(p, e).catch(() => {}));
          }
        } catch {
          const z = await T(e, B.maxSize, B.quality ?? .78);
          F || _(z);
        }
      })(), () => {
        F = !0;
      };
    }, [e, I, f, T, p]), g.useEffect(() => () => {
      E();
    }, [E]);
    const P = g.useMemo(() => Yg(u && !h), [u, h]);
    return c.jsx("div", {
      className: `relative overflow-hidden ${a}`,
      style: {
        width: "100%",
        height: "100%",
        ...s
      },
      children: v ? c.jsx("img", {
        src: v,
        alt: i,
        className: "absolute inset-0 w-full h-full",
        style: {
          objectFit: l,
          imageRendering: "auto",
          WebkitFontSmoothing: "auto"
        },
        draggable: !1,
        ...P,
        onError: () => {
          e != null && e.startsWith("blob:") && y ? y(e).then(R => {
            R ? (_(R), k(!1)) : k(!0);
          }).catch(() => k(!0)) : e != null && e.startsWith("blob:") && (b != null && b.length) ? Ie(async () => {
            const {
              recoverDeadBlobUrl: R
            } = await Promise.resolve().then(() => No);
            return {
              recoverDeadBlobUrl: R
            };
          }, void 0, import.meta.url).then(({
            recoverDeadBlobUrl: R
          }) => R(e, b)).then(R => {
            R ? (_(R), k(!1)) : k(!0);
          }).catch(() => k(!0)) : k(!0);
        },
        onDoubleClick: R => {
          R.preventDefault(), R.stopPropagation(), R.nativeEvent.stopImmediatePropagation();
        }
      }) : w ? c.jsx("div", {
        className: "flex items-center justify-center",
        style: {
          width: "100%",
          height: "100%",
          backgroundColor: o ? "#27272a" : "#e4e4e7"
        },
        children: c.jsx("span", {
          className: `text-xs ${o ? "text-zinc-500" : "text-zinc-400"}`,
          children: x("加载失败")
        })
      }) : null
    });
  },
  EFa = `
@keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}
`;

if (typeof document < "u") {
  const e = "smart-image-styles";
  if (!document.getElementById(e)) {
    const t = document.createElement("style");
    t.id = e, t.textContent = EFa, document.head.appendChild(t);
  }
}

const TFa = ({
    progress: e,
    size: t = 48,
    strokeWidth: n = 4,
    isDark: r = !0,
    showPercentage: a = !0,
    className: i = ""
  }) => {
    const o = (t - n) / 2,
      s = o * 2 * Math.PI,
      l = s - e / 100 * s,
      u = e < 30 ? r ? "#3b82f6" : "#0ea5e9" : e < 70 ? r ? "#8b5cf6" : "#6366f1" : r ? "#22c55e" : "#10b981",
      h = r ? "#27272a" : "#e4e4e7";
    return c.jsxs("div", {
      className: `relative inline-flex items-center justify-center ${i}`,
      children: [c.jsxs("svg", {
        width: t,
        height: t,
        className: "transform -rotate-90",
        children: [c.jsx("circle", {
          cx: t / 2,
          cy: t / 2,
          r: o,
          fill: "none",
          stroke: h,
          strokeWidth: n
        }), c.jsx("circle", {
          cx: t / 2,
          cy: t / 2,
          r: o,
          fill: "none",
          stroke: u,
          strokeWidth: n,
          strokeLinecap: "round",
          strokeDasharray: s,
          strokeDashoffset: l,
          className: "circular-progress-ring transition-all duration-300 ease-out",
          style: {
            filter: `drop-shadow(0 0 4px ${u}40)`
          }
        }), e === 0 && c.jsx("circle", {
          cx: t / 2,
          cy: t / 2,
          r: o,
          fill: "none",
          stroke: u,
          strokeWidth: n,
          strokeLinecap: "round",
          strokeDasharray: `${s * .25} ${s * .75}`,
          className: "animate-spin origin-center",
          style: {
            transformOrigin: "center",
            animation: "spin 1.5s linear infinite"
          }
        })]
      }), a && c.jsx("div", {
        className: "absolute inset-0 flex items-center justify-center",
        style: {
          fontSize: t * .22
        },
        children: c.jsxs("span", {
          className: `font-semibold ${r ? "text-zinc-200" : "text-zinc-700"}`,
          children: [Math.round(e), "%"]
        })
      })]
    });
  },
  MFa = g.memo(TFa);

class PFa {
  constructor(t = {}) {
    On(this, "tickMs");
    On(this, "shouldPause");
    On(this, "entries", new Map());
    On(this, "timer", null);
    On(this, "nextId", 1);
    On(this, "tick", () => {
      if (this.timer = null, this.entries.size === 0) return;
      const t = Date.now();
      if (!this.shouldPause()) {
        for (const n of [...this.entries.values()]) if (!(n.nextDueAt > t)) {
          n.nextDueAt = t + n.intervalMs;
          try {
            n.callback(t);
          } catch (r) {
            console.error("[GenerationUiClock] subscriber failed:", r);
          }
        }
      }
      this.arm();
    });
    this.tickMs = Math.max(50, Math.round(t.tickMs ?? 200)), this.shouldPause = t.shouldPause ?? Yi;
  }
  subscribe(t, n) {
    const r = this.nextId++,
      a = Math.max(this.tickMs, Math.round(t));
    return this.entries.set(r, {
      intervalMs: a,
      nextDueAt: Date.now() + a,
      callback: n
    }), this.arm(), () => {
      this.entries.delete(r), this.entries.size === 0 && this.clearTimer();
    };
  }
  getStatus() {
    return {
      subscribers: this.entries.size,
      timerArmed: this.timer !== null
    };
  }
  dispose() {
    this.entries.clear(), this.clearTimer();
  }
  arm() {
    this.timer !== null || this.entries.size === 0 || (this.timer = setTimeout(this.tick, this.tickMs));
  }
  clearTimer() {
    this.timer !== null && clearTimeout(this.timer), this.timer = null;
  }
}

const FLt = new PFa(),
  RFa = 200,
  NFa = 1200,
  Fer = g.memo(({
    isGenerating: e,
    className: t = "",
    nodeId: n,
    modelId: r
  }) => {
    const a = g.useRef(null),
      i = g.useRef(null),
      o = g.useRef(!1),
      s = g.useRef(null),
      [l, d] = g.useState(!1),
      [u, h] = g.useState(!1),
      p = g.useRef(null),
      m = r && !r.endsWith("-fal") && (r.includes("kling-o1") || r.includes("kling_o1") || r.includes("kling-v3-omni") || r.includes("omni-video")),
      f = () => d(!0);
    return g.useEffect(() => {
      if (l) {
        p.current && (clearTimeout(p.current), p.current = null), h(!1);
        return;
      }
      if (e) {
        p.current && (clearTimeout(p.current), p.current = null), h(!0);
        return;
      }
      if (u) return p.current && clearTimeout(p.current), p.current = setTimeout(() => {
        p.current = null, h(!1), o.current = !1, i.current = null, d(!1);
      }, NFa), () => {
        p.current && (clearTimeout(p.current), p.current = null);
      };
    }, [e, l, u]), g.useEffect(() => {
      if (!m || !n) return;
      const y = () => f();
      return window.addEventListener("klingO1VideoComplete", y), () => {
        window.removeEventListener("klingO1VideoComplete", y);
      };
    }, [m, n]), g.useEffect(() => {
      if (!m || !n) return;
      const y = b => {
        const {
          assetId: v
        } = b.detail;
        v && v.includes(n) && f();
      };
      return window.addEventListener("assetDownloadComplete", y), () => {
        window.removeEventListener("assetDownloadComplete", y);
      };
    }, [m, n]), g.useEffect(() => {
      if (!u || l) {
        s.current && (s.current(), s.current = null);
        return;
      }
      (!o.current || i.current == null) && (i.current = n ? tJn(n) : Date.now()), o.current = !0;
      const y = (b = Date.now()) => {
        const v = a.current;
        if (!v || !i.current) return;
        const _ = (b - i.current) / 1e3;
        v.textContent = `${_.toFixed(1)}s`;
      };
      return y(), s.current || (s.current = FLt.subscribe(RFa, y)), () => {
        s.current && (s.current(), s.current = null);
      };
    }, [u, l, n]), g.useEffect(() => () => {
      var y;
      p.current && clearTimeout(p.current), (y = s.current) == null || y.call(s), s.current = null;
    }, []), !u || l ? null : c.jsx("span", {
      ref: a,
      className: t
    });
  });

Fer.displayName = "GenerationTimer";

const jFa = ({
  isGenerating: e,
  isDark: t,
  nodeId: n,
  modelId: r
}) => c.jsx(Fer, {
  isGenerating: e,
  className: `text-[9px] font-mono ${t ? "text-white/80" : "text-zinc-900"}`,
  nodeId: n,
  modelId: r
});

function DFa(e) {
  return typeof e == "string" ? e : e.value;
}

function LFa(e) {
  return typeof e == "string" ? e : e.label;
}

function Ade({
  options: e,
  value: t,
  disabled: n,
  isDark: r = !0,
  tone: a = "glass",
  size: i = "sm",
  ariaLabel: o,
  className: s = "",
  wheel: l = !1,
  onChange: d
}) {
  on();
  const u = e.map(R => ({
      value: DFa(R),
      label: LFa(R)
    })),
    h = g.useRef(null),
    p = g.useRef(0),
    m = g.useRef(null),
    [f, y] = g.useState(null),
    b = u.findIndex(R => R.value === t),
    v = b >= 0,
    _ = f ?? Math.max(0, b),
    w = v || f != null ? Math.round(Math.min(u.length - 1, Math.max(0, _))) : -1,
    k = f != null,
    A = a === "gen",
    S = i === "sm" || u.length >= 5 || u.some(R => R.label.length >= 8),
    C = g.useRef(b),
    I = g.useRef(u),
    E = g.useRef(d),
    M = g.useRef(n);
  C.current = b, I.current = u, E.current = d, M.current = n;
  const T = R => {
    const j = I.current,
      B = Math.min(j.length - 1, Math.max(0, R));
    !M.current && j[B] && E.current(j[B].value);
  };
  g.useEffect(() => {
    const R = h.current;
    if (!R || !l) return;
    const j = B => {
      const F = I.current;
      if (M.current || F.length < 2) return;
      let N = Math.abs(B.deltaY) >= Math.abs(B.deltaX) ? B.deltaY : B.deltaX;
      if (N === 0) return;
      B.deltaMode === WheelEvent.DOM_DELTA_LINE ? N *= 16 : B.deltaMode === WheelEvent.DOM_DELTA_PAGE && (N *= Math.max(R.clientHeight, 40)), B.preventDefault(), B.stopPropagation(), p.current += N;
      const G = F.length >= 8 ? 22 : 28;
      if (Math.abs(p.current) < G) return;
      const z = p.current > 0 ? 1 : -1;
      p.current = 0, T(Math.max(0, C.current) + z);
    };
    return R.addEventListener("wheel", j, {
      capture: !0,
      passive: !1
    }), () => R.removeEventListener("wheel", j, !0);
  }, [l]);
  const P = R => {
    const j = m.current;
    if (!j || R.pointerId !== j.pointerId) return;
    R.stopPropagation();
    const B = h.current,
      F = j.moved ? Math.round(Math.min(u.length - 1, Math.max(0, j.origin + (R.clientX - j.startX) / j.segW))) : Math.min(u.length - 1, Math.max(0, Math.floor((R.clientX - ((B == null ? void 0 : B.getBoundingClientRect().left) ?? 0) - 3) / j.segW)));
    m.current = null, y(null), T(F), B == null || B.addEventListener("click", N => {
      N.preventDefault(), N.stopPropagation();
    }, {
      capture: !0,
      once: !0
    });
  };
  return u.length === 0 ? null : c.jsxs("div", {
    ref: h,
    role: "tablist",
    "aria-label": o,
    className: `relative flex min-w-0 w-full flex-1 touch-none select-none items-center ${A ? "rounded-[12px] p-1 qiaodoumayi-gen-quality-pills qiaodoumayi-gen-sliding-pills" : "rounded-full p-[3px]"} ${l ? "qiaodoumayi-gen-sliding-wheel" : ""} ${r ? A ? "bg-black/35" : "bg-black/40" : A ? "bg-zinc-100" : "bg-zinc-200/90"} ${n ? "pointer-events-none opacity-50" : k ? "cursor-grabbing" : "cursor-grab"} ${s}`,
    onPointerDown: R => {
      if (n) return;
      R.stopPropagation();
      const j = h.current;
      j && (m.current = {
        pointerId: R.pointerId,
        startX: R.clientX,
        origin: Math.max(0, b),
        segW: (j.clientWidth - (A ? 8 : 6)) / u.length,
        moved: !1
      }, j.setPointerCapture(R.pointerId));
    },
    onPointerMove: R => {
      const j = m.current;
      if (!j || R.pointerId !== j.pointerId) return;
      R.stopPropagation();
      const B = R.clientX - j.startX;
      !j.moved && Math.abs(B) < 5 || (j.moved = !0, y(Math.min(u.length - 1, Math.max(0, j.origin + B / j.segW))));
    },
    onPointerUp: P,
    onPointerCancel: P,
    onMouseDown: R => R.stopPropagation(),
    onClick: R => R.stopPropagation(),
    children: [w >= 0 ? c.jsx("div", {
      className: `pointer-events-none absolute z-[1] ${A ? "qiaodoumayi-gen-sliding-thumb qiaodoumayi-gen-quality-pill bottom-1 left-1 top-1 rounded-[10px]" : `bottom-[3px] left-[3px] top-[3px] rounded-full ${r ? "bg-white/90" : "bg-white"}`}`,
      "data-quality-pill-active": A ? "true" : void 0,
      style: {
        width: `calc((100% - ${A ? 8 : 6}px) / ${u.length})`,
        transform: `translateX(${_ * 100}%)`,
        transition: k ? "none" : "transform 320ms cubic-bezier(0.32, 0.72, 0, 1)",
        ...(A ? {
          background: r ? "rgba(255, 255, 255, 0.12)" : "#fff",
          boxShadow: "none"
        } : {})
      }
    }) : null, u.map((R, j) => {
      const B = j === w;
      return c.jsx("button", {
        type: "button",
        role: "tab",
        "aria-selected": B,
        "data-quality-pill-active": B ? "true" : void 0,
        className: `relative z-10 flex min-w-0 flex-1 items-center justify-center font-medium leading-none transition-colors duration-200 ${A ? `${S ? "h-8 px-1 text-[11px]" : "h-9 px-2 text-[12px]"} ${B ? r ? "text-white" : "text-zinc-900" : r ? "text-zinc-400 hover:text-zinc-200" : "text-zinc-500 hover:text-zinc-800"}` : `h-7 px-1 text-[11px] ${B ? "text-zinc-900" : r ? "text-white/50 hover:text-white/80" : "text-zinc-500 hover:text-zinc-700"}`}`,
        onClick: F => {
          F.stopPropagation(), n || d(R.value);
        },
        onMouseDown: F => F.stopPropagation(),
        title: x(R.label),
        children: c.jsx("span", {
          className: "min-w-0 truncate",
          children: x(R.label)
        })
      }, R.value);
    })]
  });
}

function WC({
  isDark: e,
  options: t,
  selected: n,
  onSelect: r,
  ariaLabel: a,
  className: i,
  wheel: o = !1
}) {
  if (t.length === 0) return null;
  const s = n && t.some(l => l.value === n) ? n : t[0].value;
  return c.jsx(Ade, {
    isDark: e,
    tone: "gen",
    size: "md",
    options: t,
    value: s,
    ariaLabel: a,
    className: i,
    wheel: o,
    onChange: r
  });
}

let i1e = null,
  G0e;

function OFa(e, t) {
  i1e && i1e !== e && (G0e == null || G0e()), i1e = e, G0e = t;
}

function mfe(e) {
  i1e === e && (i1e = null, G0e = void 0);
}

const zer = new Map(),
  BFa = "v2";

function Uer(e, t) {
  return `${BFa}:${t}:${e}`;
}

function jze(e, t) {
  return zer.get(Uer(e, t)) ?? null;
}

function _it(e, t) {
  let n = 2166136261;
  for (let a = 0; a < e.length; a++) n ^= e.charCodeAt(a), n = Math.imul(n, 16777619);
  const r = [];
  for (let a = 0; a < t; a++) {
    n ^= a, n = Math.imul(n, 16777619);
    const i = (n >>> 0) % 1e3 / 1e3;
    r.push(.12 + i * .78);
  }
  return r;
}

function M6e(e) {
  return e.length < 2 ? 0 : Math.max(...e) - Math.min(...e);
}

function xW(e) {
  if (!e.length) return e;
  const t = Math.max(...e, 1e-6),
    n = Math.min(...e),
    r = t - n;
  return r < .02 ? e.map(a => Math.max(.12, Math.min(1, a))) : e.map(a => .1 + (a - n) / r * .86);
}

function FFa(e, t) {
  const n = e.getChannelData(0);
  if (!n.length) return [];
  const r = Math.max(1, Math.floor(n.length / t)),
    a = [];
  for (let i = 0; i < t; i++) {
    const o = i * r;
    let s = 0,
      l = 0,
      d = 0;
    for (let h = 0; h < r && o + h < n.length; h++) {
      const p = Math.abs(n[o + h]);
      d = Math.max(d, p), s += p * p, l++;
    }
    const u = l > 0 ? Math.sqrt(s / l) : 0;
    a.push(d * .55 + u * .45);
  }
  return xW(a);
}

async function zFa(e) {
  if (e.startsWith("blob:") || e.startsWith("data:")) try {
    const t = await fetch(e);
    return t.ok ? t.arrayBuffer() : null;
  } catch {
    return null;
  }
  if (e.startsWith("http://") || e.startsWith("https://")) {
    try {
      const {
          downloadWithFallback: t
        } = await Ie(async () => {
          const {
            downloadWithFallback: r
          } = await Promise.resolve().then(() => El);
          return {
            downloadWithFallback: r
          };
        }, void 0, import.meta.url),
        n = await t(e, 3e5);
      if (n.size > 0) return n.arrayBuffer();
    } catch {}
    try {
      const t = await fetch(e, {
        mode: "cors",
        credentials: "omit"
      });
      if (t.ok) return t.arrayBuffer();
    } catch {}
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
        n = await t.getAssetBlobByRemoteUrl(e);
      if (n != null && n.size) return n.arrayBuffer();
    } catch {}
  }
  return null;
}

async function $er(e, t) {
  if (!e) return null;
  const n = jze(e, t);
  if (n != null && n.length) return {
    peaks: n,
    durationSeconds: 0
  };
  try {
    const r = await zFa(e);
    if (!r) return null;
    const a = new AudioContext();
    try {
      const i = await a.decodeAudioData(r.slice(0)),
        o = FFa(i, t);
      return o.length ? (zer.set(Uer(e, t), o), {
        peaks: o,
        durationSeconds: i.duration
      }) : null;
    } finally {
      a.close();
    }
  } catch {
    return null;
  }
}

async function UFa(e, t) {
  const n = await $er(e, t);
  return (n == null ? void 0 : n.peaks) ?? null;
}

function $Fa(e, t, n = 2) {
  return !Number.isFinite(t) || t <= 0 ? n : Math.max(n, Math.round(e * t * .9));
}

const QG = 72,
  Ger = 8,
  Awt = 5,
  GFa = 4,
  kan = .05,
  VFa = 3,
  HFa = .97,
  Aan = .05,
  San = 5,
  ffe = Ger + Awt,
  Ian = "var(--studio-audio-wave-dim, rgba(153,153,153,0.6))",
  Can = "var(--studio-audio-wave, #ffffff)",
  WFa = "#38bdf8";

function Ean(e) {
  if (!Number.isFinite(e) || e < 0) return "00:00";
  const t = Math.floor(e),
    n = Math.floor(t / 60),
    r = t % 60;
  return `${String(n).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

function qFa(e) {
  return e ? `linear-gradient(to bottom, ${Can}, ${Ian})` : `linear-gradient(to bottom, ${Ian}, ${Can})`;
}

function KFa(e, t) {
  let n = Math.max(0, e);
  const r = Math.abs(t) % 5;
  return r === 2 ? n *= .3 : r === 4 && (n *= .6), n;
}

const Tan = ({
    direction: e
  }) => (on(), c.jsxs("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": !0,
    style: e === "forward" ? {
      transform: "scaleX(-1)"
    } : void 0,
    children: [c.jsx("path", {
      d: "M11.5 6.375c0-.371-.067-.734-.193-1.042-.126-.308-.305-.548-.515-.69-.209-.142-.44-.179-.663-.107-.222.072-.427.251-.587.513L6.1 10.674c-.215.352-.336.829-.336 1.326s.121.974.336 1.326l3.442 5.625c.16.262.365.441.587.513.223.072.454.035.663-.107.21-.142.389-.382.515-.69.126-.308.193-.671.193-1.042V6.375Z",
      fill: "currentColor"
    }), c.jsx("path", {
      d: "M17.235 6.375c0-.371-.067-.734-.193-1.042-.126-.308-.305-.548-.515-.69-.21-.142-.44-.179-.663-.107-.222.072-.427.251-.587.513l-3.441 5.625c-.215.352-.336.829-.336 1.326s.121.974.336 1.326l3.441 5.625c.16.262.365.441.587.513.223.072.453.035.663-.107.21-.142.389-.382.515-.69.126-.308.193-.671.193-1.042V6.375Z",
      fill: "currentColor"
    })]
  })),
  CXe = ({
    audioUrl: e,
    waveformSourceUrl: t,
    isDark: n,
    fileName: r,
    formatLabel: a,
    cornerLabel: i,
    initialDuration: o,
    onDurationResolved: s,
    playbackId: l,
    className: d = "",
    playbackRate: u = 1
  }) => {
    on();
    const h = g.useRef(null),
      p = g.useRef(null),
      m = g.useRef(null),
      f = g.useRef({
        active: !1,
        moved: !1,
        pointerId: -1,
        x: 0,
        startTime: 0,
        velocity: 0
      }),
      y = g.useRef(0),
      b = g.useRef(() => {}),
      v = l || e,
      _ = g.useRef(0),
      w = g.useRef(0),
      k = g.useRef([]),
      A = g.useRef(0),
      S = g.useRef(0),
      C = g.useRef(o && o > 0 ? o : 0),
      I = g.useRef(e),
      E = g.useRef(0),
      [M, T] = g.useState(!1),
      [P, R] = g.useState(0),
      [j, B] = g.useState(() => o && o > 0 ? o : 0),
      [F, N] = g.useState(() => xW(jze(e, QG) ?? _it(e, QG))),
      [G, z] = g.useState(0),
      [V, O] = g.useState(0);
    k.current = F, E.current = P;
    const L = g.useMemo(() => {
        const Ae = (t || "").trim();
        return Ae.startsWith("http://") || Ae.startsWith("https://") ? Ae : e.startsWith("http://") || e.startsWith("https://") ? e : "";
      }, [t, e]),
      D = g.useCallback(Ae => {
        const Fe = S.current;
        if (Fe > 0 && !Sk(e) && Ae > Fe + .05) {
          const Me = h.current;
          return Me && !Me.paused && (Me.pause(), T(!1)), Fe;
        }
        return Ae;
      }, [e]),
      U = g.useCallback((Ae, Fe = "other") => {
        if (!Number.isFinite(Ae) || Ae <= 0) return;
        const Re = Sk(L || e),
          $e = C.current;
        if (Fe === "decode") {
          if (S.current = Ae, Re && $e > 0 && Ae + .5 < $e) return;
          C.current = Re ? Math.max($e, Ae) : Ae;
        } else {
          if (S.current > 0 && !Re && Ae > S.current + 1) return;
          C.current = Math.max($e, Ae);
        }
        B(C.current), s == null || s(C.current);
      }, [s, L, e]),
      H = g.useCallback(Ae => {
        if (!Sk(L || e) && S.current > 0) return S.current;
        const Re = [];
        if (C.current > 0 && Re.push(C.current), o && o > 0 && Re.push(o), S.current > 0 && Re.push(S.current), Ae) {
          const rt = hQ(Ae);
          rt && rt > 0 && Re.push(rt);
        }
        const $e = Re.length ? Math.max(...Re) : 0;
        return $e > 0 && (C.current = $e), $e;
      }, [o, L, e]),
      Y = g.useMemo(() => yQe(e, r, a), [e, r, a]),
      K = (i || "").trim() || Y,
      W = g.useMemo(() => xW(F), [F]),
      Q = g.useCallback(Ae => {
        const Fe = xW(Ae),
          Me = M6e(Fe),
          Re = M6e(k.current);
        (Me >= Re * .45 || Me > .12 || Re < .08) && N(Fe);
      }, []);
    g.useLayoutEffect(() => {
      const Ae = m.current || p.current;
      if (!Ae) return;
      const Fe = () => {
        const Re = Ae.clientHeight,
          $e = Ae.clientWidth;
        Re > 0 && (_.current = Re, z(Re)), $e > 0 && (w.current = $e, O($e));
      };
      Fe();
      const Me = new ResizeObserver(() => Fe());
      return Me.observe(Ae), () => Me.disconnect();
    }, [e]), g.useEffect(() => {
      let Ae = !1;
      const Fe = L;
      if (!Fe) {
        M6e(k.current) < .08 && Q(_it(e || "audio", QG));
        return;
      }
      const Me = jze(Fe, QG);
      Me && Q(Me);
      const Re = async ($e = 0) => {
        const rt = await $er(Fe, QG);
        if (!Ae) {
          if (rt != null && rt.peaks.length) {
            N(xW(rt.peaks)), rt.durationSeconds > 0 && (S.current = rt.durationSeconds, U(rt.durationSeconds, "decode"));
            return;
          }
          if ($e < 2) {
            await new Promise(nt => setTimeout(nt, 1200 * ($e + 1))), Ae || (await Re($e + 1));
            return;
          }
          M6e(k.current) < .08 && Q(_it(Fe, QG));
        }
      };
      return Re(), () => {
        Ae = !0;
      };
    }, [L, e, Q, U]), g.useEffect(() => {
      const Ae = I.current !== e;
      I.current = e, Ae && (A.current = 0, R(0), S.current = 0, o && o > 0 || (C.current = 0)), o && o > 0 ? !Sk(L || e) && (C.current <= 0 || o + .8 < C.current) ? (C.current = o, B(o)) : U(o) : C.current > 0 && B(C.current);
    }, [e, o, U, L]), g.useEffect(() => {
      const Ae = L || e;
      if (!/^https?:\/\//i.test(Ae)) return;
      let Fe = !1;
      return Ie(async () => {
        const {
          probeAudioDurationSeconds: Me
        } = await Promise.resolve().then(() => yve);
        return {
          probeAudioDurationSeconds: Me
        };
      }, void 0, import.meta.url).then(({
        probeAudioDurationSeconds: Me
      }) => Me(Ae).then(Re => {
        if (!Fe && Re && Re > 0) {
          const $e = C.current;
          (!$e || Re > $e + .5) && U(Re);
        }
      })), () => {
        Fe = !0;
      };
    }, [e, L, U]), g.useEffect(() => {
      const Ae = h.current;
      if (!Ae) return;
      const Fe = () => {
          const rt = D(Ae.currentTime);
          R(rt), rt > A.current && (A.current = rt);
          const nt = hQ(Ae);
          nt && nt > 0 && U(nt);
        },
        Me = () => {
          const rt = H(Ae);
          rt > 0 && U(rt);
        },
        Re = () => {
          T(!1), mfe(v);
        },
        $e = () => {
          const rt = H(Ae);
          rt > 0 && U(rt);
        };
      return Ae.addEventListener("timeupdate", Fe), Ae.addEventListener("loadedmetadata", Me), Ae.addEventListener("durationchange", Me), Ae.addEventListener("progress", Me), Ae.addEventListener("ended", Re), Ae.addEventListener("error", $e), Me(), () => {
        Ae.removeEventListener("timeupdate", Fe), Ae.removeEventListener("loadedmetadata", Me), Ae.removeEventListener("durationchange", Me), Ae.removeEventListener("progress", Me), Ae.removeEventListener("ended", Re), Ae.removeEventListener("error", $e);
      };
    }, [e, o, H, U, D, v]), g.useEffect(() => {
      const Ae = h.current;
      if (!Ae || !M) return;
      let Fe = 0;
      const Me = () => {
        R(D(Ae.currentTime));
        const Re = hQ(Ae);
        Re && Re > 0 && U(Re), Fe = requestAnimationFrame(Me);
      };
      return Fe = requestAnimationFrame(Me), () => cancelAnimationFrame(Fe);
    }, [M, e, U, D]), g.useEffect(() => {
      const Ae = h.current;
      Ae && e && Ae.load();
    }, [e]), g.useEffect(() => {
      const Ae = h.current;
      Ae && (Ae.playbackRate = u);
    }, [u]), b.current = () => {
      const Ae = h.current;
      Ae && !Ae.paused && Ae.pause(), T(!1);
    }, g.useEffect(() => () => {
      y.current && cancelAnimationFrame(y.current), b.current(), mfe(v);
    }, [v]);
    const q = g.useCallback(() => {
        const Ae = h.current;
        Ae && !Ae.paused && Ae.pause(), T(!1), mfe(v);
      }, [v]),
      ne = g.useCallback(() => {
        const Ae = h.current;
        if (!Ae) return;
        OFa(v, () => b.current()), Ae.duration && Number.isFinite(Ae.duration) && Ae.currentTime >= Ae.duration - .05 && (Ae.currentTime = 0, R(0));
        const Fe = Ae.play();
        Fe && typeof Fe.then == "function" ? Fe.then(() => {
          T(!0);
        }).catch(Me => {
          console.warn("[AudioStripPlayer] 播放失败，尝试重新加载后播放:", Me);
          try {
            Ae.load(), Ae.play().then(() => T(!0)).catch(Re => {
              console.error("[AudioStripPlayer] 重试播放仍失败:", Re), T(!1), mfe(v);
            });
          } catch {
            T(!1), mfe(v);
          }
        }) : T(!Ae.paused);
      }, [v]),
      de = g.useCallback(Ae => {
        Ae.preventDefault(), Ae.stopPropagation(), M ? q() : ne();
      }, [M, ne, q]),
      le = g.useCallback(Ae => {
        const Fe = h.current;
        if (!Fe || !j) return;
        const Me = Math.max(0, Math.min(1, Ae)) * j;
        Fe.currentTime = Me, R(Me);
      }, [j]),
      J = g.useCallback(Ae => Fe => {
        Fe.stopPropagation();
        const Me = h.current;
        if (!Me) return;
        const Re = H(Me),
          $e = Math.max(0, Math.min(Re || Number.POSITIVE_INFINITY, Me.currentTime + Ae));
        Me.currentTime = $e, R($e);
      }, [H]),
      pe = g.useCallback(() => {
        const Ae = Math.max(1, k.current.length || QG);
        return Math.max(Ae - 1, 1) * ffe;
      }, []),
      ce = g.useCallback(Ae => {
        const Fe = p.current;
        if (!Fe || j <= 0) return;
        const Me = Fe.getBoundingClientRect(),
          Re = window.getComputedStyle(Fe),
          $e = Fe.clientWidth > 0 ? Me.width / Fe.clientWidth : 1,
          rt = (Number.parseFloat(Re.paddingLeft) || 0) * $e,
          nt = (Number.parseFloat(Re.paddingRight) || 0) * $e,
          ze = Me.width - rt - nt;
        if (ze <= 0 || $e <= 0) return;
        const Le = pe(),
          Ke = (Ae - Me.left - rt) / ze,
          Xe = Math.min(1, E.current / j);
        le(Xe + (Ke - .5) * ze / Math.max(Le * $e, 1));
      }, [le, j, pe]),
      we = g.useCallback(() => {
        y.current && cancelAnimationFrame(y.current);
        let Ae = Math.max(-San, Math.min(f.current.velocity, San));
        if (Math.abs(Ae) < Aan) return;
        const Fe = () => {
          if (Ae *= HFa, Math.abs(Ae) < Aan) {
            y.current = 0;
            return;
          }
          const Me = Math.max(pe(), 1),
            Re = Math.max(0, Math.min(j, E.current - Ae / Me * j));
          le(j > 0 ? Re / j : 0), y.current = requestAnimationFrame(Fe);
        };
        y.current = requestAnimationFrame(Fe);
      }, [j, le, pe]),
      X = g.useCallback(Ae => {
        Ae.button === 0 && (Ae.stopPropagation(), y.current && (cancelAnimationFrame(y.current), y.current = 0), Ae.currentTarget.setPointerCapture(Ae.pointerId), f.current = {
          active: !0,
          moved: !1,
          pointerId: Ae.pointerId,
          x: Ae.clientX,
          startTime: P,
          velocity: 0
        });
      }, [P]),
      Z = g.useCallback(Ae => {
        const Fe = f.current;
        if (!Fe.active || Fe.pointerId !== Ae.pointerId || j <= 0) return;
        const Me = p.current;
        if (!Me) return;
        const Re = Me.getBoundingClientRect(),
          $e = Me.clientWidth > 0 ? Re.width / Me.clientWidth : 1,
          rt = (Ae.clientX - Fe.x) / Math.max($e, .001);
        if (!Fe.moved && Math.abs(rt) < VFa) return;
        Fe.moved = !0, Fe.velocity = rt, Ae.preventDefault(), Ae.stopPropagation();
        const nt = Fe.startTime - rt / Math.max(pe(), 1) * j;
        le(j > 0 ? Math.max(0, Math.min(j, nt)) / j : 0);
      }, [j, le, pe]),
      re = g.useCallback(Ae => {
        const Fe = f.current;
        !Fe.active || Fe.pointerId !== Ae.pointerId || (Ae.stopPropagation(), Ae.currentTarget.hasPointerCapture(Ae.pointerId) && Ae.currentTarget.releasePointerCapture(Ae.pointerId), Fe.moved ? we() : ce(Ae.clientX), f.current = {
          active: !1,
          moved: !1,
          pointerId: -1,
          x: 0,
          startTime: 0,
          velocity: 0
        });
      }, [we, ce]),
      fe = g.useCallback(Ae => {
        Ae.currentTarget.hasPointerCapture(Ae.pointerId) && Ae.currentTarget.releasePointerCapture(Ae.pointerId), f.current = {
          active: !1,
          moved: !1,
          pointerId: -1,
          x: 0,
          startTime: 0,
          velocity: 0
        };
      }, []),
      ye = g.useCallback(Ae => {
        if (Ae.key === " " || Ae.key === "Enter") {
          Ae.preventDefault(), Ae.stopPropagation(), M ? q() : ne();
          return;
        }
        if (Ae.key !== "ArrowLeft" && Ae.key !== "ArrowRight") return;
        Ae.preventDefault(), Ae.stopPropagation();
        const Fe = h.current;
        if (!Fe || j <= 0) return;
        const Me = Math.max(0, Math.min(j, Fe.currentTime + (Ae.key === "ArrowRight" ? 5 : -5)));
        Fe.currentTime = Me, R(Me);
      }, [j, M, ne, q]),
      ie = j > 0 ? Math.min(1, P / j) : 0,
      ae = `${Ean(P)}/${Ean(j)}`,
      be = Math.max(1, W.length),
      Ee = w.current || V,
      xe = Math.max(8, Math.ceil(Math.max(Ee, 260) / 2 / ffe) + 2),
      he = xe + be + xe,
      ue = he * ffe - Awt,
      ge = `translateX(${-(xe * ffe + ie * Math.max(be - 1, 0) * ffe)}px)`,
      _e = _.current || G,
      ke = Ae => {
        const Fe = Ae ? 1 : .25,
          Me = [];
        for (let Re = 0; Re < he; Re++) {
          const $e = Re - xe,
            rt = $e >= 0 && $e < be,
            nt = KFa(rt ? W[$e] ?? kan : kan, $e),
            ze = Math.max(2, Math.round(nt * (_e || 120) * .8)),
            Le = Math.abs($e) % 2 === 1;
          Me.push(c.jsx("div", {
            className: "shrink-0 self-center",
            style: {
              width: Ger,
              height: `${ze}px`,
              minHeight: 2,
              marginRight: Re === he - 1 ? 0 : Awt,
              borderRadius: GFa,
              background: qFa(Le),
              opacity: Fe * (.4 + nt * .6)
            }
          }, Re));
        }
        return Me;
      },
      ve = n ? "border-white/10 bg-[#1f1f1f]" : "border-black/10 bg-[#f3f3f3]",
      Te = `var(--design-surface, ${n ? "#1f1f1f" : "#f3f3f3"})`,
      Ne = `linear-gradient(to right, ${Te} 0%, transparent 15%, transparent 85%, ${Te} 100%)`,
      me = `var(--studio-design-accent, ${n ? WFa : "#0284c7"})`;
    return c.jsxs("div", {
      className: `group/audio relative flex h-full min-h-0 w-full flex-col ${d}`,
      "data-playing": M ? "true" : "false",
      onDoubleClick: Ae => Ae.stopPropagation(),
      children: [c.jsx("video", {
        ref: h,
        src: e || void 0,
        preload: "auto",
        playsInline: !0,
        style: {
          position: "absolute",
          width: 1,
          height: 1,
          opacity: .01,
          pointerEvents: "none",
          zIndex: -1
        }
      }), c.jsxs("div", {
        "data-node-edge-chrome": "true",
        "data-audio-strip-surface": !0,
        "aria-label": x("音频播放器 {0}", K),
        className: `relative flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border ${ve}`,
        children: [c.jsxs("div", {
          className: "relative mt-4 flex min-h-0 w-full flex-1 items-center justify-center",
          children: [c.jsx("div", {
            className: "pointer-events-none absolute inset-0 z-20",
            style: {
              background: Ne
            }
          }), c.jsxs("div", {
            ref: p,
            role: "slider",
            "aria-label": "Audio waveform scrubber",
            "aria-valuemin": 0,
            "aria-valuemax": j || 0,
            "aria-valuenow": P,
            tabIndex: 0,
            "data-audio-strip-waveform": !0,
            className: "relative z-10 h-[120px] w-full cursor-grab touch-none select-none overflow-visible px-4 active:cursor-grabbing",
            onPointerDown: X,
            onPointerMove: Z,
            onPointerUp: re,
            onPointerCancel: fe,
            onKeyDown: ye,
            children: [c.jsxs("div", {
              ref: m,
              "aria-hidden": !0,
              className: "pointer-events-none absolute inset-0 overflow-hidden",
              children: [c.jsx("div", {
                className: "absolute inset-y-0 left-1/2 flex will-change-transform items-center",
                style: {
                  width: ue,
                  transform: ge
                },
                children: ke(!1)
              }), c.jsx("div", {
                className: "absolute inset-0 overflow-hidden",
                style: {
                  clipPath: "inset(0 50% 0 0)"
                },
                children: c.jsx("div", {
                  className: "absolute inset-y-0 left-1/2 flex will-change-transform items-center",
                  style: {
                    width: ue,
                    transform: ge
                  },
                  children: ke(!0)
                })
              })]
            }), c.jsxs("div", {
              className: "group/head absolute inset-y-[10%] left-1/2 z-30 flex -translate-x-1/2 cursor-pointer flex-col items-center px-1",
              "aria-hidden": !0,
              children: [c.jsx("svg", {
                width: "10",
                height: "6",
                viewBox: "0 0 10 6",
                className: "shrink-0",
                children: c.jsx("path", {
                  d: "M0 0h10L5 6z",
                  fill: me
                })
              }), c.jsx("div", {
                className: "w-0.5 flex-1 rounded-full transition-[width] duration-150 group-hover/head:w-1",
                style: {
                  backgroundColor: me
                }
              }), c.jsxs("div", {
                className: `pointer-events-none absolute left-1/2 top-full mt-1 flex -translate-x-1/2 flex-col items-center transition-opacity duration-150 ${M ? "opacity-100" : "opacity-0 group-hover/head:opacity-100"}`,
                children: [c.jsx("svg", {
                  width: "8",
                  height: "4",
                  viewBox: "0 0 8 4",
                  className: "-mb-px",
                  children: c.jsx("path", {
                    d: "M0 4L4 0l4 4z",
                    fill: me
                  })
                }), c.jsx("span", {
                  className: "whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-medium text-white tabular-nums",
                  style: {
                    backgroundColor: me,
                    color: "var(--studio-design-on-accent, white)"
                  },
                  children: ae
                })]
              })]
            })]
          })]
        }), c.jsx("div", {
          className: "flex shrink-0 cursor-default select-none flex-col items-center justify-end gap-2 pb-4 pt-2",
          children: c.jsxs("div", {
            className: "flex items-center justify-center gap-6",
            children: [c.jsx("button", {
              type: "button",
              "data-audio-strip-interactive": "skip-back",
              onClick: J(-10),
              onPointerDown: Ae => Ae.stopPropagation(),
              onMouseDown: Ae => Ae.stopPropagation(),
              className: `flex h-6 w-6 items-center justify-center transition-colors ${n ? "text-[#808080] hover:text-white/90" : "text-zinc-500 hover:text-zinc-900"}`,
              "aria-label": "rewind 10s",
              title: x("后退 10 秒"),
              children: c.jsx(Tan, {
                direction: "back"
              })
            }), c.jsx("button", {
              type: "button",
              "data-audio-strip-interactive": "play",
              onClick: de,
              onPointerDown: Ae => Ae.stopPropagation(),
              onMouseDown: Ae => Ae.stopPropagation(),
              className: `flex h-9 w-9 items-center justify-center rounded-full transition-colors ${n ? "bg-[#e5e5e5] text-[#1a1a1a] hover:bg-white" : "bg-zinc-900 text-white hover:bg-black"}`,
              title: x(M ? "暂停" : "播放"),
              "aria-label": M ? "pause" : "play",
              children: M ? c.jsx(d3, {
                size: 16,
                fill: "currentColor"
              }) : c.jsx(Ol, {
                size: 16,
                className: "ml-0.5",
                fill: "currentColor"
              })
            }), c.jsx("button", {
              type: "button",
              "data-audio-strip-interactive": "skip-forward",
              onClick: J(10),
              onPointerDown: Ae => Ae.stopPropagation(),
              onMouseDown: Ae => Ae.stopPropagation(),
              className: `flex h-6 w-6 items-center justify-center transition-colors ${n ? "text-[#808080] hover:text-white/90" : "text-zinc-500 hover:text-zinc-900"}`,
              "aria-label": "fast forward 10s",
              title: x("前进 10 秒"),
              children: c.jsx(Tan, {
                direction: "forward"
              })
            })]
          })
        })]
      })]
    });
  },
  Ver = 6,
  QFa = 22,
  Her = 14;

function YFa(e) {
  const t = Number(e || 1);
  if (!Number.isFinite(t) || t <= 0 || t >= .88) return 1;
  const n = 1 / t;
  return Math.min(Math.max(n, 1), 2.6);
}

function mJ(e) {
  const t = e.x + e.width / 2,
    n = e.y;
  return {
    left: t,
    top: n,
    transform: `translate(-50%, calc(-100% - ${Her}px))`,
    transformOrigin: "bottom center"
  };
}

function Swt(e, t) {
  const n = mJ(t);
  e.style.left = `${n.left}px`, e.style.top = `${n.top}px`, e.style.transform = n.transform, e.style.transformOrigin = n.transformOrigin;
}

const Wer = "box-select-marquee-rect";

function XFa(e) {
  return `text-[13px] font-medium leading-none whitespace-nowrap pointer-events-auto select-none px-2 py-1 ${e ? "text-white/90" : "text-zinc-800/90"}`;
}

function qer(e) {
  return e ? "bg-zinc-900 border-zinc-800" : "bg-[#f6f6f6] border-zinc-200";
}

function fJ(e) {
  return `rounded-full border overflow-hidden ${qer(e)}`;
}

function UP(e) {
  return `input-node-fast-tooltip ${e ? "input-node-fast-tooltip--dark" : "input-node-fast-tooltip--light"} flex h-12 items-center gap-1 p-1 ${fJ(e)}`;
}

function $P(e, t = !1, n = "") {
  return `relative z-0 w-10 h-10 flex items-center justify-center rounded-full ${n} ${t ? "text-white" : e ? "text-white/90" : "text-zinc-700"}`.replace(/\s+/g, " ").trim();
}

function fpe(e) {
  return `w-px h-[18px] mx-2 shrink-0 self-center ${e ? "bg-white/10" : "bg-black/10"}`;
}

const zLt = {
  "#ffffff": {
    fillDark: "rgba(255, 255, 255, 0.045)",
    fillLight: "rgba(0, 0, 0, 0.028)",
    borderDark: "rgba(255, 255, 255, 0.2)",
    borderLight: "rgba(0, 0, 0, 0.2)",
    swatchDark: "#525252",
    swatchLight: "#a3a3a3"
  },
  "#ef4444": {
    fillDark: "rgba(58, 38, 38, 0.72)",
    fillLight: "rgba(180, 120, 120, 0.1)",
    borderDark: "rgba(108, 68, 68, 0.38)",
    borderLight: "rgba(160, 90, 90, 0.22)",
    swatchDark: "#8b5050",
    swatchLight: "#c49090"
  },
  "#f97316": {
    fillDark: "rgba(62, 42, 32, 0.7)",
    fillLight: "rgba(190, 130, 100, 0.1)",
    borderDark: "rgba(118, 72, 52, 0.36)",
    borderLight: "rgba(170, 110, 80, 0.22)",
    swatchDark: "#946040",
    swatchLight: "#c89878"
  },
  "#eab308": {
    fillDark: "rgba(52, 48, 28, 0.68)",
    fillLight: "rgba(190, 170, 100, 0.1)",
    borderDark: "rgba(108, 96, 52, 0.34)",
    borderLight: "rgba(160, 140, 70, 0.22)",
    swatchDark: "#8a7840",
    swatchLight: "#c4b070"
  },
  "#22c55e": {
    fillDark: "rgba(32, 48, 38, 0.68)",
    fillLight: "rgba(110, 160, 130, 0.1)",
    borderDark: "rgba(55, 95, 72, 0.36)",
    borderLight: "rgba(90, 140, 110, 0.22)",
    swatchDark: "#4a7558",
    swatchLight: "#88b898"
  },
  "#06b6d4": {
    fillDark: "rgba(28, 44, 52, 0.68)",
    fillLight: "rgba(100, 150, 170, 0.1)",
    borderDark: "rgba(50, 88, 102, 0.36)",
    borderLight: "rgba(80, 130, 150, 0.22)",
    swatchDark: "#3d6878",
    swatchLight: "#78a8b8"
  },
  "#3b82f6": {
    fillDark: "rgba(32, 40, 58, 0.68)",
    fillLight: "rgba(110, 140, 190, 0.1)",
    borderDark: "rgba(55, 75, 110, 0.36)",
    borderLight: "rgba(90, 120, 170, 0.22)",
    swatchDark: "#4a6088",
    swatchLight: "#88a0c8"
  },
  "#8b5cf6": {
    fillDark: "rgba(42, 36, 56, 0.68)",
    fillLight: "rgba(150, 130, 190, 0.1)",
    borderDark: "rgba(85, 72, 110, 0.36)",
    borderLight: "rgba(120, 100, 160, 0.22)",
    swatchDark: "#645080",
    swatchLight: "#a090c0"
  }
};

function ULt(e) {
  return /^#[0-9a-fA-F]{6}$/.test(e) ? {
    r: parseInt(e.slice(1, 3), 16),
    g: parseInt(e.slice(3, 5), 16),
    b: parseInt(e.slice(5, 7), 16)
  } : null;
}

function JFa(e, t) {
  const n = ULt(e);
  if (!n) return t ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)";
  const r = t ? .28 : .72,
    a = Math.round(n.r * r + (t ? 26 : 248) * (1 - r)),
    i = Math.round(n.g * r + (t ? 26 : 248) * (1 - r)),
    o = Math.round(n.b * r + (t ? 26 : 248) * (1 - r));
  return `rgba(${a}, ${i}, ${o}, ${t ? .62 : .11})`;
}

function ZFa(e, t) {
  const n = ULt(e);
  if (!n) return t ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.1)";
  const r = t ? .38 : .58,
    a = Math.round(n.r * r + (t ? 38 : 225) * (1 - r)),
    i = Math.round(n.g * r + (t ? 38 : 225) * (1 - r)),
    o = Math.round(n.b * r + (t ? 38 : 225) * (1 - r));
  return `rgba(${a}, ${i}, ${o}, ${t ? .36 : .2})`;
}

function eza(e, t) {
  const n = ULt(e);
  if (!n) return t ? "#525252" : "#a3a3a3";
  const r = t ? .42 : .55,
    a = Math.round(n.r * r + (t ? 45 : 210) * (1 - r)),
    i = Math.round(n.g * r + (t ? 45 : 210) * (1 - r)),
    o = Math.round(n.b * r + (t ? 45 : 210) * (1 - r));
  return `rgb(${a}, ${i}, ${o})`;
}

function tza(e, t) {
  const n = zLt[e.toLowerCase()];
  return n ? t ? n.fillDark : n.fillLight : JFa(e, t);
}

function $Lt(e, t) {
  const n = zLt[e.toLowerCase()];
  return n ? t ? n.borderDark : n.borderLight : e === "#ffffff" ? t ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" : ZFa(e, t);
}

function nza(e, t) {
  return e.toLowerCase() === "#ffffff" ? t ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" : $Lt(e, t);
}

function rza(e, t) {
  return e.toLowerCase() === "#ffffff" ? t ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)" : $Lt(e, t);
}

function Man(e, t) {
  const n = zLt[e.toLowerCase()];
  return n ? t ? n.swatchDark : n.swatchLight : eza(e, t);
}

function aza() {
  var t;
  if (typeof window > "u" || !window.localStorage) return {
    path: "AIYOUPLUS_Media",
    isAbsolute: !1
  };
  const e = (t = localStorage.getItem("qiaodoumayi_download_directory")) == null ? void 0 : t.trim();
  if (e) {
    const n = e.startsWith("/") || /^[A-Za-z]:[/\\]/.test(e) || e.startsWith("\\\\");
    return {
      path: e,
      isAbsolute: n
    };
  }
  return {
    path: "AIYOUPLUS_Media",
    isAbsolute: !1
  };
}

async function Pan(e, t) {
  const {
    path: n,
    isAbsolute: r
  } = aza();
  let a, i;
  if (r) {
    a = n, i = await Vu(n, t);
    try {
      (await Fp(a)) || (await qc(a, {
        recursive: !0
      }), console.log(`✅ 已创建文件夹: ${a}`));
    } catch (o) {
      console.warn("[saveToDisk] 绝对路径创建失败，尝试使用默认目录:", o);
      const s = await Fht();
      return a = await Vu(s, "AIYOUPLUS_Media"), i = await Vu(a, t), (await Fp(a)) || (await qc(a, {
        recursive: !0
      })), await wE(i, e), console.log(`✅ 文件已保存（使用默认目录）: ${i}`), i;
    }
    await wE(i, e);
  } else {
    const o = await Fht();
    a = await Vu(o, n), i = await Vu(a, t), (await Fp(a)) || (await qc(a, {
      recursive: !0
    }), console.log(`✅ 已创建文件夹: ${a}`)), await wE(i, e);
  }
  return console.log(`✅ 文件已保存: ${i}`), i;
}

async function GLt(e, t) {
  const n = await e.arrayBuffer(),
    r = new Uint8Array(n),
    a = s_(t);
  try {
    return await Pan(r, a);
  } catch (i) {
    const o = a.match(/(\.[^.]+)$/),
      s = (o == null ? void 0 : o[1]) ?? "",
      l = s_(`download_${Date.now()}${s}`, 40);
    try {
      return console.warn("[saveToDisk] Retrying with short filename after error:", i), await Pan(r, l);
    } catch (d) {
      throw console.error("❌ 保存文件失败:", d), new Error(`保存文件失败: ${d instanceof Error ? d.message : String(d)}`);
    }
  }
}

async function iza(e) {
  const t = [];
  for (const n of e) try {
    const r = await GLt(n.blob, n.filename);
    t.push(r);
  } catch (r) {
    console.error(`❌ 保存 ${n.filename} 失败:`, r);
  }
  return t;
}

const Sde = Object.freeze(Object.defineProperty({
    __proto__: null,
    saveBatchToDisk: iza,
    saveToDisk: GLt
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  kit = 1152;

function oza(e) {
  const n = (e || "").toLowerCase().endsWith(".mp3") ? e : `${e.replace(/\.[^.]+$/, "") || "audio"}.mp3`;
  return s_(n);
}

async function Ker(e) {
  try {
    if (e.startsWith("blob:") || e.startsWith("data:")) {
      const t = await fetch(e);
      return t.ok ? t.blob() : null;
    }
    if (e.startsWith("http://") || e.startsWith("https://")) {
      if (typeof window < "u" && "__TAURI__" in window) try {
        const {
          downloadWithFallback: r
        } = await Ie(async () => {
          const {
            downloadWithFallback: a
          } = await Promise.resolve().then(() => El);
          return {
            downloadWithFallback: a
          };
        }, void 0, import.meta.url);
        return await r(e, 12e4);
      } catch {}
      const n = await fetch(e, {
        method: "GET",
        mode: "cors"
      });
      return n.ok ? n.blob() : null;
    }
  } catch {
    return null;
  }
  return null;
}

function Ran(e) {
  const t = new Int16Array(e.length);
  for (let n = 0; n < e.length; n++) {
    const r = Math.max(-1, Math.min(1, e[n]));
    t[n] = r < 0 ? r * 32768 : r * 32767;
  }
  return t;
}

async function Qer(e, t) {
  try {
    const n = await Ker(e);
    return n ? Yer(n, t) : null;
  } catch {
    return null;
  }
}

async function Yer(e, t) {
  try {
    const r = await e.arrayBuffer(),
      i = await new (window.AudioContext || window.webkitAudioContext)().decodeAudioData(r.slice(0)),
      o = i.numberOfChannels,
      s = i.sampleRate,
      l = i.getChannelData(0),
      d = o > 1 ? i.getChannelData(1) : l,
      u = await Ie(() => Promise.resolve().then(() => Bmr), void 0, import.meta.url),
      p = (u.default ?? u).Mp3Encoder;
    if (!p) throw new Error("lamejs.Mp3Encoder not found");
    const m = new p(o, s, 128),
      f = Ran(l),
      y = o > 1 ? Ran(d) : f,
      b = [];
    for (let A = 0; A < f.length; A += kit) {
      const S = f.subarray(A, A + kit),
        C = y.subarray(A, A + kit),
        I = m.encodeBuffer(S, C);
      I.length > 0 && b.push(I);
    }
    const v = m.flush();
    v.length > 0 && b.push(v);
    const _ = b.reduce((A, S) => A + S.length, 0),
      w = new Uint8Array(_);
    let k = 0;
    for (const A of b) w.set(A, k), k += A.length;
    return new Blob([w], {
      type: "audio/mpeg"
    });
  } catch {
    return null;
  }
}

async function VLt(e, t, n) {
  const r = oza(t);
  try {
    let a = null;
    return (n == null ? void 0 : n.preferMp3) !== !1 && (a = await Qer(e)), a || (a = await Ker(e)), a ? (await GLt(a, r), !0) : !1;
  } catch (a) {
    return console.error("[audioToMp3] downloadAudioToUserFolder failed:", a), !1;
  }
}

async function Xer(e, t) {
  return VLt(e, t, {
    preferMp3: !0
  });
}

const sza = 4e3,
  lza = 200;

function cza(e) {
  if (!e.length) {
    const o = sza / 2;
    return {
      minX: -o,
      minY: -o,
      maxX: o,
      maxY: o
    };
  }
  let t = 1 / 0,
    n = 1 / 0,
    r = -1 / 0,
    a = -1 / 0;
  for (const o of e) {
    const s = Number.isFinite(o.x) ? o.x : 0,
      l = Number.isFinite(o.y) ? o.y : 0,
      d = Number.isFinite(o.width) && o.width > 0 ? o.width : 200,
      u = Number.isFinite(o.height) && o.height > 0 ? o.height : 120;
    t = Math.min(t, s), n = Math.min(n, l), r = Math.max(r, s + d), a = Math.max(a, l + u);
  }
  const i = lza;
  return {
    minX: t - i,
    minY: n - i,
    maxX: r + i,
    maxY: a + i
  };
}

function Jer(e, t) {
  return t.find(n => n.collapsed && n.nodeIds.includes(e));
}

function Zer(e, t, n) {
  const r = Jer(e.id, t),
    a = Number.isFinite(e.width) && e.width > 0 ? e.width : 200,
    i = Number.isFinite(e.height) && e.height > 0 ? e.height : 120;
  if (!r || r.collapsedX == null || r.collapsedY == null) return {
    x: e.x,
    y: e.y,
    width: a,
    height: i
  };
  const {
    halfWidth: o,
    halfHeight: s
  } = Kue(r, n);
  return {
    x: r.collapsedX - o,
    y: r.collapsedY - s,
    width: o * 2,
    height: s * 2
  };
}

function dza(e, t) {
  return e.map(n => {
    if (!Jer(n.id, t)) return n;
    const r = Zer(n, t, e);
    return {
      ...n,
      x: r.x,
      y: r.y,
      width: r.width,
      height: r.height
    };
  });
}

const etr = "__nav_stack__:";

function uza(e, t) {
  var a;
  const n = new Set(),
    r = [];
  for (const i of t) {
    if (!i.collapsed || !((a = i.nodeIds) != null && a.length)) continue;
    i.nodeIds.forEach(d => n.add(d));
    const o = i.nodeIds[0],
      s = o ? e.find(d => d.id === o) : void 0;
    if (!s || i.collapsedX == null || i.collapsedY == null) continue;
    const l = Zer(s, t, e);
    r.push({
      ...s,
      id: `${etr}${i.id}`,
      x: l.x,
      y: l.y,
      width: l.width,
      height: l.height
    });
  }
  for (const i of e) n.has(i.id) || r.push(i);
  return r;
}

function Dze(e) {
  var t;
  return ((t = e.name) == null ? void 0 : t.trim()) || (e.stackMode === "card" ? "叠卡" : "收纳");
}

function ttr(e, t) {
  const n = e.stackMode === "card" ? "已折叠" : "已收纳";
  return `${t} 个节点 · ${n}`;
}

function ntr(e, t) {
  var a;
  const n = new Set(),
    r = [];
  for (const i of t) {
    if (!i.collapsed || !((a = i.nodeIds) != null && a.length)) continue;
    const o = i.nodeIds.map(s => e.find(l => l.id === s)).filter(s => !!s);
    o.length && (o.forEach(s => n.add(s.id)), r.push({
      kind: "collapsed-group",
      group: i,
      thumbNode: o[0],
      memberNodes: o,
      memberCount: o.length
    }));
  }
  for (const i of e) n.has(i.id) || r.push({
    kind: "node",
    node: i
  });
  return r;
}

function P6e(e) {
  return e.kind === "node" ? e.node.id : `${etr}${e.group.id}`;
}

function Uie(e, t) {
  if (!t) return !0;
  if (!e) return !1;
  const n = e.toLowerCase();
  let r = 0;
  for (let a = 0; a < t.length; a++) {
    const i = n.indexOf(t[a], r);
    if (i < 0) return !1;
    r = i + 1;
  }
  return !0;
}

function Iwt(e, t) {
  return t ? Uie(ike(e), t) || Uie(WLt(e), t) || Uie(HLt(e), t) : !0;
}

function hza(e, t, n) {
  return n !== "all" && !(e.kind === "node" ? [e.node] : e.memberNodes).some(a => qLt(a) === n) ? !1 : t ? e.kind === "node" ? Iwt(e.node, t) : Uie(Dze(e.group), t) || Uie(ttr(e.group, e.memberCount), t) || e.memberNodes.some(r => Iwt(r, t)) : !0;
}

const pza = 400;

function mza(e) {
  return e.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function fza(e) {
  return /^(https?:|blob:|data:|asset:|content:|tauri:)/i.test(e) || /\.(png|jpe?g|webp|gif|mp4|webm|mov|mp3|wav|ogg)(\?|#|$)/i.test(e);
}

function HLt(e, t = pza) {
  const n = e.settings || {},
    r = [typeof e.content == "string" ? e.content : "", typeof e.prompt == "string" ? e.prompt : "", typeof n.prompt == "string" ? n.prompt : "", typeof n.text == "string" ? n.text : ""];
  for (const a of r) {
    const i = mza(a);
    if (!(!i || fza(i))) return i.length > t ? `${i.slice(0, t)}...` : i;
  }
  return "";
}

function ike(e) {
  var a, i, o, s;
  if (e.type === "director-3d") return ((a = e.nodeName) == null ? void 0 : a.trim()) || "3D导演台";
  if (e.type === "three-d-studio") return ((i = e.nodeName) == null ? void 0 : i.trim()) || "3D Studio";
  if (e.type === "gen-3d") return ((o = e.nodeName) == null ? void 0 : o.trim()) || "3D";
  const t = e.settings,
    n = (s = e.nodeName) == null ? void 0 : s.trim();
  if (n) return n;
  if (typeof (t == null ? void 0 : t.aiRoleName) == "string" && t.aiRoleName.trim()) return t.aiRoleName.trim();
  if (typeof (t == null ? void 0 : t.musicTitle) == "string" && t.musicTitle.trim()) return t.musicTitle.trim();
  const r = HLt(e, 40);
  return r || "未命名节点";
}

const gza = {
  "gen-video": "视频",
  "video-input": "视频",
  "motion-control": "视频",
  "video-relight": "视频",
  "video-analyze": "视频",
  "shot-breakdown": "视频",
  "video-timeline": "视频",
  "smart-clip": "剪辑",
  "generate-character-video": "视频",
  "generate-scene-video": "视频",
  "camera-movement": "视频",
  "professional-camera": "视频",
  "gen-image": "图片",
  "input-image": "图片",
  "canvas-node": "图片",
  "doodle-canvas": "图片",
  "image-compare": "图片",
  "image-tile": "图片",
  "virtual-try-on": "图片",
  "fal-rembg": "图片",
  "topaz-upscale": "图片",
  "jimeng-super-resolution": "图片",
  "inpaint-crop": "图片",
  "inpaint-stitch": "图片",
  "generate-character-image": "图片",
  "generate-scene-image": "图片",
  "create-character": "图片",
  "create-scene": "图片",
  "gen-music": "音频",
  "gen-speech": "音频",
  "text-node": "文本",
  "novel-input": "文本",
  "script-parse": "文本",
  "character-description": "文本",
  "scene-description": "文本",
  "extract-characters-scenes": "文本",
  "table-editor-node": "文本",
  "storyboard-node": "分镜",
  "storyboard-chart-node": "分镜",
  "custom-agent": "文本",
  "director-3d": "导演台",
  "gen-3d": "3D",
  "three-d-studio": "3D",
  "global-perspective": "3D"
};

function WLt(e) {
  return e.type === "preview" ? e.previewType === "video" ? "视频" : e.previewType === "audio" ? "音频" : "图片" : gza[e.type] || ED(e.type).replace(/节点$/, "") || "节点";
}

function yza(e, t) {
  var o, s, l, d;
  const n = new Set(),
    r = [];
  for (const u of t) {
    if (u.collapsed || !((o = u.nodeIds) != null && o.length)) continue;
    const h = u.nodeIds.map(p => e.find(m => m.id === p)).filter(p => !!p);
    h.length && (h.forEach(p => n.add(p.id)), r.push({
      id: u.id,
      name: ((s = u.name) == null ? void 0 : s.trim()) || "未命名组",
      nodes: h,
      isGroup: !0
    }));
  }
  for (const u of t) {
    if (!u.collapsed || !((l = u.nodeIds) != null && l.length)) continue;
    const h = u.nodeIds.map(f => e.find(y => y.id === f)).filter(f => !!f);
    if (!h.length) continue;
    h.forEach(f => n.add(f.id));
    const p = ((d = u.name) == null ? void 0 : d.trim()) || (u.stackMode === "card" ? "叠卡" : "收纳"),
      m = u.stackMode === "card" ? " · 已折叠" : " · 已收纳";
    r.push({
      id: u.id,
      name: p + m,
      nodes: [],
      isGroup: !0,
      isCollapsed: !0,
      collapsedMemberNodes: h,
      collapsedMemberCount: h.length
    });
  }
  const i = dza(e, t).filter(u => !n.has(u.id));
  return {
    groups: r,
    ungroupedNodes: i
  };
}

const bza = new Set(["gen-video", "video-input", "motion-control", "video-relight", "video-analyze", "shot-breakdown", "video-timeline", "smart-clip", "generate-character-video", "generate-scene-video", "camera-movement", "professional-camera"]),
  vza = new Set(["gen-music", "gen-speech"]),
  wza = new Set(["text-node", "novel-input", "script-parse", "character-description", "scene-description", "extract-characters-scenes", "table-editor-node", "storyboard-node", "storyboard-chart-node", "custom-agent"]),
  xza = new Set(["gen-3d", "three-d-studio", "global-perspective"]);

function qLt(e) {
  return e.type === "director-3d" ? "director" : xza.has(e.type) ? "world" : e.type === "preview" ? e.previewType === "video" ? "video" : e.previewType === "audio" ? "audio" : "image" : bza.has(e.type) ? "video" : vza.has(e.type) ? "audio" : wza.has(e.type) ? "text" : "image";
}

const _za = [{
    id: "all",
    label: "全部"
  }, {
    id: "image",
    label: "图"
  }, {
    id: "video",
    label: "视"
  }, {
    id: "audio",
    label: "音"
  }, {
    id: "text",
    label: "文"
  }, {
    id: "world",
    label: "3D"
  }, {
    id: "director",
    label: "导演台"
  }],
  Fk = [{
    id: "F0606B",
    hex: "#F0606B",
    name: "红色"
  }, {
    id: "F4A14B",
    hex: "#F4A14B",
    name: "橙色"
  }, {
    id: "EDC63D",
    hex: "#EDC63D",
    name: "黄色"
  }, {
    id: "4FC978",
    hex: "#4FC978",
    name: "绿色"
  }, {
    id: "4EA8FF",
    hex: "#4EA8FF",
    name: "蓝色"
  }, {
    id: "A55CF0",
    hex: "#A55CF0",
    name: "紫色"
  }],
  kza = new Map(Fk.map(e => [e.id, e])),
  Aza = new Set(Fk.map(e => e.id)),
  Sza = new Set(["text-node", "novel-input", "custom-agent", "storyboard-node", "script-parse"]),
  Iza = new Set(["director-3d", "gen-3d", "three-d-studio", "global-perspective"]),
  Cza = new Set(["gen-video", "video-input", "motion-control", "video-relight", "video-analyze", "shot-breakdown", "video-timeline"]),
  Eza = new Set(["gen-music", "gen-speech"]),
  Tza = new Set(["input-image", "video-input", "gen-image", "gen-video", "gen-3d", "gen-music", "gen-speech", "text-node", "script-parse", "topaz-upscale", "jimeng-super-resolution", "fal-rembg", "virtual-try-on", "video-relight"]);

function Mza(e) {
  return Aza.has(e);
}

function KLt(e) {
  if (e) return kza.get(e);
}

const Pza = 14,
  EXe = 8,
  Rza = 24,
  Nza = 28,
  Nan = 8,
  jza = 1200;

function rtr(e) {
  return e <= 0 ? 0 : Pza + (e - 1) * EXe;
}

function Dza(e) {
  return Rza + EXe * Math.max(0, e - 1);
}

function Lza(e, t) {
  return (t - e - 1) * EXe;
}

function Oza(e = Fk.length) {
  return Nan * 2 + (1 + e) * Nza + e * Nan;
}

function gpe(e) {
  const t = new Set(Zg({
    settings: {
      colorPins: e
    }
  }));
  return Fk.map(n => n.id).filter(n => t.has(n));
}

function Bza(e) {
  const t = e.length,
    n = new Map();
  for (const r of e) for (const a of Zg(r)) n.set(a, (n.get(a) ?? 0) + 1);
  return Object.fromEntries(Fk.map(r => {
    const a = n.get(r.id) ?? 0,
      i = a === 0 ? "none" : t > 0 && a === t ? "all" : "partial";
    return [r.id, i];
  }));
}

function Fza(e) {
  return e ? Fk.filter(t => e[t.id] === "all").map(t => t.id) : [];
}

function atr(e) {
  return e === "image" ? "图片" : e === "video" ? "视频" : e === "audio" ? "音频" : e === "text" ? "文本" : "3D";
}

function Zg(e) {
  var a, i;
  const t = ((a = e == null ? void 0 : e.settings) == null ? void 0 : a.colorPins) ?? ((i = e == null ? void 0 : e.settings) == null ? void 0 : i.color_pins);
  if (!Array.isArray(t)) return [];
  const n = new Set(),
    r = [];
  for (const o of t) typeof o != "string" || !Mza(o) || n.has(o) || (n.add(o), r.push(o));
  return r;
}

function QLt(e) {
  if (e) return Sza.has(e) ? "text" : Iza.has(e) ? "world" : Cza.has(e) ? "video" : Eza.has(e) ? "audio" : "image";
}

function zza(e) {
  if (typeof e.content == "string" && e.content.trim() || typeof e.thumbnailUrl == "string" && e.thumbnailUrl.trim()) return !0;
  const t = e.settings;
  return [t == null ? void 0 : t.generatedImageUrl, t == null ? void 0 : t._canvasDisplayPreviewUrl, Array.isArray(t == null ? void 0 : t.generatedImages) ? "yes" : "", Array.isArray(t == null ? void 0 : t.mjImages) ? "yes" : "", Array.isArray(e.previewMjImages) && e.previewMjImages.length ? "yes" : ""].some(r => typeof r == "string" && r.trim().length > 0);
}

function UD(e) {
  var n;
  if (!e || e.type === "image-tile" || e.type === "storyboard-chart-node" || e.type === "preview" || ((n = e.settings) == null ? void 0 : n._ghost) === !0) return !1;
  const t = QLt(e.type);
  return t ? t === "text" || t === "world" ? !0 : zza(e) : !1;
}

function YLt(e, t) {
  const n = Zg({
      settings: {
        colorPins: t
      }
    }),
    r = {
      ...(e.settings || {})
    };
  return n.length ? r.colorPins = n : delete r.colorPins, delete r.color_pins, {
    ...e,
    settings: r
  };
}

function Uza(e) {
  const t = new Map();
  for (const r of e) {
    const a = Zg(r);
    if (a.length) for (const i of a) {
      const o = t.get(i);
      o ? o.push(r.id) : t.set(i, [r.id]);
    }
  }
  const n = [];
  for (const r of Fk) {
    const a = t.get(r.id);
    a != null && a.length && n.push({
      color: r,
      nodeIds: a,
      count: a.length
    });
  }
  return n;
}

function $za(e) {
  const t = QLt(e.type) ?? "image";
  let n = ike(e);
  if ((!n || n === "未命名节点") && t === "text" && typeof e.content == "string") {
    const r = e.content.replace(/<[^>]+>/g, "").trim();
    r && (n = r.slice(0, 60));
  }
  return {
    id: e.id,
    label: n || "未命名",
    thumbnail: xf(e),
    kind: t
  };
}

function Gza(e) {
  const t = gpe(e).map(n => {
    var r;
    return (r = KLt(n)) == null ? void 0 : r.name;
  }).filter(n => !!n);
  return t.length ? `已添加：${t.join("、")}` : "添加标签";
}

const Cwt = new Set();

let rg = {
    filteredGroupId: null,
    groupNames: {},
    locatedObjectId: null
  },
  gfe = null;

function Ide() {
  Cwt.forEach(e => e());
}

function XLt(e) {
  return Cwt.add(e), () => Cwt.delete(e);
}

function JLt(e) {
  if (typeof document > "u") return;
  const t = document.getElementById("canvas-bg");
  t && (e ? t.setAttribute("data-pin-filter", e) : t.removeAttribute("data-pin-filter"));
}

function jan() {
  return rg;
}

function Dan() {
  return rg.filteredGroupId;
}

function Vza(e, t) {
  const n = t ? e : rg.filteredGroupId === e ? null : rg.filteredGroupId;
  n !== rg.filteredGroupId && (rg = {
    ...rg,
    filteredGroupId: n
  }, JLt(n), Ide());
}

function R6e() {
  rg.filteredGroupId != null && (rg = {
    ...rg,
    filteredGroupId: null
  }, JLt(null), Ide());
}

function Hza(e) {
  const t = String(e ?? "").trim();
  t && (gfe != null && (clearTimeout(gfe), gfe = null), rg.locatedObjectId !== t && (rg = {
    ...rg,
    locatedObjectId: t
  }, Ide()), gfe = setTimeout(() => {
    gfe = null, rg.locatedObjectId === t && (rg = {
      ...rg,
      locatedObjectId: null
    }, Ide());
  }, jza));
}

function Lan() {
  return rg.locatedObjectId;
}

function Wza() {
  return g.useSyncExternalStore(XLt, Lan, Lan);
}

function qza(e, t) {
  const n = t.trim(),
    r = {
      ...rg.groupNames
    };
  n ? r[e] = n : delete r[e], rg = {
    ...rg,
    groupNames: r
  }, Ide();
}

function Kza(e) {
  const t = {};
  if (e) for (const [n, r] of Object.entries(e)) typeof r == "string" && r.trim() && (t[n] = r.trim());
  rg = {
    ...rg,
    groupNames: t
  }, Ide();
}

function Qza() {
  return g.useSyncExternalStore(XLt, jan, jan);
}

function ZLt() {
  return g.useSyncExternalStore(XLt, Dan, Dan);
}

function Yza() {
  JLt(rg.filteredGroupId);
}

let Oan = !1;

const Xza = new Set();

function Jza() {
  Xza.forEach(e => e());
}

function Ban(e) {
  Oan !== e && (Oan = e, Jza());
}

let YS = null;

function Fan(e) {
  return YS = e, e;
}

function Zza(e, t) {
  YS == null || YS.togglePinOnNodes(e, t);
}

function eUa(e) {
  YS == null || YS.clearPinsOnNodes(e);
}

function tUa(e) {
  YS == null || YS.removeAllFromGroup(e);
}

function nUa(e) {
  YS == null || YS.downloadNodes(e);
}

function zan(e) {
  jie(e), Hza(e);
}

function rUa(e, t, n, r) {
  if (!t.length) return e;
  const a = new Set(t);
  let i = !1;
  const o = e.map(s => {
    if (!a.has(s.id)) return s;
    const l = Zg(s),
      d = l.includes(n);
    return r === d ? s : (i = !0, YLt(s, r ? [...l, n] : l.filter(u => u !== n)));
  });
  return i ? o : e;
}

function aUa(e, t, n) {
  if (!t.length) return e;
  const r = new Set(t),
    a = e.filter(o => r.has(o.id));
  if (!a.length) return e;
  const i = !a.every(o => Zg(o).includes(n));
  return rUa(e, t, n, i);
}

function iUa(e, t) {
  if (!t.length) return e;
  const n = new Set(t);
  let r = !1;
  const a = e.map(i => !n.has(i.id) || Zg(i).length === 0 ? i : (r = !0, YLt(i, [])));
  return r ? a : e;
}

function oUa(e, t) {
  let n = !1;
  const r = e.map(a => {
    const i = Zg(a);
    return i.includes(t) ? (n = !0, YLt(a, i.filter(o => o !== t))) : a;
  });
  return n ? r : e;
}

function sUa(e) {
  const t = g.useRef(e);
  t.current = e;
  const n = g.useRef(null);
  n.current === null && (n.current = {
    togglePinOnNodes(r, a) {
      t.current.setNodes(i => aUa(i, r, a));
    },
    clearPinsOnNodes(r) {
      t.current.setNodes(a => iUa(a, r));
    },
    removeAllFromGroup(r) {
      t.current.setNodes(a => oUa(a, r));
    },
    downloadNodes(r) {
      t.current.downloadNodes([...r]);
    }
  }, Fan(n.current)), g.useLayoutEffect(() => {
    n.current && Fan(n.current);
  }, []);
}

const Q4 = {
  ENTERING: "entering",
  PRESENT: "present",
  EXITING: "exiting"
};

function lUa() {
  var e;
  return typeof window < "u" && !!((e = window.matchMedia) != null && e.call(window, "(prefers-reduced-motion: reduce)").matches);
}

function itr(e, t) {
  return (t - e - 1) * EXe;
}

function cUa(e) {
  const t = gpe(e);
  return t.map((n, r) => {
    const a = Fk.find(i => i.id === n);
    return {
      id: n,
      hex: (a == null ? void 0 : a.hex) ?? `#${n}`,
      offset: itr(r, t.length),
      presence: Q4.PRESENT,
      enterFromStartingStyle: !1
    };
  });
}

function dUa(e, t, n) {
  const r = lUa(),
    a = gpe(t),
    i = new Map(e.map(l => [l.id, l])),
    o = new Map(a.map((l, d) => [l, itr(d, a.length)])),
    s = Fk.flatMap(l => {
      const d = i.get(l.id),
        u = o.get(l.id);
      if (u === void 0) return !d || r ? [] : d.presence !== Q4.EXITING || d.enterFromStartingStyle ? [{
        ...d,
        enterFromStartingStyle: !1,
        presence: Q4.EXITING
      }] : [d];
      if (!d) return [{
        id: l.id,
        hex: l.hex,
        offset: u,
        presence: r ? Q4.PRESENT : Q4.ENTERING,
        enterFromStartingStyle: !r
      }];
      let h = d.presence,
        p = d.enterFromStartingStyle;
      return r ? (h = Q4.PRESENT, p = !1) : d.presence === Q4.EXITING && (h = Q4.ENTERING), d.offset === u && d.presence === h && d.enterFromStartingStyle === p ? [d] : [{
        ...d,
        offset: u,
        presence: h,
        enterFromStartingStyle: p
      }];
    });
  return s.length === e.length && s.every((l, d) => l === e[d]) ? e : s;
}

function uUa(e, t) {
  const n = e.find(r => r.id === t);
  return !n || n.presence === Q4.PRESENT ? [...e] : n.presence === Q4.EXITING ? e.filter(r => r.id !== t) : e.map(r => r.id !== t ? r : {
    ...r,
    enterFromStartingStyle: !1,
    presence: Q4.PRESENT
  });
}

const gte = 16,
  Uan = 8;

function hUa(e) {
  const t = e.closest("[data-canvas-pin-toolbar]");
  if (t instanceof HTMLElement) return t;
  const n = [".text-node-rich-toolbar", ".input-node-fast-tooltip", ".box-select-toolbar-capsule", '[data-canvas-pin-ui="overlay"]'];
  for (const r of n) {
    const a = e.closest(r);
    if (a instanceof HTMLElement) return a;
  }
  return e.parentElement instanceof HTMLElement ? e.parentElement : e;
}

function CR(e) {
  e.stopPropagation();
}

function pUa({
  className: e = ""
}) {
  return on(), c.jsxs("svg", {
    "aria-hidden": !0,
    className: e,
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    children: [c.jsx("path", {
      d: "M2.4 8.85 8.85 2.4A1.6 1.6 0 0 1 10 2h3.2A.8.8 0 0 1 14 2.8V6a1.6 1.6 0 0 1-.4 1.15L7.15 13.6a1.2 1.2 0 0 1-1.7 0L2.4 10.55a1.2 1.2 0 0 1 0-1.7Z",
      stroke: "currentColor",
      strokeWidth: "1.4",
      strokeLinejoin: "round"
    }), c.jsx("circle", {
      cx: "11.15",
      cy: "4.85",
      r: "0.85",
      fill: "currentColor"
    })]
  });
}

function mUa(e) {
  const t = gpe(e).join("|"),
    n = g.useMemo(() => t ? t.split("|") : [], [t]),
    [r, a] = g.useState(() => cUa(n));
  g.useLayoutEffect(() => {
    a(o => dUa(o, n));
  }, [t, n]);
  const i = g.useCallback(o => {
    a(s => uUa(s, o));
  }, []);
  return {
    items: r,
    onTransitionSettled: i,
    width: rtr(n.length)
  };
}

function fUa({
  items: e,
  width: t,
  onTransitionSettled: n
}) {
  return on(), e.length ? c.jsx("span", {
    "aria-hidden": !0,
    className: "canvas-pin-dot-stack",
    style: {
      width: t
    },
    children: e.map(r => c.jsx("span", {
      className: "canvas-pin-dot-presence",
      "data-pin-presence": r.presence,
      "data-enter-from-starting-style": r.enterFromStartingStyle ? "true" : void 0,
      children: c.jsx(gUa, {
        item: r,
        onTransitionSettled: n
      })
    }, r.id))
  }) : null;
}

function gUa({
  item: e,
  onTransitionSettled: t
}) {
  on();
  const n = g.useRef(null);
  return g.useLayoutEffect(() => {
    const r = n.current;
    if (r) return r.style.translate = `${-e.offset}px 0px`, () => {
      r.style.removeProperty("translate");
    };
  }, [e.offset]), g.useEffect(() => {
    const r = n.current;
    if (!r || e.presence === Q4.PRESENT) return;
    const a = () => t(e.id);
    r.addEventListener("transitionend", a);
    const i = window.setTimeout(a, 400);
    return () => {
      r.removeEventListener("transitionend", a), window.clearTimeout(i);
    };
  }, [e.id, e.presence, t]), c.jsx("span", {
    ref: n,
    className: "canvas-pin-dot",
    "data-pin-color": e.id,
    "data-pin-presence": e.presence,
    style: {
      backgroundColor: e.hex
    }
  });
}

function yUa({
  open: e,
  onOpen: t,
  onClose: n
}) {
  const [r, a] = g.useState("keyboard");
  return {
    autoFocusOnOpen: r === "keyboard",
    onTriggerClick: i => {
      if (e) {
        n();
        return;
      }
      a(i), t();
    }
  };
}

function bUa(e, t) {
  const n = e.querySelector("[data-canvas-tag-trigger-visual-slot]");
  if (!(n instanceof HTMLElement)) return t;
  const r = e.offsetWidth,
    a = e.offsetHeight,
    i = n.offsetWidth,
    o = n.offsetHeight;
  if (r > 0 && a > 0 && i > 0 && o > 0) {
    const l = i * (t.width / r),
      d = o * (t.height / a);
    return new DOMRect(t.right - l, t.top + n.offsetTop * (t.height / a), l, d);
  }
  const s = Math.min(t.width, t.height);
  return new DOMRect(t.right - s, t.top, s, s);
}

function vUa(e, t) {
  if (!e || typeof MutationObserver > "u") return null;
  const n = [e.closest(".node-wrapper"), e.closest(".canvas-world"), document.getElementById("canvas-bg")].filter(a => a instanceof HTMLElement);
  if (!n.length) return null;
  const r = new MutationObserver(t);
  for (const a of n) r.observe(a, {
    attributes: !0,
    attributeFilter: ["style", "class"]
  });
  return r;
}

function wUa(e, t, n, r = !0) {
  const [a, i] = g.useState(!1),
    o = g.useRef(!1),
    s = g.useRef(null),
    l = g.useCallback(() => {
      const d = e.current,
        u = t.current;
      if (!d || !u) return;
      const h = {
          width: d.offsetWidth || 260,
          height: d.offsetHeight || 44
        },
        p = u.getBoundingClientRect(),
        f = hUa(u).getBoundingClientRect(),
        y = bUa(u, p),
        b = document.documentElement.clientWidth || window.innerWidth,
        v = document.documentElement.clientHeight || window.innerHeight,
        _ = Math.min(h.width, Math.max(0, b - gte * 2)),
        w = Math.max(gte, b - gte - _),
        k = Math.min(Math.max(y.right - y.width / 2 - _ / 2, gte), w),
        A = f.top - Uan - h.height,
        S = f.bottom + Uan,
        C = A >= gte,
        I = S + h.height <= v - gte,
        M = (r ? I || !C : !C && I) ? S : A,
        T = s.current;
      ((T == null ? void 0 : T.left) !== k || T.top !== M) && (d.style.left = `${k}px`, d.style.top = `${M}px`, s.current = {
        left: k,
        top: M
      }), o.current || (o.current = !0, i(!0));
    }, [r, e, t]);
  return g.useLayoutEffect(() => {
    l();
    const d = vUa(t.current, l);
    return window.addEventListener("resize", l), window.addEventListener("scroll", l, !0), () => {
      d == null || d.disconnect(), window.removeEventListener("resize", l), window.removeEventListener("scroll", l, !0);
    };
  }, [l, n, t]), a;
}

function xUa({
  colorId: e,
  hex: t,
  name: n,
  state: r,
  onToggle: a
}) {
  on();
  const i = r === "all" ? `移除“${n}”` : `添加“${n}”`;
  return c.jsx("button", {
    type: "button",
    "aria-label": x(i),
    "aria-pressed": r === "partial" ? "mixed" : r === "all",
    "data-canvas-tag-state": r,
    className: "canvas-pin-swatch group",
    onClick: o => {
      o.stopPropagation(), a(e, r);
    },
    children: c.jsxs("span", {
      "aria-hidden": !0,
      className: "relative h-7 w-7 shrink-0",
      children: [r === "all" ? c.jsx("span", {
        className: "canvas-pin-ring canvas-pin-ring--active"
      }) : c.jsx("span", {
        className: "canvas-pin-ring canvas-pin-ring--hover"
      }), c.jsx("span", {
        className: "canvas-pin-swatch-dot",
        style: {
          backgroundColor: t
        }
      }), r === "partial" ? c.jsx("span", {
        className: "canvas-pin-indicator canvas-pin-indicator--partial",
        children: "−"
      }) : null, c.jsx("span", {
        className: "canvas-pin-indicator canvas-pin-indicator--hover",
        children: r === "all" ? "−" : "+"
      })]
    })
  });
}

function _Ua({
  isDark: e,
  selectorId: t,
  triggerRef: n,
  toggleStates: r,
  autoFocusOnOpen: a,
  preferBelow: i,
  onToggle: o,
  onClear: s,
  onClose: l
}) {
  on();
  const d = g.useRef(null),
    u = wUa(d, n, !0, i);
  return g.useEffect(() => {
    var h, p;
    a && ((p = (h = d.current) == null ? void 0 : h.querySelector("button")) == null || p.focus({
      preventScroll: !0
    }));
  }, [a]), g.useEffect(() => {
    const h = m => {
        var b, v, _;
        const f = m.target;
        if (!f || (b = d.current) != null && b.contains(f) || (v = n.current) != null && v.contains(f)) return;
        const y = ((_ = d.current) == null ? void 0 : _.contains(document.activeElement)) ?? !1;
        l(), y && queueMicrotask(() => {
          var w;
          return (w = n.current) == null ? void 0 : w.focus({
            preventScroll: !0
          });
        });
      },
      p = m => {
        m.key === "Escape" && l();
      };
    return document.addEventListener("pointerdown", h, !0), window.addEventListener("keydown", p), () => {
      document.removeEventListener("pointerdown", h, !0), window.removeEventListener("keydown", p);
    };
  }, [l, n]), c.jsxs("div", {
    ref: d,
    id: t,
    role: "toolbar",
    "aria-label": x("标签选择"),
    "data-canvas-pin-ui": "selector",
    "data-testid": "canvas-node-tag-selector",
    "data-theme": e ? "dark" : "light",
    className: "canvas-pin-selector nodrag nopan",
    style: {
      left: 0,
      top: 0,
      width: Oza(),
      visibility: u ? "visible" : "hidden",
      zIndex: 10240
    },
    onClick: CR,
    onContextMenu: CR,
    onDoubleClick: CR,
    onMouseDown: CR,
    onMouseUp: CR,
    onPointerDown: CR,
    onPointerUp: CR,
    children: [c.jsx("button", {
      type: "button",
      "aria-label": x("全部清空"),
      className: "canvas-pin-swatch canvas-pin-clear",
      onClick: h => {
        h.stopPropagation(), s();
      },
      children: c.jsxs("span", {
        "aria-hidden": !0,
        className: "relative h-7 w-7 shrink-0",
        children: [c.jsx("span", {
          className: "canvas-pin-ring canvas-pin-ring--hover"
        }), c.jsxs("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 16 16",
          fill: "none",
          className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          children: [c.jsx("path", {
            d: "M3.2 8.7 8.7 3.2A1.2 1.2 0 0 1 9.55 2.85H12.2A.8.8 0 0 1 13 3.65v2.65a1.2 1.2 0 0 1-.35.85L7.3 12.8a1 1 0 0 1-1.4 0L3.2 10.1a1 1 0 0 1 0-1.4Z",
            stroke: "currentColor",
            strokeWidth: "1.35",
            strokeLinejoin: "round"
          }), c.jsx("path", {
            d: "m4.15 4.15 7.7 7.7",
            stroke: "currentColor",
            strokeWidth: "1.35",
            strokeLinecap: "round"
          })]
        })]
      })
    }), Fk.map(h => c.jsx(xUa, {
      colorId: h.id,
      hex: h.hex,
      name: h.name,
      state: r[h.id] ?? "none",
      onToggle: o
    }, h.id))]
  });
}

