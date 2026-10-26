var Vdt,
  Hdt,
  Pxr,
  Zvn,
  B8o = Hi(() => {
    var e, t;
    Hdt = (Vdt = import.meta.url, async function (n = {}) {
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
      (s || l) && (l ? b = self.location.href : typeof document < "u" && document.currentScript && (b = document.currentScript.src), Vdt && (b = Vdt), b = b.startsWith("blob:") ? "" : b.slice(0, b.replace(/[?#].*/, "").lastIndexOf("/") + 1), l && (m = oe => {
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
        var oe = new Worker(import.meta.url.startsWith("file:") ? new URL("" + new URL("ort.bundle.min-OfoG_cy9.mjs", import.meta.url).href, import.meta.url) : new URL(import.meta.url), {
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
    }), Pxr = Hdt, Zvn = (t = (e = globalThis.self) == null ? void 0 : e.name) == null ? void 0 : t.startsWith("em-pthread"), Zvn && Hdt();
  }),
  Wdt,
  e1n,
  PA,
  Rxr,
  ZPe,
  t1n,
  n1n,
  qdt,
  r1n,
  Kdt,
  Nxr,
  Qdt,
  jxr,
  rGt = Hi(() => {
    nGt(), Wdt = typeof location > "u" ? void 0 : location.origin, e1n = () => {
      var e;
      return (e = import.meta.url) != null && e.startsWith("file:") ? new URL(new URL("" + new URL("ort.bundle.min-OfoG_cy9.mjs", import.meta.url).href, import.meta.url).href, Wdt).href : import.meta.url;
    }, PA = e1n(), Rxr = () => {
      if (PA && !PA.startsWith("blob:")) return PA.substring(0, PA.lastIndexOf("/") + 1);
    }, ZPe = (e, t) => {
      try {
        let n = t ?? PA;
        return (n ? new URL(e, n) : new URL(e)).origin === Wdt;
      } catch {
        return !1;
      }
    }, t1n = (e, t) => {
      let n = t ?? PA;
      try {
        return (n ? new URL(e, n) : new URL(e)).href;
      } catch {
        return;
      }
    }, n1n = (e, t) => `${t ?? "./"}${e}`, qdt = async e => {
      let t = await (await fetch(e, {
        credentials: "same-origin"
      })).blob();
      return URL.createObjectURL(t);
    }, r1n = async e => (await import(e)).default, Kdt = (O8o(), cGe(Exr)).default, Nxr = async () => {
      if (!PA) throw new Error("Failed to load proxy worker: cannot determine the script source URL.");
      if (ZPe(PA)) return [void 0, Kdt()];
      let e = await qdt(PA);
      return [e, Kdt(e)];
    }, Qdt = (B8o(), cGe(Mxr)).default, jxr = async (e, t, n) => {
      if (!e && !t && Qdt && PA && ZPe(PA)) return [void 0, Qdt];
      {
        let r = "ort-wasm-simd-threaded.jsep.mjs",
          a = e ?? t1n(r, t),
          i = n && a && !ZPe(a, t),
          o = i ? await qdt(a) : a ?? n1n(r, t);
        return [i ? o : void 0, await r1n(o)];
      }
    };
  }),
  Ydt,
  e9e,
  wge,
  Xdt,
  a1n,
  i1n,
  aGt,
  lb,
  ree = Hi(() => {
    rGt(), e9e = !1, wge = !1, Xdt = !1, a1n = () => {
      if (typeof SharedArrayBuffer > "u") return !1;
      try {
        return typeof MessageChannel < "u" && new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)), WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 4, 1, 3, 1, 1, 10, 11, 1, 9, 0, 65, 0, 254, 16, 2, 0, 26, 11]));
      } catch {
        return !1;
      }
    }, i1n = () => {
      try {
        return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 30, 1, 28, 0, 65, 0, 253, 15, 253, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 253, 186, 1, 26, 11]));
      } catch {
        return !1;
      }
    }, aGt = async e => {
      if (e9e) return Promise.resolve();
      if (wge) throw new Error("multiple calls to 'initializeWebAssembly()' detected.");
      if (Xdt) throw new Error("previous call to 'initializeWebAssembly()' failed.");
      wge = !0;
      let t = e.initTimeout,
        n = e.numThreads;
      if (!i1n()) throw new Error("WebAssembly SIMD is not supported in the current environment.");
      let r = a1n();
      n > 1 && !r && (typeof self < "u" && !self.crossOriginIsolated && console.warn("env.wasm.numThreads is set to " + n + ", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."), console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."), e.numThreads = n = 1);
      let a = e.wasmPaths,
        i = typeof a == "string" ? a : void 0,
        o = a == null ? void 0 : a.mjs,
        s = (o == null ? void 0 : o.href) ?? o,
        l = a == null ? void 0 : a.wasm,
        d = (l == null ? void 0 : l.href) ?? l,
        u = e.wasmBinary,
        [h, p] = await jxr(s, i, n > 1),
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
          let _ = Rxr();
          _ && (v.locateFile = w => _ + w);
        }
        p(v).then(_ => {
          wge = !1, e9e = !0, Ydt = _, y(), h && URL.revokeObjectURL(h);
        }, _ => {
          wge = !1, Xdt = !0, b(_);
        });
      })), await Promise.race(f), m) throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`);
    }, lb = () => {
      if (e9e && Ydt) return Ydt;
      throw new Error("WebAssembly is not initialized yet.");
    };
  }),
  k1,
  dGe,
  _u,
  iGt = Hi(() => {
    ree(), k1 = (e, t) => {
      let n = lb(),
        r = n.lengthBytesUTF8(e) + 1,
        a = n._malloc(r);
      return n.stringToUTF8(e, a, r), t.push(a), a;
    }, dGe = (e, t, n, r) => {
      if (typeof e == "object" && e !== null) {
        if (n.has(e)) throw new Error("Circular reference in options");
        n.add(e);
      }
      Object.entries(e).forEach(([a, i]) => {
        let o = t ? t + a : a;
        if (typeof i == "object") dGe(i, o + ".", n, r);else if (typeof i == "string" || typeof i == "number") r(o, i.toString());else if (typeof i == "boolean") r(o, i ? "1" : "0");else throw new Error(`Can't handle extra config type: ${typeof i}`);
      });
    }, _u = e => {
      let t = lb(),
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
  Dxr,
  F8o = Hi(() => {
    ree(), iGt(), Dxr = e => {
      let t = lb(),
        n = 0,
        r = [],
        a = e || {};
      try {
        if ((e == null ? void 0 : e.logSeverityLevel) === void 0) a.logSeverityLevel = 2;else if (typeof e.logSeverityLevel != "number" || !Number.isInteger(e.logSeverityLevel) || e.logSeverityLevel < 0 || e.logSeverityLevel > 4) throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);
        if ((e == null ? void 0 : e.logVerbosityLevel) === void 0) a.logVerbosityLevel = 0;else if (typeof e.logVerbosityLevel != "number" || !Number.isInteger(e.logVerbosityLevel)) throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);
        (e == null ? void 0 : e.terminate) === void 0 && (a.terminate = !1);
        let i = 0;
        return (e == null ? void 0 : e.tag) !== void 0 && (i = k1(e.tag, r)), n = t._OrtCreateRunOptions(a.logSeverityLevel, a.logVerbosityLevel, !!a.terminate, i), n === 0 && _u("Can't create run options."), (e == null ? void 0 : e.extra) !== void 0 && dGe(e.extra, "", new WeakSet(), (o, s) => {
          let l = k1(o, r),
            d = k1(s, r);
          t._OrtAddRunConfigEntry(n, l, d) !== 0 && _u(`Can't set a run config entry: ${o} - ${s}.`);
        }), [n, r];
      } catch (i) {
        throw n !== 0 && t._OrtReleaseRunOptions(n), r.forEach(o => t._free(o)), i;
      }
    };
  }),
  o1n,
  s1n,
  l1n,
  c1n,
  Lxr,
  z8o = Hi(() => {
    ree(), iGt(), o1n = e => {
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
    }, s1n = e => {
      switch (e) {
        case "sequential":
          return 0;
        case "parallel":
          return 1;
        default:
          throw new Error(`unsupported execution mode: ${e}`);
      }
    }, l1n = e => {
      e.extra || (e.extra = {}), e.extra.session || (e.extra.session = {});
      let t = e.extra.session;
      t.use_ort_model_bytes_directly || (t.use_ort_model_bytes_directly = "1"), e.executionProviders && e.executionProviders.some(n => (typeof n == "string" ? n : n.name) === "webgpu") && (e.enableMemPattern = !1);
    }, c1n = (e, t, n) => {
      for (let r of t) {
        let a = typeof r == "string" ? r : r.name;
        switch (a) {
          case "webnn":
            if (a = "WEBNN", typeof r != "string") {
              let o = r == null ? void 0 : r.deviceType;
              if (o) {
                let s = k1("deviceType", n),
                  l = k1(o, n);
                lb()._OrtAddSessionConfigEntry(e, s, l) !== 0 && _u(`Can't set a session config entry: 'deviceType' - ${o}.`);
              }
            }
            break;
          case "webgpu":
            if (a = "JS", typeof r != "string") {
              let o = r;
              if (o != null && o.preferredLayout) {
                if (o.preferredLayout !== "NCHW" && o.preferredLayout !== "NHWC") throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${o.preferredLayout}`);
                let s = k1("preferredLayout", n),
                  l = k1(o.preferredLayout, n);
                lb()._OrtAddSessionConfigEntry(e, s, l) !== 0 && _u(`Can't set a session config entry: 'preferredLayout' - ${o.preferredLayout}.`);
              }
            }
            break;
          case "wasm":
          case "cpu":
            continue;
          default:
            throw new Error(`not supported execution provider: ${a}`);
        }
        let i = k1(a, n);
        lb()._OrtAppendExecutionProvider(e, i) !== 0 && _u(`Can't append execution provider: ${a}.`);
      }
    }, Lxr = e => {
      let t = lb(),
        n = 0,
        r = [],
        a = e || {};
      l1n(a);
      try {
        let i = o1n(a.graphOptimizationLevel ?? "all"),
          o = s1n(a.executionMode ?? "sequential"),
          s = typeof a.logId == "string" ? k1(a.logId, r) : 0,
          l = a.logSeverityLevel ?? 2;
        if (!Number.isInteger(l) || l < 0 || l > 4) throw new Error(`log serverity level is not valid: ${l}`);
        let d = a.logVerbosityLevel ?? 0;
        if (!Number.isInteger(d) || d < 0 || d > 4) throw new Error(`log verbosity level is not valid: ${d}`);
        let u = typeof a.optimizedModelFilePath == "string" ? k1(a.optimizedModelFilePath, r) : 0;
        if (n = t._OrtCreateSessionOptions(i, !!a.enableCpuMemArena, !!a.enableMemPattern, o, !!a.enableProfiling, 0, s, l, d, u), n === 0 && _u("Can't create session options."), a.executionProviders && c1n(n, a.executionProviders, r), a.enableGraphCapture !== void 0) {
          if (typeof a.enableGraphCapture != "boolean") throw new Error(`enableGraphCapture must be a boolean value: ${a.enableGraphCapture}`);
          let h = k1("enableGraphCapture", r),
            p = k1(a.enableGraphCapture.toString(), r);
          t._OrtAddSessionConfigEntry(n, h, p) !== 0 && _u(`Can't set a session config entry: 'enableGraphCapture' - ${a.enableGraphCapture}.`);
        }
        if (a.freeDimensionOverrides) for (let [h, p] of Object.entries(a.freeDimensionOverrides)) {
          if (typeof h != "string") throw new Error(`free dimension override name must be a string: ${h}`);
          if (typeof p != "number" || !Number.isInteger(p) || p < 0) throw new Error(`free dimension override value must be a non-negative integer: ${p}`);
          let m = k1(h, r);
          t._OrtAddFreeDimensionOverride(n, m, p) !== 0 && _u(`Can't set a free dimension override: ${h} - ${p}.`);
        }
        return a.extra !== void 0 && dGe(a.extra, "", new WeakSet(), (h, p) => {
          let m = k1(h, r),
            f = k1(p, r);
          t._OrtAddSessionConfigEntry(n, m, f) !== 0 && _u(`Can't set a session config entry: ${h} - ${p}.`);
        }), [n, r];
      } catch (i) {
        throw n !== 0 && t._OrtReleaseSessionOptions(n) !== 0 && _u("Can't release session options."), r.forEach(o => t._free(o)), i;
      }
    };
  }),
  Kne,
  TH,
  MH,
  oGt,
  uGe,
  sGt,
  lGt,
  H3t,
  il = Hi(() => {
    Kne = e => {
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
    }, TH = e => {
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
    }, MH = (e, t) => {
      let n = [-1, 4, 1, 1, 2, 2, 4, 8, -1, 1, 2, 8, 4, 8, -1, -1, -1, -1, -1, -1, -1, .5, .5][e],
        r = typeof t == "number" ? t : t.reduce((a, i) => a * i, 1);
      return n > 0 ? Math.ceil(r * n) : void 0;
    }, oGt = e => {
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
    }, uGe = e => {
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
    }, sGt = e => e === "float32" || e === "float16" || e === "int32" || e === "int64" || e === "uint32" || e === "uint8" || e === "bool" || e === "uint4" || e === "int4", lGt = e => e === "float32" || e === "float16" || e === "int32" || e === "int64" || e === "uint32" || e === "uint64" || e === "int8" || e === "uint8" || e === "bool" || e === "uint4" || e === "int4", H3t = e => {
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
  cGt,
  Oxr = Hi(() => {
    nGt(), cGt = async e => {
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
  d1n,
  u1n,
  h1n,
  p1n,
  dGt,
  m1n,
  Pd,
  KD = Hi(() => {
    il(), d1n = ["V", "I", "W", "E", "F"], u1n = (e, t) => {
      console.log(`[${d1n[e]},${new Date().toISOString()}]${t}`);
    }, dGt = (e, t) => {
      h1n = e, p1n = t;
    }, m1n = (e, t) => {
      let n = uGe(e),
        r = uGe(h1n);
      n >= r && u1n(n, typeof t == "function" ? t() : t);
    }, Pd = (...e) => {
      p1n && m1n(...e);
    };
  }),
  uGt,
  Bxr = Hi(() => {
    il(), uGt = (e, t) => new (oGt(t))(e);
  }),
  hGt = Hi(() => {}),
  Jdt,
  t9e,
  n9e,
  f1n,
  g1n,
  Zdt,
  W3t,
  y1n,
  Fxr,
  U8o = Hi(() => {
    KD(), hGt(), Jdt = new Map([[64, 250], [128, 200], [256, 200], [512, 200], [2048, 230], [4096, 200], [8192, 50], [16384, 50], [32768, 50], [65536, 50], [131072, 50], [262144, 50], [524288, 50], [1048576, 50], [2097152, 30], [4194304, 20], [8388608, 10], [12582912, 10], [16777216, 10], [26214400, 15], [33554432, 22], [44236800, 2], [58982400, 6], [67108864, 6], [134217728, 6], [167772160, 6]]), t9e = [], n9e = e => Math.ceil(Number(e) / 16) * 16, f1n = e => {
      for (let t = 0; t < t9e.length; t++) {
        let n = t9e[t];
        if (e <= n) return n;
      }
      return Math.ceil(e / 16) * 16;
    }, g1n = 1, Zdt = () => g1n++, W3t = async (e, t, n, r) => {
      let a = n9e(n),
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
    }, y1n = class {
      constructor(e) {
        this.backend = e, this.storageCache = new Map(), this.freeBuffers = new Map(), this.freeUniformBuffers = new Map(), this.buffersPending = [], this.capturedPendingBuffers = new Map();
        for (let [t] of Jdt) t9e.push(t), this.freeBuffers.set(t, []), this.freeUniformBuffers.set(t, []);
        this.sessionCount = 0;
      }
      upload(e, t) {
        let n = t.buffer,
          r = t.byteOffset,
          a = t.byteLength,
          i = n9e(a),
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
        d.copyBufferToBuffer(s, 0, o.gpuData.buffer, 0, i), this.backend.device.queue.submit([d.finish()]), s.destroy(), Pd("verbose", () => `[WebGPU] GpuDataManager.upload(id=${e})`);
      }
      memcpy(e, t) {
        let n = this.storageCache.get(e);
        if (!n) throw new Error("source gpu data for memcpy does not exist");
        let r = this.storageCache.get(t);
        if (!r) throw new Error("destination gpu data for memcpy does not exist");
        if (n.originalSize !== r.originalSize) throw new Error("inconsistent source and destination gpu data size");
        let a = n9e(n.originalSize),
          i = this.backend.getCommandEncoder();
        this.backend.endComputePass(), i.copyBufferToBuffer(n.gpuData.buffer, 0, r.gpuData.buffer, 0, a);
      }
      registerExternalBuffer(e, t, n) {
        let r;
        if (n) {
          if (r = n[0], e === n[1]) return Pd("verbose", () => `[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, buffer is the same, skip.`), r;
          if (this.backend.capturedCommandList.has(this.backend.currentSessionId)) throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`);
        } else r = Zdt();
        return this.storageCache.set(r, {
          gpuData: {
            id: r,
            type: 0,
            buffer: e
          },
          originalSize: t
        }), Pd("verbose", () => `[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, registered.`), r;
      }
      unregisterExternalBuffer(e) {
        e !== void 0 && (this.storageCache.delete(e), Pd("verbose", () => `[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`));
      }
      create(e, t = GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST) {
        let n = f1n(e),
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
          id: Zdt(),
          type: 0,
          buffer: r
        };
        return this.storageCache.set(o.id, {
          gpuData: o,
          originalSize: Number(e)
        }), Pd("verbose", () => `[WebGPU] GpuDataManager.create(size=${e}) => id=${o.id}`), o;
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
        return Pd("verbose", () => `[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${n.gpuData.id}`), this.storageCache.delete(t), this.buffersPending.push(n.gpuData.buffer), n.originalSize;
      }
      async download(e, t) {
        let n = this.storageCache.get(Number(e));
        if (!n) throw new Error("data does not exist");
        await W3t(this.backend, n.gpuData.buffer, n.originalSize, t);
      }
      refreshPendingBuffers() {
        if (this.buffersPending.length !== 0) if (this.backend.sessionStatus === "default") {
          for (let e of this.buffersPending) {
            let t = Jdt.get(e.size);
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
        }), this.capturedPendingBuffers.delete(e)), this.sessionCount -= 1, this.sessionCount === 0 && (Pd("warning", () => "[WebGPU] Clearing webgpu buffer cache"), this.storageCache.forEach(n => {
          n.gpuData.buffer.destroy();
        }), this.storageCache = new Map());
      }
    }, Fxr = (...e) => new y1n(...e);
  }),
  b1n,
  sh,
  vg = Hi(() => {
    b1n = class {
      constructor(e) {
        Object.assign(this, e);
      }
      get cacheKey() {
        return this.key || (this.key = Object.getOwnPropertyNames(this).sort().map(e => `${this[e]}`).join(";")), this.key;
      }
    }, sh = e => new b1n(e);
  }),
  v1n,
  pue,
  oi,
  hGe,
  zxr,
  Uxr,
  $xr,
  Hl = Hi(() => {
    v1n = class {
      static calcMatMulShape(e, t) {
        return e[1] !== t[0] ? void 0 : [e[0], t[1]];
      }
    }, pue = class {
      static calcShape(e, t, n = !1) {
        let r = e.length,
          a = t.length;
        if (r === 0) return t;
        if (a === 0) return e;
        let i = Math.max(e.length, t.length),
          o = new Array(i);
        if (n) {
          if (r < 2 || a < 2) return;
          let s = v1n.calcMatMulShape([e[r - 2], e[r - 1]], [t[a - 2], t[a - 1]]);
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
    }, oi = class IDe {
      static size(t) {
        return IDe.getSizeFromDimensionRange(t, 0, t.length);
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
        return IDe.getSizeFromDimensionRange(t, n, t.length);
      }
      static sizeToDimension(t, n) {
        if (n < 0 || n > t.length) throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${t.length} dimensions.`);
        return IDe.getSizeFromDimensionRange(t, 0, n);
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
    }, hGe = class abe {
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
          for (let l = 0; l < t.length - 2; l++) abe.adjustPadAndReturnShape(t[l + (o ? 1 : 2)], n[l], r[l], a[l], i, l, l + t.length - 2, s);
        }
      }
      static computePoolOutputShape(t, n, r, a, i, o, s) {
        if (n.length <= 0) throw new Error("input shape must be of size greater than 0");
        let l = [n[0], n[1]];
        return abe.computeShapeHelper(t, n, l, r, a, i, o, s), l;
      }
      static computeConvOutputShape(t, n, r, a, i, o, s) {
        if (t.length <= 0 || n.length <= 0) throw new Error("invalid input tensor dims or invalid filter tensor dims");
        let l = [t[0], n[0]];
        return abe.computeShapeHelper(!1, t, l, r, a, i, o, s), l;
      }
      static computeShapeHelper(t, n, r, a, i, o, s, l) {
        if (t) for (let d = 0; d < n.length - 2; d++) r.push(1);else for (let d = 0; d < n.length - 2; d++) r.push(abe.adjustPadAndReturnShape(n[d + 2], a[d], i[d], o[d], s, d, d + n.length - 2, l));
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
    }, zxr = class {
      static getShapeOfGemmResult(e, t, n, r, a) {
        if (e.length !== 2 || n.length !== 2) throw new Error("shape need to be of size 2");
        let i, o, s;
        t ? (i = e[1], o = e[0]) : (i = e[0], o = e[1]);
        let l = -1;
        if (r ? (s = n[0], l = 1) : (s = n[1], l = 0), n[l] !== o) throw new Error("dimension mismatch");
        if (i <= 0 || s <= 0 || o <= 0) throw new Error("invalid shape specified");
        if (a && !pue.isValidBroadcast(a, [i, s])) throw new Error("gemm: invalid bias shape for broadcast");
        return [i, s, o];
      }
    }, Uxr = -34028234663852886e22, $xr = 34028234663852886e22;
  }),
  mue,
  r9e,
  Pb,
  Hw,
  fs,
  vf,
  q3t,
  cae,
  C$,
  cs,
  xge,
  yi,
  as,
  Gxr,
  pGt,
  w1n,
  Vxr,
  lc = Hi(() => {
    il(), Hl(), mue = 64, r9e = (e, t) => {
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
    }, Pb = (e, t = 1) => {
      let n = r9e(e, t);
      return typeof n == "string" ? n : n[0];
    }, Hw = (e, t = 1) => {
      let n = r9e(e, t);
      return typeof n == "string" ? n : n[1];
    }, fs = (...e) => {
      let t = [];
      return e.forEach(n => {
        n.length !== 0 && t.push({
          type: 12,
          data: n
        }, {
          type: 12,
          data: oi.computeStrides(n)
        });
      }), t;
    }, vf = e => e % 4 === 0 ? 4 : e % 2 === 0 ? 2 : 1, q3t = (e = "f32", t, n = "0") => !t || t === 1 ? `${e}(${n})` : `vec${t}<${e}>(${n})`, cae = (e, t, n) => e === "f32" ? n : t === 1 ? `f32(${n})` : `vec${t}<f32>(${n})`, C$ = (e, t) => t === 4 ? `(${e}.x + ${e}.y + ${e}.z + ${e}.w)` : t === 2 ? `(${e}.x + ${e}.y)` : t === 3 ? `(${e}.x + ${e}.y + ${e}.z)` : e, cs = (e, t, n, r) => e.startsWith("uniforms.") && n > 4 ? typeof t == "string" ? r === "f16" ? `${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]` : `${e}[(${t}) / 4][(${t}) % 4]` : r === "f16" ? `${e}[${Math.floor(t / 8)}][${Math.floor(t % 8 / 4)}][${t % 8 % 4}]` : `${e}[${Math.floor(t / 4)}][${t % 4}]` : n > 1 ? `${e}[${t}]` : e, xge = (e, t, n, r, a) => {
      let i = typeof n == "number",
        o = i ? n : n.length,
        s = [...new Array(o).keys()],
        l = o < 2 ? "u32" : o <= 4 ? `vec${o}<u32>` : `array<u32, ${o}>`,
        d = r9e(t, a),
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
    let dim${O} = current / ${cs(v, O, o)};
    let rest${O} = current % ${cs(v, O, o)};
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
      if (o >= 2) for (let O = o - 1; O >= 0; O--) A.push(`${cs(v, O, o)} * (indices[${O}])`);
      let S = o < 2 ? "" : `
  fn i2o_${e}(indices: ${p.indices}) -> u32 {
    return ${A.join("+")};
  }`,
        C = O => (f.indicesToOffset = !0, o < 2 ? O : `i2o_${e}(${O})`),
        I = (...O) => o === 0 ? "0u" : `${p.indices}(${O.map(m).join(",")})`,
        E = (O, L) => o < 2 ? `${O}` : `${cs(O, L, o)}`,
        M = (O, L, D) => o < 2 ? `${O}=${D};` : `${cs(O, L, o)}=${D};`,
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
          return f.offsetToIndices && (O.push(w), L = !0), f.indicesToOffset && (O.push(S), L = !0), f.broadcastedIndicesToOffset && (Object.values(T).forEach(D => O.push(D)), L = !0), f.set && (O.push(V), L = !0), f.setByIndices && (O.push(z), L = !0), f.get && (O.push(F), L = !0), f.getByIndices && (O.push(B), L = !0), !i && L && O.unshift(`const ${b} = ${p.indices}(${n.join(",")});`, `const ${v} = ${p.indices}(${oi.computeStrides(n).join(",")});`), O.join(`
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
    }, yi = (e, t, n, r = 1) => xge(e, t, n, "input", r), as = (e, t, n, r = 1) => xge(e, t, n, "output", r), Gxr = (e, t, n) => xge(e, t, n, "atomicOutput", 1), pGt = (e, t, n, r = 1) => xge(e, t, n, "internal", r), w1n = class {
      constructor(e, t) {
        this.normalizedDispatchGroup = e, this.limits = t, this.internalVariables = [], this.variables = [], this.uniforms = [], this.variableIndex = 0;
      }
      guardAgainstOutOfBoundsWorkgroupSizes(e) {
        return `if (global_idx >= ${typeof e == "number" ? `${e}u` : e}) { return; }`;
      }
      mainStart(e = mue) {
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
    }, Vxr = (e, t) => new w1n(e, t);
  }),
  x1n,
  eut,
  _1n,
  k1n,
  A1n,
  S1n,
  e3,
  Hxr,
  Wxr,
  vG = Hi(() => {
    il(), Hl(), vg(), lc(), x1n = (e, t) => {
      if (!e || e.length !== 1) throw new Error("Transpose requires 1 input.");
      if (t.length !== 0 && t.length !== e[0].dims.length) throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`);
    }, eut = (e, t) => t.length !== 0 ? t : [...new Array(e).keys()].reverse(), _1n = (e, t) => oi.sortBasedOnPerm(e, eut(e.length, t)), k1n = (e, t, n, r) => {
      let a = `fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;
      for (let i = 0; i < t; ++i) a += `a[${e[i]}]=i[${i}];`;
      return a += "return a;}";
    }, A1n = (e, t) => {
      let n = [],
        r = [];
      for (let a = 0; a < e.length; ++a) e[a] !== 1 && n.push(e[a]), e[t[a]] !== 1 && r.push(t[a]);
      return {
        newShape: n,
        newPerm: r
      };
    }, S1n = (e, t) => {
      let n = 0;
      for (let r = 0; r < e.length; ++r) if (t[e[r]] !== 1) {
        if (e[r] < n) return !1;
        n = e[r];
      }
      return !0;
    }, e3 = (e, t) => {
      let n = e.dataType,
        r = e.dims.length,
        a = eut(r, t),
        i = _1n(e.dims, a),
        o = e.dims,
        s = i,
        l = r < 2 || S1n(a, e.dims),
        d;
      if (l) return d = f => {
        let y = yi("input", n, o, 4),
          b = as("output", n, s, 4);
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
          let f = oi.size(i);
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
        } = A1n(e.dims, a),
        p = oi.areEqual(h, [2, 3, 1]),
        m = oi.areEqual(h, [3, 1, 2]);
      if (u.length === 2 || p || m) {
        o = p ? [u[0], u[1] * u[2]] : m ? [u[0] * u[1], u[2]] : u, s = [o[1], o[0]];
        let f = 16;
        return d = y => {
          let b = yi("a", n, o.length),
            v = as("output", n, s.length);
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
            let y = oi.size(i);
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
              }, ...fs(o, s)]
            };
          },
          getShaderSource: d
        };
      }
      return d = f => {
        let y = yi("a", n, o.length),
          b = as("output", n, s.length);
        return `
  ${f.registerUniform("output_size", "u32").declareVariables(y, b)}

  ${k1n(a, r, y, b)}

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
          let f = oi.size(i);
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
            }, ...fs(o, s)]
          };
        },
        getShaderSource: d
      };
    }, Hxr = (e, t) => {
      x1n(e.inputs, t.perm), e.compute(e3(e.inputs[0], t.perm));
    }, Wxr = e => sh({
      perm: e.perm
    });
  }),
  I1n,
  C1n,
  E1n,
  T1n,
  M1n,
  P1n,
  R1n,
  N1n,
  j1n,
  D1n,
  QI,
  qxr,
  Kxr,
  Qxr,
  Yxr,
  Xxr,
  Jxr,
  Zxr,
  e2r,
  t2r,
  n2r,
  $8o = Hi(() => {
    il(), Hl(), lc(), mGt(), vG(), I1n = {
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
    }, C1n = {
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
    }, E1n = {
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
    }, T1n = {
      max: "bestValue",
      min: "bestValue",
      sum: "bestValue",
      prod: "bestValue",
      sumSquare: "bestValue",
      logSumExp: "log(bestValue)",
      l1: "bestValue",
      l2: "sqrt(bestValue)",
      logSum: "log(bestValue)"
    }, M1n = (e, t) => {
      let n = [];
      for (let r = t - e; r < t; ++r) n.push(r);
      return n;
    }, P1n = (e, t) => {
      let n = [],
        r = e.length;
      for (let i = 0; i < r; i++) t.indexOf(i) === -1 && n.push(e[i]);
      let a = t.map(i => e[i]);
      return [n, a];
    }, R1n = (e, t) => {
      let n = e.length + t.length,
        r = [],
        a = 0;
      for (let i = 0; i < n; i++) t.indexOf(i) === -1 ? r.push(e[a++]) : r.push(1);
      return r;
    }, N1n = (e, t) => {
      for (let n = 0; n < e.length; ++n) if (e[e.length - n - 1] !== t - 1 - n) return !1;
      return !0;
    }, j1n = (e, t) => {
      let n = [];
      if (!N1n(e, t)) {
        for (let r = 0; r < t; ++r) e.indexOf(r) === -1 && n.push(r);
        e.forEach(r => n.push(r));
      }
      return n;
    }, D1n = (e, t, n, r, a, i, o) => {
      let s = n[0].dims,
        l = oi.size(i),
        d = oi.size(o),
        u = yi("_A", n[0].dataType, s),
        h = as("output", a, i),
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

          var bestValue = f32(${E1n[r]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${p}) {
           let candidate = f32(${u.getByOffset("offset + k")});
           bestValue = ${I1n[r]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${p}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${C1n[r]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${h.setByOffset("outputIndex", `${r === "mean" ? `${h.type.storage}(bestValue / f32(uniforms.reduceSize))` : `${h.type.storage}(${T1n[r]})`}`)};
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
    }, QI = (e, t, n, r) => {
      let a = e.inputs.length === 1 ? n : K3t(e.inputs, n),
        i = a.axes;
      i.length === 0 && !a.noopWithEmptyAxes && (i = e.inputs[0].dims.map((m, f) => f));
      let o = oi.normalizeAxes(i, e.inputs[0].dims.length),
        s = o,
        l = e.inputs[0],
        d = j1n(s, e.inputs[0].dims.length);
      d.length > 0 && (l = e.compute(e3(e.inputs[0], d), {
        inputs: [0],
        outputs: [-1]
      })[0], s = M1n(s.length, l.dims.length));
      let [u, h] = P1n(l.dims, s),
        p = u;
      a.keepDims && (p = R1n(u, o)), e.compute(D1n(t, a.cacheKey, [l], r, e.inputs[0].dataType, p, h), {
        inputs: [l]
      });
    }, qxr = (e, t) => {
      QI(e, "ReduceMeanShared", t, "mean");
    }, Kxr = (e, t) => {
      QI(e, "ReduceL1Shared", t, "l1");
    }, Qxr = (e, t) => {
      QI(e, "ReduceL2Shared", t, "l2");
    }, Yxr = (e, t) => {
      QI(e, "ReduceLogSumExpShared", t, "logSumExp");
    }, Xxr = (e, t) => {
      QI(e, "ReduceMaxShared", t, "max");
    }, Jxr = (e, t) => {
      QI(e, "ReduceMinShared", t, "min");
    }, Zxr = (e, t) => {
      QI(e, "ReduceProdShared", t, "prod");
    }, e2r = (e, t) => {
      QI(e, "ReduceSumShared", t, "sum");
    }, t2r = (e, t) => {
      QI(e, "ReduceSumSquareShared", t, "sumSquare");
    }, n2r = (e, t) => {
      QI(e, "ReduceLogSumShared", t, "logSum");
    };
  }),
  YI,
  L1n,
  pGe,
  K3t,
  XI,
  O1n,
  B1n,
  F1n,
  z1n,
  U1n,
  $1n,
  G1n,
  V1n,
  H1n,
  W1n,
  JI,
  r2r,
  a2r,
  i2r,
  o2r,
  s2r,
  l2r,
  c2r,
  d2r,
  u2r,
  h2r,
  mGt = Hi(() => {
    il(), Hl(), vg(), lc(), $8o(), YI = e => {
      if (!e || e.length === 0 || e.length > 2) throw new Error("Reduce op requires 1 or 2 inputs.");
      if (e.length === 2 && e[1].dims.length !== 1) throw new Error("Invalid axes input dims.");
    }, L1n = e => ["", "", `var value = ${e.getByIndices("input_indices")};`, ""], pGe = (e, t, n, r, a, i, o = !1, s = !1) => {
      let l = [],
        d = n[0].dims,
        u = d.length,
        h = oi.normalizeAxes(a, u),
        p = !s && h.length === 0;
      d.forEach((y, b) => {
        p || h.indexOf(b) >= 0 ? o && l.push(1) : l.push(y);
      });
      let m = l.length,
        f = oi.size(l);
      return {
        name: e,
        shaderCache: t,
        getShaderSource: y => {
          let b = [],
            v = yi("_A", n[0].dataType, u),
            _ = as("output", i, m),
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
          }, ...fs(d, l)]
        })
      };
    }, K3t = (e, t) => {
      let n = [];
      return e[1].dims[0] > 0 && e[1].getBigInt64Array().forEach(r => n.push(Number(r))), sh({
        axes: n,
        keepDims: t.keepDims,
        noopWithEmptyAxes: t.noopWithEmptyAxes
      });
    }, XI = (e, t, n, r) => {
      let a = e.inputs,
        i = a.length === 1 ? n : K3t(a, n);
      e.compute(pGe(t, {
        hint: i.cacheKey,
        inputDependencies: ["rank"]
      }, [a[0]], i.noopWithEmptyAxes && i.axes.length === 0 ? L1n : r, i.axes, a[0].dataType, i.keepDims, i.noopWithEmptyAxes), {
        inputs: [0]
      });
    }, O1n = (e, t) => {
      YI(e.inputs), XI(e, "ReduceLogSum", t, (n, r) => [`var value = ${r.type.storage}(0);`, "", `value += ${n.getByIndices("input_indices")};`, "value = log(value);"]);
    }, B1n = (e, t) => {
      YI(e.inputs), XI(e, "ReduceL1", t, (n, r) => [`var value = ${r.type.storage}(0);`, "", `value += abs(${n.getByIndices("input_indices")});`, ""]);
    }, F1n = (e, t) => {
      YI(e.inputs), XI(e, "ReduceL2", t, (n, r) => [`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`, "", `t = ${n.getByIndices("input_indices")}; value += (t * t);`, "value = sqrt(value);"]);
    }, z1n = (e, t) => {
      YI(e.inputs), XI(e, "ReduceLogSumExp", t, (n, r) => [`var value = ${r.type.storage}(0);`, "", `value += exp(${n.getByIndices("input_indices")});`, "value = log(value);"]);
    }, U1n = (e, t) => {
      YI(e.inputs), XI(e, "ReduceMax", t, (n, r, a) => {
        let i = [];
        for (let o = 0; o < n.rank; o++) (a.indexOf(o) >= 0 || a.length === 0) && i.push(n.indicesSet("input_indices", o, 0));
        return [`${i.join(`
`)}`, `var value = ${n.getByIndices("input_indices")};`, `value = max(value, ${n.getByIndices("input_indices")});`, ""];
      });
    }, $1n = (e, t) => {
      YI(e.inputs), XI(e, "ReduceMean", t, (n, r, a) => {
        let i = 1;
        for (let o = 0; o < n.rank; o++) (a.indexOf(o) >= 0 || a.length === 0) && (i *= e.inputs[0].dims[o]);
        return ["var sum = f32(0);", "", `sum += f32(${n.getByIndices("input_indices")});`, `let value = ${r.type.value}(sum / ${i});`];
      });
    }, G1n = (e, t) => {
      YI(e.inputs), XI(e, "ReduceMin", t, (n, r, a) => {
        let i = [];
        for (let o = 0; o < n.rank; o++) (a.indexOf(o) >= 0 || a.length === 0) && i.push(`input_indices[${o}] = 0;`);
        return [`${i.join(`
`)}`, `var value = ${n.getByIndices("input_indices")};`, `value = min(value, ${n.getByIndices("input_indices")});`, ""];
      });
    }, V1n = (e, t) => {
      YI(e.inputs), XI(e, "ReduceProd", t, (n, r) => [`var value = ${r.type.storage}(1);`, "", `value *= ${n.getByIndices("input_indices")};`, ""]);
    }, H1n = (e, t) => {
      YI(e.inputs), XI(e, "ReduceSum", t, (n, r) => [`var value = ${r.type.storage}(0);`, "", `value += ${n.getByIndices("input_indices")};`, ""]);
    }, W1n = (e, t) => {
      YI(e.inputs), XI(e, "ReduceSumSquare", t, (n, r) => [`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`, "", `t = ${n.getByIndices("input_indices")}; value += t * t;`, ""]);
    }, JI = (e, t, n) => {
      if (t.length === 0) return n;
      let r = 1,
        a = 1;
      for (let i = 0; i < t.length; i++) t.indexOf(i) === -1 ? r *= e[i] : a *= e[i];
      return a < 32 && r > 1024;
    }, r2r = (e, t) => {
      JI(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? $1n(e, t) : qxr(e, t);
    }, a2r = (e, t) => {
      JI(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? B1n(e, t) : Kxr(e, t);
    }, i2r = (e, t) => {
      JI(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? F1n(e, t) : Qxr(e, t);
    }, o2r = (e, t) => {
      JI(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? z1n(e, t) : Yxr(e, t);
    }, s2r = (e, t) => {
      JI(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? U1n(e, t) : Xxr(e, t);
    }, l2r = (e, t) => {
      JI(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? G1n(e, t) : Jxr(e, t);
    }, c2r = (e, t) => {
      JI(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? V1n(e, t) : Zxr(e, t);
    }, d2r = (e, t) => {
      JI(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? H1n(e, t) : e2r(e, t);
    }, u2r = (e, t) => {
      JI(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? W1n(e, t) : t2r(e, t);
    }, h2r = (e, t) => {
      JI(e.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? O1n(e, t) : n2r(e, t);
    };
  }),
  tut,
  p2r,
  m2r,
  Q3t,
  G8o = Hi(() => {
    il(), vg(), mGt(), tut = e => {
      if (!e || e.length === 0 || e.length > 2) throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");
      if (e[0].dataType !== 1) throw new Error("Invalid input type.");
    }, p2r = (e, t) => {
      tut(e.inputs);
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
      e.compute(pGe("ArgMin", {
        hint: t.cacheKey,
        inputDependencies: ["rank"]
      }, [e.inputs[0]], n, [t.axis], 7, t.keepDims), {
        inputs: [0]
      });
    }, m2r = (e, t) => {
      tut(e.inputs);
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
      e.compute(pGe("argMax", {
        hint: t.cacheKey,
        inputDependencies: ["rank"]
      }, [e.inputs[0]], n, [t.axis], 7, t.keepDims), {
        inputs: [0]
      });
    }, Q3t = e => sh(e);
  }),
  q1n,
  a9e,
  K1n,
  Q1n,
  Y1n,
  DAe,
  X1n,
  f2r,
  fGt = Hi(() => {
    il(), Hl(), hGt(), lc(), q1n = (e, t) => {
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
    }, a9e = (e, t, n) => t && e ? `
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
    `, K1n = (e, t, n, r, a, i, o, s) => {
      let l = vf(o ? 1 : i),
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
        m = Pb(e.dataType, l),
        f = Hw(1, l),
        y = ["type"];
      o && y.push("type"), s && y.push("type");
      let b = v => {
        let _ = as("x", e.dataType, e.dims, l),
          w = [_],
          k = o ? yi("seq_lens", o.dataType, o.dims) : void 0;
        k && w.push(k);
        let A = s ? yi("total_sequence_length_input", s.dataType, s.dims) : void 0;
        A && w.push(A);
        let S = Hw(e.dataType),
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
    ${a9e(k, A, !1)}
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
    }, Q1n = (e, t, n, r, a, i, o, s, l) => {
      let d = o + i.kvSequenceLength,
        u = [i.batchSize, i.numHeads, i.sequenceLength, d],
        h = e > 1 && r,
        p = i.kvNumHeads ? i.kvNumHeads : i.numHeads,
        m = h ? [i.batchSize, p, d, i.headSize] : void 0,
        f = i.nReps ? i.nReps : 1,
        y = i.scale === 0 ? 1 / Math.sqrt(i.headSize) : i.scale,
        b = vf(i.headSize),
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
        A = h && r && oi.size(r.dims) > 0,
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
        let M = yi("q", t.dataType, t.dims, b),
          T = yi("key", n.dataType, n.dims, b),
          P = [M, T];
        if (A) {
          let z = yi("past_key", r.dataType, r.dims, b);
          P.push(z);
        }
        a && P.push(yi("attention_bias", a.dataType, a.dims));
        let R = s ? yi("seq_lens", s.dataType, s.dims) : void 0;
        R && P.push(R);
        let j = l ? yi("total_sequence_length_input", l.dataType, l.dims) : void 0;
        j && P.push(j);
        let B = as("output", t.dataType, u),
          F = [B];
        h && F.push(as("present_key", t.dataType, m, b));
        let N = Hw(1, b),
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
    ${a9e(R, j, !0)}
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
    }, Y1n = (e, t, n, r, a, i, o = void 0, s = void 0) => {
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
        _ = h && r && oi.size(r.dims) > 0,
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
        let C = yi("probs", t.dataType, t.dims),
          I = yi("v", n.dataType, n.dims),
          E = [C, I];
        _ && E.push(yi("past_value", r.dataType, r.dims));
        let M = o ? yi("seq_lens", o.dataType, o.dims) : void 0;
        o && E.push(M);
        let T = s ? yi("total_sequence_length_input", s.dataType, s.dims) : void 0;
        s && E.push(T);
        let P = [as("output", t.dataType, f)];
        h && P.push(as("present_value", t.dataType, m));
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
   ${a9e(M, T, !0)}
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
    }, DAe = (e, t, n, r, a, i, o, s, l, d, u = void 0, h = void 0) => {
      let p = Math.min(e.outputCount, 1 + (o ? 1 : 0) + (s ? 1 : 0)),
        m = p > 1 ? d.pastSequenceLength : 0,
        f = m + d.kvSequenceLength,
        y = l && oi.size(l.dims) > 0 ? l : void 0,
        b = [t, n];
      p > 1 && o && oi.size(o.dims) > 0 && b.push(o), y && b.push(y), u && b.push(u), h && b.push(h);
      let v = e.compute(Q1n(p, t, n, o, y, d, m, u, h), {
        inputs: b,
        outputs: p > 1 ? [-1, 1] : [-1]
      })[0];
      e.compute(K1n(v, d.batchSize, d.numHeads, m, d.sequenceLength, f, u, h), {
        inputs: u && h ? [v, u, h] : [v],
        outputs: []
      });
      let _ = [v, r];
      p > 1 && s && oi.size(s.dims) > 0 && _.push(s), u && _.push(u), h && _.push(h), e.compute(Y1n(p, v, r, s, d, m, u, h), {
        inputs: _,
        outputs: p > 1 ? [0, 2] : [0]
      });
    }, X1n = (e, t) => {
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
          let p = as("output_q", l[0].dataType, n),
            m = as("output_k", l[0].dataType, n),
            f = as("output_v", l[0].dataType, n),
            y = yi("input", l[0].dataType, l[0].dims),
            b = yi("weight", l[1].dataType, l[1].dims),
            v = yi("bias", l[2].dataType, l[2].dims),
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
    }, f2r = (e, t) => {
      let n = q1n(e.inputs, t),
        [r, a, i] = X1n(e, n);
      return DAe(e, r, a, i, e.inputs[4], void 0, void 0, void 0, e.inputs[5], n);
    };
  }),
  J1n,
  Z1n,
  ewn,
  g2r,
  V8o = Hi(() => {
    BT(), il(), Hl(), vg(), lc(), J1n = (e, t) => {
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
    }, Z1n = (e, t) => {
      let {
          epsilon: n,
          spatial: r,
          format: a
        } = t,
        i = e[0].dims,
        o = r ? vf(i[i.length - 1]) : 1,
        s = a === "NHWC" && i.length > 1 ? o : 1,
        l = oi.size(i) / o,
        d = r,
        u = d ? i.length : i,
        h = yi("x", e[0].dataType, e[0].dims, o),
        p = yi("scale", e[1].dataType, e[1].dims, s),
        m = yi("bias", e[2].dataType, e[2].dims, s),
        f = yi("inputMean", e[3].dataType, e[3].dims, s),
        y = yi("inputVar", e[4].dataType, e[4].dims, s),
        b = as("y", e[0].dataType, u, o),
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
          }, ...fs(i)] : [{
            type: 12,
            data: l
          }]
        })
      };
    }, ewn = e => sh(e), g2r = (e, t) => {
      let {
          inputs: n,
          outputCount: r
        } = e,
        a = ewn({
          ...t,
          outputCount: r
        });
      if (dm.webgpu.validateInputContent && J1n(n, a), t.trainingMode) throw new Error("BatchNormalization trainingMode is not supported yet.");
      e.compute(Z1n(n, a));
    };
  }),
  twn,
  nwn,
  y2r,
  H8o = Hi(() => {
    Hl(), lc(), twn = e => {
      if (e[0].dims.length !== 3) throw new Error("input should have 3 dimensions");
      if (![320, 640, 1280].includes(e[0].dims[2])) throw new Error("number of channels should be 320, 640 or 1280");
      if (e[1].dims.length !== 1) throw new Error("bias is expected to have 1 dimensions");
      if (e[0].dims[2] !== e[1].dims[0]) throw new Error("last dimension of input and bias are not the same");
    }, nwn = e => {
      let t = e[0].dims,
        n = e[0].dims[2],
        r = oi.size(t) / 4,
        a = e[0].dataType,
        i = yi("input", a, t, 4),
        o = yi("bias", a, [n], 4),
        s = yi("residual", a, t, 4),
        l = as("output", a, t, 4);
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
    }, y2r = e => {
      twn(e.inputs), e.compute(nwn(e.inputs));
    };
  }),
  rwn,
  eu,
  b2r,
  v2r,
  w2r,
  x2r,
  _2r,
  k2r,
  A2r,
  S2r,
  I2r,
  awn,
  C2r,
  E2r,
  T2r,
  M2r,
  ibe,
  P2r,
  CDe,
  R2r,
  N2r,
  j2r,
  D2r,
  L2r,
  O2r,
  B2r,
  F2r,
  z2r,
  U2r,
  $2r,
  G2r,
  V2r,
  H2r,
  W2r,
  q2r,
  nut,
  K2r,
  Y3t,
  X3t,
  Q2r,
  Y2r,
  X2r,
  iwn,
  own,
  J2r,
  gGt = Hi(() => {
    il(), Hl(), vg(), lc(), rwn = (e, t, n, r, a, i, o) => {
      let s = Math.ceil(t / 4),
        l = "";
      typeof a == "string" ? l = `${a}(a)` : l = a("a");
      let d = yi("inputData", n, [s], 4),
        u = as("outputData", r, [s], 4),
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
    }, eu = (e, t, n, r, a, i = e.dataType, o, s) => {
      let l = [{
        type: 12,
        data: Math.ceil(oi.size(e.dims) / 4)
      }];
      return o && l.push(...o), {
        name: t,
        shaderCache: {
          hint: a,
          inputDependencies: ["type"]
        },
        getShaderSource: d => rwn(d, oi.size(e.dims), e.dataType, i, n, r, s),
        getRunData: d => ({
          outputs: [{
            dims: e.dims,
            dataType: i
          }],
          dispatchGroup: {
            x: Math.ceil(oi.size(d[0].dims) / 64 / 4)
          },
          programUniforms: l
        })
      };
    }, b2r = e => {
      e.compute(eu(e.inputs[0], "Abs", "abs"));
    }, v2r = e => {
      e.compute(eu(e.inputs[0], "Acos", "acos"));
    }, w2r = e => {
      e.compute(eu(e.inputs[0], "Acosh", "acosh"));
    }, x2r = e => {
      e.compute(eu(e.inputs[0], "Asin", "asin"));
    }, _2r = e => {
      e.compute(eu(e.inputs[0], "Asinh", "asinh"));
    }, k2r = e => {
      e.compute(eu(e.inputs[0], "Atan", "atan"));
    }, A2r = e => {
      e.compute(eu(e.inputs[0], "Atanh", "atanh"));
    }, S2r = e => sh(e), I2r = (e, t) => {
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
      e.compute(eu(e.inputs[0], "Cast", n, void 0, t.cacheKey, t.to));
    }, awn = e => {
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
      return sh({
        min: t,
        max: n
      });
    }, C2r = (e, t) => {
      let n = t || awn(e.inputs),
        r = Hw(e.inputs[0].dataType);
      e.compute(eu(e.inputs[0], "Clip", a => `clamp(${a}, vec4<${r}>(uniforms.min), vec4<${r}>(uniforms.max))`, void 0, n.cacheKey, void 0, [{
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
    }, E2r = e => {
      e.compute(eu(e.inputs[0], "Ceil", "ceil"));
    }, T2r = e => {
      e.compute(eu(e.inputs[0], "Cos", "cos"));
    }, M2r = e => {
      e.compute(eu(e.inputs[0], "Cosh", "cosh"));
    }, ibe = e => sh(e), P2r = (e, t) => {
      let n = Hw(e.inputs[0].dataType);
      e.compute(eu(e.inputs[0], "Elu", r => `elu_vf32(${r})`, `
  const elu_alpha_ = ${n}(${t.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`, t.cacheKey));
    }, CDe = (e = "f32") => `
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
}`, R2r = e => {
      let t = Hw(e.inputs[0].dataType);
      e.compute(eu(e.inputs[0], "Erf", n => `erf_vf32(${n})`, CDe(t)));
    }, N2r = e => {
      e.compute(eu(e.inputs[0], "Exp", "exp"));
    }, j2r = e => {
      e.compute(eu(e.inputs[0], "Floor", "floor"));
    }, D2r = e => {
      let t = Hw(e.inputs[0].dataType);
      e.compute(eu(e.inputs[0], "Gelu", n => `0.5 * ${n} * (1.0 + erf_vf32(${n} * 0.7071067811865475))`, CDe(t)));
    }, L2r = (e, t) => {
      let n = Hw(e.inputs[0].dataType);
      e.compute(eu(e.inputs[0], "LeakyRelu", r => `select(leaky_relu_alpha_ * ${r}, ${r}, ${r} >= vec4<${n}>(0.0))`, `const leaky_relu_alpha_ = ${n}(${t.alpha});`, t.cacheKey));
    }, O2r = e => {
      e.compute(eu(e.inputs[0], "Not", t => `!${t}`));
    }, B2r = e => {
      e.compute(eu(e.inputs[0], "Neg", t => `-${t}`));
    }, F2r = e => {
      e.compute(eu(e.inputs[0], "Reciprocal", t => `1.0/${t}`));
    }, z2r = e => {
      let t = Hw(e.inputs[0].dataType);
      e.compute(eu(e.inputs[0], "Relu", n => `select(vec4<${t}>(0.0), ${n}, ${n} > vec4<${t}>(0.0))`));
    }, U2r = e => {
      e.compute(eu(e.inputs[0], "Sigmoid", t => `(1.0 / (1.0 + exp(-${t})))`));
    }, $2r = e => sh(e), G2r = (e, t) => {
      let n = Hw(e.inputs[0].dataType);
      e.compute(eu(e.inputs[0], "HardSigmoid", r => `max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${t.alpha} * ${r} + vec4<${n}>(${t.beta})))`, void 0, t.cacheKey));
    }, V2r = e => {
      e.compute(eu(e.inputs[0], "Sin", "sin"));
    }, H2r = e => {
      e.compute(eu(e.inputs[0], "Sinh", "sinh"));
    }, W2r = e => {
      e.compute(eu(e.inputs[0], "Sqrt", "sqrt"));
    }, q2r = e => {
      e.compute(eu(e.inputs[0], "Tan", "tan"));
    }, nut = e => `sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`, K2r = e => {
      e.compute(eu(e.inputs[0], "Tanh", nut));
    }, Y3t = (e = "f32") => `
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${nut("v")};
}
`, X3t = e => `(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`, Q2r = e => {
      let t = Hw(e.inputs[0].dataType);
      e.compute(eu(e.inputs[0], "FastGelu", X3t, Y3t(t), void 0, e.inputs[0].dataType));
    }, Y2r = (e, t) => {
      let n = Hw(e.inputs[0].dataType);
      return e.compute(eu(e.inputs[0], "ThresholdedRelu", r => `select(vec4<${n}>(0.0), ${r}, ${r} > thresholded_relu_alpha_)`, `const thresholded_relu_alpha_ = vec4<${n}>(${t.alpha});`, t.cacheKey)), 0;
    }, X2r = e => {
      e.compute(eu(e.inputs[0], "Log", "log"));
    }, iwn = (e, t) => `
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
`, own = e => `quick_gelu_impl(${e})`, J2r = (e, t) => {
      let n = Hw(e.inputs[0].dataType);
      e.compute(eu(e.inputs[0], "QuickGelu", own, iwn(n, t.alpha), t.cacheKey, e.inputs[0].dataType));
    };
  }),
  swn,
  lwn,
  Z2r,
  W8o = Hi(() => {
    Hl(), lc(), gGt(), swn = e => {
      if (e[0].dims.length !== 3) throw new Error("input should have 3 dimensions");
      if (![2560, 5120, 10240].includes(e[0].dims[2])) throw new Error("hidden state should be 2560, 5120 or 10240");
      if (e[1].dims.length !== 1) throw new Error("bias is expected to have 1 dimensions");
      if (e[0].dims[2] !== e[1].dims[0]) throw new Error("last dimension of input and bias are not the same");
    }, lwn = e => {
      let t = e[0].dims.slice();
      t[2] = t[2] / 2;
      let n = yi("input", e[0].dataType, e[0].dims, 4),
        r = yi("bias", e[0].dataType, [e[0].dims[2]], 4),
        a = as("output", e[0].dataType, t, 4),
        i = oi.size(t) / 4,
        o = Pb(e[0].dataType);
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

  ${CDe(o)}

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
    }, Z2r = e => {
      swn(e.inputs), e.compute(lwn(e.inputs));
    };
  }),
  cwn,
  dwn,
  ZI,
  e_r,
  t_r,
  n_r,
  r_r,
  a_r,
  i_r,
  o_r,
  s_r,
  l_r,
  c_r,
  q8o = Hi(() => {
    il(), Hl(), lc(), cwn = (e, t, n, r, a, i, o, s, l, d, u, h) => {
      let p, m;
      typeof s == "string" ? p = m = (_, w) => `${s}((${_}),(${w}))` : typeof s == "function" ? p = m = s : (p = s.scalar, m = s.vector);
      let f = as("outputData", u, r.length, 4),
        y = yi("aData", l, t.length, 4),
        b = yi("bData", d, n.length, 4),
        v;
      if (a) {
        if (i) {
          let _ = oi.size(t) === 1,
            w = oi.size(n) === 1,
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
    }, dwn = (e, t, n, r, a, i, o = n.dataType) => {
      let s = n.dims.map(y => Number(y) ?? 1),
        l = r.dims.map(y => Number(y) ?? 1),
        d = !oi.areEqual(s, l),
        u = s,
        h = oi.size(s),
        p = !1,
        m = !1,
        f = [d];
      if (d) {
        let y = pue.calcShape(s, l, !1);
        if (!y) throw new Error("Can't perform binary op on the given tensors");
        u = y.slice(), h = oi.size(u);
        let b = oi.size(s) === 1,
          v = oi.size(l) === 1,
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
        getShaderSource: y => cwn(y, s, l, u, p, d, m, a, n.dataType, r.dataType, o, i),
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
            data: Math.ceil(oi.size(u) / 4)
          }, ...fs(s, l, u)]
        })
      };
    }, ZI = (e, t, n, r, a, i) => {
      e.compute(dwn(t, a ?? "", e.inputs[0], e.inputs[1], n, r, i));
    }, e_r = e => {
      ZI(e, "Add", (t, n) => `${t}+${n}`);
    }, t_r = e => {
      ZI(e, "Div", (t, n) => `${t}/${n}`);
    }, n_r = e => {
      ZI(e, "Equal", {
        scalar: (t, n) => `u32(${t}==${n})`,
        vector: (t, n) => `vec4<u32>(${t}==${n})`
      }, void 0, void 0, 9);
    }, r_r = e => {
      ZI(e, "Mul", (t, n) => `${t}*${n}`);
    }, a_r = e => {
      let t = yi("input", e.inputs[0].dataType, e.inputs[0].dims).type.value;
      ZI(e, "Pow", {
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
    }, i_r = e => {
      ZI(e, "Sub", (t, n) => `${t}-${n}`);
    }, o_r = e => {
      ZI(e, "Greater", {
        scalar: (t, n) => `u32(${t}>${n})`,
        vector: (t, n) => `vec4<u32>(${t}>${n})`
      }, void 0, void 0, 9);
    }, s_r = e => {
      ZI(e, "Less", {
        scalar: (t, n) => `u32(${t}<${n})`,
        vector: (t, n) => `vec4<u32>(${t}<${n})`
      }, void 0, void 0, 9);
    }, l_r = e => {
      ZI(e, "GreaterOrEqual", {
        scalar: (t, n) => `u32(${t}>=${n})`,
        vector: (t, n) => `vec4<u32>(${t}>=${n})`
      }, void 0, void 0, 9);
    }, c_r = e => {
      ZI(e, "LessOrEqual", {
        scalar: (t, n) => `u32(${t}<=${n})`,
        vector: (t, n) => `vec4<u32>(${t}<=${n})`
      }, void 0, void 0, 9);
    };
  }),
  uwn,
  hwn,
  pwn,
  mwn,
  d_r,
  u_r,
  K8o = Hi(() => {
    il(), Hl(), vg(), lc(), uwn = (e, t) => {
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
    }, hwn = (e, t) => `
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`, pwn = (e, t) => {
      let n = e.length,
        r = [];
      for (let a = 0; a < n; ++a) {
        let i = t.setByOffset("global_idx", e[a].getByIndices("indices"));
        n === 1 ? r.push(i) : a === 0 ? r.push(`if (inputIndex == ${a}u) { ${i} }`) : a === n - 1 ? r.push(`else { ${i} }`) : r.push(`else if (inputIndex == ${a}) { ${i} }`);
      }
      return r.join(`
`);
    }, mwn = (e, t, n, r) => {
      let a = oi.size(n),
        i = new Array(e.length),
        o = new Array(e.length),
        s = 0,
        l = [],
        d = [],
        u = [{
          type: 12,
          data: a
        }];
      for (let y = 0; y < e.length; ++y) s += e[y].dims[t], i[y] = s, d.push(e[y].dims.length), o[y] = yi(`input${y}`, r, d[y]), l.push("rank"), u.push({
        type: 12,
        data: i[y]
      });
      for (let y = 0; y < e.length; ++y) u.push(...fs(e[y].dims));
      u.push(...fs(n));
      let h = as("output", r, n.length),
        p = h.indicesGet("indices", t),
        m = Array.from(Array(i.length).keys()).map(y => `uniforms.sizeInConcatAxis${y}`).join(","),
        f = y => `

  ${(() => {
          y.registerUniform("outputSize", "u32");
          for (let b = 0; b < e.length; b++) y.registerUniform(`sizeInConcatAxis${b}`, "u32");
          return y.declareVariables(...o, h);
        })()}

  ${hwn(i.length, m)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${h.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${p});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${m});
      ${p} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${pwn(o, h)}
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
    }, d_r = (e, t) => {
      let n = e.inputs,
        r = n[0].dims,
        a = oi.normalizeAxis(t.axis, r.length);
      uwn(n, a);
      let i = r.slice();
      i[a] = n.reduce((s, l) => s + (l.dims.length > a ? l.dims[a] : 0), 0);
      let o = n.filter(s => oi.size(s.dims) > 0);
      e.compute(mwn(o, a, i, n[0].dataType), {
        inputs: o
      });
    }, u_r = e => sh({
      axis: e.axis
    });
  }),
  $J,
  GJ,
  VJ,
  yGt,
  aee = Hi(() => {
    il(), Hl(), $J = (e, t, n = "f32") => {
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
    }, GJ = (e, t) => {
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
    }, VJ = (e, t) => {
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
    }, yGt = e => {
      let t = (e == null ? void 0 : e.activation) || "";
      if (t === "HardSigmoid") {
        let [n, r] = (e == null ? void 0 : e.activation_params) || [.2, .5];
        return {
          activation: t,
          alpha: n,
          beta: r
        };
      } else if (t === "Clip") {
        let [n, r] = (e == null ? void 0 : e.activation_params) || [Uxr, $xr];
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
  yv,
  h_r,
  bGt = Hi(() => {
    yv = (e, t) => {
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
    }, h_r = e => `
      ${e ? "value = value + getBiasByOutputCoords(coords);" : ""}
      `;
  }),
  p_r,
  Q8o = Hi(() => {
    p_r = e => `
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
  Awe,
  vGt,
  wGt = Hi(() => {
    il(), Hl(), lc(), aee(), Awe = (e, t, n, r, a) => {
      let i = r - n;
      return `
      ${Array.from({
        length: n
      }).map((o, s) => `
      if (${cs(t.shape, s, t.rank)} != 1) {
        ${t.indicesSet(e, s, cs(a, s + i, r))}
      } else {
        ${t.indicesSet(e, s, 0)}
      }`).join("")}
`;
    }, vGt = (e, t, n, r, a = !1, i) => {
      let o = e[0].dims,
        s = e[1].dims,
        l = o[o.length - 2],
        d = s[s.length - 1],
        u = o[o.length - 1],
        h = vf(d),
        p = vf(u),
        m = vf(l),
        f = oi.size(n) / h / m,
        y = e.length > 2,
        b = r ? r.slice(0, -2) : n.slice(0, -2),
        v = [oi.size(b), l, d],
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
      GJ(t, _), _.push(...fs(b, o, s)), y && _.push(...fs(e[2].dims)), _.push(...fs(v));
      let w = k => {
        let A = pGt("batch_dims", e[0].dataType, b.length),
          S = yi("a", e[0].dataType, o.length, p),
          C = yi("b", e[1].dataType, s.length, h),
          I = as("output", e[0].dataType, v.length, h),
          E = Pb(I.type.tensor),
          M = $J(t, I.type.value, E),
          T = [S, C],
          P = "";
        if (y) {
          let B = a ? h : 1;
          T.push(yi("bias", e[2].dataType, e[2].dims.length, B)), P = `${a ? `value += bias[col / ${B}];` : `value += ${I.type.value}(bias[row + i]);`}`;
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
        VJ(t, R);
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
    ${Awe("a_indices", S, S.rank - 2, A.rank, "batch_indices")}
    ${S.indicesSet("a_indices", S.rank - 2, 0)}
    ${S.indicesSet("a_indices", S.rank - 1, 0)}
    let a_offset = ${S.indicesToOffset("a_indices")};

    var b_indices: ${C.type.indices};
    ${Awe("b_indices", C, C.rank - 2, A.rank, "batch_indices")}
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
  fwn,
  gwn,
  J3t,
  rut,
  ywn,
  Z3t,
  bwn,
  mGe,
  xGt = Hi(() => {
    il(), Hl(), lc(), aee(), wGt(), bGt(), fwn = (e, t) => e ? `
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t ? ", batchIndices" : ""});
        ` : `
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t ? ", batchIndices" : ""});
        `, gwn = (e, t) => e ? `
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
        }`, J3t = (e, t, n = "f32", r, a = !1, i = 32, o = !1, s = 32) => {
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
          ${fwn(a, r)}
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

          ${gwn(a, p)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`;
    }, rut = (e, t) => e ? `
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t ? ", batchIndices" : ""});
            ` : `
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t ? ", batchIndices" : ""});
            `, ywn = e => e ? "let ACached = mm_Asub[k][tileRow + innerRow];" : "let ACached = mm_Asub[tileRow + innerRow][k];", Z3t = (e, t, n = "f32", r, a = !1, i = 32, o = !1, s = 32, l = !1) => {
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
          ${rut(a, r)}
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
      ${rut(a, r)}
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
      ${ywn(a)}
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
    }, bwn = (e, t, n, r, a = !1) => {
      let [i, o, s, l] = r,
        d = Pb(r[0].type.tensor);
      return `
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${yv(e, d)} {
      var value = ${yv(e, d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${o.type.indices};
        ${Awe("aIndices", o, o.rank - 2, i.rank, "batchIndices")}
        ${o.indicesSet("aIndices", o.rank - 2, "u32(row)")}
        ${o.indicesSet("aIndices", o.rank - 1, "u32(colIn)")}
        value = ${o.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${yv(e, d)} {
      var value = ${yv(e, d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${s.type.indices};
        ${Awe("bIndices", s, s.rank - 2, i.rank, "batchIndices")}
        ${s.indicesSet("bIndices", s.rank - 2, "u32(row)")}
        ${s.indicesSet("bIndices", s.rank - 1, "u32(colIn)")}
        value = ${s.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${yv(e, d)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t ? `value = value + ${a ? "bias[colIn]" : `${yv(e, d)}(bias[row])`};` : ""}
        ${n}
        ${l.setByIndices("vec3<u32>(coords)", "value")}
      }
    }
    `;
    }, mGe = (e, t, n, r, a = !1, i) => {
      let o = e[0].dims,
        s = e[1].dims,
        l = o.slice(0, -2),
        d = s.slice(0, -2),
        u = r ? r.slice(0, -2) : n.slice(0, -2),
        h = oi.size(u),
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
      GJ(t, E), E.push(...fs(u, k, S));
      let M = ["rank", "rank"],
        T = e.length > 2;
      T && (E.push(...fs(e[2].dims)), M.push("rank")), E.push(...fs(I));
      let P = R => {
        let j = u.length,
          B = pGt("batchDims", e[0].dataType, j, 1),
          F = Pb(e[0].dataType),
          N = yi("a", e[0].dataType, A, w),
          G = yi("b", e[1].dataType, C, w),
          z = as("result", e[0].dataType, I.length, w),
          V = [N, G];
        if (T) {
          let H = a ? w : 1;
          V.push(yi("bias", e[2].dataType, e[2].dims.length, H));
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
        VJ(t, O);
        let L = Pb(z.type.tensor),
          D = $J(t, z.type.value, L),
          U = bwn(w, T, D, [B, N, G, z], a);
        return `
  ${R.registerUniforms(O).registerInternalVariables(B).declareVariables(...V, z)}
  ${U}
  ${y ? J3t(b, v, F, B) : Z3t(b, v, F, B)}
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
  vwn,
  m_r,
  Y8o = Hi(() => {
    il(), KD(), lc(), aee(), bGt(), Q8o(), xGt(), vwn = (e, t, n, r, a = !1, i, o = 4, s = 4, l = 4, d = "f32") => {
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
    var resData = ${yv(o, d)}(0.0);
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
    return ${yv(o, d)}(0.0);` : r && n ? `
    let col = colIn * ${o};
    ${_}` : `
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${_}
    }
    return ${yv(o, d)}(0.0);`,
        k = e ? r && n ? h(s) : `
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${h(s)}
    }
    return ${yv(s, d)}(0.0);` : `
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${h(s)}
    }
    return ${yv(s, d)}(0.0);`,
        A = yv(l, d),
        S = yv(e ? o : s, d),
        C = yv(e ? s : o, d),
        I = $J(i, A, d);
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
      ${h_r(a)}
      ${I}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`;
    }, m_r = (e, t, n, r, a, i, o, s, l) => {
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
      Pd("verbose", () => `[conv2d_mm_webgpu] dispatch = ${k}`);
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
      GJ(t, R), R.push(...fs(e[0].dims, e[1].dims));
      let j = ["rank", "rank"];
      o && (R.push(...fs(e[2].dims)), j.push("rank")), R.push(...fs(n));
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
        VJ(t, N);
        let G = y ? 4 : 1,
          z = Pb(e[0].dataType),
          V = `
      fn setOutputAtIndex(flatIndex : i32, value : ${y ? `vec4<${z}>` : z}) {
        result[flatIndex] = ${y ? `vec4<${z}>` : z}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${y ? `vec4<${z}>` : z}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${y ? "/ 4" : ""}, value);
      }`,
          O = yi("x", e[0].dataType, e[0].dims.length, A === 3 ? 1 : A),
          L = yi("w", e[1].dataType, e[1].dims.length, G),
          D = [O, L],
          U = as("result", e[0].dataType, n.length, G);
        if (o) {
          let H = yi("bias", e[2].dataType, e[2].dims.length, G);
          D.push(H), V += `
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${y ? `vec4<${z}>` : z} {
          return bias[coords.${d ? "w" : "y"}${y ? "/ 4" : ""}];
        }`;
        }
        return `
        ${p_r("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${F.registerUniforms(N).declareVariables(...D, U)}
        ${V}
        ${vwn(d, E, M, T, o, t, P[0], P[1], P[2], z)}
        ${y ? J3t(w, _, z, void 0, !d, I) : Z3t(w, _, z, void 0, !d, I, !1, void 0, s)}`;
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
  wwn,
  aut,
  _ge,
  xwn,
  iut,
  _wn,
  f_r,
  g_r,
  X8o = Hi(() => {
    il(), KD(), Hl(), lc(), aee(), bGt(), wwn = e => {
      let t = 1;
      for (let n = 0; n < e.length; n++) t *= e[n];
      return t;
    }, aut = e => typeof e == "number" ? [e, e, e] : e, _ge = (e, t) => t <= 1 ? e : e + (e - 1) * (t - 1), xwn = (e, t, n, r = 1) => {
      let a = _ge(t, r);
      return Math.floor((e[0] * (n - 1) - n + a) / 2);
    }, iut = (e, t, n, r, a) => {
      a == null && (a = xwn(e, t[0], r[0]));
      let i = [0, 0, 0, n];
      for (let o = 0; o < 3; o++) e[o] + 2 * a >= t[o] && (i[o] = Math.trunc((e[o] - t[o] + 2 * a) / r[o] + 1));
      return i;
    }, _wn = (e, t, n, r, a, i, o, s, l, d) => {
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
        let f = iut([t, n, r, 1], [s, l, d], 1, [a, i, o], e);
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
        let f = iut([t, n, r, 1], [s, l, d], 1, [a, i, o], e[0]);
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
    }, f_r = (e, t, n, r, a, i = !1, o = "channelsLast") => {
      let s, l, d, u, h;
      if (o === "channelsLast") [s, l, d, u, h] = e;else if (o === "channelsFirst") [s, h, l, d, u] = e;else throw new Error(`Unknown dataFormat ${o}`);
      let [p,, m, f, y] = t,
        [b, v, _] = aut(n),
        [w, k, A] = aut(r),
        S = _ge(m, w),
        C = _ge(f, k),
        I = _ge(y, A),
        {
          padInfo: E,
          outDepth: M,
          outHeight: T,
          outWidth: P
        } = _wn(a, l, d, u, b, v, _, S, C, I),
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
    }, g_r = (e, t, n, r, a, i) => {
      let o = i === "channelsLast";
      o ? e[0].dims[3] : e[0].dims[1];
      let s = [64, 1, 1],
        l = {
          x: n.map((b, v) => v)
        },
        d = [Math.ceil(wwn(l.x.map(b => n[b])) / s[0]), 1, 1];
      Pd("verbose", () => `[conv3d_naive_webgpu] dispatch = ${d}`);
      let u = 1,
        h = oi.size(n),
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
      GJ(t, p), p.push(...fs(e[0].dims, e[1].dims));
      let m = ["rank", "rank"],
        f = e.length === 3;
      f && (p.push(...fs(e[2].dims)), m.push("rank")), p.push(...fs(n));
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
        VJ(t, v);
        let _ = 1,
          w = Pb(e[0].dataType),
          k = yi("x", e[0].dataType, e[0].dims.length, u),
          A = yi("W", e[1].dataType, e[1].dims.length, _),
          S = [k, A],
          C = as("result", e[0].dataType, n.length, _),
          I = "";
        if (f) {
          let T = yi("bias", e[2].dataType, e[2].dims.length, _);
          S.push(T), I += `
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${w} {
          return bias[${o ? cs("coords", 4, 5) : cs("coords", 1, 5)}];
        }`;
        }
        let E = yv(u, w),
          M = $J(t, E, w);
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
              let batch = ${cs("coords", 0, k.rank)};
              let d2 = ${o ? cs("coords", k.rank - 1, k.rank) : cs("coords", 1, k.rank)};
              let xFRCCorner = vec3<u32>(${o ? cs("coords", 1, k.rank) : cs("coords", 2, k.rank)},
              ${o ? cs("coords", 2, k.rank) : cs("coords", 3, k.rank)},
              ${o ? cs("coords", 3, k.rank) : cs("coords", 4, k.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${o ? cs("uniforms.x_shape", 1, k.rank) : cs("uniforms.x_shape", 2, k.rank)};
              let xShapeZ = ${o ? cs("uniforms.x_shape", 2, k.rank) : cs("uniforms.x_shape", 3, k.rank)};
              let xShapeW = ${o ? cs("uniforms.x_shape", 3, k.rank) : cs("uniforms.x_shape", 4, k.rank)};
              let xShapeU = ${o ? cs("uniforms.x_shape", 4, k.rank) : cs("uniforms.x_shape", 1, k.rank)};
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
  y_r,
  b_r,
  J8o = Hi(() => {
    il(), Hl(), lc(), aee(), y_r = (e, t, n, r) => {
      let a = e.length > 2,
        i = a ? "value += b[output_channel];" : "",
        o = e[0].dims,
        s = e[1].dims,
        l = t.format === "NHWC",
        d = l ? n[3] : n[1],
        u = d / t.group,
        h = l && u >= 4 ? vf(d) : 1,
        p = oi.size(n) / h,
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
      GJ(t, m), m.push(...fs(o, [s[0], s[1], s[2], s[3] / h]));
      let f = a ? ["rank", "rank", "rank"] : ["rank", "rank"];
      m.push(...fs([n[0], n[1], n[2], n[3] / h]));
      let y = b => {
        let v = as("output", e[0].dataType, n.length, h),
          _ = Pb(v.type.tensor),
          w = $J(t, v.type.value, _),
          k = yi("x", e[0].dataType, o.length),
          A = yi("w", e[1].dataType, s.length, h),
          S = [k, A];
        a && S.push(yi("b", e[2].dataType, e[2].dims, h));
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
        VJ(t, C);
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
    }, b_r = (e, t, n, r) => {
      let a = e.length > 2,
        i = vf(n[3]),
        o = vf(n[2]),
        s = oi.size(n) / i / o,
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
      GJ(t, h), h.push(...fs(l, d, u));
      let p = (o - 1) * t.strides[1] + d[1],
        m = f => {
          let y = as("output", e[0].dataType, u.length, i),
            b = Pb(y.type.tensor),
            v = $J(t, y.type.value, b),
            _ = yi("x", e[0].dataType, l.length, i),
            w = yi("w", e[1].dataType, d.length, i),
            k = [_, w];
          a && k.push(yi("b", e[2].dataType, e[2].dims, i));
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
          return VJ(t, S), `
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
  kwn,
  i9e,
  Awn,
  o9e,
  e4t,
  out,
  Swn,
  Iwn,
  t4t,
  Z8o = Hi(() => {
    Hl(), Y8o(), X8o(), xGt(), J8o(), aee(), wGt(), vG(), kwn = (e, t, n, r, a, i) => {
      let o = e[0],
        s = e.slice(i ? 1 : 2, i ? 3 : 4),
        l = s.length,
        d = t[0],
        u = t.slice(2).map((p, m) => p + (p - 1) * (n[m] - 1)),
        h = s.map((p, m) => p + r[m] + r[m + l]).map((p, m) => Math.floor((p - u[m] + a[m]) / a[m]));
      return h.splice(0, 0, o), h.splice(i ? 3 : 1, 0, d), h;
    }, i9e = [2, 3, 1, 0], Awn = (e, t) => {
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
    }, o9e = (e, t) => {
      let n = e.kernelShape.slice();
      n.length < t[1].dims.length - 2 && n.push(...Array(t[1].dims.length - 2 - n.length).fill(0));
      for (let i = 2; i < t[1].dims.length; ++i) n[i - 2] === 0 && (n[i - 2] = t[1].dims[i]);
      let r = e.pads.slice();
      hGe.adjustPadsBasedOnAutoPad(t[0].dims, e.strides, e.dilations, n, r, e.format === "NHWC", e.autoPad);
      let a = Object.assign({}, e);
      return Object.assign(a, {
        kernelShape: n,
        pads: r
      }), a;
    }, e4t = e => {
      let t = yGt(e),
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
    }, out = (e, t, n, r) => {
      let a = n.format === "NHWC",
        i = kwn(t[0].dims, t[1].dims, n.dilations, n.pads, n.strides, a);
      if (n.group !== 1) {
        let S = [t[0]];
        if (a) {
          let C = e.kernelCustomData.wT ?? e.compute(e3(t[1], i9e), {
            inputs: [1],
            outputs: [n.wIsConst ? -2 : -1]
          })[0];
          n.wIsConst && !e.kernelCustomData.wT && (e.kernelCustomData.wT = C), S.push(C);
        } else S.push(t[1]);
        t.length === 3 && S.push(t[2]), !e.adapterInfo.isArchitecture("ampere") && a && t[1].dims[0] === n.group && t[1].dims[1] === 1 && n.dilations[0] === 1 && n.dilations[1] === 1 ? e.compute(b_r(S, n, i, r), {
          inputs: S
        }) : e.compute(y_r(S, n, i, r), {
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
          let R = e.kernelCustomData.wT ?? e.compute(e3(t[1], i9e), {
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
        T < 8 && P < 8 ? e.compute(vGt(M, n, i, E, a, r), {
          inputs: M
        }) : e.compute(mGe(M, n, i, E, a, r), {
          inputs: M
        });
        return;
      }
      let b = !0,
        v = e.kernelCustomData.wT ?? e.compute(e3(t[1], i9e), {
          inputs: [1],
          outputs: [n.wIsConst ? -2 : -1]
        })[0];
      n.wIsConst && !e.kernelCustomData.wT && (e.kernelCustomData.wT = v);
      let _ = [t[0], v];
      o && _.push(t[2]);
      let w = a ? p * m : f,
        k = a ? f : p * m,
        A = u * h * d;
      e.compute(m_r(_, n, i, w, k, A, o, b, r), {
        inputs: _
      });
    }, Swn = (e, t) => {
      let n = t.format === "NHWC",
        r = [e.inputs[0].reshape(n ? [e.inputs[0].dims[0], 1, e.inputs[0].dims[1], e.inputs[0].dims[2]] : [e.inputs[0].dims[0], e.inputs[0].dims[1], 1, e.inputs[0].dims[2]]), e.inputs[1].reshape([e.inputs[1].dims[0], e.inputs[1].dims[1], 1, e.inputs[1].dims[2]])];
      e.inputs.length === 3 && r.push(e.inputs[2]);
      let a = [0, t.pads[0], 0, t.pads[1]],
        i = [1].concat(t.strides),
        o = [1].concat(t.dilations),
        s = [1].concat(t.kernelShape),
        l = o9e({
          ...t,
          pads: a,
          strides: i,
          dilations: o,
          kernelShape: s
        }, r);
      out(e, r, l, d => n ? [d[0], d[2], d[3]] : [d[0], d[1], d[3]]);
    }, Iwn = (e, t, n) => {
      let r = n.format === "NHWC" ? "channelsLast" : "channelsFirst",
        a = o9e(n, t),
        i = n.autoPad === "NOTSET" ? n.pads : n.autoPad,
        o = f_r(t[0].dims, t[1].dims, n.strides, n.dilations, i, !1, r);
      e.compute(g_r(t, a, o.outShape, [o.filterDepth, o.filterHeight, o.filterWidth], [o.padInfo.front, o.padInfo.top, o.padInfo.left], r));
    }, t4t = (e, t) => {
      if (Awn(e.inputs, t), e.inputs[0].dims.length === 3) Swn(e, t);else if (e.inputs[0].dims.length === 5) Iwn(e, e.inputs, t);else {
        let n = o9e(t, e.inputs);
        out(e, e.inputs, n);
      }
    };
  }),
  v_r,
  e6o = Hi(() => {
    il(), KD(), Hl(), lc(), v_r = (e, t, n) => {
      let r = e.length > 2,
        a = t.outputShape,
        i = t.format === "NHWC",
        o = t.group,
        s = e[1].dims,
        l = s[2] / o,
        d = s[3],
        u = i ? vf(l) : 1,
        h = i ? vf(d) : 1,
        p = i ? d === 1 ? u : h : 1,
        m = oi.size(a) / h,
        f = [Math.ceil(m / 64), 1, 1];
      Pd("verbose", () => `[conv2d_backprop_webgpu] dispatch = ${f}`);
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
        }, ...fs(e[0].dims, e[1].dims)];
      r && (A.push(...fs(e[2].dims)), y.push("rank")), A.push(...fs(a));
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
          E = Pb(e[0].dataType),
          M = i ? 1 : 2,
          T = i ? 2 : 3,
          P = i ? 3 : 1,
          R = yi("W", e[1].dataType, e[1].dims.length, p),
          j = yi("Dy", e[0].dataType, e[0].dims.length, u),
          B = [j, R];
        r && B.push(yi("bias", e[2].dataType, [a[P]].length, h));
        let F = as("result", e[0].dataType, a.length, h),
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
  Cwn,
  Ewn,
  Twn,
  sut,
  w_r,
  Mwn,
  lut,
  Pwn,
  x_r,
  t6o = Hi(() => {
    e6o(), aee(), vG(), Cwn = (e, t, n, r, a, i) => (e - 1) * t + n + (r - 1) * a + 1 - i, Ewn = (e, t, n, r, a) => {
      let i = Math.floor(e / 2);
      t === "SAME_UPPER" ? (n[r] = i, n[a] = e - i) : t === "SAME_LOWER" && (n[r] = e - i, n[a] = i);
    }, Twn = (e, t, n, r, a, i, o, s, l, d) => {
      let u = e.length - 2,
        h = d.length === 0;
      l.length < u && l.push(...Array(u - l.length).fill(0));
      let p = e[0],
        m = t[s ? 3 : 1] * a;
      for (let f = 0, y = e.length - u - (s ? 1 : 0); f < u; ++f, ++y) {
        let b = e[y],
          v = h ? b * o[f] : d[f],
          _ = Cwn(b, o[f], i[f], t[y], n[f], v);
        Ewn(_, r, i, f, f + u), h && d.push(o[f] * (b - 1) + l[f] + (t[y] - 1) * n[f] + 1 - i[f] - i[f + u]);
      }
      d.splice(0, 0, p), d.splice(s ? 3 : 1, 0, m);
    }, sut = (e, t) => {
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
      Twn(s, n, l, e.autoPad, e.group, a, d, r, o, i);
      let u = Object.assign({}, e);
      return Object.assign(u, {
        kernelShape: n,
        pads: a,
        outputPadding: o,
        outputShape: i,
        dilations: l,
        strides: d
      }), u;
    }, w_r = e => {
      let t = yGt(e),
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
    }, Mwn = (e, t) => {
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
    }, lut = (e, t, n, r) => {
      let a = e.kernelCustomData.wT ?? e.compute(e3(t[1], [2, 3, 0, 1]), {
        inputs: [1],
        outputs: [n.wIsConst ? -2 : -1]
      })[0];
      n.wIsConst && !e.kernelCustomData.wT && (e.kernelCustomData.wT = a);
      let i = [t[0], a];
      t.length === 3 && i.push(t[2]), e.compute(v_r(i, n, r), {
        inputs: i
      });
    }, Pwn = (e, t) => {
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
      let d = sut({
        ...t,
        pads: s,
        strides: o,
        dilations: i,
        kernelShape: a,
        outputPadding: l
      }, r);
      lut(e, r, d, u => n ? [u[0], u[2], u[3]] : [u[0], u[1], u[3]]);
    }, x_r = (e, t) => {
      if (Mwn(e.inputs, t), e.inputs[0].dims.length === 3) Pwn(e, t);else {
        let n = sut(t, e.inputs);
        lut(e, e.inputs, n);
      }
    };
  }),
  Rwn,
  __r,
  k_r,
  n6o = Hi(() => {
    il(), Hl(), vg(), lc(), Rwn = (e, t, n, r) => {
      let a = oi.size(t),
        i = t.length,
        o = yi("input", e, i),
        s = as("output", e, i),
        l = n.dataType === 6 ? n.getInt32Array()[0] : Number(n.getBigInt64Array()[0]),
        d = oi.normalizeAxis(l, i),
        u = h => {
          let p = ` i32(${o.indicesGet("inputIndices", "uniforms.axis")}) `,
            m = cs("uniforms.input_shape", "uniforms.axis", i),
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
          }, ...fs(t, t)]
        }),
        getShaderSource: u
      };
    }, __r = (e, t) => {
      let n = e.inputs[0].dims,
        r = e.inputs[0].dataType,
        a = e.inputs[1];
      e.compute(Rwn(r, n, a, t), {
        inputs: [0]
      });
    }, k_r = e => {
      let t = e.exclusive === 1,
        n = e.reverse === 1;
      return sh({
        exclusive: t,
        reverse: n
      });
    };
  }),
  Nwn,
  jwn,
  Dwn,
  A_r,
  S_r,
  r6o = Hi(() => {
    il(), Hl(), vg(), lc(), Nwn = e => {
      if (!e || e.length !== 1) throw new Error("DepthToSpace requires 1 input.");
      if (e[0].dims.length !== 4) throw new Error("DepthToSpace requires 4D input.");
    }, jwn = (e, t, n, r) => {
      let a = [];
      a.push(`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);
      for (let i = 0; i < t; ++i) a.push(n.indicesSet("a", e[i], `i[${i}]`));
      return a.push("return a;}"), a.join(`
`);
    }, Dwn = (e, t) => {
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
        f = yi("a", m, p),
        y = as("output", m, p),
        b = v => `
  ${v.registerUniform("output_size", "u32").declareVariables(f, y)}

  ${jwn(s, p, f, y)}

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
            w = oi.size(_),
            k = h.dims,
            A = oi.sortBasedOnPerm(k, s);
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
            }, ...fs(k, A)]
          };
        },
        getShaderSource: b
      };
    }, A_r = (e, t) => {
      Nwn(e.inputs), e.compute(Dwn(e.inputs[0], t));
    }, S_r = e => sh({
      blocksize: e.blocksize,
      mode: e.mode,
      format: e.format
    });
  }),
  s9e,
  kge,
  cut,
  Lwn,
  Own,
  Bwn,
  Fwn,
  dut,
  zwn,
  I_r,
  C_r,
  a6o = Hi(() => {
    il(), Hl(), vg(), lc(), s9e = "[a-zA-Z]|\\.\\.\\.", kge = "(" + s9e + ")+", cut = "^" + kge + "$", Lwn = "(" + kge + ",)*" + kge, Own = "^" + Lwn + "$", Bwn = class {
      constructor(e = -1) {
        this.symbolToIndices = new Map(), this.inputIndex = e;
      }
      addSymbol(e, t) {
        let n = this.symbolToIndices.get(e);
        n === void 0 ? n = [t] : n.push(t), this.symbolToIndices.set(e, n);
      }
    }, Fwn = class {
      constructor(e, t) {
        var a;
        this.equation = t, this.hasEllipsis = !1, this.symbolToInfo = new Map(), this.lhs = new Array(), this.outputDims = [];
        let [n, r] = t.includes("->") ? t.split("->", 2) : [t, ""];
        if (!n.match(RegExp(Own))) throw new Error("Invalid LHS term");
        if (n.split(",").forEach((i, o) => {
          let s = e[o].dims.slice();
          if (!i.match(RegExp(cut))) throw new Error("Invalid LHS term");
          let l = this.processTerm(i, !0, s, o);
          this.lhs.push(l);
        }), r === "") r += [...this.symbolToInfo.entries()].filter(([i, o]) => o.count === 1 || i === "...").map(([i]) => i).join("");else if (!r.match(RegExp(kge))) throw new Error("Invalid RHS");
        (a = r.match(RegExp(s9e, "g"))) == null || a.forEach(i => {
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
        if (!e.match(RegExp(cut)) && !t && e !== "") throw new Error("Invalid LHS term");
        let l = e.match(RegExp(s9e, "g")),
          d = new Bwn(r);
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
    }, dut = e => e + "_max", zwn = (e, t, n, r) => {
      let a = e.map(d => d.length).map((d, u) => yi(`input${u}`, t, d)),
        i = oi.size(r),
        o = as("output", t, r.length),
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
            }), y.push(`for(var ${A}: u32 = 0; ${A} < uniforms.${dut(A)}; ${A}++) {`), b.push("}");
          });
          let w = _ ? [...u, `let sum = ${a.map((k, A) => k.getByIndices(`input${A}Indices`)).join(" * ")};`] : [...u, p, ...y, ...f, h, ...v, m, ...b];
          return `
            ${d.registerUniforms(s.map(k => ({
            name: `${dut(k)}`,
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
          let u = e.map((h, p) => [...fs(h)]).reduce((h, p) => h.concat(p), d);
          return u.push(...fs(r)), {
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
    }, I_r = (e, t) => {
      let n = new Fwn(e.inputs, t.equation),
        r = n.outputDims,
        a = e.inputs.map((i, o) => i.dims);
      e.compute(zwn(a, e.inputs[0].dataType, n, r));
    }, C_r = e => {
      let t = e.equation.replace(/\s+/g, "");
      return sh({
        equation: t
      });
    };
  }),
  Uwn,
  uut,
  $wn,
  Gwn,
  E_r,
  i6o = Hi(() => {
    il(), Hl(), lc(), Uwn = e => {
      if (!e || e.length !== 2) throw new Error("Expand requires 2 input.");
      let t = e[0].dims,
        n = Array.from(e[1].getBigInt64Array(), Number),
        r = n.length < t.length ? 0 : n.length - t.length,
        a = t.length < n.length ? 0 : t.length - n.length;
      for (; r < n.length && a < t.length; ++r, ++a) if (n[r] !== t[a] && n[r] !== 1 && t[a] !== 1) throw new Error("Expand requires shape to be broadcastable to input");
    }, uut = (e, t) => {
      let n = e.length - t.length,
        r = [];
      for (let a = 0; a < n; ++a) r.push(e[a]);
      for (let a = 0; a < t.length; ++a) r.push(t[a] === 1 ? e[a + n] : t[a]);
      return r;
    }, $wn = (e, t) => e.length > t.length ? uut(e, t) : uut(t, e), Gwn = e => {
      let t = e[0].dims,
        n = Array.from(e[1].getBigInt64Array(), Number),
        r = $wn(t, n),
        a = e[0].dataType,
        i = a === 9 || oi.size(t) === 1,
        o = a === 9 || t.length > 0 && t[t.length - 1] % 4 === 0 ? 4 : 1,
        s = i || r.length > 0 && r[r.length - 1] % 4 === 0 ? 4 : 1,
        l = Math.ceil(oi.size(r) / s),
        d = h => {
          let p = yi("input", a, t.length, o),
            m = as("output", a, r.length, s),
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
        }, ...fs(t, r)];
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
    }, E_r = e => {
      Uwn(e.inputs), e.compute(Gwn(e.inputs), {
        inputs: [0]
      });
    };
  }),
  Vwn,
  T_r,
  o6o = Hi(() => {
    il(), Hl(), lc(), gGt(), Vwn = e => {
      let t = e[0].dataType,
        n = oi.size(e[0].dims),
        r = oi.size(e[1].dims),
        a = r % 4 === 0,
        i = o => {
          let s = yi("x", t, [1], 4),
            l = yi("bias", t, [1], 4),
            d = as("y", t, [1], 4),
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

    ${Y3t(Hw(t))}

    ${o.mainStart(mue)}
      ${o.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${s.getByOffset("global_idx")};
      ${p}
      let x_in = x + bias;
      ${d.setByOffset("global_idx", X3t("x_in"))}
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
            x: Math.ceil(n / mue / 4)
          }
        })
      };
    }, T_r = e => {
      e.inputs.length < 2 || oi.size(e.inputs[1].dims) === 0 ? Q2r(e) : e.compute(Vwn(e.inputs));
    };
  }),
  Hwn,
  Wwn,
  M_r,
  P_r,
  s6o = Hi(() => {
    il(), Hl(), vg(), lc(), Hwn = e => {
      if (!e || e.length !== 2) throw new Error("Gather requires 2 inputs.");
    }, Wwn = (e, t) => {
      let n = e[0].dims,
        r = e[1].dims,
        a = n.length,
        i = oi.normalizeAxis(t.axis, a),
        o = n.slice(0);
      o.splice(i, 1, ...r);
      let s = n[i],
        l = e[0].dataType === 9 ? 4 : 1,
        d = Math.ceil(oi.size(o) / l),
        u = [{
          type: 12,
          data: d
        }, {
          type: 6,
          data: s
        }, {
          type: 12,
          data: i
        }, ...fs(e[0].dims, e[1].dims, o)],
        h = p => {
          let m = yi("data", e[0].dataType, e[0].dims.length, l),
            f = yi("inputIndices", e[1].dataType, e[1].dims.length),
            y = as("output", e[0].dataType, o.length, l),
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
    }, M_r = e => sh({
      axis: e.axis
    }), P_r = (e, t) => {
      let n = e.inputs;
      Hwn(n), e.compute(Wwn(e.inputs, t));
    };
  }),
  qwn,
  R_r,
  N_r,
  l6o = Hi(() => {
    il(), Hl(), lc(), qwn = (e, t, n, r, a, i, o, s, l) => {
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
      d.push(...fs(t.dims, u));
      let h = p => {
        let m = yi("indices_data", t.dataType, t.dims.length),
          f = as("input_slice_offsets_data", 12, 1, 1),
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
    }, R_r = (e, t) => {
      let n = e.inputs,
        r = n[0].dims,
        a = n[0].dataType,
        i = n[1].dims,
        o = i[i.length - 1],
        s = oi.sizeToDimension(i, i.length - 1),
        l = oi.sizeFromDimension(r, t.batchDims + o),
        d = oi.sizeToDimension(r, t.batchDims),
        u = oi.sizeFromDimension(r, t.batchDims),
        h = s / d,
        p = new Array(o),
        m = l;
      for (let k = 0; k < o; ++k) p[o - 1 - k] = m, m *= r[t.batchDims + o - 1 - k];
      let f = qwn(e, n[1], p, t.batchDims, r, s, h, u, o),
        y = t.batchDims + o;
      if (y > r.length) throw new Error("last dimension of indices must not be larger than rank of input tensor");
      let b = i.slice(0, -1).concat(r.slice(y)),
        v = oi.size(b),
        _ = [{
          type: 12,
          data: v
        }, {
          type: 12,
          data: l
        }, ...fs(n[0].dims, f.dims, b)],
        w = k => {
          let A = yi("data", n[0].dataType, n[0].dims.length),
            S = yi("slice_offsets", 12, f.dims.length),
            C = as("output", n[0].dataType, b.length);
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
    }, N_r = e => ({
      batchDims: e.batch_dims,
      cacheKey: ""
    });
  }),
  Kwn,
  Qwn,
  j_r,
  D_r,
  c6o = Hi(() => {
    il(), Hl(), vg(), lc(), Kwn = (e, t) => {
      if (e.length < 3 || e.length > 4) throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");
      let n = oi.normalizeAxis(t.quantizeAxis, e[0].dims.length),
        r = t.blockSize,
        a = e[0],
        i = e[2],
        o = e.length === 4 ? e[3] : void 0;
      if (i.dims.length !== a.dims.length || !a.dims.map((s, l) => l === n ? Math.ceil(s / r) === i.dims[l] : s === i.dims[l]).reduce((s, l) => s && l, !0)) throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");
      if (o) {
        if (o.dataType !== a.dataType) throw new Error("Zero point must have the same data type as the input tensor.");
        if (o.dims.length !== i.dims.length || !o.dims.map((s, l) => s === i.dims[l]).reduce((s, l) => s && l, !0)) throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.");
      }
    }, Qwn = (e, t) => {
      let n = e[0].dims,
        r = e[1].dims,
        a = n.length,
        i = oi.normalizeAxis(t.gatherAxis, a),
        o = oi.normalizeAxis(t.quantizeAxis, a),
        s = n.slice(0);
      s.splice(i, 1, ...r);
      let l = oi.size(s),
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
        }, ...fs(...e.map((m, f) => m.dims), s)],
        p = m => {
          let f = yi("data", e[0].dataType, e[0].dims.length),
            y = yi("inputIndices", e[1].dataType, e[1].dims.length),
            b = yi("scales", e[2].dataType, e[2].dims.length),
            v = e.length > 3 ? yi("zeroPoint", e[3].dataType, e[3].dims.length) : void 0,
            _ = as("output", d, s.length),
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
        let dequantized_data = ${Hw(d)}(quantized_data - zero_point) * scale;
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
    }, j_r = (e, t) => {
      let n = e.inputs;
      Kwn(n, t), e.compute(Qwn(e.inputs, t));
    }, D_r = e => sh({
      blockSize: e.blockSize,
      gatherAxis: e.gatherAxis,
      quantizeAxis: e.quantizeAxis
    });
  }),
  Ywn,
  Xwn,
  L_r,
  O_r,
  d6o = Hi(() => {
    il(), Hl(), vg(), lc(), Ywn = e => {
      if (!e || e.length !== 2) throw new Error("GatherElements requires 2 inputs.");
      if (e[0].dims.length < 1) throw new Error("GatherElements requires that the data input be rank >= 1.");
      if (e[0].dims.length !== e[1].dims.length) throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`);
    }, Xwn = (e, t) => {
      let n = e[0].dims,
        r = e[0].dataType,
        a = n.length,
        i = e[1].dims,
        o = e[1].dataType,
        s = oi.normalizeAxis(t.axis, a),
        l = n[s],
        d = i.slice(0),
        u = oi.size(d),
        h = yi("input", r, a),
        p = yi("indicesInput", o, i.length),
        m = as("output", r, d.length),
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
      return f.push(...fs(n, i, d)), {
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
    }, L_r = e => sh({
      axis: e.axis
    }), O_r = (e, t) => {
      let n = e.inputs;
      Ywn(n), e.compute(Xwn(e.inputs, t));
    };
  }),
  Jwn,
  Zwn,
  B_r,
  F_r,
  u6o = Hi(() => {
    il(), Hl(), lc(), Jwn = e => {
      if (!e) throw new Error("Input is missing");
      if (e.length < 2 || e.length > 3) throw new Error("Invaid input number.");
      if (e.length === 3 && e[2].dims.length > 2) throw new Error("Invalid input shape of C");
      if (e[0].dataType !== e[1].dataType || e.length === 3 && e[0].dataType !== e[2].dataType) throw new Error("Input types are mismatched");
    }, Zwn = (e, t) => {
      let n = e[0].dims.slice(),
        r = e[1].dims.slice(),
        [a, i, o] = zxr.getShapeOfGemmResult(n, t.transA, r, t.transB, e.length === 3 ? e[2].dims : void 0),
        s = [a, i];
      if (!s) throw new Error("Can't use gemm on the given tensors");
      let l = 16,
        d = Math.ceil(i / l),
        u = Math.ceil(a / l),
        h = !0,
        p = oi.size(s),
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
      e.length === 3 && (m.push(...fs(e[2].dims)), f.push("rank")), m.push(...fs(s));
      let y = v => {
          let _ = "";
          t.transA && t.transB ? _ = "value += a[k * uniforms.M + m] * b[n * uniforms.K + k];" : t.transA && !t.transB ? _ = "value += a[k * uniforms.M + m] * b[k * uniforms.N + n];" : !t.transA && t.transB ? _ = "value += a[m * uniforms.K + k] * b[n * uniforms.K + k];" : !t.transA && !t.transB && (_ = "value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");
          let w = t.alpha === 1 ? "" : "value *= uniforms.alpha;",
            k = yi("a", e[0].dataType, e[0].dims),
            A = yi("b", e[1].dataType, e[1].dims),
            S = k.type.value,
            C = null,
            I = [k, A];
          e.length === 3 && (C = yi("c", e[2].dataType, e[2].dims.length), I.push(C));
          let E = as("output", e[0].dataType, s.length);
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
          let _ = yi("a", e[0].dataType, e[0].dims),
            w = yi("b", e[1].dataType, e[1].dims),
            k = null,
            A = [_, w];
          e.length === 3 && (k = yi("c", e[2].dataType, e[2].dims.length), A.push(k));
          let S = as("output", e[0].dataType, s.length);
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
    }, B_r = e => {
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
    }, F_r = (e, t) => {
      Jwn(e.inputs), e.compute(Zwn(e.inputs, t));
    };
  }),
  A8,
  dR,
  AV,
  SV,
  exn,
  txn,
  nxn,
  rxn,
  axn,
  ixn,
  oxn,
  sxn,
  z_r,
  U_r,
  h6o = Hi(() => {
    il(), Hl(), vg(), lc(), [A8, dR, AV, SV] = [0, 1, 2, 3], exn = e => {
      if (e[0].dims.length !== 4) throw new Error("only 4-D tensor is supported.");
      if (e[0].dims.length !== e[1].dims.length) throw new Error("input dimensions must be equal to grid dimensions");
      if (e[0].dims.length - 2 !== e[1].dims[e[1].dims.length - 1]) throw new Error(`last dimension of grid must be equal to ${e[0].dims.length - 2}`);
      if (e[0].dims[0] !== e[1].dims[0]) throw new Error("grid batch size must match input batch size");
    }, txn = `
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
`, nxn = e => `
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
`, rxn = e => `
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners === 0 ? `
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    ` : `
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`, axn = e => `
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
`, ixn = (e, t, n) => `
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${A8}] = batch;
     indices[${dR}] = channel;` + (() => {
      switch (n.paddingMode) {
        case "zeros":
          return `
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${AV}] = u32(r);
            indices[${SV}] = u32(c);
          }
        `;
        case "border":
          return `
          indices[${AV}] = u32(clamp(r, 0, H - 1));
          indices[${SV}] = u32(clamp(c, 0, W - 1));
        `;
        case "reflection":
          return `
          indices[${AV}] = gs_reflect(r, border[1], border[3]);
          indices[${SV}] = gs_reflect(c, border[0], border[2]);
        `;
        default:
          throw new Error(`padding mode ${n.paddingMode} is not supported`);
      }
    })() + `
    return ${e.getByIndices("indices")};
  }
`, oxn = (e, t, n) => (() => {
      switch (n.mode) {
        case "nearest":
          return `
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${A8}], indices[${dR}], border);
        `;
        case "bilinear":
          return `
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${A8}], indices[${dR}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${A8}], indices[${dR}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${A8}], indices[${dR}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${A8}], indices[${dR}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${A8}], indices[${dR}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;
        default:
          throw new Error(`mode ${n.mode} is not supported`);
      }
    })() + `${e.setByOffset("global_idx", "result")}`, sxn = (e, t) => {
      let n = yi("x", e[0].dataType, e[0].dims.length),
        r = [e[1].dims[0], e[1].dims[1], e[1].dims[2]],
        a = yi("grid", e[1].dataType, r.length, 2),
        i = [e[0].dims[0], e[0].dims[1], e[1].dims[1], e[1].dims[2]];
      t.format === "NHWC" && (i = [e[0].dims[0], e[1].dims[1], e[1].dims[2], e[0].dims[3]], [A8, dR, AV, SV] = [0, 3, 1, 2]);
      let o = as("output", e[0].dataType, i.length),
        s = n.type.value,
        l = oi.size(i),
        d = [{
          type: 12,
          data: l
        }, ...fs(e[0].dims, r, i)],
        u = h => `
  ${h.registerUniform("output_size", "u32").declareVariables(n, a, o)}
  ${txn}
  ${nxn(s)}
  ${rxn(t)}
  ${axn(t)}
  ${ixn(n, s, t)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${AV}]);
      let W_in = i32(uniforms.x_shape[${SV}]);

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
      var grid_indices = vec3<u32>(indices[${A8}], indices[${AV}], indices[${SV}]);
      let nxy = ${a.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${oxn(o, s, t)}
  }`;
      return {
        name: "GridSample",
        shaderCache: {
          hint: `${t.cacheKey}`,
          inputDependencies: ["type", "type"]
        },
        getRunData: h => {
          let p = oi.size(i);
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
    }, z_r = (e, t) => {
      exn(e.inputs), e.compute(sxn(e.inputs, t));
    }, U_r = e => sh({
      alignCorners: e.align_corners,
      mode: e.mode,
      paddingMode: e.padding_mode,
      format: e.format
    });
  }),
  e2,
  lxn,
  $_r,
  hut,
  cxn,
  obe,
  G_r,
  V_r = Hi(() => {
    il(), Hl(), vg(), hGt(), fGt(), lc(), vG(), e2 = (e, t) => e.length > t && e[t].dims.length > 0 ? e[t] : void 0, lxn = (e, t) => {
      let n = e[0],
        r = e2(e, 1),
        a = e2(e, 2),
        i = e2(e, 3),
        o = e2(e, 4),
        s = e2(e, 5),
        l = e2(e, 6),
        d = e2(e, 7);
      if (n.dims.length !== 3 && n.dims.length !== 5) throw new Error("Input query is expected to have 3 or 5 dimensions");
      let u = n.dims[0],
        h = n.dims[1],
        p = n.dims.length === 3 ? n.dims[2] : t.numHeads * n.dims[4],
        m = h,
        f = 0,
        y = 0,
        b = Math.floor(p / t.numHeads);
      if (l && d && oi.size(l.dims) && oi.size(d.dims)) {
        if (l.dims.length !== 4) throw new Error('Input "past_key" is expected to have 4 dimensions');
        if (l.dims[0] !== u || l.dims[1] !== t.numHeads || l.dims[3] !== b) throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');
        if (d.dims[0] !== u || d.dims[1] !== t.numHeads || d.dims[3] !== b) throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');
        if (l.dims[2] !== d.dims[2]) throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');
        if (d.dims.length !== 4) throw new Error('Input "past_value" is expected to have 4 dimensions');
        f = l.dims[2], y = l.dims[2];
      } else if (l && oi.size(l.dims) || d && oi.size(d.dims)) throw new Error('Input "past_key" and "past_value" shall be both present or both absent');
      let v;
      if (r && oi.size(r.dims) > 0) {
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
      if (i && oi.size(i.dims) > 0) {
        if (i.dims.length !== 1) throw new Error('Input "bias" is expected to have 1 dimension');
        if (r && r.dims.length === 5 && r.dims[3] === 2) throw new Error("bias is not allowed for packed kv.");
      }
      let _ = f + m,
        w = 0;
      if (o && oi.size(o.dims) > 0) {
        w = 8;
        let C = o.dims;
        throw C.length === 1 ? C[0] === u ? w = 1 : C[0] === 3 * u + 2 && (w = 3) : C.length === 2 && C[0] === u && C[1] === _ && (w = 5), w === 8 ? new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)') : new Error("Mask not supported");
      }
      let k = !1,
        A = p;
      if (a && oi.size(a.dims) > 0) {
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
      if (o && oi.size(o.dims) > 0) throw new Error("Key padding mask is not supported");
      if (s && oi.size(s.dims) > 0) {
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
    }, $_r = e => sh({
      ...e
    }), hut = sh({
      perm: [0, 2, 1, 3]
    }), cxn = (e, t, n, r, a, i, o) => {
      let s = [r, a, i],
        l = oi.size(s),
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
          let p = as("qkv_with_bias", t.dataType, s),
            m = yi("qkv", t.dataType, s),
            f = yi("bias", n.dataType, s),
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
    }, obe = (e, t, n, r, a, i, o, s) => {
      let l = i;
      if (o && oi.size(o.dims) > 0) {
        if (r === 1) throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");
        return l = cxn(e, i, o, t, r, n * a, s), l = l.reshape([t, r, n, a]), n === 1 || r === 1 ? l : e.compute(e3(l, hut.perm), {
          inputs: [l],
          outputs: [-1]
        })[0];
      } else return i.dims.length === 3 && (l = i.reshape([t, r, n, a])), n === 1 || r === 1 ? l : e.compute(e3(l, hut.perm), {
        inputs: [l],
        outputs: [-1]
      })[0];
    }, G_r = (e, t) => {
      let n = lxn(e.inputs, t),
        r = e.inputs[0],
        a = e2(e.inputs, 1),
        i = e2(e.inputs, 2),
        o = e2(e.inputs, 3),
        s = e2(e.inputs, 4),
        l = e2(e.inputs, 5),
        d = e2(e.inputs, 6),
        u = e2(e.inputs, 7);
      if (r.dims.length === 5) throw new Error("Packed QKV is not implemented");
      if ((a == null ? void 0 : a.dims.length) === 5) throw new Error("Packed KV is not implemented");
      let h = a && i && a.dims.length === 4 && i.dims.length === 4,
        p = obe(e, n.batchSize, n.numHeads, n.sequenceLength, n.headSize, r, o, 0);
      if (h) return DAe(e, p, a, i, s, void 0, d, u, l, n);
      if (!a || !i) throw new Error("key and value must be provided");
      let m = obe(e, n.batchSize, n.numHeads, n.kvSequenceLength, n.headSize, a, o, n.hiddenSize),
        f = obe(e, n.batchSize, n.numHeads, n.kvSequenceLength, n.vHeadSize, i, o, 2 * n.hiddenSize);
      DAe(e, p, m, f, s, void 0, d, u, l, n);
    };
  }),
  dxn,
  uxn,
  hxn,
  pxn,
  n4t,
  H_r,
  W_r,
  q_r = Hi(() => {
    il(), Hl(), vg(), lc(), dxn = e => {
      if (!e || e.length < 1) throw new Error("too few inputs");
    }, uxn = (e, t) => {
      let n = [],
        r = t.numOutputs;
      return e[1].dims[0] > 0 && (e[1].getBigInt64Array().forEach(a => n.push(Number(a))), r = n.length), sh({
        numOutputs: r,
        axis: t.axis,
        splitSizes: n
      });
    }, hxn = e => `
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${cs("uniforms.size_in_split_axis", "i", e)}) {
        return i;
    }
    }
    return ${e}u;
}`, pxn = e => {
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
    }, n4t = (e, t) => {
      let n = e[0].dims,
        r = oi.size(n),
        a = e[0].dataType,
        i = oi.normalizeAxis(t.axis, n.length),
        o = new Array(t.numOutputs),
        s = yi("input", a, n.length),
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
        y[i] = t.splitSizes[f], u.push(y), o[f] = as(`output${f}`, a, y.length), d.push({
          dims: u[f],
          dataType: e[0].dataType
        });
      }
      p.push({
        type: 12,
        data: l
      }, ...fs(n, ...u));
      let m = f => `
  ${f.registerUniform("input_size", "u32").registerUniform("size_in_split_axis", "u32", l.length).declareVariables(s, ...o)}
  ${hxn(l.length)}
  ${pxn(o)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${s.offsetToIndices("global_idx")};
    var index = ${s.indicesGet("indices", i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${cs("uniforms.size_in_split_axis", "output_number - 1u", l.length)};
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
    }, H_r = (e, t) => {
      dxn(e.inputs);
      let n = e.inputs.length === 1 ? t : uxn(e.inputs, t);
      e.compute(n4t(e.inputs, n), {
        inputs: [0]
      });
    }, W_r = e => {
      let t = e.axis,
        n = e.splitSizes,
        r = e.numOutputs < 0 ? n.length : e.numOutputs;
      if (r !== n.length) throw new Error("numOutputs and splitSizes lengh must be equal");
      return sh({
        axis: t,
        numOutputs: r,
        splitSizes: n
      });
    };
  }),
  mxn,
  fxn,
  put,
  K_r,
  p6o = Hi(() => {
    vg(), fGt(), V_r(), q_r(), vG(), mxn = (e, t) => {
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
    }, fxn = sh({
      perm: [0, 2, 1, 3]
    }), put = (e, t, n) => {
      let r = t,
        a = n.kvNumHeads;
      return t.dims.length === 3 && n.kvSequenceLength !== 0 && (r = t.reshape([n.batchSize, n.kvSequenceLength, a, n.headSize]), r = e.compute(e3(r, fxn.perm), {
        inputs: [r],
        outputs: [-1]
      })[0]), r;
    }, K_r = (e, t) => {
      var b;
      let n = mxn(e.inputs, t);
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
        h = sh({
          axis: 2,
          numOutputs: 3,
          splitSizes: [n.numHeads * n.headSize, u * n.headSize, u * n.headSize]
        }),
        [p, m, f] = !a && !i ? e.compute(n4t([r], h), {
          inputs: [r],
          outputs: [-1, -1, -1]
        }) : [r, a, i],
        y = obe(e, n.batchSize, n.numHeads, n.sequenceLength, n.headSize, p, void 0, 0);
      DAe(e, y, put(e, m, n), put(e, f, n), void 0, void 0, o, s, void 0, n, l, d);
    };
  }),
  mut,
  gxn,
  yxn,
  Q_r,
  m6o = Hi(() => {
    il(), Hl(), vG(), lc(), mut = (e, t, n, r, a, i, o, s) => {
      let l = vf(i),
        d = l === 1 ? "f32" : `vec${l}f`,
        u = l === 1 ? "vec2f" : `mat2x${l}f`,
        h = a * o,
        p = 64;
      h === 1 && (p = 256);
      let m = [a, o, i / l],
        f = [a, o, 2],
        y = ["rank", "type", "type"],
        b = [];
      b.push(...fs(m, f));
      let v = _ => {
        let w = yi("x", t.dataType, 3, l),
          k = yi("scale", n.dataType, n.dims),
          A = yi("bias", r.dataType, r.dims),
          S = as("output", 1, 3, 2),
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
      let sum_final = ${C$("workgroup_shared[0][0]", l)} / f32(hight * ${l});
      let squared_sum_final = ${C$("workgroup_shared[0][1]", l)} / f32(hight * ${l});

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
    }, gxn = (e, t, n) => {
      let r = t[0].dims,
        a = r,
        i = 2,
        o = r[0],
        s = r[1],
        l = oi.sizeFromDimension(r, i),
        d = vf(l),
        u = oi.size(a) / d,
        h = mut(e, t[0], t[1], t[2], o, l, s, n.epsilon),
        p = [o, s, l / d],
        m = [o, s],
        f = ["type", "none"],
        y = b => {
          let v = yi("x", t[0].dataType, p.length, d),
            _ = yi("scale_shift", 1, m.length, 2),
            w = as("output", t[0].dataType, p.length, d),
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
          }, ...fs(p, m, p)]
        }),
        getShaderSource: y
      }, {
        inputs: [t[0], h]
      });
    }, yxn = (e, t, n) => {
      let r = t[0].dims,
        a = r,
        i = r[0],
        o = r[r.length - 1],
        s = oi.sizeFromDimension(r, 1) / o,
        l = vf(o),
        d = oi.size(a) / l,
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
      let f = p ? e.compute(e3(e.inputs[0], m), {
          inputs: [e.inputs[0]],
          outputs: [-1]
        })[0] : e.inputs[0].reshape(Array.from({
          length: r.length
        }, (v, _) => r[m[_]])),
        y = mut(e, f, t[1], t[2], i, s, o, n.epsilon),
        b = v => {
          let _ = Pb(t[0].dataType),
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
            A = yi("input", t[0].dataType, t[0].dims, l),
            S = as("output", t[0].dataType, a, l);
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
    }, Q_r = (e, t) => {
      t.format === "NHWC" ? yxn(e, e.inputs, t) : gxn(e, e.inputs, t);
    };
  }),
  bxn,
  vxn,
  Y_r,
  f6o = Hi(() => {
    il(), Hl(), lc(), bxn = e => {
      if (!e || e.length < 2) throw new Error("layerNorm requires at least 2 inputs.");
    }, vxn = (e, t, n) => {
      let r = t.simplified,
        a = e[0].dims,
        i = e[1],
        o = !r && e[2],
        s = a,
        l = oi.normalizeAxis(t.axis, a.length),
        d = oi.sizeToDimension(a, l),
        u = oi.sizeFromDimension(a, l),
        h = oi.size(i.dims),
        p = o ? oi.size(o.dims) : 0;
      if (h !== u || o && p !== u) throw new Error(`Size of X.shape()[axis:] == ${u}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${h} and bias size of ${p}`);
      let m = [];
      for (let A = 0; A < a.length; ++A) A < l ? m.push(a[A]) : m.push(1);
      let f = vf(u),
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
          let S = Pb(e[0].dataType),
            C = [yi("x", e[0].dataType, e[0].dims, f), yi("scale", i.dataType, i.dims, f)];
          o && C.push(yi("bias", o.dataType, o.dims, f)), C.push(as("output", e[0].dataType, s, f)), v && C.push(as("mean_data_output", 1, m)), _ && C.push(as("inv_std_output", 1, m));
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
    var mean_vector = ${q3t("f32", f)};
    var mean_square_vector = ${q3t("f32", f)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${cae(S, f, "x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${C$("mean_vector", f)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${C$("mean_square_vector", f)} / uniforms.norm_size ${r ? "" : "- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${cae(S, f, "x[j + offset]")};
      let f32scale = ${cae(S, f, "scale[j]")};
      output[j + offset] = ${C[0].type.value}((f32input ${r ? "" : "- mean"}) * inv_std_dev * f32scale
        ${o ? `+ ${cae(S, f, "bias[j]")}` : ""}
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
    }, Y_r = (e, t) => {
      bxn(e.inputs), e.compute(vxn(e.inputs, t, e.outputCount));
    };
  }),
  wxn,
  X_r,
  g6o = Hi(() => {
    Hl(), wGt(), xGt(), wxn = e => {
      if (!e || e.length !== 2) throw new Error("MatMul requires 2 inputs.");
      if (e[0].dims[e[0].dims.length - 1] !== e[1].dims[e[1].dims.length - 2]) throw new Error("shared dimension does not match.");
    }, X_r = e => {
      wxn(e.inputs);
      let t = pue.calcShape(e.inputs[0].dims, e.inputs[1].dims, !0);
      if (!t) throw new Error("Can't use matmul on the given tensors");
      let n = t[t.length - 1],
        r = e.inputs[0].dims[e.inputs[0].dims.length - 1];
      if (n < 8 && r < 8) e.compute(vGt(e.inputs, {
        activation: ""
      }, t));else {
        let a = t[t.length - 2],
          i = oi.size(e.inputs[0].dims.slice(0, -2)),
          o = oi.size(e.inputs[1].dims.slice(0, -2));
        if (i !== 1 && a === 1 && o === 1) {
          let s = e.inputs[0].reshape([1, i, r]),
            l = e.inputs[1].reshape([1, r, n]),
            d = [1, i, n],
            u = [s, l];
          e.compute(mGe(u, {
            activation: ""
          }, t, d), {
            inputs: u
          });
        } else e.compute(mGe(e.inputs, {
          activation: ""
        }, t));
      }
    };
  }),
  xxn,
  _xn,
  kxn,
  J_r,
  Z_r,
  y6o = Hi(() => {
    il(), Hl(), vg(), lc(), xxn = (e, t) => {
      if (e.length < 3 || e.length > 4) throw new Error("MatMulNBits requires 3 or 4 inputs");
      let n = e[0],
        r = n.dims.length;
      if (n.dims[r - 1] !== t.k) throw new Error("The last dim of input shape does not match the k value");
      let a = Math.floor((t.k + t.blockSize - 1) / t.blockSize),
        i = t.blockSize / 8 * t.bits,
        o = e[1];
      if (!oi.areEqual(o.dims, [t.n, a, i])) throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");
      let s = e[2].dims;
      if (oi.size(s) !== t.n * a) throw new Error("scales input size error.");
      if (e.length === 4) {
        let l = e[3].dims,
          d = t.bits > 4 ? t.n * a : t.n * Math.floor((a + 1) / 2);
        if (oi.size(l) !== d) throw new Error("zeroPoints input size error.");
      }
    }, _xn = (e, t) => {
      let n = e[0].dims,
        r = n.length,
        a = n[r - 2],
        i = t.k,
        o = t.n,
        s = n.slice(0, r - 2),
        l = oi.size(s),
        d = e[1].dims[2] / 4,
        u = e[0].dataType,
        h = vf(t.k),
        p = vf(d),
        m = vf(o),
        f = s.concat([a, o]),
        y = a > 1 && o / m % 2 === 0 ? 2 : 1,
        b = oi.size(f) / m / y,
        v = 64,
        _ = [],
        w = [l, a, i / h],
        k = oi.convertShape(e[1].dims).slice();
      k.splice(-1, 1, d / p), _.push(...fs(w)), _.push(...fs(k)), _.push(...fs(e[2].dims)), e.length === 4 && _.push(...fs(oi.convertShape(e[3].dims)));
      let A = [l, a, o / m];
      _.push(...fs(A));
      let S = C => {
        let I = w.length,
          E = yi("a", e[0].dataType, I, h),
          M = yi("b", 12, k.length, p),
          T = yi("scales", e[2].dataType, e[2].dims.length),
          P = [E, M, T],
          R = e.length === 4 ? yi("zero_points", 12, e[3].dims.length) : void 0;
        R && P.push(R);
        let j = A.length,
          B = as("output", e[0].dataType, j, m),
          F = Pb(e[0].dataType),
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
    }, kxn = (e, t) => {
      let n = e[0].dims,
        r = n.length,
        a = n[r - 2],
        i = t.k,
        o = t.n,
        s = n.slice(0, r - 2),
        l = oi.size(s),
        d = e[1].dims[2] / 4,
        u = e[0].dataType,
        h = vf(t.k),
        p = vf(d),
        m = s.concat([a, o]),
        f = 128,
        y = o % 8 === 0 ? 8 : o % 4 === 0 ? 4 : 1,
        b = f / y,
        v = b * p * 8,
        _ = v / h,
        w = v / t.blockSize,
        k = oi.size(m) / y,
        A = [],
        S = [l, a, i / h],
        C = oi.convertShape(e[1].dims).slice();
      C.splice(-1, 1, d / p), A.push(...fs(S)), A.push(...fs(C)), A.push(...fs(e[2].dims)), e.length === 4 && A.push(...fs(oi.convertShape(e[3].dims)));
      let I = [l, a, o];
      A.push(...fs(I));
      let E = M => {
        let T = S.length,
          P = yi("a", e[0].dataType, T, h),
          R = yi("b", 12, C.length, p),
          j = yi("scales", e[2].dataType, e[2].dims.length),
          B = [P, R, j],
          F = e.length === 4 ? yi("zero_points", 12, e[3].dims.length) : void 0;
        F && B.push(F);
        let N = I.length,
          G = as("output", e[0].dataType, N),
          z = Pb(e[0].dataType),
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
    }, J_r = (e, t) => {
      xxn(e.inputs, t), t.blockSize === 32 && e.adapterInfo.isVendor("intel") && e.adapterInfo.isArchitecture("gen-12lp") ? e.compute(kxn(e.inputs, t)) : e.compute(_xn(e.inputs, t));
    }, Z_r = e => sh(e);
  }),
  Axn,
  Sxn,
  Ixn,
  Cxn,
  Exn,
  Txn,
  Mxn,
  Pxn,
  ekr,
  b6o = Hi(() => {
    il(), Hl(), lc(), Axn = e => {
      if (!e || e.length < 1) throw new Error("Too few inputs");
      if (e[0].dataType !== 1 && e[0].dataType !== 10) throw new Error("Input type must be float or float16.");
      if (e.length >= 2) {
        let t = e[0].dims.length * 2 === e[1].dims[0];
        if (e.length === 4 && (t = e[3].dims[0] * 2 === e[1].dims[0]), !t) throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].");
      }
    }, Sxn = (e, t, n) => {
      let r = "";
      for (let a = t - 1; a >= 0; --a) r += `
            k = i32(${e.indicesGet("indices", a)}) - ${cs("uniforms.pads", a, n)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${cs("uniforms.x_shape", a, t)})) {
              break;
            }
            offset += k * i32(${cs("uniforms.x_strides", a, t)});
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
    }, Ixn = (e, t, n) => {
      let r = "";
      for (let a = t - 1; a >= 0; --a) r += `
                k = i32(${e.indicesGet("indices", a)}) - ${cs("uniforms.pads", a, n)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${cs("uniforms.x_shape", a, t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${cs("uniforms.x_shape", a, t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${cs("uniforms.x_strides", a, t)});
            `;
      return `
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `;
    }, Cxn = (e, t, n) => {
      let r = "";
      for (let a = t - 1; a >= 0; --a) r += `
                k = i32(${e.indicesGet("indices", a)}) - ${cs("uniforms.pads", a, n)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${cs("uniforms.x_shape", a, t)})) {
                  k = i32(${cs("uniforms.x_shape", a, t)}) - 1;
                }
                offset += k * i32(${cs("uniforms.x_strides", a, t)});
            `;
      return `
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `;
    }, Exn = (e, t, n) => {
      let r = "";
      for (let a = t - 1; a >= 0; --a) r += `
                k = i32(${e.indicesGet("indices", a)}) - ${cs("uniforms.pads", a, n)};
                if (k < 0)  {
                  k += i32(${cs("uniforms.x_shape", a, t)}]);
                }
                if (k >= i32(${cs("uniforms.x_shape", a, t)})) {
                  k -= i32(${cs("uniforms.x_shape", a, t)});
                }
                offset += k * i32(${cs("uniforms.x_strides", a, t)});
            `;
      return `
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `;
    }, Txn = (e, t, n) => {
      switch (n.mode) {
        case 0:
          return Sxn(e, t, n.pads.length);
        case 1:
          return Ixn(e, t, n.pads.length);
        case 2:
          return Cxn(e, t, n.pads.length);
        case 3:
          return Exn(e, t, n.pads.length);
        default:
          throw new Error("Invalid mode");
      }
    }, Mxn = (e, t) => {
      let n = oi.padShape(e[0].dims.slice(), t.pads),
        r = e[0].dims,
        a = oi.size(n),
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
      }), i.push(...fs(e[0].dims, n));
      let s = ["rank"],
        l = d => {
          let u = as("output", e[0].dataType, n.length),
            h = yi("x", e[0].dataType, r.length),
            p = h.type.value,
            m = Txn(u, r.length, t),
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
            x: Math.ceil(oi.size(n) / 64)
          },
          programUniforms: i
        }),
        getShaderSource: l
      };
    }, Pxn = (e, t) => {
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
    }, ekr = (e, t) => {
      Axn(e.inputs);
      let n = Pxn(e.inputs, t);
      e.compute(Mxn(e.inputs, n), {
        inputs: [0]
      });
    };
  }),
  Age,
  fut,
  gut,
  yut,
  but,
  Rxn,
  Nxn,
  vut,
  wut,
  tkr,
  nkr,
  xut,
  rkr,
  akr,
  _ut,
  ikr,
  okr,
  skr,
  lkr,
  v6o = Hi(() => {
    BT(), il(), Hl(), lc(), Age = e => {
      if (dm.webgpu.validateInputContent && (!e || e.length !== 1)) throw new Error("Pool ops requires 1 input.");
    }, fut = (e, t, n) => {
      let r = t.format === "NHWC",
        a = e.dims.slice();
      r && a.splice(1, 0, a.pop());
      let i = Object.hasOwnProperty.call(t, "dilations"),
        o = t.kernelShape.slice(),
        s = t.strides.slice(),
        l = i ? t.dilations.slice() : [],
        d = t.pads.slice();
      hGe.adjustPoolAttributes(n, a, o, s, l, d);
      let u = hGe.computePoolOutputShape(n, a, s, l, o, d, t.autoPad),
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
    }, gut = (e, t) => {
      let n = t.format === "NHWC",
        r = oi.size(e),
        a = oi.size(t.kernelShape),
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
        let s = oi.computeStrides(t.kernelShape);
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
    }, yut = (e, t, n, r, a, i, o, s, l, d, u, h) => {
      let p = a.format === "NHWC",
        m = t.type.value,
        f = as("output", t.type.tensor, r);
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
                  offsets[j] = offset / ${cs("uniforms.kernelStrides", "j", y)};
                  offset -= offsets[j] * ${cs("uniforms.kernelStrides", "j", y)};
                }
                offsets[${y - 1}] = offset;

                isPad = false;
                for (var j = ${n - y}u; j < ${n}u; j++) {
                  xIndices[j] = indices[j] * ${cs("uniforms.strides", `j - ${n - y}u`, y)}
                    + offsets[j - ${n - y}u] - ${cs("uniforms.pads", "j - 2u", b)};
                  ${v}
              }
              ${o}

              output[global_idx] = value;
            }`;
      }
    }, but = e => `${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`, Rxn = e => `${but(e)};${e.countIncludePad}`, Nxn = e => `${but(e)};${e.storageOrder};${e.dilations}`, vut = e => ({
      format: e.format,
      autoPad: ["NOTSET", "VALID", "SAME_UPPER", "SAME_LOWER"][e.auto_pad],
      ceilMode: e.ceil_mode,
      kernelShape: e.kernel_shape,
      strides: e.strides,
      pads: e.pads
    }), wut = (e, t, n, r) => {
      let [a, i] = fut(t, r, n),
        o = yi("x", t.dataType, t.dims.length),
        s = o.type.value,
        l = "value += x_val;",
        d = "";
      a.countIncludePad ? d += `value /= ${s}(uniforms.kernelSize);` : d += `value /= ${s}(i32(uniforms.kernelSize) - pad);`;
      let [u, h, p, m, f] = gut(i, a);
      u.push(...fs(t.dims, i));
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
            x: Math.ceil(oi.size(i) / 64)
          },
          programUniforms: u
        }),
        getShaderSource: b => yut(b, o, t.dims.length, i.length, a, l, d, 0, h, p, m, f)
      };
    }, tkr = e => {
      let t = e.count_include_pad !== 0,
        n = vut(e);
      if (n.ceilMode !== 0) throw new Error("using ceil() in shape computation is not yet supported for AveragePool");
      let r = {
        countIncludePad: t,
        ...n,
        cacheKey: ""
      };
      return {
        ...r,
        cacheKey: Rxn(r)
      };
    }, nkr = (e, t) => {
      Age(e.inputs), e.compute(wut("AveragePool", e.inputs[0], !1, t));
    }, xut = {
      autoPad: "",
      ceilMode: 0,
      countIncludePad: !1,
      kernelShape: [],
      strides: [],
      pads: [],
      storageOrder: 0,
      dilations: []
    }, rkr = e => {
      let t = e.format;
      return {
        format: t,
        ...xut,
        cacheKey: t
      };
    }, akr = (e, t) => {
      Age(e.inputs), e.compute(wut("GlobalAveragePool", e.inputs[0], !0, t));
    }, _ut = (e, t, n, r) => {
      let [a, i] = fut(t, r, n),
        o = `
      value = max(x_val, value);
    `,
        s = "",
        l = yi("x", t.dataType, t.dims.length),
        d = ["rank"],
        [u, h, p, m, f] = gut(i, a);
      return u.push(...fs(t.dims, i)), {
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
            x: Math.ceil(oi.size(i) / 64)
          },
          programUniforms: u
        }),
        getShaderSource: y => yut(y, l, t.dims.length, i.length, a, o, s, t.dataType === 10 ? -65504 : -1e5, h, p, m, f)
      };
    }, ikr = (e, t) => {
      Age(e.inputs), e.compute(_ut("MaxPool", e.inputs[0], !1, t));
    }, okr = e => {
      let t = e.storage_order,
        n = e.dilations,
        r = vut(e);
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
        cacheKey: Nxn(a)
      };
    }, skr = e => {
      let t = e.format;
      return {
        format: t,
        ...xut,
        cacheKey: t
      };
    }, lkr = (e, t) => {
      Age(e.inputs), e.compute(_ut("GlobalMaxPool", e.inputs[0], !0, t));
    };
  }),
  jxn,
  Dxn,
  ckr,
  dkr,
  w6o = Hi(() => {
    il(), Hl(), vg(), lc(), jxn = (e, t) => {
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
    }, Dxn = (e, t) => {
      let n = oi.normalizeAxis(t.axis, e[0].dims.length),
        r = e[0].dataType,
        a = r === 3,
        i = e[0].dims,
        o = e[1].dataType,
        s = oi.size(i),
        l = r === 3 || r === 2,
        d = l ? [Math.ceil(oi.size(e[0].dims) / 4)] : e[0].dims,
        u = e[1].dims,
        h = e.length > 2 ? e[2] : void 0,
        p = h ? l ? [Math.ceil(oi.size(h.dims) / 4)] : h.dims : void 0,
        m = u.length === 0 || u.length === 1 && u[0] === 1,
        f = m === !1 && u.length === 1,
        y = vf(s),
        b = m && (!l || y === 4),
        v = b ? y : 1,
        _ = b && !l ? y : 1,
        w = yi("input", l ? 12 : r, d.length, _),
        k = yi("scale", o, u.length),
        A = h ? yi("zero_point", l ? 12 : r, p.length) : void 0,
        S = as("output", o, i.length, v),
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
        }, ...fs(...I, i)],
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
    }, ckr = (e, t) => {
      jxn(e.inputs, t), e.compute(Dxn(e.inputs, t));
    }, dkr = e => sh({
      axis: e.axis,
      blockSize: e.blockSize
    });
  }),
  Lxn,
  Oxn,
  ukr,
  x6o = Hi(() => {
    BT(), il(), lc(), Lxn = (e, t, n) => {
      let r = e === t,
        a = e < t && n < 0,
        i = e > t && n > 0;
      if (r || a || i) throw new Error("Range these inputs' contents are invalid.");
    }, Oxn = (e, t, n, r) => {
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
        }, ...fs(i)],
        l = d => {
          let u = as("output", r, i.length),
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
    }, ukr = e => {
      let t = 0,
        n = 0,
        r = 0;
      e.inputs[0].dataType === 6 ? (t = e.inputs[0].getInt32Array()[0], n = e.inputs[1].getInt32Array()[0], r = e.inputs[2].getInt32Array()[0]) : e.inputs[0].dataType === 1 && (t = e.inputs[0].getFloat32Array()[0], n = e.inputs[1].getFloat32Array()[0], r = e.inputs[2].getFloat32Array()[0]), dm.webgpu.validateInputContent && Lxn(t, n, r), e.compute(Oxn(t, n, r, e.inputs[0].dataType), {
        inputs: []
      });
    };
  }),
  Bxn,
  Fxn,
  hkr,
  pkr,
  _6o = Hi(() => {
    il(), Hl(), vg(), lc(), Bxn = (e, t, n, r) => {
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
    }, Fxn = (e, t) => {
      let n = e[0].dims,
        r = e[1].dims,
        a = n,
        i = 1,
        o = Math.ceil(oi.size(r) / i),
        s = r[r.length - 1],
        l = oi.sizeFromDimension(n, s),
        d = [{
          type: 12,
          data: o
        }, {
          type: 12,
          data: s
        }, {
          type: 12,
          data: l
        }, ...fs(e[1].dims, e[2].dims, a)],
        u = h => {
          let p = yi("indices", e[1].dataType, e[1].dims.length),
            m = yi("updates", e[2].dataType, e[2].dims.length, i),
            f = t.reduction !== "none" && t.reduction !== "" ? Gxr("output", e[0].dataType, a.length) : as("output", e[0].dataType, a.length, i);
          return `
      ${h.registerUniform("output_size", "u32").registerUniform("last_index_dimension", "u32").registerUniform("num_updates_elements", "u32").declareVariables(p, m, f)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var hasDuplicates = false;
  if (${t.reduction === "none"}) {
    let n = ${oi.size(r)};
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
    ${Bxn(t.reduction, "output[data_offset + i]", "value", f.type.value)}
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
    }, hkr = e => sh({
      reduction: e.reduction
    }), pkr = (e, t) => {
      e.compute(Fxn(e.inputs, t), {
        inputs: [e.inputs[1], e.inputs[2]],
        outputs: []
      });
    };
  }),
  zxn,
  Uxn,
  $xn,
  kut,
  Gxn,
  Vxn,
  Hxn,
  Wxn,
  qxn,
  Kxn,
  Qxn,
  Yxn,
  Aut,
  Xxn,
  Jxn,
  Zxn,
  e2n,
  t2n,
  mkr,
  fkr,
  k6o = Hi(() => {
    il(), Hl(), vg(), lc(), zxn = (e, t) => {
      if (e.every(n => n > 0 || (() => {
        throw new Error("Resize requires scales input values to be positive");
      })), e.length > 0) {
        if (t.mode === "linear") {
          if (!(e.length === 2 || e.length === 3 || e.length === 4 && e[0] === 1 && e[1] === 1 || e.length === 4 && e[0] === 1 && e[3] === 1 || e.length === 5 && e[0] === 1 && e[1] === 1)) throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`);
        } else if (t.mode === "cubic" && !(e.length === 2 || e.length === 4 && e[0] === 1 && e[1] === 1 || e.length === 4 && e[0] === 1 && e[3] === 1)) throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode");
      }
    }, Uxn = (e, t, n) => {
      t.every(a => a >= 0 && a < n || (() => {
        throw new Error("Resize requires axes input values to be positive and less than rank");
      }));
      let r = new Array(n).fill(1);
      return t.forEach((a, i) => r[a] = e[i]), r;
    }, $xn = (e, t, n, r, a, i) => {
      let [o, s, l] = n > 10 ? [1, 2, 3] : [-1, e.length > 1 ? 1 : -1, -1],
        d = e[0].dims.length;
      if (o > 0 && e.length > o && e[o].dims.length > 0) e[o].getFloat32Array().forEach(u => i.push(u));else if (t.coordinateTransformMode === "tf_crop_and_resize") throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");
      if (s > 0 && e.length > s && e[s].dims.length === 1 && e[s].dims[0] > 0) {
        if (e[s].getFloat32Array().forEach(u => r.push(u)), r.length !== 0 && r.length !== d && n >= 18 && r.length !== t.axes.length) throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");
        zxn(r, t), t.axes.length > 0 && Uxn(r, t.axes, d).forEach((u, h) => r[h] = u);
      }
      if (l > 0 && e.length > l && e[l].dims.length === 1 && e[l].dims[0] > 0 && (e[l].getBigInt64Array().forEach(u => a.push(Number(u))), a.length !== 0 && a.length !== d && n >= 18 && a.length !== t.axes.length)) throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");
      if (t.axes.length > 0) {
        if (r.length !== 0 && r.length !== t.axes.length) throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');
        if (a.length !== 0 && a.length !== t.axes.length) throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified');
      }
      if (typeof r < "u" && typeof a < "u" && r.length > 0 && a.length > d) throw new Error("Resize requires only of scales or sizes to be specified");
    }, kut = (e, t, n, r) => `
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${r}(big / (${n}));
  let fract = ${r}(big % (${n})) / ${r}(${n});
  return whole + fract;
`, Gxn = (e, t) => `fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { ` + (() => {
      switch (e) {
        case "asymmetric":
          return `
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${kut("xResized", "lengthOriginal", "lengthResized", t)}
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
                    ${kut("xResized", "lengthOriginal - 1", "lengthResized - 1", t)}
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
    })() + "}", Vxn = (e, t, n) => `fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {` + (() => {
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
    })() + "}", Hxn = (e, t, n) => {
      let r = new Array(n).fill(0).concat(new Array(n).fill(1)),
        a = e.length === 0 ? r : e.slice();
      return t.length > 0 ? (t.forEach((i, o) => {
        r[i] = a[o], r[o + n] = a[t.length + o];
      }), r) : a;
    }, Wxn = (e, t, n, r) => {
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
    }, qxn = (e, t, n) => {
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
    }, Kxn = (e, t, n, r, a) => `
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${n.length}> {
      var original_indices: array<${e.type.value}, ${n.length}>;
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${e.indicesGet("output_indices", "i")};
        var scale = ${cs("uniforms.scales", "i", r)};
        var roi_low = ${cs("uniforms.roi", "i", a)};
        var roi_hi = ${cs("uniforms.roi", `i + ${t.length}`, a)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${cs("uniforms.input_shape", "i", t.length)};
          var output_shape_i = ${cs("uniforms.output_shape", "i", n.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`, Qxn = (e, t, n, r, a, i, o) => `
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${t.indicesGet("output_indices", "i")};
        var input_index: u32;
        var scale = ${cs("uniforms.scales", "i", a)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${cs("uniforms.roi", "i", i)};
          var roi_hi = ${cs("uniforms.roi", `i + ${n.length}`, i)};
          var input_shape_i = ${cs("uniforms.input_shape", "i", n.length)};
          var output_shape_i = ${cs("uniforms.output_shape", "i", r.length)};
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
    }`, Yxn = (e, t) => `
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices", "i")};
        if (input_index < 0 || input_index >= ${cs("uniforms.input_shape", "i", t.length)}) {
          return false;
        }
      }
      return true;
    }`, Aut = (e, t, n, r) => e.rank > r ? `
    ${e.indicesSet("input_indices", t, "channel")};
    ${e.indicesSet("input_indices", n, "batch")};
` : "", Xxn = (e, t, n, r, a) => {
      let [i, o, s, l] = n.length === 2 ? [-1, 0, 1, -1] : [0, 2, 3, 1],
        d = e.type.value;
      return `
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices", o, `max(0, min(row, ${n[o]} - 1))`)};
      ${e.indicesSet("input_indices", s, `max(0, min(col, ${n[s]} - 1))`)};
      ${Aut(e, l, i, 2)}
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
    }, Jxn = (e, t, n, r, a, i, o, s, l, d) => {
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
    }, Zxn = (e, t, n, r, a) => {
      let [i, o, s, l, d] = n.length === 3 ? [-1, 0, 1, 2, -1] : [0, 2, 3, 4, 1],
        u = e.type.value;
      return `
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${u} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices", o, `max(0, min(depth, ${n[o]} - 1))`)};
      ${e.indicesSet("input_indices", s, `max(0, min(height, ${n[s]} - 1))`)};
      ${e.indicesSet("input_indices", l, `max(0, min(width, ${n[l]} - 1))`)};
      ${Aut(e, d, i, 3)}
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
    }, e2n = (e, t, n, r, a, i) => {
      let o = e.dims,
        s = Hxn(i, t.axes, o.length),
        l = Wxn(o, r, a, t.axes),
        d = r.slice();
      r.length === 0 && (d = o.map((_, w) => _ === 0 ? 1 : l[w] / _), t.keepAspectRatioPolicy !== "stretch" && (l = qxn(o, d, t)));
      let u = as("output", e.dataType, l.length),
        h = yi("input", e.dataType, o.length),
        p = oi.size(l),
        m = o.length === l.length && o.every((_, w) => _ === l[w]),
        f = t.coordinateTransformMode === "tf_crop_and_resize",
        y = t.extrapolationValue,
        b = h.type.value,
        v = _ => `
      ${m ? "" : `
      ${Gxn(t.coordinateTransformMode, b)};
      ${(() => {
          switch (t.mode) {
            case "nearest":
              return `
              ${Yxn(h, o)};
              ${Vxn(t.nearestMode, n, b)};
              ${Qxn(h, u, o, l, d.length, s.length, f)};
              `;
            case "linear":
              return `
              ${Kxn(u, o, l, d.length, s.length)};
              ${(() => {
                if (o.length === 2 || o.length === 4) return `${Xxn(h, u, o, f, y)}`;
                if (o.length === 3 || o.length === 5) return `${Zxn(h, u, o, f, y)}`;
                throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.");
              })()};
            `;
            case "cubic":
              return `
            ${(() => {
                if (o.length === 2 || o.length === 4) return `${Jxn(h, u, o, l, d, s, t.cubicCoeffA, f, t.extrapolationValue, t.excludeOutside)}`;
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
          }, ...fs(o, l)]
        })
      };
    }, t2n = e => {
      let t = e.customDataBuffer;
      return new Uint32Array(t, t.byteOffset, 1)[0];
    }, mkr = (e, t) => {
      let n = [],
        r = [],
        a = [],
        i = t2n(e);
      if (t.antialias !== 0) throw Error("Only default value (0) for Antialias attribute is supported");
      $xn(e.inputs, t, i, n, r, a), e.compute(e2n(e.inputs[0], t, i, n, r, a), {
        inputs: [0]
      });
    }, fkr = e => {
      let t = e.antialias,
        n = e.axes,
        r = e.coordinateTransformMode,
        a = e.cubicCoeffA,
        i = e.excludeOutside !== 0,
        o = e.extrapolationValue,
        s = e.keepAspectRatioPolicy,
        l = e.mode,
        d = e.nearestMode === "" ? "simple" : e.nearestMode;
      return sh({
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
  n2n,
  r2n,
  gkr,
  A6o = Hi(() => {
    il(), Hl(), vg(), lc(), n2n = (e, t) => {
      let [n, r, a, i] = e,
        {
          numHeads: o,
          rotaryEmbeddingDim: s
        } = t;
      if (n.dims.length !== 3 && n.dims.length !== 4) throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);
      if (!oi.areEqual(r.dims, []) && !oi.areEqual(r.dims, [1]) && r.dims.length !== 2) throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${r.dims.length}`);
      if (a.dims.length !== 2) throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${a.dims.length}`);
      if (i.dims.length !== 2) throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);
      if (!oi.areEqual(a.dims, i.dims)) throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");
      if (s > 0 && o === 0) throw new Error("num_heads must be provided if rotary_embedding_dim is specified");
      let l = n.dims[0],
        d = n.dims[n.dims.length - 2],
        u = a.dims[0],
        h = oi.sizeFromDimension(n.dims, 1) / d,
        p = s === 0 ? a.dims[1] * 2 : h / o;
      if (s > p) throw new Error("rotary_embedding_dim must be less than or equal to head_size");
      if (r.dims.length === 2) {
        if (l !== r.dims[0]) throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${r.dims[0]}`);
        if (d !== r.dims[1]) throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${r.dims[1]}`);
      }
      if (p / 2 !== a.dims[1] && s / 2 !== a.dims[1]) throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${a.dims[1]}`);
      if (d > u) throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");
    }, r2n = (e, t) => {
      let {
          interleaved: n,
          numHeads: r,
          rotaryEmbeddingDim: a,
          scale: i
        } = t,
        o = e[0].dims[0],
        s = oi.sizeFromDimension(e[0].dims, 1),
        l = e[0].dims[e[0].dims.length - 2],
        d = s / l,
        u = e[2].dims[1],
        h = a === 0 ? u * 2 : d / r,
        p = new Array(o, l, d / h, h - u),
        m = oi.computeStrides(p),
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
        }) : []), ...fs(e[0].dims, e[1].dims, e[2].dims, e[3].dims, e[0].dims)],
        y = b => {
          let v = yi("input", e[0].dataType, e[0].dims.length),
            _ = yi("position_ids", e[1].dataType, e[1].dims.length),
            w = yi("cos_cache", e[2].dataType, e[2].dims.length),
            k = yi("sin_cache", e[3].dataType, e[3].dims.length),
            A = as("output", e[0].dataType, e[0].dims.length);
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

        ${b.mainStart(mue)}
          let half_rotary_emb_dim = uniforms.${w.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${_.broadcastedIndicesToOffset("bsnh.xy", as("", _.type.tensor, 2))};
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
          hint: sh({
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
            x: Math.ceil(oi.size(p) / mue)
          },
          programUniforms: f
        })
      };
    }, gkr = (e, t) => {
      n2n(e.inputs, t), e.compute(r2n(e.inputs, t));
    };
  }),
  a2n,
  i2n,
  ykr,
  S6o = Hi(() => {
    il(), Hl(), lc(), a2n = e => {
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
    }, i2n = (e, t, n, r) => {
      let a = t.simplified,
        i = e[0].dims,
        o = oi.size(i),
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
        v = vf(d),
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
            C = [yi("x", e[0].dataType, e[0].dims, v), yi("skip", e[1].dataType, e[1].dims, v), yi("gamma", e[2].dataType, e[2].dims, v)];
          h && C.push(yi("beta", e[3].dataType, e[3].dims, v)), p && C.push(yi("bias", e[4].dataType, e[4].dims, v)), C.push(as("output", e[0].dataType, s, v)), m && C.push(as("mean_output", 1, u)), f && C.push(as("inv_std_output", 1, u)), y && C.push(as("input_skip_bias_sum", e[0].dataType, s, v));
          let I = Pb(e[0].dataType),
            E = Pb(1, v);
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
          let f32_value = ${cae(I, v, "value")};
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
        let mean = ${C$("sum", v)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${C$("square_sum", v)} / f32(uniforms.hidden_size) ${a ? "" : "- mean * mean"} + uniforms.epsilon);
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
    }, ykr = (e, t) => {
      a2n(e.inputs);
      let n = [0];
      e.outputCount > 1 && n.push(-3), e.outputCount > 2 && n.push(-3), e.outputCount > 3 && n.push(3), e.compute(i2n(e.inputs, t, e.outputCount, !1), {
        outputs: n
      });
    };
  }),
  o2n,
  Sge,
  s2n,
  Sut,
  l2n,
  c2n,
  bkr,
  vkr,
  I6o = Hi(() => {
    il(), Hl(), vg(), lc(), o2n = (e, t) => {
      if (!e || e.length < 1) throw new Error("too few inputs");
      if (t.axes.length !== 0) {
        if (t.axes.length !== t.starts.length || t.axes.length !== t.ends.length) throw new Error("axes, starts and ends must have the same length");
      } else if (t.starts.length !== t.ends.length) throw new Error("starts and ends must have the same length");
      e.slice(1).forEach((n, r) => {
        if (e[r + 1].dataType !== 6 && e[r + 1].dataType !== 7) throw new Error(`Input ${r} must be an array of int32 or int64`);
      });
    }, Sge = (e, t) => {
      let n = [];
      if (e.length > t) if (e[t].dataType === 7) e[t].getBigInt64Array().forEach(r => n.push(Number(r)));else if (e[t].dataType === 6) e[t].getInt32Array().forEach(r => n.push(Number(r)));else throw new Error(`Input ${t} must be an array of int32 or int64`);
      return n;
    }, s2n = (e, t) => {
      if (e.length > 1) {
        let n = Sge(e, 1),
          r = Sge(e, 2),
          a = Sge(e, 3);
        return a.length === 0 && (a = [...Array(e[0].dims.length).keys()]), sh({
          starts: n,
          ends: r,
          axes: a
        });
      } else return t;
    }, Sut = (e, t, n, r, a) => {
      let i = e;
      return e < 0 && (i += n[r[t]]), a[t] < 0 ? Math.max(0, Math.min(i, n[r[t]] - 1)) : Math.max(0, Math.min(i, n[r[t]]));
    }, l2n = (e, t, n) => `fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${n.length}; i >= 0; i--) {
            let input_shape_i = ${cs("uniforms.input_shape", "i", n.length)};
            let steps_i = ${cs("uniforms.steps", "i", n.length)};
            let signs_i = ${cs("uniforms.signs", "i", n.length)};
            let starts_i = ${cs("uniforms.starts", "i", n.length)};
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
      }`, c2n = (e, t) => {
      let n = e[0].dims,
        r = oi.size(n),
        a = t.axes.length > 0 ? oi.normalizeAxes(t.axes, n.length) : [...Array(n.length).keys()],
        i = Sge(e, 4);
      i.forEach(v => v !== 0 || (() => {
        throw new Error("step cannot be 0");
      })), i.length === 0 && (i = Array(a.length).fill(1));
      let o = t.starts.map((v, _) => Sut(v, _, n, a, i)),
        s = t.ends.map((v, _) => Sut(v, _, n, a, i));
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
        h = as("output", e[0].dataType, d.length),
        p = yi("input", e[0].dataType, e[0].dims.length),
        m = oi.size(d),
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
        }, ...fs(e[0].dims, d)],
        b = v => `
      ${v.registerUniforms(f).declareVariables(p, h)}
        ${l2n(p, h, n)}
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
    }, bkr = (e, t) => {
      o2n(e.inputs, t);
      let n = s2n(e.inputs, t);
      e.compute(c2n(e.inputs, n), {
        inputs: [0]
      });
    }, vkr = e => {
      let t = e.starts,
        n = e.ends,
        r = e.axes;
      return sh({
        starts: t,
        ends: n,
        axes: r
      });
    };
  }),
  d2n,
  u2n,
  wkr,
  xkr,
  C6o = Hi(() => {
    il(), Hl(), vg(), vG(), lc(), d2n = e => {
      if (!e || e.length !== 1) throw new Error("Softmax op requires 1 input.");
    }, u2n = (e, t) => {
      let n = e.inputs[0],
        r = n.dims,
        a = oi.size(r),
        i = r.length,
        o = oi.normalizeAxis(t.axis, i),
        s = o < r.length - 1,
        l,
        d = [];
      s ? (d = Array.from({
        length: i
      }, (C, I) => I), d[o] = i - 1, d[i - 1] = o, l = e.compute(e3(n, d), {
        inputs: [n],
        outputs: [-1]
      })[0]) : l = n;
      let u = l.dims,
        h = u[i - 1],
        p = a / h,
        m = vf(h),
        f = h / m,
        y = 64;
      p === 1 && (y = 256);
      let b = (C, I) => I === 4 ? `max(max(${C}.x, ${C}.y), max(${C}.z, ${C}.w))` : I === 2 ? `max(${C}.x, ${C}.y)` : I === 3 ? `max(max(${C}.x, ${C}.y), ${C}.z)` : C,
        v = yi("x", l.dataType, l.dims, m),
        _ = as("result", l.dataType, l.dims, m),
        w = v.type.value,
        k = Pb(l.dataType) === "f32" ? `var threadMax = ${w}(-3.402823e+38f);` : `var threadMax = ${w}(-65504.0h);`,
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
          rowSumShared = ${w}(${C$("threadShared[0]", m)});
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
      s && e.compute(e3(S, d), {
        inputs: [S]
      });
    }, wkr = (e, t) => {
      d2n(e.inputs), u2n(e, t);
    }, xkr = e => sh({
      axis: e.axis
    });
  }),
  Iut,
  h2n,
  p2n,
  m2n,
  _kr,
  E6o = Hi(() => {
    il(), Hl(), lc(), Iut = e => Array.from(e.getBigInt64Array(), Number), h2n = e => {
      if (!e || e.length !== 2) throw new Error("Tile requires 2 inputs.");
      if (e[0].dataType !== 1 && e[0].dataType !== 10 && e[0].dataType !== 6 && e[0].dataType !== 12) throw new Error("Tile only support float, float16, int32, and uint32 data types");
      if (e[1].dataType !== 7) throw new Error("Tile `repeats` input should be of int64 data type");
      if (e[1].dims.length !== 1) throw new Error("Tile `repeats` input should be 1-D");
      if (Iut(e[1]).length !== e[0].dims.length) throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor");
    }, p2n = (e, t) => {
      let n = [];
      for (let r = 0; r < e.length; ++r) n.push(e[r] * t[r]);
      return n;
    }, m2n = (e, t) => {
      let n = e[0].dims,
        r = t ?? Iut(e[1]),
        a = p2n(n, r),
        i = oi.size(a),
        o = e[0].dataType,
        s = yi("input", o, n.length),
        l = as("output", o, a.length),
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
          }, ...fs(e[0].dims, a)]
        }),
        getShaderSource: d
      };
    }, _kr = e => {
      h2n(e.inputs), e.compute(m2n(e.inputs), {
        inputs: [0]
      });
    };
  }),
  f2n,
  g2n,
  kkr,
  T6o = Hi(() => {
    il(), Hl(), lc(), f2n = (e, t, n, r, a) => {
      let i = as("output_data", a, n.length, 4),
        o = yi("a_data", t[1].dataType, t[1].dims.length, 4),
        s = yi("b_data", t[2].dataType, t[2].dims.length, 4),
        l = yi("c_data", t[0].dataType, t[0].dims.length, 4),
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
    }, g2n = e => {
      let t = e[1].dims,
        n = e[2].dims,
        r = e[0].dims,
        a = e[1].dataType,
        i = !(oi.areEqual(t, n) && oi.areEqual(n, r)),
        o = t,
        s = oi.size(t);
      if (i) {
        let d = pue.calcShape(pue.calcShape(t, n, !1), r, !1);
        if (!d) throw new Error("Can't perform where op on the given tensors");
        o = d, s = oi.size(o);
      }
      let l = Math.ceil(s / 4);
      return {
        name: "Where",
        shaderCache: {
          inputDependencies: ["rank", "rank", "rank"]
        },
        getShaderSource: d => f2n(d, e, o, i, a),
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
          }, ...fs(r, t, n, o)]
        })
      };
    }, kkr = e => {
      e.compute(g2n(e.inputs));
    };
  }),
  Akr,
  M6o = Hi(() => {
    G8o(), fGt(), V8o(), H8o(), W8o(), q8o(), K8o(), Z8o(), t6o(), n6o(), r6o(), a6o(), i6o(), o6o(), s6o(), l6o(), c6o(), d6o(), u6o(), h6o(), p6o(), m6o(), f6o(), g6o(), y6o(), V_r(), b6o(), v6o(), w6o(), x6o(), _6o(), mGt(), k6o(), A6o(), S6o(), I6o(), C6o(), q_r(), E6o(), vG(), gGt(), T6o(), Akr = new Map([["Abs", [b2r]], ["Acos", [v2r]], ["Acosh", [w2r]], ["Add", [e_r]], ["ArgMax", [m2r, Q3t]], ["ArgMin", [p2r, Q3t]], ["Asin", [x2r]], ["Asinh", [_2r]], ["Atan", [k2r]], ["Atanh", [A2r]], ["Attention", [f2r]], ["AveragePool", [nkr, tkr]], ["BatchNormalization", [g2r]], ["BiasAdd", [y2r]], ["BiasSplitGelu", [Z2r]], ["Cast", [I2r, S2r]], ["Ceil", [E2r]], ["Clip", [C2r]], ["Concat", [d_r, u_r]], ["Conv", [t4t, e4t]], ["ConvTranspose", [x_r, w_r]], ["Cos", [T2r]], ["Cosh", [M2r]], ["CumSum", [__r, k_r]], ["DepthToSpace", [A_r, S_r]], ["DequantizeLinear", [ckr, dkr]], ["Div", [t_r]], ["Einsum", [I_r, C_r]], ["Elu", [P2r, ibe]], ["Equal", [n_r]], ["Erf", [R2r]], ["Exp", [N2r]], ["Expand", [E_r]], ["FastGelu", [T_r]], ["Floor", [j2r]], ["FusedConv", [t4t, e4t]], ["Gather", [P_r, M_r]], ["GatherElements", [O_r, L_r]], ["GatherBlockQuantized", [j_r, D_r]], ["GatherND", [R_r, N_r]], ["Gelu", [D2r]], ["Gemm", [F_r, B_r]], ["GlobalAveragePool", [akr, rkr]], ["GlobalMaxPool", [lkr, skr]], ["Greater", [o_r]], ["GreaterOrEqual", [l_r]], ["GridSample", [z_r, U_r]], ["GroupQueryAttention", [K_r]], ["HardSigmoid", [G2r, $2r]], ["InstanceNormalization", [Q_r]], ["LayerNormalization", [Y_r]], ["LeakyRelu", [L2r, ibe]], ["Less", [s_r]], ["LessOrEqual", [c_r]], ["Log", [X2r]], ["MatMul", [X_r]], ["MatMulNBits", [J_r, Z_r]], ["MaxPool", [ikr, okr]], ["Mul", [r_r]], ["MultiHeadAttention", [G_r, $_r]], ["Neg", [B2r]], ["Not", [O2r]], ["Pad", [ekr]], ["Pow", [a_r]], ["QuickGelu", [J2r, ibe]], ["Range", [ukr]], ["Reciprocal", [F2r]], ["ReduceMin", [l2r]], ["ReduceMean", [r2r]], ["ReduceMax", [s2r]], ["ReduceSum", [d2r]], ["ReduceProd", [c2r]], ["ReduceL1", [a2r]], ["ReduceL2", [i2r]], ["ReduceLogSum", [h2r]], ["ReduceLogSumExp", [o2r]], ["ReduceSumSquare", [u2r]], ["Relu", [z2r]], ["Resize", [mkr, fkr]], ["RotaryEmbedding", [gkr]], ["ScatterND", [pkr, hkr]], ["Sigmoid", [U2r]], ["Sin", [V2r]], ["Sinh", [H2r]], ["Slice", [bkr, vkr]], ["SkipLayerNormalization", [ykr]], ["Split", [H_r, W_r]], ["Sqrt", [W2r]], ["Softmax", [wkr, xkr]], ["Sub", [i_r]], ["Tan", [q2r]], ["Tanh", [K2r]], ["ThresholdedRelu", [Y2r, ibe]], ["Tile", [_kr]], ["Transpose", [Hxr, Wxr]], ["Where", [kkr]]]);
  }),
  Skr,
  P6o = Hi(() => {
    BT(), KD(), lc(), Skr = class {
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
        yT(e.programInfo.name);
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
        o.setPipeline(e.computePipeline), o.setBindGroup(0, l), o.dispatchWorkgroups(...r), this.backend.writeTimestamp(this.backend.pendingDispatchNumber * 2 + 1), this.backend.pendingDispatchNumber++, (this.backend.pendingDispatchNumber >= this.backend.maxDispatchNumber || this.backend.queryType === "at-passes") && this.backend.endComputePass(), this.backend.pendingDispatchNumber >= this.backend.maxDispatchNumber && this.backend.flush(), Y5(e.programInfo.name);
      }
      dispose() {}
      build(e, t) {
        yT(e.name);
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
        let a = Vxr(t, this.backend.device.limits),
          i = e.getShaderSource(a),
          o = `${r.join(`
`)}
${a.additionalImplementations}
${i}`,
          s = n.createShaderModule({
            code: o,
            label: e.name
          });
        Pd("verbose", () => `[WebGPU] ${e.name} shader code: ${o}`);
        let l = n.createComputePipeline({
          compute: {
            module: s,
            entryPoint: "main"
          },
          layout: "auto",
          label: e.name
        });
        return Y5(e.name), {
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
  y2n,
  b2n,
  v2n,
  w2n,
  Ikr,
  R6o = Hi(() => {
    BT(), il(), KD(), Bxr(), U8o(), M6o(), P6o(), y2n = (e, t) => {
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
    }, b2n = (e, t, n) => {
      var a, i;
      let r = e.name;
      return (a = e.shaderCache) != null && a.hint && (r += "[" + e.shaderCache.hint + "]"), r += ":" + n + `:${y2n(t, ((i = e.shaderCache) == null ? void 0 : i.inputDependencies) ?? new Array(t.length).fill("dims"))}`, r;
    }, v2n = class {
      constructor(e) {
        e && (this.architecture = e.architecture, this.vendor = e.vendor);
      }
      isArchitecture(e) {
        return this.architecture === e;
      }
      isVendor(e) {
        return this.vendor === e;
      }
    }, w2n = class {
      constructor(e) {
        this.subgroupsSupported = e.features.has("subgroups"), this.subgroupsF16Supported = e.features.has("subgroups");
        let t = e.limits;
        !this.subgroupsSupported || !t.minSubgroupSize || !t.maxSubgroupSize ? this.subgroupSizeRange = void 0 : this.subgroupSizeRange = [t.minSubgroupSize, t.maxSubgroupSize];
      }
    }, Ikr = class {
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
        a("chromium-experimental-timestamp-query-inside-passes") || a("timestamp-query"), a("shader-f16"), a("subgroups") && a("subgroups-f16"), this.device = await t.requestDevice(r), this.deviceInfo = new w2n(this.device), this.adapterInfo = new v2n(t.info || (await t.requestAdapterInfo())), this.gpuDataManager = Fxr(this), this.programManager = new Skr(this), this.kernels = new Map(), this.kernelPersistentData = new Map(), this.kernelCustomData = new Map(), dGt(e.logLevel, !!e.debug), this.device.onuncapturederror = i => {
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
        yT(), this.endComputePass();
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
                dataType: TH(v.dataType)
              })),
              outputsMetadata: p.map(v => ({
                dims: v.dims,
                dataType: TH(v.dataType)
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
                v += `input[${k}]: [${w.dims}] | ${TH(w.dataType)}, `;
              });
              let _ = "";
              p.forEach((w, k) => {
                _ += `output[${k}]: [${w.dims}] | ${TH(w.dataType)}, `;
              }), console.log(`[profiling] kernel "${o}|${l}|${d}|${u}" ${v}${_}execution time: ${b - y} ns`);
            }
            jAe("GPU", `${u}::${m}::${f}`);
          }
          e.unmap(), this.pendingQueries.delete(e);
        }), Y5();
      }
      run(e, t, n, r, a, i) {
        yT(e.name);
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
          if (p.length === 0) return Y5(e.name), h;
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
            if (C.type === 6) new Int32Array(A, E, M.length).set(M);else if (C.type === 12) new Uint32Array(A, E, M.length).set(M);else if (C.type === 10) new Uint16Array(A, E, M.length).set(M);else if (C.type === 1) new Float32Array(A, E, M.length).set(M);else throw new Error(`Unsupported uniform type: ${TH(C.type)}`);
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
          b = b2n(e, t, y),
          v = this.programManager.getArtifact(b);
        if (v || (v = this.programManager.build(e, f), this.programManager.setArtifact(b, v), Pd("info", () => `[artifact] key: ${b}, programName: ${e.name}`)), d && v.uniformVariablesInfo) {
          if (d.length !== v.uniformVariablesInfo.length) throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${d.length} in program "${v.programInfo.name}".`);
          for (let _ = 0; _ < d.length; _++) {
            let w = d[_],
              k = w.type,
              A = typeof w.data == "number" ? 1 : w.data.length,
              [S, C] = v.uniformVariablesInfo[_];
            if (k !== S || A !== C) throw new Error(`Uniform variable ${_} mismatch: expect type ${S} with size ${C}, got type ${k} with size ${A} in program "${v.programInfo.name}".`);
          }
        }
        if (Pd("info", () => `[ProgramManager] run "${e.name}" (key=${b}) with ${f[0]}x${f[1]}x${f[2]}`), this.queryType !== "none" || this.sessionStatus === "capturing") {
          let _ = {
            kernelId: this.currentKernelId,
            programName: v.programInfo.name,
            inputTensorViews: t,
            outputTensorViews: h
          };
          this.pendingKernels.push(_), this.sessionStatus === "capturing" && this.capturedPendingKernels.get(this.currentSessionId).push(_);
        }
        return this.programManager.run(v, o, p, f, m), Y5(e.name), h;
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
        let a = Akr.get(e);
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
        this.currentKernelId = e, s[0] && (s[1] = s[0](s[1]), s[0] = void 0), Pd("info", () => `[WebGPU] Start to run kernel "[${a}] ${i}"...`);
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
          let r = await W3t(this, e, t);
          return uGt(r.buffer, n);
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
        Pd("info", "captureBegin"), this.capturedCommandList.get(this.currentSessionId) || this.capturedCommandList.set(this.currentSessionId, []), this.capturedPendingKernels.get(this.currentSessionId) || this.capturedPendingKernels.set(this.currentSessionId, []), this.flush(), this.sessionStatus = "capturing";
      }
      captureEnd() {
        Pd("info", "captureEnd"), this.flush(), this.sessionStatus = "default";
      }
      replay() {
        Pd("info", "replay"), this.sessionStatus = "replaying";
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
  x2n,
  Cut,
  _2n,
  Eut,
  Tut,
  Mut,
  k2n,
  Ckr,
  N6o = Hi(() => {
    KD(), x2n = 1, Cut = () => x2n++, _2n = new Map([["float32", 32], ["float16", 16], ["int32", 32], ["uint32", 32], ["int64", 64], ["uint64", 64], ["int8", 8], ["uint8", 8], ["int4", 4], ["uint4", 4]]), Eut = (e, t) => {
      let n = _2n.get(e);
      if (!n) throw new Error("Unsupported data type.");
      return t.length > 0 ? Math.ceil(t.reduce((r, a) => r * a) * n / 8) : 0;
    }, Tut = class {
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
        return Eut(this.dataType, this.tensorShape);
      }
      destroy() {
        Pd("verbose", () => "[WebNN] TensorWrapper.destroy"), this.mlTensor.destroy();
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
    }, Mut = class {
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
            if (this.wrapper.byteLength !== Eut(t, n)) throw new Error("Unable to copy data to tensor with different size.");
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
        } else Pd("verbose", () => "Data size does not match tensor size. Releasing tensor."), this.releaseTensor();
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
    }, k2n = class {
      constructor(e) {
        this.backend = e, this.tensorTrackersById = new Map(), this.freeTensors = [], this.externalTensors = new Set();
      }
      getMLContext(e) {
        let t = this.backend.getMLContext(e);
        if (!t) throw new Error("MLContext not found for session.");
        return t;
      }
      reserveTensorId() {
        let e = Cut();
        return this.tensorTrackersById.set(e, new Mut(this)), e;
      }
      releaseTensorId(e) {
        let t = this.tensorTrackersById.get(e);
        t && (this.tensorTrackersById.delete(e), t.tensorWrapper && this.releaseTensor(t.tensorWrapper));
      }
      async ensureTensor(e, t, n, r, a) {
        Pd("verbose", () => `[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${n}, shape: ${r}, copyOld: ${a}}`);
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
        Pd("verbose", () => `[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t == null ? void 0 : t.byteLength}}`);
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
          i = Cut(),
          o = new Tut({
            sessionId: e,
            context: a,
            tensor: t,
            dataType: n,
            shape: r
          });
        return this.tensorTrackersById.set(i, new Mut(this, o)), this.externalTensors.add(o), i;
      }
      async getCachedTensor(e, t, n, r, a, i) {
        let o = this.getMLContext(e);
        for (let [l, d] of this.freeTensors.entries()) if (d.canReuseTensor(o, t, n)) {
          Pd("verbose", () => `[WebNN] Reusing tensor {dataType: ${t}, shape: ${n}}`);
          let u = this.freeTensors.splice(l, 1)[0];
          return u.sessionId = e, u;
        }
        Pd("verbose", () => `[WebNN] MLContext.createTensor {dataType: ${t}, shape: ${n}}`);
        let s = await o.createTensor({
          dataType: t,
          shape: n,
          dimensions: n,
          usage: r,
          writable: a,
          readable: i
        });
        return new Tut({
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
    }, Ckr = (...e) => new k2n(...e);
  }),
  l9e,
  A2n,
  Ekr,
  j6o = Hi(() => {
    il(), ree(), Bxr(), N6o(), KD(), l9e = new Map([[1, "float32"], [10, "float16"], [6, "int32"], [12, "uint32"], [7, "int64"], [13, "uint64"], [22, "int4"], [21, "uint4"], [3, "int8"], [2, "uint8"], [9, "uint8"]]), A2n = (e, t) => {
      if (e === t) return !0;
      if (e === void 0 || t === void 0) return !1;
      let n = Object.keys(e).sort(),
        r = Object.keys(t).sort();
      return n.length === r.length && n.every((a, i) => a === r[i] && e[a] === t[a]);
    }, Ekr = class {
      constructor(e) {
        this.tensorManager = Ckr(this), this.mlContextBySessionId = new Map(), this.sessionIdsByMLContext = new Map(), this.mlContextCache = [], this.sessionGraphInputs = new Map(), this.temporaryGraphInputs = [], this.temporarySessionTensorIds = new Map(), dGt(e.logLevel, !!e.debug);
      }
      get currentSessionId() {
        if (this.activeSessionId === void 0) throw new Error("No active session");
        return this.activeSessionId;
      }
      onRunStart(e) {
        Pd("verbose", () => `[WebNN] onRunStart {sessionId: ${e}}`), this.activeSessionId = e;
      }
      onRunEnd(e) {
        Pd("verbose", () => `[WebNN] onRunEnd {sessionId: ${e}}`);
        let t = this.temporarySessionTensorIds.get(e);
        if (t) {
          for (let n of t) Pd("verbose", () => `[WebNN] releasing temporary tensor {tensorId: ${n}}`), this.tensorManager.releaseTensorId(n);
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
        let t = this.mlContextCache.findIndex(n => A2n(n.options, e));
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
        Pd("verbose", () => `[WebNN] releaseTensorId {tensorId: ${e}}`), this.tensorManager.releaseTensorId(e);
      }
      async ensureTensor(e, t, n, r, a) {
        let i = l9e.get(n);
        if (!i) throw new Error(`Unsupported ONNX data type: ${n}`);
        return this.tensorManager.ensureTensor(e ?? this.currentSessionId, t, i, r, a);
      }
      async createTemporaryTensor(e, t, n) {
        Pd("verbose", () => `[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${n}}`);
        let r = l9e.get(t);
        if (!r) throw new Error(`Unsupported ONNX data type: ${t}`);
        let a = this.tensorManager.reserveTensorId();
        await this.tensorManager.ensureTensor(e, a, r, n, !1);
        let i = this.temporarySessionTensorIds.get(e);
        return i ? i.push(a) : this.temporarySessionTensorIds.set(e, [a]), a;
      }
      uploadTensor(e, t) {
        if (!lb().shouldTransferToMLTensor) throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");
        Pd("verbose", () => `[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`), this.tensorManager.upload(e, t);
      }
      async downloadTensor(e, t) {
        return this.tensorManager.download(e, t);
      }
      createMLTensorDownloader(e, t) {
        return async () => {
          let n = await this.tensorManager.download(e);
          return uGt(n, t);
        };
      }
      registerMLTensor(e, t, n, r) {
        let a = l9e.get(n);
        if (!a) throw new Error(`Unsupported ONNX data type: ${n}`);
        let i = this.tensorManager.registerTensor(e, t, a, r);
        return Pd("verbose", () => `[WebNN] registerMLTensor {tensor: ${t}, dataType: ${a}, dimensions: ${r}} -> {tensorId: ${i}}`), i;
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
        return Pd("verbose", () => `[WebNN] registerMLConstant {dataType: ${a.dataType}, shape: ${a.shape}}}`), r.constant(a, d);
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
  Tkr = {};

SEe(Tkr, {
  init: () => Mkr
});

var c9e,
  S2n,
  Mkr,
  D6o = Hi(() => {
    il(), R6o(), KD(), Hl(), j6o(), c9e = class Pkr {
      constructor(t, n, r, a) {
        this.module = t, this.dataType = n, this.data = r, this.dims = a;
      }
      getFloat32Array() {
        if (this.dataType !== 1) throw new Error("Invalid data type");
        let t = oi.size(this.dims);
        return t === 0 ? new Float32Array() : new Float32Array(this.module.HEAP8.buffer, this.data, t);
      }
      getBigInt64Array() {
        if (this.dataType !== 7) throw new Error("Invalid data type");
        let t = oi.size(this.dims);
        return t === 0 ? new BigInt64Array() : new BigInt64Array(this.module.HEAP8.buffer, this.data, t);
      }
      getInt32Array() {
        if (this.dataType !== 6) throw new Error("Invalid data type");
        let t = oi.size(this.dims);
        return t === 0 ? new Int32Array() : new Int32Array(this.module.HEAP8.buffer, this.data, t);
      }
      getUint16Array() {
        if (this.dataType !== 10 && this.dataType !== 4) throw new Error("Invalid data type");
        let t = oi.size(this.dims);
        return t === 0 ? new Uint16Array() : new Uint16Array(this.module.HEAP8.buffer, this.data, t);
      }
      reshape(t) {
        if (oi.size(t) !== oi.size(this.dims)) throw new Error("Invalid new shape");
        return new Pkr(this.module, this.dataType, this.data, t);
      }
    }, S2n = class {
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
          s.push(new c9e(e, d, u, p));
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
          a = (s, l, d) => new c9e(this.module, l, this.output(s, d), d),
          i = (s, l) => {
            let d = MH(s, l);
            if (!d) throw new Error(`Unsupported data type: ${s}`);
            let u = d > 0 ? this.backend.gpuDataManager.create(d).id : 0;
            return new c9e(this.module, s, u, l);
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
    }, Mkr = async (e, t, n, r) => {
      let a = t.jsepInit;
      if (!a) throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");
      if (e === "webgpu") {
        let i = new Ikr();
        await i.initialize(n, r), a("webgpu", [i, o => i.alloc(Number(o)), o => i.free(o), (o, s, l, d = !1) => {
          if (d) Pd("verbose", () => `[WebGPU] jsepCopyGpuToGpu: src=${Number(o)}, dst=${Number(s)}, size=${Number(l)}`), i.memcpy(Number(o), Number(s));else {
            Pd("verbose", () => `[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(o)}, gpuDataId=${Number(s)}, size=${Number(l)}`);
            let u = t.HEAPU8.subarray(Number(o >>> 0), Number(o >>> 0) + Number(l));
            i.upload(Number(s), u);
          }
        }, async (o, s, l) => {
          Pd("verbose", () => `[WebGPU] jsepCopyGpuToCpu: gpuDataId=${o}, dataOffset=${s}, size=${l}`), await i.download(Number(o), () => t.HEAPU8.subarray(Number(s) >>> 0, Number(s + l) >>> 0));
        }, (o, s, l) => i.createKernel(o, Number(s), l, t.UTF8ToString(t._JsepGetNodeName(Number(s)))), o => i.releaseKernel(o), (o, s, l, d) => {
          Pd("verbose", () => `[WebGPU] jsepRun: sessionHandle=${l}, kernel=${o}, contextDataOffset=${s}`);
          let u = new S2n(t, i, Number(s));
          return i.computeKernel(Number(o), u, d);
        }, () => i.captureBegin(), () => i.captureEnd(), () => i.replay()]);
      } else {
        let i = new Ekr(n);
        a("webnn", [i, () => i.reserveTensorId(), o => i.releaseTensorId(o), async (o, s, l, d, u) => i.ensureTensor(o, s, l, d, u), (o, s) => {
          i.uploadTensor(o, s);
        }, async (o, s) => i.downloadTensor(o, s)]);
      }
    };
  }),
  I2n,
  _Gt,
  kGt,
  XL,
  C2n,
  fGe,
  AGt,
  SGt,
  Put,
  IGt,
  CGt,
  EGt,
  Rkr = Hi(() => {
    F8o(), z8o(), il(), ree(), iGt(), Oxr(), I2n = (e, t) => {
      lb()._OrtInit(e, t) !== 0 && _u("Can't initialize onnxruntime.");
    }, _Gt = async e => {
      I2n(e.wasm.numThreads, uGe(e.logLevel));
    }, kGt = async (e, t) => {
      {
        let n = (D6o(), cGe(Tkr)).init;
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
          await n("webgpu", lb(), e, r);
        }
        if (t === "webnn") {
          if (typeof navigator > "u" || !navigator.ml) throw new Error("WebNN is not supported in current environment");
          await n("webnn", lb(), e);
        }
      }
    }, XL = new Map(), C2n = e => {
      let t = lb(),
        n = t.stackSave();
      try {
        let r = t.PTR_SIZE,
          a = t.stackAlloc(2 * r);
        t._OrtGetInputOutputCount(e, a, a + r) !== 0 && _u("Can't get session input/output count.");
        let i = r === 4 ? "i32" : "i64";
        return [Number(t.getValue(a, i)), Number(t.getValue(a + r, i))];
      } finally {
        t.stackRestore(n);
      }
    }, fGe = e => {
      let t = lb(),
        n = t._malloc(e.byteLength);
      if (n === 0) throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);
      return t.HEAPU8.set(e, n), [n, e.byteLength];
    }, AGt = async (e, t) => {
      var h, p, m;
      let n,
        r,
        a = lb();
      Array.isArray(e) ? [n, r] = e : e.buffer === a.HEAPU8.buffer ? [n, r] = [e.byteOffset, e.byteLength] : [n, r] = fGe(e);
      let i = 0,
        o = 0,
        s = 0,
        l = [],
        d = [],
        u = [];
      try {
        if ([o, l] = Lxr(t), (t == null ? void 0 : t.externalData) && a.mountExternalData) {
          let A = [];
          for (let S of t.externalData) {
            let C = typeof S == "string" ? S : S.path;
            A.push(cGt(typeof S == "string" ? S : S.data).then(I => {
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
        i = await a._OrtCreateSession(n, r, o), i === 0 && _u("Can't create a session."), (h = a.jsepOnCreateSession) == null || h.call(a), a.currentContext && (a.jsepRegisterMLContext(i, a.currentContext), a.currentContext = void 0, a.shouldTransferToMLTensor = !0);
        let [f, y] = C2n(i),
          b = !!(t != null && t.enableGraphCapture),
          v = [],
          _ = [],
          w = [];
        for (let A = 0; A < f; A++) {
          let S = a._OrtGetInputName(i, A);
          S === 0 && _u("Can't get an input name."), d.push(S), v.push(a.UTF8ToString(S));
        }
        for (let A = 0; A < y; A++) {
          let S = a._OrtGetOutputName(i, A);
          S === 0 && _u("Can't get an output name."), u.push(S);
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
        return w.some(A => A === "gpu-buffer" || A === "ml-tensor") && (s = a._OrtCreateBinding(i), s === 0 && _u("Can't create IO binding."), k = {
          handle: s,
          outputPreferredLocations: w,
          outputPreferredLocationsEncoded: w.map(A => H3t(A))
        }), XL.set(i, [i, d, u, k, b, !1]), [i, v, _];
      } catch (f) {
        throw d.forEach(y => a._OrtFree(y)), u.forEach(y => a._OrtFree(y)), s !== 0 && a._OrtReleaseBinding(s) !== 0 && _u("Can't release IO binding."), i !== 0 && a._OrtReleaseSession(i) !== 0 && _u("Can't release session."), f;
      } finally {
        a._free(n), o !== 0 && a._OrtReleaseSessionOptions(o) !== 0 && _u("Can't release session options."), l.forEach(f => a._free(f)), (m = a.unmountExternalData) == null || m.call(a);
      }
    }, SGt = e => {
      var l;
      let t = lb(),
        n = XL.get(e);
      if (!n) throw new Error(`cannot release session. invalid session id: ${e}`);
      let [r, a, i, o, s] = n;
      o && (s && t._OrtClearBoundOutputs(o.handle) !== 0 && _u("Can't clear bound outputs."), t._OrtReleaseBinding(o.handle) !== 0 && _u("Can't release IO binding.")), (l = t.jsepOnReleaseSession) == null || l.call(t, e), a.forEach(d => t._OrtFree(d)), i.forEach(d => t._OrtFree(d)), t._OrtReleaseSession(r) !== 0 && _u("Can't release session."), XL.delete(e);
    }, Put = async (e, t, n, r, a, i = !1) => {
      if (!e) {
        t.push(0);
        return;
      }
      let o = lb(),
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
        m = MH(Kne(l), d);
        let v = o.jsepRegisterBuffer;
        if (!v) throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');
        p = v(r, a, b, m);
      } else if (u === "ml-tensor") {
        let b = e[2].mlTensor;
        m = MH(Kne(l), d);
        let v = o.jsepRegisterMLTensor;
        if (!v) throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');
        p = v(r, b, Kne(l), d);
      } else {
        let b = e[2];
        if (Array.isArray(b)) {
          m = s * b.length, p = o._malloc(m), n.push(p);
          for (let v = 0; v < b.length; v++) {
            if (typeof b[v] != "string") throw new TypeError(`tensor data at index ${v} is not a string`);
            o.setValue(p + v * s, k1(b[v], n), "*");
          }
        } else {
          let v = o.jsepIsGraphInput;
          if (l !== "string" && v) {
            let _ = o._OrtGetInputName(r, a),
              w = o.UTF8ToString(_);
            if (v(r, w)) {
              let k = Kne(l);
              m = MH(k, d), h = "ml-tensor";
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
        let b = o._OrtCreateTensor(Kne(l), p, m, y, d.length, H3t(h));
        b === 0 && _u(`Can't create tensor for input/output. session=${r}, index=${a}.`), t.push(b);
      } finally {
        o.stackRestore(f);
      }
    }, IGt = async (e, t, n, r, a, i) => {
      var T, P, R;
      let o = lb(),
        s = o.PTR_SIZE,
        l = XL.get(e);
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
        [v, _] = Dxr(i);
        for (let F = 0; F < y; F++) await Put(n[F], w, A, e, t[F], m);
        for (let F = 0; F < b; F++) await Put(a[F], k, A, e, y + r[F], m);
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
            (await o._OrtBindInput(F, u[V], w[z])) !== 0 && _u(`Can't bind input[${z}] for session=${e}.`);
          }
          for (let z = 0; z < b; z++) {
            let V = r[z];
            (T = a[z]) != null && T[3] ? o._OrtBindOutput(F, h[V], k[z], 0) !== 0 && _u(`Can't bind pre-allocated output[${z}] for session=${e}.`) : o._OrtBindOutput(F, h[V], 0, G[V]) !== 0 && _u(`Can't bind output[${z}] to ${N[z]} for session=${e}.`);
          }
          XL.set(e, [d, u, h, p, m, !0]);
        }
        (P = o.jsepOnRunStart) == null || P.call(o, d);
        let j;
        p ? j = await o._OrtRunWithBinding(d, p.handle, b, E, v) : j = await o._OrtRun(d, I, C, y, M, b, E, v), j !== 0 && _u("failed to call OrtRun().");
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
            o._OrtGetTensorData(N, z, z + s, z + 2 * s, z + 3 * s) !== 0 && _u(`Can't access output tensor data on index ${F}.`);
            let D = s === 4 ? "i32" : "i64",
              U = Number(o.getValue(z, D));
            L = o.getValue(z + s, "*");
            let H = o.getValue(z + s * 2, "*"),
              Y = Number(o.getValue(z + s * 3, D)),
              K = [];
            for (let q = 0; q < Y; q++) K.push(Number(o.getValue(H + q * s, D)));
            o._OrtFree(H) !== 0 && _u("Can't free memory for tensor dims.");
            let W = K.reduce((q, ne) => q * ne, 1);
            O = TH(U);
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
                de = MH(U, W);
              if (de === void 0 || !sGt(O)) throw new Error(`Unsupported data type: ${O}`);
              V = !0, B.push([O, K, {
                gpuBuffer: ne,
                download: o.jsepCreateDownloader(ne, de, O),
                dispose: () => {
                  o._OrtReleaseTensor(N) !== 0 && _u("Can't release tensor.");
                }
              }, "gpu-buffer"]);
            } else if (Q === "ml-tensor" && W > 0) {
              let q = o.jsepEnsureTensor;
              if (!q) throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');
              if (MH(U, W) === void 0 || !lGt(O)) throw new Error(`Unsupported data type: ${O}`);
              let ne = await q(e, L, U, K, !1);
              V = !0, B.push([O, K, {
                mlTensor: ne,
                download: o.jsepCreateMLTensorDownloader(L, O),
                dispose: () => {
                  o.jsepReleaseTensorId(L), o._OrtReleaseTensor(N);
                }
              }, "ml-tensor"]);
            } else {
              let q = oGt(O),
                ne = new q(W);
              new Uint8Array(ne.buffer, ne.byteOffset, ne.byteLength).set(o.HEAPU8.subarray(L, L + ne.byteLength)), B.push([O, K, ne, "cpu"]);
            }
          } finally {
            o.stackRestore(G), O === "string" && L && o._free(L), V || o._OrtReleaseTensor(N), (R = o.jsepOnRunEnd) == null || R.call(o, d);
          }
        }
        return p && !m && (o._OrtClearBoundOutputs(p.handle) !== 0 && _u("Can't clear bound outputs."), XL.set(e, [d, u, h, p, m, !1])), B;
      } finally {
        o.stackRestore(S), w.forEach(j => o._OrtReleaseTensor(j)), k.forEach(j => o._OrtReleaseTensor(j)), A.forEach(j => o._free(j)), v !== 0 && o._OrtReleaseRunOptions(v), _.forEach(j => o._free(j));
      }
    }, CGt = e => {
      let t = lb(),
        n = XL.get(e);
      if (!n) throw new Error("invalid session id");
      let r = n[0],
        a = t._OrtEndProfiling(r);
      a === 0 && _u("Can't get an profile file name."), t._OrtFree(a);
    }, EGt = e => {
      let t = [];
      for (let n of e) {
        let r = n[2];
        !Array.isArray(r) && "buffer" in r && t.push(r.buffer);
      }
      return t;
    };
  }),
  JL,
  D_,
  Xte,
  Ige,
  Cge,
  d9e,
  Rut,
  u9e,
  IV,
  CV,
  E2n,
  Nkr,
  jkr,
  Dkr,
  Lkr,
  Okr,
  Bkr,
  Fkr,
  zkr = Hi(() => {
    BT(), Rkr(), ree(), rGt(), JL = () => !!dm.wasm.proxy && typeof document < "u", Xte = !1, Ige = !1, Cge = !1, u9e = new Map(), IV = (e, t) => {
      let n = u9e.get(e);
      n ? n.push(t) : u9e.set(e, [t]);
    }, CV = () => {
      if (Xte || !Ige || Cge || !D_) throw new Error("worker not ready");
    }, E2n = e => {
      switch (e.data.type) {
        case "init-wasm":
          Xte = !1, e.data.err ? (Cge = !0, Rut[1](e.data.err)) : (Ige = !0, Rut[0]()), d9e && (URL.revokeObjectURL(d9e), d9e = void 0);
          break;
        case "init-ep":
        case "copy-from":
        case "create":
        case "release":
        case "run":
        case "end-profiling":
          {
            let t = u9e.get(e.data.type);
            e.data.err ? t.shift()[1](e.data.err) : t.shift()[0](e.data.out);
            break;
          }
      }
    }, Nkr = async () => {
      if (!Ige) {
        if (Xte) throw new Error("multiple calls to 'initWasm()' detected.");
        if (Cge) throw new Error("previous call to 'initWasm()' failed.");
        if (Xte = !0, JL()) return new Promise((e, t) => {
          D_ == null || D_.terminate(), Nxr().then(([n, r]) => {
            var a;
            try {
              D_ = r, D_.onerror = o => t(o), D_.onmessage = E2n, Rut = [e, t];
              let i = {
                type: "init-wasm",
                in: dm
              };
              !i.in.wasm.wasmPaths && (n || (a = import.meta.url) != null && a.startsWith("file:")) && (i.in.wasm.wasmPaths = {
                wasm: new URL("" + new URL("ort-wasm-simd-threaded.jsep-D5Jk56-t.wasm", import.meta.url).href, import.meta.url).href
              }), D_.postMessage(i), d9e = n;
            } catch (i) {
              t(i);
            }
          }, t);
        });
        try {
          await aGt(dm.wasm), await _Gt(dm), Ige = !0;
        } catch (e) {
          throw Cge = !0, e;
        } finally {
          Xte = !1;
        }
      }
    }, jkr = async e => {
      if (JL()) return CV(), new Promise((t, n) => {
        IV("init-ep", [t, n]);
        let r = {
          type: "init-ep",
          in: {
            epName: e,
            env: dm
          }
        };
        D_.postMessage(r);
      });
      await kGt(dm, e);
    }, Dkr = async e => JL() ? (CV(), new Promise((t, n) => {
      IV("copy-from", [t, n]);
      let r = {
        type: "copy-from",
        in: {
          buffer: e
        }
      };
      D_.postMessage(r, [e.buffer]);
    })) : fGe(e), Lkr = async (e, t) => {
      if (JL()) {
        if (t != null && t.preferredOutputLocation) throw new Error('session option "preferredOutputLocation" is not supported for proxy.');
        return CV(), new Promise((n, r) => {
          IV("create", [n, r]);
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
          e instanceof Uint8Array && i.push(e.buffer), D_.postMessage(a, i);
        });
      } else return AGt(e, t);
    }, Okr = async e => {
      if (JL()) return CV(), new Promise((t, n) => {
        IV("release", [t, n]);
        let r = {
          type: "release",
          in: e
        };
        D_.postMessage(r);
      });
      SGt(e);
    }, Bkr = async (e, t, n, r, a, i) => {
      if (JL()) {
        if (n.some(o => o[3] !== "cpu")) throw new Error("input tensor on GPU is not supported for proxy.");
        if (a.some(o => o)) throw new Error("pre-allocated output tensor is not supported for proxy.");
        return CV(), new Promise((o, s) => {
          IV("run", [o, s]);
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
          D_.postMessage(d, EGt(l));
        });
      } else return IGt(e, t, n, r, a, i);
    }, Fkr = async e => {
      if (JL()) return CV(), new Promise((t, n) => {
        IV("end-profiling", [t, n]);
        let r = {
          type: "end-profiling",
          in: e
        };
        D_.postMessage(r);
      });
      CGt(e);
    };
  }),
  Nut,
  T2n,
  Ukr,
  L6o = Hi(() => {
    BT(), zkr(), il(), nGt(), Oxr(), Nut = (e, t) => {
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
    }, T2n = e => {
      switch (e[3]) {
        case "cpu":
          return new aE(e[0], e[2], e[1]);
        case "gpu-buffer":
          {
            let t = e[0];
            if (!sGt(t)) throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);
            let {
              gpuBuffer: n,
              download: r,
              dispose: a
            } = e[2];
            return aE.fromGpuBuffer(n, {
              dataType: t,
              dims: e[1],
              download: r,
              dispose: a
            });
          }
        case "ml-tensor":
          {
            let t = e[0];
            if (!lGt(t)) throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);
            let {
              mlTensor: n,
              download: r,
              dispose: a
            } = e[2];
            return aE.fromMLTensor(n, {
              dataType: t,
              dims: e[1],
              download: r,
              dispose: a
            });
          }
        default:
          throw new Error(`invalid data location: ${e[3]}`);
      }
    }, Ukr = class {
      async fetchModelAndCopyToWasmMemory(e) {
        return Dkr(await cGt(e));
      }
      async loadModel(e, t) {
        yT();
        let n;
        typeof e == "string" ? n = await this.fetchModelAndCopyToWasmMemory(e) : n = e, [this.sessionId, this.inputNames, this.outputNames] = await Lkr(n, t), Y5();
      }
      async dispose() {
        return Okr(this.sessionId);
      }
      async run(e, t, n) {
        yT();
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
        let s = r.map((h, p) => Nut(h, () => `input "${this.inputNames[a[p]]}"`)),
          l = i.map((h, p) => h ? Nut(h, () => `output "${this.outputNames[o[p]]}"`) : null),
          d = await Bkr(this.sessionId, a, s, o, l, n),
          u = {};
        for (let h = 0; h < d.length; h++) u[this.outputNames[o[h]]] = i[h] ?? T2n(d[h]);
        return Y5(), u;
      }
      startProfiling() {}
      endProfiling() {
        Fkr(this.sessionId);
      }
    };
  }),
  $kr = {};

SEe($kr, {
  OnnxruntimeWebAssemblyBackend: () => a4t,
  initializeFlags: () => r4t,
  wasmBackend: () => Gkr
});

var r4t,
  a4t,
  Gkr,
  O6o = Hi(() => {
    BT(), zkr(), L6o(), r4t = () => {
      if ((typeof dm.wasm.initTimeout != "number" || dm.wasm.initTimeout < 0) && (dm.wasm.initTimeout = 0), dm.wasm.simd === !1 && console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'), typeof dm.wasm.proxy != "boolean" && (dm.wasm.proxy = !1), typeof dm.wasm.trace != "boolean" && (dm.wasm.trace = !1), typeof dm.wasm.numThreads != "number" || !Number.isInteger(dm.wasm.numThreads) || dm.wasm.numThreads <= 0) if (typeof self < "u" && !self.crossOriginIsolated) dm.wasm.numThreads = 1;else {
        let e = typeof navigator > "u" ? _8o("node:os").cpus().length : navigator.hardwareConcurrency;
        dm.wasm.numThreads = Math.min(4, Math.ceil((e || 1) / 2));
      }
    }, a4t = class {
      async init(e) {
        r4t(), await Nkr(), await jkr(e);
      }
      async createInferenceSessionHandler(e, t) {
        let n = new Ukr();
        return await n.loadModel(e, t), Promise.resolve(n);
      }
    }, Gkr = new a4t();
  });

BT();

BT();

BT();

var B6o = "1.21.0",
  F6o = Cxr;

{
  let e = (O6o(), cGe($kr)).wasmBackend;
  $W("webgpu", e, 5), $W("webnn", e, 5), $W("cpu", e, 10), $W("wasm", e, 10);
}

Object.defineProperty(dm.versions, "web", {
  value: B6o,
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
 */const TGt = Object.freeze(Object.defineProperty({
  __proto__: null,
  get InferenceSession() {
    return tGt;
  },
  get TRACE() {
    return jAe;
  },
  get TRACE_FUNC_BEGIN() {
    return yT;
  },
  get TRACE_FUNC_END() {
    return Y5;
  },
  get Tensor() {
    return aE;
  },
  default: F6o,
  get env() {
    return dm;
  },
  get registerBackend() {
    return $W;
  }
}, Symbol.toStringTag, {
  value: "Module"
}));

var z6o = Object.create,
  Vkr = Object.defineProperty,
  U6o = Object.getOwnPropertyDescriptor,
  Hkr = Object.getOwnPropertyNames,
  $6o = Object.getPrototypeOf,
  G6o = Object.prototype.hasOwnProperty,
  MGt = (e, t) => function () {
    return t || (0, e[Hkr(e)[0]])((t = {
      exports: {}
    }).exports, t), t.exports;
  },
  V6o = (e, t, n, r) => {
    if (t && typeof t == "object" || typeof t == "function") for (let a of Hkr(t)) !G6o.call(e, a) && a !== n && Vkr(e, a, {
      get: () => t[a],
      enumerable: !(r = U6o(t, a)) || r.enumerable
    });
    return e;
  },
  LZe = (e, t, n) => (n = e != null ? z6o($6o(e)) : {}, V6o(!e || !e.__esModule ? Vkr(n, "default", {
    value: e,
    enumerable: !0
  }) : n, e)),
  H6o = MGt({
    "../../node_modules/.pnpm/iota-array@1.0.0/node_modules/iota-array/iota.js"(e, t) {
      function n(r) {
        for (var a = new Array(r), i = 0; i < r; ++i) a[i] = i;
        return a;
      }
      t.exports = n;
    }
  }),
  W6o = MGt({
    "../../node_modules/.pnpm/is-buffer@1.1.6/node_modules/is-buffer/index.js"(e, t) {
      t.exports = function (a) {
        return a != null && (n(a) || r(a) || !!a._isBuffer);
      };
      function n(a) {
        return !!a.constructor && typeof a.constructor.isBuffer == "function" && a.constructor.isBuffer(a);
      }
      function r(a) {
        return typeof a.readFloatLE == "function" && typeof a.slice == "function" && n(a.slice(0, 0));
      }
    }
  }),
  OZe = MGt({
    "../../node_modules/.pnpm/ndarray@1.0.19/node_modules/ndarray/ndarray.js"(e, t) {
      var n = H6o(),
        r = W6o(),
        a = typeof Float64Array < "u";
      function i(h, p) {
        return h[0] - p[0];
      }
      function o() {
        var h = this.stride,
          p = new Array(h.length),
          m;
        for (m = 0; m < p.length; ++m) p[m] = [Math.abs(h[m]), m];
        p.sort(i);
        var f = new Array(p.length);
        for (m = 0; m < f.length; ++m) f[m] = p[m][1];
        return f;
      }
      function s(h, p) {
        var m = ["View", p, "d", h].join("");
        p < 0 && (m = "View_Nil" + h);
        var f = h === "generic";
        if (p === -1) {
          var y = "function " + m + "(a){this.data=a;};var proto=" + m + ".prototype;proto.dtype='" + h + "';proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new " + m + "(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_" + m + "(a){return new " + m + "(a);}",
            M = new Function(y);
          return M();
        } else if (p === 0) {
          var y = "function " + m + "(a,d) {this.data = a;this.offset = d};var proto=" + m + ".prototype;proto.dtype='" + h + "';proto.index=function(){return this.offset};proto.dimension=0;proto.size=1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function " + m + "_copy() {return new " + m + "(this.data,this.offset)};proto.pick=function " + m + "_pick(){return TrivialArray(this.data);};proto.valueOf=proto.get=function " + m + "_get(){return " + (f ? "this.data.get(this.offset)" : "this.data[this.offset]") + "};proto.set=function " + m + "_set(v){return " + (f ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v") + "};return function construct_" + m + "(a,b,c,d){return new " + m + "(a,d)}",
            M = new Function("TrivialArray", y);
          return M(d[h][0]);
        }
        var y = ["'use strict'"],
          b = n(p),
          v = b.map(function (T) {
            return "i" + T;
          }),
          _ = "this.offset+" + b.map(function (T) {
            return "this.stride[" + T + "]*i" + T;
          }).join("+"),
          w = b.map(function (T) {
            return "b" + T;
          }).join(","),
          k = b.map(function (T) {
            return "c" + T;
          }).join(",");
        y.push("function " + m + "(a," + w + "," + k + ",d){this.data=a", "this.shape=[" + w + "]", "this.stride=[" + k + "]", "this.offset=d|0}", "var proto=" + m + ".prototype", "proto.dtype='" + h + "'", "proto.dimension=" + p), y.push("Object.defineProperty(proto,'size',{get:function " + m + "_size(){return " + b.map(function (T) {
          return "this.shape[" + T + "]";
        }).join("*"), "}})"), p === 1 ? y.push("proto.order=[0]") : (y.push("Object.defineProperty(proto,'order',{get:"), p < 4 ? (y.push("function " + m + "_order(){"), p === 2 ? y.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})") : p === 3 && y.push("var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);if(s0>s1){if(s1>s2){return [2,1,0];}else if(s0>s2){return [1,2,0];}else{return [1,0,2];}}else if(s0>s2){return [2,0,1];}else if(s2>s1){return [0,1,2];}else{return [0,2,1];}}})")) : y.push("ORDER})")), y.push("proto.set=function " + m + "_set(" + v.join(",") + ",v){"), f ? y.push("return this.data.set(" + _ + ",v)}") : y.push("return this.data[" + _ + "]=v}"), y.push("proto.get=function " + m + "_get(" + v.join(",") + "){"), f ? y.push("return this.data.get(" + _ + ")}") : y.push("return this.data[" + _ + "]}"), y.push("proto.index=function " + m + "_index(", v.join(), "){return " + _ + "}"), y.push("proto.hi=function " + m + "_hi(" + v.join(",") + "){return new " + m + "(this.data," + b.map(function (T) {
          return ["(typeof i", T, "!=='number'||i", T, "<0)?this.shape[", T, "]:i", T, "|0"].join("");
        }).join(",") + "," + b.map(function (T) {
          return "this.stride[" + T + "]";
        }).join(",") + ",this.offset)}");
        var A = b.map(function (T) {
            return "a" + T + "=this.shape[" + T + "]";
          }),
          S = b.map(function (T) {
            return "c" + T + "=this.stride[" + T + "]";
          });
        y.push("proto.lo=function " + m + "_lo(" + v.join(",") + "){var b=this.offset,d=0," + A.join(",") + "," + S.join(","));
        for (var C = 0; C < p; ++C) y.push("if(typeof i" + C + "==='number'&&i" + C + ">=0){d=i" + C + "|0;b+=c" + C + "*d;a" + C + "-=d}");
        y.push("return new " + m + "(this.data," + b.map(function (T) {
          return "a" + T;
        }).join(",") + "," + b.map(function (T) {
          return "c" + T;
        }).join(",") + ",b)}"), y.push("proto.step=function " + m + "_step(" + v.join(",") + "){var " + b.map(function (T) {
          return "a" + T + "=this.shape[" + T + "]";
        }).join(",") + "," + b.map(function (T) {
          return "b" + T + "=this.stride[" + T + "]";
        }).join(",") + ",c=this.offset,d=0,ceil=Math.ceil");
        for (var C = 0; C < p; ++C) y.push("if(typeof i" + C + "==='number'){d=i" + C + "|0;if(d<0){c+=b" + C + "*(a" + C + "-1);a" + C + "=ceil(-a" + C + "/d)}else{a" + C + "=ceil(a" + C + "/d)}b" + C + "*=d}");
        y.push("return new " + m + "(this.data," + b.map(function (T) {
          return "a" + T;
        }).join(",") + "," + b.map(function (T) {
          return "b" + T;
        }).join(",") + ",c)}");
        for (var I = new Array(p), E = new Array(p), C = 0; C < p; ++C) I[C] = "a[i" + C + "]", E[C] = "b[i" + C + "]";
        y.push("proto.transpose=function " + m + "_transpose(" + v + "){" + v.map(function (T, P) {
          return T + "=(" + T + "===undefined?" + P + ":" + T + "|0)";
        }).join(";"), "var a=this.shape,b=this.stride;return new " + m + "(this.data," + I.join(",") + "," + E.join(",") + ",this.offset)}"), y.push("proto.pick=function " + m + "_pick(" + v + "){var a=[],b=[],c=this.offset");
        for (var C = 0; C < p; ++C) y.push("if(typeof i" + C + "==='number'&&i" + C + ">=0){c=(c+this.stride[" + C + "]*i" + C + ")|0}else{a.push(this.shape[" + C + "]);b.push(this.stride[" + C + "])}");
        y.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}"), y.push("return function construct_" + m + "(data,shape,stride,offset){return new " + m + "(data," + b.map(function (T) {
          return "shape[" + T + "]";
        }).join(",") + "," + b.map(function (T) {
          return "stride[" + T + "]";
        }).join(",") + ",offset)}");
        var M = new Function("CTOR_LIST", "ORDER", y.join(`
`));
        return M(d[h], o);
      }
      function l(h) {
        if (r(h)) return "buffer";
        if (a) switch (Object.prototype.toString.call(h)) {
          case "[object Float64Array]":
            return "float64";
          case "[object Float32Array]":
            return "float32";
          case "[object Int8Array]":
            return "int8";
          case "[object Int16Array]":
            return "int16";
          case "[object Int32Array]":
            return "int32";
          case "[object Uint8Array]":
            return "uint8";
          case "[object Uint16Array]":
            return "uint16";
          case "[object Uint32Array]":
            return "uint32";
          case "[object Uint8ClampedArray]":
            return "uint8_clamped";
          case "[object BigInt64Array]":
            return "bigint64";
          case "[object BigUint64Array]":
            return "biguint64";
        }
        return Array.isArray(h) ? "array" : "generic";
      }
      var d = {
        float32: [],
        float64: [],
        int8: [],
        int16: [],
        int32: [],
        uint8: [],
        uint16: [],
        uint32: [],
        array: [],
        uint8_clamped: [],
        bigint64: [],
        biguint64: [],
        buffer: [],
        generic: []
      };
      function u(h, p, m, f) {
        if (h === void 0) {
          var k = d.array[0];
          return k([]);
        } else typeof h == "number" && (h = [h]);
        p === void 0 && (p = [h.length]);
        var y = p.length;
        if (m === void 0) {
          m = new Array(y);
          for (var b = y - 1, v = 1; b >= 0; --b) m[b] = v, v *= p[b];
        }
        if (f === void 0) {
          f = 0;
          for (var b = 0; b < y; ++b) m[b] < 0 && (f -= (p[b] - 1) * m[b]);
        }
        for (var _ = l(h), w = d[_]; w.length <= y + 1;) w.push(s(_, w.length - 1));
        var k = w[y + 1];
        return k(h, p, m, f);
      }
      t.exports = u;
    }
  }),
  q6o = typeof global == "object" && global && global.Object === Object && global,
  K6o = q6o,
  Q6o = typeof self == "object" && self && self.Object === Object && self,
  Y6o = K6o || Q6o || Function("return this")(),
  PGt = Y6o,
  X6o = PGt.Symbol,
  gGe = X6o,
  Wkr = Object.prototype,
  J6o = Wkr.hasOwnProperty,
  Z6o = Wkr.toString,
  Ege = gGe ? gGe.toStringTag : void 0;

function eMo(e) {
  var t = J6o.call(e, Ege),
    n = e[Ege];
  try {
    e[Ege] = void 0;
    var r = !0;
  } catch {}
  var a = Z6o.call(e);
  return r && (t ? e[Ege] = n : delete e[Ege]), a;
}

var tMo = eMo,
  nMo = Object.prototype,
  rMo = nMo.toString;

function aMo(e) {
  return rMo.call(e);
}

var iMo = aMo,
  oMo = "[object Null]",
  sMo = "[object Undefined]",
  M2n = gGe ? gGe.toStringTag : void 0;

function lMo(e) {
  return e == null ? e === void 0 ? sMo : oMo : M2n && M2n in Object(e) ? tMo(e) : iMo(e);
}

var cMo = lMo;

function dMo(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}

var qkr = dMo,
  uMo = "[object AsyncFunction]",
  hMo = "[object Function]",
  pMo = "[object GeneratorFunction]",
  mMo = "[object Proxy]";

function fMo(e) {
  if (!qkr(e)) return !1;
  var t = cMo(e);
  return t == hMo || t == pMo || t == uMo || t == mMo;
}

var gMo = fMo,
  yMo = PGt["__core-js_shared__"],
  jut = yMo,
  P2n = (function () {
    var e = /[^.]+$/.exec(jut && jut.keys && jut.keys.IE_PROTO || "");
    return e ? "Symbol(src)_1." + e : "";
  })();

function bMo(e) {
  return !!P2n && P2n in e;
}

var vMo = bMo,
  wMo = Function.prototype,
  xMo = wMo.toString;

function _Mo(e) {
  if (e != null) {
    try {
      return xMo.call(e);
    } catch {}
    try {
      return e + "";
    } catch {}
  }
  return "";
}

var kMo = _Mo,
  AMo = /[\\^$.*+?()[\]{}|]/g,
  SMo = /^\[object .+?Constructor\]$/,
  IMo = Function.prototype,
  CMo = Object.prototype,
  EMo = IMo.toString,
  TMo = CMo.hasOwnProperty,
  MMo = RegExp("^" + EMo.call(TMo).replace(AMo, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");

function PMo(e) {
  if (!qkr(e) || vMo(e)) return !1;
  var t = gMo(e) ? MMo : SMo;
  return t.test(kMo(e));
}

var RMo = PMo;

function NMo(e, t) {
  return e == null ? void 0 : e[t];
}

var jMo = NMo;

function DMo(e, t) {
  var n = jMo(e, t);
  return RMo(n) ? n : void 0;
}

var Kkr = DMo,
  LMo = Kkr(Object, "create"),
  LAe = LMo;

function OMo() {
  this.__data__ = LAe ? LAe(null) : {}, this.size = 0;
}

var BMo = OMo;

function FMo(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}

var zMo = FMo,
  UMo = "__lodash_hash_undefined__",
  $Mo = Object.prototype,
  GMo = $Mo.hasOwnProperty;

function VMo(e) {
  var t = this.__data__;
  if (LAe) {
    var n = t[e];
    return n === UMo ? void 0 : n;
  }
  return GMo.call(t, e) ? t[e] : void 0;
}

var HMo = VMo,
  WMo = Object.prototype,
  qMo = WMo.hasOwnProperty;

function KMo(e) {
  var t = this.__data__;
  return LAe ? t[e] !== void 0 : qMo.call(t, e);
}

var QMo = KMo,
  YMo = "__lodash_hash_undefined__";

function XMo(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = LAe && t === void 0 ? YMo : t, this;
}

var JMo = XMo;

function $pe(e) {
  var t = -1,
    n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n;) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}

$pe.prototype.clear = BMo;

$pe.prototype.delete = zMo;

$pe.prototype.get = HMo;

$pe.prototype.has = QMo;

$pe.prototype.set = JMo;

var R2n = $pe;

function ZMo() {
  this.__data__ = [], this.size = 0;
}

var ePo = ZMo;

function tPo(e, t) {
  return e === t || e !== e && t !== t;
}

var nPo = tPo;

function rPo(e, t) {
  for (var n = e.length; n--;) if (nPo(e[n][0], t)) return n;
  return -1;
}

var BZe = rPo,
  aPo = Array.prototype,
  iPo = aPo.splice;

function oPo(e) {
  var t = this.__data__,
    n = BZe(t, e);
  if (n < 0) return !1;
  var r = t.length - 1;
  return n == r ? t.pop() : iPo.call(t, n, 1), --this.size, !0;
}

var sPo = oPo;

function lPo(e) {
  var t = this.__data__,
    n = BZe(t, e);
  return n < 0 ? void 0 : t[n][1];
}

var cPo = lPo;

function dPo(e) {
  return BZe(this.__data__, e) > -1;
}

var uPo = dPo;

function hPo(e, t) {
  var n = this.__data__,
    r = BZe(n, e);
  return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
}

var pPo = hPo;

function Gpe(e) {
  var t = -1,
    n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n;) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}

Gpe.prototype.clear = ePo;

Gpe.prototype.delete = sPo;

Gpe.prototype.get = cPo;

Gpe.prototype.has = uPo;

Gpe.prototype.set = pPo;

var mPo = Gpe,
  fPo = Kkr(PGt, "Map"),
  gPo = fPo;

function yPo() {
  this.size = 0, this.__data__ = {
    hash: new R2n(),
    map: new (gPo || mPo)(),
    string: new R2n()
  };
}

var bPo = yPo;

function vPo(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}

var wPo = vPo;

function xPo(e, t) {
  var n = e.__data__;
  return wPo(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}

var FZe = xPo;

function _Po(e) {
  var t = FZe(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}

var kPo = _Po;

function APo(e) {
  return FZe(this, e).get(e);
}

var SPo = APo;

function IPo(e) {
  return FZe(this, e).has(e);
}

var CPo = IPo;

function EPo(e, t) {
  var n = FZe(this, e),
    r = n.size;
  return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
}

var TPo = EPo;

function Vpe(e) {
  var t = -1,
    n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n;) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}

Vpe.prototype.clear = bPo;

Vpe.prototype.delete = kPo;

Vpe.prototype.get = SPo;

Vpe.prototype.has = CPo;

Vpe.prototype.set = TPo;

var Qkr = Vpe,
  MPo = "Expected a function";

function RGt(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function") throw new TypeError(MPo);
  var n = function () {
    var r = arguments,
      a = t ? t.apply(this, r) : r[0],
      i = n.cache;
    if (i.has(a)) return i.get(a);
    var o = e.apply(this, r);
    return n.cache = i.set(a, o) || i, o;
  };
  return n.cache = new (RGt.Cache || Qkr)(), n;
}

RGt.Cache = Qkr;

var PPo = RGt,
  NGt = LZe(OZe()),
  Ykr = class i4t {
    constructor(t, n) {
      this.type = "application/octet-stream", this.params = {}, this.type = t, this.params = n;
    }
    toString() {
      const t = [];
      for (const n in this.params) {
        const r = this.params[n];
        t.push(`${n}=${r}`);
      }
      return [this.type, ...t].join(";");
    }
    static create(t, n) {
      return new i4t(t, n);
    }
    isIdentical(t) {
      return this.type === t.type && this.params === t.params;
    }
    isEqual(t) {
      return this.type === t.type;
    }
    static fromString(t) {
      const [n, ...r] = t.split(";"),
        a = {};
      for (const i of r) {
        const [o, s] = i.split("=");
        a[o.trim()] = s.trim();
      }
      return new i4t(n, a);
    }
  },
  Dut = LZe(OZe());

async function RPo(e) {
  const t = Ykr.fromString(e.type);
  switch (t.type) {
    case "image/x-alpha8":
      {
        const n = parseInt(t.params.width),
          r = parseInt(t.params.height);
        return (0, Dut.default)(new Uint8Array(await e.arrayBuffer()), [r, n, 1]);
      }
    case "image/x-rgba8":
      {
        const n = parseInt(t.params.width),
          r = parseInt(t.params.height);
        return (0, Dut.default)(new Uint8Array(await e.arrayBuffer()), [r, n, 4]);
      }
    case "application/octet-stream":
    case "image/png":
    case "image/jpeg":
    case "image/jpg":
    case "image/webp":
      {
        const n = await createImageBitmap(e),
          r = DPo(n);
        return (0, Dut.default)(new Uint8Array(r.data), [r.height, r.width, 4]);
      }
    default:
      throw new Error(`Invalid format: ${t.type} with params: ${t.params}`);
  }
}

async function zZe(e, t = .8, n = "image/png") {
  const [r, a, i] = e.shape;
  switch (n) {
    case "image/x-alpha8":
    case "image/x-rgba8":
      {
        const l = Ykr.create(n, {
          width: a.toString(),
          height: r.toString()
        });
        return new Blob([e.data], {
          type: l.toString()
        });
      }
    case "image/png":
    case "image/jpeg":
    case "image/webp":
      {
        const l = new ImageData(new Uint8ClampedArray(e.data), a, r);
        var o = Xkr(l.width, l.height),
          s = o.getContext("2d");
        return s.putImageData(l, 0, 0), o.convertToBlob({
          quality: t,
          type: n
        });
      }
    default:
      throw new Error(`Invalid format: ${n}`);
  }
}

function NPo(e) {
  return new RegExp("^(?:[a-z+]+:)?//", "i").test(e);
}

function jPo(e, t) {
  return NPo(e) ? e : new URL(e, t).href;
}

function DPo(e) {
  var t = Xkr(e.width, e.height),
    n = t.getContext("2d");
  return n.drawImage(e, 0, 0), n.getImageData(0, 0, t.width, t.height);
}

function LPo(e) {
  if (typeof Uint8Array < "u") return new Uint8Array(e);
  if (typeof Uint8ClampedArray < "u") return new Uint8ClampedArray(e);
  if (typeof Uint16Array < "u") return new Uint16Array(e);
  if (typeof Uint32Array < "u") return new Uint32Array(e);
  if (typeof Float32Array < "u") return new Float32Array(e);
  if (typeof Float64Array < "u") return new Float64Array(e);
  throw new Error("TypedArray not supported");
}

function o4t(e, t, n, r = !1) {
  const [a, i, o] = e.shape;
  let s = i / t,
    l = a / n;
  r && (s = l = Math.max(s, l) > 1 ? Math.max(s, l) : Math.min(s, l));
  const d = (0, NGt.default)(LPo(o * t * n), [n, t, o]);
  for (let u = 0; u < n; u++) for (let h = 0; h < t; h++) {
    const p = h * s,
      m = u * l,
      f = Math.max(Math.floor(p), 0),
      y = Math.min(Math.ceil(p), i - 1),
      b = Math.max(Math.floor(m), 0),
      v = Math.min(Math.ceil(m), a - 1),
      _ = p - f,
      w = m - b;
    for (let k = 0; k < o; k++) {
      const A = e.get(b, f, k),
        S = e.get(b, y, k),
        C = e.get(v, f, k),
        I = e.get(v, y, k),
        E = (1 - _) * (1 - w) * A + _ * (1 - w) * S + (1 - _) * w * C + _ * w * I;
      d.set(u, h, k, E);
    }
  }
  return d;
}

function OPo(e, t = [128, 128, 128], n = [256, 256, 256]) {
  var r = e.data;
  const [a, i, o] = e.shape,
    s = a * i,
    l = new Float32Array(3 * s);
  for (let d = 0, u = 0; d < r.length; d += 4, u += 1) l[u] = (r[d] - t[0]) / n[0], l[u + s] = (r[d + 1] - t[1]) / n[1], l[u + s + s] = (r[d + 2] - t[2]) / n[2];
  return (0, NGt.default)(l, [1, 3, a, i]);
}

async function OAe(e, t) {
  return typeof e == "string" && (e = jPo(e, t.publicPath), e = new URL(e)), e instanceof URL && (e = await (await fetch(e, {})).blob()), (e instanceof ArrayBuffer || ArrayBuffer.isView(e)) && (e = new Blob([e])), e instanceof Blob && (e = await RPo(e)), e;
}

function BPo(e) {
  const t = new Uint8Array(e.data.length);
  for (let n = 0; n < e.data.length; n++) t[n] = e.data[n] * 255;
  return (0, NGt.default)(t, e.shape);
}

function Xkr(e, t) {
  let n;
  if (typeof OffscreenCanvas < "u" ? n = new OffscreenCanvas(e, t) : n = document.createElement("canvas"), !n) throw new Error("Canvas nor OffscreenCanvas are available in the current context.");
  return n;
}

var FPo = LZe(OZe()),
  Jkr = async () => navigator.gpu === void 0 ? !1 : (await navigator.gpu.requestAdapter()) !== null,
  zPo = () => navigator.hardwareConcurrency ?? 4;

async function N2n(e, t) {
  return URL.createObjectURL(await Zkr(e, t));
}

async function Zkr(e, t) {
  const n = new URL("resources.json", t.publicPath),
    r = await fetch(n);
  if (!r.ok) throw new Error("Resource metadata not found. Ensure that the config.publicPath is configured correctly.");
  const i = (await r.json())[e];
  if (!i) throw new Error(`Resource ${e} not found. Ensure that the config.publicPath is configured correctly.`);
  const o = i.chunks;
  let s = 0;
  const l = o.map(async h => {
      const p = h.offsets[1] - h.offsets[0],
        m = t.publicPath ? new URL(h.name, t.publicPath).toString() : h.name,
        y = await (await fetch(m, t.fetchArgs)).blob();
      if (p !== y.size) throw new Error(`Failed to fetch ${e} with size ${p} but got ${y.size}`);
      return t.progress && (s += p, t.progress(`fetch:${e}`, s, i.size)), y;
    }),
    d = await Promise.all(l),
    u = new Blob(d, {
      type: i.mime
    });
  if (u.size !== i.size) throw new Error(`Failed to fetch ${e} with size ${i.size} but got ${u.size}`);
  return u;
}

var Tge = null,
  eAr = async e => (Tge !== null || (e ? Tge = (await Ie(async () => {
    const {
      default: t
    } = await Promise.resolve().then(() => VNo);
    return {
      default: t
    };
  }, [], import.meta.url)).default : Tge = (await Ie(async () => {
    const {
      default: t
    } = await Promise.resolve().then(() => TGt);
    return {
      default: t
    };
  }, void 0, import.meta.url)).default), Tge);

async function UPo(e, t) {
  const n = t.device === "gpu" && (await Jkr()),
    r = n && t.proxyToWorker,
    a = [n ? "webgpu" : "wasm"],
    i = await eAr(n);
  t.debug && (console.debug("	Using WebGPU:", n), console.debug("	Proxy to Worker:", r), i.env.debug = !0, i.env.logLevel = "verbose"), i.env.wasm.numThreads = zPo(), i.env.wasm.proxy = r;
  const o = n ? "/onnxruntime-web/ort-wasm-simd-threaded.jsep" : "/onnxruntime-web/ort-wasm-simd-threaded",
    s = await N2n(`${o}.wasm`, t),
    l = await N2n(`${o}.mjs`, t);
  i.env.wasm.wasmPaths = {
    mjs: l,
    wasm: s
  }, t.debug && console.debug("ort.env.wasm:", i.env.wasm);
  const d = {
    executionProviders: a,
    graphOptimizationLevel: "all",
    executionMode: "parallel",
    enableCpuMemArena: !0
  };
  return await i.InferenceSession.create(e, d).catch(h => {
    throw new Error(`Failed to create session: "${h}". Please check if the publicPath is set correctly.`);
  });
}

async function $Po(e, t, n, r) {
  const a = r.device === "gpu" && (await Jkr()),
    i = await eAr(a),
    o = {};
  for (const [d, u] of t) o[d] = new i.Tensor("float32", new Float32Array(u.data), u.shape);
  const s = await e.run(o, {}),
    l = [];
  for (const d of n) {
    const u = s[d],
      h = u.dims,
      p = u.data,
      m = (0, FPo.default)(p, h);
    l.push(m);
  }
  return l;
}

var du;

(function (e) {
  e.assertEqual = a => a;
  function t(a) {}
  e.assertIs = t;
  function n(a) {
    throw new Error();
  }
  e.assertNever = n, e.arrayToEnum = a => {
    const i = {};
    for (const o of a) i[o] = o;
    return i;
  }, e.getValidEnumValues = a => {
    const i = e.objectKeys(a).filter(s => typeof a[a[s]] != "number"),
      o = {};
    for (const s of i) o[s] = a[s];
    return e.objectValues(o);
  }, e.objectValues = a => e.objectKeys(a).map(function (i) {
    return a[i];
  }), e.objectKeys = typeof Object.keys == "function" ? a => Object.keys(a) : a => {
    const i = [];
    for (const o in a) Object.prototype.hasOwnProperty.call(a, o) && i.push(o);
    return i;
  }, e.find = (a, i) => {
    for (const o of a) if (i(o)) return o;
  }, e.isInteger = typeof Number.isInteger == "function" ? a => Number.isInteger(a) : a => typeof a == "number" && isFinite(a) && Math.floor(a) === a;
  function r(a, i = " | ") {
    return a.map(o => typeof o == "string" ? `'${o}'` : o).join(i);
  }
  e.joinValues = r, e.jsonStringifyReplacer = (a, i) => typeof i == "bigint" ? i.toString() : i;
})(du || (du = {}));

var s4t;

(function (e) {
  e.mergeShapes = (t, n) => ({
    ...t,
    ...n
  });
})(s4t || (s4t = {}));

var qo = du.arrayToEnum(["string", "nan", "number", "integer", "float", "boolean", "date", "bigint", "symbol", "function", "undefined", "null", "array", "object", "unknown", "promise", "void", "never", "map", "set"]),
  GR = e => {
    switch (typeof e) {
      case "undefined":
        return qo.undefined;
      case "string":
        return qo.string;
      case "number":
        return isNaN(e) ? qo.nan : qo.number;
      case "boolean":
        return qo.boolean;
      case "function":
        return qo.function;
      case "bigint":
        return qo.bigint;
      case "symbol":
        return qo.symbol;
      case "object":
        return Array.isArray(e) ? qo.array : e === null ? qo.null : e.then && typeof e.then == "function" && e.catch && typeof e.catch == "function" ? qo.promise : typeof Map < "u" && e instanceof Map ? qo.map : typeof Set < "u" && e instanceof Set ? qo.set : typeof Date < "u" && e instanceof Date ? qo.date : qo.object;
      default:
        return qo.unknown;
    }
  },
  Xi = du.arrayToEnum(["invalid_type", "invalid_literal", "custom", "invalid_union", "invalid_union_discriminator", "invalid_enum_value", "unrecognized_keys", "invalid_arguments", "invalid_return_type", "invalid_date", "invalid_string", "too_small", "too_big", "invalid_intersection_types", "not_multiple_of", "not_finite"]),
  GPo = e => JSON.stringify(e, null, 2).replace(/"([^"]+)":/g, "$1:"),
  HE = class tAr extends Error {
    get errors() {
      return this.issues;
    }
    constructor(t) {
      super(), this.issues = [], this.addIssue = r => {
        this.issues = [...this.issues, r];
      }, this.addIssues = (r = []) => {
        this.issues = [...this.issues, ...r];
      };
      const n = new.target.prototype;
      Object.setPrototypeOf ? Object.setPrototypeOf(this, n) : this.__proto__ = n, this.name = "ZodError", this.issues = t;
    }
    format(t) {
      const n = t || function (i) {
          return i.message;
        },
        r = {
          _errors: []
        },
        a = i => {
          for (const o of i.issues) if (o.code === "invalid_union") o.unionErrors.map(a);else if (o.code === "invalid_return_type") a(o.returnTypeError);else if (o.code === "invalid_arguments") a(o.argumentsError);else if (o.path.length === 0) r._errors.push(n(o));else {
            let s = r,
              l = 0;
            for (; l < o.path.length;) {
              const d = o.path[l];
              l === o.path.length - 1 ? (s[d] = s[d] || {
                _errors: []
              }, s[d]._errors.push(n(o))) : s[d] = s[d] || {
                _errors: []
              }, s = s[d], l++;
            }
          }
        };
      return a(this), r;
    }
    static assert(t) {
      if (!(t instanceof tAr)) throw new Error(`Not a ZodError: ${t}`);
    }
    toString() {
      return this.message;
    }
    get message() {
      return JSON.stringify(this.issues, du.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
      return this.issues.length === 0;
    }
    flatten(t = n => n.message) {
      const n = {},
        r = [];
      for (const a of this.issues) a.path.length > 0 ? (n[a.path[0]] = n[a.path[0]] || [], n[a.path[0]].push(t(a))) : r.push(t(a));
      return {
        formErrors: r,
        fieldErrors: n
      };
    }
    get formErrors() {
      return this.flatten();
    }
  };

HE.create = e => new HE(e);

var fue = (e, t) => {
    let n;
    switch (e.code) {
      case Xi.invalid_type:
        e.received === qo.undefined ? n = "Required" : n = `Expected ${e.expected}, received ${e.received}`;
        break;
      case Xi.invalid_literal:
        n = `Invalid literal value, expected ${JSON.stringify(e.expected, du.jsonStringifyReplacer)}`;
        break;
      case Xi.unrecognized_keys:
        n = `Unrecognized key(s) in object: ${du.joinValues(e.keys, ", ")}`;
        break;
      case Xi.invalid_union:
        n = "Invalid input";
        break;
      case Xi.invalid_union_discriminator:
        n = `Invalid discriminator value. Expected ${du.joinValues(e.options)}`;
        break;
      case Xi.invalid_enum_value:
        n = `Invalid enum value. Expected ${du.joinValues(e.options)}, received '${e.received}'`;
        break;
      case Xi.invalid_arguments:
        n = "Invalid function arguments";
        break;
      case Xi.invalid_return_type:
        n = "Invalid function return type";
        break;
      case Xi.invalid_date:
        n = "Invalid date";
        break;
      case Xi.invalid_string:
        typeof e.validation == "object" ? "includes" in e.validation ? (n = `Invalid input: must include "${e.validation.includes}"`, typeof e.validation.position == "number" && (n = `${n} at one or more positions greater than or equal to ${e.validation.position}`)) : "startsWith" in e.validation ? n = `Invalid input: must start with "${e.validation.startsWith}"` : "endsWith" in e.validation ? n = `Invalid input: must end with "${e.validation.endsWith}"` : du.assertNever(e.validation) : e.validation !== "regex" ? n = `Invalid ${e.validation}` : n = "Invalid";
        break;
      case Xi.too_small:
        e.type === "array" ? n = `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "more than"} ${e.minimum} element(s)` : e.type === "string" ? n = `String must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "over"} ${e.minimum} character(s)` : e.type === "number" ? n = `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}` : e.type === "date" ? n = `Date must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(e.minimum))}` : n = "Invalid input";
        break;
      case Xi.too_big:
        e.type === "array" ? n = `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "less than"} ${e.maximum} element(s)` : e.type === "string" ? n = `String must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "under"} ${e.maximum} character(s)` : e.type === "number" ? n = `Number must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : e.type === "bigint" ? n = `BigInt must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : e.type === "date" ? n = `Date must be ${e.exact ? "exactly" : e.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(e.maximum))}` : n = "Invalid input";
        break;
      case Xi.custom:
        n = "Invalid input";
        break;
      case Xi.invalid_intersection_types:
        n = "Intersection results could not be merged";
        break;
      case Xi.not_multiple_of:
        n = `Number must be a multiple of ${e.multipleOf}`;
        break;
      case Xi.not_finite:
        n = "Number must be finite";
        break;
      default:
        n = t.defaultError, du.assertNever(e);
    }
    return {
      message: n
    };
  },
  nAr = fue;

function VPo(e) {
  nAr = e;
}

function yGe() {
  return nAr;
}

var bGe = e => {
    const {
        data: t,
        path: n,
        errorMaps: r,
        issueData: a
      } = e,
      i = [...n, ...(a.path || [])],
      o = {
        ...a,
        path: i
      };
    if (a.message !== void 0) return {
      ...a,
      path: i,
      message: a.message
    };
    let s = "";
    const l = r.filter(d => !!d).slice().reverse();
    for (const d of l) s = d(o, {
      data: t,
      defaultError: s
    }).message;
    return {
      ...a,
      path: i,
      message: s
    };
  },
  HPo = [];

function To(e, t) {
  const n = yGe(),
    r = bGe({
      issueData: t,
      data: e.data,
      path: e.path,
      errorMaps: [e.common.contextualErrorMap, e.schemaErrorMap, n, n === fue ? void 0 : fue].filter(a => !!a)
    });
  e.common.issues.push(r);
}

var Xk = class rAr {
    constructor() {
      this.value = "valid";
    }
    dirty() {
      this.value === "valid" && (this.value = "dirty");
    }
    abort() {
      this.value !== "aborted" && (this.value = "aborted");
    }
    static mergeArray(t, n) {
      const r = [];
      for (const a of n) {
        if (a.status === "aborted") return Ll;
        a.status === "dirty" && t.dirty(), r.push(a.value);
      }
      return {
        status: t.value,
        value: r
      };
    }
    static async mergeObjectAsync(t, n) {
      const r = [];
      for (const a of n) {
        const i = await a.key,
          o = await a.value;
        r.push({
          key: i,
          value: o
        });
      }
      return rAr.mergeObjectSync(t, r);
    }
    static mergeObjectSync(t, n) {
      const r = {};
      for (const a of n) {
        const {
          key: i,
          value: o
        } = a;
        if (i.status === "aborted" || o.status === "aborted") return Ll;
        i.status === "dirty" && t.dirty(), o.status === "dirty" && t.dirty(), i.value !== "__proto__" && (typeof o.value < "u" || a.alwaysSet) && (r[i.value] = o.value);
      }
      return {
        status: t.value,
        value: r
      };
    }
  },
  Ll = Object.freeze({
    status: "aborted"
  }),
  dae = e => ({
    status: "dirty",
    value: e
  }),
  c_ = e => ({
    status: "valid",
    value: e
  }),
  l4t = e => e.status === "aborted",
  c4t = e => e.status === "dirty",
  HJ = e => e.status === "valid",
  BAe = e => typeof Promise < "u" && e instanceof Promise;

function vGe(e, t, n, r) {
  if (typeof t == "function" ? e !== t || !0 : !t.has(e)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return t.get(e);
}

function aAr(e, t, n, r, a) {
  if (typeof t == "function" ? e !== t || !0 : !t.has(e)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return t.set(e, n), n;
}

var Ss;

(function (e) {
  e.errToObj = t => typeof t == "string" ? {
    message: t
  } : t || {}, e.toString = t => typeof t == "string" ? t : t == null ? void 0 : t.message;
})(Ss || (Ss = {}));

var sbe,
  lbe,
  JP = class {
    constructor(e, t, n, r) {
      this._cachedPath = [], this.parent = e, this.data = t, this._path = n, this._key = r;
    }
    get path() {
      return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
    }
  },
  j2n = (e, t) => {
    if (HJ(t)) return {
      success: !0,
      data: t.value
    };
    if (!e.common.issues.length) throw new Error("Validation failed but no issues detected.");
    return {
      success: !1,
      get error() {
        if (this._error) return this._error;
        const n = new HE(e.common.issues);
        return this._error = n, this._error;
      }
    };
  };

function Dc(e) {
  if (!e) return {};
  const {
    errorMap: t,
    invalid_type_error: n,
    required_error: r,
    description: a
  } = e;
  if (t && (n || r)) throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return t ? {
    errorMap: t,
    description: a
  } : {
    errorMap: (o, s) => {
      var l, d;
      const {
        message: u
      } = e;
      return o.code === "invalid_enum_value" ? {
        message: u ?? s.defaultError
      } : typeof s.data > "u" ? {
        message: (l = u ?? r) !== null && l !== void 0 ? l : s.defaultError
      } : o.code !== "invalid_type" ? {
        message: s.defaultError
      } : {
        message: (d = u ?? n) !== null && d !== void 0 ? d : s.defaultError
      };
    },
    description: a
  };
}

var ed = class {
    get description() {
      return this._def.description;
    }
    _getType(e) {
      return GR(e.data);
    }
    _getOrReturnCtx(e, t) {
      return t || {
        common: e.parent.common,
        data: e.data,
        parsedType: GR(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      };
    }
    _processInputParams(e) {
      return {
        status: new Xk(),
        ctx: {
          common: e.parent.common,
          data: e.data,
          parsedType: GR(e.data),
          schemaErrorMap: this._def.errorMap,
          path: e.path,
          parent: e.parent
        }
      };
    }
    _parseSync(e) {
      const t = this._parse(e);
      if (BAe(t)) throw new Error("Synchronous parse encountered promise.");
      return t;
    }
    _parseAsync(e) {
      const t = this._parse(e);
      return Promise.resolve(t);
    }
    parse(e, t) {
      const n = this.safeParse(e, t);
      if (n.success) return n.data;
      throw n.error;
    }
    safeParse(e, t) {
      var n;
      const r = {
          common: {
            issues: [],
            async: (n = t == null ? void 0 : t.async) !== null && n !== void 0 ? n : !1,
            contextualErrorMap: t == null ? void 0 : t.errorMap
          },
          path: (t == null ? void 0 : t.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data: e,
          parsedType: GR(e)
        },
        a = this._parseSync({
          data: e,
          path: r.path,
          parent: r
        });
      return j2n(r, a);
    }
    "~validate"(e) {
      var t, n;
      const r = {
        common: {
          issues: [],
          async: !!this["~standard"].async
        },
        path: [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: e,
        parsedType: GR(e)
      };
      if (!this["~standard"].async) try {
        const a = this._parseSync({
          data: e,
          path: [],
          parent: r
        });
        return HJ(a) ? {
          value: a.value
        } : {
          issues: r.common.issues
        };
      } catch (a) {
        !((n = (t = a == null ? void 0 : a.message) === null || t === void 0 ? void 0 : t.toLowerCase()) === null || n === void 0) && n.includes("encountered") && (this["~standard"].async = !0), r.common = {
          issues: [],
          async: !0
        };
      }
      return this._parseAsync({
        data: e,
        path: [],
        parent: r
      }).then(a => HJ(a) ? {
        value: a.value
      } : {
        issues: r.common.issues
      });
    }
    async parseAsync(e, t) {
      const n = await this.safeParseAsync(e, t);
      if (n.success) return n.data;
      throw n.error;
    }
    async safeParseAsync(e, t) {
      const n = {
          common: {
            issues: [],
            contextualErrorMap: t == null ? void 0 : t.errorMap,
            async: !0
          },
          path: (t == null ? void 0 : t.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data: e,
          parsedType: GR(e)
        },
        r = this._parse({
          data: e,
          path: n.path,
          parent: n
        }),
        a = await (BAe(r) ? r : Promise.resolve(r));
      return j2n(n, a);
    }
    refine(e, t) {
      const n = r => typeof t == "string" || typeof t > "u" ? {
        message: t
      } : typeof t == "function" ? t(r) : t;
      return this._refinement((r, a) => {
        const i = e(r),
          o = () => a.addIssue({
            code: Xi.custom,
            ...n(r)
          });
        return typeof Promise < "u" && i instanceof Promise ? i.then(s => s ? !0 : (o(), !1)) : i ? !0 : (o(), !1);
      });
    }
    refinement(e, t) {
      return this._refinement((n, r) => e(n) ? !0 : (r.addIssue(typeof t == "function" ? t(n, r) : t), !1));
    }
    _refinement(e) {
      return new bT({
        schema: this,
        typeName: Sl.ZodEffects,
        effect: {
          type: "refinement",
          refinement: e
        }
      });
    }
    superRefine(e) {
      return this._refinement(e);
    }
    constructor(e) {
      this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
        version: 1,
        vendor: "zod",
        validate: t => this["~validate"](t)
      };
    }
    optional() {
      return fP.create(this, this._def);
    }
    nullable() {
      return T$.create(this, this._def);
    }
    nullish() {
      return this.nullable().optional();
    }
    array() {
      return WJ.create(this);
    }
    promise() {
      return bue.create(this, this._def);
    }
    or(e) {
      return HAe.create([this, e], this._def);
    }
    and(e) {
      return WAe.create(this, e, this._def);
    }
    transform(e) {
      return new bT({
        ...Dc(this._def),
        schema: this,
        typeName: Sl.ZodEffects,
        effect: {
          type: "transform",
          transform: e
        }
      });
    }
    default(e) {
      const t = typeof e == "function" ? e : () => e;
      return new YAe({
        ...Dc(this._def),
        innerType: this,
        defaultValue: t,
        typeName: Sl.ZodDefault
      });
    }
    brand() {
      return new jGt({
        typeName: Sl.ZodBranded,
        type: this,
        ...Dc(this._def)
      });
    }
    catch(e) {
      const t = typeof e == "function" ? e : () => e;
      return new XAe({
        ...Dc(this._def),
        innerType: this,
        catchValue: t,
        typeName: Sl.ZodCatch
      });
    }
    describe(e) {
      const t = this.constructor;
      return new t({
        ...this._def,
        description: e
      });
    }
    pipe(e) {
      return DGt.create(this, e);
    }
    readonly() {
      return JAe.create(this);
    }
    isOptional() {
      return this.safeParse(void 0).success;
    }
    isNullable() {
      return this.safeParse(null).success;
    }
  },
  WPo = /^c[^\s-]{8,}$/i,
  qPo = /^[0-9a-z]+$/,
  KPo = /^[0-9A-HJKMNP-TV-Z]{26}$/i,
  QPo = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
  YPo = /^[a-z0-9_-]{21}$/i,
  XPo = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
  JPo = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
  ZPo = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
  e9o = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$",
  Lut,
  t9o = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  n9o = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
  r9o = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
  a9o = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  i9o = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  o9o = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
  iAr = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",
  s9o = new RegExp(`^${iAr}$`);

function oAr(e) {
  let t = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
  return e.precision ? t = `${t}\\.\\d{${e.precision}}` : e.precision == null && (t = `${t}(\\.\\d+)?`), t;
}

function l9o(e) {
  return new RegExp(`^${oAr(e)}$`);
}

function sAr(e) {
  let t = `${iAr}T${oAr(e)}`;
  const n = [];
  return n.push(e.local ? "Z?" : "Z"), e.offset && n.push("([+-]\\d{2}:?\\d{2})"), t = `${t}(${n.join("|")})`, new RegExp(`^${t}$`);
}

function c9o(e, t) {
  return !!((t === "v4" || !t) && t9o.test(e) || (t === "v6" || !t) && r9o.test(e));
}

function d9o(e, t) {
  if (!XPo.test(e)) return !1;
  try {
    const [n] = e.split("."),
      r = n.replace(/-/g, "+").replace(/_/g, "/").padEnd(n.length + (4 - n.length % 4) % 4, "="),
      a = JSON.parse(atob(r));
    return !(typeof a != "object" || a === null || !a.typ || !a.alg || t && a.alg !== t);
  } catch {
    return !1;
  }
}

function u9o(e, t) {
  return !!((t === "v4" || !t) && n9o.test(e) || (t === "v6" || !t) && a9o.test(e));
}

var gue = class cbe extends ed {
  _parse(t) {
    if (this._def.coerce && (t.data = String(t.data)), this._getType(t) !== qo.string) {
      const i = this._getOrReturnCtx(t);
      return To(i, {
        code: Xi.invalid_type,
        expected: qo.string,
        received: i.parsedType
      }), Ll;
    }
    const r = new Xk();
    let a;
    for (const i of this._def.checks) if (i.kind === "min") t.data.length < i.value && (a = this._getOrReturnCtx(t, a), To(a, {
      code: Xi.too_small,
      minimum: i.value,
      type: "string",
      inclusive: !0,
      exact: !1,
      message: i.message
    }), r.dirty());else if (i.kind === "max") t.data.length > i.value && (a = this._getOrReturnCtx(t, a), To(a, {
      code: Xi.too_big,
      maximum: i.value,
      type: "string",
      inclusive: !0,
      exact: !1,
      message: i.message
    }), r.dirty());else if (i.kind === "length") {
      const o = t.data.length > i.value,
        s = t.data.length < i.value;
      (o || s) && (a = this._getOrReturnCtx(t, a), o ? To(a, {
        code: Xi.too_big,
        maximum: i.value,
        type: "string",
        inclusive: !0,
        exact: !0,
        message: i.message
      }) : s && To(a, {
        code: Xi.too_small,
        minimum: i.value,
        type: "string",
        inclusive: !0,
        exact: !0,
        message: i.message
      }), r.dirty());
    } else if (i.kind === "email") ZPo.test(t.data) || (a = this._getOrReturnCtx(t, a), To(a, {
      validation: "email",
      code: Xi.invalid_string,
      message: i.message
    }), r.dirty());else if (i.kind === "emoji") Lut || (Lut = new RegExp(e9o, "u")), Lut.test(t.data) || (a = this._getOrReturnCtx(t, a), To(a, {
      validation: "emoji",
      code: Xi.invalid_string,
      message: i.message
    }), r.dirty());else if (i.kind === "uuid") QPo.test(t.data) || (a = this._getOrReturnCtx(t, a), To(a, {
      validation: "uuid",
      code: Xi.invalid_string,
      message: i.message
    }), r.dirty());else if (i.kind === "nanoid") YPo.test(t.data) || (a = this._getOrReturnCtx(t, a), To(a, {
      validation: "nanoid",
      code: Xi.invalid_string,
      message: i.message
    }), r.dirty());else if (i.kind === "cuid") WPo.test(t.data) || (a = this._getOrReturnCtx(t, a), To(a, {
      validation: "cuid",
      code: Xi.invalid_string,
      message: i.message
    }), r.dirty());else if (i.kind === "cuid2") qPo.test(t.data) || (a = this._getOrReturnCtx(t, a), To(a, {
      validation: "cuid2",
      code: Xi.invalid_string,
      message: i.message
    }), r.dirty());else if (i.kind === "ulid") KPo.test(t.data) || (a = this._getOrReturnCtx(t, a), To(a, {
      validation: "ulid",
      code: Xi.invalid_string,
      message: i.message
    }), r.dirty());else if (i.kind === "url") try {
      new URL(t.data);
    } catch {
      a = this._getOrReturnCtx(t, a), To(a, {
        validation: "url",
        code: Xi.invalid_string,
        message: i.message
      }), r.dirty();
    } else i.kind === "regex" ? (i.regex.lastIndex = 0, i.regex.test(t.data) || (a = this._getOrReturnCtx(t, a), To(a, {
      validation: "regex",
      code: Xi.invalid_string,
      message: i.message
    }), r.dirty())) : i.kind === "trim" ? t.data = t.data.trim() : i.kind === "includes" ? t.data.includes(i.value, i.position) || (a = this._getOrReturnCtx(t, a), To(a, {
      code: Xi.invalid_string,
      validation: {
        includes: i.value,
        position: i.position
      },
      message: i.message
    }), r.dirty()) : i.kind === "toLowerCase" ? t.data = t.data.toLowerCase() : i.kind === "toUpperCase" ? t.data = t.data.toUpperCase() : i.kind === "startsWith" ? t.data.startsWith(i.value) || (a = this._getOrReturnCtx(t, a), To(a, {
      code: Xi.invalid_string,
      validation: {
        startsWith: i.value
      },
      message: i.message
    }), r.dirty()) : i.kind === "endsWith" ? t.data.endsWith(i.value) || (a = this._getOrReturnCtx(t, a), To(a, {
      code: Xi.invalid_string,
      validation: {
        endsWith: i.value
      },
      message: i.message
    }), r.dirty()) : i.kind === "datetime" ? sAr(i).test(t.data) || (a = this._getOrReturnCtx(t, a), To(a, {
      code: Xi.invalid_string,
      validation: "datetime",
      message: i.message
    }), r.dirty()) : i.kind === "date" ? s9o.test(t.data) || (a = this._getOrReturnCtx(t, a), To(a, {
      code: Xi.invalid_string,
      validation: "date",
      message: i.message
    }), r.dirty()) : i.kind === "time" ? l9o(i).test(t.data) || (a = this._getOrReturnCtx(t, a), To(a, {
      code: Xi.invalid_string,
      validation: "time",
      message: i.message
    }), r.dirty()) : i.kind === "duration" ? JPo.test(t.data) || (a = this._getOrReturnCtx(t, a), To(a, {
      validation: "duration",
      code: Xi.invalid_string,
      message: i.message
    }), r.dirty()) : i.kind === "ip" ? c9o(t.data, i.version) || (a = this._getOrReturnCtx(t, a), To(a, {
      validation: "ip",
      code: Xi.invalid_string,
      message: i.message
    }), r.dirty()) : i.kind === "jwt" ? d9o(t.data, i.alg) || (a = this._getOrReturnCtx(t, a), To(a, {
      validation: "jwt",
      code: Xi.invalid_string,
      message: i.message
    }), r.dirty()) : i.kind === "cidr" ? u9o(t.data, i.version) || (a = this._getOrReturnCtx(t, a), To(a, {
      validation: "cidr",
      code: Xi.invalid_string,
      message: i.message
    }), r.dirty()) : i.kind === "base64" ? i9o.test(t.data) || (a = this._getOrReturnCtx(t, a), To(a, {
      validation: "base64",
      code: Xi.invalid_string,
      message: i.message
    }), r.dirty()) : i.kind === "base64url" ? o9o.test(t.data) || (a = this._getOrReturnCtx(t, a), To(a, {
      validation: "base64url",
      code: Xi.invalid_string,
      message: i.message
    }), r.dirty()) : du.assertNever(i);
    return {
      status: r.value,
      value: t.data
    };
  }
  _regex(t, n, r) {
    return this.refinement(a => t.test(a), {
      validation: n,
      code: Xi.invalid_string,
      ...Ss.errToObj(r)
    });
  }
  _addCheck(t) {
    return new cbe({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  email(t) {
    return this._addCheck({
      kind: "email",
      ...Ss.errToObj(t)
    });
  }
  url(t) {
    return this._addCheck({
      kind: "url",
      ...Ss.errToObj(t)
    });
  }
  emoji(t) {
    return this._addCheck({
      kind: "emoji",
      ...Ss.errToObj(t)
    });
  }
  uuid(t) {
    return this._addCheck({
      kind: "uuid",
      ...Ss.errToObj(t)
    });
  }
  nanoid(t) {
    return this._addCheck({
      kind: "nanoid",
      ...Ss.errToObj(t)
    });
  }
  cuid(t) {
    return this._addCheck({
      kind: "cuid",
      ...Ss.errToObj(t)
    });
  }
  cuid2(t) {
    return this._addCheck({
      kind: "cuid2",
      ...Ss.errToObj(t)
    });
  }
  ulid(t) {
    return this._addCheck({
      kind: "ulid",
      ...Ss.errToObj(t)
    });
  }
  base64(t) {
    return this._addCheck({
      kind: "base64",
      ...Ss.errToObj(t)
    });
  }
  base64url(t) {
    return this._addCheck({
      kind: "base64url",
      ...Ss.errToObj(t)
    });
  }
  jwt(t) {
    return this._addCheck({
      kind: "jwt",
      ...Ss.errToObj(t)
    });
  }
  ip(t) {
    return this._addCheck({
      kind: "ip",
      ...Ss.errToObj(t)
    });
  }
  cidr(t) {
    return this._addCheck({
      kind: "cidr",
      ...Ss.errToObj(t)
    });
  }
  datetime(t) {
    var n, r;
    return typeof t == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      local: !1,
      message: t
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof (t == null ? void 0 : t.precision) > "u" ? null : t == null ? void 0 : t.precision,
      offset: (n = t == null ? void 0 : t.offset) !== null && n !== void 0 ? n : !1,
      local: (r = t == null ? void 0 : t.local) !== null && r !== void 0 ? r : !1,
      ...Ss.errToObj(t == null ? void 0 : t.message)
    });
  }
  date(t) {
    return this._addCheck({
      kind: "date",
      message: t
    });
  }
  time(t) {
    return typeof t == "string" ? this._addCheck({
      kind: "time",
      precision: null,
      message: t
    }) : this._addCheck({
      kind: "time",
      precision: typeof (t == null ? void 0 : t.precision) > "u" ? null : t == null ? void 0 : t.precision,
      ...Ss.errToObj(t == null ? void 0 : t.message)
    });
  }
  duration(t) {
    return this._addCheck({
      kind: "duration",
      ...Ss.errToObj(t)
    });
  }
  regex(t, n) {
    return this._addCheck({
      kind: "regex",
      regex: t,
      ...Ss.errToObj(n)
    });
  }
  includes(t, n) {
    return this._addCheck({
      kind: "includes",
      value: t,
      position: n == null ? void 0 : n.position,
      ...Ss.errToObj(n == null ? void 0 : n.message)
    });
  }
  startsWith(t, n) {
    return this._addCheck({
      kind: "startsWith",
      value: t,
      ...Ss.errToObj(n)
    });
  }
  endsWith(t, n) {
    return this._addCheck({
      kind: "endsWith",
      value: t,
      ...Ss.errToObj(n)
    });
  }
  min(t, n) {
    return this._addCheck({
      kind: "min",
      value: t,
      ...Ss.errToObj(n)
    });
  }
  max(t, n) {
    return this._addCheck({
      kind: "max",
      value: t,
      ...Ss.errToObj(n)
    });
  }
  length(t, n) {
    return this._addCheck({
      kind: "length",
      value: t,
      ...Ss.errToObj(n)
    });
  }
  nonempty(t) {
    return this.min(1, Ss.errToObj(t));
  }
  trim() {
    return new cbe({
      ...this._def,
      checks: [...this._def.checks, {
        kind: "trim"
      }]
    });
  }
  toLowerCase() {
    return new cbe({
      ...this._def,
      checks: [...this._def.checks, {
        kind: "toLowerCase"
      }]
    });
  }
  toUpperCase() {
    return new cbe({
      ...this._def,
      checks: [...this._def.checks, {
        kind: "toUpperCase"
      }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find(t => t.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find(t => t.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find(t => t.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find(t => t.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find(t => t.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find(t => t.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find(t => t.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find(t => t.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find(t => t.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find(t => t.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find(t => t.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find(t => t.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find(t => t.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find(t => t.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find(t => t.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find(t => t.kind === "base64url");
  }
  get minLength() {
    let t = null;
    for (const n of this._def.checks) n.kind === "min" && (t === null || n.value > t) && (t = n.value);
    return t;
  }
  get maxLength() {
    let t = null;
    for (const n of this._def.checks) n.kind === "max" && (t === null || n.value < t) && (t = n.value);
    return t;
  }
};

gue.create = e => {
  var t;
  return new gue({
    checks: [],
    typeName: Sl.ZodString,
    coerce: (t = e == null ? void 0 : e.coerce) !== null && t !== void 0 ? t : !1,
    ...Dc(e)
  });
};

function h9o(e, t) {
  const n = (e.toString().split(".")[1] || "").length,
    r = (t.toString().split(".")[1] || "").length,
    a = n > r ? n : r,
    i = parseInt(e.toFixed(a).replace(".", "")),
    o = parseInt(t.toFixed(a).replace(".", ""));
  return i % o / Math.pow(10, a);
}

var FAe = class d4t extends ed {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(t) {
    if (this._def.coerce && (t.data = Number(t.data)), this._getType(t) !== qo.number) {
      const i = this._getOrReturnCtx(t);
      return To(i, {
        code: Xi.invalid_type,
        expected: qo.number,
        received: i.parsedType
      }), Ll;
    }
    let r;
    const a = new Xk();
    for (const i of this._def.checks) i.kind === "int" ? du.isInteger(t.data) || (r = this._getOrReturnCtx(t, r), To(r, {
      code: Xi.invalid_type,
      expected: "integer",
      received: "float",
      message: i.message
    }), a.dirty()) : i.kind === "min" ? (i.inclusive ? t.data < i.value : t.data <= i.value) && (r = this._getOrReturnCtx(t, r), To(r, {
      code: Xi.too_small,
      minimum: i.value,
      type: "number",
      inclusive: i.inclusive,
      exact: !1,
      message: i.message
    }), a.dirty()) : i.kind === "max" ? (i.inclusive ? t.data > i.value : t.data >= i.value) && (r = this._getOrReturnCtx(t, r), To(r, {
      code: Xi.too_big,
      maximum: i.value,
      type: "number",
      inclusive: i.inclusive,
      exact: !1,
      message: i.message
    }), a.dirty()) : i.kind === "multipleOf" ? h9o(t.data, i.value) !== 0 && (r = this._getOrReturnCtx(t, r), To(r, {
      code: Xi.not_multiple_of,
      multipleOf: i.value,
      message: i.message
    }), a.dirty()) : i.kind === "finite" ? Number.isFinite(t.data) || (r = this._getOrReturnCtx(t, r), To(r, {
      code: Xi.not_finite,
      message: i.message
    }), a.dirty()) : du.assertNever(i);
    return {
      status: a.value,
      value: t.data
    };
  }
  gte(t, n) {
    return this.setLimit("min", t, !0, Ss.toString(n));
  }
  gt(t, n) {
    return this.setLimit("min", t, !1, Ss.toString(n));
  }
  lte(t, n) {
    return this.setLimit("max", t, !0, Ss.toString(n));
  }
  lt(t, n) {
    return this.setLimit("max", t, !1, Ss.toString(n));
  }
  setLimit(t, n, r, a) {
    return new d4t({
      ...this._def,
      checks: [...this._def.checks, {
        kind: t,
        value: n,
        inclusive: r,
        message: Ss.toString(a)
      }]
    });
  }
  _addCheck(t) {
    return new d4t({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  int(t) {
    return this._addCheck({
      kind: "int",
      message: Ss.toString(t)
    });
  }
  positive(t) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: Ss.toString(t)
    });
  }
  negative(t) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: Ss.toString(t)
    });
  }
  nonpositive(t) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: Ss.toString(t)
    });
  }
  nonnegative(t) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: Ss.toString(t)
    });
  }
  multipleOf(t, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: t,
      message: Ss.toString(n)
    });
  }
  finite(t) {
    return this._addCheck({
      kind: "finite",
      message: Ss.toString(t)
    });
  }
  safe(t) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: Ss.toString(t)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: Ss.toString(t)
    });
  }
  get minValue() {
    let t = null;
    for (const n of this._def.checks) n.kind === "min" && (t === null || n.value > t) && (t = n.value);
    return t;
  }
  get maxValue() {
    let t = null;
    for (const n of this._def.checks) n.kind === "max" && (t === null || n.value < t) && (t = n.value);
    return t;
  }
  get isInt() {
    return !!this._def.checks.find(t => t.kind === "int" || t.kind === "multipleOf" && du.isInteger(t.value));
  }
  get isFinite() {
    let t = null,
      n = null;
    for (const r of this._def.checks) {
      if (r.kind === "finite" || r.kind === "int" || r.kind === "multipleOf") return !0;
      r.kind === "min" ? (n === null || r.value > n) && (n = r.value) : r.kind === "max" && (t === null || r.value < t) && (t = r.value);
    }
    return Number.isFinite(n) && Number.isFinite(t);
  }
};

FAe.create = e => new FAe({
  checks: [],
  typeName: Sl.ZodNumber,
  coerce: (e == null ? void 0 : e.coerce) || !1,
  ...Dc(e)
});

var zAe = class u4t extends ed {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(t) {
    if (this._def.coerce) try {
      t.data = BigInt(t.data);
    } catch {
      return this._getInvalidInput(t);
    }
    if (this._getType(t) !== qo.bigint) return this._getInvalidInput(t);
    let r;
    const a = new Xk();
    for (const i of this._def.checks) i.kind === "min" ? (i.inclusive ? t.data < i.value : t.data <= i.value) && (r = this._getOrReturnCtx(t, r), To(r, {
      code: Xi.too_small,
      type: "bigint",
      minimum: i.value,
      inclusive: i.inclusive,
      message: i.message
    }), a.dirty()) : i.kind === "max" ? (i.inclusive ? t.data > i.value : t.data >= i.value) && (r = this._getOrReturnCtx(t, r), To(r, {
      code: Xi.too_big,
      type: "bigint",
      maximum: i.value,
      inclusive: i.inclusive,
      message: i.message
    }), a.dirty()) : i.kind === "multipleOf" ? t.data % i.value !== BigInt(0) && (r = this._getOrReturnCtx(t, r), To(r, {
      code: Xi.not_multiple_of,
      multipleOf: i.value,
      message: i.message
    }), a.dirty()) : du.assertNever(i);
    return {
      status: a.value,
      value: t.data
    };
  }
  _getInvalidInput(t) {
    const n = this._getOrReturnCtx(t);
    return To(n, {
      code: Xi.invalid_type,
      expected: qo.bigint,
      received: n.parsedType
    }), Ll;
  }
  gte(t, n) {
    return this.setLimit("min", t, !0, Ss.toString(n));
  }
  gt(t, n) {
    return this.setLimit("min", t, !1, Ss.toString(n));
  }
  lte(t, n) {
    return this.setLimit("max", t, !0, Ss.toString(n));
  }
  lt(t, n) {
    return this.setLimit("max", t, !1, Ss.toString(n));
  }
  setLimit(t, n, r, a) {
    return new u4t({
      ...this._def,
      checks: [...this._def.checks, {
        kind: t,
        value: n,
        inclusive: r,
        message: Ss.toString(a)
      }]
    });
  }
  _addCheck(t) {
    return new u4t({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  positive(t) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: Ss.toString(t)
    });
  }
  negative(t) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: Ss.toString(t)
    });
  }
  nonpositive(t) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: Ss.toString(t)
    });
  }
  nonnegative(t) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: Ss.toString(t)
    });
  }
  multipleOf(t, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: t,
      message: Ss.toString(n)
    });
  }
  get minValue() {
    let t = null;
    for (const n of this._def.checks) n.kind === "min" && (t === null || n.value > t) && (t = n.value);
    return t;
  }
  get maxValue() {
    let t = null;
    for (const n of this._def.checks) n.kind === "max" && (t === null || n.value < t) && (t = n.value);
    return t;
  }
};

zAe.create = e => {
  var t;
  return new zAe({
    checks: [],
    typeName: Sl.ZodBigInt,
    coerce: (t = e == null ? void 0 : e.coerce) !== null && t !== void 0 ? t : !1,
    ...Dc(e)
  });
};

var UAe = class extends ed {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== qo.boolean) {
      const n = this._getOrReturnCtx(e);
      return To(n, {
        code: Xi.invalid_type,
        expected: qo.boolean,
        received: n.parsedType
      }), Ll;
    }
    return c_(e.data);
  }
};

UAe.create = e => new UAe({
  typeName: Sl.ZodBoolean,
  coerce: (e == null ? void 0 : e.coerce) || !1,
  ...Dc(e)
});

var $Ae = class lAr extends ed {
  _parse(t) {
    if (this._def.coerce && (t.data = new Date(t.data)), this._getType(t) !== qo.date) {
      const i = this._getOrReturnCtx(t);
      return To(i, {
        code: Xi.invalid_type,
        expected: qo.date,
        received: i.parsedType
      }), Ll;
    }
    if (isNaN(t.data.getTime())) {
      const i = this._getOrReturnCtx(t);
      return To(i, {
        code: Xi.invalid_date
      }), Ll;
    }
    const r = new Xk();
    let a;
    for (const i of this._def.checks) i.kind === "min" ? t.data.getTime() < i.value && (a = this._getOrReturnCtx(t, a), To(a, {
      code: Xi.too_small,
      message: i.message,
      inclusive: !0,
      exact: !1,
      minimum: i.value,
      type: "date"
    }), r.dirty()) : i.kind === "max" ? t.data.getTime() > i.value && (a = this._getOrReturnCtx(t, a), To(a, {
      code: Xi.too_big,
      message: i.message,
      inclusive: !0,
      exact: !1,
      maximum: i.value,
      type: "date"
    }), r.dirty()) : du.assertNever(i);
    return {
      status: r.value,
      value: new Date(t.data.getTime())
    };
  }
  _addCheck(t) {
    return new lAr({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  min(t, n) {
    return this._addCheck({
      kind: "min",
      value: t.getTime(),
      message: Ss.toString(n)
    });
  }
  max(t, n) {
    return this._addCheck({
      kind: "max",
      value: t.getTime(),
      message: Ss.toString(n)
    });
  }
  get minDate() {
    let t = null;
    for (const n of this._def.checks) n.kind === "min" && (t === null || n.value > t) && (t = n.value);
    return t != null ? new Date(t) : null;
  }
  get maxDate() {
    let t = null;
    for (const n of this._def.checks) n.kind === "max" && (t === null || n.value < t) && (t = n.value);
    return t != null ? new Date(t) : null;
  }
};

$Ae.create = e => new $Ae({
  checks: [],
  coerce: (e == null ? void 0 : e.coerce) || !1,
  typeName: Sl.ZodDate,
  ...Dc(e)
});

var wGe = class extends ed {
  _parse(e) {
    if (this._getType(e) !== qo.symbol) {
      const n = this._getOrReturnCtx(e);
      return To(n, {
        code: Xi.invalid_type,
        expected: qo.symbol,
        received: n.parsedType
      }), Ll;
    }
    return c_(e.data);
  }
};

wGe.create = e => new wGe({
  typeName: Sl.ZodSymbol,
  ...Dc(e)
});

var GAe = class extends ed {
  _parse(e) {
    if (this._getType(e) !== qo.undefined) {
      const n = this._getOrReturnCtx(e);
      return To(n, {
        code: Xi.invalid_type,
        expected: qo.undefined,
        received: n.parsedType
      }), Ll;
    }
    return c_(e.data);
  }
};

GAe.create = e => new GAe({
  typeName: Sl.ZodUndefined,
  ...Dc(e)
});

var VAe = class extends ed {
  _parse(e) {
    if (this._getType(e) !== qo.null) {
      const n = this._getOrReturnCtx(e);
      return To(n, {
        code: Xi.invalid_type,
        expected: qo.null,
        received: n.parsedType
      }), Ll;
    }
    return c_(e.data);
  }
};

VAe.create = e => new VAe({
  typeName: Sl.ZodNull,
  ...Dc(e)
});

var yue = class extends ed {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return c_(e.data);
  }
};

yue.create = e => new yue({
  typeName: Sl.ZodAny,
  ...Dc(e)
});

var aY = class extends ed {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return c_(e.data);
  }
};

aY.create = e => new aY({
  typeName: Sl.ZodUnknown,
  ...Dc(e)
});

var mD = class extends ed {
  _parse(e) {
    const t = this._getOrReturnCtx(e);
    return To(t, {
      code: Xi.invalid_type,
      expected: qo.never,
      received: t.parsedType
    }), Ll;
  }
};

mD.create = e => new mD({
  typeName: Sl.ZodNever,
  ...Dc(e)
});

var xGe = class extends ed {
  _parse(e) {
    if (this._getType(e) !== qo.undefined) {
      const n = this._getOrReturnCtx(e);
      return To(n, {
        code: Xi.invalid_type,
        expected: qo.void,
        received: n.parsedType
      }), Ll;
    }
    return c_(e.data);
  }
};

xGe.create = e => new xGe({
  typeName: Sl.ZodVoid,
  ...Dc(e)
});

var WJ = class EDe extends ed {
  _parse(t) {
    const {
        ctx: n,
        status: r
      } = this._processInputParams(t),
      a = this._def;
    if (n.parsedType !== qo.array) return To(n, {
      code: Xi.invalid_type,
      expected: qo.array,
      received: n.parsedType
    }), Ll;
    if (a.exactLength !== null) {
      const o = n.data.length > a.exactLength.value,
        s = n.data.length < a.exactLength.value;
      (o || s) && (To(n, {
        code: o ? Xi.too_big : Xi.too_small,
        minimum: s ? a.exactLength.value : void 0,
        maximum: o ? a.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: a.exactLength.message
      }), r.dirty());
    }
    if (a.minLength !== null && n.data.length < a.minLength.value && (To(n, {
      code: Xi.too_small,
      minimum: a.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: a.minLength.message
    }), r.dirty()), a.maxLength !== null && n.data.length > a.maxLength.value && (To(n, {
      code: Xi.too_big,
      maximum: a.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: a.maxLength.message
    }), r.dirty()), n.common.async) return Promise.all([...n.data].map((o, s) => a.type._parseAsync(new JP(n, o, n.path, s)))).then(o => Xk.mergeArray(r, o));
    const i = [...n.data].map((o, s) => a.type._parseSync(new JP(n, o, n.path, s)));
    return Xk.mergeArray(r, i);
  }
  get element() {
    return this._def.type;
  }
  min(t, n) {
    return new EDe({
      ...this._def,
      minLength: {
        value: t,
        message: Ss.toString(n)
      }
    });
  }
  max(t, n) {
    return new EDe({
      ...this._def,
      maxLength: {
        value: t,
        message: Ss.toString(n)
      }
    });
  }
  length(t, n) {
    return new EDe({
      ...this._def,
      exactLength: {
        value: t,
        message: Ss.toString(n)
      }
    });
  }
  nonempty(t) {
    return this.min(1, t);
  }
};

WJ.create = (e, t) => new WJ({
  type: e,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: Sl.ZodArray,
  ...Dc(t)
});

function Qne(e) {
  if (e instanceof dI) {
    const t = {};
    for (const n in e.shape) {
      const r = e.shape[n];
      t[n] = fP.create(Qne(r));
    }
    return new dI({
      ...e._def,
      shape: () => t
    });
  } else return e instanceof WJ ? new WJ({
    ...e._def,
    type: Qne(e.element)
  }) : e instanceof fP ? fP.create(Qne(e.unwrap())) : e instanceof T$ ? T$.create(Qne(e.unwrap())) : e instanceof E$ ? E$.create(e.items.map(t => Qne(t))) : e;
}

var dI = class cC extends ed {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null) return this._cached;
    const t = this._def.shape(),
      n = du.objectKeys(t);
    return this._cached = {
      shape: t,
      keys: n
    };
  }
  _parse(t) {
    if (this._getType(t) !== qo.object) {
      const d = this._getOrReturnCtx(t);
      return To(d, {
        code: Xi.invalid_type,
        expected: qo.object,
        received: d.parsedType
      }), Ll;
    }
    const {
        status: r,
        ctx: a
      } = this._processInputParams(t),
      {
        shape: i,
        keys: o
      } = this._getCached(),
      s = [];
    if (!(this._def.catchall instanceof mD && this._def.unknownKeys === "strip")) for (const d in a.data) o.includes(d) || s.push(d);
    const l = [];
    for (const d of o) {
      const u = i[d],
        h = a.data[d];
      l.push({
        key: {
          status: "valid",
          value: d
        },
        value: u._parse(new JP(a, h, a.path, d)),
        alwaysSet: d in a.data
      });
    }
    if (this._def.catchall instanceof mD) {
      const d = this._def.unknownKeys;
      if (d === "passthrough") for (const u of s) l.push({
        key: {
          status: "valid",
          value: u
        },
        value: {
          status: "valid",
          value: a.data[u]
        }
      });else if (d === "strict") s.length > 0 && (To(a, {
        code: Xi.unrecognized_keys,
        keys: s
      }), r.dirty());else if (d !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const d = this._def.catchall;
      for (const u of s) {
        const h = a.data[u];
        l.push({
          key: {
            status: "valid",
            value: u
          },
          value: d._parse(new JP(a, h, a.path, u)),
          alwaysSet: u in a.data
        });
      }
    }
    return a.common.async ? Promise.resolve().then(async () => {
      const d = [];
      for (const u of l) {
        const h = await u.key,
          p = await u.value;
        d.push({
          key: h,
          value: p,
          alwaysSet: u.alwaysSet
        });
      }
      return d;
    }).then(d => Xk.mergeObjectSync(r, d)) : Xk.mergeObjectSync(r, l);
  }
  get shape() {
    return this._def.shape();
  }
  strict(t) {
    return Ss.errToObj, new cC({
      ...this._def,
      unknownKeys: "strict",
      ...(t !== void 0 ? {
        errorMap: (n, r) => {
          var a, i, o, s;
          const l = (o = (i = (a = this._def).errorMap) === null || i === void 0 ? void 0 : i.call(a, n, r).message) !== null && o !== void 0 ? o : r.defaultError;
          return n.code === "unrecognized_keys" ? {
            message: (s = Ss.errToObj(t).message) !== null && s !== void 0 ? s : l
          } : {
            message: l
          };
        }
      } : {})
    });
  }
  strip() {
    return new cC({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new cC({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  extend(t) {
    return new cC({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...t
      })
    });
  }
  merge(t) {
    return new cC({
      unknownKeys: t._def.unknownKeys,
      catchall: t._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...t._def.shape()
      }),
      typeName: Sl.ZodObject
    });
  }
  setKey(t, n) {
    return this.augment({
      [t]: n
    });
  }
  catchall(t) {
    return new cC({
      ...this._def,
      catchall: t
    });
  }
  pick(t) {
    const n = {};
    return du.objectKeys(t).forEach(r => {
      t[r] && this.shape[r] && (n[r] = this.shape[r]);
    }), new cC({
      ...this._def,
      shape: () => n
    });
  }
  omit(t) {
    const n = {};
    return du.objectKeys(this.shape).forEach(r => {
      t[r] || (n[r] = this.shape[r]);
    }), new cC({
      ...this._def,
      shape: () => n
    });
  }
  deepPartial() {
    return Qne(this);
  }
  partial(t) {
    const n = {};
    return du.objectKeys(this.shape).forEach(r => {
      const a = this.shape[r];
      t && !t[r] ? n[r] = a : n[r] = a.optional();
    }), new cC({
      ...this._def,
      shape: () => n
    });
  }
  required(t) {
    const n = {};
    return du.objectKeys(this.shape).forEach(r => {
      if (t && !t[r]) n[r] = this.shape[r];else {
        let i = this.shape[r];
        for (; i instanceof fP;) i = i._def.innerType;
        n[r] = i;
      }
    }), new cC({
      ...this._def,
      shape: () => n
    });
  }
  keyof() {
    return mAr(du.objectKeys(this.shape));
  }
};

dI.create = (e, t) => new dI({
  shape: () => e,
  unknownKeys: "strip",
  catchall: mD.create(),
  typeName: Sl.ZodObject,
  ...Dc(t)
});

dI.strictCreate = (e, t) => new dI({
  shape: () => e,
  unknownKeys: "strict",
  catchall: mD.create(),
  typeName: Sl.ZodObject,
  ...Dc(t)
});

dI.lazycreate = (e, t) => new dI({
  shape: e,
  unknownKeys: "strip",
  catchall: mD.create(),
  typeName: Sl.ZodObject,
  ...Dc(t)
});

var HAe = class extends ed {
  _parse(e) {
    const {
        ctx: t
      } = this._processInputParams(e),
      n = this._def.options;
    function r(a) {
      for (const o of a) if (o.result.status === "valid") return o.result;
      for (const o of a) if (o.result.status === "dirty") return t.common.issues.push(...o.ctx.common.issues), o.result;
      const i = a.map(o => new HE(o.ctx.common.issues));
      return To(t, {
        code: Xi.invalid_union,
        unionErrors: i
      }), Ll;
    }
    if (t.common.async) return Promise.all(n.map(async a => {
      const i = {
        ...t,
        common: {
          ...t.common,
          issues: []
        },
        parent: null
      };
      return {
        result: await a._parseAsync({
          data: t.data,
          path: t.path,
          parent: i
        }),
        ctx: i
      };
    })).then(r);
    {
      let a;
      const i = [];
      for (const s of n) {
        const l = {
            ...t,
            common: {
              ...t.common,
              issues: []
            },
            parent: null
          },
          d = s._parseSync({
            data: t.data,
            path: t.path,
            parent: l
          });
        if (d.status === "valid") return d;
        d.status === "dirty" && !a && (a = {
          result: d,
          ctx: l
        }), l.common.issues.length && i.push(l.common.issues);
      }
      if (a) return t.common.issues.push(...a.ctx.common.issues), a.result;
      const o = i.map(s => new HE(s));
      return To(t, {
        code: Xi.invalid_union,
        unionErrors: o
      }), Ll;
    }
  }
  get options() {
    return this._def.options;
  }
};

HAe.create = (e, t) => new HAe({
  options: e,
  typeName: Sl.ZodUnion,
  ...Dc(t)
});

var kR = e => e instanceof qAe ? kR(e.schema) : e instanceof bT ? kR(e.innerType()) : e instanceof KAe ? [e.value] : e instanceof IEe ? e.options : e instanceof QAe ? du.objectValues(e.enum) : e instanceof YAe ? kR(e._def.innerType) : e instanceof GAe ? [void 0] : e instanceof VAe ? [null] : e instanceof fP ? [void 0, ...kR(e.unwrap())] : e instanceof T$ ? [null, ...kR(e.unwrap())] : e instanceof jGt || e instanceof JAe ? kR(e.unwrap()) : e instanceof XAe ? kR(e._def.innerType) : [],
  cAr = class dAr extends ed {
    _parse(t) {
      const {
        ctx: n
      } = this._processInputParams(t);
      if (n.parsedType !== qo.object) return To(n, {
        code: Xi.invalid_type,
        expected: qo.object,
        received: n.parsedType
      }), Ll;
      const r = this.discriminator,
        a = n.data[r],
        i = this.optionsMap.get(a);
      return i ? n.common.async ? i._parseAsync({
        data: n.data,
        path: n.path,
        parent: n
      }) : i._parseSync({
        data: n.data,
        path: n.path,
        parent: n
      }) : (To(n, {
        code: Xi.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [r]
      }), Ll);
    }
    get discriminator() {
      return this._def.discriminator;
    }
    get options() {
      return this._def.options;
    }
    get optionsMap() {
      return this._def.optionsMap;
    }
    static create(t, n, r) {
      const a = new Map();
      for (const i of n) {
        const o = kR(i.shape[t]);
        if (!o.length) throw new Error(`A discriminator value for key \`${t}\` could not be extracted from all schema options`);
        for (const s of o) {
          if (a.has(s)) throw new Error(`Discriminator property ${String(t)} has duplicate value ${String(s)}`);
          a.set(s, i);
        }
      }
      return new dAr({
        typeName: Sl.ZodDiscriminatedUnion,
        discriminator: t,
        options: n,
        optionsMap: a,
        ...Dc(r)
      });
    }
  };

function h4t(e, t) {
  const n = GR(e),
    r = GR(t);
  if (e === t) return {
    valid: !0,
    data: e
  };
  if (n === qo.object && r === qo.object) {
    const a = du.objectKeys(t),
      i = du.objectKeys(e).filter(s => a.indexOf(s) !== -1),
      o = {
        ...e,
        ...t
      };
    for (const s of i) {
      const l = h4t(e[s], t[s]);
      if (!l.valid) return {
        valid: !1
      };
      o[s] = l.data;
    }
    return {
      valid: !0,
      data: o
    };
  } else if (n === qo.array && r === qo.array) {
    if (e.length !== t.length) return {
      valid: !1
    };
    const a = [];
    for (let i = 0; i < e.length; i++) {
      const o = e[i],
        s = t[i],
        l = h4t(o, s);
      if (!l.valid) return {
        valid: !1
      };
      a.push(l.data);
    }
    return {
      valid: !0,
      data: a
    };
  } else return n === qo.date && r === qo.date && +e == +t ? {
    valid: !0,
    data: e
  } : {
    valid: !1
  };
}

var WAe = class extends ed {
  _parse(e) {
    const {
        status: t,
        ctx: n
      } = this._processInputParams(e),
      r = (a, i) => {
        if (l4t(a) || l4t(i)) return Ll;
        const o = h4t(a.value, i.value);
        return o.valid ? ((c4t(a) || c4t(i)) && t.dirty(), {
          status: t.value,
          value: o.data
        }) : (To(n, {
          code: Xi.invalid_intersection_types
        }), Ll);
      };
    return n.common.async ? Promise.all([this._def.left._parseAsync({
      data: n.data,
      path: n.path,
      parent: n
    }), this._def.right._parseAsync({
      data: n.data,
      path: n.path,
      parent: n
    })]).then(([a, i]) => r(a, i)) : r(this._def.left._parseSync({
      data: n.data,
      path: n.path,
      parent: n
    }), this._def.right._parseSync({
      data: n.data,
      path: n.path,
      parent: n
    }));
  }
};

WAe.create = (e, t, n) => new WAe({
  left: e,
  right: t,
  typeName: Sl.ZodIntersection,
  ...Dc(n)
});

var E$ = class uAr extends ed {
  _parse(t) {
    const {
      status: n,
      ctx: r
    } = this._processInputParams(t);
    if (r.parsedType !== qo.array) return To(r, {
      code: Xi.invalid_type,
      expected: qo.array,
      received: r.parsedType
    }), Ll;
    if (r.data.length < this._def.items.length) return To(r, {
      code: Xi.too_small,
      minimum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), Ll;
    !this._def.rest && r.data.length > this._def.items.length && (To(r, {
      code: Xi.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), n.dirty());
    const i = [...r.data].map((o, s) => {
      const l = this._def.items[s] || this._def.rest;
      return l ? l._parse(new JP(r, o, r.path, s)) : null;
    }).filter(o => !!o);
    return r.common.async ? Promise.all(i).then(o => Xk.mergeArray(n, o)) : Xk.mergeArray(n, i);
  }
  get items() {
    return this._def.items;
  }
  rest(t) {
    return new uAr({
      ...this._def,
      rest: t
    });
  }
};

E$.create = (e, t) => {
  if (!Array.isArray(e)) throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new E$({
    items: e,
    typeName: Sl.ZodTuple,
    rest: null,
    ...Dc(t)
  });
};

var hAr = class p4t extends ed {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(t) {
      const {
        status: n,
        ctx: r
      } = this._processInputParams(t);
      if (r.parsedType !== qo.object) return To(r, {
        code: Xi.invalid_type,
        expected: qo.object,
        received: r.parsedType
      }), Ll;
      const a = [],
        i = this._def.keyType,
        o = this._def.valueType;
      for (const s in r.data) a.push({
        key: i._parse(new JP(r, s, r.path, s)),
        value: o._parse(new JP(r, r.data[s], r.path, s)),
        alwaysSet: s in r.data
      });
      return r.common.async ? Xk.mergeObjectAsync(n, a) : Xk.mergeObjectSync(n, a);
    }
    get element() {
      return this._def.valueType;
    }
    static create(t, n, r) {
      return n instanceof ed ? new p4t({
        keyType: t,
        valueType: n,
        typeName: Sl.ZodRecord,
        ...Dc(r)
      }) : new p4t({
        keyType: gue.create(),
        valueType: t,
        typeName: Sl.ZodRecord,
        ...Dc(n)
      });
    }
  },
  _Ge = class extends ed {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(e) {
      const {
        status: t,
        ctx: n
      } = this._processInputParams(e);
      if (n.parsedType !== qo.map) return To(n, {
        code: Xi.invalid_type,
        expected: qo.map,
        received: n.parsedType
      }), Ll;
      const r = this._def.keyType,
        a = this._def.valueType,
        i = [...n.data.entries()].map(([o, s], l) => ({
          key: r._parse(new JP(n, o, n.path, [l, "key"])),
          value: a._parse(new JP(n, s, n.path, [l, "value"]))
        }));
      if (n.common.async) {
        const o = new Map();
        return Promise.resolve().then(async () => {
          for (const s of i) {
            const l = await s.key,
              d = await s.value;
            if (l.status === "aborted" || d.status === "aborted") return Ll;
            (l.status === "dirty" || d.status === "dirty") && t.dirty(), o.set(l.value, d.value);
          }
          return {
            status: t.value,
            value: o
          };
        });
      } else {
        const o = new Map();
        for (const s of i) {
          const l = s.key,
            d = s.value;
          if (l.status === "aborted" || d.status === "aborted") return Ll;
          (l.status === "dirty" || d.status === "dirty") && t.dirty(), o.set(l.value, d.value);
        }
        return {
          status: t.value,
          value: o
        };
      }
    }
  };

_Ge.create = (e, t, n) => new _Ge({
  valueType: t,
  keyType: e,
  typeName: Sl.ZodMap,
  ...Dc(n)
});

var kGe = class m4t extends ed {
  _parse(t) {
    const {
      status: n,
      ctx: r
    } = this._processInputParams(t);
    if (r.parsedType !== qo.set) return To(r, {
      code: Xi.invalid_type,
      expected: qo.set,
      received: r.parsedType
    }), Ll;
    const a = this._def;
    a.minSize !== null && r.data.size < a.minSize.value && (To(r, {
      code: Xi.too_small,
      minimum: a.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: a.minSize.message
    }), n.dirty()), a.maxSize !== null && r.data.size > a.maxSize.value && (To(r, {
      code: Xi.too_big,
      maximum: a.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: a.maxSize.message
    }), n.dirty());
    const i = this._def.valueType;
    function o(l) {
      const d = new Set();
      for (const u of l) {
        if (u.status === "aborted") return Ll;
        u.status === "dirty" && n.dirty(), d.add(u.value);
      }
      return {
        status: n.value,
        value: d
      };
    }
    const s = [...r.data.values()].map((l, d) => i._parse(new JP(r, l, r.path, d)));
    return r.common.async ? Promise.all(s).then(l => o(l)) : o(s);
  }
  min(t, n) {
    return new m4t({
      ...this._def,
      minSize: {
        value: t,
        message: Ss.toString(n)
      }
    });
  }
  max(t, n) {
    return new m4t({
      ...this._def,
      maxSize: {
        value: t,
        message: Ss.toString(n)
      }
    });
  }
  size(t, n) {
    return this.min(t, n).max(t, n);
  }
  nonempty(t) {
    return this.min(1, t);
  }
};

kGe.create = (e, t) => new kGe({
  valueType: e,
  minSize: null,
  maxSize: null,
  typeName: Sl.ZodSet,
  ...Dc(t)
});

var pAr = class TDe extends ed {
    constructor() {
      super(...arguments), this.validate = this.implement;
    }
    _parse(t) {
      const {
        ctx: n
      } = this._processInputParams(t);
      if (n.parsedType !== qo.function) return To(n, {
        code: Xi.invalid_type,
        expected: qo.function,
        received: n.parsedType
      }), Ll;
      function r(s, l) {
        return bGe({
          data: s,
          path: n.path,
          errorMaps: [n.common.contextualErrorMap, n.schemaErrorMap, yGe(), fue].filter(d => !!d),
          issueData: {
            code: Xi.invalid_arguments,
            argumentsError: l
          }
        });
      }
      function a(s, l) {
        return bGe({
          data: s,
          path: n.path,
          errorMaps: [n.common.contextualErrorMap, n.schemaErrorMap, yGe(), fue].filter(d => !!d),
          issueData: {
            code: Xi.invalid_return_type,
            returnTypeError: l
          }
        });
      }
      const i = {
          errorMap: n.common.contextualErrorMap
        },
        o = n.data;
      if (this._def.returns instanceof bue) {
        const s = this;
        return c_(async function (...l) {
          const d = new HE([]),
            u = await s._def.args.parseAsync(l, i).catch(m => {
              throw d.addIssue(r(l, m)), d;
            }),
            h = await Reflect.apply(o, this, u);
          return await s._def.returns._def.type.parseAsync(h, i).catch(m => {
            throw d.addIssue(a(h, m)), d;
          });
        });
      } else {
        const s = this;
        return c_(function (...l) {
          const d = s._def.args.safeParse(l, i);
          if (!d.success) throw new HE([r(l, d.error)]);
          const u = Reflect.apply(o, this, d.data),
            h = s._def.returns.safeParse(u, i);
          if (!h.success) throw new HE([a(u, h.error)]);
          return h.data;
        });
      }
    }
    parameters() {
      return this._def.args;
    }
    returnType() {
      return this._def.returns;
    }
    args(...t) {
      return new TDe({
        ...this._def,
        args: E$.create(t).rest(aY.create())
      });
    }
    returns(t) {
      return new TDe({
        ...this._def,
        returns: t
      });
    }
    implement(t) {
      return this.parse(t);
    }
    strictImplement(t) {
      return this.parse(t);
    }
    static create(t, n, r) {
      return new TDe({
        args: t || E$.create([]).rest(aY.create()),
        returns: n || aY.create(),
        typeName: Sl.ZodFunction,
        ...Dc(r)
      });
    }
  },
  qAe = class extends ed {
    get schema() {
      return this._def.getter();
    }
    _parse(e) {
      const {
        ctx: t
      } = this._processInputParams(e);
      return this._def.getter()._parse({
        data: t.data,
        path: t.path,
        parent: t
      });
    }
  };

qAe.create = (e, t) => new qAe({
  getter: e,
  typeName: Sl.ZodLazy,
  ...Dc(t)
});

var KAe = class extends ed {
  _parse(e) {
    if (e.data !== this._def.value) {
      const t = this._getOrReturnCtx(e);
      return To(t, {
        received: t.data,
        code: Xi.invalid_literal,
        expected: this._def.value
      }), Ll;
    }
    return {
      status: "valid",
      value: e.data
    };
  }
  get value() {
    return this._def.value;
  }
};

KAe.create = (e, t) => new KAe({
  value: e,
  typeName: Sl.ZodLiteral,
  ...Dc(t)
});

function mAr(e, t) {
  return new IEe({
    values: e,
    typeName: Sl.ZodEnum,
    ...Dc(t)
  });
}

var IEe = class f4t extends ed {
  constructor() {
    super(...arguments), sbe.set(this, void 0);
  }
  _parse(t) {
    if (typeof t.data != "string") {
      const n = this._getOrReturnCtx(t),
        r = this._def.values;
      return To(n, {
        expected: du.joinValues(r),
        received: n.parsedType,
        code: Xi.invalid_type
      }), Ll;
    }
    if (vGe(this, sbe) || aAr(this, sbe, new Set(this._def.values)), !vGe(this, sbe).has(t.data)) {
      const n = this._getOrReturnCtx(t),
        r = this._def.values;
      return To(n, {
        received: n.data,
        code: Xi.invalid_enum_value,
        options: r
      }), Ll;
    }
    return c_(t.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const t = {};
    for (const n of this._def.values) t[n] = n;
    return t;
  }
  get Values() {
    const t = {};
    for (const n of this._def.values) t[n] = n;
    return t;
  }
  get Enum() {
    const t = {};
    for (const n of this._def.values) t[n] = n;
    return t;
  }
  extract(t, n = this._def) {
    return f4t.create(t, {
      ...this._def,
      ...n
    });
  }
  exclude(t, n = this._def) {
    return f4t.create(this.options.filter(r => !t.includes(r)), {
      ...this._def,
      ...n
    });
  }
};

sbe = new WeakMap();

IEe.create = mAr;

var QAe = class extends ed {
  constructor() {
    super(...arguments), lbe.set(this, void 0);
  }
  _parse(e) {
    const t = du.getValidEnumValues(this._def.values),
      n = this._getOrReturnCtx(e);
    if (n.parsedType !== qo.string && n.parsedType !== qo.number) {
      const r = du.objectValues(t);
      return To(n, {
        expected: du.joinValues(r),
        received: n.parsedType,
        code: Xi.invalid_type
      }), Ll;
    }
    if (vGe(this, lbe) || aAr(this, lbe, new Set(du.getValidEnumValues(this._def.values))), !vGe(this, lbe).has(e.data)) {
      const r = du.objectValues(t);
      return To(n, {
        received: n.data,
        code: Xi.invalid_enum_value,
        options: r
      }), Ll;
    }
    return c_(e.data);
  }
  get enum() {
    return this._def.values;
  }
};

lbe = new WeakMap();

QAe.create = (e, t) => new QAe({
  values: e,
  typeName: Sl.ZodNativeEnum,
  ...Dc(t)
});

var bue = class extends ed {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const {
      ctx: t
    } = this._processInputParams(e);
    if (t.parsedType !== qo.promise && t.common.async === !1) return To(t, {
      code: Xi.invalid_type,
      expected: qo.promise,
      received: t.parsedType
    }), Ll;
    const n = t.parsedType === qo.promise ? t.data : Promise.resolve(t.data);
    return c_(n.then(r => this._def.type.parseAsync(r, {
      path: t.path,
      errorMap: t.common.contextualErrorMap
    })));
  }
};

bue.create = (e, t) => new bue({
  type: e,
  typeName: Sl.ZodPromise,
  ...Dc(t)
});

var bT = class extends ed {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === Sl.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const {
        status: t,
        ctx: n
      } = this._processInputParams(e),
      r = this._def.effect || null,
      a = {
        addIssue: i => {
          To(n, i), i.fatal ? t.abort() : t.dirty();
        },
        get path() {
          return n.path;
        }
      };
    if (a.addIssue = a.addIssue.bind(a), r.type === "preprocess") {
      const i = r.transform(n.data, a);
      if (n.common.async) return Promise.resolve(i).then(async o => {
        if (t.value === "aborted") return Ll;
        const s = await this._def.schema._parseAsync({
          data: o,
          path: n.path,
          parent: n
        });
        return s.status === "aborted" ? Ll : s.status === "dirty" || t.value === "dirty" ? dae(s.value) : s;
      });
      {
        if (t.value === "aborted") return Ll;
        const o = this._def.schema._parseSync({
          data: i,
          path: n.path,
          parent: n
        });
        return o.status === "aborted" ? Ll : o.status === "dirty" || t.value === "dirty" ? dae(o.value) : o;
      }
    }
    if (r.type === "refinement") {
      const i = o => {
        const s = r.refinement(o, a);
        if (n.common.async) return Promise.resolve(s);
        if (s instanceof Promise) throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return o;
      };
      if (n.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return o.status === "aborted" ? Ll : (o.status === "dirty" && t.dirty(), i(o.value), {
          status: t.value,
          value: o.value
        });
      } else return this._def.schema._parseAsync({
        data: n.data,
        path: n.path,
        parent: n
      }).then(o => o.status === "aborted" ? Ll : (o.status === "dirty" && t.dirty(), i(o.value).then(() => ({
        status: t.value,
        value: o.value
      }))));
    }
    if (r.type === "transform") if (n.common.async === !1) {
      const i = this._def.schema._parseSync({
        data: n.data,
        path: n.path,
        parent: n
      });
      if (!HJ(i)) return i;
      const o = r.transform(i.value, a);
      if (o instanceof Promise) throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
      return {
        status: t.value,
        value: o
      };
    } else return this._def.schema._parseAsync({
      data: n.data,
      path: n.path,
      parent: n
    }).then(i => HJ(i) ? Promise.resolve(r.transform(i.value, a)).then(o => ({
      status: t.value,
      value: o
    })) : i);
    du.assertNever(r);
  }
};

bT.create = (e, t, n) => new bT({
  schema: e,
  typeName: Sl.ZodEffects,
  effect: t,
  ...Dc(n)
});

bT.createWithPreprocess = (e, t, n) => new bT({
  schema: t,
  effect: {
    type: "preprocess",
    transform: e
  },
  typeName: Sl.ZodEffects,
  ...Dc(n)
});

var fP = class extends ed {
  _parse(e) {
    return this._getType(e) === qo.undefined ? c_(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
};

fP.create = (e, t) => new fP({
  innerType: e,
  typeName: Sl.ZodOptional,
  ...Dc(t)
});

var T$ = class extends ed {
  _parse(e) {
    return this._getType(e) === qo.null ? c_(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
};

T$.create = (e, t) => new T$({
  innerType: e,
  typeName: Sl.ZodNullable,
  ...Dc(t)
});

var YAe = class extends ed {
  _parse(e) {
    const {
      ctx: t
    } = this._processInputParams(e);
    let n = t.data;
    return t.parsedType === qo.undefined && (n = this._def.defaultValue()), this._def.innerType._parse({
      data: n,
      path: t.path,
      parent: t
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};

YAe.create = (e, t) => new YAe({
  innerType: e,
  typeName: Sl.ZodDefault,
  defaultValue: typeof t.default == "function" ? t.default : () => t.default,
  ...Dc(t)
});

var XAe = class extends ed {
  _parse(e) {
    const {
        ctx: t
      } = this._processInputParams(e),
      n = {
        ...t,
        common: {
          ...t.common,
          issues: []
        }
      },
      r = this._def.innerType._parse({
        data: n.data,
        path: n.path,
        parent: {
          ...n
        }
      });
    return BAe(r) ? r.then(a => ({
      status: "valid",
      value: a.status === "valid" ? a.value : this._def.catchValue({
        get error() {
          return new HE(n.common.issues);
        },
        input: n.data
      })
    })) : {
      status: "valid",
      value: r.status === "valid" ? r.value : this._def.catchValue({
        get error() {
          return new HE(n.common.issues);
        },
        input: n.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
};

XAe.create = (e, t) => new XAe({
  innerType: e,
  typeName: Sl.ZodCatch,
  catchValue: typeof t.catch == "function" ? t.catch : () => t.catch,
  ...Dc(t)
});

var AGe = class extends ed {
  _parse(e) {
    if (this._getType(e) !== qo.nan) {
      const n = this._getOrReturnCtx(e);
      return To(n, {
        code: Xi.invalid_type,
        expected: qo.nan,
        received: n.parsedType
      }), Ll;
    }
    return {
      status: "valid",
      value: e.data
    };
  }
};

AGe.create = e => new AGe({
  typeName: Sl.ZodNaN,
  ...Dc(e)
});

var p9o = Symbol("zod_brand"),
  jGt = class extends ed {
    _parse(e) {
      const {
          ctx: t
        } = this._processInputParams(e),
        n = t.data;
      return this._def.type._parse({
        data: n,
        path: t.path,
        parent: t
      });
    }
    unwrap() {
      return this._def.type;
    }
  },
  DGt = class fAr extends ed {
    _parse(t) {
      const {
        status: n,
        ctx: r
      } = this._processInputParams(t);
      if (r.common.async) return (async () => {
        const i = await this._def.in._parseAsync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return i.status === "aborted" ? Ll : i.status === "dirty" ? (n.dirty(), dae(i.value)) : this._def.out._parseAsync({
          data: i.value,
          path: r.path,
          parent: r
        });
      })();
      {
        const a = this._def.in._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return a.status === "aborted" ? Ll : a.status === "dirty" ? (n.dirty(), {
          status: "dirty",
          value: a.value
        }) : this._def.out._parseSync({
          data: a.value,
          path: r.path,
          parent: r
        });
      }
    }
    static create(t, n) {
      return new fAr({
        in: t,
        out: n,
        typeName: Sl.ZodPipeline
      });
    }
  },
  JAe = class extends ed {
    _parse(e) {
      const t = this._def.innerType._parse(e),
        n = r => (HJ(r) && (r.value = Object.freeze(r.value)), r);
      return BAe(t) ? t.then(r => n(r)) : n(t);
    }
    unwrap() {
      return this._def.innerType;
    }
  };

JAe.create = (e, t) => new JAe({
  innerType: e,
  typeName: Sl.ZodReadonly,
  ...Dc(t)
});

function D2n(e, t) {
  const n = typeof e == "function" ? e(t) : typeof e == "string" ? {
    message: e
  } : e;
  return typeof n == "string" ? {
    message: n
  } : n;
}

function gAr(e, t = {}, n) {
  return e ? yue.create().superRefine((r, a) => {
    var i, o;
    const s = e(r);
    if (s instanceof Promise) return s.then(l => {
      var d, u;
      if (!l) {
        const h = D2n(t, r),
          p = (u = (d = h.fatal) !== null && d !== void 0 ? d : n) !== null && u !== void 0 ? u : !0;
        a.addIssue({
          code: "custom",
          ...h,
          fatal: p
        });
      }
    });
    if (!s) {
      const l = D2n(t, r),
        d = (o = (i = l.fatal) !== null && i !== void 0 ? i : n) !== null && o !== void 0 ? o : !0;
      a.addIssue({
        code: "custom",
        ...l,
        fatal: d
      });
    }
  }) : yue.create();
}

var m9o = {
    object: dI.lazycreate
  },
  Sl;

(function (e) {
  e.ZodString = "ZodString", e.ZodNumber = "ZodNumber", e.ZodNaN = "ZodNaN", e.ZodBigInt = "ZodBigInt", e.ZodBoolean = "ZodBoolean", e.ZodDate = "ZodDate", e.ZodSymbol = "ZodSymbol", e.ZodUndefined = "ZodUndefined", e.ZodNull = "ZodNull", e.ZodAny = "ZodAny", e.ZodUnknown = "ZodUnknown", e.ZodNever = "ZodNever", e.ZodVoid = "ZodVoid", e.ZodArray = "ZodArray", e.ZodObject = "ZodObject", e.ZodUnion = "ZodUnion", e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", e.ZodIntersection = "ZodIntersection", e.ZodTuple = "ZodTuple", e.ZodRecord = "ZodRecord", e.ZodMap = "ZodMap", e.ZodSet = "ZodSet", e.ZodFunction = "ZodFunction", e.ZodLazy = "ZodLazy", e.ZodLiteral = "ZodLiteral", e.ZodEnum = "ZodEnum", e.ZodEffects = "ZodEffects", e.ZodNativeEnum = "ZodNativeEnum", e.ZodOptional = "ZodOptional", e.ZodNullable = "ZodNullable", e.ZodDefault = "ZodDefault", e.ZodCatch = "ZodCatch", e.ZodPromise = "ZodPromise", e.ZodBranded = "ZodBranded", e.ZodPipeline = "ZodPipeline", e.ZodReadonly = "ZodReadonly";
})(Sl || (Sl = {}));

var f9o = (e, t = {
    message: `Input not instance of ${e.name}`
  }) => gAr(n => n instanceof e, t),
  yAr = gue.create,
  bAr = FAe.create,
  g9o = AGe.create,
  y9o = zAe.create,
  vAr = UAe.create,
  b9o = $Ae.create,
  v9o = wGe.create,
  w9o = GAe.create,
  x9o = VAe.create,
  _9o = yue.create,
  k9o = aY.create,
  A9o = mD.create,
  S9o = xGe.create,
  I9o = WJ.create,
  C9o = dI.create,
  E9o = dI.strictCreate,
  T9o = HAe.create,
  M9o = cAr.create,
  P9o = WAe.create,
  R9o = E$.create,
  N9o = hAr.create,
  j9o = _Ge.create,
  D9o = kGe.create,
  L9o = pAr.create,
  O9o = qAe.create,
  B9o = KAe.create,
  F9o = IEe.create,
  z9o = QAe.create,
  U9o = bue.create,
  L2n = bT.create,
  $9o = fP.create,
  G9o = T$.create,
  V9o = bT.createWithPreprocess,
  H9o = DGt.create,
  W9o = () => yAr().optional(),
  q9o = () => bAr().optional(),
  K9o = () => vAr().optional(),
  Q9o = {
    string: e => gue.create({
      ...e,
      coerce: !0
    }),
    number: e => FAe.create({
      ...e,
      coerce: !0
    }),
    boolean: e => UAe.create({
      ...e,
      coerce: !0
    }),
    bigint: e => zAe.create({
      ...e,
      coerce: !0
    }),
    date: e => $Ae.create({
      ...e,
      coerce: !0
    })
  },
  Y9o = Ll,
  u1 = Object.freeze({
    __proto__: null,
    defaultErrorMap: fue,
    setErrorMap: VPo,
    getErrorMap: yGe,
    makeIssue: bGe,
    EMPTY_PATH: HPo,
    addIssueToContext: To,
    ParseStatus: Xk,
    INVALID: Ll,
    DIRTY: dae,
    OK: c_,
    isAborted: l4t,
    isDirty: c4t,
    isValid: HJ,
    isAsync: BAe,
    get util() {
      return du;
    },
    get objectUtil() {
      return s4t;
    },
    ZodParsedType: qo,
    getParsedType: GR,
    ZodType: ed,
    datetimeRegex: sAr,
    ZodString: gue,
    ZodNumber: FAe,
    ZodBigInt: zAe,
    ZodBoolean: UAe,
    ZodDate: $Ae,
    ZodSymbol: wGe,
    ZodUndefined: GAe,
    ZodNull: VAe,
    ZodAny: yue,
    ZodUnknown: aY,
    ZodNever: mD,
    ZodVoid: xGe,
    ZodArray: WJ,
    ZodObject: dI,
    ZodUnion: HAe,
    ZodDiscriminatedUnion: cAr,
    ZodIntersection: WAe,
    ZodTuple: E$,
    ZodRecord: hAr,
    ZodMap: _Ge,
    ZodSet: kGe,
    ZodFunction: pAr,
    ZodLazy: qAe,
    ZodLiteral: KAe,
    ZodEnum: IEe,
    ZodNativeEnum: QAe,
    ZodPromise: bue,
    ZodEffects: bT,
    ZodTransformer: bT,
    ZodOptional: fP,
    ZodNullable: T$,
    ZodDefault: YAe,
    ZodCatch: XAe,
    ZodNaN: AGe,
    BRAND: p9o,
    ZodBranded: jGt,
    ZodPipeline: DGt,
    ZodReadonly: JAe,
    custom: gAr,
    Schema: ed,
    ZodSchema: ed,
    late: m9o,
    get ZodFirstPartyTypeKind() {
      return Sl;
    },
    coerce: Q9o,
    any: _9o,
    array: I9o,
    bigint: y9o,
    boolean: vAr,
    date: b9o,
    discriminatedUnion: M9o,
    effect: L2n,
    enum: F9o,
    function: L9o,
    instanceof: f9o,
    intersection: P9o,
    lazy: O9o,
    literal: B9o,
    map: j9o,
    nan: g9o,
    nativeEnum: z9o,
    never: A9o,
    null: x9o,
    nullable: G9o,
    number: bAr,
    object: C9o,
    oboolean: K9o,
    onumber: q9o,
    optional: $9o,
    ostring: W9o,
    pipeline: H9o,
    preprocess: V9o,
    promise: U9o,
    record: N9o,
    set: D9o,
    strictObject: E9o,
    string: yAr,
    symbol: v9o,
    transformer: L2n,
    tuple: R9o,
    undefined: w9o,
    union: T9o,
    unknown: k9o,
    void: S9o,
    NEVER: Y9o,
    ZodIssueCode: Xi,
    quotelessJson: GPo,
    ZodError: HE
  }),
  O2n = {
    name: "@imgly/background-removal",
    version: "1.7.0"
  },
  X9o = u1.object({
    publicPath: u1.string().optional().describe("The public path to the wasm files and the onnx model.").default("https://staticimgly.com/@imgly/background-removal-data/${PACKAGE_VERSION}/dist/").transform(e => e.replace("${PACKAGE_NAME}", O2n.name).replace("${PACKAGE_VERSION}", O2n.version)),
    debug: u1.boolean().default(!1).describe("Whether to enable debug logging."),
    rescale: u1.boolean().default(!0).describe("Whether to rescale the image."),
    device: u1.enum(["cpu", "gpu"]).default("cpu").describe("The device to run the model on."),
    proxyToWorker: u1.boolean().default(!1).describe("Whether to proxy inference to a web worker."),
    fetchArgs: u1.any().default({}).describe("Arguments to pass to fetch when loading the model."),
    progress: u1.function().args(u1.string(), u1.number(), u1.number()).returns(u1.void()).describe("Progress callback.").optional(),
    model: u1.preprocess(e => {
      switch (e) {
        case "large":
          return "isnet";
        case "small":
          return "isnet_quint8";
        case "medium":
          return "isnet_fp16";
        default:
          return e;
      }
    }, u1.enum(["isnet", "isnet_fp16", "isnet_quint8"])).default("medium"),
    output: u1.object({
      format: u1.enum(["image/png", "image/jpeg", "image/webp", "image/x-rgba8", "image/x-alpha8"]).default("image/png"),
      quality: u1.number().default(.8)
    }).default({})
  }).default({}).transform(e => (e.debug && console.log("Config:", e), e.debug && !e.progress && (e.progress = e.progress ?? ((t, n, r) => {
    console.debug(`Downloading ${t}: ${n} of ${r}`);
  }), crossOriginIsolated || e.debug && console.debug("Cross-Origin-Isolated is not enabled. Performance will be degraded. Please see  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer.")), e));

function wAr(e) {
  return X9o.parse(e ?? {});
}

var J9o = LZe(OZe());

async function Z9o(e) {
  e.debug && console.debug("Loading model...", e.model);
  const t = e.model,
    r = await (await Zkr(`/models/${t}`, e)).arrayBuffer();
  return await UPo(r, e);
}

async function eRo(e) {
  e = wAr(e);
  const t = await Z9o(e);
  return {
    config: e,
    session: {
      base: t
    }
  };
}

async function LGt(e, t, n) {
  const [a, i, o] = e.shape,
    s = !1;
  let l = o4t(e, 1024, 1024, s);
  const d = OPo(l);
  let u = await $Po(n.base, [["input", d]], ["output"], t),
    h = (0, J9o.default)(u[0].data, [1024, 1024, 1]),
    p = BPo(h);
  return t.rescale ? (p = o4t(p, i, a, s), [p, e]) : [p, l];
}

var UZe = PPo(eRo, e => JSON.stringify(e));

async function tRo(e) {
  await UZe(e);
}

async function nRo(e, t) {
  var p, m, f, y;
  const {
    config: n,
    session: r
  } = await UZe(t);
  n.progress && n.progress("compute:decode", 0, 4);
  const a = await OAe(e, n);
  (p = n.progress) == null || p.call(n, "compute:inference", 1, 4);
  const [i, o] = await LGt(a, n, r);
  (m = n.progress) == null || m.call(n, "compute:mask", 2, 4);
  const s = o,
    [l, d] = s.shape,
    u = l * d;
  for (let b = 0; b < u; b += 1) s.data[4 * b + 3] = i.data[b];
  (f = n.progress) == null || f.call(n, "compute:encode", 3, 4);
  const h = await zZe(s, n.output.quality, n.output.format);
  return (y = n.progress) == null || y.call(n, "compute:encode", 4, 4), h;
}

async function rRo(e, t) {
  const {
      config: n,
      session: r
    } = await UZe(t),
    a = await OAe(e, n),
    [i, o] = await LGt(a, n, r),
    s = o,
    [l, d, u] = s.shape,
    h = l * d;
  for (let m = 0; m < h; m += 1) s.data[4 * m + 3] = 255 - i.data[m];
  return await zZe(s, n.output.quality, n.output.format);
}

var aRo = xAr;

async function xAr(e, t) {
  const {
      config: n,
      session: r
    } = await UZe(t),
    a = await OAe(e, n);
  let [i, o, s] = a.shape;
  const [l, d] = await LGt(a, n, r),
    u = o * i,
    h = a;
  for (let m = 0; m < u; m += 1) {
    const f = 4 * m;
    let y = l.data[m];
    h.data[f] = 255, h.data[f + 1] = 255, h.data[f + 2] = 255, h.data[f + 3] = y;
  }
  return await zZe(h, n.output.quality, n.output.format);
}

async function iRo(e, t, n) {
  n = wAr(n);
  const r = await OAe(e, n),
    [a, i, o] = r.shape,
    s = await OAe(t, n),
    [l, d, u] = s.shape,
    h = l !== a || d !== i ? o4t(s, i, a) : s,
    p = i * a;
  for (let f = 0; f < p; f += 1) {
    const y = o * f,
      b = u * f;
    r.data[y + 3] = h.data[b + 3];
  }
  return await zZe(r, n.output.quality, n.output.format);
}

/*! Bundled license information:

is-buffer/index.js:
  (*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)
*/const _Ar = Object.freeze(Object.defineProperty({
  __proto__: null,
  alphamask: aRo,
  applySegmentationMask: iRo,
  preload: tRo,
  removeBackground: nRo,
  removeForeground: rRo,
  segmentForeground: xAr
}, Symbol.toStringTag, {
  value: "Module"
}));

var oRo = {
  trailer: 59
};

function kAr(e = 256) {
  let t = 0,
    n = new Uint8Array(e);
  return {
    get buffer() {
      return n.buffer;
    },
    reset() {
      t = 0;
    },
    bytesView() {
      return n.subarray(0, t);
    },
    bytes() {
      return n.slice(0, t);
    },
    writeByte(a) {
      r(t + 1), n[t] = a, t++;
    },
    writeBytes(a, i = 0, o = a.length) {
      r(t + o);
      for (let s = 0; s < o; s++) n[t++] = a[s + i];
    },
    writeBytesView(a, i = 0, o = a.byteLength) {
      r(t + o), n.set(a.subarray(i, i + o), t), t += o;
    }
  };
  function r(a) {
    var i = n.length;
    if (i >= a) return;
    a = Math.max(a, i * (i < 1024 * 1024 ? 2 : 1.125) >>> 0), i != 0 && (a = Math.max(a, 256));
    let o = n;
    n = new Uint8Array(a), t > 0 && n.set(o.subarray(0, t), 0);
  }
}

var Out = 12,
  B2n = 5003,
  sRo = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535];

function lRo(e, t, n, r, a = kAr(512), i = new Uint8Array(256), o = new Int32Array(B2n), s = new Int32Array(B2n)) {
  let l = o.length,
    d = Math.max(2, r);
  i.fill(0), s.fill(0), o.fill(-1);
  let u = 0,
    h = 0,
    p = d + 1,
    m = p,
    f = !1,
    y = m,
    b = (1 << y) - 1,
    v = 1 << p - 1,
    _ = v + 1,
    w = v + 2,
    k = 0,
    A = n[0],
    S = 0;
  for (let E = l; E < 65536; E *= 2) ++S;
  S = 8 - S, a.writeByte(d), I(v);
  let C = n.length;
  for (let E = 1; E < C; E++) e: {
    let M = n[E],
      T = (M << Out) + A,
      P = M << S ^ A;
    if (o[P] === T) {
      A = s[P];
      break e;
    }
    let R = P === 0 ? 1 : l - P;
    for (; o[P] >= 0;) if (P -= R, P < 0 && (P += l), o[P] === T) {
      A = s[P];
      break e;
    }
    I(A), A = M, w < 1 << Out ? (s[P] = w++, o[P] = T) : (o.fill(-1), w = v + 2, f = !0, I(v));
  }
  return I(A), I(_), a.writeByte(0), a.bytesView();
  function I(E) {
    for (u &= sRo[h], h > 0 ? u |= E << h : u = E, h += y; h >= 8;) i[k++] = u & 255, k >= 254 && (a.writeByte(k), a.writeBytesView(i, 0, k), k = 0), u >>= 8, h -= 8;
    if ((w > b || f) && (f ? (y = m, b = (1 << y) - 1, f = !1) : (++y, b = y === Out ? 1 << y : (1 << y) - 1)), E == _) {
      for (; h > 0;) i[k++] = u & 255, k >= 254 && (a.writeByte(k), a.writeBytesView(i, 0, k), k = 0), u >>= 8, h -= 8;
      k > 0 && (a.writeByte(k), a.writeBytesView(i, 0, k), k = 0);
    }
  }
}

var cRo = lRo;

function AAr(e, t, n) {
  return e << 8 & 63488 | t << 2 & 992 | n >> 3;
}

function SAr(e, t, n, r) {
  return e >> 4 | t & 240 | (n & 240) << 4 | (r & 240) << 8;
}

function IAr(e, t, n) {
  return e >> 4 << 8 | t & 240 | n >> 4;
}

function h9e(e, t, n) {
  return e < t ? t : e > n ? n : e;
}

function MDe(e) {
  return e * e;
}

function F2n(e, t, n) {
  var r = 0,
    a = 1e100;
  let i = e[t],
    o = i.cnt;
  i.ac;
  let s = i.rc,
    l = i.gc,
    d = i.bc;
  for (var u = i.fw; u != 0; u = e[u].fw) {
    let p = e[u],
      m = p.cnt,
      f = o * m / (o + m);
    if (!(f >= a)) {
      var h = 0;
      h += f * MDe(p.rc - s), !(h >= a) && (h += f * MDe(p.gc - l), !(h >= a) && (h += f * MDe(p.bc - d), !(h >= a) && (a = h, r = u)));
    }
  }
  i.err = a, i.nn = r;
}

function But() {
  return {
    ac: 0,
    rc: 0,
    gc: 0,
    bc: 0,
    cnt: 0,
    nn: 0,
    fw: 0,
    bk: 0,
    tm: 0,
    mtm: 0,
    err: 0
  };
}

function dRo(e, t) {
  let n = t === "rgb444" ? 4096 : 65536,
    r = Array(n),
    a = e.length;
  if (t === "rgba4444") for (let i = 0; i < a; ++i) {
    let o = e[i],
      s = o >> 24 & 255,
      l = o >> 16 & 255,
      d = o >> 8 & 255,
      u = o & 255,
      h = SAr(u, d, l, s),
      p = h in r ? r[h] : r[h] = But();
    p.rc += u, p.gc += d, p.bc += l, p.ac += s, p.cnt++;
  } else if (t === "rgb444") for (let i = 0; i < a; ++i) {
    let o = e[i],
      s = o >> 16 & 255,
      l = o >> 8 & 255,
      d = o & 255,
      u = IAr(d, l, s),
      h = u in r ? r[u] : r[u] = But();
    h.rc += d, h.gc += l, h.bc += s, h.cnt++;
  } else for (let i = 0; i < a; ++i) {
    let o = e[i],
      s = o >> 16 & 255,
      l = o >> 8 & 255,
      d = o & 255,
      u = AAr(d, l, s),
      h = u in r ? r[u] : r[u] = But();
    h.rc += d, h.gc += l, h.bc += s, h.cnt++;
  }
  return r;
}

function uRo(e, t, n = {}) {
  let {
    format: r = "rgb565",
    clearAlpha: a = !0,
    clearAlphaColor: i = 0,
    clearAlphaThreshold: o = 0,
    oneBitAlpha: s = !1
  } = n;
  if (!e || !e.buffer || !(e instanceof Uint8Array) && !(e instanceof Uint8ClampedArray)) throw Error("quantize() expected RGBA Uint8Array data");
  let l = new Uint32Array(e.buffer),
    d = n.useSqrt !== !1,
    u = r === "rgba4444",
    h = dRo(l, r),
    p = h.length,
    m = p - 1,
    f = new Uint32Array(p + 1);
  for (var y = 0, b = 0; b < p; ++b) {
    let j = h[b];
    if (j != null) {
      var v = 1 / j.cnt;
      u && (j.ac *= v), j.rc *= v, j.gc *= v, j.bc *= v, h[y++] = j;
    }
  }
  MDe(t) / y < .022 && (d = !1);
  for (var b = 0; b < y - 1; ++b) h[b].fw = b + 1, h[b + 1].bk = b, d && (h[b].cnt = Math.sqrt(h[b].cnt));
  d && (h[b].cnt = Math.sqrt(h[b].cnt));
  var _, w, k;
  for (b = 0; b < y; ++b) {
    F2n(h, b);
    var A = h[b].err;
    for (w = ++f[0]; w > 1 && (k = w >> 1, !(h[_ = f[k]].err <= A)); w = k) f[w] = _;
    f[w] = b;
  }
  var S = y - t;
  for (b = 0; b < S;) {
    for (var C;;) {
      var I = f[1];
      if (C = h[I], C.tm >= C.mtm && h[C.nn].mtm <= C.tm) break;
      C.mtm == m ? I = f[1] = f[f[0]--] : (F2n(h, I), C.tm = b);
      var A = h[I].err;
      for (w = 1; (k = w + w) <= f[0] && (k < f[0] && h[f[k]].err > h[f[k + 1]].err && k++, !(A <= h[_ = f[k]].err)); w = k) f[w] = _;
      f[w] = I;
    }
    var E = h[C.nn],
      M = C.cnt,
      T = E.cnt,
      v = 1 / (M + T);
    u && (C.ac = v * (M * C.ac + T * E.ac)), C.rc = v * (M * C.rc + T * E.rc), C.gc = v * (M * C.gc + T * E.gc), C.bc = v * (M * C.bc + T * E.bc), C.cnt += E.cnt, C.mtm = ++b, h[E.bk].fw = E.fw, h[E.fw].bk = E.bk, E.mtm = m;
  }
  let P = [];
  var R = 0;
  for (b = 0;; ++R) {
    let j = h9e(Math.round(h[b].rc), 0, 255),
      B = h9e(Math.round(h[b].gc), 0, 255),
      F = h9e(Math.round(h[b].bc), 0, 255),
      N = 255;
    u && (N = h9e(Math.round(h[b].ac), 0, 255), s && (N = N <= (typeof s == "number" ? s : 127) ? 0 : 255), a && N <= o && (j = B = F = i, N = 0));
    let G = u ? [j, B, F, N] : [j, B, F];
    if (hRo(P, G) || P.push(G), (b = h[b].fw) == 0) break;
  }
  return P;
}

function hRo(e, t) {
  for (let n = 0; n < e.length; n++) {
    let r = e[n],
      a = r[0] === t[0] && r[1] === t[1] && r[2] === t[2],
      i = r.length >= 4 && t.length >= 4 ? r[3] === t[3] : !0;
    if (a && i) return !0;
  }
  return !1;
}

function pRo(e, t, n = "rgb565") {
  if (!e || !e.buffer || !(e instanceof Uint8Array) && !(e instanceof Uint8ClampedArray)) throw Error("quantize() expected RGBA Uint8Array data");
  if (t.length > 256) throw Error("applyPalette() only works with 256 colors or less");
  let r = new Uint32Array(e.buffer),
    a = r.length,
    i = n === "rgb444" ? 4096 : 65536,
    o = new Uint8Array(a),
    s = Array(i);
  if (n === "rgba4444") for (let l = 0; l < a; l++) {
    let d = r[l],
      u = d >> 24 & 255,
      h = d >> 16 & 255,
      p = d >> 8 & 255,
      m = d & 255,
      f = SAr(m, p, h, u);
    o[l] = f in s ? s[f] : s[f] = mRo(m, p, h, u, t);
  } else {
    let l = n === "rgb444" ? IAr : AAr;
    for (let d = 0; d < a; d++) {
      let u = r[d],
        h = u >> 16 & 255,
        p = u >> 8 & 255,
        m = u & 255,
        f = l(m, p, h);
      o[d] = f in s ? s[f] : s[f] = fRo(m, p, h, t);
    }
  }
  return o;
}

function mRo(e, t, n, r, a) {
  let i = 0,
    o = 1e100;
  for (let s = 0; s < a.length; s++) {
    let l = a[s],
      d = l[3],
      u = GW(d - r);
    if (u > o) continue;
    let h = l[0];
    if (u += GW(h - e), u > o) continue;
    let p = l[1];
    if (u += GW(p - t), u > o) continue;
    let m = l[2];
    u += GW(m - n), !(u > o) && (o = u, i = s);
  }
  return i;
}

function fRo(e, t, n, r) {
  let a = 0,
    i = 1e100;
  for (let o = 0; o < r.length; o++) {
    let s = r[o],
      l = s[0],
      d = GW(l - e);
    if (d > i) continue;
    let u = s[1];
    if (d += GW(u - t), d > i) continue;
    let h = s[2];
    d += GW(h - n), !(d > i) && (i = d, a = o);
  }
  return a;
}

function GW(e) {
  return e * e;
}

function gRo(e = {}) {
  let {
      initialCapacity: t = 4096,
      auto: n = !0
    } = e,
    r = kAr(t),
    a = 5003,
    i = new Uint8Array(256),
    o = new Int32Array(a),
    s = new Int32Array(a),
    l = !1;
  return {
    reset() {
      r.reset(), l = !1;
    },
    finish() {
      r.writeByte(oRo.trailer);
    },
    bytes() {
      return r.bytes();
    },
    bytesView() {
      return r.bytesView();
    },
    get buffer() {
      return r.buffer;
    },
    get stream() {
      return r;
    },
    writeHeader: d,
    writeFrame(u, h, p, m = {}) {
      let {
          transparent: f = !1,
          transparentIndex: y = 0,
          delay: b = 0,
          palette: v = null,
          repeat: _ = 0,
          colorDepth: w = 8,
          dispose: k = -1
        } = m,
        A = !1;
      if (n ? l || (A = !0, d(), l = !0) : A = !!m.first, h = Math.max(0, Math.floor(h)), p = Math.max(0, Math.floor(p)), A) {
        if (!v) throw Error("First frame must include a { palette } option");
        bRo(r, h, p, v, w), z2n(r, v), _ >= 0 && vRo(r, _);
      }
      yRo(r, k, Math.round(b / 10), f, y);
      let S = !!v && !A;
      wRo(r, h, p, S ? v : null), S && z2n(r, v), xRo(r, u, h, p, w, i, o, s);
    }
  };
  function d() {
    CAr(r, "GIF89a");
  }
}

function yRo(e, t, n, r, a) {
  e.writeByte(33), e.writeByte(249), e.writeByte(4), a < 0 && (a = 0, r = !1);
  var i, o;
  r ? (i = 1, o = 2) : (i = 0, o = 0), t >= 0 && (o = t & 7), o <<= 2, e.writeByte(o | 0 | i), uz(e, n), e.writeByte(a || 0), e.writeByte(0);
}

function bRo(e, t, n, r, a = 8) {
  let i = OGt(r.length) - 1,
    o = a - 1 << 4 | 128 | i;
  uz(e, t), uz(e, n), e.writeBytes([o, 0, 0]);
}

function vRo(e, t) {
  e.writeByte(33), e.writeByte(255), e.writeByte(11), CAr(e, "NETSCAPE2.0"), e.writeByte(3), e.writeByte(1), uz(e, t), e.writeByte(0);
}

function z2n(e, t) {
  let n = 1 << OGt(t.length);
  for (let r = 0; r < n; r++) {
    let a = [0, 0, 0];
    r < t.length && (a = t[r]), e.writeByte(a[0]), e.writeByte(a[1]), e.writeByte(a[2]);
  }
}

function wRo(e, t, n, r) {
  if (e.writeByte(44), uz(e, 0), uz(e, 0), uz(e, t), uz(e, n), r) {
    let a = OGt(r.length) - 1;
    e.writeByte(128 | a);
  } else e.writeByte(0);
}

function xRo(e, t, n, r, a = 8, i, o, s) {
  cRo(n, r, t, a, e, i, o, s);
}

function uz(e, t) {
  e.writeByte(t & 255), e.writeByte(t >> 8 & 255);
}

function CAr(e, t) {
  for (var n = 0; n < t.length; n++) e.writeByte(t.charCodeAt(n));
}

function OGt(e) {
  return Math.max(Math.ceil(Math.log2(e)), 1);
}

const _Ro = Object.freeze(Object.defineProperty({
  __proto__: null,
  GIFEncoder: gRo,
  applyPalette: pRo,
  quantize: uRo
}, Symbol.toStringTag, {
  value: "Module"
}));

/*!
 * ONNX Runtime Web v1.21.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */var BGt = Object.defineProperty,
  kRo = Object.getOwnPropertyDescriptor,
  ARo = Object.getOwnPropertyNames,
  SRo = Object.prototype.hasOwnProperty,
  IRo = (e => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, {
    get: (t, n) => (typeof require < "u" ? require : t)[n]
  }) : e)(function (e) {
    if (typeof require < "u") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + e + '" is not supported');
  }),
  Wi = (e, t) => () => (e && (t = e(e = 0)), t),
  CEe = (e, t) => {
    for (var n in t) BGt(e, n, {
      get: t[n],
      enumerable: !0
    });
  },
  CRo = (e, t, n, r) => {
    if (t && typeof t == "object" || typeof t == "function") for (let a of ARo(t)) !SRo.call(e, a) && a !== n && BGt(e, a, {
      get: () => t[a],
      enumerable: !(r = kRo(t, a)) || r.enumerable
    });
    return e;
  },
  SGe = e => CRo(BGt({}, "__esModule", {
    value: !0
  }), e),
  Mge,
  ZL,
  VW,
  U2n,
  EAr,
  TAr = Wi(() => {
    Mge = new Map(), ZL = [], VW = (e, t, n) => {
      if (t && typeof t.init == "function" && typeof t.createInferenceSessionHandler == "function") {
        let r = Mge.get(e);
        if (r === void 0) Mge.set(e, {
          backend: t,
          priority: n
        });else {
          if (r.priority > n) return;
          if (r.priority === n && r.backend !== t) throw new Error(`cannot register backend "${e}" using priority ${n}`);
        }
        if (n >= 0) {
          let a = ZL.indexOf(e);
          a !== -1 && ZL.splice(a, 1);
          for (let i = 0; i < ZL.length; i++) if (Mge.get(ZL[i]).priority <= n) {
            ZL.splice(i, 0, e);
            return;
          }
          ZL.push(e);
        }
        return;
      }
      throw new TypeError("not a valid backend");
    }, U2n = async e => {
      let t = Mge.get(e);
      if (!t) return "backend not found.";
      if (t.initialized) return t.backend;
      if (t.aborted) return t.error;
      {
        let n = !!t.initPromise;
        try {
          return n || (t.initPromise = t.backend.init(e)), await t.initPromise, t.initialized = !0, t.backend;
        } catch (r) {
          return n || (t.error = `${r}`, t.aborted = !0), t.error;
        } finally {
          delete t.initPromise;
        }
      }
    }, EAr = async e => {
      let t = e.executionProviders || [],
        n = t.map(l => typeof l == "string" ? l : l.name),
        r = n.length === 0 ? ZL : n,
        a,
        i = [],
        o = new Set();
      for (let l of r) {
        let d = await U2n(l);
        typeof d == "string" ? i.push({
          name: l,
          err: d
        }) : (a || (a = d), a === d && o.add(l));
      }
      if (!a) throw new Error(`no available backend found. ERR: ${i.map(l => `[${l.name}] ${l.err}`).join(", ")}`);
      for (let {
        name: l,
        err: d
      } of i) n.includes(l) && console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${d}`);
      let s = t.filter(l => o.has(typeof l == "string" ? l : l.name));
      return [a, new Proxy(e, {
        get: (l, d) => d === "executionProviders" ? s : Reflect.get(l, d)
      })];
    };
  }),
  ERo = Wi(() => {
    TAr();
  }),
  MAr,
  TRo = Wi(() => {
    MAr = "1.21.0";
  }),
  Fut,
  _4,
  PAr = Wi(() => {
    TRo(), Fut = "warning", _4 = {
      wasm: {},
      webgl: {},
      webgpu: {},
      versions: {
        common: MAr
      },
      set logLevel(e) {
        if (e !== void 0) {
          if (typeof e != "string" || ["verbose", "info", "warning", "error", "fatal"].indexOf(e) === -1) throw new Error(`Unsupported logging level: ${e}`);
          Fut = e;
        }
      },
      get logLevel() {
        return Fut;
      }
    }, Object.defineProperty(_4, "logLevel", {
      enumerable: !0
    });
  }),
  um,
  MRo = Wi(() => {
    PAr(), um = _4;
  }),
  RAr,
  NAr,
  PRo = Wi(() => {
    RAr = (e, t) => {
      let n = typeof document < "u" ? document.createElement("canvas") : new OffscreenCanvas(1, 1);
      n.width = e.dims[3], n.height = e.dims[2];
      let r = n.getContext("2d");
      if (r != null) {
        let a, i;
        (t == null ? void 0 : t.tensorLayout) !== void 0 && t.tensorLayout === "NHWC" ? (a = e.dims[2], i = e.dims[3]) : (a = e.dims[3], i = e.dims[2]);
        let o = (t == null ? void 0 : t.format) !== void 0 ? t.format : "RGB",
          s = t == null ? void 0 : t.norm,
          l,
          d;
        s === void 0 || s.mean === void 0 ? l = [255, 255, 255, 255] : typeof s.mean == "number" ? l = [s.mean, s.mean, s.mean, s.mean] : (l = [s.mean[0], s.mean[1], s.mean[2], 0], s.mean[3] !== void 0 && (l[3] = s.mean[3])), s === void 0 || s.bias === void 0 ? d = [0, 0, 0, 0] : typeof s.bias == "number" ? d = [s.bias, s.bias, s.bias, s.bias] : (d = [s.bias[0], s.bias[1], s.bias[2], 0], s.bias[3] !== void 0 && (d[3] = s.bias[3]));
        let u = i * a,
          h = 0,
          p = u,
          m = u * 2,
          f = -1;
        o === "RGBA" ? (h = 0, p = u, m = u * 2, f = u * 3) : o === "RGB" ? (h = 0, p = u, m = u * 2) : o === "RBG" && (h = 0, m = u, p = u * 2);
        for (let y = 0; y < i; y++) for (let b = 0; b < a; b++) {
          let v = (e.data[h++] - d[0]) * l[0],
            _ = (e.data[p++] - d[1]) * l[1],
            w = (e.data[m++] - d[2]) * l[2],
            k = f === -1 ? 255 : (e.data[f++] - d[3]) * l[3];
          r.fillStyle = "rgba(" + v + "," + _ + "," + w + "," + k + ")", r.fillRect(b, y, 1, 1);
        }
        if ("toDataURL" in n) return n.toDataURL();
        throw new Error("toDataURL is not supported");
      } else throw new Error("Can not access image data");
    }, NAr = (e, t) => {
      let n = typeof document < "u" ? document.createElement("canvas").getContext("2d") : new OffscreenCanvas(1, 1).getContext("2d"),
        r;
      if (n != null) {
        let a, i, o;
        (t == null ? void 0 : t.tensorLayout) !== void 0 && t.tensorLayout === "NHWC" ? (a = e.dims[2], i = e.dims[1], o = e.dims[3]) : (a = e.dims[3], i = e.dims[2], o = e.dims[1]);
        let s = t !== void 0 && t.format !== void 0 ? t.format : "RGB",
          l = t == null ? void 0 : t.norm,
          d,
          u;
        l === void 0 || l.mean === void 0 ? d = [255, 255, 255, 255] : typeof l.mean == "number" ? d = [l.mean, l.mean, l.mean, l.mean] : (d = [l.mean[0], l.mean[1], l.mean[2], 255], l.mean[3] !== void 0 && (d[3] = l.mean[3])), l === void 0 || l.bias === void 0 ? u = [0, 0, 0, 0] : typeof l.bias == "number" ? u = [l.bias, l.bias, l.bias, l.bias] : (u = [l.bias[0], l.bias[1], l.bias[2], 0], l.bias[3] !== void 0 && (u[3] = l.bias[3]));
        let h = i * a;
        if (t !== void 0 && (t.format !== void 0 && o === 4 && t.format !== "RGBA" || o === 3 && t.format !== "RGB" && t.format !== "BGR")) throw new Error("Tensor format doesn't match input tensor dims");
        let p = 4,
          m = 0,
          f = 1,
          y = 2,
          b = 3,
          v = 0,
          _ = h,
          w = h * 2,
          k = -1;
        s === "RGBA" ? (v = 0, _ = h, w = h * 2, k = h * 3) : s === "RGB" ? (v = 0, _ = h, w = h * 2) : s === "RBG" && (v = 0, w = h, _ = h * 2), r = n.createImageData(a, i);
        for (let A = 0; A < i * a; m += p, f += p, y += p, b += p, A++) r.data[m] = (e.data[v++] - u[0]) * d[0], r.data[f] = (e.data[_++] - u[1]) * d[1], r.data[y] = (e.data[w++] - u[2]) * d[2], r.data[b] = k === -1 ? 255 : (e.data[k++] - u[3]) * d[3];
      } else throw new Error("Can not access image data");
      return r;
    };
  }),
  p9e,
  jAr,
  DAr,
  LAr,
  OAr,
  BAr,
  RRo = Wi(() => {
    FGt(), p9e = (e, t) => {
      if (e === void 0) throw new Error("Image buffer must be defined");
      if (t.height === void 0 || t.width === void 0) throw new Error("Image height and width must be defined");
      if (t.tensorLayout === "NHWC") throw new Error("NHWC Tensor layout is not supported yet");
      let {
          height: n,
          width: r
        } = t,
        a = t.norm ?? {
          mean: 255,
          bias: 0
        },
        i,
        o;
      typeof a.mean == "number" ? i = [a.mean, a.mean, a.mean, a.mean] : i = [a.mean[0], a.mean[1], a.mean[2], a.mean[3] ?? 255], typeof a.bias == "number" ? o = [a.bias, a.bias, a.bias, a.bias] : o = [a.bias[0], a.bias[1], a.bias[2], a.bias[3] ?? 0];
      let s = t.format !== void 0 ? t.format : "RGBA",
        l = t.tensorFormat !== void 0 && t.tensorFormat !== void 0 ? t.tensorFormat : "RGB",
        d = n * r,
        u = l === "RGBA" ? new Float32Array(d * 4) : new Float32Array(d * 3),
        h = 4,
        p = 0,
        m = 1,
        f = 2,
        y = 3,
        b = 0,
        v = d,
        _ = d * 2,
        w = -1;
      s === "RGB" && (h = 3, p = 0, m = 1, f = 2, y = -1), l === "RGBA" ? w = d * 3 : l === "RBG" ? (b = 0, _ = d, v = d * 2) : l === "BGR" && (_ = 0, v = d, b = d * 2);
      for (let k = 0; k < d; k++, p += h, f += h, m += h, y += h) u[b++] = (e[p] + o[0]) / i[0], u[v++] = (e[m] + o[1]) / i[1], u[_++] = (e[f] + o[2]) / i[2], w !== -1 && y !== -1 && (u[w++] = (e[y] + o[3]) / i[3]);
      return l === "RGBA" ? new bS("float32", u, [1, 4, n, r]) : new bS("float32", u, [1, 3, n, r]);
    }, jAr = async (e, t) => {
      let n = typeof HTMLImageElement < "u" && e instanceof HTMLImageElement,
        r = typeof ImageData < "u" && e instanceof ImageData,
        a = typeof ImageBitmap < "u" && e instanceof ImageBitmap,
        i = typeof e == "string",
        o,
        s = t ?? {},
        l = () => {
          if (typeof document < "u") return document.createElement("canvas");
          if (typeof OffscreenCanvas < "u") return new OffscreenCanvas(1, 1);
          throw new Error("Canvas is not supported");
        },
        d = u => typeof HTMLCanvasElement < "u" && u instanceof HTMLCanvasElement || u instanceof OffscreenCanvas ? u.getContext("2d") : null;
      if (n) {
        let u = l();
        u.width = e.width, u.height = e.height;
        let h = d(u);
        if (h != null) {
          let p = e.height,
            m = e.width;
          if (t !== void 0 && t.resizedHeight !== void 0 && t.resizedWidth !== void 0 && (p = t.resizedHeight, m = t.resizedWidth), t !== void 0) {
            if (s = t, t.tensorFormat !== void 0) throw new Error("Image input config format must be RGBA for HTMLImageElement");
            s.tensorFormat = "RGBA", s.height = p, s.width = m;
          } else s.tensorFormat = "RGBA", s.height = p, s.width = m;
          h.drawImage(e, 0, 0), o = h.getImageData(0, 0, m, p).data;
        } else throw new Error("Can not access image data");
      } else if (r) {
        let u, h;
        if (t !== void 0 && t.resizedWidth !== void 0 && t.resizedHeight !== void 0 ? (u = t.resizedHeight, h = t.resizedWidth) : (u = e.height, h = e.width), t !== void 0 && (s = t), s.format = "RGBA", s.height = u, s.width = h, t !== void 0) {
          let p = l();
          p.width = h, p.height = u;
          let m = d(p);
          if (m != null) m.putImageData(e, 0, 0), o = m.getImageData(0, 0, h, u).data;else throw new Error("Can not access image data");
        } else o = e.data;
      } else if (a) {
        if (t === void 0) throw new Error("Please provide image config with format for Imagebitmap");
        let u = l();
        u.width = e.width, u.height = e.height;
        let h = d(u);
        if (h != null) {
          let p = e.height,
            m = e.width;
          return h.drawImage(e, 0, 0, m, p), o = h.getImageData(0, 0, m, p).data, s.height = p, s.width = m, p9e(o, s);
        } else throw new Error("Can not access image data");
      } else {
        if (i) return new Promise((u, h) => {
          let p = l(),
            m = d(p);
          if (!e || !m) return h();
          let f = new Image();
          f.crossOrigin = "Anonymous", f.src = e, f.onload = () => {
            p.width = f.width, p.height = f.height, m.drawImage(f, 0, 0, p.width, p.height);
            let y = m.getImageData(0, 0, p.width, p.height);
            s.height = p.height, s.width = p.width, u(p9e(y.data, s));
          };
        });
        throw new Error("Input data provided is not supported - aborted tensor creation");
      }
      if (o !== void 0) return p9e(o, s);
      throw new Error("Input data provided is not supported - aborted tensor creation");
    }, DAr = (e, t) => {
      let {
          width: n,
          height: r,
          download: a,
          dispose: i
        } = t,
        o = [1, r, n, 4];
      return new bS({
        location: "texture",
        type: "float32",
        texture: e,
        dims: o,
        download: a,
        dispose: i
      });
    }, LAr = (e, t) => {
      let {
        dataType: n,
        dims: r,
        download: a,
        dispose: i
      } = t;
      return new bS({
        location: "gpu-buffer",
        type: n ?? "float32",
        gpuBuffer: e,
        dims: r,
        download: a,
        dispose: i
      });
    }, OAr = (e, t) => {
      let {
        dataType: n,
        dims: r,
        download: a,
        dispose: i
      } = t;
      return new bS({
        location: "ml-tensor",
        type: n ?? "float32",
        mlTensor: e,
        dims: r,
        download: a,
        dispose: i
      });
    }, BAr = (e, t, n) => new bS({
      location: "cpu-pinned",
      type: e,
      data: t,
      dims: n ?? [t.length]
    });
  }),
  PH,
  dbe,
  zut,
  FAr,
  NRo = Wi(() => {
    PH = new Map([["float32", Float32Array], ["uint8", Uint8Array], ["int8", Int8Array], ["uint16", Uint16Array], ["int16", Int16Array], ["int32", Int32Array], ["bool", Uint8Array], ["float64", Float64Array], ["uint32", Uint32Array], ["int4", Uint8Array], ["uint4", Uint8Array]]), dbe = new Map([[Float32Array, "float32"], [Uint8Array, "uint8"], [Int8Array, "int8"], [Uint16Array, "uint16"], [Int16Array, "int16"], [Int32Array, "int32"], [Float64Array, "float64"], [Uint32Array, "uint32"]]), zut = !1, FAr = () => {
      if (!zut) {
        zut = !0;
        let e = typeof BigInt64Array < "u" && BigInt64Array.from,
          t = typeof BigUint64Array < "u" && BigUint64Array.from,
          n = globalThis.Float16Array,
          r = typeof n < "u" && n.from;
        e && (PH.set("int64", BigInt64Array), dbe.set(BigInt64Array, "int64")), t && (PH.set("uint64", BigUint64Array), dbe.set(BigUint64Array, "uint64")), r ? (PH.set("float16", n), dbe.set(n, "float16")) : PH.set("float16", Uint16Array);
      }
    };
  }),
  zAr,
  UAr,
  jRo = Wi(() => {
    FGt(), zAr = e => {
      let t = 1;
      for (let n = 0; n < e.length; n++) {
        let r = e[n];
        if (typeof r != "number" || !Number.isSafeInteger(r)) throw new TypeError(`dims[${n}] must be an integer, got: ${r}`);
        if (r < 0) throw new RangeError(`dims[${n}] must be a non-negative integer, got: ${r}`);
        t *= r;
      }
      return t;
    }, UAr = (e, t) => {
      switch (e.location) {
        case "cpu":
          return new bS(e.type, e.data, t);
        case "cpu-pinned":
          return new bS({
            location: "cpu-pinned",
            data: e.data,
            type: e.type,
            dims: t
          });
        case "texture":
          return new bS({
            location: "texture",
            texture: e.texture,
            type: e.type,
            dims: t
          });
        case "gpu-buffer":
          return new bS({
            location: "gpu-buffer",
            gpuBuffer: e.gpuBuffer,
            type: e.type,
            dims: t
          });
        case "ml-tensor":
          return new bS({
            location: "ml-tensor",
            mlTensor: e.mlTensor,
            type: e.type,
            dims: t
          });
        default:
          throw new Error(`tensorReshape: tensor location ${e.location} is not supported`);
      }
    };
  }),
  bS,
  FGt = Wi(() => {
    PRo(), RRo(), NRo(), jRo(), bS = class {
      constructor(e, t, n) {
        FAr();
        let r, a;
        if (typeof e == "object" && "location" in e) switch (this.dataLocation = e.location, r = e.type, a = e.dims, e.location) {
          case "cpu-pinned":
            {
              let o = PH.get(r);
              if (!o) throw new TypeError(`unsupported type "${r}" to create tensor from pinned buffer`);
              if (!(e.data instanceof o)) throw new TypeError(`buffer should be of type ${o.name}`);
              this.cpuData = e.data;
              break;
            }
          case "texture":
            {
              if (r !== "float32") throw new TypeError(`unsupported type "${r}" to create tensor from texture`);
              this.gpuTextureData = e.texture, this.downloader = e.download, this.disposer = e.dispose;
              break;
            }
          case "gpu-buffer":
            {
              if (r !== "float32" && r !== "float16" && r !== "int32" && r !== "int64" && r !== "uint32" && r !== "uint8" && r !== "bool" && r !== "uint4" && r !== "int4") throw new TypeError(`unsupported type "${r}" to create tensor from gpu buffer`);
              this.gpuBufferData = e.gpuBuffer, this.downloader = e.download, this.disposer = e.dispose;
              break;
            }
          case "ml-tensor":
            {
              if (r !== "float32" && r !== "float16" && r !== "int32" && r !== "int64" && r !== "uint32" && r !== "uint64" && r !== "int8" && r !== "uint8" && r !== "bool" && r !== "uint4" && r !== "int4") throw new TypeError(`unsupported type "${r}" to create tensor from MLTensor`);
              this.mlTensorData = e.mlTensor, this.downloader = e.download, this.disposer = e.dispose;
              break;
            }
          default:
            throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`);
        } else {
          let o, s;
          if (typeof e == "string") {
            if (r = e, s = n, e === "string") {
              if (!Array.isArray(t)) throw new TypeError("A string tensor's data must be a string array.");
              o = t;
            } else {
              let l = PH.get(e);
              if (l === void 0) throw new TypeError(`Unsupported tensor type: ${e}.`);
              if (Array.isArray(t)) {
                if (e === "float16" && l === Uint16Array || e === "uint4" || e === "int4") throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);
                e === "uint64" || e === "int64" ? o = l.from(t, BigInt) : o = l.from(t);
              } else if (t instanceof l) o = t;else if (t instanceof Uint8ClampedArray) {
                if (e === "uint8") o = Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");
              } else if (e === "float16" && t instanceof Uint16Array && l !== Uint16Array) o = new globalThis.Float16Array(t.buffer, t.byteOffset, t.length);else throw new TypeError(`A ${r} tensor's data must be type of ${l}`);
            }
          } else if (s = t, Array.isArray(e)) {
            if (e.length === 0) throw new TypeError("Tensor type cannot be inferred from an empty array.");
            let l = typeof e[0];
            if (l === "string") r = "string", o = e;else if (l === "boolean") r = "bool", o = Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`);
          } else if (e instanceof Uint8ClampedArray) r = "uint8", o = Uint8Array.from(e);else {
            let l = dbe.get(e.constructor);
            if (l === void 0) throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);
            r = l, o = e;
          }
          if (s === void 0) s = [o.length];else if (!Array.isArray(s)) throw new TypeError("A tensor's dims must be a number array");
          a = s, this.cpuData = o, this.dataLocation = "cpu";
        }
        let i = zAr(a);
        if (this.cpuData && i !== this.cpuData.length && !((r === "uint4" || r === "int4") && Math.ceil(i / 2) === this.cpuData.length)) throw new Error(`Tensor's size(${i}) does not match data length(${this.cpuData.length}).`);
        this.type = r, this.dims = a, this.size = i;
      }
      static async fromImage(e, t) {
        return jAr(e, t);
      }
      static fromTexture(e, t) {
        return DAr(e, t);
      }
      static fromGpuBuffer(e, t) {
        return LAr(e, t);
      }
      static fromMLTensor(e, t) {
        return OAr(e, t);
      }
      static fromPinnedBuffer(e, t, n) {
        return BAr(e, t, n);
      }
      toDataURL(e) {
        return RAr(this, e);
      }
      toImageData(e) {
        return NAr(this, e);
      }
      get data() {
        if (this.ensureValid(), !this.cpuData) throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");
        return this.cpuData;
      }
      get location() {
        return this.dataLocation;
      }
      get texture() {
        if (this.ensureValid(), !this.gpuTextureData) throw new Error("The data is not stored as a WebGL texture.");
        return this.gpuTextureData;
      }
      get gpuBuffer() {
        if (this.ensureValid(), !this.gpuBufferData) throw new Error("The data is not stored as a WebGPU buffer.");
        return this.gpuBufferData;
      }
      get mlTensor() {
        if (this.ensureValid(), !this.mlTensorData) throw new Error("The data is not stored as a WebNN MLTensor.");
        return this.mlTensorData;
      }
      async getData(e) {
        switch (this.ensureValid(), this.dataLocation) {
          case "cpu":
          case "cpu-pinned":
            return this.data;
          case "texture":
          case "gpu-buffer":
          case "ml-tensor":
            {
              if (!this.downloader) throw new Error("The current tensor is not created with a specified data downloader.");
              if (this.isDownloading) throw new Error("The current tensor is being downloaded.");
              try {
                this.isDownloading = !0;
                let t = await this.downloader();
                return this.downloader = void 0, this.dataLocation = "cpu", this.cpuData = t, e && this.disposer && (this.disposer(), this.disposer = void 0), t;
              } finally {
                this.isDownloading = !1;
              }
            }
          default:
            throw new Error(`cannot get data from location: ${this.dataLocation}`);
        }
      }
      dispose() {
        if (this.isDownloading) throw new Error("The current tensor is being downloaded.");
        this.disposer && (this.disposer(), this.disposer = void 0), this.cpuData = void 0, this.gpuTextureData = void 0, this.gpuBufferData = void 0, this.mlTensorData = void 0, this.downloader = void 0, this.isDownloading = void 0, this.dataLocation = "none";
      }
      ensureValid() {
        if (this.dataLocation === "none") throw new Error("The tensor is disposed.");
      }
      reshape(e) {
        if (this.ensureValid(), this.downloader || this.disposer) throw new Error("Cannot reshape a tensor that owns GPU resource.");
        return UAr(this, e);
      }
    };
  }),
  iE,
  $Ar = Wi(() => {
    FGt(), iE = bS;
  }),
  ZAe,
  Uut,
  vT,
  X5,
  GAr = Wi(() => {
    PAr(), ZAe = (e, t) => {
      (typeof _4.trace > "u" ? !_4.wasm.trace : !_4.trace) || console.timeStamp(`${e}::ORT::${t}`);
    }, Uut = (e, t) => {
      var a;
      let n = ((a = new Error().stack) == null ? void 0 : a.split(/\r\n|\r|\n/g)) || [],
        r = !1;
      for (let i = 0; i < n.length; i++) {
        if (r && !n[i].includes("TRACE_FUNC")) {
          let o = `FUNC_${e}::${n[i].trim().split(" ")[1]}`;
          t && (o += `::${t}`), ZAe("CPU", o);
          return;
        }
        n[i].includes("TRACE_FUNC") && (r = !0);
      }
    }, vT = e => {
      (typeof _4.trace > "u" ? !_4.wasm.trace : !_4.trace) || Uut("BEGIN", e);
    }, X5 = e => {
      (typeof _4.trace > "u" ? !_4.wasm.trace : !_4.trace) || Uut("END", e);
    };
  }),
  VAr,
  DRo = Wi(() => {
    TAr(), $Ar(), GAr(), VAr = class HAr {
      constructor(t) {
        this.handler = t;
      }
      async run(t, n, r) {
        vT();
        let a = {},
          i = {};
        if (typeof t != "object" || t === null || t instanceof iE || Array.isArray(t)) throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");
        let o = !0;
        if (typeof n == "object") {
          if (n === null) throw new TypeError("Unexpected argument[1]: cannot be null.");
          if (n instanceof iE) throw new TypeError("'fetches' cannot be a Tensor");
          if (Array.isArray(n)) {
            if (n.length === 0) throw new TypeError("'fetches' cannot be an empty array.");
            o = !1;
            for (let d of n) {
              if (typeof d != "string") throw new TypeError("'fetches' must be a string array or an object.");
              if (this.outputNames.indexOf(d) === -1) throw new RangeError(`'fetches' contains invalid output name: ${d}.`);
              a[d] = null;
            }
            if (typeof r == "object" && r !== null) i = r;else if (typeof r < "u") throw new TypeError("'options' must be an object.");
          } else {
            let d = !1,
              u = Object.getOwnPropertyNames(n);
            for (let h of this.outputNames) if (u.indexOf(h) !== -1) {
              let p = n[h];
              (p === null || p instanceof iE) && (d = !0, o = !1, a[h] = p);
            }
            if (d) {
              if (typeof r == "object" && r !== null) i = r;else if (typeof r < "u") throw new TypeError("'options' must be an object.");
            } else i = n;
          }
        } else if (typeof n < "u") throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");
        for (let d of this.inputNames) if (typeof t[d] > "u") throw new Error(`input '${d}' is missing in 'feeds'.`);
        if (o) for (let d of this.outputNames) a[d] = null;
        let s = await this.handler.run(t, a, i),
          l = {};
        for (let d in s) if (Object.hasOwnProperty.call(s, d)) {
          let u = s[d];
          u instanceof iE ? l[d] = u : l[d] = new iE(u.type, u.data, u.dims);
        }
        return X5(), l;
      }
      async release() {
        return this.handler.dispose();
      }
      static async create(t, n, r, a) {
        vT();
        let i,
          o = {};
        if (typeof t == "string") {
          if (i = t, typeof n == "object" && n !== null) o = n;else if (typeof n < "u") throw new TypeError("'options' must be an object.");
        } else if (t instanceof Uint8Array) {
          if (i = t, typeof n == "object" && n !== null) o = n;else if (typeof n < "u") throw new TypeError("'options' must be an object.");
        } else if (t instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && t instanceof SharedArrayBuffer) {
          let u = t,
            h = 0,
            p = t.byteLength;
          if (typeof n == "object" && n !== null) o = n;else if (typeof n == "number") {
            if (h = n, !Number.isSafeInteger(h)) throw new RangeError("'byteOffset' must be an integer.");
            if (h < 0 || h >= u.byteLength) throw new RangeError(`'byteOffset' is out of range [0, ${u.byteLength}).`);
            if (p = t.byteLength - h, typeof r == "number") {
              if (p = r, !Number.isSafeInteger(p)) throw new RangeError("'byteLength' must be an integer.");
              if (p <= 0 || h + p > u.byteLength) throw new RangeError(`'byteLength' is out of range (0, ${u.byteLength - h}].`);
              if (typeof a == "object" && a !== null) o = a;else if (typeof a < "u") throw new TypeError("'options' must be an object.");
            } else if (typeof r < "u") throw new TypeError("'byteLength' must be a number.");
          } else if (typeof n < "u") throw new TypeError("'options' must be an object.");
          i = new Uint8Array(u, h, p);
        } else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");
        let [s, l] = await EAr(o),
          d = await s.createInferenceSessionHandler(i, l);
        return X5(), new HAr(d);
      }
      startProfiling() {
        this.handler.startProfiling();
      }
      endProfiling() {
        this.handler.endProfiling();
      }
      get inputNames() {
        return this.handler.inputNames;
      }
      get outputNames() {
        return this.handler.outputNames;
      }
    };
  }),
  zGt,
  LRo = Wi(() => {
    DRo(), zGt = VAr;
  }),
  ORo = Wi(() => {}),
  BRo = Wi(() => {}),
  FRo = Wi(() => {}),
  zRo = Wi(() => {}),
  WAr = {};

CEe(WAr, {
  InferenceSession: () => zGt,
  TRACE: () => ZAe,
  TRACE_FUNC_BEGIN: () => vT,
  TRACE_FUNC_END: () => X5,
  Tensor: () => iE,
  env: () => um,
  registerBackend: () => VW
});

var FT = Wi(() => {
    ERo(), MRo(), LRo(), $Ar(), ORo(), BRo(), GAr(), FRo(), zRo();
  }),
  UGt = Wi(() => {}),
  qAr = {};

CEe(qAr, {
  default: () => KAr
});

var $ut,
  Gut,
  KAr,
  URo = Wi(() => {
    var e;
    X4r(), iee(), $Gt(), $ut = "ort-wasm-proxy-worker", Gut = ((e = globalThis.self) == null ? void 0 : e.name) === $ut, Gut && (self.onmessage = t => {
      let {
        type: n,
        in: r
      } = t.data;
      try {
        switch (n) {
          case "init-wasm":
            GGt(r.wasm).then(() => {
              sVt(r).then(() => {
                postMessage({
                  type: n
                });
              }, a => {
                postMessage({
                  type: n,
                  err: a
                });
              });
            }, a => {
              postMessage({
                type: n,
                err: a
              });
            });
            break;
          case "init-ep":
            {
              let {
                epName: a,
                env: i
              } = r;
              lVt(i, a).then(() => {
                postMessage({
                  type: n
                });
              }, o => {
                postMessage({
                  type: n,
                  err: o
                });
              });
              break;
            }
          case "copy-from":
            {
              let {
                  buffer: a
                } = r,
                i = PGe(a);
              postMessage({
                type: n,
                out: i
              });
              break;
            }
          case "create":
            {
              let {
                model: a,
                options: i
              } = r;
              cVt(a, i).then(o => {
                postMessage({
                  type: n,
                  out: o
                });
              }, o => {
                postMessage({
                  type: n,
                  err: o
                });
              });
              break;
            }
          case "release":
            dVt(r), postMessage({
              type: n
            });
            break;
          case "run":
            {
              let {
                sessionId: a,
                inputIndices: i,
                inputs: o,
                outputIndices: s,
                options: l
              } = r;
              uVt(a, i, o, s, new Array(s.length).fill(null), l).then(d => {
                d.some(u => u[3] !== "cpu") ? postMessage({
                  type: n,
                  err: "Proxy does not support non-cpu tensor location."
                }) : postMessage({
                  type: n,
                  out: d
                }, pVt([...o, ...d]));
              }, d => {
                postMessage({
                  type: n,
                  err: d
                });
              });
              break;
            }
          case "end-profiling":
            hVt(r), postMessage({
              type: n
            });
            break;
          default:
        }
      } catch (a) {
        postMessage({
          type: n,
          err: a
        });
      }
    }), KAr = Gut ? null : t => new Worker(t ?? RA, {
      type: "module",
      name: $ut
    });
  }),
  QAr = {};

CEe(QAr, {
  default: () => YAr
});

