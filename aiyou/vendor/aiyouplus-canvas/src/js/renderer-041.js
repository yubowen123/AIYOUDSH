var Vut,
  Hut,
  YAr,
  $2n,
  $Ro = Wi(() => {
    var e, t;
    Hut = (Vut = import.meta.url, async function (n = {}) {
      var gl;
      var r,
        a,
        i = n,
        o = new Promise((oe, Se) => {
          r = oe, a = Se;
        }),
        s = typeof window == "object",
        l = typeof WorkerGlobalScope < "u",
        d = l && ((gl = self.name) == null ? void 0 : gl.startsWith("em-pthread"));
      i.mountExternalData = (oe, Se) => {
        oe.startsWith("./") && (oe = oe.substring(2)), (i.Bd || (i.Bd = new Map())).set(oe, Se);
      }, i.unmountExternalData = () => {
        delete i.Bd;
      };
      var u = globalThis.SharedArrayBuffer ?? new WebAssembly.Memory({
        initial: 0,
        maximum: 0,
        shared: !0
      }).buffer.constructor;
      let h = () => {
        let oe = (Be, Je, ut) => (...dn) => {
            let Xn = Ea,
              Rr = Je == null ? void 0 : Je();
            dn = Be(...dn);
            let Vr = Je == null ? void 0 : Je();
            return Rr !== Vr && (Be = Vr, ut(Rr), Je = ut = null), Ea != Xn ? new Promise((ca, za) => {
              ta = {
                resolve: ca,
                reject: za
              };
            }) : dn;
          },
          Se = Be => async (...Je) => {
            var ut;
            try {
              if (i.Cd) throw Error("Session already started");
              let dn = i.Cd = {
                  be: Je[0],
                  errors: []
                },
                Xn = await Be(...Je);
              if (i.Cd !== dn) throw Error("Session mismatch");
              (ut = i.Dd) == null || ut.flush();
              let Rr = dn.errors;
              if (0 < Rr.length) {
                let Vr = await Promise.all(Rr);
                if (Vr = Vr.filter(ca => ca), 0 < Vr.length) throw Error(Vr.join(`
`));
              }
              return Xn;
            } finally {
              i.Cd = null;
            }
          };
        i._OrtCreateSession = oe(i._OrtCreateSession, () => i._OrtCreateSession, Be => i._OrtCreateSession = Be), i._OrtRun = Se(oe(i._OrtRun, () => i._OrtRun, Be => i._OrtRun = Be)), i._OrtRunWithBinding = Se(oe(i._OrtRunWithBinding, () => i._OrtRunWithBinding, Be => i._OrtRunWithBinding = Be)), i._OrtBindInput = oe(i._OrtBindInput, () => i._OrtBindInput, Be => i._OrtBindInput = Be), h = void 0;
      };
      i.jsepInit = (oe, Se) => {
        if (h == null || h(), oe === "webgpu") {
          [i.Dd, i.Rd, i.Vd, i.Hd, i.Ud, i.hc, i.Wd, i.Zd, i.Sd, i.Td, i.Xd] = Se;
          let Be = i.Dd;
          i.jsepRegisterBuffer = (Je, ut, dn, Xn) => Be.registerBuffer(Je, ut, dn, Xn), i.jsepGetBuffer = Je => Be.getBuffer(Je), i.jsepCreateDownloader = (Je, ut, dn) => Be.createDownloader(Je, ut, dn), i.jsepOnCreateSession = Je => {
            Be.onCreateSession(Je);
          }, i.jsepOnReleaseSession = Je => {
            Be.onReleaseSession(Je);
          }, i.jsepOnRunStart = Je => Be.onRunStart(Je), i.$d = (Je, ut) => {
            Be.upload(Je, ut);
          };
        } else if (oe === "webnn") {
          [i.Dd, i.Yd, i.Id, i.jsepEnsureTensor, i.Jd, i.jsepDownloadTensor] = Se, i.jsepReleaseTensorId = i.Id, i.jsepUploadTensor = i.Jd;
          let Be = i.Dd;
          i.jsepOnRunStart = Je => Be.onRunStart(Je), i.jsepOnRunEnd = Be.onRunEnd.bind(Be), i.jsepRegisterMLContext = (Je, ut) => {
            Be.registerMLContext(Je, ut);
          }, i.jsepOnReleaseSession = Je => {
            Be.onReleaseSession(Je);
          }, i.jsepCreateMLTensorDownloader = (Je, ut) => Be.createMLTensorDownloader(Je, ut), i.jsepRegisterMLTensor = (Je, ut, dn, Xn) => Be.registerMLTensor(Je, ut, dn, Xn), i.jsepCreateMLContext = Je => Be.createMLContext(Je), i.jsepRegisterMLConstant = (Je, ut, dn, Xn, Rr) => Be.registerMLConstant(Je, ut, dn, Xn, Rr, i.Bd), i.jsepRegisterGraphInput = Be.registerGraphInput.bind(Be), i.jsepIsGraphInput = Be.isGraphInput.bind(Be), i.jsepCreateTemporaryTensor = Be.createTemporaryTensor.bind(Be);
        }
      };
      var p,
        m,
        f = Object.assign({}, i),
        y = (oe, Se) => {
          throw Se;
        },
        b = "";
      (s || l) && (l ? b = self.location.href : typeof document < "u" && document.currentScript && (b = document.currentScript.src), Vut && (b = Vut), b = b.startsWith("blob:") ? "" : b.slice(0, b.replace(/[?#].*/, "").lastIndexOf("/") + 1), l && (m = oe => {
        var Se = new XMLHttpRequest();
        return Se.open("GET", oe, !1), Se.responseType = "arraybuffer", Se.send(null), new Uint8Array(Se.response);
      }), p = async oe => {
        if (V(oe)) return new Promise((Be, Je) => {
          var ut = new XMLHttpRequest();
          ut.open("GET", oe, !0), ut.responseType = "arraybuffer", ut.onload = () => {
            ut.status == 200 || ut.status == 0 && ut.response ? Be(ut.response) : Je(ut.status);
          }, ut.onerror = Je, ut.send(null);
        });
        var Se = await fetch(oe, {
          credentials: "same-origin"
        });
        if (Se.ok) return Se.arrayBuffer();
        throw Error(Se.status + " : " + Se.url);
      });
      var v = console.log.bind(console),
        _ = console.error.bind(console),
        w = v,
        k = _;
      Object.assign(i, f), f = null;
      var A,
        S,
        C,
        I,
        E,
        M,
        T,
        P,
        R,
        j,
        B,
        F,
        N,
        G = i.wasmBinary,
        z = !1,
        V = oe => oe.startsWith("file://");
      function O() {
        return A.buffer != I.buffer && ne(), I;
      }
      function L() {
        return A.buffer != I.buffer && ne(), E;
      }
      function D() {
        return A.buffer != I.buffer && ne(), M;
      }
      function U() {
        return A.buffer != I.buffer && ne(), T;
      }
      function H() {
        return A.buffer != I.buffer && ne(), P;
      }
      function Y() {
        return A.buffer != I.buffer && ne(), R;
      }
      function K() {
        return A.buffer != I.buffer && ne(), j;
      }
      function W() {
        return A.buffer != I.buffer && ne(), N;
      }
      if (d) {
        let oe = function (Se) {
          try {
            var Be = Se.data,
              Je = Be.yd;
            if (Je === "load") {
              let ut = [];
              self.onmessage = dn => ut.push(dn), self.startWorker = () => {
                postMessage({
                  yd: "loaded"
                });
                for (let dn of ut) oe(dn);
                self.onmessage = oe;
              };
              for (let dn of Be.Od) i[dn] && !i[dn].proxy || (i[dn] = (...Xn) => {
                postMessage({
                  yd: "callHandler",
                  Nd: dn,
                  args: Xn
                });
              }, dn == "print" && (w = i[dn]), dn == "printErr" && (k = i[dn]));
              A = Be.he, ne(), Q(Be.ie);
            } else if (Je === "run") {
              Me(Be.xd), aa(Be.xd, 0, 0, 1, 0, 0), me(), qn(Be.xd), q || (Mn(), q = !0);
              try {
                Re(Be.de, Be.Fd);
              } catch (ut) {
                if (ut != "unwind") throw ut;
              }
            } else Be.target !== "setimmediate" && (Je === "checkMailbox" ? q && Dn() : Je && (k(`worker: received unknown command ${Je}`), k(Be)));
          } catch (ut) {
            throw wa(), ut;
          }
        };
        var Q,
          q = !1;
        k = function (...Se) {
          Se = Se.join(" "), console.error(Se);
        }, self.alert = function (...Se) {
          postMessage({
            yd: "alert",
            text: Se.join(" "),
            fe: or()
          });
        }, self.onunhandledrejection = Se => {
          throw Se.reason || Se;
        }, self.onmessage = oe;
      }
      function ne() {
        var oe = A.buffer;
        i.HEAP8 = I = new Int8Array(oe), i.HEAP16 = M = new Int16Array(oe), i.HEAPU8 = E = new Uint8Array(oe), i.HEAPU16 = T = new Uint16Array(oe), i.HEAP32 = P = new Int32Array(oe), i.HEAPU32 = R = new Uint32Array(oe), i.HEAPF32 = j = new Float32Array(oe), i.HEAPF64 = N = new Float64Array(oe), i.HEAP64 = B = new BigInt64Array(oe), i.HEAPU64 = F = new BigUint64Array(oe);
      }
      function de() {
        d ? startWorker(i) : Bn.Bb();
      }
      d || (A = new WebAssembly.Memory({
        initial: 256,
        maximum: 65536,
        shared: !0
      }), ne());
      var le,
        J = 0,
        pe = null;
      function ce() {
        if (--J == 0 && pe) {
          var oe = pe;
          pe = null, oe();
        }
      }
      function we(oe) {
        throw k(oe = "Aborted(" + oe + ")"), z = !0, oe = new WebAssembly.RuntimeError(oe + ". Build with -sASSERTIONS for more info."), a(oe), oe;
      }
      function X() {
        return {
          a: {
            Ta: fe,
            Va: re,
            W: rt,
            la: ze,
            b: De,
            u: Ye,
            R: Ce,
            Za: He,
            d: Ve,
            pb: It,
            g: Ke,
            T: Ge,
            Ga: Oe,
            lb: Ht,
            nb: nn,
            Ha: pt,
            Ea: lt,
            wb: gt,
            Da: Ut,
            pa: _t,
            mb: At,
            jb: Yt,
            Fa: qe,
            kb: kt,
            Ma: Qt,
            za: Ct,
            eb: un,
            cb: ft,
            ya: wt,
            V: jt,
            N: bt,
            db: Bt,
            ma: mt,
            fb: Xt,
            zb: Gn,
            hb: Ar,
            qb: Pa,
            ab: fa,
            Aa: Ca,
            yb: qn,
            Ja: $n,
            S: Gr,
            Wa: Zr,
            $: wr,
            G: _n,
            E: vn,
            m: en,
            H: ur,
            B: gr,
            X: jr,
            J: ea,
            v: pa,
            O: Br,
            D: tn,
            t: Lr,
            A: br,
            z: Jr,
            w: Kr,
            r: ir,
            tb: Hr,
            ub: va,
            vb: Kt,
            rb: Pr,
            sb: kr,
            bb: $t,
            Oa: je,
            La: Mt,
            y: Lt,
            ja: ct,
            Ba: Dt,
            Ka: Qe,
            qa: bn,
            Ia: Rt,
            ib: fn,
            U: Hn,
            fa: Zt,
            Sa: Ln,
            gb: tt,
            Qa: Un,
            Pa: er,
            Ab: xn,
            Ca: Fn,
            ob: ge,
            aa: cr,
            oa: vr,
            xb: Wt,
            na: Nn,
            $a: Hc,
            ia: _m,
            sa: Xo,
            ga: hh,
            da: Jm,
            ua: Wo,
            p: td,
            e: Df,
            c: vu,
            ea: Zp,
            f: xg,
            n: Jh,
            k: Qd,
            Y: Bl,
            ka: Xv,
            j: Ym,
            wa: Xm,
            Ra: km,
            ca: xm,
            Ua: Oc,
            P: Of,
            K: Kd,
            _: tp,
            Q: Jp,
            Z: Eo,
            x: ql,
            l: wu,
            va: ep,
            i: qd,
            h: Zh,
            ra: fl,
            ta: Qs,
            o: Lf,
            q: uh,
            s: Xp,
            I: Qm,
            C: Jl,
            L: $b,
            xa: fw,
            _a: Rp,
            F: xd,
            Ya: Js,
            ba: Zs,
            M: Lc,
            Xa: uc,
            ha: En,
            a: A,
            Na: he
          }
        };
      }
      var Z = {
        1319426: () => typeof wasmOffsetConverter < "u",
        1319483: (oe, Se, Be, Je, ut) => {
          if (i === void 0 || !i.Bd) return 1;
          if ((oe = Ze(Number(oe >>> 0))).startsWith("./") && (oe = oe.substring(2)), !(oe = i.Bd.get(oe))) return 2;
          if (Se = Number(Se >>> 0), Be = Number(Be >>> 0), Je = Number(Je >>> 0), Se + Be > oe.byteLength) return 3;
          try {
            let dn = oe.subarray(Se, Se + Be);
            switch (ut) {
              case 0:
                L().set(dn, Je >>> 0);
                break;
              case 1:
                i.$d(Je, dn);
                break;
              default:
                return 4;
            }
            return 0;
          } catch {
            return 4;
          }
        },
        1320198: (oe, Se, Be) => {
          i.Jd(oe, L().subarray(Se >>> 0, Se + Be >>> 0));
        },
        1320261: () => i.Yd(),
        1320302: oe => {
          i.Id(oe);
        },
        1320338: () => {
          i.Sd();
        },
        1320369: () => {
          i.Td();
        },
        1320398: () => {
          i.Xd();
        },
        1320423: oe => i.Rd(oe),
        1320456: oe => i.Vd(oe),
        1320488: (oe, Se, Be) => {
          i.Hd(Number(oe), Number(Se), Number(Be), !0);
        },
        1320551: (oe, Se, Be) => {
          i.Hd(Number(oe), Number(Se), Number(Be));
        },
        1320608: oe => {
          i.hc("Abs", oe, void 0);
        },
        1320659: oe => {
          i.hc("Neg", oe, void 0);
        },
        1320710: oe => {
          i.hc("Floor", oe, void 0);
        },
        1320763: oe => {
          i.hc("Ceil", oe, void 0);
        },
        1320815: oe => {
          i.hc("Reciprocal", oe, void 0);
        },
        1320873: oe => {
          i.hc("Sqrt", oe, void 0);
        },
        1320925: oe => {
          i.hc("Exp", oe, void 0);
        },
        1320976: oe => {
          i.hc("Erf", oe, void 0);
        },
        1321027: oe => {
          i.hc("Sigmoid", oe, void 0);
        },
        1321082: (oe, Se, Be) => {
          i.hc("HardSigmoid", oe, {
            alpha: Se,
            beta: Be
          });
        },
        1321161: oe => {
          i.hc("Log", oe, void 0);
        },
        1321212: oe => {
          i.hc("Sin", oe, void 0);
        },
        1321263: oe => {
          i.hc("Cos", oe, void 0);
        },
        1321314: oe => {
          i.hc("Tan", oe, void 0);
        },
        1321365: oe => {
          i.hc("Asin", oe, void 0);
        },
        1321417: oe => {
          i.hc("Acos", oe, void 0);
        },
        1321469: oe => {
          i.hc("Atan", oe, void 0);
        },
        1321521: oe => {
          i.hc("Sinh", oe, void 0);
        },
        1321573: oe => {
          i.hc("Cosh", oe, void 0);
        },
        1321625: oe => {
          i.hc("Asinh", oe, void 0);
        },
        1321678: oe => {
          i.hc("Acosh", oe, void 0);
        },
        1321731: oe => {
          i.hc("Atanh", oe, void 0);
        },
        1321784: oe => {
          i.hc("Tanh", oe, void 0);
        },
        1321836: oe => {
          i.hc("Not", oe, void 0);
        },
        1321887: (oe, Se, Be) => {
          i.hc("Clip", oe, {
            min: Se,
            max: Be
          });
        },
        1321956: oe => {
          i.hc("Clip", oe, void 0);
        },
        1322008: (oe, Se) => {
          i.hc("Elu", oe, {
            alpha: Se
          });
        },
        1322066: oe => {
          i.hc("Gelu", oe, void 0);
        },
        1322118: oe => {
          i.hc("Relu", oe, void 0);
        },
        1322170: (oe, Se) => {
          i.hc("LeakyRelu", oe, {
            alpha: Se
          });
        },
        1322234: (oe, Se) => {
          i.hc("ThresholdedRelu", oe, {
            alpha: Se
          });
        },
        1322304: (oe, Se) => {
          i.hc("Cast", oe, {
            to: Se
          });
        },
        1322362: oe => {
          i.hc("Add", oe, void 0);
        },
        1322413: oe => {
          i.hc("Sub", oe, void 0);
        },
        1322464: oe => {
          i.hc("Mul", oe, void 0);
        },
        1322515: oe => {
          i.hc("Div", oe, void 0);
        },
        1322566: oe => {
          i.hc("Pow", oe, void 0);
        },
        1322617: oe => {
          i.hc("Equal", oe, void 0);
        },
        1322670: oe => {
          i.hc("Greater", oe, void 0);
        },
        1322725: oe => {
          i.hc("GreaterOrEqual", oe, void 0);
        },
        1322787: oe => {
          i.hc("Less", oe, void 0);
        },
        1322839: oe => {
          i.hc("LessOrEqual", oe, void 0);
        },
        1322898: (oe, Se, Be, Je, ut) => {
          i.hc("ReduceMean", oe, {
            keepDims: !!Se,
            noopWithEmptyAxes: !!Be,
            axes: Je ? Array.from(H().subarray(Number(Je) >>> 0, Number(ut) >>> 0)) : []
          });
        },
        1323073: (oe, Se, Be, Je, ut) => {
          i.hc("ReduceMax", oe, {
            keepDims: !!Se,
            noopWithEmptyAxes: !!Be,
            axes: Je ? Array.from(H().subarray(Number(Je) >>> 0, Number(ut) >>> 0)) : []
          });
        },
        1323247: (oe, Se, Be, Je, ut) => {
          i.hc("ReduceMin", oe, {
            keepDims: !!Se,
            noopWithEmptyAxes: !!Be,
            axes: Je ? Array.from(H().subarray(Number(Je) >>> 0, Number(ut) >>> 0)) : []
          });
        },
        1323421: (oe, Se, Be, Je, ut) => {
          i.hc("ReduceProd", oe, {
            keepDims: !!Se,
            noopWithEmptyAxes: !!Be,
            axes: Je ? Array.from(H().subarray(Number(Je) >>> 0, Number(ut) >>> 0)) : []
          });
        },
        1323596: (oe, Se, Be, Je, ut) => {
          i.hc("ReduceSum", oe, {
            keepDims: !!Se,
            noopWithEmptyAxes: !!Be,
            axes: Je ? Array.from(H().subarray(Number(Je) >>> 0, Number(ut) >>> 0)) : []
          });
        },
        1323770: (oe, Se, Be, Je, ut) => {
          i.hc("ReduceL1", oe, {
            keepDims: !!Se,
            noopWithEmptyAxes: !!Be,
            axes: Je ? Array.from(H().subarray(Number(Je) >>> 0, Number(ut) >>> 0)) : []
          });
        },
        1323943: (oe, Se, Be, Je, ut) => {
          i.hc("ReduceL2", oe, {
            keepDims: !!Se,
            noopWithEmptyAxes: !!Be,
            axes: Je ? Array.from(H().subarray(Number(Je) >>> 0, Number(ut) >>> 0)) : []
          });
        },
        1324116: (oe, Se, Be, Je, ut) => {
          i.hc("ReduceLogSum", oe, {
            keepDims: !!Se,
            noopWithEmptyAxes: !!Be,
            axes: Je ? Array.from(H().subarray(Number(Je) >>> 0, Number(ut) >>> 0)) : []
          });
        },
        1324293: (oe, Se, Be, Je, ut) => {
          i.hc("ReduceSumSquare", oe, {
            keepDims: !!Se,
            noopWithEmptyAxes: !!Be,
            axes: Je ? Array.from(H().subarray(Number(Je) >>> 0, Number(ut) >>> 0)) : []
          });
        },
        1324473: (oe, Se, Be, Je, ut) => {
          i.hc("ReduceLogSumExp", oe, {
            keepDims: !!Se,
            noopWithEmptyAxes: !!Be,
            axes: Je ? Array.from(H().subarray(Number(Je) >>> 0, Number(ut) >>> 0)) : []
          });
        },
        1324653: oe => {
          i.hc("Where", oe, void 0);
        },
        1324706: (oe, Se, Be) => {
          i.hc("Transpose", oe, {
            perm: Se ? Array.from(H().subarray(Number(Se) >>> 0, Number(Be) >>> 0)) : []
          });
        },
        1324830: (oe, Se, Be, Je) => {
          i.hc("DepthToSpace", oe, {
            blocksize: Se,
            mode: Ze(Be),
            format: Je ? "NHWC" : "NCHW"
          });
        },
        1324963: (oe, Se, Be, Je) => {
          i.hc("DepthToSpace", oe, {
            blocksize: Se,
            mode: Ze(Be),
            format: Je ? "NHWC" : "NCHW"
          });
        },
        1325096: (oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca, za, Xr, fi, Bo, sl) => {
          i.hc("ConvTranspose", oe, {
            format: Vr ? "NHWC" : "NCHW",
            autoPad: Se,
            dilations: [Be],
            group: Je,
            kernelShape: [ut],
            pads: [dn, Xn],
            strides: [Rr],
            wIsConst: () => !!O()[ca >>> 0],
            outputPadding: za ? Array.from(H().subarray(Number(za) >>> 0, Number(Xr) >>> 0)) : [],
            outputShape: fi ? Array.from(H().subarray(Number(fi) >>> 0, Number(Bo) >>> 0)) : [],
            activation: Ze(sl)
          });
        },
        1325529: (oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca, za, Xr, fi, Bo) => {
          i.hc("ConvTranspose", oe, {
            format: Rr ? "NHWC" : "NCHW",
            autoPad: Se,
            dilations: Array.from(H().subarray(Number(Be) >>> 0, 2 + (Number(Be) >>> 0) >>> 0)),
            group: Je,
            kernelShape: Array.from(H().subarray(Number(ut) >>> 0, 2 + (Number(ut) >>> 0) >>> 0)),
            pads: Array.from(H().subarray(Number(dn) >>> 0, 4 + (Number(dn) >>> 0) >>> 0)),
            strides: Array.from(H().subarray(Number(Xn) >>> 0, 2 + (Number(Xn) >>> 0) >>> 0)),
            wIsConst: () => !!O()[Vr >>> 0],
            outputPadding: ca ? Array.from(H().subarray(Number(ca) >>> 0, Number(za) >>> 0)) : [],
            outputShape: Xr ? Array.from(H().subarray(Number(Xr) >>> 0, Number(fi) >>> 0)) : [],
            activation: Ze(Bo)
          });
        },
        1326190: (oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca, za, Xr, fi, Bo, sl) => {
          i.hc("ConvTranspose", oe, {
            format: Vr ? "NHWC" : "NCHW",
            autoPad: Se,
            dilations: [Be],
            group: Je,
            kernelShape: [ut],
            pads: [dn, Xn],
            strides: [Rr],
            wIsConst: () => !!O()[ca >>> 0],
            outputPadding: za ? Array.from(H().subarray(Number(za) >>> 0, Number(Xr) >>> 0)) : [],
            outputShape: fi ? Array.from(H().subarray(Number(fi) >>> 0, Number(Bo) >>> 0)) : [],
            activation: Ze(sl)
          });
        },
        1326623: (oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca, za, Xr, fi, Bo) => {
          i.hc("ConvTranspose", oe, {
            format: Rr ? "NHWC" : "NCHW",
            autoPad: Se,
            dilations: Array.from(H().subarray(Number(Be) >>> 0, 2 + (Number(Be) >>> 0) >>> 0)),
            group: Je,
            kernelShape: Array.from(H().subarray(Number(ut) >>> 0, 2 + (Number(ut) >>> 0) >>> 0)),
            pads: Array.from(H().subarray(Number(dn) >>> 0, 4 + (Number(dn) >>> 0) >>> 0)),
            strides: Array.from(H().subarray(Number(Xn) >>> 0, 2 + (Number(Xn) >>> 0) >>> 0)),
            wIsConst: () => !!O()[Vr >>> 0],
            outputPadding: ca ? Array.from(H().subarray(Number(ca) >>> 0, Number(za) >>> 0)) : [],
            outputShape: Xr ? Array.from(H().subarray(Number(Xr) >>> 0, Number(fi) >>> 0)) : [],
            activation: Ze(Bo)
          });
        },
        1327284: (oe, Se) => {
          i.hc("GlobalAveragePool", oe, {
            format: Se ? "NHWC" : "NCHW"
          });
        },
        1327375: (oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca, za, Xr, fi, Bo) => {
          i.hc("AveragePool", oe, {
            format: Bo ? "NHWC" : "NCHW",
            auto_pad: Se,
            ceil_mode: Be,
            count_include_pad: Je,
            storage_order: ut,
            dilations: dn ? Array.from(H().subarray(Number(dn) >>> 0, Number(Xn) >>> 0)) : [],
            kernel_shape: Rr ? Array.from(H().subarray(Number(Rr) >>> 0, Number(Vr) >>> 0)) : [],
            pads: ca ? Array.from(H().subarray(Number(ca) >>> 0, Number(za) >>> 0)) : [],
            strides: Xr ? Array.from(H().subarray(Number(Xr) >>> 0, Number(fi) >>> 0)) : []
          });
        },
        1327854: (oe, Se) => {
          i.hc("GlobalAveragePool", oe, {
            format: Se ? "NHWC" : "NCHW"
          });
        },
        1327945: (oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca, za, Xr, fi, Bo) => {
          i.hc("AveragePool", oe, {
            format: Bo ? "NHWC" : "NCHW",
            auto_pad: Se,
            ceil_mode: Be,
            count_include_pad: Je,
            storage_order: ut,
            dilations: dn ? Array.from(H().subarray(Number(dn) >>> 0, Number(Xn) >>> 0)) : [],
            kernel_shape: Rr ? Array.from(H().subarray(Number(Rr) >>> 0, Number(Vr) >>> 0)) : [],
            pads: ca ? Array.from(H().subarray(Number(ca) >>> 0, Number(za) >>> 0)) : [],
            strides: Xr ? Array.from(H().subarray(Number(Xr) >>> 0, Number(fi) >>> 0)) : []
          });
        },
        1328424: (oe, Se) => {
          i.hc("GlobalMaxPool", oe, {
            format: Se ? "NHWC" : "NCHW"
          });
        },
        1328511: (oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca, za, Xr, fi, Bo) => {
          i.hc("MaxPool", oe, {
            format: Bo ? "NHWC" : "NCHW",
            auto_pad: Se,
            ceil_mode: Be,
            count_include_pad: Je,
            storage_order: ut,
            dilations: dn ? Array.from(H().subarray(Number(dn) >>> 0, Number(Xn) >>> 0)) : [],
            kernel_shape: Rr ? Array.from(H().subarray(Number(Rr) >>> 0, Number(Vr) >>> 0)) : [],
            pads: ca ? Array.from(H().subarray(Number(ca) >>> 0, Number(za) >>> 0)) : [],
            strides: Xr ? Array.from(H().subarray(Number(Xr) >>> 0, Number(fi) >>> 0)) : []
          });
        },
        1328986: (oe, Se) => {
          i.hc("GlobalMaxPool", oe, {
            format: Se ? "NHWC" : "NCHW"
          });
        },
        1329073: (oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca, za, Xr, fi, Bo) => {
          i.hc("MaxPool", oe, {
            format: Bo ? "NHWC" : "NCHW",
            auto_pad: Se,
            ceil_mode: Be,
            count_include_pad: Je,
            storage_order: ut,
            dilations: dn ? Array.from(H().subarray(Number(dn) >>> 0, Number(Xn) >>> 0)) : [],
            kernel_shape: Rr ? Array.from(H().subarray(Number(Rr) >>> 0, Number(Vr) >>> 0)) : [],
            pads: ca ? Array.from(H().subarray(Number(ca) >>> 0, Number(za) >>> 0)) : [],
            strides: Xr ? Array.from(H().subarray(Number(Xr) >>> 0, Number(fi) >>> 0)) : []
          });
        },
        1329548: (oe, Se, Be, Je, ut) => {
          i.hc("Gemm", oe, {
            alpha: Se,
            beta: Be,
            transA: Je,
            transB: ut
          });
        },
        1329652: oe => {
          i.hc("MatMul", oe, void 0);
        },
        1329706: (oe, Se, Be, Je) => {
          i.hc("ArgMax", oe, {
            keepDims: !!Se,
            selectLastIndex: !!Be,
            axis: Je
          });
        },
        1329814: (oe, Se, Be, Je) => {
          i.hc("ArgMin", oe, {
            keepDims: !!Se,
            selectLastIndex: !!Be,
            axis: Je
          });
        },
        1329922: (oe, Se) => {
          i.hc("Softmax", oe, {
            axis: Se
          });
        },
        1329985: (oe, Se) => {
          i.hc("Concat", oe, {
            axis: Se
          });
        },
        1330045: (oe, Se, Be, Je, ut) => {
          i.hc("Split", oe, {
            axis: Se,
            numOutputs: Be,
            splitSizes: Je ? Array.from(H().subarray(Number(Je) >>> 0, Number(ut) >>> 0)) : []
          });
        },
        1330201: oe => {
          i.hc("Expand", oe, void 0);
        },
        1330255: (oe, Se) => {
          i.hc("Gather", oe, {
            axis: Number(Se)
          });
        },
        1330326: (oe, Se) => {
          i.hc("GatherElements", oe, {
            axis: Number(Se)
          });
        },
        1330405: (oe, Se) => {
          i.hc("GatherND", oe, {
            batch_dims: Number(Se)
          });
        },
        1330484: (oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca, za) => {
          i.hc("Resize", oe, {
            antialias: Se,
            axes: Be ? Array.from(H().subarray(Number(Be) >>> 0, Number(Je) >>> 0)) : [],
            coordinateTransformMode: Ze(ut),
            cubicCoeffA: dn,
            excludeOutside: Xn,
            extrapolationValue: Rr,
            keepAspectRatioPolicy: Ze(Vr),
            mode: Ze(ca),
            nearestMode: Ze(za)
          });
        },
        1330846: (oe, Se, Be, Je, ut, dn, Xn) => {
          i.hc("Slice", oe, {
            starts: Se ? Array.from(H().subarray(Number(Se) >>> 0, Number(Be) >>> 0)) : [],
            ends: Je ? Array.from(H().subarray(Number(Je) >>> 0, Number(ut) >>> 0)) : [],
            axes: dn ? Array.from(H().subarray(Number(dn) >>> 0, Number(Xn) >>> 0)) : []
          });
        },
        1331110: oe => {
          i.hc("Tile", oe, void 0);
        },
        1331162: (oe, Se, Be) => {
          i.hc("InstanceNormalization", oe, {
            epsilon: Se,
            format: Be ? "NHWC" : "NCHW"
          });
        },
        1331276: (oe, Se, Be) => {
          i.hc("InstanceNormalization", oe, {
            epsilon: Se,
            format: Be ? "NHWC" : "NCHW"
          });
        },
        1331390: oe => {
          i.hc("Range", oe, void 0);
        },
        1331443: (oe, Se) => {
          i.hc("Einsum", oe, {
            equation: Ze(Se)
          });
        },
        1331524: (oe, Se, Be, Je, ut) => {
          i.hc("Pad", oe, {
            mode: Se,
            value: Be,
            pads: Je ? Array.from(H().subarray(Number(Je) >>> 0, Number(ut) >>> 0)) : []
          });
        },
        1331667: (oe, Se, Be, Je, ut, dn) => {
          i.hc("BatchNormalization", oe, {
            epsilon: Se,
            momentum: Be,
            spatial: !!ut,
            trainingMode: !!Je,
            format: dn ? "NHWC" : "NCHW"
          });
        },
        1331836: (oe, Se, Be, Je, ut, dn) => {
          i.hc("BatchNormalization", oe, {
            epsilon: Se,
            momentum: Be,
            spatial: !!ut,
            trainingMode: !!Je,
            format: dn ? "NHWC" : "NCHW"
          });
        },
        1332005: (oe, Se, Be) => {
          i.hc("CumSum", oe, {
            exclusive: Number(Se),
            reverse: Number(Be)
          });
        },
        1332102: (oe, Se, Be) => {
          i.hc("DequantizeLinear", oe, {
            axis: Se,
            blockSize: Be
          });
        },
        1332192: (oe, Se, Be, Je, ut) => {
          i.hc("GridSample", oe, {
            align_corners: Se,
            mode: Ze(Be),
            padding_mode: Ze(Je),
            format: ut ? "NHWC" : "NCHW"
          });
        },
        1332362: (oe, Se, Be, Je, ut) => {
          i.hc("GridSample", oe, {
            align_corners: Se,
            mode: Ze(Be),
            padding_mode: Ze(Je),
            format: ut ? "NHWC" : "NCHW"
          });
        },
        1332532: (oe, Se) => {
          i.hc("ScatterND", oe, {
            reduction: Ze(Se)
          });
        },
        1332617: (oe, Se, Be, Je, ut, dn, Xn, Rr, Vr) => {
          i.hc("Attention", oe, {
            numHeads: Se,
            isUnidirectional: Be,
            maskFilterValue: Je,
            scale: ut,
            doRotary: dn,
            qkvHiddenSizes: Xn ? Array.from(H().subarray(Number(Rr) >>> 0, Number(Rr) + Xn >>> 0)) : [],
            pastPresentShareBuffer: !!Vr
          });
        },
        1332889: oe => {
          i.hc("BiasAdd", oe, void 0);
        },
        1332944: oe => {
          i.hc("BiasSplitGelu", oe, void 0);
        },
        1333005: oe => {
          i.hc("FastGelu", oe, void 0);
        },
        1333061: (oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca, za, Xr, fi, Bo, sl, xu) => {
          i.hc("Conv", oe, {
            format: Xr ? "NHWC" : "NCHW",
            auto_pad: Se,
            dilations: Be ? Array.from(H().subarray(Number(Be) >>> 0, Number(Je) >>> 0)) : [],
            group: ut,
            kernel_shape: dn ? Array.from(H().subarray(Number(dn) >>> 0, Number(Xn) >>> 0)) : [],
            pads: Rr ? Array.from(H().subarray(Number(Rr) >>> 0, Number(Vr) >>> 0)) : [],
            strides: ca ? Array.from(H().subarray(Number(ca) >>> 0, Number(za) >>> 0)) : [],
            w_is_const: () => !!O()[Number(fi) >>> 0],
            activation: Ze(Bo),
            activation_params: sl ? Array.from(K().subarray(Number(sl) >>> 0, Number(xu) >>> 0)) : []
          });
        },
        1333645: oe => {
          i.hc("Gelu", oe, void 0);
        },
        1333697: (oe, Se, Be, Je, ut, dn, Xn, Rr, Vr) => {
          i.hc("GroupQueryAttention", oe, {
            numHeads: Se,
            kvNumHeads: Be,
            scale: Je,
            softcap: ut,
            doRotary: dn,
            rotaryInterleaved: Xn,
            smoothSoftmax: Rr,
            localWindowSize: Vr
          });
        },
        1333914: (oe, Se, Be, Je) => {
          i.hc("LayerNormalization", oe, {
            axis: Se,
            epsilon: Be,
            simplified: !!Je
          });
        },
        1334025: (oe, Se, Be, Je) => {
          i.hc("LayerNormalization", oe, {
            axis: Se,
            epsilon: Be,
            simplified: !!Je
          });
        },
        1334136: (oe, Se, Be, Je, ut, dn) => {
          i.hc("MatMulNBits", oe, {
            k: Se,
            n: Be,
            accuracyLevel: Je,
            bits: ut,
            blockSize: dn
          });
        },
        1334263: (oe, Se, Be, Je, ut, dn) => {
          i.hc("MultiHeadAttention", oe, {
            numHeads: Se,
            isUnidirectional: Be,
            maskFilterValue: Je,
            scale: ut,
            doRotary: dn
          });
        },
        1334422: (oe, Se) => {
          i.hc("QuickGelu", oe, {
            alpha: Se
          });
        },
        1334486: (oe, Se, Be, Je, ut) => {
          i.hc("RotaryEmbedding", oe, {
            interleaved: !!Se,
            numHeads: Be,
            rotaryEmbeddingDim: Je,
            scale: ut
          });
        },
        1334625: (oe, Se, Be) => {
          i.hc("SkipLayerNormalization", oe, {
            epsilon: Se,
            simplified: !!Be
          });
        },
        1334727: (oe, Se, Be) => {
          i.hc("SkipLayerNormalization", oe, {
            epsilon: Se,
            simplified: !!Be
          });
        },
        1334829: (oe, Se, Be, Je) => {
          i.hc("GatherBlockQuantized", oe, {
            gatherAxis: Se,
            quantizeAxis: Be,
            blockSize: Je
          });
        },
        1334950: oe => {
          i.Wd(oe);
        },
        1334984: (oe, Se) => i.Zd(Number(oe), Number(Se), i.Cd.be, i.Cd.errors)
      };
      function re(oe, Se, Be) {
        return Wn(async () => {
          await i.Ud(Number(oe), Number(Se), Number(Be));
        });
      }
      function fe() {
        return typeof wasmOffsetConverter < "u";
      }
      class ye {
        constructor(Se) {
          On(this, "name", "ExitStatus");
          this.message = `Program terminated with exit(${Se})`, this.status = Se;
        }
      }
      var ie = oe => {
          oe.terminate(), oe.onmessage = () => {};
        },
        ae = [],
        be = oe => {
          _e.length == 0 && (Fe(), Ae(_e[0]));
          var Se = _e.pop();
          if (!Se) return 6;
          ke.push(Se), Te[oe.xd] = Se, Se.xd = oe.xd;
          var Be = {
            yd: "run",
            de: oe.ce,
            Fd: oe.Fd,
            xd: oe.xd
          };
          return Se.postMessage(Be, oe.Ld), 0;
        },
        Ee = 0,
        xe = (oe, Se, ...Be) => {
          for (var Je = 2 * Be.length, ut = pr(), dn = ui(8 * Je), Xn = dn >>> 3, Rr = 0; Rr < Be.length; Rr++) {
            var Vr = Be[Rr];
            typeof Vr == "bigint" ? (B[Xn + 2 * Rr] = 1n, B[Xn + 2 * Rr + 1] = Vr) : (B[Xn + 2 * Rr] = 0n, W()[Xn + 2 * Rr + 1 >>> 0] = Vr);
          }
          return oe = xa(oe, 0, Je, dn, Se), Ra(ut), oe;
        };
      function he(oe) {
        if (d) return xe(0, 1, oe);
        if (C = oe, !(0 < Ee)) {
          for (var Se of ke) ie(Se);
          for (Se of _e) ie(Se);
          _e = [], ke = [], Te = {}, z = !0;
        }
        y(0, new ye(oe));
      }
      function ue(oe) {
        if (d) return xe(1, 0, oe);
        ge(oe);
      }
      var ge = oe => {
          if (C = oe, d) throw ue(oe), "unwind";
          he(oe);
        },
        _e = [],
        ke = [],
        ve = [],
        Te = {},
        Ne = oe => {
          var Se = oe.xd;
          delete Te[Se], _e.push(oe), ke.splice(ke.indexOf(oe), 1), oe.xd = 0, Aa(Se);
        };
      function me() {
        ve.forEach(oe => oe());
      }
      var Ae = oe => new Promise(Se => {
        oe.onmessage = ut => {
          var dn = (ut = ut.data).yd;
          if (ut.Ed && ut.Ed != or()) {
            var Xn = Te[ut.Ed];
            Xn ? Xn.postMessage(ut, ut.Ld) : k(`Internal error! Worker sent a message "${dn}" to target pthread ${ut.Ed}, but that thread no longer exists!`);
          } else dn === "checkMailbox" ? Dn() : dn === "spawnThread" ? be(ut) : dn === "cleanupThread" ? Ne(Te[ut.ee]) : dn === "loaded" ? (oe.loaded = !0, Se(oe)) : dn === "alert" ? alert(`Thread ${ut.fe}: ${ut.text}`) : ut.target === "setimmediate" ? oe.postMessage(ut) : dn === "callHandler" ? i[ut.Nd](...ut.args) : dn && k(`worker sent an unknown command ${dn}`);
        }, oe.onerror = ut => {
          throw k(`worker sent an error! ${ut.filename}:${ut.lineno}: ${ut.message}`), ut;
        };
        var Be,
          Je = [];
        for (Be of []) i.propertyIsEnumerable(Be) && Je.push(Be);
        oe.postMessage({
          yd: "load",
          Od: Je,
          he: A,
          ie: S
        });
      });
      function Fe() {
        var oe = new Worker(import.meta.url.startsWith("file:") ? new URL("" + new URL("ort.webgpu.bundle.min-CEayb2S6.mjs", import.meta.url).href, import.meta.url) : new URL(import.meta.url), {
          type: "module",
          workerData: "em-pthread",
          name: "em-pthread"
        });
        _e.push(oe);
      }
      var Me = oe => {
          ne();
          var Se = Y()[oe + 52 >>> 2 >>> 0];
          oe = Y()[oe + 56 >>> 2 >>> 0], Fa(Se, Se - oe), Ra(Se);
        },
        Re = (oe, Se) => {
          Ee = 0, oe = Vi(oe, Se), 0 < Ee ? C = oe : pn(oe);
        },
        $e = [];
      function rt(oe) {
        var Se = new Le(oe >>>= 0);
        if (O()[Se.wd + 12 >>> 0] == 0) {
          var Be = 1;
          O()[Se.wd + 12 >>> 0] = Be;
        }
        return Be = 0, O()[Se.wd + 13 >>> 0] = Be, $e.push(Se), fr(oe), Ba(oe);
      }
      var nt = 0,
        ze = () => {
          qr(0, 0);
          var oe = $e.pop();
          In(oe.Gd), nt = 0;
        };
      class Le {
        constructor(Se) {
          this.Gd = Se, this.wd = Se - 24;
        }
      }
      function Ke(oe) {
        throw nt || (nt = oe >>> 0), nt;
      }
      var Xe = oe => {
        var Se = nt;
        if (!Se) return Oa(0), 0;
        var Be = new Le(Se);
        Y()[Be.wd + 16 >>> 2 >>> 0] = Se;
        var Je = Y()[Be.wd + 4 >>> 2 >>> 0];
        if (!Je) return Oa(0), Se;
        for (var ut of oe) {
          if (ut === 0 || ut === Je) break;
          if (na(ut, Je, Be.wd + 16)) return Oa(ut), Se;
        }
        return Oa(Je), Se;
      };
      function De() {
        return Xe([]);
      }
      function Ye(oe) {
        return Xe([oe >>> 0]);
      }
      function Ce(oe, Se) {
        return Xe([oe >>> 0, Se >>> 0]);
      }
      var He = () => {
        var oe = $e.pop();
        oe || we("no exception to throw");
        var Se = oe.Gd;
        if (O()[oe.wd + 13 >>> 0] == 0) {
          $e.push(oe);
          var Be = 1;
          O()[oe.wd + 13 >>> 0] = Be, Be = 0, O()[oe.wd + 12 >>> 0] = Be;
        }
        throw nt = Se;
      };
      function Ve(oe, Se, Be) {
        var Je = new Le(oe >>>= 0);
        throw Se >>>= 0, Be >>>= 0, Y()[Je.wd + 16 >>> 2 >>> 0] = 0, Y()[Je.wd + 4 >>> 2 >>> 0] = Se, Y()[Je.wd + 8 >>> 2 >>> 0] = Be, nt = oe;
      }
      function it(oe, Se, Be, Je) {
        return d ? xe(2, 1, oe, Se, Be, Je) : It(oe, Se, Be, Je);
      }
      function It(oe, Se, Be, Je) {
        if (oe >>>= 0, Be >>>= 0, Je >>>= 0, u === void 0) return 6;
        var ut = [];
        return d && ut.length === 0 ? it(oe, Se >>>= 0, Be, Je) : (oe = {
          ce: Be,
          xd: oe,
          Fd: Je,
          Ld: ut
        }, d ? (oe.yd = "spawnThread", postMessage(oe, ut), 0) : be(oe));
      }
      var Ft = typeof TextDecoder < "u" ? new TextDecoder() : void 0,
        We = (oe, Se = 0, Be = NaN) => {
          var Je = (Se >>>= 0) + Be;
          for (Be = Se; oe[Be] && !(Be >= Je);) ++Be;
          if (16 < Be - Se && oe.buffer && Ft) return Ft.decode(oe.buffer instanceof ArrayBuffer ? oe.subarray(Se, Be) : oe.slice(Se, Be));
          for (Je = ""; Se < Be;) {
            var ut = oe[Se++];
            if (128 & ut) {
              var dn = 63 & oe[Se++];
              if ((224 & ut) == 192) Je += String.fromCharCode((31 & ut) << 6 | dn);else {
                var Xn = 63 & oe[Se++];
                65536 > (ut = (240 & ut) == 224 ? (15 & ut) << 12 | dn << 6 | Xn : (7 & ut) << 18 | dn << 12 | Xn << 6 | 63 & oe[Se++]) ? Je += String.fromCharCode(ut) : (ut -= 65536, Je += String.fromCharCode(55296 | ut >> 10, 56320 | 1023 & ut));
              }
            } else Je += String.fromCharCode(ut);
          }
          return Je;
        },
        Ze = (oe, Se) => (oe >>>= 0) ? We(L(), oe, Se) : "";
      function Ge(oe, Se, Be) {
        return d ? xe(3, 1, oe, Se, Be) : 0;
      }
      function Oe(oe, Se) {
        if (d) return xe(4, 1, oe, Se);
      }
      var st = oe => {
          for (var Se = 0, Be = 0; Be < oe.length; ++Be) {
            var Je = oe.charCodeAt(Be);
            127 >= Je ? Se++ : 2047 >= Je ? Se += 2 : 55296 <= Je && 57343 >= Je ? (Se += 4, ++Be) : Se += 3;
          }
          return Se;
        },
        vt = (oe, Se, Be) => {
          var Je = L();
          if (Se >>>= 0, 0 < Be) {
            var ut = Se;
            Be = Se + Be - 1;
            for (var dn = 0; dn < oe.length; ++dn) {
              var Xn = oe.charCodeAt(dn);
              if (55296 <= Xn && 57343 >= Xn && (Xn = 65536 + ((1023 & Xn) << 10) | 1023 & oe.charCodeAt(++dn)), 127 >= Xn) {
                if (Se >= Be) break;
                Je[Se++ >>> 0] = Xn;
              } else {
                if (2047 >= Xn) {
                  if (Se + 1 >= Be) break;
                  Je[Se++ >>> 0] = 192 | Xn >> 6;
                } else {
                  if (65535 >= Xn) {
                    if (Se + 2 >= Be) break;
                    Je[Se++ >>> 0] = 224 | Xn >> 12;
                  } else {
                    if (Se + 3 >= Be) break;
                    Je[Se++ >>> 0] = 240 | Xn >> 18, Je[Se++ >>> 0] = 128 | Xn >> 12 & 63;
                  }
                  Je[Se++ >>> 0] = 128 | Xn >> 6 & 63;
                }
                Je[Se++ >>> 0] = 128 | 63 & Xn;
              }
            }
            Je[Se >>> 0] = 0, oe = Se - ut;
          } else oe = 0;
          return oe;
        };
      function Ht(oe, Se) {
        if (d) return xe(5, 1, oe, Se);
      }
      function nn(oe, Se, Be) {
        if (d) return xe(6, 1, oe, Se, Be);
      }
      function pt(oe, Se, Be) {
        return d ? xe(7, 1, oe, Se, Be) : 0;
      }
      function lt(oe, Se) {
        if (d) return xe(8, 1, oe, Se);
      }
      function gt(oe, Se, Be) {
        if (d) return xe(9, 1, oe, Se, Be);
      }
      function Ut(oe, Se, Be, Je) {
        if (d) return xe(10, 1, oe, Se, Be, Je);
      }
      function _t(oe, Se, Be, Je) {
        if (d) return xe(11, 1, oe, Se, Be, Je);
      }
      function At(oe, Se, Be, Je) {
        if (d) return xe(12, 1, oe, Se, Be, Je);
      }
      function Yt(oe) {
        if (d) return xe(13, 1, oe);
      }
      function qe(oe, Se) {
        if (d) return xe(14, 1, oe, Se);
      }
      function kt(oe, Se, Be) {
        if (d) return xe(15, 1, oe, Se, Be);
      }
      var St,
        hn,
        Qt = () => we(""),
        Ot = oe => {
          for (var Se = ""; L()[oe >>> 0];) Se += St[L()[oe++ >>> 0]];
          return Se;
        },
        ln = {},
        Pn = {};
      function rn(oe, Se, Be = {}) {
        return (function (Je, ut, dn = {}) {
          var Xn = ut.name;
          if (!Je) throw new hn(`type "${Xn}" must have a positive integer typeid pointer`);
          if (Pn.hasOwnProperty(Je)) {
            if (dn.Pd) return;
            throw new hn(`Cannot register type '${Xn}' twice`);
          }
          Pn[Je] = ut, ln.hasOwnProperty(Je) && (ut = ln[Je], delete ln[Je], ut.forEach(Rr => Rr()));
        })(oe, Se, Be);
      }
      var Yn = (oe, Se, Be) => {
        switch (Se) {
          case 1:
            return Be ? Je => O()[Je >>> 0] : Je => L()[Je >>> 0];
          case 2:
            return Be ? Je => D()[Je >>> 1 >>> 0] : Je => U()[Je >>> 1 >>> 0];
          case 4:
            return Be ? Je => H()[Je >>> 2 >>> 0] : Je => Y()[Je >>> 2 >>> 0];
          case 8:
            return Be ? Je => B[Je >>> 3] : Je => F[Je >>> 3];
          default:
            throw new TypeError(`invalid integer width (${Se}): ${oe}`);
        }
      };
      function Ct(oe, Se, Be) {
        Be >>>= 0, rn(oe >>>= 0, {
          name: Se = Ot(Se >>> 0),
          fromWireType: Je => Je,
          toWireType: function (Je, ut) {
            if (typeof ut != "bigint" && typeof ut != "number") throw ut = ut === null ? "null" : (Je = typeof ut) == "object" || Je === "array" || Je === "function" ? ut.toString() : "" + ut, new TypeError(`Cannot convert "${ut}" to ${this.name}`);
            return typeof ut == "number" && (ut = BigInt(ut)), ut;
          },
          zd: Cn,
          readValueFromPointer: Yn(Se, Be, Se.indexOf("u") == -1),
          Ad: null
        });
      }
      var Cn = 8;
      function un(oe, Se, Be, Je) {
        rn(oe >>>= 0, {
          name: Se = Ot(Se >>> 0),
          fromWireType: function (ut) {
            return !!ut;
          },
          toWireType: function (ut, dn) {
            return dn ? Be : Je;
          },
          zd: Cn,
          readValueFromPointer: function (ut) {
            return this.fromWireType(L()[ut >>> 0]);
          },
          Ad: null
        });
      }
      var Jn = [],
        Kn = [];
      function en(oe) {
        9 < (oe >>>= 0) && --Kn[oe + 1] == 0 && (Kn[oe] = void 0, Jn.push(oe));
      }
      var Vn = oe => {
          if (!oe) throw new hn("Cannot use deleted val. handle = " + oe);
          return Kn[oe];
        },
        Tt = oe => {
          switch (oe) {
            case void 0:
              return 2;
            case null:
              return 4;
            case !0:
              return 6;
            case !1:
              return 8;
            default:
              let Se = Jn.pop() || Kn.length;
              return Kn[Se] = oe, Kn[Se + 1] = 1, Se;
          }
        };
      function Ue(oe) {
        return this.fromWireType(Y()[oe >>> 2 >>> 0]);
      }
      var et = {
        name: "emscripten::val",
        fromWireType: oe => {
          var Se = Vn(oe);
          return en(oe), Se;
        },
        toWireType: (oe, Se) => Tt(Se),
        zd: Cn,
        readValueFromPointer: Ue,
        Ad: null
      };
      function ft(oe) {
        return rn(oe >>> 0, et);
      }
      var ht = (oe, Se) => {
        switch (Se) {
          case 4:
            return function (Be) {
              return this.fromWireType(K()[Be >>> 2 >>> 0]);
            };
          case 8:
            return function (Be) {
              return this.fromWireType(W()[Be >>> 3 >>> 0]);
            };
          default:
            throw new TypeError(`invalid float width (${Se}): ${oe}`);
        }
      };
      function wt(oe, Se, Be) {
        Be >>>= 0, rn(oe >>>= 0, {
          name: Se = Ot(Se >>> 0),
          fromWireType: Je => Je,
          toWireType: (Je, ut) => ut,
          zd: Cn,
          readValueFromPointer: ht(Se, Be),
          Ad: null
        });
      }
      function jt(oe, Se, Be, Je, ut) {
        if (oe >>>= 0, Be >>>= 0, Se = Ot(Se >>> 0), ut === -1 && (ut = 4294967295), ut = Rr => Rr, Je === 0) {
          var dn = 32 - 8 * Be;
          ut = Rr => Rr << dn >>> dn;
        }
        var Xn = Se.includes("unsigned") ? function (Rr, Vr) {
          return Vr >>> 0;
        } : function (Rr, Vr) {
          return Vr;
        };
        rn(oe, {
          name: Se,
          fromWireType: ut,
          toWireType: Xn,
          zd: Cn,
          readValueFromPointer: Yn(Se, Be, Je !== 0),
          Ad: null
        });
      }
      function bt(oe, Se, Be) {
        function Je(dn) {
          var Xn = Y()[dn >>> 2 >>> 0];
          return dn = Y()[dn + 4 >>> 2 >>> 0], new ut(O().buffer, dn, Xn);
        }
        var ut = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array][Se];
        rn(oe >>>= 0, {
          name: Be = Ot(Be >>> 0),
          fromWireType: Je,
          zd: Cn,
          readValueFromPointer: Je
        }, {
          Pd: !0
        });
      }
      function Bt(oe, Se) {
        rn(oe >>>= 0, {
          name: Se = Ot(Se >>> 0),
          fromWireType: function (Be) {
            for (var Je, ut = Y()[Be >>> 2 >>> 0], dn = Be + 4, Xn = dn, Rr = 0; Rr <= ut; ++Rr) {
              var Vr = dn + Rr;
              Rr != ut && L()[Vr >>> 0] != 0 || (Xn = Ze(Xn, Vr - Xn), Je === void 0 ? Je = Xn : (Je += "\0", Je += Xn), Xn = Vr + 1);
            }
            return mr(Be), Je;
          },
          toWireType: function (Be, Je) {
            Je instanceof ArrayBuffer && (Je = new Uint8Array(Je));
            var ut = typeof Je == "string";
            if (!(ut || Je instanceof Uint8Array || Je instanceof Uint8ClampedArray || Je instanceof Int8Array)) throw new hn("Cannot pass non-string to std::string");
            var dn = ut ? st(Je) : Je.length,
              Xn = Yr(4 + dn + 1),
              Rr = Xn + 4;
            if (Y()[Xn >>> 2 >>> 0] = dn, ut) vt(Je, Rr, dn + 1);else if (ut) for (ut = 0; ut < dn; ++ut) {
              var Vr = Je.charCodeAt(ut);
              if (255 < Vr) throw mr(Xn), new hn("String has UTF-16 code units that do not fit in 8 bits");
              L()[Rr + ut >>> 0] = Vr;
            } else for (ut = 0; ut < dn; ++ut) L()[Rr + ut >>> 0] = Je[ut];
            return Be !== null && Be.push(mr, Xn), Xn;
          },
          zd: Cn,
          readValueFromPointer: Ue,
          Ad(Be) {
            mr(Be);
          }
        });
      }
      var wn = typeof TextDecoder < "u" ? new TextDecoder("utf-16le") : void 0,
        at = (oe, Se) => {
          for (var Be = oe >> 1, Je = Be + Se / 2; !(Be >= Je) && U()[Be >>> 0];) ++Be;
          if (32 < (Be <<= 1) - oe && wn) return wn.decode(L().slice(oe, Be));
          for (Be = "", Je = 0; !(Je >= Se / 2); ++Je) {
            var ut = D()[oe + 2 * Je >>> 1 >>> 0];
            if (ut == 0) break;
            Be += String.fromCharCode(ut);
          }
          return Be;
        },
        Pt = (oe, Se, Be) => {
          if (Be ?? (Be = 2147483647), 2 > Be) return 0;
          var Je = Se;
          Be = (Be -= 2) < 2 * oe.length ? Be / 2 : oe.length;
          for (var ut = 0; ut < Be; ++ut) {
            var dn = oe.charCodeAt(ut);
            D()[Se >>> 1 >>> 0] = dn, Se += 2;
          }
          return D()[Se >>> 1 >>> 0] = 0, Se - Je;
        },
        dt = oe => 2 * oe.length,
        xt = (oe, Se) => {
          for (var Be = 0, Je = ""; !(Be >= Se / 4);) {
            var ut = H()[oe + 4 * Be >>> 2 >>> 0];
            if (ut == 0) break;
            ++Be, 65536 <= ut ? (ut -= 65536, Je += String.fromCharCode(55296 | ut >> 10, 56320 | 1023 & ut)) : Je += String.fromCharCode(ut);
          }
          return Je;
        },
        yn = (oe, Se, Be) => {
          if (Se >>>= 0, Be ?? (Be = 2147483647), 4 > Be) return 0;
          var Je = Se;
          Be = Je + Be - 4;
          for (var ut = 0; ut < oe.length; ++ut) {
            var dn = oe.charCodeAt(ut);
            if (55296 <= dn && 57343 >= dn && (dn = 65536 + ((1023 & dn) << 10) | 1023 & oe.charCodeAt(++ut)), H()[Se >>> 2 >>> 0] = dn, (Se += 4) + 4 > Be) break;
          }
          return H()[Se >>> 2 >>> 0] = 0, Se - Je;
        },
        gn = oe => {
          for (var Se = 0, Be = 0; Be < oe.length; ++Be) {
            var Je = oe.charCodeAt(Be);
            55296 <= Je && 57343 >= Je && ++Be, Se += 4;
          }
          return Se;
        };
      function mt(oe, Se, Be) {
        if (oe >>>= 0, Se >>>= 0, Be = Ot(Be >>>= 0), Se === 2) var Je = at,
          ut = Pt,
          dn = dt,
          Xn = Rr => U()[Rr >>> 1 >>> 0];else Se === 4 && (Je = xt, ut = yn, dn = gn, Xn = Rr => Y()[Rr >>> 2 >>> 0]);
        rn(oe, {
          name: Be,
          fromWireType: Rr => {
            for (var Vr, ca = Y()[Rr >>> 2 >>> 0], za = Rr + 4, Xr = 0; Xr <= ca; ++Xr) {
              var fi = Rr + 4 + Xr * Se;
              Xr != ca && Xn(fi) != 0 || (za = Je(za, fi - za), Vr === void 0 ? Vr = za : (Vr += "\0", Vr += za), za = fi + Se);
            }
            return mr(Rr), Vr;
          },
          toWireType: (Rr, Vr) => {
            if (typeof Vr != "string") throw new hn(`Cannot pass non-string to C++ string type ${Be}`);
            var ca = dn(Vr),
              za = Yr(4 + ca + Se);
            return Y()[za >>> 2 >>> 0] = ca / Se, ut(Vr, za + 4, ca + Se), Rr !== null && Rr.push(mr, za), za;
          },
          zd: Cn,
          readValueFromPointer: Ue,
          Ad(Rr) {
            mr(Rr);
          }
        });
      }
      function Xt(oe, Se) {
        rn(oe >>>= 0, {
          Qd: !0,
          name: Se = Ot(Se >>> 0),
          zd: 0,
          fromWireType: () => {},
          toWireType: () => {}
        });
      }
      function Gn(oe) {
        aa(oe >>> 0, !l, 1, !s, 131072, !1), me();
      }
      var rr = oe => {
        if (!z) try {
          if (oe(), !(0 < Ee)) try {
            d ? pn(C) : ge(C);
          } catch (Se) {
            Se instanceof ye || Se == "unwind" || y(0, Se);
          }
        } catch (Se) {
          Se instanceof ye || Se == "unwind" || y(0, Se);
        }
      };
      function qn(oe) {
        oe >>>= 0, typeof Atomics.ge == "function" && (Atomics.ge(H(), oe >>> 2, oe).value.then(Dn), oe += 128, Atomics.store(H(), oe >>> 2, 1));
      }
      var Dn = () => {
        var oe = or();
        oe && (qn(oe), rr(Nr));
      };
      function Ar(oe, Se) {
        (oe >>>= 0) == Se >>> 0 ? setTimeout(Dn) : d ? postMessage({
          Ed: oe,
          yd: "checkMailbox"
        }) : (oe = Te[oe]) && oe.postMessage({
          yd: "checkMailbox"
        });
      }
      var _r = [];
      function Pa(oe, Se, Be, Je, ut) {
        for (Se >>>= 0, Je /= 2, _r.length = Je, Be = ut >>> 0 >>> 3, ut = 0; ut < Je; ut++) _r[ut] = B[Be + 2 * ut] ? B[Be + 2 * ut + 1] : W()[Be + 2 * ut + 1 >>> 0];
        return (Se ? Z[Se] : Et[oe])(..._r);
      }
      var fa = () => {
        Ee = 0;
      };
      function Ca(oe) {
        oe >>>= 0, d ? postMessage({
          yd: "cleanupThread",
          ee: oe
        }) : Ne(Te[oe]);
      }
      function $n(oe) {}
      var yr = (oe, Se) => {
          var Be = Pn[oe];
          if (Be === void 0) throw oe = zn(oe), Be = Ot(oe), mr(oe), new hn(`${Se} has unknown type ${Be}`);
          return Be;
        },
        Ir = (oe, Se, Be) => {
          var Je = [];
          return oe = oe.toWireType(Je, Be), Je.length && (Y()[Se >>> 2 >>> 0] = Tt(Je)), oe;
        };
      function Gr(oe, Se, Be) {
        return Se >>>= 0, Be >>>= 0, oe = Vn(oe >>> 0), Se = yr(Se, "emval::as"), Ir(Se, Be, oe);
      }
      function Zr(oe, Se) {
        return Se >>>= 0, oe = Vn(oe >>> 0), (Se = yr(Se, "emval::as")).toWireType(null, oe);
      }
      var La = oe => {
          try {
            oe();
          } catch (Se) {
            we(Se);
          }
        },
        sa = 0,
        Ea = null,
        ba = 0,
        ga = [],
        _a = {},
        $a = {},
        Ya = 0,
        ta = null,
        ki = [];
      function Wn(oe) {
        return (function (Se) {
          if (!z) {
            if (sa === 0) {
              var Be = !1,
                Je = !1;
              Se((ut = 0) => {
                if (!z && (ba = ut, Be = !0, Je)) {
                  sa = 2, La(() => fc(Ea)), typeof MainLoop < "u" && MainLoop.Md && MainLoop.resume(), ut = !1;
                  try {
                    var dn = (function () {
                      var Vr = H()[Ea + 8 >>> 2 >>> 0];
                      return Vr = Bn[$a[Vr]], --Ee, Vr();
                    })();
                  } catch (Vr) {
                    dn = Vr, ut = !0;
                  }
                  var Xn = !1;
                  if (!Ea) {
                    var Rr = ta;
                    Rr && (ta = null, (ut ? Rr.reject : Rr.resolve)(dn), Xn = !0);
                  }
                  if (ut && !Xn) throw dn;
                }
              }), Je = !0, Be || (sa = 1, Ea = (function () {
                var ut = Yr(65548),
                  dn = ut + 12;
                Y()[ut >>> 2 >>> 0] = dn, Y()[ut + 4 >>> 2 >>> 0] = dn + 65536, dn = ga[0];
                var Xn = _a[dn];
                return Xn === void 0 && (Xn = Ya++, _a[dn] = Xn, $a[Xn] = dn), dn = Xn, H()[ut + 8 >>> 2 >>> 0] = dn, ut;
              })(), typeof MainLoop < "u" && MainLoop.Md && MainLoop.pause(), La(() => ld(Ea)));
            } else sa === 2 ? (sa = 0, La(bu), mr(Ea), Ea = null, ki.forEach(rr)) : we(`invalid state: ${sa}`);
            return ba;
          }
        })(Se => {
          oe().then(Se);
        });
      }
      function wr(oe) {
        return oe >>>= 0, Wn(async () => {
          var Se = await Vn(oe);
          return Tt(Se);
        });
      }
      var jn = [];
      function _n(oe, Se, Be, Je) {
        return Be >>>= 0, Je >>>= 0, (oe = jn[oe >>> 0])(null, Se = Vn(Se >>> 0), Be, Je);
      }
      var ar = {},
        Vt = oe => {
          var Se = ar[oe];
          return Se === void 0 ? Ot(oe) : Se;
        };
      function vn(oe, Se, Be, Je, ut) {
        return Be >>>= 0, Je >>>= 0, ut >>>= 0, (oe = jn[oe >>> 0])(Se = Vn(Se >>> 0), Se[Be = Vt(Be)], Je, ut);
      }
      var An = () => typeof globalThis == "object" ? globalThis : Function("return this")();
      function ur(oe) {
        return (oe >>>= 0) == 0 ? Tt(An()) : (oe = Vt(oe), Tt(An()[oe]));
      }
      var zr = oe => {
          var Se = jn.length;
          return jn.push(oe), Se;
        },
        Dr = (oe, Se) => {
          for (var Be = Array(oe), Je = 0; Je < oe; ++Je) Be[Je] = yr(Y()[Se + 4 * Je >>> 2 >>> 0], "parameter " + Je);
          return Be;
        },
        Wr = (oe, Se) => Object.defineProperty(Se, "name", {
          value: oe
        });
      function gr(oe, Se, Be) {
        var Je = (Se = Dr(oe, Se >>> 0)).shift();
        oe--;
        var ut = `return function (obj, func, destructorsRef, args) {
`,
          dn = 0,
          Xn = [];
        Be === 0 && Xn.push("obj");
        for (var Rr = ["retType"], Vr = [Je], ca = 0; ca < oe; ++ca) Xn.push("arg" + ca), Rr.push("argType" + ca), Vr.push(Se[ca]), ut += `  var arg${ca} = argType${ca}.readValueFromPointer(args${dn ? "+" + dn : ""});
`, dn += Se[ca].zd;
        return ut += `  var rv = ${Be === 1 ? "new func" : "func.call"}(${Xn.join(", ")});
`, Je.Qd || (Rr.push("emval_returnValue"), Vr.push(Ir), ut += `  return emval_returnValue(retType, destructorsRef, rv);
`), Rr.push(ut + `};
`), oe = (function (za) {
          var Xr = Function;
          if (!(Xr instanceof Function)) throw new TypeError(`new_ called with constructor type ${typeof Xr} which is not a function`);
          var fi = Wr(Xr.name || "unknownFunctionName", function () {});
          return fi.prototype = Xr.prototype, fi = new fi(), (za = Xr.apply(fi, za)) instanceof Object ? za : fi;
        })(Rr)(...Vr), Be = `methodCaller<(${Se.map(za => za.name).join(", ")}) => ${Je.name}>`, zr(Wr(Be, oe));
      }
      function jr(oe) {
        return oe = Vt(oe >>> 0), Tt(i[oe]);
      }
      function ea(oe, Se) {
        return Se >>>= 0, oe = Vn(oe >>> 0), Se = Vn(Se), Tt(oe[Se]);
      }
      function pa(oe) {
        9 < (oe >>>= 0) && (Kn[oe + 1] += 1);
      }
      function Br() {
        return Tt([]);
      }
      function tn(oe) {
        oe = Vn(oe >>> 0);
        for (var Se = Array(oe.length), Be = 0; Be < oe.length; Be++) Se[Be] = oe[Be];
        return Tt(Se);
      }
      function Lr(oe) {
        return Tt(Vt(oe >>> 0));
      }
      function br() {
        return Tt({});
      }
      function Jr(oe) {
        for (var Se = Vn(oe >>>= 0); Se.length;) {
          var Be = Se.pop();
          Se.pop()(Be);
        }
        en(oe);
      }
      function Kr(oe, Se, Be) {
        Se >>>= 0, Be >>>= 0, oe = Vn(oe >>> 0), Se = Vn(Se), Be = Vn(Be), oe[Se] = Be;
      }
      function ir(oe, Se) {
        return Se >>>= 0, oe = (oe = yr(oe >>> 0, "_emval_take_value")).readValueFromPointer(Se), Tt(oe);
      }
      function Hr(oe, Se) {
        oe = -9007199254740992 > oe || 9007199254740992 < oe ? NaN : Number(oe), Se >>>= 0, oe = new Date(1e3 * oe), H()[Se >>> 2 >>> 0] = oe.getUTCSeconds(), H()[Se + 4 >>> 2 >>> 0] = oe.getUTCMinutes(), H()[Se + 8 >>> 2 >>> 0] = oe.getUTCHours(), H()[Se + 12 >>> 2 >>> 0] = oe.getUTCDate(), H()[Se + 16 >>> 2 >>> 0] = oe.getUTCMonth(), H()[Se + 20 >>> 2 >>> 0] = oe.getUTCFullYear() - 1900, H()[Se + 24 >>> 2 >>> 0] = oe.getUTCDay(), oe = (oe.getTime() - Date.UTC(oe.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864e5 | 0, H()[Se + 28 >>> 2 >>> 0] = oe;
      }
      var ha = oe => oe % 4 == 0 && (oe % 100 != 0 || oe % 400 == 0),
        Ga = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335],
        Za = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
      function va(oe, Se) {
        oe = -9007199254740992 > oe || 9007199254740992 < oe ? NaN : Number(oe), Se >>>= 0, oe = new Date(1e3 * oe), H()[Se >>> 2 >>> 0] = oe.getSeconds(), H()[Se + 4 >>> 2 >>> 0] = oe.getMinutes(), H()[Se + 8 >>> 2 >>> 0] = oe.getHours(), H()[Se + 12 >>> 2 >>> 0] = oe.getDate(), H()[Se + 16 >>> 2 >>> 0] = oe.getMonth(), H()[Se + 20 >>> 2 >>> 0] = oe.getFullYear() - 1900, H()[Se + 24 >>> 2 >>> 0] = oe.getDay();
        var Be = (ha(oe.getFullYear()) ? Ga : Za)[oe.getMonth()] + oe.getDate() - 1 | 0;
        H()[Se + 28 >>> 2 >>> 0] = Be, H()[Se + 36 >>> 2 >>> 0] = -60 * oe.getTimezoneOffset(), Be = new Date(oe.getFullYear(), 6, 1).getTimezoneOffset();
        var Je = new Date(oe.getFullYear(), 0, 1).getTimezoneOffset();
        oe = 0 | (Be != Je && oe.getTimezoneOffset() == Math.min(Je, Be)), H()[Se + 32 >>> 2 >>> 0] = oe;
      }
      function Kt(oe) {
        oe >>>= 0;
        var Se = new Date(H()[oe + 20 >>> 2 >>> 0] + 1900, H()[oe + 16 >>> 2 >>> 0], H()[oe + 12 >>> 2 >>> 0], H()[oe + 8 >>> 2 >>> 0], H()[oe + 4 >>> 2 >>> 0], H()[oe >>> 2 >>> 0], 0),
          Be = H()[oe + 32 >>> 2 >>> 0],
          Je = Se.getTimezoneOffset(),
          ut = new Date(Se.getFullYear(), 6, 1).getTimezoneOffset(),
          dn = new Date(Se.getFullYear(), 0, 1).getTimezoneOffset(),
          Xn = Math.min(dn, ut);
        return 0 > Be ? H()[oe + 32 >>> 2 >>> 0] = +(ut != dn && Xn == Je) : 0 < Be != (Xn == Je) && (ut = Math.max(dn, ut), Se.setTime(Se.getTime() + 6e4 * ((0 < Be ? Xn : ut) - Je))), H()[oe + 24 >>> 2 >>> 0] = Se.getDay(), Be = (ha(Se.getFullYear()) ? Ga : Za)[Se.getMonth()] + Se.getDate() - 1 | 0, H()[oe + 28 >>> 2 >>> 0] = Be, H()[oe >>> 2 >>> 0] = Se.getSeconds(), H()[oe + 4 >>> 2 >>> 0] = Se.getMinutes(), H()[oe + 8 >>> 2 >>> 0] = Se.getHours(), H()[oe + 12 >>> 2 >>> 0] = Se.getDate(), H()[oe + 16 >>> 2 >>> 0] = Se.getMonth(), H()[oe + 20 >>> 2 >>> 0] = Se.getYear(), oe = Se.getTime(), BigInt(isNaN(oe) ? -1 : oe / 1e3);
      }
      function Pr(oe, Se, Be, Je, ut, dn, Xn) {
        return d ? xe(16, 1, oe, Se, Be, Je, ut, dn, Xn) : -52;
      }
      function kr(oe, Se, Be, Je, ut, dn) {
        if (d) return xe(17, 1, oe, Se, Be, Je, ut, dn);
      }
      var Mr = {},
        Hn = () => performance.timeOrigin + performance.now();
      function $t(oe, Se) {
        if (d) return xe(18, 1, oe, Se);
        if (Mr[oe] && (clearTimeout(Mr[oe].id), delete Mr[oe]), !Se) return 0;
        var Be = setTimeout(() => {
          delete Mr[oe], rr(() => xr(oe, performance.timeOrigin + performance.now()));
        }, Se);
        return Mr[oe] = {
          id: Be,
          ke: Se
        }, 0;
      }
      function je(oe, Se, Be, Je) {
        oe >>>= 0, Se >>>= 0, Be >>>= 0, Je >>>= 0;
        var ut = new Date().getFullYear(),
          dn = new Date(ut, 0, 1).getTimezoneOffset();
        ut = new Date(ut, 6, 1).getTimezoneOffset();
        var Xn = Math.max(dn, ut);
        Y()[oe >>> 2 >>> 0] = 60 * Xn, H()[Se >>> 2 >>> 0] = +(dn != ut), oe = (Se = Rr => {
          var Vr = Math.abs(Rr);
          return `UTC${0 <= Rr ? "-" : "+"}${String(Math.floor(Vr / 60)).padStart(2, "0")}${String(Vr % 60).padStart(2, "0")}`;
        })(dn), Se = Se(ut), ut < dn ? (vt(oe, Be, 17), vt(Se, Je, 17)) : (vt(oe, Je, 17), vt(Se, Be, 17));
      }
      var Qe = () => Date.now();
      function Mt(oe, Se, Be) {
        return 0 <= oe && 3 >= oe ? (oe === 0 ? oe = Date.now() : oe = performance.timeOrigin + performance.now(), B[Be >>> 0 >>> 3] = BigInt(Math.round(1e6 * oe)), 0) : 28;
      }
      var cn = [],
        Qn = (oe, Se) => {
          cn.length = 0;
          for (var Be; Be = L()[oe++ >>> 0];) {
            var Je = Be != 105;
            Se += (Je &= Be != 112) && Se % 8 ? 4 : 0, cn.push(Be == 112 ? Y()[Se >>> 2 >>> 0] : Be == 106 ? B[Se >>> 3] : Be == 105 ? H()[Se >>> 2 >>> 0] : W()[Se >>> 3 >>> 0]), Se += Je ? 8 : 4;
          }
          return cn;
        };
      function Lt(oe, Se, Be) {
        return oe >>>= 0, Se = Qn(Se >>> 0, Be >>> 0), Z[oe](...Se);
      }
      function ct(oe, Se, Be) {
        return oe >>>= 0, Se = Qn(Se >>> 0, Be >>> 0), Z[oe](...Se);
      }
      var Dt = () => {};
      function bn(oe, Se) {
        return k(Ze(oe >>> 0, Se >>> 0));
      }
      var Rt = () => {
        throw Ee += 1, "unwind";
      };
      function fn() {
        return 4294901760;
      }
      var Zt = () => navigator.hardwareConcurrency;
      function Ln() {
        return we("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"), 0;
      }
      function tt(oe) {
        oe >>>= 0;
        var Se = L().length;
        if (oe <= Se || 4294901760 < oe) return !1;
        for (var Be = 1; 4 >= Be; Be *= 2) {
          var Je = Se * (1 + .2 / Be);
          Je = Math.min(Je, oe + 100663296);
          e: {
            Je = (Math.min(4294901760, 65536 * Math.ceil(Math.max(oe, Je) / 65536)) - A.buffer.byteLength + 65535) / 65536 | 0;
            try {
              A.grow(Je), ne();
              var ut = 1;
              break e;
            } catch {}
            ut = void 0;
          }
          if (ut) return !0;
        }
        return !1;
      }
      var zt = () => (we("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"), 0),
        an = {},
        Rn = oe => {
          oe.forEach(Se => {
            zt();
          });
        };
      function Un() {
        var oe = Error().stack.toString().split(`
`);
        return oe[0] == "Error" && oe.shift(), Rn(oe), an.Kd = zt(), an.ae = oe, an.Kd;
      }
      function er(oe, Se, Be) {
        if (oe >>>= 0, Se >>>= 0, an.Kd == oe) var Je = an.ae;else (Je = Error().stack.toString().split(`
`))[0] == "Error" && Je.shift(), Rn(Je);
        for (var ut = 3; Je[ut] && zt() != oe;) ++ut;
        for (oe = 0; oe < Be && Je[oe + ut]; ++oe) H()[Se + 4 * oe >>> 2 >>> 0] = zt();
        return oe;
      }
      var Cr,
        tr = {},
        kn = () => {
          if (!Cr) {
            var oe,
              Se = {
                USER: "web_user",
                LOGNAME: "web_user",
                PATH: "/",
                PWD: "/",
                HOME: "/home/web_user",
                LANG: (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
                _: "./this.program"
              };
            for (oe in tr) tr[oe] === void 0 ? delete Se[oe] : Se[oe] = tr[oe];
            var Be = [];
            for (oe in Se) Be.push(`${oe}=${Se[oe]}`);
            Cr = Be;
          }
          return Cr;
        };
      function xn(oe, Se) {
        if (d) return xe(19, 1, oe, Se);
        oe >>>= 0, Se >>>= 0;
        var Be = 0;
        return kn().forEach((Je, ut) => {
          var dn = Se + Be;
          for (ut = Y()[oe + 4 * ut >>> 2 >>> 0] = dn, dn = 0; dn < Je.length; ++dn) O()[ut++ >>> 0] = Je.charCodeAt(dn);
          O()[ut >>> 0] = 0, Be += Je.length + 1;
        }), 0;
      }
      function Fn(oe, Se) {
        if (d) return xe(20, 1, oe, Se);
        oe >>>= 0, Se >>>= 0;
        var Be = kn();
        Y()[oe >>> 2 >>> 0] = Be.length;
        var Je = 0;
        return Be.forEach(ut => Je += ut.length + 1), Y()[Se >>> 2 >>> 0] = Je, 0;
      }
      function cr(oe) {
        return d ? xe(21, 1, oe) : 52;
      }
      function vr(oe, Se, Be, Je) {
        return d ? xe(22, 1, oe, Se, Be, Je) : 52;
      }
      function Wt(oe, Se, Be, Je) {
        return d ? xe(23, 1, oe, Se, Be, Je) : 70;
      }
      var Jt = [null, [], []];
      function Nn(oe, Se, Be, Je) {
        if (d) return xe(24, 1, oe, Se, Be, Je);
        Se >>>= 0, Be >>>= 0, Je >>>= 0;
        for (var ut = 0, dn = 0; dn < Be; dn++) {
          var Xn = Y()[Se >>> 2 >>> 0],
            Rr = Y()[Se + 4 >>> 2 >>> 0];
          Se += 8;
          for (var Vr = 0; Vr < Rr; Vr++) {
            var ca = L()[Xn + Vr >>> 0],
              za = Jt[oe];
            ca === 0 || ca === 10 ? ((oe === 1 ? w : k)(We(za)), za.length = 0) : za.push(ca);
          }
          ut += Rr;
        }
        return Y()[Je >>> 2 >>> 0] = ut, 0;
      }
      function En(oe) {
        return oe >>> 0;
      }
      d || (function () {
        for (var oe = i.numThreads - 1; oe--;) Fe();
        ae.unshift(() => {
          J++, (function (Se) {
            d ? Se() : Promise.all(_e.map(Ae)).then(Se);
          })(() => ce());
        });
      })();
      for (var Zn = Array(256), Sr = 0; 256 > Sr; ++Sr) Zn[Sr] = String.fromCharCode(Sr);
      St = Zn, hn = i.BindingError = class extends Error {
        constructor(oe) {
          super(oe), this.name = "BindingError";
        }
      }, i.InternalError = class extends Error {
        constructor(oe) {
          super(oe), this.name = "InternalError";
        }
      }, Kn.push(0, 1, void 0, 1, null, 1, !0, 1, !1, 1), i.count_emval_handles = () => Kn.length / 2 - 5 - Jn.length;
      var Bn,
        Et = [he, ue, it, Ge, Oe, Ht, nn, pt, lt, gt, Ut, _t, At, Yt, qe, kt, Pr, kr, $t, xn, Fn, cr, vr, Wt, Nn];
      (async function () {
        function oe(Je, ut) {
          return Bn = Je.exports, Bn = (function () {
            var dn = Bn,
              Xn = {};
            for (let [Rr, Vr] of Object.entries(dn)) Xn[Rr] = typeof Vr == "function" ? (...ca) => {
              ga.push(Rr);
              try {
                return Vr(...ca);
              } finally {
                z || (ga.pop(), Ea && sa === 1 && ga.length === 0 && (sa = 0, Ee += 1, La(Ic), typeof Fibers < "u" && Fibers.le()));
              }
            } : Vr;
            return Xn;
          })(), Bn = (function () {
            var dn = Bn,
              Xn = Vr => ca => Vr(ca) >>> 0,
              Rr = Vr => () => Vr() >>> 0;
            return (dn = Object.assign({}, dn)).Cb = Xn(dn.Cb), dn.fc = Rr(dn.fc), dn.ic = Xn(dn.ic), dn.vc = Xn(dn.vc), dn.wc = Rr(dn.wc), dn.Ac = Xn(dn.Ac), dn;
          })(), ve.push(Bn.jc), S = ut, ce(), Bn;
        }
        J++;
        var Se = X();
        if (i.instantiateWasm) return new Promise(Je => {
          i.instantiateWasm(Se, (ut, dn) => {
            oe(ut, dn), Je(ut.exports);
          });
        });
        if (d) return new Promise(Je => {
          Q = ut => {
            var dn = new WebAssembly.Instance(ut, X());
            Je(oe(dn, ut));
          };
        });
        le ?? (le = i.locateFile ? i.locateFile ? i.locateFile("ort-wasm-simd-threaded.jsep.wasm", b) : b + "ort-wasm-simd-threaded.jsep.wasm" : new URL("" + new URL("ort-wasm-simd-threaded.jsep-D5Jk56-t.wasm", import.meta.url).href, import.meta.url).href);
        try {
          var Be = await (async function (Je) {
            var ut = le;
            if (!G && typeof WebAssembly.instantiateStreaming == "function" && !V(ut)) try {
              var dn = fetch(ut, {
                credentials: "same-origin"
              });
              return await WebAssembly.instantiateStreaming(dn, Je);
            } catch (Xn) {
              k(`wasm streaming compile failed: ${Xn}`), k("falling back to ArrayBuffer instantiation");
            }
            return (async function (Xn, Rr) {
              try {
                var Vr = await (async function (ca) {
                  if (!G) try {
                    var za = await p(ca);
                    return new Uint8Array(za);
                  } catch {}
                  if (ca == le && G) ca = new Uint8Array(G);else {
                    if (!m) throw "both async and sync fetching of the wasm failed";
                    ca = m(ca);
                  }
                  return ca;
                })(Xn);
                return await WebAssembly.instantiate(Vr, Rr);
              } catch (ca) {
                k(`failed to asynchronously prepare wasm: ${ca}`), we(ca);
              }
            })(ut, Je);
          })(Se);
          return oe(Be.instance, Be.module);
        } catch (Je) {
          return a(Je), Promise.reject(Je);
        }
      })();
      var zn = oe => (zn = Bn.Cb)(oe),
        Mn = () => (Mn = Bn.Db)();
      i._OrtInit = (oe, Se) => (i._OrtInit = Bn.Eb)(oe, Se), i._OrtGetLastError = (oe, Se) => (i._OrtGetLastError = Bn.Fb)(oe, Se), i._OrtCreateSessionOptions = (oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca) => (i._OrtCreateSessionOptions = Bn.Gb)(oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca), i._OrtAppendExecutionProvider = (oe, Se) => (i._OrtAppendExecutionProvider = Bn.Hb)(oe, Se), i._OrtAddFreeDimensionOverride = (oe, Se, Be) => (i._OrtAddFreeDimensionOverride = Bn.Ib)(oe, Se, Be), i._OrtAddSessionConfigEntry = (oe, Se, Be) => (i._OrtAddSessionConfigEntry = Bn.Jb)(oe, Se, Be), i._OrtReleaseSessionOptions = oe => (i._OrtReleaseSessionOptions = Bn.Kb)(oe), i._OrtCreateSession = (oe, Se, Be) => (i._OrtCreateSession = Bn.Lb)(oe, Se, Be), i._OrtReleaseSession = oe => (i._OrtReleaseSession = Bn.Mb)(oe), i._OrtGetInputOutputCount = (oe, Se, Be) => (i._OrtGetInputOutputCount = Bn.Nb)(oe, Se, Be), i._OrtGetInputName = (oe, Se) => (i._OrtGetInputName = Bn.Ob)(oe, Se), i._OrtGetOutputName = (oe, Se) => (i._OrtGetOutputName = Bn.Pb)(oe, Se), i._OrtFree = oe => (i._OrtFree = Bn.Qb)(oe), i._OrtCreateTensor = (oe, Se, Be, Je, ut, dn) => (i._OrtCreateTensor = Bn.Rb)(oe, Se, Be, Je, ut, dn), i._OrtGetTensorData = (oe, Se, Be, Je, ut) => (i._OrtGetTensorData = Bn.Sb)(oe, Se, Be, Je, ut), i._OrtReleaseTensor = oe => (i._OrtReleaseTensor = Bn.Tb)(oe), i._OrtCreateRunOptions = (oe, Se, Be, Je) => (i._OrtCreateRunOptions = Bn.Ub)(oe, Se, Be, Je), i._OrtAddRunConfigEntry = (oe, Se, Be) => (i._OrtAddRunConfigEntry = Bn.Vb)(oe, Se, Be), i._OrtReleaseRunOptions = oe => (i._OrtReleaseRunOptions = Bn.Wb)(oe), i._OrtCreateBinding = oe => (i._OrtCreateBinding = Bn.Xb)(oe), i._OrtBindInput = (oe, Se, Be) => (i._OrtBindInput = Bn.Yb)(oe, Se, Be), i._OrtBindOutput = (oe, Se, Be, Je) => (i._OrtBindOutput = Bn.Zb)(oe, Se, Be, Je), i._OrtClearBoundOutputs = oe => (i._OrtClearBoundOutputs = Bn._b)(oe), i._OrtReleaseBinding = oe => (i._OrtReleaseBinding = Bn.$b)(oe), i._OrtRunWithBinding = (oe, Se, Be, Je, ut) => (i._OrtRunWithBinding = Bn.ac)(oe, Se, Be, Je, ut), i._OrtRun = (oe, Se, Be, Je, ut, dn, Xn, Rr) => (i._OrtRun = Bn.bc)(oe, Se, Be, Je, ut, dn, Xn, Rr), i._OrtEndProfiling = oe => (i._OrtEndProfiling = Bn.cc)(oe), i._JsepOutput = (oe, Se, Be) => (i._JsepOutput = Bn.dc)(oe, Se, Be), i._JsepGetNodeName = oe => (i._JsepGetNodeName = Bn.ec)(oe);
      var or = () => (or = Bn.fc)(),
        mr = i._free = oe => (mr = i._free = Bn.gc)(oe),
        Yr = i._malloc = oe => (Yr = i._malloc = Bn.ic)(oe),
        aa = (oe, Se, Be, Je, ut, dn) => (aa = Bn.kc)(oe, Se, Be, Je, ut, dn),
        wa = () => (wa = Bn.lc)(),
        xa = (oe, Se, Be, Je, ut) => (xa = Bn.mc)(oe, Se, Be, Je, ut),
        Aa = oe => (Aa = Bn.nc)(oe),
        pn = oe => (pn = Bn.oc)(oe),
        xr = (oe, Se) => (xr = Bn.pc)(oe, Se),
        Nr = () => (Nr = Bn.qc)(),
        qr = (oe, Se) => (qr = Bn.rc)(oe, Se),
        Oa = oe => (Oa = Bn.sc)(oe),
        Fa = (oe, Se) => (Fa = Bn.tc)(oe, Se),
        Ra = oe => (Ra = Bn.uc)(oe),
        ui = oe => (ui = Bn.vc)(oe),
        pr = () => (pr = Bn.wc)(),
        In = oe => (In = Bn.xc)(oe),
        fr = oe => (fr = Bn.yc)(oe),
        na = (oe, Se, Be) => (na = Bn.zc)(oe, Se, Be),
        Ba = oe => (Ba = Bn.Ac)(oe),
        ai = i.dynCall_iii = (oe, Se, Be) => (ai = i.dynCall_iii = Bn.Bc)(oe, Se, Be),
        vi = i.dynCall_vi = (oe, Se) => (vi = i.dynCall_vi = Bn.Cc)(oe, Se),
        Vi = i.dynCall_ii = (oe, Se) => (Vi = i.dynCall_ii = Bn.Dc)(oe, Se),
        Ti = i.dynCall_vii = (oe, Se, Be) => (Ti = i.dynCall_vii = Bn.Ec)(oe, Se, Be),
        Gi = i.dynCall_iiii = (oe, Se, Be, Je) => (Gi = i.dynCall_iiii = Bn.Fc)(oe, Se, Be, Je),
        hi = i.dynCall_viii = (oe, Se, Be, Je) => (hi = i.dynCall_viii = Bn.Gc)(oe, Se, Be, Je),
        vo = i.dynCall_iiiii = (oe, Se, Be, Je, ut) => (vo = i.dynCall_iiiii = Bn.Hc)(oe, Se, Be, Je, ut),
        ci = i.dynCall_viiii = (oe, Se, Be, Je, ut) => (ci = i.dynCall_viiii = Bn.Ic)(oe, Se, Be, Je, ut),
        ji = i.dynCall_viiiiii = (oe, Se, Be, Je, ut, dn, Xn) => (ji = i.dynCall_viiiiii = Bn.Jc)(oe, Se, Be, Je, ut, dn, Xn),
        ts = i.dynCall_viiiiiii = (oe, Se, Be, Je, ut, dn, Xn, Rr) => (ts = i.dynCall_viiiiiii = Bn.Kc)(oe, Se, Be, Je, ut, dn, Xn, Rr),
        Ts = i.dynCall_ji = (oe, Se) => (Ts = i.dynCall_ji = Bn.Lc)(oe, Se),
        dc = i.dynCall_v = oe => (dc = i.dynCall_v = Bn.Mc)(oe),
        Tl = i.dynCall_viiiii = (oe, Se, Be, Je, ut, dn) => (Tl = i.dynCall_viiiii = Bn.Nc)(oe, Se, Be, Je, ut, dn),
        Ml = i.dynCall_i = oe => (Ml = i.dynCall_i = Bn.Oc)(oe),
        sr = i.dynCall_fii = (oe, Se, Be) => (sr = i.dynCall_fii = Bn.Pc)(oe, Se, Be),
        da = i.dynCall_viiiiiiii = (oe, Se, Be, Je, ut, dn, Xn, Rr, Vr) => (da = i.dynCall_viiiiiiii = Bn.Qc)(oe, Se, Be, Je, ut, dn, Xn, Rr, Vr),
        la = i.dynCall_viiiiiiiiii = (oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca, za) => (la = i.dynCall_viiiiiiiiii = Bn.Rc)(oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca, za),
        Ta = i.dynCall_jiii = (oe, Se, Be, Je) => (Ta = i.dynCall_jiii = Bn.Sc)(oe, Se, Be, Je),
        Wa = i.dynCall_dii = (oe, Se, Be) => (Wa = i.dynCall_dii = Bn.Tc)(oe, Se, Be),
        pi = i.dynCall_viiiiiiiii = (oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca) => (pi = i.dynCall_viiiiiiiii = Bn.Uc)(oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca),
        wi = i.dynCall_viiiiiiiiiii = (oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca, za, Xr) => (wi = i.dynCall_viiiiiiiiiii = Bn.Vc)(oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca, za, Xr),
        to = i.dynCall_iiiiii = (oe, Se, Be, Je, ut, dn) => (to = i.dynCall_iiiiii = Bn.Wc)(oe, Se, Be, Je, ut, dn),
        Ho = i.dynCall_iij = (oe, Se, Be) => (Ho = i.dynCall_iij = Bn.Xc)(oe, Se, Be),
        jo = i.dynCall_iiiiiiiiii = (oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca) => (jo = i.dynCall_iiiiiiiiii = Bn.Yc)(oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca),
        Ls = i.dynCall_iiiiiiiiiii = (oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca, za) => (Ls = i.dynCall_iiiiiiiiiii = Bn.Zc)(oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca, za),
        _s = i.dynCall_vij = (oe, Se, Be) => (_s = i.dynCall_vij = Bn._c)(oe, Se, Be),
        Pl = i.dynCall_iiif = (oe, Se, Be, Je) => (Pl = i.dynCall_iiif = Bn.$c)(oe, Se, Be, Je),
        xl = i.dynCall_iiij = (oe, Se, Be, Je) => (xl = i.dynCall_iiij = Bn.ad)(oe, Se, Be, Je),
        Bi = i.dynCall_fiii = (oe, Se, Be, Je) => (Bi = i.dynCall_fiii = Bn.bd)(oe, Se, Be, Je),
        Do = i.dynCall_viiiiiiiiiiiii = (oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca, za, Xr, fi, Bo) => (Do = i.dynCall_viiiiiiiiiiiii = Bn.cd)(oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca, za, Xr, fi, Bo),
        co = i.dynCall_vjiii = (oe, Se, Be, Je, ut) => (co = i.dynCall_vjiii = Bn.dd)(oe, Se, Be, Je, ut),
        ls = i.dynCall_vif = (oe, Se, Be) => (ls = i.dynCall_vif = Bn.ed)(oe, Se, Be),
        Ms = i.dynCall_iiiiiii = (oe, Se, Be, Je, ut, dn, Xn) => (Ms = i.dynCall_iiiiiii = Bn.fd)(oe, Se, Be, Je, ut, dn, Xn),
        ks = i.dynCall_iiiij = (oe, Se, Be, Je, ut) => (ks = i.dynCall_iiiij = Bn.gd)(oe, Se, Be, Je, ut),
        Yo = i.dynCall_iiiiiiii = (oe, Se, Be, Je, ut, dn, Xn, Rr) => (Yo = i.dynCall_iiiiiiii = Bn.hd)(oe, Se, Be, Je, ut, dn, Xn, Rr),
        Vc = i.dynCall_viiiiiiiiiiii = (oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca, za, Xr, fi) => (Vc = i.dynCall_viiiiiiiiiiii = Bn.id)(oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca, za, Xr, fi),
        zd = i.dynCall_diii = (oe, Se, Be, Je) => (zd = i.dynCall_diii = Bn.jd)(oe, Se, Be, Je),
        Xh = i.dynCall_jiiii = (oe, Se, Be, Je, ut) => (Xh = i.dynCall_jiiii = Bn.kd)(oe, Se, Be, Je, ut),
        Pp = i.dynCall_viiij = (oe, Se, Be, Je, ut) => (Pp = i.dynCall_viiij = Bn.ld)(oe, Se, Be, Je, ut),
        Ub = i.dynCall_fiiii = (oe, Se, Be, Je, ut) => (Ub = i.dynCall_fiiii = Bn.md)(oe, Se, Be, Je, ut),
        t0 = i.dynCall_viiif = (oe, Se, Be, Je, ut) => (t0 = i.dynCall_viiif = Bn.nd)(oe, Se, Be, Je, ut),
        yu = i.dynCall_diiii = (oe, Se, Be, Je, ut) => (yu = i.dynCall_diiii = Bn.od)(oe, Se, Be, Je, ut),
        oo = i.dynCall_viiid = (oe, Se, Be, Je, ut) => (oo = i.dynCall_viiid = Bn.pd)(oe, Se, Be, Je, ut),
        Ps = i.dynCall_iiiijii = (oe, Se, Be, Je, ut, dn, Xn) => (Ps = i.dynCall_iiiijii = Bn.qd)(oe, Se, Be, Je, ut, dn, Xn),
        xi = i.dynCall_iiiiiij = (oe, Se, Be, Je, ut, dn, Xn) => (xi = i.dynCall_iiiiiij = Bn.rd)(oe, Se, Be, Je, ut, dn, Xn),
        ld = oe => (ld = Bn.sd)(oe),
        Ic = () => (Ic = Bn.td)(),
        fc = oe => (fc = Bn.ud)(oe),
        bu = () => (bu = Bn.vd)();
      function qd(oe, Se, Be) {
        var Je = pr();
        try {
          Ti(oe, Se, Be);
        } catch (ut) {
          if (Ra(Je), ut !== ut + 0) throw ut;
          qr(1, 0);
        }
      }
      function vu(oe, Se, Be) {
        var Je = pr();
        try {
          return ai(oe, Se, Be);
        } catch (ut) {
          if (Ra(Je), ut !== ut + 0) throw ut;
          qr(1, 0);
        }
      }
      function wu(oe, Se) {
        var Be = pr();
        try {
          vi(oe, Se);
        } catch (Je) {
          if (Ra(Be), Je !== Je + 0) throw Je;
          qr(1, 0);
        }
      }
      function Df(oe, Se) {
        var Be = pr();
        try {
          return Vi(oe, Se);
        } catch (Je) {
          if (Ra(Be), Je !== Je + 0) throw Je;
          qr(1, 0);
        }
      }
      function xg(oe, Se, Be, Je) {
        var ut = pr();
        try {
          return Gi(oe, Se, Be, Je);
        } catch (dn) {
          if (Ra(ut), dn !== dn + 0) throw dn;
          qr(1, 0);
        }
      }
      function Lf(oe, Se, Be, Je, ut) {
        var dn = pr();
        try {
          ci(oe, Se, Be, Je, ut);
        } catch (Xn) {
          if (Ra(dn), Xn !== Xn + 0) throw Xn;
          qr(1, 0);
        }
      }
      function Jh(oe, Se, Be, Je, ut) {
        var dn = pr();
        try {
          return vo(oe, Se, Be, Je, ut);
        } catch (Xn) {
          if (Ra(dn), Xn !== Xn + 0) throw Xn;
          qr(1, 0);
        }
      }
      function Zh(oe, Se, Be, Je) {
        var ut = pr();
        try {
          hi(oe, Se, Be, Je);
        } catch (dn) {
          if (Ra(ut), dn !== dn + 0) throw dn;
          qr(1, 0);
        }
      }
      function Bl(oe, Se, Be, Je, ut, dn, Xn) {
        var Rr = pr();
        try {
          return Ms(oe, Se, Be, Je, ut, dn, Xn);
        } catch (Vr) {
          if (Ra(Rr), Vr !== Vr + 0) throw Vr;
          qr(1, 0);
        }
      }
      function ql(oe) {
        var Se = pr();
        try {
          dc(oe);
        } catch (Be) {
          if (Ra(Se), Be !== Be + 0) throw Be;
          qr(1, 0);
        }
      }
      function Kd(oe, Se, Be) {
        var Je = pr();
        try {
          return Ho(oe, Se, Be);
        } catch (ut) {
          if (Ra(Je), ut !== ut + 0) throw ut;
          qr(1, 0);
        }
      }
      function uh(oe, Se, Be, Je, ut, dn) {
        var Xn = pr();
        try {
          Tl(oe, Se, Be, Je, ut, dn);
        } catch (Rr) {
          if (Ra(Xn), Rr !== Rr + 0) throw Rr;
          qr(1, 0);
        }
      }
      function Lc(oe, Se, Be) {
        var Je = pr();
        try {
          _s(oe, Se, Be);
        } catch (ut) {
          if (Ra(Je), ut !== ut + 0) throw ut;
          qr(1, 0);
        }
      }
      function Xp(oe, Se, Be, Je, ut, dn, Xn) {
        var Rr = pr();
        try {
          ji(oe, Se, Be, Je, ut, dn, Xn);
        } catch (Vr) {
          if (Ra(Rr), Vr !== Vr + 0) throw Vr;
          qr(1, 0);
        }
      }
      function Qm(oe, Se, Be, Je, ut, dn, Xn, Rr) {
        var Vr = pr();
        try {
          ts(oe, Se, Be, Je, ut, dn, Xn, Rr);
        } catch (ca) {
          if (Ra(Vr), ca !== ca + 0) throw ca;
          qr(1, 0);
        }
      }
      function Qd(oe, Se, Be, Je, ut, dn) {
        var Xn = pr();
        try {
          return to(oe, Se, Be, Je, ut, dn);
        } catch (Rr) {
          if (Ra(Xn), Rr !== Rr + 0) throw Rr;
          qr(1, 0);
        }
      }
      function Xv(oe, Se, Be, Je, ut, dn, Xn, Rr) {
        var Vr = pr();
        try {
          return Yo(oe, Se, Be, Je, ut, dn, Xn, Rr);
        } catch (ca) {
          if (Ra(Vr), ca !== ca + 0) throw ca;
          qr(1, 0);
        }
      }
      function $b(oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca) {
        var za = pr();
        try {
          pi(oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca);
        } catch (Xr) {
          if (Ra(za), Xr !== Xr + 0) throw Xr;
          qr(1, 0);
        }
      }
      function Jl(oe, Se, Be, Je, ut, dn, Xn, Rr, Vr) {
        var ca = pr();
        try {
          da(oe, Se, Be, Je, ut, dn, Xn, Rr, Vr);
        } catch (za) {
          if (Ra(ca), za !== za + 0) throw za;
          qr(1, 0);
        }
      }
      function td(oe) {
        var Se = pr();
        try {
          return Ml(oe);
        } catch (Be) {
          if (Ra(Se), Be !== Be + 0) throw Be;
          qr(1, 0);
        }
      }
      function Ym(oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca) {
        var za = pr();
        try {
          return jo(oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca);
        } catch (Xr) {
          if (Ra(za), Xr !== Xr + 0) throw Xr;
          qr(1, 0);
        }
      }
      function hh(oe, Se, Be) {
        var Je = pr();
        try {
          return sr(oe, Se, Be);
        } catch (ut) {
          if (Ra(Je), ut !== ut + 0) throw ut;
          qr(1, 0);
        }
      }
      function Jp(oe, Se, Be, Je) {
        var ut = pr();
        try {
          return Ta(oe, Se, Be, Je);
        } catch (dn) {
          if (Ra(ut), dn !== dn + 0) throw dn;
          return qr(1, 0), 0n;
        }
      }
      function Hc(oe, Se, Be) {
        var Je = pr();
        try {
          return Wa(oe, Se, Be);
        } catch (ut) {
          if (Ra(Je), ut !== ut + 0) throw ut;
          qr(1, 0);
        }
      }
      function Rp(oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca, za, Xr) {
        var fi = pr();
        try {
          wi(oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca, za, Xr);
        } catch (Bo) {
          if (Ra(fi), Bo !== Bo + 0) throw Bo;
          qr(1, 0);
        }
      }
      function fw(oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca, za) {
        var Xr = pr();
        try {
          la(oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca, za);
        } catch (fi) {
          if (Ra(Xr), fi !== fi + 0) throw fi;
          qr(1, 0);
        }
      }
      function Xm(oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca, za) {
        var Xr = pr();
        try {
          return Ls(oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca, za);
        } catch (fi) {
          if (Ra(Xr), fi !== fi + 0) throw fi;
          qr(1, 0);
        }
      }
      function Zp(oe, Se, Be, Je) {
        var ut = pr();
        try {
          return Pl(oe, Se, Be, Je);
        } catch (dn) {
          if (Ra(ut), dn !== dn + 0) throw dn;
          qr(1, 0);
        }
      }
      function Of(oe, Se, Be, Je) {
        var ut = pr();
        try {
          return xl(oe, Se, Be, Je);
        } catch (dn) {
          if (Ra(ut), dn !== dn + 0) throw dn;
          qr(1, 0);
        }
      }
      function Jm(oe, Se, Be, Je) {
        var ut = pr();
        try {
          return Bi(oe, Se, Be, Je);
        } catch (dn) {
          if (Ra(ut), dn !== dn + 0) throw dn;
          qr(1, 0);
        }
      }
      function Js(oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca, za, Xr, fi, Bo) {
        var sl = pr();
        try {
          Do(oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca, za, Xr, fi, Bo);
        } catch (xu) {
          if (Ra(sl), xu !== xu + 0) throw xu;
          qr(1, 0);
        }
      }
      function uc(oe, Se, Be, Je, ut) {
        var dn = pr();
        try {
          co(oe, Se, Be, Je, ut);
        } catch (Xn) {
          if (Ra(dn), Xn !== Xn + 0) throw Xn;
          qr(1, 0);
        }
      }
      function ep(oe, Se, Be) {
        var Je = pr();
        try {
          ls(oe, Se, Be);
        } catch (ut) {
          if (Ra(Je), ut !== ut + 0) throw ut;
          qr(1, 0);
        }
      }
      function tp(oe, Se) {
        var Be = pr();
        try {
          return Ts(oe, Se);
        } catch (Je) {
          if (Ra(Be), Je !== Je + 0) throw Je;
          return qr(1, 0), 0n;
        }
      }
      function xm(oe, Se, Be, Je, ut) {
        var dn = pr();
        try {
          return ks(oe, Se, Be, Je, ut);
        } catch (Xn) {
          if (Ra(dn), Xn !== Xn + 0) throw Xn;
          qr(1, 0);
        }
      }
      function xd(oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca, za, Xr, fi) {
        var Bo = pr();
        try {
          Vc(oe, Se, Be, Je, ut, dn, Xn, Rr, Vr, ca, za, Xr, fi);
        } catch (sl) {
          if (Ra(Bo), sl !== sl + 0) throw sl;
          qr(1, 0);
        }
      }
      function _m(oe, Se, Be, Je) {
        var ut = pr();
        try {
          return zd(oe, Se, Be, Je);
        } catch (dn) {
          if (Ra(ut), dn !== dn + 0) throw dn;
          qr(1, 0);
        }
      }
      function Eo(oe, Se, Be, Je, ut) {
        var dn = pr();
        try {
          return Xh(oe, Se, Be, Je, ut);
        } catch (Xn) {
          if (Ra(dn), Xn !== Xn + 0) throw Xn;
          return qr(1, 0), 0n;
        }
      }
      function Zs(oe, Se, Be, Je, ut) {
        var dn = pr();
        try {
          Pp(oe, Se, Be, Je, ut);
        } catch (Xn) {
          if (Ra(dn), Xn !== Xn + 0) throw Xn;
          qr(1, 0);
        }
      }
      function Wo(oe, Se, Be, Je, ut) {
        var dn = pr();
        try {
          return Ub(oe, Se, Be, Je, ut);
        } catch (Xn) {
          if (Ra(dn), Xn !== Xn + 0) throw Xn;
          qr(1, 0);
        }
      }
      function Qs(oe, Se, Be, Je, ut) {
        var dn = pr();
        try {
          t0(oe, Se, Be, Je, ut);
        } catch (Xn) {
          if (Ra(dn), Xn !== Xn + 0) throw Xn;
          qr(1, 0);
        }
      }
      function Xo(oe, Se, Be, Je, ut) {
        var dn = pr();
        try {
          return yu(oe, Se, Be, Je, ut);
        } catch (Xn) {
          if (Ra(dn), Xn !== Xn + 0) throw Xn;
          qr(1, 0);
        }
      }
      function fl(oe, Se, Be, Je, ut) {
        var dn = pr();
        try {
          oo(oe, Se, Be, Je, ut);
        } catch (Xn) {
          if (Ra(dn), Xn !== Xn + 0) throw Xn;
          qr(1, 0);
        }
      }
      function Oc(oe, Se, Be, Je, ut, dn, Xn) {
        var Rr = pr();
        try {
          return Ps(oe, Se, Be, Je, ut, dn, Xn);
        } catch (Vr) {
          if (Ra(Rr), Vr !== Vr + 0) throw Vr;
          qr(1, 0);
        }
      }
      function km(oe, Se, Be, Je, ut, dn, Xn) {
        var Rr = pr();
        try {
          return xi(oe, Se, Be, Je, ut, dn, Xn);
        } catch (Vr) {
          if (Ra(Rr), Vr !== Vr + 0) throw Vr;
          qr(1, 0);
        }
      }
      return i.stackSave = () => pr(), i.stackRestore = oe => Ra(oe), i.stackAlloc = oe => ui(oe), i.setValue = function (oe, Se, Be = "i8") {
        switch (Be.endsWith("*") && (Be = "*"), Be) {
          case "i1":
          case "i8":
            O()[oe >>> 0] = Se;
            break;
          case "i16":
            D()[oe >>> 1 >>> 0] = Se;
            break;
          case "i32":
            H()[oe >>> 2 >>> 0] = Se;
            break;
          case "i64":
            B[oe >>> 3] = BigInt(Se);
            break;
          case "float":
            K()[oe >>> 2 >>> 0] = Se;
            break;
          case "double":
            W()[oe >>> 3 >>> 0] = Se;
            break;
          case "*":
            Y()[oe >>> 2 >>> 0] = Se;
            break;
          default:
            we(`invalid type for setValue: ${Be}`);
        }
      }, i.getValue = function (oe, Se = "i8") {
        switch (Se.endsWith("*") && (Se = "*"), Se) {
          case "i1":
          case "i8":
            return O()[oe >>> 0];
          case "i16":
            return D()[oe >>> 1 >>> 0];
          case "i32":
            return H()[oe >>> 2 >>> 0];
          case "i64":
            return B[oe >>> 3];
          case "float":
            return K()[oe >>> 2 >>> 0];
          case "double":
            return W()[oe >>> 3 >>> 0];
          case "*":
            return Y()[oe >>> 2 >>> 0];
          default:
            we(`invalid type for getValue: ${Se}`);
        }
      }, i.UTF8ToString = Ze, i.stringToUTF8 = vt, i.lengthBytesUTF8 = st, (function oe() {
        if (0 < J) pe = oe;else if (d) r(i), de();else {
          for (; 0 < ae.length;) ae.shift()(i);
          0 < J ? pe = oe : (i.calledRun = !0, z || (de(), r(i)));
        }
      })(), i.PTR_SIZE = 4, o;
    }), YAr = Hut, $2n = (t = (e = globalThis.self) == null ? void 0 : e.name) == null ? void 0 : t.startsWith("em-pthread"), $2n && Hut();
  }),
  Wut,
  G2n,
  RA,
  XAr,
  m9e,
  V2n,
  H2n,
  qut,
  W2n,
  Kut,
  JAr,
  Qut,
  ZAr,
  $Gt = Wi(() => {
    UGt(), Wut = typeof location > "u" ? void 0 : location.origin, G2n = () => {
      var e;
      return (e = import.meta.url) != null && e.startsWith("file:") ? new URL(new URL("" + new URL("ort.webgpu.bundle.min-CEayb2S6.mjs", import.meta.url).href, import.meta.url).href, Wut).href : import.meta.url;
    }, RA = G2n(), XAr = () => {
      if (RA && !RA.startsWith("blob:")) return RA.substring(0, RA.lastIndexOf("/") + 1);
    }, m9e = (e, t) => {
      try {
        let n = t ?? RA;
        return (n ? new URL(e, n) : new URL(e)).origin === Wut;
      } catch {
        return !1;
      }
    }, V2n = (e, t) => {
      let n = t ?? RA;
      try {
        return (n ? new URL(e, n) : new URL(e)).href;
      } catch {
        return;
      }
    }, H2n = (e, t) => `${t ?? "./"}${e}`, qut = async e => {
      let t = await (await fetch(e, {
        credentials: "same-origin"
      })).blob();
      return URL.createObjectURL(t);
    }, W2n = async e => (await import(e)).default, Kut = (URo(), SGe(qAr)).default, JAr = async () => {
      if (!RA) throw new Error("Failed to load proxy worker: cannot determine the script source URL.");
      if (m9e(RA)) return [void 0, Kut()];
      let e = await qut(RA);
      return [e, Kut(e)];
    }, Qut = ($Ro(), SGe(QAr)).default, ZAr = async (e, t, n) => {
      if (!e && !t && Qut && RA && m9e(RA)) return [void 0, Qut];
      {
        let r = "ort-wasm-simd-threaded.jsep.mjs",
          a = e ?? V2n(r, t),
          i = n && a && !m9e(a, t),
          o = i ? await qut(a) : a ?? H2n(r, t);
        return [i ? o : void 0, await W2n(o)];
      }
    };
  }),
  Yut,
  f9e,
  Pge,
  Xut,
  q2n,
  K2n,
  GGt,
  cb,
  iee = Wi(() => {
    $Gt(), f9e = !1, Pge = !1, Xut = !1, q2n = () => {
      if (typeof SharedArrayBuffer > "u") return !1;
      try {
        return typeof MessageChannel < "u" && new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)), WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 4, 1, 3, 1, 1, 10, 11, 1, 9, 0, 65, 0, 254, 16, 2, 0, 26, 11]));
      } catch {
        return !1;
      }
    }, K2n = () => {
      try {
        return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 30, 1, 28, 0, 65, 0, 253, 15, 253, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 253, 186, 1, 26, 11]));
      } catch {
        return !1;
      }
    }, GGt = async e => {
      if (f9e) return Promise.resolve();
      if (Pge) throw new Error("multiple calls to 'initializeWebAssembly()' detected.");
      if (Xut) throw new Error("previous call to 'initializeWebAssembly()' failed.");
      Pge = !0;
      let t = e.initTimeout,
        n = e.numThreads;
      if (!K2n()) throw new Error("WebAssembly SIMD is not supported in the current environment.");
      let r = q2n();
      n > 1 && !r && (typeof self < "u" && !self.crossOriginIsolated && console.warn("env.wasm.numThreads is set to " + n + ", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."), console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."), e.numThreads = n = 1);
      let a = e.wasmPaths,
        i = typeof a == "string" ? a : void 0,
        o = a == null ? void 0 : a.mjs,
        s = (o == null ? void 0 : o.href) ?? o,
        l = a == null ? void 0 : a.wasm,
        d = (l == null ? void 0 : l.href) ?? l,
        u = e.wasmBinary,
        [h, p] = await ZAr(s, i, n > 1),
        m = !1,
        f = [];
      if (t > 0 && f.push(new Promise(y => {
        setTimeout(() => {
          m = !0, y();
        }, t);
      })), f.push(new Promise((y, b) => {
        let v = {
          numThreads: n
        };
        if (u) v.wasmBinary = u;else if (d || i) v.locateFile = _ => d ?? i + _;else if (s && s.indexOf("blob:") !== 0) v.locateFile = _ => new URL(_, s).href;else if (h) {
          let _ = XAr();
          _ && (v.locateFile = w => _ + w);
        }
        p(v).then(_ => {
          Pge = !1, f9e = !0, Yut = _, y(), h && URL.revokeObjectURL(h);
        }, _ => {
          Pge = !1, Xut = !0, b(_);
        });
      })), await Promise.race(f), m) throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`);
    }, cb = () => {
      if (f9e && Yut) return Yut;
      throw new Error("WebAssembly is not initialized yet.");
    };
  }),
  A1,
  IGe,
  ku,
  VGt = Wi(() => {
    iee(), A1 = (e, t) => {
      let n = cb(),
        r = n.lengthBytesUTF8(e) + 1,
        a = n._malloc(r);
      return n.stringToUTF8(e, a, r), t.push(a), a;
    }, IGe = (e, t, n, r) => {
      if (typeof e == "object" && e !== null) {
        if (n.has(e)) throw new Error("Circular reference in options");
        n.add(e);
      }
      Object.entries(e).forEach(([a, i]) => {
        let o = t ? t + a : a;
        if (typeof i == "object") IGe(i, o + ".", n, r);else if (typeof i == "string" || typeof i == "number") r(o, i.toString());else if (typeof i == "boolean") r(o, i ? "1" : "0");else throw new Error(`Can't handle extra config type: ${typeof i}`);
      });
    }, ku = e => {
      let t = cb(),
        n = t.stackSave();
      try {
        let r = t.PTR_SIZE,
          a = t.stackAlloc(2 * r);
        t._OrtGetLastError(a, a + r);
        let i = Number(t.getValue(a, r === 4 ? "i32" : "i64")),
          o = t.getValue(a + r, "*"),
          s = o ? t.UTF8ToString(o) : "";
        throw new Error(`${e} ERROR_CODE: ${i}, ERROR_MESSAGE: ${s}`);
      } finally {
        t.stackRestore(n);
      }
    };
  }),
  eSr,
  GRo = Wi(() => {
    iee(), VGt(), eSr = e => {
      let t = cb(),
        n = 0,
        r = [],
        a = e || {};
      try {
        if ((e == null ? void 0 : e.logSeverityLevel) === void 0) a.logSeverityLevel = 2;else if (typeof e.logSeverityLevel != "number" || !Number.isInteger(e.logSeverityLevel) || e.logSeverityLevel < 0 || e.logSeverityLevel > 4) throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);
        if ((e == null ? void 0 : e.logVerbosityLevel) === void 0) a.logVerbosityLevel = 0;else if (typeof e.logVerbosityLevel != "number" || !Number.isInteger(e.logVerbosityLevel)) throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);
        (e == null ? void 0 : e.terminate) === void 0 && (a.terminate = !1);
        let i = 0;
        return (e == null ? void 0 : e.tag) !== void 0 && (i = A1(e.tag, r)), n = t._OrtCreateRunOptions(a.logSeverityLevel, a.logVerbosityLevel, !!a.terminate, i), n === 0 && ku("Can't create run options."), (e == null ? void 0 : e.extra) !== void 0 && IGe(e.extra, "", new WeakSet(), (o, s) => {
          let l = A1(o, r),
            d = A1(s, r);
          t._OrtAddRunConfigEntry(n, l, d) !== 0 && ku(`Can't set a run config entry: ${o} - ${s}.`);
        }), [n, r];
      } catch (i) {
        throw n !== 0 && t._OrtReleaseRunOptions(n), r.forEach(o => t._free(o)), i;
      }
    };
  }),
  Q2n,
  Y2n,
  X2n,
  J2n,
  tSr,
  VRo = Wi(() => {
    iee(), VGt(), Q2n = e => {
      switch (e) {
        case "disabled":
          return 0;
        case "basic":
          return 1;
        case "extended":
          return 2;
        case "all":
          return 99;
        default:
          throw new Error(`unsupported graph optimization level: ${e}`);
      }
    }, Y2n = e => {
      switch (e) {
        case "sequential":
          return 0;
        case "parallel":
          return 1;
        default:
          throw new Error(`unsupported execution mode: ${e}`);
      }
    }, X2n = e => {
      e.extra || (e.extra = {}), e.extra.session || (e.extra.session = {});
      let t = e.extra.session;
      t.use_ort_model_bytes_directly || (t.use_ort_model_bytes_directly = "1"), e.executionProviders && e.executionProviders.some(n => (typeof n == "string" ? n : n.name) === "webgpu") && (e.enableMemPattern = !1);
    }, J2n = (e, t, n) => {
      for (let r of t) {
        let a = typeof r == "string" ? r : r.name;
        switch (a) {
          case "webnn":
            if (a = "WEBNN", typeof r != "string") {
              let o = r == null ? void 0 : r.deviceType;
              if (o) {
                let s = A1("deviceType", n),
                  l = A1(o, n);
                cb()._OrtAddSessionConfigEntry(e, s, l) !== 0 && ku(`Can't set a session config entry: 'deviceType' - ${o}.`);
              }
            }
            break;
          case "webgpu":
            if (a = "JS", typeof r != "string") {
              let o = r;
              if (o != null && o.preferredLayout) {
                if (o.preferredLayout !== "NCHW" && o.preferredLayout !== "NHWC") throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${o.preferredLayout}`);
                let s = A1("preferredLayout", n),
                  l = A1(o.preferredLayout, n);
                cb()._OrtAddSessionConfigEntry(e, s, l) !== 0 && ku(`Can't set a session config entry: 'preferredLayout' - ${o.preferredLayout}.`);
              }
            }
            break;
          case "wasm":
          case "cpu":
            continue;
          default:
            throw new Error(`not supported execution provider: ${a}`);
        }
        let i = A1(a, n);
        cb()._OrtAppendExecutionProvider(e, i) !== 0 && ku(`Can't append execution provider: ${a}.`);
      }
    }, tSr = e => {
      let t = cb(),
        n = 0,
        r = [],
        a = e || {};
      X2n(a);
      try {
        let i = Q2n(a.graphOptimizationLevel ?? "all"),
          o = Y2n(a.executionMode ?? "sequential"),
          s = typeof a.logId == "string" ? A1(a.logId, r) : 0,
          l = a.logSeverityLevel ?? 2;
        if (!Number.isInteger(l) || l < 0 || l > 4) throw new Error(`log serverity level is not valid: ${l}`);
        let d = a.logVerbosityLevel ?? 0;
        if (!Number.isInteger(d) || d < 0 || d > 4) throw new Error(`log verbosity level is not valid: ${d}`);
        let u = typeof a.optimizedModelFilePath == "string" ? A1(a.optimizedModelFilePath, r) : 0;
        if (n = t._OrtCreateSessionOptions(i, !!a.enableCpuMemArena, !!a.enableMemPattern, o, !!a.enableProfiling, 0, s, l, d, u), n === 0 && ku("Can't create session options."), a.executionProviders && J2n(n, a.executionProviders, r), a.enableGraphCapture !== void 0) {
          if (typeof a.enableGraphCapture != "boolean") throw new Error(`enableGraphCapture must be a boolean value: ${a.enableGraphCapture}`);
          let h = A1("enableGraphCapture", r),
            p = A1(a.enableGraphCapture.toString(), r);
          t._OrtAddSessionConfigEntry(n, h, p) !== 0 && ku(`Can't set a session config entry: 'enableGraphCapture' - ${a.enableGraphCapture}.`);
        }
        if (a.freeDimensionOverrides) for (let [h, p] of Object.entries(a.freeDimensionOverrides)) {
          if (typeof h != "string") throw new Error(`free dimension override name must be a string: ${h}`);
          if (typeof p != "number" || !Number.isInteger(p) || p < 0) throw new Error(`free dimension override value must be a non-negative integer: ${p}`);
          let m = A1(h, r);
          t._OrtAddFreeDimensionOverride(n, m, p) !== 0 && ku(`Can't set a free dimension override: ${h} - ${p}.`);
        }
        return a.extra !== void 0 && IGe(a.extra, "", new WeakSet(), (h, p) => {
          let m = A1(h, r),
            f = A1(p, r);
          t._OrtAddSessionConfigEntry(n, m, f) !== 0 && ku(`Can't set a session config entry: ${h} - ${p}.`);
        }), [n, r];
      } catch (i) {
        throw n !== 0 && t._OrtReleaseSessionOptions(n) !== 0 && ku("Can't release session options."), r.forEach(o => t._free(o)), i;
      }
    };
  }),
  Yne,
  RH,
  NH,
  HGt,
  CGe,
  WGt,
  qGt,
  g4t,
  ol = Wi(() => {
    Yne = e => {
      switch (e) {
        case "int8":
          return 3;
        case "uint8":
          return 2;
        case "bool":
          return 9;
        case "int16":
          return 5;
        case "uint16":
          return 4;
        case "int32":
          return 6;
        case "uint32":
          return 12;
        case "float16":
          return 10;
        case "float32":
          return 1;
        case "float64":
          return 11;
        case "string":
          return 8;
        case "int64":
          return 7;
        case "uint64":
          return 13;
        case "int4":
          return 22;
        case "uint4":
          return 21;
        default:
          throw new Error(`unsupported data type: ${e}`);
      }
    }, RH = e => {
      switch (e) {
        case 3:
          return "int8";
        case 2:
          return "uint8";
        case 9:
          return "bool";
        case 5:
          return "int16";
        case 4:
          return "uint16";
        case 6:
          return "int32";
        case 12:
          return "uint32";
        case 10:
          return "float16";
        case 1:
          return "float32";
        case 11:
          return "float64";
        case 8:
          return "string";
        case 7:
          return "int64";
        case 13:
          return "uint64";
        case 22:
          return "int4";
        case 21:
          return "uint4";
        default:
          throw new Error(`unsupported data type: ${e}`);
      }
    }, NH = (e, t) => {
      let n = [-1, 4, 1, 1, 2, 2, 4, 8, -1, 1, 2, 8, 4, 8, -1, -1, -1, -1, -1, -1, -1, .5, .5][e],
        r = typeof t == "number" ? t : t.reduce((a, i) => a * i, 1);
      return n > 0 ? Math.ceil(r * n) : void 0;
    }, HGt = e => {
      switch (e) {
        case "float16":
          return typeof Float16Array < "u" && Float16Array.from ? Float16Array : Uint16Array;
        case "float32":
          return Float32Array;
        case "uint8":
          return Uint8Array;
        case "int8":
          return Int8Array;
        case "uint16":
          return Uint16Array;
        case "int16":
          return Int16Array;
        case "int32":
          return Int32Array;
        case "bool":
          return Uint8Array;
        case "float64":
          return Float64Array;
        case "uint32":
          return Uint32Array;
        case "int64":
          return BigInt64Array;
        case "uint64":
          return BigUint64Array;
        default:
          throw new Error(`unsupported type: ${e}`);
      }
    }, CGe = e => {
      switch (e) {
        case "verbose":
          return 0;
        case "info":
          return 1;
        case "warning":
          return 2;
        case "error":
          return 3;
        case "fatal":
          return 4;
        default:
          throw new Error(`unsupported logging level: ${e}`);
      }
    }, WGt = e => e === "float32" || e === "float16" || e === "int32" || e === "int64" || e === "uint32" || e === "uint8" || e === "bool" || e === "uint4" || e === "int4", qGt = e => e === "float32" || e === "float16" || e === "int32" || e === "int64" || e === "uint32" || e === "uint64" || e === "int8" || e === "uint8" || e === "bool" || e === "uint4" || e === "int4", g4t = e => {
      switch (e) {
        case "none":
          return 0;
        case "cpu":
          return 1;
        case "cpu-pinned":
          return 2;
        case "texture":
          return 3;
        case "gpu-buffer":
          return 4;
        case "ml-tensor":
          return 5;
        default:
          throw new Error(`unsupported data location: ${e}`);
      }
    };
  }),
  KGt,
  nSr = Wi(() => {
    UGt(), KGt = async e => {
      if (typeof e == "string") {
        let t = await fetch(e);
        if (!t.ok) throw new Error(`failed to load external data file: ${e}`);
        let n = t.headers.get("Content-Length"),
          r = n ? parseInt(n, 10) : 0;
        if (r < 1073741824) return new Uint8Array(await t.arrayBuffer());
        {
          if (!t.body) throw new Error(`failed to load external data file: ${e}, no response body.`);
          let a = t.body.getReader(),
            i;
          try {
            i = new ArrayBuffer(r);
          } catch (s) {
            if (s instanceof RangeError) {
              let l = Math.ceil(r / 65536);
              i = new WebAssembly.Memory({
                initial: l,
                maximum: l
              }).buffer;
            } else throw s;
          }
          let o = 0;
          for (;;) {
            let {
              done: s,
              value: l
            } = await a.read();
            if (s) break;
            let d = l.byteLength;
            new Uint8Array(i, o, d).set(l), o += d;
          }
          return new Uint8Array(i, 0, r);
        }
      } else return e instanceof Blob ? new Uint8Array(await e.arrayBuffer()) : e instanceof Uint8Array ? e : new Uint8Array(e);
    };
  }),
  Z2n,
  e_n,
  t_n,
  n_n,
  QGt,
  r_n,
  Rd,
  QD = Wi(() => {
    ol(), Z2n = ["V", "I", "W", "E", "F"], e_n = (e, t) => {
      console.log(`[${Z2n[e]},${new Date().toISOString()}]${t}`);
    }, QGt = (e, t) => {
      t_n = e, n_n = t;
    }, r_n = (e, t) => {
      let n = CGe(e),
        r = CGe(t_n);
      n >= r && e_n(n, typeof t == "function" ? t() : t);
    }, Rd = (...e) => {
      n_n && r_n(...e);
    };
  }),
  YGt,
  rSr = Wi(() => {
    ol(), YGt = (e, t) => new (HGt(t))(e);
  }),
  XGt = Wi(() => {}),
  Jut,
  g9e,
  y9e,
  a_n,
  i_n,
  Zut,
  y4t,
  o_n,
  aSr,
  HRo = Wi(() => {
    QD(), XGt(), Jut = new Map([[64, 250], [128, 200], [256, 200], [512, 200], [2048, 230], [4096, 200], [8192, 50], [16384, 50], [32768, 50], [65536, 50], [131072, 50], [262144, 50], [524288, 50], [1048576, 50], [2097152, 30], [4194304, 20], [8388608, 10], [12582912, 10], [16777216, 10], [26214400, 15], [33554432, 22], [44236800, 2], [58982400, 6], [67108864, 6], [134217728, 6], [167772160, 6]]), g9e = [], y9e = e => Math.ceil(Number(e) / 16) * 16, a_n = e => {
      for (let t = 0; t < g9e.length; t++) {
        let n = g9e[t];
        if (e <= n) return n;
      }
      return Math.ceil(e / 16) * 16;
    }, i_n = 1, Zut = () => i_n++, y4t = async (e, t, n, r) => {
      let a = y9e(n),
        i = e.device.createBuffer({
          size: a,
          usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ
        });
      try {
        let o = e.getCommandEncoder();
        e.endComputePass(), o.copyBufferToBuffer(t, 0, i, 0, a), e.flush(), await i.mapAsync(GPUMapMode.READ);
        let s = i.getMappedRange();
        if (r) {
          let l = r();
          return l.set(new Uint8Array(s, 0, n)), l;
        } else return new Uint8Array(s.slice(0, n));
      } finally {
        i.destroy();
      }
    }, o_n = class {
      constructor(e) {
        this.backend = e, this.storageCache = new Map(), this.freeBuffers = new Map(), this.freeUniformBuffers = new Map(), this.buffersPending = [], this.capturedPendingBuffers = new Map();
        for (let [t] of Jut) g9e.push(t), this.freeBuffers.set(t, []), this.freeUniformBuffers.set(t, []);
        this.sessionCount = 0;
      }
      upload(e, t) {
        let n = t.buffer,
          r = t.byteOffset,
          a = t.byteLength,
          i = y9e(a),
          o = this.storageCache.get(e);
        if (!o) throw new Error("gpu data for uploading does not exist");
        if (Number(o.originalSize) !== a) throw new Error(`inconsistent data size. gpu data size=${o.originalSize}, data size=${a}`);
        let s = this.backend.device.createBuffer({
            mappedAtCreation: !0,
            size: i,
            usage: GPUBufferUsage.MAP_WRITE | GPUBufferUsage.COPY_SRC
          }),
          l = s.getMappedRange();
        new Uint8Array(l).set(new Uint8Array(n, r, a)), s.unmap();
        let d = this.backend.device.createCommandEncoder();
        d.copyBufferToBuffer(s, 0, o.gpuData.buffer, 0, i), this.backend.device.queue.submit([d.finish()]), s.destroy(), Rd("verbose", () => `[WebGPU] GpuDataManager.upload(id=${e})`);
      }
      memcpy(e, t) {
        let n = this.storageCache.get(e);
        if (!n) throw new Error("source gpu data for memcpy does not exist");
        let r = this.storageCache.get(t);
        if (!r) throw new Error("destination gpu data for memcpy does not exist");
        if (n.originalSize !== r.originalSize) throw new Error("inconsistent source and destination gpu data size");
        let a = y9e(n.originalSize),
          i = this.backend.getCommandEncoder();
        this.backend.endComputePass(), i.copyBufferToBuffer(n.gpuData.buffer, 0, r.gpuData.buffer, 0, a);
      }
      registerExternalBuffer(e, t, n) {
        let r;
        if (n) {
          if (r = n[0], e === n[1]) return Rd("verbose", () => `[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, buffer is the same, skip.`), r;
          if (this.backend.capturedCommandList.has(this.backend.currentSessionId)) throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`);
        } else r = Zut();
        return this.storageCache.set(r, {
          gpuData: {
            id: r,
            type: 0,
            buffer: e
          },
          originalSize: t
        }), Rd("verbose", () => `[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, registered.`), r;
      }
      unregisterExternalBuffer(e) {
        e !== void 0 && (this.storageCache.delete(e), Rd("verbose", () => `[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`));
      }
      create(e, t = GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST) {
        let n = a_n(e),
          r,
          a = (t & GPUBufferUsage.STORAGE) === GPUBufferUsage.STORAGE,
          i = (t & GPUBufferUsage.UNIFORM) === GPUBufferUsage.UNIFORM;
        if (a || i) {
          let s = (a ? this.freeBuffers : this.freeUniformBuffers).get(n);
          s ? s.length > 0 ? r = s.pop() : r = this.backend.device.createBuffer({
            size: n,
            usage: t
          }) : r = this.backend.device.createBuffer({
            size: n,
            usage: t
          });
        } else r = this.backend.device.createBuffer({
          size: n,
          usage: t
        });
        let o = {
          id: Zut(),
          type: 0,
          buffer: r
        };
        return this.storageCache.set(o.id, {
          gpuData: o,
          originalSize: Number(e)
        }), Rd("verbose", () => `[WebGPU] GpuDataManager.create(size=${e}) => id=${o.id}`), o;
      }
      get(e) {
        var t;
        return (t = this.storageCache.get(e)) == null ? void 0 : t.gpuData;
      }
      release(e) {
        let t = typeof e == "bigint" ? Number(e) : e,
          n = this.storageCache.get(t);
        if (!n) {
          if (this.storageCache.size === 0) return 0;
          throw new Error("releasing data does not exist");
        }
        return Rd("verbose", () => `[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${n.gpuData.id}`), this.storageCache.delete(t), this.buffersPending.push(n.gpuData.buffer), n.originalSize;
      }
      async download(e, t) {
        let n = this.storageCache.get(Number(e));
        if (!n) throw new Error("data does not exist");
        await y4t(this.backend, n.gpuData.buffer, n.originalSize, t);
      }
      refreshPendingBuffers() {
        if (this.buffersPending.length !== 0) if (this.backend.sessionStatus === "default") {
          for (let e of this.buffersPending) {
            let t = Jut.get(e.size);
            if ((e.usage & GPUBufferUsage.STORAGE) === GPUBufferUsage.STORAGE) {
              let n = this.freeBuffers.get(e.size) || [];
              t === void 0 || n.length >= t ? e.destroy() : n.push(e);
            } else if ((e.usage & GPUBufferUsage.UNIFORM) === GPUBufferUsage.UNIFORM) {
              let n = this.freeUniformBuffers.get(e.size) || [];
              t === void 0 || n.length >= t ? e.destroy() : n.push(e);
            } else e.destroy();
          }
          this.buffersPending = [];
        } else {
          let e = this.capturedPendingBuffers.get(this.backend.currentSessionId);
          e || (e = [], this.capturedPendingBuffers.set(this.backend.currentSessionId, e));
          for (let t of this.buffersPending) e.push(t);
          this.buffersPending = [];
        }
      }
      dispose() {
        this.freeBuffers.forEach(e => {
          e.forEach(t => {
            t.destroy();
          });
        }), this.freeUniformBuffers.forEach(e => {
          e.forEach(t => {
            t.destroy();
          });
        }), this.storageCache.forEach(e => {
          e.gpuData.buffer.destroy();
        }), this.capturedPendingBuffers.forEach(e => {
          e.forEach(t => {
            t.destroy();
          });
        }), this.storageCache = new Map(), this.freeBuffers = new Map(), this.freeUniformBuffers = new Map(), this.capturedPendingBuffers = new Map();
      }
      onCreateSession() {
        this.sessionCount += 1;
      }
      onReleaseSession(e) {
        let t = this.capturedPendingBuffers.get(e);
        t && (t.forEach(n => {
          n.destroy();
        }), this.capturedPendingBuffers.delete(e)), this.sessionCount -= 1, this.sessionCount === 0 && (Rd("warning", () => "[WebGPU] Clearing webgpu buffer cache"), this.storageCache.forEach(n => {
          n.gpuData.buffer.destroy();
        }), this.storageCache = new Map());
      }
    }, aSr = (...e) => new o_n(...e);
  }),
  s_n,
  lh,
  wg = Wi(() => {
    s_n = class {
      constructor(e) {
        Object.assign(this, e);
      }
      get cacheKey() {
        return this.key || (this.key = Object.getOwnPropertyNames(this).sort().map(e => `${this[e]}`).join(";")), this.key;
      }
    }, lh = e => new s_n(e);
  }),
  l_n,
  vue,
  si,
  EGe,
  iSr,
  oSr,
  sSr,
  Wl = Wi(() => {
    l_n = class {
      static calcMatMulShape(e, t) {
        return e[1] !== t[0] ? void 0 : [e[0], t[1]];
      }
    }, vue = class {
      static calcShape(e, t, n = !1) {
        let r = e.length,
          a = t.length;
        if (r === 0) return t;
        if (a === 0) return e;
        let i = Math.max(e.length, t.length),
          o = new Array(i);
        if (n) {
          if (r < 2 || a < 2) return;
          let s = l_n.calcMatMulShape([e[r - 2], e[r - 1]], [t[a - 2], t[a - 1]]);
          if (s === void 0) return;
          [o[i - 2], o[i - 1]] = s;
        }
        for (let s = n ? 3 : 1; s <= i; s++) {
          let l = r - s < 0 ? 1 : e[r - s],
            d = a - s < 0 ? 1 : t[a - s];
          if (l !== d && l > 1 && d > 1) return;
          let u = Math.max(l, d);
          if (l && d) o[i - s] = Math.max(l, d);else {
            if (u > 1) return;
            o[i - s] = 0;
          }
        }
        return o;
      }
      static isValidBroadcast(e, t) {
        let n = e.length,
          r = t.length;
        if (n > r) return !1;
        for (let a = 1; a <= n; a++) if (e[n - a] !== 1 && e[n - a] !== t[r - a]) return !1;
        return !0;
      }
    }, si = class PDe {
      static size(t) {
        return PDe.getSizeFromDimensionRange(t, 0, t.length);
      }
      static convertShape(t, n = 4) {
        let r = t.length;
        if (r === 0) return [];
        let a = new Array(r),
          i = r - 1;
        for (; i >= 0;) {
          if (t[i] % n === 0) {
            a[i] = t[i] / n;
            break;
          }
          if (n % t[i] !== 0) throw new Error("cannot convert shape");
          a[i] = 1, n /= t[i], i--;
        }
        for (i--; i >= 0; i--) a[i] = t[i];
        return a;
      }
      static sizeFromDimension(t, n) {
        if (n < 0 || n > t.length) throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${t.length} dimensions.`);
        return PDe.getSizeFromDimensionRange(t, n, t.length);
      }
      static sizeToDimension(t, n) {
        if (n < 0 || n > t.length) throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${t.length} dimensions.`);
        return PDe.getSizeFromDimensionRange(t, 0, n);
      }
      static getSizeFromDimensionRange(t, n, r) {
        let a = 1;
        for (let i = n; i < r; i++) {
          if (t[i] < 0) throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");
          a *= Number(t[i]);
        }
        return a;
      }
      static computeStrides(t) {
        let n = t.length;
        if (n === 0) return [];
        if (n === 1) return [1];
        let r = new Array(n);
        r[n - 1] = 1, r[n - 2] = t[n - 1];
        for (let a = n - 3; a >= 0; --a) r[a] = r[a + 1] * t[a + 1];
        return r;
      }
      static normalizeAxis(t, n) {
        if (t < -n && t >= n) throw new Error("unsupported axis for this operation.");
        return t < 0 ? t + n : t;
      }
      static normalizeAxes(t, n) {
        return t.map(r => this.normalizeAxis(r, n ?? t.length));
      }
      static sortBasedOnPerm(t, n) {
        return n ? n.map(r => t[r]) : t.slice().reverse();
      }
      static padShape(t, n) {
        let r = t.length;
        return t.map((a, i) => a + n[i] + n[i + r]);
      }
      static areEqual(t, n) {
        return t.length !== n.length ? !1 : t.every((r, a) => r === n[a]);
      }
    }, EGe = class ube {
      static adjustPoolAttributes(t, n, r, a, i, o) {
        if (!t && r.length !== n.length - 2) throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");
        if (t) for (let s = 0; s < n.length - 2; s++) s >= r.length ? r.push(n[s + 2]) : r[s] = n[s + 2];
        for (let s = 0; s < r.length; s++) if (s < a.length) {
          if (a[s] < 0) throw new Error("strides should be greater than or equal to 1");
        } else a.push(1);
        for (let s = 0; s < r.length; s++) if (s < i.length) {
          if (i[s] < 0) throw new Error("dilations should be greater than or equal to 1");
        } else i.push(1);
        for (let s = 0; s < r.length * 2; s++) if (s < o.length) {
          if (o[s] < 0) throw new Error("pad should be greater than or equal to 1");
        } else o.push(0);
        for (let s = 0; s < r.length; s++) {
          if (r[s] <= 0) throw new Error("kernel shapes need to be greater than 0");
          if (o[s] >= r[s] || o[s + r.length] >= r[s]) throw new Error("pads should be smaller than kernel");
        }
      }
      static adjustPadsBasedOnAutoPad(t, n, r, a, i, o, s) {
        if (s) {
          if (i.length !== 2 * (t.length - 2)) throw new Error("length of pads should be twice the length of data dimensions");
          if (n.length !== t.length - 2) throw new Error("length of strides should be the length of data dimensions");
          if (a.length !== t.length - 2) throw new Error("length of kernel shapes should be the length of data dimensions");
          for (let l = 0; l < t.length - 2; l++) ube.adjustPadAndReturnShape(t[l + (o ? 1 : 2)], n[l], r[l], a[l], i, l, l + t.length - 2, s);
        }
      }
      static computePoolOutputShape(t, n, r, a, i, o, s) {
        if (n.length <= 0) throw new Error("input shape must be of size greater than 0");
        let l = [n[0], n[1]];
        return ube.computeShapeHelper(t, n, l, r, a, i, o, s), l;
      }
      static computeConvOutputShape(t, n, r, a, i, o, s) {
        if (t.length <= 0 || n.length <= 0) throw new Error("invalid input tensor dims or invalid filter tensor dims");
        let l = [t[0], n[0]];
        return ube.computeShapeHelper(!1, t, l, r, a, i, o, s), l;
      }
      static computeShapeHelper(t, n, r, a, i, o, s, l) {
        if (t) for (let d = 0; d < n.length - 2; d++) r.push(1);else for (let d = 0; d < n.length - 2; d++) r.push(ube.adjustPadAndReturnShape(n[d + 2], a[d], i[d], o[d], s, d, d + n.length - 2, l));
      }
      static adjustPadAndReturnShape(t, n, r, a, i, o, s, l) {
        let d = r * (a - 1) + 1;
        if (l && l !== "NOTSET") switch (l) {
          case "VALID":
            return i[o] = 0, i[s] = 0, Math.floor((t - d) / n + 1);
          case "SAME_LOWER":
          case "SAME_UPPER":
            if (r !== 1) throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");
            {
              let u = ((t + n - 1) / n - 1) * n + a - t;
              return i[o] = Math.floor(l === "SAME_LOWER" ? (u + 1) / 2 : u / 2), i[s] = u - i[o], Math.floor((t + u - a) / n + 1);
            }
          default:
            throw new Error("Unsupported AutoPad type");
        } else return Math.floor((t + i[o] + i[s] - d) / n + 1);
      }
    }, iSr = class {
      static getShapeOfGemmResult(e, t, n, r, a) {
        if (e.length !== 2 || n.length !== 2) throw new Error("shape need to be of size 2");
        let i, o, s;
        t ? (i = e[1], o = e[0]) : (i = e[0], o = e[1]);
        let l = -1;
        if (r ? (s = n[0], l = 1) : (s = n[1], l = 0), n[l] !== o) throw new Error("dimension mismatch");
        if (i <= 0 || s <= 0 || o <= 0) throw new Error("invalid shape specified");
        if (a && !vue.isValidBroadcast(a, [i, s])) throw new Error("gemm: invalid bias shape for broadcast");
        return [i, s, o];
      }
    }, oSr = -34028234663852886e22, sSr = 34028234663852886e22;
  }),
  wue,
  b9e,
  Rb,
  Ww,
  gs,
  wf,
  b4t,
  uae,
  M$,
  ds,
  Rge,
  bi,
  is,
  lSr,
  JGt,
  c_n,
  cSr,
  cc = Wi(() => {
    ol(), Wl(), wue = 64, b9e = (e, t) => {
      if (t === 3) throw new Error("vec3 has same alignment as vec4, use vec4 instead");
      switch (Number(e)) {
        case 10:
          return t > 1 ? `vec${t}<f16>` : "f16";
        case 1:
          return t > 1 ? `vec${t}<f32>` : "f32";
        case 6:
          return t > 1 ? `vec${t}<i32>` : "i32";
        case 12:
          return t > 1 ? `vec${t}<u32>` : "u32";
        case 7:
          if (t > 1) throw new Error("currently not supported vecX of uint64 yet");
          return ["vec2<u32>", "i32"];
        case 13:
          if (t > 1) throw new Error("currently not supported vecX of uint64 yet");
          return ["vec2<u32>", "u32"];
        case 9:
          if (t !== 4) throw new Error("bool must be vec4");
          return ["u32", "vec4<bool>"];
        case 22:
          return "i32";
        case 21:
          return "u32";
        default:
          throw new Error(`Unknown data type: ${e}`);
      }
    }, Rb = (e, t = 1) => {
      let n = b9e(e, t);
      return typeof n == "string" ? n : n[0];
    }, Ww = (e, t = 1) => {
      let n = b9e(e, t);
      return typeof n == "string" ? n : n[1];
    }, gs = (...e) => {
      let t = [];
      return e.forEach(n => {
        n.length !== 0 && t.push({
          type: 12,
          data: n
        }, {
          type: 12,
          data: si.computeStrides(n)
        });
      }), t;
    }, wf = e => e % 4 === 0 ? 4 : e % 2 === 0 ? 2 : 1, b4t = (e = "f32", t, n = "0") => !t || t === 1 ? `${e}(${n})` : `vec${t}<${e}>(${n})`, uae = (e, t, n) => e === "f32" ? n : t === 1 ? `f32(${n})` : `vec${t}<f32>(${n})`, M$ = (e, t) => t === 4 ? `(${e}.x + ${e}.y + ${e}.z + ${e}.w)` : t === 2 ? `(${e}.x + ${e}.y)` : t === 3 ? `(${e}.x + ${e}.y + ${e}.z)` : e, ds = (e, t, n, r) => e.startsWith("uniforms.") && n > 4 ? typeof t == "string" ? r === "f16" ? `${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]` : `${e}[(${t}) / 4][(${t}) % 4]` : r === "f16" ? `${e}[${Math.floor(t / 8)}][${Math.floor(t % 8 / 4)}][${t % 8 % 4}]` : `${e}[${Math.floor(t / 4)}][${t % 4}]` : n > 1 ? `${e}[${t}]` : e, Rge = (e, t, n, r, a) => {
      let i = typeof n == "number",
        o = i ? n : n.length,
        s = [...new Array(o).keys()],
        l = o < 2 ? "u32" : o <= 4 ? `vec${o}<u32>` : `array<u32, ${o}>`,
        d = b9e(t, a),
        u = typeof d == "string" ? d : d[1],
        h = typeof d == "string" ? d : d[0],
        p = {
          indices: l,
          value: u,
          storage: h,
          tensor: t
        },
        m = O => typeof O == "string" ? O : `${O}u`,
        f = {
          offsetToIndices: !1,
          indicesToOffset: !1,
          broadcastedIndicesToOffset: !1,
          set: !1,
          setByIndices: !1,
          get: !1,
          getByIndices: !1
        },
        y = i ? "uniforms." : "",
        b = `${y}${e}_shape`,
        v = `${y}${e}_strides`,
        _ = "";
      for (let O = 0; O < o - 1; O++) _ += `
    let dim${O} = current / ${ds(v, O, o)};
    let rest${O} = current % ${ds(v, O, o)};
    indices[${O}] = dim${O};
    current = rest${O};
    `;
      _ += `indices[${o - 1}] = current;`;
      let w = o < 2 ? "" : `
  fn o2i_${e}(offset: u32) -> ${p.indices} {
    var indices: ${p.indices};
    var current = offset;
    ${_}
    return indices;
  }`,
        k = O => (f.offsetToIndices = !0, o < 2 ? O : `o2i_${e}(${O})`),
        A = [];
      if (o >= 2) for (let O = o - 1; O >= 0; O--) A.push(`${ds(v, O, o)} * (indices[${O}])`);
      let S = o < 2 ? "" : `
  fn i2o_${e}(indices: ${p.indices}) -> u32 {
    return ${A.join("+")};
  }`,
        C = O => (f.indicesToOffset = !0, o < 2 ? O : `i2o_${e}(${O})`),
        I = (...O) => o === 0 ? "0u" : `${p.indices}(${O.map(m).join(",")})`,
        E = (O, L) => o < 2 ? `${O}` : `${ds(O, L, o)}`,
        M = (O, L, D) => o < 2 ? `${O}=${D};` : `${ds(O, L, o)}=${D};`,
        T = {},
        P = (O, L) => {
          f.broadcastedIndicesToOffset = !0;
          let D = `${L.name}broadcastedIndicesTo${e}Offset`;
          if (D in T) return `${D}(${O})`;
          let U = [];
          for (let H = o - 1; H >= 0; H--) {
            let Y = L.indicesGet("outputIndices", H + L.rank - o);
            U.push(`${E(v, H)} * (${Y} % ${E(b, H)})`);
          }
          return T[D] = `fn ${D}(outputIndices: ${L.type.indices}) -> u32 {
             return ${U.length > 0 ? U.join("+") : "0u"};
           }`, `${D}(${O})`;
        },
        R = (O, L) => (() => {
          if (p.storage === p.value) return `${e}[${O}]=${L};`;
          if (p.storage === "vec2<u32>" && p.value === "i32") return `${e}[${O}]=vec2<u32>(u32(${L}), select(0u, 0xFFFFFFFFu, ${L} < 0));`;
          if (p.storage === "vec2<u32>" && p.value === "u32") return `${e}[${O}]=vec2<u32>(u32(${L}), 0u);`;
          if (p.storage === "u32" && p.value === "vec4<bool>") return `${e}[${O}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${L}));`;
          throw new Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`);
        })(),
        j = O => (() => {
          if (p.storage === p.value) return `${e}[${O}]`;
          if (p.storage === "vec2<u32>" && p.value === "i32") return `i32(${e}[${O}].x)`;
          if (p.storage === "vec2<u32>" && p.value === "u32") return `u32(${e}[${O}].x)`;
          if (p.storage === "u32" && p.value === "vec4<bool>") return `vec4<bool>(bool(${e}[${O}] & 0xFFu), bool(${e}[${O}] & 0xFF00u), bool(${e}[${O}] & 0xFF0000u), bool(${e}[${O}] & 0xFF000000u))`;
          throw new Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`);
        })(),
        B = o < 2 ? "" : `
  fn get_${e}ByIndices(indices: ${p.indices}) -> ${u} {
    return ${j(`i2o_${e}(indices)`)};
  }`,
        F = o < 2 ? "" : (() => {
          let O = s.map(D => `d${D}: u32`).join(", "),
            L = s.map(D => `d${D}`).join(", ");
          return `
  fn get_${e}(${O}) -> ${u} {
    return get_${e}ByIndices(${I(L)});
  }`;
        })(),
        N = (...O) => {
          if (O.length !== o) throw new Error(`indices length must be ${o}`);
          let L = O.map(m).join(",");
          return o === 0 ? j("0u") : o === 1 ? j(L[0]) : (f.get = !0, f.getByIndices = !0, f.indicesToOffset = !0, `get_${e}(${L})`);
        },
        G = O => o < 2 ? j(O) : (f.getByIndices = !0, f.indicesToOffset = !0, `get_${e}ByIndices(${O})`),
        z = o < 2 ? "" : `
  fn set_${e}ByIndices(indices: ${p.indices}, value: ${u}) {
    ${R(`i2o_${e}(indices)`, "value")}
  }`,
        V = o < 2 ? "" : (() => {
          let O = s.map(D => `d${D}: u32`).join(", "),
            L = s.map(D => `d${D}`).join(", ");
          return `
  fn set_${e}(${O}, value: ${u}) {
    set_${e}ByIndices(${I(L)}, value);
  }`;
        })();
      return {
        impl: () => {
          let O = [],
            L = !1;
          return f.offsetToIndices && (O.push(w), L = !0), f.indicesToOffset && (O.push(S), L = !0), f.broadcastedIndicesToOffset && (Object.values(T).forEach(D => O.push(D)), L = !0), f.set && (O.push(V), L = !0), f.setByIndices && (O.push(z), L = !0), f.get && (O.push(F), L = !0), f.getByIndices && (O.push(B), L = !0), !i && L && O.unshift(`const ${b} = ${p.indices}(${n.join(",")});`, `const ${v} = ${p.indices}(${si.computeStrides(n).join(",")});`), O.join(`
`);
        },
        type: p,
        offsetToIndices: k,
        indicesToOffset: C,
        broadcastedIndicesToOffset: P,
        indices: I,
        indicesGet: E,
        indicesSet: M,
        set: (...O) => {
          if (O.length !== o + 1) throw new Error(`indices length must be ${o}`);
          let L = O[o];
          if (typeof L != "string") throw new Error("value must be string");
          let D = O.slice(0, o).map(m).join(",");
          return o === 0 ? R("0u", L) : o === 1 ? R(D[0], L) : (f.set = !0, f.setByIndices = !0, f.indicesToOffset = !0, `set_${e}(${D}, ${L})`);
        },
        setByOffset: R,
        setByIndices: (O, L) => o < 2 ? R(O, L) : (f.setByIndices = !0, f.indicesToOffset = !0, `set_${e}ByIndices(${O}, ${L});`),
        get: N,
        getByOffset: j,
        getByIndices: G,
        usage: r,
        name: e,
        strides: v,
        shape: b,
        rank: o
      };
    }, bi = (e, t, n, r = 1) => Rge(e, t, n, "input", r), is = (e, t, n, r = 1) => Rge(e, t, n, "output", r), lSr = (e, t, n) => Rge(e, t, n, "atomicOutput", 1), JGt = (e, t, n, r = 1) => Rge(e, t, n, "internal", r), c_n = class {
      constructor(e, t) {
        this.normalizedDispatchGroup = e, this.limits = t, this.internalVariables = [], this.variables = [], this.uniforms = [], this.variableIndex = 0;
      }
      guardAgainstOutOfBoundsWorkgroupSizes(e) {
        return `if (global_idx >= ${typeof e == "number" ? `${e}u` : e}) { return; }`;
      }
      mainStart(e = wue) {
        let t = typeof e == "number" ? e : e[0],
          n = typeof e == "number" ? 1 : e[1],
          r = typeof e == "number" ? 1 : e[2];
        if (t > this.limits.maxComputeWorkgroupSizeX || n > this.limits.maxComputeWorkgroupSizeY || r > this.limits.maxComputeWorkgroupSizeZ) throw new Error(`workgroup size [${t}, ${n}, ${r}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);
        if (t * n * r > this.limits.maxComputeInvocationsPerWorkgroup) throw new Error(`workgroup size [${t}, ${n}, ${r}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);
        let a = this.normalizedDispatchGroup[1] === 1 && this.normalizedDispatchGroup[2] === 1,
          i = a ? `@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>` : `@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,
          o = a ? `let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;` : `let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t * n * r}u + local_idx;`;
        return `@compute @workgroup_size(${t}, ${n}, ${r})
  fn main(${i}) {
    ${o}
  `;
      }
      appendVariableUniforms(e) {
        e.rank !== 0 && (e.shape.startsWith("uniforms.") && this.uniforms.push({
          name: e.shape.replace("uniforms.", ""),
          type: "u32",
          length: e.rank
        }), e.strides.startsWith("uniforms.") && this.uniforms.push({
          name: e.strides.replace("uniforms.", ""),
          type: "u32",
          length: e.rank
        }));
      }
      declareVariable(e, t) {
        if (e.usage === "internal") throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");
        this.variables.push(e), this.appendVariableUniforms(e);
        let n = e.usage === "input" ? "read" : "read_write",
          r = e.usage === "atomicOutput" ? "atomic<i32>" : e.type.storage;
        return `@group(0) @binding(${t}) var<storage, ${n}> ${e.name}: array<${r}>;`;
      }
      declareVariables(...e) {
        return e.map(t => this.declareVariable(t, this.variableIndex++)).join(`
`);
      }
      registerInternalVariable(e) {
        if (e.usage !== "internal") throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");
        this.internalVariables.push(e), this.appendVariableUniforms(e);
      }
      registerInternalVariables(...e) {
        return e.forEach(t => this.registerInternalVariable(t)), this;
      }
      registerUniform(e, t, n = 1) {
        return this.uniforms.push({
          name: e,
          type: t,
          length: n
        }), this;
      }
      registerUniforms(e) {
        return this.uniforms = this.uniforms.concat(e), this;
      }
      uniformDeclaration() {
        if (this.uniforms.length === 0) return "";
        let e = [];
        for (let {
          name: t,
          type: n,
          length: r
        } of this.uniforms) if (r && r > 4) n === "f16" ? e.push(`@align(16) ${t}:array<mat2x4<${n}>, ${Math.ceil(r / 8)}>`) : e.push(`${t}:array<vec4<${n}>, ${Math.ceil(r / 4)}>`);else {
          let a = r == null || r === 1 ? n : `vec${r}<${n}>`;
          e.push(`${t}:${a}`);
        }
        return `
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`;
      }
      get additionalImplementations() {
        return this.uniformDeclaration() + this.variables.map(e => e.impl()).join(`
`) + this.internalVariables.map(e => e.impl()).join(`
`);
      }
      get variablesInfo() {
        if (this.uniforms.length === 0) return;
        let e = t => [12, 10, 1, 6][["u32", "f16", "f32", "i32"].indexOf(t)];
        return this.uniforms.map(t => [e(t.type), t.length ?? 1]);
      }
    }, cSr = (e, t) => new c_n(e, t);
  }),
  d_n,
  eht,
  u_n,
  h_n,
  p_n,
  m_n,
  t3,
  dSr,
  uSr,
  wG = Wi(() => {
    ol(), Wl(), wg(), cc(), d_n = (e, t) => {
      if (!e || e.length !== 1) throw new Error("Transpose requires 1 input.");
      if (t.length !== 0 && t.length !== e[0].dims.length) throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`);
    }, eht = (e, t) => t.length !== 0 ? t : [...new Array(e).keys()].reverse(), u_n = (e, t) => si.sortBasedOnPerm(e, eht(e.length, t)), h_n = (e, t, n, r) => {
      let a = `fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;
      for (let i = 0; i < t; ++i) a += `a[${e[i]}]=i[${i}];`;
      return a += "return a;}";
    }, p_n = (e, t) => {
      let n = [],
        r = [];
      for (let a = 0; a < e.length; ++a) e[a] !== 1 && n.push(e[a]), e[t[a]] !== 1 && r.push(t[a]);
      return {
        newShape: n,
        newPerm: r
      };
    }, m_n = (e, t) => {
      let n = 0;
      for (let r = 0; r < e.length; ++r) if (t[e[r]] !== 1) {
        if (e[r] < n) return !1;
        n = e[r];
      }
      return !0;
    }, t3 = (e, t) => {
      let n = e.dataType,
        r = e.dims.length,
        a = eht(r, t),
        i = u_n(e.dims, a),
        o = e.dims,
        s = i,
        l = r < 2 || m_n(a, e.dims),
        d;
      if (l) return d = f => {
        let y = bi("input", n, o, 4),
          b = is("output", n, s, 4);
        return `
  ${f.registerUniform("output_size", "u32").declareVariables(y, b)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`;
      }, {
        name: "TransposeCopy",
        shaderCache: {
          inputDependencies: ["type"]
        },
        getRunData: () => {
          let f = si.size(i);
          return {
            outputs: [{
              dims: i,
              dataType: e.dataType
            }],
            dispatchGroup: {
              x: Math.ceil(f / 64 / 4)
            },
            programUniforms: [{
              type: 12,
              data: Math.ceil(f / 4)
            }]
          };
        },
        getShaderSource: d
      };
      let {
          newShape: u,
          newPerm: h
        } = p_n(e.dims, a),
        p = si.areEqual(h, [2, 3, 1]),
        m = si.areEqual(h, [3, 1, 2]);
      if (u.length === 2 || p || m) {
        o = p ? [u[0], u[1] * u[2]] : m ? [u[0] * u[1], u[2]] : u, s = [o[1], o[0]];
        let f = 16;
        return d = y => {
          let b = bi("a", n, o.length),
            v = is("output", n, s.length);
          return `
  ${y.registerUniform("output_size", "u32").declareVariables(b, v)}
  var<workgroup> tile : array<array<${v.type.value}, ${f + 1}>, ${f}>;
  ${y.mainStart([f, f, 1])}
    let stride = (uniforms.output_shape[1] - 1) / ${f} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${f}u + local_id.x;
    let input_row = workgroup_id_x * ${f}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${b.getByIndices(`${b.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${f}u + local_id.x;
    let output_row = workgroup_id_y * ${f}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${v.setByIndices(`${v.type.indices}(output_row, output_col)`, "tile[local_id.x][local_id.y]")}
    }
  }`;
        }, {
          name: "TransposeShared",
          shaderCache: {
            inputDependencies: ["type"]
          },
          getRunData: () => {
            let y = si.size(i);
            return {
              outputs: [{
                dims: i,
                dataType: e.dataType
              }],
              dispatchGroup: {
                x: Math.ceil(s[1] / f),
                y: Math.ceil(s[0] / f)
              },
              programUniforms: [{
                type: 12,
                data: y
              }, ...gs(o, s)]
            };
          },
          getShaderSource: d
        };
      }
      return d = f => {
        let y = bi("a", n, o.length),
          b = is("output", n, s.length);
        return `
  ${f.registerUniform("output_size", "u32").declareVariables(y, b)}

  ${h_n(a, r, y, b)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${b.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${b.setByOffset("global_idx", y.getByIndices("aIndices"))}
  }`;
      }, {
        name: "Transpose",
        shaderCache: {
          hint: `${t}`,
          inputDependencies: ["rank"]
        },
        getRunData: () => {
          let f = si.size(i);
          return {
            outputs: [{
              dims: i,
              dataType: e.dataType
            }],
            dispatchGroup: {
              x: Math.ceil(f / 64)
            },
            programUniforms: [{
              type: 12,
              data: f
            }, ...gs(o, s)]
          };
        },
        getShaderSource: d
      };
    }, dSr = (e, t) => {
      d_n(e.inputs, t.perm), e.compute(t3(e.inputs[0], t.perm));
    }, uSr = e => lh({
      perm: e.perm
    });
  }),
  f_n,
  g_n,
  y_n,
  b_n,
  v_n,
  w_n,
  x_n,
  __n,
  k_n,
  A_n,
  eC,
  hSr,
  pSr,
  mSr,
  fSr,
  gSr,
  ySr,
  bSr,
  vSr,
  wSr,
  xSr,
  WRo = Wi(() => {
    ol(), Wl(), cc(), ZGt(), wG(), f_n = {
      max: "select(bestValue, candidate, candidate > bestValue)",
      min: "select(bestValue, candidate, candidate < bestValue)",
      mean: "bestValue + candidate",
      sum: "bestValue + candidate",
      prod: "bestValue * candidate",
      sumSquare: "bestValue + candidate * candidate",
      logSumExp: "bestValue + exp(candidate)",
      l1: "bestValue + abs(candidate)",
      l2: "bestValue + candidate * candidate",
      logSum: "bestValue + candidate"
    }, g_n = {
      max: "select(bestValue, candidate, candidate > bestValue)",
      min: "select(bestValue, candidate, candidate < bestValue)",
      mean: "bestValue + candidate",
      sum: "bestValue + candidate",
      prod: "bestValue * candidate",
      sumSquare: "bestValue + candidate",
      logSumExp: "bestValue + candidate",
      l1: "bestValue + candidate",
      l2: "bestValue + candidate",
      logSum: "bestValue + candidate"
    }, y_n = {
      max: "_A[offset]",
      min: "_A[offset]",
      mean: "0",
      sum: "0",
      prod: "1",
      sumSquare: "0",
      logSumExp: "0",
      l1: "0",
      l2: "0",
      logSum: "0"
    }, b_n = {
      max: "bestValue",
      min: "bestValue",
      sum: "bestValue",
      prod: "bestValue",
      sumSquare: "bestValue",
      logSumExp: "log(bestValue)",
      l1: "bestValue",
      l2: "sqrt(bestValue)",
      logSum: "log(bestValue)"
    }, v_n = (e, t) => {
      let n = [];
      for (let r = t - e; r < t; ++r) n.push(r);
      return n;
    }, w_n = (e, t) => {
      let n = [],
        r = e.length;
      for (let i = 0; i < r; i++) t.indexOf(i) === -1 && n.push(e[i]);
      let a = t.map(i => e[i]);
      return [n, a];
    }, x_n = (e, t) => {
      let n = e.length + t.length,
        r = [],
        a = 0;
      for (let i = 0; i < n; i++) t.indexOf(i) === -1 ? r.push(e[a++]) : r.push(1);
      return r;
    }, __n = (e, t) => {
      for (let n = 0; n < e.length; ++n) if (e[e.length - n - 1] !== t - 1 - n) return !1;
      return !0;
    }, k_n = (e, t) => {
      let n = [];
      if (!__n(e, t)) {
        for (let r = 0; r < t; ++r) e.indexOf(r) === -1 && n.push(r);
        e.forEach(r => n.push(r));
      }
      return n;
    }, A_n = (e, t, n, r, a, i, o) => {
      let s = n[0].dims,
        l = si.size(i),
        d = si.size(o),
        u = bi("_A", n[0].dataType, s),
        h = is("output", a, i),
        p = 64;
      l === 1 && (p = 256);
      let m = `
          var<workgroup> aBestValues : array<f32, ${p}>;
       `,
        f = y => `
        ${y.registerUniform("reduceSize", "u32").declareVariables(u, h)}
        ${m}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${y.mainStart(p)}

          let outputIndex = global_idx / ${p};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${y_n[r]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${p}) {
           let candidate = f32(${u.getByOffset("offset + k")});
           bestValue = ${f_n[r]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${p}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${g_n[r]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${h.setByOffset("outputIndex", `${r === "mean" ? `${h.type.storage}(bestValue / f32(uniforms.reduceSize))` : `${h.type.storage}(${b_n[r]})`}`)};
         }
        }`;
      return {
        name: e,
        shaderCache: {
          hint: `${t};${p}`,
          inputDependencies: ["type"]
        },
        getShaderSource: f,
        getRunData: () => ({
          outputs: [{
            dims: i,
            dataType: a
          }],
          dispatchGroup: {
            x: l
          },
          programUniforms: [{
            type: 12,
            data: d
          }]
        })
      };
    }, eC = (e, t, n, r) => {
      let a = e.inputs.length === 1 ? n : v4t(e.inputs, n),
        i = a.axes;
      i.length === 0 && !a.noopWithEmptyAxes && (i = e.inputs[0].dims.map((m, f) => f));
      let o = si.normalizeAxes(i, e.inputs[0].dims.length),
        s = o,
        l = e.inputs[0],
        d = k_n(s, e.inputs[0].dims.length);
      d.length > 0 && (l = e.compute(t3(e.inputs[0], d), {
        inputs: [0],
        outputs: [-1]
      })[0], s = v_n(s.length, l.dims.length));
      let [u, h] = w_n(l.dims, s),
        p = u;
      a.keepDims && (p = x_n(u, o)), e.compute(A_n(t, a.cacheKey, [l], r, e.inputs[0].dataType, p, h), {
        inputs: [l]
      });
    }, hSr = (e, t) => {
      eC(e, "ReduceMeanShared", t, "mean");
    }, pSr = (e, t) => {
      eC(e, "ReduceL1Shared", t, "l1");
    }, mSr = (e, t) => {
      eC(e, "ReduceL2Shared", t, "l2");
    }, fSr = (e, t) => {
      eC(e, "ReduceLogSumExpShared", t, "logSumExp");
    }, gSr = (e, t) => {
      eC(e, "ReduceMaxShared", t, "max");
    }, ySr = (e, t) => {
      eC(e, "ReduceMinShared", t, "min");
    }, bSr = (e, t) => {
      eC(e, "ReduceProdShared", t, "prod");
    }, vSr = (e, t) => {
      eC(e, "ReduceSumShared", t, "sum");
    }, wSr = (e, t) => {
      eC(e, "ReduceSumSquareShared", t, "sumSquare");
    }, xSr = (e, t) => {
      eC(e, "ReduceLogSumShared", t, "logSum");
    };
  }),
  tC,
  S_n,
  TGe,
  v4t,
  nC,
  I_n,
  C_n,
  E_n,
  T_n,
  M_n,
  P_n,
  R_n,
  N_n,
  j_n,
  D_n,
  rC,
  _Sr,
  kSr,
  ASr,
  SSr,
  ISr,
  CSr,
  ESr,
  TSr,
  MSr,
  PSr,
  ZGt = Wi(() => {
    ol(), Wl(), wg(), cc(), WRo(), tC = e => {
      if (!e || e.length === 0 || e.length > 2) throw new Error("Reduce op requires 1 or 2 inputs.");
      if (e.length === 2 && e[1].dims.length !== 1) throw new Error("Invalid axes input dims.");
    }, S_n = e => ["", "", `var value = ${e.getByIndices("input_indices")};`, ""], TGe = (e, t, n, r, a, i, o = !1, s = !1) => {
      let l = [],
        d = n[0].dims,
        u = d.length,
        h = si.normalizeAxes(a, u),
        p = !s && h.length === 0;
      d.forEach((y, b) => {
        p || h.indexOf(b) >= 0 ? o && l.push(1) : l.push(y);
      });
      let m = l.length,
        f = si.size(l);
      return {
        name: e,
        shaderCache: t,
        getShaderSource: y => {
          let b = [],
            v = bi("_A", n[0].dataType, u),
            _ = is("output", i, m),
            w = r(v, _, h),
            k = w[2];
          for (let A = 0, S = 0; A < u; A++) p || h.indexOf(A) >= 0 ? (o && S++, k = `for(var j${A}: u32 = 0; j${A} < ${d[A]}; j${A}++) {
                  ${w[2].includes("last_index") ? `let last_index = j${A};` : ""}
                  ${v.indicesSet("input_indices", A, `j${A}`)}
                  ${k}
                }`) : (b.push(`${v.indicesSet("input_indices", A, _.indicesGet("output_indices", S))};`), S++);
          return `

        ${y.registerUniform("output_size", "u32").declareVariables(v, _)}

        ${y.mainStart()}
          ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${v.type.indices};
          let output_indices = ${_.offsetToIndices("global_idx")};

          ${b.join(`
`)}
          ${w[0]}       // init ops for reduce max/min
          ${w[1]}
          ${k}
          ${w[3]}
          ${w.length === 4 ? _.setByOffset("global_idx", "value") : w.slice(4).join(`
`)}
        }`;
        },
        getRunData: () => ({
          outputs: [{
            dims: l,
            dataType: i
          }],
          dispatchGroup: {
            x: Math.ceil(f / 64)
          },
          programUniforms: [{
            type: 12,
            data: f
          }, ...gs(d, l)]
        })
      };
    }, v4t = (e, t) => {
      let n = [];
      return e[1].dims[0] > 0 && e[1].getBigInt64Array().forEach(r => n.push(Number(r))), lh({
        axes: n,
        keepDims: t.keepDims,
        noopWithEmptyAxes: t.noopWithEmptyAxes
      });
    }, nC = (e, t, n, r) => {
      let a = e.inputs,
        i = a.length === 1 ? n : v4t(a, n);
      e.compute(TGe(t, {
        hint: i.cacheKey,
        inputDependencies: ["rank"]
      }, [a[0]], i.noopWithEmptyAxes && i.axes.length === 0 ? S_n : r, i.axes, a[0].dataType, i.keepDims, i.noopWithEmptyAxes), {
        inputs: [0]
      });
    }, I_n = (e, t) => {
      tC(e.inputs), nC(e, "ReduceLogSum", t, (n, r) => [`var value = ${r.type.storage}(0);`, "", `value += ${n.getByIndices("input_indices")};`, "value = log(value);"]);
    }, C_n = (e, t) => {
      tC(e.inputs), nC(e, "ReduceL1", t, (n, r) => [`var value = ${r.type.storage}(0);`, "", `value += abs(${n.getByIndices("input_indices")});`, ""]);
    }, E_n = (e, t) => {
      tC(e.inputs), nC(e, "ReduceL2", t, (n, r) => [`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`, "", `t = ${n.getByIndices("input_indices")}; value += (t * t);`, "value = sqrt(value);"]);
    }, T_n = (e, t) => {
      tC(e.inputs), nC(e, "ReduceLogSumExp", t, (n, r) => [`var value = ${r.type.storage}(0);`, "", `value += exp(${n.getByIndices("input_indices")});`, "value = log(value);"]);
    }, M_n = (e, t) => {
      tC(e.inputs), nC(e, "ReduceMax", t, (n, r, a) => {
        let i = [];
        for (let o = 0; o < n.rank; o++) (a.indexOf(o) >= 0 || a.length === 0) && i.push(n.indicesSet("input_indices", o, 0));
        return [`${i.join(`
`)}`, `var value = ${n.getByIndices("input_indices")};`, `value = max(value, ${n.getByIndices("input_indices")});`, ""];
      });
    }, P_n = (e, t) => {
      tC(e.inputs), nC(e, "ReduceMean", t, (n, r, a) => {
        let i = 1;
        for (let o = 0; o < n.rank; o++) (a.indexOf(o) >= 0 || a.length === 0) && (i *= e.inputs[0].dims[o]);
        return ["var sum = f32(0);", "", `sum += f32(${n.getByIndices("input_indices")});`, `let value = ${r.type.value}(sum / ${i});`];
      });
    }, R_n = (e, t) => {
      tC(e.inputs), nC(e, "ReduceMin", t, (n, r, a) => {
        let i = [];
        for (let o = 0; o < n.rank; o++) (a.indexOf(o) >= 0 || a.length === 0) && i.push(`input_indices[${o}] = 0;`);
        return [`${i.join(`
`)}`, `var value = ${n.getByIndices("input_indices")};`, `value = min(value, ${n.getByIndices("input_indices")});`, ""];
      });
    }, N_n = (e, t) => {
      tC(e.inputs), nC(e, "ReduceProd", t, (n, r) => [`var value = ${r.type.storage}(1);`, "", `value *= ${n.getByIndices("input_indices")};`, ""]);
    }, j_n = (e, t) => {
      tC(e.inputs), nC(e, "ReduceSum", t, (n, r) => [`var value = ${r.type.storage}(0);`, "", `value += ${n.getByIndices("input_indices")};`, ""]);
    }, D_n = (e, t) => {
      tC(e.inputs), nC(e, "ReduceSumSquare", t, (n, r) => [`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`, "", `t = ${n.getByIndices("input_indices")}; value += t * t;`, ""]);
    }, rC = (e, t, n) => {
      if (t.length === 0) return n;
      let r = 1,
        a = 1;
      for (let i = 0; i < t.length; i++) t.indexOf(i) === -1 ? r *= e[i] : a *= e[i];
      return a < 32 && r > 1024;
    }, _Sr = (e, t) => {
      rC(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? P_n(e, t) : hSr(e, t);
    }, kSr = (e, t) => {
      rC(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? C_n(e, t) : pSr(e, t);
    }, ASr = (e, t) => {
      rC(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? E_n(e, t) : mSr(e, t);
    }, SSr = (e, t) => {
      rC(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? T_n(e, t) : fSr(e, t);
    }, ISr = (e, t) => {
      rC(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? M_n(e, t) : gSr(e, t);
    }, CSr = (e, t) => {
      rC(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? R_n(e, t) : ySr(e, t);
    }, ESr = (e, t) => {
      rC(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? N_n(e, t) : bSr(e, t);
    }, TSr = (e, t) => {
      rC(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? j_n(e, t) : vSr(e, t);
    }, MSr = (e, t) => {
      rC(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? D_n(e, t) : wSr(e, t);
    }, PSr = (e, t) => {
      rC(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? I_n(e, t) : xSr(e, t);
    };
  }),
  tht,
  RSr,
  NSr,
  w4t,
  qRo = Wi(() => {
    ol(), wg(), ZGt(), tht = e => {
      if (!e || e.length === 0 || e.length > 2) throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");
      if (e[0].dataType !== 1) throw new Error("Invalid input type.");
    }, RSr = (e, t) => {
      tht(e.inputs);
      let n = (r, a, i) => {
        let o = [];
        for (let s = 0; s < r.rank; s++) (i.indexOf(s) >= 0 || i.length === 0) && o.push(`input_indices[${s}] = 0;`);
        return [`${o.join(`
`)}`, `var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`, `if (${r.getByIndices("input_indices")} ${t.selectLastIndex > 0 ? "<=" : "<"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`, "", a.setByOffset("global_idx", "best_index")];
      };
      e.compute(TGe("ArgMin", {
        hint: t.cacheKey,
        inputDependencies: ["rank"]
      }, [e.inputs[0]], n, [t.axis], 7, t.keepDims), {
        inputs: [0]
      });
    }, NSr = (e, t) => {
      tht(e.inputs);
      let n = (r, a, i) => {
        let o = [];
        for (let s = 0; s < r.rank; s++) (i.indexOf(s) >= 0 || i.length === 0) && o.push(`input_indices[${s}] = 0;`);
        return [`${o.join(`
`)}`, `var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`, `if (${r.getByIndices("input_indices")} ${t.selectLastIndex > 0 ? ">=" : ">"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`, "", a.setByOffset("global_idx", "best_index")];
      };
      e.compute(TGe("argMax", {
        hint: t.cacheKey,
        inputDependencies: ["rank"]
      }, [e.inputs[0]], n, [t.axis], 7, t.keepDims), {
        inputs: [0]
      });
    }, w4t = e => lh(e);
  }),
  L_n,
  v9e,
  O_n,
  B_n,
  F_n,
  eSe,
  z_n,
  jSr,
  eVt = Wi(() => {
    ol(), Wl(), XGt(), cc(), L_n = (e, t) => {
      let n = e[0],
        r = e[1],
        a = e[2],
        i = e[3],
        o = e[4],
        s = e[5];
      if (o && s) throw new Error("Attention cannot have both past and attention_bias");
      if (n.dims.length !== 3) throw new Error('Input "input" must have 3 dimensions');
      let l = n.dims[0],
        d = n.dims[1],
        u = n.dims[2];
      if (a.dims.length !== 1) throw new Error('Input "bias" is expected to have 1 dimensions');
      if (r.dims.length !== 2) throw new Error('Input "weights" is expected to have 2 dimensions');
      if (r.dims[0] !== u) throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");
      if (a.dims[0] !== r.dims[1]) throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');
      let h = a.dims[0] / 3,
        p = h,
        m = p;
      if (t.qkvHiddenSizes.length > 0) {
        if (t.qkvHiddenSizes.length !== 3) throw new Error("qkv_hidden_sizes attribute should have 3 elements");
        for (let w of t.qkvHiddenSizes) if (w % t.numHeads !== 0) throw new Error("qkv_hidden_sizes should be divisible by num_heads");
        h = t.qkvHiddenSizes[0], p = t.qkvHiddenSizes[1], m = t.qkvHiddenSizes[2];
      }
      let f = d;
      if (h !== p) throw new Error("qkv_hidden_sizes first element should be same as the second");
      if (a.dims[0] !== h + p + m) throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');
      let y = 0;
      if (o) {
        if (p !== m) throw new Error('Input "past" expect k_hidden_size == v_hidden_size');
        if (o.dims.length !== 5) throw new Error('Input "past" must have 5 dimensions');
        if (o.dims[0] !== 2) throw new Error('Input "past" first dimension must be 2');
        if (o.dims[1] !== l) throw new Error('Input "past" second dimension must be batch_size');
        if (o.dims[2] !== t.numHeads) throw new Error('Input "past" third dimension must be num_heads');
        if (o.dims[4] !== p / t.numHeads) throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');
        t.pastPresentShareBuffer || (y = o.dims[3]);
      }
      let b = f + y,
        v = -1,
        _ = 0;
      if (i) throw new Error("Mask not supported");
      if (o) throw new Error("past is not supported");
      if (s) {
        if (s.dims.length !== 4) throw new Error('Input "attention_bias" must have 4 dimensions');
        if (s.dims[0] !== l || s.dims[1] !== t.numHeads || s.dims[2] !== d || s.dims[3] !== b) throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)');
      }
      return {
        batchSize: l,
        sequenceLength: d,
        pastSequenceLength: y,
        kvSequenceLength: f,
        totalSequenceLength: b,
        maxSequenceLength: v,
        inputHiddenSize: u,
        hiddenSize: h,
        vHiddenSize: m,
        headSize: Math.floor(h / t.numHeads),
        vHeadSize: Math.floor(m / t.numHeads),
        numHeads: t.numHeads,
        isUnidirectional: !1,
        pastPresentShareBuffer: !1,
        maskFilterValue: t.maskFilterValue,
        maskType: _,
        scale: t.scale,
        broadcastResPosBias: !1,
        passPastInKv: !1,
        qkvFormat: 1
      };
    }, v9e = (e, t, n) => t && e ? `
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e == null ? void 0 : e.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       ` : `
    ${n ? "let past_sequence_length = uniforms.past_sequence_length" : ""};
    let present_sequence_length = total_sequence_length;
    `, O_n = (e, t, n, r, a, i, o, s) => {
      let l = wf(o ? 1 : i),
        d = 64,
        u = i / l;
      u < d && (d = 32);
      let h = Math.ceil(i / l / d),
        p = [{
          type: 12,
          data: t
        }, {
          type: 12,
          data: n
        }, {
          type: 12,
          data: r
        }, {
          type: 12,
          data: a
        }, {
          type: 12,
          data: u
        }, {
          type: 12,
          data: h
        }],
        m = Rb(e.dataType, l),
        f = Ww(1, l),
        y = ["type"];
      o && y.push("type"), s && y.push("type");
      let b = v => {
        let _ = is("x", e.dataType, e.dims, l),
          w = [_],
          k = o ? bi("seq_lens", o.dataType, o.dims) : void 0;
        k && w.push(k);
        let A = s ? bi("total_sequence_length_input", s.dataType, s.dims) : void 0;
        A && w.push(A);
        let S = Ww(e.dataType),
          C = [{
            name: "batch_size",
            type: "u32"
          }, {
            name: "num_heads",
            type: "u32"
          }, {
            name: "past_sequence_length",
            type: "u32"
          }, {
            name: "sequence_length",
            type: "u32"
          }, {
            name: "total_sequence_length",
            type: "u32"
          }, {
            name: "elements_per_thread",
            type: "u32"
          }];
        return `
  var<workgroup> thread_max: array<f32, ${d}>;
  var<workgroup> thread_sum: array<f32, ${d}>;
  ${v.registerUniforms(C).declareVariables(...w)}
  ${v.mainStart([d, 1, 1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${v9e(k, A, !1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${d}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${o ? "u32(past_sequence_length + workgroup_id.y + 1)" : "total_sequence_length"};
    var thread_max_vector = ${f}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${f}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(() => {
          switch (l) {
            case 1:
              return "thread_max_vector";
            case 2:
              return "max(thread_max_vector.x, thread_max_vector.y)";
            case 4:
              return "max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";
            default:
              throw new Error(`Unsupported components: ${l}`);
          }
        })()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${d}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${f}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${f}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(() => {
          switch (l) {
            case 1:
              return "sum_vector";
            case 2:
              return "sum_vector.x + sum_vector.y";
            case 4:
              return "sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";
            default:
              throw new Error(`Unsupported components: ${l}`);
          }
        })()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${d}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${_.type.value}(${S}(1.0) / ${S}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${f}(x[offset + i]);
        x[offset + i] = ${_.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${o ? `
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${_.type.value}(${S}(0));
        }` : ""};
  }`;
      };
      return {
        name: "AttentionProbsSoftmax",
        shaderCache: {
          hint: `${d};${m};${l}`,
          inputDependencies: y
        },
        getShaderSource: b,
        getRunData: () => ({
          outputs: [],
          dispatchGroup: {
            x: Math.ceil(i / d),
            y: a,
            z: t * n
          },
          programUniforms: p
        })
      };
    }, B_n = (e, t, n, r, a, i, o, s, l) => {
      let d = o + i.kvSequenceLength,
        u = [i.batchSize, i.numHeads, i.sequenceLength, d],
        h = e > 1 && r,
        p = i.kvNumHeads ? i.kvNumHeads : i.numHeads,
        m = h ? [i.batchSize, p, d, i.headSize] : void 0,
        f = i.nReps ? i.nReps : 1,
        y = i.scale === 0 ? 1 / Math.sqrt(i.headSize) : i.scale,
        b = wf(i.headSize),
        v = i.headSize / b,
        _ = 12,
        w = {
          x: Math.ceil(d / _),
          y: Math.ceil(i.sequenceLength / _),
          z: i.batchSize * i.numHeads
        },
        k = [{
          type: 12,
          data: i.sequenceLength
        }, {
          type: 12,
          data: v
        }, {
          type: 12,
          data: d
        }, {
          type: 12,
          data: i.numHeads
        }, {
          type: 12,
          data: i.headSize
        }, {
          type: 1,
          data: y
        }, {
          type: 12,
          data: o
        }, {
          type: 12,
          data: i.kvSequenceLength
        }, {
          type: 12,
          data: f
        }],
        A = h && r && si.size(r.dims) > 0,
        S = ["type", "type"];
      A && S.push("type"), a && S.push("type"), s && S.push("type"), l && S.push("type");
      let C = [{
        dims: u,
        dataType: t.dataType,
        gpuDataType: 0
      }];
      h && C.push({
        dims: m,
        dataType: t.dataType,
        gpuDataType: 0
      });
      let I = E => {
        let M = bi("q", t.dataType, t.dims, b),
          T = bi("key", n.dataType, n.dims, b),
          P = [M, T];
        if (A) {
          let z = bi("past_key", r.dataType, r.dims, b);
          P.push(z);
        }
        a && P.push(bi("attention_bias", a.dataType, a.dims));
        let R = s ? bi("seq_lens", s.dataType, s.dims) : void 0;
        R && P.push(R);
        let j = l ? bi("total_sequence_length_input", l.dataType, l.dims) : void 0;
        j && P.push(j);
        let B = is("output", t.dataType, u),
          F = [B];
        h && F.push(is("present_key", t.dataType, m, b));
        let N = Ww(1, b),
          G = [{
            name: "M",
            type: "u32"
          }, {
            name: "K",
            type: "u32"
          }, {
            name: "N",
            type: "u32"
          }, {
            name: "num_heads",
            type: "u32"
          }, {
            name: "head_size",
            type: "u32"
          }, {
            name: "alpha",
            type: "f32"
          }, {
            name: "past_sequence_length",
            type: "u32"
          }, {
            name: "kv_sequence_length",
            type: "u32"
          }, {
            name: "n_reps",
            type: "u32"
          }];
        return `
  const TILE_SIZE = ${_}u;

  var<workgroup> tileQ: array<${M.type.storage}, ${_ * _}>;
  var<workgroup> tileK: array<${M.type.storage}, ${_ * _}>;
  ${E.registerUniforms(G).declareVariables(...P, ...F)}
  ${E.mainStart([_, _, 1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${f === 1 ? "headIdx" : "headIdx / uniforms.n_reps"};
    let kv_num_heads = ${f === 1 ? "uniforms.num_heads" : "uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${v9e(R, j, !0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${A && h ? "let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;" : ""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${h ? "let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;" : ""}
    var value = ${N}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${A && h ? `
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }` : `
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${h ? `if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }` : ""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${N}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(() => {
          switch (b) {
            case 1:
              return "value";
            case 2:
              return "value.x + value.y";
            case 4:
              return "value.x + value.y + value.z + value.w";
            default:
              throw new Error(`Unsupported components: ${b}`);
          }
        })()};
        output[outputIdx] = ${B.type.value} (sum * uniforms.alpha) + ${a ? "attention_bias[outputIdx]" : "0.0"};
    }
  }`;
      };
      return {
        name: "AttentionProbs",
        shaderCache: {
          hint: `${b};${a !== void 0};${r !== void 0};${e}`,
          inputDependencies: S
        },
        getRunData: () => ({
          outputs: C,
          dispatchGroup: w,
          programUniforms: k
        }),
        getShaderSource: I
      };
    }, F_n = (e, t, n, r, a, i, o = void 0, s = void 0) => {
      let l = i + a.kvSequenceLength,
        d = a.nReps ? a.nReps : 1,
        u = a.vHiddenSize * d,
        h = e > 1 && r,
        p = a.kvNumHeads ? a.kvNumHeads : a.numHeads,
        m = h ? [a.batchSize, p, l, a.headSize] : void 0,
        f = [a.batchSize, a.sequenceLength, u],
        y = 12,
        b = {
          x: Math.ceil(a.vHeadSize / y),
          y: Math.ceil(a.sequenceLength / y),
          z: a.batchSize * a.numHeads
        },
        v = [{
          type: 12,
          data: a.sequenceLength
        }, {
          type: 12,
          data: l
        }, {
          type: 12,
          data: a.vHeadSize
        }, {
          type: 12,
          data: a.numHeads
        }, {
          type: 12,
          data: a.headSize
        }, {
          type: 12,
          data: u
        }, {
          type: 12,
          data: i
        }, {
          type: 12,
          data: a.kvSequenceLength
        }, {
          type: 12,
          data: d
        }],
        _ = h && r && si.size(r.dims) > 0,
        w = ["type", "type"];
      _ && w.push("type"), o && w.push("type"), s && w.push("type");
      let k = [{
        dims: f,
        dataType: t.dataType,
        gpuDataType: 0
      }];
      h && k.push({
        dims: m,
        dataType: t.dataType,
        gpuDataType: 0
      });
      let A = S => {
        let C = bi("probs", t.dataType, t.dims),
          I = bi("v", n.dataType, n.dims),
          E = [C, I];
        _ && E.push(bi("past_value", r.dataType, r.dims));
        let M = o ? bi("seq_lens", o.dataType, o.dims) : void 0;
        o && E.push(M);
        let T = s ? bi("total_sequence_length_input", s.dataType, s.dims) : void 0;
        s && E.push(T);
        let P = [is("output", t.dataType, f)];
        h && P.push(is("present_value", t.dataType, m));
        let R = [{
          name: "M",
          type: "u32"
        }, {
          name: "K",
          type: "u32"
        }, {
          name: "N",
          type: "u32"
        }, {
          name: "num_heads",
          type: "u32"
        }, {
          name: "head_size",
          type: "u32"
        }, {
          name: "v_hidden_size",
          type: "u32"
        }, {
          name: "past_sequence_length",
          type: "u32"
        }, {
          name: "kv_sequence_length",
          type: "u32"
        }, {
          name: "n_reps",
          type: "u32"
        }];
        return `
  const TILE_SIZE = ${y}u;
  var<workgroup> tileQ: array<${C.type.value}, ${y * y}>;
  var<workgroup> tileV: array<${C.type.value}, ${y * y}>;
  ${S.registerUniforms(R).declareVariables(...E, ...P)}
  ${S.mainStart([y, y, 1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${d === 1 ? "headIdx" : "headIdx / uniforms.n_reps"};
   let kv_num_heads = ${d === 1 ? "uniforms.num_heads" : "uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${v9e(M, T, !0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${_ && h ? "let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;" : ""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${h ? "let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;" : ""}
   var value = ${C.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${_ && h ? `
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      ` : `
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${h ? `
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }` : ""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`;
      };
      return {
        name: "AttentionScore",
        shaderCache: {
          hint: `${r !== void 0};${e}`,
          inputDependencies: w
        },
        getRunData: () => ({
          outputs: k,
          dispatchGroup: b,
          programUniforms: v
        }),
        getShaderSource: A
      };
    }, eSe = (e, t, n, r, a, i, o, s, l, d, u = void 0, h = void 0) => {
      let p = Math.min(e.outputCount, 1 + (o ? 1 : 0) + (s ? 1 : 0)),
        m = p > 1 ? d.pastSequenceLength : 0,
        f = m + d.kvSequenceLength,
        y = l && si.size(l.dims) > 0 ? l : void 0,
        b = [t, n];
      p > 1 && o && si.size(o.dims) > 0 && b.push(o), y && b.push(y), u && b.push(u), h && b.push(h);
      let v = e.compute(B_n(p, t, n, o, y, d, m, u, h), {
        inputs: b,
        outputs: p > 1 ? [-1, 1] : [-1]
      })[0];
      e.compute(O_n(v, d.batchSize, d.numHeads, m, d.sequenceLength, f, u, h), {
        inputs: u && h ? [v, u, h] : [v],
        outputs: []
      });
      let _ = [v, r];
      p > 1 && s && si.size(s.dims) > 0 && _.push(s), u && _.push(u), h && _.push(h), e.compute(F_n(p, v, r, s, d, m, u, h), {
        inputs: _,
        outputs: p > 1 ? [0, 2] : [0]
      });
    }, z_n = (e, t) => {
      let n = [t.batchSize, t.numHeads, t.sequenceLength, t.headSize],
        r = t.sequenceLength,
        a = t.inputHiddenSize,
        i = t.headSize,
        o = 12,
        s = {
          x: Math.ceil(t.headSize / o),
          y: Math.ceil(t.sequenceLength / o),
          z: t.batchSize * t.numHeads
        },
        l = [e.inputs[0], e.inputs[1], e.inputs[2]],
        d = [{
          type: 12,
          data: r
        }, {
          type: 12,
          data: a
        }, {
          type: 12,
          data: i
        }, {
          type: 12,
          data: t.numHeads
        }, {
          type: 12,
          data: t.headSize
        }, {
          type: 12,
          data: t.hiddenSize
        }, {
          type: 12,
          data: t.hiddenSize + t.hiddenSize + t.vHiddenSize
        }],
        u = h => {
          let p = is("output_q", l[0].dataType, n),
            m = is("output_k", l[0].dataType, n),
            f = is("output_v", l[0].dataType, n),
            y = bi("input", l[0].dataType, l[0].dims),
            b = bi("weight", l[1].dataType, l[1].dims),
            v = bi("bias", l[2].dataType, l[2].dims),
            _ = y.type.storage,
            w = [{
              name: "M",
              type: "u32"
            }, {
              name: "K",
              type: "u32"
            }, {
              name: "N",
              type: "u32"
            }, {
              name: "num_heads",
              type: "u32"
            }, {
              name: "head_size",
              type: "u32"
            }, {
              name: "hidden_size",
              type: "u32"
            }, {
              name: "ldb",
              type: "u32"
            }];
          return `
  const TILE_SIZE = ${o}u;
  var<workgroup> tileInput: array<${_}, ${o * o}>;
  var<workgroup> tileWeightQ: array<${_}, ${o * o}>;
  var<workgroup> tileWeightK: array<${_}, ${o * o}>;
  var<workgroup> tileWeightV: array<${_}, ${o * o}>;
  ${h.registerUniforms(w).declareVariables(y, b, v, p, m, f)}
  ${h.mainStart([o, o, 1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${_}(0);
    var valueK = ${_}(0);
    var valueV = ${_}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`;
        };
      return e.compute({
        name: "AttentionPrepare",
        shaderCache: {
          inputDependencies: ["type", "type", "type"]
        },
        getRunData: () => ({
          outputs: [{
            dims: n,
            dataType: e.inputs[0].dataType,
            gpuDataType: 0
          }, {
            dims: n,
            dataType: e.inputs[0].dataType,
            gpuDataType: 0
          }, {
            dims: n,
            dataType: e.inputs[0].dataType,
            gpuDataType: 0
          }],
          dispatchGroup: s,
          programUniforms: d
        }),
        getShaderSource: u
      }, {
        inputs: l,
        outputs: [-1, -1, -1]
      });
    }, jSr = (e, t) => {
      let n = L_n(e.inputs, t),
        [r, a, i] = z_n(e, n);
      return eSe(e, r, a, i, e.inputs[4], void 0, void 0, void 0, e.inputs[5], n);
    };
  }),
  U_n,
  $_n,
  G_n,
  DSr,
  KRo = Wi(() => {
    FT(), ol(), Wl(), wg(), cc(), U_n = (e, t) => {
      if (!e || e.length !== 5) throw new Error("BatchNormalization requires 5 inputs");
      let n = (r, a, i) => {
        let o = a.length;
        if (o !== r.length) throw new Error(`${i}: num dimensions != ${o}`);
        a.forEach((s, l) => {
          if (s !== r[l]) throw new Error(`${i}: dim[${l}] do not match`);
        });
      };
      if (e[0].dims.length > 1) {
        let r = t.format === "NHWC" ? t.spatial ? e[0].dims.slice(-1) : e[0].dims.slice(-1).concat(e[0].dims.slice(1, e[0].dims.length - 1)) : e[0].dims.slice(1, t.spatial ? 2 : void 0);
        n(e[1].dims, r, "Invalid input scale"), n(e[2].dims, r, "Invalid input B"), n(e[3].dims, r, "Invalid input mean"), n(e[4].dims, r, "Invalid input var");
      } else n(e[1].dims, [1], "Invalid input scale"), n(e[2].dims, [1], "Invalid input B"), n(e[3].dims, [1], "Invalid input mean"), n(e[4].dims, [1], "Invalid input var");
    }, $_n = (e, t) => {
      let {
          epsilon: n,
          spatial: r,
          format: a
        } = t,
        i = e[0].dims,
        o = r ? wf(i[i.length - 1]) : 1,
        s = a === "NHWC" && i.length > 1 ? o : 1,
        l = si.size(i) / o,
        d = r,
        u = d ? i.length : i,
        h = bi("x", e[0].dataType, e[0].dims, o),
        p = bi("scale", e[1].dataType, e[1].dims, s),
        m = bi("bias", e[2].dataType, e[2].dims, s),
        f = bi("inputMean", e[3].dataType, e[3].dims, s),
        y = bi("inputVar", e[4].dataType, e[4].dims, s),
        b = is("y", e[0].dataType, u, o),
        v = () => {
          let w = "";
          if (r) w = `let cOffset = ${i.length === 1 ? "0u" : a === "NHWC" ? `outputIndices[${i.length - 1}] / ${o}` : "outputIndices[1]"};`;else if (a === "NCHW") w = `
            ${b.indicesSet("outputIndices", "0", "0")}
            let cOffset = ${b.indicesToOffset("outputIndices")};`;else {
            w = `var cIndices = ${p.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length - 1}];`;
            for (let k = 1; k < p.rank; k++) w += `cIndices[${k}] = outputIndices[${k}];`;
            w += `let cOffset = ${p.indicesToOffset("cIndices")};`;
          }
          return w;
        },
        _ = w => `
  const epsilon = ${n};
  ${w.registerUniform("outputSize", "u32").declareVariables(h, p, m, f, y, b)}
  ${w.mainStart()}
  ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${b.offsetToIndices(`global_idx * ${o}`)};
    ${v()}
    let scale = ${p.getByOffset("cOffset")};
    let bias = ${m.getByOffset("cOffset")};
    let inputMean = ${f.getByOffset("cOffset")};
    let inputVar = ${y.getByOffset("cOffset")};
    let x = ${h.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${b.setByOffset("global_idx", "value")}
  }`;
      return {
        name: "BatchNormalization",
        shaderCache: {
          hint: `${t.epsilon}_${t.format}_${r}_${o}`,
          inputDependencies: d ? ["rank", "type", "type", "type", "type"] : void 0
        },
        getShaderSource: _,
        getRunData: () => ({
          outputs: [{
            dims: e[0].dims,
            dataType: e[0].dataType
          }],
          dispatchGroup: {
            x: Math.ceil(l / 64)
          },
          programUniforms: d ? [{
            type: 12,
            data: l
          }, ...gs(i)] : [{
            type: 12,
            data: l
          }]
        })
      };
    }, G_n = e => lh(e), DSr = (e, t) => {
      let {
          inputs: n,
          outputCount: r
        } = e,
        a = G_n({
          ...t,
          outputCount: r
        });
      if (um.webgpu.validateInputContent && U_n(n, a), t.trainingMode) throw new Error("BatchNormalization trainingMode is not supported yet.");
      e.compute($_n(n, a));
    };
  }),
  V_n,
  H_n,
  LSr,
  QRo = Wi(() => {
    Wl(), cc(), V_n = e => {
      if (e[0].dims.length !== 3) throw new Error("input should have 3 dimensions");
      if (![320, 640, 1280].includes(e[0].dims[2])) throw new Error("number of channels should be 320, 640 or 1280");
      if (e[1].dims.length !== 1) throw new Error("bias is expected to have 1 dimensions");
      if (e[0].dims[2] !== e[1].dims[0]) throw new Error("last dimension of input and bias are not the same");
    }, H_n = e => {
      let t = e[0].dims,
        n = e[0].dims[2],
        r = si.size(t) / 4,
        a = e[0].dataType,
        i = bi("input", a, t, 4),
        o = bi("bias", a, [n], 4),
        s = bi("residual", a, t, 4),
        l = is("output", a, t, 4);
      return {
        name: "BiasAdd",
        getRunData: () => ({
          outputs: [{
            dims: t,
            dataType: e[0].dataType
          }],
          dispatchGroup: {
            x: Math.ceil(r / 64)
          }
        }),
        getShaderSource: d => `
  const channels = ${n}u / 4;
  ${d.declareVariables(i, o, s, l)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(r)}
    let value = ${i.getByOffset("global_idx")}
      + ${o.getByOffset("global_idx % channels")} + ${s.getByOffset("global_idx")};
    ${l.setByOffset("global_idx", "value")}
  }`
      };
    }, LSr = e => {
      V_n(e.inputs), e.compute(H_n(e.inputs));
    };
  }),
  W_n,
  tu,
  OSr,
  BSr,
  FSr,
  zSr,
  USr,
  $Sr,
  GSr,
  VSr,
  HSr,
  q_n,
  WSr,
  qSr,
  KSr,
  QSr,
  hbe,
  YSr,
  RDe,
  XSr,
  JSr,
  ZSr,
  e3r,
  t3r,
  n3r,
  r3r,
  a3r,
  i3r,
  o3r,
  s3r,
  l3r,
  c3r,
  d3r,
  u3r,
  h3r,
  nht,
  p3r,
  x4t,
  _4t,
  m3r,
  f3r,
  g3r,
  K_n,
  Q_n,
  y3r,
  tVt = Wi(() => {
    ol(), Wl(), wg(), cc(), W_n = (e, t, n, r, a, i, o) => {
      let s = Math.ceil(t / 4),
        l = "";
      typeof a == "string" ? l = `${a}(a)` : l = a("a");
      let d = bi("inputData", n, [s], 4),
        u = is("outputData", r, [s], 4),
        h = [{
          name: "vec_size",
          type: "u32"
        }];
      return o && h.push(...o), `
      ${e.registerUniforms(h).declareVariables(d, u)}

  ${i ?? ""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${d.getByOffset("global_idx")};
    ${u.setByOffset("global_idx", l)}
  }`;
    }, tu = (e, t, n, r, a, i = e.dataType, o, s) => {
      let l = [{
        type: 12,
        data: Math.ceil(si.size(e.dims) / 4)
      }];
      return o && l.push(...o), {
        name: t,
        shaderCache: {
          hint: a,
          inputDependencies: ["type"]
        },
        getShaderSource: d => W_n(d, si.size(e.dims), e.dataType, i, n, r, s),
        getRunData: d => ({
          outputs: [{
            dims: e.dims,
            dataType: i
          }],
          dispatchGroup: {
            x: Math.ceil(si.size(d[0].dims) / 64 / 4)
          },
          programUniforms: l
        })
      };
    }, OSr = e => {
      e.compute(tu(e.inputs[0], "Abs", "abs"));
    }, BSr = e => {
      e.compute(tu(e.inputs[0], "Acos", "acos"));
    }, FSr = e => {
      e.compute(tu(e.inputs[0], "Acosh", "acosh"));
    }, zSr = e => {
      e.compute(tu(e.inputs[0], "Asin", "asin"));
    }, USr = e => {
      e.compute(tu(e.inputs[0], "Asinh", "asinh"));
    }, $Sr = e => {
      e.compute(tu(e.inputs[0], "Atan", "atan"));
    }, GSr = e => {
      e.compute(tu(e.inputs[0], "Atanh", "atanh"));
    }, VSr = e => lh(e), HSr = (e, t) => {
      let n;
      switch (t.to) {
        case 10:
          n = "vec4<f16>";
          break;
        case 1:
          n = "vec4<f32>";
          break;
        case 12:
          n = "vec4<u32>";
          break;
        case 6:
          n = "vec4<i32>";
          break;
        case 9:
          n = "vec4<bool>";
          break;
        default:
          throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`);
      }
      e.compute(tu(e.inputs[0], "Cast", n, void 0, t.cacheKey, t.to));
    }, q_n = e => {
      let t,
        n,
        r = e.length >= 2 && e[1].data !== 0,
        a = e.length >= 3 && e[2].data !== 0;
      switch (e[0].dataType) {
        case 1:
          t = r ? e[1].getFloat32Array()[0] : -34028234663852886e22, n = a ? e[2].getFloat32Array()[0] : 34028234663852886e22;
          break;
        case 10:
          t = r ? e[1].getUint16Array()[0] : 64511, n = a ? e[2].getUint16Array()[0] : 31743;
          break;
        default:
          throw new Error("Unsupport data type");
      }
      return lh({
        min: t,
        max: n
      });
    }, WSr = (e, t) => {
      let n = t || q_n(e.inputs),
        r = Ww(e.inputs[0].dataType);
      e.compute(tu(e.inputs[0], "Clip", a => `clamp(${a}, vec4<${r}>(uniforms.min), vec4<${r}>(uniforms.max))`, void 0, n.cacheKey, void 0, [{
        type: e.inputs[0].dataType,
        data: n.min
      }, {
        type: e.inputs[0].dataType,
        data: n.max
      }], [{
        name: "min",
        type: r
      }, {
        name: "max",
        type: r
      }]), {
        inputs: [0]
      });
    }, qSr = e => {
      e.compute(tu(e.inputs[0], "Ceil", "ceil"));
    }, KSr = e => {
      e.compute(tu(e.inputs[0], "Cos", "cos"));
    }, QSr = e => {
      e.compute(tu(e.inputs[0], "Cosh", "cosh"));
    }, hbe = e => lh(e), YSr = (e, t) => {
      let n = Ww(e.inputs[0].dataType);
      e.compute(tu(e.inputs[0], "Elu", r => `elu_vf32(${r})`, `
  const elu_alpha_ = ${n}(${t.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`, t.cacheKey));
    }, RDe = (e = "f32") => `
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`, XSr = e => {
      let t = Ww(e.inputs[0].dataType);
      e.compute(tu(e.inputs[0], "Erf", n => `erf_vf32(${n})`, RDe(t)));
    }, JSr = e => {
      e.compute(tu(e.inputs[0], "Exp", "exp"));
    }, ZSr = e => {
      e.compute(tu(e.inputs[0], "Floor", "floor"));
    }, e3r = e => {
      let t = Ww(e.inputs[0].dataType);
      e.compute(tu(e.inputs[0], "Gelu", n => `0.5 * ${n} * (1.0 + erf_vf32(${n} * 0.7071067811865475))`, RDe(t)));
    }, t3r = (e, t) => {
      let n = Ww(e.inputs[0].dataType);
      e.compute(tu(e.inputs[0], "LeakyRelu", r => `select(leaky_relu_alpha_ * ${r}, ${r}, ${r} >= vec4<${n}>(0.0))`, `const leaky_relu_alpha_ = ${n}(${t.alpha});`, t.cacheKey));
    }, n3r = e => {
      e.compute(tu(e.inputs[0], "Not", t => `!${t}`));
    }, r3r = e => {
      e.compute(tu(e.inputs[0], "Neg", t => `-${t}`));
    }, a3r = e => {
      e.compute(tu(e.inputs[0], "Reciprocal", t => `1.0/${t}`));
    }, i3r = e => {
      let t = Ww(e.inputs[0].dataType);
      e.compute(tu(e.inputs[0], "Relu", n => `select(vec4<${t}>(0.0), ${n}, ${n} > vec4<${t}>(0.0))`));
    }, o3r = e => {
      e.compute(tu(e.inputs[0], "Sigmoid", t => `(1.0 / (1.0 + exp(-${t})))`));
    }, s3r = e => lh(e), l3r = (e, t) => {
      let n = Ww(e.inputs[0].dataType);
      e.compute(tu(e.inputs[0], "HardSigmoid", r => `max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${t.alpha} * ${r} + vec4<${n}>(${t.beta})))`, void 0, t.cacheKey));
    }, c3r = e => {
      e.compute(tu(e.inputs[0], "Sin", "sin"));
    }, d3r = e => {
      e.compute(tu(e.inputs[0], "Sinh", "sinh"));
    }, u3r = e => {
      e.compute(tu(e.inputs[0], "Sqrt", "sqrt"));
    }, h3r = e => {
      e.compute(tu(e.inputs[0], "Tan", "tan"));
    }, nht = e => `sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`, p3r = e => {
      e.compute(tu(e.inputs[0], "Tanh", nht));
    }, x4t = (e = "f32") => `
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${nht("v")};
}
`, _4t = e => `(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`, m3r = e => {
      let t = Ww(e.inputs[0].dataType);
      e.compute(tu(e.inputs[0], "FastGelu", _4t, x4t(t), void 0, e.inputs[0].dataType));
    }, f3r = (e, t) => {
      let n = Ww(e.inputs[0].dataType);
      return e.compute(tu(e.inputs[0], "ThresholdedRelu", r => `select(vec4<${n}>(0.0), ${r}, ${r} > thresholded_relu_alpha_)`, `const thresholded_relu_alpha_ = vec4<${n}>(${t.alpha});`, t.cacheKey)), 0;
    }, g3r = e => {
      e.compute(tu(e.inputs[0], "Log", "log"));
    }, K_n = (e, t) => `
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`, Q_n = e => `quick_gelu_impl(${e})`, y3r = (e, t) => {
      let n = Ww(e.inputs[0].dataType);
      e.compute(tu(e.inputs[0], "QuickGelu", Q_n, K_n(n, t.alpha), t.cacheKey, e.inputs[0].dataType));
    };
  }),
  Y_n,
  X_n,
  b3r,
  YRo = Wi(() => {
    Wl(), cc(), tVt(), Y_n = e => {
      if (e[0].dims.length !== 3) throw new Error("input should have 3 dimensions");
      if (![2560, 5120, 10240].includes(e[0].dims[2])) throw new Error("hidden state should be 2560, 5120 or 10240");
      if (e[1].dims.length !== 1) throw new Error("bias is expected to have 1 dimensions");
      if (e[0].dims[2] !== e[1].dims[0]) throw new Error("last dimension of input and bias are not the same");
    }, X_n = e => {
      let t = e[0].dims.slice();
      t[2] = t[2] / 2;
      let n = bi("input", e[0].dataType, e[0].dims, 4),
        r = bi("bias", e[0].dataType, [e[0].dims[2]], 4),
        a = is("output", e[0].dataType, t, 4),
        i = si.size(t) / 4,
        o = Rb(e[0].dataType);
      return {
        name: "BiasSplitGelu",
        getRunData: () => ({
          outputs: [{
            dims: t,
            dataType: e[0].dataType
          }],
          dispatchGroup: {
            x: Math.ceil(i / 64)
          }
        }),
        getShaderSource: s => `
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2] / 4 / 2}u;

  ${s.declareVariables(n, r, a)}

  ${RDe(o)}

  ${s.mainStart()}
    ${s.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${a.setByOffset("global_idx", "valueLeft * geluRight")}
  }`
      };
    }, b3r = e => {
      Y_n(e.inputs), e.compute(X_n(e.inputs));
    };
  }),
  J_n,
  Z_n,
  aC,
  v3r,
  w3r,
  x3r,
  _3r,
  k3r,
  A3r,
  S3r,
  I3r,
  C3r,
  E3r,
  XRo = Wi(() => {
    ol(), Wl(), cc(), J_n = (e, t, n, r, a, i, o, s, l, d, u, h) => {
      let p, m;
      typeof s == "string" ? p = m = (_, w) => `${s}((${_}),(${w}))` : typeof s == "function" ? p = m = s : (p = s.scalar, m = s.vector);
      let f = is("outputData", u, r.length, 4),
        y = bi("aData", l, t.length, 4),
        b = bi("bData", d, n.length, 4),
        v;
      if (a) {
        if (i) {
          let _ = si.size(t) === 1,
            w = si.size(n) === 1,
            k = t.length > 0 && t[t.length - 1] % 4 === 0,
            A = n.length > 0 && n[n.length - 1] % 4 === 0;
          _ || w ? v = f.setByOffset("global_idx", m(_ ? `${y.type.value}(${y.getByOffset("0")}.x)` : y.getByOffset("global_idx"), w ? `${b.type.value}(${b.getByOffset("0")}.x)` : b.getByOffset("global_idx"))) : v = `
            let outputIndices = ${f.offsetToIndices("global_idx * 4u")};
            let offsetA = ${y.broadcastedIndicesToOffset("outputIndices", f)};
            let offsetB = ${b.broadcastedIndicesToOffset("outputIndices", f)};
            ${f.setByOffset("global_idx", m(o || k ? y.getByOffset("offsetA / 4u") : `${y.type.value}(${y.getByOffset("offsetA / 4u")}[offsetA % 4u])`, o || A ? b.getByOffset("offsetB / 4u") : `${b.type.value}(${b.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `;
        } else v = f.setByOffset("global_idx", m(y.getByOffset("global_idx"), b.getByOffset("global_idx")));
      } else {
        if (!i) throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");
        let _ = (w, k, A = "") => {
          let S = `aData[indexA${k}][componentA${k}]`,
            C = `bData[indexB${k}][componentB${k}]`;
          return `
            let outputIndices${k} = ${f.offsetToIndices(`global_idx * 4u + ${k}u`)};
            let offsetA${k} = ${y.broadcastedIndicesToOffset(`outputIndices${k}`, f)};
            let offsetB${k} = ${b.broadcastedIndicesToOffset(`outputIndices${k}`, f)};
            let indexA${k} = offsetA${k} / 4u;
            let indexB${k} = offsetB${k} / 4u;
            let componentA${k} = offsetA${k} % 4u;
            let componentB${k} = offsetB${k} % 4u;
            ${w}[${k}] = ${A}(${p(S, C)});
          `;
        };
        u === 9 ? v = `
            var data = vec4<u32>(0);
            ${_("data", 0, "u32")}
            ${_("data", 1, "u32")}
            ${_("data", 2, "u32")}
            ${_("data", 3, "u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));` : v = `
            ${_("outputData[global_idx]", 0)}
            ${_("outputData[global_idx]", 1)}
            ${_("outputData[global_idx]", 2)}
            ${_("outputData[global_idx]", 3)}
          `;
      }
      return `
        ${e.registerUniform("vec_size", "u32").declareVariables(y, b, f)}

        ${h ?? ""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${v}
      }`;
    }, Z_n = (e, t, n, r, a, i, o = n.dataType) => {
      let s = n.dims.map(y => Number(y) ?? 1),
        l = r.dims.map(y => Number(y) ?? 1),
        d = !si.areEqual(s, l),
        u = s,
        h = si.size(s),
        p = !1,
        m = !1,
        f = [d];
      if (d) {
        let y = vue.calcShape(s, l, !1);
        if (!y) throw new Error("Can't perform binary op on the given tensors");
        u = y.slice(), h = si.size(u);
        let b = si.size(s) === 1,
          v = si.size(l) === 1,
          _ = s.length > 0 && s[s.length - 1] % 4 === 0,
          w = l.length > 0 && l[l.length - 1] % 4 === 0;
        f.push(b), f.push(v), f.push(_), f.push(w);
        let k = 1;
        for (let A = 1; A < u.length; A++) {
          let S = s[s.length - A],
            C = l[l.length - A];
          if (S === C) k *= S;else break;
        }
        k % 4 === 0 ? (m = !0, p = !0) : (b || v || _ || w) && (p = !0);
      } else p = !0;
      return f.push(p), {
        name: e,
        shaderCache: {
          hint: t + f.map(y => y.toString()).join("_"),
          inputDependencies: ["rank", "rank"]
        },
        getShaderSource: y => J_n(y, s, l, u, p, d, m, a, n.dataType, r.dataType, o, i),
        getRunData: () => ({
          outputs: [{
            dims: u,
            dataType: o
          }],
          dispatchGroup: {
            x: Math.ceil(h / 64 / 4)
          },
          programUniforms: [{
            type: 12,
            data: Math.ceil(si.size(u) / 4)
          }, ...gs(s, l, u)]
        })
      };
    }, aC = (e, t, n, r, a, i) => {
      e.compute(Z_n(t, a ?? "", e.inputs[0], e.inputs[1], n, r, i));
    }, v3r = e => {
      aC(e, "Add", (t, n) => `${t}+${n}`);
    }, w3r = e => {
      aC(e, "Div", (t, n) => `${t}/${n}`);
    }, x3r = e => {
      aC(e, "Equal", {
        scalar: (t, n) => `u32(${t}==${n})`,
        vector: (t, n) => `vec4<u32>(${t}==${n})`
      }, void 0, void 0, 9);
    }, _3r = e => {
      aC(e, "Mul", (t, n) => `${t}*${n}`);
    }, k3r = e => {
      let t = bi("input", e.inputs[0].dataType, e.inputs[0].dims).type.value;
      aC(e, "Pow", {
        scalar: (n, r) => `pow_custom(${n},${r})`,
        vector: (n, r) => `pow_vector_custom(${n},${r})`
      }, `
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t === "i32" ? "round" : ""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `);
    }, A3r = e => {
      aC(e, "Sub", (t, n) => `${t}-${n}`);
    }, S3r = e => {
      aC(e, "Greater", {
        scalar: (t, n) => `u32(${t}>${n})`,
        vector: (t, n) => `vec4<u32>(${t}>${n})`
      }, void 0, void 0, 9);
    }, I3r = e => {
      aC(e, "Less", {
        scalar: (t, n) => `u32(${t}<${n})`,
        vector: (t, n) => `vec4<u32>(${t}<${n})`
      }, void 0, void 0, 9);
    }, C3r = e => {
      aC(e, "GreaterOrEqual", {
        scalar: (t, n) => `u32(${t}>=${n})`,
        vector: (t, n) => `vec4<u32>(${t}>=${n})`
      }, void 0, void 0, 9);
    }, E3r = e => {
      aC(e, "LessOrEqual", {
        scalar: (t, n) => `u32(${t}<=${n})`,
        vector: (t, n) => `vec4<u32>(${t}<=${n})`
      }, void 0, void 0, 9);
    };
  }),
  ekn,
  tkn,
  nkn,
  rkn,
  T3r,
  M3r,
  JRo = Wi(() => {
    ol(), Wl(), wg(), cc(), ekn = (e, t) => {
      if (!e || e.length < 1) throw new Error("too few inputs");
      let n = 0,
        r = e[n],
        a = r.dataType,
        i = r.dims.length;
      e.forEach((o, s) => {
        if (s !== n) {
          if (o.dataType !== a) throw new Error("input tensors should be one type");
          if (o.dims.length !== i) throw new Error("input tensors should have the same shape");
          o.dims.forEach((l, d) => {
            if (d !== t && l !== r.dims[d]) throw new Error("non concat dimensions must match");
          });
        }
      });
    }, tkn = (e, t) => `
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`, nkn = (e, t) => {
      let n = e.length,
        r = [];
      for (let a = 0; a < n; ++a) {
        let i = t.setByOffset("global_idx", e[a].getByIndices("indices"));
        n === 1 ? r.push(i) : a === 0 ? r.push(`if (inputIndex == ${a}u) { ${i} }`) : a === n - 1 ? r.push(`else { ${i} }`) : r.push(`else if (inputIndex == ${a}) { ${i} }`);
      }
      return r.join(`
`);
    }, rkn = (e, t, n, r) => {
      let a = si.size(n),
        i = new Array(e.length),
        o = new Array(e.length),
        s = 0,
        l = [],
        d = [],
        u = [{
          type: 12,
          data: a
        }];
      for (let y = 0; y < e.length; ++y) s += e[y].dims[t], i[y] = s, d.push(e[y].dims.length), o[y] = bi(`input${y}`, r, d[y]), l.push("rank"), u.push({
        type: 12,
        data: i[y]
      });
      for (let y = 0; y < e.length; ++y) u.push(...gs(e[y].dims));
      u.push(...gs(n));
      let h = is("output", r, n.length),
        p = h.indicesGet("indices", t),
        m = Array.from(Array(i.length).keys()).map(y => `uniforms.sizeInConcatAxis${y}`).join(","),
        f = y => `

  ${(() => {
          y.registerUniform("outputSize", "u32");
          for (let b = 0; b < e.length; b++) y.registerUniform(`sizeInConcatAxis${b}`, "u32");
          return y.declareVariables(...o, h);
        })()}

  ${tkn(i.length, m)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${h.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${p});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${m});
      ${p} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${nkn(o, h)}
  }`;
      return {
        name: "Concat",
        shaderCache: {
          hint: `${t}`,
          inputDependencies: l
        },
        getRunData: () => ({
          outputs: [{
            dims: n,
            dataType: r
          }],
          dispatchGroup: {
            x: Math.ceil(a / 64)
          },
          programUniforms: u
        }),
        getShaderSource: f
      };
    }, T3r = (e, t) => {
      let n = e.inputs,
        r = n[0].dims,
        a = si.normalizeAxis(t.axis, r.length);
      ekn(n, a);
      let i = r.slice();
      i[a] = n.reduce((s, l) => s + (l.dims.length > a ? l.dims[a] : 0), 0);
      let o = n.filter(s => si.size(s.dims) > 0);
      e.compute(rkn(o, a, i, n[0].dataType), {
        inputs: o
      });
    }, M3r = e => lh({
      axis: e.axis
    });
  }),
  qJ,
  KJ,
  QJ,
  nVt,
  oee = Wi(() => {
    ol(), Wl(), qJ = (e, t, n = "f32") => {
      switch (e.activation) {
        case "Relu":
          return `value = max(value, ${t}(0.0));`;
        case "Sigmoid":
          return `value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;
        case "Clip":
          return `value = clamp(value, ${t}(${n}(uniforms.clip_min)), ${t}(${n}(uniforms.clip_max)));`;
        case "HardSigmoid":
          return `value = max(${t}(0.0), min(${t}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;
        case "LeakyRelu":
          return `value = select(${n}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;
        case "Tanh":
          return `let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;
        case "":
          return "";
        default:
          throw new Error(`Unsupported activation ${e.activation}`);
      }
    }, KJ = (e, t) => {
      e.activation === "Clip" ? t.push({
        type: 1,
        data: e.clipMax
      }, {
        type: 1,
        data: e.clipMin
      }) : e.activation === "HardSigmoid" ? t.push({
        type: 1,
        data: e.alpha
      }, {
        type: 1,
        data: e.beta
      }) : e.activation === "LeakyRelu" && t.push({
        type: 1,
        data: e.alpha
      });
    }, QJ = (e, t) => {
      e.activation === "Clip" ? t.push({
        name: "clip_max",
        type: "f32"
      }, {
        name: "clip_min",
        type: "f32"
      }) : e.activation === "HardSigmoid" ? t.push({
        name: "alpha",
        type: "f32"
      }, {
        name: "beta",
        type: "f32"
      }) : e.activation === "LeakyRelu" && t.push({
        name: "alpha",
        type: "f32"
      });
    }, nVt = e => {
      let t = (e == null ? void 0 : e.activation) || "";
      if (t === "HardSigmoid") {
        let [n, r] = (e == null ? void 0 : e.activation_params) || [.2, .5];
        return {
          activation: t,
          alpha: n,
          beta: r
        };
      } else if (t === "Clip") {
        let [n, r] = (e == null ? void 0 : e.activation_params) || [oSr, sSr];
        return {
          activation: t,
          clipMax: r,
          clipMin: n
        };
      } else if (t === "LeakyRelu") {
        let [n] = (e == null ? void 0 : e.activation_params) || [.01];
        return {
          activation: t,
          alpha: n
        };
      }
      return {
        activation: t
      };
    };
  }),
  bv,
  P3r,
  rVt = Wi(() => {
    bv = (e, t) => {
      switch (e) {
        case 1:
          return t;
        case 2:
          return `vec2<${t}>`;
        case 3:
          return `vec3<${t}>`;
        case 4:
          return `vec4<${t}>`;
        default:
          throw new Error(`${e}-component is not supported.`);
      }
    }, P3r = e => `
      ${e ? "value = value + getBiasByOutputCoords(coords);" : ""}
      `;
  }),
  R3r,
  ZRo = Wi(() => {
    R3r = e => `
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`;
  }),
  Swe,
  aVt,
  iVt = Wi(() => {
    ol(), Wl(), cc(), oee(), Swe = (e, t, n, r, a) => {
      let i = r - n;
      return `
      ${Array.from({
        length: n
      }).map((o, s) => `
      if (${ds(t.shape, s, t.rank)} != 1) {
        ${t.indicesSet(e, s, ds(a, s + i, r))}
      } else {
        ${t.indicesSet(e, s, 0)}
      }`).join("")}
`;
    }, aVt = (e, t, n, r, a = !1, i) => {
      let o = e[0].dims,
        s = e[1].dims,
        l = o[o.length - 2],
        d = s[s.length - 1],
        u = o[o.length - 1],
        h = wf(d),
        p = wf(u),
        m = wf(l),
        f = si.size(n) / h / m,
        y = e.length > 2,
        b = r ? r.slice(0, -2) : n.slice(0, -2),
        v = [si.size(b), l, d],
        _ = [{
          type: 12,
          data: f
        }, {
          type: 12,
          data: l
        }, {
          type: 12,
          data: d
        }, {
          type: 12,
          data: u
        }];
      KJ(t, _), _.push(...gs(b, o, s)), y && _.push(...gs(e[2].dims)), _.push(...gs(v));
      let w = k => {
        let A = JGt("batch_dims", e[0].dataType, b.length),
          S = bi("a", e[0].dataType, o.length, p),
          C = bi("b", e[1].dataType, s.length, h),
          I = is("output", e[0].dataType, v.length, h),
          E = Rb(I.type.tensor),
          M = qJ(t, I.type.value, E),
          T = [S, C],
          P = "";
        if (y) {
          let B = a ? h : 1;
          T.push(bi("bias", e[2].dataType, e[2].dims.length, B)), P = `${a ? `value += bias[col / ${B}];` : `value += ${I.type.value}(bias[row + i]);`}`;
        }
        let R = [{
          name: "output_size",
          type: "u32"
        }, {
          name: "M",
          type: "u32"
        }, {
          name: "N",
          type: "u32"
        }, {
          name: "K",
          type: "u32"
        }];
        QJ(t, R);
        let j = () => {
          let B = `var a_data: ${S.type.value};`;
          for (let F = 0; F < p; F++) B += `
              let b_data${F} = b[(b_offset + (k + ${F}) * uniforms.N + col) / ${h}];`;
          for (let F = 0; F < m; F++) {
            B += `a_data = a[(a_offset + (row + ${F}) * uniforms.K + k) / ${p}];`;
            for (let N = 0; N < p; N++) B += `
            values[${F}] = fma(${C.type.value}(a_data${p === 1 ? "" : `[${N}]`}), b_data${N}, values[${F}]);
`;
          }
          return B;
        };
        return `
  ${k.registerUniforms(R).registerInternalVariables(A).declareVariables(...T, I)}
  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${h})) * ${h};
    var index1 = global_idx / (uniforms.N / ${h});
    let stride1 = uniforms.M / ${m};
    let row = (index1 % stride1) * ${m};
    let batch = index1 / stride1;

    ${n.length === 2 ? "" : `let batch_indices = ${A.offsetToIndices("batch")};`}

    var a_indices: ${S.type.indices};
    ${Swe("a_indices", S, S.rank - 2, A.rank, "batch_indices")}
    ${S.indicesSet("a_indices", S.rank - 2, 0)}
    ${S.indicesSet("a_indices", S.rank - 1, 0)}
    let a_offset = ${S.indicesToOffset("a_indices")};

    var b_indices: ${C.type.indices};
    ${Swe("b_indices", C, C.rank - 2, A.rank, "batch_indices")}
    ${C.indicesSet("b_indices", C.rank - 2, 0)}
    ${C.indicesSet("b_indices", C.rank - 1, 0)}
    let b_offset = ${C.indicesToOffset("b_indices")};
    var values: array<${I.type.value}, ${m}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${p}) {
      ${j()}
    }
    for (var i = 0u; i < ${m}u; i++) {
      var value = values[i];
      ${P}
      ${M}
      let cur_indices = ${I.type.indices}(batch, row + i, col);
      let offset = ${I.indicesToOffset("cur_indices")};
      ${I.setByOffset(`offset / ${h}`, "value")};
    }
  }
  `;
      };
      return {
        name: "MatMulNaive",
        shaderCache: {
          hint: `${t.activation};${h};${p};${m};${a}`,
          inputDependencies: y ? ["rank", "rank", "rank"] : ["rank", "rank"]
        },
        getRunData: () => ({
          outputs: [{
            dims: i ? i(n) : n,
            dataType: e[0].dataType
          }],
          dispatchGroup: {
            x: Math.ceil(f / 64)
          },
          programUniforms: _
        }),
        getShaderSource: w
      };
    };
  }),
  akn,
  ikn,
  k4t,
  rht,
  okn,
  A4t,
  skn,
  MGe,
  oVt = Wi(() => {
    ol(), Wl(), cc(), oee(), iVt(), rVt(), akn = (e, t) => e ? `
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t ? ", batchIndices" : ""});
        ` : `
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t ? ", batchIndices" : ""});
        `, ikn = (e, t) => e ? `
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t === 3 ? "" : "let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t === 3 ? "" : "acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }` : `
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t === 3 ? "" : "acc[i] = BCached3 * ACached.w + acc[i];"}
        }`, k4t = (e, t, n = "f32", r, a = !1, i = 32, o = !1, s = 32) => {
      let l = t[1] * e[1],
        d = t[0] * e[0],
        u = a ? l : i,
        h = a ? i : l,
        p = u / t[0],
        m = i / t[1];
      if (!((a && p === 4 && e[1] === 4 || !a && (p === 3 || p === 4)) && u % t[0] === 0 && i % t[1] === 0 && e[0] === 4)) throw new Error(`If transposeA ${a} is true, innerElementSize ${p} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${p} must be 3 or 4.
  tileAWidth ${u} must be divisible by workgroupSize[0]${t[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);
      return `
var<workgroup> mm_Asub: array<array<vec${p}<${n}>, ${u / p}>, ${h}>;
var<workgroup> mm_Bsub: array<array<vec4<${n}>, ${d / e[0]}>, ${i}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${p};
const tileInner = ${i};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${o ? "0" : "i32(globalId.z)"};
  ${r ? `let batchIndices = ${r.offsetToIndices("u32(batch)")};` : ""}
  let globalRowStart = i32(workgroupId.y) * ${l};

  let num_tiles = ${o ? `${Math.ceil(s / i)}` : "(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${o ? `i32(globalId.z) * ${s}` : "0"};

  var acc: array<vec4<${n}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${m};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${akn(a, r)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${m}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${r ? ", batchIndices" : ""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${p === 3 ? "" : "let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${ikn(a, p)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`;
    }, rht = (e, t) => e ? `
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t ? ", batchIndices" : ""});
            ` : `
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t ? ", batchIndices" : ""});
            `, okn = e => e ? "let ACached = mm_Asub[k][tileRow + innerRow];" : "let ACached = mm_Asub[tileRow + innerRow][k];", A4t = (e, t, n = "f32", r, a = !1, i = 32, o = !1, s = 32, l = !1) => {
      let d = e[1] * t[1],
        u = e[0] * t[0],
        h = a ? d : i,
        p = a ? i : d;
      if (!(p % t[1] === 0 && h % t[0] === 0 && i % t[1] === 0)) throw new Error(`tileAHight ${p} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${h} must be divisible by workgroupSize[0]${t[0]}, tileInner ${i} must be divisible by workgroupSize[1]${t[1]}`);
      let m = p / t[1],
        f = h / t[0],
        y = i / t[1],
        b = l ? `
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${d};
    let globalColStart = i32(workgroupId.x) * ${u};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${p}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${h}; inputCol = inputCol + ${t[0]}) {
          ${rht(a, r)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${u}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${r ? ", batchIndices" : ""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${n}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${a ? `mm_Asub[k][localRow + innerRow * ${t[1]}];` : `mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    ` : `
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${d};

let tileRowA = i32(localId.y) * ${m};
let tileColA = i32(localId.x) * ${f};
let tileRowB = i32(localId.y) * ${y};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${m}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${f}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${rht(a, r)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${r ? ", batchIndices" : ""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${n}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${okn(a)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;
      return `
  var<workgroup> mm_Asub : array<array<${n}, ${h}>, ${p}>;
  var<workgroup> mm_Bsub : array<array<${n}, ${u}>, ${i}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${i};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${o ? "0" : "i32(globalId.z)"};
    ${r ? `let batchIndices = ${r.offsetToIndices("u32(batch)")};` : ""}
    let num_tiles = ${o ? `${Math.ceil(s / i)}` : "(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${o ? `i32(globalId.z) * ${s}` : "0"};

    var acc : array<array<${n}, colPerThread>, rowPerThread>;
    ${b}
  }
`;
    }, skn = (e, t, n, r, a = !1) => {
      let [i, o, s, l] = r,
        d = Rb(r[0].type.tensor);
      return `
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${bv(e, d)} {
      var value = ${bv(e, d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${o.type.indices};
        ${Swe("aIndices", o, o.rank - 2, i.rank, "batchIndices")}
        ${o.indicesSet("aIndices", o.rank - 2, "u32(row)")}
        ${o.indicesSet("aIndices", o.rank - 1, "u32(colIn)")}
        value = ${o.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${bv(e, d)} {
      var value = ${bv(e, d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${s.type.indices};
        ${Swe("bIndices", s, s.rank - 2, i.rank, "batchIndices")}
        ${s.indicesSet("bIndices", s.rank - 2, "u32(row)")}
        ${s.indicesSet("bIndices", s.rank - 1, "u32(colIn)")}
        value = ${s.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${bv(e, d)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t ? `value = value + ${a ? "bias[colIn]" : `${bv(e, d)}(bias[row])`};` : ""}
        ${n}
        ${l.setByIndices("vec3<u32>(coords)", "value")}
      }
    }
    `;
    }, MGe = (e, t, n, r, a = !1, i) => {
      let o = e[0].dims,
        s = e[1].dims,
        l = o.slice(0, -2),
        d = s.slice(0, -2),
        u = r ? r.slice(0, -2) : n.slice(0, -2),
        h = si.size(u),
        p = o[o.length - 2],
        m = o[o.length - 1],
        f = s[s.length - 1],
        y = m % 4 === 0 && f % 4 === 0,
        b = p <= 8 ? [4, 1, 1] : [4, 4, 1],
        v = [8, 8, 1],
        _ = [Math.ceil(f / v[0] / b[0]), Math.ceil(p / v[1] / b[1]), Math.ceil(h / v[2] / b[2])],
        w = y ? 4 : 1,
        k = [...l, p, m / w],
        A = k.length,
        S = [...d, m, f / w],
        C = S.length,
        I = [h, p, f / w],
        E = [{
          type: 6,
          data: p
        }, {
          type: 6,
          data: f
        }, {
          type: 6,
          data: m
        }];
      KJ(t, E), E.push(...gs(u, k, S));
      let M = ["rank", "rank"],
        T = e.length > 2;
      T && (E.push(...gs(e[2].dims)), M.push("rank")), E.push(...gs(I));
      let P = R => {
        let j = u.length,
          B = JGt("batchDims", e[0].dataType, j, 1),
          F = Rb(e[0].dataType),
          N = bi("a", e[0].dataType, A, w),
          G = bi("b", e[1].dataType, C, w),
          z = is("result", e[0].dataType, I.length, w),
          V = [N, G];
        if (T) {
          let H = a ? w : 1;
          V.push(bi("bias", e[2].dataType, e[2].dims.length, H));
        }
        let O = [{
          name: "dim_a_outer",
          type: "i32"
        }, {
          name: "dim_b_outer",
          type: "i32"
        }, {
          name: "dim_inner",
          type: "i32"
        }];
        QJ(t, O);
        let L = Rb(z.type.tensor),
          D = qJ(t, z.type.value, L),
          U = skn(w, T, D, [B, N, G, z], a);
        return `
  ${R.registerUniforms(O).registerInternalVariables(B).declareVariables(...V, z)}
  ${U}
  ${y ? k4t(b, v, F, B) : A4t(b, v, F, B)}
                   `;
      };
      return {
        name: "MatMul",
        shaderCache: {
          hint: `${b};${t.activation};${y};${a}`,
          inputDependencies: M
        },
        getRunData: () => ({
          outputs: [{
            dims: i ? i(n) : n,
            dataType: e[0].dataType
          }],
          dispatchGroup: {
            x: _[0],
            y: _[1],
            z: _[2]
          },
          programUniforms: E
        }),
        getShaderSource: P
      };
    };
  }),
  lkn,
  N3r,
  eNo = Wi(() => {
    ol(), QD(), cc(), oee(), rVt(), ZRo(), oVt(), lkn = (e, t, n, r, a = !1, i, o = 4, s = 4, l = 4, d = "f32") => {
      let u = E => {
          switch (E) {
            case 1:
              return "resData = x[xIndex];";
            case 3:
              return `resData = vec3<${d}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;
            case 4:
              return "resData = x[xIndex / 4];";
            default:
              throw new Error(`innerElementSize ${E} is not supported.`);
          }
        },
        h = E => {
          switch (E) {
            case 1:
              return "return w[row * i32(uniforms.w_shape[3]) + colIn];";
            case 4:
              return "return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";
            default:
              throw new Error(`innerElementSize ${E} is not supported.`);
          }
        },
        p = e ? `
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    ` : `
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,
        m = e ? `
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    ` : `
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,
        f = e ? "i32(uniforms.x_shape[1])" : "i32(uniforms.x_shape[2])",
        y = e ? "i32(uniforms.x_shape[2])" : "i32(uniforms.x_shape[3])",
        b = e ? "row" : "col",
        v = e ? "col" : "row",
        _ = `
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e ? "i32(uniforms.result_shape[2])" : "i32(uniforms.result_shape[3])"};
    let outRow = ${b} / outWidth;
    let outCol = ${b} % outWidth;

    let WRow = ${v} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${v} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${v} % inChannels;
    var resData = ${bv(o, d)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${f} && xCol >= 0 && xCol < ${y}) {
      ${p}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${u(o)}
    }
    return resData;`,
        w = e ? t && r ? `
    let col = colIn * ${o};
    ${_}` : `
    let col = colIn * ${o};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${_}
    }
    return ${bv(o, d)}(0.0);` : r && n ? `
    let col = colIn * ${o};
    ${_}` : `
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${_}
    }
    return ${bv(o, d)}(0.0);`,
        k = e ? r && n ? h(s) : `
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${h(s)}
    }
    return ${bv(s, d)}(0.0);` : `
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${h(s)}
    }
    return ${bv(s, d)}(0.0);`,
        A = bv(l, d),
        S = bv(e ? o : s, d),
        C = bv(e ? s : o, d),
        I = qJ(i, A, d);
      return `
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${S} {
      ${e ? w : k}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${C} {
      ${e ? k : w}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${A}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e ? "i32(uniforms.result_shape[2])" : "i32(uniforms.result_shape[3])"};
      ${m}
      ${P3r(a)}
      ${I}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`;
    }, N3r = (e, t, n, r, a, i, o, s, l) => {
      let d = t.format === "NHWC",
        u = d ? e[0].dims[3] : e[0].dims[1],
        h = n[0],
        p = d ? n[2] : n[3],
        m = d ? n[1] : n[2],
        f = d ? n[3] : n[1],
        y = d && (u % 4 === 0 || u % 3 === 0) && f % 4 === 0,
        b = d ? f : p * m,
        v = d ? p * m : f,
        _ = [8, 8, 1],
        w = r <= 8 ? [4, 1, 1] : [4, 4, 1],
        k = [Math.ceil(b / _[0] / w[0]), Math.ceil(v / _[1] / w[1]), Math.ceil(h / _[2] / w[2])];
      Rd("verbose", () => `[conv2d_mm_webgpu] dispatch = ${k}`);
      let A = y ? d && u % 4 !== 0 ? 3 : 4 : 1,
        S = _[1] * w[1],
        C = _[0] * w[0],
        I = Math.max(_[0] * A, _[1]),
        E = r % S === 0,
        M = a % C === 0,
        T = i % I === 0,
        P = y ? [A, 4, 4] : [1, 1, 1],
        R = [{
          type: 6,
          data: r
        }, {
          type: 6,
          data: a
        }, {
          type: 6,
          data: i
        }, {
          type: 6,
          data: [t.pads[0], t.pads[1]]
        }, {
          type: 6,
          data: t.strides
        }, {
          type: 6,
          data: t.dilations
        }];
      KJ(t, R), R.push(...gs(e[0].dims, e[1].dims));
      let j = ["rank", "rank"];
      o && (R.push(...gs(e[2].dims)), j.push("rank")), R.push(...gs(n));
      let B = F => {
        let N = [{
          name: "dim_a_outer",
          type: "i32"
        }, {
          name: "dim_b_outer",
          type: "i32"
        }, {
          name: "dim_inner",
          type: "i32"
        }, {
          name: "pad",
          type: "i32",
          length: 2
        }, {
          name: "stride",
          type: "i32",
          length: 2
        }, {
          name: "dilation",
          type: "i32",
          length: 2
        }];
        QJ(t, N);
        let G = y ? 4 : 1,
          z = Rb(e[0].dataType),
          V = `
      fn setOutputAtIndex(flatIndex : i32, value : ${y ? `vec4<${z}>` : z}) {
        result[flatIndex] = ${y ? `vec4<${z}>` : z}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${y ? `vec4<${z}>` : z}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${y ? "/ 4" : ""}, value);
      }`,
          O = bi("x", e[0].dataType, e[0].dims.length, A === 3 ? 1 : A),
          L = bi("w", e[1].dataType, e[1].dims.length, G),
          D = [O, L],
          U = is("result", e[0].dataType, n.length, G);
        if (o) {
          let H = bi("bias", e[2].dataType, e[2].dims.length, G);
          D.push(H), V += `
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${y ? `vec4<${z}>` : z} {
          return bias[coords.${d ? "w" : "y"}${y ? "/ 4" : ""}];
        }`;
        }
        return `
        ${R3r("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${F.registerUniforms(N).declareVariables(...D, U)}
        ${V}
        ${lkn(d, E, M, T, o, t, P[0], P[1], P[2], z)}
        ${y ? k4t(w, _, z, void 0, !d, I) : A4t(w, _, z, void 0, !d, I, !1, void 0, s)}`;
      };
      return {
        name: "Conv2DMatMul",
        shaderCache: {
          hint: `${t.cacheKey};${A};${y};${E};${M};${T};${S};${C};${I}`,
          inputDependencies: j
        },
        getRunData: () => ({
          outputs: [{
            dims: l ? l(n) : n,
            dataType: e[0].dataType
          }],
          dispatchGroup: {
            x: k[0],
            y: k[1],
            z: k[2]
          },
          programUniforms: R
        }),
        getShaderSource: B
      };
    };
  }),
  ckn,
  aht,
  Nge,
  dkn,
  iht,
  ukn,
  j3r,
  D3r,
  tNo = Wi(() => {
    ol(), QD(), Wl(), cc(), oee(), rVt(), ckn = e => {
      let t = 1;
      for (let n = 0; n < e.length; n++) t *= e[n];
      return t;
    }, aht = e => typeof e == "number" ? [e, e, e] : e, Nge = (e, t) => t <= 1 ? e : e + (e - 1) * (t - 1), dkn = (e, t, n, r = 1) => {
      let a = Nge(t, r);
      return Math.floor((e[0] * (n - 1) - n + a) / 2);
    }, iht = (e, t, n, r, a) => {
      a == null && (a = dkn(e, t[0], r[0]));
      let i = [0, 0, 0, n];
      for (let o = 0; o < 3; o++) e[o] + 2 * a >= t[o] && (i[o] = Math.trunc((e[o] - t[o] + 2 * a) / r[o] + 1));
      return i;
    }, ukn = (e, t, n, r, a, i, o, s, l, d) => {
      let u, h, p, m;
      if (e === "VALID" && (e = 0), typeof e == "number") {
        u = {
          top: e,
          bottom: e,
          left: e,
          right: e,
          front: e,
          back: e
        };
        let f = iht([t, n, r, 1], [s, l, d], 1, [a, i, o], e);
        h = f[0], p = f[1], m = f[2];
      } else if (Array.isArray(e)) {
        if (!e.every((y, b, v) => y === v[0])) throw Error(`Unsupported padding parameter: ${e}`);
        u = {
          top: e[0],
          bottom: e[1],
          left: e[2],
          right: e[3],
          front: e[4],
          back: e[5]
        };
        let f = iht([t, n, r, 1], [s, l, d], 1, [a, i, o], e[0]);
        h = f[0], p = f[1], m = f[2];
      } else if (e === "SAME_UPPER") {
        h = Math.ceil(t / a), p = Math.ceil(n / i), m = Math.ceil(r / o);
        let f = (h - 1) * a + s - t,
          y = (p - 1) * i + l - n,
          b = (m - 1) * o + d - r,
          v = Math.floor(f / 2),
          _ = f - v,
          w = Math.floor(y / 2),
          k = y - w,
          A = Math.floor(b / 2),
          S = b - A;
        u = {
          top: w,
          bottom: k,
          left: A,
          right: S,
          front: v,
          back: _
        };
      } else throw Error(`Unknown padding parameter: ${e}`);
      return {
        padInfo: u,
        outDepth: h,
        outHeight: p,
        outWidth: m
      };
    }, j3r = (e, t, n, r, a, i = !1, o = "channelsLast") => {
      let s, l, d, u, h;
      if (o === "channelsLast") [s, l, d, u, h] = e;else if (o === "channelsFirst") [s, h, l, d, u] = e;else throw new Error(`Unknown dataFormat ${o}`);
      let [p,, m, f, y] = t,
        [b, v, _] = aht(n),
        [w, k, A] = aht(r),
        S = Nge(m, w),
        C = Nge(f, k),
        I = Nge(y, A),
        {
          padInfo: E,
          outDepth: M,
          outHeight: T,
          outWidth: P
        } = ukn(a, l, d, u, b, v, _, S, C, I),
        R = i ? p * h : p,
        j = [0, 0, 0, 0, 0];
      return o === "channelsFirst" ? j = [s, R, M, T, P] : o === "channelsLast" && (j = [s, M, T, P, R]), {
        batchSize: s,
        dataFormat: o,
        inDepth: l,
        inHeight: d,
        inWidth: u,
        inChannels: h,
        outDepth: M,
        outHeight: T,
        outWidth: P,
        outChannels: R,
        padInfo: E,
        strideDepth: b,
        strideHeight: v,
        strideWidth: _,
        filterDepth: m,
        filterHeight: f,
        filterWidth: y,
        effectiveFilterDepth: S,
        effectiveFilterHeight: C,
        effectiveFilterWidth: I,
        dilationDepth: w,
        dilationHeight: k,
        dilationWidth: A,
        inShape: e,
        outShape: j,
        filterShape: t
      };
    }, D3r = (e, t, n, r, a, i) => {
      let o = i === "channelsLast";
      o ? e[0].dims[3] : e[0].dims[1];
      let s = [64, 1, 1],
        l = {
          x: n.map((b, v) => v)
        },
        d = [Math.ceil(ckn(l.x.map(b => n[b])) / s[0]), 1, 1];
      Rd("verbose", () => `[conv3d_naive_webgpu] dispatch = ${d}`);
      let u = 1,
        h = si.size(n),
        p = [{
          type: 12,
          data: h
        }, {
          type: 12,
          data: r
        }, {
          type: 12,
          data: a
        }, {
          type: 12,
          data: t.strides
        }, {
          type: 12,
          data: t.dilations
        }];
      KJ(t, p), p.push(...gs(e[0].dims, e[1].dims));
      let m = ["rank", "rank"],
        f = e.length === 3;
      f && (p.push(...gs(e[2].dims)), m.push("rank")), p.push(...gs(n));
      let y = b => {
        let v = [{
          name: "output_size",
          type: "u32"
        }, {
          name: "filter_dims",
          type: "u32",
          length: r.length
        }, {
          name: "pads",
          type: "u32",
          length: a.length
        }, {
          name: "strides",
          type: "u32",
          length: t.strides.length
        }, {
          name: "dilations",
          type: "u32",
          length: t.dilations.length
        }];
        QJ(t, v);
        let _ = 1,
          w = Rb(e[0].dataType),
          k = bi("x", e[0].dataType, e[0].dims.length, u),
          A = bi("W", e[1].dataType, e[1].dims.length, _),
          S = [k, A],
          C = is("result", e[0].dataType, n.length, _),
          I = "";
        if (f) {
          let T = bi("bias", e[2].dataType, e[2].dims.length, _);
          S.push(T), I += `
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${w} {
          return bias[${o ? ds("coords", 4, 5) : ds("coords", 1, 5)}];
        }`;
        }
        let E = bv(u, w),
          M = qJ(t, E, w);
        return `
            ${I}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${k.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${A.getByIndices("aIndices")};
            }
          ${b.registerUniforms(v).declareVariables(...S, C)}
          ${b.mainStart()}
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${C.offsetToIndices("global_idx")};
              let batch = ${ds("coords", 0, k.rank)};
              let d2 = ${o ? ds("coords", k.rank - 1, k.rank) : ds("coords", 1, k.rank)};
              let xFRCCorner = vec3<u32>(${o ? ds("coords", 1, k.rank) : ds("coords", 2, k.rank)},
              ${o ? ds("coords", 2, k.rank) : ds("coords", 3, k.rank)},
              ${o ? ds("coords", 3, k.rank) : ds("coords", 4, k.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${o ? ds("uniforms.x_shape", 1, k.rank) : ds("uniforms.x_shape", 2, k.rank)};
              let xShapeZ = ${o ? ds("uniforms.x_shape", 2, k.rank) : ds("uniforms.x_shape", 3, k.rank)};
              let xShapeW = ${o ? ds("uniforms.x_shape", 3, k.rank) : ds("uniforms.x_shape", 4, k.rank)};
              let xShapeU = ${o ? ds("uniforms.x_shape", 4, k.rank) : ds("uniforms.x_shape", 1, k.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${o ? `let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            ` : `let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${o ? `value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);` : `value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${o ? `let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      ` : `let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${o ? `let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      ` : `let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${f ? "value = value + getBiasByOutputCoords(coords)" : ""};
              ${M}
              result[global_idx] = f32(value);
          }`;
      };
      return {
        name: "Conv3DNaive",
        shaderCache: {
          hint: `${t.cacheKey};${o};${u};${f}`,
          inputDependencies: m
        },
        getRunData: () => ({
          outputs: [{
            dims: n,
            dataType: e[0].dataType
          }],
          dispatchGroup: {
            x: d[0],
            y: d[1],
            z: d[2]
          },
          programUniforms: p
        }),
        getShaderSource: y
      };
    };
  }),
  L3r,
  O3r,
  nNo = Wi(() => {
    ol(), Wl(), cc(), oee(), L3r = (e, t, n, r) => {
      let a = e.length > 2,
        i = a ? "value += b[output_channel];" : "",
        o = e[0].dims,
        s = e[1].dims,
        l = t.format === "NHWC",
        d = l ? n[3] : n[1],
        u = d / t.group,
        h = l && u >= 4 ? wf(d) : 1,
        p = si.size(n) / h,
        m = [{
          type: 12,
          data: p
        }, {
          type: 12,
          data: t.dilations
        }, {
          type: 12,
          data: [t.strides[0], t.strides[1]]
        }, {
          type: 12,
          data: [t.pads[0], t.pads[1]]
        }, {
          type: 12,
          data: u
        }];
      KJ(t, m), m.push(...gs(o, [s[0], s[1], s[2], s[3] / h]));
      let f = a ? ["rank", "rank", "rank"] : ["rank", "rank"];
      m.push(...gs([n[0], n[1], n[2], n[3] / h]));
      let y = b => {
        let v = is("output", e[0].dataType, n.length, h),
          _ = Rb(v.type.tensor),
          w = qJ(t, v.type.value, _),
          k = bi("x", e[0].dataType, o.length),
          A = bi("w", e[1].dataType, s.length, h),
          S = [k, A];
        a && S.push(bi("b", e[2].dataType, e[2].dims, h));
        let C = [{
          name: "output_size",
          type: "u32"
        }, {
          name: "dilations",
          type: "u32",
          length: t.dilations.length
        }, {
          name: "strides",
          type: "u32",
          length: 2
        }, {
          name: "pads",
          type: "u32",
          length: 2
        }, {
          name: "output_channels_per_group",
          type: "u32"
        }];
        QJ(t, C);
        let I = l ? `
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${k.get("batch", "xHeight", "xWidth", "input_channel")};
            let wVal = ${A.get("wHeight", "wWidth", "wInChannel", "output_channel")};
            value += xVal * wVal;
          }
        }
      }
      ` : `
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${k.get("batch", "input_channel", "xHeight", "xWidth")};
            let wVal = ${A.get("output_channel", "wInChannel", "wHeight", "wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;
        return `
  ${b.registerUniforms(C).declareVariables(...S, v)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${v.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l ? 3 : 1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l ? 1 : 2}], outputIndices[${l ? 2 : 3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${h} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l ? 2 : 1}];

    var value: ${v.type.value} = ${v.type.value}(0);
    ${I}
    ${i}
    ${w}
    ${v.setByOffset("global_idx", "value")}
  }`;
      };
      return {
        name: "GroupedConv",
        shaderCache: {
          hint: `${t.cacheKey}_${h}`,
          inputDependencies: f
        },
        getRunData: () => ({
          outputs: [{
            dims: r ? r(n) : n,
            dataType: e[0].dataType
          }],
          dispatchGroup: {
            x: Math.ceil(p / 64)
          },
          programUniforms: m
        }),
        getShaderSource: y
      };
    }, O3r = (e, t, n, r) => {
      let a = e.length > 2,
        i = wf(n[3]),
        o = wf(n[2]),
        s = si.size(n) / i / o,
        l = [e[0].dims[0], e[0].dims[1], e[0].dims[2], e[0].dims[3] / i],
        d = [e[1].dims[0], e[1].dims[1], e[1].dims[2], e[1].dims[3] / i],
        u = [n[0], n[1], n[2], n[3] / i],
        h = [{
          type: 12,
          data: s
        }, {
          type: 6,
          data: [t.strides[0], t.strides[1]]
        }, {
          type: 6,
          data: [t.pads[0], t.pads[1]]
        }];
      KJ(t, h), h.push(...gs(l, d, u));
      let p = (o - 1) * t.strides[1] + d[1],
        m = f => {
          let y = is("output", e[0].dataType, u.length, i),
            b = Rb(y.type.tensor),
            v = qJ(t, y.type.value, b),
            _ = bi("x", e[0].dataType, l.length, i),
            w = bi("w", e[1].dataType, d.length, i),
            k = [_, w];
          a && k.push(bi("b", e[2].dataType, e[2].dims, i));
          let A = a ? "value += b[output_channel];" : "",
            S = [{
              name: "output_size",
              type: "u32"
            }, {
              name: "strides",
              type: "i32",
              length: 2
            }, {
              name: "pads",
              type: "i32",
              length: 2
            }];
          return QJ(t, S), `
  ${f.registerUniforms(S).declareVariables(...k, y)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${o}u;
    let col = (index1 % width1) * ${o}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${_.type.value}, ${p}>;
    var values: array<${y.type.value}, ${o}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${d[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${p}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${_.get("batch", "u32(x_height)", "u32(x_width)", "input_channel")};
          } else {
            x_vals[i] = ${_.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${d[1]}; w_width++) {
          let w_val = ${w.get("w_height", "w_width", "0", "output_channel")};
          for (var i = 0u; i < ${o}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${o}u; i++) {
      var value = values[i];
      ${A}
      ${v}
      ${y.set("batch", "row", "col + i", "output_channel", "value")};
    }
  }`;
        };
      return {
        name: "GroupedConv-Vectorize",
        shaderCache: {
          hint: `${t.cacheKey};${i};${o};${p};${d[0]};${d[1]}`,
          inputDependencies: a ? ["rank", "rank", "type"] : ["rank", "rank"]
        },
        getRunData: () => ({
          outputs: [{
            dims: r ? r(n) : n,
            dataType: e[0].dataType
          }],
          dispatchGroup: {
            x: Math.ceil(s / 64)
          },
          programUniforms: h
        }),
        getShaderSource: m
      };
    };
  }),
  hkn,
  w9e,
  pkn,
  x9e,
  S4t,
  oht,
  mkn,
  fkn,
  I4t,
  rNo = Wi(() => {
    Wl(), eNo(), tNo(), oVt(), nNo(), oee(), iVt(), wG(), hkn = (e, t, n, r, a, i) => {
      let o = e[0],
        s = e.slice(i ? 1 : 2, i ? 3 : 4),
        l = s.length,
        d = t[0],
        u = t.slice(2).map((p, m) => p + (p - 1) * (n[m] - 1)),
        h = s.map((p, m) => p + r[m] + r[m + l]).map((p, m) => Math.floor((p - u[m] + a[m]) / a[m]));
      return h.splice(0, 0, o), h.splice(i ? 3 : 1, 0, d), h;
    }, w9e = [2, 3, 1, 0], pkn = (e, t) => {
      if (!e || e.length !== 2 && e.length !== 3) throw new Error("Conv requires 2 or 3 inputs");
      if (e[0].dims.length > 5) throw new Error("greater than 5D is not supported");
      if (e[0].dims.length !== e[1].dims.length) throw new Error("filter does not have same dimension as input");
      let n = e[0].dims[t.format === "NHWC" ? e[0].dims.length - 1 : 1],
        r = e[1].dims[1] * t.group;
      if (n !== r) throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");
      if (e.length === 3 && (e[2].dims.length !== 1 || e[1].dims[0] !== e[2].dims[0])) throw new Error("invalid bias");
      let a = e[0].dims.length - 2;
      if (t.dilations.length !== a) throw new Error(`dilations should be ${a}D`);
      if (t.strides.length !== a) throw new Error(`strides should be ${a}D`);
      if (t.pads.length !== a * 2) throw new Error(`pads should be ${a * 2}D`);
      if (t.kernelShape.length !== 0 && t.kernelShape.length !== e[1].dims.length - 2) throw new Error("invalid kernel shape");
    }, x9e = (e, t) => {
      let n = e.kernelShape.slice();
      n.length < t[1].dims.length - 2 && n.push(...Array(t[1].dims.length - 2 - n.length).fill(0));
      for (let i = 2; i < t[1].dims.length; ++i) n[i - 2] === 0 && (n[i - 2] = t[1].dims[i]);
      let r = e.pads.slice();
      EGe.adjustPadsBasedOnAutoPad(t[0].dims, e.strides, e.dilations, n, r, e.format === "NHWC", e.autoPad);
      let a = Object.assign({}, e);
      return Object.assign(a, {
        kernelShape: n,
        pads: r
      }), a;
    }, S4t = e => {
      let t = nVt(e),
        n = e.format,
        r = ["NOTSET", "VALID", "SAME_UPPER", "SAME_LOWER"][e.auto_pad],
        a = e.dilations,
        i = e.group,
        o = e.kernel_shape,
        s = e.pads,
        l = e.strides,
        d = e.w_is_const();
      return {
        autoPad: r,
        format: n,
        dilations: a,
        group: i,
        kernelShape: o,
        pads: s,
        strides: l,
        wIsConst: d,
        ...t,
        cacheKey: `${e.format};${t.activation};`
      };
    }, oht = (e, t, n, r) => {
      let a = n.format === "NHWC",
        i = hkn(t[0].dims, t[1].dims, n.dilations, n.pads, n.strides, a);
      if (n.group !== 1) {
        let S = [t[0]];
        if (a) {
          let C = e.kernelCustomData.wT ?? e.compute(t3(t[1], w9e), {
            inputs: [1],
            outputs: [n.wIsConst ? -2 : -1]
          })[0];
          n.wIsConst && !e.kernelCustomData.wT && (e.kernelCustomData.wT = C), S.push(C);
        } else S.push(t[1]);
        t.length === 3 && S.push(t[2]), !e.adapterInfo.isArchitecture("ampere") && a && t[1].dims[0] === n.group && t[1].dims[1] === 1 && n.dilations[0] === 1 && n.dilations[1] === 1 ? e.compute(O3r(S, n, i, r), {
          inputs: S
        }) : e.compute(L3r(S, n, i, r), {
          inputs: S
        });
        return;
      }
      let o = t.length === 3,
        s = t[0].dims[a ? 1 : 2],
        l = t[0].dims[a ? 2 : 3],
        d = t[0].dims[a ? 3 : 1],
        u = t[1].dims[2],
        h = t[1].dims[3],
        p = i[a ? 1 : 2],
        m = i[a ? 2 : 3],
        f = i[a ? 3 : 1],
        y = a && u === s && h === l && n.pads[0] === 0 && n.pads[1] === 0;
      if (y || u === 1 && h === 1 && n.dilations[0] === 1 && n.dilations[1] === 1 && n.strides[0] === 1 && n.strides[1] === 1 && n.pads[0] === 0 && n.pads[1] === 0) {
        let S = i[0],
          C,
          I,
          E,
          M = [];
        if (a) {
          let R = e.kernelCustomData.wT ?? e.compute(t3(t[1], w9e), {
            inputs: [1],
            outputs: [n.wIsConst ? -2 : -1]
          })[0];
          if (n.wIsConst && !e.kernelCustomData.wT && (e.kernelCustomData.wT = R), y) {
            let j = s * l * d;
            C = t[0].reshape([1, S, j]), I = R.reshape([1, j, f]), E = [1, S, f];
          } else C = t[0].reshape([S, s * l, d]), I = R.reshape([1, d, f]), E = [S, p * m, f];
          M.push(C), M.push(I);
        } else C = t[0].reshape([S, d, s * l]), I = t[1].reshape([1, f, d]), E = [S, f, p * m], M.push(I), M.push(C);
        o && M.push(t[2]);
        let T = E[2],
          P = M[0].dims[M[0].dims.length - 1];
        T < 8 && P < 8 ? e.compute(aVt(M, n, i, E, a, r), {
          inputs: M
        }) : e.compute(MGe(M, n, i, E, a, r), {
          inputs: M
        });
        return;
      }
      let b = !0,
        v = e.kernelCustomData.wT ?? e.compute(t3(t[1], w9e), {
          inputs: [1],
          outputs: [n.wIsConst ? -2 : -1]
        })[0];
      n.wIsConst && !e.kernelCustomData.wT && (e.kernelCustomData.wT = v);
      let _ = [t[0], v];
      o && _.push(t[2]);
      let w = a ? p * m : f,
        k = a ? f : p * m,
        A = u * h * d;
      e.compute(N3r(_, n, i, w, k, A, o, b, r), {
        inputs: _
      });
    }, mkn = (e, t) => {
      let n = t.format === "NHWC",
        r = [e.inputs[0].reshape(n ? [e.inputs[0].dims[0], 1, e.inputs[0].dims[1], e.inputs[0].dims[2]] : [e.inputs[0].dims[0], e.inputs[0].dims[1], 1, e.inputs[0].dims[2]]), e.inputs[1].reshape([e.inputs[1].dims[0], e.inputs[1].dims[1], 1, e.inputs[1].dims[2]])];
      e.inputs.length === 3 && r.push(e.inputs[2]);
      let a = [0, t.pads[0], 0, t.pads[1]],
        i = [1].concat(t.strides),
        o = [1].concat(t.dilations),
        s = [1].concat(t.kernelShape),
        l = x9e({
          ...t,
          pads: a,
          strides: i,
          dilations: o,
          kernelShape: s
        }, r);
      oht(e, r, l, d => n ? [d[0], d[2], d[3]] : [d[0], d[1], d[3]]);
    }, fkn = (e, t, n) => {
      let r = n.format === "NHWC" ? "channelsLast" : "channelsFirst",
        a = x9e(n, t),
        i = n.autoPad === "NOTSET" ? n.pads : n.autoPad,
        o = j3r(t[0].dims, t[1].dims, n.strides, n.dilations, i, !1, r);
      e.compute(D3r(t, a, o.outShape, [o.filterDepth, o.filterHeight, o.filterWidth], [o.padInfo.front, o.padInfo.top, o.padInfo.left], r));
    }, I4t = (e, t) => {
      if (pkn(e.inputs, t), e.inputs[0].dims.length === 3) mkn(e, t);else if (e.inputs[0].dims.length === 5) fkn(e, e.inputs, t);else {
        let n = x9e(t, e.inputs);
        oht(e, e.inputs, n);
      }
    };
  }),
  B3r,
  aNo = Wi(() => {
    ol(), QD(), Wl(), cc(), B3r = (e, t, n) => {
      let r = e.length > 2,
        a = t.outputShape,
        i = t.format === "NHWC",
        o = t.group,
        s = e[1].dims,
        l = s[2] / o,
        d = s[3],
        u = i ? wf(l) : 1,
        h = i ? wf(d) : 1,
        p = i ? d === 1 ? u : h : 1,
        m = si.size(a) / h,
        f = [Math.ceil(m / 64), 1, 1];
      Rd("verbose", () => `[conv2d_backprop_webgpu] dispatch = ${f}`);
      let y = ["rank", "rank"],
        b = [t.strides[0], t.strides[1]],
        v = [t.kernelShape[i ? 1 : 2], t.kernelShape[i ? 2 : 3]],
        _ = [t.dilations[0], t.dilations[1]],
        w = [v[0] + (t.dilations[0] <= 1 ? 0 : (t.kernelShape[i ? 1 : 2] - 1) * (t.dilations[0] - 1)), v[1] + (t.dilations[1] <= 1 ? 0 : (t.kernelShape[i ? 2 : 3] - 1) * (t.dilations[1] - 1))],
        k = [w[0] - 1 - Math.floor((t.pads[0] + t.pads[2]) / 2), w[1] - 1 - Math.floor((t.pads[1] + t.pads[3]) / 2)],
        A = [{
          type: 12,
          data: m
        }, {
          type: 12,
          data: b
        }, {
          type: 12,
          data: v
        }, {
          type: 12,
          data: _
        }, {
          type: 12,
          data: w
        }, {
          type: 6,
          data: k
        }, {
          type: 12,
          data: l
        }, {
          type: 12,
          data: d
        }, ...gs(e[0].dims, e[1].dims)];
      r && (A.push(...gs(e[2].dims)), y.push("rank")), A.push(...gs(a));
      let S = C => {
        let I = [{
            name: "output_size",
            type: "u32"
          }, {
            name: "strides",
            type: "u32",
            length: b.length
          }, {
            name: "filter_dims",
            type: "u32",
            length: v.length
          }, {
            name: "dilations",
            type: "u32",
            length: v.length
          }, {
            name: "effective_filter_dims",
            type: "u32",
            length: w.length
          }, {
            name: "pads",
            type: "i32",
            length: k.length
          }, {
            name: "input_channels_per_group",
            type: "u32"
          }, {
            name: "output_channels_per_group",
            type: "u32"
          }],
          E = Rb(e[0].dataType),
          M = i ? 1 : 2,
          T = i ? 2 : 3,
          P = i ? 3 : 1,
          R = bi("W", e[1].dataType, e[1].dims.length, p),
          j = bi("Dy", e[0].dataType, e[0].dims.length, u),
          B = [j, R];
        r && B.push(bi("bias", e[2].dataType, [a[P]].length, h));
        let F = is("result", e[0].dataType, a.length, h),
          N = () => {
            let z = "";
            if (u === 1) z += `
        let w_offset = ${R.indicesToOffset(`${R.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
        let wValue = ${R.getByOffset(`w_offset / ${p}`)};
        dotProd = dotProd + xValue * wValue;`;else if (d === 1) z += `
          let wValue = ${R.getByOffset(`${R.indicesToOffset(`${R.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)} / ${p}`)};
          dotProd = dotProd + dot(xValue, wValue);`;else for (let V = 0; V < u; V++) z += `
            let wValue${V} = ${R.getByOffset(`${R.indicesToOffset(`${R.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${V}, wOutChannel)`)} / ${p}`)};
            dotProd = dotProd + xValue[${V}] * wValue${V};`;
            return z;
          },
          G = `
            let outputIndices = ${F.offsetToIndices(`global_idx * ${h}`)};
            let batch = ${F.indicesGet("outputIndices", 0)};
            let d1 = ${F.indicesGet("outputIndices", P)};
            let r = ${F.indicesGet("outputIndices", M)};
            let c = ${F.indicesGet("outputIndices", T)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${F.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${E}(dyRCorner) + ${E}(wR)) / ${E}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${E}(uniforms.Dy_shape[${M}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }

              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${E}(dyCCorner) + ${E}(wC)) / ${E}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${E}(uniforms.Dy_shape[${T}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group; d2 = d2 + ${u}) {
                  let xValue = ${i ? j.getByOffset(`${j.indicesToOffset(`${j.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${u}`) : j.get("batch", "inputChannel", "idyR", "idyC")};
                  ${N()}
                  inputChannel = inputChannel + ${u};
                }
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${r ? ` + bias[d1 / ${h}]` : ""};
            ${F.setByOffset("global_idx", "value")};
          `;
        return `
    ${C.registerUniforms(I).declareVariables(...B, F)}
      ${C.mainStart()}
      ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${G}}`;
      };
      return {
        name: "ConvTranspose2D",
        shaderCache: {
          hint: `${t.cacheKey};${u}${p}${h}${d === 1}`,
          inputDependencies: y
        },
        getRunData: () => ({
          dispatchGroup: {
            x: f[0],
            y: f[1],
            z: f[2]
          },
          outputs: [{
            dims: n ? n(a) : a,
            dataType: e[0].dataType
          }],
          programUniforms: A
        }),
        getShaderSource: S
      };
    };
  }),
  gkn,
  ykn,
  bkn,
  sht,
  F3r,
  vkn,
  lht,
  wkn,
  z3r,
  iNo = Wi(() => {
    aNo(), oee(), wG(), gkn = (e, t, n, r, a, i) => (e - 1) * t + n + (r - 1) * a + 1 - i, ykn = (e, t, n, r, a) => {
      let i = Math.floor(e / 2);
      t === "SAME_UPPER" ? (n[r] = i, n[a] = e - i) : t === "SAME_LOWER" && (n[r] = e - i, n[a] = i);
    }, bkn = (e, t, n, r, a, i, o, s, l, d) => {
      let u = e.length - 2,
        h = d.length === 0;
      l.length < u && l.push(...Array(u - l.length).fill(0));
      let p = e[0],
        m = t[s ? 3 : 1] * a;
      for (let f = 0, y = e.length - u - (s ? 1 : 0); f < u; ++f, ++y) {
        let b = e[y],
          v = h ? b * o[f] : d[f],
          _ = gkn(b, o[f], i[f], t[y], n[f], v);
        ykn(_, r, i, f, f + u), h && d.push(o[f] * (b - 1) + l[f] + (t[y] - 1) * n[f] + 1 - i[f] - i[f + u]);
      }
      d.splice(0, 0, p), d.splice(s ? 3 : 1, 0, m);
    }, sht = (e, t) => {
      let n = e.kernelShape.slice();
      if (e.kernelShape.length === 0 || e.kernelShape.reduce((h, p) => h * p, 1) === 0) {
        n.length = 0;
        for (let h = 2; h < t[1].dims.length; ++h) n.push(t[1].dims[h]);
      }
      let r = e.format === "NHWC";
      n.splice(0, 0, t[1].dims[0]), n.splice(r ? 3 : 1, 0, t[1].dims[1]);
      let a = e.pads.slice(),
        i = e.outputShape.slice(),
        o = e.outputPadding.slice(),
        s = t[0].dims,
        l = e.dilations.slice();
      if (l.reduce((h, p) => h + p, 0) === 0) {
        let h = t[0].dims.length - 2;
        l = new Array(h).fill(1);
      }
      let d = e.strides.slice();
      if (d.reduce((h, p) => h + p, 0) === 0) {
        let h = t[0].dims.length - 2;
        d = new Array(h).fill(1);
      }
      bkn(s, n, l, e.autoPad, e.group, a, d, r, o, i);
      let u = Object.assign({}, e);
      return Object.assign(u, {
        kernelShape: n,
        pads: a,
        outputPadding: o,
        outputShape: i,
        dilations: l,
        strides: d
      }), u;
    }, F3r = e => {
      let t = nVt(e),
        n = e.format,
        r = ["NOTSET", "VALID", "SAME_UPPER", "SAME_LOWER"][typeof e.autoPad > "u" ? 0 : e.autoPad],
        a = e.dilations,
        i = e.group,
        o = e.kernelShape,
        s = e.pads,
        l = e.strides,
        d = e.wIsConst(),
        u = e.outputPadding,
        h = e.outputShape;
      return {
        autoPad: r,
        format: n,
        dilations: a,
        group: i,
        kernelShape: o,
        outputPadding: u,
        outputShape: h,
        pads: s,
        strides: l,
        wIsConst: d,
        ...t,
        cacheKey: `${e.format};${t.activation};`
      };
    }, vkn = (e, t) => {
      if (!e || e.length !== 2 && e.length !== 3) throw new Error("Conv requires 2 or 3 inputs");
      if (e[0].dims.length !== 4 && e[0].dims.length !== 3) throw new Error("currently only support 2-dimensional conv");
      if (e[0].dims.length !== e[1].dims.length) throw new Error("filter does not have same dimension as input");
      let n = e[0].dims[t.format === "NHWC" ? e[0].dims.length - 1 : 1],
        r = e[1].dims[0];
      if (n !== r) throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");
      let a = e[1].dims[1] * t.group;
      if (e.length === 3 && (e[2].dims.length !== 1 || e[2].dims[0] !== a)) throw new Error("invalid bias");
      let i = e[0].dims.length - 2;
      if (t.dilations.reduce((o, s) => o + s, 0) > 0 && t.dilations.length !== i) throw new Error(`dilations should be ${i}D`);
      if (t.strides.reduce((o, s) => o + s, 0) > 0 && t.strides.length !== i) throw new Error(`strides should be ${i}D`);
      if (t.pads.reduce((o, s) => o + s, 0) > 0 && t.pads.length !== i * 2) throw new Error(`pads should be ${i * 2}D`);
      if (t.outputPadding.length !== i && t.outputPadding.length !== 0) throw new Error(`output_padding should be ${i}D`);
      if (t.kernelShape.reduce((o, s) => o + s, 0) > 0 && t.kernelShape.length !== 0 && t.kernelShape.length !== e[1].dims.length - 2) throw new Error("invalid kernel shape");
      if (t.outputShape.length !== 0 && t.outputShape.length !== e[0].dims.length - 2) throw new Error("invalid output shape");
    }, lht = (e, t, n, r) => {
      let a = e.kernelCustomData.wT ?? e.compute(t3(t[1], [2, 3, 0, 1]), {
        inputs: [1],
        outputs: [n.wIsConst ? -2 : -1]
      })[0];
      n.wIsConst && !e.kernelCustomData.wT && (e.kernelCustomData.wT = a);
      let i = [t[0], a];
      t.length === 3 && i.push(t[2]), e.compute(B3r(i, n, r), {
        inputs: i
      });
    }, wkn = (e, t) => {
      let n = t.format === "NHWC",
        r = [e.inputs[0].reshape(n ? [e.inputs[0].dims[0], 1, e.inputs[0].dims[1], e.inputs[0].dims[2]] : [e.inputs[0].dims[0], e.inputs[0].dims[1], 1, e.inputs[0].dims[2]]), e.inputs[1].reshape([e.inputs[1].dims[0], e.inputs[1].dims[1], 1, e.inputs[1].dims[2]])];
      e.inputs.length === 3 && r.push(e.inputs[2]);
      let a = t.kernelShape;
      (a.length === 0 || a[0] === 0) && (a = [e.inputs[1].dims[2]]);
      let i = t.dilations;
      (i.length === 0 || i[0] === 0) && (i = [1]);
      let o = t.strides;
      (o.length === 0 || o[0] === 0) && (o = [1]);
      let s = t.pads;
      s.length === 0 && (s = [0, 0]), s = [0, s[0], 0, s[1]], o = [1].concat(o), i = [1].concat(i), a = [1].concat(a);
      let l = t.outputPadding;
      l = [0].concat(l);
      let d = sht({
        ...t,
        pads: s,
        strides: o,
        dilations: i,
        kernelShape: a,
        outputPadding: l
      }, r);
      lht(e, r, d, u => n ? [u[0], u[2], u[3]] : [u[0], u[1], u[3]]);
    }, z3r = (e, t) => {
      if (vkn(e.inputs, t), e.inputs[0].dims.length === 3) wkn(e, t);else {
        let n = sht(t, e.inputs);
        lht(e, e.inputs, n);
      }
    };
  }),
  xkn,
  U3r,
  $3r,
  oNo = Wi(() => {
    ol(), Wl(), wg(), cc(), xkn = (e, t, n, r) => {
      let a = si.size(t),
        i = t.length,
        o = bi("input", e, i),
        s = is("output", e, i),
        l = n.dataType === 6 ? n.getInt32Array()[0] : Number(n.getBigInt64Array()[0]),
        d = si.normalizeAxis(l, i),
        u = h => {
          let p = ` i32(${o.indicesGet("inputIndices", "uniforms.axis")}) `,
            m = ds("uniforms.input_shape", "uniforms.axis", i),
            f = r.reverse ? p + (r.exclusive ? " + 1" : "") : "0",
            y = r.reverse ? m : p + (r.exclusive ? "" : " + 1");
          return `
                ${h.registerUniform("outputSize", "u32").registerUniform("axis", "u32").declareVariables(o, s)}
                ${h.mainStart()}
                  ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${s.offsetToIndices("global_idx")};
                  var sum = ${s.type.value}(0);
                  let first : i32 = ${f};
                  let last : i32 = ${y};
                  for (var i : i32 = first; i < last; i++) {
                    ${o.indicesSet("inputIndices", "uniforms.axis", "u32(i)")};
                    sum = sum + ${o.getByIndices("inputIndices")};
                  }
                  ${s.setByOffset("global_idx", "sum")};
                }`;
        };
      return {
        name: "CumSum",
        shaderCache: {
          hint: r.cacheKey,
          inputDependencies: ["rank"]
        },
        getRunData: () => ({
          outputs: [{
            dims: t,
            dataType: e
          }],
          dispatchGroup: {
            x: Math.ceil(a / 64)
          },
          programUniforms: [{
            type: 12,
            data: a
          }, {
            type: 12,
            data: d
          }, ...gs(t, t)]
        }),
        getShaderSource: u
      };
    }, U3r = (e, t) => {
      let n = e.inputs[0].dims,
        r = e.inputs[0].dataType,
        a = e.inputs[1];
      e.compute(xkn(r, n, a, t), {
        inputs: [0]
      });
    }, $3r = e => {
      let t = e.exclusive === 1,
        n = e.reverse === 1;
      return lh({
        exclusive: t,
        reverse: n
      });
    };
  }),
  _kn,
  kkn,
  Akn,
  G3r,
  V3r,
  sNo = Wi(() => {
    ol(), Wl(), wg(), cc(), _kn = e => {
      if (!e || e.length !== 1) throw new Error("DepthToSpace requires 1 input.");
      if (e[0].dims.length !== 4) throw new Error("DepthToSpace requires 4D input.");
    }, kkn = (e, t, n, r) => {
      let a = [];
      a.push(`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);
      for (let i = 0; i < t; ++i) a.push(n.indicesSet("a", e[i], `i[${i}]`));
      return a.push("return a;}"), a.join(`
`);
    }, Akn = (e, t) => {
      let n,
        r,
        a,
        i,
        o,
        s,
        l = t.format === "NHWC",
        d = t.blocksize,
        u = t.mode === "DCR";
      l ? ([n, r, a, i] = e.dims, o = u ? [n, r, a, d, d, i / d ** 2] : [n, r, a, i / d ** 2, d, d], s = u ? [0, 1, 3, 2, 4, 5] : [0, 1, 4, 2, 5, 3]) : ([n, r, a, i] = [e.dims[0], e.dims[2], e.dims[3], e.dims[1]], o = u ? [n, d, d, i / d ** 2, r, a] : [n, i / d ** 2, d, d, r, a], s = u ? [0, 3, 4, 1, 5, 2] : [0, 1, 4, 2, 5, 3]);
      let h = e.reshape(o),
        p = h.dims.length,
        m = e.dataType,
        f = bi("a", m, p),
        y = is("output", m, p),
        b = v => `
  ${v.registerUniform("output_size", "u32").declareVariables(f, y)}

  ${kkn(s, p, f, y)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${y.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${y.setByOffset("global_idx", f.getByIndices("aIndices"))}
  }`;
      return {
        name: "DepthToSpace",
        shaderCache: {
          hint: `${e.dims};${t.blocksize};${t.mode}`,
          inputDependencies: ["rank"]
        },
        getRunData: v => {
          let _ = l ? [n, r * d, a * d, i / d ** 2] : [n, i / d ** 2, r * d, a * d],
            w = si.size(_),
            k = h.dims,
            A = si.sortBasedOnPerm(k, s);
          return {
            outputs: [{
              dims: _,
              dataType: v[0].dataType
            }],
            dispatchGroup: {
              x: Math.ceil(w / 64)
            },
            programUniforms: [{
              type: 12,
              data: w
            }, ...gs(k, A)]
          };
        },
        getShaderSource: b
      };
    }, G3r = (e, t) => {
      _kn(e.inputs), e.compute(Akn(e.inputs[0], t));
    }, V3r = e => lh({
      blocksize: e.blocksize,
      mode: e.mode,
      format: e.format
    });
  }),
  _9e,
  jge,
  cht,
  Skn,
  Ikn,
  Ckn,
  Ekn,
  dht,
  Tkn,
  H3r,
  W3r,
  lNo = Wi(() => {
    ol(), Wl(), wg(), cc(), _9e = "[a-zA-Z]|\\.\\.\\.", jge = "(" + _9e + ")+", cht = "^" + jge + "$", Skn = "(" + jge + ",)*" + jge, Ikn = "^" + Skn + "$", Ckn = class {
      constructor(e = -1) {
        this.symbolToIndices = new Map(), this.inputIndex = e;
      }
      addSymbol(e, t) {
        let n = this.symbolToIndices.get(e);
        n === void 0 ? n = [t] : n.push(t), this.symbolToIndices.set(e, n);
      }
    }, Ekn = class {
      constructor(e, t) {
        var a;
        this.equation = t, this.hasEllipsis = !1, this.symbolToInfo = new Map(), this.lhs = new Array(), this.outputDims = [];
        let [n, r] = t.includes("->") ? t.split("->", 2) : [t, ""];
        if (!n.match(RegExp(Ikn))) throw new Error("Invalid LHS term");
        if (n.split(",").forEach((i, o) => {
          let s = e[o].dims.slice();
          if (!i.match(RegExp(cht))) throw new Error("Invalid LHS term");
          let l = this.processTerm(i, !0, s, o);
          this.lhs.push(l);
        }), r === "") r += [...this.symbolToInfo.entries()].filter(([i, o]) => o.count === 1 || i === "...").map(([i]) => i).join("");else if (!r.match(RegExp(jge))) throw new Error("Invalid RHS");
        (a = r.match(RegExp(_9e, "g"))) == null || a.forEach(i => {
          if (i === "...") this.outputDims = this.outputDims.concat(this.ellipsisDims);else {
            let o = this.symbolToInfo.get(i);
            if (o === void 0) throw new Error("Invalid RHS symbol");
            this.outputDims.push(o.dimValue);
          }
        }), this.rhs = this.processTerm(r, !1, this.outputDims);
      }
      addSymbol(e, t, n) {
        let r = this.symbolToInfo.get(e);
        if (r !== void 0) {
          if (r.dimValue !== t && r.count !== 1) throw new Error("Dimension mismatch");
          r.count++, r.inputIndices.push(n);
        } else r = {
          count: 1,
          dimValue: t,
          inputIndices: [n]
        };
        this.symbolToInfo.set(e, r);
      }
      processTerm(e, t, n, r = -1) {
        let a = n.length,
          i = !1,
          o = [],
          s = 0;
        if (!e.match(RegExp(cht)) && !t && e !== "") throw new Error("Invalid LHS term");
        let l = e.match(RegExp(_9e, "g")),
          d = new Ckn(r);
        return l == null || l.forEach((u, h) => {
          if (u === "...") {
            if (i) throw new Error("Only one ellipsis is allowed per input term");
            i = !0;
            let p = a - l.length + 1;
            if (p < 0) throw new Error("Ellipsis out of bounds");
            if (o = n.slice(s, s + p), this.hasEllipsis) {
              if (this.ellipsisDims.length !== o.length || this.ellipsisDims.toString() !== o.toString()) throw new Error("Ellipsis dimensions mismatch");
            } else if (t) this.hasEllipsis = !0, this.ellipsisDims = o;else throw new Error("Ellipsis must be specified in the LHS");
            for (let m = 0; m < o.length; m++) {
              let f = String.fromCharCode(48 + m);
              d.addSymbol(f, h + m), this.addSymbol(f, n[s++], r);
            }
          } else d.addSymbol(u, h + (this.hasEllipsis ? this.ellipsisDims.length - 1 : 0)), this.addSymbol(u, n[s++], r);
        }), d;
      }
    }, dht = e => e + "_max", Tkn = (e, t, n, r) => {
      let a = e.map(d => d.length).map((d, u) => bi(`input${u}`, t, d)),
        i = si.size(r),
        o = is("output", t, r.length),
        s = [...n.symbolToInfo.keys()].filter(d => !n.rhs.symbolToIndices.has(d)),
        l = d => {
          let u = [],
            h = "var prod = 1.0;",
            p = "var sum = 0.0;",
            m = "sum += prod;",
            f = [],
            y = [],
            b = [],
            v = [],
            _ = n.symbolToInfo.size === n.rhs.symbolToIndices.size;
          n.symbolToInfo.forEach((k, A) => {
            var S;
            if (n.rhs.symbolToIndices.has(A)) {
              let C = (S = n.rhs.symbolToIndices.get(A)) == null ? void 0 : S[0];
              C !== void 0 && n.lhs.forEach((I, E) => {
                if (k.inputIndices.includes(E)) {
                  let M = I.symbolToIndices.get(A);
                  if (M === void 0) throw new Error("Invalid symbol error");
                  M.forEach(T => {
                    u.push(`${a[E].indicesSet(`input${E}Indices`, T, o.indicesGet("outputIndices", C))}`);
                  });
                }
              });
            } else n.lhs.forEach((C, I) => {
              if (k.inputIndices.includes(I)) {
                let E = C.symbolToIndices.get(A);
                if (E === void 0) throw new Error("Invalid symbol error");
                E.forEach(M => {
                  f.push(`${a[I].indicesSet(`input${I}Indices`, M, `${A}`)}`);
                }), v.push(`prod *= ${a[I].getByIndices(`input${I}Indices`)};`);
              }
            }), y.push(`for(var ${A}: u32 = 0; ${A} < uniforms.${dht(A)}; ${A}++) {`), b.push("}");
          });
          let w = _ ? [...u, `let sum = ${a.map((k, A) => k.getByIndices(`input${A}Indices`)).join(" * ")};`] : [...u, p, ...y, ...f, h, ...v, m, ...b];
          return `
            ${d.registerUniforms(s.map(k => ({
            name: `${dht(k)}`,
            type: "u32"
          }))).registerUniform("outputSize", "u32").declareVariables(...a, o)}

            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${o.offsetToIndices("global_idx")};
            ${a.map((k, A) => `var input${A}Indices: ${a[A].type.indices};`).join(`
`)}
            ${w.join(`
`)};
            ${o.setByOffset("global_idx", "sum")};
          }`;
        };
      return {
        name: "Einsum",
        shaderCache: {
          hint: n.equation,
          inputDependencies: e.map(() => "rank")
        },
        getRunData: () => {
          let d = s.filter(h => n.symbolToInfo.has(h)).map(h => {
            var p;
            return {
              type: 12,
              data: ((p = n.symbolToInfo.get(h)) == null ? void 0 : p.dimValue) || 0
            };
          });
          d.push({
            type: 12,
            data: i
          });
          let u = e.map((h, p) => [...gs(h)]).reduce((h, p) => h.concat(p), d);
          return u.push(...gs(r)), {
            outputs: [{
              dims: r,
              dataType: t
            }],
            dispatchGroup: {
              x: Math.ceil(i / 64)
            },
            programUniforms: u
          };
        },
        getShaderSource: l
      };
    }, H3r = (e, t) => {
      let n = new Ekn(e.inputs, t.equation),
        r = n.outputDims,
        a = e.inputs.map((i, o) => i.dims);
      e.compute(Tkn(a, e.inputs[0].dataType, n, r));
    }, W3r = e => {
      let t = e.equation.replace(/\s+/g, "");
      return lh({
        equation: t
      });
    };
  }),
  Mkn,
  uht,
  Pkn,
  Rkn,
  q3r,
  cNo = Wi(() => {
    ol(), Wl(), cc(), Mkn = e => {
      if (!e || e.length !== 2) throw new Error("Expand requires 2 input.");
      let t = e[0].dims,
        n = Array.from(e[1].getBigInt64Array(), Number),
        r = n.length < t.length ? 0 : n.length - t.length,
        a = t.length < n.length ? 0 : t.length - n.length;
      for (; r < n.length && a < t.length; ++r, ++a) if (n[r] !== t[a] && n[r] !== 1 && t[a] !== 1) throw new Error("Expand requires shape to be broadcastable to input");
    }, uht = (e, t) => {
      let n = e.length - t.length,
        r = [];
      for (let a = 0; a < n; ++a) r.push(e[a]);
      for (let a = 0; a < t.length; ++a) r.push(t[a] === 1 ? e[a + n] : t[a]);
      return r;
    }, Pkn = (e, t) => e.length > t.length ? uht(e, t) : uht(t, e), Rkn = e => {
      let t = e[0].dims,
        n = Array.from(e[1].getBigInt64Array(), Number),
        r = Pkn(t, n),
        a = e[0].dataType,
        i = a === 9 || si.size(t) === 1,
        o = a === 9 || t.length > 0 && t[t.length - 1] % 4 === 0 ? 4 : 1,
        s = i || r.length > 0 && r[r.length - 1] % 4 === 0 ? 4 : 1,
        l = Math.ceil(si.size(r) / s),
        d = h => {
          let p = bi("input", a, t.length, o),
            m = is("output", a, r.length, s),
            f;
          if (a === 9) {
            let y = (b, v, _ = "") => `
          let outputIndices${v} = ${m.offsetToIndices(`outputOffset + ${v}u`)};
          let offset${v} = ${p.broadcastedIndicesToOffset(`outputIndices${v}`, m)};
          let index${v} = offset${v} / 4u;
          let component${v} = offset${v} % 4u;
          ${b}[${v}] = ${_}(${p.getByOffset(`index${v}`)}[component${v}]);
        `;
            f = `
        let outputOffset = global_idx * ${s};
        var data = vec4<u32>(0);
        ${y("data", 0, "u32")}
        ${y("data", 1, "u32")}
        ${y("data", 2, "u32")}
        ${y("data", 3, "u32")}
        ${m.setByOffset("global_idx", "data")}
      }`;
          } else f = `
        let outputIndices = ${m.offsetToIndices(`global_idx * ${s}`)};
        let inputOffset = ${p.broadcastedIndicesToOffset("outputIndices", m)};
        let data = ${m.type.value}(${p.getByOffset(`inputOffset / ${o}`)});
        ${m.setByOffset("global_idx", "data")}
      }`;
          return `
    ${h.registerUniform("vec_size", "u32").declareVariables(p, m)}
    ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${f}`;
        },
        u = [{
          type: 12,
          data: l
        }, ...gs(t, r)];
      return {
        name: "Expand",
        shaderCache: {
          hint: `${r.length};${o}${s}`,
          inputDependencies: ["rank"]
        },
        getShaderSource: d,
        getRunData: () => ({
          outputs: [{
            dims: r,
            dataType: e[0].dataType
          }],
          dispatchGroup: {
            x: Math.ceil(l / 64)
          },
          programUniforms: u
        })
      };
    }, q3r = e => {
      Mkn(e.inputs), e.compute(Rkn(e.inputs), {
        inputs: [0]
      });
    };
  }),
  Nkn,
  K3r,
  dNo = Wi(() => {
    ol(), Wl(), cc(), tVt(), Nkn = e => {
      let t = e[0].dataType,
        n = si.size(e[0].dims),
        r = si.size(e[1].dims),
        a = r % 4 === 0,
        i = o => {
          let s = bi("x", t, [1], 4),
            l = bi("bias", t, [1], 4),
            d = is("y", t, [1], 4),
            u = [{
              name: "output_vec_size",
              type: "u32"
            }, {
              name: "bias_size",
              type: "u32"
            }],
            h = m => `
      let bias${m}_offset: u32 = (global_idx * 4 + ${m}) % uniforms.bias_size;
      let bias${m} = ${l.getByOffset(`bias${m}_offset / 4`)}[bias${m}_offset % 4];`,
            p = a ? `
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};` : `${h(0)}${h(1)}${h(2)}${h(3)}
      let bias = ${s.type.value}(bias0, bias1, bias2, bias3);`;
          return `${o.registerUniforms(u).declareVariables(s, l, d)}

    ${x4t(Ww(t))}

    ${o.mainStart(wue)}
      ${o.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${s.getByOffset("global_idx")};
      ${p}
      let x_in = x + bias;
      ${d.setByOffset("global_idx", _4t("x_in"))}
    }`;
        };
      return {
        name: "FastGeluWithBias",
        shaderCache: {
          hint: `${a}`,
          inputDependencies: ["type", "type"]
        },
        getShaderSource: i,
        getRunData: o => ({
          outputs: [{
            dims: o[0].dims,
            dataType: o[0].dataType
          }],
          programUniforms: [{
            type: 12,
            data: Math.ceil(n / 4)
          }, {
            type: 12,
            data: r
          }],
          dispatchGroup: {
            x: Math.ceil(n / wue / 4)
          }
        })
      };
    }, K3r = e => {
      e.inputs.length < 2 || si.size(e.inputs[1].dims) === 0 ? m3r(e) : e.compute(Nkn(e.inputs));
    };
  }),
  jkn,
  Dkn,
  Q3r,
  Y3r,
  uNo = Wi(() => {
    ol(), Wl(), wg(), cc(), jkn = e => {
      if (!e || e.length !== 2) throw new Error("Gather requires 2 inputs.");
    }, Dkn = (e, t) => {
      let n = e[0].dims,
        r = e[1].dims,
        a = n.length,
        i = si.normalizeAxis(t.axis, a),
        o = n.slice(0);
      o.splice(i, 1, ...r);
      let s = n[i],
        l = e[0].dataType === 9 ? 4 : 1,
        d = Math.ceil(si.size(o) / l),
        u = [{
          type: 12,
          data: d
        }, {
          type: 6,
          data: s
        }, {
          type: 12,
          data: i
        }, ...gs(e[0].dims, e[1].dims, o)],
        h = p => {
          let m = bi("data", e[0].dataType, e[0].dims.length, l),
            f = bi("inputIndices", e[1].dataType, e[1].dims.length),
            y = is("output", e[0].dataType, o.length, l),
            b = _ => {
              let w = r.length,
                k = `var indicesIndices${_}  = ${f.type.indices}(0);`;
              for (let A = 0; A < w; A++) k += `${w > 1 ? `indicesIndices${_}[${A}]` : `indicesIndices${_}`} = ${o.length > 1 ? `outputIndices${_}[uniforms.axis + ${A}]` : `outputIndices${_}`};`;
              k += `
          var idx${_} = ${f.getByIndices(`indicesIndices${_}`)};
          if (idx${_} < 0) {
            idx${_} = idx${_} + uniforms.axisDimLimit;
          }
          var dataIndices${_} : ${m.type.indices};
        `;
              for (let A = 0, S = 0; A < a; A++) A === i ? (k += `${a > 1 ? `dataIndices${_}[${A}]` : `dataIndices${_}`} = u32(idx${_});`, S += w) : (k += `${a > 1 ? `dataIndices${_}[${A}]` : `dataIndices${_}`} = ${o.length > 1 ? `outputIndices${_}[${S}]` : `outputIndices${_}`};`, S++);
              return k;
            },
            v;
          if (e[0].dataType === 9) {
            let _ = (w, k, A = "") => `
          let outputIndices${k} = ${y.offsetToIndices(`outputOffset + ${k}u`)};
          ${b(k)};
          let offset${k} = ${m.indicesToOffset(`dataIndices${k}`)};
          let index${k} = offset${k} / 4u;
          let component${k} = offset${k} % 4u;
          ${w}[${k}] = ${A}(${m.getByOffset(`index${k}`)}[component${k}]);
        `;
            v = `
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${_("value", 0, "u32")}
        ${_("value", 1, "u32")}
        ${_("value", 2, "u32")}
        ${_("value", 3, "u32")}
        ${y.setByOffset("global_idx", "value")}
      `;
          } else v = `
      let outputIndices = ${y.offsetToIndices("global_idx")};
      ${b("")};
      let value = ${m.getByIndices("dataIndices")};
      ${y.setByOffset("global_idx", "value")};
      `;
          return `
      ${p.registerUniform("outputSize", "u32").registerUniform("axisDimLimit", "i32").registerUniform("axis", "u32").declareVariables(m, f, y)}
      ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${v}
      }`;
        };
      return {
        name: "Gather",
        shaderCache: {
          hint: t.cacheKey,
          inputDependencies: ["rank", "rank"]
        },
        getRunData: () => ({
          outputs: [{
            dims: o,
            dataType: e[0].dataType
          }],
          dispatchGroup: {
            x: Math.ceil(d / 64)
          },
          programUniforms: u
        }),
        getShaderSource: h
      };
    }, Q3r = e => lh({
      axis: e.axis
    }), Y3r = (e, t) => {
      let n = e.inputs;
      jkn(n), e.compute(Dkn(e.inputs, t));
    };
  }),
  Lkn,
  X3r,
  J3r,
  hNo = Wi(() => {
    ol(), Wl(), cc(), Lkn = (e, t, n, r, a, i, o, s, l) => {
      let d = [{
          type: 12,
          data: i
        }, {
          type: 12,
          data: r
        }, {
          type: 12,
          data: a
        }, {
          type: 12,
          data: n
        }, {
          type: 12,
          data: o
        }, {
          type: 12,
          data: s
        }, {
          type: 12,
          data: l
        }],
        u = [i];
      d.push(...gs(t.dims, u));
      let h = p => {
        let m = bi("indices_data", t.dataType, t.dims.length),
          f = is("input_slice_offsets_data", 12, 1, 1),
          y = [m, f],
          b = [{
            name: "output_size",
            type: "u32"
          }, {
            name: "batch_dims",
            type: "u32"
          }, {
            name: "input_dims",
            type: "u32",
            length: a.length
          }, {
            name: "sizes_from_slice_dims_data",
            type: "u32",
            length: n.length
          }, {
            name: "num_slices_per_batch",
            type: "u32"
          }, {
            name: "input_batch_stride",
            type: "u32"
          }, {
            name: "num_slice_dims",
            type: "u32"
          }];
        return `
  ${p.registerUniforms(b).declareVariables(...y)}
  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${a.length === 1 ? "index += i32(uniforms.input_dims);" : "index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${n.length === 1 ? "relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);" : "relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`;
      };
      return e.compute({
        name: "computeSliceOffsets",
        shaderCache: {
          hint: `${a.length}_${n.length}`,
          inputDependencies: ["rank"]
        },
        getRunData: () => ({
          outputs: [{
            dims: u,
            dataType: e.inputs[1].dataType
          }],
          dispatchGroup: {
            x: Math.ceil(i / 64)
          },
          programUniforms: d
        }),
        getShaderSource: h
      }, {
        inputs: [t],
        outputs: [-1]
      })[0];
    }, X3r = (e, t) => {
      let n = e.inputs,
        r = n[0].dims,
        a = n[0].dataType,
        i = n[1].dims,
        o = i[i.length - 1],
        s = si.sizeToDimension(i, i.length - 1),
        l = si.sizeFromDimension(r, t.batchDims + o),
        d = si.sizeToDimension(r, t.batchDims),
        u = si.sizeFromDimension(r, t.batchDims),
        h = s / d,
        p = new Array(o),
        m = l;
      for (let k = 0; k < o; ++k) p[o - 1 - k] = m, m *= r[t.batchDims + o - 1 - k];
      let f = Lkn(e, n[1], p, t.batchDims, r, s, h, u, o),
        y = t.batchDims + o;
      if (y > r.length) throw new Error("last dimension of indices must not be larger than rank of input tensor");
      let b = i.slice(0, -1).concat(r.slice(y)),
        v = si.size(b),
        _ = [{
          type: 12,
          data: v
        }, {
          type: 12,
          data: l
        }, ...gs(n[0].dims, f.dims, b)],
        w = k => {
          let A = bi("data", n[0].dataType, n[0].dims.length),
            S = bi("slice_offsets", 12, f.dims.length),
            C = is("output", n[0].dataType, b.length);
          return `
          ${k.registerUniform("output_size", "u32").registerUniform("slice_size", "u32").declareVariables(A, S, C)}
            ${k.mainStart()}
            ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`;
        };
      e.compute({
        name: "GatherND",
        shaderCache: {
          hint: t.cacheKey,
          inputDependencies: ["rank", "rank"]
        },
        getRunData: () => ({
          outputs: [{
            dims: b,
            dataType: a
          }],
          dispatchGroup: {
            x: Math.ceil(v / 64)
          },
          programUniforms: _
        }),
        getShaderSource: w
      }, {
        inputs: [n[0], f]
      });
    }, J3r = e => ({
      batchDims: e.batch_dims,
      cacheKey: ""
    });
  }),
  Okn,
  Bkn,
  Z3r,
  e4r,
  pNo = Wi(() => {
    ol(), Wl(), wg(), cc(), Okn = (e, t) => {
      if (e.length < 3 || e.length > 4) throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");
      let n = si.normalizeAxis(t.quantizeAxis, e[0].dims.length),
        r = t.blockSize,
        a = e[0],
        i = e[2],
        o = e.length === 4 ? e[3] : void 0;
      if (i.dims.length !== a.dims.length || !a.dims.map((s, l) => l === n ? Math.ceil(s / r) === i.dims[l] : s === i.dims[l]).reduce((s, l) => s && l, !0)) throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");
      if (o) {
        if (o.dataType !== a.dataType) throw new Error("Zero point must have the same data type as the input tensor.");
        if (o.dims.length !== i.dims.length || !o.dims.map((s, l) => s === i.dims[l]).reduce((s, l) => s && l, !0)) throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.");
      }
    }, Bkn = (e, t) => {
      let n = e[0].dims,
        r = e[1].dims,
        a = n.length,
        i = si.normalizeAxis(t.gatherAxis, a),
        o = si.normalizeAxis(t.quantizeAxis, a),
        s = n.slice(0);
      s.splice(i, 1, ...r);
      let l = si.size(s),
        d = e[2].dataType,
        u = e[0].dataType === 22,
        h = [{
          type: 12,
          data: l
        }, {
          type: 12,
          data: o
        }, {
          type: 12,
          data: i
        }, {
          type: 12,
          data: t.blockSize
        }, ...gs(...e.map((m, f) => m.dims), s)],
        p = m => {
          let f = bi("data", e[0].dataType, e[0].dims.length),
            y = bi("inputIndices", e[1].dataType, e[1].dims.length),
            b = bi("scales", e[2].dataType, e[2].dims.length),
            v = e.length > 3 ? bi("zeroPoint", e[3].dataType, e[3].dims.length) : void 0,
            _ = is("output", d, s.length),
            w = [f, y, b];
          v && w.push(v);
          let k = [{
            name: "output_size",
            type: "u32"
          }, {
            name: "quantize_axis",
            type: "u32"
          }, {
            name: "gather_axis",
            type: "u32"
          }, {
            name: "block_size",
            type: "u32"
          }];
          return `
        ${m.registerUniforms(k).declareVariables(...w, _)}
        ${m.mainStart()}
        let output_indices = ${_.offsetToIndices("global_idx")};
        var indices_indices = ${y.type.indices}(0);
        ${r.length > 1 ? `
          for (var i: u32 = 0; i < ${r.length}; i++) {
            let index = ${_.indicesGet("output_indices", "uniforms.gather_axis + i")};
            ${y.indicesSet("indices_indices", "i", "index")};
          }` : `indices_indices = ${_.indicesGet("output_indices", "uniforms.gather_axis")};`};
        var data_indices = ${f.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${_.indicesGet("output_indices", "i")};
          ${f.indicesSet("data_indices", "i", "index")};
        }
        var index_from_indices = ${y.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${n[i]};
        }
        ${f.indicesSet("data_indices", "uniforms.gather_axis", "u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${s.length}; i++) {
          let index = ${_.indicesGet("output_indices", `i + ${r.length} - 1`)};
          ${f.indicesSet("data_indices", "i", "index")};
        }
        let data_offset = ${f.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${f.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${u ? "unpack4xI8" : "unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${b.indicesGet("data_indices", "uniforms.quantize_axis")} / uniforms.block_size;
        ${b.indicesSet("scale_indices", "uniforms.quantize_axis", "quantize_axis_index")};
        var scale = ${b.getByIndices("scale_indices")};
        ${v ? `
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${v.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${v.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${u ? "unpack4xI8" : "unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];` : "var zero_point = 0"};
        let dequantized_data = ${Ww(d)}(quantized_data - zero_point) * scale;
        ${_.setByOffset("global_idx", "dequantized_data")};
    }`;
        };
      return {
        name: "GatherBlockQuantized",
        shaderCache: {
          hint: `${t.cacheKey};${e.filter((m, f) => f !== 1).map(m => m.dims.join("_")).join(";")}`,
          inputDependencies: Array.from({
            length: e.length
          }, (m, f) => "rank")
        },
        getRunData: () => ({
          outputs: [{
            dims: s,
            dataType: d
          }],
          dispatchGroup: {
            x: Math.ceil(l / 64)
          },
          programUniforms: h
        }),
        getShaderSource: p
      };
    }, Z3r = (e, t) => {
      let n = e.inputs;
      Okn(n, t), e.compute(Bkn(e.inputs, t));
    }, e4r = e => lh({
      blockSize: e.blockSize,
      gatherAxis: e.gatherAxis,
      quantizeAxis: e.quantizeAxis
    });
  }),
  Fkn,
  zkn,
  t4r,
  n4r,
  mNo = Wi(() => {
    ol(), Wl(), wg(), cc(), Fkn = e => {
      if (!e || e.length !== 2) throw new Error("GatherElements requires 2 inputs.");
      if (e[0].dims.length < 1) throw new Error("GatherElements requires that the data input be rank >= 1.");
      if (e[0].dims.length !== e[1].dims.length) throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`);
    }, zkn = (e, t) => {
      let n = e[0].dims,
        r = e[0].dataType,
        a = n.length,
        i = e[1].dims,
        o = e[1].dataType,
        s = si.normalizeAxis(t.axis, a),
        l = n[s],
        d = i.slice(0),
        u = si.size(d),
        h = bi("input", r, a),
        p = bi("indicesInput", o, i.length),
        m = is("output", r, d.length),
        f = [{
          type: 12,
          data: u
        }, {
          type: 6,
          data: l
        }, {
          type: 12,
          data: s
        }];
      return f.push(...gs(n, i, d)), {
        name: "GatherElements",
        shaderCache: {
          inputDependencies: ["rank", "rank"]
        },
        getRunData: () => ({
          outputs: [{
            dims: d,
            dataType: e[0].dataType
          }],
          dispatchGroup: {
            x: Math.ceil(u / 64)
          },
          programUniforms: f
        }),
        getShaderSource: y => `
      ${y.registerUniform("outputSize", "u32").registerUniform("axisDimLimit", "i32").registerUniform("axis", "u32").declareVariables(h, p, m)}
      ${y.mainStart()}
      ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${m.offsetToIndices("global_idx")};

      var idx = ${p.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${h.type.indices}(outputIndices);
      ${h.indicesSet("inputIndices", "uniforms.axis", "u32(idx)")};
      let value = ${h.getByIndices("inputIndices")};

      ${m.setByOffset("global_idx", "value")};
  }`
      };
    }, t4r = e => lh({
      axis: e.axis
    }), n4r = (e, t) => {
      let n = e.inputs;
      Fkn(n), e.compute(zkn(e.inputs, t));
    };
  }),
  Ukn,
  $kn,
  r4r,
  a4r,
  fNo = Wi(() => {
    ol(), Wl(), cc(), Ukn = e => {
      if (!e) throw new Error("Input is missing");
      if (e.length < 2 || e.length > 3) throw new Error("Invaid input number.");
      if (e.length === 3 && e[2].dims.length > 2) throw new Error("Invalid input shape of C");
      if (e[0].dataType !== e[1].dataType || e.length === 3 && e[0].dataType !== e[2].dataType) throw new Error("Input types are mismatched");
    }, $kn = (e, t) => {
      let n = e[0].dims.slice(),
        r = e[1].dims.slice(),
        [a, i, o] = iSr.getShapeOfGemmResult(n, t.transA, r, t.transB, e.length === 3 ? e[2].dims : void 0),
        s = [a, i];
      if (!s) throw new Error("Can't use gemm on the given tensors");
      let l = 16,
        d = Math.ceil(i / l),
        u = Math.ceil(a / l),
        h = !0,
        p = si.size(s),
        m = [{
          type: 12,
          data: h ? d : p
        }, {
          type: 12,
          data: a
        }, {
          type: 12,
          data: i
        }, {
          type: 12,
          data: o
        }, {
          type: 1,
          data: t.alpha
        }, {
          type: 1,
          data: t.beta
        }],
        f = ["type", "type"];
      e.length === 3 && (m.push(...gs(e[2].dims)), f.push("rank")), m.push(...gs(s));
      let y = v => {
          let _ = "";
          t.transA && t.transB ? _ = "value += a[k * uniforms.M + m] * b[n * uniforms.K + k];" : t.transA && !t.transB ? _ = "value += a[k * uniforms.M + m] * b[k * uniforms.N + n];" : !t.transA && t.transB ? _ = "value += a[m * uniforms.K + k] * b[n * uniforms.K + k];" : !t.transA && !t.transB && (_ = "value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");
          let w = t.alpha === 1 ? "" : "value *= uniforms.alpha;",
            k = bi("a", e[0].dataType, e[0].dims),
            A = bi("b", e[1].dataType, e[1].dims),
            S = k.type.value,
            C = null,
            I = [k, A];
          e.length === 3 && (C = bi("c", e[2].dataType, e[2].dims.length), I.push(C));
          let E = is("output", e[0].dataType, s.length);
          I.push(E);
          let M = [{
            name: "output_size",
            type: "u32"
          }, {
            name: "M",
            type: "u32"
          }, {
            name: "N",
            type: "u32"
          }, {
            name: "K",
            type: "u32"
          }, {
            name: "alpha",
            type: "f32"
          }, {
            name: "beta",
            type: "f32"
          }];
          return `
  ${v.registerUniforms(M).declareVariables(...I)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${S}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${_}
    }

    ${w}
    ${C != null ? `let cOffset = ${C.broadcastedIndicesToOffset("vec2(m, n)", E)}; value += ${S}(uniforms.beta) * ${C.getByOffset("cOffset")};` : ""}
    output[global_idx] = value;
  }`;
        },
        b = v => {
          let _ = bi("a", e[0].dataType, e[0].dims),
            w = bi("b", e[1].dataType, e[1].dims),
            k = null,
            A = [_, w];
          e.length === 3 && (k = bi("c", e[2].dataType, e[2].dims.length), A.push(k));
          let S = is("output", e[0].dataType, s.length);
          A.push(S);
          let C = [{
              name: "num_tile_n",
              type: "u32"
            }, {
              name: "M",
              type: "u32"
            }, {
              name: "N",
              type: "u32"
            }, {
              name: "K",
              type: "u32"
            }, {
              name: "alpha",
              type: "f32"
            }, {
              name: "beta",
              type: "f32"
            }],
            I = "",
            E = "";
          t.transA && t.transB ? (E = `
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${_.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${w.type.value}(0);
      }
      `, I = "value += tile_a[k][local_id.y] * tile_b[local_id.x][k];") : t.transA && !t.transB ? (E = `
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${_.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${w.type.value}(0);
      }
      `, I = "value += tile_a[k][local_id.y] * tile_b[k][local_id.x];") : !t.transA && t.transB ? (E = `
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${_.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${w.type.value}(0);
      }
      `, I = "value += tile_a[local_id.y][k] * tile_b[local_id.x][k];") : !t.transA && !t.transB && (E = `
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${_.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${w.type.value}(0);
      }
      `, I = "value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");
          let M = t.alpha === 1 ? "" : "value *= uniforms.alpha;";
          return `
  ${v.registerUniforms(C).declareVariables(...A)}
  var<workgroup> tile_a: array<array<${_.type.storage}, ${l}>, ${l}>;
  var<workgroup> tile_b: array<array<${w.type.storage}, ${l}>, ${l}>;
  ${v.mainStart([l, l, 1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${l};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${l};
    let num_tiles = (uniforms.K - 1) / ${l} + 1;
    var k_start = 0u;
    var value = ${S.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${E}
      k_start = k_start + ${l};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${l}; k++) {
        ${I}
      }
      workgroupBarrier();
    }

    ${M}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${k != null ? `let cOffset = ${k.broadcastedIndicesToOffset("vec2(m, n)", S)}; value += ${S.type.value}(uniforms.beta) * ${k.getByOffset("cOffset")};` : ""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`;
        };
      return h ? {
        name: "GemmShared",
        shaderCache: {
          hint: `${t.cacheKey}`,
          inputDependencies: f
        },
        getRunData: () => ({
          outputs: [{
            dims: s,
            dataType: e[0].dataType
          }],
          dispatchGroup: {
            x: d * u
          },
          programUniforms: m
        }),
        getShaderSource: b
      } : {
        name: "Gemm",
        shaderCache: {
          hint: `${t.cacheKey}`,
          inputDependencies: f
        },
        getRunData: () => ({
          outputs: [{
            dims: s,
            dataType: e[0].dataType
          }],
          dispatchGroup: {
            x: Math.ceil(p / 64)
          },
          programUniforms: m
        }),
        getShaderSource: y
      };
    }, r4r = e => {
      let t = e.transA,
        n = e.transB,
        r = e.alpha,
        a = e.beta;
      return {
        transA: t,
        transB: n,
        alpha: r,
        beta: a,
        cacheKey: `${e.transA};${e.transB};${e.alpha === 1}`
      };
    }, a4r = (e, t) => {
      Ukn(e.inputs), e.compute($kn(e.inputs, t));
    };
  }),
  S8,
  uR,
  EV,
  TV,
  Gkn,
  Vkn,
  Hkn,
  Wkn,
  qkn,
  Kkn,
  Qkn,
  Ykn,
  i4r,
  o4r,
  gNo = Wi(() => {
    ol(), Wl(), wg(), cc(), [S8, uR, EV, TV] = [0, 1, 2, 3], Gkn = e => {
      if (e[0].dims.length !== 4) throw new Error("only 4-D tensor is supported.");
      if (e[0].dims.length !== e[1].dims.length) throw new Error("input dimensions must be equal to grid dimensions");
      if (e[0].dims.length - 2 !== e[1].dims[e[1].dims.length - 1]) throw new Error(`last dimension of grid must be equal to ${e[0].dims.length - 2}`);
      if (e[0].dims[0] !== e[1].dims[0]) throw new Error("grid batch size must match input batch size");
    }, Vkn = `
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`, Hkn = e => `
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`, Wkn = e => `
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners === 0 ? `
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    ` : `
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`, qkn = e => `
  ${e.paddingMode === "reflection" ? `
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }` : ""}
`, Kkn = (e, t, n) => `
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${S8}] = batch;
     indices[${uR}] = channel;` + (() => {
      switch (n.paddingMode) {
        case "zeros":
          return `
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${EV}] = u32(r);
            indices[${TV}] = u32(c);
          }
        `;
        case "border":
          return `
          indices[${EV}] = u32(clamp(r, 0, H - 1));
          indices[${TV}] = u32(clamp(c, 0, W - 1));
        `;
        case "reflection":
          return `
          indices[${EV}] = gs_reflect(r, border[1], border[3]);
          indices[${TV}] = gs_reflect(c, border[0], border[2]);
        `;
        default:
          throw new Error(`padding mode ${n.paddingMode} is not supported`);
      }
    })() + `
    return ${e.getByIndices("indices")};
  }
`, Qkn = (e, t, n) => (() => {
      switch (n.mode) {
        case "nearest":
          return `
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${S8}], indices[${uR}], border);
        `;
        case "bilinear":
          return `
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${S8}], indices[${uR}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${S8}], indices[${uR}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${S8}], indices[${uR}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${S8}], indices[${uR}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;
        case "bicubic":
          return `
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${S8}], indices[${uR}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;
        default:
          throw new Error(`mode ${n.mode} is not supported`);
      }
    })() + `${e.setByOffset("global_idx", "result")}`, Ykn = (e, t) => {
      let n = bi("x", e[0].dataType, e[0].dims.length),
        r = [e[1].dims[0], e[1].dims[1], e[1].dims[2]],
        a = bi("grid", e[1].dataType, r.length, 2),
        i = [e[0].dims[0], e[0].dims[1], e[1].dims[1], e[1].dims[2]];
      t.format === "NHWC" && (i = [e[0].dims[0], e[1].dims[1], e[1].dims[2], e[0].dims[3]], [S8, uR, EV, TV] = [0, 3, 1, 2]);
      let o = is("output", e[0].dataType, i.length),
        s = n.type.value,
        l = si.size(i),
        d = [{
          type: 12,
          data: l
        }, ...gs(e[0].dims, r, i)],
        u = h => `
  ${h.registerUniform("output_size", "u32").declareVariables(n, a, o)}
  ${Vkn}
  ${Hkn(s)}
  ${Wkn(t)}
  ${qkn(t)}
  ${Kkn(n, s, t)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${EV}]);
      let W_in = i32(uniforms.x_shape[${TV}]);

      ${t.alignCorners === 0 ? `
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      ` : `
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${o.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${S8}], indices[${EV}], indices[${TV}]);
      let nxy = ${a.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Qkn(o, s, t)}
  }`;
      return {
        name: "GridSample",
        shaderCache: {
          hint: `${t.cacheKey}`,
          inputDependencies: ["type", "type"]
        },
        getRunData: h => {
          let p = si.size(i);
          return {
            outputs: [{
              dims: i,
              dataType: h[0].dataType
            }],
            dispatchGroup: {
              x: Math.ceil(p / 64)
            },
            programUniforms: d
          };
        },
        getShaderSource: u
      };
    }, i4r = (e, t) => {
      Gkn(e.inputs), e.compute(Ykn(e.inputs, t));
    }, o4r = e => lh({
      alignCorners: e.align_corners,
      mode: e.mode,
      paddingMode: e.padding_mode,
      format: e.format
    });
  }),
  t2,
  Xkn,
  s4r,
  hht,
  Jkn,
  pbe,
  l4r,
  c4r = Wi(() => {
    ol(), Wl(), wg(), XGt(), eVt(), cc(), wG(), t2 = (e, t) => e.length > t && e[t].dims.length > 0 ? e[t] : void 0, Xkn = (e, t) => {
      let n = e[0],
        r = t2(e, 1),
        a = t2(e, 2),
        i = t2(e, 3),
        o = t2(e, 4),
        s = t2(e, 5),
        l = t2(e, 6),
        d = t2(e, 7);
      if (n.dims.length !== 3 && n.dims.length !== 5) throw new Error("Input query is expected to have 3 or 5 dimensions");
      let u = n.dims[0],
        h = n.dims[1],
        p = n.dims.length === 3 ? n.dims[2] : t.numHeads * n.dims[4],
        m = h,
        f = 0,
        y = 0,
        b = Math.floor(p / t.numHeads);
      if (l && d && si.size(l.dims) && si.size(d.dims)) {
        if (l.dims.length !== 4) throw new Error('Input "past_key" is expected to have 4 dimensions');
        if (l.dims[0] !== u || l.dims[1] !== t.numHeads || l.dims[3] !== b) throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');
        if (d.dims[0] !== u || d.dims[1] !== t.numHeads || d.dims[3] !== b) throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');
        if (l.dims[2] !== d.dims[2]) throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');
        if (d.dims.length !== 4) throw new Error('Input "past_value" is expected to have 4 dimensions');
        f = l.dims[2], y = l.dims[2];
      } else if (l && si.size(l.dims) || d && si.size(d.dims)) throw new Error('Input "past_key" and "past_value" shall be both present or both absent');
      let v;
      if (r && si.size(r.dims) > 0) {
        if (n.dims.length !== 3) throw new Error('Input "query" is expected to have 3 dimensions when key is given');
        if (r.dims.length < 3 || r.dims.length > 5) throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');
        if (n.dims[0] !== r.dims[0]) throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');
        if (r.dims.length === 3) {
          if (r.dims[2] !== n.dims[2]) throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');
          v = 2, m = r.dims[1];
        } else if (r.dims.length === 5) {
          if (r.dims[2] !== t.numHeads || r.dims[3] !== 2 || r.dims[4] !== b) throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');
          if (a) throw new Error('Expect "value" be none when "key" has packed kv format.');
          v = 5, m = r.dims[1];
        } else {
          if (r.dims[1] !== t.numHeads || r.dims[3] !== b) throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');
          v = 0, m = r.dims[2];
        }
      } else {
        if (n.dims.length !== 5) throw new Error('Input "query" is expected to have 5 dimensions when key is empty');
        if (n.dims[2] !== t.numHeads || n.dims[3] !== 3) throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');
        v = 3;
      }
      if (i && si.size(i.dims) > 0) {
        if (i.dims.length !== 1) throw new Error('Input "bias" is expected to have 1 dimension');
        if (r && r.dims.length === 5 && r.dims[3] === 2) throw new Error("bias is not allowed for packed kv.");
      }
      let _ = f + m,
        w = 0;
      if (o && si.size(o.dims) > 0) {
        w = 8;
        let C = o.dims;
        throw C.length === 1 ? C[0] === u ? w = 1 : C[0] === 3 * u + 2 && (w = 3) : C.length === 2 && C[0] === u && C[1] === _ && (w = 5), w === 8 ? new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)') : new Error("Mask not supported");
      }
      let k = !1,
        A = p;
      if (a && si.size(a.dims) > 0) {
        if (a.dims.length !== 3 && a.dims.length !== 4) throw new Error('Input "value" is expected to have 3 or 4 dimensions');
        if (n.dims[0] !== a.dims[0]) throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');
        if (a.dims.length === 3) {
          if (m !== a.dims[1]) throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');
          A = a.dims[2];
        } else {
          if (m !== a.dims[2]) throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');
          A = a.dims[1] * a.dims[3], k = !0;
        }
      }
      let S = !1;
      if (o && si.size(o.dims) > 0) throw new Error("Key padding mask is not supported");
      if (s && si.size(s.dims) > 0) {
        if (s.dims.length !== 4) throw new Error('Input "attention_bias" is expected to have 4 dimensions');
        if (s.dims[0] !== u || s.dims[1] !== t.numHeads || s.dims[2] !== h || s.dims[3] !== _) throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)');
      }
      return {
        batchSize: u,
        sequenceLength: h,
        pastSequenceLength: f,
        kvSequenceLength: m,
        totalSequenceLength: _,
        maxSequenceLength: y,
        inputHiddenSize: 0,
        hiddenSize: p,
        vHiddenSize: A,
        headSize: b,
        vHeadSize: Math.floor(A / t.numHeads),
        numHeads: t.numHeads,
        isUnidirectional: !1,
        pastPresentShareBuffer: !1,
        maskFilterValue: t.maskFilterValue,
        maskType: w,
        scale: t.scale,
        broadcastResPosBias: S,
        passPastInKv: k,
        qkvFormat: v
      };
    }, s4r = e => lh({
      ...e
    }), hht = lh({
      perm: [0, 2, 1, 3]
    }), Jkn = (e, t, n, r, a, i, o) => {
      let s = [r, a, i],
        l = si.size(s),
        d = [{
          type: 12,
          data: l
        }, {
          type: 12,
          data: o
        }, {
          type: 12,
          data: i
        }],
        u = h => {
          let p = is("qkv_with_bias", t.dataType, s),
            m = bi("qkv", t.dataType, s),
            f = bi("bias", n.dataType, s),
            y = [{
              name: "output_size",
              type: "u32"
            }, {
              name: "bias_offset",
              type: "u32"
            }, {
              name: "hidden_size",
              type: "u32"
            }];
          return `
  ${h.registerUniforms(y).declareVariables(m, f, p)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`;
        };
      return e.compute({
        name: "MultiHeadAttentionAddBias",
        shaderCache: {
          inputDependencies: ["type", "type"]
        },
        getRunData: () => ({
          outputs: [{
            dims: s,
            dataType: t.dataType,
            gpuDataType: 0
          }],
          dispatchGroup: {
            x: Math.ceil(l / 64)
          },
          programUniforms: d
        }),
        getShaderSource: u
      }, {
        inputs: [t, n],
        outputs: [-1]
      })[0];
    }, pbe = (e, t, n, r, a, i, o, s) => {
      let l = i;
      if (o && si.size(o.dims) > 0) {
        if (r === 1) throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");
        return l = Jkn(e, i, o, t, r, n * a, s), l = l.reshape([t, r, n, a]), n === 1 || r === 1 ? l : e.compute(t3(l, hht.perm), {
          inputs: [l],
          outputs: [-1]
        })[0];
      } else return i.dims.length === 3 && (l = i.reshape([t, r, n, a])), n === 1 || r === 1 ? l : e.compute(t3(l, hht.perm), {
        inputs: [l],
        outputs: [-1]
      })[0];
    }, l4r = (e, t) => {
      let n = Xkn(e.inputs, t),
        r = e.inputs[0],
        a = t2(e.inputs, 1),
        i = t2(e.inputs, 2),
        o = t2(e.inputs, 3),
        s = t2(e.inputs, 4),
        l = t2(e.inputs, 5),
        d = t2(e.inputs, 6),
        u = t2(e.inputs, 7);
      if (r.dims.length === 5) throw new Error("Packed QKV is not implemented");
      if ((a == null ? void 0 : a.dims.length) === 5) throw new Error("Packed KV is not implemented");
      let h = a && i && a.dims.length === 4 && i.dims.length === 4,
        p = pbe(e, n.batchSize, n.numHeads, n.sequenceLength, n.headSize, r, o, 0);
      if (h) return eSe(e, p, a, i, s, void 0, d, u, l, n);
      if (!a || !i) throw new Error("key and value must be provided");
      let m = pbe(e, n.batchSize, n.numHeads, n.kvSequenceLength, n.headSize, a, o, n.hiddenSize),
        f = pbe(e, n.batchSize, n.numHeads, n.kvSequenceLength, n.vHeadSize, i, o, 2 * n.hiddenSize);
      eSe(e, p, m, f, s, void 0, d, u, l, n);
    };
  }),
  Zkn,
  eAn,
  tAn,
  nAn,
  C4t,
  d4r,
  u4r,
  h4r = Wi(() => {
    ol(), Wl(), wg(), cc(), Zkn = e => {
      if (!e || e.length < 1) throw new Error("too few inputs");
    }, eAn = (e, t) => {
      let n = [],
        r = t.numOutputs;
      return e[1].dims[0] > 0 && (e[1].getBigInt64Array().forEach(a => n.push(Number(a))), r = n.length), lh({
        numOutputs: r,
        axis: t.axis,
        splitSizes: n
      });
    }, tAn = e => `
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${ds("uniforms.size_in_split_axis", "i", e)}) {
        return i;
    }
    }
    return ${e}u;
}`, nAn = e => {
      let t = e.length,
        n = [];
      for (let r = 0; r < t; ++r) {
        let a = e[r].setByIndices("indices", "input[global_idx]");
        t === 1 ? n.push(a) : r === 0 ? n.push(`if (output_number == ${r}u) { ${a} }`) : r === t - 1 ? n.push(`else { ${a} }`) : n.push(`else if (output_number == ${r}) { ${a} }`);
      }
      return `
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`;
    }, C4t = (e, t) => {
      let n = e[0].dims,
        r = si.size(n),
        a = e[0].dataType,
        i = si.normalizeAxis(t.axis, n.length),
        o = new Array(t.numOutputs),
        s = bi("input", a, n.length),
        l = new Array(t.numOutputs),
        d = [],
        u = [],
        h = 0,
        p = [{
          type: 12,
          data: r
        }];
      for (let f = 0; f < t.numOutputs; f++) {
        h += t.splitSizes[f], l[f] = h;
        let y = n.slice();
        y[i] = t.splitSizes[f], u.push(y), o[f] = is(`output${f}`, a, y.length), d.push({
          dims: u[f],
          dataType: e[0].dataType
        });
      }
      p.push({
        type: 12,
        data: l
      }, ...gs(n, ...u));
      let m = f => `
  ${f.registerUniform("input_size", "u32").registerUniform("size_in_split_axis", "u32", l.length).declareVariables(s, ...o)}
  ${tAn(l.length)}
  ${nAn(o)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${s.offsetToIndices("global_idx")};
    var index = ${s.indicesGet("indices", i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${ds("uniforms.size_in_split_axis", "output_number - 1u", l.length)};
      ${s.indicesSet("indices", i, "index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;
      return {
        name: "Split",
        shaderCache: {
          hint: t.cacheKey,
          inputDependencies: ["rank"]
        },
        getShaderSource: m,
        getRunData: () => ({
          outputs: d,
          dispatchGroup: {
            x: Math.ceil(r / 64)
          },
          programUniforms: p
        })
      };
    }, d4r = (e, t) => {
      Zkn(e.inputs);
      let n = e.inputs.length === 1 ? t : eAn(e.inputs, t);
      e.compute(C4t(e.inputs, n), {
        inputs: [0]
      });
    }, u4r = e => {
      let t = e.axis,
        n = e.splitSizes,
        r = e.numOutputs < 0 ? n.length : e.numOutputs;
      if (r !== n.length) throw new Error("numOutputs and splitSizes lengh must be equal");
      return lh({
        axis: t,
        numOutputs: r,
        splitSizes: n
      });
    };
  }),
  rAn,
  aAn,
  pht,
  p4r,
  yNo = Wi(() => {
    wg(), eVt(), c4r(), h4r(), wG(), rAn = (e, t) => {
      if (t.doRotary) throw new Error("GroupQuerryAttention do_rotary attribute is not supported");
      if (t.doRotary && e.length <= 7) throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");
      let n = e[0],
        r = e[1],
        a = e[2],
        i = e[3],
        o = e[4];
      if (t.localWindowSize !== -1) throw new Error("Local attention is not supported");
      if (t.softcap !== 0) throw new Error("Softcap is not supported");
      if (t.rotaryInterleaved !== 0) throw new Error("Rotary interleaved is not supported");
      if (t.smoothSoftmax) throw new Error("Smooth softmax is not supported");
      if (n.dims.length !== 3 && n.dims.length !== 5) throw new Error("Input query is expected to have 3 or 5 dimensions");
      let s = !1,
        l = n.dims[0],
        d = n.dims[1],
        u = n.dims.length === 3 ? s ? n.dims[2] / 3 : n.dims[2] : t.numHeads * n.dims[4],
        h = d,
        p = 0,
        m = !r || r.dims.length === 0,
        f = Math.floor(m ? u / (t.numHeads + 2 * t.kvNumHeads) : u / t.numHeads);
      m && (u = f * t.numHeads);
      let y = i && i.dims.length !== 0,
        b = o && o.dims.length !== 0;
      if (y && i.dims.length === 4 && i.dims[0] === l && i.dims[1] !== t.kvNumHeads && i.dims[2] === t.kvNumHeads && i.dims[3] === f) throw new Error("BSNH pastKey/pastValue is not supported");
      if (y && b) {
        if (i.dims.length !== 4) throw new Error('Input "past_key" is expected to have 4 dimensions');
        if (o.dims.length !== 4) throw new Error('Input "past_value" is expected to have 4 dimensions');
        p = i.dims[2];
      } else if (y || b) throw new Error('Input "past_key" and "past_value" shall be both present or both absent');
      let v = 1;
      if (r && r.dims.length > 0) {
        if (n.dims.length !== 3) throw new Error('Input "query" is expected to have 3 dimensions when key is given');
        if (r.dims.length < 3 || r.dims.length > 5) throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');
        if (n.dims[0] !== r.dims[0]) throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');
        if (r.dims.length === 3) {
          if (n.dims[2] % r.dims[2] !== 0) throw new Error('Dimension 2 of "query" should be a multiple of "key"');
          h = r.dims[1];
        } else if (r.dims.length === 5) {
          if (r.dims[2] !== t.numHeads || r.dims[3] !== 2 || r.dims[4] !== f) throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');
          if (a) throw new Error('Expect "value" be none when "key" has packed kv format.');
          h = r.dims[1];
        } else {
          if (r.dims[1] !== t.numHeads || r.dims[3] !== f) throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');
          h = r.dims[2];
        }
      } else {
        if (n.dims.length !== 3 && n.dims.length !== 5) throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');
        if (n.dims.length === 5 && (n.dims[2] !== t.numHeads || n.dims[3] !== 3)) throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');
        v = 3;
      }
      let _ = 0,
        w = !1,
        k = t.kvNumHeads ? f * t.kvNumHeads : u;
      if (a && a.dims.length > 0) {
        if (a.dims.length !== 3 && a.dims.length !== 4) throw new Error('Input "value" is expected to have 3 or 4 dimensions');
        if (n.dims[0] !== a.dims[0]) throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');
        if (a.dims.length === 3) {
          if (h !== a.dims[1]) throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');
          k = a.dims[2];
        } else {
          if (h !== a.dims[2]) throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');
          k = a.dims[1] * a.dims[3], w = !0;
        }
      }
      let A = e.length > 4 ? e[5] : void 0;
      if (A && A.dims.length !== 1 && A.dims[0] !== l) throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');
      return {
        batchSize: l,
        sequenceLength: d,
        pastSequenceLength: p,
        kvSequenceLength: h,
        totalSequenceLength: -1,
        maxSequenceLength: -1,
        inputHiddenSize: 0,
        hiddenSize: u,
        vHiddenSize: k,
        headSize: f,
        vHeadSize: Math.floor(k / t.kvNumHeads),
        numHeads: t.numHeads,
        kvNumHeads: t.kvNumHeads,
        nReps: t.numHeads / t.kvNumHeads,
        pastPresentShareBuffer: !1,
        maskType: _,
        scale: t.scale,
        broadcastResPosBias: !1,
        passPastInKv: w,
        qkvFormat: v
      };
    }, aAn = lh({
      perm: [0, 2, 1, 3]
    }), pht = (e, t, n) => {
      let r = t,
        a = n.kvNumHeads;
      return t.dims.length === 3 && n.kvSequenceLength !== 0 && (r = t.reshape([n.batchSize, n.kvSequenceLength, a, n.headSize]), r = e.compute(t3(r, aAn.perm), {
        inputs: [r],
        outputs: [-1]
      })[0]), r;
    }, p4r = (e, t) => {
      var b;
      let n = rAn(e.inputs, t);
      if (e.inputs[0].dims.length === 5) throw new Error("Packed QKV is not implemented");
      if (((b = e.inputs[1]) == null ? void 0 : b.dims.length) === 5) throw new Error("Packed KV is not implemented");
      let r = e.inputs[0],
        a = e.inputs[1] && e.inputs[1].dims.length > 0 ? e.inputs[1] : void 0,
        i = e.inputs[2] && e.inputs[2].dims.length > 0 ? e.inputs[2] : void 0,
        o = e.inputs[3] && e.inputs[3].dims.length !== 0 ? e.inputs[3] : void 0,
        s = e.inputs[4] && e.inputs[4].dims.length !== 0 ? e.inputs[4] : void 0,
        l = e.inputs.length > 4 ? e.inputs[5] : void 0,
        d = e.inputs.length > 5 ? e.inputs[6] : void 0,
        u = n.kvNumHeads ? n.kvNumHeads : n.numHeads,
        h = lh({
          axis: 2,
          numOutputs: 3,
          splitSizes: [n.numHeads * n.headSize, u * n.headSize, u * n.headSize]
        }),
        [p, m, f] = !a && !i ? e.compute(C4t([r], h), {
          inputs: [r],
          outputs: [-1, -1, -1]
        }) : [r, a, i],
        y = pbe(e, n.batchSize, n.numHeads, n.sequenceLength, n.headSize, p, void 0, 0);
      eSe(e, y, pht(e, m, n), pht(e, f, n), void 0, void 0, o, s, void 0, n, l, d);
    };
  }),
  mht,
  iAn,
  oAn,
  m4r,
  bNo = Wi(() => {
    ol(), Wl(), wG(), cc(), mht = (e, t, n, r, a, i, o, s) => {
      let l = wf(i),
        d = l === 1 ? "f32" : `vec${l}f`,
        u = l === 1 ? "vec2f" : `mat2x${l}f`,
        h = a * o,
        p = 64;
      h === 1 && (p = 256);
      let m = [a, o, i / l],
        f = [a, o, 2],
        y = ["rank", "type", "type"],
        b = [];
      b.push(...gs(m, f));
      let v = _ => {
        let w = bi("x", t.dataType, 3, l),
          k = bi("scale", n.dataType, n.dims),
          A = bi("bias", r.dataType, r.dims),
          S = is("output", 1, 3, 2),
          C = [w, k, A, S];
        return `
  var<workgroup> workgroup_shared : array<${u}, ${p}>;
  const workgroup_size = ${p}u;
  ${_.declareVariables(...C)}
  ${_.mainStart(p)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${d}(0);
    var squared_sum = ${d}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${d}(${w.get("batch", "channel", "h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${u}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${M$("workgroup_shared[0][0]", l)} / f32(hight * ${l});
      let squared_sum_final = ${M$("workgroup_shared[0][1]", l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${s}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`;
      };
      return e.compute({
        name: "InstanceNormComputeChannelScaleShift",
        shaderCache: {
          hint: `${l};${s};${p}`,
          inputDependencies: y
        },
        getRunData: () => ({
          outputs: [{
            dims: f,
            dataType: 1
          }],
          dispatchGroup: {
            x: h
          },
          programUniforms: b
        }),
        getShaderSource: v
      }, {
        inputs: [t, n, r],
        outputs: [-1]
      })[0];
    }, iAn = (e, t, n) => {
      let r = t[0].dims,
        a = r,
        i = 2,
        o = r[0],
        s = r[1],
        l = si.sizeFromDimension(r, i),
        d = wf(l),
        u = si.size(a) / d,
        h = mht(e, t[0], t[1], t[2], o, l, s, n.epsilon),
        p = [o, s, l / d],
        m = [o, s],
        f = ["type", "none"],
        y = b => {
          let v = bi("x", t[0].dataType, p.length, d),
            _ = bi("scale_shift", 1, m.length, 2),
            w = is("output", t[0].dataType, p.length, d),
            k = [v, _, w];
          return `
  ${b.registerUniform("output_size", "u32").declareVariables(...k)}
  ${b.mainStart()}
  ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${w.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${_.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${v.getByOffset("global_idx")} * ${w.type.value}(scale_shift.x) + ${w.type.value}(scale_shift.y);
      ${w.setByOffset("global_idx", "value")};
  }`;
        };
      e.compute({
        name: "InstanceNormalization",
        shaderCache: {
          hint: `${d}`,
          inputDependencies: f
        },
        getRunData: () => ({
          outputs: [{
            dims: a,
            dataType: t[0].dataType
          }],
          dispatchGroup: {
            x: Math.ceil(u / 64)
          },
          programUniforms: [{
            type: 12,
            data: u
          }, ...gs(p, m, p)]
        }),
        getShaderSource: y
      }, {
        inputs: [t[0], h]
      });
    }, oAn = (e, t, n) => {
      let r = t[0].dims,
        a = r,
        i = r[0],
        o = r[r.length - 1],
        s = si.sizeFromDimension(r, 1) / o,
        l = wf(o),
        d = si.size(a) / l,
        u = [{
          type: 12,
          data: s
        }, {
          type: 12,
          data: Math.floor(o / l)
        }],
        h = ["type", "type"],
        p = !1,
        m = [0, r.length - 1];
      for (let v = 0; v < r.length - 2; v++) p = p || r[v + 1] !== 1, m.push(v + 1);
      p = p && r[r.length - 1] !== 1;
      let f = p ? e.compute(t3(e.inputs[0], m), {
          inputs: [e.inputs[0]],
          outputs: [-1]
        })[0] : e.inputs[0].reshape(Array.from({
          length: r.length
        }, (v, _) => r[m[_]])),
        y = mht(e, f, t[1], t[2], i, s, o, n.epsilon),
        b = v => {
          let _ = Rb(t[0].dataType),
            w = l === 1 ? "vec2f" : `mat${l}x2f`,
            k = C => {
              let I = C === 0 ? "x" : "y",
                E = l === 1 ? "f32" : `vec${l}f`;
              switch (l) {
                case 1:
                  return `${_}(${E}(scale.${I}))`;
                case 2:
                  return `vec2<${_}>(${E}(scale[0].${I}, scale[1].${I}))`;
                case 4:
                  return `vec4<${_}>(${E}(scale[0].${I}, scale[1].${I}, scale[2].${I}, scale[3].${I}))`;
                default:
                  throw new Error(`Not supported compoents ${l}`);
              }
            },
            A = bi("input", t[0].dataType, t[0].dims, l),
            S = is("output", t[0].dataType, a, l);
          return `
  @group(0) @binding(0) var<storage, read> input : array<${A.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${w}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${S.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${v.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${k(0)}, ${k(1)});
  }`;
        };
      e.compute({
        name: "InstanceNormalizationNHWC",
        shaderCache: {
          hint: `${l}`,
          inputDependencies: h
        },
        getRunData: () => ({
          outputs: [{
            dims: a,
            dataType: t[0].dataType
          }],
          dispatchGroup: {
            x: Math.ceil(d / 64)
          },
          programUniforms: u
        }),
        getShaderSource: b
      }, {
        inputs: [t[0], y]
      });
    }, m4r = (e, t) => {
      t.format === "NHWC" ? oAn(e, e.inputs, t) : iAn(e, e.inputs, t);
    };
  }),
  sAn,
  lAn,
  f4r,
  vNo = Wi(() => {
    ol(), Wl(), cc(), sAn = e => {
      if (!e || e.length < 2) throw new Error("layerNorm requires at least 2 inputs.");
    }, lAn = (e, t, n) => {
      let r = t.simplified,
        a = e[0].dims,
        i = e[1],
        o = !r && e[2],
        s = a,
        l = si.normalizeAxis(t.axis, a.length),
        d = si.sizeToDimension(a, l),
        u = si.sizeFromDimension(a, l),
        h = si.size(i.dims),
        p = o ? si.size(o.dims) : 0;
      if (h !== u || o && p !== u) throw new Error(`Size of X.shape()[axis:] == ${u}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${h} and bias size of ${p}`);
      let m = [];
      for (let A = 0; A < a.length; ++A) A < l ? m.push(a[A]) : m.push(1);
      let f = wf(u),
        y = ["type", "type"],
        b = [{
          type: 12,
          data: d
        }, {
          type: 1,
          data: u
        }, {
          type: 12,
          data: Math.floor(u / f)
        }, {
          type: 1,
          data: t.epsilon
        }];
      o && y.push("type");
      let v = n > 1,
        _ = n > 2,
        w = A => {
          let S = Rb(e[0].dataType),
            C = [bi("x", e[0].dataType, e[0].dims, f), bi("scale", i.dataType, i.dims, f)];
          o && C.push(bi("bias", o.dataType, o.dims, f)), C.push(is("output", e[0].dataType, s, f)), v && C.push(is("mean_data_output", 1, m)), _ && C.push(is("inv_std_output", 1, m));
          let I = [{
            name: "norm_count",
            type: "u32"
          }, {
            name: "norm_size",
            type: "f32"
          }, {
            name: "norm_size_vectorized",
            type: "u32"
          }, {
            name: "epsilon",
            type: "f32"
          }];
          return `
  ${A.registerUniforms(I).declareVariables(...C)}
  ${A.mainStart()}
    ${A.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${b4t("f32", f)};
    var mean_square_vector = ${b4t("f32", f)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${uae(S, f, "x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${M$("mean_vector", f)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${M$("mean_square_vector", f)} / uniforms.norm_size ${r ? "" : "- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${uae(S, f, "x[j + offset]")};
      let f32scale = ${uae(S, f, "scale[j]")};
      output[j + offset] = ${C[0].type.value}((f32input ${r ? "" : "- mean"}) * inv_std_dev * f32scale
        ${o ? `+ ${uae(S, f, "bias[j]")}` : ""}
      );
    }

    ${v ? "mean_data_output[global_idx] = mean" : ""};
    ${_ ? "inv_std_output[global_idx] = inv_std_dev" : ""};
  }`;
        },
        k = [{
          dims: s,
          dataType: e[0].dataType
        }];
      return v && k.push({
        dims: m,
        dataType: 1
      }), _ && k.push({
        dims: m,
        dataType: 1
      }), {
        name: "LayerNormalization",
        shaderCache: {
          hint: `${f};${n};${r}`,
          inputDependencies: y
        },
        getRunData: () => ({
          outputs: k,
          dispatchGroup: {
            x: Math.ceil(d / 64)
          },
          programUniforms: b
        }),
        getShaderSource: w
      };
    }, f4r = (e, t) => {
      sAn(e.inputs), e.compute(lAn(e.inputs, t, e.outputCount));
    };
  }),
  cAn,
  g4r,
  wNo = Wi(() => {
    Wl(), iVt(), oVt(), cAn = e => {
      if (!e || e.length !== 2) throw new Error("MatMul requires 2 inputs.");
      if (e[0].dims[e[0].dims.length - 1] !== e[1].dims[e[1].dims.length - 2]) throw new Error("shared dimension does not match.");
    }, g4r = e => {
      cAn(e.inputs);
      let t = vue.calcShape(e.inputs[0].dims, e.inputs[1].dims, !0);
      if (!t) throw new Error("Can't use matmul on the given tensors");
      let n = t[t.length - 1],
        r = e.inputs[0].dims[e.inputs[0].dims.length - 1];
      if (n < 8 && r < 8) e.compute(aVt(e.inputs, {
        activation: ""
      }, t));else {
        let a = t[t.length - 2],
          i = si.size(e.inputs[0].dims.slice(0, -2)),
          o = si.size(e.inputs[1].dims.slice(0, -2));
        if (i !== 1 && a === 1 && o === 1) {
          let s = e.inputs[0].reshape([1, i, r]),
            l = e.inputs[1].reshape([1, r, n]),
            d = [1, i, n],
            u = [s, l];
          e.compute(MGe(u, {
            activation: ""
          }, t, d), {
            inputs: u
          });
        } else e.compute(MGe(e.inputs, {
          activation: ""
        }, t));
      }
    };
  }),
  dAn,
  uAn,
  hAn,
  y4r,
  b4r,
  xNo = Wi(() => {
    ol(), Wl(), wg(), cc(), dAn = (e, t) => {
      if (e.length < 3 || e.length > 4) throw new Error("MatMulNBits requires 3 or 4 inputs");
      let n = e[0],
        r = n.dims.length;
      if (n.dims[r - 1] !== t.k) throw new Error("The last dim of input shape does not match the k value");
      let a = Math.floor((t.k + t.blockSize - 1) / t.blockSize),
        i = t.blockSize / 8 * t.bits,
        o = e[1];
      if (!si.areEqual(o.dims, [t.n, a, i])) throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");
      let s = e[2].dims;
      if (si.size(s) !== t.n * a) throw new Error("scales input size error.");
      if (e.length === 4) {
        let l = e[3].dims,
          d = t.bits > 4 ? t.n * a : t.n * Math.floor((a + 1) / 2);
        if (si.size(l) !== d) throw new Error("zeroPoints input size error.");
      }
    }, uAn = (e, t) => {
      let n = e[0].dims,
        r = n.length,
        a = n[r - 2],
        i = t.k,
        o = t.n,
        s = n.slice(0, r - 2),
        l = si.size(s),
        d = e[1].dims[2] / 4,
        u = e[0].dataType,
        h = wf(t.k),
        p = wf(d),
        m = wf(o),
        f = s.concat([a, o]),
        y = a > 1 && o / m % 2 === 0 ? 2 : 1,
        b = si.size(f) / m / y,
        v = 64,
        _ = [],
        w = [l, a, i / h],
        k = si.convertShape(e[1].dims).slice();
      k.splice(-1, 1, d / p), _.push(...gs(w)), _.push(...gs(k)), _.push(...gs(e[2].dims)), e.length === 4 && _.push(...gs(si.convertShape(e[3].dims)));
      let A = [l, a, o / m];
      _.push(...gs(A));
      let S = C => {
        let I = w.length,
          E = bi("a", e[0].dataType, I, h),
          M = bi("b", 12, k.length, p),
          T = bi("scales", e[2].dataType, e[2].dims.length),
          P = [E, M, T],
          R = e.length === 4 ? bi("zero_points", 12, e[3].dims.length) : void 0;
        R && P.push(R);
        let j = A.length,
          B = is("output", e[0].dataType, j, m),
          F = Rb(e[0].dataType),
          N = (() => {
            switch (h) {
              case 1:
                return `array<${F}, 8>`;
              case 2:
                return `mat4x2<${F}>`;
              case 4:
                return `mat2x4<${F}>`;
              default:
                throw new Error(`${h}-component is not supported.`);
            }
          })(),
          G = () => {
            let O = `
          // reuse a data
            var input_offset = ${E.indicesToOffset(`${E.type.indices}(batch, row, word_offset)`)};
            var a_data: ${N};
            for (var j: u32 = 0; j < ${8 / h}; j++) {
              a_data[j] = ${E.getByOffset("input_offset")};
              input_offset++;
            }
          `;
            for (let L = 0; L < m * y; L++) O += `
            b_value = ${p === 1 ? `b${L}_data` : `b${L}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${N}(${Array.from({
              length: 4
            }, (D, U) => `${F}(b_value_lower[${U}]), ${F}(b_value_upper[${U}])`).join(", ")});
            b_dequantized_values = ${h === 1 ? `${N}(${Array.from({
              length: 8
            }, (D, U) => `(b_quantized_values[${U}] - ${R ? `zero_point${L}` : "zero_point"}) * scale${L}`).join(", ")});` : `(b_quantized_values - ${N}(${Array(8).fill(`${R ? `zero_point${L}` : "zero_point"}`).join(",")})) * scale${L};`};
            workgroup_shared[local_id.x * ${y} + ${Math.floor(L / m)}]${m > 1 ? `[${L % m}]` : ""} += ${Array.from({
              length: 8 / h
            }, (D, U) => `${h === 1 ? `a_data[${U}] * b_dequantized_values[${U}]` : `dot(a_data[${U}], b_dequantized_values[${U}])`}`).join(" + ")};
          `;
            return O;
          },
          z = () => {
            let O = `
            var col_index = col * ${m};
            ${R ? `
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;` : `
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${F}(8);`}
            `;
            for (let L = 0; L < m * y; L++) O += `
            let scale${L} = ${T.getByOffset("col_index * nBlocksPerCol + block")};
            ${R ? `
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${R.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${L} = ${F}((zero_point_word) & 0xFu);` : ""}
            col_index += 1;`;
            return O;
          },
          V = () => {
            let O = `col_index = col * ${m};`;
            for (let L = 0; L < m * y; L++) O += `
            let b${L}_data = ${M.getByIndices(`${M.type.indices}(col_index, block, word)`)};
            col_index += 1;`;
            return O += `
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${N};
            var b_dequantized_values: ${N};`, O;
          };
        return `
        var<workgroup> workgroup_shared: array<${B.type.value}, ${y * v}>;
        ${C.declareVariables(...P, B)}
        ${C.mainStart([v, 1, 1])}
          let output_indices = ${B.offsetToIndices(`(global_idx / ${v}) * ${y}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${v}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize / h};
            ${z()}
            for (var word: u32 = 0; word < ${d}; word += ${p}) {
              ${V()}
              for (var i: u32 = 0; i < ${p}; i++) {
                ${G()}
                word_offset += ${8 / h};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${y}) {
            var output_value: ${B.type.value} = ${B.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${v}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${y};
            }
            ${B.setByIndices(`${B.type.indices}(batch, row, col + local_id.x)`, "output_value")};
          }
        }`;
      };
      return {
        name: "MatMulNBits",
        shaderCache: {
          hint: `${t.blockSize};${t.bits};${h};${p};${m};${y};${v}`,
          inputDependencies: Array(e.length).fill("rank")
        },
        getRunData: () => ({
          outputs: [{
            dims: f,
            dataType: u
          }],
          dispatchGroup: {
            x: b
          },
          programUniforms: _
        }),
        getShaderSource: S
      };
    }, hAn = (e, t) => {
      let n = e[0].dims,
        r = n.length,
        a = n[r - 2],
        i = t.k,
        o = t.n,
        s = n.slice(0, r - 2),
        l = si.size(s),
        d = e[1].dims[2] / 4,
        u = e[0].dataType,
        h = wf(t.k),
        p = wf(d),
        m = s.concat([a, o]),
        f = 128,
        y = o % 8 === 0 ? 8 : o % 4 === 0 ? 4 : 1,
        b = f / y,
        v = b * p * 8,
        _ = v / h,
        w = v / t.blockSize,
        k = si.size(m) / y,
        A = [],
        S = [l, a, i / h],
        C = si.convertShape(e[1].dims).slice();
      C.splice(-1, 1, d / p), A.push(...gs(S)), A.push(...gs(C)), A.push(...gs(e[2].dims)), e.length === 4 && A.push(...gs(si.convertShape(e[3].dims)));
      let I = [l, a, o];
      A.push(...gs(I));
      let E = M => {
        let T = S.length,
          P = bi("a", e[0].dataType, T, h),
          R = bi("b", 12, C.length, p),
          j = bi("scales", e[2].dataType, e[2].dims.length),
          B = [P, R, j],
          F = e.length === 4 ? bi("zero_points", 12, e[3].dims.length) : void 0;
        F && B.push(F);
        let N = I.length,
          G = is("output", e[0].dataType, N),
          z = Rb(e[0].dataType),
          V = () => {
            switch (h) {
              case 1:
                return `
          let a_data0 = vec4<${z}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${z}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;
              case 2:
                return `
          let a_data0 = vec4<${z}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${z}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;
              case 4:
                return `
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;
              default:
                throw new Error(`${h}-component is not supported.`);
            }
          };
        return `
        var<workgroup> sub_a: array<${P.type.value}, ${_}>;
        var<workgroup> inter_results: array<array<${G.type.value}, ${b}>, ${y}>;
        ${M.declareVariables(...B, G)}
        ${M.mainStart([b, y, 1])}
          let output_indices = ${G.offsetToIndices(`workgroup_index * ${y}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${w} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${_};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${_}; a_offset += ${f})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${P.getByIndices(`${P.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${P.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${w} + local_id.x;
            ${F ? `
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${F.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${z}((zero_point_word) & 0xFu);` : `
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${z}(8);`}
            let scale = ${j.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${R.getByIndices(`${R.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize / h};
            for (var i: u32 = 0; i < ${p}; i++) {
              ${V()}
              let b_value = ${p === 1 ? "b_data" : "b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${z}>(${Array.from({
          length: 4
        }, (O, L) => `${z}(b_value_lower[${L}]), ${z}(b_value_upper[${L}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${z}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({
          length: 2
        }, (O, L) => `${`dot(a_data${L}, b_dequantized_values[${L}])`}`).join(" + ")};
              word_offset += ${8 / h};
            }
            workgroupBarrier();
          }

          if (local_idx < ${y}) {
            var output_value: ${G.type.value} = ${G.type.value}(0);
            for (var b = 0u; b < ${b}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${G.setByIndices(`${G.type.indices}(batch, row, col + local_idx)`, "output_value")}
            }
          }
        }`;
      };
      return {
        name: "BlockwiseMatMulNBits32",
        shaderCache: {
          hint: `${t.blockSize};${h};${p};${b};${y}`,
          inputDependencies: Array(e.length).fill("rank")
        },
        getRunData: () => ({
          outputs: [{
            dims: m,
            dataType: u
          }],
          dispatchGroup: {
            x: k
          },
          programUniforms: A
        }),
        getShaderSource: E
      };
    }, y4r = (e, t) => {
      dAn(e.inputs, t), t.blockSize === 32 && e.adapterInfo.isVendor("intel") && e.adapterInfo.isArchitecture("gen-12lp") ? e.compute(hAn(e.inputs, t)) : e.compute(uAn(e.inputs, t));
    }, b4r = e => lh(e);
  }),
  pAn,
  mAn,
  fAn,
  gAn,
  yAn,
  bAn,
  vAn,
  wAn,
  v4r,
  _No = Wi(() => {
    ol(), Wl(), cc(), pAn = e => {
      if (!e || e.length < 1) throw new Error("Too few inputs");
      if (e[0].dataType !== 1 && e[0].dataType !== 10) throw new Error("Input type must be float or float16.");
      if (e.length >= 2) {
        let t = e[0].dims.length * 2 === e[1].dims[0];
        if (e.length === 4 && (t = e[3].dims[0] * 2 === e[1].dims[0]), !t) throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].");
      }
    }, mAn = (e, t, n) => {
      let r = "";
      for (let a = t - 1; a >= 0; --a) r += `
            k = i32(${e.indicesGet("indices", a)}) - ${ds("uniforms.pads", a, n)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${ds("uniforms.x_shape", a, t)})) {
              break;
            }
            offset += k * i32(${ds("uniforms.x_strides", a, t)});
        `;
      return `
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${r}
            value = x[offset];
          }
      `;
    }, fAn = (e, t, n) => {
      let r = "";
      for (let a = t - 1; a >= 0; --a) r += `
                k = i32(${e.indicesGet("indices", a)}) - ${ds("uniforms.pads", a, n)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${ds("uniforms.x_shape", a, t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${ds("uniforms.x_shape", a, t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${ds("uniforms.x_strides", a, t)});
            `;
      return `
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `;
    }, gAn = (e, t, n) => {
      let r = "";
      for (let a = t - 1; a >= 0; --a) r += `
                k = i32(${e.indicesGet("indices", a)}) - ${ds("uniforms.pads", a, n)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${ds("uniforms.x_shape", a, t)})) {
                  k = i32(${ds("uniforms.x_shape", a, t)}) - 1;
                }
                offset += k * i32(${ds("uniforms.x_strides", a, t)});
            `;
      return `
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `;
    }, yAn = (e, t, n) => {
      let r = "";
      for (let a = t - 1; a >= 0; --a) r += `
                k = i32(${e.indicesGet("indices", a)}) - ${ds("uniforms.pads", a, n)};
                if (k < 0)  {
                  k += i32(${ds("uniforms.x_shape", a, t)}]);
                }
                if (k >= i32(${ds("uniforms.x_shape", a, t)})) {
                  k -= i32(${ds("uniforms.x_shape", a, t)});
                }
                offset += k * i32(${ds("uniforms.x_strides", a, t)});
            `;
      return `
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `;
    }, bAn = (e, t, n) => {
      switch (n.mode) {
        case 0:
          return mAn(e, t, n.pads.length);
        case 1:
          return fAn(e, t, n.pads.length);
        case 2:
          return gAn(e, t, n.pads.length);
        case 3:
          return yAn(e, t, n.pads.length);
        default:
          throw new Error("Invalid mode");
      }
    }, vAn = (e, t) => {
      let n = si.padShape(e[0].dims.slice(), t.pads),
        r = e[0].dims,
        a = si.size(n),
        i = [{
          type: 12,
          data: a
        }, {
          type: 6,
          data: t.pads
        }],
        o = e.length >= 3 && e[2].data;
      t.mode === 0 && i.push({
        type: o ? e[2].dataType : 1,
        data: t.value
      }), i.push(...gs(e[0].dims, n));
      let s = ["rank"],
        l = d => {
          let u = is("output", e[0].dataType, n.length),
            h = bi("x", e[0].dataType, r.length),
            p = h.type.value,
            m = bAn(u, r.length, t),
            f = [{
              name: "output_size",
              type: "u32"
            }, {
              name: "pads",
              type: "i32",
              length: t.pads.length
            }];
          return t.mode === 0 && f.push({
            name: "constant_value",
            type: o ? p : "f32"
          }), `
            ${d.registerUniforms(f).declareVariables(h, u)}
            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${u.offsetToIndices("global_idx")};

            var value = ${p}(0);
            ${m}
            output[global_idx] = value;
        }`;
        };
      return {
        name: "Pad",
        shaderCache: {
          hint: `${t.mode}${o}`,
          inputDependencies: s
        },
        getRunData: () => ({
          outputs: [{
            dims: n,
            dataType: e[0].dataType
          }],
          dispatchGroup: {
            x: Math.ceil(si.size(n) / 64)
          },
          programUniforms: i
        }),
        getShaderSource: l
      };
    }, wAn = (e, t) => {
      if (e.length > 1) {
        let n = e[1].getBigInt64Array(),
          r = e.length >= 3 && e[2].data ? e[2].dataType === 10 ? e[2].getUint16Array()[0] : e[2].getFloat32Array()[0] : 0,
          a = e[0].dims.length,
          i = new Int32Array(2 * a).fill(0);
        if (e.length >= 4) {
          let s = e[3].getBigInt64Array();
          for (let l = 0; l < s.length; l++) i[Number(s[l])] = Number(n[l]), i[Number(s[l]) + a] = Number(n[l + s.length]);
        } else n.forEach((s, l) => i[Number(l)] = Number(s));
        let o = [];
        return i.forEach(s => o.push(s)), {
          mode: t.mode,
          value: r,
          pads: o
        };
      } else return t;
    }, v4r = (e, t) => {
      pAn(e.inputs);
      let n = wAn(e.inputs, t);
      e.compute(vAn(e.inputs, n), {
        inputs: [0]
      });
    };
  }),
  Dge,
  fht,
  ght,
  yht,
  bht,
  xAn,
  _An,
  vht,
  wht,
  w4r,
  x4r,
  xht,
  _4r,
  k4r,
  _ht,
  A4r,
  S4r,
  I4r,
  C4r,
  kNo = Wi(() => {
    FT(), ol(), Wl(), cc(), Dge = e => {
      if (um.webgpu.validateInputContent && (!e || e.length !== 1)) throw new Error("Pool ops requires 1 input.");
    }, fht = (e, t, n) => {
      let r = t.format === "NHWC",
        a = e.dims.slice();
      r && a.splice(1, 0, a.pop());
      let i = Object.hasOwnProperty.call(t, "dilations"),
        o = t.kernelShape.slice(),
        s = t.strides.slice(),
        l = i ? t.dilations.slice() : [],
        d = t.pads.slice();
      EGe.adjustPoolAttributes(n, a, o, s, l, d);
      let u = EGe.computePoolOutputShape(n, a, s, l, o, d, t.autoPad),
        h = Object.assign({}, t);
      i ? Object.assign(h, {
        kernelShape: o,
        strides: s,
        pads: d,
        dilations: l,
        cacheKey: t.cacheKey
      }) : Object.assign(h, {
        kernelShape: o,
        strides: s,
        pads: d,
        cacheKey: t.cacheKey
      });
      let p = u.slice();
      return p.push(p.splice(1, 1)[0]), [h, r ? p : u];
    }, ght = (e, t) => {
      let n = t.format === "NHWC",
        r = si.size(e),
        a = si.size(t.kernelShape),
        i = [{
          type: 12,
          data: r
        }, {
          type: 12,
          data: a
        }],
        o = [{
          name: "outputSize",
          type: "u32"
        }, {
          name: "kernelSize",
          type: "u32"
        }];
      if (t.kernelShape.length <= 2) {
        let s = t.kernelShape[t.kernelShape.length - 1],
          l = t.strides[t.strides.length - 1],
          d = t.pads[t.pads.length / 2 - 1],
          u = t.pads[t.pads.length - 1],
          h = !!(d + u);
        i.push({
          type: 12,
          data: s
        }, {
          type: 12,
          data: l
        }, {
          type: 12,
          data: d
        }, {
          type: 12,
          data: u
        }), o.push({
          name: "kw",
          type: "u32"
        }, {
          name: "sw",
          type: "u32"
        }, {
          name: "pwStart",
          type: "u32"
        }, {
          name: "pwEnd",
          type: "u32"
        });
        let p = !1;
        if (t.kernelShape.length === 2) {
          let m = t.kernelShape[t.kernelShape.length - 2],
            f = t.strides[t.strides.length - 2],
            y = t.pads[t.pads.length / 2 - 2],
            b = t.pads[t.pads.length - 2];
          p = !!(y + b), i.push({
            type: 12,
            data: m
          }, {
            type: 12,
            data: f
          }, {
            type: 12,
            data: y
          }, {
            type: 12,
            data: b
          }), o.push({
            name: "kh",
            type: "u32"
          }, {
            name: "sh",
            type: "u32"
          }, {
            name: "phStart",
            type: "u32"
          }, {
            name: "phEnd",
            type: "u32"
          });
        }
        return [i, o, !0, h, p];
      } else {
        if (n) throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");
        let s = si.computeStrides(t.kernelShape);
        i.push({
          type: 12,
          data: s
        }, {
          type: 12,
          data: t.pads
        }, {
          type: 12,
          data: t.strides
        }), o.push({
          name: "kernelStrides",
          type: "u32",
          length: s.length
        }, {
          name: "pads",
          type: "u32",
          length: t.pads.length
        }, {
          name: "strides",
          type: "u32",
          length: t.strides.length
        });
        let l = t.pads.reduce((d, u) => d + u);
        return [i, o, !!l, !1, !1];
      }
    }, yht = (e, t, n, r, a, i, o, s, l, d, u, h) => {
      let p = a.format === "NHWC",
        m = t.type.value,
        f = is("output", t.type.tensor, r);
      if (a.kernelShape.length <= 2) {
        let y = "",
          b = "",
          v = "",
          _ = n - (p ? 2 : 1);
        if (u ? y = `
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${_}] < 0 || xIndices[${_}]
                      >= uniforms.x_shape[${_}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }` : y = `
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`, a.kernelShape.length === 2) {
          let w = n - (p ? 3 : 2);
          h ? b = `
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${w}] < 0 || xIndices[${w}] >= uniforms.x_shape[${w}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              ` : b = `
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sh - uniforms.phStart + j;
                `, v = `
              }
            `;
        }
        return `
            ${e.registerUniforms(l).declareVariables(t, f)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${f.offsetToIndices("global_idx")};
              var xIndices = ${f.offsetToIndices("global_idx")};

              var value = ${m}(${s});
              var pad = 0;
              ${b}
              ${y}
              ${v}
              ${o}

              output[global_idx] = value;
            }`;
      } else {
        if (p) throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");
        let y = a.kernelShape.length,
          b = a.pads.length,
          v = "";
        return d ? v = `
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${i}
              }` : v = `
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${i}
            `, `
            ${e.registerUniforms(l).declareVariables(t, f)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${f.offsetToIndices("global_idx")};
              var xIndices = ${f.offsetToIndices("global_idx")};

              var offsets: array<u32, ${y}>;

              var value = ${m}(${s});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${y - 1}u; j++) {
                  offsets[j] = offset / ${ds("uniforms.kernelStrides", "j", y)};
                  offset -= offsets[j] * ${ds("uniforms.kernelStrides", "j", y)};
                }
                offsets[${y - 1}] = offset;

                isPad = false;
                for (var j = ${n - y}u; j < ${n}u; j++) {
                  xIndices[j] = indices[j] * ${ds("uniforms.strides", `j - ${n - y}u`, y)}
                    + offsets[j - ${n - y}u] - ${ds("uniforms.pads", "j - 2u", b)};
                  ${v}
              }
              ${o}

              output[global_idx] = value;
            }`;
      }
    }, bht = e => `${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`, xAn = e => `${bht(e)};${e.countIncludePad}`, _An = e => `${bht(e)};${e.storageOrder};${e.dilations}`, vht = e => ({
      format: e.format,
      autoPad: ["NOTSET", "VALID", "SAME_UPPER", "SAME_LOWER"][e.auto_pad],
      ceilMode: e.ceil_mode,
      kernelShape: e.kernel_shape,
      strides: e.strides,
      pads: e.pads
    }), wht = (e, t, n, r) => {
      let [a, i] = fht(t, r, n),
        o = bi("x", t.dataType, t.dims.length),
        s = o.type.value,
        l = "value += x_val;",
        d = "";
      a.countIncludePad ? d += `value /= ${s}(uniforms.kernelSize);` : d += `value /= ${s}(i32(uniforms.kernelSize) - pad);`;
      let [u, h, p, m, f] = ght(i, a);
      u.push(...gs(t.dims, i));
      let y = ["rank"];
      return {
        name: e,
        shaderCache: {
          hint: `${r.cacheKey};${p};${m};${f}`,
          inputDependencies: y
        },
        getRunData: () => ({
          outputs: [{
            dims: i,
            dataType: t.dataType
          }],
          dispatchGroup: {
            x: Math.ceil(si.size(i) / 64)
          },
          programUniforms: u
        }),
        getShaderSource: b => yht(b, o, t.dims.length, i.length, a, l, d, 0, h, p, m, f)
      };
    }, w4r = e => {
      let t = e.count_include_pad !== 0,
        n = vht(e);
      if (n.ceilMode !== 0) throw new Error("using ceil() in shape computation is not yet supported for AveragePool");
      let r = {
        countIncludePad: t,
        ...n,
        cacheKey: ""
      };
      return {
        ...r,
        cacheKey: xAn(r)
      };
    }, x4r = (e, t) => {
      Dge(e.inputs), e.compute(wht("AveragePool", e.inputs[0], !1, t));
    }, xht = {
      autoPad: "",
      ceilMode: 0,
      countIncludePad: !1,
      kernelShape: [],
      strides: [],
      pads: [],
      storageOrder: 0,
      dilations: []
    }, _4r = e => {
      let t = e.format;
      return {
        format: t,
        ...xht,
        cacheKey: t
      };
    }, k4r = (e, t) => {
      Dge(e.inputs), e.compute(wht("GlobalAveragePool", e.inputs[0], !0, t));
    }, _ht = (e, t, n, r) => {
      let [a, i] = fht(t, r, n),
        o = `
      value = max(x_val, value);
    `,
        s = "",
        l = bi("x", t.dataType, t.dims.length),
        d = ["rank"],
        [u, h, p, m, f] = ght(i, a);
      return u.push(...gs(t.dims, i)), {
        name: e,
        shaderCache: {
          hint: `${r.cacheKey};${p};${m};${f}`,
          inputDependencies: d
        },
        getRunData: () => ({
          outputs: [{
            dims: i,
            dataType: t.dataType
          }],
          dispatchGroup: {
            x: Math.ceil(si.size(i) / 64)
          },
          programUniforms: u
        }),
        getShaderSource: y => yht(y, l, t.dims.length, i.length, a, o, s, t.dataType === 10 ? -65504 : -1e5, h, p, m, f)
      };
    }, A4r = (e, t) => {
      Dge(e.inputs), e.compute(_ht("MaxPool", e.inputs[0], !1, t));
    }, S4r = e => {
      let t = e.storage_order,
        n = e.dilations,
        r = vht(e);
      if (t !== 0) throw new Error("column major storage order is not yet supported for MaxPool");
      if (r.ceilMode !== 0) throw new Error("using ceil() in shape computation is not yet supported for MaxPool");
      let a = {
        storageOrder: t,
        dilations: n,
        ...r,
        cacheKey: ""
      };
      return {
        ...a,
        cacheKey: _An(a)
      };
    }, I4r = e => {
      let t = e.format;
      return {
        format: t,
        ...xht,
        cacheKey: t
      };
    }, C4r = (e, t) => {
      Dge(e.inputs), e.compute(_ht("GlobalMaxPool", e.inputs[0], !0, t));
    };
  }),
  kAn,
  AAn,
  E4r,
  T4r,
  ANo = Wi(() => {
    ol(), Wl(), wg(), cc(), kAn = (e, t) => {
      if (e.length < 2 || e.length > 3) throw new Error("DequantizeLinear requires 2 or 3 inputs.");
      if (e.length === 3 && e[1].dims === e[2].dims) throw new Error("x-scale and x-zero-point must have the same shape.");
      if (e.length === 3 && e[0].dataType !== e[2].dataType) throw new Error("x and x-zero-point must have the same data type.");
      if (e[0].dataType === 6 && e.length > 2) throw new Error("In the case of dequantizing int32 there is no zero point.");
      if (e[1].dims.length !== 0 && e[1].dims.length !== 1 && e[1].dims.length !== e[0].dims.length) throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");
      if (e.length > 2) {
        if (e[0].dataType !== e[2].dataType) throw new Error("x and x-zero-point must have the same data type.");
        if (e[1].dims.length !== e[2].dims.length) throw new Error("scale and zero-point inputs must have the same rank.");
        if (!e[1].dims.map((n, r) => n === e[2].dims[r]).reduce((n, r) => n && r, !0)) throw new Error("scale and zero-point inputs must have the same shape.");
      }
      if (t.blockSize > 0) {
        if (e[1].dims.length === 0 || e[1].dims.length === 1 && e[1].dims[0] === 1) throw new Error("blockSize must be set only for block quantization.");
        if (!e[1].dims.map((a, i) => i === t.axis || a === e[0].dims[i]).reduce((a, i) => a && i, !0)) throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");
        if (e[1].dims.length !== e[0].dims.length) throw new Error("For block qunatization the scale input rank must be the same as the x rank.");
        let n = e[0].dims[t.axis],
          r = e[1].dims[t.axis];
        if (t.blockSize < Math.ceil(n / r) || t.blockSize > Math.ceil(n / (r - 1) - 1)) throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].");
      }
    }, AAn = (e, t) => {
      let n = si.normalizeAxis(t.axis, e[0].dims.length),
        r = e[0].dataType,
        a = r === 3,
        i = e[0].dims,
        o = e[1].dataType,
        s = si.size(i),
        l = r === 3 || r === 2,
        d = l ? [Math.ceil(si.size(e[0].dims) / 4)] : e[0].dims,
        u = e[1].dims,
        h = e.length > 2 ? e[2] : void 0,
        p = h ? l ? [Math.ceil(si.size(h.dims) / 4)] : h.dims : void 0,
        m = u.length === 0 || u.length === 1 && u[0] === 1,
        f = m === !1 && u.length === 1,
        y = wf(s),
        b = m && (!l || y === 4),
        v = b ? y : 1,
        _ = b && !l ? y : 1,
        w = bi("input", l ? 12 : r, d.length, _),
        k = bi("scale", o, u.length),
        A = h ? bi("zero_point", l ? 12 : r, p.length) : void 0,
        S = is("output", o, i.length, v),
        C = [w, k];
      A && C.push(A);
      let I = [d, u];
      h && I.push(p);
      let E = [{
          type: 12,
          data: s / v
        }, {
          type: 12,
          data: n
        }, {
          type: 12,
          data: t.blockSize
        }, ...gs(...I, i)],
        M = T => {
          let P = [{
            name: "output_size",
            type: "u32"
          }, {
            name: "axis",
            type: "u32"
          }, {
            name: "block_size",
            type: "u32"
          }];
          return `
      ${T.registerUniforms(P).declareVariables(...C, S)}
      ${T.mainStart()}
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${S.offsetToIndices("global_idx")};

          // Set input x
          ${l ? `
            let input = ${w.getByOffset("global_idx / 4")};
            let x_vec = ${a ? "unpack4xI8(input)" : "unpack4xU8(input)"};
            let x_value = ${v === 1 ? "x_vec[global_idx % 4]" : "x_vec"};` : `let x_value = ${w.getByOffset("global_idx")};`};

          // Set scale input
          ${m ? `let scale_value= ${k.getByOffset("0")}` : f ? `
            let scale_index = ${S.indicesGet("output_indices", "uniforms.axis")};
            let scale_value= ${k.getByOffset("scale_index")};` : `
            var scale_indices: ${k.type.indices} = output_indices;
            let index = ${k.indicesGet("scale_indices", "uniforms.axis")} / uniforms.block_size;
            ${k.indicesSet("scale_indices", "uniforms.axis", "index")};
            let scale_value= ${k.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${A ? m ? l ? `
                let zero_point_input = ${A.getByOffset("0")};
                let zero_point_vec =  ${a ? "unpack4xI8(zero_point_input)" : "unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]` : `let zero_point_value = ${A.getByOffset("0")}` : f ? l ? `
                let zero_point_index = ${S.indicesGet("output_indices", "uniforms.axis")};
                let zero_point_input = ${A.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${a ? "unpack4xI8(zero_point_input)" : "unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]` : `
                let zero_point_index = ${S.indicesGet("output_indices", "uniforms.axis")};
                let zero_point_value = ${A.getByOffset("zero_point_index")};` : l ? `
                let zero_point_offset = ${k.indicesToOffset("scale_indices")};
                let zero_point_input = ${A.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${a ? "unpack4xI8(zero_point_input)" : "unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];` : `let zero_point_value = ${A.getByIndices("scale_indices")};` : `let zero_point_value = ${l ? a ? "i32" : "u32" : w.type.value}(0);`};
      // Compute and write output
      ${S.setByOffset("global_idx", `${S.type.value}(x_value - zero_point_value) * scale_value`)};
      }`;
        };
      return {
        name: "DequantizeLinear",
        shaderCache: {
          hint: t.cacheKey,
          inputDependencies: A ? ["rank", "rank", "rank"] : ["rank", "rank"]
        },
        getShaderSource: M,
        getRunData: () => ({
          outputs: [{
            dims: i,
            dataType: o
          }],
          dispatchGroup: {
            x: Math.ceil(s / v / 64),
            y: 1,
            z: 1
          },
          programUniforms: E
        })
      };
    }, E4r = (e, t) => {
      kAn(e.inputs, t), e.compute(AAn(e.inputs, t));
    }, T4r = e => lh({
      axis: e.axis,
      blockSize: e.blockSize
    });
  }),
  SAn,
  IAn,
  M4r,
  SNo = Wi(() => {
    FT(), ol(), cc(), SAn = (e, t, n) => {
      let r = e === t,
        a = e < t && n < 0,
        i = e > t && n > 0;
      if (r || a || i) throw new Error("Range these inputs' contents are invalid.");
    }, IAn = (e, t, n, r) => {
      let a = Math.abs(Math.ceil((t - e) / n)),
        i = [a],
        o = a,
        s = [{
          type: 12,
          data: o
        }, {
          type: r,
          data: e
        }, {
          type: r,
          data: n
        }, ...gs(i)],
        l = d => {
          let u = is("output", r, i.length),
            h = u.type.value,
            p = [{
              name: "outputSize",
              type: "u32"
            }, {
              name: "start",
              type: h
            }, {
              name: "delta",
              type: h
            }];
          return `
        ${d.registerUniforms(p).declareVariables(u)}
        ${d.mainStart()}
        ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${h}(global_idx) * uniforms.delta;
      }`;
        };
      return {
        name: "Range",
        shaderCache: {
          hint: `${r}`
        },
        getShaderSource: l,
        getRunData: () => ({
          outputs: [{
            dims: i,
            dataType: r
          }],
          dispatchGroup: {
            x: Math.ceil(o / 64)
          },
          programUniforms: s
        })
      };
    }, M4r = e => {
      let t = 0,
        n = 0,
        r = 0;
      e.inputs[0].dataType === 6 ? (t = e.inputs[0].getInt32Array()[0], n = e.inputs[1].getInt32Array()[0], r = e.inputs[2].getInt32Array()[0]) : e.inputs[0].dataType === 1 && (t = e.inputs[0].getFloat32Array()[0], n = e.inputs[1].getFloat32Array()[0], r = e.inputs[2].getFloat32Array()[0]), um.webgpu.validateInputContent && SAn(t, n, r), e.compute(IAn(t, n, r, e.inputs[0].dataType), {
        inputs: []
      });
    };
  }),
  CAn,
  EAn,
  P4r,
  R4r,
  INo = Wi(() => {
    ol(), Wl(), wg(), cc(), CAn = (e, t, n, r) => {
      if (e !== "none" && r !== "i32" && r !== "u32" && r !== "f32") throw new Error(`Input ${r} is not supported with reduction ${e}.`);
      let a = `{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,
        i = `;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;
      switch (e) {
        case "none":
          return `${t}=${n};`;
        case "add":
          return r === "i32" || r === "u32" ? `atomicAdd(&${t}, bitcast<${r}>(${n}));` : `
              ${a}bitcast<${r}>(oldValue) + (${n})${i}`;
        case "max":
          return r === "i32" || r === "u32" ? `atomicMax(&${t}, bitcast<${r}>(${n}));` : `
                ${a}max(bitcast<f32>(oldValue), (${n}))${i}`;
        case "min":
          return r === "i32" || r === "u32" ? `atomicMin(&${t}, bitcast<${r}>(${n}));` : `${a}min(bitcast<${r}>(oldValue), (${n}))${i}`;
        case "mul":
          return `${a}(bitcast<${r}>(oldValue) * (${n}))${i}`;
        default:
          throw new Error(`Reduction ${e} is not supported.`);
      }
    }, EAn = (e, t) => {
      let n = e[0].dims,
        r = e[1].dims,
        a = n,
        i = 1,
        o = Math.ceil(si.size(r) / i),
        s = r[r.length - 1],
        l = si.sizeFromDimension(n, s),
        d = [{
          type: 12,
          data: o
        }, {
          type: 12,
          data: s
        }, {
          type: 12,
          data: l
        }, ...gs(e[1].dims, e[2].dims, a)],
        u = h => {
          let p = bi("indices", e[1].dataType, e[1].dims.length),
            m = bi("updates", e[2].dataType, e[2].dims.length, i),
            f = t.reduction !== "none" && t.reduction !== "" ? lSr("output", e[0].dataType, a.length) : is("output", e[0].dataType, a.length, i);
          return `
      ${h.registerUniform("output_size", "u32").registerUniform("last_index_dimension", "u32").registerUniform("num_updates_elements", "u32").declareVariables(p, m, f)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var hasDuplicates = false;
  if (${t.reduction === "none"}) {
    let n = ${si.size(r)};
    for (var i = 0; i < n; i = i + 1) {
      for (var j = i + 1; j < n; j = j + 1) {
        var index_i = i32(indices[i].x);
        var index_j = i32(indices[j].x);
        if (index_i == index_j) {
          hasDuplicates = true;
          break;
        }
      }
      if (hasDuplicates) {
        break;
      }
    }
  }

  var data_offset = 0u;
  var indices_start = uniforms.last_index_dimension * global_idx;
  if (${t.reduction === "none"} && hasDuplicates) {
    if (global_idx != 0u) {
      return;
    }
    indices_start = 0u;
  }
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length === 1 ? `
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;` : `
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start + uniforms.last_index_dimension];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${CAn(t.reduction, "output[data_offset + i]", "value", f.type.value)}
  }

      }`;
        };
      return {
        name: "ScatterND",
        shaderCache: {
          hint: `${t.cacheKey}_${t.reduction}`,
          inputDependencies: ["rank", "rank"]
        },
        getRunData: () => ({
          outputs: [{
            dims: a,
            dataType: e[0].dataType
          }],
          dispatchGroup: {
            x: Math.ceil(o / 64)
          },
          programUniforms: d
        }),
        getShaderSource: u
      };
    }, P4r = e => lh({
      reduction: e.reduction
    }), R4r = (e, t) => {
      e.compute(EAn(e.inputs, t), {
        inputs: [e.inputs[1], e.inputs[2]],
        outputs: []
      });
    };
  }),
  TAn,
  MAn,
  PAn,
  kht,
  RAn,
  NAn,
  jAn,
  DAn,
  LAn,
  OAn,
  BAn,
  FAn,
  Aht,
  zAn,
  UAn,
  $An,
  GAn,
  VAn,
  N4r,
  j4r,
  CNo = Wi(() => {
    ol(), Wl(), wg(), cc(), TAn = (e, t) => {
      if (e.every(n => n > 0 || (() => {
        throw new Error("Resize requires scales input values to be positive");
      })), e.length > 0) {
        if (t.mode === "linear") {
          if (!(e.length === 2 || e.length === 3 || e.length === 4 && e[0] === 1 && e[1] === 1 || e.length === 4 && e[0] === 1 && e[3] === 1 || e.length === 5 && e[0] === 1 && e[1] === 1)) throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`);
        } else if (t.mode === "cubic" && !(e.length === 2 || e.length === 4 && e[0] === 1 && e[1] === 1 || e.length === 4 && e[0] === 1 && e[3] === 1)) throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode");
      }
    }, MAn = (e, t, n) => {
      t.every(a => a >= 0 && a < n || (() => {
        throw new Error("Resize requires axes input values to be positive and less than rank");
      }));
      let r = new Array(n).fill(1);
      return t.forEach((a, i) => r[a] = e[i]), r;
    }, PAn = (e, t, n, r, a, i) => {
      let [o, s, l] = n > 10 ? [1, 2, 3] : [-1, e.length > 1 ? 1 : -1, -1],
        d = e[0].dims.length;
      if (o > 0 && e.length > o && e[o].dims.length > 0) e[o].getFloat32Array().forEach(u => i.push(u));else if (t.coordinateTransformMode === "tf_crop_and_resize") throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");
      if (s > 0 && e.length > s && e[s].dims.length === 1 && e[s].dims[0] > 0) {
        if (e[s].getFloat32Array().forEach(u => r.push(u)), r.length !== 0 && r.length !== d && n >= 18 && r.length !== t.axes.length) throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");
        TAn(r, t), t.axes.length > 0 && MAn(r, t.axes, d).forEach((u, h) => r[h] = u);
      }
      if (l > 0 && e.length > l && e[l].dims.length === 1 && e[l].dims[0] > 0 && (e[l].getBigInt64Array().forEach(u => a.push(Number(u))), a.length !== 0 && a.length !== d && n >= 18 && a.length !== t.axes.length)) throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");
      if (t.axes.length > 0) {
        if (r.length !== 0 && r.length !== t.axes.length) throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');
        if (a.length !== 0 && a.length !== t.axes.length) throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified');
      }
      if (typeof r < "u" && typeof a < "u" && r.length > 0 && a.length > d) throw new Error("Resize requires only of scales or sizes to be specified");
    }, kht = (e, t, n, r) => `
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${r}(big / (${n}));
  let fract = ${r}(big % (${n})) / ${r}(${n});
  return whole + fract;
`, RAn = (e, t) => `fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { ` + (() => {
      switch (e) {
        case "asymmetric":
          return `
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${kht("xResized", "lengthOriginal", "lengthResized", t)}
          }
        `;
        case "pytorch_half_pixel":
          return `if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;
        case "tf_half_pixel_for_nn":
          return `return (${t}(xResized) + 0.5) / ${t}(xScale);`;
        case "align_corners":
          return `if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${kht("xResized", "lengthOriginal - 1", "lengthResized - 1", t)}
                  }`;
        case "tf_crop_and_resize":
          return `if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;
        case "half_pixel_symmetric":
          return `const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;
        case "half_pixel":
          return `return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;
        default:
          throw new Error(`Coordinate transform mode ${e} is not supported`);
      }
    })() + "}", NAn = (e, t, n) => `fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {` + (() => {
      switch (e) {
        case "round_prefer_ceil":
          return "if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";
        case "floor":
          return "return floor(xOriginal);";
        case "ceil":
          return "return ceil(xOriginal);";
        case "round_prefer_floor":
          return "if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";
        case "simple":
        default:
          if (t < 11) return "if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";
          throw new Error(`Nearest mode ${e} is not supported`);
      }
    })() + "}", jAn = (e, t, n) => {
      let r = new Array(n).fill(0).concat(new Array(n).fill(1)),
        a = e.length === 0 ? r : e.slice();
      return t.length > 0 ? (t.forEach((i, o) => {
        r[i] = a[o], r[o + n] = a[t.length + o];
      }), r) : a;
    }, DAn = (e, t, n, r) => {
      let a = [];
      if (n.length > 0) {
        if (r.length > 0) {
          if (e.forEach(i => a.push(i)), Math.max(...r) > e.length) throw new Error("axes is out of bound");
          r.forEach((i, o) => a[i] = n[o]);
        } else n.forEach(i => a.push(i));
      } else {
        if (t.length === 0) throw new Error("Resize requires either scales or sizes.");
        a = e.map((i, o) => Math.round(i * t[o]));
      }
      return a;
    }, LAn = (e, t, n) => {
      let r = (() => {
        switch (n.keepAspectRatioPolicy) {
          case "not_larger":
            return n.axes.length > 0 ? Math.min(...n.axes.map(i => t[i]), Number.MAX_VALUE) : Math.min(...t, Number.MAX_VALUE);
          case "not_smaller":
            return n.axes.length > 0 ? Math.max(...n.axes.map(i => t[i]), Number.MIN_VALUE) : Math.max(...t, Number.MIN_VALUE);
          default:
            throw new Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`);
        }
      })();
      t.fill(1, 0, t.length);
      let a = e.slice();
      return n.axes.length > 0 ? (n.axes.forEach(i => t[i] = r), n.axes.forEach(i => a[i] = Math.round(e[i] * t[i]))) : (t.fill(r, 0, t.length), a.forEach((i, o) => a[o] = Math.round(i * t[o]))), a;
    }, OAn = (e, t, n, r, a) => `
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${n.length}> {
      var original_indices: array<${e.type.value}, ${n.length}>;
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${e.indicesGet("output_indices", "i")};
        var scale = ${ds("uniforms.scales", "i", r)};
        var roi_low = ${ds("uniforms.roi", "i", a)};
        var roi_hi = ${ds("uniforms.roi", `i + ${t.length}`, a)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${ds("uniforms.input_shape", "i", t.length)};
          var output_shape_i = ${ds("uniforms.output_shape", "i", n.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`, BAn = (e, t, n, r, a, i, o) => `
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${t.indicesGet("output_indices", "i")};
        var input_index: u32;
        var scale = ${ds("uniforms.scales", "i", a)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${ds("uniforms.roi", "i", i)};
          var roi_hi = ${ds("uniforms.roi", `i + ${n.length}`, i)};
          var input_shape_i = ${ds("uniforms.input_shape", "i", n.length)};
          var output_shape_i = ${ds("uniforms.output_shape", "i", r.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${o} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices", "i", "input_index")}
      }
      return input_indices;
    }`, FAn = (e, t) => `
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices", "i")};
        if (input_index < 0 || input_index >= ${ds("uniforms.input_shape", "i", t.length)}) {
          return false;
        }
      }
      return true;
    }`, Aht = (e, t, n, r) => e.rank > r ? `
    ${e.indicesSet("input_indices", t, "channel")};
    ${e.indicesSet("input_indices", n, "batch")};
` : "", zAn = (e, t, n, r, a) => {
      let [i, o, s, l] = n.length === 2 ? [-1, 0, 1, -1] : [0, 2, 3, 1],
        d = e.type.value;
      return `
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices", o, `max(0, min(row, ${n[o]} - 1))`)};
      ${e.indicesSet("input_indices", s, `max(0, min(col, ${n[s]} - 1))`)};
      ${Aht(e, l, i, 2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${o}];
      var col:${d} = originalIndices[${s}];
      ${r ? `if (row < 0 || row > (${n[o]} - 1) || col < 0 || col > (${n[s]} - 1)) {
        return ${a};
      }` : ""};
      row = max(0, min(row, ${n[o]} - 1));
      col = max(0, min(col, ${n[s]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${n.length > 2 ? `u32(originalIndices[${l}])` : "0"};
      var batch: u32 =  ${n.length > 2 ? `u32(originalIndices[${i}])` : "0"};
      var x11: ${d} = getInputValue(batch, channel, row1, col1);
      var x12: ${d} = getInputValue(batch, channel, row1, col2);
      var x21: ${d} = getInputValue(batch, channel, row2, col1);
      var x22: ${d} = getInputValue(batch, channel, row2, col2);
      var dx1: ${d} = abs(row - ${d}(row1));
      var dx2: ${d} = abs(${d}(row2) - row);
      var dy1: ${d} = abs(col - ${d}(col1));
      var dy2: ${d} = abs(${d}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`;
    }, UAn = (e, t, n, r, a, i, o, s, l, d) => {
      let u = n.length === 2,
        [h, p] = u ? [0, 1] : [2, 3],
        m = e.type.value,
        f = y => {
          let b = y === h ? "row" : "col";
          return `
      fn ${b}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${m} {
        var output_index = ${t.indicesGet("output_indices", y)};
        var originalIdx: ${m} = getOriginalCoordinateFromResizedCoordinate(output_index, ${a[y]},
        ${r[y]}, ${n[y]}, ${i[y]}, ${i[y]} + ${n.length});
        var fractOriginalIdx: ${m} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${s} && (originalIdx < 0 || originalIdx > (${n[y]} - 1))) {
          return ${l};
        }
        var data: array<${m}, 4> = array<${m}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${b}: ${m} = originalIdx + ${m}(i);
          if (${b} < 0 || ${b} >= ${n[y]}) {
            ${d ? `coefs[i + 1] = 0.0;
                        continue;` : s ? `return ${l};` : `${b} = max(0, min(${b}, ${n[y]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy", y, `u32(${b})`)};
          data[i + 1] = ${y === h ? e.getByIndices("input_indices_copy") : "rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`;
        };
      return `
    ${f(h)};
    ${f(p)};
  fn getCubicInterpolationCoefs(s: ${m}) -> array<${m}, 4> {
    var absS = abs(s);
    var coeffs: array<${m}, 4> = array<${m}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${m} = 1.0 - absS;
    var twoMinusAbsS: ${m} = 2.0 - absS;
    var onePlusAbsS: ${m} = 1.0 + absS;
    coeffs[0] = ((${o} * onePlusAbsS - 5 * ${o}) * onePlusAbsS + 8 * ${o}) * onePlusAbsS - 4 * ${o};
    coeffs[1] = ((${o} + 2) * absS - (${o} + 3)) * absS * absS + 1;
    coeffs[2] = ((${o} + 2) * oneMinusAbsS - (${o} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${o} * twoMinusAbsS - 5 * ${o}) * twoMinusAbsS + 8 * ${o}) * twoMinusAbsS - 4 * ${o};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${m}, 4>, coefs: array<${m}, 4>) -> ${m} {
    var coefsSum: ${m} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${m} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `;
    }, $An = (e, t, n, r, a) => {
      let [i, o, s, l, d] = n.length === 3 ? [-1, 0, 1, 2, -1] : [0, 2, 3, 4, 1],
        u = e.type.value;
      return `
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${u} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices", o, `max(0, min(depth, ${n[o]} - 1))`)};
      ${e.indicesSet("input_indices", s, `max(0, min(height, ${n[s]} - 1))`)};
      ${e.indicesSet("input_indices", l, `max(0, min(width, ${n[l]} - 1))`)};
      ${Aht(e, d, i, 3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${u} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${u} = originalIndices[${o}];
      var height:${u} = originalIndices[${s}];
      var width:${u} = originalIndices[${l}];
      ${r ? `if (depth < 0 || depth > (${n[o]} - 1) || height < 0 || height > (${n[s]} - 1) || width < 0 || (width > ${n[l]} - 1)) {
      return ${a};
        }` : ""};

    depth = max(0, min(depth, ${n[o]} - 1));
      height = max(0, min(height, ${n[s]} - 1));
      width = max(0, min(width, ${n[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${n.length > 3 ? `u32(originalIndices[${d}])` : "0"};
      var batch: u32 =  ${n.length > 3 ? `u32(originalIndices[${i}])` : "0"};

      var x111: ${u} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${u} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${u} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${u} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${u} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${u} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${u} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${u} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${u} = abs(depth - ${u}(depth1));
      var dx2: ${u} = abs(${u}(depth2) - depth);
      var dy1: ${u} = abs(height - ${u}(height1));
      var dy2: ${u} = abs(${u}(height2) - height);
      var dz1: ${u} = abs(width - ${u}(width1));
      var dz2: ${u} = abs(${u}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`;
    }, GAn = (e, t, n, r, a, i) => {
      let o = e.dims,
        s = jAn(i, t.axes, o.length),
        l = DAn(o, r, a, t.axes),
        d = r.slice();
      r.length === 0 && (d = o.map((_, w) => _ === 0 ? 1 : l[w] / _), t.keepAspectRatioPolicy !== "stretch" && (l = LAn(o, d, t)));
      let u = is("output", e.dataType, l.length),
        h = bi("input", e.dataType, o.length),
        p = si.size(l),
        m = o.length === l.length && o.every((_, w) => _ === l[w]),
        f = t.coordinateTransformMode === "tf_crop_and_resize",
        y = t.extrapolationValue,
        b = h.type.value,
        v = _ => `
      ${m ? "" : `
      ${RAn(t.coordinateTransformMode, b)};
      ${(() => {
          switch (t.mode) {
            case "nearest":
              return `
              ${FAn(h, o)};
              ${NAn(t.nearestMode, n, b)};
              ${BAn(h, u, o, l, d.length, s.length, f)};
              `;
            case "linear":
              return `
              ${OAn(u, o, l, d.length, s.length)};
              ${(() => {
                if (o.length === 2 || o.length === 4) return `${zAn(h, u, o, f, y)}`;
                if (o.length === 3 || o.length === 5) return `${$An(h, u, o, f, y)}`;
                throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.");
              })()};
            `;
            case "cubic":
              return `
            ${(() => {
                if (o.length === 2 || o.length === 4) return `${UAn(h, u, o, l, d, s, t.cubicCoeffA, f, t.extrapolationValue, t.excludeOutside)}`;
                throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.");
              })()};
            `;
            default:
              throw Error("Invalid resize mode");
          }
        })()};
      `}
      ${_.registerUniform("output_size", "u32").registerUniform("scales", "f32", d.length).registerUniform("roi", "f32", s.length).declareVariables(h, u)}
      ${_.mainStart()}
        ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${m ? "output[global_idx] = input[global_idx];" : `
        let output_indices = ${u.offsetToIndices("global_idx")};
        var input_indices: ${h.type.indices};
        ${(() => {
          switch (t.mode) {
            case "nearest":
              return `input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${h.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;
            case "linear":
              return `output[global_idx] = ${o.length === 2 || o.length === 4 ? "bilinearInterpolation" : "trilinearInterpolation"}(output_indices);`;
            case "cubic":
              return "output[global_idx] = bicubicInterpolation(output_indices);";
            default:
              throw Error(`Unsupported resize mode: ${t.mode}`);
          }
        })()};
`}
      }`;
      return {
        name: "Resize",
        shaderCache: {
          hint: `${t.cacheKey}|${n}|${d.length > 0 ? t.mode === "cubic" ? d : d.length : ""}|${a.length > 0 ? a : ""}|${s.length > 0 ? s : ""}|${m}|${t.mode === "nearest" ? o.length : o}`,
          inputDependencies: ["rank"]
        },
        getShaderSource: v,
        getRunData: () => ({
          outputs: [{
            dims: l,
            dataType: e.dataType
          }],
          dispatchGroup: {
            x: Math.ceil(p / 64)
          },
          programUniforms: [{
            type: 12,
            data: p
          }, {
            type: 1,
            data: d
          }, {
            type: 1,
            data: s
          }, ...gs(o, l)]
        })
      };
    }, VAn = e => {
      let t = e.customDataBuffer;
      return new Uint32Array(t, t.byteOffset, 1)[0];
    }, N4r = (e, t) => {
      let n = [],
        r = [],
        a = [],
        i = VAn(e);
      if (t.antialias !== 0) throw Error("Only default value (0) for Antialias attribute is supported");
      PAn(e.inputs, t, i, n, r, a), e.compute(GAn(e.inputs[0], t, i, n, r, a), {
        inputs: [0]
      });
    }, j4r = e => {
      let t = e.antialias,
        n = e.axes,
        r = e.coordinateTransformMode,
        a = e.cubicCoeffA,
        i = e.excludeOutside !== 0,
        o = e.extrapolationValue,
        s = e.keepAspectRatioPolicy,
        l = e.mode,
        d = e.nearestMode === "" ? "simple" : e.nearestMode;
      return lh({
        antialias: t,
        axes: n,
        coordinateTransformMode: r,
        cubicCoeffA: a,
        excludeOutside: i,
        extrapolationValue: o,
        keepAspectRatioPolicy: s,
        mode: l,
        nearestMode: d
      });
    };
  }),
  HAn,
  WAn,
  D4r,
  ENo = Wi(() => {
    ol(), Wl(), wg(), cc(), HAn = (e, t) => {
      let [n, r, a, i] = e,
        {
          numHeads: o,
          rotaryEmbeddingDim: s
        } = t;
      if (n.dims.length !== 3 && n.dims.length !== 4) throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);
      if (!si.areEqual(r.dims, []) && !si.areEqual(r.dims, [1]) && r.dims.length !== 2) throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${r.dims.length}`);
      if (a.dims.length !== 2) throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${a.dims.length}`);
      if (i.dims.length !== 2) throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);
      if (!si.areEqual(a.dims, i.dims)) throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");
      if (s > 0 && o === 0) throw new Error("num_heads must be provided if rotary_embedding_dim is specified");
      let l = n.dims[0],
        d = n.dims[n.dims.length - 2],
        u = a.dims[0],
        h = si.sizeFromDimension(n.dims, 1) / d,
        p = s === 0 ? a.dims[1] * 2 : h / o;
      if (s > p) throw new Error("rotary_embedding_dim must be less than or equal to head_size");
      if (r.dims.length === 2) {
        if (l !== r.dims[0]) throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${r.dims[0]}`);
        if (d !== r.dims[1]) throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${r.dims[1]}`);
      }
      if (p / 2 !== a.dims[1] && s / 2 !== a.dims[1]) throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${a.dims[1]}`);
      if (d > u) throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");
    }, WAn = (e, t) => {
      let {
          interleaved: n,
          numHeads: r,
          rotaryEmbeddingDim: a,
          scale: i
        } = t,
        o = e[0].dims[0],
        s = si.sizeFromDimension(e[0].dims, 1),
        l = e[0].dims[e[0].dims.length - 2],
        d = s / l,
        u = e[2].dims[1],
        h = a === 0 ? u * 2 : d / r,
        p = new Array(o, l, d / h, h - u),
        m = si.computeStrides(p),
        f = [{
          type: 1,
          data: i
        }, {
          type: 12,
          data: p
        }, {
          type: 12,
          data: m
        }, ...(e[0].dims.length === 3 ? new Array({
          type: 12,
          data: [s, d, h, 1]
        }) : []), ...(e[0].dims.length === 4 ? new Array({
          type: 12,
          data: [s, h, l * h, 1]
        }) : []), ...gs(e[0].dims, e[1].dims, e[2].dims, e[3].dims, e[0].dims)],
        y = b => {
          let v = bi("input", e[0].dataType, e[0].dims.length),
            _ = bi("position_ids", e[1].dataType, e[1].dims.length),
            w = bi("cos_cache", e[2].dataType, e[2].dims.length),
            k = bi("sin_cache", e[3].dataType, e[3].dims.length),
            A = is("output", e[0].dataType, e[0].dims.length);
          return b.registerUniforms([{
            name: "scale",
            type: "f32"
          }, {
            name: "global_shape",
            type: "u32",
            length: p.length
          }, {
            name: "global_strides",
            type: "u32",
            length: m.length
          }, {
            name: "input_output_strides",
            type: "u32",
            length: m.length
          }]), `
        ${b.declareVariables(v, _, w, k, A)}

        ${b.mainStart(wue)}
          let half_rotary_emb_dim = uniforms.${w.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${_.broadcastedIndicesToOffset("bsnh.xy", is("", _.type.tensor, 2))};
            let position_id =
                u32(${_.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${n});
            let j = i + select(half_rotary_emb_dim, 1, ${n});
            let re = ${v.getByOffset("i")} * ${w.get("position_id", "bsnh[3]")} -
                ${v.getByOffset("j")} * ${k.get("position_id", "bsnh[3]")};
            ${A.setByOffset("i", "re")}
            let im = ${v.getByOffset("i")} * ${k.get("position_id", "bsnh[3]")} +
                ${v.getByOffset("j")} * ${w.get("position_id", "bsnh[3]")};
            ${A.setByOffset("j", "im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${A.setByOffset("k", v.getByOffset("k"))}
          }
        }`;
        };
      return {
        name: "RotaryEmbedding",
        shaderCache: {
          hint: lh({
            interleaved: n
          }).cacheKey,
          inputDependencies: ["rank", "rank", "rank", "rank"]
        },
        getShaderSource: y,
        getRunData: () => ({
          outputs: [{
            dims: e[0].dims,
            dataType: e[0].dataType
          }],
          dispatchGroup: {
            x: Math.ceil(si.size(p) / wue)
          },
          programUniforms: f
        })
      };
    }, D4r = (e, t) => {
      HAn(e.inputs, t), e.compute(WAn(e.inputs, t));
    };
  }),
  qAn,
  KAn,
  L4r,
  TNo = Wi(() => {
    ol(), Wl(), cc(), qAn = e => {
      if (!e || e.length < 3) throw new Error("layerNorm requires at least 3 inputs.");
      let t = e[0],
        n = e[1],
        r = e[2];
      if (t.dataType !== n.dataType || t.dataType !== r.dataType) throw new Error("All inputs must have the same data type");
      if (t.dims.length !== 3 && t.dims.length !== 2) throw new Error("Input must be 2D or 3D");
      if (n.dims.length !== 3 && n.dims.length !== 2) throw new Error("Skip must be 2D or 3D");
      let a = t.dims[t.dims.length - 1],
        i = t.dims[t.dims.length - 2];
      if (n.dims[n.dims.length - 1] !== a) throw new Error("Skip must have the same hidden size as input");
      if (n.dims[n.dims.length - 2] !== i) throw new Error("Skip must have the same sequence length as input");
      if (r.dims.length !== 1) throw new Error("Gamma must be 1D");
      if (r.dims[r.dims.length - 1] !== a) throw new Error("Gamma must have the same hidden size as input");
      if (e.length > 3) {
        let o = e[3];
        if (o.dims.length !== 1) throw new Error("Beta must be 1D");
        if (o.dims[o.dims.length - 1] !== a) throw new Error("Beta must have the same hidden size as input");
      }
      if (e.length > 4) {
        let o = e[4];
        if (o.dims.length !== 1) throw new Error("Bias must be 1D");
        if (o.dims[o.dims.length - 1] !== a) throw new Error("Bias must have the same hidden size as input");
      }
    }, KAn = (e, t, n, r) => {
      let a = t.simplified,
        i = e[0].dims,
        o = si.size(i),
        s = i,
        l = o,
        d = i.slice(-1)[0],
        u = r ? i.slice(0, -1).concat(1) : [],
        h = !a && e.length > 3,
        p = e.length > 4,
        m = r && n > 1,
        f = r && n > 2,
        y = n > 3,
        b = 64,
        v = wf(d),
        _ = [{
          type: 12,
          data: l
        }, {
          type: 12,
          data: v
        }, {
          type: 12,
          data: d
        }, {
          type: 1,
          data: t.epsilon
        }],
        w = A => {
          let S = [{
              name: "output_size",
              type: "u32"
            }, {
              name: "components",
              type: "u32"
            }, {
              name: "hidden_size",
              type: "u32"
            }, {
              name: "epsilon",
              type: "f32"
            }],
            C = [bi("x", e[0].dataType, e[0].dims, v), bi("skip", e[1].dataType, e[1].dims, v), bi("gamma", e[2].dataType, e[2].dims, v)];
          h && C.push(bi("beta", e[3].dataType, e[3].dims, v)), p && C.push(bi("bias", e[4].dataType, e[4].dims, v)), C.push(is("output", e[0].dataType, s, v)), m && C.push(is("mean_output", 1, u)), f && C.push(is("inv_std_output", 1, u)), y && C.push(is("input_skip_bias_sum", e[0].dataType, s, v));
          let I = Rb(e[0].dataType),
            E = Rb(1, v);
          return `

      ${A.registerUniforms(S).declareVariables(...C)}
      var<workgroup> sum_shared : array<${E}, ${b}>;
      var<workgroup> sum_squared_shared : array<${E}, ${b}>;

      ${A.mainStart([b, 1, 1])}
        let ix = local_id.x;
        let iy = global_id.x / ${b};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${b};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${b - 1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${p ? "bias[offset1d + i]" : I + "(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${y ? "input_skip_bias_sum[offset + i] = value;" : ""}
          output[offset + i] = value;
          let f32_value = ${uae(I, v, "value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${b};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${M$("sum", v)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${M$("square_sum", v)} / f32(uniforms.hidden_size) ${a ? "" : "- mean * mean"} + uniforms.epsilon);
        ${m ? "mean_output[global_idx] = mean;" : ""}
        ${f ? "inv_std_output[global_idx] = inv_std_dev;" : ""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${a ? "" : `- ${I}(mean)`}) *
            ${I}(inv_std_dev) * gamma[offset1d + i]
            ${h ? "+ beta[offset1d + i]" : ""};
        }
      }`;
        },
        k = [{
          dims: s,
          dataType: e[0].dataType
        }];
      return n > 1 && k.push({
        dims: u,
        dataType: 1
      }), n > 2 && k.push({
        dims: u,
        dataType: 1
      }), n > 3 && k.push({
        dims: i,
        dataType: e[0].dataType
      }), {
        name: "SkipLayerNormalization",
        shaderCache: {
          hint: `${v};${m};${f};${y}`,
          inputDependencies: e.map((A, S) => "type")
        },
        getShaderSource: w,
        getRunData: () => ({
          outputs: k,
          dispatchGroup: {
            x: Math.ceil(l / d)
          },
          programUniforms: _
        })
      };
    }, L4r = (e, t) => {
      qAn(e.inputs);
      let n = [0];
      e.outputCount > 1 && n.push(-3), e.outputCount > 2 && n.push(-3), e.outputCount > 3 && n.push(3), e.compute(KAn(e.inputs, t, e.outputCount, !1), {
        outputs: n
      });
    };
  }),
  QAn,
  Lge,
  YAn,
  Sht,
  XAn,
  JAn,
  O4r,
  B4r,
  MNo = Wi(() => {
    ol(), Wl(), wg(), cc(), QAn = (e, t) => {
      if (!e || e.length < 1) throw new Error("too few inputs");
      if (t.axes.length !== 0) {
        if (t.axes.length !== t.starts.length || t.axes.length !== t.ends.length) throw new Error("axes, starts and ends must have the same length");
      } else if (t.starts.length !== t.ends.length) throw new Error("starts and ends must have the same length");
      e.slice(1).forEach((n, r) => {
        if (e[r + 1].dataType !== 6 && e[r + 1].dataType !== 7) throw new Error(`Input ${r} must be an array of int32 or int64`);
      });
    }, Lge = (e, t) => {
      let n = [];
      if (e.length > t) if (e[t].dataType === 7) e[t].getBigInt64Array().forEach(r => n.push(Number(r)));else if (e[t].dataType === 6) e[t].getInt32Array().forEach(r => n.push(Number(r)));else throw new Error(`Input ${t} must be an array of int32 or int64`);
      return n;
    }, YAn = (e, t) => {
      if (e.length > 1) {
        let n = Lge(e, 1),
          r = Lge(e, 2),
          a = Lge(e, 3);
        return a.length === 0 && (a = [...Array(e[0].dims.length).keys()]), lh({
          starts: n,
          ends: r,
          axes: a
        });
      } else return t;
    }, Sht = (e, t, n, r, a) => {
      let i = e;
      return e < 0 && (i += n[r[t]]), a[t] < 0 ? Math.max(0, Math.min(i, n[r[t]] - 1)) : Math.max(0, Math.min(i, n[r[t]]));
    }, XAn = (e, t, n) => `fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${n.length}; i >= 0; i--) {
            let input_shape_i = ${ds("uniforms.input_shape", "i", n.length)};
            let steps_i = ${ds("uniforms.steps", "i", n.length)};
            let signs_i = ${ds("uniforms.signs", "i", n.length)};
            let starts_i = ${ds("uniforms.starts", "i", n.length)};
            var output_index = ${t.indicesGet("output_indices", "i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices", "i", "input_index")};
          }
          return input_indices;
      }`, JAn = (e, t) => {
      let n = e[0].dims,
        r = si.size(n),
        a = t.axes.length > 0 ? si.normalizeAxes(t.axes, n.length) : [...Array(n.length).keys()],
        i = Lge(e, 4);
      i.forEach(v => v !== 0 || (() => {
        throw new Error("step cannot be 0");
      })), i.length === 0 && (i = Array(a.length).fill(1));
      let o = t.starts.map((v, _) => Sht(v, _, n, a, i)),
        s = t.ends.map((v, _) => Sht(v, _, n, a, i));
      if (a.length !== o.length || a.length !== s.length) throw new Error("start, ends and axes should have the same number of elements");
      if (a.length !== n.length) for (let v = 0; v < n.length; ++v) a.includes(v) || (o.splice(v, 0, 0), s.splice(v, 0, n[v]), i.splice(v, 0, 1));
      let l = i.map(v => Math.sign(v));
      i.forEach((v, _, w) => {
        if (v < 0) {
          let k = (s[_] - o[_]) / v,
            A = o[_],
            S = A + k * i[_];
          o[_] = S, s[_] = A, w[_] = -v;
        }
      });
      let d = n.slice(0);
      a.forEach((v, _) => {
        d[v] = Math.ceil((s[v] - o[v]) / i[v]);
      });
      let u = {
          dims: d,
          dataType: e[0].dataType
        },
        h = is("output", e[0].dataType, d.length),
        p = bi("input", e[0].dataType, e[0].dims.length),
        m = si.size(d),
        f = [{
          name: "outputSize",
          type: "u32"
        }, {
          name: "starts",
          type: "u32",
          length: o.length
        }, {
          name: "signs",
          type: "i32",
          length: l.length
        }, {
          name: "steps",
          type: "u32",
          length: i.length
        }],
        y = [{
          type: 12,
          data: m
        }, {
          type: 12,
          data: o
        }, {
          type: 6,
          data: l
        }, {
          type: 12,
          data: i
        }, ...gs(e[0].dims, d)],
        b = v => `
      ${v.registerUniforms(f).declareVariables(p, h)}
        ${XAn(p, h, n)}
        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${h.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${h.setByOffset("global_idx", p.getByIndices("input_indices"))}
      }`;
      return {
        name: "Slice",
        shaderCache: {
          hint: `${l.length}_${o.length}_${i.length}`,
          inputDependencies: ["rank"]
        },
        getShaderSource: b,
        getRunData: () => ({
          outputs: [u],
          dispatchGroup: {
            x: Math.ceil(r / 64)
          },
          programUniforms: y
        })
      };
    }, O4r = (e, t) => {
      QAn(e.inputs, t);
      let n = YAn(e.inputs, t);
      e.compute(JAn(e.inputs, n), {
        inputs: [0]
      });
    }, B4r = e => {
      let t = e.starts,
        n = e.ends,
        r = e.axes;
      return lh({
        starts: t,
        ends: n,
        axes: r
      });
    };
  }),
  ZAn,
  eSn,
  F4r,
  z4r,
  PNo = Wi(() => {
    ol(), Wl(), wg(), wG(), cc(), ZAn = e => {
      if (!e || e.length !== 1) throw new Error("Softmax op requires 1 input.");
    }, eSn = (e, t) => {
      let n = e.inputs[0],
        r = n.dims,
        a = si.size(r),
        i = r.length,
        o = si.normalizeAxis(t.axis, i),
        s = o < r.length - 1,
        l,
        d = [];
      s ? (d = Array.from({
        length: i
      }, (C, I) => I), d[o] = i - 1, d[i - 1] = o, l = e.compute(t3(n, d), {
        inputs: [n],
        outputs: [-1]
      })[0]) : l = n;
      let u = l.dims,
        h = u[i - 1],
        p = a / h,
        m = wf(h),
        f = h / m,
        y = 64;
      p === 1 && (y = 256);
      let b = (C, I) => I === 4 ? `max(max(${C}.x, ${C}.y), max(${C}.z, ${C}.w))` : I === 2 ? `max(${C}.x, ${C}.y)` : I === 3 ? `max(max(${C}.x, ${C}.y), ${C}.z)` : C,
        v = bi("x", l.dataType, l.dims, m),
        _ = is("result", l.dataType, l.dims, m),
        w = v.type.value,
        k = Rb(l.dataType) === "f32" ? `var threadMax = ${w}(-3.402823e+38f);` : `var threadMax = ${w}(-65504.0h);`,
        A = C => `
      var<workgroup> rowMaxShared : ${w};
      var<workgroup> rowSumShared : ${w};
      var<workgroup> threadShared : array<${w}, ${y}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${w} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${w}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${C.registerUniform("packedCols", "i32").declareVariables(v, _)}
      ${C.mainStart(y)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${y};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${k}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${w}(${b("threadShared[0]", m)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${w}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${w}(${M$("threadShared[0]", m)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,
        S = e.compute({
          name: "Softmax",
          shaderCache: {
            hint: `${m};${y}`,
            inputDependencies: ["type"]
          },
          getRunData: () => ({
            outputs: [{
              dims: u,
              dataType: l.dataType
            }],
            dispatchGroup: {
              x: p
            },
            programUniforms: [{
              type: 6,
              data: f
            }]
          }),
          getShaderSource: A
        }, {
          inputs: [l],
          outputs: [s ? -1 : 0]
        })[0];
      s && e.compute(t3(S, d), {
        inputs: [S]
      });
    }, F4r = (e, t) => {
      ZAn(e.inputs), eSn(e, t);
    }, z4r = e => lh({
      axis: e.axis
    });
  }),
  Iht,
  tSn,
  nSn,
  rSn,
  U4r,
  RNo = Wi(() => {
    ol(), Wl(), cc(), Iht = e => Array.from(e.getBigInt64Array(), Number), tSn = e => {
      if (!e || e.length !== 2) throw new Error("Tile requires 2 inputs.");
      if (e[0].dataType !== 1 && e[0].dataType !== 10 && e[0].dataType !== 6 && e[0].dataType !== 12) throw new Error("Tile only support float, float16, int32, and uint32 data types");
      if (e[1].dataType !== 7) throw new Error("Tile `repeats` input should be of int64 data type");
      if (e[1].dims.length !== 1) throw new Error("Tile `repeats` input should be 1-D");
      if (Iht(e[1]).length !== e[0].dims.length) throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor");
    }, nSn = (e, t) => {
      let n = [];
      for (let r = 0; r < e.length; ++r) n.push(e[r] * t[r]);
      return n;
    }, rSn = (e, t) => {
      let n = e[0].dims,
        r = t ?? Iht(e[1]),
        a = nSn(n, r),
        i = si.size(a),
        o = e[0].dataType,
        s = bi("input", o, n.length),
        l = is("output", o, a.length),
        d = u => `
      const inputShape = ${s.indices(...n)};
      ${u.registerUniform("output_size", "u32").declareVariables(s, l)}
      ${u.mainStart()}
      ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${l.offsetToIndices("global_idx")};
      var input_indices: ${s.type.indices};
      for (var i = 0; i < ${n.length}; i++) {
        let input_dim_i = ${s.indicesGet("uniforms.input_shape", "i")};
        let input_dim_value = ${l.indicesGet("output_indices", "i")}  % input_dim_i;

        ${s.indicesSet("input_indices", "i", "input_dim_value")}
      }
      ${l.setByOffset("global_idx", s.getByIndices("input_indices"))}
    }`;
      return {
        name: "Tile",
        shaderCache: {
          hint: `${r}`,
          inputDependencies: ["rank"]
        },
        getRunData: () => ({
          outputs: [{
            dims: a,
            dataType: e[0].dataType
          }],
          dispatchGroup: {
            x: Math.ceil(i / 64)
          },
          programUniforms: [{
            type: 12,
            data: i
          }, ...gs(e[0].dims, a)]
        }),
        getShaderSource: d
      };
    }, U4r = e => {
      tSn(e.inputs), e.compute(rSn(e.inputs), {
        inputs: [0]
      });
    };
  }),
  aSn,
  iSn,
  $4r,
  NNo = Wi(() => {
    ol(), Wl(), cc(), aSn = (e, t, n, r, a) => {
      let i = is("output_data", a, n.length, 4),
        o = bi("a_data", t[1].dataType, t[1].dims.length, 4),
        s = bi("b_data", t[2].dataType, t[2].dims.length, 4),
        l = bi("c_data", t[0].dataType, t[0].dims.length, 4),
        d,
        u = (h, p, m) => `select(${p}, ${h}, ${m})`;
      if (!r) d = i.setByOffset("global_idx", u(o.getByOffset("global_idx"), s.getByOffset("global_idx"), l.getByOffset("global_idx")));else {
        let h = (p, m, f = "") => {
          let y = `a_data[index_a${m}][component_a${m}]`,
            b = `b_data[index_b${m}][component_b${m}]`,
            v = `bool(c_data[index_c${m}] & (0xffu << (component_c${m} * 8)))`;
          return `
            let output_indices${m} = ${i.offsetToIndices(`global_idx * 4u + ${m}u`)};
            let offset_a${m} = ${o.broadcastedIndicesToOffset(`output_indices${m}`, i)};
            let offset_b${m} = ${s.broadcastedIndicesToOffset(`output_indices${m}`, i)};
            let offset_c${m} = ${l.broadcastedIndicesToOffset(`output_indices${m}`, i)};
            let index_a${m} = offset_a${m} / 4u;
            let index_b${m} = offset_b${m} / 4u;
            let index_c${m} = offset_c${m} / 4u;
            let component_a${m} = offset_a${m} % 4u;
            let component_b${m} = offset_b${m} % 4u;
            let component_c${m} = offset_c${m} % 4u;
            ${p}[${m}] = ${f}(${u(y, b, v)});
          `;
        };
        a === 9 ? d = `
            var data = vec4<u32>(0);
            ${h("data", 0, "u32")}
            ${h("data", 1, "u32")}
            ${h("data", 2, "u32")}
            ${h("data", 3, "u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));` : d = `
            ${h("output_data[global_idx]", 0)}
            ${h("output_data[global_idx]", 1)}
            ${h("output_data[global_idx]", 2)}
            ${h("output_data[global_idx]", 3)}
          `;
      }
      return `
        ${e.registerUniform("vec_size", "u32").declareVariables(l, o, s, i)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${d}
      }`;
    }, iSn = e => {
      let t = e[1].dims,
        n = e[2].dims,
        r = e[0].dims,
        a = e[1].dataType,
        i = !(si.areEqual(t, n) && si.areEqual(n, r)),
        o = t,
        s = si.size(t);
      if (i) {
        let d = vue.calcShape(vue.calcShape(t, n, !1), r, !1);
        if (!d) throw new Error("Can't perform where op on the given tensors");
        o = d, s = si.size(o);
      }
      let l = Math.ceil(s / 4);
      return {
        name: "Where",
        shaderCache: {
          inputDependencies: ["rank", "rank", "rank"]
        },
        getShaderSource: d => aSn(d, e, o, i, a),
        getRunData: () => ({
          outputs: [{
            dims: o,
            dataType: a
          }],
          dispatchGroup: {
            x: Math.ceil(s / 64 / 4)
          },
          programUniforms: [{
            type: 12,
            data: l
          }, ...gs(r, t, n, o)]
        })
      };
    }, $4r = e => {
      e.compute(iSn(e.inputs));
    };
  }),
  G4r,
  jNo = Wi(() => {
    qRo(), eVt(), KRo(), QRo(), YRo(), XRo(), JRo(), rNo(), iNo(), oNo(), sNo(), lNo(), cNo(), dNo(), uNo(), hNo(), pNo(), mNo(), fNo(), gNo(), yNo(), bNo(), vNo(), wNo(), xNo(), c4r(), _No(), kNo(), ANo(), SNo(), INo(), ZGt(), CNo(), ENo(), TNo(), MNo(), PNo(), h4r(), RNo(), wG(), tVt(), NNo(), G4r = new Map([["Abs", [OSr]], ["Acos", [BSr]], ["Acosh", [FSr]], ["Add", [v3r]], ["ArgMax", [NSr, w4t]], ["ArgMin", [RSr, w4t]], ["Asin", [zSr]], ["Asinh", [USr]], ["Atan", [$Sr]], ["Atanh", [GSr]], ["Attention", [jSr]], ["AveragePool", [x4r, w4r]], ["BatchNormalization", [DSr]], ["BiasAdd", [LSr]], ["BiasSplitGelu", [b3r]], ["Cast", [HSr, VSr]], ["Ceil", [qSr]], ["Clip", [WSr]], ["Concat", [T3r, M3r]], ["Conv", [I4t, S4t]], ["ConvTranspose", [z3r, F3r]], ["Cos", [KSr]], ["Cosh", [QSr]], ["CumSum", [U3r, $3r]], ["DepthToSpace", [G3r, V3r]], ["DequantizeLinear", [E4r, T4r]], ["Div", [w3r]], ["Einsum", [H3r, W3r]], ["Elu", [YSr, hbe]], ["Equal", [x3r]], ["Erf", [XSr]], ["Exp", [JSr]], ["Expand", [q3r]], ["FastGelu", [K3r]], ["Floor", [ZSr]], ["FusedConv", [I4t, S4t]], ["Gather", [Y3r, Q3r]], ["GatherElements", [n4r, t4r]], ["GatherBlockQuantized", [Z3r, e4r]], ["GatherND", [X3r, J3r]], ["Gelu", [e3r]], ["Gemm", [a4r, r4r]], ["GlobalAveragePool", [k4r, _4r]], ["GlobalMaxPool", [C4r, I4r]], ["Greater", [S3r]], ["GreaterOrEqual", [C3r]], ["GridSample", [i4r, o4r]], ["GroupQueryAttention", [p4r]], ["HardSigmoid", [l3r, s3r]], ["InstanceNormalization", [m4r]], ["LayerNormalization", [f4r]], ["LeakyRelu", [t3r, hbe]], ["Less", [I3r]], ["LessOrEqual", [E3r]], ["Log", [g3r]], ["MatMul", [g4r]], ["MatMulNBits", [y4r, b4r]], ["MaxPool", [A4r, S4r]], ["Mul", [_3r]], ["MultiHeadAttention", [l4r, s4r]], ["Neg", [r3r]], ["Not", [n3r]], ["Pad", [v4r]], ["Pow", [k3r]], ["QuickGelu", [y3r, hbe]], ["Range", [M4r]], ["Reciprocal", [a3r]], ["ReduceMin", [CSr]], ["ReduceMean", [_Sr]], ["ReduceMax", [ISr]], ["ReduceSum", [TSr]], ["ReduceProd", [ESr]], ["ReduceL1", [kSr]], ["ReduceL2", [ASr]], ["ReduceLogSum", [PSr]], ["ReduceLogSumExp", [SSr]], ["ReduceSumSquare", [MSr]], ["Relu", [i3r]], ["Resize", [N4r, j4r]], ["RotaryEmbedding", [D4r]], ["ScatterND", [R4r, P4r]], ["Sigmoid", [o3r]], ["Sin", [c3r]], ["Sinh", [d3r]], ["Slice", [O4r, B4r]], ["SkipLayerNormalization", [L4r]], ["Split", [d4r, u4r]], ["Sqrt", [u3r]], ["Softmax", [F4r, z4r]], ["Sub", [A3r]], ["Tan", [h3r]], ["Tanh", [p3r]], ["ThresholdedRelu", [f3r, hbe]], ["Tile", [U4r]], ["Transpose", [dSr, uSr]], ["Where", [$4r]]]);
  }),
  V4r,
  DNo = Wi(() => {
    FT(), QD(), cc(), V4r = class {
      constructor(e) {
        this.backend = e, this.repo = new Map(), this.attributesBound = !1;
      }
      getArtifact(e) {
        return this.repo.get(e);
      }
      setArtifact(e, t) {
        this.repo.set(e, t);
      }
      run(e, t, n, r, a) {
        vT(e.programInfo.name);
        let i = this.backend.device,
          o = this.backend.getComputePassEncoder();
        this.backend.writeTimestamp(this.backend.pendingDispatchNumber * 2);
        let s = [];
        for (let d of t) s.push({
          binding: s.length,
          resource: {
            buffer: d.buffer
          }
        });
        for (let d of n) s.push({
          binding: s.length,
          resource: {
            buffer: d.buffer
          }
        });
        a && s.push({
          binding: s.length,
          resource: a
        });
        let l = i.createBindGroup({
          layout: e.computePipeline.getBindGroupLayout(0),
          entries: s,
          label: e.programInfo.name
        });
        if (this.backend.sessionStatus === "capturing") {
          let d = {
            kernelId: this.backend.currentKernelId,
            computePipeline: e.computePipeline,
            bindGroup: l,
            dispatchGroup: r
          };
          this.backend.capturedCommandList.get(this.backend.currentSessionId).push(d);
        }
        o.setPipeline(e.computePipeline), o.setBindGroup(0, l), o.dispatchWorkgroups(...r), this.backend.writeTimestamp(this.backend.pendingDispatchNumber * 2 + 1), this.backend.pendingDispatchNumber++, (this.backend.pendingDispatchNumber >= this.backend.maxDispatchNumber || this.backend.queryType === "at-passes") && this.backend.endComputePass(), this.backend.pendingDispatchNumber >= this.backend.maxDispatchNumber && this.backend.flush(), X5(e.programInfo.name);
      }
      dispose() {}
      build(e, t) {
        vT(e.name);
        let n = this.backend.device,
          r = [];
        [{
          feature: "shader-f16",
          extension: "f16"
        }, {
          feature: "subgroups",
          extension: "subgroups"
        }, {
          feature: "subgroups-f16",
          extension: "subgroups_f16"
        }].forEach(d => {
          n.features.has(d.feature) && r.push(`enable ${d.extension};`);
        });
        let a = cSr(t, this.backend.device.limits),
          i = e.getShaderSource(a),
          o = `${r.join(`
`)}
${a.additionalImplementations}
${i}`,
          s = n.createShaderModule({
            code: o,
            label: e.name
          });
        Rd("verbose", () => `[WebGPU] ${e.name} shader code: ${o}`);
        let l = n.createComputePipeline({
          compute: {
            module: s,
            entryPoint: "main"
          },
          layout: "auto",
          label: e.name
        });
        return X5(e.name), {
          programInfo: e,
          computePipeline: l,
          uniformVariablesInfo: a.variablesInfo
        };
      }
      normalizeDispatchGroupSize(e) {
        let t = typeof e == "number" ? e : e.x,
          n = typeof e == "number" ? 1 : e.y || 1,
          r = typeof e == "number" ? 1 : e.z || 1,
          a = this.backend.device.limits.maxComputeWorkgroupsPerDimension;
        if (t <= a && n <= a && r <= a) return [t, n, r];
        let i = t * n * r,
          o = Math.ceil(Math.sqrt(i));
        if (o > a) {
          if (o = Math.ceil(Math.cbrt(i)), o > a) throw new Error("Total dispatch size exceeds WebGPU maximum.");
          return [o, o, o];
        } else return [o, o, 1];
      }
    };
  }),
  oSn,
  sSn,
  lSn,
  cSn,
  H4r,
  LNo = Wi(() => {
    FT(), ol(), QD(), rSr(), HRo(), jNo(), DNo(), oSn = (e, t) => {
      if (t.length !== e.length) throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);
      let n = [];
      for (let r = 0; r < e.length; ++r) {
        let a = e[r].dataType;
        switch (t[r]) {
          case "none":
            {
              n.push("");
              break;
            }
          case "type":
            {
              n.push(`${a}`);
              break;
            }
          case "rank":
            {
              let i = e[r].dims.length;
              n.push(`${a};${i}`);
              break;
            }
          case "dims":
            {
              let i = e[r].dims.join(",");
              n.push(`${a};${i}`);
              break;
            }
          default:
            throw new Error(`unsupported input dependency: ${t[r]}`);
        }
      }
      return n.join("|");
    }, sSn = (e, t, n) => {
      var a, i;
      let r = e.name;
      return (a = e.shaderCache) != null && a.hint && (r += "[" + e.shaderCache.hint + "]"), r += ":" + n + `:${oSn(t, ((i = e.shaderCache) == null ? void 0 : i.inputDependencies) ?? new Array(t.length).fill("dims"))}`, r;
    }, lSn = class {
      constructor(e) {
        e && (this.architecture = e.architecture, this.vendor = e.vendor);
      }
      isArchitecture(e) {
        return this.architecture === e;
      }
      isVendor(e) {
        return this.vendor === e;
      }
    }, cSn = class {
      constructor(e) {
        this.subgroupsSupported = e.features.has("subgroups"), this.subgroupsF16Supported = e.features.has("subgroups");
        let t = e.limits;
        !this.subgroupsSupported || !t.minSubgroupSize || !t.maxSubgroupSize ? this.subgroupSizeRange = void 0 : this.subgroupSizeRange = [t.minSubgroupSize, t.maxSubgroupSize];
      }
    }, H4r = class {
      constructor() {
        this.currentSessionId = null, this.currentKernelId = null, this.commandEncoder = null, this.computePassEncoder = null, this.maxDispatchNumber = 16, this.pendingDispatchNumber = 0, this.pendingKernels = [], this.pendingQueries = new Map(), this.sessionStatus = "default", this.capturedCommandList = new Map(), this.capturedPendingKernels = new Map(), this.sessionExternalDataMapping = new Map();
      }
      get currentKernelCustomData() {
        if (this.currentKernelId === null) throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");
        let e = this.kernelCustomData.get(this.currentKernelId);
        return e || (e = {}, this.kernelCustomData.set(this.currentKernelId, e)), e;
      }
      async initialize(e, t) {
        this.env = e;
        let n = [],
          r = {
            requiredLimits: {
              maxComputeWorkgroupStorageSize: t.limits.maxComputeWorkgroupStorageSize,
              maxComputeWorkgroupsPerDimension: t.limits.maxComputeWorkgroupsPerDimension,
              maxStorageBufferBindingSize: t.limits.maxStorageBufferBindingSize,
              maxBufferSize: t.limits.maxBufferSize,
              maxComputeInvocationsPerWorkgroup: t.limits.maxComputeInvocationsPerWorkgroup,
              maxComputeWorkgroupSizeX: t.limits.maxComputeWorkgroupSizeX,
              maxComputeWorkgroupSizeY: t.limits.maxComputeWorkgroupSizeY,
              maxComputeWorkgroupSizeZ: t.limits.maxComputeWorkgroupSizeZ
            },
            requiredFeatures: n
          },
          a = i => t.features.has(i) && n.push(i) && !0;
        a("chromium-experimental-timestamp-query-inside-passes") || a("timestamp-query"), a("shader-f16"), a("subgroups") && a("subgroups-f16"), this.device = await t.requestDevice(r), this.deviceInfo = new cSn(this.device), this.adapterInfo = new lSn(t.info || (await t.requestAdapterInfo())), this.gpuDataManager = aSr(this), this.programManager = new V4r(this), this.kernels = new Map(), this.kernelPersistentData = new Map(), this.kernelCustomData = new Map(), QGt(e.logLevel, !!e.debug), this.device.onuncapturederror = i => {
          i.error instanceof GPUValidationError && console.error(`An uncaught WebGPU validation error was raised: ${i.error.message}`);
        }, Object.defineProperty(this.env.webgpu, "device", {
          value: this.device,
          writable: !1,
          enumerable: !0,
          configurable: !1
        }), Object.defineProperty(this.env.webgpu, "adapter", {
          value: t,
          writable: !1,
          enumerable: !0,
          configurable: !1
        }), this.setQueryType();
      }
      dispose() {
        typeof this.querySet < "u" && this.querySet.destroy(), this.gpuDataManager.dispose();
      }
      getCommandEncoder() {
        return this.commandEncoder || (this.commandEncoder = this.device.createCommandEncoder()), this.commandEncoder;
      }
      getComputePassEncoder() {
        if (!this.computePassEncoder) {
          let e = this.getCommandEncoder(),
            t = {};
          this.queryType === "at-passes" && (t.timestampWrites = {
            querySet: this.querySet,
            beginningOfPassWriteIndex: this.pendingDispatchNumber * 2,
            endOfPassWriteIndex: this.pendingDispatchNumber * 2 + 1
          }), this.computePassEncoder = e.beginComputePass(t);
        }
        return this.computePassEncoder;
      }
      endComputePass() {
        this.computePassEncoder && (this.computePassEncoder.end(), this.computePassEncoder = null);
      }
      flush() {
        if (!this.commandEncoder) return;
        vT(), this.endComputePass();
        let e;
        this.queryType !== "none" && (this.commandEncoder.resolveQuerySet(this.querySet, 0, this.pendingDispatchNumber * 2, this.queryResolveBuffer, 0), e = this.device.createBuffer({
          size: this.pendingDispatchNumber * 2 * 8,
          usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST
        }), this.pendingQueries.set(e, this.pendingKernels), this.pendingKernels = [], this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer, 0, e, 0, this.pendingDispatchNumber * 2 * 8)), this.device.queue.submit([this.commandEncoder.finish()]), this.gpuDataManager.refreshPendingBuffers(), this.commandEncoder = null, this.pendingDispatchNumber = 0, this.queryType !== "none" && e.mapAsync(GPUMapMode.READ).then(() => {
          var r;
          let t = new BigUint64Array(e.getMappedRange()),
            n = this.pendingQueries.get(e);
          for (let a = 0; a < t.length / 2; a++) {
            let i = n[a],
              o = i.kernelId,
              s = this.kernels.get(o),
              l = s.kernelType,
              d = s.kernelName,
              u = i.programName,
              h = i.inputTensorViews,
              p = i.outputTensorViews,
              m = t[a * 2],
              f = t[a * 2 + 1];
            typeof this.queryTimeBase > "u" && (this.queryTimeBase = m);
            let y = Number(m - this.queryTimeBase),
              b = Number(f - this.queryTimeBase);
            if (!Number.isSafeInteger(y) || !Number.isSafeInteger(b)) throw new RangeError("incorrect timestamp range");
            if ((r = this.env.webgpu.profiling) != null && r.ondata) this.env.webgpu.profiling.ondata({
              version: 1,
              inputsMetadata: h.map(v => ({
                dims: v.dims,
                dataType: RH(v.dataType)
              })),
              outputsMetadata: p.map(v => ({
                dims: v.dims,
                dataType: RH(v.dataType)
              })),
              kernelId: o,
              kernelType: l,
              kernelName: d,
              programName: u,
              startTime: y,
              endTime: b
            });else {
              let v = "";
              h.forEach((w, k) => {
                v += `input[${k}]: [${w.dims}] | ${RH(w.dataType)}, `;
              });
              let _ = "";
              p.forEach((w, k) => {
                _ += `output[${k}]: [${w.dims}] | ${RH(w.dataType)}, `;
              }), console.log(`[profiling] kernel "${o}|${l}|${d}|${u}" ${v}${_}execution time: ${b - y} ns`);
            }
            ZAe("GPU", `${u}::${m}::${f}`);
          }
          e.unmap(), this.pendingQueries.delete(e);
        }), X5();
      }
      run(e, t, n, r, a, i) {
        vT(e.name);
        let o = [];
        for (let _ = 0; _ < t.length; ++_) {
          let w = t[_].data;
          if (w === 0) continue;
          let k = this.gpuDataManager.get(w);
          if (!k) throw new Error(`no GPU data for input: ${w}`);
          o.push(k);
        }
        let {
            outputs: s,
            dispatchGroup: l,
            programUniforms: d
          } = e.getRunData(t),
          u = n.length === 0 ? s.map((_, w) => w) : n;
        if (u.length !== s.length) throw new Error(`Output size ${u.length} must be equal to ${s.length}.`);
        let h = [],
          p = [];
        for (let _ = 0; _ < s.length; ++_) {
          if (!Number.isInteger(u[_]) || u[_] < -3 || u[_] >= i) throw new Error(`Invalid output index: ${u[_]}`);
          if (u[_] === -3) continue;
          let w = u[_] === -1,
            k = u[_] === -2,
            A = w || k ? a(s[_].dataType, s[_].dims) : r(u[_], s[_].dataType, s[_].dims);
          if (h.push(A), A.data === 0) continue;
          let S = this.gpuDataManager.get(A.data);
          if (!S) throw new Error(`no GPU data for output: ${A.data}`);
          if (w && this.temporaryData.push(S), k) {
            let C = this.kernelPersistentData.get(this.currentKernelId);
            C || (C = [], this.kernelPersistentData.set(this.currentKernelId, C)), C.push(S);
          }
          p.push(S);
        }
        if (o.length !== t.length || p.length !== h.length) {
          if (p.length === 0) return X5(e.name), h;
          throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`);
        }
        let m;
        if (d) {
          let _ = 0,
            w = [];
          d.forEach(C => {
            let I = typeof C.data == "number" ? [C.data] : C.data;
            if (I.length === 0) return;
            let E = C.type === 10 ? 2 : 4,
              M,
              T;
            C.type === 10 ? (T = I.length > 4 ? 16 : I.length > 2 ? 8 : I.length * E, M = I.length > 4 ? 16 : E * I.length) : (T = I.length <= 2 ? I.length * E : 16, M = 16), _ = Math.ceil(_ / T) * T, w.push(_);
            let P = C.type === 10 ? 8 : 4;
            _ += I.length > 4 ? Math.ceil(I.length / P) * M : I.length * E;
          });
          let k = 16;
          _ = Math.ceil(_ / k) * k;
          let A = new ArrayBuffer(_);
          d.forEach((C, I) => {
            let E = w[I],
              M = typeof C.data == "number" ? [C.data] : C.data;
            if (C.type === 6) new Int32Array(A, E, M.length).set(M);else if (C.type === 12) new Uint32Array(A, E, M.length).set(M);else if (C.type === 10) new Uint16Array(A, E, M.length).set(M);else if (C.type === 1) new Float32Array(A, E, M.length).set(M);else throw new Error(`Unsupported uniform type: ${RH(C.type)}`);
          });
          let S = this.gpuDataManager.create(_, GPUBufferUsage.COPY_DST | GPUBufferUsage.UNIFORM);
          this.device.queue.writeBuffer(S.buffer, 0, A, 0, _), this.gpuDataManager.release(S.id), m = {
            offset: 0,
            size: _,
            buffer: S.buffer
          };
        }
        let f = this.programManager.normalizeDispatchGroupSize(l),
          y = f[1] === 1 && f[2] === 1,
          b = sSn(e, t, y),
          v = this.programManager.getArtifact(b);
        if (v || (v = this.programManager.build(e, f), this.programManager.setArtifact(b, v), Rd("info", () => `[artifact] key: ${b}, programName: ${e.name}`)), d && v.uniformVariablesInfo) {
          if (d.length !== v.uniformVariablesInfo.length) throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${d.length} in program "${v.programInfo.name}".`);
          for (let _ = 0; _ < d.length; _++) {
            let w = d[_],
              k = w.type,
              A = typeof w.data == "number" ? 1 : w.data.length,
              [S, C] = v.uniformVariablesInfo[_];
            if (k !== S || A !== C) throw new Error(`Uniform variable ${_} mismatch: expect type ${S} with size ${C}, got type ${k} with size ${A} in program "${v.programInfo.name}".`);
          }
        }
        if (Rd("info", () => `[ProgramManager] run "${e.name}" (key=${b}) with ${f[0]}x${f[1]}x${f[2]}`), this.queryType !== "none" || this.sessionStatus === "capturing") {
          let _ = {
            kernelId: this.currentKernelId,
            programName: v.programInfo.name,
            inputTensorViews: t,
            outputTensorViews: h
          };
          this.pendingKernels.push(_), this.sessionStatus === "capturing" && this.capturedPendingKernels.get(this.currentSessionId).push(_);
        }
        return this.programManager.run(v, o, p, f, m), X5(e.name), h;
      }
      upload(e, t) {
        this.gpuDataManager.upload(e, t);
      }
      memcpy(e, t) {
        this.gpuDataManager.memcpy(e, t);
      }
      async download(e, t) {
        await this.gpuDataManager.download(e, t);
      }
      alloc(e) {
        return this.gpuDataManager.create(e).id;
      }
      free(e) {
        return this.gpuDataManager.release(e);
      }
      createKernel(e, t, n, r) {
        let a = G4r.get(e);
        if (!a) throw new Error(`kernel not implemented: ${e}`);
        let i = {
          kernelType: e,
          kernelName: r,
          kernelEntry: a[0],
          attributes: [a[1], n]
        };
        this.kernels.set(t, i);
      }
      releaseKernel(e) {
        let t = this.kernelPersistentData.get(e);
        if (t) {
          for (let n of t) this.gpuDataManager.release(n.id);
          this.kernelPersistentData.delete(e);
        }
        this.kernelCustomData.delete(e), this.kernels.delete(e);
      }
      computeKernel(e, t, n) {
        let r = this.kernels.get(e);
        if (!r) throw new Error(`kernel not created: ${e}`);
        let a = r.kernelType,
          i = r.kernelName,
          o = r.kernelEntry,
          s = r.attributes;
        if (this.currentKernelId !== null) throw new Error(`kernel "[${a}] ${i}" is not allowed to be called recursively`);
        this.currentKernelId = e, s[0] && (s[1] = s[0](s[1]), s[0] = void 0), Rd("info", () => `[WebGPU] Start to run kernel "[${a}] ${i}"...`);
        let l = this.env.debug;
        this.temporaryData = [];
        try {
          return l && this.device.pushErrorScope("validation"), o(t, s[1]), 0;
        } catch (d) {
          return n.push(Promise.resolve(`[WebGPU] Kernel "[${a}] ${i}" failed. ${d}`)), 1;
        } finally {
          l && n.push(this.device.popErrorScope().then(d => d ? `GPU validation error for kernel "[${a}] ${i}": ${d.message}` : null));
          for (let d of this.temporaryData) this.gpuDataManager.release(d.id);
          this.temporaryData = [], this.currentKernelId = null;
        }
      }
      registerBuffer(e, t, n, r) {
        let a = this.sessionExternalDataMapping.get(e);
        a || (a = new Map(), this.sessionExternalDataMapping.set(e, a));
        let i = a.get(t),
          o = this.gpuDataManager.registerExternalBuffer(n, r, i);
        return a.set(t, [o, n]), o;
      }
      unregisterBuffers(e) {
        let t = this.sessionExternalDataMapping.get(e);
        t && (t.forEach(n => this.gpuDataManager.unregisterExternalBuffer(n[0])), this.sessionExternalDataMapping.delete(e));
      }
      getBuffer(e) {
        let t = this.gpuDataManager.get(e);
        if (!t) throw new Error(`no GPU data for buffer: ${e}`);
        return t.buffer;
      }
      createDownloader(e, t, n) {
        return async () => {
          let r = await y4t(this, e, t);
          return YGt(r.buffer, n);
        };
      }
      writeTimestamp(e) {
        this.queryType === "inside-passes" && this.computePassEncoder.writeTimestamp(this.querySet, e);
      }
      setQueryType() {
        var e;
        this.queryType = "none", (((e = this.env.webgpu.profiling) == null ? void 0 : e.mode) === "default" || (typeof this.env.trace > "u" ? this.env.wasm.trace : this.env.trace)) && (this.device.features.has("chromium-experimental-timestamp-query-inside-passes") ? this.queryType = "inside-passes" : this.device.features.has("timestamp-query") && (this.queryType = "at-passes"), this.queryType !== "none" && typeof this.querySet > "u" && (this.querySet = this.device.createQuerySet({
          type: "timestamp",
          count: this.maxDispatchNumber * 2
        }), this.queryResolveBuffer = this.device.createBuffer({
          size: this.maxDispatchNumber * 2 * 8,
          usage: GPUBufferUsage.COPY_SRC | GPUBufferUsage.QUERY_RESOLVE
        })));
      }
      captureBegin() {
        Rd("info", "captureBegin"), this.capturedCommandList.get(this.currentSessionId) || this.capturedCommandList.set(this.currentSessionId, []), this.capturedPendingKernels.get(this.currentSessionId) || this.capturedPendingKernels.set(this.currentSessionId, []), this.flush(), this.sessionStatus = "capturing";
      }
      captureEnd() {
        Rd("info", "captureEnd"), this.flush(), this.sessionStatus = "default";
      }
      replay() {
        Rd("info", "replay"), this.sessionStatus = "replaying";
        let e = this.capturedCommandList.get(this.currentSessionId),
          t = this.capturedPendingKernels.get(this.currentSessionId),
          n = e.length;
        this.pendingKernels = [];
        for (let r = 0; r < n; r++) {
          let a = this.getComputePassEncoder(),
            i = e[r];
          this.writeTimestamp(this.pendingDispatchNumber * 2), a.setPipeline(i.computePipeline), a.setBindGroup(0, i.bindGroup), a.dispatchWorkgroups(...i.dispatchGroup), this.writeTimestamp(this.pendingDispatchNumber * 2 + 1), this.pendingDispatchNumber++, this.queryType !== "none" && this.pendingKernels.push(t[r]), (this.pendingDispatchNumber >= this.maxDispatchNumber || this.queryType === "at-passes") && this.endComputePass(), this.pendingDispatchNumber >= this.maxDispatchNumber && this.flush();
        }
        this.flush(), this.sessionStatus = "default";
      }
      onCreateSession() {
        this.gpuDataManager.onCreateSession();
      }
      onReleaseSession(e) {
        this.unregisterBuffers(e), this.capturedCommandList.has(e) && this.capturedCommandList.delete(e), this.capturedPendingKernels.has(e) && this.capturedPendingKernels.delete(e), this.gpuDataManager.onReleaseSession(e);
      }
      onRunStart(e) {
        this.currentSessionId = e, this.setQueryType();
      }
    };
  }),
  dSn,
  Cht,
  uSn,
  Eht,
  Tht,
  Mht,
  hSn,
  W4r,
  ONo = Wi(() => {
    QD(), dSn = 1, Cht = () => dSn++, uSn = new Map([["float32", 32], ["float16", 16], ["int32", 32], ["uint32", 32], ["int64", 64], ["uint64", 64], ["int8", 8], ["uint8", 8], ["int4", 4], ["uint4", 4]]), Eht = (e, t) => {
      let n = uSn.get(e);
      if (!n) throw new Error("Unsupported data type.");
      return t.length > 0 ? Math.ceil(t.reduce((r, a) => r * a) * n / 8) : 0;
    }, Tht = class {
      constructor(e) {
        this.sessionId = e.sessionId, this.mlContext = e.context, this.mlTensor = e.tensor, this.dataType = e.dataType, this.tensorShape = e.shape;
      }
      get tensor() {
        return this.mlTensor;
      }
      get type() {
        return this.dataType;
      }
      get shape() {
        return this.tensorShape;
      }
      get byteLength() {
        return Eht(this.dataType, this.tensorShape);
      }
      destroy() {
        Rd("verbose", () => "[WebNN] TensorWrapper.destroy"), this.mlTensor.destroy();
      }
      write(e) {
        this.mlContext.writeTensor(this.mlTensor, e);
      }
      async read(e) {
        return e ? this.mlContext.readTensor(this.mlTensor, e) : this.mlContext.readTensor(this.mlTensor);
      }
      canReuseTensor(e, t, n) {
        return this.mlContext === e && this.dataType === t && this.tensorShape.length === n.length && this.tensorShape.every((r, a) => r === n[a]);
      }
    }, Mht = class {
      constructor(e, t) {
        this.tensorManager = e, this.wrapper = t;
      }
      get tensorWrapper() {
        return this.wrapper;
      }
      releaseTensor() {
        this.tensorWrapper && (this.tensorManager.releaseTensor(this.tensorWrapper), this.wrapper = void 0);
      }
      async ensureTensor(e, t, n, r) {
        let a = this.tensorManager.getMLContext(e);
        if (this.wrapper) {
          if (this.wrapper.canReuseTensor(a, t, n)) return this.wrapper.tensor;
          if (r) {
            if (this.wrapper.byteLength !== Eht(t, n)) throw new Error("Unable to copy data to tensor with different size.");
            this.activeUpload = new Uint8Array(await this.wrapper.read());
          }
          this.tensorManager.releaseTensor(this.wrapper);
        }
        let i = typeof MLTensorUsage > "u" ? void 0 : MLTensorUsage.READ | MLTensorUsage.WRITE;
        return this.wrapper = await this.tensorManager.getCachedTensor(e, t, n, i, !0, !0), r && this.activeUpload && (this.wrapper.write(this.activeUpload), this.activeUpload = void 0), this.wrapper.tensor;
      }
      upload(e) {
        if (this.wrapper) if (e.byteLength === this.wrapper.byteLength) {
          this.wrapper.write(e);
          return;
        } else Rd("verbose", () => "Data size does not match tensor size. Releasing tensor."), this.releaseTensor();
        this.activeUpload ? this.activeUpload.set(e) : this.activeUpload = new Uint8Array(e);
      }
      async download(e) {
        if (this.activeUpload) if (e) {
          e instanceof ArrayBuffer ? new Uint8Array(e).set(this.activeUpload) : new Uint8Array(e.buffer, e.byteOffset, e.byteLength).set(this.activeUpload);
          return;
        } else return this.activeUpload.buffer;
        if (!this.wrapper) throw new Error("Tensor has not been created.");
        return e ? this.wrapper.read(e) : this.wrapper.read();
      }
    }, hSn = class {
      constructor(e) {
        this.backend = e, this.tensorTrackersById = new Map(), this.freeTensors = [], this.externalTensors = new Set();
      }
      getMLContext(e) {
        let t = this.backend.getMLContext(e);
        if (!t) throw new Error("MLContext not found for session.");
        return t;
      }
      reserveTensorId() {
        let e = Cht();
        return this.tensorTrackersById.set(e, new Mht(this)), e;
      }
      releaseTensorId(e) {
        let t = this.tensorTrackersById.get(e);
        t && (this.tensorTrackersById.delete(e), t.tensorWrapper && this.releaseTensor(t.tensorWrapper));
      }
      async ensureTensor(e, t, n, r, a) {
        Rd("verbose", () => `[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${n}, shape: ${r}, copyOld: ${a}}`);
        let i = this.tensorTrackersById.get(t);
        if (!i) throw new Error("Tensor not found.");
        return i.ensureTensor(e, n, r, a);
      }
      upload(e, t) {
        let n = this.tensorTrackersById.get(e);
        if (!n) throw new Error("Tensor not found.");
        n.upload(t);
      }
      async download(e, t) {
        Rd("verbose", () => `[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t == null ? void 0 : t.byteLength}}`);
        let n = this.tensorTrackersById.get(e);
        if (!n) throw new Error("Tensor not found.");
        return n.download(t);
      }
      releaseTensorsForSession(e) {
        for (let t of this.freeTensors) t.sessionId === e && t.destroy();
        this.freeTensors = this.freeTensors.filter(t => t.sessionId !== e);
      }
      registerTensor(e, t, n, r) {
        let a = this.getMLContext(e),
          i = Cht(),
          o = new Tht({
            sessionId: e,
            context: a,
            tensor: t,
            dataType: n,
            shape: r
          });
        return this.tensorTrackersById.set(i, new Mht(this, o)), this.externalTensors.add(o), i;
      }
      async getCachedTensor(e, t, n, r, a, i) {
        let o = this.getMLContext(e);
        for (let [l, d] of this.freeTensors.entries()) if (d.canReuseTensor(o, t, n)) {
          Rd("verbose", () => `[WebNN] Reusing tensor {dataType: ${t}, shape: ${n}}`);
          let u = this.freeTensors.splice(l, 1)[0];
          return u.sessionId = e, u;
        }
        Rd("verbose", () => `[WebNN] MLContext.createTensor {dataType: ${t}, shape: ${n}}`);
        let s = await o.createTensor({
          dataType: t,
          shape: n,
          dimensions: n,
          usage: r,
          writable: a,
          readable: i
        });
        return new Tht({
          sessionId: e,
          context: o,
          tensor: s,
          dataType: t,
          shape: n
        });
      }
      releaseTensor(e) {
        this.externalTensors.has(e) && this.externalTensors.delete(e), this.freeTensors.push(e);
      }
    }, W4r = (...e) => new hSn(...e);
  }),
  k9e,
  pSn,
  q4r,
  BNo = Wi(() => {
    ol(), iee(), rSr(), ONo(), QD(), k9e = new Map([[1, "float32"], [10, "float16"], [6, "int32"], [12, "uint32"], [7, "int64"], [13, "uint64"], [22, "int4"], [21, "uint4"], [3, "int8"], [2, "uint8"], [9, "uint8"]]), pSn = (e, t) => {
      if (e === t) return !0;
      if (e === void 0 || t === void 0) return !1;
      let n = Object.keys(e).sort(),
        r = Object.keys(t).sort();
      return n.length === r.length && n.every((a, i) => a === r[i] && e[a] === t[a]);
    }, q4r = class {
      constructor(e) {
        this.tensorManager = W4r(this), this.mlContextBySessionId = new Map(), this.sessionIdsByMLContext = new Map(), this.mlContextCache = [], this.sessionGraphInputs = new Map(), this.temporaryGraphInputs = [], this.temporarySessionTensorIds = new Map(), QGt(e.logLevel, !!e.debug);
      }
      get currentSessionId() {
        if (this.activeSessionId === void 0) throw new Error("No active session");
        return this.activeSessionId;
      }
      onRunStart(e) {
        Rd("verbose", () => `[WebNN] onRunStart {sessionId: ${e}}`), this.activeSessionId = e;
      }
      onRunEnd(e) {
        Rd("verbose", () => `[WebNN] onRunEnd {sessionId: ${e}}`);
        let t = this.temporarySessionTensorIds.get(e);
        if (t) {
          for (let n of t) Rd("verbose", () => `[WebNN] releasing temporary tensor {tensorId: ${n}}`), this.tensorManager.releaseTensorId(n);
          this.temporarySessionTensorIds.delete(e), this.activeSessionId = void 0;
        }
      }
      async createMLContext(e) {
        if (e instanceof GPUDevice) {
          let n = this.mlContextCache.findIndex(r => r.gpuDevice === e);
          if (n !== -1) return this.mlContextCache[n].mlContext;
          {
            let r = await navigator.ml.createContext(e);
            return this.mlContextCache.push({
              gpuDevice: e,
              mlContext: r
            }), r;
          }
        } else if (e === void 0) {
          let n = this.mlContextCache.findIndex(r => r.options === void 0 && r.gpuDevice === void 0);
          if (n !== -1) return this.mlContextCache[n].mlContext;
          {
            let r = await navigator.ml.createContext();
            return this.mlContextCache.push({
              mlContext: r
            }), r;
          }
        }
        let t = this.mlContextCache.findIndex(n => pSn(n.options, e));
        if (t !== -1) return this.mlContextCache[t].mlContext;
        {
          let n = await navigator.ml.createContext(e);
          return this.mlContextCache.push({
            options: e,
            mlContext: n
          }), n;
        }
      }
      registerMLContext(e, t) {
        this.mlContextBySessionId.set(e, t);
        let n = this.sessionIdsByMLContext.get(t);
        n || (n = new Set(), this.sessionIdsByMLContext.set(t, n)), n.add(e), this.temporaryGraphInputs.length > 0 && (this.sessionGraphInputs.set(e, this.temporaryGraphInputs), this.temporaryGraphInputs = []);
      }
      onReleaseSession(e) {
        this.sessionGraphInputs.delete(e);
        let t = this.mlContextBySessionId.get(e);
        if (!t) return;
        this.tensorManager.releaseTensorsForSession(e), this.mlContextBySessionId.delete(e);
        let n = this.sessionIdsByMLContext.get(t);
        if (n.delete(e), n.size === 0) {
          this.sessionIdsByMLContext.delete(t);
          let r = this.mlContextCache.findIndex(a => a.mlContext === t);
          r !== -1 && this.mlContextCache.splice(r, 1);
        }
      }
      getMLContext(e) {
        return this.mlContextBySessionId.get(e);
      }
      reserveTensorId() {
        return this.tensorManager.reserveTensorId();
      }
      releaseTensorId(e) {
        Rd("verbose", () => `[WebNN] releaseTensorId {tensorId: ${e}}`), this.tensorManager.releaseTensorId(e);
      }
      async ensureTensor(e, t, n, r, a) {
        let i = k9e.get(n);
        if (!i) throw new Error(`Unsupported ONNX data type: ${n}`);
        return this.tensorManager.ensureTensor(e ?? this.currentSessionId, t, i, r, a);
      }
      async createTemporaryTensor(e, t, n) {
        Rd("verbose", () => `[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${n}}`);
        let r = k9e.get(t);
        if (!r) throw new Error(`Unsupported ONNX data type: ${t}`);
        let a = this.tensorManager.reserveTensorId();
        await this.tensorManager.ensureTensor(e, a, r, n, !1);
        let i = this.temporarySessionTensorIds.get(e);
        return i ? i.push(a) : this.temporarySessionTensorIds.set(e, [a]), a;
      }
      uploadTensor(e, t) {
        if (!cb().shouldTransferToMLTensor) throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");
        Rd("verbose", () => `[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`), this.tensorManager.upload(e, t);
      }
      async downloadTensor(e, t) {
        return this.tensorManager.download(e, t);
      }
      createMLTensorDownloader(e, t) {
        return async () => {
          let n = await this.tensorManager.download(e);
          return YGt(n, t);
        };
      }
      registerMLTensor(e, t, n, r) {
        let a = k9e.get(n);
        if (!a) throw new Error(`Unsupported ONNX data type: ${n}`);
        let i = this.tensorManager.registerTensor(e, t, a, r);
        return Rd("verbose", () => `[WebNN] registerMLTensor {tensor: ${t}, dataType: ${a}, dimensions: ${r}} -> {tensorId: ${i}}`), i;
      }
      registerMLConstant(e, t, n, r, a, i) {
        if (!i) throw new Error("External mounted files are not available.");
        let o = e;
        e.startsWith("./") && (o = e.substring(2));
        let s = i.get(o);
        if (!s) throw new Error(`File with name ${o} not found in preloaded files.`);
        if (t + n > s.byteLength) throw new Error("Out of bounds: data offset and length exceed the external file data size.");
        let l = s.slice(t, t + n).buffer,
          d;
        switch (a.dataType) {
          case "float32":
            d = new Float32Array(l);
            break;
          case "float16":
            d = new Uint16Array(l);
            break;
          case "int32":
            d = new Int32Array(l);
            break;
          case "uint32":
            d = new Uint32Array(l);
            break;
          case "int64":
            d = new BigInt64Array(l);
            break;
          case "uint64":
            d = new BigUint64Array(l);
            break;
          case "int8":
            d = new Int8Array(l);
            break;
          case "int4":
          case "uint4":
          case "uint8":
            d = new Uint8Array(l);
            break;
          default:
            throw new Error(`Unsupported data type: ${a.dataType} in creating WebNN Constant from external data.`);
        }
        return Rd("verbose", () => `[WebNN] registerMLConstant {dataType: ${a.dataType}, shape: ${a.shape}}}`), r.constant(a, d);
      }
      registerGraphInput(e) {
        this.temporaryGraphInputs.push(e);
      }
      isGraphInput(e, t) {
        let n = this.sessionGraphInputs.get(e);
        return n ? n.includes(t) : !1;
      }
      flush() {}
    };
  }),
  K4r = {};

CEe(K4r, {
  init: () => Q4r
});

var A9e,
  mSn,
  Q4r,
  FNo = Wi(() => {
    ol(), LNo(), QD(), Wl(), BNo(), A9e = class Y4r {
      constructor(t, n, r, a) {
        this.module = t, this.dataType = n, this.data = r, this.dims = a;
      }
      getFloat32Array() {
        if (this.dataType !== 1) throw new Error("Invalid data type");
        let t = si.size(this.dims);
        return t === 0 ? new Float32Array() : new Float32Array(this.module.HEAP8.buffer, this.data, t);
      }
      getBigInt64Array() {
        if (this.dataType !== 7) throw new Error("Invalid data type");
        let t = si.size(this.dims);
        return t === 0 ? new BigInt64Array() : new BigInt64Array(this.module.HEAP8.buffer, this.data, t);
      }
      getInt32Array() {
        if (this.dataType !== 6) throw new Error("Invalid data type");
        let t = si.size(this.dims);
        return t === 0 ? new Int32Array() : new Int32Array(this.module.HEAP8.buffer, this.data, t);
      }
      getUint16Array() {
        if (this.dataType !== 10 && this.dataType !== 4) throw new Error("Invalid data type");
        let t = si.size(this.dims);
        return t === 0 ? new Uint16Array() : new Uint16Array(this.module.HEAP8.buffer, this.data, t);
      }
      reshape(t) {
        if (si.size(t) !== si.size(this.dims)) throw new Error("Invalid new shape");
        return new Y4r(this.module, this.dataType, this.data, t);
      }
    }, mSn = class {
      constructor(e, t, n) {
        this.module = e, this.backend = t, this.customDataOffset = 0, this.customDataSize = 0, this.adapterInfo = t.adapterInfo, this.deviceInfo = t.deviceInfo;
        let r = e.PTR_SIZE,
          a = n / e.PTR_SIZE,
          i = r === 4 ? "i32" : "i64";
        this.opKernelContext = Number(e.getValue(r * a++, i));
        let o = Number(e.getValue(r * a++, i));
        this.outputCount = Number(e.getValue(r * a++, i)), this.customDataOffset = Number(e.getValue(r * a++, "*")), this.customDataSize = Number(e.getValue(r * a++, i));
        let s = [];
        for (let l = 0; l < o; l++) {
          let d = Number(e.getValue(r * a++, i)),
            u = Number(e.getValue(r * a++, "*")),
            h = Number(e.getValue(r * a++, i)),
            p = [];
          for (let m = 0; m < h; m++) p.push(Number(e.getValue(r * a++, i)));
          s.push(new A9e(e, d, u, p));
        }
        this.inputs = s;
      }
      get kernelCustomData() {
        return this.backend.currentKernelCustomData;
      }
      get customDataBuffer() {
        return this.module.HEAPU8.subarray(this.customDataOffset, this.customDataOffset + this.customDataSize);
      }
      compute(e, t) {
        var o;
        let n = ((o = t == null ? void 0 : t.inputs) == null ? void 0 : o.map(s => typeof s == "number" ? this.inputs[s] : s)) ?? this.inputs,
          r = (t == null ? void 0 : t.outputs) ?? [],
          a = (s, l, d) => new A9e(this.module, l, this.output(s, d), d),
          i = (s, l) => {
            let d = NH(s, l);
            if (!d) throw new Error(`Unsupported data type: ${s}`);
            let u = d > 0 ? this.backend.gpuDataManager.create(d).id : 0;
            return new A9e(this.module, s, u, l);
          };
        return this.backend.run(e, n, r, a, i, this.outputCount);
      }
      output(e, t) {
        let n = this.module.stackSave();
        try {
          let r = this.module.PTR_SIZE,
            a = r === 4 ? "i32" : "i64",
            i = this.module.stackAlloc((1 + t.length) * r);
          this.module.setValue(i, t.length, a);
          for (let o = 0; o < t.length; o++) this.module.setValue(i + r * (o + 1), t[o], a);
          return this.module._JsepOutput(this.opKernelContext, e, i);
        } catch (r) {
          throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${r}`);
        } finally {
          this.module.stackRestore(n);
        }
      }
    }, Q4r = async (e, t, n, r) => {
      let a = t.jsepInit;
      if (!a) throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");
      if (e === "webgpu") {
        let i = new H4r();
        await i.initialize(n, r), a("webgpu", [i, o => i.alloc(Number(o)), o => i.free(o), (o, s, l, d = !1) => {
          if (d) Rd("verbose", () => `[WebGPU] jsepCopyGpuToGpu: src=${Number(o)}, dst=${Number(s)}, size=${Number(l)}`), i.memcpy(Number(o), Number(s));else {
            Rd("verbose", () => `[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(o)}, gpuDataId=${Number(s)}, size=${Number(l)}`);
            let u = t.HEAPU8.subarray(Number(o >>> 0), Number(o >>> 0) + Number(l));
            i.upload(Number(s), u);
          }
        }, async (o, s, l) => {
          Rd("verbose", () => `[WebGPU] jsepCopyGpuToCpu: gpuDataId=${o}, dataOffset=${s}, size=${l}`), await i.download(Number(o), () => t.HEAPU8.subarray(Number(s) >>> 0, Number(s + l) >>> 0));
        }, (o, s, l) => i.createKernel(o, Number(s), l, t.UTF8ToString(t._JsepGetNodeName(Number(s)))), o => i.releaseKernel(o), (o, s, l, d) => {
          Rd("verbose", () => `[WebGPU] jsepRun: sessionHandle=${l}, kernel=${o}, contextDataOffset=${s}`);
          let u = new mSn(t, i, Number(s));
          return i.computeKernel(Number(o), u, d);
        }, () => i.captureBegin(), () => i.captureEnd(), () => i.replay()]);
      } else {
        let i = new q4r(n);
        a("webnn", [i, () => i.reserveTensorId(), o => i.releaseTensorId(o), async (o, s, l, d, u) => i.ensureTensor(o, s, l, d, u), (o, s) => {
          i.uploadTensor(o, s);
        }, async (o, s) => i.downloadTensor(o, s)]);
      }
    };
  }),
  fSn,
  sVt,
  lVt,
  eO,
  gSn,
  PGe,
  cVt,
  dVt,
  Pht,
  uVt,
  hVt,
  pVt,
  X4r = Wi(() => {
    GRo(), VRo(), ol(), iee(), VGt(), nSr(), fSn = (e, t) => {
      cb()._OrtInit(e, t) !== 0 && ku("Can't initialize onnxruntime.");
    }, sVt = async e => {
      fSn(e.wasm.numThreads, CGe(e.logLevel));
    }, lVt = async (e, t) => {
      {
        let n = (FNo(), SGe(K4r)).init;
        if (t === "webgpu") {
          if (typeof navigator > "u" || !navigator.gpu) throw new Error("WebGPU is not supported in current environment");
          let r = e.webgpu.adapter;
          if (r) {
            if (typeof r.limits != "object" || typeof r.features != "object" || typeof r.requestDevice != "function") throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.");
          } else {
            let a = e.webgpu.powerPreference;
            if (a !== void 0 && a !== "low-power" && a !== "high-performance") throw new Error(`Invalid powerPreference setting: "${a}"`);
            let i = e.webgpu.forceFallbackAdapter;
            if (i !== void 0 && typeof i != "boolean") throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);
            if (r = await navigator.gpu.requestAdapter({
              powerPreference: a,
              forceFallbackAdapter: i
            }), !r) throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.');
          }
          await n("webgpu", cb(), e, r);
        }
        if (t === "webnn") {
          if (typeof navigator > "u" || !navigator.ml) throw new Error("WebNN is not supported in current environment");
          await n("webnn", cb(), e);
        }
      }
    }, eO = new Map(), gSn = e => {
      let t = cb(),
        n = t.stackSave();
      try {
        let r = t.PTR_SIZE,
          a = t.stackAlloc(2 * r);
        t._OrtGetInputOutputCount(e, a, a + r) !== 0 && ku("Can't get session input/output count.");
        let i = r === 4 ? "i32" : "i64";
        return [Number(t.getValue(a, i)), Number(t.getValue(a + r, i))];
      } finally {
        t.stackRestore(n);
      }
    }, PGe = e => {
      let t = cb(),
        n = t._malloc(e.byteLength);
      if (n === 0) throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);
      return t.HEAPU8.set(e, n), [n, e.byteLength];
    }, cVt = async (e, t) => {
      var h, p, m;
      let n,
        r,
        a = cb();
      Array.isArray(e) ? [n, r] = e : e.buffer === a.HEAPU8.buffer ? [n, r] = [e.byteOffset, e.byteLength] : [n, r] = PGe(e);
      let i = 0,
        o = 0,
        s = 0,
        l = [],
        d = [],
        u = [];
      try {
        if ([o, l] = tSr(t), (t == null ? void 0 : t.externalData) && a.mountExternalData) {
          let A = [];
          for (let S of t.externalData) {
            let C = typeof S == "string" ? S : S.path;
            A.push(KGt(typeof S == "string" ? S : S.data).then(I => {
              a.mountExternalData(C, I);
            }));
          }
          await Promise.all(A);
        }
        for (let A of (t == null ? void 0 : t.executionProviders) ?? []) if ((typeof A == "string" ? A : A.name) === "webnn") {
          if (a.shouldTransferToMLTensor = !1, typeof A != "string") {
            let S = A,
              C = S == null ? void 0 : S.context,
              I = S == null ? void 0 : S.gpuDevice,
              E = S == null ? void 0 : S.deviceType,
              M = S == null ? void 0 : S.powerPreference;
            C ? a.currentContext = C : I ? a.currentContext = await a.jsepCreateMLContext(I) : a.currentContext = await a.jsepCreateMLContext({
              deviceType: E,
              powerPreference: M
            });
          } else a.currentContext = await a.jsepCreateMLContext();
          break;
        }
        i = await a._OrtCreateSession(n, r, o), i === 0 && ku("Can't create a session."), (h = a.jsepOnCreateSession) == null || h.call(a), a.currentContext && (a.jsepRegisterMLContext(i, a.currentContext), a.currentContext = void 0, a.shouldTransferToMLTensor = !0);
        let [f, y] = gSn(i),
          b = !!(t != null && t.enableGraphCapture),
          v = [],
          _ = [],
          w = [];
        for (let A = 0; A < f; A++) {
          let S = a._OrtGetInputName(i, A);
          S === 0 && ku("Can't get an input name."), d.push(S), v.push(a.UTF8ToString(S));
        }
        for (let A = 0; A < y; A++) {
          let S = a._OrtGetOutputName(i, A);
          S === 0 && ku("Can't get an output name."), u.push(S);
          let C = a.UTF8ToString(S);
          _.push(C);
          {
            if (b && (t == null ? void 0 : t.preferredOutputLocation) === void 0) {
              w.push("gpu-buffer");
              continue;
            }
            let I = typeof (t == null ? void 0 : t.preferredOutputLocation) == "string" ? t.preferredOutputLocation : ((p = t == null ? void 0 : t.preferredOutputLocation) == null ? void 0 : p[C]) ?? "cpu";
            if (I !== "cpu" && I !== "cpu-pinned" && I !== "gpu-buffer" && I !== "ml-tensor") throw new Error(`Not supported preferred output location: ${I}.`);
            if (b && I !== "gpu-buffer") throw new Error(`Not supported preferred output location: ${I}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);
            w.push(I);
          }
        }
        let k = null;
        return w.some(A => A === "gpu-buffer" || A === "ml-tensor") && (s = a._OrtCreateBinding(i), s === 0 && ku("Can't create IO binding."), k = {
          handle: s,
          outputPreferredLocations: w,
          outputPreferredLocationsEncoded: w.map(A => g4t(A))
        }), eO.set(i, [i, d, u, k, b, !1]), [i, v, _];
      } catch (f) {
        throw d.forEach(y => a._OrtFree(y)), u.forEach(y => a._OrtFree(y)), s !== 0 && a._OrtReleaseBinding(s) !== 0 && ku("Can't release IO binding."), i !== 0 && a._OrtReleaseSession(i) !== 0 && ku("Can't release session."), f;
      } finally {
        a._free(n), o !== 0 && a._OrtReleaseSessionOptions(o) !== 0 && ku("Can't release session options."), l.forEach(f => a._free(f)), (m = a.unmountExternalData) == null || m.call(a);
      }
    }, dVt = e => {
      var l;
      let t = cb(),
        n = eO.get(e);
      if (!n) throw new Error(`cannot release session. invalid session id: ${e}`);
      let [r, a, i, o, s] = n;
      o && (s && t._OrtClearBoundOutputs(o.handle) !== 0 && ku("Can't clear bound outputs."), t._OrtReleaseBinding(o.handle) !== 0 && ku("Can't release IO binding.")), (l = t.jsepOnReleaseSession) == null || l.call(t, e), a.forEach(d => t._OrtFree(d)), i.forEach(d => t._OrtFree(d)), t._OrtReleaseSession(r) !== 0 && ku("Can't release session."), eO.delete(e);
    }, Pht = async (e, t, n, r, a, i = !1) => {
      if (!e) {
        t.push(0);
        return;
      }
      let o = cb(),
        s = o.PTR_SIZE,
        l = e[0],
        d = e[1],
        u = e[3],
        h = u,
        p,
        m;
      if (l === "string" && (u === "gpu-buffer" || u === "ml-tensor")) throw new Error("String tensor is not supported on GPU.");
      if (i && u !== "gpu-buffer") throw new Error(`External buffer must be provided for input/output index ${a} when enableGraphCapture is true.`);
      if (u === "gpu-buffer") {
        let b = e[2].gpuBuffer;
        m = NH(Yne(l), d);
        let v = o.jsepRegisterBuffer;
        if (!v) throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');
        p = v(r, a, b, m);
      } else if (u === "ml-tensor") {
        let b = e[2].mlTensor;
        m = NH(Yne(l), d);
        let v = o.jsepRegisterMLTensor;
        if (!v) throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');
        p = v(r, b, Yne(l), d);
      } else {
        let b = e[2];
        if (Array.isArray(b)) {
          m = s * b.length, p = o._malloc(m), n.push(p);
          for (let v = 0; v < b.length; v++) {
            if (typeof b[v] != "string") throw new TypeError(`tensor data at index ${v} is not a string`);
            o.setValue(p + v * s, A1(b[v], n), "*");
          }
        } else {
          let v = o.jsepIsGraphInput;
          if (l !== "string" && v) {
            let _ = o._OrtGetInputName(r, a),
              w = o.UTF8ToString(_);
            if (v(r, w)) {
              let k = Yne(l);
              m = NH(k, d), h = "ml-tensor";
              let A = o.jsepCreateTemporaryTensor,
                S = o.jsepUploadTensor;
              if (!A || !S) throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');
              let C = await A(r, k, d);
              S(C, new Uint8Array(b.buffer, b.byteOffset, b.byteLength)), p = C;
            } else m = b.byteLength, p = o._malloc(m), n.push(p), o.HEAPU8.set(new Uint8Array(b.buffer, b.byteOffset, m), p);
          } else m = b.byteLength, p = o._malloc(m), n.push(p), o.HEAPU8.set(new Uint8Array(b.buffer, b.byteOffset, m), p);
        }
      }
      let f = o.stackSave(),
        y = o.stackAlloc(4 * d.length);
      try {
        d.forEach((v, _) => o.setValue(y + _ * s, v, s === 4 ? "i32" : "i64"));
        let b = o._OrtCreateTensor(Yne(l), p, m, y, d.length, g4t(h));
        b === 0 && ku(`Can't create tensor for input/output. session=${r}, index=${a}.`), t.push(b);
      } finally {
        o.stackRestore(f);
      }
    }, uVt = async (e, t, n, r, a, i) => {
      var T, P, R;
      let o = cb(),
        s = o.PTR_SIZE,
        l = eO.get(e);
      if (!l) throw new Error(`cannot run inference. invalid session id: ${e}`);
      let d = l[0],
        u = l[1],
        h = l[2],
        p = l[3],
        m = l[4],
        f = l[5],
        y = t.length,
        b = r.length,
        v = 0,
        _ = [],
        w = [],
        k = [],
        A = [],
        S = o.stackSave(),
        C = o.stackAlloc(y * s),
        I = o.stackAlloc(y * s),
        E = o.stackAlloc(b * s),
        M = o.stackAlloc(b * s);
      try {
        [v, _] = eSr(i);
        for (let F = 0; F < y; F++) await Pht(n[F], w, A, e, t[F], m);
        for (let F = 0; F < b; F++) await Pht(a[F], k, A, e, y + r[F], m);
        for (let F = 0; F < y; F++) o.setValue(C + F * s, w[F], "*"), o.setValue(I + F * s, u[t[F]], "*");
        for (let F = 0; F < b; F++) o.setValue(E + F * s, k[F], "*"), o.setValue(M + F * s, h[r[F]], "*");
        if (p && !f) {
          let {
            handle: F,
            outputPreferredLocations: N,
            outputPreferredLocationsEncoded: G
          } = p;
          if (u.length !== y) throw new Error(`input count from feeds (${y}) is expected to be always equal to model's input count (${u.length}).`);
          for (let z = 0; z < y; z++) {
            let V = t[z];
            (await o._OrtBindInput(F, u[V], w[z])) !== 0 && ku(`Can't bind input[${z}] for session=${e}.`);
          }
          for (let z = 0; z < b; z++) {
            let V = r[z];
            (T = a[z]) != null && T[3] ? o._OrtBindOutput(F, h[V], k[z], 0) !== 0 && ku(`Can't bind pre-allocated output[${z}] for session=${e}.`) : o._OrtBindOutput(F, h[V], 0, G[V]) !== 0 && ku(`Can't bind output[${z}] to ${N[z]} for session=${e}.`);
          }
          eO.set(e, [d, u, h, p, m, !0]);
        }
        (P = o.jsepOnRunStart) == null || P.call(o, d);
        let j;
        p ? j = await o._OrtRunWithBinding(d, p.handle, b, E, v) : j = await o._OrtRun(d, I, C, y, M, b, E, v), j !== 0 && ku("failed to call OrtRun().");
        let B = [];
        for (let F = 0; F < b; F++) {
          let N = Number(o.getValue(E + F * s, "*"));
          if (N === k[F]) {
            B.push(a[F]);
            continue;
          }
          let G = o.stackSave(),
            z = o.stackAlloc(4 * s),
            V = !1,
            O,
            L = 0;
          try {
            o._OrtGetTensorData(N, z, z + s, z + 2 * s, z + 3 * s) !== 0 && ku(`Can't access output tensor data on index ${F}.`);
            let D = s === 4 ? "i32" : "i64",
              U = Number(o.getValue(z, D));
            L = o.getValue(z + s, "*");
            let H = o.getValue(z + s * 2, "*"),
              Y = Number(o.getValue(z + s * 3, D)),
              K = [];
            for (let q = 0; q < Y; q++) K.push(Number(o.getValue(H + q * s, D)));
            o._OrtFree(H) !== 0 && ku("Can't free memory for tensor dims.");
            let W = K.reduce((q, ne) => q * ne, 1);
            O = RH(U);
            let Q = p == null ? void 0 : p.outputPreferredLocations[r[F]];
            if (O === "string") {
              if (Q === "gpu-buffer" || Q === "ml-tensor") throw new Error("String tensor is not supported on GPU.");
              let q = [];
              for (let ne = 0; ne < W; ne++) {
                let de = o.getValue(L + ne * s, "*"),
                  le = o.getValue(L + (ne + 1) * s, "*"),
                  J = ne === W - 1 ? void 0 : le - de;
                q.push(o.UTF8ToString(de, J));
              }
              B.push([O, K, q, "cpu"]);
            } else if (Q === "gpu-buffer" && W > 0) {
              let q = o.jsepGetBuffer;
              if (!q) throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');
              let ne = q(L),
                de = NH(U, W);
              if (de === void 0 || !WGt(O)) throw new Error(`Unsupported data type: ${O}`);
              V = !0, B.push([O, K, {
                gpuBuffer: ne,
                download: o.jsepCreateDownloader(ne, de, O),
                dispose: () => {
                  o._OrtReleaseTensor(N) !== 0 && ku("Can't release tensor.");
                }
              }, "gpu-buffer"]);
            } else if (Q === "ml-tensor" && W > 0) {
              let q = o.jsepEnsureTensor;
              if (!q) throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');
              if (NH(U, W) === void 0 || !qGt(O)) throw new Error(`Unsupported data type: ${O}`);
              let ne = await q(e, L, U, K, !1);
              V = !0, B.push([O, K, {
                mlTensor: ne,
                download: o.jsepCreateMLTensorDownloader(L, O),
                dispose: () => {
                  o.jsepReleaseTensorId(L), o._OrtReleaseTensor(N);
                }
              }, "ml-tensor"]);
            } else {
              let q = HGt(O),
                ne = new q(W);
              new Uint8Array(ne.buffer, ne.byteOffset, ne.byteLength).set(o.HEAPU8.subarray(L, L + ne.byteLength)), B.push([O, K, ne, "cpu"]);
            }
          } finally {
            o.stackRestore(G), O === "string" && L && o._free(L), V || o._OrtReleaseTensor(N), (R = o.jsepOnRunEnd) == null || R.call(o, d);
          }
        }
        return p && !m && (o._OrtClearBoundOutputs(p.handle) !== 0 && ku("Can't clear bound outputs."), eO.set(e, [d, u, h, p, m, !1])), B;
      } finally {
        o.stackRestore(S), w.forEach(j => o._OrtReleaseTensor(j)), k.forEach(j => o._OrtReleaseTensor(j)), A.forEach(j => o._free(j)), v !== 0 && o._OrtReleaseRunOptions(v), _.forEach(j => o._free(j));
      }
    }, hVt = e => {
      let t = cb(),
        n = eO.get(e);
      if (!n) throw new Error("invalid session id");
      let r = n[0],
        a = t._OrtEndProfiling(r);
      a === 0 && ku("Can't get an profile file name."), t._OrtFree(a);
    }, pVt = e => {
      let t = [];
      for (let n of e) {
        let r = n[2];
        !Array.isArray(r) && "buffer" in r && t.push(r.buffer);
      }
      return t;
    };
  }),
  tO,
  L_,
  Jte,
  Oge,
  Bge,
  S9e,
  Rht,
  I9e,
  MV,
  PV,
  ySn,
  J4r,
  Z4r,
  e5r,
  t5r,
  n5r,
  r5r,
  a5r,
  i5r = Wi(() => {
    FT(), X4r(), iee(), $Gt(), tO = () => !!um.wasm.proxy && typeof document < "u", Jte = !1, Oge = !1, Bge = !1, I9e = new Map(), MV = (e, t) => {
      let n = I9e.get(e);
      n ? n.push(t) : I9e.set(e, [t]);
    }, PV = () => {
      if (Jte || !Oge || Bge || !L_) throw new Error("worker not ready");
    }, ySn = e => {
      switch (e.data.type) {
        case "init-wasm":
          Jte = !1, e.data.err ? (Bge = !0, Rht[1](e.data.err)) : (Oge = !0, Rht[0]()), S9e && (URL.revokeObjectURL(S9e), S9e = void 0);
          break;
        case "init-ep":
        case "copy-from":
        case "create":
        case "release":
        case "run":
        case "end-profiling":
          {
            let t = I9e.get(e.data.type);
            e.data.err ? t.shift()[1](e.data.err) : t.shift()[0](e.data.out);
            break;
          }
      }
    }, J4r = async () => {
      if (!Oge) {
        if (Jte) throw new Error("multiple calls to 'initWasm()' detected.");
        if (Bge) throw new Error("previous call to 'initWasm()' failed.");
        if (Jte = !0, tO()) return new Promise((e, t) => {
          L_ == null || L_.terminate(), JAr().then(([n, r]) => {
            var a;
            try {
              L_ = r, L_.onerror = o => t(o), L_.onmessage = ySn, Rht = [e, t];
              let i = {
                type: "init-wasm",
                in: um
              };
              !i.in.wasm.wasmPaths && (n || (a = import.meta.url) != null && a.startsWith("file:")) && (i.in.wasm.wasmPaths = {
                wasm: new URL("" + new URL("ort-wasm-simd-threaded.jsep-D5Jk56-t.wasm", import.meta.url).href, import.meta.url).href
              }), L_.postMessage(i), S9e = n;
            } catch (i) {
              t(i);
            }
          }, t);
        });
        try {
          await GGt(um.wasm), await sVt(um), Oge = !0;
        } catch (e) {
          throw Bge = !0, e;
        } finally {
          Jte = !1;
        }
      }
    }, Z4r = async e => {
      if (tO()) return PV(), new Promise((t, n) => {
        MV("init-ep", [t, n]);
        let r = {
          type: "init-ep",
          in: {
            epName: e,
            env: um
          }
        };
        L_.postMessage(r);
      });
      await lVt(um, e);
    }, e5r = async e => tO() ? (PV(), new Promise((t, n) => {
      MV("copy-from", [t, n]);
      let r = {
        type: "copy-from",
        in: {
          buffer: e
        }
      };
      L_.postMessage(r, [e.buffer]);
    })) : PGe(e), t5r = async (e, t) => {
      if (tO()) {
        if (t != null && t.preferredOutputLocation) throw new Error('session option "preferredOutputLocation" is not supported for proxy.');
        return PV(), new Promise((n, r) => {
          MV("create", [n, r]);
          let a = {
              type: "create",
              in: {
                model: e,
                options: {
                  ...t
                }
              }
            },
            i = [];
          e instanceof Uint8Array && i.push(e.buffer), L_.postMessage(a, i);
        });
      } else return cVt(e, t);
    }, n5r = async e => {
      if (tO()) return PV(), new Promise((t, n) => {
        MV("release", [t, n]);
        let r = {
          type: "release",
          in: e
        };
        L_.postMessage(r);
      });
      dVt(e);
    }, r5r = async (e, t, n, r, a, i) => {
      if (tO()) {
        if (n.some(o => o[3] !== "cpu")) throw new Error("input tensor on GPU is not supported for proxy.");
        if (a.some(o => o)) throw new Error("pre-allocated output tensor is not supported for proxy.");
        return PV(), new Promise((o, s) => {
          MV("run", [o, s]);
          let l = n,
            d = {
              type: "run",
              in: {
                sessionId: e,
                inputIndices: t,
                inputs: l,
                outputIndices: r,
                options: i
              }
            };
          L_.postMessage(d, pVt(l));
        });
      } else return uVt(e, t, n, r, a, i);
    }, a5r = async e => {
      if (tO()) return PV(), new Promise((t, n) => {
        MV("end-profiling", [t, n]);
        let r = {
          type: "end-profiling",
          in: e
        };
        L_.postMessage(r);
      });
      hVt(e);
    };
  }),
  Nht,
  bSn,
  o5r,
  zNo = Wi(() => {
    FT(), i5r(), ol(), UGt(), nSr(), Nht = (e, t) => {
      switch (e.location) {
        case "cpu":
          return [e.type, e.dims, e.data, "cpu"];
        case "gpu-buffer":
          return [e.type, e.dims, {
            gpuBuffer: e.gpuBuffer
          }, "gpu-buffer"];
        case "ml-tensor":
          return [e.type, e.dims, {
            mlTensor: e.mlTensor
          }, "ml-tensor"];
        default:
          throw new Error(`invalid data location: ${e.location} for ${t()}`);
      }
    }, bSn = e => {
      switch (e[3]) {
        case "cpu":
          return new iE(e[0], e[2], e[1]);
        case "gpu-buffer":
          {
            let t = e[0];
            if (!WGt(t)) throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);
            let {
              gpuBuffer: n,
              download: r,
              dispose: a
            } = e[2];
            return iE.fromGpuBuffer(n, {
              dataType: t,
              dims: e[1],
              download: r,
              dispose: a
            });
          }
        case "ml-tensor":
          {
            let t = e[0];
            if (!qGt(t)) throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);
            let {
              mlTensor: n,
              download: r,
              dispose: a
            } = e[2];
            return iE.fromMLTensor(n, {
              dataType: t,
              dims: e[1],
              download: r,
              dispose: a
            });
          }
        default:
          throw new Error(`invalid data location: ${e[3]}`);
      }
    }, o5r = class {
      async fetchModelAndCopyToWasmMemory(e) {
        return e5r(await KGt(e));
      }
      async loadModel(e, t) {
        vT();
        let n;
        typeof e == "string" ? n = await this.fetchModelAndCopyToWasmMemory(e) : n = e, [this.sessionId, this.inputNames, this.outputNames] = await t5r(n, t), X5();
      }
      async dispose() {
        return n5r(this.sessionId);
      }
      async run(e, t, n) {
        vT();
        let r = [],
          a = [];
        Object.entries(e).forEach(h => {
          let p = h[0],
            m = h[1],
            f = this.inputNames.indexOf(p);
          if (f === -1) throw new Error(`invalid input '${p}'`);
          r.push(m), a.push(f);
        });
        let i = [],
          o = [];
        Object.entries(t).forEach(h => {
          let p = h[0],
            m = h[1],
            f = this.outputNames.indexOf(p);
          if (f === -1) throw new Error(`invalid output '${p}'`);
          i.push(m), o.push(f);
        });
        let s = r.map((h, p) => Nht(h, () => `input "${this.inputNames[a[p]]}"`)),
          l = i.map((h, p) => h ? Nht(h, () => `output "${this.outputNames[o[p]]}"`) : null),
          d = await r5r(this.sessionId, a, s, o, l, n),
          u = {};
        for (let h = 0; h < d.length; h++) u[this.outputNames[o[h]]] = i[h] ?? bSn(d[h]);
        return X5(), u;
      }
      startProfiling() {}
      endProfiling() {
        a5r(this.sessionId);
      }
    };
  }),
  s5r = {};

CEe(s5r, {
  OnnxruntimeWebAssemblyBackend: () => T4t,
  initializeFlags: () => E4t,
  wasmBackend: () => l5r
});

var E4t,
  T4t,
  l5r,
  UNo = Wi(() => {
    FT(), i5r(), zNo(), E4t = () => {
      if ((typeof um.wasm.initTimeout != "number" || um.wasm.initTimeout < 0) && (um.wasm.initTimeout = 0), um.wasm.simd === !1 && console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'), typeof um.wasm.proxy != "boolean" && (um.wasm.proxy = !1), typeof um.wasm.trace != "boolean" && (um.wasm.trace = !1), typeof um.wasm.numThreads != "number" || !Number.isInteger(um.wasm.numThreads) || um.wasm.numThreads <= 0) if (typeof self < "u" && !self.crossOriginIsolated) um.wasm.numThreads = 1;else {
        let e = typeof navigator > "u" ? IRo("node:os").cpus().length : navigator.hardwareConcurrency;
        um.wasm.numThreads = Math.min(4, Math.ceil((e || 1) / 2));
      }
    }, T4t = class {
      async init(e) {
        E4t(), await J4r(), await Z4r(e);
      }
      async createInferenceSessionHandler(e, t) {
        let n = new o5r();
        return await n.loadModel(e, t), Promise.resolve(n);
      }
    }, l5r = new T4t();
  });

FT();

FT();

FT();

var $No = "1.21.0",
  GNo = WAr;

{
  let e = (UNo(), SGe(s5r)).wasmBackend;
  VW("webgpu", e, 5), VW("webnn", e, 5), VW("cpu", e, 10), VW("wasm", e, 10);
}

Object.defineProperty(um.versions, "web", {
  value: $No,
  enumerable: !0
});

/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*//**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 *//**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const VNo = Object.freeze(Object.defineProperty({
  __proto__: null,
  get InferenceSession() {
    return zGt;
  },
  get TRACE() {
    return ZAe;
  },
  get TRACE_FUNC_BEGIN() {
    return vT;
  },
  get TRACE_FUNC_END() {
    return X5;
  },
  get Tensor() {
    return iE;
  },
  default: GNo,
  get env() {
    return um;
  },
  get registerBackend() {
    return VW;
  }
}, Symbol.toStringTag, {
  value: "Module"
}));



// Register native local model transport after the recovered model store exists.
const aiyouRegisterNativeModels = () => window.__AIYOUPLUS_CANVAS_MODEL_ADAPTER__?.registerModels(Qa, {
  referenceAssets: { assetStore: ni, localCache: Ur, isThumbnailAsset: bY }
});
window.addEventListener("aiyouplus-canvas-model-adapter-ready", aiyouRegisterNativeModels);
aiyouRegisterNativeModels();
